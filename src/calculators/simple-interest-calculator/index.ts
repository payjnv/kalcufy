import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ═══════════════════════════════════════════════════════════════════════
// 🏦 SIMPLE INTEREST CALCULATOR — V2 Complete Rebuild
// ═══════════════════════════════════════════════════════════════════════
// FEATURES vs competitors (Calculator.net, CalculatorSoup, NerdWallet):
//   ✅ 4 solve modes: Interest, Principal, Rate, Time
//   ✅ Time unit: days, months, years
//   ✅ Day convention: 360 (banker's) vs 365 (exact)
//   ✅ Currency dropdown (32+ currencies, geo-detection)
//   ✅ Year-by-year breakdown table (detailedTable)
//   ✅ Simple vs Compound comparison
//   ✅ Daily/monthly/yearly interest breakdown
//   ✅ Area chart: balance growth over time
//   ✅ NO competitor has all of this in one tool
// ═══════════════════════════════════════════════════════════════════════

// ─── Helpers ─────────────────────────────────────────────────────────
function fmtC(val: number, sym: string): string {
  if (val === 0) return `${sym}0.00`;
  if (Math.abs(val) >= 1e9) return `${sym}${(val / 1e9).toFixed(2)}B`;
  if (Math.abs(val) >= 1e6) return `${sym}${(val / 1e6).toFixed(2)}M`;
  return `${sym}${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtNum(val: number): string {
  if (val === 0) return "0";
  return val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$", EUR: "€", GBP: "£", MXN: "MX$", BRL: "R$", JPY: "¥",
  INR: "₹", CAD: "C$", AUD: "A$", CHF: "CHF ", COP: "COL$",
  ARS: "AR$", PEN: "S/", CLP: "CLP$", CNY: "¥", KRW: "₩",
  SEK: "kr", NOK: "kr", DKK: "kr", NZD: "NZ$", ZAR: "R",
  SGD: "S$", HKD: "HK$", TRY: "₺", PLN: "zł", THB: "฿",
  TWD: "NT$", ILS: "₪", PHP: "₱", CZK: "Kč", IDR: "Rp",
  MYR: "RM", DOP: "RD$",
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
    { id: "personalLoan", icon: "💳", values: { solveFor: "interest", principal: 10000, rate: 8.5, timeValue: 3, timeUnit: "years", dayConvention: "365" } },
    { id: "savingsCD", icon: "🏦", values: { solveFor: "interest", principal: 25000, rate: 4.5, timeValue: 12, timeUnit: "months", dayConvention: "365" } },
    { id: "carLoan", icon: "🚗", values: { solveFor: "interest", principal: 20000, rate: 6.9, timeValue: 5, timeUnit: "years", dayConvention: "365" } },
    { id: "shortTerm", icon: "📅", values: { solveFor: "interest", principal: 5000, rate: 12, timeValue: 90, timeUnit: "days", dayConvention: "360" } },
  ],

  t: {
    en: {
      name: "Simple Interest Calculator",
      slug: "simple-interest-calculator",
      subtitle: "Calculate simple interest, principal, rate, or time. Compare simple vs compound interest and see year-by-year breakdowns.",
      breadcrumb: "Simple Interest",

      seo: {
        title: "Simple Interest Calculator I=Prt - Free Online Tool",
        description: "Calculate simple interest using I=Prt formula. Solve for interest, principal, rate, or time. Compare with compound interest. Supports 32+ currencies and banker's 360/365 day convention.",
        shortDescription: "Calculate simple interest with I=Prt formula. Solve for any variable.",
        keywords: ["simple interest calculator", "I=Prt calculator", "simple interest formula", "interest calculator", "calculate simple interest", "loan interest calculator", "savings interest calculator", "free interest calculator"],
      },

      calculator: { yourInformation: "Interest Details" },
      ui: { yourInformation: "Interest Details", calculate: "Calculate", reset: "Reset", results: "Results" },

      inputs: {
        solveFor: {
          label: "Solve For",
          helpText: "Choose what you want to calculate",
          options: {
            interest: "💰 Interest Amount",
            principal: "🏦 Principal Amount",
            rate: "📊 Interest Rate",
            time: "📅 Time Period",
          },
        },
        principal: {
          label: "Principal Amount",
          helpText: "The initial amount borrowed or invested",
        },
        rate: {
          label: "Annual Interest Rate",
          helpText: "The yearly interest rate as a percentage",
        },
        timeValue: {
          label: "Time Period",
          helpText: "How long the money is borrowed or invested",
        },
        timeUnit: {
          label: "Time Unit",
          helpText: "Select the time unit for your calculation",
          options: {
            days: "Days",
            months: "Months",
            years: "Years",
          },
        },
        interest: {
          label: "Interest Amount",
          helpText: "The total interest earned or owed",
        },
        dayConvention: {
          label: "Day Count Convention",
          helpText: "365 = exact year, 360 = banker's year (used in some loans)",
          options: {
            "365": "365 days (Exact/Actual)",
            "360": "360 days (Banker's Year)",
          },
        },
      },

      results: {
        totalInterest: { label: "Total Interest" },
        totalAmount: { label: "Total Amount (P + I)" },
        principal: { label: "Principal Required" },
        rate: { label: "Interest Rate Required" },
        timePeriod: { label: "Time Period Required" },
      },

      presets: {
        personalLoan: { label: "💳 Personal Loan", description: "$10K at 8.5% for 3 years" },
        savingsCD: { label: "🏦 Savings CD", description: "$25K at 4.5% for 12 months" },
        carLoan: { label: "🚗 Car Loan", description: "$20K at 6.9% for 5 years" },
        shortTerm: { label: "📅 Short-Term", description: "$5K at 12% for 90 days (360)" },
      },

      values: {
        "perDay": "per day",
        "perMonth": "per month",
        "perYear": "per year",
        "years": "years",
        "months": "months",
        "days": "days",
        "simple": "Simple Interest",
        "compound": "Compound Interest",
        "youSave": "You save",
        "moreWith": "more with",
      },

      formats: {
        summary: "Principal: {principal} × {rate}% × {time} = {interest} interest → Total: {total}",
      },

      infoCards: {
        breakdown: {
          title: "Interest Breakdown",
          items: [
            { label: "Total Interest", valueKey: "totalInterest" },
            { label: "Final Amount", valueKey: "totalAmount" },
            { label: "Daily Interest", valueKey: "dailyInterest" },
            { label: "Monthly Interest", valueKey: "monthlyInterest" },
          ],
        },
        comparison: {
          title: "Simple vs Compound",
          items: [
            { label: "Simple Interest", valueKey: "simpleTotal" },
            { label: "Compound Interest", valueKey: "compoundTotal" },
            { label: "Difference", valueKey: "interestDifference" },
            { label: "Effective Rate", valueKey: "effectiveRate" },
          ],
        },
        tips: {
          title: "Smart Interest Tips",
          items: [
            "Simple interest is calculated only on the original principal — unlike compound interest, which earns interest on interest.",
            "Most car loans and personal loans use simple interest — paying early reduces total interest paid.",
            "The 360-day banker's year slightly increases interest vs the 365-day exact method.",
            "To quickly estimate: multiply principal × rate × years. For $10,000 at 5% for 3 years: $10,000 × 0.05 × 3 = $1,500.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is Simple Interest?",
          content: "Simple interest is a method of calculating interest where the charge is applied only to the original principal amount, not on accumulated interest. The formula is I = P × r × t, where I is interest, P is principal, r is the annual rate (as a decimal), and t is time in years. Unlike compound interest, simple interest grows linearly — you pay or earn the same amount of interest each period. Simple interest is commonly used for auto loans, personal loans, some student loans, and certificates of deposit (CDs). It favors borrowers because the total cost is lower than compound interest over the same period.",
        },
        howItWorks: {
          title: "How to Calculate Simple Interest",
          content: "The simple interest formula is I = P × r × t. To use it: (1) Convert the rate from percentage to decimal by dividing by 100 (e.g., 8.5% becomes 0.085). (2) Express time in years — if you have months, divide by 12; if days, divide by 365 (or 360 for banker's convention). (3) Multiply all three values. The total amount owed or earned is A = P + I = P(1 + rt). This calculator can also solve in reverse — given any three of the four variables (I, P, r, t), it finds the missing one.",
        },
        considerations: {
          title: "Important Considerations",
          items: [
            { text: "Simple interest charges are based only on the principal — you never pay interest on interest. This makes it cheaper than compound interest for borrowers.", type: "info" },
            { text: "The 360-day (banker's year) convention slightly increases interest compared to the 365-day method. Some commercial loans and Treasury bills use 360 days.", type: "warning" },
            { text: "Most real-world savings accounts use compound interest, not simple interest. CDs and bonds are common exceptions.", type: "warning" },
            { text: "For loans: paying early reduces total interest because simple interest is calculated on remaining time, not accumulated interest.", type: "info" },
            { text: "The effective annual rate for simple interest equals the stated rate. For compound interest, the effective rate is higher due to compounding.", type: "info" },
            { text: "When comparing loan offers, check whether they use simple or compound interest — the difference can be significant over long terms.", type: "info" },
          ],
        },
        formulas: {
          title: "Simple Interest Formulas",
          items: [
            { text: "Interest: I = P × r × t (principal × rate × time in years)", type: "info" },
            { text: "Total Amount: A = P + I = P(1 + rt)", type: "info" },
            { text: "Solve for Principal: P = I ÷ (r × t)", type: "info" },
            { text: "Solve for Rate: r = I ÷ (P × t)", type: "info" },
            { text: "Solve for Time: t = I ÷ (P × r)", type: "info" },
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
                "Rate (r) = 8.5% = 0.085",
                "Time (t) = 3 years",
                "I = $10,000 × 0.085 × 3 = $2,550",
                "Total = $10,000 + $2,550 = $12,550",
              ],
              result: "Total interest: $2,550. Monthly interest: $70.83. Daily: $2.33.",
            },
            {
              title: "90-Day Note: $5,000 at 12% (Banker's 360)",
              steps: [
                "Principal (P) = $5,000",
                "Rate (r) = 12% = 0.12",
                "Time (t) = 90 ÷ 360 = 0.25 years",
                "I = $5,000 × 0.12 × 0.25 = $150",
                "Total = $5,000 + $150 = $5,150",
              ],
              result: "Interest on 90-day note: $150. Using 365 days would give $147.95.",
            },
          ],
        },
      },

      faqs: [
        { question: "What is the simple interest formula?", answer: "The formula is I = P × r × t, where I = interest, P = principal (starting amount), r = annual interest rate as a decimal, and t = time in years. To get the total amount, use A = P(1 + rt)." },
        { question: "What is the difference between simple and compound interest?", answer: "Simple interest is calculated only on the original principal. Compound interest is calculated on the principal PLUS accumulated interest. Over time, compound interest grows exponentially while simple interest grows linearly. For a $10,000 loan at 5% over 5 years: simple interest = $2,500, compound interest (monthly) = $2,834." },
        { question: "What is the 360-day banker's year?", answer: "Some financial institutions use a 360-day year (12 months × 30 days) instead of the actual 365-day year. This slightly increases the interest charged because each day represents a larger fraction of the year (1/360 vs 1/365). It's common in commercial loans, Treasury bills, and some money market instruments." },
        { question: "What types of loans use simple interest?", answer: "Auto loans, personal loans, some student loans, payday loans, and certificates of deposit (CDs) commonly use simple interest. Mortgages, credit cards, and most savings accounts use compound interest instead." },
        { question: "How do I calculate interest for months instead of years?", answer: "Divide the number of months by 12 to convert to years. For example, 18 months = 18/12 = 1.5 years. Then use the standard formula: I = P × r × 1.5. This calculator handles the conversion automatically — just select 'Months' as the time unit." },
        { question: "Can I solve for the interest rate or time period?", answer: "Yes! This calculator has 4 modes: solve for Interest (I = Prt), solve for Principal (P = I/rt), solve for Rate (r = I/Pt), and solve for Time (t = I/Pr). Select your desired mode from the 'Solve For' dropdown." },
        { question: "Is simple interest better for borrowers or lenders?", answer: "Simple interest benefits borrowers because they pay less total interest than with compound interest. Lenders prefer compound interest because they earn more. As an investor, you want compound interest (or to reinvest simple interest earnings) to maximize returns." },
        { question: "How is daily interest calculated?", answer: "Daily simple interest = (Principal × Annual Rate) ÷ 365 (or 360 for banker's convention). For a $10,000 loan at 6%: daily interest = ($10,000 × 0.06) ÷ 365 = $1.64 per day." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Calculate", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },

      chart: {
        title: "Balance Growth Over Time",
        xLabel: "Period",
        yLabel: "Amount",
        series: {
          principal: "Principal",
          interest: "Interest",
          compound: "If Compounded",
        },
      },

      detailedTable: {
        yearByYear: {
          button: "View Year-by-Year Breakdown",
          title: "Interest Accumulation Schedule",
          columns: {
            period: "Period",
            startBalance: "Start Balance",
            interest: "Interest Earned",
            endBalance: "End Balance",
            totalInterest: "Total Interest",
          },
        },
      },
    },
  },

  inputs: [
    {
      id: "solveFor",
      type: "select",
      defaultValue: "interest",
      options: [
        { value: "interest" },
        { value: "principal" },
        { value: "rate" },
        { value: "time" },
      ],
    },
    {
      id: "principal",
      type: "number",
      defaultValue: null,
      placeholder: "10000",
      min: 0,
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    {
      id: "interest",
      type: "number",
      defaultValue: null,
      placeholder: "2550",
      min: 0,
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
      id: "timeValue",
      type: "number",
      defaultValue: 3,
      placeholder: "3",
      min: 1,
      max: 100,
    },
    {
      id: "timeUnit",
      type: "select",
      defaultValue: "years",
      options: [
        { value: "days" },
        { value: "months" },
        { value: "years" },
      ],
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
    { id: "principal", type: "secondary", format: "text" },
    { id: "rate", type: "secondary", format: "text" },
    { id: "timePeriod", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "breakdown", type: "list", icon: "💰", itemCount: 4 },
    { id: "comparison", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  chart: {
    id: "balanceGrowth",
    type: "area",
    xKey: "period",
    height: 300,
    stacked: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "principal", type: "area", stackId: "balance", color: "#3b82f6" },
      { key: "interest", type: "area", stackId: "balance", color: "#22c55e" },
      { key: "compound", type: "line", color: "#f97316" },
    ],
  },

  detailedTable: {
    id: "yearByYear",
    buttonLabel: "View Year-by-Year Breakdown",
    buttonIcon: "📋",
    modalTitle: "Interest Accumulation Schedule",
    columns: [
      { id: "period", label: "Period", align: "center" },
      { id: "startBalance", label: "Start Balance", align: "right" },
      { id: "interest", label: "Interest Earned", align: "right", highlight: true },
      { id: "endBalance", label: "End Balance", align: "right" },
      { id: "totalInterest", label: "Total Interest", align: "right" },
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
    { authors: "U.S. Securities and Exchange Commission", year: "2026", title: "Saving and Investing — Interest", source: "SEC Investor.gov", url: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/savings-bonds" },
    { authors: "Federal Reserve", year: "2026", title: "Consumer Credit and Interest Rates", source: "Federal Reserve Economic Data", url: "https://www.federalreserve.gov/releases/g19/current/" },
    { authors: "Investopedia", year: "2026", title: "Simple Interest: Definition, Formula, and Examples", source: "Investopedia", url: "https://www.investopedia.com/terms/s/simple_interest.asp" },
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
  const v = (t?.values as Record<string, string>) || {};

  // ── Read inputs ───────────────────────────────────────────────────
  const solveFor = (values.solveFor as string) || "interest";
  const principal = values.principal as number | null;
  const interestInput = values.interest as number | null;
  const rate = values.rate as number | null;
  const timeValue = values.timeValue as number | null;
  const timeUnit = (values.timeUnit as string) || "years";
  const dayConvention = parseInt((values.dayConvention as string) || "365");

  // ── Currency ──────────────────────────────────────────────────────
  const curr = fieldUnits.principal || fieldUnits.interest || "USD";
  const sym = CURRENCY_SYMBOLS[curr] || "$";

  // ── Convert time to years ─────────────────────────────────────────
  function toYears(val: number, unit: string): number {
    switch (unit) {
      case "days": return val / dayConvention;
      case "months": return val / 12;
      case "years": return val;
      default: return val;
    }
  }

  function fromYears(yrs: number, unit: string): number {
    switch (unit) {
      case "days": return yrs * dayConvention;
      case "months": return yrs * 12;
      case "years": return yrs;
      default: return yrs;
    }
  }

  // ── Calculate based on mode ───────────────────────────────────────
  let I: number;       // Interest
  let P: number;       // Principal
  let r: number;       // Rate (decimal)
  let tYears: number;  // Time in years
  let formulaUsed: string;
  let solvedLabel: string;
  let solvedValue: string;

  switch (solveFor) {
    case "interest": {
      if (!principal || principal <= 0 || rate === null || rate <= 0 || !timeValue || timeValue <= 0) {
        return { values: {}, formatted: {}, summary: "", isValid: false };
      }
      P = principal;
      r = rate / 100;
      tYears = toYears(timeValue, timeUnit);
      I = P * r * tYears;
      formulaUsed = `I = ${fmtC(P, sym)} × ${rate}% × ${fmtNum(tYears)} yr = ${fmtC(I, sym)}`;
      solvedLabel = "totalInterest";
      solvedValue = fmtC(I, sym);
      break;
    }
    case "principal": {
      if (!interestInput || interestInput <= 0 || rate === null || rate <= 0 || !timeValue || timeValue <= 0) {
        return { values: {}, formatted: {}, summary: "", isValid: false };
      }
      I = interestInput;
      r = rate / 100;
      tYears = toYears(timeValue, timeUnit);
      P = I / (r * tYears);
      formulaUsed = `P = ${fmtC(I, sym)} ÷ (${rate}% × ${fmtNum(tYears)} yr) = ${fmtC(P, sym)}`;
      solvedLabel = "principal";
      solvedValue = fmtC(P, sym);
      break;
    }
    case "rate": {
      if (!principal || principal <= 0 || !interestInput || interestInput <= 0 || !timeValue || timeValue <= 0) {
        return { values: {}, formatted: {}, summary: "", isValid: false };
      }
      P = principal;
      I = interestInput;
      tYears = toYears(timeValue, timeUnit);
      r = I / (P * tYears);
      const rPct = r * 100;
      formulaUsed = `r = ${fmtC(I, sym)} ÷ (${fmtC(P, sym)} × ${fmtNum(tYears)} yr) = ${fmtNum(rPct)}%`;
      solvedLabel = "rate";
      solvedValue = `${fmtNum(rPct)}%`;
      break;
    }
    case "time": {
      if (!principal || principal <= 0 || !interestInput || interestInput <= 0 || rate === null || rate <= 0) {
        return { values: {}, formatted: {}, summary: "", isValid: false };
      }
      P = principal;
      I = interestInput;
      r = rate / 100;
      tYears = I / (P * r);
      const tDisplay = tYears;
      const yearsWhole = Math.floor(tDisplay);
      const monthsRem = Math.round((tDisplay - yearsWhole) * 12);
      formulaUsed = `t = ${fmtC(I, sym)} ÷ (${fmtC(P, sym)} × ${(r * 100).toFixed(1)}%) = ${fmtNum(tYears)} years`;
      solvedLabel = "timePeriod";
      solvedValue = monthsRem > 0 ? `${yearsWhole} years, ${monthsRem} months` : `${fmtNum(tYears)} years`;
      break;
    }
    default:
      return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const totalAmount = P + I;

  // ── Breakdowns ────────────────────────────────────────────────────
  const dailyInterest = I / (tYears * dayConvention);
  const monthlyInterest = I / (tYears * 12);
  const yearlyInterest = I / tYears;

  // ── Compound interest comparison ──────────────────────────────────
  const compoundAmount = P * Math.pow(1 + (r || (rate || 0) / 100) / 12, (tYears || 1) * 12);
  const compoundInterest = compoundAmount - P;
  const interestDiff = compoundInterest - I;
  const effectiveRate = tYears > 0 ? ((I / P) / tYears) * 100 : 0;

  // ── Chart data ────────────────────────────────────────────────────
  const periods = Math.max(1, Math.ceil(tYears));
  const chartData = [];
  for (let yr = 0; yr <= periods; yr++) {
    const simpleI = P * (r || 0) * yr;
    const compA = P * Math.pow(1 + (r || 0) / 12, yr * 12);
    chartData.push({
      period: `Year ${yr}`,
      principal: P,
      interest: simpleI,
      compound: compA,
    });
  }

  // ── Year-by-year table ────────────────────────────────────────────
  const tableData = [];
  let cumInterest = 0;
  for (let yr = 1; yr <= periods; yr++) {
    const periodInterest = yr <= tYears
      ? yearlyInterest
      : yearlyInterest * (tYears - (yr - 1));
    cumInterest += yr <= tYears ? yearlyInterest : Math.max(0, yearlyInterest * (tYears - (yr - 1)));
    const startBal = P + (cumInterest - (yr <= tYears ? yearlyInterest : Math.max(0, yearlyInterest * (tYears - (yr - 1)))));
    tableData.push({
      period: `Year ${yr}`,
      startBalance: fmtC(P + cumInterest - (yr <= tYears ? yearlyInterest : Math.max(0, periodInterest)), sym),
      interest: fmtC(yr <= tYears ? yearlyInterest : Math.max(0, periodInterest), sym),
      endBalance: fmtC(P + cumInterest, sym),
      totalInterest: fmtC(cumInterest, sym),
    });
  }

  // ── Format results ────────────────────────────────────────────────
  const formatted: Record<string, string> = {
    totalInterest: fmtC(I, sym),
    totalAmount: fmtC(totalAmount, sym),
    principal: fmtC(P, sym),
    rate: solveFor === "rate" ? solvedValue : `${(r * 100).toFixed(1)}%`,
    timePeriod: solveFor === "time" ? solvedValue : `${timeValue} ${timeUnit}`,

    // InfoCard: breakdown
    dailyInterest: fmtC(dailyInterest, sym),
    monthlyInterest: fmtC(monthlyInterest, sym),
    yearlyInterest: fmtC(yearlyInterest, sym),

    // InfoCard: comparison
    simpleTotal: fmtC(totalAmount, sym),
    compoundTotal: fmtC(compoundAmount, sym),
    interestDifference: `${fmtC(interestDiff, sym)} ${interestDiff > 0 ? "more" : "less"}`,
    effectiveRate: `${fmtNum(effectiveRate)}% per year`,
    formulaUsed,
  };

  // ── Summary ───────────────────────────────────────────────────────
  const f = (t?.formats as Record<string, string>) || {};
  const summary = f.summary
    ?.replace("{principal}", fmtC(P, sym))
    ?.replace("{rate}", `${(r * 100).toFixed(1)}`)
    ?.replace("{time}", `${fmtNum(tYears)} yr`)
    ?.replace("{interest}", fmtC(I, sym))
    ?.replace("{total}", fmtC(totalAmount, sym))
    || `${fmtC(P, sym)} at ${(r * 100).toFixed(1)}% for ${fmtNum(tYears)} years = ${fmtC(I, sym)} interest`;

  return {
    values: {
      totalInterest: I,
      totalAmount,
      principal: P,
      rate: r * 100,
      timePeriod: tYears,
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
