"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function SavingsCalculator() {
  // Basic inputs
  const [initialDeposit, setInitialDeposit] = useState(10000);
  const [monthlyDeposit, setMonthlyDeposit] = useState(500);
  const [interestRate, setInterestRate] = useState(5);
  const [years, setYears] = useState(10);

  // Advanced inputs
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [compoundFrequency, setCompoundFrequency] = useState("monthly");
  const [contributionFrequency, setContributionFrequency] = useState("monthly");
  const [annualIncrease, setAnnualIncrease] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [inflationRate, setInflationRate] = useState(0);
  const [showTableModal, setShowTableModal] = useState(false);

  // Results
  const [futureValue, setFutureValue] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [effectiveAPY, setEffectiveAPY] = useState(0);
  const [inflationAdjustedValue, setInflationAdjustedValue] = useState(0);
  const [afterTaxValue, setAfterTaxValue] = useState(0);
  const [yearlyData, setYearlyData] = useState<any[]>([]);

  // Compound frequency multipliers
  const compoundMultipliers: { [key: string]: number } = {
    daily: 365,
    monthly: 12,
    quarterly: 4,
    annually: 1,
  };

  // Contribution frequency multipliers
  const contributionMultipliers: { [key: string]: number } = {
    weekly: 52,
    biweekly: 26,
    monthly: 12,
    quarterly: 4,
    annually: 1,
  };

  // Calculate
  useEffect(() => {
    const n = compoundMultipliers[compoundFrequency];
    const contributionsPerYear = contributionMultipliers[contributionFrequency];
    const r = interestRate / 100;
    
    // Calculate effective APY
    const apy = Math.pow(1 + r / n, n) - 1;
    setEffectiveAPY(apy * 100);

    // Year-by-year calculation
    let balance = initialDeposit;
    let totalContrib = initialDeposit;
    let currentContribution = monthlyDeposit;
    const data: any[] = [];

    for (let year = 1; year <= years; year++) {
      const startBalance = balance;
      let yearInterest = 0;
      let yearContributions = 0;

      // Calculate for each compounding period in the year
      const periodsPerYear = n;
      const contributionPerPeriod = (currentContribution * contributionsPerYear) / periodsPerYear;

      for (let period = 1; period <= periodsPerYear; period++) {
        // Add interest for this period
        const periodInterest = balance * (r / n);
        yearInterest += periodInterest;
        balance += periodInterest;

        // Add contribution
        balance += contributionPerPeriod;
        yearContributions += contributionPerPeriod;
      }

      totalContrib += yearContributions;

      data.push({
        year,
        startBalance: Math.round(startBalance),
        contributions: Math.round(yearContributions),
        interest: Math.round(yearInterest),
        endBalance: Math.round(balance),
      });

      // Increase contribution for next year
      if (annualIncrease > 0) {
        currentContribution *= (1 + annualIncrease / 100);
      }
    }

    // Calculate totals
    const totalInt = balance - totalContrib;
    
    // Apply tax on interest
    const taxOnInterest = totalInt * (taxRate / 100);
    const afterTax = balance - taxOnInterest;

    // Calculate inflation-adjusted value
    const inflationAdjusted = balance / Math.pow(1 + inflationRate / 100, years);

    setFutureValue(balance);
    setTotalContributions(totalContrib);
    setTotalInterest(totalInt);
    setAfterTaxValue(afterTax);
    setInflationAdjustedValue(inflationAdjusted);
    setYearlyData(data);
  }, [initialDeposit, monthlyDeposit, interestRate, years, compoundFrequency, contributionFrequency, annualIncrease, taxRate, inflationRate]);

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Percentages for breakdown
  const initialPct = (initialDeposit / futureValue) * 100 || 0;
  const contributionsPct = ((totalContributions - initialDeposit) / futureValue) * 100 || 0;
  const interestPct = (totalInterest / futureValue) * 100 || 0;

  // FAQ data
  const faqs = [
    { 
      question: "What's the difference between APR and APY?", 
      answer: "APR (Annual Percentage Rate) is the simple interest rate without compounding. APY (Annual Percentage Yield) includes the effect of compound interest. A 5% APR compounded monthly equals a 5.12% APY. When comparing savings accounts, always compare APY to APY for an accurate comparison." 
    },
    { 
      question: "How often should interest compound for maximum growth?", 
      answer: "Daily compounding yields slightly more than monthly, but the difference is minimal. A $10,000 deposit at 5% for 10 years: daily compounding = $16,487, monthly = $16,470, annually = $16,289. The real key is finding the highest APY, regardless of compounding frequency." 
    },
    { 
      question: "Should I prioritize saving or paying off debt?", 
      answer: "Generally, pay off high-interest debt first (credit cards, personal loans). If your debt interest rate is higher than your savings rate, you're losing money. However, always maintain a small emergency fund ($1,000) before aggressive debt payoff." 
    },
    { 
      question: "What's the 50/30/20 rule for savings?", 
      answer: "The 50/30/20 budget suggests: 50% of income for needs (rent, utilities, food), 30% for wants (entertainment, dining out), and 20% for savings and debt repayment. Adjust these percentages based on your income and goals." 
    },
    { 
      question: "How much should I have in emergency savings?", 
      answer: "Most financial experts recommend 3-6 months of essential expenses. If you have variable income, dependents, or work in an unstable industry, aim for 6-12 months. Keep emergency funds in a high-yield savings account for easy access." 
    }
  ];

  // Related calculators
  const financeCalcs = [
    "Compound Interest", "Mortgage", "Loan", "Auto Loan", "Retirement",
    "Investment", "Credit Card Payoff", "ROI", "401K", "Inflation"
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

      {/* Year-by-Year Modal */}
      {showTableModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Year-by-Year Growth</h3>
              <button onClick={() => setShowTableModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="overflow-auto max-h-[50vh]">
              <table className="w-full">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Year</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Start Balance</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Contributions</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Interest</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">End Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {yearlyData.map((row) => (
                    <tr key={row.year}>
                      <td className="px-4 py-3 font-medium">{row.year}</td>
                      <td className="px-4 py-3 text-right">{formatMoney(row.startBalance)}</td>
                      <td className="px-4 py-3 text-right text-blue-600">+{formatMoney(row.contributions)}</td>
                      <td className="px-4 py-3 text-right text-green-600">+{formatMoney(row.interest)}</td>
                      <td className="px-4 py-3 text-right font-bold">{formatMoney(row.endBalance)}</td>
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
        <section className="bg-gradient-to-b from-green-50 to-white py-6">
          <div className="container">
            <nav className="text-sm mb-4">
              <Link href="/" className="text-slate-500 hover:text-green-600">Home</Link>
              <span className="mx-2 text-slate-400">/</span>
              <Link href="/en/calculators" className="text-slate-500 hover:text-green-600">Calculators</Link>
              <span className="mx-2 text-slate-400">/</span>
              <span className="text-slate-700">Savings</span>
            </nav>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-2xl">💰</div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Savings Calculator</h1>
                <p className="text-slate-600">See how your savings can grow with compound interest</p>
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
                <h2 className="text-xl font-bold text-slate-900 mb-6">Savings Details</h2>

                {/* Initial Deposit */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Initial Deposit</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-500">$</span>
                      <input
                        type="text"
                        value={initialDeposit.toLocaleString()}
                        onChange={(e) => setInitialDeposit(Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-28 bg-transparent text-right font-bold text-green-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={initialDeposit}
                    onChange={(e) => setInitialDeposit(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>$0</span>
                    <span>$100,000</span>
                  </div>
                </div>

                {/* Monthly Deposit */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Monthly Contribution</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-500">$</span>
                      <input
                        type="text"
                        value={monthlyDeposit.toLocaleString()}
                        onChange={(e) => setMonthlyDeposit(Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-24 bg-transparent text-right font-bold text-green-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="50"
                    value={monthlyDeposit}
                    onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>$0</span>
                    <span>$5,000</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Annual Interest Rate (APR)</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        type="text"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                        className="w-12 bg-transparent text-right font-bold text-green-600 focus:outline-none"
                      />
                      <span className="text-slate-500">%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>0%</span>
                    <span>15%</span>
                  </div>
                </div>

                {/* Years */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Time Period</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        type="text"
                        value={years}
                        onChange={(e) => setYears(Number(e.target.value) || 1)}
                        className="w-10 bg-transparent text-right font-bold text-green-600 focus:outline-none"
                      />
                      <span className="text-slate-500 ml-1">years</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="40"
                    step="1"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>1 year</span>
                    <span>40 years</span>
                  </div>
                </div>

                {/* Quick Year Buttons */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">Quick Select</label>
                  <div className="grid grid-cols-5 gap-2">
                    {[5, 10, 15, 20, 30].map((y) => (
                      <button
                        key={y}
                        onClick={() => setYears(y)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          years === y
                            ? "bg-green-600 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {y}yr
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
                    Advanced Options
                  </span>
                  <svg className={`w-5 h-5 text-slate-400 transition-transform ${showAdvanced ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showAdvanced && (
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl space-y-4">
                    {/* Compound Frequency */}
                    <div>
                      <label className="font-medium text-slate-700 text-sm block mb-2">Compound Frequency</label>
                      <select
                        value={compoundFrequency}
                        onChange={(e) => setCompoundFrequency(e.target.value)}
                        className="w-full bg-white rounded-lg px-3 py-2 border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="daily">Daily (365x/year)</option>
                        <option value="monthly">Monthly (12x/year)</option>
                        <option value="quarterly">Quarterly (4x/year)</option>
                        <option value="annually">Annually (1x/year)</option>
                      </select>
                    </div>

                    {/* Contribution Frequency */}
                    <div>
                      <label className="font-medium text-slate-700 text-sm block mb-2">Contribution Frequency</label>
                      <select
                        value={contributionFrequency}
                        onChange={(e) => setContributionFrequency(e.target.value)}
                        className="w-full bg-white rounded-lg px-3 py-2 border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="annually">Annually</option>
                      </select>
                    </div>

                    {/* Annual Contribution Increase */}
                    <div>
                      <label className="font-medium text-slate-700 text-sm block mb-2">Annual Contribution Increase</label>
                      <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                        <input
                          type="text"
                          value={annualIncrease}
                          onChange={(e) => setAnnualIncrease(Number(e.target.value) || 0)}
                          className="w-full bg-transparent text-right font-bold text-green-600 focus:outline-none"
                        />
                        <span className="text-slate-500 ml-1">%</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Increase your contributions each year to keep up with raises</p>
                    </div>

                    {/* Tax Rate */}
                    <div>
                      <label className="font-medium text-slate-700 text-sm block mb-2">Tax Rate on Interest</label>
                      <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                        <input
                          type="text"
                          value={taxRate}
                          onChange={(e) => setTaxRate(Number(e.target.value) || 0)}
                          className="w-full bg-transparent text-right font-bold text-green-600 focus:outline-none"
                        />
                        <span className="text-slate-500 ml-1">%</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Federal + state tax on interest earned</p>
                    </div>

                    {/* Inflation Rate */}
                    <div>
                      <label className="font-medium text-slate-700 text-sm block mb-2">Expected Inflation Rate</label>
                      <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                        <input
                          type="text"
                          value={inflationRate}
                          onChange={(e) => setInflationRate(Number(e.target.value) || 0)}
                          className="w-full bg-transparent text-right font-bold text-green-600 focus:outline-none"
                        />
                        <span className="text-slate-500 ml-1">%</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Historical average is ~3%</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Results */}
              <div>
                {/* Results Card */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  <p className="text-sm text-slate-500 mb-1">Future Value</p>
                  <p className="text-4xl md:text-5xl font-bold text-green-600 mb-2">{formatMoney(futureValue)}</p>
                  <p className="text-slate-400 mb-6">after {years} years</p>

                  {/* Breakdown Bar */}
                  <div className="h-6 rounded-full overflow-hidden flex mb-3">
                    <div className="bg-green-800 transition-all" style={{ width: `${initialPct}%` }} title="Initial Deposit" />
                    <div className="bg-green-500 transition-all" style={{ width: `${contributionsPct}%` }} title="Contributions" />
                    <div className="bg-emerald-300 transition-all" style={{ width: `${interestPct}%` }} title="Interest" />
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-green-800"></span>
                      <span className="text-slate-600">Initial ({initialPct.toFixed(0)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-green-500"></span>
                      <span className="text-slate-600">Contributions ({contributionsPct.toFixed(0)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-emerald-300"></span>
                      <span className="text-slate-600">Interest ({interestPct.toFixed(0)}%)</span>
                    </div>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-500">Total Contributions</p>
                      <p className="text-xl font-bold text-slate-800">{formatMoney(totalContributions)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-500">Total Interest Earned</p>
                      <p className="text-xl font-bold text-green-600">{formatMoney(totalInterest)}</p>
                    </div>
                  </div>

                  {/* More Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-500">Effective APY</p>
                      <p className="text-sm font-bold text-slate-800">{effectiveAPY.toFixed(2)}%</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-500">Interest Multiplier</p>
                      <p className="text-sm font-bold text-slate-800">{(futureValue / totalContributions).toFixed(2)}x</p>
                    </div>
                    {taxRate > 0 && (
                      <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                        <p className="text-xs text-slate-500">After Tax</p>
                        <p className="text-sm font-bold text-slate-800">{formatMoney(afterTaxValue)}</p>
                      </div>
                    )}
                    {inflationRate > 0 && (
                      <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                        <p className="text-xs text-slate-500">Inflation Adjusted</p>
                        <p className="text-sm font-bold text-amber-600">{formatMoney(inflationAdjustedValue)}</p>
                      </div>
                    )}
                  </div>

                  {/* Power of Compound Interest */}
                  <div className="bg-green-100 border border-green-200 rounded-xl p-4">
                    <p className="text-sm text-green-800">
                      ✨ <strong>Power of Compounding:</strong> You're contributing {formatMoney(totalContributions)}, but earning {formatMoney(totalInterest)} in interest — that's <strong>{((totalInterest / totalContributions) * 100).toFixed(0)}% free money!</strong>
                    </p>
                  </div>
                </div>

                {/* View Schedule Button */}
                <button
                  onClick={() => setShowTableModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 font-medium mb-4"
                >
                  📈 View Year-by-Year Growth
                </button>

                {/* Export Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">
                    📄 PDF <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">PRO</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">
                    📊 Excel <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">PRO</span>
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
                {/* What is Compound Interest */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📖 The Magic of Compound Interest</h2>
                  <p className="text-slate-600 mb-4">
                    Compound interest is often called the "eighth wonder of the world" because it allows your money to grow exponentially over time. Unlike simple interest (calculated only on the principal), compound interest is calculated on both the principal AND the accumulated interest.
                  </p>
                  <p className="text-slate-600">
                    This means your money earns interest on interest, creating a snowball effect. The longer you save and the more frequently interest compounds, the more dramatic this effect becomes. Starting early is the single most powerful thing you can do for your financial future.
                  </p>
                </div>

                {/* Your Results Explained */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💰 Your Savings Breakdown</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4 p-4 bg-green-50 rounded-xl">
                      <span className="text-2xl">🏦</span>
                      <div>
                        <h3 className="font-semibold text-slate-900">Initial Deposit: {formatMoney(initialDeposit)}</h3>
                        <p className="text-slate-600 text-sm">Your starting amount — the seed money</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-green-50 rounded-xl">
                      <span className="text-2xl">📥</span>
                      <div>
                        <h3 className="font-semibold text-slate-900">+ Contributions: {formatMoney(totalContributions - initialDeposit)}</h3>
                        <p className="text-slate-600 text-sm">{formatMoney(monthlyDeposit)}/{contributionFrequency} × {years} years</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-emerald-50 rounded-xl border-2 border-emerald-200">
                      <span className="text-2xl">✨</span>
                      <div>
                        <h3 className="font-semibold text-emerald-900">+ Interest Earned: {formatMoney(totalInterest)}</h3>
                        <p className="text-emerald-700 text-sm">Free money from compound growth!</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-slate-900 rounded-xl">
                      <span className="text-2xl">🎯</span>
                      <div>
                        <h3 className="font-semibold text-white">= Total: {formatMoney(futureValue)}</h3>
                        <p className="text-slate-300 text-sm">Your savings after {years} years</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Formula */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📐 The Compound Interest Formula</h2>
                  <div className="bg-slate-100 rounded-xl p-6 mb-6 text-center">
                    <p className="text-xl font-mono font-bold text-slate-800">A = P(1 + r/n)<sup>nt</sup></p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-4"><span className="font-bold text-green-600 w-8">A</span><span className="text-slate-600">= Final amount ({formatMoney(futureValue)})</span></div>
                    <div className="flex gap-4"><span className="font-bold text-green-600 w-8">P</span><span className="text-slate-600">= Principal/initial deposit ({formatMoney(initialDeposit)})</span></div>
                    <div className="flex gap-4"><span className="font-bold text-green-600 w-8">r</span><span className="text-slate-600">= Annual interest rate ({interestRate}% = {(interestRate/100).toFixed(4)})</span></div>
                    <div className="flex gap-4"><span className="font-bold text-green-600 w-8">n</span><span className="text-slate-600">= Compounding frequency ({compoundMultipliers[compoundFrequency]}x per year)</span></div>
                    <div className="flex gap-4"><span className="font-bold text-green-600 w-8">t</span><span className="text-slate-600">= Time in years ({years} years)</span></div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 Savings Tips</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4"><span className="text-2xl">⏰</span><div><h3 className="font-semibold text-slate-900">Start Early</h3><p className="text-slate-600">Time is your biggest advantage. Starting 10 years earlier can double your ending balance.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">🔄</span><div><h3 className="font-semibold text-slate-900">Automate Savings</h3><p className="text-slate-600">Set up automatic transfers so you never forget. Pay yourself first.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">📈</span><div><h3 className="font-semibold text-slate-900">Chase the Yield</h3><p className="text-slate-600">High-yield savings accounts offer 4-5% APY vs 0.01% at traditional banks.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">📊</span><div><h3 className="font-semibold text-slate-900">Increase Contributions</h3><p className="text-slate-600">Boost contributions with every raise. Even an extra $50/month adds up over decades.</p></div></div>
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

                {/* Current Rates Box */}
                <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
                  <h3 className="font-bold text-lg mb-2">📊 Best Savings Rates</h3>
                  <p className="text-green-100 text-sm mb-4">January 2026</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>High-Yield Savings</span>
                      <span className="font-bold">4.50% APY</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>1-Year CD</span>
                      <span className="font-bold">4.75% APY</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Money Market</span>
                      <span className="font-bold">4.25% APY</span>
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
