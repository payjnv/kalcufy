// KALCUFY V4 - SLUG UTILITIES

import type { Locale } from "../types/engine.types";
import { getEntryBySlug, getInternalSlug, getLocalizedSlug, getAlternateUrls, slugExists } from "./registry";

/**
 * Determina si una URL necesita rewrite
 * @example needsRewrite("calculadora-imc", "es") → true
 * @example needsRewrite("bmi-calculator", "en") → false
 */
export function needsRewrite(slug: string, locale: Locale): boolean {
  if (locale === "en") return false; // Inglés nunca necesita rewrite
  
  const entry = getEntryBySlug(slug, locale);
  if (!entry) return false;
  
  // Necesita rewrite si el slug localizado es diferente al interno
  return entry.slugs[locale] !== entry.slugs.en;
}

/**
 * Obtiene la URL de destino para rewrite
 * @example getRewriteDestination("calculadora-imc", "es") → "/es/bmi-calculator"
 */
export function getRewriteDestination(slug: string, locale: Locale): string | null {
  const internalSlug = getInternalSlug(slug, locale);
  if (!internalSlug) return null;
  
  return `/${locale}/${internalSlug}`;
}

/**
 * Construye la URL canónica para una calculadora
 * @example getCanonicalUrl("bmi", "es", "https://www.kalcufy.com") → "https://www.kalcufy.com/es/calculadora-imc"
 */
export function getCanonicalUrl(calculatorId: string, locale: Locale, baseUrl: string): string {
  const localizedSlug = getLocalizedSlug(calculatorId + "-calculator", locale);
  if (!localizedSlug) {
    return `${baseUrl}/${locale}/${calculatorId}-calculator`;
  }
  return `${baseUrl}/${locale}/${localizedSlug}`;
}

/**
 * Genera meta tags hreflang para SEO
 */
export interface HreflangTag {
  locale: Locale | "x-default";
  href: string;
}

export function generateHreflangTags(internalSlug: string, baseUrl: string): HreflangTag[] {
  const alternates = getAlternateUrls(internalSlug);
  if (!alternates) return [];
  
  const tags: HreflangTag[] = [
    { locale: "en", href: `${baseUrl}${alternates.en}` },
    { locale: "es", href: `${baseUrl}${alternates.es}` },
    { locale: "pt", href: `${baseUrl}${alternates.pt}` },
    { locale: "x-default", href: `${baseUrl}${alternates.en}` },
  ];
  
  return tags;
}

/**
 * Parsea una URL y extrae información
 */
export interface ParsedUrl {
  locale: Locale;
  slug: string;
  internalSlug: string | undefined;
  isLocalized: boolean;
  needsRedirect: boolean;
  redirectTo?: string;
}

export function parseCalculatorUrl(pathname: string): ParsedUrl | null {
  // Extraer locale y slug de la URL
  const match = pathname.match(/^\/(en|es|pt)\/(.+?)$/);
  if (!match) return null;
  
  const locale = match[1] as Locale;
  const slug = match[2];
  
  // Verificar si el slug existe
  const entry = getEntryBySlug(slug, locale);
  const internalSlug = entry?.slugs.en;
  
  // Verificar si está usando el slug correcto para el locale
  const correctSlug = internalSlug ? getLocalizedSlug(internalSlug, locale) : undefined;
  const isLocalized = slug === correctSlug;
  
  // Determinar si necesita redirect (ej: /es/bmi-calculator → /es/calculadora-imc)
  const needsRedirect = !!correctSlug && slug !== correctSlug && locale !== "en";
  
  return {
    locale,
    slug,
    internalSlug,
    isLocalized,
    needsRedirect,
    redirectTo: needsRedirect ? `/${locale}/${correctSlug}` : undefined,
  };
}

/**
 * Genera el mapa de redirects para next.config.js
 */
export interface RedirectConfig {
  source: string;
  destination: string;
  permanent: boolean;
  locale: false;
}

export function generateRedirectConfigs(): RedirectConfig[] {
  const redirects: RedirectConfig[] = [];
  
  // Para ES y PT: redirect del slug inglés al localizado
  const locales: Locale[] = ["es", "pt"];
  
  for (const entry of getAllEntriesForRedirects()) {
    for (const locale of locales) {
      const localizedSlug = entry.slugs[locale] || entry.slugs.en;
      
      // Solo crear redirect si el slug es diferente
      if (localizedSlug !== entry.slugs.en) {
        redirects.push({
          source: `/${locale}/${entry.slugs.en}`,
          destination: `/${locale}/${localizedSlug}`,
          permanent: true,
          locale: false,
        });
      }
    }
  }
  
  return redirects;
}

// Import necesario para generateRedirectConfigs
import { getAllEntries as getAllEntriesForRedirects } from "./registry";

/**
 * Valida que todos los slugs sean únicos por locale
 */
export function validateSlugUniqueness(): { isValid: boolean; duplicates: string[] } {
  const seen: Record<Locale, Set<string>> = {
    en: new Set(),
    es: new Set(),
    pt: new Set(),
  };
  
  const duplicates: string[] = [];
  
  for (const entry of getAllEntriesForRedirects()) {
    // Check EN
    if (seen.en.has(entry.slugs.en)) {
      duplicates.push(`EN: ${entry.slugs.en}`);
    }
    seen.en.add(entry.slugs.en);
    
    // Check ES
    if (seen.es.has(entry.slugs.es)) {
      duplicates.push(`ES: ${entry.slugs.es}`);
    }
    seen.es.add(entry.slugs.es);
    
    // Check PT
    const ptSlug = entry.slugs.pt || entry.slugs.en;
    if (seen.pt.has(ptSlug)) {
      duplicates.push(`PT: ${ptSlug}`);
    }
    seen.pt.add(ptSlug);
  }
  
  return {
    isValid: duplicates.length === 0,
    duplicates,
  };
}

export default {
  needsRewrite,
  getRewriteDestination,
  getCanonicalUrl,
  generateHreflangTags,
  parseCalculatorUrl,
  generateRedirectConfigs,
  validateSlugUniqueness,
};
