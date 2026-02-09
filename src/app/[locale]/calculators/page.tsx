// src/app/[locale]/calculators/page.tsx
// V4 Version - Shows V4 calculators with subcategory tree sidebar
import { Suspense } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getCategoryIcon, getCategoryColors } from "@/config/category-icons";
import { prisma } from "@/lib/prisma";
import CalculatorsClientWrapperV4 from "./CalculatorsClientWrapperV4";

export const dynamic = "force-dynamic";

// ─── #1 SEO: generateMetadata ────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("calculatorsPage");

  const titles: Record<string, string> = {
    en: "Free Online Calculators - Finance, Health, Math & More | Kalcufy",
    es: "Calculadoras Online Gratis - Finanzas, Salud, Matemáticas | Kalcufy",
    pt: "Calculadoras Online Grátis - Finanças, Saúde, Matemática | Kalcufy",
    fr: "Calculateurs en Ligne Gratuits - Finance, Santé, Math | Kalcufy",
    de: "Kostenlose Online-Rechner - Finanzen, Gesundheit, Mathe | Kalcufy",
  };

  const descriptions: Record<string, string> = {
    en: "Browse 60+ free calculators for finance, health & fitness, math, and everyday needs. BMI, mortgage, calories, compound interest and more.",
    es: "Explora 60+ calculadoras gratis para finanzas, salud, matemáticas y más. IMC, hipoteca, calorías, interés compuesto y más.",
    pt: "Explore 60+ calculadoras grátis para finanças, saúde, matemática e mais. IMC, hipoteca, calorias, juros compostos e mais.",
    fr: "Découvrez 60+ calculateurs gratuits pour la finance, la santé, les maths et plus. IMC, hypothèque, calories, intérêts composés.",
    de: "Entdecken Sie 60+ kostenlose Rechner für Finanzen, Gesundheit, Mathe und mehr. BMI, Hypothek, Kalorien, Zinseszins und mehr.",
  };

  // Translated paths for hreflang
  const calculatorsPaths: Record<string, string> = {
    en: "/en/calculators",
    es: "/es/calculadoras",
    pt: "/pt/calculadoras",
    fr: "/fr/calculateurs",
    de: "/de/rechner",
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: calculatorsPaths[locale] || calculatorsPaths.en,
      languages: calculatorsPaths,
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      type: "website",
    },
  };
}

interface V4Calculator {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  subcategoryId?: string | null;
  isNew?: boolean;
}

async function loadV4Calculators(locale: string): Promise<V4Calculator[]> {
  const calculators: V4Calculator[] = [];

  const [inactiveStatuses, allStatuses] = await Promise.all([
    prisma.calculatorStatus.findMany({
      where: { isActive: false },
      select: { slug: true },
    }),
    prisma.calculatorStatus.findMany({
      where: { isActive: true },
      select: { slug: true, subcategoryId: true },
    }),
  ]);

  const inactiveSlugs = new Set(inactiveStatuses.map((s) => s.slug));
  const subcategoryMap = new Map(allStatuses.map((s) => [s.slug, s.subcategoryId]));

  const { SLUG_REGISTRY } = await import("@/engine/v4/slugs/registry");
  const activeEntries = SLUG_REGISTRY.filter((entry) => {
    if (entry.category === "drafts") return false;
    if (inactiveSlugs.has(entry.slugs.en)) return false;
    return true;
  });

  for (const entry of activeEntries) {
    try {
      const module = await import(`@/calculators/${entry.id}/index`);
      const configKey = Object.keys(module).find((k) => k.includes("Config") || k.includes("config"));
      if (!configKey) continue;
      const config = module[configKey];
      const t = config.t?.[locale] || config.t?.en;
      if (t) {
        const enSlug = entry.slugs.en;
        calculators.push({
          id: entry.id,
          slug: entry.slugs[locale as keyof typeof entry.slugs] || enSlug,
          name: t.name || entry.id,
          description: t.subtitle || t.seo?.description?.slice(0, 100) || "",
          icon: config.icon || "🧮",
          category: entry.category,
          subcategoryId: subcategoryMap.get(enSlug) || null,
          isNew: true,
        });
      }
    } catch (e) {
      console.log(`Could not load V4 calculator: ${entry.id}`, e);
    }
  }
  return calculators;
}

async function getCategories() {
  try {
    return await prisma.calculatorCategory.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } });
  } catch { return []; }
}

async function getSubcategories() {
  try {
    return await prisma.calculatorSubcategory.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } });
  } catch { return []; }
}

export default async function CalculatorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("calculatorsPage");

  const [calculators, categories, subcategories] = await Promise.all([
    loadV4Calculators(locale),
    getCategories(),
    getSubcategories(),
  ]);

  const counts: Record<string, number> = { total: calculators.length };
  for (const cat of categories) {
    counts[cat.slug] = calculators.filter((c) => c.category === cat.slug).length;
  }

  const getCategoryName = (cat: any): string => {
    if (locale === "es" && cat.nameEs) return cat.nameEs;
    if (locale === "fr" && cat.nameFr) return cat.nameFr;
    if (locale === "de" && cat.nameDe) return cat.nameDe;
    if (locale === "pt" && cat.namePt) return cat.namePt;
    return cat.nameEn;
  };

  const calculatorsByCategory: Record<string, V4Calculator[]> = {};
  categories.forEach((cat) => {
    calculatorsByCategory[cat.slug] = calculators.filter((c) => c.category === cat.slug);
  });

  return (
    <>
      <Header />
      <main id="main-content" className="pt-24 pb-16 min-h-screen bg-slate-50">
        <div className="container mx-auto px-4">
          <Suspense fallback={null}>
            <CalculatorsClientWrapperV4
              calculators={calculators}
              categories={categories}
              subcategories={subcategories}
              counts={counts}
              locale={locale}
            />
          </Suspense>

          {/* noscript SEO fallback */}
          <noscript>
            <div className="flex gap-8">
              <div className="flex-1">
                {categories.map((cat) => {
                  const calcs = calculatorsByCategory[cat.slug] || [];
                  if (calcs.length === 0) return null;
                  const colors = getCategoryColors(cat.color);
                  return (
                    <section key={cat.id} className="mb-8">
                      <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                        <span className={colors.text}>{getCategoryIcon(cat.slug, "w-5 h-5")}</span>
                        {getCategoryName(cat)}
                        <span className="text-slate-400 font-normal text-sm">({calcs.length})</span>
                      </h2>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {calcs.map((calc) => (
                          <li key={calc.slug}>
                            <Link href={`/${locale}/${calc.slug}`} className="block bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                              <h3 className="font-semibold text-slate-900 mb-2">{calc.icon} {calc.name}</h3>
                              <p className="text-sm text-slate-600">{calc.description}</p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                })}
              </div>
            </div>
          </noscript>

          <div className="sr-only" aria-hidden="true">
            <h2>{t("title")} - Kalcufy</h2>
            <ul>
              {calculators.map((calc) => (
                <li key={calc.slug}>
                  <Link href={`/${locale}/${calc.slug}`}>{calc.name} - {calc.description}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
