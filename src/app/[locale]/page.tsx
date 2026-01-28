"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { slugToTranslationKey, type Calculator } from "@/config/calculators-config";
import { getCategoryIcon, getCategoryColors } from "@/config/category-icons";

interface Category {
  id: string;
  slug: string;
  nameEn: string;
  nameEs: string | null;
  namePt: string | null;
  icon: string | null;
  color: string;
  showInHome: boolean;
}

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
  const [categories, setCategories] = useState<Category[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLUListElement>(null);
  const router = useRouter();
  const t = useTranslations("home");
  const tCalcs = useTranslations("calculators");
  const locale = useLocale();

  useEffect(() => {
    Promise.all([
      fetch("/api/calculators/active").then((res) => res.json()),
      fetch("/api/calculator-categories").then((res) => res.json())
    ])
      .then(([calcsData, catsData]) => {
        setData(calcsData);
        setCategories(catsData);
      })
      .catch(console.error);
  }, []);

  const activeCalculators = data?.calculators || [];
  const totalCalculators = data?.counts?.total || 0;

  const getCategoryName = (cat: Category): string => {
    if (locale === 'es' && cat.nameEs) return cat.nameEs;
    if (locale === 'pt' && cat.namePt) return cat.namePt;
    return cat.nameEn;
  };

  const getCategoryCount = (slug: string): number => {
    if (!data) return 0;
    return data.calculators.filter(c => c.category === slug).length;
  };

  const homeCategories = categories.filter(cat => cat.showInHome !== false);

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${locale}/calculators?search=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    }
  };

  const handleResultClick = (slug: string) => {
    router.push(`/${locale}/${slug}`);
    setShowResults(false);
    setSearchQuery("");
  };

  const handleViewAllClick = () => {
    router.push(`/${locale}/calculators?search=${encodeURIComponent(searchQuery)}`);
    setShowResults(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults || filteredCalcs.length === 0) return;

    const totalItems = filteredCalcs.length + 1;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev < totalItems - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev > -1 ? prev - 1 : -1));
        break;
      case "Enter":
        if (activeIndex >= 0 && activeIndex < filteredCalcs.length) {
          e.preventDefault();
          handleResultClick(filteredCalcs[activeIndex].slug);
        } else if (activeIndex === filteredCalcs.length) {
          e.preventDefault();
          handleViewAllClick();
        }
        break;
      case "Escape":
        setShowResults(false);
        searchInputRef.current?.focus();
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        resultsRef.current && 
        !resultsRef.current.contains(e.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasResults = showResults && searchQuery && filteredCalcs.length > 0;

  return (
    <>
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
          className="pt-16 pb-16 bg-gradient-to-b from-blue-50 to-white"
          aria-labelledby="hero-heading"
        >
          <div className="container text-center">
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

            {/* Search form */}
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
                  aria-expanded={hasResults}
                  aria-activedescendant={activeIndex >= 0 ? `search-option-${activeIndex}` : undefined}
                  aria-haspopup="listbox"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-semibold transition-colors"
                >
                  <span className="sr-only">Submit search for </span>
                  {t("searchButton") || "Search"}
                </button>
              </div>

              {/* Search Results */}
              {hasResults && (
                <ul
                  ref={resultsRef}
                  id="search-results"
                  role="listbox"
                  aria-label="Search suggestions"
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-20 list-none p-0 m-0"
                >
                  {filteredCalcs.map((calc, index) => {
                    const cat = categories.find(c => c.slug === calc.category);
                    const colors = cat ? getCategoryColors(cat.color) : getCategoryColors('blue');
                    return (
                      <li
                        key={calc.slug}
                        id={`search-option-${index}`}
                        role="option"
                        aria-selected={activeIndex === index}
                        onClick={() => handleResultClick(calc.slug)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleResultClick(calc.slug);
                          }
                        }}
                        tabIndex={-1}
                        className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${
                          activeIndex === index
                            ? "bg-blue-50"
                            : "hover:bg-slate-50"
                        }`}
                      >
                        <span className={colors.text}>
                          {getCategoryIcon(calc.category, "w-5 h-5")}
                        </span>
                        <span className="font-medium text-slate-700">
                          {getCalculatorName(calc)} Calculator
                        </span>
                        <span className="text-xs text-slate-500 ml-auto">
                          {cat ? getCategoryName(cat) : calc.category}
                        </span>
                      </li>
                    );
                  })}
                  
                  <li
                    id={`search-option-${filteredCalcs.length}`}
                    role="option"
                    aria-selected={activeIndex === filteredCalcs.length}
                    onClick={handleViewAllClick}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleViewAllClick();
                      }
                    }}
                    tabIndex={-1}
                    className={`flex items-center justify-center gap-2 px-4 py-3 font-medium border-t border-slate-100 cursor-pointer ${
                      activeIndex === filteredCalcs.length
                        ? "bg-blue-50 text-blue-700"
                        : "bg-slate-50 text-blue-600 hover:bg-slate-100"
                    }`}
                  >
                    {t("seeAllResults")} &quot;{searchQuery}&quot;
                  </li>
                </ul>
              )}

              <div 
                role="status" 
                aria-live="polite" 
                aria-atomic="true" 
                className="sr-only"
              >
                {hasResults && 
                  `${filteredCalcs.length} results found. Use arrow keys to navigate.`
                }
                {showResults && searchQuery && filteredCalcs.length === 0 &&
                  "No results found."
                }
              </div>
            </form>
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

            {/* Categories grid with shared SVG icons */}
            <ul 
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 list-none p-0"
              role="list"
              aria-label="Calculator categories"
            >
              {homeCategories.map((cat) => {
                const colors = getCategoryColors(cat.color);
                const count = getCategoryCount(cat.slug);

                return (
                  <li key={cat.id}>
                    <Link
                      href={`/${locale}/calculators?category=${cat.slug}`}
                      className={`group block bg-white rounded-2xl p-5 border border-slate-200 ${colors.border} ${colors.ring} hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all h-full`}
                      aria-label={`${getCategoryName(cat)} - ${count} calculators available`}
                    >
                      <div 
                        className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-3`}
                        aria-hidden="true"
                      >
                        <span className={colors.text}>
                          {getCategoryIcon(cat.slug, "w-6 h-6")}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">
                        {getCategoryName(cat)}
                      </h3>
                      <p className={`${colors.text} font-semibold text-sm mb-1`}>
                        {count} {count === 1 ? "Calculator" : "Calculators"}
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
            >
              {t("exploreButton")}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
