import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const pathname = req.nextUrl.pathname;
    
    if (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth')) {
      const requestHeaders = new Headers(req.headers);
      
      if (req.nextauth?.token?.token) {
        requestHeaders.set('Authorization', `Bearer ${req.nextauth.token.token}`);
      }
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/homepage',
    '/users/:path*',
    '/myaccount/:path*',
    '/api/:path*',
    // Exclude Next.js internals
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};