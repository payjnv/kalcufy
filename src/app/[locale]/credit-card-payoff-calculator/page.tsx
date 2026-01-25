"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import AdBlock from "@/components/ads/AdBlock";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

const CALCULATOR_SLUG = "credit-card-payoff-calculator";
const CALCULATOR_NAME = "Credit Card Payoff Calculator";
const CALCULATOR_CATEGORY = "finance";

interface CreditCard {
  id: number;
  name: string;
  balance: number;
  apr: number;
  minPayment: number;
}

export default function CreditCardPayoffCalculator() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // Cards (increased to 10)
  const [cards, setCards] = useState<CreditCard[]>([
    { id: 1, name: "Card 1", balance: 5000, apr: 22.99, minPayment: 100 },
    { id: 2, name: "Card 2", balance: 3000, apr: 18.99, minPayment: 75 },
  ]);
  
  // Strategy
  const [strategy, setStrategy] = useState<"avalanche" | "snowball">("avalanche");
  const [extraPayment, setExtraPayment] = useState(200);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);

  // NEW: Advanced Options
  const [oneTimePayment, setOneTimePayment] = useState(0);
  const [oneTimePaymentMonth, setOneTimePaymentMonth] = useState(1);
  const [useBalanceTransfer, setUseBalanceTransfer] = useState(false);
  const [introAprMonths, setIntroAprMonths] = useState(18);
  const [balanceTransferFee, setBalanceTransferFee] = useState(3);

  // Results
  const [debtFreeDate, setDebtFreeDate] = useState("");
  const [totalMonths, setTotalMonths] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);
  const [minPaymentMonths, setMinPaymentMonths] = useState(0);
  const [minPaymentInterest, setMinPaymentInterest] = useState(0);
  const [interestSaved, setInterestSaved] = useState(0);
  const [monthsSaved, setMonthsSaved] = useState(0);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [balanceTransferSavings, setBalanceTransferSavings] = useState(0);

  // Favorites state
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    if (hasTrackedView.current) return;
    hasTrackedView.current = true;
    fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, language: locale, type: "VIEW" }) }).catch(console.error);
  }, [locale]);

  const trackCalculation = () => {
    if (hasTrackedCalculation.current) return;
    hasTrackedCalculation.current = true;
    fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, language: locale, type: "CALCULATION" }) }).catch(console.error);
  };

  const saveToHistory = async () => {
    if (!session?.user) return;
    setSaveStatus('saving');
    try {
      const res = await fetch("/api/history", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, calculatorName: CALCULATOR_NAME, inputs: { cards, strategy, extraPayment }, results: { totalMonths, totalInterest: totalInterest.toFixed(2), debtFreeDate } }) });
      if (res.ok) { setSaveStatus('saved'); setTimeout(() => setSaveStatus('idle'), 2000); } else { setSaveStatus('error'); }
    } catch { setSaveStatus('error'); }
  };

  const handleInputChange = (setter: (value: any) => void, value: any) => { setter(value); trackCalculation(); };
  const SaveIndicator = () => { if (saveStatus === 'idle') return null; if (saveStatus === 'saving') return <span className="text-xs text-slate-400">{t("calculator.saving.saving", "Saving...")}</span>; if (saveStatus === 'saved') return <span className="text-xs text-green-500">✓ {t("calculator.saving.saved", "Saved")}</span>; return <span className="text-xs text-red-500">Error</span>; };

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

  // Calculate payoff
  const calculatePayoff = (cardList: CreditCard[], extraPmt: number, strat: string, oneTimePmt: number = 0, oneTimePmtMonth: number = 1, useBT: boolean = false, introMonths: number = 0) => {
    // Sort cards based on strategy
    const sortedCards = [...cardList].sort((a, b) => {
      if (strat === "avalanche") {
        return b.apr - a.apr;
      } else {
        return a.balance - b.balance;
      }
    });

    const balances = sortedCards.map(c => c.balance);
    const data: any[] = [];
    let month = 0;
    let totalInt = 0;
    let totalPaid = 0;

    while (balances.some(b => b > 0) && month < 360) {
      month++;
      let extraRemaining = extraPmt;
      
      // Add one-time payment in specified month
      if (month === oneTimePmtMonth && oneTimePmt > 0) {
        extraRemaining += oneTimePmt;
      }

      const monthData: any = { month, cards: [] };

      for (let i = 0; i < sortedCards.length; i++) {
        if (balances[i] <= 0) {
          monthData.cards.push({ name: sortedCards[i].name, payment: 0, interest: 0, balance: 0 });
          continue;
        }

        const card = sortedCards[i];
        // If balance transfer with 0% APR period
        const effectiveApr = (useBT && month <= introMonths) ? 0 : card.apr;
        const monthlyRate = effectiveApr / 100 / 12;
        
        const interest = balances[i] * monthlyRate;
        totalInt += interest;
        
        let payment = card.minPayment;
        
        if (extraRemaining > 0 && balances.slice(0, i).every(b => b <= 0)) {
          payment += extraRemaining;
          extraRemaining = 0;
        }
        
        payment = Math.min(payment, balances[i] + interest);
        
        totalPaid += payment;
        balances[i] = balances[i] + interest - payment;
        
        if (balances[i] < 0.01) balances[i] = 0;

        monthData.cards.push({
          name: card.name,
          payment: Math.round(payment),
          interest: Math.round(interest),
          balance: Math.round(balances[i]),
        });
      }

      monthData.totalBalance = Math.round(balances.reduce((a, b) => a + b, 0));
      data.push(monthData);
    }

    return { months: month, interest: totalInt, paid: totalPaid, data };
  };

  // Calculate minimum payment scenario
  const calculateMinPayment = (cardList: CreditCard[]) => {
    const balances = cardList.map(c => c.balance);
    let month = 0;
    let totalInt = 0;

    while (balances.some(b => b > 0) && month < 600) {
      month++;
      for (let i = 0; i < cardList.length; i++) {
        if (balances[i] <= 0) continue;
        
        const monthlyRate = cardList[i].apr / 100 / 12;
        const interest = balances[i] * monthlyRate;
        totalInt += interest;
        
        const payment = Math.min(cardList[i].minPayment, balances[i] + interest);
        balances[i] = balances[i] + interest - payment;
        
        if (balances[i] < 0.01) balances[i] = 0;
      }
    }

    return { months: month, interest: totalInt };
  };

  // Main calculation effect
  useEffect(() => {
    const result = calculatePayoff(cards, extraPayment, strategy, oneTimePayment, oneTimePaymentMonth, useBalanceTransfer, introAprMonths);
    const minResult = calculateMinPayment(cards);
    
    // Calculate balance transfer savings
    const resultWithoutBT = calculatePayoff(cards, extraPayment, strategy, oneTimePayment, oneTimePaymentMonth, false, 0);
    const btFeeAmount = useBalanceTransfer ? (totalBalance * balanceTransferFee / 100) : 0;
    const btSavings = useBalanceTransfer ? (resultWithoutBT.interest - result.interest - btFeeAmount) : 0;

    const now = new Date();
    const payoffDate = new Date(now.getFullYear(), now.getMonth() + result.months);
    const dateStr = payoffDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    setTotalMonths(result.months);
    setTotalInterest(result.interest + btFeeAmount);
    setTotalPayments(result.paid);
    setDebtFreeDate(dateStr);
    setMinPaymentMonths(minResult.months);
    setMinPaymentInterest(minResult.interest);
    setInterestSaved(minResult.interest - result.interest);
    setMonthsSaved(minResult.months - result.months);
    setMonthlyData(result.data);
    setBalanceTransferSavings(btSavings);
  }, [cards, strategy, extraPayment, oneTimePayment, oneTimePaymentMonth, useBalanceTransfer, introAprMonths, balanceTransferFee]);

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat(locale === "es" ? "es-MX" : locale === "pt" ? "pt-BR" : "en-US", {
      style: "currency",
      currency: locale === "es" ? "MXN" : locale === "pt" ? "BRL" : "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0);
  const totalMinPayment = cards.reduce((sum, card) => sum + card.minPayment, 0);
  const avgAPR = cards.reduce((sum, card) => sum + card.apr * card.balance, 0) / totalBalance || 0;

  // Add card (increased limit to 10)
  const addCard = () => {
    if (cards.length >= 10) return;
    const newId = Math.max(...cards.map(c => c.id)) + 1;
    setCards([...cards, { id: newId, name: `Card ${newId}`, balance: 1000, apr: 19.99, minPayment: 25 }]);
  };

  const removeCard = (id: number) => {
    if (cards.length <= 1) return;
    setCards(cards.filter(c => c.id !== id));
  };

  const updateCard = (id: number, field: keyof CreditCard, value: number | string) => {
    setCards(cards.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  // FAQ data
  const defaultFaqs = [
    { 
      question: "What's the difference between Snowball and Avalanche methods?", 
      answer: "Avalanche: Pay off highest APR cards first - saves the most money mathematically. Snowball: Pay off smallest balances first - provides quick wins for motivation. Both work; choose what keeps you committed to your debt-free journey." 
    },
    { 
      question: "Should I use a balance transfer card?", 
      answer: "A 0% APR balance transfer can save significant interest if: (1) You can pay off the balance before the intro period ends, (2) The transfer fee (typically 3-5%) is less than the interest you'd pay, (3) You won't add new debt. Watch out for the post-intro APR!" 
    },
    { 
      question: "Should I close credit cards after paying them off?", 
      answer: "Usually no. Closing cards reduces your available credit, increasing your credit utilization ratio and potentially hurting your score. Keep old cards open unless they have high annual fees." 
    },
    { 
      question: "How does credit card interest work?", 
      answer: "Credit cards use compound daily interest. Your APR is divided by 365 for a daily rate, applied to your average daily balance. Making only minimum payments means most goes to interest, which is why paying extra makes such a difference." 
    },
    { 
      question: "What if I can't make my minimum payments?", 
      answer: "Contact your card issuer immediately. Many offer hardship programs that can temporarily lower your interest rate or payments. Ignoring the problem leads to late fees, penalty APRs, and credit damage." 
    }
  ];
  const faqs = translations?.faq || defaultFaqs;

  // Average APR data
  const avgAPRData = [
    { type: "All cards average", apr: "21.51%" },
    { type: "Cards for excellent credit", apr: "18.59%" },
    { type: "Cards for good credit", apr: "23.14%" },
    { type: "Cards for fair credit", apr: "26.72%" },
    { type: "Store credit cards", apr: "28.93%" },
  ];

  // Categories
  const financeCalcs = [
    "Mortgage", "Loan", "Auto Loan", "Compound Interest", "Savings", 
    "Retirement", "Investment", "Debt Payoff", "Budget", "Net Worth"
  ];
  const healthCalcs = [
    "BMI", "Calorie", "Body Fat", "BMR", "Macro", "TDEE", "Protein", "Ideal Weight"
  ];

  return (
    <>
      <Header />

      {/* Schema.org markup */}
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
          <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Payment Schedule ({strategy === "avalanche" ? "Avalanche" : "Snowball"})</h3>
              <button onClick={() => handleInputChange(setShowTableModal, false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="overflow-auto max-h-[50vh]">
              <table className="w-full">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Month</th>
                    {cards.map(card => (
                      <th key={card.id} className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">{card.name}</th>
                    ))}
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Total Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {monthlyData.slice(0, 60).map((row) => (
                    <tr key={row.month} className={row.totalBalance === 0 ? "bg-green-50" : ""}>
                      <td className="px-4 py-3 font-medium">{row.month}</td>
                      {row.cards.map((card: any, i: number) => (
                        <td key={i} className="px-4 py-3 text-right">
                          {card.balance > 0 ? (
                            <span className="text-slate-800">{formatMoney(card.balance)}</span>
                          ) : (
                            <span className="text-green-600">✓ Paid</span>
                          )}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-right font-bold">
                        {row.totalBalance === 0 ? (
                          <span className="text-green-600">🎉 Debt Free!</span>
                        ) : (
                          formatMoney(row.totalBalance)
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-200 flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 rounded-xl hover:bg-slate-200 font-medium text-slate-700">
                📄 PDF <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{t("common.pro", "PRO")}</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 rounded-xl hover:bg-slate-200 font-medium text-slate-700">
                📊 Excel <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{t("common.pro", "PRO")}</span>
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
              <span className="text-slate-700">{t("calculator.breadcrumb", "Credit Card Payoff")}</span>
            </nav>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">💳</div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{t("calculator.title", "Credit Card Payoff Calculator")}</h1>
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
                  <p className="text-slate-600">Find the fastest path to debt freedom</p>
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
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Your Credit Cards</h2>
                  {cards.length < 10 && (
                    <button
                      onClick={addCard}
                      className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-200 font-medium"
                    >
                      + Add Card
                    </button>
                  )}
                </div>

                {/* Cards List */}
                <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                  {cards.map((card) => (
                    <div key={card.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="flex justify-between items-center mb-3">
                        <input
                          type="text"
                          value={card.name}
                          onChange={(e) => updateCard(card.id, "name", e.target.value)}
                          className="font-semibold text-slate-900 bg-transparent focus:outline-none focus:bg-white focus:px-2 rounded"
                        />
                        {cards.length > 1 && (
                          <button
                            onClick={() => removeCard(card.id)}
                            className="text-slate-400 hover:text-red-500 text-lg"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-xs text-slate-600 block mb-1">Balance</label>
                          <div className="flex items-center bg-white rounded-lg px-2 py-1.5 border border-slate-200">
                            <span className="text-slate-400 text-sm">$</span>
                            <input
                              type="number"
                              value={card.balance}
                              onChange={(e) => updateCard(card.id, "balance", Number(e.target.value) || 0)}
                              className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-slate-600 block mb-1">APR</label>
                          <div className="flex items-center bg-white rounded-lg px-2 py-1.5 border border-slate-200">
                            <input
                              type="number"
                              step="0.01"
                              value={card.apr}
                              onChange={(e) => updateCard(card.id, "apr", Number(e.target.value) || 0)}
                              className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <span className="text-slate-400 text-sm">%</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-slate-600 block mb-1">Min Payment</label>
                          <div className="flex items-center bg-white rounded-lg px-2 py-1.5 border border-slate-200">
                            <span className="text-slate-400 text-sm">$</span>
                            <input
                              type="number"
                              value={card.minPayment}
                              onChange={(e) => updateCard(card.id, "minPayment", Number(e.target.value) || 0)}
                              className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary Bar */}
                <div className="bg-slate-100 rounded-xl p-4 mb-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xs text-slate-600">Total Debt</p>
                      <p className="font-bold text-slate-900">{formatMoney(totalBalance)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600">Avg APR</p>
                      <p className="font-bold text-slate-800">{avgAPR.toFixed(2)}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600">Min Payments</p>
                      <p className="font-bold text-slate-800">{formatMoney(totalMinPayment)}/mo</p>
                    </div>
                  </div>
                </div>

                {/* Payoff Strategy */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">Payoff Strategy</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleInputChange(setStrategy, "avalanche")}
                      className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                        strategy === "avalanche"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      <span className="text-lg block mb-1">⛰️</span>
                      Avalanche
                      <span className="block text-xs opacity-75 mt-1">Highest APR first</span>
                    </button>
                    <button
                      onClick={() => handleInputChange(setStrategy, "snowball")}
                      className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                        strategy === "snowball"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      <span className="text-lg block mb-1">❄️</span>
                      Snowball
                      <span className="block text-xs opacity-75 mt-1">Lowest balance first</span>
                    </button>
                  </div>
                </div>

                {/* Extra Monthly Payment */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Extra Monthly Payment</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input
                        type="text"
                        value={extraPayment.toLocaleString()}
                        onChange={(e) => handleInputChange(setExtraPayment, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-20 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="25"
                    value={extraPayment}
                    onChange={(e) => handleInputChange(setExtraPayment, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>$0</span>
                    <span>$1,000</span>
                  </div>
                </div>

                {/* Advanced Options */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => handleInputChange(setShowAdvanced, !showAdvanced)}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">⚙️</span>
                      <span className="font-semibold text-slate-700">Advanced Options</span>
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
                      {/* One-Time Extra Payment */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">One-Time Extra Payment</label>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-slate-600 block mb-1">Amount</label>
                            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                              <span className="px-3 py-2 bg-slate-50 text-slate-600 border-r border-slate-200">$</span>
                              <input
                                type="number"
                                value={oneTimePayment === 0 ? "" : oneTimePayment}
                                onChange={(e) => handleInputChange(setOneTimePayment, Number(e.target.value) || 0)}
                                placeholder="0"
                                className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-slate-600 block mb-1">Apply in Month</label>
                            <input
                              type="number"
                              min="1"
                              value={oneTimePaymentMonth}
                              onChange={(e) => handleInputChange(setOneTimePaymentMonth, Number(e.target.value) || 1)}
                              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Tax refund, bonus, or other lump sum payment</p>
                      </div>

                      {/* Balance Transfer Simulation */}
                      <div className="border-t border-slate-100 pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <label className="font-medium text-slate-700">Simulate Balance Transfer</label>
                          <button
                            onClick={() => handleInputChange(setUseBalanceTransfer, !useBalanceTransfer)}
                            className={`w-12 h-6 rounded-full transition-colors ${useBalanceTransfer ? 'bg-blue-600' : 'bg-slate-300'}`}
                          >
                            <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${useBalanceTransfer ? 'translate-x-6' : 'translate-x-0.5'}`} />
                          </button>
                        </div>
                        
                        {useBalanceTransfer && (
                          <div className="space-y-3 p-3 bg-blue-50 rounded-lg">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-xs text-slate-600 block mb-1">0% APR Period</label>
                                <div className="flex items-center border border-blue-200 rounded-lg overflow-hidden bg-white">
                                  <input
                                    type="number"
                                    value={introAprMonths}
                                    onChange={(e) => handleInputChange(setIntroAprMonths, Number(e.target.value) || 0)}
                                    className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                  />
                                  <span className="px-3 py-2 bg-blue-50 text-slate-600 border-l border-blue-200">months</span>
                                </div>
                              </div>
                              <div>
                                <label className="text-xs text-slate-600 block mb-1">Transfer Fee</label>
                                <div className="flex items-center border border-blue-200 rounded-lg overflow-hidden bg-white">
                                  <input
                                    type="number"
                                    step="0.5"
                                    value={balanceTransferFee}
                                    onChange={(e) => handleInputChange(setBalanceTransferFee, Number(e.target.value) || 0)}
                                    className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                  />
                                  <span className="px-3 py-2 bg-blue-50 text-slate-600 border-l border-blue-200">%</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-xs text-slate-600">Typical offers: 0% for 15-21 months with 3-5% transfer fee</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Results */}
              <div>
                {/* Results Card - Same style as Auto Loan */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  <p className="text-sm text-slate-600 mb-1">Debt-Free Date</p>
                  <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{debtFreeDate}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Total Interest</p>
                      <p className="text-xl font-bold text-amber-600">{formatMoney(totalInterest)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Total Payments</p>
                      <p className="text-xl font-bold text-slate-800">{formatMoney(totalPayments)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Months to Payoff</p>
                      <p className="text-xl font-bold text-slate-800">{totalMonths}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Monthly Payment</p>
                      <p className="text-xl font-bold text-slate-800">{formatMoney(totalMinPayment + extraPayment)}</p>
                    </div>
                  </div>
                </div>

                {/* Debt Breakdown - Same style as Cost Breakdown */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">Debt Breakdown</h3>
                  <div className="h-8 rounded-full overflow-hidden flex">
                    <div
                      className="bg-blue-600 transition-all"
                      style={{ width: `${(totalBalance / totalPayments) * 100}%` }}
                    />
                    <div
                      className="bg-amber-400 transition-all"
                      style={{ width: `${(totalInterest / totalPayments) * 100}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-blue-600"></span>
                      <span className="text-slate-600">Principal ({Math.round((totalBalance / totalPayments) * 100)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-amber-400"></span>
                      <span className="text-slate-600">Interest ({Math.round((totalInterest / totalPayments) * 100)}%)</span>
                    </div>
                  </div>
                </div>

                {/* Debt Summary - Same style as Loan Summary */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">Debt Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Debt</span>
                      <span className="font-semibold">{formatMoney(totalBalance)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Average APR</span>
                      <span className="font-semibold">{avgAPR.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Number of Cards</span>
                      <span className="font-semibold">{cards.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Strategy</span>
                      <span className="font-semibold">{strategy === "avalanche" ? "⛰️ Avalanche" : "❄️ Snowball"}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="text-slate-600">Total Interest</span>
                      <span className="font-semibold text-amber-600">+{formatMoney(totalInterest)}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="font-semibold text-slate-900">Total Cost</span>
                      <span className="font-bold text-lg">{formatMoney(totalPayments)}</span>
                    </div>
                  </div>
                </div>

                {/* Savings vs Minimum - Compact */}
                <div className="bg-green-50 rounded-xl p-4 border border-green-200 mb-4">
                  <h3 className="font-bold text-green-800 mb-3">💰 Your Savings vs Minimum Payments</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-green-700">Interest Saved</p>
                      <p className="text-2xl font-bold text-green-600">{formatMoney(interestSaved)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-green-700">Time Saved</p>
                      <p className="text-2xl font-bold text-green-600">{monthsSaved} months</p>
                    </div>
                  </div>
                  <p className="text-xs text-green-600 mt-2">
                    Minimum payments only: {minPaymentMonths} months, {formatMoney(minPaymentInterest)} interest
                  </p>
                </div>

                {/* Balance Transfer Savings */}
                {useBalanceTransfer && balanceTransferSavings > 0 && (
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 mb-4">
                    <h3 className="font-bold text-blue-800 mb-2">🔄 Balance Transfer Impact</h3>
                    <p className="text-sm text-blue-700">
                      Transfer fee: {formatMoney(totalBalance * balanceTransferFee / 100)}
                    </p>
                    <p className="text-lg font-bold text-green-600">
                      Net savings: {formatMoney(balanceTransferSavings)}
                    </p>
                  </div>
                )}

                {/* Amortization Table Button */}
                <button
                  onClick={() => handleInputChange(setShowTableModal, true)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 font-medium mb-4"
                >
                  📅 View Payment Schedule
                </button>

                {/* Export & Save Buttons */}
                <div className={`grid ${session?.user ? 'grid-cols-3' : 'grid-cols-2'} gap-3`}>
                  {session?.user && (
                    <button onClick={saveToHistory} disabled={saveStatus === 'saving'} className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">
                      💾 {saveStatus === 'saving' ? '...' : 'Save'}
                    </button>
                  )}
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">
                    📄 PDF <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{t("common.pro", "PRO")}</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">
                    📊 Excel <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{t("common.pro", "PRO")}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Ad Block - Calculator Bottom */}
            <div className="mt-8">
              <AdBlock slot="calculator-bottom" />
            </div>

            {/* Info Cards - BELOW CALCULATOR */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* Avalanche vs Snowball */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">⚔️ Avalanche vs Snowball</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">⛰️</span>
                    <div>
                      <h4 className="font-semibold text-slate-900">Avalanche Method</h4>
                      <p className="text-slate-600 text-sm">Pay highest APR first. Mathematically optimal - saves the most money on interest.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">❄️</span>
                    <div>
                      <h4 className="font-semibold text-slate-900">Snowball Method</h4>
                      <p className="text-slate-600 text-sm">Pay smallest balance first. Psychologically motivating - quick wins keep you going.</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-4">*The best method is the one you'll stick with!</p>
              </div>

              {/* Average APR Table */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">📊 Average Credit Card APRs</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 font-semibold text-slate-700">Card Type</th>
                        <th className="text-right py-2 font-semibold text-slate-700">Avg APR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {avgAPRData.map((row, i) => (
                        <tr key={i} className="border-b border-slate-100">
                          <td className="py-2 text-slate-600">{row.type}</td>
                          <td className="py-2 text-right font-medium text-amber-600">{row.apr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-400 mt-3">*Rates as of 2024. Source: Federal Reserve</p>
              </div>
            </div>
          </div>
        </section>

        {/* Example Calculation - Full Width */}
        <section className="py-6 bg-white">
          <div className="container">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span>📊</span> Example: $8,000 Credit Card Debt
              </h3>
              <p className="text-slate-600 mb-4">
                Let's compare paying off <strong>$8,000</strong> in credit card debt at <strong>22% APR</strong> with a <strong>$160 minimum payment</strong>:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-red-700 mb-1">Minimum Only</p>
                  <p className="text-2xl font-bold text-red-800">9+ years</p>
                  <p className="text-sm text-red-600">$6,432 interest</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-amber-800 mb-1">+$100 Extra/mo</p>
                  <p className="text-2xl font-bold text-amber-800">2.7 years</p>
                  <p className="text-sm text-amber-600">$2,156 interest</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-green-700 mb-1">+$200 Extra/mo</p>
                  <p className="text-2xl font-bold text-green-800">1.8 years</p>
                  <p className="text-sm text-green-600">$1,432 interest</p>
                </div>
              </div>
              <p className="text-slate-600 mt-4">
                Adding just <strong>$200/month</strong> saves you <strong className="text-green-600">$5,000 in interest</strong> and <strong>7 years</strong>!
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
                {/* What is a Credit Card Payoff Calculator */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📖 How to Pay Off Credit Card Debt Fast</h2>
                  <p className="text-slate-600 mb-4">
                    Credit card debt can feel overwhelming, but with the right strategy, you can become debt-free faster than you think. This calculator helps you create a personalized payoff plan using two proven methods: the Debt Avalanche and Debt Snowball.
                  </p>
                  <p className="text-slate-600">
                    The key is to pay more than the minimum payment whenever possible. Even an extra $50-100 per month can save you thousands in interest and years of payments. Our calculator shows you exactly how much you'll save with different payment amounts.
                  </p>
                </div>

                {/* The Formula */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📐 How Credit Card Interest Works</h2>
                  <div className="bg-slate-100 rounded-xl p-6 mb-6 text-center">
                    <p className="text-xl font-mono font-bold text-slate-800">Daily Interest = Balance × (APR / 365)</p>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Credit cards use compound daily interest, which is calculated on your Average Daily Balance. This means interest accrues every day on your remaining balance, including previously accrued interest.
                  </p>
                  <div className="space-y-2 text-slate-600">
                    <p><strong>Example:</strong> $5,000 balance at 22% APR</p>
                    <p>Daily rate: 22% ÷ 365 = 0.0603%</p>
                    <p>Daily interest: $5,000 × 0.000603 = $3.01/day</p>
                    <p>Monthly interest: ~$90/month on this balance alone!</p>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 Smart Strategies to Pay Off Debt</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4"><span className="text-2xl">💸</span><div><h3 className="font-semibold text-slate-900">Pay More Than Minimum</h3><p className="text-slate-600">Even $25-50 extra per month makes a significant difference over time.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">🎯</span><div><h3 className="font-semibold text-slate-900">Focus on One Card at a Time</h3><p className="text-slate-600">Make minimum payments on all cards, then put all extra money toward one card until it's paid off.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">🔄</span><div><h3 className="font-semibold text-slate-900">Consider a Balance Transfer</h3><p className="text-slate-600">A 0% APR balance transfer can save thousands in interest if you pay off the balance before the intro period ends.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">🛑</span><div><h3 className="font-semibold text-slate-900">Stop Adding New Debt</h3><p className="text-slate-600">Put the cards away while paying them off. New charges undermine your progress.</p></div></div>
                  </div>
                </div>

                {/* FAQ */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">❓ Frequently Asked Questions</h2>
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
                {/* Ad Block - Sidebar */}
                <AdBlock slot="calculator-sidebar" />

                {/* {t("sidebar.financeTitle", "Financial Calculators")} */}
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

                {/* {t("sidebar.healthTitle", "Health Calculators")} */}
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
