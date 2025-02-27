import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('auth-token')?.value;
  const { pathname } = req.nextUrl;

  if ((pathname === '/login' || pathname === '/') && token) {
    return NextResponse.redirect(new URL('/assets', req.url));
  }

  if (!token && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/assets/:path*'], 
};
