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
const CALCULATOR_SLUG = "one-rep-max-calculator";
const CALCULATOR_NAME = "One Rep Max Calculator";
const CALCULATOR_CATEGORY = "health";

// =============================================================================
// TYPES
// =============================================================================
type UnitSystem = "metric" | "imperial";
type Exercise = "bench" | "squat" | "deadlift" | "overhead" | "other";
type Gender = "male" | "female";

// =============================================================================
// EXERCISE OPTIONS
// =============================================================================
const EXERCISES: Record<Exercise, { label: string; icon: string }> = {
  bench: { label: "Bench Press", icon: "🏋️" },
  squat: { label: "Back Squat", icon: "🦵" },
  deadlift: { label: "Deadlift", icon: "💪" },
  overhead: { label: "Overhead Press", icon: "🙆" },
  other: { label: "Other Exercise", icon: "⚡" },
};

// =============================================================================
// STRENGTH STANDARDS (multiplier of bodyweight)
// =============================================================================
const STRENGTH_STANDARDS: Record<Exercise, Record<Gender, { beginner: number; intermediate: number; advanced: number; elite: number }>> = {
  bench: {
    male: { beginner: 0.5, intermediate: 1.0, advanced: 1.5, elite: 2.0 },
    female: { beginner: 0.25, intermediate: 0.5, advanced: 0.75, elite: 1.0 },
  },
  squat: {
    male: { beginner: 0.75, intermediate: 1.25, advanced: 2.0, elite: 2.5 },
    female: { beginner: 0.5, intermediate: 1.0, advanced: 1.5, elite: 2.0 },
  },
  deadlift: {
    male: { beginner: 1.0, intermediate: 1.5, advanced: 2.5, elite: 3.0 },
    female: { beginner: 0.75, intermediate: 1.25, advanced: 2.0, elite: 2.5 },
  },
  overhead: {
    male: { beginner: 0.35, intermediate: 0.65, advanced: 1.0, elite: 1.35 },
    female: { beginner: 0.2, intermediate: 0.4, advanced: 0.6, elite: 0.8 },
  },
  other: {
    male: { beginner: 0.5, intermediate: 1.0, advanced: 1.5, elite: 2.0 },
    female: { beginner: 0.25, intermediate: 0.5, advanced: 0.75, elite: 1.0 },
  },
};

// =============================================================================
// TRAINING PERCENTAGES
// =============================================================================
const TRAINING_PERCENTAGES = [
  { percent: 100, reps: "1", purpose: "Max Strength Test" },
  { percent: 95, reps: "2", purpose: "Peak Strength" },
  { percent: 90, reps: "3-4", purpose: "Strength/Power" },
  { percent: 85, reps: "5-6", purpose: "Strength" },
  { percent: 80, reps: "7-8", purpose: "Strength/Hypertrophy" },
  { percent: 75, reps: "9-10", purpose: "Hypertrophy" },
  { percent: 70, reps: "11-12", purpose: "Hypertrophy/Endurance" },
  { percent: 65, reps: "13-15", purpose: "Muscular Endurance" },
  { percent: 60, reps: "16-20", purpose: "Endurance/Warm-up" },
];

// =============================================================================
// 1RM FORMULAS
// =============================================================================
const calculate1RM = {
  epley: (weight: number, reps: number): number => {
    if (reps === 1) return weight;
    return weight * (1 + reps / 30);
  },
  brzycki: (weight: number, reps: number): number => {
    if (reps === 1) return weight;
    if (reps >= 37) return weight * 36;
    return weight * (36 / (37 - reps));
  },
  lander: (weight: number, reps: number): number => {
    if (reps === 1) return weight;
    return (100 * weight) / (101.3 - 2.67123 * reps);
  },
  lombardi: (weight: number, reps: number): number => {
    if (reps === 1) return weight;
    return weight * Math.pow(reps, 0.1);
  },
  mayhew: (weight: number, reps: number): number => {
    if (reps === 1) return weight;
    return (100 * weight) / (52.2 + 41.9 * Math.exp(-0.055 * reps));
  },
  oconner: (weight: number, reps: number): number => {
    if (reps === 1) return weight;
    return weight * (1 + 0.025 * reps);
  },
  wathen: (weight: number, reps: number): number => {
    if (reps === 1) return weight;
    return (100 * weight) / (48.8 + 53.8 * Math.exp(-0.075 * reps));
  },
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function OneRepMaxCalculatorPage() {
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
  const [exercise, setExercise] = useState<Exercise>("bench");
  const [weightLifted, setWeightLifted] = useState(135);
  const [reps, setReps] = useState(5);
  const [bodyweight, setBodyweight] = useState(170);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [preferredFormula, setPreferredFormula] = useState<keyof typeof calculate1RM>("epley");

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
      body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, language: locale, type: "VIEW" }),
    }).catch(console.error);
  }, [locale]);

  const trackCalculation = () => {
    if (hasTrackedCalculation.current) return;
    hasTrackedCalculation.current = true;
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, language: locale, type: "CALCULATION" }),
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
          body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, calculatorName: CALCULATOR_NAME, category: CALCULATOR_CATEGORY }),
        });
        setIsFavorite(true);
      }
    } catch {}
    setFavoriteLoading(false);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // CALCULATIONS
  // ─────────────────────────────────────────────────────────────────────────────
  const calculateAll1RM = () => {
    const results: Record<string, number> = {};
    for (const [name, formula] of Object.entries(calculate1RM)) {
      results[name] = Math.round(formula(weightLifted, reps));
    }
    return results;
  };

  const all1RMs = calculateAll1RM();
  const average1RM = Math.round(Object.values(all1RMs).reduce((a, b) => a + b, 0) / Object.values(all1RMs).length);
  const preferred1RM = all1RMs[preferredFormula];

  const getStrengthLevel = (): { level: string; color: string; progress: number } => {
    const standards = STRENGTH_STANDARDS[exercise][gender];
    const ratio = preferred1RM / bodyweight;
    if (ratio >= standards.elite) return { level: "Elite", color: "text-purple-700", progress: 100 };
    if (ratio >= standards.advanced) return { level: "Advanced", color: "text-blue-600", progress: 75 };
    if (ratio >= standards.intermediate) return { level: "Intermediate", color: "text-green-600", progress: 50 };
    if (ratio >= standards.beginner) return { level: "Beginner", color: "text-amber-600", progress: 25 };
    return { level: "Untrained", color: "text-slate-600", progress: 10 };
  };

  const strengthLevel = getStrengthLevel();

  const calculateWarmupSets = () => {
    const target = preferred1RM;
    return [
      { percent: 40, weight: Math.round(target * 0.4), reps: 8 },
      { percent: 50, weight: Math.round(target * 0.5), reps: 5 },
      { percent: 60, weight: Math.round(target * 0.6), reps: 3 },
      { percent: 70, weight: Math.round(target * 0.7), reps: 2 },
      { percent: 80, weight: Math.round(target * 0.8), reps: 1 },
      { percent: 90, weight: Math.round(target * 0.9), reps: 1 },
    ];
  };
  const warmupSets = calculateWarmupSets();

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
          inputs: { unitSystem, gender, exercise, weightLifted, reps, bodyweight },
          results: { estimated1RM: `${preferred1RM} ${unitSystem === "metric" ? "kg" : "lbs"}`, strengthLevel: strengthLevel.level },
        }),
      });
      if (res.ok) { setSaveStatus("saved"); setTimeout(() => setSaveStatus("idle"), 2000); }
      else setSaveStatus("error");
    } catch { setSaveStatus("error"); }
  };

  const weightUnit = unitSystem === "metric" ? "kg" : "lbs";

  // ─────────────────────────────────────────────────────────────────────────────
  // FAQs
  // ─────────────────────────────────────────────────────────────────────────────
  const defaultFaqs = [
    { question: "What is a One Rep Max (1RM)?", answer: "A one-rep max is the maximum weight you can lift for a single repetition with proper form. It's used to measure strength, program training intensity, and track progress over time." },
    { question: "Which 1RM formula is most accurate?", answer: "For 1-5 reps, Epley and Brzycki are most accurate. For 6-10 reps, Brzycki and Wathen work well. No formula is perfect—they're estimates with 2-10% margin of error." },
    { question: "Why shouldn't I test my actual 1RM?", answer: "Testing actual 1RM carries injury risk, requires proper warm-up and spotters, and is neurologically demanding. Estimation from submaximal lifts (3-10 reps) is safer." },
    { question: "How accurate are these estimates?", answer: "For reps under 10, estimates are typically within 2-5% of actual 1RM. Accuracy decreases with higher reps (10+)." },
    { question: "What are good strength standards?", answer: "For men: Beginner (1× BW bench, 1.25× squat, 1.5× deadlift), Intermediate (1× bench, 1.5× squat, 2× deadlift), Advanced (1.5× bench, 2× squat, 2.5× deadlift)." },
    { question: "How do I use my 1RM for training?", answer: "Use percentages: 85-95% for strength (1-5 reps), 70-85% for hypertrophy (6-12 reps), 50-70% for endurance (12+ reps)." },
  ];
  const faqs = translations?.faq || defaultFaqs;

  const financeCalcs = ["Mortgage", "Loan", "Compound Interest", "Auto Loan", "Retirement", "Savings"];
  const healthCalcs = ["BMI", "Calorie", "BMR", "TDEE", "Body Fat", "Macro", "Protein"];

  // =============================================================================
  // RENDER
  // =============================================================================
  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }) }} />

      <main id="main-content" className="min-h-screen bg-white pt-16">
        {/* HERO */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-4 md:py-6">
          <div className="container mx-auto px-4 max-w-6xl">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-600 mb-6">
              <Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link>
              <span className="text-slate-400" aria-hidden="true">/</span>
              <Link href={`/${locale}/calculators`} className="hover:text-blue-600 transition-colors">Calculators</Link>
              <span className="text-slate-400" aria-hidden="true">/</span>
              <span className="text-slate-900 font-medium" aria-current="page">One Rep Max</span>
            </nav>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl" role="img" aria-label="Calculator icon">🏋️</div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">One Rep Max Calculator</h1>
                <p className="text-slate-600 mt-1">Estimate your 1RM using 7 scientific formulas</p>
              </div>
            </div>
          </div>
        </section>

        {/* CALCULATOR */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* LEFT - INPUTS */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Enter Your Lift</h2>
                  <button onClick={toggleFavorite} disabled={favoriteLoading} className="p-2 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"} aria-pressed={isFavorite}>
                    {isFavorite ? <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg> : <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
                  </button>
                </div>

                {/* Unit System */}
                <div className="mb-6">
                  <label id="unit-label" className="block font-medium text-slate-700 mb-2">Unit System</label>
                  <div role="radiogroup" aria-labelledby="unit-label" className="grid grid-cols-2 gap-2">
                    {(["imperial", "metric"] as UnitSystem[]).map((u) => (
                      <button key={u} onClick={() => handleInputChange(setUnitSystem, u)} role="radio" aria-checked={unitSystem === u} className={`py-3 px-4 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${unitSystem === u ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
                        {u === "imperial" ? "Imperial (lb)" : "Metric (kg)"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Exercise */}
                <div className="mb-6">
                  <label id="exercise-label" className="block font-medium text-slate-700 mb-2">Exercise</label>
                  <div role="radiogroup" aria-labelledby="exercise-label" className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {(Object.entries(EXERCISES) as [Exercise, typeof EXERCISES[Exercise]][]).map(([k, v]) => (
                      <button key={k} onClick={() => handleInputChange(setExercise, k)} role="radio" aria-checked={exercise === k} className={`p-3 rounded-xl border text-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${exercise === k ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-slate-300"}`}>
                        <span className="text-xl block mb-1">{v.icon}</span>
                        <span className="text-xs font-medium text-slate-700">{v.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Weight Lifted */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="weight-input" className="font-medium text-slate-700">Weight Lifted</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input id="weight-input" type="number" min="1" max="1000" value={weightLifted} onChange={(e) => handleInputChange(setWeightLifted, Math.max(1, Number(e.target.value) || 1))} className="w-20 bg-transparent text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      <span className="text-slate-600 ml-1">{weightUnit}</span>
                    </div>
                  </div>
                  <input type="range" min="1" max="500" value={weightLifted} onChange={(e) => handleInputChange(setWeightLifted, Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" aria-label="Weight slider" />
                </div>

                {/* Reps */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="reps-input" className="font-medium text-slate-700">Reps Performed</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input id="reps-input" type="number" min="1" max="30" value={reps} onChange={(e) => handleInputChange(setReps, Math.max(1, Math.min(30, Number(e.target.value) || 1)))} className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      <span className="text-slate-600 ml-1">reps</span>
                    </div>
                  </div>
                  <input type="range" min="1" max="15" value={reps} onChange={(e) => handleInputChange(setReps, Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" aria-label="Reps slider" />
                  <p className="text-xs text-slate-600 mt-1">Best accuracy with 1-10 reps</p>
                </div>

                <div className="border-t border-slate-200 my-6"></div>

                {/* Gender */}
                <div className="mb-6">
                  <label id="gender-label" className="block font-medium text-slate-700 mb-2">Gender (for strength standards)</label>
                  <div role="radiogroup" aria-labelledby="gender-label" className="grid grid-cols-2 gap-2">
                    {(["male", "female"] as Gender[]).map((g) => (
                      <button key={g} onClick={() => handleInputChange(setGender, g)} role="radio" aria-checked={gender === g} className={`py-3 px-4 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${gender === g ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
                        {g === "male" ? "Male" : "Female"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bodyweight */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="bw-input" className="font-medium text-slate-700">Bodyweight</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input id="bw-input" type="number" min="50" max="400" value={bodyweight} onChange={(e) => handleInputChange(setBodyweight, Math.max(50, Number(e.target.value) || 50))} className="w-16 bg-transparent text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      <span className="text-slate-600 ml-1">{weightUnit}</span>
                    </div>
                  </div>
                </div>

                {/* Advanced Options */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button onClick={() => setShowAdvanced(!showAdvanced)} className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors focus:outline-none" aria-expanded={showAdvanced}>
                    <span className="font-medium text-slate-700">Advanced Options</span>
                    <svg className={`w-5 h-5 text-slate-600 transition-transform ${showAdvanced ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {showAdvanced && (
                    <div className="p-4 bg-white">
                      <label className="block font-medium text-slate-700 mb-2">Preferred Formula</label>
                      <select value={preferredFormula} onChange={(e) => handleInputChange(setPreferredFormula, e.target.value as keyof typeof calculate1RM)} className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="epley">Epley (Most Popular)</option>
                        <option value="brzycki">Brzycki (Conservative)</option>
                        <option value="lander">Lander</option>
                        <option value="lombardi">Lombardi</option>
                        <option value="mayhew">Mayhew (NFL Combine)</option>
                        <option value="oconner">O&apos;Conner</option>
                        <option value="wathen">Wathen (NSCA)</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT - RESULTS */}
              <div>
                {/* Main Result */}
                <div className="bg-slate-50 rounded-2xl p-6 mb-4" role="region" aria-label="Results" aria-live="polite">
                  <p className="text-sm text-slate-600 mb-1">Estimated One Rep Max</p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <p className="text-4xl md:text-5xl font-bold text-slate-900">{preferred1RM}</p>
                    <p className="text-xl text-slate-600">{weightUnit}</p>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">Using {preferredFormula.charAt(0).toUpperCase() + preferredFormula.slice(1)} formula</p>
                  
                  {/* Strength Level Card */}
                  <div className="bg-white rounded-xl border border-slate-200 p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-600">Strength Level</span>
                      <span className={`font-bold ${strengthLevel.color} px-3 py-1 rounded-full text-sm bg-slate-100`}>{strengthLevel.level}</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${strengthLevel.progress}%` }} role="progressbar" aria-valuenow={strengthLevel.progress} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                    <p className="text-xs text-slate-600 mt-2">{(preferred1RM / bodyweight).toFixed(2)}× bodyweight for {EXERCISES[exercise].label}</p>
                  </div>
                </div>

                {/* All Formulas */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">📊 All 7 Formulas</h3>
                  <div className="space-y-2">
                    {Object.entries(all1RMs).sort((a, b) => b[1] - a[1]).map(([name, value]) => {
                      const maxVal = Math.max(...Object.values(all1RMs));
                      const pct = (value / maxVal) * 100;
                      return (
                        <div key={name} className="flex items-center gap-3">
                          <span className="w-20 text-xs text-slate-600 capitalize">{name}</span>
                          <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${name === preferredFormula ? "bg-blue-500" : "bg-slate-300"}`} style={{ width: `${pct}%` }} />
                          </div>
                          <span className={`w-16 text-right font-medium ${name === preferredFormula ? "text-blue-600" : "text-slate-700"}`}>{value}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between">
                    <span className="text-slate-600">Average</span>
                    <span className="font-bold text-slate-900">{average1RM} {weightUnit}</span>
                  </div>
                </div>

                {/* Training Loads */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">🎯 Training Loads</h3>
                  <div className="space-y-2 text-sm">
                    {TRAINING_PERCENTAGES.slice(0, 6).map((row) => (
                      <div key={row.percent} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                        <span className="font-medium text-slate-700">{row.percent}%</span>
                        <span className="font-bold text-blue-600">{Math.round(preferred1RM * row.percent / 100)} {weightUnit}</span>
                        <span className="text-slate-600">{row.reps} reps</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Warm-up Protocol */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">🔥 Warm-up Protocol</h3>
                  <div className="space-y-2 text-sm">
                    {warmupSets.map((set, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                        <span className="text-slate-600">Set {idx + 1}</span>
                        <span className="font-bold text-slate-800">{set.weight} {weightUnit}</span>
                        <span className="text-slate-600">× {set.reps}</span>
                        <span className="text-xs text-slate-400">{set.percent}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Export Buttons */}
                <div className={`grid ${session?.user ? "grid-cols-3" : "grid-cols-2"} gap-3`}>
                  {session?.user && (
                    <button onClick={saveToHistory} disabled={saveStatus === "saving"} className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                      {saveStatus === "saving" ? "⏳ Saving..." : saveStatus === "saved" ? "✅ Saved!" : "💾 Save"}
                    </button>
                  )}
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">📄 PDF <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">PRO</span></button>
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">📊 Excel <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">PRO</span></button>
                </div>
              </div>
            </div>

            <div className="mt-8"><AdBlock slot="calculator-bottom" /></div>

            {/* ═══════════════════════════════════════════════════════════════════
                INFO CARDS
            ═══════════════════════════════════════════════════════════════════ */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">📐 About the Formulas</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Epley (1985):</strong> Most widely used, good for higher reps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Brzycki:</strong> Conservative estimate, popular in powerlifting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Mayhew:</strong> Used in NFL Combine testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Wathen:</strong> Recommended by NSCA for athletes</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">⚠️ Important Considerations</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">!</span>
                    <span>Most accurate with 1-10 reps, less reliable above 10</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">!</span>
                    <span>Results are estimates - actual 1RM may vary</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">!</span>
                    <span>Always warm up properly before heavy lifts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">!</span>
                    <span>Use a spotter when testing maximal strength</span>
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
              Lifter benches 185 lbs for 8 reps
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Epley Formula</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>1RM = weight × (1 + reps/30)</p>
                  <p>1RM = 185 × (1 + 8/30)</p>
                  <p>1RM = 185 × 1.267</p>
                  <p className="font-bold text-blue-600 mt-2">1RM = 234 lbs</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Brzycki Formula</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>1RM = weight / (1.0278 - 0.0278 × reps)</p>
                  <p>1RM = 185 / (1.0278 - 0.0278 × 8)</p>
                  <p>1RM = 185 / 0.8054</p>
                  <p className="font-bold text-blue-600 mt-2">1RM = 230 lbs</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strength Standards Table */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">💪 {EXERCISES[exercise].label} Strength Standards ({gender === "male" ? "Male" : "Female"})</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-slate-200"><th className="text-left py-3 px-4 font-medium text-slate-600">Level</th><th className="text-center py-3 px-4 font-medium text-slate-600">× BW</th><th className="text-right py-3 px-4 font-medium text-slate-600">For {bodyweight} {weightUnit}</th></tr></thead>
                  <tbody>
                    {Object.entries(STRENGTH_STANDARDS[exercise][gender]).map(([level, mult]) => {
                      const target = Math.round(bodyweight * mult);
                      const isCurrent = level.toLowerCase() === strengthLevel.level.toLowerCase();
                      return <tr key={level} className={isCurrent ? "bg-blue-50" : ""}><td className="py-3 px-4 font-medium capitalize">{level}</td><td className="py-3 px-4 text-center">{mult}×</td><td className={`py-3 px-4 text-right font-bold ${isCurrent ? "text-blue-600" : "text-slate-900"}`}>{target} {weightUnit}</td></tr>;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* EDUCATIONAL + SIDEBAR */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding One Rep Max</h2>
                  <p className="text-slate-600 mb-4">Your one-rep max (1RM) is the maximum weight you can lift for a single repetition with proper form. It&apos;s the gold standard for measuring maximal strength and is used to program training intensity across different rep ranges.</p>
                  <p className="text-slate-600">Rather than testing your actual 1RM (which carries injury risk), you can safely estimate it using submaximal lifts. This calculator uses 7 validated formulas to give you accurate estimates based on the weight you can lift for multiple reps.</p>
                </div>
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqs.map((faq, i) => (
                      <details key={i} className="group">
                        <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-slate-50 rounded-xl hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                          <svg className="w-5 h-5 text-slate-600 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </summary>
                        <p className="text-slate-600 p-4 pt-2">{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <AdBlock slot="calculator-sidebar" />
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-sm">💪</span>Health Calculators</h3>
                  <nav aria-label="Health calculators"><div className="space-y-2">{healthCalcs.map((c) => <Link key={c} href={`/${locale}/${c.toLowerCase().replace(/ /g, "-")}-calculator`} className="block text-blue-600 hover:text-blue-800 hover:underline text-sm">{c} Calculator</Link>)}</div></nav>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">💰</span>Financial Calculators</h3>
                  <nav aria-label="Financial calculators"><div className="space-y-2">{financeCalcs.map((c) => <Link key={c} href={`/${locale}/${c.toLowerCase().replace(/ /g, "-")}-calculator`} className="block text-blue-600 hover:text-blue-800 hover:underline text-sm">{c} Calculator</Link>)}</div></nav>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                  <h3 className="font-bold mb-2">🥩 Calculate Your Protein Needs</h3>
                  <p className="text-blue-100 text-sm mb-4">Building strength requires adequate protein. Find your optimal intake.</p>
                  <Link href={`/${locale}/protein-calculator`} className="inline-block bg-white text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">Try Protein Calculator →</Link>
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
