import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const url = request.nextUrl.clone();
  const response = NextResponse.next();

  // 1. 301 Redirect secondary domains (e.g., .com or www) to target production domain
  if (host === 'warsawduragstore.com' || host === 'www.warsawduragstore.com' || host === 'www.warsawduragstore.pl') {
    url.host = 'warsawduragstore.pl';
    url.port = '';
    url.protocol = 'https:';
    return NextResponse.redirect(url, { status: 301 });
  }

  // 2. Add X-Robots-Tag: noindex, nofollow for preview/staging/vercel.app domains
  const isVercelDomain = host.includes('vercel.app');
  const isNonProduction = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production';

  if (isVercelDomain || isNonProduction) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|assets|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)).*)'],
};
