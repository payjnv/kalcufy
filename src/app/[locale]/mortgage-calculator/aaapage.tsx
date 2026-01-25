"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import AdBlock from "@/components/ads/AdBlock";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

const CALCULATOR_SLUG = "mortgage-calculator";
const CALCULATOR_CATEGORY = "finance";

export default function MortgageCalculator() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);

  const tc = (key: string, fallback: string) => t(`calculator.${key}`, fallback);
  const ti = (key: string, fallback: string) => t(`calculator.inputs.${key}`, fallback);
  const tr = (key: string, fallback: string) => t(`calculator.results.${key}`, fallback);
  const tb = (key: string, fallback: string) => t(`calculator.buttons.${key}`, fallback);
  const ta = (key: string, fallback: string) => t(`calculator.advanced.${key}`, fallback);
  const tm = (key: string, fallback: string) => t(`calculator.modal.${key}`, fallback);

  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);
  
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
          calculatorName: tc("title", "Mortgage Calculator"),
          inputs: { homePrice, downPaymentPercent, interestRate, loanTerm, propertyTax, homeInsurance },
          results: { monthlyTotal: monthlyTotal.toFixed(2), loanAmount: loanAmount.toFixed(2), totalInterest: totalInterest.toFixed(2) },
        }),
      });
      if (res.ok) { setSaveStatus('saved'); setTimeout(() => setSaveStatus('idle'), 2000); }
      else { setSaveStatus('error'); }
    } catch { setSaveStatus('error'); }
  };

  const handleInputChange = (setter: (value: any) => void, value: any) => { setter(value); trackCalculation(); };

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
        if (res.ok) { const data = await res.json(); setIsFavorite(data.favorites?.some((f: any) => f.calculatorSlug === CALCULATOR_SLUG)); }
      } catch {}
    };
    checkFavorite();
  }, []);

  const toggleFavorite = async () => {
    setFavoriteLoading(true);
    try {
      if (isFavorite) { await fetch(`/api/favorites?slug=${CALCULATOR_SLUG}`, { method: 'DELETE' }); setIsFavorite(false); }
      else {
        await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, calculatorName: tc("title", "Mortgage Calculator"), category: CALCULATOR_CATEGORY })
        });
        setIsFavorite(true);
      }
    } catch {}
    setFavoriteLoading(false);
  };

  useEffect(() => {
    const dp = homePrice * (downPaymentPercent / 100);
    const loan = homePrice - dp;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    const pi = loan * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    const tax = propertyTax / 12;
    const insurance = homeInsurance / 12;
    const pmi = downPaymentPercent < 20 ? (loan * (pmiRate / 100)) / 12 : 0;
    const hoa = hoaFees;
    const total = pi + tax + insurance + pmi + hoa;
    const totalPaid = pi * numPayments;
    const interest = totalPaid - loan;
    const [startYear, startMonth] = loanStartDate.split('-').map(Number);
    const payoff = new Date(startYear, startMonth - 1 + numPayments);
    const payoffStr = payoff.toLocaleDateString(locale === 'es' ? 'es-ES' : locale === 'pt' ? 'pt-BR' : 'en-US', { month: 'short', year: 'numeric' });
    
    setDownPayment(dp); setLoanAmount(loan); setMonthlyPI(pi); setMonthlyTax(tax);
    setMonthlyInsurance(insurance); setMonthlyPMI(pmi); setMonthlyTotal(total);
    setTotalInterest(interest); setTotalPayments(numPayments); setPayoffDate(payoffStr);

    let data = []; let balance = loan;
    for (let year = 1; year <= loanTerm; year++) {
      let yearPrincipal = 0; let yearInterest = 0;
      for (let month = 1; month <= 12; month++) {
        if (balance <= 0) break;
        const interestPmt = balance * monthlyRate;
        const principalPmt = pi - interestPmt + extraMonthly;
        yearInterest += interestPmt;
        yearPrincipal += Math.min(principalPmt, balance);
        balance -= principalPmt;
        if (balance < 0) balance = 0;
      }
      data.push({ year, principal: Math.round(yearPrincipal), interest: Math.round(yearInterest), balance: Math.round(Math.max(0, balance)) });
      if (balance <= 0) break;
    }
    setYearlyData(data);
  }, [homePrice, downPaymentPercent, interestRate, loanTerm, propertyTax, homeInsurance, pmiRate, hoaFees, extraMonthly, loanStartDate, locale]);

  const formatMoney = (value: number) => new Intl.NumberFormat(locale === 'es' ? 'es-ES' : locale === 'pt' ? 'pt-BR' : 'en-US', { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

  const piPercent = (monthlyPI / monthlyTotal) * 100 || 0;
  const taxPercent = (monthlyTax / monthlyTotal) * 100 || 0;
  const insurancePercent = (monthlyInsurance / monthlyTotal) * 100 || 0;
  const pmiPercent = (monthlyPMI / monthlyTotal) * 100 || 0;

  const defaultFaqs = [
    { question: "How much house can I afford?", answer: "A common guideline is that your monthly housing costs should not exceed 28% of your gross monthly income." },
    { question: "What credit score do I need?", answer: "For conventional loans, you typically need a score of at least 620. FHA loans may accept lower scores." },
    { question: "What is PMI?", answer: "Private Mortgage Insurance protects the lender if you default. Required when down payment is less than 20%." },
    { question: "Fixed vs adjustable rate?", answer: "Fixed rates offer stability. ARMs start lower but can change over time." },
    { question: "Should I pay points?", answer: "Points lower your rate but cost upfront. Calculate break-even to decide." }
  ];
  const faqs = translations?.faq || defaultFaqs;

  const financeCalcs = ["Compound Interest", "Loan", "Auto Loan", "Retirement", "Savings", "Credit Card Payoff"];
  const healthCalcs = ["BMI", "Calorie", "Body Fat", "BMR", "Macro", "TDEE"];

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }) }} />

      {showTableModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">{tm("title", "Amortization Schedule")}</h3>
              <button onClick={() => setShowTableModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="overflow-auto max-h-[50vh]">
              <table className="w-full">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">{tm("year", "Year")}</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">{tm("principal", "Principal")}</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">{tm("interest", "Interest")}</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">{tm("balance", "Balance")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {yearlyData.map((row) => (
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
                📄 {tb("downloadPdf", "Download PDF")} <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{t("common.pro", "PRO")}</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 rounded-xl hover:bg-slate-200 font-medium text-slate-700">
                📊 {tb("downloadExcel", "Download Excel")} <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{t("common.pro", "PRO")}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="pt-20">
        <section className="bg-gradient-to-b from-blue-50 to-white py-6">
          <div className="container">
            <nav className="text-sm mb-4">
              <Link href={`/${locale}`} className="text-slate-600 hover:text-blue-600">{t("common.home", "Home")}</Link>
              <span className="mx-2 text-slate-400">/</span>
              <Link href={`/${locale}/calculators`} className="text-slate-600 hover:text-blue-600">{t("common.calculators", "Calculators")}</Link>
              <span className="mx-2 text-slate-400">/</span>
              <span className="text-slate-700">{tc("breadcrumb", "Mortgage")}</span>
            </nav>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">🏠</div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{tc("title", "Mortgage Calculator")}</h1>
                  <button onClick={toggleFavorite} disabled={favoriteLoading} className="p-2 rounded-full hover:bg-slate-100 transition-colors" title={isFavorite ? t("calculator.favorites.remove", "Remove from favorites") : t("calculator.favorites.add", "Add to favorites")}>
                    {isFavorite ? <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> : <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>}
                  </button>
                </div>
                <div className="flex items-center gap-2 h-6">
                  <p className="text-slate-600">{tc("subtitle", "Calculate your monthly mortgage payments")}</p>
                  {saveStatus !== 'idle' && <><span className="text-slate-400">—</span><SaveIndicator /></>}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-6 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6">{tc("loanDetails", "Loan Details")}</h2>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{ti("homePrice", "Home Price")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input type="text" value={homePrice.toLocaleString()} onChange={(e) => handleInputChange(setHomePrice, Number(e.target.value.replace(/,/g, "")) || 0)} className="w-28 bg-transparent text-right font-bold text-blue-600 focus:outline-none" />
                    </div>
                  </div>
                  <input type="range" min="50000" max="2000000" step="5000" value={homePrice} onChange={(e) => handleInputChange(setHomePrice, Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                  <div className="flex justify-between text-xs text-slate-600 mt-1"><span>$50K</span><span>$2M</span></div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{ti("downPayment", "Down Payment")}</label>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                        <input type="text" value={downPaymentPercent} onChange={(e) => handleInputChange(setDownPaymentPercent, Number(e.target.value) || 0)} className="w-10 bg-transparent text-right font-bold text-blue-600 focus:outline-none" />
                        <span className="text-slate-600">%</span>
                      </div>
                      <span className="text-slate-600 text-sm">= {formatMoney(downPayment)}</span>
                    </div>
                  </div>
                  <input type="range" min="0" max="50" step="1" value={downPaymentPercent} onChange={(e) => handleInputChange(setDownPaymentPercent, Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                  <div className="flex justify-between text-xs text-slate-600 mt-1"><span>0%</span><span>50%</span></div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{ti("interestRate", "Interest Rate")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input type="text" value={interestRate} onChange={(e) => handleInputChange(setInterestRate, Number(e.target.value) || 0)} className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none" />
                      <span className="text-slate-600">%</span>
                    </div>
                  </div>
                  <input type="range" min="1" max="15" step="0.125" value={interestRate} onChange={(e) => handleInputChange(setInterestRate, Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                  <div className="flex justify-between text-xs text-slate-600 mt-1"><span>1%</span><span>15%</span></div>
                </div>

                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">{ti("loanTerm", "Loan Term")}</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[10, 15, 20, 30].map((term) => (
                      <button key={term} onClick={() => handleInputChange(setLoanTerm, term)} className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${loanTerm === term ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
                        {term} {ti("years", "years")}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="font-medium text-slate-700 text-sm block mb-2">{ti("propertyTax", "Property Tax / year")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2">
                      <span className="text-slate-600">$</span>
                      <input type="text" value={propertyTax.toLocaleString()} onChange={(e) => handleInputChange(setPropertyTax, Number(e.target.value.replace(/,/g, "")) || 0)} className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="font-medium text-slate-700 text-sm block mb-2">{ti("insurance", "Insurance / year")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2">
                      <span className="text-slate-600">$</span>
                      <input type="text" value={homeInsurance.toLocaleString()} onChange={(e) => handleInputChange(setHomeInsurance, Number(e.target.value.replace(/,/g, "")) || 0)} className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none" />
                    </div>
                  </div>
                </div>

                <button onClick={() => setShowAdvanced(!showAdvanced)} className="w-full flex items-center justify-between py-3 px-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <span className="flex items-center gap-2 font-medium text-slate-700">
                    <span className="w-6 h-6 bg-slate-200 rounded flex items-center justify-center text-xs">⚙️</span>
                    {ta("title", "Additional Costs & Extra Payments")}
                  </span>
                  <svg className={`w-5 h-5 text-slate-400 transition-transform ${showAdvanced ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>

                {showAdvanced && (
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-medium text-slate-700 text-sm block mb-2">{ta("pmiRate", "PMI Rate (% / year)")}</label>
                        <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                          <input type="text" value={pmiRate} onChange={(e) => handleInputChange(setPmiRate, Number(e.target.value) || 0)} className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none" />
                          <span className="text-slate-600 ml-1">%</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{ta("pmiHelp", "Applied if down payment < 20%")}</p>
                      </div>
                      <div>
                        <label className="font-medium text-slate-700 text-sm block mb-2">{ta("hoaFees", "HOA Fees / month")}</label>
                        <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                          <span className="text-slate-600">$</span>
                          <input type="text" value={hoaFees.toLocaleString()} onChange={(e) => handleInputChange(setHoaFees, Number(e.target.value.replace(/,/g, "")) || 0)} className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="font-medium text-slate-700 text-sm block mb-2">{ta("extraMonthly", "Extra Monthly Payment")}</label>
                      <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                        <span className="text-slate-600">$</span>
                        <input type="text" value={extraMonthly.toLocaleString()} onChange={(e) => handleInputChange(setExtraMonthly, Number(e.target.value.replace(/,/g, "")) || 0)} className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none" />
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{ta("extraHelp", "Pay off your mortgage faster")}</p>
                    </div>
                    <div>
                      <label className="font-medium text-slate-700 text-sm block mb-2">{ta("loanStartDate", "Loan Start Date")}</label>
                      <input type="month" value={loanStartDate} onChange={(e) => handleInputChange(setLoanStartDate, e.target.value)} className="w-full bg-white rounded-lg px-3 py-2 border border-slate-200 font-bold text-blue-600 focus:outline-none" />
                      <p className="text-xs text-slate-400 mt-1">{ta("loanStartHelp", "When will your loan begin?")}</p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  <p className="text-sm text-slate-600 mb-1">{tr("monthlyPayment", "Total Monthly Payment")}</p>
                  <p className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{formatMoney(monthlyTotal)}</p>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-slate-400">{tr("perMonth", "/month")}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-sm text-slate-600">{tr("payoff", "Payoff")}: <strong className="text-slate-700">{payoffDate}</strong></span>
                  </div>

                  <div className="h-6 rounded-full overflow-hidden flex mb-3">
                    <div className="bg-blue-600 transition-all" style={{ width: `${piPercent * 0.7}%` }} />
                    <div className="bg-cyan-400 transition-all" style={{ width: `${piPercent * 0.3}%` }} />
                    <div className="bg-amber-400 transition-all" style={{ width: `${taxPercent}%` }} />
                    <div className="bg-emerald-400 transition-all" style={{ width: `${insurancePercent}%` }} />
                    {pmiPercent > 0 && <div className="bg-red-400 transition-all" style={{ width: `${pmiPercent}%` }} />}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm mb-6">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-blue-600"></span><span className="text-slate-600">{tr("principal", "Principal")}</span></div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-cyan-400"></span><span className="text-slate-600">{tr("interest", "Interest")}</span></div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-amber-400"></span><span className="text-slate-600">{tr("tax", "Tax")}</span></div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-emerald-400"></span><span className="text-slate-600">{tr("insuranceLabel", "Insurance")}</span></div>
                    {monthlyPMI > 0 && <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-red-400"></span><span className="text-slate-600">{tr("pmi", "PMI")}</span></div>}
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-slate-600 font-medium">{tr("component", "Component")}</th>
                          <th className="px-4 py-2 text-right text-slate-600 font-medium">{tr("monthly", "Monthly")}</th>
                          <th className="px-4 py-2 text-right text-slate-600 font-medium">{tr("total", "Total")} ({loanTerm}yr)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr><td className="px-4 py-2 text-slate-700">{tr("principalInterest", "Principal & Interest")}</td><td className="px-4 py-2 text-right font-medium">{formatMoney(monthlyPI)}</td><td className="px-4 py-2 text-right text-slate-600">{formatMoney(monthlyPI * loanTerm * 12)}</td></tr>
                        <tr><td className="px-4 py-2 text-slate-700">{tr("propertyTax", "Property Tax")}</td><td className="px-4 py-2 text-right font-medium">{formatMoney(monthlyTax)}</td><td className="px-4 py-2 text-right text-slate-600">{formatMoney(propertyTax * loanTerm)}</td></tr>
                        <tr><td className="px-4 py-2 text-slate-700">{tr("homeInsurance", "Home Insurance")}</td><td className="px-4 py-2 text-right font-medium">{formatMoney(monthlyInsurance)}</td><td className="px-4 py-2 text-right text-slate-600">{formatMoney(homeInsurance * loanTerm)}</td></tr>
                        {monthlyPMI > 0 && <tr><td className="px-4 py-2 text-slate-700">{tr("pmi", "PMI")}</td><td className="px-4 py-2 text-right font-medium text-red-500">{formatMoney(monthlyPMI)}</td><td className="px-4 py-2 text-right text-slate-600">{formatMoney(monthlyPMI * loanTerm * 12)}</td></tr>}
                        <tr className="bg-blue-50"><td className="px-4 py-2 font-semibold text-blue-700">{tr("total", "Total")}</td><td className="px-4 py-2 text-right font-bold text-blue-700">{formatMoney(monthlyTotal)}</td><td className="px-4 py-2 text-right font-bold text-blue-700">{formatMoney(monthlyTotal * loanTerm * 12)}</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center"><p className="text-xs text-slate-600">{tr("loanAmount", "Loan Amount")}</p><p className="text-sm font-bold text-slate-800">{formatMoney(loanAmount)}</p></div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center"><p className="text-xs text-slate-600">{tr("totalInterest", "Total Interest")}</p><p className="text-sm font-bold text-red-500">{formatMoney(totalInterest)}</p></div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center"><p className="text-xs text-slate-600">{tr("payoffDate", "Payoff Date")}</p><p className="text-sm font-bold text-slate-800">{payoffDate}</p></div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center"><p className="text-xs text-slate-600">{tr("totalPayments", "Total Payments")}</p><p className="text-sm font-bold text-slate-800">{totalPayments}</p></div>
                  </div>
                </div>

                <button onClick={() => setShowTableModal(true)} className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 font-medium mb-4">
                  📅 {tb("viewAmortization", "View Amortization Schedule")}
                </button>

                <div className={`grid ${session?.user ? 'grid-cols-3' : 'grid-cols-2'} gap-3`}>
                  {session?.user && <button onClick={saveToHistory} disabled={saveStatus === 'saving'} className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">💾 {saveStatus === 'saving' ? '...' : tb("save", "Save")}</button>}
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">📄 {tb("pdf", "PDF")} <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{t("common.pro", "PRO")}</span></button>
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">📊 {tb("excel", "Excel")} <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{t("common.pro", "PRO")}</span></button>
                </div>
              </div>
            </div>
            <div className="mt-8"><AdBlock slot="calculator-bottom" /></div>
          </div>
        </section>

        <section className="py-12 bg-slate-50">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📖 {t("education.title", "What is a Mortgage?")}</h2>
                  <p className="text-slate-600 mb-4">{t("education.content1", "A mortgage is a loan used to purchase a home. The borrower agrees to pay the lender over time, typically in regular payments divided into principal and interest.")}</p>
                  <p className="text-slate-600">{t("education.content2", "Most mortgages are amortizing, meaning each payment covers both interest and principal. Early payments are mostly interest; later payments are mostly principal.")}</p>
                </div>

                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📐 {t("education.formula.title", "The Formula")}</h2>
                  <div className="bg-slate-100 rounded-xl p-6 mb-6 text-center">
                    <p className="text-xl font-mono font-bold text-slate-800">M = P × [r(1+r)<sup>n</sup>] / [(1+r)<sup>n</sup> - 1]</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">M</span><span className="text-slate-600">= {t("education.formula.m", "Monthly payment")}</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">P</span><span className="text-slate-600">= {t("education.formula.p", "Principal (loan amount)")}</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">r</span><span className="text-slate-600">= {t("education.formula.r", "Monthly interest rate")}</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">n</span><span className="text-slate-600">= {t("education.formula.n", "Total number of payments")}</span></div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 {t("education.tips.title", "Money-Saving Tips")}</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4"><span className="text-2xl">🎯</span><div><h3 className="font-semibold text-slate-900">{t("education.tips.tip1.title", "Put 20% Down")}</h3><p className="text-slate-600">{t("education.tips.tip1.description", "Avoid PMI and get better rates.")}</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">📉</span><div><h3 className="font-semibold text-slate-900">{t("education.tips.tip2.title", "Shop Multiple Lenders")}</h3><p className="text-slate-600">{t("education.tips.tip2.description", "Even 0.25% difference saves thousands.")}</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">⚡</span><div><h3 className="font-semibold text-slate-900">{t("education.tips.tip3.title", "Consider 15-Year Term")}</h3><p className="text-slate-600">{t("education.tips.tip3.description", "Lower rates, massive interest savings.")}</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">💰</span><div><h3 className="font-semibold text-slate-900">{t("education.tips.tip4.title", "Make Extra Payments")}</h3><p className="text-slate-600">{t("education.tips.tip4.description", "One extra payment/year = 4-5 years off.")}</p></div></div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">❓ {t("education.faqTitle", "Frequently Asked Questions")}</h2>
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
                <div className="hidden md:block bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">💰</span>{t("sidebar.financeTitle", "Financial Calculators")}</h3>
                  <div className="space-y-2">{financeCalcs.map((calc) => <Link key={calc} href={`/${locale}/${calc.toLowerCase().replace(/ /g, "-")}-calculator`} className="block text-blue-600 hover:text-blue-800 hover:underline text-sm">{calc}</Link>)}</div>
                </div>
                <div className="hidden md:block bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-sm">💪</span>{t("sidebar.healthTitle", "Health Calculators")}</h3>
                  <div className="space-y-2">{healthCalcs.map((calc) => <Link key={calc} href={`/${locale}/${calc.toLowerCase().replace(/ /g, "-")}-calculator`} className="block text-blue-600 hover:text-blue-800 hover:underline text-sm">{calc}</Link>)}</div>
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
