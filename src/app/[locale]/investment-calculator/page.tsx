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
// CONFIGURACIÓN - CAMBIAR PARA CADA CALCULADORA
// ============================================
const CALCULATOR_SLUG = "investment-calculator";
const CALCULATOR_NAME = "Investment Calculator";
const CALCULATOR_CATEGORY = "finance";
// ============================================

export default function InvestmentCalculator() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);

  // ========== TRACKING REFS ==========
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // Calculator state
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [investmentYears, setInvestmentYears] = useState(20);
  const [compoundFrequency, setCompoundFrequency] = useState<"monthly" | "quarterly" | "annually">("monthly");
  const [contributionTiming, setContributionTiming] = useState<"beginning" | "end">("end");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [inflationRate, setInflationRate] = useState(3);
  const [taxRate, setTaxRate] = useState(15);
  const [annualContributionIncrease, setAnnualContributionIncrease] = useState(0);
  const [showTableModal, setShowTableModal] = useState(false);

  // Results
  const [futureValue, setFutureValue] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [inflationAdjustedValue, setInflationAdjustedValue] = useState(0);
  const [afterTaxValue, setAfterTaxValue] = useState(0);
  const [effectiveAnnualRate, setEffectiveAnnualRate] = useState(0);
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
          inputs: { initialInvestment, monthlyContribution, annualReturn, investmentYears, compoundFrequency },
          results: { 
            futureValue: futureValue.toFixed(2), 
            totalContributions: totalContributions.toFixed(2),
            totalInterest: totalInterest.toFixed(2)
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
    if (saveStatus === 'saving') return <span className="text-xs text-slate-400">{t("calculator.saving.saving", "Saving...")}</span>;
    if (saveStatus === 'saved') return <span className="text-xs text-green-500">✓ {t("calculator.saving.saved", "Saved")}</span>;
    if (saveStatus === 'error') return <span className="text-xs text-red-500">{t("calculator.saving.error", "Error saving")}</span>;
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
    // Compound frequency mapping
    const periodsPerYear = compoundFrequency === "monthly" ? 12 : compoundFrequency === "quarterly" ? 4 : 1;
    const ratePerPeriod = (annualReturn / 100) / periodsPerYear;
    const totalPeriods = investmentYears * periodsPerYear;
    const contributionPerPeriod = (monthlyContribution * 12) / periodsPerYear;

    // Future Value calculation with compound interest
    // FV = P(1+r)^n + PMT × [((1+r)^n - 1) / r] × (1+r*timing)
    // timing = 1 for beginning, 0 for end
    const timingMultiplier = contributionTiming === "beginning" ? (1 + ratePerPeriod) : 1;
    
    let fv = initialInvestment * Math.pow(1 + ratePerPeriod, totalPeriods);
    
    if (ratePerPeriod > 0) {
      const contributionFV = contributionPerPeriod * ((Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod) * timingMultiplier;
      fv += contributionFV;
    } else {
      fv += contributionPerPeriod * totalPeriods;
    }

    // Handle contribution increase per year
    if (annualContributionIncrease > 0) {
      // Recalculate with increasing contributions
      let balance = initialInvestment;
      let totalContrib = initialInvestment;
      let currentMonthlyContribution = monthlyContribution;
      
      for (let year = 1; year <= investmentYears; year++) {
        for (let period = 0; period < periodsPerYear; period++) {
          if (contributionTiming === "beginning") {
            balance += (currentMonthlyContribution * 12) / periodsPerYear;
            totalContrib += (currentMonthlyContribution * 12) / periodsPerYear;
          }
          balance *= (1 + ratePerPeriod);
          if (contributionTiming === "end") {
            balance += (currentMonthlyContribution * 12) / periodsPerYear;
            totalContrib += (currentMonthlyContribution * 12) / periodsPerYear;
          }
        }
        currentMonthlyContribution *= (1 + annualContributionIncrease / 100);
      }
      fv = balance;
      setTotalContributions(totalContrib);
    } else {
      const contributions = initialInvestment + (monthlyContribution * 12 * investmentYears);
      setTotalContributions(contributions);
    }

    const totalContrib = annualContributionIncrease > 0 ? totalContributions : initialInvestment + (monthlyContribution * 12 * investmentYears);
    const interest = fv - totalContrib;

    setFutureValue(fv);
    setTotalInterest(interest);

    // Inflation-adjusted value
    const inflationFactor = Math.pow(1 + inflationRate / 100, investmentYears);
    setInflationAdjustedValue(fv / inflationFactor);

    // After-tax value (on gains only)
    const taxOnGains = interest * (taxRate / 100);
    setAfterTaxValue(fv - taxOnGains);

    // Effective Annual Rate (considering compounding)
    const ear = Math.pow(1 + (annualReturn / 100) / periodsPerYear, periodsPerYear) - 1;
    setEffectiveAnnualRate(ear * 100);

    // Generate yearly data
    let data = [];
    let balance = initialInvestment;
    let cumContributions = initialInvestment;
    let cumInterest = 0;
    let currentMonthly = monthlyContribution;

    for (let year = 1; year <= investmentYears; year++) {
      const startBalance = balance;
      const yearContribution = currentMonthly * 12;
      
      for (let period = 0; period < periodsPerYear; period++) {
        if (contributionTiming === "beginning") {
          balance += yearContribution / periodsPerYear;
        }
        const periodInterest = balance * ratePerPeriod;
        balance += periodInterest;
        if (contributionTiming === "end") {
          balance += yearContribution / periodsPerYear;
        }
      }
      
      cumContributions += yearContribution;
      const yearInterest = balance - startBalance - yearContribution;
      cumInterest += yearInterest;

      data.push({
        year,
        contributions: Math.round(cumContributions),
        interest: Math.round(cumInterest),
        balance: Math.round(balance),
        yearContribution: Math.round(yearContribution),
        yearInterest: Math.round(yearInterest),
      });

      currentMonthly *= (1 + annualContributionIncrease / 100);
    }
    setYearlyData(data);

  }, [initialInvestment, monthlyContribution, annualReturn, investmentYears, compoundFrequency, contributionTiming, inflationRate, taxRate, annualContributionIncrease]);

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

  // Percentages for breakdown bar
  const contributionsPercent = (totalContributions / futureValue) * 100 || 0;
  const interestPercent = (totalInterest / futureValue) * 100 || 0;

  // FAQ data
  const defaultFaqs = [
    { question: "What is compound interest?", answer: "Compound interest is when you earn interest not only on your initial investment but also on the accumulated interest from previous periods. This creates a snowball effect where your money grows exponentially over time. The more frequently interest compounds, the faster your investment grows." },
    { question: "What return rate should I use?", answer: "Historical S&P 500 returns average around 10% annually before inflation. A more conservative estimate of 6-7% accounts for inflation and market volatility. For savings accounts or CDs, use their stated APY. Always consider your specific investment type and risk tolerance." },
    { question: "How does compound frequency affect returns?", answer: "More frequent compounding leads to higher returns. Daily compounding earns slightly more than monthly, which earns more than annually. For most investments, monthly compounding is standard. The difference becomes more significant with larger amounts and longer time periods." },
    { question: "Should I invest at the beginning or end of the period?", answer: "Investing at the beginning of each period (monthly/yearly) gives your money more time to grow, resulting in higher returns. This is sometimes called 'beginning of period' or 'annuity due' timing. The difference can be substantial over long investment horizons." },
    { question: "How does inflation affect my investment?", answer: "Inflation reduces the purchasing power of your money over time. A 3% inflation rate means $100 today will only buy about $74 worth of goods in 10 years. That's why we show the inflation-adjusted value - it represents what your future balance will be worth in today's dollars." }
  ];
  const faqs = translations?.faq || defaultFaqs;

  // Categories
  const financeCalcs = [
    "Compound Interest", "Mortgage", "Loan", "Auto Loan", "Retirement",
    "Savings", "401K", "Credit Card Payoff", "Interest", "Amortization"
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

      {/* Yearly Breakdown Modal */}
      {showTableModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">{t("calculator.modal.title", "Investment Growth Schedule")}</h3>
              <button onClick={() => setShowTableModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="overflow-auto max-h-[50vh]">
              <table className="w-full">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">{t("calculator.modal.year", "Year")}</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">{t("calculator.modal.contribution", "Year Contribution")}</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">{t("calculator.modal.interest", "Year Interest")}</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">{t("calculator.modal.balance", "Balance")}</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyData.map((row) => (
                    <tr key={row.year} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-900">{row.year}</td>
                      <td className="px-4 py-3 text-right text-blue-600">{formatMoney(row.yearContribution)}</td>
                      <td className="px-4 py-3 text-right text-green-600">{formatMoney(row.yearInterest)}</td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-900">{formatMoney(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-200 bg-slate-50">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-slate-600">{t("calculator.modal.totalContributions", "Total Contributions")}</p>
                  <p className="font-bold text-blue-600">{formatMoney(totalContributions)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600">{t("calculator.modal.totalInterest", "Total Interest")}</p>
                  <p className="font-bold text-green-600">{formatMoney(totalInterest)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600">{t("calculator.modal.finalBalance", "Final Balance")}</p>
                  <p className="font-bold text-slate-900">{formatMoney(futureValue)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-6">
          <div className="container">
            <nav className="text-sm mb-4">
              <Link href={`/${locale}`} className="text-slate-600 hover:text-blue-600">{t("common.home", "Home")}</Link>
              <span className="mx-2 text-slate-400">/</span>
              <Link href={`/${locale}/calculators`} className="text-slate-600 hover:text-blue-600">{t("common.calculators", "Calculators")}</Link>
              <span className="mx-2 text-slate-400">/</span>
              <span className="text-slate-700">{t("calculator.breadcrumb", "Investment")}</span>
            </nav>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">📈</div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{t("calculator.title", "Investment Calculator")}</h1>
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
                  <p className="text-slate-600">{t("calculator.subtitle", "Calculate your investment growth over time")}</p>
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
                <h2 className="text-xl font-bold text-slate-900 mb-6">{t("calculator.investmentDetails", "Investment Details")}</h2>

                {/* Initial Investment */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{t("calculator.inputs.initialInvestment", "Initial Investment")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input
                        type="text"
                        value={initialInvestment.toLocaleString()}
                        onChange={(e) => handleInputChange(setInitialInvestment, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-28 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    step="1000"
                    value={initialInvestment}
                    onChange={(e) => handleInputChange(setInitialInvestment, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>$0</span>
                    <span>$500K</span>
                  </div>
                </div>

                {/* Monthly Contribution */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{t("calculator.inputs.monthlyContribution", "Monthly Contribution")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input
                        type="text"
                        value={monthlyContribution.toLocaleString()}
                        onChange={(e) => handleInputChange(setMonthlyContribution, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-24 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
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

                {/* Annual Return Rate */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{t("calculator.inputs.annualReturn", "Expected Annual Return")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        type="text"
                        value={annualReturn}
                        onChange={(e) => handleInputChange(setAnnualReturn, Number(e.target.value) || 0)}
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
                    value={annualReturn}
                    onChange={(e) => handleInputChange(setAnnualReturn, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>1%</span>
                    <span>15%</span>
                  </div>
                </div>

                {/* Investment Years */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{t("calculator.inputs.investmentYears", "Investment Period")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        type="text"
                        value={investmentYears}
                        onChange={(e) => handleInputChange(setInvestmentYears, Number(e.target.value) || 1)}
                        className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                      <span className="text-slate-600 ml-1">{t("calculator.inputs.years", "years")}</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={investmentYears}
                    onChange={(e) => handleInputChange(setInvestmentYears, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>1 {t("calculator.inputs.year", "year")}</span>
                    <span>50 {t("calculator.inputs.years", "years")}</span>
                  </div>
                </div>

                {/* Compound Frequency */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">{t("calculator.inputs.compoundFrequency", "Compound Frequency")}</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["monthly", "quarterly", "annually"] as const).map((freq) => (
                      <button
                        key={freq}
                        onClick={() => handleInputChange(setCompoundFrequency, freq)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          compoundFrequency === freq
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {t(`calculator.inputs.${freq}`, freq.charAt(0).toUpperCase() + freq.slice(1))}
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
                    {t("calculator.advanced.title", "Advanced Options")}
                  </span>
                  <svg className={`w-5 h-5 text-slate-400 transition-transform ${showAdvanced ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showAdvanced && (
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl space-y-4">
                    {/* Contribution Timing */}
                    <div>
                      <label className="font-medium text-slate-700 text-sm block mb-2">{t("calculator.advanced.contributionTiming", "Contribution Timing")}</label>
                      <div className="grid grid-cols-2 gap-2">
                        {(["beginning", "end"] as const).map((timing) => (
                          <button
                            key={timing}
                            onClick={() => handleInputChange(setContributionTiming, timing)}
                            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                              contributionTiming === timing
                                ? "bg-blue-600 text-white"
                                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            {timing === "beginning" ? t("calculator.advanced.beginningOfPeriod", "Beginning of Period") : t("calculator.advanced.endOfPeriod", "End of Period")}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-medium text-slate-700 text-sm block mb-2">{t("calculator.advanced.inflationRate", "Inflation Rate")}</label>
                        <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                          <input
                            type="text"
                            value={inflationRate}
                            onChange={(e) => handleInputChange(setInflationRate, Number(e.target.value) || 0)}
                            className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                          />
                          <span className="text-slate-600 ml-1">%</span>
                        </div>
                      </div>
                      <div>
                        <label className="font-medium text-slate-700 text-sm block mb-2">{t("calculator.advanced.taxRate", "Capital Gains Tax")}</label>
                        <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                          <input
                            type="text"
                            value={taxRate}
                            onChange={(e) => handleInputChange(setTaxRate, Number(e.target.value) || 0)}
                            className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                          />
                          <span className="text-slate-600 ml-1">%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="font-medium text-slate-700 text-sm block mb-2">{t("calculator.advanced.contributionIncrease", "Annual Contribution Increase")}</label>
                      <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                        <input
                          type="text"
                          value={annualContributionIncrease}
                          onChange={(e) => handleInputChange(setAnnualContributionIncrease, Number(e.target.value) || 0)}
                          className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                        />
                        <span className="text-slate-600 ml-1">%</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{t("calculator.advanced.contributionIncreaseHelp", "Increase contributions yearly (e.g., with salary raises)")}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Results */}
              <div>
                {/* Results Card */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  <p className="text-sm text-slate-600 mb-1">{t("calculator.results.futureValue", "Future Investment Value")}</p>
                  <p className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{formatMoney(futureValue)}</p>
                  <p className="text-sm text-slate-600 mb-6">
                    {t("calculator.results.afterYears", "after")} {investmentYears} {t("calculator.results.years", "years")} @ {annualReturn}% {t("calculator.results.return", "return")}
                  </p>

                  {/* Breakdown Bar */}
                  <div className="h-6 rounded-full overflow-hidden flex mb-3">
                    <div className="bg-blue-600 transition-all" style={{ width: `${contributionsPercent}%` }} title={t("calculator.results.contributions", "Contributions")} />
                    <div className="bg-green-500 transition-all" style={{ width: `${interestPercent}%` }} title={t("calculator.results.interest", "Interest")} />
                  </div>
                  <div className="flex justify-between text-sm mb-6">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                      {t("calculator.results.contributions", "Contributions")}: {formatMoney(totalContributions)} ({contributionsPercent.toFixed(0)}%)
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                      {t("calculator.results.interest", "Interest")}: {formatMoney(totalInterest)} ({interestPercent.toFixed(0)}%)
                    </span>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-600">{t("calculator.results.totalContributions", "Total Contributions")}</p>
                      <p className="text-sm font-bold text-blue-600">{formatMoney(totalContributions)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-600">{t("calculator.results.totalInterest", "Total Interest")}</p>
                      <p className="text-sm font-bold text-green-600">{formatMoney(totalInterest)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-600">{t("calculator.results.inflationAdjusted", "Inflation Adjusted")}</p>
                      <p className="text-sm font-bold text-amber-600">{formatMoney(inflationAdjustedValue)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-600">{t("calculator.results.afterTax", "After Tax")}</p>
                      <p className="text-sm font-bold text-slate-800">{formatMoney(afterTaxValue)}</p>
                    </div>
                  </div>
                </div>

                {/* View Schedule Button */}
                <button
                  onClick={() => setShowTableModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 font-medium mb-4"
                >
                  📅 {t("calculator.buttons.viewSchedule", "View Growth Schedule")}
                </button>

                {/* Export & Save Buttons */}
                <div className={`grid ${session?.user ? 'grid-cols-3' : 'grid-cols-2'} gap-3`}>
                  {session?.user && (
                    <button 
                      onClick={saveToHistory}
                      disabled={saveStatus === 'saving'}
                      className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700"
                    >
                      💾 {saveStatus === 'saving' ? '...' : t("calculator.buttons.save", "Save")}
                    </button>
                  )}
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">
                    📄 {t("calculator.buttons.pdf", "PDF")} <span className="text-xs bg-indigo-100 text-blue-600 px-2 py-0.5 rounded-full">{t("common.pro", "PRO")}</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">
                    📊 {t("calculator.buttons.excel", "Excel")} <span className="text-xs bg-indigo-100 text-blue-600 px-2 py-0.5 rounded-full">{t("common.pro", "PRO")}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Ad Rectangle - Between Calculator and Info */}
            <div className="mt-8">
              <AdBlock slot="calculator-bottom" />
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* Power of Compound Interest */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">💡 {t("info.powerOfCompounding.title", "The Power of Compound Interest")}</h3>
                <p className="text-slate-600 mb-4">{t("info.powerOfCompounding.description", "Starting early makes a massive difference:")}</p>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong className="text-green-600">Age 25:</strong> {t("info.powerOfCompounding.age25", "$500/mo for 40 years @ 7% = $1.2M")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong className="text-amber-600">Age 35:</strong> {t("info.powerOfCompounding.age35", "$500/mo for 30 years @ 7% = $567K")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong className="text-red-500">Age 45:</strong> {t("info.powerOfCompounding.age45", "$500/mo for 20 years @ 7% = $248K")}</span>
                  </li>
                </ul>
                <p className="text-sm text-slate-600 mt-4">{t("info.powerOfCompounding.note", "10 years of delay can cost over $600,000!")}</p>
              </div>

              {/* Historical Returns Table */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">📊 {t("info.historicalReturns.title", "Historical Average Returns")}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 font-semibold text-slate-700">{t("info.historicalReturns.investment", "Investment Type")}</th>
                        <th className="text-right py-2 font-semibold text-slate-700">{t("info.historicalReturns.avgReturn", "Avg Return")}</th>
                        <th className="text-right py-2 font-semibold text-slate-700">{t("info.historicalReturns.risk", "Risk")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">S&P 500</td>
                        <td className="py-2 text-right font-medium text-green-600">~10%</td>
                        <td className="py-2 text-right text-amber-600">{t("info.historicalReturns.medium", "Medium")}</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">{t("info.historicalReturns.totalStock", "Total Stock Market")}</td>
                        <td className="py-2 text-right font-medium text-green-600">~9%</td>
                        <td className="py-2 text-right text-amber-600">{t("info.historicalReturns.medium", "Medium")}</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">{t("info.historicalReturns.bonds", "Bond Funds")}</td>
                        <td className="py-2 text-right font-medium text-blue-600">~4%</td>
                        <td className="py-2 text-right text-green-600">{t("info.historicalReturns.low", "Low")}</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">{t("info.historicalReturns.hysa", "High-Yield Savings")}</td>
                        <td className="py-2 text-right font-medium text-blue-600">~4%</td>
                        <td className="py-2 text-right text-green-600">{t("info.historicalReturns.veryLow", "Very Low")}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-slate-600">{t("info.historicalReturns.realEstate", "Real Estate (REITs)")}</td>
                        <td className="py-2 text-right font-medium text-green-600">~8%</td>
                        <td className="py-2 text-right text-amber-600">{t("info.historicalReturns.medium", "Medium")}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-400 mt-3">*{t("info.historicalReturns.disclaimer", "Past performance doesn't guarantee future results")}</p>
              </div>
            </div>

            {/* Example Calculation */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 mt-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span>📊</span> {t("education.example.title", "Your Calculation Breakdown")}
              </h3>
              <p className="text-slate-600 mb-4">
                {t("education.example.description", "With an initial investment of")} <strong>{formatMoney(initialInvestment)}</strong>, 
                {t("education.example.monthlyOf", "monthly contributions of")} <strong>{formatMoney(monthlyContribution)}</strong>, 
                {t("education.example.at", "at")} <strong>{annualReturn}%</strong> {t("education.example.for", "for")} <strong>{investmentYears} {t("education.example.years", "years")}</strong>:
              </p>
              <div className="bg-blue-50 rounded-xl p-6 mb-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-mono text-slate-700 text-sm">
                      {t("education.example.initial", "Initial Investment")}: {formatMoney(initialInvestment)}<br />
                      {t("education.example.totalContributed", "Total Contributed")}: {formatMoney(totalContributions)}<br />
                      <strong className="text-blue-600">{t("education.example.interestEarned", "Interest Earned")}: {formatMoney(totalInterest)}</strong>
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-slate-700 text-sm">
                      {t("education.example.futureValue", "Future Value")}: <strong className="text-blue-600">{formatMoney(futureValue)}</strong><br />
                      {t("education.example.realValue", "Real Value (inflation)")}: {formatMoney(inflationAdjustedValue)}<br />
                      {t("education.example.afterTax", "After {taxRate}% Tax")}: {formatMoney(afterTaxValue)}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-slate-600">
                {t("education.example.insight", "Your money will grow")} <strong className="text-green-600">{((futureValue / totalContributions - 1) * 100).toFixed(0)}%</strong> {t("education.example.moreThanContributed", "more than what you contributed! This is the power of compound interest over time.")}
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
                {/* What is Investment Growth */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📖 {t("education.title", "What is Investment Growth?")}</h2>
                  <p className="text-slate-600 mb-4">
                    {t("education.description1", "Investment growth refers to the increase in value of your investments over time, primarily through two mechanisms: compound interest and capital appreciation. When you invest money, it earns returns, and those returns then earn additional returns—this is the compounding effect.")}
                  </p>
                  <p className="text-slate-600">
                    {t("education.description2", "The key factors affecting your investment growth are: the amount you invest, the rate of return, the time you stay invested, and how frequently your returns compound. Understanding these factors helps you make better investment decisions.")}
                  </p>
                </div>

                {/* Formula */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📐 {t("education.formula.title", "The Compound Interest Formula")}</h2>
                  <div className="bg-slate-100 rounded-xl p-6 mb-6 text-center">
                    <p className="text-xl font-mono font-bold text-slate-800">FV = P(1+r)<sup>n</sup> + PMT × [((1+r)<sup>n</sup> - 1) / r]</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-12">FV</span><span className="text-slate-600">= {t("education.formula.fv", "Future Value (what you'll have)")}</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-12">P</span><span className="text-slate-600">= {t("education.formula.p", "Principal (initial investment)")}</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-12">r</span><span className="text-slate-600">= {t("education.formula.r", "Interest rate per period")}</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-12">n</span><span className="text-slate-600">= {t("education.formula.n", "Number of periods")}</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-12">PMT</span><span className="text-slate-600">= {t("education.formula.pmt", "Regular contribution amount")}</span></div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 {t("education.tips.title", "Investment Tips")}</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4"><span className="text-2xl">🎯</span><div><h3 className="font-semibold text-slate-900">{t("education.tips.tip1.title", "Start Early")}</h3><p className="text-slate-600">{t("education.tips.tip1.description", "Time is your greatest asset. Even small amounts grow significantly over decades.")}</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">📈</span><div><h3 className="font-semibold text-slate-900">{t("education.tips.tip2.title", "Be Consistent")}</h3><p className="text-slate-600">{t("education.tips.tip2.description", "Regular contributions through dollar-cost averaging reduce timing risk.")}</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">🎭</span><div><h3 className="font-semibold text-slate-900">{t("education.tips.tip3.title", "Diversify")}</h3><p className="text-slate-600">{t("education.tips.tip3.description", "Spread investments across asset classes to manage risk effectively.")}</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">💪</span><div><h3 className="font-semibold text-slate-900">{t("education.tips.tip4.title", "Stay the Course")}</h3><p className="text-slate-600">{t("education.tips.tip4.description", "Don't panic during market downturns. Long-term investors typically recover.")}</p></div></div>
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
                    <span className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-sm">💰</span>
                    {t("sidebar.financeTitle", "Financial Calculators")}
                  </h3>
                  <div className="space-y-2">
                    {financeCalcs.map((calc) => (
                      <Link
                        key={calc}
                        href={`/${locale}/${calc.toLowerCase().replace(/ /g, "-")}-calculator`}
                        className="block text-blue-600 hover:text-indigo-800 hover:underline text-sm"
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
                    {t("sidebar.healthTitle", "Health Calculators")}
                  </h3>
                  <div className="space-y-2">
                    {healthCalcs.map((calc) => (
                      <Link
                        key={calc}
                        href={`/${locale}/${calc.toLowerCase().replace(/ /g, "-")}-calculator`}
                        className="block text-blue-600 hover:text-indigo-800 hover:underline text-sm"
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
