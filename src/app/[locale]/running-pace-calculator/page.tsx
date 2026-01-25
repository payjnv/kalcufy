"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import AdBlock from "@/components/ads/AdBlock";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

const CALCULATOR_SLUG = "running-pace-calculator";
const CALCULATOR_NAME = "Running Pace Calculator";
const CALCULATOR_CATEGORY = "health";

// Race distances
const RACE_DISTANCES = [
  { name: "1 Mile", km: 1.60934, mi: 1 },
  { name: "5K", km: 5, mi: 3.10686 },
  { name: "10K", km: 10, mi: 6.21371 },
  { name: "15K", km: 15, mi: 9.32057 },
  { name: "Half Marathon", km: 21.0975, mi: 13.1094 },
  { name: "Marathon", km: 42.195, mi: 26.2188 },
];

// World Records
const WORLD_RECORDS: Record<string, { male: number; female: number }> = {
  "1 Mile": { male: 223, female: 248 },
  "5K": { male: 755, female: 840 },
  "10K": { male: 1571, female: 1734 },
  "15K": { male: 2433, female: 2660 },
  "Half Marathon": { male: 3450, female: 3772 },
  "Marathon": { male: 7235, female: 7796 },
};

// VDOT Training Paces
const VDOT_TABLE = [
  { vdot: 30, easy: "12:40", marathon: "11:15", threshold: "10:18", interval: "9:30" },
  { vdot: 35, easy: "11:00", marathon: "9:48", threshold: "8:58", interval: "8:16" },
  { vdot: 40, easy: "9:44", marathon: "8:39", threshold: "7:55", interval: "7:18" },
  { vdot: 45, easy: "8:45", marathon: "7:46", threshold: "7:07", interval: "6:33" },
  { vdot: 50, easy: "7:57", marathon: "7:03", threshold: "6:27", interval: "5:56" },
  { vdot: 55, easy: "7:17", marathon: "6:27", threshold: "5:54", interval: "5:26" },
  { vdot: 60, easy: "6:44", marathon: "5:57", threshold: "5:26", interval: "5:00" },
  { vdot: 65, easy: "6:15", marathon: "5:31", threshold: "5:02", interval: "4:38" },
  { vdot: 70, easy: "5:51", marathon: "5:09", threshold: "4:42", interval: "4:19" },
];

export default function RunningPaceCalculator() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // Calculator state
  const [unit, setUnit] = useState<"imperial" | "metric">("imperial");
  const [calcMode, setCalcMode] = useState<"pace" | "time" | "distance">("pace");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [selectedRace, setSelectedRace] = useState("5K");
  const [customDistance, setCustomDistance] = useState(5);
  const [useCustom, setUseCustom] = useState(false);
  const [paceMin, setPaceMin] = useState(8);
  const [paceSec, setPaceSec] = useState(0);
  const [splitStrategy, setSplitStrategy] = useState<"even" | "negative" | "positive">("even");
  const [gender, setGender] = useState<"male" | "female">("male");

  // Results
  const [pace, setPace] = useState(0);
  const [paceKm, setPaceKm] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [distanceKm, setDistanceKm] = useState(0);
  const [speedMph, setSpeedMph] = useState(0);
  const [speedKmh, setSpeedKmh] = useState(0);
  const [vdot, setVdot] = useState(0);
  const [trainingPaces, setTrainingPaces] = useState({ easy: "", marathon: "", threshold: "", interval: "" });
  const [splits, setSplits] = useState<{ mile: number; pace: string; elapsed: string }[]>([]);
  const [worldRecordPct, setWorldRecordPct] = useState(0);
  const [calories, setCalories] = useState(0);
  const [equivalentTimes, setEquivalentTimes] = useState<{ race: string; time: string }[]>([]);

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
      const res = await fetch("/api/history", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, calculatorName: CALCULATOR_NAME, inputs: { distance: selectedRace, time: formatTime(totalTime), unit }, results: { pace: formatPace(pace), vdot: vdot.toFixed(1) } }) });
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

  // Helper functions
  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.round(secs % 60);
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const formatPace = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.round(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const estimateVDOT = (distKm: number, timeSecs: number) => {
    const velocity = (distKm * 1000) / timeSecs;
    const pctVO2 = 0.8 + 0.1894 * Math.exp(-0.0128 * timeSecs / 60) + 0.299 * Math.exp(-0.1933 * timeSecs / 60);
    const vo2 = -4.6 + 0.182 * velocity + 0.000104 * velocity * velocity;
    return Math.max(20, Math.min(85, vo2 / pctVO2));
  };

  // Main calculation
  useEffect(() => {
    let distMi: number, distKm: number, timeSecs: number, paceSecs: number, paceSecsKm: number;

    // Get distance
    if (useCustom) {
      if (unit === "imperial") { distMi = customDistance; distKm = customDistance * 1.60934; }
      else { distKm = customDistance; distMi = customDistance / 1.60934; }
    } else {
      const race = RACE_DISTANCES.find(r => r.name === selectedRace) || RACE_DISTANCES[1];
      distMi = race.mi; distKm = race.km;
    }

    // Calculate based on mode
    if (calcMode === "pace") {
      timeSecs = hours * 3600 + minutes * 60 + seconds;
      paceSecs = timeSecs / distMi;
      paceSecsKm = timeSecs / distKm;
    } else if (calcMode === "time") {
      paceSecs = paceMin * 60 + paceSec;
      paceSecsKm = paceSecs / 1.60934;
      timeSecs = paceSecs * distMi;
    } else {
      timeSecs = hours * 3600 + minutes * 60 + seconds;
      paceSecs = paceMin * 60 + paceSec;
      paceSecsKm = paceSecs / 1.60934;
      distMi = timeSecs / paceSecs;
      distKm = distMi * 1.60934;
    }

    setPace(paceSecs);
    setPaceKm(paceSecsKm);
    setTotalTime(timeSecs);
    setDistance(distMi);
    setDistanceKm(distKm);
    setSpeedMph(3600 / paceSecs);
    setSpeedKmh(3600 / paceSecsKm);
    setCalories(Math.round(distMi * 100));

    // VDOT
    const calculatedVdot = estimateVDOT(distKm, timeSecs);
    setVdot(calculatedVdot);

    // Training paces from VDOT
    const vdotRow = VDOT_TABLE.find(v => v.vdot >= calculatedVdot) || VDOT_TABLE[4];
    setTrainingPaces({ easy: vdotRow.easy, marathon: vdotRow.marathon, threshold: vdotRow.threshold, interval: vdotRow.interval });

    // World record comparison
    const wr = WORLD_RECORDS[selectedRace];
    if (wr && !useCustom) {
      setWorldRecordPct((wr[gender] / timeSecs) * 100);
    } else {
      setWorldRecordPct(0);
    }

    // Generate splits
    const numSplits = Math.ceil(unit === "imperial" ? distMi : distKm);
    const newSplits: { mile: number; pace: string; elapsed: string }[] = [];
    let elapsed = 0;
    for (let i = 1; i <= Math.min(numSplits, 30); i++) {
      let splitPace = unit === "imperial" ? paceSecs : paceSecsKm;
      if (splitStrategy === "negative") {
        splitPace *= 1 + 0.02 * (0.5 - i / numSplits);
      } else if (splitStrategy === "positive") {
        splitPace *= 1 - 0.02 * (0.5 - i / numSplits);
      }
      const totalDist = unit === "imperial" ? distMi : distKm;
      const actualDist = i === numSplits && totalDist % 1 !== 0 ? totalDist % 1 : 1;
      elapsed += splitPace * actualDist;
      newSplits.push({ mile: i, pace: formatPace(splitPace), elapsed: formatTime(elapsed) });
    }
    setSplits(newSplits);

    // Equivalent times (Riegel formula)
    const eqTimes = RACE_DISTANCES.map(race => {
      const ratio = race.km / distKm;
      const eqSecs = timeSecs * Math.pow(ratio, 1.06);
      return { race: race.name, time: formatTime(eqSecs) };
    });
    setEquivalentTimes(eqTimes);

  }, [hours, minutes, seconds, selectedRace, customDistance, useCustom, paceMin, paceSec, calcMode, unit, splitStrategy, gender]);

  // Pace reference table
  const paceTable = [
    { pace: "6:00", km: "3:44", mph: "10.0", t5k: "18:38", t10k: "37:17", marathon: "2:37" },
    { pace: "7:00", km: "4:21", mph: "8.6", t5k: "21:45", t10k: "43:30", marathon: "3:03" },
    { pace: "8:00", km: "4:58", mph: "7.5", t5k: "24:51", t10k: "49:43", marathon: "3:30" },
    { pace: "9:00", km: "5:35", mph: "6.7", t5k: "27:58", t10k: "55:56", marathon: "3:56" },
    { pace: "10:00", km: "6:13", mph: "6.0", t5k: "31:04", t10k: "1:02:08", marathon: "4:22" },
    { pace: "11:00", km: "6:50", mph: "5.5", t5k: "34:11", t10k: "1:08:21", marathon: "4:48" },
    { pace: "12:00", km: "7:27", mph: "5.0", t5k: "37:17", t10k: "1:14:34", marathon: "5:15" },
  ];

  // FAQs
  const faqs = [
    { question: "What is a good running pace for beginners?", answer: "Beginners typically run at 10-13 minutes per mile (6:15-8:00 min/km). Focus on being able to hold a conversation while running. Speed will naturally improve with consistency." },
    { question: "How is VDOT calculated?", answer: "VDOT estimates your VO2max from race performance using Jack Daniels' formulas. It predicts equivalent times at other distances and prescribes training paces. Higher VDOT = better fitness." },
    { question: "What are negative splits?", answer: "Negative splits mean running the second half faster than the first. This prevents early burnout and often leads to faster times. Most world records use slight negative splits." },
    { question: "How does altitude affect pace?", answer: "Above 3,000 feet, reduced oxygen slows performance by ~3% per 1,000 feet. Full acclimatization takes 2-3 weeks at altitude." },
    { question: "What's the difference between pace and speed?", answer: "Pace is time per distance (8:00/mile), speed is distance per time (7.5 mph). Runners use pace because it's easier to track during runs." },
  ];

  const financeCalcs = ["Compound Interest", "Mortgage", "Loan", "Auto Loan", "Savings", "Retirement"];
  const healthCalcs = ["BMI", "Calorie", "BMR", "TDEE", "Body Fat", "Heart Rate Zones"];

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
              <span className="text-slate-700">Running Pace</span>
            </nav>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">🏃</div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Running Pace Calculator</h1>
                  <button onClick={toggleFavorite} disabled={favoriteLoading} className="p-2 rounded-full hover:bg-slate-100 transition-colors" title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
                    {isFavorite ? <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> : <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>}
                  </button>
                </div>
                <div className="flex items-center gap-2 h-6">
                  <p className="text-slate-600">Calculate pace, predict finish times, generate splits & VDOT training zones</p>
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

                {/* Unit Toggle */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">Unit System</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => handleInputChange(setUnit, "imperial")} className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${unit === "imperial" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>Imperial (mi)</button>
                    <button onClick={() => handleInputChange(setUnit, "metric")} className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${unit === "metric" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>Metric (km)</button>
                  </div>
                </div>

                {/* Calculation Mode */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">I want to calculate...</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => handleInputChange(setCalcMode, "pace")} className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${calcMode === "pace" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>Pace</button>
                    <button onClick={() => handleInputChange(setCalcMode, "time")} className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${calcMode === "time" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>Time</button>
                    <button onClick={() => handleInputChange(setCalcMode, "distance")} className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${calcMode === "distance" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>Distance</button>
                  </div>
                </div>

                {/* Distance Selection */}
                {calcMode !== "distance" && (
                  <div className="mb-6">
                    <label className="font-medium text-slate-700 block mb-2">Distance</label>
                    <div className="flex items-center gap-2 mb-3">
                      <input type="checkbox" id="customDist" checked={useCustom} onChange={(e) => handleInputChange(setUseCustom, e.target.checked)} className="w-4 h-4 text-blue-600 rounded" />
                      <label htmlFor="customDist" className="text-sm text-slate-600">Custom distance</label>
                    </div>
                    {useCustom ? (
                      <div className="flex items-center gap-2">
                        <input type="number" value={customDistance} onChange={(e) => handleInputChange(setCustomDistance, parseFloat(e.target.value) || 0)} min={0.1} step={0.1} className="flex-1 px-4 py-2 border border-slate-200 rounded-lg" />
                        <span className="text-slate-600">{unit === "imperial" ? "mi" : "km"}</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-2">
                        {RACE_DISTANCES.map((race) => (
                          <button key={race.name} onClick={() => handleInputChange(setSelectedRace, race.name)} className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${selectedRace === race.name ? "bg-blue-100 text-blue-700 ring-1 ring-blue-300" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}>{race.name}</button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Time Input */}
                {calcMode !== "time" && (
                  <div className="mb-6">
                    <label className="font-medium text-slate-700 block mb-2">{calcMode === "pace" ? "Finish Time" : "Running Time"}</label>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs text-slate-600">Hours</label>
                        <input type="number" value={hours} onChange={(e) => handleInputChange(setHours, parseInt(e.target.value) || 0)} min={0} max={24} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-center font-medium" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-600">Minutes</label>
                        <input type="number" value={minutes} onChange={(e) => handleInputChange(setMinutes, parseInt(e.target.value) || 0)} min={0} max={59} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-center font-medium" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-600">Seconds</label>
                        <input type="number" value={seconds} onChange={(e) => handleInputChange(setSeconds, parseInt(e.target.value) || 0)} min={0} max={59} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-center font-medium" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Pace Input */}
                {calcMode !== "pace" && (
                  <div className="mb-6">
                    <label className="font-medium text-slate-700 block mb-2">Pace (per {unit === "imperial" ? "mile" : "km"})</label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-slate-600">Minutes</label>
                        <input type="number" value={paceMin} onChange={(e) => handleInputChange(setPaceMin, parseInt(e.target.value) || 0)} min={0} max={30} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-center font-medium" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-600">Seconds</label>
                        <input type="number" value={paceSec} onChange={(e) => handleInputChange(setPaceSec, parseInt(e.target.value) || 0)} min={0} max={59} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-center font-medium" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Split Strategy */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">Split Strategy</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => handleInputChange(setSplitStrategy, "even")} className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${splitStrategy === "even" ? "bg-blue-100 text-blue-700 ring-1 ring-blue-300" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}>Even</button>
                    <button onClick={() => handleInputChange(setSplitStrategy, "negative")} className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${splitStrategy === "negative" ? "bg-blue-100 text-blue-700 ring-1 ring-blue-300" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}>Negative</button>
                    <button onClick={() => handleInputChange(setSplitStrategy, "positive")} className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${splitStrategy === "positive" ? "bg-blue-100 text-blue-700 ring-1 ring-blue-300" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}>Positive</button>
                  </div>
                </div>

                {/* Gender (for WR comparison) */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">Gender (for WR comparison)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => handleInputChange(setGender, "male")} className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${gender === "male" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>Male</button>
                    <button onClick={() => handleInputChange(setGender, "female")} className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${gender === "female" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>Female</button>
                  </div>
                </div>
              </div>

              {/* RIGHT - Results */}
              <div>
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  <p className="text-sm text-slate-600 mb-1">Your Pace</p>
                  <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-1">{formatPace(pace)} <span className="text-xl text-slate-600">/mi</span></p>
                  <p className="text-xl text-slate-600 mb-6">{formatPace(paceKm)} /km • {speedMph.toFixed(1)} mph</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Total Time</p>
                      <p className="text-lg font-bold text-slate-800">{formatTime(totalTime)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Distance</p>
                      <p className="text-lg font-bold text-slate-800">{distance.toFixed(2)} mi / {distanceKm.toFixed(2)} km</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">VDOT Score</p>
                      <p className="text-lg font-bold text-blue-600">{vdot.toFixed(1)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Est. Calories</p>
                      <p className="text-lg font-bold text-green-600">~{calories} kcal</p>
                    </div>
                  </div>

                  {/* World Record Comparison */}
                  {worldRecordPct > 0 && (
                    <div className="mt-4 bg-white rounded-xl p-4 border border-slate-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-slate-600">vs World Record ({gender === "male" ? "Men" : "Women"})</p>
                          <p className="text-lg font-bold text-slate-800">{worldRecordPct.toFixed(1)}% of WR pace</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${worldRecordPct > 80 ? "bg-green-100 text-green-700" : worldRecordPct > 60 ? "bg-yellow-100 text-yellow-700" : "bg-slate-100 text-slate-600"}`}>
                          {worldRecordPct > 80 ? "Elite" : worldRecordPct > 60 ? "Advanced" : "Recreational"}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Training Paces */}
                  <div className="mt-4 bg-white rounded-xl p-4 border border-slate-200">
                    <p className="text-sm text-slate-600 mb-2">Training Paces (VDOT {vdot.toFixed(0)})</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between"><span className="text-slate-600">Easy:</span><span className="font-medium">{trainingPaces.easy}/mi</span></div>
                      <div className="flex justify-between"><span className="text-slate-600">Marathon:</span><span className="font-medium">{trainingPaces.marathon}/mi</span></div>
                      <div className="flex justify-between"><span className="text-slate-600">Threshold:</span><span className="font-medium">{trainingPaces.threshold}/mi</span></div>
                      <div className="flex justify-between"><span className="text-slate-600">Interval:</span><span className="font-medium">{trainingPaces.interval}/mi</span></div>
                    </div>
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

              {/* Splits Table */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">📊 Race Splits ({splitStrategy})</h3>
                <div className="max-h-64 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-white">
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 text-slate-600 font-medium">{unit === "imperial" ? "Mile" : "Km"}</th>
                        <th className="text-center py-2 text-slate-600 font-medium">Pace</th>
                        <th className="text-right py-2 text-slate-600 font-medium">Elapsed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {splits.slice(0, 15).map((split) => (
                        <tr key={split.mile} className="border-b border-slate-100">
                          <td className="py-2 font-medium">{split.mile}</td>
                          <td className="py-2 text-center text-slate-600">{split.pace}</td>
                          <td className="py-2 text-right text-blue-600 font-medium">{split.elapsed}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {splits.length > 15 && <p className="text-xs text-slate-400 mt-2">Showing first 15 of {splits.length} splits</p>}
              </div>

              {/* Equivalent Times */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">🎯 Equivalent Race Times</h3>
                <p className="text-sm text-slate-600 mb-3">Based on Riegel formula prediction</p>
                <div className="space-y-2">
                  {equivalentTimes.map((eq) => (
                    <div key={eq.race} className={`flex items-center justify-between py-2 border-b border-slate-100 last:border-0 ${eq.race === selectedRace ? "bg-blue-50 -mx-2 px-2 rounded" : ""}`}>
                      <span className={`text-slate-700 ${eq.race === selectedRace ? "font-semibold" : ""}`}>{eq.race}</span>
                      <span className={`font-medium ${eq.race === selectedRace ? "text-blue-600" : "text-slate-600"}`}>{eq.time}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* EXAMPLE CALCULATION */}
        <section className="py-6 bg-white">
          <div className="container">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">📊 Example Calculation</h3>
              <p className="text-slate-600 mb-4">Let's calculate pace and training zones for a runner who completes a <strong>5K in 25:00</strong>:</p>
              <div className="bg-blue-50 rounded-xl p-6 mb-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Pace Calculation</p>
                    <p className="font-mono text-slate-700 text-sm">Distance: 5K = 3.107 mi<br />Time: 25:00 = 1500 sec<br /><strong className="text-blue-600">Pace = 1500 ÷ 3.107 = 8:03/mi</strong></p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Speed Conversion</p>
                    <p className="font-mono text-slate-700 text-sm">Pace: 8:03/mi = 483 sec<br /><strong className="text-blue-600">Speed = 3600 ÷ 483 = 7.45 mph</strong></p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">VDOT Estimate</p>
                    <p className="font-mono text-slate-700 text-sm">Based on 5K performance<br /><strong className="text-blue-600">VDOT ≈ 42 (Intermediate)</strong></p>
                  </div>
                </div>
              </div>
              <p className="text-slate-600">With a VDOT of 42, this runner should train at Easy pace of ~9:44/mi, run tempo workouts at ~7:55/mi, and expect a marathon finish around 4:00-4:10.</p>
            </div>
          </div>
        </section>

        {/* PACE REFERENCE TABLE */}
        <section className="py-6 bg-white">
          <div className="container">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">📈 Pace Conversion Reference</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 text-slate-600 font-medium">Pace/mi</th>
                      <th className="text-center py-2 text-slate-600 font-medium">Pace/km</th>
                      <th className="text-center py-2 text-slate-600 font-medium">Speed</th>
                      <th className="text-center py-2 text-slate-600 font-medium">5K</th>
                      <th className="text-center py-2 text-slate-600 font-medium">10K</th>
                      <th className="text-right py-2 text-slate-600 font-medium">Marathon</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paceTable.map((row) => (
                      <tr key={row.pace} className="border-b border-slate-100">
                        <td className="py-2 font-medium">{row.pace}</td>
                        <td className="py-2 text-center text-slate-600">{row.km}</td>
                        <td className="py-2 text-center text-slate-600">{row.mph} mph</td>
                        <td className="py-2 text-center text-slate-600">{row.t5k}</td>
                        <td className="py-2 text-center text-slate-600">{row.t10k}</td>
                        <td className="py-2 text-right text-blue-600 font-medium">{row.marathon}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* EDUCATIONAL SECTION */}
        <section className="py-12 bg-slate-50">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">

              {/* Main Content - 2 cols */}
              <div className="lg:col-span-2 space-y-6">

                {/* What is Running Pace */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding Running Pace</h2>
                  <p className="text-slate-600 mb-4">Running pace is the time it takes to cover a specific distance, typically expressed as minutes per mile (min/mi) or minutes per kilometer (min/km). Unlike speed, which measures distance per time, pace tells you how long each unit of distance takes—making it more intuitive for planning runs and races.</p>
                  <p className="text-slate-600 mb-4">Your pace varies based on distance, terrain, weather conditions, and fitness level. A pace you can sustain for a 5K will be faster than your marathon pace. Understanding these relationships helps you train more effectively and race smarter.</p>
                  <div className="bg-slate-100 rounded-xl p-6 text-center">
                    <p className="text-2xl font-mono font-bold text-slate-800">Pace = Time ÷ Distance</p>
                  </div>
                </div>

                {/* VDOT Explanation */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">What is VDOT?</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <span className="text-2xl">🎯</span>
                      <div>
                        <h3 className="font-semibold text-slate-900">Fitness Indicator</h3>
                        <p className="text-slate-600">VDOT estimates your VO2max from race performance. Developed by coach Jack Daniels, it predicts equivalent times at other distances.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-2xl">📊</span>
                      <div>
                        <h3 className="font-semibold text-slate-900">Training Zones</h3>
                        <p className="text-slate-600">VDOT prescribes training paces: Easy (recovery), Marathon, Threshold (tempo), and Interval (VO2max work).</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-2xl">⚡</span>
                      <div>
                        <h3 className="font-semibold text-slate-900">80/20 Rule</h3>
                        <p className="text-slate-600">Research shows 80% of training should be at Easy pace, 20% at harder intensities for optimal adaptation.</p>
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
                    <li className="flex items-start gap-2"><span className="text-blue-500">•</span><span>80% of runs should be at Easy pace</span></li>
                    <li className="flex items-start gap-2"><span className="text-blue-500">•</span><span>Use negative splits for best race results</span></li>
                    <li className="flex items-start gap-2"><span className="text-blue-500">•</span><span>Test your race pace in training</span></li>
                    <li className="flex items-start gap-2"><span className="text-blue-500">•</span><span>Heat adds ~3% per 10°F above 55°F</span></li>
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
