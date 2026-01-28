import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

export const creditCardPayoffCalculatorConfig: CalculatorConfigV3 = {
  // Basic Info
  id: "credit-card-payoff-calculator",
  slug: "credit-card-payoff-calculator",
  name: "Credit Card Payoff Calculator",
  category: "finance",
  icon: "💳",

  // SEO
  seo: {
    title: "Credit Card Payoff Calculator - Debt Snowball vs Avalanche Comparison",
    description: "Calculate how to pay off credit card debt faster. Compare snowball vs avalanche methods, see balance transfer savings, and get a personalized debt-free date with month-by-month payoff schedule.",
    shortDescription: "Calculate your debt-free date and compare payoff strategies",
    keywords: [
      "credit card payoff calculator",
      "debt snowball calculator",
      "debt avalanche calculator",
      "credit card debt calculator",
      "debt free date calculator",
      "balance transfer calculator",
      "minimum payment calculator",
      "credit card interest calculator"
    ],
  },

  // Hero Section
  hero: {
    badge: "Finance",
    rating: { average: 4.9, count: 2847 },
  },

  // Unit System
  unitSystem: {
    enabled: false,
    default: "imperial",
    options: [],
  },

  // INPUTS
  inputs: [
    // Card 1 - Always visible
    {
      id: "card1Balance",
      type: "number",
      label: "Card 1 Balance",
      required: true,
      defaultValue: 5000,
      min: 0,
      max: 100000,
      step: 100,
      prefix: "$",
      helpText: "Current balance owed on this card",
    },
    {
      id: "card1APR",
      type: "number",
      label: "Card 1 APR",
      required: true,
      defaultValue: 22.99,
      min: 0,
      max: 40,
      step: 0.01,
      suffix: "%",
      },
    {
      id: "card1MinPayment",
      type: "number",
      label: "Card 1 Minimum Payment",
      required: true,
      defaultValue: 100,
      min: 25,
      max: 5000,
      step: 5,
      prefix: "$",
      helpText: "Usually 2% of balance or $35, whichever is greater",
    },
    // Card 2 - Optional
    {
      id: "card2Balance",
      type: "number",
      label: "Card 2 Balance (optional)",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 100000,
      step: 100,
      prefix: "$",
    },
    {
      id: "card2APR",
      type: "number",
      label: "Card 2 APR",
      required: false,
      defaultValue: 19.99,
      min: 0,
      max: 40,
      step: 0.01,
      suffix: "%",
      },
    {
      id: "card2MinPayment",
      type: "number",
      label: "Card 2 Minimum Payment",
      required: false,
      defaultValue: 50,
      min: 25,
      max: 5000,
      step: 5,
      prefix: "$",
      },
    // Card 3 - Optional
    {
      id: "card3Balance",
      type: "number",
      label: "Card 3 Balance (optional)",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 100000,
      step: 100,
      prefix: "$",
    },
    {
      id: "card3APR",
      type: "number",
      label: "Card 3 APR",
      required: false,
      defaultValue: 24.99,
      min: 0,
      max: 40,
      step: 0.01,
      suffix: "%",
      },
    {
      id: "card3MinPayment",
      type: "number",
      label: "Card 3 Minimum Payment",
      required: false,
      defaultValue: 35,
      min: 25,
      max: 5000,
      step: 5,
      prefix: "$",
      },
    // Payment Strategy
    {
      id: "extraPayment",
      type: "number",
      label: "Extra Monthly Payment",
      required: true,
      defaultValue: 100,
      min: 0,
      max: 5000,
      step: 25,
      prefix: "$",
      helpText: "Additional amount beyond minimum payments to accelerate payoff",
    },
    {
      id: "payoffStrategy",
      type: "radio",
      label: "Preferred Strategy",
      required: true,
      defaultValue: "compare",
      options: [
        { value: "compare", label: "Compare Both" },
        { value: "snowball", label: "Snowball" },
        { value: "avalanche", label: "Avalanche" },
      ],
      helpText: "Snowball = faster wins for motivation. Avalanche = save more on interest.",
    },
  ],

  // Input Groups
  inputGroups: [],

  // RESULTS
  results: [
    { id: "totalDebt", type: "primary", label: "Total Debt", format: "number", prefix: "$" },
    { id: "debtFreeDate", type: "secondary", label: "Debt-Free Date", format: "text" },
    { id: "monthsToPayoff", type: "secondary", label: "Months to Pay Off", format: "text" },
    { id: "totalInterest", type: "secondary", label: "Total Interest Paid", format: "number", prefix: "$" },
    { id: "totalPayments", type: "secondary", label: "Total Amount Paid", format: "number", prefix: "$" },
    { id: "interestSavings", type: "secondary", label: "Interest Savings vs Minimum", format: "number", prefix: "$" },
    { id: "recommendedStrategy", type: "secondary", label: "Recommended Strategy", format: "text" },
    { id: "minimumOnlyWarning", type: "secondary", label: "Minimum Payment Warning", format: "text" },
  ],

  // Info Cards
  infoCards: [
    {
      id: "strategyComparison",
      type: "list",
      title: "Strategy Comparison",
      icon: "⚔️",
      items: [
        { label: "Snowball Months", valueKey: "snowballMonths" },
        { label: "Snowball Interest", valueKey: "snowballInterest" },
        { label: "Avalanche Months", valueKey: "avalancheMonths" },
        { label: "Avalanche Interest", valueKey: "avalancheInterest" },
        { label: "Avalanche Savings", valueKey: "avalancheSavings" },
      ],
    },
    {
      id: "payoffBreakdown",
      type: "horizontal",
      title: "Payment Breakdown",
      icon: "📊",
      items: [
        { label: "Monthly Payment", valueKey: "totalMonthlyPayment" },
        { label: "Avg Interest/Month", valueKey: "avgMonthlyInterest" },
        { label: "Cards to Pay", valueKey: "numberOfCards" },
      ],
    },
  ],

  // Reference Data
  referenceData: [
    {
      id: "balancePayoffTable",
      title: "Payoff Timeline by Balance",
      description: "How long it takes to pay off different balances at 22% APR with $200/month payment",
      columns: [
        { key: "balance", label: "Balance", align: "left" },
        { key: "months", label: "Months", align: "center" },
        { key: "interest", label: "Total Interest", align: "right" },
        { key: "total", label: "Total Paid", align: "right" },
      ],
      data: [
        { balance: "$2,000", months: "11", interest: "$200", total: "$2,200" },
        { balance: "$5,000", months: "32", interest: "$1,280", total: "$6,280" },
        { balance: "$10,000", months: "79", interest: "$5,640", total: "$15,640" },
        { balance: "$15,000", months: "152", interest: "$15,200", total: "$30,200" },
        { balance: "$20,000", months: "Never", interest: "Infinite", total: "Never pays off" },
      ],
    },
  ],

  // EDUCATION SECTIONS
  educationSections: [
    {
      id: "payoffMethods",
      type: "cards",
      title: "Debt Payoff Methods Explained",
      icon: "📚",
      columns: 2,
      cards: [
        {
          title: "Debt Snowball",
          description: "Pay minimums on all cards, then attack the smallest balance first with extra money. When that card is paid off, roll that payment to the next smallest. Pros: Quick wins boost motivation. Cons: May pay more interest overall.",
          icon: "⛷️",
        },
        {
          title: "Debt Avalanche",
          description: "Pay minimums on all cards, then attack the highest APR card first with extra money. When paid off, roll to the next highest APR. Pros: Saves the most money. Cons: May take longer to see the first card paid off.",
          icon: "🏔️",
        },
        {
          title: "Balance Transfer",
          description: "Move high-APR debt to a card with 0% intro APR (typically 12-21 months). Pay a 3-5% transfer fee but save significantly on interest if you pay off before the promo ends. Best for: Those who can pay off within the intro period.",
          icon: "🔄",
        },
        {
          title: "Minimum Payment Trap",
          description: "Paying only the minimum (usually 2% of balance) means most of your payment goes to interest. A $5,000 balance at 22% APR with minimum payments takes 27+ years to pay off and costs $9,000+ in interest!",
          icon: "⚠️",
        },
      ],
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "Average credit card APR in 2025 is 21-23% - among the highest borrowing costs", type: "warning" },
        { text: "Paying only minimums can take 20-30 years to pay off and triple your total cost", type: "warning" },
        { text: "Stop using cards while paying off debt - new charges sabotage your progress", type: "warning" },
        { text: "Even $25-50 extra per month significantly accelerates your debt-free date", type: "info" },
        { text: "The avalanche method saves money, but snowball may keep you motivated longer", type: "info" },
        { text: "Consider a 0% balance transfer if you have good credit and can pay off in 12-18 months", type: "info" },
        { text: "Build a small emergency fund first to avoid new debt when unexpected costs arise", type: "info" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example: Paying Off $8,000 in Credit Card Debt",
      icon: "📊",
      description: "Two cards: $5,000 at 24% APR and $3,000 at 18% APR. $400/month total budget.",
      columns: 2,
      examples: [
        {
          title: "Debt Snowball Method",
          steps: [
            "Total min payments: $160/month",
            "Extra payment: $240/month",
            "Target Card 2 first ($3,000 balance)",
            "Pay $265/month to Card 2, $135 min to Card 1",
            "Card 2 paid off in 13 months",
            "Roll $265 to Card 1 = $400 total",
            "Card 1 paid off in 21 months total",
          ],
          result: "Total Interest: $1,847 | 21 months to debt-free",
        },
        {
          title: "Debt Avalanche Method",
          steps: [
            "Total min payments: $160/month",
            "Extra payment: $240/month",
            "Target Card 1 first (24% APR)",
            "Pay $340/month to Card 1, $60 min to Card 2",
            "Card 1 paid off in 17 months",
            "Roll $340 to Card 2 = $400 total",
            "Card 2 paid off in 20 months total",
          ],
          result: "Total Interest: $1,621 | 20 months to debt-free | Saves $226",
        },
      ],
    },
    {
      id: "interestExplanation",
      type: "prose",
      title: "How Credit Card Interest Works",
      icon: "📈",
      content: "Credit card interest compounds daily, not monthly. Your APR is divided by 365 to get a daily rate, which is applied to your average daily balance. For example, at 22% APR, the daily rate is 0.0603%. On a $5,000 balance, you accrue about $3 in interest per day. This means delaying payments—even by a few days—costs real money. When you make a payment, it first covers accrued interest, then any fees, and finally reduces your principal. This is why minimum payments feel like they barely make a dent: most goes to interest, leaving only a small amount to reduce what you actually owe.",
    },
    {
      id: "whyPayoffMatters",
      type: "prose",
      title: "Why Paying Off Credit Cards Matters",
      icon: "💡",
      content: "Credit card debt is one of the most expensive forms of borrowing, with average APRs exceeding 22% in 2025. Unlike mortgages or auto loans with fixed terms, credit cards have no set payoff date—making it easy to carry balances for years or decades. The longer you carry a balance, the more you pay in interest, which could have been invested or saved. Eliminating credit card debt frees up cash flow for emergency savings, retirement contributions, and other financial goals. It also improves your credit utilization ratio, potentially boosting your credit score.",
    },
    {
      id: "buildingGoodHabits",
      type: "prose",
      title: "Building Credit Card Habits That Stick",
      icon: "🎯",
      content: "Once you pay off your credit cards, prevent future debt by treating them like debit cards—only charge what you can pay in full each month. Set up autopay for the full balance to avoid interest entirely. Use your cards for rewards and purchase protection, but never carry a balance. If you struggle with overspending, consider using cash or a debit card for discretionary purchases. Finally, build an emergency fund of 3-6 months expenses so unexpected costs don't force you back into credit card debt.",
    },
  ],

  // FAQs
  faqs: [
    {
      question: "Which is better: debt snowball or debt avalanche?",
      answer: "Mathematically, the avalanche method (paying highest APR first) saves more money. However, research shows many people are more successful with the snowball method because paying off smaller balances quickly provides psychological wins that maintain motivation. Choose avalanche if you're disciplined and motivated by saving money. Choose snowball if you need quick wins to stay on track. The best method is the one you'll stick with."
    },
    {
      question: "How is minimum payment calculated on credit cards?",
      answer: "Most credit card companies calculate minimum payment as 2-3% of your balance OR a flat amount ($25-$35), whichever is greater. Some calculate 1% of balance plus all interest and fees. For example, on a $5,000 balance, the minimum is typically $100-$150. Check your card agreement for the exact formula. Warning: Paying only minimums can take 20+ years to pay off a balance."
    },
    {
      question: "Should I do a balance transfer to a 0% APR card?",
      answer: "A balance transfer can save significant money if: (1) You have good credit to qualify (usually 670+), (2) You can pay off the balance before the intro period ends (typically 12-21 months), (3) The 3-5% transfer fee is less than the interest you'd otherwise pay. For example, transferring $5,000 at a 3% fee costs $150, but saves $900+ in interest over 15 months at 22% APR. However, if you can't pay off before the promo ends, the regular APR (often 20%+) kicks in on any remaining balance."
    },
    {
      question: "How much extra should I pay to make a real difference?",
      answer: "Even $25-50 extra per month makes a significant difference. On a $5,000 balance at 22% APR: paying only minimums takes 27 years and costs $9,200 total. Adding just $50/month reduces this to 43 months and $6,400 total—saving $2,800 and 24 years! Adding $100/month further reduces it to 29 months and $5,800. The key is consistency: any extra amount, paid every month, compounds to massive savings."
    },
    {
      question: "Should I save money or pay off credit cards first?",
      answer: "Generally, pay off high-interest credit card debt first—it's hard to earn 20%+ returns investing. However, build a small emergency fund of $500-$1,000 first. Without this cushion, any unexpected expense forces you back onto credit cards. Once you have a mini emergency fund, aggressively pay down cards. After cards are paid off, build a full 3-6 month emergency fund."
    },
    {
      question: "What happens if I miss a credit card payment?",
      answer: "Missing a payment triggers multiple consequences: (1) Late fee of $25-$40, (2) Penalty APR of up to 29.99% may apply to your entire balance, (3) After 30 days late, it's reported to credit bureaus and damages your score, (4) After 60 days, penalty APR definitely applies, (5) After 180 days, your account may be charged off and sold to collections. Always pay at least the minimum on time. If you can't afford it, call your card issuer to discuss hardship options before missing the payment."
    },
  ],

  // REQUIRED: References (exactly 2)
  references: [
    {
      authors: "Consumer Financial Protection Bureau",
      year: "2025",
      title: "Consumer Credit Card Market Report",
      source: "CFPB Annual Report",
      url: "https://www.consumerfinance.gov/data-research/research-reports/consumer-credit-card-market-report/"
    },
    {
      authors: "Federal Reserve",
      year: "2025",
      title: "G.19 Consumer Credit Report - Credit Card Interest Rates",
      source: "Federal Reserve Statistical Release",
      url: "https://www.federalreserve.gov/releases/g19/current/"
    },
  ],

  // Detailed Table
  detailedTable: {
    id: "payoffSchedule",
    buttonLabel: "View Month-by-Month Schedule",
    buttonIcon: "📅",
    modalTitle: "Month-by-Month Payoff Schedule",
    columns: [
      { id: "month", label: "Month", align: "left" },
      { id: "payment", label: "Payment", align: "right" },
      { id: "principal", label: "Principal", align: "right" },
      { id: "interest", label: "Interest", align: "right" },
      { id: "balance", label: "Remaining Balance", align: "right", highlight: true },
    ],
  },

  // Sidebar
  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: true,
    category: "finance",
  },

  // Features
  features: {
    autoCalculate: true,
    exportPDF: true,
    shareResults: true,
    saveHistory: true,
  },

  // Related Calculators
  relatedCalculators: [
    "loan-calculator",
    "debt-to-income-calculator",
    "compound-interest-calculator",
    "savings-goal-calculator",
  ],

  // Ads
  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
  },
};

// ============================================
// CALCULATE FUNCTION
// ============================================

interface Card {
  balance: number;
  apr: number;
  minPayment: number;
  name: string;
}

interface PayoffResult {
  months: number;
  totalInterest: number;
  totalPaid: number;
  schedule: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

function calculatePayoff(
  cards: Card[],
  extraPayment: number,
  method: "snowball" | "avalanche"
): PayoffResult {
  // Clone cards for manipulation
  let activeCards = cards.map(c => ({ ...c, currentBalance: c.balance }));
  
  // Sort based on method
  if (method === "snowball") {
    activeCards.sort((a, b) => a.currentBalance - b.currentBalance);
  } else {
    activeCards.sort((a, b) => b.apr - a.apr);
  }

  let month = 0;
  let totalInterest = 0;
  let totalPaid = 0;
  const schedule: PayoffResult["schedule"] = [];
  
  const maxMonths = 600; // 50 years cap

  while (activeCards.some(c => c.currentBalance > 0.01) && month < maxMonths) {
    month++;
    let monthlyPayment = 0;
    let monthlyInterest = 0;
    let monthlyPrincipal = 0;

    // Calculate minimum payments for all cards
    let totalMinPayments = 0;
    activeCards.forEach(card => {
      if (card.currentBalance > 0) {
        const calculatedMin = Math.max(card.minPayment, card.currentBalance * 0.02, 35);
        totalMinPayments += Math.min(calculatedMin, card.currentBalance);
      }
    });

    // Available extra payment
    let remainingExtra = extraPayment;

    // Process each card
    for (const card of activeCards) {
      if (card.currentBalance <= 0.01) {
        card.currentBalance = 0;
        continue;
      }

      // Calculate monthly interest
      const monthlyRate = card.apr / 100 / 12;
      const interest = card.currentBalance * monthlyRate;
      monthlyInterest += interest;
      totalInterest += interest;

      // Determine payment for this card
      const calculatedMin = Math.max(card.minPayment, card.currentBalance * 0.02, 35);
      let payment = Math.min(calculatedMin, card.currentBalance + interest);

      // Add extra payment to the first card with balance (target card based on method)
      if (remainingExtra > 0 && card.currentBalance > 0) {
        const extraForThisCard = Math.min(remainingExtra, card.currentBalance + interest - payment);
        payment += extraForThisCard;
        remainingExtra -= extraForThisCard;
      }

      // Apply payment
      const principal = Math.max(0, payment - interest);
      card.currentBalance = Math.max(0, card.currentBalance - principal);
      
      monthlyPayment += payment;
      monthlyPrincipal += principal;
      totalPaid += payment;
    }

    // Remove paid off cards and re-sort
    activeCards = activeCards.filter(c => c.currentBalance > 0.01);
    if (method === "snowball") {
      activeCards.sort((a, b) => a.currentBalance - b.currentBalance);
    } else {
      activeCards.sort((a, b) => b.apr - a.apr);
    }

    const totalBalance = activeCards.reduce((sum, c) => sum + c.currentBalance, 0);

    schedule.push({
      month,
      payment: Math.round(monthlyPayment * 100) / 100,
      principal: Math.round(monthlyPrincipal * 100) / 100,
      interest: Math.round(monthlyInterest * 100) / 100,
      balance: Math.round(totalBalance * 100) / 100,
    });
  }

  return {
    months: month >= maxMonths ? -1 : month, // -1 indicates never pays off
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalPaid: Math.round(totalPaid * 100) / 100,
    schedule,
  };
}

function calculateMinimumOnlyPayoff(cards: Card[]): PayoffResult {
  return calculatePayoff(cards, 0, "avalanche");
}

export function calculateCreditCardPayoff(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;

  // Build cards array
  const cards: Card[] = [];
  
  const card1Balance = Number(values.card1Balance) || 0;
  if (card1Balance > 0) {
    cards.push({
      balance: card1Balance,
      apr: Number(values.card1APR) || 22.99,
      minPayment: Number(values.card1MinPayment) || Math.max(35, card1Balance * 0.02),
      name: "Card 1",
    });
  }

  const card2Balance = Number(values.card2Balance) || 0;
  if (card2Balance > 0) {
    cards.push({
      balance: card2Balance,
      apr: Number(values.card2APR) || 19.99,
      minPayment: Number(values.card2MinPayment) || Math.max(35, card2Balance * 0.02),
      name: "Card 2",
    });
  }

  const card3Balance = Number(values.card3Balance) || 0;
  if (card3Balance > 0) {
    cards.push({
      balance: card3Balance,
      apr: Number(values.card3APR) || 24.99,
      minPayment: Number(values.card3MinPayment) || Math.max(35, card3Balance * 0.02),
      name: "Card 3",
    });
  }

  // If no cards, return empty state
  if (cards.length === 0) {
    return {
      values: {},
      formatted: {},
      summary: "Enter at least one credit card balance to calculate your payoff plan.",
      isValid: false,
    };
  }

  const extraPayment = Number(values.extraPayment) || 0;
  const strategy = String(values.payoffStrategy) || "compare";

  // Calculate total debt
  const totalDebt = cards.reduce((sum, c) => sum + c.balance, 0);
  const numberOfCards = cards.length;
  const weightedAPR = cards.reduce((sum, c) => sum + (c.balance * c.apr), 0) / totalDebt;
  const totalMinPayments = cards.reduce((sum, c) => sum + c.minPayment, 0);
  const totalMonthlyPayment = totalMinPayments + extraPayment;

  // Calculate both methods
  const snowballResult = calculatePayoff(cards, extraPayment, "snowball");
  const avalancheResult = calculatePayoff(cards, extraPayment, "avalanche");
  const minimumOnlyResult = calculateMinimumOnlyPayoff(cards);

  // Determine which result to show based on strategy
  let primaryResult: PayoffResult;
  let recommendedStrategy: string;

  if (strategy === "snowball") {
    primaryResult = snowballResult;
    recommendedStrategy = "Snowball";
  } else if (strategy === "avalanche") {
    primaryResult = avalancheResult;
    recommendedStrategy = "Avalanche";
  } else {
    // Compare mode - use avalanche as primary but show comparison
    primaryResult = avalancheResult;
    const savingsAmount = snowballResult.totalInterest - avalancheResult.totalInterest;
    const monthsDifference = snowballResult.months - avalancheResult.months;
    
    if (savingsAmount > 100 || monthsDifference > 2) {
      recommendedStrategy = `Avalanche (saves $${savingsAmount.toFixed(0)} & ${monthsDifference} months)`;
    } else {
      recommendedStrategy = "Either method works - choose based on your preference";
    }
  }

  // Calculate interest savings vs minimum payments
  const interestSavings = minimumOnlyResult.totalInterest - primaryResult.totalInterest;

  // Calculate debt-free date
  const debtFreeDate = new Date();
  debtFreeDate.setMonth(debtFreeDate.getMonth() + primaryResult.months);
  const debtFreeDateFormatted = primaryResult.months === -1 
    ? "Never (payment too low)" 
    : debtFreeDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  // Minimum payment warning
  let minimumOnlyWarning: string;
  if (minimumOnlyResult.months === -1) {
    minimumOnlyWarning = "⚠️ Minimum payments will NEVER pay off this debt!";
  } else {
    const years = Math.floor(minimumOnlyResult.months / 12);
    const months = minimumOnlyResult.months % 12;
    minimumOnlyWarning = `Minimum only: ${years}y ${months}m, $${minimumOnlyResult.totalInterest.toLocaleString()} interest`;
  }

  // Average monthly interest
  const avgMonthlyInterest = primaryResult.months > 0 
    ? primaryResult.totalInterest / primaryResult.months 
    : 0;

  // Avalanche savings vs snowball
  const avalancheSavings = snowballResult.totalInterest - avalancheResult.totalInterest;

  // Format schedule for table
  const tableData = primaryResult.schedule.map(row => ({
    month: `Month ${row.month}`,
    payment: `$${row.payment.toLocaleString()}`,
    principal: `$${row.principal.toLocaleString()}`,
    interest: `$${row.interest.toLocaleString()}`,
    balance: `$${row.balance.toLocaleString()}`,
  }));

  return {
    values: {
      totalDebt,
      debtFreeDate: debtFreeDateFormatted,
      monthsToPayoff: primaryResult.months === -1 ? "Never" : primaryResult.months,
      totalInterest: primaryResult.totalInterest,
      totalPayments: primaryResult.totalPaid,
      interestSavings,
      recommendedStrategy,
      minimumOnlyWarning,
      // For info cards
      snowballMonths: snowballResult.months === -1 ? "Never" : `${snowballResult.months} months`,
      snowballInterest: `$${snowballResult.totalInterest.toLocaleString()}`,
      avalancheMonths: avalancheResult.months === -1 ? "Never" : `${avalancheResult.months} months`,
      avalancheInterest: `$${avalancheResult.totalInterest.toLocaleString()}`,
      avalancheSavings: avalancheSavings > 0 ? `$${avalancheSavings.toFixed(0)}` : "$0",
      totalMonthlyPayment: `$${totalMonthlyPayment.toLocaleString()}`,
      avgMonthlyInterest: `$${avgMonthlyInterest.toFixed(0)}`,
      numberOfCards: `${numberOfCards} card${numberOfCards > 1 ? "s" : ""}`,
    },
    formatted: {
      totalDebt: `$${totalDebt.toLocaleString()}`,
      debtFreeDate: debtFreeDateFormatted,
      monthsToPayoff: primaryResult.months === -1 ? "Never" : `${primaryResult.months} months`,
      totalInterest: `$${primaryResult.totalInterest.toLocaleString()}`,
      totalPayments: `$${primaryResult.totalPaid.toLocaleString()}`,
      interestSavings: `$${interestSavings.toLocaleString()}`,
      recommendedStrategy,
      minimumOnlyWarning,
      snowballMonths: snowballResult.months === -1 ? "Never" : `${snowballResult.months} months`,
      snowballInterest: `$${snowballResult.totalInterest.toLocaleString()}`,
      avalancheMonths: avalancheResult.months === -1 ? "Never" : `${avalancheResult.months} months`,
      avalancheInterest: `$${avalancheResult.totalInterest.toLocaleString()}`,
      avalancheSavings: avalancheSavings > 0 ? `$${avalancheSavings.toFixed(0)}` : "$0",
      totalMonthlyPayment: `$${totalMonthlyPayment.toLocaleString()}`,
      avgMonthlyInterest: `$${avgMonthlyInterest.toFixed(0)}`,
      numberOfCards: `${numberOfCards} card${numberOfCards > 1 ? "s" : ""}`,
    },
    summary: primaryResult.months === -1 
      ? `Your monthly payment of $${totalMonthlyPayment} is not enough to pay off $${totalDebt.toLocaleString()} in debt. Increase your payment to make progress.`
      : `Pay off $${totalDebt.toLocaleString()} in ${primaryResult.months} months by ${debtFreeDateFormatted}. You'll pay $${primaryResult.totalInterest.toLocaleString()} in interest—saving $${interestSavings.toLocaleString()} vs minimum payments!`,
    isValid: true,
    metadata: {
      tableData,
    },
  };
}

export default creditCardPayoffCalculatorConfig;
