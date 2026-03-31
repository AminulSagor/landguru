import { service_URL } from "@/service/base/config";
import axios from "axios";
import { cookies } from "next/headers";

export const serviceServer = axios.create({
  baseURL: service_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

serviceServer.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

serviceServer.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
