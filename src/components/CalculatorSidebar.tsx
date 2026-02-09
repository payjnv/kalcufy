"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import AdBlock from "@/components/ads/AdBlock";

// ============================================================================
// V4 CALCULATORS - Only these exist in the system
// ============================================================================
const V4_CALCULATORS = [
  { 
    slug: "401k-calculator", 
    icon: "💼", 
    category: "finance",
    translations: {
      en: { name: "401(k) Calculator", desc: "Plan your retirement savings" },
      es: { name: "Calculadora 401(k)", desc: "Planifica tu ahorro para el retiro" },
      pt: { name: "Calculadora 401(k)", desc: "Planeje sua aposentadoria" },
      fr: { name: "Calculateur 401(k)", desc: "Planifiez votre retraite" },
    }
  },
  { 
    slug: "auto-loan-calculator", 
    icon: "🚗", 
    category: "finance",
    translations: {
      en: { name: "Auto Loan Calculator", desc: "Calculate car payments" },
      es: { name: "Calculadora Préstamo Auto", desc: "Calcula los pagos de tu auto" },
      pt: { name: "Calculadora Financiamento", desc: "Calcule as parcelas do carro" },
      fr: { name: "Calculateur Prêt Auto", desc: "Calculez vos mensualités auto" },
    }
  },
  { 
    slug: "credit-card-payoff-calculator", 
    icon: "💳", 
    category: "finance",
    translations: {
      en: { name: "Credit Card Payoff", desc: "Pay off your credit card debt" },
      es: { name: "Pago Tarjeta de Crédito", desc: "Salda tu deuda de tarjeta" },
      pt: { name: "Quitar Cartão de Crédito", desc: "Quite sua dívida do cartão" },
      fr: { name: "Remboursement Carte", desc: "Remboursez votre carte de crédit" },
    }
  },
  { 
    slug: "quadratic-calculator", 
    icon: "📐", 
    category: "math",
    translations: {
      en: { name: "Quadratic Calculator", desc: "Solve quadratic equations" },
      es: { name: "Calculadora Cuadrática", desc: "Resuelve ecuaciones cuadráticas" },
      pt: { name: "Calculadora Quadrática", desc: "Resolva equações quadráticas" },
      fr: { name: "Calculateur Quadratique", desc: "Résolvez les équations quadratiques" },
    }
  },
  { 
    slug: "tip-calculator", 
    icon: "💰", 
    category: "everyday",
    translations: {
      en: { name: "Tip Calculator", desc: "Calculate tips easily" },
      es: { name: "Calculadora de Propinas", desc: "Calcula propinas fácilmente" },
      pt: { name: "Calculadora de Gorjeta", desc: "Calcule gorjetas facilmente" },
      fr: { name: "Calculateur Pourboire", desc: "Calculez les pourboires facilement" },
    }
  },
];

// Relationships between V4 calculators
const V4_RELATIONSHIPS: Record<string, string[]> = {
  "401k-calculator": ["auto-loan-calculator", "credit-card-payoff-calculator", "tip-calculator"],
  "auto-loan-calculator": ["401k-calculator", "credit-card-payoff-calculator", "tip-calculator"],
  "credit-card-payoff-calculator": ["401k-calculator", "auto-loan-calculator", "tip-calculator"],
  "quadratic-calculator": ["tip-calculator", "401k-calculator"],
  "tip-calculator": ["401k-calculator", "auto-loan-calculator", "quadratic-calculator"],
};

// UI Translations
const UI_TRANSLATIONS = {
  en: {
    searchPlaceholder: "Search calculators...",
    related: "Related",
    viewAll: "All →",
    noResults: "No calculators found",
    ctaTitle: "📏 Try More Calculators",
    ctaDescription: "Explore our collection of free calculators.",
    ctaButton: "View All Calculators →",
  },
  es: {
    searchPlaceholder: "Buscar calculadoras...",
    related: "Relacionadas",
    viewAll: "Ver todas →",
    noResults: "No se encontraron calculadoras",
    ctaTitle: "📏 Prueba Más Calculadoras",
    ctaDescription: "Explora nuestra colección de calculadoras gratuitas.",
    ctaButton: "Ver Todas las Calculadoras →",
  },
  pt: {
    searchPlaceholder: "Buscar calculadoras...",
    related: "Relacionadas",
    viewAll: "Ver todas →",
    noResults: "Nenhuma calculadora encontrada",
    ctaTitle: "📏 Experimente Mais Calculadoras",
    ctaDescription: "Explore nossa coleção de calculadoras gratuitas.",
    ctaButton: "Ver Todas as Calculadoras →",
  },
  fr: {
    searchPlaceholder: "Rechercher des calculatrices...",
    related: "Connexes",
    viewAll: "Voir tout →",
    noResults: "Aucune calculatrice trouvée",
    ctaTitle: "📏 Essayez Plus de Calculateurs",
    ctaDescription: "Explorez notre collection de calculateurs gratuits.",
    ctaButton: "Voir Tous les Calculateurs →",
  },
};

// ============================================================================
// INTERFACES
// ============================================================================
interface CalculatorSidebarProps {
  currentCalculator?: string;
  category?: "health" | "finance" | "math" | "everyday" | "all";
  showCTA?: boolean;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaLink?: string;
  ctaLinkText?: string;
  relatedTags?: string[];
  relatedCalculators?: string[];
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function CalculatorSidebar({
  currentCalculator,
  showCTA = true,
  ctaTitle,
  ctaDescription,
  ctaLink,
  ctaLinkText,
}: CalculatorSidebarProps) {
  const locale = useLocale() as "en" | "es" | "pt" | "fr";
  const [searchQuery, setSearchQuery] = useState("");

  // Get UI translations
  const ui = UI_TRANSLATIONS[locale] || UI_TRANSLATIONS.en;

  // Get calculator translation
  const getCalcTranslation = (calc: typeof V4_CALCULATORS[0]) => {
    return calc.translations[locale] || calc.translations.en;
  };

  // ─────────────────────────────────────────────────────────────────────────
  // GET RELATED CALCULATORS (only V4)
  // ─────────────────────────────────────────────────────────────────────────
  const getRelatedCalculators = () => {
    if (!currentCalculator) return V4_CALCULATORS.filter(c => c.slug !== currentCalculator).slice(0, 4);

    const relatedSlugs = V4_RELATIONSHIPS[currentCalculator] || [];
    
    if (relatedSlugs.length > 0) {
      return relatedSlugs
        .map(slug => V4_CALCULATORS.find(c => c.slug === slug))
        .filter((c): c is typeof V4_CALCULATORS[0] => c !== undefined)
        .slice(0, 4);
    }

    // Fallback: other V4 calculators
    return V4_CALCULATORS
      .filter(c => c.slug !== currentCalculator)
      .slice(0, 4);
  };

  const relatedCalcs = getRelatedCalculators();

  // ─────────────────────────────────────────────────────────────────────────
  // FILTER BY SEARCH
  // ─────────────────────────────────────────────────────────────────────────
  const filteredCalculators = V4_CALCULATORS.filter(calc => {
    if (calc.slug === currentCalculator) return false;
    if (!searchQuery) return false;
    
    const { name } = getCalcTranslation(calc);
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER CALCULATOR ITEM
  // ─────────────────────────────────────────────────────────────────────────
  const renderCalculatorItem = (calc: typeof V4_CALCULATORS[0], showDesc: boolean = true) => {
    const { name, desc } = getCalcTranslation(calc);
    
    return (
      <li key={calc.slug}>
        <Link
          href={`/${locale}/${calc.slug}`}
          className="group flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
        >
          <span className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-base flex-shrink-0 group-hover:scale-110 transition-transform">
            {calc.icon}
          </span>
          <div className="flex-1 min-w-0">
            <span className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors block truncate">
              {name}
            </span>
            {showDesc && (
              <span className="text-xs text-slate-500 block truncate">
                {desc}
              </span>
            )}
          </div>
        </Link>
      </li>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <aside className="space-y-4">
      {/* ═══════════════════════════════════════════════════════════════════
          1. SEARCH BAR
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="search"
            placeholder={ui.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
          />
        </div>

        {/* Search Results */}
        {searchQuery && filteredCalculators.length > 0 && (
          <ul className="mt-3 space-y-1 border-t border-slate-100 pt-3">
            {filteredCalculators.map(calc => renderCalculatorItem(calc, false))}
          </ul>
        )}
        
        {searchQuery && filteredCalculators.length === 0 && (
          <p className="mt-3 text-sm text-slate-500 text-center py-2">
            {ui.noResults}
          </p>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          2. RELATED CALCULATORS (below search)
      ═══════════════════════════════════════════════════════════════════ */}
      {relatedCalcs.length > 0 && !searchQuery && (
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="text-base">🔗</span>
              {ui.related}
            </h3>
            <Link
              href={`/${locale}/calculators`}
              className="text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              {ui.viewAll}
            </Link>
          </div>
          <ul className="space-y-1">
            {relatedCalcs.map(calc => renderCalculatorItem(calc))}
          </ul>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          3. AD BLOCK
      ═══════════════════════════════════════════════════════════════════ */}
      <AdBlock slot="Calculator Sidebar" />

      {/* ═══════════════════════════════════════════════════════════════════
          4. CTA BLOCK
      ═══════════════════════════════════════════════════════════════════ */}
      {showCTA && (
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-5 text-white shadow-lg">
          <h3 className="font-bold mb-2 text-lg">
            {ctaTitle || ui.ctaTitle}
          </h3>
          <p className="text-blue-100 text-sm mb-4 leading-relaxed">
            {ctaDescription || ui.ctaDescription}
          </p>
          <Link
            href={ctaLink || `/${locale}/calculators`}
            className="inline-block bg-white text-blue-600 font-semibold px-4 py-2.5 rounded-xl hover:bg-blue-50 transition-colors shadow-sm"
          >
            {ctaLinkText || ui.ctaButton}
          </Link>
        </div>
      )}
    </aside>
  );
}
