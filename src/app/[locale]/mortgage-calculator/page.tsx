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
const CALCULATOR_SLUG = "mortgage-calculator";
const CALCULATOR_NAME = "Mortgage Calculator";
const CALCULATOR_CATEGORY = "finance";
// ============================================

export default function MortgageCalculator() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);

  // ========== TRACKING REFS ==========
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);
  // Calculator state
  const [homePrice, setHomePrice] = useState(400000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(4800);
  const [homeInsurance, setHomeInsurance] = useState(1500);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [pmiRate, setPmiRate] = useState(0.5);
  const [hoaFees, setHoaFees] = useState(0);
  const [extraMonthly, setExtraMonthly] = useState(0);
  const [showTableModal, setShowTableModal] = useState(false);
  const [loanStartDate, setLoanStartDate] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  // Results
  const [monthlyPI, setMonthlyPI] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [monthlyTax, setMonthlyTax] = useState(0);
  const [monthlyInsurance, setMonthlyInsurance] = useState(0);
  const [monthlyPMI, setMonthlyPMI] = useState(0);
  const [payoffDate, setPayoffDate] = useState("");
  const [totalPayments, setTotalPayments] = useState(0);
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
          inputs: { homePrice, downPaymentPercent, interestRate, loanTerm, propertyTax, homeInsurance },
          results: { 
            monthlyTotal: monthlyTotal.toFixed(2), 
            loanAmount: loanAmount.toFixed(2),
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
    const dp = homePrice * (downPaymentPercent / 100);
    const loan = homePrice - dp;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    // Monthly P&I
    const pi = loan * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    // Monthly costs
    const tax = propertyTax / 12;
    const insurance = homeInsurance / 12;
    const pmi = downPaymentPercent < 20 ? (loan * (pmiRate / 100)) / 12 : 0;
    const hoa = hoaFees;
    
    const total = pi + tax + insurance + pmi + hoa;
    
    // Totals
    const totalPaid = pi * numPayments;
    const interest = totalPaid - loan;
    
    // Payoff date
    const [startYear, startMonth] = loanStartDate.split('-').map(Number);
    const payoff = new Date(startYear, startMonth - 1 + numPayments);
    const payoffStr = payoff.toLocaleDateString(locale === 'es' ? 'es-MX' : locale === 'pt' ? 'pt-BR' : 'en-US', { month: 'short', year: 'numeric' });
    
    setDownPayment(dp);
    setLoanAmount(loan);
    setMonthlyPI(pi);
    setMonthlyTax(tax);
    setMonthlyInsurance(insurance);
    setMonthlyPMI(pmi);
    setMonthlyTotal(total);
    setTotalInterest(interest);
    setTotalPayments(numPayments);
    setPayoffDate(payoffStr);

    // Generate yearly data
    let data = [];
    let balance = loan;
    for (let year = 1; year <= loanTerm; year++) {
      let yearPrincipal = 0;
      let yearInterest = 0;
      for (let month = 1; month <= 12; month++) {
        if (balance <= 0) break;
        const interestPmt = balance * monthlyRate;
        const principalPmt = pi - interestPmt + extraMonthly;
        yearInterest += interestPmt;
        yearPrincipal += Math.min(principalPmt, balance);
        balance -= principalPmt;
        if (balance < 0) balance = 0;
      }
      data.push({
        year,
        principal: Math.round(yearPrincipal),
        interest: Math.round(yearInterest),
        balance: Math.round(Math.max(0, balance)),
      });
      if (balance <= 0) break;
    }
    setYearlyData(data);
  }, [homePrice, downPaymentPercent, interestRate, loanTerm, propertyTax, homeInsurance, pmiRate, hoaFees, extraMonthly, loanStartDate]);

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
  const piPercent = (monthlyPI / monthlyTotal) * 100 || 0;
  const taxPercent = (monthlyTax / monthlyTotal) * 100 || 0;
  const insurancePercent = (monthlyInsurance / monthlyTotal) * 100 || 0;
  const pmiPercent = (monthlyPMI / monthlyTotal) * 100 || 0;

  // FAQ data (with translation support)
  const defaultFaqs = [
    { question: "How much house can I afford?", answer: "A common guideline is that your monthly housing costs (including mortgage, taxes, insurance) should not exceed 28% of your gross monthly income. Lenders also look at your total debt-to-income ratio, which should typically be below 36%." },
    { question: "What credit score do I need for a mortgage?", answer: "For conventional loans, you typically need a credit score of at least 620. FHA loans may accept scores as low as 500 with a 10% down payment, or 580 with 3.5% down. Higher scores get better interest rates." },
    { question: "What is PMI and how can I avoid it?", answer: "Private Mortgage Insurance (PMI) protects the lender if you default. It's required when you put less than 20% down. You can avoid it by making a 20% down payment, using a piggyback loan, or choosing a lender-paid PMI option." },
    { question: "Fixed vs adjustable rate - which is better?", answer: "Fixed rates offer payment stability and are better if you plan to stay long-term or rates are low. ARMs start lower and may be better if you plan to sell or refinance within 5-7 years, or if rates are expected to drop." },
    { question: "Should I pay points to lower my rate?", answer: "Paying points (prepaid interest) can lower your rate, but it takes time to break even. Divide the cost of points by monthly savings to find your break-even point. If you plan to stay longer than that, points may be worth it." }
  ];
  const faqs = translations?.faq || defaultFaqs;

  // Categories
  const financeCalcs = [
    "Compound Interest", "Loan", "Auto Loan", "Interest", "Payment", "Retirement",
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

      {/* Amortization Table Modal */}
      {showTableModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">{t("calculator.modal.title", "Amortization Schedule")}</h3>
              <button onClick={() => setShowTableModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="overflow-auto max-h-[50vh]">
              <table className="w-full">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">{t("calculator.modal.year", "Year")}</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">{t("calculator.modal.principal", "Principal")}</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">{t("calculator.modal.interest", "Interest")}</th>
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
              <span className="text-slate-700">{t("calculator.breadcrumb", "Mortgage")}</span>
            </nav>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">🏠</div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{t("calculator.title", "Mortgage Calculator")}</h1>
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
                  <p className="text-slate-600">{t("calculator.subtitle", "Calculate your monthly mortgage payments")}</p>
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

                {/* Home Price */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{t("calculator.inputs.homePrice", "Home Price")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">{t("calculator.inputs.currencySymbol", "$")}</span>
                      <input
                        type="text"
                        value={homePrice.toLocaleString()}
                        onChange={(e) => handleInputChange(setHomePrice, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-28 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="2000000"
                    step="5000"
                    value={homePrice}
                    onChange={(e) => handleInputChange(setHomePrice, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>{t("calculator.inputs.rangeMin", "$50K")}</span>
                    <span>{t("calculator.inputs.rangeMax", "$2M")}</span>
                  </div>
                </div>

                {/* Down Payment */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{t("calculator.inputs.downPayment", "Down Payment")}</label>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                        <input
                          type="text"
                          value={downPaymentPercent}
                          onChange={(e) => handleInputChange(setDownPaymentPercent, Number(e.target.value) || 0)}
                          className="w-10 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                        />
                        <span className="text-slate-600">%</span>
                      </div>
                      <span className="text-slate-600 text-sm">= {formatMoney(downPayment)}</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    value={downPaymentPercent}
                    onChange={(e) => handleInputChange(setDownPaymentPercent, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>0%</span>
                    <span>50%</span>
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
                    max="15"
                    step="0.125"
                    value={interestRate}
                    onChange={(e) => handleInputChange(setInterestRate, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>1%</span>
                    <span>15%</span>
                  </div>
                </div>

                {/* Loan Term */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">{t("calculator.inputs.loanTerm", "Loan Term")}</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[10, 15, 20, 30].map((term) => (
                      <button
                        key={term}
                        onClick={() => handleInputChange(setLoanTerm, term)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          loanTerm === term
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {term} {t("calculator.inputs.years", "years")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Property Tax & Insurance */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium text-slate-700 text-sm">{t("calculator.inputs.propertyTax", "Property Tax / year")}</label>
                    </div>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2">
                      <span className="text-slate-600">$</span>
                      <input
                        type="text"
                        value={propertyTax.toLocaleString()}
                        onChange={(e) => handleInputChange(setPropertyTax, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium text-slate-700 text-sm">{t("calculator.inputs.insurance", "Insurance / year")}</label>
                    </div>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2">
                      <span className="text-slate-600">$</span>
                      <input
                        type="text"
                        value={homeInsurance.toLocaleString()}
                        onChange={(e) => handleInputChange(setHomeInsurance, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Advanced Options Toggle */}
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full flex items-center justify-between py-3 px-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <span className="flex items-center gap-2 font-medium text-slate-700">
                    <span className="w-6 h-6 bg-slate-200 rounded flex items-center justify-center text-xs">⚙️</span>
                    {t("calculator.advanced.title", "Additional Costs & Extra Payments")}
                  </span>
                  <svg className={`w-5 h-5 text-slate-400 transition-transform ${showAdvanced ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showAdvanced && (
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-medium text-slate-700 text-sm block mb-2">PMI Rate (% / year)</label>
                        <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                          <input
                            type="text"
                            value={pmiRate}
                            onChange={(e) => handleInputChange(setPmiRate, Number(e.target.value) || 0)}
                            className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                          />
                          <span className="text-slate-600 ml-1">%</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Applied if down payment &lt; 20%</p>
                      </div>
                      <div>
                        <label className="font-medium text-slate-700 text-sm block mb-2">{t("calculator.advanced.hoaFees", "HOA Fees / month")}</label>
                        <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                          <span className="text-slate-600">$</span>
                          <input
                            type="text"
                            value={hoaFees.toLocaleString()}
                            onChange={(e) => handleInputChange(setHoaFees, Number(e.target.value.replace(/,/g, "")) || 0)}
                            className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="font-medium text-slate-700 text-sm block mb-2">{t("calculator.advanced.extraMonthly", "Extra Monthly Payment")}</label>
                      <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                        <span className="text-slate-600">$</span>
                        <input
                          type="text"
                          value={extraMonthly.toLocaleString()}
                          onChange={(e) => handleInputChange(setExtraMonthly, Number(e.target.value.replace(/,/g, "")) || 0)}
                          className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                        />
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{t("calculator.advanced.extraHelp", "Pay off your mortgage faster")}</p>
                    </div>
                    <div>
                      <label className="font-medium text-slate-700 text-sm block mb-2">{t("calculator.advanced.loanStartDate", "Loan Start Date")}</label>
                      <input
                        type="month"
                        value={loanStartDate}
                        onChange={(e) => handleInputChange(setLoanStartDate, e.target.value)}
                        className="w-full bg-white rounded-lg px-3 py-2 border border-slate-200 font-bold text-blue-600 focus:outline-none"
                      />
                      <p className="text-xs text-slate-400 mt-1">{t("calculator.advanced.loanStartHelp", "When will your loan begin?")}?</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Results */}
              <div>
                {/* Results Card */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  <p className="text-sm text-slate-600 mb-1">{t("calculator.results.monthlyPayment", "Total Monthly Payment")}</p>
                  <p className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{formatMoney(monthlyTotal)}</p>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-slate-400">/month</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-sm text-slate-600">Payoff: <strong className="text-slate-700">{payoffDate}</strong></span>
                  </div>

                  {/* Breakdown Bar */}
                  <div className="h-6 rounded-full overflow-hidden flex mb-3">
                    <div className="bg-blue-600 transition-all" style={{ width: `${piPercent * 0.7}%` }} title="Principal" />
                    <div className="bg-cyan-400 transition-all" style={{ width: `${piPercent * 0.3}%` }} title="Interest" />
                    <div className="bg-amber-400 transition-all" style={{ width: `${taxPercent}%` }} title="Tax" />
                    <div className="bg-emerald-400 transition-all" style={{ width: `${insurancePercent}%` }} title="Insurance" />
                    {pmiPercent > 0 && <div className="bg-red-400 transition-all" style={{ width: `${pmiPercent}%` }} title="PMI" />}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-blue-600"></span>
                      <span className="text-slate-600">{t("calculator.results.principal", "Principal")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-cyan-400"></span>
                      <span className="text-slate-600">{t("calculator.results.interest", "Interest")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-amber-400"></span>
                      <span className="text-slate-600">{t("calculator.results.tax", "Tax")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-emerald-400"></span>
                      <span className="text-slate-600">{t("calculator.results.insurance", "Insurance")}</span>
                    </div>
                    {monthlyPMI > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded bg-red-400"></span>
                        <span className="text-slate-600">{t("calculator.results.pmi", "PMI")}</span>
                      </div>
                    )}
                  </div>

                  {/* Breakdown Table */}
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-slate-600 font-medium">{t("calculator.results.component", "Component")}</th>
                          <th className="px-4 py-2 text-right text-slate-600 font-medium">{t("calculator.results.monthly", "Monthly")}</th>
                          <th className="px-4 py-2 text-right text-slate-600 font-medium">Total ({loanTerm}yr)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr>
                          <td className="px-4 py-2 text-slate-700">{t("calculator.results.principalInterest", "Principal & Interest")}</td>
                          <td className="px-4 py-2 text-right font-medium">{formatMoney(monthlyPI)}</td>
                          <td className="px-4 py-2 text-right text-slate-600">{formatMoney(monthlyPI * loanTerm * 12)}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-slate-700">{t("calculator.results.propertyTax", "Property Tax")}</td>
                          <td className="px-4 py-2 text-right font-medium">{formatMoney(monthlyTax)}</td>
                          <td className="px-4 py-2 text-right text-slate-600">{formatMoney(propertyTax * loanTerm)}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-slate-700">{t("calculator.results.homeInsurance", "Home Insurance")}</td>
                          <td className="px-4 py-2 text-right font-medium">{formatMoney(monthlyInsurance)}</td>
                          <td className="px-4 py-2 text-right text-slate-600">{formatMoney(homeInsurance * loanTerm)}</td>
                        </tr>
                        {monthlyPMI > 0 && (
                          <tr>
                            <td className="px-4 py-2 text-slate-700">{t("calculator.results.pmi", "PMI")}</td>
                            <td className="px-4 py-2 text-right font-medium text-red-500">{formatMoney(monthlyPMI)}</td>
                            <td className="px-4 py-2 text-right text-slate-600">{formatMoney(monthlyPMI * loanTerm * 12)}</td>
                          </tr>
                        )}
                        <tr className="bg-blue-50">
                          <td className="px-4 py-2 font-semibold text-blue-700">{t("calculator.results.total", "Total")}</td>
                          <td className="px-4 py-2 text-right font-bold text-blue-700">{formatMoney(monthlyTotal)}</td>
                          <td className="px-4 py-2 text-right font-bold text-blue-700">{formatMoney(monthlyTotal * loanTerm * 12)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-600">{t("calculator.results.loanAmount", "Loan Amount")}</p>
                      <p className="text-sm font-bold text-slate-800">{formatMoney(loanAmount)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-600">{t("calculator.results.totalInterest", "Total Interest")}</p>
                      <p className="text-sm font-bold text-red-500">{formatMoney(totalInterest)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-600">{t("calculator.results.payoffDate", "Payoff Date")}</p>
                      <p className="text-sm font-bold text-slate-800">{payoffDate}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-600">{t("calculator.results.totalPayments", "Total Payments")}</p>
                      <p className="text-sm font-bold text-slate-800">{totalPayments}</p>
                    </div>
                  </div>
                </div>

                {/* View Amortization Button */}
                <button
                  onClick={() => setShowTableModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 font-medium mb-4"
                >
                  📅 {t("calculator.buttons.viewAmortization", "View Amortization Schedule")}
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
                <p className="text-slate-600 mb-4">The true cost of a home goes beyond the purchase price. Consider these factors:</p>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong className="text-amber-600">Closing Costs:</strong> Typically 2-5% of the home price</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong className="text-amber-600">Property Taxes:</strong> Vary by location, often 1-2% annually</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong className="text-amber-600">Maintenance:</strong> Budget 1-2% of home value per year</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong className="text-amber-600">PMI:</strong> Required if down payment is less than 20%</span>
                  </li>
                </ul>
              </div>

              {/* Average Mortgage Rates Table */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">📊 Average Mortgage Rates</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 font-semibold text-slate-700">Credit Score</th>
                        <th className="text-center py-2 font-semibold text-slate-700">30-Year</th>
                        <th className="text-right py-2 font-semibold text-slate-700">15-Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">760+</td>
                        <td className="py-2 text-center font-medium text-green-600">6.12%</td>
                        <td className="py-2 text-right font-medium text-green-600">5.38%</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">700-759</td>
                        <td className="py-2 text-center font-medium text-green-600">6.34%</td>
                        <td className="py-2 text-right font-medium text-green-600">5.60%</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">680-699</td>
                        <td className="py-2 text-center font-medium text-amber-600">6.51%</td>
                        <td className="py-2 text-right font-medium text-amber-600">5.77%</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">660-679</td>
                        <td className="py-2 text-center font-medium text-amber-600">6.73%</td>
                        <td className="py-2 text-right font-medium text-amber-600">5.99%</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-slate-600">Below 660</td>
                        <td className="py-2 text-center font-medium text-red-500">7.28%</td>
                        <td className="py-2 text-right font-medium text-red-500">6.54%</td>
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
                Let's say you're buying a <strong>$400,000 home</strong> with <strong>20% down ($80,000)</strong>, 
                a <strong>6.5% interest rate</strong>, and a <strong>30-year term</strong>:
              </p>
              <div className="bg-blue-50 rounded-xl p-6 mb-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-mono text-slate-700 text-sm">
                      Home Price: $400,000<br />
                      Down Payment (20%): $80,000<br />
                      <strong>Loan Amount: $320,000</strong>
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-slate-700 text-sm">
                      Monthly P&I: ~$2,023<br />
                      Total Interest (30 yrs): ~$408,000<br />
                      <strong className="text-blue-600">Total Cost: ~$728,000</strong>
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-slate-600">
                Over 30 years, you'll pay more in <strong>interest ($408K)</strong> than the original loan amount ($320K)! 
                This is why even small rate reductions or extra payments can save you tens of thousands of dollars.
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
                {/* What is a Mortgage */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📖 {t("education.title", "What is a Mortgage?")}?</h2>
                  <p className="text-slate-600 mb-4">
                    A mortgage is a loan used to purchase or maintain a home, land, or other types of real estate. The borrower agrees to pay the lender over time, typically in a series of regular payments divided into principal and interest. The property serves as collateral to secure the loan.
                  </p>
                  <p className="text-slate-600">
                    Most mortgages are "amortizing," meaning each payment covers both interest and principal. Early payments are mostly interest; later payments are mostly principal. Understanding this helps you make smarter decisions about extra payments and refinancing.
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">🧮 {t("education.calculation.title", "Your Calculation")}</h2>
                  <p className="text-slate-600 mb-4">
                    For a <strong>{formatMoney(homePrice)}</strong> home with <strong>{downPaymentPercent}%</strong> down at <strong>{interestRate}%</strong> for <strong>{loanTerm} years</strong>:
                  </p>
                  <div className="bg-blue-50 rounded-xl p-6 mb-4">
                    <p className="font-mono text-slate-700">
                      Loan Amount = {formatMoney(homePrice)} - {formatMoney(downPayment)} = <strong className="text-blue-600">{formatMoney(loanAmount)}</strong><br /><br />
                      Monthly P&I = {formatMoney(loanAmount)} × [0.{(interestRate/12).toFixed(4).slice(2)}(1.{(interestRate/12).toFixed(4).slice(2)})<sup>{loanTerm * 12}</sup>] / ...<br />
                      <strong className="text-blue-600">Monthly P&I = {formatMoney(monthlyPI)}</strong>
                    </p>
                  </div>
                  <p className="text-slate-600">
                    Add property tax ({formatMoney(monthlyTax)}/mo) and insurance ({formatMoney(monthlyInsurance)}/mo) for a total of <strong>{formatMoney(monthlyTotal)}/month</strong>.
                  </p>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 {t("education.tips.title", "Money-Saving Tips")}</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4"><span className="text-2xl">🎯</span><div><h3 className="font-semibold text-slate-900">{t("education.tips.tip1.title", "Put 20% Down")}</h3><p className="text-slate-600">{t("education.tips.tip1.description", "Avoid PMI and get better rates.")}</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">📉</span><div><h3 className="font-semibold text-slate-900">{t("education.tips.tip2.title", "Shop Multiple Lenders")}</h3><p className="text-slate-600">{t("education.tips.tip2.description", "Even 0.25% difference saves thousands.")}</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">⚡</span><div><h3 className="font-semibold text-slate-900">{t("education.tips.tip3.title", "Consider 15-Year Term")}</h3><p className="text-slate-600">{t("education.tips.tip3.description", "Lower rates, massive interest savings.")}</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">💰</span><div><h3 className="font-semibold text-slate-900">{t("education.tips.tip4.title", "Make Extra Payments")}</h3><p className="text-slate-600">{t("education.tips.tip4.description", "One extra payment/year = 4-5 years off.")}</p></div></div>
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
