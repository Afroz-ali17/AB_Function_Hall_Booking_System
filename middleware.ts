import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  // Try to get bearer token from Authorization header or cookie
  const authHeader = request.headers.get("authorization");
  const bearerToken = authHeader?.replace("Bearer ", "") || request.cookies.get("bearer_token")?.value;
  
  // Check session with bearer token if available
  const session = bearerToken 
    ? await auth.api.getSession({
        headers: new Headers({
          authorization: `Bearer ${bearerToken}`,
        }),
      })
    : await auth.api.getSession({
        headers: request.headers,
      });
  
  // If no session and trying to access protected routes, redirect to login
  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/booking"],
};