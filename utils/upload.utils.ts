import { serviceClient } from "@/service/base/axios.client";

export type PresignUploadType = "AVATAR" | "DEED";

export type PresignPutResult = {
  uploadUrl: string;
  fileUrl: string;
  key?: string;
};

export type UploadFileOptions = {
  file: File;
  type: PresignUploadType;
  filename?: string;
  onProgress?: (percent: number) => void;
  signal?: AbortSignal;
};

export type FileValidationResult = {
  ok: boolean;
  error?: string;
};

export type FileValidationOptions = {
  maxSizeBytes?: number;
  allowedTypes?: string[];
};

const normalizePresignPayload = (payload: any): PresignPutResult => {
  const root = payload?.data ?? payload;
  const data = root?.data ?? root;
  const uploadUrl =
    data?.uploadUrl ||
    data?.url ||
    data?.presignedUrl ||
    data?.signedUrl ||
    data?.putUrl ||
    "";
  if (!uploadUrl) {
    throw new Error("Presigned upload URL not found.");
  }

  const rawFileUrl =
    data?.fileUrl ||
    data?.publicUrl ||
    data?.downloadUrl ||
    data?.viewUrl ||
    data?.url ||
    data?.uploadUrl ||
    "";
  const fileUrl = rawFileUrl ? rawFileUrl.split("?")[0] : uploadUrl.split("?")[0];

  return { uploadUrl, fileUrl, key: data?.key };
};

const buildUploadFileName = (file: File, override?: string) => {
  if (override) return override;
  const original = file.name || "upload";
  const safe = original.replace(/[^a-zA-Z0-9._-]/g, "_");
  const suffix = Math.random().toString(36).slice(2, 8);
  return `${Date.now()}-${suffix}-${safe}`;
};

export const validateImageFile = (
  file: File,
  options: FileValidationOptions = {},
): FileValidationResult => {
  const { maxSizeBytes = 5 * 1024 * 1024, allowedTypes = ["image/jpeg", "image/png", "image/webp"] } = options;

  if (!file) return { ok: false, error: "No file selected." };
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return { ok: false, error: "Unsupported file type. Use JPG, PNG, or WEBP." };
  }
  if (maxSizeBytes && file.size > maxSizeBytes) {
    const maxMb = Math.ceil(maxSizeBytes / (1024 * 1024));
    return { ok: false, error: `File is too large. Max ${maxMb}MB.` };
  }

  return { ok: true };
};

export const requestPresignedPutUrl = async (
  file: File,
  type: PresignUploadType,
  filename?: string,
): Promise<PresignPutResult> => {
  const name = buildUploadFileName(file, filename);
  const contentType = file.type || "application/octet-stream";

  const response = await serviceClient.post("/s3/presign-put", {
    filename: name,
    contentType,
    type,
  });

  return normalizePresignPayload(response.data);
};

export const uploadFileToPresignedUrl = (
  uploadUrl: string,
  file: File,
  contentType?: string,
  onProgress?: (percent: number) => void,
  signal?: AbortSignal,
): Promise<void> => {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("File upload is only supported in the browser."));
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("PUT", uploadUrl, true);
    xhr.withCredentials = false;

    if (contentType) {
      xhr.setRequestHeader("Content-Type", contentType);
    }

    xhr.upload.onprogress = (evt) => {
      if (!onProgress) return;
      if (!evt.lengthComputable) return;
      const percent = Math.round((evt.loaded / evt.total) * 100);
      onProgress(Math.min(100, Math.max(0, percent)));
    };

    xhr.onerror = () => reject(new Error("Upload failed. Please try again."));
    xhr.onabort = () => reject(new DOMException("Upload aborted", "AbortError"));

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`Upload failed (${xhr.status}).`));
      }
    };

    if (signal) {
      if (signal.aborted) {
        xhr.abort();
        return;
      }
      signal.addEventListener("abort", () => xhr.abort(), { once: true });
    }

    xhr.send(file);
  });
};

export const uploadFileWithPresign = async (
  options: UploadFileOptions,
): Promise<PresignPutResult> => {
  const { file, type, filename, onProgress, signal } = options;
  const presign = await requestPresignedPutUrl(file, type, filename);

  await uploadFileToPresignedUrl(
    presign.uploadUrl,
    file,
    file.type || "application/octet-stream",
    onProgress,
    signal,
  );

  return presign;
};
