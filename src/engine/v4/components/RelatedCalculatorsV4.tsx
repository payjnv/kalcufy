"use client";

/**
 * RELATED CALCULATORS V4
 * 
 * Only shows calculators that exist in V4 system
 * With hardcoded translations (no external dependencies)
 */

import Link from "next/link";
import { useLocale } from "next-intl";

// ─────────────────────────────────────────────────────────────────────────────
// V4 CALCULATORS - Only these exist in the system
// ─────────────────────────────────────────────────────────────────────────────
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
  en: { related: "Related Calculators", viewAll: "View all →" },
  es: { related: "Calculadoras Relacionadas", viewAll: "Ver todas →" },
  pt: { related: "Calculadoras Relacionadas", viewAll: "Ver todas →" },
  fr: { related: "Calculateurs Connexes", viewAll: "Voir tout →" },
};

// ─────────────────────────────────────────────────────────────────────────────
// PROPS
// ─────────────────────────────────────────────────────────────────────────────
interface RelatedCalculatorsV4Props {
  currentSlug: string;
  category: "health" | "finance" | "math" | "everyday";
  relatedSlugs?: string[];
  maxItems?: number;
  variant?: "sidebar" | "compact";
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function RelatedCalculatorsV4({
  currentSlug,
  maxItems = 4,
  variant = "compact",
}: RelatedCalculatorsV4Props) {
  const locale = useLocale() as "en" | "es" | "pt" | "fr";
  const ui = UI_TRANSLATIONS[locale] || UI_TRANSLATIONS.en;

  // Get calculator translation
  const getCalcTranslation = (calc: typeof V4_CALCULATORS[0]) => {
    return calc.translations[locale] || calc.translations.en;
  };

  // Get related calculators
  const getRelatedCalculators = () => {
    const relatedSlugs = V4_RELATIONSHIPS[currentSlug] || [];
    
    if (relatedSlugs.length > 0) {
      return relatedSlugs
        .map(slug => V4_CALCULATORS.find(c => c.slug === slug))
        .filter((c): c is typeof V4_CALCULATORS[0] => c !== undefined)
        .slice(0, maxItems);
    }

    // Fallback: other V4 calculators
    return V4_CALCULATORS
      .filter(c => c.slug !== currentSlug)
      .slice(0, maxItems);
  };

  const relatedCalculators = getRelatedCalculators();

  if (relatedCalculators.length === 0) return null;

  // ─────────────────────────────────────────────────────────────────────────
  // SIDEBAR VARIANT - Not used (handled by CalculatorSidebar)
  // ─────────────────────────────────────────────────────────────────────────
  if (variant === "sidebar") {
    return null; // Sidebar handles this now
  }

  // ─────────────────────────────────────────────────────────────────────────
  // COMPACT VARIANT - For mobile
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <section className="py-6 bg-slate-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-900 flex items-center gap-2">
            <span className="text-lg">🔗</span>
            {ui.related}
          </h2>
          <Link
            href={`/${locale}/calculators`}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            {ui.viewAll}
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {relatedCalculators.map(calc => {
            const { name, desc } = getCalcTranslation(calc);
            return (
              <Link
                key={calc.slug}
                href={`/${locale}/${calc.slug}`}
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all group"
              >
                <span className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-lg group-hover:scale-105 transition-transform">
                  {calc.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm group-hover:text-blue-600 transition-colors truncate">
                    {name}
                  </p>
                  <p className="text-xs text-slate-500 truncate">{desc}</p>
                </div>
                <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
