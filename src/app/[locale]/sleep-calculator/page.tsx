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
const CALCULATOR_SLUG = "sleep-calculator";
const CALCULATOR_NAME = "Sleep Calculator";
const CALCULATOR_CATEGORY = "health";

// =============================================================================
// TYPES
// =============================================================================
type CalculationMode = "wake-at" | "sleep-now" | "sleep-at";
type AgeGroup = "infant" | "toddler" | "preschool" | "school" | "teen" | "adult" | "senior";

// =============================================================================
// SLEEP RECOMMENDATIONS BY AGE (CDC/NSF)
// =============================================================================
const SLEEP_RECOMMENDATIONS: Record<AgeGroup, { label: string; min: number; max: number; ageRange: string }> = {
  infant: { label: "Infant", min: 12, max: 15, ageRange: "4-11 months" },
  toddler: { label: "Toddler", min: 11, max: 14, ageRange: "1-2 years" },
  preschool: { label: "Preschool", min: 10, max: 13, ageRange: "3-5 years" },
  school: { label: "School Age", min: 9, max: 11, ageRange: "6-13 years" },
  teen: { label: "Teen", min: 8, max: 10, ageRange: "14-17 years" },
  adult: { label: "Adult", min: 7, max: 9, ageRange: "18-64 years" },
  senior: { label: "Senior", min: 7, max: 8, ageRange: "65+ years" },
};

// =============================================================================
// SLEEP CYCLE CONFIG
// =============================================================================
const DEFAULT_SLEEP_CYCLE_MINUTES = 90;
const DEFAULT_FALL_ASLEEP_MINUTES = 15;
const OPTIMAL_CYCLES = [4, 5, 6]; // 6h, 7.5h, 9h

// =============================================================================
// SLEEP STAGES INFO
// =============================================================================
const SLEEP_STAGES = [
  { stage: "N1 - Light Sleep", duration: "5-10 min", description: "Transition from wakefulness, easily awakened" },
  { stage: "N2 - Light Sleep", duration: "10-25 min", description: "Heart rate slows, body temperature drops" },
  { stage: "N3 - Deep Sleep", duration: "20-40 min", description: "Restorative sleep, growth hormone released" },
  { stage: "REM Sleep", duration: "10-60 min", description: "Dreams occur, memory consolidation" },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
};

const parseTime = (timeStr: string): Date => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

const addMinutes = (date: Date, minutes: number): Date => {
  return new Date(date.getTime() + minutes * 60000);
};

const subtractMinutes = (date: Date, minutes: number): Date => {
  return new Date(date.getTime() - minutes * 60000);
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function SleepCalculatorPage() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - Inputs
  // ─────────────────────────────────────────────────────────────────────────────
  const [mode, setMode] = useState<CalculationMode>("wake-at");
  const [wakeUpTime, setWakeUpTime] = useState("07:00");
  const [bedTime, setBedTime] = useState("23:00");
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("adult");
  
  // Advanced
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [fallAsleepMinutes, setFallAsleepMinutes] = useState(DEFAULT_FALL_ASLEEP_MINUTES);
  const [sleepCycleMinutes, setSleepCycleMinutes] = useState(DEFAULT_SLEEP_CYCLE_MINUTES);

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
  
  // Get current time
  const getCurrentTime = (): Date => new Date();

  // Calculate bedtimes for "wake at X" mode
  const calculateBedtimes = () => {
    const wake = parseTime(wakeUpTime);
    const results: { cycles: number; bedtime: Date; sleepDuration: number; rating: "optimal" | "good" | "poor" }[] = [];
    
    for (let cycles = 6; cycles >= 3; cycles--) {
      const sleepDuration = cycles * sleepCycleMinutes;
      const bedtime = subtractMinutes(wake, sleepDuration + fallAsleepMinutes);
      const rating = cycles >= 5 ? "optimal" : cycles >= 4 ? "good" : "poor";
      results.push({ cycles, bedtime, sleepDuration, rating });
    }
    
    return results;
  };

  // Calculate wake times for "sleep now" or "sleep at X" mode
  const calculateWakeTimes = () => {
    const sleepTime = mode === "sleep-now" ? getCurrentTime() : parseTime(bedTime);
    const fallAsleep = addMinutes(sleepTime, fallAsleepMinutes);
    const results: { cycles: number; wakeTime: Date; sleepDuration: number; rating: "optimal" | "good" | "poor" }[] = [];
    
    for (let cycles = 3; cycles <= 6; cycles++) {
      const sleepDuration = cycles * sleepCycleMinutes;
      const wakeTime = addMinutes(fallAsleep, sleepDuration);
      const rating = cycles >= 5 ? "optimal" : cycles >= 4 ? "good" : "poor";
      results.push({ cycles, wakeTime, sleepDuration, rating });
    }
    
    return results;
  };

  const bedtimeResults = mode === "wake-at" ? calculateBedtimes() : [];
  const wakeTimeResults = mode !== "wake-at" ? calculateWakeTimes() : [];

  // Sleep recommendation for age
  const recommendation = SLEEP_RECOMMENDATIONS[ageGroup];
  const optimalSleepHours = (recommendation.min + recommendation.max) / 2;

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
          inputs: { mode, wakeUpTime, bedTime, ageGroup, fallAsleepMinutes, sleepCycleMinutes },
          results: {
            recommendation: `${recommendation.min}-${recommendation.max} hours`,
            mode,
          },
        }),
      });
      if (res.ok) { setSaveStatus("saved"); setTimeout(() => setSaveStatus("idle"), 2000); }
      else setSaveStatus("error");
    } catch { setSaveStatus("error"); }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // CURRENT TIME DISPLAY
  // ─────────────────────────────────────────────────────────────────────────────
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  // FAQs
  // ─────────────────────────────────────────────────────────────────────────────
  const defaultFaqs = [
    { question: "Why are sleep cycles 90 minutes?", answer: "A complete sleep cycle typically lasts 90 minutes and includes all stages: light sleep (N1, N2), deep sleep (N3), and REM sleep. Waking at the end of a cycle (during light sleep) helps you feel more refreshed." },
    { question: "How many sleep cycles do I need?", answer: "Most adults need 4-6 complete cycles (6-9 hours). 5 cycles (7.5 hours) is optimal for most adults. Children and teens need more cycles due to growth and development needs." },
    { question: "Why do I feel tired even after 8 hours of sleep?", answer: "You may be waking during deep sleep or REM. Try adjusting your wake time by 15-30 minutes to align with the end of a cycle. Sleep quality, consistency, and sleep disorders also affect how rested you feel." },
    { question: "What's the best time to go to bed?", answer: "The best bedtime aligns with your circadian rhythm (typically 10pm-midnight for adults) and gives you enough cycles before your wake time. Consistency matters more than the specific hour." },
    { question: "How long should it take to fall asleep?", answer: "Healthy sleep onset is 10-20 minutes. Falling asleep immediately may indicate sleep deprivation. Taking over 30 minutes regularly may indicate insomnia or poor sleep hygiene." },
    { question: "Does sleep need change with age?", answer: "Yes. Newborns need 14-17 hours, teens need 8-10 hours, adults need 7-9 hours, and seniors often need slightly less (7-8 hours). Individual needs vary within these ranges." },
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
              <span className="text-slate-900 font-medium" aria-current="page">Sleep Calculator</span>
            </nav>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl" role="img" aria-label="Calculator icon">😴</div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Sleep Calculator</h1>
                <p className="text-slate-600 mt-1">Wake up refreshed by aligning with your sleep cycles</p>
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
                  <h2 className="text-xl font-bold text-slate-900">Your Sleep Schedule</h2>
                  <button onClick={toggleFavorite} disabled={favoriteLoading} className="p-2 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"} aria-pressed={isFavorite}>
                    {isFavorite ? <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg> : <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
                  </button>
                </div>

                {/* Current Time Display */}
                <div className="bg-slate-50 rounded-xl p-4 mb-6 text-center">
                  <p className="text-sm text-slate-600">Current Time</p>
                  <p className="text-2xl font-bold text-slate-900">{formatTime(currentTime)}</p>
                </div>

                {/* Calculation Mode */}
                <div className="mb-6">
                  <label id="mode-label" className="block font-medium text-slate-700 mb-2">I want to...</label>
                  <div role="radiogroup" aria-labelledby="mode-label" className="grid grid-cols-1 gap-2">
                    {([
                      { value: "wake-at", label: "Wake up at a specific time", icon: "⏰" },
                      { value: "sleep-now", label: "Go to sleep now", icon: "🌙" },
                      { value: "sleep-at", label: "Go to bed at a specific time", icon: "🛏️" },
                    ] as const).map((opt) => (
                      <button key={opt.value} onClick={() => handleInputChange(setMode, opt.value)} role="radio" aria-checked={mode === opt.value} className={`py-3 px-4 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-3 ${mode === opt.value ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
                        <span className="text-xl">{opt.icon}</span>
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Input based on mode */}
                {mode === "wake-at" && (
                  <div className="mb-6">
                    <label htmlFor="wake-time" className="block font-medium text-slate-700 mb-2">I need to wake up at</label>
                    <input id="wake-time" type="time" value={wakeUpTime} onChange={(e) => handleInputChange(setWakeUpTime, e.target.value)} className="w-full p-4 text-2xl font-bold text-center border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                )}

                {mode === "sleep-at" && (
                  <div className="mb-6">
                    <label htmlFor="bed-time" className="block font-medium text-slate-700 mb-2">I plan to go to bed at</label>
                    <input id="bed-time" type="time" value={bedTime} onChange={(e) => handleInputChange(setBedTime, e.target.value)} className="w-full p-4 text-2xl font-bold text-center border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                )}

                {/* Age Group */}
                <div className="mb-6">
                  <label htmlFor="age-group" className="block font-medium text-slate-700 mb-2">Age Group</label>
                  <select id="age-group" value={ageGroup} onChange={(e) => handleInputChange(setAgeGroup, e.target.value as AgeGroup)} className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {Object.entries(SLEEP_RECOMMENDATIONS).map(([key, val]) => (
                      <option key={key} value={key}>{val.label} ({val.ageRange})</option>
                    ))}
                  </select>
                  <p className="text-xs text-slate-600 mt-2">Recommended: {recommendation.min}-{recommendation.max} hours of sleep</p>
                </div>

                {/* Advanced Options */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button onClick={() => setShowAdvanced(!showAdvanced)} className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors focus:outline-none" aria-expanded={showAdvanced}>
                    <span className="font-medium text-slate-700">Advanced Options</span>
                    <svg className={`w-5 h-5 text-slate-600 transition-transform ${showAdvanced ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {showAdvanced && (
                    <div className="p-4 bg-white space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label htmlFor="fall-asleep" className="font-medium text-slate-700">Time to fall asleep</label>
                          <span className="text-blue-600 font-bold">{fallAsleepMinutes} min</span>
                        </div>
                        <input id="fall-asleep" type="range" min="5" max="45" value={fallAsleepMinutes} onChange={(e) => handleInputChange(setFallAsleepMinutes, Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                        <p className="text-xs text-slate-600 mt-1">Average is 10-20 minutes</p>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label htmlFor="cycle-length" className="font-medium text-slate-700">Sleep cycle length</label>
                          <span className="text-blue-600 font-bold">{sleepCycleMinutes} min</span>
                        </div>
                        <input id="cycle-length" type="range" min="75" max="110" value={sleepCycleMinutes} onChange={(e) => handleInputChange(setSleepCycleMinutes, Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                        <p className="text-xs text-slate-600 mt-1">Average is 90 minutes (range: 80-120)</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT - RESULTS */}
              <div>
                {/* Main Results Card */}
                <div className="bg-slate-50 rounded-2xl p-6 mb-4" role="region" aria-label="Results" aria-live="polite">
                  <p className="text-sm text-slate-600 mb-1">
                    {mode === "wake-at" ? "Best times to go to bed" : "Best times to wake up"}
                  </p>
                  <p className="text-xs text-slate-400 mb-4">
                    Based on {sleepCycleMinutes}-minute sleep cycles
                  </p>

                  {/* Results List */}
                  <div className="space-y-3">
                    {mode === "wake-at" ? (
                      bedtimeResults.map((result, idx) => (
                        <div key={idx} className={`bg-white rounded-xl border p-4 ${result.rating === "optimal" ? "border-green-300 ring-1 ring-green-200" : "border-slate-200"}`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-2xl font-bold text-slate-900">{formatTime(result.bedtime)}</p>
                              <p className="text-sm text-slate-600">{result.cycles} cycles • {Math.floor(result.sleepDuration / 60)}h {result.sleepDuration % 60}m</p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                              result.rating === "optimal" ? "bg-green-100 text-green-700" :
                              result.rating === "good" ? "bg-yellow-100 text-yellow-700" :
                              "bg-red-100 text-red-700"
                            }`}>
                              {result.rating === "optimal" ? "✓ Optimal" : result.rating === "good" ? "Good" : "Minimum"}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      wakeTimeResults.map((result, idx) => (
                        <div key={idx} className={`bg-white rounded-xl border p-4 ${result.rating === "optimal" ? "border-green-300 ring-1 ring-green-200" : "border-slate-200"}`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-2xl font-bold text-slate-900">{formatTime(result.wakeTime)}</p>
                              <p className="text-sm text-slate-600">{result.cycles} cycles • {Math.floor(result.sleepDuration / 60)}h {result.sleepDuration % 60}m</p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                              result.rating === "optimal" ? "bg-green-100 text-green-700" :
                              result.rating === "good" ? "bg-yellow-100 text-yellow-700" :
                              "bg-red-100 text-red-700"
                            }`}>
                              {result.rating === "optimal" ? "✓ Optimal" : result.rating === "good" ? "Good" : "Minimum"}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Age Recommendation */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">📋 Recommendation for {recommendation.label}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-600">Age Range</span>
                    <span className="font-medium text-slate-900">{recommendation.ageRange}</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-600">Recommended Sleep</span>
                    <span className="font-bold text-blue-600">{recommendation.min}-{recommendation.max} hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Optimal Cycles</span>
                    <span className="font-medium text-slate-900">{Math.ceil(recommendation.min * 60 / sleepCycleMinutes)}-{Math.floor(recommendation.max * 60 / sleepCycleMinutes)} cycles</span>
                  </div>
                </div>

                {/* Sleep Cycle Explanation */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">🔄 Sleep Cycle Stages</h3>
                  <div className="space-y-3">
                    {SLEEP_STAGES.map((stage, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-medium text-slate-800">{stage.stage}</p>
                          <p className="text-xs text-slate-600">{stage.duration} • {stage.description}</p>
                        </div>
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
                <h3 className="text-lg font-bold text-slate-900 mb-4">🔄 About Sleep Cycles</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>90-minute cycles:</strong> Each cycle includes light, deep, and REM sleep</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>4-6 cycles optimal:</strong> Most adults need 6-9 hours of sleep</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Wake during light sleep:</strong> Reduces grogginess and sleep inertia</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Fall asleep time:</strong> Account for 10-20 minutes to drift off</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">⚠️ Important Considerations</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">!</span>
                    <span>Individual cycle length varies (80-120 minutes)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">!</span>
                    <span>Sleep quality matters as much as quantity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">!</span>
                    <span>Consistency is key - maintain regular sleep schedule</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">!</span>
                    <span>Consult a doctor if you have persistent sleep issues</span>
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
              Adult wanting to wake up at 7:00 AM, with 15 minutes to fall asleep
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">6 Cycles (9 hours) - Optimal</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>Wake time: 7:00 AM</p>
                  <p>- 6 cycles × 90 min = 540 min (9h)</p>
                  <p>- 15 min to fall asleep</p>
                  <p className="font-bold text-blue-600 mt-2">Bedtime = 9:45 PM</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">5 Cycles (7.5 hours) - Good</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>Wake time: 7:00 AM</p>
                  <p>- 5 cycles × 90 min = 450 min (7.5h)</p>
                  <p>- 15 min to fall asleep</p>
                  <p className="font-bold text-blue-600 mt-2">Bedtime = 11:15 PM</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sleep Recommendations by Age Table */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">📊 Sleep Recommendations by Age (CDC/NSF)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-slate-200"><th className="text-left py-3 px-4 font-medium text-slate-600">Age Group</th><th className="text-center py-3 px-4 font-medium text-slate-600">Age Range</th><th className="text-center py-3 px-4 font-medium text-slate-600">Hours Needed</th><th className="text-right py-3 px-4 font-medium text-slate-600">Cycles</th></tr></thead>
                  <tbody>
                    {Object.entries(SLEEP_RECOMMENDATIONS).map(([key, val]) => {
                      const isSelected = key === ageGroup;
                      return <tr key={key} className={isSelected ? "bg-blue-50" : ""}><td className="py-3 px-4 font-medium">{val.label}</td><td className="py-3 px-4 text-center">{val.ageRange}</td><td className={`py-3 px-4 text-center font-bold ${isSelected ? "text-blue-600" : "text-slate-900"}`}>{val.min}-{val.max} hrs</td><td className="py-3 px-4 text-right">{Math.ceil(val.min * 60 / 90)}-{Math.floor(val.max * 60 / 90)}</td></tr>;
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding Sleep Cycles</h2>
                  <p className="text-slate-600 mb-4">Each night, you cycle through multiple sleep stages approximately every 90 minutes. A complete cycle includes light sleep (N1, N2), deep sleep (N3), and REM sleep. Waking at the end of a cycle—during light sleep—helps you feel more refreshed and alert.</p>
                  <p className="text-slate-600">Most adults need 4-6 complete cycles per night (6-9 hours). This calculator helps you time your sleep so you wake during light sleep rather than in the middle of deep sleep, which causes grogginess (sleep inertia).</p>
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
                  <h3 className="font-bold mb-2">🥗 Optimize Your Nutrition</h3>
                  <p className="text-blue-100 text-sm mb-4">Good sleep requires proper nutrition. Calculate your daily calorie needs.</p>
                  <Link href={`/${locale}/calorie-calculator`} className="inline-block bg-white text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">Try Calorie Calculator →</Link>
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
