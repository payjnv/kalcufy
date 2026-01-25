"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import AdBlock from "@/components/ads/AdBlock";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

const CALCULATOR_SLUG = "auto-loan-calculator";
const CALCULATOR_NAME = "Auto Loan Calculator";
const CALCULATOR_CATEGORY = "finance";

export default function AutoLoanCalculator() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // Calculator state
  const [vehiclePrice, setVehiclePrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(7000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(60);
  const [showTableModal, setShowTableModal] = useState(false);
  
  // {t("calculator.advanced.title", "Trade-In, Taxes & Fees")} state
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [tradeInValue, setTradeInValue] = useState(0);
  const [amountOwedOnTradeIn, setAmountOwedOnTradeIn] = useState(0);
  const [salesTaxRate, setSalesTaxRate] = useState(0);
  const [titleRegFees, setTitleRegFees] = useState(0);
  const [includeTaxesInLoan, setIncludeTaxesInLoan] = useState(true);
  const [cashIncentives, setCashIncentives] = useState(0);
  const [loanStartDate, setLoanStartDate] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  // Results
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [payoffDate, setPayoffDate] = useState("");

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
      const res = await fetch("/api/history", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, calculatorName: CALCULATOR_NAME, inputs: { vehiclePrice, downPayment, interestRate, loanTerm, tradeInValue, salesTaxRate }, results: { monthlyPayment: monthlyPayment.toFixed(2), loanAmount: loanAmount.toFixed(2), totalInterest: totalInterest.toFixed(2) } }) });
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
    // Calculate effective vehicle price after cash incentives
    const effectivePrice = vehiclePrice - cashIncentives;
    
    // Calculate trade-in equity (can be negative if underwater)
    const tradeInEquity = tradeInValue - amountOwedOnTradeIn;
    
    // Calculate sales tax amount
    const taxableAmount = effectivePrice - tradeInValue; // Most states tax after trade-in
    const salesTaxAmount = Math.max(0, taxableAmount) * (salesTaxRate / 100);
    
    // Calculate total taxes and fees
    const totalTaxesAndFees = salesTaxAmount + titleRegFees;
    
    // Calculate loan amount
    let principal = effectivePrice - downPayment - tradeInEquity;
    
    // Add taxes and fees to loan if selected
    if (includeTaxesInLoan) {
      principal += totalTaxesAndFees;
    }
    
    // Ensure principal is not negative
    principal = Math.max(0, principal);
    
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm;

    let monthly = 0;
    if (monthlyRate > 0 && principal > 0) {
      monthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else if (principal > 0) {
      monthly = principal / numPayments;
    }

    const totalPaid = monthly * numPayments;
    const interest = totalPaid - principal;

    setLoanAmount(principal);
    setMonthlyPayment(monthly);
    setTotalInterest(interest);
    setTotalCost(totalPaid + downPayment + tradeInEquity + (includeTaxesInLoan ? 0 : totalTaxesAndFees));

    // Generate monthly amortization data
    let data = [];
    let balance = principal;
    let totalInterestPaid = 0;
    let totalPrincipalPaid = 0;

    for (let month = 1; month <= numPayments; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthly - interestPayment;
      balance -= principalPayment;
      totalInterestPaid += interestPayment;
      totalPrincipalPaid += principalPayment;

      if (month % 12 === 0 || month === numPayments) {
        data.push({
          year: Math.ceil(month / 12),
          month,
          principalPaid: Math.round(totalPrincipalPaid),
          interestPaid: Math.round(totalInterestPaid),
          balance: Math.max(0, Math.round(balance)),
        });
      }
    }
    setMonthlyData(data);
    
    // Calculate payoff date
    const [startYear, startMonth] = loanStartDate.split('-').map(Number);
    const payoffDateObj = new Date(startYear, startMonth - 1 + numPayments, 1);
    const payoffFormatted = payoffDateObj.toLocaleDateString(locale === 'es' ? 'es-MX' : locale === 'pt' ? 'pt-BR' : 'en-US', { month: 'short', year: 'numeric' });
    setPayoffDate(payoffFormatted);
  }, [vehiclePrice, downPayment, tradeInValue, amountOwedOnTradeIn, interestRate, loanTerm, salesTaxRate, titleRegFees, includeTaxesInLoan, cashIncentives, loanStartDate]);

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

  // FAQ data (with translation support)
  const defaultFaqs = [
    { question: "What is a good interest rate for an auto loan?", answer: "A good auto loan interest rate depends on your credit score. Excellent credit (750+) typically qualifies for rates between 3-5%, good credit (700-749) for 5-7%, and fair credit (650-699) for 7-10%. Rates also vary by loan term and whether the car is new or used." },
    { question: "How much should I put down on a car?", answer: "Financial experts recommend putting down at least 20% on a new car and 10% on a used car. A larger down payment reduces your loan amount, monthly payments, and total interest paid. It also helps prevent being 'upside down' on your loan." },
    { question: "Is a longer loan term better?", answer: "Longer loan terms (72-84 months) offer lower monthly payments but result in paying significantly more interest over the life of the loan. Shorter terms (36-48 months) have higher monthly payments but save money overall and build equity faster." },
    { question: "Should I include sales tax in my auto loan?", answer: "While you can include sales tax in your loan, paying it upfront if possible saves you from paying interest on that amount. Sales tax rates vary by state, typically ranging from 0% to over 10%." },
    { question: "What's the difference between APR and interest rate?", answer: "The interest rate is the cost of borrowing the principal. APR (Annual Percentage Rate) includes the interest rate plus other fees and costs, giving you the true total cost of the loan. Always compare APRs when shopping for auto loans." }
  ];
  const faqs = translations?.faq || defaultFaqs;

  // Average rates data
  const avgRates = [
    { creditScore: "750+", newCar: "5.07%", usedCar: "6.89%" },
    { creditScore: "700-749", newCar: "6.47%", usedCar: "9.06%" },
    { creditScore: "650-699", newCar: "9.01%", usedCar: "12.21%" },
    { creditScore: "600-649", newCar: "11.76%", usedCar: "16.85%" },
    { creditScore: "Below 600", newCar: "14.39%", usedCar: "20.43%" },
  ];

  // Categories
  const financeCalcs = [
    "Mortgage", "Loan", "Compound Interest", "Interest", "Payment", "Retirement",
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
              <h3 className="text-lg font-bold text-slate-900">Loan Amortization Schedule</h3>
              <button onClick={() => handleInputChange(setShowTableModal, false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="overflow-auto max-h-[50vh]">
              <table className="w-full">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Year</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Principal Paid</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Interest Paid</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Remaining Balance</th>
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
              <span className="text-slate-700">{t("calculator.breadcrumb", "Auto Loan")}</span>
            </nav>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">🚗</div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{t("calculator.title", "Auto Loan Calculator")}</h1>
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
                  <p className="text-slate-600">Calculate your monthly car payment and total costs</p>
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

                {/* Vehicle Price */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{t("calculator.inputs.vehiclePrice", "Vehicle Price")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input
                        type="text"
                        value={vehiclePrice.toLocaleString()}
                        onChange={(e) => handleInputChange(setVehiclePrice, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-24 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="100000"
                    step="1000"
                    value={vehiclePrice}
                    onChange={(e) => handleInputChange(setVehiclePrice, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>$5,000</span>
                    <span>$100,000</span>
                  </div>
                </div>

                {/* Down Payment */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{t("calculator.inputs.downPayment", "Down Payment")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input
                        type="text"
                        value={downPayment.toLocaleString()}
                        onChange={(e) => handleInputChange(setDownPayment, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-24 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={vehiclePrice * 0.5}
                    step="500"
                    value={downPayment}
                    onChange={(e) => handleInputChange(setDownPayment, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>$0</span>
                    <span>{formatMoney(vehiclePrice * 0.5)}</span>
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
                    min="0"
                    max="20"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => handleInputChange(setInterestRate, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>0%</span>
                    <span>20%</span>
                  </div>
                </div>

                {/* Loan Term */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">{t("calculator.inputs.loanTerm", "Loan Term")}</label>
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { value: 24, label: "24 mo" },
                      { value: 36, label: "36 mo" },
                      { value: 48, label: "48 mo" },
                      { value: 60, label: "60 mo" },
                      { value: 72, label: "72 mo" },
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

                {/* {t("calculator.advanced.title", "Trade-In, Taxes & Fees")} - Collapsible */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => handleInputChange(setShowAdvanced, !showAdvanced)}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">⚙️</span>
                      <span className="font-semibold text-slate-700">{t("calculator.advanced.title", "Trade-In, Taxes & Fees")}</span>
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
                      {/* Cash Incentives / Rebate */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">Cash Incentives / Rebate</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <span className="px-3 py-2 bg-slate-50 text-slate-600 border-r border-slate-200">$</span>
                          <input
                            type="text"
                            value={cashIncentives === 0 ? "" : cashIncentives.toLocaleString()}
                            onChange={(e) => handleInputChange(setCashIncentives, Number(e.target.value.replace(/,/g, "")) || 0)}
                            placeholder="0"
                            className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none"
                          />
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Manufacturer rebates or dealer incentives</p>
                      </div>

                      {/* Trade-In Value */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">Trade-In Value</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <span className="px-3 py-2 bg-slate-50 text-slate-600 border-r border-slate-200">$</span>
                          <input
                            type="text"
                            value={tradeInValue === 0 ? "" : tradeInValue.toLocaleString()}
                            onChange={(e) => handleInputChange(setTradeInValue, Number(e.target.value.replace(/,/g, "")) || 0)}
                            placeholder="0"
                            className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none"
                          />
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Current market value of your trade-in vehicle</p>
                      </div>

                      {/* Amount Owed on Trade-In */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">Amount Owed on Trade-In</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <span className="px-3 py-2 bg-slate-50 text-slate-600 border-r border-slate-200">$</span>
                          <input
                            type="text"
                            value={amountOwedOnTradeIn === 0 ? "" : amountOwedOnTradeIn.toLocaleString()}
                            onChange={(e) => handleInputChange(setAmountOwedOnTradeIn, Number(e.target.value.replace(/,/g, "")) || 0)}
                            placeholder="0"
                            className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Sales Tax Rate */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">Sales Tax Rate</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <input
                            type="text"
                            value={salesTaxRate === 0 ? "" : salesTaxRate}
                            onChange={(e) => handleInputChange(setSalesTaxRate, Number(e.target.value) || 0)}
                            placeholder="0"
                            className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none"
                          />
                          <span className="px-3 py-2 bg-slate-50 text-slate-600 border-l border-slate-200">%</span>
                        </div>
                        <p className="text-xs text-blue-500 mt-1">
                          = {formatMoney((vehiclePrice - tradeInValue) * (salesTaxRate / 100))} in taxes
                        </p>
                      </div>

                      {/* Title, Registration & Other Fees */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">Title, Registration & Other Fees</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <span className="px-3 py-2 bg-slate-50 text-slate-600 border-r border-slate-200">$</span>
                          <input
                            type="text"
                            value={titleRegFees === 0 ? "" : titleRegFees.toLocaleString()}
                            onChange={(e) => handleInputChange(setTitleRegFees, Number(e.target.value.replace(/,/g, "")) || 0)}
                            placeholder="0"
                            className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* {t("calculator.advanced.includeTaxes", "Include taxes & fees in loan")} toggle */}
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-slate-700">{t("calculator.advanced.includeTaxes", "Include taxes & fees in loan")}?</span>
                        <button
                          onClick={() => handleInputChange(setIncludeTaxesInLoan, !includeTaxesInLoan)}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            includeTaxesInLoan ? "bg-blue-600" : "bg-slate-300"
                          }`}
                        >
                          <span
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              includeTaxesInLoan ? "right-1" : "left-1"
                            }`}
                          />
                        </button>
                      </div>

                      {/* Loan Start Date */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">Loan Start Date</label>
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
              </div>

              {/* Results */}
              <div>
                {/* Results Card */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  <p className="text-sm text-slate-600 mb-1">{t("calculator.results.monthlyPayment", "Monthly Payment")}</p>
                  <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{formatMoney(monthlyPayment)}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Loan Amount</p>
                      <p className="text-xl font-bold text-slate-800">{formatMoney(loanAmount)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Total Interest</p>
                      <p className="text-xl font-bold text-amber-600">{formatMoney(totalInterest)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Payoff Date</p>
                      <p className="text-xl font-bold text-slate-800">{payoffDate}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Payments</p>
                      <p className="text-xl font-bold text-slate-800">{loanTerm}</p>
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">Cost Breakdown</h3>
                  <div className="h-8 rounded-full overflow-hidden flex">
                    <div
                      className="bg-blue-600 transition-all"
                      style={{ width: `${(loanAmount / totalCost) * 100}%` }}
                    />
                    <div
                      className="bg-amber-400 transition-all"
                      style={{ width: `${(totalInterest / totalCost) * 100}%` }}
                    />
                    <div
                      className="bg-emerald-400 transition-all"
                      style={{ width: `${((downPayment + tradeInValue) / totalCost) * 100}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-blue-600"></span>
                      <span className="text-slate-600">Principal ({Math.round((loanAmount / totalCost) * 100)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-amber-400"></span>
                      <span className="text-slate-600">Interest ({Math.round((totalInterest / totalCost) * 100)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-emerald-400"></span>
                      <span className="text-slate-600">Down/Trade ({Math.round(((downPayment + tradeInValue) / totalCost) * 100)}%)</span>
                    </div>
                  </div>
                </div>

                {/* Additional Stats */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">Loan Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Vehicle Price</span>
                      <span className="font-semibold">{formatMoney(vehiclePrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Down Payment</span>
                      <span className="font-semibold text-emerald-700">-{formatMoney(downPayment)}</span>
                    </div>
                    {tradeInValue > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Trade-In Value</span>
                        <span className="font-semibold text-emerald-700">-{formatMoney(tradeInValue)}</span>
                      </div>
                    )}
                    {amountOwedOnTradeIn > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Amount Owed on Trade-In</span>
                        <span className="font-semibold text-red-600">+{formatMoney(amountOwedOnTradeIn)}</span>
                      </div>
                    )}
                    {salesTaxRate > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Sales Tax ({salesTaxRate}%)</span>
                        <span className="font-semibold">+{formatMoney((vehiclePrice - tradeInValue) * (salesTaxRate / 100))}</span>
                      </div>
                    )}
                    {titleRegFees > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Title, Reg & Fees</span>
                        <span className="font-semibold">+{formatMoney(titleRegFees)}</span>
                      </div>
                    )}
                    <div className="border-t pt-3 flex justify-between">
                      <span className="font-semibold text-slate-900">Amount Financed</span>
                      <span className="font-bold text-lg">{formatMoney(loanAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Interest</span>
                      <span className="font-semibold text-amber-600">+{formatMoney(totalInterest)}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="font-semibold text-slate-900">Total Cost</span>
                      <span className="font-bold text-lg">{formatMoney(loanAmount + totalInterest + downPayment + (tradeInValue - amountOwedOnTradeIn))}</span>
                    </div>
                  </div>
                </div>

                {/* Amortization Table Button */}
                <button
                  onClick={() => handleInputChange(setShowTableModal, true)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 font-medium mb-4"
                >
                  📅 {t("calculator.buttons.viewAmortization", "View Amortization")} Schedule
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

            {/* Understanding True Cost & Rates - BELOW CALCULATOR */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* Understanding True Cost */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">💡 Understanding the True Cost</h3>
                <p className="text-slate-600 mb-4">
                  The true cost of a car goes beyond the sticker price. Consider these factors:
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Depreciation:</strong> New cars lose 20-30% of value in the first year</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Insurance:</strong> Can add $100-300/month depending on coverage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Maintenance:</strong> Budget $50-100/month for upkeep</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Fuel:</strong> Consider MPG when comparing vehicles</span>
                  </li>
                </ul>
              </div>

              {/* Average Rates Table */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">📊 {t("info.rates.title", "Average Auto Loan Rates")}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 font-semibold text-slate-700">Credit Score</th>
                        <th className="text-right py-2 font-semibold text-slate-700">New Car</th>
                        <th className="text-right py-2 font-semibold text-slate-700">Used Car</th>
                      </tr>
                    </thead>
                    <tbody>
                      {avgRates.map((row, i) => (
                        <tr key={i} className="border-b border-slate-100">
                          <td className="py-2 text-slate-600">{row.creditScore}</td>
                          <td className="py-2 text-right font-medium text-emerald-700">{row.newCar}</td>
                          <td className="py-2 text-right font-medium text-amber-600">{row.usedCar}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-400 mt-3">*Rates as of 2024. Actual rates may vary.</p>
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
                Let's calculate the monthly payment for a <strong>$35,000</strong> car with a <strong>$7,000 down payment</strong>, <strong>6.5% APR</strong>, for <strong>60 months</strong>:
              </p>
              <div className="bg-blue-50 rounded-xl p-6 mb-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-mono text-slate-700 text-sm">
                      Vehicle Price: $35,000<br />
                      Down Payment: -$7,000<br />
                      <strong>Loan Amount: $28,000</strong>
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-slate-700 text-sm">
                      Monthly Rate: 6.5% ÷ 12 = 0.542%<br />
                      Term: 60 months<br />
                      <strong className="text-blue-600">Monthly Payment: $548</strong>
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-slate-600">
                Over the life of the loan, you'll pay approximately <strong>$32,880</strong> total, with <strong>$4,880 in interest</strong>.
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
                {/* What is an Auto Loan */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📖 {t("education.title", "What is an Auto Loan?")}?</h2>
                  <p className="text-slate-600 mb-4">
                    An auto loan is a type of secured loan used to purchase a vehicle. The car itself serves as collateral, which means the lender can repossess it if you fail to make payments. Auto loans typically have fixed interest rates and monthly payments over a set term, usually ranging from 24 to 84 months.
                  </p>
                  <p className="text-slate-600">
                    Understanding your auto loan terms is crucial for making informed financial decisions. This calculator helps you estimate your monthly payments and see how different factors like down payment, interest rate, and loan term affect the total cost of your vehicle.
                  </p>
                </div>

                {/* Formula */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📐 {t("education.formula.title", "The Formula")}</h2>
                  <div className="bg-slate-100 rounded-xl p-6 mb-6 text-center">
                    <p className="text-2xl font-mono font-bold text-slate-800">M = P × [r(1+r)<sup>n</sup>] / [(1+r)<sup>n</sup>-1]</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">M</span><span className="text-slate-600">= {t("education.formula.m", "Monthly payment")}</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">P</span><span className="text-slate-600">= Principal (loan amount after down payment)</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">r</span><span className="text-slate-600">= {t("education.formula.r", "Monthly interest rate")} (annual rate ÷ 12)</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">n</span><span className="text-slate-600">= Number of monthly payments</span></div>
                  </div>
                </div>

                {/* Example */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📊 {t("education.example.title", "Example Calculation")}</h2>
                  <p className="text-slate-600 mb-4">
                    Let's calculate the monthly payment for a <strong>$35,000</strong> car with a <strong>$7,000 down payment</strong>, <strong>6.5% APR</strong>, for <strong>60 months</strong>:
                  </p>
                  <div className="bg-blue-50 rounded-xl p-6 mb-4">
                    <p className="font-mono text-slate-700">
                      Loan Amount: $35,000 - $7,000 = $28,000<br />
                      Monthly Rate: 6.5% ÷ 12 = 0.542%<br />
                      M = $28,000 × [0.00542(1.00542)<sup>60</sup>] / [(1.00542)<sup>60</sup>-1]<br />
                      <strong className="text-blue-600">M = $548/month</strong>
                    </p>
                  </div>
                  <p className="text-slate-600">
                    Over the life of the loan, you'll pay approximately <strong>$32,880</strong> total, with <strong>$4,880 in interest</strong>.
                  </p>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 Smart Car Buying Tips</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4"><span className="text-2xl">💰</span><div><h3 className="font-semibold text-slate-900">Save for a Larger Down Payment</h3><p className="text-slate-600">20% down helps avoid being underwater on your loan.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">📊</span><div><h3 className="font-semibold text-slate-900">Shop Around for Rates</h3><p className="text-slate-600">Compare banks, credit unions, and dealer financing.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">⏱️</span><div><h3 className="font-semibold text-slate-900">Choose a Shorter Term</h3><p className="text-slate-600">48-60 months saves thousands in interest vs. 72-84 months.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">🔍</span><div><h3 className="font-semibold text-slate-900">Consider Total Cost of Ownership</h3><p className="text-slate-600">Factor in insurance, fuel, and maintenance costs.</p></div></div>
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
