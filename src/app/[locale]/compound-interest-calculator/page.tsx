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
const CALCULATOR_SLUG = "compound-interest-calculator";
const CALCULATOR_CATEGORY = "finance";
// ============================================

export default function CompoundInterestCalculator() {
  const locale = useLocale();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const { data: session } = useSession();
  
  // Helper for nested translations
  const tc = (key: string, fallback: string) => t(`calculator.${key}`, fallback);
  const ti = (key: string, fallback: string) => t(`calculator.inputs.${key}`, fallback);
  const tr = (key: string, fallback: string) => t(`calculator.results.${key}`, fallback);
  const tf = (key: string, fallback: string) => t(`calculator.frequency.${key}`, fallback);
  const tt = (key: string, fallback: string) => t(`calculator.timing.${key}`, fallback);
  const tb = (key: string, fallback: string) => t(`calculator.buttons.${key}`, fallback);
  const tbl = (key: string, fallback: string) => t(`calculator.table.${key}`, fallback);

  // ========== TRACKING REFS ==========
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // Calculator state
  const [principal, setPrincipal] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(100);
  const [interestRate, setInterestRate] = useState(7);
  const [years, setYears] = useState(10);
  const [compoundFrequency, setCompoundFrequency] = useState(12);
  const [contributionTiming, setContributionTiming] = useState<'beginning' | 'end'>('end');
  const [showTableModal, setShowTableModal] = useState(false);

  // Advanced Options state
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [taxRate, setTaxRate] = useState(0);
  const [inflationRate, setInflationRate] = useState(0);

  // Results
  const [futureValue, setFutureValue] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [inflationAdjustedValue, setInflationAdjustedValue] = useState(0);
  const [yearlyData, setYearlyData] = useState<any[]>([]);

  // Favorites state
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  // Save status (replaces useAutoSave)
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
          inputs: { principal, monthlyContribution, interestRate, years, compoundFrequency, contributionTiming, taxRate, inflationRate },
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

  // ========== CHECK FAVORITE ==========
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

  // ========== SAVE INDICATOR ==========
  const SaveIndicator = () => {
    if (saveStatus === 'idle') return null;
    if (saveStatus === 'saving') return <span className="text-xs text-slate-400">{t("calculator.status.saving", "Saving...")}</span>;
    if (saveStatus === 'saved') return <span className="text-xs text-green-500">✓ {t("calculator.status.saved", "Saved")}</span>;
    if (saveStatus === 'error') return <span className="text-xs text-red-500">{t("calculator.status.error", "Error saving")}</span>;
    return null;
  };

  // Calculate
  useEffect(() => {
    const r = interestRate / 100;
    const n = compoundFrequency;
    const t = years;
    const P = principal;
    const PMT = monthlyContribution;

    // Handle 0% interest rate
    if (r === 0) {
      const totalContrib = P + PMT * 12 * t;
      setFutureValue(totalContrib);
      setTotalContributions(totalContrib);
      setTotalInterest(0);
      setInflationAdjustedValue(inflationRate > 0 ? totalContrib / Math.pow(1 + inflationRate / 100, t) : totalContrib);
      
      let data = [];
      let balance = P;
      for (let year = 1; year <= t; year++) {
        balance += PMT * 12;
        data.push({
          year,
          balance: Math.round(balance),
          contributions: Math.round(P + PMT * 12 * year),
          interest: 0,
        });
      }
      setYearlyData(data);
      return;
    }

    const compoundFactor = Math.pow(1 + r / n, n * t);
    const fvPrincipal = P * compoundFactor;
    
    // Calculate contribution future value (annuity formula)
    let fvContributions = PMT * ((compoundFactor - 1) / (r / n));
    
    // Adjust for contribution timing (beginning of period = annuity due)
    if (contributionTiming === 'beginning') {
      fvContributions *= (1 + r / n);
    }
    
    let fv = fvPrincipal + fvContributions;
    const totalContrib = P + PMT * n * t;
    let interest = fv - totalContrib;
    
    // Apply tax rate to interest if specified
    if (taxRate > 0) {
      const taxAmount = interest * (taxRate / 100);
      interest -= taxAmount;
      fv = totalContrib + interest;
    }

    // Calculate inflation-adjusted value
    const inflationAdjusted = inflationRate > 0 ? fv / Math.pow(1 + inflationRate / 100, t) : fv;

    setFutureValue(fv);
    setTotalContributions(totalContrib);
    setTotalInterest(interest);
    setInflationAdjustedValue(inflationAdjusted);

    // Generate yearly data
    let data = [];
    let balance = P;
    let contrib = P;
    for (let year = 1; year <= t; year++) {
      for (let period = 1; period <= n; period++) {
        if (contributionTiming === 'beginning') {
          balance += PMT;
          contrib += PMT;
        }
        balance = balance * (1 + r / n);
        if (contributionTiming === 'end') {
          balance += PMT;
          contrib += PMT;
        }
      }
      data.push({
        year,
        balance: Math.round(balance),
        contributions: Math.round(contrib),
        interest: Math.round(balance - contrib),
      });
    }
    setYearlyData(data);
  }, [principal, monthlyContribution, interestRate, years, compoundFrequency, contributionTiming, taxRate, inflationRate]);

  // ========== HANDLE INPUT CHANGE (tracks calculation) ==========
  const handleInputChange = (setter: (value: any) => void, value: any) => {
    setter(value);
    trackCalculation();
  };

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // FAQ data
  // FAQ data - from translations with fallback
  const defaultFaqs = [
    { question: "What is compound interest?", answer: "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. This creates a snowball effect where your money grows faster over time, making it a powerful tool for building wealth." },
    { question: "How is compound interest different from simple interest?", answer: "Simple interest is calculated only on the principal amount, while compound interest is calculated on the principal plus any interest already earned. Over long periods, compound interest results in significantly higher returns." },
    { question: "What is the Rule of 72?", answer: "The Rule of 72 is a quick way to estimate how long it takes to double your money. Simply divide 72 by your interest rate to get the approximate years needed. At 7%, it takes about 10 years; at 10%, about 7 years." },
    { question: "Does compounding frequency matter?", answer: "Yes! More frequent compounding leads to higher returns. Daily compounding yields more than monthly, which yields more than annually. However, the difference is often small for typical savings rates." },
    { question: "Why does contribution timing matter?", answer: "Contributing at the beginning of each period (annuity due) earns slightly more than contributing at the end (ordinary annuity), because your money has more time to compound. Over decades, this can add up to thousands of dollars." }
  ];
  const faqs = translations?.faq || defaultFaqs;
  // Compound frequency comparison data
  const compoundComparison = [
    { frequency: "Annually", times: 1, example: "$10,000 at 7%" },
    { frequency: "Quarterly", times: 4, example: "$10,000 at 7%" },
    { frequency: "Monthly", times: 12, example: "$10,000 at 7%" },
    { frequency: "Daily", times: 365, example: "$10,000 at 7%" },
  ];

  // Categories
  const financeCalcs = [
    "Mortgage", "Loan", "Auto Loan", "Interest", "Payment", "Retirement",
    "Amortization", "Investment", "Inflation", "Salary", "Income Tax", "401K"
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
              <h3 className="text-lg font-bold text-slate-900">{tbl("title", "Year-by-Year Growth")}</h3>
              <button onClick={() => setShowTableModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="overflow-auto max-h-[50vh]">
              <table className="w-full">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">{tbl("year", "Year")}</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">{tbl("contributions", "Contributions")}</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">{tbl("interestEarned", "Interest Earned")}</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">{tbl("balance", "Balance")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {yearlyData.map((row, i) => (
                    <tr key={row.year} className={i === yearlyData.length - 1 ? "bg-green-50" : ""}>
                      <td className="px-4 py-3 font-medium">{tbl("year", "Year")} {row.year}</td>
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
              <span className="text-slate-700">{tc("breadcrumb", "Compound Interest")}</span>
            </nav>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">📈</div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{tc("title", "Compound Interest Calculator")}</h1>
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
                  <p className="text-slate-600">{tc("subtitle", "See how your money grows over time with compound interest")}</p>
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
                <h2 className="text-xl font-bold text-slate-900 mb-6">{tc("investmentDetails", "Investment Details")}</h2>

                {/* Initial Investment */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{ti("initialInvestment", "Initial Investment")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input
                        type="text"
                        value={principal.toLocaleString()}
                        onChange={(e) => handleInputChange(setPrincipal, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-24 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={principal}
                    onChange={(e) => handleInputChange(setPrincipal, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>$1,000</span>
                    <span>$100,000</span>
                  </div>
                </div>

                {/* Monthly Contribution */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{ti("monthlyContribution", "Monthly Contribution")}</label>
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
                    max="2000"
                    step="50"
                    value={monthlyContribution}
                    onChange={(e) => handleInputChange(setMonthlyContribution, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>$0</span>
                    <span>$2,000</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{ti("annualInterestRate", "Annual Interest Rate")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        type="text"
                        value={interestRate}
                        onChange={(e) => handleInputChange(setInterestRate, Number(e.target.value) || 0)}
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
                    value={interestRate}
                    onChange={(e) => handleInputChange(setInterestRate, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>1%</span>
                    <span>15%</span>
                  </div>
                </div>

                {/* Investment Period */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{ti("investmentPeriod", "Investment Period")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        type="text"
                        value={years}
                        onChange={(e) => handleInputChange(setYears, Number(e.target.value) || 1)}
                        className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                      <span className="text-slate-600 ml-1">{t("common.years", "years")}</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="40"
                    step="1"
                    value={years}
                    onChange={(e) => handleInputChange(setYears, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>1 {t("common.year", "year")}</span>
                    <span>40 {t("common.years", "years")}</span>
                  </div>
                </div>

                {/* Compound Frequency */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">{ti("compoundFrequency", "Compound Frequency")}</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { value: 1, label: tf("yearly", "Yearly") },
                      { value: 4, label: tf("quarterly", "Quarterly") },
                      { value: 12, label: tf("monthly", "Monthly") },
                      { value: 365, label: tf("daily", "Daily") },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleInputChange(setCompoundFrequency, option.value)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          compoundFrequency === option.value
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contribution Timing */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">{ti("contributionTiming", "Contribution Timing")}</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleInputChange(setContributionTiming, 'beginning')}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        contributionTiming === 'beginning'
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {tt("beginning", "Beginning of Period")}
                    </button>
                    <button
                      onClick={() => handleInputChange(setContributionTiming, 'end')}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        contributionTiming === 'end'
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {tt("end", "End of Period")}
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{ti("contributionTimingHelp", "When do you make your contributions?")}</p>
                </div>

                {/* Advanced Options */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">⚙️</span>
                      <span className="font-semibold text-slate-700">{ti("advancedOptions", "Advanced Options")}</span>
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
                      {/* Tax Rate */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">{ti("taxRate", "Tax Rate on Interest")}</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <input
                            type="number"
                            value={taxRate === 0 ? "" : taxRate}
                            onChange={(e) => handleInputChange(setTaxRate, Number(e.target.value) || 0)}
                            placeholder="0"
                            min="0"
                            max="50"
                            step="0.1"
                            className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none"
                          />
                          <span className="px-3 py-2 bg-slate-50 text-slate-600 border-l border-slate-200">%</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{ti("taxRateHelp", "Applied to interest earned (e.g., 25% marginal rate)")}</p>
                      </div>

                      {/* Inflation Rate */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">{ti("inflationRate", "Expected Inflation Rate")}</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <input
                            type="number"
                            value={inflationRate === 0 ? "" : inflationRate}
                            onChange={(e) => handleInputChange(setInflationRate, Number(e.target.value) || 0)}
                            placeholder="0"
                            min="0"
                            max="20"
                            step="0.1"
                            className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none"
                          />
                          <span className="px-3 py-2 bg-slate-50 text-slate-600 border-l border-slate-200">%</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{ti("inflationRateHelp", "Average U.S. inflation is ~3% per year")}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Results */}
              <div>
                {/* Results Card */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  <p className="text-sm text-slate-600 mb-1">{tr("futureValue", "Future Value")}</p>
                  <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{formatMoney(futureValue)}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">{tr("totalContributions", "Total Contributions")}</p>
                      <p className="text-xl font-bold text-slate-800">{formatMoney(totalContributions)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">{tr("totalInterest", "Total Interest Earned")}</p>
                      <p className="text-xl font-bold text-green-600">{formatMoney(totalInterest)}</p>
                    </div>
                    {inflationRate > 0 && (
                      <div className="col-span-2 bg-white rounded-xl p-4 border border-slate-200">
                        <p className="text-sm text-slate-600">{tr("inflationAdjusted", "Inflation-Adjusted Value")}</p>
                        <p className="text-xl font-bold text-amber-600">{formatMoney(inflationAdjustedValue)}</p>
                        <p className="text-xs text-slate-400 mt-1">{tr("inflationAdjustedHelp", "Purchasing power in today's dollars")}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Growth Breakdown */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">{tr("growthBreakdown", "Growth Breakdown")}</h3>
                  <div className="h-8 rounded-full overflow-hidden flex">
                    <div
                      className="bg-blue-600 transition-all"
                      style={{ width: `${(totalContributions / futureValue) * 100}%` }}
                    />
                    <div
                      className="bg-green-500 transition-all"
                      style={{ width: `${(totalInterest / futureValue) * 100}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-blue-600"></span>
                      <span className="text-slate-600">{tr("contributions", "Contributions")} ({Math.round((totalContributions / futureValue) * 100)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-green-500"></span>
                      <span className="text-slate-600">{tr("interest", "Interest")} ({Math.round((totalInterest / futureValue) * 100)}%)</span>
                    </div>
                  </div>
                </div>

                {/* View Growth Table Button */}
                <button
                  onClick={() => setShowTableModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 font-medium mb-4"
                >
                  📅 {tb("viewGrowth", "View Year-by-Year Growth")}
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
                    📄 {tb("pdf", "PDF")} <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{t("common.pro", "PRO")}</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">
                    📊 {tb("excel", "Excel")} <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{t("common.pro", "PRO")}</span>
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
              {/* The Power of Starting Early */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">💡 {t("education.powerOfTime.title", "The Power of Starting Early")}</h3>
                <p className="text-slate-600 mb-4">
                  {t("education.powerOfTime.description", "Time is the most important factor in compound interest. Consider:")}
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>{t("education.powerOfTime.startAt", "Start at")} 25:</strong> $200/{t("common.month", "mo")} {t("common.at", "at")} 7% = $528,000 {t("education.powerOfTime.by65", "by 65")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>{t("education.powerOfTime.startAt", "Start at")} 35:</strong> $200/{t("common.month", "mo")} {t("common.at", "at")} 7% = $244,000 {t("education.powerOfTime.by65", "by 65")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>{t("education.powerOfTime.startAt", "Start at")} 45:</strong> $200/{t("common.month", "mo")} {t("common.at", "at")} 7% = $104,000 {t("education.powerOfTime.by65", "by 65")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>{t("education.powerOfTime.yearsEarlier", "10 years earlier")}</strong> {t("education.powerOfTime.canMean", "can mean 2x the ending balance!")}</span>
                  </li>
                </ul>
              </div>

              {/* Rule of 72 Table */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">📊 {t("education.ruleOf72.title", "Rule of 72: Years to Double")}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 font-semibold text-slate-700">{t("education.ruleOf72.interestRate", "Interest Rate")}</th>
                        <th className="text-right py-2 font-semibold text-slate-700">{t("education.ruleOf72.yearsToDouble", "Years to Double")}</th>
                        <th className="text-right py-2 font-semibold text-slate-700">{t("education.ruleOf72.becomes", "$10K Becomes")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">4%</td>
                        <td className="py-2 text-right font-medium text-blue-600">18 {t("common.years", "years")}</td>
                        <td className="py-2 text-right font-medium text-emerald-700">$20,000</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">6%</td>
                        <td className="py-2 text-right font-medium text-blue-600">12 {t("common.years", "years")}</td>
                        <td className="py-2 text-right font-medium text-emerald-700">$20,000</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">8%</td>
                        <td className="py-2 text-right font-medium text-blue-600">9 {t("common.years", "years")}</td>
                        <td className="py-2 text-right font-medium text-emerald-700">$20,000</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">10%</td>
                        <td className="py-2 text-right font-medium text-blue-600">7.2 {t("common.years", "years")}</td>
                        <td className="py-2 text-right font-medium text-emerald-700">$20,000</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">12%</td>
                        <td className="py-2 text-right font-medium text-blue-600">6 {t("common.years", "years")}</td>
                        <td className="py-2 text-right font-medium text-emerald-700">$20,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-400 mt-3">*{t("education.ruleOf72.formula", "Formula: 72 ÷ Interest Rate = Years to Double")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Example Calculation - Full Width */}
        <section className="py-6 bg-white">
          <div className="container">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span>📊</span> {t("education.exampleCalculation.title", "Example Calculation")}
              </h3>
              <p className="text-slate-600 mb-4">
                {t("education.exampleCalculation.letsCalculate", "Let's calculate the future value of")} <strong>$10,000</strong> {t("education.exampleCalculation.with", "with")} <strong>$100/{t("common.month", "month")}</strong> {t("education.exampleCalculation.contributionsAt", "contributions at")} <strong>7% {t("education.exampleCalculation.interest", "interest")}</strong> {t("education.exampleCalculation.compoundedMonthlyFor", "compounded monthly for")} <strong>10 {t("common.years", "years")}</strong>:
              </p>
              <div className="bg-blue-50 rounded-xl p-6 mb-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-mono text-slate-700 text-sm">
                      {t("education.exampleCalculation.initialInvestment", "Initial Investment")}: $10,000<br />
                      {t("education.exampleCalculation.monthlyContribution", "Monthly Contribution")}: $100<br />
                      {t("education.exampleCalculation.totalContributions", "Total Contributions")}: $22,000
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-slate-700 text-sm">
                      {t("education.exampleCalculation.interestRate", "Interest Rate")}: 7% / 12 = 0.583%<br />
                      {t("education.exampleCalculation.periods", "Periods")}: 10 × 12 = 120<br />
                      <strong className="text-blue-600">{t("education.exampleCalculation.futureValue", "Future Value")}: $37,566</strong>
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-slate-600">
                {t("education.exampleCalculation.youInvested", "You invested")} <strong>$22,000</strong> {t("education.exampleCalculation.andEarned", "and earned")} <strong className="text-green-600">$15,566 {t("education.exampleCalculation.inInterest", "in interest")}</strong> - {t("education.exampleCalculation.thatsA", "that's a")} 71% {t("education.exampleCalculation.returnOn", "return on your contributions!")}
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
                {/* What is Compound Interest */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📖 {t("education.sections.0.title", "What is Compound Interest?")}</h2>
                  <p className="text-slate-600 mb-4">
                    {t("education.sections.0.content", "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest (which is only calculated on the principal), compound interest creates a \"snowball effect\" where your earnings generate their own earnings.")}
                  </p>
                  <p className="text-slate-600">
                    {t("education.einsteinQuote", "Albert Einstein reportedly called compound interest \"the eighth wonder of the world,\" stating that those who understand it earn it, while those who don't pay it. This calculator helps you visualize how your money can grow exponentially over time.")}
                  </p>
                </div>

                {/* Formula */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📐 {t("education.formula.title", "The Formula")}</h2>
                  <div className="bg-slate-100 rounded-xl p-6 mb-6 text-center">
                    <p className="text-2xl font-mono font-bold text-slate-800">A = P(1 + r/n)<sup>nt</sup></p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">A</span><span className="text-slate-600">= {t("education.formula.finalAmount", "Final amount (future value)")}</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">P</span><span className="text-slate-600">= {t("education.formula.principal", "Principal (initial investment)")}</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">r</span><span className="text-slate-600">= {t("education.formula.annualRate", "Annual interest rate (as decimal)")}</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">n</span><span className="text-slate-600">= {t("education.formula.compoundsPerYear", "Number of times interest compounds per year")}</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">t</span><span className="text-slate-600">= {t("education.formula.numberOfYears", "Number of years")}</span></div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 {t("education.tips.title", "Maximize Your Compound Interest")}</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4"><span className="text-2xl">⏰</span><div><h3 className="font-semibold text-slate-900">{t("education.tips.tip1.title", "Start Early")}</h3><p className="text-slate-600">{t("education.tips.tip1.description", "Time is more powerful than the amount you invest. Starting 10 years earlier can double your ending balance.")}</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">💰</span><div><h3 className="font-semibold text-slate-900">{t("education.tips.tip2.title", "Contribute Regularly")}</h3><p className="text-slate-600">{t("education.tips.tip2.description", "Consistent monthly contributions compound over time, turning small amounts into significant wealth.")}</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">🔄</span><div><h3 className="font-semibold text-slate-900">{t("education.tips.tip3.title", "Reinvest Earnings")}</h3><p className="text-slate-600">{t("education.tips.tip3.description", "Never withdraw your interest. Let it compound and generate its own returns.")}</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">📈</span><div><h3 className="font-semibold text-slate-900">{t("education.tips.tip4.title", "Seek Higher Returns")}</h3><p className="text-slate-600">{t("education.tips.tip4.description", "Even 1-2% higher returns make a massive difference over decades. Consider index funds or diversified investments.")}</p></div></div>
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

                {/* Categories Block - Hidden on mobile */}
                <div className="hidden md:block bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">💰</span>
                    {t("common.financialCalculators", "Financial Calculators")}
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

                {/* Health Categories - Hidden on mobile */}
                <div className="hidden md:block bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-sm">💪</span>
                    {t("common.healthCalculators", "Health Calculators")}
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
