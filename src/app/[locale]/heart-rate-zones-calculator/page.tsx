"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import AdBlock from "@/components/ads/AdBlock";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

const CALCULATOR_SLUG = "heart-rate-zones-calculator";
const CALCULATOR_NAME = "Heart Rate Zones Calculator";
const CALCULATOR_CATEGORY = "health";

// Max HR Formulas
const MAX_HR_FORMULAS = {
  standard: { name: "220 - Age", desc: "Traditional formula", calc: (age: number) => 220 - age },
  tanaka: { name: "Tanaka", desc: "208 - (0.7 × Age)", calc: (age: number) => Math.round(208 - 0.7 * age) },
  hunt: { name: "HUNT", desc: "211 - (0.64 × Age)", calc: (age: number) => Math.round(211 - 0.64 * age) },
};

// Fitness Levels
const FITNESS_LEVELS = {
  sedentary: { label: "Sedentary", range: "70-90 bpm", rhr: 75 },
  moderate: { label: "Moderately Active", range: "60-70 bpm", rhr: 65 },
  active: { label: "Very Active", range: "55-65 bpm", rhr: 58 },
  athlete: { label: "Trained Athlete", range: "45-55 bpm", rhr: 50 },
  elite: { label: "Elite Athlete", range: "35-45 bpm", rhr: 42 },
};

// Heart Rate Zones
const HR_ZONES = [
  { zone: 1, name: "Recovery", pct: [50, 60], color: "bg-gray-400", desc: "Active recovery, warm-up", rpe: "1-2", talk: "Sing comfortably" },
  { zone: 2, name: "Aerobic", pct: [60, 70], color: "bg-blue-400", desc: "Endurance, fat burning", rpe: "3-4", talk: "Full conversation" },
  { zone: 3, name: "Tempo", pct: [70, 80], color: "bg-green-500", desc: "Marathon pace, aerobic power", rpe: "5-6", talk: "Short sentences" },
  { zone: 4, name: "Threshold", pct: [80, 90], color: "bg-yellow-500", desc: "Lactate threshold, 10K pace", rpe: "7-8", talk: "Few words" },
  { zone: 5, name: "Maximum", pct: [90, 100], color: "bg-red-500", desc: "Max effort, sprints", rpe: "9-10", talk: "Cannot talk" },
];

export default function HeartRateZonesCalculator() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // Calculator state
  const [age, setAge] = useState(30);
  const [formula, setFormula] = useState<"standard" | "tanaka" | "hunt">("tanaka");
  const [useCustomMax, setUseCustomMax] = useState(false);
  const [customMaxHR, setCustomMaxHR] = useState(190);
  const [knowsRHR, setKnowsRHR] = useState(false);
  const [restingHR, setRestingHR] = useState(60);
  const [fitnessLevel, setFitnessLevel] = useState<keyof typeof FITNESS_LEVELS>("moderate");
  const [weeklyHours, setWeeklyHours] = useState(5);

  // Results
  const [maxHR, setMaxHR] = useState(0);
  const [rhr, setRhr] = useState(0);
  const [hrReserve, setHrReserve] = useState(0);
  const [zones, setZones] = useState<{ zone: number; name: string; min: number; max: number; pct: number[]; color: string; desc: string; rpe: string; talk: string; weeklyMin: number }[]>([]);
  const [rhrAnalysis, setRhrAnalysis] = useState("");

  // Favorites & Save
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Tracking
  useEffect(() => {
    if (hasTrackedView.current) return;
    hasTrackedView.current = true;
    fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, language: locale, type: "VIEW" }) }).catch(console.error);
  }, [locale]);

  const trackCalculation = () => {
    if (hasTrackedCalculation.current) return;
    hasTrackedCalculation.current = true;
    fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, language: locale, type: "CALCULATION" }) }).catch(console.error);
  };

  const saveToHistory = async () => {
    if (!session?.user) return;
    setSaveStatus('saving');
    try {
      const res = await fetch("/api/history", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, calculatorName: CALCULATOR_NAME, inputs: { age, formula, restingHR: rhr }, results: { maxHR, hrReserve, zones: zones.map(z => `Z${z.zone}: ${z.min}-${z.max}`) } }) });
      if (res.ok) { setSaveStatus('saved'); setTimeout(() => setSaveStatus('idle'), 2000); } else { setSaveStatus('error'); }
    } catch { setSaveStatus('error'); }
  };

  const handleInputChange = (setter: (value: any) => void, value: any) => { setter(value); trackCalculation(); };

  const SaveIndicator = () => {
    if (saveStatus === 'idle') return null;
    if (saveStatus === 'saving') return <span className="text-xs text-slate-400">Saving...</span>;
    if (saveStatus === 'saved') return <span className="text-xs text-green-500">✓ Saved</span>;
    return <span className="text-xs text-red-500">Error</span>;
  };

  // Favorites
  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const res = await fetch('/api/favorites');
        if (res.ok) { const data = await res.json(); setIsFavorite(data.favorites?.some((f: any) => f.calculatorSlug === CALCULATOR_SLUG)); }
      } catch (error) {}
    };
    checkFavorite();
  }, []);

  const toggleFavorite = async () => {
    setFavoriteLoading(true);
    try {
      if (isFavorite) { await fetch(`/api/favorites?slug=${CALCULATOR_SLUG}`, { method: 'DELETE' }); setIsFavorite(false); }
      else { await fetch('/api/favorites', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, calculatorName: CALCULATOR_NAME, category: CALCULATOR_CATEGORY }) }); setIsFavorite(true); }
    } catch (error) {}
    setFavoriteLoading(false);
  };

  // Main calculation
  useEffect(() => {
    // Max HR
    const calculatedMax = useCustomMax ? customMaxHR : MAX_HR_FORMULAS[formula].calc(age);
    setMaxHR(calculatedMax);

    // Resting HR
    const calculatedRHR = knowsRHR ? restingHR : FITNESS_LEVELS[fitnessLevel].rhr;
    setRhr(calculatedRHR);

    // HR Reserve (Karvonen)
    const reserve = calculatedMax - calculatedRHR;
    setHrReserve(reserve);

    // Calculate zones using Karvonen: Target HR = ((Max - RHR) × %Intensity) + RHR
    const weeklyMinutes = weeklyHours * 60;
    const distribution = [10, 70, 10, 8, 2]; // 80/20 rule

    const calculatedZones = HR_ZONES.map((z, i) => ({
      ...z,
      min: Math.round(reserve * (z.pct[0] / 100) + calculatedRHR),
      max: Math.round(reserve * (z.pct[1] / 100) + calculatedRHR),
      weeklyMin: Math.round(weeklyMinutes * distribution[i] / 100),
    }));
    setZones(calculatedZones);

    // RHR Analysis
    let analysis = "";
    if (calculatedRHR < 50) analysis = "Excellent! Elite cardiovascular fitness.";
    else if (calculatedRHR < 60) analysis = "Very good! Well-conditioned heart.";
    else if (calculatedRHR < 70) analysis = "Good. Regular exercise can improve it.";
    else if (calculatedRHR < 80) analysis = "Average. Increase Zone 2 training.";
    else analysis = "Above average. Focus on consistent exercise.";
    setRhrAnalysis(analysis);

  }, [age, formula, useCustomMax, customMaxHR, knowsRHR, restingHR, fitnessLevel, weeklyHours]);

  // Formula comparison table
  const formulaTable = [20, 30, 40, 50, 60, 70].map(a => ({
    age: a,
    standard: 220 - a,
    tanaka: Math.round(208 - 0.7 * a),
    hunt: Math.round(211 - 0.64 * a),
  }));

  // FAQs
  const faqs = [
    { question: "What is the Karvonen formula?", answer: "Target HR = ((Max HR - Resting HR) × %Intensity) + Resting HR. More accurate than simple max HR percentage because it accounts for fitness level." },
    { question: "How do I measure resting heart rate?", answer: "Measure first thing in the morning before getting out of bed. Count for 60 seconds. Test 3-5 days and average the results." },
    { question: "Which max HR formula is best?", answer: "Tanaka (208 - 0.7×age) is more accurate for most adults. The traditional 220-age has a ±10-12 bpm error. For best accuracy, do an actual max HR test." },
    { question: "What is the 80/20 rule?", answer: "80% easy (Zones 1-2) + 20% hard (Zones 3-5) produces optimal endurance adaptations while minimizing overtraining risk." },
    { question: "Why are cycling zones different?", answer: "HR is typically 5-10 bpm lower cycling due to seated position. Swimming is 10-15 bpm lower due to horizontal position and cooling effect." },
  ];

  const financeCalcs = ["Compound Interest", "Mortgage", "Loan", "Auto Loan", "Savings", "Retirement"];
  const healthCalcs = ["BMI", "Calorie", "BMR", "TDEE", "Running Pace", "Body Fat"];

  return (
    <>
      <Header />

      {/* Schema.org FAQ */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }) }} />

      <main className="pt-20">
        {/* HERO SECTION */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-6">
          <div className="container">
            <nav className="text-sm mb-4">
              <Link href={`/${locale}`} className="text-slate-600 hover:text-blue-600">Home</Link>
              <span className="mx-2 text-slate-400">/</span>
              <Link href={`/${locale}/calculators`} className="text-slate-600 hover:text-blue-600">Calculators</Link>
              <span className="mx-2 text-slate-400">/</span>
              <span className="text-slate-700">Heart Rate Zones</span>
            </nav>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">❤️</div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Heart Rate Zones Calculator</h1>
                  <button onClick={toggleFavorite} disabled={favoriteLoading} className="p-2 rounded-full hover:bg-slate-100 transition-colors" title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
                    {isFavorite ? <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> : <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>}
                  </button>
                </div>
                <div className="flex items-center gap-2 h-6">
                  <p className="text-slate-600">Calculate personalized training zones using Karvonen formula</p>
                  {saveStatus !== 'idle' && <><span className="text-slate-400">—</span><SaveIndicator /></>}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CALCULATOR SECTION */}
        <section className="py-6 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8">

              {/* LEFT - Inputs */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Enter Your Details</h2>

                {/* Age */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Age</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="font-bold text-blue-600">{age} years</span>
                    </div>
                  </div>
                  <input type="range" min="15" max="80" value={age} onChange={(e) => handleInputChange(setAge, Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                  <div className="flex justify-between text-xs text-slate-600 mt-1"><span>15</span><span>80</span></div>
                </div>

                {/* Max HR Formula */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">Max Heart Rate Formula</label>
                  <div className="flex items-center gap-2 mb-3">
                    <input type="checkbox" id="customMax" checked={useCustomMax} onChange={(e) => handleInputChange(setUseCustomMax, e.target.checked)} className="w-4 h-4 text-blue-600 rounded" />
                    <label htmlFor="customMax" className="text-sm text-slate-600">I know my actual max HR</label>
                  </div>
                  {useCustomMax ? (
                    <div className="flex items-center gap-2">
                      <input type="number" value={customMaxHR} onChange={(e) => handleInputChange(setCustomMaxHR, parseInt(e.target.value) || 190)} min={120} max={220} className="flex-1 px-4 py-2 border border-slate-200 rounded-lg" />
                      <span className="text-slate-600">bpm</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {(Object.keys(MAX_HR_FORMULAS) as Array<keyof typeof MAX_HR_FORMULAS>).map((f) => (
                        <button key={f} onClick={() => handleInputChange(setFormula, f)} className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${formula === f ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
                          <span className="block">{MAX_HR_FORMULAS[f].name}</span>
                          <span className="text-xs opacity-75">{MAX_HR_FORMULAS[f].calc(age)} bpm</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Resting HR */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">Resting Heart Rate</label>
                  <div className="flex items-center gap-2 mb-3">
                    <input type="checkbox" id="knowsRHR" checked={knowsRHR} onChange={(e) => handleInputChange(setKnowsRHR, e.target.checked)} className="w-4 h-4 text-blue-600 rounded" />
                    <label htmlFor="knowsRHR" className="text-sm text-slate-600">I know my resting heart rate</label>
                  </div>
                  {knowsRHR ? (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-600">Your RHR</span>
                        <span className="font-bold text-blue-600">{restingHR} bpm</span>
                      </div>
                      <input type="range" min="35" max="100" value={restingHR} onChange={(e) => handleInputChange(setRestingHR, Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                    </>
                  ) : (
                    <div className="space-y-2">
                      {(Object.keys(FITNESS_LEVELS) as Array<keyof typeof FITNESS_LEVELS>).map((level) => (
                        <button key={level} onClick={() => handleInputChange(setFitnessLevel, level)} className={`w-full py-3 px-4 rounded-lg text-left transition-all ${fitnessLevel === level ? "bg-blue-100 text-blue-700 ring-1 ring-blue-300" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}>
                          <span className="font-medium">{FITNESS_LEVELS[level].label}</span>
                          <span className="text-sm opacity-75 ml-2">({FITNESS_LEVELS[level].range})</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Weekly Training Hours */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Weekly Training Hours</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="font-bold text-blue-600">{weeklyHours} hrs</span>
                    </div>
                  </div>
                  <input type="range" min="1" max="20" value={weeklyHours} onChange={(e) => handleInputChange(setWeeklyHours, Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                  <div className="flex justify-between text-xs text-slate-600 mt-1"><span>1 hr</span><span>20 hrs</span></div>
                </div>
              </div>

              {/* RIGHT - Results */}
              <div>
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  <p className="text-sm text-slate-600 mb-1">Your Heart Rate Zones</p>

                  {/* Summary Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
                      <p className="text-sm text-slate-600">Max HR</p>
                      <p className="text-2xl font-bold text-slate-800">{maxHR}</p>
                      <p className="text-xs text-slate-400">bpm</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
                      <p className="text-sm text-slate-600">Resting HR</p>
                      <p className="text-2xl font-bold text-slate-800">{rhr}</p>
                      <p className="text-xs text-slate-400">bpm</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
                      <p className="text-sm text-slate-600">HR Reserve</p>
                      <p className="text-2xl font-bold text-blue-600">{hrReserve}</p>
                      <p className="text-xs text-slate-400">bpm</p>
                    </div>
                  </div>

                  {/* Visual Zone Bar */}
                  <div className="mb-6">
                    <div className="h-6 rounded-full overflow-hidden flex">
                      {zones.map((z) => (
                        <div key={z.zone} className={`${z.color} flex-1 relative group cursor-pointer`} title={`Zone ${z.zone}: ${z.min}-${z.max} bpm`}>
                          <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Z{z.zone}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-slate-600 mt-1">
                      <span>{rhr} bpm</span>
                      <span>{maxHR} bpm</span>
                    </div>
                  </div>

                  {/* Zone Details */}
                  <div className="space-y-3">
                    {zones.map((z) => (
                      <div key={z.zone} className="bg-white rounded-xl p-4 border border-slate-200">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className={`w-3 h-3 rounded-full ${z.color}`}></span>
                            <span className="font-semibold text-slate-900">Zone {z.zone}: {z.name}</span>
                            <span className="text-sm text-slate-600">({z.pct[0]}-{z.pct[1]}%)</span>
                          </div>
                          <span className="text-lg font-bold text-slate-800">{z.min}-{z.max} bpm</span>
                        </div>
                        <p className="text-sm text-slate-600">{z.desc}</p>
                        <div className="flex gap-4 mt-2 text-xs text-slate-600">
                          <span>RPE: {z.rpe}</span>
                          <span>Talk: {z.talk}</span>
                          <span>Weekly: {z.weeklyMin} min</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* RHR Analysis */}
                  <div className="mt-4 bg-white rounded-xl p-4 border border-slate-200">
                    <p className="text-sm text-slate-600">RHR Analysis</p>
                    <p className="text-slate-800 font-medium">{rhrAnalysis}</p>
                  </div>
                </div>

                {/* Export Buttons */}
                <div className={`grid ${session?.user ? 'grid-cols-3' : 'grid-cols-2'} gap-3`}>
                  {session?.user && (
                    <button onClick={saveToHistory} disabled={saveStatus === 'saving'} className="bg-white border border-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50">💾 {saveStatus === 'saving' ? '...' : 'Save'}</button>
                  )}
                  <button className="bg-white border border-slate-200 text-slate-400 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed">📄 PDF <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">PRO</span></button>
                  <button className="bg-white border border-slate-200 text-slate-400 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed">📊 Excel <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">PRO</span></button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* AD BLOCK */}
        <section className="py-4 bg-white">
          <div className="container"><AdBlock slot="calculator-bottom" /></div>
        </section>

        {/* INFO CARDS */}
        <section className="py-6 bg-white">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-6">

              {/* Weekly Training Distribution */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">📊 Weekly Training Plan (80/20)</h3>
                <p className="text-sm text-slate-600 mb-3">Based on {weeklyHours} hours/week</p>
                <div className="space-y-2">
                  {zones.map((z) => {
                    const pct = z.zone <= 2 ? (z.zone === 1 ? 10 : 70) : (z.zone === 3 ? 10 : z.zone === 4 ? 8 : 2);
                    return (
                      <div key={z.zone} className="flex items-center gap-3">
                        <span className={`w-3 h-3 rounded-full ${z.color}`}></span>
                        <span className="w-16 text-sm font-medium">Zone {z.zone}</span>
                        <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                          <div className={`h-full ${z.color}`} style={{ width: `${pct}%` }}></div>
                        </div>
                        <span className="w-16 text-right text-sm text-slate-600">{z.weeklyMin} min</span>
                        <span className="w-10 text-right text-sm font-medium">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-slate-400 mt-3">💡 80% easy (Zones 1-2) + 20% hard (Zones 3-5)</p>
              </div>

              {/* Max HR Formula Comparison */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">📈 Max HR by Age</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 text-slate-600 font-medium">Age</th>
                      <th className="text-center py-2 text-slate-600 font-medium">220-Age</th>
                      <th className="text-center py-2 text-slate-600 font-medium">Tanaka</th>
                      <th className="text-center py-2 text-slate-600 font-medium">HUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formulaTable.map((row) => (
                      <tr key={row.age} className={`border-b border-slate-100 ${row.age === age ? "bg-blue-50" : ""}`}>
                        <td className="py-2 font-medium">{row.age}</td>
                        <td className="py-2 text-center text-slate-600">{row.standard}</td>
                        <td className={`py-2 text-center ${formula === "tanaka" ? "text-blue-600 font-medium" : "text-slate-600"}`}>{row.tanaka}</td>
                        <td className="py-2 text-center text-slate-600">{row.hunt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </section>

        {/* EXAMPLE CALCULATION */}
        <section className="py-6 bg-white">
          <div className="container">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">📊 Example Calculation</h3>
              <p className="text-slate-600 mb-4">Let's calculate heart rate zones for a <strong>30-year-old</strong> with <strong>60 bpm resting HR</strong> using the Tanaka formula:</p>
              <div className="bg-blue-50 rounded-xl p-6 mb-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Step 1: Max HR</p>
                    <p className="font-mono text-slate-700 text-sm">Tanaka: 208 - (0.7 × 30)<br /><strong className="text-blue-600">Max HR = 187 bpm</strong></p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Step 2: HR Reserve</p>
                    <p className="font-mono text-slate-700 text-sm">HRR = Max HR - RHR<br /><strong className="text-blue-600">HRR = 187 - 60 = 127 bpm</strong></p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Step 3: Zone 2 (60-70%)</p>
                    <p className="font-mono text-slate-700 text-sm">Lower: (127 × 0.60) + 60 = 136<br /><strong className="text-blue-600">Zone 2: 136-149 bpm</strong></p>
                  </div>
                </div>
              </div>
              <p className="text-slate-600">Using the Karvonen formula, this runner's Zone 2 (aerobic) is 136-149 bpm. Most training (80%) should be in Zones 1-2, with only 20% at higher intensities.</p>
            </div>
          </div>
        </section>

        {/* EDUCATIONAL SECTION */}
        <section className="py-12 bg-slate-50">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">

              {/* Main Content - 2 cols */}
              <div className="lg:col-span-2 space-y-6">

                {/* Understanding HR Training */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding Heart Rate Training</h2>
                  <p className="text-slate-600 mb-4">Heart rate training uses your cardiovascular response to control exercise intensity. The Karvonen formula, developed by Finnish scientist Martti Karvonen in 1957, introduced Heart Rate Reserve—the difference between your max and resting heart rates.</p>
                  <p className="text-slate-600 mb-4">This method is superior because it accounts for individual fitness. An athlete with 40 bpm resting has different zones than someone with 70 bpm, even with the same max HR.</p>
                  <div className="bg-slate-100 rounded-xl p-6 text-center">
                    <p className="text-xl font-mono font-bold text-slate-800">Target HR = ((Max HR - RHR) × %Intensity) + RHR</p>
                  </div>
                </div>

                {/* The Karvonen Method */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">The Karvonen Method</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <span className="text-2xl">🎯</span>
                      <div>
                        <h3 className="font-semibold text-slate-900">More Accurate</h3>
                        <p className="text-slate-600">Uses Heart Rate Reserve, not just max HR percentage, for more precise zones.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-2xl">💪</span>
                      <div>
                        <h3 className="font-semibold text-slate-900">Personalized</h3>
                        <p className="text-slate-600">Accounts for individual fitness level through resting heart rate.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-2xl">✅</span>
                      <div>
                        <h3 className="font-semibold text-slate-900">ACSM Recommended</h3>
                        <p className="text-slate-600">Gold standard for exercise prescription by major health organizations.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <details key={index} className="group">
                        <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-slate-50 rounded-xl hover:bg-slate-100">
                          <span className="font-semibold text-slate-900">{faq.question}</span>
                          <svg className="w-5 h-5 text-slate-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </summary>
                        <p className="text-slate-600 p-4 pt-2">{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                </div>

              </div>

              {/* Sidebar - 1 col */}
              <div className="space-y-6">
                <AdBlock slot="calculator-sidebar" />

                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">💰 Finance Calculators</h3>
                  <div className="flex flex-wrap gap-2">
                    {financeCalcs.map((calc) => (
                      <Link key={calc} href={`/${locale}/${calc.toLowerCase().replace(/ /g, '-')}-calculator`} className="px-3 py-1.5 bg-slate-100 hover:bg-blue-100 hover:text-blue-700 rounded-lg text-sm text-slate-600 transition-colors">{calc}</Link>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">🏃 Health Calculators</h3>
                  <div className="flex flex-wrap gap-2">
                    {healthCalcs.map((calc) => (
                      <Link key={calc} href={`/${locale}/${calc.toLowerCase().replace(/ /g, '-')}-calculator`} className="px-3 py-1.5 bg-slate-100 hover:bg-blue-100 hover:text-blue-700 rounded-lg text-sm text-slate-600 transition-colors">{calc}</Link>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">💡 Quick Tips</h3>
                  <ul className="space-y-3 text-slate-600 text-sm">
                    <li className="flex items-start gap-2"><span className="text-blue-500">•</span><span>Measure RHR first thing in the morning</span></li>
                    <li className="flex items-start gap-2"><span className="text-blue-500">•</span><span>80% of training should be Zone 1-2</span></li>
                    <li className="flex items-start gap-2"><span className="text-blue-500">•</span><span>Use a chest strap for best accuracy</span></li>
                    <li className="flex items-start gap-2"><span className="text-blue-500">•</span><span>Retest zones every 3 months</span></li>
                  </ul>
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
