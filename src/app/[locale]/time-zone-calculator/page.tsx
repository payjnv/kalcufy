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
const CALCULATOR_SLUG = "time-zone-calculator";
const CALCULATOR_NAME = "Time Zone Calculator";
const CALCULATOR_CATEGORY = "everyday";

// =============================================================================
// TYPES
// =============================================================================
type CalculationMode = "convert" | "worldClock" | "meetingPlanner";

// =============================================================================
// TIME ZONES DATA
// =============================================================================
const TIME_ZONES: Record<string, { label: string; offset: number; abbr: string; city: string }> = {
  "UTC": { label: "UTC (Coordinated Universal Time)", offset: 0, abbr: "UTC", city: "London (Winter)" },
  "America/New_York": { label: "Eastern Time (ET)", offset: -5, abbr: "EST/EDT", city: "New York" },
  "America/Chicago": { label: "Central Time (CT)", offset: -6, abbr: "CST/CDT", city: "Chicago" },
  "America/Denver": { label: "Mountain Time (MT)", offset: -7, abbr: "MST/MDT", city: "Denver" },
  "America/Los_Angeles": { label: "Pacific Time (PT)", offset: -8, abbr: "PST/PDT", city: "Los Angeles" },
  "America/Anchorage": { label: "Alaska Time (AKT)", offset: -9, abbr: "AKST", city: "Anchorage" },
  "Pacific/Honolulu": { label: "Hawaii Time (HT)", offset: -10, abbr: "HST", city: "Honolulu" },
  "America/Sao_Paulo": { label: "Brasilia Time (BRT)", offset: -3, abbr: "BRT", city: "São Paulo" },
  "Europe/London": { label: "Greenwich Mean Time (GMT)", offset: 0, abbr: "GMT/BST", city: "London" },
  "Europe/Paris": { label: "Central European Time (CET)", offset: 1, abbr: "CET/CEST", city: "Paris" },
  "Europe/Berlin": { label: "Central European Time (CET)", offset: 1, abbr: "CET/CEST", city: "Berlin" },
  "Europe/Moscow": { label: "Moscow Time (MSK)", offset: 3, abbr: "MSK", city: "Moscow" },
  "Asia/Dubai": { label: "Gulf Standard Time (GST)", offset: 4, abbr: "GST", city: "Dubai" },
  "Asia/Kolkata": { label: "India Standard Time (IST)", offset: 5.5, abbr: "IST", city: "Mumbai" },
  "Asia/Bangkok": { label: "Indochina Time (ICT)", offset: 7, abbr: "ICT", city: "Bangkok" },
  "Asia/Singapore": { label: "Singapore Time (SGT)", offset: 8, abbr: "SGT", city: "Singapore" },
  "Asia/Shanghai": { label: "China Standard Time (CST)", offset: 8, abbr: "CST", city: "Shanghai" },
  "Asia/Tokyo": { label: "Japan Standard Time (JST)", offset: 9, abbr: "JST", city: "Tokyo" },
  "Australia/Sydney": { label: "Australian Eastern Time (AET)", offset: 11, abbr: "AEDT", city: "Sydney" },
  "Pacific/Auckland": { label: "New Zealand Time (NZT)", offset: 13, abbr: "NZDT", city: "Auckland" },
};

const POPULAR_ZONES = ["America/New_York", "America/Los_Angeles", "Europe/London", "Europe/Paris", "Asia/Tokyo", "Asia/Shanghai", "Australia/Sydney"];

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function TimeZoneCalculatorPage() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - Inputs
  // ─────────────────────────────────────────────────────────────────────────────
  const [calculationMode, setCalculationMode] = useState<CalculationMode>("convert");
  const [fromZone, setFromZone] = useState("America/New_York");
  const [toZone, setToZone] = useState("Europe/London");
  const [inputDate, setInputDate] = useState(new Date().toISOString().split("T")[0]);
  const [inputTime, setInputTime] = useState("09:00");
  
  // World Clock zones
  const [worldClockZones, setWorldClockZones] = useState(["America/New_York", "Europe/London", "Asia/Tokyo", "Australia/Sydney"]);
  
  // Meeting Planner
  const [meetingZones, setMeetingZones] = useState(["America/New_York", "Europe/London", "Asia/Tokyo"]);
  
  // Current time state
  const [currentTime, setCurrentTime] = useState(new Date());

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

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
  
  const getTimeInZone = (date: Date, zoneId: string): Date => {
    const offset = TIME_ZONES[zoneId]?.offset || 0;
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * offset));
  };

  const formatTime = (date: Date, show24h: boolean = false): string => {
    if (show24h) {
      return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    }
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  // Convert time calculation
  const [hours, minutes] = inputTime.split(":").map(Number);
  const sourceDate = new Date(inputDate);
  sourceDate.setHours(hours, minutes, 0, 0);
  
  const fromOffset = TIME_ZONES[fromZone]?.offset || 0;
  const toOffset = TIME_ZONES[toZone]?.offset || 0;
  const offsetDiff = toOffset - fromOffset;
  
  const convertedDate = new Date(sourceDate.getTime() + (offsetDiff * 3600000));
  const timeDifference = toOffset - fromOffset;

  // Get working hours status (9 AM - 6 PM)
  const getWorkingStatus = (date: Date): { status: string; color: string } => {
    const hour = date.getHours();
    if (hour >= 9 && hour < 18) return { status: "Working hours", color: "text-green-600" };
    if (hour >= 6 && hour < 9) return { status: "Early morning", color: "text-amber-600" };
    if (hour >= 18 && hour < 22) return { status: "Evening", color: "text-orange-700" };
    return { status: "Night time", color: "text-red-600" };
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
            from: `${TIME_ZONES[fromZone].city} (${TIME_ZONES[fromZone].abbr})`,
            to: `${TIME_ZONES[toZone].city} (${TIME_ZONES[toZone].abbr})`,
            time: inputTime,
          },
          results: {
            convertedTime: formatTime(convertedDate),
            difference: `${timeDifference >= 0 ? "+" : ""}${timeDifference}h`,
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
  // FAQs
  // ─────────────────────────────────────────────────────────────────────────────
  const defaultFaqs = [
    {
      question: "What is UTC and how does it relate to time zones?",
      answer: "UTC (Coordinated Universal Time) is the primary time standard by which the world regulates clocks. Time zones are defined as offsets from UTC, e.g., EST is UTC-5, meaning Eastern Standard Time is 5 hours behind UTC."
    },
    {
      question: "What's the difference between GMT and UTC?",
      answer: "GMT (Greenwich Mean Time) and UTC are often used interchangeably, but technically UTC is the modern standard based on atomic clocks, while GMT is the older astronomical time. For practical purposes, they're the same."
    },
    {
      question: "How does Daylight Saving Time affect time zones?",
      answer: "During DST, clocks move forward 1 hour (e.g., EST becomes EDT). Not all regions observe DST—Arizona, Hawaii, and most of Asia don't. Our calculator shows standard offsets; actual times may vary during DST periods."
    },
    {
      question: "What time is best for scheduling meetings across time zones?",
      answer: "Aim for overlapping work hours (9 AM - 6 PM) in all zones. For US-Europe meetings, early morning US / afternoon Europe works well. For US-Asia, late evening US / morning Asia is common."
    },
    {
      question: "Why do some time zones have 30-minute offsets?",
      answer: "Some countries chose half-hour offsets to better align with their geographic location or for political/economic reasons. India (UTC+5:30), Iran (UTC+3:30), and Nepal (UTC+5:45) are examples."
    },
    {
      question: "How do I convert time mentally?",
      answer: "Add or subtract the hour difference. For US to Europe: add 5-6 hours for UK, add 6-7 for Central Europe. For US to Asia: add 13-17 hours depending on location. Remember date may change!"
    },
  ];
  const faqs = translations?.faq || defaultFaqs;

  // ─────────────────────────────────────────────────────────────────────────────
  // SIDEBAR CALCULATORS
  // ─────────────────────────────────────────────────────────────────────────────
  const everydayCalcs = ["Tip", "Discount", "Percentage", "Age", "Date", "Unit Converter"];
  const financeCalcs = ["Mortgage", "Loan", "Compound Interest", "Auto Loan", "Savings", "Credit Card Payoff"];

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
              <span className="text-slate-900 font-medium" aria-current="page">Time Zone Calculator</span>
            </nav>

            {/* Title */}
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl"
                role="img"
                aria-label="Time Zone Calculator icon"
              >
                🌍
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Time Zone Calculator</h1>
                <p className="text-slate-600 mt-1">Convert times, view world clocks, and plan meetings</p>
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
                  <h2 className="text-xl font-bold text-slate-900">Time Zone Settings</h2>
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

                {/* Calculation Mode */}
                <div className="mb-6">
                  <label id="calc-mode-label" className="block font-medium text-slate-700 mb-2">
                    Mode
                  </label>
                  <div role="radiogroup" aria-labelledby="calc-mode-label" className="grid grid-cols-3 gap-2">
                    {[
                      { key: "convert", label: "Convert", icon: "🔄" },
                      { key: "worldClock", label: "World Clock", icon: "🕐" },
                      { key: "meetingPlanner", label: "Meeting", icon: "📅" },
                    ].map(({ key, label, icon }) => (
                      <button
                        key={key}
                        onClick={() => handleInputChange(setCalculationMode, key as CalculationMode)}
                        role="radio"
                        aria-checked={calculationMode === key}
                        className={`p-3 rounded-xl border text-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          calculationMode === key
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span className="text-xl block">{icon}</span>
                        <span className="text-xs font-medium text-slate-700">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 my-6"></div>

                {calculationMode === "convert" && (
                  <>
                    {/* From Zone */}
                    <div className="mb-6">
                      <label htmlFor="from-zone" className="block font-medium text-slate-700 mb-2">
                        From Time Zone
                      </label>
                      <select
                        id="from-zone"
                        value={fromZone}
                        onChange={(e) => handleInputChange(setFromZone, e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      >
                        {Object.entries(TIME_ZONES).map(([key, val]) => (
                          <option key={key} value={key}>{val.city} - {val.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Swap Button */}
                    <div className="flex justify-center mb-6">
                      <button
                        onClick={() => {
                          const temp = fromZone;
                          setFromZone(toZone);
                          setToZone(temp);
                        }}
                        className="p-3 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                        aria-label="Swap time zones"
                      >
                        <svg className="w-6 h-6 text-slate-600 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </button>
                    </div>

                    {/* To Zone */}
                    <div className="mb-6">
                      <label htmlFor="to-zone" className="block font-medium text-slate-700 mb-2">
                        To Time Zone
                      </label>
                      <select
                        id="to-zone"
                        value={toZone}
                        onChange={(e) => handleInputChange(setToZone, e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      >
                        {Object.entries(TIME_ZONES).map(([key, val]) => (
                          <option key={key} value={key}>{val.city} - {val.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="input-date" className="block font-medium text-slate-700 mb-2">
                          Date
                        </label>
                        <input
                          id="input-date"
                          type="date"
                          value={inputDate}
                          onChange={(e) => handleInputChange(setInputDate, e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="input-time" className="block font-medium text-slate-700 mb-2">
                          Time
                        </label>
                        <input
                          id="input-time"
                          type="time"
                          value={inputTime}
                          onChange={(e) => handleInputChange(setInputTime, e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Quick Time Presets */}
                    <div className="mt-4">
                      <label className="block font-medium text-slate-700 mb-2">Quick Select</label>
                      <div className="flex flex-wrap gap-2">
                        {["09:00", "12:00", "14:00", "17:00", "20:00"].map((time) => (
                          <button
                            key={time}
                            onClick={() => handleInputChange(setInputTime, time)}
                            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                              inputTime === time
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {calculationMode === "worldClock" && (
                  <div className="space-y-4">
                    <p className="text-slate-600 text-sm">Current time in major cities around the world</p>
                    {worldClockZones.map((zone) => {
                      const timeInZone = getTimeInZone(currentTime, zone);
                      const status = getWorkingStatus(timeInZone);
                      return (
                        <div key={zone} className="p-4 bg-slate-50 rounded-xl flex justify-between items-center">
                          <div>
                            <p className="font-bold text-slate-900">{TIME_ZONES[zone]?.city}</p>
                            <p className="text-xs text-slate-600">{TIME_ZONES[zone]?.abbr}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-blue-600">{formatTime(timeInZone)}</p>
                            <p className={`text-xs ${status.color}`}>{status.status}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {calculationMode === "meetingPlanner" && (
                  <div className="space-y-4">
                    <p className="text-slate-600 text-sm">Find the best time for your meeting across time zones</p>
                    
                    {/* Selected zones for meeting */}
                    {meetingZones.map((zone, index) => (
                      <div key={zone} className="p-3 bg-slate-50 rounded-xl flex justify-between items-center">
                        <span className="font-medium text-slate-800">{TIME_ZONES[zone]?.city}</span>
                        <select
                          value={zone}
                          onChange={(e) => {
                            const newZones = [...meetingZones];
                            newZones[index] = e.target.value;
                            handleInputChange(setMeetingZones, newZones);
                          }}
                          className="px-3 py-1 border border-slate-300 rounded-lg text-sm bg-white"
                        >
                          {Object.entries(TIME_ZONES).map(([key, val]) => (
                            <option key={key} value={key}>{val.city}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ═══════════════════════════════════════════════════════════════════
                  RIGHT COLUMN - RESULTS
              ═══════════════════════════════════════════════════════════════════ */}
              <div>
                {/* Convert Mode Results */}
                {calculationMode === "convert" && (
                  <>
                    <div 
                      className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4"
                      role="region"
                      aria-label="Time Zone Conversion Results"
                      aria-live="polite"
                    >
                      <p className="text-sm text-slate-600 mb-1">Converted Time in {TIME_ZONES[toZone]?.city}</p>
                      <p className="text-4xl md:text-5xl font-bold text-slate-900">{formatTime(convertedDate)}</p>
                      <p className="text-slate-600 mt-2">{formatDate(convertedDate)}</p>
                      
                      {/* Time Difference */}
                      <div className="p-4 rounded-xl bg-white border border-slate-200 mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-600">{TIME_ZONES[fromZone]?.city}</span>
                          <span className="font-medium text-slate-800">{inputTime}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-600">{TIME_ZONES[toZone]?.city}</span>
                          <span className="font-bold text-blue-600">{formatTime(convertedDate, true)}</span>
                        </div>
                        <div className="border-t border-slate-200 my-2"></div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Time Difference</span>
                          <span className={`font-bold ${timeDifference >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {timeDifference >= 0 ? "+" : ""}{timeDifference}h
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Working Hours Status */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                      <h3 className="font-bold text-slate-900 mb-4">🏢 Business Hours Status</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-50 rounded-lg p-3">
                          <p className="text-sm text-slate-600 mb-1">{TIME_ZONES[fromZone]?.city}</p>
                          <p className={`font-bold ${getWorkingStatus(sourceDate).color}`}>
                            {getWorkingStatus(sourceDate).status}
                          </p>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-3">
                          <p className="text-sm text-slate-600 mb-1">{TIME_ZONES[toZone]?.city}</p>
                          <p className={`font-bold ${getWorkingStatus(convertedDate).color}`}>
                            {getWorkingStatus(convertedDate).status}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* World Clock Results */}
                {calculationMode === "worldClock" && (
                  <div 
                    className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4"
                    role="region"
                    aria-label="World Clock"
                  >
                    <p className="text-sm text-slate-600 mb-1">Your Local Time</p>
                    <p className="text-4xl md:text-5xl font-bold text-slate-900">{formatTime(currentTime)}</p>
                    <p className="text-slate-600 mt-2">{formatDate(currentTime)}</p>
                    
                    <div className="mt-6">
                      <h3 className="font-bold text-slate-900 mb-4">🌐 Popular Cities</h3>
                      <div className="space-y-2">
                        {POPULAR_ZONES.map((zone) => {
                          const timeInZone = getTimeInZone(currentTime, zone);
                          return (
                            <div key={zone} className="flex justify-between items-center p-2 bg-white rounded-lg">
                              <span className="text-slate-700">{TIME_ZONES[zone]?.city}</span>
                              <span className="font-bold text-blue-600">{formatTime(timeInZone)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Meeting Planner Results */}
                {calculationMode === "meetingPlanner" && (
                  <div 
                    className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4"
                    role="region"
                    aria-label="Meeting Planner Results"
                  >
                    <h3 className="font-bold text-slate-900 mb-4">📅 Best Meeting Times</h3>
                    <p className="text-sm text-slate-600 mb-4">Times when all participants are in working hours (9 AM - 6 PM)</p>
                    
                    <div className="space-y-3">
                      {[9, 10, 11, 14, 15, 16, 17].map((hour) => {
                        const baseTime = new Date();
                        baseTime.setHours(hour, 0, 0, 0);
                        
                        const allInWorkingHours = meetingZones.every((zone) => {
                          const offset = TIME_ZONES[zone]?.offset || 0;
                          const localHour = (hour + offset + 24) % 24;
                          return localHour >= 9 && localHour < 18;
                        });
                        
                        return (
                          <div 
                            key={hour}
                            className={`p-3 rounded-lg ${allInWorkingHours ? "bg-green-50 border border-green-200" : "bg-slate-100"}`}
                          >
                            <div className="flex justify-between items-center">
                              <span className={`font-bold ${allInWorkingHours ? "text-green-700" : "text-slate-600"}`}>
                                {hour}:00 UTC
                              </span>
                              {allInWorkingHours && <span className="text-green-600 text-sm">✓ Good for all</span>}
                            </div>
                            <div className="flex gap-2 mt-2 text-xs">
                              {meetingZones.map((zone) => {
                                const offset = TIME_ZONES[zone]?.offset || 0;
                                const localHour = (hour + offset + 24) % 24;
                                return (
                                  <span key={zone} className="text-slate-600">
                                    {TIME_ZONES[zone]?.city}: {localHour}:00
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
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
                <h3 className="text-lg font-bold text-slate-900 mb-4">🌍 Major Time Zones</h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex justify-between">
                    <span>Pacific (PT)</span>
                    <span className="font-medium">UTC-8</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Eastern (ET)</span>
                    <span className="font-medium">UTC-5</span>
                  </li>
                  <li className="flex justify-between">
                    <span>London (GMT)</span>
                    <span className="font-medium">UTC+0</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Central Europe (CET)</span>
                    <span className="font-medium">UTC+1</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Japan (JST)</span>
                    <span className="font-medium">UTC+9</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">💡 Quick Tips</h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>US East Coast is 5 hours behind London</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Tokyo is 14 hours ahead of New York</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Sydney is 16 hours ahead of New York</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>DST can change offsets by 1 hour</span>
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
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding Time Zones</h2>
                  <p className="text-slate-600 mb-4">
                    Time zones were established in the late 19th century to standardize time across regions. The world is divided into 24 time zones, each roughly 15 degrees of longitude apart, centered on UTC (Coordinated Universal Time).
                  </p>
                  <p className="text-slate-600">
                    However, many countries modify their time zones for political, economic, or practical reasons. China, for example, uses a single time zone despite spanning five geographical zones. India uses a half-hour offset to better align with its geography.
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
                    <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-sm">🧮</span>
                    Everyday Calculators
                  </h3>
                  <div className="space-y-2">
                    {everydayCalcs.map((calc) => (
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
                  <h3 className="font-bold mb-2">📅 Date Calculator</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Add days, calculate deadlines, and find business days.
                  </p>
                  <Link href={`/${locale}/date-calculator`} className="inline-block bg-white text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                    Try Date Calculator →
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
