"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import AdBlock from "@/components/ads/AdBlock";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

// =============================================================================
// CALCULATOR CONSTANTS
// =============================================================================
const CALCULATOR_SLUG = "unit-converter";
const CALCULATOR_NAME = "Unit Converter";
const CALCULATOR_CATEGORY = "everyday";

// =============================================================================
// TYPES
// =============================================================================
type Category = "length" | "weight" | "temperature" | "volume" | "area" | "speed" | "time" | "data";

// =============================================================================
// CONVERSION DATA
// =============================================================================
const CONVERSIONS: Record<Category, { units: Record<string, { label: string; toBase: number }>; baseUnit: string; icon: string }> = {
  length: {
    icon: "📏",
    baseUnit: "m",
    units: {
      mm: { label: "Millimeters (mm)", toBase: 0.001 },
      cm: { label: "Centimeters (cm)", toBase: 0.01 },
      m: { label: "Meters (m)", toBase: 1 },
      km: { label: "Kilometers (km)", toBase: 1000 },
      in: { label: "Inches (in)", toBase: 0.0254 },
      ft: { label: "Feet (ft)", toBase: 0.3048 },
      yd: { label: "Yards (yd)", toBase: 0.9144 },
      mi: { label: "Miles (mi)", toBase: 1609.344 },
    },
  },
  weight: {
    icon: "⚖️",
    baseUnit: "kg",
    units: {
      mg: { label: "Milligrams (mg)", toBase: 0.000001 },
      g: { label: "Grams (g)", toBase: 0.001 },
      kg: { label: "Kilograms (kg)", toBase: 1 },
      oz: { label: "Ounces (oz)", toBase: 0.0283495 },
      lb: { label: "Pounds (lb)", toBase: 0.453592 },
      st: { label: "Stone (st)", toBase: 6.35029 },
      ton: { label: "Metric Ton", toBase: 1000 },
    },
  },
  temperature: {
    icon: "🌡️",
    baseUnit: "c",
    units: {
      c: { label: "Celsius (°C)", toBase: 1 },
      f: { label: "Fahrenheit (°F)", toBase: 1 },
      k: { label: "Kelvin (K)", toBase: 1 },
    },
  },
  volume: {
    icon: "🥤",
    baseUnit: "l",
    units: {
      ml: { label: "Milliliters (ml)", toBase: 0.001 },
      l: { label: "Liters (L)", toBase: 1 },
      gal: { label: "Gallons (US)", toBase: 3.78541 },
      qt: { label: "Quarts (US)", toBase: 0.946353 },
      pt: { label: "Pints (US)", toBase: 0.473176 },
      cup: { label: "Cups (US)", toBase: 0.236588 },
      floz: { label: "Fluid Oz (US)", toBase: 0.0295735 },
      tbsp: { label: "Tablespoons", toBase: 0.0147868 },
      tsp: { label: "Teaspoons", toBase: 0.00492892 },
    },
  },
  area: {
    icon: "📐",
    baseUnit: "m2",
    units: {
      mm2: { label: "Square mm", toBase: 0.000001 },
      cm2: { label: "Square cm", toBase: 0.0001 },
      m2: { label: "Square m", toBase: 1 },
      km2: { label: "Square km", toBase: 1000000 },
      in2: { label: "Square in", toBase: 0.00064516 },
      ft2: { label: "Square ft", toBase: 0.092903 },
      yd2: { label: "Square yd", toBase: 0.836127 },
      acre: { label: "Acres", toBase: 4046.86 },
      ha: { label: "Hectares", toBase: 10000 },
    },
  },
  speed: {
    icon: "🚀",
    baseUnit: "ms",
    units: {
      ms: { label: "Meters/second", toBase: 1 },
      kmh: { label: "Kilometers/hour", toBase: 0.277778 },
      mph: { label: "Miles/hour", toBase: 0.44704 },
      kn: { label: "Knots", toBase: 0.514444 },
      fts: { label: "Feet/second", toBase: 0.3048 },
    },
  },
  time: {
    icon: "⏱️",
    baseUnit: "s",
    units: {
      ms: { label: "Milliseconds", toBase: 0.001 },
      s: { label: "Seconds", toBase: 1 },
      min: { label: "Minutes", toBase: 60 },
      hr: { label: "Hours", toBase: 3600 },
      day: { label: "Days", toBase: 86400 },
      wk: { label: "Weeks", toBase: 604800 },
      mo: { label: "Months (avg)", toBase: 2629746 },
      yr: { label: "Years", toBase: 31556952 },
    },
  },
  data: {
    icon: "💾",
    baseUnit: "b",
    units: {
      b: { label: "Bytes", toBase: 1 },
      kb: { label: "Kilobytes (KB)", toBase: 1024 },
      mb: { label: "Megabytes (MB)", toBase: 1048576 },
      gb: { label: "Gigabytes (GB)", toBase: 1073741824 },
      tb: { label: "Terabytes (TB)", toBase: 1099511627776 },
      bit: { label: "Bits", toBase: 0.125 },
    },
  },
};

const CATEGORY_LABELS: Record<Category, string> = {
  length: "Length",
  weight: "Weight",
  temperature: "Temperature",
  volume: "Volume",
  area: "Area",
  speed: "Speed",
  time: "Time",
  data: "Data",
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function UnitConverterPage() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - Inputs
  // ─────────────────────────────────────────────────────────────────────────────
  const [category, setCategory] = useState<Category>("length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("ft");
  const [inputValue, setInputValue] = useState(1);

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - UI
  // ─────────────────────────────────────────────────────────────────────────────
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [copied, setCopied] = useState(false);

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

  // Reset units when category changes
  useEffect(() => {
    const units = Object.keys(CONVERSIONS[category].units);
    setFromUnit(units[0]);
    setToUnit(units[1]);
  }, [category]);

  // ─────────────────────────────────────────────────────────────────────────────
  // CALCULATIONS
  // ─────────────────────────────────────────────────────────────────────────────
  
  const convert = (): number => {
    if (category === "temperature") {
      // Special handling for temperature
      let celsius = inputValue;
      
      // Convert to Celsius first
      if (fromUnit === "f") {
        celsius = (inputValue - 32) * 5/9;
      } else if (fromUnit === "k") {
        celsius = inputValue - 273.15;
      }
      
      // Convert from Celsius to target
      if (toUnit === "c") return celsius;
      if (toUnit === "f") return (celsius * 9/5) + 32;
      if (toUnit === "k") return celsius + 273.15;
      
      return celsius;
    }
    
    // Standard conversion: value → base unit → target unit
    const fromFactor = CONVERSIONS[category].units[fromUnit].toBase;
    const toFactor = CONVERSIONS[category].units[toUnit].toBase;
    return (inputValue * fromFactor) / toFactor;
  };

  const result = convert();
  
  // Format result based on magnitude
  const formatResult = (num: number): string => {
    if (Math.abs(num) >= 1000000 || (Math.abs(num) < 0.001 && num !== 0)) {
      return num.toExponential(4);
    }
    return num.toLocaleString(undefined, { maximumFractionDigits: 6 });
  };

  // Swap units
  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  // Copy result
  const copyResult = () => {
    navigator.clipboard.writeText(result.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            category: CATEGORY_LABELS[category],
            from: `${inputValue} ${fromUnit}`,
            to: toUnit,
          },
          results: {
            result: `${formatResult(result)} ${toUnit}`,
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
      question: "How accurate are these conversions?",
      answer: "Our conversions use standard conversion factors and are accurate to at least 6 decimal places. For scientific work requiring extreme precision, please verify with specialized tools."
    },
    {
      question: "What's the difference between US and Imperial measurements?",
      answer: "US and Imperial systems differ mainly in volume measurements. A US gallon is about 3.79 liters, while an Imperial gallon is about 4.55 liters. Our calculator uses US measurements by default."
    },
    {
      question: "Why do temperature conversions work differently?",
      answer: "Temperature scales have different zero points and intervals. Celsius and Fahrenheit use offset conversion formulas (°F = °C × 9/5 + 32), while Kelvin is an absolute scale starting at absolute zero."
    },
    {
      question: "What is a metric ton vs US ton?",
      answer: "A metric ton (tonne) equals 1,000 kg (2,204.6 lbs). A US ton (short ton) equals 2,000 lbs (907.2 kg). An Imperial ton (long ton) equals 2,240 lbs (1,016 kg)."
    },
    {
      question: "How do I convert cooking measurements?",
      answer: "Use our Volume category for cooking conversions. Common conversions: 1 cup = 16 tablespoons = 48 teaspoons = 236.6 ml. For weight-based recipes, 1 cup of flour ≈ 125g, 1 cup of sugar ≈ 200g."
    },
    {
      question: "What's the difference between KB and KiB?",
      answer: "KB (kilobyte) traditionally means 1,024 bytes in computing, while SI defines it as 1,000 bytes. KiB (kibibyte) explicitly means 1,024 bytes. Our calculator uses the binary (1,024) standard common in computing."
    },
  ];
  const faqs = translations?.faq || defaultFaqs;

  // ─────────────────────────────────────────────────────────────────────────────
  // SIDEBAR CALCULATORS
  // ─────────────────────────────────────────────────────────────────────────────
  const everydayCalcs = ["Tip", "Discount", "Percentage", "Age", "Date", "Fuel Cost"];
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
              <span className="text-slate-900 font-medium" aria-current="page">Unit Converter</span>
            </nav>

            {/* Title */}
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl"
                role="img"
                aria-label="Unit Converter icon"
              >
                🔄
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Unit Converter</h1>
                <p className="text-slate-600 mt-1">Convert between units of length, weight, volume, and more</p>
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
                  <h2 className="text-xl font-bold text-slate-900">Convert Units</h2>
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

                {/* Category Selection */}
                <div className="mb-6">
                  <label id="category-label" className="block font-medium text-slate-700 mb-2">
                    Category
                  </label>
                  <div role="radiogroup" aria-labelledby="category-label" className="grid grid-cols-4 gap-2">
                    {(Object.keys(CONVERSIONS) as Category[]).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleInputChange(setCategory, cat)}
                        role="radio"
                        aria-checked={category === cat}
                        className={`p-2 rounded-xl border text-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          category === cat
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span className="text-lg block">{CONVERSIONS[cat].icon}</span>
                        <span className="text-xs font-medium text-slate-700">{CATEGORY_LABELS[cat]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 my-6"></div>

                {/* Input Value */}
                <div className="mb-6">
                  <label htmlFor="input-value" className="block font-medium text-slate-700 mb-2">
                    Value
                  </label>
                  <input
                    id="input-value"
                    type="number"
                    step="any"
                    value={inputValue}
                    onChange={(e) => handleInputChange(setInputValue, parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 text-2xl font-bold text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>

                {/* From/To Units */}
                <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-end">
                  <div>
                    <label htmlFor="from-unit" className="block font-medium text-slate-700 mb-2">
                      From
                    </label>
                    <select
                      id="from-unit"
                      value={fromUnit}
                      onChange={(e) => handleInputChange(setFromUnit, e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      {Object.entries(CONVERSIONS[category].units).map(([key, val]) => (
                        <option key={key} value={key}>{val.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Swap Button */}
                  <button
                    onClick={swapUnits}
                    className="p-3 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors mb-0.5"
                    aria-label="Swap units"
                  >
                    <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </button>

                  <div>
                    <label htmlFor="to-unit" className="block font-medium text-slate-700 mb-2">
                      To
                    </label>
                    <select
                      id="to-unit"
                      value={toUnit}
                      onChange={(e) => handleInputChange(setToUnit, e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      {Object.entries(CONVERSIONS[category].units).map(([key, val]) => (
                        <option key={key} value={key}>{val.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="mt-6">
                  <label className="block font-medium text-slate-700 mb-2">Quick Values</label>
                  <div className="flex flex-wrap gap-2">
                    {[1, 10, 100, 1000].map((val) => (
                      <button
                        key={val}
                        onClick={() => handleInputChange(setInputValue, val)}
                        className={`py-2 px-4 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          inputValue === val
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ═══════════════════════════════════════════════════════════════════
                  RIGHT COLUMN - RESULTS
              ═══════════════════════════════════════════════════════════════════ */}
              <div>
                {/* Main Result */}
                <div 
                  className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4"
                  role="region"
                  aria-label="Conversion Result"
                  aria-live="polite"
                >
                  <p className="text-sm text-slate-600 mb-1">Result</p>
                  <div className="flex items-center gap-3">
                    <p className="text-4xl md:text-5xl font-bold text-slate-900">
                      {formatResult(result)}
                    </p>
                    <span className="text-2xl text-blue-600 font-medium">{toUnit}</span>
                  </div>
                  
                  {/* Conversion Formula */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 mt-4">
                    <p className="text-sm text-slate-600">
                      {inputValue} {CONVERSIONS[category].units[fromUnit].label.split(" ")[0]} = {formatResult(result)} {CONVERSIONS[category].units[toUnit].label.split(" ")[0]}
                    </p>
                    <button
                      onClick={copyResult}
                      className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                    >
                      {copied ? (
                        <>✓ Copied!</>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy result
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* All Conversions for Category */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">📊 All {CATEGORY_LABELS[category]} Conversions</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {Object.entries(CONVERSIONS[category].units)
                      .filter(([key]) => key !== fromUnit)
                      .map(([key, val]) => {
                        let converted: number;
                        if (category === "temperature") {
                          let celsius = inputValue;
                          if (fromUnit === "f") celsius = (inputValue - 32) * 5/9;
                          else if (fromUnit === "k") celsius = inputValue - 273.15;
                          
                          if (key === "c") converted = celsius;
                          else if (key === "f") converted = (celsius * 9/5) + 32;
                          else converted = celsius + 273.15;
                        } else {
                          const fromFactor = CONVERSIONS[category].units[fromUnit].toBase;
                          const toFactor = val.toBase;
                          converted = (inputValue * fromFactor) / toFactor;
                        }
                        
                        return (
                          <div 
                            key={key}
                            className={`flex justify-between items-center p-3 rounded-lg ${
                              key === toUnit ? "bg-blue-50 border border-blue-200" : "bg-slate-50"
                            }`}
                          >
                            <span className="text-slate-700">{val.label}</span>
                            <span className={`font-bold ${key === toUnit ? "text-blue-600" : "text-slate-800"}`}>
                              {formatResult(converted)}
                            </span>
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
                <h3 className="text-lg font-bold text-slate-900 mb-4">📏 Common Conversions</h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>1 inch = 2.54 cm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>1 mile = 1.609 km</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>1 pound = 0.454 kg</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>1 gallon = 3.785 liters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>°F = (°C × 9/5) + 32</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">🍳 Cooking Conversions</h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>1 cup = 16 tablespoons = 48 tsp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>1 cup = 236.6 ml ≈ 240 ml</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>1 tablespoon = 3 teaspoons = 15 ml</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>1 fluid oz = 2 tablespoons = 30 ml</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>1 stick butter = 8 tbsp = 113g</span>
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
            <h2 className="text-2xl font-bold text-slate-900 mb-4">📊 Example Conversions</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Length: Miles to Kilometers</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>26.2 miles (marathon)</p>
                  <p>× 1.60934</p>
                  <p className="font-bold text-blue-600 mt-2">= 42.165 km</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Temperature: °F to °C</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>98.6°F (body temp)</p>
                  <p>(98.6 - 32) × 5/9</p>
                  <p className="font-bold text-blue-600 mt-2">= 37°C</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Weight: Pounds to Kg</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>150 lbs</p>
                  <p>× 0.453592</p>
                  <p className="font-bold text-blue-600 mt-2">= 68.04 kg</p>
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding Unit Systems</h2>
                  <p className="text-slate-600 mb-4">
                    The world primarily uses two systems of measurement: the Metric System (SI) used by most countries, and the Imperial/US Customary System used mainly in the United States, Liberia, and Myanmar.
                  </p>
                  <p className="text-slate-600">
                    The metric system is based on powers of 10, making conversions straightforward (1 km = 1,000 m). The imperial system uses various conversion factors that must be memorized (1 mile = 5,280 feet). Our converter handles all the math for you.
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
                  <h3 className="font-bold mb-2">⛽ Calculate Fuel Costs</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Plan your road trip with our fuel cost calculator.
                  </p>
                  <Link href={`/${locale}/fuel-cost-calculator`} className="inline-block bg-white text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                    Try Fuel Cost Calculator →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      
    </>
  );
}
