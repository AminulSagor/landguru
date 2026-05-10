import { NextResponse } from "next/server";
import { adminDetailsService } from "@/service/admin/admin-list/details/[id]/admin-details.service";

export async function GET(req: Request, context: any) {
  // context.params may be a Promise in this environment
  const p = context?.params ? await context.params : undefined;
  const adminId = p?.adminId ?? context?.params?.adminId;
  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page") ?? "1");
  const limit = Number(url.searchParams.get("limit") ?? "10");
  const role = url.searchParams.get("role") ?? undefined;
  const search = url.searchParams.get("search") ?? undefined;

  try {
    const data = await adminDetailsService.getAdminAgentsServer(adminId, page, limit, role ?? undefined, search ?? undefined);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ rows: [], meta: undefined }, { status: 500 });
  }
}
