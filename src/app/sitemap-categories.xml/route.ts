import { NextResponse } from 'next/server';
import { getCategoryPagesSitemap } from '@/lib/sitemap-utils';
export const dynamic = 'force-dynamic';
export const revalidate = 3600;
export async function GET() {
  const xml = await getCategoryPagesSitemap();
  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
  });
}
