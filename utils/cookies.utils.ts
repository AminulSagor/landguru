export const setToken = (token: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `access_token=${token}; path=/; max-age=${60 * 60 * 24};`;
};

export const setUserRole = (role: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `user_role=${role}; path=/; max-age=${60 * 60 * 24};`;
};

export const getToken = (): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/access_token=([^;]+)/);
  return match ? match[1] : null;
};

export const getUserRole = (): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/user_role=([^;]+)/);
  return match ? match[1] : null;
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
