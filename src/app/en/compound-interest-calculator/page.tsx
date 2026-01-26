"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function CompoundInterestCalculator() {
  // Calculator state
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(7);
  const [time, setTime] = useState(10);
  const [compound, setCompound] = useState(12);
  const [contribution, setContribution] = useState(100);
  const [showTableModal, setShowTableModal] = useState(false);

  // Results
  const [futureValue, setFutureValue] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [yearlyData, setYearlyData] = useState<any[]>([]);

  // Calculate
  useEffect(() => {
    const r = rate / 100;
    const n = compound;
    const t = time;
    const P = principal;
    const PMT = contribution;

    const compoundFactor = Math.pow(1 + r / n, n * t);
    const fvPrincipal = P * compoundFactor;
    const fvContributions = PMT * ((compoundFactor - 1) / (r / n));
    const fv = fvPrincipal + fvContributions;

    const totalContrib = P + PMT * n * t;
    const interest = fv - totalContrib;

    setFutureValue(fv);
    setTotalContributions(totalContrib);
    setTotalInterest(interest);

    // Generate yearly data
    let data = [];
    let balance = P;
    let contrib = P;
    for (let year = 1; year <= t; year++) {
      for (let month = 1; month <= 12; month++) {
        balance = balance * (1 + r / n) + PMT;
        contrib += PMT;
      }
      data.push({
        year,
        balance: Math.round(balance),
        contributions: Math.round(contrib),
        interest: Math.round(balance - contrib),
      });
    }
    setYearlyData(data);
  }, [principal, rate, time, compound, contribution]);

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // FAQ data
  const faqs = [
    { question: "What is compound interest?", answer: "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. This creates a snowball effect where your money grows faster over time." },
    { question: "How is compound interest different from simple interest?", answer: "Simple interest is calculated only on the principal amount, while compound interest is calculated on the principal plus any interest already earned." },
    { question: "How often should interest be compounded?", answer: "More frequent compounding leads to higher returns. Daily compounding yields more than monthly, which yields more than annually." },
    { question: "What is the Rule of 72?", answer: "The Rule of 72 is a quick way to estimate how long it takes to double your money. Divide 72 by your interest rate to get the approximate years needed." },
    { question: "How can I maximize compound interest?", answer: "Start investing early, contribute regularly, choose investments with higher returns, and avoid withdrawing your earnings." }
  ];

  // Categories
  const financeCalcs = [
    "Mortgage", "Loan", "Auto Loan", "Interest", "Payment", "Retirement",
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
              <h3 className="text-lg font-bold text-slate-900">Year-by-Year Growth</h3>
              <button onClick={() => setShowTableModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="overflow-auto max-h-[50vh]">
              <table className="w-full">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Year</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Contributions</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Interest</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {yearlyData.map((row, i) => (
                    <tr key={row.year} className={i === yearlyData.length - 1 ? "bg-green-50" : ""}>
                      <td className="px-4 py-3 font-medium">{row.year}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{formatMoney(row.contributions)}</td>
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
              <Link href="/" className="text-slate-500 hover:text-blue-600">Home</Link>
              <span className="mx-2 text-slate-400">/</span>
              <Link href="/en/calculators" className="text-slate-500 hover:text-blue-600">Calculators</Link>
              <span className="mx-2 text-slate-400">/</span>
              <span className="text-slate-700">Compound Interest</span>
            </nav>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">📈</div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Compound Interest Calculator</h1>
                <p className="text-slate-600">See how your money grows over time</p>
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
                <h2 className="text-xl font-bold text-slate-900 mb-6">Calculate Your Growth</h2>

                {/* Principal - EDITABLE INPUT */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Initial Investment</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-500">$</span>
                      <input
                        type="text"
                        value={principal.toLocaleString()}
                        onChange={(e) => setPrincipal(Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-24 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>$1,000</span>
                    <span>$100,000</span>
                  </div>
                </div>

                {/* Monthly Contribution - EDITABLE INPUT */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Monthly Contribution</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <span className="text-slate-500">$</span>
                      <input
                        type="text"
                        value={contribution.toLocaleString()}
                        onChange={(e) => setContribution(Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="w-20 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="50"
                    value={contribution}
                    onChange={(e) => setContribution(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>$0</span>
                    <span>$2,000</span>
                  </div>
                </div>

                {/* Interest Rate - EDITABLE INPUT */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Annual Interest Rate</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        type="text"
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value) || 0)}
                        className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                      <span className="text-slate-500">%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="0.5"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>1%</span>
                    <span>15%</span>
                  </div>
                </div>

                {/* Time Period - EDITABLE INPUT */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-slate-700">Time Period</label>
                    <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
                      <input
                        type="text"
                        value={time}
                        onChange={(e) => setTime(Number(e.target.value) || 0)}
                        className="w-12 bg-transparent text-right font-bold text-blue-600 focus:outline-none"
                      />
                      <span className="text-slate-500 ml-1">years</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="40"
                    step="1"
                    value={time}
                    onChange={(e) => setTime(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>1 year</span>
                    <span>40 years</span>
                  </div>
                </div>

                {/* Compound Frequency */}
                <div>
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
                        onClick={() => setCompound(option.value)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          compound === option.value
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results */}
              <div>
                {/* Results Card - SUBTLE (no gradient) */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4">
                  <p className="text-sm text-slate-500 mb-1">Future Value</p>
                  <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{formatMoney(futureValue)}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-500">Total Contributions</p>
                      <p className="text-xl font-bold text-slate-800">{formatMoney(totalContributions)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-500">Total Interest Earned</p>
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
                      className="bg-cyan-400 transition-all"
                      style={{ width: `${(totalInterest / futureValue) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-blue-600"></span>
                      <span className="text-slate-600">Contributions ({Math.round((totalContributions / futureValue) * 100)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-cyan-400"></span>
                      <span className="text-slate-600">Interest ({Math.round((totalInterest / futureValue) * 100)}%)</span>
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
          </div>
        </section>

        {/* Educational Content with Sidebar */}
        <section className="py-12 bg-slate-50">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content - LEFT/CENTER (2 columns) */}
              <div className="lg:col-span-2 space-y-6">
                {/* What is Compound Interest */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📖 What is Compound Interest?</h2>
                  <p className="text-slate-600 mb-4">
                    Compound interest is often called the "eighth wonder of the world" because of its powerful ability to grow wealth over time. Unlike simple interest, which is calculated only on the principal amount, compound interest is calculated on both the principal and the accumulated interest from previous periods.
                  </p>
                  <p className="text-slate-600">
                    This means your money earns interest on interest, creating a snowball effect that accelerates your wealth growth. The longer you leave your money invested, the more dramatic the compounding effect becomes.
                  </p>
                </div>

                {/* Formula */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📐 The Formula</h2>
                  <div className="bg-slate-100 rounded-xl p-6 mb-6 text-center">
                    <p className="text-2xl font-mono font-bold text-slate-800">A = P(1 + r/n)<sup>nt</sup></p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">A</span><span className="text-slate-600">= Final amount (future value)</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">P</span><span className="text-slate-600">= Principal (initial investment)</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">r</span><span className="text-slate-600">= Annual interest rate (as decimal)</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">n</span><span className="text-slate-600">= Number of times interest compounds per year</span></div>
                    <div className="flex gap-4"><span className="font-bold text-blue-600 w-8">t</span><span className="text-slate-600">= Time in years</span></div>
                  </div>
                </div>

                {/* Example */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📊 Example Calculation</h2>
                  <p className="text-slate-600 mb-4">
                    Let's say you invest <strong>$10,000</strong> at <strong>7% annual interest</strong>, compounded <strong>monthly</strong>, for <strong>10 years</strong>:
                  </p>
                  <div className="bg-blue-50 rounded-xl p-6 mb-4">
                    <p className="font-mono text-slate-700">
                      A = 10,000 × (1 + 0.07/12)<sup>12×10</sup><br />
                      A = 10,000 × (1.00583)<sup>120</sup><br />
                      A = 10,000 × 2.0097<br />
                      <strong className="text-blue-600">A = $20,097</strong>
                    </p>
                  </div>
                  <p className="text-slate-600">
                    Your initial $10,000 investment would grow to approximately <strong>$20,097</strong>, earning <strong>$10,097 in interest</strong>!
                  </p>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 Tips to Maximize Compound Interest</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4"><span className="text-2xl">🚀</span><div><h3 className="font-semibold text-slate-900">Start Early</h3><p className="text-slate-600">Time is the most powerful factor.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">💰</span><div><h3 className="font-semibold text-slate-900">Contribute Regularly</h3><p className="text-slate-600">Even small monthly contributions add up.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">📈</span><div><h3 className="font-semibold text-slate-900">Reinvest Your Earnings</h3><p className="text-slate-600">Let it compound for maximum growth.</p></div></div>
                    <div className="flex gap-4"><span className="text-2xl">🔄</span><div><h3 className="font-semibold text-slate-900">Choose Higher Frequency</h3><p className="text-slate-600">Daily compounding yields more than monthly.</p></div></div>
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
