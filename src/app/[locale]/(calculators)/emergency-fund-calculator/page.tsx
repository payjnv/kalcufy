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
const CALCULATOR_SLUG = "emergency-fund-calculator";
const CALCULATOR_NAME = "Emergency Fund Calculator";
const CALCULATOR_CATEGORY = "finance";

// =============================================================================
// TYPES
// =============================================================================
type CoverageMonths = 3 | 6 | 9 | 12;

interface ExpenseCategory {
  id: string;
  label: string;
  icon: string;
  defaultValue: number;
  description: string;
}

// =============================================================================
// EXPENSE CATEGORIES
// =============================================================================
const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  { id: "housing", label: "Housing", icon: "🏠", defaultValue: 1500, description: "Rent or mortgage payment" },
  { id: "utilities", label: "Utilities", icon: "💡", defaultValue: 200, description: "Electric, gas, water, internet" },
  { id: "food", label: "Food & Groceries", icon: "🛒", defaultValue: 400, description: "Essential groceries only" },
  { id: "transportation", label: "Transportation", icon: "🚗", defaultValue: 300, description: "Car payment, gas, insurance" },
  { id: "insurance", label: "Insurance", icon: "🛡️", defaultValue: 200, description: "Health, life insurance premiums" },
  { id: "debt", label: "Minimum Debt Payments", icon: "💳", defaultValue: 150, description: "Credit cards, loans minimums" },
  { id: "childcare", label: "Childcare", icon: "👶", defaultValue: 0, description: "Daycare, childcare costs" },
  { id: "medical", label: "Medical & Prescriptions", icon: "💊", defaultValue: 50, description: "Regular medications, copays" },
  { id: "other", label: "Other Essential", icon: "📦", defaultValue: 100, description: "Phone, other necessities" },
];

// =============================================================================
// COVERAGE RECOMMENDATIONS
// =============================================================================
const COVERAGE_OPTIONS: { months: CoverageMonths; label: string; description: string; recommended: string }[] = [
  { months: 3, label: "3 Months", description: "Minimum recommended", recommended: "Dual income, stable jobs" },
  { months: 6, label: "6 Months", description: "Standard recommendation", recommended: "Most households" },
  { months: 9, label: "9 Months", description: "Extra security", recommended: "Single income, variable pay" },
  { months: 12, label: "12 Months", description: "Maximum protection", recommended: "Self-employed, freelancers" },
];

// =============================================================================
// MILESTONES
// =============================================================================
const MILESTONES = [
  { amount: 500, label: "Starter Fund", description: "Cover minor emergencies" },
  { amount: 1000, label: "First Goal", description: "Handle most unexpected expenses" },
  { amount: 2500, label: "Buffer Built", description: "One month of basic expenses" },
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function EmergencyFundCalculatorPage() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - Expenses
  // ─────────────────────────────────────────────────────────────────────────────
  const [expenses, setExpenses] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    EXPENSE_CATEGORIES.forEach((cat) => {
      initial[cat.id] = cat.defaultValue;
    });
    return initial;
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - Savings
  // ─────────────────────────────────────────────────────────────────────────────
  const [currentSavings, setCurrentSavings] = useState(2000);
  const [monthlySavings, setMonthlySavings] = useState(300);
  const [savingsRate, setSavingsRate] = useState(4.5); // APY for high-yield savings
  const [coverageMonths, setCoverageMonths] = useState<CoverageMonths>(6);

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - UI
  // ─────────────────────────────────────────────────────────────────────────────
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [favoriteLoading, setFavoriteLoading] = useState<boolean>(false);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [useQuickEstimate, setUseQuickEstimate] = useState<boolean>(false);
  const [quickMonthlyExpenses, setQuickMonthlyExpenses] = useState(3000);

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
  // INPUT HANDLERS
  // ─────────────────────────────────────────────────────────────────────────────
  const handleExpenseChange = (id: string, value: number) => {
    setExpenses((prev) => ({ ...prev, [id]: value }));
    trackCalculation();
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // CALCULATIONS
  // ─────────────────────────────────────────────────────────────────────────────
  
  // Total Monthly Expenses
  const totalMonthlyExpenses = useQuickEstimate 
    ? quickMonthlyExpenses 
    : Object.values(expenses).reduce((sum, val) => sum + val, 0);
  
  // Emergency Fund Goals
  const goal3Months = totalMonthlyExpenses * 3;
  const goal6Months = totalMonthlyExpenses * 6;
  const goal9Months = totalMonthlyExpenses * 9;
  const goal12Months = totalMonthlyExpenses * 12;
  
  // Selected Goal
  const selectedGoal = totalMonthlyExpenses * coverageMonths;
  
  // Amount Still Needed
  const amountNeeded = Math.max(0, selectedGoal - currentSavings);
  
  // Progress Percentage
  const progressPercent = selectedGoal > 0 ? Math.min(100, (currentSavings / selectedGoal) * 100) : 0;
  
  // Time to Reach Goal (without interest)
  const monthsToGoalSimple = monthlySavings > 0 ? Math.ceil(amountNeeded / monthlySavings) : Infinity;
  
  // Time to Reach Goal (with interest) - using compound interest formula
  const calculateMonthsWithInterest = (): number => {
    if (amountNeeded <= 0) return 0;
    if (monthlySavings <= 0) return Infinity;
    
    const monthlyRate = savingsRate / 100 / 12;
    let balance = currentSavings;
    let months = 0;
    const maxMonths = 600; // 50 years max
    
    while (balance < selectedGoal && months < maxMonths) {
      balance = balance * (1 + monthlyRate) + monthlySavings;
      months++;
    }
    
    return months >= maxMonths ? Infinity : months;
  };
  
  const monthsToGoalWithInterest = calculateMonthsWithInterest();
  
  // Interest Earned
  const calculateInterestEarned = (): number => {
    if (monthsToGoalWithInterest === Infinity || monthsToGoalWithInterest === 0) return 0;
    const totalDeposits = currentSavings + (monthlySavings * monthsToGoalWithInterest);
    const finalBalance = Math.min(selectedGoal, currentSavings * Math.pow(1 + savingsRate/100/12, monthsToGoalWithInterest) + 
      monthlySavings * ((Math.pow(1 + savingsRate/100/12, monthsToGoalWithInterest) - 1) / (savingsRate/100/12)));
    return Math.max(0, finalBalance - totalDeposits);
  };
  
  const interestEarned = calculateInterestEarned();
  
  // Target Date
  const getTargetDate = (): string => {
    if (monthsToGoalWithInterest === Infinity) return "N/A";
    if (monthsToGoalWithInterest === 0) return "Already reached!";
    const date = new Date();
    date.setMonth(date.getMonth() + monthsToGoalWithInterest);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

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
            expenses: useQuickEstimate ? { quickEstimate: quickMonthlyExpenses } : expenses,
            currentSavings,
            monthlySavings,
            savingsRate,
            coverageMonths,
          },
          results: {
            totalMonthlyExpenses: formatCurrency(totalMonthlyExpenses),
            selectedGoal: formatCurrency(selectedGoal),
            amountNeeded: formatCurrency(amountNeeded),
            monthsToGoal: monthsToGoalWithInterest,
            targetDate: getTargetDate(),
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
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatMonths = (months: number): string => {
    if (months === Infinity) return "N/A";
    if (months === 0) return "Done!";
    if (months < 12) return `${months} month${months !== 1 ? "s" : ""}`;
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) return `${years} year${years !== 1 ? "s" : ""}`;
    return `${years}y ${remainingMonths}m`;
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // FAQs
  // ─────────────────────────────────────────────────────────────────────────────
  const defaultFaqs = [
    {
      question: "How much should I have in my emergency fund?",
      answer: "Most financial experts recommend 3-6 months of essential expenses. If you have variable income, are self-employed, or have a single household income, aim for 6-12 months. Start with a $1,000 starter fund if you're just beginning."
    },
    {
      question: "What counts as an emergency?",
      answer: "True emergencies include job loss, medical emergencies, urgent home/car repairs, and unexpected necessary travel. Regular expenses, planned purchases, and non-urgent upgrades are NOT emergencies—budget separately for those."
    },
    {
      question: "Where should I keep my emergency fund?",
      answer: "Keep it in a high-yield savings account (HYSA) where it's liquid and accessible within 1-3 days. Don't put it in stocks (too volatile), CDs (early withdrawal penalties), or your checking account (too tempting to spend)."
    },
    {
      question: "Should I pay off debt or build emergency fund first?",
      answer: "Build a $1,000 starter emergency fund first, then focus on high-interest debt. Once high-interest debt is paid, build your full 3-6 month fund. Having some emergency savings prevents going deeper into debt when emergencies happen."
    },
    {
      question: "What if I need to use my emergency fund?",
      answer: "That's what it's for! Use it for true emergencies, then focus on replenishing it. Don't feel guilty about using it properly—that's the whole point of having one."
    },
    {
      question: "Should my emergency fund be separate from other savings?",
      answer: "Yes! Keep your emergency fund in a separate account from your regular savings to avoid accidentally spending it. Many people use a different bank entirely to create a mental barrier."
    },
  ];
  const faqs = translations?.faq || defaultFaqs;

  // ─────────────────────────────────────────────────────────────────────────────
  // SIDEBAR CALCULATORS
  // ─────────────────────────────────────────────────────────────────────────────
  const financeCalcs = ["Savings", "Compound Interest", "Net Worth", "Debt Payoff", "Retirement", "CD"];
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
              <span className="text-slate-900 font-medium" aria-current="page">Emergency Fund Calculator</span>
            </nav>

            {/* Title */}
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl"
                role="img"
                aria-label="Emergency Fund Calculator icon"
              >
                🛡️
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Emergency Fund Calculator</h1>
                <p className="text-slate-600 mt-1">Calculate how much you need to save for emergencies</p>
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
                  <h2 className="text-xl font-bold text-slate-900">Your Expenses</h2>
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

                {/* Quick vs Detailed Toggle */}
                <div className="mb-6">
                  <label className="block font-medium text-slate-700 mb-2">Calculation Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleInputChange(setUseQuickEstimate, false)}
                      className={`py-3 px-4 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        !useQuickEstimate
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Detailed Breakdown
                    </button>
                    <button
                      onClick={() => handleInputChange(setUseQuickEstimate, true)}
                      className={`py-3 px-4 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        useQuickEstimate
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Quick Estimate
                    </button>
                  </div>
                </div>

                {/* Quick Estimate Input */}
                {useQuickEstimate ? (
                  <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                    <label htmlFor="quick-expenses" className="block font-medium text-slate-700 mb-2">
                      Total Monthly Essential Expenses
                    </label>
                    <div className="flex items-center bg-white rounded-lg px-4 py-3 border border-slate-200">
                      <span className="text-slate-400 mr-2">$</span>
                      <input
                        id="quick-expenses"
                        type="number"
                        min="0"
                        value={quickMonthlyExpenses}
                        onChange={(e) => handleInputChange(setQuickMonthlyExpenses, Number(e.target.value) || 0)}
                        className="flex-1 bg-transparent font-bold text-xl text-slate-800 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-slate-600">/month</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2">
                      Include only essential expenses: housing, utilities, food, transportation, insurance, minimum debt payments
                    </p>
                  </div>
                ) : (
                  /* Detailed Expense Categories */
                  <div className="mb-6 space-y-3">
                    {EXPENSE_CATEGORIES.map((category) => (
                      <div key={category.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{category.icon}</span>
                          <div>
                            <label htmlFor={`expense-${category.id}`} className="font-medium text-slate-800 text-sm">
                              {category.label}
                            </label>
                            <p className="text-xs text-slate-600">{category.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center bg-white rounded-lg px-3 py-1.5 border border-slate-200">
                          <span className="text-slate-400 mr-1">$</span>
                          <input
                            id={`expense-${category.id}`}
                            type="number"
                            min="0"
                            value={expenses[category.id] || ""}
                            onChange={(e) => handleExpenseChange(category.id, Number(e.target.value) || 0)}
                            placeholder="0"
                            className="w-20 bg-transparent text-right font-medium text-slate-800 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </div>
                      </div>
                    ))}
                    
                    {/* Total Monthly Expenses */}
                    <div className="p-4 bg-blue-100 rounded-xl flex justify-between items-center">
                      <span className="font-bold text-blue-800">Total Monthly Expenses</span>
                      <span className="text-2xl font-bold text-blue-700">{formatCurrency(totalMonthlyExpenses)}</span>
                    </div>
                  </div>
                )}

                {/* Divider */}
                <div className="border-t border-slate-200 my-6"></div>

                {/* Coverage Months */}
                <div className="mb-6">
                  <label className="block font-medium text-slate-700 mb-2">Months of Coverage</label>
                  <div className="grid grid-cols-2 gap-2">
                    {COVERAGE_OPTIONS.map((option) => (
                      <button
                        key={option.months}
                        onClick={() => handleInputChange(setCoverageMonths, option.months)}
                        className={`p-3 rounded-xl border text-left transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          coverageMonths === option.months
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span className="font-bold text-slate-800">{option.label}</span>
                        <p className="text-xs text-slate-600">{option.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 my-6"></div>

                {/* Current Savings */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="current-savings" className="font-medium text-slate-700">
                      Current Emergency Savings
                    </label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-400 mr-1">$</span>
                      <input
                        id="current-savings"
                        type="number"
                        min="0"
                        value={currentSavings}
                        onChange={(e) => handleInputChange(setCurrentSavings, Number(e.target.value) || 0)}
                        className="w-24 bg-transparent text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={selectedGoal * 1.5}
                    step="100"
                    value={currentSavings}
                    onChange={(e) => handleInputChange(setCurrentSavings, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Monthly Savings */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="monthly-savings" className="font-medium text-slate-700">
                      Monthly Contribution
                    </label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-400 mr-1">$</span>
                      <input
                        id="monthly-savings"
                        type="number"
                        min="0"
                        value={monthlySavings}
                        onChange={(e) => handleInputChange(setMonthlySavings, Number(e.target.value) || 0)}
                        className="w-20 bg-transparent text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-slate-600 ml-1">/mo</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="25"
                    value={monthlySavings}
                    onChange={(e) => handleInputChange(setMonthlySavings, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* ═══════════════════════════════════════════════════════════════════
                    ADVANCED OPTIONS
                ═══════════════════════════════════════════════════════════════════ */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors focus:outline-none"
                    aria-expanded={showAdvanced}
                  >
                    <span className="font-medium text-slate-700">Advanced Options</span>
                    <svg
                      className={`w-5 h-5 text-slate-600 transition-transform ${showAdvanced ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showAdvanced && (
                    <div className="p-4 space-y-4 bg-white">
                      <div>
                        <label htmlFor="savings-rate" className="block font-medium text-slate-700 mb-2">
                          Savings Account APY (%)
                        </label>
                        <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2">
                          <input
                            id="savings-rate"
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            value={savingsRate}
                            onChange={(e) => handleInputChange(setSavingsRate, Number(e.target.value) || 0)}
                            className="w-full bg-transparent font-medium text-slate-800 focus:outline-none"
                          />
                          <span className="text-slate-600 ml-1">%</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          High-yield savings accounts currently offer 4-5% APY
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
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white mb-4">
                  <p className="text-blue-100 text-sm font-medium mb-1">Your {coverageMonths}-Month Goal</p>
                  <p className="text-5xl font-bold">{formatCurrency(selectedGoal)}</p>
                  
                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span className="font-bold">{progressPercent.toFixed(0)}%</span>
                    </div>
                    <div className="h-3 bg-white/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-blue-100 mt-1">
                      <span>{formatCurrency(currentSavings)} saved</span>
                      <span>{formatCurrency(amountNeeded)} to go</span>
                    </div>
                  </div>
                </div>

                {/* Timeline Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">📅 Timeline to Goal</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl text-center">
                      <p className="text-3xl font-bold text-slate-800">{formatMonths(monthsToGoalWithInterest)}</p>
                      <p className="text-sm text-slate-600">Time to Goal</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl text-center">
                      <p className="text-lg font-bold text-slate-800">{getTargetDate()}</p>
                      <p className="text-sm text-slate-600">Target Date</p>
                    </div>
                  </div>

                  {interestEarned > 0 && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-700">
                        💰 You&apos;ll earn approximately <span className="font-bold">{formatCurrency(interestEarned)}</span> in interest along the way!
                      </p>
                    </div>
                  )}
                </div>

                {/* All Goals Comparison */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">🎯 Emergency Fund Tiers</h3>
                  <div className="space-y-3">
                    {[
                      { months: 3, amount: goal3Months },
                      { months: 6, amount: goal6Months },
                      { months: 9, amount: goal9Months },
                      { months: 12, amount: goal12Months },
                    ].map((tier) => {
                      const isSelected = tier.months === coverageMonths;
                      const isReached = currentSavings >= tier.amount;
                      return (
                        <div 
                          key={tier.months}
                          className={`flex items-center justify-between p-3 rounded-xl ${
                            isSelected ? "bg-blue-50 border border-blue-200" : "bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              isReached ? "bg-green-500 text-white" : isSelected ? "bg-blue-500 text-white" : "bg-slate-200 text-slate-600"
                            }`}>
                              {isReached ? "✓" : tier.months}
                            </span>
                            <span className={`font-medium ${isSelected ? "text-blue-700" : "text-slate-700"}`}>
                              {tier.months} Months
                            </span>
                          </div>
                          <span className={`font-bold ${isSelected ? "text-blue-600" : "text-slate-800"}`}>
                            {formatCurrency(tier.amount)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Milestones */}
                {currentSavings < goal3Months && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                    <h3 className="font-bold text-slate-900 mb-4">🏆 Starter Milestones</h3>
                    <div className="space-y-3">
                      {MILESTONES.map((milestone) => {
                        const isReached = currentSavings >= milestone.amount;
                        return (
                          <div key={milestone.amount} className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                              isReached ? "bg-green-500 text-white" : "bg-slate-200 text-slate-600"
                            }`}>
                              {isReached ? "✓" : ""}
                            </span>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <span className={`font-medium ${isReached ? "text-green-700" : "text-slate-700"}`}>
                                  {milestone.label}
                                </span>
                                <span className={`font-bold ${isReached ? "text-green-600" : "text-slate-600"}`}>
                                  {formatCurrency(milestone.amount)}
                                </span>
                              </div>
                              <p className="text-xs text-slate-600">{milestone.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Export Buttons */}
                <div className={`grid ${session?.user ? "grid-cols-3" : "grid-cols-2"} gap-3`}>
                  {session?.user && (
                    <button
                      onClick={saveToHistory}
                      disabled={saveStatus === "saving"}
                      className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <h3 className="text-lg font-bold text-slate-900 mb-4">📊 Who Needs How Much?</h3>
                <div className="space-y-3">
                  {COVERAGE_OPTIONS.map((option) => (
                    <div key={option.months} className="flex justify-between items-center">
                      <div>
                        <span className="text-slate-700 font-medium">{option.label}</span>
                        <p className="text-xs text-slate-600">{option.recommended}</p>
                      </div>
                      <span className="font-medium text-blue-600">{option.description}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">💡 Quick Tips</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Start with $1,000 as your first milestone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Automate transfers to &quot;pay yourself first&quot;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Keep in high-yield savings (4-5% APY)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Use a separate account to avoid temptation</span>
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
              Single income household, $3,500/month essential expenses, goal: 6 months coverage
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Monthly Expenses</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>Housing: $1,500</p>
                  <p>Utilities: $200</p>
                  <p>Food: $500</p>
                  <p>Transportation: $400</p>
                  <p>Insurance: $300</p>
                  <p>Other: $600</p>
                  <p className="font-bold text-blue-600 mt-2 border-t pt-2">Total: $3,500/month</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Emergency Fund Goals</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>3 months: $3,500 × 3 = $10,500</p>
                  <p>6 months: $3,500 × 6 = $21,000</p>
                  <p className="mt-2">Current savings: $5,000</p>
                  <p>Saving $400/month</p>
                  <p className="font-bold text-blue-600 mt-2 border-t pt-2">Time to 6-month goal: ~40 months</p>
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
                {/* Why Emergency Fund Matters */}
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Why You Need an Emergency Fund</h2>
                  <p className="text-slate-600 mb-4">
                    An emergency fund is your financial safety net—money set aside specifically for unexpected expenses or income loss. Without one, a single car repair, medical bill, or job loss can send you spiraling into debt.
                  </p>
                  <p className="text-slate-600">
                    Studies show that 56% of Americans couldn&apos;t cover a $1,000 emergency with savings. Building even a small emergency fund puts you ahead of most people and provides incredible peace of mind. Start small, stay consistent, and watch your safety net grow.
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
                <AdBlock slot="calculator-sidebar" />

                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">💰</span>
                    Financial Calculators
                  </h3>
                  <nav>
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

                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-sm">💪</span>
                    Health Calculators
                  </h3>
                  <nav>
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

                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                  <h3 className="font-bold mb-2">💰 Track Your Net Worth</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    See your complete financial picture with our Net Worth Calculator.
                  </p>
                  <Link
                    href={`/${locale}/net-worth-calculator`}
                    className="inline-block bg-white text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Try Net Worth Calculator →
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
