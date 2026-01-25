"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import AdBlock from "@/components/ads/AdBlock";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

// ============================================
// CONFIGURACIÓN
// ============================================
const CALCULATOR_SLUG = "401k-calculator";
const CALCULATOR_NAME = "401(k) Calculator";
const CALCULATOR_CATEGORY = "finance";
// ============================================

export default function Calculator401k() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);

  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // Calculator state
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [annualSalary, setAnnualSalary] = useState(75000);
  const [currentBalance, setCurrentBalance] = useState(50000);
  const [contributionPercent, setContributionPercent] = useState(10);
  const [employerMatchPercent, setEmployerMatchPercent] = useState(50);
  const [employerMatchLimit, setEmployerMatchLimit] = useState(6);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [expectedReturn, setExpectedReturn] = useState(7);
  const [salaryIncrease, setSalaryIncrease] = useState(3);
  const [planFees, setPlanFees] = useState(0.5);
  const [includeCatchUp, setIncludeCatchUp] = useState(true);
  const [showTableModal, setShowTableModal] = useState(false);

  // Results
  const [balanceAtRetirement, setBalanceAtRetirement] = useState(0);
  const [totalYourContributions, setTotalYourContributions] = useState(0);
  const [totalEmployerContributions, setTotalEmployerContributions] = useState(0);
  const [totalInvestmentGrowth, setTotalInvestmentGrowth] = useState(0);
  const [monthlyRetirementIncome, setMonthlyRetirementIncome] = useState(0);
  const [yearsOfIncome, setYearsOfIncome] = useState(0);
  const [freeMoneyLeftOnTable, setFreeMoneyLeftOnTable] = useState(0);
  const [onTrackStatus, setOnTrackStatus] = useState<'on-track' | 'behind' | 'ahead'>('on-track');
  const [yearlyData, setYearlyData] = useState<any[]>([]);

  // Contribution Limits 2025
  const getContributionLimit = (age: number) => {
    const baseLimit = 23500;
    const catchUp50 = 7500;
    const catchUp60 = 11250;
    if (age >= 60 && age <= 63) return baseLimit + catchUp60;
    if (age >= 50) return baseLimit + catchUp50;
    return baseLimit;
  };

  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    if (hasTrackedView.current) return;
    hasTrackedView.current = true;
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, language: locale, type: "VIEW" }),
    }).catch(console.error);
  }, [locale]);

  const trackCalculation = () => {
    if (hasTrackedCalculation.current) return;
    hasTrackedCalculation.current = true;
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, language: locale, type: "CALCULATION" }),
    }).catch(console.error);
  };

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
          inputs: { currentAge, retirementAge, annualSalary, currentBalance, contributionPercent },
          results: { balanceAtRetirement: balanceAtRetirement.toFixed(2), monthlyRetirementIncome: monthlyRetirementIncome.toFixed(2) },
        }),
      });
      if (res.ok) { setSaveStatus('saved'); setTimeout(() => setSaveStatus('idle'), 2000); }
      else { setSaveStatus('error'); }
    } catch { setSaveStatus('error'); }
  };

  const handleInputChange = (setter: (value: any) => void, value: any) => { setter(value); trackCalculation(); };

  const SaveIndicator = () => {
    if (saveStatus === 'idle') return null;
    if (saveStatus === 'saving') return <span className="text-xs text-slate-400">Saving...</span>;
    if (saveStatus === 'saved') return <span className="text-xs text-blue-500">✓ Saved</span>;
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
      } catch {}
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
          body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, calculatorName: CALCULATOR_NAME, category: CALCULATOR_CATEGORY })
        });
        setIsFavorite(true);
      }
    } catch {}
    setFavoriteLoading(false);
  };

  // Main calculation
  useEffect(() => {
    const yearsToRetirement = retirementAge - currentAge;
    if (yearsToRetirement <= 0) return;

    let balance = currentBalance;
    let totalYourContrib = 0;
    let totalEmployerContrib = 0;
    let currentSalary = annualSalary;
    let maxEmployerMatchNotTaken = 0;
    const data = [];
    const effectiveReturn = (expectedReturn - planFees) / 100;

    for (let year = 1; year <= yearsToRetirement; year++) {
      const age = currentAge + year;
      const limit = includeCatchUp ? getContributionLimit(age) : getContributionLimit(30);
      
      let yourContribution = currentSalary * (contributionPercent / 100);
      yourContribution = Math.min(yourContribution, limit);
      
      const maxMatchablePercent = Math.min(contributionPercent, employerMatchLimit);
      const employerContribution = currentSalary * (maxMatchablePercent / 100) * (employerMatchPercent / 100);
      
      const maxPossibleMatch = currentSalary * (employerMatchLimit / 100) * (employerMatchPercent / 100);
      const missedMatch = maxPossibleMatch - employerContribution;
      maxEmployerMatchNotTaken += missedMatch > 0 ? missedMatch : 0;

      totalYourContrib += yourContribution;
      totalEmployerContrib += employerContribution;

      balance += yourContribution + employerContribution;
      const yearGrowth = balance * effectiveReturn;
      balance += yearGrowth;

      data.push({
        year, age,
        salary: Math.round(currentSalary),
        yourContribution: Math.round(yourContribution),
        employerContribution: Math.round(employerContribution),
        yearGrowth: Math.round(yearGrowth),
        balance: Math.round(balance),
      });

      currentSalary *= (1 + salaryIncrease / 100);
    }

    setBalanceAtRetirement(balance);
    setTotalYourContributions(totalYourContrib);
    setTotalEmployerContributions(totalEmployerContrib);
    setTotalInvestmentGrowth(balance - totalYourContrib - totalEmployerContrib - currentBalance);
    setFreeMoneyLeftOnTable(maxEmployerMatchNotTaken);
    setYearlyData(data);
    setMonthlyRetirementIncome((balance * 0.04) / 12);
    setYearsOfIncome(90 - retirementAge);

    const targetMultiplier = (retirementAge - 22) / 5;
    const projectedMultiplier = balance / annualSalary;
    if (projectedMultiplier >= targetMultiplier * 1.1) setOnTrackStatus('ahead');
    else if (projectedMultiplier >= targetMultiplier * 0.8) setOnTrackStatus('on-track');
    else setOnTrackStatus('behind');

  }, [currentAge, retirementAge, annualSalary, currentBalance, contributionPercent, employerMatchPercent, employerMatchLimit, expectedReturn, salaryIncrease, planFees, includeCatchUp]);

  const formatMoney = (value: number) => {
    const localeMap: Record<string, { locale: string; currency: string }> = {
      en: { locale: "en-US", currency: "USD" },
      es: { locale: "es-MX", currency: "MXN" },
      pt: { locale: "pt-BR", currency: "BRL" }
    };
    const config = localeMap[locale] || localeMap.en;
    return new Intl.NumberFormat(config.locale, { style: "currency", currency: config.currency, maximumFractionDigits: 0 }).format(value);
  };

  const yourPercent = (totalYourContributions / balanceAtRetirement) * 100 || 0;
  const employerPercent = (totalEmployerContributions / balanceAtRetirement) * 100 || 0;
  const growthPercent = (totalInvestmentGrowth / balanceAtRetirement) * 100 || 0;
  const initialPercent = (currentBalance / balanceAtRetirement) * 100 || 0;
  const isMaximizingMatch = contributionPercent >= employerMatchLimit;

  const defaultFaqs = [
    { question: "What is a 401(k)?", answer: "A 401(k) is an employer-sponsored retirement savings plan that allows employees to save and invest a portion of their paycheck before taxes. Many employers also offer matching contributions, which is essentially free money added to your savings." },
    { question: "How does employer matching work?", answer: "Employer matching means your company contributes additional money based on your contribution. For example, a '50% match up to 6%' means if you contribute 6% of salary, your employer adds 3%. Always contribute enough to get the full match!" },
    { question: "What are catch-up contributions?", answer: "Catch-up contributions allow people age 50+ to contribute extra beyond the standard limit. In 2025, it's $7,500 extra per year (or $11,250 if you're 60-63), on top of the $23,500 base limit." },
    { question: "What happens if I change jobs?", answer: "You can: 1) Leave money in old 401(k), 2) Roll over to new employer's 401(k), 3) Roll over to an IRA, or 4) Cash out (not recommended—you'll pay taxes and a 10% penalty if under 59½)." },
    { question: "When can I withdraw without penalty?", answer: "You can withdraw penalty-free starting at age 59½. Before that, you'll face a 10% early withdrawal penalty plus income taxes, with some exceptions for disability or leaving your job at 55+." }
  ];
  const faqs = translations?.faq || defaultFaqs;

  const financeCalcs = ["Compound Interest", "Mortgage", "Loan", "Investment", "Retirement", "Savings", "Roth IRA", "Credit Card Payoff"];
  const healthCalcs = ["BMI", "Calorie", "Body Fat", "BMR", "Macro", "TDEE", "Protein", "Ideal Weight"];

  return (
    <>
      <Header />

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
        }),
      }} />

      {/* Modal */}
      {showTableModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">401(k) Growth Schedule</h3>
              <button onClick={() => setShowTableModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="overflow-auto max-h-[50vh]">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600">Year</th>
                    <th className="px-3 py-3 text-center text-xs font-semibold text-slate-600">Age</th>
                    <th className="px-3 py-3 text-right text-xs font-semibold text-slate-600">Salary</th>
                    <th className="px-3 py-3 text-right text-xs font-semibold text-slate-600">Your Contrib</th>
                    <th className="px-3 py-3 text-right text-xs font-semibold text-slate-600">Employer</th>
                    <th className="px-3 py-3 text-right text-xs font-semibold text-slate-600">Growth</th>
                    <th className="px-3 py-3 text-right text-xs font-semibold text-slate-600">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyData.map((row) => (
                    <tr key={row.year} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-3 py-2 text-slate-900">{row.year}</td>
                      <td className="px-3 py-2 text-center text-slate-600">{row.age}</td>
                      <td className="px-3 py-2 text-right text-slate-600">{formatMoney(row.salary)}</td>
                      <td className="px-3 py-2 text-right text-blue-600">{formatMoney(row.yourContribution)}</td>
                      <td className="px-3 py-2 text-right text-blue-600">{formatMoney(row.employerContribution)}</td>
                      <td className="px-3 py-2 text-right text-purple-700">{formatMoney(row.yearGrowth)}</td>
                      <td className="px-3 py-2 text-right font-semibold text-slate-900">{formatMoney(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-200 bg-slate-50">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div><p className="text-xs text-slate-600">Your Total</p><p className="font-bold text-blue-600">{formatMoney(totalYourContributions)}</p></div>
                <div><p className="text-xs text-slate-600">Employer Total</p><p className="font-bold text-blue-600">{formatMoney(totalEmployerContributions)}</p></div>
                <div><p className="text-xs text-slate-600">Investment Growth</p><p className="font-bold text-purple-700">{formatMoney(totalInvestmentGrowth)}</p></div>
                <div><p className="text-xs text-slate-600">Final Balance</p><p className="font-bold text-slate-900">{formatMoney(balanceAtRetirement)}</p></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="pt-16">
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-6">
          <div className="container">
            <nav className="text-sm mb-4">
              <Link href={`/${locale}`} className="text-slate-600 hover:text-blue-600">Home</Link>
              <span className="mx-2 text-slate-400">/</span>
              <Link href={`/${locale}/calculators`} className="text-slate-600 hover:text-blue-600">Calculators</Link>
              <span className="mx-2 text-slate-400">/</span>
              <span className="text-slate-700">401(k)</span>
            </nav>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">💼</div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">401(k) Calculator</h1>
                  <button onClick={toggleFavorite} disabled={favoriteLoading} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                    {isFavorite ? (
                      <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    ) : (
                      <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-2 h-6">
                  <p className="text-slate-600">Plan your retirement savings with employer matching</p>
                  {saveStatus !== 'idle' && <><span className="text-slate-400">—</span><SaveIndicator /></>}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-6 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Inputs */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Your Information</h2>

                {/* Current Age */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Current Age</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input type="text" value={currentAge} onChange={(e) => handleInputChange(setCurrentAge, Number(e.target.value) || 18)}
                        className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none" />
                      <span className="text-slate-600 ml-1">years</span>
                    </div>
                  </div>
                  <input type="range" min="18" max="70" value={currentAge} onChange={(e) => handleInputChange(setCurrentAge, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                </div>

                {/* Retirement Age */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Retirement Age</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input type="text" value={retirementAge} onChange={(e) => handleInputChange(setRetirementAge, Number(e.target.value) || 55)}
                        className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none" />
                      <span className="text-slate-600 ml-1">years</span>
                    </div>
                  </div>
                  <input type="range" min="55" max="75" value={retirementAge} onChange={(e) => handleInputChange(setRetirementAge, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                </div>

                {/* Annual Salary */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Annual Salary</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input type="text" value={annualSalary.toLocaleString()} onChange={(e) => handleInputChange(setAnnualSalary, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-28 bg-transparent text-right font-bold text-blue-600 focus:outline-none" />
                    </div>
                  </div>
                  <input type="range" min="25000" max="500000" step="5000" value={annualSalary} onChange={(e) => handleInputChange(setAnnualSalary, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                </div>

                {/* Current 401(k) Balance */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Current 401(k) Balance</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input type="text" value={currentBalance.toLocaleString()} onChange={(e) => handleInputChange(setCurrentBalance, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-28 bg-transparent text-right font-bold text-blue-600 focus:outline-none" />
                    </div>
                  </div>
                  <input type="range" min="0" max="500000" step="5000" value={currentBalance} onChange={(e) => handleInputChange(setCurrentBalance, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                </div>

                {/* Contribution % */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Your Contribution</label>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                        <input type="text" value={contributionPercent} onChange={(e) => handleInputChange(setContributionPercent, Number(e.target.value) || 0)}
                          className="w-10 bg-transparent text-right font-bold text-blue-600 focus:outline-none" />
                        <span className="text-slate-600">%</span>
                      </div>
                      <span className="text-slate-600 text-sm">= {formatMoney(annualSalary * contributionPercent / 100)}/yr</span>
                    </div>
                  </div>
                  <input type="range" min="0" max="30" step="1" value={contributionPercent} onChange={(e) => handleInputChange(setContributionPercent, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                  {!isMaximizingMatch && (
                    <p className="text-amber-600 text-sm mt-2 flex items-center gap-1">
                      ⚠️ Contribute at least {employerMatchLimit}% to maximize your employer match!
                    </p>
                  )}
                </div>

                {/* Employer Match */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="font-medium text-slate-700 text-sm block mb-2">Employer Match</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2">
                      <input type="text" value={employerMatchPercent} onChange={(e) => handleInputChange(setEmployerMatchPercent, Number(e.target.value) || 0)}
                        className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none" />
                      <span className="text-slate-600 ml-1">%</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">of your contribution</p>
                  </div>
                  <div>
                    <label className="font-medium text-slate-700 text-sm block mb-2">Match Limit</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2">
                      <input type="text" value={employerMatchLimit} onChange={(e) => handleInputChange(setEmployerMatchLimit, Number(e.target.value) || 0)}
                        className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none" />
                      <span className="text-slate-600 ml-1">%</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">of your salary</p>
                  </div>
                </div>

                {/* Advanced Options */}
                <button onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full flex items-center justify-between py-3 px-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <span className="flex items-center gap-2 font-medium text-slate-700">
                    <span className="w-6 h-6 bg-slate-200 rounded flex items-center justify-center text-xs">⚙️</span>
                    Advanced Options
                  </span>
                  <svg className={`w-5 h-5 text-slate-400 transition-transform ${showAdvanced ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showAdvanced && (
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-medium text-slate-700 text-sm block mb-2">Expected Return</label>
                        <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                          <input type="text" value={expectedReturn} onChange={(e) => handleInputChange(setExpectedReturn, Number(e.target.value) || 0)}
                            className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none" />
                          <span className="text-slate-600 ml-1">%</span>
                        </div>
                      </div>
                      <div>
                        <label className="font-medium text-slate-700 text-sm block mb-2">Salary Increase/Year</label>
                        <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                          <input type="text" value={salaryIncrease} onChange={(e) => handleInputChange(setSalaryIncrease, Number(e.target.value) || 0)}
                            className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none" />
                          <span className="text-slate-600 ml-1">%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="font-medium text-slate-700 text-sm block mb-2">401(k) Plan Fees</label>
                      <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                        <input type="text" value={planFees} onChange={(e) => handleInputChange(setPlanFees, Number(e.target.value) || 0)}
                          className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none" />
                        <span className="text-slate-600 ml-1">%</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Annual expense ratio</p>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={includeCatchUp} onChange={(e) => handleInputChange(setIncludeCatchUp, e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded" />
                      <span className="text-sm text-slate-700">Include catch-up contributions (age 50+)</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Results */}
              <div>
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  {/* Status Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Balance at Retirement (age {retirementAge})</p>
                      <p className="text-4xl md:text-5xl font-bold text-blue-600">{formatMoney(balanceAtRetirement)}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      onTrackStatus === 'ahead' ? 'bg-green-100 text-green-700' :
                      onTrackStatus === 'on-track' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {onTrackStatus === 'ahead' ? '🎉 Ahead' : onTrackStatus === 'on-track' ? '✓ On Track' : '⚠️ Behind'}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 mb-6">
                    Monthly income: <strong className="text-blue-600">{formatMoney(monthlyRetirementIncome)}</strong> (4% rule)
                  </p>

                  {/* Breakdown Bar */}
                  <div className="h-6 rounded-full overflow-hidden flex mb-3">
                    <div className="bg-slate-400 transition-all" style={{ width: `${initialPercent}%` }} title="Starting Balance" />
                    <div className="bg-blue-500 transition-all" style={{ width: `${yourPercent}%` }} title="Your Contributions" />
                    <div className="bg-blue-500 transition-all" style={{ width: `${employerPercent}%` }} title="Employer Match" />
                    <div className="bg-purple-500 transition-all" style={{ width: `${growthPercent}%` }} title="Investment Growth" />
                  </div>
                  <div className="flex flex-wrap justify-between text-xs mb-6 gap-2">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 bg-slate-400 rounded-full"></span>Starting: {formatMoney(currentBalance)}</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-full"></span>You: {formatMoney(totalYourContributions)}</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-full"></span>Employer: {formatMoney(totalEmployerContributions)}</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 bg-purple-500 rounded-full"></span>Growth: {formatMoney(totalInvestmentGrowth)}</span>
                  </div>

                  {/* Warning if not maximizing match */}
                  {freeMoneyLeftOnTable > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                      <p className="text-amber-800 font-medium flex items-center gap-2">
                        💸 Free Money Left on Table: <strong className="text-amber-600">{formatMoney(freeMoneyLeftOnTable)}</strong>
                      </p>
                      <p className="text-amber-800 text-sm mt-1">
                        Increase your contribution to at least {employerMatchLimit}% to maximize your employer match!
                      </p>
                    </div>
                  )}

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-600">Your Contributions</p>
                      <p className="text-sm font-bold text-blue-600">{formatMoney(totalYourContributions)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-600">Employer Match</p>
                      <p className="text-sm font-bold text-blue-600">{formatMoney(totalEmployerContributions)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-600">Investment Growth</p>
                      <p className="text-sm font-bold text-purple-700">{formatMoney(totalInvestmentGrowth)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-600">Years of Income</p>
                      <p className="text-sm font-bold text-slate-800">{yearsOfIncome} years</p>
                    </div>
                  </div>
                </div>

                {/* View Schedule Button */}
                <button onClick={() => setShowTableModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 font-medium mb-4">
                  📅 View Growth Schedule
                </button>

                {/* Export & Save Buttons */}
                <div className={`grid ${session?.user ? 'grid-cols-3' : 'grid-cols-2'} gap-3`}>
                  {session?.user && (
                    <button onClick={saveToHistory} disabled={saveStatus === 'saving'}
                      className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">
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

            {/* Ad Block */}
            <div className="mt-8"><AdBlock slot="calculator-bottom" /></div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* Contribution Limits */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">📋 2025 Contribution Limits</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 font-semibold text-slate-700">Age Group</th>
                      <th className="text-right py-2 font-semibold text-slate-700">Max Contribution</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="py-2 text-slate-600">Under 50</td>
                      <td className="py-2 text-right font-medium text-blue-600">$23,500</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-2 text-slate-600">50-59</td>
                      <td className="py-2 text-right font-medium text-blue-600">$31,000 <span className="text-slate-400">(+$7,500)</span></td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-2 text-slate-600">60-63</td>
                      <td className="py-2 text-right font-medium text-blue-600">$34,750 <span className="text-slate-400">(+$11,250)</span></td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-600">64+</td>
                      <td className="py-2 text-right font-medium text-blue-600">$31,000 <span className="text-slate-400">(+$7,500)</span></td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-slate-400 mt-3">*Combined limit (you + employer): $70,000</p>
              </div>

              {/* Employer Match Examples */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">💰 Common Employer Match Types</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong className="text-slate-800">100% up to 3%:</strong> You put in 3%, they match 3% = 6% total</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong className="text-slate-800">50% up to 6%:</strong> You put in 6%, they match 3% = 9% total</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong className="text-slate-800">Dollar-for-dollar up to 4%:</strong> You put in 4%, they match 4% = 8% total</span>
                  </li>
                </ul>
                <p className="text-sm text-amber-600 mt-4 font-medium">⚡ Always contribute enough to get the FULL match!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Example Calculation - Full Width */}
        <section className="py-6 bg-white">
          <div className="container">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span>📊</span> Example Calculation
              </h3>
              <p className="text-slate-600 mb-4">
                Let's calculate retirement savings for a <strong>30-year-old</strong> earning <strong>$75,000/year</strong>, contributing <strong>10%</strong> with a <strong>50% employer match up to 6%</strong>, at <strong>7% annual return</strong> until age <strong>65</strong>:
              </p>
              <div className="bg-blue-50 rounded-xl p-6 mb-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="font-mono text-slate-700 text-sm space-y-1">
                    <p>Current Balance: $50,000</p>
                    <p>Your Annual Contribution: $7,500 (10%)</p>
                    <p>Employer Match: $2,250/year</p>
                  </div>
                  <div className="font-mono text-slate-700 text-sm space-y-1">
                    <p>Years to Retirement: 35</p>
                    <p>Expected Return: 7%</p>
                    <p className="text-blue-600 font-bold">Balance at 65: $1,475,835</p>
                  </div>
                </div>
              </div>
              <p className="text-slate-600">
                Your contributions: <strong>$262,500</strong> + Employer match: <strong className="text-cyan-600">$78,750 free money</strong> + Investment growth: <strong className="text-blue-600">$1,084,585</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Educational Content */}
        <section className="py-12 bg-slate-50">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* What is 401(k) */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📖 What is a 401(k)?</h2>
                  <p className="text-slate-600 mb-4">
                    A 401(k) is an employer-sponsored retirement savings plan that lets you contribute a portion of your paycheck before taxes. Your contributions and investment earnings grow tax-deferred until you withdraw them in retirement.
                  </p>
                  <p className="text-slate-600">
                    The biggest advantage? Many employers offer matching contributions—essentially free money added to your retirement savings. This match is often the best return on investment you can get, typically offering an immediate 50-100% return.
                  </p>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 Maximize Your 401(k)</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4"><span className="text-2xl">🎯</span><div><h3 className="font-semibold text-slate-900">Always Get the Full Match</h3><p className="text-slate-600">Never leave free money on the table. Contribute at least enough to get your full employer match.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">📈</span><div><h3 className="font-semibold text-slate-900">Increase Contributions Annually</h3><p className="text-slate-600">Bump up your contribution by 1% each year, especially after raises.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">⏰</span><div><h3 className="font-semibold text-slate-900">Start Early</h3><p className="text-slate-600">Time is your greatest asset. Starting at 25 vs 35 can mean hundreds of thousands more.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">💰</span><div><h3 className="font-semibold text-slate-900">Use Catch-Up Contributions</h3><p className="text-slate-600">If you're 50+, take advantage of extra contribution limits.</p></div></div>
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

              {/* Sidebar */}
              <div className="space-y-6">
                <AdBlock slot="calculator-sidebar" />

                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">💰</span>
                    Financial Calculators
                  </h3>
                  <div className="space-y-2">
                    {financeCalcs.map((calc) => (
                      <Link key={calc} href={`/${locale}/${calc.toLowerCase().replace(/ /g, "-")}-calculator`}
                        className="block text-blue-600 hover:text-blue-800 hover:underline text-sm">{calc}</Link>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-sm">💪</span>
                    Health Calculators
                  </h3>
                  <div className="space-y-2">
                    {healthCalcs.map((calc) => (
                      <Link key={calc} href={`/${locale}/${calc.toLowerCase().replace(/ /g, "-")}-calculator`}
                        className="block text-blue-600 hover:text-blue-800 hover:underline text-sm">{calc}</Link>
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
