import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

export const simpleInterestCalculatorConfig: CalculatorConfigV4 = {
  id: "simple-interest-calculator",
  version: "4.0",
  category: "finance",
  icon: "💰",

  presets: [
    {
      id: "personalLoan",
      icon: "💳",
      values: { principal: 10000, rate: 8.5, timePeriod: 3, timeUnit: "years", mode: "loan" },
    },
    {
      id: "savingsAccount",
      icon: "🏦",
      values: { principal: 5000, rate: 4.5, timePeriod: 12, timeUnit: "months", mode: "savings" },
    },
    {
      id: "carLoan",
      icon: "🚗",
      values: { principal: 25000, rate: 6.9, timePeriod: 5, timeUnit: "years", mode: "loan" },
    },
    {
      id: "shortTermCD",
      icon: "📅",
      values: { principal: 2000, rate: 5.2, timePeriod: 180, timeUnit: "days", mode: "savings" },
    },
  ],

  t: {
    en: {
      name: "Simple Interest Calculator",
      slug: "simple-interest-calculator",
      subtitle: "Calculate simple interest on loans or savings. Find total interest earned or owed, final balance, and see how simple interest compares to compound interest over time.",
      breadcrumb: "Simple Interest",
      seo: {
        title: "Simple Interest Calculator - I = Prt Formula | Free Tool",
        description: "Free simple interest calculator using I = Prt. Calculate interest on loans or savings by days, months, or years. Compare simple vs compound interest with chart.",
        shortDescription: "Calculate simple interest on loans and savings instantly.",
        keywords: ["simple interest calculator", "simple interest formula", "I=Prt calculator", "simple interest loan", "simple vs compound interest"],
      },
      ui: { yourInformation: "Your Details", calculate: "Calculate Interest", reset: "Reset", results: "Results" },
      inputs: {
        mode: {
          label: "Calculation Mode",
          helpText: "Loan: interest you owe. Savings: interest you earn.",
          options: { loan: "💳 Loan (Interest Owed)", savings: "🏦 Savings (Interest Earned)" },
        },
        principal: { label: "Principal Amount", helpText: "The initial amount borrowed or deposited" },
        rateLoan: { label: "Annual Interest Rate", helpText: "Simple interest rate per year. Personal loans: 6-20%, car loans: 5-10%, payday: much higher" },
        rateSavings: { label: "Annual Interest Rate", helpText: "Rate earned on savings. High-yield savings: 4-5%, CDs: 4-6%, regular savings: 0.5-1%" },
        timePeriod: { label: "Time Period", helpText: "How long the money is borrowed or invested" },
        timeUnit: {
          label: "Time Unit",
          helpText: "Choose the unit that matches your loan or savings term",
          options: { days: "Days", months: "Months", years: "Years" },
        },
      },
      results: {
        totalInterest: { label: "Total Interest" },
        finalAmount: { label: "Final Amount" },
        principal: { label: "Principal" },
        effectiveRate: { label: "Effective Annual Rate" },
        dailyInterest: { label: "Daily Interest" },
        monthlyInterest: { label: "Monthly Interest" },
      },
      presets: {
        personalLoan: { label: "Personal Loan", description: "$10K at 8.5% for 3 years" },
        savingsAccount: { label: "Savings Account", description: "$5K at 4.5% for 12 months" },
        carLoan: { label: "Car Loan", description: "$25K at 6.9% for 5 years" },
        shortTermCD: { label: "Short-Term CD", description: "$2K at 5.2% for 180 days" },
      },
      values: { "%": "%", "/yr": "/yr", "/mo": "/mo", "/day": "/day" },
      formats: {
        summary: "Interest: {interest} on {principal} over {time} — Total: {total}",
      },
      chart: {
        title: "Simple vs Compound Interest Over Time",
        xLabel: "Year",
        yLabel: "Balance ($)",
        series: { simple: "Simple Interest", compound: "Compound Interest (monthly)" },
      },
      infoCards: {
        breakdown: {
          title: "Interest Breakdown",
          items: ["Total Interest", "Final Amount", "Principal", "Effective Annual Rate"],
        },
        perPeriod: {
          title: "Interest Per Period",
          items: ["Daily Interest", "Monthly Interest", "Total Interest", "Final Amount"],
        },
        tips: {
          title: "Smart Interest Tips",
          items: [
            "Simple interest is calculated only on the original principal — unlike compound interest which grows on itself",
            "Most car loans and personal loans use simple interest — paying early reduces total interest significantly",
            "High-yield savings accounts (4-5% APY) use compound interest — always better for savers than simple interest accounts",
            "Rule of 72: divide 72 by the interest rate to estimate how many years to double your money",
          ],
        },
      },
      detailedTable: {
        growthTable: {
          button: "View Year-by-Year Breakdown",
          title: "Year-by-Year Interest Breakdown",
          columns: {
            year: "Year",
            simpleInterest: "Simple Interest Earned",
            simpleBalance: "Simple Balance",
            compoundBalance: "Compound Balance",
            difference: "Compound Advantage",
          },
        },
      },
      education: {
        whatIs: {
          title: "What Is Simple Interest?",
          content: "Simple interest is calculated only on the original principal amount — it never compounds. The formula is I = P × r × t, where P is principal, r is the annual rate (as a decimal), and t is time in years. If you borrow $1,000 at 10% for 3 years, you owe $300 in interest ($1,000 × 0.10 × 3), for a total of $1,300. Unlike compound interest, the interest amount is the same every year — it doesn't grow on previously earned interest. This makes simple interest more predictable and easier to calculate, and it's commonly used for personal loans, auto loans, and some savings products.",
        },
        simpleVsCompound: {
          title: "Simple Interest vs Compound Interest",
          content: "The key difference: with simple interest, you earn (or owe) the same dollar amount every period. With compound interest, each period's interest is added to the principal, so the next period's interest is larger. For borrowers, simple interest is better — you pay less over time. For savers, compound interest is better — your money grows faster. Example: $10,000 at 5% for 10 years. Simple interest: $5,000 total interest, balance = $15,000. Compound interest (monthly): $6,470 total interest, balance = $16,470. The difference grows dramatically over longer time horizons and higher rates.",
        },
        whenUsed: {
          title: "When Simple Interest Is Used",
          items: [
            { text: "Auto loans — most car loans in the U.S. use simple interest, so extra payments reduce principal directly and save interest", type: "info" },
            { text: "Personal loans — fixed-term loans from banks, credit unions, and online lenders typically use simple interest", type: "info" },
            { text: "Student loans — many federal student loans use simple interest, especially during grace periods", type: "info" },
            { text: "Short-term loans — payday loans, bridge loans, and lines of credit often quote simple daily interest rates", type: "warning" },
            { text: "Some savings bonds — Series I and EE bonds use a form of simple interest accrual in their early years", type: "info" },
            { text: "Treasury bills — short-term government securities calculate returns using simple interest", type: "info" },
          ],
        },
        howToSave: {
          title: "How to Pay Less Interest on Simple Interest Loans",
          items: [
            { text: "Pay more than the minimum — on simple interest loans, extra payments reduce principal immediately, cutting future interest", type: "info" },
            { text: "Pay early in the month — interest on daily simple interest loans accrues each day, so earlier payments = fewer days of interest", type: "info" },
            { text: "Round up payments — rounding a $387 payment up to $400 saves hundreds over a multi-year loan term", type: "info" },
            { text: "Avoid deferring payments — deferred payments still accrue daily interest that gets added to your balance", type: "warning" },
            { text: "Refinance if rates drop — simple interest loans can often be refinanced without penalty", type: "info" },
            { text: "Never miss a payment — late fees on simple interest loans are added to principal, increasing the base for future interest", type: "warning" },
          ],
        },
        examples: {
          title: "Simple Interest Examples",
          description: "Real-world examples using I = P × r × t",
          examples: [
            {
              title: "Car Loan: $20,000 at 6% for 4 Years",
              steps: [
                "Principal (P) = $20,000 | Rate (r) = 6% = 0.06 | Time (t) = 4 years",
                "Interest = P × r × t = $20,000 × 0.06 × 4 = $4,800",
                "Total repaid = $20,000 + $4,800 = $24,800",
                "Monthly payment = $24,800 ÷ 48 months = $516.67/month",
              ],
              result: "You pay $4,800 in interest over 4 years. Making one extra $516 payment in year 1 saves ~$200 in total interest.",
            },
            {
              title: "Savings: $5,000 at 4.5% for 18 Months",
              steps: [
                "Principal (P) = $5,000 | Rate (r) = 4.5% = 0.045 | Time (t) = 18 ÷ 12 = 1.5 years",
                "Interest = P × r × t = $5,000 × 0.045 × 1.5 = $337.50",
                "Final balance = $5,000 + $337.50 = $5,337.50",
                "Monthly interest = $337.50 ÷ 18 = $18.75/month",
              ],
              result: "A $5,000 deposit at 4.5% simple interest for 18 months earns $337.50. A compound account at the same rate would earn ~$345.",
            },
          ],
        },
      },
      faqs: [
        { question: "What is the simple interest formula?", answer: "Simple interest uses I = P × r × t, where I is interest, P is principal, r is the annual rate as a decimal (5% = 0.05), and t is time in years. Total amount = A = P(1 + rt). Example: $1,000 at 8% for 2 years: I = $1,000 × 0.08 × 2 = $160, total = $1,160." },
        { question: "How is simple interest different from compound interest?", answer: "Simple interest is calculated only on the original principal — the interest amount stays the same each period. Compound interest is calculated on principal plus accumulated interest, so it grows over time. For borrowers, simple interest is cheaper. For savers, compound interest earns more. Example: $10,000 at 5% for 10 years — simple: $5,000 interest. Compound monthly: $6,470 — 29% more." },
        { question: "Do car loans use simple interest?", answer: "Yes, most auto loans in the U.S. use simple (actuarial) interest calculated daily on the outstanding balance. Each payment goes first to accrued interest, then reduces principal. This means extra payments or paying early significantly reduces total interest, since the principal drops faster." },
        { question: "How do I calculate simple interest for months or days?", answer: "Convert time to years first. For months: t = months ÷ 12. For days: t = days ÷ 365. Example: 6 months = 0.5 years. $2,000 at 6% for 6 months: I = $2,000 × 0.06 × 0.5 = $60. This calculator handles the conversion automatically." },
        { question: "Can I solve for principal, rate, or time?", answer: "Yes — the formula rearranges to: Principal = I ÷ (r × t). Rate = I ÷ (P × t). Time = I ÷ (P × r). Example: paid $300 interest at 5% over 3 years → principal = $300 ÷ (0.05 × 3) = $2,000." },
        { question: "Is simple interest good for savings accounts?", answer: "Most banks use compound interest (daily or monthly) which is better for savers. Some CDs and bonds use simple interest. Always compare APY — a 5% APY compound account earns more than 5% simple interest over time. Today's high-yield savings accounts offer 4-5% APY with daily compounding." },
      ],
      references: [
        { authors: "Investopedia", year: "2025", title: "Simple Interest Definition, Formula, and Example", source: "Investopedia", url: "https://www.investopedia.com/terms/s/simple_interest.asp" },
        { authors: "Federal Reserve Bank of St. Louis", year: "2024", title: "Interest Rates and the Economy", source: "Federal Reserve Education", url: "https://www.stlouisfed.org/education" },
      ],
      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Calculate Interest", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { title: "Simple Interest Calculator", text: "Calculate simple interest with the I=Prt formula — loans, savings, and more." },
      accessibility: { calculatorLabel: "Simple Interest Calculator", resultsLabel: "Simple Interest Results" },
      sources: { title: "Sources" },
    },
  },

  inputs: [
    {
      id: "mode",
      type: "select",
      defaultValue: "loan",
      options: [
        { value: "loan", label: "💳 Loan (Interest Owed)" },
        { value: "savings", label: "🏦 Savings (Interest Earned)" },
      ],
    },
    { id: "principal", type: "number", defaultValue: null, placeholder: "10000", min: 1, max: 10000000, unitType: "currency", syncGroup: false },
    { id: "rateLoan", type: "slider", defaultValue: 8.5, min: 0.1, max: 30, step: 0.1, suffix: "%", showWhen: { field: "mode", value: "loan" } },
    { id: "rateSavings", type: "slider", defaultValue: 4.5, min: 0.1, max: 10, step: 0.1, suffix: "%", showWhen: { field: "mode", value: "savings" } },
    {
      id: "timeUnit",
      type: "select",
      defaultValue: "years",
      options: [
        { value: "days", label: "Days" },
        { value: "months", label: "Months" },
        { value: "years", label: "Years" },
      ],
    },
    { id: "timePeriod", type: "stepper", defaultValue: 3, min: 1, max: 1000, step: 1 },
  ],

  inputGroups: [],

  results: [
    { id: "totalInterest", type: "currency", primary: true, highlight: true },
    { id: "finalAmount", type: "currency" },
    { id: "principal", type: "currency" },
    { id: "effectiveRate", type: "text" },
    { id: "dailyInterest", type: "currency" },
    { id: "monthlyInterest", type: "currency" },
  ],

  infoCards: [
    {
      id: "breakdown",
      type: "list",
      icon: "💰",
      items: [
        { id: "totalInterest", valueKey: "totalInterest" },
        { id: "finalAmount", valueKey: "finalAmount" },
        { id: "principal", valueKey: "principal" },
        { id: "effectiveRate", valueKey: "effectiveRate" },
      ],
    },
    {
      id: "perPeriod",
      type: "list",
      icon: "📅",
      items: [
        { id: "dailyInterest", valueKey: "dailyInterest" },
        { id: "monthlyInterest", valueKey: "monthlyInterest" },
        { id: "totalInterest", valueKey: "totalInterest" },
        { id: "finalAmount", valueKey: "finalAmount" },
      ],
    },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  detailedTable: {
    id: "growthTable",
    buttonLabel: "View Year-by-Year Breakdown",
    buttonIcon: "📊",
    modalTitle: "Year-by-Year Interest Breakdown",
    columns: [
      { id: "year", label: "Year", align: "center" },
      { id: "simpleInterest", label: "Simple Interest Earned", align: "right", highlight: true },
      { id: "simpleBalance", label: "Simple Balance", align: "right" },
      { id: "compoundBalance", label: "Compound Balance", align: "right" },
      { id: "difference", label: "Compound Advantage", align: "right" },
    ],
  },

  chart: {
    id: "interestChart",
    type: "line",
    xKey: "year",
    series: [
      { key: "simple", color: "#3b82f6" },
      { key: "compound", color: "#10b981" },
    ],
    stacked: false,
  },

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "simpleVsCompound", type: "prose", icon: "⚡" },
    { id: "whenUsed", type: "list", icon: "📋", itemCount: 6 },
    { id: "howToSave", type: "list", icon: "💡", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "Investopedia", year: "2025", title: "Simple Interest Definition, Formula, and Example", source: "Investopedia", url: "https://www.investopedia.com/terms/s/simple_interest.asp" },
    { authors: "Federal Reserve Bank of St. Louis", year: "2024", title: "Interest Rates and the Economy", source: "Federal Reserve Education", url: "https://www.stlouisfed.org/education" },
  ],

  hero: { showImage: true, showBadges: true, showReviews: true },
  sidebar: { showRelated: true, showAds: true },
  features: { history: true, favorites: true, share: true, export: true },
  relatedCalculators: ["compound-interest-calculator", "loan-calculator", "savings-goal", "interest-calculator"],
  ads: { enabled: true, slots: ["sidebar", "results-below"] },
};

export function calculateSimpleInterest(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const currencyUnit = fieldUnits["principal"] ?? "USD";
  const sym = currencyUnit === "EUR" ? "€" : currencyUnit === "GBP" ? "£" : currencyUnit === "BRL" ? "R$" : "$";

  const fmt = (n: number) => {
    const abs = Math.abs(n);
    const s = abs >= 1000000
      ? `${(abs / 1000000).toFixed(2)}M`
      : abs >= 1000
      ? abs.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : abs.toFixed(2);
    return n < 0 ? `-${sym}${s}` : `${sym}${s}`;
  };

  const principal = (values.principal as number) ?? 0;
  const mode = (values.mode as string) ?? "loan";
  const rate = mode === "savings"
    ? ((values.rateSavings as number) ?? 4.5)
    : ((values.rateLoan as number) ?? 8.5);
  const timeUnit = (values.timeUnit as string) ?? "years";
  const timePeriod = (values.timePeriod as number) ?? 1;

  if (!principal || principal <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Convert time to years
  let timeInYears: number;
  if (timeUnit === "days") timeInYears = timePeriod / 365;
  else if (timeUnit === "months") timeInYears = timePeriod / 12;
  else timeInYears = timePeriod;

  const r = rate / 100;

  // I = P * r * t
  const totalInterest = principal * r * timeInYears;
  const finalAmount = principal + totalInterest;
  const dailyInterest = principal * r / 365;
  const monthlyInterest = principal * r / 12;

  // Year-by-year table & chart data
  const yearsToShow = Math.max(Math.ceil(timeInYears), 1);
  const chartYears = Math.min(yearsToShow + 2, 10);
  const chartData: Array<{ year: string; simple: number; compound: number }> = [];
  const tableData: Array<{ year: string; simpleInterest: string; simpleBalance: string; compoundBalance: string; difference: string }> = [];

  for (let y = 1; y <= chartYears; y++) {
    const simpleBalance = principal + (principal * r * y);
    const compoundBalance = principal * Math.pow(1 + r / 12, 12 * y);
    const diff = compoundBalance - simpleBalance;

    chartData.push({
      year: `Y${y}`,
      simple: Math.round(simpleBalance * 100) / 100,
      compound: Math.round(compoundBalance * 100) / 100,
    });

    tableData.push({
      year: `Year ${y}`,
      simpleInterest: fmt(principal * r * y),
      simpleBalance: fmt(simpleBalance),
      compoundBalance: fmt(compoundBalance),
      difference: `+${fmt(diff)}`,
    });
  }

  const timeLabel = timeUnit === "days"
    ? `${timePeriod} days`
    : timeUnit === "months"
    ? `${timePeriod} months`
    : `${timePeriod} year${timePeriod !== 1 ? "s" : ""}`;

  return {
    values: { totalInterest, finalAmount, principal, effectiveRate: rate, dailyInterest, monthlyInterest },
    formatted: {
      totalInterest: fmt(totalInterest),
      finalAmount: fmt(finalAmount),
      principal: fmt(principal),
      effectiveRate: `${rate.toFixed(2)}% / yr`,
      dailyInterest: fmt(dailyInterest),
      monthlyInterest: fmt(monthlyInterest),
    },
    summary: `Interest: ${fmt(totalInterest)} on ${fmt(principal)} over ${timeLabel} — Total: ${fmt(finalAmount)}`,
    isValid: true,
    metadata: { chartData, tableData },
  };
}

export default simpleInterestCalculatorConfig;
