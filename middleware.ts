import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Obtener la URL actual
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // Headers de seguridad
  const response = NextResponse.next();

  // Configurar headers de seguridad adicionales
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // CSP (Content Security Policy)
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https: http:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://www.google-analytics.com https://analytics.google.com;
    media-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  response.headers.set('Content-Security-Policy', cspHeader);

  // Manejo de trailing slashes
  if (pathname !== '/' && pathname.endsWith('/')) {
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url);
  }

  // Redirecciones personalizadas
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

  // Manejo de rutas de blog antiguas
  if (pathname.startsWith('/blog/')) {
    const slug = pathname.replace('/blog/', '');
    if (slug && !slug.includes('/')) {
      // Redireccionar rutas de blog antiguas al nuevo formato
      url.pathname = `/blog/${slug}`;
      return NextResponse.rewrite(url);
    }
  }

  // Bloquear acceso a archivos sensibles
  const blockedPaths = [
    '.env',
    '.env.local',
    '.env.production',
    '.env.development',
    'package.json',
    'package-lock.json',
    'yarn.lock',
    'tsconfig.json',
    'next.config.js',
    '.gitignore',
    '.git',
    'node_modules',
  ];

  if (blockedPaths.some(path => pathname.includes(path))) {
    return new NextResponse('Not Found', { status: 404 });
  }

  // Rate limiting simple (en producción usar una solución más robusta)
  if (pathname.startsWith('/api/')) {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'anonymous';

    
    // En un entorno real, usar Redis o similar para rate limiting
    // Aquí solo es un ejemplo básico
    console.log(`API request from ${ip} to ${pathname}`);
  }

  // Manejo de rutas de API
  if (pathname.startsWith('/api/')) {
    // Verificar método HTTP para ciertas rutas
    if (pathname === '/api/contact' && request.method !== 'POST') {
      return new NextResponse('Method Not Allowed', { status: 405 });
    }

    // Headers CORS para API
    response.headers.set('Access-Control-Allow-Origin', process.env.NODE_ENV === 'development' ? '*' : 'https://tu-dominio.com');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  // Manejo de preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers: response.headers });
  }

  // Logging de requests en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.log(`${request.method} ${pathname} - ${request.headers.get('user-agent')}`);
  }

  // Reescritura de rutas para internacionalización (si se implementa en el futuro)
  // const locales = ['en', 'es', 'fr'];
  // const defaultLocale = 'en';
  // 
  // if (!locales.some(locale => pathname.startsWith(`/${locale}`))) {
  //   url.pathname = `/${defaultLocale}${pathname}`;
  //   return NextResponse.rewrite(url);
  // }

  return response;
}

// Configuración del matcher
export const config = {
  matcher: [
    /*
     * Hacer match con todas las rutas excepto:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt, sitemap.xml (SEO files)
     * - archivos con extensión (images, fonts, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.).*)',
  ],
};