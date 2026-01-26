import { MetadataRoute } from 'next';
import { ALL_CALCULATORS } from '@/config/calculators-config';

const baseUrl = 'https://kalcufy.com';
const locales = ['en', 'es', 'pt'];

// Static pages
const staticPages = [
  'calculators',
  'pricing',
  'blog',
  'about',
  'terms',
  'privacy',
  'cookies',
  'accessibility',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];
  const now = new Date();

  // Generate routes for each locale
  for (const locale of locales) {
    // Home page - highest priority
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    });

    // Static pages
    for (const page of staticPages) {
      routes.push({
        url: `${baseUrl}/${locale}/${page}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }

    // All calculators from config (51 calculators)
    for (const calc of ALL_CALCULATORS) {
      routes.push({
        url: `${baseUrl}/${locale}/${calc.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.9,
      });
    }
  }

  // Fetch blog posts from database
  try {
    const { prisma } = await import('@/lib/prisma');
    const posts = await prisma.post.findMany({
      where: { 
        published: true 
      },
      select: { 
        slug: true, 
        updatedAt: true 
      },
    });

    // Add blog posts for each locale
    for (const locale of locales) {
      for (const post of posts) {
        routes.push({
          url: `${baseUrl}/${locale}/blog/${post.slug}`,
          lastModified: post.updatedAt,
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      }
    }
  } catch (error) {
    // If blog posts can't be fetched, continue without them
    console.error('Error fetching blog posts for sitemap:', error);
  }

  return routes;
}
