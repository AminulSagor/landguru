import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;
  const role = request.cookies.get("user_role")?.value;

  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  const isAgentRoute = pathname === "/agent" || pathname.startsWith("/agent/");
  const isUserRoute = pathname === "/user" || pathname.startsWith("/user/");
  const isAuthRoute = pathname.startsWith("/auth/");

  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL("/auth/admin/login", request.url));
  }

  if (isAgentRoute && !token) {
    return NextResponse.redirect(new URL("/auth/agent/login", request.url));
  }

  if (isUserRoute && !token) {
    return NextResponse.redirect(new URL("/auth/user/login", request.url));
  }

  if (isAdminRoute && role !== "admin" && role !== "super_admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAgentRoute && role !== "agent") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isUserRoute && role !== "user") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAuthRoute && token) {
    if (role === "admin" || role === "super_admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    if (role === "agent") {
      return NextResponse.redirect(new URL("/agent", request.url));
    }

    if (role === "user") {
      return NextResponse.redirect(new URL("/user", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/agent/:path*", "/user/:path*", "/auth/:path*"],
};
