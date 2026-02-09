import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// COMPOUND FREQUENCIES
// =============================================================================
const COMPOUND_FREQUENCIES = [
  { value: "365", label: "Daily (365/year)" },
  { value: "12", label: "Monthly (12/year)" },
  { value: "4", label: "Quarterly (4/year)" },
  { value: "1", label: "Annually (1/year)" },
];

const CONTRIBUTION_FREQUENCIES = [
  { value: "12", label: "Monthly" },
  { value: "26", label: "Bi-Weekly" },
  { value: "52", label: "Weekly" },
  { value: "4", label: "Quarterly" },
  { value: "1", label: "Annually" },
];

const EMERGENCY_FUND_MONTHS = [
  { value: "3", label: "3 months (starter)" },
  { value: "6", label: "6 months (recommended)" },
  { value: "9", label: "9 months (self-employed)" },
  { value: "12", label: "12 months (maximum security)" },
];

// =============================================================================
// CURRENT APY RATES REFERENCE
// =============================================================================
const CURRENT_RATES = [
  { type: "High-Yield Savings", rate: "4.00-5.00%", minDeposit: "$0-$500" },
  { type: "Traditional Savings", rate: "0.01-0.50%", minDeposit: "$0-$25" },
  { type: "Money Market", rate: "3.50-4.50%", minDeposit: "$1,000+" },
  { type: "1-Year CD", rate: "4.00-4.50%", minDeposit: "$500-$1,000" },
  { type: "5-Year CD", rate: "3.50-4.00%", minDeposit: "$500-$1,000" },
];

// =============================================================================
// CONFIG
// =============================================================================
export const savingsCalculatorConfig: CalculatorConfigV3 = {
  id: "savings-calculator",
  slug: "savings-calculator",
  name: "Savings Calculator",
  category: "finance",
  icon: "🏦",

  // ═══════════════════════════════════════════════════════════════════════════
  // SEO
  // ═══════════════════════════════════════════════════════════════════════════
  seo: {
    title: "Savings Calculator - Growth, Goals & Emergency Fund | Free Tool",
    description: "Calculate how your savings will grow over time, plan for specific goals, or build an emergency fund. Compare high-yield savings rates, see year-by-year projections, and factor in inflation. Free calculator.",
    shortDescription: "Calculate savings growth and reach your financial goals",
    keywords: ["savings calculator", "savings growth", "emergency fund calculator", "high yield savings", "savings goal", "compound interest savings", "APY calculator"],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HERO
  // ═══════════════════════════════════════════════════════════════════════════
  hero: {
    badge: "Finance",
    rating: { average: 4.9, count: 38700 },
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
      { id: "growth", label: "Savings Growth", icon: "📈", description: "Project how your savings will grow" },
      { id: "goal", label: "Savings Goal", icon: "🎯", description: "Calculate time to reach a target" },
      { id: "emergency", label: "Emergency Fund", icon: "🛡️", description: "Build your safety net" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════════════════
  inputs: [
    // === GROWTH MODE INPUTS ===
    {
      id: "initialDeposit",
      type: "currency",
      label: "Initial Deposit",
      required: true,
      defaultValue: 5000,
      min: 0,
      max: 1000000,
      currency: "$",
      helpText: "Amount you're starting with",
      width: "full",
      modes: ["growth", "goal"],
    },
    {
      id: "monthlyContribution",
      type: "currency",
      label: "Monthly Contribution",
      required: false,
      defaultValue: 200,
      min: 0,
      max: 50000,
      currency: "$",
      helpText: "Amount you'll add each month",
      width: "full",
      modes: ["growth", "goal"],
    },
    {
      id: "annualRate",
      type: "slider",
      label: "Annual Interest Rate (APY)",
      required: true,
      defaultValue: 4.5,
      min: 0.01,
      max: 10,
      step: 0.1,
      suffix: "%",
      helpText: "High-yield accounts: 4-5%, Traditional: 0.01-0.5%",
      width: "full",
      modes: ["growth", "goal", "emergency"],
    },
    {
      id: "years",
      type: "slider",
      label: "Time Period",
      required: true,
      defaultValue: 10,
      min: 1,
      max: 40,
      step: 1,
      suffix: "years",
      width: "full",
      modes: ["growth"],
    },
    {
      id: "compoundFrequency",
      type: "select",
      label: "Compound Frequency",
      required: true,
      defaultValue: "365",
      options: COMPOUND_FREQUENCIES,
      width: "full",
      modes: ["growth", "goal"],
    },
    // === GOAL MODE INPUTS ===
    {
      id: "savingsGoal",
      type: "currency",
      label: "Savings Goal",
      required: true,
      defaultValue: 50000,
      min: 100,
      max: 10000000,
      currency: "$",
      helpText: "Target amount you want to reach",
      width: "full",
      modes: ["goal"],
    },
    // === EMERGENCY FUND MODE INPUTS ===
    {
      id: "monthlyExpenses",
      type: "currency",
      label: "Monthly Essential Expenses",
      required: true,
      defaultValue: 3500,
      min: 500,
      max: 50000,
      currency: "$",
      helpText: "Rent, utilities, food, insurance, debt payments",
      width: "full",
      modes: ["emergency"],
    },
    {
      id: "monthsCoverage",
      type: "select",
      label: "Months of Coverage",
      required: true,
      defaultValue: "6",
      options: EMERGENCY_FUND_MONTHS,
      helpText: "3-6 months standard, 9-12 for self-employed",
      width: "full",
      modes: ["emergency"],
    },
    {
      id: "currentSavings",
      type: "currency",
      label: "Current Emergency Savings",
      required: false,
      defaultValue: 2000,
      min: 0,
      max: 500000,
      currency: "$",
      helpText: "Amount you've already saved",
      width: "full",
      modes: ["emergency"],
    },
    {
      id: "monthlyEmergencySaving",
      type: "currency",
      label: "Monthly Amount to Save",
      required: true,
      defaultValue: 500,
      min: 50,
      max: 10000,
      currency: "$",
      helpText: "How much can you save each month?",
      width: "full",
      modes: ["emergency"],
    },
    // === ADVANCED OPTIONS (all modes) ===
    {
      id: "inflationRate",
      type: "slider",
      label: "Expected Inflation Rate",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 10,
      step: 0.5,
      suffix: "%",
      helpText: "Average ~3%. Shows real purchasing power.",
      width: "full",
    },
    {
      id: "taxRate",
      type: "slider",
      label: "Tax Rate on Interest",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 40,
      step: 1,
      suffix: "%",
      helpText: "Interest income may be taxable",
      width: "full",
    },
  ],

  inputGroups: [
    {
      id: "advanced",
      title: "Inflation & Taxes",
      inputs: ["inflationRate", "taxRate"],
      defaultExpanded: false,
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════════════════
  results: [
    { id: "futureValue", type: "primary", label: "Future Value", format: "text", icon: "💰" },
    { id: "totalContributions", type: "secondary", label: "Total Contributions", format: "text" },
    { id: "totalInterest", type: "secondary", label: "Interest Earned", format: "text" },
    { id: "effectiveAPY", type: "secondary", label: "Effective APY", format: "text" },
    { id: "inflationAdjusted", type: "secondary", label: "Inflation-Adjusted Value", format: "text" },
    // Goal mode specific
    { id: "yearsToGoal", type: "primary", label: "Time to Goal", format: "text" },
    { id: "goalDate", type: "secondary", label: "Goal Date", format: "text" },
    // Emergency fund specific
    { id: "emergencyGoal", type: "primary", label: "Emergency Fund Goal", format: "text" },
    { id: "amountNeeded", type: "secondary", label: "Still Need to Save", format: "text" },
    { id: "monthsToFund", type: "secondary", label: "Time to Fully Funded", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // VISUALIZATIONS
  // ═══════════════════════════════════════════════════════════════════════════
  visualizations: [
    {
      id: "savingsBreakdown",
      type: "distribution-bars",
      title: "Savings Breakdown",
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
      id: "currentRates",
      title: "Current Savings Rates (Jan 2026)",
      icon: "📋",
      type: "table",
      columns: ["Account Type", "APY Range", "Min. Deposit"],
      rows: CURRENT_RATES.map(r => [r.type, r.rate, r.minDeposit]),
    },
    {
      id: "savingsStats",
      title: "Savings Statistics",
      icon: "📈",
      type: "grid",
      columns: 2,
      items: [
        { label: "Total Return", value: "", color: "green" },
        { label: "ROI %", value: "", color: "blue" },
        { label: "Interest vs Deposits", value: "", color: "cyan" },
        { label: "Doubling Time", value: "", color: "purple" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCE DATA
  // ═══════════════════════════════════════════════════════════════════════════
  referenceData: [
    {
      id: "emergencyGuide",
      title: "Emergency Fund Guidelines (3-6-9 Rule)",
      icon: "🛡️",
      columns: 2,
      items: [
        { label: "Stable income, no dependents", value: "3 months" },
        { label: "Average household", value: "6 months" },
        { label: "Self-employed/variable income", value: "9 months" },
        { label: "High risk/multiple dependents", value: "12 months" },
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
    modalTitle: "Savings Growth by Year",
    columns: [
      { id: "year", label: "Year", align: "left" },
      { id: "deposits", label: "Total Deposits", align: "right" },
      { id: "interest", label: "Interest Earned", align: "right", highlight: true },
      { id: "balance", label: "Balance", align: "right", highlight: true },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  educationSections: [
    {
      id: "accountTypes",
      type: "cards",
      title: "Types of Savings Accounts",
      icon: "🏦",
      columns: 2,
      cards: [
        { title: "High-Yield Savings", description: "Online banks offer 4-5% APY with no fees. FDIC insured up to $250K. Best for most people.", icon: "⭐" },
        { title: "Traditional Savings", description: "Brick-and-mortar banks offer 0.01-0.5% APY. Convenient but low returns. Better options exist.", icon: "🏛️" },
        { title: "Money Market Account", description: "Higher rates (3-4.5%) with check-writing. Often requires higher minimum balance ($1,000+).", icon: "💳" },
        { title: "Certificates of Deposit", description: "Fixed rates (4-4.5%) for fixed terms. Early withdrawal penalties apply. Good for money you won't need.", icon: "📜" },
      ],
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "High-yield savings accounts pay 10-500x more than traditional banks—always compare rates", type: "info" },
        { text: "FDIC insurance covers up to $250,000 per depositor per bank—spread larger amounts", type: "info" },
        { text: "APY (Annual Percentage Yield) includes compounding; APR doesn't—compare APYs", type: "info" },
        { text: "Savings rates are variable and change with Federal Reserve decisions", type: "warning" },
        { text: "Interest income is taxable—factor this into your real returns", type: "warning" },
        { text: "Inflation (avg ~3%) reduces purchasing power—aim for rates that beat inflation", type: "warning" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "📊",
      description: "$5,000 initial + $200/month at 4.5% APY for 10 years (daily compounding)",
      columns: 2,
      examples: [
        {
          title: "Initial Deposit Growth",
          steps: [
            "P = $5,000",
            "r = 0.045, n = 365, t = 10",
            "FV = 5,000 × (1 + 0.045/365)^3650",
            "FV = 5,000 × 1.5683",
          ],
          result: "Initial grows to: $7,841",
        },
        {
          title: "Monthly Contributions",
          steps: [
            "PMT = $200/month × 120 months",
            "Total deposits: $24,000",
            "FV of annuity with compounding",
            "Contributions grow to: $30,130",
          ],
          result: "Total: $37,971 ($8,971 interest)",
        },
      ],
    },
    {
      id: "whatIsSavings",
      type: "prose",
      title: "What is a Savings Account?",
      content: "A savings account is a secure, interest-bearing deposit account held at a bank or credit union. Unlike checking accounts designed for daily transactions, savings accounts are meant for accumulating money over time. Your deposits are protected by FDIC insurance (up to $250,000 per depositor per institution), making them one of the safest places to keep your money. The trade-off for this safety is typically lower returns compared to investments, but with zero risk of losing your principal.",
    },
    {
      id: "highYieldVsTraditional",
      type: "prose",
      title: "High-Yield vs Traditional Savings",
      content: "High-yield savings accounts, typically offered by online banks, pay significantly more interest than traditional brick-and-mortar banks—often 4-5% APY compared to 0.01-0.5%. Online banks can offer better rates because they don't have the overhead costs of physical branches. The accounts work the same way and are equally safe (FDIC insured), so there's little reason to keep large sums in a traditional savings account. The difference is dramatic: $10,000 at 0.1% earns $10/year, while at 4.5% it earns $450.",
    },
    {
      id: "emergencyFundBasics",
      type: "prose",
      title: "Building an Emergency Fund",
      content: "An emergency fund is savings set aside for unexpected expenses—job loss, medical emergencies, car repairs, or home issues. Financial experts recommend saving 3-6 months of essential living expenses, with self-employed individuals or those with variable income aiming for 9-12 months. Start with a smaller goal if needed: having even $1,000 can prevent going into debt for most common emergencies. Keep your emergency fund in a high-yield savings account for easy access while still earning interest.",
    },
    {
      id: "maximizeSavings",
      type: "prose",
      title: "Tips to Maximize Your Savings",
      content: "To grow your savings faster: (1) Automate transfers—set up automatic deposits right after payday so you save first. (2) Use a high-yield account—the difference between 0.1% and 4.5% APY adds up quickly. (3) Take advantage of compound interest—the more frequently your account compounds, the more you earn. (4) Increase contributions when you get raises. (5) Keep an eye on rates and switch banks if better options appear. (6) Consider CD ladders for money you won't need immediately to lock in higher rates.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // FAQs
  // ═══════════════════════════════════════════════════════════════════════════
  faqs: [
    { question: "What's a good savings account interest rate in 2026?", answer: "As of January 2026, high-yield savings accounts offer 4-5% APY, while traditional banks offer just 0.01-0.5%. Online banks like Openbank, Varo, and Marcus by Goldman Sachs consistently offer top rates. Anything above 4% is excellent; the national average is only about 0.4%." },
    { question: "How much should I have in an emergency fund?", answer: "The standard recommendation is 3-6 months of essential expenses. If you have stable employment and no dependents, 3 months may suffice. If you're self-employed, have variable income, or have dependents, aim for 9-12 months. Start with $1,000 as an initial goal if the full amount seems overwhelming." },
    { question: "Is my money safe in a high-yield savings account?", answer: "Yes, if the bank is FDIC-insured (or NCUA-insured for credit unions). Your deposits are protected up to $250,000 per depositor, per institution. Online banks are just as safe as traditional banks—they simply have lower overhead costs, which they pass on as higher rates." },
    { question: "What's the difference between APY and interest rate?", answer: "APY (Annual Percentage Yield) includes the effect of compounding, showing your actual earnings over a year. The simple interest rate doesn't account for compounding. Always compare APYs when choosing accounts, as they give you the true picture of what you'll earn." },
    { question: "Should I keep all my savings in one bank?", answer: "If you have more than $250,000, you should spread it across multiple FDIC-insured banks to ensure full coverage. Otherwise, it's fine to keep your savings in one high-yield account. Some people prefer separate accounts for different goals (emergency fund, vacation, etc.) for psychological separation." },
    { question: "How does compound frequency affect my savings?", answer: "More frequent compounding means slightly higher returns. Daily compounding earns more than monthly, which earns more than annually. However, at typical savings rates, the difference is small—about 0.02% extra APY going from monthly to daily. Focus more on finding the highest APY." },
    { question: "Will savings account rates go down?", answer: "Rates typically follow Federal Reserve decisions. When the Fed lowers its benchmark rate (as it began doing in late 2025), savings rates usually decline. However, changes aren't immediate, and competition keeps some banks offering higher rates. Lock in CD rates if you expect significant drops." },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════════════════
  references: [
    { authors: "FDIC", year: "2026", title: "National Rates and Rate Caps", source: "Federal Deposit Insurance Corporation", url: "https://www.fdic.gov/resources/bankers/national-rates/" },
    { authors: "Consumer Financial Protection Bureau", year: "2024", title: "What is a savings account?", source: "CFPB.gov", url: "https://www.consumerfinance.gov/ask-cfpb/" },
    { authors: "Federal Reserve", year: "2026", title: "Federal Funds Rate", source: "Federal Reserve Economic Data" },
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
      title: "Plan for Retirement",
      description: "See how your savings translate to long-term wealth.",
      linkText: "Try Compound Interest Calculator →",
      link: "/compound-interest-calculator",
    },
  },

  features: {
    autoCalculate: true,
    saveHistory: true,
    exportPDF: true,
    shareResults: true,
  },

  relatedCalculators: ["compound-interest-calculator", "retirement-calculator", "investment-calculator", "loan-calculator"],

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
export function calculateSavings(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
  mode?: string;
}): CalculatorResults {
  const { values, mode = "growth" } = data;

  const inflationRate = ((values.inflationRate as number) || 0) / 100;
  const taxRate = ((values.taxRate as number) || 0) / 100;

  // ═══════════════════════════════════════════════════════════════════════════
  // EMERGENCY FUND MODE
  // ═══════════════════════════════════════════════════════════════════════════
  if (mode === "emergency") {
    const monthlyExpenses = (values.monthlyExpenses as number) || 3500;
    const monthsCoverage = parseInt((values.monthsCoverage as string) || "6");
    const currentSavings = (values.currentSavings as number) || 0;
    const monthlyEmergencySaving = (values.monthlyEmergencySaving as number) || 500;
    const annualRate = ((values.annualRate as number) || 4.5) / 100;

    const emergencyGoal = monthlyExpenses * monthsCoverage;
    const amountNeeded = Math.max(0, emergencyGoal - currentSavings);
    
    // Calculate months to reach goal with interest
    let balance = currentSavings;
    let months = 0;
    const monthlyRate = annualRate / 12;
    
    while (balance < emergencyGoal && months < 600) {
      balance = balance * (1 + monthlyRate) + monthlyEmergencySaving;
      months++;
    }

    const yearsToFund = Math.floor(months / 12);
    const remainingMonths = months % 12;
    const monthsToFundStr = yearsToFund > 0 
      ? `${yearsToFund} year${yearsToFund > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`
      : `${months} month${months !== 1 ? 's' : ''}`;

    // Progress percentage
    const progressPercent = Math.min(100, (currentSavings / emergencyGoal) * 100);

    const breakdown = [
      { id: "current", label: "Current Savings", value: currentSavings, displayValue: formatCurrency(currentSavings) },
      { id: "needed", label: "Still Needed", value: amountNeeded, displayValue: formatCurrency(amountNeeded) },
    ];

    return {
      values: { emergencyGoal, amountNeeded, months, progressPercent },
      formatted: {
        emergencyGoal: formatCurrency(emergencyGoal),
        amountNeeded: formatCurrency(amountNeeded),
        monthsToFund: monthsToFundStr,
        goalDate: "—",
        futureValue: formatCurrency(emergencyGoal),
        totalContributions: "—",
        totalInterest: "—",
        effectiveAPY: "—",
        inflationAdjusted: "—",
        yearsToGoal: "—",
      },
      summary: `Your emergency fund goal is ${formatCurrency(emergencyGoal)} (${monthsCoverage} months of expenses). You need to save ${formatCurrency(amountNeeded)} more, which will take approximately ${monthsToFundStr} at ${formatCurrency(monthlyEmergencySaving)}/month.`,
      isValid: true,
      metadata: { breakdown, progressPercent, mode: "emergency" },
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // GOAL MODE
  // ═══════════════════════════════════════════════════════════════════════════
  if (mode === "goal") {
    const initialDeposit = (values.initialDeposit as number) || 5000;
    const monthlyContribution = (values.monthlyContribution as number) || 200;
    const annualRate = ((values.annualRate as number) || 4.5) / 100;
    const savingsGoal = (values.savingsGoal as number) || 50000;
    const compoundFrequency = parseInt((values.compoundFrequency as string) || "365");

    const monthlyRate = annualRate / 12;
    let balance = initialDeposit;
    let months = 0;
    let totalDeposits = initialDeposit;

    while (balance < savingsGoal && months < 600) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
      totalDeposits += monthlyContribution;
      months++;
    }

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    const timeStr = years > 0 
      ? `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`
      : `${months} month${months !== 1 ? 's' : ''}`;

    const totalInterest = balance - totalDeposits;
    const inflationAdjustedValue = inflationRate > 0 ? balance / Math.pow(1 + inflationRate, months / 12) : balance;

    const breakdown = [
      { id: "initial", label: "Initial Deposit", value: initialDeposit, displayValue: formatCurrency(initialDeposit) },
      { id: "contributions", label: "Monthly Contributions", value: totalDeposits - initialDeposit, displayValue: formatCurrency(totalDeposits - initialDeposit) },
      { id: "interest", label: "Interest Earned", value: totalInterest, displayValue: formatCurrency(totalInterest) },
    ];

    return {
      values: { futureValue: balance, totalContributions: totalDeposits, totalInterest, months },
      formatted: {
        yearsToGoal: timeStr,
        goalDate: "—",
        futureValue: formatCurrency(balance),
        totalContributions: formatCurrency(totalDeposits),
        totalInterest: formatCurrency(totalInterest),
        effectiveAPY: `${(annualRate * 100).toFixed(2)}%`,
        inflationAdjusted: inflationRate > 0 ? formatCurrency(inflationAdjustedValue) : "—",
        emergencyGoal: "—",
        amountNeeded: "—",
        monthsToFund: "—",
      },
      summary: `You'll reach your ${formatCurrency(savingsGoal)} goal in ${timeStr}. Total contributions: ${formatCurrency(totalDeposits)}, Interest earned: ${formatCurrency(totalInterest)}.`,
      isValid: true,
      metadata: { breakdown, mode: "goal" },
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // GROWTH MODE (default)
  // ═══════════════════════════════════════════════════════════════════════════
  const initialDeposit = (values.initialDeposit as number) || 5000;
  const monthlyContribution = (values.monthlyContribution as number) || 200;
  const annualRate = ((values.annualRate as number) || 4.5) / 100;
  const years = (values.years as number) || 10;
  const compoundFrequency = parseInt((values.compoundFrequency as string) || "365");

  // Future value of initial deposit
  const periodicRate = annualRate / compoundFrequency;
  const totalPeriods = compoundFrequency * years;
  const fvInitial = initialDeposit * Math.pow(1 + periodicRate, totalPeriods);

  // Future value of contributions
  const monthlyRate = annualRate / 12;
  const totalMonths = years * 12;
  let fvContributions = 0;
  if (annualRate > 0) {
    fvContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
  } else {
    fvContributions = monthlyContribution * totalMonths;
  }

  const futureValue = fvInitial + fvContributions;
  const totalContributions = initialDeposit + (monthlyContribution * totalMonths);
  const totalInterest = futureValue - totalContributions;

  // After-tax value
  const afterTaxInterest = totalInterest * (1 - taxRate);
  const afterTaxValue = totalContributions + afterTaxInterest;

  // Inflation-adjusted value
  const inflationAdjustedValue = inflationRate > 0 ? futureValue / Math.pow(1 + inflationRate, years) : futureValue;

  // Effective APY (with compounding)
  const effectiveAPY = Math.pow(1 + periodicRate, compoundFrequency) - 1;

  // Rule of 72 - years to double
  const yearsToDouble = annualRate > 0 ? 72 / (annualRate * 100) : Infinity;

  // ROI
  const roi = totalContributions > 0 ? ((futureValue - totalContributions) / totalContributions) * 100 : 0;

  // Year-by-year table data
  const tableData: Array<{
    year: string;
    deposits: string;
    interest: string;
    balance: string;
  }> = [];

  let balance = initialDeposit;
  let runningDeposits = initialDeposit;
  
  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
      runningDeposits += monthlyContribution;
    }
    
    tableData.push({
      year: `Year ${y}`,
      deposits: formatCurrency(runningDeposits),
      interest: formatCurrency(balance - runningDeposits),
      balance: formatCurrency(balance),
    });
  }

  // Breakdown for visualization
  const breakdown = [
    { id: "initial", label: "Initial Deposit", value: initialDeposit, displayValue: formatCurrency(initialDeposit) },
    { id: "contributions", label: "Monthly Contributions", value: monthlyContribution * totalMonths, displayValue: formatCurrency(monthlyContribution * totalMonths) },
    { id: "interest", label: "Interest Earned", value: totalInterest, displayValue: formatCurrency(totalInterest) },
  ];

  // Stats for info card
  const savingsStats = [
    { label: "Total Return", value: formatCurrency(totalInterest), color: "green" },
    { label: "ROI %", value: `${roi.toFixed(1)}%`, color: "blue" },
    { label: "Interest vs Deposits", value: `${((totalInterest / totalContributions) * 100).toFixed(0)}%`, color: "cyan" },
    { label: "Doubling Time", value: `~${yearsToDouble.toFixed(1)} years`, color: "purple" },
  ];

  return {
    values: { futureValue, totalContributions, totalInterest, effectiveAPY, inflationAdjustedValue, afterTaxValue },
    formatted: {
      futureValue: formatCurrency(futureValue),
      totalContributions: formatCurrency(totalContributions),
      totalInterest: formatCurrency(totalInterest),
      effectiveAPY: `${(effectiveAPY * 100).toFixed(2)}%`,
      inflationAdjusted: inflationRate > 0 ? formatCurrency(inflationAdjustedValue) : "—",
      yearsToGoal: "—",
      goalDate: "—",
      emergencyGoal: "—",
      amountNeeded: "—",
      monthsToFund: "—",
    },
    summary: `After ${years} years, your savings of ${formatCurrency(totalContributions)} will grow to ${formatCurrency(futureValue)}. You'll earn ${formatCurrency(totalInterest)} in interest (${roi.toFixed(0)}% return).`,
    isValid: true,
    metadata: { tableData, breakdown, savingsStats, mode: "growth" },
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

export default savingsCalculatorConfig;
