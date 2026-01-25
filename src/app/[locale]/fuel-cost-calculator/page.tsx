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
const CALCULATOR_SLUG = "fuel-cost-calculator";
const CALCULATOR_NAME = "Fuel Cost Calculator";
const CALCULATOR_CATEGORY = "everyday";

// =============================================================================
// TYPES
// =============================================================================
type UnitSystem = "us" | "metric";
type FuelType = "regular" | "midgrade" | "premium" | "diesel" | "e85";
type CalculationMode = "tripCost" | "annualCost" | "compareVehicles";

// =============================================================================
// FUEL TYPES
// =============================================================================
const FUEL_TYPES: Record<FuelType, { label: string; icon: string }> = {
  regular: { label: "Regular (87)", icon: "⛽" },
  midgrade: { label: "Mid-Grade (89)", icon: "⛽" },
  premium: { label: "Premium (91-93)", icon: "🏎️" },
  diesel: { label: "Diesel", icon: "🚛" },
  e85: { label: "E85 Flex Fuel", icon: "🌿" },
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function FuelCostCalculatorPage() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - Inputs
  // ─────────────────────────────────────────────────────────────────────────────
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("us");
  const [calculationMode, setCalculationMode] = useState<CalculationMode>("tripCost");
  
  // Trip Cost inputs
  const [distance, setDistance] = useState(300);
  const [fuelEfficiency, setFuelEfficiency] = useState(28);
  const [fuelPrice, setFuelPrice] = useState(3.50);
  const [roundTrip, setRoundTrip] = useState(false);
  const [fuelType, setFuelType] = useState<FuelType>("regular");
  
  // Split cost
  const [splitCost, setSplitCost] = useState(false);
  const [passengers, setPassengers] = useState(2);
  
  // Annual Cost inputs
  const [dailyMiles, setDailyMiles] = useState(30);
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState(5);
  
  // Compare vehicles
  const [vehicle1Mpg, setVehicle1Mpg] = useState(25);
  const [vehicle1Name, setVehicle1Name] = useState("Current Vehicle");
  const [vehicle2Mpg, setVehicle2Mpg] = useState(35);
  const [vehicle2Name, setVehicle2Name] = useState("New Vehicle");

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
  
  const distanceUnit = unitSystem === "us" ? "miles" : "km";
  const efficiencyUnit = unitSystem === "us" ? "MPG" : "L/100km";
  const volumeUnit = unitSystem === "us" ? "gallons" : "liters";
  const priceUnit = unitSystem === "us" ? "/gallon" : "/liter";

  // Calculate trip distance (with round trip)
  const tripDistance = roundTrip ? distance * 2 : distance;

  // Calculate fuel needed
  let fuelNeeded: number;
  if (unitSystem === "us") {
    fuelNeeded = tripDistance / fuelEfficiency;
  } else {
    // L/100km means: liters per 100km
    fuelNeeded = (tripDistance / 100) * fuelEfficiency;
  }

  // Calculate total cost
  const totalCost = fuelNeeded * fuelPrice;

  // Cost per mile/km
  const costPerUnit = unitSystem === "us" 
    ? fuelPrice / fuelEfficiency 
    : (fuelEfficiency * fuelPrice) / 100;

  // Split cost calculation
  const costPerPerson = splitCost ? totalCost / passengers : totalCost;

  // Annual calculations
  const annualMiles = dailyMiles * workDaysPerWeek * 52;
  const annualFuelNeeded = unitSystem === "us" 
    ? annualMiles / fuelEfficiency 
    : (annualMiles / 100) * fuelEfficiency;
  const annualCost = annualFuelNeeded * fuelPrice;
  const monthlyCost = annualCost / 12;

  // Vehicle comparison
  const compareAnnualMiles = dailyMiles * workDaysPerWeek * 52;
  const vehicle1AnnualCost = (compareAnnualMiles / vehicle1Mpg) * fuelPrice;
  const vehicle2AnnualCost = (compareAnnualMiles / vehicle2Mpg) * fuelPrice;
  const annualSavings = vehicle1AnnualCost - vehicle2AnnualCost;
  const fiveYearSavings = annualSavings * 5;

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
            distance: `${tripDistance} ${distanceUnit}`,
            fuelEfficiency: `${fuelEfficiency} ${efficiencyUnit}`,
            fuelPrice: `$${fuelPrice.toFixed(2)}${priceUnit}`,
          },
          results: {
            fuelNeeded: `${fuelNeeded.toFixed(2)} ${volumeUnit}`,
            totalCost: `$${totalCost.toFixed(2)}`,
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
      question: "How do I find my car's fuel efficiency?",
      answer: "Check your owner's manual, the sticker on the driver's door jamb, or fueleconomy.gov for EPA estimates. For real-world MPG, divide miles driven by gallons used at fill-up. Most cars get 10-15% less than EPA estimates."
    },
    {
      question: "What's the difference between city and highway MPG?",
      answer: "City MPG is typically 20-30% lower than highway MPG due to stop-and-go traffic, idling, and acceleration. Highway driving is more fuel-efficient because you maintain steady speeds. Combined MPG is a weighted average (55% city, 45% highway)."
    },
    {
      question: "How does towing affect fuel economy?",
      answer: "Towing typically reduces fuel economy by 20-50% depending on the trailer weight and aerodynamics. A travel trailer might reduce a truck's MPG from 20 to 10-12. Always calculate with your loaded MPG for accuracy."
    },
    {
      question: "Is premium gas worth the extra cost?",
      answer: "Only if your car requires it. Premium fuel (91-93 octane) costs 20-40 cents more per gallon. Most cars designed for regular (87) won't benefit from premium. Check your owner's manual—if it says 'recommended' vs 'required,' regular is fine."
    },
    {
      question: "How can I improve my fuel economy?",
      answer: "Maintain proper tire pressure (can improve MPG by 3%), remove excess weight, avoid aggressive driving (saves 15-30%), use cruise control on highways, keep your car maintained, and combine trips when possible."
    },
    {
      question: "How do I convert MPG to L/100km?",
      answer: "The formula is: L/100km = 235.215 / MPG. For example, 30 MPG = 235.215/30 = 7.84 L/100km. Note that these scales work opposite—higher MPG is better, but lower L/100km is better."
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
              <span className="text-slate-900 font-medium" aria-current="page">Fuel Cost Calculator</span>
            </nav>

            {/* Title */}
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl"
                role="img"
                aria-label="Fuel Cost Calculator icon"
              >
                ⛽
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Fuel Cost Calculator</h1>
                <p className="text-slate-600 mt-1">Calculate trip costs, annual expenses, and compare vehicles</p>
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
                  <h2 className="text-xl font-bold text-slate-900">Trip Details</h2>
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

                {/* Unit System */}
                <div className="mb-6">
                  <label id="unit-system-label" className="block font-medium text-slate-700 mb-2">
                    Unit System
                  </label>
                  <div role="radiogroup" aria-labelledby="unit-system-label" className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleInputChange(setUnitSystem, "us")}
                      role="radio"
                      aria-checked={unitSystem === "us"}
                      className={`py-3 px-4 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        unitSystem === "us"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      US (Miles, Gallons)
                    </button>
                    <button
                      onClick={() => handleInputChange(setUnitSystem, "metric")}
                      role="radio"
                      aria-checked={unitSystem === "metric"}
                      className={`py-3 px-4 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        unitSystem === "metric"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Metric (km, Liters)
                    </button>
                  </div>
                </div>

                {/* Calculation Mode */}
                <div className="mb-6">
                  <label id="calc-mode-label" className="block font-medium text-slate-700 mb-2">
                    Calculate
                  </label>
                  <div role="radiogroup" aria-labelledby="calc-mode-label" className="grid grid-cols-3 gap-2">
                    {[
                      { key: "tripCost", label: "Trip Cost", icon: "🚗" },
                      { key: "annualCost", label: "Annual Cost", icon: "📅" },
                      { key: "compareVehicles", label: "Compare", icon: "🔄" },
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

                {calculationMode === "tripCost" && (
                  <>
                    {/* Distance */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <label htmlFor="distance" className="font-medium text-slate-700">
                          Distance
                        </label>
                        <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                          <input
                            id="distance"
                            type="number"
                            min="1"
                            value={distance}
                            onChange={(e) => handleInputChange(setDistance, Math.max(1, Number(e.target.value) || 1))}
                            className="w-20 bg-transparent text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <span className="text-slate-600 ml-1">{distanceUnit}</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="1000"
                        value={distance}
                        onChange={(e) => handleInputChange(setDistance, Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>

                    {/* Round Trip Toggle */}
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl mb-6">
                      <div>
                        <span className="font-medium text-slate-700">Round Trip</span>
                        <p className="text-xs text-slate-600">Double the distance</p>
                      </div>
                      <button
                        onClick={() => handleInputChange(setRoundTrip, !roundTrip)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          roundTrip ? "bg-blue-600" : "bg-slate-300"
                        }`}
                        role="switch"
                        aria-checked={roundTrip}
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                            roundTrip ? "translate-x-7" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </>
                )}

                {calculationMode === "annualCost" && (
                  <>
                    {/* Daily Miles */}
                    <div className="mb-6">
                      <label htmlFor="daily-miles" className="block font-medium text-slate-700 mb-2">
                        Daily Commute ({distanceUnit})
                      </label>
                      <input
                        id="daily-miles"
                        type="number"
                        min="1"
                        value={dailyMiles}
                        onChange={(e) => handleInputChange(setDailyMiles, Math.max(1, Number(e.target.value) || 1))}
                        className="w-full px-4 py-3 text-xl font-bold text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Work Days per Week */}
                    <div className="mb-6">
                      <label htmlFor="work-days" className="block font-medium text-slate-700 mb-2">
                        Work Days per Week
                      </label>
                      <div className="flex gap-2">
                        {[3, 4, 5, 6, 7].map((days) => (
                          <button
                            key={days}
                            onClick={() => handleInputChange(setWorkDaysPerWeek, days)}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                              workDaysPerWeek === days
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            {days}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {calculationMode === "compareVehicles" && (
                  <>
                    {/* Vehicle 1 */}
                    <div className="mb-4 p-4 bg-slate-50 rounded-xl">
                      <input
                        type="text"
                        value={vehicle1Name}
                        onChange={(e) => handleInputChange(setVehicle1Name, e.target.value)}
                        className="w-full font-bold text-slate-800 bg-transparent border-none focus:outline-none mb-2"
                        placeholder="Vehicle 1 Name"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="5"
                          max="100"
                          value={vehicle1Mpg}
                          onChange={(e) => handleInputChange(setVehicle1Mpg, Math.max(5, Number(e.target.value) || 5))}
                          className="w-20 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-slate-600">{efficiencyUnit}</span>
                      </div>
                    </div>

                    {/* VS */}
                    <div className="text-center text-slate-400 font-bold my-2">VS</div>

                    {/* Vehicle 2 */}
                    <div className="mb-4 p-4 bg-blue-50 rounded-xl">
                      <input
                        type="text"
                        value={vehicle2Name}
                        onChange={(e) => handleInputChange(setVehicle2Name, e.target.value)}
                        className="w-full font-bold text-blue-800 bg-transparent border-none focus:outline-none mb-2"
                        placeholder="Vehicle 2 Name"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="5"
                          max="100"
                          value={vehicle2Mpg}
                          onChange={(e) => handleInputChange(setVehicle2Mpg, Math.max(5, Number(e.target.value) || 5))}
                          className="w-20 px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-blue-600">{efficiencyUnit}</span>
                      </div>
                    </div>
                  </>
                )}

                {/* Common inputs for all modes */}
                <div className="border-t border-slate-200 my-6"></div>

                {/* Fuel Efficiency (for trip and annual) */}
                {calculationMode !== "compareVehicles" && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="fuel-efficiency" className="font-medium text-slate-700">
                        Fuel Efficiency
                      </label>
                      <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                        <input
                          id="fuel-efficiency"
                          type="number"
                          min="5"
                          max="100"
                          value={fuelEfficiency}
                          onChange={(e) => handleInputChange(setFuelEfficiency, Math.max(5, Number(e.target.value) || 5))}
                          className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <span className="text-slate-600 ml-1">{efficiencyUnit}</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="60"
                      value={fuelEfficiency}
                      onChange={(e) => handleInputChange(setFuelEfficiency, Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                )}

                {/* Fuel Price */}
                <div className="mb-6">
                  <label htmlFor="fuel-price" className="block font-medium text-slate-700 mb-2">
                    Fuel Price ({priceUnit})
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">$</span>
                    <input
                      id="fuel-price"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={fuelPrice}
                      onChange={(e) => handleInputChange(setFuelPrice, Math.max(0.01, parseFloat(e.target.value) || 0.01))}
                      className="w-full pl-8 pr-4 py-3 text-xl font-bold text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Split Cost (for trip mode only) */}
                {calculationMode === "tripCost" && (
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl mb-4">
                    <div>
                      <span className="font-medium text-slate-700">Split Cost</span>
                      <p className="text-xs text-slate-600">Divide among passengers</p>
                    </div>
                    <button
                      onClick={() => handleInputChange(setSplitCost, !splitCost)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        splitCost ? "bg-blue-600" : "bg-slate-300"
                      }`}
                      role="switch"
                      aria-checked={splitCost}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          splitCost ? "translate-x-7" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                )}

                {splitCost && calculationMode === "tripCost" && (
                  <div className="mb-6">
                    <label htmlFor="passengers" className="block font-medium text-slate-700 mb-2">
                      Number of People
                    </label>
                    <div className="flex gap-2">
                      {[2, 3, 4, 5, 6].map((num) => (
                        <button
                          key={num}
                          onClick={() => handleInputChange(setPassengers, num)}
                          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                            passengers === num
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ═══════════════════════════════════════════════════════════════════
                  RIGHT COLUMN - RESULTS
              ═══════════════════════════════════════════════════════════════════ */}
              <div>
                {/* Main Result - Trip Cost */}
                {calculationMode === "tripCost" && (
                  <>
                    <div 
                      className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4"
                      role="region"
                      aria-label="Fuel Cost Results"
                      aria-live="polite"
                    >
                      <p className="text-sm text-slate-600 mb-1">
                        {splitCost ? "Cost Per Person" : "Total Trip Cost"}
                      </p>
                      <p className="text-4xl md:text-5xl font-bold text-slate-900">${costPerPerson.toFixed(2)}</p>
                      <p className="text-slate-600 mt-2">
                        {tripDistance.toLocaleString()} {distanceUnit} {roundTrip && "(round trip)"}
                      </p>
                      
                      {/* Breakdown */}
                      <div className="p-4 rounded-xl bg-white border border-slate-200 mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-600">Fuel Needed</span>
                          <span className="font-medium text-slate-800">{fuelNeeded.toFixed(2)} {volumeUnit}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-600">Price per {volumeUnit.slice(0, -1)}</span>
                          <span className="font-medium text-slate-800">${fuelPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-600">Total Fuel Cost</span>
                          <span className="font-bold text-blue-600">${totalCost.toFixed(2)}</span>
                        </div>
                        {splitCost && (
                          <div className="flex justify-between items-center border-t border-slate-200 pt-2 mt-2">
                            <span className="text-sm text-slate-600">÷ {passengers} people</span>
                            <span className="font-bold text-green-600">${costPerPerson.toFixed(2)} each</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Cost per mile/km */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                      <h3 className="font-bold text-slate-900 mb-4">📊 Cost Breakdown</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-50 rounded-lg p-3 text-center">
                          <p className="text-2xl font-bold text-blue-600">${costPerUnit.toFixed(2)}</p>
                          <p className="text-xs text-slate-600">Per {unitSystem === "us" ? "mile" : "km"}</p>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-3 text-center">
                          <p className="text-2xl font-bold text-blue-600">${(costPerUnit * 100).toFixed(2)}</p>
                          <p className="text-xs text-slate-600">Per 100 {distanceUnit}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Main Result - Annual Cost */}
                {calculationMode === "annualCost" && (
                  <>
                    <div 
                      className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4"
                      role="region"
                      aria-label="Annual Fuel Cost Results"
                      aria-live="polite"
                    >
                      <p className="text-sm text-slate-600 mb-1">Annual Fuel Cost</p>
                      <p className="text-4xl md:text-5xl font-bold text-slate-900">${annualCost.toFixed(0)}</p>
                      <p className="text-slate-600 mt-2">
                        {annualMiles.toLocaleString()} {distanceUnit}/year
                      </p>
                      
                      {/* Breakdown */}
                      <div className="p-4 rounded-xl bg-white border border-slate-200 mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-600">Monthly Cost</span>
                          <span className="font-bold text-blue-600">${monthlyCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-600">Weekly Cost</span>
                          <span className="font-medium text-slate-800">${(annualCost / 52).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Daily Cost</span>
                          <span className="font-medium text-slate-800">${(annualCost / (workDaysPerWeek * 52)).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Annual Stats */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                      <h3 className="font-bold text-slate-900 mb-4">📈 Annual Statistics</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-50 rounded-lg p-3 text-center">
                          <p className="text-2xl font-bold text-blue-600">{annualMiles.toLocaleString()}</p>
                          <p className="text-xs text-slate-600">{distanceUnit}/year</p>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-3 text-center">
                          <p className="text-2xl font-bold text-blue-600">{annualFuelNeeded.toFixed(0)}</p>
                          <p className="text-xs text-slate-600">{volumeUnit}/year</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Main Result - Compare Vehicles */}
                {calculationMode === "compareVehicles" && (
                  <>
                    <div 
                      className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4"
                      role="region"
                      aria-label="Vehicle Comparison Results"
                      aria-live="polite"
                    >
                      <p className="text-sm text-slate-600 mb-1">Annual Savings with {vehicle2Name}</p>
                      <p className={`text-4xl md:text-5xl font-bold ${annualSavings > 0 ? "text-green-600" : "text-red-600"}`}>
                        ${Math.abs(annualSavings).toFixed(0)}
                        <span className="text-xl ml-2">{annualSavings > 0 ? "saved" : "extra"}</span>
                      </p>
                      
                      {/* Comparison */}
                      <div className="mt-4 space-y-3">
                        <div className="p-3 bg-slate-100 rounded-lg flex justify-between">
                          <span className="text-slate-700">{vehicle1Name} ({vehicle1Mpg} {efficiencyUnit})</span>
                          <span className="font-bold text-slate-800">${vehicle1AnnualCost.toFixed(0)}/yr</span>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg flex justify-between">
                          <span className="text-blue-700">{vehicle2Name} ({vehicle2Mpg} {efficiencyUnit})</span>
                          <span className="font-bold text-blue-800">${vehicle2AnnualCost.toFixed(0)}/yr</span>
                        </div>
                      </div>
                    </div>

                    {/* Long-term Savings */}
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 mb-4 text-white">
                      <h3 className="font-bold mb-4">💰 Long-Term Savings</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/20 rounded-lg p-3 text-center">
                          <p className="text-2xl font-bold">${Math.abs(annualSavings).toFixed(0)}</p>
                          <p className="text-green-100 text-sm">Per Year</p>
                        </div>
                        <div className="bg-white/20 rounded-lg p-3 text-center">
                          <p className="text-2xl font-bold">${Math.abs(fiveYearSavings).toFixed(0)}</p>
                          <p className="text-green-100 text-sm">Over 5 Years</p>
                        </div>
                      </div>
                    </div>
                  </>
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
                <h3 className="text-lg font-bold text-slate-900 mb-4">💡 Fuel Economy Formulas</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Fuel Cost:</strong> Distance ÷ MPG × Price</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Cost per Mile:</strong> Price ÷ MPG</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>MPG to L/100km:</strong> 235.215 ÷ MPG</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Annual Miles:</strong> Daily × Work Days × 52</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">⛽ Average MPG by Type</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span><strong>Compact Car:</strong> 30-35 MPG</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span><strong>Midsize Sedan:</strong> 25-30 MPG</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span><strong>SUV/Crossover:</strong> 20-28 MPG</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span><strong>Pickup Truck:</strong> 15-22 MPG</span>
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
              Road trip: 500 miles, 28 MPG, $3.50/gallon, split between 4 people
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Step 1: Calculate Fuel Needed</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>500 miles ÷ 28 MPG</p>
                  <p className="font-bold text-blue-600 mt-2">= 17.86 gallons</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5">
                <h4 className="font-bold text-slate-800 mb-3">Step 2: Calculate Cost</h4>
                <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700">
                  <p>17.86 gallons × $3.50 = $62.50 total</p>
                  <p>$62.50 ÷ 4 people</p>
                  <p className="font-bold text-blue-600 mt-2">= $15.63 per person</p>
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding Fuel Costs</h2>
                  <p className="text-slate-600 mb-4">
                    Fuel is often the second-largest vehicle expense after depreciation. Understanding your true fuel costs helps with budgeting and making informed decisions about vehicle purchases, especially when comparing gas vs. hybrid vs. electric options.
                  </p>
                  <p className="text-slate-600">
                    Your actual fuel economy depends on many factors: driving style, terrain, weather, vehicle maintenance, and cargo load. EPA estimates are tested under ideal conditions—most drivers get 10-15% less than the sticker MPG.
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
                  <h3 className="font-bold mb-2">🚗 Auto Loan Calculator</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Calculate your monthly car payments and total loan cost.
                  </p>
                  <Link href={`/${locale}/auto-loan-calculator`} className="inline-block bg-white text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                    Try Auto Loan Calculator →
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
