import { cookies } from "next/headers";

//for server coode use this current user role (admin and super admin only)
const cookieStore = await cookies();
export const currentUser = cookieStore.get("user_role")?.value ?? null;
