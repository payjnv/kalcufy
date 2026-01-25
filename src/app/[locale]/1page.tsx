"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

// Importar configuración centralizada
import {
  getActiveCalculators,
  getCategoryStats,
  getTotalActiveCalculators,
  slugToTranslationKey,
  type Calculator,
} from "@/config/calculators-config";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();
  const t = useTranslations("home");
  const tCalcs = useTranslations("calculators");
  const locale = useLocale();

  // Obtener datos dinámicos
  const activeCalculators = useMemo(() => getActiveCalculators(), []);
  const categoryStats = useMemo(() => getCategoryStats(), []);
  const totalCalculators = useMemo(() => getTotalActiveCalculators(), []);

  // Filtrar calculadoras basándose en búsqueda
  const filteredCalcs = useMemo(() => {
    if (searchQuery.length === 0) return [];
    
    const lowerQuery = searchQuery.toLowerCase();
    
    return activeCalculators
      .filter((calc) => {
        const key = slugToTranslationKey(calc.slug);
        // Intentar obtener el nombre traducido, si no existe usar el slug
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

  // Obtener nombre de calculadora para mostrar
  const getCalculatorName = (calc: Calculator): string => {
    const key = slugToTranslationKey(calc.slug);
    try {
      return tCalcs(`names.${key}`);
    } catch {
      // Fallback: convertir slug a nombre legible
      return calc.slug
        .replace("-calculator", "")
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
  };

  // Obtener color de categoría
  const getCategoryColor = (categoryId: string): string => {
    const colors: Record<string, string> = {
      finance: "blue",
      health: "emerald",
      math: "purple",
      everyday: "orange",
    };
    return colors[categoryId] || "slate";
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${locale}/calculators?search=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    }
  };

  return (
    <>
      <Header />
      
      <main>
        {/* HERO */}
        <section className="pt-28 pb-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container text-center">
            {/* Badge - Dinámico */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-100 text-blue-700 text-base font-semibold mb-8">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
              {totalCalculators}+ {t("badge")}
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-5">
              {t("title1")}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                {t("title2")}
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
            
            {/* Search Bar - AUTOCOMPLETE DINÁMICO */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-8 relative">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(true);
                  }}
                  onFocus={() => setShowResults(true)}
                  onBlur={() => {
                    // Delay para permitir clicks en resultados
                    setTimeout(() => setShowResults(false), 200);
                  }}
                  placeholder={t("searchPlaceholder")}
                  className="w-full px-6 py-4 pl-12 text-base border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none shadow-md bg-white"
                />
                <svg 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" 
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
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  {t("searchButton")}
                </button>
              </div>
              
              {/* Dropdown Results - Dinámico */}
              {showResults && filteredCalcs.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
                  {filteredCalcs.map((calc) => {
                    const color = getCategoryColor(calc.category);
                    return (
                      <Link
                        key={calc.slug}
                        href={`/${locale}/${calc.slug}`}
                        onClick={() => setShowResults(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                      >
                        <span className={`w-2 h-2 rounded-full bg-${color}-500`}></span>
                        <span className="font-medium text-slate-700">
                          {getCalculatorName(calc)} Calculator
                        </span>
                        <span className="text-xs text-slate-400 ml-auto capitalize">
                          {calc.category}
                        </span>
                      </Link>
                    );
                  })}
                  <Link
                    href={`/${locale}/calculators?search=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setShowResults(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 text-blue-600 font-medium hover:bg-slate-100 border-t border-slate-100"
                  >
                    {t("seeAllResults")} &quot;{searchQuery}&quot;
                  </Link>
                </div>
              )}
            </form>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={`/${locale}/calculators`} 
                className="px-8 py-4 text-base font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition-colors"
              >
                {t("exploreButton")}
              </Link>
              <Link 
                href={`/${locale}/compound-interest-calculator`} 
                className="px-8 py-4 text-base font-semibold text-slate-700 bg-white border-2 border-slate-200 rounded-xl hover:border-blue-400 transition-colors"
              >
                {t("tryCompound")}
              </Link>
            </div>
          </div>
        </section>

        {/* CATEGORIES - DINÁMICO */}
        <section className="py-10 bg-slate-50">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-2">
              {t("categories.title")}
            </h2>
            <p className="text-slate-600 text-center mb-8">
              {t("categories.subtitle")}
            </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {categoryStats.map((cat) => {
                const isComingSoon = cat.status === "coming-soon";
                const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
                  blue: { bg: "bg-blue-100", text: "text-blue-600", border: "hover:border-blue-300" },
                  emerald: { bg: "bg-emerald-100", text: "text-emerald-700", border: "hover:border-emerald-300" },
                  purple: { bg: "bg-purple-100", text: "text-purple-700", border: "hover:border-purple-300" },
                  orange: { bg: "bg-orange-100", text: "text-orange-700", border: "hover:border-orange-300" },
                };
                const colors = colorClasses[cat.color] || colorClasses.blue;
                
                if (isComingSoon) {
                  return (
                    <div 
                      key={cat.id}
                      className="relative bg-slate-50 rounded-2xl p-5 border border-dashed border-slate-300 opacity-75"
                    >
                      <span className="absolute top-3 right-3 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">
                        {t("categories.soon")}
                      </span>
                      <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center text-2xl mb-3`}>
                        {cat.icon}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">
                        {t(`categories.${cat.id}`)}
                      </h3>
                      <p className={`${colors.text} font-semibold text-sm mb-1`}>
                        {cat.count > 0 ? `${cat.count} Calculators` : t(`categories.${cat.id}Count`)}
                      </p>
                      <p className="text-slate-600 text-xs">
                        {t(`categories.${cat.id}Desc`)}
                      </p>
                    </div>
                  );
                }
                
                return (
                  <Link 
                    key={cat.id}
                    href={`/${locale}/calculators?category=${cat.id}`} 
                    className={`group bg-white rounded-2xl p-5 border border-slate-200 ${colors.border} hover:shadow-lg transition-all`}
                  >
                    <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center text-2xl mb-3`}>
                      {cat.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      {t(`categories.${cat.id}`)}
                    </h3>
                    <p className={`${colors.text} font-semibold text-sm mb-1`}>
                      {cat.count} {cat.count === 1 ? "Calculator" : "Calculators"}
                    </p>
                    <p className="text-slate-600 text-xs">
                      {t(`categories.${cat.id}Desc`)}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-500">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("cta.title")}
            </h2>
            <p className="text-blue-100 mb-8">{t("cta.subtitle")}</p>
            <Link 
              href={`/${locale}/calculators`} 
              className="inline-block px-8 py-4 text-lg font-bold text-blue-600 bg-white rounded-xl hover:bg-blue-50 shadow-lg transition-colors"
            >
              {t("exploreButton")}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
