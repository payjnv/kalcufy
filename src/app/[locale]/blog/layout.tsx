import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.kalcufy.com";
const LOCALES = ["en", "es", "pt", "fr", "de"] as const;

const blogMeta: Record<string, { title: string; description: string }> = {
  en: {
    title: "Blog - Financial & Health Insights | Kalcufy",
    description: "Practical articles with formulas, examples, and tools to make better financial and health decisions. Free guides on mortgages, BMI, calories, investments and more.",
  },
  es: {
    title: "Blog - Artículos de Finanzas y Salud | Kalcufy",
    description: "Artículos prácticos con fórmulas, ejemplos y herramientas para tomar mejores decisiones financieras y de salud. Guías gratuitas sobre hipotecas, IMC, calorías e inversiones.",
  },
  pt: {
    title: "Blog - Insights de Finanças e Saúde | Kalcufy",
    description: "Artigos práticos com fórmulas, exemplos e ferramentas para tomar melhores decisões financeiras e de saúde. Guias gratuitos sobre financiamentos, IMC, calorias e investimentos.",
  },
  fr: {
    title: "Blog - Conseils Finance et Santé | Kalcufy",
    description: "Articles pratiques avec formules, exemples et outils pour prendre de meilleures décisions financières et de santé. Guides gratuits sur les hypothèques, IMC, calories et investissements.",
  },
  de: {
    title: "Blog - Finanz- & Gesundheitstipps | Kalcufy",
    description: "Praktische Artikel mit Formeln, Beispielen und Tools für bessere Finanz- und Gesundheitsentscheidungen. Kostenlose Ratgeber zu Hypotheken, BMI, Kalorien und Investitionen.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = blogMeta[locale] || blogMeta.en;
  const url = `${BASE_URL}/${locale}/blog`;

  const languages: Record<string, string> = {};
  for (const loc of LOCALES) {
    languages[loc] = `${BASE_URL}/${loc}/blog`;
  }

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
      languages,
    },
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

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
