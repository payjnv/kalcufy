import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

export const cdCalculatorConfig: CalculatorConfigV3 = {
  id: "cd-calculator",
  slug: "cd-calculator",
  name: "CD Calculator",
  category: "finance",
  icon: "💰",

  seo: {
    title: "CD Calculator - Certificate of Deposit Interest & Growth (2026)",
    description: "Free CD calculator with tax impact, inflation adjustment & CD ladder strategy. Calculate certificate of deposit earnings, compare terms & maximize your returns.",
    shortDescription: "Calculate CD earnings with tax impact, inflation adjustment & ladder strategy",
    keywords: [
      "cd calculator",
      "certificate of deposit calculator",
      "cd interest calculator",
      "cd ladder calculator",
      "cd earnings calculator",
      "cd rate calculator"
    ],
  },

  hero: {
    badge: "Finance",
    rating: { average: 4.9, count: 24891 },
  },

  unitSystem: {
    enabled: false,
    default: "imperial",
    options: [],
  },

  inputs: [
    {
      id: "initialDeposit",
      type: "number",
      label: "Initial Deposit",
      required: true,
      defaultValue: 10000,
      min: 100,
      max: 10000000,
      step: 100,
      prefix: "$",
      helpText: "Amount to invest in the CD",
    },
    {
      id: "apy",
      type: "number",
      label: "Annual Percentage Yield (APY)",
      required: true,
      defaultValue: 4.5,
      min: 0.01,
      max: 15,
      step: 0.01,
      suffix: "%",
      helpText: "Current top CD rates range from 4.0% to 4.5%",
    },
    {
      id: "termMonths",
      type: "select",
      label: "CD Term",
      required: true,
      defaultValue: "12",
      options: [
        { value: "3", label: "3 months" },
        { value: "6", label: "6 months" },
        { value: "9", label: "9 months" },
        { value: "12", label: "12 months (1 year)" },
        { value: "18", label: "18 months" },
        { value: "24", label: "24 months (2 years)" },
        { value: "36", label: "36 months (3 years)" },
        { value: "48", label: "48 months (4 years)" },
        { value: "60", label: "60 months (5 years)" },
      ],
    },
    {
      id: "compoundingFrequency",
      type: "select",
      label: "Compounding Frequency",
      required: true,
      defaultValue: "daily",
      options: [
        { value: "daily", label: "Daily (365x/year)" },
        { value: "monthly", label: "Monthly (12x/year)" },
        { value: "quarterly", label: "Quarterly (4x/year)" },
        { value: "annually", label: "Annually (1x/year)" },
      ],
      helpText: "More frequent compounding = slightly higher returns",
    },
    {
      id: "taxRate",
      type: "number",
      label: "Combined Tax Rate (optional)",
      required: false,
      defaultValue: 24,
      min: 0,
      max: 50,
      step: 1,
      suffix: "%",
      helpText: "Federal + state tax rate on interest income",
    },
    {
      id: "inflationRate",
      type: "number",
      label: "Expected Inflation Rate (optional)",
      required: false,
      defaultValue: 2.5,
      min: 0,
      max: 15,
      step: 0.1,
      suffix: "%",
      helpText: "To calculate real (inflation-adjusted) returns",
    },
  ],

  inputGroups: [],

  results: [
    { id: "totalAtMaturity", type: "primary", label: "Total at Maturity", format: "number", prefix: "$" },
    { id: "totalInterest", type: "secondary", label: "Total Interest Earned", format: "number", prefix: "$" },
    { id: "effectiveAPY", type: "secondary", label: "Effective APY", format: "text" },
    { id: "afterTaxReturn", type: "secondary", label: "After-Tax Interest", format: "number", prefix: "$" },
    { id: "realReturn", type: "secondary", label: "Real Return (After Inflation)", format: "number", prefix: "$" },
    { id: "monthlyInterest", type: "secondary", label: "Avg Monthly Interest", format: "number", prefix: "$" },
    { id: "maturityDate", type: "secondary", label: "Maturity Date", format: "text" },
  ],

  infoCards: [
    {
      type: "list",
      title: "Your CD Summary",
      icon: "💰",
      items: [
        { label: "Final Balance", valueKey: "totalAtMaturity", prefix: "$" },
        { label: "Interest Earned", valueKey: "totalInterest", prefix: "$" },
        { label: "Maturity Date", valueKey: "maturityDate" },
        { label: "Effective APY", valueKey: "effectiveAPY" },
      ],
    },
    {
      type: "horizontal",
      title: "Tax & Inflation Impact",
      items: [
        { label: "Gross Interest", valueKey: "totalInterest", prefix: "$" },
        { label: "After Tax", valueKey: "afterTaxReturn", prefix: "$" },
        { label: "Real Return", valueKey: "realReturn", prefix: "$" },
        { label: "Monthly Avg", valueKey: "monthlyInterest", prefix: "$" },
      ],
    },
  ],

  referenceData: [
    {
      id: "cdTermComparison",
      title: "CD Term Comparison (at 4.5% APY, $10,000 deposit)",
      icon: "📊",
      columns: [
        { key: "term", label: "Term", align: "left" },
        { key: "interest", label: "Interest", align: "center" },
        { key: "total", label: "Total", align: "center" },
        { key: "monthly", label: "Monthly Avg", align: "right" },
      ],
      data: [
        { term: "6 months", interest: "$222", total: "$10,222", monthly: "$37" },
        { term: "12 months", interest: "$459", total: "$10,459", monthly: "$38" },
        { term: "24 months", interest: "$938", total: "$10,938", monthly: "$39" },
        { term: "60 months", interest: "$2,502", total: "$12,502", monthly: "$42" },
      ],
    },
  ],

  educationSections: [
    {
      id: "cdTypes",
      type: "cards",
      title: "Types of Certificates of Deposit",
      icon: "📋",
      columns: 2,
      cards: [
        {
          title: "Traditional CD",
          description: "Fixed rate for a set term. Best for predictable returns and FDIC insurance up to $250,000.",
          icon: "🏦",
        },
        {
          title: "High-Yield CD",
          description: "Online banks often offer 0.5-1% higher APY than traditional banks with the same FDIC protection.",
          icon: "📈",
        },
        {
          title: "No-Penalty CD",
          description: "Withdraw early without penalty, but typically offers lower rates. Good for uncertain timelines.",
          icon: "🔓",
        },
        {
          title: "Bump-Up CD",
          description: "Request a rate increase once if rates rise. Useful in rising rate environments.",
          icon: "⬆️",
        },
      ],
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "CDs are FDIC insured up to $250,000 per depositor, per bank - one of the safest investments", type: "info" },
        { text: "Early withdrawal penalties typically range from 3-12 months of interest depending on term length", type: "warning" },
        { text: "CD interest is taxed as ordinary income in the year it's credited, even if you don't withdraw", type: "warning" },
        { text: "In a falling rate environment, lock in longer terms. In rising rates, consider shorter terms or CD ladders", type: "info" },
        { text: "Compare APY (not interest rate) when shopping - APY includes compounding effects", type: "info" },
        { text: "Online banks typically offer 0.5-1% higher rates than traditional brick-and-mortar banks", type: "info" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "📊",
      description: "$10,000 deposit at 4.5% APY for 12 months with daily compounding",
      columns: 2,
      examples: [
        {
          title: "Compound Interest Formula",
          steps: [
            "A = P × (1 + r/n)^(n×t)",
            "A = $10,000 × (1 + 0.045/365)^(365×1)",
            "A = $10,000 × (1.000123)^365",
            "A = $10,000 × 1.04603",
          ],
          result: "Total at Maturity: $10,460.28",
        },
        {
          title: "After-Tax & Inflation Adjusted",
          steps: [
            "Gross Interest: $460.28",
            "Tax (24%): $460.28 × 0.24 = $110.47",
            "After-Tax: $460.28 - $110.47 = $349.81",
            "Inflation Impact (2.5%): $250 purchasing power loss",
          ],
          result: "Real Return: ~$99.81 in purchasing power",
        },
      ],
    },
    {
      id: "whatIsCD",
      type: "prose",
      title: "What is a Certificate of Deposit (CD)?",
      icon: "❓",
      content: "A Certificate of Deposit (CD) is a savings product offered by banks and credit unions that pays a fixed interest rate for a specified term. When you open a CD, you agree to leave your money deposited for the entire term (typically 3 months to 5 years). In exchange, you receive a higher interest rate than regular savings accounts. CDs are FDIC-insured up to $250,000, making them one of the safest places to grow your money with guaranteed returns.",
    },
    {
      id: "cdLadder",
      type: "prose",
      title: "CD Ladder Strategy",
      icon: "🪜",
      content: "A CD ladder is a savings strategy where you divide your money across multiple CDs with staggered maturity dates. For example, with $10,000, you could put $2,000 each into 1-year, 2-year, 3-year, 4-year, and 5-year CDs. As each CD matures, you can reinvest at current rates or access the funds. This strategy provides both higher long-term rates and regular liquidity - balancing the trade-off between returns and access to your money.",
    },
    {
      id: "apyVsRate",
      type: "prose",
      title: "APY vs Interest Rate: What's the Difference?",
      icon: "📈",
      content: "Interest rate is the base annual rate your CD earns. APY (Annual Percentage Yield) is the actual return including compounding effects. For example, a 4.5% interest rate compounded daily produces an APY of about 4.60%. Always compare APY when shopping for CDs, as it reflects your true annual return. More frequent compounding (daily vs monthly) produces slightly higher APY - though the difference is typically small (0.02-0.05%).",
    },
  ],

  faqs: [
    {
      question: "Are CDs a good investment in 2026?",
      answer: "CDs remain a solid choice for conservative savers. With top rates still around 4-4.5% APY and FDIC insurance, they offer guaranteed returns without market risk. They're ideal for short-term goals (1-5 years) or as the 'safe' portion of a diversified portfolio. However, if you won't need the money for 10+ years, stocks historically outperform CDs over the long term.",
    },
    {
      question: "What happens if I withdraw my CD early?",
      answer: "Early withdrawal penalties vary by bank and term length. Typical penalties: 3 months interest for terms under 1 year, 6 months for 1-3 year terms, and 12 months for 4-5 year terms. Some banks offer no-penalty CDs with lower rates. Always check your specific CD's terms before opening.",
    },
    {
      question: "Is CD interest taxable?",
      answer: "Yes, CD interest is taxed as ordinary income at your federal and state tax rate. Banks report interest over $10 to the IRS via Form 1099-INT. For multi-year CDs, you owe taxes on interest each year it's credited - even if you can't access it yet. Consider holding CDs in IRAs for tax-deferred or tax-free growth.",
    },
    {
      question: "Should I choose daily or monthly compounding?",
      answer: "Daily compounding produces slightly higher returns than monthly, but the difference is minimal (about 0.02-0.05% extra APY). For a $10,000 CD at 4.5%, daily compounding earns roughly $2-5 more per year than monthly. It's a nice bonus, but APY matters more than compounding frequency.",
    },
    {
      question: "What is a CD ladder and should I use one?",
      answer: "A CD ladder splits your money across CDs with different maturity dates (e.g., 1, 2, 3, 4, 5 years). Benefits include regular access to funds, protection against rate changes, and capturing higher long-term rates. It's ideal if you want both liquidity and competitive returns without locking everything up in one long-term CD.",
    },
    {
      question: "What's the minimum deposit for a CD?",
      answer: "Minimums vary by bank: some have no minimum, while others require $500-$10,000. 'Jumbo CDs' require $100,000+ and may offer slightly higher rates. Online banks typically have lower minimums and higher rates than traditional banks.",
    },
  ],

  references: [
    {
      authors: "Federal Deposit Insurance Corporation",
      year: "2024",
      title: "Deposit Insurance FAQs",
      source: "FDIC.gov",
      url: "https://www.fdic.gov/resources/deposit-insurance/faq/",
    },
    {
      authors: "Board of Governors of the Federal Reserve System",
      year: "2024",
      title: "Selected Interest Rates (Daily) - H.15",
      source: "Federal Reserve Statistical Release",
      url: "https://www.federalreserve.gov/releases/h15/",
    },
  ],

  detailedTable: {
    id: "monthlyGrowth",
    buttonLabel: "View Month-by-Month Growth",
    buttonIcon: "📅",
    modalTitle: "CD Growth Over Time",
    columns: [
      { id: "month", label: "Month", align: "left" },
      { id: "balance", label: "Balance", align: "center", highlight: true },
      { id: "interestEarned", label: "Interest This Month", align: "center" },
      { id: "totalInterest", label: "Total Interest", align: "right" },
    ],
  },

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "finance" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["savings-calculator", "compound-interest-calculator", "investment-calculator", "retirement-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// CALCULATE FUNCTION
export function calculateCD(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;

  const principal = values.initialDeposit as number;
  const apy = (values.apy as number) / 100;
  const termMonths = parseInt(values.termMonths as string);
  const compounding = values.compoundingFrequency as string;
  const taxRate = ((values.taxRate as number) || 0) / 100;
  const inflationRate = ((values.inflationRate as number) || 0) / 100;

  // Compounding periods per year
  const compoundingPeriods: Record<string, number> = {
    daily: 365,
    monthly: 12,
    quarterly: 4,
    annually: 1,
  };

  const n = compoundingPeriods[compounding];
  const t = termMonths / 12; // Term in years

  // Calculate using compound interest formula: A = P(1 + r/n)^(nt)
  // But since APY already includes compounding, we use: A = P(1 + APY)^t
  // For more accuracy with different compounding, we reverse-engineer the rate from APY
  const rate = n * (Math.pow(1 + apy, 1/n) - 1);
  const totalAtMaturity = principal * Math.pow(1 + rate/n, n * t);
  const totalInterest = totalAtMaturity - principal;

  // Effective APY (verify)
  const effectiveAPY = (Math.pow(1 + rate/n, n) - 1) * 100;

  // After-tax return
  const afterTaxInterest = totalInterest * (1 - taxRate);

  // Inflation-adjusted (real) return
  const inflationImpact = principal * inflationRate * t;
  const realReturn = afterTaxInterest - inflationImpact;

  // Average monthly interest
  const monthlyInterest = totalInterest / termMonths;

  // Maturity date
  const today = new Date();
  const maturityDate = new Date(today);
  maturityDate.setMonth(maturityDate.getMonth() + termMonths);
  const maturityDateStr = maturityDate.toLocaleDateString("en-US", { 
    month: "long", 
    day: "numeric", 
    year: "numeric" 
  });

  // Generate monthly growth table
  const tableData: Array<Record<string, string | number>> = [];
  let currentBalance = principal;
  let cumulativeInterest = 0;
  
  for (let month = 0; month <= termMonths; month++) {
    if (month === 0) {
      tableData.push({
        month: "Start",
        balance: `$${principal.toLocaleString()}`,
        interestEarned: "$0",
        totalInterest: "$0",
      });
    } else {
      const monthlyRate = rate / 12;
      const monthInterest = currentBalance * monthlyRate;
      currentBalance += monthInterest;
      cumulativeInterest += monthInterest;
      
      tableData.push({
        month: `Month ${month}`,
        balance: `$${currentBalance.toFixed(2)}`,
        interestEarned: `$${monthInterest.toFixed(2)}`,
        totalInterest: `$${cumulativeInterest.toFixed(2)}`,
      });
    }
  }

  const summary = `Your $${principal.toLocaleString()} CD at ${(apy * 100).toFixed(2)}% APY will grow to $${totalAtMaturity.toFixed(2)} in ${termMonths} months, earning $${totalInterest.toFixed(2)} in interest (${taxRate > 0 ? `$${afterTaxInterest.toFixed(2)} after taxes` : 'before taxes'}).`;

  return {
    values: {
      totalAtMaturity: Math.round(totalAtMaturity * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      effectiveAPY: `${effectiveAPY.toFixed(2)}%`,
      afterTaxReturn: Math.round(afterTaxInterest * 100) / 100,
      realReturn: Math.round(realReturn * 100) / 100,
      monthlyInterest: Math.round(monthlyInterest * 100) / 100,
      maturityDate: maturityDateStr,
    },
    formatted: {
      totalAtMaturity: totalAtMaturity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      totalInterest: totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      effectiveAPY: `${effectiveAPY.toFixed(2)}%`,
      afterTaxReturn: afterTaxInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      realReturn: realReturn.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      monthlyInterest: monthlyInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      maturityDate: maturityDateStr,
    },
    summary,
    isValid: principal > 0 && apy > 0 && termMonths > 0,
    metadata: {
      tableData,
    },
  };
}

export default cdCalculatorConfig;
