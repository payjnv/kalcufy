"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import AdBlock from "@/components/ads/AdBlock";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

const CALCULATOR_SLUG = "bmr-calculator";
const CALCULATOR_NAME = "BMR Calculator";
const CALCULATOR_CATEGORY = "health";

export default function BMRCalculator() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // Calculator state - Basic inputs
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric");
  const [formula, setFormula] = useState<"mifflin" | "harris" | "katch">("mifflin");
  
  // Advanced options
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [bodyFatPercent, setBodyFatPercent] = useState<number | null>(null);
  const [activityLevel, setActivityLevel] = useState(1.2);
  
  // Special conditions
  const [pregnancyStatus, setPregnancyStatus] = useState<"none" | "first" | "second" | "third">("none");
  const [breastfeedingStatus, setBreastfeedingStatus] = useState<"none" | "exclusive" | "partial">("none");

  // Results
  const [bmrMifflin, setBmrMifflin] = useState(0);
  const [bmrHarris, setBmrHarris] = useState(0);
  const [bmrKatch, setBmrKatch] = useState(0);
  const [tdee, setTdee] = useState(0);
  const [adjustedTdee, setAdjustedTdee] = useState(0);

  // Favorites state
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Track view on page load
  useEffect(() => {
    if (hasTrackedView.current) return;
    hasTrackedView.current = true;
    fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, language: locale, type: "VIEW" }) }).catch(console.error);
  }, [locale]);

  // Track calculation
  const trackCalculation = () => {
    if (hasTrackedCalculation.current) return;
    hasTrackedCalculation.current = true;
    fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, language: locale, type: "CALCULATION" }) }).catch(console.error);
  };

  // Save to history
  const saveToHistory = async () => {
    if (!session?.user) return;
    setSaveStatus('saving');
    try {
      const res = await fetch("/api/history", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, calculatorName: CALCULATOR_NAME, inputs: { age, gender, weight, height, unitSystem, formula, activityLevel }, results: { bmr: getBmrByFormula().toFixed(0), tdee: adjustedTdee.toFixed(0) } }) });
      if (res.ok) { setSaveStatus('saved'); setTimeout(() => setSaveStatus('idle'), 2000); } else { setSaveStatus('error'); }
    } catch { setSaveStatus('error'); }
  };

  const handleInputChange = (setter: (value: any) => void, value: any) => { setter(value); trackCalculation(); };
  
  const SaveIndicator = () => { 
    if (saveStatus === 'idle') return null; 
    if (saveStatus === 'saving') return <span className="text-xs text-slate-600" role="status" aria-live="polite">{t("calculator.saving.saving", "Saving...")}</span>; 
    if (saveStatus === 'saved') return <span className="text-xs text-blue-700" role="status" aria-live="polite">✓ {t("calculator.saving.saved", "Saved")}</span>; 
    return <span className="text-xs text-red-700" role="status" aria-live="polite">{t("calculator.saving.error", "Error")}</span>; 
  };

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

  // Convert units if imperial
  const getWeightInKg = () => unitSystem === "imperial" ? weight * 0.453592 : weight;
  const getHeightInCm = () => unitSystem === "imperial" ? height * 2.54 : height;

  // Calculate BMR using all formulas
  useEffect(() => {
    const weightKg = getWeightInKg();
    const heightCm = getHeightInCm();

    // Mifflin-St Jeor Equation
    let mifflin = 0;
    if (gender === "male") {
      mifflin = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
    } else {
      mifflin = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
    }
    setBmrMifflin(mifflin);

    // Revised Harris-Benedict Equation
    let harris = 0;
    if (gender === "male") {
      harris = (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age) + 88.362;
    } else {
      harris = (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age) + 447.593;
    }
    setBmrHarris(harris);

    // Katch-McArdle Formula
    let katch = 0;
    if (bodyFatPercent !== null && bodyFatPercent > 0) {
      const leanMass = weightKg * (1 - bodyFatPercent / 100);
      katch = 370 + (21.6 * leanMass);
    } else {
      const estimatedBF = gender === "male" ? 20 : 28;
      const leanMass = weightKg * (1 - estimatedBF / 100);
      katch = 370 + (21.6 * leanMass);
    }
    setBmrKatch(katch);

    // Calculate TDEE
    let baseBmr = formula === "mifflin" ? mifflin : formula === "harris" ? harris : katch;
    const calculatedTdee = baseBmr * activityLevel;
    setTdee(calculatedTdee);

    // Adjust for pregnancy/breastfeeding
    let adjustment = 0;
    if (gender === "female") {
      if (pregnancyStatus === "second") adjustment += 340;
      if (pregnancyStatus === "third") adjustment += 450;
      if (breastfeedingStatus === "exclusive") adjustment += 500;
      if (breastfeedingStatus === "partial") adjustment += 250;
    }
    
    setAdjustedTdee(calculatedTdee + adjustment);
  }, [age, gender, weight, height, unitSystem, formula, bodyFatPercent, activityLevel, pregnancyStatus, breastfeedingStatus]);

  const getBmrByFormula = () => {
    if (formula === "mifflin") return bmrMifflin;
    if (formula === "harris") return bmrHarris;
    return bmrKatch;
  };

  // Activity level descriptions
  const activityLevels = [
    { value: 1.2, label: t("calculator.activity.sedentary", "Sedentary"), desc: t("calculator.activity.sedentaryDesc", "Little or no exercise, desk job") },
    { value: 1.375, label: t("calculator.activity.light", "Lightly Active"), desc: t("calculator.activity.lightDesc", "Light exercise 1-3 days/week") },
    { value: 1.55, label: t("calculator.activity.moderate", "Moderately Active"), desc: t("calculator.activity.moderateDesc", "Moderate exercise 3-5 days/week") },
    { value: 1.725, label: t("calculator.activity.active", "Very Active"), desc: t("calculator.activity.activeDesc", "Hard exercise 6-7 days/week") },
    { value: 1.9, label: t("calculator.activity.extreme", "Extremely Active"), desc: t("calculator.activity.extremeDesc", "Very hard exercise, physical job") },
  ];

  // FAQ data
  const defaultFaqs = [
    { question: "What is BMR (Basal Metabolic Rate)?", answer: "BMR is the number of calories your body needs to maintain basic life-sustaining functions like breathing, circulation, cell production, and nutrient processing while at complete rest. It represents about 60-75% of your total daily calorie expenditure." },
    { question: "What's the difference between BMR and TDEE?", answer: "BMR is calories burned at complete rest, while TDEE (Total Daily Energy Expenditure) includes BMR plus calories burned through daily activities and exercise. TDEE = BMR × Activity Factor." },
    { question: "Which BMR formula is most accurate?", answer: "The Mifflin-St Jeor equation is considered most accurate for the general population. However, if you know your body fat percentage, the Katch-McArdle formula may be more precise as it accounts for lean body mass." },
    { question: "Why does pregnancy affect BMR?", answer: "During pregnancy, your body requires additional energy to support fetal development, increased blood volume, and metabolic changes. The second trimester requires about 340 extra calories/day, and the third trimester about 450 extra calories/day." },
    { question: "How does age affect BMR?", answer: "BMR typically decreases by about 1-2% per decade after age 20, primarily due to loss of muscle mass. Maintaining muscle through exercise can help slow this decline." },
    { question: "Can I increase my BMR?", answer: "Yes! Building muscle mass through strength training is the most effective way to increase BMR, as muscle tissue burns more calories at rest than fat tissue. Staying hydrated and getting adequate sleep also support healthy metabolism." }
  ];
  const faqs = translations?.faq || defaultFaqs;

  // Categories for sidebar
  const financeCalcs = ["Mortgage", "Loan", "Compound Interest", "Auto Loan", "Retirement", "Savings", "Income Tax"];
  const healthCalcs = ["BMI", "Calorie", "Body Fat", "TDEE", "Macro", "Ideal Weight", "Protein"];

  return (
    <>
      <Header />

      {/* Skip to main content link - WCAG 2.1 - Hidden off-screen, visible on focus */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-20 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {t("accessibility.skipToMain", "Skip to main content")}
      </a>

      {/* Schema.org FAQ markup for SEO */}
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

      <main id="main-content" className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-6" aria-labelledby="page-title">
          <div className="container">
            {/* Breadcrumb Navigation - WCAG compliant */}
            <nav className="text-sm mb-4" aria-label="Breadcrumb">
              <ol className="flex items-center" itemScope itemType="https://schema.org/BreadcrumbList">
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link href={`/${locale}`} className="text-slate-600 hover:text-blue-700 underline-offset-2 hover:underline" itemProp="item">
                    <span itemProp="name">{t("common.home", "Home")}</span>
                  </Link>
                  <meta itemProp="position" content="1" />
                </li>
                <li aria-hidden="true"><span className="mx-2 text-slate-400">/</span></li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link href={`/${locale}/calculators`} className="text-slate-600 hover:text-blue-700 underline-offset-2 hover:underline" itemProp="item">
                    <span itemProp="name">{t("common.calculators", "Calculators")}</span>
                  </Link>
                  <meta itemProp="position" content="2" />
                </li>
                <li aria-hidden="true"><span className="mx-2 text-slate-400">/</span></li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" aria-current="page">
                  <span className="text-slate-900 font-medium" itemProp="name">{t("calculator.breadcrumb", "BMR")}</span>
                  <meta itemProp="position" content="3" />
                </li>
              </ol>
            </nav>

            {/* Title Section */}
            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl" aria-hidden="true">
                🔥
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 id="page-title" className="text-3xl md:text-4xl font-bold text-slate-900">
                    {t("calculator.title", "BMR Calculator")}
                  </h1>
                  <button
                    onClick={toggleFavorite}
                    disabled={favoriteLoading}
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                    aria-label={isFavorite ? t("calculator.favorites.remove", "Remove from favorites") : t("calculator.favorites.add", "Add to favorites")}
                    aria-pressed={isFavorite}
                  >
                    {isFavorite ? (
                      <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    ) : (
                      <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-2 h-6">
                  <p className="text-slate-600">{t("calculator.subtitle", "Calculate your Basal Metabolic Rate and daily calorie needs")}</p>
                  {saveStatus !== 'idle' && (
                    <>
                      <span className="text-slate-400" aria-hidden="true">—</span>
                      <SaveIndicator />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-6 bg-white" aria-labelledby="calculator-heading">
          <h2 id="calculator-heading" className="sr-only">{t("calculator.srTitle", "BMR Calculator Tool")}</h2>
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Calculator Inputs */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">{t("calculator.inputsTitle", "Your Information")}</h3>

                {/* Unit System Toggle */}
                <fieldset className="mb-6">
                  <legend className="font-medium text-slate-700 mb-2">{t("calculator.inputs.unitSystem", "Unit System")}</legend>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleInputChange(setUnitSystem, "metric")}
                      className={`py-2 px-4 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
                        unitSystem === "metric" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                      aria-pressed={unitSystem === "metric"}
                    >
                      {t("calculator.inputs.metric", "Metric")} (kg/cm)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange(setUnitSystem, "imperial")}
                      className={`py-2 px-4 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
                        unitSystem === "imperial" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                      aria-pressed={unitSystem === "imperial"}
                    >
                      {t("calculator.inputs.imperial", "Imperial")} (lb/in)
                    </button>
                  </div>
                </fieldset>

                {/* Gender Selection */}
                <fieldset className="mb-6">
                  <legend className="font-medium text-slate-700 mb-2">{t("calculator.inputs.gender", "Biological Sex")}</legend>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleInputChange(setGender, "male")}
                      className={`py-2 px-4 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
                        gender === "male" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                      aria-pressed={gender === "male"}
                    >
                      <span aria-hidden="true">👨 </span>{t("calculator.inputs.male", "Male")}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange(setGender, "female")}
                      className={`py-2 px-4 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
                        gender === "female" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                      aria-pressed={gender === "female"}
                    >
                      <span aria-hidden="true">👩 </span>{t("calculator.inputs.female", "Female")}
                    </button>
                  </div>
                </fieldset>

                {/* Age */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="age-input" className="font-medium text-slate-700">{t("calculator.inputs.age", "Age")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        id="age-input"
                        type="number"
                        min="15"
                        max="80"
                        value={age}
                        onChange={(e) => handleInputChange(setAge, Number(e.target.value) || 15)}
                        className="w-16 bg-transparent text-right font-bold text-blue-700 focus:outline-none"
                        aria-describedby="age-range"
                      />
                      <span className="text-slate-600 ml-1">{t("calculator.inputs.years", "years")}</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="80"
                    value={age}
                    onChange={(e) => handleInputChange(setAge, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    aria-label={`${t("calculator.inputs.age", "Age")}: ${age} ${t("calculator.inputs.years", "years")}`}
                  />
                  <div id="age-range" className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>15 {t("calculator.inputs.years", "years")}</span>
                    <span>80 {t("calculator.inputs.years", "years")}</span>
                  </div>
                </div>

                {/* Weight */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="weight-input" className="font-medium text-slate-700">{t("calculator.inputs.weight", "Weight")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        id="weight-input"
                        type="number"
                        min={unitSystem === "metric" ? 30 : 66}
                        max={unitSystem === "metric" ? 200 : 440}
                        value={weight}
                        onChange={(e) => handleInputChange(setWeight, Number(e.target.value) || 0)}
                        className="w-16 bg-transparent text-right font-bold text-blue-700 focus:outline-none"
                        aria-describedby="weight-range"
                      />
                      <span className="text-slate-600 ml-1">{unitSystem === "metric" ? "kg" : "lb"}</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={unitSystem === "metric" ? 30 : 66}
                    max={unitSystem === "metric" ? 200 : 440}
                    value={weight}
                    onChange={(e) => handleInputChange(setWeight, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    aria-label={`${t("calculator.inputs.weight", "Weight")}: ${weight} ${unitSystem === "metric" ? "kg" : "lb"}`}
                  />
                  <div id="weight-range" className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>{unitSystem === "metric" ? "30 kg" : "66 lb"}</span>
                    <span>{unitSystem === "metric" ? "200 kg" : "440 lb"}</span>
                  </div>
                </div>

                {/* Height */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="height-input" className="font-medium text-slate-700">{t("calculator.inputs.height", "Height")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        id="height-input"
                        type="number"
                        min={unitSystem === "metric" ? 120 : 48}
                        max={unitSystem === "metric" ? 220 : 87}
                        value={height}
                        onChange={(e) => handleInputChange(setHeight, Number(e.target.value) || 0)}
                        className="w-16 bg-transparent text-right font-bold text-blue-700 focus:outline-none"
                        aria-describedby="height-range"
                      />
                      <span className="text-slate-600 ml-1">{unitSystem === "metric" ? "cm" : "in"}</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={unitSystem === "metric" ? 120 : 48}
                    max={unitSystem === "metric" ? 220 : 87}
                    value={height}
                    onChange={(e) => handleInputChange(setHeight, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    aria-label={`${t("calculator.inputs.height", "Height")}: ${height} ${unitSystem === "metric" ? "cm" : "in"}`}
                  />
                  <div id="height-range" className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>{unitSystem === "metric" ? "120 cm" : "4'0\""}</span>
                    <span>{unitSystem === "metric" ? "220 cm" : "7'3\""}</span>
                  </div>
                </div>

                {/* Activity Level */}
                <div className="mb-6">
                  <label htmlFor="activity-select" className="font-medium text-slate-700 block mb-2">{t("calculator.inputs.activityLevel", "Activity Level")}</label>
                  <select
                    id="activity-select"
                    value={activityLevel}
                    onChange={(e) => handleInputChange(setActivityLevel, Number(e.target.value))}
                    className="w-full bg-white rounded-lg px-4 py-3 border border-slate-200 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  >
                    {activityLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label} - {level.desc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Advanced Options - Collapsible */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => handleInputChange(setShowAdvanced, !showAdvanced)}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
                    aria-expanded={showAdvanced}
                    aria-controls="advanced-options"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg" aria-hidden="true">⚙️</span>
                      <span className="font-semibold text-slate-700">{t("calculator.advanced.title", "Advanced Options")}</span>
                    </div>
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
                    <div id="advanced-options" className="p-4 space-y-5 bg-white">
                      {/* Formula Selection */}
                      <fieldset>
                        <legend className="font-medium text-slate-700 mb-2">{t("calculator.advanced.formula", "BMR Formula")}</legend>
                        <div className="space-y-2">
                          {[
                            { value: "mifflin", label: "Mifflin-St Jeor", desc: t("calculator.advanced.mifflinDesc", "Most accurate for general population") },
                            { value: "harris", label: "Harris-Benedict", desc: t("calculator.advanced.harrisDesc", "Classic formula, revised 1984") },
                            { value: "katch", label: "Katch-McArdle", desc: t("calculator.advanced.katchDesc", "Best if you know body fat %") },
                          ].map((f) => (
                            <label
                              key={f.value}
                              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 ${
                                formula === f.value ? "bg-blue-50 border-2 border-blue-600" : "bg-slate-50 border-2 border-transparent hover:bg-slate-100"
                              }`}
                            >
                              <input
                                type="radio"
                                name="formula"
                                value={f.value}
                                checked={formula === f.value}
                                onChange={(e) => handleInputChange(setFormula, e.target.value)}
                                className="sr-only"
                              />
                              <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center flex-shrink-0 ${
                                formula === f.value ? "border-blue-600 bg-blue-600" : "border-slate-400"
                              }`} aria-hidden="true">
                                {formula === f.value && <div className="w-2 h-2 bg-white rounded-full" />}
                              </div>
                              <div>
                                <span className="font-medium text-slate-900">{f.label}</span>
                                <p className="text-sm text-slate-600">{f.desc}</p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </fieldset>

                      {/* Body Fat Percentage */}
                      <div>
                        <label htmlFor="bodyfat-input" className="font-medium text-slate-700 block mb-2">
                          {t("calculator.advanced.bodyFat", "Body Fat %")} 
                          <span className="text-slate-600 font-normal ml-1">({t("calculator.advanced.optional", "optional")})</span>
                        </label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600">
                          <input
                            id="bodyfat-input"
                            type="number"
                            min="3"
                            max="60"
                            value={bodyFatPercent ?? ""}
                            onChange={(e) => handleInputChange(setBodyFatPercent, e.target.value ? Number(e.target.value) : null)}
                            placeholder="e.g. 20"
                            className="flex-1 px-3 py-2 text-right font-bold text-blue-700 focus:outline-none"
                            aria-describedby="bodyfat-hint"
                          />
                          <span className="px-3 py-2 bg-slate-50 text-slate-600 border-l border-slate-200">%</span>
                        </div>
                        <p id="bodyfat-hint" className="text-sm text-slate-600 mt-1">{t("calculator.advanced.bodyFatHint", "Improves accuracy of Katch-McArdle formula")}</p>
                      </div>

                      {/* Pregnancy Status (Female only) */}
                      {gender === "female" && (
                        <div>
                          <label htmlFor="pregnancy-select" className="font-medium text-slate-700 block mb-2">
                            <span aria-hidden="true">🤰 </span>{t("calculator.advanced.pregnancy", "Pregnancy Status")}
                          </label>
                          <select
                            id="pregnancy-select"
                            value={pregnancyStatus}
                            onChange={(e) => handleInputChange(setPregnancyStatus, e.target.value)}
                            className="w-full bg-white rounded-lg px-4 py-3 border border-slate-200 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                          >
                            <option value="none">{t("calculator.advanced.pregnancyNone", "Not pregnant")}</option>
                            <option value="first">{t("calculator.advanced.pregnancy1", "1st Trimester")} (+0 cal)</option>
                            <option value="second">{t("calculator.advanced.pregnancy2", "2nd Trimester")} (+340 cal)</option>
                            <option value="third">{t("calculator.advanced.pregnancy3", "3rd Trimester")} (+450 cal)</option>
                          </select>
                        </div>
                      )}

                      {/* Breastfeeding Status (Female only) */}
                      {gender === "female" && (
                        <div>
                          <label htmlFor="breastfeeding-select" className="font-medium text-slate-700 block mb-2">
                            <span aria-hidden="true">🍼 </span>{t("calculator.advanced.breastfeeding", "Breastfeeding Status")}
                          </label>
                          <select
                            id="breastfeeding-select"
                            value={breastfeedingStatus}
                            onChange={(e) => handleInputChange(setBreastfeedingStatus, e.target.value)}
                            className="w-full bg-white rounded-lg px-4 py-3 border border-slate-200 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                          >
                            <option value="none">{t("calculator.advanced.breastfeedingNone", "Not breastfeeding")}</option>
                            <option value="exclusive">{t("calculator.advanced.breastfeedingExclusive", "Exclusive breastfeeding")} (+500 cal)</option>
                            <option value="partial">{t("calculator.advanced.breastfeedingPartial", "Partial breastfeeding")} (+250 cal)</option>
                          </select>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Save Button */}
                {session && (
                  <button
                    type="button"
                    onClick={saveToHistory}
                    className="w-full mt-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                  >
                    💾 {t("calculator.buttons.save", "Save to History")}
                  </button>
                )}
              </div>

              {/* Results */}
              <div>
                {/* Main Result Card - Template V2 style */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4" role="region" aria-labelledby="results-heading" aria-live="polite">
                  <h3 id="results-heading" className="sr-only">{t("calculator.results.srTitle", "Your BMR Results")}</h3>
                  <p className="text-sm text-slate-600 mb-1">{t("calculator.results.bmrLabel", "Your Basal Metabolic Rate")}</p>
                  <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                    {Math.round(getBmrByFormula()).toLocaleString()} <span className="text-2xl font-normal text-slate-600">{t("calculator.results.calDay", "cal/day")}</span>
                  </p>
                  <p className="text-sm text-slate-600 mb-6">
                    {t("calculator.results.usingFormula", "Using")} {formula === "mifflin" ? "Mifflin-St Jeor" : formula === "harris" ? "Harris-Benedict" : "Katch-McArdle"} {t("calculator.results.formula", "formula")}
                  </p>

                  {/* TDEE Result */}
                  <div className="bg-white rounded-xl p-4 border border-slate-200 mb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-slate-600">{t("calculator.results.tdee", "Total Daily Energy Expenditure")}</p>
                        <p className="text-2xl font-bold text-blue-700">{Math.round(adjustedTdee).toLocaleString()} <span className="text-sm font-normal text-slate-600">{t("calculator.results.calDay", "cal/day")}</span></p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-slate-600">{t("calculator.results.multiplier", "Activity multiplier")}</span>
                        <p className="font-bold text-slate-700">×{activityLevel}</p>
                      </div>
                    </div>
                    {(pregnancyStatus !== "none" || breastfeedingStatus !== "none") && (
                      <div className="mt-2 pt-2 border-t border-slate-100 text-sm text-blue-700">
                        {pregnancyStatus !== "none" && <span className="mr-2">🤰 +{pregnancyStatus === "second" ? 340 : pregnancyStatus === "third" ? 450 : 0} cal</span>}
                        {breastfeedingStatus !== "none" && <span>🍼 +{breastfeedingStatus === "exclusive" ? 500 : 250} cal</span>}
                      </div>
                    )}
                  </div>

                  {/* Formula Comparison */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className={`bg-white rounded-xl p-3 border-2 ${formula === "mifflin" ? "border-blue-600" : "border-slate-200"}`}>
                      <p className="text-xs text-slate-600">{t("calculator.results.mifflin", "Mifflin-St Jeor")}</p>
                      <p className="text-lg font-bold text-slate-800">{Math.round(bmrMifflin).toLocaleString()}</p>
                    </div>
                    <div className={`bg-white rounded-xl p-3 border-2 ${formula === "harris" ? "border-blue-600" : "border-slate-200"}`}>
                      <p className="text-xs text-slate-600">{t("calculator.results.harris", "Harris-Benedict")}</p>
                      <p className="text-lg font-bold text-slate-800">{Math.round(bmrHarris).toLocaleString()}</p>
                    </div>
                    <div className={`bg-white rounded-xl p-3 border-2 ${formula === "katch" ? "border-blue-600" : "border-slate-200"}`}>
                      <p className="text-xs text-slate-600">{t("calculator.results.katch", "Katch-McArdle")}</p>
                      <p className="text-lg font-bold text-slate-800">{Math.round(bmrKatch).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Calorie Goals Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">{t("calculator.results.calorieGoals", "Daily Calorie Goals")}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span aria-hidden="true">📉</span>
                        <span className="text-slate-700">{t("calculator.results.weightLoss", "Weight Loss")} (-500)</span>
                      </div>
                      <span className="font-bold text-red-700">{Math.round(adjustedTdee - 500).toLocaleString()} cal</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span aria-hidden="true">⚖️</span>
                        <span className="text-slate-700">{t("calculator.results.maintain", "Maintain Weight")}</span>
                      </div>
                      <span className="font-bold text-blue-700">{Math.round(adjustedTdee).toLocaleString()} cal</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span aria-hidden="true">📈</span>
                        <span className="text-slate-700">{t("calculator.results.weightGain", "Weight Gain")} (+500)</span>
                      </div>
                      <span className="font-bold text-blue-700">{Math.round(adjustedTdee + 500).toLocaleString()} cal</span>
                    </div>
                  </div>
                </div>

                {/* Activity Level Breakdown */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">{t("calculator.results.tdeeByActivity", "TDEE by Activity Level")}</h3>
                  <div className="space-y-2">
                    {activityLevels.map((level) => {
                      const levelTdee = getBmrByFormula() * level.value;
                      const isSelected = activityLevel === level.value;
                      return (
                        <div
                          key={level.value}
                          className={`flex justify-between items-center p-3 rounded-lg ${isSelected ? "bg-blue-100 border border-blue-300" : "bg-slate-50"}`}
                        >
                          <span className={`text-sm ${isSelected ? "font-semibold text-blue-800" : "text-slate-700"}`}>{level.label}</span>
                          <span className={`font-bold ${isSelected ? "text-blue-700" : "text-slate-700"}`}>{Math.round(levelTdee).toLocaleString()} cal</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Export Buttons - Template V2 style */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button type="button" className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                    📄 PDF <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">PRO</span>
                  </button>
                  <button type="button" className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                    📊 Excel <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">PRO</span>
                  </button>
                </div>

                {/* Related Calculators */}
                <div className="flex gap-2">
                  <Link
                    href={`/${locale}/tdee-calculator`}
                    className="flex-1 py-3 px-4 bg-slate-100 rounded-xl text-center font-medium text-slate-700 hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                  >
                    {t("calculator.related.tdee", "TDEE Calculator")} →
                  </Link>
                  <Link
                    href={`/${locale}/macro-calculator`}
                    className="flex-1 py-3 px-4 bg-slate-100 rounded-xl text-center font-medium text-slate-700 hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                  >
                    {t("calculator.related.macro", "Macro Calculator")} →
                  </Link>
                </div>
              </div>
            </div>

            {/* Ad Block */}
            <div className="mt-8">
              <AdBlock slot="calculator-bottom" />
            </div>

            {/* Info Cards - 2 columns */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* BMR Formulas Explained */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span aria-hidden="true">📄</span>
                  {t("infoCards.formulas.title", "BMR Formulas Explained")}
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-bold text-slate-900">{t("infoCards.formulas.mifflin", "Mifflin-St Jeor")} <span className="text-blue-700 font-normal text-sm">({t("infoCards.formulas.default", "Default")})</span></h4>
                    <p className="text-sm text-slate-600">{t("infoCards.formulas.mifflinDesc", "Most accurate for average adults. Uses height, weight, age, gender.")}</p>
                  </div>
                  <div className="border-l-4 border-slate-300 pl-4">
                    <h4 className="font-bold text-slate-900">{t("infoCards.formulas.harris", "Harris-Benedict")}</h4>
                    <p className="text-sm text-slate-600">{t("infoCards.formulas.harrisDesc", "Classic formula from 1919. Tends to slightly overestimate.")}</p>
                  </div>
                  <div className="border-l-4 border-slate-300 pl-4">
                    <h4 className="font-bold text-slate-900">{t("infoCards.formulas.katch", "Katch-McArdle")}</h4>
                    <p className="text-sm text-slate-600">{t("infoCards.formulas.katchDesc", "Best for lean individuals. Requires body fat percentage.")}</p>
                  </div>
                </div>
              </div>

              {/* Activity Multipliers Table */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span aria-hidden="true">🏃</span>
                  {t("infoCards.activity.title", "Activity Multipliers")}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" role="table">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th scope="col" className="text-left py-2 font-semibold text-slate-700">{t("infoCards.activity.level", "Level")}</th>
                        <th scope="col" className="text-center py-2 font-semibold text-slate-700">{t("infoCards.activity.multiplier", "Multiplier")}</th>
                        <th scope="col" className="text-right py-2 font-semibold text-slate-700">{t("infoCards.activity.exercise", "Exercise")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-700">{t("infoCards.activity.sedentary", "Sedentary")}</td>
                        <td className="py-2 text-center font-bold text-blue-600">×1.2</td>
                        <td className="py-2 text-right text-slate-600">{t("infoCards.activity.sedentaryDesc", "Little or no exercise")}</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-700">{t("infoCards.activity.light", "Lightly Active")}</td>
                        <td className="py-2 text-center font-bold text-blue-600">×1.375</td>
                        <td className="py-2 text-right text-slate-600">{t("infoCards.activity.lightDesc", "Light exercise 1-3 days/week")}</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-700">{t("infoCards.activity.moderate", "Moderately Active")}</td>
                        <td className="py-2 text-center font-bold text-blue-600">×1.55</td>
                        <td className="py-2 text-right text-slate-600">{t("infoCards.activity.moderateDesc", "Moderate exercise 3-5 days/week")}</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-700">{t("infoCards.activity.active", "Very Active")}</td>
                        <td className="py-2 text-center font-bold text-blue-600">×1.725</td>
                        <td className="py-2 text-right text-slate-600">{t("infoCards.activity.activeDesc", "Hard exercise 6-7 days/week")}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-slate-700">{t("infoCards.activity.extreme", "Extremely Active")}</td>
                        <td className="py-2 text-center font-bold text-blue-600">×1.9</td>
                        <td className="py-2 text-right text-slate-600">{t("infoCards.activity.extremeDesc", "Athlete")}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Example Calculation - 3 columns */}
        <section className="py-6 bg-white border-t border-slate-100" aria-labelledby="example-heading">
          <div className="container">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
              <h2 id="example-heading" className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span aria-hidden="true">📊</span>
                {t("calculator.example.title", "Example Calculation")}
              </h2>
              <p className="text-slate-600 mb-6">
                {t("calculator.example.intro", "Let's calculate daily calories for a")} <strong>{t("calculator.example.person", "30-year-old male, 5'10\", 170 lbs")}</strong>, {t("calculator.example.goal", "moderately active, wanting to lose weight")}:
              </p>
              
              {/* 3-column steps */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {/* Step 1: BMR */}
                <div className="bg-slate-50 rounded-xl p-4 border-l-4 border-blue-500">
                  <h3 className="font-semibold text-slate-800 mb-2">{t("calculator.example.step1", "Step 1: BMR")}</h3>
                  <p className="font-mono text-sm text-slate-700">
                    (10 × 77kg) + (6.25 × 178cm)<br />
                    - (5 × 30) + 5<br />
                    <strong className="text-blue-600">{t("calculator.example.bmrResult", "BMR = 1,742 cal")}</strong>
                  </p>
                </div>
                
                {/* Step 2: TDEE */}
                <div className="bg-slate-50 rounded-xl p-4 border-l-4 border-blue-500">
                  <h3 className="font-semibold text-slate-800 mb-2">{t("calculator.example.step2", "Step 2: TDEE")}</h3>
                  <p className="font-mono text-sm text-slate-700">
                    1,742 × 1.55 ({t("calculator.example.moderate", "moderate")})<br />
                    <strong className="text-blue-600">{t("calculator.example.tdeeResult", "TDEE = 2,700 cal")}</strong>
                  </p>
                </div>
                
                {/* Step 3: Target */}
                <div className="bg-slate-50 rounded-xl p-4 border-l-4 border-blue-500">
                  <h3 className="font-semibold text-slate-800 mb-2">{t("calculator.example.step3", "Step 3: Target")}</h3>
                  <p className="font-mono text-sm text-slate-700">
                    2,700 - 500 ({t("calculator.example.deficit", "deficit")})<br />
                    <strong className="text-blue-700">{t("calculator.example.targetResult", "Target = 2,200 cal")}</strong>
                  </p>
                </div>
              </div>
              
              <p className="text-slate-600">
                {t("calculator.example.conclusion", "With a 500-calorie deficit, this person would lose approximately 1 lb per week. Using the \"Balanced\" macro split (30/40/30), their daily macros would be:")} <strong>{t("calculator.example.macros", "165g protein, 220g carbs, 73g fat")}</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Educational Content with Sidebar */}
        <section className="py-12 bg-slate-50" aria-labelledby="education-heading">
          <div className="container">
            <h2 id="education-heading" className="sr-only">{t("education.srTitle", "Learn About BMR")}</h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content - LEFT/CENTER (2 columns) */}
              <div className="lg:col-span-2 space-y-6">
                {/* What is BMR */}
                <article className="bg-white rounded-2xl p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">📖 {t("education.title", "What is BMR (Basal Metabolic Rate)?")}</h3>
                  <p className="text-slate-600 mb-4">
                    {t("education.p1", "Basal Metabolic Rate (BMR) is the number of calories your body needs to perform basic life-sustaining functions while at complete rest. These functions include breathing, blood circulation, cell production, nutrient processing, and maintaining body temperature.")}
                  </p>
                  <p className="text-slate-600 mb-4">
                    {t("education.p2", "Your BMR accounts for approximately 60-75% of your total daily calorie expenditure. The remaining calories are burned through physical activity (15-30%) and the thermic effect of food (10%).")}
                  </p>
                  <p className="text-slate-600">
                    {t("education.p3", "Understanding your BMR is crucial for setting appropriate calorie goals, whether you want to lose weight, maintain your current weight, or build muscle.")}
                  </p>
                </article>

                {/* Formula */}
                <article className="bg-white rounded-2xl p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">📐 {t("education.formula.title", "The Formulas")}</h3>
                  
                  <div className="space-y-6">
                    {/* Mifflin-St Jeor */}
                    <div>
                      <h4 className="font-bold text-slate-800 mb-2">{t("education.formula.mifflinTitle", "Mifflin-St Jeor Equation")} <span className="text-blue-700 text-sm">({t("education.formula.recommended", "Recommended")})</span></h4>
                      <div className="bg-slate-100 rounded-xl p-4 font-mono text-sm">
                        <p className="text-slate-700"><strong>{t("education.formula.men", "Men")}:</strong> BMR = (10 × weight<sub>kg</sub>) + (6.25 × height<sub>cm</sub>) - (5 × age) + 5</p>
                        <p className="text-slate-700"><strong>{t("education.formula.women", "Women")}:</strong> BMR = (10 × weight<sub>kg</sub>) + (6.25 × height<sub>cm</sub>) - (5 × age) - 161</p>
                      </div>
                    </div>

                    {/* Harris-Benedict */}
                    <div>
                      <h4 className="font-bold text-slate-800 mb-2">{t("education.formula.harrisTitle", "Revised Harris-Benedict Equation")}</h4>
                      <div className="bg-slate-100 rounded-xl p-4 font-mono text-sm">
                        <p className="text-slate-700"><strong>{t("education.formula.men", "Men")}:</strong> BMR = (13.397 × weight<sub>kg</sub>) + (4.799 × height<sub>cm</sub>) - (5.677 × age) + 88.362</p>
                        <p className="text-slate-700"><strong>{t("education.formula.women", "Women")}:</strong> BMR = (9.247 × weight<sub>kg</sub>) + (3.098 × height<sub>cm</sub>) - (4.330 × age) + 447.593</p>
                      </div>
                    </div>

                    {/* Katch-McArdle */}
                    <div>
                      <h4 className="font-bold text-slate-800 mb-2">{t("education.formula.katchTitle", "Katch-McArdle Formula")}</h4>
                      <div className="bg-slate-100 rounded-xl p-4 font-mono text-sm">
                        <p className="text-slate-700">BMR = 370 + (21.6 × lean body mass<sub>kg</sub>)</p>
                        <p className="text-slate-600 text-xs mt-2">{t("education.formula.katchNote", "Requires body fat percentage to calculate lean body mass")}</p>
                      </div>
                    </div>
                  </div>
                </article>

                {/* Tips */}
                <article className="bg-white rounded-2xl p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">💡 {t("education.tips.title", "Tips to Boost Your Metabolism")}</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <span className="text-2xl flex-shrink-0" aria-hidden="true">💪</span>
                      <div>
                        <h4 className="font-semibold text-slate-900">{t("education.tips.muscle.title", "Build Muscle Mass")}</h4>
                        <p className="text-slate-600">{t("education.tips.muscle.desc", "Muscle burns more calories at rest than fat. Strength training can increase your BMR over time.")}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-2xl flex-shrink-0" aria-hidden="true">🥤</span>
                      <div>
                        <h4 className="font-semibold text-slate-900">{t("education.tips.water.title", "Stay Hydrated")}</h4>
                        <p className="text-slate-600">{t("education.tips.water.desc", "Drinking cold water can temporarily boost metabolism as your body works to warm it up.")}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-2xl flex-shrink-0" aria-hidden="true">🥩</span>
                      <div>
                        <h4 className="font-semibold text-slate-900">{t("education.tips.protein.title", "Eat Enough Protein")}</h4>
                        <p className="text-slate-600">{t("education.tips.protein.desc", "Protein has a higher thermic effect than carbs or fat, meaning you burn more calories digesting it.")}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-2xl flex-shrink-0" aria-hidden="true">😴</span>
                      <div>
                        <h4 className="font-semibold text-slate-900">{t("education.tips.sleep.title", "Get Quality Sleep")}</h4>
                        <p className="text-slate-600">{t("education.tips.sleep.desc", "Poor sleep can lower your BMR and increase hunger hormones, making weight management harder.")}</p>
                      </div>
                    </div>
                  </div>
                </article>

                {/* FAQ */}
                <article className="bg-white rounded-2xl p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">❓ {t("education.faqTitle", "Frequently Asked Questions")}</h3>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <details key={index} className="group">
                        <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-slate-50 rounded-xl hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                          <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                          <svg className="w-5 h-5 text-slate-600 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <p className="text-slate-600 p-4 pt-2">{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                </article>
              </div>

              {/* Sidebar - RIGHT (1 column) */}
              <aside className="space-y-6" aria-label={t("sidebar.ariaLabel", "Related calculators and resources")}>
                {/* Ad Block - Sidebar */}
                <AdBlock slot="calculator-sidebar" />

                {/* Health Categories */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm" aria-hidden="true">💪</span>
                    {t("sidebar.healthTitle", "Health Calculators")}
                  </h3>
                  <nav aria-label={t("sidebar.healthNav", "Health calculators navigation")}>
                    <ul className="space-y-2">
                      {healthCalcs.map((calc) => (
                        <li key={calc}>
                          <Link
                            href={`/${locale}/${calc.toLowerCase().replace(/ /g, "-")}-calculator`}
                            className="block text-blue-700 hover:text-blue-900 hover:underline underline-offset-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded"
                          >
                            {calc} Calculator
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                {/* Finance Categories */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm" aria-hidden="true">💰</span>
                    {t("sidebar.financeTitle", "Financial Calculators")}
                  </h3>
                  <nav aria-label={t("sidebar.financeNav", "Financial calculators navigation")}>
                    <ul className="space-y-2">
                      {financeCalcs.map((calc) => (
                        <li key={calc}>
                          <Link
                            href={`/${locale}/${calc.toLowerCase().replace(/ /g, "-")}-calculator`}
                            className="block text-blue-700 hover:text-blue-900 hover:underline underline-offset-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded"
                          >
                            {calc} Calculator
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
