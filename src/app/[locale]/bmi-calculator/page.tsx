"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import AdBlock from "@/components/ads/AdBlock";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

const CALCULATOR_SLUG = "bmi-calculator";
const CALCULATOR_NAME = "BMI Calculator";
const CALCULATOR_CATEGORY = "health";

export default function BMICalculator() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

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
  const [hip, setHip] = useState(40);
  const [hipCm, setHipCm] = useState(102);
  const [showTableModal, setShowTableModal] = useState(false);

  // Results
  const [bmi, setBmi] = useState(0);
  const [bmiCategory, setBmiCategory] = useState("");
  const [bmiColor, setBmiColor] = useState("");
  const [healthyWeightMin, setHealthyWeightMin] = useState(0);
  const [healthyWeightMax, setHealthyWeightMax] = useState(0);
  const [bmiPrime, setBmiPrime] = useState(0);
  const [ponderalIndex, setPonderalIndex] = useState(0);
  const [weightToHealthy, setWeightToHealthy] = useState(0);
  const [waistRisk, setWaistRisk] = useState("");
  const [waistToHipRatio, setWaistToHipRatio] = useState(0);
  const [whrRisk, setWhrRisk] = useState("");
  const [waistToHeightRatio, setWaistToHeightRatio] = useState(0);
  const [whtRisk, setWhtRisk] = useState("");

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
      const res = await fetch("/api/history", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, calculatorName: CALCULATOR_NAME, inputs: { unit, height: unit === 'imperial' ? `${heightFt}'${heightIn}"` : `${heightCm}cm`, weight: unit === 'imperial' ? `${weight} lbs` : `${weightKg} kg`, age, gender }, results: { bmi: bmi.toFixed(1), category: bmiCategory, healthyRange: `${healthyWeightMin} - ${healthyWeightMax}` } }) });
      if (res.ok) { setSaveStatus('saved'); setTimeout(() => setSaveStatus('idle'), 2000); } else { setSaveStatus('error'); }
    } catch { setSaveStatus('error'); }
  };

  const handleInputChange = (setter: (value: any) => void, value: any) => { setter(value); trackCalculation(); };
  const SaveIndicator = () => { if (saveStatus === 'idle') return null; if (saveStatus === 'saving') return <span className="text-xs text-slate-400">{t("calculator.saving.saving", "Saving...")}</span>; if (saveStatus === 'saved') return <span className="text-xs text-green-500">✓ {t("calculator.saving.saved", "Saved")}</span>; return <span className="text-xs text-red-500">{t("calculator.saving.error", "Error")}</span>; };

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

  // Calculate
  useEffect(() => {
    let heightM: number;
    let weightKgVal: number;
    let waistInches: number;
    let hipInches: number;
    let heightInches: number;

    if (unit === "imperial") {
      heightInches = (heightFt * 12) + heightIn;
      heightM = heightInches * 0.0254;
      weightKgVal = weight * 0.453592;
      waistInches = waist;
      hipInches = hip;
    } else {
      heightM = heightCm / 100;
      heightInches = heightCm / 2.54;
      weightKgVal = weightKg;
      waistInches = waistCm / 2.54;
      hipInches = hipCm / 2.54;
    }

    // BMI Calculation
    const calculatedBmi = weightKgVal / (heightM * heightM);
    setBmi(calculatedBmi);
    setBmiPrime(calculatedBmi / 25);
    
    // Ponderal Index (kg/m³) - More accurate for tall/short people
    const pi = weightKgVal / (heightM * heightM * heightM);
    setPonderalIndex(pi);

    // BMI Category
    let category = "";
    let color = "";
    if (calculatedBmi < 16) {
      category = t("calculator.categories.severeThinness", "Severe Thinness");
      color = "text-blue-700";
    } else if (calculatedBmi < 17) {
      category = t("calculator.categories.moderateThinness", "Moderate Thinness");
      color = "text-blue-500";
    } else if (calculatedBmi < 18.5) {
      category = t("calculator.categories.mildThinness", "Mild Thinness");
      color = "text-blue-400";
    } else if (calculatedBmi < 25) {
      category = t("calculator.categories.normal", "Normal");
      color = "text-green-500";
    } else if (calculatedBmi < 30) {
      category = t("calculator.categories.overweight", "Overweight");
      color = "text-yellow-500";
    } else if (calculatedBmi < 35) {
      category = t("calculator.categories.obeseI", "Obese Class I");
      color = "text-orange-500";
    } else if (calculatedBmi < 40) {
      category = t("calculator.categories.obeseII", "Obese Class II");
      color = "text-red-500";
    } else {
      category = t("calculator.categories.obeseIII", "Obese Class III");
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

    // Waist circumference risk
    const waistThreshold = gender === "male" ? 40 : 35;
    if (waistInches > waistThreshold) {
      setWaistRisk(t("calculator.risk.high", "High"));
    } else if (waistInches > waistThreshold - 5) {
      setWaistRisk(t("calculator.risk.moderate", "Moderate"));
    } else {
      setWaistRisk(t("calculator.risk.low", "Low"));
    }

    // Waist-to-Hip Ratio (WHR)
    const whr = waistInches / hipInches;
    setWaistToHipRatio(whr);
    
    if (gender === "male") {
      if (whr < 0.9) setWhrRisk(t("calculator.risk.low", "Low"));
      else if (whr < 1.0) setWhrRisk(t("calculator.risk.moderate", "Moderate"));
      else setWhrRisk(t("calculator.risk.high", "High"));
    } else {
      if (whr < 0.8) setWhrRisk(t("calculator.risk.low", "Low"));
      else if (whr < 0.85) setWhrRisk(t("calculator.risk.moderate", "Moderate"));
      else setWhrRisk(t("calculator.risk.high", "High"));
    }

    // Waist-to-Height Ratio (WHtR) - NICE guidelines
    const whtr = waistInches / heightInches;
    setWaistToHeightRatio(whtr);
    
    if (whtr < 0.4) setWhtRisk(t("calculator.risk.underweightRisk", "Underweight risk"));
    else if (whtr < 0.5) setWhtRisk(t("calculator.risk.healthy", "Healthy"));
    else if (whtr < 0.6) setWhtRisk(t("calculator.risk.increasedRisk", "Increased risk"));
    else setWhtRisk(t("calculator.risk.highRisk", "High risk"));

  }, [unit, heightFt, heightIn, heightCm, weight, weightKg, age, gender, waist, waistCm, hip, hipCm]);

  const formatWeight = (val: number) => {
    return unit === "imperial" ? `${val} ${t("calculator.units.lbs", "lbs")}` : `${val} ${t("calculator.units.kg", "kg")}`;
  };

  // BMI categories for table (WHO)
  const bmiCategories = [
    { category: t("calculator.categories.severeThinness", "Severe Thinness"), range: "< 16", color: "bg-blue-700" },
    { category: t("calculator.categories.moderateThinness", "Moderate Thinness"), range: "16 - 16.9", color: "bg-blue-500" },
    { category: t("calculator.categories.mildThinness", "Mild Thinness"), range: "17 - 18.4", color: "bg-blue-400" },
    { category: t("calculator.categories.normal", "Normal"), range: "18.5 - 24.9", color: "bg-green-500" },
    { category: t("calculator.categories.overweight", "Overweight"), range: "25 - 29.9", color: "bg-yellow-400" },
    { category: t("calculator.categories.obeseI", "Obese Class I"), range: "30 - 34.9", color: "bg-orange-500" },
    { category: t("calculator.categories.obeseII", "Obese Class II"), range: "35 - 39.9", color: "bg-red-500" },
    { category: t("calculator.categories.obeseIII", "Obese Class III"), range: "≥ 40", color: "bg-red-700" },
  ];

  // WHR Risk Table
  const whrRiskTable = [
    { risk: t("calculator.risk.low", "Low"), male: "< 0.90", female: "< 0.80" },
    { risk: t("calculator.risk.moderate", "Moderate"), male: "0.90 - 0.99", female: "0.80 - 0.84" },
    { risk: t("calculator.risk.high", "High"), male: "≥ 1.00", female: "≥ 0.85" },
  ];

  // FAQ data (with translation support)
  const defaultFaqs = [
    { question: "What is a healthy BMI range?", answer: "A BMI between 18.5 and 24.9 is considered healthy for most adults. However, BMI doesn't account for muscle mass, bone density, or fat distribution, so it's best used alongside other health measures like waist-to-hip ratio." },
    { question: "Is BMI accurate for athletes?", answer: "BMI may overestimate body fat in athletes and others with muscular builds, as it doesn't distinguish between muscle and fat. Athletes may show as 'overweight' despite having low body fat. Consider using the Ponderal Index or body fat measurements instead." },
    { question: "What is the Ponderal Index?", answer: "The Ponderal Index (PI) is similar to BMI but uses height cubed instead of squared. This makes it more accurate for very tall or short individuals. A normal PI range is typically 11-15 kg/m³." },
    { question: "What is Waist-to-Hip Ratio (WHR)?", answer: "WHR compares your waist measurement to your hip measurement. It's a better predictor of cardiovascular risk than BMI alone because it indicates where you store fat. Abdominal fat (apple shape) is more dangerous than hip/thigh fat (pear shape)." },
    { question: "What is Waist-to-Height Ratio?", answer: "WHtR divides your waist by your height. According to NICE guidelines, keeping your waist less than half your height (WHtR < 0.5) is associated with lower health risks regardless of BMI." },
    { question: "Does BMI change with age?", answer: "BMI calculations don't change with age, but health risks associated with different BMI levels may vary. Older adults may have slightly higher healthy BMI ranges due to muscle loss. Consult your doctor for personalized guidance." }
  ];
  const faqs = translations?.faq || defaultFaqs;

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

      {/* BMI Table Modal */}
      {showTableModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">{t("calculator.modal.title", "BMI Categories (WHO)")}</h3>
              <button onClick={() => handleInputChange(setShowTableModal, false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="overflow-auto max-h-[50vh] p-4">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">{t("calculator.modal.category", "Category")}</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">{t("calculator.modal.bmiRange", "BMI Range")}</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">{t("calculator.modal.color", "Color")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bmiCategories.map((cat, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3 font-medium text-slate-900">{cat.category}</td>
                      <td className="px-4 py-3 text-center text-slate-600">{cat.range}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block w-6 h-6 rounded-full ${cat.color}`}></span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-200 flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 rounded-xl hover:bg-slate-200 font-medium text-slate-700">
                📄 {t("calculator.buttons.downloadPdf", "Download PDF")} <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{t("common.pro", "PRO")}</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 rounded-xl hover:bg-slate-200 font-medium text-slate-700">
                📊 {t("calculator.buttons.downloadExcel", "Download Excel")} <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{t("common.pro", "PRO")}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="pt-20">
        {/* HERO SECTION */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-6">
          <div className="container">
            {/* Breadcrumb */}
            <nav className="text-sm mb-4">
              <Link href={`/${locale}`} className="text-slate-600 hover:text-blue-600">{t("common.home", "Home")}</Link>
              <span className="mx-2 text-slate-400">/</span>
              <Link href={`/${locale}/calculators`} className="text-slate-600 hover:text-blue-600">{t("common.calculators", "Calculators")}</Link>
              <span className="mx-2 text-slate-400">/</span>
              <span className="text-slate-700">{t("calculator.breadcrumb", "BMI Calculator")}</span>
            </nav>

            {/* Title with Icon */}
            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">
                💪
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{t("calculator.title", "BMI Calculator")}</h1>
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
                  <p className="text-slate-600">{t("calculator.subtitle", "Calculate your Body Mass Index and health metrics")}</p>
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
                <h2 className="text-xl font-bold text-slate-900 mb-6">{t("calculator.enterDetails", "Enter Your Details")}</h2>
                
                {/* Unit Toggle */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">{t("calculator.inputs.unitSystem", "Unit System")}</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleInputChange(setUnit, "imperial")}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        unit === "imperial"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {t("calculator.inputs.imperial", "Imperial (lb/ft)")}
                    </button>
                    <button
                      onClick={() => handleInputChange(setUnit, "metric")}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        unit === "metric"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {t("calculator.inputs.metric", "Metric (kg/cm)")}
                    </button>
                  </div>
                </div>

                {/* Gender */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">{t("calculator.inputs.gender", "Gender")}</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleInputChange(setGender, "male")}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        gender === "male"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {t("calculator.inputs.male", "Male")}
                    </button>
                    <button
                      onClick={() => handleInputChange(setGender, "female")}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        gender === "female"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {t("calculator.inputs.female", "Female")}
                    </button>
                  </div>
                </div>

                {/* Age */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{t("calculator.inputs.age", "Age")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="font-bold text-blue-600">{age} years</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="100"
                    value={age}
                    onChange={(e) => handleInputChange(setAge, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>18</span>
                    <span>100</span>
                  </div>
                </div>

                {/* Height */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{t("calculator.inputs.height", "Height")}</label>
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
                        min="120"
                        max="220"
                        value={heightCm}
                        onChange={(e) => handleInputChange(setHeightCm, Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="flex justify-between text-xs text-slate-600 mt-1">
                        <span>120 cm</span>
                        <span>220 cm</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Weight */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{t("calculator.inputs.weight", "Weight")}</label>
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

                {/* Advanced Options Toggle */}
                <button
                  onClick={() => handleInputChange(setShowAdvanced, !showAdvanced)}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors mb-4"
                >
                  <span className="flex items-center gap-2 font-medium text-slate-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {t("calculator.advanced.title", "Body Measurements (WHR)")}
                  </span>
                  <svg className={`w-5 h-5 text-slate-600 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Advanced Options Content */}
                {showAdvanced && (
                  <div className="space-y-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    {/* Waist */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="font-medium text-slate-700">Waist Circumference</label>
                        <div className="flex items-center bg-white rounded-lg px-3 py-1 border border-blue-200">
                          <span className="font-bold text-blue-600">
                            {unit === "imperial" ? `${waist} in` : `${waistCm} cm`}
                          </span>
                        </div>
                      </div>
                      {unit === "imperial" ? (
                        <>
                          <input
                            type="range"
                            min="20"
                            max="60"
                            value={waist}
                            onChange={(e) => handleInputChange(setWaist, Number(e.target.value))}
                            className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                          <div className="flex justify-between text-xs text-slate-600 mt-1">
                            <span>20 in</span>
                            <span>60 in</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <input
                            type="range"
                            min="50"
                            max="150"
                            value={waistCm}
                            onChange={(e) => handleInputChange(setWaistCm, Number(e.target.value))}
                            className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                          <div className="flex justify-between text-xs text-slate-600 mt-1">
                            <span>50 cm</span>
                            <span>150 cm</span>
                          </div>
                        </>
                      )}
                      <p className="text-xs text-slate-600 mt-1">Measure at your belly button level</p>
                    </div>

                    {/* Hip */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="font-medium text-slate-700">Hip Circumference</label>
                        <div className="flex items-center bg-white rounded-lg px-3 py-1 border border-blue-200">
                          <span className="font-bold text-blue-600">
                            {unit === "imperial" ? `${hip} in` : `${hipCm} cm`}
                          </span>
                        </div>
                      </div>
                      {unit === "imperial" ? (
                        <>
                          <input
                            type="range"
                            min="28"
                            max="70"
                            value={hip}
                            onChange={(e) => handleInputChange(setHip, Number(e.target.value))}
                            className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                          <div className="flex justify-between text-xs text-slate-600 mt-1">
                            <span>28 in</span>
                            <span>70 in</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <input
                            type="range"
                            min="70"
                            max="180"
                            value={hipCm}
                            onChange={(e) => handleInputChange(setHipCm, Number(e.target.value))}
                            className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                          <div className="flex justify-between text-xs text-slate-600 mt-1">
                            <span>70 cm</span>
                            <span>180 cm</span>
                          </div>
                        </>
                      )}
                      <p className="text-xs text-slate-600 mt-1">Measure at the widest part of your hips</p>
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN - Results */}
              <div>
                {/* Results Card */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  <p className="text-sm text-slate-600 mb-1">{t("calculator.results.yourBmi", "Your BMI")}</p>
                  <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                    {bmi.toFixed(1)}
                  </p>
                  <p className={`text-xl font-semibold ${bmiColor} mb-6`}>{bmiCategory}</p>

                  {/* BMI Scale */}
                  <div className="mb-6">
                    <div className="h-4 rounded-full overflow-hidden flex">
                      <div className="w-[10%] bg-blue-500" title="Underweight"></div>
                      <div className="w-[25%] bg-green-500" title="Normal"></div>
                      <div className="w-[20%] bg-yellow-400" title="Overweight"></div>
                      <div className="w-[15%] bg-orange-500" title="Obese I"></div>
                      <div className="w-[15%] bg-red-500" title="Obese II"></div>
                      <div className="w-[15%] bg-red-700" title="Obese III"></div>
                    </div>
                    <div className="relative h-6">
                      <div 
                        className="absolute w-0 h-0 border-l-[8px] border-r-[8px] border-b-[10px] border-l-transparent border-r-transparent border-b-slate-800 -translate-x-1/2 top-1"
                        style={{ left: `${Math.min(Math.max((bmi / 45) * 100, 2), 98)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>16</span>
                      <span>18.5</span>
                      <span>25</span>
                      <span>30</span>
                      <span>35</span>
                      <span>40+</span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Healthy Range</p>
                      <p className="text-lg font-bold text-slate-800">
                        {formatWeight(healthyWeightMin)} - {formatWeight(healthyWeightMax)}
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">BMI Prime</p>
                      <p className="text-lg font-bold text-blue-600">{bmiPrime.toFixed(2)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Ponderal Index</p>
                      <p className="text-lg font-bold text-blue-600">{ponderalIndex.toFixed(1)} kg/m³</p>
                    </div>
                    {weightToHealthy !== 0 && (
                      <div className="bg-white rounded-xl p-4 border border-slate-200">
                        <p className="text-sm text-slate-600">
                          {weightToHealthy > 0 ? "Weight to Lose" : "Weight to Gain"}
                        </p>
                        <p className="text-lg font-bold text-amber-600">
                          {formatWeight(Math.abs(weightToHealthy))}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* WHR Results */}
                  {showAdvanced && (
                    <div className="mt-4 space-y-3">
                      <div className="bg-white rounded-xl p-4 border border-slate-200">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-slate-600">Waist-to-Hip Ratio</p>
                            <p className="text-lg font-bold text-slate-800">{waistToHipRatio.toFixed(2)}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            whrRisk === "Low" ? "bg-green-100 text-green-700" :
                            whrRisk === "Moderate" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                          }`}>
                            {whrRisk} Risk
                          </span>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-4 border border-slate-200">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-slate-600">Waist-to-Height Ratio</p>
                            <p className="text-lg font-bold text-slate-800">{waistToHeightRatio.toFixed(2)}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            whtRisk === "Healthy" ? "bg-green-100 text-green-700" :
                            whtRisk === "Increased risk" ? "bg-yellow-100 text-yellow-700" : 
                            whtRisk === "Underweight risk" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
                          }`}>
                            {whtRisk}
                          </span>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-4 border border-slate-200">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-slate-600">Waist Risk ({gender === "male" ? "Men" : "Women"})</p>
                            <p className="text-lg font-bold text-slate-800">{unit === "imperial" ? waist : waistCm} {unit === "imperial" ? "in" : "cm"}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            waistRisk === "Low" ? "bg-green-100 text-green-700" :
                            waistRisk === "Moderate" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                          }`}>
                            {waistRisk} Risk
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Button */}
                <button
                  onClick={() => handleInputChange(setShowTableModal, true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 mb-4"
                >
                  📊 {t("calculator.buttons.viewTable", "View BMI Categories Table")}
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
              
              {/* BMI Categories Table */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  📊 BMI Categories (WHO)
                </h3>
                <div className="space-y-2">
                  {bmiCategories.map((cat, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                      <div className="flex items-center gap-3">
                        <span className={`w-3 h-3 rounded-full ${cat.color}`}></span>
                        <span className="text-slate-700">{cat.category}</span>
                      </div>
                      <span className="text-slate-600 font-medium">{cat.range}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Waist-to-Hip Ratio Table */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  📏 Waist-to-Hip Ratio Risk
                </h3>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 text-slate-600 font-medium">Risk Level</th>
                      <th className="text-center py-2 text-slate-600 font-medium">Men</th>
                      <th className="text-center py-2 text-slate-600 font-medium">Women</th>
                    </tr>
                  </thead>
                  <tbody>
                    {whrRiskTable.map((row, i) => (
                      <tr key={i} className="border-b border-slate-100">
                        <td className="py-2">
                          <span className={`px-2 py-1 rounded text-sm font-medium ${
                            row.risk === "Low" ? "bg-green-100 text-green-700" :
                            row.risk === "Moderate" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                          }`}>
                            {row.risk}
                          </span>
                        </td>
                        <td className="py-2 text-center text-slate-600">{row.male}</td>
                        <td className="py-2 text-center text-slate-600">{row.female}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-slate-400 mt-3">WHR is a better predictor of cardiovascular risk than BMI alone</p>
              </div>

            </div>
          </div>
        </section>

        {/* EXAMPLE CALCULATION */}
        <section className="py-6 bg-white">
          <div className="container">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                📊 {t("education.example.title", "Example Calculation")}
              </h3>
              <p className="text-slate-600 mb-4">
                Let's calculate BMI and related metrics for a <strong>30-year-old male</strong> who is <strong>5'10"</strong> tall, weighs <strong>170 lbs</strong>, with a <strong>34" waist</strong> and <strong>40" hips</strong>:
              </p>
              <div className="bg-blue-50 rounded-xl p-6 mb-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">BMI Calculation</p>
                    <p className="font-mono text-slate-700 text-sm">
                      Height: 5'10" = 1.78m<br />
                      Weight: 170 lbs = 77.1 kg<br />
                      <strong className="text-blue-600">BMI = 77.1 ÷ 1.78² = 24.3</strong>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Ponderal Index</p>
                    <p className="font-mono text-slate-700 text-sm">
                      PI = weight ÷ height³<br />
                      <strong className="text-blue-600">PI = 77.1 ÷ 1.78³ = 13.7 kg/m³</strong>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Waist-to-Hip Ratio</p>
                    <p className="font-mono text-slate-700 text-sm">
                      WHR = 34" ÷ 40"<br />
                      <strong className="text-blue-600">WHR = 0.85 (Low Risk)</strong>
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-slate-600">
                With a BMI of 24.3 (Normal), Ponderal Index of 13.7 (Normal range: 11-15), and WHR of 0.85 (Low risk for men), 
                this person has healthy body composition metrics. The healthy weight range for this height is approximately 129-174 lbs.
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
                
                {/* What is BMI */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">{t("education.whatIsBmi.title", "What is BMI?")}</h2>
                  <p className="text-slate-600 mb-4">
                    {t("education.whatIsBmi.content1", "Body Mass Index (BMI) is a simple calculation using height and weight that estimates body fat. It's widely used as a screening tool to identify potential weight problems in adults.")}
                  </p>
                  <p className="text-slate-600 mb-4">
                    {t("education.whatIsBmi.content2", "While BMI is useful for most people, it has limitations. It may overestimate body fat in athletes with high muscle mass and underestimate it in older adults who have lost muscle.")}
                  </p>
                  <div className="bg-slate-100 rounded-xl p-6 text-center">
                    <p className="text-2xl font-mono font-bold text-slate-800">{t("education.whatIsBmi.formula", "BMI = weight (kg) / height² (m)")}</p>
                  </div>
                </div>

                {/* Additional Metrics */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">{t("education.beyondBmi.title", "Beyond BMI: Better Health Metrics")}</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <span className="text-2xl">📏</span>
                      <div>
                        <h3 className="font-semibold text-slate-900">{t("education.metrics.pi.title", "Ponderal Index (PI)")}</h3>
                        <p className="text-slate-600">{t("education.metrics.pi.description", "More accurate than BMI for very tall or short people. Uses height cubed instead of squared. Normal range: 11-15 kg/m³.")}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-2xl">⚖️</span>
                      <div>
                        <h3 className="font-semibold text-slate-900">{t("education.metrics.whr.title", "Waist-to-Hip Ratio (WHR)")}</h3>
                        <p className="text-slate-600">{t("education.metrics.whr.description", "Better predictor of cardiovascular risk. Measures where you carry fat. Apple shapes (high WHR) have higher health risks than pear shapes.")}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-2xl">📐</span>
                      <div>
                        <h3 className="font-semibold text-slate-900">{t("education.metrics.whtr.title", "Waist-to-Height Ratio (WHtR)")}</h3>
                        <p className="text-slate-600">{t("education.metrics.whtr.description", "Simple rule: keep your waist less than half your height. According to NICE guidelines, WHtR < 0.5 indicates healthy abdominal fat levels.")}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-2xl">✨</span>
                      <div>
                        <h3 className="font-semibold text-slate-900">{t("education.metrics.bmiPrime.title", "BMI Prime")}</h3>
                        <p className="text-slate-600">{t("education.metrics.bmiPrime.description", "Your BMI divided by 25 (upper limit of normal). A value of 1.0 = upper limit of normal weight. Makes comparisons easier across different BMIs.")}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">{t("education.faqTitle", "Frequently Asked Questions")}</h2>
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
                
                {/* Ad Block - Sidebar */}
                <AdBlock slot="calculator-sidebar" />

                {/* Finance Calculators */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    💰 {t("sidebar.financeTitle", "Finance Calculators")}
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

                {/* Health Calculators */}
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

                {/* Health Tips */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    💡 {t("sidebar.quickTips", "Quick Tips")}
                  </h3>
                  <ul className="space-y-3 text-slate-600 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span>{t("sidebar.tips.tip1", "Weigh yourself at the same time each day for consistency")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span>{t("sidebar.tips.tip2", "BMI doesn't distinguish between muscle and fat mass")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span>{t("sidebar.tips.tip3", "Focus on trends over time rather than daily fluctuations")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span>{t("sidebar.tips.tip4", "Use WHR and WHtR for a more complete health picture")}</span>
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
