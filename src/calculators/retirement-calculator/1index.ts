import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ─── HELPER: Format number with commas ───
function fmtNum(val: number, decimals = 0): string {
  if (val === 0) return "0";
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

export const retirementCalculatorConfig: CalculatorConfigV4 = {
  id: "retirement-calculator",
  version: "4.0",
  category: "finance",
  icon: "🏖️",

  // ─── PRESETS ───
  presets: [
    {
      id: "freshStart",
      icon: "👶",
      values: {
        currentAge: 25, retirementAge: 65, annualIncome: 45000,
        currentSavings: 5000, monthlyContribution: 375,
        includeEmployerMatch: false, employerMatchPercent: null, matchLimit: null,
        otherMonthlyIncome: 0, lifeExpectancy: 90,
        preReturnRate: 8, postReturnRate: 5, inflationRate: 3,
        salaryGrowth: 2, incomeReplacement: 75,
      },
    },
    {
      id: "midCareer",
      icon: "👨‍💼",
      values: {
        currentAge: 40, retirementAge: 67, annualIncome: 75000,
        currentSavings: 120000, monthlyContribution: 750,
        includeEmployerMatch: true, employerMatchPercent: 50, matchLimit: 6,
        otherMonthlyIncome: 0, lifeExpectancy: 90,
        preReturnRate: 7, postReturnRate: 5, inflationRate: 3,
        salaryGrowth: 2, incomeReplacement: 75,
      },
    },
    {
      id: "preRetirement",
      icon: "👴",
      values: {
        currentAge: 55, retirementAge: 67, annualIncome: 100000,
        currentSavings: 450000, monthlyContribution: 1500,
        includeEmployerMatch: true, employerMatchPercent: 100, matchLimit: 6,
        otherMonthlyIncome: 500, lifeExpectancy: 90,
        preReturnRate: 6, postReturnRate: 4, inflationRate: 3,
        salaryGrowth: 1, incomeReplacement: 80,
      },
    },
    {
      id: "fireEarly",
      icon: "🔥",
      values: {
        currentAge: 30, retirementAge: 45, annualIncome: 80000,
        currentSavings: 50000, monthlyContribution: 3000,
        includeEmployerMatch: false, employerMatchPercent: null, matchLimit: null,
        otherMonthlyIncome: 0, lifeExpectancy: 95,
        preReturnRate: 8, postReturnRate: 5, inflationRate: 3,
        salaryGrowth: 3, incomeReplacement: 60,
      },
    },
    {
      id: "lateStart",
      icon: "💼",
      values: {
        currentAge: 50, retirementAge: 70, annualIncome: 65000,
        currentSavings: 80000, monthlyContribution: 1200,
        includeEmployerMatch: false, employerMatchPercent: null, matchLimit: null,
        otherMonthlyIncome: 0, lifeExpectancy: 90,
        preReturnRate: 6, postReturnRate: 4, inflationRate: 3,
        salaryGrowth: 1, incomeReplacement: 75,
      },
    },
  ],

  // ─── TRANSLATIONS (EN only — script translates later) ───
  t: {
    en: {
      seo: {
        title: "Retirement Calculator — Plan Your Future with Confidence (2026)",
        description: "Free retirement calculator with inflation adjustment, employer match, and year-by-year projections. Find out how much you need to retire comfortably. Multi-currency support.",
        subtitle: "Calculate how much you need to save for retirement and see if you're on track to meet your goals",
        keywords: ["retirement calculator", "retirement planning calculator", "how much to retire", "retirement savings calculator", "when can I retire", "4% rule calculator", "FIRE calculator", "early retirement calculator"],
      },

      inputs: {
        currentAge: {
          label: "Current Age",
          helpText: "Your current age in years",
          placeholder: "30",
        },
        retirementAge: {
          label: "Retirement Age",
          helpText: "The age you plan to retire (US average: 62-67)",
          placeholder: "65",
        },
        annualIncome: {
          label: "Annual Pre-Tax Income",
          helpText: "Your current gross annual salary before taxes",
          placeholder: "75000",
        },
        currentSavings: {
          label: "Current Retirement Savings",
          helpText: "Total saved across all retirement accounts (401k, IRA, etc.)",
          placeholder: "50000",
        },
        monthlyContribution: {
          label: "Monthly Contribution",
          helpText: "How much you save each month toward retirement",
          placeholder: "500",
        },
        includeEmployerMatch: {
          label: "Include Employer Match",
          helpText: "Does your employer match your retirement contributions?",
        },
        employerMatchPercent: {
          label: "Employer Match Rate",
          helpText: "Percentage your employer matches (e.g., 50% means they add $0.50 per $1 you contribute)",
          placeholder: "50",
        },
        matchLimit: {
          label: "Match Limit (% of Salary)",
          helpText: "Employer matches up to this % of your salary (common: 3-6%)",
          placeholder: "6",
        },
        otherMonthlyIncome: {
          label: "Other Monthly Income in Retirement",
          helpText: "Social Security, pension, rental income, or part-time work expected in retirement",
          placeholder: "0",
        },
        lifeExpectancy: {
          label: "Life Expectancy",
          helpText: "Plan conservatively — US average is 77 but healthy adults often live to 85-95",
        },
        preReturnRate: {
          label: "Pre-Retirement Return Rate",
          helpText: "Expected annual return before retirement (S&P 500 historical avg: ~10%, after inflation ~7%)",
        },
        postReturnRate: {
          label: "Post-Retirement Return Rate",
          helpText: "Conservative return during retirement with safer investments (typically 4-5%)",
        },
        inflationRate: {
          label: "Expected Inflation Rate",
          helpText: "US long-term average: ~3%. Reduces purchasing power over time",
        },
        salaryGrowth: {
          label: "Annual Salary Growth",
          helpText: "Expected annual raise or salary increase (average: 2-3%)",
        },
        incomeReplacement: {
          label: "Income Replacement in Retirement",
          helpText: "% of pre-retirement income needed (most advisors recommend 70-80%)",
        },
      },

      results: {
        totalAtRetirement: { label: "Projected Savings at Retirement" },
        totalInTodaysDollars: { label: "In Today's Dollars" },
        nestEggNeeded: { label: "Nest Egg Needed (4% Rule)" },
        monthlyRetirementIncome: { label: "Monthly Retirement Income" },
        savingsGap: { label: "Savings Gap / Surplus" },
        totalContributed: { label: "Total You Contributed" },
        totalGrowth: { label: "Investment Growth (Earnings)" },
        yearsMoneyLasts: { label: "How Long Money Lasts" },
      },

      presets: {
        freshStart: { label: "Fresh Start (Age 25)", description: "$45K salary, $375/mo savings, 40 years to grow" },
        midCareer: { label: "Mid-Career (Age 40)", description: "$75K salary, $750/mo, employer match, 27 years" },
        preRetirement: { label: "Pre-Retirement (Age 55)", description: "$100K salary, $1,500/mo, 12 years left" },
        fireEarly: { label: "FIRE (Retire at 45)", description: "$80K salary, $3K/mo aggressive savings" },
        lateStart: { label: "Late Start (Age 50)", description: "$65K salary, $1,200/mo, catching up" },
      },

      values: {
        years: "years",
        year: "year",
        perMonth: "/month",
        perDay: "/day",
        onTrack: "On Track",
        surplus: "Surplus",
        shortfall: "Shortfall",
        indefinitely: "Indefinitely",
      },

      formats: {
        summary: "By age {retAge}, you'll have approximately {total}. You need {needed} to maintain {replacement}% of your income. {status}.",
      },

      infoCards: {
        milestones: {
          title: "Retirement Milestones",
          items: [
            { label: "Years Until Retirement", valueKey: "yearsUntilRetirement" },
            { label: "Effective Savings Rate", valueKey: "effectiveSavingsRate" },
            { label: "Daily Savings Equivalent", valueKey: "dailySavings" },
            { label: "Fidelity Benchmark (Your Age)", valueKey: "fidelityBenchmark" },
          ],
        },
        insights: {
          title: "Financial Insights",
          items: [
            { label: "Employer Match Total", valueKey: "totalEmployerMatch" },
            { label: "% Portfolio from Growth", valueKey: "growthPercent" },
            { label: "Doubling Time (Rule of 72)", valueKey: "doublingTime" },
            { label: "Extra Monthly to Close Gap", valueKey: "extraMonthlyNeeded" },
          ],
        },
        tips: {
          title: "Retirement Tips",
          items: [
            "Start early: $200/mo from age 25 at 8% = $702K by 65. Starting at 35 = $298K — less than half",
            "Max your employer match — it's literally free money. Not doing so is leaving salary on the table",
            "Increase contributions by 1% each year with raises. You won't notice the difference but your future self will",
            "Consider Roth options: pay taxes now, withdraw tax-free in retirement when rates may be higher",
          ],
        },
      },

      chart: {
        title: "Retirement Savings Growth",
        xLabel: "Age",
        yLabel: "Portfolio Value",
        series: {
          contributions: "Your Contributions",
          growth: "Investment Growth",
          target: "Nest Egg Needed",
        },
      },

      detailedTable: {
        yearByYear: {
          button: "View Year-by-Year Breakdown",
          title: "Retirement Savings Projection",
          columns: {
            year: "Year",
            age: "Age",
            salary: "Salary",
            contribution: "Annual Contribution",
            employerMatch: "Employer Match",
            portfolioValue: "Portfolio Value",
            inflationAdjusted: "In Today's $",
          },
        },
      },

      education: {
        whatIs: {
          title: "What Is a Retirement Calculator?",
          content: "A retirement calculator helps you estimate how much money you need to save to maintain your desired lifestyle after you stop working. It factors in your current savings, monthly contributions, expected investment returns, inflation, and how long you expect to live in retirement. The goal is to ensure you don't outlive your money — a fear shared by 45% of Americans according to a 2024 Gallup survey. Unlike simple savings calculators, a retirement calculator accounts for the two distinct phases of your financial life: the accumulation phase (saving and investing while working) and the distribution phase (withdrawing funds in retirement). Understanding both phases is critical because the math changes dramatically — during accumulation, compound interest works in your favor; during distribution, inflation and withdrawals work against you.",
        },
        howItWorks: {
          title: "How Retirement Planning Works",
          content: "Retirement planning revolves around a core equation: your savings at retirement must generate enough income to cover your expenses for the rest of your life. During your working years, your money compounds — earning returns on returns. A 7% annual return doubles your money roughly every 10 years (the Rule of 72). This means $10,000 invested at age 25 becomes approximately $160,000 by age 65 without adding another dollar. The critical variables are: your savings rate (how much you set aside), your return rate (how your investments perform), inflation (which erodes purchasing power at roughly 3% per year), and your time horizon (years until and during retirement). Even small changes in these variables create enormous differences over decades. Increasing your savings rate by just 1% of your salary can add tens of thousands to your retirement fund over a 30-year career.",
        },
        retirementRules: {
          title: "Essential Retirement Rules of Thumb",
          items: [
            { text: "The 4% Rule: Withdraw 4% of your nest egg in year one, then adjust for inflation annually. A portfolio of 50-75% stocks historically lasts 30+ years with this strategy (William Bengen, 1994).", type: "info" },
            { text: "The 25x Rule: Save 25 times your annual expenses. This is the inverse of the 4% rule — if you spend $60,000/year, aim for $1,500,000.", type: "info" },
            { text: "The 80% Rule: Plan to need 70-80% of your pre-retirement income. Some expenses (commuting, work clothes) disappear, but healthcare costs typically increase.", type: "info" },
            { text: "The 10-15% Rule: Save at least 10-15% of your gross income throughout your career. If starting late, you may need 20-25%.", type: "warning" },
            { text: "Age-Based Milestones (Fidelity): Save 1x salary by 30, 3x by 40, 6x by 50, 8x by 60, 10x by 67. These benchmarks help you gauge progress.", type: "info" },
            { text: "The Rule of 72: Divide 72 by your annual return rate to estimate doubling time. At 8% return, your money doubles every 9 years.", type: "info" },
          ],
        },
        incomeSources: {
          title: "Retirement Income Sources",
          items: [
            { text: "401(k) / 403(b): Employer-sponsored plans with potential matching. 2026 contribution limit: $23,500 ($31,000 if age 50+). Tax-deferred growth.", type: "info" },
            { text: "Traditional IRA: Tax-deductible contributions, taxed on withdrawal. 2026 limit: $7,000 ($8,000 if 50+). Good for high earners now expecting lower tax brackets later.", type: "info" },
            { text: "Roth IRA: After-tax contributions, tax-free withdrawals. Same limits as Traditional IRA. Ideal if you expect higher tax rates in retirement.", type: "info" },
            { text: "Social Security: Available from age 62 (reduced) to 70 (maximum benefit). Average benefit in 2026: ~$1,900/month. Not designed to be your only income source.", type: "warning" },
            { text: "Pension Plans: Defined benefit plans providing guaranteed income. Increasingly rare in private sector but still common in government and education.", type: "info" },
            { text: "Personal Investments & Real Estate: Taxable brokerage accounts, rental properties, and other assets. Provide flexibility but lack the tax advantages of retirement accounts.", type: "info" },
          ],
        },
        examples: {
          title: "Retirement Savings Examples",
          description: "See how different starting points and savings rates affect your retirement outcome",
          examples: [
            {
              title: "Starting at 25: The Power of Time",
              steps: [
                "Age 25, salary $45,000, saving $375/month (10%)",
                "Current savings: $5,000",
                "8% pre-retirement return, 3% inflation",
                "40 years of compound growth",
              ],
              result: "~$1,340,000 at age 65 (~$440,000 in today's dollars). Monthly income: ~$4,467 via 4% rule. Time is your greatest ally.",
            },
            {
              title: "Starting at 40: Catching Up",
              steps: [
                "Age 40, salary $75,000, saving $750/month (12%)",
                "Current savings: $120,000",
                "7% return, employer matches 50% up to 6%",
                "27 years to retirement at 67",
              ],
              result: "~$1,050,000 at age 67 (~$470,000 in today's dollars). Despite saving MORE monthly, less time to compound means significantly less wealth.",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How much money do I need to retire?",
          answer: "The most widely used rule is the 25x Rule: save 25 times your annual expenses. If you spend $60,000/year, you need $1,500,000. This is based on the 4% withdrawal rule, which historically allows a portfolio to last 30+ years. However, the exact amount depends on your desired lifestyle, healthcare needs, location, and other income sources like Social Security or pensions.",
        },
        {
          question: "At what age can I retire?",
          answer: "The traditional retirement age in the US is 65-67 (for full Social Security benefits), but your actual retirement age depends on your savings rate. Someone saving 15% of income can typically retire around age 65. The FIRE (Financial Independence, Retire Early) movement shows that saving 50-70% of income can allow retirement in just 10-17 years, regardless of starting age. The key factors are your spending level and savings rate, not your age.",
        },
        {
          question: "What is the 4% Rule and does it still work?",
          answer: "The 4% Rule, developed by financial planner William Bengen in 1994, states that withdrawing 4% of your portfolio in year one, then adjusting for inflation annually, has historically allowed a 50/50 stock/bond portfolio to last at least 30 years. Recent research suggests 3.5-4% remains safe for 30-year retirements, though longer retirements (40+ years for early retirees) may warrant a more conservative 3-3.5% rate. The rule is a starting point — actual withdrawal rates should be adjusted based on market conditions.",
        },
        {
          question: "How does inflation affect my retirement savings?",
          answer: "Inflation is the silent retirement killer. At 3% annual inflation, $1 today is worth only $0.48 in 25 years. This means if you need $60,000/year today, you'll need about $125,000/year in 25 years to maintain the same lifestyle. This calculator adjusts for inflation automatically, showing both nominal values and today's dollars so you can see the real purchasing power of your future savings.",
        },
        {
          question: "Should I max out my 401(k) or invest elsewhere?",
          answer: "Priority order: (1) Contribute enough to your 401(k) to get the full employer match — this is free money with an instant 50-100% return. (2) Max out a Roth IRA ($7,000 in 2026) for tax-free growth. (3) Go back and max out your 401(k) ($23,500 in 2026). (4) After maxing tax-advantaged accounts, invest in a taxable brokerage account. This order maximizes tax benefits and employer matching.",
        },
        {
          question: "What rate of return should I expect?",
          answer: "The S&P 500 has returned approximately 10% annually since 1926 (nominal) or about 7% after inflation. For planning purposes, most financial advisors recommend using 6-7% for pre-retirement (growth-oriented portfolio) and 4-5% for post-retirement (more conservative allocation). Using overly optimistic returns can lead to a savings shortfall, so it's better to plan conservatively and be pleasantly surprised.",
        },
        {
          question: "How much should I save each month for retirement?",
          answer: "The general guideline is 15% of your gross income (including any employer match). If you start at 25, this typically provides enough for a comfortable retirement at 65. Starting later requires more: at 35, aim for 20%; at 45, you may need 25-30%. Use Fidelity's age-based benchmarks to check your progress: 1x salary saved by 30, 3x by 40, 6x by 50, 8x by 60, and 10x by 67.",
        },
        {
          question: "What is FIRE (Financial Independence, Retire Early)?",
          answer: "FIRE is a movement focused on extreme savings (50-70% of income) and frugal living to achieve financial independence and retire decades earlier than traditional age 65. The math is straightforward: at a 50% savings rate, you can retire in about 17 years; at 70%, in about 8.5 years. FIRE followers typically target 25-33x annual expenses and withdraw 3-4% annually. Variations include LeanFIRE (minimal spending, ~$40K/year), FatFIRE (higher spending, $100K+/year), and BaristaFIRE (semi-retirement with part-time work).",
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

  // ─── INPUTS ───
  inputs: [
    {
      id: "currentAge",
      type: "number",
      defaultValue: null,
      placeholder: "30",
      min: 18,
      max: 80,
      suffix: "years",
    },
    {
      id: "retirementAge",
      type: "number",
      defaultValue: null,
      placeholder: "65",
      min: 30,
      max: 85,
      suffix: "years",
    },
    {
      id: "annualIncome",
      type: "number",
      defaultValue: null,
      placeholder: "75000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    {
      id: "currentSavings",
      type: "number",
      defaultValue: null,
      placeholder: "50000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
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
    },
    {
      id: "includeEmployerMatch",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "employerMatchPercent",
      type: "number",
      defaultValue: null,
      placeholder: "50",
      min: 0,
      max: 200,
      suffix: "%",
      showWhen: { field: "includeEmployerMatch", value: true },
    },
    {
      id: "matchLimit",
      type: "number",
      defaultValue: null,
      placeholder: "6",
      min: 0,
      max: 100,
      suffix: "%",
      showWhen: { field: "includeEmployerMatch", value: true },
    },
    {
      id: "otherMonthlyIncome",
      type: "number",
      defaultValue: 0,
      placeholder: "0",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    {
      id: "lifeExpectancy",
      type: "number",
      defaultValue: 90,
      min: 60,
      max: 110,
      suffix: "years",
    },
    {
      id: "preReturnRate",
      type: "number",
      defaultValue: 7,
      min: 0,
      max: 25,
      step: 0.1,
      suffix: "%",
    },
    {
      id: "postReturnRate",
      type: "number",
      defaultValue: 5,
      min: 0,
      max: 20,
      step: 0.1,
      suffix: "%",
    },
    {
      id: "inflationRate",
      type: "number",
      defaultValue: 3,
      min: 0,
      max: 15,
      step: 0.1,
      suffix: "%",
    },
    {
      id: "salaryGrowth",
      type: "number",
      defaultValue: 2,
      min: 0,
      max: 15,
      step: 0.1,
      suffix: "%",
    },
    {
      id: "incomeReplacement",
      type: "number",
      defaultValue: 75,
      min: 30,
      max: 120,
      suffix: "%",
    },
  ],

  inputGroups: [],

  // ─── RESULTS ───
  results: [
    { id: "totalAtRetirement", type: "primary", format: "text" },
    { id: "totalInTodaysDollars", type: "secondary", format: "text" },
    { id: "nestEggNeeded", type: "secondary", format: "text" },
    { id: "monthlyRetirementIncome", type: "secondary", format: "text" },
    { id: "savingsGap", type: "secondary", format: "text" },
    { id: "totalContributed", type: "secondary", format: "text" },
    { id: "totalGrowth", type: "secondary", format: "text" },
    { id: "yearsMoneyLasts", type: "secondary", format: "text" },
  ],

  // ─── INFOCARDS ───
  infoCards: [
    { id: "milestones", type: "list", icon: "🏁", itemCount: 4 },
    { id: "insights", type: "list", icon: "🔍", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ─── CHART ───
  chart: {
    id: "retirementGrowth",
    type: "composed",
    xKey: "age",
    height: 350,
    stacked: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "contributions", type: "area", color: "#2aa6ff", stackId: "total" },
      { key: "growth", type: "area", color: "#10b981", stackId: "total" },
      { key: "target", type: "line", color: "#ef4444", dashed: true },
    ],
  },

  // ─── DETAILED TABLE ───
  detailedTable: {
    id: "yearByYear",
    buttonLabel: "View Year-by-Year Breakdown",
    buttonIcon: "📋",
    modalTitle: "Retirement Savings Projection",
    columns: [
      { id: "year", label: "Year", align: "center" },
      { id: "age", label: "Age", align: "center" },
      { id: "salary", label: "Salary", align: "right" },
      { id: "contribution", label: "Annual Contribution", align: "right" },
      { id: "employerMatch", label: "Employer Match", align: "right" },
      { id: "portfolioValue", label: "Portfolio Value", align: "right", highlight: true },
      { id: "inflationAdjusted", label: "In Today's $", align: "right" },
    ],
  },

  // ─── EDUCATION ───
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "retirementRules", type: "list", icon: "📋", itemCount: 6 },
    { id: "incomeSources", type: "list", icon: "💰", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  // ─── FAQS ───
  faqs: [
    { id: "0" }, { id: "1" }, { id: "2" }, { id: "3" },
    { id: "4" }, { id: "5" }, { id: "6" }, { id: "7" },
  ],

  // ─── REFERENCES ───
  references: [
    {
      authors: "Bengen, William P.",
      year: "1994",
      title: "Determining Withdrawal Rates Using Historical Data",
      source: "Journal of Financial Planning",
      url: "https://www.financialplanningassociation.org/",
    },
    {
      authors: "Social Security Administration",
      year: "2026",
      title: "Retirement Benefits — When to Start Receiving Benefits",
      source: "SSA.gov",
      url: "https://www.ssa.gov/benefits/retirement/",
    },
    {
      authors: "Vanguard Research",
      year: "2025",
      title: "How America Saves — 2025 Report",
      source: "Vanguard",
      url: "https://institutional.vanguard.com/how-america-saves/overview",
    },
  ],

  // ─── HERO / SIDEBAR / FEATURES / ADS ───
  hero: {},
  sidebar: {},
  features: {},
  relatedCalculators: [
    "compound-interest-calculator",
    "savings-goal-calculator",
    "investment-calculator",
    "inflation-calculator",
    "401k-calculator",
  ],
  ads: {},
};

// ═══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════

export function calculateRetirementCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;

  // ─── Get translation helpers ───
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ─── Read inputs ───
  const currentAge = values.currentAge as number | null;
  const retirementAge = values.retirementAge as number | null;
  const annualIncome = values.annualIncome as number | null;
  const currentSavings = values.currentSavings as number | null;
  const monthlyContribution = values.monthlyContribution as number | null;

  const includeEmployerMatch = values.includeEmployerMatch as boolean;
  const employerMatchPercent = values.employerMatchPercent as number | null;
  const matchLimit = values.matchLimit as number | null;
  const otherMonthlyIncome = (values.otherMonthlyIncome as number) || 0;

  const lifeExpectancy = (values.lifeExpectancy as number) || 90;
  const preReturnRate = (values.preReturnRate as number) || 7;
  const postReturnRate = (values.postReturnRate as number) || 5;
  const inflationRate = (values.inflationRate as number) || 3;
  const salaryGrowth = (values.salaryGrowth as number) || 2;
  const incomeReplacement = (values.incomeReplacement as number) || 75;

  // ─── Validate required fields ───
  if (
    currentAge === null ||
    retirementAge === null ||
    annualIncome === null ||
    currentSavings === null ||
    monthlyContribution === null
  ) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  if (retirementAge <= currentAge) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  if (includeEmployerMatch && (employerMatchPercent === null || matchLimit === null)) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ─── Currency symbol ───
  const currUnit = fieldUnits?.annualIncome || fieldUnits?.currentSavings || "USD";
  const sym = CURRENCY_SYMBOLS[currUnit] || "$";

  // ─── Core calculations ───
  const yearsToRetirement = retirementAge - currentAge;
  const yearsInRetirement = lifeExpectancy - retirementAge;
  const monthlyPreReturn = preReturnRate / 100 / 12;
  const monthlyPostReturn = postReturnRate / 100 / 12;
  const annualInflation = inflationRate / 100;

  // ─── Employer match calculation ───
  const matchRate = includeEmployerMatch ? (employerMatchPercent || 0) / 100 : 0;
  const matchLimitPct = includeEmployerMatch ? (matchLimit || 0) / 100 : 0;

  // ─── Year-by-year accumulation phase ───
  let balance = currentSavings;
  let totalYourContrib = 0;
  let totalEmployerMatch = 0;
  let salary = annualIncome;

  const chartData: Array<Record<string, unknown>> = [];
  const tableData: Array<Record<string, unknown>> = [];

  // Add starting point
  chartData.push({
    age: String(currentAge),
    contributions: Math.round(currentSavings),
    growth: 0,
    target: 0, // will set after calculating nest egg needed
  });

  const currentYear = new Date().getFullYear();

  for (let yr = 1; yr <= yearsToRetirement; yr++) {
    const age = currentAge + yr;
    const yearContrib = monthlyContribution * 12;

    // Employer match: matchRate × min(yearContrib, salary × matchLimitPct)
    let yearMatch = 0;
    if (includeEmployerMatch) {
      const maxMatchable = salary * matchLimitPct;
      const employeeContribForMatch = Math.min(yearContrib, maxMatchable);
      yearMatch = employeeContribForMatch * matchRate;
    }

    const totalAnnualAddition = yearContrib + yearMatch;

    // Apply monthly compounding for the year
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + monthlyPreReturn) + (totalAnnualAddition / 12);
    }

    totalYourContrib += yearContrib;
    totalEmployerMatch += yearMatch;

    // Inflation factor for today's dollars
    const inflationFactor = Math.pow(1 + annualInflation, yr);

    tableData.push({
      year: String(currentYear + yr),
      age: String(age),
      salary: `${sym}${fmtNum(Math.round(salary))}`,
      contribution: `${sym}${fmtNum(Math.round(yearContrib))}`,
      employerMatch: `${sym}${fmtNum(Math.round(yearMatch))}`,
      portfolioValue: `${sym}${fmtNum(Math.round(balance))}`,
      inflationAdjusted: `${sym}${fmtNum(Math.round(balance / inflationFactor))}`,
    });

    // Chart data
    const cumulativeContrib = currentSavings + totalYourContrib + totalEmployerMatch;
    const investGrowth = Math.max(0, Math.round(balance) - Math.round(cumulativeContrib));

    chartData.push({
      age: String(age),
      contributions: Math.round(cumulativeContrib),
      growth: investGrowth,
      target: 0, // placeholder
    });

    // Salary growth for next year
    salary = salary * (1 + salaryGrowth / 100);
  }

  // ─── Retirement income needs ───
  const finalSalary = salary; // salary at retirement year
  const annualNeedNominal = finalSalary * (incomeReplacement / 100);
  const inflationAtRetirement = Math.pow(1 + annualInflation, yearsToRetirement);
  const annualNeedToday = annualNeedNominal / inflationAtRetirement;

  // Nest egg needed (4% rule based on TODAY's income need adjusted for inflation)
  const nestEggNeeded = annualNeedNominal / 0.04;

  // Update chart target line
  for (let i = 0; i < chartData.length; i++) {
    chartData[i].target = Math.round(nestEggNeeded);
  }

  // ─── Total at retirement ───
  const totalAtRetirement = Math.round(balance);
  const totalInTodaysDollars = Math.round(balance / inflationAtRetirement);
  const totalContributed = Math.round(currentSavings + totalYourContrib + totalEmployerMatch);
  const totalGrowth = Math.round(totalAtRetirement - totalContributed);
  const growthPercent = totalAtRetirement > 0 ? Math.round((totalGrowth / totalAtRetirement) * 100) : 0;

  // ─── Monthly retirement income (4% rule) ───
  const annualIncome4pct = totalAtRetirement * 0.04;
  const monthlyFrom4pct = annualIncome4pct / 12;
  const totalMonthlyIncome = monthlyFrom4pct + otherMonthlyIncome;

  // ─── Savings gap ───
  const monthlyNeed = annualNeedNominal / 12;
  const gap = totalMonthlyIncome - monthlyNeed;
  const nestEggGap = totalAtRetirement - nestEggNeeded;

  // ─── How long money lasts (withdrawal phase) ───
  let yearsMoneyLasts: number | string;
  const monthlyWithdrawal = monthlyNeed - otherMonthlyIncome;

  if (monthlyWithdrawal <= 0) {
    yearsMoneyLasts = v["indefinitely"] || "Indefinitely";
  } else if (monthlyPostReturn > 0 && monthlyWithdrawal <= balance * monthlyPostReturn) {
    yearsMoneyLasts = v["indefinitely"] || "Indefinitely";
  } else if (monthlyPostReturn > 0) {
    const n = Math.log(1 - (balance * monthlyPostReturn / monthlyWithdrawal)) / Math.log(1 + monthlyPostReturn);
    const months = Math.abs(n);
    const yrs = months / 12;
    if (yrs > 100) {
      yearsMoneyLasts = v["indefinitely"] || "Indefinitely";
    } else {
      yearsMoneyLasts = Math.round(yrs);
    }
  } else {
    // 0% return
    const months = balance / monthlyWithdrawal;
    yearsMoneyLasts = Math.round(months / 12);
  }

  const yearsLabel = v["years"] || "years";
  const yearLabel = v["year"] || "year";

  // ─── Format gap status ───
  let gapFormatted: string;
  let statusText: string;
  if (nestEggGap >= 0) {
    gapFormatted = `+${sym}${fmtNum(Math.abs(Math.round(nestEggGap)))}`;
    statusText = `You're on track with a ${sym}${fmtNum(Math.abs(Math.round(nestEggGap)))} surplus!`;
  } else {
    gapFormatted = `-${sym}${fmtNum(Math.abs(Math.round(nestEggGap)))}`;
    const extraMonthly = Math.round(Math.abs(nestEggGap) / (yearsToRetirement * 12));
    statusText = `You have a ${sym}${fmtNum(Math.abs(Math.round(nestEggGap)))} shortfall. Consider saving an extra ${sym}${fmtNum(extraMonthly)}/month.`;
  }

  const yearsMoneyLastsFormatted = typeof yearsMoneyLasts === "number"
    ? `${yearsMoneyLasts} ${yearsMoneyLasts === 1 ? yearLabel : yearsLabel}`
    : String(yearsMoneyLasts);

  // ─── Extra calculations for infoCards (unique data) ───
  const effectiveSavingsRate = annualIncome > 0 ? Math.round((monthlyContribution * 12) / annualIncome * 100) : 0;
  const dailySavings = (monthlyContribution / 30.44).toFixed(2);
  const doublingTime = preReturnRate > 0 ? (72 / preReturnRate).toFixed(1) : "N/A";

  // Fidelity benchmark: 1x salary by 30, 3x by 40, 6x by 50, 8x by 60, 10x by 67
  let fidelityMultiplier = 1;
  if (currentAge <= 30) fidelityMultiplier = 1;
  else if (currentAge <= 35) fidelityMultiplier = 2;
  else if (currentAge <= 40) fidelityMultiplier = 3;
  else if (currentAge <= 45) fidelityMultiplier = 4;
  else if (currentAge <= 50) fidelityMultiplier = 6;
  else if (currentAge <= 55) fidelityMultiplier = 7;
  else if (currentAge <= 60) fidelityMultiplier = 8;
  else fidelityMultiplier = 10;
  const fidelityTarget = annualIncome * fidelityMultiplier;
  const fidelityStatus = currentSavings >= fidelityTarget ? "✅" : "⚠️";
  const fidelityBenchmark = `${fidelityStatus} ${sym}${fmtNum(Math.round(fidelityTarget))} (${fidelityMultiplier}x salary)`;

  const extraMonthlyNeeded = nestEggGap < 0 && yearsToRetirement > 0
    ? Math.round(Math.abs(nestEggGap) / (yearsToRetirement * 12))
    : 0;

  // ─── Summary ───
  const summary = (f.summary || "By age {retAge}, you'll have approximately {total}. You need {needed} to maintain {replacement}% of your income. {status}.")
    .replace("{retAge}", String(retirementAge))
    .replace("{total}", `${sym}${fmtNum(totalAtRetirement)}`)
    .replace("{needed}", `${sym}${fmtNum(Math.round(nestEggNeeded))}`)
    .replace("{replacement}", String(incomeReplacement))
    .replace("{status}", statusText);

  return {
    values: {
      totalAtRetirement,
      totalInTodaysDollars,
      nestEggNeeded: Math.round(nestEggNeeded),
      monthlyRetirementIncome: Math.round(totalMonthlyIncome),
      savingsGap: Math.round(nestEggGap),
      totalContributed,
      totalGrowth,
      yearsMoneyLasts: typeof yearsMoneyLasts === "number" ? yearsMoneyLasts : 999,
      totalEmployerMatch: Math.round(totalEmployerMatch),
      growthPercent,
      yearsUntilRetirement: yearsToRetirement,
      effectiveSavingsRate,
      doublingTime: preReturnRate > 0 ? parseFloat((72 / preReturnRate).toFixed(1)) : 0,
      extraMonthlyNeeded,
    },
    formatted: {
      totalAtRetirement: `${sym}${fmtNum(totalAtRetirement)}`,
      totalInTodaysDollars: `${sym}${fmtNum(totalInTodaysDollars)}`,
      nestEggNeeded: `${sym}${fmtNum(Math.round(nestEggNeeded))}`,
      monthlyRetirementIncome: `${sym}${fmtNum(Math.round(totalMonthlyIncome))}${v["perMonth"] || "/month"}`,
      savingsGap: gapFormatted,
      totalContributed: `${sym}${fmtNum(totalContributed)}`,
      totalGrowth: `${sym}${fmtNum(totalGrowth)}`,
      yearsMoneyLasts: yearsMoneyLastsFormatted,
      totalEmployerMatch: `${sym}${fmtNum(Math.round(totalEmployerMatch))}`,
      growthPercent: `${growthPercent}%`,
      yearsUntilRetirement: `${yearsToRetirement} ${yearsToRetirement === 1 ? yearLabel : yearsLabel}`,
      effectiveSavingsRate: `${effectiveSavingsRate}%`,
      dailySavings: `${sym}${dailySavings}${v["perDay"] || "/day"}`,
      fidelityBenchmark,
      doublingTime: `~${doublingTime} ${yearsLabel}`,
      extraMonthlyNeeded: extraMonthlyNeeded > 0 ? `${sym}${fmtNum(extraMonthlyNeeded)}${v["perMonth"] || "/month"}` : "—",
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default retirementCalculatorConfig;
