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
const CALCULATOR_SLUG = "tdee-calculator";
const CALCULATOR_NAME = "TDEE Calculator";
const CALCULATOR_CATEGORY = "health";

// =============================================================================
// TYPES
// =============================================================================
type UnitSystem = "metric" | "imperial";
type Gender = "male" | "female";
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "veryActive" | "extraActive";
type Formula = "mifflin" | "harris" | "katch";
type Goal = "lose" | "maintain" | "gain";
type PregnancyStatus = "none" | "trimester1" | "trimester2" | "trimester3";
type BreastfeedingStatus = "none" | "exclusive" | "partial";

// =============================================================================
// ACTIVITY MULTIPLIERS
// =============================================================================
const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
  extraActive: 2.0,
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function TDEECalculatorPage() {
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
  const [weightLbs, setWeightLbs] = useState(170);
  const [weightKg, setWeightKg] = useState(77);
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(10);
  const [heightCm, setHeightCm] = useState(178);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [formula, setFormula] = useState<Formula>("mifflin");
  const [bodyFatPercent, setBodyFatPercent] = useState<number | null>(null);
  const [goal, setGoal] = useState<Goal>("maintain");
  
  // Advanced options
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [pregnancyStatus, setPregnancyStatus] = useState<PregnancyStatus>("none");
  const [breastfeedingStatus, setBreastfeedingStatus] = useState<BreastfeedingStatus>("none");

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
    return unitSystem === "metric" ? weightKg : weightLbs * 0.453592;
  };

  const getHeightCm = (): number => {
    return unitSystem === "metric" ? heightCm : (heightFeet * 12 + heightInches) * 2.54;
  };

  const calculateBMR = (formulaType: Formula = formula): number => {
    const weight = getWeightKg();
    const height = getHeightCm();

    if (formulaType === "katch" && bodyFatPercent !== null) {
      // Katch-McArdle: Uses lean body mass
      const leanMass = weight * (1 - bodyFatPercent / 100);
      return 370 + 21.6 * leanMass;
    }

    if (formulaType === "harris") {
      // Harris-Benedict Revised
      if (gender === "male") {
        return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
      } else {
        return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
      }
    }

    // Mifflin-St Jeor (default, most accurate)
    if (gender === "male") {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  };

  const getPregnancyCalories = (): number => {
    if (gender !== "female") return 0;
    switch (pregnancyStatus) {
      case "trimester1": return 0;
      case "trimester2": return 340;
      case "trimester3": return 450;
      default: return 0;
    }
  };

  const getBreastfeedingCalories = (): number => {
    if (gender !== "female") return 0;
    switch (breastfeedingStatus) {
      case "exclusive": return 500;
      case "partial": return 250;
      default: return 0;
    }
  };

  const bmr = calculateBMR();
  const bmrHarris = calculateBMR("harris");
  const bmrKatch = bodyFatPercent !== null ? calculateBMR("katch") : null;
  
  const activityMultiplier = ACTIVITY_MULTIPLIERS[activityLevel];
  const exerciseCalories = bmr * (activityMultiplier - 1);
  const tefCalories = bmr * 0.1; // Thermic Effect of Food (~10%)
  
  const baseTDEE = bmr * activityMultiplier;
  const pregnancyAdjustment = getPregnancyCalories();
  const breastfeedingAdjustment = getBreastfeedingCalories();
  const tdee = baseTDEE + pregnancyAdjustment + breastfeedingAdjustment;

  // Goal-based calories
  const getGoalCalories = (): number => {
    switch (goal) {
      case "lose": return tdee - 500;
      case "gain": return tdee + 500;
      default: return tdee;
    }
  };

  const goalCalories = getGoalCalories();

  // Weekly view
  const weeklyTDEE = tdee * 7;
  const weeklyGoalCalories = goalCalories * 7;

  // TDEE breakdown percentages
  const totalComponents = bmr + exerciseCalories + tefCalories;
  const bmrPercent = (bmr / totalComponents) * 100;
  const exercisePercent = (exerciseCalories / totalComponents) * 100;
  const tefPercent = (tefCalories / totalComponents) * 100;

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
            formula,
            bodyFatPercent,
            goal,
            pregnancyStatus,
            breastfeedingStatus,
          },
          results: {
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            goalCalories: Math.round(goalCalories),
            weeklyTDEE: Math.round(weeklyTDEE),
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
    return Math.round(value).toLocaleString();
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // FAQs
  // ─────────────────────────────────────────────────────────────────────────────
  const defaultFaqs = [
    {
      question: "What is TDEE?",
      answer: "TDEE (Total Daily Energy Expenditure) is the total number of calories you burn each day. It includes your Basal Metabolic Rate (BMR), the calories burned through physical activity, and the thermic effect of food (energy used to digest food)."
    },
    {
      question: "How is TDEE different from BMR?",
      answer: "BMR (Basal Metabolic Rate) is the calories your body burns at complete rest just to maintain vital functions. TDEE adds your activity level on top of BMR, giving you the total calories you burn in a day including exercise and daily activities."
    },
    {
      question: "How accurate is the TDEE calculation?",
      answer: "TDEE calculations are estimates based on formulas. Actual energy expenditure varies based on genetics, muscle mass, hormones, and other factors. Use your calculated TDEE as a starting point and adjust based on real-world results over 2-4 weeks."
    },
    {
      question: "How do I use TDEE for weight loss?",
      answer: "To lose weight, eat fewer calories than your TDEE. A deficit of 500 calories per day typically results in about 1 pound of weight loss per week. Don't go below 1,200 calories (women) or 1,500 calories (men) without medical supervision."
    },
    {
      question: "How do I use TDEE for muscle gain?",
      answer: "To build muscle, eat slightly more than your TDEE (a surplus of 250-500 calories) while following a strength training program. This provides the extra energy needed for muscle growth while minimizing fat gain."
    },
    {
      question: "Why does pregnancy affect TDEE?",
      answer: "Pregnancy increases calorie needs to support fetal growth and development. The 2nd trimester requires about 340 extra calories, and the 3rd trimester requires about 450 extra calories. Always consult your healthcare provider for personalized advice."
    },
  ];
  const faqs = translations?.faq || defaultFaqs;

  // ─────────────────────────────────────────────────────────────────────────────
  // SIDEBAR CALCULATORS
  // ─────────────────────────────────────────────────────────────────────────────
  const financeCalcs = ["Mortgage", "Loan", "Compound Interest", "Auto Loan", "Personal Loan", "Retirement", "Investment", "Savings", "Income Tax", "401K", "Credit Card Payoff"];
  const healthCalcs = ["BMI", "Calorie", "Body Fat", "BMR", "Macro", "Protein", "Ideal Weight"];

  // ─────────────────────────────────────────────────────────────────────────────
  // ACTIVITY LEVEL OPTIONS
  // ─────────────────────────────────────────────────────────────────────────────
  const activityOptions: { value: ActivityLevel; label: string; description: string }[] = [
    { value: "sedentary", label: "Sedentary", description: "Little or no exercise, desk job" },
    { value: "light", label: "Lightly Active", description: "Light exercise 1-3 days/week" },
    { value: "moderate", label: "Moderately Active", description: "Moderate exercise 3-5 days/week" },
    { value: "active", label: "Active", description: "Hard exercise 6-7 days/week" },
    { value: "veryActive", label: "Very Active", description: "Hard daily exercise + physical job" },
    { value: "extraActive", label: "Extra Active", description: "Athlete or very hard exercise twice/day" },
  ];

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
        <section className="bg-gradient-to-b from-blue-50 to-white py-8 md:py-12">
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
              <span className="text-slate-900 font-medium" aria-current="page">TDEE Calculator</span>
            </nav>

            {/* Title */}
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl"
                role="img"
                aria-label="TDEE Calculator icon"
              >
                ⚡
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">TDEE Calculator</h1>
                <p className="text-slate-600 mt-1">Calculate your Total Daily Energy Expenditure</p>
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
                        {unit === "imperial" ? "Imperial (lb, ft)" : "Metric (kg, cm)"}
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
                        aria-describedby="age-range"
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
                  <div id="age-range" className="flex justify-between text-xs text-slate-600 mt-1">
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
                      <span className="text-slate-600 ml-1">{unitSystem === "metric" ? "kg" : "lbs"}</span>
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
                    {activityOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleInputChange(setActivityLevel, option.value)}
                        role="radio"
                        aria-checked={activityLevel === option.value}
                        className={`w-full text-left p-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          activityLevel === option.value
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        <span className="font-medium">{option.label}</span>
                        <span className={`block text-sm ${activityLevel === option.value ? "text-blue-100" : "text-slate-600"}`}>
                          {option.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Goal */}
                <div className="mb-6">
                  <label id="goal-label" className="block font-medium text-slate-700 mb-2">
                    Your Goal
                  </label>
                  <div 
                    role="radiogroup" 
                    aria-labelledby="goal-label" 
                    className="grid grid-cols-3 gap-2"
                  >
                    {([
                      { value: "lose", label: "Lose Fat", icon: "📉" },
                      { value: "maintain", label: "Maintain", icon: "⚖️" },
                      { value: "gain", label: "Build Muscle", icon: "💪" },
                    ] as const).map((g) => (
                      <button
                        key={g.value}
                        onClick={() => handleInputChange(setGoal, g.value)}
                        role="radio"
                        aria-checked={goal === g.value}
                        className={`py-3 px-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          goal === g.value
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        <span className="block text-lg mb-1" aria-hidden="true">{g.icon}</span>
                        {g.label}
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
                      {/* Formula Selection */}
                      <div>
                        <label id="formula-label" className="block font-medium text-slate-700 mb-2">
                          BMR Formula
                        </label>
                        <div 
                          role="radiogroup" 
                          aria-labelledby="formula-label" 
                          className="grid grid-cols-3 gap-2"
                        >
                          {([
                            { value: "mifflin", label: "Mifflin-St Jeor" },
                            { value: "harris", label: "Harris-Benedict" },
                            { value: "katch", label: "Katch-McArdle" },
                          ] as const).map((f) => (
                            <button
                              key={f.value}
                              onClick={() => handleInputChange(setFormula, f.value)}
                              role="radio"
                              aria-checked={formula === f.value}
                              disabled={f.value === "katch" && bodyFatPercent === null}
                              className={`py-2 px-2 rounded-lg text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                formula === f.value
                                  ? "bg-blue-600 text-white"
                                  : f.value === "katch" && bodyFatPercent === null
                                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                              }`}
                            >
                              {f.label}
                            </button>
                          ))}
                        </div>
                        {formula === "katch" && bodyFatPercent === null && (
                          <p className="text-xs text-amber-600 mt-1">Enter body fat % below to use Katch-McArdle</p>
                        )}
                      </div>

                      {/* Body Fat % */}
                      <div>
                        <label htmlFor="body-fat-input" className="block font-medium text-slate-700 mb-2">
                          Body Fat % <span className="text-slate-400 font-normal">(optional)</span>
                        </label>
                        <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2">
                          <input
                            id="body-fat-input"
                            type="number"
                            min="3"
                            max="60"
                            placeholder="e.g., 20"
                            value={bodyFatPercent ?? ""}
                            onChange={(e) => {
                              const val = e.target.value === "" ? null : Math.max(3, Math.min(60, Number(e.target.value)));
                              handleInputChange(setBodyFatPercent, val);
                            }}
                            className="w-full bg-transparent font-bold text-blue-600 focus:outline-none placeholder:text-slate-400 placeholder:font-normal [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <span className="text-slate-600 ml-1">%</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">Improves accuracy if known. Use our Body Fat Calculator.</p>
                      </div>

                      {/* Female-specific options */}
                      {gender === "female" && (
                        <>
                          {/* Pregnancy Status */}
                          <div>
                            <label id="pregnancy-label" className="block font-medium text-slate-700 mb-2">
                              🤰 Pregnancy Status
                            </label>
                            <div 
                              role="radiogroup" 
                              aria-labelledby="pregnancy-label" 
                              className="grid grid-cols-2 gap-2"
                            >
                              {([
                                { value: "none", label: "Not Pregnant" },
                                { value: "trimester1", label: "1st Trimester" },
                                { value: "trimester2", label: "2nd Trimester" },
                                { value: "trimester3", label: "3rd Trimester" },
                              ] as const).map((p) => (
                                <button
                                  key={p.value}
                                  onClick={() => handleInputChange(setPregnancyStatus, p.value)}
                                  role="radio"
                                  aria-checked={pregnancyStatus === p.value}
                                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    pregnancyStatus === p.value
                                      ? "bg-blue-600 text-white"
                                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                  }`}
                                >
                                  {p.label}
                                </button>
                              ))}
                            </div>
                            {pregnancyStatus !== "none" && (
                              <p className="text-xs text-blue-600 mt-1">
                                +{getPregnancyCalories()} calories/day added
                              </p>
                            )}
                          </div>

                          {/* Breastfeeding Status */}
                          <div>
                            <label id="breastfeeding-label" className="block font-medium text-slate-700 mb-2">
                              🍼 Breastfeeding
                            </label>
                            <div 
                              role="radiogroup" 
                              aria-labelledby="breastfeeding-label" 
                              className="grid grid-cols-3 gap-2"
                            >
                              {([
                                { value: "none", label: "No" },
                                { value: "exclusive", label: "Exclusive" },
                                { value: "partial", label: "Partial" },
                              ] as const).map((b) => (
                                <button
                                  key={b.value}
                                  onClick={() => handleInputChange(setBreastfeedingStatus, b.value)}
                                  role="radio"
                                  aria-checked={breastfeedingStatus === b.value}
                                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    breastfeedingStatus === b.value
                                      ? "bg-blue-600 text-white"
                                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                  }`}
                                >
                                  {b.label}
                                </button>
                              ))}
                            </div>
                            {breastfeedingStatus !== "none" && (
                              <p className="text-xs text-blue-600 mt-1">
                                +{getBreastfeedingCalories()} calories/day added
                              </p>
                            )}
                          </div>
                        </>
                      )}
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
                  aria-label="TDEE Results"
                  aria-live="polite"
                >
                  <p className="text-sm text-slate-600 mb-1">Your Daily Energy Expenditure (TDEE)</p>
                  <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                    {formatNumber(tdee)} <span className="text-2xl font-normal text-slate-600">cal/day</span>
                  </p>
                  
                  {/* Goal-based recommendation */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-6 ${
                    goal === "lose" ? "bg-amber-100 text-amber-800" :
                    goal === "gain" ? "bg-blue-100 text-blue-700" :
                    "bg-blue-100 text-blue-700"
                  }`}>
                    {goal === "lose" && "📉 To lose weight: "}
                    {goal === "gain" && "💪 To build muscle: "}
                    {goal === "maintain" && "⚖️ To maintain: "}
                    <span className="font-bold">{formatNumber(goalCalories)} cal/day</span>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">BMR (Resting)</p>
                      <p className="text-xl font-bold text-slate-800">{formatNumber(bmr)} cal</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Weekly TDEE</p>
                      <p className="text-xl font-bold text-slate-800">{formatNumber(weeklyTDEE)} cal</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Activity Multiplier</p>
                      <p className="text-xl font-bold text-blue-600">×{activityMultiplier.toFixed(2)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Weekly Goal</p>
                      <p className="text-xl font-bold text-slate-800">{formatNumber(weeklyGoalCalories)} cal</p>
                    </div>
                  </div>
                </div>

                {/* TDEE Breakdown Bar - UNIQUE FEATURE */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">⚡ TDEE Breakdown</h3>
                  <div className="h-8 rounded-full overflow-hidden flex" role="img" aria-label={`TDEE breakdown: BMR ${bmrPercent.toFixed(0)}%, Exercise ${exercisePercent.toFixed(0)}%, TEF ${tefPercent.toFixed(0)}%`}>
                    <div 
                      className="bg-blue-600 transition-all flex items-center justify-center text-white text-xs font-medium" 
                      style={{ width: `${bmrPercent}%` }}
                      aria-hidden="true"
                    >
                      {bmrPercent > 15 && `${bmrPercent.toFixed(0)}%`}
                    </div>
                    <div 
                      className="bg-amber-400 transition-all flex items-center justify-center text-slate-800 text-xs font-medium" 
                      style={{ width: `${exercisePercent}%` }}
                      aria-hidden="true"
                    >
                      {exercisePercent > 10 && `${exercisePercent.toFixed(0)}%`}
                    </div>
                    <div 
                      className="bg-blue-400 transition-all flex items-center justify-center text-white text-xs font-medium" 
                      style={{ width: `${tefPercent}%` }}
                      aria-hidden="true"
                    >
                      {tefPercent > 8 && `${tefPercent.toFixed(0)}%`}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-blue-600" aria-hidden="true"></span>
                      <span className="text-slate-600">BMR: {formatNumber(bmr)} cal ({bmrPercent.toFixed(0)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-amber-400" aria-hidden="true"></span>
                      <span className="text-slate-600">Exercise: {formatNumber(exerciseCalories)} cal ({exercisePercent.toFixed(0)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-blue-400" aria-hidden="true"></span>
                      <span className="text-slate-600">TEF: {formatNumber(tefCalories)} cal ({tefPercent.toFixed(0)}%)</span>
                    </div>
                  </div>
                </div>

                {/* Weekly View - UNIQUE FEATURE */}
                <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6 mb-4">
                  <h3 className="font-bold text-blue-800 mb-4">📅 Weekly Calorie View</h3>
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <div key={day} className="text-center">
                        <p className="text-xs text-blue-600 font-medium">{day}</p>
                        <p className="text-sm font-bold text-blue-800">{formatNumber(goalCalories)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-blue-200">
                    <span className="text-blue-700 font-medium">Weekly Total:</span>
                    <span className="text-2xl font-bold text-blue-800">{formatNumber(weeklyGoalCalories)} cal</span>
                  </div>
                </div>

                {/* Calorie Targets */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">🎯 Calorie Targets by Goal</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                      <span className="text-slate-700">Aggressive Loss (-1000 cal)</span>
                      <span className="font-bold text-amber-800">{formatNumber(tdee - 1000)} cal</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                      <span className="text-slate-700">Moderate Loss (-500 cal)</span>
                      <span className="font-bold text-amber-600">{formatNumber(tdee - 500)} cal</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                      <span className="text-slate-700 font-medium">Maintain Weight</span>
                      <span className="font-bold text-blue-700">{formatNumber(tdee)} cal</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-slate-700">Lean Gain (+250 cal)</span>
                      <span className="font-bold text-blue-600">{formatNumber(tdee + 250)} cal</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-slate-700">Muscle Gain (+500 cal)</span>
                      <span className="font-bold text-blue-700">{formatNumber(tdee + 500)} cal</span>
                    </div>
                  </div>
                </div>

                {/* Formula Comparison */}
                {bmrKatch !== null && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                    <h3 className="font-bold text-slate-900 mb-4">📊 BMR Formula Comparison</h3>
                    <div className="space-y-3">
                      <div className={`flex justify-between items-center p-3 rounded-lg ${formula === "mifflin" ? "bg-blue-50 border border-blue-200" : "bg-slate-50"}`}>
                        <span className="text-slate-700">Mifflin-St Jeor</span>
                        <span className="font-bold text-slate-800">{formatNumber(calculateBMR("mifflin"))} cal</span>
                      </div>
                      <div className={`flex justify-between items-center p-3 rounded-lg ${formula === "harris" ? "bg-blue-50 border border-blue-200" : "bg-slate-50"}`}>
                        <span className="text-slate-700">Harris-Benedict</span>
                        <span className="font-bold text-slate-800">{formatNumber(bmrHarris)} cal</span>
                      </div>
                      <div className={`flex justify-between items-center p-3 rounded-lg ${formula === "katch" ? "bg-blue-50 border border-blue-200" : "bg-slate-50"}`}>
                        <span className="text-slate-700">Katch-McArdle</span>
                        <span className="font-bold text-slate-800">{formatNumber(bmrKatch)} cal</span>
                      </div>
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
                <h3 className="text-lg font-bold text-slate-900 mb-4">📊 Understanding TDEE</h3>
                <p className="text-slate-600 mb-3">
                  TDEE represents the total calories your body burns in a day, including:
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>BMR (60-70%):</strong> Calories burned at complete rest</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Exercise (15-30%):</strong> Physical activity and workouts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>TEF (10%):</strong> Energy to digest food</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">💡 Tips for Accuracy</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Be honest about your activity level - most people overestimate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Track your weight for 2-4 weeks to verify your TDEE</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Adjust by ±100 cal if weight doesn&apos;t change as expected</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Include body fat % for more accurate results</span>
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
            <h2 className="text-2xl font-bold text-slate-900 mb-4">📊 Example TDEE Calculation</h2>
            <p className="text-slate-600 mb-6">
              Let&apos;s calculate the TDEE for a 30-year-old male, 5&apos;10&quot; (178 cm), 170 lbs (77 kg), who exercises 3-5 days per week.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Step 1: Calculate BMR</h4>
                <p className="text-slate-600 text-sm mb-2">Using Mifflin-St Jeor formula:</p>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>BMR = (10 × 77) + (6.25 × 178) - (5 × 30) + 5</p>
                  <p>BMR = 770 + 1,112.5 - 150 + 5</p>
                  <p className="font-bold text-blue-600">BMR = 1,737 calories/day</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Step 2: Calculate TDEE</h4>
                <p className="text-slate-600 text-sm mb-2">Multiply by activity factor (1.55 for moderate):</p>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>TDEE = BMR × Activity Factor</p>
                  <p>TDEE = 1,737 × 1.55</p>
                  <p className="font-bold text-blue-600">TDEE = 2,692 calories/day</p>
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
                {/* What is TDEE */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">What is TDEE?</h2>
                  <p className="text-slate-600 mb-4">
                    TDEE stands for Total Daily Energy Expenditure. It represents the total number of calories your body burns in a 24-hour period, accounting for all activities from breathing and digesting food to exercising and walking.
                  </p>
                  <p className="text-slate-600 mb-4">
                    Understanding your TDEE is crucial for weight management because it tells you exactly how many calories you need to maintain your current weight. From there, you can create a calorie deficit to lose weight or a surplus to gain muscle.
                  </p>
                </div>

                {/* TDEE Components */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Components of TDEE</h2>
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <h3 className="font-bold text-blue-800 mb-2">1. Basal Metabolic Rate (BMR) - 60-70%</h3>
                      <p className="text-slate-600">The calories your body needs to perform basic life-sustaining functions like breathing, circulation, cell production, and nutrient processing while at complete rest.</p>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4">
                      <h3 className="font-bold text-amber-800 mb-2">2. Physical Activity - 15-30%</h3>
                      <p className="text-slate-600">All calories burned through movement, including exercise, walking, standing, and daily activities. This is the most variable component.</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4">
                      <h3 className="font-bold text-blue-800 mb-2">3. Thermic Effect of Food (TEF) - 10%</h3>
                      <p className="text-slate-600">The energy required to digest, absorb, and metabolize the food you eat. Protein has the highest thermic effect at 20-30%.</p>
                    </div>
                  </div>
                </div>

                {/* Activity Levels Explained */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Activity Levels Explained</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="text-left p-3 font-bold text-slate-800">Level</th>
                          <th className="text-left p-3 font-bold text-slate-800">Multiplier</th>
                          <th className="text-left p-3 font-bold text-slate-800">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activityOptions.map((option, index) => (
                          <tr key={option.value} className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                            <td className="p-3 font-medium text-slate-700">{option.label}</td>
                            <td className="p-3 text-blue-600 font-bold">×{ACTIVITY_MULTIPLIERS[option.value]}</td>
                            <td className="p-3 text-slate-600">{option.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
                  <h3 className="font-bold mb-2">📊 Calculate Your Macros</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Now that you know your TDEE, calculate the optimal protein, carbs, and fat for your goals.
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
