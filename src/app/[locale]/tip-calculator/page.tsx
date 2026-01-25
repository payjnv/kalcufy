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
const CALCULATOR_SLUG = "tip-calculator";
const CALCULATOR_NAME = "Tip Calculator";
const CALCULATOR_CATEGORY = "everyday";

// =============================================================================
// TYPES
// =============================================================================
type TipMode = "percentage" | "custom";
type RoundingOption = "none" | "up" | "down" | "nearest";
type ServiceType = "restaurant" | "delivery" | "taxi" | "salon" | "hotel" | "bar";

// =============================================================================
// TIP PRESETS
// =============================================================================
const TIP_PRESETS = [10, 15, 18, 20, 22, 25];

// =============================================================================
// SERVICE TYPE RECOMMENDATIONS
// =============================================================================
const SERVICE_TYPES: Record<ServiceType, { label: string; icon: string; suggested: number; description: string }> = {
  restaurant: { label: "Restaurant", icon: "🍽️", suggested: 18, description: "Sit-down dining" },
  delivery: { label: "Delivery", icon: "🛵", suggested: 15, description: "Food delivery" },
  taxi: { label: "Taxi/Rideshare", icon: "🚕", suggested: 15, description: "Transportation" },
  salon: { label: "Salon/Spa", icon: "💇", suggested: 20, description: "Hair, nails, massage" },
  hotel: { label: "Hotel", icon: "🏨", suggested: 15, description: "Bellhop, housekeeping" },
  bar: { label: "Bar", icon: "🍺", suggested: 20, description: "Bartender service" },
};

// =============================================================================
// COUNTRY TIPPING GUIDE
// =============================================================================
const COUNTRY_TIPS: Record<string, { percentage: string; notes: string }> = {
  "United States": { percentage: "15-20%", notes: "Expected, servers rely on tips" },
  "Canada": { percentage: "15-20%", notes: "Similar to US customs" },
  "United Kingdom": { percentage: "10-15%", notes: "Optional, check for service charge" },
  "France": { percentage: "5-10%", notes: "Service often included (service compris)" },
  "Germany": { percentage: "5-10%", notes: "Round up or small percentage" },
  "Italy": { percentage: "5-10%", notes: "Coperto may be charged separately" },
  "Spain": { percentage: "5-10%", notes: "Small tips appreciated" },
  "Japan": { percentage: "0%", notes: "Tipping can be offensive" },
  "Australia": { percentage: "0-10%", notes: "Not expected, but appreciated" },
  "Mexico": { percentage: "10-15%", notes: "Expected in tourist areas" },
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function TipCalculatorPage() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - Inputs
  // ─────────────────────────────────────────────────────────────────────────────
  const [billAmount, setBillAmount] = useState(85.50);
  const [tipPercentage, setTipPercentage] = useState(18);
  const [customTipAmount, setCustomTipAmount] = useState(0);
  const [tipMode, setTipMode] = useState<TipMode>("percentage");
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [taxAmount, setTaxAmount] = useState(0);
  const [excludeTax, setExcludeTax] = useState(false);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [rounding, setRounding] = useState<RoundingOption>("none");
  const [serviceType, setServiceType] = useState<ServiceType>("restaurant");

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - UI
  // ─────────────────────────────────────────────────────────────────────────────
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
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
  
  // Calculate tip base (exclude tax if selected)
  const tipBase = excludeTax ? billAmount - taxAmount : billAmount;
  
  // Calculate tip amount
  let tipAmount = 0;
  if (tipMode === "percentage") {
    tipAmount = tipBase * (tipPercentage / 100);
  } else {
    tipAmount = customTipAmount;
  }
  
  // Apply rounding
  const applyRounding = (amount: number): number => {
    switch (rounding) {
      case "up":
        return Math.ceil(amount);
      case "down":
        return Math.floor(amount);
      case "nearest":
        return Math.round(amount);
      default:
        return amount;
    }
  };
  
  const roundedTip = applyRounding(tipAmount);
  
  // Total bill
  const totalBill = billAmount + roundedTip - serviceCharge;
  
  // Per person calculations
  const tipPerPerson = roundedTip / numberOfPeople;
  const totalPerPerson = totalBill / numberOfPeople;
  const billPerPerson = billAmount / numberOfPeople;
  
  // Effective tip percentage
  const effectiveTipPercentage = tipBase > 0 ? (roundedTip / tipBase) * 100 : 0;

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
            billAmount: `$${billAmount.toFixed(2)}`,
            tipPercentage: `${tipPercentage}%`,
            numberOfPeople: numberOfPeople.toString(),
            serviceType: SERVICE_TYPES[serviceType].label,
          },
          results: {
            tipAmount: `$${roundedTip.toFixed(2)}`,
            totalBill: `$${totalBill.toFixed(2)}`,
            perPerson: `$${totalPerPerson.toFixed(2)}`,
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
      question: "How much should I tip at a restaurant?",
      answer: "In the United States, 15-20% is standard for sit-down restaurants. 15% for adequate service, 18% for good service, and 20%+ for excellent service. Always tip on the pre-tax amount."
    },
    {
      question: "Should I tip on tax?",
      answer: "Technically, you should tip on the pre-tax amount since the tax goes to the government, not the server. However, many people tip on the total for simplicity. Our calculator lets you choose either option."
    },
    {
      question: "How do I split the bill fairly?",
      answer: "For equal splits, divide the total (including tip) by the number of people. If people ordered different amounts, consider using our split by item feature or calculate each person's share proportionally."
    },
    {
      question: "What if there's already a service charge?",
      answer: "Service charges are mandatory fees added by the restaurant, usually for large parties. You can still tip additional if service was exceptional, but it's not expected. Check if it goes to servers."
    },
    {
      question: "How much should I tip for delivery?",
      answer: "10-15% or $3-5 minimum for food delivery. Consider tipping more for large orders, bad weather, or if the driver climbed many stairs. App drivers rely heavily on tips."
    },
    {
      question: "Is tipping expected in other countries?",
      answer: "Tipping customs vary widely. In Japan, tipping can be offensive. In Europe, small tips (5-10%) are common. In the US and Canada, 15-20% is expected. Always research local customs when traveling."
    },
  ];
  const faqs = translations?.faq || defaultFaqs;

  // ─────────────────────────────────────────────────────────────────────────────
  // SIDEBAR CALCULATORS
  // ─────────────────────────────────────────────────────────────────────────────
  const everydayCalcs = ["Discount", "Percentage", "Age", "Date", "Unit Converter", "Fuel Cost"];
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
              <span className="text-slate-900 font-medium" aria-current="page">Tip Calculator</span>
            </nav>

            {/* Title */}
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl"
                role="img"
                aria-label="Tip Calculator icon"
              >
                💵
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Tip Calculator</h1>
                <p className="text-slate-600 mt-1">Calculate tips, split bills, and determine per-person amounts</p>
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
                  <h2 className="text-xl font-bold text-slate-900">Bill Details</h2>
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

                {/* Service Type */}
                <div className="mb-6">
                  <label id="service-type-label" className="block font-medium text-slate-700 mb-2">
                    Service Type
                  </label>
                  <div role="radiogroup" aria-labelledby="service-type-label" className="grid grid-cols-3 gap-2">
                    {(Object.entries(SERVICE_TYPES) as [ServiceType, typeof SERVICE_TYPES[ServiceType]][]).slice(0, 6).map(([key, val]) => (
                      <button
                        key={key}
                        onClick={() => {
                          handleInputChange(setServiceType, key);
                          handleInputChange(setTipPercentage, val.suggested);
                        }}
                        role="radio"
                        aria-checked={serviceType === key}
                        className={`p-3 rounded-xl border text-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          serviceType === key
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span className="text-xl block">{val.icon}</span>
                        <span className="text-xs font-medium text-slate-700">{val.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bill Amount */}
                <div className="mb-6">
                  <label htmlFor="bill-amount" className="block font-medium text-slate-700 mb-2">
                    Bill Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-lg">$</span>
                    <input
                      id="bill-amount"
                      type="number"
                      min="0"
                      step="0.01"
                      value={billAmount}
                      onChange={(e) => handleInputChange(setBillAmount, Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full pl-10 pr-4 py-3 text-2xl font-bold text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>

                {/* Tip Percentage */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="tip-percentage" className="font-medium text-slate-700">Tip Percentage</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        id="tip-percentage"
                        type="number"
                        min="0"
                        max="100"
                        value={tipPercentage}
                        onChange={(e) => handleInputChange(setTipPercentage, Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                        className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-slate-600 ml-1">%</span>
                    </div>
                  </div>
                  
                  {/* Tip Presets */}
                  <div className="grid grid-cols-6 gap-2 mb-3">
                    {TIP_PRESETS.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => handleInputChange(setTipPercentage, preset)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          tipPercentage === preset
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {preset}%
                      </button>
                    ))}
                  </div>
                  
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={tipPercentage}
                    onChange={(e) => handleInputChange(setTipPercentage, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    aria-label="Tip percentage slider"
                  />
                </div>

                {/* Split Bill */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="num-people" className="font-medium text-slate-700">Split Between</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        id="num-people"
                        type="number"
                        min="1"
                        max="50"
                        value={numberOfPeople}
                        onChange={(e) => handleInputChange(setNumberOfPeople, Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
                        className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-slate-600 ml-1">people</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={numberOfPeople}
                    onChange={(e) => handleInputChange(setNumberOfPeople, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    aria-label="Number of people slider"
                  />
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 my-6"></div>

                {/* Advanced Options Toggle */}
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center justify-between w-full p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
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

                {/* Advanced Options */}
                {showAdvanced && (
                  <div className="mt-4 space-y-4">
                    {/* Exclude Tax */}
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <div>
                        <span className="font-medium text-slate-700">Tip on Pre-Tax Amount</span>
                        <p className="text-xs text-slate-600">Exclude tax from tip calculation</p>
                      </div>
                      <button
                        onClick={() => handleInputChange(setExcludeTax, !excludeTax)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          excludeTax ? "bg-blue-600" : "bg-slate-300"
                        }`}
                        role="switch"
                        aria-checked={excludeTax}
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                            excludeTax ? "translate-x-7" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Tax Amount (only shown if exclude tax is enabled) */}
                    {excludeTax && (
                      <div>
                        <label htmlFor="tax-amount" className="block font-medium text-slate-700 mb-2">
                          Tax Amount
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">$</span>
                          <input
                            id="tax-amount"
                            type="number"
                            min="0"
                            step="0.01"
                            value={taxAmount}
                            onChange={(e) => handleInputChange(setTaxAmount, Math.max(0, parseFloat(e.target.value) || 0))}
                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    )}

                    {/* Service Charge */}
                    <div>
                      <label htmlFor="service-charge" className="block font-medium text-slate-700 mb-2">
                        Service Charge (already included)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">$</span>
                        <input
                          id="service-charge"
                          type="number"
                          min="0"
                          step="0.01"
                          value={serviceCharge}
                          onChange={(e) => handleInputChange(setServiceCharge, Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <p className="text-xs text-slate-600 mt-1">Deducted from your tip if already on bill</p>
                    </div>

                    {/* Rounding */}
                    <div>
                      <label id="rounding-label" className="block font-medium text-slate-700 mb-2">
                        Round Tip
                      </label>
                      <div role="radiogroup" aria-labelledby="rounding-label" className="grid grid-cols-4 gap-2">
                        {(["none", "up", "down", "nearest"] as RoundingOption[]).map((option) => (
                          <button
                            key={option}
                            onClick={() => handleInputChange(setRounding, option)}
                            role="radio"
                            aria-checked={rounding === option}
                            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              rounding === option
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            {option === "none" ? "Exact" : option === "up" ? "Up $1" : option === "down" ? "Down $1" : "Nearest $1"}
                          </button>
                        ))}
                      </div>
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
                  aria-label="Tip Calculator Results"
                  aria-live="polite"
                >
                  <p className="text-sm text-slate-600 mb-1">Tip Amount</p>
                  <p className="text-4xl md:text-5xl font-bold text-slate-900">${roundedTip.toFixed(2)}</p>
                  <p className="text-slate-600 mt-2">
                    {effectiveTipPercentage.toFixed(1)}% of ${tipBase.toFixed(2)}
                  </p>
                  
                  {/* Bill Breakdown */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Bill Amount</span>
                      <span className="font-medium text-slate-800">${billAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Tip ({tipPercentage}%)</span>
                      <span className="font-medium text-blue-600">+ ${roundedTip.toFixed(2)}</span>
                    </div>
                    {serviceCharge > 0 && (
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-600">Service Charge (deducted)</span>
                        <span className="font-medium text-red-500">- ${serviceCharge.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t border-slate-200 my-2"></div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900">Total</span>
                      <span className="font-bold text-2xl text-blue-600">${totalBill.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Per Person Breakdown */}
                {numberOfPeople > 1 && (
                  <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6 mb-4">
                    <h3 className="font-bold text-blue-800 mb-4">👥 Split {numberOfPeople} Ways</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-white rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-blue-600">${billPerPerson.toFixed(2)}</p>
                        <p className="text-xs text-slate-600">Bill/person</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-blue-600">${tipPerPerson.toFixed(2)}</p>
                        <p className="text-xs text-slate-600">Tip/person</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-green-600">${totalPerPerson.toFixed(2)}</p>
                        <p className="text-xs text-slate-600">Total/person</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Tip Comparison */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">📊 Tip Comparison</h3>
                  <div className="space-y-2">
                    {[15, 18, 20, 22, 25].map((pct) => {
                      const tip = tipBase * (pct / 100);
                      const total = billAmount + tip;
                      return (
                        <div 
                          key={pct}
                          className={`flex justify-between items-center p-3 rounded-lg transition-colors ${
                            tipPercentage === pct ? "bg-blue-50 border border-blue-200" : "bg-slate-50"
                          }`}
                        >
                          <span className={`font-medium ${tipPercentage === pct ? "text-blue-700" : "text-slate-700"}`}>
                            {pct}%
                          </span>
                          <div className="text-right">
                            <span className={`font-bold ${tipPercentage === pct ? "text-blue-600" : "text-slate-800"}`}>
                              ${tip.toFixed(2)}
                            </span>
                            <span className="text-slate-400 text-sm ml-2">
                              (Total: ${total.toFixed(2)})
                            </span>
                          </div>
                        </div>
                      );
                    })}
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
                <h3 className="text-lg font-bold text-slate-900 mb-4">💡 US Tipping Standards</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Restaurant:</strong> 15-20% for table service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Delivery:</strong> 10-15% or $3-5 minimum</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Bartender:</strong> $1-2 per drink or 15-20%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Salon/Spa:</strong> 15-20% of service cost</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">🌍 International Tipping</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span><strong>Europe:</strong> 5-10% or round up</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span><strong>UK:</strong> 10-15% if no service charge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span><strong>Japan:</strong> No tipping (can be offensive)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span><strong>Australia:</strong> Not expected, but appreciated</span>
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
              Dinner for 4 people, bill is $156.80, wanting to tip 18%
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Step 1: Calculate Tip</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>Tip = Bill × (Tip% / 100)</p>
                  <p>Tip = $156.80 × 0.18</p>
                  <p className="font-bold text-blue-600 mt-2">Tip = $28.22</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Step 2: Split 4 Ways</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>Total = $156.80 + $28.22 = $185.02</p>
                  <p>Per Person = $185.02 / 4</p>
                  <p className="font-bold text-blue-600 mt-2">Each pays $46.26</p>
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding Tipping Etiquette</h2>
                  <p className="text-slate-600 mb-4">
                    Tipping is a way to show appreciation for good service. In the United States, many service workers rely on tips as a significant portion of their income, as they may be paid below minimum wage with the expectation of earning tips.
                  </p>
                  <p className="text-slate-600">
                    The standard tip in US restaurants is 15-20% of the pre-tax bill. For exceptional service, consider tipping more. Always check if a service charge has already been added to your bill before calculating additional gratuity.
                  </p>
                </div>

                {/* Country Tipping Guide */}
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">🌎 Tipping Guide by Country</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="text-left p-3 font-semibold text-slate-700">Country</th>
                          <th className="text-left p-3 font-semibold text-slate-700">Tip %</th>
                          <th className="text-left p-3 font-semibold text-slate-700">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(COUNTRY_TIPS).map(([country, info]) => (
                          <tr key={country} className="border-t border-slate-100">
                            <td className="p-3 font-medium text-slate-800">{country}</td>
                            <td className="p-3 text-blue-600 font-medium">{info.percentage}</td>
                            <td className="p-3 text-slate-600">{info.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
                  <h3 className="font-bold mb-2">🏷️ Save on Every Purchase</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Calculate discounts and find out how much you&apos;ll save.
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
