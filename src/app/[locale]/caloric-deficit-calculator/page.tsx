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
const CALCULATOR_SLUG = "caloric-deficit-calculator";
const CALCULATOR_NAME = "Caloric Deficit Calculator";
const CALCULATOR_CATEGORY = "health";

// =============================================================================
// TYPES
// =============================================================================
type UnitSystem = "metric" | "imperial";
type Gender = "male" | "female";
type Goal = "lose" | "maintain" | "gain";
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "veryActive";

// =============================================================================
// ACTIVITY MULTIPLIERS
// =============================================================================
const ACTIVITY_LEVELS: Record<ActivityLevel, { label: string; description: string; multiplier: number }> = {
  sedentary: { label: "Sedentary", description: "Little or no exercise, desk job", multiplier: 1.2 },
  light: { label: "Lightly Active", description: "Light exercise 1-3 days/week", multiplier: 1.375 },
  moderate: { label: "Moderately Active", description: "Moderate exercise 3-5 days/week", multiplier: 1.55 },
  active: { label: "Very Active", description: "Hard exercise 6-7 days/week", multiplier: 1.725 },
  veryActive: { label: "Extremely Active", description: "Very hard exercise, physical job", multiplier: 1.9 },
};

// =============================================================================
// GOAL CONFIGURATIONS
// =============================================================================
const GOALS: Record<Goal, { label: string; icon: string }> = {
  lose: { label: "Lose Weight", icon: "📉" },
  maintain: { label: "Maintain", icon: "⚖️" },
  gain: { label: "Gain Muscle", icon: "📈" },
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function CaloricDeficitCalculatorPage() {
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
  const [weightLbs, setWeightLbs] = useState(180);
  const [weightKg, setWeightKg] = useState(82);
  
  // Target Weight
  const [targetWeightLbs, setTargetWeightLbs] = useState(160);
  const [targetWeightKg, setTargetWeightKg] = useState(73);
  
  // Height
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(10);
  const [heightCm, setHeightCm] = useState(178);
  
  // Activity & Goal
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<Goal>("lose");
  const [weeklyRate, setWeeklyRate] = useState(1);

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
  const getWeightKg = (): number => {
    return unitSystem === "imperial" ? weightLbs * 0.453592 : weightKg;
  };

  const getHeightCm = (): number => {
    return unitSystem === "metric" ? heightCm : (heightFeet * 12 + heightInches) * 2.54;
  };

  // BMR using Mifflin-St Jeor Equation
  const calculateBMR = (): number => {
    const w = getWeightKg();
    const h = getHeightCm();
    if (gender === "male") {
      return 10 * w + 6.25 * h - 5 * age + 5;
    } else {
      return 10 * w + 6.25 * h - 5 * age - 161;
    }
  };

  const bmr = Math.round(calculateBMR());
  const tdee = Math.round(bmr * ACTIVITY_LEVELS[activityLevel].multiplier);

  // Calculate deficit/surplus
  const dailyChange = Math.round((weeklyRate * 3500) / 7);
  let targetCalories = tdee;
  let deficit = 0;

  if (goal === "lose") {
    targetCalories = tdee - dailyChange;
    deficit = dailyChange;
  } else if (goal === "gain") {
    targetCalories = tdee + dailyChange;
  }

  // Minimum calorie floor
  const minCalories = gender === "male" ? 1500 : 1200;
  const warnings: string[] = [];
  
  if (targetCalories < minCalories && goal === "lose") {
    warnings.push(`Target (${targetCalories} cal) is below minimum ${minCalories}. Consider slower rate.`);
  }

  const finalTargetCalories = Math.max(targetCalories, goal === "lose" ? minCalories : targetCalories);

  // Macros (30% protein, 35% carbs, 35% fat)
  const proteinGrams = Math.round((finalTargetCalories * 0.30) / 4);
  const carbGrams = Math.round((finalTargetCalories * 0.35) / 4);
  const fatGrams = Math.round((finalTargetCalories * 0.35) / 9);

  // Time to goal
  const currentWeightKg = getWeightKg();
  const targetWeightKgCalc = unitSystem === "imperial" ? targetWeightLbs * 0.453592 : targetWeightKg;
  const weightDiffLbs = Math.abs(currentWeightKg - targetWeightKgCalc) * 2.20462;
  const weeksToGoal = goal === "maintain" ? 0 : Math.ceil(weightDiffLbs / weeklyRate);

  const goalDate = new Date();
  goalDate.setDate(goalDate.getDate() + weeksToGoal * 7);

  // Meal distribution
  const mealPlan = {
    breakfast: Math.round(finalTargetCalories * 0.25),
    lunch: Math.round(finalTargetCalories * 0.35),
    dinner: Math.round(finalTargetCalories * 0.30),
    snacks: Math.round(finalTargetCalories * 0.10),
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
            gender,
            age,
            weight: unitSystem === "imperial" ? `${weightLbs} lbs` : `${weightKg} kg`,
            activityLevel: ACTIVITY_LEVELS[activityLevel].label,
            goal,
          },
          results: {
            bmr: bmr.toString(),
            tdee: tdee.toString(),
            targetCalories: finalTargetCalories.toString(),
            weeksToGoal: weeksToGoal.toString(),
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
      question: "How much of a caloric deficit is safe?",
      answer: "A deficit of 500-750 cal/day is optimal for most people. Don't go below 1200 (women) or 1500 (men) calories without medical supervision. Larger deficits can trigger metabolic adaptation and muscle loss."
    },
    {
      question: "Why am I not losing weight in a deficit?",
      answer: "Common reasons: underestimating food intake, overestimating exercise calories, water retention masking fat loss, or metabolic adaptation. Track accurately for 2-3 weeks before adjusting."
    },
    {
      question: "Should I eat back exercise calories?",
      answer: "If you're already at a moderate deficit (500 cal), eating back half your exercise calories prevents excessive restriction. Listen to your hunger signals."
    },
    {
      question: "How do I break a weight loss plateau?",
      answer: "Options: recalculate TDEE at your new weight, take a diet break at maintenance for 1-2 weeks, increase protein, or change your exercise routine."
    },
    {
      question: "Is it better to cut carbs or fat?",
      answer: "For weight loss, total calories matter most. Protein should stay high (0.7-1g per pound). Adjust carbs and fats based on preference and energy needs."
    },
    {
      question: "How accurate is the TDEE calculation?",
      answer: "TDEE formulas estimate within 10-15% for most people. Use as a starting point, then adjust based on real-world results over 2-4 weeks."
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
              <span className="text-slate-900 font-medium" aria-current="page">Caloric Deficit Calculator</span>
            </nav>

            {/* Title */}
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl"
                role="img"
                aria-label="Caloric Deficit Calculator icon"
              >
                📉
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Caloric Deficit Calculator</h1>
                <p className="text-slate-600 mt-1">Calculate your ideal calorie intake for weight loss, maintenance, or gain</p>
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
                  <div role="radiogroup" aria-labelledby="unit-system-label" className="grid grid-cols-2 gap-2">
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
                  <div role="radiogroup" aria-labelledby="gender-label" className="grid grid-cols-2 gap-2">
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
                    <label htmlFor="age-input" className="font-medium text-slate-700">Age</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        id="age-input"
                        type="number"
                        min="15"
                        max="80"
                        value={age}
                        onChange={(e) => handleInputChange(setAge, Math.max(15, Math.min(80, Number(e.target.value) || 30)))}
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

                {/* Height */}
                <div className="mb-6">
                  <label className="block font-medium text-slate-700 mb-2">Height</label>
                  {unitSystem === "imperial" ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2">
                        <input
                          type="number"
                          min="4"
                          max="7"
                          value={heightFeet}
                          onChange={(e) => handleInputChange(setHeightFeet, Math.max(4, Math.min(7, Number(e.target.value) || 5)))}
                          className="w-full bg-transparent font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <span className="text-slate-600 ml-1">ft</span>
                      </div>
                      <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2">
                        <input
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
                  ) : (
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2">
                      <input
                        type="number"
                        min="140"
                        max="220"
                        value={heightCm}
                        onChange={(e) => handleInputChange(setHeightCm, Math.max(140, Math.min(220, Number(e.target.value) || 170)))}
                        className="w-full bg-transparent font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-slate-600 ml-1">cm</span>
                    </div>
                  )}
                </div>

                {/* Weight */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="weight-input" className="font-medium text-slate-700">Current Weight</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        id="weight-input"
                        type="number"
                        value={unitSystem === "imperial" ? weightLbs : weightKg}
                        onChange={(e) => {
                          const val = Number(e.target.value) || (unitSystem === "imperial" ? 180 : 82);
                          if (unitSystem === "imperial") {
                            handleInputChange(setWeightLbs, val);
                          } else {
                            handleInputChange(setWeightKg, val);
                          }
                        }}
                        className="w-16 bg-transparent text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-slate-600 ml-1">{weightUnit}</span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 my-6"></div>

                {/* Activity Level */}
                <div className="mb-6">
                  <label id="activity-label" className="block font-medium text-slate-700 mb-2">Activity Level</label>
                  <div role="radiogroup" aria-labelledby="activity-label" className="space-y-2">
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
                  <label id="goal-label" className="block font-medium text-slate-700 mb-2">Your Goal</label>
                  <div role="radiogroup" aria-labelledby="goal-label" className="grid grid-cols-3 gap-2">
                    {(Object.entries(GOALS) as [Goal, typeof GOALS[Goal]][]).map(([key, val]) => (
                      <button
                        key={key}
                        onClick={() => handleInputChange(setGoal, key)}
                        role="radio"
                        aria-checked={goal === key}
                        className={`p-3 rounded-xl border text-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          goal === key
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

                {/* Rate (only for lose/gain) */}
                {goal !== "maintain" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="target-weight" className="block font-medium text-slate-700 mb-2 text-sm">
                        Target Weight ({weightUnit})
                      </label>
                      <input
                        id="target-weight"
                        type="number"
                        value={unitSystem === "imperial" ? targetWeightLbs : targetWeightKg}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (unitSystem === "imperial") {
                            handleInputChange(setTargetWeightLbs, val);
                          } else {
                            handleInputChange(setTargetWeightKg, val);
                          }
                        }}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="weekly-rate" className="block font-medium text-slate-700 mb-2 text-sm">
                        {goal === "lose" ? "Lose" : "Gain"} per week
                      </label>
                      <select
                        id="weekly-rate"
                        value={weeklyRate}
                        onChange={(e) => handleInputChange(setWeeklyRate, parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      >
                        <option value={0.5}>0.5 lbs (Slow)</option>
                        <option value={1}>1 lb (Recommended)</option>
                        <option value={1.5}>1.5 lbs (Moderate)</option>
                        <option value={2}>2 lbs (Aggressive)</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* ═══════════════════════════════════════════════════════════════════
                  RIGHT COLUMN - RESULTS
              ═══════════════════════════════════════════════════════════════════ */}
              <div>
                {/* Warnings */}
                {warnings.length > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                    {warnings.map((warning, index) => (
                      <p key={index} className="text-amber-800 text-sm flex items-start gap-2">
                        <span>⚠️</span> {warning}
                      </p>
                    ))}
                  </div>
                )}

                {/* Main Result */}
                <div 
                  className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4"
                  role="region"
                  aria-label="Caloric Deficit Results"
                  aria-live="polite"
                >
                  <p className="text-sm text-slate-600 mb-1">Daily Calorie Target</p>
                  <p className="text-4xl md:text-5xl font-bold text-slate-900">{finalTargetCalories.toLocaleString()}</p>
                  <p className="text-slate-600 mt-2">
                    calories per day
                    {deficit > 0 && ` • ${deficit} cal deficit`}
                  </p>
                  
                  {/* TDEE Comparison */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">BMR (Base)</span>
                      <span className="font-medium text-slate-800">{bmr.toLocaleString()} cal</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">TDEE (Maintenance)</span>
                      <span className="font-bold text-blue-600">{tdee.toLocaleString()} cal</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full mt-3 overflow-hidden">
                      <div 
                        className="h-full bg-blue-500"
                        style={{ width: `${Math.min(100, (finalTargetCalories / tdee) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                {goal !== "maintain" && (
                  <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6 mb-4">
                    <h3 className="font-bold text-blue-800 mb-2">📅 Timeline to Goal</h3>
                    <p className="text-3xl font-bold text-blue-800">{weeksToGoal} weeks</p>
                    <p className="text-sm text-blue-600 mt-2">
                      Estimated: {goalDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                )}

                {/* Macros */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">🍽️ Daily Macro Targets</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-50 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-blue-600">{proteinGrams}g</p>
                      <p className="text-xs text-slate-600">Protein (30%)</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-blue-600">{carbGrams}g</p>
                      <p className="text-xs text-slate-600">Carbs (35%)</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-blue-600">{fatGrams}g</p>
                      <p className="text-xs text-slate-600">Fat (35%)</p>
                    </div>
                  </div>
                </div>

                {/* Meal Distribution */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">🕐 Meal Distribution</h3>
                  <div className="space-y-2">
                    {Object.entries(mealPlan).map(([meal, cal]) => (
                      <div key={meal} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                        <span className="text-slate-700 capitalize">{meal}</span>
                        <span className="font-bold text-blue-600">{cal} cal</span>
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
                <h3 className="text-lg font-bold text-slate-900 mb-4">🔬 BMR vs TDEE</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>BMR:</strong> Calories burned at complete rest</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>TDEE:</strong> BMR + daily activity calories</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Deficit:</strong> Eat less than TDEE to lose weight</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>500 cal/day deficit ≈ 1 lb/week loss</strong></span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">💡 Deficit Guidelines</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>250 cal/day = 0.5 lb/week (slow & steady)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>500 cal/day = 1 lb/week ⭐ Recommended</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>750 cal/day = 1.5 lb/week (moderate)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>1000 cal/day = 2 lb/week (maximum safe)</span>
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
              30-year-old male, 5&apos;10&quot;, 180 lbs, moderately active, goal: lose 1 lb/week
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Step 1: Calculate BMR</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>BMR = (10 × 81.6 kg) + (6.25 × 177.8 cm) - (5 × 30) + 5</p>
                  <p className="font-bold text-blue-600 mt-2">BMR = 1,777 calories</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Step 2: TDEE & Target</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>TDEE = 1,777 × 1.55 = 2,754 cal</p>
                  <p>Deficit = 500 cal/day (1 lb/week)</p>
                  <p className="font-bold text-blue-600 mt-2">Target = 2,254 cal/day</p>
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding Caloric Deficit</h2>
                  <p className="text-slate-600 mb-4">
                    A caloric deficit occurs when you consume fewer calories than your body burns. This forces your body to use stored energy (primarily fat) for fuel, resulting in weight loss.
                  </p>
                  <p className="text-slate-600">
                    The key is finding a sustainable deficit that promotes fat loss while preserving muscle mass. A moderate deficit of 500-750 calories preserves muscle and metabolism.
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
                    <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-sm">💪</span>
                    Health Calculators
                  </h3>
                  <div className="space-y-2">
                    {healthCalcs.map((calc) => (
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
                  <h3 className="font-bold mb-2">🔥 Track Your Burns</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Find out how many calories you burn during exercise.
                  </p>
                  <Link href={`/${locale}/calories-burned-calculator`} className="inline-block bg-white text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                    Try Calories Burned Calculator →
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
