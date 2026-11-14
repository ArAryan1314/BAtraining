import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import { workspaces } from "@/config/navigation";
import type { UserRole } from "@/types/user";

const WORKSPACE_ROLES: Record<string, UserRole> = { "/student": "STUDENT", "/trainer": "TRAINER", "/admin": "ADMIN" };

/**
 * First line of defence: anonymous visitors and wrong-role users never reach a workspace route.
 * Layouts and services still check the role themselves, because this only inspects the session cookie.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requiredRole = Object.entries(WORKSPACE_ROLES).find(([prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`))?.[1];
  if (!requiredRole) return NextResponse.next();

  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  if (!token) {
    const login = new URL("/auth/login", request.url);
    login.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(login);
  }
  if (token.role !== requiredRole) return NextResponse.redirect(new URL(workspaces[token.role].home, request.url));
  return NextResponse.next();
}

export const config = { matcher: ["/student/:path*", "/trainer/:path*", "/admin/:path*"] };
