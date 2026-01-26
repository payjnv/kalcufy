import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// BUDGET CALCULATOR V3 CONFIG
// =============================================================================
// Based on Elizabeth Warren's 50/30/20 Rule from "All Your Worth" (2005)
// =============================================================================

export const budgetCalculatorConfig: CalculatorConfigV3 = {
  id: "budget-calculator",
  slug: "budget-calculator",
  name: "Budget Calculator",
  category: "finance",
  icon: "💵",

  // ═══════════════════════════════════════════════════════════════════════════
  // SEO
  // ═══════════════════════════════════════════════════════════════════════════
  seo: {
    title: "Budget Calculator - 50/30/20 Rule & Personal Finance Planner",
    description: "Free budget calculator using the 50/30/20 rule. Allocate your income to needs, wants, and savings. Track expenses, analyze spending patterns, and create a balanced budget plan.",
    shortDescription: "Plan your budget with the 50/30/20 rule",
    keywords: [
      "budget calculator",
      "50 30 20 rule",
      "personal budget planner",
      "monthly budget calculator",
      "expense tracker",
      "budget planning",
      "needs wants savings",
      "household budget",
      "financial planning",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HERO
  // ═══════════════════════════════════════════════════════════════════════════
  hero: {
    badge: "Finance",
    rating: { average: 4.8, count: 28700 },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UNIT SYSTEM
  // ═══════════════════════════════════════════════════════════════════════════
  unitSystem: {
    enabled: false,
    default: "metric",
    options: [],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════════════════
  inputs: [
    // Income Section
    {
      id: "monthlyIncome",
      type: "number",
      label: "Monthly Income (Gross)",
      required: true,
      defaultValue: 5000,
      min: 0,
      step: 100,
      prefix: "$",
      helpText: "Your primary income before taxes",
    },
    {
      id: "secondaryIncome",
      type: "number",
      label: "Secondary Income",
      required: false,
      defaultValue: 0,
      min: 0,
      step: 100,
      prefix: "$",
      helpText: "Side jobs, investments, etc.",
    },
    {
      id: "taxRate",
      type: "slider",
      label: "Estimated Tax Rate",
      required: true,
      defaultValue: 22,
      min: 0,
      max: 50,
      step: 1,
      suffix: "%",
      helpText: "Federal + State + Local taxes",
    },
    // Essential Expenses (Needs)
    {
      id: "housing",
      type: "number",
      label: "Housing (Rent/Mortgage)",
      required: true,
      defaultValue: 1500,
      min: 0,
      step: 50,
      prefix: "$",
    },
    {
      id: "utilities",
      type: "number",
      label: "Utilities",
      required: true,
      defaultValue: 200,
      min: 0,
      step: 10,
      prefix: "$",
      helpText: "Electric, gas, water, internet",
    },
    {
      id: "transportation",
      type: "number",
      label: "Transportation",
      required: true,
      defaultValue: 500,
      min: 0,
      step: 50,
      prefix: "$",
      helpText: "Car payment, gas, insurance, transit",
    },
    {
      id: "groceries",
      type: "number",
      label: "Groceries",
      required: true,
      defaultValue: 400,
      min: 0,
      step: 25,
      prefix: "$",
    },
    {
      id: "healthcare",
      type: "number",
      label: "Healthcare",
      required: true,
      defaultValue: 300,
      min: 0,
      step: 25,
      prefix: "$",
      helpText: "Insurance, medications, co-pays",
    },
    {
      id: "insurance",
      type: "number",
      label: "Insurance (Other)",
      required: false,
      defaultValue: 0,
      min: 0,
      step: 25,
      prefix: "$",
      helpText: "Life, renters, etc.",
    },
    // Wants
    {
      id: "entertainment",
      type: "number",
      label: "Entertainment",
      required: true,
      defaultValue: 200,
      min: 0,
      step: 25,
      prefix: "$",
      helpText: "Dining, movies, hobbies",
    },
    {
      id: "subscriptions",
      type: "number",
      label: "Subscriptions",
      required: false,
      defaultValue: 50,
      min: 0,
      step: 10,
      prefix: "$",
      helpText: "Streaming, gym, apps",
    },
    {
      id: "other",
      type: "number",
      label: "Other Wants",
      required: false,
      defaultValue: 100,
      min: 0,
      step: 25,
      prefix: "$",
      helpText: "Shopping, personal care",
    },
    // Savings & Debt
    {
      id: "savings",
      type: "number",
      label: "Savings",
      required: true,
      defaultValue: 500,
      min: 0,
      step: 50,
      prefix: "$",
      helpText: "Emergency fund, retirement",
    },
    {
      id: "debtPayments",
      type: "number",
      label: "Debt Payments",
      required: true,
      defaultValue: 300,
      min: 0,
      step: 50,
      prefix: "$",
      helpText: "Credit cards, student loans",
    },
  ],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════════════════
  results: [
    {
      id: "remainingBalance",
      type: "primary",
      label: "Remaining Balance",
      format: "number",
      prefix: "$",
    },
    {
      id: "netIncome",
      type: "secondary",
      label: "Net Income (After Tax)",
      format: "number",
      prefix: "$",
    },
    {
      id: "totalExpenses",
      type: "secondary",
      label: "Total Expenses + Savings",
      format: "number",
      prefix: "$",
    },
    {
      id: "needsPercent",
      type: "secondary",
      label: "Needs (Target: 50%)",
      format: "number",
      suffix: "%",
    },
    {
      id: "wantsPercent",
      type: "secondary",
      label: "Wants (Target: 30%)",
      format: "number",
      suffix: "%",
    },
    {
      id: "savingsPercent",
      type: "secondary",
      label: "Savings (Target: 20%)",
      format: "number",
      suffix: "%",
    },
    {
      id: "dtiRatio",
      type: "secondary",
      label: "Debt-to-Income Ratio",
      format: "number",
      suffix: "%",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // INFO CARDS
  // ═══════════════════════════════════════════════════════════════════════════
  infoCards: [
    {
      id: "rule503020",
      title: "The 50/30/20 Rule",
      icon: "📊",
      type: "list",
      items: [
        { label: "50% Needs", value: "Housing, food, utilities", color: "blue" },
        { label: "30% Wants", value: "Entertainment, dining", color: "green" },
        { label: "20% Savings", value: "Emergency fund, debt", color: "purple" },
      ],
    },
    {
      id: "budgetTips",
      title: "Quick Budgeting Tips",
      icon: "💡",
      type: "horizontal",
      items: [
        { label: "Pay yourself first — automate savings" },
        { label: "Track every expense for 1 month" },
        { label: "Review and adjust monthly" },
        { label: "Build 3-6 months emergency fund" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCE DATA
  // ═══════════════════════════════════════════════════════════════════════════
  referenceData: [
    {
      id: "healthyRatios",
      title: "Healthy Financial Ratios",
      icon: "📈",
      columns: 2,
      items: [
        { label: "Housing", value: "≤ 28% of gross" },
        { label: "Total Debt", value: "≤ 36% of gross" },
        { label: "Emergency Fund", value: "3-6 months expenses" },
        { label: "Retirement Savings", value: "10-15% of income" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  educationSections: [
    // 50/30/20 Categories
    {
      id: "categories",
      type: "cards",
      title: "Understanding the 50/30/20 Categories",
      icon: "📋",
      columns: 3,
      cards: [
        {
          title: "50% — Needs",
          description: "Essential expenses you can't avoid: housing, utilities, groceries, healthcare, minimum debt payments, transportation, and insurance.",
          icon: "🏠",
        },
        {
          title: "30% — Wants",
          description: "Non-essential spending that improves quality of life: dining out, entertainment, subscriptions, hobbies, vacations, and luxury items.",
          icon: "🎭",
        },
        {
          title: "20% — Savings",
          description: "Building financial security: emergency fund, retirement accounts, extra debt payments, and investment contributions.",
          icon: "🏦",
        },
      ],
    },
    // Budgeting Methods
    {
      id: "methods",
      type: "cards",
      title: "Popular Budgeting Methods",
      icon: "📑",
      columns: 2,
      cards: [
        {
          title: "50/30/20 Rule",
          description: "Simple percentage-based allocation popularized by Elizabeth Warren. Great for beginners who want a flexible framework.",
          icon: "📊",
        },
        {
          title: "Zero-Based Budget",
          description: "Every dollar has a job. Income minus expenses equals zero. More detailed but requires tracking every expense.",
          icon: "🎯",
        },
        {
          title: "Envelope System",
          description: "Cash-based method where you allocate physical cash to spending categories. Effective for controlling overspending.",
          icon: "✉️",
        },
        {
          title: "Pay Yourself First",
          description: "Automatically save a set percentage before spending. Prioritizes savings over discretionary spending.",
          icon: "💰",
        },
      ],
    },
    // REQUIRED: Important Considerations
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        {
          text: "The 50/30/20 rule is a guideline, not a strict law. Adjust percentages based on your location, income level, and financial goals.",
          type: "info",
        },
        {
          text: "High cost-of-living areas may require 60% or more for needs. Consider the 60/20/20 or 70/20/10 variations if necessary.",
          type: "warning",
        },
        {
          text: "If your needs exceed 50%, focus on reducing big expenses like housing or transportation before cutting wants to zero.",
          type: "info",
        },
        {
          text: "Don't cut wants completely — research shows deprivation leads to budget burnout and overspending rebounds.",
          type: "warning",
        },
        {
          text: "Debt payments above minimums count as 'savings' because they build your net worth by reducing liabilities.",
          type: "info",
        },
        {
          text: "Review your budget monthly and adjust as income or expenses change. A budget is a living document.",
          type: "info",
        },
      ],
    },
    // REQUIRED: Example Calculation
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Budget Calculation",
      icon: "🧮",
      description: "Monthly gross income of $6,000 with 25% tax rate",
      columns: 2,
      examples: [
        {
          title: "Calculate Net Income",
          steps: [
            "Gross Income: $6,000/month",
            "Tax Rate: 25%",
            "Taxes: $6,000 × 0.25 = $1,500",
            "Net Income: $6,000 - $1,500 = $4,500",
          ],
          result: "Net Income: $4,500/month",
        },
        {
          title: "Apply 50/30/20 Rule",
          steps: [
            "Needs (50%): $4,500 × 0.50 = $2,250",
            "Wants (30%): $4,500 × 0.30 = $1,350",
            "Savings (20%): $4,500 × 0.20 = $900",
          ],
          result: "Total Allocated: $4,500",
        },
      ],
    },
    // Prose: What is a Budget
    {
      id: "whatIsBudget",
      type: "prose",
      title: "What is a Personal Budget?",
      content: "A personal budget is a financial plan that allocates your income toward expenses, savings, and debt repayment. It helps you understand where your money goes, identify areas to cut back, and work toward financial goals. The most successful budgets balance two principles: living within your means today while planning for your future. Without a budget, it's easy to overspend in some areas and neglect savings entirely.",
    },
    // Prose: 50/30/20 Origin
    {
      id: "ruleOrigin",
      type: "prose",
      title: "The 50/30/20 Rule Origin",
      content: "The 50/30/20 budget rule was popularized by Senator Elizabeth Warren and her daughter Amelia Warren Tyagi in their 2005 book 'All Your Worth: The Ultimate Lifetime Money Plan.' Warren, a bankruptcy law expert at Harvard, developed this simple framework after studying why families go broke. The rule's power lies in its simplicity — three easy-to-remember percentages that ensure balanced spending without requiring detailed expense tracking.",
    },
    // Prose: Adapting the Rule
    {
      id: "adaptingRule",
      type: "prose",
      title: "When to Adapt the Rule",
      content: "The 50/30/20 rule works well for middle-income earners in average cost-of-living areas, but may need adjustment. If you live in an expensive city, you might need 60/25/15 or even 70/20/10. If you're paying off high-interest debt, consider 50/20/30 with extra going to debt. High earners should save more than 20% — some experts recommend saving 50%+ if possible. The key is finding a sustainable balance that moves you toward your goals.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // FAQs
  // ═══════════════════════════════════════════════════════════════════════════
  faqs: [
    {
      question: "What is the 50/30/20 budget rule?",
      answer: "The 50/30/20 rule, popularized by Elizabeth Warren, divides your after-tax income into three categories: 50% for needs (housing, utilities, groceries), 30% for wants (entertainment, dining out), and 20% for savings and debt repayment. It provides a simple framework for balanced spending without detailed tracking.",
    },
    {
      question: "Should I use gross or net income for budgeting?",
      answer: "Use your net income (after-tax take-home pay) for the 50/30/20 rule. This is the money actually available for spending and saving. Gross income is useful for calculating debt-to-income ratios that lenders use, but your budget should be based on what you actually receive.",
    },
    {
      question: "What if my needs exceed 50% of my income?",
      answer: "This is common in high cost-of-living areas. First, look for ways to reduce big expenses — consider a roommate, refinancing, or downsizing. If that's not possible, adjust to 60/20/20 or 70/20/10. The key is to maintain some savings (at least 10%) even if needs are high. Never cut savings to zero.",
    },
    {
      question: "What counts as a 'need' vs a 'want'?",
      answer: "Needs are expenses required for basic living and work: shelter, basic utilities, groceries (not dining out), healthcare, minimum debt payments, basic transportation, and work-required expenses. Wants are everything else: restaurant meals, streaming services, gym memberships, vacations, and upgraded versions of needs (luxury apartment vs basic).",
    },
    {
      question: "Should extra debt payments count as savings?",
      answer: "Yes! Elizabeth Warren specifically includes extra debt payments (above the minimum) in the 20% savings category. Paying off debt increases your net worth just like saving money does. In fact, paying off high-interest debt often provides a better 'return' than investing, since you're avoiding 20%+ interest charges.",
    },
    {
      question: "How do I start budgeting if I've never done it?",
      answer: "Start by tracking every expense for one month — use an app or spreadsheet. Then categorize expenses into needs, wants, and savings. Compare to the 50/30/20 targets and identify one or two areas to adjust. Automate your savings on payday. Review and adjust monthly. Small changes compound over time.",
    },
    {
      question: "What's a healthy debt-to-income (DTI) ratio?",
      answer: "Lenders prefer a DTI (monthly debt payments ÷ gross income) of 36% or less, with housing costs under 28%. A DTI above 43% may make it difficult to qualify for mortgages. For financial health, aim to keep total debt payments (including housing) under 36% of gross income.",
    },
    {
      question: "How much should I have in my emergency fund?",
      answer: "Most experts recommend 3-6 months of essential expenses. If you have stable employment and good job security, 3 months may suffice. If you're self-employed, have variable income, or work in an unstable industry, aim for 6-12 months. Start with $1,000 as a starter emergency fund while paying off debt.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCES (exactly 2)
  // ═══════════════════════════════════════════════════════════════════════════
  references: [
    {
      authors: "Warren, Elizabeth & Tyagi, Amelia Warren",
      year: "2005",
      title: "All Your Worth: The Ultimate Lifetime Money Plan",
      source: "Free Press",
    },
    {
      authors: "Bankrate",
      year: "2025",
      title: "The 50/30/20 Budget Rule Explained",
      source: "Bankrate Financial Education",
      url: "https://www.bankrate.com/banking/what-is-the-50-30-20-rule/",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // DETAILED TABLE
  // ═══════════════════════════════════════════════════════════════════════════
  detailedTable: {
    id: "expenseBreakdown",
    buttonLabel: "View Full Expense Breakdown",
    buttonIcon: "📋",
    modalTitle: "Monthly Expense Breakdown",
    columns: [
      { id: "category", label: "Category", align: "left" },
      { id: "amount", label: "Amount", align: "right" },
      { id: "percent", label: "% of Income", align: "right", highlight: true },
      { id: "type", label: "Type", align: "center" },
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
  relatedCalculators: [
    "savings-calculator",
    "debt-payoff-calculator",
    "emergency-fund-calculator",
    "net-worth-calculator",
  ],

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
// CALCULATE FUNCTION
// =============================================================================
export function calculateBudget(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;

  // Income
  const monthlyIncome = (values.monthlyIncome as number) || 0;
  const secondaryIncome = (values.secondaryIncome as number) || 0;
  const taxRate = (values.taxRate as number) || 0;

  // Expenses - Needs
  const housing = (values.housing as number) || 0;
  const utilities = (values.utilities as number) || 0;
  const transportation = (values.transportation as number) || 0;
  const groceries = (values.groceries as number) || 0;
  const healthcare = (values.healthcare as number) || 0;
  const insurance = (values.insurance as number) || 0;

  // Expenses - Wants
  const entertainment = (values.entertainment as number) || 0;
  const subscriptions = (values.subscriptions as number) || 0;
  const other = (values.other as number) || 0;

  // Savings & Debt
  const savings = (values.savings as number) || 0;
  const debtPayments = (values.debtPayments as number) || 0;

  // Calculate income
  const grossIncome = monthlyIncome + secondaryIncome;
  const taxAmount = grossIncome * (taxRate / 100);
  const netIncome = grossIncome - taxAmount;

  // Calculate totals by category
  const needsTotal = housing + utilities + transportation + groceries + healthcare + insurance;
  const wantsTotal = entertainment + subscriptions + other;
  const savingsTotal = savings + debtPayments;
  const totalExpenses = needsTotal + wantsTotal + savingsTotal;

  // Calculate remaining
  const remainingBalance = netIncome - totalExpenses;

  // Calculate percentages
  const needsPercent = netIncome > 0 ? (needsTotal / netIncome) * 100 : 0;
  const wantsPercent = netIncome > 0 ? (wantsTotal / netIncome) * 100 : 0;
  const savingsPercent = netIncome > 0 ? (savingsTotal / netIncome) * 100 : 0;

  // DTI Ratio (using gross income per industry standard)
  const dtiRatio = grossIncome > 0 ? ((housing + debtPayments) / grossIncome) * 100 : 0;

  // Build table data
  const tableData = [
    { category: "Housing", amount: `$${housing.toLocaleString()}`, percent: netIncome > 0 ? `${((housing / netIncome) * 100).toFixed(1)}%` : "0%", type: "Need" },
    { category: "Utilities", amount: `$${utilities.toLocaleString()}`, percent: netIncome > 0 ? `${((utilities / netIncome) * 100).toFixed(1)}%` : "0%", type: "Need" },
    { category: "Transportation", amount: `$${transportation.toLocaleString()}`, percent: netIncome > 0 ? `${((transportation / netIncome) * 100).toFixed(1)}%` : "0%", type: "Need" },
    { category: "Groceries", amount: `$${groceries.toLocaleString()}`, percent: netIncome > 0 ? `${((groceries / netIncome) * 100).toFixed(1)}%` : "0%", type: "Need" },
    { category: "Healthcare", amount: `$${healthcare.toLocaleString()}`, percent: netIncome > 0 ? `${((healthcare / netIncome) * 100).toFixed(1)}%` : "0%", type: "Need" },
    { category: "Insurance", amount: `$${insurance.toLocaleString()}`, percent: netIncome > 0 ? `${((insurance / netIncome) * 100).toFixed(1)}%` : "0%", type: "Need" },
    { category: "Entertainment", amount: `$${entertainment.toLocaleString()}`, percent: netIncome > 0 ? `${((entertainment / netIncome) * 100).toFixed(1)}%` : "0%", type: "Want" },
    { category: "Subscriptions", amount: `$${subscriptions.toLocaleString()}`, percent: netIncome > 0 ? `${((subscriptions / netIncome) * 100).toFixed(1)}%` : "0%", type: "Want" },
    { category: "Other", amount: `$${other.toLocaleString()}`, percent: netIncome > 0 ? `${((other / netIncome) * 100).toFixed(1)}%` : "0%", type: "Want" },
    { category: "Savings", amount: `$${savings.toLocaleString()}`, percent: netIncome > 0 ? `${((savings / netIncome) * 100).toFixed(1)}%` : "0%", type: "Savings" },
    { category: "Debt Payments", amount: `$${debtPayments.toLocaleString()}`, percent: netIncome > 0 ? `${((debtPayments / netIncome) * 100).toFixed(1)}%` : "0%", type: "Savings" },
  ].filter(item => parseFloat(item.amount.replace(/[$,]/g, '')) > 0);

  // Determine budget health
  let budgetStatus = "balanced";
  if (remainingBalance < 0) budgetStatus = "deficit";
  else if (savingsPercent < 10) budgetStatus = "low-savings";
  else if (needsPercent > 60) budgetStatus = "high-needs";

  return {
    values: {
      remainingBalance,
      netIncome,
      totalExpenses,
      needsPercent,
      wantsPercent,
      savingsPercent,
      dtiRatio,
    },
    formatted: {
      remainingBalance: remainingBalance.toLocaleString(),
      netIncome: netIncome.toLocaleString(),
      totalExpenses: totalExpenses.toLocaleString(),
      needsPercent: needsPercent.toFixed(1),
      wantsPercent: wantsPercent.toFixed(1),
      savingsPercent: savingsPercent.toFixed(1),
      dtiRatio: dtiRatio.toFixed(1),
    },
    summary: `Net Income: $${netIncome.toLocaleString()} | Needs: ${needsPercent.toFixed(0)}% | Wants: ${wantsPercent.toFixed(0)}% | Savings: ${savingsPercent.toFixed(0)}%`,
    isValid: grossIncome > 0,
    metadata: {
      tableData,
      budgetStatus,
      needsTotal,
      wantsTotal,
      savingsTotal,
    },
  };
}

export default budgetCalculatorConfig;
