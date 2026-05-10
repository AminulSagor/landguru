export type ForgotPasswordForm = {
  phone: string;
};

export type SendForgotPasswordOtpPayload = {
  phone: string;
  forgetPassword: boolean;
};

export type SendForgotPasswordOtpResponse = {
  success: boolean;
  message: string;
  phone?: string;
  expireSec?: number;
  otp?: string;
  bypass?: boolean;
  forgetPassword?: boolean;
};

export type VerifyForgotPasswordOtpPayload = {
  phone: string;
  otp: string;
};

export type VerifyForgotPasswordOtpResponse = {
  success: boolean;
  message: string;
  phone: string;
  verified: boolean;
  verifiedExpireSec: number;
  bypass?: boolean;
};

export type ResetPasswordPayload = {
  phone: string;
  password: string;
};

export type ResetPasswordResponse = {
  success: boolean;
  message: string;
};

export type ApiError = {
  message?: string;
  response?: {
    data?: {
      message?: string | string[];
    };
  };
};