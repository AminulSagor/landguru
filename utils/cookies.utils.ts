export const setToken = (token: string, remember = false) => {
  if (typeof document === "undefined") return;

  const maxAge = remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24;
  document.cookie = `access_token=${encodeURIComponent(token)}; path=/; max-age=${maxAge};`;
};

export const setUserRole = (
  role: "admin" | "super_admin" | "agent" | "user",
  remember = false,
) => {
  if (typeof document === "undefined") return;

  const maxAge = remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24;
  document.cookie = `user_role=${encodeURIComponent(role)}; path=/; max-age=${maxAge};`;
};

export const getToken = (): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )access_token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
};

export const getUserRole = (): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )user_role=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
};

export const removeToken = () => {
  if (typeof document === "undefined") return;
  document.cookie = "access_token=; path=/; max-age=0;";
};

export const removeUserRole = () => {
  if (typeof document === "undefined") return;
  document.cookie = "user_role=; path=/; max-age=0;";
};

export const clearAuthCookies = () => {
  removeToken();
  removeUserRole();
};

export const getDashboardPathByRole = (role?: string | null) => {
  switch (role) {
    case "admin":
    case "super_admin":
      return "/admin/dashboard";
    case "agent":
      return "/agent/dashbaord";
    case "user":
      return "/user/dashboard";
    default:
      return "/";
  }
};

export const getLoginPathByRole = (role?: string | null) => {
  switch (role) {
    case "admin":
    case "super_admin":
      return "/auth/admin/login";
    case "agent":
      return "/auth/agent/login";
    case "user":
      return "/auth/user/login";
    default:
      return "/auth/user/login";
  }
};

export const getLoginPathByPathname = (pathname: string) => {
  if (pathname.startsWith("/admin")) return "/auth/admin/login";
  if (pathname.startsWith("/agent")) return "/auth/agent/login";
  if (pathname.startsWith("/user")) return "/auth/user/login";
  return "/auth/user/login";
};
