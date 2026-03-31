import {
  clearAuthCookies,
  getLoginPathByRole,
  getUserRole,
} from "@/utils/cookies.utils";

export const logoutUser = () => {
  const role = getUserRole();
  const loginPath = getLoginPathByRole(role);

  clearAuthCookies();

  if (typeof window !== "undefined") {
    window.location.href = loginPath;
  }
};
