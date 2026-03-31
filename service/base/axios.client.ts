import { service_URL } from "@/service/base/config";
import {
  clearAuthCookies,
  getLoginPathByPathname,
  getToken,
} from "@/utils/cookies.utils";
import axios from "axios";

export const serviceClient = axios.create({
  baseURL: service_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

serviceClient.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

serviceClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthCookies();

      if (typeof window !== "undefined") {
        const pathname = window.location.pathname;

        const isAuthPage =
          pathname.startsWith("/auth/admin/login") ||
          pathname.startsWith("/auth/agent/login") ||
          pathname.startsWith("/auth/user/login") ||
          pathname.startsWith("/auth/user/signup") ||
          pathname.includes("/forgot-password") ||
          pathname.includes("/reset-success");

        if (!isAuthPage) {
          window.location.href = getLoginPathByPathname(pathname);
        }
      }
    }

    return Promise.reject(error);
  },
);
