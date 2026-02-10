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

export const calculator401kConfig: CalculatorConfigV4 = {
  id: "401k",
  version: "4.0",
  category: "finance",
  icon: "📈",

  // ─── PRESETS ───
  presets: [
    {
      id: "youngSaver",
      icon: "🌱",
      values: {
        currentAge: 25,
        retirementAge: 65,
        annualSalary: 55000,
        currentBalance: 5000,
        contributionPercent: 8,
        includeEmployerMatch: true,
        employerMatchPercent: 100,
        employerMatchLimit: 6,
        rateOfReturn: 7,
        includeSalaryGrowth: true,
        annualSalaryIncrease: 3,
        includeInflation: false,
        inflationRate: null,
      },
    },
    {
      id: "midCareer",
      icon: "💼",
      values: {
        currentAge: 40,
        retirementAge: 65,
        annualSalary: 95000,
        currentBalance: 120000,
        contributionPercent: 12,
        includeEmployerMatch: true,
        employerMatchPercent: 50,
        employerMatchLimit: 6,
        rateOfReturn: 7,
        includeSalaryGrowth: true,
        annualSalaryIncrease: 2.5,
        includeInflation: true,
        inflationRate: 2.5,
      },
    },
    {
      id: "lateStart",
      icon: "⏰",
      values: {
        currentAge: 50,
        retirementAge: 67,
        annualSalary: 85000,
        currentBalance: 60000,
        contributionPercent: 15,
        includeEmployerMatch: true,
        employerMatchPercent: 50,
        employerMatchLimit: 4,
        rateOfReturn: 6,
        includeSalaryGrowth: true,
        annualSalaryIncrease: 2,
        includeInflation: true,
        inflationRate: 3,
      },
    },
    {
      id: "aggressiveSaver",
      icon: "🚀",
      values: {
        currentAge: 30,
        retirementAge: 60,
        annualSalary: 120000,
        currentBalance: 40000,
        contributionPercent: 20,
        includeEmployerMatch: true,
        employerMatchPercent: 100,
        employerMatchLimit: 6,
        rateOfReturn: 8,
        includeSalaryGrowth: true,
        annualSalaryIncrease: 3.5,
        includeInflation: false,
        inflationRate: null,
      },
    },
  ],

  // ─── TRANSLATIONS (EN only — script translates) ───
  t: {
    en: {
      name: "401(k) Calculator",
      slug: "401k",
      subtitle:
        "Estimate your 401(k) balance at retirement with employer match, salary growth, and inflation — see how your savings grow over time.",
      breadcrumb: "401(k) Calc",

      seo: {
        title: "401(k) Calculator - Retirement Savings & Growth Estimator",
        description:
          "Estimate your 401(k) balance at retirement with employer match, catch-up contributions, salary growth, and inflation adjustment. Free multi-currency tool with year-by-year breakdown.",
        shortDescription:
          "Estimate your 401(k) retirement balance with employer match and growth projections.",
        keywords: [
          "401k calculator",
          "retirement calculator",
          "401k growth",
          "employer match calculator",
          "retirement savings",
          "401k contribution",
          "retirement planning",
          "catch-up contributions",
        ],
      },

      calculator: { yourInformation: "Your Information" },
      ui: {
        yourInformation: "Your Information",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        currentAge: {
          label: "Current Age",
          helpText: "Your current age — the earlier you start saving, the more time compound growth has to work",
        },
        retirementAge: {
          label: "Retirement Age",
          helpText: "Age you plan to retire — full Social Security benefits start at 67 for most people",
        },
        annualSalary: {
          label: "Annual Salary",
          helpText: "Your current annual gross income before taxes — used to calculate your contribution amount",
        },
        currentBalance: {
          label: "Current 401(k) Balance",
          helpText: "How much you currently have saved in your 401(k) account — check your latest statement",
        },
        contributionPercent: {
          label: "Your Contribution",
          helpText: "Percentage of your salary you contribute each year — aim for at least enough to get the full employer match",
        },
        includeEmployerMatch: {
          label: "Employer Match",
          helpText: "Toggle on if your employer matches a portion of your 401(k) contributions — this is free money",
        },
        employerMatchPercent: {
          label: "Match Rate",
          helpText: "How much your employer matches — 50% means they add $0.50 for every $1 you contribute, 100% means dollar-for-dollar",
        },
        employerMatchLimit: {
          label: "Match Limit (% of Salary)",
          helpText: "Maximum percentage of your salary your employer will match — typically 3% to 6% of salary",
        },
        rateOfReturn: {
          label: "Expected Rate of Return",
          helpText: "Average annual investment return — historically the S&P 500 averages ~10%, but 6-8% is more conservative",
        },
        includeSalaryGrowth: {
          label: "Salary Growth",
          helpText: "Toggle on to account for annual raises — your contributions grow as your salary increases",
        },
        annualSalaryIncrease: {
          label: "Annual Salary Increase",
          helpText: "Expected yearly raise percentage — average is 3% but varies by industry and performance",
        },
        includeInflation: {
          label: "Adjust for Inflation",
          helpText: "Toggle on to see your balance in today's purchasing power — shows what your savings are really worth",
        },
        inflationRate: {
          label: "Expected Inflation Rate",
          helpText: "Average annual inflation — historically around 2-3% in the US, but has been higher recently",
        },
      },

      presets: {
        youngSaver: {
          label: "Young Saver",
          description: "Age 25, $55K salary, 8% contribution",
        },
        midCareer: {
          label: "Mid-Career",
          description: "Age 40, $95K salary, 12% contribution",
        },
        lateStart: {
          label: "Late Start",
          description: "Age 50, $85K salary, 15% contribution",
        },
        aggressiveSaver: {
          label: "Aggressive",
          description: "Age 30, $120K salary, 20% contribution",
        },
      },

      values: {
        years: "years",
        year: "year",
        months: "months",
        month: "month",
        monthly: "/mo",
        perYear: "/yr",
      },

      formats: {
        summary:
          "By age {retirementAge}, your 401(k) could grow to {balanceAtRetirement}. You'll have contributed {totalContributions} with {totalEmployerMatch} in employer match and {totalGrowth} in investment growth.",
      },

      results: {
        balanceAtRetirement: { label: "Balance at Retirement" },
        totalContributions: { label: "Your Total Contributions" },
        totalEmployerMatch: { label: "Employer Match Total" },
        totalGrowth: { label: "Investment Growth" },
        monthlyRetirementIncome: { label: "Estimated Monthly Income" },
        annualTaxSavings: { label: "Annual Tax Savings (Current)" },
        freeMoneyFromMatch: { label: "Free Money from Employer" },
        inflationAdjustedBalance: { label: "Inflation-Adjusted Balance" },
      },

      infoCards: {
        snapshot: {
          title: "Retirement Snapshot",
          items: [
            { label: "Balance at Retirement", valueKey: "balanceAtRetirement" },
            { label: "Monthly Retirement Income", valueKey: "monthlyRetirementIncome" },
            { label: "Years of Retirement Funded", valueKey: "yearsFunded" },
            { label: "Total Amount Invested", valueKey: "totalInvested" },
          ],
        },
        breakdown: {
          title: "Contribution Breakdown",
          items: [
            { label: "Your Annual Contribution", valueKey: "annualContribution" },
            { label: "Annual Employer Match", valueKey: "annualEmployerMatch" },
            { label: "Annual Tax Savings", valueKey: "annualTaxSavings" },
            { label: "Free Money Left on Table", valueKey: "freeMoneyLeftOnTable" },
            { label: "Catch-up Eligible (50+)", valueKey: "catchUpEligible" },
          ],
        },
        tips: {
          title: "401(k) Tips",
          items: [
            "Always contribute enough to get the full employer match — it's an instant 50-100% return on your money that you can't beat anywhere else.",
            "Starting at 25 vs 35 with the same contributions can mean 2x more at retirement thanks to compound growth — time is your most powerful asset.",
            "After age 50, catch-up contributions let you add up to $7,500 extra per year (2025 limits) — ages 60-63 get an even higher $11,250 super catch-up.",
            "Consider increasing your contribution by 1% each year when you get a raise — you won't feel the difference but it adds up to hundreds of thousands over time.",
          ],
        },
      },

      chart: {
        title: "401(k) Growth Over Time",
        xLabel: "Age",
        yLabel: "Balance",
        series: {
          yourContributions: "Your Contributions",
          employerMatch: "Employer Match",
          investmentGrowth: "Investment Growth",
        },
      },

      detailedTable: {
        growthSchedule: {
          button: "View Year-by-Year Breakdown",
          title: "401(k) Growth Schedule",
          columns: {
            age: "Age",
            salary: "Salary",
            yourContribution: "Your Contribution",
            employerMatch: "Employer Match",
            growth: "Growth",
            balance: "Balance",
          },
        },
      },

      education: {
        whatIs: {
          title: "What Is a 401(k)?",
          content:
            "A 401(k) is an employer-sponsored retirement savings plan that lets you contribute a portion of your pre-tax salary to a tax-deferred investment account. Your contributions reduce your current taxable income, and your investments grow tax-free until you withdraw them in retirement. Many employers also match a percentage of your contributions, providing essentially free money toward your retirement. The plan gets its name from section 401(k) of the Internal Revenue Code, and it remains the most popular private-sector retirement savings vehicle in the United States, with over 70 million active participants.",
        },
        employerMatch: {
          title: "Understanding Employer Match",
          content:
            "Employer matching is one of the most valuable benefits of a 401(k). A common structure is a 50% match on contributions up to 6% of salary — meaning if you earn $80,000 and contribute 6% ($4,800), your employer adds $2,400. Some employers match dollar-for-dollar, effectively doubling your contributions up to the limit. Not contributing enough to capture the full match is literally leaving free money on the table. Vesting schedules may apply, meaning you might need to stay with the company for a certain number of years to keep 100% of employer contributions.",
        },
        contributionLimits: {
          title: "2026 Contribution Limits",
          items: [
            { text: "Under 50: $24,500 annual employee contribution limit", type: "info" },
            { text: "Ages 50-59 & 64+: Additional $8,000 catch-up ($32,500 total)", type: "info" },
            { text: "Ages 60-63: Super catch-up of $11,250 ($35,750 total)", type: "warning" },
            { text: "Total combined limit (employee + employer): $72,000", type: "info" },
            { text: "Employer match does NOT count toward your $24,500 employee limit", type: "info" },
            { text: "Contribution limits increase annually with inflation", type: "info" },
          ],
        },
        investmentOptions: {
          title: "Investment Options",
          items: [
            { text: "Target-date funds: Auto-adjust risk based on your retirement year", type: "info" },
            { text: "Index funds: Low-cost, diversified exposure to the broad market", type: "info" },
            { text: "Bond funds: Lower risk, fixed-income for conservative allocation", type: "info" },
            { text: "Company stock: High risk if concentrated — diversify beyond your employer", type: "warning" },
            { text: "Money market: Very low risk, low return — only for short-term safety", type: "info" },
            { text: "Expense ratios matter: Even 0.5% difference in fees costs tens of thousands over decades", type: "warning" },
          ],
        },
        examples: {
          title: "401(k) Growth Examples",
          description: "See how different contribution levels impact your retirement savings",
          examples: [
            {
              title: "Starting at 25 with 10% contribution",
              steps: [
                "Age 25 • Salary: $60,000 • Contribution: 10% = $6,000/yr",
                "Employer match: 50% up to 6% = $1,800/yr",
                "Total annual investment: $7,800",
                "At 7% annual return over 40 years",
                "Balance at 65: ~$1,620,000",
              ],
              result: "Starting early with a modest salary builds a $1.6M+ nest egg",
            },
            {
              title: "Starting at 40 with 15% contribution",
              steps: [
                "Age 40 • Salary: $90,000 • Contribution: 15% = $13,500/yr",
                "Employer match: 50% up to 6% = $2,700/yr",
                "Total annual investment: $16,200",
                "At 7% annual return over 25 years",
                "Balance at 65: ~$1,060,000",
              ],
              result: "Starting later requires higher contributions but still reaches $1M+",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How much should I contribute to my 401(k)?",
          answer:
            "At minimum, contribute enough to get your full employer match — anything less means you're leaving free money on the table. Ideally, aim for 10-15% of your salary. If you can't hit that right away, start with what you can afford and increase by 1% each year until you reach your target.",
        },
        {
          question: "What happens to my 401(k) if I change jobs?",
          answer:
            "You have several options: leave it with your former employer (if the balance is over $5,000), roll it over to your new employer's 401(k), roll it into an IRA for more investment choices, or cash it out (not recommended due to taxes and the 10% early withdrawal penalty). Rollovers are tax-free when done correctly.",
        },
        {
          question: "What are catch-up contributions?",
          answer:
            "If you're 50 or older, the IRS allows extra contributions above the standard limit. For 2026, the catch-up amount is $8,000 (total $32,500). A new 'super catch-up' for ages 60-63 allows an extra $11,250 (total $35,750). This helps people who started saving later to accelerate their retirement savings.",
        },
        {
          question: "What is an RMD (Required Minimum Distribution)?",
          answer:
            "Starting at age 73 (or 75 if born in 1960 or later), the IRS requires you to withdraw a minimum amount from your traditional 401(k) each year. The amount is calculated based on your account balance and life expectancy. Failing to take your RMD results in a 25% penalty on the amount you should have withdrawn.",
        },
        {
          question: "Can I withdraw from my 401(k) before age 59½?",
          answer:
            "Yes, but you'll generally owe income tax plus a 10% early withdrawal penalty. Exceptions include disability, certain medical expenses, qualified domestic relations orders, and the Rule of 55 (penalty-free withdrawals if you leave your job at age 55 or later). Hardship withdrawals may also be available but still incur taxes.",
        },
        {
          question: "How does employer match actually work?",
          answer:
            "Your employer contributes additional money based on how much you contribute. For example, '50% match up to 6%' means if you contribute 6% of your $80,000 salary ($4,800), your employer adds 50% of that ($2,400). If you only contribute 3%, they match $1,200 — you'd be leaving $1,200 of free money on the table each year.",
        },
        {
          question: "What rate of return should I expect from my 401(k)?",
          answer:
            "Historically, a diversified portfolio with 60% stocks and 40% bonds has returned approximately 7-8% annually before inflation. The S&P 500 alone has averaged about 10% over the long term. For conservative planning, using 6-7% is prudent. Actual returns depend on your investment allocation, fees, and market conditions.",
        },
        {
          question: "Can I use this calculator for 401(k) plans outside the U.S.?",
          answer:
            "While this calculator is designed for U.S. 401(k) plans, the compound growth math applies to any defined contribution retirement plan. You can use it for similar plans in other countries by adjusting the contribution limits and match structure. The multi-currency feature supports 32 currencies for global users.",
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
    },
  },

  // ─── INPUTS ───
  inputs: [
    // Current Age — stepper
    {
      id: "currentAge",
      type: "stepper",
      defaultValue: null,
      placeholder: "30",
      min: 18,
      max: 80,
      step: 1,
      suffix: "years",
    },
    // Retirement Age — stepper
    {
      id: "retirementAge",
      type: "stepper",
      defaultValue: 65,
      min: 50,
      max: 75,
      step: 1,
      suffix: "years",
    },
    // Annual Salary — currency unitType
    {
      id: "annualSalary",
      type: "number",
      defaultValue: null,
      placeholder: "75000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    // Current 401(k) Balance — currency unitType
    {
      id: "currentBalance",
      type: "number",
      defaultValue: null,
      placeholder: "25000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    // Contribution % of salary — number + slider
    {
      id: "contributionPercent",
      type: "number",
      defaultValue: null,
      placeholder: "10",
      min: 0,
      max: 100,
      step: 0.5,
      suffix: "%",
      slider: true,
    },
    // Include Employer Match — toggle
    {
      id: "includeEmployerMatch",
      type: "toggle",
      defaultValue: false,
    },
    // Employer Match % — revealed when toggle ON
    {
      id: "employerMatchPercent",
      type: "number",
      defaultValue: null,
      placeholder: "50",
      min: 0,
      max: 200,
      step: 1,
      suffix: "%",
      showWhen: { field: "includeEmployerMatch", value: true },
    },
    // Employer Match Limit (% of salary) — revealed when toggle ON
    {
      id: "employerMatchLimit",
      type: "number",
      defaultValue: null,
      placeholder: "6",
      min: 0,
      max: 100,
      step: 0.5,
      suffix: "%",
      showWhen: { field: "includeEmployerMatch", value: true },
    },
    // Expected Rate of Return — number + slider
    {
      id: "rateOfReturn",
      type: "number",
      defaultValue: 7,
      min: 0,
      max: 15,
      step: 0.1,
      suffix: "%",
      slider: true,
    },
    // Include Salary Growth — toggle
    {
      id: "includeSalaryGrowth",
      type: "toggle",
      defaultValue: false,
    },
    // Annual Salary Increase — revealed when toggle ON
    {
      id: "annualSalaryIncrease",
      type: "number",
      defaultValue: 3,
      min: 0,
      max: 20,
      step: 0.1,
      suffix: "%",
      showWhen: { field: "includeSalaryGrowth", value: true },
    },
    // Include Inflation — toggle
    {
      id: "includeInflation",
      type: "toggle",
      defaultValue: false,
    },
    // Expected Inflation Rate — revealed when toggle ON
    {
      id: "inflationRate",
      type: "number",
      defaultValue: 2.5,
      min: 0,
      max: 15,
      step: 0.1,
      suffix: "%",
      showWhen: { field: "includeInflation", value: true },
    },
  ],

  inputGroups: [], // EMPTY — no accordions

  // ─── RESULTS ───
  results: [
    { id: "balanceAtRetirement", type: "primary", format: "text" },
    { id: "totalContributions", type: "secondary", format: "text" },
    { id: "totalEmployerMatch", type: "secondary", format: "text" },
    { id: "totalGrowth", type: "secondary", format: "text" },
    { id: "monthlyRetirementIncome", type: "secondary", format: "text" },
    { id: "annualTaxSavings", type: "secondary", format: "text" },
    { id: "freeMoneyFromMatch", type: "secondary", format: "text" },
    { id: "inflationAdjustedBalance", type: "secondary", format: "text" },
  ],

  // ─── INFO CARDS ───
  infoCards: [
    { id: "snapshot", type: "list", icon: "💰", itemCount: 4 },
    { id: "breakdown", type: "list", icon: "📋", itemCount: 5 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ─── CHART ───
  chart: {
    id: "growthOverTime",
    type: "composed",
    xKey: "age",
    stacked: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "yourContributions", type: "area", stackId: "savings", color: "#3b82f6" },
      { key: "employerMatch", type: "area", stackId: "savings", color: "#10b981" },
      { key: "investmentGrowth", type: "area", stackId: "savings", color: "#f59e0b" },
    ],
  },

  // ─── DETAILED TABLE (Year-by-Year Growth Schedule) ───
  detailedTable: {
    id: "growthSchedule",
    buttonLabel: "View Year-by-Year Breakdown",
    buttonIcon: "📊",
    modalTitle: "401(k) Growth Schedule",
    columns: [
      { id: "age", label: "Age", align: "center" },
      { id: "salary", label: "Salary", align: "right" },
      { id: "yourContribution", label: "Your Contribution", align: "right" },
      { id: "employerMatch", label: "Employer Match", align: "right" },
      { id: "growth", label: "Growth", align: "right" },
      { id: "balance", label: "Balance", align: "right", highlight: true },
    ],
  },

  // ─── EDUCATION SECTIONS ───
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "employerMatch", type: "prose", icon: "🤝" },
    { id: "contributionLimits", type: "list", icon: "📋", itemCount: 6 },
    { id: "investmentOptions", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
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
      authors: "Internal Revenue Service",
      year: "2025",
      title: "401(k) Limit Increases to $24,500 for 2026",
      source: "IRS.gov",
      url: "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500",
    },
    {
      authors: "U.S. Department of Labor",
      year: "2024",
      title: "What You Should Know About Your Retirement Plan",
      source: "DOL.gov",
      url: "https://www.dol.gov/sites/dolgov/files/EBSA/about-ebsa/our-activities/resource-center/publications/what-you-should-know-about-your-retirement-plan.pdf",
    },
    {
      authors: "Vanguard Group",
      year: "2025",
      title: "How America Saves — 401(k) Plan Participant Behavior",
      source: "Vanguard Research",
      url: "https://institutional.vanguard.com/content/dam/inst/vanguard-has/insights-pdfs/how-america-saves-report-2024.pdf",
    },
    {
      authors: "Consumer Financial Protection Bureau",
      year: "2024",
      title: "Saving for Retirement",
      source: "CFPB.gov",
      url: "https://www.consumerfinance.gov/consumer-tools/retirement/",
    },
  ],

  referenceData: [],
};

// ═══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════

export function calculate401k(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read inputs ──
  const currentAge = values.currentAge as number | null;
  const retirementAge = (values.retirementAge as number) || 65;
  const annualSalary = values.annualSalary as number | null;
  const currentBalance = (values.currentBalance as number | null) || 0;
  const contributionPercent = (values.contributionPercent as number | null) || 0;

  const includeEmployerMatch = values.includeEmployerMatch as boolean;
  const employerMatchPercent = includeEmployerMatch
    ? ((values.employerMatchPercent as number | null) || 0) / 100
    : 0;
  const employerMatchLimit = includeEmployerMatch
    ? ((values.employerMatchLimit as number | null) || 0) / 100
    : 0;

  const rateOfReturn = ((values.rateOfReturn as number) ?? 7) / 100;

  const includeSalaryGrowth = values.includeSalaryGrowth as boolean;
  const annualSalaryIncrease = includeSalaryGrowth
    ? ((values.annualSalaryIncrease as number) ?? 3) / 100
    : 0;

  const includeInflation = values.includeInflation as boolean;
  const inflationRate = includeInflation
    ? ((values.inflationRate as number) ?? 2.5) / 100
    : 0;

  // ── Validate required ──
  if (!currentAge || !annualSalary || annualSalary <= 0 || currentAge >= retirementAge) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Currency symbol ──
  const curr = fieldUnits?.annualSalary || "USD";
  const sym = CURRENCY_SYMBOLS[curr] || "$";

  // ── Year-by-year simulation ──
  const yearsToRetirement = retirementAge - currentAge;
  let balance = currentBalance;
  let salary = annualSalary;
  let totalContributions = 0;
  let totalEmployerMatch = 0;
  let totalGrowth = 0;

  const chartData: Array<Record<string, unknown>> = [];
  const tableData: Array<Record<string, string>> = [];

  // Cumulative trackers for chart
  let cumulativeContributions = 0;
  let cumulativeMatch = 0;
  let cumulativeGrowth = 0;

  // First year contribution for tax savings display
  let firstYearContribution = 0;
  let firstYearMatch = 0;

  // IRS 2026 limits
  const IRS_LIMIT_2026 = 24500;
  const CATCH_UP_50 = 8000;
  const SUPER_CATCH_UP_60_63 = 11250;

  for (let year = 0; year < yearsToRetirement; year++) {
    const age = currentAge + year;

    // ── Employee contribution (capped at IRS limit) ──
    let employeeContribution = salary * (contributionPercent / 100);

    // Apply IRS contribution limits
    let annualLimit = IRS_LIMIT_2026;
    if (age >= 60 && age <= 63) {
      annualLimit += SUPER_CATCH_UP_60_63;
    } else if (age >= 50) {
      annualLimit += CATCH_UP_50;
    }
    employeeContribution = Math.min(employeeContribution, annualLimit);

    // ── Employer match ──
    const maxMatchableContribution = salary * employerMatchLimit;
    const matchableAmount = Math.min(employeeContribution, maxMatchableContribution);
    const employerMatch = matchableAmount * employerMatchPercent;

    // ── Investment growth ──
    const startBalance = balance;
    const growth = (startBalance + employeeContribution + employerMatch) * rateOfReturn;

    // ── Update balance ──
    balance = startBalance + employeeContribution + employerMatch + growth;

    // ── Track totals ──
    totalContributions += employeeContribution;
    totalEmployerMatch += employerMatch;
    totalGrowth += growth;

    cumulativeContributions += employeeContribution;
    cumulativeMatch += employerMatch;
    cumulativeGrowth += growth;

    // First year data for display
    if (year === 0) {
      firstYearContribution = employeeContribution;
      firstYearMatch = employerMatch;
    }

    // ── Chart data (stacked area — cumulative breakdown) ──
    chartData.push({
      age: `${age + 1}`,
      yourContributions: Math.round(currentBalance + cumulativeContributions),
      employerMatch: Math.round(cumulativeMatch),
      investmentGrowth: Math.round(cumulativeGrowth),
    });

    // ── Table data ──
    tableData.push({
      age: `${age + 1}`,
      salary: `${sym}${fmtNum(salary, 0)}`,
      yourContribution: `${sym}${fmtNum(employeeContribution, 0)}`,
      employerMatch: `${sym}${fmtNum(employerMatch, 0)}`,
      growth: `${sym}${fmtNum(growth, 0)}`,
      balance: `${sym}${fmtNum(balance, 0)}`,
    });

    // ── Apply salary growth for next year ──
    salary *= 1 + annualSalaryIncrease;
  }

  // ── Inflation-adjusted balance ──
  const inflationFactor = Math.pow(1 + inflationRate, yearsToRetirement);
  const inflationAdjustedBalance = inflationRate > 0 ? balance / inflationFactor : balance;

  // ── Monthly retirement income (4% rule ÷ 12) ──
  const annualWithdrawal = balance * 0.04;
  const monthlyRetirementIncome = annualWithdrawal / 12;

  // ── Years of retirement funded (at 4% withdrawal rate) ──
  // Simplified: balance ÷ annual expenses, assuming 4% rule sustains ~25-30 years
  const yearsFunded = balance > 0 ? Math.round(balance / annualWithdrawal) : 0;

  // ── Total invested (contributions + match) ──
  const totalInvested = totalContributions + totalEmployerMatch + currentBalance;

  // ── Annual tax savings (first year — assuming ~24% marginal bracket as estimate) ──
  const estimatedTaxBracket = 0.24;
  const annualTaxSavings = firstYearContribution * estimatedTaxBracket;

  // ── Free money left on table (if not maxing employer match) ──
  const maxPossibleMatch = annualSalary * employerMatchLimit * employerMatchPercent;
  const freeMoneyLeftOnTable = Math.max(maxPossibleMatch - firstYearMatch, 0);

  // ── Catch-up eligibility ──
  const isCatchUpEligible = currentAge >= 50;
  const catchUpAmount = currentAge >= 60 && currentAge <= 63
    ? SUPER_CATCH_UP_60_63
    : isCatchUpEligible
      ? CATCH_UP_50
      : 0;
  const catchUpEligibleStr = isCatchUpEligible
    ? `Yes — ${sym}${fmtNum(catchUpAmount, 0)}/yr extra`
    : "Not yet — available at age 50";

  // ── Build summary ──
  const summary =
    f.summary
      ?.replace("{retirementAge}", `${retirementAge}`)
      .replace("{balanceAtRetirement}", `${sym}${fmtNum(balance, 0)}`)
      .replace("{totalContributions}", `${sym}${fmtNum(totalContributions, 0)}`)
      .replace("{totalEmployerMatch}", `${sym}${fmtNum(totalEmployerMatch, 0)}`)
      .replace("{totalGrowth}", `${sym}${fmtNum(totalGrowth, 0)}`) ||
    `By age ${retirementAge}, your 401(k) could grow to ${sym}${fmtNum(balance, 0)}.`;

  // ── Format results ──
  return {
    values: {
      balanceAtRetirement: balance,
      totalContributions,
      totalEmployerMatch,
      totalGrowth,
      monthlyRetirementIncome,
      annualTaxSavings,
      freeMoneyFromMatch: totalEmployerMatch,
      inflationAdjustedBalance,
      yearsFunded,
      totalInvested,
      annualContribution: firstYearContribution,
      annualEmployerMatch: firstYearMatch,
      freeMoneyLeftOnTable,
      catchUpEligible: catchUpEligibleStr,
    },
    formatted: {
      balanceAtRetirement: `${sym}${fmtNum(balance, 0)}`,
      totalContributions: `${sym}${fmtNum(totalContributions, 0)}`,
      totalEmployerMatch: `${sym}${fmtNum(totalEmployerMatch, 0)}`,
      totalGrowth: `${sym}${fmtNum(totalGrowth, 0)}`,
      monthlyRetirementIncome: `${sym}${fmtNum(monthlyRetirementIncome)}${v["monthly"] || "/mo"}`,
      annualTaxSavings: `~${sym}${fmtNum(annualTaxSavings, 0)}${v["perYear"] || "/yr"}`,
      freeMoneyFromMatch: `${sym}${fmtNum(totalEmployerMatch, 0)} total`,
      inflationAdjustedBalance: inflationRate > 0
        ? `${sym}${fmtNum(inflationAdjustedBalance, 0)} (today's dollars)`
        : "—",
      yearsFunded: `~${yearsFunded} ${yearsFunded === 1 ? (v["year"] || "year") : (v["years"] || "years")}`,
      totalInvested: `${sym}${fmtNum(totalInvested, 0)}`,
      annualContribution: `${sym}${fmtNum(firstYearContribution, 0)}${v["perYear"] || "/yr"}`,
      annualEmployerMatch: `${sym}${fmtNum(firstYearMatch, 0)}${v["perYear"] || "/yr"}`,
      freeMoneyLeftOnTable: freeMoneyLeftOnTable > 0
        ? `${sym}${fmtNum(freeMoneyLeftOnTable, 0)}/yr — increase contribution!`
        : "✅ You're maximizing your match!",
      catchUpEligible: catchUpEligibleStr,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}
