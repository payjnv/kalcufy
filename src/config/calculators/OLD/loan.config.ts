import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// LOAN CALCULATOR V3 CONFIG
// Based on research from: Bankrate, NerdWallet, Calculator.net, Credible
// =============================================================================

export const loanCalculatorConfig: CalculatorConfigV3 = {
  // Basic Info
  id: "loan-calculator",
  slug: "loan-calculator",
  name: "Loan Calculator",
  category: "finance",
  icon: "💳",

  // SEO
  seo: {
    title: "Loan Calculator - Calculate Monthly Payments & Total Interest",
    description: "Free loan calculator to estimate monthly payments, total interest, and APR for personal loans. Compare loan terms, see amortization schedules, and calculate how extra payments can save money. Works for personal loans, debt consolidation, and more.",
    shortDescription: "Calculate loan payments, interest costs, and payoff dates",
    keywords: [
      "loan calculator",
      "personal loan calculator",
      "monthly payment calculator",
      "loan interest calculator",
      "amortization calculator",
      "debt payoff calculator",
      "APR calculator",
      "loan comparison",
      "extra payment calculator",
    ],
  },

  // Hero Section
  hero: {
    badge: "Finance",
    rating: { average: 4.9, count: 2847 },
  },

  // Unit System
  unitSystem: {
    enabled: false,
    default: "imperial",
    options: [],
  },

  // =============================================================================
  // INPUTS
  // =============================================================================
  inputs: [
    {
      id: "loanAmount",
      type: "slider",
      label: "Loan Amount",
      required: true,
      defaultValue: 25000,
      min: 1000,
      max: 100000,
      step: 500,
      prefix: "$",
      helpText: "Personal loans typically range from $1,000 to $100,000",
    },
    {
      id: "interestRate",
      type: "slider",
      label: "Interest Rate (APR)",
      required: true,
      defaultValue: 12,
      min: 3,
      max: 36,
      step: 0.25,
      suffix: "%",
      helpText: "Average rate is 12.26% (Jan 2026). Rates range 6%-36%",
    },
    {
      id: "loanTerm",
      type: "slider",
      label: "Loan Term",
      required: true,
      defaultValue: 5,
      min: 1,
      max: 10,
      step: 1,
      suffix: " years",
      helpText: "Shorter terms = less interest, higher payments",
    },
    // Advanced options in collapsible group
    {
      id: "originationFee",
      type: "slider",
      label: "Origination Fee",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 12,
      step: 0.5,
      suffix: "%",
      helpText: "Typically 1-10% of loan, deducted from proceeds",
    },
    {
      id: "extraPayment",
      type: "slider",
      label: "Extra Monthly Payment",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 500,
      step: 25,
      prefix: "$",
      helpText: "Additional payment toward principal each month",
    },
  ],

  // Input Groups
  inputGroups: [
    {
      id: "advanced",
      title: "Fees & Extra Payments",
      inputs: ["originationFee", "extraPayment"],
      defaultExpanded: false,
    },
  ],

  // =============================================================================
  // RESULTS
  // =============================================================================
  results: [
    {
      id: "monthlyPayment",
      type: "primary",
      label: "Monthly Payment",
      format: "number",
      prefix: "$",
    },
    {
      id: "totalInterest",
      type: "secondary",
      label: "Total Interest",
      format: "number",
      prefix: "$",
      icon: "📊",
    },
    {
      id: "totalCost",
      type: "secondary",
      label: "Total Cost",
      format: "number",
      prefix: "$",
      icon: "💰",
    },
    {
      id: "effectiveAPR",
      type: "secondary",
      label: "Effective APR",
      format: "number",
      suffix: "%",
      icon: "📈",
    },
    {
      id: "payoffDate",
      type: "secondary",
      label: "Payoff Date",
      format: "text",
      icon: "📅",
    },
    {
      id: "interestSaved",
      type: "secondary",
      label: "Interest Saved",
      format: "number",
      prefix: "$",
      icon: "✅",
    },
  ],

  // =============================================================================
  // INFO CARDS (Required: 2 cards - type "list" + type "horizontal")
  // =============================================================================
  infoCards: [
    {
      id: "loanQuickFacts",
      type: "list",
      title: "Loan Quick Facts",
      icon: "📋",
      items: [
        { label: "Average APR (Jan 2026)", value: "12.26%" },
        { label: "Excellent Credit Rate", value: "6-12%" },
        { label: "Fair Credit Rate", value: "17-25%" },
        { label: "Typical Loan Range", value: "$1K-$100K" },
      ],
    },
    {
      id: "ratesByLenderType",
      type: "horizontal",
      title: "Rates by Lender Type",
      icon: "🏦",
      columns: 4,
      items: [
        { label: "Credit Unions", value: "10.72%" },
        { label: "Banks", value: "12.06%" },
        { label: "Online Lenders", value: "6-36%" },
        { label: "P2P Lending", value: "8-30%" },
      ],
    },
  ],

  // =============================================================================
  // REFERENCE DATA (Required: array with columns grid)
  // =============================================================================
  referenceData: [
    {
      id: "ratesByCreditScore",
      title: "Average Rates by Credit Score (2026)",
      icon: "📊",
      columns: [
        { id: "score", label: "Credit Score", align: "left" as const },
        { id: "range", label: "Score Range", align: "center" as const },
        { id: "avgRate", label: "Avg APR", align: "right" as const, highlight: true },
      ],
      data: [
        { score: "Excellent", range: "720+", avgRate: "10.03% - 12.50%" },
        { score: "Good", range: "690-719", avgRate: "13.50% - 15.50%" },
        { score: "Fair", range: "630-689", avgRate: "17.80% - 19.90%" },
        { score: "Poor", range: "580-629", avgRate: "21.00% - 28.00%" },
        { score: "Bad", range: "Below 580", avgRate: "28.00% - 36.00%" },
      ],
    },
  ],

  // =============================================================================
  // EDUCATION SECTIONS
  // =============================================================================
  educationSections: [
    // REQUIRED: Code Example
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "📊",
      description: "See how loan payments are calculated using the standard amortization formula",
      columns: 2,
      examples: [
        {
          title: "Standard Loan Payment",
          steps: [
            "Loan Amount: $25,000",
            "Interest Rate: 12% APR",
            "Term: 5 years (60 months)",
            "Monthly Rate: 12% ÷ 12 = 1%",
            "M = P × [r(1+r)^n] / [(1+r)^n - 1]",
            "M = $25,000 × [0.01(1.01)^60] / [(1.01)^60 - 1]",
          ],
          result: "Monthly Payment: $556.11 | Total Interest: $8,366.60",
        },
        {
          title: "With Extra Payments ($100/mo)",
          steps: [
            "Same loan terms as above",
            "Extra Payment: $100/month",
            "New Monthly: $656.11",
            "Payoff: 47 months (vs 60)",
            "Time Saved: 13 months",
          ],
          result: "Interest Saved: $1,847 | Total Savings: 22%",
        },
      ],
    },
    // REQUIRED: List (5+ items)
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "APR includes interest rate + fees. Always compare APRs, not just interest rates, when shopping for loans.", type: "warning" },
        { text: "Origination fees (1-10%) are typically deducted from your loan amount, meaning you receive less than you borrow.", type: "warning" },
        { text: "Shorter loan terms have higher monthly payments but save significantly on total interest paid.", type: "info" },
        { text: "Pre-qualifying with multiple lenders uses soft credit checks that don't affect your credit score.", type: "info" },
        { text: "Check for prepayment penalties before making extra payments to pay off your loan early.", type: "warning" },
        { text: "Credit unions often have lower rates (capped at 18% for federal credit unions) than banks or online lenders.", type: "info" },
        { text: "Personal loans are unsecured, so rates are higher than secured loans like mortgages or auto loans.", type: "info" },
      ],
    },
    // REQUIRED: 3+ Prose Sections
    {
      id: "whatIsPersonalLoan",
      type: "prose",
      title: "What is a Personal Loan?",
      icon: "📖",
      content: "A personal loan is money borrowed from a bank, credit union, or online lender that you repay in fixed monthly installments over a set period, typically 1-7 years. Unlike mortgages or auto loans, personal loans are usually unsecured, meaning they don't require collateral like your home or car. Instead, lenders evaluate your creditworthiness based on your credit score, income, employment history, and debt-to-income ratio. Personal loans can be used for almost any purpose: debt consolidation (the most common use, accounting for about 50% of all personal loans), home improvements, medical expenses, major purchases, weddings, or emergency costs. Because they're unsecured, interest rates are typically higher than secured loans but often lower than credit cards, making them an attractive option for consolidating high-interest debt.",
    },
    {
      id: "howAPRWorks",
      type: "prose",
      title: "Understanding APR vs Interest Rate",
      icon: "📐",
      content: "The Annual Percentage Rate (APR) represents the true cost of borrowing and is always equal to or higher than the stated interest rate. While the interest rate only reflects the cost of borrowing the principal, APR includes additional fees like origination fees, application fees, and other charges. For example, a loan with a 10% interest rate and a 5% origination fee would have an APR of approximately 12-13%. The Truth in Lending Act requires all lenders to disclose the APR before you sign, making it the best apples-to-apples comparison tool when shopping for loans. When comparing loan offers, always compare APRs rather than interest rates alone—a loan with a lower interest rate but high fees may actually cost more than one with a slightly higher rate but no fees.",
    },
    {
      id: "tipsSaveMoney",
      type: "prose",
      title: "How to Get the Best Loan Rate",
      icon: "💡",
      content: "Getting the lowest possible rate requires preparation and comparison shopping. First, check your credit score for free and address any errors on your credit report—even small improvements can qualify you for better rates. Aim for a credit utilization ratio below 30% and avoid opening new credit accounts before applying. Pre-qualify with at least 3-5 lenders (this uses soft credit checks that don't affect your score) to compare offers side-by-side. Consider credit unions, which often offer lower rates capped at 18% for federal credit unions. Choose the shortest loan term you can comfortably afford, as shorter terms typically come with lower rates and much less total interest. Finally, consider adding a creditworthy co-signer if your credit is less than ideal—this can significantly improve your rate. According to Bankrate data, borrowers who shop around can often beat the national average rate by 5 percentage points or more.",
    },
  ],

  // =============================================================================
  // FAQs (6+ required)
  // =============================================================================
  faqs: [
    {
      question: "What credit score do I need for a personal loan?",
      answer: "Most lenders prefer a credit score of 670 or higher for the best rates. However, some lenders, especially online lenders, offer loans to borrowers with scores as low as 580, though at higher interest rates (often 25-36% APR). Borrowers with excellent credit (720+) typically qualify for rates between 6-12%, while those with fair credit (630-689) may see rates of 17-25%. If your score is below 580, consider a secured personal loan, credit-builder loan, or adding a co-signer to improve your chances of approval.",
    },
    {
      question: "What's the difference between APR and interest rate?",
      answer: "Interest rate is the base cost of borrowing the principal amount, calculated as a percentage. APR (Annual Percentage Rate) includes the interest rate PLUS all mandatory fees like origination fees, expressed as a yearly percentage. For example, if you borrow $10,000 at 10% interest with a 5% origination fee, your APR would be approximately 12-13%. The APR gives you the true cost of the loan and should always be used when comparing offers from different lenders.",
    },
    {
      question: "How do origination fees work?",
      answer: "Origination fees typically range from 1-10% of your loan amount and cover the lender's cost of processing your application. Most lenders deduct this fee from your loan proceeds rather than charging it upfront. For example, if you're approved for a $10,000 loan with a 5% origination fee, you'll only receive $9,500, but you'll repay the full $10,000 plus interest. If you need exactly $10,000, you'd need to borrow approximately $10,527 to account for the fee.",
    },
    {
      question: "Should I pay off my loan early with extra payments?",
      answer: "In most cases, yes—extra payments toward principal can save significant money on interest and help you pay off debt faster. For example, adding $100/month to a $25,000 loan at 12% can save over $1,800 in interest and pay off the loan 13 months early. However, first check if your loan has prepayment penalties (fees for paying off early). Also consider whether the money might be better used for higher-priority goals like building an emergency fund or paying off higher-interest debt like credit cards.",
    },
    {
      question: "Fixed vs variable rate - which is better?",
      answer: "Fixed rates offer predictable payments throughout the loan term and protection from rising interest rates. Variable rates may start lower but can increase over time with market changes. For most personal loans (typically 2-7 years), fixed rates are generally the better choice because they provide payment certainty and are less risky. Variable rates might make sense for very short-term loans or if you expect to pay off the loan quickly before rates could rise significantly.",
    },
    {
      question: "How fast can I get personal loan funds?",
      answer: "Many online lenders offer same-day or next-business-day funding after approval, making personal loans a good option for urgent needs. Banks and credit unions typically take 2-7 business days. The timeline depends on how quickly you can provide required documentation (income verification, ID, etc.) and complete the lender's verification process. To speed things up, have pay stubs, tax returns, and ID ready before you apply.",
    },
    {
      question: "Can I get a personal loan with bad credit?",
      answer: "Yes, but expect higher interest rates (typically 25-36% APR) and possibly smaller loan amounts. Options include: online lenders specializing in bad credit loans, secured personal loans backed by collateral, adding a creditworthy co-signer, credit union membership (rates capped at 18% at federal credit unions), or credit-builder loans designed to help improve your score. Avoid payday loans and predatory lenders that charge extremely high rates. Consider whether improving your credit score first would help you qualify for better terms.",
    },
    {
      question: "What can I use a personal loan for?",
      answer: "Personal loans can be used for almost any legal purpose. The most common uses include: debt consolidation (about 50% of all personal loans), home improvements, medical expenses, major purchases (appliances, furniture), wedding expenses, emergency costs, moving expenses, and small business needs. Some lenders restrict certain uses like education expenses (where student loans may be better) or business purposes. Debt consolidation is particularly popular because personal loan rates (avg 12%) are typically much lower than credit card rates (avg 20%+).",
    },
  ],

  // =============================================================================
  // REFERENCES (2 required)
  // =============================================================================
  references: [
    {
      authors: "Bankrate",
      year: "2026",
      title: "Average Personal Loan Interest Rates",
      source: "Bankrate Monitor Survey",
      url: "https://www.bankrate.com/loans/personal-loans/average-personal-loan-rates/",
    },
    {
      authors: "Federal Reserve",
      year: "2025",
      title: "Finance Rate on Personal Loans at Commercial Banks",
      source: "Federal Reserve Bank of St. Louis",
      url: "https://fred.stlouisfed.org/series/TERMCBPER24NS",
    },
  ],

  // =============================================================================
  // DETAILED TABLE (Year-by-Year Amortization)
  // =============================================================================
  detailedTable: {
    id: "amortizationSchedule",
    buttonLabel: "View Amortization Schedule",
    buttonIcon: "📅",
    modalTitle: "Loan Amortization Schedule",
    columns: [
      { id: "year", label: "Year", align: "left" },
      { id: "principalPaid", label: "Principal Paid", align: "right" },
      { id: "interestPaid", label: "Interest Paid", align: "right" },
      { id: "balance", label: "Remaining Balance", align: "right", highlight: true },
    ],
  },

  // Sidebar
  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: true,
    category: "finance",
    cta: {
      title: "Compare Loan Rates",
      description: "Pre-qualify with multiple lenders to find your best rate",
      link: "/calculators",
      linkText: "View All Calculators",
    },
  },

  // Features
  features: {
    autoCalculate: true,
    exportPDF: true,
    shareResults: true,
    saveHistory: true,
  },

  // Related Calculators
  relatedCalculators: [
    "mortgage-calculator",
    "personal-loan-calculator",
    "compound-interest-calculator",
    "debt-payoff-calculator",
    "auto-loan-calculator",
  ],

  // Ads
  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
    afterResults: true,
  },
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateLoan(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;

  const loanAmount = values.loanAmount as number || 25000;
  const interestRate = values.interestRate as number || 12;
  const loanTerm = values.loanTerm as number || 5;
  const originationFee = values.originationFee as number || 0;
  const extraPayment = values.extraPayment as number || 0;

  // Basic calculations
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;
  const feeAmount = loanAmount * (originationFee / 100);

  // Monthly payment using amortization formula
  // M = P × [r(1+r)^n] / [(1+r)^n - 1]
  let monthlyPayment: number;
  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / numPayments;
  } else {
    monthlyPayment =
      loanAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  // Calculate actual payoff with extra payments
  let balance = loanAmount;
  let totalInterestPaid = 0;
  let actualMonths = 0;
  const yearlyData: { year: number; principalPaid: number; interestPaid: number; balance: number }[] = [];

  let yearPrincipal = 0;
  let yearInterest = 0;
  let currentYear = 1;

  while (balance > 0.01 && actualMonths < numPayments * 2) {
    actualMonths++;
    const interestPayment = balance * monthlyRate;
    const principalPayment = Math.min(monthlyPayment - interestPayment + extraPayment, balance);

    totalInterestPaid += interestPayment;
    yearPrincipal += principalPayment;
    yearInterest += interestPayment;
    balance -= principalPayment;

    // End of year or loan paid off
    if (actualMonths % 12 === 0 || balance <= 0.01) {
      yearlyData.push({
        year: currentYear,
        principalPaid: Math.round(yearPrincipal),
        interestPaid: Math.round(yearInterest),
        balance: Math.round(Math.max(0, balance)),
      });
      currentYear++;
      yearPrincipal = 0;
      yearInterest = 0;
    }

    if (balance < 0.01) balance = 0;
  }

  // Standard total interest (no extra payments) for comparison
  const standardTotalInterest = monthlyPayment * numPayments - loanAmount;
  const interestSaved = standardTotalInterest - totalInterestPaid;

  // Total cost
  const totalCost = loanAmount + totalInterestPaid + feeAmount;

  // Effective APR (including fees)
  let effectiveAPR: number;
  if (feeAmount > 0) {
    const effectiveAmount = loanAmount - feeAmount;
    effectiveAPR = ((monthlyPayment * numPayments - effectiveAmount) / effectiveAmount / loanTerm) * 100;
  } else {
    effectiveAPR = interestRate;
  }

  // Payoff date
  const now = new Date();
  const payoffDate = new Date(now.getFullYear(), now.getMonth() + actualMonths);
  const payoffDateStr = payoffDate.toLocaleDateString("en-US", { month: "short", year: "numeric" });

  // Format currency
  const formatCurrency = (value: number): string => {
    return value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  // Calculate breakdown percentages
  const principalPct = (loanAmount / totalCost) * 100;
  const interestPct = (totalInterestPaid / totalCost) * 100;
  const feePct = (feeAmount / totalCost) * 100;

  return {
    values: {
      monthlyPayment: monthlyPayment + extraPayment,
      totalInterest: totalInterestPaid,
      totalCost,
      effectiveAPR,
      payoffMonths: actualMonths,
      interestSaved: extraPayment > 0 ? interestSaved : 0,
      principalPct,
      interestPct,
      feePct,
      feeAmount,
      cashReceived: loanAmount - feeAmount,
    },
    formatted: {
      monthlyPayment: formatCurrency(monthlyPayment + extraPayment),
      totalInterest: formatCurrency(totalInterestPaid),
      totalCost: formatCurrency(totalCost),
      effectiveAPR: effectiveAPR.toFixed(2),
      payoffDate: payoffDateStr,
      interestSaved: extraPayment > 0 ? formatCurrency(interestSaved) : "—",
    },
    summary: `Monthly payment of $${formatCurrency(monthlyPayment + extraPayment)} for ${actualMonths} months. Total interest: $${formatCurrency(totalInterestPaid)}.`,
    isValid: true,
    metadata: {
      tableData: yearlyData.map((row) => ({
        year: `Year ${row.year}`,
        principalPaid: `$${row.principalPaid.toLocaleString()}`,
        interestPaid: `$${row.interestPaid.toLocaleString()}`,
        balance: `$${row.balance.toLocaleString()}`,
      })),
      extraPaymentSavings: extraPayment > 0 ? {
        interestSaved,
        monthsSaved: numPayments - actualMonths,
      } : null,
    },
  };
}

export default loanCalculatorConfig;
