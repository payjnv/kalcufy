import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// HISTORICAL RETURN RATES (Based on Research)
// =============================================================================
const INVESTMENT_TYPES = [
  { value: "sp500", label: "S&P 500 Index Fund", rate: 10, description: "Large-cap US stocks" },
  { value: "total_market", label: "Total Stock Market", rate: 10, description: "All US stocks" },
  { value: "balanced", label: "Balanced Fund (60/40)", rate: 7, description: "60% stocks, 40% bonds" },
  { value: "conservative", label: "Conservative (40/60)", rate: 5, description: "40% stocks, 60% bonds" },
  { value: "aggressive", label: "Aggressive Growth", rate: 11, description: "Growth stocks, emerging markets" },
  { value: "bonds", label: "Bond Fund", rate: 4, description: "Corporate & government bonds" },
  { value: "custom", label: "Custom Rate", rate: 7, description: "Enter your own rate" },
];

const COMPOUND_FREQUENCIES = [
  { value: "365", label: "Daily (365/year)" },
  { value: "12", label: "Monthly (12/year)" },
  { value: "4", label: "Quarterly (4/year)" },
  { value: "1", label: "Annually (1/year)" },
];

// =============================================================================
// CONFIG
// =============================================================================
export const investmentCalculatorConfig: CalculatorConfigV3 = {
  id: "investment-calculator",
  slug: "investment-calculator",
  name: "Investment Calculator",
  category: "finance",
  icon: "📈",

  // ═══════════════════════════════════════════════════════════════════════════
  // SEO
  // ═══════════════════════════════════════════════════════════════════════════
  seo: {
    title: "Investment Calculator - Calculate Growth & Returns | Free Tool",
    description: "Calculate how your investments will grow over time with compound interest. See future value, compare investment types, factor in inflation and taxes. Free investment growth calculator.",
    shortDescription: "Calculate investment growth and compound returns",
    keywords: ["investment calculator", "compound interest", "investment growth", "ROI calculator", "stock market returns", "retirement calculator", "future value calculator"],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HERO
  // ═══════════════════════════════════════════════════════════════════════════
  hero: {
    badge: "Finance",
    rating: { average: 4.9, count: 52400 },
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
  // CALCULATION MODES
  // ═══════════════════════════════════════════════════════════════════════════
  calculationModes: {
    enabled: true,
    default: "growth",
    style: "buttons",
    modes: [
      { id: "growth", label: "Investment Growth", icon: "📈", description: "Project future value of investments" },
      { id: "goal", label: "Reach a Goal", icon: "🎯", description: "Calculate how to reach a target amount" },
      { id: "compare", label: "Compare Returns", icon: "⚖️", description: "Compare different investment scenarios" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════════════════
  inputs: [
    // === ALL MODES: Investment Type Selection ===
    {
      id: "investmentType",
      type: "select",
      label: "Investment Type",
      required: true,
      defaultValue: "sp500",
      options: INVESTMENT_TYPES.map(t => ({ value: t.value, label: t.label })),
      helpText: "Select a preset or choose Custom Rate",
      width: "full",
      modes: ["growth", "goal"],
    },
    // === GROWTH MODE INPUTS ===
    {
      id: "initialInvestment",
      type: "currency",
      label: "Initial Investment",
      required: true,
      defaultValue: 10000,
      min: 0,
      max: 10000000,
      currency: "$",
      helpText: "Amount you're starting with",
      width: "full",
      modes: ["growth", "goal", "compare"],
    },
    {
      id: "monthlyContribution",
      type: "currency",
      label: "Monthly Contribution",
      required: false,
      defaultValue: 500,
      min: 0,
      max: 100000,
      currency: "$",
      helpText: "Amount you'll invest each month",
      width: "full",
      modes: ["growth", "compare"],
    },
    {
      id: "annualReturn",
      type: "slider",
      label: "Expected Annual Return",
      required: true,
      defaultValue: 10,
      min: 1,
      max: 15,
      step: 0.5,
      suffix: "%",
      helpText: "S&P 500 avg: 10%, Bonds: 4-5%, Balanced: 7%",
      width: "full",
      modes: ["growth", "goal", "compare"],
    },
    {
      id: "investmentYears",
      type: "slider",
      label: "Investment Period",
      required: true,
      defaultValue: 20,
      min: 1,
      max: 50,
      step: 1,
      suffix: "years",
      helpText: "How long you'll stay invested",
      width: "full",
      modes: ["growth", "compare"],
    },
    {
      id: "compoundFrequency",
      type: "select",
      label: "Compound Frequency",
      required: true,
      defaultValue: "12",
      options: COMPOUND_FREQUENCIES,
      width: "full",
      modes: ["growth", "goal"],
    },
    // === GOAL MODE INPUTS ===
    {
      id: "targetAmount",
      type: "currency",
      label: "Target Amount",
      required: true,
      defaultValue: 1000000,
      min: 1000,
      max: 100000000,
      currency: "$",
      helpText: "The amount you want to reach",
      width: "full",
      modes: ["goal"],
    },
    // === COMPARE MODE INPUTS ===
    {
      id: "compareReturn1",
      type: "slider",
      label: "Scenario A Return Rate",
      required: true,
      defaultValue: 7,
      min: 1,
      max: 15,
      step: 0.5,
      suffix: "%",
      helpText: "Conservative estimate",
      width: "full",
      modes: ["compare"],
    },
    {
      id: "compareReturn2",
      type: "slider",
      label: "Scenario B Return Rate",
      required: true,
      defaultValue: 10,
      min: 1,
      max: 15,
      step: 0.5,
      suffix: "%",
      helpText: "Aggressive estimate",
      width: "full",
      modes: ["compare"],
    },
    // === ADVANCED OPTIONS (collapsed by default in inputGroups) ===
    {
      id: "inflationRate",
      type: "slider",
      label: "Expected Inflation Rate",
      required: false,
      defaultValue: 3,
      min: 0,
      max: 10,
      step: 0.5,
      suffix: "%",
      helpText: "Historical average: 3%",
      width: "full",
    },
    {
      id: "taxRate",
      type: "slider",
      label: "Capital Gains Tax Rate",
      required: false,
      defaultValue: 15,
      min: 0,
      max: 40,
      step: 1,
      suffix: "%",
      helpText: "Long-term capital gains: 0-20%",
      width: "full",
    },
    {
      id: "annualIncrease",
      type: "slider",
      label: "Annual Contribution Increase",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 10,
      step: 1,
      suffix: "%",
      helpText: "Increase contributions each year",
      width: "full",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // INPUT GROUPS (Advanced Options - collapsible)
  // ═══════════════════════════════════════════════════════════════════════════
  inputGroups: [
    {
      id: "advancedOptions",
      title: "Advanced Options",
      defaultExpanded: false,
      inputs: ["inflationRate", "taxRate", "annualIncrease"],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════════════════
  results: [
    { id: "futureValue", type: "primary", label: "Future Value", format: "text" },
    { id: "totalContributions", type: "secondary", label: "Total Contributions", format: "text" },
    { id: "totalEarnings", type: "secondary", label: "Total Earnings", format: "text" },
    { id: "effectiveAPY", type: "secondary", label: "Effective APY", format: "text" },
    { id: "inflationAdjusted", type: "secondary", label: "Inflation-Adjusted Value", format: "text" },
    { id: "afterTaxValue", type: "secondary", label: "After-Tax Value", format: "text" },
    // Goal mode results
    { id: "yearsToGoal", type: "secondary", label: "Time to Goal", format: "text" },
    { id: "monthlyNeeded", type: "secondary", label: "Monthly Contribution Needed", format: "text" },
    // Compare mode results
    { id: "scenarioA", type: "secondary", label: "Scenario A Value", format: "text" },
    { id: "scenarioB", type: "secondary", label: "Scenario B Value", format: "text" },
    { id: "difference", type: "secondary", label: "Difference", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  educationSections: [
    // Historical Returns Table as Cards
    {
      id: "historicalReturns",
      type: "cards",
      title: "Historical S&P 500 Returns",
      icon: "📊",
      columns: 2,
      cards: [
        { title: "10-Year Average", description: "S&P 500: 14.7% nominal, 11.1% real (after inflation)", icon: "📈" },
        { title: "20-Year Average", description: "S&P 500: 11.1% nominal, 8.4% real (after inflation)", icon: "📈" },
        { title: "30-Year Average", description: "S&P 500: 10.4% nominal, 7.7% real (after inflation)", icon: "📈" },
        { title: "100-Year Average", description: "S&P 500: 10.5% nominal, 7.3% real (after inflation)", icon: "📈" },
      ],
    },
    // Cards - Investment Strategies
    {
      id: "investmentStrategies",
      type: "cards",
      title: "Investment Strategies",
      icon: "💡",
      columns: 2,
      cards: [
        {
          title: "Start Early",
          description: "Time is your greatest asset. Starting 10 years earlier can double your final amount due to compound interest.",
          icon: "⏰",
        },
        {
          title: "Dollar-Cost Averaging",
          description: "Invest a fixed amount regularly regardless of market conditions. This reduces timing risk and emotional decisions.",
          icon: "📅",
        },
        {
          title: "Diversification",
          description: "Spread investments across different asset classes (stocks, bonds, real estate) to reduce risk.",
          icon: "🎯",
        },
        {
          title: "Keep Costs Low",
          description: "Choose low-cost index funds (0.03-0.20% expense ratio) over actively managed funds (0.5-1.5%).",
          icon: "💰",
        },
      ],
    },
    // List - Important Considerations (REQUIRED)
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "Past performance does not guarantee future results. Market returns vary significantly year to year.", type: "warning" },
        { text: "The S&P 500 has never lost money over any 20-year period in history.", type: "info" },
        { text: "Inflation erodes purchasing power. A 10% return with 3% inflation equals ~7% real return.", type: "info" },
        { text: "Tax-advantaged accounts (401k, IRA, Roth IRA) can significantly boost long-term returns.", type: "info" },
        { text: "Emergency fund (3-6 months expenses) should be established before aggressive investing.", type: "warning" },
        { text: "Consider your risk tolerance and time horizon when choosing investments.", type: "info" },
      ],
    },
    // Code Example - Calculation (REQUIRED)
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example: $10,000 + $500/month for 20 years",
      icon: "📊",
      description: "See how different return rates affect your final balance",
      columns: 2,
      examples: [
        {
          title: "Conservative (7%)",
          steps: [
            "Initial: $10,000",
            "Monthly: $500 × 240 months = $120,000",
            "Total invested: $130,000",
            "Compound growth at 7%...",
            "Future Value: $283,382",
            "Earnings: $153,382 (118% gain)",
          ],
          result: "Total: $283,382",
        },
        {
          title: "S&P 500 Average (10%)",
          steps: [
            "Initial: $10,000",
            "Monthly: $500 × 240 months = $120,000",
            "Total invested: $130,000",
            "Compound growth at 10%...",
            "Future Value: $416,114",
            "Earnings: $286,114 (220% gain)",
          ],
          result: "Total: $416,114",
        },
      ],
    },
    // Prose - What is Compound Interest
    {
      id: "compoundInterest",
      type: "prose",
      title: "The Power of Compound Interest",
      content: "Compound interest is often called the 'eighth wonder of the world.' It's the process where your investment earns returns, and then those returns earn additional returns. Over time, this creates exponential growth. The Rule of 72 provides a quick estimate: divide 72 by your expected return rate to find how many years it takes to double your money. At 10% annual returns, your money doubles roughly every 7.2 years.",
    },
    // Prose - Market Returns
    {
      id: "marketReturns",
      type: "prose",
      title: "Understanding Market Returns",
      content: "The S&P 500 has returned an average of 10-11% annually over the past century (about 7% after inflation). However, returns vary dramatically year to year—from +54% in 1933 to -47% in 1931. In recent decades, we've seen -38% in 2008 and +29% in 2019. This volatility is why long-term investing (10+ years) is recommended for stocks, allowing time to recover from downturns.",
    },
    // Prose - Investment Vehicles
    {
      id: "investmentVehicles",
      type: "prose",
      title: "Choosing Investment Vehicles",
      content: "Index funds and ETFs tracking the S&P 500 or total market offer broad diversification at minimal cost (expense ratios as low as 0.03%). Actively managed funds typically charge 0.5-1.5% and rarely outperform indexes over long periods. For retirement savings, tax-advantaged accounts like 401(k)s and IRAs provide significant benefits—either tax-deferred growth (traditional) or tax-free withdrawals (Roth).",
    },
    // Prose - Risk and Time
    {
      id: "riskAndTime",
      type: "prose",
      title: "Risk, Time, and Asset Allocation",
      content: "Your investment mix should reflect your time horizon and risk tolerance. A common rule: subtract your age from 110 to get your stock percentage. A 30-year-old might hold 80% stocks, 20% bonds. As you approach retirement, gradually shift toward bonds for stability. Remember: the biggest risk for young investors isn't volatility—it's not investing at all and missing decades of compound growth.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // FAQs
  // ═══════════════════════════════════════════════════════════════════════════
  faqs: [
    {
      question: "What return rate should I use for my calculations?",
      answer: "For stock investments, 7-10% is reasonable based on historical S&P 500 returns. Use 7% for conservative planning (after inflation) or 10% for nominal returns. For bonds, use 4-5%. For a balanced portfolio, 6-7% is typical.",
    },
    {
      question: "How much should I invest monthly?",
      answer: "Financial advisors typically recommend saving 10-15% of your income for retirement. If your employer matches 401(k) contributions, always contribute enough to get the full match—it's free money with 100% immediate return.",
    },
    {
      question: "What's the difference between nominal and real returns?",
      answer: "Nominal returns are the raw percentage gain. Real returns subtract inflation (typically 2-3% historically). If your investment returns 10% and inflation is 3%, your real purchasing power increase is about 7%.",
    },
    {
      question: "Should I invest a lump sum or dollar-cost average?",
      answer: "Historically, lump-sum investing outperforms dollar-cost averaging about 2/3 of the time because markets trend upward. However, DCA reduces anxiety and timing risk, making it easier to stay invested during volatility.",
    },
    {
      question: "How accurate is this calculator?",
      answer: "This calculator assumes consistent returns, which doesn't reflect real market volatility. Actual returns vary significantly year to year. Use these projections for planning purposes, not as guarantees. Consider running multiple scenarios with different return rates.",
    },
    {
      question: "What's the Rule of 72?",
      answer: "The Rule of 72 estimates how long it takes to double your money. Divide 72 by your expected annual return. At 10% returns, money doubles in about 7.2 years. At 7%, it takes about 10.3 years.",
    },
    {
      question: "How do taxes affect my investment returns?",
      answer: "Long-term capital gains (investments held over 1 year) are taxed at 0%, 15%, or 20% depending on income. Short-term gains are taxed as ordinary income. Tax-advantaged accounts (401k, IRA) defer or eliminate these taxes.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCES (REQUIRED)
  // ═══════════════════════════════════════════════════════════════════════════
  references: [
    {
      authors: "Damodaran, Aswath",
      year: "2024",
      title: "Historical Returns on Stocks, Bonds and Bills: 1928-2024",
      source: "NYU Stern School of Business",
      url: "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html",
    },
    {
      authors: "S&P Dow Jones Indices",
      year: "2024",
      title: "S&P 500 Index Historical Data",
      source: "S&P Global",
    },
    {
      authors: "Vanguard Research",
      year: "2024",
      title: "Principles for Investing Success",
      source: "Vanguard",
      url: "https://investor.vanguard.com/investor-resources-education",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // DETAILED TABLE
  // ═══════════════════════════════════════════════════════════════════════════
  detailedTable: {
    id: "yearByYear",
    buttonLabel: "View Year-by-Year Breakdown",
    buttonIcon: "📅",
    modalTitle: "Year-by-Year Investment Growth",
    columns: [
      { id: "year", label: "Year", align: "left" },
      { id: "contribution", label: "Contribution", align: "right" },
      { id: "earnings", label: "Earnings", align: "right", highlight: true },
      { id: "balance", label: "Balance", align: "right", highlight: true },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SIDEBAR
  // ═══════════════════════════════════════════════════════════════════════════
  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: false,
    category: "finance",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FEATURES
  // ═══════════════════════════════════════════════════════════════════════════
  features: {
    autoCalculate: true,
    exportPDF: true,
    shareResults: true,
    saveHistory: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // RELATED CALCULATORS
  // ═══════════════════════════════════════════════════════════════════════════
  relatedCalculators: ["compound-interest-calculator", "savings-calculator", "retirement-calculator", "mortgage-calculator"],

  // ═══════════════════════════════════════════════════════════════════════════
  // ADS
  // ═══════════════════════════════════════════════════════════════════════════
  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function getInvestmentTypeRate(type: string): number {
  const found = INVESTMENT_TYPES.find(t => t.value === type);
  return found ? found.rate : 10;
}

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateInvestment(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;
  const mode = (values.mode as string) || "growth";
  
  // Get advanced options with defaults
  const inflationRate = ((values.inflationRate as number) ?? 3) / 100;
  const taxRate = ((values.taxRate as number) ?? 15) / 100;
  const annualIncrease = ((values.annualIncrease as number) ?? 0) / 100;

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPARE MODE
  // ═══════════════════════════════════════════════════════════════════════════
  if (mode === "compare") {
    const initialInvestment = (values.initialInvestment as number) || 10000;
    const monthlyContribution = (values.monthlyContribution as number) || 500;
    const years = (values.investmentYears as number) || 20;
    const rate1 = ((values.compareReturn1 as number) || 7) / 100;
    const rate2 = ((values.compareReturn2 as number) || 10) / 100;
    
    // Calculate scenario A
    const monthlyRateA = rate1 / 12;
    let balanceA = initialInvestment;
    for (let m = 0; m < years * 12; m++) {
      balanceA = balanceA * (1 + monthlyRateA) + monthlyContribution;
    }
    
    // Calculate scenario B
    const monthlyRateB = rate2 / 12;
    let balanceB = initialInvestment;
    for (let m = 0; m < years * 12; m++) {
      balanceB = balanceB * (1 + monthlyRateB) + monthlyContribution;
    }
    
    const difference = balanceB - balanceA;
    const totalContributions = initialInvestment + (monthlyContribution * years * 12);
    
    return {
      values: { scenarioA: balanceA, scenarioB: balanceB, difference },
      formatted: {
        futureValue: "—",
        totalContributions: formatCurrency(totalContributions),
        totalEarnings: "—",
        effectiveAPY: "—",
        inflationAdjusted: "—",
        afterTaxValue: "—",
        yearsToGoal: "—",
        monthlyNeeded: "—",
        scenarioA: formatCurrency(balanceA),
        scenarioB: formatCurrency(balanceB),
        difference: formatCurrency(difference),
      },
      summary: `With ${formatCurrency(initialInvestment)} initial + ${formatCurrency(monthlyContribution)}/month for ${years} years: Scenario A (${(rate1*100).toFixed(1)}%) = ${formatCurrency(balanceA)}, Scenario B (${(rate2*100).toFixed(1)}%) = ${formatCurrency(balanceB)}. Difference: ${formatCurrency(difference)}.`,
      isValid: true,
      metadata: { mode: "compare" },
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // GOAL MODE
  // ═══════════════════════════════════════════════════════════════════════════
  if (mode === "goal") {
    const initialInvestment = (values.initialInvestment as number) || 10000;
    const targetAmount = (values.targetAmount as number) || 1000000;
    const investmentType = (values.investmentType as string) || "sp500";
    const customRate = (values.annualReturn as number) || 10;
    const annualRate = (investmentType === "custom" ? customRate : getInvestmentTypeRate(investmentType)) / 100;
    const compoundFrequency = parseInt((values.compoundFrequency as string) || "12");
    
    const monthlyRate = annualRate / 12;
    
    // Calculate years needed with no additional contributions
    const yearsNoContrib = Math.log(targetAmount / initialInvestment) / Math.log(1 + annualRate);
    
    // Calculate monthly contribution needed to reach goal in 20 years
    const goalYears = 20;
    const goalMonths = goalYears * 12;
    const fvInitial = initialInvestment * Math.pow(1 + monthlyRate, goalMonths);
    const remaining = targetAmount - fvInitial;
    let monthlyNeeded = 0;
    if (remaining > 0 && monthlyRate > 0) {
      monthlyNeeded = remaining / ((Math.pow(1 + monthlyRate, goalMonths) - 1) / monthlyRate);
    }
    
    return {
      values: { yearsToGoal: yearsNoContrib, monthlyNeeded },
      formatted: {
        futureValue: formatCurrency(targetAmount),
        totalContributions: formatCurrency(initialInvestment),
        totalEarnings: "—",
        effectiveAPY: `${(annualRate * 100).toFixed(1)}%`,
        inflationAdjusted: "—",
        afterTaxValue: "—",
        yearsToGoal: yearsNoContrib > 100 ? "100+ years" : `${yearsNoContrib.toFixed(1)} years`,
        monthlyNeeded: formatCurrency(Math.max(0, monthlyNeeded)),
        scenarioA: "—",
        scenarioB: "—",
        difference: "—",
      },
      summary: `To reach ${formatCurrency(targetAmount)} from ${formatCurrency(initialInvestment)} at ${(annualRate*100).toFixed(1)}% return: With no additional contributions, it would take ${yearsNoContrib.toFixed(1)} years. To reach it in 20 years, contribute ${formatCurrency(monthlyNeeded)}/month.`,
      isValid: true,
      metadata: { mode: "goal" },
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // GROWTH MODE (default)
  // ═══════════════════════════════════════════════════════════════════════════
  const initialInvestment = (values.initialInvestment as number) || 10000;
  const monthlyContribution = (values.monthlyContribution as number) || 500;
  const investmentType = (values.investmentType as string) || "sp500";
  const customRate = (values.annualReturn as number) || 10;
  const annualRate = (investmentType === "custom" ? customRate : getInvestmentTypeRate(investmentType)) / 100;
  const years = (values.investmentYears as number) || 20;
  const compoundFrequency = parseInt((values.compoundFrequency as string) || "12");

  const monthlyRate = annualRate / 12;
  const totalMonths = years * 12;

  // Calculate future value with monthly compounding
  let balance = initialInvestment;
  let totalContributions = initialInvestment;
  let currentMonthlyContrib = monthlyContribution;

  // Year-by-year table data
  const tableData: Array<{
    year: string;
    contribution: string;
    earnings: string;
    balance: string;
  }> = [];

  let yearStartBalance = initialInvestment;
  let yearContributions = 0;

  for (let month = 1; month <= totalMonths; month++) {
    // Apply monthly interest
    balance = balance * (1 + monthlyRate);
    
    // Add monthly contribution
    balance += currentMonthlyContrib;
    totalContributions += currentMonthlyContrib;
    yearContributions += currentMonthlyContrib;
    
    // End of year: record data and apply annual increase
    if (month % 12 === 0) {
      const yearNum = month / 12;
      const yearEarnings = balance - yearStartBalance - yearContributions;
      
      tableData.push({
        year: `Year ${yearNum}`,
        contribution: formatCurrency(yearContributions),
        earnings: formatCurrency(yearEarnings),
        balance: formatCurrency(balance),
      });
      
      yearStartBalance = balance;
      yearContributions = 0;
      
      // Apply annual contribution increase
      if (annualIncrease > 0) {
        currentMonthlyContrib = currentMonthlyContrib * (1 + annualIncrease);
      }
    }
  }

  const futureValue = balance;
  const totalEarnings = futureValue - totalContributions;

  // Effective APY
  const effectiveAPY = Math.pow(1 + monthlyRate, 12) - 1;

  // Inflation-adjusted value
  const inflationAdjustedValue = inflationRate > 0 
    ? futureValue / Math.pow(1 + inflationRate, years) 
    : futureValue;

  // After-tax value (simplified: tax on earnings only)
  const afterTaxEarnings = totalEarnings * (1 - taxRate);
  const afterTaxValue = totalContributions + afterTaxEarnings;

  // Rule of 72 - years to double
  const yearsToDouble = annualRate > 0 ? 72 / (annualRate * 100) : Infinity;

  // ROI
  const roi = totalContributions > 0 ? (totalEarnings / totalContributions) * 100 : 0;

  // Breakdown for visualization
  const breakdown = [
    { id: "initial", label: "Initial Investment", value: initialInvestment, displayValue: formatCurrency(initialInvestment) },
    { id: "contributions", label: "Additional Contributions", value: totalContributions - initialInvestment, displayValue: formatCurrency(totalContributions - initialInvestment) },
    { id: "earnings", label: "Investment Earnings", value: totalEarnings, displayValue: formatCurrency(totalEarnings) },
  ];

  // Stats for info card
  const investmentStats = [
    { label: "Total Return", value: formatCurrency(totalEarnings), color: "green" },
    { label: "ROI %", value: `${roi.toFixed(1)}%`, color: "blue" },
    { label: "Doubling Time", value: `~${yearsToDouble.toFixed(1)} years`, color: "purple" },
    { label: "Real Return", value: `${((annualRate - inflationRate) * 100).toFixed(1)}%`, color: "cyan" },
  ];

  return {
    values: { futureValue, totalContributions, totalEarnings, effectiveAPY, inflationAdjustedValue, afterTaxValue },
    formatted: {
      futureValue: formatCurrency(futureValue),
      totalContributions: formatCurrency(totalContributions),
      totalEarnings: formatCurrency(totalEarnings),
      effectiveAPY: `${(effectiveAPY * 100).toFixed(2)}%`,
      inflationAdjusted: inflationRate > 0 ? formatCurrency(inflationAdjustedValue) : "—",
      afterTaxValue: formatCurrency(afterTaxValue),
      yearsToGoal: "—",
      monthlyNeeded: "—",
      scenarioA: "—",
      scenarioB: "—",
      difference: "—",
    },
    summary: `Investing ${formatCurrency(initialInvestment)} plus ${formatCurrency(monthlyContribution)}/month at ${(annualRate*100).toFixed(1)}% for ${years} years grows to ${formatCurrency(futureValue)}. Total contributions: ${formatCurrency(totalContributions)}, Earnings: ${formatCurrency(totalEarnings)} (${roi.toFixed(0)}% return).`,
    isValid: true,
    metadata: { tableData, breakdown, investmentStats, mode: "growth" },
  };
}

export default investmentCalculatorConfig;
