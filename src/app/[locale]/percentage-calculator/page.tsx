"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import AdBlock from "@/components/ads/AdBlock";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

// =============================================================================
// CALCULATOR CONSTANTS
// =============================================================================
const CALCULATOR_SLUG = "percentage-calculator";
const CALCULATOR_NAME = "Percentage Calculator";
const CALCULATOR_CATEGORY = "everyday";

// =============================================================================
// TYPES
// =============================================================================
type CalculationMode = "whatIsXPercentOfY" | "xIsWhatPercentOfY" | "xIsYPercentOfWhat" | "percentChange" | "increaseByPercent" | "decreaseByPercent";

// =============================================================================
// CALCULATION MODES CONFIG
// =============================================================================
const CALCULATION_MODES: Record<CalculationMode, { label: string; icon: string; description: string; formula: string }> = {
  whatIsXPercentOfY: { 
    label: "What is X% of Y?", 
    icon: "📊", 
    description: "Find a percentage of a number",
    formula: "Result = Y × (X / 100)"
  },
  xIsWhatPercentOfY: { 
    label: "X is what % of Y?", 
    icon: "🔢", 
    description: "Find what percentage one number is of another",
    formula: "Result = (X / Y) × 100"
  },
  xIsYPercentOfWhat: { 
    label: "X is Y% of what?", 
    icon: "🔍", 
    description: "Find the original number",
    formula: "Result = X / (Y / 100)"
  },
  percentChange: { 
    label: "% Change", 
    icon: "📈", 
    description: "Calculate increase or decrease between values",
    formula: "Result = ((New - Old) / |Old|) × 100"
  },
  increaseByPercent: { 
    label: "Increase by %", 
    icon: "⬆️", 
    description: "Add a percentage to a number",
    formula: "Result = X × (1 + Y / 100)"
  },
  decreaseByPercent: { 
    label: "Decrease by %", 
    icon: "⬇️", 
    description: "Subtract a percentage from a number",
    formula: "Result = X × (1 - Y / 100)"
  },
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function PercentageCalculatorPage() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - Inputs
  // ─────────────────────────────────────────────────────────────────────────────
  const [calculationMode, setCalculationMode] = useState<CalculationMode>("whatIsXPercentOfY");
  const [valueX, setValueX] = useState(25);
  const [valueY, setValueY] = useState(200);
  const [oldValue, setOldValue] = useState(100);
  const [newValue, setNewValue] = useState(125);

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - UI
  // ─────────────────────────────────────────────────────────────────────────────
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  // ─────────────────────────────────────────────────────────────────────────────
  // TRACKING
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (hasTrackedView.current) return;
    hasTrackedView.current = true;
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculatorSlug: CALCULATOR_SLUG,
        language: locale,
        type: "VIEW",
      }),
    }).catch(console.error);
  }, [locale]);

  const trackCalculation = () => {
    if (hasTrackedCalculation.current) return;
    hasTrackedCalculation.current = true;
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculatorSlug: CALCULATOR_SLUG,
        language: locale,
        type: "CALCULATION",
      }),
    }).catch(console.error);
  };

  const handleInputChange = <T,>(setter: React.Dispatch<React.SetStateAction<T>>, value: T) => {
    setter(value);
    trackCalculation();
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // FAVORITES
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const res = await fetch("/api/favorites");
        if (res.ok) {
          const data = await res.json();
          setIsFavorite(data.favorites?.some((f: { calculatorSlug: string }) => f.calculatorSlug === CALCULATOR_SLUG));
        }
      } catch {}
    };
    checkFavorite();
  }, []);

  const toggleFavorite = async () => {
    setFavoriteLoading(true);
    try {
      if (isFavorite) {
        await fetch(`/api/favorites?slug=${CALCULATOR_SLUG}`, { method: "DELETE" });
        setIsFavorite(false);
      } else {
        await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            calculatorSlug: CALCULATOR_SLUG,
            calculatorName: CALCULATOR_NAME,
            category: CALCULATOR_CATEGORY,
          }),
        });
        setIsFavorite(true);
      }
    } catch {}
    setFavoriteLoading(false);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // CALCULATIONS
  // ─────────────────────────────────────────────────────────────────────────────
  
  let result = 0;
  let resultLabel = "";
  let resultUnit = "";
  let explanation = "";

  switch (calculationMode) {
    case "whatIsXPercentOfY":
      // What is X% of Y?
      result = valueY * (valueX / 100);
      resultLabel = `${valueX}% of ${valueY}`;
      resultUnit = "";
      explanation = `${valueY} × ${valueX / 100} = ${result.toFixed(4)}`;
      break;
      
    case "xIsWhatPercentOfY":
      // X is what % of Y?
      result = valueY !== 0 ? (valueX / valueY) * 100 : 0;
      resultLabel = `${valueX} is this % of ${valueY}`;
      resultUnit = "%";
      explanation = `(${valueX} ÷ ${valueY}) × 100 = ${result.toFixed(4)}%`;
      break;
      
    case "xIsYPercentOfWhat":
      // X is Y% of what?
      result = valueX !== 0 && valueY !== 0 ? valueX / (valueY / 100) : 0;
      resultLabel = `${valueX} is ${valueY}% of`;
      resultUnit = "";
      explanation = `${valueX} ÷ ${valueY / 100} = ${result.toFixed(4)}`;
      break;
      
    case "percentChange":
      // % change from old to new
      result = oldValue !== 0 ? ((newValue - oldValue) / Math.abs(oldValue)) * 100 : 0;
      resultLabel = result >= 0 ? "Increase" : "Decrease";
      resultUnit = "%";
      explanation = `((${newValue} - ${oldValue}) ÷ |${oldValue}|) × 100 = ${result.toFixed(4)}%`;
      break;
      
    case "increaseByPercent":
      // X increased by Y%
      result = valueX * (1 + valueY / 100);
      resultLabel = `${valueX} increased by ${valueY}%`;
      resultUnit = "";
      explanation = `${valueX} × (1 + ${valueY / 100}) = ${result.toFixed(4)}`;
      break;
      
    case "decreaseByPercent":
      // X decreased by Y%
      result = valueX * (1 - valueY / 100);
      resultLabel = `${valueX} decreased by ${valueY}%`;
      resultUnit = "";
      explanation = `${valueX} × (1 - ${valueY / 100}) = ${result.toFixed(4)}`;
      break;
  }

  // Format result
  const formattedResult = Number.isInteger(result) ? result.toString() : result.toFixed(2);

  // ─────────────────────────────────────────────────────────────────────────────
  // SAVE TO HISTORY
  // ─────────────────────────────────────────────────────────────────────────────
  const saveToHistory = async () => {
    if (!session?.user) return;
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          calculatorSlug: CALCULATOR_SLUG,
          calculatorName: CALCULATOR_NAME,
          inputs: {
            mode: CALCULATION_MODES[calculationMode].label,
            values: calculationMode === "percentChange" 
              ? `Old: ${oldValue}, New: ${newValue}`
              : `X: ${valueX}, Y: ${valueY}`,
          },
          results: {
            result: `${formattedResult}${resultUnit}`,
            formula: explanation,
          },
        }),
      });
      if (res.ok) {
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2000);
      } else {
        setSaveStatus("error");
      }
    } catch {
      setSaveStatus("error");
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // FAQs
  // ─────────────────────────────────────────────────────────────────────────────
  const defaultFaqs = [
    {
      question: "How do I calculate a percentage of a number?",
      answer: "Multiply the number by the percentage divided by 100. For example, 25% of 200 = 200 × (25/100) = 200 × 0.25 = 50."
    },
    {
      question: "What is the formula for percentage change?",
      answer: "Percentage Change = ((New Value - Old Value) / |Old Value|) × 100. A positive result means increase, negative means decrease. For example, from 100 to 125: ((125-100)/100) × 100 = 25% increase."
    },
    {
      question: "How do I find what percentage one number is of another?",
      answer: "Divide the first number by the second, then multiply by 100. For example, 30 is what % of 150? (30/150) × 100 = 20%."
    },
    {
      question: "How do I calculate the original price before a discount?",
      answer: "Use the formula: Original = Sale Price / (1 - Discount/100). For example, if something costs $80 after 20% off: $80 / 0.80 = $100 original price."
    },
    {
      question: "What's the difference between percentage and percentage points?",
      answer: "Percentage is relative, percentage points are absolute. If something goes from 10% to 15%, that's a 5 percentage point increase, but a 50% relative increase (5/10 × 100)."
    },
    {
      question: "How do I convert a fraction to a percentage?",
      answer: "Divide the numerator by the denominator, then multiply by 100. For example, 3/4 = 0.75 × 100 = 75%."
    },
  ];
  const faqs = translations?.faq || defaultFaqs;

  // ─────────────────────────────────────────────────────────────────────────────
  // SIDEBAR CALCULATORS
  // ─────────────────────────────────────────────────────────────────────────────
  const everydayCalcs = ["Tip", "Discount", "Age", "Date", "Unit Converter", "Fuel Cost"];
  const financeCalcs = ["Mortgage", "Loan", "Compound Interest", "Auto Loan", "Savings", "Credit Card Payoff"];

  // =============================================================================
  // RENDER
  // =============================================================================
  return (
    <>
      <Header />

      {/* Schema.org FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }}
      />

      <main id="main-content" className="min-h-screen bg-white pt-16">
        {/* ─────────────────────────────────────────────────────────────────────────
            HERO SECTION
        ───────────────────────────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-4 md:py-6">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-600 mb-6">
              <Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <span className="text-slate-400" aria-hidden="true">/</span>
              <Link href={`/${locale}/calculators`} className="hover:text-blue-600 transition-colors">
                Calculators
              </Link>
              <span className="text-slate-400" aria-hidden="true">/</span>
              <span className="text-slate-900 font-medium" aria-current="page">Percentage Calculator</span>
            </nav>

            {/* Title */}
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl"
                role="img"
                aria-label="Percentage Calculator icon"
              >
                %
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Percentage Calculator</h1>
                <p className="text-slate-600 mt-1">Calculate percentages, increases, decreases, and more</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────────────
            CALCULATOR SECTION
        ───────────────────────────────────────────────────────────────────────── */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* ═══════════════════════════════════════════════════════════════════
                  LEFT COLUMN - INPUTS
              ═══════════════════════════════════════════════════════════════════ */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Choose Calculation</h2>
                  <button
                    onClick={toggleFavorite}
                    disabled={favoriteLoading}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    aria-pressed={isFavorite}
                  >
                    {isFavorite ? (
                      <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Calculation Mode Selection */}
                <div className="mb-6">
                  <label id="calc-mode-label" className="block font-medium text-slate-700 mb-2">
                    Calculation Type
                  </label>
                  <div role="radiogroup" aria-labelledby="calc-mode-label" className="grid grid-cols-2 gap-2">
                    {(Object.entries(CALCULATION_MODES) as [CalculationMode, typeof CALCULATION_MODES[CalculationMode]][]).map(([key, val]) => (
                      <button
                        key={key}
                        onClick={() => handleInputChange(setCalculationMode, key)}
                        role="radio"
                        aria-checked={calculationMode === key}
                        className={`p-3 rounded-xl border text-left transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          calculationMode === key
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span className="text-lg mr-2">{val.icon}</span>
                        <span className="font-medium text-slate-800 text-sm">{val.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 my-6"></div>

                {/* Dynamic Description */}
                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <p className="text-blue-800 font-medium">{CALCULATION_MODES[calculationMode].description}</p>
                  <p className="text-blue-600 text-sm mt-1 font-mono">{CALCULATION_MODES[calculationMode].formula}</p>
                </div>

                {/* Dynamic Inputs based on mode */}
                {calculationMode === "percentChange" ? (
                  <>
                    {/* Old Value */}
                    <div className="mb-6">
                      <label htmlFor="old-value" className="block font-medium text-slate-700 mb-2">
                        Old Value (From)
                      </label>
                      <input
                        id="old-value"
                        type="number"
                        step="any"
                        value={oldValue}
                        onChange={(e) => handleInputChange(setOldValue, parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 text-xl font-bold text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>

                    {/* New Value */}
                    <div className="mb-6">
                      <label htmlFor="new-value" className="block font-medium text-slate-700 mb-2">
                        New Value (To)
                      </label>
                      <input
                        id="new-value"
                        type="number"
                        step="any"
                        value={newValue}
                        onChange={(e) => handleInputChange(setNewValue, parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 text-xl font-bold text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Value X */}
                    <div className="mb-6">
                      <label htmlFor="value-x" className="block font-medium text-slate-700 mb-2">
                        {calculationMode === "whatIsXPercentOfY" ? "Percentage (X)" :
                         calculationMode === "xIsWhatPercentOfY" ? "Value (X)" :
                         calculationMode === "xIsYPercentOfWhat" ? "Value (X)" :
                         "Value (X)"}
                      </label>
                      <div className="relative">
                        <input
                          id="value-x"
                          type="number"
                          step="any"
                          value={valueX}
                          onChange={(e) => handleInputChange(setValueX, parseFloat(e.target.value) || 0)}
                          className="w-full px-4 py-3 text-xl font-bold text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        {calculationMode === "whatIsXPercentOfY" && (
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 text-lg">%</span>
                        )}
                      </div>
                    </div>

                    {/* Value Y */}
                    <div className="mb-6">
                      <label htmlFor="value-y" className="block font-medium text-slate-700 mb-2">
                        {calculationMode === "whatIsXPercentOfY" ? "Number (Y)" :
                         calculationMode === "xIsWhatPercentOfY" ? "Total (Y)" :
                         calculationMode === "xIsYPercentOfWhat" ? "Percentage (Y)" :
                         "Percentage (Y)"}
                      </label>
                      <div className="relative">
                        <input
                          id="value-y"
                          type="number"
                          step="any"
                          value={valueY}
                          onChange={(e) => handleInputChange(setValueY, parseFloat(e.target.value) || 0)}
                          className="w-full px-4 py-3 text-xl font-bold text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        {(calculationMode === "xIsYPercentOfWhat" || calculationMode === "increaseByPercent" || calculationMode === "decreaseByPercent") && (
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 text-lg">%</span>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Quick Percentage Buttons (for applicable modes) */}
                {(calculationMode === "whatIsXPercentOfY" || calculationMode === "increaseByPercent" || calculationMode === "decreaseByPercent") && (
                  <div className="mb-6">
                    <label className="block font-medium text-slate-700 mb-2">Quick Select</label>
                    <div className="flex flex-wrap gap-2">
                      {[5, 10, 15, 20, 25, 50, 75, 100].map((pct) => (
                        <button
                          key={pct}
                          onClick={() => handleInputChange(calculationMode === "whatIsXPercentOfY" ? setValueX : setValueY, pct)}
                          className={`py-2 px-3 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            (calculationMode === "whatIsXPercentOfY" ? valueX : valueY) === pct
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {pct}%
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ═══════════════════════════════════════════════════════════════════
                  RIGHT COLUMN - RESULTS
              ═══════════════════════════════════════════════════════════════════ */}
              <div>
                {/* Main Result */}
                <div 
                  className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4"
                  role="region"
                  aria-label="Percentage Calculator Results"
                  aria-live="polite"
                >
                  <p className="text-sm text-slate-600 mb-1">{resultLabel}</p>
                  <p className="text-4xl md:text-5xl font-bold text-slate-900">
                    {formattedResult}{resultUnit}
                  </p>
                  
                  {/* Calculation Steps */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 mt-4">
                    <h4 className="font-medium text-slate-700 mb-2">Calculation</h4>
                    <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                      {explanation}
                    </div>
                  </div>

                  {/* Visual for percent change */}
                  {calculationMode === "percentChange" && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-600">From {oldValue}</span>
                        <span className={`font-bold ${result >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {result >= 0 ? "+" : ""}{formattedResult}%
                        </span>
                        <span className="text-slate-600">To {newValue}</span>
                      </div>
                      <div className="relative h-4 bg-slate-200 rounded-full overflow-hidden">
                        {result >= 0 ? (
                          <div 
                            className="absolute h-full bg-green-500 left-1/2"
                            style={{ width: `${Math.min(50, Math.abs(result) / 2)}%` }}
                          />
                        ) : (
                          <div 
                            className="absolute h-full bg-red-500 right-1/2"
                            style={{ width: `${Math.min(50, Math.abs(result) / 2)}%` }}
                          />
                        )}
                        <div className="absolute h-full w-0.5 bg-slate-400 left-1/2 -translate-x-1/2" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Related Calculations */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">🔄 Quick Conversions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-600">As Decimal</p>
                      <p className="text-lg font-bold text-blue-600">
                        {calculationMode === "xIsWhatPercentOfY" || calculationMode === "percentChange"
                          ? (result / 100).toFixed(4)
                          : (result).toFixed(4)}
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-600">As Fraction</p>
                      <p className="text-lg font-bold text-blue-600">
                        {calculationMode === "xIsWhatPercentOfY" || calculationMode === "percentChange"
                          ? `${result.toFixed(0)}/100`
                          : `${result.toFixed(0)}/1`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Common Percentages Reference */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">📋 Common Percentages</h3>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    {[
                      { pct: "10%", decimal: "0.1", fraction: "1/10" },
                      { pct: "20%", decimal: "0.2", fraction: "1/5" },
                      { pct: "25%", decimal: "0.25", fraction: "1/4" },
                      { pct: "33.3%", decimal: "0.333", fraction: "1/3" },
                      { pct: "50%", decimal: "0.5", fraction: "1/2" },
                      { pct: "75%", decimal: "0.75", fraction: "3/4" },
                    ].map((item) => (
                      <div key={item.pct} className="bg-slate-50 rounded-lg p-2 text-center">
                        <p className="font-bold text-blue-600">{item.pct}</p>
                        <p className="text-xs text-slate-600">{item.decimal} = {item.fraction}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Export Buttons */}
                <div className={`grid ${session?.user ? "grid-cols-3" : "grid-cols-2"} gap-3`}>
                  {session?.user && (
                    <button
                      onClick={saveToHistory}
                      disabled={saveStatus === "saving"}
                      className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {saveStatus === "saving" ? <>⏳ Saving...</> : saveStatus === "saved" ? <>✅ Saved!</> : <>💾 Save</>}
                    </button>
                  )}
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700 transition-colors">
                    📄 PDF <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">PRO</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700 transition-colors">
                    📊 Excel <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">PRO</span>
                  </button>
                </div>
              </div>
            </div>

            {/* AdBlock Bottom */}
            <div className="mt-8">
              <AdBlock slot="calculator-bottom" />
            </div>

            {/* ═══════════════════════════════════════════════════════════════════
                INFO CARDS
            ═══════════════════════════════════════════════════════════════════ */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">📐 Percentage Formulas</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>X% of Y:</strong> Y × (X / 100)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>X is what % of Y:</strong> (X / Y) × 100</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>% Change:</strong> ((New - Old) / Old) × 100</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Increase:</strong> Value × (1 + %/100)</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">💡 Quick Tips</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>10% = move decimal one place left</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>50% = divide by 2</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>25% = divide by 4</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>To find 15%: find 10% + half of that</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────────────
            EXAMPLE CALCULATION
        ───────────────────────────────────────────────────────────────────────── */}
        <section className="bg-slate-50 py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">📊 Example Calculations</h2>
            <p className="text-slate-600 mb-6">
              Common percentage scenarios
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">What is 25% of 80?</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>80 × (25 / 100)</p>
                  <p>= 80 × 0.25</p>
                  <p className="font-bold text-blue-600 mt-2">= 20</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">15 is what % of 60?</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>(15 / 60) × 100</p>
                  <p>= 0.25 × 100</p>
                  <p className="font-bold text-blue-600 mt-2">= 25%</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">% change: 50 to 75</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>((75 - 50) / 50) × 100</p>
                  <p>= (25 / 50) × 100</p>
                  <p className="font-bold text-blue-600 mt-2">= 50% increase</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────────────
            EDUCATIONAL CONTENT + SIDEBAR
        ───────────────────────────────────────────────────────────────────────── */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content - 2 columns */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding Percentages</h2>
                  <p className="text-slate-600 mb-4">
                    A percentage is a way of expressing a number as a fraction of 100. The word &quot;percent&quot; comes from the Latin &quot;per centum,&quot; meaning &quot;by the hundred.&quot; Percentages are used everywhere: discounts, taxes, grades, statistics, and financial calculations.
                  </p>
                  <p className="text-slate-600">
                    Our calculator supports six different calculation modes to handle any percentage scenario you encounter. Whether you&apos;re calculating tips, analyzing data changes, or figuring out discounts, there&apos;s a mode designed for your specific need.
                  </p>
                </div>

                {/* FAQ Section */}
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <details key={index} className="group">
                        <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-slate-50 rounded-xl hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                          <svg className="w-5 h-5 text-slate-600 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <p className="text-slate-600 p-4 pt-2">{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <AdBlock slot="calculator-sidebar" />

                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-sm">🧮</span>
                    Everyday Calculators
                  </h3>
                  <div className="space-y-2">
                    {everydayCalcs.map((calc) => (
                      <Link key={calc} href={`/${locale}/${calc.toLowerCase().replace(/ /g, "-")}-calculator`} className="block text-blue-600 hover:text-blue-800 hover:underline text-sm">
                        {calc} Calculator
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">💰</span>
                    Financial Calculators
                  </h3>
                  <div className="space-y-2">
                    {financeCalcs.map((calc) => (
                      <Link key={calc} href={`/${locale}/${calc.toLowerCase().replace(/ /g, "-")}-calculator`} className="block text-blue-600 hover:text-blue-800 hover:underline text-sm">
                        {calc} Calculator
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                  <h3 className="font-bold mb-2">🏷️ Calculate Discounts</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Apply percentage discounts and see your savings instantly.
                  </p>
                  <Link href={`/${locale}/discount-calculator`} className="inline-block bg-white text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                    Try Discount Calculator →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
