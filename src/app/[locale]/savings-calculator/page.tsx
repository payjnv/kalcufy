"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useAutoSave } from "@/hooks/useAutoSave";
import AdBlock from "@/components/ads/AdBlock";

export default function SavingsCalculator() {
  const locale = useLocale();
  
  // Calculator state
  const [initialDeposit, setInitialDeposit] = useState(5000);
  const [monthlyContribution, setMonthlyContribution] = useState(200);
  const [annualRate, setAnnualRate] = useState(4.5);
  const [years, setYears] = useState(10);
  const [compoundFrequency, setCompoundFrequency] = useState(12);
  const [contributionTiming, setContributionTiming] = useState<'beginning' | 'end'>('end');
  const [showTableModal, setShowTableModal] = useState(false);
  
  // Advanced options (PRO features)
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [inflationRate, setInflationRate] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [withdrawalAge, setWithdrawalAge] = useState(0);

  // Results
  const [futureValue, setFutureValue] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [yearlyData, setYearlyData] = useState<any[]>([]);
  const [inflationAdjustedValue, setInflationAdjustedValue] = useState(0);
  const [afterTaxValue, setAfterTaxValue] = useState(0);
  const [yearsToGoal, setYearsToGoal] = useState(0);

  // Favorites
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const res = await fetch('/api/favorites');
        if (res.ok) {
          const data = await res.json();
          setIsFavorite(data.favorites?.some((f: any) => f.calculatorSlug === 'savings-calculator'));
        }
      } catch (error) {}
    };
    checkFavorite();
  }, []);

  const toggleFavorite = async () => {
    setFavoriteLoading(true);
    try {
      if (isFavorite) {
        await fetch('/api/favorites?slug=savings-calculator', { method: 'DELETE' });
        setIsFavorite(false);
      } else {
        await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            calculatorSlug: 'savings-calculator',
            calculatorName: 'Savings Calculator',
            category: 'finance'
          })
        });
        setIsFavorite(true);
      }
    } catch (error) {}
    setFavoriteLoading(false);
  };

  // Auto-save
  const { SaveIndicator } = useAutoSave({
    slug: 'savings-calculator',
    name: 'Savings Calculator',
    inputs: { initialDeposit, monthlyContribution, annualRate, years, compoundFrequency },
    results: { 
      futureValue: futureValue.toFixed(2), 
      totalContributions: totalContributions.toFixed(2),
      totalInterest: totalInterest.toFixed(2)
    },
  });

  // Calculate
  useEffect(() => {
    const r = annualRate / 100;
    const n = compoundFrequency;
    const t = years;
    const P = initialDeposit;
    const PMT = monthlyContribution;

    // Future value of initial deposit
    const fvInitial = P * Math.pow(1 + r / n, n * t);

    // Future value of monthly contributions (annuity)
    let fvContributions = 0;
    if (r > 0) {
      const monthlyRate = r / 12;
      const totalMonths = t * 12;
      // Ordinary annuity (end of period) vs Annuity due (beginning of period)
      fvContributions = PMT * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
      // If contributions are at beginning of period, multiply by (1 + monthlyRate)
      if (contributionTiming === 'beginning') {
        fvContributions *= (1 + monthlyRate);
      }
    } else {
      fvContributions = PMT * t * 12;
    }

    const fv = fvInitial + fvContributions;
    const totalContrib = P + PMT * 12 * t;
    const interest = fv - totalContrib;

    setFutureValue(fv);
    setTotalContributions(totalContrib);
    setTotalInterest(interest);

    // Generate yearly data
    let data = [];
    let balance = P;
    let totalDeposits = P;
    const monthlyRate = r / 12;

    for (let year = 1; year <= t; year++) {
      for (let month = 1; month <= 12; month++) {
        balance = balance * (1 + monthlyRate) + PMT;
        totalDeposits += PMT;
      }
      data.push({
        year,
        deposits: Math.round(totalDeposits),
        interest: Math.round(balance - totalDeposits),
        balance: Math.round(balance),
      });
    }
    setYearlyData(data);
    
    // PRO calculations
    // Inflation-adjusted value
    if (inflationRate > 0) {
      const inflationFactor = Math.pow(1 + inflationRate / 100, t);
      setInflationAdjustedValue(fv / inflationFactor);
    } else {
      setInflationAdjustedValue(fv);
    }
    
    // After-tax value (tax on interest only)
    if (taxRate > 0) {
      const taxOnInterest = interest * (taxRate / 100);
      setAfterTaxValue(fv - taxOnInterest);
    } else {
      setAfterTaxValue(fv);
    }
    
    // Years to reach goal
    if (savingsGoal > 0 && savingsGoal > P) {
      const monthlyRate = r / 12;
      let bal = P;
      let months = 0;
      while (bal < savingsGoal && months < 600) { // Max 50 years
        bal = bal * (1 + monthlyRate) + PMT;
        months++;
      }
      setYearsToGoal(months / 12);
    } else {
      setYearsToGoal(0);
    }
  }, [initialDeposit, monthlyContribution, annualRate, years, compoundFrequency, inflationRate, taxRate, savingsGoal, contributionTiming]);

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // FAQ data
  const faqs = [
    { question: "What is a savings account?", answer: "A savings account is a deposit account held at a bank or financial institution that earns interest on your balance. It provides a safe place to store money while earning a modest return, with easy access to your funds when needed." },
    { question: "What's the difference between APY and APR?", answer: "APY (Annual Percentage Yield) includes the effect of compound interest, showing your actual yearly earnings. APR (Annual Percentage Rate) is the simple interest rate without compounding. For savings, APY is more accurate for comparing accounts." },
    { question: "How often should I contribute to savings?", answer: "Consistent monthly contributions, even small ones, leverage the power of compound interest. Automating your savings ensures you pay yourself first and helps build wealth over time without relying on willpower." },
    { question: "What is a high-yield savings account?", answer: "A high-yield savings account offers interest rates significantly higher than traditional savings accounts, often 10-20x more. Online banks typically offer the best rates due to lower overhead costs." },
    { question: "Is my savings account insured?", answer: "In the US, savings accounts at FDIC-insured banks are protected up to $250,000 per depositor, per institution. Credit unions offer similar protection through NCUA insurance." }
  ];

  // Current rates data
  const currentRates = [
    { type: "High-Yield Savings", rate: "4.50% - 5.25%", minDeposit: "$0 - $100" },
    { type: "Traditional Savings", rate: "0.01% - 0.50%", minDeposit: "$0 - $25" },
    { type: "Money Market", rate: "3.50% - 5.00%", minDeposit: "$1,000+" },
    { type: "CD (1 Year)", rate: "4.50% - 5.50%", minDeposit: "$500+" },
    { type: "CD (5 Year)", rate: "4.00% - 4.75%", minDeposit: "$500+" },
  ];

  // Categories
  const financeCalcs = [
    "Mortgage", "Loan", "Auto Loan", "Compound Interest", "Payment", "Retirement",
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

      {/* Year-by-Year Table Modal */}
      {showTableModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Year-by-Year Savings Growth</h3>
              <button onClick={() => setShowTableModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="overflow-auto max-h-[50vh]">
              <table className="w-full">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Year</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Total Deposits</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Interest Earned</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {yearlyData.map((row, i) => (
                    <tr key={row.year} className={i === yearlyData.length - 1 ? "bg-green-50" : ""}>
                      <td className="px-4 py-3 font-medium">{row.year}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{formatMoney(row.deposits)}</td>
                      <td className="px-4 py-3 text-right text-green-600">{formatMoney(row.interest)}</td>
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
              <Link href={`/${locale}`} className="text-slate-600 hover:text-blue-600">Home</Link>
              <span className="mx-2 text-slate-400">/</span>
              <Link href={`/${locale}/calculators`} className="text-slate-600 hover:text-blue-600">Calculators</Link>
              <span className="mx-2 text-slate-400">/</span>
              <span className="text-slate-700">Savings</span>
            </nav>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-2xl">💰</div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Savings Calculator</h1>
                  <button
                    onClick={toggleFavorite}
                    disabled={favoriteLoading}
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                    title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    {isFavorite ? (
                      <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    ) : (
                      <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                    )}
                  </button>
                </div>
                <p className="text-slate-600">See how your savings grow over time</p>
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
                <h2 className="text-xl font-bold text-slate-900 mb-6">Calculate Your Savings</h2>

                {/* Initial Deposit */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Initial Deposit</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input
                        type="text"
                        value={initialDeposit.toLocaleString()}
                        onChange={(e) => setInitialDeposit(Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-24 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="500"
                    value={initialDeposit}
                    onChange={(e) => setInitialDeposit(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>$0</span>
                    <span>$100,000</span>
                  </div>
                </div>

                {/* Monthly Contribution */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Monthly Contribution</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-600">$</span>
                      <input
                        type="text"
                        value={monthlyContribution.toLocaleString()}
                        onChange={(e) => setMonthlyContribution(Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-20 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="25"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>$0</span>
                    <span>$2,000</span>
                  </div>
                </div>

                {/* Annual Interest Rate (APY) */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Annual Interest Rate (APY)</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        type="text"
                        value={annualRate}
                        onChange={(e) => setAnnualRate(Number(e.target.value) || 0)}
                        className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                      <span className="text-slate-600">%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={annualRate}
                    onChange={(e) => setAnnualRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>0%</span>
                    <span>10%</span>
                  </div>
                </div>

                {/* Time Period */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Time Period</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        type="text"
                        value={years}
                        onChange={(e) => setYears(Number(e.target.value) || 0)}
                        className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                      <span className="text-slate-600 ml-1">years</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="40"
                    step="1"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>1 year</span>
                    <span>40 years</span>
                  </div>
                </div>

                {/* Compound Frequency */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">Compound Frequency</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { value: 1, label: "Yearly" },
                      { value: 4, label: "Quarterly" },
                      { value: 12, label: "Monthly" },
                      { value: 365, label: "Daily" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setCompoundFrequency(option.value)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          compoundFrequency === option.value
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contribution Timing */}
                <div className="mb-6">
                  <label className="font-medium text-slate-700 block mb-2">Contribution Timing</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setContributionTiming('beginning')}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        contributionTiming === 'beginning'
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Beginning of Period
                    </button>
                    <button
                      onClick={() => setContributionTiming('end')}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        contributionTiming === 'end'
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      End of Period
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">When do you make your monthly deposits?</p>
                </div>

                {/* Advanced Options - Collapsible (PRO) */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
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
                      {/* Savings Goal */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">Savings Goal (Optional)</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <span className="px-3 py-2 bg-slate-50 text-slate-600 border-r border-slate-200">$</span>
                          <input
                            type="text"
                            value={savingsGoal === 0 ? "" : savingsGoal.toLocaleString()}
                            onChange={(e) => setSavingsGoal(Number(e.target.value.replace(/,/g, "")) || 0)}
                            placeholder="0"
                            className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none"
                          />
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Set a target to see when you'll reach it</p>
                      </div>

                      {/* Inflation Rate */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">Expected Inflation Rate</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <input
                            type="text"
                            value={inflationRate === 0 ? "" : inflationRate}
                            onChange={(e) => setInflationRate(Number(e.target.value) || 0)}
                            placeholder="0"
                            className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none"
                          />
                          <span className="px-3 py-2 bg-slate-50 text-slate-600 border-l border-slate-200">%</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Average inflation is ~3% per year</p>
                      </div>

                      {/* Tax Rate */}
                      <div>
                        <label className="font-medium text-slate-700 block mb-2">Tax Rate on Interest</label>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <input
                            type="text"
                            value={taxRate === 0 ? "" : taxRate}
                            onChange={(e) => setTaxRate(Number(e.target.value) || 0)}
                            placeholder="0"
                            className="flex-1 px-3 py-2 text-right font-bold text-blue-600 focus:outline-none"
                          />
                          <span className="px-3 py-2 bg-slate-50 text-slate-600 border-l border-slate-200">%</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Your marginal tax bracket (10-37%)</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Results */}
              <div>
                <SaveIndicator />
                {/* Results Card */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  <p className="text-sm text-slate-600 mb-1">Future Value</p>
                  <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{formatMoney(futureValue)}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Total Deposits</p>
                      <p className="text-xl font-bold text-slate-800">{formatMoney(totalContributions)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">Interest Earned</p>
                      <p className="text-xl font-bold text-green-600">{formatMoney(totalInterest)}</p>
                    </div>
                  </div>
                </div>

                {/* Growth Breakdown */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">Growth Breakdown</h3>
                  <div className="h-8 rounded-full overflow-hidden flex">
                    <div
                      className="bg-blue-600 transition-all"
                      style={{ width: `${(totalContributions / futureValue) * 100}%` }}
                    />
                    <div
                      className="bg-emerald-400 transition-all"
                      style={{ width: `${(totalInterest / futureValue) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-blue-600"></span>
                      <span className="text-slate-600">Deposits ({Math.round((totalContributions / futureValue) * 100)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-emerald-400"></span>
                      <span className="text-slate-600">Interest ({Math.round((totalInterest / futureValue) * 100)}%)</span>
                    </div>
                  </div>
                </div>

                {/* Key Stats */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">Key Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Initial Deposit</span>
                      <span className="font-semibold">{formatMoney(initialDeposit)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Monthly Contributions</span>
                      <span className="font-semibold">{formatMoney(monthlyContribution * 12 * years)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Interest Earned</span>
                      <span className="font-semibold text-green-600">{formatMoney(totalInterest)}</span>
                    </div>
                    {inflationRate > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Inflation-Adjusted Value</span>
                        <span className="font-semibold text-amber-600">{formatMoney(inflationAdjustedValue)}</span>
                      </div>
                    )}
                    {taxRate > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">After-Tax Value</span>
                        <span className="font-semibold text-purple-700">{formatMoney(afterTaxValue)}</span>
                      </div>
                    )}
                    {savingsGoal > 0 && yearsToGoal > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Time to Reach {formatMoney(savingsGoal)}</span>
                        <span className="font-semibold text-blue-600">{yearsToGoal.toFixed(1)} years</span>
                      </div>
                    )}
                    <div className="border-t pt-3 flex justify-between">
                      <span className="font-semibold text-slate-900">Final Balance</span>
                      <span className="font-bold text-lg">{formatMoney(futureValue)}</span>
                    </div>
                  </div>
                </div>

                {/* Year-by-Year Table Button */}
                <button
                  onClick={() => setShowTableModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 font-medium mb-4"
                >
                  📅 View Year-by-Year Growth
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

            {/* Ad Rectangle - Between Calculator and Info */}
            <div className="mt-8">
              <AdBlock slot="calculator-bottom" />
            </div>

            {/* Savings Tips & Current Rates - BELOW CALCULATOR */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* Savings Tips */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">💡 Smart Savings Tips</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 mt-1">•</span>
                    <span><strong>Automate:</strong> Set up automatic transfers on payday</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 mt-1">•</span>
                    <span><strong>Emergency Fund:</strong> Aim for 3-6 months of expenses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 mt-1">•</span>
                    <span><strong>Compare Rates:</strong> Online banks often offer 10x higher APY</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 mt-1">•</span>
                    <span><strong>Avoid Fees:</strong> Choose accounts with no monthly fees</span>
                  </li>
                </ul>
              </div>

              {/* Current Rates Table */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">📊 Current Savings Rates</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 font-semibold text-slate-700">Account Type</th>
                        <th className="text-right py-2 font-semibold text-slate-700">APY Range</th>
                        <th className="text-right py-2 font-semibold text-slate-700">Min. Deposit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRates.map((row, i) => (
                        <tr key={i} className="border-b border-slate-100">
                          <td className="py-2 text-slate-600">{row.type}</td>
                          <td className="py-2 text-right font-medium text-emerald-700">{row.rate}</td>
                          <td className="py-2 text-right text-slate-600">{row.minDeposit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-400 mt-3">*Rates as of 2024. Check with institutions for current rates.</p>
              </div>
            </div>

            {/* Example Calculation - BELOW INFO CARDS */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 mt-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">📊 Example Calculation</h3>
              <p className="text-slate-600 mb-4">
                Let's say you start with <strong>$5,000</strong>, contribute <strong>$200/month</strong>, at <strong>4.5% APY</strong>, for <strong>10 years</strong>:
              </p>
              <div className="bg-emerald-50 rounded-xl p-6 mb-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-mono text-slate-700 text-sm">
                      Initial Deposit: $5,000<br />
                      Monthly × 120 months: $24,000<br />
                      <strong>Total Deposits: $29,000</strong>
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-slate-700 text-sm">
                      Interest Earned: ~$7,400<br />
                      <strong className="text-emerald-700 text-lg">Final Balance: ~$36,400</strong>
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-slate-600">
                By saving consistently, you earn over <strong>$7,400 in interest</strong> – that's free money just for being patient! 
                The longer you save, the more compound interest works in your favor.
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
                {/* What is a Savings Account */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📖 What is a Savings Account?</h2>
                  <p className="text-slate-600 mb-4">
                    A savings account is a secure way to store money while earning interest. Unlike checking accounts designed for daily transactions, savings accounts are meant for accumulating money over time. Your deposits are protected by FDIC insurance (up to $250,000), making it one of the safest places to keep your money.
                  </p>
                  <p className="text-slate-600">
                    The power of compound interest means your money earns interest on both your principal and previously earned interest. Even small regular contributions can grow significantly over time, making consistent saving more important than the initial amount.
                  </p>
                </div>

                {/* Formula */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📐 The Formula</h2>
                  <div className="bg-slate-100 rounded-xl p-6 mb-6 text-center">
                    <p className="text-2xl font-mono font-bold text-slate-800">FV = P(1 + r/n)<sup>nt</sup> + PMT × [(1 + r/n)<sup>nt</sup> - 1] / (r/n)</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-12">FV</span><span className="text-slate-600">= Future value (total savings)</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-12">P</span><span className="text-slate-600">= Initial deposit (principal)</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-12">PMT</span><span className="text-slate-600">= Monthly contribution amount</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-12">r</span><span className="text-slate-600">= Annual interest rate (as decimal)</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-12">n</span><span className="text-slate-600">= Compounding frequency per year</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-12">t</span><span className="text-slate-600">= Time in years</span></div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 Tips to Maximize Your Savings</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4"><span className="text-2xl">🏦</span><div><h3 className="font-semibold text-slate-900">Choose High-Yield Accounts</h3><p className="text-slate-600">Online banks often offer 10-20x higher rates than traditional banks.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">⚡</span><div><h3 className="font-semibold text-slate-900">Automate Your Savings</h3><p className="text-slate-600">Set up automatic transfers right after payday to save first.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">🎯</span><div><h3 className="font-semibold text-slate-900">Set Specific Goals</h3><p className="text-slate-600">Having a clear target (emergency fund, vacation, etc.) keeps you motivated.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">📈</span><div><h3 className="font-semibold text-slate-900">Increase Contributions Over Time</h3><p className="text-slate-600">When you get a raise, increase your savings rate too.</p></div></div>
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

              {/* Sidebar - RIGHT (1 column) */}
              <div className="space-y-6">
                {/* Ad Block */}
                <AdBlock slot="sidebar-1" />

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
                    Health Calculators
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
