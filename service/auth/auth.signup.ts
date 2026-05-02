import { serviceClient } from "@/service/base/axios.client";
import type {
  CompleteSignupIdentityPayload,
  CompleteSignupIdentityResponse,
  CompleteSignupPayload,
  CompleteSignupResponse,
  PresignedUploadUrlPayload,
  PresignedUploadUrlResponse,
  SendSignupOtpPayload,
  SendSignupOtpResponse,
  VerifySignupOtpPayload,
  VerifySignupOtpResponse,
} from "@/types/auth/signup.types";

export const signupService = {
  sendOtp: async (payload: SendSignupOtpPayload) => {
    const response = await serviceClient.post<SendSignupOtpResponse>(
      "/auth/send-otp",
      payload,
    );

    return response.data;
  },

  verifyOtp: async (payload: VerifySignupOtpPayload) => {
    const response = await serviceClient.post<VerifySignupOtpResponse>(
      "/auth/verify-otp",
      payload,
    );

    return response.data;
  },

  completeSignup: async (payload: CompleteSignupPayload) => {
    const response = await serviceClient.post<CompleteSignupResponse>(
      "/auth/complete-signup",
      payload,
    );

    return response.data;
  },

  completeSignupIdentity: async (payload: CompleteSignupIdentityPayload) => {
    const response = await serviceClient.post<CompleteSignupIdentityResponse>(
      "/auth/complete-signup1",
      payload,
    );

    return response.data;
  },

  getPresignedUploadUrl: async (payload: PresignedUploadUrlPayload) => {
    const response = await serviceClient.post<PresignedUploadUrlResponse>(
      "/s3/presign-put",
      payload,
    );

    return response.data;
  },

  uploadToPresignedUrl: async (uploadUrl: string, file: File) => {
    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type || "application/octet-stream",
      },
      body: file,
    });

    if (!response.ok) {
      throw new Error("File upload failed");
    }
  },
};
