import { NextResponse } from 'next/server';
import { getBlogSitemap } from '@/lib/sitemap-utils';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET() {
  const xml = await getBlogSitemap();
  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
  });
}
