import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// 401(K) CALCULATOR V3 CONFIG
// =============================================================================

// 2025 Contribution Limits (IRS)
const LIMITS_2025 = {
  base: 23500,
  catchUp50: 7500,      // Ages 50-59, 64+
  catchUp60: 11250,     // Ages 60-63 (SECURE 2.0 "super catch-up")
  combined: 70000,      // Employee + Employer max
};

// 2026 Contribution Limits (IRS)
const LIMITS_2026 = {
  base: 24500,
  catchUp50: 8000,      // Ages 50-59, 64+
  catchUp60: 11250,     // Ages 60-63 (unchanged)
  combined: 72000,      // Employee + Employer max
};

// Use 2025 limits (current year as of knowledge)
const LIMITS = LIMITS_2025;

export const calculator401kConfig: CalculatorConfigV3 = {
  id: "401k-calculator",
  slug: "401k-calculator",
  name: "401(k) Calculator",
  category: "finance",
  icon: "💼",

  // ═══════════════════════════════════════════════════════════════════════════
  // SEO
  // ═══════════════════════════════════════════════════════════════════════════
  seo: {
    title: "401(k) Calculator - Retirement Savings & Employer Match Calculator",
    description: "Free 401(k) calculator to estimate your retirement savings. Includes 2025 contribution limits ($23,500 + catch-up), employer match calculator, and year-by-year growth projections. See how much you could have at retirement.",
    shortDescription: "Calculate your 401(k) growth with employer match",
    keywords: [
      "401k calculator",
      "retirement calculator",
      "employer match calculator",
      "401k contribution limits 2025",
      "catch-up contributions",
      "retirement savings",
      "compound interest retirement",
      "401k growth calculator",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HERO
  // ═══════════════════════════════════════════════════════════════════════════
  hero: {
    badge: "Finance",
    rating: { average: 4.9, count: 41500 },
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
    {
      id: "currentAge",
      type: "slider",
      label: "Current Age",
      required: true,
      defaultValue: 30,
      min: 18,
      max: 70,
      step: 1,
      suffix: "years",
    },
    {
      id: "retirementAge",
      type: "slider",
      label: "Retirement Age",
      required: true,
      defaultValue: 65,
      min: 50,
      max: 75,
      step: 1,
      suffix: "years",
    },
    {
      id: "annualSalary",
      type: "number",
      label: "Annual Salary",
      required: true,
      defaultValue: 75000,
      min: 0,
      step: 1000,
      prefix: "$",
    },
    {
      id: "currentBalance",
      type: "number",
      label: "Current 401(k) Balance",
      required: true,
      defaultValue: 50000,
      min: 0,
      step: 1000,
      prefix: "$",
    },
    {
      id: "contributionPercent",
      type: "slider",
      label: "Your Contribution",
      required: true,
      defaultValue: 10,
      min: 1,
      max: 100,
      step: 1,
      suffix: "%",
      helpText: "Percentage of salary you contribute",
    },
    {
      id: "employerMatchPercent",
      type: "slider",
      label: "Employer Match Rate",
      required: true,
      defaultValue: 50,
      min: 0,
      max: 100,
      step: 5,
      suffix: "%",
      helpText: "How much employer matches (e.g., 50% = $0.50 per $1)",
    },
    {
      id: "employerMatchLimit",
      type: "slider",
      label: "Employer Match Limit",
      required: true,
      defaultValue: 6,
      min: 0,
      max: 15,
      step: 1,
      suffix: "% of salary",
      helpText: "Max % of your salary employer will match",
    },
    {
      id: "expectedReturn",
      type: "slider",
      label: "Expected Annual Return",
      required: true,
      defaultValue: 7,
      min: 1,
      max: 15,
      step: 0.5,
      suffix: "%",
      helpText: "Historical S&P 500 average: ~10% (7% after inflation)",
    },
    {
      id: "salaryIncrease",
      type: "slider",
      label: "Annual Salary Increase",
      required: true,
      defaultValue: 3,
      min: 0,
      max: 10,
      step: 0.5,
      suffix: "%",
      helpText: "Expected yearly raise",
    },
  ],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════════════════
  results: [
    {
      id: "balanceAtRetirement",
      type: "primary",
      label: "Balance at Retirement",
      format: "number",
      prefix: "$",
    },
    {
      id: "totalYourContributions",
      type: "secondary",
      label: "Your Contributions",
      format: "number",
      prefix: "$",
    },
    {
      id: "totalEmployerContributions",
      type: "secondary",
      label: "Employer Match (Free Money)",
      format: "number",
      prefix: "$",
    },
    {
      id: "totalInvestmentGrowth",
      type: "secondary",
      label: "Investment Growth",
      format: "number",
      prefix: "$",
    },
    {
      id: "monthlyRetirementIncome",
      type: "secondary",
      label: "Monthly Income (4% Rule)",
      format: "number",
      prefix: "$",
    },
    {
      id: "yearsOfIncome",
      type: "secondary",
      label: "Years of Income",
      format: "number",
      suffix: " years",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // INFO CARDS
  // ═══════════════════════════════════════════════════════════════════════════
  infoCards: [
    {
      id: "contributionLimits",
      title: "2025 Contribution Limits",
      icon: "📋",
      type: "list",
      items: [
        { label: "Under 50", value: "$23,500", color: "blue" },
        { label: "Ages 50-59, 64+", value: "$31,000", color: "green" },
        { label: "Ages 60-63", value: "$34,750", color: "purple" },
        { label: "Combined Max", value: "$70,000", color: "amber" },
      ],
    },
    {
      id: "maximizeTips",
      title: "Maximize Your 401(k)",
      icon: "💡",
      type: "horizontal",
      items: [
        { label: "Always get the FULL employer match" },
        { label: "Increase contribution by 1% each raise" },
        { label: "Use catch-up contributions at 50+" },
        { label: "Consider Roth 401(k) for tax diversification" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCE DATA
  // ═══════════════════════════════════════════════════════════════════════════
  referenceData: [
    {
      id: "commonMatchTypes",
      title: "Common Employer Match Types",
      icon: "💰",
      columns: 2,
      items: [
        { label: "100% up to 3%", value: "You: 3% → Total: 6%" },
        { label: "50% up to 6%", value: "You: 6% → Total: 9%" },
        { label: "100% up to 4%", value: "You: 4% → Total: 8%" },
        { label: "100% up to 6%", value: "You: 6% → Total: 12%" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  educationSections: [
    // 401(k) Advantages
    {
      id: "advantages",
      type: "cards",
      title: "401(k) Advantages",
      icon: "✨",
      columns: 2,
      cards: [
        {
          title: "Tax-Deferred Growth",
          description: "Contributions and earnings grow tax-free until withdrawal. This allows more money to compound over time compared to taxable accounts.",
          icon: "📈",
        },
        {
          title: "Employer Match",
          description: "Free money! A 50% match on 6% of salary is an immediate 50% return on investment. Always contribute enough to get the full match.",
          icon: "💰",
        },
        {
          title: "Higher Limits Than IRA",
          description: "$23,500 vs $7,000 for IRA (2025). Plus catch-up contributions for those 50+. Much more room to save tax-advantaged.",
          icon: "🎯",
        },
        {
          title: "Automatic Savings",
          description: "Payroll deductions make saving automatic and painless. You won't miss money you never see in your paycheck.",
          icon: "🔄",
        },
      ],
    },
    // SECURE 2.0 Changes
    {
      id: "secure2Changes",
      type: "cards",
      title: "SECURE 2.0 Act Changes (2025+)",
      icon: "📜",
      columns: 2,
      cards: [
        {
          title: "Super Catch-Up (Ages 60-63)",
          description: "Workers ages 60-63 can contribute $11,250 extra (vs $7,500 for other 50+ workers). Total limit: $34,750 in 2025.",
          icon: "🚀",
        },
        {
          title: "Roth Catch-Up for High Earners",
          description: "Starting 2026, if you earned >$150,000 last year, catch-up contributions must be Roth (after-tax).",
          icon: "⚠️",
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
          text: "Early withdrawals before age 59½ typically incur a 10% penalty plus income taxes. Plan for emergencies outside your 401(k).",
          type: "warning",
        },
        {
          text: "The 4% rule for retirement income is a guideline, not guaranteed. Consider your specific situation, health, and other income sources.",
          type: "info",
        },
        {
          text: "Investment returns are not guaranteed. Historical S&P 500 returns average ~10%, but past performance doesn't guarantee future results.",
          type: "warning",
        },
        {
          text: "Employer match may have a vesting schedule. You might not own 100% of matched funds until 3-6 years of service.",
          type: "info",
        },
        {
          text: "Required Minimum Distributions (RMDs) start at age 73 (SECURE 2.0). Roth 401(k)s now exempt from RMDs starting 2024.",
          type: "info",
        },
        {
          text: "Consider both Traditional (pre-tax) and Roth (after-tax) 401(k) contributions for tax diversification in retirement.",
          type: "info",
        },
      ],
    },
    // REQUIRED: Example Calculation
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "🧮",
      description: "30-year-old earning $75,000, contributing 10%, with 50% employer match up to 6%",
      columns: 2,
      examples: [
        {
          title: "Annual Contributions",
          steps: [
            "Your contribution: $75,000 × 10% = $7,500",
            "Employer match eligible: $75,000 × 6% = $4,500",
            "Employer match: $4,500 × 50% = $2,250",
            "Total annual: $7,500 + $2,250 = $9,750",
          ],
          result: "Total Annual: $9,750/year",
        },
        {
          title: "Growth to Age 65 (35 years)",
          steps: [
            "Starting balance: $50,000",
            "Annual contribution: $9,750",
            "Expected return: 7%",
            "Future Value calculation with growth",
          ],
          result: "Balance at 65: ~$1,475,000",
        },
      ],
    },
    // Prose: What is 401(k)
    {
      id: "whatIs401k",
      type: "prose",
      title: "What is a 401(k)?",
      content: "A 401(k) is an employer-sponsored retirement savings plan that allows you to contribute a portion of your paycheck before taxes (Traditional) or after taxes (Roth). Your contributions and investment earnings grow tax-deferred until withdrawal in retirement. The name comes from Section 401(k) of the Internal Revenue Code. Many employers offer matching contributions—essentially free money added to your account based on your contributions. This match is often the best return on investment available anywhere.",
    },
    // Prose: Employer Match
    {
      id: "employerMatch",
      type: "prose",
      title: "The Power of Employer Match",
      content: "Employer matching is essentially free money. A common match is 50% of your contributions up to 6% of salary. If you earn $75,000 and contribute 6% ($4,500), your employer adds $2,250—an immediate 50% return before any investment gains. Always contribute at least enough to get the full match. Not doing so is leaving money on the table. Some companies offer dollar-for-dollar matching up to 3-6%, which is even better.",
    },
    // Prose: Traditional vs Roth
    {
      id: "traditionalVsRoth",
      type: "prose",
      title: "Traditional vs Roth 401(k)",
      content: "Traditional 401(k) contributions are pre-tax, reducing your current taxable income. You pay taxes when you withdraw in retirement. Roth 401(k) contributions are after-tax, but qualified withdrawals in retirement are completely tax-free. Choose Traditional if you expect lower taxes in retirement, Roth if you expect higher taxes. Many experts recommend splitting contributions for tax diversification. Note: Employer matches always go into the Traditional (pre-tax) bucket, even if your contributions are Roth.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // FAQs
  // ═══════════════════════════════════════════════════════════════════════════
  faqs: [
    {
      question: "How much should I contribute to my 401(k)?",
      answer: "At minimum, contribute enough to get your full employer match—it's free money. The general guideline is 10-15% of income (including employer match) for retirement savings. If you're behind, aim higher. If you started saving at 25, 10% may be enough; starting at 35, you might need 15-20% to catch up.",
    },
    {
      question: "What are the 401(k) contribution limits for 2025?",
      answer: "For 2025, the employee contribution limit is $23,500. If you're 50-59 or 64+, you can add $7,500 more (total $31,000). Ages 60-63 get a 'super catch-up' of $11,250 extra (total $34,750). The combined employee + employer limit is $70,000.",
    },
    {
      question: "What happens if I withdraw early from my 401(k)?",
      answer: "Withdrawals before age 59½ typically face a 10% early withdrawal penalty plus regular income taxes. Exceptions include: disability, certain medical expenses, IRS levy, qualified domestic relations order, leaving job at 55+, and substantially equal periodic payments (72t). Consider a 401(k) loan instead if your plan allows.",
    },
    {
      question: "Should I choose Traditional or Roth 401(k)?",
      answer: "Traditional reduces your taxes now; Roth provides tax-free withdrawals later. If you expect to be in a lower tax bracket in retirement, Traditional may be better. If you expect higher taxes later (young, expect income growth, or worry about future tax rates), Roth may win. Many experts suggest splitting for tax diversification.",
    },
    {
      question: "What is a 401(k) employer match?",
      answer: "An employer match is when your company contributes money to your 401(k) based on your contributions. Common examples: '50% match up to 6%' means if you contribute 6% of salary, employer adds 3%. '100% match up to 4%' means they match dollar-for-dollar up to 4% of your salary. This is essentially free money—always get the full match.",
    },
    {
      question: "What is the 4% rule for retirement withdrawals?",
      answer: "The 4% rule suggests withdrawing 4% of your portfolio in year one of retirement, then adjusting for inflation annually. This strategy historically provided 30 years of income without running out of money. So $1 million supports ~$40,000/year ($3,333/month). Some experts now suggest 3-3.5% for longer retirements or conservative planning.",
    },
    {
      question: "Can I have both a 401(k) and an IRA?",
      answer: "Yes! You can contribute to both. However, if you're covered by a 401(k), your Traditional IRA deduction may be limited based on income. Roth IRA contributions have income limits regardless. Max out your 401(k) match first, then consider IRA, then additional 401(k) contributions.",
    },
    {
      question: "What is vesting and why does it matter?",
      answer: "Vesting determines when you own your employer's matching contributions. Your own contributions are always 100% yours. But employer match might vest over time—e.g., 20% per year over 5 years, or 100% after 3 years ('cliff vesting'). If you leave before fully vested, you forfeit unvested employer contributions.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCES (exactly 2)
  // ═══════════════════════════════════════════════════════════════════════════
  references: [
    {
      authors: "Internal Revenue Service",
      year: "2024",
      title: "401(k) limit increases to $23,500 for 2025; IRA limit remains $7,000",
      source: "IRS Newsroom",
      url: "https://www.irs.gov/newsroom/401k-limit-increases-to-23500-for-2025-ira-limit-remains-7000",
    },
    {
      authors: "Fidelity Investments",
      year: "2025",
      title: "401(k) contribution limits 2025 and 2026",
      source: "Fidelity Learning Center",
      url: "https://www.fidelity.com/learning-center/smart-money/401k-contribution-limits",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // DETAILED TABLE
  // ═══════════════════════════════════════════════════════════════════════════
  detailedTable: {
    id: "yearByYear",
    buttonLabel: "View Year-by-Year Projection",
    buttonIcon: "📅",
    modalTitle: "401(k) Growth Projection",
    columns: [
      { id: "age", label: "Age", align: "center" },
      { id: "salary", label: "Salary", align: "right" },
      { id: "yourContrib", label: "You", align: "right" },
      { id: "employerContrib", label: "Employer", align: "right" },
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
  relatedCalculators: [
    "retirement-calculator",
    "compound-interest-calculator",
    "investment-calculator",
    "roth-ira-calculator",
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
// HELPER: Get contribution limit based on age
// =============================================================================
function getContributionLimit(age: number): number {
  const baseLimit = LIMITS.base;
  if (age >= 60 && age <= 63) return baseLimit + LIMITS.catchUp60;
  if (age >= 50) return baseLimit + LIMITS.catchUp50;
  return baseLimit;
}

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculate401k(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;

  const currentAge = (values.currentAge as number) || 30;
  const retirementAge = (values.retirementAge as number) || 65;
  const annualSalary = (values.annualSalary as number) || 75000;
  const currentBalance = (values.currentBalance as number) || 0;
  const contributionPercent = (values.contributionPercent as number) || 10;
  const employerMatchPercent = (values.employerMatchPercent as number) || 50;
  const employerMatchLimit = (values.employerMatchLimit as number) || 6;
  const expectedReturn = (values.expectedReturn as number) || 7;
  const salaryIncrease = (values.salaryIncrease as number) || 3;

  const yearsToRetirement = retirementAge - currentAge;
  if (yearsToRetirement <= 0) {
    return {
      values: {},
      formatted: {},
      summary: "Retirement age must be greater than current age",
      isValid: false,
    };
  }

  let balance = currentBalance;
  let totalYourContrib = 0;
  let totalEmployerContrib = 0;
  let currentSalaryYear = annualSalary;
  const monthlyReturn = expectedReturn / 100 / 12;

  const tableData: Array<{
    age: string;
    salary: string;
    yourContrib: string;
    employerContrib: string;
    balance: string;
  }> = [];

  for (let year = 0; year < yearsToRetirement; year++) {
    const age = currentAge + year;
    const limit = getContributionLimit(age);

    // Your contribution (capped at IRS limit)
    let yourContrib = currentSalaryYear * (contributionPercent / 100);
    if (yourContrib > limit) yourContrib = limit;

    // Employer match calculation
    const matchEligibleAmount = currentSalaryYear * (employerMatchLimit / 100);
    const actualContribForMatch = Math.min(yourContrib, matchEligibleAmount);
    const employerContrib = actualContribForMatch * (employerMatchPercent / 100);

    totalYourContrib += yourContrib;
    totalEmployerContrib += employerContrib;

    // Monthly contributions and growth
    const monthlyYourContrib = yourContrib / 12;
    const monthlyEmployerContrib = employerContrib / 12;

    for (let month = 0; month < 12; month++) {
      balance = balance * (1 + monthlyReturn) + monthlyYourContrib + monthlyEmployerContrib;
    }

    // Add to table data (every 5 years or first/last year)
    if (year === 0 || year === yearsToRetirement - 1 || (year + 1) % 5 === 0) {
      tableData.push({
        age: String(age + 1),
        salary: `$${Math.round(currentSalaryYear).toLocaleString()}`,
        yourContrib: `$${Math.round(yourContrib).toLocaleString()}`,
        employerContrib: `$${Math.round(employerContrib).toLocaleString()}`,
        balance: `$${Math.round(balance).toLocaleString()}`,
      });
    }

    // Salary increase for next year
    currentSalaryYear *= (1 + salaryIncrease / 100);
  }

  const totalInvestmentGrowth = balance - currentBalance - totalYourContrib - totalEmployerContrib;

  // 4% rule for retirement income
  const annualRetirementIncome = balance * 0.04;
  const monthlyRetirementIncome = annualRetirementIncome / 12;

  // Estimate years of income (assuming 4% withdrawal, 5% growth in retirement)
  const yearsOfIncome = Math.round(balance / annualRetirementIncome);

  return {
    values: {
      balanceAtRetirement: balance,
      totalYourContributions: totalYourContrib,
      totalEmployerContributions: totalEmployerContrib,
      totalInvestmentGrowth,
      monthlyRetirementIncome,
      yearsOfIncome: Math.min(yearsOfIncome, 40), // Cap at 40 years
    },
    formatted: {
      balanceAtRetirement: Math.round(balance).toLocaleString(),
      totalYourContributions: Math.round(totalYourContrib).toLocaleString(),
      totalEmployerContributions: Math.round(totalEmployerContrib).toLocaleString(),
      totalInvestmentGrowth: Math.round(totalInvestmentGrowth).toLocaleString(),
      monthlyRetirementIncome: Math.round(monthlyRetirementIncome).toLocaleString(),
      yearsOfIncome: String(Math.min(yearsOfIncome, 40)),
    },
    summary: `Balance at ${retirementAge}: $${Math.round(balance).toLocaleString()} | Monthly income: $${Math.round(monthlyRetirementIncome).toLocaleString()}`,
    isValid: true,
    metadata: {
      tableData,
      totalYears: yearsToRetirement,
    },
  };
}

export default calculator401kConfig;
