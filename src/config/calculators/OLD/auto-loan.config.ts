import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// LOAN TERMS
// =============================================================================
const LOAN_TERMS = [
  { value: "24", label: "24 months (2 years)" },
  { value: "36", label: "36 months (3 years)" },
  { value: "48", label: "48 months (4 years)" },
  { value: "60", label: "60 months (5 years)" },
  { value: "72", label: "72 months (6 years)" },
  { value: "84", label: "84 months (7 years)" },
];

// =============================================================================
// CONFIG
// =============================================================================
export const autoLoanConfig: CalculatorConfigV3 = {
  id: "auto-loan-calculator",
  slug: "auto-loan-calculator",
  name: "Auto Loan Calculator",
  category: "finance",
  icon: "🚗",

  // ═══════════════════════════════════════════════════════════════════════════
  // SEO
  // ═══════════════════════════════════════════════════════════════════════════
  seo: {
    title: "Auto Loan Calculator - Car Payment & Amortization Schedule",
    description: "Calculate your monthly car payment, total interest, and see a full amortization schedule. Compare loan terms, factor in trade-in value, taxes, and fees. Free auto loan calculator.",
    shortDescription: "Calculate monthly car payments and loan costs",
    keywords: ["auto loan calculator", "car payment calculator", "car loan calculator", "auto financing", "amortization schedule", "car payment estimator", "vehicle loan"],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HERO
  // ═══════════════════════════════════════════════════════════════════════════
  hero: {
    badge: "Finance",
    rating: { average: 4.8, count: 32400 },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UNIT SYSTEM
  // ═══════════════════════════════════════════════════════════════════════════
  unitSystem: {
    enabled: false,
    default: "imperial",
    options: [],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════════════════
  inputs: [
    {
      id: "vehiclePrice",
      type: "currency",
      label: "Vehicle Price",
      required: true,
      defaultValue: 35000,
      min: 1000,
      max: 500000,
      currency: "$",
      helpText: "Total purchase price of the vehicle",
      width: "full",
    },
    {
      id: "downPayment",
      type: "currency",
      label: "Down Payment",
      required: false,
      defaultValue: 5000,
      min: 0,
      max: 200000,
      currency: "$",
      helpText: "Cash you'll pay upfront",
      width: "half",
    },
    {
      id: "tradeInValue",
      type: "currency",
      label: "Trade-in Value",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 100000,
      currency: "$",
      helpText: "Value of your current vehicle",
      width: "half",
    },
    {
      id: "loanTerm",
      type: "select",
      label: "Loan Term",
      required: true,
      defaultValue: "60",
      options: LOAN_TERMS,
      width: "full",
    },
    {
      id: "interestRate",
      type: "slider",
      label: "Interest Rate (APR)",
      required: true,
      defaultValue: 6.5,
      min: 0,
      max: 25,
      step: 0.1,
      suffix: "%",
      helpText: "Annual Percentage Rate",
      width: "full",
    },
    // Advanced Options
    {
      id: "salesTax",
      type: "slider",
      label: "Sales Tax Rate",
      required: false,
      defaultValue: 6,
      min: 0,
      max: 15,
      step: 0.25,
      suffix: "%",
      helpText: "State/local sales tax on vehicle",
      width: "full",
    },
    {
      id: "fees",
      type: "currency",
      label: "Title, Registration & Fees",
      required: false,
      defaultValue: 500,
      min: 0,
      max: 5000,
      currency: "$",
      helpText: "DMV fees, doc fees, etc.",
      width: "full",
    },
    {
      id: "includeTaxInLoan",
      type: "radio",
      label: "Include Tax & Fees in Loan?",
      required: false,
      defaultValue: "yes",
      options: [
        { value: "yes", label: "Yes, finance them" },
        { value: "no", label: "No, pay upfront" },
      ],
      width: "full",
    },
  ],

  inputGroups: [
    {
      id: "taxesAndFees",
      title: "Taxes & Fees",
      inputs: ["salesTax", "fees", "includeTaxInLoan"],
      defaultExpanded: false,
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════════════════
  results: [
    { id: "monthlyPayment", type: "primary", label: "Monthly Payment", format: "text", icon: "💵" },
    { id: "loanAmount", type: "secondary", label: "Loan Amount", format: "text" },
    { id: "totalInterest", type: "secondary", label: "Total Interest", format: "text" },
    { id: "totalCost", type: "secondary", label: "Total Cost", format: "text" },
    { id: "payoffDate", type: "secondary", label: "Payoff Date", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // VISUALIZATIONS
  // ═══════════════════════════════════════════════════════════════════════════
  visualizations: [
    {
      id: "costBreakdown",
      type: "distribution-bars",
      title: "Cost Breakdown",
      icon: "📊",
      distributionBars: {
        dataKey: "breakdown",
        labelField: "label",
        valueField: "value",
        maxValue: 0,
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // INFO CARDS
  // ═══════════════════════════════════════════════════════════════════════════
  infoCards: [
    {
      id: "loanSummary",
      title: "Loan Summary",
      icon: "📋",
      type: "grid",
      columns: 2,
      items: [
        { label: "Down Payment", value: "", color: "green" },
        { label: "Trade-in Credit", value: "", color: "blue" },
        { label: "Amount Financed", value: "", color: "cyan" },
        { label: "Interest Cost", value: "", color: "red" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // DETAILED TABLE - AMORTIZATION SCHEDULE
  // ═══════════════════════════════════════════════════════════════════════════
  detailedTable: {
    id: "amortizationSchedule",
    buttonLabel: "View Amortization Schedule",
    buttonIcon: "📅",
    modalTitle: "Loan Amortization Schedule",
    columns: [
      { id: "month", label: "Month", align: "left" },
      { id: "payment", label: "Payment", align: "right" },
      { id: "principal", label: "Principal", align: "right" },
      { id: "interest", label: "Interest", align: "right", highlight: true },
      { id: "balance", label: "Balance", align: "right", highlight: true },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  educationSections: [
    {
      id: "loanTerms",
      type: "cards",
      title: "Understanding Loan Terms",
      icon: "📚",
      columns: 2,
      cards: [
        { title: "Short Term (24-36 mo)", description: "Higher payments but less total interest. Best if you can afford higher monthly payments.", icon: "⚡" },
        { title: "Medium Term (48-60 mo)", description: "Balance between payment size and total cost. Most popular choice for new cars.", icon: "⚖️" },
        { title: "Long Term (72-84 mo)", description: "Lower payments but more total interest. Risk of being upside-down on your loan.", icon: "⏳" },
        { title: "APR vs Interest Rate", description: "APR includes fees and gives the true cost of borrowing. Always compare APRs, not just rates.", icon: "📊" },
      ],
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "Longer loan terms mean lower payments but significantly more interest paid overall", type: "warning" },
        { text: "A 20% down payment helps avoid being 'upside-down' (owing more than car is worth)", type: "info" },
        { text: "New car loans typically have lower rates (3-7%) than used car loans (5-10%)", type: "info" },
        { text: "Your credit score significantly impacts your interest rate—check before shopping", type: "info" },
        { text: "Some states don't charge sales tax on vehicles: Alaska, Delaware, Montana, New Hampshire, Oregon", type: "info" },
        { text: "Gap insurance may be worth considering if your down payment is less than 20%", type: "warning" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "📊",
      description: "$35,000 vehicle with $5,000 down, 60 months at 6.5% APR",
      columns: 2,
      examples: [
        {
          title: "Calculate Loan Amount",
          steps: [
            "Vehicle Price: $35,000",
            "Down Payment: -$5,000",
            "Sales Tax (6%): +$2,100",
            "Fees: +$500",
          ],
          result: "Loan Amount: $32,600",
        },
        {
          title: "Calculate Monthly Payment",
          steps: [
            "Principal: $32,600",
            "Monthly Rate: 6.5% / 12 = 0.542%",
            "Term: 60 months",
            "PMT = P × [r(1+r)^n] / [(1+r)^n - 1]",
          ],
          result: "Monthly Payment: $636.51",
        },
      ],
    },
    {
      id: "whatIsAmortization",
      type: "prose",
      title: "What is Loan Amortization?",
      content: "Amortization is the process of paying off a loan through regular installment payments. Each payment consists of two parts: principal (the original loan amount) and interest (the cost of borrowing). In the early months of your loan, most of your payment goes toward interest. As the loan progresses, more of each payment goes toward paying down the principal. This is why making extra payments early in the loan can save significant money on interest.",
    },
    {
      id: "newVsUsed",
      type: "prose",
      title: "New vs Used Car Financing",
      content: "New cars typically qualify for lower interest rates (sometimes 0% promotional rates from manufacturers) but depreciate faster—losing 20-30% of value in the first year. Used cars have higher interest rates but less depreciation risk. A 2-3 year old certified pre-owned vehicle often offers the best value, combining lower purchase price with manufacturer warranty coverage. Always get pre-approved from your bank or credit union before visiting dealerships to have negotiating leverage.",
    },
    {
      id: "avoidUpsideDown",
      type: "prose",
      title: "Avoiding Being Upside-Down",
      content: "Being 'upside-down' or 'underwater' means owing more on your loan than your car is worth. This happens when depreciation outpaces your loan payoff. To avoid this: make at least a 20% down payment, choose the shortest loan term you can afford, and avoid rolling negative equity from a previous loan into a new one. If you're already upside-down, consider making extra principal payments or keeping the car until you're right-side up.",
    },
    {
      id: "dealerVsBankLoans",
      type: "prose",
      title: "Dealer Financing vs Bank/Credit Union",
      content: "Dealer financing is convenient but may not offer the best rate. Banks and credit unions often have lower rates, especially for members with good credit. Get pre-approved before visiting the dealer—this gives you negotiating power and a backup option. Some manufacturers offer 0% or low-rate financing on new cars, which can beat any bank rate. Always compare the total cost of the loan, not just the monthly payment, when evaluating offers.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // FAQs
  // ═══════════════════════════════════════════════════════════════════════════
  faqs: [
    { question: "What's a good interest rate for a car loan?", answer: "As of 2024, good rates are: Excellent credit (750+): 4-6% for new, 5-7% for used. Good credit (700-749): 6-8% for new, 7-10% for used. Fair credit (650-699): 9-13%. Poor credit (below 650): 14-20%+. Rates vary by lender, so always shop around and get pre-approved." },
    { question: "Should I choose a longer loan term for lower payments?", answer: "While tempting, longer terms (72-84 months) cost significantly more in interest. A $30,000 loan at 6% costs $3,481 in interest over 48 months but $5,797 over 72 months—66% more! Longer terms also increase the risk of being upside-down. Choose the shortest term you can comfortably afford." },
    { question: "How much should I put down on a car?", answer: "Aim for at least 20% down to avoid being upside-down immediately due to depreciation. For a $35,000 car, that's $7,000. If you can't afford 20%, at least cover the sales tax and fees out of pocket so you're not financing those costs. Any down payment reduces your loan amount and total interest." },
    { question: "Is 0% financing really free?", answer: "Manufacturer 0% financing can be a great deal, but check if you're giving up a cash rebate. Sometimes taking the rebate and getting a low-rate loan from a bank results in lower total cost. Also, 0% offers require excellent credit (usually 720+) and are typically only for new cars with specific terms." },
    { question: "What fees are typically included in a car loan?", answer: "Common fees include: Documentation fee ($100-700), Title and registration (varies by state), Destination charge (new cars, ~$1,000-1,500), and Dealer add-ons. Sales tax is usually 5-10% of purchase price. Some fees are negotiable (doc fee, add-ons), while others are fixed (title, registration, tax)." },
    { question: "Should I pay off my car loan early?", answer: "Usually yes! Paying extra toward principal saves interest. Check for prepayment penalties (rare but possible). One strategy: round up payments ($487 → $500) or make one extra payment per year. However, if your rate is very low (under 4%), investing the extra money might yield better returns." },
    { question: "What's the difference between APR and interest rate?", answer: "The interest rate is the cost of borrowing the principal. APR (Annual Percentage Rate) includes the interest rate plus fees, giving you the true cost of the loan. A loan with a 5% rate but $1,000 in fees might have a 5.5% APR. Always compare APRs, not just interest rates." },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════════════════
  references: [
    { authors: "Consumer Financial Protection Bureau", year: "2024", title: "Shopping for an Auto Loan", source: "CFPB.gov", url: "https://www.consumerfinance.gov/consumer-tools/auto-loans/" },
    { authors: "Federal Reserve", year: "2024", title: "Consumer Credit - G.19", source: "Federal Reserve Statistical Release" },
    { authors: "Edmunds", year: "2024", title: "Auto Loan Interest Rates", source: "Edmunds.com", url: "https://www.edmunds.com/car-loan/" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SIDEBAR & FEATURES
  // ═══════════════════════════════════════════════════════════════════════════
  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: true,
    category: "finance",
    cta: {
      title: "Calculate Total Cost of Ownership",
      description: "Factor in insurance, gas, and maintenance costs.",
      linkText: "Try Fuel Cost Calculator →",
      link: "/fuel-cost-calculator",
    },
  },

  features: {
    autoCalculate: true,
    saveHistory: true,
    exportPDF: true,
    shareResults: true,
  },

  relatedCalculators: ["loan-calculator", "mortgage-calculator", "fuel-cost-calculator", "compound-interest-calculator"],

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
export function calculateAutoLoan(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;

  const vehiclePrice = (values.vehiclePrice as number) || 35000;
  const downPayment = (values.downPayment as number) || 0;
  const tradeInValue = (values.tradeInValue as number) || 0;
  const loanTermMonths = parseInt((values.loanTerm as string) || "60");
  const interestRate = ((values.interestRate as number) || 6.5) / 100;
  const salesTaxRate = ((values.salesTax as number) || 0) / 100;
  const fees = (values.fees as number) || 0;
  const includeTaxInLoan = (values.includeTaxInLoan as string) === "yes";

  // Calculate taxable amount (usually vehicle price minus trade-in in most states)
  const taxableAmount = vehiclePrice - tradeInValue;
  const salesTax = taxableAmount * salesTaxRate;

  // Calculate total out-the-door price
  const totalPrice = vehiclePrice + salesTax + fees;

  // Calculate loan amount
  let loanAmount: number;
  if (includeTaxInLoan) {
    loanAmount = totalPrice - downPayment - tradeInValue;
  } else {
    loanAmount = vehiclePrice - downPayment - tradeInValue;
  }

  // Ensure loan amount is positive
  loanAmount = Math.max(0, loanAmount);

  // Calculate monthly payment using PMT formula
  const monthlyRate = interestRate / 12;
  let monthlyPayment: number;
  let totalInterest: number;

  if (monthlyRate === 0) {
    // 0% interest
    monthlyPayment = loanAmount / loanTermMonths;
    totalInterest = 0;
  } else {
    monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) / 
                     (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
    totalInterest = (monthlyPayment * loanTermMonths) - loanAmount;
  }

  const totalCost = monthlyPayment * loanTermMonths;

  // Calculate payoff date
  const today = new Date();
  const payoffDate = new Date(today.setMonth(today.getMonth() + loanTermMonths));
  const payoffDateStr = payoffDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  // Generate amortization schedule
  const tableData: Array<{
    month: string;
    payment: string;
    principal: string;
    interest: string;
    balance: string;
  }> = [];

  let balance = loanAmount;
  for (let m = 1; m <= loanTermMonths; m++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance = Math.max(0, balance - principalPayment);

    // Show every month for short loans, or every 6 months for longer loans
    const showMonth = loanTermMonths <= 36 || m === 1 || m % 6 === 0 || m === loanTermMonths;
    
    if (showMonth) {
      tableData.push({
        month: `Month ${m}`,
        payment: formatCurrency(monthlyPayment),
        principal: formatCurrency(principalPayment),
        interest: formatCurrency(interestPayment),
        balance: formatCurrency(balance),
      });
    }
  }

  // Cost breakdown for visualization
  const breakdown = [
    { id: "principal", label: "Principal (Loan Amount)", value: loanAmount, displayValue: formatCurrency(loanAmount) },
    { id: "interest", label: "Total Interest", value: totalInterest, displayValue: formatCurrency(totalInterest) },
    { id: "downPayment", label: "Down Payment", value: downPayment, displayValue: formatCurrency(downPayment) },
    { id: "tradeIn", label: "Trade-in Value", value: tradeInValue, displayValue: formatCurrency(tradeInValue) },
  ];

  // Loan summary for info card
  const loanSummary = [
    { label: "Down Payment", value: formatCurrency(downPayment), color: "green" },
    { label: "Trade-in Credit", value: formatCurrency(tradeInValue), color: "blue" },
    { label: "Amount Financed", value: formatCurrency(loanAmount), color: "cyan" },
    { label: "Interest Cost", value: formatCurrency(totalInterest), color: "red" },
  ];

  return {
    values: {
      monthlyPayment,
      loanAmount,
      totalInterest,
      totalCost,
      vehiclePrice,
      salesTax,
      fees,
    },
    formatted: {
      monthlyPayment: formatCurrency(monthlyPayment),
      loanAmount: formatCurrency(loanAmount),
      totalInterest: formatCurrency(totalInterest),
      totalCost: formatCurrency(totalCost),
      payoffDate: payoffDateStr,
    },
    summary: `Your monthly payment is ${formatCurrency(monthlyPayment)} for ${loanTermMonths} months. Total interest: ${formatCurrency(totalInterest)}. Loan payoff: ${payoffDateStr}.`,
    isValid: true,
    metadata: {
      tableData,
      breakdown,
      loanSummary,
    },
  };
}

// Helper function
function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export default autoLoanConfig;
