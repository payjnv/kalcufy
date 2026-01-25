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
const CALCULATOR_SLUG = "age-calculator";
const CALCULATOR_NAME = "Age Calculator";
const CALCULATOR_CATEGORY = "everyday";

// =============================================================================
// TYPES
// =============================================================================
type CalculationMode = "ageFromDOB" | "ageAtDate" | "dateDifference";

// =============================================================================
// ZODIAC SIGNS
// =============================================================================
const ZODIAC_SIGNS = [
  { sign: "Capricorn", symbol: "♑", start: [12, 22], end: [1, 19], element: "Earth" },
  { sign: "Aquarius", symbol: "♒", start: [1, 20], end: [2, 18], element: "Air" },
  { sign: "Pisces", symbol: "♓", start: [2, 19], end: [3, 20], element: "Water" },
  { sign: "Aries", symbol: "♈", start: [3, 21], end: [4, 19], element: "Fire" },
  { sign: "Taurus", symbol: "♉", start: [4, 20], end: [5, 20], element: "Earth" },
  { sign: "Gemini", symbol: "♊", start: [5, 21], end: [6, 20], element: "Air" },
  { sign: "Cancer", symbol: "♋", start: [6, 21], end: [7, 22], element: "Water" },
  { sign: "Leo", symbol: "♌", start: [7, 23], end: [8, 22], element: "Fire" },
  { sign: "Virgo", symbol: "♍", start: [8, 23], end: [9, 22], element: "Earth" },
  { sign: "Libra", symbol: "♎", start: [9, 23], end: [10, 22], element: "Air" },
  { sign: "Scorpio", symbol: "♏", start: [10, 23], end: [11, 21], element: "Water" },
  { sign: "Sagittarius", symbol: "♐", start: [11, 22], end: [12, 21], element: "Fire" },
];

// =============================================================================
// GENERATIONS
// =============================================================================
const GENERATIONS = [
  { name: "The Greatest Generation", start: 1901, end: 1927 },
  { name: "The Silent Generation", start: 1928, end: 1945 },
  { name: "Baby Boomers", start: 1946, end: 1964 },
  { name: "Generation X", start: 1965, end: 1980 },
  { name: "Millennials (Gen Y)", start: 1981, end: 1996 },
  { name: "Generation Z", start: 1997, end: 2012 },
  { name: "Generation Alpha", start: 2013, end: 2025 },
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function AgeCalculatorPage() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - Inputs
  // ─────────────────────────────────────────────────────────────────────────────
  const [calculationMode, setCalculationMode] = useState<CalculationMode>("ageFromDOB");
  const [birthDate, setBirthDate] = useState("1994-06-15");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);

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
  
  const today = new Date();
  const birth = new Date(birthDate);
  const target = new Date(calculationMode === "dateDifference" ? endDate : targetDate);
  const startDate = calculationMode === "dateDifference" ? new Date(birthDate) : birth;

  // Calculate age difference
  const calculateAge = (from: Date, to: Date) => {
    let years = to.getFullYear() - from.getFullYear();
    let months = to.getMonth() - from.getMonth();
    let days = to.getDate() - from.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  };

  const age = calculateAge(startDate, calculationMode === "ageFromDOB" ? today : target);

  // Total days calculation
  const totalDays = Math.floor((target.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = age.years * 12 + age.months;
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  const totalSeconds = totalMinutes * 60;

  // Day of the week born
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayBorn = daysOfWeek[birth.getDay()];

  // Next birthday calculation
  const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday <= today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }
  const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const nextAge = age.years + (nextBirthday.getFullYear() > today.getFullYear() ? 1 : 0);

  // Zodiac sign
  const getZodiacSign = (month: number, day: number) => {
    for (const zodiac of ZODIAC_SIGNS) {
      const [startMonth, startDay] = zodiac.start;
      const [endMonth, endDay] = zodiac.end;
      
      if (zodiac.sign === "Capricorn") {
        if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
          return zodiac;
        }
      } else if (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay)
      ) {
        return zodiac;
      }
    }
    return ZODIAC_SIGNS[0]; // Default to Capricorn
  };

  const zodiac = getZodiacSign(birth.getMonth() + 1, birth.getDate());

  // Generation
  const getGeneration = (year: number) => {
    for (const gen of GENERATIONS) {
      if (year >= gen.start && year <= gen.end) {
        return gen.name;
      }
    }
    return "Unknown Generation";
  };

  const generation = getGeneration(birth.getFullYear());

  // Leap year birthday
  const isLeapYearBirthday = birth.getMonth() === 1 && birth.getDate() === 29;

  // Fun milestones
  const millionSeconds = new Date(birth.getTime() + 1000000 * 1000);
  const billionSeconds = new Date(birth.getTime() + 1000000000 * 1000);
  const tenThousandDays = new Date(birth.getTime() + 10000 * 24 * 60 * 60 * 1000);

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
            birthDate,
            calculationMode,
          },
          results: {
            age: `${age.years} years, ${age.months} months, ${age.days} days`,
            zodiac: zodiac.sign,
            generation,
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
      question: "How is exact age calculated?",
      answer: "We calculate the difference between your birth date and today (or a target date), counting complete years, months, and days. The calculation accounts for varying month lengths and leap years."
    },
    {
      question: "What happens if I was born on February 29?",
      answer: "Leap year birthdays are special! In non-leap years, some celebrate on Feb 28, others on March 1. Our calculator accurately tracks your age regardless of leap year status."
    },
    {
      question: "How are generations defined?",
      answer: "Generations are defined by birth year ranges: Baby Boomers (1946-1964), Gen X (1965-1980), Millennials (1981-1996), Gen Z (1997-2012), and Gen Alpha (2013+). These are approximate and vary by source."
    },
    {
      question: "How accurate is the zodiac sign calculation?",
      answer: "We use the standard Western zodiac date ranges. Note that astrological signs have cusps, so if you're born within a day or two of a transition, you may identify with either sign."
    },
    {
      question: "What are the age milestones shown?",
      answer: "We show fun milestones like your 1 millionth second (about 11.5 days old), 1 billionth second (about 31.7 years old), and 10,000th day (about 27.4 years old)."
    },
    {
      question: "Can I calculate age at a specific date in the past or future?",
      answer: "Yes! Use the 'Age at Date' mode to calculate how old you were or will be on any specific date. Great for planning milestone celebrations or looking back at events."
    },
  ];
  const faqs = translations?.faq || defaultFaqs;

  // ─────────────────────────────────────────────────────────────────────────────
  // SIDEBAR CALCULATORS
  // ─────────────────────────────────────────────────────────────────────────────
  const everydayCalcs = ["Tip", "Discount", "Percentage", "Date", "Unit Converter", "Fuel Cost"];
  const healthCalcs = ["BMI", "Calorie", "BMR", "TDEE", "Body Fat", "Ideal Weight"];

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
              <span className="text-slate-900 font-medium" aria-current="page">Age Calculator</span>
            </nav>

            {/* Title */}
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl"
                role="img"
                aria-label="Age Calculator icon"
              >
                🎂
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Age Calculator</h1>
                <p className="text-slate-600 mt-1">Calculate your exact age, zodiac sign, generation, and more</p>
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
                  <h2 className="text-xl font-bold text-slate-900">Enter Your Birthday</h2>
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
                    Calculation Mode
                  </label>
                  <div role="radiogroup" aria-labelledby="calc-mode-label" className="grid grid-cols-3 gap-2">
                    {[
                      { key: "ageFromDOB", label: "Current Age", icon: "📅" },
                      { key: "ageAtDate", label: "Age at Date", icon: "🎯" },
                      { key: "dateDifference", label: "Date Difference", icon: "📊" },
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

                {/* Birth Date */}
                <div className="mb-6">
                  <label htmlFor="birth-date" className="block font-medium text-slate-700 mb-2">
                    {calculationMode === "dateDifference" ? "Start Date" : "Date of Birth"}
                  </label>
                  <input
                    id="birth-date"
                    type="date"
                    value={birthDate}
                    onChange={(e) => handleInputChange(setBirthDate, e.target.value)}
                    max={today.toISOString().split("T")[0]}
                    className="w-full px-4 py-3 text-lg border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Target Date (for age at date mode) */}
                {calculationMode === "ageAtDate" && (
                  <div className="mb-6">
                    <label htmlFor="target-date" className="block font-medium text-slate-700 mb-2">
                      Calculate Age At
                    </label>
                    <input
                      id="target-date"
                      type="date"
                      value={targetDate}
                      onChange={(e) => handleInputChange(setTargetDate, e.target.value)}
                      className="w-full px-4 py-3 text-lg border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}

                {/* End Date (for date difference mode) */}
                {calculationMode === "dateDifference" && (
                  <div className="mb-6">
                    <label htmlFor="end-date" className="block font-medium text-slate-700 mb-2">
                      End Date
                    </label>
                    <input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={(e) => handleInputChange(setEndDate, e.target.value)}
                      className="w-full px-4 py-3 text-lg border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}

                {/* Quick Birth Year Buttons */}
                <div className="mb-6">
                  <label className="block font-medium text-slate-700 mb-2">Quick Select Year</label>
                  <div className="flex flex-wrap gap-2">
                    {[1960, 1970, 1980, 1990, 2000, 2010].map((year) => (
                      <button
                        key={year}
                        onClick={() => {
                          const newDate = `${year}-${birthDate.split("-")[1] || "01"}-${birthDate.split("-")[2] || "01"}`;
                          handleInputChange(setBirthDate, newDate);
                        }}
                        className="py-2 px-3 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Leap Year Notice */}
                {isLeapYearBirthday && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <p className="text-amber-800 text-sm flex items-start gap-2">
                      <span>🎉</span> You have a leap year birthday! Born on February 29th means you only get a &quot;real&quot; birthday every 4 years.
                    </p>
                  </div>
                )}
              </div>

              {/* ═══════════════════════════════════════════════════════════════════
                  RIGHT COLUMN - RESULTS
              ═══════════════════════════════════════════════════════════════════ */}
              <div>
                {/* Main Result */}
                <div 
                  className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4"
                  role="region"
                  aria-label="Age Calculator Results"
                  aria-live="polite"
                >
                  <p className="text-sm text-slate-600 mb-1">Your Age</p>
                  <p className="text-4xl md:text-5xl font-bold text-slate-900">
                    {age.years} <span className="text-2xl text-slate-600">years</span>
                  </p>
                  <p className="text-xl text-blue-600 font-medium mt-1">
                    {age.months} months, {age.days} days
                  </p>
                  
                  {/* Birthday Info */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Born on</span>
                      <span className="font-medium text-slate-800">
                        {birth.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Day of the week</span>
                      <span className="font-medium text-blue-600">{dayBorn}</span>
                    </div>
                  </div>
                </div>

                {/* Next Birthday Countdown */}
                {calculationMode === "ageFromDOB" && (
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 mb-4 text-white">
                    <h3 className="font-bold mb-2">🎂 Next Birthday</h3>
                    <p className="text-3xl font-bold">{daysUntilBirthday} days</p>
                    <p className="text-blue-100 text-sm mt-1">
                      Until you turn {nextAge} on {nextBirthday.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                )}

                {/* Zodiac & Generation */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
                    <span className="text-4xl block mb-2">{zodiac.symbol}</span>
                    <p className="font-bold text-slate-900">{zodiac.sign}</p>
                    <p className="text-xs text-slate-600">{zodiac.element} sign</p>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
                    <span className="text-4xl block mb-2">👥</span>
                    <p className="font-bold text-slate-900 text-sm">{generation}</p>
                    <p className="text-xs text-slate-600">Born {birth.getFullYear()}</p>
                  </div>
                </div>

                {/* Age in Different Units */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">📊 Age Breakdown</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-2xl font-bold text-blue-600">{totalMonths.toLocaleString()}</p>
                      <p className="text-xs text-slate-600">Months</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-2xl font-bold text-blue-600">{totalWeeks.toLocaleString()}</p>
                      <p className="text-xs text-slate-600">Weeks</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-2xl font-bold text-blue-600">{totalDays.toLocaleString()}</p>
                      <p className="text-xs text-slate-600">Days</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-2xl font-bold text-blue-600">{totalHours.toLocaleString()}</p>
                      <p className="text-xs text-slate-600">Hours</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-2xl font-bold text-blue-600">{totalMinutes.toLocaleString()}</p>
                      <p className="text-xs text-slate-600">Minutes</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-lg font-bold text-blue-600">{totalSeconds.toLocaleString()}</p>
                      <p className="text-xs text-slate-600">Seconds</p>
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
                <h3 className="text-lg font-bold text-slate-900 mb-4">🎯 Fun Milestones</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>1 Million Seconds:</strong> {millionSeconds.toLocaleDateString()}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>10,000 Days:</strong> {tenThousandDays.toLocaleDateString()}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>1 Billion Seconds:</strong> {billionSeconds.toLocaleDateString()}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">👥 Generations</h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  {GENERATIONS.slice(2).map((gen) => (
                    <li key={gen.name} className="flex items-start gap-2">
                      <span className={`mt-1 ${generation === gen.name ? "text-blue-500" : "text-slate-400"}`}>
                        {generation === gen.name ? "★" : "•"}
                      </span>
                      <span className={generation === gen.name ? "font-bold text-blue-600" : ""}>
                        <strong>{gen.name}:</strong> {gen.start}-{gen.end}
                      </span>
                    </li>
                  ))}
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
              Person born on June 15, 1994
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Age in Years</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>Today - June 15, 1994</p>
                  <p className="font-bold text-blue-600 mt-2">= {age.years} years old</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Total Days</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>{age.years} years × 365.25 days</p>
                  <p className="font-bold text-blue-600 mt-2">≈ {totalDays.toLocaleString()} days</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Zodiac Sign</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>June 15 = Gemini dates</p>
                  <p className="font-bold text-blue-600 mt-2">♊ Gemini (Air)</p>
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding Age Calculation</h2>
                  <p className="text-slate-600 mb-4">
                    Age calculation might seem simple, but there are nuances. We calculate your exact age by counting complete years, then remaining months, then remaining days. This accounts for varying month lengths and leap years.
                  </p>
                  <p className="text-slate-600">
                    The day you were born is considered day 0, not day 1. This means on your first birthday, you&apos;ve completed one full year of life. International standards may vary slightly, but this is the most common calculation method.
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
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">💪</span>
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

                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                  <h3 className="font-bold mb-2">📅 Calculate Dates</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Add days, find business days, and calculate deadlines.
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
