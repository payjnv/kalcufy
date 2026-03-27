// ─────────────────────────────────────────────────────────────────
// Homepage SEO Metadata Generator
// ─────────────────────────────────────────────────────────────────

import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.kalcufy.com";
const LOCALES = ["en", "es", "pt", "fr", "de"] as const;

const homeMeta: Record<string, { title: string; description: string }> = {
  en: {
    title: "Kalcufy",
    description: "Make smarter decisions with fast, accurate calculators for finance, fitness, and everyday life. Simple, powerful, and built for real results.",
  },
  es: {
    title: "Kalcufy",
    description: "Toma mejores decisiones con calculadoras rápidas y precisas para finanzas, salud y la vida diaria. Simple, potente y diseñado para resultados reales.",
  },
  pt: {
    title: "Kalcufy",
    description: "Tome decisões mais inteligentes com calculadoras rápidas e precisas para finanças, saúde e o dia a dia. Simples, poderoso e feito para resultados reais.",
  },
  fr: {
    title: "Kalcufy",
    description: "Prenez de meilleures décisions avec des calculateurs rapides et précis pour la finance, la santé et le quotidien. Simple, puissant et conçu pour de vrais résultats.",
  },
  de: {
    title: "Kalcufy",
    description: "Treffen Sie klügere Entscheidungen mit schnellen, präzisen Rechnern für Finanzen, Gesundheit und den Alltag. Einfach, leistungsstark und für echte Ergebnisse gebaut.",
  },
};

export function generateHomepageMetadata(locale: string): Metadata {
  const meta = homeMeta[locale] || homeMeta.en;
  const url = `${BASE_URL}/${locale}`;

  const languages: Record<string, string> = {};
  for (const loc of LOCALES) {
    languages[loc] = `${BASE_URL}/${loc}`;
  }

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url, languages },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      type: "website",
      siteName: "Kalcufy",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

// WebSite schema for homepage (helps with Google Sitelinks Search Box)
export function buildWebSiteSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kalcufy",
    url: `${BASE_URL}/${locale}`,
    description: (homeMeta[locale] || homeMeta.en).description,
    inLanguage: locale,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/${locale}/calculators?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
