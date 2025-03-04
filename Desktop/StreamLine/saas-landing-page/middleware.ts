import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isAuthenticated = !!token

  // Define public paths that don't require authentication
  const publicPaths = ["/login", "/register", "/forgot-password"]
  const isPublicPath = publicPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  // Redirect logic
  if (!isAuthenticated && !isPublicPath && !request.nextUrl.pathname.startsWith("/api")) {
    // Redirect unauthenticated users to login
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isAuthenticated && isPublicPath) {
    // Redirect authenticated users to dashboard if they try to access login/register
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}

