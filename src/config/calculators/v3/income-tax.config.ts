import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// TAX DATA BY YEAR (2024, 2025, 2026)
// =============================================================================
const TAX_DATA: Record<string, TaxYearData> = {
  "2024": {
    brackets: {
      single: [
        { min: 0, max: 11600, rate: 0.10 },
        { min: 11600, max: 47150, rate: 0.12 },
        { min: 47150, max: 100525, rate: 0.22 },
        { min: 100525, max: 191950, rate: 0.24 },
        { min: 191950, max: 243725, rate: 0.32 },
        { min: 243725, max: 609350, rate: 0.35 },
        { min: 609350, max: Infinity, rate: 0.37 },
      ],
      married: [
        { min: 0, max: 23200, rate: 0.10 },
        { min: 23200, max: 94300, rate: 0.12 },
        { min: 94300, max: 201050, rate: 0.22 },
        { min: 201050, max: 383900, rate: 0.24 },
        { min: 383900, max: 487450, rate: 0.32 },
        { min: 487450, max: 731200, rate: 0.35 },
        { min: 731200, max: Infinity, rate: 0.37 },
      ],
      marriedSeparate: [
        { min: 0, max: 11600, rate: 0.10 },
        { min: 11600, max: 47150, rate: 0.12 },
        { min: 47150, max: 100525, rate: 0.22 },
        { min: 100525, max: 191950, rate: 0.24 },
        { min: 191950, max: 243725, rate: 0.32 },
        { min: 243725, max: 365600, rate: 0.35 },
        { min: 365600, max: Infinity, rate: 0.37 },
      ],
      head: [
        { min: 0, max: 16550, rate: 0.10 },
        { min: 16550, max: 63100, rate: 0.12 },
        { min: 63100, max: 100500, rate: 0.22 },
        { min: 100500, max: 191950, rate: 0.24 },
        { min: 191950, max: 243700, rate: 0.32 },
        { min: 243700, max: 609350, rate: 0.35 },
        { min: 609350, max: Infinity, rate: 0.37 },
      ],
    },
    standardDeduction: { single: 14600, married: 29200, marriedSeparate: 14600, head: 21900 },
    ltcgBrackets: {
      single: [{ max: 47025, rate: 0 }, { max: 518900, rate: 0.15 }, { max: Infinity, rate: 0.20 }],
      married: [{ max: 94050, rate: 0 }, { max: 583750, rate: 0.15 }, { max: Infinity, rate: 0.20 }],
      head: [{ max: 63000, rate: 0 }, { max: 551350, rate: 0.15 }, { max: Infinity, rate: 0.20 }],
    },
    socialSecurityCap: 168600,
    childTaxCredit: 2000,
    childTaxCreditRefundable: 1700,
    saltCap: 10000,
    iraLimit: 7000,
    fourOhOneKLimit: 23000,
    hsaLimit: { individual: 4150, family: 8300 },
    eitcMax: { 0: 632, 1: 4213, 2: 6960, 3: 7830 },
    additionalStdDeduction: { single: 1950, married: 1550 },
  },
  "2025": {
    brackets: {
      single: [
        { min: 0, max: 11925, rate: 0.10 },
        { min: 11925, max: 48475, rate: 0.12 },
        { min: 48475, max: 103350, rate: 0.22 },
        { min: 103350, max: 197300, rate: 0.24 },
        { min: 197300, max: 250525, rate: 0.32 },
        { min: 250525, max: 626350, rate: 0.35 },
        { min: 626350, max: Infinity, rate: 0.37 },
      ],
      married: [
        { min: 0, max: 23850, rate: 0.10 },
        { min: 23850, max: 96950, rate: 0.12 },
        { min: 96950, max: 206700, rate: 0.22 },
        { min: 206700, max: 394600, rate: 0.24 },
        { min: 394600, max: 501050, rate: 0.32 },
        { min: 501050, max: 751600, rate: 0.35 },
        { min: 751600, max: Infinity, rate: 0.37 },
      ],
      marriedSeparate: [
        { min: 0, max: 11925, rate: 0.10 },
        { min: 11925, max: 48475, rate: 0.12 },
        { min: 48475, max: 103350, rate: 0.22 },
        { min: 103350, max: 197300, rate: 0.24 },
        { min: 197300, max: 250525, rate: 0.32 },
        { min: 250525, max: 375800, rate: 0.35 },
        { min: 375800, max: Infinity, rate: 0.37 },
      ],
      head: [
        { min: 0, max: 17000, rate: 0.10 },
        { min: 17000, max: 64850, rate: 0.12 },
        { min: 64850, max: 103350, rate: 0.22 },
        { min: 103350, max: 197300, rate: 0.24 },
        { min: 197300, max: 250500, rate: 0.32 },
        { min: 250500, max: 626350, rate: 0.35 },
        { min: 626350, max: Infinity, rate: 0.37 },
      ],
    },
    standardDeduction: { single: 15000, married: 30000, marriedSeparate: 15000, head: 22500 },
    ltcgBrackets: {
      single: [{ max: 48350, rate: 0 }, { max: 533400, rate: 0.15 }, { max: Infinity, rate: 0.20 }],
      married: [{ max: 96700, rate: 0 }, { max: 600050, rate: 0.15 }, { max: Infinity, rate: 0.20 }],
      head: [{ max: 64750, rate: 0 }, { max: 566700, rate: 0.15 }, { max: Infinity, rate: 0.20 }],
    },
    socialSecurityCap: 176100,
    childTaxCredit: 2000,
    childTaxCreditRefundable: 1700,
    saltCap: 10000,
    iraLimit: 7000,
    fourOhOneKLimit: 23500,
    hsaLimit: { individual: 4300, family: 8550 },
    eitcMax: { 0: 649, 1: 4328, 2: 7152, 3: 8046 },
    additionalStdDeduction: { single: 2000, married: 1600 },
  },
  "2026": {
    brackets: {
      single: [
        { min: 0, max: 12300, rate: 0.10 },
        { min: 12300, max: 50000, rate: 0.12 },
        { min: 50000, max: 106500, rate: 0.22 },
        { min: 106500, max: 203350, rate: 0.24 },
        { min: 203350, max: 258300, rate: 0.32 },
        { min: 258300, max: 645500, rate: 0.35 },
        { min: 645500, max: Infinity, rate: 0.37 },
      ],
      married: [
        { min: 0, max: 24600, rate: 0.10 },
        { min: 24600, max: 100000, rate: 0.12 },
        { min: 100000, max: 213000, rate: 0.22 },
        { min: 213000, max: 406700, rate: 0.24 },
        { min: 406700, max: 516600, rate: 0.32 },
        { min: 516600, max: 774200, rate: 0.35 },
        { min: 774200, max: Infinity, rate: 0.37 },
      ],
      marriedSeparate: [
        { min: 0, max: 12300, rate: 0.10 },
        { min: 12300, max: 50000, rate: 0.12 },
        { min: 50000, max: 106500, rate: 0.22 },
        { min: 106500, max: 203350, rate: 0.24 },
        { min: 203350, max: 258300, rate: 0.32 },
        { min: 258300, max: 387100, rate: 0.35 },
        { min: 387100, max: Infinity, rate: 0.37 },
      ],
      head: [
        { min: 0, max: 17500, rate: 0.10 },
        { min: 17500, max: 66850, rate: 0.12 },
        { min: 66850, max: 106500, rate: 0.22 },
        { min: 106500, max: 203350, rate: 0.24 },
        { min: 203350, max: 258000, rate: 0.32 },
        { min: 258000, max: 645500, rate: 0.35 },
        { min: 645500, max: Infinity, rate: 0.37 },
      ],
    },
    standardDeduction: { single: 15400, married: 30800, marriedSeparate: 15400, head: 23100 },
    ltcgBrackets: {
      single: [{ max: 49800, rate: 0 }, { max: 549200, rate: 0.15 }, { max: Infinity, rate: 0.20 }],
      married: [{ max: 99600, rate: 0 }, { max: 618000, rate: 0.15 }, { max: Infinity, rate: 0.20 }],
      head: [{ max: 66700, rate: 0 }, { max: 583200, rate: 0.15 }, { max: Infinity, rate: 0.20 }],
    },
    socialSecurityCap: 181200,
    childTaxCredit: 2000,
    childTaxCreditRefundable: 1800,
    saltCap: 40000,
    iraLimit: 7000,
    fourOhOneKLimit: 24000,
    hsaLimit: { individual: 4400, family: 8750 },
    eitcMax: { 0: 670, 1: 4460, 2: 7370, 3: 8290 },
    additionalStdDeduction: { single: 2050, married: 1650 },
  },
};

// State tax rates (simplified flat rate approximations)
const STATE_TAX: Record<string, { rate: number; name: string }> = {
  "AL": { rate: 0.05, name: "Alabama" },
  "AK": { rate: 0, name: "Alaska" },
  "AZ": { rate: 0.025, name: "Arizona" },
  "AR": { rate: 0.039, name: "Arkansas" },
  "CA": { rate: 0.093, name: "California" },
  "CO": { rate: 0.044, name: "Colorado" },
  "CT": { rate: 0.0699, name: "Connecticut" },
  "DE": { rate: 0.066, name: "Delaware" },
  "FL": { rate: 0, name: "Florida" },
  "GA": { rate: 0.0549, name: "Georgia" },
  "HI": { rate: 0.11, name: "Hawaii" },
  "ID": { rate: 0.058, name: "Idaho" },
  "IL": { rate: 0.0495, name: "Illinois" },
  "IN": { rate: 0.0305, name: "Indiana" },
  "IA": { rate: 0.057, name: "Iowa" },
  "KS": { rate: 0.057, name: "Kansas" },
  "KY": { rate: 0.04, name: "Kentucky" },
  "LA": { rate: 0.0425, name: "Louisiana" },
  "ME": { rate: 0.0715, name: "Maine" },
  "MD": { rate: 0.0575, name: "Maryland" },
  "MA": { rate: 0.05, name: "Massachusetts" },
  "MI": { rate: 0.0425, name: "Michigan" },
  "MN": { rate: 0.0985, name: "Minnesota" },
  "MS": { rate: 0.05, name: "Mississippi" },
  "MO": { rate: 0.048, name: "Missouri" },
  "MT": { rate: 0.059, name: "Montana" },
  "NE": { rate: 0.0584, name: "Nebraska" },
  "NV": { rate: 0, name: "Nevada" },
  "NH": { rate: 0, name: "New Hampshire" },
  "NJ": { rate: 0.1075, name: "New Jersey" },
  "NM": { rate: 0.059, name: "New Mexico" },
  "NY": { rate: 0.109, name: "New York" },
  "NC": { rate: 0.0525, name: "North Carolina" },
  "ND": { rate: 0.0195, name: "North Dakota" },
  "OH": { rate: 0.035, name: "Ohio" },
  "OK": { rate: 0.0475, name: "Oklahoma" },
  "OR": { rate: 0.099, name: "Oregon" },
  "PA": { rate: 0.0307, name: "Pennsylvania" },
  "RI": { rate: 0.0599, name: "Rhode Island" },
  "SC": { rate: 0.064, name: "South Carolina" },
  "SD": { rate: 0, name: "South Dakota" },
  "TN": { rate: 0, name: "Tennessee" },
  "TX": { rate: 0, name: "Texas" },
  "UT": { rate: 0.0465, name: "Utah" },
  "VT": { rate: 0.0875, name: "Vermont" },
  "VA": { rate: 0.0575, name: "Virginia" },
  "WA": { rate: 0, name: "Washington" },
  "WV": { rate: 0.055, name: "West Virginia" },
  "WI": { rate: 0.0765, name: "Wisconsin" },
  "WY": { rate: 0, name: "Wyoming" },
  "DC": { rate: 0.1075, name: "Washington D.C." },
};

// Types
interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

interface LTCGBracket {
  max: number;
  rate: number;
}

interface TaxYearData {
  brackets: Record<string, TaxBracket[]>;
  standardDeduction: Record<string, number>;
  ltcgBrackets: Record<string, LTCGBracket[]>;
  socialSecurityCap: number;
  childTaxCredit: number;
  childTaxCreditRefundable: number;
  saltCap: number;
  iraLimit: number;
  fourOhOneKLimit: number;
  hsaLimit: { individual: number; family: number };
  eitcMax: Record<number, number>;
  additionalStdDeduction: { single: number; married: number };
}

// =============================================================================
// CALCULATOR CONFIG
// =============================================================================
export const incomeTaxConfig: CalculatorConfigV3 = {
  id: "income-tax-calculator",
  slug: "income-tax-calculator",
  name: "Income Tax Calculator",
  category: "finance",
  icon: "🧾",

  seo: {
    title: "Income Tax Calculator 2025 - Federal & State Tax Estimator",
    description: "Calculate your 2024, 2025 & 2026 federal and state income taxes. Includes all tax brackets, deductions, credits, FICA, self-employment tax, capital gains, and NIIT.",
    shortDescription: "Estimate your federal and state income tax liability",
    keywords: ["income tax calculator", "tax calculator 2025", "federal tax", "state tax", "tax brackets", "tax refund calculator"],
  },

  hero: {
    badge: "Tax Year 2024-2026",
    rating: { average: 4.9, count: 15200 },
  },

  unitSystem: { enabled: false, default: "imperial", options: [] },

  // =============================================================================
  // INPUTS
  // =============================================================================
  inputs: [
    // === BASIC INFO ===
    {
      id: "taxYear",
      type: "select",
      label: "Tax Year",
      required: true,
      defaultValue: "2025",
      options: [
        { value: "2024", label: "2024 (Filing in 2025)" },
        { value: "2025", label: "2025 (Filing in 2026)" },
        { value: "2026", label: "2026 (Estimated)" },
      ],
    },
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
      options: Object.entries(STATE_TAX).map(([code, data]) => ({
        value: code,
        label: `${code} - ${data.name}${data.rate === 0 ? " (No Tax)" : ""}`,
      })),
    },
    {
      id: "age",
      type: "number",
      label: "Your Age",
      required: true,
      defaultValue: 35,
      min: 16,
      max: 120,
      helpText: "65+ qualifies for additional standard deduction",
    },
    {
      id: "spouseAge",
      type: "number",
      label: "Spouse Age",
      required: false,
      defaultValue: 35,
      min: 16,
      max: 120,
      showWhen: { field: "filingStatus", value: "married" },
    },

    // === INCOME ===
    {
      id: "wages",
      type: "number",
      label: "W-2 Wages & Salary",
      required: true,
      defaultValue: 75000,
      min: 0,
      max: 100000000,
      step: 1000,
      prefix: "$",
      helpText: "Box 1 of your W-2",
    },
    {
      id: "spouseWages",
      type: "number",
      label: "Spouse W-2 Wages",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 100000000,
      step: 1000,
      prefix: "$",
      showWhen: { field: "filingStatus", value: "married" },
    },
    {
      id: "businessIncome",
      type: "number",
      label: "Self-Employment / Business Income",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 100000000,
      step: 1000,
      prefix: "$",
      helpText: "Schedule C net profit (subject to SE tax)",
    },
    {
      id: "taxableInterest",
      type: "number",
      label: "Taxable Interest (1099-INT)",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 10000000,
      step: 100,
      prefix: "$",
    },
    {
      id: "ordinaryDividends",
      type: "number",
      label: "Ordinary Dividends",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 10000000,
      step: 100,
      prefix: "$",
    },
    {
      id: "qualifiedDividends",
      type: "number",
      label: "Qualified Dividends",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 10000000,
      step: 100,
      prefix: "$",
      helpText: "Taxed at lower capital gains rates",
    },
    {
      id: "shortTermGains",
      type: "number",
      label: "Short-Term Capital Gains",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 100000000,
      step: 100,
      prefix: "$",
      helpText: "Assets held ≤1 year (taxed as ordinary income)",
    },
    {
      id: "longTermGains",
      type: "number",
      label: "Long-Term Capital Gains",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 100000000,
      step: 100,
      prefix: "$",
      helpText: "Assets held >1 year (0%, 15%, or 20% rate)",
    },
    {
      id: "rentalIncome",
      type: "number",
      label: "Rental Income (Net)",
      required: false,
      defaultValue: 0,
      min: -1000000,
      max: 10000000,
      step: 100,
      prefix: "$",
      helpText: "Schedule E net rental income (can be negative)",
    },
    {
      id: "socialSecurityBenefits",
      type: "number",
      label: "Social Security Benefits",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 100000,
      step: 100,
      prefix: "$",
      helpText: "0-85% may be taxable based on income",
    },
    {
      id: "otherIncome",
      type: "number",
      label: "Other Income",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 10000000,
      step: 100,
      prefix: "$",
      helpText: "Alimony received, gambling, etc.",
    },

    // === ADJUSTMENTS (Above-the-Line) ===
    {
      id: "contribution401k",
      type: "number",
      label: "401(k) / 403(b) Contributions",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 30500,
      step: 500,
      prefix: "$",
      helpText: "Pre-tax contributions (already excluded from W-2)",
    },
    {
      id: "contributionIRA",
      type: "number",
      label: "Traditional IRA Contributions",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 7000,
      step: 500,
      prefix: "$",
      helpText: "Deductible IRA contributions",
    },
    {
      id: "contributionHSA",
      type: "number",
      label: "HSA Contributions",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 8550,
      step: 100,
      prefix: "$",
      helpText: "Health Savings Account contributions",
    },
    {
      id: "studentLoanInterest",
      type: "number",
      label: "Student Loan Interest",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 2500,
      step: 100,
      prefix: "$",
      helpText: "Max $2,500 deduction",
    },

    // === DEDUCTIONS ===
    {
      id: "deductionType",
      type: "radio",
      label: "Deduction Type",
      required: true,
      defaultValue: "standard",
      options: [
        { value: "standard", label: "Standard Deduction" },
        { value: "itemized", label: "Itemized Deductions" },
      ],
    },
    {
      id: "mortgageInterest",
      type: "number",
      label: "Mortgage Interest",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 1000000,
      step: 100,
      prefix: "$",
      showWhen: { field: "deductionType", value: "itemized" },
      helpText: "Form 1098, up to $750k loan",
    },
    {
      id: "propertyTax",
      type: "number",
      label: "Property Taxes",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 100000,
      step: 100,
      prefix: "$",
      showWhen: { field: "deductionType", value: "itemized" },
    },
    {
      id: "stateLocalTaxPaid",
      type: "number",
      label: "State & Local Income Tax Paid",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 100000,
      step: 100,
      prefix: "$",
      showWhen: { field: "deductionType", value: "itemized" },
      helpText: "SALT cap applies ($10k or $40k in 2026)",
    },
    {
      id: "charitableCash",
      type: "number",
      label: "Charitable Donations (Cash)",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 1000000,
      step: 100,
      prefix: "$",
      showWhen: { field: "deductionType", value: "itemized" },
    },
    {
      id: "medicalExpenses",
      type: "number",
      label: "Medical Expenses",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 1000000,
      step: 100,
      prefix: "$",
      showWhen: { field: "deductionType", value: "itemized" },
      helpText: "Only amount exceeding 7.5% of AGI is deductible",
    },

    // === CREDITS & DEPENDENTS ===
    {
      id: "childrenUnder17",
      type: "number",
      label: "Children Under 17",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 10,
      step: 1,
      helpText: "Qualifies for Child Tax Credit ($2,000 each)",
    },
    {
      id: "childCareExpenses",
      type: "number",
      label: "Child Care Expenses",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 16000,
      step: 100,
      prefix: "$",
      helpText: "For Child & Dependent Care Credit",
    },
    {
      id: "numStudents",
      type: "number",
      label: "College Students (AOTC)",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 5,
      step: 1,
      helpText: "American Opportunity Tax Credit ($2,500/student)",
    },

    // === WITHHOLDINGS ===
    {
      id: "federalWithheld",
      type: "number",
      label: "Federal Tax Withheld",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 1000000,
      step: 100,
      prefix: "$",
      helpText: "Box 2 of W-2 + 1099 withholdings",
    },
    {
      id: "estimatedPayments",
      type: "number",
      label: "Estimated Tax Payments Made",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 1000000,
      step: 100,
      prefix: "$",
      helpText: "Quarterly estimated payments (1040-ES)",
    },
  ],

  inputGroups: [],

  // =============================================================================
  // RESULTS
  // =============================================================================
  results: [
    { id: "totalTax", type: "primary", label: "Total Tax Liability", format: "number", prefix: "$" },
    { id: "refundOrOwe", type: "primary", label: "Refund / Amount Owed", format: "text" },
    { id: "effectiveRate", type: "secondary", label: "Effective Tax Rate", format: "text" },
    { id: "marginalRate", type: "secondary", label: "Marginal Tax Bracket", format: "text" },
    { id: "federalTax", type: "secondary", label: "Federal Income Tax", format: "text" },
    { id: "stateTax", type: "secondary", label: "State Income Tax", format: "text" },
    { id: "ficaTax", type: "secondary", label: "FICA (SS + Medicare)", format: "text" },
    { id: "selfEmploymentTax", type: "secondary", label: "Self-Employment Tax", format: "text" },
    { id: "capitalGainsTax", type: "secondary", label: "Capital Gains Tax", format: "text" },
    { id: "niit", type: "secondary", label: "Net Investment Income Tax", format: "text" },
    { id: "totalCredits", type: "secondary", label: "Total Tax Credits", format: "text" },
    { id: "takeHomePay", type: "secondary", label: "Annual Take-Home Pay", format: "text" },
    { id: "monthlyTakeHome", type: "secondary", label: "Monthly Take-Home", format: "text" },
    { id: "taxableIncome", type: "secondary", label: "Taxable Income", format: "text" },
    { id: "agi", type: "secondary", label: "Adjusted Gross Income", format: "text" },
    { id: "deduction", type: "secondary", label: "Deduction Used", format: "text" },
  ],

  // =============================================================================
  // INFO CARDS (Required by V3)
  // =============================================================================
  infoCards: [
    {
      type: "list",
      title: "Key Tax Deadlines 2025",
      icon: "📋",
      items: [
        { label: "Tax Day", value: "April 15, 2025" },
        { label: "Extension Deadline", value: "October 15, 2025" },
        { label: "Q1 Estimated Tax", value: "April 15, 2025" },
        { label: "Q4 Estimated Tax", value: "January 15, 2026" },
      ],
    },
    {
      type: "horizontal",
      title: "2025 Contribution Limits",
      icon: "💰",
      items: [
        { label: "401(k)", value: "$23,500" },
        { label: "IRA", value: "$7,000" },
        { label: "HSA (Family)", value: "$8,550" },
        { label: "HSA (Individual)", value: "$4,300" },
      ],
    },
  ],

  // =============================================================================
  // REFERENCE DATA (Required by V3)
  // =============================================================================
  referenceData: [
    {
      id: "taxBrackets2025",
      title: "2025 Federal Tax Brackets (Single)",
      icon: "📊",
      columns: [
        { key: "rate", label: "Tax Rate" },
        { key: "income", label: "Income Range" },
        { key: "tax", label: "Tax on Bracket" },
      ],
      data: [
        { rate: "10%", income: "$0 - $11,925", tax: "Up to $1,193" },
        { rate: "12%", income: "$11,925 - $48,475", tax: "$1,193 + 12%" },
        { rate: "22%", income: "$48,475 - $103,350", tax: "$5,579 + 22%" },
        { rate: "24%", income: "$103,350 - $197,300", tax: "$17,651 + 24%" },
        { rate: "32%", income: "$197,300 - $250,525", tax: "$40,199 + 32%" },
        { rate: "35%", income: "$250,525 - $626,350", tax: "$57,231 + 35%" },
        { rate: "37%", income: "Over $626,350", tax: "$188,770 + 37%" },
      ],
    },
  ],

  // =============================================================================
  // EDUCATION SECTIONS
  // =============================================================================
  educationSections: [
    {
      id: "taxTypes",
      type: "cards",
      title: "Types of Taxes Calculated",
      icon: "🏛️",
      columns: 2,
      cards: [
        {
          title: "Federal Income Tax",
          description: "Progressive tax on ordinary income using 7 brackets (10%-37%). Your income is taxed at different rates as it moves through each bracket.",
          icon: "🇺🇸",
        },
        {
          title: "State Income Tax",
          description: "Varies by state from 0% (TX, FL, WA) to 13.3% (CA). Nine states have no income tax at all. Rates shown are simplified averages.",
          icon: "🏠",
        },
        {
          title: "FICA Taxes",
          description: "Social Security (6.2% up to wage cap) + Medicare (1.45%, plus 0.9% additional over $200k/$250k). Paid by both employees and employers.",
          icon: "🏥",
        },
        {
          title: "Capital Gains Tax",
          description: "Long-term gains (assets held >1 year) taxed at 0%, 15%, or 20% based on income. Short-term gains taxed as ordinary income.",
          icon: "📈",
        },
      ],
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "This calculator provides estimates only - actual tax liability may differ based on your complete tax situation", type: "warning" },
        { text: "State tax calculations use simplified flat rates; actual state taxes may use progressive brackets", type: "warning" },
        { text: "Self-employment income is subject to both income tax AND self-employment tax (15.3%)", type: "info" },
        { text: "Net Investment Income Tax (NIIT) of 3.8% applies if income exceeds $200k single / $250k married", type: "info" },
        { text: "Standard deduction increases by $1,950-$2,000 for taxpayers age 65+ or blind", type: "info" },
        { text: "Child Tax Credit phases out for income over $200k single / $400k married", type: "info" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Tax Calculation",
      icon: "📊",
      description: "Single filer, $85,000 wages, standard deduction, 2025",
      columns: 2,
      examples: [
        {
          title: "Federal Income Tax",
          steps: [
            "Wages: $85,000",
            "Standard Deduction: -$15,000",
            "Taxable Income: $70,000",
            "10% on $11,925 = $1,192.50",
            "12% on $36,550 = $4,386.00",
            "22% on $21,525 = $4,735.50",
          ],
          result: "Federal Tax: $10,314",
        },
        {
          title: "Total Tax Burden",
          steps: [
            "Federal Tax: $10,314",
            "State Tax (CA): $7,905",
            "Social Security: $5,270",
            "Medicare: $1,233",
            "Total Taxes: $24,722",
          ],
          result: "Effective Rate: 29.1%",
        },
      ],
    },
    {
      id: "deductions",
      type: "prose",
      title: "Standard vs. Itemized Deductions",
      icon: "📝",
      content: "The standard deduction for 2025 is $15,000 (single), $30,000 (married filing jointly), or $22,500 (head of household). You should itemize only if your total itemized deductions exceed the standard deduction. Common itemized deductions include mortgage interest, state/local taxes (SALT, capped at $10,000), charitable donations, and medical expenses exceeding 7.5% of AGI. The SALT cap increases to $40,000 in 2026.",
    },
    {
      id: "credits",
      type: "prose",
      title: "Tax Credits vs. Deductions",
      icon: "💰",
      content: "Tax credits directly reduce your tax bill dollar-for-dollar, making them more valuable than deductions. A $1,000 credit saves you $1,000, while a $1,000 deduction only saves you $220-$370 depending on your tax bracket. Key credits include: Child Tax Credit ($2,000 per child under 17), Earned Income Tax Credit (up to $8,046 for families), American Opportunity Tax Credit ($2,500 per student), and Saver's Credit (up to $1,000 for retirement contributions).",
    },
    {
      id: "strategies",
      type: "prose",
      title: "Tax Reduction Strategies",
      icon: "🎯",
      content: "Legal ways to reduce your tax burden include: maximizing 401(k) contributions ($23,500 limit in 2025), contributing to Traditional IRA ($7,000 limit), using HSA accounts for triple tax benefits, bunching charitable donations in alternating years to exceed the standard deduction, harvesting capital losses to offset gains, and timing income recognition between tax years. High earners should also consider qualified opportunity zone investments and donor-advised funds.",
    },
  ],

  // =============================================================================
  // FAQs
  // =============================================================================
  faqs: [
    {
      question: "What's the difference between marginal and effective tax rate?",
      answer: "Your marginal tax rate is the rate on your next dollar of income (your highest bracket). Your effective tax rate is the actual percentage of your total income paid in taxes. For example, someone in the 22% bracket might only have an effective rate of 12-15% because lower portions of their income are taxed at 10% and 12%.",
    },
    {
      question: "How is Social Security taxed?",
      answer: "Up to 85% of Social Security benefits may be taxable depending on your 'combined income' (AGI + nontaxable interest + half of SS benefits). For single filers, benefits become partially taxable above $25,000 and up to 85% taxable above $34,000. For married filing jointly, these thresholds are $32,000 and $44,000.",
    },
    {
      question: "What is the Net Investment Income Tax (NIIT)?",
      answer: "The NIIT is a 3.8% tax on investment income (interest, dividends, capital gains, rental income) for taxpayers with modified AGI exceeding $200,000 (single) or $250,000 (married filing jointly). It's applied to the lesser of your net investment income or the amount by which your MAGI exceeds the threshold.",
    },
    {
      question: "Should I take the standard deduction or itemize?",
      answer: "Take whichever is higher. Most taxpayers (about 90%) benefit from the standard deduction since the Tax Cuts and Jobs Act nearly doubled it. You should itemize if your mortgage interest, state/local taxes (up to $10,000), and charitable donations exceed the standard deduction amount.",
    },
    {
      question: "How does the Child Tax Credit work?",
      answer: "For 2025, the Child Tax Credit is $2,000 per qualifying child under 17, with up to $1,700 refundable as the Additional Child Tax Credit. The credit phases out by $50 for every $1,000 of income above $200,000 (single) or $400,000 (married filing jointly).",
    },
    {
      question: "What states have no income tax?",
      answer: "Nine states have no income tax: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. However, these states often have higher sales or property taxes to compensate. New Hampshire and Washington have limited taxes on certain investment income.",
    },
  ],

  // =============================================================================
  // REFERENCES
  // =============================================================================
  references: [
    {
      authors: "Internal Revenue Service",
      year: "2024",
      title: "Revenue Procedure 2024-40: 2025 Tax Brackets and Rates",
      source: "IRS.gov",
      url: "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2025",
    },
    {
      authors: "Tax Foundation",
      year: "2025",
      title: "2025 Tax Brackets and Federal Income Tax Rates",
      source: "Tax Foundation",
      url: "https://taxfoundation.org/data/all/federal/2025-tax-brackets/",
    },
  ],

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "finance" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["paycheck-calculator", "retirement-calculator", "roth-ira-calculator", "mortgage-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateIncomeTax(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;
  
  // Extract values
  const taxYear = (values.taxYear as string) || "2025";
  const filingStatus = (values.filingStatus as string) || "single";
  const state = (values.state as string) || "CA";
  const age = (values.age as number) || 35;
  const spouseAge = (values.spouseAge as number) || 35;
  
  const wages = (values.wages as number) || 0;
  const spouseWages = filingStatus === "married" ? ((values.spouseWages as number) || 0) : 0;
  const businessIncome = (values.businessIncome as number) || 0;
  const taxableInterest = (values.taxableInterest as number) || 0;
  const ordinaryDividends = (values.ordinaryDividends as number) || 0;
  const qualifiedDividends = (values.qualifiedDividends as number) || 0;
  const shortTermGains = (values.shortTermGains as number) || 0;
  const longTermGains = (values.longTermGains as number) || 0;
  const rentalIncome = (values.rentalIncome as number) || 0;
  const socialSecurityBenefits = (values.socialSecurityBenefits as number) || 0;
  const otherIncome = (values.otherIncome as number) || 0;
  
  const contribution401k = (values.contribution401k as number) || 0;
  const contributionIRA = (values.contributionIRA as number) || 0;
  const contributionHSA = (values.contributionHSA as number) || 0;
  const studentLoanInterest = (values.studentLoanInterest as number) || 0;
  
  const deductionType = (values.deductionType as string) || "standard";
  const mortgageInterest = (values.mortgageInterest as number) || 0;
  const propertyTax = (values.propertyTax as number) || 0;
  const stateLocalTaxPaid = (values.stateLocalTaxPaid as number) || 0;
  const charitableCash = (values.charitableCash as number) || 0;
  const medicalExpenses = (values.medicalExpenses as number) || 0;
  
  const childrenUnder17 = (values.childrenUnder17 as number) || 0;
  const childCareExpenses = (values.childCareExpenses as number) || 0;
  const numStudents = (values.numStudents as number) || 0;
  
  const federalWithheld = (values.federalWithheld as number) || 0;
  const estimatedPayments = (values.estimatedPayments as number) || 0;
  
  // Get tax year data
  const taxData = TAX_DATA[taxYear];
  const brackets = taxData.brackets[filingStatus] || taxData.brackets.single;
  const ltcgBrackets = taxData.ltcgBrackets[filingStatus] || taxData.ltcgBrackets.single;
  
  // =========================================================================
  // 1. CALCULATE GROSS INCOME
  // =========================================================================
  const totalWages = wages + spouseWages;
  const investmentIncome = taxableInterest + ordinaryDividends + shortTermGains;
  
  // Social Security taxable portion (up to 85%)
  const combinedIncome = totalWages + taxableInterest + ordinaryDividends + (socialSecurityBenefits * 0.5);
  const ssThreshold1 = filingStatus === "married" ? 32000 : 25000;
  const ssThreshold2 = filingStatus === "married" ? 44000 : 34000;
  let taxableSS = 0;
  if (combinedIncome > ssThreshold2) {
    taxableSS = Math.min(socialSecurityBenefits * 0.85, 4500 + (combinedIncome - ssThreshold2) * 0.85);
  } else if (combinedIncome > ssThreshold1) {
    taxableSS = Math.min(socialSecurityBenefits * 0.5, (combinedIncome - ssThreshold1) * 0.5);
  }
  
  const grossIncome = totalWages + investmentIncome + qualifiedDividends + longTermGains + 
                      businessIncome + rentalIncome + taxableSS + otherIncome;
  
  // =========================================================================
  // 2. SELF-EMPLOYMENT TAX
  // =========================================================================
  const seIncome = businessIncome * 0.9235;
  const seTax = businessIncome > 0 
    ? Math.min(seIncome, taxData.socialSecurityCap) * 0.124 + seIncome * 0.029 
    : 0;
  const seDeduction = seTax / 2;
  
  // =========================================================================
  // 3. ADJUSTMENTS TO INCOME (AGI)
  // =========================================================================
  const cap401k = Math.min(contribution401k, taxData.fourOhOneKLimit);
  const capIRA = Math.min(contributionIRA, taxData.iraLimit);
  const capHSA = Math.min(contributionHSA, filingStatus === "married" ? taxData.hsaLimit.family : taxData.hsaLimit.individual);
  const capStudentLoan = Math.min(studentLoanInterest, 2500);
  
  const totalAdjustments = cap401k + capIRA + capHSA + capStudentLoan + seDeduction;
  const agi = Math.max(0, grossIncome - totalAdjustments);
  
  // =========================================================================
  // 4. DEDUCTIONS
  // =========================================================================
  let standardDeduction = taxData.standardDeduction[filingStatus] || taxData.standardDeduction.single;
  const addDeduction = filingStatus === "single" || filingStatus === "head" 
    ? taxData.additionalStdDeduction.single 
    : taxData.additionalStdDeduction.married;
  
  if (age >= 65) standardDeduction += addDeduction;
  if (filingStatus === "married" && spouseAge >= 65) standardDeduction += addDeduction;
  
  // Itemized deductions
  const deductibleMedical = Math.max(0, medicalExpenses - agi * 0.075);
  const saltCapped = Math.min(stateLocalTaxPaid + propertyTax, taxData.saltCap);
  const itemizedTotal = deductibleMedical + saltCapped + mortgageInterest + charitableCash;
  
  const actualDeduction = deductionType === "standard" ? standardDeduction : Math.max(itemizedTotal, standardDeduction);
  const deductionUsed = deductionType === "standard" || itemizedTotal <= standardDeduction ? "Standard" : "Itemized";
  
  // =========================================================================
  // 5. TAXABLE INCOME
  // =========================================================================
  const ordinaryTaxable = Math.max(0, agi - actualDeduction - longTermGains - qualifiedDividends);
  const totalTaxable = Math.max(0, agi - actualDeduction);
  
  // =========================================================================
  // 6. FEDERAL TAX ON ORDINARY INCOME
  // =========================================================================
  let fedTax = 0;
  let remaining = ordinaryTaxable;
  let marginalRate = 0.10;
  
  for (const bracket of brackets) {
    if (remaining <= 0) break;
    const inBracket = Math.min(remaining, bracket.max - bracket.min);
    fedTax += inBracket * bracket.rate;
    marginalRate = bracket.rate;
    remaining -= inBracket;
  }
  
  // =========================================================================
  // 7. CAPITAL GAINS TAX
  // =========================================================================
  let ltcgTax = 0;
  const ltcg = longTermGains + qualifiedDividends;
  if (ltcg > 0) {
    let ltcgRemaining = ltcg;
    let stackedIncome = ordinaryTaxable;
    
    for (const bracket of ltcgBrackets) {
      if (ltcgRemaining <= 0) break;
      const spaceInBracket = Math.max(0, bracket.max - stackedIncome);
      const ltcgInBracket = Math.min(ltcgRemaining, spaceInBracket);
      ltcgTax += ltcgInBracket * bracket.rate;
      stackedIncome += ltcgInBracket;
      ltcgRemaining -= ltcgInBracket;
    }
  }
  
  // =========================================================================
  // 8. NET INVESTMENT INCOME TAX (NIIT) - 3.8%
  // =========================================================================
  const niitThreshold = filingStatus === "married" ? 250000 : (filingStatus === "marriedSeparate" ? 125000 : 200000);
  const niitIncome = taxableInterest + ordinaryDividends + qualifiedDividends + shortTermGains + longTermGains + rentalIncome;
  const niit = agi > niitThreshold ? Math.min(niitIncome, agi - niitThreshold) * 0.038 : 0;
  
  // =========================================================================
  // 9. FICA TAXES
  // =========================================================================
  const ssTax = Math.min(totalWages, taxData.socialSecurityCap) * 0.062;
  const medicareTax = totalWages * 0.0145;
  const additionalMedicare = totalWages > (filingStatus === "married" ? 250000 : 200000)
    ? (totalWages - (filingStatus === "married" ? 250000 : 200000)) * 0.009 
    : 0;
  const fica = ssTax + medicareTax + additionalMedicare;
  
  // =========================================================================
  // 10. STATE TAX
  // =========================================================================
  const stateRate = STATE_TAX[state]?.rate || 0;
  const stateTax = totalTaxable * stateRate;
  
  // =========================================================================
  // 11. TAX CREDITS
  // =========================================================================
  // Child Tax Credit
  const ctcPhaseout = filingStatus === "married" ? 400000 : 200000;
  const ctcReduction = Math.max(0, Math.floor((agi - ctcPhaseout) / 1000) * 50);
  const maxCTC = childrenUnder17 * taxData.childTaxCredit;
  const ctc = Math.max(0, maxCTC - ctcReduction);
  
  // Child Care Credit
  const maxCareExpenses = childrenUnder17 >= 2 ? 6000 : 3000;
  const cappedCare = Math.min(childCareExpenses, maxCareExpenses);
  const careRate = agi <= 15000 ? 0.35 : Math.max(0.20, 0.35 - Math.floor((agi - 15000) / 2000) * 0.01);
  const childCareCredit = cappedCare * careRate;
  
  // American Opportunity Tax Credit (AOTC)
  const aotc = numStudents > 0 ? numStudents * 2500 : 0;
  
  // Saver's Credit
  const saverBase = Math.min(contribution401k + contributionIRA, filingStatus === "married" ? 4000 : 2000);
  const saverRate = agi <= (filingStatus === "married" ? 46000 : 23000) ? 0.50 :
                   agi <= (filingStatus === "married" ? 50000 : 25000) ? 0.20 :
                   agi <= (filingStatus === "married" ? 76500 : 38250) ? 0.10 : 0;
  const saverCredit = saverBase * saverRate;
  
  const totalCredits = Math.min(ctc + childCareCredit + aotc + saverCredit, fedTax + ltcgTax);
  
  // =========================================================================
  // 12. TOTAL TAX
  // =========================================================================
  const totalFederalTax = Math.max(0, fedTax + ltcgTax + niit + seTax - totalCredits);
  const totalTax = totalFederalTax + stateTax + fica;
  
  // =========================================================================
  // 13. REFUND OR AMOUNT OWED
  // =========================================================================
  const totalPayments = federalWithheld + estimatedPayments;
  const refundOrOwe = totalPayments - totalFederalTax;
  
  // =========================================================================
  // 14. TAKE-HOME PAY
  // =========================================================================
  const takeHomePay = grossIncome - totalTax;
  const monthlyTakeHome = takeHomePay / 12;
  
  // =========================================================================
  // 15. EFFECTIVE TAX RATE
  // =========================================================================
  const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;
  
  // Format currency
  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  
  return {
    values: {
      totalTax,
      refundOrOwe,
      effectiveRate,
      marginalRate: marginalRate * 100,
      federalTax: totalFederalTax,
      stateTax,
      ficaTax: fica,
      selfEmploymentTax: seTax,
      capitalGainsTax: ltcgTax,
      niit,
      totalCredits,
      takeHomePay,
      monthlyTakeHome,
      taxableIncome: totalTaxable,
      agi,
      deduction: actualDeduction,
    },
    formatted: {
      totalTax: `$${fmt(totalTax)}`,
      refundOrOwe: refundOrOwe >= 0 
        ? `Refund: $${fmt(refundOrOwe)}` 
        : `Owe: $${fmt(Math.abs(refundOrOwe))}`,
      effectiveRate: `${effectiveRate.toFixed(1)}%`,
      marginalRate: `${(marginalRate * 100).toFixed(0)}%`,
      federalTax: `$${fmt(totalFederalTax)}`,
      stateTax: `$${fmt(stateTax)} (${STATE_TAX[state]?.name || state})`,
      ficaTax: `$${fmt(fica)}`,
      selfEmploymentTax: seTax > 0 ? `$${fmt(seTax)}` : "N/A",
      capitalGainsTax: ltcgTax > 0 ? `$${fmt(ltcgTax)}` : "N/A",
      niit: niit > 0 ? `$${fmt(niit)}` : "N/A",
      totalCredits: totalCredits > 0 ? `-$${fmt(totalCredits)}` : "$0",
      takeHomePay: `$${fmt(takeHomePay)}/year`,
      monthlyTakeHome: `$${fmt(monthlyTakeHome)}/month`,
      taxableIncome: `$${fmt(totalTaxable)}`,
      agi: `$${fmt(agi)}`,
      deduction: `$${fmt(actualDeduction)} (${deductionUsed})`,
    },
    summary: `Your total ${taxYear} tax liability is $${fmt(totalTax)} (${effectiveRate.toFixed(1)}% effective rate). ` +
             (refundOrOwe >= 0 
               ? `Based on withholdings, you're due a refund of $${fmt(refundOrOwe)}.`
               : `Based on withholdings, you owe $${fmt(Math.abs(refundOrOwe))}.`),
    isValid: true,
    metadata: {
      taxYear,
      filingStatus,
      state,
      brackets: brackets.map(b => ({
        rate: `${(b.rate * 100).toFixed(0)}%`,
        range: `$${fmt(b.min)} - ${b.max === Infinity ? "∞" : `$${fmt(b.max)}`}`,
      })),
    },
  };
}

export default incomeTaxConfig;
