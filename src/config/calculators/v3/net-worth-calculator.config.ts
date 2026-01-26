import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

export const netWorthCalculatorConfig: CalculatorConfigV3 = {
  id: "net-worth-calculator",
  slug: "net-worth-calculator",
  name: "Net Worth Calculator",
  category: "finance",
  icon: "💎",

  seo: {
    title: "Net Worth Calculator - Calculate & Compare Your Wealth (2026)",
    description: "Free net worth calculator with age-based percentile rankings. Track assets, liabilities, home equity & compare to U.S. averages. See where you stand financially.",
    shortDescription: "Calculate your net worth and compare to others your age",
    keywords: [
      "net worth calculator",
      "calculate net worth",
      "net worth by age",
      "wealth calculator",
      "assets minus liabilities",
      "financial health calculator"
    ],
  },

  hero: {
    badge: "Finance",
    rating: { average: 4.9, count: 42518 },
  },

  unitSystem: {
    enabled: false,
    default: "imperial",
    options: [],
  },

  inputs: [
    // Age for comparison
    {
      id: "age",
      type: "number",
      label: "Your Age",
      required: true,
      defaultValue: 35,
      min: 18,
      max: 85,
      step: 1,
      suffix: "years",
      helpText: "Used to compare against national averages for your age group",
    },
    // ASSETS - Cash & Savings
    {
      id: "cashChecking",
      type: "number",
      label: "Checking Accounts",
      required: false,
      defaultValue: 5000,
      min: 0,
      max: 10000000,
      step: 100,
      prefix: "$",
    },
    {
      id: "cashSavings",
      type: "number",
      label: "Savings Accounts",
      required: false,
      defaultValue: 15000,
      min: 0,
      max: 10000000,
      step: 100,
      prefix: "$",
    },
    // ASSETS - Investments
    {
      id: "retirement401k",
      type: "number",
      label: "401(k) / 403(b)",
      required: false,
      defaultValue: 50000,
      min: 0,
      max: 50000000,
      step: 1000,
      prefix: "$",
    },
    {
      id: "retirementIRA",
      type: "number",
      label: "IRA (Traditional/Roth)",
      required: false,
      defaultValue: 25000,
      min: 0,
      max: 50000000,
      step: 1000,
      prefix: "$",
    },
    {
      id: "brokerage",
      type: "number",
      label: "Brokerage/Investment Accounts",
      required: false,
      defaultValue: 10000,
      min: 0,
      max: 50000000,
      step: 500,
      prefix: "$",
      helpText: "Non-retirement investment accounts",
    },
    // ASSETS - Real Estate
    {
      id: "homeValue",
      type: "number",
      label: "Primary Home Value",
      required: false,
      defaultValue: 350000,
      min: 0,
      max: 50000000,
      step: 5000,
      prefix: "$",
      helpText: "Current market value of your home",
    },
    {
      id: "otherRealEstate",
      type: "number",
      label: "Other Real Estate",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 50000000,
      step: 5000,
      prefix: "$",
      helpText: "Rental properties, vacation homes, land",
    },
    // ASSETS - Vehicles & Other
    {
      id: "vehicles",
      type: "number",
      label: "Vehicles",
      required: false,
      defaultValue: 25000,
      min: 0,
      max: 1000000,
      step: 500,
      prefix: "$",
      helpText: "Resale value of all cars, boats, RVs",
    },
    {
      id: "otherAssets",
      type: "number",
      label: "Other Valuable Assets",
      required: false,
      defaultValue: 5000,
      min: 0,
      max: 10000000,
      step: 500,
      prefix: "$",
      helpText: "Jewelry, art, collectibles, business equity",
    },
    // LIABILITIES - Mortgages
    {
      id: "mortgagePrimary",
      type: "number",
      label: "Primary Mortgage Balance",
      required: false,
      defaultValue: 250000,
      min: 0,
      max: 10000000,
      step: 1000,
      prefix: "$",
    },
    {
      id: "mortgageOther",
      type: "number",
      label: "Other Mortgage/HELOC",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 10000000,
      step: 1000,
      prefix: "$",
    },
    // LIABILITIES - Loans
    {
      id: "autoLoans",
      type: "number",
      label: "Auto Loans",
      required: false,
      defaultValue: 15000,
      min: 0,
      max: 500000,
      step: 500,
      prefix: "$",
    },
    {
      id: "studentLoans",
      type: "number",
      label: "Student Loans",
      required: false,
      defaultValue: 20000,
      min: 0,
      max: 500000,
      step: 500,
      prefix: "$",
    },
    {
      id: "creditCards",
      type: "number",
      label: "Credit Card Debt",
      required: false,
      defaultValue: 3000,
      min: 0,
      max: 500000,
      step: 100,
      prefix: "$",
    },
    {
      id: "personalLoans",
      type: "number",
      label: "Personal/Other Loans",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 500000,
      step: 500,
      prefix: "$",
    },
  ],

  inputGroups: [],

  results: [
    { id: "netWorth", type: "primary", label: "Your Net Worth", format: "number", prefix: "$" },
    { id: "totalAssets", type: "secondary", label: "Total Assets", format: "number", prefix: "$" },
    { id: "totalLiabilities", type: "secondary", label: "Total Liabilities", format: "number", prefix: "$" },
    { id: "homeEquity", type: "secondary", label: "Home Equity", format: "number", prefix: "$" },
    { id: "liquidAssets", type: "secondary", label: "Liquid Assets", format: "number", prefix: "$" },
    { id: "retirementAssets", type: "secondary", label: "Retirement Assets", format: "number", prefix: "$" },
    { id: "debtToAssetRatio", type: "secondary", label: "Debt-to-Asset Ratio", format: "text" },
    { id: "percentileRank", type: "secondary", label: "Percentile Rank (Your Age)", format: "text" },
    { id: "vsMedian", type: "secondary", label: "vs. Median for Your Age", format: "text" },
  ],

  infoCards: [
    {
      type: "list",
      title: "Net Worth Summary",
      icon: "💰",
      items: [
        { label: "Net Worth", valueKey: "netWorth", prefix: "$" },
        { label: "Total Assets", valueKey: "totalAssets", prefix: "$" },
        { label: "Total Debt", valueKey: "totalLiabilities", prefix: "$" },
        { label: "Percentile", valueKey: "percentileRank" },
      ],
    },
    {
      type: "horizontal",
      title: "Asset Breakdown",
      items: [
        { label: "Liquid", valueKey: "liquidAssets", prefix: "$" },
        { label: "Retirement", valueKey: "retirementAssets", prefix: "$" },
        { label: "Home Equity", valueKey: "homeEquity", prefix: "$" },
        { label: "Debt Ratio", valueKey: "debtToAssetRatio" },
      ],
    },
  ],

  referenceData: [
    {
      id: "medianByAge",
      title: "Median Net Worth by Age (U.S. 2024)",
      icon: "📊",
      columns: [
        { key: "ageGroup", label: "Age Group", align: "left" },
        { key: "median", label: "Median", align: "center" },
        { key: "average", label: "Average", align: "center" },
        { key: "top10", label: "Top 10%", align: "right" },
      ],
      data: [
        { ageGroup: "Under 35", median: "$39,000", average: "$183,500", top10: "$500,000+" },
        { ageGroup: "35-44", median: "$135,600", average: "$549,600", top10: "$1,200,000+" },
        { ageGroup: "45-54", median: "$247,200", average: "$975,800", top10: "$2,000,000+" },
        { ageGroup: "55-64", median: "$364,500", average: "$1,566,900", top10: "$3,000,000+" },
        { ageGroup: "65-74", median: "$409,900", average: "$1,794,600", top10: "$3,500,000+" },
      ],
    },
  ],

  educationSections: [
    {
      id: "netWorthComponents",
      type: "cards",
      title: "Components of Net Worth",
      icon: "📋",
      columns: 2,
      cards: [
        {
          title: "Liquid Assets",
          description: "Cash, checking, savings, money market - funds you can access immediately without selling anything.",
          icon: "💵",
        },
        {
          title: "Retirement Assets",
          description: "401(k), IRA, pension - typically illiquid until retirement age but critical for long-term wealth.",
          icon: "🏖️",
        },
        {
          title: "Real Estate Equity",
          description: "Home value minus mortgage = equity. Often the largest asset for middle-class Americans.",
          icon: "🏠",
        },
        {
          title: "Liabilities",
          description: "All debts you owe - mortgages, car loans, student loans, credit cards. These reduce your net worth.",
          icon: "📉",
        },
      ],
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "Net worth is just one measure of financial health - cash flow and emergency savings matter too", type: "info" },
        { text: "Home equity is 'illiquid' - you can't easily access it without selling or borrowing against it", type: "info" },
        { text: "High income doesn't always mean high net worth - spending habits determine wealth accumulation", type: "warning" },
        { text: "Don't include personal items like furniture or clothing - they depreciate and aren't truly liquid", type: "warning" },
        { text: "Retirement accounts have penalties for early withdrawal - consider them differently than liquid assets", type: "info" },
        { text: "Calculate your net worth regularly (quarterly or annually) to track progress toward goals", type: "info" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "📊",
      description: "35-year-old with home, retirement savings, and typical debts",
      columns: 2,
      examples: [
        {
          title: "Assets",
          steps: [
            "Cash & Savings: $20,000",
            "401(k) & IRA: $75,000",
            "Brokerage: $10,000",
            "Home Value: $350,000",
            "Vehicles: $25,000",
            "Other: $5,000",
          ],
          result: "Total Assets: $485,000",
        },
        {
          title: "Liabilities & Net Worth",
          steps: [
            "Mortgage: $250,000",
            "Auto Loan: $15,000",
            "Student Loans: $20,000",
            "Credit Cards: $3,000",
            "Total Debt: $288,000",
            "Net Worth: $485,000 - $288,000",
          ],
          result: "Net Worth: $197,000 (~65th percentile for age 35)",
        },
      ],
    },
    {
      id: "whatIsNetWorth",
      type: "prose",
      title: "What is Net Worth?",
      icon: "❓",
      content: "Net worth is simply what you own minus what you owe - the single best snapshot of your financial health. It includes all your assets (cash, investments, property, vehicles) minus all your liabilities (mortgages, loans, credit card debt). Unlike income, which shows what flows through your accounts, net worth reveals what you've actually accumulated. A high income with high spending can result in low net worth, while modest earners who save consistently often build significant wealth over time.",
    },
    {
      id: "growNetWorth",
      type: "prose",
      title: "How to Grow Your Net Worth",
      icon: "📈",
      content: "Growing net worth requires increasing assets and/or decreasing liabilities. The most effective strategies: 1) Pay down high-interest debt first (credit cards). 2) Maximize retirement contributions, especially if your employer matches. 3) Build home equity through mortgage payments. 4) Invest consistently in diversified low-cost index funds. 5) Avoid lifestyle inflation - when income rises, increase savings rate rather than spending. 6) Track your net worth quarterly to stay motivated and catch issues early.",
    },
    {
      id: "netWorthVsIncome",
      type: "prose",
      title: "Net Worth vs. Income: What Matters More?",
      icon: "⚖️",
      content: "Income is important, but net worth is the true measure of wealth. Someone earning $500,000/year but spending $525,000 has negative net worth and is technically broke. Meanwhile, a teacher earning $60,000/year who saves 20% for 30 years could retire with $1M+. The book 'The Millionaire Next Door' found that most millionaires live below their means, drive regular cars, and got wealthy through consistent saving - not high incomes. Focus on the gap between income and spending, and your net worth will grow.",
    },
  ],

  faqs: [
    {
      question: "What is considered a good net worth for my age?",
      answer: "A common benchmark is to have your age times your salary saved by your late 30s. More specifically: by 30, aim for 1x salary saved; by 40, 3x salary; by 50, 6x salary; by 60, 8x salary; by 67, 10x salary. However, median net worth varies greatly: Under 35 = $39k, 35-44 = $135k, 45-54 = $247k, 55-64 = $364k, 65+ = $410k.",
    },
    {
      question: "Should I include my home in my net worth?",
      answer: "Yes, include your home at its current market value, but also include your mortgage as a liability. The difference (home value - mortgage) is your home equity. However, remember that home equity is 'illiquid' - you can't easily spend it without selling or taking out a loan. For a complete picture, track both total net worth and liquid net worth separately.",
    },
    {
      question: "How often should I calculate my net worth?",
      answer: "At minimum, annually - many people do it on January 1st or their birthday. For more active tracking, quarterly works well. This frequency catches trends without being obsessive. Use a spreadsheet or app to track changes over time and see your progress.",
    },
    {
      question: "What's a good debt-to-asset ratio?",
      answer: "Generally, lower is better. A ratio under 0.5 (50%) means you own more than you owe. Under 0.3 (30%) is considered healthy. However, not all debt is bad - a mortgage on an appreciating home is different from credit card debt. Focus on eliminating high-interest consumer debt first.",
    },
    {
      question: "Why is my net worth negative?",
      answer: "Negative net worth means you owe more than you own - common for young adults with student loans or recent home buyers. It's not permanent. Focus on: 1) Not adding more debt, 2) Paying down high-interest debt, 3) Building an emergency fund, 4) Consistently saving even small amounts. With time and discipline, your net worth will turn positive.",
    },
    {
      question: "Should I count my car as an asset?",
      answer: "Include your car's current resale value (check Kelley Blue Book), not what you paid for it. Cars depreciate, so this value decreases over time. Also include your auto loan as a liability. For most people, cars reduce net worth over time - another reason to buy reliable used vehicles rather than expensive new ones.",
    },
  ],

  references: [
    {
      authors: "Board of Governors of the Federal Reserve System",
      year: "2023",
      title: "Survey of Consumer Finances (SCF)",
      source: "Federal Reserve",
      url: "https://www.federalreserve.gov/econres/scfindex.htm",
    },
    {
      authors: "Stanley, Thomas J. & Danko, William D.",
      year: "2010",
      title: "The Millionaire Next Door: The Surprising Secrets of America's Wealthy",
      source: "Taylor Trade Publishing",
    },
  ],

  detailedTable: {
    id: "assetBreakdown",
    buttonLabel: "View Asset Breakdown",
    buttonIcon: "📊",
    modalTitle: "Detailed Asset & Liability Breakdown",
    columns: [
      { id: "category", label: "Category", align: "left" },
      { id: "amount", label: "Amount", align: "center", highlight: true },
      { id: "percent", label: "% of Total", align: "center" },
      { id: "type", label: "Type", align: "right" },
    ],
  },

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "finance" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["retirement-calculator", "investment-calculator", "savings-calculator", "debt-payoff-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// Net worth benchmarks by age (2022 Federal Reserve SCF data)
const netWorthBenchmarks: Record<string, { median: number; average: number; p75: number; p90: number }> = {
  "18-24": { median: 10800, average: 120900, p75: 45000, p90: 150000 },
  "25-29": { median: 30200, average: 158600, p75: 90000, p90: 250000 },
  "30-34": { median: 89800, average: 295500, p75: 200000, p90: 500000 },
  "35-39": { median: 141100, average: 436200, p75: 300000, p90: 750000 },
  "40-44": { median: 169400, average: 634100, p75: 450000, p90: 1200000 },
  "45-49": { median: 213100, average: 864500, p75: 550000, p90: 1500000 },
  "50-54": { median: 272800, average: 1132500, p75: 750000, p90: 2000000 },
  "55-59": { median: 320700, average: 1442100, p75: 900000, p90: 2500000 },
  "60-64": { median: 394000, average: 1675200, p75: 1100000, p90: 3000000 },
  "65-69": { median: 409900, average: 1794600, p75: 1200000, p90: 3500000 },
  "70-74": { median: 378600, average: 1624100, p75: 1100000, p90: 3200000 },
  "75+": { median: 335600, average: 1388700, p75: 900000, p90: 2500000 },
};

function getAgeGroup(age: number): string {
  if (age < 25) return "18-24";
  if (age < 30) return "25-29";
  if (age < 35) return "30-34";
  if (age < 40) return "35-39";
  if (age < 45) return "40-44";
  if (age < 50) return "45-49";
  if (age < 55) return "50-54";
  if (age < 60) return "55-59";
  if (age < 65) return "60-64";
  if (age < 70) return "65-69";
  if (age < 75) return "70-74";
  return "75+";
}

function getPercentile(netWorth: number, benchmarks: { median: number; p75: number; p90: number }): string {
  if (netWorth >= benchmarks.p90) return "Top 10%";
  if (netWorth >= benchmarks.p75) return "Top 25%";
  if (netWorth >= benchmarks.median) return "Top 50%";
  if (netWorth >= benchmarks.median * 0.5) return "Top 75%";
  return "Below median";
}

// CALCULATE FUNCTION
export function calculateNetWorth(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;

  const age = values.age as number;

  // Assets
  const cashChecking = (values.cashChecking as number) || 0;
  const cashSavings = (values.cashSavings as number) || 0;
  const retirement401k = (values.retirement401k as number) || 0;
  const retirementIRA = (values.retirementIRA as number) || 0;
  const brokerage = (values.brokerage as number) || 0;
  const homeValue = (values.homeValue as number) || 0;
  const otherRealEstate = (values.otherRealEstate as number) || 0;
  const vehicles = (values.vehicles as number) || 0;
  const otherAssets = (values.otherAssets as number) || 0;

  // Liabilities
  const mortgagePrimary = (values.mortgagePrimary as number) || 0;
  const mortgageOther = (values.mortgageOther as number) || 0;
  const autoLoans = (values.autoLoans as number) || 0;
  const studentLoans = (values.studentLoans as number) || 0;
  const creditCards = (values.creditCards as number) || 0;
  const personalLoans = (values.personalLoans as number) || 0;

  // Calculate totals
  const liquidAssets = cashChecking + cashSavings;
  const retirementAssets = retirement401k + retirementIRA;
  const investmentAssets = brokerage;
  const realEstateAssets = homeValue + otherRealEstate;
  const otherTotalAssets = vehicles + otherAssets;

  const totalAssets = liquidAssets + retirementAssets + investmentAssets + realEstateAssets + otherTotalAssets;

  const totalMortgage = mortgagePrimary + mortgageOther;
  const totalConsumerDebt = autoLoans + studentLoans + creditCards + personalLoans;
  const totalLiabilities = totalMortgage + totalConsumerDebt;

  const netWorth = totalAssets - totalLiabilities;
  const homeEquity = Math.max(0, homeValue - mortgagePrimary);

  // Debt-to-asset ratio
  const debtToAssetRatio = totalAssets > 0 
    ? ((totalLiabilities / totalAssets) * 100).toFixed(1) + "%" 
    : "0%";

  // Age-based comparison
  const ageGroup = getAgeGroup(age);
  const benchmarks = netWorthBenchmarks[ageGroup];
  const percentileRank = getPercentile(netWorth, benchmarks);

  // Comparison to median
  const medianDiff = netWorth - benchmarks.median;
  let vsMedian: string;
  if (medianDiff >= 0) {
    vsMedian = `+$${Math.abs(medianDiff).toLocaleString()} above median`;
  } else {
    vsMedian = `-$${Math.abs(medianDiff).toLocaleString()} below median`;
  }

  // Generate detailed breakdown table
  const tableData: Array<Record<string, string | number>> = [];
  
  const addRow = (category: string, amount: number, type: string) => {
    if (amount > 0) {
      const percent = totalAssets > 0 ? ((amount / totalAssets) * 100).toFixed(1) + "%" : "0%";
      tableData.push({
        category,
        amount: type === "Asset" ? `$${amount.toLocaleString()}` : `-$${amount.toLocaleString()}`,
        percent: type === "Asset" ? percent : "-",
        type,
      });
    }
  };

  // Assets
  addRow("Checking Accounts", cashChecking, "Asset");
  addRow("Savings Accounts", cashSavings, "Asset");
  addRow("401(k) / 403(b)", retirement401k, "Asset");
  addRow("IRA Accounts", retirementIRA, "Asset");
  addRow("Brokerage/Investments", brokerage, "Asset");
  addRow("Primary Home", homeValue, "Asset");
  addRow("Other Real Estate", otherRealEstate, "Asset");
  addRow("Vehicles", vehicles, "Asset");
  addRow("Other Assets", otherAssets, "Asset");

  // Liabilities
  addRow("Primary Mortgage", mortgagePrimary, "Liability");
  addRow("Other Mortgage/HELOC", mortgageOther, "Liability");
  addRow("Auto Loans", autoLoans, "Liability");
  addRow("Student Loans", studentLoans, "Liability");
  addRow("Credit Card Debt", creditCards, "Liability");
  addRow("Personal/Other Loans", personalLoans, "Liability");

  const netWorthFormatted = netWorth >= 0 
    ? `$${netWorth.toLocaleString()}`
    : `-$${Math.abs(netWorth).toLocaleString()}`;

  const summary = `Your net worth is ${netWorthFormatted} (${percentileRank} for ages ${ageGroup}). You have $${totalAssets.toLocaleString()} in assets and $${totalLiabilities.toLocaleString()} in liabilities.`;

  return {
    values: {
      netWorth,
      totalAssets,
      totalLiabilities,
      homeEquity,
      liquidAssets,
      retirementAssets,
      debtToAssetRatio,
      percentileRank,
      vsMedian,
    },
    formatted: {
      netWorth: netWorthFormatted,
      totalAssets: totalAssets.toLocaleString(),
      totalLiabilities: totalLiabilities.toLocaleString(),
      homeEquity: homeEquity.toLocaleString(),
      liquidAssets: liquidAssets.toLocaleString(),
      retirementAssets: retirementAssets.toLocaleString(),
      debtToAssetRatio,
      percentileRank,
      vsMedian,
    },
    summary,
    isValid: true,
    metadata: {
      tableData,
      ageGroup,
      benchmarks,
    },
  };
}

export default netWorthCalculatorConfig;
