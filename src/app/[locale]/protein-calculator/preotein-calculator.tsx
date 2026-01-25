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
const CALCULATOR_SLUG = "protein-calculator";
const CALCULATOR_NAME = "Protein Calculator";
const CALCULATOR_CATEGORY = "health";

// =============================================================================
// TYPES
// =============================================================================
type UnitSystem = "metric" | "imperial";
type Gender = "male" | "female";
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "veryActive";
type Goal = "lose" | "maintain" | "gain" | "athlete";

// =============================================================================
// ACTIVITY MULTIPLIERS
// =============================================================================
const ACTIVITY_LEVELS: Record<ActivityLevel, { label: string; description: string }> = {
  sedentary: { label: "Sedentary", description: "Little or no exercise" },
  light: { label: "Lightly Active", description: "Light exercise 1-3 days/week" },
  moderate: { label: "Moderately Active", description: "Moderate exercise 3-5 days/week" },
  active: { label: "Very Active", description: "Hard exercise 6-7 days/week" },
  veryActive: { label: "Athlete", description: "Professional/competitive athlete" },
};

// =============================================================================
// GOAL CONFIGURATIONS
// =============================================================================
const GOALS: Record<Goal, { label: string; description: string; gPerKg: { min: number; max: number } }> = {
  lose: { 
    label: "Lose Fat", 
    description: "Preserve muscle while losing fat",
    gPerKg: { min: 1.6, max: 2.4 }
  },
  maintain: { 
    label: "Maintain", 
    description: "Maintain current body composition",
    gPerKg: { min: 1.2, max: 1.6 }
  },
  gain: { 
    label: "Build Muscle", 
    description: "Maximize muscle growth",
    gPerKg: { min: 1.6, max: 2.2 }
  },
  athlete: { 
    label: "Competitive Athlete", 
    description: "High-intensity training",
    gPerKg: { min: 2.0, max: 2.7 }
  },
};

// =============================================================================
// PROTEIN FOOD SOURCES (per 100g or standard serving)
// =============================================================================
const PROTEIN_SOURCES = [
  { name: "Chicken Breast", protein: 31, serving: "100g (3.5 oz)", icon: "🍗" },
  { name: "Eggs", protein: 6, serving: "1 large egg", icon: "🥚" },
  { name: "Greek Yogurt", protein: 10, serving: "100g", icon: "🥛" },
  { name: "Salmon", protein: 25, serving: "100g (3.5 oz)", icon: "🐟" },
  { name: "Lean Beef", protein: 26, serving: "100g (3.5 oz)", icon: "🥩" },
  { name: "Tofu", protein: 8, serving: "100g", icon: "🧈" },
  { name: "Lentils (cooked)", protein: 9, serving: "100g", icon: "🫘" },
  { name: "Whey Protein", protein: 25, serving: "1 scoop (30g)", icon: "🥤" },
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function ProteinCalculatorPage() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - Inputs
  // ─────────────────────────────────────────────────────────────────────────────
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("imperial");
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState(30);
  
  // Weight
  const [weightLbs, setWeightLbs] = useState(170);
  const [weightKg, setWeightKg] = useState(77);
  
  // Activity & Goals
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<Goal>("maintain");
  
  // Advanced
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [bodyFatPercent, setBodyFatPercent] = useState<number | null>(null);
  const [mealsPerDay, setMealsPerDay] = useState(4);

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

  // Get lean body mass (if body fat provided)
  const getLeanMassKg = (): number | null => {
    if (bodyFatPercent === null) return null;
    const totalKg = getWeightKg();
    return totalKg * (1 - bodyFatPercent / 100);
  };

  // Calculate protein range based on goal
  const calculateProteinRange = () => {
    const weightKgVal = getWeightKg();
    const goalConfig = GOALS[goal];
    
    // Adjust for activity level
    let activityMultiplier = 1;
    if (activityLevel === "active") activityMultiplier = 1.1;
    if (activityLevel === "veryActive") activityMultiplier = 1.2;
    
    const min = Math.round(weightKgVal * goalConfig.gPerKg.min * activityMultiplier);
    const max = Math.round(weightKgVal * goalConfig.gPerKg.max * activityMultiplier);
    const recommended = Math.round((min + max) / 2);
    
    return { min, max, recommended };
  };

  // Calculate lean mass based protein (more accurate)
  const calculateLeanMassProtein = (): { min: number; max: number; recommended: number } | null => {
    const leanMass = getLeanMassKg();
    if (leanMass === null) return null;
    
    // Higher protein per kg of lean mass (2.2-3.3 g/kg LBM)
    const min = Math.round(leanMass * 2.2);
    const max = Math.round(leanMass * 3.3);
    const recommended = Math.round(leanMass * 2.7);
    
    return { min, max, recommended };
  };

  // Calculate per-meal protein
  const calculatePerMealProtein = (totalProtein: number) => {
    const perMeal = Math.round(totalProtein / mealsPerDay);
    // Optimal range is 20-40g per meal for muscle protein synthesis
    const isOptimal = perMeal >= 20 && perMeal <= 40;
    return { perMeal, isOptimal };
  };

  // RDA minimum (0.8 g/kg)
  const calculateRDA = (): number => {
    return Math.round(getWeightKg() * 0.8);
  };

  // Calculate values
  const proteinRange = calculateProteinRange();
  const leanMassProtein = calculateLeanMassProtein();
  const rdaMinimum = calculateRDA();
  const perMealInfo = calculatePerMealProtein(proteinRange.recommended);

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
            gender,
            age,
            weight: unitSystem === "metric" ? weightKg : weightLbs,
            activityLevel,
            goal,
            bodyFatPercent,
            mealsPerDay,
          },
          results: {
            recommendedProtein: `${proteinRange.recommended}g`,
            proteinRange: `${proteinRange.min}-${proteinRange.max}g`,
            perMeal: `${perMealInfo.perMeal}g`,
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
  const weightUnit = unitSystem === "metric" ? "kg" : "lbs";

  // ─────────────────────────────────────────────────────────────────────────────
  // FAQs
  // ─────────────────────────────────────────────────────────────────────────────
  const defaultFaqs = [
    {
      question: "How much protein do I really need?",
      answer: "The RDA of 0.8g/kg is the minimum to prevent deficiency. For active individuals, 1.6-2.2g/kg is recommended for optimal muscle growth and recovery. Athletes may need up to 2.7g/kg."
    },
    {
      question: "Can I eat too much protein?",
      answer: "For healthy individuals, high protein intake (up to 3g/kg) appears safe. However, those with kidney disease should consult a doctor. Excess protein beyond what your body needs won't build more muscle."
    },
    {
      question: "Does protein timing matter?",
      answer: "Distributing protein evenly across meals (20-40g per meal) optimizes muscle protein synthesis. The 'anabolic window' post-workout is less critical than once thought, but consuming protein within a few hours of training is still beneficial."
    },
    {
      question: "What is leucine and why does it matter?",
      answer: "Leucine is an amino acid that triggers muscle protein synthesis. Each meal should contain 2.5-3g of leucine for optimal results. Animal proteins are typically higher in leucine than plant proteins."
    },
    {
      question: "Is plant protein as good as animal protein?",
      answer: "Plant proteins can be equally effective if you consume a variety of sources to get all essential amino acids. You may need slightly more total protein (10-20%) from plants to match animal protein's muscle-building effects."
    },
    {
      question: "Should I use protein supplements?",
      answer: "Supplements are convenient but not necessary. Whole foods should be your primary protein source. Use supplements when you struggle to meet your protein needs through food alone."
    },
  ];
  const faqs = translations?.faq || defaultFaqs;

  // ─────────────────────────────────────────────────────────────────────────────
  // SIDEBAR CALCULATORS
  // ─────────────────────────────────────────────────────────────────────────────
  const financeCalcs = ["Mortgage", "Loan", "Compound Interest", "Auto Loan", "Retirement", "Savings"];
  const healthCalcs = ["BMI", "Calorie", "BMR", "TDEE", "Body Fat", "Macro", "Ideal Weight"];

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
              <span className="text-slate-900 font-medium" aria-current="page">Protein Calculator</span>
            </nav>

            {/* Title */}
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl"
                role="img"
                aria-label="Protein Calculator icon"
              >
                🥩
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Protein Calculator</h1>
                <p className="text-slate-600 mt-1">Calculate your optimal daily protein intake</p>
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
                        {unit === "imperial" ? "Imperial (lb)" : "Metric (kg)"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gender */}
                <div className="mb-6">
                  <label id="gender-label" className="block font-medium text-slate-700 mb-2">
                    Biological Sex
                  </label>
                  <div 
                    role="radiogroup" 
                    aria-labelledby="gender-label" 
                    className="grid grid-cols-2 gap-2"
                  >
                    {(["male", "female"] as Gender[]).map((g) => (
                      <button
                        key={g}
                        onClick={() => handleInputChange(setGender, g)}
                        role="radio"
                        aria-checked={gender === g}
                        className={`py-3 px-4 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          gender === g
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {g === "male" ? "Male" : "Female"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Age */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="age-input" className="font-medium text-slate-700">
                      Age
                    </label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        id="age-input"
                        type="number"
                        min="15"
                        max="80"
                        value={age}
                        onChange={(e) => handleInputChange(setAge, Math.max(15, Math.min(80, Number(e.target.value) || 15)))}
                        className="w-16 bg-transparent text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-slate-600 ml-1">years</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="80"
                    value={age}
                    onChange={(e) => handleInputChange(setAge, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    aria-label="Age slider"
                  />
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

                {/* Divider */}
                <div className="border-t border-slate-200 my-6"></div>

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
                        <span className="font-medium text-slate-800">{val.label}</span>
                        <p className="text-xs text-slate-600">{val.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Goal */}
                <div className="mb-6">
                  <label id="goal-label" className="block font-medium text-slate-700 mb-2">
                    Goal
                  </label>
                  <div 
                    role="radiogroup" 
                    aria-labelledby="goal-label" 
                    className="grid grid-cols-2 gap-2"
                  >
                    {(Object.entries(GOALS) as [Goal, typeof GOALS[Goal]][]).map(([key, val]) => (
                      <button
                        key={key}
                        onClick={() => handleInputChange(setGoal, key)}
                        role="radio"
                        aria-checked={goal === key}
                        className={`p-3 rounded-xl border text-left transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          goal === key
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span className="font-medium text-slate-800 text-sm">{val.label}</span>
                        <p className="text-xs text-slate-600">{val.description}</p>
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
                      {/* Body Fat Percentage */}
                      <div>
                        <label htmlFor="bodyfat-input" className="block font-medium text-slate-700 mb-2">
                          Body Fat % <span className="text-slate-400 font-normal">(optional)</span>
                        </label>
                        <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2">
                          <input
                            id="bodyfat-input"
                            type="number"
                            min="3"
                            max="50"
                            placeholder="e.g., 20"
                            value={bodyFatPercent ?? ""}
                            onChange={(e) => {
                              const val = e.target.value === "" ? null : Math.max(3, Math.min(50, Number(e.target.value)));
                              handleInputChange(setBodyFatPercent, val);
                            }}
                            className="w-full bg-transparent font-bold text-blue-600 focus:outline-none placeholder:text-slate-400 placeholder:font-normal [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <span className="text-slate-600 ml-1">%</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">For lean mass based calculation (more accurate)</p>
                      </div>

                      {/* Meals Per Day */}
                      <div>
                        <label id="meals-label" className="block font-medium text-slate-700 mb-2">
                          Meals Per Day
                        </label>
                        <div 
                          role="radiogroup" 
                          aria-labelledby="meals-label" 
                          className="grid grid-cols-4 gap-2"
                        >
                          {[3, 4, 5, 6].map((num) => (
                            <button
                              key={num}
                              onClick={() => handleInputChange(setMealsPerDay, num)}
                              role="radio"
                              aria-checked={mealsPerDay === num}
                              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                mealsPerDay === num
                                  ? "bg-blue-600 text-white"
                                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                              }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
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
                  className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4"
                  role="region"
                  aria-label="Protein Results"
                  aria-live="polite"
                >
                  <p className="text-sm text-slate-600 mb-1">Recommended Daily Protein</p>
                  <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                    {proteinRange.recommended}g
                  </p>
                  
                  {/* Range */}
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                    <span>Optimal Range:</span>
                    <span className="font-medium text-blue-600">
                      {proteinRange.min}g - {proteinRange.max}g
                    </span>
                  </div>

                  {/* RDA Comparison */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">RDA Minimum</span>
                      <span className="font-medium text-slate-800">{rdaMinimum}g</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Your Goal ({GOALS[goal].label})</span>
                      <span className="font-bold text-blue-600">{proteinRange.recommended}g</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full mt-3 overflow-hidden">
                      <div 
                        className="h-full bg-blue-500"
                        style={{ width: `${Math.min(100, (proteinRange.recommended / (rdaMinimum * 3)) * 100)}%` }}
                        role="progressbar"
                        aria-valuenow={proteinRange.recommended}
                        aria-valuemin={0}
                        aria-valuemax={rdaMinimum * 3}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>0g</span>
                      <span>RDA ({rdaMinimum}g)</span>
                      <span>{rdaMinimum * 3}g</span>
                    </div>
                  </div>
                </div>

                {/* Lean Mass Protein (if body fat entered) */}
                {leanMassProtein && (
                  <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6 mb-4">
                    <h3 className="font-bold text-blue-800 mb-2">💪 Based on Lean Body Mass</h3>
                    <p className="text-3xl font-bold text-blue-800">{leanMassProtein.recommended}g/day</p>
                    <p className="text-sm text-blue-600 mt-2">
                      Range: {leanMassProtein.min}g - {leanMassProtein.max}g
                    </p>
                    <p className="text-xs text-blue-500 mt-1">
                      Based on {Math.round(getLeanMassKg()!)} kg lean mass × 2.2-3.3 g/kg
                    </p>
                  </div>
                )}

                {/* Per Meal Breakdown - UNIQUE FEATURE */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">🍽️ Per Meal ({mealsPerDay} meals/day)</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-slate-800">{perMealInfo.perMeal}g</p>
                      <p className="text-sm text-slate-600">protein per meal</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      perMealInfo.isOptimal 
                        ? "bg-green-100 text-green-700" 
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {perMealInfo.isOptimal ? "✓ Optimal" : "⚠ Adjust meals"}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-3">
                    20-40g per meal is optimal for muscle protein synthesis
                  </p>
                </div>

                {/* Protein Sources - UNIQUE FEATURE */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">🥗 Food Sources to Reach {proteinRange.recommended}g</h3>
                  <div className="space-y-3">
                    {PROTEIN_SOURCES.slice(0, 6).map((food) => {
                      const servingsNeeded = Math.ceil(proteinRange.recommended / food.protein);
                      return (
                        <div key={food.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{food.icon}</span>
                            <div>
                              <p className="font-medium text-slate-800 text-sm">{food.name}</p>
                              <p className="text-xs text-slate-600">{food.protein}g per {food.serving}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-blue-600">{servingsNeeded}</p>
                            <p className="text-xs text-slate-600">servings</p>
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
                <h3 className="text-lg font-bold text-slate-900 mb-4">📊 Protein by Goal</h3>
                <div className="space-y-3">
                  {Object.entries(GOALS).map(([key, val]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-slate-700">{val.label}</span>
                      <span className="font-medium text-blue-600">{val.gPerKg.min}-{val.gPerKg.max} g/kg</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">💡 Quick Tips</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Spread protein across 4-5 meals (20-40g each)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Include protein with every meal and snack</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Consume protein within 2 hours post-workout</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Prioritize whole foods over supplements</span>
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
                {/* Why Protein Matters */}
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Protein Matters</h2>
                  <p className="text-slate-600 mb-4">
                    Protein is essential for building and repairing muscle tissue, producing enzymes and hormones, supporting immune function, and maintaining healthy skin, hair, and nails. Unlike carbohydrates and fats, your body doesn&apos;t store protein, so you need to consume it regularly.
                  </p>
                  <p className="text-slate-600">
                    For those who exercise regularly, protein needs increase significantly. Research shows that consuming 1.6-2.2g of protein per kilogram of body weight maximizes muscle protein synthesis and recovery.
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
                  <h3 className="font-bold mb-2">🥗 Calculate All Your Macros</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Get your complete macro breakdown including carbs and fats with our Macro Calculator.
                  </p>
                  <Link
                    href={`/${locale}/macro-calculator`}
                    className="inline-block bg-white text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Try Macro Calculator →
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
