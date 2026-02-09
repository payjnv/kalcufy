import fs from 'fs';
import path from 'path';

export interface SiteSettings {
  site: { name: string; tagline: string; url: string; logo: string; favicon: string };
  seo: { titleTemplate: string; defaultTitle: string; defaultDescription: string; defaultOgImage: string; defaultLocale: string; canonicalBase: string };
  google: { searchConsoleId: string; analyticsId: string; adsenseId: string; tagManagerId: string };
  social: { twitter: string; facebook: string; linkedin: string; github: string; youtube: string };
  schema: { organizationName: string; organizationLogo: string; contactEmail: string; foundingDate: string; sameAs: string[] };
  robots: { allowAll: boolean; disallowPaths: string[]; customRules: string };
  sitemap: { autoGenerate: boolean; changeFrequency: string; priority: string; excludePaths: string[] };
  indexing: { noindexDrafts: boolean; noindexPagination: boolean; forceTrailingSlash: boolean; hreflangEnabled: boolean; activeLanguages: string[] };
}

const SETTINGS_PATH = path.join(process.cwd(), 'src', 'config', 'site-settings.json');

const DEFAULTS: SiteSettings = {
  site: { name: 'Kalcufy', tagline: 'Free Online Calculators', url: 'https://kalcufy.com', logo: '/favicon.png', favicon: '/favicon.png' },
  seo: { titleTemplate: '%s | Kalcufy', defaultTitle: 'Kalcufy - Free Online Calculators', defaultDescription: 'Free online calculators for finance, health, and everyday decisions. Mortgage, loans, BMI, calories and 40+ more tools.', defaultOgImage: '/og-default.png', defaultLocale: 'en', canonicalBase: 'https://kalcufy.com' },
  google: { searchConsoleId: '', analyticsId: '', adsenseId: '', tagManagerId: '' },
  social: { twitter: '', facebook: '', linkedin: '', github: '', youtube: '' },
  schema: { organizationName: 'Kalcufy', organizationLogo: 'https://kalcufy.com/favicon.png', contactEmail: '', foundingDate: '2024', sameAs: [] },
  robots: { allowAll: true, disallowPaths: ['/api/', '/*/login', '/*/register', '/*/dashboard', '/*/profile', '/*/admin'], customRules: '' },
  sitemap: { autoGenerate: true, changeFrequency: 'weekly', priority: '0.8', excludePaths: ['/admin', '/auth'] },
  indexing: { noindexDrafts: true, noindexPagination: false, forceTrailingSlash: false, hreflangEnabled: true, activeLanguages: ['en', 'es', 'pt', 'fr', 'de'] },
};

export function getSiteSettings(): SiteSettings {
  try {
    if (fs.existsSync(SETTINGS_PATH)) {
      const raw = fs.readFileSync(SETTINGS_PATH, 'utf-8');
      const saved = JSON.parse(raw);
      return deepMerge(DEFAULTS, saved) as SiteSettings;
    }
  } catch (e) {
    console.error('Error loading site settings:', e);
  }
  return DEFAULTS;
}

function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key]) && target[key] && typeof target[key] === 'object' && !Array.isArray(target[key])) {
      result[key] = deepMerge(target[key] as Record<string, unknown>, source[key] as Record<string, unknown>);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

