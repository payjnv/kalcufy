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
const CALCULATOR_SLUG = "body-fat-calculator";
const CALCULATOR_NAME = "Body Fat Calculator";
const CALCULATOR_CATEGORY = "health";

// =============================================================================
// TYPES
// =============================================================================
type UnitSystem = "metric" | "imperial";
type Gender = "male" | "female";
type Method = "navy" | "bmi" | "army";

interface BodyFatCategory {
  name: string;
  menRange: string;
  womenRange: string;
  color: string;
  bgColor: string;
}

// =============================================================================
// BODY FAT CATEGORIES
// =============================================================================
const BODY_FAT_CATEGORIES: BodyFatCategory[] = [
  { name: "Essential Fat", menRange: "2-5%", womenRange: "10-13%", color: "text-red-700", bgColor: "bg-red-50" },
  { name: "Athletes", menRange: "6-13%", womenRange: "14-20%", color: "text-blue-700", bgColor: "bg-blue-50" },
  { name: "Fitness", menRange: "14-17%", womenRange: "21-24%", color: "text-green-700", bgColor: "bg-green-50" },
  { name: "Average", menRange: "18-24%", womenRange: "25-31%", color: "text-amber-800", bgColor: "bg-amber-50" },
  { name: "Obese", menRange: "25%+", womenRange: "32%+", color: "text-red-700", bgColor: "bg-red-50" },
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function BodyFatCalculatorPage() {
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
  
  // Measurements (for Navy/Army methods)
  const [neckIn, setNeckIn] = useState(15);
  const [neckCm, setNeckCm] = useState(38);
  const [waistIn, setWaistIn] = useState(34);
  const [waistCm, setWaistCm] = useState(86);
  const [hipIn, setHipIn] = useState(38);
  const [hipCm, setHipCm] = useState(97);
  
  // Advanced
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [goalBodyFat, setGoalBodyFat] = useState<number | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<Method>("navy");

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
  // UNIT CONVERSIONS
  // ─────────────────────────────────────────────────────────────────────────────
  const getWeightKg = (): number => {
    return unitSystem === "metric" ? weightKg : weightLbs * 0.453592;
  };

  const getHeightCm = (): number => {
    return unitSystem === "metric" ? heightCm : (heightFeet * 12 + heightInches) * 2.54;
  };

  const getNeckCm = (): number => {
    return unitSystem === "metric" ? neckCm : neckIn * 2.54;
  };

  const getWaistCm = (): number => {
    return unitSystem === "metric" ? waistCm : waistIn * 2.54;
  };

  const getHipCm = (): number => {
    return unitSystem === "metric" ? hipCm : hipIn * 2.54;
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // CALCULATIONS
  // ─────────────────────────────────────────────────────────────────────────────
  
  // Navy Method (most accurate for most people)
  const calculateNavyMethod = (): number => {
    const height = getHeightCm();
    const neck = getNeckCm();
    const waist = getWaistCm();
    const hip = getHipCm();

    if (gender === "male") {
      // Male formula
      const logWaistNeck = Math.log10(waist - neck);
      const logHeight = Math.log10(height);
      return 495 / (1.0324 - 0.19077 * logWaistNeck + 0.15456 * logHeight) - 450;
    } else {
      // Female formula (includes hip)
      const logWaistHipNeck = Math.log10(waist + hip - neck);
      const logHeight = Math.log10(height);
      return 495 / (1.29579 - 0.35004 * logWaistHipNeck + 0.22100 * logHeight) - 450;
    }
  };

  // BMI Method (less accurate, but only needs height/weight)
  const calculateBMIMethod = (): number => {
    const weight = getWeightKg();
    const height = getHeightCm() / 100; // meters
    const bmi = weight / (height * height);

    if (gender === "male") {
      return (1.20 * bmi) + (0.23 * age) - 16.2;
    } else {
      return (1.20 * bmi) + (0.23 * age) - 5.4;
    }
  };

  // Army Method (similar to Navy)
  const calculateArmyMethod = (): number => {
    const height = getHeightCm();
    const neck = getNeckCm();
    const waist = getWaistCm();
    const hip = getHipCm();

    if (gender === "male") {
      return 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    } else {
      return 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
    }
  };

  // Calculate all methods
  const navyBF = Math.max(0, Math.min(60, calculateNavyMethod()));
  const bmiBF = Math.max(0, Math.min(60, calculateBMIMethod()));
  const armyBF = Math.max(0, Math.min(60, calculateArmyMethod()));

  // Get primary result based on selected method
  const getPrimaryBF = (): number => {
    switch (selectedMethod) {
      case "navy": return navyBF;
      case "bmi": return bmiBF;
      case "army": return armyBF;
      default: return navyBF;
    }
  };

  const primaryBF = getPrimaryBF();

  // Calculate body composition
  const weight = unitSystem === "metric" ? weightKg : weightLbs;
  const fatMass = weight * (primaryBF / 100);
  const leanMass = weight - fatMass;

  // Fat to lose calculation
  const calculateFatToLose = (): number | null => {
    if (goalBodyFat === null || goalBodyFat >= primaryBF) return null;
    // Formula: Fat to lose = Current Weight × (Current BF% - Goal BF%) / (100 - Goal BF%)
    const fatToLose = weight * (primaryBF - goalBodyFat) / (100 - goalBodyFat);
    return Math.max(0, fatToLose);
  };

  const fatToLose = calculateFatToLose();

  // Get category
  const getCategory = (bf: number): BodyFatCategory => {
    if (gender === "male") {
      if (bf <= 5) return BODY_FAT_CATEGORIES[0];
      if (bf <= 13) return BODY_FAT_CATEGORIES[1];
      if (bf <= 17) return BODY_FAT_CATEGORIES[2];
      if (bf <= 24) return BODY_FAT_CATEGORIES[3];
      return BODY_FAT_CATEGORIES[4];
    } else {
      if (bf <= 13) return BODY_FAT_CATEGORIES[0];
      if (bf <= 20) return BODY_FAT_CATEGORIES[1];
      if (bf <= 24) return BODY_FAT_CATEGORIES[2];
      if (bf <= 31) return BODY_FAT_CATEGORIES[3];
      return BODY_FAT_CATEGORIES[4];
    }
  };

  const category = getCategory(primaryBF);

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
            neck: unitSystem === "metric" ? neckCm : neckIn,
            waist: unitSystem === "metric" ? waistCm : waistIn,
            hip: unitSystem === "metric" ? hipCm : hipIn,
            method: selectedMethod,
            goalBodyFat,
          },
          results: {
            bodyFatNavy: navyBF.toFixed(1),
            bodyFatBMI: bmiBF.toFixed(1),
            bodyFatArmy: armyBF.toFixed(1),
            fatMass: fatMass.toFixed(1),
            leanMass: leanMass.toFixed(1),
            category: category.name,
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
  const formatNumber = (value: number, decimals: number = 1): string => {
    return value.toFixed(decimals);
  };

  const weightUnit = unitSystem === "metric" ? "kg" : "lbs";
  const lengthUnit = unitSystem === "metric" ? "cm" : "in";

  // ─────────────────────────────────────────────────────────────────────────────
  // FAQs
  // ─────────────────────────────────────────────────────────────────────────────
  const defaultFaqs = [
    {
      question: "What is body fat percentage?",
      answer: "Body fat percentage is the total mass of fat divided by total body mass, multiplied by 100. It includes essential fat (necessary for life) and storage fat. A healthy body fat percentage varies by gender, age, and fitness level."
    },
    {
      question: "Which method is most accurate?",
      answer: "The Navy Method using body measurements is generally most accurate for the average person without specialized equipment. For athletes with low body fat, the Army method may be more accurate. The BMI method is least accurate but requires no measurements."
    },
    {
      question: "How do I measure my waist correctly?",
      answer: "For men: Measure at the navel (belly button) level. For women: Measure at the narrowest point of your waist, usually just above the belly button. Keep the tape horizontal and snug but not compressing the skin."
    },
    {
      question: "How do I measure my neck correctly?",
      answer: "Measure around your neck just below the larynx (Adam's apple) with the tape sloping slightly downward at the front. Keep your head straight and look forward during measurement."
    },
    {
      question: "What is a healthy body fat percentage?",
      answer: "For men, 14-17% is considered 'fitness' level, while 18-24% is 'average'. For women, 21-24% is 'fitness' level, while 25-31% is 'average'. Athletes typically have lower percentages: 6-13% for men and 14-20% for women."
    },
    {
      question: "How often should I measure body fat?",
      answer: "Measure once every 2-4 weeks at the same time of day (preferably morning before eating) for consistent results. Body fat changes slowly, so daily measurements are unnecessary and may show misleading fluctuations."
    },
  ];
  const faqs = translations?.faq || defaultFaqs;

  // ─────────────────────────────────────────────────────────────────────────────
  // SIDEBAR CALCULATORS
  // ─────────────────────────────────────────────────────────────────────────────
  const financeCalcs = ["Mortgage", "Loan", "Compound Interest", "Auto Loan", "Retirement", "Savings", "Credit Card Payoff"];
  const healthCalcs = ["BMI", "Calorie", "BMR", "TDEE", "Macro", "Protein", "Ideal Weight"];

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
              <span className="text-slate-900 font-medium" aria-current="page">Body Fat Calculator</span>
            </nav>

            {/* Title */}
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl"
                role="img"
                aria-label="Body Fat Calculator icon"
              >
                📏
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Body Fat Calculator</h1>
                <p className="text-slate-600 mt-1">Calculate your body fat percentage using multiple methods</p>
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
                  <h2 className="text-xl font-bold text-slate-900">Your Measurements</h2>
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
                <h3 className="font-bold text-slate-900 mb-4">📏 Body Measurements</h3>

                {/* Neck */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="neck-input" className="font-medium text-slate-700">
                      Neck Circumference
                    </label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        id="neck-input"
                        type="number"
                        min={unitSystem === "metric" ? 25 : 10}
                        max={unitSystem === "metric" ? 60 : 24}
                        step="0.5"
                        value={unitSystem === "metric" ? neckCm : neckIn}
                        onChange={(e) => {
                          const val = Number(e.target.value) || (unitSystem === "metric" ? 25 : 10);
                          if (unitSystem === "metric") {
                            handleInputChange(setNeckCm, val);
                          } else {
                            handleInputChange(setNeckIn, val);
                          }
                        }}
                        className="w-16 bg-transparent text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-slate-600 ml-1">{lengthUnit}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600">Measure just below the Adam&apos;s apple</p>
                </div>

                {/* Waist */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="waist-input" className="font-medium text-slate-700">
                      Waist Circumference
                    </label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        id="waist-input"
                        type="number"
                        min={unitSystem === "metric" ? 50 : 20}
                        max={unitSystem === "metric" ? 150 : 60}
                        step="0.5"
                        value={unitSystem === "metric" ? waistCm : waistIn}
                        onChange={(e) => {
                          const val = Number(e.target.value) || (unitSystem === "metric" ? 50 : 20);
                          if (unitSystem === "metric") {
                            handleInputChange(setWaistCm, val);
                          } else {
                            handleInputChange(setWaistIn, val);
                          }
                        }}
                        className="w-16 bg-transparent text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-slate-600 ml-1">{lengthUnit}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600">
                    {gender === "male" ? "Measure at navel (belly button)" : "Measure at narrowest point"}
                  </p>
                </div>

                {/* Hip (women only) */}
                {gender === "female" && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="hip-input" className="font-medium text-slate-700">
                        Hip Circumference
                      </label>
                      <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                        <input
                          id="hip-input"
                          type="number"
                          min={unitSystem === "metric" ? 60 : 24}
                          max={unitSystem === "metric" ? 160 : 64}
                          step="0.5"
                          value={unitSystem === "metric" ? hipCm : hipIn}
                          onChange={(e) => {
                            const val = Number(e.target.value) || (unitSystem === "metric" ? 60 : 24);
                            if (unitSystem === "metric") {
                              handleInputChange(setHipCm, val);
                            } else {
                              handleInputChange(setHipIn, val);
                            }
                          }}
                          className="w-16 bg-transparent text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <span className="text-slate-600 ml-1">{lengthUnit}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600">Measure at widest point of hips/buttocks</p>
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
                      {/* Goal Body Fat */}
                      <div>
                        <label htmlFor="goal-bf-input" className="block font-medium text-slate-700 mb-2">
                          🎯 Goal Body Fat % <span className="text-slate-400 font-normal">(optional)</span>
                        </label>
                        <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2">
                          <input
                            id="goal-bf-input"
                            type="number"
                            min="3"
                            max="50"
                            placeholder="e.g., 15"
                            value={goalBodyFat ?? ""}
                            onChange={(e) => {
                              const val = e.target.value === "" ? null : Math.max(3, Math.min(50, Number(e.target.value)));
                              handleInputChange(setGoalBodyFat, val);
                            }}
                            className="w-full bg-transparent font-bold text-blue-600 focus:outline-none placeholder:text-slate-400 placeholder:font-normal [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <span className="text-slate-600 ml-1">%</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">Enter to see how much fat you need to lose</p>
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
                  aria-label="Body Fat Results"
                  aria-live="polite"
                >
                  <p className="text-sm text-slate-600 mb-1">Your Body Fat Percentage</p>
                  <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                    {formatNumber(primaryBF)}%
                  </p>
                  
                  {/* Category Badge */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-6 ${category.bgColor} ${category.color}`}>
                    {category.name}
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Fat Mass</p>
                      <p className="text-xl font-bold text-slate-800">{formatNumber(fatMass)} {weightUnit}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Lean Mass</p>
                      <p className="text-xl font-bold text-slate-800">{formatNumber(leanMass)} {weightUnit}</p>
                    </div>
                  </div>
                </div>

                {/* Method Selector */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">📊 Calculation Method</h3>
                  <div 
                    role="radiogroup" 
                    aria-label="Select calculation method" 
                    className="space-y-2"
                  >
                    {([
                      { value: "navy", label: "Navy Method", desc: "Most accurate (uses measurements)", result: navyBF },
                      { value: "bmi", label: "BMI Method", desc: "Less accurate (no measurements)", result: bmiBF },
                      { value: "army", label: "Army Method", desc: "Military standard", result: armyBF },
                    ] as const).map((method) => (
                      <button
                        key={method.value}
                        onClick={() => handleInputChange(setSelectedMethod, method.value)}
                        role="radio"
                        aria-checked={selectedMethod === method.value}
                        className={`w-full text-left p-4 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          selectedMethod === method.value
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium text-slate-800">{method.label}</span>
                            <p className="text-xs text-slate-600">{method.desc}</p>
                          </div>
                          <span className={`text-xl font-bold ${selectedMethod === method.value ? "text-blue-600" : "text-slate-700"}`}>
                            {formatNumber(method.result)}%
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Methods Comparison Bar - UNIQUE FEATURE */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">📈 Methods Comparison</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Navy", value: navyBF, color: "bg-blue-600" },
                      { name: "BMI", value: bmiBF, color: "bg-amber-500" },
                      { name: "Army", value: armyBF, color: "bg-green-500" },
                    ].map((method) => (
                      <div key={method.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-600">{method.name}</span>
                          <span className="font-medium text-slate-800">{formatNumber(method.value)}%</span>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${method.color} transition-all duration-500`}
                            style={{ width: `${Math.min(100, (method.value / 50) * 100)}%` }}
                            role="progressbar"
                            aria-valuenow={method.value}
                            aria-valuemin={0}
                            aria-valuemax={50}
                            aria-label={`${method.name} method: ${formatNumber(method.value)}%`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 mt-4">Different methods may show slightly different results. Navy method is generally most accurate.</p>
                </div>

                {/* Fat to Lose - UNIQUE FEATURE */}
                {fatToLose !== null && goalBodyFat !== null && (
                  <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6 mb-4">
                    <h3 className="font-bold text-blue-800 mb-4">🎯 Goal Analysis</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-blue-600">Current Body Fat</p>
                        <p className="text-2xl font-bold text-blue-800">{formatNumber(primaryBF)}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-600">Goal Body Fat</p>
                        <p className="text-2xl font-bold text-blue-800">{goalBodyFat}%</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <p className="text-sm text-blue-600">Fat to Lose</p>
                      <p className="text-3xl font-bold text-blue-800">{formatNumber(fatToLose)} {weightUnit}</p>
                      <p className="text-xs text-blue-600 mt-1">
                        Goal weight: ~{formatNumber(weight - fatToLose)} {weightUnit}
                      </p>
                    </div>
                  </div>
                )}

                {/* Body Fat Categories Table */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">📋 Body Fat Categories</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-2 font-medium text-slate-700">Category</th>
                          <th className="text-center py-2 font-medium text-slate-700">Women</th>
                          <th className="text-center py-2 font-medium text-slate-700">Men</th>
                        </tr>
                      </thead>
                      <tbody>
                        {BODY_FAT_CATEGORIES.map((cat, index) => (
                          <tr 
                            key={cat.name} 
                            className={`border-b border-slate-100 ${category.name === cat.name ? "bg-blue-50" : ""}`}
                          >
                            <td className={`py-2 font-medium ${cat.color}`}>{cat.name}</td>
                            <td className="py-2 text-center text-slate-600">{cat.womenRange}</td>
                            <td className="py-2 text-center text-slate-600">{cat.menRange}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
                <h3 className="text-lg font-bold text-slate-900 mb-4">📏 How to Measure</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Neck:</strong> Measure just below the Adam&apos;s apple, tape sloping down slightly at front</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Waist (Men):</strong> Measure at navel (belly button) level, keep tape horizontal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Waist (Women):</strong> Measure at narrowest point, usually above belly button</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Hip (Women):</strong> Measure at widest point of hips and buttocks</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">💡 Tips for Accuracy</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Measure in the morning before eating or drinking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Keep the tape snug but not compressing the skin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Take multiple measurements and use the average</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Measure at the same time of day for tracking</span>
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
              Navy Method calculation for a 30-year-old male: Height 5&apos;10&quot; (178 cm), Neck 15&quot; (38 cm), Waist 34&quot; (86 cm)
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Step 1: Convert to cm</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>Height = 178 cm</p>
                  <p>Neck = 38 cm</p>
                  <p>Waist = 86 cm</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Step 2: Apply Navy Formula</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>BF% = 495 / (1.0324 - 0.19077×log(86-38) + 0.15456×log(178)) - 450</p>
                  <p className="font-bold text-blue-600 mt-2">BF% ≈ 18.2%</p>
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
                {/* What is Body Fat */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">What is Body Fat Percentage?</h2>
                  <p className="text-slate-600 mb-4">
                    Body fat percentage is the total mass of fat divided by total body mass, multiplied by 100. It&apos;s a more accurate indicator of health and fitness than weight alone because it distinguishes between fat and lean tissue (muscle, bone, organs).
                  </p>
                  <p className="text-slate-600 mb-4">
                    Your body fat includes essential fat (needed for normal physiological function) and storage fat (energy reserves stored in adipose tissue). Essential fat is about 3% for men and 12% for women.
                  </p>
                </div>

                {/* Methods Explained */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Calculation Methods Explained</h2>
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <h3 className="font-bold text-blue-800 mb-2">🔵 Navy Method (Recommended)</h3>
                      <p className="text-slate-600">Uses circumference measurements (neck, waist, and hip for women) along with height. Developed by the U.S. Navy, this method is accurate for most people and requires only a tape measure.</p>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4">
                      <h3 className="font-bold text-amber-800 mb-2">🟡 BMI Method</h3>
                      <p className="text-slate-600">Estimates body fat from BMI, age, and gender. Less accurate because BMI doesn&apos;t distinguish between muscle and fat. Athletes may show artificially high results.</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <h3 className="font-bold text-green-800 mb-2">🟢 Army Method</h3>
                      <p className="text-slate-600">Similar to Navy method, used by the U.S. Army for fitness assessments. Uses the same measurements but a slightly different formula. Good for tracking progress.</p>
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
                  <h3 className="font-bold mb-2">📊 Check Your BMI</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Compare your body fat results with your BMI for a complete picture of your health.
                  </p>
                  <Link
                    href={`/${locale}/bmi-calculator`}
                    className="inline-block bg-white text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Try BMI Calculator →
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
