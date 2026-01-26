"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function BMICalculator() {
  // Calculator state
  const [unit, setUnit] = useState<"imperial" | "metric">("imperial");
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(10);
  const [heightCm, setHeightCm] = useState(178);
  const [weight, setWeight] = useState(170);
  const [weightKg, setWeightKg] = useState(77);
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [waist, setWaist] = useState(34);
  const [waistCm, setWaistCm] = useState(86);
  const [showTableModal, setShowTableModal] = useState(false);

  // Results
  const [bmi, setBmi] = useState(0);
  const [bmiCategory, setBmiCategory] = useState("");
  const [bmiColor, setBmiColor] = useState("");
  const [healthyWeightMin, setHealthyWeightMin] = useState(0);
  const [healthyWeightMax, setHealthyWeightMax] = useState(0);
  const [bmiPrime, setBmiPrime] = useState(0);
  const [weightToHealthy, setWeightToHealthy] = useState(0);
  const [waistRisk, setWaistRisk] = useState("");

  // Calculate
  useEffect(() => {
    let heightM: number;
    let weightKgVal: number;
    let waistInches: number;

    if (unit === "imperial") {
      heightM = ((heightFt * 12) + heightIn) * 0.0254;
      weightKgVal = weight * 0.453592;
      waistInches = waist;
    } else {
      heightM = heightCm / 100;
      weightKgVal = weightKg;
      waistInches = waistCm / 2.54;
    }

    // BMI calculation
    const calculatedBmi = weightKgVal / (heightM * heightM);
    setBmi(calculatedBmi);

    // BMI Prime (ratio to 25)
    setBmiPrime(calculatedBmi / 25);

    // Category
    let category = "";
    let color = "";
    if (calculatedBmi < 18.5) {
      category = "Underweight";
      color = "text-blue-500";
    } else if (calculatedBmi < 25) {
      category = "Normal";
      color = "text-green-500";
    } else if (calculatedBmi < 30) {
      category = "Overweight";
      color = "text-yellow-500";
    } else if (calculatedBmi < 35) {
      category = "Obese (Class I)";
      color = "text-orange-500";
    } else if (calculatedBmi < 40) {
      category = "Obese (Class II)";
      color = "text-red-500";
    } else {
      category = "Obese (Class III)";
      color = "text-red-700";
    }
    setBmiCategory(category);
    setBmiColor(color);

    // Healthy weight range
    const minWeight = 18.5 * heightM * heightM;
    const maxWeight = 24.9 * heightM * heightM;
    if (unit === "imperial") {
      setHealthyWeightMin(Math.round(minWeight / 0.453592));
      setHealthyWeightMax(Math.round(maxWeight / 0.453592));
    } else {
      setHealthyWeightMin(Math.round(minWeight));
      setHealthyWeightMax(Math.round(maxWeight));
    }

    // Weight to healthy
    if (calculatedBmi > 24.9) {
      const targetWeight = 24.9 * heightM * heightM;
      const diff = weightKgVal - targetWeight;
      setWeightToHealthy(unit === "imperial" ? Math.round(diff / 0.453592) : Math.round(diff));
    } else if (calculatedBmi < 18.5) {
      const targetWeight = 18.5 * heightM * heightM;
      const diff = targetWeight - weightKgVal;
      setWeightToHealthy(unit === "imperial" ? -Math.round(diff / 0.453592) : -Math.round(diff));
    } else {
      setWeightToHealthy(0);
    }

    // Waist risk assessment
    const waistThreshold = gender === "male" ? 40 : 35;
    if (waistInches > waistThreshold) {
      setWaistRisk("High risk - waist circumference indicates increased health risks");
    } else if (waistInches > waistThreshold - 5) {
      setWaistRisk("Moderate risk - approaching unhealthy waist size");
    } else {
      setWaistRisk("Low risk - healthy waist circumference");
    }
  }, [unit, heightFt, heightIn, heightCm, weight, weightKg, age, gender, waist, waistCm]);

  const formatWeight = (val: number) => {
    return unit === "imperial" ? `${val} lbs` : `${val} kg`;
  };

  // BMI categories for table
  const bmiCategories = [
    { category: "Severe Underweight", range: "< 16", color: "bg-blue-700" },
    { category: "Underweight", range: "16 - 18.4", color: "bg-blue-400" },
    { category: "Normal", range: "18.5 - 24.9", color: "bg-green-500" },
    { category: "Overweight", range: "25 - 29.9", color: "bg-yellow-400" },
    { category: "Obese Class I", range: "30 - 34.9", color: "bg-orange-500" },
    { category: "Obese Class II", range: "35 - 39.9", color: "bg-red-500" },
    { category: "Obese Class III", range: "≥ 40", color: "bg-red-700" },
  ];

  // FAQ data
  const faqs = [
    { question: "What is a healthy BMI range?", answer: "A BMI between 18.5 and 24.9 is considered healthy for most adults. However, BMI doesn't account for muscle mass, bone density, or fat distribution, so it's best used alongside other health measures." },
    { question: "Is BMI accurate for athletes?", answer: "BMI may overestimate body fat in athletes and others with muscular builds, as it doesn't distinguish between muscle and fat. Athletes may show as 'overweight' despite having low body fat." },
    { question: "Does BMI change with age?", answer: "BMI calculations don't change with age, but health risks associated with different BMI levels may vary. Older adults may have slightly higher healthy BMI ranges. Consult your doctor for personalized guidance." },
    { question: "What's better - BMI or body fat percentage?", answer: "Body fat percentage is more accurate for assessing health, but BMI is simpler to calculate. For most people, BMI is a good starting point, but athletes or those with unusual body compositions should consider body fat testing." },
    { question: "How often should I check my BMI?", answer: "Checking BMI monthly is sufficient for most people tracking weight changes. More important is monitoring trends over time rather than daily fluctuations." }
  ];

  // Categories
  const financeCalcs = [
    "Compound Interest", "Mortgage", "Loan", "Auto Loan", "Interest", "Payment", 
    "Retirement", "Investment", "Inflation", "Salary", "Income Tax", "401K"
  ];
  const healthCalcs = [
    "Calorie", "Body Fat", "BMR", "Macro", "TDEE", "Protein", "Ideal Weight", "Pregnancy"
  ];

  // Calculate scale position (0-100%)
  const getScalePosition = () => {
    if (bmi < 15) return 0;
    if (bmi > 45) return 100;
    return ((bmi - 15) / 30) * 100;
  };

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

      {/* Weight Table Modal */}
      {showTableModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">BMI Categories & Weight Ranges</h3>
              <button onClick={() => setShowTableModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="overflow-auto max-h-[50vh] p-4">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Category</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase">BMI Range</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Weight Range (Your Height)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bmiCategories.map((cat, i) => {
                    const heightM = unit === "imperial" 
                      ? ((heightFt * 12) + heightIn) * 0.0254 
                      : heightCm / 100;
                    
                    let minW = 0, maxW = 0;
                    if (cat.range.includes("<")) {
                      maxW = 16 * heightM * heightM;
                      minW = 0;
                    } else if (cat.range.includes("≥")) {
                      minW = 40 * heightM * heightM;
                      maxW = 999;
                    } else {
                      const [min, max] = cat.range.split(" - ").map(Number);
                      minW = min * heightM * heightM;
                      maxW = max * heightM * heightM;
                    }
                    
                    if (unit === "imperial") {
                      minW = minW / 0.453592;
                      maxW = maxW / 0.453592;
                    }
                    
                    const weightRange = maxW === 999 
                      ? `> ${Math.round(minW)} ${unit === "imperial" ? "lbs" : "kg"}`
                      : minW === 0
                      ? `< ${Math.round(maxW)} ${unit === "imperial" ? "lbs" : "kg"}`
                      : `${Math.round(minW)} - ${Math.round(maxW)} ${unit === "imperial" ? "lbs" : "kg"}`;
                    
                    const isCurrentCategory = bmiCategory.includes(cat.category.split(" ")[0]);
                    
                    return (
                      <tr key={i} className={isCurrentCategory ? "bg-blue-50" : ""}>
                        <td className="px-4 py-3 flex items-center gap-2">
                          <span className={`w-3 h-3 rounded ${cat.color}`}></span>
                          <span className={isCurrentCategory ? "font-semibold" : ""}>{cat.category}</span>
                        </td>
                        <td className="px-4 py-3 text-center">{cat.range}</td>
                        <td className="px-4 py-3 text-right font-medium">{weightRange}</td>
                      </tr>
                    );
                  })}
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
              <span className="text-slate-700">BMI</span>
            </nav>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">⚖️</div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">BMI Calculator</h1>
                <p className="text-slate-600">Calculate your Body Mass Index</p>
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
                  <h2 className="text-xl font-bold text-slate-900">Your Measurements</h2>
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
                    min="18"
                    max="100"
                    step="1"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>18</span>
                    <span>100</span>
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

                {/* Advanced Options Toggle */}
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full flex items-center justify-between py-3 px-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <span className="flex items-center gap-2 font-medium text-slate-700">
                    <span className="w-6 h-6 bg-slate-200 rounded flex items-center justify-center text-xs">⚙️</span>
                    Waist Measurement (Optional)
                  </span>
                  <svg className={`w-5 h-5 text-slate-400 transition-transform ${showAdvanced ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showAdvanced && (
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl">
                    <div>
                      <label className="font-medium text-slate-700 text-sm block mb-2">Waist Circumference</label>
                      <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                        <input
                          type="text"
                          value={unit === "imperial" ? waist : waistCm}
                          onChange={(e) => unit === "imperial"
                            ? setWaist(Number(e.target.value) || 0)
                            : setWaistCm(Number(e.target.value) || 0)
                          }
                          className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                        />
                        <span className="text-slate-500 ml-1">{unit === "imperial" ? "in" : "cm"}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Measure at navel level for better health assessment</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Results */}
              <div>
                {/* Results Card */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  <p className="text-sm text-slate-500 mb-1">Your BMI</p>
                  <p className={`text-5xl md:text-6xl font-bold mb-2 ${bmiColor}`}>{bmi.toFixed(1)}</p>
                  <p className={`text-xl font-semibold mb-6 ${bmiColor}`}>{bmiCategory}</p>

                  {/* BMI Scale Visual */}
                  <div className="mb-6">
                    <div className="relative h-6 rounded-full overflow-hidden flex mb-2">
                      <div className="w-[12%] bg-blue-400"></div>
                      <div className="w-[21%] bg-green-500"></div>
                      <div className="w-[17%] bg-yellow-400"></div>
                      <div className="w-[17%] bg-orange-500"></div>
                      <div className="w-[17%] bg-red-500"></div>
                      <div className="w-[16%] bg-red-700"></div>
                      {/* Indicator */}
                      <div 
                        className="absolute top-0 w-1 h-full bg-slate-900 rounded"
                        style={{ left: `${getScalePosition()}%`, transform: "translateX(-50%)" }}
                      >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          {bmi.toFixed(1)}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>15</span>
                      <span>18.5</span>
                      <span>25</span>
                      <span>30</span>
                      <span>35</span>
                      <span>40</span>
                      <span>45</span>
                    </div>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-500">Healthy Weight Range</p>
                      <p className="text-lg font-bold text-green-600">
                        {formatWeight(healthyWeightMin)} - {formatWeight(healthyWeightMax)}
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-500">BMI Prime</p>
                      <p className="text-lg font-bold text-slate-800">{bmiPrime.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Weight to Healthy */}
                  {weightToHealthy !== 0 && (
                    <div className={`rounded-xl p-4 mb-6 ${weightToHealthy > 0 ? "bg-orange-50 border border-orange-200" : "bg-blue-50 border border-blue-200"}`}>
                      <p className={`text-sm ${weightToHealthy > 0 ? "text-orange-800" : "text-blue-800"}`}>
                        {weightToHealthy > 0 
                          ? `📉 Lose ${formatWeight(weightToHealthy)} to reach a healthy BMI`
                          : `📈 Gain ${formatWeight(Math.abs(weightToHealthy))} to reach a healthy BMI`
                        }
                      </p>
                    </div>
                  )}

                  {/* Waist Risk (if advanced) */}
                  {showAdvanced && (
                    <div className={`rounded-xl p-4 mb-6 ${
                      waistRisk.includes("High") ? "bg-red-50 border border-red-200" :
                      waistRisk.includes("Moderate") ? "bg-yellow-50 border border-yellow-200" :
                      "bg-green-50 border border-green-200"
                    }`}>
                      <p className="text-sm font-medium mb-1">Waist Assessment</p>
                      <p className={`text-sm ${
                        waistRisk.includes("High") ? "text-red-700" :
                        waistRisk.includes("Moderate") ? "text-yellow-700" :
                        "text-green-700"
                      }`}>{waistRisk}</p>
                    </div>
                  )}
                </div>

                {/* View Table Button */}
                <button
                  onClick={() => setShowTableModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 font-medium mb-4"
                >
                  📊 View Weight Categories Table
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
                {/* What is BMI */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📖 What is BMI?</h2>
                  <p className="text-slate-600 mb-4">
                    Body Mass Index (BMI) is a simple calculation using height and weight that estimates body fat. It's widely used as a screening tool to identify potential weight problems in adults. BMI doesn't measure body fat directly, but research shows it correlates with more direct measures of body fat.
                  </p>
                  <p className="text-slate-600">
                    While BMI is useful for most people, it has limitations. It may overestimate body fat in athletes with high muscle mass and underestimate it in older adults who have lost muscle. For a complete health assessment, consider BMI alongside other measures like waist circumference and body fat percentage.
                  </p>
                </div>

                {/* Formula */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📐 The Formula</h2>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-100 rounded-xl p-4 text-center">
                      <p className="text-sm text-slate-500 mb-2">Metric</p>
                      <p className="text-lg font-mono font-bold text-slate-800">BMI = kg / m²</p>
                    </div>
                    <div className="bg-slate-100 rounded-xl p-4 text-center">
                      <p className="text-sm text-slate-500 mb-2">Imperial</p>
                      <p className="text-lg font-mono font-bold text-slate-800">BMI = (lbs / in²) × 703</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Your calculation:</strong> {unit === "imperial" 
                        ? `${weight} lbs ÷ (${heightFt * 12 + heightIn} in)² × 703 = ${bmi.toFixed(1)}`
                        : `${weightKg} kg ÷ (${(heightCm/100).toFixed(2)} m)² = ${bmi.toFixed(1)}`
                      }
                    </p>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 Health Tips Based on Your BMI</h2>
                  <div className="space-y-4">
                    {bmi < 18.5 ? (
                      <>
                        <div className="flex gap-4"><span className="text-2xl">🍽️</span><div><h3 className="font-semibold text-slate-900">Increase Calorie Intake</h3><p className="text-slate-600">Focus on nutrient-dense foods, not empty calories.</p></div></div>
                        <div className="flex gap-4"><span className="text-2xl">💪</span><div><h3 className="font-semibold text-slate-900">Build Muscle</h3><p className="text-slate-600">Strength training can help add healthy weight.</p></div></div>
                        <div className="flex gap-4"><span className="text-2xl">🥗</span><div><h3 className="font-semibold text-slate-900">Eat More Protein</h3><p className="text-slate-600">Protein supports muscle growth and weight gain.</p></div></div>
                        <div className="flex gap-4"><span className="text-2xl">👩‍⚕️</span><div><h3 className="font-semibold text-slate-900">Consult a Doctor</h3><p className="text-slate-600">Rule out underlying health issues causing low weight.</p></div></div>
                      </>
                    ) : bmi < 25 ? (
                      <>
                        <div className="flex gap-4"><span className="text-2xl">✅</span><div><h3 className="font-semibold text-slate-900">Maintain Your Weight</h3><p className="text-slate-600">You're in a healthy range - keep up the good work!</p></div></div>
                        <div className="flex gap-4"><span className="text-2xl">🏃</span><div><h3 className="font-semibold text-slate-900">Stay Active</h3><p className="text-slate-600">Regular exercise maintains health and energy.</p></div></div>
                        <div className="flex gap-4"><span className="text-2xl">🥦</span><div><h3 className="font-semibold text-slate-900">Balanced Diet</h3><p className="text-slate-600">Continue eating nutritious foods for overall health.</p></div></div>
                        <div className="flex gap-4"><span className="text-2xl">😴</span><div><h3 className="font-semibold text-slate-900">Prioritize Sleep</h3><p className="text-slate-600">Good sleep supports healthy weight maintenance.</p></div></div>
                      </>
                    ) : (
                      <>
                        <div className="flex gap-4"><span className="text-2xl">🍎</span><div><h3 className="font-semibold text-slate-900">Create a Calorie Deficit</h3><p className="text-slate-600">Eat slightly fewer calories than you burn.</p></div></div>
                        <div className="flex gap-4"><span className="text-2xl">🏋️</span><div><h3 className="font-semibold text-slate-900">Increase Physical Activity</h3><p className="text-slate-600">Aim for 150+ minutes of exercise per week.</p></div></div>
                        <div className="flex gap-4"><span className="text-2xl">🚫</span><div><h3 className="font-semibold text-slate-900">Limit Processed Foods</h3><p className="text-slate-600">Cut back on sugar, refined carbs, and fast food.</p></div></div>
                        <div className="flex gap-4"><span className="text-2xl">📊</span><div><h3 className="font-semibold text-slate-900">Track Your Progress</h3><p className="text-slate-600">Monitor weight and measurements regularly.</p></div></div>
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
