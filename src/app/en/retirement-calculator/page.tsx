"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function RetirementCalculator() {
  // Basic inputs
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualIncome, setAnnualIncome] = useState(75000);

  // Advanced inputs
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [employerMatch, setEmployerMatch] = useState(50);
  const [employerMatchLimit, setEmployerMatchLimit] = useState(6);
  const [salaryIncrease, setSalaryIncrease] = useState(2);
  const [preRetirementReturn, setPreRetirementReturn] = useState(7);
  const [postRetirementReturn, setPostRetirementReturn] = useState(5);
  const [inflationRate, setInflationRate] = useState(3);
  const [lifeExpectancy, setLifeExpectancy] = useState(90);
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState(5000);
  const [socialSecurityMonthly, setSocialSecurityMonthly] = useState(2000);
  const [showTableModal, setShowTableModal] = useState(false);

  // Results
  const [projectedBalance, setProjectedBalance] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalEmployerMatch, setTotalEmployerMatch] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [monthlyIncomeAtRetirement, setMonthlyIncomeAtRetirement] = useState(0);
  const [yearsMoneyLasts, setYearsMoneyLasts] = useState(0);
  const [savingsGap, setSavingsGap] = useState(0);
  const [onTrackStatus, setOnTrackStatus] = useState<"ahead" | "on-track" | "behind">("on-track");
  const [yearlyData, setYearlyData] = useState<any[]>([]);

  // Calculate
  useEffect(() => {
    const yearsToRetirement = retirementAge - currentAge;
    const yearsInRetirement = lifeExpectancy - retirementAge;
    
    if (yearsToRetirement <= 0) return;

    let balance = currentSavings;
    let totalContrib = currentSavings;
    let totalMatch = 0;
    let currentIncome = annualIncome;
    let monthlyContrib = monthlyContribution;
    const data: any[] = [];

    // Accumulation phase
    for (let year = 1; year <= yearsToRetirement; year++) {
      const startBalance = balance;
      
      // Calculate employer match
      const maxMatchableAmount = (currentIncome * employerMatchLimit) / 100;
      const yearlyContribution = monthlyContrib * 12;
      const actualMatchableAmount = Math.min(yearlyContribution, maxMatchableAmount);
      const matchAmount = (actualMatchableAmount * employerMatch) / 100;
      
      // Add contributions and match
      const totalYearlyAddition = yearlyContribution + matchAmount;
      totalContrib += yearlyContribution;
      totalMatch += matchAmount;
      
      // Add to balance throughout the year (simplified)
      balance += totalYearlyAddition;
      
      // Apply annual return
      const yearReturn = balance * (preRetirementReturn / 100);
      balance += yearReturn;
      
      data.push({
        age: currentAge + year,
        year,
        phase: "Accumulation",
        contributions: Math.round(yearlyContribution),
        employerMatch: Math.round(matchAmount),
        returns: Math.round(yearReturn),
        balance: Math.round(balance),
      });
      
      // Increase salary and contribution for next year
      currentIncome *= (1 + salaryIncrease / 100);
      monthlyContrib *= (1 + salaryIncrease / 100);
    }

    const balanceAtRetirement = balance;
    const interestEarned = balanceAtRetirement - totalContrib - totalMatch;

    // Calculate sustainable monthly withdrawal (4% rule adjusted)
    const monthlyFromSavings = (balanceAtRetirement * (postRetirementReturn / 100)) / 12;
    const totalMonthlyIncome = monthlyFromSavings + socialSecurityMonthly;
    
    // Calculate how long money lasts with desired income
    let withdrawalBalance = balanceAtRetirement;
    let monthsLasted = 0;
    const monthlyNeed = desiredMonthlyIncome - socialSecurityMonthly;
    
    if (monthlyNeed > 0) {
      while (withdrawalBalance > 0 && monthsLasted < yearsInRetirement * 12 * 2) {
        // Add monthly return
        withdrawalBalance += (withdrawalBalance * (postRetirementReturn / 100)) / 12;
        // Subtract withdrawal
        withdrawalBalance -= monthlyNeed;
        monthsLasted++;
      }
    } else {
      monthsLasted = yearsInRetirement * 12;
    }

    const yearsLasted = monthsLasted / 12;
    
    // Calculate savings gap
    const neededAtRetirement = monthlyNeed * 12 * yearsInRetirement / (1 + postRetirementReturn / 100);
    const gap = Math.max(0, neededAtRetirement - balanceAtRetirement);

    // Determine on-track status
    let status: "ahead" | "on-track" | "behind" = "on-track";
    if (yearsLasted >= yearsInRetirement) {
      status = "ahead";
    } else if (yearsLasted >= yearsInRetirement * 0.8) {
      status = "on-track";
    } else {
      status = "behind";
    }

    setProjectedBalance(balanceAtRetirement);
    setTotalContributions(totalContrib);
    setTotalEmployerMatch(totalMatch);
    setTotalInterest(interestEarned);
    setMonthlyIncomeAtRetirement(totalMonthlyIncome);
    setYearsMoneyLasts(yearsLasted);
    setSavingsGap(gap);
    setOnTrackStatus(status);
    setYearlyData(data);
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, annualIncome, employerMatch, employerMatchLimit, salaryIncrease, preRetirementReturn, postRetirementReturn, inflationRate, lifeExpectancy, desiredMonthlyIncome, socialSecurityMonthly]);

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Percentages for breakdown
  const contributionsPct = (totalContributions / projectedBalance) * 100 || 0;
  const matchPct = (totalEmployerMatch / projectedBalance) * 100 || 0;
  const interestPct = (totalInterest / projectedBalance) * 100 || 0;

  // FAQ data
  const faqs = [
    { 
      question: "How much do I need to retire comfortably?", 
      answer: "A common rule is to have 25x your annual expenses saved (the 4% rule). If you spend $50,000/year, aim for $1.25 million. However, this varies based on lifestyle, location, health, and other income sources like Social Security or pensions." 
    },
    { 
      question: "What is the 4% rule?", 
      answer: "The 4% rule suggests withdrawing 4% of your retirement savings in year one, then adjusting for inflation each year. Historically, this has provided a high probability of your money lasting 30 years. Some experts now recommend 3-3.5% to be more conservative." 
    },
    { 
      question: "Should I prioritize 401(k) or IRA?", 
      answer: "If your employer offers a match, contribute enough to get the full match first (it's free money). Then consider a Roth IRA for tax diversification. After maxing IRA limits, return to your 401(k). High earners may benefit from maxing 401(k) first for the tax deduction." 
    },
    { 
      question: "When can I access retirement funds without penalty?", 
      answer: "Generally, age 59½ for 401(k)s and IRAs. Early withdrawals typically incur a 10% penalty plus income tax. Exceptions include the Rule of 55 (leave job at 55+), substantially equal periodic payments (SEPP), and certain hardships." 
    },
    { 
      question: "How does Social Security work?", 
      answer: "You can claim Social Security at 62 (reduced benefits), full retirement age (66-67), or delay until 70 (increased benefits). Each year you delay past FRA increases benefits by 8%. The average benefit is about $1,900/month, but varies based on your earnings history." 
    }
  ];

  // Related calculators
  const financeCalcs = [
    "401K", "Compound Interest", "Savings", "Investment", "ROI",
    "Mortgage", "Loan", "Auto Loan", "Inflation", "Social Security"
  ];
  const healthCalcs = [
    "BMI", "Calorie", "Body Fat", "BMR", "Macro", "TDEE", "Protein", "Ideal Weight"
  ];

  const yearsToRetirement = retirementAge - currentAge;
  const yearsInRetirement = lifeExpectancy - retirementAge;

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
          <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Retirement Projection</h3>
              <button onClick={() => setShowTableModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="overflow-auto max-h-[50vh]">
              <table className="w-full">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Age</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Your Contributions</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Employer Match</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Investment Returns</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {yearlyData.map((row) => (
                    <tr key={row.age} className={row.age === retirementAge ? "bg-purple-50 font-semibold" : ""}>
                      <td className="px-4 py-3 font-medium">
                        {row.age}
                        {row.age === retirementAge && <span className="ml-2 text-purple-600 text-xs">🎉 Retire!</span>}
                      </td>
                      <td className="px-4 py-3 text-right text-blue-600">+{formatMoney(row.contributions)}</td>
                      <td className="px-4 py-3 text-right text-green-600">+{formatMoney(row.employerMatch)}</td>
                      <td className="px-4 py-3 text-right text-amber-600">+{formatMoney(row.returns)}</td>
                      <td className="px-4 py-3 text-right font-bold">{formatMoney(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-200 flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 rounded-xl hover:bg-slate-200 font-medium text-slate-700">
                📄 Download PDF <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">PRO</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 rounded-xl hover:bg-slate-200 font-medium text-slate-700">
                📊 Download Excel <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">PRO</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-b from-purple-50 to-white py-6">
          <div className="container">
            <nav className="text-sm mb-4">
              <Link href="/" className="text-slate-500 hover:text-purple-600">Home</Link>
              <span className="mx-2 text-slate-400">/</span>
              <Link href="/en/calculators" className="text-slate-500 hover:text-purple-600">Calculators</Link>
              <span className="mx-2 text-slate-400">/</span>
              <span className="text-slate-700">Retirement</span>
            </nav>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">🏖️</div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Retirement Calculator</h1>
                <p className="text-slate-600">Plan your path to financial freedom</p>
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
                <h2 className="text-xl font-bold text-slate-900 mb-6">Your Details</h2>

                {/* Age Range */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium text-slate-700 text-sm">Current Age</label>
                      <span className="font-bold text-purple-600">{currentAge}</span>
                    </div>
                    <input
                      type="range"
                      min="18"
                      max="70"
                      value={currentAge}
                      onChange={(e) => setCurrentAge(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium text-slate-700 text-sm">Retirement Age</label>
                      <span className="font-bold text-purple-600">{retirementAge}</span>
                    </div>
                    <input
                      type="range"
                      min={currentAge + 1}
                      max="80"
                      value={retirementAge}
                      onChange={(e) => setRetirementAge(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                  </div>
                </div>

                <p className="text-center text-sm text-slate-500 mb-6 p-2 bg-purple-50 rounded-lg">
                  🎯 <strong>{yearsToRetirement} years</strong> until retirement
                </p>

                {/* Current Savings */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Current Retirement Savings</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-500">$</span>
                      <input
                        type="text"
                        value={currentSavings.toLocaleString()}
                        onChange={(e) => setCurrentSavings(Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-28 bg-transparent text-right font-bold text-purple-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000000"
                    step="5000"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>$0</span>
                    <span>$1M</span>
                  </div>
                </div>

                {/* Monthly Contribution */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Monthly Contribution</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-500">$</span>
                      <input
                        type="text"
                        value={monthlyContribution.toLocaleString()}
                        onChange={(e) => setMonthlyContribution(Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-24 bg-transparent text-right font-bold text-purple-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="50"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>$0</span>
                    <span>$5,000</span>
                  </div>
                </div>

                {/* Annual Income */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Annual Income</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-500">$</span>
                      <input
                        type="text"
                        value={annualIncome.toLocaleString()}
                        onChange={(e) => setAnnualIncome(Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-28 bg-transparent text-right font-bold text-purple-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="20000"
                    max="300000"
                    step="5000"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <p className="text-xs text-slate-400 mt-1">Used for employer match calculation</p>
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
                    {/* Employer Match */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-medium text-slate-700 text-sm block mb-2">Employer Match %</label>
                        <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                          <input
                            type="text"
                            value={employerMatch}
                            onChange={(e) => setEmployerMatch(Number(e.target.value) || 0)}
                            className="w-full bg-transparent text-right font-bold text-purple-600 focus:outline-none"
                          />
                          <span className="text-slate-500 ml-1">%</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">e.g., 50% = 50¢ per $1</p>
                      </div>
                      <div>
                        <label className="font-medium text-slate-700 text-sm block mb-2">Match Limit (% of salary)</label>
                        <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                          <input
                            type="text"
                            value={employerMatchLimit}
                            onChange={(e) => setEmployerMatchLimit(Number(e.target.value) || 0)}
                            className="w-full bg-transparent text-right font-bold text-purple-600 focus:outline-none"
                          />
                          <span className="text-slate-500 ml-1">%</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">e.g., 6% of salary</p>
                      </div>
                    </div>

                    {/* Returns */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-medium text-slate-700 text-sm block mb-2">Pre-Retirement Return</label>
                        <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                          <input
                            type="text"
                            value={preRetirementReturn}
                            onChange={(e) => setPreRetirementReturn(Number(e.target.value) || 0)}
                            className="w-full bg-transparent text-right font-bold text-purple-600 focus:outline-none"
                          />
                          <span className="text-slate-500 ml-1">%</span>
                        </div>
                      </div>
                      <div>
                        <label className="font-medium text-slate-700 text-sm block mb-2">Post-Retirement Return</label>
                        <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                          <input
                            type="text"
                            value={postRetirementReturn}
                            onChange={(e) => setPostRetirementReturn(Number(e.target.value) || 0)}
                            className="w-full bg-transparent text-right font-bold text-purple-600 focus:outline-none"
                          />
                          <span className="text-slate-500 ml-1">%</span>
                        </div>
                      </div>
                    </div>

                    {/* Other Rates */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-medium text-slate-700 text-sm block mb-2">Salary Increase/Year</label>
                        <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                          <input
                            type="text"
                            value={salaryIncrease}
                            onChange={(e) => setSalaryIncrease(Number(e.target.value) || 0)}
                            className="w-full bg-transparent text-right font-bold text-purple-600 focus:outline-none"
                          />
                          <span className="text-slate-500 ml-1">%</span>
                        </div>
                      </div>
                      <div>
                        <label className="font-medium text-slate-700 text-sm block mb-2">Inflation Rate</label>
                        <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                          <input
                            type="text"
                            value={inflationRate}
                            onChange={(e) => setInflationRate(Number(e.target.value) || 0)}
                            className="w-full bg-transparent text-right font-bold text-purple-600 focus:outline-none"
                          />
                          <span className="text-slate-500 ml-1">%</span>
                        </div>
                      </div>
                    </div>

                    {/* Life Expectancy & Desired Income */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-medium text-slate-700 text-sm block mb-2">Life Expectancy</label>
                        <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                          <input
                            type="text"
                            value={lifeExpectancy}
                            onChange={(e) => setLifeExpectancy(Number(e.target.value) || 0)}
                            className="w-full bg-transparent text-right font-bold text-purple-600 focus:outline-none"
                          />
                          <span className="text-slate-500 ml-1">years</span>
                        </div>
                      </div>
                      <div>
                        <label className="font-medium text-slate-700 text-sm block mb-2">Desired Monthly Income</label>
                        <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                          <span className="text-slate-500">$</span>
                          <input
                            type="text"
                            value={desiredMonthlyIncome.toLocaleString()}
                            onChange={(e) => setDesiredMonthlyIncome(Number(e.target.value.replace(/,/g, "")) || 0)}
                            className="w-full bg-transparent text-right font-bold text-purple-600 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Social Security */}
                    <div>
                      <label className="font-medium text-slate-700 text-sm block mb-2">Expected Social Security (Monthly)</label>
                      <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-slate-200">
                        <span className="text-slate-500">$</span>
                        <input
                          type="text"
                          value={socialSecurityMonthly.toLocaleString()}
                          onChange={(e) => setSocialSecurityMonthly(Number(e.target.value.replace(/,/g, "")) || 0)}
                          className="w-full bg-transparent text-right font-bold text-purple-600 focus:outline-none"
                        />
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Check ssa.gov for your estimate</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Results */}
              <div>
                {/* Status Banner */}
                <div className={`rounded-2xl p-4 mb-4 flex items-center gap-4 ${
                  onTrackStatus === "ahead" ? "bg-green-100 border border-green-200" :
                  onTrackStatus === "on-track" ? "bg-yellow-100 border border-yellow-200" :
                  "bg-red-100 border border-red-200"
                }`}>
                  <span className="text-4xl">
                    {onTrackStatus === "ahead" ? "🎉" : onTrackStatus === "on-track" ? "👍" : "⚠️"}
                  </span>
                  <div>
                    <h3 className={`font-bold ${
                      onTrackStatus === "ahead" ? "text-green-800" :
                      onTrackStatus === "on-track" ? "text-yellow-800" :
                      "text-red-800"
                    }`}>
                      {onTrackStatus === "ahead" ? "You're Ahead of Schedule!" :
                       onTrackStatus === "on-track" ? "You're On Track" :
                       "You May Need to Save More"}
                    </h3>
                    <p className={`text-sm ${
                      onTrackStatus === "ahead" ? "text-green-700" :
                      onTrackStatus === "on-track" ? "text-yellow-700" :
                      "text-red-700"
                    }`}>
                      Your savings will last approximately {yearsMoneyLasts.toFixed(1)} years in retirement
                    </p>
                  </div>
                </div>

                {/* Results Card */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  <p className="text-sm text-slate-500 mb-1">Projected Balance at {retirementAge}</p>
                  <p className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">{formatMoney(projectedBalance)}</p>
                  <p className="text-slate-400 mb-6">in {yearsToRetirement} years</p>

                  {/* Breakdown Bar */}
                  <div className="h-6 rounded-full overflow-hidden flex mb-3">
                    <div className="bg-purple-600 transition-all" style={{ width: `${contributionsPct}%` }} title="Your Contributions" />
                    <div className="bg-green-500 transition-all" style={{ width: `${matchPct}%` }} title="Employer Match" />
                    <div className="bg-amber-400 transition-all" style={{ width: `${interestPct}%` }} title="Investment Growth" />
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-purple-600"></span>
                      <span className="text-slate-600">Your Contributions ({contributionsPct.toFixed(0)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-green-500"></span>
                      <span className="text-slate-600">Employer Match ({matchPct.toFixed(0)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-amber-400"></span>
                      <span className="text-slate-600">Growth ({interestPct.toFixed(0)}%)</span>
                    </div>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-500">Your Contributions</p>
                      <p className="text-xl font-bold text-purple-600">{formatMoney(totalContributions)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-500">Employer Match</p>
                      <p className="text-xl font-bold text-green-600">{formatMoney(totalEmployerMatch)}</p>
                    </div>
                  </div>

                  {/* More Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-500">Investment Growth</p>
                      <p className="text-sm font-bold text-amber-600">{formatMoney(totalInterest)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-500">Monthly Income</p>
                      <p className="text-sm font-bold text-slate-800">{formatMoney(monthlyIncomeAtRetirement)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-500">Years Covered</p>
                      <p className="text-sm font-bold text-slate-800">{yearsMoneyLasts.toFixed(1)} yrs</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                      <p className="text-xs text-slate-500">Free Money</p>
                      <p className="text-sm font-bold text-green-600">{formatMoney(totalEmployerMatch + totalInterest)}</p>
                    </div>
                  </div>

                  {/* Employer Match Reminder */}
                  {employerMatch > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <p className="text-sm text-green-800">
                        💰 <strong>Free Money Alert:</strong> Your employer will contribute {formatMoney(totalEmployerMatch)} over your career. Make sure you're contributing at least {employerMatchLimit}% to get the full match!
                      </p>
                    </div>
                  )}
                </div>

                {/* View Schedule Button */}
                <button
                  onClick={() => setShowTableModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 font-medium mb-4"
                >
                  📈 View Year-by-Year Projection
                </button>

                {/* Export Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">
                    📄 PDF <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">PRO</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700">
                    📊 Excel <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">PRO</span>
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
                {/* What You Need */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📖 How Much Do You Need?</h2>
                  <p className="text-slate-600 mb-4">
                    A common guideline is the "25x Rule" — save 25 times your expected annual expenses. If you want {formatMoney(desiredMonthlyIncome)}/month ({formatMoney(desiredMonthlyIncome * 12)}/year) in retirement, you'd need about {formatMoney(desiredMonthlyIncome * 12 * 25)}.
                  </p>
                  <p className="text-slate-600">
                    This is based on the 4% rule: withdraw 4% of your savings in year one, then adjust for inflation. Historically, this provides a high probability your money lasts 30+ years. Social Security and other income sources reduce how much you need to save.
                  </p>
                </div>

                {/* Your Numbers Explained */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💰 Your Retirement Income</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4 p-4 bg-purple-50 rounded-xl">
                      <span className="text-2xl">🏦</span>
                      <div>
                        <h3 className="font-semibold text-slate-900">From Savings: {formatMoney(monthlyIncomeAtRetirement - socialSecurityMonthly)}/mo</h3>
                        <p className="text-slate-600 text-sm">Sustainable withdrawal from your {formatMoney(projectedBalance)} nest egg</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-blue-50 rounded-xl">
                      <span className="text-2xl">🏛️</span>
                      <div>
                        <h3 className="font-semibold text-slate-900">Social Security: {formatMoney(socialSecurityMonthly)}/mo</h3>
                        <p className="text-slate-600 text-sm">Government benefit based on your work history</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-slate-900 rounded-xl">
                      <span className="text-2xl">🎯</span>
                      <div>
                        <h3 className="font-semibold text-white">Total Monthly Income: {formatMoney(monthlyIncomeAtRetirement)}</h3>
                        <p className="text-slate-300 text-sm">What you can expect each month in retirement</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 Retirement Planning Tips</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4"><span className="text-2xl">🎯</span><div><h3 className="font-semibold text-slate-900">Max Your Employer Match</h3><p className="text-slate-600">It's literally free money. If your employer matches 50% up to 6%, contribute at least 6%.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">📈</span><div><h3 className="font-semibold text-slate-900">Increase Contributions Annually</h3><p className="text-slate-600">Bump your contribution by 1% each year, especially when you get raises.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">⚖️</span><div><h3 className="font-semibold text-slate-900">Diversify Tax Treatment</h3><p className="text-slate-600">Have both traditional (pre-tax) and Roth (after-tax) accounts for flexibility.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">🎢</span><div><h3 className="font-semibold text-slate-900">Stay the Course</h3><p className="text-slate-600">Don't panic during market dips. Time in the market beats timing the market.</p></div></div>
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

                {/* Milestones Box */}
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
                  <h3 className="font-bold text-lg mb-2">📊 Retirement Milestones</h3>
                  <p className="text-purple-100 text-sm mb-4">Key ages to know</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Catch-up contributions</span>
                      <span className="font-bold">50+</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rule of 55 (401k)</span>
                      <span className="font-bold">55</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Penalty-free withdrawals</span>
                      <span className="font-bold">59½</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Early Social Security</span>
                      <span className="font-bold">62</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Medicare eligible</span>
                      <span className="font-bold">65</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Full SS benefits</span>
                      <span className="font-bold">67</span>
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
