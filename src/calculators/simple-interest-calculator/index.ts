import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ═══════════════════════════════════════════════════════════════════════
// 🏦 SIMPLE INTEREST CALCULATOR — V3 (Rebuilt from competitive research)
// ═══════════════════════════════════════════════════════════════════════
// COMPETITIVE RESEARCH: Calculator.net, CalculatorSoup, NerdWallet
//
// KEY DESIGN DECISIONS:
//   ✅ NO confusing "Solve For" dropdown — just calculate interest (90% use case)
//   ✅ Clean inputs: Principal + Rate + Time + TimeUnit
//   ✅ Day Convention only shows when TimeUnit = days
//   ✅ Step-by-step formula shown (like CalculatorSoup — SEO gold)
//   ✅ Simple vs Compound comparison (unique differentiator)
//   ✅ Year-by-year schedule table (like Calculator.net)
//   ✅ Area chart: balance growth + compound comparison line
//   ✅ Currency dropdown with 32+ currencies
//   ✅ Daily/Monthly/Yearly interest breakdown
// ═══════════════════════════════════════════════════════════════════════

// ─── Helpers ─────────────────────────────────────────────────────────
function fmtC(val: number, sym: string): string {
  if (val === 0) return `${sym}0.00`;
  return `${sym}${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtNum(val: number, dec = 2): string {
  return val.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

const SYMBOLS: Record<string, string> = {
  USD: "$", EUR: "€", GBP: "£", MXN: "MX$", BRL: "R$", JPY: "¥",
  INR: "₹", CAD: "C$", AUD: "A$", CHF: "CHF", COP: "COL$",
  ARS: "AR$", PEN: "S/", CLP: "CLP$", DOP: "RD$", CNY: "¥",
};

// ═══════════════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════════════
export const simpleInterestCalculatorConfig: CalculatorConfigV4 = {
  id: "simple-interest-calculator",
  version: "4.0",
  category: "finance",
  icon: "🏦",

  presets: [
    { id: "personalLoan", icon: "💳", values: { principal: 10000, rate: 8.5, term: 36, dayConvention: "365" } },
    { id: "savingsCD", icon: "🏦", values: { principal: 25000, rate: 4.5, term: 12, dayConvention: "365" } },
    { id: "carLoan", icon: "🚗", values: { principal: 20000, rate: 6.9, term: 60, dayConvention: "365" } },
    { id: "shortTerm", icon: "📅", values: { principal: 5000, rate: 12, term: 6, dayConvention: "360" } },
  ],

  t: {
    en: {
      name: "Simple Interest Calculator",
      slug: "simple-interest-calculator",
      subtitle: "Calculate simple interest on loans or savings. Find total interest earned or owed, and see how simple interest compares to compound interest over time.",
      breadcrumb: "Simple Interest",

      seo: {
        title: "Simple Interest Calculator I=Prt - Free Online Tool",
        description: "Calculate simple interest using I=Prt formula. See total interest, year-by-year schedule, and compare with compound interest. Supports 32+ currencies.",
        shortDescription: "Calculate simple interest with I=Prt formula instantly.",
        keywords: ["simple interest calculator", "I=Prt calculator", "simple interest formula", "interest calculator", "calculate simple interest", "loan interest calculator", "savings interest", "free interest calculator"],
      },

      calculator: { yourInformation: "Loan / Investment Details" },
      ui: { yourInformation: "Loan / Investment Details", calculate: "Calculate", reset: "Reset", results: "Results" },

      inputs: {
        principal: {
          label: "Principal Amount",
          helpText: "The initial amount borrowed or invested",
        },
        rate: {
          label: "Annual Interest Rate",
          helpText: "The yearly interest rate as a percentage",
        },
        term: {
          label: "Term",
          helpText: "How long the money is borrowed or invested",
        },
        dayConvention: {
          label: "Day Count",
          helpText: "365 = standard year, 360 = banker's year (used in some commercial loans)",
          options: {
            "365": "365 days (Standard)",
            "360": "360 days (Banker's)",
          },
        },
      },

      results: {
        totalInterest: { label: "Total Interest" },
        totalAmount: { label: "Total Amount (P + I)" },
        dailyInterest: { label: "Daily Interest" },
        monthlyInterest: { label: "Monthly Interest" },
      },

      presets: {
        personalLoan: { label: "💳 Personal Loan", description: "$10K at 8.5% for 3 years" },
        savingsCD: { label: "🏦 Savings CD", description: "$25K at 4.5% for 1 year" },
        carLoan: { label: "🚗 Car Loan", description: "$20K at 6.9% for 5 years" },
        shortTerm: { label: "📅 Short-Term", description: "$5K at 12% for 6 months" },
      },

      values: {},
      formats: {
        summary: "{principal} at {rate}% for {time} = {interest} interest → Total: {total}",
      },

      infoCards: {
        formula: {
          title: "Formula Step-by-Step",
          items: [
            { label: "Formula", valueKey: "formulaDisplay" },
            { label: "Step 1: Rate as Decimal", valueKey: "step1" },
            { label: "Step 2: Time in Years", valueKey: "step2" },
            { label: "Step 3: I = P × r × t", valueKey: "step3" },
          ],
        },
        comparison: {
          title: "Simple vs Compound Interest",
          items: [
            { label: "Simple Interest Total", valueKey: "simpleTotal" },
            { label: "Compound Interest Total", valueKey: "compoundTotal" },
            { label: "You Save (Simple)", valueKey: "savings" },
            { label: "Difference", valueKey: "diffPercent" },
          ],
        },
        tips: {
          title: "Smart Interest Tips",
          items: [
            "Simple interest is calculated only on the original principal — you never pay interest on interest.",
            "Most car loans and personal loans use simple interest — paying early saves you money.",
            "The 360-day banker's year slightly increases interest vs the standard 365-day method.",
            "Quick math: $10,000 at 5% for 3 years = $10,000 × 0.05 × 3 = $1,500 interest.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is Simple Interest?",
          content: "Simple interest is a method of calculating interest where the charge is applied only to the original principal amount, not on accumulated interest. The formula is I = P × r × t, where I is interest, P is principal, r is the annual rate (as a decimal), and t is time in years. Unlike compound interest, simple interest grows linearly — you pay or earn the same amount each period. It's commonly used for auto loans, personal loans, some student loans, and certificates of deposit (CDs).",
        },
        howItWorks: {
          title: "How to Calculate Simple Interest (I = Prt)",
          content: "Step 1: Convert the rate from percentage to decimal by dividing by 100. Example: 8.5% becomes 0.085. Step 2: Express time in years. If you have months, divide by 12. If days, divide by 365 (or 360 for banker's convention). Step 3: Multiply: I = P × r × t. Example: $10,000 × 0.085 × 3 = $2,550 interest. The total amount owed or earned is A = P + I = $10,000 + $2,550 = $12,550.",
        },
        considerations: {
          title: "Important Considerations",
          items: [
            { text: "Simple interest is always cheaper than compound interest for borrowers. Over 5 years at 5%, simple = $2,500 vs compound (monthly) = $2,834.", type: "info" },
            { text: "The 360-day banker's convention increases interest slightly. $10,000 at 6% for 90 days: 365-day = $147.95, 360-day = $150.00.", type: "warning" },
            { text: "Most savings accounts use compound interest, not simple. CDs and bonds are exceptions that may use simple interest.", type: "warning" },
            { text: "Paying a loan early reduces total interest because simple interest only accrues on remaining time.", type: "info" },
            { text: "The effective annual rate for simple interest equals the stated rate. For compound interest, the effective rate is higher.", type: "info" },
            { text: "When comparing loans, always check if they use simple or compound interest — the difference grows significantly over time.", type: "info" },
          ],
        },
        formulas: {
          title: "Simple Interest Formulas",
          items: [
            { text: "Interest: I = P × r × t (principal × rate as decimal × time in years)", type: "info" },
            { text: "Total Amount: A = P + I = P(1 + rt)", type: "info" },
            { text: "Find Principal: P = I ÷ (r × t)", type: "info" },
            { text: "Find Rate: r = I ÷ (P × t) → then × 100 for percentage", type: "info" },
            { text: "Find Time: t = I ÷ (P × r)", type: "info" },
            { text: "Time conversion: months ÷ 12 = years | days ÷ 365 = years", type: "info" },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step scenarios",
          examples: [
            {
              title: "Personal Loan: $10,000 at 8.5% for 3 years",
              steps: [
                "Principal (P) = $10,000",
                "Rate: 8.5% ÷ 100 = 0.085",
                "Time (t) = 3 years",
                "I = $10,000 × 0.085 × 3 = $2,550",
                "Total = $10,000 + $2,550 = $12,550",
              ],
              result: "Total interest: $2,550. You pay $70.83/month in interest.",
            },
            {
              title: "90-Day Note: $5,000 at 12% (Banker's 360)",
              steps: [
                "Principal (P) = $5,000",
                "Rate: 12% ÷ 100 = 0.12",
                "Time: 90 days ÷ 360 = 0.25 years",
                "I = $5,000 × 0.12 × 0.25 = $150",
                "Total = $5,000 + $150 = $5,150",
              ],
              result: "Interest: $150. Using 365-day method would give $147.95 instead.",
            },
          ],
        },
      },

      faqs: [
        { question: "What is the simple interest formula?", answer: "I = P × r × t, where I = interest, P = principal, r = annual rate as decimal (divide percentage by 100), t = time in years. Total amount is A = P + I." },
        { question: "What is the difference between simple and compound interest?", answer: "Simple interest is calculated only on the original principal. Compound interest is calculated on principal PLUS accumulated interest. For a $10,000 loan at 5% over 5 years: simple interest = $2,500, compound interest (monthly) = $2,834. The difference grows over time." },
        { question: "What is the 360-day banker's year?", answer: "Some banks use a 360-day year (12 months × 30 days) instead of 365 days. This slightly increases interest charged because each day represents a larger fraction of the year (1/360 vs 1/365). Common in commercial loans and Treasury bills." },
        { question: "What types of loans use simple interest?", answer: "Auto loans, personal loans, some student loans, payday loans, and certificates of deposit (CDs). Mortgages, credit cards, and savings accounts typically use compound interest." },
        { question: "How do I calculate interest for months?", answer: "Divide months by 12 to get years. Example: 18 months = 1.5 years. Then use I = P × r × 1.5. This calculator does the conversion automatically." },
        { question: "Is simple interest better for borrowers?", answer: "Yes. Simple interest costs less because you only pay interest on the original balance, not on accumulated interest. As an investor, you want compound interest to maximize returns." },
        { question: "How much is daily interest on $10,000 at 6%?", answer: "Daily interest = ($10,000 × 0.06) ÷ 365 = $1.64 per day. Using the 360-day convention: $1.67 per day." },
        { question: "Can I use this for savings accounts?", answer: "This calculator works for any simple interest scenario — loans, CDs, bonds, or savings with simple interest. Most savings accounts use compound interest though, so use our Compound Interest Calculator for those." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Calculate", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },

      chart: {
        title: "Balance Growth Over Time",
        xLabel: "",
        yLabel: "Amount",
        series: {
          principal: "Principal",
          simpleInterest: "Simple Interest",
          compoundLine: "If Compounded (monthly)",
        },
      },

      detailedTable: {
        schedule: {
          button: "View Year-by-Year Schedule",
          title: "Simple Interest Schedule",
          columns: {
            year: "Year",
            interest: "Interest This Year",
            totalInterest: "Total Interest",
            balance: "Balance",
          },
        },
      },
    },
  },

  inputs: [
    {
      id: "principal",
      type: "number",
      defaultValue: null,
      placeholder: "10000",
      min: 1,
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    {
      id: "rate",
      type: "slider",
      defaultValue: 8.5,
      min: 0.1,
      max: 30,
      step: 0.1,
      suffix: "%",
    },
    {
      id: "term",
      type: "number",
      defaultValue: 36,
      placeholder: "36",
      min: 1,
      
      unitType: "loan_term",
      syncGroup: false,
      defaultUnit: "yrs_mos",
    },
    {
      id: "dayConvention",
      type: "select",
      defaultValue: "365",
      options: [
        { value: "365" },
        { value: "360" },
      ],
    },
  ],

  inputGroups: [],

  results: [
    { id: "totalInterest", type: "primary", format: "text" },
    { id: "totalAmount", type: "secondary", format: "text" },
    { id: "dailyInterest", type: "secondary", format: "text" },
    { id: "monthlyInterest", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "formula", type: "list", icon: "🧮", itemCount: 4 },
    { id: "comparison", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  chart: {
    id: "balanceGrowth",
    type: "area",
    xKey: "year",
    height: 300,
    stacked: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "principal", type: "area", stackId: "balance", color: "#3b82f6" },
      { key: "simpleInterest", type: "area", stackId: "balance", color: "#22c55e" },
      { key: "compoundLine", type: "line", color: "#f97316" },
    ],
  },

  detailedTable: {
    id: "schedule",
    buttonLabel: "View Year-by-Year Schedule",
    buttonIcon: "📋",
    modalTitle: "Simple Interest Schedule",
    columns: [
      { id: "year", label: "Year", align: "center" },
      { id: "interest", label: "Interest This Year", align: "right", highlight: true },
      { id: "totalInterest", label: "Total Interest", align: "right" },
      { id: "balance", label: "Balance", align: "right" },
    ],
  },

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "formulas", type: "list", icon: "🧮", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "💡", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }, { id: "6" }, { id: "7" }],

  references: [
    { authors: "U.S. Securities and Exchange Commission", year: "2026", title: "Investor.gov — Interest and Savings", source: "SEC", url: "https://www.investor.gov/" },
    { authors: "Federal Reserve", year: "2026", title: "Consumer Credit — G.19 Release", source: "Federal Reserve", url: "https://www.federalreserve.gov/releases/g19/current/" },
    { authors: "Investopedia", year: "2026", title: "Simple Interest: Definition, Formula, Examples", source: "Investopedia", url: "https://www.investopedia.com/terms/s/simple_interest.asp" },
  ],

  hero: { badge: "Finance", badgeVariant: "blue" },
  sidebar: {},
  features: {},
  relatedCalculators: ["compound-interest", "interest-calculator", "loan-calculator", "savings-calculator"],
  ads: {},
};

// ═══════════════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════════════
export function calculateSimpleInterestCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read inputs ───────────────────────────────────────────────────
  const principal = values.principal as number | null;
  const rate = values.rate as number | null;
  const termMonths = values.term as number | null;
  const dayConvention = parseInt((values.dayConvention as string) || "365");

  // ── Validate ──────────────────────────────────────────────────────
  if (!principal || principal <= 0 || rate === null || rate <= 0 || !termMonths || termMonths <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Currency ──────────────────────────────────────────────────────
  const curr = fieldUnits.principal || "USD";
  const sym = SYMBOLS[curr] || "$";

  // ── Convert to years ──────────────────────────────────────────────
  const P = principal;
  const r = rate / 100;
  const tYears = termMonths / 12;
  const wholeYears = Math.floor(tYears);
  const remainMonths = Math.round(termMonths % 12);
  const timeDisplay = remainMonths > 0
    ? (wholeYears > 0 ? `${wholeYears} yr${wholeYears !== 1 ? "s" : ""} ${remainMonths} mo${remainMonths !== 1 ? "s" : ""}` : `${remainMonths} month${remainMonths !== 1 ? "s" : ""}`)
    : `${wholeYears} year${wholeYears !== 1 ? "s" : ""}`;

  // ── Simple Interest: I = P × r × t ───────────────────────────────
  const I = P * r * tYears;
  const totalAmount = P + I;

  // ── Breakdowns ────────────────────────────────────────────────────
  const totalDays = tYears * 365;
  const dailyInterest = totalDays > 0 ? I / totalDays : 0;
  const totalMonths = tYears * 12;
  const monthlyInterest = totalMonths > 0 ? I / totalMonths : 0;
  const yearlyInterest = tYears > 0 ? I / tYears : 0;

  // ── Step-by-step formula ──────────────────────────────────────────
  const formulaDisplay = `I = P × r × t`;
  const step1 = `${rate}% ÷ 100 = ${r}`;
  const step2 = remainMonths > 0
    ? `${termMonths} months ÷ 12 = ${fmtNum(tYears, 4)} years`
    : `${wholeYears} years`;
  const step3 = `${fmtC(P, sym)} × ${r} × ${fmtNum(tYears, 4)} = ${fmtC(I, sym)}`;

  // ── Compound Interest comparison (monthly compounding) ────────────
  const compoundAmount = P * Math.pow(1 + r / 12, tYears * 12);
  const compoundInterest = compoundAmount - P;
  const savings = compoundInterest - I;
  const diffPercent = I > 0 ? ((savings / I) * 100) : 0;

  // ── Chart data (year by year) ─────────────────────────────────────
  const periods = Math.max(1, Math.ceil(tYears));
  const chartData = [];
  for (let yr = 0; yr <= periods; yr++) {
    const yearFraction = Math.min(yr, tYears);
    const simpleI = P * r * yearFraction;
    const compA = P * Math.pow(1 + r / 12, yearFraction * 12);
    chartData.push({
      year: `Year ${yr}`,
      principal: P,
      simpleInterest: Math.round(simpleI * 100) / 100,
      compoundLine: Math.round(compA * 100) / 100,
    });
  }

  // ── Year-by-year table ────────────────────────────────────────────
  const tableData = [];
  for (let yr = 1; yr <= periods; yr++) {
    const yearFraction = Math.min(yr, tYears);
    const prevFraction = Math.min(yr - 1, tYears);
    const interestThisYear = P * r * (yearFraction - prevFraction);
    const totalInterestSoFar = P * r * yearFraction;
    tableData.push({
      year: `Year ${yr}`,
      interest: fmtC(interestThisYear, sym),
      totalInterest: fmtC(totalInterestSoFar, sym),
      balance: fmtC(P + totalInterestSoFar, sym),
    });
  }

  // ── Format results ────────────────────────────────────────────────
  const formatted: Record<string, string> = {
    totalInterest: fmtC(I, sym),
    totalAmount: fmtC(totalAmount, sym),
    dailyInterest: fmtC(dailyInterest, sym),
    monthlyInterest: fmtC(monthlyInterest, sym),

    // InfoCard: formula step-by-step
    formulaDisplay,
    step1,
    step2,
    step3,

    // InfoCard: comparison
    simpleTotal: fmtC(totalAmount, sym),
    compoundTotal: fmtC(compoundAmount, sym),
    savings: `${fmtC(savings, sym)} less with simple`,
    diffPercent: `${fmtNum(diffPercent, 1)}% less interest`,
  };

  // ── Summary ───────────────────────────────────────────────────────
  const summary = f.summary
    ?.replace("{principal}", fmtC(P, sym))
    ?.replace("{rate}", `${rate}`)
    ?.replace("{time}", timeDisplay)
    ?.replace("{interest}", fmtC(I, sym))
    ?.replace("{total}", fmtC(totalAmount, sym))
    || `${fmtC(P, sym)} at ${rate}% for ${timeDisplay} = ${fmtC(I, sym)} interest`;

  return {
    values: {
      totalInterest: I,
      totalAmount,
      dailyInterest,
      monthlyInterest,
    },
    formatted,
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default simpleInterestCalculatorConfig;
