import { serviceClient } from "@/service/base/axios.client";
import type {
  SendForgotPasswordOtpPayload,
  SendForgotPasswordOtpResponse,
} from "@/types/auth/forgot-password.types";

export const forgotPasswordService = {
  sendOtp: async (payload: SendForgotPasswordOtpPayload) => {
    const response = await serviceClient.post<SendForgotPasswordOtpResponse>(
      "/auth/send-otp",
      payload,
    );

    return response.data;
  },
};