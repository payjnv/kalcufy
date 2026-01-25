"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import AdBlock from "@/components/ads/AdBlock";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

const CALCULATOR_SLUG = "income-tax-calculator";
const CALCULATOR_NAME = "Income Tax Calculator";
const CALCULATOR_CATEGORY = "finance";

export default function IncomeTaxCalculator() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // Basic inputs
  const [grossIncome, setGrossIncome] = useState(75000);
  const [filingStatus, setFilingStatus] = useState<"single" | "married" | "marriedSeparate" | "head">("single");
  const [state, setState] = useState("CA");
  const [numChildren, setNumChildren] = useState(0);
  
  // Deduction type
  const [deductionType, setDeductionType] = useState<"standard" | "itemized">("standard");
  
  // Itemized deductions
  const [mortgageInterest, setMortgageInterest] = useState(0);
  const [propertyTax, setPropertyTax] = useState(0);
  const [stateTaxPaid, setStateTaxPaid] = useState(0);
  const [charitableGiving, setCharitableGiving] = useState(0);
  const [medicalExpenses, setMedicalExpenses] = useState(0);
  
  // Pre-tax deductions
  const [retirement401k, setRetirement401k] = useState(0);
  const [traditionalIra, setTraditionalIra] = useState(0);
  const [hsaContribution, setHsaContribution] = useState(0);

  // Show modal
  const [showBracketModal, setShowBracketModal] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Results
  const [agi, setAgi] = useState(0);
  const [taxableIncome, setTaxableIncome] = useState(0);
  const [federalTax, setFederalTax] = useState(0);
  const [stateTax, setStateTax] = useState(0);
  const [ficaTax, setFicaTax] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [effectiveRate, setEffectiveRate] = useState(0);
  const [marginalRate, setMarginalRate] = useState(0);
  const [takeHomePay, setTakeHomePay] = useState(0);
  const [taxCredits, setTaxCredits] = useState(0);
  const [bracketBreakdown, setBracketBreakdown] = useState<any[]>([]);

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
      const res = await fetch("/api/history", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, calculatorName: CALCULATOR_NAME, inputs: { grossIncome, filingStatus, state, deductionType }, results: { totalTax: totalTax.toFixed(2), effectiveRate: effectiveRate.toFixed(2), takeHomePay: takeHomePay.toFixed(2) } }) });
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

  // 2025 Federal Tax Brackets
  const federalBrackets = {
    single: [
      { min: 0, max: 11925, rate: 0.10 },
      { min: 11925, max: 48475, rate: 0.12 },
      { min: 48475, max: 103350, rate: 0.22 },
      { min: 103350, max: 197300, rate: 0.24 },
      { min: 197300, max: 250525, rate: 0.32 },
      { min: 250525, max: 626350, rate: 0.35 },
      { min: 626350, max: Infinity, rate: 0.37 },
    ],
    married: [
      { min: 0, max: 23850, rate: 0.10 },
      { min: 23850, max: 96950, rate: 0.12 },
      { min: 96950, max: 206700, rate: 0.22 },
      { min: 206700, max: 394600, rate: 0.24 },
      { min: 394600, max: 501050, rate: 0.32 },
      { min: 501050, max: 751600, rate: 0.35 },
      { min: 751600, max: Infinity, rate: 0.37 },
    ],
    marriedSeparate: [
      { min: 0, max: 11925, rate: 0.10 },
      { min: 11925, max: 48475, rate: 0.12 },
      { min: 48475, max: 103350, rate: 0.22 },
      { min: 103350, max: 197300, rate: 0.24 },
      { min: 197300, max: 250525, rate: 0.32 },
      { min: 250525, max: 375800, rate: 0.35 },
      { min: 375800, max: Infinity, rate: 0.37 },
    ],
    head: [
      { min: 0, max: 17000, rate: 0.10 },
      { min: 17000, max: 64850, rate: 0.12 },
      { min: 64850, max: 103350, rate: 0.22 },
      { min: 103350, max: 197300, rate: 0.24 },
      { min: 197300, max: 250500, rate: 0.32 },
      { min: 250500, max: 626350, rate: 0.35 },
      { min: 626350, max: Infinity, rate: 0.37 },
    ],
  };

  // Standard deductions 2025
  const standardDeductions = {
    single: 15000,
    married: 30000,
    marriedSeparate: 15000,
    head: 22500,
  };

  // State tax rates (simplified - using flat rate approximation)
  const stateTaxRates: { [key: string]: { rate: number; type: string } } = {
    "AL": { rate: 0.05, type: "flat" }, "AK": { rate: 0, type: "none" }, "AZ": { rate: 0.025, type: "flat" },
    "AR": { rate: 0.047, type: "graduated" }, "CA": { rate: 0.0930, type: "graduated" }, "CO": { rate: 0.044, type: "flat" },
    "CT": { rate: 0.0699, type: "graduated" }, "DE": { rate: 0.066, type: "graduated" }, "FL": { rate: 0, type: "none" },
    "GA": { rate: 0.0549, type: "flat" }, "HI": { rate: 0.11, type: "graduated" }, "ID": { rate: 0.058, type: "flat" },
    "IL": { rate: 0.0495, type: "flat" }, "IN": { rate: 0.0305, type: "flat" }, "IA": { rate: 0.06, type: "graduated" },
    "KS": { rate: 0.057, type: "graduated" }, "KY": { rate: 0.04, type: "flat" }, "LA": { rate: 0.0425, type: "graduated" },
    "ME": { rate: 0.0715, type: "graduated" }, "MD": { rate: 0.0575, type: "graduated" }, "MA": { rate: 0.05, type: "flat" },
    "MI": { rate: 0.0425, type: "flat" }, "MN": { rate: 0.0985, type: "graduated" }, "MS": { rate: 0.05, type: "flat" },
    "MO": { rate: 0.048, type: "graduated" }, "MT": { rate: 0.059, type: "graduated" }, "NE": { rate: 0.0664, type: "graduated" },
    "NV": { rate: 0, type: "none" }, "NH": { rate: 0, type: "none" }, "NJ": { rate: 0.1075, type: "graduated" },
    "NM": { rate: 0.059, type: "graduated" }, "NY": { rate: 0.109, type: "graduated" }, "NC": { rate: 0.0525, type: "flat" },
    "ND": { rate: 0.0295, type: "graduated" }, "OH": { rate: 0.04, type: "graduated" }, "OK": { rate: 0.0475, type: "graduated" },
    "OR": { rate: 0.099, type: "graduated" }, "PA": { rate: 0.0307, type: "flat" }, "RI": { rate: 0.0599, type: "graduated" },
    "SC": { rate: 0.064, type: "graduated" }, "SD": { rate: 0, type: "none" }, "TN": { rate: 0, type: "none" },
    "TX": { rate: 0, type: "none" }, "UT": { rate: 0.0465, type: "flat" }, "VT": { rate: 0.0875, type: "graduated" },
    "VA": { rate: 0.0575, type: "graduated" }, "WA": { rate: 0, type: "none" }, "WV": { rate: 0.065, type: "graduated" },
    "WI": { rate: 0.0765, type: "graduated" }, "WY": { rate: 0, type: "none" }
  };

  // Calculate federal tax with bracket breakdown
  const calculateFederalTax = (taxableIncome: number) => {
    const brackets = federalBrackets[filingStatus];
    let tax = 0;
    let remaining = taxableIncome;
    const breakdown: any[] = [];
    let lastRate = 0.10;

    for (const bracket of brackets) {
      if (remaining <= 0) break;
      const taxableInBracket = Math.min(remaining, bracket.max - bracket.min);
      const taxInBracket = taxableInBracket * bracket.rate;
      tax += taxInBracket;
      lastRate = bracket.rate;
      
      if (taxableInBracket > 0) {
        breakdown.push({
          rate: bracket.rate * 100,
          income: taxableInBracket,
          tax: taxInBracket,
          range: `$${bracket.min.toLocaleString()} - $${bracket.max === Infinity ? '∞' : bracket.max.toLocaleString()}`
        });
      }
      remaining -= taxableInBracket;
    }

    return { tax, breakdown, marginalRate: lastRate };
  };

  // Calculate
  useEffect(() => {
    // Calculate pre-tax deductions
    const totalPreTax = retirement401k + traditionalIra + hsaContribution;
    
    // Calculate AGI
    const agiCalc = grossIncome - totalPreTax;
    
    // Calculate itemized total
    const saltCap = 10000; // SALT cap
    const saltDeduction = Math.min(propertyTax + stateTaxPaid, saltCap);
    const deductibleMedical = Math.max(0, medicalExpenses - (agiCalc * 0.075));
    const itemizedTotal = mortgageInterest + saltDeduction + charitableGiving + deductibleMedical;
    
    // Use higher of standard or itemized
    const standardDed = standardDeductions[filingStatus];
    const actualDeduction = deductionType === "standard" ? standardDed : Math.max(itemizedTotal, standardDed);
    
    // Calculate taxable income
    const taxableIncomeCalc = Math.max(0, agiCalc - actualDeduction);
    
    // Calculate federal tax
    const { tax: fedTax, breakdown, marginalRate: margRate } = calculateFederalTax(taxableIncomeCalc);
    
    // Calculate state tax
    const stateInfo = stateTaxRates[state] || { rate: 0, type: "none" };
    const stateT = taxableIncomeCalc * stateInfo.rate;
    
    // Calculate FICA
    const socialSecurityCap = 176100;
    const ssTax = Math.min(grossIncome, socialSecurityCap) * 0.062;
    const medicareTax = grossIncome * 0.0145;
    const additionalMedicare = filingStatus === "married" 
      ? Math.max(0, grossIncome - 250000) * 0.009 
      : Math.max(0, grossIncome - 200000) * 0.009;
    const ficaTotal = ssTax + medicareTax + additionalMedicare;
    
    // Calculate child tax credit
    const childCredit = Math.min(numChildren * 2000, fedTax);
    
    // Calculate totals
    const totalTaxCalc = Math.max(0, fedTax - childCredit) + stateT + ficaTotal;
    const effectiveRateCalc = grossIncome > 0 ? (totalTaxCalc / grossIncome) * 100 : 0;
    const takeHomeCalc = grossIncome - totalTaxCalc;
    
    // Update state
    setAgi(agiCalc);
    setTaxableIncome(taxableIncomeCalc);
    setFederalTax(fedTax);
    setStateTax(stateT);
    setFicaTax(ficaTotal);
    setTaxCredits(childCredit);
    setTotalTax(totalTaxCalc);
    setEffectiveRate(effectiveRateCalc);
    setMarginalRate(margRate * 100);
    setTakeHomePay(takeHomeCalc);
    setBracketBreakdown(breakdown);
    
  }, [grossIncome, filingStatus, state, deductionType, mortgageInterest, propertyTax, 
      stateTaxPaid, charitableGiving, medicalExpenses, retirement401k, traditionalIra, 
      hsaContribution, numChildren]);

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

  // States list
  const statesList = [
    { code: "AL", name: "Alabama" }, { code: "AK", name: "Alaska" }, { code: "AZ", name: "Arizona" },
    { code: "AR", name: "Arkansas" }, { code: "CA", name: "California" }, { code: "CO", name: "Colorado" },
    { code: "CT", name: "Connecticut" }, { code: "DE", name: "Delaware" }, { code: "FL", name: "Florida" },
    { code: "GA", name: "Georgia" }, { code: "HI", name: "Hawaii" }, { code: "ID", name: "Idaho" },
    { code: "IL", name: "Illinois" }, { code: "IN", name: "Indiana" }, { code: "IA", name: "Iowa" },
    { code: "KS", name: "Kansas" }, { code: "KY", name: "Kentucky" }, { code: "LA", name: "Louisiana" },
    { code: "ME", name: "Maine" }, { code: "MD", name: "Maryland" }, { code: "MA", name: "Massachusetts" },
    { code: "MI", name: "Michigan" }, { code: "MN", name: "Minnesota" }, { code: "MS", name: "Mississippi" },
    { code: "MO", name: "Missouri" }, { code: "MT", name: "Montana" }, { code: "NE", name: "Nebraska" },
    { code: "NV", name: "Nevada" }, { code: "NH", name: "New Hampshire" }, { code: "NJ", name: "New Jersey" },
    { code: "NM", name: "New Mexico" }, { code: "NY", name: "New York" }, { code: "NC", name: "North Carolina" },
    { code: "ND", name: "North Dakota" }, { code: "OH", name: "Ohio" }, { code: "OK", name: "Oklahoma" },
    { code: "OR", name: "Oregon" }, { code: "PA", name: "Pennsylvania" }, { code: "RI", name: "Rhode Island" },
    { code: "SC", name: "South Carolina" }, { code: "SD", name: "South Dakota" }, { code: "TN", name: "Tennessee" },
    { code: "TX", name: "Texas" }, { code: "UT", name: "Utah" }, { code: "VT", name: "Vermont" },
    { code: "VA", name: "Virginia" }, { code: "WA", name: "Washington" }, { code: "WV", name: "West Virginia" },
    { code: "WI", name: "Wisconsin" }, { code: "WY", name: "Wyoming" }
  ];

  const noIncomeTaxStates = ["AK", "FL", "NV", "NH", "SD", "TN", "TX", "WA", "WY"];

  // FAQ data
  const defaultFaqs = [
    { question: "What is the difference between marginal and effective tax rate?", answer: "Your marginal tax rate is the rate you pay on your last dollar of income (your highest bracket). Your effective tax rate is your total tax divided by your total income - the actual percentage you pay overall." },
    { question: "Should I take the standard deduction or itemize?", answer: "Take whichever is higher. Most people benefit from the standard deduction ($15,000 single, $30,000 married in 2025). Itemize if your mortgage interest, state/local taxes (capped at $10K), and charitable contributions exceed the standard deduction." },
    { question: "What is the Child Tax Credit for 2025?", answer: "The Child Tax Credit is $2,000 per child under 17, with up to $1,700 refundable. It phases out at $200,000 for single filers and $400,000 for married filing jointly." },
    { question: "What are FICA taxes?", answer: "FICA taxes fund Social Security (6.2% up to $176,100) and Medicare (1.45% with no cap, plus an additional 0.9% on income over $200K single or $250K married)." },
    { question: "How can I reduce my taxable income?", answer: "Contribute to pre-tax retirement accounts (401k up to $23,500, IRA up to $7,000), HSA ($4,300 individual, $8,550 family), and maximize deductions. Consider timing income and deductions across tax years." }
  ];
  const faqs = translations?.faq || defaultFaqs;

  // Categories
  const financeCalcs = ["Mortgage", "Loan", "Compound Interest", "Auto Loan", "Retirement", "Investment", "Paycheck", "Profit Margin", "401K", "Budget"];
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

      {/* Tax Bracket Modal */}
      {showBracketModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Federal Tax Bracket Breakdown</h3>
              <button onClick={() => handleInputChange(setShowBracketModal, false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="p-6 overflow-auto max-h-[50vh]">
              <p className="text-sm text-slate-600 mb-4">Your taxable income: <strong>{formatMoney(taxableIncome)}</strong></p>
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Bracket</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Income</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Tax</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bracketBreakdown.map((row, i) => (
                    <tr key={i} className={i === bracketBreakdown.length - 1 ? "bg-blue-50" : ""}>
                      <td className="px-4 py-3">
                        <span className="font-semibold text-blue-600">{row.rate}%</span>
                        <span className="text-xs text-slate-400 ml-2">{row.range}</span>
                      </td>
                      <td className="px-4 py-3 text-right text-slate-600">{formatMoney(row.income)}</td>
                      <td className="px-4 py-3 text-right font-semibold text-red-600">{formatMoney(row.tax)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-100">
                  <tr>
                    <td className="px-4 py-3 font-bold">Total Federal Tax</td>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3 text-right font-bold text-red-600">{formatMoney(federalTax)}</td>
                  </tr>
                </tfoot>
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
              <span className="text-slate-700">{t("calculator.breadcrumb", "Income Tax")}</span>
            </nav>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">🧾</div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{t("calculator.title", "Income Tax Calculator")}</h1>
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
                  <p className="text-slate-600">{t("calculator.subtitle", "Estimate your federal and state income taxes")}</p>
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
                <h2 className="text-xl font-bold text-slate-900 mb-6">{t("calculator.details", "Income Details")}</h2>

                {/* Gross Income */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{t("calculator.inputs.grossIncome", "Annual Gross Income")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input
                        type="text"
                        value={grossIncome.toLocaleString()}
                        onChange={(e) => handleInputChange(setGrossIncome, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-28 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="20000"
                    max="500000"
                    step="1000"
                    value={grossIncome}
                    onChange={(e) => handleInputChange(setGrossIncome, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>$20,000</span>
                    <span>$500,000</span>
                  </div>
                </div>

                {/* Filing Status */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">{t("calculator.inputs.filingStatus", "Filing Status")}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: "single", label: "Single" },
                      { value: "married", label: "Married Filing Jointly" },
                      { value: "marriedSeparate", label: "Married Separate" },
                      { value: "head", label: "Head of Household" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleInputChange(setFilingStatus, option.value)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          filingStatus === option.value
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* State */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">{t("calculator.inputs.state", "State")}</label>
                  <select
                    value={state}
                    onChange={(e) => handleInputChange(setState, e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {statesList.map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.name} {noIncomeTaxStates.includes(s.code) ? "(No income tax)" : `(${(stateTaxRates[s.code]?.rate * 100).toFixed(1)}%)`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Children */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">{t("calculator.inputs.children", "Children Under 17")} (for Child Tax Credit)</label>
                  <div className="flex items-center gap-3">
                    <button onClick={() => handleInputChange(setNumChildren, Math.max(0, numChildren - 1))} className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold">-</button>
                    <span className="w-12 text-center text-xl font-bold text-blue-600">{numChildren}</span>
                    <button onClick={() => handleInputChange(setNumChildren, Math.min(10, numChildren + 1))} className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold">+</button>
                  </div>
                </div>

                {/* Deduction Type */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">{t("calculator.inputs.deduction", "Deduction Type")}</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleInputChange(setDeductionType, "standard")}
                      className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                        deductionType === "standard" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Standard ({formatMoney(standardDeductions[filingStatus])})
                    </button>
                    <button
                      onClick={() => handleInputChange(setDeductionType, "itemized")}
                      className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                        deductionType === "itemized" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Itemized
                    </button>
                  </div>
                </div>

                {/* Itemized Deductions */}
                {deductionType === "itemized" && (
                  <div className="p-4 bg-slate-50 rounded-xl space-y-4 mb-6">
                    <h3 className="font-semibold text-slate-700">Itemized Deductions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-slate-600">Mortgage Interest</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                          <span className="px-2 py-1 bg-slate-50 text-slate-600 text-sm">$</span>
                          <input type="number" value={mortgageInterest || ""} onChange={(e) => handleInputChange(setMortgageInterest, Number(e.target.value) || 0)} className="flex-1 px-2 py-1 text-right text-sm focus:outline-none" placeholder="0" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-slate-600">Property Tax</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                          <span className="px-2 py-1 bg-slate-50 text-slate-600 text-sm">$</span>
                          <input type="number" value={propertyTax || ""} onChange={(e) => handleInputChange(setPropertyTax, Number(e.target.value) || 0)} className="flex-1 px-2 py-1 text-right text-sm focus:outline-none" placeholder="0" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-slate-600">State/Local Tax Paid</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                          <span className="px-2 py-1 bg-slate-50 text-slate-600 text-sm">$</span>
                          <input type="number" value={stateTaxPaid || ""} onChange={(e) => handleInputChange(setStateTaxPaid, Number(e.target.value) || 0)} className="flex-1 px-2 py-1 text-right text-sm focus:outline-none" placeholder="0" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-slate-600">Charitable Giving</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                          <span className="px-2 py-1 bg-slate-50 text-slate-600 text-sm">$</span>
                          <input type="number" value={charitableGiving || ""} onChange={(e) => handleInputChange(setCharitableGiving, Number(e.target.value) || 0)} className="flex-1 px-2 py-1 text-right text-sm focus:outline-none" placeholder="0" />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-amber-600">Note: SALT deduction is capped at $10,000</p>
                  </div>
                )}

                {/* Pre-Tax Deductions */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => handleInputChange(setShowAdvanced, !showAdvanced)}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">💰</span>
                      <span className="font-semibold text-slate-700">{t("calculator.advanced.title", "Pre-Tax Deductions")}</span>
                    </div>
                    <svg className={`w-5 h-5 text-slate-600 transition-transform ${showAdvanced ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showAdvanced && (
                    <div className="p-4 space-y-4 bg-white">
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">401(k) Contribution</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <span className="px-3 py-2 bg-slate-50 text-slate-600 border-r border-slate-200">$</span>
                          <input type="number" value={retirement401k || ""} onChange={(e) => handleInputChange(setRetirement401k, Number(e.target.value) || 0)} placeholder="0" className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none" />
                        </div>
                        <p className="text-xs text-slate-400 mt-1">2025 limit: $23,500</p>
                      </div>
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">Traditional IRA</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <span className="px-3 py-2 bg-slate-50 text-slate-600 border-r border-slate-200">$</span>
                          <input type="number" value={traditionalIra || ""} onChange={(e) => handleInputChange(setTraditionalIra, Number(e.target.value) || 0)} placeholder="0" className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none" />
                        </div>
                        <p className="text-xs text-slate-400 mt-1">2025 limit: $7,000</p>
                      </div>
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">HSA Contribution</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <span className="px-3 py-2 bg-slate-50 text-slate-600 border-r border-slate-200">$</span>
                          <input type="number" value={hsaContribution || ""} onChange={(e) => handleInputChange(setHsaContribution, Number(e.target.value) || 0)} placeholder="0" className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none" />
                        </div>
                        <p className="text-xs text-slate-400 mt-1">2025 limit: $4,300 (individual) / $8,550 (family)</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Results */}
              <div>
                {/* Results Card */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  <p className="text-sm text-slate-600 mb-1">{t("calculator.results.totalTax", "Total Tax")}</p>
                  <p className="text-4xl md:text-5xl font-bold text-red-600 mb-6">{formatMoney(totalTax)}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Take-Home Pay</p>
                      <p className="text-xl font-bold text-green-600">{formatMoney(takeHomePay)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Effective Rate</p>
                      <p className="text-xl font-bold text-blue-600">{effectiveRate.toFixed(1)}%</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Marginal Rate</p>
                      <p className="text-xl font-bold text-slate-800">{marginalRate.toFixed(0)}%</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Taxable Income</p>
                      <p className="text-xl font-bold text-slate-800">{formatMoney(taxableIncome)}</p>
                    </div>
                  </div>
                </div>

                {/* Tax Breakdown */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">Tax Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Gross Income</span>
                      <span className="font-semibold">{formatMoney(grossIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Adjusted Gross Income</span>
                      <span className="font-semibold">{formatMoney(agi)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Deduction ({deductionType})</span>
                      <span className="font-semibold text-green-600">-{formatMoney(standardDeductions[filingStatus])}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="text-slate-600">Federal Tax</span>
                      <span className="font-semibold text-red-600">{formatMoney(federalTax)}</span>
                    </div>
                    {taxCredits > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Child Tax Credit</span>
                        <span className="font-semibold text-green-600">-{formatMoney(taxCredits)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-600">State Tax ({state})</span>
                      <span className="font-semibold text-red-600">{formatMoney(stateTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">FICA (SS + Medicare)</span>
                      <span className="font-semibold text-red-600">{formatMoney(ficaTax)}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="font-semibold text-slate-900">Total Tax</span>
                      <span className="font-bold text-lg text-red-600">{formatMoney(totalTax)}</span>
                    </div>
                  </div>
                </div>

                {/* View Bracket Breakdown Button */}
                <button
                  onClick={() => handleInputChange(setShowBracketModal, true)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 font-medium mb-4"
                >
                  📊 {t("calculator.buttons.viewBrackets", "View Tax Bracket Breakdown")}
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

            {/* Ad Rectangle */}
            <div className="mt-8">
              <AdBlock slot="calculator-bottom" />
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* 2025 Tax Brackets */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">📊 2025 Federal Tax Brackets ({filingStatus === "married" ? "Married" : "Single"})</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 font-semibold text-slate-700">Rate</th>
                        <th className="text-right py-2 font-semibold text-slate-700">Income Range</th>
                      </tr>
                    </thead>
                    <tbody>
                      {federalBrackets[filingStatus].map((bracket, i) => (
                        <tr key={i} className={`border-b border-slate-100 ${taxableIncome > bracket.min ? "bg-blue-50" : ""}`}>
                          <td className="py-2 font-medium text-blue-600">{(bracket.rate * 100).toFixed(0)}%</td>
                          <td className="py-2 text-right text-slate-600">
                            ${bracket.min.toLocaleString()} - {bracket.max === Infinity ? "∞" : `$${bracket.max.toLocaleString()}`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* FICA Info */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">💡 FICA Taxes Explained</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm font-semibold text-slate-700 mb-1">Social Security (6.2%)</p>
                    <p className="text-sm text-slate-600">Applied to income up to $176,100 in 2025</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm font-semibold text-slate-700 mb-1">Medicare (1.45%)</p>
                    <p className="text-sm text-slate-600">No income cap</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm font-semibold text-slate-700 mb-1">Additional Medicare (0.9%)</p>
                    <p className="text-sm text-slate-600">Income over $200K (single) or $250K (married)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Example Calculation */}
        <section className="py-6 bg-white">
          <div className="container">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span>📊</span> Example Calculation
              </h3>
              <p className="text-slate-600 mb-4">
                Let's calculate taxes for a <strong>Single</strong> filer earning <strong>$75,000</strong> in <strong>California</strong> with the <strong>standard deduction</strong>:
              </p>
              <div className="bg-blue-50 rounded-xl p-6 mb-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-mono text-slate-700 text-sm">
                      Gross Income: $75,000<br />
                      Standard Deduction: -$15,000<br />
                      <strong>Taxable Income: $60,000</strong>
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-slate-700 text-sm">
                      Federal Tax: $8,600<br />
                      CA State Tax: $4,200<br />
                      FICA: $5,738<br />
                      <strong className="text-red-600">Total Tax: $18,538</strong>
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-slate-600">
                Take-home pay would be approximately <strong>$56,462</strong> with an effective tax rate of <strong>24.7%</strong>.
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
                {/* What is Income Tax */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📖 {t("education.title", "Understanding Income Tax")}</h2>
                  <p className="text-slate-600 mb-4">
                    Income tax is a tax imposed by the government on income earned by individuals and businesses. In the U.S., you pay federal income tax plus state income tax (in most states). The federal system uses progressive tax brackets, meaning higher income is taxed at higher rates.
                  </p>
                  <p className="text-slate-600">
                    Understanding how taxes work helps you make better financial decisions and potentially reduce your tax burden through legitimate deductions, credits, and retirement contributions.
                  </p>
                </div>

                {/* Formula */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📐 {t("education.formula.title", "Key Concepts")}</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="font-semibold text-slate-700 mb-1">Adjusted Gross Income (AGI)</p>
                      <p className="text-sm text-slate-600">AGI = Gross Income - Pre-tax Deductions (401k, IRA, HSA)</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="font-semibold text-slate-700 mb-1">Taxable Income</p>
                      <p className="text-sm text-slate-600">Taxable Income = AGI - Deduction (Standard or Itemized)</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="font-semibold text-slate-700 mb-1">Tax Owed</p>
                      <p className="text-sm text-slate-600">Tax = Federal + State + FICA - Tax Credits</p>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 Tax Reduction Strategies</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4"><span className="text-2xl">💰</span><div><h3 className="font-semibold text-slate-900">Max Out Retirement Accounts</h3><p className="text-slate-600">401(k) and IRA contributions reduce taxable income.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">🏥</span><div><h3 className="font-semibold text-slate-900">Use an HSA</h3><p className="text-slate-600">Triple tax advantage: tax-free in, growth, and out.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">🏠</span><div><h3 className="font-semibold text-slate-900">Consider Itemizing</h3><p className="text-slate-600">If mortgage interest + SALT + charity exceeds standard deduction.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">👶</span><div><h3 className="font-semibold text-slate-900">Claim Tax Credits</h3><p className="text-slate-600">Child Tax Credit is worth $2,000 per child under 17.</p></div></div>
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
                <AdBlock slot="calculator-sidebar" />

                {/* Finance Calculators */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">💰</span>
                    {t("sidebar.financeTitle", "Financial Calculators")}
                  </h3>
                  <div className="space-y-2">
                    {financeCalcs.map((calc) => (
                      <Link key={calc} href={`/${locale}/${calc.toLowerCase().replace(/ /g, "-")}-calculator`} className="block text-blue-600 hover:text-blue-800 hover:underline text-sm">
                        {calc}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Health Calculators */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-sm">💪</span>
                    {t("sidebar.healthTitle", "Health Calculators")}
                  </h3>
                  <div className="space-y-2">
                    {healthCalcs.map((calc) => (
                      <Link key={calc} href={`/${locale}/${calc.toLowerCase().replace(/ /g, "-")}-calculator`} className="block text-blue-600 hover:text-blue-800 hover:underline text-sm">
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
