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

export const creditCardInterestCalculatorConfig: CalculatorConfigV4 = {
  id: "credit-card-interest",
  version: "4.0",
  category: "finance",
  icon: "💳",

  // ─── PRESETS ───
  presets: [
    {
      id: "averageBalance",
      icon: "💳",
      values: {
        cardBalance: 6500,
        annualRate: 22.99,
        monthlyPayment: 200,
        minimumPaymentPercent: "2",
        includeBalanceTransfer: false,
        transferRate: null,
        transferFee: 3,
      },
    },
    {
      id: "highInterest",
      icon: "🔥",
      values: {
        cardBalance: 10000,
        annualRate: 27.49,
        monthlyPayment: 250,
        minimumPaymentPercent: "2",
        includeBalanceTransfer: false,
        transferRate: null,
        transferFee: 3,
      },
    },
    {
      id: "minimumTrap",
      icon: "📉",
      values: {
        cardBalance: 5000,
        annualRate: 19.99,
        monthlyPayment: null,
        minimumPaymentPercent: "2",
        includeBalanceTransfer: false,
        transferRate: null,
        transferFee: 3,
      },
    },
    {
      id: "almostDone",
      icon: "✨",
      values: {
        cardBalance: 1500,
        annualRate: 15.99,
        monthlyPayment: 100,
        minimumPaymentPercent: "2",
        includeBalanceTransfer: false,
        transferRate: null,
        transferFee: 3,
      },
    },
  ],

  // ─── TRANSLATIONS (EN only — script translates) ───
  t: {
    en: {
      name: "Credit Card Interest Calculator",
      slug: "credit-card-interest",
      subtitle:
        "See exactly how much interest you're paying, your true cost, and how faster payments or a balance transfer can save you thousands.",
      seo: {
        title: "Credit Card Interest Calculator - See Your True Cost",
        description:
          "Calculate your credit card interest cost daily, monthly, and yearly. See how extra payments save thousands and compare balance transfer savings. Free online tool.",
        shortDescription: "Calculate credit card interest and find your payoff date.",
        keywords: [
          "credit card interest calculator",
          "credit card payoff calculator",
          "credit card payment calculator",
          "how much interest on credit card",
          "credit card interest rate calculator",
          "credit card balance calculator",
          "pay off credit card",
          "credit card true cost",
        ],
      },

      inputs: {
        cardBalance: {
          label: "Credit Card Balance",
          helpText: "Your current outstanding balance — check your latest statement",
        },
        annualRate: {
          label: "Interest Rate (APR)",
          helpText: "Annual percentage rate — found on your statement under 'Interest Charge Calculation'",
        },
        monthlyPayment: {
          label: "Your Monthly Payment",
          helpText: "Amount you plan to pay each month — leave empty to see minimum payment scenario",
        },
        minimumPaymentPercent: {
          label: "Minimum Payment Calculation",
          helpText: "How your card calculates minimum payment — most cards use 2% of balance or $25 minimum",
          options: {
            "2": "2% of balance (most common)",
            "3": "3% of balance",
            "4": "4% of balance",
          },
        },
        includeBalanceTransfer: {
          label: "Compare Balance Transfer",
          helpText: "Toggle on to see how much you'd save transferring to a lower-rate card",
        },
        transferRate: {
          label: "Balance Transfer APR",
          helpText: "The APR on the new card after any intro period — enter 0 for 0% intro APR offers",
        },
        transferFee: {
          label: "Balance Transfer Fee",
          helpText: "One-time fee charged for the transfer — typically 3–5% of the balance",
        },
      },

      results: {
        payoffDate: { label: "PAYOFF DATE" },
        totalInterestPaid: { label: "Total Interest" },
        totalAmountPaid: { label: "Total Amount Paid" },
        trueCostMultiplier: { label: "True Cost Multiplier" },
        dailyInterestCost: { label: "Daily Interest" },
        monthlyInterestCost: { label: "Monthly Interest" },
        interestToPaymentRatio: { label: "Interest-to-Payment" },
        minimumPayoffTime: { label: "At Minimum Only" },
        interestSavedVsMin: { label: "Interest Saved vs Min" },
        balanceTransferSavings: { label: "Balance Transfer Savings" },
      },

      presets: {
        averageBalance: {
          label: "Average Balance",
          description: "$6,500 at 22.99%, $200/mo",
        },
        highInterest: {
          label: "High Interest",
          description: "$10,000 at 27.49%, $250/mo",
        },
        minimumTrap: {
          label: "Minimum Trap",
          description: "$5,000 at 19.99%, min only",
        },
        almostDone: {
          label: "Almost Done",
          description: "$1,500 at 15.99%, $100/mo",
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
          "Your {balance} balance at {rate}% APR costs {dailyInterest}/day in interest. With {payment}/mo payments, you'll be debt-free by {payoffDate}, paying {totalInterest} in total interest.",
      },

      infoCards: {
        interestBreakdown: {
          title: "Interest Breakdown",
          items: [
            { label: "Daily Interest Cost", valueKey: "dailyInterestCost" },
            { label: "Monthly Interest Cost", valueKey: "monthlyInterestCost" },
            { label: "Yearly Interest Cost", valueKey: "yearlyInterestCost" },
            { label: "True Cost Multiplier", valueKey: "trueCostMultiplier" },
          ],
        },
        paymentAnalysis: {
          title: "Payment Analysis",
          items: [
            { label: "Payoff Date", valueKey: "payoffDate" },
            { label: "Total Interest Paid", valueKey: "totalInterestPaid" },
            { label: "Interest-to-Payment Ratio", valueKey: "interestToPaymentRatio" },
            { label: "Interest Saved vs Minimum", valueKey: "interestSavedVsMin" },
            { label: "Time Saved vs Minimum", valueKey: "timeSavedVsMin" },
          ],
        },
        tips: {
          title: "Save on Interest",
          items: [
            "Pay your balance in full each month to avoid all interest charges — the grace period resets when you pay in full.",
            "Even $50 extra per month on a $5,000 balance at 22% APR saves over $2,000 in interest and pays off 3 years faster.",
            "Consider a 0% intro APR balance transfer card if you have good credit — you could save thousands during the intro period.",
            "Make payments early in your billing cycle. Since interest compounds daily, paying earlier reduces your average daily balance.",
          ],
        },
      },

      chart: {
        title: "Balance Over Time",
        xLabel: "Month",
        yLabel: "Amount",
        series: {
          balance: "Remaining Balance",
          cumulativeInterest: "Cumulative Interest",
        },
      },

      detailedTable: {
        paymentSchedule: {
          button: "View Payment Schedule",
          title: "Full Payment Schedule",
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
          title: "How Credit Card Interest Works",
          content:
            "Credit card interest is the cost you pay for carrying a balance from one billing cycle to the next. Unlike simple interest, credit card interest compounds daily — meaning you pay interest on interest every single day. Your card's APR (Annual Percentage Rate) is divided by 365 to get a daily periodic rate. Each day, that rate is applied to your current balance, and the resulting interest is added to what you owe. This daily compounding effect is why credit card debt grows so quickly and why even small balances can become expensive over time. The key insight is that if you pay your full statement balance by the due date every month, you pay zero interest — the grace period protects you. But the moment you carry any balance forward, interest starts accruing on everything immediately.",
        },
        howItWorks: {
          title: "How This Calculator Works",
          content:
            "Enter your current credit card balance, your card's APR, and the amount you plan to pay monthly. The calculator simulates your payoff journey using daily compounding interest, showing exactly how long it will take to reach zero and how much total interest you'll pay. It also calculates what would happen if you only made minimum payments — revealing the shocking true cost of the minimum payment trap. Unique metrics like the true cost multiplier show how much your original purchases actually cost after interest, while the daily interest cost makes the urgency real. If you toggle on the balance transfer comparison, it calculates whether transferring your balance to a lower-rate card would save you money after accounting for the transfer fee.",
        },
        considerations: {
          title: "Key Factors Affecting Credit Card Interest",
          items: [
            { text: "Daily Compounding: Interest is calculated daily and added to your balance. A $5,000 balance at 22% APR grows by $3.01 every single day.", type: "warning" },
            { text: "Grace Period: If you pay your full statement balance by the due date, you pay zero interest on purchases. Carrying any balance eliminates this protection.", type: "info" },
            { text: "Minimum Payment Trap: Paying 2% minimum on $10,000 at 22% APR takes 27+ years and costs over $16,000 in interest — more than the original debt.", type: "warning" },
            { text: "APR vs Daily Rate: Your APR divided by 365 gives your daily rate. At 22% APR, that's 0.0603% per day — small-sounding but devastating over time.", type: "info" },
            { text: "Multiple APRs: Many cards charge different rates for purchases, balance transfers, and cash advances. Cash advances (25–30%+) have no grace period.", type: "warning" },
            { text: "Variable Rates: Most credit cards have variable APRs tied to the prime rate. When the Fed raises rates, your credit card rate rises automatically.", type: "info" },
          ],
        },
        categories: {
          title: "Credit Card Interest Rate Ranges",
          items: [
            { text: "Excellent Credit (750+): 14–19% APR. The lowest standard rates available, but still expensive compared to other loan types.", type: "info" },
            { text: "Good Credit (700–749): 18–24% APR. The most common range for rewards cards. Even 'good' rates are high in absolute terms.", type: "info" },
            { text: "Fair Credit (650–699): 22–27% APR. Higher rates mean interest compounds faster — prioritize paying these balances aggressively.", type: "warning" },
            { text: "Poor Credit (below 650): 25–30%+ APR. At these rates, a $5,000 balance costs $4+ per day. Consider debt counseling if struggling.", type: "warning" },
            { text: "Store Cards: Typically 25–30% APR. Among the highest rates available — avoid carrying balances on store-branded cards.", type: "warning" },
            { text: "Balance Transfer Cards: 0% intro APR for 12–21 months. Powerful tool for paying down debt, but watch the fee (3–5%) and post-intro rate.", type: "info" },
          ],
        },
        examples: {
          title: "Credit Card Interest Examples",
          description: "Step-by-step examples showing how interest accumulates and the impact of different payment strategies",
          examples: [
            {
              title: "$5,000 Balance — Minimum vs Fixed Payment",
              steps: [
                "Balance: $5,000 at 22.99% APR",
                "Daily rate: 22.99% ÷ 365 = 0.0630% per day",
                "Day 1 interest: $5,000 × 0.000630 = $3.15",
                "First month interest: ~$95.79 (compounds daily)",
                "Minimum payment (2%): $100 → only $4.21 goes to principal!",
                "At minimum only: 32 years, $9,447 in interest",
                "At $200/month fixed: 32 months, $1,357 in interest",
                "Difference: save $8,090 and 29+ years!",
              ],
              result:
                "Paying $200/mo instead of minimum saves $8,090 in interest and 29 years of payments",
            },
            {
              title: "$10,000 Balance — Balance Transfer Comparison",
              steps: [
                "Current card: $10,000 at 24.99% APR, $300/mo",
                "Monthly interest (first month): ~$208",
                "Only $92 of $300 goes to principal",
                "Payoff at current rate: 50 months, $4,840 interest",
                "Balance transfer: 0% intro for 18 months, 3% fee",
                "Transfer fee: $10,000 × 3% = $300",
                "$300/mo for 18 months = $5,400 (pays off $5,100 net)",
                "Remaining $4,900 at new rate after intro period",
              ],
              result:
                "Balance transfer saves ~$3,200 in interest if you can pay off most during the 0% intro period",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How is credit card interest calculated?",
          answer:
            "Credit card interest is calculated using daily compounding. Your APR is divided by 365 to get a daily periodic rate. Each day, that rate is multiplied by your current balance to determine that day's interest charge. This interest is added to your balance, so the next day you're paying interest on a slightly higher amount. At 22% APR, a $5,000 balance accrues about $3.01 per day in interest.",
        },
        {
          question: "What is the true cost of minimum payments?",
          answer:
            "Minimum payments are designed to keep you in debt as long as possible. On a $5,000 balance at 22% APR, paying only the 2% minimum would take over 30 years and cost more than $9,000 in interest — nearly double the original balance. The minimum payment starts at $100 but shrinks as your balance decreases, meaning less and less goes to principal over time.",
        },
        {
          question: "How can I avoid paying credit card interest?",
          answer:
            "Pay your full statement balance by the due date every month. This activates your grace period, which means no interest is charged on new purchases. If you already have a balance, you won't have a grace period until you pay it off completely. Consider setting up autopay for the full balance to ensure you never miss a payment and always avoid interest.",
        },
        {
          question: "What is a good credit card interest rate?",
          answer:
            "Credit card rates are generally high compared to other loans. As of 2025–2026, rates range from about 14% for excellent credit to 30%+ for poor credit. A 'good' rate is below 18%, but even that is expensive for long-term borrowing. If you carry a balance regularly, a low-interest card (13–16% APR) or a 0% balance transfer card is worth considering.",
        },
        {
          question: "Is a balance transfer worth it?",
          answer:
            "A balance transfer to a 0% intro APR card is worth it if: the interest savings exceed the transfer fee (typically 3–5% of the balance), you can pay off a significant portion during the intro period, and you won't rack up new debt. For example, transferring $8,000 with a 3% fee ($240) from a 24% APR card saves about $160/month in interest during the 0% period.",
        },
        {
          question: "Why does my balance grow even though I'm making payments?",
          answer:
            "If your monthly payment is close to or less than the interest charged, very little goes toward reducing your actual balance. At 24% APR on a $10,000 balance, about $200/month goes to interest alone. If your payment is $210, only $10 reduces your balance — meaning it would take 83+ years to pay off. You need to pay significantly more than the interest portion to make real progress.",
        },
        {
          question: "What is the difference between APR and daily rate?",
          answer:
            "APR (Annual Percentage Rate) is the yearly interest rate on your card. The daily periodic rate is your APR divided by 365. For example, 22% APR becomes 0.0603% per day. While 0.06% sounds tiny, it compounds every day — meaning you pay interest on yesterday's interest. Over a year, this daily compounding makes the effective rate slightly higher than the stated APR.",
        },
        {
          question: "Does paying more than the minimum help that much?",
          answer:
            "Dramatically. On a $5,000 balance at 22% APR: minimum payments take 30+ years and cost $9,000+ in interest. Paying $150/month fixed takes 44 months and costs $1,538. Paying $300/month takes 19 months and costs $667. Every extra dollar above the minimum goes directly to principal, creating a snowball effect that accelerates your payoff.",
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
    // Credit Card Balance
    {
      id: "cardBalance",
      type: "number",
      defaultValue: null,
      placeholder: "5000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    // APR — slider
    {
      id: "annualRate",
      type: "slider",
      defaultValue: 22.99,
      min: 0,
      max: 35,
      step: 0.01,
      suffix: "%",
    },
    // Monthly Payment
    {
      id: "monthlyPayment",
      type: "number",
      defaultValue: null,
      placeholder: "200",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    // Minimum Payment %
    {
      id: "minimumPaymentPercent",
      type: "select",
      defaultValue: "2",
      options: [
        { value: "2" },
        { value: "3" },
        { value: "4" },
      ],
    },
    // Balance Transfer toggle
    {
      id: "includeBalanceTransfer",
      type: "toggle",
      defaultValue: false,
    },
    // Transfer APR
    {
      id: "transferRate",
      type: "number",
      defaultValue: null,
      placeholder: "0",
      min: 0,
      max: 30,
      step: 0.01,
      suffix: "%",
      showWhen: { field: "includeBalanceTransfer", value: true },
    },
    // Transfer Fee %
    {
      id: "transferFee",
      type: "number",
      defaultValue: 3,
      min: 0,
      max: 10,
      step: 0.1,
      suffix: "%",
      showWhen: { field: "includeBalanceTransfer", value: true },
    },
  ],

  inputGroups: [],

  // ─── RESULTS ───
  results: [
    { id: "payoffDate", type: "primary", format: "text" },
    { id: "totalInterestPaid", type: "secondary", format: "text" },
    { id: "totalAmountPaid", type: "secondary", format: "text" },
    { id: "trueCostMultiplier", type: "secondary", format: "text" },
    { id: "dailyInterestCost", type: "secondary", format: "text" },
    { id: "monthlyInterestCost", type: "secondary", format: "text" },
    { id: "interestToPaymentRatio", type: "secondary", format: "text" },
    { id: "minimumPayoffTime", type: "secondary", format: "text" },
    { id: "interestSavedVsMin", type: "secondary", format: "text" },
    { id: "balanceTransferSavings", type: "secondary", format: "text" },
  ],

  // ─── INFO CARDS ───
  infoCards: [
    { id: "interestBreakdown", type: "list", icon: "💰", itemCount: 4 },
    { id: "paymentAnalysis", type: "list", icon: "📊", itemCount: 5 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ─── CHART ───
  chart: {
    id: "balanceOverTime",
    type: "composed",
    xKey: "month",
    stacked: false,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "balance", type: "area", color: "#ef4444" },
      { key: "cumulativeInterest", type: "area", color: "#f97316" },
    ],
  },

  // ─── DETAILED TABLE ───
  detailedTable: {
    id: "paymentSchedule",
    buttonLabel: "View Payment Schedule",
    buttonIcon: "📅",
    modalTitle: "Full Payment Schedule",
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
      title: "Credit Card Interest and Charges",
      source: "CFPB",
      url: "https://www.consumerfinance.gov/ask-cfpb/how-is-interest-calculated-on-my-credit-card-en-51/",
    },
    {
      authors: "Federal Reserve",
      year: "2025",
      title: "Consumer Credit - G.19 Report",
      source: "Federal Reserve Statistical Release",
      url: "https://www.federalreserve.gov/releases/g19/current/",
    },
    {
      authors: "NerdWallet",
      year: "2025",
      title: "How Credit Card Interest Is Calculated",
      source: "NerdWallet",
      url: "https://www.nerdwallet.com/article/credit-cards/how-is-credit-card-interest-calculated",
    },
  ],

  hero: {},
};

// ═══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════

function simulatePayoff(
  balance: number,
  aprPercent: number,
  fixedPayment: number | null,
  minPaymentPercent: number,
  maxMonths = 600
) {
  const dailyRate = aprPercent / 100 / 365;
  const minFloor = 25; // Minimum dollar floor
  let bal = balance;
  let totalInterest = 0;
  let totalPaid = 0;
  let month = 0;

  const snapshots: Array<{ month: number; balance: number; cumulativeInterest: number }> = [];
  const schedule: Array<Record<string, string>> = [];

  snapshots.push({ month: 0, balance: bal, cumulativeInterest: 0 });

  while (bal > 0.01 && month < maxMonths) {
    month++;

    // Calculate monthly interest via daily compounding (30 days avg)
    let monthInterest = 0;
    let tempBal = bal;
    for (let d = 0; d < 30; d++) {
      const dayInt = tempBal * dailyRate;
      tempBal += dayInt;
      monthInterest += dayInt;
    }

    // Determine payment
    const minPayment = Math.max(bal * (minPaymentPercent / 100), minFloor);
    let payment: number;
    if (fixedPayment !== null && fixedPayment > 0) {
      payment = Math.max(fixedPayment, minFloor);
    } else {
      payment = minPayment; // Minimum only
    }

    // Don't overpay
    payment = Math.min(payment, bal + monthInterest);

    const principalPaid = payment - monthInterest;
    bal = bal + monthInterest - payment;
    if (bal < 0.01) bal = 0;

    totalInterest += monthInterest;
    totalPaid += payment;

    // Snapshots
    if (month <= 24 || month % 3 === 0 || bal <= 0.01) {
      snapshots.push({
        month,
        balance: Math.max(0, Math.round(bal)),
        cumulativeInterest: Math.round(totalInterest),
      });
    }

    // Table rows
    if (month <= 12 || month % 6 === 0 || bal <= 0.01) {
      schedule.push({
        month: `${month}`,
        payment: `${Math.round(payment * 100) / 100}`,
        principal: `${Math.round(Math.max(principalPaid, 0) * 100) / 100}`,
        interest: `${Math.round(monthInterest * 100) / 100}`,
        balance: `${Math.round(Math.max(bal, 0) * 100) / 100}`,
      });
    }
  }

  return { totalInterest, totalPaid, totalMonths: month, snapshots, schedule };
}

export function calculateCreditCardInterest(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const f = (t?.formats as Record<string, string>) || {};

  // ─── Parse inputs ───
  const cardBalance = values.cardBalance as number | null;
  const annualRate = (values.annualRate as number) ?? 22.99;
  const monthlyPayment = (values.monthlyPayment as number | null) || null;
  const minPaymentPercent = Number(values.minimumPaymentPercent) || 2;
  const includeTransfer = values.includeBalanceTransfer as boolean;
  const transferRate = includeTransfer ? ((values.transferRate as number | null) ?? 0) : 0;
  const transferFeePercent = includeTransfer ? ((values.transferFee as number) ?? 3) : 0;

  // ─── Validate ───
  if (!cardBalance || cardBalance <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ─── Currency symbol ───
  const curr = fieldUnits?.cardBalance || "USD";
  const sym = CURRENCY_SYMBOLS[curr] || "$";

  // ─── Current interest metrics ───
  const dailyInterest = cardBalance * (annualRate / 100) / 365;
  const monthlyInterest = cardBalance * (annualRate / 100) / 12;
  const yearlyInterest = cardBalance * (annualRate / 100);

  // ─── Simulate: Custom Payment ───
  const customResult = simulatePayoff(cardBalance, annualRate, monthlyPayment, minPaymentPercent);

  // ─── Simulate: Minimum Only ───
  const minResult = simulatePayoff(cardBalance, annualRate, null, minPaymentPercent);

  // ─── Interest-to-payment ratio (first month) ───
  const firstMonthPayment = monthlyPayment || Math.max(cardBalance * (minPaymentPercent / 100), 25);
  const interestToPaymentRatio = (monthlyInterest / firstMonthPayment) * 100;

  // ─── True cost multiplier ───
  const trueCostMultiplier = customResult.totalPaid / cardBalance;

  // ─── Savings vs minimum ───
  const interestSavedVsMin = minResult.totalInterest - customResult.totalInterest;
  const timeSavedMonths = minResult.totalMonths - customResult.totalMonths;
  const timeSavedYears = Math.floor(Math.abs(timeSavedMonths) / 12);
  const timeSavedRemMonths = Math.abs(timeSavedMonths) % 12;

  // ─── Minimum payoff time string ───
  const minYears = Math.floor(minResult.totalMonths / 12);
  const minRemMonths = minResult.totalMonths % 12;
  let minPayoffStr = "";
  if (minYears > 0 && minRemMonths > 0) {
    minPayoffStr = `${minYears} yr ${minRemMonths} mo`;
  } else if (minYears > 0) {
    minPayoffStr = `${minYears} ${minYears === 1 ? "year" : "years"}`;
  } else {
    minPayoffStr = `${minRemMonths} ${minRemMonths === 1 ? "month" : "months"}`;
  }

  // ─── Time saved string ───
  let timeSavedStr = "—";
  if (timeSavedMonths > 0) {
    if (timeSavedYears > 0 && timeSavedRemMonths > 0) {
      timeSavedStr = `${timeSavedYears} yr ${timeSavedRemMonths} mo faster`;
    } else if (timeSavedYears > 0) {
      timeSavedStr = `${timeSavedYears} ${timeSavedYears === 1 ? "year" : "years"} faster`;
    } else {
      timeSavedStr = `${timeSavedRemMonths} mo faster`;
    }
  }

  // ─── Payoff date ───
  const now = new Date();
  const payoffDate = new Date(now.getFullYear(), now.getMonth() + customResult.totalMonths, 1);
  const payoffDateStr = payoffDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  // ─── Balance transfer comparison ───
  let transferSavingsStr = "—";
  let transferSavingsVal = 0;
  if (includeTransfer) {
    const transferFeeAmount = cardBalance * (transferFeePercent / 100);
    const transferResult = simulatePayoff(
      cardBalance + transferFeeAmount,
      transferRate,
      monthlyPayment,
      minPaymentPercent
    );
    transferSavingsVal = customResult.totalInterest - transferResult.totalInterest - transferFeeAmount;
    if (transferSavingsVal > 0) {
      transferSavingsStr = `${sym}${fmtNum(transferSavingsVal)} saved`;
    } else {
      transferSavingsStr = `Not worth it (${sym}${fmtNum(Math.abs(transferSavingsVal))} more)`;
    }
  }

  // ─── Build summary ───
  const paymentStr = monthlyPayment ? `${sym}${fmtNum(monthlyPayment)}` : `${sym}${fmtNum(Math.max(cardBalance * (minPaymentPercent / 100), 25))} (min)`;
  let summary =
    f.summary
      ?.replace("{balance}", `${sym}${fmtNum(cardBalance, 0)}`)
      .replace("{rate}", `${annualRate}`)
      .replace("{dailyInterest}", `${sym}${fmtNum(dailyInterest)}`)
      .replace("{payment}", paymentStr)
      .replace("{payoffDate}", payoffDateStr)
      .replace("{totalInterest}", `${sym}${fmtNum(customResult.totalInterest)}`) ||
    `Your ${sym}${fmtNum(cardBalance, 0)} balance at ${annualRate}% costs ${sym}${fmtNum(dailyInterest)}/day. Payoff by ${payoffDateStr}, total interest: ${sym}${fmtNum(customResult.totalInterest)}.`;

  if (interestSavedVsMin > 100 && monthlyPayment) {
    summary += ` You save ${sym}${fmtNum(interestSavedVsMin)} vs minimum payments.`;
  }

  // ─── Chart data ───
  const chartData = customResult.snapshots.map((s) => ({
    month: `${s.month}`,
    balance: s.balance,
    cumulativeInterest: s.cumulativeInterest,
  }));

  // ─── Table data ───
  const tableData = customResult.schedule.map((row) => ({
    month: row.month,
    payment: `${sym}${fmtNum(Number(row.payment))}`,
    principal: `${sym}${fmtNum(Number(row.principal))}`,
    interest: `${sym}${fmtNum(Number(row.interest))}`,
    balance: `${sym}${fmtNum(Number(row.balance))}`,
  }));

  return {
    values: {
      payoffDate: customResult.totalMonths,
      totalInterestPaid: customResult.totalInterest,
      totalAmountPaid: customResult.totalPaid,
      trueCostMultiplier,
      dailyInterestCost: dailyInterest,
      monthlyInterestCost: monthlyInterest,
      yearlyInterestCost: yearlyInterest,
      interestToPaymentRatio,
      minimumPayoffTime: minResult.totalMonths,
      interestSavedVsMin,
      timeSavedVsMin: timeSavedMonths,
      balanceTransferSavings: transferSavingsVal,
    },
    formatted: {
      payoffDate: payoffDateStr,
      totalInterestPaid: `${sym}${fmtNum(customResult.totalInterest)}`,
      totalAmountPaid: `${sym}${fmtNum(customResult.totalPaid)}`,
      trueCostMultiplier: `${fmtNum(trueCostMultiplier, 2)}× your balance`,
      dailyInterestCost: `${sym}${fmtNum(dailyInterest)}/day`,
      monthlyInterestCost: `${sym}${fmtNum(monthlyInterest)}/month`,
      yearlyInterestCost: `${sym}${fmtNum(yearlyInterest)}/year`,
      interestToPaymentRatio: `${fmtNum(interestToPaymentRatio, 0)}% goes to interest`,
      minimumPayoffTime: `${minPayoffStr}, ${sym}${fmtNum(minResult.totalInterest)} interest`,
      interestSavedVsMin: interestSavedVsMin > 0 ? `${sym}${fmtNum(interestSavedVsMin)} saved` : "—",
      timeSavedVsMin: timeSavedStr,
      balanceTransferSavings: transferSavingsStr,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}
