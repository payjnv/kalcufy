"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import AdBlock from "@/components/ads/AdBlock";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

const CALCULATOR_SLUG = "personal-loan-calculator";
const CALCULATOR_NAME = "Personal Loan Calculator";
const CALCULATOR_CATEGORY = "finance";

export default function PersonalLoanCalculator() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // Calculator state - Basic
  const [loanAmount, setLoanAmount] = useState(20000);
  const [interestRate, setInterestRate] = useState(10);
  const [loanTerm, setLoanTerm] = useState(36);
  const [showTableModal, setShowTableModal] = useState(false);
  
  // Advanced state
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [originationFeeType, setOriginationFeeType] = useState<'percent' | 'fixed'>('percent');
  const [originationFee, setOriginationFee] = useState(0);
  const [feeHandling, setFeeHandling] = useState<'deducted' | 'upfront'>('deducted');
  const [monthlyInsurance, setMonthlyInsurance] = useState(0);
  const [extraPaymentType, setExtraPaymentType] = useState<'none' | 'monthly' | 'yearly' | 'onetime'>('none');
  const [extraPaymentAmount, setExtraPaymentAmount] = useState(0);
  const [loanStartDate, setLoanStartDate] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  // Results
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [netLoanAmount, setNetLoanAmount] = useState(0);
  const [realAPR, setRealAPR] = useState(0);
  const [payoffDate, setPayoffDate] = useState("");
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  
  // Extra payment savings
  const [interestSaved, setInterestSaved] = useState(0);
  const [timeSaved, setTimeSaved] = useState(0);
  const [newPayoffDate, setNewPayoffDate] = useState("");

  // Favorites state
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Track view on page load
  useEffect(() => {
    if (hasTrackedView.current) return;
    hasTrackedView.current = true;
    fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, language: locale, type: "VIEW" }) }).catch(console.error);
  }, [locale]);

  // Track calculation
  const trackCalculation = () => {
    if (hasTrackedCalculation.current) return;
    hasTrackedCalculation.current = true;
    fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, language: locale, type: "CALCULATION" }) }).catch(console.error);
  };

  // Save to history
  const saveToHistory = async () => {
    if (!session?.user) return;
    setSaveStatus('saving');
    try {
      const res = await fetch("/api/history", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, calculatorName: CALCULATOR_NAME, inputs: { loanAmount, interestRate, loanTerm, originationFee, feeHandling }, results: { monthlyPayment: monthlyPayment.toFixed(2), totalInterest: totalInterest.toFixed(2), realAPR: realAPR.toFixed(2) } }) });
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
    // Calculate origination fee amount
    const feeAmount = originationFeeType === 'percent' 
      ? loanAmount * (originationFee / 100) 
      : originationFee;
    
    // Net loan amount (what borrower actually receives)
    const netAmount = feeHandling === 'deducted' 
      ? loanAmount - feeAmount 
      : loanAmount;
    
    // Principal for calculations (what borrower owes)
    const principal = loanAmount;
    
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm;

    // Calculate base monthly payment
    let monthly = 0;
    if (monthlyRate > 0 && principal > 0) {
      monthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else if (principal > 0) {
      monthly = principal / numPayments;
    }

    // Add monthly insurance
    const totalMonthly = monthly + monthlyInsurance;

    // Calculate total payments and interest (without extra payments)
    const totalPaid = totalMonthly * numPayments;
    const interest = (monthly * numPayments) - principal;

    // Calculate real APR (considering origination fee)
    let calculatedAPR = interestRate;
    if (feeAmount > 0 && feeHandling === 'deducted') {
      // APR calculation when fee is deducted from loan
      // Using simplified formula: APR ≈ (2 * n * I) / (P * (n + 1))
      // Where I = total interest + fee, P = net amount received, n = number of payments
      const totalCost = interest + feeAmount;
      calculatedAPR = ((totalCost / netAmount) / (numPayments / 12)) * 100;
    }

    setNetLoanAmount(netAmount);
    setMonthlyPayment(totalMonthly);
    setTotalInterest(interest);
    setTotalPayments(totalPaid + (feeHandling === 'upfront' ? feeAmount : 0));
    setRealAPR(calculatedAPR);

    // Generate amortization data and calculate extra payment savings
    let data = [];
    let balance = principal;
    let totalInterestPaid = 0;
    let totalPrincipalPaid = 0;
    let monthsWithExtra = 0;
    let interestWithExtra = 0;

    // Standard amortization
    for (let month = 1; month <= numPayments && balance > 0; month++) {
      const interestPayment = balance * monthlyRate;
      let principalPayment = monthly - interestPayment;
      
      // Apply extra payments
      let extraThisMonth = 0;
      if (extraPaymentType === 'monthly') {
        extraThisMonth = extraPaymentAmount;
      } else if (extraPaymentType === 'yearly' && month % 12 === 0) {
        extraThisMonth = extraPaymentAmount;
      } else if (extraPaymentType === 'onetime' && month === 1) {
        extraThisMonth = extraPaymentAmount;
      }
      
      principalPayment += extraThisMonth;
      if (principalPayment > balance) principalPayment = balance;
      
      balance -= principalPayment;
      totalInterestPaid += interestPayment;
      totalPrincipalPaid += principalPayment;

      if (month % 12 === 0 || balance <= 0 || month === numPayments) {
        data.push({
          year: Math.ceil(month / 12),
          month,
          principalPaid: Math.round(totalPrincipalPaid),
          interestPaid: Math.round(totalInterestPaid),
          balance: Math.max(0, Math.round(balance)),
        });
      }
      
      if (balance <= 0) {
        monthsWithExtra = month;
        interestWithExtra = totalInterestPaid;
        break;
      }
    }

    if (monthsWithExtra === 0) {
      monthsWithExtra = numPayments;
      interestWithExtra = totalInterestPaid;
    }

    // Calculate savings from extra payments
    if (extraPaymentType !== 'none' && extraPaymentAmount > 0) {
      setInterestSaved(interest - interestWithExtra);
      setTimeSaved(numPayments - monthsWithExtra);
      
      // Calculate new payoff date
      const [startYear, startMonth] = loanStartDate.split('-').map(Number);
      const newPayoffDateObj = new Date(startYear, startMonth - 1 + monthsWithExtra, 1);
      setNewPayoffDate(newPayoffDateObj.toLocaleDateString(locale === 'es' ? 'es-MX' : locale === 'pt' ? 'pt-BR' : 'en-US', { month: 'short', year: 'numeric' }));
    } else {
      setInterestSaved(0);
      setTimeSaved(0);
      setNewPayoffDate("");
    }

    setMonthlyData(data);
    
    // Calculate payoff date
    const [startYear, startMonth] = loanStartDate.split('-').map(Number);
    const payoffDateObj = new Date(startYear, startMonth - 1 + numPayments, 1);
    const payoffFormatted = payoffDateObj.toLocaleDateString(locale === 'es' ? 'es-MX' : locale === 'pt' ? 'pt-BR' : 'en-US', { month: 'short', year: 'numeric' });
    setPayoffDate(payoffFormatted);
  }, [loanAmount, interestRate, loanTerm, originationFee, originationFeeType, feeHandling, monthlyInsurance, extraPaymentType, extraPaymentAmount, loanStartDate, locale]);

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
    { question: "What is a personal loan and how does it work?", answer: "A personal loan is an unsecured loan that you repay in fixed monthly installments over a set period, typically 2-7 years. Unlike secured loans, personal loans don't require collateral. Lenders determine your rate based on credit score, income, and debt-to-income ratio." },
    { question: "What is an origination fee?", answer: "An origination fee is a one-time charge by the lender to process your loan, typically 1-8% of the loan amount. It can either be deducted from your loan proceeds or paid upfront. When deducted, you receive less money but repay the full amount." },
    { question: "How does my credit score affect my interest rate?", answer: "Your credit score significantly impacts your rate. Excellent credit (750+) may qualify for rates of 6-10%, while fair credit (650-699) might see rates of 15-20%. Poor credit could mean rates of 25-36% or denial." },
    { question: "Should I choose a shorter or longer loan term?", answer: "Shorter terms (24-36 months) have higher monthly payments but lower total interest. Longer terms (60-84 months) offer lower payments but cost more overall. Choose based on your budget and how much total interest you're willing to pay." },
    { question: "Can I pay off my personal loan early?", answer: "Most lenders allow early payoff without penalties, but some charge prepayment fees. Check your loan agreement. Paying extra toward principal saves money on interest and shortens your loan term." },
    { question: "What's the difference between APR and interest rate?", answer: "The interest rate is the cost of borrowing the principal. APR (Annual Percentage Rate) includes the interest rate plus fees like origination fees, giving you the true cost of the loan. Always compare APRs when shopping for loans." }
  ];
  const faqs = translations?.faq || defaultFaqs;

  // Average rates by credit score
  const avgRates = [
    { creditScore: "Excellent (750+)", rate: "6.5% - 10%" },
    { creditScore: "Good (700-749)", rate: "10% - 15%" },
    { creditScore: "Fair (650-699)", rate: "15% - 20%" },
    { creditScore: "Poor (600-649)", rate: "20% - 28%" },
    { creditScore: "Bad (Below 600)", rate: "28% - 36%" },
  ];

  // Categories
  const financeCalcs = [
    "Mortgage", "Loan", "Compound Interest", "Auto Loan", "Retirement",
    "Credit Card Payoff", "Savings", "Roth IRA", "401K", "Investment"
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
              <h3 className="text-lg font-bold text-slate-900">{t("calculator.amortization.title", "Loan Amortization Schedule")}</h3>
              <button onClick={() => setShowTableModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="overflow-auto max-h-[50vh]">
              <table className="w-full">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">{t("calculator.amortization.year", "Year")}</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">{t("calculator.amortization.principalPaid", "Principal Paid")}</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">{t("calculator.amortization.interestPaid", "Interest Paid")}</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">{t("calculator.amortization.balance", "Remaining Balance")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {monthlyData.map((row, i) => (
                    <tr key={row.year} className={i === monthlyData.length - 1 ? "bg-green-50" : ""}>
                      <td className="px-4 py-3 font-medium">Year {row.year}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{formatMoney(row.principalPaid)}</td>
                      <td className="px-4 py-3 text-right text-amber-600">{formatMoney(row.interestPaid)}</td>
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
              <span className="text-slate-700">{t("calculator.breadcrumb", "Personal Loan")}</span>
            </nav>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">💳</div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{t("calculator.title", "Personal Loan Calculator")}</h1>
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
                  <p className="text-slate-600">{t("calculator.subtitle", "Calculate your monthly payment, total interest, and real APR")}</p>
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
                        className="w-24 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="500"
                    value={loanAmount}
                    onChange={(e) => handleInputChange(setLoanAmount, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>$1,000</span>
                    <span>$100,000</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{t("calculator.inputs.interestRate", "Interest Rate (APR)")}</label>
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
                    min="3"
                    max="36"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => handleInputChange(setInterestRate, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>3%</span>
                    <span>36%</span>
                  </div>
                </div>

                {/* Loan Term */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">{t("calculator.inputs.loanTerm", "Loan Term")}</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { value: 12, label: "12 mo" },
                      { value: 24, label: "24 mo" },
                      { value: 36, label: "36 mo" },
                      { value: 48, label: "48 mo" },
                      { value: 60, label: "60 mo" },
                      { value: 72, label: "72 mo" },
                      { value: 84, label: "84 mo" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleInputChange(setLoanTerm, option.value)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          loanTerm === option.value
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
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
                      <span className="font-semibold text-slate-700">{t("calculator.advanced.title", "Fees, Insurance & Extra Payments")}</span>
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
                      {/* Origination Fee */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">{t("calculator.advanced.originationFee", "Origination Fee")}</label>
                        <div className="flex gap-2 mb-2">
                          <button
                            onClick={() => handleInputChange(setOriginationFeeType, 'percent')}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium ${originationFeeType === 'percent' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                          >
                            Percentage (%)
                          </button>
                          <button
                            onClick={() => handleInputChange(setOriginationFeeType, 'fixed')}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium ${originationFeeType === 'fixed' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                          >
                            Fixed ($)
                          </button>
                        </div>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          {originationFeeType === 'fixed' && <span className="px-3 py-2 bg-slate-50 text-slate-600 border-r border-slate-200">$</span>}
                          <input
                            type="text"
                            value={originationFee === 0 ? "" : originationFee}
                            onChange={(e) => handleInputChange(setOriginationFee, Number(e.target.value) || 0)}
                            placeholder="0"
                            className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none"
                          />
                          {originationFeeType === 'percent' && <span className="px-3 py-2 bg-slate-50 text-slate-600 border-l border-slate-200">%</span>}
                        </div>
                        {originationFee > 0 && (
                          <p className="text-xs text-blue-500 mt-1">
                            = {formatMoney(originationFeeType === 'percent' ? loanAmount * (originationFee / 100) : originationFee)} fee
                          </p>
                        )}
                      </div>

                      {/* Fee Handling */}
                      {originationFee > 0 && (
                        <div>
                          <label className="font-medium text-slate-700 block mb-2">{t("calculator.advanced.feeHandling", "Fee Handling")}</label>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleInputChange(setFeeHandling, 'deducted')}
                              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium ${feeHandling === 'deducted' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                            >
                              Deducted from loan
                            </button>
                            <button
                              onClick={() => handleInputChange(setFeeHandling, 'upfront')}
                              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium ${feeHandling === 'upfront' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                            >
                              Paid upfront
                            </button>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">
                            {feeHandling === 'deducted' 
                              ? "You'll receive less money but repay the full amount" 
                              : "You'll pay the fee separately at closing"}
                          </p>
                        </div>
                      )}

                      {/* Monthly Insurance */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">{t("calculator.advanced.monthlyInsurance", "Monthly Insurance (optional)")}</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <span className="px-3 py-2 bg-slate-50 text-slate-600 border-r border-slate-200">$</span>
                          <input
                            type="text"
                            value={monthlyInsurance === 0 ? "" : monthlyInsurance}
                            onChange={(e) => handleInputChange(setMonthlyInsurance, Number(e.target.value) || 0)}
                            placeholder="0"
                            className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none"
                          />
                          <span className="px-3 py-2 bg-slate-50 text-slate-600 border-l border-slate-200">/mo</span>
                        </div>
                      </div>

                      {/* Extra Payments */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">{t("calculator.advanced.extraPayments", "Extra Payments")}</label>
                        <div className="grid grid-cols-4 gap-2 mb-2">
                          {[
                            { value: 'none', label: 'None' },
                            { value: 'monthly', label: 'Monthly' },
                            { value: 'yearly', label: 'Yearly' },
                            { value: 'onetime', label: 'One-time' },
                          ].map((option) => (
                            <button
                              key={option.value}
                              onClick={() => handleInputChange(setExtraPaymentType, option.value)}
                              className={`py-2 rounded-lg text-sm font-medium ${extraPaymentType === option.value ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                        {extraPaymentType !== 'none' && (
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                            <span className="px-3 py-2 bg-slate-50 text-slate-600 border-r border-slate-200">$</span>
                            <input
                              type="text"
                              value={extraPaymentAmount === 0 ? "" : extraPaymentAmount}
                              onChange={(e) => handleInputChange(setExtraPaymentAmount, Number(e.target.value.replace(/,/g, "")) || 0)}
                              placeholder="0"
                              className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none"
                            />
                          </div>
                        )}
                      </div>

                      {/* Loan Start Date */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">{t("calculator.advanced.startDate", "Loan Start Date")}</label>
                        <input
                          type="month"
                          value={loanStartDate}
                          onChange={(e) => handleInputChange(setLoanStartDate, e.target.value)}
                          className="w-full bg-white rounded-lg px-3 py-2 border border-slate-200 font-medium text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Results */}
              <div>
                {/* Results Card */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  <p className="text-sm text-slate-600 mb-1">{t("calculator.results.monthlyPayment", "Monthly Payment")}</p>
                  <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{formatMoney(monthlyPayment)}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">{t("calculator.results.loanAmount", "Loan Amount")}</p>
                      <p className="text-xl font-bold text-slate-800">{formatMoney(loanAmount)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">{t("calculator.results.totalInterest", "Total Interest")}</p>
                      <p className="text-xl font-bold text-amber-600">{formatMoney(totalInterest)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">{t("calculator.results.payoffDate", "Payoff Date")}</p>
                      <p className="text-xl font-bold text-slate-800">{payoffDate}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">{t("calculator.results.realAPR", "Real APR")}</p>
                      <p className="text-xl font-bold text-slate-800">{realAPR.toFixed(2)}%</p>
                    </div>
                  </div>
                </div>

                {/* Net Loan Amount (if fee deducted) */}
                {originationFee > 0 && feeHandling === 'deducted' && (
                  <div className="bg-amber-50 rounded-2xl border border-amber-200 p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">⚠️</span>
                      <span className="font-semibold text-amber-800">{t("calculator.results.netAmount", "Net Amount You'll Receive")}</span>
                    </div>
                    <p className="text-2xl font-bold text-amber-800">{formatMoney(netLoanAmount)}</p>
                    <p className="text-sm text-amber-600 mt-1">
                      {formatMoney(originationFeeType === 'percent' ? loanAmount * (originationFee / 100) : originationFee)} will be deducted as origination fee
                    </p>
                  </div>
                )}

                {/* Extra Payment Savings */}
                {extraPaymentType !== 'none' && extraPaymentAmount > 0 && interestSaved > 0 && (
                  <div className="bg-green-50 rounded-2xl border border-green-200 p-4 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">🎉</span>
                      <span className="font-semibold text-green-800">{t("calculator.results.extraPaymentSavings", "Extra Payment Savings")}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm text-green-600">Interest Saved</p>
                        <p className="text-xl font-bold text-green-700">{formatMoney(interestSaved)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-green-600">Time Saved</p>
                        <p className="text-xl font-bold text-green-700">{timeSaved} months</p>
                      </div>
                    </div>
                    <p className="text-sm text-green-600 mt-2">New payoff date: <strong>{newPayoffDate}</strong></p>
                  </div>
                )}

                {/* Cost Breakdown */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">{t("calculator.results.costBreakdown", "Cost Breakdown")}</h3>
                  <div className="h-8 rounded-full overflow-hidden flex">
                    <div
                      className="bg-blue-600 transition-all"
                      style={{ width: `${(loanAmount / totalPayments) * 100}%` }}
                    />
                    <div
                      className="bg-amber-400 transition-all"
                      style={{ width: `${(totalInterest / totalPayments) * 100}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-blue-600"></span>
                      <span className="text-slate-600">Principal ({Math.round((loanAmount / totalPayments) * 100)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-amber-400"></span>
                      <span className="text-slate-600">Interest ({Math.round((totalInterest / totalPayments) * 100)}%)</span>
                    </div>
                  </div>
                </div>

                {/* Loan Summary */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">{t("calculator.results.loanSummary", "Loan Summary")}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Loan Amount</span>
                      <span className="font-semibold">{formatMoney(loanAmount)}</span>
                    </div>
                    {originationFee > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Origination Fee ({originationFeeType === 'percent' ? `${originationFee}%` : 'Fixed'})</span>
                        <span className="font-semibold text-amber-600">
                          {feeHandling === 'deducted' ? '-' : '+'}{formatMoney(originationFeeType === 'percent' ? loanAmount * (originationFee / 100) : originationFee)}
                        </span>
                      </div>
                    )}
                    {originationFee > 0 && feeHandling === 'deducted' && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Net Amount Received</span>
                        <span className="font-semibold text-green-600">{formatMoney(netLoanAmount)}</span>
                      </div>
                    )}
                    <div className="border-t pt-3 flex justify-between">
                      <span className="text-slate-600">Monthly Payment</span>
                      <span className="font-bold">{formatMoney(monthlyPayment)}</span>
                    </div>
                    {monthlyInsurance > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 pl-4">└ Includes {formatMoney(monthlyInsurance)} insurance</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-600">Number of Payments</span>
                      <span className="font-semibold">{loanTerm}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Interest</span>
                      <span className="font-semibold text-amber-600">+{formatMoney(totalInterest)}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="font-semibold text-slate-900">Total Cost of Loan</span>
                      <span className="font-bold text-lg">{formatMoney(totalPayments)}</span>
                    </div>
                  </div>
                </div>

                {/* Amortization Table Button */}
                <button
                  onClick={() => setShowTableModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 font-medium mb-4"
                >
                  📅 {t("calculator.buttons.viewAmortization", "View Amortization Schedule")}
                </button>

                {/* Export & Save Buttons */}
                <div className={`grid ${session?.user ? 'grid-cols-3' : 'grid-cols-2'} gap-3`}>
                  {session?.user && (
                    <button onClick={saveToHistory} disabled={saveStatus === 'saving'} className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">
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

            {/* Ad Rectangle - Between Calculator and Info Cards */}
            <div className="mt-8">
              <AdBlock slot="calculator-bottom" />
            </div>

            {/* Info Cards - BELOW CALCULATOR */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* Understanding Personal Loans */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">💡 {t("info.understanding.title", "Understanding Personal Loans")}</h3>
                <p className="text-slate-600 mb-4">
                  Personal loans are unsecured loans with fixed rates and terms. Key factors to consider:
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>APR vs Rate:</strong> APR includes fees, giving true cost</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Term Length:</strong> Shorter = more savings, higher payments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Credit Score:</strong> Major factor in rate you'll receive</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Fees:</strong> Watch for origination, prepayment penalties</span>
                  </li>
                </ul>
              </div>

              {/* Average Rates Table */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">📊 {t("info.rates.title", "Average Rates by Credit Score")}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 font-semibold text-slate-700">Credit Score</th>
                        <th className="text-right py-2 font-semibold text-slate-700">Typical APR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {avgRates.map((row, i) => (
                        <tr key={i} className="border-b border-slate-100">
                          <td className="py-2 text-slate-600">{row.creditScore}</td>
                          <td className="py-2 text-right font-medium text-blue-600">{row.rate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-400 mt-3">*Rates as of 2025. Actual rates may vary by lender.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Example Calculation - Full Width */}
        <section className="py-6 bg-white">
          <div className="container">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span>📊</span> {t("education.example.title", "Example Calculation")}
              </h3>
              <p className="text-slate-600 mb-4">
                Let's calculate the monthly payment for a <strong>$20,000</strong> personal loan at <strong>10% APR</strong> for <strong>36 months</strong>:
              </p>
              <div className="bg-blue-50 rounded-xl p-6 mb-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="font-mono text-slate-700 text-sm space-y-1">
                    <p>Loan Amount: $20,000</p>
                    <p>Interest Rate: 10% / 12 = 0.833%</p>
                    <p>Loan Term: 36 months</p>
                  </div>
                  <div className="font-mono text-slate-700 text-sm space-y-1">
                    <p>Total Interest: $3,220</p>
                    <p>Total Cost: $23,220</p>
                    <p className="text-blue-600 font-bold">Monthly Payment: $645</p>
                  </div>
                </div>
              </div>
              <p className="text-slate-600">
                You borrow <strong>$20,000</strong> and pay <strong className="text-amber-600">$3,220 in interest</strong> - that's a 16.1% cost on your loan over 3 years.
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
                {/* What is a Personal Loan */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📖 {t("education.title", "What is a Personal Loan?")}</h2>
                  <p className="text-slate-600 mb-4">
                    A personal loan is an unsecured loan that provides a fixed amount of money that you repay in equal monthly installments over a set period, typically 2 to 7 years. Unlike secured loans (like mortgages or auto loans), personal loans don't require collateral.
                  </p>
                  <p className="text-slate-600">
                    Lenders determine your interest rate based on your credit score, income, debt-to-income ratio, and other factors. Personal loans can be used for debt consolidation, home improvements, medical expenses, weddings, or other large purchases.
                  </p>
                </div>

                {/* Formula */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📐 {t("education.formula.title", "The Formula")}</h2>
                  <div className="bg-slate-100 rounded-xl p-6 mb-6 text-center">
                    <p className="text-2xl font-mono font-bold text-slate-800">M = P × [r(1+r)<sup>n</sup>] / [(1+r)<sup>n</sup>-1]</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">M</span><span className="text-slate-600">= Monthly payment</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">P</span><span className="text-slate-600">= Principal (loan amount)</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">r</span><span className="text-slate-600">= Monthly interest rate (annual rate ÷ 12)</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">n</span><span className="text-slate-600">= Number of monthly payments</span></div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 {t("education.tips.title", "Smart Borrowing Tips")}</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4"><span className="text-2xl">📊</span><div><h3 className="font-semibold text-slate-900">Shop Around</h3><p className="text-slate-600">Compare offers from multiple lenders - banks, credit unions, and online lenders.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">📈</span><div><h3 className="font-semibold text-slate-900">Improve Your Credit First</h3><p className="text-slate-600">Even a small score increase can significantly lower your rate.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">⏱️</span><div><h3 className="font-semibold text-slate-900">Choose the Shortest Term You Can Afford</h3><p className="text-slate-600">Shorter terms mean less total interest paid.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">💰</span><div><h3 className="font-semibold text-slate-900">Watch for Hidden Fees</h3><p className="text-slate-600">Origination fees, prepayment penalties, and late fees can add up.</p></div></div>
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
