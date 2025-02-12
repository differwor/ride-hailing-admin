import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getTokenFromCookie,
  removeTokenCookie,
  verifyToken,
} from "./lib/02.auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getTokenFromCookie();

  const loginUrl = new URL("/auth/login", request.url);
  loginUrl.searchParams.set("redirectTo", pathname);

  if (token) {
    try {
      await verifyToken(token);

      // If they are on auth page and have valid token, redirect to home
      if (pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL("/adm", request.url));
      }
    } catch {
      // Remove token if verification failed
      await removeTokenCookie();

      // Redirect to login page
      return NextResponse.redirect(loginUrl);
    }
  }

  if (!token && !pathname.startsWith("/auth")) {
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  /*
   * Match all request paths starting with /adm and /auth
   */
  matcher: ["/adm/:path*", "/auth/:path*"],
};
