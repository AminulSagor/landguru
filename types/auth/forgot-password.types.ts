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
};

export type ApiError = {
  message?: string;
  response?: {
    data?: {
      message?: string | string[];
    };
  };
};