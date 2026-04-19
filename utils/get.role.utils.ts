import { cookies } from "next/headers";

// Server-only helper. Call this inside a request scope (page/layout/server action/route handler).
export async function getCurrentUserRole(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("user_role")?.value ?? null;
}
