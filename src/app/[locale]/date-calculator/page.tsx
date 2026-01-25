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
const CALCULATOR_SLUG = "date-calculator";
const CALCULATOR_NAME = "Date Calculator";
const CALCULATOR_CATEGORY = "everyday";

// =============================================================================
// TYPES
// =============================================================================
type CalculationMode = "addSubtract" | "difference" | "businessDays" | "countdown";

// =============================================================================
// US FEDERAL HOLIDAYS (2024-2026)
// =============================================================================
const US_HOLIDAYS: Record<number, string[]> = {
  2024: ["2024-01-01", "2024-01-15", "2024-02-19", "2024-05-27", "2024-06-19", "2024-07-04", "2024-09-02", "2024-10-14", "2024-11-11", "2024-11-28", "2024-12-25"],
  2025: ["2025-01-01", "2025-01-20", "2025-02-17", "2025-05-26", "2025-06-19", "2025-07-04", "2025-09-01", "2025-10-13", "2025-11-11", "2025-11-27", "2025-12-25"],
  2026: ["2026-01-01", "2026-01-19", "2026-02-16", "2026-05-25", "2026-06-19", "2026-07-03", "2026-09-07", "2026-10-12", "2026-11-11", "2026-11-26", "2026-12-25"],
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function DateCalculatorPage() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - Inputs
  // ─────────────────────────────────────────────────────────────────────────────
  const [calculationMode, setCalculationMode] = useState<CalculationMode>("addSubtract");
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]);
  
  // Add/Subtract inputs
  const [yearsToAdd, setYearsToAdd] = useState(0);
  const [monthsToAdd, setMonthsToAdd] = useState(0);
  const [weeksToAdd, setWeeksToAdd] = useState(0);
  const [daysToAdd, setDaysToAdd] = useState(30);
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  
  // Business days
  const [excludeWeekends, setExcludeWeekends] = useState(true);
  const [excludeHolidays, setExcludeHolidays] = useState(false);
  const [businessDaysToAdd, setBusinessDaysToAdd] = useState(10);

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
  // HELPER FUNCTIONS
  // ─────────────────────────────────────────────────────────────────────────────
  
  const isWeekend = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isHoliday = (date: Date): boolean => {
    const year = date.getFullYear();
    const dateStr = date.toISOString().split("T")[0];
    return US_HOLIDAYS[year]?.includes(dateStr) || false;
  };

  const addBusinessDays = (start: Date, days: number): Date => {
    let current = new Date(start);
    let added = 0;
    const direction = days >= 0 ? 1 : -1;
    const absDays = Math.abs(days);
    
    while (added < absDays) {
      current.setDate(current.getDate() + direction);
      if (!isWeekend(current) && (!excludeHolidays || !isHoliday(current))) {
        added++;
      }
    }
    return current;
  };

  const countBusinessDays = (start: Date, end: Date): number => {
    let count = 0;
    const current = new Date(start);
    const direction = end >= start ? 1 : -1;
    
    while ((direction > 0 && current < end) || (direction < 0 && current > end)) {
      current.setDate(current.getDate() + direction);
      if (!isWeekend(current) && (!excludeHolidays || !isHoliday(current))) {
        count++;
      }
    }
    return count;
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // CALCULATIONS
  // ─────────────────────────────────────────────────────────────────────────────
  
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  let resultDate = new Date(start);
  let daysDiff = 0;
  let weeksDiff = 0;
  let monthsDiff = 0;
  let yearsDiff = 0;
  let businessDaysDiff = 0;

  // Calculate based on mode
  if (calculationMode === "addSubtract") {
    const totalDays = (yearsToAdd * 365) + (monthsToAdd * 30) + (weeksToAdd * 7) + daysToAdd;
    resultDate = new Date(start);
    
    if (operation === "add") {
      resultDate.setFullYear(resultDate.getFullYear() + yearsToAdd);
      resultDate.setMonth(resultDate.getMonth() + monthsToAdd);
      resultDate.setDate(resultDate.getDate() + (weeksToAdd * 7) + daysToAdd);
    } else {
      resultDate.setFullYear(resultDate.getFullYear() - yearsToAdd);
      resultDate.setMonth(resultDate.getMonth() - monthsToAdd);
      resultDate.setDate(resultDate.getDate() - (weeksToAdd * 7) - daysToAdd);
    }
    
    daysDiff = Math.abs(Math.floor((resultDate.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    
  } else if (calculationMode === "difference" || calculationMode === "countdown") {
    const targetEnd = calculationMode === "countdown" ? end : end;
    daysDiff = Math.floor((targetEnd.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    weeksDiff = Math.floor(daysDiff / 7);
    
    // Calculate years/months/days difference
    let tempDate = new Date(start);
    yearsDiff = targetEnd.getFullYear() - start.getFullYear();
    monthsDiff = targetEnd.getMonth() - start.getMonth();
    let dayRemainder = targetEnd.getDate() - start.getDate();
    
    if (dayRemainder < 0) {
      monthsDiff--;
      const prevMonth = new Date(targetEnd.getFullYear(), targetEnd.getMonth(), 0);
      dayRemainder += prevMonth.getDate();
    }
    
    if (monthsDiff < 0) {
      yearsDiff--;
      monthsDiff += 12;
    }
    
    resultDate = targetEnd;
    businessDaysDiff = countBusinessDays(start, targetEnd);
    
  } else if (calculationMode === "businessDays") {
    resultDate = addBusinessDays(start, operation === "subtract" ? -businessDaysToAdd : businessDaysToAdd);
    daysDiff = Math.abs(Math.floor((resultDate.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    businessDaysDiff = businessDaysToAdd;
  }

  // Day of the week for result
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const resultDayOfWeek = daysOfWeek[resultDate.getDay()];

  // Countdown to today (for countdown mode)
  const daysFromToday = Math.floor((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const weeksFromToday = Math.floor(daysFromToday / 7);
  const hoursFromToday = Math.floor((end.getTime() - today.getTime()) / (1000 * 60 * 60));

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
            mode: calculationMode,
            startDate,
            ...(calculationMode === "addSubtract" ? { daysToAdd: daysToAdd.toString() } : { endDate }),
          },
          results: {
            resultDate: resultDate.toISOString().split("T")[0],
            daysDifference: daysDiff.toString(),
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
      question: "How are business days calculated?",
      answer: "Business days exclude weekends (Saturday and Sunday) by default. You can also exclude US federal holidays. For example, 10 business days from a Monday would be 2 weeks later on a Monday (excluding weekends)."
    },
    {
      question: "Does this calculator account for leap years?",
      answer: "Yes! Our calculator automatically accounts for leap years when calculating dates. February 29th is handled correctly in all date calculations."
    },
    {
      question: "What holidays are excluded in business day calculations?",
      answer: "When enabled, we exclude US federal holidays: New Year's Day, MLK Day, Presidents Day, Memorial Day, Juneteenth, Independence Day, Labor Day, Columbus Day, Veterans Day, Thanksgiving, and Christmas."
    },
    {
      question: "How do I calculate a deadline from today?",
      answer: "Use the 'Add/Subtract' mode with today's date as the start. Enter the number of days (or weeks/months) until your deadline. For work deadlines, use 'Business Days' mode to exclude weekends."
    },
    {
      question: "Can I calculate the difference between two dates?",
      answer: "Yes! Use the 'Date Difference' mode. Enter your start and end dates, and we'll show you the difference in years, months, days, weeks, and even business days."
    },
    {
      question: "How does month calculation work when dates don't exist?",
      answer: "If you add 1 month to January 31st, you'd get February 28th (or 29th in leap years) since February doesn't have 31 days. The calculator adjusts to the last valid day of the month."
    },
  ];
  const faqs = translations?.faq || defaultFaqs;

  // ─────────────────────────────────────────────────────────────────────────────
  // SIDEBAR CALCULATORS
  // ─────────────────────────────────────────────────────────────────────────────
  const everydayCalcs = ["Tip", "Discount", "Percentage", "Age", "Unit Converter", "Fuel Cost"];
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
              <span className="text-slate-900 font-medium" aria-current="page">Date Calculator</span>
            </nav>

            {/* Title */}
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl"
                role="img"
                aria-label="Date Calculator icon"
              >
                📅
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Date Calculator</h1>
                <p className="text-slate-600 mt-1">Add days, calculate differences, and find business days</p>
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
                  <h2 className="text-xl font-bold text-slate-900">Date Settings</h2>
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

                {/* Calculation Mode */}
                <div className="mb-6">
                  <label id="calc-mode-label" className="block font-medium text-slate-700 mb-2">
                    Calculation Mode
                  </label>
                  <div role="radiogroup" aria-labelledby="calc-mode-label" className="grid grid-cols-2 gap-2">
                    {[
                      { key: "addSubtract", label: "Add/Subtract", icon: "➕" },
                      { key: "difference", label: "Date Difference", icon: "📊" },
                      { key: "businessDays", label: "Business Days", icon: "💼" },
                      { key: "countdown", label: "Countdown", icon: "⏰" },
                    ].map(({ key, label, icon }) => (
                      <button
                        key={key}
                        onClick={() => handleInputChange(setCalculationMode, key as CalculationMode)}
                        role="radio"
                        aria-checked={calculationMode === key}
                        className={`p-3 rounded-xl border text-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          calculationMode === key
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span className="text-xl block">{icon}</span>
                        <span className="text-xs font-medium text-slate-700">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 my-6"></div>

                {/* Start Date */}
                <div className="mb-6">
                  <label htmlFor="start-date" className="block font-medium text-slate-700 mb-2">
                    {calculationMode === "countdown" ? "Today" : "Start Date"}
                  </label>
                  <input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => handleInputChange(setStartDate, e.target.value)}
                    className="w-full px-4 py-3 text-lg border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={() => handleInputChange(setStartDate, new Date().toISOString().split("T")[0])}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    Set to today
                  </button>
                </div>

                {/* Mode-specific inputs */}
                {calculationMode === "addSubtract" && (
                  <>
                    {/* Operation Toggle */}
                    <div className="mb-6">
                      <label id="operation-label" className="block font-medium text-slate-700 mb-2">
                        Operation
                      </label>
                      <div role="radiogroup" aria-labelledby="operation-label" className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleInputChange(setOperation, "add")}
                          role="radio"
                          aria-checked={operation === "add"}
                          className={`py-3 px-4 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            operation === "add"
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          ➕ Add
                        </button>
                        <button
                          onClick={() => handleInputChange(setOperation, "subtract")}
                          role="radio"
                          aria-checked={operation === "subtract"}
                          className={`py-3 px-4 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            operation === "subtract"
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          ➖ Subtract
                        </button>
                      </div>
                    </div>

                    {/* Time units */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="years" className="block text-sm font-medium text-slate-700 mb-1">Years</label>
                        <input
                          id="years"
                          type="number"
                          min="0"
                          value={yearsToAdd}
                          onChange={(e) => handleInputChange(setYearsToAdd, Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="months" className="block text-sm font-medium text-slate-700 mb-1">Months</label>
                        <input
                          id="months"
                          type="number"
                          min="0"
                          value={monthsToAdd}
                          onChange={(e) => handleInputChange(setMonthsToAdd, Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="weeks" className="block text-sm font-medium text-slate-700 mb-1">Weeks</label>
                        <input
                          id="weeks"
                          type="number"
                          min="0"
                          value={weeksToAdd}
                          onChange={(e) => handleInputChange(setWeeksToAdd, Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="days" className="block text-sm font-medium text-slate-700 mb-1">Days</label>
                        <input
                          id="days"
                          type="number"
                          min="0"
                          value={daysToAdd}
                          onChange={(e) => handleInputChange(setDaysToAdd, Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </>
                )}

                {(calculationMode === "difference" || calculationMode === "countdown") && (
                  <div className="mb-6">
                    <label htmlFor="end-date" className="block font-medium text-slate-700 mb-2">
                      {calculationMode === "countdown" ? "Target Date" : "End Date"}
                    </label>
                    <input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={(e) => handleInputChange(setEndDate, e.target.value)}
                      className="w-full px-4 py-3 text-lg border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}

                {calculationMode === "businessDays" && (
                  <>
                    {/* Operation Toggle */}
                    <div className="mb-6">
                      <label id="biz-operation-label" className="block font-medium text-slate-700 mb-2">
                        Operation
                      </label>
                      <div role="radiogroup" aria-labelledby="biz-operation-label" className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleInputChange(setOperation, "add")}
                          role="radio"
                          aria-checked={operation === "add"}
                          className={`py-3 px-4 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            operation === "add"
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          ➕ Add
                        </button>
                        <button
                          onClick={() => handleInputChange(setOperation, "subtract")}
                          role="radio"
                          aria-checked={operation === "subtract"}
                          className={`py-3 px-4 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            operation === "subtract"
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          ➖ Subtract
                        </button>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="biz-days" className="block font-medium text-slate-700 mb-2">
                        Business Days
                      </label>
                      <input
                        id="biz-days"
                        type="number"
                        min="1"
                        value={businessDaysToAdd}
                        onChange={(e) => handleInputChange(setBusinessDaysToAdd, Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full px-4 py-3 text-xl font-bold text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Options */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                        <span className="font-medium text-slate-700">Exclude Weekends</span>
                        <button
                          onClick={() => handleInputChange(setExcludeWeekends, !excludeWeekends)}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            excludeWeekends ? "bg-blue-600" : "bg-slate-300"
                          }`}
                          role="switch"
                          aria-checked={excludeWeekends}
                        >
                          <span
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              excludeWeekends ? "translate-x-7" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                        <div>
                          <span className="font-medium text-slate-700">Exclude US Holidays</span>
                          <p className="text-xs text-slate-600">Federal holidays only</p>
                        </div>
                        <button
                          onClick={() => handleInputChange(setExcludeHolidays, !excludeHolidays)}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            excludeHolidays ? "bg-blue-600" : "bg-slate-300"
                          }`}
                          role="switch"
                          aria-checked={excludeHolidays}
                        >
                          <span
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              excludeHolidays ? "translate-x-7" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </>
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
                  aria-label="Date Calculator Results"
                  aria-live="polite"
                >
                  {(calculationMode === "addSubtract" || calculationMode === "businessDays") && (
                    <>
                      <p className="text-sm text-slate-600 mb-1">Result Date</p>
                      <p className="text-3xl md:text-4xl font-bold text-slate-900">
                        {resultDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                      </p>
                      <p className="text-blue-600 font-medium mt-2">
                        {daysDiff.toLocaleString()} calendar days {operation === "add" ? "later" : "earlier"}
                      </p>
                    </>
                  )}

                  {(calculationMode === "difference" || calculationMode === "countdown") && (
                    <>
                      <p className="text-sm text-slate-600 mb-1">
                        {calculationMode === "countdown" ? "Days Until" : "Time Between Dates"}
                      </p>
                      <p className="text-4xl md:text-5xl font-bold text-slate-900">
                        {Math.abs(daysDiff).toLocaleString()} <span className="text-2xl text-slate-600">days</span>
                      </p>
                      {yearsDiff > 0 && (
                        <p className="text-xl text-blue-600 font-medium mt-1">
                          {yearsDiff} years, {monthsDiff} months, {daysDiff % 30} days
                        </p>
                      )}
                    </>
                  )}
                  
                  {/* Additional Info */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">From</span>
                      <span className="font-medium text-slate-800">{start.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">To</span>
                      <span className="font-medium text-blue-600">{resultDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Day of Week</span>
                      <span className="font-medium text-slate-800">{resultDayOfWeek}</span>
                    </div>
                  </div>
                </div>

                {/* Countdown Display (for countdown mode) */}
                {calculationMode === "countdown" && daysFromToday > 0 && (
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 mb-4 text-white">
                    <h3 className="font-bold mb-4">⏰ Countdown</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-3xl font-bold">{daysFromToday}</p>
                        <p className="text-blue-100 text-sm">Days</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold">{weeksFromToday}</p>
                        <p className="text-blue-100 text-sm">Weeks</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold">{hoursFromToday.toLocaleString()}</p>
                        <p className="text-blue-100 text-sm">Hours</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Time Breakdown */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">📊 Time Breakdown</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-2xl font-bold text-blue-600">{Math.abs(daysDiff).toLocaleString()}</p>
                      <p className="text-xs text-slate-600">Total Days</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-2xl font-bold text-blue-600">{Math.floor(Math.abs(daysDiff) / 7).toLocaleString()}</p>
                      <p className="text-xs text-slate-600">Weeks</p>
                    </div>
                    {calculationMode === "difference" && (
                      <div className="bg-slate-50 rounded-lg p-3">
                        <p className="text-2xl font-bold text-blue-600">{businessDaysDiff.toLocaleString()}</p>
                        <p className="text-xs text-slate-600">Business Days</p>
                      </div>
                    )}
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-2xl font-bold text-blue-600">{(Math.abs(daysDiff) * 24).toLocaleString()}</p>
                      <p className="text-xs text-slate-600">Hours</p>
                    </div>
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
                <h3 className="text-lg font-bold text-slate-900 mb-4">📅 Common Use Cases</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Deadlines:</strong> Add business days for work projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Contracts:</strong> Calculate end dates from start</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Events:</strong> Countdown to special occasions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Warranties:</strong> Track expiration dates</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">💼 Business Days Info</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>5 business days = 1 work week</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>10 business days = 2 work weeks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>~22 business days = 1 month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>~261 business days = 1 year</span>
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
              Add 10 business days to January 15, 2025 (Wednesday)
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Calendar Days Calculation</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>Start: Wednesday, Jan 15</p>
                  <p>10 business days = 2 weeks</p>
                  <p>Skip 2 weekends (4 days)</p>
                  <p className="font-bold text-blue-600 mt-2">Result: Friday, Jan 29</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Total Calendar Days</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>10 business days</p>
                  <p>+ 4 weekend days</p>
                  <p className="font-bold text-blue-600 mt-2">= 14 calendar days total</p>
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding Date Calculations</h2>
                  <p className="text-slate-600 mb-4">
                    Date calculations are essential for planning, scheduling, and tracking deadlines. Whether you&apos;re calculating project timelines, determining age differences, or counting down to special events, understanding how dates work is crucial.
                  </p>
                  <p className="text-slate-600">
                    Our calculator handles the complexities of varying month lengths, leap years, and business day conventions. Business days typically exclude weekends, and optionally holidays, making them ideal for work-related deadline calculations.
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
                  <h3 className="font-bold mb-2">🎂 Calculate Your Age</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Find your exact age in years, months, and days.
                  </p>
                  <Link href={`/${locale}/age-calculator`} className="inline-block bg-white text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                    Try Age Calculator →
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
