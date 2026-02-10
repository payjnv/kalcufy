import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// =============================================================================
// LOAN CALCULATOR V4 — Generic Loan Payment & Amortization Calculator
// SEO Target: "loan calculator" (~2-5M/mo global), "loan payment calculator",
//             "loan amortization calculator", "loan interest calculator"
// Differentiators: Extra payments + Term comparison table + True Cost Multiplier
//                  + Multi-currency + 5 languages + Amortization schedule
// =============================================================================

export const loanCalculatorConfig: CalculatorConfigV4 = {
  id: "loan-calculator",
  version: "4.0",
  category: "finance",
  icon: "💰",

  // ---------------------------------------------------------------------------
  // PRESETS
  // ---------------------------------------------------------------------------
  presets: [
    {
      id: "carLoan",
      icon: "🚗",
      values: { loanAmount: 25000, interestRate: 6.5, loanTerm: 5, extraPayment: 0 },
    },
    {
      id: "homeImprovement",
      icon: "🏠",
      values: { loanAmount: 15000, interestRate: 8.5, loanTerm: 3, extraPayment: 0 },
    },
    {
      id: "studentLoan",
      icon: "🎓",
      values: { loanAmount: 35000, interestRate: 5.5, loanTerm: 10, extraPayment: 0 },
    },
    {
      id: "debtConsolidation",
      icon: "💳",
      values: { loanAmount: 10000, interestRate: 12, loanTerm: 3, extraPayment: 50 },
    },
    {
      id: "businessLoan",
      icon: "🏢",
      values: { loanAmount: 50000, interestRate: 9, loanTerm: 7, extraPayment: 0 },
    },
  ],

  // ---------------------------------------------------------------------------
  // TRANSLATIONS (EN only — script translates to ES/PT/FR/DE)
  // ---------------------------------------------------------------------------
  t: {
    en: {
      name: "Loan Calculator",
      slug: "loan-calculator",
      subtitle: "Calculate your monthly loan payment, total interest, and view a full amortization schedule. See how extra payments save you money.",
      breadcrumb: "Loan Calc",

      seo: {
        title: "Loan Calculator - Free Payment & Amortization Tool",
        description: "Calculate your loan payment, total interest cost, and payoff date. View amortization schedule, compare terms, and see how extra payments save thousands.",
        shortDescription: "Free loan payment and amortization calculator.",
        keywords: [
          "loan calculator",
          "loan payment calculator",
          "loan amortization calculator",
          "loan interest calculator",
          "calculate loan payment",
          "loan payoff calculator",
          "extra payment calculator",
          "free loan calculator online",
        ],
      },

      calculator: { yourInformation: "Loan Details" },
      ui: {
        yourInformation: "Loan Details",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        loanAmount: {
          label: "Loan Amount",
          helpText: "Total amount you plan to borrow",
        },
        interestRate: {
          label: "Interest Rate (APR)",
          helpText: "Annual percentage rate charged by the lender",
        },
        loanTerm: {
          label: "Loan Term",
          helpText: "Number of years to repay the loan",
        },
        extraPayment: {
          label: "Extra Monthly Payment",
          helpText: "Additional amount paid toward principal each month (optional)",
        },
      },

      results: {
        monthlyPayment: { label: "Monthly Payment" },
        totalInterest: { label: "Total Interest" },
        totalCost: { label: "Total Cost" },
        costMultiplier: { label: "True Cost Multiplier" },
        payoffDate: { label: "Payoff Date" },
        interestRatio: { label: "Interest-to-Principal" },
        interestSaved: { label: "Interest Saved" },
        timeSaved: { label: "Time Saved" },
      },

      presets: {
        carLoan: { label: "Car Loan", description: "$25K at 6.5% for 5 years" },
        homeImprovement: { label: "Home Improvement", description: "$15K at 8.5% for 3 years" },
        studentLoan: { label: "Student Loan", description: "$35K at 5.5% for 10 years" },
        debtConsolidation: { label: "Debt Consolidation", description: "$10K at 12% for 3 years" },
        businessLoan: { label: "Business Loan", description: "$50K at 9% for 7 years" },
      },

      values: {
        years: "years",
        year: "year",
        months: "months",
        month: "month",
        perMonth: "/mo",
      },

      formats: {
        summary: "Your monthly payment is {monthlyPayment} for {loanTerm} years. Total interest: {totalInterest}. Total cost: {totalCost}.",
      },

      infoCards: {
        metrics: {
          title: "Loan Breakdown",
          items: [
            { label: "Monthly Payment", valueKey: "monthlyPayment" },
            { label: "Total Interest Paid", valueKey: "totalInterest" },
            { label: "Total Amount Paid", valueKey: "totalCost" },
            { label: "True Cost Multiplier", valueKey: "costMultiplier" },
          ],
        },
        details: {
          title: "Key Facts",
          items: [
            { label: "A shorter term means less total interest but higher monthly payments. A 15-year loan typically costs 40-60% less in interest than a 30-year loan." },
            { label: "Your credit score directly impacts your interest rate. A score above 740 can save thousands over the life of the loan compared to below 670." },
            { label: "Secured loans (backed by collateral like a car or home) generally offer lower rates than unsecured personal loans by 2-5 percentage points." },
            { label: "Even small extra payments can dramatically reduce total interest. An extra $50/month on a $25,000 loan can save over $1,500 in interest." },
          ],
        },
        tips: {
          title: "Save Money on Your Loan",
          items: [
            "Improve your credit score before applying — even 20 points can lower your rate by 0.25-0.5%",
            "Compare offers from at least 3 lenders — rates can vary by 2-3% for the same borrower",
            "Make extra payments toward principal whenever possible — every dollar goes directly to reducing your balance",
            "Watch for origination fees and prepayment penalties — they can add 1-6% to the true cost of borrowing",
          ],
        },
      },

      detailedTable: {
        amortizationSchedule: {
          button: "View Amortization Schedule",
          title: "Amortization Schedule",
          columns: {
            period: "Month",
            payment: "Payment",
            principal: "Principal",
            interest: "Interest",
            extraPmt: "Extra",
            balance: "Balance",
          },
        },
      },

      chart: {
        title: "Payment Breakdown Over Time",
        xLabel: "Year",
        yLabel: "Amount",
        series: {
          principal: "Principal",
          interest: "Interest",
        },
      },

      education: {
        whatIs: {
          title: "How Loan Payments Are Calculated",
          content: "When you take out a loan, the lender uses an amortization formula to determine your fixed monthly payment. This formula balances the loan amount (principal), annual interest rate, and loan term so that each payment covers both interest charges and a portion of the principal. In the early months, most of your payment goes toward interest because the outstanding balance is still high. As you pay down the principal over time, the interest portion shrinks and more of each payment reduces your balance. This predictable structure is what makes fixed-rate amortized loans the most common type of consumer loan — you always know exactly what you owe each month. The standard monthly payment formula is M = P × [r(1+r)^n] / [(1+r)^n – 1], where P is the principal, r is the monthly interest rate, and n is the total number of payments. Understanding this formula helps you see why even small changes in interest rate or term length can significantly affect your total cost.",
        },
        howItWorks: {
          title: "Understanding Amortization and Interest",
          content: "Amortization is the process of spreading a loan into a series of fixed payments over time. Each payment is split between interest (the cost of borrowing) and principal (reducing what you owe). At the start of a 30-year mortgage, roughly 70-80% of each payment goes to interest. By the halfway point, the split is closer to 50/50, and in the final years nearly all of your payment reduces the balance. This front-loaded interest structure means that making extra payments early in the loan term has the greatest impact on reducing total interest. For example, paying an extra $100 per month in the first year of a $200,000 mortgage at 6% could save over $30,000 in total interest over the life of the loan. This is also why refinancing to a shorter term or lower rate can produce dramatic savings — you're changing the underlying math that determines how much of each dollar goes to interest versus principal.",
        },
        considerations: {
          title: "Factors That Affect Your Loan Cost",
          items: [
            { text: "Credit score — The single biggest factor in your interest rate. Excellent credit (740+) can get rates 2-4% lower than fair credit (580-669), potentially saving tens of thousands over the loan term.", type: "info" as const },
            { text: "Loan term — Shorter terms mean higher monthly payments but dramatically less total interest. A 15-year loan vs. 30-year loan at the same rate can cut total interest by more than half.", type: "info" as const },
            { text: "Secured vs. unsecured — Secured loans (auto, mortgage) use collateral, allowing lower rates (3-8%). Unsecured personal loans carry higher rates (6-36%) because the lender takes more risk.", type: "info" as const },
            { text: "Prepayment penalties — Some lenders charge fees for paying off early. Always check before signing. Federal student loans and most mortgages originated after 2014 cannot have prepayment penalties.", type: "warning" as const },
            { text: "Origination fees — Upfront fees of 1-8% that increase your effective APR. A $10,000 loan with a 5% origination fee means you only receive $9,500 but repay the full $10,000 plus interest.", type: "warning" as const },
            { text: "APR vs. interest rate — APR includes fees and gives the true cost of borrowing. Always compare APRs, not just interest rates, when shopping for loans.", type: "info" as const },
          ],
        },
        categories: {
          title: "Common Types of Loans",
          items: [
            { text: "Personal loans — Unsecured, fixed-rate loans for almost any purpose. Typical rates: 6-36% APR. Terms: 1-7 years. Best for debt consolidation, home improvements, or major purchases.", type: "info" as const },
            { text: "Auto loans — Secured by the vehicle. Typical rates: 4-12% APR. Terms: 2-7 years. New cars generally get better rates than used cars. Experts recommend terms no longer than 60 months.", type: "info" as const },
            { text: "Mortgage loans — Secured by the home. Typical rates: 5-8% APR. Terms: 15 or 30 years. The largest loan most people will ever take. Interest may be tax-deductible.", type: "info" as const },
            { text: "Student loans — Federal loans offer fixed rates set by Congress (currently ~5-7%). Private student loans vary by creditworthiness. Income-driven repayment plans are available for federal loans.", type: "info" as const },
            { text: "Business loans — SBA loans offer rates from 5-10%. Traditional bank loans: 6-13%. Online lenders: 7-30%+. Terms vary widely from 1-25 years depending on the loan type and purpose.", type: "info" as const },
            { text: "Home equity loans — Secured by home equity. Typical rates: 7-12% APR. Can borrow up to 80-85% of equity. Interest may be tax-deductible if used for home improvements.", type: "info" as const },
          ],
        },
        examples: {
          title: "Step-by-Step Loan Calculations",
          description: "Two real-world examples showing how loan terms affect total cost",
          examples: [
            {
              title: "Car Loan: $25,000 at 6.5% for 5 years",
              steps: [
                "Principal (P) = $25,000",
                "Monthly rate (r) = 6.5% ÷ 12 = 0.5417%",
                "Number of payments (n) = 5 × 12 = 60",
                "M = $25,000 × [0.005417 × (1.005417)^60] / [(1.005417)^60 – 1]",
                "M = $25,000 × [0.005417 × 1.3829] / [1.3829 – 1]",
                "M = $25,000 × 0.007492 / 0.3829",
                "Monthly Payment = $489.15",
                "Total Paid = $489.15 × 60 = $29,349",
                "Total Interest = $29,349 – $25,000 = $4,349",
              ],
              result: "Monthly payment: $489.15 | Total interest: $4,349 | True cost: 1.17× the loan amount",
            },
            {
              title: "Student Loan: $35,000 at 5.5% for 10 years",
              steps: [
                "Principal (P) = $35,000",
                "Monthly rate (r) = 5.5% ÷ 12 = 0.4583%",
                "Number of payments (n) = 10 × 12 = 120",
                "M = $35,000 × [0.004583 × (1.004583)^120] / [(1.004583)^120 – 1]",
                "M = $35,000 × [0.004583 × 1.7289] / [1.7289 – 1]",
                "M = $35,000 × 0.007924 / 0.7289",
                "Monthly Payment = $380.03",
                "Total Paid = $380.03 × 120 = $45,604",
                "Total Interest = $45,604 – $35,000 = $10,604",
              ],
              result: "Monthly payment: $380.03 | Total interest: $10,604 | True cost: 1.30× the loan amount",
            },
          ],
        },
      },

      faqs: [
        {
          question: "What is the difference between APR and interest rate?",
          answer: "Interest rate is the base cost of borrowing money, expressed as a percentage. APR (Annual Percentage Rate) includes the interest rate plus additional fees like origination fees, closing costs, and discount points. APR gives you the true total cost of borrowing and is the best way to compare loan offers from different lenders. For example, a loan with a 5% interest rate and a 2% origination fee has an APR higher than 5%. Federal law requires lenders to disclose the APR before you sign any loan agreement.",
        },
        {
          question: "How does my credit score affect my loan interest rate?",
          answer: "Your credit score is the primary factor lenders use to set your interest rate. Borrowers with excellent credit (740-850) typically receive rates 2-4% lower than those with fair credit (580-669). On a $25,000 5-year loan, the difference between a 6% rate and a 12% rate is approximately $4,500 in extra interest. To improve your rate: pay bills on time, reduce credit card balances below 30% of limits, avoid opening new accounts before applying, and check your credit report for errors at AnnualCreditReport.com.",
        },
        {
          question: "Should I choose a shorter or longer loan term?",
          answer: "It depends on your financial priorities. A shorter term (e.g., 3 years vs. 7 years) means higher monthly payments but significantly less total interest — often 50-70% less. A longer term keeps monthly payments affordable but costs more over time. The best approach for many borrowers is to take the longer term for flexibility but make extra payments when possible. This gives you the safety net of lower required payments while still reducing interest if you can afford to pay more. Use this calculator to compare different terms and see the exact savings.",
        },
        {
          question: "What is amortization and how does it work?",
          answer: "Amortization is the process of paying off a loan through scheduled, equal payments over time. Each payment includes two parts: interest (the lender's fee for borrowing) and principal (reducing what you owe). In the early payments, most goes to interest. Over time, as the balance decreases, more of each payment goes toward the principal. This is why paying extra early in the loan term has the biggest impact — you reduce the balance that interest is calculated on, creating a compounding savings effect throughout the remaining term.",
        },
        {
          question: "Can I pay off my loan early without penalty?",
          answer: "Most modern loans allow early payoff without penalties. Federal student loans, most auto loans, and mortgages originated after January 2014 (under the Ability-to-Repay rule) cannot charge prepayment penalties. However, some personal loans and older mortgages may include them. Always check your loan agreement for a prepayment penalty clause before signing. If your loan has no penalty, making extra payments is one of the best financial moves you can make — even an extra $50-100 per month can save thousands in interest and shave years off your payoff date.",
        },
        {
          question: "How much can I save by making extra payments on my loan?",
          answer: "Extra payments go directly toward reducing your principal balance, which lowers the interest calculated on all future payments. The savings depend on your loan size, rate, and term. For example, adding $100/month extra to a $25,000 loan at 7% for 5 years saves approximately $800 in interest and pays off the loan 10 months early. On a larger loan like a $200,000 mortgage at 6% for 30 years, an extra $200/month saves over $65,000 in interest and cuts nearly 7 years off the term. Use the extra payment field in this calculator to see your exact savings.",
        },
      ],

      rating: {
        title: "Rate this Calculator",
        share: "Share",
        copied: "Copied!",
        copyLink: "Copy Link",
        clickToRate: "Click to rate",
        youRated: "You rated",
        stars: "stars",
        averageFrom: "average from",
        ratings: "ratings",
      },

      common: { home: "Home", calculators: "Calculators" },

      buttons: {
        calculate: "Calculate",
        reset: "Reset",
        pdf: "PDF",
        csv: "CSV",
        excel: "Excel",
        save: "Save",
        saved: "Saved",
        saving: "Saving...",
      },

      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
  },

  // ---------------------------------------------------------------------------
  // INPUTS
  // ---------------------------------------------------------------------------
  inputs: [
    {
      id: "loanAmount",
      type: "number",
      defaultValue: null,
      placeholder: "25000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 100,
      max: 10000000,
    },
    {
      id: "interestRate",
      type: "number",
      defaultValue: 7,
      min: 0,
      max: 36,
      step: 0.1,
      suffix: "%",
    },
    {
      id: "loanTerm",
      type: "number",
      defaultValue: 5,
      min: 1,
      max: 30,
      suffix: "years",
    },
    {
      id: "extraPayment",
      type: "number",
      defaultValue: 0,
      placeholder: "0",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 0,
      max: 100000,
    },
  ],

  inputGroups: [],

  // ---------------------------------------------------------------------------
  // RESULTS
  // ---------------------------------------------------------------------------
  results: [
    { id: "monthlyPayment", type: "primary", format: "text" },
    { id: "totalInterest", type: "secondary", format: "text" },
    { id: "totalCost", type: "secondary", format: "text" },
    { id: "costMultiplier", type: "secondary", format: "text" },
    { id: "payoffDate", type: "secondary", format: "text" },
    { id: "interestRatio", type: "secondary", format: "text" },
    { id: "interestSaved", type: "secondary", format: "text" },
    { id: "timeSaved", type: "secondary", format: "text" },
  ],

  // ---------------------------------------------------------------------------
  // INFOCARDS (2 list + 1 horizontal tips)
  // ---------------------------------------------------------------------------
  infoCards: [
    { id: "metrics", type: "list", icon: "📊", itemCount: 4 },
    { id: "details", type: "list", icon: "🎯", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ---------------------------------------------------------------------------
  // CHART — Stacked bar: principal vs interest per year
  // ---------------------------------------------------------------------------
  chart: {
    id: "paymentBreakdown",
    type: "bar",
    xKey: "year",
    stacked: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "principal", color: "#3b82f6", stackId: "pmt" },
      { key: "interest", color: "#f97316", stackId: "pmt" },
    ],
  },

  // ---------------------------------------------------------------------------
  // DETAILED TABLE — Amortization Schedule
  // ---------------------------------------------------------------------------
  detailedTable: {
    id: "amortizationSchedule",
    buttonLabel: "View Amortization Schedule",
    buttonIcon: "📋",
    modalTitle: "Amortization Schedule",
    columns: [
      { id: "period", label: "Month", align: "center" as const },
      { id: "payment", label: "Payment", align: "right" as const },
      { id: "principal", label: "Principal", align: "right" as const },
      { id: "interest", label: "Interest", align: "right" as const },
      { id: "extraPmt", label: "Extra", align: "right" as const },
      { id: "balance", label: "Balance", align: "right" as const, highlight: true },
    ],
  },

  referenceData: [],

  // ---------------------------------------------------------------------------
  // EDUCATION SECTIONS (2 prose + 2 list + 1 code-example)
  // ---------------------------------------------------------------------------
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  // ---------------------------------------------------------------------------
  // FAQS (6 — targeting long-tail keywords for SEO)
  // ---------------------------------------------------------------------------
  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  // ---------------------------------------------------------------------------
  // REFERENCES (E-E-A-T signals for Google)
  // ---------------------------------------------------------------------------
  references: [
    {
      authors: "Consumer Financial Protection Bureau",
      year: "2024",
      title: "What is amortization and how could it affect my auto loan?",
      source: "CFPB",
      url: "https://www.consumerfinance.gov/ask-cfpb/what-is-amortization-and-how-could-it-affect-my-auto-loan-en-2069/",
    },
    {
      authors: "Board of Governors of the Federal Reserve System",
      year: "2024",
      title: "Consumer Credit - G.19 Statistical Release",
      source: "Federal Reserve",
      url: "https://www.federalreserve.gov/releases/g19/current/",
    },
  ],

  hero: {},
  sidebar: {},
  features: {},
  relatedCalculators: [
    "personal-loan-calculator",
    "mortgage-calculator",
    "auto-loan-calculator",
    "compound-interest-calculator",
    "credit-card-payoff-calculator",
  ],
  ads: {},
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateLoanCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits } = data;

  // --- Read inputs ---
  const loanAmount = values.loanAmount as number;
  const annualRate = values.interestRate as number;
  const termYears = values.loanTerm as number;
  const extraPayment = (values.extraPayment as number) || 0;

  // --- Validate ---
  if (!loanAmount || loanAmount <= 0 || !annualRate || annualRate <= 0 || !termYears || termYears <= 0) {
    return {
      values: {},
      formatted: {},
      summary: "",
      isValid: false,
    };
  }

  // --- Currency symbol ---
  const curr = fieldUnits?.loanAmount || "USD";
  const SYMBOLS: Record<string, string> = {
    USD: "$", EUR: "€", GBP: "£", MXN: "MX$", BRL: "R$",
    JPY: "¥", INR: "₹", CAD: "C$", AUD: "A$", CHF: "CHF ",
    COP: "COL$", ARS: "AR$", PEN: "S/", CLP: "CLP ",
    CNY: "¥", KRW: "₩", SEK: "kr ", NOK: "kr ", DKK: "kr ",
    PLN: "zł ", CZK: "Kč ", HUF: "Ft ", TRY: "₺",
    ZAR: "R ", NZD: "NZ$", SGD: "S$", HKD: "HK$", TWD: "NT$",
    THB: "฿", PHP: "₱", IDR: "Rp ", MYR: "RM ",
  };
  const sym = SYMBOLS[curr] || "$";

  // --- Helper functions ---
  const fmtMoney = (val: number): string => {
    if (Math.abs(val) >= 1000) {
      return sym + val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }
    return sym + val.toFixed(2);
  };

  const fmtNum = (val: number, decimals = 0): string => {
    return val.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };

  // --- Core calculation ---
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = termYears * 12;

  // Standard amortization formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
  let monthlyPayment: number;
  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / totalPayments;
  } else {
    const factor = Math.pow(1 + monthlyRate, totalPayments);
    monthlyPayment = loanAmount * (monthlyRate * factor) / (factor - 1);
  }

  // --- WITHOUT extra payments (baseline) ---
  const totalPaidBaseline = monthlyPayment * totalPayments;
  const totalInterestBaseline = totalPaidBaseline - loanAmount;

  // --- WITH extra payments (iterative amortization) ---
  let balance = loanAmount;
  let totalInterestPaid = 0;
  let totalPrincipalPaid = 0;
  let totalExtraPaid = 0;
  let actualPayments = 0;

  // For amortization table
  const tableData: Array<Record<string, string>> = [];

  // For chart — aggregate by year
  const yearlyPrincipal: Record<number, number> = {};
  const yearlyInterest: Record<number, number> = {};

  while (balance > 0.01 && actualPayments < totalPayments * 2) {
    actualPayments++;
    const interestPortion = balance * monthlyRate;
    let principalPortion = monthlyPayment - interestPortion;

    // Cap if payment exceeds balance
    let extra = extraPayment;
    if (principalPortion + extra > balance) {
      const remaining = balance;
      principalPortion = Math.min(principalPortion, remaining);
      extra = Math.max(0, remaining - principalPortion);
    }

    totalInterestPaid += interestPortion;
    totalPrincipalPaid += principalPortion;
    totalExtraPaid += extra;
    balance -= (principalPortion + extra);
    if (balance < 0) balance = 0;

    // Year aggregation
    const yearNum = Math.ceil(actualPayments / 12);
    yearlyPrincipal[yearNum] = (yearlyPrincipal[yearNum] || 0) + principalPortion + extra;
    yearlyInterest[yearNum] = (yearlyInterest[yearNum] || 0) + interestPortion;

    // Amortization table row
    const totalPmt = interestPortion + principalPortion + extra;
    tableData.push({
      period: String(actualPayments),
      payment: fmtMoney(totalPmt),
      principal: fmtMoney(principalPortion),
      interest: fmtMoney(interestPortion),
      extraPmt: extra > 0 ? fmtMoney(extra) : "—",
      balance: fmtMoney(balance),
    });
  }

  const totalPaidActual = totalPrincipalPaid + totalInterestPaid + totalExtraPaid;
  const costMultiplier = totalPaidActual / loanAmount;

  // --- Interest saved & time saved ---
  const interestSaved = extraPayment > 0 ? totalInterestBaseline - totalInterestPaid : 0;
  const timeSavedMonths = extraPayment > 0 ? totalPayments - actualPayments : 0;
  const timeSavedYears = Math.floor(timeSavedMonths / 12);
  const timeSavedRemMonths = timeSavedMonths % 12;

  // --- Payoff date ---
  const now = new Date();
  const payoffDate = new Date(now);
  payoffDate.setMonth(payoffDate.getMonth() + actualPayments);
  const payoffStr = payoffDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  // --- Interest ratio ---
  const interestPct = (totalInterestPaid / totalPaidActual) * 100;

  // --- Chart data (per year) ---
  const chartData: Array<Record<string, unknown>> = [];
  const maxYear = Math.ceil(actualPayments / 12);
  for (let y = 1; y <= maxYear; y++) {
    chartData.push({
      year: `Y${y}`,
      principal: Math.round(yearlyPrincipal[y] || 0),
      interest: Math.round(yearlyInterest[y] || 0),
    });
  }

  // --- Time saved string ---
  let timeSavedStr = "—";
  if (extraPayment > 0 && timeSavedMonths > 0) {
    if (timeSavedYears > 0 && timeSavedRemMonths > 0) {
      timeSavedStr = `${timeSavedYears} yr ${timeSavedRemMonths} mo`;
    } else if (timeSavedYears > 0) {
      timeSavedStr = `${timeSavedYears} yr`;
    } else {
      timeSavedStr = `${timeSavedRemMonths} mo`;
    }
  }

  return {
    values: {
      monthlyPayment,
      totalInterest: totalInterestPaid,
      totalCost: totalPaidActual,
      costMultiplier,
      payoffDate: payoffDate.getTime(),
      interestRatio: interestPct,
      interestSaved,
      timeSaved: timeSavedMonths,
    },
    formatted: {
      monthlyPayment: fmtMoney(Math.round(monthlyPayment * 100) / 100),
      totalInterest: fmtMoney(Math.round(totalInterestPaid)),
      totalCost: fmtMoney(Math.round(totalPaidActual)),
      costMultiplier: `${costMultiplier.toFixed(2)}×`,
      payoffDate: payoffStr,
      interestRatio: `${interestPct.toFixed(1)}%`,
      interestSaved: interestSaved > 0 ? fmtMoney(Math.round(interestSaved)) : "—",
      timeSaved: timeSavedStr,
    },
    summary: `Your monthly payment is ${fmtMoney(Math.round(monthlyPayment * 100) / 100)} for ${termYears} years. Total interest: ${fmtMoney(Math.round(totalInterestPaid))}. Total cost: ${fmtMoney(Math.round(totalPaidActual))}.`,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default loanCalculatorConfig;
