"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import AdBlock from "@/components/ads/AdBlock";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

const CALCULATOR_SLUG = "student-loan-calculator";
const CALCULATOR_NAME = "Student Loan Calculator";
const CALCULATOR_CATEGORY = "finance";

export default function StudentLoanCalculator() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // Calculator state
  const [loanAmount, setLoanAmount] = useState(35000);
  const [interestRate, setInterestRate] = useState(6.8);
  const [loanTerm, setLoanTerm] = useState(120);
  const [loanType, setLoanType] = useState<"federal" | "private">("federal");
  const [repaymentPlan, setRepaymentPlan] = useState<"standard" | "graduated" | "extended" | "income">("standard");
  const [showTableModal, setShowTableModal] = useState(false);
  
  // Extra payments
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState(0);
  const [oneTimePayment, setOneTimePayment] = useState(0);
  const [gracePeriodMonths, setGracePeriodMonths] = useState(6);
  const [loanStartDate, setLoanStartDate] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  // Results
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [payoffDate, setPayoffDate] = useState("");
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  
  // With extra payments
  const [monthlyPaymentWithExtra, setMonthlyPaymentWithExtra] = useState(0);
  const [totalPaymentWithExtra, setTotalPaymentWithExtra] = useState(0);
  const [totalInterestWithExtra, setTotalInterestWithExtra] = useState(0);
  const [payoffDateWithExtra, setPayoffDateWithExtra] = useState("");
  const [monthsSaved, setMonthsSaved] = useState(0);
  const [interestSaved, setInterestSaved] = useState(0);

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
      const res = await fetch("/api/history", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, calculatorName: CALCULATOR_NAME, inputs: { loanAmount, interestRate, loanTerm, loanType, repaymentPlan }, results: { monthlyPayment: monthlyPayment.toFixed(2), totalInterest: totalInterest.toFixed(2), interestSaved: interestSaved.toFixed(2) } }) });
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
    const effectiveLoanAmount = Math.max(0, loanAmount - oneTimePayment);
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm;

    let monthly = 0;
    if (monthlyRate > 0 && effectiveLoanAmount > 0) {
      monthly = effectiveLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else if (effectiveLoanAmount > 0) {
      monthly = effectiveLoanAmount / numPayments;
    }

    const totalPaid = monthly * numPayments;
    const interest = totalPaid - effectiveLoanAmount;

    setMonthlyPayment(monthly);
    setTotalPayment(totalPaid);
    setTotalInterest(interest);

    let balance = effectiveLoanAmount;
    let totalInterestPaid = 0;
    let totalPrincipalPaid = 0;
    let monthsActual = 0;
    const data: any[] = [];

    const effectiveMonthlyPayment = monthly + extraMonthlyPayment;

    for (let month = 1; month <= numPayments * 2 && balance > 0; month++) {
      const interestPayment = balance * monthlyRate;
      let principalPayment = effectiveMonthlyPayment - interestPayment;
      
      if (principalPayment > balance) {
        principalPayment = balance;
      }
      
      balance -= principalPayment;
      totalInterestPaid += interestPayment;
      totalPrincipalPaid += principalPayment;
      monthsActual++;

      if (month % 12 === 0 || balance <= 0) {
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
    setMonthlyPaymentWithExtra(effectiveMonthlyPayment);
    setTotalPaymentWithExtra(totalPrincipalPaid + totalInterestPaid);
    setTotalInterestWithExtra(totalInterestPaid);
    setMonthsSaved(numPayments - monthsActual);
    setInterestSaved(interest - totalInterestPaid);

    const [startYear, startMonth] = loanStartDate.split('-').map(Number);
    
    const payoffDateObj = new Date(startYear, startMonth - 1 + numPayments + gracePeriodMonths, 1);
    const payoffFormatted = payoffDateObj.toLocaleDateString(locale === 'es' ? 'es-MX' : locale === 'pt' ? 'pt-BR' : 'en-US', { month: 'short', year: 'numeric' });
    setPayoffDate(payoffFormatted);

    const payoffDateWithExtraObj = new Date(startYear, startMonth - 1 + monthsActual + gracePeriodMonths, 1);
    const payoffWithExtraFormatted = payoffDateWithExtraObj.toLocaleDateString(locale === 'es' ? 'es-MX' : locale === 'pt' ? 'pt-BR' : 'en-US', { month: 'short', year: 'numeric' });
    setPayoffDateWithExtra(payoffWithExtraFormatted);

  }, [loanAmount, interestRate, loanTerm, extraMonthlyPayment, oneTimePayment, gracePeriodMonths, loanStartDate, locale]);

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

  const defaultFaqs = [
    { question: "How is student loan interest calculated?", answer: "Student loan interest is calculated daily using the formula: (Principal Balance x Interest Rate) / 365. This daily interest accrues and is added to your balance if not paid. Federal loans use simple interest, while some private loans may use compound interest." },
    { question: "What is the difference between subsidized and unsubsidized loans?", answer: "Subsidized loans are for students with financial need - the government pays the interest while you are in school and during grace/deferment periods. Unsubsidized loans accrue interest from the moment they are disbursed, regardless of enrollment status." },
    { question: "Should I pay extra on my student loans?", answer: "Paying extra can save significant money on interest and help you become debt-free faster. However, first ensure you have an emergency fund, are getting any employer 401(k) match, and have paid off higher-interest debt like credit cards." },
    { question: "What is income-driven repayment?", answer: "Income-driven repayment (IDR) plans cap your monthly payments at a percentage of your discretionary income (typically 10-20%). Plans include SAVE, PAYE, IBR, and ICR. After 20-25 years of payments, any remaining balance may be forgiven." },
    { question: "Can I refinance my student loans?", answer: "Yes, refinancing combines loans into a new private loan, potentially at a lower rate. This can save money but means losing federal benefits like income-driven repayment and forgiveness programs. Only refinance federal loans if you will not need these protections." }
  ];
  const faqs = translations?.faq || defaultFaqs;

  const avgRates = [
    { type: "Federal Undergraduate (Direct)", rate: "6.53%" },
    { type: "Federal Graduate (Direct)", rate: "8.08%" },
    { type: "Federal PLUS (Parent/Grad)", rate: "9.08%" },
    { type: "Private (Excellent Credit)", rate: "4.99% - 7.99%" },
    { type: "Private (Average Credit)", rate: "8.99% - 12.99%" },
  ];

  const repaymentPlans = [
    { id: "standard", name: "Standard", term: 120, desc: "Fixed payments over 10 years" },
    { id: "graduated", name: "Graduated", term: 120, desc: "Payments start low, increase every 2 years" },
    { id: "extended", name: "Extended", term: 300, desc: "Fixed or graduated over 25 years" },
    { id: "income", name: "Income-Driven", term: 240, desc: "10-20% of discretionary income" },
  ];

  const financeCalcs = [
    "Mortgage", "Loan", "Compound Interest", "Auto Loan", "Personal Loan", "Retirement",
    "Investment", "Savings", "Income Tax", "401K", "Credit Card Payoff"
  ];
  const healthCalcs = [
    "BMI", "Calorie", "Body Fat", "BMR", "Macro", "TDEE", "Protein", "Ideal Weight"
  ];

  return (
    <>
      <Header />

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
        <section className="bg-gradient-to-b from-blue-50 to-white py-6">
          <div className="container">
            <nav className="text-sm mb-4">
              <Link href={`/${locale}`} className="text-slate-600 hover:text-blue-600">Home</Link>
              <span className="mx-2 text-slate-400">/</span>
              <Link href={`/${locale}/calculators`} className="text-slate-600 hover:text-blue-600">Calculators</Link>
              <span className="mx-2 text-slate-400">/</span>
              <span className="text-slate-700">Student Loan</span>
            </nav>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">🎓</div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Student Loan Calculator</h1>
                  <button onClick={toggleFavorite} disabled={favoriteLoading} className="p-2 rounded-full hover:bg-slate-100 transition-colors" title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
                    {isFavorite ? (
                      <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    ) : (
                      <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-2 h-6">
                  <p className="text-slate-600">Calculate your monthly payments and explore repayment strategies</p>
                  {saveStatus !== 'idle' && (<><span className="text-slate-400">—</span><SaveIndicator /></>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-6 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Loan Details</h2>

                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">Loan Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[{ value: "federal", label: "Federal" }, { value: "private", label: "Private" }].map((option) => (
                      <button key={option.value} onClick={() => handleInputChange(setLoanType, option.value)} className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${loanType === option.value ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>{option.label}</button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Total Loan Amount</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input type="text" value={loanAmount.toLocaleString()} onChange={(e) => handleInputChange(setLoanAmount, Number(e.target.value.replace(/,/g, "")) || 0)} className="w-24 bg-transparent text-right font-bold text-blue-600 focus:outline-none" />
                    </div>
                  </div>
                  <input type="range" min="5000" max="200000" step="1000" value={loanAmount} onChange={(e) => handleInputChange(setLoanAmount, Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                  <div className="flex justify-between text-xs text-slate-600 mt-1"><span>$5,000</span><span>$200,000</span></div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Interest Rate</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input type="text" value={interestRate} onChange={(e) => handleInputChange(setInterestRate, Number(e.target.value) || 0)} className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none" />
                      <span className="text-slate-600">%</span>
                    </div>
                  </div>
                  <input type="range" min="2" max="15" step="0.1" value={interestRate} onChange={(e) => handleInputChange(setInterestRate, Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                  <div className="flex justify-between text-xs text-slate-600 mt-1"><span>2%</span><span>15%</span></div>
                </div>

                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">Repayment Plan</label>
                  <div className="grid grid-cols-2 gap-2">
                    {repaymentPlans.map((plan) => (
                      <button key={plan.id} onClick={() => { handleInputChange(setRepaymentPlan, plan.id); handleInputChange(setLoanTerm, plan.term); }} className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${repaymentPlan === plan.id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>{plan.name}</button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 mt-2">{repaymentPlans.find(p => p.id === repaymentPlan)?.desc}</p>
                </div>

                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">Loan Term</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[{ value: 60, label: "5 yr" }, { value: 120, label: "10 yr" }, { value: 180, label: "15 yr" }, { value: 240, label: "20 yr" }].map((option) => (
                      <button key={option.value} onClick={() => handleInputChange(setLoanTerm, option.value)} className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${loanTerm === option.value ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>{option.label}</button>
                    ))}
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button onClick={() => handleInputChange(setShowAdvanced, !showAdvanced)} className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors">
                    <span className="font-medium text-slate-700">Extra Payments & Options</span>
                    <svg className={`w-5 h-5 text-slate-600 transition-transform ${showAdvanced ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {showAdvanced && (
                    <div className="p-4 space-y-4 bg-white">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="font-medium text-slate-700">Extra Monthly Payment</label>
                          <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                            <span className="text-slate-600">$</span>
                            <input type="text" value={extraMonthlyPayment.toLocaleString()} onChange={(e) => handleInputChange(setExtraMonthlyPayment, Number(e.target.value.replace(/,/g, "")) || 0)} className="w-20 bg-transparent text-right font-bold text-blue-600 focus:outline-none" />
                          </div>
                        </div>
                        <input type="range" min="0" max="500" step="25" value={extraMonthlyPayment} onChange={(e) => handleInputChange(setExtraMonthlyPayment, Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="font-medium text-slate-700">One-Time Payment</label>
                          <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                            <span className="text-slate-600">$</span>
                            <input type="text" value={oneTimePayment.toLocaleString()} onChange={(e) => handleInputChange(setOneTimePayment, Number(e.target.value.replace(/,/g, "")) || 0)} className="w-20 bg-transparent text-right font-bold text-blue-600 focus:outline-none" />
                          </div>
                        </div>
                        <p className="text-xs text-slate-400">Lump sum applied to principal immediately</p>
                      </div>
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">Grace Period (months)</label>
                        <input type="number" value={gracePeriodMonths} onChange={(e) => handleInputChange(setGracePeriodMonths, Number(e.target.value) || 0)} className="w-full bg-white rounded-lg px-3 py-2 border border-slate-200 font-medium text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" min="0" max="12" />
                        <p className="text-xs text-slate-400 mt-1">Time after graduation before payments begin</p>
                      </div>
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">Repayment Start Date</label>
                        <input type="month" value={loanStartDate} onChange={(e) => handleInputChange(setLoanStartDate, e.target.value)} className="w-full bg-white rounded-lg px-3 py-2 border border-slate-200 font-medium text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  <p className="text-sm text-slate-600 mb-1">Monthly Payment</p>
                  <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{formatMoney(monthlyPaymentWithExtra)}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Total Payment</p>
                      <p className="text-xl font-bold text-slate-800">{formatMoney(totalPaymentWithExtra)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Total Interest</p>
                      <p className="text-xl font-bold text-amber-600">{formatMoney(totalInterestWithExtra)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Payoff Date</p>
                      <p className="text-xl font-bold text-slate-800">{payoffDateWithExtra}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Loan Term</p>
                      <p className="text-xl font-bold text-slate-800">{Math.round(loanTerm / 12)} years</p>
                    </div>
                  </div>
                </div>

                {(extraMonthlyPayment > 0 || oneTimePayment > 0) && (
                  <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 mb-4">
                    <h3 className="font-bold text-emerald-800 mb-4">💰 Savings with Extra Payments</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div><p className="text-sm text-emerald-700">Interest Saved</p><p className="text-2xl font-bold text-emerald-700">{formatMoney(interestSaved)}</p></div>
                      <div><p className="text-sm text-emerald-700">Time Saved</p><p className="text-2xl font-bold text-emerald-700">{monthsSaved} months</p></div>
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">Cost Breakdown</h3>
                  <div className="h-8 rounded-full overflow-hidden flex">
                    <div className="bg-blue-600 transition-all" style={{ width: `${(loanAmount / totalPaymentWithExtra) * 100}%` }} />
                    <div className="bg-amber-400 transition-all" style={{ width: `${(totalInterestWithExtra / totalPaymentWithExtra) * 100}%` }} />
                  </div>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-blue-600"></span><span className="text-slate-600">Principal ({Math.round((loanAmount / totalPaymentWithExtra) * 100)}%)</span></div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-amber-400"></span><span className="text-slate-600">Interest ({Math.round((totalInterestWithExtra / totalPaymentWithExtra) * 100)}%)</span></div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">Loan Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between"><span className="text-slate-600">Loan Amount</span><span className="font-semibold">{formatMoney(loanAmount)}</span></div>
                    {oneTimePayment > 0 && <div className="flex justify-between"><span className="text-slate-600">One-Time Payment</span><span className="font-semibold text-emerald-700">-{formatMoney(oneTimePayment)}</span></div>}
                    <div className="flex justify-between"><span className="text-slate-600">Interest Rate</span><span className="font-semibold">{interestRate}%</span></div>
                    <div className="flex justify-between"><span className="text-slate-600">Loan Term</span><span className="font-semibold">{loanTerm} months ({Math.round(loanTerm / 12)} years)</span></div>
                    <div className="border-t pt-3 flex justify-between"><span className="text-slate-600">Monthly Payment</span><span className="font-bold">{formatMoney(monthlyPayment)}</span></div>
                    {extraMonthlyPayment > 0 && <div className="flex justify-between"><span className="text-slate-600">+ Extra Payment</span><span className="font-semibold text-emerald-700">+{formatMoney(extraMonthlyPayment)}</span></div>}
                    <div className="flex justify-between"><span className="text-slate-600">Total Interest</span><span className="font-semibold text-amber-600">{formatMoney(totalInterestWithExtra)}</span></div>
                    <div className="border-t pt-3 flex justify-between"><span className="font-semibold text-slate-900">Total Cost</span><span className="font-bold text-lg">{formatMoney(totalPaymentWithExtra)}</span></div>
                  </div>
                </div>

                <button onClick={() => handleInputChange(setShowTableModal, true)} className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 font-medium mb-4">📅 View Amortization Schedule</button>

                <div className={`grid ${session?.user ? 'grid-cols-3' : 'grid-cols-2'} gap-3`}>
                  {session?.user && <button onClick={saveToHistory} disabled={saveStatus === 'saving'} className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">💾 {saveStatus === 'saving' ? '...' : 'Save'}</button>}
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">📄 PDF <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">PRO</span></button>
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">📊 Excel <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">PRO</span></button>
                </div>
              </div>
            </div>

            <div className="mt-8"><AdBlock slot="calculator-bottom" /></div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">📊 Current Student Loan Rates (2024-2025)</h3>
                <div className="space-y-3">
                  {avgRates.map((rate) => (<div key={rate.type} className="flex justify-between items-center"><span className="text-slate-600 text-sm">{rate.type}</span><span className="font-semibold text-blue-600">{rate.rate}</span></div>))}
                </div>
                <p className="text-xs text-slate-400 mt-4">Rates effective for 2024-2025 academic year</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">💡 Repayment Strategies</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span><span><strong>Avalanche Method:</strong> Pay highest interest rate first</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span><span><strong>Snowball Method:</strong> Pay smallest balance first</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span><span><strong>Refinancing:</strong> Combine loans at lower rate</span></li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span><span><strong>Autopay:</strong> 0.25% rate discount with most servicers</span></li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 md:p-8 mt-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">📊 Example Calculation</h2>
              <p className="text-slate-600 mb-4">Let's calculate the monthly payment for a <strong>$35,000</strong> student loan at <strong>6.8% APR</strong> over <strong>10 years</strong> (Standard Repayment):</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-5"><p className="font-mono text-slate-700">Loan Amount: $35,000<br />Interest Rate: 6.8%<br />Monthly Rate: 6.8% ÷ 12 = 0.567%<br />Term: 120 months<br /><strong className="text-blue-600">Monthly Payment: $403</strong></p></div>
                <div className="bg-white rounded-xl p-5"><p className="font-mono text-slate-700">Total Payments: $403 × 120 = $48,360<br />Principal: $35,000<br /><strong className="text-amber-600">Total Interest: $13,360</strong></p></div>
              </div>
              <p className="text-slate-600 mt-4">By adding just <strong>$100/month</strong> extra, you could pay off the loan in <strong>7.5 years</strong> and save <strong>$3,800 in interest</strong>!</p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-slate-50">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📖 Understanding Student Loans</h2>
                  <p className="text-slate-600 mb-4">Student loans are financial aid that must be repaid with interest. They help cover the cost of higher education, including tuition, books, and living expenses. There are two main types: federal loans (offered by the government with fixed rates and borrower protections) and private loans (offered by banks and credit unions with variable rates).</p>
                  <p className="text-slate-600">Federal loans typically offer more flexible repayment options, including income-driven plans and potential loan forgiveness programs. Private loans may have lower rates for borrowers with excellent credit but offer fewer protections.</p>
                </div>

                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📐 The Formula</h2>
                  <div className="bg-slate-100 rounded-xl p-6 mb-6 text-center"><p className="text-2xl font-mono font-bold text-slate-800">M = P × [r(1+r)<sup>n</sup>] / [(1+r)<sup>n</sup>-1]</p></div>
                  <div className="space-y-3">
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">M</span><span className="text-slate-600">= Monthly payment</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">P</span><span className="text-slate-600">= Principal (total loan amount)</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">r</span><span className="text-slate-600">= Monthly interest rate (annual rate ÷ 12)</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">n</span><span className="text-slate-600">= Number of monthly payments</span></div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 Smart Student Loan Tips</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4"><span className="text-2xl">🎓</span><div><h3 className="font-semibold text-slate-900">Maximize Free Money First</h3><p className="text-slate-600">Apply for scholarships, grants, and work-study before borrowing.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">📊</span><div><h3 className="font-semibold text-slate-900">Borrow Only What You Need</h3><p className="text-slate-600">Just because you are offered more does not mean you should take it.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">💰</span><div><h3 className="font-semibold text-slate-900">Pay Interest While in School</h3><p className="text-slate-600">Even small payments prevent interest capitalization.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">🔄</span><div><h3 className="font-semibold text-slate-900">Consider Refinancing Later</h3><p className="text-slate-600">After building credit, you may qualify for lower rates.</p></div></div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">❓ Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <details key={index} className="group">
                        <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-slate-50 rounded-xl hover:bg-slate-100">
                          <span className="font-semibold text-slate-900">{faq.question}</span>
                          <svg className="w-5 h-5 text-slate-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </summary>
                        <p className="text-slate-600 p-4 pt-2">{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <AdBlock slot="calculator-sidebar" />
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">💰</span>Financial Calculators</h3>
                  <div className="space-y-2">{financeCalcs.map((calc) => (<Link key={calc} href={`/${locale}/${calc.toLowerCase().replace(/ /g, "-")}-calculator`} className="block text-blue-600 hover:text-blue-800 hover:underline text-sm">{calc}</Link>))}</div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-sm">💪</span>Health Calculators</h3>
                  <div className="space-y-2">{healthCalcs.map((calc) => (<Link key={calc} href={`/${locale}/${calc.toLowerCase().replace(/ /g, "-")}-calculator`} className="block text-blue-600 hover:text-blue-800 hover:underline text-sm">{calc}</Link>))}</div>
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
