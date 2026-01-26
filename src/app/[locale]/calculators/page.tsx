// src/app/[locale]/calculators/page.tsx
// Dynamic Categories Version - Fixed Layout
"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
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

interface Category {
  id: string;
  slug: string;
  nameEn: string;
  nameEs: string | null;
  namePt: string | null;
  icon: string | null;
  color: string;
  _count: { calculators: number };
}

interface CalculatorData {
  calculators: Calculator[];
  counts: {
    total: number;
    finance: number;
    health: number;
    everyday: number;
  };
}

function CalculatorsContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [data, setData] = useState<CalculatorData | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("calculatorsPage");
  const tCalcNames = useTranslations("calculators");
  const locale = useLocale();

  // Fetch active calculators and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [calcsRes, catsRes] = await Promise.all([
          fetch("/api/calculators/active"),
          fetch("/api/calculator-categories")
        ]);
        
        if (calcsRes.ok) {
          const json = await calcsRes.json();
          setData(json);
        }
        
        if (catsRes.ok) {
          const cats = await catsRes.json();
          setCategories(cats);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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

  // Get category name by locale
  const getCategoryName = (cat: Category): string => {
    if (locale === "es" && cat.nameEs) return cat.nameEs;
    if (locale === "pt" && cat.namePt) return cat.namePt;
    return cat.nameEn;
  };

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

  // Get color classes for category
  const getCategoryColor = (color: string, isActive: boolean) => {
    const colors: Record<string, { active: string; inactive: string }> = {
      blue: {
        active: "bg-blue-50 text-blue-600",
        inactive: "text-slate-600 hover:bg-slate-50",
      },
      green: {
        active: "bg-green-50 text-green-600",
        inactive: "text-slate-600 hover:bg-slate-50",
      },
      purple: {
        active: "bg-purple-50 text-purple-600",
        inactive: "text-slate-600 hover:bg-slate-50",
      },
      red: {
        active: "bg-red-50 text-red-600",
        inactive: "text-slate-600 hover:bg-slate-50",
      },
      orange: {
        active: "bg-orange-50 text-orange-600",
        inactive: "text-slate-600 hover:bg-slate-50",
      },
      cyan: {
        active: "bg-cyan-50 text-cyan-600",
        inactive: "text-slate-600 hover:bg-slate-50",
      },
      pink: {
        active: "bg-pink-50 text-pink-600",
        inactive: "text-slate-600 hover:bg-slate-50",
      },
      amber: {
        active: "bg-amber-50 text-amber-600",
        inactive: "text-slate-600 hover:bg-slate-50",
      },
    };
    const c = colors[color] || colors.blue;
    return isActive ? c.active : c.inactive;
  };

  const getDotColor = (color: string) => {
    const dots: Record<string, string> = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      purple: "bg-purple-500",
      red: "bg-red-500",
      orange: "bg-orange-500",
      cyan: "bg-cyan-500",
      pink: "bg-pink-500",
      amber: "bg-amber-500",
    };
    return dots[color] || "bg-blue-500";
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

  // Group calculators by category
  const calculatorsByCategory = useMemo(() => {
    const grouped: Record<string, Calculator[]> = {};
    
    categories.forEach(cat => {
      grouped[cat.slug] = filteredCalculators.filter(c => c.category === cat.slug);
    });
    
    // Also include any calculators that might not match a dynamic category
    const assignedSlugs = new Set(categories.map(c => c.slug));
    const unassigned = filteredCalculators.filter(c => !assignedSlugs.has(c.category));
    if (unassigned.length > 0) {
      grouped["other"] = unassigned;
    }
    
    return grouped;
  }, [filteredCalculators, categories]);

  // Popular calculators (only from active)
  const popularCalculators = useMemo(() => {
    if (!data) return [];
    return popularSlugs
      .map((slug) => data.calculators.find((c) => c.slug === slug))
      .filter((c): c is Calculator => c !== undefined);
  }, [data]);

  // Results count
  const resultsCount = filteredCalculators.length;

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen bg-slate-50">
          <div className="container">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2 mb-8"></div>
              <div className="grid grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main id="main-content" className="pt-24 pb-16 min-h-screen bg-slate-50">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {t("title")}
            </h1>
            <p className="text-slate-600">
              {t("subtitle")}
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <label htmlFor="calculator-search" className="sr-only">
                Search calculators
              </label>
              <input
                id="calculator-search"
                type="search"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-controls="calculator-list"
                aria-describedby="search-results-status"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 bg-white rounded-xl p-4 shadow-sm border border-slate-100">
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
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeCategory === "all"
                            ? "bg-slate-100 text-slate-900"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                        aria-pressed={activeCategory === "all"}
                      >
                        <span>{t("allCalculators")}</span>
                        <span className="text-slate-400">{data?.counts.total || 0}</span>
                      </button>
                    </li>
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <button
                          onClick={() => setActiveCategory(cat.slug)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            getCategoryColor(cat.color, activeCategory === cat.slug)
                          }`}
                          aria-pressed={activeCategory === cat.slug}
                        >
                          <span className="flex items-center gap-2">
                            {cat.icon && <span aria-hidden="true">{cat.icon}</span>}
                            {getCategoryName(cat)}
                          </span>
                          <span className="text-slate-400">{cat._count?.calculators || 0}</span>
                        </button>
                      </li>
                    ))}
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

              {/* Dynamic Category Sections */}
              {categories.map((cat) => {
                const calcs = calculatorsByCategory[cat.slug] || [];
                if (calcs.length === 0) return null;

                return (
                  <section 
                    key={cat.id}
                    className="mb-10"
                    aria-labelledby={`${cat.slug}-section-heading`}
                  >
                    <h2 
                      id={`${cat.slug}-section-heading`}
                      className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4"
                    >
                      <span 
                        className={`w-2 h-2 rounded-full ${getDotColor(cat.color)}`}
                        aria-hidden="true"
                      ></span>
                      {getCategoryName(cat)}
                      <span className="text-slate-400 font-normal text-sm">
                        ({calcs.length})
                      </span>
                    </h2>
                    <ul 
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                      role="list"
                    >
                      {calcs.map((calc) => (
                        <li key={calc.slug}>
                          <Link
                            href={`/${locale}/${calc.slug}`}
                            className={`block bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 group focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                              cat.color === "green" ? "focus:ring-green-500" :
                              cat.color === "purple" ? "focus:ring-purple-500" :
                              "focus:ring-blue-500"
                            }`}
                            aria-label={`${getCalculatorName(calc)} Calculator${calc.isNew ? ' (New)' : ''}: ${getCalculatorDesc(calc)}`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h3 className={`font-semibold text-slate-900 transition-colors ${
                                cat.color === "green" ? "group-hover:text-green-600" :
                                cat.color === "purple" ? "group-hover:text-purple-600" :
                                "group-hover:text-blue-600"
                              }`}>
                                {getCalculatorName(calc)}
                              </h3>
                              {calc.isNew && (
                                <span 
                                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                    cat.color === "green" ? "bg-green-100 text-green-700" :
                                    cat.color === "purple" ? "bg-purple-100 text-purple-700" :
                                    "bg-blue-100 text-blue-700"
                                  }`}
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
                );
              })}

              {/* Uncategorized / Other calculators */}
              {calculatorsByCategory["other"]?.length > 0 && (
                <section 
                  className="mb-10"
                  aria-labelledby="other-section-heading"
                >
                  <h2 
                    id="other-section-heading"
                    className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4"
                  >
                    <span 
                      className="w-2 h-2 rounded-full bg-slate-400"
                      aria-hidden="true"
                    ></span>
                    Other
                    <span className="text-slate-400 font-normal text-sm">
                      ({calculatorsByCategory["other"].length})
                    </span>
                  </h2>
                  <ul 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    role="list"
                  >
                    {calculatorsByCategory["other"].map((calc) => (
                      <li key={calc.slug}>
                        <Link
                          href={`/${locale}/${calc.slug}`}
                          className="block bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          aria-label={`${getCalculatorName(calc)} Calculator: ${getCalculatorDesc(calc)}`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {getCalculatorName(calc)}
                            </h3>
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

export default function CalculatorsPage() {
  return (
    <Suspense fallback={
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen bg-slate-50">
          <div className="container">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2 mb-8"></div>
              <div className="grid grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    }>
      <CalculatorsContent />
    </Suspense>
  );
}
