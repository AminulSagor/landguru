export interface UpdateAdminPayload {
  fullName?: string;
  phone?: string;
  email?: string;
  photoUrl?: string | null;
  adminZoneId?: string;
}

export interface UpdateAdminResponse {
  success: boolean;
  message: string;
}
