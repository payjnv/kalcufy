// KALCUFY V4 - SITEMAP MULTILENGUAJE COMPLETO
// Incluye: Páginas estáticas, Category Pages, Calculadoras V4 (solo activas), Blog Posts
import { MetadataRoute } from 'next';
import { SLUG_REGISTRY } from '@/engine/v4/slugs/registry';

import { prisma } from '@/lib/prisma';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://kalcufy.com';
const LOCALES = ['en', 'es', 'pt', 'fr', 'de'] as const;
type Locale = (typeof LOCALES)[number];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  // ─────────────────────────────────────────────────────────────────────────
  // 1. PÁGINAS ESTÁTICAS (cada idioma tiene su propia entrada)
  // ─────────────────────────────────────────────────────────────────────────
  const staticPages = [
    { path: '', priority: 1.0, changeFreq: 'weekly' as const },
    { path: 'calculators', priority: 0.9, changeFreq: 'weekly' as const },
    { path: 'blog', priority: 0.7, changeFreq: 'weekly' as const },
    { path: 'about', priority: 0.5, changeFreq: 'monthly' as const },
    { path: 'pricing', priority: 0.6, changeFreq: 'monthly' as const },
    { path: 'accessibility', priority: 0.3, changeFreq: 'yearly' as const },
    { path: 'privacy', priority: 0.3, changeFreq: 'yearly' as const },
    { path: 'terms', priority: 0.3, changeFreq: 'yearly' as const },
    { path: 'cookies', priority: 0.3, changeFreq: 'yearly' as const },
  ];

  const createStaticAlternates = (path: string) => {
    const languages: Record<string, string> = {};
    for (const locale of LOCALES) {
      languages[locale] = path ? `${BASE_URL}/${locale}/${path}` : `${BASE_URL}/${locale}`;
    }
    return { languages };
  };

  for (const page of staticPages) {
    for (const locale of LOCALES) {
      const url = page.path ? `${BASE_URL}/${locale}/${page.path}` : `${BASE_URL}/${locale}`;
      entries.push({
        url,
        lastModified: now,
        changeFrequency: page.changeFreq,
        priority: page.priority,
        alternates: createStaticAlternates(page.path),
      });
    }
  }

  // DISABLED:   // ─────────────────────────────────────────────────────────────────────────
  // DISABLED:   // 2. CATEGORY PAGES (for Google Sitelinks)
  // DISABLED:   // ─────────────────────────────────────────────────────────────────────────
  // DISABLED:   for (const cat of CATEGORY_PAGES) {
  // DISABLED:     const alternates = {
  // DISABLED:       languages: Object.fromEntries(
  // DISABLED:         LOCALES.map((loc) => [loc, `${BASE_URL}/${loc}/${cat.slugs[loc] || cat.slugs.en}`])
  // DISABLED:       ),
  // DISABLED:     };
  // DISABLED: 
  // DISABLED:     for (const locale of LOCALES) {
  // DISABLED:       entries.push({
  // DISABLED:         url: `${BASE_URL}/${locale}/${cat.slugs[locale] || cat.slugs.en}`,
  // DISABLED:         lastModified: now,
  // DISABLED:         changeFrequency: 'weekly',
  // DISABLED:         priority: 0.85,
  // DISABLED:         alternates,
  // DISABLED:       });
  // DISABLED:     }
  // DISABLED:   }

  // ─────────────────────────────────────────────────────────────────────────
  // 3. CALCULADORAS V4 (solo activas, sin drafts)
  // ─────────────────────────────────────────────────────────────────────────
  
  let activeCalcSlugs: Set<string> = new Set();
  try {
    const activeCalcs = await prisma.calculatorStatus.findMany({
      where: { isActive: true },
      select: { slug: true },
    });
    activeCalcSlugs = new Set(activeCalcs.map(c => c.slug));
  } catch (error) {
    console.error('Error fetching active calculators:', error);
  }

  for (const entry of SLUG_REGISTRY) {
    if (entry.category === 'drafts') continue;
    if (activeCalcSlugs.size > 0 && !activeCalcSlugs.has(entry.slugs.en)) continue;

    const alternates = {
      languages: {
        en: `${BASE_URL}/en/${entry.slugs.en}`,
        es: `${BASE_URL}/es/${entry.slugs.es}`,
        pt: `${BASE_URL}/pt/${entry.slugs.pt}`,
        fr: `${BASE_URL}/fr/${entry.slugs.fr}`,
        de: `${BASE_URL}/de/${entry.slugs.de}`,
      },
    };

    for (const locale of LOCALES) {
      const slug = entry.slugs[locale];
      entries.push({
        url: `${BASE_URL}/${locale}/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates,
      });
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 4. BLOG POSTS (5 idiomas, solo idiomas que tienen slug propio)
  // ─────────────────────────────────────────────────────────────────────────
  try {
    const posts = await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      select: {
        slugEn: true,
        slugEs: true,
        slugPt: true,
        slugFr: true,
        slugDe: true,
        updatedAt: true,
      },
    });

    for (const post of posts) {
      const slugMap: Partial<Record<Locale, string>> = {};
      if (post.slugEn) slugMap.en = post.slugEn;
      if (post.slugEs) slugMap.es = post.slugEs;
      if (post.slugPt) slugMap.pt = post.slugPt;
      if (post.slugFr) slugMap.fr = post.slugFr;
      if (post.slugDe) slugMap.de = post.slugDe;

      const availableLocales = Object.keys(slugMap) as Locale[];
      if (availableLocales.length === 0) continue;

      const alternates = {
        languages: Object.fromEntries(
          availableLocales.map(locale => [
            locale,
            `${BASE_URL}/${locale}/blog/${slugMap[locale]}`,
          ])
        ),
      };

      for (const locale of availableLocales) {
        entries.push({
          url: `${BASE_URL}/${locale}/blog/${slugMap[locale]}`,
          lastModified: post.updatedAt || now,
          changeFrequency: 'weekly',
          priority: 0.7,
          alternates,
        });
      }
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  return entries;
}
