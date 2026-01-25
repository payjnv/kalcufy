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
const CALCULATOR_SLUG = "cd-calculator";
const CALCULATOR_NAME = "CD Calculator";
const CALCULATOR_CATEGORY = "finance";

// =============================================================================
// TYPES
// =============================================================================
type CompoundingFrequency = "daily" | "monthly" | "quarterly" | "annually";

interface CDTerm {
  months: number;
  label: string;
  shortLabel: string;
}

// =============================================================================
// CD TERMS
// =============================================================================
const CD_TERMS: CDTerm[] = [
  { months: 3, label: "3 Months", shortLabel: "3mo" },
  { months: 6, label: "6 Months", shortLabel: "6mo" },
  { months: 12, label: "1 Year", shortLabel: "1yr" },
  { months: 18, label: "18 Months", shortLabel: "18mo" },
  { months: 24, label: "2 Years", shortLabel: "2yr" },
  { months: 36, label: "3 Years", shortLabel: "3yr" },
  { months: 48, label: "4 Years", shortLabel: "4yr" },
  { months: 60, label: "5 Years", shortLabel: "5yr" },
];

// =============================================================================
// COMPOUNDING OPTIONS
// =============================================================================
const COMPOUNDING_OPTIONS: { value: CompoundingFrequency; label: string; periodsPerYear: number }[] = [
  { value: "daily", label: "Daily (365x/year)", periodsPerYear: 365 },
  { value: "monthly", label: "Monthly (12x/year)", periodsPerYear: 12 },
  { value: "quarterly", label: "Quarterly (4x/year)", periodsPerYear: 4 },
  { value: "annually", label: "Annually (1x/year)", periodsPerYear: 1 },
];

// =============================================================================
// SAMPLE CD RATES (for comparison)
// =============================================================================
const SAMPLE_RATES = [
  { term: "3-month", rate: 4.50 },
  { term: "6-month", rate: 4.75 },
  { term: "1-year", rate: 5.00 },
  { term: "2-year", rate: 4.50 },
  { term: "3-year", rate: 4.25 },
  { term: "5-year", rate: 4.00 },
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function CDCalculatorPage() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - Inputs
  // ─────────────────────────────────────────────────────────────────────────────
  const [initialDeposit, setInitialDeposit] = useState(10000);
  const [apy, setApy] = useState(5.0);
  const [termMonths, setTermMonths] = useState(12);
  const [compounding, setCompounding] = useState<CompoundingFrequency>("daily");

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - Advanced
  // ─────────────────────────────────────────────────────────────────────────────
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [taxRate, setTaxRate] = useState(0);
  const [inflationRate, setInflationRate] = useState(3.0);

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
  
  const compoundingPeriods = COMPOUNDING_OPTIONS.find((c) => c.value === compounding)?.periodsPerYear || 365;
  const termYears = termMonths / 12;
  
  // Calculate final balance with compound interest
  // A = P(1 + r/n)^(nt)
  const calculateFinalBalance = (): number => {
    const r = apy / 100;
    const n = compoundingPeriods;
    const t = termYears;
    return initialDeposit * Math.pow(1 + r / n, n * t);
  };
  
  const finalBalance = calculateFinalBalance();
  const totalInterest = finalBalance - initialDeposit;
  
  // APY vs APR - APY already accounts for compounding, so actual earnings depend on frequency
  // For simplicity, we're using APY directly
  
  // After-tax interest
  const taxableInterest = totalInterest;
  const taxOwed = taxableInterest * (taxRate / 100);
  const afterTaxInterest = totalInterest - taxOwed;
  const afterTaxBalance = initialDeposit + afterTaxInterest;
  
  // Inflation-adjusted value
  const inflationMultiplier = Math.pow(1 + inflationRate / 100, termYears);
  const inflationAdjustedBalance = finalBalance / inflationMultiplier;
  const realReturn = inflationAdjustedBalance - initialDeposit;
  
  // Monthly interest breakdown
  const monthlyInterestAvg = totalInterest / termMonths;
  
  // Calculate growth by period for chart
  const calculateGrowthSchedule = () => {
    const schedule = [];
    const monthlyRate = apy / 100 / 12;
    let balance = initialDeposit;
    
    for (let month = 0; month <= termMonths; month++) {
      schedule.push({
        month,
        balance: Math.round(balance * 100) / 100,
        interest: Math.round((balance - initialDeposit) * 100) / 100,
      });
      balance = balance * (1 + monthlyRate);
    }
    
    return schedule;
  };
  
  const growthSchedule = calculateGrowthSchedule();
  
  // Maturity date
  const maturityDate = new Date();
  maturityDate.setMonth(maturityDate.getMonth() + termMonths);

  // Compare different terms
  const termComparison = CD_TERMS.map((term) => {
    const r = apy / 100;
    const n = compoundingPeriods;
    const t = term.months / 12;
    const balance = initialDeposit * Math.pow(1 + r / n, n * t);
    return {
      ...term,
      balance,
      interest: balance - initialDeposit,
    };
  });

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
            initialDeposit,
            apy,
            termMonths,
            compounding,
          },
          results: {
            finalBalance: formatCurrency(finalBalance),
            totalInterest: formatCurrency(totalInterest),
            maturityDate: formatDate(maturityDate),
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
  // FORMATTING
  // ─────────────────────────────────────────────────────────────────────────────
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // FAQs
  // ─────────────────────────────────────────────────────────────────────────────
  const defaultFaqs = [
    {
      question: "What is a Certificate of Deposit (CD)?",
      answer: "A CD is a savings product where you deposit money for a fixed term (3 months to 5+ years) at a guaranteed interest rate. In exchange for locking up your money, you typically earn higher interest than regular savings accounts. CDs are FDIC insured up to $250,000."
    },
    {
      question: "What's the difference between APY and APR?",
      answer: "APY (Annual Percentage Yield) includes the effect of compounding interest, while APR (Annual Percentage Rate) is the simple interest rate without compounding. For CDs, always look at the APY—it shows what you'll actually earn. A higher compounding frequency means slightly more earnings."
    },
    {
      question: "What happens if I withdraw early from a CD?",
      answer: "Early withdrawal typically incurs a penalty, usually 3-12 months of interest depending on the CD term. For short-term CDs (under 1 year), the penalty is usually 3 months of interest. For longer terms, it can be 6-12 months. Some banks offer no-penalty CDs with lower rates."
    },
    {
      question: "Are CDs a good investment?",
      answer: "CDs are low-risk savings vehicles, not investments. They're ideal for money you won't need for a specific period and want to keep safe. They're not designed to beat inflation long-term but offer guaranteed returns and FDIC insurance. Consider CDs for emergency funds, short-term goals, or the conservative portion of your portfolio."
    },
    {
      question: "What is a CD ladder?",
      answer: "A CD ladder is a strategy where you split your money across multiple CDs with different maturity dates. For example, put $10,000 into 1-year, 2-year, 3-year, 4-year, and 5-year CDs. As each matures, reinvest in a new 5-year CD. This provides regular access to funds while capturing higher long-term rates."
    },
    {
      question: "Is CD interest taxable?",
      answer: "Yes, CD interest is taxable as ordinary income in the year it's earned (even if you don't withdraw it). You'll receive a 1099-INT from the bank if you earn $10 or more in interest. Consider this when comparing CDs to tax-advantaged accounts like IRAs."
    },
  ];
  const faqs = translations?.faq || defaultFaqs;

  // ─────────────────────────────────────────────────────────────────────────────
  // SIDEBAR CALCULATORS
  // ─────────────────────────────────────────────────────────────────────────────
  const financeCalcs = ["Savings", "Compound Interest", "Emergency Fund", "Net Worth", "Retirement", "Inflation"];
  const healthCalcs = ["BMI", "Calorie", "BMR", "TDEE", "Body Fat", "Macro"];

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
              <span className="text-slate-900 font-medium" aria-current="page">CD Calculator</span>
            </nav>

            {/* Title */}
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl"
                role="img"
                aria-label="CD Calculator icon"
              >
                💿
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">CD Calculator</h1>
                <p className="text-slate-600 mt-1">Calculate Certificate of Deposit earnings and compare terms</p>
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
                  <h2 className="text-xl font-bold text-slate-900">CD Details</h2>
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

                {/* Initial Deposit */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="initial-deposit" className="font-medium text-slate-700">
                      Initial Deposit
                    </label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-400 mr-1">$</span>
                      <input
                        id="initial-deposit"
                        type="number"
                        min="0"
                        value={initialDeposit || ""}
                        onChange={(e) => handleInputChange(setInitialDeposit, Number(e.target.value) || 0)}
                        className="w-28 bg-transparent text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="250000"
                    step="500"
                    value={initialDeposit}
                    onChange={(e) => handleInputChange(setInitialDeposit, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    aria-label="Initial deposit slider"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>$500</span>
                    <span>$250,000</span>
                  </div>
                </div>

                {/* APY */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="apy" className="font-medium text-slate-700">
                      Annual Percentage Yield (APY)
                    </label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        id="apy"
                        type="number"
                        min="0"
                        max="15"
                        step="0.01"
                        value={apy || ""}
                        onChange={(e) => handleInputChange(setApy, Number(e.target.value) || 0)}
                        className="w-16 bg-transparent text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-slate-600 ml-1">%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="8"
                    step="0.05"
                    value={apy}
                    onChange={(e) => handleInputChange(setApy, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    aria-label="APY slider"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>0%</span>
                    <span>8%</span>
                  </div>
                </div>

                {/* Term */}
                <div className="mb-6">
                  <label id="term-label" className="block font-medium text-slate-700 mb-3">
                    CD Term
                  </label>
                  <div 
                    role="radiogroup" 
                    aria-labelledby="term-label" 
                    className="grid grid-cols-4 gap-2"
                  >
                    {CD_TERMS.map((term) => (
                      <button
                        key={term.months}
                        onClick={() => handleInputChange(setTermMonths, term.months)}
                        role="radio"
                        aria-checked={termMonths === term.months}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          termMonths === term.months
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {term.shortLabel}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 my-6"></div>

                {/* Compounding Frequency */}
                <div className="mb-6">
                  <label id="compounding-label" className="block font-medium text-slate-700 mb-2">
                    Compounding Frequency
                  </label>
                  <div 
                    role="radiogroup" 
                    aria-labelledby="compounding-label" 
                    className="space-y-2"
                  >
                    {COMPOUNDING_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleInputChange(setCompounding, option.value)}
                        role="radio"
                        aria-checked={compounding === option.value}
                        className={`w-full text-left p-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          compounding === option.value
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span className="font-medium text-slate-800">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* ═══════════════════════════════════════════════════════════════════
                    ADVANCED OPTIONS
                ═══════════════════════════════════════════════════════════════════ */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors focus:outline-none"
                    aria-expanded={showAdvanced}
                    aria-controls="advanced-options"
                  >
                    <span className="font-medium text-slate-700">Advanced Options</span>
                    <svg
                      className={`w-5 h-5 text-slate-600 transition-transform ${showAdvanced ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showAdvanced && (
                    <div id="advanced-options" className="p-4 space-y-4 bg-white">
                      {/* Tax Rate */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label htmlFor="tax-rate" className="font-medium text-slate-700">
                            Marginal Tax Rate
                          </label>
                          <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                            <input
                              id="tax-rate"
                              type="number"
                              min="0"
                              max="50"
                              step="1"
                              value={taxRate}
                              onChange={(e) => setTaxRate(Number(e.target.value) || 0)}
                              className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                            />
                            <span className="text-slate-600 ml-1">%</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600">
                          CD interest is taxed as ordinary income
                        </p>
                      </div>
                      
                      {/* Inflation Rate */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label htmlFor="inflation-rate" className="font-medium text-slate-700">
                            Expected Inflation Rate
                          </label>
                          <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                            <input
                              id="inflation-rate"
                              type="number"
                              min="0"
                              max="15"
                              step="0.1"
                              value={inflationRate}
                              onChange={(e) => setInflationRate(Number(e.target.value) || 0)}
                              className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                            />
                            <span className="text-slate-600 ml-1">%</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600">
                          Historical average: ~3% per year
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ═══════════════════════════════════════════════════════════════════
                  RIGHT COLUMN - RESULTS
              ═══════════════════════════════════════════════════════════════════ */}
              <div>
                {/* Primary Result Card */}
                <div className="bg-green-50 rounded-2xl border border-green-200 p-6 mb-4">
                  <p className="text-sm font-medium text-slate-600 mb-1">Balance at Maturity</p>
                  <p className="text-5xl font-bold text-green-700">
                    {formatCurrency(finalBalance)}
                  </p>
                  
                  {/* Summary */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Initial Deposit</span>
                      <span className="font-medium text-slate-800">{formatCurrency(initialDeposit)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Total Interest Earned</span>
                      <span className="font-bold text-green-600">+{formatCurrency(totalInterest)}</span>
                    </div>
                    <div className="border-t border-slate-200 mt-2 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-800">Final Balance</span>
                        <span className="font-bold text-green-600">{formatCurrency(finalBalance)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Maturity Date Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">📅 CD Timeline</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-sm text-slate-600">Term Length</p>
                      <p className="text-xl font-bold text-slate-800">
                        {termMonths < 12 ? `${termMonths} months` : `${termMonths / 12} year${termMonths > 12 ? "s" : ""}`}
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-sm text-slate-600">Maturity Date</p>
                      <p className="text-lg font-bold text-slate-800">{formatDate(maturityDate)}</p>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      💰 You&apos;ll earn approximately <span className="font-bold">{formatCurrency(monthlyInterestAvg)}</span> per month in interest
                    </p>
                  </div>
                </div>

                {/* After Tax & Inflation (if enabled) */}
                {(taxRate > 0 || inflationRate > 0) && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                    <h3 className="font-bold text-slate-900 mb-4">📊 Real Returns</h3>
                    
                    {taxRate > 0 && (
                      <div className="p-4 bg-amber-50 rounded-xl mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-amber-800">Tax on Interest ({taxRate}%)</span>
                          <span className="font-medium text-amber-800">-{formatCurrency(taxOwed)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-amber-800">After-Tax Balance</span>
                          <span className="font-bold text-amber-800">{formatCurrency(afterTaxBalance)}</span>
                        </div>
                      </div>
                    )}
                    
                    {inflationRate > 0 && (
                      <div className="p-4 bg-slate-50 rounded-xl">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-slate-600">Inflation-Adjusted Value</span>
                          <span className="font-medium text-slate-700">{formatCurrency(inflationAdjustedBalance)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Real Return</span>
                          <span className={`font-bold ${realReturn >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {realReturn >= 0 ? "+" : ""}{formatCurrency(realReturn)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Term Comparison */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">🔄 Compare All Terms</h3>
                  <div className="space-y-2">
                    {termComparison.map((term) => (
                      <div 
                        key={term.months} 
                        className={`flex items-center justify-between p-3 rounded-xl ${
                          term.months === termMonths ? "bg-blue-50 border border-blue-200" : "bg-slate-50"
                        }`}
                      >
                        <span className={`font-medium ${term.months === termMonths ? "text-blue-700" : "text-slate-700"}`}>
                          {term.label}
                        </span>
                        <div className="text-right">
                          <p className={`font-bold ${term.months === termMonths ? "text-blue-600" : "text-slate-800"}`}>
                            {formatCurrency(term.balance)}
                          </p>
                          <p className="text-xs text-green-600">+{formatCurrency(term.interest)}</p>
                        </div>
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
                      aria-label="Save calculation to history"
                    >
                      {saveStatus === "saving" ? (
                        <>⏳ Saving...</>
                      ) : saveStatus === "saved" ? (
                        <>✅ Saved!</>
                      ) : (
                        <>💾 Save</>
                      )}
                    </button>
                  )}
                  <button 
                    className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Export to PDF (PRO feature)"
                  >
                    📄 PDF <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">PRO</span>
                  </button>
                  <button 
                    className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Export to Excel (PRO feature)"
                  >
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
                <h3 className="text-lg font-bold text-slate-900 mb-4">📊 Typical CD Rates</h3>
                <div className="space-y-3">
                  {SAMPLE_RATES.map((rate) => (
                    <div key={rate.term} className="flex justify-between items-center">
                      <span className="text-slate-700">{rate.term} CD</span>
                      <span className="font-medium text-blue-600">{rate.rate.toFixed(2)}% APY</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-600 mt-3">*Rates are examples and vary by institution</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">💡 Quick Tips</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>CDs are FDIC insured up to $250,000</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Compare APY, not APR, when shopping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Consider a CD ladder for flexibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Interest is taxable as ordinary income</span>
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
            <h2 className="text-2xl font-bold text-slate-900 mb-4">📊 Example Calculation</h2>
            <p className="text-slate-600 mb-6">
              $10,000 deposit at 5.00% APY for 12 months with daily compounding
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Compound Interest Formula</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>A = P(1 + r/n)^(nt)</p>
                  <p className="mt-2">P = $10,000 (principal)</p>
                  <p>r = 0.05 (5% as decimal)</p>
                  <p>n = 365 (daily compounding)</p>
                  <p>t = 1 (year)</p>
                  <p className="font-bold text-blue-600 mt-2 border-t pt-2">A = $10,512.67</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Results Breakdown</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>Initial Deposit: $10,000.00</p>
                  <p>Interest Earned: $512.67</p>
                  <p>Final Balance: $10,512.67</p>
                  <p className="mt-2">Monthly interest: ~$42.72</p>
                  <p className="font-bold text-blue-600 mt-2 border-t pt-2">Effective yield: 5.13%</p>
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
                {/* What is a CD */}
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">What is a Certificate of Deposit?</h2>
                  <p className="text-slate-600 mb-4">
                    A Certificate of Deposit (CD) is a time-based savings account that pays a fixed interest rate for a specific period, called the term. Unlike regular savings accounts, you agree not to withdraw funds until the maturity date. In exchange for this commitment, banks typically offer higher interest rates than standard savings accounts.
                  </p>
                  <p className="text-slate-600">
                    CDs are one of the safest ways to grow your money because they&apos;re FDIC insured up to $250,000 per depositor, per institution. They&apos;re ideal for money you won&apos;t need for a specific period—whether that&apos;s 3 months or 5 years. The trade-off is reduced liquidity: early withdrawals typically incur penalties.
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
                          <svg
                            className="w-5 h-5 text-slate-600 group-open:rotate-180 transition-transform flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <p className="text-slate-600 p-4 pt-2">{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar - 1 column */}
              <div className="space-y-6">
                {/* AdBlock Sidebar */}
                <AdBlock slot="calculator-sidebar" />

                {/* Related Finance Calculators */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm" aria-hidden="true">💰</span>
                    Financial Calculators
                  </h3>
                  <nav aria-label="Related financial calculators">
                    <div className="space-y-2">
                      {financeCalcs.map((calc) => (
                        <Link
                          key={calc}
                          href={`/${locale}/${calc.toLowerCase().replace(/ /g, "-")}-calculator`}
                          className="block text-blue-600 hover:text-blue-800 hover:underline text-sm"
                        >
                          {calc} Calculator
                        </Link>
                      ))}
                    </div>
                  </nav>
                </div>

                {/* Related Health Calculators */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-sm" aria-hidden="true">💪</span>
                    Health Calculators
                  </h3>
                  <nav aria-label="Related health calculators">
                    <div className="space-y-2">
                      {healthCalcs.map((calc) => (
                        <Link
                          key={calc}
                          href={`/${locale}/${calc.toLowerCase().replace(/ /g, "-")}-calculator`}
                          className="block text-blue-600 hover:text-blue-800 hover:underline text-sm"
                        >
                          {calc} Calculator
                        </Link>
                      ))}
                    </div>
                  </nav>
                </div>

                {/* Quick Link to Related Calculator */}
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                  <h3 className="font-bold mb-2">🛡️ Build Your Emergency Fund</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    CDs are great for emergency funds. Calculate how much you need with our Emergency Fund Calculator.
                  </p>
                  <Link
                    href={`/${locale}/emergency-fund-calculator`}
                    className="inline-block bg-white text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Try Emergency Fund Calculator →
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
