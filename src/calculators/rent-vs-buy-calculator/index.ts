import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

export const rentVsBuyCalculatorConfig: CalculatorConfigV4 = {
  id: "rent-vs-buy-calculator",
  version: "4.0",
  category: "finance",
  icon: "🏘️",

  presets: [
    {
      id: "firstTimeBuyer",
      icon: "🏠",
      values: {
        monthlyRent: 2000, annualRentIncrease: 3,
        homePrice: 400000, downPayment: 80000, interestRate: 6.8, loanTerm: 30,
        propertyTaxRate: 1.2, homeInsurance: 1500, hoaFees: 0,
        maintenanceRate: 1.0, closingCostsBuying: 4, closingCostsSelling: 6,
        homeAppreciation: 3.5, investmentReturn: 7, marginalTaxRate: 22,
        yearsToStay: 7,
        includeHoa: false, includeTaxBenefit: true,
      },
    },
    {
      id: "highCostCity",
      icon: "🌆",
      values: {
        monthlyRent: 3500, annualRentIncrease: 4,
        homePrice: 900000, downPayment: 180000, interestRate: 6.8, loanTerm: 30,
        propertyTaxRate: 1.1, homeInsurance: 2500, hoaFees: 400,
        maintenanceRate: 1.0, closingCostsBuying: 3, closingCostsSelling: 6,
        homeAppreciation: 4.0, investmentReturn: 7, marginalTaxRate: 32,
        yearsToStay: 5,
        includeHoa: true, includeTaxBenefit: true,
      },
    },
    {
      id: "suburbanFamily",
      icon: "👨‍👩‍👧",
      values: {
        monthlyRent: 2500, annualRentIncrease: 3,
        homePrice: 550000, downPayment: 110000, interestRate: 6.8, loanTerm: 30,
        propertyTaxRate: 1.5, homeInsurance: 2000, hoaFees: 150,
        maintenanceRate: 1.5, closingCostsBuying: 4, closingCostsSelling: 6,
        homeAppreciation: 3.0, investmentReturn: 7, marginalTaxRate: 24,
        yearsToStay: 10,
        includeHoa: true, includeTaxBenefit: true,
      },
    },
    {
      id: "shortTerm",
      icon: "✈️",
      values: {
        monthlyRent: 1800, annualRentIncrease: 3,
        homePrice: 350000, downPayment: 70000, interestRate: 6.8, loanTerm: 30,
        propertyTaxRate: 1.0, homeInsurance: 1200, hoaFees: 0,
        maintenanceRate: 1.0, closingCostsBuying: 4, closingCostsSelling: 6,
        homeAppreciation: 3.0, investmentReturn: 7, marginalTaxRate: 22,
        yearsToStay: 3,
        includeHoa: false, includeTaxBenefit: false,
      },
    },
  ],

  t: {
    en: {
      name: "Rent vs Buy Calculator",
      slug: "rent-vs-buy-calculator",
      subtitle: "Should you rent or buy? Enter your local costs and see the breakeven year, total wealth comparison, and the true cost of homeownership vs renting over time.",
      breadcrumb: "Rent vs Buy",
      seo: {
        title: "Rent vs Buy Calculator - Should You Buy a Home? | Free Tool",
        description: "Free rent vs buy calculator. Compare total costs, breakeven year, and wealth building over time. Includes opportunity cost, tax benefits, maintenance, and selling costs.",
        shortDescription: "Compare renting vs buying a home over time.",
        keywords: ["rent vs buy calculator", "should i rent or buy", "renting vs buying calculator", "home buying calculator", "rent or buy breakeven"],
      },
      calculator: { yourInformation: "Your Situation" },
      ui: { yourInformation: "Your Situation", calculate: "Compare Rent vs Buy", reset: "Reset", results: "Comparison Results" },
      inputs: {
        monthlyRent: { label: "Current Monthly Rent", helpText: "What you pay (or would pay) to rent a comparable home" },
        annualRentIncrease: { label: "Annual Rent Increase", helpText: "Historical average is 3-4% per year in most US cities" },
        homePrice: { label: "Home Purchase Price", helpText: "The price of the home you're considering buying" },
        downPayment: { label: "Down Payment", helpText: "Minimum 3.5% (FHA) or 20% to avoid PMI" },
        interestRate: { label: "Mortgage Interest Rate", helpText: "Current 30-year fixed rate is ~6.5-7%" },
        loanTerm: { label: "Loan Term", helpText: "Most common: 30 years. 15 years saves interest but higher payment", options: { "30": "30 years", "20": "20 years", "15": "15 years" } },
        propertyTaxRate: { label: "Property Tax Rate", helpText: "Annual tax as % of home value. US average is ~1.07%" },
        homeInsurance: { label: "Annual Home Insurance", helpText: "US average is ~$1,500-$2,500/year for a median home" },
        includeHoa: { label: "Include HOA Fees", helpText: "Homeowner association dues — varies $0 to $500+/month" },
        hoaFees: { label: "Monthly HOA Fees", helpText: "Monthly dues to your homeowner association" },
        maintenanceRate: { label: "Annual Maintenance Rate", helpText: "Typical rule: 1% of home value per year for repairs and upkeep" },
        closingCostsBuying: { label: "Closing Costs (Buying)", helpText: "Typically 2-5% of loan amount (lender fees, title, escrow)" },
        closingCostsSelling: { label: "Closing Costs (Selling)", helpText: "Typically 6-8% of sale price (realtor commissions + fees)" },
        homeAppreciation: { label: "Annual Home Appreciation", helpText: "US historical average is ~3-4% per year (varies heavily by market)" },
        investmentReturn: { label: "Investment Return Rate", helpText: "Expected annual return if down payment were invested instead (S&P 500 historical: ~7% after inflation)" },
        includeTaxBenefit: { label: "Include Tax Benefit", helpText: "Mortgage interest + property tax deduction if you itemize (subject to SALT $10K limit)" },
        marginalTaxRate: { label: "Marginal Tax Rate", helpText: "Your federal + state marginal income tax bracket" },
        yearsToStay: { label: "Years Planning to Stay", helpText: "How long you plan to live in the home — critical for breakeven analysis" },
      },
      results: {
        breakevenYear: { label: "Breakeven Year" },
        recommendation: { label: "Recommendation" },
        buyerWealth: { label: "Buyer Net Wealth" },
        renterWealth: { label: "Renter Net Wealth" },
        wealthDifference: { label: "Wealth Difference" },
        monthlyMortgage: { label: "Monthly Mortgage (P&I)" },
        totalMonthlyCostBuy: { label: "True Monthly Cost (Buy)" },
        totalCostRent: { label: "Total Cost Renting" },
        totalCostBuy: { label: "Total Cost Buying" },
      },
      presets: {
        firstTimeBuyer: { label: "First-Time Buyer", description: "$400K home — 7 year horizon" },
        highCostCity: { label: "High-Cost City", description: "$900K home — NYC/SF/LA scenario" },
        suburbanFamily: { label: "Suburban Family", description: "$550K home — long-term 10 years" },
        shortTerm: { label: "Short Stay (3 yrs)", description: "Renting often wins when you move soon" },
      },
      values: { "%": "%", "years": "years", "months": "months", "yr": "yr" },
      formats: { summary: "Breakeven at year {breakeven} — After {years} yrs: {recommendation}" },
      chart: {
        title: "Cumulative Wealth: Buyer vs Renter",
        xLabel: "Year",
        yLabel: "Net Wealth ($)",
        series: { buyer: "Buyer Net Wealth", renter: "Renter Portfolio" },
      },
      infoCards: {
        verdict: {
          title: "The Verdict",
          items: ["Breakeven Year", "Recommendation", "Buyer Net Wealth", "Renter Net Wealth"],
        },
        costs: {
          title: "Monthly Cost Comparison",
          items: ["Monthly Mortgage (P&I)", "True Monthly Cost (Buy)", "Total Cost Renting", "Total Cost Buying"],
        },
        tips: {
          title: "Key Insights",
          items: [
            "Buying beats renting only if you stay long enough to recoup transaction costs — typically 5-7 years",
            "The down payment's opportunity cost is often overlooked — $80K invested at 7% grows to $158K in 10 years",
            "Renting flexibility has real value: job changes, family needs, or market downturns won't trap you",
            "In high-appreciation markets (Austin, Miami, Phoenix), buying often wins earlier — check local data",
          ],
        },
      },
      education: {
        whatIs: {
          title: "The Rent vs Buy Decision: What Really Matters",
          content: "The rent vs buy decision is one of the biggest financial choices most people make. The conventional wisdom that 'renting is throwing money away' is an oversimplification — homeowners also 'throw away' money on mortgage interest (the majority of early payments), property taxes, insurance, maintenance, and transaction costs. The real question is: over your specific time horizon, does buying or renting leave you with more wealth?",
        },
        howItWorks: {
          title: "How This Calculator Compares the Two Paths",
          content: "The calculator runs two parallel scenarios. The buyer scenario computes monthly mortgage payments (P&I), adds property tax, insurance, HOA, and maintenance, subtracts mortgage interest tax deductions if applicable, and tracks how equity builds as the home appreciates. The renter scenario assumes the down payment and the monthly savings (rent vs. true cost of ownership) are invested at your expected investment return rate. At any year, you can compare the buyer's home equity minus selling costs against the renter's investment portfolio.",
        },
        considerations: {
          title: "Hidden Costs Buyers Often Miss",
          items: [
            { text: "Closing costs when buying (2-5%) and selling (6-8%) total 8-13% of home value — this alone adds years to breakeven", type: "warning" },
            { text: "Maintenance: 1-2% of home value per year ($4,000-$8,000 on a $400K home) — renters pay $0 for repairs", type: "warning" },
            { text: "Opportunity cost: the down payment invested in index funds at 7% doubles every 10 years", type: "info" },
            { text: "PMI: if down payment is under 20%, add $100-$300/month until you reach 20% equity (~7-9 years at typical rates)", type: "warning" },
            { text: "Property taxes increase over time (reassessments) and are non-deductible above the $10K SALT cap for most buyers", type: "info" },
            { text: "Home appreciation is NOT guaranteed — prices fell 30-50% in some markets during 2007-2012", type: "warning" },
          ],
        },
        whenToBuy: {
          title: "When Buying Usually Wins",
          items: [
            { text: "You plan to stay 7+ years — transaction costs have time to be recouped through appreciation and equity", type: "info" },
            { text: "Your local price-to-rent ratio is below 20 (home price ÷ annual rent) — indicates buying is relatively affordable", type: "info" },
            { text: "You have a stable income and 20% down payment — avoids PMI and worst-case forced-selling scenarios", type: "info" },
            { text: "Local market has historically strong appreciation (coastal cities, growing metros)", type: "info" },
            { text: "You value stability, community, and the ability to customize your space", type: "info" },
            { text: "Interest rates are significantly lower than current rents (rare in 2024-2025 market)", type: "info" },
          ],
        },
        examples: {
          title: "Rent vs Buy Scenarios",
          description: "Real-world comparison at different price points and time horizons",
          examples: [
            {
              title: "$400K Home — 7 Year Stay (Typical Suburban)",
              steps: [
                "Buying: $80K down (20%), $320K mortgage at 6.8% → $2,087/mo P&I. Add taxes $400, insurance $125, maintenance $333 = $2,945/mo true cost",
                "Renting: $2,000/mo rent, down payment $80K invested at 7% → grows to $128,600. Monthly savings of $945 invested → adds $92,000",
                "After 7 years: Buyer equity ~$185K (appreciation + paydown) minus 6% selling costs $42K = $143K net. Renter portfolio: ~$221K",
              ],
              result: "Renter wins by ~$78K at year 7. Breakeven: ~year 9. This is why staying long matters.",
            },
            {
              title: "$900K Home — 5 Year Stay (High-Cost City)",
              steps: [
                "Buying: $180K down, $720K mortgage at 6.8% → $4,696/mo P&I. Add taxes $825, insurance $208, HOA $400, maintenance $750 = $6,879/mo true cost",
                "Renting $3,500/mo saves $3,379/mo vs buying. Down payment $180K + monthly savings invested at 7% → portfolio grows to $522K",
                "After 5 years: Home at 4% appreciation = $1,096K. Equity after paydown = $382K, minus 6% selling costs $66K = $316K net",
              ],
              result: "Renter wins by $206K at year 5. In high-cost cities, renting often wins unless staying 10+ years.",
            },
          ],
        },
      },
      faqs: [
        { question: "Is it always better to buy than rent?", answer: "No — the 'rent is throwing money away' myth ignores that buyers also spend money on mortgage interest (most of each early payment), property taxes, insurance, maintenance, and transaction costs. Renting is financially superior when you'll move in under 5 years, when your local price-to-rent ratio is high, or when the stock market offers better returns than home appreciation in your market." },
        { question: "What is the price-to-rent ratio and how do I use it?", answer: "Price-to-rent ratio = home price ÷ annual rent. Below 15: buying is generally favorable. 15-20: neutral, depends on your timeline. Above 20: renting is often cheaper on a monthly basis. Many expensive cities (NYC, SF, LA) have ratios of 30-50+, making renting financially superior for most time horizons." },
        { question: "How many years do I need to stay for buying to make sense?", answer: "In most US markets in 2024-2025, you need to stay 5-8 years for buying to break even with renting, primarily because buying and selling transaction costs total 8-13% of the home's value. In markets with high appreciation (Miami, Austin) it can be less; in stagnant markets it can be 10+ years." },
        { question: "Should I count the down payment as an investment?", answer: "Yes — your down payment has an opportunity cost. $80,000 invested in a diversified stock portfolio at 7% annual return grows to about $158,000 in 10 years. This doesn't mean renting is always better, but it means home equity should be compared against what that capital would earn invested elsewhere." },
        { question: "Does the mortgage interest deduction make a big difference?", answer: "Less than it used to. The 2017 Tax Cuts and Jobs Act doubled the standard deduction, so fewer than 15% of households now itemize. The benefit only applies to the amount of interest that exceeds your standard deduction ($14,600 single / $29,200 married in 2024). For most middle-income buyers, the tax benefit is minimal." },
        { question: "What happens to my analysis if home prices drop?", answer: "Significant price drops dramatically extend the breakeven period or can make buying a net loss. During 2007-2012, some markets fell 30-50%. If you bought a $400K home with 20% down and prices fell 25%, you'd be underwater (owe more than the home is worth) and trapped — unable to sell without a loss. This risk is another argument for only buying if you can commit to 7+ years." },
      ],
      references: [
        { authors: "NYT Upshot", year: "2024", title: "Is It Better to Rent or Buy?", source: "New York Times", url: "https://www.nytimes.com/interactive/2014/upshot/buy-rent-calculator.html" },
        { authors: "National Association of Realtors", year: "2024", title: "2024 Profile of Home Buyers and Sellers", source: "NAR", url: "https://www.nar.realtor/research-and-statistics/research-reports/highlights-from-the-profile-of-home-buyers-and-sellers" },
        { authors: "Federal Reserve Bank of Atlanta", year: "2024", title: "Home Ownership Affordability Monitor", source: "Atlanta Fed", url: "https://www.atlantafed.org/center-for-housing-and-policy/data-and-tools/home-ownership-affordability-monitor" },
      ],
      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Compare Rent vs Buy", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { title: "Rent vs Buy Calculator", text: "Should you rent or buy? Find your breakeven year and true cost comparison." },
      accessibility: { calculatorLabel: "Rent vs Buy Calculator", resultsLabel: "Rent vs Buy Results" },
      sources: { title: "Sources" },
    },
  },

  inputs: [
    // ── RENTING ──
    { id: "monthlyRent", type: "number", defaultValue: 2000, placeholder: "2000", min: 100, max: 50000, unitType: "currency", syncGroup: false },
    { id: "annualRentIncrease", type: "slider", defaultValue: 3, min: 0, max: 10, step: 0.5, suffix: "%" },

    // ── BUYING ──
    { id: "homePrice", type: "number", defaultValue: 400000, placeholder: "400000", min: 50000, max: 10000000, unitType: "currency", syncGroup: false },
    { id: "downPayment", type: "number", defaultValue: 80000, placeholder: "80000", min: 0, max: 5000000, unitType: "currency", syncGroup: false },
    { id: "interestRate", type: "slider", defaultValue: 6.8, min: 1, max: 15, step: 0.1, suffix: "%" },
    { id: "loanTerm", type: "select", defaultValue: "30", options: [
      { value: "30", label: "30 years" },
      { value: "20", label: "20 years" },
      { value: "15", label: "15 years" },
    ]},

    // ── OWNERSHIP COSTS ──
    { id: "propertyTaxRate", type: "slider", defaultValue: 1.2, min: 0.1, max: 4, step: 0.1, suffix: "%" },
    { id: "homeInsurance", type: "number", defaultValue: 1500, placeholder: "1500", min: 0, max: 20000, unitType: "currency", syncGroup: false },
    { id: "includeHoa", type: "toggle", defaultValue: false },
    { id: "hoaFees", type: "number", defaultValue: null, placeholder: "200", min: 0, max: 5000, unitType: "currency", syncGroup: false, showWhen: { field: "includeHoa", value: true } },
    { id: "maintenanceRate", type: "slider", defaultValue: 1.0, min: 0.5, max: 3, step: 0.5, suffix: "%" },
    { id: "closingCostsBuying", type: "slider", defaultValue: 4, min: 1, max: 8, step: 0.5, suffix: "%" },
    { id: "closingCostsSelling", type: "slider", defaultValue: 6, min: 2, max: 10, step: 0.5, suffix: "%" },

    // ── ASSUMPTIONS ──
    { id: "homeAppreciation", type: "slider", defaultValue: 3.5, min: 0, max: 10, step: 0.5, suffix: "%" },
    { id: "investmentReturn", type: "slider", defaultValue: 7, min: 1, max: 15, step: 0.5, suffix: "%" },
    { id: "yearsToStay", type: "stepper", defaultValue: 7, min: 1, max: 30, step: 1, suffix: "years" },

    // ── TAX ──
    { id: "includeTaxBenefit", type: "toggle", defaultValue: false },
    { id: "marginalTaxRate", type: "slider", defaultValue: 22, min: 10, max: 50, step: 1, suffix: "%", showWhen: { field: "includeTaxBenefit", value: true } },
  ],

  inputGroups: [],

  results: [
    { id: "breakevenYear", type: "text", primary: true, highlight: true },
    { id: "recommendation", type: "text" },
    { id: "buyerWealth", type: "currency" },
    { id: "renterWealth", type: "currency" },
    { id: "wealthDifference", type: "currency" },
    { id: "monthlyMortgage", type: "currency" },
    { id: "totalMonthlyCostBuy", type: "currency" },
    { id: "totalCostRent", type: "currency" },
    { id: "totalCostBuy", type: "currency" },
  ],

  infoCards: [
    {
      id: "verdict",
      type: "list",
      icon: "🏆",
      items: [
        { id: "breakevenYear", valueKey: "breakevenYear" },
        { id: "recommendation", valueKey: "recommendation" },
        { id: "buyerWealth", valueKey: "buyerWealth" },
        { id: "renterWealth", valueKey: "renterWealth" },
      ],
    },
    {
      id: "costs",
      type: "list",
      icon: "💰",
      items: [
        { id: "monthlyMortgage", valueKey: "monthlyMortgage" },
        { id: "totalMonthlyCostBuy", valueKey: "totalMonthlyCostBuy" },
        { id: "totalCostRent", valueKey: "totalCostRent" },
        { id: "totalCostBuy", valueKey: "totalCostBuy" },
      ],
    },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  chart: {
    id: "wealthChart",
    type: "line",
    xKey: "year",
    series: [
      { key: "buyer", color: "#3b82f6" },
      { key: "renter", color: "#10b981" },
    ],
    stacked: false,
  },

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚡" },
    { id: "considerations", type: "list", icon: "⚠️", itemCount: 6 },
    { id: "whenToBuy", type: "list", icon: "✅", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "NYT Upshot", year: "2024", title: "Is It Better to Rent or Buy?", source: "New York Times", url: "https://www.nytimes.com/interactive/2014/upshot/buy-rent-calculator.html" },
    { authors: "National Association of Realtors", year: "2024", title: "2024 Profile of Home Buyers and Sellers", source: "NAR", url: "https://www.nar.realtor/research-and-statistics/research-reports/highlights-from-the-profile-of-home-buyers-and-sellers" },
    { authors: "Federal Reserve Bank of Atlanta", year: "2024", title: "Home Ownership Affordability Monitor", source: "Atlanta Fed", url: "https://www.atlantafed.org/center-for-housing-and-policy/data-and-tools/home-ownership-affordability-monitor" },
  ],

  hero: { showImage: true, showBadges: true, showReviews: true },
  sidebar: { showRelated: true, showAds: true },
  features: { history: true, favorites: true, share: true, export: true },
  relatedCalculators: ["mortgage-calculator", "budget-calculator", "net-worth-calculator", "compound-interest-calculator"],
  ads: { enabled: true, slots: ["sidebar", "results-below"] },
};

export function calculateRentVsBuy(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const currencyUnit = fieldUnits["homePrice"] ?? "USD";
  const sym = currencyUnit === "EUR" ? "€" : currencyUnit === "GBP" ? "£" : currencyUnit === "BRL" ? "R$" : "$";
  const fmt = (n: number) => {
    const abs = Math.abs(n);
    const s = abs >= 1000000
      ? `${(abs / 1000000).toFixed(2)}M`
      : abs >= 1000 ? abs.toLocaleString("en-US", { maximumFractionDigits: 0 }) : abs.toFixed(0);
    return n < 0 ? `-${sym}${s}` : `${sym}${s}`;
  };

  const monthlyRent = (values.monthlyRent as number) ?? 2000;
  const annualRentIncrease = ((values.annualRentIncrease as number) ?? 3) / 100;
  const homePrice = (values.homePrice as number) ?? 400000;
  const downPayment = (values.downPayment as number) ?? 80000;
  const interestRate = ((values.interestRate as number) ?? 6.8) / 100;
  const loanTermYears = parseInt((values.loanTerm as string) ?? "30");
  const propertyTaxRate = ((values.propertyTaxRate as number) ?? 1.2) / 100;
  const homeInsurance = (values.homeInsurance as number) ?? 1500;
  const hoaFees = values.includeHoa ? ((values.hoaFees as number) ?? 0) : 0;
  const maintenanceRate = ((values.maintenanceRate as number) ?? 1.0) / 100;
  const closingCostsBuying = ((values.closingCostsBuying as number) ?? 4) / 100;
  const closingCostsSelling = ((values.closingCostsSelling as number) ?? 6) / 100;
  const homeAppreciation = ((values.homeAppreciation as number) ?? 3.5) / 100;
  const investmentReturn = ((values.investmentReturn as number) ?? 7) / 100;
  const yearsToStay = (values.yearsToStay as number) ?? 7;
  const includeTax = values.includeTaxBenefit as boolean;
  const marginalTaxRate = ((values.marginalTaxRate as number) ?? 22) / 100;

  if (!homePrice || !monthlyRent) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Mortgage calculation
  const loanAmount = homePrice - downPayment;
  const monthlyRate = interestRate / 12;
  const numPayments = loanTermYears * 12;
  const monthlyMortgage = loanAmount > 0
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    : 0;

  const monthlyPropertyTax = (homePrice * propertyTaxRate) / 12;
  const monthlyInsurance = homeInsurance / 12;
  const monthlyMaintenance = (homePrice * maintenanceRate) / 12;
  const monthlyHoa = hoaFees;
  const totalMonthlyCostBuy = monthlyMortgage + monthlyPropertyTax + monthlyInsurance + monthlyMaintenance + monthlyHoa;

  // Year-by-year simulation
  const chartData: Array<{ year: string; buyer: number; renter: number }> = [];
  let breakevenYear = -1;

  let buyerCumulativeCost = homePrice * closingCostsBuying + downPayment;
  let renterPortfolio = downPayment * (1 + investmentReturn / 12); // down payment invested
  let currentHomeValue = homePrice;
  let remainingLoanBalance = loanAmount;
  let currentRent = monthlyRent;
  let totalRentPaid = 0;
  let totalBuyCost = homePrice * closingCostsBuying + downPayment;

  for (let year = 1; year <= Math.max(yearsToStay, 15); year++) {
    // Year calculations
    let yearlyMortgageInterest = 0;
    for (let month = 0; month < 12; month++) {
      const interestPayment = remainingLoanBalance * monthlyRate;
      const principalPayment = monthlyMortgage - interestPayment;
      yearlyMortgageInterest += interestPayment;
      remainingLoanBalance = Math.max(0, remainingLoanBalance - principalPayment);
    }

    // Tax benefit
    const yearlyTaxSavings = includeTax
      ? Math.max(0, (yearlyMortgageInterest + homePrice * propertyTaxRate) - 14600) * marginalTaxRate
      : 0;

    currentHomeValue *= (1 + homeAppreciation);
    const yearlyOwnCost = (totalMonthlyCostBuy * 12) - yearlyTaxSavings;
    totalBuyCost += yearlyOwnCost;

    // Renter: invest down payment + monthly savings
    const monthlySavings = Math.max(0, totalMonthlyCostBuy - currentRent);
    const yearlyRentPaid = currentRent * 12;
    totalRentPaid += yearlyRentPaid;

    // Compound renter portfolio
    renterPortfolio = renterPortfolio * (1 + investmentReturn);
    for (let m = 0; m < 12; m++) {
      renterPortfolio += monthlySavings * Math.pow(1 + investmentReturn / 12, 12 - m);
    }

    currentRent *= (1 + annualRentIncrease);

    // Buyer wealth: home equity after selling costs
    const homeEquity = currentHomeValue - remainingLoanBalance;
    const sellingCosts = currentHomeValue * closingCostsSelling;
    const buyerNetWealth = homeEquity - sellingCosts;

    chartData.push({
      year: `Y${year}`,
      buyer: Math.round(buyerNetWealth),
      renter: Math.round(renterPortfolio),
    });

    if (breakevenYear === -1 && buyerNetWealth > renterPortfolio) {
      breakevenYear = year;
    }
  }

  const finalBuyer = chartData[yearsToStay - 1]?.buyer ?? 0;
  const finalRenter = chartData[yearsToStay - 1]?.renter ?? 0;
  const wealthDifference = finalBuyer - finalRenter;
  const buyerWins = wealthDifference > 0;

  const breakevenDisplay = breakevenYear === -1
    ? "Not in 15 years"
    : breakevenYear === 1 ? "Year 1" : `Year ${breakevenYear}`;

  const recommendation = buyerWins
    ? `Buying wins by ${fmt(Math.abs(wealthDifference))} after ${yearsToStay} years`
    : `Renting wins by ${fmt(Math.abs(wealthDifference))} after ${yearsToStay} years`;

  return {
    values: {
      breakevenYear, recommendation, buyerWealth: finalBuyer, renterWealth: finalRenter,
      wealthDifference, monthlyMortgage, totalMonthlyCostBuy,
      totalCostRent: totalRentPaid, totalCostBuy: totalBuyCost,
    },
    formatted: {
      breakevenYear: breakevenDisplay,
      recommendation,
      buyerWealth: fmt(finalBuyer),
      renterWealth: fmt(finalRenter),
      wealthDifference: (buyerWins ? "+" : "-") + fmt(Math.abs(wealthDifference)),
      monthlyMortgage: fmt(monthlyMortgage),
      totalMonthlyCostBuy: fmt(totalMonthlyCostBuy),
      totalCostRent: fmt(totalRentPaid),
      totalCostBuy: fmt(totalBuyCost),
    },
    summary: `Breakeven: ${breakevenDisplay} — After ${yearsToStay} yrs: ${buyerWins ? "Buy" : "Rent"} wins by ${fmt(Math.abs(wealthDifference))}`,
    isValid: true,
    metadata: { chartData: chartData.slice(0, Math.max(yearsToStay + 3, 10)) },
  };
}

export default rentVsBuyCalculatorConfig;
