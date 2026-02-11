"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { getCategoryIcon, getCategoryColors } from "@/config/category-icons";

interface Calculator {
  slug: string;
  name?: string;
  category: string;
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

// Translations
const SECTION_TITLES: Record<string, { title: string; subtitle: string }> = {
  en: { title: "Calculator Categories", subtitle: "Everything you need for your finances and health" },
  es: { title: "Categorías de Calculadoras", subtitle: "Todo lo que necesitas para tus finanzas y salud" },
  pt: { title: "Categorias de Calculadoras", subtitle: "Tudo o que você precisa para suas finanças e saúde" },
  fr: { title: "Catégories de Calculatrices", subtitle: "Tout ce dont vous avez besoin pour vos finances et votre santé" },
  de: { title: "Rechner-Kategorien", subtitle: "Alles was Sie für Ihre Finanzen und Gesundheit brauchen" },
};

const CALCULATOR_WORD: Record<string, { singular: string; plural: string }> = {
  en: { singular: "Calculator", plural: "Calculators" },
  es: { singular: "Calculadora", plural: "Calculadoras" },
  pt: { singular: "Calculadora", plural: "Calculadoras" },
  fr: { singular: "Calculatrice", plural: "Calculatrices" },
  de: { singular: "Rechner", plural: "Rechner" },
};

export default function HomeCategoriesSection() {
  const [calculators, setCalculators] = useState<Calculator[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loaded, setLoaded] = useState(false);
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

  const getCalculatorWord = (count: number): string => {
    const words = CALCULATOR_WORD[locale] || CALCULATOR_WORD.en;
    return count === 1 ? words.singular : words.plural;
  };

  const homeCategories = categories.filter((cat) => cat.showInHome !== false);
  const sectionText = SECTION_TITLES[locale] || SECTION_TITLES.en;

  return (
    <section className="py-10 bg-slate-50" aria-labelledby="categories-heading">
      <div className="container mx-auto px-4">
        <h2
          id="categories-heading"
          className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-2"
        >
          {sectionText.title}
        </h2>
        <p className="text-slate-600 text-center mb-8">{sectionText.subtitle}</p>

        {!loaded ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 border border-slate-200 animate-pulse"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-200 mb-3" />
                <div className="h-5 bg-slate-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-slate-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {homeCategories.map((cat) => {
              const colors = getCategoryColors(cat.color);
              const count = getCategoryCount(cat.slug);

              return (
                <Link
                  key={cat.id}
                  href={`/${locale}/calculators?category=${cat.slug}`}
                  className="group bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-3`}
                  >
                    <span className={colors.text}>
                      {getCategoryIcon(cat.slug, "w-6 h-6")}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    {getCategoryName(cat)}
                  </h3>
                  <p className={`${colors.text} font-semibold text-sm`}>
                    {count} {getCalculatorWord(count)}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
