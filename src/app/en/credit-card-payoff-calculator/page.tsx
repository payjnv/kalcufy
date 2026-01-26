"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

interface CreditCard {
  id: number;
  name: string;
  balance: number;
  apr: number;
  minPayment: number;
}

export default function CreditCardPayoffCalculator() {
  // Cards
  const [cards, setCards] = useState<CreditCard[]>([
    { id: 1, name: "Card 1", balance: 5000, apr: 22.99, minPayment: 100 },
    { id: 2, name: "Card 2", balance: 3000, apr: 18.99, minPayment: 75 },
  ]);
  
  // Strategy
  const [strategy, setStrategy] = useState<"avalanche" | "snowball">("avalanche");
  const [extraPayment, setExtraPayment] = useState(200);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);

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

  // Calculate payoff
  const calculatePayoff = (cardList: CreditCard[], extraPmt: number, strat: string) => {
    // Sort cards based on strategy
    const sortedCards = [...cardList].sort((a, b) => {
      if (strat === "avalanche") {
        return b.apr - a.apr; // Highest APR first
      } else {
        return a.balance - b.balance; // Lowest balance first
      }
    });

    // Create working copy of balances
    const balances = sortedCards.map(c => c.balance);
    const data: any[] = [];
    let month = 0;
    let totalInt = 0;
    let totalPaid = 0;

    while (balances.some(b => b > 0) && month < 360) {
      month++;
      let extraRemaining = extraPmt;
      const monthData: any = { month, cards: [] };

      // Process each card
      for (let i = 0; i < sortedCards.length; i++) {
        if (balances[i] <= 0) {
          monthData.cards.push({ name: sortedCards[i].name, payment: 0, interest: 0, balance: 0 });
          continue;
        }

        const card = sortedCards[i];
        const monthlyRate = card.apr / 100 / 12;
        
        // Calculate interest
        const interest = balances[i] * monthlyRate;
        totalInt += interest;
        
        // Determine payment
        let payment = card.minPayment;
        
        // Add extra payment to first card with balance (in priority order)
        if (extraRemaining > 0 && balances.slice(0, i).every(b => b <= 0)) {
          payment += extraRemaining;
          extraRemaining = 0;
        }
        
        // Cap payment at remaining balance + interest
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
    const result = calculatePayoff(cards, extraPayment, strategy);
    const minResult = calculateMinPayment(cards);

    // Calculate debt-free date
    const now = new Date();
    const payoffDate = new Date(now.getFullYear(), now.getMonth() + result.months);
    const dateStr = payoffDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    setTotalMonths(result.months);
    setTotalInterest(result.interest);
    setTotalPayments(result.paid);
    setDebtFreeDate(dateStr);
    setMinPaymentMonths(minResult.months);
    setMinPaymentInterest(minResult.interest);
    setInterestSaved(minResult.interest - result.interest);
    setMonthsSaved(minResult.months - result.months);
    setMonthlyData(result.data);
  }, [cards, strategy, extraPayment]);

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0);
  const totalMinPayment = cards.reduce((sum, card) => sum + card.minPayment, 0);
  const avgAPR = cards.reduce((sum, card) => sum + card.apr * card.balance, 0) / totalBalance || 0;

  // Add card
  const addCard = () => {
    if (cards.length >= 5) return;
    const newId = Math.max(...cards.map(c => c.id)) + 1;
    setCards([...cards, { id: newId, name: `Card ${newId}`, balance: 1000, apr: 19.99, minPayment: 25 }]);
  };

  // Remove card
  const removeCard = (id: number) => {
    if (cards.length <= 1) return;
    setCards(cards.filter(c => c.id !== id));
  };

  // Update card
  const updateCard = (id: number, field: keyof CreditCard, value: number | string) => {
    setCards(cards.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  // FAQ data
  const faqs = [
    { 
      question: "What's the difference between Snowball and Avalanche methods?", 
      answer: "Snowball: Pay off smallest balances first for quick psychological wins. Avalanche: Pay off highest interest rates first to save the most money. Avalanche saves more money mathematically, but Snowball keeps you motivated. Choose based on what will keep you committed." 
    },
    { 
      question: "Should I close credit cards after paying them off?", 
      answer: "Usually no. Closing cards reduces your available credit, which increases your credit utilization ratio and can hurt your credit score. Keep old cards open (even unused) unless they have annual fees. Just use them occasionally to prevent closure." 
    },
    { 
      question: "Is a balance transfer card a good idea?", 
      answer: "It can be! A 0% APR balance transfer can save significant interest. But watch for: transfer fees (3-5%), the intro period length, and the post-intro APR. Have a plan to pay off the balance before the 0% period ends, or you'll be back where you started." 
    },
    { 
      question: "How does credit card interest work?", 
      answer: "Credit cards use compound daily interest. Your APR is divided by 365 to get a daily rate, applied to your average daily balance. Making only minimum payments means most goes to interest. The longer you carry a balance, the more compound interest works against you." 
    },
    { 
      question: "What's a good strategy for multiple cards?", 
      answer: "1) Make minimum payments on all cards to avoid fees. 2) Put all extra money toward one card (either highest APR or lowest balance). 3) When that card is paid off, roll that payment to the next card. 4) Repeat until debt-free. Don't spread extra payments across all cards." 
    }
  ];

  // Related calculators
  const financeCalcs = [
    "Debt Payoff", "Loan", "Compound Interest", "Savings", "Mortgage",
    "Auto Loan", "Retirement", "Investment", "ROI", "Budget"
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
              <button onClick={() => setShowTableModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="overflow-auto max-h-[50vh]">
              <table className="w-full">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Month</th>
                    {cards.map(card => (
                      <th key={card.id} className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">{card.name}</th>
                    ))}
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Total Balance</th>
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
                📄 Download PDF <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">PRO</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 rounded-xl hover:bg-slate-200 font-medium text-slate-700">
                📊 Download Excel <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">PRO</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-b from-red-50 to-white py-6">
          <div className="container">
            <nav className="text-sm mb-4">
              <Link href="/" className="text-slate-500 hover:text-red-600">Home</Link>
              <span className="mx-2 text-slate-400">/</span>
              <Link href="/en/calculators" className="text-slate-500 hover:text-red-600">Calculators</Link>
              <span className="mx-2 text-slate-400">/</span>
              <span className="text-slate-700">Credit Card Payoff</span>
            </nav>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-2xl">💳</div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Credit Card Payoff Calculator</h1>
                <p className="text-slate-600">Find the fastest path to debt freedom</p>
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
                  {cards.length < 5 && (
                    <button
                      onClick={addCard}
                      className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-200 font-medium"
                    >
                      + Add Card
                    </button>
                  )}
                </div>

                {/* Cards List */}
                <div className="space-y-4 mb-6">
                  {cards.map((card, index) => (
                    <div key={card.id} className="p-4 bg-slate-50 rounded-xl">
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
                          <label className="text-xs text-slate-500 block mb-1">Balance</label>
                          <div className="flex items-center bg-white rounded-lg px-2 py-1 border border-slate-200">
                            <span className="text-slate-400 text-sm">$</span>
                            <input
                              type="text"
                              value={card.balance.toLocaleString()}
                              onChange={(e) => updateCard(card.id, "balance", Number(e.target.value.replace(/,/g, "")) || 0)}
                              className="w-full bg-transparent text-right font-bold text-red-600 focus:outline-none text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-slate-500 block mb-1">APR</label>
                          <div className="flex items-center bg-white rounded-lg px-2 py-1 border border-slate-200">
                            <input
                              type="text"
                              value={card.apr}
                              onChange={(e) => updateCard(card.id, "apr", Number(e.target.value) || 0)}
                              className="w-full bg-transparent text-right font-bold text-red-600 focus:outline-none text-sm"
                            />
                            <span className="text-slate-400 text-sm">%</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-slate-500 block mb-1">Min Payment</label>
                          <div className="flex items-center bg-white rounded-lg px-2 py-1 border border-slate-200">
                            <span className="text-slate-400 text-sm">$</span>
                            <input
                              type="text"
                              value={card.minPayment}
                              onChange={(e) => updateCard(card.id, "minPayment", Number(e.target.value) || 0)}
                              className="w-full bg-transparent text-right font-bold text-red-600 focus:outline-none text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="bg-slate-100 rounded-xl p-4 mb-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xs text-slate-500">Total Debt</p>
                      <p className="text-lg font-bold text-red-600">{formatMoney(totalBalance)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Avg APR</p>
                      <p className="text-lg font-bold text-slate-800">{avgAPR.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Min Payments</p>
                      <p className="text-lg font-bold text-slate-800">{formatMoney(totalMinPayment)}/mo</p>
                    </div>
                  </div>
                </div>

                {/* Strategy Selection */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-3">Payoff Strategy</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setStrategy("avalanche")}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        strategy === "avalanche"
                          ? "border-red-500 bg-red-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <span className="text-2xl block mb-1">🏔️</span>
                      <span className="font-semibold text-slate-900 block">Avalanche</span>
                      <span className="text-xs text-slate-500">Highest APR first (saves most $)</span>
                    </button>
                    <button
                      onClick={() => setStrategy("snowball")}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        strategy === "snowball"
                          ? "border-red-500 bg-red-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <span className="text-2xl block mb-1">⛄</span>
                      <span className="font-semibold text-slate-900 block">Snowball</span>
                      <span className="text-xs text-slate-500">Lowest balance first (quick wins)</span>
                    </button>
                  </div>
                </div>

                {/* Extra Payment */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Extra Monthly Payment</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-500">$</span>
                      <input
                        type="text"
                        value={extraPayment.toLocaleString()}
                        onChange={(e) => setExtraPayment(Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-24 bg-transparent text-right font-bold text-red-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="25"
                    value={extraPayment}
                    onChange={(e) => setExtraPayment(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>$0 (min only)</span>
                    <span>$1,000</span>
                  </div>
                </div>

                <p className="text-sm text-slate-500 p-3 bg-amber-50 rounded-lg">
                  💡 <strong>Total Monthly Payment:</strong> {formatMoney(totalMinPayment + extraPayment)}/mo
                </p>
              </div>

              {/* Results */}
              <div>
                {/* Debt Free Banner */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 mb-4 text-white">
                  <p className="text-green-100 text-sm mb-1">🎉 You'll be debt-free by</p>
                  <p className="text-3xl md:text-4xl font-bold mb-2">{debtFreeDate}</p>
                  <p className="text-green-100">In just {totalMonths} months ({(totalMonths / 12).toFixed(1)} years)</p>
                </div>

                {/* Results Card */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-500">Total Interest</p>
                      <p className="text-xl font-bold text-red-600">{formatMoney(totalInterest)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-500">Total Payments</p>
                      <p className="text-xl font-bold text-slate-800">{formatMoney(totalPayments)}</p>
                    </div>
                  </div>

                  {/* Comparison with Min Payment */}
                  <div className="bg-white rounded-xl p-4 border border-slate-200 mb-6">
                    <h3 className="font-semibold text-slate-900 mb-3">vs. Minimum Payments Only</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-xs text-slate-500">Time Saved</p>
                        <p className="text-2xl font-bold text-green-600">{monthsSaved} months</p>
                        <p className="text-xs text-slate-400">{(monthsSaved / 12).toFixed(1)} years faster</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-slate-500">Interest Saved</p>
                        <p className="text-2xl font-bold text-green-600">{formatMoney(interestSaved)}</p>
                        <p className="text-xs text-slate-400">kept in your pocket</p>
                      </div>
                    </div>
                  </div>

                  {/* Min Payment Warning */}
                  <div className="bg-red-100 border border-red-200 rounded-xl p-4 mb-6">
                    <p className="text-sm text-red-800">
                      ⚠️ <strong>Minimum payments trap:</strong> At minimum payments only, it would take <strong>{minPaymentMonths} months</strong> ({(minPaymentMonths / 12).toFixed(1)} years) and cost <strong>{formatMoney(minPaymentInterest)}</strong> in interest!
                    </p>
                  </div>

                  {/* Strategy Tip */}
                  <div className="bg-slate-100 rounded-xl p-4">
                    <p className="text-sm text-slate-700">
                      {strategy === "avalanche" ? (
                        <>🏔️ <strong>Avalanche Strategy:</strong> You're attacking the highest interest rate cards first. This is the mathematically optimal approach and will save you the most money.</>
                      ) : (
                        <>⛄ <strong>Snowball Strategy:</strong> You're paying off the smallest balances first for quick wins. This builds momentum and motivation to keep going!</>
                      )}
                    </p>
                  </div>
                </div>

                {/* View Schedule Button */}
                <button
                  onClick={() => setShowTableModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 font-medium mb-4"
                >
                  📅 View Payment Schedule
                </button>

                {/* Export Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">
                    📄 PDF <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">PRO</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">
                    📊 Excel <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">PRO</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Educational Content with Sidebar */}
        <section className="py-12 bg-slate-50">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Understanding Methods */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📖 Avalanche vs Snowball: Which is Better?</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <h3 className="font-bold text-blue-900 mb-2">🏔️ Debt Avalanche</h3>
                      <p className="text-blue-800 text-sm mb-3">Pay off highest interest rate first</p>
                      <ul className="space-y-2 text-sm text-blue-700">
                        <li>✓ Saves the most money</li>
                        <li>✓ Mathematically optimal</li>
                        <li>✓ Reduces total interest paid</li>
                        <li>✕ May take longer to see progress</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-xl">
                      <h3 className="font-bold text-amber-900 mb-2">⛄ Debt Snowball</h3>
                      <p className="text-amber-800 text-sm mb-3">Pay off smallest balance first</p>
                      <ul className="space-y-2 text-sm text-amber-700">
                        <li>✓ Quick psychological wins</li>
                        <li>✓ Builds momentum</li>
                        <li>✓ Higher completion rate</li>
                        <li>✕ Costs more in interest</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-slate-600 mt-4">
                    <strong>Bottom line:</strong> The best method is the one you'll stick with. If you need motivation from quick wins, go Snowball. If you're disciplined and want to save money, go Avalanche. The most important thing is to start and stay consistent.
                  </p>
                </div>

                {/* Your Payoff Order */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">🎯 Your Payoff Order ({strategy === "avalanche" ? "Avalanche" : "Snowball"})</h2>
                  <div className="space-y-3">
                    {[...cards]
                      .sort((a, b) => strategy === "avalanche" ? b.apr - a.apr : a.balance - b.balance)
                      .map((card, index) => (
                        <div key={card.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            index === 0 ? "bg-red-500" : "bg-slate-400"
                          }`}>
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900">{card.name}</h3>
                            <p className="text-sm text-slate-500">
                              {formatMoney(card.balance)} at {card.apr}% APR
                            </p>
                          </div>
                          {index === 0 && (
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                              Attack First
                            </span>
                          )}
                        </div>
                      ))}
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 Credit Card Payoff Tips</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4"><span className="text-2xl">🛑</span><div><h3 className="font-semibold text-slate-900">Stop Using the Cards</h3><p className="text-slate-600">Put them in a drawer or freeze them in ice. You can't fill a hole while digging.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">📞</span><div><h3 className="font-semibold text-slate-900">Call for Lower Rates</h3><p className="text-slate-600">Ask your card company to lower your APR. The worst they can say is no.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">🔄</span><div><h3 className="font-semibold text-slate-900">Consider Balance Transfers</h3><p className="text-slate-600">0% APR cards can save thousands, but have a plan to pay off before the intro period ends.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">💪</span><div><h3 className="font-semibold text-slate-900">Find Extra Money</h3><p className="text-slate-600">Side gigs, selling stuff, cutting subscriptions. Every extra dollar speeds up your freedom.</p></div></div>
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
                          <svg className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                {/* Ad Block 1 */}
                <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-6 text-center">
                  <p className="text-slate-400 text-sm mb-2">Advertisement</p>
                  <div className="bg-slate-100 rounded-xl h-60 flex items-center justify-center text-slate-400">
                    📢 Ad Space
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl p-6 text-white">
                  <h3 className="font-bold text-lg mb-2">📊 Your Quick Stats</h3>
                  <div className="space-y-3 mt-4">
                    <div className="flex justify-between">
                      <span className="text-red-100">Total Debt</span>
                      <span className="font-bold">{formatMoney(totalBalance)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-100">Debt-Free In</span>
                      <span className="font-bold">{totalMonths} months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-100">Interest to Pay</span>
                      <span className="font-bold">{formatMoney(totalInterest)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-100">You'll Save</span>
                      <span className="font-bold text-green-300">{formatMoney(interestSaved)}</span>
                    </div>
                  </div>
                </div>

                {/* Categories Block */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">💰</span>
                    Financial Calculators
                  </h3>
                  <div className="space-y-2">
                    {financeCalcs.map((calc) => (
                      <Link
                        key={calc}
                        href={`/en/${calc.toLowerCase().replace(/ /g, "-")}-calculator`}
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
                    Health Calculators
                  </h3>
                  <div className="space-y-2">
                    {healthCalcs.map((calc) => (
                      <Link
                        key={calc}
                        href={`/en/${calc.toLowerCase().replace(/ /g, "-")}-calculator`}
                        className="block text-blue-600 hover:text-blue-800 hover:underline text-sm"
                      >
                        {calc} Calculator
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Ad Block 2 */}
                <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-6 text-center">
                  <p className="text-slate-400 text-sm mb-2">Advertisement</p>
                  <div className="bg-slate-100 rounded-xl h-60 flex items-center justify-center text-slate-400">
                    📢 Ad Space
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
