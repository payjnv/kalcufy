import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales } from './i18n';

// =============================================================================
// GEO-DETECTION: Detect user's country from Vercel/Cloudflare headers
// Sets a cookie so the engine can adjust currency, placeholders, and units
// =============================================================================
const COUNTRY_COOKIE = 'kalcufy-country';
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year

export default function middleware(request: NextRequest) {
  // 1. Run next-intl middleware first
  const intlMiddleware = createMiddleware({
    locales: locales,
    defaultLocale: 'en',
    localePrefix: 'always',
  });

  const response = intlMiddleware(request);

  // 2. If user already has a country cookie, skip detection
  const existingCountry = request.cookies.get(COUNTRY_COOKIE)?.value;
  if (existingCountry) {
    return response;
  }

  // 3. Detect country from headers (Vercel → Cloudflare → fallback)
  const country = 
    request.headers.get('x-vercel-ip-country') ||     // Vercel (production)
    request.headers.get('cf-ipcountry') ||             // Cloudflare
    request.headers.get('x-country') ||                // Custom proxy
    'US';                                              // Default fallback

  // 4. Set cookie on response
  response.cookies.set(COUNTRY_COOKIE, country.toUpperCase(), {
    path: '/',
    maxAge: COOKIE_MAX_AGE,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
