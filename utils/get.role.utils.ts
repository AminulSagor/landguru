import { getUserRole } from "@/utils/cookies.utils";
import { cookies } from "next/headers";

export const currentUser = getUserRole();
const cookieStore = await cookies();
export const currentUserServer = cookieStore.get("user_role")?.value ?? null;
