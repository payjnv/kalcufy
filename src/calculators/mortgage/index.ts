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

export const mortgageCalculatorConfig: CalculatorConfigV4 = {
  id: "mortgage",
  version: "4.0",
  category: "finance",
  icon: "🏠",

  // ─── PRESETS ───
  presets: [
    {
      id: "starterHome",
      icon: "🏡",
      values: {
        homePrice: 250000,
        downPayment: 25000,
        loanTerm: 30,
        interestRate: 6.5,
        includeTaxInsurance: true,
        propertyTaxRate: 1.2,
        annualInsurance: 1500,
        includePmi: true,
        pmiRate: 0.5,
        includeHoa: false,
        hoaMonthly: null,
        includeExtraPayment: false,
        extraMonthlyPayment: null,
      },
    },
    {
      id: "familyHome",
      icon: "🏠",
      values: {
        homePrice: 450000,
        downPayment: 90000,
        loanTerm: 30,
        interestRate: 6.5,
        includeTaxInsurance: true,
        propertyTaxRate: 1.2,
        annualInsurance: 2200,
        includePmi: false,
        pmiRate: null,
        includeHoa: false,
        hoaMonthly: null,
        includeExtraPayment: false,
        extraMonthlyPayment: null,
      },
    },
    {
      id: "luxury",
      icon: "🏢",
      values: {
        homePrice: 800000,
        downPayment: 200000,
        loanTerm: 15,
        interestRate: 5.9,
        includeTaxInsurance: true,
        propertyTaxRate: 1.4,
        annualInsurance: 3800,
        includePmi: false,
        pmiRate: null,
        includeHoa: true,
        hoaMonthly: 450,
        includeExtraPayment: false,
        extraMonthlyPayment: null,
      },
    },
    {
      id: "investment",
      icon: "🏘️",
      values: {
        homePrice: 300000,
        downPayment: 75000,
        loanTerm: 30,
        interestRate: 7,
        includeTaxInsurance: true,
        propertyTaxRate: 1.3,
        annualInsurance: 1800,
        includePmi: false,
        pmiRate: null,
        includeHoa: false,
        hoaMonthly: null,
        includeExtraPayment: false,
        extraMonthlyPayment: null,
      },
    },
  ],

  // ─── TRANSLATIONS (EN only — script translates) ───
  t: {
    en: {
      name: "Mortgage Calculator",
      slug: "mortgage",
      subtitle:
        "Estimate your monthly mortgage payment including principal, interest, taxes, insurance, PMI, and HOA — with a full amortization schedule.",
      seo: {
        title: "Mortgage Calculator - Monthly Payment & Amortization Estimator",
        description:
          "Calculate your monthly mortgage payment with property taxes, insurance, PMI, and HOA fees. View amortization schedule, payment breakdown chart, and compare loan scenarios. Free online tool.",
        shortDescription: "Estimate your monthly mortgage payment with taxes, insurance, and PMI.",
        keywords: [
          "mortgage calculator",
          "mortgage payment calculator",
          "home loan calculator",
          "monthly mortgage payment",
          "mortgage amortization calculator",
          "house payment calculator",
          "mortgage calculator with PMI",
          "mortgage calculator with taxes",
        ],
      },

      inputs: {
        homePrice: {
          label: "Home Price",
          helpText: "The total purchase price of the property",
        },
        downPayment: {
          label: "Down Payment",
          helpText: "Cash paid upfront — 20% avoids PMI, but 3–10% is common for first-time buyers",
        },
        loanTerm: {
          label: "Loan Term",
          helpText: "Loan duration — 30 years is most common, 15 years saves on interest",
        },
        interestRate: {
          label: "Interest Rate",
          helpText: "Annual percentage rate — check current rates from your lender or bank",
        },
        includeTaxInsurance: {
          label: "Include Taxes & Insurance",
          helpText: "Toggle on to add property tax and homeowners insurance to your payment",
        },
        propertyTaxRate: {
          label: "Property Tax Rate",
          helpText: "Annual property tax as a percentage of home value — U.S. average is about 1.1%",
        },
        annualInsurance: {
          label: "Annual Home Insurance",
          helpText: "Yearly homeowners insurance premium — average is $1,500–$3,000 depending on location",
        },
        includePmi: {
          label: "Include PMI",
          helpText: "Private mortgage insurance is typically required when down payment is less than 20%",
        },
        pmiRate: {
          label: "PMI Rate",
          helpText: "Annual PMI as a percentage of loan amount — typically 0.3% to 1.5% based on credit score and LTV",
        },
        includeHoa: {
          label: "Include HOA Fees",
          helpText: "Toggle on if the property is in a homeowners association",
        },
        hoaMonthly: {
          label: "Monthly HOA Fee",
          helpText: "Monthly homeowners association fee — covers shared amenities and maintenance",
        },
        includeExtraPayment: {
          label: "Extra Monthly Payment",
          helpText: "Toggle on to see how extra payments reduce your loan term and save on interest",
        },
        extraMonthlyPayment: {
          label: "Extra Payment Amount",
          helpText: "Additional amount paid toward principal each month — even $100 extra can save years",
        },
      },

      presets: {
        starterHome: {
          label: "Starter Home",
          description: "$250K, 10% down, 30yr, 6.5%",
        },
        familyHome: {
          label: "Family Home",
          description: "$450K, 20% down, 30yr, no PMI",
        },
        luxury: {
          label: "Luxury Home",
          description: "$800K, 25% down, 15yr, HOA",
        },
        investment: {
          label: "Investment",
          description: "$300K, 25% down, 30yr, 7%",
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

      results: {
        monthlyPayment: { label: "Monthly Payment" },
        principalInterest: { label: "Principal & Interest" },
        monthlyTax: { label: "Monthly Tax" },
        monthlyInsurance: { label: "Monthly Insurance" },
        monthlyPmi: { label: "Monthly PMI" },
        totalInterest: { label: "Total Interest Paid" },
        totalPayments: { label: "Total of All Payments" },
        payoffDate: { label: "Payoff Date" },
        interestSaved: { label: "Interest Saved" },
        timeReduced: { label: "Time Saved" },
      },

      infoCards: {
        breakdown: {
          title: "Payment Breakdown",
          items: [
            { label: "Principal & Interest", valueKey: "principalInterest" },
            { label: "Property Tax", valueKey: "monthlyTax" },
            { label: "Home Insurance", valueKey: "monthlyInsurance" },
            { label: "PMI", valueKey: "monthlyPmi" },
            { label: "HOA Fees", valueKey: "hoaMonthly" },
          ],
        },
        details: {
          title: "Loan Details",
          items: [
            { label: "Loan Amount", valueKey: "loanAmount" },
            { label: "Down Payment %", valueKey: "downPaymentPercent" },
            { label: "Loan-to-Value", valueKey: "ltvRatio" },
            { label: "Total of All Payments", valueKey: "totalPayments" },
            { label: "Payoff Date", valueKey: "payoffDate" },
          ],
        },
        tips: {
          title: "Mortgage Tips",
          items: [
            "Put 20% down to avoid PMI and get better rates — even 1% less interest saves thousands over 30 years.",
            "A 15-year mortgage has higher payments but saves massively on total interest compared to 30 years.",
            "Get pre-approved by at least 3 lenders — rates can vary by 0.5% or more, which adds up fast.",
            "Extra payments go directly to principal — even $100/month extra can cut years off a 30-year mortgage.",
          ],
        },
      },

      chart: {
        title: "Loan Balance Over Time",
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
          title: "What Is a Mortgage?",
          text: "A mortgage is a loan used to purchase real estate, where the property itself serves as collateral. The borrower agrees to repay the loan over a set period (typically 15 or 30 years) through monthly payments that include both principal and interest. In the United States, the 30-year fixed-rate mortgage is the most common type, representing roughly 70–90% of all home loans. Your monthly payment is determined by the loan amount, interest rate, and term length.",
        },
        piti: {
          title: "Understanding PITI: The Full Monthly Payment",
          text: "Your true monthly mortgage payment is more than just principal and interest. Lenders and financial advisors use the acronym PITI — Principal, Interest, Taxes, and Insurance — to describe the complete monthly housing cost. Property taxes are assessed annually by your local government (U.S. average: ~1.1% of home value). Homeowners insurance protects your property against damage (average: $1,500–$3,000/year). If your down payment is less than 20%, you'll also pay Private Mortgage Insurance (PMI), which protects the lender — not you — if you default.",
        },
        downPayment: {
          title: "How Much Should You Put Down?",
          text: "The traditional advice is 20% down to avoid PMI and secure the best interest rates. However, many loan programs accept much less: conventional loans allow as low as 3%, FHA loans require 3.5%, and VA/USDA loans may require 0%. A larger down payment reduces your monthly payment, total interest paid, and the risk of being 'underwater' (owing more than the home is worth). Use the 28/36 rule as a guideline: spend no more than 28% of gross monthly income on housing costs, and no more than 36% on total debt including housing.",
        },
        termComparison: {
          title: "15-Year vs. 30-Year Mortgage",
          text: "A 30-year mortgage offers lower monthly payments but costs significantly more in total interest. For example, a $300,000 loan at 6.5% costs about $1,896/month over 30 years (total interest: $382,633) versus $2,613/month over 15 years (total interest: $170,269). That's a $212,364 difference in interest. The 15-year term also typically comes with a lower interest rate (0.5–0.75% less). Choose 30 years if you need payment flexibility; choose 15 years if you can handle higher payments and want to build equity faster.",
        },
        amortization: {
          title: "How Amortization Works",
          text: "Early in your mortgage, most of each payment goes toward interest rather than reducing your loan balance. On a 30-year, $300,000 loan at 6.5%, your first payment allocates $1,625 to interest and only $271 to principal. By year 15, it flips — $963 goes to principal and $933 to interest. This is why extra payments in the early years are so powerful: every additional dollar goes directly to principal, saving you multiple dollars in future interest and potentially shaving years off your loan.",
        },
      },

      faqs: [
        {
          question: "How much house can I afford?",
          answer: "Use the 28/36 rule: your monthly housing costs (PITI + HOA) should not exceed 28% of your gross monthly income, and your total debt payments should stay below 36%. For example, if you earn $6,000/month gross, aim for a maximum housing payment of $1,680. Factor in property taxes, insurance, and PMI — not just the loan payment. Also consider closing costs (2–5% of home price), moving expenses, and an emergency fund covering 3–6 months of payments.",
        },
        {
          question: "What is PMI and how do I avoid it?",
          answer: "Private Mortgage Insurance (PMI) protects the lender — not you — if you default on the loan. It's typically required when your down payment is less than 20% of the home price. PMI costs 0.3–1.5% of the loan amount annually, adding $100–$300/month on a typical loan. To avoid PMI: put 20% or more down, use a piggyback loan (80/10/10), or choose a VA loan (no PMI required). If you already have PMI, request removal once your loan-to-value ratio drops below 80% — lenders must automatically cancel it at 78% LTV.",
        },
        {
          question: "Should I choose a fixed-rate or adjustable-rate mortgage?",
          answer: "A fixed-rate mortgage locks your interest rate for the entire loan term, providing predictable payments. An adjustable-rate mortgage (ARM) starts with a lower rate that adjusts after an initial period (typically 5, 7, or 10 years). ARMs can save money if you plan to sell or refinance before the adjustment period, but carry risk if rates rise. In a high-rate environment, ARMs may offer meaningful initial savings. In a low-rate environment, locking in a fixed rate provides long-term security.",
        },
        {
          question: "What fees should I expect at closing?",
          answer: "Closing costs typically run 2–5% of the home price and include: lender origination fees (0.5–1%), appraisal ($300–$600), title search and insurance ($500–$3,000), attorney fees, recording fees, and prepaid items (property tax and insurance escrow). On a $350,000 home, expect $7,000–$17,500 in closing costs. Some costs are negotiable, and sellers sometimes contribute toward closing costs as part of the deal. Always request a Loan Estimate from your lender for a detailed breakdown.",
        },
        {
          question: "How does property tax affect my monthly payment?",
          answer: "Property taxes are assessed annually by your local government based on your home's assessed value. The U.S. average effective rate is about 1.1%, but it varies dramatically by state — from 0.27% in Hawaii to 2.47% in New Jersey. On a $350,000 home at 1.2%, that's $4,200/year or $350/month added to your mortgage payment. Most lenders require an escrow account where 1/12 of your annual tax bill is collected each month and paid on your behalf.",
        },
        {
          question: "Is it worth paying extra toward my mortgage?",
          answer: "Extra payments can save substantial interest and shorten your loan term. On a $300,000 loan at 6.5% over 30 years, paying just $200 extra per month saves about $115,000 in interest and pays off the loan 7 years early. Even one extra payment per year (or biweekly payments) can cut 4–6 years off a 30-year mortgage. However, prioritize high-interest debt and retirement savings first — if your mortgage rate is 3–4%, investing the extra money may yield better returns.",
        },
        {
          question: "What is an amortization schedule?",
          answer: "An amortization schedule is a month-by-month table showing exactly how each payment is split between principal and interest, plus the remaining loan balance. It reveals that early payments are mostly interest (often 80%+ in year one), gradually shifting toward principal over time. Reviewing your amortization schedule helps you understand when you'll reach 20% equity (to remove PMI), how extra payments impact your payoff timeline, and the true cost of your loan over its lifetime.",
        },
        {
          question: "Can I use this calculator for mortgages outside the U.S.?",
          answer: "Yes — the core principal and interest calculation works universally for any fixed-rate amortizing loan. Select your local currency from the dropdown to see results in your currency. Note that property tax rates, insurance costs, and PMI rules vary by country. In many countries outside the U.S., mortgage terms, regulations, and typical structures differ (e.g., variable rates are more common in the UK and Australia). Adjust the inputs to match your local conditions for the most accurate estimate.",
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
    },
  },

  // ─── INPUT FIELDS ───
  inputs: [
    // Home Price — currency with unitType
    {
      id: "homePrice",
      type: "number",
      defaultValue: null,
      placeholder: "350000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    // Down Payment — currency with unitType
    {
      id: "downPayment",
      type: "number",
      defaultValue: null,
      placeholder: "70000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    // Loan Term — stepper (years)
    {
      id: "loanTerm",
      type: "stepper",
      defaultValue: 30,
      min: 1,
      max: 30,
      step: 1,
      suffix: "years",
    },
    // Interest Rate — number with slider
    {
      id: "interestRate",
      type: "number",
      defaultValue: 6.5,
      min: 0,
      max: 15,
      step: 0.1,
      suffix: "%",
    },
    // Include Taxes & Insurance — toggle (V4.3)
    {
      id: "includeTaxInsurance",
      type: "toggle",
      defaultValue: true,
    },
    // Property Tax Rate — revealed when includeTaxInsurance = true
    {
      id: "propertyTaxRate",
      type: "number",
      defaultValue: null,
      placeholder: "1.2",
      min: 0,
      max: 5,
      step: 0.1,
      suffix: "%",
      showWhen: { field: "includeTaxInsurance", value: true },
    },
    // Annual Home Insurance — revealed when includeTaxInsurance = true
    {
      id: "annualInsurance",
      type: "number",
      defaultValue: null,
      placeholder: "1500",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "includeTaxInsurance", value: true },
    },
    // Include PMI — toggle (V4.3)
    {
      id: "includePmi",
      type: "toggle",
      defaultValue: false,
    },
    // PMI Rate — revealed when includePmi = true
    {
      id: "pmiRate",
      type: "number",
      defaultValue: null,
      placeholder: "0.5",
      min: 0.1,
      max: 2,
      step: 0.1,
      suffix: "%",
      showWhen: { field: "includePmi", value: true },
    },
    // Include HOA — toggle (V4.3)
    {
      id: "includeHoa",
      type: "toggle",
      defaultValue: false,
    },
    // Monthly HOA Fee — revealed when includeHoa = true
    {
      id: "hoaMonthly",
      type: "number",
      defaultValue: null,
      placeholder: "300",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "includeHoa", value: true },
    },
    // Include Extra Payment — toggle (V4.3)
    {
      id: "includeExtraPayment",
      type: "toggle",
      defaultValue: false,
    },
    // Extra Monthly Payment — revealed when includeExtraPayment = true
    {
      id: "extraMonthlyPayment",
      type: "number",
      defaultValue: null,
      placeholder: "200",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "includeExtraPayment", value: true },
    },
  ],

  // ─── RESULTS ───
  results: [
    { id: "monthlyPayment", type: "primary", format: "text" },
    { id: "principalInterest", type: "secondary", format: "text" },
    { id: "monthlyTax", type: "secondary", format: "text" },
    { id: "monthlyInsurance", type: "secondary", format: "text" },
    { id: "monthlyPmi", type: "secondary", format: "text" },
    { id: "totalInterest", type: "secondary", format: "text" },
    { id: "totalPayments", type: "secondary", format: "text" },
    { id: "payoffDate", type: "secondary", format: "text" },
  ],

  // ─── INFO CARDS ───
  infoCards: [
    { id: "breakdown", type: "list", icon: "💰", itemCount: 5 },
    { id: "details", type: "list", icon: "📋", itemCount: 5 },
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

  referenceData: [],

  // ─── EDUCATION SECTIONS ───
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "piti", type: "prose", icon: "💵" },
    { id: "downPayment", type: "prose", icon: "💰" },
    { id: "termComparison", type: "prose", icon: "⚖️" },
    { id: "amortization", type: "prose", icon: "📊" },
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
      text: "Consumer Financial Protection Bureau — Mortgage Guide",
      url: "https://www.consumerfinance.gov/owning-a-home/",
    },
    {
      text: "Fannie Mae — Mortgage Calculator & Resources",
      url: "https://yourhome.fanniemae.com/",
    },
    {
      text: "Federal Reserve — Mortgage Interest Rates",
      url: "https://www.federalreserve.gov/releases/h15/",
    },
    {
      text: "U.S. Census Bureau — Homeownership Data",
      url: "https://www.census.gov/housing/hvs/index.html",
    },
  ],

  // ─── EDUCATION (Hero section) ───
  hero: {},
};

// ═══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════

export function calculateMortgage(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read inputs ──
  const homePrice = values.homePrice as number | null;
  const downPayment = (values.downPayment as number | null) || 0;
  const loanTermYears = (values.loanTerm as number) || 30;
  const interestRate = (values.interestRate as number) ?? 6.5;

  const includeTaxInsurance = values.includeTaxInsurance as boolean;
  const propertyTaxRate = includeTaxInsurance ? ((values.propertyTaxRate as number | null) || 0) : 0;
  const annualInsurance = includeTaxInsurance ? ((values.annualInsurance as number | null) || 0) : 0;

  const includePmi = values.includePmi as boolean;
  const pmiRate = includePmi ? ((values.pmiRate as number | null) || 0) : 0;

  const includeHoa = values.includeHoa as boolean;
  const hoaMonthly = includeHoa ? ((values.hoaMonthly as number | null) || 0) : 0;

  const includeExtraPayment = values.includeExtraPayment as boolean;
  const extraMonthlyPayment = includeExtraPayment ? ((values.extraMonthlyPayment as number | null) || 0) : 0;

  // ── Validate required ──
  if (!homePrice || homePrice <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Currency symbol ──
  const curr = fieldUnits?.homePrice || "USD";
  const sym = CURRENCY_SYMBOLS[curr] || "$";

  // ── Calculate loan amount ──
  const loanAmount = Math.max(homePrice - downPayment, 0);

  if (loanAmount <= 0) {
    return {
      values: {
        monthlyPayment: 0,
        principalInterest: 0,
        totalInterest: 0,
        totalPayments: homePrice,
      },
      formatted: {
        monthlyPayment: `${sym}0.00`,
        principalInterest: `${sym}0.00`,
        monthlyTax: `${sym}0.00`,
        monthlyInsurance: `${sym}0.00`,
        monthlyPmi: `${sym}0.00`,
        hoaMonthly: `${sym}0.00`,
        totalInterest: `${sym}0`,
        totalPayments: `${sym}${fmtNum(homePrice)}`,
        loanAmount: `${sym}0`,
        downPaymentPercent: "100%",
        ltvRatio: "0%",
        payoffDate: "—",
      },
      summary: "Your down payment covers the full purchase — no mortgage needed!",
      isValid: true,
    };
  }

  // ── Calculate base monthly P&I (without extra payments) ──
  const loanTermMonths = loanTermYears * 12;
  const monthlyRate = interestRate / 100 / 12;
  let monthlyPI: number;

  if (monthlyRate === 0) {
    monthlyPI = loanAmount / loanTermMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, loanTermMonths);
    monthlyPI = loanAmount * (monthlyRate * factor) / (factor - 1);
  }

  // ── Monthly tax, insurance, PMI, HOA ──
  const monthlyTax = (homePrice * (propertyTaxRate / 100)) / 12;
  const monthlyInsurance = annualInsurance / 12;
  const monthlyPmi = (loanAmount * (pmiRate / 100)) / 12;

  // ── Total monthly payment (PITI + HOA + extra) ──
  const monthlyPaymentBase = monthlyPI + monthlyTax + monthlyInsurance + monthlyPmi + hoaMonthly;
  const monthlyPaymentTotal = monthlyPaymentBase + extraMonthlyPayment;

  // ── Amortize WITHOUT extra payments (baseline) ──
  let baseBalance = loanAmount;
  let baseTotalInterest = 0;
  const baseMonths = loanTermMonths;

  for (let m = 1; m <= loanTermMonths; m++) {
    if (baseBalance <= 0) break;
    const intPmt = baseBalance * monthlyRate;
    const prinPmt = Math.min(monthlyPI - intPmt, baseBalance);
    baseTotalInterest += intPmt;
    baseBalance -= prinPmt;
  }

  // ── Amortize WITH extra payments ──
  let balance = loanAmount;
  let totalInterest = 0;
  let actualMonths = 0;
  const chartData: Array<Record<string, unknown>> = [];
  const tableData: Array<Record<string, string>> = [];

  // Track yearly data for chart
  let yearPrincipal = 0;
  let yearInterest = 0;
  let currentYear = 1;

  for (let m = 1; m <= loanTermMonths; m++) {
    if (balance <= 0) break;

    const intPmt = balance * monthlyRate;
    let prinPmt = monthlyPI - intPmt + extraMonthlyPayment;
    prinPmt = Math.min(prinPmt, balance); // don't overpay
    const actualPayment = Math.min(monthlyPI + extraMonthlyPayment, balance + intPmt);

    totalInterest += intPmt;
    balance -= prinPmt;
    actualMonths = m;

    yearPrincipal += prinPmt;
    yearInterest += intPmt;

    // Add to amortization table
    tableData.push({
      month: `${m}`,
      payment: `${sym}${fmtNum(actualPayment)}`,
      principal: `${sym}${fmtNum(prinPmt)}`,
      interest: `${sym}${fmtNum(intPmt)}`,
      balance: `${sym}${fmtNum(Math.max(balance, 0))}`,
    });

    // End of year — push chart data
    if (m % 12 === 0 || balance <= 0) {
      chartData.push({
        year: `${currentYear}`,
        principal: Math.round(yearPrincipal),
        interest: Math.round(yearInterest),
      });
      yearPrincipal = 0;
      yearInterest = 0;
      currentYear++;
    }
  }

  // ── Extra payment savings ──
  const interestSaved = baseTotalInterest - totalInterest;
  const monthsSaved = baseMonths - actualMonths;
  const yearsSaved = Math.floor(monthsSaved / 12);
  const remainingMonthsSaved = monthsSaved % 12;

  let timeReducedStr = "";
  if (monthsSaved > 0) {
    if (yearsSaved > 0 && remainingMonthsSaved > 0) {
      timeReducedStr = `${yearsSaved} yr ${remainingMonthsSaved} mo`;
    } else if (yearsSaved > 0) {
      timeReducedStr = `${yearsSaved} ${yearsSaved === 1 ? "year" : "years"}`;
    } else {
      timeReducedStr = `${remainingMonthsSaved} ${remainingMonthsSaved === 1 ? "month" : "months"}`;
    }
  } else {
    timeReducedStr = "—";
  }

  // ── Total payments (all costs over life of loan) ──
  const totalPrincipalInterest = monthlyPI * actualMonths + extraMonthlyPayment * actualMonths;
  const totalExtras = (monthlyTax + monthlyInsurance + monthlyPmi + hoaMonthly) * actualMonths;
  const totalPayments = downPayment + loanAmount + totalInterest + totalExtras;

  // ── LTV and down payment % ──
  const downPaymentPercent = (downPayment / homePrice) * 100;
  const ltvRatio = (loanAmount / homePrice) * 100;

  // ── Payoff date ──
  const now = new Date();
  const payoffDate = new Date(now.getFullYear(), now.getMonth() + actualMonths, 1);
  const payoffDateStr = payoffDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // ── Actual payoff time label ──
  const payoffYears = Math.floor(actualMonths / 12);
  const payoffRemMonths = actualMonths % 12;
  let payoffTimeStr = "";
  if (payoffYears > 0 && payoffRemMonths > 0) {
    payoffTimeStr = `${payoffYears} yr ${payoffRemMonths} mo`;
  } else if (payoffYears > 0) {
    payoffTimeStr = `${payoffYears} ${payoffYears === 1 ? "year" : "years"}`;
  } else {
    payoffTimeStr = `${payoffRemMonths} ${payoffRemMonths === 1 ? "month" : "months"}`;
  }

  // ── Time label for summary ──
  const yearLabel = loanTermYears === 1 ? (v["year"] || "year") : (v["years"] || "years");
  const loanTermStr = `${loanTermYears} ${yearLabel}`;

  // ── Build summary ──
  let summary =
    f.summary
      ?.replace("{monthlyPayment}", `${sym}${fmtNum(monthlyPaymentBase)}`)
      .replace("{loanTerm}", loanTermStr)
      .replace("{totalInterest}", `${sym}${fmtNum(totalInterest)}`)
      .replace("{totalCost}", `${sym}${fmtNum(totalPayments)}`) ||
    `Monthly payment: ${sym}${fmtNum(monthlyPaymentBase)} for ${loanTermStr}. Total interest: ${sym}${fmtNum(totalInterest)}.`;

  if (extraMonthlyPayment > 0 && interestSaved > 0) {
    summary += ` With ${sym}${fmtNum(extraMonthlyPayment)}/mo extra, you save ${sym}${fmtNum(interestSaved)} in interest and pay off ${timeReducedStr} sooner.`;
  }

  // ── Format results ──
  return {
    values: {
      monthlyPayment: monthlyPaymentBase,
      principalInterest: monthlyPI,
      monthlyTax,
      monthlyInsurance,
      monthlyPmi,
      totalInterest,
      totalPayments,
      loanAmount,
      downPaymentPercent,
      ltvRatio,
      hoaMonthly,
      payoffDate: payoffDateStr,
      interestSaved,
      timeReduced: timeReducedStr,
    },
    formatted: {
      monthlyPayment: `${sym}${fmtNum(monthlyPaymentBase)}`,
      principalInterest: `${sym}${fmtNum(monthlyPI)}`,
      monthlyTax: `${sym}${fmtNum(monthlyTax)}`,
      monthlyInsurance: `${sym}${fmtNum(monthlyInsurance)}`,
      monthlyPmi: `${sym}${fmtNum(monthlyPmi)}`,
      hoaMonthly: `${sym}${fmtNum(hoaMonthly)}`,
      totalInterest: `${sym}${fmtNum(totalInterest)}`,
      totalPayments: `${sym}${fmtNum(totalPayments)}`,
      loanAmount: `${sym}${fmtNum(loanAmount)}`,
      downPaymentPercent: `${downPaymentPercent.toFixed(1)}%`,
      ltvRatio: `${ltvRatio.toFixed(1)}%`,
      payoffDate: extraMonthlyPayment > 0 ? `${payoffDateStr} (${payoffTimeStr})` : payoffDateStr,
      interestSaved: interestSaved > 0 ? `${sym}${fmtNum(interestSaved)}` : "—",
      timeReduced: timeReducedStr,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}
