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
const CALCULATOR_SLUG = "macro-calculator";
const CALCULATOR_NAME = "Macro Calculator";
const CALCULATOR_CATEGORY = "health";

// =============================================================================
// TYPES
// =============================================================================
type UnitSystem = "metric" | "imperial";
type Gender = "male" | "female";
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "veryActive" | "extraActive";
type Goal = "lose" | "maintain" | "gain" | "recomp";
type DietType = "standard" | "lowCarb" | "keto" | "highProtein" | "zone" | "custom";

interface MacroRatio {
  protein: number;
  carbs: number;
  fat: number;
}

interface DietPreset {
  name: string;
  description: string;
  ratio: MacroRatio;
}

// =============================================================================
// DIET PRESETS
// =============================================================================
const DIET_PRESETS: Record<DietType, DietPreset> = {
  standard: {
    name: "Standard",
    description: "Balanced diet for general health",
    ratio: { protein: 30, carbs: 40, fat: 30 },
  },
  lowCarb: {
    name: "Low-Carb",
    description: "Reduced carbs for fat loss",
    ratio: { protein: 35, carbs: 25, fat: 40 },
  },
  keto: {
    name: "Keto",
    description: "Very low carb, high fat",
    ratio: { protein: 25, carbs: 5, fat: 70 },
  },
  highProtein: {
    name: "High-Protein",
    description: "For muscle building & athletes",
    ratio: { protein: 40, carbs: 35, fat: 25 },
  },
  zone: {
    name: "Zone (40/30/30)",
    description: "Balanced hormonal response",
    ratio: { protein: 30, carbs: 40, fat: 30 },
  },
  custom: {
    name: "Custom",
    description: "Set your own ratios",
    ratio: { protein: 30, carbs: 40, fat: 30 },
  },
};

// =============================================================================
// ACTIVITY MULTIPLIERS
// =============================================================================
const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, { label: string; multiplier: number; description: string }> = {
  sedentary: { label: "Sedentary", multiplier: 1.2, description: "Little or no exercise, desk job" },
  light: { label: "Lightly Active", multiplier: 1.375, description: "Light exercise 1-3 days/week" },
  moderate: { label: "Moderately Active", multiplier: 1.55, description: "Moderate exercise 3-5 days/week" },
  active: { label: "Very Active", multiplier: 1.725, description: "Hard exercise 6-7 days/week" },
  veryActive: { label: "Extra Active", multiplier: 1.9, description: "Very hard exercise, physical job" },
  extraActive: { label: "Athlete", multiplier: 2.0, description: "Professional athlete, 2x training" },
};

// =============================================================================
// GOAL ADJUSTMENTS
// =============================================================================
const GOAL_ADJUSTMENTS: Record<Goal, { label: string; calorieAdjust: number; description: string }> = {
  lose: { label: "Lose Fat", calorieAdjust: -500, description: "~1 lb/week loss" },
  maintain: { label: "Maintain", calorieAdjust: 0, description: "Keep current weight" },
  gain: { label: "Build Muscle", calorieAdjust: 300, description: "Lean muscle gain" },
  recomp: { label: "Body Recomp", calorieAdjust: 0, description: "Lose fat, gain muscle" },
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function MacroCalculatorPage() {
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
  
  // Height
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(10);
  const [heightCm, setHeightCm] = useState(178);
  
  // Activity & Goals
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<Goal>("maintain");
  const [dietType, setDietType] = useState<DietType>("standard");
  
  // Custom Macros
  const [customProtein, setCustomProtein] = useState(30);
  const [customCarbs, setCustomCarbs] = useState(40);
  const [customFat, setCustomFat] = useState(30);
  
  // Advanced
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [bodyFatPercent, setBodyFatPercent] = useState<number | null>(null);
  const [mealsPerDay, setMealsPerDay] = useState(4);
  const [showMealBreakdown, setShowMealBreakdown] = useState(false);

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

  // Get height in cm
  const getHeightCm = (): number => {
    return unitSystem === "metric" ? heightCm : (heightFeet * 12 + heightInches) * 2.54;
  };

  // Calculate BMR (Mifflin-St Jeor)
  const calculateBMR = (): number => {
    const weight = getWeightKg();
    const height = getHeightCm();
    
    if (gender === "male") {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  };

  // Calculate TDEE
  const calculateTDEE = (): number => {
    const bmr = calculateBMR();
    const multiplier = ACTIVITY_MULTIPLIERS[activityLevel].multiplier;
    return bmr * multiplier;
  };

  // Calculate target calories based on goal
  const calculateTargetCalories = (): number => {
    const tdee = calculateTDEE();
    const adjustment = GOAL_ADJUSTMENTS[goal].calorieAdjust;
    return Math.round(tdee + adjustment);
  };

  // Get current macro ratios
  const getMacroRatios = (): MacroRatio => {
    if (dietType === "custom") {
      // Normalize to ensure they add up to 100
      const total = customProtein + customCarbs + customFat;
      return {
        protein: (customProtein / total) * 100,
        carbs: (customCarbs / total) * 100,
        fat: (customFat / total) * 100,
      };
    }
    return DIET_PRESETS[dietType].ratio;
  };

  // Calculate macros in grams
  const calculateMacros = () => {
    const calories = calculateTargetCalories();
    const ratios = getMacroRatios();
    
    const proteinCals = calories * (ratios.protein / 100);
    const carbsCals = calories * (ratios.carbs / 100);
    const fatCals = calories * (ratios.fat / 100);
    
    return {
      protein: {
        grams: Math.round(proteinCals / 4),
        calories: Math.round(proteinCals),
        percent: Math.round(ratios.protein),
      },
      carbs: {
        grams: Math.round(carbsCals / 4),
        calories: Math.round(carbsCals),
        percent: Math.round(ratios.carbs),
      },
      fat: {
        grams: Math.round(fatCals / 9),
        calories: Math.round(fatCals),
        percent: Math.round(ratios.fat),
      },
    };
  };

  // Calculate fiber recommendation (14g per 1000 calories)
  const calculateFiber = (): number => {
    const calories = calculateTargetCalories();
    return Math.round((calories / 1000) * 14);
  };

  // Calculate per-meal breakdown
  const calculateMealBreakdown = () => {
    const macros = calculateMacros();
    return {
      protein: Math.round(macros.protein.grams / mealsPerDay),
      carbs: Math.round(macros.carbs.grams / mealsPerDay),
      fat: Math.round(macros.fat.grams / mealsPerDay),
      calories: Math.round(calculateTargetCalories() / mealsPerDay),
    };
  };

  // Calculate lean body mass protein (if body fat provided)
  const calculateLeanMassProtein = (): number | null => {
    if (bodyFatPercent === null) return null;
    const weight = unitSystem === "metric" ? weightKg : weightLbs;
    const leanMass = weight * (1 - bodyFatPercent / 100);
    // 1g per lb of lean mass (or 2.2g per kg)
    return Math.round(unitSystem === "metric" ? leanMass * 2.2 : leanMass);
  };

  // Calculate values
  const bmr = Math.round(calculateBMR());
  const tdee = Math.round(calculateTDEE());
  const targetCalories = calculateTargetCalories();
  const macros = calculateMacros();
  const fiber = calculateFiber();
  const mealBreakdown = calculateMealBreakdown();
  const leanMassProtein = calculateLeanMassProtein();

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
            height: unitSystem === "metric" ? heightCm : `${heightFeet}'${heightInches}"`,
            activityLevel,
            goal,
            dietType,
            mealsPerDay,
          },
          results: {
            targetCalories: targetCalories.toString(),
            protein: `${macros.protein.grams}g`,
            carbs: `${macros.carbs.grams}g`,
            fat: `${macros.fat.grams}g`,
            fiber: `${fiber}g`,
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
  const formatNumber = (value: number): string => {
    return value.toLocaleString();
  };

  const weightUnit = unitSystem === "metric" ? "kg" : "lbs";

  // ─────────────────────────────────────────────────────────────────────────────
  // FAQs
  // ─────────────────────────────────────────────────────────────────────────────
  const defaultFaqs = [
    {
      question: "What are macros?",
      answer: "Macros (macronutrients) are the three main nutrients that provide calories: protein (4 cal/g), carbohydrates (4 cal/g), and fat (9 cal/g). Tracking macros helps ensure you're getting the right balance for your goals."
    },
    {
      question: "Which diet type should I choose?",
      answer: "Standard (30/40/30) works for most people. Choose High-Protein for muscle building, Low-Carb for fat loss, Keto for very low carb dieting, or Zone for balanced hormonal response. Consult a nutritionist for personalized advice."
    },
    {
      question: "How much protein do I need?",
      answer: "General recommendations: 0.8g/kg for sedentary adults, 1.2-1.7g/kg for active individuals, 1.6-2.2g/kg for muscle building, and 2.0-2.4g/kg during aggressive fat loss to preserve muscle."
    },
    {
      question: "Should I count fiber separately?",
      answer: "Fiber is a type of carbohydrate, so it's included in your carb total. However, tracking fiber separately helps ensure you're getting enough (25-38g daily) for digestive health."
    },
    {
      question: "How accurate is this calculator?",
      answer: "This calculator provides estimates based on established formulas. Individual metabolism varies. Use these numbers as a starting point and adjust based on your results over 2-4 weeks."
    },
    {
      question: "What is body recomposition?",
      answer: "Body recomposition (recomp) is simultaneously losing fat and building muscle. It requires eating at maintenance calories with high protein (1.6-2.2g/kg) and consistent strength training."
    },
  ];
  const faqs = translations?.faq || defaultFaqs;

  // ─────────────────────────────────────────────────────────────────────────────
  // SIDEBAR CALCULATORS
  // ─────────────────────────────────────────────────────────────────────────────
  const financeCalcs = ["Mortgage", "Loan", "Compound Interest", "Auto Loan", "Retirement", "Savings"];
  const healthCalcs = ["BMI", "Calorie", "BMR", "TDEE", "Body Fat", "Protein", "Ideal Weight"];

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
              <span className="text-slate-900 font-medium" aria-current="page">Macro Calculator</span>
            </nav>

            {/* Title */}
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl"
                role="img"
                aria-label="Macro Calculator icon"
              >
                🥗
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Macro Calculator</h1>
                <p className="text-slate-600 mt-1">Calculate your daily protein, carbs, and fat targets</p>
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
                        {unit === "imperial" ? "Imperial (lb, in)" : "Metric (kg, cm)"}
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
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>15</span>
                    <span>80</span>
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
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>{unitSystem === "metric" ? "30 kg" : "66 lbs"}</span>
                    <span>{unitSystem === "metric" ? "200 kg" : "440 lbs"}</span>
                  </div>
                </div>

                {/* Height */}
                <div className="mb-6">
                  <label className="block font-medium text-slate-700 mb-2">Height</label>
                  {unitSystem === "imperial" ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="height-feet" className="sr-only">Feet</label>
                        <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2">
                          <input
                            id="height-feet"
                            type="number"
                            min="4"
                            max="7"
                            value={heightFeet}
                            onChange={(e) => handleInputChange(setHeightFeet, Math.max(4, Math.min(7, Number(e.target.value) || 4)))}
                            className="w-full bg-transparent font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <span className="text-slate-600 ml-1">ft</span>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="height-inches" className="sr-only">Inches</label>
                        <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2">
                          <input
                            id="height-inches"
                            type="number"
                            min="0"
                            max="11"
                            value={heightInches}
                            onChange={(e) => handleInputChange(setHeightInches, Math.max(0, Math.min(11, Number(e.target.value) || 0)))}
                            className="w-full bg-transparent font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <span className="text-slate-600 ml-1">in</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2">
                      <label htmlFor="height-cm" className="sr-only">Height in centimeters</label>
                      <input
                        id="height-cm"
                        type="number"
                        min="120"
                        max="220"
                        value={heightCm}
                        onChange={(e) => handleInputChange(setHeightCm, Math.max(120, Math.min(220, Number(e.target.value) || 120)))}
                        className="w-full bg-transparent font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-slate-600 ml-1">cm</span>
                    </div>
                  )}
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
                    {(Object.entries(ACTIVITY_MULTIPLIERS) as [ActivityLevel, typeof ACTIVITY_MULTIPLIERS[ActivityLevel]][]).map(([key, val]) => (
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
                          <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                            ×{val.multiplier}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{val.description}</p>
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
                    {(Object.entries(GOAL_ADJUSTMENTS) as [Goal, typeof GOAL_ADJUSTMENTS[Goal]][]).map(([key, val]) => (
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

                {/* Diet Type */}
                <div className="mb-6">
                  <label id="diet-label" className="block font-medium text-slate-700 mb-2">
                    Diet Type
                  </label>
                  <div 
                    role="radiogroup" 
                    aria-labelledby="diet-label" 
                    className="grid grid-cols-2 gap-2"
                  >
                    {(Object.entries(DIET_PRESETS) as [DietType, DietPreset][]).map(([key, val]) => (
                      <button
                        key={key}
                        onClick={() => handleInputChange(setDietType, key)}
                        role="radio"
                        aria-checked={dietType === key}
                        className={`p-3 rounded-xl border text-left transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          dietType === key
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-medium text-slate-800 text-sm">{val.name}</span>
                          {key !== "custom" && (
                            <span className="text-xs text-blue-600">
                              {val.ratio.protein}/{val.ratio.carbs}/{val.ratio.fat}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600">{val.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Macro Sliders (if custom diet selected) */}
                {dietType === "custom" && (
                  <div className="bg-blue-50 rounded-xl p-4 mb-6">
                    <h4 className="font-medium text-blue-800 mb-4">Custom Macro Ratios</h4>
                    
                    {/* Protein */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <label htmlFor="custom-protein" className="text-sm text-slate-700">Protein</label>
                        <span className="font-bold text-blue-600">{customProtein}%</span>
                      </div>
                      <input
                        id="custom-protein"
                        type="range"
                        min="10"
                        max="60"
                        value={customProtein}
                        onChange={(e) => handleInputChange(setCustomProtein, Number(e.target.value))}
                        className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>

                    {/* Carbs */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <label htmlFor="custom-carbs" className="text-sm text-slate-700">Carbs</label>
                        <span className="font-bold text-blue-600">{customCarbs}%</span>
                      </div>
                      <input
                        id="custom-carbs"
                        type="range"
                        min="5"
                        max="65"
                        value={customCarbs}
                        onChange={(e) => handleInputChange(setCustomCarbs, Number(e.target.value))}
                        className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>

                    {/* Fat */}
                    <div className="mb-2">
                      <div className="flex justify-between items-center mb-1">
                        <label htmlFor="custom-fat" className="text-sm text-slate-700">Fat</label>
                        <span className="font-bold text-blue-600">{customFat}%</span>
                      </div>
                      <input
                        id="custom-fat"
                        type="range"
                        min="10"
                        max="75"
                        value={customFat}
                        onChange={(e) => handleInputChange(setCustomFat, Number(e.target.value))}
                        className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>

                    <p className="text-xs text-blue-600 mt-2">
                      Total: {customProtein + customCarbs + customFat}% 
                      {customProtein + customCarbs + customFat !== 100 && " (will be normalized)"}
                    </p>
                  </div>
                )}

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
                        <p className="text-xs text-slate-600 mt-1">For more accurate protein recommendations</p>
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

                      {/* Show Meal Breakdown Toggle */}
                      <div className="flex items-center justify-between">
                        <label htmlFor="meal-breakdown-toggle" className="font-medium text-slate-700">
                          Show Meal Breakdown
                        </label>
                        <button
                          id="meal-breakdown-toggle"
                          onClick={() => handleInputChange(setShowMealBreakdown, !showMealBreakdown)}
                          role="switch"
                          aria-checked={showMealBreakdown}
                          className={`relative w-12 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            showMealBreakdown ? "bg-blue-600" : "bg-slate-300"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                              showMealBreakdown ? "translate-x-6" : ""
                            }`}
                          />
                        </button>
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
                  aria-label="Macro Results"
                  aria-live="polite"
                >
                  <p className="text-sm text-slate-600 mb-1">Daily Target Calories</p>
                  <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                    {formatNumber(targetCalories)}
                  </p>
                  
                  {/* TDEE Reference */}
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-6">
                    <span>TDEE: {formatNumber(tdee)} cal</span>
                    <span className={`font-medium ${
                      GOAL_ADJUSTMENTS[goal].calorieAdjust < 0 ? "text-amber-600" : 
                      GOAL_ADJUSTMENTS[goal].calorieAdjust > 0 ? "text-green-600" : "text-blue-600"
                    }`}>
                      {GOAL_ADJUSTMENTS[goal].calorieAdjust > 0 ? "+" : ""}
                      {GOAL_ADJUSTMENTS[goal].calorieAdjust} cal ({GOAL_ADJUSTMENTS[goal].label})
                    </span>
                  </div>

                  {/* Macro Cards */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
                      <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-lg">🥩</span>
                      </div>
                      <p className="text-xs text-slate-600">Protein</p>
                      <p className="text-2xl font-bold text-slate-800">{macros.protein.grams}g</p>
                      <p className="text-xs text-slate-600">{macros.protein.calories} cal • {macros.protein.percent}%</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
                      <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-amber-100 flex items-center justify-center">
                        <span className="text-lg">🍞</span>
                      </div>
                      <p className="text-xs text-slate-600">Carbs</p>
                      <p className="text-2xl font-bold text-slate-800">{macros.carbs.grams}g</p>
                      <p className="text-xs text-slate-600">{macros.carbs.calories} cal • {macros.carbs.percent}%</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
                      <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-lg">🥑</span>
                      </div>
                      <p className="text-xs text-slate-600">Fat</p>
                      <p className="text-2xl font-bold text-slate-800">{macros.fat.grams}g</p>
                      <p className="text-xs text-slate-600">{macros.fat.calories} cal • {macros.fat.percent}%</p>
                    </div>
                  </div>
                </div>

                {/* Pie Chart Visual - UNIQUE FEATURE */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">📊 Macro Distribution</h3>
                  <div className="flex items-center gap-6">
                    {/* Simple CSS Pie Chart */}
                    <div 
                      className="w-32 h-32 rounded-full relative"
                      style={{
                        background: `conic-gradient(
                          #ef4444 0% ${macros.protein.percent}%, 
                          #f59e0b ${macros.protein.percent}% ${macros.protein.percent + macros.carbs.percent}%, 
                          #22c55e ${macros.protein.percent + macros.carbs.percent}% 100%
                        )`
                      }}
                      role="img"
                      aria-label={`Macro distribution: Protein ${macros.protein.percent}%, Carbs ${macros.carbs.percent}%, Fat ${macros.fat.percent}%`}
                    >
                      <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center">
                        <span className="text-xs text-slate-600 font-medium">{formatNumber(targetCalories)}<br/>cal</span>
                      </div>
                    </div>
                    {/* Legend */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        <span className="text-sm text-slate-600">Protein: {macros.protein.percent}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                        <span className="text-sm text-slate-600">Carbs: {macros.carbs.percent}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <span className="text-sm text-slate-600">Fat: {macros.fat.percent}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Meal Breakdown - UNIQUE FEATURE */}
                {showMealBreakdown && (
                  <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6 mb-4">
                    <h3 className="font-bold text-blue-800 mb-4">🍽️ Per Meal ({mealsPerDay} meals/day)</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-blue-600">Calories</p>
                        <p className="text-2xl font-bold text-blue-800">{mealBreakdown.calories}</p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-600">Protein</p>
                        <p className="text-2xl font-bold text-blue-800">{mealBreakdown.protein}g</p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-600">Carbs</p>
                        <p className="text-2xl font-bold text-blue-800">{mealBreakdown.carbs}g</p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-600">Fat</p>
                        <p className="text-2xl font-bold text-blue-800">{mealBreakdown.fat}g</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Lean Mass Protein - Shows if body fat entered */}
                {leanMassProtein !== null && (
                  <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 mb-4">
                    <h3 className="font-bold text-amber-800 mb-2">💪 Protein Based on Lean Mass</h3>
                    <p className="text-3xl font-bold text-amber-800">{leanMassProtein}g/day</p>
                    <p className="text-sm text-amber-600 mt-2">
                      Based on 1g per lb of lean body mass (~{Math.round((unitSystem === "metric" ? weightKg : weightLbs) * (1 - (bodyFatPercent || 0) / 100))} {weightUnit} lean mass)
                    </p>
                  </div>
                )}

                {/* Additional Info */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">📋 Daily Targets</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-700">Fiber</span>
                      <span className="font-bold text-slate-800">{fiber}g</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-700">Water</span>
                      <span className="font-bold text-slate-800">~{Math.round((unitSystem === "metric" ? weightKg : weightLbs * 0.453592) * 0.033 * 10) / 10}L</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-700">BMR</span>
                      <span className="font-bold text-slate-800">{formatNumber(bmr)} cal</span>
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
                <h3 className="text-lg font-bold text-slate-900 mb-4">🥗 Diet Presets Explained</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Standard (30/40/30):</strong> Balanced for general health and fitness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Low-Carb (35/25/40):</strong> Reduced carbs, good for fat loss</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Keto (25/5/70):</strong> Very low carb for ketosis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>High-Protein (40/35/25):</strong> For muscle building</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">💡 Tips for Success</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Track your food for 1-2 weeks to build awareness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Prioritize protein at every meal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Adjust based on results after 2-4 weeks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Focus on whole foods over processed options</span>
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
              30-year-old male, 170 lbs, 5&apos;10&quot;, moderately active, goal: maintain weight, standard diet
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Step 1: Calculate TDEE</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>BMR = 1,720 cal</p>
                  <p>TDEE = 1,720 × 1.55</p>
                  <p className="font-bold text-blue-600">TDEE = 2,666 cal</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Step 2: Apply Goal</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>Maintain = TDEE + 0</p>
                  <p className="font-bold text-blue-600">Target = 2,666 cal</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Step 3: Calculate Macros</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>Protein: 2,666 × 30% ÷ 4 = 200g</p>
                  <p>Carbs: 2,666 × 40% ÷ 4 = 267g</p>
                  <p>Fat: 2,666 × 30% ÷ 9 = 89g</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────────────
            EDUCATIONAL CONTENT + SIDEBAR
        ───────────────────────────────────────────────────────────────────────── */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content - 2 columns */}
              <div className="lg:col-span-2 space-y-8">
                {/* What are Macros */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">What are Macronutrients?</h2>
                  <p className="text-slate-600 mb-4">
                    Macronutrients (macros) are the three main nutrients that provide calories and energy: protein, carbohydrates, and fat. Each plays a unique role in your body:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-red-50 rounded-xl p-4">
                      <h3 className="font-bold text-red-800 mb-2">🥩 Protein (4 cal/g)</h3>
                      <p className="text-sm text-slate-600">Builds and repairs muscle, supports immune function, keeps you feeling full.</p>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4">
                      <h3 className="font-bold text-amber-800 mb-2">🍞 Carbs (4 cal/g)</h3>
                      <p className="text-sm text-slate-600">Primary energy source, fuels brain and muscles, supports exercise performance.</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <h3 className="font-bold text-green-800 mb-2">🥑 Fat (9 cal/g)</h3>
                      <p className="text-sm text-slate-600">Hormone production, nutrient absorption, brain health, long-lasting energy.</p>
                    </div>
                  </div>
                </div>

                {/* FAQ Section */}
                <div>
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
                  <h3 className="font-bold mb-2">⚡ Calculate Your TDEE First</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Get a detailed breakdown of your daily energy expenditure with our TDEE Calculator.
                  </p>
                  <Link
                    href={`/${locale}/tdee-calculator`}
                    className="inline-block bg-white text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Try TDEE Calculator →
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
