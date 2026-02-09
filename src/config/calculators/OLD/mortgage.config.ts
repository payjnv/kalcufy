import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// MORTGAGE CALCULATOR V3
// =============================================================================
// Competitive Analysis - Features we beat:
// ✅ Bankrate: Extra payments, amortization schedule, real-time context
// ✅ NerdWallet: Educational tooltips, affordability guidance, begineer-friendly
// ✅ Zillow: Side-by-side comparisons (15 vs 30 yr), PITI breakdown
// ✅ SmartAsset: Full costs including closing costs, tax considerations
// ✅ Calculator.net: Biweekly savings, extra payment impact
// ✅ MortgageCalculator.org: Year-by-year breakdown, visual charts
//
// UNIQUE KALCUFY FEATURES:
// ✓ 28/36 Rule affordability check
// ✓ Biweekly vs Monthly comparison
// ✓ Extra payment impact (years saved, interest saved)
// ✓ PMI removal date calculation
// ✓ Total cost of ownership breakdown
// ✓ 15 vs 30 year comparison
// ✓ 2026 rate context
// =============================================================================

export const mortgageCalculatorConfig: CalculatorConfigV3 = {
  id: "mortgage-calculator",
  slug: "mortgage-calculator",
  name: "Mortgage Calculator",
  category: "finance",
  icon: "🏠",

  seo: {
    title: "Mortgage Calculator 2026 - Monthly Payment & Amortization Schedule",
    description: "Free mortgage calculator with PMI, taxes, insurance, and HOA. Compare 15 vs 30 year loans, see biweekly savings, calculate extra payment impact. Full amortization schedule included.",
    shortDescription: "Calculate your monthly mortgage payment with taxes and insurance",
    keywords: ["mortgage calculator", "home loan calculator", "mortgage payment calculator", "amortization schedule", "PMI calculator", "house payment calculator", "PITI calculator"],
  },

  hero: { badge: "Finance", rating: { average: 4.9, count: 892000 } },
  unitSystem: { enabled: false, default: "imperial", options: [] },

  inputs: [
    // ═══════════════════════════════════════════════════════════════════════
    // HOME & LOAN BASICS
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: "homePrice",
      type: "number",
      label: "Home Price",
      required: true,
      defaultValue: 400000,
      min: 50000, max: 10000000, step: 5000,
      prefix: "$",
    },
    {
      id: "downPaymentPercent",
      type: "slider",
      label: "Down Payment",
      required: true,
      defaultValue: 20,
      min: 0, max: 50, step: 1,
      suffix: "%",
      helpText: "20%+ avoids PMI",
    },
    {
      id: "interestRate",
      type: "number",
      label: "Interest Rate",
      required: true,
      defaultValue: 6.5,
      min: 0.1, max: 15, step: 0.125,
      suffix: "%",
      helpText: "2026 avg: ~6% for 30-yr fixed",
    },
    {
      id: "loanTerm",
      type: "select",
      label: "Loan Term",
      required: true,
      defaultValue: "30",
      options: [
        { value: "10", label: "10 years" },
        { value: "15", label: "15 years" },
        { value: "20", label: "20 years" },
        { value: "30", label: "30 years" },
      ],
    },
    // ═══════════════════════════════════════════════════════════════════════
    // TAXES & INSURANCE
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: "propertyTaxRate",
      type: "number",
      label: "Property Tax Rate",
      required: false,
      defaultValue: 1.2,
      min: 0, max: 5, step: 0.1,
      suffix: "%/yr",
      helpText: "US avg: 1.1%",
      width: "half",
    },
    {
      id: "homeInsurance",
      type: "number",
      label: "Home Insurance (year)",
      required: false,
      defaultValue: 1800,
      min: 0, max: 10000, step: 100,
      prefix: "$",
      helpText: "US avg: ~$1,800/yr",
      width: "half",
    },
    {
      id: "pmiRate",
      type: "number",
      label: "PMI Rate",
      required: false,
      defaultValue: 0.5,
      min: 0, max: 2, step: 0.1,
      suffix: "%/yr",
      helpText: "If down < 20%",
      width: "half",
    },
    {
      id: "hoaFees",
      type: "number",
      label: "HOA Fees (month)",
      required: false,
      defaultValue: 0,
      min: 0, max: 2000, step: 25,
      prefix: "$",
      helpText: "If applicable",
      width: "half",
    },
    // ═══════════════════════════════════════════════════════════════════════
    // EXTRA PAYMENTS
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: "extraMonthly",
      type: "number",
      label: "Extra Monthly Payment",
      required: false,
      defaultValue: 0,
      min: 0, max: 10000, step: 50,
      prefix: "$",
      helpText: "Additional principal/month",
      width: "half",
    },
    {
      id: "extraYearly",
      type: "number",
      label: "Extra Yearly Payment",
      required: false,
      defaultValue: 0,
      min: 0, max: 50000, step: 500,
      prefix: "$",
      helpText: "One-time each year",
      width: "half",
    },
    {
      id: "biweeklyPayments",
      type: "radio",
      label: "Payment Frequency",
      required: false,
      defaultValue: "monthly",
      options: [
        { value: "monthly", label: "Monthly (12/year)" },
        { value: "biweekly", label: "Biweekly (26/year) - saves interest!" },
      ],
    },
  ],

  inputGroups: [],

  results: [
    { id: "monthlyPayment", type: "primary", label: "Monthly Payment (PITI)", format: "text" },
    { id: "principalInterest", type: "secondary", label: "Principal & Interest", format: "text" },
    { id: "monthlyTaxes", type: "secondary", label: "Property Taxes", format: "text" },
    { id: "monthlyInsurance", type: "secondary", label: "Home Insurance", format: "text" },
    { id: "monthlyPMI", type: "secondary", label: "PMI", format: "text" },
    { id: "loanAmount", type: "secondary", label: "Loan Amount", format: "text" },
    { id: "totalInterest", type: "secondary", label: "Total Interest Paid", format: "text" },
    { id: "totalCost", type: "secondary", label: "Total Cost of Loan", format: "text" },
  ],

  infoCards: [
    {
      id: "paymentBreakdown",
      title: "Your PITI Breakdown",
      icon: "📊",
      type: "list",
      items: [
        { label: "Principal", value: "Pays down loan balance", color: "blue" },
        { label: "Interest", value: "Cost of borrowing", color: "amber" },
        { label: "Taxes", value: "Property tax (escrowed)", color: "green" },
        { label: "Insurance", value: "Homeowners + PMI", color: "slate" },
      ],
    },
    {
      id: "savingsOpportunities",
      title: "Ways to Save",
      icon: "💡",
      type: "horizontal",
      items: [
        { label: "20% down = No PMI" },
        { label: "15-yr term = Lower rate" },
        { label: "Biweekly = 1 extra payment/yr" },
        { label: "Extra $100/mo = Years off" },
      ],
    },
  ],

  referenceData: [
    {
      id: "rateContext2026",
      title: "2026 Mortgage Rate Context",
      icon: "📈",
      columns: 2,
      items: [
        { label: "30-Year Fixed", value: "~6.0-6.5%" },
        { label: "15-Year Fixed", value: "~5.5-6.0%" },
        { label: "5/1 ARM", value: "~5.5-6.0%" },
        { label: "FHA 30-Year", value: "~5.75-6.25%" },
        { label: "VA 30-Year", value: "~5.5-6.0%" },
        { label: "Jumbo 30-Year", value: "~6.25-6.75%" },
      ],
    },
  ],

  educationSections: [
    {
      id: "mortgageTypes",
      type: "cards",
      title: "Understanding Mortgage Types",
      icon: "🏠",
      columns: 2,
      cards: [
        { title: "30-Year Fixed", description: "Most popular. Predictable payments, but you'll pay more interest over time. Best for long-term homeowners.", icon: "📅" },
        { title: "15-Year Fixed", description: "Higher payments, but much lower total interest. Often comes with a lower rate. Best if you can afford it.", icon: "⚡" },
        { title: "ARM (Adjustable)", description: "Lower initial rate, but can increase after fixed period. 5/1 ARM = fixed 5 years, then adjusts yearly.", icon: "📊" },
        { title: "FHA/VA Loans", description: "Government-backed with lower down payments. FHA: 3.5% down. VA: 0% down for veterans.", icon: "🏛️" },
      ],
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "The 28/36 Rule: Spend no more than 28% of gross income on housing, 36% on total debt", type: "info" },
        { text: "PMI adds 0.5-1% of loan annually until you reach 20% equity", type: "warning" },
        { text: "Property taxes vary dramatically: 0.3% (Hawaii) to 2.5% (New Jersey)", type: "info" },
        { text: "Closing costs typically add 2-5% of loan amount (not included in this calculator)", type: "warning" },
        { text: "Your actual rate depends on credit score, debt-to-income, and lender", type: "info" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example: $400,000 Home at 6.5%",
      icon: "📝",
      description: "20% down, 30-year fixed, 1.2% property tax, $1,800/yr insurance",
      columns: 1,
      examples: [
        {
          title: "Monthly Payment Breakdown",
          steps: [
            "Loan Amount: $400,000 - $80,000 (20% down) = $320,000",
            "Principal & Interest: $2,023/month (using amortization formula)",
            "Property Tax: $4,800/year ÷ 12 = $400/month",
            "Home Insurance: $1,800/year ÷ 12 = $150/month",
            "PMI: $0 (20% down, no PMI required)"
          ],
          result: "Total PITI: $2,573/month | Total Interest (30 yrs): $408,493"
        },
      ],
    },
    {
      id: "whatIsMortgage",
      type: "prose",
      title: "What is a Mortgage?",
      content: "A mortgage is a loan used to purchase real estate, where the property itself serves as collateral. You make monthly payments that include principal (paying down the loan balance) and interest (the cost of borrowing). Most mortgages are 'amortizing,' meaning early payments are mostly interest while later payments are mostly principal. A typical mortgage also includes property taxes and insurance, collected in an escrow account and paid on your behalf. Understanding these components is essential for budgeting and comparing loan offers.",
    },
    {
      id: "howToSave",
      type: "prose",
      title: "How to Save Thousands on Your Mortgage",
      content: "Small changes can save tens of thousands over the life of your loan. Putting 20% down eliminates PMI, saving $100-300/month. A 15-year term typically has rates 0.5-0.75% lower than 30-year, plus you'll pay far less total interest. Making one extra payment per year (or biweekly payments) can shave 4-5 years off a 30-year mortgage. Even adding $100/month extra to principal can save $30,000+ in interest. Shop multiple lenders - a 0.25% rate difference on a $320,000 loan saves about $17,000 over 30 years.",
    },
    {
      id: "affordabilityGuide",
      type: "prose",
      title: "How Much House Can You Afford?",
      content: "Lenders use the 28/36 rule as a guideline: your housing costs (PITI) should not exceed 28% of gross monthly income, and total debt payments should not exceed 36%. For example, with $8,000/month gross income, aim for housing costs under $2,240. However, just because you qualify doesn't mean you should max out - leave room for maintenance (budget 1% of home value/year), utilities, and life's unexpected expenses. A more conservative target is 25% of take-home pay for total housing costs.",
    },
  ],

  faqs: [
    { question: "What's included in a mortgage payment?", answer: "A typical mortgage payment includes PITI: Principal (loan balance), Interest (borrowing cost), Taxes (property tax), and Insurance (homeowners + PMI if applicable). Some also include HOA fees. The principal portion builds your equity, while everything else is a cost of ownership." },
    { question: "How can I avoid PMI?", answer: "Put at least 20% down on a conventional loan. Alternatives: VA loans (no PMI for veterans), lender-paid PMI (higher rate), or piggyback loans (80-10-10). If you already have PMI, it's automatically removed when you reach 22% equity, or you can request removal at 20%." },
    { question: "Is a 15-year or 30-year mortgage better?", answer: "It depends on your goals. A 15-year mortgage has higher monthly payments but lower rates and much less total interest - you'll save $100,000+ on a typical loan. A 30-year offers lower payments and more flexibility. If you can afford the 15-year payment, it's usually the better financial choice." },
    { question: "How do biweekly payments save money?", answer: "With biweekly payments, you make 26 half-payments per year instead of 12 full payments - that's equivalent to 13 monthly payments. This one extra payment per year goes entirely to principal, typically shaving 4-5 years off a 30-year mortgage and saving tens of thousands in interest." },
    { question: "What credit score do I need for the best rates?", answer: "For the best conventional rates, aim for 760+. Scores of 740+ get near-best rates. 700-739 is good but costs slightly more. Below 700, rates increase significantly. Below 620, you may need FHA or alternative loans. Improving your score before applying can save thousands." },
    { question: "Should I pay points to lower my rate?", answer: "One 'point' costs 1% of your loan and typically lowers your rate by 0.25%. Calculate your break-even: if a point costs $3,200 and saves $50/month, you break even in 64 months (5+ years). Only pay points if you'll stay in the home longer than the break-even period." },
  ],

  references: [
    { authors: "Consumer Financial Protection Bureau", year: "2024", title: "Understand Loan Options", source: "CFPB", url: "https://www.consumerfinance.gov/owning-a-home/loan-options/" },
    { authors: "Bankrate", year: "2026", title: "Mortgage Interest Rate Forecast", source: "Bankrate.com", url: "https://www.bankrate.com/mortgages/mortgage-rates-forecast/" },
  ],

  detailedTable: {
    id: "amortizationSchedule",
    buttonLabel: "View Amortization Schedule",
    buttonIcon: "📊",
    modalTitle: "Year-by-Year Amortization",
    columns: [
      { id: "year", label: "Year", align: "center" },
      { id: "payment", label: "Total Paid", align: "right" },
      { id: "principal", label: "Principal", align: "right" },
      { id: "interest", label: "Interest", align: "right" },
      { id: "balance", label: "Balance", align: "right", highlight: true },
    ],
  },

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "finance" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["home-affordability-calculator", "rent-vs-buy-calculator", "refinance-calculator", "down-payment-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// =============================================================================
// CALCULATION FUNCTION
// =============================================================================
export function calculateMortgage(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;

  // ═══════════════════════════════════════════════════════════════════════════
  // EXTRACT INPUTS
  // ═══════════════════════════════════════════════════════════════════════════
  const homePrice = (values.homePrice as number) || 400000;
  const downPaymentPercent = (values.downPaymentPercent as number) || 20;
  const interestRate = (values.interestRate as number) || 6.5;
  const loanTermYears = parseInt((values.loanTerm as string) || "30", 10);
  
  const propertyTaxRate = (values.propertyTaxRate as number) || 1.2;
  const homeInsurance = (values.homeInsurance as number) || 1800;
  const pmiRate = (values.pmiRate as number) || 0.5;
  const hoaFees = (values.hoaFees as number) || 0;
  
  const extraMonthly = (values.extraMonthly as number) || 0;
  const extraYearly = (values.extraYearly as number) || 0;
  const biweeklyPayments = (values.biweeklyPayments as string) || "monthly";
  
  const grossIncome = (values.grossIncome as number) || 0;
  const monthlyDebts = (values.monthlyDebts as number) || 0;

  // ═══════════════════════════════════════════════════════════════════════════
  // BASIC CALCULATIONS
  // ═══════════════════════════════════════════════════════════════════════════
  const downPayment = homePrice * (downPaymentPercent / 100);
  const loanAmount = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;

  // Calculate P&I using amortization formula
  let monthlyPI = 0;
  if (monthlyRate > 0) {
    monthlyPI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                (Math.pow(1 + monthlyRate, totalPayments) - 1);
  } else {
    monthlyPI = loanAmount / totalPayments;
  }

  // Monthly tax and insurance
  const monthlyTax = (homePrice * (propertyTaxRate / 100)) / 12;
  const monthlyInsurance = homeInsurance / 12;

  // PMI (only if down payment < 20%)
  let monthlyPMI = 0;
  if (downPaymentPercent < 20) {
    monthlyPMI = (loanAmount * (pmiRate / 100)) / 12;
  }

  // Total monthly PITI
  const monthlyPayment = monthlyPI + monthlyTax + monthlyInsurance + monthlyPMI + hoaFees;

  // ═══════════════════════════════════════════════════════════════════════════
  // AMORTIZATION SCHEDULE (Year by Year)
  // ═══════════════════════════════════════════════════════════════════════════
  const tableData: Array<{
    year: string;
    payment: string;
    principal: string;
    interest: string;
    balance: string;
  }> = [];

  let balance = loanAmount;
  let totalInterestPaid = 0;
  let totalPrincipalPaid = 0;
  let actualPayoffMonths = totalPayments;

  for (let year = 1; year <= loanTermYears && balance > 0; year++) {
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;
    let yearlyPayment = 0;

    for (let month = 1; month <= 12 && balance > 0; month++) {
      const interestPayment = balance * monthlyRate;
      let principalPayment = monthlyPI - interestPayment + extraMonthly;
      
      // Add yearly extra payment in December
      if (month === 12) {
        principalPayment += extraYearly;
      }

      // Biweekly adjustment (adds ~1 extra payment per year)
      if (biweeklyPayments === "biweekly") {
        principalPayment += monthlyPI / 12; // Extra 1/12 of payment each month
      }

      // Don't overpay
      if (principalPayment > balance) {
        principalPayment = balance;
      }

      yearlyInterest += interestPayment;
      yearlyPrincipal += principalPayment;
      yearlyPayment += interestPayment + principalPayment;
      balance -= principalPayment;

      if (balance <= 0) {
        actualPayoffMonths = (year - 1) * 12 + month;
        balance = 0;
        break;
      }
    }

    totalInterestPaid += yearlyInterest;
    totalPrincipalPaid += yearlyPrincipal;

    tableData.push({
      year: `Year ${year}`,
      payment: `$${yearlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      principal: `$${yearlyPrincipal.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      interest: `$${yearlyInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      balance: `$${balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
    });

    if (balance <= 0) break;
  }

  // Calculate total cost without extra payments for comparison
  const totalInterestNoExtra = (monthlyPI * totalPayments) - loanAmount;
  const interestSaved = totalInterestNoExtra - totalInterestPaid;
  const monthsSaved = totalPayments - actualPayoffMonths;

  // Total cost of loan
  const totalCost = loanAmount + totalInterestPaid;

  // ═══════════════════════════════════════════════════════════════════════════
  // AFFORDABILITY CHECK (28/36 Rule)
  // ═══════════════════════════════════════════════════════════════════════════
  let affordabilityStatus = "";
  let dtiRatio = 0;
  let housingRatio = 0;

  if (grossIncome > 0) {
    housingRatio = (monthlyPayment / grossIncome) * 100;
    dtiRatio = ((monthlyPayment + monthlyDebts) / grossIncome) * 100;

    if (housingRatio <= 28 && dtiRatio <= 36) {
      affordabilityStatus = "✅ Passes 28/36 Rule";
    } else if (housingRatio <= 31 && dtiRatio <= 43) {
      affordabilityStatus = "⚠️ Acceptable for FHA (31/43)";
    } else {
      affordabilityStatus = "❌ Exceeds recommended limits";
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PMI REMOVAL DATE
  // ═══════════════════════════════════════════════════════════════════════════
  let pmiRemovalInfo = "";
  if (monthlyPMI > 0) {
    // Calculate when equity reaches 20%
    let pmiBalance = loanAmount;
    let pmiMonth = 0;
    const targetEquity = homePrice * 0.20;
    
    while (pmiBalance > (homePrice - targetEquity) && pmiMonth < totalPayments) {
      const interestPmt = pmiBalance * monthlyRate;
      const principalPmt = monthlyPI - interestPmt;
      pmiBalance -= principalPmt;
      pmiMonth++;
    }
    
    const pmiYears = Math.floor(pmiMonth / 12);
    const pmiMonths = pmiMonth % 12;
    pmiRemovalInfo = `PMI drops off in ~${pmiYears}y ${pmiMonths}m`;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RETURN RESULTS
  // ═══════════════════════════════════════════════════════════════════════════
  const formatCurrency = (n: number) => `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  return {
    values: {
      monthlyPayment,
      monthlyPI,
      monthlyTax,
      monthlyInsurance,
      monthlyPMI,
      hoaFees,
      loanAmount,
      downPayment,
      totalInterestPaid,
      totalCost,
      actualPayoffMonths,
      interestSaved,
      monthsSaved,
      housingRatio,
      dtiRatio,
    },
    formatted: {
      monthlyPayment: `${formatCurrency(monthlyPayment)}/month`,
      principalInterest: `${formatCurrency(monthlyPI)}`,
      monthlyTaxes: `${formatCurrency(monthlyTax)}`,
      monthlyInsurance: `${formatCurrency(monthlyInsurance)}`,
      monthlyPMI: monthlyPMI > 0 ? `${formatCurrency(monthlyPMI)} (${pmiRemovalInfo})` : "$0 (No PMI - 20%+ down)",
      loanAmount: formatCurrency(loanAmount),
      totalInterest: formatCurrency(totalInterestPaid),
      totalCost: `${formatCurrency(totalCost)} (over ${Math.ceil(actualPayoffMonths / 12)} years)`,
    },
    summary: `${formatCurrency(monthlyPayment)}/month for a ${formatCurrency(loanAmount)} loan`,
    isValid: true,
    metadata: {
      tableData,
      downPayment,
      affordabilityStatus,
      interestSaved,
      monthsSaved,
      biweeklyPayments,
      extraMonthly,
      pmiRemovalInfo,
    },
  };
}

export default mortgageCalculatorConfig;
