"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import AdBlock from "@/components/ads/AdBlock";

// ============================================
// CONFIGURACIÓN - CAMBIAR PARA CADA CALCULADORA
// ============================================
const CALCULATOR_SLUG = "retirement-calculator";
const CALCULATOR_NAME = "Retirement Calculator";
const CALCULATOR_CATEGORY = "finance";
// ============================================

export default function RetirementCalculator() {
  const locale = useLocale();
  const { data: session } = useSession();

  // ========== TRACKING REFS ==========
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // Calculator state
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [expectedReturn, setExpectedReturn] = useState(7);
  const [showTableModal, setShowTableModal] = useState(false);

  // Advanced options (PRO features)
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [employerMatch, setEmployerMatch] = useState(0);
  const [employerMatchLimit, setEmployerMatchLimit] = useState(6);
  const [socialSecurity, setSocialSecurity] = useState(0);
  const [desiredIncome, setDesiredIncome] = useState(0);
  const [inflationRate, setInflationRate] = useState(3);
  const [lifeExpectancy, setLifeExpectancy] = useState(95);

  // Results
  const [retirementSavings, setRetirementSavings] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [monthlyRetirementIncome, setMonthlyRetirementIncome] = useState(0);
  const [yearsInRetirement, setYearsInRetirement] = useState(0);
  const [inflationAdjustedSavings, setInflationAdjustedSavings] = useState(0);
  const [savingsGap, setSavingsGap] = useState(0);
  const [yearlyData, setYearlyData] = useState<any[]>([]);

  // Favorites
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  // Save status
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // ========== TRACK VIEW ON PAGE LOAD ==========
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

  // ========== TRACK CALCULATION ==========
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

  // ========== SAVE TO HISTORY (only if logged in) ==========
  const saveToHistory = async () => {
    if (!session?.user) return;

    setSaveStatus('saving');
    try {
      const res = await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          calculatorSlug: CALCULATOR_SLUG,
          calculatorName: CALCULATOR_NAME,
          inputs: { currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn },
          results: { 
            retirementSavings: retirementSavings.toFixed(2), 
            monthlyRetirementIncome: monthlyRetirementIncome.toFixed(2),
            totalContributions: totalContributions.toFixed(2)
          },
        }),
      });
      if (res.ok) {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      setSaveStatus('error');
    }
  };

  // ========== HANDLE INPUT CHANGE ==========
  const handleInputChange = (setter: (value: any) => void, value: any) => {
    setter(value);
    trackCalculation();
  };

  // ========== SAVE INDICATOR ==========
  const SaveIndicator = () => {
    if (saveStatus === 'idle') return null;
    if (saveStatus === 'saving') return <span className="text-xs text-slate-400">Saving...</span>;
    if (saveStatus === 'saved') return <span className="text-xs text-green-500">✓ Saved</span>;
    if (saveStatus === 'error') return <span className="text-xs text-red-500">Error saving</span>;
    return null;
  };

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const res = await fetch('/api/favorites');
        if (res.ok) {
          const data = await res.json();
          setIsFavorite(data.favorites?.some((f: any) => f.calculatorSlug === CALCULATOR_SLUG));
        }
      } catch (error) {}
    };
    checkFavorite();
  }, []);

  const toggleFavorite = async () => {
    setFavoriteLoading(true);
    try {
      if (isFavorite) {
        await fetch(`/api/favorites?slug=${CALCULATOR_SLUG}`, { method: 'DELETE' });
        setIsFavorite(false);
      } else {
        await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            calculatorSlug: CALCULATOR_SLUG,
            calculatorName: CALCULATOR_NAME,
            category: CALCULATOR_CATEGORY
          })
        });
        setIsFavorite(true);
      }
    } catch (error) {}
    setFavoriteLoading(false);
  };

  // Calculate
  useEffect(() => {
    const yearsToRetirement = retirementAge - currentAge;
    const monthsToRetirement = yearsToRetirement * 12;
    const monthlyReturn = expectedReturn / 100 / 12;
    
    // Calculate employer match contribution
    const employerMonthlyMatch = (monthlyContribution * (employerMatch / 100));
    const totalMonthlyContribution = monthlyContribution + employerMonthlyMatch;

    // Future value calculation
    let fv = currentSavings;
    let totalContrib = currentSavings;
    
    // Generate yearly data
    let data = [];
    let balance = currentSavings;
    
    for (let year = 1; year <= yearsToRetirement; year++) {
      for (let month = 1; month <= 12; month++) {
        balance = balance * (1 + monthlyReturn) + totalMonthlyContribution;
      }
      totalContrib = currentSavings + (totalMonthlyContribution * 12 * year);
      
      data.push({
        age: currentAge + year,
        year,
        contributions: Math.round(totalContrib),
        interest: Math.round(balance - totalContrib),
        balance: Math.round(balance),
      });
    }
    
    fv = balance;
    const interest = fv - totalContrib;
    
    setRetirementSavings(fv);
    setTotalContributions(totalContrib);
    setTotalInterest(interest);
    setYearlyData(data);

    // Retirement income calculation (4% rule)
    const annualIncome = fv * 0.04;
    const monthlyIncome = annualIncome / 12 + socialSecurity;
    setMonthlyRetirementIncome(monthlyIncome);

    // Years in retirement (based on life expectancy)
    const retirementYears = lifeExpectancy - retirementAge;
    setYearsInRetirement(retirementYears);

    // Inflation-adjusted value
    if (inflationRate > 0) {
      const inflationFactor = Math.pow(1 + inflationRate / 100, yearsToRetirement);
      setInflationAdjustedSavings(fv / inflationFactor);
    } else {
      setInflationAdjustedSavings(fv);
    }

    // Savings gap (if desired income set)
    if (desiredIncome > 0) {
      const annualNeeded = (desiredIncome - socialSecurity) * 12;
      const totalNeeded = annualNeeded * retirementYears;
      const gap = totalNeeded - fv;
      setSavingsGap(gap > 0 ? gap : 0);
    } else {
      setSavingsGap(0);
    }

  }, [currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn, employerMatch, socialSecurity, desiredIncome, inflationRate, lifeExpectancy]);

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // FAQ data
  const faqs = [
    { question: "How much do I need to retire?", answer: "A common rule of thumb is to have 25x your annual expenses saved (the 4% rule). For example, if you need $50,000/year, aim for $1.25 million. However, this varies based on lifestyle, healthcare costs, and life expectancy." },
    { question: "What is the 4% rule?", answer: "The 4% rule suggests you can withdraw 4% of your retirement savings annually without running out of money over a 30-year retirement. For example, with $1 million saved, you could withdraw $40,000/year." },
    { question: "When should I start saving for retirement?", answer: "As early as possible! Starting at 25 vs 35 can mean hundreds of thousands more at retirement due to compound interest. Even small contributions early on make a huge difference." },
    { question: "Should I contribute to 401(k) or IRA first?", answer: "Generally, contribute to your 401(k) at least up to the employer match (free money!), then max out a Roth IRA, then return to max out your 401(k). This optimizes tax benefits and matching." },
    { question: "How does inflation affect retirement savings?", answer: "Inflation erodes purchasing power over time. $1 million today might only buy $500,000 worth of goods in 25 years (at 3% inflation). Factor this into your planning." }
  ];

  // Retirement milestones
  const milestones = [
    { age: "30", savings: "1x salary", example: "$50,000" },
    { age: "40", savings: "3x salary", example: "$150,000" },
    { age: "50", savings: "6x salary", example: "$300,000" },
    { age: "60", savings: "8x salary", example: "$400,000" },
    { age: "67", savings: "10x salary", example: "$500,000" },
  ];

  // Categories
  const financeCalcs = [
    "Mortgage", "Loan", "Auto Loan", "Compound Interest", "Savings", "Investment",
    "Amortization", "Inflation", "Salary", "Income Tax", "401K", "Payment"
  ];
  const healthCalcs = [
    "BMI", "Calorie", "Body Fat", "BMR", "Macro", "TDEE", "Protein", "Ideal Weight"
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

      {/* Year-by-Year Table Modal */}
      {showTableModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Retirement Savings Projection</h3>
              <button onClick={() => setShowTableModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="overflow-auto max-h-[50vh]">
              <table className="w-full">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Age</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Contributions</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Interest</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {yearlyData.map((row, i) => (
                    <tr key={row.age} className={i === yearlyData.length - 1 ? "bg-green-50" : ""}>
                      <td className="px-4 py-3 font-medium">{row.age}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{formatMoney(row.contributions)}</td>
                      <td className="px-4 py-3 text-right text-green-600">{formatMoney(row.interest)}</td>
                      <td className="px-4 py-3 text-right font-semibold">{formatMoney(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-200 flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 rounded-xl hover:bg-slate-200 font-medium text-slate-700">
                📄 Download PDF <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">PRO</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 rounded-xl hover:bg-slate-200 font-medium text-slate-700">
                📊 Download Excel <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">PRO</span>
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
              <Link href={`/${locale}`} className="text-slate-600 hover:text-blue-600">Home</Link>
              <span className="mx-2 text-slate-400">/</span>
              <Link href={`/${locale}/calculators`} className="text-slate-600 hover:text-blue-600">Calculators</Link>
              <span className="mx-2 text-slate-400">/</span>
              <span className="text-slate-700">Retirement</span>
            </nav>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-2xl">🏖️</div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Retirement Calculator</h1>
                  <button
                    onClick={toggleFavorite}
                    disabled={favoriteLoading}
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                    title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    {isFavorite ? (
                      <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    ) : (
                      <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-2 h-6">
                  <p className="text-slate-600">Plan your path to financial freedom</p>
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

        {/* Calculator Section */}
        <section className="py-6 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Calculator Inputs */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Your Retirement Plan</h2>

                {/* Current Age */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Current Age</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        type="text"
                        value={currentAge}
                        onChange={(e) => handleInputChange(setCurrentAge, Number(e.target.value) || 0)}
                        className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                      <span className="text-slate-600 ml-1">years</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="70"
                    step="1"
                    value={currentAge}
                    onChange={(e) => handleInputChange(setCurrentAge, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>18</span>
                    <span>70</span>
                  </div>
                </div>

                {/* Retirement Age */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Retirement Age</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        type="text"
                        value={retirementAge}
                        onChange={(e) => handleInputChange(setRetirementAge, Number(e.target.value) || 0)}
                        className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                      <span className="text-slate-600 ml-1">years</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={currentAge + 1}
                    max="80"
                    step="1"
                    value={retirementAge}
                    onChange={(e) => handleInputChange(setRetirementAge, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>{currentAge + 1}</span>
                    <span>80</span>
                  </div>
                </div>

                {/* Current Savings */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Current Retirement Savings</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input
                        type="text"
                        value={currentSavings.toLocaleString()}
                        onChange={(e) => handleInputChange(setCurrentSavings, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-24 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000000"
                    step="5000"
                    value={currentSavings}
                    onChange={(e) => handleInputChange(setCurrentSavings, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>$0</span>
                    <span>$1,000,000</span>
                  </div>
                </div>

                {/* Monthly Contribution */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Monthly Contribution</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input
                        type="text"
                        value={monthlyContribution.toLocaleString()}
                        onChange={(e) => handleInputChange(setMonthlyContribution, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-20 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="50"
                    value={monthlyContribution}
                    onChange={(e) => handleInputChange(setMonthlyContribution, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>$0</span>
                    <span>$5,000</span>
                  </div>
                </div>

                {/* Expected Return */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Expected Annual Return</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        type="text"
                        value={expectedReturn}
                        onChange={(e) => handleInputChange(setExpectedReturn, Number(e.target.value) || 0)}
                        className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                      <span className="text-slate-600">%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    step="0.5"
                    value={expectedReturn}
                    onChange={(e) => handleInputChange(setExpectedReturn, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>1%</span>
                    <span>12%</span>
                  </div>
                </div>

                {/* Advanced Options - Collapsible (PRO) */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">⚙️</span>
                      <span className="font-semibold text-slate-700">Advanced Options</span>
                    </div>
                    <svg
                      className={`w-5 h-5 text-slate-600 transition-transform ${showAdvanced ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showAdvanced && (
                    <div className="p-4 space-y-5 bg-white">
                      {/* Employer Match */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">Employer 401(k) Match</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <input
                            type="text"
                            value={employerMatch === 0 ? "" : employerMatch}
                            onChange={(e) => handleInputChange(setEmployerMatch, Number(e.target.value) || 0)}
                            placeholder="0"
                            className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none"
                          />
                          <span className="px-3 py-2 bg-slate-50 text-slate-600 border-l border-slate-200">%</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Employer matches {employerMatch}% of your contribution</p>
                      </div>

                      {/* Social Security */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">Expected Social Security (Monthly)</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <span className="px-3 py-2 bg-slate-50 text-slate-600 border-r border-slate-200">$</span>
                          <input
                            type="text"
                            value={socialSecurity === 0 ? "" : socialSecurity.toLocaleString()}
                            onChange={(e) => handleInputChange(setSocialSecurity, Number(e.target.value.replace(/,/g, "")) || 0)}
                            placeholder="0"
                            className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none"
                          />
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Average is ~$1,800/month at full retirement age</p>
                      </div>

                      {/* Desired Monthly Income */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">Desired Monthly Retirement Income</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <span className="px-3 py-2 bg-slate-50 text-slate-600 border-r border-slate-200">$</span>
                          <input
                            type="text"
                            value={desiredIncome === 0 ? "" : desiredIncome.toLocaleString()}
                            onChange={(e) => handleInputChange(setDesiredIncome, Number(e.target.value.replace(/,/g, "")) || 0)}
                            placeholder="0"
                            className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none"
                          />
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Set a target to see if you're on track</p>
                      </div>

                      {/* Inflation Rate */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">Expected Inflation Rate</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <input
                            type="text"
                            value={inflationRate === 0 ? "" : inflationRate}
                            onChange={(e) => handleInputChange(setInflationRate, Number(e.target.value) || 0)}
                            placeholder="0"
                            className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none"
                          />
                          <span className="px-3 py-2 bg-slate-50 text-slate-600 border-l border-slate-200">%</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Historical average is ~3% per year</p>
                      </div>

                      {/* Life Expectancy */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">Life Expectancy</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <input
                            type="text"
                            value={lifeExpectancy}
                            onChange={(e) => handleInputChange(setLifeExpectancy, Number(e.target.value) || 95)}
                            placeholder="95"
                            className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none"
                          />
                          <span className="px-3 py-2 bg-slate-50 text-slate-600 border-l border-slate-200">years</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Conservative estimate is 95 years (plan for longevity)</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Results */}
              <div>
                {/* Results Card */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  <p className="text-sm text-slate-600 mb-1">Retirement Savings at {retirementAge}</p>
                  <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{formatMoney(retirementSavings)}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Monthly Income (4% Rule)</p>
                      <p className="text-xl font-bold text-green-600">{formatMoney(monthlyRetirementIncome)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Years to Retirement</p>
                      <p className="text-xl font-bold text-blue-600">{retirementAge - currentAge} years</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Years in Retirement</p>
                      <p className="text-xl font-bold text-purple-700">{yearsInRetirement} years</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Life Expectancy</p>
                      <p className="text-xl font-bold text-slate-600">{lifeExpectancy} years</p>
                    </div>
                  </div>
                </div>

                {/* Growth Breakdown */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">Growth Breakdown</h3>
                  <div className="h-8 rounded-full overflow-hidden flex">
                    <div
                      className="bg-blue-600 transition-all"
                      style={{ width: `${(totalContributions / retirementSavings) * 100}%` }}
                    />
                    <div
                      className="bg-emerald-400 transition-all"
                      style={{ width: `${(totalInterest / retirementSavings) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-blue-600"></span>
                      <span className="text-slate-600">Contributions ({Math.round((totalContributions / retirementSavings) * 100)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-emerald-400"></span>
                      <span className="text-slate-600">Interest ({Math.round((totalInterest / retirementSavings) * 100)}%)</span>
                    </div>
                  </div>
                </div>

                {/* Key Stats */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">Key Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Contributions</span>
                      <span className="font-semibold">{formatMoney(totalContributions)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Investment Growth</span>
                      <span className="font-semibold text-green-600">{formatMoney(totalInterest)}</span>
                    </div>
                    {employerMatch > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Employer Match Contribution</span>
                        <span className="font-semibold text-purple-700">{formatMoney(monthlyContribution * (employerMatch / 100) * 12 * (retirementAge - currentAge))}</span>
                      </div>
                    )}
                    {inflationRate > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Inflation-Adjusted Value</span>
                        <span className="font-semibold text-amber-600">{formatMoney(inflationAdjustedSavings)}</span>
                      </div>
                    )}
                    {savingsGap > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Savings Gap to Goal</span>
                        <span className="font-semibold text-red-600">-{formatMoney(savingsGap)}</span>
                      </div>
                    )}
                    <div className="border-t pt-3 flex justify-between">
                      <span className="font-semibold text-slate-900">At Retirement ({retirementAge})</span>
                      <span className="font-bold text-lg">{formatMoney(retirementSavings)}</span>
                    </div>
                  </div>
                </div>

                {/* Projection Table Button */}
                <button
                  onClick={() => setShowTableModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 font-medium mb-4"
                >
                  📅 View Year-by-Year Projection
                </button>

                {/* Export & Save Buttons */}
                <div className={`grid ${session?.user ? 'grid-cols-3' : 'grid-cols-2'} gap-3`}>
                  {session?.user && (
                    <button 
                      onClick={saveToHistory}
                      disabled={saveStatus === 'saving'}
                      className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700"
                    >
                      💾 {saveStatus === 'saving' ? '...' : 'Save'}
                    </button>
                  )}
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">
                    📄 PDF <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">PRO</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">
                    📊 Excel <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">PRO</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Ad Rectangle - Between Calculator and Info Cards */}
            <div className="mt-8">
              <AdBlock slot="calculator-bottom" />
            </div>

            {/* Tips & Milestones - BELOW CALCULATOR */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* Retirement Tips */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">💡 Retirement Planning Tips</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span><strong>Max Employer Match:</strong> Never leave free money on the table</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span><strong>Increase Contributions:</strong> Bump up 1% each year or with raises</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span><strong>Diversify:</strong> Mix stocks, bonds, and other assets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span><strong>Consider Roth:</strong> Tax-free growth can be powerful</span>
                  </li>
                </ul>
              </div>

              {/* Savings Milestones Table */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">📊 Savings Milestones by Age</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 font-semibold text-slate-700">Age</th>
                        <th className="text-center py-2 font-semibold text-slate-700">Target</th>
                        <th className="text-right py-2 font-semibold text-slate-700">Example ($50K salary)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {milestones.map((row, i) => (
                        <tr key={i} className="border-b border-slate-100">
                          <td className="py-2 text-slate-600">{row.age}</td>
                          <td className="py-2 text-center font-medium text-indigo-600">{row.savings}</td>
                          <td className="py-2 text-right text-slate-600">{row.example}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-400 mt-3">*Based on Fidelity's retirement savings guidelines</p>
              </div>
            </div>

            {/* Example Calculation - BELOW INFO CARDS */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 mt-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">📊 Example Calculation</h3>
              <p className="text-slate-600 mb-4">
                Let's say you're <strong>30 years old</strong>, have <strong>$50,000 saved</strong>, contribute <strong>$500/month</strong>, with <strong>7% returns</strong>, retiring at <strong>65</strong>:
              </p>
              <div className="bg-indigo-50 rounded-xl p-6 mb-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-mono text-slate-700 text-sm">
                      Starting Savings: $50,000<br />
                      Monthly × 420 months: $210,000<br />
                      <strong>Total Contributions: $260,000</strong>
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-slate-700 text-sm">
                      Investment Growth: ~$890,000<br />
                      <strong className="text-indigo-600 text-lg">At Retirement: ~$1,150,000</strong><br />
                      Monthly Income (4%): ~$3,800
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-slate-600">
                With consistent investing over 35 years, your <strong>$260,000 in contributions</strong> grows to over <strong>$1.1 million</strong> – 
                that's the power of compound interest! Starting early is the key to building wealth.
              </p>
            </div>
          </div>
        </section>

        {/* Educational Content with Sidebar */}
        <section className="py-12 bg-slate-50">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content - LEFT/CENTER (2 columns) */}
              <div className="lg:col-span-2 space-y-6">
                {/* What is Retirement Planning */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📖 What is Retirement Planning?</h2>
                  <p className="text-slate-600 mb-4">
                    Retirement planning is the process of determining your retirement income goals and the actions needed to achieve them. It involves identifying sources of income, estimating expenses, implementing a savings program, and managing assets and risk.
                  </p>
                  <p className="text-slate-600">
                    The earlier you start planning, the more time your money has to grow through compound interest. Even small contributions made consistently over decades can grow into substantial retirement savings.
                  </p>
                </div>

                {/* Formula */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📐 The 4% Rule</h2>
                  <div className="bg-slate-100 rounded-xl p-6 mb-6 text-center">
                    <p className="text-2xl font-mono font-bold text-slate-800">Annual Withdrawal = Savings × 4%</p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-slate-600">The 4% rule helps estimate how much you can withdraw annually without running out of money over a 30-year retirement:</p>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-24">$500,000</span><span className="text-slate-600">→ $20,000/year ($1,667/month)</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-24">$1,000,000</span><span className="text-slate-600">→ $40,000/year ($3,333/month)</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-24">$2,000,000</span><span className="text-slate-600">→ $80,000/year ($6,667/month)</span></div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 Tips to Maximize Retirement Savings</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4"><span className="text-2xl">🎯</span><div><h3 className="font-semibold text-slate-900">Start as Early as Possible</h3><p className="text-slate-600">Time is your greatest asset. Starting at 25 vs 35 can double your retirement savings.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">💰</span><div><h3 className="font-semibold text-slate-900">Get the Full Employer Match</h3><p className="text-slate-600">It's free money! If your employer matches 4%, contribute at least 4%.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">📈</span><div><h3 className="font-semibold text-slate-900">Increase Contributions Annually</h3><p className="text-slate-600">Increase by 1% each year or allocate half of each raise to retirement.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">🔄</span><div><h3 className="font-semibold text-slate-900">Rebalance Regularly</h3><p className="text-slate-600">Review and adjust your portfolio annually to maintain your target allocation.</p></div></div>
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

              {/* Sidebar - RIGHT (1 column) */}
              <div className="space-y-6">
                {/* Ad Block - Sidebar */}
                <AdBlock slot="calculator-sidebar" />

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
                        href={`/${locale}/${calc.toLowerCase().replace(/ /g, "-")}-calculator`}
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
                        href={`/${locale}/${calc.toLowerCase().replace(/ /g, "-")}-calculator`}
                        className="block text-blue-600 hover:text-blue-800 hover:underline text-sm"
                      >
                        {calc}
                      </Link>
                    ))}
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
