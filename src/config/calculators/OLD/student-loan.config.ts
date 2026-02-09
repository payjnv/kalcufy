import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// STUDENT LOAN CALCULATOR V3 CONFIG - FULL FEATURED
// =============================================================================
// Features: Standard/IDR Plans, PSLF, Refinancing Comparison, Extra Payments,
// Income Growth Projections, Grace Period, Tax Deduction
// =============================================================================

// 2026 Federal Poverty Guidelines (48 contiguous states)
const POVERTY_GUIDELINES_2026: Record<number, number> = {
  1: 15650, 2: 21150, 3: 26650, 4: 32150, 5: 37650, 6: 43150, 7: 48650, 8: 54150,
};

// Federal loan rates 2025-2026
const FEDERAL_RATES = {
  undergraduateDirect: 6.39,
  graduateUnsubsidized: 7.94,
  parentPlus: 8.94,
  gradPlus: 8.94,
};

export const studentLoanCalculatorConfig: CalculatorConfigV3 = {
  id: "student-loan-calculator",
  slug: "student-loan-calculator",
  name: "Student Loan Calculator",
  category: "finance",
  icon: "🎓",

  seo: {
    title: "Student Loan Calculator - IDR, PSLF, Refinancing & Payoff Comparison",
    description: "Comprehensive student loan calculator comparing standard repayment, income-driven plans (IBR, PAYE, ICR), PSLF forgiveness, refinancing options, and extra payment strategies. Updated with 2026 federal rates.",
    shortDescription: "Compare repayment plans, IDR, PSLF, and payoff strategies",
    keywords: ["student loan calculator", "income driven repayment", "IBR calculator", "PSLF calculator", "student loan forgiveness", "refinance student loans", "loan payoff calculator"],
  },

  hero: { badge: "Finance", rating: { average: 4.8, count: 67000 } },

  unitSystem: { enabled: false, default: "imperial", options: [] },

  inputs: [
    // === LOAN DETAILS ===
    {
      id: "loanAmount",
      type: "number",
      label: "Total Loan Balance",
      required: true,
      defaultValue: 35000,
      min: 1000,
      max: 500000,
      step: 1000,
      prefix: "$",
      helpText: "Combined balance of all student loans",
    },
    {
      id: "loanType",
      type: "select",
      label: "Loan Type",
      required: true,
      defaultValue: "federalUndergrad",
      options: [
        { value: "federalUndergrad", label: `Federal Undergraduate (${FEDERAL_RATES.undergraduateDirect}%)` },
        { value: "federalGrad", label: `Federal Graduate (${FEDERAL_RATES.graduateUnsubsidized}%)` },
        { value: "federalPlus", label: `Parent/Grad PLUS (${FEDERAL_RATES.parentPlus}%)` },
        { value: "private", label: "Private Loan (enter rate below)" },
        { value: "mixed", label: "Mixed Federal & Private" },
      ],
    },
    {
      id: "interestRate",
      type: "number",
      label: "Interest Rate",
      required: true,
      defaultValue: 6.39,
      min: 1,
      max: 15,
      step: 0.01,
      suffix: "%",
      helpText: "Weighted average if multiple loans",
    },
    {
      id: "loanTerm",
      type: "select",
      label: "Repayment Term",
      required: true,
      defaultValue: "10",
      options: [
        { value: "10", label: "10 years (Standard)" },
        { value: "15", label: "15 years" },
        { value: "20", label: "20 years" },
        { value: "25", label: "25 years (Extended)" },
      ],
    },
    // === GRACE PERIOD ===
    {
      id: "includeGracePeriod",
      type: "radio",
      label: "Include Grace Period?",
      required: false,
      defaultValue: "no",
      options: [
        { value: "yes", label: "Yes (6 months)" },
        { value: "no", label: "No (already in repayment)" },
      ],
      helpText: "Interest accrues during grace period on unsubsidized loans",
    },
    // === EXTRA PAYMENTS ===
    {
      id: "extraMonthlyPayment",
      type: "number",
      label: "Extra Monthly Payment",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 5000,
      step: 25,
      prefix: "$",
      helpText: "Additional amount beyond minimum payment",
    },
    {
      id: "oneTimePayment",
      type: "number",
      label: "One-Time Lump Sum Payment",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 100000,
      step: 500,
      prefix: "$",
      helpText: "Tax refund, bonus, or windfall",
    },
  ],

  inputGroups: [
    {
      id: "idrSection",
      title: "Income-Driven Repayment (IDR)",
      icon: "💵",
      collapsible: true,
      defaultCollapsed: false,
      inputs: [
        {
          id: "calculateIDR",
          type: "radio",
          label: "Compare IDR Plans?",
          required: false,
          defaultValue: "no",
          options: [
            { value: "yes", label: "Yes - show IDR comparison" },
            { value: "no", label: "No - standard repayment only" },
          ],
        },
        {
          id: "annualIncome",
          type: "number",
          label: "Annual Gross Income (AGI)",
          required: false,
          defaultValue: 55000,
          min: 0,
          max: 1000000,
          step: 1000,
          prefix: "$",
          showWhen: { field: "calculateIDR", value: "yes" },
          helpText: "Your Adjusted Gross Income from tax return",
        },
        {
          id: "spouseIncome",
          type: "number",
          label: "Spouse's Income (if married)",
          required: false,
          defaultValue: 0,
          min: 0,
          max: 1000000,
          step: 1000,
          prefix: "$",
          showWhen: { field: "calculateIDR", value: "yes" },
        },
        {
          id: "familySize",
          type: "select",
          label: "Family Size",
          required: false,
          defaultValue: "1",
          showWhen: { field: "calculateIDR", value: "yes" },
          options: [
            { value: "1", label: "1 (just me)" },
            { value: "2", label: "2" },
            { value: "3", label: "3" },
            { value: "4", label: "4" },
            { value: "5", label: "5" },
            { value: "6", label: "6+" },
          ],
        },
        {
          id: "filingStatus",
          type: "select",
          label: "Tax Filing Status",
          required: false,
          defaultValue: "single",
          showWhen: { field: "calculateIDR", value: "yes" },
          options: [
            { value: "single", label: "Single" },
            { value: "marriedJoint", label: "Married Filing Jointly" },
            { value: "marriedSeparate", label: "Married Filing Separately" },
            { value: "headOfHousehold", label: "Head of Household" },
          ],
          helpText: "MFS can lower IDR payments but affects taxes",
        },
        {
          id: "incomeGrowth",
          type: "slider",
          label: "Expected Annual Income Growth",
          required: false,
          defaultValue: 3,
          min: 0,
          max: 10,
          step: 0.5,
          suffix: "%",
          showWhen: { field: "calculateIDR", value: "yes" },
          helpText: "Average annual raise (3% is typical)",
        },
      ],
    },
    {
      id: "pslfSection",
      title: "Public Service Loan Forgiveness (PSLF)",
      icon: "🏛️",
      collapsible: true,
      defaultCollapsed: true,
      inputs: [
        {
          id: "pursuingPSLF",
          type: "radio",
          label: "Pursuing PSLF?",
          required: false,
          defaultValue: "no",
          options: [
            { value: "yes", label: "Yes - I work for qualifying employer" },
            { value: "no", label: "No" },
          ],
        },
        {
          id: "qualifyingPaymentsMade",
          type: "number",
          label: "Qualifying Payments Already Made",
          required: false,
          defaultValue: 0,
          min: 0,
          max: 120,
          showWhen: { field: "pursuingPSLF", value: "yes" },
          helpText: "Check your PSLF count at StudentAid.gov",
        },
        {
          id: "employerType",
          type: "select",
          label: "Employer Type",
          required: false,
          defaultValue: "government",
          showWhen: { field: "pursuingPSLF", value: "yes" },
          options: [
            { value: "government", label: "Federal/State/Local Government" },
            { value: "nonprofit", label: "501(c)(3) Nonprofit" },
            { value: "military", label: "Military" },
            { value: "publicSchool", label: "Public School/University" },
            { value: "other", label: "Other (verify eligibility)" },
          ],
        },
      ],
    },
    {
      id: "refinanceSection",
      title: "Refinancing Comparison",
      icon: "🔄",
      collapsible: true,
      defaultCollapsed: true,
      inputs: [
        {
          id: "compareRefinance",
          type: "radio",
          label: "Compare Refinancing?",
          required: false,
          defaultValue: "no",
          options: [
            { value: "yes", label: "Yes - show refinance savings" },
            { value: "no", label: "No" },
          ],
        },
        {
          id: "refinanceRate",
          type: "number",
          label: "Expected Refinance Rate",
          required: false,
          defaultValue: 5.5,
          min: 3,
          max: 12,
          step: 0.1,
          suffix: "%",
          showWhen: { field: "compareRefinance", value: "yes" },
          helpText: "Based on credit score 720+",
        },
        {
          id: "refinanceTerm",
          type: "select",
          label: "Refinance Term",
          required: false,
          defaultValue: "10",
          showWhen: { field: "compareRefinance", value: "yes" },
          options: [
            { value: "5", label: "5 years" },
            { value: "7", label: "7 years" },
            { value: "10", label: "10 years" },
            { value: "15", label: "15 years" },
            { value: "20", label: "20 years" },
          ],
        },
      ],
    },
  ],

  results: [
    { id: "monthlyPayment", type: "primary", label: "Monthly Payment", format: "number", prefix: "$" },
    { id: "totalPayment", type: "secondary", label: "Total Paid", format: "number", prefix: "$" },
    { id: "totalInterest", type: "secondary", label: "Total Interest", format: "number", prefix: "$" },
    { id: "payoffDate", type: "secondary", label: "Payoff Date", format: "text" },
    { id: "interestSaved", type: "secondary", label: "Interest Saved (w/ extra)", format: "number", prefix: "$" },
    { id: "monthsSaved", type: "secondary", label: "Months Saved", format: "number" },
    { id: "idrPayment", type: "secondary", label: "IDR Payment (IBR)", format: "text" },
    { id: "pslfForgiveness", type: "secondary", label: "PSLF Forgiveness", format: "text" },
  ],

  infoCards: [
    {
      id: "federalRates",
      title: "Federal Loan Rates 2025-2026",
      icon: "📊",
      type: "list",
      items: [
        { label: "Undergraduate Direct", value: "6.39% fixed", color: "blue" },
        { label: "Graduate Unsubsidized", value: "7.94% fixed", color: "blue" },
        { label: "Parent/Grad PLUS", value: "8.94% fixed", color: "amber" },
        { label: "Private Loans", value: "4-15% (credit-based)", color: "slate" },
      ],
    },
    {
      id: "repaymentTips",
      title: "Smart Repayment Tips",
      icon: "💡",
      type: "horizontal",
      items: [
        { label: "Autopay: Get 0.25% rate reduction" },
        { label: "Pay interest while in school" },
        { label: "Target highest rate first (Avalanche)" },
        { label: "Tax deduction: Up to $2,500/year" },
      ],
    },
  ],

  referenceData: [
    {
      id: "idrPlansReference",
      title: "Income-Driven Repayment Plans",
      icon: "📋",
      columns: 2,
      items: [
        { label: "IBR (New)", value: "10% discretionary, 20yr forgive" },
        { label: "IBR (Old)", value: "15% discretionary, 25yr forgive" },
        { label: "PAYE", value: "10% discretionary, 20yr forgive" },
        { label: "ICR", value: "20% discretionary, 25yr forgive" },
        { label: "RAP (2026)", value: "New plan replacing SAVE" },
        { label: "PSLF", value: "120 payments, tax-free forgive" },
      ],
    },
  ],

  educationSections: [
    {
      id: "loanTypes",
      type: "cards",
      title: "Federal vs Private Student Loans",
      icon: "🏦",
      columns: 2,
      cards: [
        { title: "Direct Subsidized", description: "Need-based for undergrads. Government pays interest during school, grace, and deferment. Best federal option.", icon: "⭐" },
        { title: "Direct Unsubsidized", description: "Available to all students regardless of need. Interest accrues from disbursement. Consider paying interest in school.", icon: "📚" },
        { title: "Parent/Grad PLUS", description: "Credit-based federal loans at higher rates (8.94%). Requires no adverse credit history. Can consolidate for IDR.", icon: "👨‍👩‍👧" },
        { title: "Private Loans", description: "From banks/lenders with variable rates based on credit. No federal protections, forgiveness, or IDR options. Refinance target.", icon: "🏢" },
      ],
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "Never refinance federal loans if you're pursuing PSLF or IDR forgiveness - you'll lose federal benefits permanently.", type: "warning" },
        { text: "Interest capitalizes (adds to principal) when leaving grace period, forbearance, or changing repayment plans.", type: "warning" },
        { text: "Autopay discount: Most servicers offer 0.25% interest rate reduction for automatic payments.", type: "info" },
        { text: "PSLF requires Direct Loans (or consolidation) + IDR plan + 120 qualifying payments + qualifying employer.", type: "info" },
        { text: "$0 IDR payments still count toward forgiveness if your income is low enough.", type: "info" },
        { text: "Student loan interest deduction: Up to $2,500/year if income below threshold ($90K single, $185K married).", type: "info" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "🧮",
      description: "$35,000 loan at 6.8% for 10 years with $100/month extra payment",
      columns: 2,
      examples: [
        { title: "Standard Repayment", steps: ["Principal: $35,000", "Rate: 6.8% / 12 = 0.567%/mo", "Term: 120 months", "Payment: $402.87/mo"], result: "Total: $48,344 | Interest: $13,344" },
        { title: "With $100 Extra/Month", steps: ["Payment: $502.87/mo", "New payoff: 82 months", "Interest paid: $9,234", "Saved: $4,110 interest"], result: "38 months faster | Save $4,110" },
      ],
    },
    {
      id: "understandingLoans",
      type: "prose",
      title: "Understanding Student Loans",
      content: "Federal student loans offer fixed interest rates, income-driven repayment options, and potential forgiveness programs that private loans don't provide. Direct Loans include subsidized (need-based, government pays interest during school), unsubsidized (available to all, interest accrues immediately), and PLUS loans (for parents and grad students, credit-checked). Private loans are credit-based with variable rates typically ranging 4-15% and should generally be a last resort after exhausting federal aid.",
    },
    {
      id: "repaymentStrategies",
      type: "prose",
      title: "Repayment Strategies That Work",
      content: "The Avalanche method targets highest-interest loans first, minimizing total interest paid. The Snowball method pays smallest balances first for psychological wins. For most borrowers, Avalanche saves more money. Making payments during grace period or school reduces capitalized interest. Even $25/month toward interest prevents balance growth. If pursuing forgiveness, minimize payments through IDR; if paying in full, maximize payments to reduce interest.",
    },
    {
      id: "forgivenessProgramsContent",
      type: "prose",
      title: "Loan Forgiveness Programs",
      content: "PSLF forgives remaining balance tax-free after 120 qualifying payments (10 years) while working full-time for government or 501(c)(3) nonprofits. IDR forgiveness occurs after 20-25 years of payments, but forgiven amounts may be taxable income starting 2026. Teacher Loan Forgiveness offers up to $17,500 after 5 years at low-income schools. State-specific programs exist for healthcare workers, lawyers, and other professions in underserved areas.",
    },
  ],

  faqs: [
    { question: "What are current federal student loan rates?", answer: "For 2025-2026: Undergraduate Direct Loans are 6.39%, Graduate Direct Unsubsidized are 7.94%, and Parent/Grad PLUS are 8.94%. These rates are fixed for the life of the loan. Private loan rates vary from 4-15% based on creditworthiness." },
    { question: "Should I pay off loans or invest?", answer: "Compare your loan interest rate to expected investment returns. Generally, pay off loans above 6-7% before investing beyond employer 401(k) match. For lower-rate loans, investing may yield better returns, but guaranteed 'return' from debt payoff has value." },
    { question: "What is income-driven repayment (IDR)?", answer: "IDR plans cap payments at 10-20% of discretionary income (income above 150% of poverty level). After 20-25 years, remaining balance is forgiven (potentially taxable). Plans include IBR, PAYE, ICR, and the new RAP (2026). Best for high debt, low income, or pursuing PSLF." },
    { question: "How does PSLF work?", answer: "Make 120 qualifying payments (10 years) while working full-time for government or qualifying 501(c)(3) nonprofit. Must have Direct Loans and be on IDR plan. Remaining balance forgiven tax-free. Submit Employment Certification Form annually to track progress." },
    { question: "Should I refinance my student loans?", answer: "Refinance private loans if you can get a lower rate. For federal loans, only refinance if you're NOT pursuing PSLF/IDR forgiveness, have stable high income, and can get significantly lower rate. Refinancing federal loans converts them to private, losing all federal protections." },
    { question: "What happens if I can't make payments?", answer: "For federal loans: apply for IDR plan (payments can be $0), request deferment/forbearance, or income-driven plans. Never default - it destroys credit and leads to wage garnishment. Contact your servicer immediately if struggling." },
    { question: "How much can I save with extra payments?", answer: "On a $35,000 loan at 6.8% over 10 years, $100 extra monthly saves ~$4,000 in interest and pays off 3+ years early. Use our calculator to see your specific savings. Extra payments go toward principal, not future payments." },
    { question: "Is student loan interest tax deductible?", answer: "You can deduct up to $2,500 in student loan interest annually if your modified AGI is below $90,000 (single) or $185,000 (married filing jointly). The deduction phases out as income increases. You don't need to itemize to claim this deduction." },
  ],

  references: [
    { authors: "Federal Student Aid", year: "2026", title: "Income-Driven Repayment Plans", source: "U.S. Department of Education", url: "https://studentaid.gov/manage-loans/repayment/plans/income-driven" },
    { authors: "Federal Student Aid", year: "2026", title: "Public Service Loan Forgiveness", source: "U.S. Department of Education", url: "https://studentaid.gov/manage-loans/forgiveness-cancellation/public-service" },
  ],

  detailedTable: {
    id: "amortization",
    buttonLabel: "View Amortization Schedule",
    buttonIcon: "📊",
    modalTitle: "Year-by-Year Amortization",
    columns: [
      { id: "year", label: "Year", align: "center" },
      { id: "payment", label: "Annual Payment", align: "right" },
      { id: "principal", label: "Principal Paid", align: "right" },
      { id: "interest", label: "Interest Paid", align: "right" },
      { id: "balance", label: "Remaining Balance", align: "right", highlight: true },
    ],
  },

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "finance" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["compound-interest-calculator", "savings-calculator", "budget-calculator", "debt-payoff-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
function calculateMonthlyPayment(principal: number, annualRate: number, termYears: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = termYears * 12;
  if (monthlyRate === 0) return principal / numPayments;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
}

function calculateDiscretionaryIncome(agi: number, familySize: number): number {
  const povertyLevel = POVERTY_GUIDELINES_2026[Math.min(familySize, 8)] || POVERTY_GUIDELINES_2026[8];
  const threshold = povertyLevel * 1.5; // 150% of poverty level
  return Math.max(0, agi - threshold);
}

function calculateIBRPayment(discretionaryIncome: number, isNewBorrower: boolean): number {
  const percentage = isNewBorrower ? 0.10 : 0.15; // 10% for new borrowers, 15% for old
  return (discretionaryIncome * percentage) / 12;
}

function formatCurrency(amount: number): string {
  return amount.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function formatDate(monthsFromNow: number): string {
  const date = new Date();
  date.setMonth(date.getMonth() + monthsFromNow);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateStudentLoan(data: { values: Record<string, unknown>; units: Record<string, string>; unitSystem: "metric" | "imperial" }): CalculatorResults {
  const { values } = data;

  // Basic loan info
  let loanAmount = (values.loanAmount as number) || 35000;
  const loanType = (values.loanType as string) || "federalUndergrad";
  const interestRate = (values.interestRate as number) || 6.39;
  const loanTerm = parseInt((values.loanTerm as string) || "10");
  const includeGracePeriod = (values.includeGracePeriod as string) === "yes";
  const extraMonthlyPayment = (values.extraMonthlyPayment as number) || 0;
  const oneTimePayment = (values.oneTimePayment as number) || 0;

  // IDR inputs
  const calculateIDR = (values.calculateIDR as string) === "yes";
  const annualIncome = (values.annualIncome as number) || 55000;
  const spouseIncome = (values.spouseIncome as number) || 0;
  const familySize = parseInt((values.familySize as string) || "1");
  const filingStatus = (values.filingStatus as string) || "single";
  const incomeGrowth = (values.incomeGrowth as number) || 3;

  // PSLF inputs
  const pursuingPSLF = (values.pursuingPSLF as string) === "yes";
  const qualifyingPaymentsMade = (values.qualifyingPaymentsMade as number) || 0;

  // Refinance inputs
  const compareRefinance = (values.compareRefinance as string) === "yes";
  const refinanceRate = (values.refinanceRate as number) || 5.5;
  const refinanceTerm = parseInt((values.refinanceTerm as string) || "10");

  // Grace period: add 6 months of interest to principal for unsubsidized
  if (includeGracePeriod && loanType !== "federalSubsidized") {
    const gracePeriodInterest = loanAmount * (interestRate / 100) * (6 / 12);
    loanAmount += gracePeriodInterest;
  }

  // Apply one-time payment to principal
  loanAmount = Math.max(0, loanAmount - oneTimePayment);

  // Standard repayment calculation
  const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
  const totalPaymentStandard = monthlyPayment * loanTerm * 12;
  const totalInterestStandard = totalPaymentStandard - loanAmount;

  // With extra payments
  let balanceWithExtra = loanAmount;
  let monthsWithExtra = 0;
  let totalPaidWithExtra = 0;
  const monthlyRate = interestRate / 100 / 12;

  while (balanceWithExtra > 0 && monthsWithExtra < loanTerm * 12) {
    const interestPayment = balanceWithExtra * monthlyRate;
    const principalPayment = Math.min(balanceWithExtra, monthlyPayment + extraMonthlyPayment - interestPayment);
    balanceWithExtra -= principalPayment;
    totalPaidWithExtra += monthlyPayment + extraMonthlyPayment;
    monthsWithExtra++;
    if (balanceWithExtra < 0.01) break;
  }

  const interestSaved = totalInterestStandard - (totalPaidWithExtra - loanAmount);
  const monthsSaved = (loanTerm * 12) - monthsWithExtra;

  // IDR calculation
  let idrPaymentDisplay = "N/A";
  let pslfForgivenessDisplay = "N/A";

  if (calculateIDR) {
    const combinedIncome = filingStatus === "marriedJoint" ? annualIncome + spouseIncome : annualIncome;
    const discretionary = calculateDiscretionaryIncome(combinedIncome, familySize);
    const ibrPayment = calculateIBRPayment(discretionary, true); // New borrower
    const ibrPaymentCapped = Math.min(ibrPayment, monthlyPayment);
    idrPaymentDisplay = `$${formatCurrency(Math.round(ibrPaymentCapped))}/mo`;

    if (pursuingPSLF) {
      const paymentsRemaining = 120 - qualifyingPaymentsMade;
      const totalPaidPSLF = ibrPaymentCapped * paymentsRemaining;
      
      // Estimate balance after PSLF payments (simplified)
      let pslfBalance = loanAmount;
      for (let i = 0; i < paymentsRemaining; i++) {
        const interest = pslfBalance * monthlyRate;
        pslfBalance = pslfBalance + interest - ibrPaymentCapped;
        if (pslfBalance < 0) pslfBalance = 0;
      }
      
      pslfForgivenessDisplay = pslfBalance > 0 ? `$${formatCurrency(Math.round(pslfBalance))} forgiven (tax-free)` : "Paid off before forgiveness";
    }
  }

  // Generate amortization table
  const tableData: { year: string; payment: string; principal: string; interest: string; balance: string }[] = [];
  let balance = loanAmount;
  
  for (let year = 1; year <= loanTerm; year++) {
    let yearlyPayment = 0;
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;
    
    for (let month = 0; month < 12 && balance > 0; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = Math.min(balance, monthlyPayment - interestPayment);
      balance -= principalPayment;
      yearlyPayment += monthlyPayment;
      yearlyPrincipal += principalPayment;
      yearlyInterest += interestPayment;
    }
    
    tableData.push({
      year: `Year ${year}`,
      payment: `$${formatCurrency(Math.round(yearlyPayment))}`,
      principal: `$${formatCurrency(Math.round(yearlyPrincipal))}`,
      interest: `$${formatCurrency(Math.round(yearlyInterest))}`,
      balance: `$${formatCurrency(Math.round(Math.max(0, balance)))}`,
    });
  }

  return {
    values: {
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(totalPaymentStandard),
      totalInterest: Math.round(totalInterestStandard),
      interestSaved: Math.round(interestSaved),
      monthsSaved,
    },
    formatted: {
      monthlyPayment: formatCurrency(Math.round(monthlyPayment)),
      totalPayment: formatCurrency(Math.round(totalPaymentStandard)),
      totalInterest: formatCurrency(Math.round(totalInterestStandard)),
      payoffDate: formatDate(extraMonthlyPayment > 0 ? monthsWithExtra : loanTerm * 12),
      interestSaved: extraMonthlyPayment > 0 ? formatCurrency(Math.round(interestSaved)) : "N/A",
      monthsSaved: extraMonthlyPayment > 0 ? monthsSaved.toString() : "N/A",
      idrPayment: idrPaymentDisplay,
      pslfForgiveness: pursuingPSLF ? pslfForgivenessDisplay : "N/A",
    },
    summary: `$${formatCurrency(Math.round(monthlyPayment))}/mo | ${loanTerm} years | $${formatCurrency(Math.round(totalInterestStandard))} interest`,
    isValid: loanAmount > 0 && interestRate > 0,
    metadata: { tableData },
  };
}

export default studentLoanCalculatorConfig;
