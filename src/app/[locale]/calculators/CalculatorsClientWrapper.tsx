"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { slugToTranslationKey, type Calculator } from "@/config/calculators-config";
import { getCategoryIcon, getCategoryColors } from "@/config/category-icons";
import { getSlugForLocale } from "@/engine/v4/slugs/registry";

interface Category {
  id: string;
  slug: string;
  nameEn: string;
  nameEs: string | null;
  namePt: string | null;
  nameFr: string | null;
  nameDe: string | null;
  icon: string | null;
  color: string;
}

interface Props {
  calculators: Calculator[];
  categories: Category[];
  counts: { total: number; finance: number; health: number; everyday: number };
  locale: string;
}

const popularSlugs = [
  "compound-interest-calculator",
  "mortgage-calculator",
  "bmi-calculator",
  "calorie-calculator",
  "tip-calculator",
  "percentage-calculator",
];

export default function CalculatorsClientWrapper({ calculators, categories, counts, locale }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const t = useTranslations("calculatorsPage");
  const tCalcNames = useTranslations("calculators");

  const getCategoryName = (cat: Category): string => {
    if (locale === "es" && cat.nameEs) return cat.nameEs;
    if (locale === "fr" && cat.nameFr) return cat.nameFr;
    if (locale === "de" && cat.nameDe) return cat.nameDe;
    if (locale === "pt" && cat.namePt) return cat.namePt;
    return cat.nameEn;
  };

  const getCalculatorName = (calc: Calculator): string => {
    const key = slugToTranslationKey(calc.slug);
    try {
      return tCalcNames(`names.${key}`);
    } catch {
      return calc.slug.replace("-calculator", "").split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
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

  // Get the localized slug for a calculator
  const getLocalizedSlug = (calc: Calculator): string => {
    // Extract calculator ID from slug (e.g., "tip-calculator" -> "tip")
    const calcId = calc.slug
      .replace("-calculator", "")
      .replace("-generator", "")
      .replace("-converter", "");
    
    // Try to get localized slug from registry
    const localizedSlug = getSlugForLocale(calcId, locale as "en" | "es" | "pt" | "fr");
    
    // If found in registry, use it; otherwise fall back to original slug
    return localizedSlug || calc.slug;
  };

  const getCategoryButtonColor = (color: string, isActive: boolean) => {
    const colors: Record<string, { active: string; inactive: string }> = {
      blue: { active: "bg-blue-50 text-blue-600", inactive: "text-slate-600 hover:bg-slate-50" },
      green: { active: "bg-green-50 text-green-600", inactive: "text-slate-600 hover:bg-slate-50" },
      purple: { active: "bg-purple-50 text-purple-600", inactive: "text-slate-600 hover:bg-slate-50" },
      orange: { active: "bg-orange-50 text-orange-600", inactive: "text-slate-600 hover:bg-slate-50" },
    };
    const c = colors[color] || colors.blue;
    return isActive ? c.active : c.inactive;
  };

  const getCategoryCount = (categorySlug: string): number => {
    return calculators.filter((c) => c.category === categorySlug).length;
  };

  const filteredCalculators = useMemo(() => {
    return calculators.filter((calc) => {
      const name = getCalculatorName(calc);
      const desc = getCalculatorDesc(calc);
      const matchesSearch = searchQuery === "" || name.toLowerCase().includes(searchQuery.toLowerCase()) || desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "all" || calc.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [calculators, searchQuery, activeCategory]);

  const calculatorsByCategory = useMemo(() => {
    const grouped: Record<string, Calculator[]> = {};
    categories.forEach((cat) => {
      grouped[cat.slug] = filteredCalculators.filter((c) => c.category === cat.slug);
    });
    return grouped;
  }, [filteredCalculators, categories]);

  const popularCalculators = useMemo(() => {
    return popularSlugs.map((slug) => calculators.find((c) => c.slug === slug)).filter((c): c is Calculator => c !== undefined);
  }, [calculators]);

  return (
    <>
      {/* Search + Mobile Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <input
            type="search"
            placeholder={t("search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button onClick={() => setMobileFilterOpen(!mobileFilterOpen)} className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {t("categories")}
        </button>
      </div>

      {/* Mobile Filters */}
      {mobileFilterOpen && (
        <div className="lg:hidden mb-6 bg-white rounded-xl p-4 shadow-sm border">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => { setActiveCategory("all"); setMobileFilterOpen(false); }} className={`px-3 py-2 rounded-lg text-sm font-medium ${activeCategory === "all" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}>
              All ({counts.total})
            </button>
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => { setActiveCategory(cat.slug); setMobileFilterOpen(false); }} className={`px-3 py-2 rounded-lg text-sm font-medium ${activeCategory === cat.slug ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-600"}`}>
                {getCategoryName(cat)} ({getCategoryCount(cat.slug)})
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 bg-white rounded-xl p-4 shadow-sm border">
            <h2 className="text-xs font-semibold text-slate-400 uppercase mb-3">{t("categories")}</h2>
            <ul className="space-y-1">
              <li>
                <button onClick={() => setActiveCategory("all")} className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium ${activeCategory === "all" ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"}`}>
                  <span>{t("allCalculators")}</span>
                  <span className="text-slate-400">{counts.total}</span>
                </button>
              </li>
              {categories.map((cat) => {
                const colors = getCategoryColors(cat.color);
                return (
                  <li key={cat.id}>
                    <button onClick={() => setActiveCategory(cat.slug)} className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium ${getCategoryButtonColor(cat.color, activeCategory === cat.slug)}`}>
                      <span className="flex items-center gap-2">
                        <span className={activeCategory === cat.slug ? colors.text : "text-slate-400"}>{getCategoryIcon(cat.slug, "w-4 h-4")}</span>
                        {getCategoryName(cat)}
                      </span>
                      <span className="text-slate-400">{getCategoryCount(cat.slug)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            {popularCalculators.length > 0 && (
              <nav className="mt-6">
                <h2 className="text-xs font-semibold text-slate-400 uppercase mb-3">{t("popular")}</h2>
                <ul className="space-y-1">
                  {popularCalculators.map((calc) => (
                    <li key={calc.slug}>
                      <Link href={`/${locale}/${getLocalizedSlug(calc)}`} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        {getCalculatorName(calc)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </aside>

        {/* Main Content */}
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
                      <Link href={`/${locale}/${getLocalizedSlug(calc)}`} className={`block bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-slate-100 group ${colors.ring}`}>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-slate-900 group-hover:text-blue-600">{getCalculatorName(calc)}</h3>
                          {calc.isNew && <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${colors.bg} ${colors.text}`}>NEW</span>}
                        </div>
                        <p className="text-sm text-slate-600 line-clamp-2">{getCalculatorDesc(calc)}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
          {filteredCalculators.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-600 mb-2">No calculators found.</p>
              <button onClick={() => { setSearchQuery(""); setActiveCategory("all"); }} className="text-blue-600 hover:text-blue-700 font-medium">Clear filters</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
