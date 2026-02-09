import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

export const emergencyFundCalculatorConfig: CalculatorConfigV3 = {
  id: "emergency-fund-calculator",
  slug: "emergency-fund-calculator",
  name: "Emergency Fund Calculator",
  category: "finance",
  icon: "🛡️",

  seo: {
    title: "Emergency Fund Calculator - How Much Do You Need? (2026)",
    description: "Free emergency fund calculator with risk assessment. Calculate your ideal savings based on job stability, dependents, expenses & income type. Get a personalized savings timeline.",
    shortDescription: "Calculate your emergency fund goal based on expenses, job stability & dependents",
    keywords: [
      "emergency fund calculator",
      "how much emergency fund",
      "rainy day fund calculator",
      "emergency savings calculator",
      "3 6 month savings rule",
      "financial safety net"
    ],
  },

  hero: {
    badge: "Finance",
    rating: { average: 4.9, count: 31247 },
  },

  unitSystem: {
    enabled: false,
    default: "imperial",
    options: [],
  },

  inputs: [
    // Essential Expenses
    {
      id: "housingExpense",
      type: "number",
      label: "Housing (Rent/Mortgage)",
      required: true,
      defaultValue: 1500,
      min: 0,
      max: 50000,
      step: 50,
      prefix: "$",
      helpText: "Monthly rent or mortgage payment",
    },
    {
      id: "utilitiesExpense",
      type: "number",
      label: "Utilities",
      required: true,
      defaultValue: 200,
      min: 0,
      max: 2000,
      step: 10,
      prefix: "$",
      helpText: "Electric, gas, water, internet, phone",
    },
    {
      id: "foodExpense",
      type: "number",
      label: "Food & Groceries",
      required: true,
      defaultValue: 500,
      min: 0,
      max: 5000,
      step: 25,
      prefix: "$",
      helpText: "Essential groceries only (not dining out)",
    },
    {
      id: "transportExpense",
      type: "number",
      label: "Transportation",
      required: true,
      defaultValue: 400,
      min: 0,
      max: 3000,
      step: 25,
      prefix: "$",
      helpText: "Car payment, gas, insurance, public transit",
    },
    {
      id: "insuranceExpense",
      type: "number",
      label: "Insurance Premiums",
      required: true,
      defaultValue: 300,
      min: 0,
      max: 3000,
      step: 25,
      prefix: "$",
      helpText: "Health, life, disability insurance",
    },
    {
      id: "debtPayments",
      type: "number",
      label: "Minimum Debt Payments",
      required: false,
      defaultValue: 200,
      min: 0,
      max: 10000,
      step: 25,
      prefix: "$",
      helpText: "Credit cards, student loans, personal loans",
    },
    {
      id: "otherExpenses",
      type: "number",
      label: "Other Essential Expenses",
      required: false,
      defaultValue: 200,
      min: 0,
      max: 5000,
      step: 25,
      prefix: "$",
      helpText: "Childcare, medications, essential subscriptions",
    },
    // Risk Assessment
    {
      id: "incomeType",
      type: "select",
      label: "Income Type",
      required: true,
      defaultValue: "stable",
      options: [
        { value: "stable", label: "Stable W-2 Employment" },
        { value: "variable", label: "Variable/Commission-Based" },
        { value: "contract", label: "Contract/Temporary Work" },
        { value: "selfEmployed", label: "Self-Employed/Freelancer" },
        { value: "multipleJobs", label: "Multiple Income Sources" },
      ],
      helpText: "Your primary income stability affects recommended coverage",
    },
    {
      id: "industryRisk",
      type: "select",
      label: "Industry Stability",
      required: true,
      defaultValue: "stable",
      options: [
        { value: "veryStable", label: "Very Stable (Healthcare, Government)" },
        { value: "stable", label: "Stable (Finance, Utilities)" },
        { value: "moderate", label: "Moderate (Retail, Manufacturing)" },
        { value: "volatile", label: "Volatile (Tech Startups, Media)" },
        { value: "seasonal", label: "Seasonal (Tourism, Construction)" },
      ],
    },
    {
      id: "dependents",
      type: "select",
      label: "Number of Dependents",
      required: true,
      defaultValue: "0",
      options: [
        { value: "0", label: "None" },
        { value: "1", label: "1 dependent" },
        { value: "2", label: "2 dependents" },
        { value: "3", label: "3 dependents" },
        { value: "4plus", label: "4 or more dependents" },
      ],
      helpText: "Spouse, children, elderly parents, etc.",
    },
    {
      id: "dualIncome",
      type: "radio",
      label: "Household Income",
      required: true,
      defaultValue: "single",
      options: [
        { value: "single", label: "Single income household" },
        { value: "dual", label: "Dual income household" },
      ],
    },
    {
      id: "currentSavings",
      type: "number",
      label: "Current Emergency Savings",
      required: false,
      defaultValue: 5000,
      min: 0,
      max: 1000000,
      step: 100,
      prefix: "$",
      helpText: "How much you've already saved",
    },
    {
      id: "monthlySavings",
      type: "number",
      label: "Monthly Savings Capacity",
      required: false,
      defaultValue: 500,
      min: 0,
      max: 20000,
      step: 50,
      prefix: "$",
      helpText: "How much you can save each month toward this goal",
    },
  ],

  inputGroups: [],

  results: [
    { id: "recommendedFund", type: "primary", label: "Recommended Emergency Fund", format: "number", prefix: "$" },
    { id: "monthsRecommended", type: "secondary", label: "Months of Coverage", format: "text" },
    { id: "monthlyExpenses", type: "secondary", label: "Monthly Essential Expenses", format: "number", prefix: "$" },
    { id: "riskLevel", type: "secondary", label: "Your Risk Level", format: "text" },
    { id: "currentProgress", type: "secondary", label: "Current Progress", format: "text" },
    { id: "amountNeeded", type: "secondary", label: "Amount Still Needed", format: "number", prefix: "$" },
    { id: "timeToGoal", type: "secondary", label: "Time to Reach Goal", format: "text" },
    { id: "minimumFund", type: "secondary", label: "Minimum Fund (3 months)", format: "number", prefix: "$" },
  ],

  infoCards: [
    {
      type: "list",
      title: "Your Emergency Fund Goal",
      icon: "🎯",
      items: [
        { label: "Target Amount", valueKey: "recommendedFund", prefix: "$" },
        { label: "Coverage", valueKey: "monthsRecommended" },
        { label: "Risk Level", valueKey: "riskLevel" },
        { label: "Time to Goal", valueKey: "timeToGoal" },
      ],
    },
    {
      type: "horizontal",
      title: "Savings Progress",
      items: [
        { label: "Monthly Expenses", valueKey: "monthlyExpenses", prefix: "$" },
        { label: "Current Savings", valueKey: "currentProgress" },
        { label: "Still Needed", valueKey: "amountNeeded", prefix: "$" },
        { label: "Minimum (3 mo)", valueKey: "minimumFund", prefix: "$" },
      ],
    },
  ],

  referenceData: [
    {
      id: "coverageGuide",
      title: "Emergency Fund Coverage Guide",
      icon: "📊",
      columns: [
        { key: "situation", label: "Your Situation", align: "left" },
        { key: "months", label: "Recommended Months", align: "center" },
        { key: "reason", label: "Why", align: "right" },
      ],
      data: [
        { situation: "Stable job, dual income, no kids", months: "3 months", reason: "Lower risk" },
        { situation: "Stable job, single income, kids", months: "6 months", reason: "Standard safety" },
        { situation: "Variable income or volatile industry", months: "9 months", reason: "Income uncertainty" },
        { situation: "Self-employed or freelancer", months: "12 months", reason: "Highest risk" },
      ],
    },
  ],

  educationSections: [
    {
      id: "emergencyTypes",
      type: "cards",
      title: "What Emergencies Should This Cover?",
      icon: "🚨",
      columns: 2,
      cards: [
        {
          title: "Job Loss",
          description: "The average job search takes 3-6 months. Your fund should cover expenses while you find new employment.",
          icon: "💼",
        },
        {
          title: "Medical Emergency",
          description: "Cover deductibles, copays, and lost wages during recovery. Even with insurance, medical costs add up quickly.",
          icon: "🏥",
        },
        {
          title: "Major Car Repair",
          description: "Engine failure, transmission problems, or accidents. Average unexpected car repair: $500-$3,000.",
          icon: "🚗",
        },
        {
          title: "Home Emergency",
          description: "Broken furnace, roof leak, or appliance failure. Emergency home repairs average $1,000-$5,000.",
          icon: "🏠",
        },
      ],
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "Keep your emergency fund in a high-yield savings account - accessible but earning 4-5% APY", type: "info" },
        { text: "This fund is for TRUE emergencies only - not vacations, sales, or 'wants'", type: "warning" },
        { text: "If you use your fund, prioritize replenishing it immediately before resuming other savings goals", type: "warning" },
        { text: "Self-employed individuals should aim for 12+ months due to lack of unemployment benefits", type: "info" },
        { text: "Don't invest your emergency fund in stocks - you need guaranteed access without market risk", type: "warning" },
        { text: "Consider keeping $1,000-$2,000 in checking for immediate emergencies while the rest earns interest", type: "info" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "📊",
      description: "Single income household, 1 child, variable income job",
      columns: 2,
      examples: [
        {
          title: "Step 1: Calculate Monthly Expenses",
          steps: [
            "Housing: $1,800",
            "Utilities: $250",
            "Food: $600",
            "Transportation: $450",
            "Insurance: $350",
            "Debt payments: $300",
            "Other essentials: $250",
          ],
          result: "Total Monthly: $4,000",
        },
        {
          title: "Step 2: Apply Risk Multiplier",
          steps: [
            "Base coverage: 6 months (single income + kids)",
            "Variable income: +2 months",
            "1 dependent: +1 month",
            "Total: 9 months coverage",
            "Emergency Fund: $4,000 × 9",
          ],
          result: "Target: $36,000",
        },
      ],
    },
    {
      id: "whatIsEmergencyFund",
      type: "prose",
      title: "What is an Emergency Fund?",
      icon: "❓",
      content: "An emergency fund is money set aside specifically for unexpected expenses or income loss - your financial safety net. Unlike regular savings, this fund exists solely to protect you from going into debt when life throws curveballs. The general rule is 3-6 months of essential expenses, but your specific situation (job stability, dependents, income type) determines the right amount for you. This calculator personalizes that recommendation based on your actual risk factors.",
    },
    {
      id: "whereToKeep",
      type: "prose",
      title: "Where to Keep Your Emergency Fund",
      icon: "🏦",
      content: "Your emergency fund should be easily accessible but not TOO accessible. The best option is a high-yield savings account at an online bank offering 4-5% APY - your money earns interest while remaining FDIC-insured and available within 1-2 business days. Avoid investing it in stocks (too risky), CDs (too locked up), or keeping it all in checking (too tempting to spend). Consider a tiered approach: $1,000 in checking for immediate needs, the rest in high-yield savings.",
    },
    {
      id: "buildingYourFund",
      type: "prose",
      title: "How to Build Your Emergency Fund",
      icon: "📈",
      content: "Start with a goal of $1,000 - enough to handle most small emergencies. Then build toward your full target by automating transfers right after each paycheck (pay yourself first). Even $100-$200 per month adds up. Use windfalls (tax refunds, bonuses, gifts) to accelerate progress. If you're paying high-interest debt simultaneously, consider saving a minimum fund ($1,000-$2,000) first, then focusing on debt, then completing your full emergency fund.",
    },
  ],

  faqs: [
    {
      question: "How much should I have in my emergency fund?",
      answer: "The standard recommendation is 3-6 months of essential expenses. However, if you're self-employed, have variable income, work in a volatile industry, or have dependents, aim for 9-12 months. Our calculator personalizes this based on your specific risk factors.",
    },
    {
      question: "Should I pay off debt or build an emergency fund first?",
      answer: "Both are important. A common approach: 1) Save a starter emergency fund of $1,000-$2,000 to avoid new debt from small emergencies. 2) Aggressively pay off high-interest debt (credit cards). 3) Build your full 3-6 month emergency fund. 4) Then focus on investing and other goals.",
    },
    {
      question: "What counts as an 'emergency'?",
      answer: "True emergencies are unexpected, necessary, and urgent: job loss, medical bills, car repairs needed for work, essential home repairs, or emergency travel. NOT emergencies: vacations, sales, new gadgets, or predictable expenses like car maintenance, holidays, or annual insurance premiums - those should have their own savings categories.",
    },
    {
      question: "Where should I keep my emergency fund?",
      answer: "A high-yield savings account is ideal - FDIC insured, earns 4-5% APY, and accessible within 1-2 business days. Avoid: checking (too tempting), regular savings (low interest), CDs (locked up), or investments (too risky). Money market accounts are also a good option.",
    },
    {
      question: "I'm self-employed. How much emergency fund do I need?",
      answer: "Self-employed individuals should aim for 9-12 months of expenses. You don't have access to unemployment benefits, your income is likely variable, and finding new clients takes time. Consider this your 'business continuity fund' as well as personal emergency protection.",
    },
    {
      question: "Should my emergency fund be in a separate account?",
      answer: "Yes! Keeping it separate from your checking account reduces the temptation to spend it on non-emergencies. Many people open a high-yield savings account at a different bank specifically for this purpose - the slight inconvenience of transferring money creates a helpful barrier.",
    },
  ],

  references: [
    {
      authors: "Consumer Financial Protection Bureau",
      year: "2024",
      title: "An essential guide to building an emergency fund",
      source: "CFPB.gov",
      url: "https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/",
    },
    {
      authors: "Federal Reserve Board",
      year: "2024",
      title: "Report on the Economic Well-Being of U.S. Households",
      source: "Federal Reserve",
      url: "https://www.federalreserve.gov/publications/report-economic-well-being-us-households.htm",
    },
  ],

  detailedTable: {
    id: "savingsTimeline",
    buttonLabel: "View Savings Timeline",
    buttonIcon: "📅",
    modalTitle: "Monthly Savings Progress",
    columns: [
      { id: "month", label: "Month", align: "left" },
      { id: "savedTotal", label: "Total Saved", align: "center", highlight: true },
      { id: "progress", label: "Progress", align: "center" },
      { id: "monthsCovered", label: "Months Covered", align: "right" },
    ],
  },

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "finance" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["savings-calculator", "budget-calculator", "debt-payoff-calculator", "net-worth-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// CALCULATE FUNCTION
export function calculateEmergencyFund(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;

  // Calculate total monthly expenses
  const housing = (values.housingExpense as number) || 0;
  const utilities = (values.utilitiesExpense as number) || 0;
  const food = (values.foodExpense as number) || 0;
  const transport = (values.transportExpense as number) || 0;
  const insurance = (values.insuranceExpense as number) || 0;
  const debt = (values.debtPayments as number) || 0;
  const other = (values.otherExpenses as number) || 0;

  const monthlyExpenses = housing + utilities + food + transport + insurance + debt + other;

  // Risk factors
  const incomeType = values.incomeType as string;
  const industryRisk = values.industryRisk as string;
  const dependents = values.dependents as string;
  const dualIncome = values.dualIncome as string;
  const currentSavings = (values.currentSavings as number) || 0;
  const monthlySavingsCapacity = (values.monthlySavings as number) || 0;

  // Base months calculation
  let baseMonths = 6; // Standard recommendation

  // Income type adjustment
  const incomeMultipliers: Record<string, number> = {
    stable: 0,
    variable: 2,
    contract: 2,
    selfEmployed: 4,
    multipleJobs: -1, // Multiple income sources = lower risk
  };
  baseMonths += incomeMultipliers[incomeType] || 0;

  // Industry risk adjustment
  const industryMultipliers: Record<string, number> = {
    veryStable: -1,
    stable: 0,
    moderate: 1,
    volatile: 2,
    seasonal: 2,
  };
  baseMonths += industryMultipliers[industryRisk] || 0;

  // Dependents adjustment
  const dependentMultipliers: Record<string, number> = {
    "0": 0,
    "1": 1,
    "2": 1,
    "3": 2,
    "4plus": 3,
  };
  baseMonths += dependentMultipliers[dependents] || 0;

  // Dual income adjustment
  if (dualIncome === "dual") {
    baseMonths -= 1; // Lower risk with two incomes
  }

  // Ensure minimum of 3 months, maximum of 12
  baseMonths = Math.max(3, Math.min(12, baseMonths));

  // Calculate fund amounts
  const recommendedFund = monthlyExpenses * baseMonths;
  const minimumFund = monthlyExpenses * 3;
  const amountNeeded = Math.max(0, recommendedFund - currentSavings);

  // Progress calculation
  const progressPercent = recommendedFund > 0 
    ? Math.min(100, Math.round((currentSavings / recommendedFund) * 100)) 
    : 0;

  // Time to goal
  let timeToGoal = "Already funded!";
  if (amountNeeded > 0 && monthlySavingsCapacity > 0) {
    const monthsToGoal = Math.ceil(amountNeeded / monthlySavingsCapacity);
    if (monthsToGoal <= 12) {
      timeToGoal = `${monthsToGoal} months`;
    } else {
      const years = Math.floor(monthsToGoal / 12);
      const remainingMonths = monthsToGoal % 12;
      timeToGoal = remainingMonths > 0 
        ? `${years} year${years > 1 ? 's' : ''}, ${remainingMonths} months`
        : `${years} year${years > 1 ? 's' : ''}`;
    }
  } else if (amountNeeded > 0) {
    timeToGoal = "Set a savings amount to see timeline";
  }

  // Risk level description
  let riskLevel: string;
  if (baseMonths <= 4) riskLevel = "Low Risk";
  else if (baseMonths <= 6) riskLevel = "Moderate Risk";
  else if (baseMonths <= 9) riskLevel = "Elevated Risk";
  else riskLevel = "High Risk";

  // Generate savings timeline table
  const tableData: Array<Record<string, string | number>> = [];
  let runningTotal = currentSavings;
  
  if (monthlySavingsCapacity > 0) {
    for (let month = 0; month <= Math.min(Math.ceil(amountNeeded / monthlySavingsCapacity), 24); month++) {
      const monthsCovered = monthlyExpenses > 0 ? (runningTotal / monthlyExpenses).toFixed(1) : "0";
      const progress = recommendedFund > 0 
        ? Math.min(100, Math.round((runningTotal / recommendedFund) * 100)) 
        : 0;
      
      tableData.push({
        month: month === 0 ? "Current" : `Month ${month}`,
        savedTotal: `$${runningTotal.toLocaleString()}`,
        progress: `${progress}%`,
        monthsCovered: `${monthsCovered} months`,
      });
      
      runningTotal += monthlySavingsCapacity;
      if (runningTotal >= recommendedFund) {
        if (month < Math.ceil(amountNeeded / monthlySavingsCapacity)) {
          tableData.push({
            month: `Month ${month + 1}`,
            savedTotal: `$${recommendedFund.toLocaleString()}`,
            progress: "100%",
            monthsCovered: `${baseMonths} months`,
          });
        }
        break;
      }
    }
  }

  const summary = `Based on your situation, you need ${baseMonths} months of coverage ($${recommendedFund.toLocaleString()}) in your emergency fund. You've saved $${currentSavings.toLocaleString()} (${progressPercent}%) so far.`;

  return {
    values: {
      recommendedFund,
      monthsRecommended: `${baseMonths} months`,
      monthlyExpenses,
      riskLevel,
      currentProgress: `$${currentSavings.toLocaleString()} (${progressPercent}%)`,
      amountNeeded,
      timeToGoal,
      minimumFund,
    },
    formatted: {
      recommendedFund: recommendedFund.toLocaleString(),
      monthsRecommended: `${baseMonths} months`,
      monthlyExpenses: monthlyExpenses.toLocaleString(),
      riskLevel,
      currentProgress: `$${currentSavings.toLocaleString()} (${progressPercent}%)`,
      amountNeeded: amountNeeded.toLocaleString(),
      timeToGoal,
      minimumFund: minimumFund.toLocaleString(),
    },
    summary,
    isValid: monthlyExpenses > 0,
    metadata: {
      tableData,
      riskFactors: {
        incomeType,
        industryRisk,
        dependents,
        dualIncome,
      },
    },
  };
}

export default emergencyFundCalculatorConfig;
