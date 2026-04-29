export interface AdminCreatePayload {
  name: string;
  phone: string;
  email: string;
  division?: string;
  district?: string;
  thana?: string;
  fullAddress?: string;
  adminZoneId?: string;
  password?: string;
}

export interface AdminCreateResponseUser {
  id: string;
  fullName: string;
  phone?: string;
  email?: string;
  role?: string;
}

export interface AdminCreateResponse {
  success: boolean;
  message?: string;
  user?: AdminCreateResponseUser;
  zoneAssignment?: { id?: string; adminZoneId?: string };
}
