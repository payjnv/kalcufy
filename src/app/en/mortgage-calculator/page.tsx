"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function MortgageCalculator() {
  // Calculator state
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

  // Results
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

  // Calculate
  useEffect(() => {
    const dp = homePrice * (downPaymentPercent / 100);
    const loan = homePrice - dp;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    // Monthly P&I
    const pi = loan * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    // Monthly costs
    const tax = propertyTax / 12;
    const insurance = homeInsurance / 12;
    const pmi = downPaymentPercent < 20 ? (loan * (pmiRate / 100)) / 12 : 0;
    const hoa = hoaFees;
    
    const total = pi + tax + insurance + pmi + hoa;
    
    // Totals
    const totalPaid = pi * numPayments;
    const interest = totalPaid - loan;
    
    // Payoff date
    const now = new Date();
    const payoff = new Date(now.getFullYear(), now.getMonth() + numPayments);
    const payoffStr = payoff.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    setDownPayment(dp);
    setLoanAmount(loan);
    setMonthlyPI(pi);
    setMonthlyTax(tax);
    setMonthlyInsurance(insurance);
    setMonthlyPMI(pmi);
    setMonthlyTotal(total);
    setTotalInterest(interest);
    setTotalPayments(numPayments);
    setPayoffDate(payoffStr);

    // Generate yearly data
    let data = [];
    let balance = loan;
    for (let year = 1; year <= loanTerm; year++) {
      let yearPrincipal = 0;
      let yearInterest = 0;
      for (let month = 1; month <= 12; month++) {
        if (balance <= 0) break;
        const interestPmt = balance * monthlyRate;
        const principalPmt = pi - interestPmt + extraMonthly;
        yearInterest += interestPmt;
        yearPrincipal += Math.min(principalPmt, balance);
        balance -= principalPmt;
        if (balance < 0) balance = 0;
      }
      data.push({
        year,
        principal: Math.round(yearPrincipal),
        interest: Math.round(yearInterest),
        balance: Math.round(Math.max(0, balance)),
      });
      if (balance <= 0) break;
    }
    setYearlyData(data);
  }, [homePrice, downPaymentPercent, interestRate, loanTerm, propertyTax, homeInsurance, pmiRate, hoaFees, extraMonthly]);

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Percentages for breakdown bar
  const piPercent = (monthlyPI / monthlyTotal) * 100 || 0;
  const taxPercent = (monthlyTax / monthlyTotal) * 100 || 0;
  const insurancePercent = (monthlyInsurance / monthlyTotal) * 100 || 0;
  const pmiPercent = (monthlyPMI / monthlyTotal) * 100 || 0;

  // FAQ data
  const faqs = [
    { question: "How much house can I afford?", answer: "A common guideline is that your monthly housing costs (including mortgage, taxes, insurance) should not exceed 28% of your gross monthly income. Lenders also look at your total debt-to-income ratio, which should typically be below 36%." },
    { question: "What credit score do I need for a mortgage?", answer: "For conventional loans, you typically need a credit score of at least 620. FHA loans may accept scores as low as 500 with a 10% down payment, or 580 with 3.5% down. Higher scores get better interest rates." },
    { question: "What is PMI and how can I avoid it?", answer: "Private Mortgage Insurance (PMI) protects the lender if you default. It's required when you put less than 20% down. You can avoid it by making a 20% down payment, using a piggyback loan, or choosing a lender-paid PMI option." },
    { question: "Fixed vs adjustable rate - which is better?", answer: "Fixed rates offer payment stability and are better if you plan to stay long-term or rates are low. ARMs start lower and may be better if you plan to sell or refinance within 5-7 years, or if rates are expected to drop." },
    { question: "Should I pay points to lower my rate?", answer: "Paying points (prepaid interest) can lower your rate, but it takes time to break even. Divide the cost of points by monthly savings to find your break-even point. If you plan to stay longer than that, points may be worth it." }
  ];

  // Categories
  const financeCalcs = [
    "Compound Interest", "Loan", "Auto Loan", "Interest", "Payment", "Retirement",
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
              <h3 className="text-lg font-bold text-slate-900">Amortization Schedule</h3>
              <button onClick={() => setShowTableModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="overflow-auto max-h-[50vh]">
              <table className="w-full">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Year</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Principal</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Interest</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {yearlyData.map((row, i) => (
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
              <span className="text-slate-700">Mortgage</span>
            </nav>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">🏠</div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Mortgage Calculator</h1>
                <p className="text-slate-600">Calculate your monthly mortgage payments</p>
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
                <h2 className="text-xl font-bold text-slate-900 mb-6">Loan Details</h2>

                {/* Home Price */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Home Price</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-500">$</span>
                      <input
                        type="text"
                        value={homePrice.toLocaleString()}
                        onChange={(e) => setHomePrice(Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-28 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="2000000"
                    step="5000"
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>$50K</span>
                    <span>$2M</span>
                  </div>
                </div>

                {/* Down Payment */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Down Payment</label>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                        <input
                          type="text"
                          value={downPaymentPercent}
                          onChange={(e) => setDownPaymentPercent(Number(e.target.value) || 0)}
                          className="w-10 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                        />
                        <span className="text-slate-500">%</span>
                      </div>
                      <span className="text-slate-500 text-sm">= {formatMoney(downPayment)}</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>0%</span>
                    <span>50%</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Interest Rate</label>
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
                    min="1"
                    max="15"
                    step="0.125"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>1%</span>
                    <span>15%</span>
                  </div>
                </div>

                {/* Loan Term */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">Loan Term</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[10, 15, 20, 30].map((term) => (
                      <button
                        key={term}
                        onClick={() => setLoanTerm(term)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          loanTerm === term
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {term} years
                      </button>
                    ))}
                  </div>
                </div>

                {/* Property Tax & Insurance */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium text-slate-700 text-sm">Property Tax / year</label>
                    </div>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2">
                      <span className="text-slate-500">$</span>
                      <input
                        type="text"
                        value={propertyTax.toLocaleString()}
                        onChange={(e) => setPropertyTax(Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium text-slate-700 text-sm">Insurance / year</label>
                    </div>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2">
                      <span className="text-slate-500">$</span>
                      <input
                        type="text"
                        value={homeInsurance.toLocaleString()}
                        onChange={(e) => setHomeInsurance(Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Advanced Options Toggle */}
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full flex items-center justify-between py-3 px-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <span className="flex items-center gap-2 font-medium text-slate-700">
                    <span className="w-6 h-6 bg-slate-200 rounded flex items-center justify-center text-xs">⚙️</span>
                    Additional Costs & Extra Payments
                  </span>
                  <svg className={`w-5 h-5 text-slate-400 transition-transform ${showAdvanced ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showAdvanced && (
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-medium text-slate-700 text-sm block mb-2">PMI Rate (% / year)</label>
                        <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                          <input
                            type="text"
                            value={pmiRate}
                            onChange={(e) => setPmiRate(Number(e.target.value) || 0)}
                            className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                          />
                          <span className="text-slate-500 ml-1">%</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Applied if down payment &lt; 20%</p>
                      </div>
                      <div>
                        <label className="font-medium text-slate-700 text-sm block mb-2">HOA Fees / month</label>
                        <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                          <span className="text-slate-500">$</span>
                          <input
                            type="text"
                            value={hoaFees.toLocaleString()}
                            onChange={(e) => setHoaFees(Number(e.target.value.replace(/,/g, "")) || 0)}
                            className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="font-medium text-slate-700 text-sm block mb-2">Extra Monthly Payment</label>
                      <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                        <span className="text-slate-500">$</span>
                        <input
                          type="text"
                          value={extraMonthly.toLocaleString()}
                          onChange={(e) => setExtraMonthly(Number(e.target.value.replace(/,/g, "")) || 0)}
                          className="w-full bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                        />
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Pay off your mortgage faster</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Results */}
              <div>
                {/* Results Card */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  <p className="text-sm text-slate-500 mb-1">Total Monthly Payment</p>
                  <p className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{formatMoney(monthlyTotal)}</p>
                  <p className="text-slate-400 mb-6">/month</p>

                  {/* Breakdown Bar */}
                  <div className="h-6 rounded-full overflow-hidden flex mb-3">
                    <div className="bg-blue-600 transition-all" style={{ width: `${piPercent * 0.7}%` }} title="Principal" />
                    <div className="bg-cyan-400 transition-all" style={{ width: `${piPercent * 0.3}%` }} title="Interest" />
                    <div className="bg-amber-400 transition-all" style={{ width: `${taxPercent}%` }} title="Tax" />
                    <div className="bg-emerald-400 transition-all" style={{ width: `${insurancePercent}%` }} title="Insurance" />
                    {pmiPercent > 0 && <div className="bg-red-400 transition-all" style={{ width: `${pmiPercent}%` }} title="PMI" />}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-blue-600"></span>
                      <span className="text-slate-600">Principal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-cyan-400"></span>
                      <span className="text-slate-600">Interest</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-amber-400"></span>
                      <span className="text-slate-600">Tax</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-emerald-400"></span>
                      <span className="text-slate-600">Insurance</span>
                    </div>
                    {monthlyPMI > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded bg-red-400"></span>
                        <span className="text-slate-600">PMI</span>
                      </div>
                    )}
                  </div>

                  {/* Breakdown Table */}
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-slate-600 font-medium">Component</th>
                          <th className="px-4 py-2 text-right text-slate-600 font-medium">Monthly</th>
                          <th className="px-4 py-2 text-right text-slate-600 font-medium">Total ({loanTerm}yr)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr>
                          <td className="px-4 py-2 text-slate-700">Principal & Interest</td>
                          <td className="px-4 py-2 text-right font-medium">{formatMoney(monthlyPI)}</td>
                          <td className="px-4 py-2 text-right text-slate-500">{formatMoney(monthlyPI * loanTerm * 12)}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-slate-700">Property Tax</td>
                          <td className="px-4 py-2 text-right font-medium">{formatMoney(monthlyTax)}</td>
                          <td className="px-4 py-2 text-right text-slate-500">{formatMoney(propertyTax * loanTerm)}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-slate-700">Home Insurance</td>
                          <td className="px-4 py-2 text-right font-medium">{formatMoney(monthlyInsurance)}</td>
                          <td className="px-4 py-2 text-right text-slate-500">{formatMoney(homeInsurance * loanTerm)}</td>
                        </tr>
                        {monthlyPMI > 0 && (
                          <tr>
                            <td className="px-4 py-2 text-slate-700">PMI</td>
                            <td className="px-4 py-2 text-right font-medium text-red-500">{formatMoney(monthlyPMI)}</td>
                            <td className="px-4 py-2 text-right text-slate-500">{formatMoney(monthlyPMI * loanTerm * 12)}</td>
                          </tr>
                        )}
                        <tr className="bg-blue-50">
                          <td className="px-4 py-2 font-semibold text-blue-700">Total</td>
                          <td className="px-4 py-2 text-right font-bold text-blue-700">{formatMoney(monthlyTotal)}</td>
                          <td className="px-4 py-2 text-right font-bold text-blue-700">{formatMoney(monthlyTotal * loanTerm * 12)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-500">Loan Amount</p>
                      <p className="text-sm font-bold text-slate-800">{formatMoney(loanAmount)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-500">Total Interest</p>
                      <p className="text-sm font-bold text-red-500">{formatMoney(totalInterest)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-500">Payoff Date</p>
                      <p className="text-sm font-bold text-slate-800">{payoffDate}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-500">Total Payments</p>
                      <p className="text-sm font-bold text-slate-800">{totalPayments}</p>
                    </div>
                  </div>
                </div>

                {/* View Amortization Button */}
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
              {/* Main Content - LEFT/CENTER (2 columns) */}
              <div className="lg:col-span-2 space-y-6">
                {/* What is a Mortgage */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📖 What is a Mortgage?</h2>
                  <p className="text-slate-600 mb-4">
                    A mortgage is a loan used to purchase or maintain a home, land, or other types of real estate. The borrower agrees to pay the lender over time, typically in a series of regular payments divided into principal and interest. The property serves as collateral to secure the loan.
                  </p>
                  <p className="text-slate-600">
                    Most mortgages are "amortizing," meaning each payment covers both interest and principal. Early payments are mostly interest; later payments are mostly principal. Understanding this helps you make smarter decisions about extra payments and refinancing.
                  </p>
                </div>

                {/* Formula */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📐 The Formula</h2>
                  <div className="bg-slate-100 rounded-xl p-6 mb-6 text-center">
                    <p className="text-xl font-mono font-bold text-slate-800">M = P × [r(1+r)<sup>n</sup>] / [(1+r)<sup>n</sup> - 1]</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">M</span><span className="text-slate-600">= Monthly payment</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">P</span><span className="text-slate-600">= Principal (loan amount)</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">r</span><span className="text-slate-600">= Monthly interest rate (annual rate ÷ 12)</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">n</span><span className="text-slate-600">= Total number of payments (years × 12)</span></div>
                  </div>
                </div>

                {/* Example */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📊 Example Calculation</h2>
                  <p className="text-slate-600 mb-4">
                    For a <strong>{formatMoney(homePrice)}</strong> home with <strong>{downPaymentPercent}%</strong> down at <strong>{interestRate}%</strong> for <strong>{loanTerm} years</strong>:
                  </p>
                  <div className="bg-blue-50 rounded-xl p-6 mb-4">
                    <p className="font-mono text-slate-700">
                      Loan Amount = {formatMoney(homePrice)} - {formatMoney(downPayment)} = <strong className="text-blue-600">{formatMoney(loanAmount)}</strong><br /><br />
                      Monthly P&I = {formatMoney(loanAmount)} × [0.{(interestRate/12).toFixed(4).slice(2)}(1.{(interestRate/12).toFixed(4).slice(2)})<sup>{loanTerm * 12}</sup>] / ...<br />
                      <strong className="text-blue-600">Monthly P&I = {formatMoney(monthlyPI)}</strong>
                    </p>
                  </div>
                  <p className="text-slate-600">
                    Add property tax ({formatMoney(monthlyTax)}/mo) and insurance ({formatMoney(monthlyInsurance)}/mo) for a total of <strong>{formatMoney(monthlyTotal)}/month</strong>.
                  </p>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 Money-Saving Tips</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4"><span className="text-2xl">🎯</span><div><h3 className="font-semibold text-slate-900">Put 20% Down</h3><p className="text-slate-600">Avoid PMI and get better rates.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">📉</span><div><h3 className="font-semibold text-slate-900">Shop Multiple Lenders</h3><p className="text-slate-600">Even 0.25% difference saves thousands.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">⚡</span><div><h3 className="font-semibold text-slate-900">Consider 15-Year Term</h3><p className="text-slate-600">Lower rates, massive interest savings.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">💰</span><div><h3 className="font-semibold text-slate-900">Make Extra Payments</h3><p className="text-slate-600">One extra payment/year = 4-5 years off.</p></div></div>
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

              {/* Sidebar - RIGHT (1 column) */}
              <div className="space-y-6">
                {/* Ad Block 1 */}
                <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-6 text-center">
                  <p className="text-slate-400 text-sm mb-2">Advertisement</p>
                  <div className="bg-slate-100 rounded-xl h-60 flex items-center justify-center text-slate-400">
                    📢 Ad Space
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
                        {calc}
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
                        {calc}
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
