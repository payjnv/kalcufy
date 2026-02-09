// ─────────────────────────────────────────────────────────────────
// Static Page Metadata Generators
// 
// USAGE: Create a layout.tsx in each static page folder:
//   src/app/[locale]/about/layout.tsx
//   src/app/[locale]/pricing/layout.tsx
//   src/app/[locale]/privacy/layout.tsx
//   src/app/[locale]/terms/layout.tsx
//   src/app/[locale]/cookies/layout.tsx
//   src/app/[locale]/accessibility/layout.tsx
//
// Each layout.tsx imports from this shared config.
// ─────────────────────────────────────────────────────────────────

import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://kalcufy.com";
const LOCALES = ["en", "es", "pt", "fr", "de"] as const;

export interface StaticPageConfig {
  path: string;
  titles: Record<string, string>;
  descriptions: Record<string, string>;
}

export function generateStaticPageMetadata(
  config: StaticPageConfig,
  locale: string
): Metadata {
  const title = config.titles[locale] || config.titles.en;
  const description = config.descriptions[locale] || config.descriptions.en;
  const url = `${BASE_URL}/${locale}/${config.path}`;

  const languages: Record<string, string> = {};
  for (const loc of LOCALES) {
    languages[loc] = `${BASE_URL}/${loc}/${config.path}`;
  }

  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "Kalcufy",
    },
    twitter: { card: "summary", title, description },
  };
}

// ─────────────────────────────────────────────────────────────────
// Page Configs
// ─────────────────────────────────────────────────────────────────

export const ABOUT_CONFIG: StaticPageConfig = {
  path: "about",
  titles: {
    en: "About Kalcufy - Free Online Calculators",
    es: "Sobre Kalcufy - Calculadoras Online Gratis",
    pt: "Sobre Kalcufy - Calculadoras Online Grátis",
    fr: "À propos de Kalcufy - Calculateurs en Ligne Gratuits",
    de: "Über Kalcufy - Kostenlose Online-Rechner",
  },
  descriptions: {
    en: "Learn about Kalcufy, the modern calculator platform built for people who hate bad calculators. Free, fast, and mobile-friendly tools in 5 languages.",
    es: "Conoce Kalcufy, la plataforma de calculadoras moderna creada para quienes odian las calculadoras malas. Herramientas gratuitas, rápidas y optimizadas para móvil en 5 idiomas.",
    pt: "Conheça Kalcufy, a plataforma moderna de calculadoras criada para quem odeia calculadoras ruins. Ferramentas gratuitas, rápidas e otimizadas para celular em 5 idiomas.",
    fr: "Découvrez Kalcufy, la plateforme de calculateurs moderne créée pour ceux qui détestent les mauvais calculateurs. Outils gratuits, rapides et adaptés aux mobiles en 5 langues.",
    de: "Erfahren Sie mehr über Kalcufy, die moderne Rechner-Plattform für alle, die schlechte Rechner hassen. Kostenlose, schnelle und mobilfreundliche Tools in 5 Sprachen.",
  },
};

export const PRICING_CONFIG: StaticPageConfig = {
  path: "pricing",
  titles: {
    en: "Pricing - Free & PRO Plans | Kalcufy",
    es: "Precios - Planes Gratis y PRO | Kalcufy",
    pt: "Preços - Planos Grátis e PRO | Kalcufy",
    fr: "Tarifs - Plans Gratuit et PRO | Kalcufy",
    de: "Preise - Kostenlose & PRO-Pläne | Kalcufy",
  },
  descriptions: {
    en: "Start free with all basic calculators. Upgrade to PRO for $2.99/month to save history, export PDF/Excel, and remove ads.",
    es: "Comienza gratis con todas las calculadoras básicas. Actualiza a PRO por $2.99/mes para guardar historial, exportar PDF/Excel y sin anuncios.",
    pt: "Comece grátis com todas as calculadoras básicas. Atualize para PRO por $2.99/mês para salvar histórico, exportar PDF/Excel e sem anúncios.",
    fr: "Commencez gratuitement avec tous les calculateurs de base. Passez à PRO pour 2,99$/mois pour sauvegarder l'historique, exporter en PDF/Excel et sans publicités.",
    de: "Starten Sie kostenlos mit allen Basisrechnern. Upgraden Sie auf PRO für 2,99$/Monat um Verlauf zu speichern, PDF/Excel zu exportieren und ohne Werbung.",
  },
};

export const PRIVACY_CONFIG: StaticPageConfig = {
  path: "privacy",
  titles: {
    en: "Privacy Policy | Kalcufy",
    es: "Política de Privacidad | Kalcufy",
    pt: "Política de Privacidade | Kalcufy",
    fr: "Politique de Confidentialité | Kalcufy",
    de: "Datenschutzrichtlinie | Kalcufy",
  },
  descriptions: {
    en: "Learn how Kalcufy protects your data and privacy. We never sell your personal information.",
    es: "Conoce cómo Kalcufy protege tus datos y privacidad. Nunca vendemos tu información personal.",
    pt: "Saiba como Kalcufy protege seus dados e privacidade. Nunca vendemos suas informações pessoais.",
    fr: "Découvrez comment Kalcufy protège vos données et votre vie privée. Nous ne vendons jamais vos informations personnelles.",
    de: "Erfahren Sie, wie Kalcufy Ihre Daten und Privatsphäre schützt. Wir verkaufen niemals Ihre persönlichen Daten.",
  },
};

export const TERMS_CONFIG: StaticPageConfig = {
  path: "terms",
  titles: {
    en: "Terms of Service | Kalcufy",
    es: "Términos de Servicio | Kalcufy",
    pt: "Termos de Serviço | Kalcufy",
    fr: "Conditions d'Utilisation | Kalcufy",
    de: "Nutzungsbedingungen | Kalcufy",
  },
  descriptions: {
    en: "Terms of Service for Kalcufy - Free online calculators for finance, health, and everyday calculations.",
    es: "Términos de Servicio de Kalcufy - Calculadoras online gratis para finanzas, salud y cálculos cotidianos.",
    pt: "Termos de Serviço do Kalcufy - Calculadoras online grátis para finanças, saúde e cálculos do dia a dia.",
    fr: "Conditions d'utilisation de Kalcufy - Calculateurs en ligne gratuits pour les finances, la santé et les calculs quotidiens.",
    de: "Nutzungsbedingungen von Kalcufy - Kostenlose Online-Rechner für Finanzen, Gesundheit und alltägliche Berechnungen.",
  },
};

export const COOKIES_CONFIG: StaticPageConfig = {
  path: "cookies",
  titles: {
    en: "Cookie Policy | Kalcufy",
    es: "Política de Cookies | Kalcufy",
    pt: "Política de Cookies | Kalcufy",
    fr: "Politique de Cookies | Kalcufy",
    de: "Cookie-Richtlinie | Kalcufy",
  },
  descriptions: {
    en: "How Kalcufy uses cookies on our website to improve your experience.",
    es: "Cómo Kalcufy usa cookies en nuestro sitio web para mejorar tu experiencia.",
    pt: "Como Kalcufy usa cookies em nosso site para melhorar sua experiência.",
    fr: "Comment Kalcufy utilise les cookies sur notre site web pour améliorer votre expérience.",
    de: "Wie Kalcufy Cookies auf unserer Website verwendet, um Ihre Erfahrung zu verbessern.",
  },
};

export const ACCESSIBILITY_CONFIG: StaticPageConfig = {
  path: "accessibility",
  titles: {
    en: "Accessibility Statement | Kalcufy",
    es: "Declaración de Accesibilidad | Kalcufy",
    pt: "Declaração de Acessibilidade | Kalcufy",
    fr: "Déclaration d'Accessibilité | Kalcufy",
    de: "Barrierefreiheitserklärung | Kalcufy",
  },
  descriptions: {
    en: "Kalcufy's commitment to making our calculator tools accessible to everyone.",
    es: "El compromiso de Kalcufy de hacer nuestras herramientas de cálculo accesibles para todos.",
    pt: "O compromisso do Kalcufy em tornar nossas ferramentas de cálculo acessíveis a todos.",
    fr: "L'engagement de Kalcufy à rendre nos outils de calcul accessibles à tous.",
    de: "Kalcufys Engagement, unsere Rechner-Tools für alle zugänglich zu machen.",
  },
};

export const CALCULATORS_CONFIG: StaticPageConfig = {
  path: "calculators",
  titles: {
    en: "All Calculators - Free Finance, Health & Math Tools | Kalcufy",
    es: "Todas las Calculadoras - Herramientas Gratis de Finanzas, Salud y Matemáticas | Kalcufy",
    pt: "Todas as Calculadoras - Ferramentas Grátis de Finanças, Saúde e Matemática | Kalcufy",
    fr: "Tous les Calculateurs - Outils Gratuits Finance, Santé et Maths | Kalcufy",
    de: "Alle Rechner - Kostenlose Finanz-, Gesundheits- & Mathe-Tools | Kalcufy",
  },
  descriptions: {
    en: "Browse 100+ free online calculators for finance, health, math, and everyday use. Mortgage, BMI, compound interest, calorie, and more. Available in 5 languages.",
    es: "Explora más de 100 calculadoras online gratis para finanzas, salud, matemáticas y uso diario. Hipoteca, IMC, interés compuesto, calorías y más. Disponible en 5 idiomas.",
    pt: "Explore mais de 100 calculadoras online grátis para finanças, saúde, matemática e uso diário. Financiamento, IMC, juros compostos, calorias e mais. Disponível em 5 idiomas.",
    fr: "Parcourez plus de 100 calculateurs en ligne gratuits pour la finance, la santé, les maths et le quotidien. Hypothèque, IMC, intérêts composés, calories et plus. Disponible en 5 langues.",
    de: "Durchsuchen Sie über 100 kostenlose Online-Rechner für Finanzen, Gesundheit, Mathematik und den Alltag. Hypothek, BMI, Zinseszins, Kalorien und mehr. In 5 Sprachen verfügbar.",
  },
};
