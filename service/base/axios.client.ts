import { service_URL } from "@/service/base/config";
import { getToken, clearAuthCookies } from "@/utils/cookies.utils";
import axios from "axios";

const getLoginPathByCurrentRoute = () => {
  if (typeof window === "undefined") return "/auth/admin/login";

  const pathname = window.location.pathname;

  if (pathname.startsWith("/admin")) return "/auth/admin/login";
  if (pathname.startsWith("/agent")) return "/auth/agent/login";
  if (pathname.startsWith("/user")) return "/auth/user/login";

  return "/auth/admin/login";
};

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
          pathname.includes("/auth/admin/login") ||
          pathname.includes("/auth/agent/login") ||
          pathname.includes("/auth/user/login") ||
          pathname.includes("/user/signup");

        if (!isAuthPage) {
          window.location.href = getLoginPathByCurrentRoute();
        }
      }
    }

    return Promise.reject(error);
  },
);
