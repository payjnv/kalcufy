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
const CALCULATOR_SLUG = "discount-calculator";
const CALCULATOR_NAME = "Discount Calculator";
const CALCULATOR_CATEGORY = "everyday";

// =============================================================================
// TYPES
// =============================================================================
type CalculationMode = "findFinal" | "findOriginal" | "findDiscount";

// =============================================================================
// DISCOUNT PRESETS
// =============================================================================
const DISCOUNT_PRESETS = [10, 15, 20, 25, 30, 50];

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function DiscountCalculatorPage() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - Inputs
  // ─────────────────────────────────────────────────────────────────────────────
  const [calculationMode, setCalculationMode] = useState<CalculationMode>("findFinal");
  const [originalPrice, setOriginalPrice] = useState(100);
  const [discountPercent, setDiscountPercent] = useState(20);
  const [salePrice, setSalePrice] = useState(80);
  const [taxRate, setTaxRate] = useState(0);
  const [includeTax, setIncludeTax] = useState(false);
  
  // Stackable Discounts
  const [useStackableDiscounts, setUseStackableDiscounts] = useState(false);
  const [discount2, setDiscount2] = useState(0);
  const [discount3, setDiscount3] = useState(0);

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
  
  let finalPrice = 0;
  let totalDiscount = 0;
  let savings = 0;
  let calculatedOriginal = 0;
  let calculatedDiscountPercent = 0;

  if (calculationMode === "findFinal") {
    // Calculate final price from original and discount(s)
    let priceAfterDiscounts = originalPrice;
    
    if (useStackableDiscounts) {
      // Apply discounts sequentially (compound)
      priceAfterDiscounts = priceAfterDiscounts * (1 - discountPercent / 100);
      if (discount2 > 0) {
        priceAfterDiscounts = priceAfterDiscounts * (1 - discount2 / 100);
      }
      if (discount3 > 0) {
        priceAfterDiscounts = priceAfterDiscounts * (1 - discount3 / 100);
      }
    } else {
      priceAfterDiscounts = originalPrice * (1 - discountPercent / 100);
    }
    
    finalPrice = priceAfterDiscounts;
    savings = originalPrice - finalPrice;
    totalDiscount = originalPrice > 0 ? (savings / originalPrice) * 100 : 0;
    calculatedOriginal = originalPrice;
    calculatedDiscountPercent = discountPercent;
    
  } else if (calculationMode === "findOriginal") {
    // Calculate original price from sale price and discount
    calculatedOriginal = salePrice / (1 - discountPercent / 100);
    finalPrice = salePrice;
    savings = calculatedOriginal - salePrice;
    totalDiscount = discountPercent;
    calculatedDiscountPercent = discountPercent;
    
  } else if (calculationMode === "findDiscount") {
    // Calculate discount percentage from original and sale price
    calculatedDiscountPercent = originalPrice > 0 ? ((originalPrice - salePrice) / originalPrice) * 100 : 0;
    finalPrice = salePrice;
    savings = originalPrice - salePrice;
    totalDiscount = calculatedDiscountPercent;
    calculatedOriginal = originalPrice;
  }

  // Apply tax if enabled
  const taxAmount = includeTax ? finalPrice * (taxRate / 100) : 0;
  const finalWithTax = finalPrice + taxAmount;

  // Percentage saved
  const percentageSaved = calculatedOriginal > 0 ? (savings / calculatedOriginal) * 100 : 0;

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
            originalPrice: `$${calculatedOriginal.toFixed(2)}`,
            discountPercent: `${totalDiscount.toFixed(1)}%`,
            mode: calculationMode,
          },
          results: {
            finalPrice: `$${finalPrice.toFixed(2)}`,
            savings: `$${savings.toFixed(2)}`,
            percentSaved: `${percentageSaved.toFixed(1)}%`,
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
      question: "How do I calculate a discount percentage?",
      answer: "Discount % = ((Original Price - Sale Price) / Original Price) × 100. For example, if an item was $100 and is now $75, the discount is (100-75)/100 × 100 = 25% off."
    },
    {
      question: "How do stackable discounts work?",
      answer: "Stackable discounts are applied sequentially, not added together. For example, 20% off then 10% off a $100 item: first $100 × 0.80 = $80, then $80 × 0.90 = $72. This is different from a single 30% discount which would be $70."
    },
    {
      question: "What's the difference between % off and $ off?",
      answer: "Percentage off is proportional to the price (20% of $100 = $20 off), while dollar off is a fixed amount. For expensive items, % off usually saves more; for cheaper items, $ off may be better. Always compare the actual savings."
    },
    {
      question: "Should I calculate tax before or after the discount?",
      answer: "Tax is almost always calculated on the discounted price, not the original. Our calculator applies tax after all discounts, which is the standard practice in most countries."
    },
    {
      question: "How do I find the original price from a sale price?",
      answer: "Original Price = Sale Price / (1 - Discount/100). For example, if an item is $60 after 25% off: $60 / 0.75 = $80 original price. Use our 'Find Original Price' mode for this calculation."
    },
    {
      question: "Is 20% off plus 10% off the same as 30% off?",
      answer: "No! Stacked discounts compound, meaning the second discount applies to the already-reduced price. 20% + 10% stacked equals about 28% total, not 30%. Use our stackable discount feature to see the difference."
    },
  ];
  const faqs = translations?.faq || defaultFaqs;

  // ─────────────────────────────────────────────────────────────────────────────
  // SIDEBAR CALCULATORS
  // ─────────────────────────────────────────────────────────────────────────────
  const everydayCalcs = ["Tip", "Percentage", "Age", "Date", "Unit Converter", "Fuel Cost"];
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
              <span className="text-slate-900 font-medium" aria-current="page">Discount Calculator</span>
            </nav>

            {/* Title */}
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl"
                role="img"
                aria-label="Discount Calculator icon"
              >
                🏷️
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Discount Calculator</h1>
                <p className="text-slate-600 mt-1">Calculate sale prices, savings, and stackable discounts</p>
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
                  <h2 className="text-xl font-bold text-slate-900">Calculate Discount</h2>
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
                    What do you want to find?
                  </label>
                  <div role="radiogroup" aria-labelledby="calc-mode-label" className="space-y-2">
                    {[
                      { key: "findFinal", label: "Final Price", icon: "🛒", description: "I know the original price and discount %" },
                      { key: "findOriginal", label: "Original Price", icon: "🔍", description: "I know the sale price and discount %" },
                      { key: "findDiscount", label: "Discount %", icon: "📊", description: "I know original and sale prices" },
                    ].map(({ key, label, icon, description }) => (
                      <button
                        key={key}
                        onClick={() => handleInputChange(setCalculationMode, key as CalculationMode)}
                        role="radio"
                        aria-checked={calculationMode === key}
                        className={`w-full text-left p-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          calculationMode === key
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span className="text-lg mr-2">{icon}</span>
                        <span className="font-medium text-slate-800">{label}</span>
                        <p className="text-xs text-slate-600 ml-7">{description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 my-6"></div>

                {/* Dynamic Inputs based on mode */}
                {calculationMode === "findFinal" && (
                  <>
                    {/* Original Price */}
                    <div className="mb-6">
                      <label htmlFor="original-price" className="block font-medium text-slate-700 mb-2">
                        Original Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-lg">$</span>
                        <input
                          id="original-price"
                          type="number"
                          min="0"
                          step="0.01"
                          value={originalPrice}
                          onChange={(e) => handleInputChange(setOriginalPrice, Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-full pl-10 pr-4 py-3 text-2xl font-bold text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    </div>

                    {/* Discount Percentage */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <label htmlFor="discount-percent" className="font-medium text-slate-700">Discount</label>
                        <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                          <input
                            id="discount-percent"
                            type="number"
                            min="0"
                            max="100"
                            value={discountPercent}
                            onChange={(e) => handleInputChange(setDiscountPercent, Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                            className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <span className="text-slate-600 ml-1">% off</span>
                        </div>
                      </div>
                      
                      {/* Discount Presets */}
                      <div className="grid grid-cols-6 gap-2 mb-3">
                        {DISCOUNT_PRESETS.map((preset) => (
                          <button
                            key={preset}
                            onClick={() => handleInputChange(setDiscountPercent, preset)}
                            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              discountPercent === preset
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
                        max="90"
                        value={discountPercent}
                        onChange={(e) => handleInputChange(setDiscountPercent, Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        aria-label="Discount percentage slider"
                      />
                    </div>

                    {/* Stackable Discounts Toggle */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                        <div>
                          <span className="font-medium text-slate-700">Stackable Discounts</span>
                          <p className="text-xs text-slate-600">Apply multiple discounts sequentially</p>
                        </div>
                        <button
                          onClick={() => handleInputChange(setUseStackableDiscounts, !useStackableDiscounts)}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            useStackableDiscounts ? "bg-blue-600" : "bg-slate-300"
                          }`}
                          role="switch"
                          aria-checked={useStackableDiscounts}
                        >
                          <span
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              useStackableDiscounts ? "translate-x-7" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Additional Discounts */}
                    {useStackableDiscounts && (
                      <div className="space-y-4 p-4 bg-slate-50 rounded-xl mb-6">
                        <div>
                          <label htmlFor="discount2" className="block text-sm font-medium text-slate-700 mb-2">
                            2nd Discount (%)
                          </label>
                          <input
                            id="discount2"
                            type="number"
                            min="0"
                            max="100"
                            value={discount2}
                            onChange={(e) => handleInputChange(setDiscount2, Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., 10"
                          />
                        </div>
                        <div>
                          <label htmlFor="discount3" className="block text-sm font-medium text-slate-700 mb-2">
                            3rd Discount (%)
                          </label>
                          <input
                            id="discount3"
                            type="number"
                            min="0"
                            max="100"
                            value={discount3}
                            onChange={(e) => handleInputChange(setDiscount3, Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., 5"
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}

                {calculationMode === "findOriginal" && (
                  <>
                    {/* Sale Price */}
                    <div className="mb-6">
                      <label htmlFor="sale-price" className="block font-medium text-slate-700 mb-2">
                        Sale Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-lg">$</span>
                        <input
                          id="sale-price"
                          type="number"
                          min="0"
                          step="0.01"
                          value={salePrice}
                          onChange={(e) => handleInputChange(setSalePrice, Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-full pl-10 pr-4 py-3 text-2xl font-bold text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    </div>

                    {/* Discount Percentage */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <label htmlFor="discount-percent-find" className="font-medium text-slate-700">Discount Applied</label>
                        <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                          <input
                            id="discount-percent-find"
                            type="number"
                            min="0"
                            max="99"
                            value={discountPercent}
                            onChange={(e) => handleInputChange(setDiscountPercent, Math.max(0, Math.min(99, Number(e.target.value) || 0)))}
                            className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <span className="text-slate-600 ml-1">% off</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="90"
                        value={discountPercent}
                        onChange={(e) => handleInputChange(setDiscountPercent, Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        aria-label="Discount percentage slider"
                      />
                    </div>
                  </>
                )}

                {calculationMode === "findDiscount" && (
                  <>
                    {/* Original Price */}
                    <div className="mb-6">
                      <label htmlFor="original-price-find" className="block font-medium text-slate-700 mb-2">
                        Original Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-lg">$</span>
                        <input
                          id="original-price-find"
                          type="number"
                          min="0"
                          step="0.01"
                          value={originalPrice}
                          onChange={(e) => handleInputChange(setOriginalPrice, Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-full pl-10 pr-4 py-3 text-xl font-bold text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    </div>

                    {/* Sale Price */}
                    <div className="mb-6">
                      <label htmlFor="sale-price-find" className="block font-medium text-slate-700 mb-2">
                        Sale Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-lg">$</span>
                        <input
                          id="sale-price-find"
                          type="number"
                          min="0"
                          step="0.01"
                          value={salePrice}
                          onChange={(e) => handleInputChange(setSalePrice, Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-full pl-10 pr-4 py-3 text-xl font-bold text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Divider */}
                <div className="border-t border-slate-200 my-6"></div>

                {/* Tax Option */}
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl mb-4">
                  <div>
                    <span className="font-medium text-slate-700">Include Sales Tax</span>
                    <p className="text-xs text-slate-600">Add tax to final price</p>
                  </div>
                  <button
                    onClick={() => handleInputChange(setIncludeTax, !includeTax)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      includeTax ? "bg-blue-600" : "bg-slate-300"
                    }`}
                    role="switch"
                    aria-checked={includeTax}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        includeTax ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {includeTax && (
                  <div className="mb-6">
                    <label htmlFor="tax-rate" className="block font-medium text-slate-700 mb-2">
                      Tax Rate (%)
                    </label>
                    <input
                      id="tax-rate"
                      type="number"
                      min="0"
                      max="50"
                      step="0.1"
                      value={taxRate}
                      onChange={(e) => handleInputChange(setTaxRate, Math.max(0, Math.min(50, parseFloat(e.target.value) || 0)))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
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
                  aria-label="Discount Calculator Results"
                  aria-live="polite"
                >
                  <p className="text-sm text-slate-600 mb-1">
                    {calculationMode === "findFinal" ? "Final Price" : 
                     calculationMode === "findOriginal" ? "Original Price" : "Discount"}
                  </p>
                  <p className="text-4xl md:text-5xl font-bold text-slate-900">
                    {calculationMode === "findDiscount" 
                      ? `${calculatedDiscountPercent.toFixed(1)}%` 
                      : calculationMode === "findOriginal"
                        ? `$${calculatedOriginal.toFixed(2)}`
                        : `$${finalPrice.toFixed(2)}`
                    }
                  </p>
                  <p className="text-green-600 font-semibold mt-2">
                    You save ${savings.toFixed(2)} ({percentageSaved.toFixed(1)}% off)
                  </p>
                  
                  {/* Price Breakdown */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Original Price</span>
                      <span className="font-medium text-slate-800">${calculatedOriginal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Discount ({totalDiscount.toFixed(1)}%)</span>
                      <span className="font-medium text-green-600">- ${savings.toFixed(2)}</span>
                    </div>
                    {includeTax && taxAmount > 0 && (
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-600">Tax ({taxRate}%)</span>
                        <span className="font-medium text-slate-600">+ ${taxAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t border-slate-200 my-2"></div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900">You Pay</span>
                      <span className="font-bold text-2xl text-blue-600">
                        ${includeTax ? finalWithTax.toFixed(2) : finalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Savings Visualization */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">💰 Savings Breakdown</h3>
                  
                  {/* Visual Bar */}
                  <div className="relative h-8 bg-slate-200 rounded-full overflow-hidden mb-4">
                    <div 
                      className="absolute h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                      style={{ width: `${100 - percentageSaved}%` }}
                    />
                    <div 
                      className="absolute h-full bg-green-500 right-0"
                      style={{ width: `${percentageSaved}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-blue-500 rounded"></span>
                      <span className="text-slate-600">You Pay: ${finalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-green-500 rounded"></span>
                      <span className="text-slate-600">You Save: ${savings.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Comparison Table */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">📊 Discount Comparison</h3>
                  <div className="space-y-2">
                    {[10, 20, 30, 40, 50].map((pct) => {
                      const discountedPrice = calculatedOriginal * (1 - pct / 100);
                      const saved = calculatedOriginal - discountedPrice;
                      return (
                        <div 
                          key={pct}
                          className={`flex justify-between items-center p-3 rounded-lg transition-colors ${
                            Math.round(totalDiscount) === pct ? "bg-blue-50 border border-blue-200" : "bg-slate-50"
                          }`}
                        >
                          <span className={`font-medium ${Math.round(totalDiscount) === pct ? "text-blue-700" : "text-slate-700"}`}>
                            {pct}% off
                          </span>
                          <div className="text-right">
                            <span className={`font-bold ${Math.round(totalDiscount) === pct ? "text-blue-600" : "text-slate-800"}`}>
                              ${discountedPrice.toFixed(2)}
                            </span>
                            <span className="text-green-500 text-sm ml-2">
                              (Save ${saved.toFixed(2)})
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
                <h3 className="text-lg font-bold text-slate-900 mb-4">💡 Discount Formulas</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Final Price:</strong> Original × (1 - Discount/100)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Savings:</strong> Original - Final Price</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Discount %:</strong> (Savings / Original) × 100</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Original:</strong> Sale Price / (1 - Discount/100)</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">🔥 Pro Shopping Tips</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Compare $ off vs % off - which saves more?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Stack coupons when allowed for max savings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Check price history before &quot;sales&quot;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Calculate per-unit price for bulk deals</span>
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
              A $250 jacket is 30% off, with an additional 15% coupon
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Single Discount (30%)</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>Final = $250 × (1 - 0.30)</p>
                  <p>Final = $250 × 0.70</p>
                  <p className="font-bold text-blue-600 mt-2">Final = $175 (Save $75)</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Stacked (30% + 15%)</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>After 30%: $250 × 0.70 = $175</p>
                  <p>After 15%: $175 × 0.85 = $148.75</p>
                  <p className="font-bold text-blue-600 mt-2">Final = $148.75 (Save $101.25)</p>
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding Discounts</h2>
                  <p className="text-slate-600 mb-4">
                    Discounts are reductions from the original price of an item. They can be expressed as a percentage off (like 20% off) or a fixed dollar amount (like $10 off). Understanding how to calculate discounts helps you make smarter shopping decisions.
                  </p>
                  <p className="text-slate-600">
                    When stores offer stackable discounts (like 20% off + additional 10% coupon), the discounts are applied sequentially, not added together. This means you won&apos;t get a full 30% off—the second discount applies to the already-reduced price.
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
                  <h3 className="font-bold mb-2">💵 Calculate Your Tips</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Split bills and calculate gratuity the easy way.
                  </p>
                  <Link href={`/${locale}/tip-calculator`} className="inline-block bg-white text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                    Try Tip Calculator →
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
