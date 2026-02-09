"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { getCategoryIcon, getCategoryColors } from "@/config/category-icons";

interface Calculator {
  slug: string;
  name?: string;
  category: string;
  icon?: string;
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

const CATEGORY_BADGE_COLORS: Record<string, string> = {
  finance: "bg-blue-50 text-blue-700 border-blue-200",
  health: "bg-rose-50 text-rose-700 border-rose-200",
  math: "bg-slate-50 text-slate-700 border-slate-200",
  everyday: "bg-amber-50 text-amber-700 border-amber-200",
  conversion: "bg-cyan-50 text-cyan-700 border-cyan-200",
  education: "bg-teal-50 text-teal-700 border-teal-200",
  "home-construction": "bg-green-50 text-green-700 border-green-200",
  technology: "bg-violet-50 text-violet-700 border-violet-200",
  science: "bg-indigo-50 text-indigo-700 border-indigo-200",
};
// Category slug to clean URL mapping
const CATEGORY_URL_MAP: Record<string, Record<string, string>> = {
  health: { en: "health-calculators", es: "calculadoras-salud", pt: "calculadoras-saude", fr: "calculateurs-sante", de: "gesundheitsrechner" },
  finance: { en: "finance-calculators", es: "calculadoras-finanzas", pt: "calculadoras-financas", fr: "calculateurs-finance", de: "finanzrechner" },
  conversion: { en: "conversion-calculators", es: "calculadoras-conversion", pt: "calculadoras-conversao", fr: "calculateurs-conversion", de: "umrechnungsrechner" },
  everyday: { en: "everyday-calculators", es: "calculadoras-cotidianas", pt: "calculadoras-cotidianas", fr: "calculateurs-quotidiens", de: "alltagsrechner" },
  technology: { en: "technology-calculators", es: "calculadoras-tecnologia", pt: "calculadoras-tecnologia", fr: "calculateurs-technologie", de: "technologierechner" },
  math: { en: "math-calculators", es: "calculadoras-matematicas", pt: "calculadoras-matematica", fr: "calculateurs-mathematiques", de: "mathe-rechner" },
  home: { en: "home-improvement-calculators", es: "calculadoras-hogar", pt: "calculadoras-casa", fr: "calculateurs-maison", de: "heimwerker-rechner" },
};
const getCategoryUrl = (slug: string, locale: string): string => {
  const map = CATEGORY_URL_MAP[slug];
  if (map) return `/${locale}/${map[locale] || map.en}`;
  return `/${locale}/calculators?category=${slug}`;
};

// Translations
const SECTION_TITLES: Record<string, { title: string; subtitle: string }> = {
  en: { title: "Calculator Categories", subtitle: "Everything you need for your finances and health" },
  es: { title: "Categorías de Calculadoras", subtitle: "Todo lo que necesitas para tus finanzas y salud" },
  pt: { title: "Categorias de Calculadoras", subtitle: "Tudo o que você precisa para suas finanças e saúde" },
  fr: { title: "Catégories de Calculatrices", subtitle: "Tout ce dont vous avez besoin pour vos finances et votre santé" },
  de: { title: "Rechner-Kategorien", subtitle: "Alles was Sie für Ihre Finanzen und Gesundheit brauchen" },
};

const POPULAR_TITLES: Record<string, string> = {
  en: "Popular Calculators",
  es: "Calculadoras Populares",
  pt: "Calculadoras Populares",
  fr: "Calculatrices Populaires",
  de: "Beliebte Rechner",
};

const VIEW_ALL_TITLES: Record<string, string> = {
  en: "View all",
  es: "Ver todas",
  pt: "Ver todas",
  fr: "Voir tout",
  de: "Alle anzeigen",
};

export default function HomeCategoriesSection() {
  const [calculators, setCalculators] = useState<Calculator[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loaded, setLoaded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();

  useEffect(() => {
    Promise.all([
      fetch(`/api/calculators/active?locale=${locale}`).then((res) => res.json()),
      fetch("/api/calculator-categories").then((res) => res.json()),
    ])
      .then(([calcsData, catsData]) => {
        setCalculators(calcsData.calculators || []);
        setCategories(catsData);
        setLoaded(true);
      })
      .catch(console.error);
  }, [locale]);

  const getCategoryName = (cat: Category): string => {
    if (locale === "es" && cat.nameEs) return cat.nameEs;
    if (locale === "de" && cat.nameDe) return cat.nameDe;
    if (locale === "fr" && cat.nameFr) return cat.nameFr;
    if (locale === "pt" && cat.namePt) return cat.namePt;
    return cat.nameEn;
  };

  const getCategoryCount = (slug: string): number => {
    return calculators.filter((c) => c.category === slug).length;
  };

  const homeCategories = categories.filter((cat) => cat.showInHome !== false);
  const sectionText = SECTION_TITLES[locale] || SECTION_TITLES.en;

  const popularSlugs = [
    "bmi-calculator",
    "compound-interest-calculator",
    "calorie-calculator",
    "mortgage-calculator",
    "body-fat-calculator",
    "macro-calculator",
    "auto-loan-calculator",
    "ideal-weight-calculator",
  ];

  const popularCalculators = popularSlugs
    .map((slug) => calculators.find((c) => c.slug === slug))
    .filter((c): c is Calculator => c !== undefined)
    .slice(0, 8);

  const getCategoryLabel = (calc: Calculator) => {
    const cat = categories.find((c) => c.slug === calc.category);
    return cat ? getCategoryName(cat) : calc.category;
  };

  const getCategoryBadgeColor = (calc: Calculator) => {
    return CATEGORY_BADGE_COLORS[calc.category] || "bg-slate-50 text-slate-700 border-slate-200";
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* ══════════════════════════════════════ */}
      {/* CATEGORY PILLS - Design C */}
      {/* ══════════════════════════════════════ */}
      <section className="py-12 bg-white" aria-labelledby="categories-heading">
        <div className="container mx-auto px-4">
          <h2 id="categories-heading" className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-2">
            {sectionText.title}
          </h2>
          <p className="text-slate-500 text-center mb-10">{sectionText.subtitle}</p>

          {!loaded ? (
            <div className="flex flex-wrap justify-center gap-3">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="h-14 w-48 bg-slate-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-3">
              {homeCategories.map((cat) => {
                const colors = getCategoryColors(cat.color);
                const count = getCategoryCount(cat.slug);
                return (
                  <Link
                    key={cat.id}
                    href={`/${locale}/calculators?category=${cat.slug}`}
                    className="group inline-flex items-center gap-2.5 px-5 py-3 bg-white rounded-xl border-2 border-slate-100 hover:border-slate-200 hover:shadow-md transition-all"
                  >
                    <span className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                      <span className={colors.text}>
                        {getCategoryIcon(cat.slug, "w-5 h-5")}
                      </span>
                    </span>
                    <span className="font-semibold text-slate-800">{getCategoryName(cat)}</span>
                    <span className="text-sm text-slate-400 font-medium">{count}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════ */}
      {/* POPULAR CALCULATORS - SCROLL CARDS */}
      {/* ══════════════════════════════════════ */}
      {loaded && popularCalculators.length > 0 && (
        <section className="py-10 bg-slate-50" aria-labelledby="popular-heading">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 id="popular-heading" className="text-xl md:text-2xl font-bold text-slate-900">
                {POPULAR_TITLES[locale] || POPULAR_TITLES.en}
              </h2>
              <Link
                href={`/${locale}/calculators`}
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                {VIEW_ALL_TITLES[locale] || VIEW_ALL_TITLES.en}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="relative group/scroll">
              {/* Left arrow */}
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:text-slate-900 hover:shadow-xl transition-all opacity-0 group-hover/scroll:opacity-100"
                aria-label="Scroll left"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Cards */}
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {popularCalculators.map((calc) => {
                  const name = calc.name || calc.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
                  return (
                    <Link key={calc.slug} href={`/${locale}/${calc.slug}`} className="flex-shrink-0 w-[260px] sm:w-[280px] snap-start group">
                      <div className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-200 p-5 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl">
                            {calc.icon || "🧮"}
                          </div>
                          <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-full border ${getCategoryBadgeColor(calc)}`}>
                            {getCategoryLabel(calc)}
                          </span>
                        </div>
                        <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5 leading-snug">
                          {name}
                        </h3>
                        <p className="text-sm text-slate-500 line-clamp-2 flex-grow">
                          {getShortDescription(calc.slug, locale)}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Right arrow */}
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:text-slate-900 hover:shadow-xl transition-all opacity-0 group-hover/scroll:opacity-100"
                aria-label="Scroll right"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function getShortDescription(slug: string, locale: string): string {
  const descriptions: Record<string, Record<string, string>> = {
    "bmi-calculator": {
      en: "Body Mass Index & healthy weight range",
      es: "Índice de Masa Corporal y rango de peso saludable",
      pt: "Índice de Massa Corporal e faixa de peso saudável",
      fr: "Indice de Masse Corporelle et poids idéal",
      de: "Body-Mass-Index und gesundes Gewicht",
    },
    "compound-interest-calculator": {
      en: "Investment growth over time",
      es: "Crecimiento de inversiones a lo largo del tiempo",
      pt: "Crescimento de investimentos ao longo do tempo",
      fr: "Croissance des investissements dans le temps",
      de: "Investitionswachstum über die Zeit",
    },
    "calorie-calculator": {
      en: "Daily calorie needs & macros",
      es: "Necesidades calóricas diarias y macros",
      pt: "Necessidades calóricas diárias e macros",
      fr: "Besoins caloriques quotidiens et macros",
      de: "Täglicher Kalorienbedarf und Makros",
    },
    "mortgage-calculator": {
      en: "Monthly payments & amortization",
      es: "Pagos mensuales y amortización",
      pt: "Pagamentos mensais e amortização",
      fr: "Paiements mensuels et amortissement",
      de: "Monatliche Zahlungen und Tilgung",
    },
    "body-fat-calculator": {
      en: "Estimate body fat with 5 methods",
      es: "Estima grasa corporal con 5 métodos",
      pt: "Estime gordura corporal com 5 métodos",
      fr: "Estimez la graisse corporelle avec 5 méthodes",
      de: "Körperfett mit 5 Methoden schätzen",
    },
    "macro-calculator": {
      en: "Protein, carbs & fat targets",
      es: "Objetivos de proteína, carbohidratos y grasa",
      pt: "Metas de proteína, carboidratos e gordura",
      fr: "Objectifs protéines, glucides et lipides",
      de: "Protein-, Kohlenhydrat- und Fettziele",
    },
    "auto-loan-calculator": {
      en: "Car payment & total loan cost",
      es: "Pago del auto y costo total del préstamo",
      pt: "Pagamento do carro e custo total do empréstimo",
      fr: "Paiement auto et coût total du prêt",
      de: "Autozahlung und Gesamtkreditkosten",
    },
    "ideal-weight-calculator": {
      en: "Find your ideal weight range",
      es: "Encuentra tu rango de peso ideal",
      pt: "Encontre sua faixa de peso ideal",
      fr: "Trouvez votre poids idéal",
      de: "Finden Sie Ihr Idealgewicht",
    },
  };
  
  return descriptions[slug]?.[locale] || descriptions[slug]?.en || "Free online calculator";
}
