import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { checkServerSession } from './lib/api/edgeSession';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // пропускаем статику и API
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    pathname === '/icon.jpg'
  ) {
    return NextResponse.next();
  }

  const isAuthPage = pathname === '/sign-in' || pathname === '/sign-up';
  const isPrivate = pathname.startsWith('/notes') || pathname.startsWith('/profile');

  const isAuthenticated = await checkServerSession(request);

  if (isPrivate && !isAuthenticated) {
    const url = new URL('/sign-in', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

// матчим всё, кроме статики и api
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.jpg|api).*)'],
};
