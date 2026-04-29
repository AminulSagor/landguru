export interface AdminBulkStatusPayload {
  adminIds: string[];
  isActive: boolean;
}

export interface AdminBulkStatusResponse {
  success: boolean;
  message: string;
}
