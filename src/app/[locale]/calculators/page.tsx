// src/app/[locale]/calculators/page.tsx
// WCAG 2.1 AA Compliant Version

"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { slugToTranslationKey, type Calculator } from "@/config/calculators-config";

// Popular calculators (by slug)
const popularSlugs = [
  "compound-interest-calculator",
  "mortgage-calculator",
  "bmi-calculator",
  "calorie-calculator",
  "tip-calculator",
  "percentage-calculator",
];

interface CalculatorData {
  calculators: Calculator[];
  counts: {
    total: number;
    finance: number;
    health: number;
    everyday: number;
  };
}

export default function CalculatorsPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [data, setData] = useState<CalculatorData | null>(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("calculatorsPage");
  const tCalcNames = useTranslations("calculators");
  const locale = useLocale();

  // Fetch active calculators from API
  useEffect(() => {
    const fetchCalculators = async () => {
      try {
        const res = await fetch("/api/calculators/active");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error("Error fetching calculators:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCalculators();
  }, []);

  // Get search param from URL
  useEffect(() => {
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    if (search) {
      setSearchQuery(search);
    }
    if (category) {
      setActiveCategory(category);
    }
  }, [searchParams]);

  // Get calculator name (translated)
  const getCalculatorName = (calc: Calculator): string => {
    const key = slugToTranslationKey(calc.slug);
    try {
      return tCalcNames(`names.${key}`);
    } catch {
      return calc.slug
        .replace("-calculator", "")
        .replace("-", " ")
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
  };

  // Get calculator description
  const getCalculatorDesc = (calc: Calculator): string => {
    const key = slugToTranslationKey(calc.slug);
    try {
      return t(`calcs.${key}.desc`);
    } catch {
      return calc.description;
    }
  };

  // Filter calculators
  const filteredCalculators = useMemo(() => {
    if (!data) return [];
    return data.calculators.filter((calc) => {
      const name = getCalculatorName(calc);
      const desc = getCalculatorDesc(calc);
      const matchesSearch =
        searchQuery === "" ||
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "all" || calc.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [data, searchQuery, activeCategory]);

  const financeCalcs = filteredCalculators.filter((c) => c.category === "finance");
  const healthCalcs = filteredCalculators.filter((c) => c.category === "health");
  const everydayCalcs = filteredCalculators.filter((c) => c.category === "everyday");

  // Popular calculators (only from active)
  const popularCalculators = useMemo(() => {
    if (!data) return [];
    return popularSlugs
      .map((slug) => data.calculators.find((c) => c.slug === slug))
      .filter((c): c is Calculator => c !== undefined);
  }, [data]);

  // Results count for screen readers
  const resultsCount = filteredCalculators.length;

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-20 pb-16 min-h-screen bg-slate-50">
          <div className="container">
            <div 
              className="flex items-center justify-center py-20"
              role="status"
              aria-live="polite"
              aria-label="Loading calculators"
            >
              <svg 
                className="animate-spin h-8 w-8 text-blue-500" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="sr-only">Loading calculators, please wait...</span>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      {/* Skip to main content link */}
      <a 
        href="#calculator-list" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Skip to calculator list
      </a>

      <Header />

      <main className="pt-20 pb-16 min-h-screen bg-slate-50">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside 
              className="w-full md:w-64 shrink-0"
              aria-label="Calculator filters"
            >
              <div className="bg-white rounded-xl p-5 shadow-sm sticky top-24">
                {/* Search */}
                <div className="mb-6">
                  <label 
                    htmlFor="calculator-search" 
                    className="sr-only"
                  >
                    Search calculators
                  </label>
                  <input
                    id="calculator-search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("search")}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    aria-describedby="search-results-status"
                  />
                </div>

                {/* Categories */}
                <nav aria-label="Calculator categories">
                  <h2 
                    id="categories-heading"
                    className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3"
                  >
                    {t("categories")}
                  </h2>
                  <ul 
                    className="space-y-1"
                    role="list"
                    aria-labelledby="categories-heading"
                  >
                    <li>
                      <button
                        onClick={() => setActiveCategory("all")}
                        aria-pressed={activeCategory === "all"}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          activeCategory === "all"
                            ? "bg-blue-50 text-blue-600"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {t("allCalculators")}
                        <span className="float-right text-slate-400" aria-hidden="true">
                          {data?.counts.total || 0}
                        </span>
                        <span className="sr-only">
                          , {data?.counts.total || 0} calculators
                        </span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveCategory("finance")}
                        aria-pressed={activeCategory === "finance"}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          activeCategory === "finance"
                            ? "bg-blue-50 text-blue-600"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {t("finance")}
                        <span className="float-right text-slate-400" aria-hidden="true">
                          {data?.counts.finance || 0}
                        </span>
                        <span className="sr-only">
                          , {data?.counts.finance || 0} calculators
                        </span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveCategory("health")}
                        aria-pressed={activeCategory === "health"}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          activeCategory === "health"
                            ? "bg-blue-50 text-blue-600"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {t("healthFitness")}
                        <span className="float-right text-slate-400" aria-hidden="true">
                          {data?.counts.health || 0}
                        </span>
                        <span className="sr-only">
                          , {data?.counts.health || 0} calculators
                        </span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveCategory("everyday")}
                        aria-pressed={activeCategory === "everyday"}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          activeCategory === "everyday"
                            ? "bg-purple-50 text-purple-700"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {t("everyday")}
                        <span className="float-right text-slate-400" aria-hidden="true">
                          {data?.counts.everyday || 0}
                        </span>
                        <span className="sr-only">
                          , {data?.counts.everyday || 0} calculators
                        </span>
                      </button>
                    </li>
                  </ul>
                </nav>

                {/* Popular */}
                {popularCalculators.length > 0 && (
                  <nav aria-label="Popular calculators" className="mt-6">
                    <h2 
                      id="popular-heading"
                      className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3"
                    >
                      {t("popular")}
                    </h2>
                    <ul 
                      className="space-y-1"
                      role="list"
                      aria-labelledby="popular-heading"
                    >
                      {popularCalculators.map((calc) => (
                        <li key={calc.slug}>
                          <Link
                            href={`/${locale}/${calc.slug}`}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <span 
                              className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"
                              aria-hidden="true"
                            ></span>
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
            <div className="flex-1" id="calculator-list">
              {/* Live region for search results */}
              <div 
                id="search-results-status"
                role="status" 
                aria-live="polite" 
                aria-atomic="true"
                className="sr-only"
              >
                {searchQuery || activeCategory !== "all" 
                  ? `Showing ${resultsCount} calculator${resultsCount !== 1 ? 's' : ''}`
                  : ''
                }
              </div>

              {/* Finance Section */}
              {financeCalcs.length > 0 && (
                <section 
                  className="mb-10"
                  aria-labelledby="finance-section-heading"
                >
                  <h2 
                    id="finance-section-heading"
                    className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4"
                  >
                    <span 
                      className="w-2 h-2 rounded-full bg-blue-500"
                      aria-hidden="true"
                    ></span>
                    {t("financeTitle")}
                    <span className="text-slate-400 font-normal text-sm">
                      ({financeCalcs.length})
                    </span>
                  </h2>
                  <ul 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    role="list"
                  >
                    {financeCalcs.map((calc) => (
                      <li key={calc.slug}>
                        <Link
                          href={`/${locale}/${calc.slug}`}
                          className="block bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          aria-label={`${getCalculatorName(calc)} Calculator${calc.isNew ? ' (New)' : ''}: ${getCalculatorDesc(calc)}`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {getCalculatorName(calc)}
                            </h3>
                            {calc.isNew && (
                              <span 
                                className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full"
                                aria-label="New calculator"
                              >
                                NEW
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-600">
                            {getCalculatorDesc(calc)}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Health Section */}
              {healthCalcs.length > 0 && (
                <section 
                  className="mb-10"
                  aria-labelledby="health-section-heading"
                >
                  <h2 
                    id="health-section-heading"
                    className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4"
                  >
                    <span 
                      className="w-2 h-2 rounded-full bg-green-500"
                      aria-hidden="true"
                    ></span>
                    {t("healthTitle")}
                    <span className="text-slate-400 font-normal text-sm">
                      ({healthCalcs.length})
                    </span>
                  </h2>
                  <ul 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    role="list"
                  >
                    {healthCalcs.map((calc) => (
                      <li key={calc.slug}>
                        <Link
                          href={`/${locale}/${calc.slug}`}
                          className="block bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 group focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                          aria-label={`${getCalculatorName(calc)} Calculator${calc.isNew ? ' (New)' : ''}: ${getCalculatorDesc(calc)}`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors">
                              {getCalculatorName(calc)}
                            </h3>
                            {calc.isNew && (
                              <span 
                                className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full"
                                aria-label="New calculator"
                              >
                                NEW
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-600">
                            {getCalculatorDesc(calc)}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Everyday Section */}
              {everydayCalcs.length > 0 && (
                <section 
                  className="mb-10"
                  aria-labelledby="everyday-section-heading"
                >
                  <h2 
                    id="everyday-section-heading"
                    className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4"
                  >
                    <span 
                      className="w-2 h-2 rounded-full bg-purple-500"
                      aria-hidden="true"
                    ></span>
                    {t("everydayTitle")}
                    <span className="text-slate-400 font-normal text-sm">
                      ({everydayCalcs.length})
                    </span>
                  </h2>
                  <ul 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    role="list"
                  >
                    {everydayCalcs.map((calc) => (
                      <li key={calc.slug}>
                        <Link
                          href={`/${locale}/${calc.slug}`}
                          className="block bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                          aria-label={`${getCalculatorName(calc)} Calculator${calc.isNew ? ' (New)' : ''}: ${getCalculatorDesc(calc)}`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-slate-900 group-hover:text-purple-700 transition-colors">
                              {getCalculatorName(calc)}
                            </h3>
                            {calc.isNew && (
                              <span 
                                className="px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full"
                                aria-label="New calculator"
                              >
                                NEW
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-600">
                            {getCalculatorDesc(calc)}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* No results */}
              {filteredCalculators.length === 0 && (
                <div 
                  className="text-center py-16"
                  role="status"
                  aria-live="polite"
                >
                  <div 
                    className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg 
                      className="w-8 h-8 text-slate-400" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-slate-600 mb-2">
                    No calculators found matching your search.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("all");
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
