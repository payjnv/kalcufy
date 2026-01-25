"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import AdBlock from "@/components/ads/AdBlock";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

const CALCULATOR_SLUG = "roth-ira-calculator";
const CALCULATOR_NAME = "Roth IRA Calculator";
const CALCULATOR_CATEGORY = "finance";

export default function RothIRACalculator() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // Calculator state - Basic
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentBalance, setCurrentBalance] = useState(10000);
  const [annualContribution, setAnnualContribution] = useState(7000);
  const [expectedReturn, setExpectedReturn] = useState(7);
  const [showTableModal, setShowTableModal] = useState(false);
  
  // Advanced state
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [taxYear, setTaxYear] = useState<'2025' | '2026'>('2026');
  const [filingStatus, setFilingStatus] = useState<'single' | 'married' | 'marriedSeparate'>('single');
  const [annualIncome, setAnnualIncome] = useState(0);
  const [marginalTaxRate, setMarginalTaxRate] = useState(22);
  const [maximizeContributions, setMaximizeContributions] = useState(false);

  // Results
  const [futureValue, setFutureValue] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [taxSavings, setTaxSavings] = useState(0);
  const [taxableAccountValue, setTaxableAccountValue] = useState(0);
  const [eligibleContribution, setEligibleContribution] = useState(7500);
  const [contributionStatus, setContributionStatus] = useState<'full' | 'partial' | 'ineligible'>('full');
  const [yearlyData, setYearlyData] = useState<any[]>([]);

  // Favorites state
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Contribution limits
  const contributionLimits = {
    '2025': { under50: 7000, over50: 8000, catchUp: 1000 },
    '2026': { under50: 7500, over50: 8600, catchUp: 1100 }
  };

  // Income limits for 2025 and 2026
  const incomeLimits = {
    '2025': {
      single: { fullLimit: 150000, phaseOutEnd: 165000 },
      married: { fullLimit: 236000, phaseOutEnd: 246000 },
      marriedSeparate: { fullLimit: 0, phaseOutEnd: 10000 }
    },
    '2026': {
      single: { fullLimit: 153000, phaseOutEnd: 168000 },
      married: { fullLimit: 242000, phaseOutEnd: 252000 },
      marriedSeparate: { fullLimit: 0, phaseOutEnd: 10000 }
    }
  };

  // Track view on page load
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
      const res = await fetch("/api/history", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, calculatorName: CALCULATOR_NAME, inputs: { currentAge, retirementAge, currentBalance, annualContribution, expectedReturn }, results: { futureValue: futureValue.toFixed(0), totalContributions: totalContributions.toFixed(0), totalEarnings: totalEarnings.toFixed(0) } }) });
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

  // Calculate eligible contribution based on income
  const calculateEligibleContribution = () => {
    const limits = contributionLimits[taxYear];
    const baseLimit = currentAge >= 50 ? limits.over50 : limits.under50;
    
    if (annualIncome === 0) {
      setEligibleContribution(baseLimit);
      setContributionStatus('full');
      return baseLimit;
    }

    const incomeLimit = incomeLimits[taxYear][filingStatus];
    
    if (annualIncome < incomeLimit.fullLimit) {
      setEligibleContribution(baseLimit);
      setContributionStatus('full');
      return baseLimit;
    } else if (annualIncome >= incomeLimit.phaseOutEnd) {
      setEligibleContribution(0);
      setContributionStatus('ineligible');
      return 0;
    } else {
      const phaseOutRange = incomeLimit.phaseOutEnd - incomeLimit.fullLimit;
      const overLimit = annualIncome - incomeLimit.fullLimit;
      const reductionRatio = overLimit / phaseOutRange;
      const reducedLimit = Math.round(baseLimit * (1 - reductionRatio));
      setEligibleContribution(reducedLimit);
      setContributionStatus('partial');
      return reducedLimit;
    }
  };

  // Calculate
  useEffect(() => {
    const eligible = calculateEligibleContribution();
    const years = retirementAge - currentAge;
    if (years <= 0) return;

    const effectiveContribution = maximizeContributions ? eligible : Math.min(annualContribution, eligible);
    const rate = expectedReturn / 100;

    let balance = currentBalance;
    let contributions = currentBalance;
    const data = [];

    for (let i = 1; i <= years; i++) {
      const yearContribution = currentAge + i - 1 >= 50 
        ? Math.min(effectiveContribution, contributionLimits[taxYear].over50)
        : Math.min(effectiveContribution, contributionLimits[taxYear].under50);
      
      balance = balance * (1 + rate) + yearContribution;
      contributions += yearContribution;
      
      data.push({
        year: i,
        age: currentAge + i,
        contribution: yearContribution,
        totalContributions: contributions,
        earnings: balance - contributions,
        balance: balance
      });
    }

    const earnings = balance - contributions;
    
    // Calculate taxable account comparison
    const taxRate = marginalTaxRate / 100;
    let taxableBalance = currentBalance;
    for (let i = 1; i <= years; i++) {
      const yearContribution = currentAge + i - 1 >= 50 
        ? Math.min(effectiveContribution, contributionLimits[taxYear].over50)
        : Math.min(effectiveContribution, contributionLimits[taxYear].under50);
      const afterTaxReturn = rate * (1 - taxRate * 0.5);
      taxableBalance = taxableBalance * (1 + afterTaxReturn) + yearContribution;
    }

    setFutureValue(balance);
    setTotalContributions(contributions);
    setTotalEarnings(earnings);
    setTaxableAccountValue(taxableBalance);
    setTaxSavings(balance - taxableBalance);
    setYearlyData(data);
  }, [currentAge, retirementAge, currentBalance, annualContribution, expectedReturn, taxYear, filingStatus, annualIncome, marginalTaxRate, maximizeContributions]);

  // Format money helper
  const formatMoney = (value: number) => {
    const localeMap: Record<string, { locale: string; currency: string }> = {
      en: { locale: "en-US", currency: "USD" },
      es: { locale: "es-MX", currency: "MXN" },
      pt: { locale: "pt-BR", currency: "BRL" }
    };
    const config = localeMap[locale] || localeMap.en;
    return new Intl.NumberFormat(config.locale, {
      style: "currency",
      currency: config.currency,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // FAQ data
  const defaultFaqs = [
    { question: "What is a Roth IRA?", answer: "A Roth IRA is a retirement account where you contribute after-tax dollars. Your investments grow tax-free, and qualified withdrawals in retirement are also tax-free. It's named after Senator William Roth who helped create it." },
    { question: "What are the contribution limits?", answer: "For 2026, the limit is $7,500 if you're under 50, and $8,600 if you're 50 or older (includes $1,100 catch-up contribution). These limits are per person and may increase annually for inflation." },
    { question: "Who is eligible for a Roth IRA?", answer: "You must have earned income (wages, self-employment) and your modified adjusted gross income (MAGI) must be below certain limits. For 2026, single filers begin phasing out at $153,000 and married filing jointly at $242,000." },
    { question: "When can I withdraw from a Roth IRA?", answer: "You can withdraw your contributions anytime tax and penalty-free. For earnings, you typically need to be 59½ and have had the account for 5 years for tax-free withdrawal. There are exceptions for first-time home purchase and other situations." },
    { question: "Roth IRA vs Traditional IRA - which is better?", answer: "If you expect to be in a higher tax bracket in retirement, Roth is typically better. If you need a tax deduction now and expect lower taxes later, Traditional may be better. Many people benefit from having both types." }
  ];
  const faqs = translations?.faq || defaultFaqs;

  // Categories
  const financeCalcs = ["Mortgage", "Loan", "Compound Interest", "Auto Loan", "Retirement", "Personal Loan", "401K", "Savings", "Investment", "Credit Card Payoff"];
  const healthCalcs = ["BMI", "Calorie", "Body Fat", "BMR", "Macro", "TDEE", "Protein", "Ideal Weight"];

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

      {/* Year-by-Year Growth Modal */}
      {showTableModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">{t("calculator.growth.title", "Year-by-Year Growth")}</h3>
              <button onClick={() => setShowTableModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="overflow-auto max-h-[50vh]">
              <table className="w-full">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">{t("calculator.table.year", "Year")}</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">{t("calculator.table.age", "Age")}</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">{t("calculator.table.contribution", "Contribution")}</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">{t("calculator.table.totalContributions", "Total Contributions")}</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">{t("calculator.table.earnings", "Earnings")}</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">{t("calculator.table.balance", "Balance")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {yearlyData.map((row, i) => (
                    <tr key={row.year} className={i === yearlyData.length - 1 ? "bg-blue-50" : ""}>
                      <td className="px-4 py-3 font-medium">Year {row.year}</td>
                      <td className="px-4 py-3 text-center text-slate-600">{row.age}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{formatMoney(row.contribution)}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{formatMoney(row.totalContributions)}</td>
                      <td className="px-4 py-3 text-right text-cyan-600">{formatMoney(row.earnings)}</td>
                      <td className="px-4 py-3 text-right font-semibold">{formatMoney(row.balance)}</td>
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
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-6">
          <div className="container">
            <nav className="text-sm mb-4">
              <Link href={`/${locale}`} className="text-slate-600 hover:text-blue-600">{t("common.home", "Home")}</Link>
              <span className="mx-2 text-slate-400">/</span>
              <Link href={`/${locale}/calculators`} className="text-slate-600 hover:text-blue-600">{t("common.calculators", "Calculators")}</Link>
              <span className="mx-2 text-slate-400">/</span>
              <span className="text-slate-700">{t("calculator.breadcrumb", "Roth IRA")}</span>
            </nav>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">🏦</div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{t("calculator.title", "Roth IRA Calculator")}</h1>
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
                  <p className="text-slate-600">{t("calculator.subtitle", "Estimate your tax-free retirement savings growth")}</p>
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
                <h2 className="text-xl font-bold text-slate-900 mb-6">{t("calculator.details", "Your Roth IRA Details")}</h2>

                {/* Current Age */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{t("calculator.inputs.currentAge", "Current Age")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        type="text"
                        value={currentAge}
                        onChange={(e) => handleInputChange(setCurrentAge, Number(e.target.value) || 0)}
                        className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                      <span className="text-slate-600 ml-1">yrs</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="70"
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
                    <label className="font-medium text-slate-700">{t("calculator.inputs.retirementAge", "Retirement Age")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        type="text"
                        value={retirementAge}
                        onChange={(e) => handleInputChange(setRetirementAge, Number(e.target.value) || 0)}
                        className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                      <span className="text-slate-600 ml-1">yrs</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={currentAge + 1}
                    max="80"
                    value={retirementAge}
                    onChange={(e) => handleInputChange(setRetirementAge, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>{currentAge + 1}</span>
                    <span>80</span>
                  </div>
                </div>

                {/* Current Balance */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{t("calculator.inputs.currentBalance", "Current Roth IRA Balance")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input
                        type="text"
                        value={currentBalance.toLocaleString()}
                        onChange={(e) => handleInputChange(setCurrentBalance, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-24 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    step="1000"
                    value={currentBalance}
                    onChange={(e) => handleInputChange(setCurrentBalance, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>$0</span>
                    <span>$500,000</span>
                  </div>
                </div>

                {/* Annual Contribution */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{t("calculator.inputs.annualContribution", "Annual Contribution")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input
                        type="text"
                        value={annualContribution.toLocaleString()}
                        onChange={(e) => handleInputChange(setAnnualContribution, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-20 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={contributionLimits[taxYear][currentAge >= 50 ? 'over50' : 'under50']}
                    step="100"
                    value={annualContribution}
                    onChange={(e) => handleInputChange(setAnnualContribution, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>$0</span>
                    <span>${contributionLimits[taxYear][currentAge >= 50 ? 'over50' : 'under50'].toLocaleString()} max</span>
                  </div>
                  {annualContribution > eligibleContribution && contributionStatus !== 'full' && (
                    <p className="text-xs text-amber-600 mt-1">⚠️ Based on your income, you can only contribute ${eligibleContribution.toLocaleString()}</p>
                  )}
                </div>

                {/* Expected Return */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{t("calculator.inputs.expectedReturn", "Expected Annual Return")}</label>
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
                    max="15"
                    step="0.5"
                    value={expectedReturn}
                    onChange={(e) => handleInputChange(setExpectedReturn, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>1%</span>
                    <span>15%</span>
                  </div>
                </div>

                {/* Advanced Options - Collapsible */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => handleInputChange(setShowAdvanced, !showAdvanced)}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">⚙️</span>
                      <span className="font-semibold text-slate-700">{t("calculator.advanced.title", "Income & Tax Options")}</span>
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
                      {/* Tax Year */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">{t("calculator.advanced.taxYear", "Tax Year")}</label>
                        <div className="grid grid-cols-2 gap-2">
                          {(['2025', '2026'] as const).map((year) => (
                            <button
                              key={year}
                              onClick={() => handleInputChange(setTaxYear, year)}
                              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                                taxYear === year ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                              }`}
                            >
                              {year}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Filing Status */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">{t("calculator.advanced.filingStatus", "Filing Status")}</label>
                        <div className="grid grid-cols-1 gap-2">
                          {[
                            { value: 'single', label: 'Single' },
                            { value: 'married', label: 'Married Filing Jointly' },
                            { value: 'marriedSeparate', label: 'Married Filing Separately' }
                          ].map((option) => (
                            <button
                              key={option.value}
                              onClick={() => handleInputChange(setFilingStatus, option.value as any)}
                              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                                filingStatus === option.value ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Annual Income */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">{t("calculator.advanced.annualIncome", "Annual Income (MAGI)")}</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <span className="px-3 py-2 bg-slate-50 text-slate-600 border-r border-slate-200">$</span>
                          <input
                            type="text"
                            value={annualIncome === 0 ? "" : annualIncome.toLocaleString()}
                            onChange={(e) => handleInputChange(setAnnualIncome, Number(e.target.value.replace(/,/g, "")) || 0)}
                            placeholder="0"
                            className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none"
                          />
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{t("calculator.advanced.incomeHint", "Enter to check eligibility limits")}</p>
                      </div>

                      {/* Marginal Tax Rate */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">{t("calculator.advanced.taxRate", "Marginal Tax Rate")}</label>
                        <div className="grid grid-cols-4 gap-2">
                          {[10, 12, 22, 24, 32, 35, 37].map((rate) => (
                            <button
                              key={rate}
                              onClick={() => handleInputChange(setMarginalTaxRate, rate)}
                              className={`py-2 rounded-lg text-sm font-medium ${
                                marginalTaxRate === rate ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              {rate}%
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Maximize Toggle */}
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-slate-700">{t("calculator.advanced.maximize", "Maximize contributions each year")}</span>
                        <button
                          onClick={() => handleInputChange(setMaximizeContributions, !maximizeContributions)}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            maximizeContributions ? "bg-blue-600" : "bg-slate-300"
                          }`}
                        >
                          <span
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              maximizeContributions ? "right-1" : "left-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Results */}
              <div>
                {/* Results Card - TEMPLATE V2 STYLE */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  <p className="text-sm text-slate-600 mb-1">{t("calculator.results.futureValue", "Balance at Retirement")} (Age {retirementAge})</p>
                  <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{formatMoney(futureValue)}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">{t("calculator.results.totalContributions", "Total Contributions")}</p>
                      <p className="text-xl font-bold text-slate-800">{formatMoney(totalContributions)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">{t("calculator.results.totalEarnings", "Total Earnings")}</p>
                      <p className="text-xl font-bold text-cyan-600">{formatMoney(totalEarnings)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">{t("calculator.results.yearsToGrow", "Years to Grow")}</p>
                      <p className="text-xl font-bold text-slate-800">{retirementAge - currentAge} years</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">{t("calculator.results.monthlyContribution", "Monthly Contribution")}</p>
                      <p className="text-xl font-bold text-slate-800">{formatMoney(Math.min(annualContribution, eligibleContribution) / 12)}</p>
                    </div>
                  </div>
                </div>

                {/* Tax Advantage Comparison */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span>🎯</span>
                    {t("calculator.results.taxAdvantage", "Roth IRA Tax Advantage")}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                        <span className="text-slate-600">Roth IRA (Tax-Free)</span>
                      </div>
                      <span className="font-bold text-blue-600">{formatMoney(futureValue)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-slate-400"></span>
                        <span className="text-slate-600">Taxable Account</span>
                      </div>
                      <span className="font-bold text-slate-600">{formatMoney(taxableAccountValue)}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between items-center">
                      <span className="font-semibold text-slate-900">{t("calculator.results.taxSavings", "Your Tax Savings")}</span>
                      <span className="font-bold text-lg text-cyan-600">+{formatMoney(taxSavings)}</span>
                    </div>
                  </div>
                </div>

                {/* Growth Breakdown - TEMPLATE V2 STYLE */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">{t("calculator.results.growthBreakdown", "Growth Breakdown")}</h3>
                  <div className="h-8 rounded-full overflow-hidden flex">
                    <div
                      className="bg-blue-600 transition-all"
                      style={{ width: `${(totalContributions / futureValue) * 100}%` }}
                    />
                    <div
                      className="bg-amber-400 transition-all"
                      style={{ width: `${(totalEarnings / futureValue) * 100}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-blue-600"></span>
                      <span className="text-slate-600">Contributions ({Math.round((totalContributions / futureValue) * 100)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-amber-400"></span>
                      <span className="text-slate-600">Earnings ({Math.round((totalEarnings / futureValue) * 100)}%)</span>
                    </div>
                  </div>
                </div>

                {/* Contribution Limits Info */}
                <div className="bg-blue-50 rounded-2xl border border-blue-200 p-4 mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <span>📋</span>
                    {taxYear} Contribution Limits
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-blue-600">Under 50:</p>
                      <p className="font-bold text-blue-800">${contributionLimits[taxYear].under50.toLocaleString()}/year</p>
                    </div>
                    <div>
                      <p className="text-blue-600">Age 50+:</p>
                      <p className="font-bold text-blue-800">${contributionLimits[taxYear].over50.toLocaleString()}/year</p>
                    </div>
                  </div>
                  <p className="text-xs text-blue-600 mt-2">Catch-up contribution: +${contributionLimits[taxYear].catchUp.toLocaleString()} for those 50+</p>
                </div>

                {/* View Growth Table Button */}
                <button
                  onClick={() => setShowTableModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 font-medium mb-4"
                >
                  📅 {t("calculator.buttons.viewGrowth", "View Year-by-Year Growth")}
                </button>

                {/* Export & Save Buttons */}
                <div className={`grid ${session?.user ? 'grid-cols-3' : 'grid-cols-2'} gap-3`}>
                  {session?.user && (
                    <button onClick={saveToHistory} disabled={saveStatus === 'saving'} className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">
                      💾 {saveStatus === 'saving' ? '...' : t("calculator.buttons.save", "Save")}
                    </button>
                  )}
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">
                    📄 {t("calculator.buttons.pdf", "PDF")} <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{t("common.pro", "PRO")}</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">
                    📊 {t("calculator.buttons.excel", "Excel")} <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{t("common.pro", "PRO")}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Ad Rectangle - Between Calculator and Info Cards */}
            <div className="mt-8">
              <AdBlock slot="calculator-bottom" />
            </div>

            {/* Info Cards - BELOW CALCULATOR */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* Roth IRA Benefits */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">💡 {t("info.benefits.title", "Roth IRA Benefits")}</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Tax-free growth:</strong> Investments grow without being taxed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Tax-free withdrawals:</strong> Qualified distributions are 100% tax-free</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>No RMDs:</strong> No required minimum distributions during your lifetime</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Flexible access:</strong> Withdraw contributions anytime, penalty-free</span>
                  </li>
                </ul>
              </div>

              {/* Income Limits Table */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">📊 {t("info.limits.title", "2026 Income Limits")}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 font-semibold text-slate-700">Filing Status</th>
                        <th className="text-right py-2 font-semibold text-slate-700">Full</th>
                        <th className="text-right py-2 font-semibold text-slate-700">Phase-out</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">Single</td>
                        <td className="py-2 text-right font-medium text-blue-600">&lt; $153K</td>
                        <td className="py-2 text-right font-medium text-amber-600">$153K-$168K</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">Married Filing Jointly</td>
                        <td className="py-2 text-right font-medium text-blue-600">&lt; $242K</td>
                        <td className="py-2 text-right font-medium text-amber-600">$242K-$252K</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-slate-600">Married Separate</td>
                        <td className="py-2 text-right font-medium text-blue-600">$0</td>
                        <td className="py-2 text-right font-medium text-amber-600">$0-$10K</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-400 mt-3">*Based on Modified Adjusted Gross Income (MAGI)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Educational Content with Sidebar */}
        <section className="py-12 bg-slate-50">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content - LEFT/CENTER (2 columns) */}
              <div className="lg:col-span-2 space-y-6">
                {/* What is a Roth IRA */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📖 {t("education.title", "What is a Roth IRA?")}</h2>
                  <p className="text-slate-600 mb-4">
                    A Roth IRA is a retirement account funded with after-tax dollars. Your investments grow tax-free, and qualified withdrawals in retirement are also tax-free. Named after Senator William Roth who helped create it in 1997.
                  </p>
                  <p className="text-slate-600">
                    Unlike traditional IRAs where you get a tax deduction now but pay taxes later, with a Roth IRA you contribute after-tax dollars and never pay taxes on qualified withdrawals.
                  </p>
                </div>

                {/* Formula */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📐 {t("education.formula.title", "The Growth Formula")}</h2>
                  <div className="bg-slate-100 rounded-xl p-6 mb-6 text-center">
                    <p className="text-xl font-mono font-bold text-slate-800">FV = PV × (1+r)<sup>n</sup> + PMT × [((1+r)<sup>n</sup> - 1) / r]</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-12">FV</span><span className="text-slate-600">= Future Value (balance at retirement)</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-12">PV</span><span className="text-slate-600">= Present Value (current balance)</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-12">r</span><span className="text-slate-600">= Expected annual return rate</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-12">n</span><span className="text-slate-600">= Number of years until retirement</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-12">PMT</span><span className="text-slate-600">= Annual contribution</span></div>
                  </div>
                </div>

                {/* Example */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📊 {t("education.example.title", "Example Calculation")}</h2>
                  <p className="text-slate-600 mb-4">
                    Let's say you're <strong>30 years old</strong> with <strong>$10,000</strong> saved, contributing <strong>$7,000/year</strong> until age <strong>65</strong>, with <strong>7% returns</strong>:
                  </p>
                  <div className="bg-blue-50 rounded-xl p-6 mb-4">
                    <p className="font-mono text-slate-700">
                      Starting Balance: $10,000<br />
                      Years to Retirement: 35 years<br />
                      Annual Contribution: $7,000<br />
                      Expected Return: 7%<br />
                      <strong className="text-blue-600">Final Balance: ~$1,066,000</strong>
                    </p>
                  </div>
                  <p className="text-slate-600">
                    Of that total, you'd contribute about <strong>$255,000</strong>, with the remaining <strong>$811,000</strong> coming from tax-free investment growth!
                  </p>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 {t("education.tips.title", "Roth IRA Strategies")}</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4"><span className="text-2xl">🎯</span><div><h3 className="font-semibold text-slate-900">Start Early</h3><p className="text-slate-600">Time is your greatest ally. Starting at 25 vs 35 could mean hundreds of thousands more.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">💰</span><div><h3 className="font-semibold text-slate-900">Max Out Contributions</h3><p className="text-slate-600">Contribute the maximum each year to take full advantage of tax-free growth.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">📈</span><div><h3 className="font-semibold text-slate-900">Invest for Growth</h3><p className="text-slate-600">Since gains are tax-free, put your highest-growth investments in your Roth.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">🚪</span><div><h3 className="font-semibold text-slate-900">Consider Backdoor Roth</h3><p className="text-slate-600">If over income limits, explore the backdoor Roth IRA strategy.</p></div></div>
                  </div>
                </div>

                {/* FAQ */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">❓ {t("education.faqTitle", "Frequently Asked Questions")}</h2>
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
                    {t("sidebar.financeTitle", "Financial Calculators")}
                  </h3>
                  <div className="space-y-2">
                    {financeCalcs.map((calc) => (
                      <Link
                        key={calc}
                        href={`/${locale}/${calc.toLowerCase().replace(/ /g, "-")}-calculator`}
                        className="block text-blue-600 hover:text-blue-800 hover:underline text-sm"
                      >
                        {calc} Calculator
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Health Categories */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-sm">💪</span>
                    {t("sidebar.healthTitle", "Health Calculators")}
                  </h3>
                  <div className="space-y-2">
                    {healthCalcs.map((calc) => (
                      <Link
                        key={calc}
                        href={`/${locale}/${calc.toLowerCase().replace(/ /g, "-")}-calculator`}
                        className="block text-blue-600 hover:text-blue-800 hover:underline text-sm"
                      >
                        {calc} Calculator
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
