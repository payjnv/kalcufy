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

export const amortizationCalculatorConfig: CalculatorConfigV4 = {
  id: "amortization",
  version: "4.0",
  category: "finance",
  icon: "📋",

  // ─── PRESETS (4 Loan Types) ───
  presets: [
    {
      id: "homeMortgage",
      icon: "🏠",
      values: {
        loanAmount: 350000,
        annualInterestRate: 6.8,
        loanTermYears: 30,
        paymentFrequency: "monthly",
        includeExtraPayments: "false",
        extraMonthlyPayment: null,
        extraYearlyPayment: null,
        extraOneTimePayment: null,
        oneTimePaymentMonth: 12,
      },
    },
    {
      id: "autoLoan",
      icon: "🚗",
      values: {
        loanAmount: 35000,
        annualInterestRate: 6.5,
        loanTermYears: 5,
        paymentFrequency: "monthly",
        includeExtraPayments: "true",
        extraMonthlyPayment: 50,
        extraYearlyPayment: null,
        extraOneTimePayment: null,
        oneTimePaymentMonth: 12,
      },
    },
    {
      id: "studentLoan",
      icon: "🎓",
      values: {
        loanAmount: 45000,
        annualInterestRate: 5.5,
        loanTermYears: 10,
        paymentFrequency: "monthly",
        includeExtraPayments: "false",
        extraMonthlyPayment: null,
        extraYearlyPayment: null,
        extraOneTimePayment: null,
        oneTimePaymentMonth: 12,
      },
    },
    {
      id: "personalLoan",
      icon: "💼",
      values: {
        loanAmount: 15000,
        annualInterestRate: 10.5,
        loanTermYears: 3,
        paymentFrequency: "monthly",
        includeExtraPayments: "true",
        extraMonthlyPayment: 100,
        extraYearlyPayment: null,
        extraOneTimePayment: null,
        oneTimePaymentMonth: 12,
      },
    },
  ],

  // ─── TRANSLATIONS (EN only → script translates) ───
  t: {
    en: {
      name: "Amortization Calculator",
      slug: "amortization",
      subtitle: "Generate a complete amortization schedule and see how extra payments can save you thousands in interest.",
      breadcrumb: "Amortization",

      seo: {
        title: "Amortization Calculator - Free Loan Payment Schedule",
        description: "Generate a detailed amortization schedule for any loan. See payment breakdowns, interest savings from extra payments, and biweekly comparison. Works for mortgages, auto loans, student loans, and more.",
        shortDescription: "Free amortization schedule calculator with extra payment analysis.",
        keywords: [
          "amortization calculator",
          "amortization schedule",
          "loan amortization",
          "mortgage amortization calculator",
          "extra payment calculator",
          "loan payoff calculator",
          "free amortization table",
          "biweekly payment savings",
        ],
      },

      calculator: { yourInformation: "Loan Details" },
      ui: {
        yourInformation: "Loan Details",
        calculate: "Generate Schedule",
        reset: "Reset",
        results: "Amortization Results",
      },

      inputs: {
        loanAmount: {
          label: "Loan Amount",
          helpText: "The total principal amount you borrowed or plan to borrow.",
        },
        annualInterestRate: {
          label: "Annual Interest Rate",
          helpText: "The yearly interest rate on your loan (APR).",
        },
        loanTermYears: {
          label: "Loan Term",
          helpText: "The total length of the loan in years.",
        },
        paymentFrequency: {
          label: "Payment Frequency",
          helpText: "How often you make payments. Biweekly = 26 payments/year (saves interest).",
          options: {
            monthly: "Monthly (12/yr)",
            biweekly: "Biweekly (26/yr)",
            acceleratedBiweekly: "Accelerated Biweekly",
            weekly: "Weekly (52/yr)",
            semiMonthly: "Semi-Monthly (24/yr)",
          },
        },
        includeExtraPayments: {
          label: "Include Extra Payments",
          helpText: "Add extra payments to pay off your loan faster and save on interest.",
          options: {
            true: "Yes",
            false: "No",
          },
        },
        extraMonthlyPayment: {
          label: "Extra Monthly Payment",
          helpText: "Additional amount added to every regular payment toward principal.",
        },
        extraYearlyPayment: {
          label: "Extra Yearly Payment",
          helpText: "One additional payment each year applied entirely to principal.",
        },
        extraOneTimePayment: {
          label: "Extra One-Time Payment",
          helpText: "A single lump sum payment applied toward the principal.",
        },
        oneTimePaymentMonth: {
          label: "One-Time Payment at Month #",
          helpText: "The payment number when the lump sum is applied (e.g., 12 = end of year 1).",
        },
      },

      results: {
        monthlyPayment: { label: "Regular Payment" },
        totalInterest: { label: "Total Interest" },
        totalPaid: { label: "Total Amount Paid" },
        interestToPrincipalRatio: { label: "Interest per $1 Borrowed" },
        dailyInterestCost: { label: "Daily Interest Cost (Year 1)" },
        payoffDate: { label: "Payoff Date" },
        interestSaved: { label: "Interest Saved" },
        timeSaved: { label: "Time Saved" },
      },

      presets: {
        homeMortgage: { label: "Home Mortgage", description: "$350K, 6.8%, 30 years" },
        autoLoan: { label: "Auto Loan", description: "$35K, 6.5%, 5 years" },
        studentLoan: { label: "Student Loan", description: "$45K, 5.5%, 10 years" },
        personalLoan: { label: "Personal Loan", description: "$15K, 10.5%, 3 years" },
      },

      values: {
        years: "years",
        year: "year",
        months: "months",
        month: "month",
        days: "days",
        day: "day",
        perDay: "/day",
        perDollar: "per $1 borrowed",
        weekly: "weekly",
        biweekly: "biweekly",
        monthly: "monthly",
        semiMonthly: "semi-monthly",
        acceleratedBiweekly: "accel. biweekly",
        saved: "saved",
        earlier: "earlier",
        none: "—",
      },

      formats: {
        summary: "Your regular payment is {monthlyPayment}. Over the life of the loan, you'll pay {totalInterest} in interest — that's {interestToPrincipalRatio} for every dollar borrowed.",
      },

      infoCards: {
        snapshot: {
          title: "Loan Snapshot",
          items: [
            { label: "Regular Payment", valueKey: "monthlyPayment" },
            { label: "Total Interest", valueKey: "totalInterest" },
            { label: "Total Paid", valueKey: "totalPaid" },
            { label: "Payoff Date", valueKey: "payoffDate" },
          ],
        },
        breakdown: {
          title: "Payment Insights",
          items: [
            { label: "First Payment — Interest", valueKey: "firstPaymentInterest" },
            { label: "First Payment — Principal", valueKey: "firstPaymentPrincipal" },
            { label: "Daily Interest Cost (Year 1)", valueKey: "dailyInterestCost" },
            { label: "Equity at Midpoint", valueKey: "equityAtMidpoint" },
            { label: "Biweekly Savings", valueKey: "biweeklySavings" },
          ],
        },
        tips: {
          title: "Save Money on Your Loan",
          items: [
            "Switch to biweekly payments — you'll make one extra payment per year and save thousands in interest.",
            "Adding even $50–$100/month extra to principal dramatically shortens your loan and reduces total interest.",
            "Refinance when rates drop 1%+ below your current rate — it can save tens of thousands over the loan life.",
            "Apply windfalls (tax refunds, bonuses) as one-time extra payments to slash years off your loan.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is Loan Amortization?",
          content: "Loan amortization is the process of paying off a debt through regular, scheduled payments over a set period of time. Each payment is divided between two components: interest (the cost of borrowing) and principal (reducing what you owe). In the early years of a loan, the majority of each payment goes toward interest. As you progress through the schedule, more of each payment is applied to principal. This gradual shift is why an amortization schedule is so valuable — it shows exactly where your money goes with each payment and helps you understand the true cost of borrowing. Understanding amortization empowers you to make strategic decisions, such as when to make extra payments or whether refinancing makes financial sense.",
        },
        howItWorks: {
          title: "How the Amortization Calculator Works",
          content: "This calculator uses the standard amortization formula to determine your fixed periodic payment based on your loan amount, interest rate, and term. It then generates a complete payment-by-payment schedule showing the interest portion, principal portion, and remaining balance for each payment. The formula divides your annual interest rate by the number of payment periods per year, then uses this periodic rate to calculate a fixed payment that fully amortizes the loan over the specified term. When you enable extra payments, the calculator applies those additional amounts directly to the principal balance, recalculating interest savings and the shortened payoff timeline. The biweekly comparison shows how splitting your monthly payment into 26 bi-weekly payments (equivalent to 13 monthly payments per year) accelerates your payoff.",
        },
        considerations: {
          title: "Key Factors to Consider",
          items: [
            { text: "A longer loan term means lower monthly payments but significantly more total interest paid over the life of the loan.", type: "info" },
            { text: "Even small rate differences matter enormously — 0.5% on a $300K mortgage over 30 years can mean $30,000+ in extra interest.", type: "warning" },
            { text: "Front-loaded interest means you build equity slowly at first — after 5 years on a 30-year mortgage, you may have only paid off 5-10% of the principal.", type: "info" },
            { text: "Check your loan terms for prepayment penalties before making extra payments. Most modern loans allow prepayment without penalty.", type: "warning" },
            { text: "Biweekly payments effectively add one full extra monthly payment per year, potentially saving tens of thousands in interest.", type: "info" },
            { text: "Consider your opportunity cost — if your loan rate is 4% but you can invest at 8%, extra payments may not be optimal.", type: "info" },
          ],
        },
        strategies: {
          title: "Extra Payment Strategies",
          items: [
            { text: "Round up: If your payment is $1,287, round to $1,300 — the extra $13/month adds up significantly over time.", type: "info" },
            { text: "One extra payment per year: Make 13 payments instead of 12 — this alone can cut 4-6 years off a 30-year mortgage.", type: "info" },
            { text: "Lump sum windfalls: Apply tax refunds, bonuses, or inheritances directly to principal for maximum impact.", type: "info" },
            { text: "Dollar-cost averaging: Increase your extra payment by $10-25 each year as your income grows.", type: "info" },
            { text: "Target the crossover point: Pay extra until you reach the month where principal exceeds interest in your regular payment.", type: "info" },
            { text: "Refinance + maintain payment: If you refinance to a lower rate, keep paying the same amount — the difference goes to principal.", type: "info" },
          ],
        },
        examples: {
          title: "Amortization Examples",
          description: "See how amortization works with real numbers",
          examples: [
            {
              title: "30-Year Mortgage — $300,000 at 6.5%",
              steps: [
                "Monthly payment: $1,896.20",
                "First payment: $1,625 interest + $271 principal",
                "Total interest over 30 years: $382,633",
                "Interest-to-principal ratio: $1.28 per $1 borrowed",
                "With $200/mo extra: Save $99,838 in interest, pay off 7 years early",
              ],
              result: "Adding just $200/month saves nearly $100,000 and eliminates 7 years of payments.",
            },
            {
              title: "5-Year Auto Loan — $30,000 at 6.0%",
              steps: [
                "Monthly payment: $579.98",
                "First payment: $150 interest + $430 principal",
                "Total interest over 5 years: $4,799",
                "Interest-to-principal ratio: $0.16 per $1 borrowed",
                "With $100/mo extra: Save $507 in interest, pay off 9 months early",
              ],
              result: "Shorter loan terms mean less interest overall — always choose the shortest term you can afford.",
            },
          ],
        },
      },

      faqs: [
        {
          question: "What is an amortization schedule?",
          answer: "An amortization schedule is a detailed table showing every payment over the life of your loan. For each payment, it breaks down how much goes toward interest versus principal, and shows the remaining balance. Early payments are mostly interest, while later payments are mostly principal. This schedule helps you understand the true cost of your loan and plan extra payment strategies.",
        },
        {
          question: "How do extra payments reduce my total interest?",
          answer: "Extra payments go directly toward reducing your principal balance. Since interest is calculated on the remaining balance, a lower principal means less interest accrues each period. This creates a compounding effect — each extra dollar paid toward principal saves more than a dollar in future interest. Even small extra payments can save thousands over the life of a long-term loan.",
        },
        {
          question: "What's the difference between biweekly and monthly payments?",
          answer: "With monthly payments, you make 12 payments per year. With biweekly payments, you pay half the monthly amount every two weeks, resulting in 26 half-payments (equivalent to 13 full monthly payments per year). That extra payment each year goes entirely to principal, which can shorten a 30-year mortgage by about 4-5 years and save tens of thousands in interest.",
        },
        {
          question: "Does this calculator work for different loan types?",
          answer: "Yes! This amortization calculator works for any fixed-rate installment loan including mortgages, auto loans, student loans, personal loans, and business loans. Simply enter your loan amount, interest rate, and term. The presets provide typical values for common loan types to get you started quickly.",
        },
        {
          question: "Why does so much of my early payment go to interest?",
          answer: "In a standard amortized loan, interest is calculated on the remaining balance. At the start, your balance is at its highest, so the interest charge is large. As you gradually pay down the principal, less interest accrues and more of each payment goes toward principal. For example, on a $300,000 mortgage at 6.5%, your first payment includes about $1,625 in interest but only $271 toward principal.",
        },
        {
          question: "What is the interest-to-principal ratio?",
          answer: "This is a unique metric that shows how much you pay in interest for every dollar you borrowed. For example, a ratio of $0.63 means you pay 63 cents in interest for every $1 of principal. This helps you quickly assess the true cost of borrowing — higher ratios indicate more expensive loans, typically from higher rates or longer terms.",
        },
        {
          question: "Should I make extra payments or invest the money instead?",
          answer: "Compare your loan interest rate to potential investment returns. If your loan rate is higher than expected investment returns (after taxes), extra payments make sense. If your loan rate is low (e.g., 3-4%) and you can invest at higher returns (e.g., 7-10% historically in stocks), investing may be more profitable. However, paying off debt also provides a guaranteed, risk-free return and peace of mind.",
        },
        {
          question: "How accurate is this amortization calculator?",
          answer: "This calculator uses the standard amortization formula used by banks and financial institutions worldwide. Results match official bank calculations for fixed-rate loans. However, actual payments may vary slightly due to rounding, varying month lengths, or additional costs like taxes, insurance, and fees that aren't included in the base amortization calculation.",
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
        calculate: "Generate Schedule",
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

      chart: {
        title: "Loan Balance Over Time",
        xLabel: "Year",
        yLabel: "Amount",
        series: {
          balance: "Remaining Balance",
          cumulativePrincipal: "Cumulative Principal Paid",
          cumulativeInterest: "Cumulative Interest Paid",
        },
      },

      detailedTable: {
        amortizationSchedule: {
          button: "View Full Amortization Schedule",
          title: "Year-by-Year Amortization Schedule",
          columns: {
            year: "Year",
            payment: "Annual Payment",
            principal: "Principal Paid",
            interest: "Interest Paid",
            cumulativeInterest: "Cumulative Interest",
            balance: "Remaining Balance",
          },
        },
      },
    },
  },

  // ─── INPUTS ───
  inputs: [
    {
      id: "loanAmount",
      type: "number",
      defaultValue: null,
      placeholder: "200000",
      min: 1,
      max: 100000000,
      unitType: "currency",
      autoConvert: false,
      defaultUnit: "USD",
      syncGroup: false,
    },
    {
      id: "annualInterestRate",
      type: "number",
      defaultValue: null,
      placeholder: "6.8",
      min: 0.1,
      max: 30,
      step: 0.1,
      suffix: "%",
      showSlider: true,
    },
    {
      id: "loanTermYears",
      type: "number",
      defaultValue: null,
      placeholder: "30",
      min: 1,
      max: 50,
      suffix: "years",
    },
    {
      id: "paymentFrequency",
      type: "select",
      defaultValue: "monthly",
      options: [
        { value: "monthly" },
        { value: "biweekly" },
        { value: "acceleratedBiweekly" },
        { value: "weekly" },
        { value: "semiMonthly" },
      ],
    },
    {
      id: "includeExtraPayments",
      type: "radio",
      defaultValue: "false",
      options: [{ value: "true" }, { value: "false" }],
    },
    {
      id: "extraMonthlyPayment",
      type: "number",
      defaultValue: null,
      placeholder: "200",
      min: 0,
      max: 1000000,
      unitType: "currency",
      autoConvert: false,
      defaultUnit: "USD",
      syncGroup: false,
      showWhen: { field: "includeExtraPayments", value: "true" },
    },
    {
      id: "extraYearlyPayment",
      type: "number",
      defaultValue: null,
      placeholder: "1000",
      min: 0,
      max: 10000000,
      unitType: "currency",
      autoConvert: false,
      defaultUnit: "USD",
      syncGroup: false,
      showWhen: { field: "includeExtraPayments", value: "true" },
    },
    {
      id: "extraOneTimePayment",
      type: "number",
      defaultValue: null,
      placeholder: "5000",
      min: 0,
      max: 100000000,
      unitType: "currency",
      autoConvert: false,
      defaultUnit: "USD",
      syncGroup: false,
      showWhen: { field: "includeExtraPayments", value: "true" },
    },
    {
      id: "oneTimePaymentMonth",
      type: "number",
      defaultValue: 12,
      min: 1,
      max: 600,
      suffix: "month #",
      showWhen: { field: "includeExtraPayments", value: "true" },
    },
  ],

  inputGroups: [],

  // ─── RESULTS ───
  results: [
    { id: "monthlyPayment", type: "primary", format: "text" },
    { id: "totalInterest", type: "secondary", format: "text" },
    { id: "totalPaid", type: "secondary", format: "text" },
    { id: "interestToPrincipalRatio", type: "secondary", format: "text" },
    { id: "dailyInterestCost", type: "secondary", format: "text" },
    { id: "payoffDate", type: "secondary", format: "text" },
    { id: "interestSaved", type: "secondary", format: "text" },
    { id: "timeSaved", type: "secondary", format: "text" },
  ],

  // ─── INFOCARDS ───
  infoCards: [
    { id: "snapshot", type: "list", icon: "📊", itemCount: 4 },
    { id: "breakdown", type: "list", icon: "🔍", itemCount: 5 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ─── CHART ───
  chart: {
    id: "amortizationChart",
    type: "composed",
    xKey: "year",
    height: 340,
    stacked: false,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "balance", type: "area", color: "#3b82f6" },
      { key: "cumulativePrincipal", type: "area", color: "#10b981" },
      { key: "cumulativeInterest", type: "area", color: "#f59e0b" },
    ],
  },

  // ─── DETAILED TABLE ───
  detailedTable: {
    id: "amortizationSchedule",
    buttonLabel: "View Full Amortization Schedule",
    buttonIcon: "📋",
    modalTitle: "Year-by-Year Amortization Schedule",
    columns: [
      { id: "year", label: "Year", align: "center" },
      { id: "payment", label: "Annual Payment", align: "right" },
      { id: "principal", label: "Principal Paid", align: "right" },
      { id: "interest", label: "Interest Paid", align: "right" },
      { id: "cumulativeInterest", label: "Cumulative Interest", align: "right" },
      { id: "balance", label: "Remaining Balance", align: "right", highlight: true },
    ],
  },

  referenceData: [],

  // ─── EDUCATION SECTIONS ───
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "strategies", type: "list", icon: "📈", itemCount: 6 },
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
      title: "Understand How Mortgage Payments Are Applied",
      source: "CFPB",
      url: "https://www.consumerfinance.gov/owning-a-home/",
    },
    {
      authors: "Federal Reserve Board",
      year: "2024",
      title: "Consumer Credit and Loan Amortization",
      source: "Federal Reserve",
      url: "https://www.federalreserve.gov/",
    },
    {
      authors: "Investopedia",
      year: "2025",
      title: "Amortization: Definition, Formula, and Calculation",
      source: "Investopedia",
      url: "https://www.investopedia.com/terms/a/amortization.asp",
    },
    {
      authors: "U.S. Department of Education",
      year: "2025",
      title: "Federal Student Loan Repayment Plans",
      source: "StudentAid.gov",
      url: "https://studentaid.gov/manage-loans/repayment/plans",
    },
  ],

  hero: {
    badge: "Finance",
    title: "Amortization Calculator",
    subtitle: "Generate a complete amortization schedule and see how extra payments can save you thousands in interest.",
  },

  sidebar: {
    popular: true,
    trending: true,
  },

  features: {
    pdf: true,
    csv: true,
    excel: true,
    save: true,
    share: true,
    rating: true,
  },

  relatedCalculators: ["mortgage", "auto-loan", "loan", "compound-interest", "savings-goal"],

  ads: { showTopBanner: false, showSidebar: true },
};

// ═══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════

export function calculateAmortization(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits } = data;

  // ─── Extract values ───
  const loanAmount = Number(values.loanAmount) || 0;
  const annualRate = Number(values.annualInterestRate) || 0;
  const termYears = Number(values.loanTermYears) || 0;
  const frequency = String(values.paymentFrequency || "monthly");
  const includeExtra = String(values.includeExtraPayments) === "true";
  const extraMonthly = includeExtra ? (Number(values.extraMonthlyPayment) || 0) : 0;
  const extraYearly = includeExtra ? (Number(values.extraYearlyPayment) || 0) : 0;
  const extraOneTime = includeExtra ? (Number(values.extraOneTimePayment) || 0) : 0;
  const oneTimeMonth = includeExtra ? (Number(values.oneTimePaymentMonth) || 12) : 0;

  // ─── Validation ───
  if (loanAmount <= 0 || annualRate <= 0 || termYears <= 0) {
    return {
      values: {},
      formatted: {},
      summary: "",
      isValid: false,
      metadata: {},
    };
  }

  // ─── Currency symbol ───
  const currencyUnit = fieldUnits?.loanAmount || "USD";
  const sym = CURRENCY_SYMBOLS[currencyUnit] || "$";

  // ─── Payment frequency parameters ───
  let periodsPerYear: number;
  let paymentLabel: string;

  switch (frequency) {
    case "weekly":
      periodsPerYear = 52;
      paymentLabel = "weekly";
      break;
    case "biweekly":
      periodsPerYear = 26;
      paymentLabel = "biweekly";
      break;
    case "acceleratedBiweekly":
      periodsPerYear = 26;
      paymentLabel = "accel. biweekly";
      break;
    case "semiMonthly":
      periodsPerYear = 24;
      paymentLabel = "semi-monthly";
      break;
    default:
      periodsPerYear = 12;
      paymentLabel = "monthly";
  }

  // ─── Calculate periodic payment ───
  const periodicRate = annualRate / 100 / periodsPerYear;
  let totalPeriods = termYears * periodsPerYear;

  let regularPayment: number;
  if (frequency === "acceleratedBiweekly") {
    // Accelerated biweekly: monthly payment ÷ 2
    const monthlyRate = annualRate / 100 / 12;
    const monthlyPeriods = termYears * 12;
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, monthlyPeriods)) /
      (Math.pow(1 + monthlyRate, monthlyPeriods) - 1);
    regularPayment = monthlyPayment / 2;
    // Total periods will be determined by simulation
    totalPeriods = termYears * 26; // max periods
  } else {
    regularPayment = loanAmount * (periodicRate * Math.pow(1 + periodicRate, totalPeriods)) /
      (Math.pow(1 + periodicRate, totalPeriods) - 1);
  }

  // ─── Helper: Calculate monthly equivalent for extras ───
  const extraPerPeriod = (() => {
    if (frequency === "monthly") return extraMonthly;
    if (frequency === "biweekly" || frequency === "acceleratedBiweekly") return extraMonthly * 12 / 26;
    if (frequency === "weekly") return extraMonthly * 12 / 52;
    if (frequency === "semiMonthly") return extraMonthly * 12 / 24;
    return extraMonthly;
  })();

  // ─── Simulate WITHOUT extra payments (baseline) ───
  let baseBalance = loanAmount;
  let baseTotalInterest = 0;
  let baseTotalPeriods = 0;

  for (let p = 1; p <= totalPeriods * 2 && baseBalance > 0.01; p++) {
    const interest = baseBalance * periodicRate;
    let principal = regularPayment - interest;
    if (principal > baseBalance) principal = baseBalance;
    baseBalance -= principal;
    baseTotalInterest += interest;
    baseTotalPeriods = p;
  }

  const baseTotalPaid = loanAmount + baseTotalInterest;

  // ─── Simulate WITH extra payments ───
  let balance = loanAmount;
  let totalInterest = 0;
  let totalExtraPaid = 0;
  let actualPeriods = 0;

  // Track year-by-year data
  const yearlyData: Array<{
    year: number;
    totalPayment: number;
    totalPrincipal: number;
    totalInterest: number;
    cumulativeInterest: number;
    endBalance: number;
  }> = [];

  let currentYearPayment = 0;
  let currentYearPrincipal = 0;
  let currentYearInterest = 0;
  let cumulativeInterest = 0;

  // First payment breakdown
  let firstPaymentInterest = 0;
  let firstPaymentPrincipal = 0;

  // Monthly equivalent tracking for yearly/one-time
  const monthEquivPeriods = periodsPerYear / 12; // periods per month

  for (let p = 1; p <= totalPeriods * 2 && balance > 0.01; p++) {
    const interest = balance * periodicRate;
    let principal = regularPayment - interest;

    // Extra monthly
    let extraThisPeriod = extraPerPeriod;

    // Extra yearly: apply at end of each year
    const currentMonth = Math.ceil(p / monthEquivPeriods);
    if (extraYearly > 0 && p % periodsPerYear === 0) {
      extraThisPeriod += extraYearly;
    }

    // Extra one-time: apply at the specified month
    if (extraOneTime > 0 && currentMonth === oneTimeMonth && (p - 1) % Math.round(monthEquivPeriods) === 0) {
      extraThisPeriod += extraOneTime;
    }

    // Cap total payment at remaining balance
    if (principal + extraThisPeriod > balance) {
      principal = balance;
      extraThisPeriod = 0;
    }

    balance -= principal;
    if (extraThisPeriod > 0 && balance > 0) {
      const actualExtra = Math.min(extraThisPeriod, balance);
      balance -= actualExtra;
      totalExtraPaid += actualExtra;
    }

    totalInterest += interest;
    cumulativeInterest += interest;
    actualPeriods = p;

    // First payment
    if (p === 1) {
      firstPaymentInterest = interest;
      firstPaymentPrincipal = regularPayment - interest;
    }

    // Year tracking
    currentYearPayment += regularPayment + (extraThisPeriod > 0 ? extraThisPeriod : 0);
    currentYearPrincipal += principal + (extraThisPeriod > 0 ? Math.min(extraThisPeriod, balance + Math.min(extraThisPeriod, balance)) : 0);
    currentYearInterest += interest;

    if (p % periodsPerYear === 0 || balance <= 0.01) {
      const yearNum = yearlyData.length + 1;
      yearlyData.push({
        year: yearNum,
        totalPayment: currentYearPayment,
        totalPrincipal: currentYearPayment - currentYearInterest,
        totalInterest: currentYearInterest,
        cumulativeInterest,
        endBalance: Math.max(0, balance),
      });
      currentYearPayment = 0;
      currentYearPrincipal = 0;
      currentYearInterest = 0;
    }
  }

  const totalPaid = loanAmount + totalInterest;

  // ─── Unique Metrics ───

  // Interest-to-principal ratio
  const interestRatio = totalInterest / loanAmount;

  // Daily interest cost (year 1)
  const dailyInterest = (loanAmount * (annualRate / 100)) / 365;

  // Equity at midpoint
  const midpointPeriod = Math.floor(actualPeriods / 2);
  let midBalance = loanAmount;
  for (let p = 1; p <= midpointPeriod && midBalance > 0.01; p++) {
    const int = midBalance * periodicRate;
    const princ = Math.min(regularPayment - int, midBalance);
    midBalance -= princ;
  }
  const equityAtMidpoint = ((loanAmount - midBalance) / loanAmount) * 100;

  // Biweekly comparison (only show if currently monthly)
  let biweeklySavingsAmount = 0;
  let biweeklySavedMonths = 0;
  if (frequency === "monthly") {
    const biweeklyRate = annualRate / 100 / 26;
    const biweeklyPayment = regularPayment / 2;
    let bwBalance = loanAmount;
    let bwTotalInterest = 0;
    let bwPeriods = 0;
    for (let p = 1; p <= termYears * 26 * 2 && bwBalance > 0.01; p++) {
      const int = bwBalance * biweeklyRate;
      let princ = biweeklyPayment - int;
      if (princ > bwBalance) princ = bwBalance;
      bwBalance -= princ;
      bwTotalInterest += int;
      bwPeriods = p;
    }
    biweeklySavingsAmount = baseTotalInterest - bwTotalInterest;
    const bwMonths = (bwPeriods / 26) * 12;
    const baseMonths = termYears * 12;
    biweeklySavedMonths = baseMonths - bwMonths;
  }

  // Interest saved and time saved from extra payments
  const interestSaved = baseTotalInterest - totalInterest;
  const timeSavedPeriods = baseTotalPeriods - actualPeriods;
  const timeSavedMonths = Math.round((timeSavedPeriods / periodsPerYear) * 12);
  const timeSavedYears = Math.floor(timeSavedMonths / 12);
  const timeSavedRemMonths = timeSavedMonths % 12;

  // Payoff date
  const now = new Date();
  const payoffMonths = Math.round((actualPeriods / periodsPerYear) * 12);
  const payoffDate = new Date(now.getFullYear(), now.getMonth() + payoffMonths, 1);
  const payoffDateStr = payoffDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  // ─── Chart Data ───
  const chartData: Array<Record<string, unknown>> = [];
  let chartCumPrincipal = 0;
  let chartCumInterest = 0;
  for (const yd of yearlyData) {
    chartCumPrincipal += yd.totalPrincipal;
    chartCumInterest += yd.totalInterest;
    chartData.push({
      year: yd.year,
      balance: Math.round(yd.endBalance),
      cumulativePrincipal: Math.round(chartCumPrincipal),
      cumulativeInterest: Math.round(chartCumInterest),
    });
  }

  // ─── Table Data ───
  const tableData = yearlyData.map((yd) => ({
    year: String(yd.year),
    payment: `${sym}${fmtNum(yd.totalPayment)}`,
    principal: `${sym}${fmtNum(yd.totalPrincipal)}`,
    interest: `${sym}${fmtNum(yd.totalInterest)}`,
    cumulativeInterest: `${sym}${fmtNum(yd.cumulativeInterest)}`,
    balance: `${sym}${fmtNum(yd.endBalance)}`,
  }));

  // ─── Format time saved string ───
  let timeSavedStr = "—";
  if (includeExtra && timeSavedMonths > 0) {
    if (timeSavedYears > 0) {
      timeSavedStr = `${timeSavedYears} yr ${timeSavedRemMonths} mo earlier`;
    } else {
      timeSavedStr = `${timeSavedRemMonths} months earlier`;
    }
  }

  // ─── Format biweekly savings ───
  let biweeklySavingsStr = "—";
  if (frequency === "monthly" && biweeklySavingsAmount > 0) {
    const bwYears = Math.floor(biweeklySavedMonths / 12);
    const bwMo = Math.round(biweeklySavedMonths % 12);
    biweeklySavingsStr = `Save ${sym}${fmtNum(biweeklySavingsAmount, 0)} & ${bwYears} yr ${bwMo} mo`;
  } else if (frequency !== "monthly") {
    biweeklySavingsStr = "Already using accelerated frequency";
  }

  // ─── Build results ───
  return {
    values: {
      monthlyPayment: regularPayment,
      totalInterest,
      totalPaid,
      interestToPrincipalRatio: interestRatio,
      dailyInterestCost: dailyInterest,
      payoffDate: payoffDateStr,
      interestSaved,
      timeSaved: timeSavedMonths,
      firstPaymentInterest,
      firstPaymentPrincipal,
      equityAtMidpoint,
      biweeklySavings: biweeklySavingsAmount,
    },
    formatted: {
      monthlyPayment: `${sym}${fmtNum(regularPayment)} ${paymentLabel}`,
      totalInterest: `${sym}${fmtNum(totalInterest)}`,
      totalPaid: `${sym}${fmtNum(totalPaid)}`,
      interestToPrincipalRatio: `${sym}${fmtNum(interestRatio)} per $1 borrowed`,
      dailyInterestCost: `${sym}${fmtNum(dailyInterest)}/day`,
      payoffDate: payoffDateStr,
      interestSaved: includeExtra && interestSaved > 0 ? `${sym}${fmtNum(interestSaved)} saved` : "—",
      timeSaved: timeSavedStr,
      firstPaymentInterest: `${sym}${fmtNum(firstPaymentInterest)}`,
      firstPaymentPrincipal: `${sym}${fmtNum(firstPaymentPrincipal)}`,
      equityAtMidpoint: `${fmtNum(equityAtMidpoint, 1)}% paid off at midpoint`,
      biweeklySavings: biweeklySavingsStr,
    },
    summary: `Your ${paymentLabel} payment is ${sym}${fmtNum(regularPayment)}. Over the life of the loan, you'll pay ${sym}${fmtNum(totalInterest)} in interest — that's ${sym}${fmtNum(interestRatio)} for every dollar borrowed.`,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default amortizationCalculatorConfig;
