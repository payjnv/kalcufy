// ─────────────────────────────────────────────────────────────────
// Homepage SEO Metadata Generator
// ─────────────────────────────────────────────────────────────────

import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.kalcufy.com";
const LOCALES = ["en", "es", "pt", "fr", "de"] as const;

const homeMeta: Record<string, { title: string; description: string }> = {
  en: {
    title: "Kalcufy - Free Online Calculators for Finance, Health & Math",
    description: "Free, fast calculators for loans, mortgages, BMI, calories, compound interest and more. Make smarter decisions in seconds. Available in 5 languages.",
  },
  es: {
    title: "Kalcufy - Calculadoras Online Gratis de Finanzas, Salud y Matemáticas",
    description: "Calculadoras gratuitas y rápidas para préstamos, hipotecas, IMC, calorías, interés compuesto y más. Toma mejores decisiones en segundos. Disponible en 5 idiomas.",
  },
  pt: {
    title: "Kalcufy - Calculadoras Online Grátis de Finanças, Saúde e Matemática",
    description: "Calculadoras gratuitas e rápidas para empréstimos, financiamentos, IMC, calorias, juros compostos e mais. Tome decisões mais inteligentes em segundos. Disponível em 5 idiomas.",
  },
  fr: {
    title: "Kalcufy - Calculateurs en Ligne Gratuits pour Finance, Santé et Maths",
    description: "Calculateurs gratuits et rapides pour prêts, hypothèques, IMC, calories, intérêts composés et plus. Prenez de meilleures décisions en quelques secondes. Disponible en 5 langues.",
  },
  de: {
    title: "Kalcufy - Kostenlose Online-Rechner für Finanzen, Gesundheit & Mathematik",
    description: "Kostenlose, schnelle Rechner für Kredite, Hypotheken, BMI, Kalorien, Zinseszins und mehr. Treffen Sie klügere Entscheidungen in Sekunden. In 5 Sprachen verfügbar.",
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
