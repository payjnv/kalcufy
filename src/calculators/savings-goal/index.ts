import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ─── HELPER: Format number with commas ───
function fmtNum(val: number, decimals = 2): string {
  if (val === 0) return "0";
  if (Math.abs(val) < 0.01) return val.toFixed(decimals);
  return val.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// ─── HELPER: Currency symbols ───
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$", EUR: "€", GBP: "£", CAD: "C$", AUD: "A$",
  MXN: "MX$", BRL: "R$", JPY: "¥", INR: "₹", CHF: "CHF ",
  COP: "COL$", ARS: "AR$", PEN: "S/", CLP: "CLP ",
  CNY: "¥", KRW: "₩", SEK: "kr ", NOK: "kr ", DKK: "kr ",
  PLN: "zł ", CZK: "Kč ", HUF: "Ft ", TRY: "₺",
  ZAR: "R", NZD: "NZ$", SGD: "S$", HKD: "HK$",
  THB: "฿", MYR: "RM ", PHP: "₱", IDR: "Rp ",
  VND: "₫", EGP: "E£", NGN: "₦",
};

// ═══════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════

export const savingsGoalCalculatorConfig: CalculatorConfigV4 = {
  id: "savings-goal",
  version: "4.0",
  category: "finance",
  icon: "🎯",

  // ─── PRESETS ───
  presets: [
    {
      id: "emergencyFund",
      icon: "🏦",
      values: {
        savingsGoal: 15000,
        startingBalance: 0,
        timeToGoal: 3,
        annualRate: 4.5,
        compoundFrequency: "monthly",
        includeInflation: false,
        inflationRate: null,
      },
    },
    {
      id: "downPayment",
      icon: "🏠",
      values: {
        savingsGoal: 60000,
        startingBalance: 5000,
        timeToGoal: 5,
        annualRate: 4.5,
        compoundFrequency: "monthly",
        includeInflation: true,
        inflationRate: 3,
      },
    },
    {
      id: "vacation",
      icon: "✈️",
      values: {
        savingsGoal: 5000,
        startingBalance: 0,
        timeToGoal: 1,
        annualRate: 4.5,
        compoundFrequency: "monthly",
        includeInflation: false,
        inflationRate: null,
      },
    },
    {
      id: "collegeFund",
      icon: "🎓",
      values: {
        savingsGoal: 50000,
        startingBalance: 2000,
        timeToGoal: 10,
        annualRate: 5,
        compoundFrequency: "monthly",
        includeInflation: true,
        inflationRate: 3,
      },
    },
  ],

  // ─── TRANSLATIONS (EN only — script translates) ───
  t: {
    en: {
      name: "Savings Goal Calculator",
      slug: "savings-goal",
      subtitle:
        "Find out how much you need to save each month, week, or day to reach your financial goal — with interest and inflation included.",
      seo: {
        title: "Savings Goal Calculator - Monthly Savings Plan Estimator",
        description:
          "Calculate how much to save monthly, weekly, or daily to reach your goal. Factor in compound interest and inflation. Free savings planner with year-by-year breakdown.",
        shortDescription: "Plan your savings with compound interest and inflation adjustment.",
        keywords: [
          "savings goal calculator",
          "savings calculator",
          "how much to save per month",
          "savings plan calculator",
          "compound interest savings",
          "emergency fund calculator",
          "savings goal planner",
          "free savings calculator",
        ],
      },

      inputs: {
        savingsGoal: {
          label: "Savings Goal",
          helpText: "The total amount you want to save",
        },
        startingBalance: {
          label: "Starting Balance",
          helpText: "Amount you already have saved toward this goal",
        },
        timeToGoal: {
          label: "Time to Reach Goal",
          helpText: "How many years you have to reach your goal — shorter timelines require higher monthly savings",
        },
        annualRate: {
          label: "Annual Interest Rate (APY)",
          helpText: "Expected annual percentage yield — high-yield savings accounts offer 4–5% APY",
        },
        compoundFrequency: {
          label: "Compound Frequency",
          helpText: "How often interest is calculated and added to your balance",
        },
        includeInflation: {
          label: "Adjust for Inflation",
          helpText: "Toggle on to see the real purchasing power of your savings over time",
        },
        inflationRate: {
          label: "Expected Inflation Rate",
          helpText: "Average annual inflation — the U.S. historical average is about 3%",
        },
      },

      presets: {
        emergencyFund: {
          label: "Emergency Fund",
          description: "$15K in 3 years at 4.5% APY",
        },
        downPayment: {
          label: "Down Payment",
          description: "$60K in 5 years with inflation",
        },
        vacation: {
          label: "Vacation",
          description: "$5K in 1 year at 4.5% APY",
        },
        collegeFund: {
          label: "College Fund",
          description: "$50K in 10 years with inflation",
        },
      },

      values: {
        years: "years",
        year: "year",
        months: "months",
        month: "month",
        monthly: "/mo",
      },

      results: {
        monthlySavings: { label: "Monthly Savings Needed" },
        weeklySavings: { label: "Weekly Savings Needed" },
        dailySavings: { label: "Daily Savings Needed" },
        totalContributions: { label: "Total Contributions" },
        interestEarned: { label: "Interest Earned" },
        finalBalance: { label: "Final Balance" },
      },

      infoCards: {
        savingsPlan: {
          title: "Your Savings Plan",
          items: [
            { label: "Monthly Savings", valueKey: "monthlySavings" },
            { label: "Weekly Savings", valueKey: "weeklySavings" },
            { label: "Daily Savings", valueKey: "dailySavings" },
            { label: "Total Months", valueKey: "totalMonths" },
          ],
        },
        growth: {
          title: "Growth Breakdown",
          items: [
            { label: "Starting Balance", valueKey: "startingBalance" },
            { label: "Total Contributions", valueKey: "totalContributions" },
            { label: "Interest Earned", valueKey: "interestEarned" },
            { label: "Final Balance", valueKey: "finalBalance" },
          ],
        },
        tips: {
          title: "Savings Tips",
          items: [
            "Automate transfers on payday to stay consistent",
            "Use a high-yield savings account for 4–5% APY",
            "Review and increase contributions with each raise",
            "Inflation erodes value — consider inflation-adjusted goals",
          ],
        },
      },

      chart: {
        title: "Savings Growth Over Time",
        xLabel: "Year",
        yLabel: "Balance",
        series: {
          contributions: "Contributions",
          interest: "Interest",
        },
      },

      detailedTable: {
        savingsSchedule: {
          button: "View Year-by-Year Schedule",
          title: "Savings Growth Schedule",
          columns: {
            year: "Year",
            yearlyContribution: "Contributions",
            yearlyInterest: "Interest",
            totalContributions: "Total Saved",
            balance: "Balance",
          },
        },
      },

      options: {
        compoundFrequency: {
          daily: "Daily",
          monthly: "Monthly",
          quarterly: "Quarterly",
          semiannually: "Semi-Annually",
          annually: "Annually",
        },
      },

      formats: {
        summary:
          "Save {monthlySavings}/month for {timeToGoal} to reach {savingsGoal}. You'll earn {interestEarned} in interest.",
      },

      education: {
        howItWorks: {
          title: "How This Calculator Works",
          text: "This calculator determines how much you need to save on a monthly, weekly, or daily basis to reach a specific financial goal within your chosen timeframe. It accounts for compound interest — meaning you earn interest on both your contributions and on previously earned interest. If you enable inflation adjustment, the calculator increases your target to maintain the same purchasing power in future dollars.",
        },
        compoundInterest: {
          title: "The Power of Compound Interest",
          text: "Albert Einstein reportedly called compound interest the eighth wonder of the world. When your savings earn interest, that interest begins earning its own interest in subsequent periods. The more frequently interest compounds (daily vs. annually), the faster your money grows. Even a small difference in APY can translate to significant gains over long time horizons — which is why starting early matters so much.",
        },
        choosingAccount: {
          title: "Choosing the Right Savings Account",
          text: "High-yield savings accounts (HYSAs) currently offer 4–5% APY, compared to the 0.01–0.1% typical of traditional savings accounts. For goals under 5 years, a HYSA or CD ladder is generally appropriate. For longer-term goals like college funds, consider a 529 plan or index fund which historically return 7–10% annually but carry more risk. Always check that your account is FDIC-insured (up to $250,000).",
        },
        inflation: {
          title: "Why Inflation Matters",
          text: "Inflation reduces the purchasing power of money over time. If you're saving for a goal 5+ years away, the amount you need in future dollars is higher than today's price. For example, with 3% annual inflation, something that costs $50,000 today would cost about $57,964 in 5 years. Enabling the inflation toggle ensures your savings target accounts for this erosion, giving you a more realistic monthly savings requirement.",
        },
        strategies: {
          title: "Strategies to Reach Your Goal Faster",
          text: "The most effective strategy is automating your savings — set up automatic transfers on each payday so saving becomes effortless. Beyond that, consider the 50/30/20 rule: allocate 50% of income to needs, 30% to wants, and 20% to savings and debt repayment. Windfall income (tax refunds, bonuses, cash gifts) can dramatically accelerate progress when deposited directly into your savings goal.",
        },
      },

      faqs: [
        {
          question: "What's the difference between APR and APY?",
          answer: "APR (Annual Percentage Rate) is the simple interest rate without compounding. APY (Annual Percentage Yield) includes the effect of compound interest, making it slightly higher than APR for the same nominal rate. When comparing savings accounts, always use APY — it reflects your true annual earnings. For example, a 4.5% APR compounded monthly equals approximately 4.59% APY.",
        },
        {
          question: "How often should interest compound for best results?",
          answer: "Daily compounding yields the most interest, followed by monthly, quarterly, semi-annually, and annually. However, the difference is relatively small — daily vs. monthly compounding on a $10,000 balance at 5% APY produces only about $2.50 more per year. The bigger factor is your APY rate itself and how consistently you contribute.",
        },
        {
          question: "Should I adjust my savings goal for inflation?",
          answer: "Yes, if your goal is 3+ years away. Inflation typically runs 2–3% annually, which means prices roughly double every 24–36 years. For short-term goals (under 2 years), inflation has minimal impact. For long-term goals like college funds or down payments, enabling the inflation adjustment gives you a more accurate target.",
        },
        {
          question: "What's a realistic savings rate?",
          answer: "Financial advisors commonly recommend saving 15–20% of gross income. However, the right amount depends on your goals and timeline. Start with whatever you can and increase by 1% every few months. Even saving $50/month adds up to $3,000+ over 5 years at 4.5% APY. The key is consistency — regular small contributions beat irregular large ones.",
        },
        {
          question: "How much should I have in an emergency fund?",
          answer: "Most financial advisors recommend 3–6 months of essential expenses (rent, food, insurance, utilities, minimum debt payments). If you're self-employed, have irregular income, or are the sole earner, aim for 6–12 months. A good starting target is $1,000 for immediate emergencies, then build toward the full amount over time.",
        },
        {
          question: "Is a savings account better than investing for my goal?",
          answer: "For goals under 3–5 years, a high-yield savings account or CD is safer because investments can lose value in the short term. For goals 5+ years away (like retirement or a child's college), investing in diversified index funds historically returns 7–10% annually — significantly outpacing savings account rates. The tradeoff is volatility: your balance can temporarily drop, so only invest money you won't need soon.",
        },
        {
          question: "Can I use this calculator for retirement savings?",
          answer: "This calculator works for any savings goal, including retirement. However, retirement planning involves additional factors like employer matching, tax-advantaged accounts (401k, IRA, Roth), Social Security, and withdrawal rates. For comprehensive retirement planning, use a dedicated retirement calculator that factors in these elements.",
        },
        {
          question: "What happens if I miss a monthly contribution?",
          answer: "Missing one or two months won't derail your plan significantly, but consistency matters. If you miss a month, try to make up the difference the following month or spread it across the remaining months. The calculator assumes equal monthly contributions — if you contribute less some months, you'll either need to save more later or extend your timeline.",
        },
      ],

      rating: {
        title: "Rate this Calculator",
        share: "Share",
        copied: "Copied!",
        copyLink: "Copy Link",
        clickToRate: "Click to rate",
        youRated: "You rated",
        stars: "stars",
        averageFrom: "average from",
        ratings: "ratings",
      },

      common: { home: "Home", calculators: "Calculators" },
    },
  },

  // ─── INPUT FIELDS ───
  inputs: [
    // Savings Goal — currency with unitType
    {
      id: "savingsGoal",
      type: "number",
      defaultValue: null,
      placeholder: "15000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    // Starting Balance — currency with unitType
    {
      id: "startingBalance",
      type: "number",
      defaultValue: null,
      placeholder: "0",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    // Time to Reach Goal — stepper (years)
    {
      id: "timeToGoal",
      type: "stepper",
      defaultValue: 3,
      min: 1,
      max: 30,
      step: 1,
      suffix: "years",
    },
    // Annual Interest Rate (APY)
    {
      id: "annualRate",
      type: "number",
      defaultValue: 4.5,
      min: 0,
      max: 20,
      step: 0.1,
      suffix: "%",
    },
    // Compound Frequency — select
    {
      id: "compoundFrequency",
      type: "select",
      defaultValue: "monthly",
      options: [
        { value: "daily" },
        { value: "monthly" },
        { value: "quarterly" },
        { value: "semiannually" },
        { value: "annually" },
      ],
    },
    // Adjust for Inflation — toggle (V4.3)
    {
      id: "includeInflation",
      type: "toggle",
      defaultValue: false,
    },
    // Expected Inflation Rate — revealed when includeInflation = true
    {
      id: "inflationRate",
      type: "number",
      defaultValue: null,
      placeholder: "3",
      min: 0,
      max: 20,
      step: 0.1,
      suffix: "%",
      showWhen: { field: "includeInflation", value: true },
    },
  ],

  // ─── RESULTS ───
  results: [
    { id: "monthlySavings", type: "primary", format: "text" },
    { id: "weeklySavings", type: "secondary", format: "text" },
    { id: "dailySavings", type: "secondary", format: "text" },
    { id: "totalContributions", type: "secondary", format: "text" },
    { id: "interestEarned", type: "secondary", format: "text" },
    { id: "finalBalance", type: "secondary", format: "text" },
  ],

  // ─── INFO CARDS ───
  infoCards: [
    { id: "savingsPlan", type: "list", icon: "💰", itemCount: 4 },
    { id: "growth", type: "list", icon: "📈", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ─── CHART ───
  chart: {
    id: "paymentBreakdown",
    type: "composed",
    xKey: "year",
    stacked: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "contributions", type: "area", stackId: "savings", color: "#3b82f6" },
      { key: "interest", type: "area", stackId: "savings", color: "#10b981" },
    ],
  },

  // ─── DETAILED TABLE (Year-by-Year Schedule) ───
  detailedTable: {
    id: "savingsSchedule",
    buttonLabel: "View Year-by-Year Schedule",
    buttonIcon: "📅",
    modalTitle: "Savings Growth Schedule",
    columns: [
      { id: "year", label: "Year", align: "center" },
      { id: "yearlyContribution", label: "Contributions", align: "right" },
      { id: "yearlyInterest", label: "Interest", align: "right" },
      { id: "totalContributions", label: "Total Saved", align: "right" },
      { id: "balance", label: "Balance", align: "right", highlight: true },
    ],
  },

  referenceData: [],

  // ─── EDUCATION SECTIONS ───
  educationSections: [
    { id: "howItWorks", type: "prose", icon: "📖" },
    { id: "compoundInterest", type: "prose", icon: "⚙️" },
    { id: "choosingAccount", type: "prose", icon: "🏦" },
    { id: "inflation", type: "prose", icon: "📉" },
    { id: "strategies", type: "prose", icon: "🚀" },
  ],

  // ─── FAQs ───
  faqs: [
    { id: "0" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
  ],

  // ─── REFERENCES ───
  references: [
    {
      text: "Federal Reserve — Interest Rates & Savings",
      url: "https://www.federalreserve.gov/",
    },
    {
      text: "FDIC — National Rates and Rate Caps",
      url: "https://www.fdic.gov/resources/bankers/national-rates/",
    },
    {
      text: "U.S. Bureau of Labor Statistics — CPI Inflation Calculator",
      url: "https://www.bls.gov/data/inflation_calculator.htm",
    },
    {
      text: "Investor.gov — Compound Interest Calculator",
      url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator",
    },
  ],

  // ─── EDUCATION (Hero section) ───
  hero: {},
};

// ═══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════

export function calculateSavingsGoal(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read inputs ──
  const savingsGoal = values.savingsGoal as number | null;
  const startingBalance = (values.startingBalance as number | null) || 0;
  const timeToGoalYears = (values.timeToGoal as number) || 3;
  const annualRate = (values.annualRate as number) ?? 4.5;
  const compoundFrequency = (values.compoundFrequency as string) || "monthly";
  const includeInflation = values.includeInflation as boolean;
  const inflationRate = includeInflation ? ((values.inflationRate as number | null) || 0) : 0;

  // ── Validate required ──
  if (!savingsGoal || savingsGoal <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Currency symbol ──
  const curr = fieldUnits?.savingsGoal || "USD";
  const sym = CURRENCY_SYMBOLS[curr] || "$";

  // ── Compound periods per year ──
  const compoundMap: Record<string, number> = {
    daily: 365,
    monthly: 12,
    quarterly: 4,
    semiannually: 2,
    annually: 1,
  };
  const n = compoundMap[compoundFrequency] || 12;

  // ── Adjust goal for inflation if enabled ──
  const adjustedGoal = includeInflation && inflationRate > 0
    ? savingsGoal * Math.pow(1 + inflationRate / 100, timeToGoalYears)
    : savingsGoal;

  // ── Calculate required monthly contribution ──
  // Future Value formula:
  //   FV = PV*(1 + r/n)^(n*t) + PMT * [((1 + r/n)^(n*t) - 1) / (r/n)]
  // We solve for PMT (monthly contribution):
  //   PMT = (FV - PV_grown) * (r_monthly) / ((1 + r_monthly)^totalMonths - 1)
  const totalMonths = timeToGoalYears * 12;
  const monthlyRate = annualRate / 100 / 12;

  let monthlySavings: number;
  let futureValueOfStarting: number;

  if (monthlyRate === 0) {
    // No interest — simple division
    futureValueOfStarting = startingBalance;
    const remaining = adjustedGoal - futureValueOfStarting;
    monthlySavings = remaining > 0 ? remaining / totalMonths : 0;
  } else {
    // Future value of starting balance with compound interest
    const ratePerPeriod = annualRate / 100 / n;
    const totalPeriods = n * timeToGoalYears;
    futureValueOfStarting = startingBalance * Math.pow(1 + ratePerPeriod, totalPeriods);

    // Amount still needed after starting balance grows
    const amountNeeded = adjustedGoal - futureValueOfStarting;

    if (amountNeeded <= 0) {
      // Starting balance alone covers the goal
      monthlySavings = 0;
    } else {
      // Future value of monthly annuity: FV = PMT * [((1+r)^n - 1) / r]
      const fvFactor = (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
      monthlySavings = amountNeeded / fvFactor;
    }
  }

  // Ensure non-negative
  monthlySavings = Math.max(monthlySavings, 0);

  // ── Weekly and daily savings ──
  const weeklySavings = (monthlySavings * 12) / 52;
  const dailySavings = (monthlySavings * 12) / 365;

  // ── Calculate totals ──
  const totalContributions = monthlySavings * totalMonths + startingBalance;
  const interestEarned = adjustedGoal - totalContributions;
  const finalBalance = adjustedGoal;

  // ── Build chart data (yearly breakdown) ──
  const chartData: Array<Record<string, unknown>> = [];
  let runningBalance = startingBalance;
  let cumulativeContributions = startingBalance;

  for (let year = 1; year <= timeToGoalYears; year++) {
    const startOfYearBalance = runningBalance;
    const yearlyContribution = monthlySavings * 12;
    cumulativeContributions += yearlyContribution;

    // Simulate month by month for accurate compounding
    let endOfYearBalance = startOfYearBalance;
    for (let month = 1; month <= 12; month++) {
      endOfYearBalance += monthlySavings;
      endOfYearBalance *= (1 + monthlyRate);
    }

    runningBalance = endOfYearBalance;
    const cumulativeInterest = runningBalance - cumulativeContributions;

    chartData.push({
      year: v[`year${year}`] || `${year}`,
      contributions: Math.round(cumulativeContributions),
      interest: Math.max(Math.round(cumulativeInterest), 0),
    });
  }

  // ── Build table data (yearly schedule) ──
  const tableData: Array<Record<string, string>> = [];
  let tableBalance = startingBalance;
  let tableCumulativeContributions = startingBalance;

  for (let year = 1; year <= timeToGoalYears; year++) {
    const startBalance = tableBalance;
    const yearlyContribution = monthlySavings * 12;
    tableCumulativeContributions += yearlyContribution;

    // Simulate month by month
    let endBalance = startBalance;
    for (let month = 1; month <= 12; month++) {
      endBalance += monthlySavings;
      endBalance *= (1 + monthlyRate);
    }

    const yearlyInterest = endBalance - startBalance - yearlyContribution;
    tableBalance = endBalance;

    tableData.push({
      year: `${year}`,
      yearlyContribution: `${sym}${fmtNum(yearlyContribution)}`,
      yearlyInterest: `${sym}${fmtNum(Math.max(yearlyInterest, 0))}`,
      totalContributions: `${sym}${fmtNum(tableCumulativeContributions)}`,
      balance: `${sym}${fmtNum(endBalance)}`,
    });
  }

  // ── Time label ──
  const yearLabel = timeToGoalYears === 1 ? (v["year"] || "year") : (v["years"] || "years");
  const timeStr = `${timeToGoalYears} ${yearLabel}`;

  // ── Format results ──
  return {
    values: {
      monthlySavings,
      weeklySavings,
      dailySavings,
      totalContributions,
      interestEarned: Math.max(interestEarned, 0),
      finalBalance,
      adjustedGoal,
      totalMonths,
    },
    formatted: {
      monthlySavings: `${sym}${fmtNum(monthlySavings)}`,
      weeklySavings: `${sym}${fmtNum(weeklySavings)}`,
      dailySavings: `${sym}${fmtNum(dailySavings)}`,
      totalContributions: `${sym}${fmtNum(totalContributions)}`,
      interestEarned: `${sym}${fmtNum(Math.max(interestEarned, 0))}`,
      finalBalance: `${sym}${fmtNum(finalBalance)}`,
      adjustedGoal: `${sym}${fmtNum(adjustedGoal)}`,
      totalMonths: `${totalMonths}`,
      startingBalance: `${sym}${fmtNum(startingBalance)}`,
      savingsGoal: `${sym}${fmtNum(savingsGoal)}`,
      timeToGoal: timeStr,
    },
    summary:
      f.summary
        ?.replace("{monthlySavings}", `${sym}${fmtNum(monthlySavings)}`)
        .replace("{timeToGoal}", timeStr)
        .replace("{savingsGoal}", `${sym}${fmtNum(adjustedGoal)}`)
        .replace("{interestEarned}", `${sym}${fmtNum(Math.max(interestEarned, 0))}`) ||
      `Save ${sym}${fmtNum(monthlySavings)}/month for ${timeStr} to reach ${sym}${fmtNum(adjustedGoal)}. You'll earn ${sym}${fmtNum(Math.max(interestEarned, 0))} in interest.`,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}
