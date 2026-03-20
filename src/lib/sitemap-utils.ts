import { SLUG_REGISTRY } from '@/engine/v4/slugs/registry';
import { prisma } from '@/lib/prisma';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.kalcufy.com';
const LOCALES = ['en', 'es', 'pt', 'fr', 'de'] as const;
type Locale = (typeof LOCALES)[number];
const STATIC_LAST_MOD = '2026-02-01';

function xmlEscape(s: string) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function urlEntry(url: string, lastmod: string, changefreq: string, priority: number, alternates?: Record<string, string>) {
  let xml = `  <url>\n    <loc>${xmlEscape(url)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>`;
  if (alternates) {
    for (const [lang, href] of Object.entries(alternates)) {
      xml += `\n    <xhtml:link rel="alternate" hreflang="${lang}" href="${xmlEscape(href)}" />`;
    }
  }
  xml += '\n  </url>';
  return xml;
}

function wrapUrlset(entries: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>`;
}

export async function getStaticPagesSitemap() {
  const pages = [
    { path: '', priority: 1.0, freq: 'weekly' },
    { path: 'calculators', priority: 0.9, freq: 'weekly' },
    { path: 'blog', priority: 0.7, freq: 'weekly' },
    { path: 'about', priority: 0.5, freq: 'monthly' },
    { path: 'pricing', priority: 0.6, freq: 'monthly' },
    { path: 'accessibility', priority: 0.3, freq: 'yearly' },
    { path: 'privacy', priority: 0.3, freq: 'yearly' },
    { path: 'terms', priority: 0.3, freq: 'yearly' },
    { path: 'cookies', priority: 0.3, freq: 'yearly' },
  ];
  const entries: string[] = [];
  for (const page of pages) {
    const alts: Record<string, string> = {};
    for (const l of LOCALES) alts[l] = page.path ? `${BASE_URL}/${l}/${page.path}` : `${BASE_URL}/${l}`;
    for (const l of LOCALES) {
      const url = page.path ? `${BASE_URL}/${l}/${page.path}` : `${BASE_URL}/${l}`;
      entries.push(urlEntry(url, STATIC_LAST_MOD, page.freq, page.priority, alts));
    }
  }
  return wrapUrlset(entries);
}

export async function getCalculatorsSitemap() {
  const calcDateMap = new Map<string, Date>();
  try {
    const activeCalcs = await prisma.calculatorStatus.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    });
    for (const c of activeCalcs) calcDateMap.set(c.slug, c.updatedAt);
  } catch (e) { console.error('Sitemap calc error:', e); }

  const entries: string[] = [];
  for (const entry of SLUG_REGISTRY) {
    if (entry.category === 'drafts') continue;
    if (calcDateMap.size > 0 && !calcDateMap.has(entry.slugs.en)) continue;
    const date = (calcDateMap.get(entry.slugs.en) || new Date(STATIC_LAST_MOD)).toISOString().split('T')[0];
    const alts: Record<string, string> = {};
    for (const l of LOCALES) alts[l] = `${BASE_URL}/${l}/${entry.slugs[l]}`;
    for (const l of LOCALES) {
      entries.push(urlEntry(`${BASE_URL}/${l}/${entry.slugs[l]}`, date, 'monthly', l === 'en' ? 0.8 : 0.6, alts));
    }
  }
  return wrapUrlset(entries);
}

export async function getBlogSitemap() {
  const entries: string[] = [];
  try {
    const posts = await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      select: { slugEn: true, slugEs: true, slugPt: true, slugFr: true, slugDe: true, updatedAt: true },
    });
    for (const post of posts) {
      const slugMap: Partial<Record<Locale, string>> = {};
      if (post.slugEn) slugMap.en = post.slugEn;
      if (post.slugEs) slugMap.es = post.slugEs;
      if (post.slugPt) slugMap.pt = post.slugPt;
      if (post.slugFr) slugMap.fr = post.slugFr;
      if (post.slugDe) slugMap.de = post.slugDe;
      const available = Object.keys(slugMap) as Locale[];
      if (available.length === 0) continue;
      const alts: Record<string, string> = {};
      for (const l of available) alts[l] = `${BASE_URL}/${l}/blog/${slugMap[l]}`;
      const date = (post.updatedAt || new Date(STATIC_LAST_MOD)).toISOString().split('T')[0];
      for (const l of available) {
        entries.push(urlEntry(`${BASE_URL}/${l}/blog/${slugMap[l]}`, date, 'weekly', 0.7, alts));
      }
    }
  } catch (e) { console.error('Sitemap blog error:', e); }
  return wrapUrlset(entries);
}

export function getSitemapIndex() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap-pages.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-calculators.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-blog.xml</loc>
  </sitemap>
</sitemapindex>`;
}
