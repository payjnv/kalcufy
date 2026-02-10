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
        debts: [
          { name: "Credit Card 1", balance: 8000, rate: 22.99, minPayment: 200 },
          { name: "Credit Card 2", balance: 3000, rate: 19.49, minPayment: 75 },
          { name: "Auto Loan", balance: 15000, rate: 6.5, minPayment: 350 },
          { name: "Student Loan", balance: 25000, rate: 5.5, minPayment: 280 },
        ],
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
        debts: [
          { name: "Credit Card", balance: 5000, rate: 21.49, minPayment: 125 },
          { name: "Auto Loan", balance: 18000, rate: 6.5, minPayment: 400 },
          { name: "Personal Loan", balance: 10000, rate: 12, minPayment: 250 },
        ],
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
        debts: [
          { name: "Student Loan 1", balance: 35000, rate: 6.0, minPayment: 400 },
          { name: "Student Loan 2", balance: 15000, rate: 5.0, minPayment: 170 },
          { name: "Credit Card", balance: 4000, rate: 20.49, minPayment: 100 },
        ],
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
        debts: [
          { name: "HELOC", balance: 40000, rate: 8.5, minPayment: 500 },
          { name: "Credit Card", balance: 12000, rate: 24.49, minPayment: 300 },
          { name: "Auto Loan", balance: 22000, rate: 5.5, minPayment: 450 },
          { name: "Personal Loan", balance: 8000, rate: 11, minPayment: 200 },
        ],
        payoffStrategy: "avalanche",
        includeExtraPayment: true,
        extraMonthlyPayment: 300,
        includeIncome: true,
        monthlyIncome: 7500,
      },
    },
  ],

  // ─── TRANSLATIONS ───
  t: {
    en: {
      title: "Debt Payoff Calculator",
      subtitle: "Create your personalized debt-free plan using snowball, avalanche, or minimum payment strategies.",
      seo: {
        title: "Debt Payoff Calculator - Create Your Debt-Free Plan",
        description: "Plan your debt payoff with snowball or avalanche strategies. See your debt-free date, daily interest cost, and how extra payments save thousands. Works for credit cards, loans, and all debt types.",
        shortDescription: "Create a debt payoff plan and see your debt-free date.",
        keywords: "debt payoff calculator, debt snowball calculator, debt avalanche calculator, pay off debt, debt free calculator, credit card payoff, debt repayment plan, debt elimination calculator",
      },

      presets: {
        creditCardCrisis: "Credit Card Crisis",
        mixedDebt: "Mixed Debt",
        studentHeavy: "Student Heavy",
        highBalance: "High Balance",
      },

      inputs: {
        debts: {
          label: "Your Debts",
          helpText: "Add each debt with its current balance, interest rate, and minimum monthly payment.",
          addButtonLabel: "Add Debt",
          fields: {
            name: { label: "Debt Name" },
            balance: { label: "Balance" },
            rate: { label: "APR %" },
            minPayment: { label: "Min Payment" },
          },
        },
        payoffStrategy: {
          label: "Payoff Strategy",
          helpText: "Avalanche saves the most on interest. Snowball gives faster emotional wins. Minimum shows baseline cost.",
          options: {
            avalanche: "Avalanche (Highest Rate First)",
            snowball: "Snowball (Smallest Balance First)",
            minimum: "Minimum Payments Only",
          },
        },
        includeExtraPayment: {
          label: "Extra Monthly Payment",
          helpText: "Toggle on to add an extra amount each month toward your targeted debt.",
        },
        extraMonthlyPayment: {
          label: "Extra Amount Per Month",
          helpText: "This extra amount is applied to the targeted debt on top of all minimum payments.",
        },
        includeIncome: {
          label: "Include Monthly Income",
          helpText: "Optional — enter your income to calculate your debt-to-income ratio.",
        },
        monthlyIncome: {
          label: "Gross Monthly Income",
          helpText: "Your total monthly income before taxes. Used to calculate debt-to-income ratio.",
        },
      },

      results: {
        debtFreeDate: {
          label: "DEBT-FREE DATE",
        },
        totalInterestPaid: {
          label: "Total Interest",
        },
        totalAmountPaid: {
          label: "Total Amount Paid",
        },
        monthlyInterestDrain: {
          label: "Monthly Interest Drain",
        },
        dailyInterestCost: {
          label: "Daily Interest Cost",
        },
        weightedAvgRate: {
          label: "Weighted Avg Rate",
        },
        debtToIncomeRatio: {
          label: "Debt-to-Income Ratio",
        },
        interestSaved: {
          label: "Interest Saved",
        },
        timeSaved: {
          label: "Time Saved",
        },
        firstDebtEliminated: {
          label: "First Win",
        },
      },

      infoCards: {
        overview: {
          title: "Debt Overview",
          icon: "📊",
          items: [
            { label: "Total Debt" },
            { label: "Weighted Avg APR" },
            { label: "Debt-to-Income" },
            { label: "Daily Interest Cost" },
          ],
        },
        plan: {
          title: "Your Payoff Plan",
          icon: "🎯",
          items: [
            { label: "Debt-Free Date" },
            { label: "Total Interest Paid" },
            { label: "Interest Saved vs Minimum" },
            { label: "Time Saved vs Minimum" },
            { label: "First Debt Eliminated" },
          ],
        },
        tips: {
          title: "Debt-Free Tips",
          icon: "💡",
          items: [
            { label: "Target High-Rate", description: "Pay off credit cards (15-25% APR) first — they cost 3-5× more than auto/student loans." },
            { label: "Extra $100/mo", description: "Adding just $100/month to your highest-rate debt can save thousands in interest and years off your timeline." },
            { label: "Negotiate Rates", description: "Call your credit card company and ask for a lower rate. A 5% reduction on $10K saves $500/year." },
            { label: "Avoid New Debt", description: "Freeze credit cards and use cash/debit while paying off debt. New charges undo your progress." },
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is a Debt Payoff Plan?",
          icon: "📖",
          content: "A debt payoff plan is a strategic approach to eliminating your debts by organizing payments in a specific order. Rather than making random payments across multiple accounts, a payoff plan prioritizes certain debts to either minimize total interest paid or build psychological momentum through quick wins. The two most popular strategies are the debt avalanche method, which targets the highest interest rate first, and the debt snowball method, which tackles the smallest balance first. Both approaches keep you making minimum payments on all debts while directing any extra funds toward a single targeted debt. When that debt is eliminated, the freed-up payment 'rolls over' to the next debt in line, creating an accelerating payment effect. Studies show that people who follow a structured payoff plan are significantly more likely to become debt-free compared to those who pay randomly.",
        },
        howItWorks: {
          title: "How This Calculator Works",
          icon: "⚙️",
          content: "Enter each of your debts with its current balance, annual interest rate (APR), and minimum monthly payment. Choose your preferred strategy — avalanche or snowball — and optionally add an extra monthly payment amount. The calculator simulates your entire payoff journey month by month, tracking how each debt shrinks over time. It calculates your debt-free date, total interest paid, and compares your chosen strategy against minimum-only payments to show exactly how much time and money you save. Unique metrics like daily interest cost and monthly interest drain reveal how much your debt costs in real-time, while the weighted average rate gives you a single number to assess your overall debt health.",
        },
        considerations: {
          title: "Avalanche vs Snowball: Key Differences",
          icon: "📋",
          items: [
            { title: "Avalanche: Lowest Total Cost", description: "By targeting the highest interest rate first, you minimize the total interest paid over the life of all debts." },
            { title: "Snowball: Fastest Psychological Wins", description: "Paying off the smallest balance first eliminates debts quickly, building momentum and motivation to continue." },
            { title: "Avalanche Saves More Money", description: "In most scenarios, avalanche saves hundreds to thousands more in interest compared to snowball." },
            { title: "Snowball Has Higher Completion Rates", description: "Research shows people using snowball are more likely to stick with their plan and actually become debt-free." },
            { title: "Difference Is Often Small", description: "For debts with similar interest rates, the savings difference between methods can be just $100-500." },
            { title: "The Best Method Is the One You Follow", description: "Choose avalanche if you're disciplined and analytical. Choose snowball if you need motivation from quick wins." },
          ],
        },
        categories: {
          title: "Common Debt Types & Typical Rates",
          icon: "📊",
          items: [
            { title: "Credit Cards", description: "Typically 15-28% APR. The most expensive common debt. Always prioritize paying these off first." },
            { title: "Personal Loans", description: "Usually 8-15% APR. Fixed payments and terms make them predictable to plan around." },
            { title: "Student Loans", description: "Federal: 4-7% APR. Private: 5-14% APR. May qualify for income-driven repayment or forgiveness." },
            { title: "Auto Loans", description: "Typically 4-10% APR. Secured by the vehicle. Refinancing may lower your rate if credit has improved." },
            { title: "Medical Debt", description: "Often 0% if on a payment plan. Negotiate with the provider before putting it on a credit card." },
            { title: "Home Equity / HELOC", description: "Usually 7-12% APR. Variable rates can increase. Secured by your home — be cautious." },
          ],
        },
        examples: {
          title: "Payoff Examples",
          icon: "🧮",
          columns: 2,
          examples: [
            {
              title: "Credit Card Crisis ($11K, 2 cards)",
              steps: [
                "Card A: $8,000 at 22.99% APR, $200 min",
                "Card B: $3,000 at 19.49% APR, $75 min",
                "Extra payment: $200/month",
                "Avalanche targets Card A first (higher rate)",
                "Card A paid off in 22 months",
                "Card B paid off in 26 months total",
                "Total interest: $3,847 (vs $7,231 minimum-only)",
                "Savings: $3,384 in interest + 38 months faster",
              ],
            },
            {
              title: "Mixed Debt ($33K, 3 types)",
              steps: [
                "Credit Card: $5,000 at 21% APR, $125 min",
                "Auto Loan: $18,000 at 6.5% APR, $400 min",
                "Personal Loan: $10,000 at 12% APR, $250 min",
                "Extra payment: $150/month",
                "Avalanche order: CC → Personal → Auto",
                "First win: Credit Card gone in 15 months",
                "All debt-free in 38 months",
                "Savings: $2,108 vs minimum payments",
              ],
            },
          ],
        },
      },

      faqs: {
        0: {
          question: "What is the debt avalanche method?",
          answer: "The debt avalanche method focuses on paying off the debt with the highest interest rate first while making minimum payments on all other debts. Once the highest-rate debt is paid off, you move to the next highest rate. This approach minimizes the total interest you pay over time and is mathematically the most cost-efficient strategy.",
        },
        1: {
          question: "What is the debt snowball method?",
          answer: "The debt snowball method targets the debt with the smallest balance first, regardless of interest rate. As each small debt is eliminated, you roll that payment into the next smallest debt. This approach provides quick psychological wins that keep you motivated. Research shows people using snowball are more likely to complete their payoff plan.",
        },
        2: {
          question: "How much can I save with extra monthly payments?",
          answer: "Even small extra payments make a huge difference. Adding $100/month to a $10,000 credit card at 22% APR can save over $4,000 in interest and pay it off 3+ years faster. The calculator shows your exact savings based on your specific debts and extra payment amount.",
        },
        3: {
          question: "What is a good debt-to-income ratio?",
          answer: "A debt-to-income (DTI) ratio below 36% is generally considered healthy. Between 36-43% is manageable but could limit your ability to get new loans. Above 43% is considered high risk by most lenders, and above 50% signals a debt crisis that needs immediate attention. The calculator computes your DTI if you enter your monthly income.",
        },
        4: {
          question: "Should I pay off debt or invest?",
          answer: "A general rule is: if your debt interest rate is higher than expected investment returns (historically 7-10% for stocks), pay off the debt first. This means always prioritize credit card debt (15-25% APR) over investing. For low-rate debt like mortgages (3-7%), investing while making minimum payments may build more wealth long-term.",
        },
        5: {
          question: "How is daily interest cost calculated?",
          answer: "Daily interest cost is calculated by multiplying each debt balance by its annual rate, dividing by 365, and summing across all debts. For example, $10,000 at 22% APR accrues $6.03 per day in interest. This metric helps you feel the urgency — every day you delay costs real money.",
        },
        6: {
          question: "Can I combine avalanche and snowball methods?",
          answer: "Yes, a hybrid approach is popular. Some people start with snowball to quickly eliminate 1-2 small debts for motivation, then switch to avalanche for the remaining larger debts. The key is consistency — any structured approach beats random payments.",
        },
        7: {
          question: "Does this calculator work for all debt types?",
          answer: "Yes, this calculator works for credit cards, personal loans, auto loans, student loans, medical debt, HELOCs, and any other fixed or revolving debt. Enter the current balance, APR, and minimum payment for each debt regardless of type.",
        },
      },

      detailedTable: {
        buttonText: "View Full Payoff Schedule",
      },
    },
  },

  // ─── INPUTS ───
  inputGroups: [],
  referenceData: [],

  inputs: [
    {
      id: "debts",
      type: "repeater",
      defaultValue: [
        { name: "", balance: null, rate: null, minPayment: null },
        { name: "", balance: null, rate: null, minPayment: null },
      ],
      repeaterFields: [
        {
          id: "name",
          type: "text",
          placeholder: "e.g. Credit Card",
          width: "full",
        },
        {
          id: "balance",
          type: "number",
          placeholder: "5000",
          prefix: "$",
          min: 0,
          max: 1000000,
          width: "third",
        },
        {
          id: "rate",
          type: "number",
          placeholder: "19.99",
          suffix: "%",
          min: 0,
          max: 50,
          step: 0.01,
          width: "third",
        },
        {
          id: "minPayment",
          type: "number",
          placeholder: "150",
          prefix: "$",
          min: 0,
          max: 100000,
          width: "third",
        },
      ],
      minRows: 2,
      maxRows: 10,
      addButtonLabel: "Add Debt",
    },
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
      autoConvert: false,
      syncGroup: false,
      min: 0,
      max: 100000,
      showWhen: { field: "includeExtraPayment", value: true },
    },
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
      autoConvert: false,
      syncGroup: false,
      min: 0,
      max: 10000000,
      showWhen: { field: "includeIncome", value: true },
    },
  ],

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

  // ─── INFOCARDS (3) ───
  infoCards: [
    { id: "overview", type: "list", icon: "📊", itemCount: 4 },
    { id: "plan", type: "list", icon: "🎯", itemCount: 5 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ─── CHART ───
  chart: {
    type: "composed",
    xKey: "month",
    series: [
      { key: "totalBalance", type: "area", color: "#ef4444" },
      { key: "cumulativePaid", type: "area", color: "#22c55e" },
      { key: "cumulativeInterest", type: "area", color: "#f97316" },
    ],
  },

  // ─── DETAILED TABLE ───
  detailedTable: {
    columns: [
      { key: "month", label: "Month" },
      { key: "debtTargeted", label: "Debt Targeted" },
      { key: "payment", label: "Payment" },
      { key: "principal", label: "Principal" },
      { key: "interest", label: "Interest" },
      { key: "remainingTotal", label: "Total Remaining", highlight: true },
    ],
  },

  // ─── EDUCATION (5 sections) ───
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  // ─── FAQS (8) ───
  faqs: [
    { id: "0" }, { id: "1" }, { id: "2" }, { id: "3" },
    { id: "4" }, { id: "5" }, { id: "6" }, { id: "7" },
  ],

  // ─── REFERENCES (4) ───
  references: [
    {
      authors: "Consumer Financial Protection Bureau",
      year: "2024",
      title: "Paying Down Debt",
      source: "CFPB",
      url: "https://www.consumerfinance.gov/consumer-tools/debt-collection/",
    },
    {
      authors: "Federal Reserve",
      year: "2024",
      title: "Consumer Credit Outstanding",
      source: "Federal Reserve Statistical Release",
      url: "https://www.federalreserve.gov/releases/g19/current/",
    },
    {
      authors: "Investopedia",
      year: "2024",
      title: "Debt Avalanche vs. Debt Snowball: What's the Difference?",
      source: "Investopedia",
      url: "https://www.investopedia.com/articles/personal-finance/080716/debt-avalanche-vs-debt-snowball-which-best-you.asp",
    },
    {
      authors: "National Foundation for Credit Counseling",
      year: "2024",
      title: "Financial Literacy and Debt Management",
      source: "NFCC",
      url: "https://www.nfcc.org/",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════

interface DebtEntry {
  name: string;
  balance: number;
  rate: number;
  minPayment: number;
}

interface SimDebt {
  name: string;
  balance: number;
  rate: number;
  minPayment: number;
  originalBalance: number;
  paidOff: boolean;
  paidOffMonth: number;
}

interface MonthlySnapshot {
  month: number;
  totalBalance: number;
  cumulativePaid: number;
  cumulativeInterest: number;
}

function simulatePayoff(
  debts: DebtEntry[],
  strategy: string,
  extraMonthly: number,
  maxMonths = 600
): {
  totalInterest: number;
  totalPaid: number;
  totalMonths: number;
  firstPaidOff: { name: string; month: number } | null;
  snapshots: MonthlySnapshot[];
  schedule: Array<{
    month: number;
    debtTargeted: string;
    payment: number;
    principal: number;
    interest: number;
    remainingTotal: number;
  }>;
} {
  // Deep clone debts for simulation
  const simDebts: SimDebt[] = debts.map((d) => ({
    name: d.name || "Unnamed",
    balance: d.balance,
    rate: d.rate / 100,
    minPayment: d.minPayment,
    originalBalance: d.balance,
    paidOff: false,
    paidOffMonth: 0,
  }));

  let totalInterest = 0;
  let totalPaid = 0;
  let month = 0;
  let firstPaidOff: { name: string; month: number } | null = null;
  const snapshots: MonthlySnapshot[] = [];
  const schedule: Array<{
    month: number;
    debtTargeted: string;
    payment: number;
    principal: number;
    interest: number;
    remainingTotal: number;
  }> = [];

  // Initial snapshot
  const initialBalance = simDebts.reduce((s, d) => s + d.balance, 0);
  snapshots.push({ month: 0, totalBalance: initialBalance, cumulativePaid: 0, cumulativeInterest: 0 });

  while (month < maxMonths) {
    const activeDebts = simDebts.filter((d) => !d.paidOff);
    if (activeDebts.length === 0) break;

    month++;
    let monthPayment = 0;
    let monthInterest = 0;
    let monthPrincipal = 0;

    // Determine target debt based on strategy
    let targetDebt: SimDebt | null = null;
    if (strategy === "avalanche") {
      targetDebt = activeDebts.reduce((best, d) => (d.rate > best.rate ? d : best), activeDebts[0]);
    } else if (strategy === "snowball") {
      targetDebt = activeDebts.reduce((best, d) => (d.balance < best.balance ? d : best), activeDebts[0]);
    }
    // "minimum" → no target, just pay minimums

    // Step 1: Apply interest to all active debts
    for (const d of activeDebts) {
      const monthlyInterest = d.balance * (d.rate / 12);
      d.balance += monthlyInterest;
      monthInterest += monthlyInterest;
    }

    // Step 2: Pay minimum on all debts except target
    let extraAvailable = extraMonthly;
    for (const d of activeDebts) {
      if (d.paidOff) continue;
      const isTarget = targetDebt && d.name === targetDebt.name;
      if (isTarget && strategy !== "minimum") continue; // Pay target last to include extra

      const payment = Math.min(d.minPayment, d.balance);
      d.balance -= payment;
      monthPayment += payment;
      monthPrincipal += payment;

      if (d.balance <= 0.01) {
        d.balance = 0;
        d.paidOff = true;
        d.paidOffMonth = month;
        // Freed-up payment rolls over
        extraAvailable += d.minPayment;
        if (!firstPaidOff) firstPaidOff = { name: d.name, month };
      }
    }

    // Step 3: Pay target debt (min + extra + freed-up)
    if (targetDebt && !targetDebt.paidOff && strategy !== "minimum") {
      const targetPayment = Math.min(targetDebt.minPayment + extraAvailable, targetDebt.balance);
      targetDebt.balance -= targetPayment;
      monthPayment += targetPayment;
      monthPrincipal += targetPayment;

      if (targetDebt.balance <= 0.01) {
        targetDebt.balance = 0;
        targetDebt.paidOff = true;
        targetDebt.paidOffMonth = month;
        if (!firstPaidOff) firstPaidOff = { name: targetDebt.name, month };
      }
    }

    totalInterest += monthInterest;
    totalPaid += monthPayment;

    const remainingTotal = simDebts.reduce((s, d) => s + d.balance, 0);

    // Record snapshot (every month for first 24, then every 3)
    if (month <= 24 || month % 3 === 0 || remainingTotal <= 0.01) {
      snapshots.push({
        month,
        totalBalance: Math.max(0, remainingTotal),
        cumulativePaid: totalPaid,
        cumulativeInterest: totalInterest,
      });
    }

    // Record schedule row (first 12 monthly, then quarterly, last month)
    if (month <= 12 || month % 3 === 0 || remainingTotal <= 0.01) {
      schedule.push({
        month,
        debtTargeted: targetDebt ? targetDebt.name : "All (minimum)",
        payment: Math.round(monthPayment * 100) / 100,
        principal: Math.round(monthPrincipal * 100) / 100,
        interest: Math.round(monthInterest * 100) / 100,
        remainingTotal: Math.round(Math.max(0, remainingTotal) * 100) / 100,
      });
    }

    if (remainingTotal <= 0.01) break;
  }

  return {
    totalInterest,
    totalPaid,
    totalMonths: month,
    firstPaidOff,
    snapshots,
    schedule,
  };
}

export function calculate(values: Record<string, unknown>, fieldUnits?: Record<string, string>): CalculatorResults {
  // ─── Parse debts from repeater ───
  const rawDebts = values.debts as Array<Record<string, unknown>> | undefined;
  if (!rawDebts || !Array.isArray(rawDebts) || rawDebts.length < 1) {
    return {
      values: {},
      formatted: {
        debtFreeDate: "—",
        totalInterestPaid: "—",
        totalAmountPaid: "—",
        monthlyInterestDrain: "—",
        dailyInterestCost: "—",
        weightedAvgRate: "—",
        debtToIncomeRatio: "—",
        interestSaved: "—",
        timeSaved: "—",
        firstDebtEliminated: "—",
      },
      summary: "Enter your debts to see your payoff plan.",
      isValid: false,
    };
  }

  // Parse and validate debts
  const debts: DebtEntry[] = rawDebts
    .map((d) => ({
      name: String(d.name || ""),
      balance: Number(d.balance) || 0,
      rate: Number(d.rate) || 0,
      minPayment: Number(d.minPayment) || 0,
    }))
    .filter((d) => d.balance > 0 && d.rate >= 0 && d.minPayment > 0);

  if (debts.length === 0) {
    return {
      values: {},
      formatted: {
        debtFreeDate: "—",
        totalInterestPaid: "—",
        totalAmountPaid: "—",
        monthlyInterestDrain: "—",
        dailyInterestCost: "—",
        weightedAvgRate: "—",
        debtToIncomeRatio: "—",
        interestSaved: "—",
        timeSaved: "—",
        firstDebtEliminated: "—",
      },
      summary: "Enter at least one debt with balance, rate, and minimum payment.",
      isValid: false,
    };
  }

  // ─── Parse other inputs ───
  const strategy = String(values.payoffStrategy || "avalanche");
  const includeExtra = values.includeExtraPayment === true;
  const extraMonthly = includeExtra ? (Number(values.extraMonthlyPayment) || 0) : 0;
  const includeIncome = values.includeIncome === true;
  const monthlyIncome = includeIncome ? (Number(values.monthlyIncome) || 0) : 0;

  // ─── Currency symbol ───
  const currUnit = fieldUnits?.extraMonthlyPayment || fieldUnits?.monthlyIncome || "USD";
  const sym = CURRENCY_SYMBOLS[currUnit] || "$";

  // ─── Calculate metrics ───
  const totalDebt = debts.reduce((s, d) => s + d.balance, 0);
  const totalMinPayments = debts.reduce((s, d) => s + d.minPayment, 0);

  // Weighted average interest rate
  const weightedAvgRate = debts.reduce((s, d) => s + d.rate * (d.balance / totalDebt), 0);

  // Daily interest cost (current)
  const dailyInterest = debts.reduce((s, d) => s + (d.balance * (d.rate / 100)) / 365, 0);

  // Monthly interest drain (first month)
  const monthlyInterest = debts.reduce((s, d) => s + (d.balance * (d.rate / 100)) / 12, 0);

  // DTI ratio
  const dtiRatio = monthlyIncome > 0 ? (totalMinPayments / monthlyIncome) * 100 : 0;
  let dtiLabel = "";
  if (monthlyIncome > 0) {
    if (dtiRatio < 36) dtiLabel = "Healthy";
    else if (dtiRatio < 43) dtiLabel = "Caution";
    else if (dtiRatio < 50) dtiLabel = "High Risk";
    else dtiLabel = "Critical";
  }

  // Rate health label
  let rateLabel = "";
  if (weightedAvgRate < 8) rateLabel = "Low";
  else if (weightedAvgRate < 15) rateLabel = "Moderate";
  else if (weightedAvgRate < 22) rateLabel = "High";
  else rateLabel = "Critical";

  // ─── Run simulations ───
  const result = simulatePayoff(debts, strategy, extraMonthly);
  const minimumResult = strategy !== "minimum"
    ? simulatePayoff(debts, "minimum", 0)
    : result;

  // Calculate savings vs minimum
  const interestSaved = strategy !== "minimum"
    ? minimumResult.totalInterest - result.totalInterest
    : 0;
  const timeSavedMonths = strategy !== "minimum"
    ? minimumResult.totalMonths - result.totalMonths
    : 0;
  const timeSavedYears = Math.floor(Math.abs(timeSavedMonths) / 12);
  const timeSavedRemMonths = Math.abs(timeSavedMonths) % 12;

  // Debt-free date
  const now = new Date();
  const freeDate = new Date(now.getFullYear(), now.getMonth() + result.totalMonths, 1);
  const freeDateStr = freeDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  // First debt eliminated
  const firstWinStr = result.firstPaidOff
    ? `${result.firstPaidOff.name} — ${result.firstPaidOff.month} months`
    : "—";

  // ─── Chart data ───
  const chartData = result.snapshots.map((s) => ({
    month: `Mo ${s.month}`,
    totalBalance: Math.round(s.totalBalance),
    cumulativePaid: Math.round(s.cumulativePaid),
    cumulativeInterest: Math.round(s.cumulativeInterest),
  }));

  // ─── Table data ───
  const tableData = result.schedule.map((row) => ({
    month: `${row.month}`,
    debtTargeted: row.debtTargeted,
    payment: `${sym}${fmtNum(row.payment)}`,
    principal: `${sym}${fmtNum(row.principal)}`,
    interest: `${sym}${fmtNum(row.interest)}`,
    remainingTotal: `${sym}${fmtNum(row.remainingTotal)}`,
  }));

  // ─── Time saved string ───
  let timeSavedStr = "—";
  if (timeSavedMonths > 0) {
    if (timeSavedYears > 0) {
      timeSavedStr = `${timeSavedYears} yr ${timeSavedRemMonths} mo faster`;
    } else {
      timeSavedStr = `${timeSavedRemMonths} mo faster`;
    }
  }

  // ─── Build summary ───
  const strategyName = strategy === "avalanche" ? "avalanche" : strategy === "snowball" ? "snowball" : "minimum payment";
  const summaryParts = [
    `Using the ${strategyName} method, you'll be debt-free by ${freeDateStr}.`,
    `Total interest: ${sym}${fmtNum(result.totalInterest)}.`,
  ];
  if (interestSaved > 0) {
    summaryParts.push(`You save ${sym}${fmtNum(interestSaved)} in interest and ${timeSavedYears > 0 ? `${timeSavedYears} year${timeSavedYears !== 1 ? "s" : ""} ` : ""}${timeSavedRemMonths} month${timeSavedRemMonths !== 1 ? "s" : ""} compared to minimum payments.`);
  }
  if (dailyInterest > 1) {
    summaryParts.push(`Your debts currently cost ${sym}${fmtNum(dailyInterest)} per day in interest.`);
  }

  // ─── InfoCard data ───
  const overviewItems = [
    `${sym}${fmtNum(totalDebt, 0)}`,
    `${fmtNum(weightedAvgRate, 1)}% — ${rateLabel}`,
    monthlyIncome > 0 ? `${fmtNum(dtiRatio, 1)}% — ${dtiLabel}` : "Enter income to calculate",
    `${sym}${fmtNum(dailyInterest)}/day`,
  ];

  const planItems = [
    freeDateStr,
    `${sym}${fmtNum(result.totalInterest)}`,
    interestSaved > 0 ? `${sym}${fmtNum(interestSaved)} saved` : "—",
    timeSavedStr,
    firstWinStr,
  ];

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
    },
    summary: summaryParts.join(" "),
    isValid: true,
    chartData,
    metadata: {
      tableData,
      infoCards: {
        overview: { items: overviewItems },
        plan: { items: planItems },
      },
    },
  };
}
