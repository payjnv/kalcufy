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

export const debtPayoffCalculatorConfig: CalculatorConfigV4 = {
  id: "debt-payoff",
  version: "4.0",
  category: "finance",
  icon: "💳",

  // ─── PRESETS ───
  presets: [
    {
      id: "creditCardCrisis",
      icon: "💳",
      values: {
        debt1Balance: 8000,
        debt1Rate: 22.99,
        debt1MinPayment: 200,
        debt2Balance: 3000,
        debt2Rate: 19.49,
        debt2MinPayment: 75,
        numberOfDebts: "3",
        debt3Balance: 15000,
        debt3Rate: 6.5,
        debt3MinPayment: 350,
        debt4Balance: null,
        debt4Rate: null,
        debt4MinPayment: null,
        payoffStrategy: "avalanche",
        includeExtraPayment: true,
        extraMonthlyPayment: 200,
        includeIncome: true,
        monthlyIncome: 5000,
      },
    },
    {
      id: "mixedDebt",
      icon: "🚗",
      values: {
        debt1Balance: 5000,
        debt1Rate: 21.49,
        debt1MinPayment: 125,
        debt2Balance: 18000,
        debt2Rate: 6.5,
        debt2MinPayment: 400,
        numberOfDebts: "3",
        debt3Balance: 10000,
        debt3Rate: 12,
        debt3MinPayment: 250,
        debt4Balance: null,
        debt4Rate: null,
        debt4MinPayment: null,
        payoffStrategy: "avalanche",
        includeExtraPayment: true,
        extraMonthlyPayment: 150,
        includeIncome: false,
        monthlyIncome: null,
      },
    },
    {
      id: "studentHeavy",
      icon: "🎓",
      values: {
        debt1Balance: 35000,
        debt1Rate: 6.0,
        debt1MinPayment: 400,
        debt2Balance: 15000,
        debt2Rate: 5.0,
        debt2MinPayment: 170,
        numberOfDebts: "3",
        debt3Balance: 4000,
        debt3Rate: 20.49,
        debt3MinPayment: 100,
        debt4Balance: null,
        debt4Rate: null,
        debt4MinPayment: null,
        payoffStrategy: "snowball",
        includeExtraPayment: true,
        extraMonthlyPayment: 100,
        includeIncome: false,
        monthlyIncome: null,
      },
    },
    {
      id: "highBalance",
      icon: "🏠",
      values: {
        debt1Balance: 40000,
        debt1Rate: 8.5,
        debt1MinPayment: 500,
        debt2Balance: 12000,
        debt2Rate: 24.49,
        debt2MinPayment: 300,
        numberOfDebts: "4",
        debt3Balance: 22000,
        debt3Rate: 5.5,
        debt3MinPayment: 450,
        debt4Balance: 8000,
        debt4Rate: 11,
        debt4MinPayment: 200,
        payoffStrategy: "avalanche",
        includeExtraPayment: true,
        extraMonthlyPayment: 300,
        includeIncome: true,
        monthlyIncome: 7500,
      },
    },
  ],

  // ─── TRANSLATIONS (EN only — script translates) ───
  t: {
    en: {
      name: "Debt Payoff Calculator",
      slug: "debt-payoff",
      subtitle:
        "Create your personalized debt-free plan using snowball, avalanche, or minimum payment strategies.",
      seo: {
        title: "Debt Payoff Calculator - Create Your Debt-Free Plan",
        description:
          "Plan your debt payoff with snowball or avalanche strategies. See your debt-free date, daily interest cost, and how extra payments save thousands. Free online tool.",
        shortDescription: "Create a debt payoff plan and see your debt-free date.",
        keywords: [
          "debt payoff calculator",
          "debt snowball calculator",
          "debt avalanche calculator",
          "pay off debt fast",
          "debt free calculator",
          "credit card payoff",
          "debt repayment plan",
          "debt elimination calculator",
        ],
      },

      inputs: {
        debt1Balance: {
          label: "Debt 1 — Balance",
          helpText: "Current balance owed on your first debt",
        },
        debt1Rate: {
          label: "Debt 1 — Interest Rate (APR)",
          helpText: "Annual percentage rate on this debt",
        },
        debt1MinPayment: {
          label: "Debt 1 — Minimum Payment",
          helpText: "Minimum monthly payment required by the lender",
        },
        debt2Balance: {
          label: "Debt 2 — Balance",
          helpText: "Current balance owed on your second debt",
        },
        debt2Rate: {
          label: "Debt 2 — Interest Rate (APR)",
          helpText: "Annual percentage rate on this debt",
        },
        debt2MinPayment: {
          label: "Debt 2 — Minimum Payment",
          helpText: "Minimum monthly payment required by the lender",
        },
        numberOfDebts: {
          label: "Additional Debts",
          helpText: "Select how many total debts you want to include",
          options: {
            "2": "2 Debts Only",
            "3": "3 Debts",
            "4": "4 Debts",
          },
        },
        debt3Balance: {
          label: "Debt 3 — Balance",
          helpText: "Current balance owed on your third debt",
        },
        debt3Rate: {
          label: "Debt 3 — Interest Rate (APR)",
          helpText: "Annual percentage rate on this debt",
        },
        debt3MinPayment: {
          label: "Debt 3 — Minimum Payment",
          helpText: "Minimum monthly payment required by the lender",
        },
        debt4Balance: {
          label: "Debt 4 — Balance",
          helpText: "Current balance owed on your fourth debt",
        },
        debt4Rate: {
          label: "Debt 4 — Interest Rate (APR)",
          helpText: "Annual percentage rate on this debt",
        },
        debt4MinPayment: {
          label: "Debt 4 — Minimum Payment",
          helpText: "Minimum monthly payment required by the lender",
        },
        payoffStrategy: {
          label: "Payoff Strategy",
          helpText: "Avalanche saves the most money. Snowball gives faster wins. Minimum shows the baseline.",
          options: {
            avalanche: "Avalanche (Highest Rate First)",
            snowball: "Snowball (Smallest Balance First)",
            minimum: "Minimum Payments Only",
          },
        },
        includeExtraPayment: {
          label: "Extra Monthly Payment",
          helpText: "Toggle on to add extra money each month toward your targeted debt",
        },
        extraMonthlyPayment: {
          label: "Extra Amount Per Month",
          helpText: "This extra amount is applied to the targeted debt on top of all minimum payments",
        },
        includeIncome: {
          label: "Include Monthly Income",
          helpText: "Optional — enter your income to calculate your debt-to-income ratio",
        },
        monthlyIncome: {
          label: "Gross Monthly Income",
          helpText: "Total monthly income before taxes — used to calculate debt-to-income ratio",
        },
      },

      results: {
        debtFreeDate: { label: "DEBT-FREE DATE" },
        totalInterestPaid: { label: "Total Interest" },
        totalAmountPaid: { label: "Total Amount Paid" },
        monthlyInterestDrain: { label: "Monthly Interest Drain" },
        dailyInterestCost: { label: "Daily Interest Cost" },
        weightedAvgRate: { label: "Weighted Avg Rate" },
        debtToIncomeRatio: { label: "Debt-to-Income Ratio" },
        interestSaved: { label: "Interest Saved" },
        timeSaved: { label: "Time Saved" },
        firstDebtEliminated: { label: "First Win" },
      },

      presets: {
        creditCardCrisis: {
          label: "Credit Card Crisis",
          description: "$26K debt, CC at 22.99% + 19.49%",
        },
        mixedDebt: {
          label: "Mixed Debt",
          description: "$33K across CC, auto, personal",
        },
        studentHeavy: {
          label: "Student Heavy",
          description: "$54K mostly student loans",
        },
        highBalance: {
          label: "High Balance",
          description: "$82K HELOC, CC, auto, personal",
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
          "Using the {strategy} method, you'll be debt-free by {debtFreeDate}. Total interest: {totalInterest}.",
      },

      infoCards: {
        overview: {
          title: "Debt Overview",
          items: [
            { label: "Total Debt", valueKey: "totalDebt" },
            { label: "Weighted Avg APR", valueKey: "weightedAvgRate" },
            { label: "Debt-to-Income", valueKey: "debtToIncomeRatio" },
            { label: "Daily Interest Cost", valueKey: "dailyInterestCost" },
          ],
        },
        plan: {
          title: "Your Payoff Plan",
          items: [
            { label: "Debt-Free Date", valueKey: "debtFreeDate" },
            { label: "Total Interest Paid", valueKey: "totalInterestPaid" },
            { label: "Interest Saved vs Minimum", valueKey: "interestSaved" },
            { label: "Time Saved vs Minimum", valueKey: "timeSaved" },
            { label: "First Debt Eliminated", valueKey: "firstDebtEliminated" },
          ],
        },
        tips: {
          title: "Debt-Free Tips",
          items: [
            "Target credit cards first (15–25% APR) — they cost 3–5× more than auto or student loans in interest.",
            "Adding just $100/month to your highest-rate debt can save thousands in interest and years off your timeline.",
            "Call your credit card company and ask for a lower rate. A 5% reduction on $10K saves $500/year in interest.",
            "Freeze credit cards and use cash or debit while paying off debt. New charges undo your payoff progress.",
          ],
        },
      },

      chart: {
        title: "Debt Balance Over Time",
        xLabel: "Month",
        yLabel: "Balance",
        series: {
          totalBalance: "Remaining Balance",
          cumulativeInterest: "Cumulative Interest",
        },
      },

      detailedTable: {
        payoffSchedule: {
          button: "View Full Payoff Schedule",
          title: "Month-by-Month Payoff Schedule",
          columns: {
            month: "Month",
            targetedDebt: "Debt Targeted",
            payment: "Payment",
            principal: "Principal",
            interest: "Interest",
            remaining: "Total Remaining",
          },
        },
      },

      education: {
        whatIs: {
          title: "What Is a Debt Payoff Plan?",
          content:
            "A debt payoff plan is a strategic approach to eliminating your debts by organizing payments in a specific order. Rather than making random payments across multiple accounts, a payoff plan prioritizes certain debts to either minimize total interest paid or build psychological momentum through quick wins. The two most popular strategies are the debt avalanche method, which targets the highest interest rate first, and the debt snowball method, which tackles the smallest balance first. Both approaches keep you making minimum payments on all debts while directing any extra funds toward a single targeted debt. When that debt is eliminated, the freed-up payment rolls over to the next debt in line, creating an accelerating payment effect. Studies show that people who follow a structured payoff plan are significantly more likely to become debt-free compared to those who pay randomly.",
        },
        howItWorks: {
          title: "How This Calculator Works",
          content:
            "Enter each of your debts with its current balance, annual interest rate (APR), and minimum monthly payment. Choose your preferred strategy — avalanche or snowball — and optionally add an extra monthly payment amount. The calculator simulates your entire payoff journey month by month, tracking how each debt shrinks over time. It calculates your debt-free date, total interest paid, and compares your chosen strategy against minimum-only payments to show exactly how much time and money you save. Unique metrics like daily interest cost and monthly interest drain reveal how much your debt costs in real-time, while the weighted average rate gives you a single number to assess your overall debt health.",
        },
        considerations: {
          title: "Avalanche vs Snowball: Key Differences",
          items: [
            { text: "Avalanche targets the highest interest rate first, minimizing the total interest you pay over the life of all debts.", type: "info" },
            { text: "Snowball pays off the smallest balance first, eliminating debts quickly and building motivation to continue.", type: "info" },
            { text: "In most scenarios, avalanche saves hundreds to thousands more in interest compared to snowball.", type: "info" },
            { text: "Research shows people using snowball are more likely to stick with their plan and actually become debt-free.", type: "info" },
            { text: "For debts with similar interest rates, the savings difference between methods can be just $100–500.", type: "info" },
            { text: "The best method is the one you'll actually follow. Choose avalanche if disciplined, snowball if you need quick wins.", type: "warning" },
          ],
        },
        categories: {
          title: "Common Debt Types & Typical Rates",
          items: [
            { text: "Credit Cards: Typically 15–28% APR. The most expensive common debt — always prioritize paying these off first.", type: "warning" },
            { text: "Personal Loans: Usually 8–15% APR. Fixed payments and terms make them predictable to plan around.", type: "info" },
            { text: "Student Loans: Federal 4–7% APR, Private 5–14% APR. May qualify for income-driven repayment or forgiveness programs.", type: "info" },
            { text: "Auto Loans: Typically 4–10% APR. Secured by the vehicle. Refinancing may lower your rate if credit has improved.", type: "info" },
            { text: "Medical Debt: Often 0% if on a payment plan directly with the provider. Negotiate before putting it on a credit card.", type: "info" },
            { text: "Home Equity / HELOC: Usually 7–12% APR with variable rates that can increase. Secured by your home — be cautious.", type: "warning" },
          ],
        },
        examples: {
          title: "Debt Payoff Calculation Examples",
          description: "Step-by-step examples showing how payoff strategies and timelines are calculated",
          examples: [
            {
              title: "Credit Card Crisis ($11K, 2 cards)",
              steps: [
                "Card A: $8,000 at 22.99% APR, $200 min payment",
                "Card B: $3,000 at 19.49% APR, $75 min payment",
                "Extra payment: $200/month",
                "Avalanche targets Card A first (higher rate)",
                "Card A paid off in ~22 months",
                "Freed-up $200 + $200 extra rolls to Card B",
                "Card B paid off in ~26 months total",
                "Total interest: $3,847 (vs $7,231 minimum-only)",
              ],
              result:
                "Debt-free in 26 months | Interest saved: $3,384 | 38 months faster than minimum payments",
            },
            {
              title: "Mixed Debt ($33K, 3 types)",
              steps: [
                "Credit Card: $5,000 at 21% APR, $125 min",
                "Auto Loan: $18,000 at 6.5% APR, $400 min",
                "Personal Loan: $10,000 at 12% APR, $250 min",
                "Extra payment: $150/month",
                "Avalanche order: CC → Personal → Auto",
                "First win: Credit Card gone in ~15 months",
                "All payments roll forward to next target",
                "Total interest: $4,219 (vs $6,327 minimum-only)",
              ],
              result:
                "Debt-free in 38 months | Interest saved: $2,108 | 14 months faster than minimum payments",
            },
          ],
        },
      },

      faqs: [
        {
          question: "What is the debt avalanche method?",
          answer:
            "The debt avalanche method focuses on paying off the debt with the highest interest rate first while making minimum payments on all other debts. Once the highest-rate debt is paid off, you move to the next highest rate. This approach minimizes the total interest you pay over time and is mathematically the most cost-efficient strategy.",
        },
        {
          question: "What is the debt snowball method?",
          answer:
            "The debt snowball method targets the debt with the smallest balance first, regardless of interest rate. As each small debt is eliminated, you roll that payment into the next smallest debt. This approach provides quick psychological wins that keep you motivated. Research shows people using snowball are more likely to complete their payoff plan.",
        },
        {
          question: "How much can I save with extra monthly payments?",
          answer:
            "Even small extra payments make a huge difference. Adding $100/month to a $10,000 credit card at 22% APR can save over $4,000 in interest and pay it off 3+ years faster. The calculator shows your exact savings based on your specific debts and extra payment amount.",
        },
        {
          question: "What is a good debt-to-income ratio?",
          answer:
            "A debt-to-income (DTI) ratio below 36% is generally considered healthy. Between 36–43% is manageable but may limit your ability to get new loans. Above 43% is high risk by most lender standards, and above 50% signals a debt crisis that needs immediate attention. Enter your monthly income in this calculator to see your DTI.",
        },
        {
          question: "Should I pay off debt or invest?",
          answer:
            "A general rule: if your debt interest rate exceeds expected investment returns (historically 7–10% for stocks), pay off the debt first. This means always prioritize credit card debt (15–25% APR) over investing. For low-rate debt like mortgages (3–7%), investing while making minimum payments may build more wealth long-term.",
        },
        {
          question: "How is daily interest cost calculated?",
          answer:
            "Daily interest cost equals each debt's balance multiplied by its annual rate, divided by 365, then summed across all debts. For example, $10,000 at 22% APR accrues $6.03 per day. This metric helps you feel the urgency — every day you delay costs real money.",
        },
        {
          question: "Can I combine avalanche and snowball methods?",
          answer:
            "Yes, a hybrid approach is popular. Some people start with snowball to quickly eliminate 1–2 small debts for motivation, then switch to avalanche for the remaining larger debts. The key is consistency — any structured approach beats making random payments.",
        },
        {
          question: "Does this calculator work for all debt types?",
          answer:
            "Yes, this calculator works for credit cards, personal loans, auto loans, student loans, medical debt, HELOCs, and any other fixed or revolving debt. Enter the current balance, APR, and minimum payment for each debt regardless of type.",
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
    // ── Debt 1 (always visible) ──
    {
      id: "debt1Balance",
      type: "number",
      defaultValue: null,
      placeholder: "5000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    {
      id: "debt1Rate",
      type: "number",
      defaultValue: null,
      placeholder: "19.99",
      min: 0,
      max: 50,
      step: 0.01,
      suffix: "%",
    },
    {
      id: "debt1MinPayment",
      type: "number",
      defaultValue: null,
      placeholder: "150",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    // ── Debt 2 (always visible) ──
    {
      id: "debt2Balance",
      type: "number",
      defaultValue: null,
      placeholder: "3000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    {
      id: "debt2Rate",
      type: "number",
      defaultValue: null,
      placeholder: "22.99",
      min: 0,
      max: 50,
      step: 0.01,
      suffix: "%",
    },
    {
      id: "debt2MinPayment",
      type: "number",
      defaultValue: null,
      placeholder: "75",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    // ── Number of debts ──
    {
      id: "numberOfDebts",
      type: "select",
      defaultValue: "2",
      options: [
        { value: "2" },
        { value: "3" },
        { value: "4" },
      ],
    },
    // ── Debt 3 (shown when >= 3) ──
    {
      id: "debt3Balance",
      type: "number",
      defaultValue: null,
      placeholder: "10000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "numberOfDebts", value: ["3", "4"] },
    },
    {
      id: "debt3Rate",
      type: "number",
      defaultValue: null,
      placeholder: "12",
      min: 0,
      max: 50,
      step: 0.01,
      suffix: "%",
      showWhen: { field: "numberOfDebts", value: ["3", "4"] },
    },
    {
      id: "debt3MinPayment",
      type: "number",
      defaultValue: null,
      placeholder: "250",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "numberOfDebts", value: ["3", "4"] },
    },
    // ── Debt 4 (shown when = 4) ──
    {
      id: "debt4Balance",
      type: "number",
      defaultValue: null,
      placeholder: "8000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "numberOfDebts", value: "4" },
    },
    {
      id: "debt4Rate",
      type: "number",
      defaultValue: null,
      placeholder: "11",
      min: 0,
      max: 50,
      step: 0.01,
      suffix: "%",
      showWhen: { field: "numberOfDebts", value: "4" },
    },
    {
      id: "debt4MinPayment",
      type: "number",
      defaultValue: null,
      placeholder: "200",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "numberOfDebts", value: "4" },
    },
    // ── Strategy ──
    {
      id: "payoffStrategy",
      type: "select",
      defaultValue: "avalanche",
      options: [
        { value: "avalanche" },
        { value: "snowball" },
        { value: "minimum" },
      ],
    },
    // ── Extra Payment ──
    {
      id: "includeExtraPayment",
      type: "toggle",
      defaultValue: false,
    },
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
    // ── Income ──
    {
      id: "includeIncome",
      type: "toggle",
      defaultValue: false,
    },
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
    { id: "debtFreeDate", type: "primary", format: "text" },
    { id: "totalInterestPaid", type: "secondary", format: "text" },
    { id: "totalAmountPaid", type: "secondary", format: "text" },
    { id: "monthlyInterestDrain", type: "secondary", format: "text" },
    { id: "dailyInterestCost", type: "secondary", format: "text" },
    { id: "weightedAvgRate", type: "secondary", format: "text" },
    { id: "debtToIncomeRatio", type: "secondary", format: "text" },
    { id: "interestSaved", type: "secondary", format: "text" },
    { id: "timeSaved", type: "secondary", format: "text" },
    { id: "firstDebtEliminated", type: "secondary", format: "text" },
  ],

  // ─── INFO CARDS ───
  infoCards: [
    { id: "overview", type: "list", icon: "📊", itemCount: 4 },
    { id: "plan", type: "list", icon: "🎯", itemCount: 5 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ─── CHART ───
  chart: {
    id: "debtOverTime",
    type: "composed",
    xKey: "month",
    stacked: false,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "totalBalance", type: "area", color: "#ef4444" },
      { key: "cumulativeInterest", type: "area", color: "#f97316" },
    ],
  },

  // ─── DETAILED TABLE ───
  detailedTable: {
    id: "payoffSchedule",
    buttonLabel: "View Full Payoff Schedule",
    buttonIcon: "📅",
    modalTitle: "Month-by-Month Payoff Schedule",
    columns: [
      { id: "month", label: "Month", align: "center" },
      { id: "targetedDebt", label: "Debt Targeted", align: "left" },
      { id: "payment", label: "Payment", align: "right" },
      { id: "principal", label: "Principal", align: "right" },
      { id: "interest", label: "Interest", align: "right" },
      { id: "remaining", label: "Total Remaining", align: "right", highlight: true },
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
      title: "Paying Down Debt",
      source: "CFPB",
      url: "https://www.consumerfinance.gov/consumer-tools/debt-collection/",
    },
    {
      authors: "Federal Reserve",
      year: "2025",
      title: "Consumer Credit Outstanding",
      source: "Federal Reserve Statistical Release",
      url: "https://www.federalreserve.gov/releases/g19/current/",
    },
    {
      authors: "Investopedia",
      year: "2025",
      title: "Debt Avalanche vs. Debt Snowball: What's the Difference?",
      source: "Investopedia",
      url: "https://www.investopedia.com/articles/personal-finance/080716/debt-avalanche-vs-debt-snowball-which-best-you.asp",
    },
  ],

  hero: {},
};

// ═══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════

interface DebtEntry {
  label: string;
  balance: number;
  rate: number;
  minPayment: number;
}

interface SimDebt {
  label: string;
  balance: number;
  rate: number;
  minPayment: number;
  paidOff: boolean;
  paidOffMonth: number;
}

function simulatePayoff(
  debts: DebtEntry[],
  strategy: string,
  extraMonthly: number,
  maxMonths = 600
) {
  const simDebts: SimDebt[] = debts.map((d) => ({
    label: d.label,
    balance: d.balance,
    rate: d.rate / 100,
    minPayment: d.minPayment,
    paidOff: false,
    paidOffMonth: 0,
  }));

  let totalInterest = 0;
  let totalPaid = 0;
  let month = 0;
  let firstPaidOff: { label: string; month: number } | null = null;
  const snapshots: Array<{ month: number; totalBalance: number; cumulativeInterest: number }> = [];
  const schedule: Array<Record<string, string>> = [];

  const initialBalance = simDebts.reduce((s, d) => s + d.balance, 0);
  snapshots.push({ month: 0, totalBalance: initialBalance, cumulativeInterest: 0 });

  while (month < maxMonths) {
    const activeDebts = simDebts.filter((d) => !d.paidOff);
    if (activeDebts.length === 0) break;
    month++;

    let monthPayment = 0;
    let monthInterest = 0;
    let monthPrincipal = 0;

    // Determine target
    let targetDebt: SimDebt | null = null;
    if (strategy === "avalanche") {
      targetDebt = activeDebts.reduce((best, d) => (d.rate > best.rate ? d : best), activeDebts[0]);
    } else if (strategy === "snowball") {
      targetDebt = activeDebts.reduce((best, d) => (d.balance < best.balance ? d : best), activeDebts[0]);
    }

    // Apply interest to all active debts
    for (const d of activeDebts) {
      const mi = d.balance * (d.rate / 12);
      d.balance += mi;
      monthInterest += mi;
    }

    // Pay minimums on non-target debts
    let extraAvailable = extraMonthly;
    for (const d of activeDebts) {
      if (d.paidOff) continue;
      const isTarget = targetDebt && d.label === targetDebt.label;
      if (isTarget && strategy !== "minimum") continue;

      const pmt = Math.min(d.minPayment, d.balance);
      d.balance -= pmt;
      monthPayment += pmt;
      monthPrincipal += pmt;

      if (d.balance <= 0.01) {
        d.balance = 0;
        d.paidOff = true;
        d.paidOffMonth = month;
        extraAvailable += d.minPayment;
        if (!firstPaidOff) firstPaidOff = { label: d.label, month };
      }
    }

    // Pay target debt (min + extra + freed-up)
    if (targetDebt && !targetDebt.paidOff && strategy !== "minimum") {
      const pmt = Math.min(targetDebt.minPayment + extraAvailable, targetDebt.balance);
      targetDebt.balance -= pmt;
      monthPayment += pmt;
      monthPrincipal += pmt;

      if (targetDebt.balance <= 0.01) {
        targetDebt.balance = 0;
        targetDebt.paidOff = true;
        targetDebt.paidOffMonth = month;
        if (!firstPaidOff) firstPaidOff = { label: targetDebt.label, month };
      }
    }

    totalInterest += monthInterest;
    totalPaid += monthPayment;
    const remaining = simDebts.reduce((s, d) => s + d.balance, 0);

    // Snapshots for chart
    if (month <= 24 || month % 3 === 0 || remaining <= 0.01) {
      snapshots.push({
        month,
        totalBalance: Math.max(0, remaining),
        cumulativeInterest: totalInterest,
      });
    }

    // Schedule rows for table
    if (month <= 12 || month % 3 === 0 || remaining <= 0.01) {
      schedule.push({
        month: `${month}`,
        targetedDebt: targetDebt ? targetDebt.label : "All (min)",
        payment: `${Math.round(monthPayment * 100) / 100}`,
        principal: `${Math.round(monthPrincipal * 100) / 100}`,
        interest: `${Math.round(monthInterest * 100) / 100}`,
        remaining: `${Math.round(Math.max(0, remaining) * 100) / 100}`,
      });
    }

    if (remaining <= 0.01) break;
  }

  return { totalInterest, totalPaid, totalMonths: month, firstPaidOff, snapshots, schedule };
}

export function calculateDebtPayoff(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const f = (t?.formats as Record<string, string>) || {};

  // ─── Parse debts ───
  const debts: DebtEntry[] = [];
  const numDebts = Number(values.numberOfDebts) || 2;

  for (let i = 1; i <= numDebts; i++) {
    const bal = Number(values[`debt${i}Balance`]) || 0;
    const rate = Number(values[`debt${i}Rate`]) || 0;
    const minPmt = Number(values[`debt${i}MinPayment`]) || 0;
    if (bal > 0 && minPmt > 0) {
      debts.push({ label: `Debt ${i}`, balance: bal, rate, minPayment: minPmt });
    }
  }

  if (debts.length === 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ─── Parse options ───
  const strategy = String(values.payoffStrategy || "avalanche");
  const includeExtra = values.includeExtraPayment as boolean;
  const extraMonthly = includeExtra ? (Number(values.extraMonthlyPayment) || 0) : 0;
  const includeIncome = values.includeIncome as boolean;
  const monthlyIncome = includeIncome ? (Number(values.monthlyIncome) || 0) : 0;

  // ─── Currency symbol ───
  const curr = fieldUnits?.debt1Balance || "USD";
  const sym = CURRENCY_SYMBOLS[curr] || "$";

  // ─── Key metrics ───
  const totalDebt = debts.reduce((s, d) => s + d.balance, 0);
  const totalMinPayments = debts.reduce((s, d) => s + d.minPayment, 0);
  const weightedAvgRate = debts.reduce((s, d) => s + d.rate * (d.balance / totalDebt), 0);
  const dailyInterest = debts.reduce((s, d) => s + (d.balance * (d.rate / 100)) / 365, 0);
  const monthlyInterest = debts.reduce((s, d) => s + (d.balance * (d.rate / 100)) / 12, 0);

  // DTI
  const dtiRatio = monthlyIncome > 0 ? (totalMinPayments / monthlyIncome) * 100 : 0;
  let dtiLabel = "";
  if (monthlyIncome > 0) {
    if (dtiRatio < 36) dtiLabel = "Healthy";
    else if (dtiRatio < 43) dtiLabel = "Caution";
    else if (dtiRatio < 50) dtiLabel = "High Risk";
    else dtiLabel = "Critical";
  }

  // Rate health
  let rateLabel = "";
  if (weightedAvgRate < 8) rateLabel = "Low";
  else if (weightedAvgRate < 15) rateLabel = "Moderate";
  else if (weightedAvgRate < 22) rateLabel = "High";
  else rateLabel = "Critical";

  // ─── Simulate ───
  const result = simulatePayoff(debts, strategy, extraMonthly);
  const minimumResult = strategy !== "minimum" ? simulatePayoff(debts, "minimum", 0) : result;

  const interestSaved = strategy !== "minimum" ? minimumResult.totalInterest - result.totalInterest : 0;
  const timeSavedMonths = strategy !== "minimum" ? minimumResult.totalMonths - result.totalMonths : 0;
  const timeSavedYears = Math.floor(Math.abs(timeSavedMonths) / 12);
  const timeSavedRemMonths = Math.abs(timeSavedMonths) % 12;

  // Debt-free date
  const now = new Date();
  const freeDate = new Date(now.getFullYear(), now.getMonth() + result.totalMonths, 1);
  const freeDateStr = freeDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  // First win
  const firstWinStr = result.firstPaidOff
    ? `${result.firstPaidOff.label} — ${result.firstPaidOff.month} mo`
    : "—";

  // Time saved string
  let timeSavedStr = "—";
  if (timeSavedMonths > 0) {
    timeSavedStr = timeSavedYears > 0
      ? `${timeSavedYears} yr ${timeSavedRemMonths} mo faster`
      : `${timeSavedRemMonths} mo faster`;
  }

  // Strategy name
  const strategyName = strategy === "avalanche" ? "avalanche" : strategy === "snowball" ? "snowball" : "minimum payment";

  // ─── Build summary ───
  let summary =
    f.summary
      ?.replace("{strategy}", strategyName)
      .replace("{debtFreeDate}", freeDateStr)
      .replace("{totalInterest}", `${sym}${fmtNum(result.totalInterest)}`) ||
    `Using the ${strategyName} method, you'll be debt-free by ${freeDateStr}. Total interest: ${sym}${fmtNum(result.totalInterest)}.`;

  if (interestSaved > 0) {
    summary += ` You save ${sym}${fmtNum(interestSaved)} and ${timeSavedStr} compared to minimum payments.`;
  }

  // ─── Chart data ───
  const chartData = result.snapshots.map((s) => ({
    month: `${s.month}`,
    totalBalance: Math.round(s.totalBalance),
    cumulativeInterest: Math.round(s.cumulativeInterest),
  }));

  // ─── Table data ───
  const tableData = result.schedule.map((row) => ({
    month: row.month,
    targetedDebt: row.targetedDebt,
    payment: `${sym}${fmtNum(Number(row.payment))}`,
    principal: `${sym}${fmtNum(Number(row.principal))}`,
    interest: `${sym}${fmtNum(Number(row.interest))}`,
    remaining: `${sym}${fmtNum(Number(row.remaining))}`,
  }));

  return {
    values: {
      debtFreeDate: result.totalMonths,
      totalInterestPaid: result.totalInterest,
      totalAmountPaid: result.totalPaid,
      monthlyInterestDrain: monthlyInterest,
      dailyInterestCost: dailyInterest,
      weightedAvgRate,
      debtToIncomeRatio: dtiRatio,
      interestSaved,
      timeSaved: timeSavedMonths,
      firstDebtEliminated: result.firstPaidOff?.month || 0,
      totalDebt,
    },
    formatted: {
      debtFreeDate: freeDateStr,
      totalInterestPaid: `${sym}${fmtNum(result.totalInterest)}`,
      totalAmountPaid: `${sym}${fmtNum(result.totalPaid)}`,
      monthlyInterestDrain: `${sym}${fmtNum(monthlyInterest)}/mo to interest`,
      dailyInterestCost: `${sym}${fmtNum(dailyInterest)}/day accruing`,
      weightedAvgRate: `${fmtNum(weightedAvgRate, 1)}% — ${rateLabel}`,
      debtToIncomeRatio: monthlyIncome > 0 ? `${fmtNum(dtiRatio, 1)}% — ${dtiLabel}` : "—",
      interestSaved: interestSaved > 0 ? `${sym}${fmtNum(interestSaved)} saved` : "—",
      timeSaved: timeSavedStr,
      firstDebtEliminated: firstWinStr,
      totalDebt: `${sym}${fmtNum(totalDebt, 0)}`,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}
