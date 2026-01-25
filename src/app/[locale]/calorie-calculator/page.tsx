"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import AdBlock from "@/components/ads/AdBlock";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

const CALCULATOR_SLUG = "calorie-calculator";
const CALCULATOR_NAME = "Calorie Calculator";
const CALCULATOR_CATEGORY = "health";

export default function CalorieCalculator() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // Calculator state
  const [unit, setUnit] = useState<"imperial" | "metric">("imperial");
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(10);
  const [heightCm, setHeightCm] = useState(178);
  const [weight, setWeight] = useState(170);
  const [weightKg, setWeightKg] = useState(77);
  const [activityLevel, setActivityLevel] = useState(1.55);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [bodyFat, setBodyFat] = useState(20);
  const [useBodyFat, setUseBodyFat] = useState(false);
  const [goal, setGoal] = useState<"lose" | "maintain" | "gain">("maintain");
  const [deficitLevel, setDeficitLevel] = useState<"mild" | "moderate" | "aggressive" | "extreme">("moderate");
  const [showTableModal, setShowTableModal] = useState(false);
  
  // New fields from research
  const [bmrFormula, setBmrFormula] = useState<"mifflin" | "harris" | "katch">("mifflin");
  const [macroPreset, setMacroPreset] = useState<"balanced" | "lowcarb" | "highprotein" | "keto">("balanced");
  const [targetWeight, setTargetWeight] = useState(150);
  const [targetWeightKg, setTargetWeightKg] = useState(68);
  const [exerciseCalories, setExerciseCalories] = useState(0);
  const [showZigzag, setShowZigzag] = useState(false);

  // Results
  const [bmr, setBmr] = useState(0);
  const [tdee, setTdee] = useState(0);
  const [targetCalories, setTargetCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [idealWeightMin, setIdealWeightMin] = useState(0);
  const [idealWeightMax, setIdealWeightMax] = useState(0);
  const [weeksToGoal, setWeeksToGoal] = useState(0);
  const [targetDate, setTargetDate] = useState("");
  const [dailyWater, setDailyWater] = useState(0);
  const [zigzagCalories, setZigzagCalories] = useState<number[]>([]);

  // Favorites state
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

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
      const res = await fetch("/api/history", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, calculatorName: CALCULATOR_NAME, inputs: { unit, age, gender, height: unit === 'imperial' ? `${heightFt}'${heightIn}"` : `${heightCm}cm`, weight: unit === 'imperial' ? `${weight} lbs` : `${weightKg} kg`, activityLevel, goal }, results: { bmr: bmr.toString(), tdee: tdee.toString(), targetCalories: targetCalories.toString(), macros: `P:${protein}g C:${carbs}g F:${fat}g` } }) });
      if (res.ok) { setSaveStatus('saved'); setTimeout(() => setSaveStatus('idle'), 2000); } else { setSaveStatus('error'); }
    } catch { setSaveStatus('error'); }
  };

  const handleInputChange = (setter: (value: any) => void, value: any) => { setter(value); trackCalculation(); };
  const SaveIndicator = () => { if (saveStatus === 'idle') return null; if (saveStatus === 'saving') return <span className="text-xs text-slate-400">{t("calculator.saving.saving", "Saving...")}</span>; if (saveStatus === 'saved') return <span className="text-xs text-green-500">✓ {t("calculator.saving.saved", "Saved")}</span>; return <span className="text-xs text-red-500">Error</span>; };

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

  // Activity levels
  const activityLevels = [
    { value: 1.2, label: "Sedentary", desc: "Little or no exercise, desk job" },
    { value: 1.375, label: "Lightly Active", desc: "Light exercise 1-3 days/week" },
    { value: 1.55, label: "Moderately Active", desc: "Moderate exercise 3-5 days/week" },
    { value: 1.725, label: "Very Active", desc: "Hard exercise 6-7 days/week" },
    { value: 1.9, label: "Extremely Active", desc: "Athlete, physical job + training" },
  ];

  // Deficit levels
  const deficitLevels = {
    mild: { calories: 250, lbsPerWeek: 0.5, label: "Mild" },
    moderate: { calories: 500, lbsPerWeek: 1, label: "Moderate" },
    aggressive: { calories: 750, lbsPerWeek: 1.5, label: "Aggressive" },
    extreme: { calories: 1000, lbsPerWeek: 2, label: "Extreme" },
  };

  // Macro presets (protein%, carb%, fat%)
  const macroPresets = {
    balanced: { protein: 30, carbs: 40, fat: 30, label: "Balanced", desc: "General health" },
    lowcarb: { protein: 40, carbs: 20, fat: 40, label: "Low Carb", desc: "Reduce carbs" },
    highprotein: { protein: 40, carbs: 35, fat: 25, label: "High Protein", desc: "Muscle building" },
    keto: { protein: 25, carbs: 5, fat: 70, label: "Keto", desc: "Ketogenic diet" },
  };

  // Calculate
  useEffect(() => {
    let heightM: number;
    let weightKgVal: number;

    if (unit === "imperial") {
      heightM = ((heightFt * 12) + heightIn) * 0.0254;
      weightKgVal = weight * 0.453592;
    } else {
      heightM = heightCm / 100;
      weightKgVal = weightKg;
    }

    const heightCmVal = heightM * 100;

    // BMR Calculation based on selected formula
    let calculatedBmr: number;
    
    if (bmrFormula === "katch" && useBodyFat && bodyFat > 0) {
      // Katch-McArdle formula (uses lean body mass)
      const leanMass = weightKgVal * (1 - bodyFat / 100);
      calculatedBmr = 370 + (21.6 * leanMass);
    } else if (bmrFormula === "harris") {
      // Harris-Benedict Revised formula
      if (gender === "male") {
        calculatedBmr = 88.362 + (13.397 * weightKgVal) + (4.799 * heightCmVal) - (5.677 * age);
      } else {
        calculatedBmr = 447.593 + (9.247 * weightKgVal) + (3.098 * heightCmVal) - (4.330 * age);
      }
    } else {
      // Mifflin-St Jeor formula (default, most accurate)
      if (gender === "male") {
        calculatedBmr = (10 * weightKgVal) + (6.25 * heightCmVal) - (5 * age) + 5;
      } else {
        calculatedBmr = (10 * weightKgVal) + (6.25 * heightCmVal) - (5 * age) - 161;
      }
    }

    // TDEE (including exercise calories)
    const baseTdee = calculatedBmr * activityLevel;
    const calculatedTdee = baseTdee + exerciseCalories;

    // Deficit/Surplus calculation
    let calorieAdjustment = 0;
    if (goal === "lose") {
      calorieAdjustment = -deficitLevels[deficitLevel].calories;
    } else if (goal === "gain") {
      calorieAdjustment = deficitLevels[deficitLevel].calories;
    }

    let target = calculatedTdee + calorieAdjustment;
    
    // Minimum healthy calories
    if (goal === "lose") {
      target = Math.max(target, gender === "male" ? 1500 : 1200);
    }

    // Macros calculation based on preset
    const preset = macroPresets[macroPreset];
    const proteinCals = target * (preset.protein / 100);
    const carbsCals = target * (preset.carbs / 100);
    const fatCals = target * (preset.fat / 100);
    
    const proteinGrams = Math.round(proteinCals / 4);
    const carbsGrams = Math.round(carbsCals / 4);
    const fatGrams = Math.round(fatCals / 9);

    // BMI & Ideal Weight
    const calculatedBmi = weightKgVal / (heightM * heightM);
    const idealMin = 18.5 * heightM * heightM;
    const idealMax = 24.9 * heightM * heightM;

    // Weeks to goal weight
    const currentWeight = unit === "imperial" ? weight : weightKg;
    const goalWeight = unit === "imperial" ? targetWeight : targetWeightKg;
    const weightDiff = Math.abs(currentWeight - goalWeight);
    const weeklyRate = deficitLevels[deficitLevel].lbsPerWeek * (unit === "metric" ? 0.453592 : 1);
    const weeks = Math.ceil(weightDiff / weeklyRate);
    
    // Target date
    const today = new Date();
    const goalDate = new Date(today.getTime() + weeks * 7 * 24 * 60 * 60 * 1000);
    const dateStr = goalDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    // Water intake (0.5 oz per lb or 30ml per kg)
    const waterOz = unit === "imperial" ? Math.round(weight * 0.5) : Math.round(weightKgVal * 30 / 29.574);
    const waterL = unit === "metric" ? (weightKgVal * 30 / 1000).toFixed(1) : (waterOz * 0.0296).toFixed(1);

    // Zigzag calories (7 days)
    const zigzag: number[] = [];
    const weeklyTarget = target * 7;
    // Pattern: Higher on workout days, lower on rest days
    const patterns = [1.1, 0.9, 1.0, 0.9, 1.1, 1.0, 1.0]; // Mon-Sun
    patterns.forEach(mult => {
      zigzag.push(Math.round(target * mult));
    });
    // Adjust last day to hit weekly target exactly
    const currentTotal = zigzag.reduce((a, b) => a + b, 0);
    zigzag[6] = zigzag[6] + (weeklyTarget - currentTotal);

    setBmr(Math.round(calculatedBmr));
    setTdee(Math.round(calculatedTdee));
    setTargetCalories(Math.round(target));
    setProtein(proteinGrams);
    setCarbs(carbsGrams);
    setFat(fatGrams);
    setBmi(calculatedBmi);
    setIdealWeightMin(unit === "imperial" ? Math.round(idealMin / 0.453592) : Math.round(idealMin));
    setIdealWeightMax(unit === "imperial" ? Math.round(idealMax / 0.453592) : Math.round(idealMax));
    setWeeksToGoal(weeks);
    setTargetDate(dateStr);
    setDailyWater(unit === "imperial" ? waterOz : parseFloat(waterL));
    setZigzagCalories(zigzag);
  }, [unit, age, gender, heightFt, heightIn, heightCm, weight, weightKg, activityLevel, bodyFat, useBodyFat, goal, deficitLevel, bmrFormula, macroPreset, targetWeight, targetWeightKg, exerciseCalories]);

  const formatWeight = (val: number) => unit === "imperial" ? `${val} lbs` : `${val} kg`;

  // FAQ data
  const defaultFaqs = [
    { question: "What is the difference between BMR and TDEE?", answer: "BMR (Basal Metabolic Rate) is the calories your body burns at complete rest - just to keep you alive. TDEE (Total Daily Energy Expenditure) includes BMR plus calories burned through daily activities, exercise, and digesting food. TDEE is the number you use to plan your diet." },
    { question: "Which BMR formula is most accurate?", answer: "The Mifflin-St Jeor equation is considered the most accurate for most people (within 10% of actual). The Katch-McArdle formula is more accurate if you know your body fat percentage, as it accounts for lean body mass. Harris-Benedict tends to overestimate slightly." },
    { question: "What is zigzag calorie cycling?", answer: "Zigzag calorie cycling alternates between high and low calorie days while maintaining the same weekly average. This can help prevent metabolic adaptation (plateaus) and makes dieting more flexible - you can eat more on workout days or social occasions." },
    { question: "How fast should I lose weight?", answer: "A safe rate is 0.5-1% of body weight per week, which translates to about 1-2 lbs for most people. Losing faster than this increases the risk of muscle loss, nutritional deficiencies, and metabolic slowdown. The 'Moderate' deficit setting targets 1 lb/week." },
    { question: "Why do my calories seem low compared to other calculators?", answer: "Many calculators overestimate activity levels. We use more conservative multipliers based on research showing people often overestimate their activity. If you're losing weight faster than expected, you can increase calories slightly." },
    { question: "How much protein do I really need?", answer: "Research suggests 0.7-1g per pound of body weight for most active people. Our 'High Protein' preset provides 40% of calories from protein, which supports muscle retention during weight loss and muscle building during a surplus." }
  ];
  const faqs = translations?.faq || defaultFaqs;

  // Day names for zigzag
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Categories for sidebar
  const financeCalcs = [
    "Compound Interest", "Mortgage", "Loan", "Auto Loan", "Savings", 
    "Retirement", "Credit Card Payoff", "Investment", "ROI"
  ];

  const healthCalcs = [
    "BMI", "Calorie", "Body Fat", "BMR", "Macro", "TDEE", 
    "Protein", "Ideal Weight", "Water Intake"
  ];

  return (
    <>
      <Header />
      
      {/* Schema.org FAQ markup */}
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

      {/* Zigzag Schedule Modal */}
      {showTableModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">7-Day Zigzag Calorie Schedule</h3>
              <button onClick={() => handleInputChange(setShowTableModal, false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="p-6">
              <p className="text-slate-600 mb-4">
                Zigzag calorie cycling helps prevent metabolic adaptation by varying daily intake while maintaining your weekly average.
              </p>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {dayNames.map((day, i) => (
                  <div key={day} className={`text-center p-3 rounded-xl ${
                    zigzagCalories[i] > targetCalories ? 'bg-green-50 border border-green-200' :
                    zigzagCalories[i] < targetCalories ? 'bg-amber-50 border border-amber-200' :
                    'bg-slate-50 border border-slate-200'
                  }`}>
                    <p className="text-xs text-slate-600 font-medium">{day}</p>
                    <p className="text-lg font-bold text-slate-900">{zigzagCalories[i]}</p>
                    <p className="text-xs text-slate-400">cal</p>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Weekly Total:</span>
                  <span className="font-bold text-blue-600">{zigzagCalories.reduce((a, b) => a + b, 0).toLocaleString()} cal</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-slate-600">Daily Average:</span>
                  <span className="font-bold text-slate-800">{targetCalories.toLocaleString()} cal</span>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-200 flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 rounded-xl hover:bg-slate-200 font-medium text-slate-700">
                📄 Download PDF <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{t("common.pro", "PRO")}</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 rounded-xl hover:bg-slate-200 font-medium text-slate-700">
                📊 Download Excel <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{t("common.pro", "PRO")}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="pt-20">
        {/* HERO SECTION */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-6">
          <div className="container">
            <nav className="text-sm mb-4">
              <Link href={`/${locale}`} className="text-slate-600 hover:text-blue-600">{t("common.home", "Home")}</Link>
              <span className="mx-2 text-slate-400">/</span>
              <Link href={`/${locale}/calculators`} className="text-slate-600 hover:text-blue-600">{t("common.calculators", "Calculators")}</Link>
              <span className="mx-2 text-slate-400">/</span>
              <span className="text-slate-700">Calorie Calculator</span>
            </nav>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">
                🔥
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{t("calculator.title", "Calorie Calculator")}</h1>
                  <button
                    onClick={toggleFavorite}
                    disabled={favoriteLoading}
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                    title={isFavorite ? t("calculator.favorites.remove", "Remove from favorites") : t("calculator.favorites.add", "Add to favorites")}
                  >
                    {isFavorite ? (
                      <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    ) : (
                      <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-2 h-6">
                  <p className="text-slate-600">Calculate your daily calorie needs with BMR, TDEE & macros</p>
                  {saveStatus !== 'idle' && (
                    <>
                      <span className="text-slate-400">—</span>
                      <SaveIndicator />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CALCULATOR SECTION */}
        <section className="py-6 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* LEFT COLUMN - Inputs */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Your Information</h2>
                
                {/* Unit Toggle */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">Unit System</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleInputChange(setUnit, "imperial")}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        unit === "imperial" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Imperial (lb/ft)
                    </button>
                    <button
                      onClick={() => handleInputChange(setUnit, "metric")}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        unit === "metric" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Metric (kg/cm)
                    </button>
                  </div>
                </div>

                {/* Gender */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">Gender</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleInputChange(setGender, "male")}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        gender === "male" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Male
                    </button>
                    <button
                      onClick={() => handleInputChange(setGender, "female")}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        gender === "female" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>

                {/* Age */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Age</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="font-bold text-blue-600">{age} years</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="80"
                    value={age}
                    onChange={(e) => handleInputChange(setAge, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>15</span>
                    <span>80</span>
                  </div>
                </div>

                {/* Height */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Height</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      {unit === "imperial" ? (
                        <span className="font-bold text-blue-600">{heightFt}'{heightIn}"</span>
                      ) : (
                        <span className="font-bold text-blue-600">{heightCm} cm</span>
                      )}
                    </div>
                  </div>
                  {unit === "imperial" ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="range"
                          min="4"
                          max="7"
                          value={heightFt}
                          onChange={(e) => handleInputChange(setHeightFt, Number(e.target.value))}
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="flex justify-between text-xs text-slate-600 mt-1">
                          <span>4 ft</span>
                          <span>7 ft</span>
                        </div>
                      </div>
                      <div>
                        <input
                          type="range"
                          min="0"
                          max="11"
                          value={heightIn}
                          onChange={(e) => handleInputChange(setHeightIn, Number(e.target.value))}
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="flex justify-between text-xs text-slate-600 mt-1">
                          <span>0 in</span>
                          <span>11 in</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <input
                        type="range"
                        min="140"
                        max="220"
                        value={heightCm}
                        onChange={(e) => handleInputChange(setHeightCm, Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="flex justify-between text-xs text-slate-600 mt-1">
                        <span>140 cm</span>
                        <span>220 cm</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Weight */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Current Weight</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="font-bold text-blue-600">
                        {unit === "imperial" ? `${weight} lbs` : `${weightKg} kg`}
                      </span>
                    </div>
                  </div>
                  {unit === "imperial" ? (
                    <>
                      <input
                        type="range"
                        min="80"
                        max="400"
                        value={weight}
                        onChange={(e) => handleInputChange(setWeight, Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="flex justify-between text-xs text-slate-600 mt-1">
                        <span>80 lbs</span>
                        <span>400 lbs</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <input
                        type="range"
                        min="35"
                        max="180"
                        value={weightKg}
                        onChange={(e) => handleInputChange(setWeightKg, Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="flex justify-between text-xs text-slate-600 mt-1">
                        <span>35 kg</span>
                        <span>180 kg</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Activity Level */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">Activity Level</label>
                  <div className="space-y-2">
                    {activityLevels.map((level) => (
                      <button
                        key={level.value}
                        onClick={() => handleInputChange(setActivityLevel, level.value)}
                        className={`w-full text-left p-3 rounded-xl border transition-all ${
                          activityLevel === level.value
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-slate-800">{level.label}</span>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            activityLevel === level.value ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"
                          }`}>
                            ×{level.value}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{level.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Goal */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">Goal</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["lose", "maintain", "gain"] as const).map((g) => (
                      <button
                        key={g}
                        onClick={() => handleInputChange(setGoal, g)}
                        className={`py-3 px-3 rounded-xl text-sm font-medium transition-all ${
                          goal === g
                            ? g === "lose" ? "bg-red-500 text-white" :
                              g === "maintain" ? "bg-blue-500 text-white" : "bg-green-500 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {g === "lose" ? "Lose Weight" : g === "maintain" ? "Maintain" : "Gain Weight"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Deficit Level (only for lose/gain) */}
                {goal !== "maintain" && (
                  <div className="mb-6">
                    <label className="font-medium text-slate-700 block mb-2">
                      {goal === "lose" ? "Deficit" : "Surplus"} Level
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {(Object.keys(deficitLevels) as Array<keyof typeof deficitLevels>).map((level) => (
                        <button
                          key={level}
                          onClick={() => handleInputChange(setDeficitLevel, level)}
                          className={`py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                            deficitLevel === level
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          <div>{deficitLevels[level].label}</div>
                          <div className="text-[10px] opacity-80">
                            {deficitLevels[level].lbsPerWeek} lb/wk
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Advanced Options Toggle */}
                <button
                  onClick={() => handleInputChange(setShowAdvanced, !showAdvanced)}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <span className="flex items-center gap-2 font-medium text-slate-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Advanced Options
                  </span>
                  <svg className={`w-5 h-5 text-slate-600 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Advanced Options Content */}
                {showAdvanced && (
                  <div className="mt-4 space-y-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    {/* BMR Formula */}
                    <div>
                      <label className="font-medium text-slate-700 block mb-2">BMR Formula</label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => { setBmrFormula("mifflin"); setUseBodyFat(false); }}
                          className={`py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                            bmrFormula === "mifflin" ? "bg-blue-600 text-white" : "bg-white text-slate-700 border border-blue-200"
                          }`}
                        >
                          Mifflin-St Jeor
                        </button>
                        <button
                          onClick={() => { setBmrFormula("harris"); setUseBodyFat(false); }}
                          className={`py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                            bmrFormula === "harris" ? "bg-blue-600 text-white" : "bg-white text-slate-700 border border-blue-200"
                          }`}
                        >
                          Harris-Benedict
                        </button>
                        <button
                          onClick={() => { setBmrFormula("katch"); setUseBodyFat(true); }}
                          className={`py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                            bmrFormula === "katch" ? "bg-blue-600 text-white" : "bg-white text-slate-700 border border-blue-200"
                          }`}
                        >
                          Katch-McArdle
                        </button>
                      </div>
                    </div>

                    {/* Body Fat (for Katch-McArdle) */}
                    {bmrFormula === "katch" && (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="font-medium text-slate-700">Body Fat %</label>
                          <div className="flex items-center bg-white rounded-lg px-3 py-1 border border-blue-200">
                            <span className="font-bold text-blue-600">{bodyFat}%</span>
                          </div>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="50"
                          value={bodyFat}
                          onChange={(e) => handleInputChange(setBodyFat, Number(e.target.value))}
                          className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="flex justify-between text-xs text-slate-600 mt-1">
                          <span>5%</span>
                          <span>50%</span>
                        </div>
                      </div>
                    )}

                    {/* Macro Preset */}
                    <div>
                      <label className="font-medium text-slate-700 block mb-2">Macro Split</label>
                      <div className="grid grid-cols-2 gap-2">
                        {(Object.keys(macroPresets) as Array<keyof typeof macroPresets>).map((preset) => (
                          <button
                            key={preset}
                            onClick={() => handleInputChange(setMacroPreset, preset)}
                            className={`py-2 px-3 rounded-lg text-xs font-medium transition-all text-left ${
                              macroPreset === preset ? "bg-blue-600 text-white" : "bg-white text-slate-700 border border-blue-200"
                            }`}
                          >
                            <div className="font-semibold">{macroPresets[preset].label}</div>
                            <div className={`text-[10px] ${macroPreset === preset ? "text-blue-100" : "text-slate-600"}`}>
                              P:{macroPresets[preset].protein}% C:{macroPresets[preset].carbs}% F:{macroPresets[preset].fat}%
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Target Weight */}
                    {goal !== "maintain" && (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="font-medium text-slate-700">Target Weight</label>
                          <div className="flex items-center bg-white rounded-lg px-3 py-1 border border-blue-200">
                            <span className="font-bold text-blue-600">
                              {unit === "imperial" ? `${targetWeight} lbs` : `${targetWeightKg} kg`}
                            </span>
                          </div>
                        </div>
                        {unit === "imperial" ? (
                          <input
                            type="range"
                            min="80"
                            max="350"
                            value={targetWeight}
                            onChange={(e) => handleInputChange(setTargetWeight, Number(e.target.value))}
                            className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                        ) : (
                          <input
                            type="range"
                            min="35"
                            max="160"
                            value={targetWeightKg}
                            onChange={(e) => handleInputChange(setTargetWeightKg, Number(e.target.value))}
                            className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                        )}
                      </div>
                    )}

                    {/* Exercise Calories */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="font-medium text-slate-700">Extra Exercise Calories</label>
                        <div className="flex items-center bg-white rounded-lg px-3 py-1 border border-blue-200">
                          <span className="font-bold text-blue-600">+{exerciseCalories} cal</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        step="50"
                        value={exerciseCalories}
                        onChange={(e) => handleInputChange(setExerciseCalories, Number(e.target.value))}
                        className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <p className="text-xs text-slate-600 mt-1">Add calories from workouts not covered by activity level</p>
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN - Results */}
              <div>
                {/* Main Results Card */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  <p className="text-sm text-slate-600 mb-1">Daily Calorie Target</p>
                  <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                    {targetCalories.toLocaleString()}
                  </p>
                  <p className="text-slate-600 mb-6">calories per day</p>

                  {/* Macro Breakdown */}
                  <div className="mb-6">
                    <p className="text-sm text-slate-600 mb-2">Macro Breakdown</p>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                        <p className="text-2xl font-bold text-blue-600">{protein}g</p>
                        <p className="text-xs text-slate-600">Protein</p>
                        <p className="text-xs text-slate-400">{Math.round(protein * 4)} cal</p>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                        <p className="text-2xl font-bold text-amber-500">{carbs}g</p>
                        <p className="text-xs text-slate-600">Carbs</p>
                        <p className="text-xs text-slate-400">{Math.round(carbs * 4)} cal</p>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                        <p className="text-2xl font-bold text-green-500">{fat}g</p>
                        <p className="text-xs text-slate-600">Fat</p>
                        <p className="text-xs text-slate-400">{Math.round(fat * 9)} cal</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">BMR</p>
                      <p className="text-xl font-bold text-slate-800">{bmr.toLocaleString()} cal</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">TDEE</p>
                      <p className="text-xl font-bold text-blue-600">{tdee.toLocaleString()} cal</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">BMI</p>
                      <p className="text-xl font-bold text-slate-800">{bmi.toFixed(1)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Ideal Weight</p>
                      <p className="text-xl font-bold text-slate-800">
                        {idealWeightMin}-{idealWeightMax}
                      </p>
                    </div>
                  </div>

                  {/* Goal Progress */}
                  {goal !== "maintain" && (
                    <div className="bg-green-50 rounded-xl p-4 border border-green-200 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-700 font-medium">Goal Timeline</span>
                        <span className="text-green-600 font-bold">{weeksToGoal} weeks</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Target date</span>
                        <span className="text-slate-700 font-medium">{targetDate}</span>
                      </div>
                    </div>
                  )}

                  {/* Water Intake */}
                  <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-200">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">💧</span>
                        <span className="text-slate-700 font-medium">Daily Water</span>
                      </div>
                      <span className="text-cyan-600 font-bold">
                        {unit === "imperial" ? `${dailyWater} oz` : `${dailyWater} L`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Zigzag Button */}
                <button
                  onClick={() => handleInputChange(setShowTableModal, true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 mb-4"
                >
                  📊 View 7-Day Zigzag Schedule
                </button>

                {/* Export & Save Buttons */}
                <div className={`grid ${session?.user ? 'grid-cols-3' : 'grid-cols-2'} gap-3`}>
                  {session?.user && (
                    <button onClick={saveToHistory} disabled={saveStatus === 'saving'} className="bg-white border border-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50">
                      💾 {saveStatus === 'saving' ? '...' : 'Save'}
                    </button>
                  )}
                  <button className="bg-white border border-slate-200 text-slate-400 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed">
                    📄 PDF
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{t("common.pro", "PRO")}</span>
                  </button>
                  <button className="bg-white border border-slate-200 text-slate-400 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed">
                    📊 Excel
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{t("common.pro", "PRO")}</span>
                  </button>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* AD BLOCK */}
        <section className="py-4 bg-white">
          <div className="container">
            <AdBlock slot="calculator-bottom" />
          </div>
        </section>

        {/* INFO CARDS - 2 columns */}
        <section className="py-6 bg-white">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* BMR Formulas Explained */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  📐 BMR Formulas Explained
                </h3>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-semibold text-slate-800">Mifflin-St Jeor (Default)</p>
                    <p className="text-sm text-slate-600">Most accurate for average adults. Uses height, weight, age, gender.</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="font-semibold text-slate-800">Harris-Benedict</p>
                    <p className="text-sm text-slate-600">Classic formula from 1919. Tends to slightly overestimate.</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="font-semibold text-slate-800">Katch-McArdle</p>
                    <p className="text-sm text-slate-600">Best for lean individuals. Requires body fat percentage.</p>
                  </div>
                </div>
              </div>

              {/* Activity Multipliers */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  🏃 Activity Multipliers
                </h3>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 text-slate-600 font-medium">Level</th>
                      <th className="text-center py-2 text-slate-600 font-medium">Multiplier</th>
                      <th className="text-right py-2 text-slate-600 font-medium">Exercise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activityLevels.map((level) => (
                      <tr key={level.value} className="border-b border-slate-100">
                        <td className="py-2 text-slate-700">{level.label}</td>
                        <td className="py-2 text-center text-blue-600 font-medium">×{level.value}</td>
                        <td className="py-2 text-right text-slate-600 text-sm">{level.desc.split(',')[0]}</td>
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
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                📊 Example Calculation
              </h3>
              <p className="text-slate-600 mb-4">
                Let's calculate daily calories for a <strong>30-year-old male</strong>, <strong>5'10"</strong>, <strong>170 lbs</strong>, moderately active, wanting to lose weight:
              </p>
              <div className="bg-blue-50 rounded-xl p-6 mb-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Step 1: BMR</p>
                    <p className="font-mono text-slate-700 text-sm">
                      (10 × 77kg) + (6.25 × 178cm)<br />
                      - (5 × 30) + 5<br />
                      <strong className="text-blue-600">BMR = 1,742 cal</strong>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Step 2: TDEE</p>
                    <p className="font-mono text-slate-700 text-sm">
                      1,742 × 1.55 (moderate)<br />
                      <strong className="text-blue-600">TDEE = 2,700 cal</strong>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Step 3: Target</p>
                    <p className="font-mono text-slate-700 text-sm">
                      2,700 - 500 (deficit)<br />
                      <strong className="text-blue-600">Target = 2,200 cal</strong>
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-slate-600">
                With a 500-calorie deficit, this person would lose approximately 1 lb per week. 
                Using the "Balanced" macro split (30/40/30), their daily macros would be: <strong>165g protein</strong>, <strong>220g carbs</strong>, <strong>73g fat</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* EDUCATIONAL SECTION - 3 columns */}
        <section className="py-12 bg-slate-50">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Main Content - 2 cols */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* What is TDEE */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">What is TDEE?</h2>
                  <p className="text-slate-600 mb-4">
                    Total Daily Energy Expenditure (TDEE) is the total number of calories you burn each day. 
                    It consists of four components:
                  </p>
                  <div className="space-y-3">
                    <div className="flex gap-4">
                      <span className="text-xl">🛏️</span>
                      <div>
                        <h3 className="font-semibold text-slate-900">BMR (60-70%)</h3>
                        <p className="text-slate-600">Basal Metabolic Rate - calories burned at complete rest to keep you alive.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-xl">🍽️</span>
                      <div>
                        <h3 className="font-semibold text-slate-900">TEF (10%)</h3>
                        <p className="text-slate-600">Thermic Effect of Food - calories burned digesting food.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-xl">🏋️</span>
                      <div>
                        <h3 className="font-semibold text-slate-900">EAT (5-10%)</h3>
                        <p className="text-slate-600">Exercise Activity Thermogenesis - calories from planned workouts.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-xl">🚶</span>
                      <div>
                        <h3 className="font-semibold text-slate-900">NEAT (15-30%)</h3>
                        <p className="text-slate-600">Non-Exercise Activity Thermogenesis - all other movement (walking, fidgeting).</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Zigzag Cycling */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">What is Zigzag Calorie Cycling?</h2>
                  <p className="text-slate-600 mb-4">
                    Zigzag calorie cycling alternates between higher and lower calorie days throughout the week. 
                    This approach offers several benefits:
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span><strong>Prevents plateaus</strong> - Varying intake can help avoid metabolic adaptation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span><strong>More flexible</strong> - Allows higher calories on social occasions or workout days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span><strong>Psychologically easier</strong> - Having "high" days makes dieting feel less restrictive</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span><strong>Same weekly average</strong> - You still hit your calorie goals over the week</span>
                    </li>
                  </ul>
                </div>

                {/* FAQ */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <details key={index} className="group">
                        <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-slate-50 rounded-xl hover:bg-slate-100">
                          <span className="font-semibold text-slate-900">{faq.question}</span>
                          <svg className="w-5 h-5 text-slate-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
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
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    💰 Finance Calculators
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {financeCalcs.map((calc) => (
                      <Link
                        key={calc}
                        href={`/${locale}/${calc.toLowerCase().replace(/ /g, '-')}-calculator`}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-blue-100 hover:text-blue-700 rounded-lg text-sm text-slate-600 transition-colors"
                      >
                        {calc}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    🏃 {t("sidebar.healthTitle", "Health Calculators")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {healthCalcs.map((calc) => (
                      <Link
                        key={calc}
                        href={`/${locale}/${calc.toLowerCase().replace(/ /g, '-')}-calculator`}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-blue-100 hover:text-blue-700 rounded-lg text-sm text-slate-600 transition-colors"
                      >
                        {calc}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    💡 Quick Tips
                  </h3>
                  <ul className="space-y-3 text-slate-600 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span>Track for 2 weeks then adjust based on actual weight changes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span>Don't eat back all exercise calories - trackers overestimate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span>Prioritize protein to preserve muscle during weight loss</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span>Recalculate every 10 lbs lost - your needs will decrease</span>
                    </li>
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
