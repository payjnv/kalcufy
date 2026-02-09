"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { getCategoryIcon, getCategoryColors } from "@/config/category-icons";

interface Calculator {
  slug: string;
  name?: string;
  description?: string;
  icon?: string;
  color?: string;
  category: string;
  isNew?: boolean;
  isPro?: boolean;
}

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
  showInHome: boolean;
}

export default function HomeSearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [calculators, setCalculators] = useState<Calculator[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLUListElement>(null);
  const router = useRouter();
  const t = useTranslations("home");
  const locale = useLocale();

  useEffect(() => {
    Promise.all([
      fetch(`/api/calculators/active?locale=${locale}`).then((res) => res.json()),
      fetch("/api/calculator-categories").then((res) => res.json()),
    ])
      .then(([calcsData, catsData]) => {
        setCalculators(calcsData.calculators || []);
        setCategories(catsData);
      })
      .catch(console.error);
  }, [locale]);

  const filteredCalcs = useMemo(() => {
    if (searchQuery.length === 0) return [];
    const lowerQuery = searchQuery.toLowerCase();
    return calculators
      .filter((calc) => {
        const name = calc.name || calc.slug.replace(/-/g, " ");
        return name.toLowerCase().includes(lowerQuery);
      })
      .slice(0, 6);
  }, [searchQuery, calculators]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [filteredCalcs]);

  const getCategoryName = (cat: Category): string => {
    if (locale === "es" && cat.nameEs) return cat.nameEs;
    if (locale === "de" && cat.nameDe) return cat.nameDe;
    if (locale === "fr" && cat.nameFr) return cat.nameFr;
    if (locale === "pt" && cat.namePt) return cat.namePt;
    return cat.nameEn;
  };

  const getCalculatorName = (calc: Calculator): string => {
    return (
      calc.name ||
      calc.slug
        .replace("-calculator", "")
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/${locale}/calculators?search=${encodeURIComponent(searchQuery)}`
      );
      setShowResults(false);
    }
  };

  const handleResultClick = (slug: string) => {
    router.push(`/${locale}/${slug}`);
    setShowResults(false);
    setSearchQuery("");
  };

  const handleViewAllClick = () => {
    router.push(
      `/${locale}/calculators?search=${encodeURIComponent(searchQuery)}`
    );
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
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
          placeholder={t("searchPlaceholder") || "Search calculators..."}
          className="w-full pl-12 pr-24 py-4 text-lg border-2 border-slate-200 rounded-2xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={hasResults}
          aria-activedescendant={
            activeIndex >= 0 ? `search-option-${activeIndex}` : undefined
          }
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

      {/* Search Results Dropdown */}
      {hasResults && (
        <ul
          ref={resultsRef}
          id="search-results"
          role="listbox"
          aria-label="Search suggestions"
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-20 list-none p-0 m-0"
        >
          {filteredCalcs.map((calc, index) => {
            const cat = categories.find((c) => c.slug === calc.category);
            const colors = cat
              ? getCategoryColors(cat.color)
              : getCategoryColors("blue");
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
                  activeIndex === index ? "bg-blue-50" : "hover:bg-slate-50"
                }`}
              >
                <span className={colors.text}>
                  {getCategoryIcon(calc.category, "w-5 h-5")}
                </span>
                <span className="font-medium text-slate-700">
                  {getCalculatorName(calc)}
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
            {t("seeAllResults") || "See all results for"} &quot;{searchQuery}&quot;
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
          `${filteredCalcs.length} results found. Use arrow keys to navigate.`}
        {showResults &&
          searchQuery &&
          filteredCalcs.length === 0 &&
          "No results found."}
      </div>
    </form>
  );
}
