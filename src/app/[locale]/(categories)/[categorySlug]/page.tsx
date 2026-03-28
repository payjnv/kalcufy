import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORY_PAGES, getCategoryBySlug } from "@/lib/category-pages-config";
import { SLUG_REGISTRY } from "@/engine/v4/slugs/registry";
import { getCategoryIcon } from "@/config/category-icons";

type Params = { locale: string; categorySlug: string };
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.kalcufy.com";
const LOCALES = ["en", "es", "pt", "fr", "de"] as const;

// ─── Breadcrumb translations ───
const BREADCRUMB: Record<string, { home: string; calculators: string }> = {
  en: { home: "Home", calculators: "Calculators" },
  es: { home: "Inicio", calculators: "Calculadoras" },
  pt: { home: "Início", calculators: "Calculadoras" },
  fr: { home: "Accueil", calculators: "Calculateurs" },
  de: { home: "Startseite", calculators: "Rechner" },
};

const CALC_COUNT_LABEL: Record<string, string> = {
  en: "calculators", es: "calculadoras", pt: "calculadoras", fr: "calculateurs", de: "Rechner",
};

const TRY_IT: Record<string, string> = {
  en: "Try it free →", es: "Pruébalo gratis →", pt: "Experimente grátis →", fr: "Essayez gratuitement →", de: "Kostenlos testen →",
};

// ─── SEO Metadata ───
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, categorySlug } = await params;
  const cat = getCategoryBySlug(categorySlug);
  if (!cat) return {};

  const languages: Record<string, string> = {};
  for (const loc of LOCALES) {
    languages[loc] = `${BASE_URL}/${loc}/${cat.slugs[loc]}`;
  }
  languages["x-default"] = `${BASE_URL}/en/${cat.slugs.en}`;

  return {
    title: cat.titles[locale] || cat.titles.en,
    description: cat.descriptions[locale] || cat.descriptions.en,
    keywords: cat.keywords[locale] || cat.keywords.en,
    alternates: {
      canonical: `${BASE_URL}/${locale}/${cat.slugs[locale]}`,
      languages,
    },
    openGraph: {
      title: cat.titles[locale] || cat.titles.en,
      description: cat.descriptions[locale] || cat.descriptions.en,
      url: `${BASE_URL}/${locale}/${cat.slugs[locale]}`,
      type: "website",
      siteName: "Kalcufy",
    },
  };
}

// ─── Static params (all category slugs × all locales) ───
export function generateStaticParams() {
  return CATEGORY_PAGES.flatMap((cat) =>
    LOCALES.map((locale) => ({
      locale,
      categorySlug: cat.slugs[locale],
    }))
  );
}

// ─── Helper: get calculator name from config ───
async function getCalcName(entryId: string, locale: string): Promise<{ name: string; description: string }> {
  let name = entryId.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase());
  let description = "";
  try {
    const mod = await import(`@/calculators/${entryId}/index`);
    const config = mod.config || mod.default || Object.values(mod).find(
      (v: unknown): v is Record<string, unknown> => v !== null && typeof v === "object" && "id" in (v as Record<string, unknown>)
    );
    if (config && typeof config === "object") {
      const c = config as Record<string, unknown>;
      const t = c.t as Record<string, Record<string, unknown>> | undefined;
      const localeT = t?.[locale] || t?.en;
      if (localeT) {
        name = (localeT.name as string) || name;
        const seo = localeT.seo as { shortDescription?: string; description?: string } | undefined;
        description = seo?.shortDescription || seo?.description || "";
      }
    }
  } catch {}
  return { name, description };
}

// ─── Page Component ───
export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { locale, categorySlug } = await params;
  const cat = getCategoryBySlug(categorySlug);
  if (!cat) notFound();

  // Check if this slug matches the current locale, redirect if not
  const correctSlug = cat.slugs[locale] || cat.slugs.en;
  if (categorySlug !== correctSlug) {
    const { permanentRedirect } = await import("next/navigation");
    permanentRedirect(`/${locale}/${correctSlug}`);
  }

  // Get calculators for this category
  const entries = SLUG_REGISTRY.filter((e) =>
    cat.registryCategory.includes(e.category)
  );

  // Load names for all calculators
  const calcsWithNames = await Promise.all(
    entries.map(async (entry) => {
      const { name, description } = await getCalcName(entry.id, locale);
      const slug = entry.slugs[locale as keyof typeof entry.slugs] || entry.slugs.en;
      return { id: entry.id, name, description, slug };
    })
  );

  const subtitle = cat.subtitles[locale] || cat.subtitles.en;
  const title = (cat.titles[locale] || cat.titles.en).split(" | ")[0]; // Remove "| Kalcufy"
  const bc = BREADCRUMB[locale] || BREADCRUMB.en;
  const countLabel = CALC_COUNT_LABEL[locale] || "calculators";
  const tryIt = TRY_IT[locale] || "Try it free →";

  // CollectionPage schema
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: cat.descriptions[locale] || cat.descriptions.en,
    url: `${BASE_URL}/${locale}/${correctSlug}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: calcsWithNames.length,
      itemListElement: calcsWithNames.map((calc, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: calc.name,
        url: `${BASE_URL}/${locale}/${calc.slug}`,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-4 pb-6 md:py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-600 mb-4">
            <Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">{bc.home}</Link>
            <span className="text-slate-400">/</span>
            <Link href={`/${locale}/calculators`} className="hover:text-blue-600 transition-colors">{bc.calculators}</Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-medium">{title}</span>
          </nav>

          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{cat.icon}</span>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">{title}</h1>
          </div>
          <p className="text-slate-600 text-lg max-w-3xl">{subtitle}</p>
          <p className="text-sm text-slate-500 mt-2">{calcsWithNames.length} {countLabel}</p>
        </div>
      </section>

      {/* Calculator Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {calcsWithNames.map((calc) => (
              <Link
                key={calc.id}
                href={`/${locale}/${calc.slug}`}
                className="group bg-white rounded-xl border border-slate-200 p-5 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <h2 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                  {calc.name}
                </h2>
                {calc.description && (
                  <p className="text-sm text-slate-500 line-clamp-2 mb-3">{calc.description}</p>
                )}
                <span className="text-sm font-medium text-blue-600">{tryIt}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Text */}
      <section className="py-8 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-xl font-bold text-slate-900 mb-4">{title}</h2>
          <p className="text-slate-600 leading-relaxed">{cat.descriptions[locale] || cat.descriptions.en}</p>
        </div>
      </section>
    </>
  );
}
