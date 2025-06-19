import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  
  const response = NextResponse.next();
  
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  
  if (pathname !== '/' && pathname.endsWith('/')) {
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url);
  }

  
  const redirects: Record<string, string> = {
    '/home': '/',
    '/portfolio': '/projects',
    '/cv': '/about',
    '/resume': '/about',
    '/contact-me': '/contact',
  };

  if (redirects[pathname]) {
    url.pathname = redirects[pathname];
    return NextResponse.redirect(url, 301);
  }

  
  const blockedPatterns = [
    '.env',
    'package.json',
    'tsconfig.json',
    'next.config.js',
    '.git',
    'node_modules',
  ];

  if (blockedPatterns.some(pattern => pathname.includes(pattern))) {
    return new NextResponse('Not Found', { status: 404 });
  }

  
  if (pathname === '/api/contact' && request.method !== 'POST') {
    return new NextResponse('Method Not Allowed', { status: 405 });
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.).*)',
  ],
};