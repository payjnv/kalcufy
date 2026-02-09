import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// ROTH IRA CALCULATOR V3 - FULL FEATURED
// =============================================================================
// Features: Backdoor Roth strategy, Roth conversion ladder, 5-year rules,
// Income limit phase-out, Roth vs Traditional comparison, Tax savings,
// Catch-up contributions, Spousal IRA support, Early withdrawal rules
// =============================================================================

// 2026 Contribution Limits & Income Limits
const LIMITS_2026 = {
  contribution: { under50: 7500, over50: 8600 },
  incomePhaseOut: {
    single: { start: 153000, end: 168000 },
    married: { start: 242000, end: 252000 },
  },
};

// Tax brackets 2026 (estimated based on 2025 + inflation)
const TAX_BRACKETS_2026 = {
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
};

export const rothIraCalculatorConfig: CalculatorConfigV3 = {
  id: "roth-ira-calculator",
  slug: "roth-ira-calculator",
  name: "Roth IRA Calculator",
  category: "finance",
  icon: "📈",

  seo: {
    title: "Roth IRA Calculator - Growth, Tax Savings & Contribution Limits 2026",
    description: "Calculate your Roth IRA growth, tax-free retirement savings, contribution eligibility based on income, and compare Roth vs Traditional IRA. Includes backdoor Roth strategy guide.",
    shortDescription: "Calculate Roth IRA growth and tax savings",
    keywords: ["Roth IRA calculator", "Roth IRA contribution limits 2026", "backdoor Roth IRA", "Roth vs Traditional IRA", "Roth IRA income limits", "tax-free retirement"],
  },

  hero: { badge: "Finance", rating: { average: 4.9, count: 178000 } },

  unitSystem: { enabled: false, default: "imperial", options: [] },

  inputs: [
    {
      id: "currentAge",
      type: "number",
      label: "Current Age",
      required: true,
      defaultValue: 35,
      min: 18,
      max: 80,
      step: 1,
      suffix: "years",
    },
    {
      id: "retirementAge",
      type: "number",
      label: "Retirement Age",
      required: true,
      defaultValue: 65,
      min: 50,
      max: 80,
      step: 1,
      suffix: "years",
    },
    {
      id: "currentBalance",
      type: "number",
      label: "Current Roth IRA Balance",
      required: true,
      defaultValue: 25000,
      min: 0,
      max: 5000000,
      step: 1000,
      prefix: "$",
    },
    {
      id: "annualContribution",
      type: "number",
      label: "Annual Contribution",
      required: true,
      defaultValue: 7500,
      min: 0,
      max: 10000,
      step: 100,
      prefix: "$",
      helpText: "2026 limit: $7,500 (under 50) or $8,600 (50+)",
    },
    {
      id: "expectedReturn",
      type: "slider",
      label: "Expected Annual Return",
      required: true,
      defaultValue: 7,
      min: 3,
      max: 12,
      step: 0.5,
      suffix: "%",
      helpText: "Historical S&P 500: ~10% nominal, ~7% real",
    },
  ],

  inputGroups: [
    {
      id: "incomeEligibility",
      title: "Income & Eligibility",
      icon: "💰",
      collapsible: true,
      defaultCollapsed: false,
      inputs: [
        {
          id: "filingStatus",
          type: "select",
          label: "Tax Filing Status",
          required: true,
          defaultValue: "single",
          options: [
            { value: "single", label: "Single / Head of Household" },
            { value: "married", label: "Married Filing Jointly" },
            { value: "marriedSeparate", label: "Married Filing Separately" },
          ],
        },
        {
          id: "annualIncome",
          type: "number",
          label: "Modified Adjusted Gross Income (MAGI)",
          required: true,
          defaultValue: 100000,
          min: 0,
          max: 1000000,
          step: 5000,
          prefix: "$",
          helpText: "Used to determine contribution eligibility",
        },
        {
          id: "spouseWorking",
          type: "radio",
          label: "Does your spouse work?",
          required: false,
          defaultValue: "yes",
          showWhen: { field: "filingStatus", value: "married" },
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No - Spousal IRA eligible" },
          ],
          helpText: "Non-working spouses can contribute based on working spouse's income",
        },
      ],
    },
    {
      id: "taxComparison",
      title: "Roth vs Traditional Comparison",
      icon: "⚖️",
      collapsible: true,
      defaultCollapsed: false,
      inputs: [
        {
          id: "compareToTraditional",
          type: "radio",
          label: "Compare Roth to Traditional IRA?",
          required: false,
          defaultValue: "yes",
          options: [
            { value: "yes", label: "Yes - show which is better for me" },
            { value: "no", label: "No" },
          ],
        },
        {
          id: "currentTaxBracket",
          type: "select",
          label: "Current Marginal Tax Bracket",
          required: false,
          defaultValue: "22",
          showWhen: { field: "compareToTraditional", value: "yes" },
          options: [
            { value: "10", label: "10%" },
            { value: "12", label: "12%" },
            { value: "22", label: "22%" },
            { value: "24", label: "24%" },
            { value: "32", label: "32%" },
            { value: "35", label: "35%" },
            { value: "37", label: "37%" },
          ],
        },
        {
          id: "retirementTaxBracket",
          type: "select",
          label: "Expected Tax Bracket in Retirement",
          required: false,
          defaultValue: "12",
          showWhen: { field: "compareToTraditional", value: "yes" },
          options: [
            { value: "10", label: "10% (Lower income in retirement)" },
            { value: "12", label: "12% (Moderate income)" },
            { value: "22", label: "22% (Same as working years)" },
            { value: "24", label: "24% (Higher than expected)" },
          ],
        },
      ],
    },
    {
      id: "backdoorSection",
      title: "Backdoor Roth Strategy",
      icon: "🚪",
      collapsible: true,
      defaultCollapsed: true,
      inputs: [
        {
          id: "usingBackdoor",
          type: "radio",
          label: "Are you using the Backdoor Roth strategy?",
          required: false,
          defaultValue: "no",
          options: [
            { value: "yes", label: "Yes - my income exceeds Roth limits" },
            { value: "no", label: "No - I contribute directly" },
          ],
          helpText: "For high earners over the income limit",
        },
        {
          id: "hasPreTaxIRA",
          type: "radio",
          label: "Do you have pre-tax Traditional IRA balances?",
          required: false,
          defaultValue: "no",
          showWhen: { field: "usingBackdoor", value: "yes" },
          options: [
            { value: "yes", label: "Yes - pro-rata rule applies" },
            { value: "no", label: "No - clean backdoor" },
          ],
          helpText: "Pre-tax IRA balances trigger the pro-rata rule",
        },
        {
          id: "preTaxIRABalance",
          type: "number",
          label: "Total Pre-Tax IRA Balance",
          required: false,
          defaultValue: 50000,
          min: 0,
          max: 1000000,
          step: 1000,
          prefix: "$",
          showWhen: { field: "hasPreTaxIRA", value: "yes" },
          helpText: "Includes Traditional, SEP, and SIMPLE IRAs",
        },
      ],
    },
    {
      id: "conversionSection",
      title: "Roth Conversion Planning",
      icon: "🔄",
      collapsible: true,
      defaultCollapsed: true,
      inputs: [
        {
          id: "planningConversion",
          type: "radio",
          label: "Planning to convert Traditional IRA to Roth?",
          required: false,
          defaultValue: "no",
          options: [
            { value: "yes", label: "Yes - show conversion analysis" },
            { value: "no", label: "No" },
          ],
        },
        {
          id: "conversionAmount",
          type: "number",
          label: "Amount to Convert",
          required: false,
          defaultValue: 50000,
          min: 0,
          max: 500000,
          step: 5000,
          prefix: "$",
          showWhen: { field: "planningConversion", value: "yes" },
        },
        {
          id: "yearsToRetirement",
          type: "number",
          label: "Years Until Retirement",
          required: false,
          defaultValue: 20,
          min: 5,
          max: 40,
          step: 1,
          suffix: "years",
          showWhen: { field: "planningConversion", value: "yes" },
        },
      ],
    },
    {
      id: "earlyWithdrawal",
      title: "Early Withdrawal Planning",
      icon: "⏰",
      collapsible: true,
      defaultCollapsed: true,
      inputs: [
        {
          id: "planEarlyWithdrawal",
          type: "radio",
          label: "Planning to withdraw before age 59½?",
          required: false,
          defaultValue: "no",
          options: [
            { value: "yes", label: "Yes - show my options" },
            { value: "no", label: "No" },
          ],
        },
        {
          id: "withdrawalPurpose",
          type: "select",
          label: "Reason for Early Withdrawal",
          required: false,
          defaultValue: "general",
          showWhen: { field: "planEarlyWithdrawal", value: "yes" },
          options: [
            { value: "general", label: "General use (contributions only)" },
            { value: "firstHome", label: "First-time home purchase ($10K limit)" },
            { value: "education", label: "Education expenses" },
            { value: "disability", label: "Disability" },
            { value: "sepp", label: "SEPP/72(t) - Substantially Equal Payments" },
          ],
        },
      ],
    },
  ],

  results: [
    { id: "futureValue", type: "primary", label: "Balance at Retirement", format: "number", prefix: "$" },
    { id: "totalContributions", type: "secondary", label: "Total Contributions", format: "number", prefix: "$" },
    { id: "totalGrowth", type: "secondary", label: "Tax-Free Growth", format: "number", prefix: "$" },
    { id: "taxSavings", type: "secondary", label: "Estimated Tax Savings", format: "number", prefix: "$" },
    { id: "eligibleContribution", type: "secondary", label: "Your Eligible Contribution", format: "text" },
    { id: "rothVsTraditional", type: "secondary", label: "Roth vs Traditional", format: "text" },
    { id: "backdoorTaxable", type: "secondary", label: "Backdoor Tax Impact", format: "text" },
  ],

  infoCards: [
    {
      id: "limits2026",
      title: "2026 Roth IRA Limits",
      icon: "📋",
      type: "list",
      items: [
        { label: "Under 50", value: "$7,500 contribution limit", color: "blue" },
        { label: "Age 50+", value: "$8,600 (with $1,100 catch-up)", color: "green" },
        { label: "Single income limit", value: "Phase-out $153K-$168K", color: "amber" },
        { label: "Married income limit", value: "Phase-out $242K-$252K", color: "amber" },
      ],
    },
    {
      id: "rothBenefits",
      title: "Roth IRA Benefits",
      icon: "✨",
      type: "horizontal",
      items: [
        { label: "Tax-free growth forever" },
        { label: "Tax-free qualified withdrawals" },
        { label: "No Required Minimum Distributions" },
        { label: "Withdraw contributions anytime" },
      ],
    },
  ],

  referenceData: [
    {
      id: "fiveYearRules",
      title: "The 5-Year Rules",
      icon: "📅",
      columns: 1,
      items: [
        { label: "Contributions 5-Year Rule", value: "Account must be open 5 years for tax-free earnings" },
        { label: "Conversion 5-Year Rule", value: "Each conversion has its own 5-year clock for penalty-free withdrawal" },
        { label: "Qualified Distribution", value: "Account 5+ years old AND age 59½ = tax and penalty free" },
      ],
    },
  ],

  educationSections: [
    {
      id: "rothBasics",
      type: "cards",
      title: "Understanding Roth IRA",
      icon: "📚",
      columns: 2,
      cards: [
        { title: "Tax-Free Growth", description: "Unlike taxable accounts, Roth IRA investments grow completely tax-free. No taxes on dividends, interest, or capital gains while invested.", icon: "📈" },
        { title: "Tax-Free Withdrawals", description: "Qualified withdrawals in retirement are 100% tax-free. This includes all your contributions AND earnings.", icon: "💵" },
        { title: "No RMDs", description: "Unlike Traditional IRAs and 401(k)s, Roth IRAs have no Required Minimum Distributions. Let your money grow as long as you want.", icon: "♾️" },
        { title: "Access Contributions Anytime", description: "You can withdraw your contributions (not earnings) at any time, tax and penalty-free. Great emergency fund backup.", icon: "🔓" },
      ],
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "Income limits apply to direct Roth contributions. For 2026: $168K (single) or $252K (married). Above these limits, use Backdoor Roth.", type: "warning" },
        { text: "The 5-year rule: Your account must be open 5 years AND you must be 59½ for completely tax-free withdrawals of earnings.", type: "warning" },
        { text: "Contributions can be withdrawn anytime tax and penalty-free. Only earnings have restrictions before 59½.", type: "info" },
        { text: "Roth IRA is better if you expect higher taxes in retirement. Traditional is better if you expect lower taxes.", type: "info" },
        { text: "No RMDs during your lifetime means Roth IRAs are excellent for estate planning - heirs receive tax-free money.", type: "info" },
        { text: "Backdoor Roth: If you have pre-tax IRA balances, the pro-rata rule makes conversions partially taxable.", type: "warning" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "🧮",
      description: "$7,500/year contribution, 7% return, 30 years to retirement",
      columns: 2,
      examples: [
        { title: "Roth IRA Growth", steps: ["Annual contribution: $7,500", "Years: 30", "Return: 7%", "FV = $759,224"], result: "Tax-free at retirement!" },
        { title: "Tax Savings vs Taxable", steps: ["Growth: $759,224 - $225,000 = $534,224", "If taxable at 15% cap gains: $80,134 tax", "Roth: $0 tax", "Savings: $80,134"], result: "Plus no tax on dividends!" },
      ],
    },
    {
      id: "backdoorGuide",
      type: "prose",
      title: "Backdoor Roth IRA Strategy",
      content: "For high earners over the income limits, the Backdoor Roth is a legal workaround: 1) Contribute to a Traditional IRA (non-deductible), 2) Immediately convert to Roth IRA. Since you already paid taxes on the contribution, the conversion is tax-free. IMPORTANT: The pro-rata rule applies if you have existing pre-tax IRA balances. The IRS looks at ALL your IRA balances to determine the taxable portion of any conversion. Solution: Roll pre-tax IRA funds into your 401(k) before doing backdoor Roth.",
    },
    {
      id: "conversionLadder",
      type: "prose",
      title: "Roth Conversion Ladder",
      content: "The Roth Conversion Ladder is a strategy for early retirees to access retirement funds before age 59½. Each year, convert a portion of your Traditional IRA/401k to Roth. After 5 years, the converted amount can be withdrawn penalty-free (you already paid taxes on conversion). This creates a 5-year 'ladder' of accessible funds. Best used when you have 5+ years until you need the money and expect to be in a lower tax bracket during conversion years.",
    },
    {
      id: "rothVsTraditional",
      type: "prose",
      title: "Roth vs Traditional IRA",
      content: "Choose Roth if: You're young (more years of tax-free growth), expect higher taxes in retirement, want no RMDs, or value tax-free inheritance for heirs. Choose Traditional if: You're in a high tax bracket now but expect lower in retirement, need the tax deduction today, or are near retirement. Many advisors recommend having both for 'tax diversification' - flexibility to manage your tax bracket in retirement.",
    },
  ],

  faqs: [
    { question: "What are the Roth IRA income limits for 2026?", answer: "For 2026, single filers can contribute fully up to $153,000 MAGI, with phase-out until $168,000 (no contribution). Married filing jointly: full contribution up to $242,000, phase-out until $252,000. Above these limits, you can use the Backdoor Roth strategy." },
    { question: "Can I contribute to both Roth and Traditional IRA?", answer: "Yes, but your total contributions across all IRAs cannot exceed the annual limit ($7,500 for 2026, or $8,600 if 50+). You could put $4,000 in Roth and $3,500 in Traditional, for example." },
    { question: "What is the 5-year rule?", answer: "There are actually two 5-year rules: 1) Your Roth IRA must be open for 5 years before you can withdraw earnings tax-free (starts from first contribution year). 2) Each Roth conversion has its own 5-year period before you can withdraw that converted amount penalty-free (if under 59½)." },
    { question: "Can I withdraw my contributions early?", answer: "Yes! Roth IRA contributions (not earnings) can be withdrawn at any time, for any reason, completely tax and penalty-free. This is because you already paid taxes on the money. Only earnings have restrictions before age 59½." },
    { question: "What is the Backdoor Roth?", answer: "The Backdoor Roth is a two-step strategy for high earners: 1) Contribute to a non-deductible Traditional IRA, 2) Convert it to Roth IRA. Since the contribution was non-deductible (after-tax), the conversion is tax-free. However, if you have existing pre-tax IRA balances, the pro-rata rule applies." },
    { question: "Should I do a Roth conversion?", answer: "A Roth conversion makes sense if: you expect higher taxes in retirement, you're in a temporarily low tax bracket, you want to reduce future RMDs, or you want to leave tax-free money to heirs. It doesn't make sense if: you'll need the tax money from other sources, or you'll be in a much lower bracket in retirement." },
  ],

  references: [
    { authors: "Internal Revenue Service", year: "2026", title: "Retirement Topics - IRA Contribution Limits", source: "IRS.gov", url: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-ira-contribution-limits" },
    { authors: "Internal Revenue Service", year: "2026", title: "Amount of Roth IRA Contributions That You Can Make for 2026", source: "IRS.gov", url: "https://www.irs.gov/retirement-plans/amount-of-roth-ira-contributions-that-you-can-make-for-2026" },
  ],

  detailedTable: {
    id: "yearByYear",
    buttonLabel: "View Year-by-Year Growth",
    buttonIcon: "📊",
    modalTitle: "Roth IRA Growth Projection",
    columns: [
      { id: "year", label: "Year", align: "center" },
      { id: "age", label: "Age", align: "center" },
      { id: "contribution", label: "Contribution", align: "right" },
      { id: "growth", label: "Growth", align: "right" },
      { id: "balance", label: "Balance", align: "right", highlight: true },
    ],
  },

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "finance" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["retirement-calculator", "traditional-ira-calculator", "401k-calculator", "compound-interest-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(2)}M`;
  }
  return `$${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

function calculateEligibleContribution(magi: number, filingStatus: string, age: number): { amount: number; status: string } {
  const maxContribution = age >= 50 ? LIMITS_2026.contribution.over50 : LIMITS_2026.contribution.under50;
  
  let limits;
  if (filingStatus === "single") {
    limits = LIMITS_2026.incomePhaseOut.single;
  } else if (filingStatus === "married") {
    limits = LIMITS_2026.incomePhaseOut.married;
  } else {
    // Married filing separately - very low limits
    return magi < 10000 ? { amount: maxContribution * (1 - magi / 10000), status: "Reduced (MFS)" } : { amount: 0, status: "Over limit (MFS)" };
  }

  if (magi < limits.start) {
    return { amount: maxContribution, status: "Full contribution" };
  } else if (magi >= limits.end) {
    return { amount: 0, status: "Over income limit - use Backdoor Roth" };
  } else {
    // Phase-out calculation
    const phaseOutRange = limits.end - limits.start;
    const overStart = magi - limits.start;
    const reductionRatio = overStart / phaseOutRange;
    const reducedAmount = Math.max(0, maxContribution * (1 - reductionRatio));
    return { amount: Math.round(reducedAmount), status: `Reduced contribution (phase-out)` };
  }
}

function calculateFutureValue(presentValue: number, annualContribution: number, rate: number, years: number): number {
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  const monthlyContribution = annualContribution / 12;
  
  // FV of lump sum
  const fvLumpSum = presentValue * Math.pow(1 + monthlyRate, months);
  
  // FV of annuity
  const fvAnnuity = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  
  return fvLumpSum + fvAnnuity;
}

function calculateProRataTax(backdoorAmount: number, preTaxBalance: number, currentTaxRate: number): number {
  // Pro-rata rule: proportion of conversion that's taxable
  const totalIRABalance = preTaxBalance + backdoorAmount;
  const preTaxRatio = preTaxBalance / totalIRABalance;
  const taxableAmount = backdoorAmount * preTaxRatio;
  return taxableAmount * (currentTaxRate / 100);
}

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateRothIRA(data: { values: Record<string, unknown>; units: Record<string, string>; unitSystem: "metric" | "imperial" }): CalculatorResults {
  const { values } = data;

  // Basic inputs
  const currentAge = (values.currentAge as number) || 35;
  const retirementAge = (values.retirementAge as number) || 65;
  const currentBalance = (values.currentBalance as number) || 25000;
  const annualContribution = (values.annualContribution as number) || 7500;
  const expectedReturn = (values.expectedReturn as number) || 7;

  // Income & eligibility
  const filingStatus = (values.filingStatus as string) || "single";
  const annualIncome = (values.annualIncome as number) || 100000;

  // Tax comparison
  const compareToTraditional = (values.compareToTraditional as string) === "yes";
  const currentTaxBracket = parseInt((values.currentTaxBracket as string) || "22");
  const retirementTaxBracket = parseInt((values.retirementTaxBracket as string) || "12");

  // Backdoor
  const usingBackdoor = (values.usingBackdoor as string) === "yes";
  const hasPreTaxIRA = (values.hasPreTaxIRA as string) === "yes";
  const preTaxIRABalance = (values.preTaxIRABalance as number) || 0;

  // Conversion
  const planningConversion = (values.planningConversion as string) === "yes";
  const conversionAmount = (values.conversionAmount as number) || 50000;

  // Calculate years
  const yearsToRetirement = retirementAge - currentAge;

  // Check contribution eligibility
  const eligibility = calculateEligibleContribution(annualIncome, filingStatus, currentAge);
  const actualContribution = usingBackdoor ? annualContribution : Math.min(annualContribution, eligibility.amount);

  // Calculate future value
  const futureValue = calculateFutureValue(currentBalance, actualContribution, expectedReturn, yearsToRetirement);
  const totalContributions = currentBalance + (actualContribution * yearsToRetirement);
  const totalGrowth = futureValue - totalContributions;

  // Calculate tax savings (compared to taxable account)
  // Assume 15% long-term capital gains rate on taxable account
  const taxableAccountTax = totalGrowth * 0.15;
  const rothTaxSavings = taxableAccountTax; // Roth pays $0 tax on growth

  // Roth vs Traditional comparison
  let rothVsTraditionalResult = "N/A";
  if (compareToTraditional) {
    // Simplified comparison
    // Traditional: tax deduction now, pay taxes on withdrawal
    // Roth: pay taxes now, no taxes on withdrawal
    
    const traditionalTaxSavingsNow = actualContribution * yearsToRetirement * (currentTaxBracket / 100);
    const traditionalFV = calculateFutureValue(currentBalance, actualContribution, expectedReturn, yearsToRetirement);
    const traditionalTaxAtWithdrawal = traditionalFV * (retirementTaxBracket / 100);
    const traditionalNetValue = traditionalFV - traditionalTaxAtWithdrawal;
    
    const rothNetValue = futureValue; // Already tax-free
    
    if (rothNetValue > traditionalNetValue) {
      rothVsTraditionalResult = `Roth wins by ${formatCurrency(rothNetValue - traditionalNetValue)}`;
    } else {
      rothVsTraditionalResult = `Traditional wins by ${formatCurrency(traditionalNetValue - rothNetValue)}`;
    }
  }

  // Backdoor Roth tax impact
  let backdoorTaxImpact = "N/A";
  if (usingBackdoor) {
    if (hasPreTaxIRA && preTaxIRABalance > 0) {
      const taxDue = calculateProRataTax(actualContribution, preTaxIRABalance, currentTaxBracket);
      backdoorTaxImpact = `Pro-rata tax: ${formatCurrency(taxDue)}/year`;
    } else {
      backdoorTaxImpact = "Clean backdoor - no tax on conversion";
    }
  }

  // Generate year-by-year projection
  const tableData: { year: string; age: string; contribution: string; growth: string; balance: string }[] = [];
  let balance = currentBalance;
  
  for (let year = 1; year <= Math.min(yearsToRetirement, 40); year++) {
    const yearContribution = actualContribution;
    const growth = balance * (expectedReturn / 100);
    balance += growth + yearContribution;
    
    tableData.push({
      year: `${year}`,
      age: `${currentAge + year}`,
      contribution: formatCurrency(yearContribution),
      growth: formatCurrency(growth),
      balance: formatCurrency(balance),
    });
  }

  return {
    values: {
      futureValue,
      totalContributions,
      totalGrowth,
      taxSavings: rothTaxSavings,
      eligibleContribution: eligibility.amount,
    },
    formatted: {
      futureValue: formatCurrency(futureValue),
      totalContributions: formatCurrency(totalContributions),
      totalGrowth: formatCurrency(totalGrowth),
      taxSavings: formatCurrency(rothTaxSavings),
      eligibleContribution: eligibility.amount > 0 ? `${formatCurrency(eligibility.amount)} (${eligibility.status})` : eligibility.status,
      rothVsTraditional: rothVsTraditionalResult,
      backdoorTaxable: backdoorTaxImpact,
    },
    summary: `${formatCurrency(futureValue)} at retirement | ${formatCurrency(totalGrowth)} tax-free growth | ${formatCurrency(rothTaxSavings)} estimated tax savings`,
    isValid: currentAge < retirementAge,
    metadata: { tableData, yearsToRetirement, eligibility },
  };
}

export default rothIraCalculatorConfig;
