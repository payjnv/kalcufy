// ═══════════════════════════════════════════════════════════════════════════
// MIDDLEWARE: Site Protection + Admin Role Check
// ═══════════════════════════════════════════════════════════════════════════
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// ─────────────────────────────────────────────────────────────────────────────
// SITE CREDENTIALS (HTTP Basic Auth)
// ─────────────────────────────────────────────────────────────────────────────
const VALID_USER = 'admin';
const VALID_PASSWORD = '2122';

// ─────────────────────────────────────────────────────────────────────────────
// MIDDLEWARE FUNCTION
// ─────────────────────────────────────────────────────────────────────────────
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // ═══════════════════════════════════════════════════════════════════════════
  // ADMIN ROUTES: Require NextAuth session with ADMIN role
  // ═══════════════════════════════════════════════════════════════════════════
  if (pathname.includes('/admin')) {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });
    
    // Not logged in → redirect to login
    if (!token) {
      const locale = pathname.split('/')[1] || 'en';
      const loginUrl = new URL(`/${locale}/login`, request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // Logged in but not ADMIN → redirect to home with error
    if (token.role !== 'ADMIN') {
      const locale = pathname.split('/')[1] || 'en';
      const homeUrl = new URL(`/${locale}`, request.url);
      homeUrl.searchParams.set('error', 'unauthorized');
      return NextResponse.redirect(homeUrl);
    }
    
    // Is ADMIN → allow access
    return NextResponse.next();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ALL OTHER ROUTES: HTTP Basic Auth (site password protection)
  // ═══════════════════════════════════════════════════════════════════════════
  const basicAuth = request.headers.get('authorization');

  if (basicAuth) {
    try {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');
      if (user === VALID_USER && pwd === VALID_PASSWORD) {
        return NextResponse.next();
      }
    } catch {
      // Invalid auth format
    }
  }

  return new NextResponse('🔒 Sitio en desarrollo - Acceso restringido', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Kalcufy - Acceso Restringido"',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// MATCHER
// ─────────────────────────────────────────────────────────────────────────────
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)',
  ],
};
