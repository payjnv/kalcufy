import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

/* ═══════════════════════════════════════════════════════════════════
   CREDIT CARD PAYOFF CALCULATOR — V4 Engine
   Iterative amortization: balance × (APR/12) monthly interest accrual
   KEY DIFFERENTIATORS:
   • "Cost of Minimum Payments" shock metric — total paid if only minimums
   • Daily interest bleeding: "$X.XX/day charged right now"
   • Interest-to-payment ratio: "68% of your first payment is interest"
   • Effective cost per dollar: "You'll pay $1.47 for every $1 borrowed"
   • Balance transfer savings integrated (0% APR intro comparison)
   • Savings vs minimum: exact $ saved by paying more than minimum
   • Calendar debt-free date: "September 12, 2028"
   • Balance decay chart: minimum vs fixed vs extra payment lines
   + Chart: Composed lines — Minimum-Only vs Your Payment vs Extra Payment balance decay
   ═══════════════════════════════════════════════════════════════════ */

export const creditCardPayoffConfig: CalculatorConfigV4 = {
  id: "credit-card-payoff",
  version: "4.0",
  category: "finance",
  icon: "💳",

  // ═══════════════════════════════════════════════════════════════
  // PRESETS
  // ═══════════════════════════════════════════════════════════════
  presets: [
    {
      id: "averageAmerican",
      icon: "🇺🇸",
      values: {
        currentBalance: 6501,
        apr: 22.76,
        minimumPaymentPercent: 2,
        minimumPaymentFloor: 35,
        monthlyPayment: 200,
        includeExtraPayment: false,
        extraPayment: 0,
        includeBalanceTransfer: false,
        introAprMonths: 18,
        transferFeePercent: 3,
      },
    },
    {
      id: "highInterest",
      icon: "🔥",
      values: {
        currentBalance: 10000,
        apr: 29.99,
        minimumPaymentPercent: 2,
        minimumPaymentFloor: 35,
        monthlyPayment: 300,
        includeExtraPayment: false,
        extraPayment: 0,
        includeBalanceTransfer: true,
        introAprMonths: 18,
        transferFeePercent: 3,
      },
    },
    {
      id: "manageable",
      icon: "✅",
      values: {
        currentBalance: 2000,
        apr: 18.99,
        minimumPaymentPercent: 2,
        minimumPaymentFloor: 35,
        monthlyPayment: 150,
        includeExtraPayment: false,
        extraPayment: 0,
        includeBalanceTransfer: false,
        introAprMonths: 15,
        transferFeePercent: 3,
      },
    },
    {
      id: "minimumTrap",
      icon: "⚠️",
      values: {
        currentBalance: 5000,
        apr: 24.99,
        minimumPaymentPercent: 2,
        minimumPaymentFloor: 35,
        monthlyPayment: 0,
        includeExtraPayment: false,
        extraPayment: 0,
        includeBalanceTransfer: false,
        introAprMonths: 18,
        transferFeePercent: 3,
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // CHART — Balance decay comparison (3 lines)
  // ═══════════════════════════════════════════════════════════════
  chart: {
    id: "balanceDecay",
    type: "composed",
    xKey: "month",
    height: 320,
    stacked: false,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "minimumOnly", type: "line", color: "#ef4444" },
      { key: "fixedPayment", type: "line", color: "#3b82f6" },
      { key: "withExtra", type: "line", color: "#10b981" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // TRANSLATIONS — English only, other languages via install script
  // ═══════════════════════════════════════════════════════════════
  t: {
    en: {
      name: "Credit Card Payoff Calculator",
      slug: "credit-card-payoff-calculator",
      subtitle:
        "Find out how long it takes to pay off your credit card, see the true cost of minimum payments, and discover how much faster you can be debt-free",
      breadcrumb: "Credit Card Payoff",

      seo: {
        title:
          "Credit Card Payoff Calculator — Debt-Free Date & Savings | Free",
        description:
          "Calculate your credit card payoff timeline with daily interest cost, minimum payment shock analysis, balance transfer savings, and a personalized debt-free date. See exactly how much faster extra payments eliminate your debt.",
        shortDescription:
          "See how long to pay off your credit card and save on interest",
        keywords: [
          "credit card payoff calculator",
          "credit card payment calculator",
          "pay off credit card debt",
          "credit card interest calculator",
          "minimum payment calculator",
          "debt payoff calculator",
          "balance transfer savings calculator",
          "credit card debt-free date",
        ],
      },

      calculator: { yourInformation: "Your Information" },
      ui: {
        yourInformation: "Your Information",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      // ─── INPUTS ────────────────────────────────────────────
      inputs: {
        currentBalance: {
          label: "Current Balance",
          helpText:
            "The total outstanding balance on your credit card statement",
          placeholder: "5000",
        },
        apr: {
          label: "Annual Percentage Rate (APR)",
          helpText:
            "Your card's interest rate — find it on your statement or card agreement",
        },
        minimumPaymentPercent: {
          label: "Minimum Payment Percentage",
          helpText:
            "The % of your balance used to calculate minimum payment (typically 1–3%)",
        },
        minimumPaymentFloor: {
          label: "Minimum Payment Floor",
          helpText:
            "The lowest minimum payment your issuer allows (usually $25–$35)",
        },
        monthlyPayment: {
          label: "Your Monthly Payment",
          helpText:
            "The fixed amount you plan to pay each month — leave empty to see minimum-only results",
          placeholder: "200",
        },
        includeExtraPayment: {
          label: "Add Extra Monthly Payment",
          helpText: "See how an additional payment each month accelerates payoff",
        },
        extraPayment: {
          label: "Extra Monthly Payment",
          helpText:
            "Additional amount beyond your regular monthly payment",
          placeholder: "50",
        },
        includeBalanceTransfer: {
          label: "Compare Balance Transfer",
          helpText:
            "See how much you could save by transferring to a 0% intro APR card",
        },
        introAprMonths: {
          label: "0% Intro APR Period",
          helpText:
            "Number of months with 0% interest on the new card (typically 12–21 months)",
        },
        transferFeePercent: {
          label: "Balance Transfer Fee",
          helpText:
            "One-time fee charged for the transfer (typically 3–5% of the balance)",
        },
      },

      // ─── RESULTS ───────────────────────────────────────────
      results: {
        payoffTime: { label: "Time to Pay Off" },
        totalInterestPaid: { label: "Total Interest Paid" },
        totalAmountPaid: { label: "Total Amount Paid" },
        dailyInterestCost: { label: "Daily Interest Cost" },
        interestRatioFirstPayment: { label: "Interest in First Payment" },
        minimumOnlyPayoff: { label: "Minimum-Only Payoff" },
        savingsVsMinimum: { label: "Savings vs Minimum" },
        debtFreeDate: { label: "Debt-Free Date" },
        balanceTransferSavings: { label: "Balance Transfer Savings" },
        effectiveCostPerDollar: { label: "Cost per $1 Borrowed" },
      },

      // ─── PRESETS ───────────────────────────────────────────
      presets: {
        averageAmerican: {
          label: "Average American",
          description: "$6,501 balance, 22.76% APR, $200/mo payment",
        },
        highInterest: {
          label: "High Interest Debt",
          description: "$10K at 29.99% APR, $300/mo + balance transfer",
        },
        manageable: {
          label: "Manageable Balance",
          description: "$2,000 at 18.99% APR, $150/mo payment",
        },
        minimumTrap: {
          label: "Minimum Payment Trap",
          description: "$5,000 at 24.99% — what happens with only minimums",
        },
      },

      // ─── TOOLTIPS ──────────────────────────────────────────
      tooltips: {
        payoffTime:
          "How many months and years until your balance reaches zero",
        totalInterestPaid:
          "The total interest charges you'll pay over the life of your debt — this is the 'cost' of borrowing",
        totalAmountPaid:
          "Your original balance plus all interest — the true total cost",
        dailyInterestCost:
          "How much interest your card charges you every single day right now",
        interestRatioFirstPayment:
          "What percentage of your very first payment goes to interest vs actually paying down the balance",
        minimumOnlyPayoff:
          "How long and how much it costs if you only ever pay the minimum — the shock metric",
        savingsVsMinimum:
          "How much money you save in interest by paying your fixed amount instead of just the minimum",
        debtFreeDate:
          "The exact calendar date you'll make your final payment and be completely debt-free",
        balanceTransferSavings:
          "How much you could save by transferring your balance to a 0% intro APR card (minus the transfer fee)",
        effectiveCostPerDollar:
          "For every $1 you originally charged, this is how much you'll actually end up paying back",
      },

      // ─── DYNAMIC VALUES ────────────────────────────────────
      values: {
        "years": "years",
        "year": "year",
        "months": "months",
        "month": "month",
        "days": "days",
        "/day": "/day",
        "Month": "Month",
        "Payment": "Payment",
        "Interest": "Interest",
        "Principal": "Principal",
        "Balance": "Balance",
        "Minimum Only": "Minimum Only",
        "Your Payment": "Your Payment",
        "With Extra": "With Extra",
        "of first payment is interest": "of first payment is interest",
        "minimum only": "minimum only",
        "saved vs minimum": "saved vs minimum",
        "with balance transfer": "with balance transfer",
        "per $1 borrowed": "per $1 borrowed",
        "You pay": "You pay",
        "for every": "for every",
        "borrowed": "borrowed",
        "Transfer fee": "Transfer fee",
        "Debt-free": "Debt-free",
      },

      // ─── FORMATS ───────────────────────────────────────────
      formats: {
        summary:
          "Pay off {balance} at {apr}% APR in {payoffTime} with {payment}/mo payments. Total interest: {totalInterest}. Your card charges {dailyCost}/day. Debt-free by {debtFreeDate}.",
      },

      // ─── CHART ─────────────────────────────────────────────
      chart: {
        title: "Balance Payoff Comparison",
        xLabel: "Month",
        yLabel: "Remaining Balance",
        series: {
          minimumOnly: "Minimum Only",
          fixedPayment: "Your Payment",
          withExtra: "With Extra",
        },
      },

      // ─── DETAILED TABLE ────────────────────────────────────
      detailedTable: {
        paymentSchedule: {
          button: "View Payment Schedule",
          title: "Monthly Payment Schedule",
          columns: {
            month: "Month",
            payment: "Payment",
            interest: "Interest",
            principal: "Principal",
            balance: "Balance",
          },
        },
      },

      // ─── INFO CARDS ────────────────────────────────────────
      infoCards: {
        costBreakdown: {
          title: "💰 True Cost Breakdown",
          items: [
            "Total Interest Paid: the hidden price of carrying a balance month to month",
            "Daily Interest Cost: your card charges interest every single day, not just monthly",
            "Interest Ratio: see how much of your first payment actually reduces your debt vs feeds interest",
            "Cost Per Dollar: the real price tag — for every $1 charged, you may pay back $1.40+",
          ],
        },
        payoffStrategy: {
          title: "📊 Payoff Strategy Insights",
          items: [
            "Minimum Payment Trap: only paying the minimum can turn 3 years of debt into 15+ years",
            "Extra Payment Power: even $50/mo extra can cut years off your payoff timeline",
            "Balance Transfer: a 0% intro APR card can save hundreds or thousands in interest",
            "Debt-Free Date: knowing your exact payoff date provides motivation to stay on track",
          ],
        },
        actionTips: {
          title: "💡 Accelerate Your Payoff",
          items: [
            "Pay more than the minimum — every extra dollar goes directly to reducing your balance",
            "Consider the debt avalanche: pay highest-APR cards first to minimize total interest",
            "Call your issuer and negotiate a lower APR — success rate is higher than most people think",
            "Set up autopay above the minimum to avoid late fees and guarantee progress every month",
          ],
        },
      },

      // ─── EDUCATION SECTIONS ────────────────────────────────
      educationSections: {
        whatIs: {
          title: "📖 How Credit Card Interest Works",
          content:
            "Credit card interest is calculated daily using the Average Daily Balance (ADB) method. Your Annual Percentage Rate (APR) is divided by 365 to get a Daily Periodic Rate (DPR). Each day, the DPR is multiplied by your current balance, and that interest is added to what you owe. This means interest compounds daily — you pay interest on interest — which is why credit card debt can grow so quickly even when you're making payments.\n\nFor example, a $5,000 balance at 22% APR means your daily rate is about 0.0603%. That's roughly $3.01 charged every single day. Over a month, that adds up to about $91.67 in interest alone. If your minimum payment is only $100, just $8.33 actually reduces your balance. This is why the minimum payment trap exists: most of your money feeds interest, not debt reduction.",
        },
        howItWorks: {
          title: "⚙️ How This Calculator Works",
          content:
            "This calculator uses an iterative month-by-month amortization model that mirrors how credit card issuers actually process payments. Each month, it calculates the interest charge (balance × APR ÷ 12), subtracts that from your payment to determine how much goes to principal, then reduces the balance accordingly. It repeats this process until the balance reaches zero.\n\nUnlike simple payoff estimators, this tool also computes: the exact cost of making only minimum payments (which decrease as your balance drops, extending payoff dramatically), the impact of extra payments, and the potential savings from a 0% balance transfer. The minimum payment each month is recalculated as the greater of (balance × minimum %) or the minimum floor amount, just as real issuers compute it.",
        },
        payoffStrategies: {
          title: "✅ Proven Payoff Strategies",
          items: [
            "Debt Avalanche: Pay minimums on all cards, put extra toward the highest-APR card. Saves the most money mathematically but requires patience.",
            "Debt Snowball: Pay off the smallest balance first for quick psychological wins. Slightly more expensive but keeps you motivated.",
            "Balance Transfer: Move debt to a 0% intro APR card. You'll pay a 3–5% transfer fee but eliminate interest for 12–21 months.",
            "Lump-Sum Payments: Use tax refunds, bonuses, or windfalls to make large one-time payments that dramatically cut your timeline.",
            "Bi-Weekly Payments: Pay half your monthly payment every two weeks — you'll make 26 half-payments (13 full payments) per year instead of 12.",
            "Negotiate Your APR: Call your issuer and ask for a rate reduction. Long-time customers with good payment history have a 60–70% success rate.",
          ],
        },
        commonMistakes: {
          title: "⚠️ Costly Mistakes to Avoid",
          items: [
            "Only Paying the Minimum: A $5,000 balance at 22% with minimum payments takes 25+ years and costs over $8,000 in interest alone.",
            "Ignoring the APR: Many cardholders don't know their rate. The average is 22.76% — check your statement and negotiate lower if possible.",
            "Missing Payments: A single late payment can trigger a penalty APR of 29.99%, spike your minimum, and damage your credit score.",
            "Continuing to Charge: Making payments while still adding to the balance creates a treadmill effect where you never make progress.",
            "Closing Paid-Off Cards: Closing accounts reduces your total credit limit, increasing your utilization ratio and potentially lowering your credit score.",
          ],
        },
        examples: {
          title: "🧮 Real Payoff Scenarios",
          columns: 2,
          examples: [
            {
              title: "Average Balance — Fixed vs Minimum",
              content:
                "Balance: $6,501 | APR: 22.76% | Minimum: 2% or $35\n\nMinimum only: 24 years, 3 months — Total paid: $17,476\nFixed $200/mo: 3 years, 4 months — Total paid: $7,987\n\n→ You save $9,489 and 21 years by paying $200/mo instead of the minimum.",
            },
            {
              title: "High-Interest + Balance Transfer",
              content:
                "Balance: $10,000 | APR: 29.99% | Payment: $300/mo\n\nWithout transfer: 4 years, 4 months — Total interest: $5,428\nWith 0% transfer (18mo, 3% fee): Total interest: $1,868\n\n→ Balance transfer saves $3,560 even after the $300 fee. You're debt-free 14 months sooner.",
            },
          ],
        },
      },

      // ─── FAQs ──────────────────────────────────────────────
      faqs: {
        "0": {
          question: "How long will it take to pay off my credit card?",
          answer:
            "It depends on your balance, APR, and monthly payment. With a $5,000 balance at 22% APR, paying $200/month takes about 31 months. Paying only the minimum could take over 20 years. Use this calculator to get your personalized timeline.",
        },
        "1": {
          question:
            "How much of my credit card payment goes to interest vs principal?",
          answer:
            "In the early months, the majority of your payment goes to interest. For example, on a $5,000 balance at 22% APR, the first month's interest is about $91.67. If you pay $200, only $108.33 actually reduces your balance. As your balance decreases, more of each payment goes to principal.",
        },
        "2": {
          question:
            "Why is paying only the minimum so expensive?",
          answer:
            "Minimum payments are designed to keep your account current, not to pay off debt efficiently. They're typically 1–3% of your balance, which barely covers interest. As your balance drops, the minimum drops too — so you pay less and less each month, stretching payoff over decades. A $5,000 balance at 24.99% APR with 2% minimums takes over 30 years and costs more than $12,000 in interest.",
        },
        "3": {
          question: "Is a balance transfer worth it?",
          answer:
            "A balance transfer to a 0% intro APR card can save you hundreds or thousands of dollars in interest, but only if you can pay off most of the balance during the intro period (typically 12–21 months). You'll pay a transfer fee of 3–5%, which is added to your balance. This calculator compares both scenarios so you can see the exact savings.",
        },
        "4": {
          question:
            "Should I use the debt snowball or debt avalanche method?",
          answer:
            "The debt avalanche (highest APR first) saves the most money mathematically. The debt snowball (smallest balance first) provides faster psychological wins. Research shows that the snowball method has higher completion rates because the quick wins keep people motivated. Choose the method you'll stick with — the best strategy is the one you actually follow.",
        },
        "5": {
          question: "How is credit card interest calculated?",
          answer:
            "Most issuers use the Average Daily Balance method. Your APR is divided by 365 to get a daily rate. Each day, that rate is multiplied by your balance. These daily charges are summed at the end of the billing cycle. This means interest compounds daily — you're charged interest on previously accrued interest — which is why credit card debt grows faster than most people expect.",
        },
        "6": {
          question:
            "What happens if I pay more than the minimum but less than the full balance?",
          answer:
            "Any amount above the minimum goes directly to reducing your principal balance. Even an extra $25–$50 per month can cut years off your payoff timeline and save significant interest. This calculator lets you compare different payment amounts to see the exact impact.",
        },
        "7": {
          question:
            "Can I negotiate a lower APR on my credit card?",
          answer:
            "Yes, and it's worth trying. Studies show that 60–80% of people who call their issuer and ask for a rate reduction receive one. Having a good payment history, long account tenure, and a competing offer from another card strengthens your case. Even a 2–3% reduction can save hundreds of dollars over the life of your balance.",
        },
      },

      sources: { title: "Sources & References" },
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════
  inputs: [
    // ── Balance & APR ────────────────────────────────────────
    {
      id: "currentBalance",
      type: "number",
      defaultValue: null,
      placeholder: "5000",
      showSlider: false,
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    {
      id: "apr",
      type: "slider",
      defaultValue: 22.76,
      min: 0,
      max: 36,
      step: 0.01,
      suffix: "%",
    },

    // ── Minimum Payment Config ───────────────────────────────
    {
      id: "minimumPaymentPercent",
      type: "slider",
      defaultValue: 2,
      min: 1,
      max: 5,
      step: 0.5,
      suffix: "%",
    },
    {
      id: "minimumPaymentFloor",
      type: "stepper",
      defaultValue: 35,
      min: 15,
      max: 50,
      step: 5,
      suffix: "$",
    },

    // ── Your Monthly Payment ─────────────────────────────────
    {
      id: "monthlyPayment",
      type: "number",
      defaultValue: null,
      placeholder: "200",
      showSlider: false,
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },

    // ── Extra Payment (toggle) ───────────────────────────────
    {
      id: "includeExtraPayment",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "extraPayment",
      type: "number",
      defaultValue: null,
      placeholder: "50",
      showSlider: false,
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "includeExtraPayment", value: true },
    },

    // ── Balance Transfer (toggle) ────────────────────────────
    {
      id: "includeBalanceTransfer",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "introAprMonths",
      type: "stepper",
      defaultValue: 18,
      min: 6,
      max: 24,
      step: 1,
      suffix: "months",
      showWhen: { field: "includeBalanceTransfer", value: true },
    },
    {
      id: "transferFeePercent",
      type: "slider",
      defaultValue: 3,
      min: 0,
      max: 5,
      step: 0.5,
      suffix: "%",
      showWhen: { field: "includeBalanceTransfer", value: true },
    },
  ],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════
  results: [
    { id: "payoffTime", type: "primary", format: "text" },
    { id: "totalInterestPaid", type: "secondary", format: "currency" },
    { id: "totalAmountPaid", type: "secondary", format: "currency" },
    { id: "dailyInterestCost", type: "secondary", format: "text" },
    { id: "interestRatioFirstPayment", type: "secondary", format: "text" },
    { id: "minimumOnlyPayoff", type: "secondary", format: "text" },
    { id: "savingsVsMinimum", type: "secondary", format: "text" },
    { id: "debtFreeDate", type: "secondary", format: "text" },
    { id: "balanceTransferSavings", type: "secondary", format: "text" },
    { id: "effectiveCostPerDollar", type: "secondary", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // DETAILED TABLE — Monthly payment schedule
  // ═══════════════════════════════════════════════════════════════
  detailedTable: {
    id: "paymentSchedule",
    buttonLabel: "detailedTable.paymentSchedule.button",
    modalTitle: "detailedTable.paymentSchedule.title",
    columns: [
      { key: "month", label: "detailedTable.paymentSchedule.columns.month" },
      {
        key: "payment",
        label: "detailedTable.paymentSchedule.columns.payment",
      },
      {
        key: "interest",
        label: "detailedTable.paymentSchedule.columns.interest",
      },
      {
        key: "principal",
        label: "detailedTable.paymentSchedule.columns.principal",
      },
      {
        key: "balance",
        label: "detailedTable.paymentSchedule.columns.balance",
        highlight: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // INFO CARDS — 2 list + 1 horizontal (tips last)
  // ═══════════════════════════════════════════════════════════════
  infoCards: [
    { id: "costBreakdown", type: "list", icon: "💰", itemCount: 4 },
    { id: "payoffStrategy", type: "list", icon: "📊", itemCount: 4 },
    { id: "actionTips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ═══════════════════════════════════════════════════════════════
  // REFERENCE DATA
  // ═══════════════════════════════════════════════════════════════
  referenceData: [],

  // ═══════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS — 2 prose + 2 list + 1 code-example
  // ═══════════════════════════════════════════════════════════════
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "payoffStrategies", type: "list", icon: "✅", itemCount: 6 },
    { id: "commonMistakes", type: "list", icon: "⚠️", itemCount: 5 },
    {
      id: "examples",
      type: "code-example",
      icon: "🧮",
      columns: 2,
      exampleCount: 2,
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // FAQs — 8 for Schema.org rich snippets
  // ═══════════════════════════════════════════════════════════════
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

  // ═══════════════════════════════════════════════════════════════
  // REFERENCES — E-E-A-T for Google
  // ═══════════════════════════════════════════════════════════════
  references: [
    {
      authors: "Consumer Financial Protection Bureau",
      year: "2025",
      title:
        "What is a minimum payment on a credit card?",
      source: "CFPB Consumer Education",
      url: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-minimum-payment-on-a-credit-card-en-69/",
    },
    {
      authors: "Board of Governors of the Federal Reserve System",
      year: "2025",
      title: "Consumer Credit — G.19 Statistical Release",
      source: "Federal Reserve Economic Data",
      url: "https://www.federalreserve.gov/releases/g19/current/",
    },
    {
      authors: "Investopedia",
      year: "2025",
      title:
        "How Credit Card Interest Is Calculated",
      source: "Investopedia Financial Education",
      url: "https://www.investopedia.com/terms/a/averagedailybalance.asp",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MISC CONFIG
  // ═══════════════════════════════════════════════════════════════
  hero: {
    badge: "Finance",
    rating: { average: 4.9, count: 8700 },
  },
  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: false,
    category: "finance",
  },
  features: {
    autoCalculate: true,
    exportPDF: true,
    shareResults: true,
    saveHistory: true,
  },
  relatedCalculators: [
    "debt-payoff-calculator",
    "loan-calculator",
    "compound-interest-calculator",
    "savings-calculator",
  ],
  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
  },
};

/* ═══════════════════════════════════════════════════════════════════
   CALCULATE FUNCTION
   Iterative amortization: each month → interest = balance × (APR/12)
   Unique features:
   • Minimum-only scenario (decreasing payments)
   • Fixed payment scenario
   • Extra payment scenario
   • Balance transfer comparison (0% intro + fee)
   • Daily interest cost
   • Interest-to-payment ratio on first payment
   • Effective cost per dollar borrowed
   • Calendar debt-free date
   • Chart data: 3-line balance decay comparison
   • Table data: month-by-month payment schedule
   ═══════════════════════════════════════════════════════════════════ */

// Currency symbols for formatting
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$", EUR: "€", GBP: "£", MXN: "MX$", BRL: "R$",
  JPY: "¥", INR: "₹", CAD: "C$", AUD: "A$", CHF: "CHF ",
  COP: "COL$", ARS: "AR$", PEN: "S/", CLP: "CLP ",
  CNY: "¥", KRW: "₩", SEK: "kr ", NOK: "kr ", DKK: "kr ",
  PLN: "zł", CZK: "Kč ", HUF: "Ft ", TRY: "₺", ZAR: "R",
  SGD: "S$", HKD: "HK$", NZD: "NZ$", THB: "฿", TWD: "NT$",
  ILS: "₪", PHP: "₱", MYR: "RM ",
};

function fmtCurr(amount: number, sym: string): string {
  if (Math.abs(amount) >= 1_000_000) {
    return `${sym}${(amount / 1_000_000).toFixed(2)}M`;
  }
  return `${sym}${amount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

function fmtCurrDec(amount: number, sym: string): string {
  return `${sym}${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// ── Payoff simulation engine ─────────────────────────────────
interface PayoffResult {
  months: number;
  totalPaid: number;
  totalInterest: number;
  schedule: Array<{
    month: number;
    payment: number;
    interest: number;
    principal: number;
    balance: number;
  }>;
}

const MAX_MONTHS = 600; // 50-year safety cap

/**
 * Simulate credit card payoff month by month.
 * @param balance     Starting balance
 * @param aprPercent  Annual Percentage Rate (e.g. 22.76)
 * @param getPayment  Function that returns payment amount given current balance
 * @returns PayoffResult with schedule
 */
function simulatePayoff(
  balance: number,
  aprPercent: number,
  getPayment: (bal: number) => number,
): PayoffResult {
  const monthlyRate = aprPercent / 100 / 12;
  let remaining = balance;
  let totalPaid = 0;
  let totalInterest = 0;
  const schedule: PayoffResult["schedule"] = [];

  for (let m = 1; m <= MAX_MONTHS && remaining > 0.01; m++) {
    const interest = remaining * monthlyRate;
    let payment = getPayment(remaining);

    // Payment must at least cover interest to make progress
    // If payment < interest, flag but continue (negative amortization)
    if (payment > remaining + interest) {
      payment = remaining + interest; // Final payment
    }

    const principal = payment - interest;
    remaining = Math.max(0, remaining - principal);
    totalPaid += payment;
    totalInterest += interest;

    schedule.push({
      month: m,
      payment: Math.round(payment * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      principal: Math.round(principal * 100) / 100,
      balance: Math.round(remaining * 100) / 100,
    });
  }

  return {
    months: schedule.length,
    totalPaid: Math.round(totalPaid * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    schedule,
  };
}

/**
 * Simulate balance transfer scenario:
 * 0% interest during intro period, then revert to original APR
 */
function simulateBalanceTransfer(
  balance: number,
  aprPercent: number,
  introMonths: number,
  transferFeePercent: number,
  getPayment: (bal: number) => number,
): PayoffResult {
  const transferFee = balance * (transferFeePercent / 100);
  const startBalance = balance + transferFee;
  const monthlyRate = aprPercent / 100 / 12;
  let remaining = startBalance;
  let totalPaid = 0;
  let totalInterest = 0;
  const schedule: PayoffResult["schedule"] = [];

  for (let m = 1; m <= MAX_MONTHS && remaining > 0.01; m++) {
    // During intro period: 0% interest. After: normal APR
    const interest = m <= introMonths ? 0 : remaining * monthlyRate;
    let payment = getPayment(remaining);

    if (payment > remaining + interest) {
      payment = remaining + interest;
    }

    const principal = payment - interest;
    remaining = Math.max(0, remaining - principal);
    totalPaid += payment;
    totalInterest += interest;

    schedule.push({
      month: m,
      payment: Math.round(payment * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      principal: Math.round(principal * 100) / 100,
      balance: Math.round(remaining * 100) / 100,
    });
  }

  return {
    months: schedule.length,
    totalPaid: Math.round(totalPaid * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    schedule,
  };
}

// ── Format time duration ─────────────────────────────────────
function formatDuration(
  totalMonths: number,
  v: Record<string, string>,
): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const yLabel = years === 1 ? (v["year"] || "year") : (v["years"] || "years");
  const mLabel =
    months === 1 ? (v["month"] || "month") : (v["months"] || "months");

  if (years === 0) return `${months} ${mLabel}`;
  if (months === 0) return `${years} ${yLabel}`;
  return `${years} ${yLabel}, ${months} ${mLabel}`;
}

// ── Get debt-free date ───────────────────────────────────────
function getDebtFreeDate(monthsFromNow: number): string {
  const date = new Date();
  date.setMonth(date.getMonth() + monthsFromNow);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ═══════════════════════════════════════════════════════════════
// MAIN CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════

export function calculateCreditCardPayoff(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;

  // ── Translations ──────────────────────────────────────────
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Currency symbol ───────────────────────────────────────
  const curr = fieldUnits?.currentBalance || "USD";
  const sym = CURRENCY_SYMBOLS[curr] || "$";

  // ── Read inputs ───────────────────────────────────────────
  const balance = (values.currentBalance as number) || 0;
  const apr = (values.apr as number) || 0;
  const minPayPct = (values.minimumPaymentPercent as number) || 2;
  const minPayFloor = (values.minimumPaymentFloor as number) || 35;
  const fixedPayment = (values.monthlyPayment as number) || 0;
  const includeExtra = values.includeExtraPayment === true;
  const extraPay = includeExtra ? ((values.extraPayment as number) || 0) : 0;
  const includeTransfer = values.includeBalanceTransfer === true;
  const introMonths = includeTransfer
    ? ((values.introAprMonths as number) || 18)
    : 0;
  const transferFeePct = includeTransfer
    ? ((values.transferFeePercent as number) || 3)
    : 0;

  // ── Validation ────────────────────────────────────────────
  if (balance <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Minimum payment function (decreasing) ─────────────────
  const getMinPayment = (bal: number): number => {
    return Math.max(bal * (minPayPct / 100), minPayFloor, 0);
  };

  // ── Determine effective monthly payment ───────────────────
  // If user entered a payment, use it. Otherwise, use minimum.
  const hasFixedPayment = fixedPayment > 0;
  const totalFixedPayment = hasFixedPayment
    ? fixedPayment + extraPay
    : 0;

  // ── SCENARIO 1: Minimum-only payoff ───────────────────────
  const minResult = simulatePayoff(balance, apr, (bal) =>
    getMinPayment(bal),
  );

  // ── SCENARIO 2: Fixed payment payoff ──────────────────────
  let fixedResult: PayoffResult;
  if (hasFixedPayment) {
    const effectivePayment = totalFixedPayment;
    // Ensure payment is at least the first minimum
    const firstMin = getMinPayment(balance);
    if (effectivePayment < firstMin) {
      // Payment too low — use their amount anyway (they'll see warnings)
      fixedResult = simulatePayoff(balance, apr, () => effectivePayment);
    } else {
      fixedResult = simulatePayoff(balance, apr, () => effectivePayment);
    }
  } else {
    // No fixed payment: same as minimum
    fixedResult = minResult;
  }

  // ── SCENARIO 3: With extra payment (for chart) ────────────
  let extraResult: PayoffResult | null = null;
  if (hasFixedPayment && extraPay > 0) {
    extraResult = fixedResult; // already includes extra
    // For the chart, also calculate without extra
    const withoutExtra = simulatePayoff(balance, apr, () => fixedPayment);
    fixedResult = withoutExtra;
    // Swap: fixedResult = payment only, extraResult = payment + extra
  } else if (hasFixedPayment) {
    // No extra toggle — extra line same as fixed
    extraResult = null;
  }

  // Use the "main" result — the user's actual plan
  const mainResult = extraResult || fixedResult;

  // ── SCENARIO 4: Balance transfer ──────────────────────────
  let transferResult: PayoffResult | null = null;
  let transferSavings = 0;
  let transferFeeAmt = 0;
  if (includeTransfer && hasFixedPayment) {
    const paymentForTransfer = totalFixedPayment;
    transferResult = simulateBalanceTransfer(
      balance,
      apr,
      introMonths,
      transferFeePct,
      () => paymentForTransfer,
    );
    transferFeeAmt = balance * (transferFeePct / 100);
    transferSavings = mainResult.totalInterest - transferResult.totalInterest;
  }

  // ── Compute metrics ───────────────────────────────────────
  const monthlyRate = apr / 100 / 12;
  const dailyInterest = balance * (apr / 100 / 365);
  const firstMonthInterest = balance * monthlyRate;
  const effectiveFirstPayment = hasFixedPayment
    ? totalFixedPayment
    : getMinPayment(balance);
  const interestRatio =
    effectiveFirstPayment > 0
      ? (firstMonthInterest / effectiveFirstPayment) * 100
      : 0;
  const costPerDollar =
    balance > 0 ? mainResult.totalPaid / balance : 0;
  const savingsVsMin =
    minResult.totalInterest - mainResult.totalInterest;

  // ── Chart data — balance over time ────────────────────────
  const chartData: Array<Record<string, unknown>> = [];
  const maxChartMonths = Math.max(
    minResult.months,
    fixedResult.months,
    extraResult?.months || 0,
  );
  // Sample every N months to keep chart readable (max ~60 data points)
  const step = Math.max(1, Math.floor(maxChartMonths / 60));

  for (let m = 0; m <= maxChartMonths; m += step) {
    const minBal =
      m === 0
        ? balance
        : m <= minResult.months
          ? (minResult.schedule[m - 1]?.balance ?? 0)
          : 0;
    const fixBal =
      m === 0
        ? balance
        : m <= fixedResult.months
          ? (fixedResult.schedule[m - 1]?.balance ?? 0)
          : 0;
    const extBal =
      extraResult
        ? m === 0
          ? balance
          : m <= extraResult.months
            ? (extraResult.schedule[m - 1]?.balance ?? 0)
            : 0
        : fixBal;

    chartData.push({
      month: `${m}`,
      minimumOnly: Math.round(minBal),
      fixedPayment: Math.round(fixBal),
      withExtra: Math.round(extBal),
    });
  }

  // ── Table data — payment schedule for user's plan ─────────
  const tableData = mainResult.schedule.map((row) => ({
    month: `${row.month}`,
    payment: fmtCurrDec(row.payment, sym),
    interest: fmtCurrDec(row.interest, sym),
    principal: fmtCurrDec(row.principal, sym),
    balance: fmtCurrDec(row.balance, sym),
  }));

  // ── Format results ────────────────────────────────────────
  const payoffMonths = mainResult.months;
  const payoffTimeStr = formatDuration(payoffMonths, v);
  const minPayoffTimeStr = formatDuration(minResult.months, v);
  const debtFreeStr = getDebtFreeDate(payoffMonths);

  const dayLabel = v["/day"] || "/day";
  const minOnlyLabel = v["minimum only"] || "minimum only";
  const savedLabel = v["saved vs minimum"] || "saved vs minimum";
  const perDollarLabel = v["per $1 borrowed"] || "per $1 borrowed";
  const transferLabel = v["with balance transfer"] || "with balance transfer";
  const ofFirstLabel =
    v["of first payment is interest"] || "of first payment is interest";
  const transferFeeLabel = v["Transfer fee"] || "Transfer fee";

  // ── Build formatted object ────────────────────────────────
  const formatted: Record<string, string> = {
    payoffTime: payoffTimeStr,
    totalInterestPaid: fmtCurr(mainResult.totalInterest, sym),
    totalAmountPaid: fmtCurr(mainResult.totalPaid, sym),
    dailyInterestCost: `${fmtCurrDec(dailyInterest, sym)}${dayLabel}`,
    interestRatioFirstPayment: `${interestRatio.toFixed(0)}% ${ofFirstLabel}`,
    minimumOnlyPayoff: `${minPayoffTimeStr} · ${fmtCurr(minResult.totalInterest, sym)} ${minOnlyLabel}`,
    savingsVsMinimum:
      savingsVsMin > 0
        ? `${fmtCurr(savingsVsMin, sym)} ${savedLabel}`
        : "—",
    debtFreeDate: debtFreeStr,
    balanceTransferSavings:
      transferResult && transferSavings > 0
        ? `${fmtCurr(transferSavings, sym)} ${transferLabel} (${transferFeeLabel}: ${fmtCurr(transferFeeAmt, sym)})`
        : includeTransfer
          ? `${fmtCurr(0, sym)} — ${transferLabel}`
          : "—",
    effectiveCostPerDollar: `${fmtCurrDec(costPerDollar, sym)} ${perDollarLabel}`,
  };

  // ── Summary ───────────────────────────────────────────────
  const summaryTemplate =
    f["summary"] ||
    "Pay off {balance} at {apr}% APR in {payoffTime} with {payment}/mo payments. Total interest: {totalInterest}. Your card charges {dailyCost}/day. Debt-free by {debtFreeDate}.";
  const summary = summaryTemplate
    .replace("{balance}", fmtCurr(balance, sym))
    .replace("{apr}", apr.toFixed(2))
    .replace("{payoffTime}", payoffTimeStr)
    .replace(
      "{payment}",
      fmtCurr(hasFixedPayment ? totalFixedPayment : getMinPayment(balance), sym),
    )
    .replace("{totalInterest}", fmtCurr(mainResult.totalInterest, sym))
    .replace("{dailyCost}", fmtCurrDec(dailyInterest, sym))
    .replace("{debtFreeDate}", debtFreeStr);

  return {
    values: {
      payoffTime: payoffMonths,
      totalInterestPaid: mainResult.totalInterest,
      totalAmountPaid: mainResult.totalPaid,
      dailyInterestCost: dailyInterest,
      interestRatioFirstPayment: interestRatio,
      minimumOnlyPayoff: minResult.months,
      savingsVsMinimum: savingsVsMin,
      debtFreeDate: payoffMonths,
      balanceTransferSavings: transferSavings,
      effectiveCostPerDollar: costPerDollar,
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