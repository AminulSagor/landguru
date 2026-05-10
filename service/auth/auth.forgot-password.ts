import { serviceClient } from "@/service/base/axios.client";
import type {
  ResetPasswordPayload,
  ResetPasswordResponse,
  SendForgotPasswordOtpPayload,
  SendForgotPasswordOtpResponse,
  VerifyForgotPasswordOtpPayload,
  VerifyForgotPasswordOtpResponse,
} from "@/types/auth/forgot-password.types";

export const forgotPasswordService = {
  sendOtp: async (payload: SendForgotPasswordOtpPayload) => {
    const response = await serviceClient.post<SendForgotPasswordOtpResponse>(
      "/auth/send-otp",
      payload,
    );

    return response.data;
  },

  verifyOtp: async (payload: VerifyForgotPasswordOtpPayload) => {
    const response = await serviceClient.post<VerifyForgotPasswordOtpResponse>(
      "/auth/verify-otp",
      payload,
    );

    return response.data;
  },

  resetPassword: async (payload: ResetPasswordPayload) => {
    const response = await serviceClient.put<ResetPasswordResponse>(
      "/auth/reset-password",
      payload,
    );

    return response.data;
  },
};