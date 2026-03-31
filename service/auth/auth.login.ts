import { serviceClient } from "@/service/base/axios.client";
import type { LoginPayload, LoginResponse } from "@/types/auth/login.types";

export const authService = {
  login: async (payload: LoginPayload) => {
    const response = await serviceClient.post<LoginResponse>(
      "/auth/login",
      payload,
    );

    return response.data;
  },
};
