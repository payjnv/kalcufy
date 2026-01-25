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
const CALCULATOR_SLUG = "water-intake-calculator";
const CALCULATOR_NAME = "Water Intake Calculator";
const CALCULATOR_CATEGORY = "health";

// =============================================================================
// TYPES
// =============================================================================
type UnitSystem = "metric" | "imperial";
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "veryActive";
type Climate = "temperate" | "hot" | "humid" | "cold";

// =============================================================================
// ACTIVITY MULTIPLIERS
// =============================================================================
const ACTIVITY_LEVELS: Record<ActivityLevel, { label: string; multiplier: number; description: string }> = {
  sedentary: { label: "Sedentary", multiplier: 1.0, description: "Little or no exercise" },
  light: { label: "Lightly Active", multiplier: 1.1, description: "Light exercise 1-3 days/week" },
  moderate: { label: "Moderately Active", multiplier: 1.2, description: "Moderate exercise 3-5 days/week" },
  active: { label: "Very Active", multiplier: 1.3, description: "Hard exercise 6-7 days/week" },
  veryActive: { label: "Athlete", multiplier: 1.5, description: "Professional/competitive athlete" },
};

// =============================================================================
// CLIMATE ADJUSTMENTS
// =============================================================================
const CLIMATES: Record<Climate, { label: string; adjustment: number; icon: string }> = {
  temperate: { label: "Temperate", adjustment: 0, icon: "🌤️" },
  hot: { label: "Hot", adjustment: 0.5, icon: "☀️" },
  humid: { label: "Hot & Humid", adjustment: 0.75, icon: "🥵" },
  cold: { label: "Cold", adjustment: -0.25, icon: "❄️" },
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function WaterIntakeCalculatorPage() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - Inputs
  // ─────────────────────────────────────────────────────────────────────────────
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("imperial");
  
  // Weight
  const [weightLbs, setWeightLbs] = useState(170);
  const [weightKg, setWeightKg] = useState(77);
  
  // Activity & Climate
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [climate, setClimate] = useState<Climate>("temperate");
  
  // Advanced
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isPregnant, setIsPregnant] = useState(false);
  const [isBreastfeeding, setIsBreastfeeding] = useState(false);
  const [caffeineIntake, setCaffeineIntake] = useState(0); // cups of coffee

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
  
  // Get weight in kg
  const getWeightKg = (): number => {
    return unitSystem === "metric" ? weightKg : weightLbs * 0.453592;
  };

  // Base calculation: 30-35ml per kg of body weight
  const calculateBaseWater = (): number => {
    return getWeightKg() * 0.033; // Returns liters
  };

  // Calculate total water with adjustments
  const calculateTotalWater = (): number => {
    let water = calculateBaseWater();
    
    // Activity adjustment
    water *= ACTIVITY_LEVELS[activityLevel].multiplier;
    
    // Climate adjustment
    water += CLIMATES[climate].adjustment;
    
    // Pregnancy/breastfeeding
    if (isPregnant) water += 0.3;
    if (isBreastfeeding) water += 0.7;
    
    // Caffeine compensation (add 150ml per cup of coffee)
    water += caffeineIntake * 0.15;
    
    return Math.round(water * 10) / 10;
  };

  // Calculate in different units
  const waterLiters = calculateTotalWater();
  const waterOz = Math.round(waterLiters * 33.814);
  const waterCups = Math.round(waterLiters * 4.227);
  const waterGlasses = Math.round(waterLiters / 0.25); // 250ml glasses

  // Calculate hourly intake (assuming 16 waking hours)
  const hourlyMl = Math.round((waterLiters * 1000) / 16);
  const hourlyOz = Math.round(waterOz / 16);

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
            unitSystem,
            weight: unitSystem === "metric" ? weightKg : weightLbs,
            activityLevel,
            climate,
            isPregnant,
            isBreastfeeding,
            caffeineIntake,
          },
          results: {
            waterLiters: `${waterLiters}L`,
            waterOz: `${waterOz} oz`,
            waterGlasses: `${waterGlasses} glasses`,
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
      question: "How much water should I drink per day?",
      answer: "The general recommendation is about 30-35ml per kg of body weight. For a 70kg person, that's about 2.1-2.5 liters. However, this varies based on activity level, climate, and individual factors."
    },
    {
      question: "Does coffee count toward water intake?",
      answer: "While coffee does contain water, caffeine has a mild diuretic effect. Moderate coffee consumption (1-3 cups) can count toward your intake, but it's best to compensate with extra water if you drink more."
    },
    {
      question: "What are signs of dehydration?",
      answer: "Common signs include dark yellow urine, thirst, dry mouth, fatigue, dizziness, and headaches. Aim for pale yellow urine as an indicator of good hydration."
    },
    {
      question: "Can I drink too much water?",
      answer: "Yes, overhydration (hyponatremia) can occur but is rare. It's more common in endurance athletes. Drinking to thirst and monitoring urine color is usually sufficient for most people."
    },
    {
      question: "Do fruits and vegetables count toward water intake?",
      answer: "Yes! Foods like watermelon, cucumbers, oranges, and lettuce are over 90% water and contribute to your daily hydration. About 20% of daily water intake typically comes from food."
    },
    {
      question: "Should I drink more water when exercising?",
      answer: "Yes, drink 200-300ml (7-10 oz) every 10-20 minutes during exercise. For workouts longer than an hour, consider drinks with electrolytes to replace what you lose through sweat."
    },
  ];
  const faqs = translations?.faq || defaultFaqs;

  // ─────────────────────────────────────────────────────────────────────────────
  // SIDEBAR CALCULATORS
  // ─────────────────────────────────────────────────────────────────────────────
  const financeCalcs = ["Mortgage", "Loan", "Compound Interest", "Auto Loan", "Retirement", "Savings"];
  const healthCalcs = ["BMI", "Calorie", "BMR", "TDEE", "Body Fat", "Macro", "Protein"];

  const weightUnit = unitSystem === "metric" ? "kg" : "lbs";

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
              <span className="text-slate-900 font-medium" aria-current="page">Water Intake Calculator</span>
            </nav>

            {/* Title */}
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl"
                role="img"
                aria-label="Water Intake Calculator icon"
              >
                💧
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Water Intake Calculator</h1>
                <p className="text-slate-600 mt-1">Calculate how much water you should drink daily</p>
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
                  <h2 className="text-xl font-bold text-slate-900">Your Information</h2>
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

                {/* Unit System */}
                <div className="mb-6">
                  <label id="unit-system-label" className="block font-medium text-slate-700 mb-2">
                    Unit System
                  </label>
                  <div 
                    role="radiogroup" 
                    aria-labelledby="unit-system-label" 
                    className="grid grid-cols-2 gap-2"
                  >
                    {(["imperial", "metric"] as UnitSystem[]).map((unit) => (
                      <button
                        key={unit}
                        onClick={() => handleInputChange(setUnitSystem, unit)}
                        role="radio"
                        aria-checked={unitSystem === unit}
                        className={`py-3 px-4 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          unitSystem === unit
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {unit === "imperial" ? "Imperial (lb, oz)" : "Metric (kg, L)"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Weight */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="weight-input" className="font-medium text-slate-700">
                      Weight
                    </label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        id="weight-input"
                        type="number"
                        min={unitSystem === "metric" ? 30 : 66}
                        max={unitSystem === "metric" ? 200 : 440}
                        value={unitSystem === "metric" ? weightKg : weightLbs}
                        onChange={(e) => {
                          const val = Number(e.target.value) || (unitSystem === "metric" ? 30 : 66);
                          if (unitSystem === "metric") {
                            handleInputChange(setWeightKg, val);
                          } else {
                            handleInputChange(setWeightLbs, val);
                          }
                        }}
                        className="w-16 bg-transparent text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-slate-600 ml-1">{weightUnit}</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={unitSystem === "metric" ? 30 : 66}
                    max={unitSystem === "metric" ? 200 : 440}
                    value={unitSystem === "metric" ? weightKg : weightLbs}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (unitSystem === "metric") {
                        handleInputChange(setWeightKg, val);
                      } else {
                        handleInputChange(setWeightLbs, val);
                      }
                    }}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    aria-label="Weight slider"
                  />
                </div>

                {/* Activity Level */}
                <div className="mb-6">
                  <label id="activity-label" className="block font-medium text-slate-700 mb-2">
                    Activity Level
                  </label>
                  <div 
                    role="radiogroup" 
                    aria-labelledby="activity-label" 
                    className="space-y-2"
                  >
                    {(Object.entries(ACTIVITY_LEVELS) as [ActivityLevel, typeof ACTIVITY_LEVELS[ActivityLevel]][]).map(([key, val]) => (
                      <button
                        key={key}
                        onClick={() => handleInputChange(setActivityLevel, key)}
                        role="radio"
                        aria-checked={activityLevel === key}
                        className={`w-full text-left p-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          activityLevel === key
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-slate-800">{val.label}</span>
                          <span className="text-xs text-blue-600">×{val.multiplier}</span>
                        </div>
                        <p className="text-xs text-slate-600">{val.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Climate */}
                <div className="mb-6">
                  <label id="climate-label" className="block font-medium text-slate-700 mb-2">
                    Climate
                  </label>
                  <div 
                    role="radiogroup" 
                    aria-labelledby="climate-label" 
                    className="grid grid-cols-2 gap-2"
                  >
                    {(Object.entries(CLIMATES) as [Climate, typeof CLIMATES[Climate]][]).map(([key, val]) => (
                      <button
                        key={key}
                        onClick={() => handleInputChange(setClimate, key)}
                        role="radio"
                        aria-checked={climate === key}
                        className={`p-3 rounded-xl border text-left transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          climate === key
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{val.icon}</span>
                          <span className="font-medium text-slate-800">{val.label}</span>
                        </div>
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
                      {/* Pregnancy/Breastfeeding */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label htmlFor="pregnant-toggle" className="font-medium text-slate-700">
                            Pregnant
                          </label>
                          <button
                            id="pregnant-toggle"
                            onClick={() => handleInputChange(setIsPregnant, !isPregnant)}
                            role="switch"
                            aria-checked={isPregnant}
                            className={`relative w-12 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              isPregnant ? "bg-blue-600" : "bg-slate-300"
                            }`}
                          >
                            <span
                              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                                isPregnant ? "translate-x-6" : ""
                              }`}
                            />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <label htmlFor="breastfeeding-toggle" className="font-medium text-slate-700">
                            Breastfeeding
                          </label>
                          <button
                            id="breastfeeding-toggle"
                            onClick={() => handleInputChange(setIsBreastfeeding, !isBreastfeeding)}
                            role="switch"
                            aria-checked={isBreastfeeding}
                            className={`relative w-12 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              isBreastfeeding ? "bg-blue-600" : "bg-slate-300"
                            }`}
                          >
                            <span
                              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                                isBreastfeeding ? "translate-x-6" : ""
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Caffeine Intake */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label htmlFor="caffeine-input" className="font-medium text-slate-700">
                            Coffee/Caffeine (cups/day)
                          </label>
                          <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                            <input
                              id="caffeine-input"
                              type="number"
                              min="0"
                              max="10"
                              value={caffeineIntake}
                              onChange={(e) => handleInputChange(setCaffeineIntake, Math.max(0, Math.min(10, Number(e.target.value) || 0)))}
                              className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <span className="text-slate-600 ml-1">☕</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600">We&apos;ll add extra water to compensate for caffeine</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ═══════════════════════════════════════════════════════════════════
                  RIGHT COLUMN - RESULTS
              ═══════════════════════════════════════════════════════════════════ */}
              <div>
                {/* Main Result */}
                <div 
                  className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 md:p-8 mb-4 text-white"
                  role="region"
                  aria-label="Water Intake Results"
                  aria-live="polite"
                >
                  <p className="text-blue-100 mb-1">Daily Water Intake</p>
                  <div className="flex items-baseline gap-2 mb-4">
                    <p className="text-5xl md:text-6xl font-bold">
                      {unitSystem === "metric" ? waterLiters : waterOz}
                    </p>
                    <p className="text-2xl text-blue-100">
                      {unitSystem === "metric" ? "liters" : "oz"}
                    </p>
                  </div>
                  
                  {/* Alternative measurements */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="bg-white/20 rounded-xl p-3 text-center">
                      <p className="text-2xl font-bold">{waterGlasses}</p>
                      <p className="text-xs text-blue-100">glasses</p>
                    </div>
                    <div className="bg-white/20 rounded-xl p-3 text-center">
                      <p className="text-2xl font-bold">{waterCups}</p>
                      <p className="text-xs text-blue-100">cups</p>
                    </div>
                    <div className="bg-white/20 rounded-xl p-3 text-center">
                      <p className="text-2xl font-bold">{Math.round(waterLiters * 1000)}</p>
                      <p className="text-xs text-blue-100">ml</p>
                    </div>
                  </div>
                </div>

                {/* Hourly Breakdown - UNIQUE FEATURE */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">⏰ Hourly Intake Goal</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-blue-600">
                        {unitSystem === "metric" ? `${hourlyMl} ml` : `${hourlyOz} oz`}
                      </p>
                      <p className="text-sm text-slate-600">every hour while awake</p>
                    </div>
                    <div className="text-6xl">🥤</div>
                  </div>
                  <p className="text-xs text-slate-600 mt-3">
                    Based on 16 waking hours per day
                  </p>
                </div>

                {/* Hydration Tips */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">💡 Hydration Schedule</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <span className="text-xl">🌅</span>
                      <div>
                        <p className="font-medium text-slate-800">Morning</p>
                        <p className="text-sm text-slate-600">Drink 1-2 glasses right after waking</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <span className="text-xl">🍽️</span>
                      <div>
                        <p className="font-medium text-slate-800">Before Meals</p>
                        <p className="text-sm text-slate-600">1 glass 30 minutes before eating</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <span className="text-xl">🏃</span>
                      <div>
                        <p className="font-medium text-slate-800">Exercise</p>
                        <p className="text-sm text-slate-600">200-300ml every 15-20 minutes</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <span className="text-xl">🌙</span>
                      <div>
                        <p className="font-medium text-slate-800">Evening</p>
                        <p className="text-sm text-slate-600">Reduce intake 2 hours before bed</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Urine Color Guide - UNIQUE FEATURE */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">🚽 Hydration Check (Urine Color)</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-8 rounded-l-lg bg-amber-100" title="Pale yellow - Well hydrated"></div>
                    <div className="flex-1 h-8 bg-amber-200" title="Light yellow - Good"></div>
                    <div className="flex-1 h-8 bg-amber-300" title="Yellow - Okay"></div>
                    <div className="flex-1 h-8 bg-amber-400" title="Dark yellow - Drink more"></div>
                    <div className="flex-1 h-8 rounded-r-lg bg-amber-600" title="Brown - Dehydrated"></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600 mt-2">
                    <span>Well hydrated</span>
                    <span>Dehydrated</span>
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
                <h3 className="text-lg font-bold text-slate-900 mb-4">✅ Benefits of Proper Hydration</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Improved physical performance and endurance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Better concentration and brain function</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Healthy skin and reduced signs of aging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Better digestion and nutrient absorption</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">⚠️ Signs of Dehydration</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">!</span>
                    <span>Dark yellow or amber colored urine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">!</span>
                    <span>Feeling thirsty, dry mouth, or headaches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">!</span>
                    <span>Fatigue, dizziness, or confusion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">!</span>
                    <span>Dry skin or decreased skin elasticity</span>
                  </li>
                </ul>
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
                {/* Why Hydration Matters */}
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Hydration Matters</h2>
                  <p className="text-slate-600 mb-4">
                    Water makes up about 60% of your body weight and is essential for virtually every bodily function. It regulates body temperature, transports nutrients, removes waste, lubricates joints, and supports organ function.
                  </p>
                  <p className="text-slate-600">
                    Even mild dehydration (1-2% of body weight) can impair physical performance, cognitive function, and mood. Staying properly hydrated supports energy levels, athletic performance, and overall health.
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

                {/* Quick Link to Related Calculator */}
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                  <h3 className="font-bold mb-2">🔥 Calculate Your Calories</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Pair your hydration with proper nutrition using our Calorie Calculator.
                  </p>
                  <Link
                    href={`/${locale}/calorie-calculator`}
                    className="inline-block bg-white text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Try Calorie Calculator →
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
