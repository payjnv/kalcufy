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
const CALCULATOR_SLUG = "net-worth-calculator";
const CALCULATOR_NAME = "Net Worth Calculator";
const CALCULATOR_CATEGORY = "finance";

// =============================================================================
// TYPES
// =============================================================================
interface AssetCategory {
  id: string;
  label: string;
  icon: string;
  items: { id: string; label: string; defaultValue: number }[];
}

interface LiabilityCategory {
  id: string;
  label: string;
  icon: string;
  items: { id: string; label: string; defaultValue: number }[];
}

// =============================================================================
// ASSET CATEGORIES
// =============================================================================
const ASSET_CATEGORIES: AssetCategory[] = [
  {
    id: "cash",
    label: "Cash & Bank Accounts",
    icon: "💵",
    items: [
      { id: "checking", label: "Checking Accounts", defaultValue: 0 },
      { id: "savings", label: "Savings Accounts", defaultValue: 0 },
      { id: "cashOnHand", label: "Cash on Hand", defaultValue: 0 },
      { id: "cds", label: "CDs / Money Market", defaultValue: 0 },
    ],
  },
  {
    id: "investments",
    label: "Investments",
    icon: "📈",
    items: [
      { id: "stocks", label: "Stocks & Bonds", defaultValue: 0 },
      { id: "mutualFunds", label: "Mutual Funds / ETFs", defaultValue: 0 },
      { id: "crypto", label: "Cryptocurrency", defaultValue: 0 },
      { id: "otherInvestments", label: "Other Investments", defaultValue: 0 },
    ],
  },
  {
    id: "retirement",
    label: "Retirement Accounts",
    icon: "👴",
    items: [
      { id: "401k", label: "401(k) / 403(b)", defaultValue: 0 },
      { id: "ira", label: "IRA / Roth IRA", defaultValue: 0 },
      { id: "pension", label: "Pension Value", defaultValue: 0 },
      { id: "otherRetirement", label: "Other Retirement", defaultValue: 0 },
    ],
  },
  {
    id: "realEstate",
    label: "Real Estate",
    icon: "🏠",
    items: [
      { id: "primaryHome", label: "Primary Residence", defaultValue: 0 },
      { id: "rentalProperty", label: "Rental Properties", defaultValue: 0 },
      { id: "land", label: "Land", defaultValue: 0 },
      { id: "otherRealEstate", label: "Other Real Estate", defaultValue: 0 },
    ],
  },
  {
    id: "personal",
    label: "Personal Property",
    icon: "🚗",
    items: [
      { id: "vehicles", label: "Vehicles", defaultValue: 0 },
      { id: "jewelry", label: "Jewelry & Watches", defaultValue: 0 },
      { id: "collectibles", label: "Art & Collectibles", defaultValue: 0 },
      { id: "otherPersonal", label: "Other Valuables", defaultValue: 0 },
    ],
  },
];

// =============================================================================
// LIABILITY CATEGORIES
// =============================================================================
const LIABILITY_CATEGORIES: LiabilityCategory[] = [
  {
    id: "mortgage",
    label: "Mortgage & Home Loans",
    icon: "🏦",
    items: [
      { id: "primaryMortgage", label: "Primary Mortgage", defaultValue: 0 },
      { id: "heloc", label: "Home Equity Loan/HELOC", defaultValue: 0 },
      { id: "otherMortgage", label: "Other Property Loans", defaultValue: 0 },
    ],
  },
  {
    id: "consumer",
    label: "Consumer Debt",
    icon: "💳",
    items: [
      { id: "creditCards", label: "Credit Card Balances", defaultValue: 0 },
      { id: "personalLoans", label: "Personal Loans", defaultValue: 0 },
      { id: "medicalDebt", label: "Medical Debt", defaultValue: 0 },
    ],
  },
  {
    id: "education",
    label: "Education",
    icon: "🎓",
    items: [
      { id: "studentLoans", label: "Student Loans", defaultValue: 0 },
    ],
  },
  {
    id: "vehicle",
    label: "Vehicle Loans",
    icon: "🚙",
    items: [
      { id: "autoLoans", label: "Auto Loans", defaultValue: 0 },
      { id: "boatRv", label: "Boat / RV Loans", defaultValue: 0 },
    ],
  },
  {
    id: "other",
    label: "Other Debt",
    icon: "📋",
    items: [
      { id: "taxDebt", label: "Tax Debt Owed", defaultValue: 0 },
      { id: "businessLoans", label: "Business Loans", defaultValue: 0 },
      { id: "otherDebt", label: "Other Debts", defaultValue: 0 },
    ],
  },
];

// =============================================================================
// NET WORTH BENCHMARKS BY AGE (US Federal Reserve Data)
// =============================================================================
const NET_WORTH_BENCHMARKS = [
  { ageRange: "Under 35", median: 39000, average: 183500 },
  { ageRange: "35-44", median: 135600, average: 549600 },
  { ageRange: "45-54", median: 247200, average: 975800 },
  { ageRange: "55-64", median: 364500, average: 1566900 },
  { ageRange: "65-74", median: 409900, average: 1794600 },
  { ageRange: "75+", median: 335600, average: 1624100 },
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function NetWorthCalculatorPage() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - Assets
  // ─────────────────────────────────────────────────────────────────────────────
  const [assets, setAssets] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    ASSET_CATEGORIES.forEach((cat) => {
      cat.items.forEach((item) => {
        initial[item.id] = item.defaultValue;
      });
    });
    return initial;
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - Liabilities
  // ─────────────────────────────────────────────────────────────────────────────
  const [liabilities, setLiabilities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    LIABILITY_CATEGORIES.forEach((cat) => {
      cat.items.forEach((item) => {
        initial[item.id] = item.defaultValue;
      });
    });
    return initial;
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - User Info for Comparison
  // ─────────────────────────────────────────────────────────────────────────────
  const [age, setAge] = useState(35);

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - UI
  // ─────────────────────────────────────────────────────────────────────────────
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [expandedAssetCategories, setExpandedAssetCategories] = useState<string[]>(["cash"]);
  const [expandedLiabilityCategories, setExpandedLiabilityCategories] = useState<string[]>(["mortgage"]);
  const [showAdvanced, setShowAdvanced] = useState(false);

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
  const handleAssetChange = (id: string, value: number) => {
    setAssets((prev) => ({ ...prev, [id]: value }));
    trackCalculation();
  };

  const handleLiabilityChange = (id: string, value: number) => {
    setLiabilities((prev) => ({ ...prev, [id]: value }));
    trackCalculation();
  };

  const toggleAssetCategory = (categoryId: string) => {
    setExpandedAssetCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((c) => c !== categoryId) : [...prev, categoryId]
    );
  };

  const toggleLiabilityCategory = (categoryId: string) => {
    setExpandedLiabilityCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((c) => c !== categoryId) : [...prev, categoryId]
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // CALCULATIONS
  // ─────────────────────────────────────────────────────────────────────────────
  
  // Total Assets
  const totalAssets = Object.values(assets).reduce((sum, val) => sum + val, 0);
  
  // Total Liabilities
  const totalLiabilities = Object.values(liabilities).reduce((sum, val) => sum + val, 0);
  
  // Net Worth
  const netWorth = totalAssets - totalLiabilities;
  
  // Asset breakdown by category
  const assetsByCategory = ASSET_CATEGORIES.map((cat) => ({
    ...cat,
    total: cat.items.reduce((sum, item) => sum + (assets[item.id] || 0), 0),
  }));
  
  // Liability breakdown by category
  const liabilitiesByCategory = LIABILITY_CATEGORIES.map((cat) => ({
    ...cat,
    total: cat.items.reduce((sum, item) => sum + (liabilities[item.id] || 0), 0),
  }));

  // Debt-to-Asset Ratio
  const debtToAssetRatio = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0;

  // Get benchmark for user's age
  const getBenchmark = () => {
    if (age < 35) return NET_WORTH_BENCHMARKS[0];
    if (age < 45) return NET_WORTH_BENCHMARKS[1];
    if (age < 55) return NET_WORTH_BENCHMARKS[2];
    if (age < 65) return NET_WORTH_BENCHMARKS[3];
    if (age < 75) return NET_WORTH_BENCHMARKS[4];
    return NET_WORTH_BENCHMARKS[5];
  };

  const benchmark = getBenchmark();
  const vsMedian = netWorth - benchmark.median;
  const vsMedianPercent = benchmark.median > 0 ? ((netWorth / benchmark.median) * 100).toFixed(0) : "0";

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
            age,
            assets,
            liabilities,
          },
          results: {
            totalAssets: formatCurrency(totalAssets),
            totalLiabilities: formatCurrency(totalLiabilities),
            netWorth: formatCurrency(netWorth),
            debtToAssetRatio: `${debtToAssetRatio.toFixed(1)}%`,
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

  const formatCompact = (value: number): string => {
    if (Math.abs(value) >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (Math.abs(value) >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return formatCurrency(value);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // FAQs
  // ─────────────────────────────────────────────────────────────────────────────
  const defaultFaqs = [
    {
      question: "What is net worth and why does it matter?",
      answer: "Net worth is the total value of everything you own (assets) minus everything you owe (liabilities). It's the most comprehensive measure of your financial health because it shows your true wealth position, not just income or savings."
    },
    {
      question: "How often should I calculate my net worth?",
      answer: "Financial experts recommend calculating your net worth quarterly or at least annually. Tracking it over time helps you see progress toward your financial goals and identify areas for improvement."
    },
    {
      question: "Is negative net worth bad?",
      answer: "Negative net worth is common, especially for young adults with student loans or new homeowners with large mortgages. The key is to track your progress and ensure your net worth is trending upward over time."
    },
    {
      question: "Should I include my home in net worth calculations?",
      answer: "Yes, you should include your home's current market value as an asset and your remaining mortgage balance as a liability. The difference (your home equity) contributes to your net worth."
    },
    {
      question: "What's a good net worth for my age?",
      answer: "A common rule of thumb is that by age 30, you should have 1x your annual salary saved. By 40, 3x; by 50, 6x; by 60, 8x; and by 67, 10x your salary. However, these are guidelines—what matters most is consistent progress."
    },
    {
      question: "How can I increase my net worth?",
      answer: "Focus on both sides of the equation: increase assets (save more, invest wisely, build equity) and decrease liabilities (pay down debt, avoid new debt, refinance at lower rates). Even small consistent improvements compound over time."
    },
  ];
  const faqs = translations?.faq || defaultFaqs;

  // ─────────────────────────────────────────────────────────────────────────────
  // SIDEBAR CALCULATORS
  // ─────────────────────────────────────────────────────────────────────────────
  const financeCalcs = ["Mortgage", "Loan", "Compound Interest", "Savings", "Retirement", "Debt Payoff"];
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
        {/* ─────────────────────────────────────────────────────────────────────
            HERO SECTION
        ───────────────────────────────────────────────────────────────────── */}
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
              <span className="text-slate-900 font-medium" aria-current="page">Net Worth Calculator</span>
            </nav>

            {/* Title */}
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl"
                role="img"
                aria-label="Net Worth Calculator icon"
              >
                💎
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Net Worth Calculator</h1>
                <p className="text-slate-600 mt-1">Calculate your total assets minus liabilities</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────────
            CALCULATOR SECTION
        ───────────────────────────────────────────────────────────────────── */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* ═══════════════════════════════════════════════════════════════════
                  LEFT COLUMN - INPUTS
              ═══════════════════════════════════════════════════════════════════ */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Your Financial Snapshot</h2>
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

                {/* Age for Comparison */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="age-input" className="font-medium text-slate-700">
                      Your Age <span className="text-slate-400 font-normal">(for comparison)</span>
                    </label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        id="age-input"
                        type="number"
                        min="18"
                        max="100"
                        value={age}
                        onChange={(e) => setAge(Math.max(18, Math.min(100, Number(e.target.value) || 18)))}
                        className="w-16 bg-transparent text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-slate-600 ml-1">years</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="100"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    aria-label="Age slider"
                  />
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 my-6"></div>

                {/* ═══════════════════════════════════════════════════════════════════
                    ASSETS SECTION
                ═══════════════════════════════════════════════════════════════════ */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-sm">📈</span>
                    Assets (What You Own)
                  </h3>
                  
                  <div className="space-y-3">
                    {ASSET_CATEGORIES.map((category) => (
                      <div key={category.id} className="border border-slate-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleAssetCategory(category.id)}
                          className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 transition-colors"
                          aria-expanded={expandedAssetCategories.includes(category.id)}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{category.icon}</span>
                            <span className="font-medium text-slate-800">{category.label}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-green-600">
                              {formatCurrency(assetsByCategory.find((c) => c.id === category.id)?.total || 0)}
                            </span>
                            <svg
                              className={`w-5 h-5 text-slate-600 transition-transform ${expandedAssetCategories.includes(category.id) ? "rotate-180" : ""}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </button>
                        {expandedAssetCategories.includes(category.id) && (
                          <div className="p-4 space-y-3 bg-white">
                            {category.items.map((item) => (
                              <div key={item.id} className="flex items-center justify-between">
                                <label htmlFor={`asset-${item.id}`} className="text-sm text-slate-600">
                                  {item.label}
                                </label>
                                <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1.5">
                                  <span className="text-slate-400 mr-1">$</span>
                                  <input
                                    id={`asset-${item.id}`}
                                    type="number"
                                    min="0"
                                    value={assets[item.id] || ""}
                                    onChange={(e) => handleAssetChange(item.id, Number(e.target.value) || 0)}
                                    placeholder="0"
                                    className="w-24 bg-transparent text-right font-medium text-slate-800 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Total Assets */}
                  <div className="mt-4 p-4 bg-green-100 rounded-xl flex justify-between items-center">
                    <span className="font-bold text-green-800">Total Assets</span>
                    <span className="text-2xl font-bold text-green-700">{formatCurrency(totalAssets)}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 my-6"></div>

                {/* ═══════════════════════════════════════════════════════════════════
                    LIABILITIES SECTION
                ═══════════════════════════════════════════════════════════════════ */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-sm">📉</span>
                    Liabilities (What You Owe)
                  </h3>
                  
                  <div className="space-y-3">
                    {LIABILITY_CATEGORIES.map((category) => (
                      <div key={category.id} className="border border-slate-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleLiabilityCategory(category.id)}
                          className="w-full flex items-center justify-between p-4 bg-red-50 hover:bg-red-100 transition-colors"
                          aria-expanded={expandedLiabilityCategories.includes(category.id)}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{category.icon}</span>
                            <span className="font-medium text-slate-800">{category.label}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-red-600">
                              {formatCurrency(liabilitiesByCategory.find((c) => c.id === category.id)?.total || 0)}
                            </span>
                            <svg
                              className={`w-5 h-5 text-slate-600 transition-transform ${expandedLiabilityCategories.includes(category.id) ? "rotate-180" : ""}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </button>
                        {expandedLiabilityCategories.includes(category.id) && (
                          <div className="p-4 space-y-3 bg-white">
                            {category.items.map((item) => (
                              <div key={item.id} className="flex items-center justify-between">
                                <label htmlFor={`liability-${item.id}`} className="text-sm text-slate-600">
                                  {item.label}
                                </label>
                                <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1.5">
                                  <span className="text-slate-400 mr-1">$</span>
                                  <input
                                    id={`liability-${item.id}`}
                                    type="number"
                                    min="0"
                                    value={liabilities[item.id] || ""}
                                    onChange={(e) => handleLiabilityChange(item.id, Number(e.target.value) || 0)}
                                    placeholder="0"
                                    className="w-24 bg-transparent text-right font-medium text-slate-800 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Total Liabilities */}
                  <div className="mt-4 p-4 bg-red-100 rounded-xl flex justify-between items-center">
                    <span className="font-bold text-red-800">Total Liabilities</span>
                    <span className="text-2xl font-bold text-red-700">{formatCurrency(totalLiabilities)}</span>
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
                      <p className="text-sm text-slate-600">
                        💡 For the most accurate net worth, use current market values for your home and vehicles (not purchase price). 
                        Check sites like Zillow for real estate and Kelley Blue Book for vehicles.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* ═══════════════════════════════════════════════════════════════════
                  RIGHT COLUMN - RESULTS
              ═══════════════════════════════════════════════════════════════════ */}
              <div>
                {/* Primary Result Card */}
                <div className={`rounded-2xl p-6 mb-4 ${netWorth >= 0 ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                  <p className="text-sm font-medium text-slate-600 mb-1">Your Net Worth</p>
                  <p className={`text-5xl font-bold ${netWorth >= 0 ? "text-green-700" : "text-red-600"}`}>
                    {formatCurrency(netWorth)}
                  </p>
                  
                  {/* Status Badge */}
                  <div className="flex items-center gap-2 mt-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${netWorth >= 0 ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                      {netWorth >= 0 ? "✓ Positive Net Worth" : "⚠ Negative Net Worth"}
                    </span>
                  </div>
                  
                  {/* Summary */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Total Assets</span>
                      <span className="font-medium text-green-600">{formatCurrency(totalAssets)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Total Liabilities</span>
                      <span className="font-medium text-red-600">-{formatCurrency(totalLiabilities)}</span>
                    </div>
                    <div className="border-t border-slate-200 mt-2 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-800">Net Worth</span>
                        <span className={`font-bold ${netWorth >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {formatCurrency(netWorth)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comparison Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">📊 How You Compare (Age {benchmark.ageRange})</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-600">US Median Net Worth</span>
                        <span className="font-bold text-slate-800">{formatCurrency(benchmark.median)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Your Net Worth</span>
                        <span className={`font-bold ${netWorth >= benchmark.median ? "text-green-600" : "text-amber-600"}`}>
                          {formatCurrency(netWorth)}
                        </span>
                      </div>
                      <div className="h-3 bg-slate-200 rounded-full mt-3 overflow-hidden relative">
                        {/* Median marker */}
                        <div 
                          className="absolute top-0 bottom-0 w-0.5 bg-slate-500"
                          style={{ left: "50%" }}
                        />
                        {/* Your position */}
                        <div 
                          className={`h-full ${netWorth >= 0 ? "bg-green-500" : "bg-red-500"}`}
                          style={{ 
                            width: `${Math.min(100, Math.max(0, (netWorth / (benchmark.median * 2)) * 100))}%` 
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 mt-1">
                        <span>$0</span>
                        <span>Median</span>
                        <span>{formatCompact(benchmark.median * 2)}</span>
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl ${vsMedian >= 0 ? "bg-green-100" : "bg-amber-100"}`}>
                      <p className={`text-sm ${vsMedian >= 0 ? "text-green-800" : "text-amber-800"}`}>
                        {vsMedian >= 0 ? (
                          <>You&apos;re <span className="font-bold">{formatCurrency(vsMedian)}</span> above the median for your age group ({vsMedianPercent}% of median)</>
                        ) : (
                          <>You&apos;re <span className="font-bold">{formatCurrency(Math.abs(vsMedian))}</span> below the median for your age group</>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Debt-to-Asset Ratio */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">📈 Debt-to-Asset Ratio</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-slate-800">{debtToAssetRatio.toFixed(1)}%</p>
                      <p className="text-sm text-slate-600">of assets owed as debt</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      debtToAssetRatio < 30 
                        ? "bg-green-100 text-green-700" 
                        : debtToAssetRatio < 50 
                        ? "bg-amber-100 text-amber-800"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {debtToAssetRatio < 30 ? "✓ Healthy" : debtToAssetRatio < 50 ? "⚠ Moderate" : "⚠ High"}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-3">
                    A ratio below 30% is generally considered healthy. Below 50% is moderate.
                  </p>
                </div>

                {/* Asset Breakdown */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">💼 Asset Breakdown</h3>
                  <div className="space-y-3">
                    {assetsByCategory
                      .filter((cat) => cat.total > 0)
                      .sort((a, b) => b.total - a.total)
                      .map((cat) => {
                        const percent = totalAssets > 0 ? (cat.total / totalAssets) * 100 : 0;
                        return (
                          <div key={cat.id} className="flex items-center gap-3">
                            <span className="text-lg">{cat.icon}</span>
                            <div className="flex-1">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-700">{cat.label}</span>
                                <span className="font-medium text-slate-900">{formatCurrency(cat.total)}</span>
                              </div>
                              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-green-500" 
                                  style={{ width: `${percent}%` }}
                                />
                              </div>
                            </div>
                            <span className="text-xs text-slate-600 w-12 text-right">{percent.toFixed(0)}%</span>
                          </div>
                        );
                      })}
                    {assetsByCategory.every((cat) => cat.total === 0) && (
                      <p className="text-sm text-slate-600 text-center py-4">Enter your assets to see breakdown</p>
                    )}
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
                <h3 className="text-lg font-bold text-slate-900 mb-4">📊 Net Worth by Age (US Median)</h3>
                <div className="space-y-3">
                  {NET_WORTH_BENCHMARKS.map((b) => (
                    <div key={b.ageRange} className="flex justify-between items-center">
                      <span className="text-slate-700">{b.ageRange}</span>
                      <span className="font-medium text-blue-600">{formatCurrency(b.median)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">💡 Quick Tips</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Track your net worth quarterly to see progress</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Focus on both growing assets AND reducing debt</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Use current market values, not purchase prices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Don&apos;t include income—only what you own/owe</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────────
            EXAMPLE CALCULATION
        ───────────────────────────────────────────────────────────────────── */}
        <section className="bg-slate-50 py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">📊 Example Calculation</h2>
            <p className="text-slate-600 mb-6">
              35-year-old homeowner with retirement savings and a car loan
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Assets</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>Checking & Savings: $15,000</p>
                  <p>401(k): $85,000</p>
                  <p>Home Value: $350,000</p>
                  <p>Car Value: $18,000</p>
                  <p className="font-bold text-green-600 mt-2 border-t pt-2">Total Assets: $468,000</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Liabilities & Net Worth</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>Mortgage: $280,000</p>
                  <p>Car Loan: $12,000</p>
                  <p>Student Loans: $25,000</p>
                  <p className="font-bold text-red-600 mt-2 border-t pt-2">Total Liabilities: $317,000</p>
                  <p className="font-bold text-blue-600 mt-2 border-t pt-2">Net Worth: $151,000</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────────
            EDUCATIONAL CONTENT + SIDEBAR
        ───────────────────────────────────────────────────────────────────── */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content - 2 columns */}
              <div className="lg:col-span-2 space-y-8">
                {/* What is Net Worth */}
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">What is Net Worth?</h2>
                  <p className="text-slate-600 mb-4">
                    Net worth is the single most important number for measuring your financial health. It represents the difference between what you own (assets) and what you owe (liabilities). Unlike income, which shows cash flow, net worth shows your actual wealth—what you&apos;d have left if you sold everything and paid off all debts.
                  </p>
                  <p className="text-slate-600">
                    Tracking your net worth over time is more valuable than any single calculation. Whether you start with negative net worth (common for young adults with student loans) or already have significant assets, the goal is consistent progress. Small improvements compound over time into substantial wealth.
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
                  <h3 className="font-bold mb-2">📈 Plan Your Debt Payoff</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    See how quickly you can become debt-free with our Debt Payoff Calculator using Snowball or Avalanche method.
                  </p>
                  <Link
                    href={`/${locale}/debt-payoff-calculator`}
                    className="inline-block bg-white text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Try Debt Payoff Calculator →
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
