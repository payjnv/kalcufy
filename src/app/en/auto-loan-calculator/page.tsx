"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function AutoLoanCalculator() {
  // Basic inputs
  const [vehiclePrice, setVehiclePrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(5000);
  const [tradeInValue, setTradeInValue] = useState(0);
  const [amountOwed, setAmountOwed] = useState(0);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(60);

  // Advanced inputs
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [salesTaxRate, setSalesTaxRate] = useState(0);
  const [titleRegFees, setTitleRegFees] = useState(0);
  const [includeTaxInLoan, setIncludeTaxInLoan] = useState(true);
  const [showTableModal, setShowTableModal] = useState(false);

  // Results
  const [loanAmount, setLoanAmount] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [salesTaxAmount, setSalesTaxAmount] = useState(0);
  const [payoffDate, setPayoffDate] = useState("");
  const [monthlyData, setMonthlyData] = useState<any[]>([]);

  // Calculate
  useEffect(() => {
    // Calculate trade-in equity (can be negative)
    const tradeInEquity = tradeInValue - amountOwed;
    
    // Calculate sales tax
    const taxableAmount = vehiclePrice - tradeInValue; // Most states tax after trade-in
    const tax = Math.max(0, taxableAmount * (salesTaxRate / 100));
    setSalesTaxAmount(tax);
    
    // Calculate loan amount
    let principal = vehiclePrice - downPayment - tradeInEquity;
    
    // Add tax and fees to loan if selected
    if (includeTaxInLoan) {
      principal += tax + titleRegFees;
    }
    
    principal = Math.max(0, principal);
    setLoanAmount(principal);

    // Monthly payment calculation
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm;

    let payment = 0;
    if (monthlyRate > 0) {
      payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else {
      payment = principal / numPayments;
    }

    // Generate amortization schedule
    let balance = principal;
    let totalInt = 0;
    const data: any[] = [];

    for (let month = 1; month <= numPayments && balance > 0; month++) {
      const interestPmt = balance * monthlyRate;
      const principalPmt = Math.min(payment - interestPmt, balance);
      
      totalInt += interestPmt;
      balance -= principalPmt;

      // Store monthly data
      data.push({
        month,
        payment: payment,
        principal: principalPmt,
        interest: interestPmt,
        balance: Math.max(0, balance),
      });
    }

    // Calculate total cost (including upfront if not in loan)
    let total = principal + totalInt;
    if (!includeTaxInLoan) {
      total += tax + titleRegFees;
    }
    total += downPayment + amountOwed; // Add what you paid upfront and owed

    // Payoff date
    const now = new Date();
    const payoff = new Date(now.getFullYear(), now.getMonth() + loanTerm);
    const payoffStr = payoff.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    setMonthlyPayment(payment);
    setTotalInterest(totalInt);
    setTotalCost(vehiclePrice + totalInt + tax + titleRegFees);
    setPayoffDate(payoffStr);
    setMonthlyData(data);
  }, [vehiclePrice, downPayment, tradeInValue, amountOwed, interestRate, loanTerm, salesTaxRate, titleRegFees, includeTaxInLoan]);

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Percentages for breakdown
  const principalPct = (loanAmount / totalCost) * 100 || 0;
  const interestPct = (totalInterest / totalCost) * 100 || 0;
  const taxFeesPct = ((salesTaxAmount + titleRegFees) / totalCost) * 100 || 0;
  const downPct = (downPayment / totalCost) * 100 || 0;

  // FAQ data
  const faqs = [
    { 
      question: "What credit score do I need for the best auto loan rates?", 
      answer: "For the best rates (under 5%), you typically need a credit score of 720 or higher. Scores between 660-719 can still get competitive rates. Below 660, expect higher rates, and below 580, you may need a subprime lender. Even a 50-point improvement can save you thousands over the loan term." 
    },
    { 
      question: "Should I choose a longer loan term for lower payments?", 
      answer: "While longer terms (72-84 months) offer lower monthly payments, they cost significantly more in interest. A $35,000 loan at 7% costs $4,500 more in interest at 72 months vs 48 months. Plus, longer loans increase the risk of being 'underwater' (owing more than the car is worth)." 
    },
    { 
      question: "Is it better to finance through a dealer or bank?", 
      answer: "Compare both! Dealers sometimes offer promotional rates (0% or low APR) on new cars, but banks and credit unions often have better rates for used cars or buyers with excellent credit. Get pre-approved from your bank first to use as leverage at the dealership." 
    },
    { 
      question: "What is negative equity and how does it affect my loan?", 
      answer: "Negative equity (being 'upside down') happens when you owe more on your trade-in than it's worth. This amount gets added to your new loan, increasing what you owe. Try to pay down your current loan or save more for a down payment before trading in." 
    },
    { 
      question: "How much should I put down on a car?", 
      answer: "Aim for at least 20% down on a new car and 10% on a used car. This reduces your loan amount, lowers monthly payments, gets you better interest rates, and helps avoid negative equity. If you can't afford 20% down, consider a less expensive vehicle." 
    }
  ];

  // Related calculators
  const financeCalcs = [
    "Compound Interest", "Mortgage", "Loan", "Savings", "Retirement",
    "Investment", "Credit Card Payoff", "Debt Payoff", "ROI", "401K"
  ];
  const healthCalcs = [
    "BMI", "Calorie", "Body Fat", "BMR", "Macro", "TDEE", "Protein", "Ideal Weight"
  ];

  // Term options in months
  const termOptions = [24, 36, 48, 60, 72, 84];

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
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Amortization Schedule</h3>
              <button onClick={() => setShowTableModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="overflow-auto max-h-[50vh]">
              <table className="w-full">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Month</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Payment</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Principal</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Interest</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {monthlyData.map((row) => (
                    <tr key={row.month} className={row.balance < 1 ? "bg-green-50" : ""}>
                      <td className="px-4 py-3 font-medium">{row.month}</td>
                      <td className="px-4 py-3 text-right">{formatMoney(row.payment)}</td>
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
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-6">
          <div className="container">
            <nav className="text-sm mb-4">
              <Link href="/" className="text-slate-500 hover:text-blue-600">Home</Link>
              <span className="mx-2 text-slate-400">/</span>
              <Link href="/en/calculators" className="text-slate-500 hover:text-blue-600">Calculators</Link>
              <span className="mx-2 text-slate-400">/</span>
              <span className="text-slate-700">Auto Loan</span>
            </nav>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">🚗</div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Auto Loan Calculator</h1>
                <p className="text-slate-600">Calculate your car payment with trade-in, taxes & fees</p>
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
                <h2 className="text-xl font-bold text-slate-900 mb-6">Vehicle & Loan Details</h2>

                {/* Vehicle Price */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Vehicle Price</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-500">$</span>
                      <input
                        type="text"
                        value={vehiclePrice.toLocaleString()}
                        onChange={(e) => setVehiclePrice(Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-28 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="100000"
                    step="1000"
                    value={vehiclePrice}
                    onChange={(e) => setVehiclePrice(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>$5,000</span>
                    <span>$100,000</span>
                  </div>
                </div>

                {/* Down Payment */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Down Payment</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-500">$</span>
                      <input
                        type="text"
                        value={downPayment.toLocaleString()}
                        onChange={(e) => setDownPayment(Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-28 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={vehiclePrice * 0.5}
                    step="500"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>$0</span>
                    <span>{formatMoney(vehiclePrice * 0.5)}</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Interest Rate (APR)</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        type="text"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                        className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                      <span className="text-slate-500">%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>0%</span>
                    <span>20%</span>
                  </div>
                </div>

                {/* Loan Term */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <label className="font-medium text-slate-700">Loan Term</label>
                    <span className="font-bold text-blue-600">{loanTerm} months</span>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {termOptions.map((term) => (
                      <button
                        key={term}
                        onClick={() => setLoanTerm(term)}
                        className={`py-2 px-2 rounded-lg text-sm font-medium transition-all ${
                          loanTerm === term
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {term}mo
                      </button>
                    ))}
                  </div>
                </div>

                {/* Advanced Options Toggle */}
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full flex items-center justify-between py-3 px-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <span className="flex items-center gap-2 font-medium text-slate-700">
                    <span className="w-6 h-6 bg-slate-200 rounded flex items-center justify-center text-xs">⚙️</span>
                    Trade-In, Taxes & Fees
                  </span>
                  <svg className={`w-5 h-5 text-slate-400 transition-transform ${showAdvanced ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showAdvanced && (
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl space-y-4">
                    {/* Trade-in Value */}
                    <div>
                      <label className="font-medium text-slate-700 text-sm block mb-2">Trade-In Value</label>
                      <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                        <span className="text-slate-500">$</span>
                        <input
                          type="text"
                          value={tradeInValue.toLocaleString()}
                          onChange={(e) => setTradeInValue(Number(e.target.value.replace(/,/g, "")) || 0)}
                          className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                        />
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Current market value of your trade-in vehicle</p>
                    </div>

                    {/* Amount Owed on Trade-in */}
                    <div>
                      <label className="font-medium text-slate-700 text-sm block mb-2">Amount Owed on Trade-In</label>
                      <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                        <span className="text-slate-500">$</span>
                        <input
                          type="text"
                          value={amountOwed.toLocaleString()}
                          onChange={(e) => setAmountOwed(Number(e.target.value.replace(/,/g, "")) || 0)}
                          className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                        />
                      </div>
                      {amountOwed > tradeInValue && (
                        <p className="text-xs text-red-500 mt-1">⚠️ Negative equity: {formatMoney(amountOwed - tradeInValue)} will be added to your loan</p>
                      )}
                    </div>

                    {/* Sales Tax */}
                    <div>
                      <label className="font-medium text-slate-700 text-sm block mb-2">Sales Tax Rate</label>
                      <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                        <input
                          type="text"
                          value={salesTaxRate}
                          onChange={(e) => setSalesTaxRate(Number(e.target.value) || 0)}
                          className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                        />
                        <span className="text-slate-500 ml-1">%</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">= {formatMoney(salesTaxAmount)} in taxes</p>
                    </div>

                    {/* Title & Registration Fees */}
                    <div>
                      <label className="font-medium text-slate-700 text-sm block mb-2">Title, Registration & Other Fees</label>
                      <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                        <span className="text-slate-500">$</span>
                        <input
                          type="text"
                          value={titleRegFees.toLocaleString()}
                          onChange={(e) => setTitleRegFees(Number(e.target.value.replace(/,/g, "")) || 0)}
                          className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Include in Loan Toggle */}
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
                      <span className="text-sm text-slate-700">Include taxes & fees in loan?</span>
                      <button
                        onClick={() => setIncludeTaxInLoan(!includeTaxInLoan)}
                        className={`w-12 h-6 rounded-full transition-colors ${includeTaxInLoan ? "bg-blue-600" : "bg-slate-300"}`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${includeTaxInLoan ? "translate-x-6" : "translate-x-0.5"}`} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Results */}
              <div>
                {/* Results Card */}
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  <p className="text-sm text-slate-500 mb-1">Monthly Payment</p>
                  <p className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{formatMoney(monthlyPayment)}</p>
                  <p className="text-slate-400 mb-6">/month for {loanTerm} months</p>

                  {/* Breakdown Bar */}
                  <div className="h-6 rounded-full overflow-hidden flex mb-3">
                    <div className="bg-blue-600 transition-all" style={{ width: `${principalPct}%` }} title="Loan Amount" />
                    <div className="bg-cyan-400 transition-all" style={{ width: `${interestPct}%` }} title="Interest" />
                    {taxFeesPct > 0 && <div className="bg-amber-400 transition-all" style={{ width: `${taxFeesPct}%` }} title="Tax & Fees" />}
                    {downPct > 0 && <div className="bg-green-400 transition-all" style={{ width: `${downPct}%` }} title="Down Payment" />}
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-blue-600"></span>
                      <span className="text-slate-600">Loan ({principalPct.toFixed(0)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-cyan-400"></span>
                      <span className="text-slate-600">Interest ({interestPct.toFixed(0)}%)</span>
                    </div>
                    {taxFeesPct > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded bg-amber-400"></span>
                        <span className="text-slate-600">Tax & Fees ({taxFeesPct.toFixed(0)}%)</span>
                      </div>
                    )}
                    {downPct > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded bg-green-400"></span>
                        <span className="text-slate-600">Down ({downPct.toFixed(0)}%)</span>
                      </div>
                    )}
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-500">Loan Amount</p>
                      <p className="text-xl font-bold text-slate-800">{formatMoney(loanAmount)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-500">Total Interest</p>
                      <p className="text-xl font-bold text-red-500">{formatMoney(totalInterest)}</p>
                    </div>
                  </div>

                  {/* More Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-500">Total Cost</p>
                      <p className="text-sm font-bold text-slate-800">{formatMoney(totalCost)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-500">Payoff Date</p>
                      <p className="text-sm font-bold text-slate-800">{payoffDate}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-500">Sales Tax</p>
                      <p className="text-sm font-bold text-slate-800">{formatMoney(salesTaxAmount)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-500">Down + Trade</p>
                      <p className="text-sm font-bold text-green-600">{formatMoney(downPayment + Math.max(0, tradeInValue - amountOwed))}</p>
                    </div>
                  </div>

                  {/* Negative Equity Warning */}
                  {amountOwed > tradeInValue && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                      <p className="text-sm text-red-800">
                        ⚠️ <strong>Negative Equity Alert:</strong> You owe {formatMoney(amountOwed - tradeInValue)} more than your trade-in is worth. This amount has been added to your new loan.
                      </p>
                    </div>
                  )}

                  {/* Tip */}
                  {downPayment < vehiclePrice * 0.2 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <p className="text-sm text-amber-800">
                        💡 <strong>Tip:</strong> Putting 20% down ({formatMoney(vehiclePrice * 0.2)}) could get you a better interest rate and help avoid being underwater on your loan.
                      </p>
                    </div>
                  )}
                </div>

                {/* View Schedule Button */}
                <button
                  onClick={() => setShowTableModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 font-medium mb-4"
                >
                  📅 View Amortization Schedule
                </button>

                {/* Export Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">
                    📄 PDF <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">PRO</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">
                    📊 Excel <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">PRO</span>
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
                {/* What is Auto Loan */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📖 What is an Auto Loan?</h2>
                  <p className="text-slate-600 mb-4">
                    An auto loan is a type of secured loan used to purchase a vehicle. The car itself serves as collateral, meaning the lender can repossess it if you fail to make payments. Auto loans typically range from 24 to 84 months, with interest rates varying based on your credit score, loan term, and whether the car is new or used.
                  </p>
                  <p className="text-slate-600">
                    Most auto loans use simple interest, calculated on the remaining principal balance. This means paying extra each month goes directly toward the principal, reducing your total interest paid. You can get auto loans from banks, credit unions, online lenders, or directly from car dealerships.
                  </p>
                </div>

                {/* True Cost Breakdown */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💰 Understanding the True Cost</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                      <span className="text-2xl">🚗</span>
                      <div>
                        <h3 className="font-semibold text-slate-900">Vehicle Price: {formatMoney(vehiclePrice)}</h3>
                        <p className="text-slate-600 text-sm">The sticker or negotiated price of the car</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                      <span className="text-2xl">📉</span>
                      <div>
                        <h3 className="font-semibold text-slate-900">- Down Payment & Trade: {formatMoney(downPayment + Math.max(0, tradeInValue - amountOwed))}</h3>
                        <p className="text-slate-600 text-sm">Reduces what you need to finance</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                      <span className="text-2xl">📋</span>
                      <div>
                        <h3 className="font-semibold text-slate-900">+ Tax & Fees: {formatMoney(salesTaxAmount + titleRegFees)}</h3>
                        <p className="text-slate-600 text-sm">Sales tax, title, registration, doc fees</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                      <span className="text-2xl">💳</span>
                      <div>
                        <h3 className="font-semibold text-blue-900">= Loan Amount: {formatMoney(loanAmount)}</h3>
                        <p className="text-blue-700 text-sm">The amount you'll actually finance</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-red-50 rounded-xl">
                      <span className="text-2xl">📈</span>
                      <div>
                        <h3 className="font-semibold text-red-900">+ Interest: {formatMoney(totalInterest)}</h3>
                        <p className="text-red-700 text-sm">The cost of borrowing over {loanTerm} months</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-slate-900 rounded-xl">
                      <span className="text-2xl">🎯</span>
                      <div>
                        <h3 className="font-semibold text-white">Total Cost: {formatMoney(totalCost)}</h3>
                        <p className="text-slate-300 text-sm">Everything you'll pay for this car</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Formula */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📐 The Formula</h2>
                  <div className="bg-slate-100 rounded-xl p-6 mb-6 text-center">
                    <p className="text-xl font-mono font-bold text-slate-800">M = P × [r(1+r)<sup>n</sup>] / [(1+r)<sup>n</sup> - 1]</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">M</span><span className="text-slate-600">= Monthly payment</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">P</span><span className="text-slate-600">= Principal (loan amount: {formatMoney(loanAmount)})</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">r</span><span className="text-slate-600">= Monthly interest rate ({interestRate}% ÷ 12 = {(interestRate/12).toFixed(4)}%)</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">n</span><span className="text-slate-600">= Number of payments ({loanTerm} months)</span></div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 Smart Car Buying Tips</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4"><span className="text-2xl">🏦</span><div><h3 className="font-semibold text-slate-900">Get Pre-Approved First</h3><p className="text-slate-600">Know your rate before stepping on the lot. It gives you negotiating power.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">📊</span><div><h3 className="font-semibold text-slate-900">Focus on Total Price, Not Payment</h3><p className="text-slate-600">Dealers love to negotiate monthly payments. Focus on the out-the-door price instead.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">⏱️</span><div><h3 className="font-semibold text-slate-900">Choose Shorter Terms</h3><p className="text-slate-600">48-60 months is ideal. Longer terms mean more interest and underwater risk.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">💰</span><div><h3 className="font-semibold text-slate-900">Put 20% Down</h3><p className="text-slate-600">Protects against depreciation and gets you better rates.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">🔍</span><div><h3 className="font-semibold text-slate-900">Check Your Credit First</h3><p className="text-slate-600">A 50-point improvement could save you thousands over the loan term.</p></div></div>
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

                {/* Rate Comparison Box */}
                <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
                  <h3 className="font-bold text-lg mb-2">📊 Average Auto Loan Rates</h3>
                  <p className="text-blue-100 text-sm mb-4">January 2026</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>New Car (60 mo)</span>
                      <span className="font-bold">6.84%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Used Car (48 mo)</span>
                      <span className="font-bold">11.65%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Excellent Credit</span>
                      <span className="font-bold">5.18%</span>
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
