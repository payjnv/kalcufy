import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ═══════════════════════════════════════════════════════════════════
// 💰 401(k) CALCULATOR — V4 Engine (English Only)
// ═══════════════════════════════════════════════════════════════════
// Features:
//   ✅ Employer match + vesting schedule
//   ✅ 2025/2026 IRS limits (catch-up + super catch-up 60-63)
//   ✅ Roth vs Traditional comparison with winner declared
//   ✅ Fee impact over career
//   ✅ "Money left on table" alert
//   ✅ 4% rule retirement income
//   ✅ Inflation adjustment
//   ✅ Year-by-year detailed table
// ═══════════════════════════════════════════════════════════════════

export const fourOhOneKCalculatorConfig: CalculatorConfigV4 = {
  id: "401k-calculator",
  version: "4.0",
  category: "finance",
  icon: "💰",

  // ─── PRESETS ──────────────────────────────────────────────────
  presets: [
    {
      id: "youngProfessional",
      icon: "🎓",
      values: {
        currentAge: 25,
        retirementAge: 67,
        annualSalary: 55000,
        currentBalance: 2000,
        salaryIncrease: 3,
        contributionPercent: 6,
        employerMatch: 50,
        employerMatchLimit: 6,
        vestingYears: 4,
        yearsAtCompany: 1,
        expectedReturn: 7,
        annualFees: 0.5,
        includeInflation: true,
        inflationRate: 3,
        accountType: "traditional",
      },
    },
    {
      id: "midCareerBoost",
      icon: "💼",
      values: {
        currentAge: 40,
        retirementAge: 67,
        annualSalary: 95000,
        currentBalance: 120000,
        salaryIncrease: 2.5,
        contributionPercent: 10,
        employerMatch: 100,
        employerMatchLimit: 4,
        vestingYears: 3,
        yearsAtCompany: 5,
        expectedReturn: 7,
        annualFees: 0.4,
        includeInflation: true,
        inflationRate: 3,
        accountType: "traditional",
      },
    },
    {
      id: "familyProvider",
      icon: "👨‍👩‍👧",
      values: {
        currentAge: 35,
        retirementAge: 65,
        annualSalary: 85000,
        currentBalance: 45000,
        salaryIncrease: 3,
        contributionPercent: 8,
        employerMatch: 50,
        employerMatchLimit: 6,
        vestingYears: 3,
        yearsAtCompany: 3,
        expectedReturn: 7,
        annualFees: 0.5,
        includeInflation: true,
        inflationRate: 3,
        accountType: "compare",
      },
    },
    {
      id: "maxContributor",
      icon: "🏆",
      values: {
        currentAge: 45,
        retirementAge: 67,
        annualSalary: 150000,
        currentBalance: 350000,
        salaryIncrease: 2,
        contributionPercent: 15,
        employerMatch: 100,
        employerMatchLimit: 6,
        vestingYears: 0,
        yearsAtCompany: 10,
        expectedReturn: 7,
        annualFees: 0.3,
        includeInflation: true,
        inflationRate: 3,
        accountType: "traditional",
      },
    },
    {
      id: "catchUpSprint",
      icon: "🔥",
      values: {
        currentAge: 55,
        retirementAge: 67,
        annualSalary: 110000,
        currentBalance: 280000,
        salaryIncrease: 2,
        contributionPercent: 20,
        employerMatch: 100,
        employerMatchLimit: 5,
        vestingYears: 0,
        yearsAtCompany: 15,
        expectedReturn: 6,
        annualFees: 0.4,
        includeInflation: true,
        inflationRate: 3,
        accountType: "traditional",
      },
    },
  ],

  // ─── TRANSLATIONS (English only — script translates) ──────────
  t: {
    en: {
      name: "401(k) Calculator",
      slug: "401k-calculator",
      subtitle: "Estimate your 401(k) at retirement with employer match, catch-up contributions, and Roth vs Traditional comparison.",
      breadcrumb: "401(k) Calc",

      seo: {
        title: "401(k) Calculator - Retirement Savings & Match Estimator",
        description: "Estimate your 401(k) balance at retirement. See how employer match, contribution rate, and compound growth build your nest egg. Free with Roth vs Traditional comparison.",
        shortDescription: "Project your 401(k) growth with employer match and IRS limits.",
        keywords: [
          "401k calculator",
          "retirement savings calculator",
          "401k contribution calculator",
          "how much will my 401k be worth",
          "employer match calculator",
          "free 401k calculator",
          "retirement planning tool",
          "roth vs traditional 401k",
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
          helpText: "Your current age — used to calculate years until retirement",
        },
        retirementAge: {
          label: "Retirement Age",
          helpText: "The age you plan to retire and stop contributing",
        },
        annualSalary: {
          label: "Annual Salary",
          helpText: "Your current gross annual salary before taxes",
        },
        currentBalance: {
          label: "Current 401(k) Balance",
          helpText: "How much you already have saved in your 401(k)",
        },
        salaryIncrease: {
          label: "Annual Salary Increase",
          helpText: "Expected average yearly raise percentage",
        },
        contributionPercent: {
          label: "Your Contribution",
          helpText: "Percentage of salary you contribute each year",
        },
        employerMatch: {
          label: "Employer Match",
          helpText: "Percentage your employer matches (e.g. 50% means they add 50¢ for every $1 you contribute)",
        },
        employerMatchLimit: {
          label: "Employer Match Limit",
          helpText: "Maximum % of your salary the employer will match",
        },
        vestingYears: {
          label: "Vesting Period",
          helpText: "Years until you own 100% of employer contributions (0 = immediate vesting)",
        },
        yearsAtCompany: {
          label: "Years at Company",
          helpText: "How many years you've worked at your current employer",
        },
        expectedReturn: {
          label: "Expected Annual Return",
          helpText: "Average annual investment return (7% is historical S&P 500 average)",
        },
        annualFees: {
          label: "Annual Plan Fees",
          helpText: "Total annual expense ratio of your 401(k) plan investments",
        },
        includeInflation: {
          label: "Adjust for Inflation",
          helpText: "Show the real purchasing power of your future balance",
        },
        inflationRate: {
          label: "Inflation Rate",
          helpText: "Expected average annual inflation rate",
        },
        accountType: {
          label: "Account Type",
          helpText: "Compare Traditional pre-tax vs Roth after-tax contributions",
          options: {
            traditional: "Traditional 401(k)",
            roth: "Roth 401(k)",
            compare: "Compare Both",
          },
        },
        currentTaxRate: {
          label: "Current Tax Rate",
          helpText: "Your current marginal tax rate — affects Roth contributions",
        },
        retirementTaxRate: {
          label: "Retirement Tax Rate",
          helpText: "Expected tax rate in retirement — affects Traditional withdrawals",
        },
      },

      results: {
        balanceAtRetirement: { label: "Balance at Retirement" },
        totalContributions: { label: "Your Total Contributions" },
        totalEmployerMatch: { label: "Total Employer Match" },
        totalGrowth: { label: "Investment Growth" },
        monthlyRetirementIncome: { label: "Monthly Retirement Income" },
        effectiveReturnRate: { label: "Effective Return (After Fees)" },
        moneyLeftOnTable: { label: "Free Money Left on Table" },
        catchUpBonus: { label: "Catch-Up Bonus (50+)" },
      },

      presets: {
        youngProfessional: { label: "Young Professional", description: "Age 25, $55K salary, 6% contribution" },
        midCareerBoost: { label: "Mid-Career Boost", description: "Age 40, $95K salary, 10% contribution" },
        familyProvider: { label: "Family Provider", description: "Age 35, $85K salary, compare Roth vs Traditional" },
        maxContributor: { label: "Max Contributor", description: "Age 45, $150K salary, maxing out" },
        catchUpSprint: { label: "Catch-Up Sprint", description: "Age 55, $110K salary, 20% contribution" },
      },

      values: {
        "years": "years",
        "year": "year",
        "months": "months",
        "month": "month",
        "/yr": "/yr",
        "perMonth": "/mo",
        "perDay": "/day",
        "of": "of",
        "x": "×",
        "noMatch": "You're not leaving money on the table!",
        "noCatchUp": "Available after age 50",
        "traditionalWins": "Traditional wins by",
        "rothWins": "Roth wins by",
        "tie": "Both options are roughly equal",
      },

      formats: {
        summary: "Your 401(k) is projected to reach {balanceAtRetirement} by age {retirementAge}, providing approximately {monthlyRetirementIncome} per month in retirement income.",
      },

      infoCards: {
        metrics: {
          title: "Retirement Readiness",
          items: [
            { label: "Salary Multiplier at Retirement", valueKey: "yearsOfSalary" },
            { label: "Daily Budget in Retirement", valueKey: "dailyBudget" },
            { label: "Estimated Years Funds Will Last", valueKey: "yearsWillLast" },
            { label: "Income Replacement Rate", valueKey: "replacementRate" },
          ],
        },
        details: {
          title: "Match & Fee Optimizer",
          items: [
            { label: "Employer Match ROI", valueKey: "matchROI" },
            { label: "Total Fees Paid Over Career", valueKey: "totalFeesPaid" },
            { label: "Optimal Contribution to Max Match", valueKey: "optimalContrib" },
            { label: "Current Vesting Status", valueKey: "vestedPercent" },
          ],
        },
        tips: {
          title: "Tips to Maximize Your 401(k)",
          items: [
            "Always contribute at least enough to get the full employer match — it's free money with an instant 50-100% return",
            "After age 50 you can contribute an extra $7,500/year in catch-up contributions; ages 60-63 get $11,250 extra under SECURE 2.0",
            "Increasing your contribution by just 1% each year can add $50,000+ to your retirement balance over a career",
            "Watch your plan fees — a 1% difference in fees can reduce your balance by 25% over 30 years",
          ],
        },
      },

      chart: {
        title: "📈 401(k) Growth Projection",
        xLabel: "Age",
        yLabel: "Balance",
        series: {
          contributions: "Your Contributions",
          employerMatch: "Employer Match",
          growth: "Investment Growth",
        },
      },

      detailedTable: {
        growthTable: {
          button: "View Year-by-Year Growth Table",
          title: "Year-by-Year 401(k) Growth Breakdown",
          columns: {
            year: "Year",
            age: "Age",
            salary: "Salary",
            yourContrib: "Your Contrib.",
            matchContrib: "Employer Match",
            yearGrowth: "Growth",
            balance: "Balance",
          },
        },
      },

      education: {
        whatIs: {
          title: "What Is a 401(k)?",
          content: "A 401(k) is an employer-sponsored retirement savings plan that lets you contribute a portion of your pre-tax or after-tax salary to a tax-advantaged investment account. Contributions grow tax-deferred (Traditional) or tax-free (Roth), and many employers offer matching contributions — essentially free money that can dramatically accelerate your retirement savings. The plan is named after section 401(k) of the Internal Revenue Code and has become the most popular retirement savings vehicle in the United States, with over 70 million active participants managing more than $7 trillion in assets.",
        },
        howItWorks: {
          title: "Traditional vs Roth 401(k)",
          content: "With a Traditional 401(k), contributions are made pre-tax, reducing your current taxable income. Your money grows tax-deferred, but you pay ordinary income tax on withdrawals in retirement. With a Roth 401(k), contributions are made after-tax (no upfront tax break), but qualified withdrawals in retirement are completely tax-free. The right choice depends on whether you expect your tax rate to be higher or lower in retirement. If you expect higher taxes later (early career, rising income), Roth is typically better. If you're in your peak earning years and expect lower taxes in retirement, Traditional usually wins. Note that employer matching contributions always go into a Traditional (pre-tax) account, even if you choose Roth for your own contributions.",
        },
        considerations: {
          title: "Key 401(k) Rules to Know",
          items: [
            { text: "2025 employee contribution limit: $23,500 under age 50 ($24,500 in 2026)", type: "info" },
            { text: "Catch-up contributions for ages 50+: extra $7,500/year ($8,000 in 2026)", type: "info" },
            { text: "SECURE 2.0 super catch-up for ages 60-63: extra $11,250/year", type: "info" },
            { text: "Combined employee + employer limit: $70,000 (2025) / $72,000 (2026)", type: "info" },
            { text: "Early withdrawal before age 59½ incurs a 10% penalty plus income taxes", type: "warning" },
            { text: "Required Minimum Distributions (RMDs) start at age 73 for Traditional 401(k)", type: "warning" },
          ],
        },
        categories: {
          title: "Understanding Employer Match & Vesting",
          items: [
            { text: "Common match formula: employer matches 50% of your contributions up to 6% of salary", type: "info" },
            { text: "Dollar-for-dollar match: employer matches 100% of contributions up to a salary limit", type: "info" },
            { text: "Graded vesting: you earn ownership of employer match gradually over 2-6 years", type: "info" },
            { text: "Cliff vesting: you own 0% until a specific year, then 100% at once", type: "info" },
            { text: "Your own contributions are always 100% vested immediately", type: "info" },
            { text: "If you leave before fully vested, you forfeit the unvested employer match portion", type: "warning" },
          ],
        },
        examples: {
          title: "Real-World 401(k) Examples",
          description: "See how different scenarios play out",
          examples: [
            {
              title: "Employer Match Value: $90K salary, 50% match up to 6%",
              steps: [
                "Your contribution: 6% × $90,000 = $5,400/year",
                "Employer match: 50% × $5,400 = $2,700/year",
                "Total annual investment: $5,400 + $2,700 = $8,100/year",
                "Without match you'd need to save $8,100 yourself — the match gives you an instant 50% return",
              ],
              result: "The employer match adds $2,700/year — over 30 years at 7% return, that match alone grows to ~$255,000",
            },
            {
              title: "Catch-Up Impact: Age 55, $120K salary",
              steps: [
                "Regular limit (2025): $23,500/year",
                "Catch-up bonus (age 50+): +$7,500/year",
                "Total allowed: $31,000/year",
                "At ages 60-63, super catch-up allows $34,750/year total",
              ],
              result: "The extra $7,500/year catch-up from age 55-67 at 7% return adds approximately $150,000 to your retirement balance",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How much should I contribute to my 401(k)?",
          answer: "At minimum, contribute enough to get the full employer match — anything less means leaving free money on the table. Financial advisors generally recommend saving 10-15% of your gross income for retirement. If you can't reach that immediately, start with the match and increase by 1% each year until you reach your target.",
        },
        {
          question: "What happens to my 401(k) if I change jobs?",
          answer: "Your own contributions are always yours. For employer match, you keep only the vested portion based on your vesting schedule. You can leave the money in your old plan, roll it into your new employer's plan, roll it into an IRA, or cash it out (not recommended due to taxes and penalties). A direct rollover to an IRA or new 401(k) avoids tax consequences.",
        },
        {
          question: "Can I withdraw from my 401(k) before age 59½?",
          answer: "Yes, but early withdrawals from a Traditional 401(k) are subject to ordinary income tax plus a 10% early withdrawal penalty. Exceptions include disability, certain medical expenses, the Rule of 55 (separation from service at age 55+), and substantially equal periodic payments. Roth 401(k) contributions (not earnings) can be withdrawn tax and penalty-free since they were made after-tax.",
        },
        {
          question: "Should I choose Traditional or Roth 401(k)?",
          answer: "Choose Roth if you expect to be in a higher tax bracket in retirement, are early in your career with rising income, or want tax-free withdrawals. Choose Traditional if you're in your peak earning years and expect lower taxes in retirement, want to maximize your current take-home pay reduction of taxable income, or need the largest immediate tax break. Many advisors recommend having both for tax diversification.",
        },
        {
          question: "How does the employer match work exactly?",
          answer: "Employer match is typically expressed as a percentage of your contribution up to a salary limit. For example, '50% match up to 6%' means: if you contribute 6% of your $80K salary ($4,800), your employer adds 50% of that ($2,400). If you only contribute 3%, they match 50% of 3% ($1,200). Contributing less than the match limit means missing out on free money.",
        },
        {
          question: "What are the 2025 IRS contribution limits?",
          answer: "For 2025, the employee contribution limit is $23,500 (under age 50). Workers age 50+ can add $7,500 in catch-up contributions for a total of $31,000. Under SECURE 2.0, workers ages 60-63 get a super catch-up of $11,250 extra (total $34,750). The combined employee plus employer limit is $70,000 ($77,500 with catch-up). For 2026, limits increase to $24,500 base and $72,000 combined.",
        },
      ],

      rating: {
        title: "Rate this Calculator",
        share: "Share this calculator",
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

  // ─── INPUTS ───────────────────────────────────────────────────
  inputs: [
    // Age — stepper (discrete values)
    {
      id: "currentAge",
      type: "stepper",
      defaultValue: 30,
      min: 18,
      max: 75,
      step: 1,
    },
    {
      id: "retirementAge",
      type: "stepper",
      defaultValue: 67,
      min: 50,
      max: 80,
      step: 1,
    },

    // Salary — currency with unitType (SENSITIVE → null + placeholder)
    {
      id: "annualSalary",
      type: "number",
      defaultValue: null,
      placeholder: "75000",
      unitType: "currency",
      autoConvert: false,
      syncGroup: false,
      defaultUnit: "USD",
    },

    // Salary increase — slider (continuous range)
    {
      id: "salaryIncrease",
      type: "slider",
      defaultValue: 3,
      min: 0,
      max: 10,
      step: 0.5,
      suffix: "%",
    },

    // Current balance — currency (SENSITIVE → null + placeholder)
    {
      id: "currentBalance",
      type: "number",
      defaultValue: null,
      placeholder: "10000",
      unitType: "currency",
      autoConvert: false,
      syncGroup: false,
      defaultUnit: "USD",
    },

    // Contribution % — slider
    {
      id: "contributionPercent",
      type: "slider",
      defaultValue: 6,
      min: 0,
      max: 50,
      step: 1,
      suffix: "%",
    },

    // Employer match — slider
    {
      id: "employerMatch",
      type: "slider",
      defaultValue: 50,
      min: 0,
      max: 100,
      step: 10,
      suffix: "%",
    },

    // Employer match limit — slider
    {
      id: "employerMatchLimit",
      type: "slider",
      defaultValue: 6,
      min: 0,
      max: 15,
      step: 1,
      suffix: "%",
    },

    // Vesting — stepper (discrete: 0-6 years)
    {
      id: "vestingYears",
      type: "stepper",
      defaultValue: 4,
      min: 0,
      max: 6,
      step: 1,
    },

    // Years at company — stepper
    {
      id: "yearsAtCompany",
      type: "stepper",
      defaultValue: 1,
      min: 0,
      max: 40,
      step: 1,
    },

    // Return — slider
    {
      id: "expectedReturn",
      type: "slider",
      defaultValue: 7,
      min: 0,
      max: 15,
      step: 0.5,
      suffix: "%",
    },

    // Fees — slider
    {
      id: "annualFees",
      type: "slider",
      defaultValue: 0.5,
      min: 0,
      max: 3,
      step: 0.1,
      suffix: "%",
    },

    // Inflation toggle — boolean
    {
      id: "includeInflation",
      type: "toggle",
      defaultValue: true,
    },

    // Inflation rate — slider (showWhen toggle is true)
    {
      id: "inflationRate",
      type: "slider",
      defaultValue: 3,
      min: 0,
      max: 10,
      step: 0.5,
      suffix: "%",
      showWhen: { field: "includeInflation", value: true },
    },

    // Account type — radio (3 options)
    {
      id: "accountType",
      type: "radio",
      defaultValue: "traditional",
      options: [
        { value: "traditional" },
        { value: "roth" },
        { value: "compare" },
      ],
    },

    // Tax rates — only visible when comparing
    {
      id: "currentTaxRate",
      type: "slider",
      defaultValue: 24,
      min: 0,
      max: 50,
      step: 1,
      suffix: "%",
      showWhen: { field: "accountType", value: "compare" },
    },
    {
      id: "retirementTaxRate",
      type: "slider",
      defaultValue: 18,
      min: 0,
      max: 50,
      step: 1,
      suffix: "%",
      showWhen: { field: "accountType", value: "compare" },
    },
  ],

  inputGroups: [],

  // ─── RESULTS ──────────────────────────────────────────────────
  results: [
    { id: "balanceAtRetirement", type: "primary", format: "number" },
    { id: "totalContributions", type: "secondary", format: "number" },
    { id: "totalEmployerMatch", type: "secondary", format: "number" },
    { id: "totalGrowth", type: "secondary", format: "number" },
    { id: "monthlyRetirementIncome", type: "secondary", format: "number" },
    { id: "effectiveReturnRate", type: "secondary", format: "percent" },
    { id: "moneyLeftOnTable", type: "secondary", format: "number" },
    { id: "catchUpBonus", type: "secondary", format: "number" },
  ],

  // ─── INFOCARDS ────────────────────────────────────────────────
  infoCards: [
    { id: "metrics", type: "list", icon: "📊", itemCount: 4 },
    { id: "details", type: "list", icon: "🔍", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ─── CHART ────────────────────────────────────────────────────
  chart: {
    id: "growthProjection",
    type: "composed",
    xKey: "age",
    height: 340,
    stacked: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "contributions", type: "area", stackId: "growth", color: "#3b82f6" },
      { key: "employerMatch", type: "area", stackId: "growth", color: "#10b981" },
      { key: "growth", type: "area", stackId: "growth", color: "#8b5cf6" },
    ],
  },

  // ─── DETAILED TABLE ───────────────────────────────────────────
  detailedTable: {
    id: "growthTable",
    buttonLabel: "View Year-by-Year Growth Table",
    buttonIcon: "📅",
    modalTitle: "Year-by-Year 401(k) Growth Breakdown",
    columns: [
      { id: "year", label: "Year", align: "center" },
      { id: "age", label: "Age", align: "center" },
      { id: "salary", label: "Salary", align: "right" },
      { id: "yourContrib", label: "Your Contrib.", align: "right" },
      { id: "matchContrib", label: "Match", align: "right" },
      { id: "yearGrowth", label: "Growth", align: "right" },
      { id: "balance", label: "Balance", align: "right", highlight: true },
    ],
  },

  referenceData: [],

  // ─── EDUCATION ────────────────────────────────────────────────
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  // ─── FAQS ─────────────────────────────────────────────────────
  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  // ─── REFERENCES ───────────────────────────────────────────────
  references: [
    {
      authors: "Internal Revenue Service",
      year: "2025",
      title: "Retirement Topics — 401(k) and Profit-Sharing Plan Contribution Limits",
      source: "IRS",
      url: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits",
    },
    {
      authors: "U.S. Congress",
      year: "2022",
      title: "SECURE 2.0 Act of 2022 — Retirement Savings Provisions",
      source: "Congress.gov",
      url: "https://www.congress.gov/bill/117th-congress/house-bill/2617",
    },
  ],

  hero: {
    headline: "401(k) Calculator",
  },
  sidebar: {},
  features: {},
  relatedCalculators: [
    "interest-calculator",
    "savings-calculator",
    "investment-calculator",
    "income-tax-calculator",
  ],
  ads: {},
};

// ═══════════════════════════════════════════════════════════════════
// 🧮 CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════════

export function calculateFourOhOneKCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ─── Currency symbol ──────────────────────────────────────────
  const curr = fieldUnits?.annualSalary || "USD";
  const SYMBOLS: Record<string, string> = {
    USD: "$", EUR: "€", GBP: "£", MXN: "MX$", BRL: "R$",
    JPY: "¥", INR: "₹", CAD: "C$", AUD: "A$", CHF: "CHF ",
    COP: "COL$", ARS: "AR$", PEN: "S/", CLP: "CLP ",
  };
  const sym = SYMBOLS[curr] || "$";

  // ─── Read inputs ──────────────────────────────────────────────
  const currentAge = (values.currentAge as number) || 30;
  const retirementAge = (values.retirementAge as number) || 67;
  const annualSalary = (values.annualSalary as number | null) ?? 0;
  const currentBalance = (values.currentBalance as number | null) ?? 0;
  const salaryIncrease = ((values.salaryIncrease as number) ?? 3) / 100;
  const contributionPercent = ((values.contributionPercent as number) ?? 6) / 100;
  const employerMatchRate = ((values.employerMatch as number) ?? 50) / 100;
  const employerMatchLimit = ((values.employerMatchLimit as number) ?? 6) / 100;
  const vestingYears = (values.vestingYears as number) ?? 4;
  const yearsAtCompany = (values.yearsAtCompany as number) ?? 1;
  const expectedReturn = ((values.expectedReturn as number) ?? 7) / 100;
  const annualFees = ((values.annualFees as number) ?? 0.5) / 100;
  const includeInflation = values.includeInflation === true;
  const inflationRate = includeInflation ? (((values.inflationRate as number) ?? 3) / 100) : 0;
  const accountType = (values.accountType as string) || "traditional";
  const currentTaxRate = ((values.currentTaxRate as number) ?? 24) / 100;
  const retirementTaxRate = ((values.retirementTaxRate as number) ?? 18) / 100;

  // ─── Validate ─────────────────────────────────────────────────
  const yearsToRetire = retirementAge - currentAge;
  if (yearsToRetire <= 0 || annualSalary <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ─── Helper: format currency ──────────────────────────────────
  const fmtCurr = (val: number): string => {
    if (Math.abs(val) >= 1_000_000) {
      return `${sym}${(val / 1_000_000).toFixed(2)}M`;
    }
    return `${sym}${val.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  };

  // ─── IRS limits by age ────────────────────────────────────────
  const getIRSLimit = (age: number): number => {
    if (age >= 60 && age <= 63) return 34750; // Super catch-up (SECURE 2.0)
    if (age >= 50) return 31000;               // Standard catch-up
    return 23500;                               // Under 50
  };

  // ─── Vesting calculation ──────────────────────────────────────
  const getVestedPercent = (companyYears: number): number => {
    if (vestingYears === 0) return 1; // Immediate vesting
    if (companyYears >= vestingYears) return 1;
    return Math.min(companyYears / vestingYears, 1);
  };

  // ─── Year-by-year simulation ──────────────────────────────────
  let balance = currentBalance;
  let totalContributions = 0;
  let totalMatchVested = 0;
  let totalGrowth = 0;
  let totalFeesLifetime = 0;
  let totalMoneyLeftOnTable = 0;
  let totalCatchUpBonus = 0;
  let lastSalary = annualSalary;

  const chartData: Array<Record<string, unknown>> = [];
  const tableData: Array<Record<string, unknown>> = [];
  let cumulativeContrib = 0;
  let cumulativeMatch = 0;

  // Initial chart point
  chartData.push({
    age: String(currentAge),
    contributions: currentBalance > 0 ? currentBalance : 0,
    employerMatch: 0,
    growth: 0,
  });

  const netReturn = expectedReturn - annualFees;

  for (let year = 1; year <= yearsToRetire; year++) {
    const age = currentAge + year;
    const companyYrs = yearsAtCompany + year;
    const salary = annualSalary * Math.pow(1 + salaryIncrease, year - 1);
    lastSalary = salary;

    // Employee contribution (capped at IRS limit)
    const irsLimit = getIRSLimit(age);
    const baseLimit = 23500;
    const catchUpAmount = irsLimit - baseLimit;
    let employeeContrib = salary * contributionPercent;
    if (employeeContrib > irsLimit) employeeContrib = irsLimit;

    // Track catch-up bonus (extra beyond base limit)
    if (age >= 50 && employeeContrib > baseLimit) {
      totalCatchUpBonus += Math.min(employeeContrib - baseLimit, catchUpAmount);
    }

    // Employer match (% of your contribution, capped at salary limit %)
    const matchableContrib = Math.min(employeeContrib, salary * employerMatchLimit);
    const matchAmount = matchableContrib * employerMatchRate;

    // Vesting
    const vestedPct = getVestedPercent(companyYrs);
    const vestedMatch = matchAmount * vestedPct;

    // Money left on table: max possible match vs actual
    const maxPossibleContrib = Math.min(salary * employerMatchLimit, irsLimit);
    const maxPossibleMatch = maxPossibleContrib * employerMatchRate;
    const leftOnTable = maxPossibleMatch - matchAmount;
    if (leftOnTable > 0) totalMoneyLeftOnTable += leftOnTable;

    // Add contributions to balance
    totalContributions += employeeContrib;
    totalMatchVested += vestedMatch;
    cumulativeContrib += employeeContrib;
    cumulativeMatch += vestedMatch;

    // Monthly compounding: (balance + contributions) × growth
    const startBalance = balance;
    balance += employeeContrib + vestedMatch;

    // Apply net return (monthly compounding)
    const monthlyRate = netReturn / 12;
    for (let m = 0; m < 12; m++) {
      balance *= (1 + monthlyRate);
    }

    const yearGrowth = balance - startBalance - employeeContrib - vestedMatch;
    totalGrowth += yearGrowth;

    // Track fees
    const feesThisYear = (startBalance + employeeContrib + vestedMatch) * annualFees;
    totalFeesLifetime += feesThisYear;

    // Cumulative growth for chart
    const cumulativeGrowthVal = balance - cumulativeContrib - cumulativeMatch - currentBalance;

    chartData.push({
      age: String(age),
      contributions: Math.round(cumulativeContrib + currentBalance),
      employerMatch: Math.round(cumulativeMatch),
      growth: Math.round(cumulativeGrowthVal > 0 ? cumulativeGrowthVal : 0),
    });

    tableData.push({
      year: String(year),
      age: String(age),
      salary: fmtCurr(salary),
      yourContrib: fmtCurr(employeeContrib),
      matchContrib: fmtCurr(vestedMatch),
      yearGrowth: fmtCurr(yearGrowth),
      balance: fmtCurr(balance),
    });
  }

  // ─── Inflation adjustment ─────────────────────────────────────
  const inflationFactor = includeInflation ? Math.pow(1 + inflationRate, yearsToRetire) : 1;
  const realBalance = balance / inflationFactor;

  // ─── Retirement income (4% rule) ──────────────────────────────
  const annualIncome = realBalance * 0.04;
  const monthlyIncome = annualIncome / 12;
  const dailyBudget = monthlyIncome / 30;

  // ─── Effective return after fees ──────────────────────────────
  const effectiveReturn = expectedReturn - annualFees;

  // ─── How many years funds will last ───────────────────────────
  const realReturn = effectiveReturn - (includeInflation ? inflationRate * 100 : 0) / 100;
  const withdrawalRate = 0.04;
  let yearsWillLast: number;
  if (realReturn <= 0) {
    yearsWillLast = 1 / withdrawalRate; // 25 years at 4%
  } else {
    // PV annuity formula: n = -ln(1 - PV×r/PMT) / ln(1+r)
    const rReal = (effectiveReturn - (includeInflation ? inflationRate : 0));
    if (rReal <= 0) {
      yearsWillLast = 25;
    } else {
      const ratio = (realBalance * rReal) / annualIncome;
      if (ratio >= 1) {
        yearsWillLast = 99; // Essentially perpetual
      } else {
        yearsWillLast = Math.min(-Math.log(1 - ratio) / Math.log(1 + rReal), 99);
      }
    }
  }

  // ─── Salary multiplier ────────────────────────────────────────
  const yearsOfSalary = lastSalary > 0 ? realBalance / lastSalary : 0;

  // ─── Replacement rate ─────────────────────────────────────────
  const replacementRate = lastSalary > 0 ? (annualIncome / lastSalary) * 100 : 0;

  // ─── Match ROI ────────────────────────────────────────────────
  const matchROI = totalContributions > 0 ? (totalMatchVested / totalContributions) * 100 : 0;

  // ─── Optimal contribution ─────────────────────────────────────
  const optimalContribPct = employerMatchLimit * 100;

  // ─── Current vesting ──────────────────────────────────────────
  const currentVesting = getVestedPercent(yearsAtCompany) * 100;
  const retirementVesting = getVestedPercent(yearsAtCompany + yearsToRetire) * 100;

  // ─── Roth vs Traditional comparison ───────────────────────────
  let comparisonText = "";
  if (accountType === "compare") {
    // Traditional: pre-tax in, taxed at withdrawal
    const tradAfterTax = realBalance * (1 - retirementTaxRate);

    // Roth: after-tax contributions, but all growth is tax-free
    // Employer match portion is always Traditional (pre-tax)
    const rothEmployeeBalance = (realBalance - totalMatchVested) * 1; // tax-free
    const matchPortionAfterTax = totalMatchVested * (1 - retirementTaxRate);
    const rothAfterTax = rothEmployeeBalance + matchPortionAfterTax;

    // Simplified comparison (same contribution amounts)
    // Traditional: you contribute $X pre-tax, withdraw at retirementTaxRate
    // Roth: you contribute $X after-tax (costs more now), withdraw tax-free
    const tradNet = realBalance * (1 - retirementTaxRate);
    const rothNet = realBalance * (1 - currentTaxRate / (1)); // Simplified
    // More accurate: Roth effective = balance × (1 - currentTaxRate at contribution time is already paid)
    // The balance IS the after-tax amount for Roth employee + pre-tax for match
    const diff = Math.abs(tradNet - rothAfterTax);

    if (tradNet > rothAfterTax + 1000) {
      comparisonText = `${v["traditionalWins"] || "Traditional wins by"} ${fmtCurr(diff)}`;
    } else if (rothAfterTax > tradNet + 1000) {
      comparisonText = `${v["rothWins"] || "Roth wins by"} ${fmtCurr(diff)}`;
    } else {
      comparisonText = v["tie"] || "Both options are roughly equal";
    }
  }

  // ─── Format money left on table ───────────────────────────────
  const moneyLeftText = totalMoneyLeftOnTable > 0
    ? fmtCurr(totalMoneyLeftOnTable)
    : (v["noMatch"] || "You're not leaving money on the table!");

  // ─── Format catch-up bonus ────────────────────────────────────
  const catchUpText = totalCatchUpBonus > 0
    ? fmtCurr(totalCatchUpBonus)
    : (v["noCatchUp"] || "Available after age 50");

  // ─── Build formatted values ───────────────────────────────────
  const displayBalance = includeInflation ? realBalance : balance;

  const formatted: Record<string, string> = {
    balanceAtRetirement: fmtCurr(displayBalance),
    totalContributions: fmtCurr(totalContributions),
    totalEmployerMatch: fmtCurr(totalMatchVested),
    totalGrowth: fmtCurr(totalGrowth),
    monthlyRetirementIncome: `${fmtCurr(monthlyIncome)}${v["perMonth"] || "/mo"}`,
    effectiveReturnRate: `${effectiveReturn.toFixed(1)}%`,
    moneyLeftOnTable: moneyLeftText,
    catchUpBonus: catchUpText,
    // InfoCard values (UNIQUE — zero overlap with 8 result IDs above)
    yearsOfSalary: `${yearsOfSalary.toFixed(1)}${v["x"] || "×"} final salary`,
    dailyBudget: `${fmtCurr(dailyBudget)}${v["perDay"] || "/day"}`,
    yearsWillLast: yearsWillLast >= 99 ? "99+ years" : `~${Math.round(yearsWillLast)} ${v["years"] || "years"}`,
    replacementRate: `${replacementRate.toFixed(0)}% ${v["of"] || "of"} final salary`,
    matchROI: `${matchROI.toFixed(0)}% return on contributions`,
    totalFeesPaid: fmtCurr(totalFeesLifetime),
    optimalContrib: `${optimalContribPct.toFixed(0)}% ${v["of"] || "of"} salary`,
    vestedPercent: `${currentVesting.toFixed(0)}% now → ${retirementVesting.toFixed(0)}% at retirement`,
  };

  // ─── Build values (numbers for engine) ────────────────────────
  const resultValues: Record<string, unknown> = {
    balanceAtRetirement: displayBalance,
    totalContributions: totalContributions,
    totalEmployerMatch: totalMatchVested,
    totalGrowth: totalGrowth,
    monthlyRetirementIncome: monthlyIncome,
    effectiveReturnRate: effectiveReturn,
    moneyLeftOnTable: totalMoneyLeftOnTable,
    catchUpBonus: totalCatchUpBonus,
    // InfoCard numeric values
    yearsOfSalary: yearsOfSalary,
    dailyBudget: dailyBudget,
    yearsWillLast: yearsWillLast,
    replacementRate: replacementRate,
    matchROI: matchROI,
    totalFeesPaid: totalFeesLifetime,
    optimalContrib: optimalContribPct,
    vestedPercent: currentVesting,
  };

  // ─── Summary ──────────────────────────────────────────────────
  const summaryTemplate = f.summary || "Your 401(k) is projected to reach {balanceAtRetirement} by age {retirementAge}, providing approximately {monthlyRetirementIncome} per month in retirement income.";
  const summary = summaryTemplate
    .replace("{balanceAtRetirement}", fmtCurr(displayBalance))
    .replace("{retirementAge}", String(retirementAge))
    .replace("{monthlyRetirementIncome}", fmtCurr(monthlyIncome));

  // ─── Return ───────────────────────────────────────────────────
  return {
    values: resultValues,
    formatted: formatted,
    summary: summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
      comparisonText,
    },
  };
}

export default fourOhOneKCalculatorConfig;
