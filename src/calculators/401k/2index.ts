import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ═══════════════════════════════════════════════════════════════════
// 🏦 401(k) CALCULATOR — Retirement Growth, Employer Match & Roth vs Traditional
// ═══════════════════════════════════════════════════════════════════

export const fourOhOneKCalculatorConfig: CalculatorConfigV4 = {
  id: "401k",
  version: "4.0",
  category: "finance",
  icon: "🏦",

  // ─── PRESETS ────────────────────────────────────────────────────
  presets: [
    {
      id: "youngPro",
      icon: "🎓",
      values: {
        currentAge: 25,
        retirementAge: 67,
        annualSalary: 55000,
        salaryIncrease: 3,
        currentBalance: 2000,
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
        currentTaxRate: 22,
        retirementTaxRate: 15,
      },
    },
    {
      id: "midCareer",
      icon: "💼",
      values: {
        currentAge: 40,
        retirementAge: 67,
        annualSalary: 95000,
        salaryIncrease: 2.5,
        currentBalance: 120000,
        contributionPercent: 10,
        employerMatch: 100,
        employerMatchLimit: 4,
        vestingYears: 0,
        yearsAtCompany: 8,
        expectedReturn: 7,
        annualFees: 0.4,
        includeInflation: true,
        inflationRate: 3,
        accountType: "traditional",
        currentTaxRate: 24,
        retirementTaxRate: 15,
      },
    },
    {
      id: "familyProvider",
      icon: "👨‍👩‍👧",
      values: {
        currentAge: 35,
        retirementAge: 65,
        annualSalary: 85000,
        salaryIncrease: 3,
        currentBalance: 45000,
        contributionPercent: 8,
        employerMatch: 50,
        employerMatchLimit: 6,
        vestingYears: 3,
        yearsAtCompany: 5,
        expectedReturn: 7,
        annualFees: 0.5,
        includeInflation: true,
        inflationRate: 3,
        accountType: "compare",
        currentTaxRate: 22,
        retirementTaxRate: 12,
      },
    },
    {
      id: "maxContributor",
      icon: "🏆",
      values: {
        currentAge: 45,
        retirementAge: 67,
        annualSalary: 150000,
        salaryIncrease: 2,
        currentBalance: 350000,
        contributionPercent: 15,
        employerMatch: 100,
        employerMatchLimit: 6,
        vestingYears: 0,
        yearsAtCompany: 15,
        expectedReturn: 7,
        annualFees: 0.3,
        includeInflation: true,
        inflationRate: 3,
        accountType: "traditional",
        currentTaxRate: 32,
        retirementTaxRate: 22,
      },
    },
    {
      id: "catchUpSprint",
      icon: "🔥",
      values: {
        currentAge: 55,
        retirementAge: 67,
        annualSalary: 110000,
        salaryIncrease: 2,
        currentBalance: 280000,
        contributionPercent: 20,
        employerMatch: 50,
        employerMatchLimit: 6,
        vestingYears: 0,
        yearsAtCompany: 20,
        expectedReturn: 6,
        annualFees: 0.4,
        includeInflation: true,
        inflationRate: 3,
        accountType: "traditional",
        currentTaxRate: 24,
        retirementTaxRate: 15,
      },
    },
  ],

  // ─── TRANSLATIONS (EN only — script translates) ──────────────
  t: {
    en: {
      name: "401(k) Calculator",
      slug: "401k-calculator",
      breadcrumb: "401(k) Calculator",

      seo: {
        title: "Free 401(k) Calculator — Retirement Growth, Employer Match & Roth vs Traditional (2025)",
        description: "Estimate your 401(k) balance at retirement with employer match, catch-up contributions, vesting, fee impact, and Roth vs Traditional comparison. 2025 IRS limits included.",
        keywords: [
          "401k calculator",
          "401k retirement calculator",
          "401k contribution calculator",
          "employer match calculator",
          "roth vs traditional 401k",
          "free 401k growth calculator",
          "401k savings estimator",
          "catch-up contribution calculator",
        ],
        subtitle: "Estimate your 401(k) at retirement with employer match, catch-up contributions, and Roth vs Traditional comparison.",
      },

      hero: {
        badge: "RETIREMENT",
        title: "401(k) Calculator",
        highlight: "Calculator",
        subtitle: "Project your 401(k) balance at retirement. See how employer match, contribution rate, catch-up contributions, and compound growth build your nest egg.",
      },

      sidebar: {
        title: "About This Calculator",
        content: "This calculator projects your 401(k) growth using 2025 IRS contribution limits, including the SECURE 2.0 Act super catch-up for ages 60-63. Model employer match, vesting schedules, fees, and compare Traditional vs Roth 401(k) options.",
        features: [
          "2025 IRS limits with catch-up & super catch-up",
          "Employer match with vesting schedule",
          "Roth vs Traditional side-by-side comparison",
          "Fee impact over your career",
          "'Money left on table' employer match alert",
        ],
      },

      form: { title: "Your Information" },

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
        salaryIncrease: {
          label: "Annual Salary Increase",
          helpText: "Expected average annual salary raise percentage",
        },
        currentBalance: {
          label: "Current 401(k) Balance",
          helpText: "How much you already have saved in your 401(k)",
        },
        contributionPercent: {
          label: "Your Contribution",
          helpText: "Percentage of salary you contribute each year (IRS max enforced automatically)",
        },
        employerMatch: {
          label: "Employer Match",
          helpText: "Percentage your employer matches on your contributions (e.g. 50% = $0.50 per $1.00)",
        },
        employerMatchLimit: {
          label: "Employer Match Limit",
          helpText: "Maximum percentage of your salary the employer will match (e.g. 6% means they match up to 6% of salary)",
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
          helpText: "Expected average annual investment return (S&P 500 historical avg ~10%, conservative ~6-7%)",
        },
        annualFees: {
          label: "Annual Plan Fees",
          helpText: "Total annual fees charged by your 401(k) plan (typical 0.3% - 1.5%)",
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
          helpText: "Traditional (pre-tax) or Roth (after-tax) or compare both side-by-side",
          options: {
            traditional: "Traditional 401(k)",
            roth: "Roth 401(k)",
            compare: "Compare Both",
          },
        },
        currentTaxRate: {
          label: "Current Tax Rate",
          helpText: "Your current marginal federal tax rate (for Roth vs Traditional comparison)",
        },
        retirementTaxRate: {
          label: "Retirement Tax Rate",
          helpText: "Expected marginal tax rate in retirement (usually lower than current)",
        },
      },

      results: {
        balanceAtRetirement: { label: "Balance at Retirement" },
        totalContributions: { label: "Your Total Contributions" },
        totalEmployerMatch: { label: "Total Employer Match" },
        totalGrowth: { label: "Investment Growth" },
        monthlyRetirementIncome: { label: "Monthly Retirement Income (4% Rule)" },
        effectiveReturnRate: { label: "Effective Return (After Fees)" },
        moneyLeftOnTable: { label: "Free Money Left on Table" },
        catchUpBonus: { label: "Catch-Up Contribution Bonus" },
        inflationAdjusted: { label: "Inflation-Adjusted Balance" },
        traditionalAfterTax: { label: "Traditional After-Tax Value" },
        rothAfterTax: { label: "Roth After-Tax Value" },
        recommendation: { label: "Recommendation" },
      },

      presets: {
        youngPro: { label: "Young Professional", description: "Age 25, $55K, 6% contrib, 50% match" },
        midCareer: { label: "Mid-Career Boost", description: "Age 40, $95K, 10% contrib, 100% match" },
        familyProvider: { label: "Family Provider", description: "Age 35, $85K, 8% contrib, Compare mode" },
        maxContributor: { label: "Max Contributor", description: "Age 45, $150K, 15% contrib, 100% match" },
        catchUpSprint: { label: "Catch-Up Sprint", description: "Age 55, $110K, 20% contrib, catch-up enabled" },
      },

      values: {
        "years": "years",
        "year": "year",
        "perMonth": "/mo",
        "perYear": "/yr",
        "age": "age",
        "winsBy": "wins by",
        "traditional": "Traditional",
        "roth": "Roth",
        "freeMoneyAlert": "in free employer money not claimed!",
        "fullMatch": "You're maximizing your employer match!",
        "noCatchUp": "N/A (under 50)",
        "immediateVesting": "Immediate",
      },

      formats: {
        summary: "Your 401(k) is projected to reach {balance} by age {retirementAge}, providing approximately {monthlyIncome} per month in retirement income.",
      },

      infoCards: {
        metrics: {
          title: "Retirement Readiness",
          items: [
            { label: "Years of Salary Saved", valueKey: "yearsOfSalary" },
            { label: "Daily Spending Budget", valueKey: "dailyBudget" },
            { label: "Years Savings Will Last", valueKey: "yearsWillLast" },
            { label: "Income Replacement Rate", valueKey: "replacementRate" },
          ],
        },
        details: {
          title: "Employer Match Optimizer",
          items: [
            { label: "Employer Match ROI", valueKey: "matchROI" },
            { label: "Total Fees Paid (Career)", valueKey: "totalFeesPaid" },
            { label: "Optimal Contribution %", valueKey: "optimalContrib" },
            { label: "Vested Amount", valueKey: "vestedPercent" },
          ],
        },
        tips: {
          title: "Maximize Your 401(k)",
          layout: "horizontal" as const,
          items: [
            { label: "Always contribute at least enough to get the full employer match — it's literally free money with an instant 50-100% return" },
            { label: "After age 50, take advantage of catch-up contributions — an extra $7,500/year in 2025" },
            { label: "Ages 60-63 get a 'super catch-up' of $11,250 extra per year under SECURE 2.0 Act" },
            { label: "Even a 1% increase in your contribution rate can add $50,000+ to your retirement balance over a career" },
          ],
        },
      },

      chart: {
        title: "401(k) Growth Projection",
        xLabel: "Age",
        yLabel: "Balance",
        series: {
          contributions: "Your Contributions",
          employerMatch: "Employer Match",
          growth: "Investment Growth",
        },
      },

      detailedTable: {
        title: "View Year-by-Year Breakdown",
        columns: {
          year: "Year",
          age: "Age",
          salary: "Salary",
          yourContrib: "Your Contrib",
          employerMatch: "Employer Match",
          growth: "Growth",
          balance: "Balance",
        },
      },

      educationSections: [
        {
          type: "list",
          title: "What Is a 401(k)?",
          items: [
            "A tax-advantaged retirement savings plan offered by employers, named after Section 401(k) of the Internal Revenue Code",
            "Contributions are deducted from your paycheck before taxes (Traditional) or after taxes (Roth), reducing your current taxable income or providing tax-free withdrawals",
            "Employers often match a portion of your contributions — typically 50-100% of the first 3-6% of salary — this is essentially free money",
            "Funds grow tax-deferred (Traditional) or tax-free (Roth) until withdrawn in retirement, starting at age 59½",
            "The 2025 IRS contribution limit is $23,500 (under 50), with catch-up of $7,500 (50+) or $11,250 (60-63 super catch-up)",
          ],
        },
        {
          type: "list",
          title: "Traditional vs Roth 401(k)",
          items: [
            "Traditional: Contributions reduce taxable income NOW; you pay taxes LATER when you withdraw in retirement",
            "Roth: You pay taxes NOW on contributions; withdrawals in retirement are completely TAX-FREE",
            "Traditional wins if your tax rate will be LOWER in retirement than it is today",
            "Roth wins if your tax rate will be HIGHER in retirement or if tax rates increase overall",
            "Traditional 401(k) requires minimum distributions (RMDs) at age 73; Roth 401(k) also has RMDs but can be rolled to Roth IRA to avoid them",
          ],
        },
        {
          type: "code-example",
          title: "401(k) Calculation Examples",
          examples: [
            {
              title: "Example: Employer Match Value",
              code: "Salary: $80,000\nYour contribution: 6% = $4,800/year\nEmployer match: 50% of first 6%\nEmployer contributes: 50% × $4,800 = $2,400/year\n\nTotal going into your 401(k): $7,200/year\nThat's $2,400 in FREE money = instant 50% return!",
            },
            {
              title: "Example: Catch-Up Impact (Age 55-67)",
              code: "Standard limit: $23,500/year\nCatch-up (50+): +$7,500 = $31,000/year\nSuper catch-up (60-63): +$11,250 = $34,750/year\n\nExtra over 12 years at 7% return:\nCatch-up bonus: ~$142,000 additional\nSuper catch-up years (4 yrs): ~$51,000 more\nTotal catch-up advantage: ~$193,000",
            },
          ],
        },
        {
          type: "prose",
          title: "Understanding Employer Match & Vesting",
          content: "The employer match is one of the most powerful features of a 401(k) plan. When your employer offers a match, they contribute additional money to your account based on how much you contribute. A common formula is '50% match up to 6% of salary' — meaning if you earn $80,000 and contribute 6% ($4,800), your employer adds $2,400. Not contributing enough to get the full match is essentially leaving free money on the table.\n\nHowever, employer contributions are often subject to a vesting schedule. Vesting determines how much of the employer match you actually own. With 4-year graded vesting, you own 25% after year 1, 50% after year 2, 75% after year 3, and 100% after year 4. If you leave your job before being fully vested, you forfeit the unvested portion. Some employers offer immediate vesting (you own 100% right away), while others use cliff vesting where you own 0% until a specific date, then 100%. Understanding your vesting schedule is crucial before changing jobs.",
        },
        {
          type: "prose",
          title: "2025 Contribution Limits & SECURE 2.0 Changes",
          content: "The IRS adjusts 401(k) contribution limits annually for inflation. For 2025, the employee contribution limit is $23,500 for those under 50. Workers aged 50 and older can make an additional $7,500 in catch-up contributions, bringing their total to $31,000. The SECURE 2.0 Act introduced a game-changing 'super catch-up' for workers aged 60-63, allowing an additional $11,250 (instead of $7,500), for a maximum of $34,750.\n\nThe combined employer plus employee contribution limit for 2025 is $70,000 (under 50) or $77,500 (50+). Starting in 2026, workers earning over $150,000 must make catch-up contributions as Roth (after-tax) contributions. This is a significant change that affects high earners — plan accordingly. These limits make the 401(k) one of the most powerful tax-advantaged retirement tools available, with far higher limits than IRAs ($7,000/$8,000 in 2025).",
        },
      ],

      faqs: [
        { question: "How much should I contribute to my 401(k)?", answer: "Financial experts recommend contributing at least enough to get your full employer match — this is essentially free money. Beyond that, aim for 10-15% of your gross salary. The IRS allows up to $23,500 in 2025 ($31,000 if 50+, $34,750 if 60-63). If you can't hit 15%, start where you can and increase by 1% each year." },
        { question: "What happens to my 401(k) if I change jobs?", answer: "You have several options: leave it with your former employer, roll it over to your new employer's 401(k), roll it into an IRA, or cash it out (not recommended due to taxes and penalties). Rollovers are tax-free when done properly. Your own contributions are always yours, but employer matches are subject to your vesting schedule." },
        { question: "Can I withdraw from my 401(k) before age 59½?", answer: "Early withdrawals generally incur a 10% penalty plus income taxes. Exceptions include: the Rule of 55 (leaving your job at 55+), disability, substantially equal periodic payments (SEPP/72t), unreimbursed medical expenses exceeding 7.5% of AGI, qualified domestic relations orders (divorce), and certain hardship withdrawals." },
        { question: "What is the difference between Traditional and Roth 401(k)?", answer: "Traditional 401(k) contributions are pre-tax (reducing your taxable income now) but withdrawals are taxed in retirement. Roth 401(k) contributions are after-tax (no tax break now) but qualified withdrawals are completely tax-free. Traditional wins if you'll be in a lower tax bracket in retirement; Roth wins if you expect higher rates later." },
        { question: "What is the employer match and how does it work?", answer: "An employer match means your company contributes extra money to your 401(k) based on your contributions. Common formulas include: 100% match up to 3% of salary, 50% match up to 6%, or dollar-for-dollar up to a cap. For example, with a 50% match on 6%: if you earn $80,000 and contribute 6% ($4,800), your employer adds $2,400. Always contribute enough to get the full match." },
        { question: "What are the 2025 401(k) contribution limits?", answer: "For 2025: Under 50: $23,500 employee limit. Age 50-59 or 64+: $31,000 ($23,500 + $7,500 catch-up). Age 60-63: $34,750 ($23,500 + $11,250 super catch-up via SECURE 2.0 Act). Combined employee + employer limit: $70,000 (under 50) or $77,500 (50+). Starting 2026, the employee limit rises to $24,500." },
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

  // ─── INPUTS ────────────────────────────────────────────────────
  inputs: [
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
    {
      id: "salaryIncrease",
      type: "slider",
      defaultValue: 3,
      min: 0,
      max: 15,
      step: 0.5,
      suffix: "%",
    },
    {
      id: "currentBalance",
      type: "number",
      defaultValue: 0,
      placeholder: "25000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    {
      id: "contributionPercent",
      type: "slider",
      defaultValue: 6,
      min: 0,
      max: 50,
      step: 1,
      suffix: "%",
    },
    {
      id: "employerMatch",
      type: "slider",
      defaultValue: 50,
      min: 0,
      max: 100,
      step: 5,
      suffix: "%",
    },
    {
      id: "employerMatchLimit",
      type: "slider",
      defaultValue: 6,
      min: 0,
      max: 15,
      step: 0.5,
      suffix: "%",
    },
    {
      id: "vestingYears",
      type: "stepper",
      defaultValue: 0,
      min: 0,
      max: 6,
      step: 1,
    },
    {
      id: "yearsAtCompany",
      type: "stepper",
      defaultValue: 3,
      min: 0,
      max: 40,
      step: 1,
    },
    {
      id: "expectedReturn",
      type: "slider",
      defaultValue: 7,
      min: 0,
      max: 15,
      step: 0.5,
      suffix: "%",
    },
    {
      id: "annualFees",
      type: "slider",
      defaultValue: 0.5,
      min: 0,
      max: 3,
      step: 0.1,
      suffix: "%",
    },
    {
      id: "includeInflation",
      type: "toggle",
      defaultValue: true,
    },
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
    {
      id: "currentTaxRate",
      type: "slider",
      defaultValue: 22,
      min: 0,
      max: 50,
      step: 1,
      suffix: "%",
      showWhen: { field: "accountType", value: "compare" },
    },
    {
      id: "retirementTaxRate",
      type: "slider",
      defaultValue: 15,
      min: 0,
      max: 50,
      step: 1,
      suffix: "%",
      showWhen: { field: "accountType", value: "compare" },
    },
  ],

  inputGroups: [],

  // ─── RESULTS ───────────────────────────────────────────────────
  results: [
    { id: "balanceAtRetirement", primary: true },
    { id: "totalContributions" },
    { id: "totalEmployerMatch" },
    { id: "totalGrowth" },
    { id: "monthlyRetirementIncome" },
    { id: "effectiveReturnRate" },
    { id: "moneyLeftOnTable" },
    { id: "catchUpBonus" },
    { id: "inflationAdjusted" },
    { id: "traditionalAfterTax" },
    { id: "rothAfterTax" },
    { id: "recommendation" },
  ],

  // ─── CHART ─────────────────────────────────────────────────────
  chart: {
    type: "composed",
    xKey: "age",
    series: [
      { key: "contributions", type: "area", color: "#2563eb", stackId: "a" },
      { key: "employerMatch", type: "area", color: "#10b981", stackId: "a" },
      { key: "growth", type: "area", color: "#8b5cf6", stackId: "a" },
    ],
  },

  // ─── DETAILED TABLE ────────────────────────────────────────────
  detailedTable: {
    columns: [
      { key: "year", label: "Year" },
      { key: "age", label: "Age" },
      { key: "salary", label: "Salary" },
      { key: "yourContrib", label: "Your Contrib" },
      { key: "employerMatch", label: "Employer Match" },
      { key: "growth", label: "Growth" },
      { key: "balance", label: "Balance" },
    ],
  },

  referenceData: [],

  // ─── EDUCATION ─────────────────────────────────────────────────
  educationSections: [0, 1, 2, 3, 4],

  // ─── FAQs ──────────────────────────────────────────────────────
  faqs: [0, 1, 2, 3, 4, 5],

  // ─── REFERENCES ────────────────────────────────────────────────
  references: [
    {
      title: "IRS — Retirement Topics: 401(k) and Profit-Sharing Plan Contribution Limits",
      url: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits",
    },
    {
      title: "U.S. Congress — SECURE 2.0 Act of 2022 (Enhanced Catch-Up Contributions)",
      url: "https://www.congress.gov/bill/117th-congress/house-bill/2617",
    },
  ],

  // ─── LAYOUT ────────────────────────────────────────────────────
  hero: { style: "default" },
  sidebar: { style: "default" },
  features: { showSave: true, showPdf: true, showExcel: true, showShare: true, showCopy: true },
  relatedCalculators: ["interest-calculator", "savings-calculator", "income-tax-calculator", "investment-calculator"],
  ads: { showSidebar: true, showBanner: true, showNative: true },
};

// ═══════════════════════════════════════════════════════════════════
// 🧮 CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════════

export function calculateFourOhOneK(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  unitSystem?: "metric" | "imperial";
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ─── Read inputs ─────────────────────────────────────────────
  const currentAge = (values.currentAge as number) ?? 30;
  const retirementAge = (values.retirementAge as number) ?? 67;
  const annualSalary = (values.annualSalary as number | null) ?? 0;
  const salaryIncrease = ((values.salaryIncrease as number | null) ?? 3) / 100;
  const currentBalance = (values.currentBalance as number | null) ?? 0;
  const contributionPercent = ((values.contributionPercent as number | null) ?? 6) / 100;
  const employerMatchPct = ((values.employerMatch as number | null) ?? 50) / 100;
  const employerMatchLimitPct = ((values.employerMatchLimit as number | null) ?? 6) / 100;
  const vestingYears = (values.vestingYears as number) ?? 0;
  const yearsAtCompany = (values.yearsAtCompany as number) ?? 3;
  const expectedReturn = ((values.expectedReturn as number | null) ?? 7) / 100;
  const annualFees = ((values.annualFees as number | null) ?? 0.5) / 100;
  const includeInflation = values.includeInflation === true;
  const inflationRate = includeInflation ? ((values.inflationRate as number | null) ?? 3) / 100 : 0;
  const accountType = (values.accountType as string) || "traditional";
  const currentTaxRate = ((values.currentTaxRate as number | null) ?? 22) / 100;
  const retirementTaxRate = ((values.retirementTaxRate as number | null) ?? 15) / 100;

  // ─── Validate ────────────────────────────────────────────────
  const yearsToRetirement = retirementAge - currentAge;
  if (yearsToRetirement <= 0 || annualSalary <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const netReturn = expectedReturn - annualFees;
  const monthlyRate = netReturn / 12;
  const currSym = sym(fieldUnits);

  // ─── 2025 IRS Contribution Limits ────────────────────────────
  function getMaxContribution(age: number): number {
    if (age >= 60 && age <= 63) return 34750;   // Super catch-up
    if (age >= 50) return 31000;                  // Regular catch-up
    return 23500;                                  // Standard
  }

  function getCatchUpAmount(age: number): number {
    if (age >= 60 && age <= 63) return 11250;
    if (age >= 50) return 7500;
    return 0;
  }

  // ─── Vesting function (graded) ───────────────────────────────
  function getVestingPercent(companyYears: number): number {
    if (vestingYears === 0) return 1.0;
    if (companyYears >= vestingYears) return 1.0;
    return Math.max(0, companyYears / vestingYears);
  }

  // ─── Year-by-year simulation ─────────────────────────────────
  let balance = currentBalance;
  let totalContribs = 0;
  let totalMatchVested = 0;
  let totalMatchRaw = 0;
  let totalGrowth = 0;
  let totalCatchUp = 0;
  let moneyLeftOnTableTotal = 0;
  let totalFeesPaidVal = 0;

  const chartData: Array<Record<string, unknown>> = [];
  const tableData: Array<Record<string, unknown>> = [];

  // Year 0 for chart
  chartData.push({
    age: `${currentAge}`,
    contributions: Math.round(currentBalance),
    employerMatch: 0,
    growth: 0,
  });

  for (let yr = 0; yr < yearsToRetirement; yr++) {
    const age = currentAge + yr;
    const companyYrs = yearsAtCompany + yr;
    const salary = annualSalary * Math.pow(1 + salaryIncrease, yr);

    // Employee contribution (capped at IRS limit)
    const maxContrib = getMaxContribution(age);
    const desiredContrib = salary * contributionPercent;
    const employeeContrib = Math.min(desiredContrib, maxContrib);

    // Catch-up tracking
    const catchUpThisYear = getCatchUpAmount(age);
    const standardLimit = 23500;
    const actualCatchUp = employeeContrib > standardLimit
      ? Math.min(employeeContrib - standardLimit, catchUpThisYear)
      : 0;
    totalCatchUp += actualCatchUp;

    // Employer match
    const matchableBase = salary * employerMatchLimitPct;
    const matchableContrib = Math.min(employeeContrib, matchableBase);
    const rawMatch = matchableContrib * employerMatchPct;

    // Vesting
    const vestPct = getVestingPercent(companyYrs);
    const vestedMatch = rawMatch * vestPct;

    // Money left on table: difference between max possible match and actual
    const maxPossibleMatch = matchableBase * employerMatchPct;
    const leftOnTable = maxPossibleMatch - rawMatch;
    moneyLeftOnTableTotal += leftOnTable > 0 ? leftOnTable : 0;

    totalMatchRaw += rawMatch;
    totalMatchVested += vestedMatch;
    totalContribs += employeeContrib;

    // Monthly growth simulation
    let yearGrowth = 0;
    const monthlyEmployeeContrib = employeeContrib / 12;
    const monthlyMatch = vestedMatch / 12;

    for (let m = 0; m < 12; m++) {
      balance += monthlyEmployeeContrib + monthlyMatch;
      const monthGrowthAmt = balance * monthlyRate;
      const monthFees = balance * (annualFees / 12);
      totalFeesPaidVal += monthFees;
      balance += monthGrowthAmt;
      yearGrowth += monthGrowthAmt;
    }
    totalGrowth += yearGrowth;

    // Track cumulative values for chart
    chartData.push({
      age: `${age + 1}`,
      contributions: Math.round(totalContribs + currentBalance),
      employerMatch: Math.round(totalMatchVested),
      growth: Math.round(totalGrowth),
    });

    tableData.push({
      year: `${yr + 1}`,
      age: `${age + 1}`,
      salary: fmtCurr(salary, currSym),
      yourContrib: fmtCurr(employeeContrib, currSym),
      employerMatch: fmtCurr(vestedMatch, currSym),
      growth: fmtCurr(yearGrowth, currSym),
      balance: fmtCurr(balance, currSym),
    });
  }

  // ─── Retirement income (4% rule) ─────────────────────────────
  const annualIncome4Pct = balance * 0.04;
  const monthlyIncome = annualIncome4Pct / 12;
  const dailyBudgetVal = monthlyIncome / 30;

  // Years savings will last (assuming 5% return, 4% withdrawal, 3% inflation)
  const realReturnInRetirement = 0.05 - inflationRate;
  let yearsWillLastVal = 0;
  if (realReturnInRetirement > 0 && annualIncome4Pct > 0) {
    // PV of annuity formula: n = -ln(1 - PV*r/PMT) / ln(1+r)
    const ratio = (balance * realReturnInRetirement) / annualIncome4Pct;
    if (ratio < 1) {
      yearsWillLastVal = -Math.log(1 - ratio) / Math.log(1 + realReturnInRetirement);
    } else {
      yearsWillLastVal = 99; // Effectively infinite
    }
  } else if (annualIncome4Pct > 0) {
    yearsWillLastVal = balance / annualIncome4Pct;
  }

  const replacementRateVal = annualSalary > 0
    ? (annualIncome4Pct / annualSalary) * 100
    : 0;

  // ─── Effective return ────────────────────────────────────────
  const effectiveReturnPct = (expectedReturn - annualFees) * 100;

  // ─── Inflation adjustment ────────────────────────────────────
  const inflationFactor = includeInflation
    ? Math.pow(1 + inflationRate, yearsToRetirement)
    : 1;
  const inflationAdjustedBal = balance / inflationFactor;

  // ─── Money left on table (compounded) ────────────────────────
  // Approximate: compound total left-on-table amount
  let moneyLeftCompounded = 0;
  if (moneyLeftOnTableTotal > 0) {
    const avgYearsToGrow = yearsToRetirement / 2;
    moneyLeftCompounded = moneyLeftOnTableTotal * Math.pow(1 + netReturn, avgYearsToGrow);
  }

  // ─── Roth vs Traditional comparison ──────────────────────────
  // Traditional: pre-tax in, taxed at withdrawal
  const traditionalAfterTaxVal = balance * (1 - retirementTaxRate);
  // Roth: after-tax in (less goes in), but grows tax-free
  // Simulate Roth: contributions are reduced by current tax rate
  let rothBalance = currentBalance;
  for (let yr = 0; yr < yearsToRetirement; yr++) {
    const age = currentAge + yr;
    const companyYrs = yearsAtCompany + yr;
    const salary = annualSalary * Math.pow(1 + salaryIncrease, yr);
    const maxContrib = getMaxContribution(age);
    const desiredContrib = salary * contributionPercent;
    const employeeContrib = Math.min(desiredContrib, maxContrib);

    // Roth: same dollar amount contributed, but from after-tax income
    // The "cost" is higher (you pay tax on it) but the balance grows tax-free
    // For comparison: we assume same dollar contribution into Roth
    const matchableBase = salary * employerMatchLimitPct;
    const matchableContrib = Math.min(employeeContrib, matchableBase);
    const rawMatch = matchableContrib * employerMatchPct;
    const vestPct = getVestingPercent(companyYrs);
    const vestedMatch = rawMatch * vestPct;
    // Employer match always goes into Traditional side even in Roth 401k
    // For simplicity, we include it as Traditional (taxed at withdrawal)

    const monthlyEC = employeeContrib / 12;
    const monthlyEM = vestedMatch / 12;
    for (let m = 0; m < 12; m++) {
      rothBalance += monthlyEC + monthlyEM;
      rothBalance += rothBalance * monthlyRate;
    }
  }
  // Roth: employee contributions are tax-free, employer match taxed at withdrawal
  const rothEmployeeGrowth = rothBalance - totalMatchVested;
  const rothAfterTaxVal = rothEmployeeGrowth + (totalMatchVested * (1 - retirementTaxRate));

  // Recommendation
  let recommendationStr = "—";
  if (accountType === "compare") {
    const diff = Math.abs(traditionalAfterTaxVal - rothAfterTaxVal);
    const tradLabel = v["traditional"] || "Traditional";
    const rothLabel = v["roth"] || "Roth";
    const winsLabel = v["winsBy"] || "wins by";
    if (traditionalAfterTaxVal > rothAfterTaxVal) {
      recommendationStr = `${tradLabel} ${winsLabel} ${fmtCurr(diff, currSym)}`;
    } else if (rothAfterTaxVal > traditionalAfterTaxVal) {
      recommendationStr = `${rothLabel} ${winsLabel} ${fmtCurr(diff, currSym)}`;
    } else {
      recommendationStr = "Both are approximately equal";
    }
  }

  // ─── Money left on table label ───────────────────────────────
  const isMaxingMatch = moneyLeftOnTableTotal <= 0;
  const moneyLeftLabel = isMaxingMatch
    ? (v["fullMatch"] || "You're maximizing your employer match!")
    : `${fmtCurr(moneyLeftCompounded, currSym)} ${v["freeMoneyAlert"] || "in free employer money not claimed!"}`;

  // ─── Catch-up label ──────────────────────────────────────────
  const catchUpLabel = totalCatchUp > 0
    ? `+${fmtCurr(totalCatchUp, currSym)}`
    : (v["noCatchUp"] || "N/A (under 50)");

  // ─── Vesting ─────────────────────────────────────────────────
  const finalVesting = getVestingPercent(yearsAtCompany + yearsToRetirement);
  const currentVesting = getVestingPercent(yearsAtCompany);
  const vestedLabel = vestingYears === 0
    ? (v["immediateVesting"] || "Immediate")
    : `${(currentVesting * 100).toFixed(0)}% now → ${(finalVesting * 100).toFixed(0)}% at retirement`;

  // ─── Optimal contribution % ──────────────────────────────────
  const optimalContribPct = employerMatchLimitPct * 100;

  // ─── InfoCard-only: Years of salary saved ────────────────────
  const finalSalary = annualSalary * Math.pow(1 + salaryIncrease, yearsToRetirement - 1);
  const yearsOfSalaryVal = finalSalary > 0 ? balance / finalSalary : 0;

  // ─── InfoCard-only: Match ROI ────────────────────────────────
  const matchROIVal = totalContribs > 0 ? (totalMatchVested / totalContribs) * 100 : 0;

  // ─── Summary ─────────────────────────────────────────────────
  const summary = (f.summary || "Your 401(k) is projected to reach {balance} by age {retirementAge}, providing approximately {monthlyIncome} per month in retirement income.")
    .replace("{balance}", fmtCurr(balance, currSym))
    .replace("{retirementAge}", String(retirementAge))
    .replace("{monthlyIncome}", fmtCurr(monthlyIncome, currSym));

  // ═══════════════════════════════════════════════════════════════
  // RETURN — results vs infoCards are COMPLETELY DIFFERENT
  // ═══════════════════════════════════════════════════════════════

  return {
    values: {
      // ── Results (shown in result cards) ──
      balanceAtRetirement: Math.round(balance),
      totalContributions: Math.round(totalContribs),
      totalEmployerMatch: Math.round(totalMatchVested),
      totalGrowth: Math.round(totalGrowth),
      monthlyRetirementIncome: Math.round(monthlyIncome),
      effectiveReturnRate: Math.round(effectiveReturnPct * 10) / 10,
      moneyLeftOnTable: Math.round(moneyLeftCompounded),
      catchUpBonus: Math.round(totalCatchUp),
      inflationAdjusted: Math.round(inflationAdjustedBal),
      traditionalAfterTax: Math.round(traditionalAfterTaxVal),
      rothAfterTax: Math.round(rothAfterTaxVal),

      // ── InfoCard-only values (NEVER in results) ──
      dailyBudget: Math.round(dailyBudgetVal * 100) / 100,
      yearsWillLast: Math.round(yearsWillLastVal * 10) / 10,
      replacementRate: Math.round(replacementRateVal * 10) / 10,
      optimalContrib: optimalContribPct,
      yearsOfSalary: Math.round(yearsOfSalaryVal * 10) / 10,
      matchROI: Math.round(matchROIVal * 10) / 10,
      totalFeesPaid: Math.round(totalFeesPaidVal),
    },
    formatted: {
      // ── Results ──
      balanceAtRetirement: fmtCurr(balance, currSym),
      totalContributions: fmtCurr(totalContribs, currSym),
      totalEmployerMatch: fmtCurr(totalMatchVested, currSym),
      totalGrowth: fmtCurr(totalGrowth, currSym),
      monthlyRetirementIncome: `${fmtCurr(monthlyIncome, currSym)}${v["perMonth"] || "/mo"}`,
      effectiveReturnRate: `${effectiveReturnPct.toFixed(1)}%`,
      moneyLeftOnTable: isMaxingMatch ? (v["fullMatch"] || "✅ Maximized!") : fmtCurr(moneyLeftCompounded, currSym),
      catchUpBonus: catchUpLabel,
      inflationAdjusted: includeInflation ? fmtCurr(inflationAdjustedBal, currSym) : "—",
      traditionalAfterTax: accountType === "compare" ? fmtCurr(traditionalAfterTaxVal, currSym) : "—",
      rothAfterTax: accountType === "compare" ? fmtCurr(rothAfterTaxVal, currSym) : "—",
      recommendation: accountType === "compare" ? recommendationStr : "—",

      // ── InfoCard-only formatted ──
      yearsOfSalary: `${yearsOfSalaryVal.toFixed(1)}x final salary`,
      dailyBudget: `${fmtCurr(dailyBudgetVal, currSym)}${v["perDay"] || "/day"}`,
      yearsWillLast: yearsWillLastVal >= 99 ? "99+ years" : `~${yearsWillLastVal.toFixed(0)} ${v["years"] || "years"}`,
      replacementRate: `${replacementRateVal.toFixed(1)}%`,
      matchROI: `+${matchROIVal.toFixed(1)}% on your contributions`,
      totalFeesPaid: fmtCurr(totalFeesPaidVal, currSym),
      optimalContrib: `${optimalContribPct.toFixed(1)}% of salary`,
      vestedPercent: vestedLabel,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

// ─── Helper: Currency symbol from fieldUnits ──────────────────
function sym(fieldUnits?: Record<string, string>): string {
  const curr = fieldUnits?.annualSalary || "USD";
  const S: Record<string, string> = {
    USD: "$", EUR: "€", GBP: "£", MXN: "MX$", BRL: "R$", JPY: "¥", INR: "₹",
    CAD: "C$", AUD: "A$", CHF: "CHF ", COP: "COL$", ARS: "AR$", PEN: "S/",
    CLP: "CLP ", CNY: "¥", KRW: "₩", PLN: "zł", TRY: "₺", ZAR: "R",
    SEK: "kr", NOK: "kr", DKK: "kr", HKD: "HK$", SGD: "S$", TWD: "NT$",
    THB: "฿", PHP: "₱", IDR: "Rp", MYR: "RM", VND: "₫", EGP: "E£",
    NGN: "₦", KES: "KSh",
  };
  return S[curr] || "$";
}

function fmtCurr(val: number, symbol: string): string {
  if (val === 0) return `${symbol}0`;
  const abs = Math.abs(val);
  const formatted = abs >= 1000000
    ? `${(abs / 1000000).toFixed(2)}M`
    : abs.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  return val < 0 ? `-${symbol}${formatted}` : `${symbol}${formatted}`;
}

export default fourOhOneKCalculatorConfig;
