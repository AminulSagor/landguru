export type SignupRole = "user";

export type UploadType = import("@/types/base/upload.types").UploadType;

export interface SendSignupOtpPayload {
  phone: string;
  forgetPassword: boolean;
}

export interface SendSignupOtpResponse {
  success: boolean;
  message: string;
  phone: string;
  expireSec: number;
  otp?: string;
  bypass?: boolean;
  forgetPassword: boolean;
}

export interface VerifySignupOtpPayload {
  phone: string;
  otp: string;
}

export interface VerifySignupOtpResponse {
  success: boolean;
  message: string;
  phone: string;
  verified: boolean;
  verifiedExpireSec: number;
  bypass?: boolean;
}

export interface CompleteSignupPayload {
  phone: string;
  password: string;
  role: SignupRole;
  fullName: string;
  email: string;
  photoUrl?: string;
  division: string;
  district: string;
  upazila: string;
  unionOrCityCorp: string;
  wardNo: string;
  postalCode: string;
  fullAddress: string;
}

export interface CompleteSignupResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    phone: string;
    role: SignupRole;
    fullName: string;
    email: string;
    photoUrl?: string;
  };
}

export interface CompleteSignupIdentityPayload {
  phone: string;
  nidFrontUrl?: string;
  nidBackUrl?: string;
  tinCertificateUrl?: string;
}

export interface CompleteSignupIdentityResponse {
  success: boolean;
  message: string;
  userId: string;
}

export type PresignedUploadUrlPayload = import("@/types/base/upload.types").PresignedUploadUrlPayload;

// Backend may return any of these keys depending on environment/build.
export type PresignedUploadUrlResponse = import("@/types/base/upload.types").PresignedUploadUrlResponse;

export interface ApiError {
  message?: string;
  response?: {
    data?: {
      message?: string | string[];
    };
  };
}
