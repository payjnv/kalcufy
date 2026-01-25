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
const CALCULATOR_SLUG = "calories-burned-calculator";
const CALCULATOR_NAME = "Calories Burned Calculator";
const CALCULATOR_CATEGORY = "health";

// =============================================================================
// TYPES
// =============================================================================
type UnitSystem = "metric" | "imperial";
type ActivityCategory = keyof typeof ACTIVITIES;

// =============================================================================
// MET VALUES FROM COMPENDIUM OF PHYSICAL ACTIVITIES 2024
// =============================================================================
const ACTIVITIES = {
  running: {
    name: "Running",
    icon: "🏃",
    intensities: [
      { name: "5 mph (12 min/mile)", met: 8.3 },
      { name: "6 mph (10 min/mile)", met: 9.8 },
      { name: "7 mph (8.5 min/mile)", met: 11.0 },
      { name: "8 mph (7.5 min/mile)", met: 11.8 },
      { name: "9 mph (6.5 min/mile)", met: 12.8 },
      { name: "10 mph (6 min/mile)", met: 14.5 },
    ],
  },
  walking: {
    name: "Walking",
    icon: "🚶",
    intensities: [
      { name: "2 mph (slow)", met: 2.5 },
      { name: "3 mph (moderate)", met: 3.5 },
      { name: "3.5 mph (brisk)", met: 4.3 },
      { name: "4 mph (very brisk)", met: 5.0 },
      { name: "Uphill, 3.5 mph", met: 6.0 },
    ],
  },
  cycling: {
    name: "Cycling",
    icon: "🚴",
    intensities: [
      { name: "< 10 mph (leisure)", met: 4.0 },
      { name: "12-14 mph (moderate)", met: 8.0 },
      { name: "14-16 mph (vigorous)", met: 10.0 },
      { name: "16-19 mph (racing)", met: 12.0 },
      { name: "Stationary, moderate", met: 7.0 },
      { name: "Stationary, vigorous", met: 10.5 },
    ],
  },
  swimming: {
    name: "Swimming",
    icon: "🏊",
    intensities: [
      { name: "Leisurely", met: 6.0 },
      { name: "Moderate effort", met: 7.0 },
      { name: "Vigorous laps", met: 9.8 },
      { name: "Backstroke", met: 9.5 },
      { name: "Breaststroke", met: 10.3 },
      { name: "Butterfly", met: 13.8 },
    ],
  },
  hiit: {
    name: "HIIT / CrossFit",
    icon: "💪",
    intensities: [
      { name: "Circuit training, moderate", met: 8.0 },
      { name: "HIIT (high intensity)", met: 12.0 },
      { name: "CrossFit workout", met: 12.0 },
      { name: "Tabata intervals", met: 14.0 },
    ],
  },
  weights: {
    name: "Weight Training",
    icon: "🏋️",
    intensities: [
      { name: "Light effort", met: 3.5 },
      { name: "Moderate effort", met: 5.0 },
      { name: "Vigorous effort", met: 6.0 },
    ],
  },
  yoga: {
    name: "Yoga / Pilates",
    icon: "🧘",
    intensities: [
      { name: "Hatha yoga", met: 2.5 },
      { name: "Vinyasa flow", met: 4.0 },
      { name: "Power yoga", met: 5.5 },
      { name: "Hot yoga (Bikram)", met: 7.0 },
      { name: "Pilates", met: 3.0 },
    ],
  },
  sports: {
    name: "Sports",
    icon: "⚽",
    intensities: [
      { name: "Basketball (casual)", met: 6.5 },
      { name: "Basketball (competitive)", met: 8.0 },
      { name: "Soccer (casual)", met: 7.0 },
      { name: "Tennis (singles)", met: 8.0 },
      { name: "Golf (walking)", met: 4.8 },
    ],
  },
  cardio: {
    name: "Cardio Machines",
    icon: "🎽",
    intensities: [
      { name: "Elliptical, moderate", met: 5.0 },
      { name: "Elliptical, vigorous", met: 8.0 },
      { name: "Stair climber", met: 9.0 },
      { name: "Rowing, moderate", met: 7.0 },
      { name: "Jump rope", met: 12.3 },
    ],
  },
  daily: {
    name: "Daily Activities",
    icon: "🏠",
    intensities: [
      { name: "Cleaning house", met: 3.5 },
      { name: "Gardening", met: 4.0 },
      { name: "Mowing lawn (push)", met: 5.5 },
      { name: "Shoveling snow", met: 6.0 },
      { name: "Playing with kids", met: 5.0 },
    ],
  },
} as const;

// =============================================================================
// FOOD EQUIVALENTS
// =============================================================================
const FOOD_EQUIVALENTS = [
  { name: "Banana", calories: 105, icon: "🍌" },
  { name: "Apple", calories: 95, icon: "🍎" },
  { name: "Slice of pizza", calories: 285, icon: "🍕" },
  { name: "Can of soda", calories: 140, icon: "🥤" },
  { name: "Chocolate bar", calories: 230, icon: "🍫" },
  { name: "Glass of wine", calories: 125, icon: "🍷" },
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function CaloriesBurnedCalculatorPage() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - Inputs
  // ─────────────────────────────────────────────────────────────────────────────
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("imperial");
  const [weightLbs, setWeightLbs] = useState(154);
  const [weightKg, setWeightKg] = useState(70);
  const [activity, setActivity] = useState<ActivityCategory>("running");
  const [intensityIndex, setIntensityIndex] = useState(1);
  const [duration, setDuration] = useState(30);

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

  // Reset intensity when activity changes
  useEffect(() => {
    setIntensityIndex(0);
  }, [activity]);

  // ─────────────────────────────────────────────────────────────────────────────
  // CALCULATIONS
  // ─────────────────────────────────────────────────────────────────────────────
  const getWeightKg = (): number => {
    return unitSystem === "imperial" ? weightLbs * 0.453592 : weightKg;
  };

  const selectedActivity = ACTIVITIES[activity];
  const selectedIntensity = selectedActivity.intensities[intensityIndex];
  const met = selectedIntensity?.met || 0;
  const weightKgCalc = getWeightKg();

  // Calories = MET × weight (kg) × time (hours)
  const caloriesBurned = Math.round(met * weightKgCalc * (duration / 60));
  const caloriesPerMinute = Math.round((caloriesBurned / duration) * 10) / 10;
  const caloriesPerHour = Math.round(met * weightKgCalc);

  // Activity equivalents
  const walkingMet = 3.5;
  const runningMet = 9.8;
  const cyclingMet = 8.0;
  const walkingTime = Math.round((caloriesBurned / (walkingMet * weightKgCalc)) * 60);
  const runningTime = Math.round((caloriesBurned / (runningMet * weightKgCalc)) * 60);
  const cyclingTime = Math.round((caloriesBurned / (cyclingMet * weightKgCalc)) * 60);

  // Weekly projection (5 workouts)
  const weeklyProjection = caloriesBurned * 5;
  const weightLossPerWeek = Math.round((weeklyProjection / 3500) * 100) / 100;

  // Intensity category
  const getIntensityCategory = (met: number): string => {
    if (met < 3) return "Light";
    if (met < 6) return "Moderate";
    return "Vigorous";
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
            weight: unitSystem === "imperial" ? `${weightLbs} lbs` : `${weightKg} kg`,
            activity: selectedActivity.name,
            intensity: selectedIntensity.name,
            duration: `${duration} min`,
          },
          results: {
            caloriesBurned: caloriesBurned.toString(),
            met: met.toString(),
            caloriesPerMinute: caloriesPerMinute.toString(),
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
      question: "How accurate are calorie burn calculations?",
      answer: "MET-based calculations provide reasonable estimates within 10-20% accuracy. Individual factors like fitness level, body composition, age, and genetics can cause variations. For precise measurements, lab-based indirect calorimetry is needed."
    },
    {
      question: "What is a MET value?",
      answer: "MET (Metabolic Equivalent of Task) measures exercise intensity relative to rest. 1 MET equals the energy you burn sitting quietly (~1 kcal/kg/hour). An activity with 8 METs burns 8 times more energy than resting."
    },
    {
      question: "Does muscle burn more calories than fat?",
      answer: "Yes, muscle tissue is more metabolically active. Each pound of muscle burns approximately 6-7 calories per day at rest, while fat burns about 2-3 calories. Building muscle increases your resting metabolic rate."
    },
    {
      question: "What's the afterburn effect (EPOC)?",
      answer: "EPOC (Excess Post-Exercise Oxygen Consumption) refers to increased calorie burning after exercise ends. High-intensity exercise can elevate metabolism for 24-48 hours, potentially adding 6-15% to total calories burned."
    },
    {
      question: "How many calories should I burn per workout?",
      answer: "For general health, aim for 200-300 calories per session, 3-5 times weekly. For weight loss, 300-500+ calories per workout combined with a calorie deficit is effective."
    },
    {
      question: "Why do I burn fewer calories as I get fitter?",
      answer: "As fitness improves, your body becomes more efficient at performing activities. To continue progress, increase intensity, duration, or try new activities that challenge your body."
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
              <span className="text-slate-900 font-medium" aria-current="page">Calories Burned Calculator</span>
            </nav>

            {/* Title */}
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl"
                role="img"
                aria-label="Calories Burned Calculator icon"
              >
                🔥
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Calories Burned Calculator</h1>
                <p className="text-slate-600 mt-1">Calculate calories burned using MET values for 100+ activities</p>
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
                        {unit === "imperial" ? "Imperial (lb)" : "Metric (kg)"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Weight */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="weight-input" className="font-medium text-slate-700">
                      Body Weight
                    </label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        id="weight-input"
                        type="number"
                        min={unitSystem === "imperial" ? 80 : 35}
                        max={unitSystem === "imperial" ? 400 : 180}
                        value={unitSystem === "imperial" ? weightLbs : weightKg}
                        onChange={(e) => {
                          const val = Number(e.target.value) || (unitSystem === "imperial" ? 154 : 70);
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
                  <input
                    type="range"
                    min={unitSystem === "imperial" ? 80 : 35}
                    max={unitSystem === "imperial" ? 300 : 140}
                    value={unitSystem === "imperial" ? weightLbs : weightKg}
                    onChange={(e) => {
                      if (unitSystem === "imperial") {
                        handleInputChange(setWeightLbs, Number(e.target.value));
                      } else {
                        handleInputChange(setWeightKg, Number(e.target.value));
                      }
                    }}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    aria-label="Weight slider"
                  />
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 my-6"></div>

                {/* Activity Type */}
                <div className="mb-6">
                  <label id="activity-label" className="block font-medium text-slate-700 mb-2">
                    Activity Type
                  </label>
                  <div role="radiogroup" aria-labelledby="activity-label" className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {(Object.keys(ACTIVITIES) as ActivityCategory[]).map((key) => (
                      <button
                        key={key}
                        onClick={() => handleInputChange(setActivity, key)}
                        role="radio"
                        aria-checked={activity === key}
                        className={`p-2 rounded-xl border text-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          activity === key
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span className="text-xl block">{ACTIVITIES[key].icon}</span>
                        <span className="text-xs font-medium text-slate-700">{ACTIVITIES[key].name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Intensity */}
                <div className="mb-6">
                  <label htmlFor="intensity-select" className="block font-medium text-slate-700 mb-2">
                    Intensity Level
                  </label>
                  <select
                    id="intensity-select"
                    value={intensityIndex}
                    onChange={(e) => handleInputChange(setIntensityIndex, parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                  >
                    {selectedActivity.intensities.map((intensity, index) => (
                      <option key={index} value={index}>
                        {intensity.name} (MET: {intensity.met})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Duration */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="duration-input" className="font-medium text-slate-700">
                      Duration
                    </label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        id="duration-input"
                        type="number"
                        min="5"
                        max="300"
                        value={duration}
                        onChange={(e) => handleInputChange(setDuration, Math.max(5, Math.min(300, Number(e.target.value) || 30)))}
                        className="w-16 bg-transparent text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-slate-600 ml-1">min</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="180"
                    value={duration}
                    onChange={(e) => handleInputChange(setDuration, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    aria-label="Duration slider"
                  />
                  <div className="flex justify-center gap-2 mt-3">
                    {[15, 30, 45, 60, 90].map((min) => (
                      <button
                        key={min}
                        onClick={() => handleInputChange(setDuration, min)}
                        className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                          duration === min
                            ? "bg-blue-100 text-blue-700 font-medium"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {min}m
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
                  aria-label="Calories Burned Results"
                  aria-live="polite"
                >
                  <p className="text-sm text-slate-600 mb-1">Calories Burned</p>
                  <p className="text-4xl md:text-5xl font-bold text-slate-900">{caloriesBurned.toLocaleString()}</p>
                  <p className="text-slate-600 mt-2">
                    {selectedActivity.name} • {selectedIntensity?.name}
                  </p>
                  
                  {/* Range */}
                  <div className="flex items-center gap-2 text-sm text-slate-600 mt-4">
                    <span>Intensity:</span>
                    <span className="font-medium text-blue-600">
                      {getIntensityCategory(met)} (MET {met})
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Per Minute</span>
                      <span className="font-medium text-slate-800">{caloriesPerMinute} cal</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Per Hour</span>
                      <span className="font-bold text-blue-600">{caloriesPerHour} cal</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full mt-3 overflow-hidden">
                      <div 
                        className="h-full bg-blue-500"
                        style={{ width: `${Math.min(100, (caloriesBurned / 1000) * 100)}%` }}
                        role="progressbar"
                        aria-valuenow={caloriesBurned}
                        aria-valuemin={0}
                        aria-valuemax={1000}
                      />
                    </div>
                  </div>
                </div>

                {/* Activity Equivalents */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">🔄 Time to Burn {caloriesBurned} cal</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🚶</span>
                        <span className="text-slate-700">Walking (3.5 mph)</span>
                      </div>
                      <span className="font-bold text-blue-600">{walkingTime} min</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🏃</span>
                        <span className="text-slate-700">Running (6 mph)</span>
                      </div>
                      <span className="font-bold text-blue-600">{runningTime} min</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🚴</span>
                        <span className="text-slate-700">Cycling (moderate)</span>
                      </div>
                      <span className="font-bold text-blue-600">{cyclingTime} min</span>
                    </div>
                  </div>
                </div>

                {/* Food Equivalents */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">🍽️ Food Equivalents</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {FOOD_EQUIVALENTS.map((food) => (
                      <div key={food.name} className="bg-slate-50 rounded-lg p-2 text-center">
                        <span className="text-lg">{food.icon}</span>
                        <p className="text-sm font-bold text-blue-600">
                          {(caloriesBurned / food.calories).toFixed(1)}
                        </p>
                        <p className="text-xs text-slate-600">{food.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weekly Projection */}
                <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6 mb-4">
                  <h3 className="font-bold text-blue-800 mb-2">📅 Weekly (5 workouts)</h3>
                  <p className="text-3xl font-bold text-blue-800">{weeklyProjection.toLocaleString()} cal</p>
                  <p className="text-sm text-blue-600 mt-2">
                    Potential weight loss: {weightLossPerWeek} lbs/week
                  </p>
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
                <h3 className="text-lg font-bold text-slate-900 mb-4">🔬 About MET Values</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>1 MET:</strong> Energy at rest (~1 kcal/kg/hour)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>3-6 METs:</strong> Moderate intensity activities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>6+ METs:</strong> Vigorous intensity activities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Formula:</strong> Cal = MET × kg × hours</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">💡 Tips for Accuracy</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Heavier individuals burn more calories</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>EPOC adds 6-15% for high-intensity exercise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Fitness trackers may overestimate by 20-90%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Use as estimates, not exact values</span>
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
              154 lb (70 kg) person running at 6 mph for 30 minutes:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">The Formula</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>Calories = MET × Weight (kg) × Time (hours)</p>
                  <p className="mt-2">Calories = 9.8 × 70 kg × 0.5 hr</p>
                  <p className="font-bold text-blue-600 mt-2">Calories = 343 calories burned</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Weekly Impact</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>5 workouts × 343 cal = 1,715 cal/week</p>
                  <p className="mt-2">1,715 ÷ 3,500 cal/lb = 0.49 lbs</p>
                  <p className="font-bold text-blue-600 mt-2">≈ 0.5 lbs weight loss per week</p>
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
                {/* Understanding Calorie Burn */}
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding Calories Burned During Exercise</h2>
                  <p className="text-slate-600 mb-4">
                    The number of calories you burn during exercise depends on multiple factors including your body weight, exercise intensity, duration, and individual metabolism. The MET system provides a standardized way to compare the energy cost of different activities.
                  </p>
                  <p className="text-slate-600">
                    Your body constantly burns calories to maintain basic functions. When you exercise, you increase energy expenditure above this baseline. The harder you work (higher MET), the more calories you burn.
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
                  <h3 className="font-bold mb-2">📉 Plan Your Deficit</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Combine exercise with a calorie deficit for optimal weight loss results.
                  </p>
                  <Link
                    href={`/${locale}/caloric-deficit-calculator`}
                    className="inline-block bg-white text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Try Caloric Deficit Calculator →
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
