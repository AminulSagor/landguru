export type UploadType =
  | 'AVATAR'
  | 'DEED'
  | 'NID'
  | 'TIN'
  | 'KHATIAN'
  | 'VIDEO'
  | 'OTHER'
  | (string & {});

export interface PresignedUploadUrlPayload {
  filename: string;
  contentType: string;
  type: UploadType;
}

// Backend may return any of these keys depending on environment/build.
export interface PresignedUploadUrlResponse {
  success?: boolean;
  message?: string;
  uploadUrl?: string;
  presignedUrl?: string;
  putUrl?: string;
  url?: string;
  fileUrl?: string;
  publicUrl?: string;
  objectUrl?: string;
  key?: string;
}
