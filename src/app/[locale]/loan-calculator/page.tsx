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
const CALCULATOR_SLUG = "loan-calculator";
const CALCULATOR_NAME = "Loan Calculator";
const CALCULATOR_CATEGORY = "finance";
// ============================================

export default function LoanCalculator() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);

  // ========== TRACKING REFS ==========
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);
  
  // Calculator state
  const [loanAmount, setLoanAmount] = useState(25000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(5);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [originationFee, setOriginationFee] = useState(0);
  const [extraPayment, setExtraPayment] = useState(0);
  const [showTableModal, setShowTableModal] = useState(false);
  const [loanStartDate, setLoanStartDate] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  // Results
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [actualAPR, setActualAPR] = useState(0);
  const [payoffDate, setPayoffDate] = useState("");
  const [payoffMonths, setPayoffMonths] = useState(0);
  const [interestSaved, setInterestSaved] = useState(0);
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
          inputs: { loanAmount, interestRate, loanTerm, originationFee, extraPayment },
          results: { 
            monthlyPayment: monthlyPayment.toFixed(2), 
            totalInterest: totalInterest.toFixed(2),
            totalCost: totalCost.toFixed(2)
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
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    const feeAmount = principal * (originationFee / 100);

    // Monthly payment (standard)
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    // Calculate with extra payments
    let balance = principal;
    let totalInt = 0;
    let months = 0;
    const data: any[] = [];
    
    let yearPrincipal = 0;
    let yearInterest = 0;
    let currentYear = 1;
    
    while (balance > 0 && months < numPayments * 2) {
      months++;
      const interestPmt = balance * monthlyRate;
      const principalPmt = Math.min(payment - interestPmt + extraPayment, balance);
      
      totalInt += interestPmt;
      yearPrincipal += principalPmt;
      yearInterest += interestPmt;
      balance -= principalPmt;
      
      if (months % 12 === 0 || balance <= 0) {
        data.push({
          year: currentYear,
          principal: Math.round(yearPrincipal),
          interest: Math.round(yearInterest),
          balance: Math.round(Math.max(0, balance)),
        });
        currentYear++;
        yearPrincipal = 0;
        yearInterest = 0;
      }
      
      if (balance < 0.01) balance = 0;
    }
    
    // Standard total interest (no extra payments)
    const standardTotalInterest = (payment * numPayments) - principal;
    const saved = standardTotalInterest - totalInt;
    
    // APR calculation (includes fees)
    const effectiveAmount = principal - feeAmount;
    const apr = feeAmount > 0 
      ? ((payment * numPayments - effectiveAmount) / effectiveAmount / loanTerm) * 100
      : interestRate;
    
    // Payoff date
    const [startYear, startMonth] = loanStartDate.split('-').map(Number);
    const payoff = new Date(startYear, startMonth - 1 + months);
    const payoffStr = payoff.toLocaleDateString(locale === 'es' ? 'es-MX' : locale === 'pt' ? 'pt-BR' : 'en-US', { month: 'short', year: 'numeric' });
    
    setMonthlyPayment(payment);
    setTotalInterest(totalInt);
    setTotalCost(principal + totalInt + feeAmount);
    setActualAPR(apr);
    setPayoffDate(payoffStr);
    setPayoffMonths(months);
    setInterestSaved(saved);
    setYearlyData(data);
  }, [loanAmount, interestRate, loanTerm, originationFee, extraPayment, loanStartDate]);

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

  // Percentages for breakdown
  const principalPct = (loanAmount / totalCost) * 100 || 0;
  const interestPct = (totalInterest / totalCost) * 100 || 0;
  const feePct = ((loanAmount * originationFee / 100) / totalCost) * 100 || 0;

  // FAQ data (with translation support)
  const defaultFaqs = [
    { question: "What credit score do I need for a personal loan?", answer: "Most lenders prefer a credit score of 670 or higher for the best rates. However, some lenders offer loans to borrowers with scores as low as 580, though at higher interest rates. The higher your score, the better your rate will be." },
    { question: "What's the difference between APR and interest rate?", answer: "Interest rate is the cost of borrowing the principal amount. APR (Annual Percentage Rate) includes the interest rate plus any fees, giving you the true cost of the loan. Always compare APRs when shopping for loans." },
    { question: "Should I pay off my loan early?", answer: "If your loan has no prepayment penalty, paying extra can save you significant money on interest. Even small extra payments add up over time. Check your loan terms first to ensure there's no penalty." },
    { question: "Fixed vs variable rate - which is better?", answer: "Fixed rates offer predictable payments and protection from rate increases. Variable rates may start lower but can increase over time. Fixed is usually better for longer-term loans; variable may work for short-term borrowing." },
    { question: "How do origination fees work?", answer: "Origination fees (typically 1-8% of the loan) are charged by lenders to process your loan. They're usually deducted from your loan amount, meaning you receive less than you borrow but repay the full amount plus interest." }
  ];
  const faqs = translations?.faq || defaultFaqs;

  // Categories
  const financeCalcs = [
    "Compound Interest", "Mortgage", "Auto Loan", "Interest", "Payment", "Retirement",
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

      {/* Payment Schedule Modal */}
      {showTableModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">{t("calculator.modal.title", "Payment Schedule")}</h3>
              <button onClick={() => setShowTableModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="overflow-auto max-h-[50vh]">
              <table className="w-full">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">{t("calculator.modal.year", "Year")}</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">{t("calculator.modal.principalPaid", "Principal Paid")}</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">{t("calculator.modal.interestPaid", "Interest Paid")}</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">{t("calculator.modal.balance", "Balance")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {yearlyData.map((row, i) => (
                    <tr key={row.year} className={row.balance === 0 ? "bg-green-50" : ""}>
                      <td className="px-4 py-3 font-medium">{row.year}</td>
                      <td className="px-4 py-3 text-right text-blue-600">{formatMoney(row.principal)}</td>
                      <td className="px-4 py-3 text-right text-red-500">{formatMoney(row.interest)}</td>
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
              <span className="text-slate-700">{t("calculator.breadcrumb", "Loan")}</span>
            </nav>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">💳</div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{t("calculator.title", "Loan Calculator")}</h1>
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
                  <p className="text-slate-600">{t("calculator.subtitle", "Calculate your loan payments and total cost")}</p>
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
                <h2 className="text-xl font-bold text-slate-900 mb-6">{t("calculator.loanDetails", "Loan Details")}</h2>

                {/* Loan Amount */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{t("calculator.inputs.loanAmount", "Loan Amount")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input
                        type="text"
                        value={loanAmount.toLocaleString()}
                        onChange={(e) => handleInputChange(setLoanAmount, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-28 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={loanAmount}
                    onChange={(e) => handleInputChange(setLoanAmount, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>{t("calculator.inputs.rangeMin", "$1,000")}</span>
                    <span>{t("calculator.inputs.rangeMax", "$100,000")}</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{t("calculator.inputs.interestRate", "Interest Rate")}</label>
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
                    max="30"
                    step="0.5"
                    value={interestRate}
                    onChange={(e) => handleInputChange(setInterestRate, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>1%</span>
                    <span>30%</span>
                  </div>
                </div>

                {/* Loan Term */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{t("calculator.inputs.loanTerm", "Loan Term")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        type="text"
                        value={loanTerm}
                        onChange={(e) => handleInputChange(setLoanTerm, Number(e.target.value) || 0)}
                        className="w-10 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                      <span className="text-slate-600 ml-1">{t("calculator.inputs.years", "years")}</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={loanTerm}
                    onChange={(e) => handleInputChange(setLoanTerm, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>{t("calculator.inputs.termMin", "1 year")}</span>
                    <span>{t("calculator.inputs.termMax", "10 years")}</span>
                  </div>
                </div>

                {/* Quick Term Buttons */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">{t("calculator.inputs.quickSelect", "Quick Select")}</label>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 5, 7].map((term) => (
                      <button
                        key={term}
                        onClick={() => handleInputChange(setLoanTerm, term)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          loanTerm === term
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {term}{t("calculator.inputs.yr", "yr")}
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
                    {t("calculator.advanced.title", "Fees & Extra Payments")}
                  </span>
                  <svg className={`w-5 h-5 text-slate-400 transition-transform ${showAdvanced ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showAdvanced && (
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl space-y-4">
                    <div>
                      <label className="font-medium text-slate-700 text-sm block mb-2">{t("calculator.advanced.originationFee", "Origination Fee (%)")}</label>
                      <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                        <input
                          type="text"
                          value={originationFee}
                          onChange={(e) => handleInputChange(setOriginationFee, Number(e.target.value) || 0)}
                          className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                        />
                        <span className="text-slate-600 ml-1">%</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">= {formatMoney(loanAmount * originationFee / 100)} deducted from loan</p>
                    </div>
                    <div>
                      <label className="font-medium text-slate-700 text-sm block mb-2">{t("calculator.advanced.extraPayment", "Extra Monthly Payment")}</label>
                      <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                        <span className="text-slate-600">$</span>
                        <input
                          type="text"
                          value={extraPayment.toLocaleString()}
                          onChange={(e) => handleInputChange(setExtraPayment, Number(e.target.value.replace(/,/g, "")) || 0)}
                          className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                        />
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{t("calculator.advanced.extraHelp", "Pay off faster and save on interest")}</p>
                    </div>
                    <div>
                      <label className="font-medium text-slate-700 text-sm block mb-2">{t("calculator.advanced.loanStartDate", "Loan Start Date")}</label>
                      <input
                        type="month"
                        value={loanStartDate}
                        onChange={(e) => handleInputChange(setLoanStartDate, e.target.value)}
                        className="w-full bg-white rounded-lg px-3 py-2 border border-slate-200 font-medium text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-slate-400 mt-1">When will your loan begin?</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Results */}
              <div>
                {/* Results Card */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  <p className="text-sm text-slate-600 mb-1">{t("calculator.results.monthlyPayment", "Monthly Payment")}</p>
                  <p className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{formatMoney(monthlyPayment + extraPayment)}</p>
                  <p className="text-slate-400 mb-6">/month {extraPayment > 0 && `(includes ${formatMoney(extraPayment)} extra)`}</p>

                  {/* Breakdown Bar */}
                  <div className="h-6 rounded-full overflow-hidden flex mb-3">
                    <div className="bg-blue-600 transition-all" style={{ width: `${principalPct}%` }} title="Principal" />
                    <div className="bg-cyan-400 transition-all" style={{ width: `${interestPct}%` }} title="Interest" />
                    {feePct > 0 && <div className="bg-amber-400 transition-all" style={{ width: `${feePct}%` }} title="Fees" />}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-blue-600"></span>
                      <span className="text-slate-600">Principal ({principalPct.toFixed(0)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-cyan-400"></span>
                      <span className="text-slate-600">Interest ({interestPct.toFixed(0)}%)</span>
                    </div>
                    {feePct > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded bg-amber-400"></span>
                        <span className="text-slate-600">Fees ({feePct.toFixed(0)}%)</span>
                      </div>
                    )}
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Total Interest</p>
                      <p className="text-xl font-bold text-red-500">{formatMoney(totalInterest)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Total Cost</p>
                      <p className="text-xl font-bold text-slate-800">{formatMoney(totalCost)}</p>
                    </div>
                  </div>

                  {/* More Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-600">{t("calculator.results.payoffDate", "Payoff Date")}</p>
                      <p className="text-sm font-bold text-slate-800">{payoffDate}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-600">Payments</p>
                      <p className="text-sm font-bold text-slate-800">{payoffMonths}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-600">{t("calculator.results.apr", "APR")}</p>
                      <p className="text-sm font-bold text-slate-800">{actualAPR.toFixed(2)}%</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-600">Interest Saved</p>
                      <p className="text-sm font-bold text-green-600">{formatMoney(interestSaved)}</p>
                    </div>
                  </div>

                  {extraPayment > 0 && interestSaved > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                      <p className="text-sm text-green-800">
                        💰 By paying an extra <strong>{formatMoney(extraPayment)}/month</strong>, you'll save <strong>{formatMoney(interestSaved)}</strong> in interest and pay off your loan <strong>{(loanTerm * 12) - payoffMonths} months</strong> early!
                      </p>
                    </div>
                  )}
                </div>

                {/* View Schedule Button */}
                <button
                  onClick={() => setShowTableModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 font-medium mb-4"
                >
                  📅 {t("calculator.buttons.viewSchedule", "View Payment Schedule")}
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
                    📄 {t("calculator.buttons.pdf", "PDF")} <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{t("common.pro", "PRO")}</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">
                    📊 {t("calculator.buttons.excel", "Excel")} <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{t("common.pro", "PRO")}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Ad Rectangle - Between Calculator and Info */}
            <div className="mt-8">
              <AdBlock slot="calculator-bottom" />
            </div>

            {/* Info Cards - Tips & Rates */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* Understanding True Cost */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">💡 Understanding the True Cost</h3>
                <p className="text-slate-600 mb-4">The true cost of a loan goes beyond the monthly payment. Consider these factors:</p>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong className="text-amber-600">Origination Fees:</strong> 1-8% of loan amount, deducted upfront</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong className="text-amber-600">APR vs Rate:</strong> APR includes fees, always compare APRs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong className="text-amber-600">Prepayment:</strong> Some lenders charge for paying off early</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong className="text-amber-600">Late Fees:</strong> Typically $25-50 or 5% of payment</span>
                  </li>
                </ul>
              </div>

              {/* {t("info.rates.title", "Average Personal Loan Rates")} Table */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">📊 {t("info.rates.title", "Average Personal Loan Rates")}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 font-semibold text-slate-700">Credit Score</th>
                        <th className="text-right py-2 font-semibold text-slate-700">Average APR</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">720+ (Excellent)</td>
                        <td className="py-2 text-right font-medium text-green-600">10.03% - 12.50%</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">690-719 (Good)</td>
                        <td className="py-2 text-right font-medium text-green-600">13.50% - 15.50%</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">630-689 (Fair)</td>
                        <td className="py-2 text-right font-medium text-amber-600">17.80% - 19.90%</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">580-629 (Poor)</td>
                        <td className="py-2 text-right font-medium text-amber-600">21.00% - 28.00%</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-slate-600">Below 580</td>
                        <td className="py-2 text-right font-medium text-red-500">28.00% - 36.00%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-400 mt-3">*Rates as of 2024. Actual rates may vary.</p>
              </div>
            </div>

            {/* Example Calculation */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 mt-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span>📊</span> {t("education.example.title", "Example Calculation")}
              </h3>
              <p className="text-slate-600 mb-4">
                Let's say you borrow <strong>$25,000</strong> at <strong>10% APR</strong> for <strong>5 years</strong>:
              </p>
              <div className="bg-blue-50 rounded-xl p-6 mb-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-mono text-slate-700 text-sm">
                      Loan Amount: $25,000<br />
                      Interest Rate: 10%<br />
                      Term: 60 months
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-slate-700 text-sm">
                      Monthly Payment: ~$531<br />
                      Total Interest: ~$6,873<br />
                      <strong className="text-blue-600">Total Cost: ~$31,873</strong>
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-slate-600">
                Even at a relatively low rate, you'll pay over <strong>27% extra</strong> in interest! 
                Consider a shorter term or extra payments to reduce total interest significantly.
              </p>
            </div>
          </div>
        </section>

        {/* Educational Content with Sidebar */}
        <section className="py-12 bg-slate-50">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* What is a Loan */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📖 {t("education.title", "What is a Personal Loan?")}?</h2>
                  <p className="text-slate-600 mb-4">
                    A personal loan is money borrowed from a bank, credit union, or online lender that you pay back in fixed monthly installments over a set period, typically 1-7 years. Unlike mortgages or auto loans, personal loans are usually unsecured, meaning they don't require collateral.
                  </p>
                  <p className="text-slate-600">
                    Personal loans can be used for almost anything: debt consolidation, home improvements, medical expenses, weddings, or emergency costs. Because they're unsecured, interest rates are typically higher than secured loans but lower than credit cards.
                  </p>
                </div>

                {/* Formula */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📐 {t("education.formula.title", "The Formula")}</h2>
                  <div className="bg-slate-100 rounded-xl p-6 mb-6 text-center">
                    <p className="text-xl font-mono font-bold text-slate-800">M = P × [r(1+r)<sup>n</sup>] / [(1+r)<sup>n</sup> - 1]</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">M</span><span className="text-slate-600">= {t("education.formula.m", "Monthly payment")}</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">P</span><span className="text-slate-600">= {t("education.formula.p", "Principal (loan amount)")}</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">r</span><span className="text-slate-600">= {t("education.formula.r", "Monthly interest rate (annual rate ÷ 12)")}</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">n</span><span className="text-slate-600">= {t("education.formula.n", "Total number of payments (years × 12)")}</span></div>
                  </div>
                </div>

                {/* Example */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📊 {t("education.calculation.title", "Your Calculation")}</h2>
                  <p className="text-slate-600 mb-4">
                    For a <strong>{formatMoney(loanAmount)}</strong> loan at <strong>{interestRate}%</strong> for <strong>{loanTerm} years</strong>:
                  </p>
                  <div className="bg-blue-50 rounded-xl p-6 mb-4">
                    <p className="font-mono text-slate-700">
                      Monthly Rate = {interestRate}% ÷ 12 = {(interestRate/12).toFixed(4)}%<br />
                      Number of Payments = {loanTerm} × 12 = {loanTerm * 12} payments<br /><br />
                      <strong className="text-blue-600">Monthly Payment = {formatMoney(monthlyPayment)}</strong><br />
                      <strong className="text-blue-600">Total Interest = {formatMoney(totalInterest)}</strong>
                    </p>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 {t("education.tips.title", "Smart Borrowing Tips")}</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4"><span className="text-2xl">📊</span><div><h3 className="font-semibold text-slate-900">{t("education.tips.tip1.title", "Check Your Credit First")}</h3><p className="text-slate-600">{t("education.tips.tip1.description", "Higher credit scores get lower rates. Check yours for free before applying.")}</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">🔍</span><div><h3 className="font-semibold text-slate-900">{t("education.tips.tip2.title", "Compare Multiple Lenders")}</h3><p className="text-slate-600">{t("education.tips.tip2.description", "Rates vary widely. Get quotes from banks, credit unions, and online lenders.")}</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">⏱️</span><div><h3 className="font-semibold text-slate-900">{t("education.tips.tip3.title", "Choose Shorter Terms")}</h3><p className="text-slate-600">{t("education.tips.tip3.description", "Higher payments but much less total interest paid.")}</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">⚠️</span><div><h3 className="font-semibold text-slate-900">{t("education.tips.tip4.title", "Watch for Fees")}</h3><p className="text-slate-600">{t("education.tips.tip4.description", "Origination fees add to cost. Compare APR, not just interest rate.")}</p></div></div>
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

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Ad Block */}
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
