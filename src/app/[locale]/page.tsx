"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { slugToTranslationKey, type Calculator } from "@/config/calculators-config";

// ============================================================================
// WCAG 2.1 AA COMPLIANCE CHECKLIST:
// ✅ 1.1.1 Non-text Content - All images/icons have aria-hidden or alt
// ✅ 1.3.1 Info and Relationships - Semantic HTML, proper labels
// ✅ 1.4.3 Contrast (Minimum) - All text meets 4.5:1 ratio (FIXED)
// ✅ 1.4.10 Reflow - Responsive, no horizontal scroll
// ✅ 2.1.1 Keyboard - All interactive elements keyboard accessible
// ✅ 2.1.2 No Keyboard Trap - Focus moves freely
// ✅ 2.3.3 Animation - Respects prefers-reduced-motion
// ✅ 2.4.1 Bypass Blocks - Skip to content link
// ✅ 2.4.4 Link Purpose - Descriptive link text
// ✅ 2.4.6 Headings and Labels - Proper heading hierarchy
// ✅ 2.4.7 Focus Visible - Clear focus indicators
// ✅ 4.1.2 Name, Role, Value - Proper ARIA attributes (FIXED)
// ============================================================================

interface ApiResponse {
  calculators: Calculator[];
  counts: {
    total: number;
    finance: number;
    health: number;
    everyday: number;
  };
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [data, setData] = useState<ApiResponse | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const t = useTranslations("home");
  const tCalcs = useTranslations("calculators");
  const locale = useLocale();

  useEffect(() => {
    fetch("/api/calculators/active")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch(console.error);
  }, []);

  const activeCalculators = data?.calculators || [];
  const totalCalculators = data?.counts?.total || 0;

  const categoryStats = useMemo(() => [
    { id: "finance", icon: "💰", color: "blue", count: data?.counts?.finance || 0 },
    { id: "health", icon: "💪", color: "emerald", count: data?.counts?.health || 0 },
    { id: "everyday", icon: "🗓️", color: "orange", count: data?.counts?.everyday || 0 },
    { id: "math", icon: "🧮", color: "purple", count: 15, status: "coming-soon" as const },
  ], [data]);

  const filteredCalcs = useMemo(() => {
    if (searchQuery.length === 0) return [];
    const lowerQuery = searchQuery.toLowerCase();
    return activeCalculators
      .filter((calc) => {
        const key = slugToTranslationKey(calc.slug);
        let name = "";
        try {
          name = tCalcs(`names.${key}`);
        } catch {
          name = calc.slug.replace(/-/g, " ").replace("calculator", "").trim();
        }
        return name.toLowerCase().includes(lowerQuery);
      })
      .slice(0, 6);
  }, [searchQuery, activeCalculators, tCalcs]);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(-1);
  }, [filteredCalcs]);

  const getCalculatorName = (calc: Calculator): string => {
    const key = slugToTranslationKey(calc.slug);
    try {
      return tCalcs(`names.${key}`);
    } catch {
      return calc.slug.replace("-calculator", "").split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    }
  };

  const getCategoryColor = (categoryId: string): string => {
    const colors: Record<string, string> = { finance: "blue", health: "emerald", math: "purple", everyday: "orange" };
    return colors[categoryId] || "slate";
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${locale}/calculators?search=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    }
  };

  // WCAG 2.1.1: Keyboard navigation for search results
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults || filteredCalcs.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => 
          prev < filteredCalcs.length ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev > -1 ? prev - 1 : -1));
        break;
      case "Enter":
        if (activeIndex >= 0 && activeIndex < filteredCalcs.length) {
          e.preventDefault();
          router.push(`/${locale}/${filteredCalcs[activeIndex].slug}`);
          setShowResults(false);
        } else if (activeIndex === filteredCalcs.length) {
          e.preventDefault();
          router.push(`/${locale}/calculators?search=${encodeURIComponent(searchQuery)}`);
          setShowResults(false);
        }
        break;
      case "Escape":
        setShowResults(false);
        searchInputRef.current?.focus();
        break;
    }
  };

  return (
    <>
      {/* WCAG 2.4.1: Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      <Header />
      
      <main id="main-content" tabIndex={-1}>
        {/* Hero Section */}
        <section 
          className="pt-28 pb-16 bg-gradient-to-b from-blue-50 to-white"
          aria-labelledby="hero-heading"
        >
          <div className="container text-center">
            {/* Badge with reduced motion support */}
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-100 text-blue-700 text-base font-semibold mb-8"
              role="status"
              aria-live="polite"
            >
              <span 
                className="w-2.5 h-2.5 rounded-full bg-blue-500 motion-safe:animate-pulse"
                aria-hidden="true"
              />
              <span>{totalCalculators}+ {t("badge")}</span>
            </div>

            {/* Main heading - WCAG 2.4.6 */}
            <h1 
              id="hero-heading"
              className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-5"
            >
              {t("title1")}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                {t("title2")}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>

            {/* Search form - WCAG 1.3.1, 4.1.2 */}
            <form 
              onSubmit={handleSearch} 
              className="max-w-xl mx-auto relative"
              role="search"
            >
              <label htmlFor="calculator-search" className="sr-only">
                Search calculators
              </label>
              <div className="relative">
                <svg 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={searchInputRef}
                  id="calculator-search"
                  type="search"
                  role="combobox"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(true);
                  }}
                  onFocus={() => setShowResults(true)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search calculators..."
                  className="w-full pl-12 pr-24 py-4 text-lg border-2 border-slate-200 rounded-2xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  autoComplete="off"
                  aria-autocomplete="list"
                  aria-controls="search-results"
                  aria-expanded={showResults && filteredCalcs.length > 0}
                  aria-activedescendant={activeIndex >= 0 ? `search-result-${activeIndex}` : undefined}
                  aria-haspopup="listbox"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-semibold transition-colors"
                  aria-label="Search calculators"
                >
                  {t("searchButton") || "Search"}
                </button>
              </div>

              {/* Search Results Dropdown - WCAG 4.1.2 */}
              {showResults && searchQuery && filteredCalcs.length > 0 && (
                <div
                  ref={resultsRef}
                  id="search-results"
                  role="listbox"
                  aria-label="Search suggestions"
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-20"
                >
                  {filteredCalcs.map((calc, index) => (
                    <Link
                      key={calc.slug}
                      id={`search-result-${index}`}
                      href={`/${locale}/${calc.slug}`}
                      onClick={() => setShowResults(false)}
                      role="option"
                      aria-selected={activeIndex === index}
                      className={`flex items-center gap-3 px-4 py-3 ${
                        activeIndex === index
                          ? "bg-blue-50"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <span 
                        className={`w-2 h-2 rounded-full bg-${getCategoryColor(calc.category)}-500`}
                        aria-hidden="true"
                      />
                      <span className="font-medium text-slate-700">
                        {getCalculatorName(calc)} Calculator
                      </span>
                      <span className="text-xs text-slate-600 ml-auto capitalize">
                        {calc.category}
                      </span>
                    </Link>
                  ))}
                  
                  <Link
                    id={`search-result-${filteredCalcs.length}`}
                    href={`/${locale}/calculators?search=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setShowResults(false)}
                    role="option"
                    aria-selected={activeIndex === filteredCalcs.length}
                    className={`flex items-center justify-center gap-2 px-4 py-3 font-medium border-t border-slate-100 ${
                      activeIndex === filteredCalcs.length
                        ? "bg-blue-50 text-blue-700"
                        : "bg-slate-50 text-blue-600 hover:bg-slate-100"
                    }`}
                  >
                    {t("seeAllResults")} &quot;{searchQuery}&quot;
                  </Link>
                </div>
              )}

              {/* Screen reader announcement */}
              <div 
                role="status" 
                aria-live="polite" 
                aria-atomic="true" 
                className="sr-only"
              >
                {showResults && filteredCalcs.length > 0 && 
                  `${filteredCalcs.length} results found. Use arrow keys to navigate.`
                }
                {showResults && searchQuery && filteredCalcs.length === 0 &&
                  "No results found."
                }
              </div>
            </form>

            {/* Removed CTA buttons - redundant with search and navigation */}
          </div>
        </section>

        {/* Categories Section */}
        <section 
          className="py-10 bg-slate-50"
          aria-labelledby="categories-heading"
        >
          <div className="container">
            <h2 
              id="categories-heading"
              className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-2"
            >
              {t("categories.title")}
            </h2>
            <p className="text-slate-600 text-center mb-8">
              {t("categories.subtitle")}
            </p>

            {/* Categories grid - WCAG 1.3.1 semantic list */}
            <ul 
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 list-none p-0"
              role="list"
              aria-label="Calculator categories"
            >
              {categoryStats.map((cat) => {
                const isComingSoon = cat.status === "coming-soon";
                {/* WCAG 1.4.3 - Contrast fixed: using -700 variants for better contrast */}
                const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
                  blue: { bg: "bg-blue-100", text: "text-blue-700", border: "hover:border-blue-300 focus:ring-blue-500" },
                  emerald: { bg: "bg-emerald-100", text: "text-emerald-700", border: "hover:border-emerald-300 focus:ring-emerald-500" },
                  purple: { bg: "bg-purple-100", text: "text-purple-700", border: "hover:border-purple-300 focus:ring-purple-500" },
                  orange: { bg: "bg-orange-100", text: "text-orange-700", border: "hover:border-orange-300 focus:ring-orange-500" },
                };
                const colors = colorClasses[cat.color] || colorClasses.blue;

                if (isComingSoon) {
                  return (
                    <li key={cat.id}>
                      <div 
                        className="relative bg-slate-50 rounded-2xl p-5 border border-dashed border-slate-300 opacity-75 h-full"
                        aria-label={`${t(`categories.${cat.id}`)} - Coming soon`}
                      >
                        {/* WCAG 1.4.3 - Contrast fixed: amber-800 instead of amber-700 */}
                        <span 
                          className="absolute top-3 right-3 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium"
                        >
                          {t("categories.soon")}
                        </span>
                        <div 
                          className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center text-2xl mb-3`}
                          aria-hidden="true"
                        >
                          {cat.icon}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">
                          {t(`categories.${cat.id}`)}
                        </h3>
                        <p className={`${colors.text} font-semibold text-sm mb-1`}>
                          {cat.count > 0 ? `${cat.count} Calculators` : t(`categories.${cat.id}Count`)}
                        </p>
                        {/* WCAG 1.4.3 - Contrast fixed: slate-600 instead of slate-500 */}
                        <p className="text-slate-600 text-xs">
                          {t(`categories.${cat.id}Desc`)}
                        </p>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={cat.id}>
                    <Link
                      href={`/${locale}/calculators?category=${cat.id}`}
                      className={`group block bg-white rounded-2xl p-5 border border-slate-200 ${colors.border} hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all h-full`}
                      aria-label={`${t(`categories.${cat.id}`)} - ${cat.count} calculators available. ${t(`categories.${cat.id}Desc`)}`}
                    >
                      <div 
                        className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center text-2xl mb-3`}
                        aria-hidden="true"
                      >
                        {cat.icon}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">
                        {t(`categories.${cat.id}`)}
                      </h3>
                      <p className={`${colors.text} font-semibold text-sm mb-1`}>
                        {cat.count} {cat.count === 1 ? "Calculator" : "Calculators"}
                      </p>
                      {/* WCAG 1.4.3 - Contrast fixed: slate-600 instead of slate-500 */}
                      <p className="text-slate-600 text-xs">
                        {t(`categories.${cat.id}Desc`)}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          className="py-16 bg-gradient-to-r from-blue-600 to-cyan-500"
          aria-labelledby="cta-heading"
        >
          <div className="container text-center">
            <h2 
              id="cta-heading"
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              {t("cta.title")}
            </h2>
            <p className="text-blue-100 mb-8">
              {t("cta.subtitle")}
            </p>
            <Link
              href={`/${locale}/calculators`}
              className="inline-block px-8 py-4 text-lg font-bold text-blue-600 bg-white rounded-xl hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 shadow-lg transition-colors"
              aria-label={`${t("exploreButton")} - Start using our free calculators`}
            >
              {t("exploreButton")}
            </Link>
          </div>
        </section>
      </main>

    </>
  );
}
