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

export const personalLoanCalculatorConfig: CalculatorConfigV4 = {
  id: "personal-loan",
  version: "4.0",
  category: "finance",
  icon: "🏦",

  // ─── PRESETS ───
  presets: [
    {
      id: "debtConsolidation",
      icon: "💳",
      values: {
        loanAmount: 15000,
        interestRate: 12,
        loanTerm: 3,
        includeOriginationFee: true,
        originationFee: 3,
        includeExtraPayment: false,
        extraMonthlyPayment: null,
        includeIncome: false,
        monthlyIncome: null,
      },
    },
    {
      id: "homeImprovement",
      icon: "🏠",
      values: {
        loanAmount: 25000,
        interestRate: 9,
        loanTerm: 5,
        includeOriginationFee: false,
        originationFee: null,
        includeExtraPayment: false,
        extraMonthlyPayment: null,
        includeIncome: false,
        monthlyIncome: null,
      },
    },
    {
      id: "emergencyMedical",
      icon: "🏥",
      values: {
        loanAmount: 5000,
        interestRate: 15,
        loanTerm: 2,
        includeOriginationFee: true,
        originationFee: 5,
        includeExtraPayment: false,
        extraMonthlyPayment: null,
        includeIncome: false,
        monthlyIncome: null,
      },
    },
    {
      id: "majorPurchase",
      icon: "🎯",
      values: {
        loanAmount: 10000,
        interestRate: 8,
        loanTerm: 3,
        includeOriginationFee: false,
        originationFee: null,
        includeExtraPayment: true,
        extraMonthlyPayment: 50,
        includeIncome: true,
        monthlyIncome: 5000,
      },
    },
  ],

  // ─── TRANSLATIONS (EN only — script translates) ───
  t: {
    en: {
      name: "Personal Loan Calculator",
      slug: "personal-loan",
      subtitle:
        "Calculate your monthly payment, total interest, and real APR including origination fees. See how extra payments save you thousands.",
      seo: {
        title: "Personal Loan Calculator - Monthly Payment & True Cost",
        description:
          "Calculate personal loan payments with origination fees, real APR, and extra payment savings. See your true cost, daily interest, and debt-to-income ratio. Free online tool.",
        shortDescription: "Calculate personal loan payments and see your true borrowing cost.",
        keywords: [
          "personal loan calculator",
          "loan payment calculator",
          "personal loan interest calculator",
          "loan amortization calculator",
          "personal loan APR calculator",
          "origination fee calculator",
          "loan payoff calculator",
          "debt consolidation calculator",
        ],
      },

      inputs: {
        loanAmount: {
          label: "Loan Amount",
          helpText: "Total amount you want to borrow — typical range is $1,000–$100,000",
        },
        interestRate: {
          label: "Interest Rate (APR)",
          helpText: "Annual percentage rate — depends on credit score, lender, and loan term",
        },
        loanTerm: {
          label: "Loan Term",
          helpText: "Repayment period in years — shorter terms save interest but raise monthly payments",
        },
        includeOriginationFee: {
          label: "Include Origination Fee",
          helpText: "Many lenders deduct a 1–10% fee from your loan proceeds before disbursement",
        },
        originationFee: {
          label: "Origination Fee",
          helpText: "Percentage deducted from your loan — you receive less but repay the full amount",
        },
        includeExtraPayment: {
          label: "Extra Monthly Payment",
          helpText: "Toggle on to see how extra payments reduce your loan term and save on interest",
        },
        extraMonthlyPayment: {
          label: "Extra Amount Per Month",
          helpText: "Additional amount paid toward principal each month — even $50 extra saves hundreds",
        },
        includeIncome: {
          label: "Include Monthly Income",
          helpText: "Optional — enter your income to calculate your debt-to-income ratio",
        },
        monthlyIncome: {
          label: "Gross Monthly Income",
          helpText: "Total monthly income before taxes — used to calculate DTI ratio",
        },
      },

      results: {
        monthlyPayment: { label: "Monthly Payment" },
        totalInterestPaid: { label: "Total Interest" },
        totalAmountPaid: { label: "Total Amount Paid" },
        trueCostMultiplier: { label: "True Cost Multiplier" },
        realApr: { label: "Real APR (with fees)" },
        dailyInterestCost: { label: "Daily Interest Cost" },
        netLoanAmount: { label: "Net Amount Received" },
        interestToPaymentRatio: { label: "Interest-to-Payment" },
        interestSaved: { label: "Interest Saved" },
        debtToIncomeRatio: { label: "Debt-to-Income Ratio" },
      },

      presets: {
        debtConsolidation: {
          label: "Debt Consolidation",
          description: "$15K at 12%, 3 years, 3% fee",
        },
        homeImprovement: {
          label: "Home Improvement",
          description: "$25K at 9%, 5 years, no fee",
        },
        emergencyMedical: {
          label: "Emergency / Medical",
          description: "$5K at 15%, 2 years, 5% fee",
        },
        majorPurchase: {
          label: "Major Purchase",
          description: "$10K at 8%, 3 years, +$50/mo extra",
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
          "Your monthly payment is {monthlyPayment} for {loanTerm}. Total interest: {totalInterest}. Total cost: {totalCost}.",
      },

      infoCards: {
        costBreakdown: {
          title: "Loan Cost Breakdown",
          items: [
            { label: "Daily Interest Cost", valueKey: "dailyInterestCost" },
            { label: "Monthly Interest (first month)", valueKey: "firstMonthInterest" },
            { label: "True Cost Multiplier", valueKey: "trueCostMultiplier" },
            { label: "Real APR (with fees)", valueKey: "realApr" },
          ],
        },
        paymentDetails: {
          title: "Payment Details",
          items: [
            { label: "Payoff Date", valueKey: "payoffDate" },
            { label: "Net Amount Received", valueKey: "netLoanAmount" },
            { label: "Interest-to-Payment Ratio", valueKey: "interestToPaymentRatio" },
            { label: "Debt-to-Income Ratio", valueKey: "debtToIncomeRatio" },
            { label: "Interest Saved", valueKey: "interestSaved" },
          ],
        },
        tips: {
          title: "Smart Borrowing Tips",
          items: [
            "Pre-qualify with 3+ lenders to compare rates — each soft pull won't affect your credit score.",
            "A 3-year term costs significantly less in total interest than a 5-year term, even if the monthly payment is higher.",
            "Watch for origination fees: a $15K loan with a 5% fee only puts $14,250 in your pocket, but you repay the full $15K.",
            "Even $50/month extra on a $15K loan at 12% saves over $800 in interest and cuts 6+ months off your payoff date.",
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
          title: "What Is a Personal Loan?",
          content:
            "A personal loan is an unsecured installment loan that provides a lump sum of money you repay in fixed monthly payments over a set term, typically 1 to 7 years. Unlike mortgages or auto loans, personal loans don't require collateral — the lender relies on your creditworthiness, income, and debt-to-income ratio to approve the loan and set the interest rate. Because there's no collateral backing the loan, interest rates tend to be higher than secured loans but significantly lower than credit cards. Personal loans are commonly used for debt consolidation, home improvements, medical expenses, weddings, and other large purchases. Most personal loans have fixed interest rates ranging from about 7% to 36%, depending on your credit profile.",
        },
        howItWorks: {
          title: "How This Calculator Works",
          content:
            "Enter your desired loan amount, interest rate, and repayment term to see your fixed monthly payment, total interest paid, and total cost. If your lender charges an origination fee, toggle it on to see the real APR and exactly how much cash you'll actually receive after the fee is deducted. The calculator uses standard amortization — each monthly payment covers that month's interest first, with the remainder reducing your principal. You can also toggle on extra monthly payments to see how much interest and time you'll save. The debt-to-income ratio feature helps you understand whether this loan fits safely into your budget.",
        },
        considerations: {
          title: "Key Factors That Affect Your Personal Loan",
          items: [
            { text: "Credit Score: The single biggest factor in your rate. Excellent credit (750+) gets 7–12% APR, while fair credit (650–699) may see 18–25%+ APR.", type: "info" },
            { text: "Origination Fees: Charged by many lenders (1–10% of loan amount), deducted from your proceeds. A $20K loan with 5% fee only gives you $19K cash.", type: "warning" },
            { text: "Loan Term: Shorter terms (2–3 years) mean higher monthly payments but dramatically less total interest. A 5-year loan can cost 60% more in interest than a 3-year loan.", type: "info" },
            { text: "APR vs Interest Rate: APR includes origination fees and represents the true yearly cost. Always compare APRs, not just interest rates, between lenders.", type: "warning" },
            { text: "Debt-to-Income: Lenders prefer DTI below 36%. If adding this loan pushes your DTI above 40%, you may not qualify or may get a higher rate.", type: "info" },
            { text: "Prepayment Penalties: Most personal loans have no prepayment penalty, but always check. If there's no penalty, extra payments go directly to principal.", type: "info" },
          ],
        },
        categories: {
          title: "Common Uses of Personal Loans",
          items: [
            { text: "Debt Consolidation: Replace multiple high-interest credit cards (18–28% APR) with one fixed-rate loan (8–15%). Simplify payments and save thousands in interest.", type: "info" },
            { text: "Home Improvement: Fund renovations without tapping home equity. Rates are higher than HELOCs but there's no risk to your home as collateral.", type: "info" },
            { text: "Medical Expenses: Cover unexpected medical bills. Compare the loan rate to hospital payment plans, which are often interest-free.", type: "info" },
            { text: "Major Life Events: Weddings, relocations, or emergencies. Only borrow what you need — it's tempting to take the full approved amount.", type: "warning" },
            { text: "Vehicle Repairs: Quick access to funds for essential repairs. Often cheaper than putting large expenses on a credit card.", type: "info" },
            { text: "Avoid These Uses: Vacations, discretionary spending, or investing. Borrowing at 12%+ to invest in something returning 7–10% loses money.", type: "warning" },
          ],
        },
        examples: {
          title: "Personal Loan Calculation Examples",
          description: "Step-by-step examples showing how monthly payments and total costs are calculated",
          examples: [
            {
              title: "$15,000 Debt Consolidation — 3 Years, 12% APR",
              steps: [
                "Loan amount: $15,000",
                "Interest rate: 12% APR (1% monthly)",
                "Loan term: 36 months",
                "Origination fee: 3% → $450 deducted",
                "You receive: $14,550 cash",
                "But you repay: $15,000 + interest",
                "Monthly payment: $498.21",
                "Total interest: $2,935",
                "Total paid: $17,935",
                "Real APR (including fee): ~14.2%",
              ],
              result:
                "Monthly payment: $498.21 | Total interest: $2,935 | You receive $14,550 but repay $17,935",
            },
            {
              title: "$25,000 Home Improvement — 5 Years, 9% APR",
              steps: [
                "Loan amount: $25,000",
                "Interest rate: 9% APR",
                "Loan term: 60 months",
                "No origination fee",
                "Monthly payment: $518.96",
                "Without extra payments: 60 months, $6,138 interest",
                "With $100/mo extra: 47 months, $4,627 interest",
                "Interest saved: $1,511",
                "Time saved: 13 months",
              ],
              result:
                "Extra $100/mo saves $1,511 in interest and pays off 13 months early",
            },
          ],
        },
      },

      faqs: [
        {
          question: "What credit score do I need for a personal loan?",
          answer:
            "Most lenders require a minimum credit score of 580–620, but the best rates (7–12% APR) go to borrowers with excellent credit (750+). Good credit (700–749) typically gets 12–18% APR. Fair credit (650–699) may see 18–25% APR. Some online lenders cater to lower scores but charge higher rates (25–36% APR). Always pre-qualify with multiple lenders to compare — pre-qualification uses a soft pull and won't affect your score.",
        },
        {
          question: "What is an origination fee and how does it work?",
          answer:
            "An origination fee (typically 1–10% of the loan amount) covers the lender's processing costs. Most lenders deduct it from your loan proceeds — so a $15,000 loan with a 3% fee only gives you $14,550 in cash, but you repay the full $15,000 plus interest. This effectively raises your true borrowing cost. Always compare loans by APR (which includes the fee) rather than just the stated interest rate. Some lenders, especially banks and credit unions, charge no origination fee.",
        },
        {
          question: "What's a good interest rate for a personal loan?",
          answer:
            "As of 2025–2026, the average personal loan rate is around 12%. Rates range from about 7% for excellent credit to 36% for poor credit. A 'good' rate depends on your credit: below 10% is excellent, 10–15% is good, 15–20% is fair. For context, even 15% is much better than average credit card rates (22–28% APR), making personal loans a smart debt consolidation tool.",
        },
        {
          question: "Should I choose a shorter or longer loan term?",
          answer:
            "Shorter terms save significantly on interest but have higher monthly payments. For example, a $15,000 loan at 12%: a 3-year term costs $2,935 in interest ($498/mo), while a 5-year term costs $5,045 in interest ($334/mo). The 5-year loan saves $164/mo but costs you $2,110 more in total. Choose the shortest term your budget can handle comfortably.",
        },
        {
          question: "Can I pay off a personal loan early?",
          answer:
            "Most personal loans allow early payoff without penalties. Before signing, verify there's no prepayment penalty in the terms. When you pay extra, the additional amount goes directly to principal, which reduces future interest charges and shortens your loan term. Even $50/month extra on a $15,000 loan at 12% saves hundreds in interest and shaves months off your payoff date.",
        },
        {
          question: "Is a personal loan better than a credit card?",
          answer:
            "For carrying a balance, almost always yes. Personal loans offer fixed rates (typically 7–20%) versus credit card variable rates (18–28%+), fixed payoff dates, and no temptation to keep spending. A $10,000 balance at 22% APR on a credit card with minimum payments costs $9,000+ in interest over 15+ years. The same $10,000 as a 3-year personal loan at 12% costs just $1,957 in interest with a guaranteed payoff date.",
        },
        {
          question: "What is debt-to-income ratio and why does it matter?",
          answer:
            "Debt-to-income (DTI) ratio is your total monthly debt payments divided by your gross monthly income. Lenders use DTI to assess whether you can afford a new loan. Below 36% is considered healthy by most lenders. Between 36–43% is the maximum for many loans. Above 43% makes approval difficult. This calculator lets you enter your income to see how the new loan payment affects your DTI.",
        },
        {
          question: "How do I compare personal loan offers?",
          answer:
            "Always compare APR (not just interest rate) because APR includes origination fees. Then look at total cost over the life of the loan, monthly payment affordability, funding speed, lender reputation, and any special features like rate discounts for autopay (typically 0.25%). Pre-qualify with at least 3 lenders — each soft pull won't hurt your credit score.",
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
    // Loan Amount — currency dropdown
    {
      id: "loanAmount",
      type: "number",
      defaultValue: null,
      placeholder: "15000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    // Interest Rate — slider
    {
      id: "interestRate",
      type: "slider",
      defaultValue: 12,
      min: 0,
      max: 36,
      step: 0.01,
      suffix: "%",
    },
    // Loan Term — stepper (years)
    {
      id: "loanTerm",
      type: "stepper",
      defaultValue: 3,
      min: 1,
      max: 7,
      step: 1,
      suffix: "years",
    },
    // Include Origination Fee — toggle
    {
      id: "includeOriginationFee",
      type: "toggle",
      defaultValue: false,
    },
    // Origination Fee %
    {
      id: "originationFee",
      type: "number",
      defaultValue: null,
      placeholder: "3",
      min: 0,
      max: 12,
      step: 0.1,
      suffix: "%",
      showWhen: { field: "includeOriginationFee", value: true },
    },
    // Include Extra Payment — toggle
    {
      id: "includeExtraPayment",
      type: "toggle",
      defaultValue: false,
    },
    // Extra Monthly Payment
    {
      id: "extraMonthlyPayment",
      type: "number",
      defaultValue: null,
      placeholder: "100",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "includeExtraPayment", value: true },
    },
    // Include Income — toggle
    {
      id: "includeIncome",
      type: "toggle",
      defaultValue: false,
    },
    // Monthly Income
    {
      id: "monthlyIncome",
      type: "number",
      defaultValue: null,
      placeholder: "5000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "includeIncome", value: true },
    },
  ],

  inputGroups: [],

  // ─── RESULTS ───
  results: [
    { id: "monthlyPayment", type: "primary", format: "text" },
    { id: "totalInterestPaid", type: "secondary", format: "text" },
    { id: "totalAmountPaid", type: "secondary", format: "text" },
    { id: "trueCostMultiplier", type: "secondary", format: "text" },
    { id: "realApr", type: "secondary", format: "text" },
    { id: "dailyInterestCost", type: "secondary", format: "text" },
    { id: "netLoanAmount", type: "secondary", format: "text" },
    { id: "interestToPaymentRatio", type: "secondary", format: "text" },
    { id: "interestSaved", type: "secondary", format: "text" },
    { id: "debtToIncomeRatio", type: "secondary", format: "text" },
  ],

  // ─── INFO CARDS ───
  infoCards: [
    { id: "costBreakdown", type: "list", icon: "💰", itemCount: 4 },
    { id: "paymentDetails", type: "list", icon: "📊", itemCount: 5 },
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

  // ─── DETAILED TABLE ───
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
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  // ─── FAQs ───
  faqs: [
    { id: "0" }, { id: "1" }, { id: "2" }, { id: "3" },
    { id: "4" }, { id: "5" }, { id: "6" }, { id: "7" },
  ],

  // ─── REFERENCES ───
  references: [
    {
      authors: "Consumer Financial Protection Bureau",
      year: "2025",
      title: "What Is a Personal Loan?",
      source: "CFPB",
      url: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-personal-loan-en-2109/",
    },
    {
      authors: "Federal Reserve",
      year: "2025",
      title: "Consumer Credit Outstanding - G.19 Report",
      source: "Federal Reserve Statistical Release",
      url: "https://www.federalreserve.gov/releases/g19/current/",
    },
    {
      authors: "Bankrate",
      year: "2025",
      title: "Average Personal Loan Interest Rates",
      source: "Bankrate",
      url: "https://www.bankrate.com/loans/personal-loans/rates/",
    },
  ],

  hero: {},
};

// ═══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════

export function calculatePersonalLoan(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read inputs ──
  const loanAmount = values.loanAmount as number | null;
  const interestRate = (values.interestRate as number) ?? 12;
  const loanTermYears = (values.loanTerm as number) || 3;
  const includeOriginationFee = values.includeOriginationFee as boolean;
  const originationFeePercent = includeOriginationFee ? ((values.originationFee as number | null) || 0) : 0;
  const includeExtraPayment = values.includeExtraPayment as boolean;
  const extraMonthlyPayment = includeExtraPayment ? ((values.extraMonthlyPayment as number | null) || 0) : 0;
  const includeIncome = values.includeIncome as boolean;
  const monthlyIncome = includeIncome ? ((values.monthlyIncome as number | null) || 0) : 0;

  // ── Validate ──
  if (!loanAmount || loanAmount <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Currency symbol ──
  const curr = fieldUnits?.loanAmount || "USD";
  const sym = CURRENCY_SYMBOLS[curr] || "$";

  // ── Origination fee ──
  const originationFeeAmount = loanAmount * (originationFeePercent / 100);
  const netLoanAmount = loanAmount - originationFeeAmount;

  // ── Base monthly payment (standard amortization) ──
  const loanTermMonths = loanTermYears * 12;
  const monthlyRate = interestRate / 100 / 12;
  let monthlyPayment: number;

  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / loanTermMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, loanTermMonths);
    monthlyPayment = loanAmount * (monthlyRate * factor) / (factor - 1);
  }

  // ── Daily interest cost (current) ──
  const dailyInterest = loanAmount * (interestRate / 100) / 365;
  const firstMonthInterest = loanAmount * monthlyRate;

  // ── Interest-to-payment ratio (first month) ──
  const interestToPaymentRatio = monthlyPayment > 0 ? (firstMonthInterest / monthlyPayment) * 100 : 0;

  // ── Amortize WITHOUT extra payments (baseline) ──
  let baseBalance = loanAmount;
  let baseTotalInterest = 0;

  for (let m = 1; m <= loanTermMonths; m++) {
    if (baseBalance <= 0) break;
    const intPmt = baseBalance * monthlyRate;
    const prinPmt = Math.min(monthlyPayment - intPmt, baseBalance);
    baseTotalInterest += intPmt;
    baseBalance -= prinPmt;
  }

  // ── Amortize WITH extra payments ──
  let balance = loanAmount;
  let totalInterest = 0;
  let actualMonths = 0;
  const chartData: Array<Record<string, unknown>> = [];
  const tableData: Array<Record<string, string>> = [];

  let yearPrincipal = 0;
  let yearInterest = 0;
  let currentYear = 1;

  for (let m = 1; m <= loanTermMonths; m++) {
    if (balance <= 0) break;

    const intPmt = balance * monthlyRate;
    let prinPmt = monthlyPayment - intPmt + extraMonthlyPayment;
    prinPmt = Math.min(prinPmt, balance);
    const actualPayment = Math.min(monthlyPayment + extraMonthlyPayment, balance + intPmt);

    totalInterest += intPmt;
    balance -= prinPmt;
    actualMonths = m;

    yearPrincipal += prinPmt;
    yearInterest += intPmt;

    // Amortization table
    tableData.push({
      month: `${m}`,
      payment: `${sym}${fmtNum(actualPayment)}`,
      principal: `${sym}${fmtNum(prinPmt)}`,
      interest: `${sym}${fmtNum(intPmt)}`,
      balance: `${sym}${fmtNum(Math.max(balance, 0))}`,
    });

    // Year-end chart data
    if (m % 12 === 0 || balance <= 0) {
      chartData.push({
        year: `Y${currentYear}`,
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
  const monthsSaved = loanTermMonths - actualMonths;
  const yearsSaved = Math.floor(monthsSaved / 12);
  const remainingMonthsSaved = monthsSaved % 12;

  let timeReducedStr = "—";
  if (monthsSaved > 0) {
    if (yearsSaved > 0 && remainingMonthsSaved > 0) {
      timeReducedStr = `${yearsSaved} yr ${remainingMonthsSaved} mo`;
    } else if (yearsSaved > 0) {
      timeReducedStr = `${yearsSaved} ${yearsSaved === 1 ? "year" : "years"}`;
    } else {
      timeReducedStr = `${remainingMonthsSaved} ${remainingMonthsSaved === 1 ? "month" : "months"}`;
    }
  }

  // ── Total cost ──
  const totalPaid = totalInterest + loanAmount;
  const trueCostMultiplier = totalPaid / loanAmount;

  // ── Real APR (including origination fee) ──
  // Newton's method to solve for real APR given net disbursement
  let realApr = interestRate;
  if (originationFeeAmount > 0 && netLoanAmount > 0) {
    // Solve: netLoanAmount = monthlyPayment × [(1-(1+r)^-n)/r]
    let rGuess = monthlyRate * 1.1;
    for (let i = 0; i < 100; i++) {
      const f1 = Math.pow(1 + rGuess, loanTermMonths);
      const pv = monthlyPayment * (f1 - 1) / (rGuess * f1);
      const dPv = monthlyPayment * (
        ((loanTermMonths * Math.pow(1 + rGuess, loanTermMonths - 1)) * rGuess * f1 - (f1 - 1) * (f1 + rGuess * loanTermMonths * Math.pow(1 + rGuess, loanTermMonths - 1))) /
        Math.pow(rGuess * f1, 2)
      );
      const diff = pv - netLoanAmount;
      if (Math.abs(diff) < 0.01) break;
      rGuess = rGuess + diff / (dPv || 1);
      if (rGuess <= 0) rGuess = monthlyRate * 1.01;
    }
    realApr = rGuess * 12 * 100;
  }

  // ── Payoff date ──
  const now = new Date();
  const payoffDate = new Date(now.getFullYear(), now.getMonth() + actualMonths, 1);
  const payoffDateStr = payoffDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  // ── DTI Ratio ──
  const dtiRatio = monthlyIncome > 0 ? (monthlyPayment / monthlyIncome) * 100 : 0;
  let dtiLabel = "";
  if (monthlyIncome > 0) {
    if (dtiRatio < 15) dtiLabel = "Excellent";
    else if (dtiRatio < 25) dtiLabel = "Healthy";
    else if (dtiRatio < 36) dtiLabel = "Moderate";
    else if (dtiRatio < 43) dtiLabel = "High";
    else dtiLabel = "Critical";
  }

  // ── Loan term label ──
  const yearLabel = loanTermYears === 1 ? (v["year"] || "year") : (v["years"] || "years");
  const loanTermStr = `${loanTermYears} ${yearLabel}`;

  // ── Payoff time label (actual) ──
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

  // ── Build summary ──
  let summary =
    f.summary
      ?.replace("{monthlyPayment}", `${sym}${fmtNum(monthlyPayment)}`)
      .replace("{loanTerm}", loanTermStr)
      .replace("{totalInterest}", `${sym}${fmtNum(totalInterest)}`)
      .replace("{totalCost}", `${sym}${fmtNum(totalPaid)}`) ||
    `Monthly payment: ${sym}${fmtNum(monthlyPayment)} for ${loanTermStr}. Total interest: ${sym}${fmtNum(totalInterest)}.`;

  if (originationFeeAmount > 0) {
    summary += ` After a ${originationFeePercent}% origination fee, you receive ${sym}${fmtNum(netLoanAmount)}.`;
  }

  if (extraMonthlyPayment > 0 && interestSaved > 0) {
    summary += ` With ${sym}${fmtNum(extraMonthlyPayment)}/mo extra, you save ${sym}${fmtNum(interestSaved)} in interest and pay off ${timeReducedStr} sooner.`;
  }

  return {
    values: {
      monthlyPayment,
      totalInterestPaid: totalInterest,
      totalAmountPaid: totalPaid,
      trueCostMultiplier,
      realApr,
      dailyInterestCost: dailyInterest,
      firstMonthInterest,
      netLoanAmount,
      interestToPaymentRatio,
      interestSaved,
      debtToIncomeRatio: dtiRatio,
      payoffDate: payoffDateStr,
    },
    formatted: {
      monthlyPayment: `${sym}${fmtNum(monthlyPayment)}`,
      totalInterestPaid: `${sym}${fmtNum(totalInterest)}`,
      totalAmountPaid: `${sym}${fmtNum(totalPaid)}`,
      trueCostMultiplier: `${fmtNum(trueCostMultiplier, 2)}× your loan`,
      realApr: originationFeeAmount > 0 ? `${fmtNum(realApr, 2)}% (vs ${interestRate}% stated)` : `${fmtNum(interestRate, 2)}%`,
      dailyInterestCost: `${sym}${fmtNum(dailyInterest)}/day`,
      firstMonthInterest: `${sym}${fmtNum(firstMonthInterest)}`,
      netLoanAmount: originationFeeAmount > 0 ? `${sym}${fmtNum(netLoanAmount)} (−${sym}${fmtNum(originationFeeAmount)} fee)` : `${sym}${fmtNum(loanAmount)}`,
      interestToPaymentRatio: `${fmtNum(interestToPaymentRatio, 0)}% goes to interest`,
      interestSaved: interestSaved > 0 ? `${sym}${fmtNum(interestSaved)} saved (${timeReducedStr} faster)` : "—",
      debtToIncomeRatio: monthlyIncome > 0 ? `${fmtNum(dtiRatio, 1)}% — ${dtiLabel}` : "—",
      payoffDate: extraMonthlyPayment > 0 ? `${payoffDateStr} (${payoffTimeStr})` : payoffDateStr,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}
