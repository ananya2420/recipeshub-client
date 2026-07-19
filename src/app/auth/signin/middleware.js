import { NextResponse } from 'next/server';
import { auth } from "@/lib/auth";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // This will trigger for ANY route starting with /dashboard/admin
  if (pathname.startsWith('/dashboard/admin')) {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    // If not signed in, force redirect to signin
    if (!session) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    // If signed in but NOT an admin, redirect to user dashboard
    if (session.user.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard/user', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/admin/:path*'],
};