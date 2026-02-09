"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { getCategoryIcon, getCategoryColors } from "@/config/category-icons";

// ─── Types ───────────────────────────────────────────────────────────────────

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

interface Subcategory {
  id: string;
  slug: string;
  nameEn: string;
  nameEs: string | null;
  namePt: string | null;
  nameFr: string | null;
  nameDe: string | null;
  categoryId: string;
  sortOrder: number;
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

type SortOption = "popular" | "newest" | "name-asc" | "name-desc";

interface Props {
  calculators: V4Calculator[];
  categories: Category[];
  subcategories: Subcategory[];
  counts: Record<string, number>;
  locale: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function CalculatorsClientWrapperV4({
  calculators,
  categories,
  subcategories,
  counts,
  locale,
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const t = useTranslations("calculatorsPage");

  // ─── #2 URL sync: read ?category= on mount ──────────────────────────────
  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam && categories.some((c) => c.slug === catParam)) {
      setActiveCategory(catParam);
    }
  }, [searchParams, categories]);

  // ─── #2 URL sync: update URL when category changes ──────────────────────
  const updateURL = useCallback(
    (catSlug: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (catSlug === "all") {
        params.delete("category");
      } else {
        params.set("category", catSlug);
      }
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  // ─── Helpers ─────────────────────────────────────────────────────────────

  const getName = (
    item: {
      nameEn: string;
      nameEs?: string | null;
      namePt?: string | null;
      nameFr?: string | null;
      nameDe?: string | null;
    }
  ): string => {
    if (locale === "es" && item.nameEs) return item.nameEs;
    if (locale === "fr" && item.nameFr) return item.nameFr;
    if (locale === "de" && item.nameDe) return item.nameDe;
    if (locale === "pt" && item.namePt) return item.namePt;
    return item.nameEn;
  };

  // ─── #8 Performance: memoize all counts ──────────────────────────────────

  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const cat of categories) {
      map[cat.slug] = calculators.filter((c) => c.category === cat.slug).length;
    }
    return map;
  }, [calculators, categories]);

  const subcategoryCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const sub of subcategories) {
      map[sub.id] = calculators.filter((c) => c.subcategoryId === sub.id).length;
    }
    return map;
  }, [calculators, subcategories]);

  const getSubcategoriesForCategory = (categoryId: string): Subcategory[] => {
    return subcategories.filter((s) => s.categoryId === categoryId);
  };

  // ─── Filtering ───────────────────────────────────────────────────────────

  const filteredCalculators = useMemo(() => {
    let result = calculators.filter((calc) => {
      const matchesSearch =
        searchQuery === "" ||
        calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "all" || calc.category === activeCategory;
      const matchesSub =
        !activeSubcategory || calc.subcategoryId === activeSubcategory;
      return matchesSearch && matchesCategory && matchesSub;
    });

    switch (sortBy) {
      case "name-asc":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result = [...result].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        result = [...result].reverse();
        break;
      case "popular":
      default:
        break;
    }

    return result;
  }, [calculators, searchQuery, activeCategory, activeSubcategory, sortBy]);

  const calculatorsByCategory = useMemo(() => {
    const grouped: Record<string, V4Calculator[]> = {};
    categories.forEach((cat) => {
      grouped[cat.slug] = filteredCalculators.filter(
        (c) => c.category === cat.slug
      );
    });
    return grouped;
  }, [filteredCalculators, categories]);

  // ─── #4 Click Handlers: click active → go to "all" ──────────────────────

  const handleCategoryClick = (catSlug: string) => {
    if (activeCategory === catSlug) {
      setActiveCategory("all");
      setActiveSubcategory(null);
      updateURL("all");
    } else {
      setActiveCategory(catSlug);
      setActiveSubcategory(null);
      updateURL(catSlug);
    }
    setMobileFilterOpen(false);
  };

  const handleSubcategoryClick = (subId: string, catSlug: string) => {
    if (activeSubcategory === subId) {
      setActiveSubcategory(null);
    } else {
      setActiveSubcategory(subId);
      setActiveCategory(catSlug);
      updateURL(catSlug);
    }
    setMobileFilterOpen(false);
  };

  // ─── Category color map for sidebar active states ─────────────────────────

  const sidebarColors: Record<string, { text: string; icon: string; count: string }> = {
    blue: { text: "text-blue-600", icon: "text-blue-500", count: "text-blue-600" },
    emerald: { text: "text-emerald-600", icon: "text-emerald-500", count: "text-emerald-600" },
    green: { text: "text-green-600", icon: "text-green-500", count: "text-green-600" },
    purple: { text: "text-purple-600", icon: "text-purple-500", count: "text-purple-600" },
    violet: { text: "text-violet-600", icon: "text-violet-500", count: "text-violet-600" },
    orange: { text: "text-orange-600", icon: "text-orange-500", count: "text-orange-600" },
    red: { text: "text-red-600", icon: "text-red-500", count: "text-red-600" },
    cyan: { text: "text-cyan-600", icon: "text-cyan-500", count: "text-cyan-600" },
    amber: { text: "text-amber-600", icon: "text-amber-500", count: "text-amber-600" },
    pink: { text: "text-pink-600", icon: "text-pink-500", count: "text-pink-600" },
    teal: { text: "text-teal-600", icon: "text-teal-500", count: "text-teal-600" },
    indigo: { text: "text-indigo-600", icon: "text-indigo-500", count: "text-indigo-600" },
    yellow: { text: "text-yellow-600", icon: "text-yellow-500", count: "text-yellow-600" },
    slate: { text: "text-slate-600", icon: "text-slate-500", count: "text-slate-600" },
  };

  const getCatColors = (color: string) => sidebarColors[color] || sidebarColors.blue;

  // ─── Sidebar renderer (shared desktop + mobile #6) ───────────────────────

  const renderSidebarContent = (isMobile = false) => (
    <>
      {/* All Calculators row */}
      <button
        onClick={() => {
          setActiveCategory("all");
          setActiveSubcategory(null);
          updateURL("all");
          setMobileFilterOpen(false);
        }}
        aria-current={activeCategory === "all" ? "true" : undefined}
        className={`w-full flex items-center justify-between ${
          isMobile ? "px-3 py-2.5" : "px-4 py-3"
        } rounded-lg text-[15px] transition-colors ${
          activeCategory === "all"
            ? "font-bold text-blue-600 bg-slate-50"
            : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-800"
        }`}
      >
        <span className="flex items-center gap-2.5">
          <span className={activeCategory === "all" ? "text-blue-500" : "text-slate-400"}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </span>
          {t("allCalculators") || "All Calculators"}
        </span>
        <span className={`text-sm tabular-nums ${activeCategory === "all" ? "text-blue-600 font-bold" : "text-slate-400"}`}>
          {counts.total}
        </span>
      </button>

      {categories.filter(cat => cat.slug !== "drafts").map((cat) => {
        const count = categoryCounts[cat.slug] || 0;
        if (count === 0) return null;
        const subs = getSubcategoriesForCategory(cat.id);
        const subsWithCalcs = subs.filter(
          (s) => (subcategoryCounts[s.id] || 0) > 0
        );
        const hasSubsWithCalcs = subsWithCalcs.length > 0;
        const isActive = activeCategory === cat.slug;
        const cc = getCatColors(cat.color);

        return (
          <div key={cat.id}>
            <button
              onClick={() => handleCategoryClick(cat.slug)}
              aria-current={isActive ? "true" : undefined}
              className={`w-full flex items-center justify-between ${
                isMobile ? "px-3 py-2.5" : "px-4 py-3"
              } rounded-lg text-[15px] transition-colors ${
                isActive
                  ? `font-bold ${cc.text} bg-slate-50`
                  : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <span className={isActive ? cc.icon : "text-slate-400"}>
                  {getCategoryIcon(cat.slug, "w-5 h-5")}
                </span>
                {getName(cat)}
              </span>
              <span
                className={`text-sm tabular-nums ${
                  isActive ? `${cc.count} font-bold` : "text-slate-400"
                }`}
              >
                {count}
              </span>
            </button>

            {isActive && hasSubsWithCalcs && (
              <div className={isMobile ? "ml-[22px] mb-1" : "ml-[26px] mb-1"}>
                {subsWithCalcs.map((sub, idx) => {
                  const subCount = subcategoryCounts[sub.id] || 0;
                  const isLast = idx === subsWithCalcs.length - 1;
                  const isSubActive = activeSubcategory === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => handleSubcategoryClick(sub.id, cat.slug)}
                      aria-current={isSubActive ? "true" : undefined}
                      className={`w-full flex items-center justify-between py-2.5 ${
                        isMobile ? "pr-3" : "pr-4"
                      } text-[15px] transition-colors ${
                        isSubActive
                          ? `font-semibold ${cc.text}`
                          : "font-normal text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      <span className="flex items-center gap-0">
                        <span
                          className="text-slate-300 text-sm w-7 text-left select-none"
                          style={{ fontFamily: "monospace" }}
                        >
                          {isLast ? "└─" : "├─"}
                        </span>
                        <span>{getName(sub)}</span>
                      </span>
                      {subCount > 0 && (
                        <span
                          className={`text-sm tabular-nums ${
                            isSubActive ? cc.count : "text-slate-400"
                          }`}
                        >
                          {subCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </>
  );

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <>
      {/* ══════ Page Title ══════ */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">{t("title")}</h1>
        <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto">{t("subtitle")}</p>
      </div>

      {/* ══════ Centered Search Bar ══════ */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="relative flex items-center bg-slate-100/80 rounded-2xl border border-slate-200/60 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent focus-within:bg-white transition-all">
          <svg
            className="absolute left-5 w-5 h-5 text-slate-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="search"
            placeholder={t("search") || "Search calculators..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Escape") setSearchQuery(""); }}
            className="flex-1 bg-transparent pl-14 pr-4 py-4 text-base text-slate-800 placeholder:text-slate-400 focus:outline-none"
            aria-label="Search calculators"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="mr-4 p-1.5 text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
              aria-label="Clear search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ══════ Result count ══════ */}
      {(searchQuery || activeCategory !== "all") && (
        <p className="text-sm text-slate-400 mb-4">
          {filteredCalculators.length} {filteredCalculators.length === 1 ? "calculator" : "calculators"}
          {searchQuery && <> for &quot;<span className="text-slate-600 font-medium">{searchQuery}</span>&quot;</>}
        </p>
      )}

      {/* ══════ Sort + Show All ══════ */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">
            {t("sortBy") || "Sort by"}
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-sm font-bold text-slate-800 bg-transparent border-none cursor-pointer focus:outline-none focus:ring-0 appearance-none pr-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23475569' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right center",
            }}
            aria-label="Sort order"
          >
            <option value="popular">{t("sortPopular") || "Popular"}</option>
            <option value="newest">{t("sortNewest") || "Newest"}</option>
            <option value="name-asc">{t("sortNameAsc") || "Name A-Z"}</option>
            <option value="name-desc">{t("sortNameDesc") || "Name Z-A"}</option>
          </select>
        </div>

        {activeCategory !== "all" && (
          <button
            onClick={() => {
              setActiveSubcategory(null);
            }}
            className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 transition-colors"
          >
            {t("showAll") || "Show All in"}{" "}
            {getName(
              categories.find((c) => c.slug === activeCategory) || { nameEn: "" }
            )}{" "}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* ══════ Mobile Filter Button ══════ */}
      <button
        onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
        className="lg:hidden flex items-center justify-center gap-2 w-full px-4 py-3 mb-4 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 shadow-sm"
        aria-expanded={mobileFilterOpen}
        aria-controls="mobile-filter-drawer"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        {t("categories") || "Categories"}
        {activeCategory !== "all" && (
          <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full ml-1">
            {getName(categories.find((c) => c.slug === activeCategory) || { nameEn: "" })}
          </span>
        )}
      </button>

      {/* ══════ #6 Mobile Filter Drawer (tree lines) ══════ */}
      {mobileFilterOpen && (
        <div
          id="mobile-filter-drawer"
          className="lg:hidden mb-6 bg-white rounded-2xl p-4 shadow-sm border border-slate-100/80"
        >
          <div className="px-2 pb-1 mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">
              {t("categories") || "CATEGORIES"}
            </span>
          </div>
          <div className="mx-2 border-b border-slate-100 mb-2" />
          {renderSidebarContent(true)}
        </div>
      )}

      {/* ══════ Main Layout: Sidebar + Grid ══════ */}
      <div className="flex gap-8">
        {/* ── Desktop Sidebar ── */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-24 bg-white rounded-2xl shadow-sm border border-slate-100/80 overflow-hidden">
            <div className="px-6 pt-5 pb-2">
              <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                {t("categories") || "CATEGORIES"}
              </h2>
            </div>
            <div className="mx-5 border-b border-slate-100 mb-1" />

            <nav className="px-3 pb-5 space-y-0.5" aria-label="Calculator categories">
              {renderSidebarContent(false)}
            </nav>
          </div>
        </aside>

        {/* ── Calculator Grid ── */}
        <div className="flex-1 min-w-0">
          {activeCategory === "all" ? (
            categories.filter(cat => cat.slug !== "drafts").map((cat) => {
              const calcs = calculatorsByCategory[cat.slug] || [];
              if (calcs.length === 0) return null;
              const colors = getCategoryColors(cat.color);
              return (
                <section key={cat.id} className="mb-12">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="flex items-center gap-2.5 text-xl font-bold text-slate-900">
                      <span className={colors.text}>
                        {getCategoryIcon(cat.slug, "w-5 h-5")}
                      </span>
                      {getName(cat)}
                      <span className="text-slate-400 font-normal text-sm">
                        ({calcs.length})
                      </span>
                    </h2>
                    {calcs.length > 3 && (
                      <button
                        onClick={() => {
                          setActiveCategory(cat.slug);
                          setActiveSubcategory(null);
                          updateURL(cat.slug);
                        }}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                      >
                        {t("viewAll") || "View all"}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {calcs.map((calc) => (
                      <CalcCard key={calc.slug} calc={calc} locale={locale} colors={colors} />
                    ))}
                  </div>
                </section>
              );
            })
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredCalculators.map((calc) => {
                const cat = categories.find((c) => c.slug === calc.category);
                const colors = getCategoryColors(cat?.color || "blue");
                return <CalcCard key={calc.slug} calc={calc} locale={locale} colors={colors} />;
              })}
            </div>
          )}

          {/* Empty state */}
          {filteredCalculators.length === 0 && (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-slate-600 mb-3 text-lg font-medium">
                {t("noResults") || "No calculators found"}
              </p>
              <p className="text-slate-400 text-sm mb-4">
                {t("tryDifferent") || "Try a different search term or clear filters"}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                  setActiveSubcategory(null);
                  updateURL("all");
                }}
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
              >
                {t("clearFilters") || "Clear all filters"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── Calculator Card with icon + translated badge ───────────────────────────

const NEW_LABELS: Record<string, string> = {
  en: "NEW", es: "NUEVO", pt: "NOVO", fr: "NOUVEAU", de: "NEU",
};

function CalcCard({
  calc,
  locale,
  colors,
}: {
  calc: V4Calculator;
  locale: string;
  colors: { bg: string; text: string; border: string; ring: string };
}) {
  return (
    <Link
      href={`/${locale}/${calc.slug}`}
      className={`block bg-white p-6 rounded-xl shadow-sm hover:shadow-md border border-slate-100 hover:border-slate-200 transition-all duration-200 group h-full min-h-[140px] flex flex-col`}
    >
      <div className="flex items-start justify-between mb-2.5">
        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
          {calc.name}
        </h3>
        {calc.isNew && (
          <span
            className={`ml-2 flex-shrink-0 px-2.5 py-0.5 text-[11px] font-bold rounded-full ${colors.bg} ${colors.text} uppercase tracking-wide`}
          >
            {NEW_LABELS[locale] || "NEW"}
          </span>
        )}
      </div>
      <p className="text-[13px] text-slate-500 line-clamp-2 flex-grow leading-relaxed">
        {calc.description}
      </p>
    </Link>
  );
}
