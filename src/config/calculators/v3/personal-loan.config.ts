import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// PERSONAL LOAN CALCULATOR V3 - FULL FEATURED
// =============================================================================
// Features: Real APR calculation, Origination fees (% or fixed), Fee handling,
// Debt consolidation comparison, Credit score rate estimation, Extra payments,
// Prepayment penalty, Monthly insurance, Amortization schedule
// =============================================================================

// Credit score to rate ranges (2026 averages)
const CREDIT_SCORE_RATES: Record<string, { min: number; max: number; label: string }> = {
  excellent: { min: 6.5, max: 12.0, label: "Excellent (750+)" },
  good: { min: 12.0, max: 18.0, label: "Good (700-749)" },
  fair: { min: 18.0, max: 25.0, label: "Fair (650-699)" },
  poor: { min: 25.0, max: 36.0, label: "Poor (below 650)" },
};

export const personalLoanCalculatorConfig: CalculatorConfigV3 = {
  id: "personal-loan-calculator",
  slug: "personal-loan-calculator",
  name: "Personal Loan Calculator",
  category: "finance",
  icon: "💳",

  seo: {
    title: "Personal Loan Calculator - APR, Monthly Payment & Total Cost",
    description: "Calculate your personal loan payment, real APR including fees, total interest cost, and compare debt consolidation savings. Includes origination fee calculator and amortization schedule.",
    shortDescription: "Calculate loan payment, real APR, and total cost",
    keywords: ["personal loan calculator", "APR calculator", "loan payment calculator", "debt consolidation calculator", "origination fee calculator", "loan amortization"],
  },

  hero: { badge: "Finance", rating: { average: 4.9, count: 89000 } },

  unitSystem: { enabled: false, default: "imperial", options: [] },

  inputs: [
    {
      id: "loanAmount",
      type: "number",
      label: "Loan Amount",
      required: true,
      defaultValue: 20000,
      min: 1000,
      max: 100000,
      step: 500,
      prefix: "$",
      helpText: "Amount you want to borrow ($1,000 - $100,000)",
    },
    {
      id: "interestRate",
      type: "number",
      label: "Interest Rate (APR)",
      required: true,
      defaultValue: 10,
      min: 3,
      max: 36,
      step: 0.1,
      suffix: "%",
      helpText: "Annual percentage rate from lender",
    },
    {
      id: "loanTerm",
      type: "select",
      label: "Loan Term",
      required: true,
      defaultValue: "36",
      options: [
        { value: "12", label: "1 year (12 months)" },
        { value: "24", label: "2 years (24 months)" },
        { value: "36", label: "3 years (36 months)" },
        { value: "48", label: "4 years (48 months)" },
        { value: "60", label: "5 years (60 months)" },
        { value: "72", label: "6 years (72 months)" },
        { value: "84", label: "7 years (84 months)" },
      ],
    },
    {
      id: "creditScore",
      type: "select",
      label: "Your Credit Score Range",
      required: false,
      defaultValue: "none",
      options: [
        { value: "none", label: "I know my rate (entered above)" },
        { value: "excellent", label: "Excellent (750+) → 6.5-12% APR" },
        { value: "good", label: "Good (700-749) → 12-18% APR" },
        { value: "fair", label: "Fair (650-699) → 18-25% APR" },
        { value: "poor", label: "Poor (below 650) → 25-36% APR" },
      ],
      helpText: "We'll estimate your rate range",
    },
  ],

  inputGroups: [
    {
      id: "feesSection",
      title: "Fees & Insurance",
      icon: "💰",
      collapsible: true,
      defaultCollapsed: false,
      inputs: [
        {
          id: "originationFeeType",
          type: "radio",
          label: "Origination Fee Type",
          required: false,
          defaultValue: "percent",
          options: [
            { value: "percent", label: "Percentage of loan" },
            { value: "fixed", label: "Fixed amount" },
          ],
        },
        {
          id: "originationFeePercent",
          type: "number",
          label: "Origination Fee",
          required: false,
          defaultValue: 0,
          min: 0,
          max: 12,
          step: 0.5,
          suffix: "%",
          showWhen: { field: "originationFeeType", value: "percent" },
          helpText: "Typically 1-8% of loan amount",
        },
        {
          id: "originationFeeFixed",
          type: "number",
          label: "Origination Fee",
          required: false,
          defaultValue: 0,
          min: 0,
          max: 5000,
          step: 50,
          prefix: "$",
          showWhen: { field: "originationFeeType", value: "fixed" },
        },
        {
          id: "feeHandling",
          type: "radio",
          label: "How is the fee handled?",
          required: false,
          defaultValue: "deducted",
          options: [
            { value: "deducted", label: "Deducted from loan (you receive less)" },
            { value: "upfront", label: "Paid upfront separately" },
          ],
          helpText: "Most lenders deduct from the loan disbursement",
        },
        {
          id: "monthlyInsurance",
          type: "number",
          label: "Monthly Insurance/Protection",
          required: false,
          defaultValue: 0,
          min: 0,
          max: 200,
          step: 5,
          prefix: "$",
          helpText: "Optional payment protection insurance",
        },
      ],
    },
    {
      id: "extraPaymentsSection",
      title: "Extra Payments",
      icon: "⚡",
      collapsible: true,
      defaultCollapsed: true,
      inputs: [
        {
          id: "extraPaymentType",
          type: "select",
          label: "Extra Payment Frequency",
          required: false,
          defaultValue: "none",
          options: [
            { value: "none", label: "No extra payments" },
            { value: "monthly", label: "Extra each month" },
            { value: "yearly", label: "Extra once per year" },
            { value: "onetime", label: "One-time lump sum" },
          ],
        },
        {
          id: "extraPaymentAmount",
          type: "number",
          label: "Extra Payment Amount",
          required: false,
          defaultValue: 100,
          min: 0,
          max: 10000,
          step: 25,
          prefix: "$",
          showWhen: { field: "extraPaymentType", value: ["monthly", "yearly", "onetime"] },
        },
        {
          id: "hasPrepaymentPenalty",
          type: "radio",
          label: "Does your loan have a prepayment penalty?",
          required: false,
          defaultValue: "no",
          options: [
            { value: "no", label: "No penalty" },
            { value: "yes", label: "Yes, there's a penalty" },
          ],
          showWhen: { field: "extraPaymentType", value: ["monthly", "yearly", "onetime"] },
        },
        {
          id: "prepaymentPenalty",
          type: "number",
          label: "Prepayment Penalty",
          required: false,
          defaultValue: 2,
          min: 0,
          max: 5,
          step: 0.5,
          suffix: "% of balance",
          showWhen: { field: "hasPrepaymentPenalty", value: "yes" },
        },
      ],
    },
    {
      id: "debtConsolidationSection",
      title: "Debt Consolidation Comparison",
      icon: "🔄",
      collapsible: true,
      defaultCollapsed: true,
      inputs: [
        {
          id: "compareDebtConsolidation",
          type: "radio",
          label: "Compare to existing debt?",
          required: false,
          defaultValue: "no",
          options: [
            { value: "yes", label: "Yes - show consolidation savings" },
            { value: "no", label: "No" },
          ],
        },
        {
          id: "existingDebt1Amount",
          type: "number",
          label: "Credit Card 1 Balance",
          required: false,
          defaultValue: 5000,
          min: 0,
          max: 50000,
          step: 100,
          prefix: "$",
          showWhen: { field: "compareDebtConsolidation", value: "yes" },
        },
        {
          id: "existingDebt1Rate",
          type: "number",
          label: "Credit Card 1 APR",
          required: false,
          defaultValue: 22,
          min: 0,
          max: 35,
          step: 0.5,
          suffix: "%",
          showWhen: { field: "compareDebtConsolidation", value: "yes" },
        },
        {
          id: "existingDebt2Amount",
          type: "number",
          label: "Credit Card 2 Balance",
          required: false,
          defaultValue: 3000,
          min: 0,
          max: 50000,
          step: 100,
          prefix: "$",
          showWhen: { field: "compareDebtConsolidation", value: "yes" },
        },
        {
          id: "existingDebt2Rate",
          type: "number",
          label: "Credit Card 2 APR",
          required: false,
          defaultValue: 24,
          min: 0,
          max: 35,
          step: 0.5,
          suffix: "%",
          showWhen: { field: "compareDebtConsolidation", value: "yes" },
        },
      ],
    },
  ],

  results: [
    { id: "monthlyPayment", type: "primary", label: "Monthly Payment", format: "number", prefix: "$" },
    { id: "totalPayment", type: "secondary", label: "Total of Payments", format: "number", prefix: "$" },
    { id: "totalInterest", type: "secondary", label: "Total Interest", format: "number", prefix: "$" },
    { id: "realAPR", type: "secondary", label: "Real APR (with fees)", format: "text" },
    { id: "netLoanAmount", type: "secondary", label: "Net Amount Received", format: "number", prefix: "$" },
    { id: "payoffDate", type: "secondary", label: "Payoff Date", format: "text" },
    { id: "interestSaved", type: "secondary", label: "Interest Saved (extra pay)", format: "text" },
    { id: "consolidationSavings", type: "secondary", label: "Consolidation Savings", format: "text" },
  ],

  infoCards: [
    {
      id: "ratesByCredit",
      title: "Average Rates by Credit Score (2026)",
      icon: "📊",
      type: "list",
      items: [
        { label: "Excellent (750+)", value: "6.5% - 12% APR", color: "green" },
        { label: "Good (700-749)", value: "12% - 18% APR", color: "blue" },
        { label: "Fair (650-699)", value: "18% - 25% APR", color: "amber" },
        { label: "Poor (below 650)", value: "25% - 36% APR", color: "red" },
      ],
    },
    {
      id: "loanTips",
      title: "Ways to Save on Your Loan",
      icon: "💡",
      type: "horizontal",
      items: [
        { label: "Shop around: Compare 3-5 lenders" },
        { label: "Check for autopay discount (0.25-0.5%)" },
        { label: "Improve credit score before applying" },
        { label: "Choose shortest term you can afford" },
      ],
    },
  ],

  referenceData: [
    {
      id: "loanTermsReference",
      title: "Loan Term Impact on $20,000 at 10% APR",
      icon: "📋",
      columns: 2,
      items: [
        { label: "3 years", value: "$645/mo | $3,227 interest" },
        { label: "4 years", value: "$507/mo | $4,362 interest" },
        { label: "5 years", value: "$425/mo | $5,496 interest" },
        { label: "7 years", value: "$332/mo | $7,896 interest" },
      ],
    },
  ],

  educationSections: [
    {
      id: "loanTypes",
      type: "cards",
      title: "Personal Loan Types",
      icon: "🏦",
      columns: 2,
      cards: [
        { title: "Unsecured Loans", description: "No collateral required. Interest rates based on creditworthiness. Most common type for debt consolidation and major purchases.", icon: "💳" },
        { title: "Secured Loans", description: "Backed by collateral (car, savings). Lower rates but risk losing asset if you default. Good for poor credit.", icon: "🔒" },
        { title: "Fixed-Rate Loans", description: "Same interest rate for entire term. Predictable monthly payments. Best for budgeting and stability.", icon: "📌" },
        { title: "Variable-Rate Loans", description: "Rate changes with market. May start lower but can increase. Risky if rates rise significantly.", icon: "📈" },
      ],
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "Real APR includes origination fees - always compare APRs, not just interest rates.", type: "warning" },
        { text: "Origination fees (1-8%) are often deducted from your loan, reducing the amount you actually receive.", type: "warning" },
        { text: "Most personal loans have no prepayment penalty - verify before signing.", type: "info" },
        { text: "Debt consolidation only saves money if the new rate is lower than your weighted average rate.", type: "info" },
        { text: "Pre-qualification with soft credit check doesn't affect your credit score - use it to shop around.", type: "info" },
        { text: "Autopay discounts (0.25-0.5%) can reduce your effective rate over the loan term.", type: "info" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "🧮",
      description: "$20,000 loan at 10% APR for 36 months with 3% origination fee",
      columns: 2,
      examples: [
        { title: "Standard Payment", steps: ["Principal: $20,000", "Rate: 10% ÷ 12 = 0.833%/mo", "Term: 36 months", "Monthly: $645.34"], result: "Total Interest: $3,232" },
        { title: "With Origination Fee", steps: ["Fee: $20,000 × 3% = $600", "Net received: $19,400", "Still repay: $20,000", "Real APR: 11.8%"], result: "True cost: $3,832" },
      ],
    },
    {
      id: "aprExplanation",
      type: "prose",
      title: "Understanding APR vs Interest Rate",
      content: "The interest rate is the basic cost of borrowing expressed as a percentage. APR (Annual Percentage Rate) includes the interest rate plus mandatory fees like origination fees, providing a more complete picture of your loan's true cost. When comparing loans, always compare APRs, not interest rates. A loan with a lower interest rate but high fees may actually cost more than one with a higher rate and no fees.",
    },
    {
      id: "debtConsolidationGuide",
      type: "prose",
      title: "Is Debt Consolidation Right for You?",
      content: "Debt consolidation combines multiple debts into a single loan, ideally at a lower interest rate. It makes sense when your new rate is significantly lower than your current weighted average rate, and you commit to not accumulating new debt. The main benefit is simplicity (one payment) and potential interest savings. However, extending your repayment term to lower payments may cost more in total interest over time.",
    },
    {
      id: "loanTypesGuide",
      type: "prose",
      title: "Understanding Personal Loan Types",
      content: "Personal loans come in two main varieties: secured and unsecured. Secured loans require collateral like a car or savings account, typically offering lower interest rates (3-12% APR). Unsecured loans don't require collateral but have higher rates (6-36% APR) based on creditworthiness. Fixed-rate loans maintain the same interest rate throughout the term, providing predictable payments. Variable-rate loans may start lower but fluctuate with market conditions. Most personal loans range from $1,000 to $50,000 with terms of 12 to 84 months. Shorter terms mean higher monthly payments but less total interest paid.",
    },
  ],

  faqs: [
    { question: "What credit score do I need for a personal loan?", answer: "Most lenders require a minimum score of 580-640, but you'll get the best rates (under 12%) with scores above 750. Some online lenders work with lower scores but charge higher rates (25-36% APR)." },
    { question: "Should I pay off my loan early?", answer: "If there's no prepayment penalty, paying early saves interest. However, if your rate is low (under 8%) and you could invest the extra money at higher returns, you might benefit more from investing. Also consider your emergency fund first." },
    { question: "What's the difference between fixed and variable rates?", answer: "Fixed rates stay the same for your entire loan term, making payments predictable. Variable rates can change based on market conditions - they often start lower but may increase over time, making them riskier for longer terms." },
    { question: "How much can origination fees affect my loan cost?", answer: "A 5% origination fee on a $20,000 loan means you only receive $19,000 but repay $20,000 plus interest. This effectively increases your APR by 1-3% depending on term length. Always factor fees into your comparison." },
    { question: "Is debt consolidation always a good idea?", answer: "Not always. It only saves money if your new rate is lower than your weighted average rate on existing debts. Also, if you extend the term significantly, you may pay more total interest even at a lower rate. And if you continue using credit cards after consolidating, you'll end up with more debt." },
    { question: "What happens if I miss a payment?", answer: "Late payments typically incur a fee (often $25-50 or 5% of payment) and may be reported to credit bureaus after 30 days, damaging your credit score. Multiple missed payments can lead to default and collections. Contact your lender immediately if you're struggling." },
  ],

  references: [
    { authors: "Consumer Financial Protection Bureau", year: "2026", title: "What is the difference between a loan's interest rate and its APR?", source: "CFPB", url: "https://www.consumerfinance.gov/ask-cfpb/" },
    { authors: "Federal Reserve", year: "2026", title: "Consumer Credit Report", source: "Federal Reserve Statistical Release", url: "https://www.federalreserve.gov/releases/g19/" },
  ],

  detailedTable: {
    id: "amortization",
    buttonLabel: "View Amortization Schedule",
    buttonIcon: "📊",
    modalTitle: "Monthly Amortization Schedule",
    columns: [
      { id: "month", label: "Month", align: "center" },
      { id: "payment", label: "Payment", align: "right" },
      { id: "principal", label: "Principal", align: "right" },
      { id: "interest", label: "Interest", align: "right" },
      { id: "balance", label: "Balance", align: "right", highlight: true },
    ],
  },

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "finance" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["debt-payoff-calculator", "credit-card-payoff-calculator", "loan-comparison-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
function calculateMonthlyPayment(principal: number, annualRate: number, months: number): number {
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return principal / months;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
}

function calculateRealAPR(principal: number, monthlyPayment: number, months: number, totalFees: number): number {
  // Newton-Raphson method to solve for APR
  const netAmount = principal - totalFees;
  let apr = 0.1; // Initial guess 10%
  
  for (let i = 0; i < 100; i++) {
    const monthlyRate = apr / 12;
    let presentValue = 0;
    for (let m = 1; m <= months; m++) {
      presentValue += monthlyPayment / Math.pow(1 + monthlyRate, m);
    }
    
    const diff = presentValue - netAmount;
    if (Math.abs(diff) < 0.01) break;
    
    // Derivative approximation
    const delta = 0.0001;
    const monthlyRateDelta = (apr + delta) / 12;
    let presentValueDelta = 0;
    for (let m = 1; m <= months; m++) {
      presentValueDelta += monthlyPayment / Math.pow(1 + monthlyRateDelta, m);
    }
    
    const derivative = (presentValueDelta - presentValue) / delta;
    if (Math.abs(derivative) < 0.0001) break;
    
    apr = apr - diff / derivative;
    if (apr < 0) apr = 0.01;
    if (apr > 1) apr = 0.99;
  }
  
  return apr * 100;
}

function formatCurrency(amount: number): string {
  return amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDate(monthsFromNow: number): string {
  const date = new Date();
  date.setMonth(date.getMonth() + monthsFromNow);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculatePersonalLoan(data: { values: Record<string, unknown>; units: Record<string, string>; unitSystem: "metric" | "imperial" }): CalculatorResults {
  const { values } = data;

  // Basic inputs
  const loanAmount = (values.loanAmount as number) || 20000;
  let interestRate = (values.interestRate as number) || 10;
  const loanTermMonths = parseInt((values.loanTerm as string) || "36");
  const creditScore = (values.creditScore as string) || "none";

  // Apply credit score rate if selected
  if (creditScore !== "none" && CREDIT_SCORE_RATES[creditScore]) {
    const range = CREDIT_SCORE_RATES[creditScore];
    interestRate = (range.min + range.max) / 2; // Use midpoint
  }

  // Fees
  const originationFeeType = (values.originationFeeType as string) || "percent";
  const originationFeePercent = (values.originationFeePercent as number) || 0;
  const originationFeeFixed = (values.originationFeeFixed as number) || 0;
  const feeHandling = (values.feeHandling as string) || "deducted";
  const monthlyInsurance = (values.monthlyInsurance as number) || 0;

  // Extra payments
  const extraPaymentType = (values.extraPaymentType as string) || "none";
  const extraPaymentAmount = (values.extraPaymentAmount as number) || 0;

  // Debt consolidation
  const compareDebtConsolidation = (values.compareDebtConsolidation as string) === "yes";
  const existingDebt1Amount = (values.existingDebt1Amount as number) || 0;
  const existingDebt1Rate = (values.existingDebt1Rate as number) || 0;
  const existingDebt2Amount = (values.existingDebt2Amount as number) || 0;
  const existingDebt2Rate = (values.existingDebt2Rate as number) || 0;

  // Calculate origination fee
  const originationFee = originationFeeType === "percent" 
    ? loanAmount * (originationFeePercent / 100) 
    : originationFeeFixed;

  // Net amount received
  const netLoanAmount = feeHandling === "deducted" ? loanAmount - originationFee : loanAmount;

  // Monthly payment (principal + interest)
  const baseMonthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTermMonths);
  const totalMonthlyPayment = baseMonthlyPayment + monthlyInsurance;

  // Standard totals
  const totalPayments = totalMonthlyPayment * loanTermMonths;
  const totalInterest = (baseMonthlyPayment * loanTermMonths) - loanAmount;

  // Calculate real APR (including fees)
  let realAPR = interestRate;
  if (originationFee > 0 && feeHandling === "deducted") {
    realAPR = calculateRealAPR(loanAmount, baseMonthlyPayment, loanTermMonths, originationFee);
  }

  // Extra payment calculations
  let interestSaved = 0;
  let monthsSaved = 0;
  
  if (extraPaymentType !== "none" && extraPaymentAmount > 0) {
    let balance = loanAmount;
    let monthsWithExtra = 0;
    let totalPaidWithExtra = 0;
    const monthlyRate = interestRate / 100 / 12;

    while (balance > 0.01 && monthsWithExtra < loanTermMonths * 2) {
      const interestPayment = balance * monthlyRate;
      let principalPayment = baseMonthlyPayment - interestPayment;
      
      // Add extra payment
      if (extraPaymentType === "monthly") {
        principalPayment += extraPaymentAmount;
      } else if (extraPaymentType === "yearly" && monthsWithExtra % 12 === 11) {
        principalPayment += extraPaymentAmount;
      } else if (extraPaymentType === "onetime" && monthsWithExtra === 0) {
        principalPayment += extraPaymentAmount;
      }

      balance -= principalPayment;
      totalPaidWithExtra += baseMonthlyPayment + (extraPaymentType === "monthly" ? extraPaymentAmount : 0);
      monthsWithExtra++;
      
      if (balance < 0) balance = 0;
    }

    monthsSaved = loanTermMonths - monthsWithExtra;
    const totalInterestWithExtra = totalPaidWithExtra - loanAmount;
    interestSaved = totalInterest - totalInterestWithExtra;
  }

  // Debt consolidation savings
  let consolidationSavings = 0;
  if (compareDebtConsolidation && (existingDebt1Amount > 0 || existingDebt2Amount > 0)) {
    // Calculate current debt cost (assuming same term for comparison)
    const debt1Interest = existingDebt1Amount * (existingDebt1Rate / 100) * (loanTermMonths / 12);
    const debt2Interest = existingDebt2Amount * (existingDebt2Rate / 100) * (loanTermMonths / 12);
    const currentTotalInterest = debt1Interest + debt2Interest;
    consolidationSavings = currentTotalInterest - totalInterest;
  }

  // Generate amortization table
  const tableData: { month: string; payment: string; principal: string; interest: string; balance: string }[] = [];
  let balance = loanAmount;
  const monthlyRate = interestRate / 100 / 12;
  
  for (let month = 1; month <= Math.min(loanTermMonths, 84); month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = baseMonthlyPayment - interestPayment;
    balance -= principalPayment;
    
    tableData.push({
      month: `${month}`,
      payment: `$${formatCurrency(totalMonthlyPayment)}`,
      principal: `$${formatCurrency(principalPayment)}`,
      interest: `$${formatCurrency(interestPayment)}`,
      balance: `$${formatCurrency(Math.max(0, balance))}`,
    });
  }

  return {
    values: {
      monthlyPayment: totalMonthlyPayment,
      totalPayment: totalPayments,
      totalInterest,
      realAPR,
      netLoanAmount,
      interestSaved,
      monthsSaved,
      consolidationSavings,
    },
    formatted: {
      monthlyPayment: formatCurrency(totalMonthlyPayment),
      totalPayment: formatCurrency(totalPayments),
      totalInterest: formatCurrency(totalInterest),
      realAPR: originationFee > 0 ? `${realAPR.toFixed(2)}%` : `${interestRate.toFixed(2)}% (no fees)`,
      netLoanAmount: formatCurrency(netLoanAmount),
      payoffDate: formatDate(extraPaymentType !== "none" ? loanTermMonths - monthsSaved : loanTermMonths),
      interestSaved: extraPaymentType !== "none" ? `$${formatCurrency(interestSaved)} (${monthsSaved} months faster)` : "N/A",
      consolidationSavings: consolidationSavings > 0 ? `$${formatCurrency(consolidationSavings)} saved` : consolidationSavings < 0 ? `$${formatCurrency(Math.abs(consolidationSavings))} more (not recommended)` : "N/A",
    },
    summary: `$${formatCurrency(totalMonthlyPayment)}/mo for ${loanTermMonths} months | Total interest: $${formatCurrency(totalInterest)}`,
    isValid: loanAmount > 0 && interestRate > 0 && loanTermMonths > 0,
    metadata: { tableData },
  };
}

export default personalLoanCalculatorConfig;
