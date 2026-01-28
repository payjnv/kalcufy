// src/app/[locale]/calculators/page.tsx
// SSR Version - Google can index this
import { Suspense } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { slugToTranslationKey, ALL_CALCULATORS, type Calculator } from "@/config/calculators-config";
import { getCategoryIcon, getCategoryColors } from "@/config/category-icons";
import { prisma } from "@/lib/prisma";
import CalculatorsClientWrapper from "./CalculatorsClientWrapper";

// Force dynamic rendering
export const dynamic = "force-dynamic";

// Popular calculators (by slug)
const popularSlugs = [
  "compound-interest-calculator",
  "mortgage-calculator",
  "bmi-calculator",
  "calorie-calculator",
  "tip-calculator",
  "percentage-calculator",
];

async function getActiveCalculators() {
  try {
    const activeStatuses = await prisma.calculatorStatus.findMany({
      where: { isActive: true },
      select: { slug: true },
    });
    const activeSlugs = new Set(activeStatuses.map((s) => s.slug));
    return ALL_CALCULATORS.filter((c) => activeSlugs.has(c.slug));
  } catch {
    return ALL_CALCULATORS;
  }
}

async function getCategories() {
  try {
    return await prisma.calculatorCategory.findMany({
      orderBy: { order: "asc" },
    });
  } catch {
    return [];
  }
}

export default async function CalculatorsPage() {
  const locale = await getLocale();
  const t = await getTranslations("calculatorsPage");
  const tCalcNames = await getTranslations("calculators");

  const [calculators, categories] = await Promise.all([
    getActiveCalculators(),
    getCategories(),
  ]);

  const counts = {
    total: calculators.length,
    finance: calculators.filter((c) => c.category === "finance").length,
    health: calculators.filter((c) => c.category === "health").length,
    everyday: calculators.filter((c) => c.category === "everyday").length,
  };

  const getCalculatorName = (calc: Calculator): string => {
    const key = slugToTranslationKey(calc.slug);
    try {
      return tCalcNames(`names.${key}`);
    } catch {
      return calc.slug
        .replace("-calculator", "")
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
  };

  const getCalculatorDesc = (calc: Calculator): string => {
    const key = slugToTranslationKey(calc.slug);
    try {
      return t(`calcs.${key}.desc`);
    } catch {
      return calc.description;
    }
  };

  const getCategoryName = (cat: any): string => {
    if (locale === "es" && cat.nameEs) return cat.nameEs;
    if (locale === "pt" && cat.namePt) return cat.namePt;
    return cat.nameEn;
  };

  // Group calculators by category
  const calculatorsByCategory: Record<string, Calculator[]> = {};
  categories.forEach((cat) => {
    calculatorsByCategory[cat.slug] = calculators.filter(
      (c) => c.category === cat.slug
    );
  });

  const popularCalculators = popularSlugs
    .map((slug) => calculators.find((c) => c.slug === slug))
    .filter((c): c is Calculator => c !== undefined);

  return (
    <>
      <Header />
      <main id="main-content" className="pt-24 pb-16 min-h-screen bg-slate-50">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              {t("title")}
            </h1>
            <p className="text-slate-600 text-sm md:text-base">
              {t("subtitle")}
            </p>
          </div>

          {/* Client wrapper for search/filter */}
          <Suspense fallback={null}>
            <CalculatorsClientWrapper
              calculators={calculators}
              categories={categories}
              counts={counts}
              locale={locale}
            />
          </Suspense>

          {/* Static content for SEO - always rendered */}
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
                        <span className={colors.text}>
                          {getCategoryIcon(cat.slug, "w-5 h-5")}
                        </span>
                        {getCategoryName(cat)}
                        <span className="text-slate-400 font-normal text-sm">
                          ({calcs.length})
                        </span>
                      </h2>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {calcs.map((calc) => (
                          <li key={calc.slug}>
                            <Link
                              href={`/${locale}/${calc.slug}`}
                              className="block bg-white p-5 rounded-xl shadow-sm border border-slate-100"
                            >
                              <h3 className="font-semibold text-slate-900 mb-2">
                                {getCalculatorName(calc)}
                              </h3>
                              <p className="text-sm text-slate-600">
                                {getCalculatorDesc(calc)}
                              </p>
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

          {/* Hidden SEO content - Google will see this */}
          <div className="sr-only" aria-hidden="true">
            <h2>All Calculators on Kalcufy</h2>
            <ul>
              {calculators.map((calc) => (
                <li key={calc.slug}>
                  <Link href={`/${locale}/${calc.slug}`}>
                    {getCalculatorName(calc)} - {getCalculatorDesc(calc)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
