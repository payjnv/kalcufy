import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// PROFIT MARGIN CALCULATOR V3 CONFIG
// =============================================================================

export const profitMarginConfig: CalculatorConfigV3 = {
  id: "profit-margin-calculator",
  slug: "profit-margin-calculator",
  name: "Profit Margin Calculator",
  category: "finance",
  icon: "💰",

  // ═══════════════════════════════════════════════════════════════════════════
  // SEO
  // ═══════════════════════════════════════════════════════════════════════════
  seo: {
    title: "Profit Margin Calculator - Calculate Gross, Net & Operating Margin",
    description: "Free profit margin calculator to find gross margin, markup percentage, and selling price. Calculate margin from cost and revenue, or find the price needed for your target margin. Essential tool for business pricing strategy.",
    shortDescription: "Calculate profit margin, markup, and optimal pricing",
    keywords: [
      "profit margin calculator",
      "gross margin calculator",
      "markup calculator",
      "profit percentage",
      "margin vs markup",
      "pricing calculator",
      "net profit margin",
      "business margin",
      "cost plus pricing",
      "retail margin",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HERO
  // ═══════════════════════════════════════════════════════════════════════════
  hero: {
    badge: "Finance",
    rating: { average: 4.9, count: 34200 },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UNIT SYSTEM (not needed)
  // ═══════════════════════════════════════════════════════════════════════════
  unitSystem: {
    enabled: false,
    default: "metric",
    options: [],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MODES
  // ═══════════════════════════════════════════════════════════════════════════
  modes: {
    enabled: true,
    options: [
      { id: "margin", label: "Calculate Margin", icon: "📊" },
      { id: "price", label: "Find Selling Price", icon: "🏷️" },
      { id: "cost", label: "Find Max Cost", icon: "📉" },
    ],
    default: "margin",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════════════════
  inputs: [
    // Mode: margin - Calculate from cost and revenue
    {
      id: "cost",
      type: "number",
      label: "Cost (COGS)",
      required: true,
      defaultValue: 70,
      min: 0,
      step: 0.01,
      prefix: "$",
      helpText: "Cost of goods sold or production cost",
      modes: ["margin", "price"],
    },
    {
      id: "revenue",
      type: "number",
      label: "Selling Price / Revenue",
      required: true,
      defaultValue: 100,
      min: 0,
      step: 0.01,
      prefix: "$",
      helpText: "Price you sell the product for",
      modes: ["margin", "cost"],
    },
    // Mode: price / cost - Target margin
    {
      id: "desiredMargin",
      type: "slider",
      label: "Target Profit Margin",
      required: true,
      defaultValue: 30,
      min: 1,
      max: 95,
      step: 1,
      suffix: "%",
      helpText: "Your desired profit margin percentage",
      modes: ["price", "cost"],
    },
  ],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════════════════
  results: [
    {
      id: "profitMargin",
      type: "primary",
      label: "Profit Margin",
      format: "number",
      suffix: "%",
    },
    {
      id: "profit",
      type: "secondary",
      label: "Gross Profit",
      format: "number",
      prefix: "$",
    },
    {
      id: "markup",
      type: "secondary",
      label: "Markup",
      format: "number",
      suffix: "%",
    },
    {
      id: "sellingPrice",
      type: "secondary",
      label: "Selling Price",
      format: "number",
      prefix: "$",
    },
    {
      id: "maxCost",
      type: "secondary",
      label: "Maximum Cost",
      format: "number",
      prefix: "$",
    },
    {
      id: "revenuePerDollar",
      type: "secondary",
      label: "Profit per $1 Revenue",
      format: "number",
      prefix: "$",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // INFO CARDS
  // ═══════════════════════════════════════════════════════════════════════════
  infoCards: [
    {
      id: "marginTypes",
      title: "Types of Profit Margin",
      icon: "📊",
      type: "list",
      items: [
        { label: "Gross Margin", value: "Revenue - COGS", color: "blue" },
        { label: "Operating Margin", value: "Gross - OpEx", color: "green" },
        { label: "Net Margin", value: "After all expenses", color: "purple" },
        { label: "Contribution Margin", value: "Revenue - Variable", color: "amber" },
      ],
    },
    {
      id: "quickTips",
      title: "Pricing Strategy Tips",
      icon: "💡",
      type: "horizontal",
      items: [
        { label: "Higher margin ≠ always better (volume matters)" },
        { label: "Know your industry benchmark margins" },
        { label: "Factor in ALL costs, not just COGS" },
        { label: "Test price elasticity before big changes" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCE DATA
  // ═══════════════════════════════════════════════════════════════════════════
  referenceData: [
    {
      id: "industryMargins",
      title: "Typical Gross Margins by Industry",
      icon: "🏭",
      columns: 2,
      items: [
        { label: "Software/SaaS", value: "70-90%" },
        { label: "Retail (Clothing)", value: "45-65%" },
        { label: "Restaurants", value: "60-70%" },
        { label: "Grocery", value: "20-30%" },
        { label: "Manufacturing", value: "25-35%" },
        { label: "E-commerce", value: "40-60%" },
        { label: "Professional Services", value: "50-70%" },
        { label: "Automotive", value: "10-20%" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  educationSections: [
    // Margin vs Markup Cards
    {
      id: "marginVsMarkup",
      type: "cards",
      title: "Margin vs Markup: Key Difference",
      icon: "⚖️",
      columns: 2,
      cards: [
        {
          title: "Profit Margin",
          description: "Calculated as a percentage of SELLING PRICE. A 30% margin means $0.30 profit for every $1 of revenue. Formula: (Profit ÷ Revenue) × 100",
          icon: "📊",
        },
        {
          title: "Markup",
          description: "Calculated as a percentage of COST. A 30% markup means adding $0.30 to every $1 of cost. Formula: (Profit ÷ Cost) × 100",
          icon: "🏷️",
        },
      ],
    },
    // Ways to Improve Margin
    {
      id: "improveMargin",
      type: "cards",
      title: "Ways to Improve Profit Margin",
      icon: "📈",
      columns: 2,
      cards: [
        {
          title: "Raise Prices Strategically",
          description: "Test price increases on premium products or new customers first. Even small increases can significantly impact margin.",
          icon: "💰",
        },
        {
          title: "Reduce Costs",
          description: "Negotiate with suppliers, reduce waste, automate processes, and optimize your supply chain.",
          icon: "📉",
        },
        {
          title: "Focus on High-Margin Products",
          description: "Promote and prioritize your most profitable offerings. Consider discontinuing low-margin items.",
          icon: "🎯",
        },
        {
          title: "Improve Operational Efficiency",
          description: "Streamline processes, reduce overhead, and invest in technology that reduces labor costs.",
          icon: "⚙️",
        },
      ],
    },
    // REQUIRED: Important Considerations
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        {
          text: "Margin and markup are NOT the same. A 50% markup equals only a 33% margin. Many businesses confuse these, leading to pricing errors.",
          type: "warning",
        },
        {
          text: "Gross margin only considers direct costs (COGS). For true profitability, calculate operating and net margins that include overhead.",
          type: "info",
        },
        {
          text: "Industry benchmarks vary widely. A 20% margin is excellent in grocery but poor in software. Compare to your specific industry.",
          type: "info",
        },
        {
          text: "Higher margins don't always mean more profit. A 10% margin on $1M revenue beats a 50% margin on $100K revenue.",
          type: "warning",
        },
        {
          text: "Consider price elasticity - raising prices may reduce volume enough to decrease total profit despite higher margin.",
          type: "info",
        },
        {
          text: "Don't forget hidden costs like shipping, returns, payment processing fees, and customer acquisition costs.",
          type: "warning",
        },
      ],
    },
    // REQUIRED: Example Calculation
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculations",
      icon: "🧮",
      description: "Product costs $70 to produce, sells for $100",
      columns: 2,
      examples: [
        {
          title: "Calculate Margin & Markup",
          steps: [
            "Cost (COGS): $70",
            "Selling Price: $100",
            "Profit: $100 - $70 = $30",
            "Margin: ($30 ÷ $100) × 100 = 30%",
            "Markup: ($30 ÷ $70) × 100 = 42.9%",
          ],
          result: "Margin: 30% | Markup: 42.9%",
        },
        {
          title: "Find Price for 40% Margin",
          steps: [
            "Cost: $70",
            "Target Margin: 40%",
            "Price = Cost ÷ (1 - Margin)",
            "Price = $70 ÷ (1 - 0.40)",
            "Price = $70 ÷ 0.60 = $116.67",
          ],
          result: "Selling Price: $116.67",
        },
      ],
    },
    // Prose: What is Profit Margin
    {
      id: "whatIsMargin",
      type: "prose",
      title: "What is Profit Margin?",
      content: "Profit margin is a financial metric that shows the percentage of revenue that remains as profit after costs are deducted. It's one of the most important indicators of business health and pricing efficiency. There are several types: Gross margin (revenue minus cost of goods sold), Operating margin (gross profit minus operating expenses), and Net margin (profit after ALL expenses including taxes and interest). Higher margins generally indicate better efficiency, but optimal margins vary significantly by industry and business model.",
    },
    // Prose: Margin vs Markup Confusion
    {
      id: "marginMarkupConfusion",
      type: "prose",
      title: "The Margin vs Markup Confusion",
      content: "One of the most common pricing mistakes is confusing margin and markup. They sound similar but calculate very differently. Margin is based on selling price, while markup is based on cost. For example, if you want a 50% margin, you need a 100% markup (double your cost). If you apply a 50% markup thinking you'll get a 50% margin, you'll actually only achieve a 33% margin. This error can severely impact profitability, especially at scale.",
    },
    // Prose: When to Focus on Margin
    {
      id: "whenToFocus",
      type: "prose",
      title: "When to Focus on Margin vs Volume",
      content: "High-margin strategies work best for premium products, niche markets, or businesses with high customer acquisition costs. Low-margin, high-volume strategies suit commoditized products, large markets, and businesses with efficient operations. Many successful businesses combine both - using low-margin products to drive traffic and high-margin products for profit. The key is understanding your customer's price sensitivity and your competitive position.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // FAQs
  // ═══════════════════════════════════════════════════════════════════════════
  faqs: [
    {
      question: "What's the difference between profit margin and markup?",
      answer: "Margin is calculated as a percentage of the selling price (Profit ÷ Price × 100), while markup is calculated as a percentage of cost (Profit ÷ Cost × 100). For example, if a product costs $60 and sells for $100, the margin is 40% ($40÷$100) but the markup is 66.7% ($40÷$60). This distinction is crucial for pricing strategy.",
    },
    {
      question: "What's a good profit margin for my business?",
      answer: "It varies dramatically by industry. Software and SaaS typically achieve 70-90% gross margins. Retail clothing ranges 45-65%. Restaurants aim for 60-70% on food. Grocery operates on thin 20-30% margins. Compare your margins to industry benchmarks rather than arbitrary targets.",
    },
    {
      question: "How do I convert markup to margin?",
      answer: "Use this formula: Margin = Markup ÷ (1 + Markup). For example, a 50% markup (0.50) converts to: 0.50 ÷ 1.50 = 0.333 or 33.3% margin. Conversely, to convert margin to markup: Markup = Margin ÷ (1 - Margin). A 40% margin equals: 0.40 ÷ 0.60 = 66.7% markup.",
    },
    {
      question: "What's the difference between gross, operating, and net margin?",
      answer: "Gross margin = (Revenue - COGS) ÷ Revenue. It only considers direct production costs. Operating margin subtracts operating expenses (rent, salaries, marketing) from gross profit. Net margin is after ALL expenses including taxes and interest. Each tells a different story about business health.",
    },
    {
      question: "Should I price based on cost-plus or value-based pricing?",
      answer: "Cost-plus pricing (adding a fixed markup to cost) is simple but may leave money on the table. Value-based pricing sets prices according to customer perceived value, often achieving higher margins. Most businesses benefit from a hybrid approach - using cost as a floor but adjusting based on market positioning and customer willingness to pay.",
    },
    {
      question: "How can I increase profit margin without raising prices?",
      answer: "Focus on reducing costs: negotiate better supplier terms, reduce waste, automate processes, optimize inventory. Also consider your product mix - promoting high-margin items while phasing out low-margin ones. Improving operational efficiency and reducing overhead costs can significantly boost margins without touching prices.",
    },
    {
      question: "Why is my margin lower than my markup percentage?",
      answer: "Margin will always be lower than markup for the same product because they use different denominators. Margin uses the larger selling price as its base, while markup uses the smaller cost. A 100% markup only yields a 50% margin because you're dividing the same profit by a larger number (revenue vs cost).",
    },
    {
      question: "How do I calculate the selling price for a target margin?",
      answer: "Use the formula: Selling Price = Cost ÷ (1 - Target Margin). For example, if your cost is $60 and you want a 40% margin: $60 ÷ (1 - 0.40) = $60 ÷ 0.60 = $100. This ensures your final margin is exactly what you targeted, not the common mistake of simply adding the percentage to cost.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════════════════
  references: [
    {
      authors: "Investopedia",
      year: "2024",
      title: "Profit Margin: Definition, Types, Uses in Business and Investing",
      source: "Investopedia Financial Education",
      url: "https://www.investopedia.com/terms/p/profitmargin.asp",
    },
    {
      authors: "Corporate Finance Institute",
      year: "2024",
      title: "Profit Margin - Guide to Understanding Profit Margins",
      source: "CFI Education",
      url: "https://corporatefinanceinstitute.com/resources/accounting/profit-margin/",
    },
    {
      authors: "Harvard Business Review",
      year: "2023",
      title: "A Refresher on Gross Profit Margin",
      source: "Harvard Business Review",
    },
    {
      authors: "NYU Stern School of Business",
      year: "2024",
      title: "Margins by Sector (US)",
      source: "Damodaran Online - Data Archives",
      url: "https://pages.stern.nyu.edu/~adamodar/",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // DETAILED TABLE (Margin/Markup Conversion)
  // ═══════════════════════════════════════════════════════════════════════════
  detailedTable: {
    id: "marginMarkupTable",
    buttonLabel: "View Margin ↔ Markup Table",
    buttonIcon: "📋",
    modalTitle: "Margin to Markup Conversion Chart",
    columns: [
      { id: "margin", label: "Margin %", align: "center" },
      { id: "markup", label: "Markup %", align: "center", highlight: true },
      { id: "multiplier", label: "Price Multiplier", align: "center" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SIDEBAR
  // ═══════════════════════════════════════════════════════════════════════════
  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: false,
    category: "finance",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FEATURES
  // ═══════════════════════════════════════════════════════════════════════════
  features: {
    autoCalculate: true,
    exportPDF: true,
    shareResults: true,
    saveHistory: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // RELATED CALCULATORS
  // ═══════════════════════════════════════════════════════════════════════════
  relatedCalculators: [
    "roi-calculator",
    "break-even-calculator",
    "discount-calculator",
    "sales-tax-calculator",
    "compound-interest-calculator",
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // ADS
  // ═══════════════════════════════════════════════════════════════════════════
  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
  },
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateProfitMargin(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
  mode?: string;
}): CalculatorResults {
  const { values, mode = "margin" } = data;

  const cost = (values.cost as number) || 0;
  const revenue = (values.revenue as number) || 0;
  const desiredMargin = (values.desiredMargin as number) || 30;

  let profit = 0;
  let profitMargin = 0;
  let markup = 0;
  let sellingPrice = 0;
  let maxCost = 0;

  if (mode === "margin") {
    // Calculate from cost and revenue
    profit = revenue - cost;
    profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0;
    markup = cost > 0 ? (profit / cost) * 100 : 0;
    sellingPrice = revenue;
    maxCost = cost;
  } else if (mode === "price") {
    // Calculate selling price from cost and desired margin
    sellingPrice = desiredMargin < 100 ? cost / (1 - desiredMargin / 100) : 0;
    profit = sellingPrice - cost;
    profitMargin = desiredMargin;
    markup = cost > 0 ? (profit / cost) * 100 : 0;
    maxCost = cost;
  } else if (mode === "cost") {
    // Calculate max cost from revenue and desired margin
    maxCost = revenue * (1 - desiredMargin / 100);
    profit = revenue - maxCost;
    profitMargin = desiredMargin;
    markup = maxCost > 0 ? (profit / maxCost) * 100 : 0;
    sellingPrice = revenue;
  }

  // Profit per dollar of revenue
  const revenuePerDollar = profitMargin / 100;

  // Generate margin/markup conversion table
  const tableData = [
    { margin: "10%", markup: "11.1%", multiplier: "1.11x" },
    { margin: "15%", markup: "17.6%", multiplier: "1.18x" },
    { margin: "20%", markup: "25.0%", multiplier: "1.25x" },
    { margin: "25%", markup: "33.3%", multiplier: "1.33x" },
    { margin: "30%", markup: "42.9%", multiplier: "1.43x" },
    { margin: "35%", markup: "53.8%", multiplier: "1.54x" },
    { margin: "40%", markup: "66.7%", multiplier: "1.67x" },
    { margin: "45%", markup: "81.8%", multiplier: "1.82x" },
    { margin: "50%", markup: "100.0%", multiplier: "2.00x" },
    { margin: "60%", markup: "150.0%", multiplier: "2.50x" },
    { margin: "70%", markup: "233.3%", multiplier: "3.33x" },
    { margin: "80%", markup: "400.0%", multiplier: "5.00x" },
  ];

  // Determine which results to show based on mode
  const isValid = (mode === "margin" && revenue > 0) || 
                  (mode === "price" && cost > 0 && desiredMargin < 100) ||
                  (mode === "cost" && revenue > 0);

  return {
    values: {
      profit,
      profitMargin,
      markup,
      sellingPrice,
      maxCost,
      revenuePerDollar,
    },
    formatted: {
      profit: profit.toFixed(2),
      profitMargin: profitMargin.toFixed(1),
      markup: markup.toFixed(1),
      sellingPrice: sellingPrice.toFixed(2),
      maxCost: maxCost.toFixed(2),
      revenuePerDollar: revenuePerDollar.toFixed(2),
    },
    summary: `Profit Margin: ${profitMargin.toFixed(1)}% | Markup: ${markup.toFixed(1)}% | Profit: $${profit.toFixed(2)}`,
    isValid,
    metadata: {
      tableData,
      mode,
    },
  };
}

// =============================================================================
// VISIBLE RESULTS BY MODE
// =============================================================================
export function getProfitMarginVisibleResults(
  results: CalculatorResults,
  state: Record<string, unknown>
): string[] {
  const mode = state.mode as string || "margin";

  const baseResults = ["profitMargin", "profit", "markup", "revenuePerDollar"];

  if (mode === "price") {
    return ["profitMargin", "sellingPrice", "profit", "markup"];
  } else if (mode === "cost") {
    return ["profitMargin", "maxCost", "profit", "markup"];
  }

  return baseResults;
}

export default profitMarginConfig;
