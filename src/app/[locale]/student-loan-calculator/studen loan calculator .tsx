"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import AdBlock from "@/components/ads/AdBlock";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

const CALCULATOR_SLUG = "student-loan-calculator";
const CALCULATOR_NAME = "Student Loan Calculator";
const CALCULATOR_CATEGORY = "finance";

// Federal loan rates 2024-2025
const FEDERAL_RATES = {
  "2024-2025": {
    undergrad: 6.53,
    graduate: 8.08,
    plus: 9.08,
    originationDirect: 1.057,
    originationPLUS: 4.228,
  },
  "2025-2026": {
    undergrad: 6.87,
    graduate: 8.42,
    plus: 9.42,
    originationDirect: 1.057,
    originationPLUS: 4.228,
  },
};

// Federal repayment plans
const REPAYMENT_PLANS = [
  { id: "standard", name: "Standard", years: 10, description: "Fixed payments over 10 years", pctIncome: 0 },
  { id: "graduated", name: "Graduated", years: 10, description: "Payments start low, increase every 2 years", pctIncome: 0 },
  { id: "extended", name: "Extended", years: 25, description: "Fixed or graduated over up to 25 years", pctIncome: 0 },
  { id: "ibr", name: "IBR (Income-Based)", years: 20, description: "15% of discretionary income, forgiven after 20-25 years", pctIncome: 15 },
  { id: "paye", name: "PAYE", years: 20, description: "10% of discretionary income, forgiven after 20 years", pctIncome: 10 },
  { id: "save", name: "SAVE", years: 20, description: "5-10% of discretionary income, lowest payments", pctIncome: 5 },
  { id: "icr", name: "ICR", years: 25, description: "20% of discretionary income, forgiven after 25 years", pctIncome: 20 },
];

// Federal poverty guidelines 2025 (48 contiguous states)
const POVERTY_GUIDELINES: { [key: number]: number } = {
  1: 15650, 2: 21150, 3: 26650, 4: 32150, 5: 37650, 6: 43150, 7: 48650, 8: 54150,
};

export default function StudentLoanCalculator() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // ==================== LOAN TYPE ====================
  const [loanType, setLoanType] = useState<"federal" | "private">("federal");
  const [federalLoanType, setFederalLoanType] = useState<"undergrad" | "graduate" | "plus">("undergrad");
  const [isSubsidized, setIsSubsidized] = useState(true);
  const [academicYear, setAcademicYear] = useState<"2024-2025" | "2025-2026">("2024-2025");

  // ==================== LOAN DETAILS ====================
  const [loanAmount, setLoanAmount] = useState(35000);
  const [interestRate, setInterestRate] = useState(6.53);
  const [loanTermMonths, setLoanTermMonths] = useState(120);
  const [inSchoolYears, setInSchoolYears] = useState(4);
  const [gracePeriodMonths, setGracePeriodMonths] = useState(6);

  // ==================== IDR INPUTS ====================
  const [repaymentPlan, setRepaymentPlan] = useState("standard");
  const [annualIncome, setAnnualIncome] = useState(50000);
  const [familySize, setFamilySize] = useState(1);
  const [incomeGrowth, setIncomeGrowth] = useState(3);

  // ==================== EXTRA PAYMENTS ====================
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState(0);
  const [makeInSchoolPayments, setMakeInSchoolPayments] = useState(false);

  // ==================== PSLF ====================
  const [isPSLF, setIsPSLF] = useState(false);

  // ==================== MULTIPLE LOANS ====================
  const [loans, setLoans] = useState([
    { id: 1, amount: 35000, rate: 6.53, subsidized: true, type: "undergrad" }
  ]);

  // ==================== RESULTS ====================
  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0,
    payoffDate: "",
    payoffMonths: 0,
    balanceAtRepayment: 0,
    interestDuringSchool: 0,
    interestDuringGrace: 0,
    idrPayment: 0,
    forgivenAmount: 0,
    interestSaved: 0,
    timeSaved: 0,
    amortization: [] as any[],
  });

  // UI State
  const [activeTab, setActiveTab] = useState<"calculator" | "idr" | "comparison">("calculator");
  const [showAmortization, setShowAmortization] = useState(false);

  // Favorites & Save
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Track
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
      const res = await fetch("/api/history", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, calculatorName: CALCULATOR_NAME, inputs: { loanAmount, interestRate, loanTermMonths, repaymentPlan }, results: { monthlyPayment: results.monthlyPayment.toFixed(2), totalInterest: results.totalInterest.toFixed(2) } }) });
      if (res.ok) { setSaveStatus('saved'); setTimeout(() => setSaveStatus('idle'), 2000); } else { setSaveStatus('error'); }
    } catch { setSaveStatus('error'); }
  };

  const handleInputChange = (setter: (value: any) => void, value: any) => { setter(value); trackCalculation(); };
  const SaveIndicator = () => { if (saveStatus === 'idle') return null; if (saveStatus === 'saving') return <span className="text-xs text-slate-400">Saving...</span>; if (saveStatus === 'saved') return <span className="text-xs text-green-500">✓ Saved</span>; return <span className="text-xs text-red-500">Error</span>; };

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const res = await fetch('/api/favorites');
        if (res.ok) { const data = await res.json(); setIsFavorite(data.favorites?.some((f: any) => f.calculatorSlug === CALCULATOR_SLUG)); }
      } catch {}
    };
    checkFavorite();
  }, []);

  const toggleFavorite = async () => {
    setFavoriteLoading(true);
    try {
      if (isFavorite) { await fetch(`/api/favorites?slug=${CALCULATOR_SLUG}`, { method: 'DELETE' }); setIsFavorite(false); }
      else { await fetch('/api/favorites', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, calculatorName: CALCULATOR_NAME, category: CALCULATOR_CATEGORY }) }); setIsFavorite(true); }
    } catch {}
    setFavoriteLoading(false);
  };

  // Update interest rate when federal loan type changes
  useEffect(() => {
    if (loanType === "federal") {
      const rates = FEDERAL_RATES[academicYear];
      setInterestRate(rates[federalLoanType]);
    }
  }, [loanType, federalLoanType, academicYear]);

  // ==================== MAIN CALCULATION ====================
  useEffect(() => {
    const monthlyRate = interestRate / 100 / 12;
    
    // Calculate interest during in-school period (if unsubsidized or private)
    let interestDuringSchool = 0;
    if (!isSubsidized || loanType === "private") {
      interestDuringSchool = loanAmount * (interestRate / 100) * inSchoolYears;
    }
    
    // If making in-school payments, interest doesn't capitalize
    if (makeInSchoolPayments) {
      interestDuringSchool = 0;
    }
    
    // Calculate interest during grace period (6 months typically)
    let interestDuringGrace = 0;
    if (!isSubsidized || loanType === "private") {
      interestDuringGrace = (loanAmount + interestDuringSchool) * (interestRate / 100) * (gracePeriodMonths / 12);
    }
    
    // Balance at start of repayment
    const balanceAtRepayment = loanAmount + interestDuringSchool + interestDuringGrace;
    
    // Calculate based on repayment plan
    let monthlyPayment = 0;
    let totalPayment = 0;
    let totalInterest = 0;
    let payoffMonths = loanTermMonths;
    let forgivenAmount = 0;
    let idrPayment = 0;
    
    const selectedPlan = REPAYMENT_PLANS.find(p => p.id === repaymentPlan);
    
    if (selectedPlan && selectedPlan.pctIncome > 0) {
      // Income-Driven Repayment calculation
      const povertyLine = POVERTY_GUIDELINES[familySize] || POVERTY_GUIDELINES[1];
      const discretionaryIncome = Math.max(0, annualIncome - (povertyLine * 1.5));
      idrPayment = (discretionaryIncome * (selectedPlan.pctIncome / 100)) / 12;
      
      // Standard payment for comparison
      const standardMonthly = balanceAtRepayment * (monthlyRate * Math.pow(1 + monthlyRate, 120)) / 
                             (Math.pow(1 + monthlyRate, 120) - 1);
      
      // IDR payment is capped at standard payment for PAYE
      if (repaymentPlan === "paye" && idrPayment > standardMonthly) {
        idrPayment = standardMonthly;
      }
      
      // Simulate repayment
      let balance = balanceAtRepayment;
      let totalPaid = 0;
      const maxMonths = selectedPlan.years * 12;
      const pslfMonths = 120; // 10 years for PSLF
      
      for (let month = 1; month <= maxMonths && balance > 0; month++) {
        const interest = balance * monthlyRate;
        const payment = Math.min(idrPayment, balance + interest);
        const principal = payment - interest;
        
        balance = Math.max(0, balance - principal);
        totalPaid += payment;
        
        // PSLF forgiveness after 10 years
        if (isPSLF && month >= pslfMonths) {
          forgivenAmount = balance;
          balance = 0;
          payoffMonths = month;
          break;
        }
        
        // Regular IDR forgiveness
        if (month >= maxMonths && balance > 0) {
          forgivenAmount = balance;
          balance = 0;
          payoffMonths = month;
        }
      }
      
      monthlyPayment = idrPayment;
      totalPayment = totalPaid;
      totalInterest = totalPaid - loanAmount;
      
    } else {
      // Standard/Graduated/Extended repayment
      const term = selectedPlan ? selectedPlan.years * 12 : loanTermMonths;
      
      if (monthlyRate > 0) {
        monthlyPayment = balanceAtRepayment * (monthlyRate * Math.pow(1 + monthlyRate, term)) / 
                        (Math.pow(1 + monthlyRate, term) - 1);
      } else {
        monthlyPayment = balanceAtRepayment / term;
      }
      
      // Calculate with extra payments
      const amortization: any[] = [];
      let balance = balanceAtRepayment;
      let totalPaid = 0;
      let month = 0;
      
      while (balance > 0.01 && month < term * 2) {
        month++;
        const interest = balance * monthlyRate;
        let principal = monthlyPayment - interest + extraMonthlyPayment;
        
        if (principal > balance) {
          principal = balance;
        }
        
        balance -= principal;
        totalPaid += interest + principal;
        
        amortization.push({
          month,
          payment: interest + principal,
          principal,
          interest,
          balance: Math.max(0, balance),
        });
        
        if (balance <= 0) break;
      }
      
      payoffMonths = month;
      totalPayment = totalPaid;
      totalInterest = totalPaid - loanAmount;
    }
    
    // Calculate savings from extra payments
    const baseTotal = loanTermMonths > 0 ? 
      (balanceAtRepayment * (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) / 
      (Math.pow(1 + monthlyRate, loanTermMonths) - 1)) * loanTermMonths : 0;
    const interestSaved = baseTotal - totalPayment;
    const timeSaved = loanTermMonths - payoffMonths;
    
    // Payoff date
    const today = new Date();
    today.setMonth(today.getMonth() + inSchoolYears * 12 + gracePeriodMonths + payoffMonths);
    
    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      payoffDate: today.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      payoffMonths,
      balanceAtRepayment,
      interestDuringSchool,
      interestDuringGrace,
      idrPayment,
      forgivenAmount,
      interestSaved: extraMonthlyPayment > 0 ? Math.max(0, interestSaved) : 0,
      timeSaved: extraMonthlyPayment > 0 ? Math.max(0, timeSaved) : 0,
      amortization: [],
    });

  }, [loanAmount, interestRate, loanTermMonths, inSchoolYears, gracePeriodMonths, isSubsidized,
      loanType, repaymentPlan, annualIncome, familySize, incomeGrowth, extraMonthlyPayment,
      makeInSchoolPayments, isPSLF]);

  const formatMoney = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
  const formatMoneyPrecise = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);

  // FAQ
  const faqs = [
    { question: "What's the difference between subsidized and unsubsidized loans?", answer: "With subsidized loans, the government pays the interest while you're in school, during grace periods, and during deferment. With unsubsidized loans, interest accrues from disbursement and capitalizes (gets added to principal) when you enter repayment, increasing your total cost." },
    { question: "What are income-driven repayment (IDR) plans?", answer: "IDR plans cap your monthly payment at a percentage (5-20%) of your discretionary income. After 20-25 years of payments, any remaining balance is forgiven. Options include SAVE (5-10%), PAYE (10%), IBR (15%), and ICR (20%). These are only available for federal loans." },
    { question: "What is Public Service Loan Forgiveness (PSLF)?", answer: "PSLF forgives your remaining federal loan balance after 120 qualifying monthly payments (10 years) while working full-time for a qualifying public service employer. The forgiveness is tax-free, unlike regular IDR forgiveness." },
    { question: "Should I consolidate my federal loans?", answer: "Federal loan consolidation combines multiple loans into one with a weighted average interest rate. It can simplify payments and provide access to more repayment plans. However, you may lose benefits like interest rate discounts, and any progress toward forgiveness resets." },
    { question: "Can I refinance student loans?", answer: "Yes, but refinancing federal loans with a private lender means losing federal benefits like IDR plans, PSLF eligibility, and deferment/forbearance options. Only refinance if you have a stable income, won't need federal protections, and can get a significantly lower rate." }
  ];

  const financeCalcs = ["Personal Loan", "Mortgage", "Auto Loan", "Loan", "Debt Consolidation"];

  return (
    <>
      <Header />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) }) }} />

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-6">
          <div className="container">
            <nav className="text-sm mb-4">
              <Link href={`/${locale}`} className="text-slate-600 hover:text-blue-600">Home</Link>
              <span className="mx-2 text-slate-400">/</span>
              <Link href={`/${locale}/calculators`} className="text-slate-600 hover:text-blue-600">Calculators</Link>
              <span className="mx-2 text-slate-400">/</span>
              <span className="text-slate-700">Student Loan</span>
            </nav>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">🎓</div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Student Loan Calculator</h1>
                  <button onClick={toggleFavorite} disabled={favoriteLoading} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                    {isFavorite ? <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    : <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>}
                  </button>
                </div>
                <div className="flex items-center gap-2"><p className="text-slate-600">Calculate monthly payments, compare repayment plans, and explore forgiveness options</p>{saveStatus !== 'idle' && <><span className="text-slate-400">—</span><SaveIndicator /></>}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-6 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-5 gap-6">
              {/* LEFT: Inputs */}
              <div className="lg:col-span-3 space-y-4">
                {/* Loan Type Toggle */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <div className="flex gap-2 mb-6">
                    <button
                      onClick={() => handleInputChange(setLoanType, "federal")}
                      className={`flex-1 py-3 px-4 rounded-xl font-medium ${loanType === "federal" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}
                    >
                      🏛️ Federal Loans
                    </button>
                    <button
                      onClick={() => handleInputChange(setLoanType, "private")}
                      className={`flex-1 py-3 px-4 rounded-xl font-medium ${loanType === "private" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}
                    >
                      🏦 Private Loans
                    </button>
                  </div>

                  {loanType === "federal" && (
                    <div className="space-y-4">
                      {/* Academic Year */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Academic Year</label>
                        <div className="flex gap-2">
                          {(["2024-2025", "2025-2026"] as const).map((year) => (
                            <button
                              key={year}
                              onClick={() => handleInputChange(setAcademicYear, year)}
                              className={`flex-1 py-2 rounded-lg text-sm font-medium ${academicYear === year ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}
                            >
                              {year}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Federal Loan Type */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Loan Type</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: "undergrad", label: "Undergraduate", rate: FEDERAL_RATES[academicYear].undergrad },
                            { id: "graduate", label: "Graduate", rate: FEDERAL_RATES[academicYear].graduate },
                            { id: "plus", label: "Parent PLUS", rate: FEDERAL_RATES[academicYear].plus },
                          ].map((type) => (
                            <button
                              key={type.id}
                              onClick={() => handleInputChange(setFederalLoanType, type.id as any)}
                              className={`py-2 px-3 rounded-lg text-sm font-medium ${federalLoanType === type.id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}
                            >
                              {type.label}<br /><span className="text-xs opacity-75">{type.rate}%</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Subsidized Toggle */}
                      {federalLoanType !== "plus" && (
                        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isSubsidized}
                              onChange={(e) => handleInputChange(setIsSubsidized, e.target.checked)}
                              className="w-5 h-5 rounded text-blue-600"
                            />
                            <span className="font-medium text-slate-700">Subsidized Loan</span>
                          </label>
                          <span className="text-sm text-slate-600">
                            {isSubsidized ? "Government pays interest while in school" : "Interest accrues from disbursement"}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {loanType === "private" && (
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                      <p className="text-sm text-amber-800">
                        <strong>Note:</strong> Private loans don't qualify for federal repayment plans, forgiveness programs, or income-driven options.
                      </p>
                    </div>
                  )}
                </div>

                {/* Loan Details */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">💰 Loan Details</h2>
                  
                  {/* Loan Amount */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Total Loan Amount</label>
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                      <span className="px-4 py-3 bg-slate-50 text-slate-600 border-r border-slate-200 font-medium">$</span>
                      <input
                        type="text"
                        value={loanAmount.toLocaleString()}
                        onChange={(e) => handleInputChange(setLoanAmount, Number(e.target.value.replace(/,/g, "")) || 0)}
                        className="flex-1 px-4 py-3 text-lg font-semibold text-blue-600 focus:outline-none"
                      />
                    </div>
                    <input
                      type="range"
                      min="5000"
                      max="200000"
                      step="1000"
                      value={loanAmount}
                      onChange={(e) => handleInputChange(setLoanAmount, Number(e.target.value))}
                      className="w-full mt-2 accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>$5,000</span>
                      <span>$200,000</span>
                    </div>
                  </div>

                  {/* Interest Rate (for private loans or manual override) */}
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Interest Rate</label>
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                        <input
                          type="number"
                          step="0.01"
                          value={interestRate}
                          onChange={(e) => handleInputChange(setInterestRate, Number(e.target.value) || 0)}
                          className="flex-1 px-4 py-3 text-lg font-semibold text-blue-600 focus:outline-none"
                          disabled={loanType === "federal"}
                        />
                        <span className="px-4 py-3 bg-slate-50 text-slate-600 border-l border-slate-200 font-medium">%</span>
                      </div>
                      {loanType === "federal" && (
                        <p className="text-xs text-slate-400 mt-1">Fixed federal rate for {academicYear}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Repayment Term</label>
                      <select
                        value={loanTermMonths}
                        onChange={(e) => handleInputChange(setLoanTermMonths, Number(e.target.value))}
                        className="w-full px-4 py-3 text-lg font-semibold text-blue-600 border border-slate-200 rounded-lg focus:outline-none"
                      >
                        <option value={120}>10 Years (Standard)</option>
                        <option value={180}>15 Years</option>
                        <option value={240}>20 Years</option>
                        <option value={300}>25 Years (Extended)</option>
                      </select>
                    </div>
                  </div>

                  {/* School & Grace Period */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Years in School</label>
                      <select
                        value={inSchoolYears}
                        onChange={(e) => handleInputChange(setInSchoolYears, Number(e.target.value))}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                      >
                        {[1, 2, 3, 4, 5, 6].map(y => <option key={y} value={y}>{y} year{y > 1 ? 's' : ''}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Grace Period</label>
                      <select
                        value={gracePeriodMonths}
                        onChange={(e) => handleInputChange(setGracePeriodMonths, Number(e.target.value))}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                      >
                        <option value={0}>No grace period</option>
                        <option value={6}>6 months (standard)</option>
                        <option value={9}>9 months</option>
                      </select>
                    </div>
                  </div>

                  {/* In-school payments option */}
                  {(!isSubsidized || loanType === "private") && (
                    <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={makeInSchoolPayments}
                          onChange={(e) => handleInputChange(setMakeInSchoolPayments, e.target.checked)}
                          className="w-5 h-5 rounded text-green-600"
                        />
                        <div>
                          <span className="font-medium text-green-800">Make interest payments while in school</span>
                          <p className="text-sm text-green-600">This prevents interest from capitalizing and saves {formatMoney(results.interestDuringSchool)}</p>
                        </div>
                      </label>
                    </div>
                  )}
                </div>

                {/* Federal Repayment Plans (only for federal loans) */}
                {loanType === "federal" && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">📋 Repayment Plan</h2>
                    
                    <div className="grid md:grid-cols-2 gap-3 mb-4">
                      {REPAYMENT_PLANS.map((plan) => (
                        <button
                          key={plan.id}
                          onClick={() => handleInputChange(setRepaymentPlan, plan.id)}
                          className={`p-3 rounded-xl text-left ${repaymentPlan === plan.id ? "bg-blue-50 border-2 border-blue-500" : "bg-slate-50 border border-slate-200"}`}
                        >
                          <span className="font-semibold text-slate-900">{plan.name}</span>
                          {plan.pctIncome > 0 && <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">{plan.pctIncome}% income</span>}
                          <p className="text-xs text-slate-600 mt-1">{plan.description}</p>
                        </button>
                      ))}
                    </div>

                    {/* IDR Inputs */}
                    {REPAYMENT_PLANS.find(p => p.id === repaymentPlan)?.pctIncome > 0 && (
                      <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
                        <h3 className="font-semibold text-purple-800 mb-3">Income-Driven Repayment Inputs</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-purple-700 mb-1">Annual Income</label>
                            <div className="flex items-center border border-purple-200 rounded-lg overflow-hidden bg-white">
                              <span className="px-3 py-2 bg-purple-50 text-purple-500 border-r border-purple-200">$</span>
                              <input
                                type="text"
                                value={annualIncome.toLocaleString()}
                                onChange={(e) => handleInputChange(setAnnualIncome, Number(e.target.value.replace(/,/g, "")) || 0)}
                                className="flex-1 px-3 py-2 focus:outline-none"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-purple-700 mb-1">Family Size</label>
                            <select
                              value={familySize}
                              onChange={(e) => handleInputChange(setFamilySize, Number(e.target.value))}
                              className="w-full px-3 py-2 border border-purple-200 rounded-lg"
                            >
                              {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>
                        </div>

                        {/* PSLF Option */}
                        <div className="mt-4">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isPSLF}
                              onChange={(e) => handleInputChange(setIsPSLF, e.target.checked)}
                              className="w-5 h-5 rounded text-purple-700"
                            />
                            <div>
                              <span className="font-medium text-purple-800">Public Service Loan Forgiveness (PSLF)</span>
                              <p className="text-sm text-purple-700">Forgiveness after 10 years (120 payments) for public service employees</p>
                            </div>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Extra Payments */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">⚡ Extra Payments</h2>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Extra Monthly Payment</label>
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                      <span className="px-3 py-2 bg-slate-50 text-slate-600 border-r border-slate-200">$</span>
                      <input
                        type="text"
                        value={extraMonthlyPayment === 0 ? "" : extraMonthlyPayment}
                        onChange={(e) => handleInputChange(setExtraMonthlyPayment, Number(e.target.value.replace(/,/g, "")) || 0)}
                        placeholder="0"
                        className="flex-1 px-3 py-2 focus:outline-none"
                      />
                    </div>
                  </div>
                  {extraMonthlyPayment > 0 && results.interestSaved > 0 && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-green-700">
                        Save <strong>{formatMoney(results.interestSaved)}</strong> in interest and pay off 
                        <strong> {results.timeSaved} months</strong> earlier!
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT: Results */}
              <div className="lg:col-span-2 space-y-4">
                {/* Main Result */}
                <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-6 text-white">
                  <p className="text-blue-100 text-sm mb-1">Monthly Payment</p>
                  <p className="text-4xl font-bold mb-4">{formatMoneyPrecise(results.monthlyPayment)}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-blue-100">Total Interest</p>
                      <p className="text-xl font-semibold">{formatMoney(results.totalInterest)}</p>
                    </div>
                    <div>
                      <p className="text-blue-100">Total Repayment</p>
                      <p className="text-xl font-semibold">{formatMoney(results.totalPayment)}</p>
                    </div>
                  </div>
                </div>

                {/* Forgiveness Alert */}
                {results.forgivenAmount > 0 && (
                  <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4">
                    <p className="font-semibold text-green-800 flex items-center gap-2">
                      🎉 {isPSLF ? "PSLF" : "IDR"} Forgiveness
                    </p>
                    <p className="text-2xl font-bold text-green-600 mt-1">{formatMoney(results.forgivenAmount)}</p>
                    <p className="text-sm text-green-700 mt-1">
                      {isPSLF ? "Tax-free after 10 years of public service" : "Forgiven after " + REPAYMENT_PLANS.find(p => p.id === repaymentPlan)?.years + " years (taxable as income)"}
                    </p>
                  </div>
                )}

                {/* Loan Summary */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-bold text-slate-900 mb-4">Loan Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Original Loan Amount</span>
                      <span className="font-medium">{formatMoney(loanAmount)}</span>
                    </div>
                    {(results.interestDuringSchool > 0 || results.interestDuringGrace > 0) && (
                      <>
                        <div className="flex justify-between text-amber-600">
                          <span>+ Interest During School ({inSchoolYears} yrs)</span>
                          <span className="font-medium">{formatMoney(results.interestDuringSchool)}</span>
                        </div>
                        <div className="flex justify-between text-amber-600">
                          <span>+ Interest During Grace ({gracePeriodMonths} mo)</span>
                          <span className="font-medium">{formatMoney(results.interestDuringGrace)}</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-slate-600">Balance at Repayment Start</span>
                      <span className="font-semibold">{formatMoney(results.balanceAtRepayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Interest Rate</span>
                      <span className="font-medium">{interestRate.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Repayment Plan</span>
                      <span className="font-medium">{REPAYMENT_PLANS.find(p => p.id === repaymentPlan)?.name}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-slate-600">Payoff Date</span>
                      <span className="font-semibold text-green-600">{results.payoffDate}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Breakdown */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-bold text-slate-900 mb-4">Total Cost Breakdown</h3>
                  <div className="relative h-8 rounded-full overflow-hidden bg-slate-100">
                    <div 
                      className="absolute left-0 top-0 h-full bg-blue-500"
                      style={{ width: `${(loanAmount / (results.totalPayment || 1)) * 100}%` }}
                    />
                    <div 
                      className="absolute top-0 h-full bg-amber-400"
                      style={{ 
                        left: `${(loanAmount / (results.totalPayment || 1)) * 100}%`,
                        width: `${((results.interestDuringSchool + results.interestDuringGrace) / (results.totalPayment || 1)) * 100}%` 
                      }}
                    />
                    <div 
                      className="absolute right-0 top-0 h-full bg-red-400"
                      style={{ 
                        width: `${((results.totalInterest - results.interestDuringSchool - results.interestDuringGrace) / (results.totalPayment || 1)) * 100}%` 
                      }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-4 mt-3 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>Principal: {formatMoney(loanAmount)}</span>
                    </div>
                    {(results.interestDuringSchool + results.interestDuringGrace) > 0 && (
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                        <span>Capitalized: {formatMoney(results.interestDuringSchool + results.interestDuringGrace)}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <span>Interest: {formatMoney(Math.max(0, results.totalInterest - results.interestDuringSchool - results.interestDuringGrace))}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className={`grid ${session?.user ? 'grid-cols-3' : 'grid-cols-2'} gap-3`}>
                  {session?.user && (
                    <button onClick={saveToHistory} disabled={saveStatus === 'saving'} className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700 text-sm">
                      💾 Save
                    </button>
                  )}
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700 text-sm">
                    📄 PDF <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">PRO</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700 text-sm">
                    📊 Excel <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">PRO</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8"><AdBlock slot="calculator-bottom" /></div>
          </div>
        </section>

        {/* Info Cards */}
        <section className="py-8 bg-white border-t border-slate-100">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Federal Rates */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">🏛️</span> Federal Loan Rates {academicYear}
                </h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 text-slate-600 font-medium">Loan Type</th>
                      <th className="text-right py-2 text-blue-600 font-medium">Interest Rate</th>
                      <th className="text-right py-2 text-slate-600 font-medium">Origination Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className={federalLoanType === "undergrad" ? "bg-blue-50" : ""}>
                      <td className="py-2 text-slate-700">Direct Subsidized/Unsubsidized (Undergrad)</td>
                      <td className="py-2 text-right font-semibold text-blue-600">{FEDERAL_RATES[academicYear].undergrad}%</td>
                      <td className="py-2 text-right">{FEDERAL_RATES[academicYear].originationDirect}%</td>
                    </tr>
                    <tr className={federalLoanType === "graduate" ? "bg-blue-50" : ""}>
                      <td className="py-2 text-slate-700">Direct Unsubsidized (Graduate)</td>
                      <td className="py-2 text-right font-semibold text-blue-600">{FEDERAL_RATES[academicYear].graduate}%</td>
                      <td className="py-2 text-right">{FEDERAL_RATES[academicYear].originationDirect}%</td>
                    </tr>
                    <tr className={federalLoanType === "plus" ? "bg-blue-50" : ""}>
                      <td className="py-2 text-slate-700">Direct PLUS (Parent/Graduate)</td>
                      <td className="py-2 text-right font-semibold text-blue-600">{FEDERAL_RATES[academicYear].plus}%</td>
                      <td className="py-2 text-right">{FEDERAL_RATES[academicYear].originationPLUS}%</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-slate-400 mt-3">*Rates are fixed for the life of the loan</p>
              </div>

              {/* Repayment Plans Comparison */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">📋</span> Repayment Plan Comparison
                </h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 text-slate-600 font-medium">Plan</th>
                      <th className="text-right py-2 text-slate-600 font-medium">Term</th>
                      <th className="text-right py-2 text-blue-600 font-medium">Forgiveness</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {REPAYMENT_PLANS.slice(0, 5).map((plan) => (
                      <tr key={plan.id} className={repaymentPlan === plan.id ? "bg-blue-50" : ""}>
                        <td className="py-2 text-slate-700">{plan.name}</td>
                        <td className="py-2 text-right">{plan.years} years</td>
                        <td className="py-2 text-right font-medium">
                          {plan.pctIncome > 0 ? <span className="text-green-600">Yes</span> : <span className="text-slate-400">No</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-slate-400 mt-3">*PSLF: 10-year forgiveness for public service employees</p>
              </div>
            </div>

            {/* Example Calculation */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-xl">📊</span> Example Calculation
              </h3>
              <p className="text-slate-600 mb-4">
                Let's calculate a <span className="font-semibold text-blue-600">{formatMoney(loanAmount)}</span> {loanType === "federal" ? "federal" : "private"} student loan 
                at <span className="font-semibold text-blue-600">{interestRate}%</span> with{" "}
                <span className="font-semibold text-blue-600">{inSchoolYears} years</span> in school:
              </p>

              <div className="bg-blue-50 rounded-xl p-5 mb-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600">Original Loan: <span className="font-mono font-medium text-slate-800">{formatMoney(loanAmount)}</span></p>
                    {!isSubsidized && (
                      <p className="text-sm text-slate-600">+ Interest During School: <span className="font-mono font-medium text-amber-600">+{formatMoney(results.interestDuringSchool)}</span></p>
                    )}
                    <p className="text-sm text-slate-600">Balance at Repayment: <span className="font-mono font-medium text-slate-800">{formatMoney(results.balanceAtRepayment)}</span></p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600">Monthly Payment: <span className="font-mono font-medium text-blue-600">{formatMoneyPrecise(results.monthlyPayment)}</span></p>
                    <p className="text-sm text-slate-600">Total Interest: <span className="font-mono font-medium text-red-600">{formatMoney(results.totalInterest)}</span></p>
                    <p className="text-sm font-semibold text-slate-800">Total Cost: <span className="font-mono">{formatMoney(results.totalPayment)}</span></p>
                  </div>
                </div>
              </div>

              <p className="text-slate-600">
                {isSubsidized && loanType === "federal" ? (
                  <span>With a <strong>subsidized</strong> loan, the government pays interest while you're in school, so your balance stays at {formatMoney(loanAmount)}. </span>
                ) : (
                  <span>With an <strong>unsubsidized</strong> loan, {formatMoney(results.interestDuringSchool)} of interest accrues during school and gets added to your balance. </span>
                )}
                Your loan will be paid off by <span className="font-semibold text-green-600">{results.payoffDate}</span>.
                {results.forgivenAmount > 0 && (
                  <span> Under {isPSLF ? "PSLF" : "your IDR plan"}, <span className="font-semibold text-green-600">{formatMoney(results.forgivenAmount)}</span> will be forgiven!</span>
                )}
              </p>
            </div>

            {/* Tips */}
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-5">
                <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                  <span>💡</span> Tip: Pay While in School
                </h4>
                <p className="text-sm text-green-700">Making interest-only payments while in school prevents capitalization and can save you thousands over the life of your loan.</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 p-5">
                <h4 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                  <span>🎯</span> PSLF Strategy
                </h4>
                <p className="text-sm text-purple-700">If pursuing PSLF, enroll in the lowest-paying IDR plan (SAVE) to maximize forgiveness while minimizing payments.</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-5">
                <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
                  <span>⚠️</span> Refinancing Warning
                </h4>
                <p className="text-sm text-amber-800">Refinancing federal loans into private loans forfeits all federal benefits including IDR plans and forgiveness programs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Educational Content */}
        <section className="py-12 bg-slate-50">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* FAQ */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">❓ Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqs.map((faq, i) => (
                      <details key={i} className="group">
                        <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-slate-50 rounded-xl hover:bg-slate-100">
                          <span className="font-semibold text-slate-900">{faq.question}</span>
                          <svg className="w-5 h-5 text-slate-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </summary>
                        <p className="text-slate-600 p-4 pt-2">{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <AdBlock slot="calculator-sidebar" />
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">💰</span>Related Calculators</h3>
                  <div className="space-y-2">{financeCalcs.map((c) => <Link key={c} href={`/${locale}/${c.toLowerCase().replace(/ /g, "-")}-calculator`} className="block text-blue-600 hover:text-blue-800 hover:underline text-sm">{c} Calculator</Link>)}</div>
                </div>
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-3">📚 Resources</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="https://studentaid.gov" target="_blank" rel="noopener" className="text-blue-600 hover:underline">StudentAid.gov - Official Federal Aid</a></li>
                    <li><a href="https://studentaid.gov/loan-simulator/" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Federal Loan Simulator</a></li>
                    <li><a href="https://studentaid.gov/pslf/" target="_blank" rel="noopener" className="text-blue-600 hover:underline">PSLF Program Information</a></li>
                  </ul>
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
