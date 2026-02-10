import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ─── HELPER: Format number with commas ───
function fmtNum(val: number, decimals = 2): string {
  if (val === 0) return "0";
  if (Math.abs(val) < 0.01) return val.toFixed(decimals);
  return val.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// ─── HELPER: Currency symbols ───
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$", EUR: "€", GBP: "£", CAD: "C$", AUD: "A$",
  MXN: "MX$", BRL: "R$", JPY: "¥", INR: "₹", CHF: "CHF ",
  COP: "COL$", ARS: "AR$", PEN: "S/", CLP: "CLP ",
  CNY: "¥", KRW: "₩", SEK: "kr ", NOK: "kr ", DKK: "kr ",
  PLN: "zł ", CZK: "Kč ", HUF: "Ft ", TRY: "₺",
  ZAR: "R", NZD: "NZ$", SGD: "S$", HKD: "HK$",
  THB: "฿", MYR: "RM ", PHP: "₱", IDR: "Rp ",
  VND: "₫", EGP: "E£", NGN: "₦",
};

// ═══════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════

export const autoLoanCalculatorConfig: CalculatorConfigV4 = {
  id: "auto-loan",
  version: "4.0",
  category: "finance",
  icon: "🚗",

  // ─── PRESETS ───
  presets: [
    {
      id: "budgetUsed",
      icon: "🚗",
      values: {
        vehiclePrice: 15000,
        downPayment: 2000,
        includeTradein: false,
        tradeinValue: null,
        tradeinOwed: null,
        loanTerm: 4,
        interestRate: 8.5,
        salesTax: 7,
        includeTaxInLoan: true,
        fees: 300,
      },
    },
    {
      id: "midRange",
      icon: "🚙",
      values: {
        vehiclePrice: 30000,
        downPayment: 5000,
        includeTradein: false,
        tradeinValue: null,
        tradeinOwed: null,
        loanTerm: 5,
        interestRate: 6.5,
        salesTax: 7,
        includeTaxInLoan: true,
        fees: 500,
      },
    },
    {
      id: "luxury",
      icon: "🏎️",
      values: {
        vehiclePrice: 55000,
        downPayment: 15000,
        includeTradein: false,
        tradeinValue: null,
        tradeinOwed: null,
        loanTerm: 4,
        interestRate: 4.5,
        salesTax: 7,
        includeTaxInLoan: true,
        fees: 800,
      },
    },
    {
      id: "truckSuv",
      icon: "🛻",
      values: {
        vehiclePrice: 45000,
        downPayment: 7000,
        includeTradein: true,
        tradeinValue: 10000,
        tradeinOwed: 3000,
        loanTerm: 6,
        interestRate: 6.9,
        salesTax: 7,
        includeTaxInLoan: true,
        fees: 600,
      },
    },
  ],

  // ─── TRANSLATIONS (EN only — script translates) ───
  t: {
    en: {
      name: "Auto Loan Calculator",
      slug: "auto-loan",
      subtitle:
        "Calculate your monthly car payment, total interest, and see a full amortization schedule with trade-in and tax options.",
      seo: {
        title: "Auto Loan Calculator - Monthly Car Payment Estimator",
        description:
          "Estimate your monthly car payment with trade-in value, sales tax, and fees. See total interest paid, amortization schedule, and compare loan scenarios. Free online tool.",
        shortDescription: "Calculate your monthly car payment and total loan cost.",
        keywords: [
          "auto loan calculator",
          "car payment calculator",
          "car loan calculator",
          "monthly car payment",
          "auto loan interest calculator",
          "vehicle loan calculator",
          "free car payment estimator",
          "car financing calculator",
        ],
      },

      inputs: {
        vehiclePrice: {
          label: "Vehicle Price",
          helpText: "The total purchase price of the vehicle",
        },
        downPayment: {
          label: "Down Payment",
          helpText: "Cash paid upfront — 10–20% recommended to avoid being underwater",
        },
        includeTradein: {
          label: "Include Trade-In",
          helpText: "Toggle on if you're trading in a vehicle",
        },
        tradeinValue: {
          label: "Trade-In Value",
          helpText: "The market value of the vehicle you're trading in",
        },
        tradeinOwed: {
          label: "Amount Owed on Trade-In",
          helpText: "Remaining loan balance on your trade-in vehicle, if any",
        },
        loanTerm: {
          label: "Loan Term",
          helpText: "Loan duration in years — shorter terms save on interest",
        },
        interestRate: {
          label: "Interest Rate (APR)",
          helpText: "Annual percentage rate — check your pre-approval or use the credit score guide",
        },
        salesTax: {
          label: "Sales Tax Rate",
          helpText: "State/local tax rate — most states tax the price minus trade-in value",
        },
        includeTaxInLoan: {
          label: "Include Tax & Fees in Loan",
          helpText: "Toggle on to finance tax and fees instead of paying upfront",
        },
        fees: {
          label: "Title, Registration & Dealer Fees",
          helpText: "Combined title, registration, documentation, and dealer fees",
        },
      },

      results: {
        monthlyPayment: { label: "Monthly Payment" },
        totalLoanAmount: { label: "Total Loan Amount" },
        totalInterest: { label: "Total Interest Paid" },
        totalCost: { label: "Total Cost of Vehicle" },
        payoffDate: { label: "Loan Payoff Date" },
      },

      presets: {
        budgetUsed: {
          label: "Budget Used Car",
          description: "$15K used, 4 years, 8.5% APR",
        },
        midRange: {
          label: "Mid-Range New",
          description: "$30K new, 5 years, 6.5% APR",
        },
        luxury: {
          label: "Luxury New",
          description: "$55K new, 4 years, 4.5% APR",
        },
        truckSuv: {
          label: "Truck / SUV",
          description: "$45K with $10K trade-in, 6 years",
        },
      },

      values: {
        years: "years",
        year: "year",
        months: "months",
        month: "month",
        monthly: "/mo",
      },

      formats: {
        summary:
          "Your estimated monthly payment is {monthlyPayment}. Over {loanTerm}, you'll pay {totalInterest} in interest for a total cost of {totalCost}.",
      },

      infoCards: {
        metrics: {
          title: "Loan Summary",
          items: [
            { label: "Monthly Payment", valueKey: "monthlyPayment" },
            { label: "Total Loan Amount", valueKey: "totalLoanAmount" },
            { label: "Total Interest Paid", valueKey: "totalInterest" },
            { label: "Total Cost of Vehicle", valueKey: "totalCost" },
          ],
        },
        details: {
          title: "Loan Details",
          items: [
            { label: "Loan Payoff Date", valueKey: "payoffDate" },
            { label: "Down Payment %", valueKey: "downPaymentPercent" },
            { label: "Loan-to-Value Ratio", valueKey: "ltvRatio" },
            { label: "Sales Tax Amount", valueKey: "salesTaxAmount" },
          ],
        },
        tips: {
          title: "Smart Financing Tips",
          items: [
            "Put at least 10–20% down to avoid being upside-down on the loan and reduce total interest.",
            "Keep your loan term to 60 months or less for new cars and 36 months for used to minimize interest.",
            "Get pre-approved by your bank or credit union before visiting the dealership for better negotiating power.",
            "Compare the total cost of the loan, not just the monthly payment — longer terms cost more overall.",
          ],
        },
      },

      chart: {
        title: "Payment Breakdown by Year",
        xLabel: "Year",
        yLabel: "Amount",
        series: {
          principal: "Principal",
          interest: "Interest",
        },
      },

      detailedTable: {
        amortization: {
          button: "View Amortization Schedule",
          title: "Full Amortization Schedule",
          columns: {
            month: "Month",
            payment: "Payment",
            principal: "Principal",
            interest: "Interest",
            balance: "Balance",
          },
        },
      },

      education: {
        whatIs: {
          title: "What Is an Auto Loan?",
          content:
            "An auto loan is a secured loan used to purchase a vehicle, where the car itself serves as collateral. If you fail to make payments, the lender can repossess the vehicle. Auto loans typically have fixed interest rates and fixed monthly payments over a set term, usually ranging from 24 to 84 months. The interest rate you receive depends primarily on your credit score, the loan term, whether the car is new or used, and whether you finance through a bank, credit union, or dealership. Unlike unsecured personal loans, auto loans generally offer lower interest rates because the vehicle reduces the lender's risk.",
        },
        howItWorks: {
          title: "How Auto Loan Payments Are Calculated",
          content:
            "Your monthly payment is calculated using the standard amortization formula: M = P × [r(1+r)^n] / [(1+r)^n – 1], where P is the principal (loan amount), r is the monthly interest rate (annual rate divided by 12), and n is the total number of monthly payments. The loan amount equals the vehicle price minus your down payment and trade-in value, plus any amount still owed on the trade-in, plus sales tax and fees if you choose to finance them. Each monthly payment splits between interest and principal — early payments are mostly interest, while later payments are mostly principal. This is why making extra payments early in the loan saves the most money.",
        },
        considerations: {
          title: "Key Factors That Affect Your Auto Loan",
          items: [
            {
              text: "Credit Score: The single biggest factor in your interest rate. Excellent credit (750+) can save thousands compared to fair or poor credit over the life of a loan.",
              type: "info",
            },
            {
              text: "Down Payment: Putting 10–20% down reduces your loan amount and prevents being underwater (owing more than the car is worth) from day one.",
              type: "info",
            },
            {
              text: "Loan Term: Shorter terms (36–48 months) mean higher monthly payments but dramatically lower total interest. A 72-month loan can cost 50% more in interest than a 48-month loan.",
              type: "warning",
            },
            {
              text: "New vs Used: Used car loans typically carry 1–3% higher interest rates than new car loans, but the lower purchase price often offsets this difference.",
              type: "info",
            },
            {
              text: "Trade-In Tax Benefit: In most states, sales tax is calculated on the price minus trade-in value, saving you hundreds or thousands in tax.",
              type: "info",
            },
            {
              text: "Dealer vs Direct Lending: Dealerships may mark up interest rates by 1–2%. Getting pre-approved from your bank or credit union gives you leverage to negotiate.",
              type: "warning",
            },
          ],
        },
        categories: {
          title: "Types of Auto Financing",
          items: [
            {
              text: "Direct Lending: You borrow directly from a bank, credit union, or online lender. You know your rate before visiting the dealer, giving you negotiating power.",
              type: "info",
            },
            {
              text: "Dealership Financing: The dealer arranges financing through their lender network. Convenient but may include rate markup. Always compare with pre-approval.",
              type: "info",
            },
            {
              text: "Manufacturer Financing: Special rates (0%–2.9% APR) offered by automakers through their captive finance companies. Usually requires excellent credit.",
              type: "info",
            },
            {
              text: "Lease Buyout Loan: Financing the purchase of a vehicle at the end of a lease term. Rates vary — compare with purchasing a similar used car outright.",
              type: "info",
            },
            {
              text: "Refinancing: Replacing your current auto loan with a new one at a lower rate. Makes sense if your credit has improved or rates have dropped since the original loan.",
              type: "info",
            },
            {
              text: "Buy Here Pay Here (BHPH): In-house financing at the dealership. Typically very high rates (15–25%+) and should only be considered as a last resort.",
              type: "warning",
            },
          ],
        },
        examples: {
          title: "Auto Loan Calculation Examples",
          description: "Step-by-step examples showing how monthly payments and total costs are calculated",
          examples: [
            {
              title: "New SUV — $35,000 with Trade-In",
              steps: [
                "Vehicle price: $35,000",
                "Down payment: $5,000",
                "Trade-in value: $8,000 (no amount owed)",
                "Sales tax: 7% on ($35,000 − $8,000) = 7% × $27,000 = $1,890",
                "Fees (title, registration, doc): $600",
                "Tax & fees included in loan: Yes",
                "Loan amount: $35,000 − $5,000 − $8,000 + $1,890 + $600 = $24,490",
                "Rate: 5.9% APR for 60 months",
                "Monthly rate: 5.9% ÷ 12 = 0.4917%",
                "Monthly payment: $24,490 × [0.004917 × 1.004917^60] ÷ [1.004917^60 − 1] = $473.02",
              ],
              result:
                "Monthly payment: $473.02 | Total interest: $3,891 | Total cost: $33,381",
            },
            {
              title: "Used Sedan — $18,000 Budget Buy",
              steps: [
                "Vehicle price: $18,000",
                "Down payment: $3,000",
                "No trade-in",
                "Sales tax: 6% on $18,000 = $1,080",
                "Fees: $350",
                "Tax & fees included in loan: Yes",
                "Loan amount: $18,000 − $3,000 + $1,080 + $350 = $16,430",
                "Rate: 7.9% APR for 48 months (used car, good credit)",
                "Monthly rate: 7.9% ÷ 12 = 0.6583%",
                "Monthly payment: $16,430 × [0.006583 × 1.006583^48] ÷ [1.006583^48 − 1] = $399.12",
              ],
              result:
                "Monthly payment: $399.12 | Total interest: $2,728 | Total cost: $22,158",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How much should I put down on a car?",
          answer:
            "Financial experts recommend putting down at least 20% on a new car and 10% on a used car. A larger down payment reduces your monthly payment, total interest paid, and the risk of being underwater on the loan (owing more than the car is worth). If you can't put 20% down, aim for at least 10% and avoid zero-down offers that lead to negative equity from day one.",
        },
        {
          question: "What's a good interest rate for an auto loan?",
          answer:
            "As of 2025–2026, good auto loan rates are roughly: 4–6% for new cars with excellent credit (750+), 5–7% for new cars with good credit (700–749), 7–10% for used cars with good credit, and 10–15%+ for fair or poor credit. Rates vary by lender, so always get quotes from at least 3 sources — your bank, a credit union, and the dealership — before signing.",
        },
        {
          question: "Should I choose a longer loan term for lower payments?",
          answer:
            "While longer terms (72–84 months) offer lower monthly payments, they cost significantly more in total interest. For example, a $30,000 loan at 6% costs about $3,500 in interest over 48 months but $5,800 over 72 months. Longer terms also increase the risk of being underwater. Stick to 60 months max for new cars and 36–48 months for used cars if possible.",
        },
        {
          question: "How does a trade-in reduce my sales tax?",
          answer:
            "In most US states, sales tax is calculated on the vehicle price minus the trade-in value. For example, if you buy a $40,000 car and trade in a vehicle worth $15,000, you only pay tax on $25,000 — saving $1,050 at a 7% tax rate. However, some states (California, Hawaii, Kentucky, Maryland, Michigan, Montana, Virginia, and Washington D.C.) do not offer this tax reduction.",
        },
        {
          question: "Is it better to finance through a dealer or my bank?",
          answer:
            "Getting pre-approved through your bank or credit union before visiting the dealer is almost always recommended. This gives you a baseline rate to compare against the dealer's offer and negotiating leverage. Dealers sometimes mark up the rate by 1–2% for profit. However, manufacturer financing promotions (0%–2.9% APR) through the dealer can beat bank rates — just compare the total cost carefully.",
        },
        {
          question: "What fees should I expect when buying a car?",
          answer:
            "Common fees include: title and registration ($50–$500 depending on state), documentation/dealer fees ($100–$500), sales tax (0–10%+ depending on state), and possibly advertising fees or dealer-added accessories. Always ask for an itemized breakdown of all fees before signing. Some fees are negotiable (dealer fees, accessories), while others are fixed (title, registration, tax).",
        },
        {
          question: "What does it mean to be underwater on a car loan?",
          answer:
            "Being underwater (or upside-down) means you owe more on the loan than the car is currently worth. This happens when you make a small down payment, choose a long loan term, or the car depreciates faster than you pay down the principal. New cars lose 20–30% of value in the first year. To avoid this, put at least 20% down, choose a shorter term, and avoid rolling negative equity from a previous loan into a new one.",
        },
        {
          question: "Can I pay off my auto loan early?",
          answer:
            "Most auto loans allow early payoff without penalties, but check your loan agreement for prepayment clauses. Paying extra toward principal each month — even $50–$100 — can save hundreds or thousands in interest and shorten your loan term significantly. Focus extra payments early in the loan when the interest portion of each payment is highest.",
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

  // ─── INPUTS ───
  inputs: [
    // Vehicle Price — currency dropdown
    {
      id: "vehiclePrice",
      type: "number",
      defaultValue: null,
      placeholder: "30000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    // Down Payment — currency
    {
      id: "downPayment",
      type: "number",
      defaultValue: null,
      placeholder: "5000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    // Include Trade-In toggle
    {
      id: "includeTradein",
      type: "toggle",
      defaultValue: false,
    },
    // Trade-In Value — shown when includeTradein = true
    {
      id: "tradeinValue",
      type: "number",
      defaultValue: null,
      placeholder: "8000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "includeTradein", value: true },
    },
    // Amount Owed on Trade-In — shown when includeTradein = true
    {
      id: "tradeinOwed",
      type: "number",
      defaultValue: null,
      placeholder: "0",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "includeTradein", value: true },
    },
    // Loan Term — stepper (years)
    {
      id: "loanTerm",
      type: "stepper",
      defaultValue: 5,
      min: 1,
      max: 8,
      step: 1,
      suffix: "years",
    },
    // Interest Rate — number with %
    {
      id: "interestRate",
      type: "number",
      defaultValue: 6.5,
      min: 0,
      max: 30,
      step: 0.1,
      suffix: "%",
    },
    // Sales Tax Rate
    {
      id: "salesTax",
      type: "number",
      defaultValue: null,
      placeholder: "7",
      min: 0,
      max: 15,
      step: 0.1,
      suffix: "%",
    },
    // Include Tax & Fees in Loan toggle
    {
      id: "includeTaxInLoan",
      type: "toggle",
      defaultValue: true,
    },
    // Title, Registration & Fees — currency
    {
      id: "fees",
      type: "number",
      defaultValue: null,
      placeholder: "500",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
  ],

  inputGroups: [], // EMPTY — no accordions

  // ─── RESULTS ───
  results: [
    { id: "monthlyPayment", type: "primary", format: "text" },
    { id: "totalLoanAmount", type: "secondary", format: "text" },
    { id: "totalInterest", type: "secondary", format: "text" },
    { id: "totalCost", type: "secondary", format: "text" },
    { id: "payoffDate", type: "secondary", format: "text" },
  ],

  // ─── INFO CARDS ───
  infoCards: [
    { id: "metrics", type: "list", icon: "💰", itemCount: 4 },
    { id: "details", type: "list", icon: "📋", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ─── CHART ───
  chart: {
    id: "paymentBreakdown",
    type: "composed",
    xKey: "year",
    stacked: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "principal", type: "bar", stackId: "payment", color: "#3b82f6" },
      { key: "interest", type: "bar", stackId: "payment", color: "#f97316" },
    ],
  },

  // ─── DETAILED TABLE (Amortization Schedule) ───
  detailedTable: {
    id: "amortization",
    buttonLabel: "View Amortization Schedule",
    buttonIcon: "📅",
    modalTitle: "Full Amortization Schedule",
    columns: [
      { id: "month", label: "Month", align: "center" },
      { id: "payment", label: "Payment", align: "right" },
      { id: "principal", label: "Principal", align: "right" },
      { id: "interest", label: "Interest", align: "right" },
      { id: "balance", label: "Balance", align: "right", highlight: true },
    ],
  },

  referenceData: [], // EMPTY — use Dual List

  // ─── EDUCATION SECTIONS ───
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  // ─── FAQs ───
  faqs: [
    { id: "0" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
  ],

  // ─── REFERENCES ───
  references: [
    {
      authors: "Consumer Financial Protection Bureau",
      year: "2025",
      title: "Know Before You Owe: Auto Loans",
      source: "CFPB",
      url: "https://www.consumerfinance.gov/consumer-tools/auto-loans/",
    },
    {
      authors: "Federal Trade Commission",
      year: "2024",
      title: "Buying a New Car: Understanding Vehicle Financing",
      source: "FTC",
      url: "https://consumer.ftc.gov/articles/buying-new-car",
    },
    {
      authors: "Edmunds",
      year: "2025",
      title: "Auto Loan Calculator Methodology and Current Rate Trends",
      source: "Edmunds.com",
      url: "https://www.edmunds.com/calculators/car-loan.html",
    },
  ],

  hero: {},
};

// ═══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════

export function calculateAutoLoan(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read inputs ──
  const vehiclePrice = values.vehiclePrice as number | null;
  const downPayment = (values.downPayment as number | null) || 0;
  const includeTradein = values.includeTradein as boolean;
  const tradeinValue = includeTradein ? ((values.tradeinValue as number | null) || 0) : 0;
  const tradeinOwed = includeTradein ? ((values.tradeinOwed as number | null) || 0) : 0;
  const loanTermYears = (values.loanTerm as number) || 5;
  const interestRate = (values.interestRate as number) ?? 6.5;
  const salesTaxRate = (values.salesTax as number | null) || 0;
  const includeTaxInLoan = values.includeTaxInLoan as boolean;
  const feesAmount = (values.fees as number | null) || 0;

  // ── Validate required ──
  if (!vehiclePrice || vehiclePrice <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Currency symbol ──
  const curr = fieldUnits?.vehiclePrice || "USD";
  const sym = CURRENCY_SYMBOLS[curr] || "$";

  // ── Calculate taxable amount (most states: price - trade-in) ──
  const taxableAmount = Math.max(vehiclePrice - tradeinValue, 0);
  const salesTaxAmount = taxableAmount * (salesTaxRate / 100);

  // ── Calculate net trade-in (value minus what's owed) ──
  const netTradein = tradeinValue - tradeinOwed;

  // ── Calculate loan principal ──
  let loanAmount = vehiclePrice - downPayment - netTradein;

  if (includeTaxInLoan) {
    loanAmount += salesTaxAmount + feesAmount;
  }

  // Ensure loan amount is positive
  loanAmount = Math.max(loanAmount, 0);

  if (loanAmount <= 0) {
    return {
      values: {
        monthlyPayment: 0,
        totalLoanAmount: 0,
        totalInterest: 0,
        totalCost: vehiclePrice + salesTaxAmount + feesAmount,
        payoffDate: "No loan needed",
      },
      formatted: {
        monthlyPayment: `${sym}0.00`,
        totalLoanAmount: `${sym}0`,
        totalInterest: `${sym}0`,
        totalCost: `${sym}${fmtNum(vehiclePrice + salesTaxAmount + feesAmount)}`,
        payoffDate: "No loan needed",
        downPaymentPercent: `${((downPayment / vehiclePrice) * 100).toFixed(1)}%`,
        ltvRatio: "0%",
      },
      summary: "Your down payment and trade-in cover the full purchase — no loan needed!",
      isValid: true,
    };
  }

  // ── Calculate monthly payment ──
  const loanTermMonths = loanTermYears * 12;
  const monthlyRate = interestRate / 100 / 12;
  let monthlyPayment: number;

  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / loanTermMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, loanTermMonths);
    monthlyPayment = loanAmount * (monthlyRate * factor) / (factor - 1);
  }

  // ── Total interest and cost ──
  const totalPaid = monthlyPayment * loanTermMonths;
  const totalInterest = totalPaid - loanAmount;

  // Total cost = what you actually pay for the car (including upfront + financed)
  const upfrontCosts = downPayment + netTradein + (includeTaxInLoan ? 0 : salesTaxAmount + feesAmount);
  const totalCost = totalPaid + upfrontCosts;

  // ── Loan payoff date ──
  const now = new Date();
  const payoffDate = new Date(now.getFullYear(), now.getMonth() + loanTermMonths, 1);
  const payoffDateStr = payoffDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // ── Down payment & LTV ──
  const downPaymentPercent = (downPayment / vehiclePrice) * 100;
  const ltvRatio = (loanAmount / vehiclePrice) * 100;

  // ── Build amortization schedule (tableData) ──
  const tableData: Array<Record<string, string>> = [];
  let balance = loanAmount;

  for (let m = 1; m <= loanTermMonths; m++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance = Math.max(balance - principalPayment, 0);

    tableData.push({
      month: `${m}`,
      payment: `${sym}${fmtNum(monthlyPayment)}`,
      principal: `${sym}${fmtNum(principalPayment)}`,
      interest: `${sym}${fmtNum(interestPayment)}`,
      balance: `${sym}${fmtNum(balance)}`,
    });
  }

  // ── Build chart data (yearly breakdown) ──
  const chartData: Array<Record<string, unknown>> = [];
  let yearlyBalance = loanAmount;

  for (let year = 1; year <= loanTermYears; year++) {
    let yearPrincipal = 0;
    let yearInterest = 0;
    const monthsThisYear = year === loanTermYears
      ? loanTermMonths - (loanTermYears - 1) * 12
      : 12;

    for (let m = 0; m < monthsThisYear; m++) {
      const intPmt = yearlyBalance * monthlyRate;
      const prinPmt = monthlyPayment - intPmt;
      yearlyBalance = Math.max(yearlyBalance - prinPmt, 0);
      yearPrincipal += prinPmt;
      yearInterest += intPmt;
    }

    chartData.push({
      year: `Y${year}`,
      principal: Math.round(yearPrincipal),
      interest: Math.round(yearInterest),
    });
  }

  // ── Loan term label ──
  const yearLabel = loanTermYears === 1 ? (v["year"] || "year") : (v["years"] || "years");
  const loanTermStr = `${loanTermYears} ${yearLabel}`;

  // ── Format results ──
  return {
    values: {
      monthlyPayment,
      totalLoanAmount: loanAmount,
      totalInterest,
      totalCost,
      payoffDate: payoffDateStr,
      downPaymentPercent,
      ltvRatio,
      salesTaxAmount,
    },
    formatted: {
      monthlyPayment: `${sym}${fmtNum(monthlyPayment)}`,
      totalLoanAmount: `${sym}${fmtNum(loanAmount)}`,
      totalInterest: `${sym}${fmtNum(totalInterest)}`,
      totalCost: `${sym}${fmtNum(totalCost)}`,
      payoffDate: payoffDateStr,
      downPaymentPercent: `${downPaymentPercent.toFixed(1)}%`,
      ltvRatio: `${ltvRatio.toFixed(1)}%`,
      salesTaxAmount: `${sym}${fmtNum(salesTaxAmount)}`,
    },
    summary:
      f.summary
        ?.replace("{monthlyPayment}", `${sym}${fmtNum(monthlyPayment)}`)
        .replace("{loanTerm}", loanTermStr)
        .replace("{totalInterest}", `${sym}${fmtNum(totalInterest)}`)
        .replace("{totalCost}", `${sym}${fmtNum(totalCost)}`) ||
      `Monthly payment: ${sym}${fmtNum(monthlyPayment)} for ${loanTermStr}. Total interest: ${sym}${fmtNum(totalInterest)}.`,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}
