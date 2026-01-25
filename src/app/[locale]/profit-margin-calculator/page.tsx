"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import AdBlock from "@/components/ads/AdBlock";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

const CALCULATOR_SLUG = "profit-margin-calculator";
const CALCULATOR_NAME = "Profit Margin Calculator";
const CALCULATOR_CATEGORY = "finance";

export default function ProfitMarginCalculator() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // Calculator mode
  const [calcMode, setCalcMode] = useState<"margin" | "price" | "cost">("margin");
  
  // Inputs
  const [cost, setCost] = useState(70);
  const [revenue, setRevenue] = useState(100);
  const [desiredMargin, setDesiredMargin] = useState(30);
  
  // Results
  const [profit, setProfit] = useState(0);
  const [profitMargin, setProfitMargin] = useState(0);
  const [markup, setMarkup] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [maxCost, setMaxCost] = useState(0);

  // Multi-product mode
  const [showMultiProduct, setShowMultiProduct] = useState(false);
  const [products, setProducts] = useState([
    { name: "Product 1", cost: 50, price: 80 },
    { name: "Product 2", cost: 30, price: 55 },
  ]);

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
      const res = await fetch("/api/history", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, calculatorName: CALCULATOR_NAME, inputs: { cost, revenue, desiredMargin, calcMode }, results: { profit: profit.toFixed(2), profitMargin: profitMargin.toFixed(2), markup: markup.toFixed(2) } }) });
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
    if (calcMode === "margin") {
      // Calculate from cost and revenue
      const profitCalc = revenue - cost;
      const marginCalc = revenue > 0 ? (profitCalc / revenue) * 100 : 0;
      const markupCalc = cost > 0 ? (profitCalc / cost) * 100 : 0;
      
      setProfit(profitCalc);
      setProfitMargin(marginCalc);
      setMarkup(markupCalc);
      setSellingPrice(revenue);
    } else if (calcMode === "price") {
      // Calculate selling price from cost and desired margin
      const price = desiredMargin < 100 ? cost / (1 - desiredMargin / 100) : 0;
      const profitCalc = price - cost;
      const markupCalc = cost > 0 ? (profitCalc / cost) * 100 : 0;
      
      setSellingPrice(price);
      setProfit(profitCalc);
      setProfitMargin(desiredMargin);
      setMarkup(markupCalc);
    } else if (calcMode === "cost") {
      // Calculate max cost from revenue and desired margin
      const costCalc = revenue * (1 - desiredMargin / 100);
      const profitCalc = revenue - costCalc;
      const markupCalc = costCalc > 0 ? (profitCalc / costCalc) * 100 : 0;
      
      setMaxCost(costCalc);
      setProfit(profitCalc);
      setProfitMargin(desiredMargin);
      setMarkup(markupCalc);
    }
  }, [cost, revenue, desiredMargin, calcMode]);

  // Multi-product calculations
  const multiProductStats = products.reduce(
    (acc, p) => {
      const profit = p.price - p.cost;
      const margin = p.price > 0 ? (profit / p.price) * 100 : 0;
      return {
        totalCost: acc.totalCost + p.cost,
        totalRevenue: acc.totalRevenue + p.price,
        totalProfit: acc.totalProfit + profit,
      };
    },
    { totalCost: 0, totalRevenue: 0, totalProfit: 0 }
  );
  const overallMargin = multiProductStats.totalRevenue > 0 
    ? (multiProductStats.totalProfit / multiProductStats.totalRevenue) * 100 
    : 0;

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
      maximumFractionDigits: 2,
    }).format(value);
  };

  // FAQ data
  const defaultFaqs = [
    { question: "What is profit margin?", answer: "Profit margin is the percentage of revenue that remains as profit after subtracting costs. It's calculated as (Revenue - Cost) / Revenue × 100. A 30% margin means you keep $0.30 of every dollar in sales." },
    { question: "What's the difference between margin and markup?", answer: "Margin is profit as a percentage of selling price, while markup is profit as a percentage of cost. If you buy for $70 and sell for $100: margin is 30% ($30/$100), markup is 42.9% ($30/$70)." },
    { question: "What is a good profit margin?", answer: "Good margins vary by industry. Software/SaaS: 70-85%, Retail: 20-50%, Manufacturing: 10-20%, Restaurants: 3-9%. Compare to your industry benchmarks." },
    { question: "How do I improve my profit margin?", answer: "You can improve margins by: raising prices, reducing costs, improving efficiency, focusing on higher-margin products, negotiating better supplier terms, or reducing waste." },
    { question: "Should I use margin or markup for pricing?", answer: "Margin is better for comparing profitability and setting financial goals. Markup is often easier for pricing calculations. Many businesses use markup for pricing but track margin for performance." }
  ];
  const faqs = translations?.faq || defaultFaqs;

  // Industry benchmarks
  const industryBenchmarks = [
    { name: "Software/SaaS", grossMargin: 72, netMargin: 20 },
    { name: "Financial Services", grossMargin: 85, netMargin: 25 },
    { name: "Healthcare", grossMargin: 55, netMargin: 7 },
    { name: "E-commerce", grossMargin: 42, netMargin: 5 },
    { name: "Retail - General", grossMargin: 35, netMargin: 3 },
    { name: "Retail - Grocery", grossMargin: 28, netMargin: 2 },
    { name: "Manufacturing", grossMargin: 35, netMargin: 8 },
    { name: "Restaurants", grossMargin: 60, netMargin: 6 },
    { name: "Construction", grossMargin: 20, netMargin: 5 },
    { name: "Consulting", grossMargin: 80, netMargin: 15 },
  ];

  // Categories
  const financeCalcs = [
    "Mortgage", "Loan", "Compound Interest", "Auto Loan", "Retirement",
    "Investment", "Paycheck", "Income Tax", "401K", "Budget"
  ];
  const healthCalcs = [
    "BMI", "Calorie", "Body Fat", "BMR", "Macro", "TDEE", "Protein", "Ideal Weight"
  ];

  // Get margin health color
  const getMarginColor = (margin: number) => {
    if (margin >= 20) return "text-green-600";
    if (margin >= 10) return "text-amber-600";
    return "text-red-600";
  };

  const addProduct = () => {
    setProducts([...products, { name: `Product ${products.length + 1}`, cost: 0, price: 0 }]);
  };

  const removeProduct = (index: number) => {
    if (products.length > 1) {
      setProducts(products.filter((_, i) => i !== index));
    }
  };

  const updateProduct = (index: number, field: "name" | "cost" | "price", value: string | number) => {
    const updated = [...products];
    updated[index] = { ...updated[index], [field]: value };
    setProducts(updated);
  };

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

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-6">
          <div className="container">
            <nav className="text-sm mb-4">
              <Link href={`/${locale}`} className="text-slate-600 hover:text-blue-600">{t("common.home", "Home")}</Link>
              <span className="mx-2 text-slate-400">/</span>
              <Link href={`/${locale}/calculators`} className="text-slate-600 hover:text-blue-600">{t("common.calculators", "Calculators")}</Link>
              <span className="mx-2 text-slate-400">/</span>
              <span className="text-slate-700">{t("calculator.breadcrumb", "Profit Margin")}</span>
            </nav>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">📊</div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{t("calculator.title", "Profit Margin Calculator")}</h1>
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
                  <p className="text-slate-600">{t("calculator.subtitle", "Calculate profit margin, markup, and selling price")}</p>
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
                <h2 className="text-xl font-bold text-slate-900 mb-6">{t("calculator.details", "Calculation Details")}</h2>

                {/* Calculation Mode */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">{t("calculator.inputs.calcMode", "What do you want to calculate?")}</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleInputChange(setCalcMode, "margin")}
                      className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                        calcMode === "margin" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Margin
                    </button>
                    <button
                      onClick={() => handleInputChange(setCalcMode, "price")}
                      className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                        calcMode === "price" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Sell Price
                    </button>
                    <button
                      onClick={() => handleInputChange(setCalcMode, "cost")}
                      className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                        calcMode === "cost" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Max Cost
                    </button>
                  </div>
                </div>

                {/* Cost Input */}
                {(calcMode === "margin" || calcMode === "price") && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium text-slate-700">{t("calculator.inputs.cost", "Cost (COGS)")}</label>
                      <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                        <span className="text-slate-600">$</span>
                        <input
                          type="text"
                          value={cost}
                          onChange={(e) => handleInputChange(setCost, Number(e.target.value.replace(/,/g, "")) || 0)}
                          className="w-24 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="1"
                      value={cost}
                      onChange={(e) => handleInputChange(setCost, Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-slate-600 mt-1">
                      <span>$0</span>
                      <span>$1,000</span>
                    </div>
                  </div>
                )}

                {/* Revenue/Selling Price Input */}
                {(calcMode === "margin" || calcMode === "cost") && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium text-slate-700">{t("calculator.inputs.revenue", "Revenue / Selling Price")}</label>
                      <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                        <span className="text-slate-600">$</span>
                        <input
                          type="text"
                          value={revenue}
                          onChange={(e) => handleInputChange(setRevenue, Number(e.target.value.replace(/,/g, "")) || 0)}
                          className="w-24 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="1"
                      value={revenue}
                      onChange={(e) => handleInputChange(setRevenue, Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-slate-600 mt-1">
                      <span>$0</span>
                      <span>$1,000</span>
                    </div>
                  </div>
                )}

                {/* Desired Margin Input */}
                {(calcMode === "price" || calcMode === "cost") && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium text-slate-700">{t("calculator.inputs.desiredMargin", "Desired Profit Margin")}</label>
                      <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                        <input
                          type="text"
                          value={desiredMargin}
                          onChange={(e) => handleInputChange(setDesiredMargin, Number(e.target.value) || 0)}
                          className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                        />
                        <span className="text-slate-600">%</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="90"
                      step="1"
                      value={desiredMargin}
                      onChange={(e) => handleInputChange(setDesiredMargin, Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-slate-600 mt-1">
                      <span>0%</span>
                      <span>90%</span>
                    </div>
                  </div>
                )}

                {/* Multi-Product Calculator Toggle */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => handleInputChange(setShowMultiProduct, !showMultiProduct)}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📦</span>
                      <span className="font-semibold text-slate-700">{t("calculator.advanced.title", "Multi-Product Calculator")}</span>
                    </div>
                    <svg className={`w-5 h-5 text-slate-600 transition-transform ${showMultiProduct ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showMultiProduct && (
                    <div className="p-4 space-y-4 bg-white">
                      {products.map((product, index) => (
                        <div key={index} className="p-3 bg-slate-50 rounded-xl">
                          <div className="flex items-center justify-between mb-3">
                            <input
                              type="text"
                              value={product.name}
                              onChange={(e) => updateProduct(index, "name", e.target.value)}
                              className="font-medium text-slate-700 bg-transparent focus:outline-none"
                            />
                            {products.length > 1 && (
                              <button onClick={() => removeProduct(index)} className="text-red-500 hover:text-red-700 text-sm">Remove</button>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-xs text-slate-600">Cost</label>
                              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                                <span className="px-2 py-1 bg-slate-50 text-slate-600 text-sm">$</span>
                                <input
                                  type="number"
                                  value={product.cost || ""}
                                  onChange={(e) => updateProduct(index, "cost", Number(e.target.value) || 0)}
                                  className="flex-1 px-2 py-1 text-right text-sm focus:outline-none"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-xs text-slate-600">Price</label>
                              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                                <span className="px-2 py-1 bg-slate-50 text-slate-600 text-sm">$</span>
                                <input
                                  type="number"
                                  value={product.price || ""}
                                  onChange={(e) => updateProduct(index, "price", Number(e.target.value) || 0)}
                                  className="flex-1 px-2 py-1 text-right text-sm focus:outline-none"
                                />
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-slate-600 mt-2">
                            Margin: <span className={getMarginColor(product.price > 0 ? ((product.price - product.cost) / product.price) * 100 : 0)}>
                              {product.price > 0 ? (((product.price - product.cost) / product.price) * 100).toFixed(1) : 0}%
                            </span>
                          </p>
                        </div>
                      ))}
                      
                      <button onClick={addProduct} className="w-full py-2 border border-dashed border-slate-300 rounded-xl text-slate-600 hover:bg-slate-50 text-sm">
                        + Add Product
                      </button>
                      
                      <div className="p-3 bg-blue-50 rounded-xl">
                        <p className="text-sm text-slate-600">Overall Margin: <span className={`font-bold ${getMarginColor(overallMargin)}`}>{overallMargin.toFixed(1)}%</span></p>
                        <p className="text-sm text-slate-600">Total Profit: <span className="font-bold text-green-600">{formatMoney(multiProductStats.totalProfit)}</span></p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Results */}
              <div>
                {/* Results Card */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  <p className="text-sm text-slate-600 mb-1">{t("calculator.results.profitMargin", "Profit Margin")}</p>
                  <p className={`text-4xl md:text-5xl font-bold mb-6 ${getMarginColor(profitMargin)}`}>{profitMargin.toFixed(1)}%</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Profit</p>
                      <p className="text-xl font-bold text-green-600">{formatMoney(profit)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Markup</p>
                      <p className="text-xl font-bold text-blue-600">{markup.toFixed(1)}%</p>
                    </div>
                    {calcMode === "price" && (
                      <div className="bg-white rounded-xl p-4 border border-slate-200 col-span-2">
                        <p className="text-sm text-slate-600">Selling Price</p>
                        <p className="text-xl font-bold text-slate-800">{formatMoney(sellingPrice)}</p>
                      </div>
                    )}
                    {calcMode === "cost" && (
                      <div className="bg-white rounded-xl p-4 border border-slate-200 col-span-2">
                        <p className="text-sm text-slate-600">Maximum Cost</p>
                        <p className="text-xl font-bold text-slate-800">{formatMoney(maxCost)}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Margin Health Indicator */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">Margin Health</h3>
                  <div className="h-4 rounded-full overflow-hidden flex bg-slate-100">
                    <div className="bg-red-500" style={{ width: "10%" }}></div>
                    <div className="bg-amber-500" style={{ width: "10%" }}></div>
                    <div className="bg-green-500" style={{ width: "80%" }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600 mt-2">
                    <span>0%</span>
                    <span>10%</span>
                    <span>20%</span>
                    <span>100%</span>
                  </div>
                  <div className="mt-3 p-3 rounded-lg bg-slate-50">
                    <p className="text-sm">
                      Your margin is{" "}
                      <span className={`font-bold ${getMarginColor(profitMargin)}`}>
                        {profitMargin < 10 ? "low" : profitMargin < 20 ? "moderate" : "healthy"}
                      </span>
                      {profitMargin < 20 && ". Consider ways to increase your margin."}
                    </p>
                  </div>
                </div>

                {/* Margin vs Markup Comparison */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">Margin vs Markup</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Cost</span>
                      <span className="font-semibold">{formatMoney(calcMode === "cost" ? maxCost : cost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Selling Price</span>
                      <span className="font-semibold">{formatMoney(calcMode === "price" ? sellingPrice : revenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Profit</span>
                      <span className="font-semibold text-green-600">{formatMoney(profit)}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="text-slate-600">Margin (% of price)</span>
                      <span className={`font-bold ${getMarginColor(profitMargin)}`}>{profitMargin.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Markup (% of cost)</span>
                      <span className="font-bold text-blue-600">{markup.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

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
              {/* Formulas */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">📐 Key Formulas</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm font-semibold text-slate-700 mb-1">Profit Margin</p>
                    <p className="font-mono text-sm text-slate-600">= (Revenue - Cost) / Revenue × 100</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm font-semibold text-slate-700 mb-1">Markup</p>
                    <p className="font-mono text-sm text-slate-600">= (Revenue - Cost) / Cost × 100</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm font-semibold text-slate-700 mb-1">Selling Price</p>
                    <p className="font-mono text-sm text-slate-600">= Cost / (1 - Margin%)</p>
                  </div>
                </div>
              </div>

              {/* Industry Benchmarks */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">📊 {t("info.benchmarks.title", "Industry Benchmarks")}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 font-semibold text-slate-700">Industry</th>
                        <th className="text-right py-2 font-semibold text-slate-700">Gross</th>
                        <th className="text-right py-2 font-semibold text-slate-700">Net</th>
                      </tr>
                    </thead>
                    <tbody>
                      {industryBenchmarks.slice(0, 6).map((row, i) => (
                        <tr key={i} className="border-b border-slate-100">
                          <td className="py-2 text-slate-600">{row.name}</td>
                          <td className="py-2 text-right font-medium text-emerald-700">{row.grossMargin}%</td>
                          <td className="py-2 text-right font-medium text-blue-600">{row.netMargin}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
                Let's calculate the profit margin for a product that costs <strong>$70</strong> and sells for <strong>$100</strong>:
              </p>
              <div className="bg-blue-50 rounded-xl p-6 mb-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-mono text-slate-700 text-sm">
                      Cost (COGS): $70<br />
                      Selling Price: $100<br />
                      <strong>Profit: $30</strong>
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-slate-700 text-sm">
                      Margin: ($30 ÷ $100) × 100 = <strong className="text-green-600">30%</strong><br />
                      Markup: ($30 ÷ $70) × 100 = <strong className="text-blue-600">42.9%</strong>
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-slate-600">
                This means you keep <strong>$0.30</strong> of every dollar in sales, and your markup on cost is <strong>42.9%</strong>.
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
                {/* What is Profit Margin */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📖 {t("education.title", "What is Profit Margin?")}</h2>
                  <p className="text-slate-600 mb-4">
                    Profit margin is a key indicator of a company's financial health. It represents the percentage of revenue that remains as profit after all costs are deducted. Higher margins indicate better efficiency and profitability.
                  </p>
                  <p className="text-slate-600">
                    There are three main types: <strong>Gross margin</strong> (revenue minus cost of goods), <strong>Operating margin</strong> (gross profit minus operating expenses), and <strong>Net margin</strong> (total profit after all expenses including taxes).
                  </p>
                </div>

                {/* Formula */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📐 {t("education.formula.title", "The Formula")}</h2>
                  <div className="bg-slate-100 rounded-xl p-6 mb-6 text-center">
                    <p className="text-2xl font-mono font-bold text-slate-800">Margin = (Revenue - Cost) / Revenue × 100</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-24">Revenue</span><span className="text-slate-600">= Selling price of the product or service</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-24">Cost</span><span className="text-slate-600">= Cost of Goods Sold (COGS)</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-24">Margin</span><span className="text-slate-600">= Percentage of revenue retained as profit</span></div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 Ways to Improve Profit Margin</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4"><span className="text-2xl">📈</span><div><h3 className="font-semibold text-slate-900">Raise Prices Strategically</h3><p className="text-slate-600">Test price increases on premium products or new customers first.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">📉</span><div><h3 className="font-semibold text-slate-900">Reduce Costs</h3><p className="text-slate-600">Negotiate with suppliers, reduce waste, automate processes.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">🎯</span><div><h3 className="font-semibold text-slate-900">Focus on High-Margin Products</h3><p className="text-slate-600">Promote and prioritize your most profitable offerings.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">🔄</span><div><h3 className="font-semibold text-slate-900">Improve Operational Efficiency</h3><p className="text-slate-600">Streamline processes and reduce overhead costs.</p></div></div>
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
