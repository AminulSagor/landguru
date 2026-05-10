import { serviceClient } from "@/service/base/axios.client";
import type {
  PresignedUploadUrlPayload,
  PresignedUploadUrlResponse,
} from "@/types/base/upload.types";

export const uploadService = {
  getPresignedUploadUrl: async (payload: PresignedUploadUrlPayload) => {
    const response = await serviceClient.post<PresignedUploadUrlResponse>(
      "/s3/presign-put",
      payload,
    );

    return response.data;
  },

  uploadToPresignedUrl: async (uploadUrl: string, file: File) => {
    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type || "application/octet-stream",
      },
      body: file,
    });

    if (!response.ok) {
      throw new Error("File upload failed");
    }
  },
};
