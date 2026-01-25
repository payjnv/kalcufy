"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import AdBlock from "@/components/ads/AdBlock";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

const CALCULATOR_SLUG = "budget-calculator";
const CALCULATOR_NAME = "Budget Calculator";
const CALCULATOR_CATEGORY = "finance";

export default function BudgetCalculator() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // Calculator state - Income
  const [monthlyIncome, setMonthlyIncome] = useState(5000);
  const [secondaryIncome, setSecondaryIncome] = useState(0);
  const [taxRate, setTaxRate] = useState(22);

  // Calculator state - Expenses
  const [housing, setHousing] = useState(1500);
  const [utilities, setUtilities] = useState(200);
  const [transportation, setTransportation] = useState(500);
  const [groceries, setGroceries] = useState(400);
  const [healthcare, setHealthcare] = useState(300);
  const [debtPayments, setDebtPayments] = useState(300);
  const [savings, setSavings] = useState(500);
  const [entertainment, setEntertainment] = useState(200);
  const [other, setOther] = useState(100);

  // Advanced options
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [childcare, setChildcare] = useState(0);
  const [education, setEducation] = useState(0);
  const [insurance, setInsurance] = useState(0);
  const [subscriptions, setSubscriptions] = useState(0);
  const [pets, setPets] = useState(0);

  // UI state
  const [showBreakdownModal, setShowBreakdownModal] = useState(false);

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
      const res = await fetch("/api/history", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, calculatorName: CALCULATOR_NAME, inputs: { monthlyIncome, secondaryIncome, taxRate, housing, transportation, groceries }, results: { netIncome: netIncome.toFixed(2), totalExpenses: totalExpenses.toFixed(2), remainingBalance: remainingBalance.toFixed(2) } }) });
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

  // Calculations
  const grossIncome = monthlyIncome + secondaryIncome;
  const taxAmount = grossIncome * (taxRate / 100);
  const netIncome = grossIncome - taxAmount;

  const essentialExpenses = housing + utilities + transportation + groceries + healthcare + debtPayments;
  const advancedExpenses = childcare + education + insurance + subscriptions + pets;
  const discretionaryExpenses = entertainment + other;
  const totalExpenses = essentialExpenses + advancedExpenses + discretionaryExpenses + savings;
  const remainingBalance = netIncome - totalExpenses;

  // 50/30/20 Rule Analysis
  const needsTotal = housing + utilities + transportation + groceries + healthcare + insurance;
  const wantsTotal = entertainment + subscriptions + other;
  const savingsTotal = savings + debtPayments;

  const needsPercent = netIncome > 0 ? (needsTotal / netIncome) * 100 : 0;
  const wantsPercent = netIncome > 0 ? (wantsTotal / netIncome) * 100 : 0;
  const savingsPercent = netIncome > 0 ? (savingsTotal / netIncome) * 100 : 0;

  // DTI Ratio
  const dtiRatio = grossIncome > 0 ? ((housing + debtPayments) / grossIncome) * 100 : 0;

  // Format money helper
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

  // Monthly breakdown data
  const breakdownData = [
    { category: "Housing", amount: housing, percent: netIncome > 0 ? (housing / netIncome) * 100 : 0 },
    { category: "Utilities", amount: utilities, percent: netIncome > 0 ? (utilities / netIncome) * 100 : 0 },
    { category: "Transportation", amount: transportation, percent: netIncome > 0 ? (transportation / netIncome) * 100 : 0 },
    { category: "Groceries", amount: groceries, percent: netIncome > 0 ? (groceries / netIncome) * 100 : 0 },
    { category: "Healthcare", amount: healthcare, percent: netIncome > 0 ? (healthcare / netIncome) * 100 : 0 },
    { category: "Debt Payments", amount: debtPayments, percent: netIncome > 0 ? (debtPayments / netIncome) * 100 : 0 },
    { category: "Savings", amount: savings, percent: netIncome > 0 ? (savings / netIncome) * 100 : 0 },
    { category: "Entertainment", amount: entertainment, percent: netIncome > 0 ? (entertainment / netIncome) * 100 : 0 },
    { category: "Other", amount: other, percent: netIncome > 0 ? (other / netIncome) * 100 : 0 },
  ].filter(item => item.amount > 0);

  // FAQ data
  const defaultFaqs = [
    { question: "What is the 50/30/20 budget rule?", answer: "The 50/30/20 rule suggests allocating 50% of your after-tax income to needs (housing, food, utilities), 30% to wants (entertainment, dining out), and 20% to savings and debt repayment. It's a simple framework to balance spending and saving." },
    { question: "What is a good debt-to-income ratio?", answer: "A DTI ratio below 20% is excellent, 20-36% is good, 36-43% is acceptable but concerning, and above 43% indicates high financial risk. Most lenders prefer borrowers with a DTI below 36% for mortgages." },
    { question: "How much should I spend on housing?", answer: "Financial experts recommend spending no more than 28-30% of your gross monthly income on housing costs, including mortgage/rent, property taxes, and insurance." },
    { question: "What percentage should I save each month?", answer: "Aim to save at least 15-20% of your gross income. This includes retirement contributions (401k, IRA), emergency fund savings, and other investment accounts." },
    { question: "How do I create an emergency fund?", answer: "Start by saving $1,000 for immediate emergencies, then build up to 3-6 months of living expenses. Keep this money in a high-yield savings account for easy access." }
  ];
  const faqs = translations?.faq || defaultFaqs;

  // Recommended budget percentages
  const budgetGuides = [
    { category: "Housing", recommended: "25-30%", icon: "🏠" },
    { category: "Transportation", recommended: "10-15%", icon: "🚗" },
    { category: "Food", recommended: "10-15%", icon: "🍎" },
    { category: "Savings", recommended: "15-20%", icon: "💰" },
    { category: "Healthcare", recommended: "5-10%", icon: "🏥" },
    { category: "Entertainment", recommended: "5-10%", icon: "🎬" },
  ];

  // Categories
  const financeCalcs = [
    "Mortgage", "Loan", "Compound Interest", "Auto Loan", "Retirement",
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

      {/* Breakdown Modal */}
      {showBreakdownModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Monthly Budget Breakdown</h3>
              <button onClick={() => handleInputChange(setShowBreakdownModal, false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="overflow-auto max-h-[50vh]">
              <table className="w-full">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Category</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Amount</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">% of Income</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Annual</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {breakdownData.map((row, i) => (
                    <tr key={row.category} className={i === breakdownData.length - 1 ? "bg-blue-50" : ""}>
                      <td className="px-4 py-3 font-medium">{row.category}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{formatMoney(row.amount)}</td>
                      <td className="px-4 py-3 text-right text-blue-600">{row.percent.toFixed(1)}%</td>
                      <td className="px-4 py-3 text-right font-semibold">{formatMoney(row.amount * 12)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-100">
                  <tr>
                    <td className="px-4 py-3 font-bold">Total</td>
                    <td className="px-4 py-3 text-right font-bold">{formatMoney(totalExpenses)}</td>
                    <td className="px-4 py-3 text-right font-bold text-blue-600">{netIncome > 0 ? ((totalExpenses / netIncome) * 100).toFixed(1) : 0}%</td>
                    <td className="px-4 py-3 text-right font-bold">{formatMoney(totalExpenses * 12)}</td>
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
              <span className="text-slate-700">{t("calculator.breadcrumb", "Budget")}</span>
            </nav>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">💰</div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{t("calculator.title", "Budget Calculator")}</h1>
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
                  <p className="text-slate-600">Plan your personal finances and track your spending</p>
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
                <h2 className="text-xl font-bold text-slate-900 mb-6">{t("calculator.incomeDetails", "Income & Expenses")}</h2>

                {/* Monthly Income */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{t("calculator.inputs.monthlyIncome", "Monthly Income")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input
                        type="text"
                        value={monthlyIncome.toLocaleString()}
                        onChange={(e) => handleInputChange(setMonthlyIncome, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-24 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="30000"
                    step="100"
                    value={monthlyIncome}
                    onChange={(e) => handleInputChange(setMonthlyIncome, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>$1,000</span>
                    <span>$30,000</span>
                  </div>
                </div>

                {/* Secondary Income */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{t("calculator.inputs.secondaryIncome", "Secondary Income")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input
                        type="text"
                        value={secondaryIncome.toLocaleString()}
                        onChange={(e) => handleInputChange(setSecondaryIncome, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-24 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={secondaryIncome}
                    onChange={(e) => handleInputChange(setSecondaryIncome, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>$0</span>
                    <span>$10,000</span>
                  </div>
                </div>

                {/* Tax Rate */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">{t("calculator.inputs.taxRate", "Tax Rate")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        type="text"
                        value={taxRate}
                        onChange={(e) => handleInputChange(setTaxRate, Number(e.target.value) || 0)}
                        className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                      <span className="text-slate-600">%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    value={taxRate}
                    onChange={(e) => handleInputChange(setTaxRate, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>0%</span>
                    <span>50%</span>
                  </div>
                </div>

                {/* Expense Category Header */}
                <h3 className="text-lg font-semibold text-slate-800 mb-4 mt-8 pt-4 border-t border-slate-200">{t("calculator.expenseCategories", "Monthly Expenses")}</h3>

                {/* Housing */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">🏠 {t("calculator.inputs.housing", "Housing (Rent/Mortgage)")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input
                        type="text"
                        value={housing.toLocaleString()}
                        onChange={(e) => handleInputChange(setHousing, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-24 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="50"
                    value={housing}
                    onChange={(e) => handleInputChange(setHousing, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Utilities */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">💡 {t("calculator.inputs.utilities", "Utilities")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input
                        type="text"
                        value={utilities.toLocaleString()}
                        onChange={(e) => handleInputChange(setUtilities, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-24 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="25"
                    value={utilities}
                    onChange={(e) => handleInputChange(setUtilities, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Transportation */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">🚗 {t("calculator.inputs.transportation", "Transportation")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input
                        type="text"
                        value={transportation.toLocaleString()}
                        onChange={(e) => handleInputChange(setTransportation, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-24 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="50"
                    value={transportation}
                    onChange={(e) => handleInputChange(setTransportation, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Groceries */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">🍎 {t("calculator.inputs.groceries", "Groceries")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input
                        type="text"
                        value={groceries.toLocaleString()}
                        onChange={(e) => handleInputChange(setGroceries, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-24 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1500"
                    step="25"
                    value={groceries}
                    onChange={(e) => handleInputChange(setGroceries, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Healthcare */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">🏥 {t("calculator.inputs.healthcare", "Healthcare")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input
                        type="text"
                        value={healthcare.toLocaleString()}
                        onChange={(e) => handleInputChange(setHealthcare, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-24 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="25"
                    value={healthcare}
                    onChange={(e) => handleInputChange(setHealthcare, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Debt Payments */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">💳 {t("calculator.inputs.debtPayments", "Debt Payments")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input
                        type="text"
                        value={debtPayments.toLocaleString()}
                        onChange={(e) => handleInputChange(setDebtPayments, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-24 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    step="50"
                    value={debtPayments}
                    onChange={(e) => handleInputChange(setDebtPayments, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Savings */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">💰 {t("calculator.inputs.savings", "Savings & Investments")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input
                        type="text"
                        value={savings.toLocaleString()}
                        onChange={(e) => handleInputChange(setSavings, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-24 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="50"
                    value={savings}
                    onChange={(e) => handleInputChange(setSavings, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Entertainment */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">🎬 {t("calculator.inputs.entertainment", "Entertainment")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input
                        type="text"
                        value={entertainment.toLocaleString()}
                        onChange={(e) => handleInputChange(setEntertainment, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-24 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="25"
                    value={entertainment}
                    onChange={(e) => handleInputChange(setEntertainment, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Other Expenses */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">📦 {t("calculator.inputs.other", "Other Expenses")}</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input
                        type="text"
                        value={other.toLocaleString()}
                        onChange={(e) => handleInputChange(setOther, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-24 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="25"
                    value={other}
                    onChange={(e) => handleInputChange(setOther, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Advanced Options - Collapsible */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => handleInputChange(setShowAdvanced, !showAdvanced)}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">⚙️</span>
                      <span className="font-semibold text-slate-700">{t("calculator.advanced.title", "Additional Expenses")}</span>
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
                      {/* Childcare */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">👶 Childcare</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <span className="px-3 py-2 bg-slate-50 text-slate-600 border-r border-slate-200">$</span>
                          <input
                            type="text"
                            value={childcare === 0 ? "" : childcare.toLocaleString()}
                            onChange={(e) => handleInputChange(setChildcare, Number(e.target.value.replace(/,/g, "")) || 0)}
                            placeholder="0"
                            className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Education */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">🎓 Education</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <span className="px-3 py-2 bg-slate-50 text-slate-600 border-r border-slate-200">$</span>
                          <input
                            type="text"
                            value={education === 0 ? "" : education.toLocaleString()}
                            onChange={(e) => handleInputChange(setEducation, Number(e.target.value.replace(/,/g, "")) || 0)}
                            placeholder="0"
                            className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Insurance */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">🛡️ Insurance (Life, etc.)</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <span className="px-3 py-2 bg-slate-50 text-slate-600 border-r border-slate-200">$</span>
                          <input
                            type="text"
                            value={insurance === 0 ? "" : insurance.toLocaleString()}
                            onChange={(e) => handleInputChange(setInsurance, Number(e.target.value.replace(/,/g, "")) || 0)}
                            placeholder="0"
                            className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Subscriptions */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">📺 Subscriptions</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <span className="px-3 py-2 bg-slate-50 text-slate-600 border-r border-slate-200">$</span>
                          <input
                            type="text"
                            value={subscriptions === 0 ? "" : subscriptions.toLocaleString()}
                            onChange={(e) => handleInputChange(setSubscriptions, Number(e.target.value.replace(/,/g, "")) || 0)}
                            placeholder="0"
                            className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Pets */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">🐕 Pets</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <span className="px-3 py-2 bg-slate-50 text-slate-600 border-r border-slate-200">$</span>
                          <input
                            type="text"
                            value={pets === 0 ? "" : pets.toLocaleString()}
                            onChange={(e) => handleInputChange(setPets, Number(e.target.value.replace(/,/g, "")) || 0)}
                            placeholder="0"
                            className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Results */}
              <div>
                {/* Results Card */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  <p className="text-sm text-slate-600 mb-1">{t("calculator.results.remainingBalance", "Remaining Balance")}</p>
                  <p className={`text-4xl md:text-5xl font-bold mb-6 ${remainingBalance >= 0 ? 'text-slate-900' : 'text-red-600'}`}>
                    {remainingBalance >= 0 ? '+' : ''}{formatMoney(remainingBalance)}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Gross Income</p>
                      <p className="text-xl font-bold text-slate-800">{formatMoney(grossIncome)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Net Income</p>
                      <p className="text-xl font-bold text-emerald-700">{formatMoney(netIncome)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Total Expenses</p>
                      <p className="text-xl font-bold text-amber-600">{formatMoney(totalExpenses)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">DTI Ratio</p>
                      <p className={`text-xl font-bold ${dtiRatio <= 36 ? 'text-emerald-700' : dtiRatio <= 43 ? 'text-amber-600' : 'text-red-600'}`}>{dtiRatio.toFixed(1)}%</p>
                    </div>
                  </div>
                </div>

                {/* Expense Breakdown */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">Expense Breakdown</h3>
                  <div className="h-8 rounded-full overflow-hidden flex">
                    <div className="bg-blue-600 transition-all" style={{ width: `${netIncome > 0 ? (housing / netIncome) * 100 : 0}%` }} title="Housing" />
                    <div className="bg-cyan-500 transition-all" style={{ width: `${netIncome > 0 ? (transportation / netIncome) * 100 : 0}%` }} title="Transportation" />
                    <div className="bg-amber-400 transition-all" style={{ width: `${netIncome > 0 ? (groceries / netIncome) * 100 : 0}%` }} title="Groceries" />
                    <div className="bg-emerald-400 transition-all" style={{ width: `${netIncome > 0 ? (savings / netIncome) * 100 : 0}%` }} title="Savings" />
                    <div className="bg-purple-400 transition-all" style={{ width: `${netIncome > 0 ? ((healthcare + debtPayments) / netIncome) * 100 : 0}%` }} title="Healthcare & Debt" />
                    <div className="bg-pink-400 transition-all" style={{ width: `${netIncome > 0 ? ((entertainment + other + utilities) / netIncome) * 100 : 0}%` }} title="Other" />
                  </div>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-blue-600"></span>
                      <span className="text-slate-600">Housing ({netIncome > 0 ? Math.round((housing / netIncome) * 100) : 0}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-cyan-500"></span>
                      <span className="text-slate-600">Transport ({netIncome > 0 ? Math.round((transportation / netIncome) * 100) : 0}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-amber-400"></span>
                      <span className="text-slate-600">Food ({netIncome > 0 ? Math.round((groceries / netIncome) * 100) : 0}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-emerald-400"></span>
                      <span className="text-slate-600">Savings ({netIncome > 0 ? Math.round((savings / netIncome) * 100) : 0}%)</span>
                    </div>
                  </div>
                </div>

                {/* 50/30/20 Rule Analysis */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">50/30/20 Rule Analysis</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">Needs (Target: 50%)</span>
                        <span className={`font-semibold ${needsPercent <= 50 ? 'text-emerald-700' : 'text-red-600'}`}>{needsPercent.toFixed(0)}%</span>
                      </div>
                      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full ${needsPercent <= 50 ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: `${Math.min(needsPercent, 100)}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">Wants (Target: 30%)</span>
                        <span className={`font-semibold ${wantsPercent <= 30 ? 'text-emerald-700' : 'text-red-600'}`}>{wantsPercent.toFixed(0)}%</span>
                      </div>
                      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full ${wantsPercent <= 30 ? 'bg-blue-500' : 'bg-red-500'}`} style={{ width: `${Math.min(wantsPercent, 100)}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">Savings (Target: 20%)</span>
                        <span className={`font-semibold ${savingsPercent >= 20 ? 'text-emerald-700' : 'text-amber-600'}`}>{savingsPercent.toFixed(0)}%</span>
                      </div>
                      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full ${savingsPercent >= 20 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${Math.min(savingsPercent, 100)}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* View Breakdown Button */}
                <button
                  onClick={() => handleInputChange(setShowBreakdownModal, true)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 font-medium mb-4"
                >
                  📅 {t("calculator.buttons.viewBreakdown", "View Full Breakdown")}
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

            {/* Understanding Budget & Recommended Percentages - BELOW CALCULATOR */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* Understanding Your Budget */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">💡 Understanding Your Budget</h3>
                <p className="text-slate-600 mb-4">
                  A good budget helps you understand where your money goes and make informed financial decisions:
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>DTI Ratio:</strong> Keep below 36% for healthy finances</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Emergency Fund:</strong> Save 3-6 months of expenses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Retirement:</strong> Save at least 15% of income</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>Housing:</strong> Keep at or below 30% of income</span>
                  </li>
                </ul>
              </div>

              {/* Recommended Percentages Table */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">📊 {t("info.percentages.title", "Recommended Budget Percentages")}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 font-semibold text-slate-700">Category</th>
                        <th className="text-right py-2 font-semibold text-slate-700">Recommended</th>
                        <th className="text-right py-2 font-semibold text-slate-700">Your %</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">🏠 Housing</td>
                        <td className="py-2 text-right font-medium text-slate-600">25-30%</td>
                        <td className={`py-2 text-right font-medium ${netIncome > 0 && (housing / netIncome) * 100 <= 30 ? 'text-emerald-700' : 'text-amber-600'}`}>
                          {netIncome > 0 ? ((housing / netIncome) * 100).toFixed(0) : 0}%
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">🚗 Transportation</td>
                        <td className="py-2 text-right font-medium text-slate-600">10-15%</td>
                        <td className={`py-2 text-right font-medium ${netIncome > 0 && (transportation / netIncome) * 100 <= 15 ? 'text-emerald-700' : 'text-amber-600'}`}>
                          {netIncome > 0 ? ((transportation / netIncome) * 100).toFixed(0) : 0}%
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">🍎 Food</td>
                        <td className="py-2 text-right font-medium text-slate-600">10-15%</td>
                        <td className={`py-2 text-right font-medium ${netIncome > 0 && (groceries / netIncome) * 100 <= 15 ? 'text-emerald-700' : 'text-amber-600'}`}>
                          {netIncome > 0 ? ((groceries / netIncome) * 100).toFixed(0) : 0}%
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">💰 Savings</td>
                        <td className="py-2 text-right font-medium text-slate-600">15-20%</td>
                        <td className={`py-2 text-right font-medium ${netIncome > 0 && (savings / netIncome) * 100 >= 15 ? 'text-emerald-700' : 'text-amber-600'}`}>
                          {netIncome > 0 ? ((savings / netIncome) * 100).toFixed(0) : 0}%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-400 mt-3">*Based on after-tax income</p>
              </div>
            </div>
          </div>
        </section>

        {/* Example Calculation - Full Width */}
        <section className="py-6 bg-white">
          <div className="container">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span>📊</span> Example Budget
              </h3>
              <p className="text-slate-600 mb-4">
                Here's an example budget for someone earning <strong>$5,000/month</strong> with a <strong>22% tax rate</strong>:
              </p>
              <div className="bg-blue-50 rounded-xl p-6 mb-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-mono text-slate-700 text-sm">
                      Gross Income: $5,000<br />
                      Taxes (22%): -$1,100<br />
                      <strong>Net Income: $3,900</strong>
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-slate-700 text-sm">
                      Housing (30%): $1,170<br />
                      Savings (20%): $780<br />
                      <strong className="text-blue-600">Remaining: $1,950</strong>
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-slate-600">
                Following the 50/30/20 rule, this leaves <strong>$1,950</strong> for needs, wants, and other expenses.
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
                {/* What is a Budget */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📖 {t("education.title", "What is a Personal Budget?")}</h2>
                  <p className="text-slate-600 mb-4">
                    A personal budget is a financial plan that allocates your income toward expenses, savings, and debt repayment. It helps you understand where your money goes, identify areas to cut back, and work toward financial goals.
                  </p>
                  <p className="text-slate-600">
                    Successful budgeting involves two key principles: living within your means and planning for the future. By tracking income and expenses, you can make informed decisions about spending and ensure you're not spending more than you earn.
                  </p>
                </div>

                {/* The 50/30/20 Rule */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📐 {t("education.formula.title", "The 50/30/20 Rule")}</h2>
                  <div className="bg-slate-100 rounded-xl p-6 mb-6 text-center">
                    <p className="text-2xl font-mono font-bold text-slate-800">50% Needs + 30% Wants + 20% Savings</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-12">50%</span><span className="text-slate-600">= {t("education.formula.needs", "Needs")} (housing, utilities, groceries, healthcare, insurance)</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-12">30%</span><span className="text-slate-600">= {t("education.formula.wants", "Wants")} (entertainment, dining out, subscriptions, hobbies)</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-12">20%</span><span className="text-slate-600">= {t("education.formula.savings", "Savings")} (retirement, emergency fund, debt payments)</span></div>
                  </div>
                </div>

                {/* Example */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📊 {t("education.example.title", "Example Calculation")}</h2>
                  <p className="text-slate-600 mb-4">
                    For a household earning <strong>$6,000/month</strong> gross with <strong>25% taxes</strong>:
                  </p>
                  <div className="bg-blue-50 rounded-xl p-6 mb-4">
                    <p className="font-mono text-slate-700">
                      Net Income: $6,000 - $1,500 = $4,500<br />
                      Needs (50%): $4,500 × 0.50 = $2,250<br />
                      Wants (30%): $4,500 × 0.30 = $1,350<br />
                      Savings (20%): $4,500 × 0.20 = $900<br />
                      <strong className="text-blue-600">Total Allocated: $4,500</strong>
                    </p>
                  </div>
                  <p className="text-slate-600">
                    This balanced approach ensures you cover essential expenses while still enjoying life and building wealth for the future.
                  </p>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 Smart Budgeting Tips</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4"><span className="text-2xl">📝</span><div><h3 className="font-semibold text-slate-900">Track Every Expense</h3><p className="text-slate-600">Use apps or spreadsheets to monitor spending for at least one month.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">🎯</span><div><h3 className="font-semibold text-slate-900">Set Clear Goals</h3><p className="text-slate-600">Define specific savings targets like "Save $10,000 for emergency fund."</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">🔄</span><div><h3 className="font-semibold text-slate-900">Automate Savings</h3><p className="text-slate-600">Set up automatic transfers on payday—pay yourself first.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">📉</span><div><h3 className="font-semibold text-slate-900">Review Monthly</h3><p className="text-slate-600">Adjust your budget each month based on actual spending.</p></div></div>
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
