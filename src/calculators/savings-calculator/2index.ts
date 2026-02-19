import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ═══════════════════════════════════════════════════════════════════
// 💰 SAVINGS CALCULATOR — Growth & Goal Mode
// ═══════════════════════════════════════════════════════════════════

export const savingsCalculatorConfig: CalculatorConfigV4 = {
  id: "savings-calculator",
  version: "4.0",
  category: "finance",
  icon: "💰",

  presets: [
    {
      id: "emergencyFund",
      icon: "🛡️",
      values: {
        mode: "growth",
        initialDeposit: 1000,
        monthlyContribution: 500,
        contributionIncrease: 0,
        annualContribution: 0,
        interestRate: 4.5,
        compoundFrequency: "daily",
        timeYears: 1,
        timeMonths: 6,
        includeTax: false,
        taxRate: 25,
        includeInflation: false,
        inflationRate: 3,
        savingsGoal: 10000,
      },
    },
    {
      id: "vacationFund",
      icon: "✈️",
      values: {
        mode: "goal",
        initialDeposit: 500,
        monthlyContribution: 300,
        contributionIncrease: 0,
        annualContribution: 0,
        interestRate: 4.5,
        compoundFrequency: "monthly",
        timeYears: 2,
        timeMonths: 0,
        includeTax: false,
        taxRate: 25,
        includeInflation: false,
        inflationRate: 3,
        savingsGoal: 8000,
      },
    },
    {
      id: "downPayment",
      icon: "🏠",
      values: {
        mode: "goal",
        initialDeposit: 10000,
        monthlyContribution: 1000,
        contributionIncrease: 3,
        annualContribution: 0,
        interestRate: 5.0,
        compoundFrequency: "monthly",
        timeYears: 5,
        timeMonths: 0,
        includeTax: false,
        taxRate: 25,
        includeInflation: false,
        inflationRate: 3,
        savingsGoal: 80000,
      },
    },
    {
      id: "collegeFund",
      icon: "🎓",
      values: {
        mode: "growth",
        initialDeposit: 5000,
        monthlyContribution: 400,
        contributionIncrease: 5,
        annualContribution: 2000,
        interestRate: 6.0,
        compoundFrequency: "monthly",
        timeYears: 18,
        timeMonths: 0,
        includeTax: false,
        taxRate: 25,
        includeInflation: true,
        inflationRate: 3,
        savingsGoal: 100000,
      },
    },
    {
      id: "wealthBuilding",
      icon: "💎",
      values: {
        mode: "growth",
        initialDeposit: 25000,
        monthlyContribution: 1500,
        contributionIncrease: 3,
        annualContribution: 5000,
        interestRate: 7.0,
        compoundFrequency: "monthly",
        timeYears: 25,
        timeMonths: 0,
        includeTax: false,
        taxRate: 25,
        includeInflation: true,
        inflationRate: 3,
        savingsGoal: 500000,
      },
    },
  ],

  t: {
    en: {
      name: "Savings Calculator",
      slug: "savings-calculator",
      breadcrumb: "Savings Calculator",

      seo: {
        title: "Savings Calculator - Goal Planner & Growth Estimator",
        description: "Plan your savings with compound interest, monthly contributions, and annual increases. Set savings goals and see year-by-year projections. Free online tool.",
        shortDescription: "Calculate savings growth with contributions and goals.",
        keywords: [
          "savings calculator",
          "savings goal calculator",
          "how much should I save",
          "savings growth calculator",
          "compound savings calculator",
          "monthly savings calculator",
          "free savings calculator",
          "savings plan calculator",
        ],
      },

      subtitle: "Plan your savings strategy with compound interest, regular contributions, and annual increases to reach your financial goals.",

      calculator: { yourInformation: "Your Information" },
      ui: {
        yourInformation: "Savings Plan",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        mode: {
          label: "Calculator Mode",
          helpText: "Growth mode shows how much you'll have. Goal mode shows if you'll reach your target.",
          options: {
            growth: "Growth Projection",
            goal: "Savings Goal",
          },
        },
        initialDeposit: {
          label: "Starting Balance",
          helpText: "How much you already have saved",
        },
        monthlyContribution: {
          label: "Monthly Contribution",
          helpText: "Amount you plan to save each month",
        },
        contributionIncrease: {
          label: "Annual Increase",
          helpText: "Percentage to increase your monthly contribution each year",
        },
        annualContribution: {
          label: "Annual Bonus Deposit",
          helpText: "Extra lump sum added once per year (e.g., tax refund, bonus)",
        },
        interestRate: {
          label: "Interest Rate (APR)",
          helpText: "Annual interest rate on your savings account",
        },
        compoundFrequency: {
          label: "Compound Frequency",
          helpText: "How often interest compounds on your savings",
          options: {
            daily: "Daily (365/yr)",
            monthly: "Monthly (12/yr)",
            quarterly: "Quarterly (4/yr)",
            semiannually: "Semi-annually (2/yr)",
            annually: "Annually (1/yr)",
          },
        },
        timeYears: {
          label: "Years",
          helpText: "How many years you plan to save",
        },
        timeMonths: {
          label: "Months",
          helpText: "Additional months beyond full years",
        },
        savingsGoal: {
          label: "Savings Goal",
          helpText: "Your target savings amount",
        },
        includeTax: {
          label: "Include Tax on Interest",
          helpText: "Apply tax rate to interest earned",
        },
        taxRate: {
          label: "Tax Rate",
          helpText: "Marginal tax rate on interest income",
        },
        includeInflation: {
          label: "Adjust for Inflation",
          helpText: "Show real purchasing power of your savings",
        },
        inflationRate: {
          label: "Inflation Rate",
          helpText: "Expected average annual inflation",
        },
      },

      results: {
        endingBalance: { label: "Total Savings" },
        totalInterest: { label: "Interest Earned" },
        totalDeposited: { label: "Total Deposited" },
        effectiveRate: { label: "Effective Rate (APY)" },
        goalProgress: { label: "Goal Progress" },
        goalSurplus: { label: "Goal Surplus / Shortfall" },
        monthlyNeeded: { label: "Monthly Needed for Goal" },
        taxPaid: { label: "Tax on Interest" },
        buyingPower: { label: "Buying Power" },
        milestoneYear: { label: "Goal Reached In" },
      },

      presets: {
        emergencyFund: { label: "Emergency Fund", description: "$1K start, $500/mo for 18 months at 4.5%" },
        vacationFund: { label: "Vacation Fund", description: "Goal: $8K in 2 years, $300/mo at 4.5%" },
        downPayment: { label: "Down Payment", description: "Goal: $80K in 5 years, $1K/mo +3%/yr at 5%" },
        collegeFund: { label: "College Fund", description: "$5K start, $400/mo +5%/yr for 18 years at 6%" },
        wealthBuilding: { label: "Wealth Building", description: "$25K start, $1.5K/mo +3%/yr for 25 years at 7%" },
      },

      values: {
        "years": "years",
        "year": "year",
        "months": "months",
        "month": "month",
        "onTrack": "On Track",
        "behindSchedule": "Behind Schedule",
        "goalReached": "Goal Reached!",
        "surplus": "surplus",
        "shortfall": "shortfall",
        "perYear": "/yr",
      },

      formats: {
        summary: "Your savings will reach {endingBalance} over {duration}, earning {totalInterest} in interest on {totalDeposited} deposited.",
      },

      infoCards: {
        metrics: {
          title: "Growth Insights",
          items: [
            { label: "Growth Multiplier", valueKey: "growthMultiplier" },
            { label: "Interest as % of Balance", valueKey: "interestPercent" },
            { label: "Average Monthly Growth", valueKey: "avgMonthlyGrowth" },
            { label: "Final Monthly Contribution", valueKey: "finalMonthlyContrib" },
          ],
        },
        details: {
          title: "Goal Analysis",
          items: [
            { label: "Escalation Impact", valueKey: "escalationImpact" },
            { label: "Annual Bonus Total", valueKey: "annualBonusTotal" },
            { label: "Average Annual Return", valueKey: "avgAnnualReturn" },
            { label: "Milestone Reached In", valueKey: "milestoneYear" },
          ],
        },
        tips: {
          title: "Savings Tips",
          items: [
            "Automate your savings — set up automatic transfers on payday so you pay yourself first",
            "Increase contributions annually by at least the inflation rate to maintain real savings power",
            "Keep your emergency fund in a high-yield savings account for easy access and better returns",
            "Use the 50/30/20 rule: allocate 20% of after-tax income to savings and debt repayment",
          ],
        },
      },

      chart: {
        title: "Savings Growth Projection",
        xLabel: "Year",
        yLabel: "Balance",
        series: {
          deposits: "Total Deposited",
          interest: "Interest Earned",
          goal: "Savings Goal",
        },
      },

      detailedTable: {
        savingsTable: {
          button: "View Year-by-Year Savings Table",
          title: "Year-by-Year Savings Breakdown",
          columns: {
            year: "Year",
            monthlyAmount: "Monthly Contrib.",
            yearDeposits: "Year Deposits",
            yearInterest: "Year Interest",
            totalDeposited: "Total Deposited",
            balance: "Balance",
          },
        },
      },

      education: {
        whatIs: {
          title: "What Is a Savings Calculator?",
          content: "A savings calculator helps you project how your money will grow over time with regular contributions and compound interest. Unlike simple interest calculators that only consider a lump sum, a savings calculator accounts for ongoing monthly deposits, annual bonus contributions, and even annual increases to your savings rate. This makes it much more realistic for actual financial planning. Whether you are building an emergency fund, saving for a down payment, or planning for your child's education, a savings calculator shows you exactly how much you will have at any point in the future and whether you are on track to meet your goals.",
        },
        howItWorks: {
          title: "How Savings Growth Is Calculated",
          content: "Savings growth combines the compound interest formula with future value of annuity calculations. Your initial deposit grows using A = P(1 + r/n)^(nt). Each monthly contribution is treated as a separate deposit that compounds for its remaining time. When you add annual contribution increases, each year's monthly payment is multiplied by (1 + increase%)^year. The annual bonus deposit is added as a lump sum at the start or end of each year. For savings goal calculations, the required monthly contribution is solved using the PMT formula: PMT = (FV - PV(1+r/n)^(nt)) × (r/n) / ((1+r/n)^(nt) - 1), where FV is your goal amount.",
        },
        considerations: {
          title: "Important Savings Considerations",
          items: [
            { text: "FDIC insurance covers up to $250,000 per depositor per bank — spread large savings across institutions", type: "warning" },
            { text: "High-yield savings accounts currently offer 4-5% APY — significantly more than traditional banks at 0.01-0.1%", type: "info" },
            { text: "Contribution escalation is powerful — increasing savings by just 1% per year can add tens of thousands over decades", type: "info" },
            { text: "Tax-advantaged accounts like Roth IRAs let savings grow tax-free, dramatically improving long-term results", type: "info" },
            { text: "Emergency funds should cover 3-6 months of expenses before investing in higher-risk options", type: "warning" },
            { text: "Inflation erodes savings — a 4% savings rate with 3% inflation gives only 1% real growth", type: "warning" },
          ],
        },
        categories: {
          title: "Types of Savings Strategies",
          items: [
            { text: "Emergency Fund: 3-6 months expenses in high-yield savings, prioritized above all other savings goals", type: "info" },
            { text: "Sinking Funds: Targeted savings for specific goals like vacations, car repairs, or holiday gifts", type: "info" },
            { text: "Down Payment Savings: Typically 20% of home price, usually 3-7 years of focused saving", type: "info" },
            { text: "Education Savings: 529 plans offer tax advantages for college costs, start as early as possible", type: "info" },
            { text: "Retirement Savings: 401(k) and IRA contributions with employer matching should start in your 20s", type: "info" },
            { text: "Wealth Building: After emergency and retirement basics, invest in diversified index funds for long-term growth", type: "info" },
          ],
        },
        examples: {
          title: "Savings Growth Examples",
          description: "Real-world savings scenarios with compound interest",
          examples: [
            {
              title: "Emergency Fund: $500/mo at 4.5% for 12 months",
              steps: [
                "Starting balance: $0, Monthly: $500, Rate: 4.5% daily compound",
                "Month 1: $500.00 → earns ~$0.18",
                "Month 6: $3,020 (deposited $3,000, earned $20)",
                "Month 12: $6,113 (deposited $6,000, earned $113)",
              ],
              result: "Total: $6,113 — You earned $113 in interest while building your safety net",
            },
            {
              title: "Down Payment: $1,000/mo +3%/yr for 5 years at 5%",
              steps: [
                "Starting: $10,000, Monthly: $1,000 increasing 3%/yr",
                "Year 1: $1,000/mo → $22,310 balance",
                "Year 3: $1,061/mo → $49,832 balance",
                "Year 5: $1,126/mo → $82,540 balance",
                "Total deposited: $75,185, Interest: $7,355",
              ],
              result: "Final: $82,540 — Contribution escalation added $3,700+ vs flat $1,000/mo",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How much should I have in savings?",
          answer: "Financial experts generally recommend having 3-6 months of essential expenses in an emergency fund as a baseline. Beyond that, savings goals depend on your situation: 20% of your home's price for a down payment, $250,000+ for college per child, and 10-15% of income for retirement. The 50/30/20 rule suggests allocating 20% of after-tax income to savings and debt repayment. Start with the emergency fund, then work toward other goals simultaneously.",
        },
        {
          question: "What is contribution escalation and why does it matter?",
          answer: "Contribution escalation means increasing your monthly savings amount by a fixed percentage each year. Even a 3% annual increase — roughly matching inflation — can significantly boost your long-term savings. For example, starting at $500/month with 3% annual increases over 20 years results in saving about $16,000 more than keeping contributions flat, plus additional compound interest on those extra deposits. Most employers offer automatic 401(k) escalation for this reason.",
        },
        {
          question: "Should I save in a high-yield savings account or invest?",
          answer: "It depends on your timeline and goals. For short-term goals (under 3 years) and emergency funds, high-yield savings accounts offering 4-5% APY are ideal because they provide FDIC insurance and instant access. For goals 5+ years away, investing in diversified index funds historically returns 7-10% annually, though with more volatility. For 3-5 year goals, CDs or bond funds offer a middle ground between safety and returns.",
        },
        {
          question: "How does compound frequency affect my savings?",
          answer: "Daily compounding earns slightly more than monthly or annual compounding. At 5% APR: annual compounding gives exactly 5.000% APY, monthly gives 5.116% APY, and daily gives 5.127% APY. The difference between daily and monthly is minimal (about $1 per $10,000 per year), so don't switch banks just for compounding frequency. Focus on the actual APY rate instead, which already accounts for compounding.",
        },
        {
          question: "What is the difference between APR and APY for savings?",
          answer: "APR (Annual Percentage Rate) is the stated interest rate without accounting for compounding. APY (Annual Percentage Yield) includes the effect of compounding and represents your true annual return. Banks are required to advertise APY on savings products. For example, 5% APR with monthly compounding equals 5.116% APY. When comparing savings accounts, always compare APY to APY for an accurate comparison.",
        },
        {
          question: "How do I calculate how much I need to save monthly to reach a goal?",
          answer: "Use the formula: PMT = (Goal - InitialDeposit × (1+r/n)^(nt)) × (r/n) / ((1+r/n)^(nt) - 1). For a simpler estimate without interest, divide your goal minus current savings by the number of months. For example, to save $20,000 in 3 years starting from $2,000: ($20,000 - $2,000) / 36 = $500/month minimum. With 4.5% interest, you'd actually need about $475/month. Use our calculator in Goal mode for exact numbers.",
        },
      ],

      buttons: {
        calculate: "Calculate",
        reset: "Reset",
        pdf: "PDF",
        csv: "CSV",
        excel: "Excel",
        save: "Save",
        saved: "Saved",
        saving: "Saving...",
      },

      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
  },

  // ─── INPUTS ─────────────────────────────────────────────────────
  inputs: [
    {
      id: "mode",
      type: "radio",
      defaultValue: "growth",
      options: [{ value: "growth" }, { value: "goal" }],
    },
    {
      id: "initialDeposit",
      type: "number",
      defaultValue: null,
      placeholder: "5000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 0,
      max: 100000000,
    },
    {
      id: "monthlyContribution",
      type: "number",
      defaultValue: null,
      placeholder: "500",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 0,
      max: 1000000,
    },
    {
      id: "contributionIncrease",
      type: "number",
      defaultValue: 0,
      min: 0,
      max: 50,
      step: 0.5,
      suffix: "%",
    },
    {
      id: "annualContribution",
      type: "number",
      defaultValue: 0,
      placeholder: "0",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 0,
      max: 10000000,
    },
    {
      id: "interestRate",
      type: "number",
      defaultValue: 4.5,
      min: 0,
      max: 50,
      step: 0.1,
      suffix: "%",
    },
    {
      id: "compoundFrequency",
      type: "select",
      defaultValue: "daily",
      options: [
        { value: "daily" },
        { value: "monthly" },
        { value: "quarterly" },
        { value: "semiannually" },
        { value: "annually" },
      ],
    },
    {
      id: "timeYears",
      type: "number",
      defaultValue: 5,
      min: 0,
      max: 100,
      step: 1,
      suffix: "years",
      width: "half",
    },
    {
      id: "timeMonths",
      type: "number",
      defaultValue: 0,
      min: 0,
      max: 11,
      step: 1,
      suffix: "months",
      width: "half",
    },
    {
      id: "savingsGoal",
      type: "number",
      defaultValue: null,
      placeholder: "50000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 0,
      max: 100000000,
      showWhen: { field: "mode", value: "goal" },
    },
    {
      id: "includeTax",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "taxRate",
      type: "number",
      defaultValue: 25,
      min: 0,
      max: 60,
      step: 0.1,
      suffix: "%",
      showWhen: { field: "includeTax", value: true },
    },
    {
      id: "includeInflation",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "inflationRate",
      type: "number",
      defaultValue: 3,
      min: 0,
      max: 30,
      step: 0.1,
      suffix: "%",
      showWhen: { field: "includeInflation", value: true },
    },
  ],

  inputGroups: [],

  results: [
    { id: "endingBalance", type: "primary", format: "number" },
    { id: "totalInterest", type: "secondary", format: "number" },
    { id: "totalDeposited", type: "secondary", format: "number" },
    { id: "effectiveRate", type: "secondary", format: "percent" },
    { id: "goalProgress", type: "secondary", format: "text" },
    { id: "goalSurplus", type: "secondary", format: "number" },
    { id: "monthlyNeeded", type: "secondary", format: "number" },
    { id: "taxPaid", type: "secondary", format: "number" },
    { id: "buyingPower", type: "secondary", format: "number" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "💰", itemCount: 4 },
    { id: "details", type: "list", icon: "🎯", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  chart: {
    id: "savingsGrowth",
    type: "composed",
    xKey: "year",
    height: 340,
    stacked: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "deposits", type: "area", stackId: "savings", color: "#3b82f6" },
      { key: "interest", type: "area", stackId: "savings", color: "#10b981" },
      { key: "goal", type: "line", color: "#f97316", dashed: true },
    ],
  },

  detailedTable: {
    id: "savingsTable",
    buttonLabel: "View Year-by-Year Savings Table",
    buttonIcon: "📅",
    modalTitle: "Year-by-Year Savings Breakdown",
    columns: [
      { id: "year", label: "Year", align: "center" },
      { id: "monthlyAmount", label: "Monthly Contrib.", align: "right" },
      { id: "yearDeposits", label: "Year Deposits", align: "right" },
      { id: "yearInterest", label: "Year Interest", align: "right" },
      { id: "totalDeposited", label: "Total Deposited", align: "right" },
      { id: "balance", label: "Balance", align: "right", highlight: true },
    ],
  },

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    {
      authors: "Consumer Financial Protection Bureau",
      year: "2024",
      title: "Start Saving — Building Your Emergency Fund",
      source: "CFPB",
      url: "https://www.consumerfinance.gov/start-small-save-up/start-saving/",
    },
    {
      authors: "Federal Deposit Insurance Corporation",
      year: "2024",
      title: "Deposit Insurance FAQs — Are My Deposits Insured?",
      source: "FDIC",
      url: "https://www.fdic.gov/resources/deposit-insurance/faq/",
    },
  ],

  hero: { badge: "Finance", headline: "Savings Calculator" },
  sidebar: {},
  features: {},
  relatedCalculators: [
    "interest-calculator",
    "investment-calculator",
    "retirement-calculator",
    "compound-interest-calculator",
  ],
  ads: {},
};

// ═══════════════════════════════════════════════════════════════════
// 🧮 CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════════

export function calculateSavingsCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ─── Read inputs ────────────────────────────────────────────
  const mode = (values.mode as string) || "growth";
  const initialDeposit = (values.initialDeposit as number | null) ?? 0;
  const monthlyBase = (values.monthlyContribution as number | null) ?? 0;
  const contributionIncrease = (values.contributionIncrease as number | null) ?? 0;
  const annualContribution = (values.annualContribution as number | null) ?? 0;
  const interestRate = (values.interestRate as number | null) ?? 4.5;
  const compoundFrequency = (values.compoundFrequency as string) || "daily";
  const timeYears = (values.timeYears as number | null) ?? 0;
  const timeMonths = (values.timeMonths as number | null) ?? 0;
  const savingsGoal = (values.savingsGoal as number | null) ?? 0;
  const includeTax = values.includeTax === true;
  const taxRate = includeTax ? ((values.taxRate as number | null) ?? 25) : 0;
  const includeInflation = values.includeInflation === true;
  const inflationRate = includeInflation ? ((values.inflationRate as number | null) ?? 3) : 0;

  const totalMonths = timeYears * 12 + timeMonths;
  if (totalMonths <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Need at least some money to calculate
  if (initialDeposit <= 0 && monthlyBase <= 0 && annualContribution <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ─── Compounding ────────────────────────────────────────────
  const compMap: Record<string, number> = {
    daily: 365, monthly: 12, quarterly: 4, semiannually: 2, annually: 1,
  };
  const n = compMap[compoundFrequency] || 12;
  const r = interestRate / 100;
  const totalYears = totalMonths / 12;

  // ─── Month-by-month simulation ──────────────────────────────
  let balance = initialDeposit;
  let totalInterest = 0;
  let totalDeposited = initialDeposit;
  let milestoneMonth = -1;

  const chartData: Array<Record<string, unknown>> = [];
  const tableData: Array<Record<string, unknown>> = [];
  const currSym = sym(fieldUnits);

  // Year 0
  chartData.push({
    year: "0",
    deposits: initialDeposit,
    interest: 0,
    balance: initialDeposit,
    goal: mode === "goal" && savingsGoal > 0 ? savingsGoal : undefined,
  });

  const totalYearsInt = Math.ceil(totalYears);

  for (let year = 1; year <= totalYearsInt; year++) {
    const monthsThisYear = year === totalYearsInt && totalMonths % 12 !== 0
      ? totalMonths % 12
      : 12;

    // Monthly contribution with escalation
    const escalationFactor = Math.pow(1 + contributionIncrease / 100, year - 1);
    const currentMonthly = monthlyBase * escalationFactor;

    let yearDeposits = 0;
    let yearInterest = 0;

    // Annual bonus at start of year
    if (annualContribution > 0 && year <= Math.floor(totalYears) + (totalMonths % 12 > 0 ? 1 : 0)) {
      balance += annualContribution;
      totalDeposited += annualContribution;
      yearDeposits += annualContribution;
    }

    for (let month = 1; month <= monthsThisYear; month++) {
      // Monthly contribution
      if (currentMonthly > 0) {
        balance += currentMonthly;
        totalDeposited += currentMonthly;
        yearDeposits += currentMonthly;
      }

      // Interest for this month
      const monthInterest = balance * (Math.pow(1 + r / n, n / 12) - 1);
      balance += monthInterest;
      totalInterest += monthInterest;
      yearInterest += monthInterest;

      // Check milestone
      if (milestoneMonth === -1 && mode === "goal" && savingsGoal > 0 && balance >= savingsGoal) {
        milestoneMonth = (year - 1) * 12 + month;
      }
    }

    chartData.push({
      year: `${year}`,
      deposits: Math.round(totalDeposited),
      interest: Math.round(totalInterest),
      balance: Math.round(balance),
      goal: mode === "goal" && savingsGoal > 0 ? savingsGoal : undefined,
    });

    tableData.push({
      year: `${year}`,
      monthlyAmount: fmtCurr(currentMonthly, currSym),
      yearDeposits: fmtCurr(yearDeposits, currSym),
      yearInterest: fmtCurr(yearInterest, currSym),
      totalDeposited: fmtCurr(totalDeposited, currSym),
      balance: fmtCurr(balance, currSym),
    });
  }

  // ─── APY ────────────────────────────────────────────────────
  const effectiveRate = (Math.pow(1 + r / n, n) - 1) * 100;

  // ─── Goal calculations ─────────────────────────────────────
  let goalProgress = 0;
  let goalSurplus = 0;
  let monthlyNeeded = 0;

  if (mode === "goal" && savingsGoal > 0) {
    goalProgress = Math.min((balance / savingsGoal) * 100, 999);
    goalSurplus = balance - savingsGoal;

    // Calculate monthly needed to reach goal
    const ratePerMonth = Math.pow(1 + r / n, n / 12) - 1;
    if (ratePerMonth > 0 && totalMonths > 0) {
      const fvInitial = initialDeposit * Math.pow(1 + ratePerMonth, totalMonths);
      const remaining = savingsGoal - fvInitial;
      if (remaining > 0) {
        monthlyNeeded = remaining * ratePerMonth / (Math.pow(1 + ratePerMonth, totalMonths) - 1);
      }
    } else if (totalMonths > 0) {
      monthlyNeeded = Math.max(0, (savingsGoal - initialDeposit) / totalMonths);
    }
  }

  // ─── Tax & Inflation ────────────────────────────────────────
  const taxPaidAmount = includeTax ? totalInterest * (taxRate / 100) : 0;
  const inflationFactor = includeInflation ? Math.pow(1 + inflationRate / 100, totalYears) : 1;
  const buyingPowerAmount = balance / inflationFactor;

  // ─── Duration label ─────────────────────────────────────────
  const yrLabel = timeYears === 1 ? (v["year"] || "year") : (v["years"] || "years");
  const moLabel = timeMonths === 1 ? (v["month"] || "month") : (v["months"] || "months");
  let duration = "";
  if (timeYears > 0 && timeMonths > 0) duration = `${timeYears} ${yrLabel} ${timeMonths} ${moLabel}`;
  else if (timeYears > 0) duration = `${timeYears} ${yrLabel}`;
  else duration = `${timeMonths} ${moLabel}`;

  // ─── Milestone label ────────────────────────────────────────
  let milestoneLabel = "—";
  if (mode === "goal" && savingsGoal > 0) {
    if (milestoneMonth > 0) {
      const mYears = Math.floor(milestoneMonth / 12);
      const mMonths = milestoneMonth % 12;
      if (mYears > 0 && mMonths > 0) milestoneLabel = `${mYears} ${v["years"] || "years"} ${mMonths} ${v["months"] || "months"}`;
      else if (mYears > 0) milestoneLabel = `${mYears} ${v["years"] || "years"}`;
      else milestoneLabel = `${mMonths} ${v["months"] || "months"}`;
    } else {
      milestoneLabel = v["behindSchedule"] || "Not reached in timeframe";
    }
  }

  // ─── Goal progress label ────────────────────────────────────
  let goalProgressLabel = "—";
  if (mode === "goal" && savingsGoal > 0) {
    goalProgressLabel = `${goalProgress.toFixed(1)}%`;
    if (balance >= savingsGoal) goalProgressLabel += ` — ${v["goalReached"] || "Goal Reached!"}`;
    else goalProgressLabel += ` — ${v["behindSchedule"] || "Behind Schedule"}`;
  }

  // ─── Summary ────────────────────────────────────────────────
  const summary = (f.summary || "Your savings will reach {endingBalance} over {duration}, earning {totalInterest} in interest on {totalDeposited} deposited.")
    .replace("{endingBalance}", fmtCurr(balance, currSym))
    .replace("{duration}", duration)
    .replace("{totalInterest}", fmtCurr(totalInterest, currSym))
    .replace("{totalDeposited}", fmtCurr(totalDeposited, currSym));

  // ─── NEW: InfoCard-only computed values ──────────────────────
  const growthMult = totalDeposited > 0 ? balance / totalDeposited : 0;
  const interestPct = balance > 0 ? (totalInterest / balance) * 100 : 0;
  const avgMonthGrowth = totalMonths > 0 ? (balance - initialDeposit) / totalMonths : 0;
  const finalEscalation = Math.pow(1 + contributionIncrease / 100, Math.max(0, totalYearsInt - 1));
  const finalMonthly = monthlyBase * finalEscalation;
  const escalationExtra = contributionIncrease > 0
    ? (totalDeposited - initialDeposit - (monthlyBase * totalMonths) - (annualContribution * totalYearsInt))
    : 0;
  const annualBonusTot = annualContribution * Math.min(totalYearsInt, Math.floor(totalYears) + (totalMonths % 12 > 0 ? 1 : 0));
  const avgAnnualRet = totalYears > 0 ? totalInterest / totalYears : 0;

  return {
    values: {
      endingBalance: Math.round(balance * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalDeposited: Math.round(totalDeposited * 100) / 100,
      effectiveRate: Math.round(effectiveRate * 1000) / 1000,
      goalProgress: Math.round(goalProgress * 10) / 10,
      goalSurplus: Math.round(goalSurplus * 100) / 100,
      monthlyNeeded: Math.round(monthlyNeeded * 100) / 100,
      taxPaid: Math.round(taxPaidAmount * 100) / 100,
      buyingPower: Math.round(buyingPowerAmount * 100) / 100,
      growthMultiplier: Math.round(growthMult * 100) / 100,
      interestPercent: Math.round(interestPct * 10) / 10,
      avgMonthlyGrowth: Math.round(avgMonthGrowth * 100) / 100,
      finalMonthlyContrib: Math.round(finalMonthly * 100) / 100,
      escalationImpact: Math.round(escalationExtra * 100) / 100,
      annualBonusTotal: Math.round(annualBonusTot * 100) / 100,
      avgAnnualReturn: Math.round(avgAnnualRet * 100) / 100,
    },
    formatted: {
      endingBalance: fmtCurr(balance, currSym),
      totalInterest: fmtCurr(totalInterest, currSym),
      totalDeposited: fmtCurr(totalDeposited, currSym),
      effectiveRate: `${effectiveRate.toFixed(3)}%`,
      goalProgress: goalProgressLabel,
      goalSurplus: mode === "goal" && savingsGoal > 0
        ? `${goalSurplus >= 0 ? "+" : ""}${fmtCurr(goalSurplus, currSym)}`
        : "—",
      monthlyNeeded: mode === "goal" && savingsGoal > 0 ? `${fmtCurr(monthlyNeeded, currSym)}/mo` : "—",
      taxPaid: includeTax ? fmtCurr(taxPaidAmount, currSym) : "—",
      buyingPower: includeInflation ? fmtCurr(buyingPowerAmount, currSym) : "—",
      milestoneYear: milestoneLabel,
      growthMultiplier: `${growthMult.toFixed(2)}x`,
      interestPercent: `${interestPct.toFixed(1)}%`,
      avgMonthlyGrowth: fmtCurr(avgMonthGrowth, currSym),
      finalMonthlyContrib: fmtCurr(finalMonthly, currSym),
      escalationImpact: escalationExtra > 0 ? `+${fmtCurr(escalationExtra, currSym)}` : "—",
      annualBonusTotal: annualContribution > 0 ? fmtCurr(annualBonusTot, currSym) : "—",
      avgAnnualReturn: fmtCurr(avgAnnualRet, currSym),
    },
    summary,
    isValid: true,
    metadata: { chartData, tableData },
  };
}

function sym(fieldUnits?: Record<string, string>): string {
  const curr = fieldUnits?.initialDeposit || "USD";
  const S: Record<string, string> = {
    USD: "$", EUR: "€", GBP: "£", MXN: "MX$", BRL: "R$", JPY: "¥", INR: "₹",
    CAD: "C$", AUD: "A$", CHF: "CHF ", COP: "COL$", ARS: "AR$", PEN: "S/",
    CLP: "CLP ", CNY: "¥", KRW: "₩", SEK: "kr", NOK: "kr", DKK: "kr",
    PLN: "zł", CZK: "Kč", HUF: "Ft", TRY: "₺", ZAR: "R", NZD: "NZ$",
    SGD: "S$", HKD: "HK$", TWD: "NT$", THB: "฿", PHP: "₱", IDR: "Rp",
    MYR: "RM", VND: "₫", ILS: "₪",
  };
  return S[curr] || "$";
}

function fmtCurr(val: number, symbol: string): string {
  if (val === 0) return `${symbol}0`;
  const abs = Math.abs(val);
  const formatted = abs.toLocaleString("en-US", {
    minimumFractionDigits: abs >= 1000 ? 0 : 2,
    maximumFractionDigits: abs >= 1000 ? 0 : 2,
  });
  return val < 0 ? `-${symbol}${formatted}` : `${symbol}${formatted}`;
}

export default savingsCalculatorConfig;
