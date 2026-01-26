import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// COMPOUND FREQUENCIES
// =============================================================================
const COMPOUND_FREQUENCIES = [
  { value: "1", label: "Annually (1/year)" },
  { value: "2", label: "Semi-Annually (2/year)" },
  { value: "4", label: "Quarterly (4/year)" },
  { value: "12", label: "Monthly (12/year)" },
  { value: "52", label: "Weekly (52/year)" },
  { value: "365", label: "Daily (365/year)" },
];

const CONTRIBUTION_FREQUENCIES = [
  { value: "0", label: "None" },
  { value: "12", label: "Monthly" },
  { value: "26", label: "Bi-Weekly" },
  { value: "52", label: "Weekly" },
  { value: "4", label: "Quarterly" },
  { value: "1", label: "Annually" },
];

// =============================================================================
// CONFIG
// =============================================================================
export const compoundInterestConfig: CalculatorConfigV3 = {
  id: "compound-interest-calculator",
  slug: "compound-interest-calculator",
  name: "Compound Interest Calculator",
  category: "finance",
  icon: "💰",

  // ═══════════════════════════════════════════════════════════════════════════
  // SEO
  // ═══════════════════════════════════════════════════════════════════════════
  seo: {
    title: "Compound Interest Calculator - Free Investment Growth Tool",
    description: "Calculate how your investments grow with compound interest. See year-by-year breakdowns, compare compounding frequencies, and plan your financial future. Free calculator with contributions, inflation, and tax adjustments.",
    shortDescription: "Calculate investment growth with compound interest",
    keywords: ["compound interest calculator", "investment calculator", "interest calculator", "savings calculator", "compound growth", "future value calculator", "investment growth"],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HERO
  // ═══════════════════════════════════════════════════════════════════════════
  hero: {
    badge: "Finance",
    rating: { average: 4.9, count: 45200 },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UNIT SYSTEM (not applicable for this calculator)
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
      id: "principal",
      type: "currency",
      label: "Initial Investment",
      required: true,
      defaultValue: 10000,
      min: 0,
      max: 10000000,
      currency: "$",
      helpText: "The amount you're starting with",
      width: "full",
    },
    {
      id: "interestRate",
      type: "slider",
      label: "Annual Interest Rate",
      required: true,
      defaultValue: 7,
      min: 0.1,
      max: 25,
      step: 0.1,
      suffix: "%",
      helpText: "Expected annual rate of return",
      width: "full",
    },
    {
      id: "years",
      type: "slider",
      label: "Investment Period",
      required: true,
      defaultValue: 10,
      min: 1,
      max: 50,
      step: 1,
      suffix: "years",
      width: "full",
    },
    {
      id: "compoundFrequency",
      type: "select",
      label: "Compound Frequency",
      required: true,
      defaultValue: "12",
      options: COMPOUND_FREQUENCIES,
      width: "full",
    },
    {
      id: "contributionAmount",
      type: "currency",
      label: "Regular Contribution",
      required: false,
      defaultValue: 100,
      min: 0,
      max: 100000,
      currency: "$",
      helpText: "Additional amount to add periodically",
      width: "full",
    },
    {
      id: "contributionFrequency",
      type: "select",
      label: "Contribution Frequency",
      required: false,
      defaultValue: "12",
      options: CONTRIBUTION_FREQUENCIES,
      width: "full",
    },
    {
      id: "contributionTiming",
      type: "radio",
      label: "Contribution Timing",
      required: false,
      defaultValue: "end",
      options: [
        { value: "beginning", label: "Beginning of Period" },
        { value: "end", label: "End of Period" },
      ],
      width: "full",
    },
    // Advanced Options
    {
      id: "taxRate",
      type: "slider",
      label: "Tax Rate on Gains",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 50,
      step: 1,
      suffix: "%",
      helpText: "Applied to interest earnings",
      width: "full",
    },
    {
      id: "inflationRate",
      type: "slider",
      label: "Expected Inflation Rate",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 15,
      step: 0.1,
      suffix: "%",
      helpText: "To see inflation-adjusted value",
      width: "full",
    },
  ],

  inputGroups: [
    {
      id: "advanced",
      title: "Advanced Options",
      inputs: ["taxRate", "inflationRate"],
      defaultExpanded: false,
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════════════════
  results: [
    { id: "futureValue", type: "primary", label: "Future Value", format: "text", icon: "💰" },
    { id: "totalContributions", type: "secondary", label: "Total Contributions", format: "text" },
    { id: "totalInterest", type: "secondary", label: "Total Interest Earned", format: "text" },
    { id: "effectiveRate", type: "secondary", label: "Effective Annual Rate", format: "text" },
    { id: "inflationAdjusted", type: "secondary", label: "Inflation-Adjusted Value", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // VISUALIZATIONS
  // ═══════════════════════════════════════════════════════════════════════════
  visualizations: [
    {
      id: "growthBreakdown",
      type: "distribution-bars",
      title: "Investment Breakdown",
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
      id: "growthStats",
      title: "Growth Statistics",
      icon: "📈",
      type: "grid",
      columns: 2,
      items: [
        { label: "Total Return", value: "", color: "green" },
        { label: "Return on Investment", value: "", color: "blue" },
        { label: "Interest vs Principal", value: "", color: "cyan" },
        { label: "Doubling Time", value: "", color: "purple" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // DETAILED TABLE
  // ═══════════════════════════════════════════════════════════════════════════
  detailedTable: {
    id: "yearByYear",
    buttonLabel: "View Year-by-Year Breakdown",
    buttonIcon: "📅",
    modalTitle: "Year-by-Year Growth",
    columns: [
      { id: "year", label: "Year", align: "left" },
      { id: "startBalance", label: "Start Balance", align: "right" },
      { id: "contributions", label: "Contributions", align: "right" },
      { id: "interest", label: "Interest", align: "right", highlight: true },
      { id: "endBalance", label: "End Balance", align: "right", highlight: true },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  educationSections: [
    {
      id: "formula",
      type: "cards",
      title: "The Compound Interest Formula",
      icon: "📐",
      columns: 2,
      cards: [
        { title: "A = P(1 + r/n)^nt", description: "Basic formula without contributions. A = Future Value, P = Principal, r = Annual Rate, n = Compounds/Year, t = Years", icon: "🔢" },
        { title: "With Contributions", description: "PMT × (((1 + r/n)^nt - 1) / (r/n)) is added for regular contributions. PMT = Payment Amount", icon: "➕" },
        { title: "Effective Rate", description: "APY = (1 + r/n)^n - 1. The actual annual return accounting for compounding frequency", icon: "📊" },
        { title: "Rule of 72", description: "Years to double ≈ 72 ÷ Interest Rate. Quick mental math for estimating growth", icon: "⏱️" },
      ],
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "Past performance doesn't guarantee future returns. Market investments can lose value.", type: "warning" },
        { text: "The S&P 500 has historically averaged ~10% annual returns, but with significant year-to-year volatility", type: "info" },
        { text: "High-yield savings accounts offer 4-5% APY with FDIC insurance protection", type: "info" },
        { text: "Inflation (historically ~3%) reduces the real purchasing power of your money", type: "warning" },
        { text: "Tax-advantaged accounts (401k, IRA) can significantly boost long-term growth", type: "info" },
        { text: "Starting early matters more than starting big—time is your greatest ally", type: "info" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "📊",
      description: "$10,000 initial + $100/month at 7% interest, compounded monthly for 10 years",
      columns: 2,
      examples: [
        {
          title: "Principal Growth",
          steps: [
            "P = $10,000",
            "r = 0.07, n = 12, t = 10",
            "A = 10,000 × (1 + 0.07/12)^120",
            "A = 10,000 × 2.0097",
          ],
          result: "Principal grows to: $20,097",
        },
        {
          title: "Contributions Growth",
          steps: [
            "PMT = $100/month",
            "FV = 100 × (((1.00583)^120 - 1) / 0.00583)",
            "FV = 100 × 173.08",
            "Total contributions: $12,000",
          ],
          result: "Contributions grow to: $17,308",
        },
      ],
    },
    {
      id: "whatIsCompoundInterest",
      type: "prose",
      title: "What is Compound Interest?",
      content: "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest (calculated only on the principal), compound interest creates a \"snowball effect\" where your earnings generate their own earnings. Albert Einstein reportedly called it \"the eighth wonder of the world,\" stating that those who understand it earn it, while those who don't pay it. This powerful force can work for you through investments or against you through debt.",
    },
    {
      id: "compoundingFrequency",
      type: "prose",
      title: "How Compounding Frequency Affects Growth",
      content: "The frequency of compounding significantly impacts your returns. Daily compounding earns more than monthly, which earns more than annually—though the differences diminish at lower interest rates. For example, $10,000 at 10% for 10 years yields $25,937 with annual compounding, $27,070 with monthly, and $27,182 with daily. The difference becomes more pronounced over longer periods and higher rates. Most savings accounts compound daily, while many investment accounts compound monthly or quarterly.",
    },
    {
      id: "powerOfTime",
      type: "prose",
      title: "The Power of Starting Early",
      content: "Time is the most powerful factor in compound interest. Someone who invests $5,000/year from age 25-35 (10 years, $50,000 total) and then stops will have more at 65 than someone who invests $5,000/year from age 35-65 (30 years, $150,000 total)—assuming the same return rate. This demonstrates why financial advisors emphasize starting early. Even small amounts invested consistently in your 20s can outperform much larger amounts invested later in life.",
    },
    {
      id: "taxesAndInflation",
      type: "prose",
      title: "Understanding Taxes and Inflation",
      content: "Taxes and inflation are the two forces that erode your compound interest gains. Capital gains taxes (15-20% for long-term, up to 37% for short-term) reduce your actual returns. Tax-advantaged accounts like 401(k)s and IRAs allow your money to compound without annual tax drag. Inflation (historically averaging 3%) reduces your money's purchasing power—a 7% return with 3% inflation is really only 4% in real terms. Always consider your after-tax, inflation-adjusted returns for realistic planning.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // FAQs
  // ═══════════════════════════════════════════════════════════════════════════
  faqs: [
    { question: "What's a realistic interest rate to use?", answer: "For stock market investments, the S&P 500 has historically averaged about 10% annually (7% after inflation). High-yield savings accounts currently offer 4-5% APY. CDs range from 4-5%. Conservative bond portfolios return 3-5%. Be cautious of any claims of consistent returns above 12%—they likely carry significant risk." },
    { question: "How does compound frequency affect my returns?", answer: "More frequent compounding means more growth, but the difference is often smaller than expected. At 5% interest over 10 years, daily vs. annual compounding only adds about 2.5% to your total. The difference is more significant at higher rates and longer periods. Most banks compound daily for savings accounts." },
    { question: "Should I contribute at the beginning or end of the period?", answer: "Contributing at the beginning of each period yields slightly higher returns because your money has more time to compound. However, for most people, the practical difference is small (typically 1-3% more over the investment period). Choose whichever timing fits your budget and cash flow." },
    { question: "What is the Rule of 72?", answer: "The Rule of 72 is a quick way to estimate how long it takes to double your money. Simply divide 72 by your interest rate. At 7% return, your money doubles in approximately 72÷7 = 10.3 years. At 10%, it doubles in about 7.2 years. It's not exact but useful for mental math." },
    { question: "How do taxes affect compound interest?", answer: "In taxable accounts, you may owe taxes on dividends and capital gains annually, which reduces your compounding potential. Tax-advantaged accounts (401k, IRA, Roth IRA) allow tax-free or tax-deferred compounding. The difference can be 20-30% more wealth over 30+ years compared to taxable accounts." },
    { question: "What's the difference between APR and APY?", answer: "APR (Annual Percentage Rate) is the simple interest rate without compounding. APY (Annual Percentage Yield) includes the effect of compounding. A 5% APR compounded monthly equals about 5.12% APY. Always compare APY when evaluating savings accounts or investments." },
    { question: "How much should I invest to reach $1 million?", answer: "With a 7% average return: investing $500/month from age 25 gets you to $1M by 60. Starting at 35, you'd need about $1,000/month. At 45, approximately $2,200/month. This illustrates why starting early is so powerful—the amount you need to invest roughly doubles every 10 years you delay." },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════════════════
  references: [
    { authors: "U.S. Securities and Exchange Commission", year: "2024", title: "Compound Interest Calculator", source: "Investor.gov", url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator" },
    { authors: "Damodaran, Aswath", year: "2024", title: "Historical Returns on Stocks, Bonds and Bills", source: "NYU Stern School of Business" },
    { authors: "Federal Reserve", year: "2024", title: "Interest Rates and Inflation Data", source: "Federal Reserve Economic Data (FRED)" },
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
      title: "Plan Your Retirement",
      description: "See how compound interest builds your retirement nest egg.",
      linkText: "Try Retirement Calculator →",
      link: "/retirement-calculator",
    },
  },

  features: {
    autoCalculate: true,
    saveHistory: true,
    exportPDF: true,
    shareResults: true,
  },

  relatedCalculators: ["savings-calculator", "retirement-calculator", "investment-calculator", "mortgage-calculator"],

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
export function calculateCompoundInterest(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;

  const principal = (values.principal as number) || 10000;
  const interestRate = ((values.interestRate as number) || 7) / 100;
  const years = (values.years as number) || 10;
  const compoundFrequency = parseInt((values.compoundFrequency as string) || "12");
  const contributionAmount = (values.contributionAmount as number) || 0;
  const contributionFrequency = parseInt((values.contributionFrequency as string) || "12");
  const contributionTiming = (values.contributionTiming as string) || "end";
  const taxRate = ((values.taxRate as number) || 0) / 100;
  const inflationRate = ((values.inflationRate as number) || 0) / 100;

  // Calculate periodic rate
  const periodicRate = interestRate / compoundFrequency;
  const totalPeriods = compoundFrequency * years;

  // Future Value of Principal
  const fvPrincipal = principal * Math.pow(1 + periodicRate, totalPeriods);

  // Future Value of Contributions
  let fvContributions = 0;
  let totalContributions = principal;

  if (contributionAmount > 0 && contributionFrequency > 0) {
    const contributionsPerYear = contributionFrequency;
    const totalContributionPayments = contributionsPerYear * years;
    
    // Convert contribution to match compounding periods
    const periodsPerContribution = compoundFrequency / contributionsPerYear;
    const contributionPeriodicRate = interestRate / contributionsPerYear;
    
    if (contributionTiming === "beginning") {
      // Beginning of period - ordinary annuity due
      fvContributions = contributionAmount * 
        ((Math.pow(1 + contributionPeriodicRate, totalContributionPayments) - 1) / contributionPeriodicRate) *
        (1 + contributionPeriodicRate);
    } else {
      // End of period - ordinary annuity
      fvContributions = contributionAmount * 
        ((Math.pow(1 + contributionPeriodicRate, totalContributionPayments) - 1) / contributionPeriodicRate);
    }
    
    totalContributions = principal + (contributionAmount * totalContributionPayments);
  }

  const futureValue = fvPrincipal + fvContributions;
  const totalInterest = futureValue - totalContributions;

  // Apply tax on interest (simplified)
  const afterTaxInterest = totalInterest * (1 - taxRate);
  const afterTaxFutureValue = totalContributions + afterTaxInterest;

  // Inflation-adjusted value
  const inflationAdjustedValue = futureValue / Math.pow(1 + inflationRate, years);

  // Effective Annual Rate (APY)
  const effectiveRate = Math.pow(1 + periodicRate, compoundFrequency) - 1;

  // Calculate year-by-year data for detailed table
  const tableData: Array<{
    year: string;
    startBalance: string;
    contributions: string;
    interest: string;
    endBalance: string;
  }> = [];

  let balance = principal;
  const yearlyContribution = contributionAmount * contributionFrequency;

  for (let y = 1; y <= years; y++) {
    const startBalance = balance;
    const yearContrib = yearlyContribution;
    
    // Simplified year-end calculation
    let yearEndBalance: number;
    if (contributionTiming === "beginning") {
      yearEndBalance = (startBalance + yearContrib) * Math.pow(1 + periodicRate, compoundFrequency);
    } else {
      // Contributions spread throughout year
      yearEndBalance = startBalance * Math.pow(1 + periodicRate, compoundFrequency);
      if (contributionAmount > 0 && contributionFrequency > 0) {
        yearEndBalance += contributionAmount * 
          ((Math.pow(1 + interestRate / contributionFrequency, contributionFrequency) - 1) / (interestRate / contributionFrequency));
      }
    }
    
    const yearInterest = yearEndBalance - startBalance - yearContrib;
    
    tableData.push({
      year: `Year ${y}`,
      startBalance: formatCurrency(startBalance),
      contributions: formatCurrency(yearContrib),
      interest: formatCurrency(yearInterest),
      endBalance: formatCurrency(yearEndBalance),
    });
    
    balance = yearEndBalance;
  }

  // Rule of 72 - years to double
  const yearsToDouble = 72 / (interestRate * 100);

  // ROI
  const roi = ((futureValue - totalContributions) / totalContributions) * 100;

  // Breakdown for visualization
  const breakdown = [
    { id: "principal", label: "Initial Investment", value: principal, displayValue: formatCurrency(principal) },
    { id: "contributions", label: "Total Contributions", value: totalContributions - principal, displayValue: formatCurrency(totalContributions - principal) },
    { id: "interest", label: "Interest Earned", value: totalInterest, displayValue: formatCurrency(totalInterest) },
  ];

  // Growth stats for info card
  const growthStats = [
    { label: "Total Return", value: formatCurrency(totalInterest), color: "green" },
    { label: "Return on Investment", value: `${roi.toFixed(1)}%`, color: "blue" },
    { label: "Interest vs Principal", value: `${((totalInterest / principal) * 100).toFixed(0)}%`, color: "cyan" },
    { label: "Doubling Time", value: `~${yearsToDouble.toFixed(1)} years`, color: "purple" },
  ];

  return {
    values: {
      futureValue,
      totalContributions,
      totalInterest,
      effectiveRate,
      inflationAdjustedValue,
      afterTaxFutureValue,
      yearsToDouble,
      roi,
    },
    formatted: {
      futureValue: formatCurrency(futureValue),
      totalContributions: formatCurrency(totalContributions),
      totalInterest: formatCurrency(totalInterest),
      effectiveRate: `${(effectiveRate * 100).toFixed(2)}% APY`,
      inflationAdjusted: inflationRate > 0 ? formatCurrency(inflationAdjustedValue) : "—",
    },
    summary: `After ${years} years, your investment of ${formatCurrency(totalContributions)} will grow to ${formatCurrency(futureValue)}. You'll earn ${formatCurrency(totalInterest)} in interest (${roi.toFixed(0)}% return).`,
    isValid: true,
    metadata: {
      tableData,
      breakdown,
      growthStats,
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

export default compoundInterestConfig;
