export type UserRole = "admin" | "super_admin" | "agent" | "user";

export interface LoginPayload {
  phone: string;
  password: string;
}

export interface LoginUser {
  id: string;
  phone: string;
  fullName: string;
  email: string;
  role: UserRole;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  accessToken: string;
  user: LoginUser;
}

export interface ApiErrorResponse {
  message?: string | string[];
}

export interface ApiError {
  message: string;
  response?: {
    data?: ApiErrorResponse;
  };
}