"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function CalorieCalculator() {
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
  const [rate, setRate] = useState(0.5);
  const [showTableModal, setShowTableModal] = useState(false);

  // Results
  const [bmr, setBmr] = useState(0);
  const [tdee, setTdee] = useState(0);
  const [targetCalories, setTargetCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [weeksToGoal, setWeeksToGoal] = useState(0);

  // Activity levels
  const activityLevels = [
    { value: 1.2, label: "Sedentary", desc: "Little or no exercise, desk job" },
    { value: 1.375, label: "Light", desc: "Light exercise 1-3 days/week" },
    { value: 1.55, label: "Moderate", desc: "Moderate exercise 3-5 days/week" },
    { value: 1.725, label: "Active", desc: "Heavy exercise 6-7 days/week" },
    { value: 1.9, label: "Very Active", desc: "Athlete, physical job + training" },
  ];

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

    // BMR Calculation (Mifflin-St Jeor)
    let calculatedBmr: number;
    
    if (useBodyFat && bodyFat > 0) {
      // Katch-McArdle formula (uses lean body mass)
      const leanMass = weightKgVal * (1 - bodyFat / 100);
      calculatedBmr = 370 + (21.6 * leanMass);
    } else {
      // Mifflin-St Jeor formula
      if (gender === "male") {
        calculatedBmr = (10 * weightKgVal) + (6.25 * heightCmVal) - (5 * age) + 5;
      } else {
        calculatedBmr = (10 * weightKgVal) + (6.25 * heightCmVal) - (5 * age) - 161;
      }
    }

    // TDEE
    const calculatedTdee = calculatedBmr * activityLevel;

    // Target calories based on goal
    let target: number;
    const weeklyChange = rate * (unit === "imperial" ? 0.453592 : 1); // kg per week
    const dailyCalorieChange = (weeklyChange * 7700) / 7; // 7700 cal = 1kg

    if (goal === "lose") {
      target = calculatedTdee - dailyCalorieChange;
      // Minimum healthy calories
      target = Math.max(target, gender === "male" ? 1500 : 1200);
    } else if (goal === "gain") {
      target = calculatedTdee + dailyCalorieChange;
    } else {
      target = calculatedTdee;
    }

    // Macros calculation (balanced approach)
    // Protein: 0.8-1g per lb bodyweight or 1.6-2.2g per kg
    const proteinGrams = Math.round(weightKgVal * 2); // 2g per kg
    // Fat: 25% of calories
    const fatCals = target * 0.25;
    const fatGrams = Math.round(fatCals / 9);
    // Carbs: remaining calories
    const carbsCals = target - (proteinGrams * 4) - (fatGrams * 9);
    const carbsGrams = Math.round(carbsCals / 4);

    // BMI
    const calculatedBmi = weightKgVal / (heightM * heightM);

    // Weeks to goal (if losing/gaining)
    const targetWeightChange = unit === "imperial" ? 10 : 4.5; // lbs or kg
    const weeks = Math.round(targetWeightChange / rate);

    setBmr(Math.round(calculatedBmr));
    setTdee(Math.round(calculatedTdee));
    setTargetCalories(Math.round(target));
    setProtein(proteinGrams);
    setCarbs(carbsGrams);
    setFat(fatGrams);
    setBmi(calculatedBmi);
    setWeeksToGoal(weeks);
  }, [unit, age, gender, heightFt, heightIn, heightCm, weight, weightKg, activityLevel, bodyFat, useBodyFat, goal, rate]);

  // Macro percentages
  const totalMacroCals = (protein * 4) + (carbs * 4) + (fat * 9);
  const proteinPct = Math.round((protein * 4 / totalMacroCals) * 100) || 0;
  const carbsPct = Math.round((carbs * 4 / totalMacroCals) * 100) || 0;
  const fatPct = Math.round((fat * 9 / totalMacroCals) * 100) || 0;

  // Calorie comparison data
  const calorieComparison = [
    { goal: "Extreme Loss", change: "-1000 cal", calories: tdee - 1000, note: "~2 lbs/week" },
    { goal: "Moderate Loss", change: "-500 cal", calories: tdee - 500, note: "~1 lb/week" },
    { goal: "Mild Loss", change: "-250 cal", calories: tdee - 250, note: "~0.5 lb/week" },
    { goal: "Maintain", change: "0", calories: tdee, note: "No change" },
    { goal: "Mild Gain", change: "+250 cal", calories: tdee + 250, note: "~0.5 lb/week" },
    { goal: "Moderate Gain", change: "+500 cal", calories: tdee + 500, note: "~1 lb/week" },
  ];

  // FAQ data
  const faqs = [
    { question: "What's the difference between BMR and TDEE?", answer: "BMR (Basal Metabolic Rate) is calories burned at complete rest - just to keep your body functioning. TDEE (Total Daily Energy Expenditure) is BMR plus calories burned through daily activities and exercise. TDEE is what you actually need to eat." },
    { question: "How accurate is this calculator?", answer: "Calorie calculators provide estimates based on averages. Individual metabolism varies up to 20%. Use this as a starting point and adjust based on real results over 2-4 weeks." },
    { question: "What's the minimum safe calories?", answer: "Generally, men shouldn't go below 1,500 calories and women below 1,200 without medical supervision. Very low calorie diets can slow metabolism and cause nutrient deficiencies." },
    { question: "Should I eat back exercise calories?", answer: "It depends on your goal. For weight loss, eating back half of exercise calories works well. For maintenance or muscle gain, eat back most or all exercise calories." },
    { question: "Why am I not losing weight at my calorie target?", answer: "Common reasons: underestimating portion sizes, not counting beverages/snacks, overestimating activity level, or your metabolism has adapted. Try reducing by 100-200 more calories or increasing activity." }
  ];

  // Categories
  const financeCalcs = [
    "Compound Interest", "Mortgage", "Loan", "Auto Loan", "Interest", "Payment", 
    "Retirement", "Investment", "Inflation", "Salary", "Income Tax", "401K"
  ];
  const healthCalcs = [
    "BMI", "Body Fat", "BMR", "Macro", "TDEE", "Protein", "Ideal Weight", "Pregnancy"
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

      {/* Calorie Comparison Modal */}
      {showTableModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Calorie Targets by Goal</h3>
              <button onClick={() => setShowTableModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="overflow-auto max-h-[50vh] p-4">
              <p className="text-sm text-slate-600 mb-4">Based on your TDEE of <strong>{tdee.toLocaleString()} calories</strong></p>
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Goal</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase">Change</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Daily Calories</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Expected</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {calorieComparison.map((row, i) => (
                    <tr key={i} className={row.calories === targetCalories ? "bg-blue-50" : ""}>
                      <td className="px-4 py-3 font-medium">{row.goal}</td>
                      <td className="px-4 py-3 text-center text-slate-600">{row.change}</td>
                      <td className="px-4 py-3 text-right font-bold text-blue-600">{row.calories.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-slate-500">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-200">
              <button 
                onClick={() => setShowTableModal(false)}
                className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-6">
          <div className="container">
            <nav className="text-sm mb-4">
              <Link href="/" className="text-slate-500 hover:text-blue-600">Home</Link>
              <span className="mx-2 text-slate-400">/</span>
              <Link href="/en/calculators" className="text-slate-500 hover:text-blue-600">Calculators</Link>
              <span className="mx-2 text-slate-400">/</span>
              <span className="text-slate-700">Calorie</span>
            </nav>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">🔥</div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Calorie Calculator</h1>
                <p className="text-slate-600">Calculate your daily calorie needs</p>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-6 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Calculator Inputs */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Your Information</h2>
                  {/* Unit Toggle */}
                  <div className="flex bg-slate-100 rounded-lg p-1">
                    <button
                      onClick={() => setUnit("imperial")}
                      className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                        unit === "imperial" ? "bg-white shadow text-blue-600" : "text-slate-600"
                      }`}
                    >
                      Imperial
                    </button>
                    <button
                      onClick={() => setUnit("metric")}
                      className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                        unit === "metric" ? "bg-white shadow text-blue-600" : "text-slate-600"
                      }`}
                    >
                      Metric
                    </button>
                  </div>
                </div>

                {/* Age */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Age</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        type="text"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value) || 0)}
                        className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                      <span className="text-slate-500 ml-1">years</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="80"
                    step="1"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>15</span>
                    <span>80</span>
                  </div>
                </div>

                {/* Gender */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">Gender</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setGender("male")}
                      className={`py-3 rounded-xl font-medium transition-all ${
                        gender === "male"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      👨 Male
                    </button>
                    <button
                      onClick={() => setGender("female")}
                      className={`py-3 rounded-xl font-medium transition-all ${
                        gender === "female"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      👩 Female
                    </button>
                  </div>
                </div>

                {/* Height */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Height</label>
                    {unit === "imperial" ? (
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                          <input
                            type="text"
                            value={heightFt}
                            onChange={(e) => setHeightFt(Number(e.target.value) || 0)}
                            className="w-8 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                          />
                          <span className="text-slate-500 ml-1">ft</span>
                        </div>
                        <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                          <input
                            type="text"
                            value={heightIn}
                            onChange={(e) => setHeightIn(Number(e.target.value) || 0)}
                            className="w-8 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                          />
                          <span className="text-slate-500 ml-1">in</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                        <input
                          type="text"
                          value={heightCm}
                          onChange={(e) => setHeightCm(Number(e.target.value) || 0)}
                          className="w-16 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                        />
                        <span className="text-slate-500 ml-1">cm</span>
                      </div>
                    )}
                  </div>
                  {unit === "imperial" ? (
                    <input
                      type="range"
                      min="48"
                      max="84"
                      step="1"
                      value={heightFt * 12 + heightIn}
                      onChange={(e) => {
                        const totalIn = Number(e.target.value);
                        setHeightFt(Math.floor(totalIn / 12));
                        setHeightIn(totalIn % 12);
                      }}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  ) : (
                    <input
                      type="range"
                      min="120"
                      max="220"
                      step="1"
                      value={heightCm}
                      onChange={(e) => setHeightCm(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  )}
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>{unit === "imperial" ? "4'0\"" : "120 cm"}</span>
                    <span>{unit === "imperial" ? "7'0\"" : "220 cm"}</span>
                  </div>
                </div>

                {/* Weight */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Weight</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        type="text"
                        value={unit === "imperial" ? weight : weightKg}
                        onChange={(e) => unit === "imperial" 
                          ? setWeight(Number(e.target.value) || 0)
                          : setWeightKg(Number(e.target.value) || 0)
                        }
                        className="w-16 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                      <span className="text-slate-500 ml-1">{unit === "imperial" ? "lbs" : "kg"}</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={unit === "imperial" ? 80 : 35}
                    max={unit === "imperial" ? 400 : 180}
                    step="1"
                    value={unit === "imperial" ? weight : weightKg}
                    onChange={(e) => unit === "imperial" 
                      ? setWeight(Number(e.target.value))
                      : setWeightKg(Number(e.target.value))
                    }
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>{unit === "imperial" ? "80 lbs" : "35 kg"}</span>
                    <span>{unit === "imperial" ? "400 lbs" : "180 kg"}</span>
                  </div>
                </div>

                {/* Activity Level */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">Activity Level</label>
                  <div className="space-y-2">
                    {activityLevels.map((level) => (
                      <button
                        key={level.value}
                        onClick={() => setActivityLevel(level.value)}
                        className={`w-full p-3 rounded-xl text-left transition-all ${
                          activityLevel === level.value
                            ? "bg-blue-600 text-white"
                            : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <span className="font-medium">{level.label}</span>
                        <span className={`block text-sm ${activityLevel === level.value ? "text-blue-100" : "text-slate-500"}`}>
                          {level.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Advanced Options Toggle */}
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full flex items-center justify-between py-3 px-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <span className="flex items-center gap-2 font-medium text-slate-700">
                    <span className="w-6 h-6 bg-slate-200 rounded flex items-center justify-center text-xs">⚙️</span>
                    Goal & Body Fat (Optional)
                  </span>
                  <svg className={`w-5 h-5 text-slate-400 transition-transform ${showAdvanced ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showAdvanced && (
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl space-y-4">
                    {/* Goal */}
                    <div>
                      <label className="font-medium text-slate-700 text-sm block mb-2">Your Goal</label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => setGoal("lose")}
                          className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                            goal === "lose"
                              ? "bg-blue-600 text-white"
                              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          📉 Lose
                        </button>
                        <button
                          onClick={() => setGoal("maintain")}
                          className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                            goal === "maintain"
                              ? "bg-blue-600 text-white"
                              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          ⚖️ Maintain
                        </button>
                        <button
                          onClick={() => setGoal("gain")}
                          className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                            goal === "gain"
                              ? "bg-blue-600 text-white"
                              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          📈 Gain
                        </button>
                      </div>
                    </div>

                    {/* Rate of change */}
                    {goal !== "maintain" && (
                      <div>
                        <label className="font-medium text-slate-700 text-sm block mb-2">
                          Rate: {rate} {unit === "imperial" ? "lbs" : "kg"}/week
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {[0.25, 0.5, 0.75, 1].map((r) => (
                            <button
                              key={r}
                              onClick={() => setRate(r)}
                              className={`py-2 rounded-lg text-sm font-medium transition-all ${
                                rate === r
                                  ? "bg-blue-600 text-white"
                                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                              }`}
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Body Fat */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="font-medium text-slate-700 text-sm">Body Fat % (optional)</label>
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={useBodyFat}
                            onChange={(e) => setUseBodyFat(e.target.checked)}
                            className="w-4 h-4 rounded text-blue-600"
                          />
                          Use
                        </label>
                      </div>
                      <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                        <input
                          type="text"
                          value={bodyFat}
                          onChange={(e) => setBodyFat(Number(e.target.value) || 0)}
                          disabled={!useBodyFat}
                          className={`w-full bg-transparent text-right font-bold focus:outline-none ${useBodyFat ? "text-blue-600" : "text-slate-400"}`}
                        />
                        <span className="text-slate-500 ml-1">%</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Uses Katch-McArdle formula for more accuracy</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Results */}
              <div>
                {/* Results Card */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  <p className="text-sm text-slate-500 mb-1">Daily Calorie Target</p>
                  <p className="text-5xl md:text-6xl font-bold text-blue-600 mb-2">{targetCalories.toLocaleString()}</p>
                  <p className="text-slate-500 mb-6">calories/day to {goal === "lose" ? "lose" : goal === "gain" ? "gain" : "maintain"} weight</p>

                  {/* BMR & TDEE */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-500">BMR</p>
                      <p className="text-xl font-bold text-slate-800">{bmr.toLocaleString()}</p>
                      <p className="text-xs text-slate-400">Basal Metabolic Rate</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-500">TDEE</p>
                      <p className="text-xl font-bold text-slate-800">{tdee.toLocaleString()}</p>
                      <p className="text-xs text-slate-400">Maintenance Calories</p>
                    </div>
                  </div>

                  {/* Macros Breakdown */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-slate-900 mb-3">Macronutrient Breakdown</h3>
                    <div className="h-6 rounded-full overflow-hidden flex mb-3">
                      <div className="bg-red-400 transition-all" style={{ width: `${proteinPct}%` }} />
                      <div className="bg-blue-400 transition-all" style={{ width: `${carbsPct}%` }} />
                      <div className="bg-yellow-400 transition-all" style={{ width: `${fatPct}%` }} />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <span className="w-3 h-3 rounded bg-red-400"></span>
                          <span className="text-xs text-slate-500">Protein</span>
                        </div>
                        <p className="text-lg font-bold text-slate-800">{protein}g</p>
                        <p className="text-xs text-slate-400">{protein * 4} cal ({proteinPct}%)</p>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <span className="w-3 h-3 rounded bg-blue-400"></span>
                          <span className="text-xs text-slate-500">Carbs</span>
                        </div>
                        <p className="text-lg font-bold text-slate-800">{carbs}g</p>
                        <p className="text-xs text-slate-400">{carbs * 4} cal ({carbsPct}%)</p>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <span className="w-3 h-3 rounded bg-yellow-400"></span>
                          <span className="text-xs text-slate-500">Fat</span>
                        </div>
                        <p className="text-lg font-bold text-slate-800">{fat}g</p>
                        <p className="text-xs text-slate-400">{fat * 9} cal ({fatPct}%)</p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-500">Your BMI</p>
                      <p className="text-sm font-bold text-slate-800">{bmi.toFixed(1)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-500">Time to Goal</p>
                      <p className="text-sm font-bold text-slate-800">{goal === "maintain" ? "—" : `~${weeksToGoal} weeks`}</p>
                    </div>
                  </div>
                </div>

                {/* View Comparison Button */}
                <button
                  onClick={() => setShowTableModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 font-medium mb-4"
                >
                  📊 View All Calorie Targets
                </button>

                {/* Export Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">
                    📄 PDF <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">PRO</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">
                    📊 Excel <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">PRO</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Educational Content with Sidebar */}
        <section className="py-12 bg-slate-50">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* What are Calories */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📖 Understanding Your Calorie Needs</h2>
                  <p className="text-slate-600 mb-4">
                    Calories are units of energy. Your body needs a certain amount of energy (calories) each day to function—this includes everything from breathing and thinking to walking and exercising. Understanding your calorie needs is the foundation of weight management.
                  </p>
                  <p className="text-slate-600">
                    This calculator uses the Mifflin-St Jeor equation, which research shows is the most accurate for estimating calorie needs. If you know your body fat percentage, the Katch-McArdle formula provides even more precision by accounting for your lean body mass.
                  </p>
                </div>

                {/* Formula */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📐 The Formula</h2>
                  <div className="space-y-4 mb-6">
                    <div className="bg-slate-100 rounded-xl p-4">
                      <p className="text-sm text-slate-500 mb-2">Mifflin-St Jeor (Men)</p>
                      <p className="font-mono font-bold text-slate-800">BMR = (10 × weight kg) + (6.25 × height cm) - (5 × age) + 5</p>
                    </div>
                    <div className="bg-slate-100 rounded-xl p-4">
                      <p className="text-sm text-slate-500 mb-2">Mifflin-St Jeor (Women)</p>
                      <p className="font-mono font-bold text-slate-800">BMR = (10 × weight kg) + (6.25 × height cm) - (5 × age) - 161</p>
                    </div>
                    <div className="bg-slate-100 rounded-xl p-4">
                      <p className="text-sm text-slate-500 mb-2">TDEE</p>
                      <p className="font-mono font-bold text-slate-800">TDEE = BMR × Activity Multiplier</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Your BMR:</strong> {bmr.toLocaleString()} cal × <strong>{activityLevel}</strong> (activity) = <strong>{tdee.toLocaleString()} TDEE</strong>
                    </p>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 Tips for Your Goal</h2>
                  <div className="space-y-4">
                    {goal === "lose" ? (
                      <>
                        <div className="flex gap-4"><span className="text-2xl">🥗</span><div><h3 className="font-semibold text-slate-900">Prioritize Protein</h3><p className="text-slate-600">Protein keeps you full and preserves muscle during weight loss.</p></div></div>
                        <div className="flex gap-4"><span className="text-2xl">📝</span><div><h3 className="font-semibold text-slate-900">Track Your Food</h3><p className="text-slate-600">Use an app to accurately count calories - most people underestimate.</p></div></div>
                        <div className="flex gap-4"><span className="text-2xl">🚶</span><div><h3 className="font-semibold text-slate-900">Increase Activity</h3><p className="text-slate-600">More movement = bigger deficit without eating less.</p></div></div>
                        <div className="flex gap-4"><span className="text-2xl">⏰</span><div><h3 className="font-semibold text-slate-900">Be Patient</h3><p className="text-slate-600">Sustainable loss is 0.5-1 lb/week. Faster isn't better.</p></div></div>
                      </>
                    ) : goal === "gain" ? (
                      <>
                        <div className="flex gap-4"><span className="text-2xl">💪</span><div><h3 className="font-semibold text-slate-900">Strength Train</h3><p className="text-slate-600">Extra calories become muscle only if you train for it.</p></div></div>
                        <div className="flex gap-4"><span className="text-2xl">🍗</span><div><h3 className="font-semibold text-slate-900">Eat Enough Protein</h3><p className="text-slate-600">Aim for 1.6-2.2g per kg bodyweight for muscle building.</p></div></div>
                        <div className="flex gap-4"><span className="text-2xl">🍚</span><div><h3 className="font-semibold text-slate-900">Don't Fear Carbs</h3><p className="text-slate-600">Carbs fuel workouts and recovery. Embrace them.</p></div></div>
                        <div className="flex gap-4"><span className="text-2xl">🔄</span><div><h3 className="font-semibold text-slate-900">Progressive Overload</h3><p className="text-slate-600">Gradually increase weights to stimulate muscle growth.</p></div></div>
                      </>
                    ) : (
                      <>
                        <div className="flex gap-4"><span className="text-2xl">⚖️</span><div><h3 className="font-semibold text-slate-900">Monitor Weekly</h3><p className="text-slate-600">Weigh yourself weekly to catch any unwanted trends early.</p></div></div>
                        <div className="flex gap-4"><span className="text-2xl">🔄</span><div><h3 className="font-semibold text-slate-900">Stay Flexible</h3><p className="text-slate-600">Some days over, some under - weekly average matters most.</p></div></div>
                        <div className="flex gap-4"><span className="text-2xl">🏃</span><div><h3 className="font-semibold text-slate-900">Stay Active</h3><p className="text-slate-600">Regular exercise makes maintenance easier and healthier.</p></div></div>
                        <div className="flex gap-4"><span className="text-2xl">🧠</span><div><h3 className="font-semibold text-slate-900">Build Habits</h3><p className="text-slate-600">Focus on sustainable eating patterns, not restriction.</p></div></div>
                      </>
                    )}
                  </div>
                </div>

                {/* FAQ */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">❓ Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <details key={index} className="group">
                        <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-slate-50 rounded-xl hover:bg-slate-100">
                          <span className="font-semibold text-slate-900">{faq.question}</span>
                          <svg className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                {/* Ad Block 1 */}
                <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-6 text-center">
                  <p className="text-slate-400 text-sm mb-2">Advertisement</p>
                  <div className="bg-slate-100 rounded-xl h-60 flex items-center justify-center text-slate-400">
                    📢 Ad Space
                  </div>
                </div>

                {/* Categories Block */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">💰</span>
                    Financial Calculators
                  </h3>
                  <div className="space-y-2">
                    {financeCalcs.map((calc) => (
                      <Link
                        key={calc}
                        href={`/en/${calc.toLowerCase().replace(/ /g, "-")}-calculator`}
                        className="block text-blue-600 hover:text-blue-800 hover:underline text-sm"
                      >
                        {calc}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Health Categories */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-sm">💪</span>
                    Health Calculators
                  </h3>
                  <div className="space-y-2">
                    {healthCalcs.map((calc) => (
                      <Link
                        key={calc}
                        href={`/en/${calc.toLowerCase().replace(/ /g, "-")}-calculator`}
                        className="block text-blue-600 hover:text-blue-800 hover:underline text-sm"
                      >
                        {calc}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Ad Block 2 */}
                <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-6 text-center">
                  <p className="text-slate-400 text-sm mb-2">Advertisement</p>
                  <div className="bg-slate-100 rounded-xl h-60 flex items-center justify-center text-slate-400">
                    📢 Ad Space
                  </div>
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
