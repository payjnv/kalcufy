"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import AdBlock from "@/components/ads/AdBlock";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

const CALCULATOR_SLUG = "paycheck-calculator";
const CALCULATOR_NAME = "Paycheck Calculator";
const CALCULATOR_CATEGORY = "finance";

export default function PaycheckCalculator() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // Calculator mode
  const [calculationType, setCalculationType] = useState<"salary" | "hourly">("salary");
  
  // Basic inputs
  const [grossSalary, setGrossSalary] = useState(75000);
  const [hourlyRate, setHourlyRate] = useState(35);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [overtimeHours, setOvertimeHours] = useState(0);
  const [payFrequency, setPayFrequency] = useState<"weekly" | "biweekly" | "semimonthly" | "monthly">("biweekly");
  
  // Tax inputs
  const [filingStatus, setFilingStatus] = useState<"single" | "married" | "marriedSeparate" | "head">("single");
  const [state, setState] = useState("CA");
  
  // Pre-tax deductions
  const [retirement401k, setRetirement401k] = useState(0);
  const [retirement401kType, setRetirement401kType] = useState<"percent" | "dollar">("percent");
  const [healthInsurance, setHealthInsurance] = useState(0);
  const [hsaContribution, setHsaContribution] = useState(0);
  
  // Advanced options
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showBreakdownModal, setShowBreakdownModal] = useState(false);
  
  // Results
  const [grossPay, setGrossPay] = useState(0);
  const [federalTax, setFederalTax] = useState(0);
  const [stateTax, setStateTax] = useState(0);
  const [socialSecurity, setSocialSecurity] = useState(0);
  const [medicare, setMedicare] = useState(0);
  const [totalPreTaxDeductions, setTotalPreTaxDeductions] = useState(0);
  const [netPay, setNetPay] = useState(0);
  const [effectiveTaxRate, setEffectiveTaxRate] = useState(0);
  const [annualGross, setAnnualGross] = useState(0);
  const [annualNet, setAnnualNet] = useState(0);

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
      const res = await fetch("/api/history", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, calculatorName: CALCULATOR_NAME, inputs: { grossSalary, payFrequency, filingStatus, state, retirement401k }, results: { grossPay: grossPay.toFixed(2), netPay: netPay.toFixed(2), federalTax: federalTax.toFixed(2), effectiveTaxRate: effectiveTaxRate.toFixed(2) } }) });
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

  // Pay periods per year
  const getPayPeriodsPerYear = () => {
    switch (payFrequency) {
      case "weekly": return 52;
      case "biweekly": return 26;
      case "semimonthly": return 24;
      case "monthly": return 12;
      default: return 26;
    }
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
  const standardDeduction = {
    single: 15000,
    married: 30000,
    marriedSeparate: 15000,
    head: 22500,
  };

  // State tax rates (simplified)
  const stateTaxRates: { [key: string]: number } = {
    "AL": 0.05, "AK": 0, "AZ": 0.025, "AR": 0.047, "CA": 0.0930,
    "CO": 0.044, "CT": 0.0699, "DE": 0.066, "FL": 0, "GA": 0.0549,
    "HI": 0.11, "ID": 0.058, "IL": 0.0495, "IN": 0.0305, "IA": 0.06,
    "KS": 0.057, "KY": 0.04, "LA": 0.0425, "ME": 0.0715, "MD": 0.0575,
    "MA": 0.05, "MI": 0.0425, "MN": 0.0985, "MS": 0.05, "MO": 0.048,
    "MT": 0.059, "NE": 0.0664, "NV": 0, "NH": 0, "NJ": 0.1075,
    "NM": 0.059, "NY": 0.109, "NC": 0.0525, "ND": 0.0295, "OH": 0.04,
    "OK": 0.0475, "OR": 0.099, "PA": 0.0307, "RI": 0.0599, "SC": 0.064,
    "SD": 0, "TN": 0, "TX": 0, "UT": 0.0465, "VT": 0.0875,
    "VA": 0.0575, "WA": 0, "WV": 0.065, "WI": 0.0765, "WY": 0
  };

  // Calculate federal tax
  const calculateFederalTax = (taxableIncome: number) => {
    const brackets = federalBrackets[filingStatus];
    let tax = 0;
    let remaining = taxableIncome;

    for (const bracket of brackets) {
      if (remaining <= 0) break;
      const taxableInBracket = Math.min(remaining, bracket.max - bracket.min);
      tax += taxableInBracket * bracket.rate;
      remaining -= taxableInBracket;
    }

    return tax;
  };

  // Calculate all values
  useEffect(() => {
    const payPeriods = getPayPeriodsPerYear();
    
    // Calculate gross pay per period
    let annualGrossCalc = 0;
    if (calculationType === "salary") {
      annualGrossCalc = grossSalary;
    } else {
      const regularPay = hourlyRate * hoursPerWeek * 52;
      const overtimePay = hourlyRate * 1.5 * overtimeHours * 52;
      annualGrossCalc = regularPay + overtimePay;
    }
    
    const grossPayPerPeriod = annualGrossCalc / payPeriods;
    
    // Calculate pre-tax deductions
    let preTax401k = 0;
    if (retirement401kType === "percent") {
      preTax401k = (annualGrossCalc * retirement401k / 100) / payPeriods;
    } else {
      preTax401k = retirement401k / payPeriods;
    }
    
    const preTaxDeductionsPerPeriod = preTax401k + (healthInsurance / payPeriods) + (hsaContribution / payPeriods);
    const annualPreTaxDeductions = preTaxDeductionsPerPeriod * payPeriods;
    
    // Calculate taxable income
    const taxableIncome = Math.max(0, annualGrossCalc - annualPreTaxDeductions - standardDeduction[filingStatus]);
    
    // Calculate federal tax
    const annualFederalTax = calculateFederalTax(taxableIncome);
    const federalTaxPerPeriod = annualFederalTax / payPeriods;
    
    // Calculate state tax
    const stateRate = stateTaxRates[state] || 0;
    const annualStateTax = taxableIncome * stateRate;
    const stateTaxPerPeriod = annualStateTax / payPeriods;
    
    // Calculate FICA
    const socialSecurityCap = 176100;
    const annualSS = Math.min(annualGrossCalc, socialSecurityCap) * 0.062;
    const ssPerPeriod = annualSS / payPeriods;
    
    let annualMedicare = annualGrossCalc * 0.0145;
    const medicareThreshold = filingStatus === "married" ? 250000 : 200000;
    if (annualGrossCalc > medicareThreshold) {
      annualMedicare += (annualGrossCalc - medicareThreshold) * 0.009;
    }
    const medicarePerPeriod = annualMedicare / payPeriods;
    
    // Calculate net pay
    const totalTaxes = federalTaxPerPeriod + stateTaxPerPeriod + ssPerPeriod + medicarePerPeriod;
    const netPayPerPeriod = grossPayPerPeriod - preTaxDeductionsPerPeriod - totalTaxes;
    
    // Update state
    setAnnualGross(annualGrossCalc);
    setGrossPay(grossPayPerPeriod);
    setFederalTax(federalTaxPerPeriod);
    setStateTax(stateTaxPerPeriod);
    setSocialSecurity(ssPerPeriod);
    setMedicare(medicarePerPeriod);
    setTotalPreTaxDeductions(preTaxDeductionsPerPeriod);
    setNetPay(netPayPerPeriod);
    setAnnualNet(netPayPerPeriod * payPeriods);
    
    const totalAnnualTax = annualFederalTax + annualStateTax + annualSS + annualMedicare;
    setEffectiveTaxRate(annualGrossCalc > 0 ? (totalAnnualTax / annualGrossCalc) * 100 : 0);
    
  }, [calculationType, grossSalary, hourlyRate, hoursPerWeek, overtimeHours, payFrequency, 
      filingStatus, state, retirement401k, retirement401kType, healthInsurance, hsaContribution]);

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
    { question: "How is my paycheck calculated?", answer: "Your paycheck is calculated by starting with your gross pay, then subtracting federal income tax, state income tax, Social Security tax (6.2%), Medicare tax (1.45%), and any pre-tax deductions like 401(k) and health insurance." },
    { question: "What's the difference between gross and net pay?", answer: "Gross pay is your total earnings before deductions. Net pay (take-home pay) is what you actually receive after all taxes and deductions are subtracted. The difference is typically 20-35% of gross pay." },
    { question: "What are FICA taxes?", answer: "FICA taxes fund Social Security and Medicare. You pay 6.2% for Social Security (up to $176,100 in 2025) and 1.45% for Medicare. High earners pay an additional 0.9% Medicare tax on income over $200,000." },
    { question: "Should I contribute to a traditional or Roth 401(k)?", answer: "Traditional 401(k) reduces your taxable income now but is taxed in retirement. Roth 401(k) is after-tax but grows tax-free. Choose traditional if you expect a lower tax bracket in retirement." },
    { question: "Which states have no income tax?", answer: "Nine states have no income tax: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming." }
  ];
  const faqs = translations?.faq || defaultFaqs;

  // Categories
  const financeCalcs = ["Mortgage", "Loan", "Compound Interest", "Auto Loan", "Retirement", "Investment", "401K", "Income Tax", "Profit Margin"];
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

      {/* Breakdown Modal */}
      {showBreakdownModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Pay Breakdown Details</h3>
              <button onClick={() => handleInputChange(setShowBreakdownModal, false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="p-6 overflow-auto max-h-[60vh]">
              <table className="w-full">
                <tbody className="divide-y divide-slate-100">
                  <tr className="bg-blue-50">
                    <td className="px-4 py-3 font-semibold">Gross Pay</td>
                    <td className="px-4 py-3 text-right font-bold text-slate-900">{formatMoney(grossPay)}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-600 pl-8">Federal Income Tax</td>
                    <td className="px-4 py-3 text-right text-red-600">-{formatMoney(federalTax)}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-600 pl-8">State Income Tax ({state})</td>
                    <td className="px-4 py-3 text-right text-red-600">-{formatMoney(stateTax)}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-600 pl-8">Social Security (6.2%)</td>
                    <td className="px-4 py-3 text-right text-red-600">-{formatMoney(socialSecurity)}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-600 pl-8">Medicare (1.45%)</td>
                    <td className="px-4 py-3 text-right text-red-600">-{formatMoney(medicare)}</td>
                  </tr>
                  {totalPreTaxDeductions > 0 && (
                    <tr>
                      <td className="px-4 py-3 text-slate-600 pl-8">Pre-Tax Deductions</td>
                      <td className="px-4 py-3 text-right text-red-600">-{formatMoney(totalPreTaxDeductions)}</td>
                    </tr>
                  )}
                  <tr className="bg-green-50">
                    <td className="px-4 py-3 font-semibold">Net Pay (Take-Home)</td>
                    <td className="px-4 py-3 text-right font-bold text-green-600">{formatMoney(netPay)}</td>
                  </tr>
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
              <span className="text-slate-700">{t("calculator.breadcrumb", "Paycheck")}</span>
            </nav>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">💵</div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{t("calculator.title", "Paycheck Calculator")}</h1>
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
                  <p className="text-slate-600">{t("calculator.subtitle", "Calculate your take-home pay after taxes and deductions")}</p>
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
                <h2 className="text-xl font-bold text-slate-900 mb-6">{t("calculator.incomeDetails", "Income Details")}</h2>

                {/* Salary vs Hourly Toggle */}
                <div className="mb-6">
                  <div className="flex bg-slate-100 rounded-xl p-1">
                    <button
                      onClick={() => handleInputChange(setCalculationType, "salary")}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                        calculationType === "salary" ? "bg-white shadow text-blue-600" : "text-slate-600"
                      }`}
                    >
                      {t("calculator.inputs.salary", "Salary")}
                    </button>
                    <button
                      onClick={() => handleInputChange(setCalculationType, "hourly")}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                        calculationType === "hourly" ? "bg-white shadow text-blue-600" : "text-slate-600"
                      }`}
                    >
                      {t("calculator.inputs.hourly", "Hourly")}
                    </button>
                  </div>
                </div>

                {/* Salary Input */}
                {calculationType === "salary" && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium text-slate-700">{t("calculator.inputs.annualSalary", "Annual Salary")}</label>
                      <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                        <span className="text-slate-600">$</span>
                        <input
                          type="text"
                          value={grossSalary.toLocaleString()}
                          onChange={(e) => handleInputChange(setGrossSalary, Number(e.target.value.replace(/,/g, "")) || 0)}
                          className="w-28 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      min="20000"
                      max="500000"
                      step="1000"
                      value={grossSalary}
                      onChange={(e) => handleInputChange(setGrossSalary, Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-slate-600 mt-1">
                      <span>$20,000</span>
                      <span>$500,000</span>
                    </div>
                  </div>
                )}

                {/* Hourly Inputs */}
                {calculationType === "hourly" && (
                  <>
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <label className="font-medium text-slate-700">{t("calculator.inputs.hourlyRate", "Hourly Rate")}</label>
                        <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                          <span className="text-slate-600">$</span>
                          <input
                            type="number"
                            value={hourlyRate}
                            onChange={(e) => handleInputChange(setHourlyRate, Number(e.target.value) || 0)}
                            className="w-20 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                          />
                          <span className="text-slate-600 ml-1">/hr</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="200"
                        step="1"
                        value={hourlyRate}
                        onChange={(e) => handleInputChange(setHourlyRate, Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <label className="font-medium text-slate-700">{t("calculator.inputs.hoursPerWeek", "Hours per Week")}</label>
                        <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                          <input
                            type="number"
                            value={hoursPerWeek}
                            onChange={(e) => handleInputChange(setHoursPerWeek, Number(e.target.value) || 0)}
                            className="w-16 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                          />
                          <span className="text-slate-600 ml-1">hrs</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Pay Frequency */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">{t("calculator.inputs.payFrequency", "Pay Frequency")}</label>
                  <select
                    value={payFrequency}
                    onChange={(e) => handleInputChange(setPayFrequency, e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="weekly">Weekly (52 paychecks/year)</option>
                    <option value="biweekly">Bi-weekly (26 paychecks/year)</option>
                    <option value="semimonthly">Semi-monthly (24 paychecks/year)</option>
                    <option value="monthly">Monthly (12 paychecks/year)</option>
                  </select>
                </div>

                {/* Filing Status */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">{t("calculator.inputs.filingStatus", "Filing Status")}</label>
                  <select
                    value={filingStatus}
                    onChange={(e) => handleInputChange(setFilingStatus, e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="single">Single</option>
                    <option value="married">Married Filing Jointly</option>
                    <option value="marriedSeparate">Married Filing Separately</option>
                    <option value="head">Head of Household</option>
                  </select>
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
                        {s.name} {noIncomeTaxStates.includes(s.code) ? "(No income tax)" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Advanced Options Toggle */}
                <button
                  onClick={() => handleInputChange(setShowAdvanced, !showAdvanced)}
                  className="flex items-center gap-2 text-blue-600 font-medium"
                >
                  <svg className={`w-4 h-4 transition-transform ${showAdvanced ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  {showAdvanced ? t("calculator.advanced.hide", "Hide") : t("calculator.advanced.show", "Show")} {t("calculator.advanced.title", "Deductions")}
                </button>

                {/* Advanced Options */}
                {showAdvanced && (
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl space-y-4">
                    <div>
                      <label className="font-medium text-slate-700 block mb-2">401(k) Contribution</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={retirement401k}
                          onChange={(e) => handleInputChange(setRetirement401k, Number(e.target.value) || 0)}
                          className="flex-1 p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                        />
                        <select
                          value={retirement401kType}
                          onChange={(e) => handleInputChange(setRetirement401kType, e.target.value)}
                          className="p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="percent">%</option>
                          <option value="dollar">$/year</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-medium text-slate-700 block mb-2">Health Insurance (Annual)</label>
                      <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white">
                        <span className="px-3 py-2 bg-slate-50 text-slate-600 border-r border-slate-200">$</span>
                        <input
                          type="number"
                          value={healthInsurance || ""}
                          onChange={(e) => handleInputChange(setHealthInsurance, Number(e.target.value) || 0)}
                          className="flex-1 px-3 py-2 focus:outline-none"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-medium text-slate-700 block mb-2">HSA Contribution (Annual)</label>
                      <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white">
                        <span className="px-3 py-2 bg-slate-50 text-slate-600 border-r border-slate-200">$</span>
                        <input
                          type="number"
                          value={hsaContribution || ""}
                          onChange={(e) => handleInputChange(setHsaContribution, Number(e.target.value) || 0)}
                          className="flex-1 px-3 py-2 focus:outline-none"
                          placeholder="0"
                        />
                      </div>
                      <p className="text-xs text-slate-400 mt-1">2025 limit: $4,300 (individual) / $8,550 (family)</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Results */}
              <div>
                {/* Results Card */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  <p className="text-sm text-slate-600 mb-1">{t("calculator.results.takeHomePay", "Take-Home Pay")}</p>
                  <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">{formatMoney(netPay)}</p>
                  <p className="text-sm text-slate-600 mb-6">per {payFrequency === "biweekly" ? "paycheck" : payFrequency}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Gross Pay</p>
                      <p className="text-xl font-bold text-slate-800">{formatMoney(grossPay)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Total Deductions</p>
                      <p className="text-xl font-bold text-red-600">{formatMoney(grossPay - netPay)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Effective Tax Rate</p>
                      <p className="text-xl font-bold text-blue-600">{effectiveTaxRate.toFixed(1)}%</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Annual Net</p>
                      <p className="text-xl font-bold text-green-600">{formatMoney(annualNet)}</p>
                    </div>
                  </div>
                </div>

                {/* Tax Breakdown */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">Tax Breakdown (per paycheck)</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Federal Tax</span>
                      <span className="font-semibold text-red-600">-{formatMoney(federalTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">State Tax ({state})</span>
                      <span className="font-semibold text-red-600">-{formatMoney(stateTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Social Security (6.2%)</span>
                      <span className="font-semibold text-red-600">-{formatMoney(socialSecurity)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Medicare (1.45%)</span>
                      <span className="font-semibold text-red-600">-{formatMoney(medicare)}</span>
                    </div>
                    {totalPreTaxDeductions > 0 && (
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-slate-600">Pre-Tax Deductions</span>
                        <span className="font-semibold text-amber-600">-{formatMoney(totalPreTaxDeductions)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => handleInputChange(setShowBreakdownModal, true)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 font-medium mb-4"
                >
                  📋 {t("calculator.buttons.viewDetails", "View Full Breakdown")}
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
                <h3 className="text-lg font-bold text-slate-900 mb-4">📊 2025 Federal Tax Brackets (Single)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 font-semibold text-slate-700">Rate</th>
                        <th className="text-right py-2 font-semibold text-slate-700">Income Range</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100"><td className="py-2">10%</td><td className="py-2 text-right">$0 - $11,925</td></tr>
                      <tr className="border-b border-slate-100"><td className="py-2">12%</td><td className="py-2 text-right">$11,926 - $48,475</td></tr>
                      <tr className="border-b border-slate-100"><td className="py-2">22%</td><td className="py-2 text-right">$48,476 - $103,350</td></tr>
                      <tr className="border-b border-slate-100"><td className="py-2">24%</td><td className="py-2 text-right">$103,351 - $197,300</td></tr>
                      <tr className="border-b border-slate-100"><td className="py-2">32%</td><td className="py-2 text-right">$197,301 - $250,525</td></tr>
                      <tr className="border-b border-slate-100"><td className="py-2">35%</td><td className="py-2 text-right">$250,526 - $626,350</td></tr>
                      <tr><td className="py-2">37%</td><td className="py-2 text-right">$626,351+</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* No Tax States */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">🗺️ No Income Tax States</h3>
                <p className="text-slate-600 mb-4">These 9 states don't charge state income tax:</p>
                <div className="grid grid-cols-3 gap-2">
                  {noIncomeTaxStates.map((code) => {
                    const stateName = statesList.find(s => s.code === code)?.name;
                    return (
                      <div key={code} className="bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium text-center">
                        {stateName}
                      </div>
                    );
                  })}
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
                Let's calculate the take-home pay for a <strong>$75,000</strong> salary in <strong>California</strong>, filing <strong>Single</strong>, paid <strong>bi-weekly</strong>:
              </p>
              <div className="bg-blue-50 rounded-xl p-6 mb-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-mono text-slate-700 text-sm">
                      Gross Pay: $2,885/paycheck<br />
                      Federal Tax: -$345<br />
                      State Tax (CA): -$180
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-slate-700 text-sm">
                      Social Security: -$179<br />
                      Medicare: -$42<br />
                      <strong className="text-green-600">Net Pay: $2,139/paycheck</strong>
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-slate-600">
                Annually, you'd take home approximately <strong>$55,614</strong> after all taxes, with an effective tax rate of <strong>25.8%</strong>.
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
                {/* What is a Paycheck Calculator */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📖 {t("education.title", "Understanding Your Paycheck")}</h2>
                  <p className="text-slate-600 mb-4">
                    A paycheck calculator helps you estimate your take-home pay by accounting for federal and state income taxes, Social Security, Medicare, and various deductions. Understanding these components is essential for budgeting and financial planning.
                  </p>
                  <p className="text-slate-600">
                    Your gross pay minus all deductions equals your net pay - what actually hits your bank account. The difference can be significant, typically 20-35% of your gross depending on your tax bracket and state.
                  </p>
                </div>

                {/* Formula */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📐 {t("education.formula.title", "The Formula")}</h2>
                  <div className="bg-slate-100 rounded-xl p-6 mb-6 text-center">
                    <p className="text-xl font-mono font-bold text-slate-800">Net Pay = Gross Pay - Taxes - Deductions</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-24">Gross Pay</span><span className="text-slate-600">= Your total earnings before any deductions</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-24">Taxes</span><span className="text-slate-600">= Federal + State + FICA (Social Security + Medicare)</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-24">Deductions</span><span className="text-slate-600">= 401(k), health insurance, HSA, etc.</span></div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 Tips to Maximize Take-Home Pay</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4"><span className="text-2xl">💰</span><div><h3 className="font-semibold text-slate-900">Max Your 401(k)</h3><p className="text-slate-600">Pre-tax contributions reduce your taxable income now.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">🏥</span><div><h3 className="font-semibold text-slate-900">Use an HSA</h3><p className="text-slate-600">Triple tax advantage: tax-free contributions, growth, and withdrawals.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">📋</span><div><h3 className="font-semibold text-slate-900">Adjust Your W-4</h3><p className="text-slate-600">Claim the right allowances to avoid over-withholding.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">🗺️</span><div><h3 className="font-semibold text-slate-900">Consider Location</h3><p className="text-slate-600">Moving to a no-income-tax state could save thousands.</p></div></div>
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

                {/* Health Calculators */}
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
