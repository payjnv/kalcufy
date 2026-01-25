import { MetadataRoute } from 'next';

const baseUrl = 'https://kalcufy.com';
const locales = ['en', 'es', 'pt'];

// Active calculators
const calculators = [
  'compound-interest-calculator',
  'mortgage-calculator',
  'loan-calculator',
  'auto-loan-calculator',
  'retirement-calculator',
  'savings-calculator',
  'credit-card-payoff-calculator',
  'bmi-calculator',
  'calorie-calculator',
];

// Static pages
const staticPages = [
  'calculators',
  'pricing',
  'blog',
  'about',
  'terms',
  'privacy',
  'cookies',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    // Home page
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    });

    // Static pages
    staticPages.forEach((page) => {
      routes.push({
        url: `${baseUrl}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });

    // Calculators
    calculators.forEach((calc) => {
      routes.push({
        url: `${baseUrl}/${locale}/${calc}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
      });
    });
  });

  return routes;
}
