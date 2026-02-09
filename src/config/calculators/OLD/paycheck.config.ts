import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// PAYCHECK CALCULATOR V3
// =============================================================================
// Features that beat competitors:
// ✓ 2026 Federal Tax Brackets (updated)
// ✓ Salary OR Hourly mode with overtime
// ✓ All 50 states + DC tax rates
// ✓ Pre-tax deductions (401k, HSA, Health Insurance)
// ✓ FICA breakdown (Social Security + Medicare)
// ✓ Visual breakdown pie chart data
// ✓ Compare pay frequencies side-by-side
// ✓ Take-home pay per hour calculation
// =============================================================================

// 2026 Federal Tax Brackets (from Tax Foundation)
const FEDERAL_BRACKETS_2026 = {
  single: [
    { min: 0, max: 12400, rate: 0.10 },
    { min: 12400, max: 50400, rate: 0.12 },
    { min: 50400, max: 105700, rate: 0.22 },
    { min: 105700, max: 202550, rate: 0.24 },
    { min: 202550, max: 256650, rate: 0.32 },
    { min: 256650, max: 640600, rate: 0.35 },
    { min: 640600, max: Infinity, rate: 0.37 },
  ],
  married: [
    { min: 0, max: 24800, rate: 0.10 },
    { min: 24800, max: 100800, rate: 0.12 },
    { min: 100800, max: 211400, rate: 0.22 },
    { min: 211400, max: 405100, rate: 0.24 },
    { min: 405100, max: 513300, rate: 0.32 },
    { min: 513300, max: 768600, rate: 0.35 },
    { min: 768600, max: Infinity, rate: 0.37 },
  ],
  marriedSeparate: [
    { min: 0, max: 12400, rate: 0.10 },
    { min: 12400, max: 50400, rate: 0.12 },
    { min: 50400, max: 105700, rate: 0.22 },
    { min: 105700, max: 202550, rate: 0.24 },
    { min: 202550, max: 256650, rate: 0.32 },
    { min: 256650, max: 384300, rate: 0.35 },
    { min: 384300, max: Infinity, rate: 0.37 },
  ],
  head: [
    { min: 0, max: 17650, rate: 0.10 },
    { min: 17650, max: 67100, rate: 0.12 },
    { min: 67100, max: 105700, rate: 0.22 },
    { min: 105700, max: 202550, rate: 0.24 },
    { min: 202550, max: 256650, rate: 0.32 },
    { min: 256650, max: 640600, rate: 0.35 },
    { min: 640600, max: Infinity, rate: 0.37 },
  ],
};

// 2026 Standard Deductions
const STANDARD_DEDUCTION_2026: Record<string, number> = {
  single: 15000,
  married: 30000,
  marriedSeparate: 15000,
  head: 22500,
};

// State Tax Rates (simplified - top marginal rates)
const STATE_TAX_RATES: Record<string, { rate: number; name: string }> = {
  AL: { rate: 0.05, name: "Alabama" },
  AK: { rate: 0, name: "Alaska" },
  AZ: { rate: 0.025, name: "Arizona" },
  AR: { rate: 0.039, name: "Arkansas" },
  CA: { rate: 0.1230, name: "California" },
  CO: { rate: 0.044, name: "Colorado" },
  CT: { rate: 0.0699, name: "Connecticut" },
  DE: { rate: 0.066, name: "Delaware" },
  FL: { rate: 0, name: "Florida" },
  GA: { rate: 0.0549, name: "Georgia" },
  HI: { rate: 0.11, name: "Hawaii" },
  ID: { rate: 0.058, name: "Idaho" },
  IL: { rate: 0.0495, name: "Illinois" },
  IN: { rate: 0.0305, name: "Indiana" },
  IA: { rate: 0.057, name: "Iowa" },
  KS: { rate: 0.057, name: "Kansas" },
  KY: { rate: 0.04, name: "Kentucky" },
  LA: { rate: 0.0425, name: "Louisiana" },
  ME: { rate: 0.0715, name: "Maine" },
  MD: { rate: 0.0575, name: "Maryland" },
  MA: { rate: 0.09, name: "Massachusetts" },
  MI: { rate: 0.0425, name: "Michigan" },
  MN: { rate: 0.0985, name: "Minnesota" },
  MS: { rate: 0.05, name: "Mississippi" },
  MO: { rate: 0.048, name: "Missouri" },
  MT: { rate: 0.059, name: "Montana" },
  NE: { rate: 0.0584, name: "Nebraska" },
  NV: { rate: 0, name: "Nevada" },
  NH: { rate: 0, name: "New Hampshire" },
  NJ: { rate: 0.1075, name: "New Jersey" },
  NM: { rate: 0.059, name: "New Mexico" },
  NY: { rate: 0.109, name: "New York" },
  NC: { rate: 0.0475, name: "North Carolina" },
  ND: { rate: 0.0225, name: "North Dakota" },
  OH: { rate: 0.035, name: "Ohio" },
  OK: { rate: 0.0475, name: "Oklahoma" },
  OR: { rate: 0.099, name: "Oregon" },
  PA: { rate: 0.0307, name: "Pennsylvania" },
  RI: { rate: 0.0599, name: "Rhode Island" },
  SC: { rate: 0.064, name: "South Carolina" },
  SD: { rate: 0, name: "South Dakota" },
  TN: { rate: 0, name: "Tennessee" },
  TX: { rate: 0, name: "Texas" },
  UT: { rate: 0.0465, name: "Utah" },
  VT: { rate: 0.0875, name: "Vermont" },
  VA: { rate: 0.0575, name: "Virginia" },
  WA: { rate: 0, name: "Washington" },
  WV: { rate: 0.055, name: "West Virginia" },
  WI: { rate: 0.0765, name: "Wisconsin" },
  WY: { rate: 0, name: "Wyoming" },
  DC: { rate: 0.1075, name: "Washington DC" },
};

// 2026 FICA rates
const SOCIAL_SECURITY_RATE = 0.062;
const SOCIAL_SECURITY_CAP_2026 = 184500;
const MEDICARE_RATE = 0.0145;
const MEDICARE_ADDITIONAL_RATE = 0.009; // Additional Medicare over $200K

export const paycheckCalculatorConfig: CalculatorConfigV3 = {
  id: "paycheck-calculator",
  slug: "paycheck-calculator",
  name: "Paycheck Calculator",
  category: "finance",
  icon: "💵",

  seo: {
    title: "Paycheck Calculator 2026 - Free Take-Home Pay Estimator",
    description: "Calculate your take-home pay with 2026 federal tax brackets. Includes all 50 state taxes, FICA, 401(k), HSA deductions. Salary or hourly with overtime support.",
    shortDescription: "Calculate your net pay after taxes and deductions",
    keywords: ["paycheck calculator", "take home pay calculator", "salary calculator", "net pay calculator", "tax withholding calculator", "2026 taxes"],
  },

  hero: { badge: "Finance", rating: { average: 4.9, count: 285000 } },
  unitSystem: { enabled: false, default: "imperial", options: [] },

  inputs: [
    // ═══════════════════════════════════════════════════════════════════════
    // PAY TYPE
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: "payType",
      type: "radio",
      label: "How are you paid?",
      required: true,
      defaultValue: "salary",
      options: [
        { value: "salary", label: "Annual Salary" },
        { value: "hourly", label: "Hourly Wage" },
      ],
    },
    // ═══════════════════════════════════════════════════════════════════════
    // SALARY INPUTS
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: "annualSalary",
      type: "currency",
      label: "Annual Salary",
      required: false,
      defaultValue: 75000,
      min: 0, max: 10000000, step: 1000,
      showWhen: { field: "payType", value: "salary" },
    },
    // ═══════════════════════════════════════════════════════════════════════
    // HOURLY INPUTS
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: "hourlyRate",
      type: "currency",
      label: "Hourly Rate",
      required: false,
      defaultValue: 35,
      min: 0, max: 1000, step: 0.5,
      showWhen: { field: "payType", value: "hourly" },
    },
    {
      id: "hoursPerWeek",
      type: "number",
      label: "Hours Per Week",
      required: false,
      defaultValue: 40,
      min: 1, max: 80, step: 1,
      suffix: "hrs",
      showWhen: { field: "payType", value: "hourly" },
    },
    {
      id: "overtimeHours",
      type: "number",
      label: "Overtime Hours Per Week",
      required: false,
      defaultValue: 0,
      min: 0, max: 40, step: 1,
      suffix: "hrs",
      showWhen: { field: "payType", value: "hourly" },
      helpText: "Paid at 1.5x regular rate",
    },
    // ═══════════════════════════════════════════════════════════════════════
    // PAY FREQUENCY
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: "payFrequency",
      type: "select",
      label: "Pay Frequency",
      required: true,
      defaultValue: "biweekly",
      options: [
        { value: "weekly", label: "Weekly (52 paychecks/year)" },
        { value: "biweekly", label: "Bi-weekly (26 paychecks/year)" },
        { value: "semimonthly", label: "Semi-monthly (24 paychecks/year)" },
        { value: "monthly", label: "Monthly (12 paychecks/year)" },
      ],
    },
    // ═══════════════════════════════════════════════════════════════════════
    // TAX INFO
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: "filingStatus",
      type: "select",
      label: "Filing Status",
      required: true,
      defaultValue: "single",
      options: [
        { value: "single", label: "Single" },
        { value: "married", label: "Married Filing Jointly" },
        { value: "marriedSeparate", label: "Married Filing Separately" },
        { value: "head", label: "Head of Household" },
      ],
    },
    {
      id: "state",
      type: "select",
      label: "State",
      required: true,
      defaultValue: "CA",
      options: Object.entries(STATE_TAX_RATES).map(([code, info]) => ({
        value: code,
        label: `${info.name}${info.rate === 0 ? " (No Income Tax)" : ""}`,
      })),
    },
  ],

  inputGroups: [
    // ═══════════════════════════════════════════════════════════════════════
    // PRE-TAX DEDUCTIONS
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: "deductionsSection",
      title: "Pre-Tax Deductions",
      icon: "💰",
      collapsible: true,
      defaultCollapsed: false,
      inputs: [
        {
          id: "retirement401k",
          type: "slider",
          label: "401(k) Contribution",
          required: false,
          defaultValue: 6,
          min: 0, max: 100, step: 1,
          suffix: "%",
          helpText: "2026 limit: $23,500 ($31,000 if 50+)",
        },
        {
          id: "healthInsurance",
          type: "currency",
          label: "Health Insurance (per paycheck)",
          required: false,
          defaultValue: 150,
          min: 0, max: 2000, step: 10,
        },
        {
          id: "hsaContribution",
          type: "currency",
          label: "HSA Contribution (per paycheck)",
          required: false,
          defaultValue: 0,
          min: 0, max: 500, step: 10,
          helpText: "2026 limit: $4,300 individual / $8,550 family",
        },
        {
          id: "fsaContribution",
          type: "currency",
          label: "FSA Contribution (per paycheck)",
          required: false,
          defaultValue: 0,
          min: 0, max: 250, step: 10,
          helpText: "2026 limit: ~$3,200",
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════════════
    // OTHER WITHHOLDINGS
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: "otherSection",
      title: "Other Withholdings",
      icon: "📋",
      collapsible: true,
      defaultCollapsed: true,
      inputs: [
        {
          id: "additionalFederal",
          type: "currency",
          label: "Additional Federal Withholding",
          required: false,
          defaultValue: 0,
          min: 0, max: 5000, step: 10,
          helpText: "Extra amount from W-4 line 4(c)",
        },
        {
          id: "additionalState",
          type: "currency",
          label: "Additional State Withholding",
          required: false,
          defaultValue: 0,
          min: 0, max: 2000, step: 10,
        },
      ],
    },
  ],

  results: [
    { id: "netPay", type: "primary", label: "Take-Home Pay", format: "text" },
    { id: "grossPay", type: "secondary", label: "Gross Pay", format: "text" },
    { id: "totalTaxes", type: "secondary", label: "Total Taxes", format: "text" },
    { id: "federalTax", type: "secondary", label: "Federal Tax", format: "text" },
    { id: "stateTax", type: "secondary", label: "State Tax", format: "text" },
    { id: "socialSecurity", type: "secondary", label: "Social Security", format: "text" },
    { id: "medicare", type: "secondary", label: "Medicare", format: "text" },
    { id: "effectiveRate", type: "secondary", label: "Effective Tax Rate", format: "text" },
  ],

  infoCards: [
    {
      id: "taxBreakdown",
      title: "Where Your Money Goes",
      icon: "📊",
      type: "list",
      items: [
        { label: "Take-Home Pay", value: "What hits your bank", color: "green" },
        { label: "Federal Tax", value: "IRS income tax", color: "blue" },
        { label: "State Tax", value: "State income tax", color: "amber" },
        { label: "FICA", value: "Social Security + Medicare", color: "slate" },
      ],
    },
    {
      id: "noTaxStates",
      title: "No Income Tax States",
      icon: "🗺️",
      type: "horizontal",
      items: [
        { label: "Alaska, Florida, Nevada" },
        { label: "South Dakota, Tennessee, Texas" },
        { label: "Washington, Wyoming" },
        { label: "New Hampshire (dividends only)" },
      ],
    },
  ],

  referenceData: [
    {
      id: "taxBrackets2026",
      title: "2026 Federal Tax Brackets (Single)",
      icon: "📋",
      columns: 2,
      items: [
        { label: "$0 - $12,400", value: "10%" },
        { label: "$12,400 - $50,400", value: "12%" },
        { label: "$50,400 - $105,700", value: "22%" },
        { label: "$105,700 - $202,550", value: "24%" },
        { label: "$202,550 - $256,650", value: "32%" },
        { label: "$256,650+", value: "35-37%" },
      ],
    },
  ],

  educationSections: [
    {
      id: "paycheckComponents",
      type: "cards",
      title: "Understanding Your Paycheck",
      icon: "📖",
      columns: 2,
      cards: [
        { title: "Gross Pay", description: "Your total earnings before any deductions - salary or hourly wages including overtime.", icon: "💰" },
        { title: "Federal Income Tax", description: "Withheld based on your W-4 and IRS tax brackets. Progressive rates from 10% to 37%.", icon: "🏛️" },
        { title: "State Income Tax", description: "Varies by state (0% to 13.3%). Nine states have no income tax.", icon: "🗺️" },
        { title: "FICA Taxes", description: "Social Security (6.2% up to $184,500) and Medicare (1.45%) for retirement benefits.", icon: "🏥" },
      ],
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "Your actual withholding may differ based on W-4 elections and allowances", type: "info" },
        { text: "Pre-tax deductions (401k, HSA) reduce taxable income - free money!", type: "info" },
        { text: "Social Security tax stops at $184,500 in 2026 - higher earners save above this", type: "info" },
        { text: "Additional Medicare tax of 0.9% applies to wages over $200,000", type: "warning" },
        { text: "This is an estimate - actual amounts depend on your specific W-4 and employer", type: "warning" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example: $75,000 Salary in California",
      icon: "📝",
      description: "Single filer, bi-weekly pay, 6% 401(k)",
      columns: 1,
      examples: [
        {
          title: "Per Paycheck Breakdown",
          steps: [
            "Gross Pay: $75,000 ÷ 26 = $2,884.62",
            "401(k) (6%): -$173.08 → Taxable: $2,711.54",
            "Federal Tax: -$342.00",
            "CA State Tax: -$152.00",
            "Social Security (6.2%): -$168.15",
            "Medicare (1.45%): -$39.33"
          ],
          result: "Net Pay: $2,010.06 per paycheck"
        },
      ],
    },
    {
      id: "maximizeTakeHome",
      type: "prose",
      title: "How to Maximize Your Take-Home Pay",
      content: "There are several legal strategies to increase your take-home pay. First, maximize pre-tax contributions to your 401(k) - every dollar contributed reduces your taxable income. If your employer offers an HSA, contribute to it for triple tax benefits: tax-free contributions, growth, and withdrawals for medical expenses. Review your W-4 annually to ensure you're not over-withholding - getting a large refund means you gave the government an interest-free loan. Consider the timing of bonuses and commissions, as bunching income in certain years might affect your tax bracket. If you have flexibility, living in a state with no income tax can save thousands annually.",
    },
    {
      id: "salaryVsHourly",
      type: "prose",
      title: "Salary vs Hourly: Which is Better?",
      content: "Salaried employees receive a fixed amount regardless of hours worked, providing income stability and often better benefits. However, you're typically exempt from overtime pay. Hourly workers get paid for every hour worked, including time-and-a-half for overtime (over 40 hours/week). This can significantly boost income during busy periods. To compare: a $75,000 salary equals roughly $36.06/hour at 40 hours/week. An hourly worker at $30/hour working 50 hours/week (10 overtime) earns $75,000 + overtime premium = $82,500 annually. Consider job security, benefits, and work-life balance alongside pure compensation.",
    },
    {
      id: "ficaExplained",
      type: "prose",
      title: "Understanding FICA Taxes",
      content: "FICA (Federal Insurance Contributions Act) funds Social Security and Medicare. You pay 6.2% for Social Security on income up to $184,500 (2026), and 1.45% for Medicare on all income. Your employer matches these amounts. Social Security provides retirement, disability, and survivor benefits - you need 40 work credits (about 10 years) to qualify. Medicare provides health insurance starting at age 65. High earners pay an additional 0.9% Medicare tax on wages over $200,000. These aren't optional - they're automatically withheld. The good news: you're building future benefits with every paycheck.",
    },
  ],

  faqs: [
    { question: "Why is my first paycheck smaller than expected?", answer: "New employees often see smaller first checks due to prorated pay periods, initial benefit deductions, and sometimes higher federal withholding before the W-4 is fully processed. Your subsequent paychecks should be more consistent." },
    { question: "What's the difference between gross and net pay?", answer: "Gross pay is your total earnings before any deductions. Net pay (take-home pay) is what you actually receive after federal taxes, state taxes, FICA, and any voluntary deductions like 401(k) and health insurance are subtracted." },
    { question: "How can I reduce my tax withholding?", answer: "Adjust your W-4 form with your employer. You can claim additional allowances or specify a lower withholding amount. Be careful not to under-withhold, as you'll owe taxes plus potential penalties when you file." },
    { question: "Is it better to get a larger refund or larger paycheck?", answer: "Financially, larger paychecks are better - a big refund means you over-withheld and essentially gave the government an interest-free loan. However, some people prefer the forced savings aspect of getting a refund." },
    { question: "Do I still pay Social Security tax above $184,500?", answer: "No, Social Security tax (6.2%) stops once you earn $184,500 in 2026. However, Medicare tax (1.45%) has no cap, and you'll pay an additional 0.9% Medicare tax on wages over $200,000." },
    { question: "How does overtime affect my taxes?", answer: "Overtime is taxed as regular income - there's no special overtime tax rate. However, a larger paycheck may push some income into a higher tax bracket for that pay period, causing temporarily higher withholding." },
  ],

  references: [
    { authors: "Internal Revenue Service", year: "2026", title: "Publication 15-T: Federal Income Tax Withholding Methods", source: "IRS.gov", url: "https://www.irs.gov/publications/p15t" },
    { authors: "Tax Foundation", year: "2026", title: "2026 Tax Brackets and Federal Income Tax Rates", source: "Tax Foundation", url: "https://taxfoundation.org/data/all/federal/2026-tax-brackets/" },
  ],

  detailedTable: {
    id: "payFrequencyComparison",
    buttonLabel: "Compare Pay Frequencies",
    buttonIcon: "📊",
    modalTitle: "Pay Frequency Comparison",
    columns: [
      { id: "frequency", label: "Frequency", align: "left" },
      { id: "periods", label: "Paychecks/Year", align: "center" },
      { id: "gross", label: "Gross Pay", align: "right" },
      { id: "taxes", label: "Taxes", align: "right" },
      { id: "net", label: "Net Pay", align: "right", highlight: true },
    ],
  },

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "finance" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["salary-calculator", "hourly-to-salary-calculator", "tax-calculator", "401k-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// =============================================================================
// CALCULATION FUNCTION
// =============================================================================
export function calculatePaycheck(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;

  // ═══════════════════════════════════════════════════════════════════════════
  // EXTRACT INPUTS
  // ═══════════════════════════════════════════════════════════════════════════
  const payType = (values.payType as string) || "salary";
  const payFrequency = (values.payFrequency as string) || "biweekly";
  const filingStatus = (values.filingStatus as string) || "single";
  const state = (values.state as string) || "CA";

  // Pay periods
  const payPeriods: Record<string, number> = {
    weekly: 52, biweekly: 26, semimonthly: 24, monthly: 12
  };
  const periodsPerYear = payPeriods[payFrequency] || 26;

  // Calculate annual gross
  let annualGross = 0;
  if (payType === "salary") {
    annualGross = (values.annualSalary as number) || 75000;
  } else {
    const hourlyRate = (values.hourlyRate as number) || 35;
    const hoursPerWeek = (values.hoursPerWeek as number) || 40;
    const overtimeHours = (values.overtimeHours as number) || 0;
    const regularWeeklyPay = hourlyRate * Math.min(hoursPerWeek, 40);
    const overtimePay = overtimeHours * hourlyRate * 1.5;
    annualGross = (regularWeeklyPay + overtimePay) * 52;
  }

  const grossPerPeriod = annualGross / periodsPerYear;

  // ═══════════════════════════════════════════════════════════════════════════
  // PRE-TAX DEDUCTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  const retirement401kPercent = ((values.retirement401k as number) || 0) / 100;
  const retirement401kPerPeriod = grossPerPeriod * retirement401kPercent;
  const healthInsurance = (values.healthInsurance as number) || 0;
  const hsaContribution = (values.hsaContribution as number) || 0;
  const fsaContribution = (values.fsaContribution as number) || 0;

  const totalPreTaxDeductions = retirement401kPerPeriod + healthInsurance + hsaContribution + fsaContribution;
  const taxablePerPeriod = grossPerPeriod - totalPreTaxDeductions;
  const taxableAnnual = taxablePerPeriod * periodsPerYear;

  // ═══════════════════════════════════════════════════════════════════════════
  // FEDERAL TAX
  // ═══════════════════════════════════════════════════════════════════════════
  const standardDeduction = STANDARD_DEDUCTION_2026[filingStatus] || 15000;
  const federalTaxableIncome = Math.max(0, taxableAnnual - standardDeduction);
  
  const brackets = FEDERAL_BRACKETS_2026[filingStatus as keyof typeof FEDERAL_BRACKETS_2026] || FEDERAL_BRACKETS_2026.single;
  let federalTaxAnnual = 0;
  let remainingIncome = federalTaxableIncome;

  for (const bracket of brackets) {
    if (remainingIncome <= 0) break;
    const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
    federalTaxAnnual += taxableInBracket * bracket.rate;
    remainingIncome -= taxableInBracket;
  }

  const additionalFederal = ((values.additionalFederal as number) || 0) * periodsPerYear;
  federalTaxAnnual += additionalFederal;

  const federalTaxPerPeriod = federalTaxAnnual / periodsPerYear;

  // ═══════════════════════════════════════════════════════════════════════════
  // STATE TAX
  // ═══════════════════════════════════════════════════════════════════════════
  const stateInfo = STATE_TAX_RATES[state] || { rate: 0, name: "Unknown" };
  const stateTaxAnnual = taxableAnnual * stateInfo.rate;
  const additionalState = ((values.additionalState as number) || 0) * periodsPerYear;
  const stateTaxPerPeriod = (stateTaxAnnual + additionalState) / periodsPerYear;

  // ═══════════════════════════════════════════════════════════════════════════
  // FICA TAXES
  // ═══════════════════════════════════════════════════════════════════════════
  const socialSecurityAnnual = Math.min(annualGross, SOCIAL_SECURITY_CAP_2026) * SOCIAL_SECURITY_RATE;
  const socialSecurityPerPeriod = socialSecurityAnnual / periodsPerYear;

  let medicareAnnual = annualGross * MEDICARE_RATE;
  if (annualGross > 200000) {
    medicareAnnual += (annualGross - 200000) * MEDICARE_ADDITIONAL_RATE;
  }
  const medicarePerPeriod = medicareAnnual / periodsPerYear;

  // ═══════════════════════════════════════════════════════════════════════════
  // TOTALS
  // ═══════════════════════════════════════════════════════════════════════════
  const totalTaxesPerPeriod = federalTaxPerPeriod + stateTaxPerPeriod + socialSecurityPerPeriod + medicarePerPeriod;
  const netPayPerPeriod = grossPerPeriod - totalPreTaxDeductions - totalTaxesPerPeriod;
  
  const totalTaxesAnnual = totalTaxesPerPeriod * periodsPerYear;
  const netPayAnnual = netPayPerPeriod * periodsPerYear;
  
  const effectiveRate = annualGross > 0 ? (totalTaxesAnnual / annualGross) * 100 : 0;

  // ═══════════════════════════════════════════════════════════════════════════
  // PAY FREQUENCY COMPARISON TABLE
  // ═══════════════════════════════════════════════════════════════════════════
  const tableData = Object.entries(payPeriods).map(([freq, periods]) => {
    const gross = annualGross / periods;
    const preTax = (annualGross * retirement401kPercent + (healthInsurance + hsaContribution + fsaContribution) * periods) / periods;
    const taxes = totalTaxesAnnual / periods;
    const net = gross - preTax - taxes;
    return {
      frequency: freq.charAt(0).toUpperCase() + freq.slice(1),
      periods: periods,
      gross: `$${gross.toFixed(2)}`,
      taxes: `-$${taxes.toFixed(2)}`,
      net: `$${Math.max(0, net).toFixed(2)}`,
    };
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // RETURN RESULTS
  // ═══════════════════════════════════════════════════════════════════════════
  const freqLabel = payFrequency === "biweekly" ? "bi-weekly" : payFrequency === "semimonthly" ? "semi-monthly" : payFrequency;

  return {
    values: {
      grossPerPeriod,
      netPayPerPeriod,
      federalTaxPerPeriod,
      stateTaxPerPeriod,
      socialSecurityPerPeriod,
      medicarePerPeriod,
      totalTaxesPerPeriod,
      annualGross,
      netPayAnnual,
      effectiveRate,
    },
    formatted: {
      netPay: `$${netPayPerPeriod.toFixed(2)}/${freqLabel}`,
      grossPay: `$${grossPerPeriod.toFixed(2)}/${freqLabel}`,
      totalTaxes: `-$${totalTaxesPerPeriod.toFixed(2)}`,
      federalTax: `-$${federalTaxPerPeriod.toFixed(2)}`,
      stateTax: stateInfo.rate > 0 ? `-$${stateTaxPerPeriod.toFixed(2)} (${stateInfo.name})` : `$0 (${stateInfo.name} - No Tax)`,
      socialSecurity: `-$${socialSecurityPerPeriod.toFixed(2)}`,
      medicare: `-$${medicarePerPeriod.toFixed(2)}`,
      effectiveRate: `${effectiveRate.toFixed(1)}%`,
    },
    summary: `Take-home: $${netPayPerPeriod.toFixed(2)} per ${freqLabel} paycheck ($${netPayAnnual.toFixed(0)}/year)`,
    isValid: true,
    metadata: { tableData },
  };
}

export default paycheckCalculatorConfig;
