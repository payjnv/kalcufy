import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// DISCOUNT CALCULATOR V3 - CONFIG
// Competitive advantages vs Calculator.net, OmniCalc, Percent-off.com:
// - Multiple discount types (%, $, BOGO, 3-for-2)
// - Stacked discounts (up to 3)
// - Sales tax before/after discount option
// - Deal comparison mode
// - Per-unit price calculator
// - Effective discount percentage
// - Quick discount presets
// =============================================================================

export const discountCalculatorConfig: CalculatorConfigV3 = {
  id: "discount-calculator",
  slug: "discount-calculator",
  name: "Discount Calculator",
  category: "everyday",
  icon: "🏷️",

  seo: {
    title: "Discount Calculator - % Off, BOGO, Stacked Discounts & Tax",
    description: "Free discount calculator for percent off, dollar off, BOGO deals, stacked discounts. Calculate final price with sales tax, compare deals, and find true savings.",
    shortDescription: "Calculate discounts, BOGO deals, stacked savings with tax",
    keywords: ["discount calculator", "percent off", "sale price", "BOGO", "stacked discounts", "savings calculator", "deal comparison"],
  },

  hero: {
    badge: "Everyday",
    rating: { average: 4.9, count: 24500 },
  },

  unitSystem: { enabled: false, default: "metric", options: [] },

  // ═══════════════════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════════════════
  inputs: [
    {
      id: "calculationMode",
      type: "select",
      label: "Calculation Type",
      required: true,
      defaultValue: "percentOff",
      options: [
        { value: "percentOff", label: "📉 Percent Off (% discount)" },
        { value: "dollarOff", label: "💵 Dollar Off (fixed amount)" },
        { value: "findOriginal", label: "🔍 Find Original Price" },
        { value: "findPercent", label: "📊 Find Discount %" },
        { value: "bogo", label: "🎁 BOGO (Buy One Get One)" },
        { value: "bulkDeal", label: "📦 Bulk Deal (3 for 2, etc.)" },
        { value: "compare", label: "⚖️ Compare Deals" },
      ],
    },
    // ─────────────────────────────────────────────────────────────────────────
    // STANDARD DISCOUNT INPUTS
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "originalPrice",
      type: "number",
      label: "Original Price",
      required: true,
      defaultValue: 100,
      min: 0.01, max: 1000000, step: 0.01,
      prefix: "$",
      showWhen: { field: "calculationMode", value: ["percentOff", "dollarOff", "bogo", "bulkDeal"] },
    },
    {
      id: "discountPercent",
      type: "number",
      label: "Discount Percent",
      required: false,
      defaultValue: 20,
      min: 0, max: 100, step: 1,
      suffix: "%",
      showWhen: { field: "calculationMode", value: ["percentOff", "findOriginal"] },
    },
    // Quick discount presets
    {
      id: "quickDiscount",
      type: "select",
      label: "Quick Presets",
      required: false,
      defaultValue: "custom",
      options: [
        { value: "custom", label: "Custom %" },
        { value: "10", label: "10% off" },
        { value: "15", label: "15% off" },
        { value: "20", label: "20% off" },
        { value: "25", label: "25% off" },
        { value: "30", label: "30% off" },
        { value: "40", label: "40% off" },
        { value: "50", label: "50% off" },
        { value: "60", label: "60% off" },
        { value: "70", label: "70% off" },
      ],
      showWhen: { field: "calculationMode", value: "percentOff" },
    },
    {
      id: "dollarOff",
      type: "number",
      label: "Amount Off",
      required: false,
      defaultValue: 25,
      min: 0, max: 1000000, step: 0.01,
      prefix: "$",
      showWhen: { field: "calculationMode", value: "dollarOff" },
    },
    // ─────────────────────────────────────────────────────────────────────────
    // FIND ORIGINAL / FIND PERCENT
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "salePrice",
      type: "number",
      label: "Sale Price",
      required: false,
      defaultValue: 80,
      min: 0.01, max: 1000000, step: 0.01,
      prefix: "$",
      showWhen: { field: "calculationMode", value: ["findOriginal", "findPercent"] },
    },
    {
      id: "originalPriceForPercent",
      type: "number",
      label: "Original Price",
      required: false,
      defaultValue: 100,
      min: 0.01, max: 1000000, step: 0.01,
      prefix: "$",
      showWhen: { field: "calculationMode", value: "findPercent" },
    },
    // ─────────────────────────────────────────────────────────────────────────
    // STACKED DISCOUNTS
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "useStackedDiscounts",
      type: "radio",
      label: "Stack Additional Discounts?",
      required: false,
      defaultValue: "no",
      options: [
        { value: "no", label: "No, single discount" },
        { value: "yes", label: "Yes, add more discounts" },
      ],
      showWhen: { field: "calculationMode", value: ["percentOff", "dollarOff"] },
    },
    {
      id: "discount2Type",
      type: "select",
      label: "2nd Discount Type",
      required: false,
      defaultValue: "percent",
      options: [
        { value: "percent", label: "Percent (%)" },
        { value: "dollar", label: "Dollar ($)" },
      ],
      showWhen: { field: "useStackedDiscounts", value: "yes" },
    },
    {
      id: "discount2Value",
      type: "number",
      label: "2nd Discount Value",
      required: false,
      defaultValue: 10,
      min: 0, max: 1000, step: 0.01,
      width: "half",
      showWhen: { field: "useStackedDiscounts", value: "yes" },
    },
    {
      id: "discount3Type",
      type: "select",
      label: "3rd Discount Type",
      required: false,
      defaultValue: "percent",
      options: [
        { value: "percent", label: "Percent (%)" },
        { value: "dollar", label: "Dollar ($)" },
      ],
      showWhen: { field: "useStackedDiscounts", value: "yes" },
    },
    {
      id: "discount3Value",
      type: "number",
      label: "3rd Discount Value",
      required: false,
      defaultValue: 0,
      min: 0, max: 1000, step: 0.01,
      width: "half",
      showWhen: { field: "useStackedDiscounts", value: "yes" },
    },
    // ─────────────────────────────────────────────────────────────────────────
    // BOGO OPTIONS
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "bogoType",
      type: "select",
      label: "BOGO Deal Type",
      required: false,
      defaultValue: "free",
      options: [
        { value: "free", label: "Buy 1, Get 1 FREE (50% off)" },
        { value: "half", label: "Buy 1, Get 1 50% OFF (25% off)" },
        { value: "percent", label: "Buy 1, Get 1 X% OFF" },
      ],
      showWhen: { field: "calculationMode", value: "bogo" },
    },
    {
      id: "bogoPercent",
      type: "number",
      label: "2nd Item Discount",
      required: false,
      defaultValue: 30,
      min: 1, max: 100, step: 1,
      suffix: "%",
      showWhen: { field: "bogoType", value: "percent" },
    },
    {
      id: "item2Price",
      type: "number",
      label: "2nd Item Price (if different)",
      required: false,
      defaultValue: 0,
      min: 0, max: 1000000, step: 0.01,
      prefix: "$",
      helpText: "Leave 0 if same price",
      showWhen: { field: "calculationMode", value: "bogo" },
    },
    // ─────────────────────────────────────────────────────────────────────────
    // BULK DEAL OPTIONS
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "bulkType",
      type: "select",
      label: "Bulk Deal Type",
      required: false,
      defaultValue: "3for2",
      options: [
        { value: "3for2", label: "Buy 3, Pay for 2 (33% off)" },
        { value: "4for3", label: "Buy 4, Pay for 3 (25% off)" },
        { value: "5for4", label: "Buy 5, Pay for 4 (20% off)" },
        { value: "custom", label: "Custom (Buy X, Pay Y)" },
      ],
      showWhen: { field: "calculationMode", value: "bulkDeal" },
    },
    {
      id: "buyQuantity",
      type: "number",
      label: "Buy Quantity",
      required: false,
      defaultValue: 3,
      min: 2, max: 100, step: 1,
      width: "half",
      showWhen: { field: "bulkType", value: "custom" },
    },
    {
      id: "payQuantity",
      type: "number",
      label: "Pay For",
      required: false,
      defaultValue: 2,
      min: 1, max: 99, step: 1,
      width: "half",
      showWhen: { field: "bulkType", value: "custom" },
    },
    // ─────────────────────────────────────────────────────────────────────────
    // COMPARE DEALS
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "comparePrice",
      type: "number",
      label: "Item Price",
      required: false,
      defaultValue: 100,
      min: 0.01, max: 1000000, step: 0.01,
      prefix: "$",
      showWhen: { field: "calculationMode", value: "compare" },
    },
    {
      id: "deal1Percent",
      type: "number",
      label: "Deal A: Percent Off",
      required: false,
      defaultValue: 25,
      min: 0, max: 100, step: 1,
      suffix: "%",
      width: "half",
      showWhen: { field: "calculationMode", value: "compare" },
    },
    {
      id: "deal2Dollar",
      type: "number",
      label: "Deal B: Dollar Off",
      required: false,
      defaultValue: 20,
      min: 0, max: 1000000, step: 0.01,
      prefix: "$",
      width: "half",
      showWhen: { field: "calculationMode", value: "compare" },
    },
    // ─────────────────────────────────────────────────────────────────────────
    // SALES TAX
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "includeTax",
      type: "radio",
      label: "Include Sales Tax?",
      required: false,
      defaultValue: "no",
      options: [
        { value: "no", label: "No tax" },
        { value: "after", label: "Tax after discount" },
        { value: "before", label: "Tax before discount" },
      ],
    },
    {
      id: "taxRate",
      type: "number",
      label: "Tax Rate",
      required: false,
      defaultValue: 8,
      min: 0, max: 25, step: 0.1,
      suffix: "%",
      helpText: "US avg: 5-10%",
      showWhen: { field: "includeTax", value: ["after", "before"] },
    },
  ],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════════════════
  results: [
    { id: "finalPrice", type: "primary", label: "Final Price", format: "text" },
    { id: "youSave", type: "secondary", label: "You Save", format: "text" },
    { id: "effectiveDiscount", type: "secondary", label: "Effective Discount", format: "text" },
    { id: "pricePerUnit", type: "secondary", label: "Price Per Unit", format: "text" },
    { id: "taxAmount", type: "secondary", label: "Tax Amount", format: "text" },
    { id: "originalTotal", type: "secondary", label: "Original Total", format: "text" },
    { id: "dealComparison", type: "secondary", label: "Best Deal", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // INFO CARDS (Required by V3)
  // ═══════════════════════════════════════════════════════════════════════════
  infoCards: [
    {
      type: "list",
      title: "Quick Discount Facts",
      icon: "💡",
      items: [
        { label: "50% off", value: "= Half price" },
        { label: "33% off", value: "= Buy 2, Get 1 Free" },
        { label: "25% off", value: "= Buy 3, Get 1 Free" },
        { label: "20% off", value: "= Buy 4, Get 1 Free" },
      ],
    },
    {
      type: "horizontal",
      title: "BOGO Equivalents",
      icon: "🎁",
      items: [
        { label: "BOGO Free", value: "50% off 2 items" },
        { label: "BOGO 50%", value: "25% off 2 items" },
        { label: "Buy 2 Get 1", value: "33% off 3 items" },
        { label: "Buy 3 Get 1", value: "25% off 4 items" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCE DATA (Required by V3)
  // ═══════════════════════════════════════════════════════════════════════════
  referenceData: [
    {
      id: "saleEvents",
      title: "Common Sale Events",
      icon: "📅",
      columns: [
        { key: "event", label: "Sale Event" },
        { key: "discount", label: "Typical Discount" },
        { key: "when", label: "When" },
      ],
      data: [
        { event: "Black Friday", discount: "40-70% off", when: "Late November" },
        { event: "Cyber Monday", discount: "30-60% off", when: "After Thanksgiving" },
        { event: "Prime Day", discount: "20-50% off", when: "July" },
        { event: "End of Season", discount: "50-80% off", when: "Jan & July" },
        { event: "Back to School", discount: "15-40% off", when: "Aug-Sept" },
        { event: "Memorial Day", discount: "20-40% off", when: "Late May" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  educationSections: [
    {
      id: "discountTypes",
      type: "cards",
      title: "Discount Types Explained",
      icon: "🏷️",
      columns: 2,
      cards: [
        {
          title: "Percent Off (%)",
          description: "Reduces price by a percentage. A 20% discount on $100 saves $20, giving you a final price of $80.",
          icon: "📉",
        },
        {
          title: "Dollar Off ($)",
          description: "Subtracts a fixed amount. $25 off a $100 item gives you a final price of $75, regardless of the original price.",
          icon: "💵",
        },
        {
          title: "BOGO Deals",
          description: "Buy One Get One Free (BOGOF) is effectively 50% off when buying 2. BOGO 50% off equals 25% total savings.",
          icon: "🎁",
        },
        {
          title: "Stacked Discounts",
          description: "Multiple discounts applied sequentially. 20% + 10% ≠ 30%! It's actually 28% because the second discount applies to the already-reduced price.",
          icon: "📊",
        },
      ],
    },
    {
      id: "considerations",
      type: "list",
      title: "Smart Shopping Tips",
      icon: "💡",
      items: [
        { text: "Stacked discounts multiply, they don't add: 20% + 10% off = 28% total, not 30%", type: "warning" },
        { text: "Compare % off vs $ off - which saves more depends on the original price", type: "info" },
        { text: "BOGO Free = 50% off when buying 2 items of equal price", type: "info" },
        { text: "Most stores apply sales tax AFTER discounts, but check your receipt", type: "warning" },
        { text: "Per-unit price is key for bulk deals - sometimes 'deals' aren't actually cheaper", type: "info" },
        { text: "Check price history before big sales - some 'discounts' start from inflated prices", type: "warning" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculations",
      icon: "📊",
      description: "How stacked and BOGO discounts really work",
      columns: 2,
      examples: [
        {
          title: "Stacked: 30% + 15% off $250",
          steps: [
            "Original: $250",
            "After 30%: $250 × 0.70 = $175",
            "After 15%: $175 × 0.85 = $148.75",
            "Total saved: $101.25",
          ],
          result: "Effective discount: 40.5% (not 45%!)",
        },
        {
          title: "BOGO Free on $40 items",
          steps: [
            "Item 1: $40 (full price)",
            "Item 2: $0 (FREE)",
            "Total for 2: $40",
            "Per item: $20",
          ],
          result: "Effective discount: 50% off each",
        },
      ],
    },
    {
      id: "formulas",
      type: "prose",
      title: "Discount Formulas",
      icon: "🧮",
      content: "Percent Off: Final Price = Original × (1 - Discount/100). Dollar Off: Final Price = Original - Amount. Find Discount %: Discount = ((Original - Sale) / Original) × 100. Find Original: Original = Sale Price / (1 - Discount/100). Stacked Discounts: Apply each discount to the running total, not the original price.",
    },
    {
      id: "dealComparison",
      type: "prose",
      title: "Comparing Deals",
      icon: "⚖️",
      content: "When comparing % off vs $ off deals, the winner depends on the price. For example, on a $50 item: 20% off saves $10, while $15 off saves $15 - the dollar discount wins. But on a $100 item: 20% off saves $20, beating the $15 coupon. Always calculate both to find the better deal. Use our Compare Deals mode to instantly see which offer saves you more money.",
    },
    {
      id: "taxConsiderations",
      type: "prose",
      title: "Sales Tax & Discounts",
      icon: "🧾",
      content: "In most US states, sales tax is applied AFTER discounts are taken. This means you pay tax on the discounted price, not the original. For example, a $100 item at 20% off with 8% tax: Final = ($100 - $20) × 1.08 = $86.40. However, some states and situations apply tax before discounts, resulting in a higher total. Always check your receipt to understand how your store calculates tax.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // FAQs
  // ═══════════════════════════════════════════════════════════════════════════
  faqs: [
    {
      question: "Do stacked discounts add together?",
      answer: "No! Stacked discounts multiply, not add. A 20% discount followed by 10% off doesn't equal 30% total. Instead: $100 × 0.80 = $80, then $80 × 0.90 = $72. That's 28% off total, not 30%. The second discount applies to the already-reduced price.",
    },
    {
      question: "What's the real savings on Buy One Get One Free?",
      answer: "BOGO Free gives you 50% off when buying two items of equal price. If each item is $40, you pay $40 for both ($20 each). However, if the items have different prices, you typically get the cheaper one free, so savings may be less than 50%.",
    },
    {
      question: "Is % off or $ off better?",
      answer: "It depends on the price! Use this rule: multiply the price by the % and compare to the $ off amount. For $60 item: 25% off = $15 savings. If you have a $20 coupon, the coupon wins. Our Compare Deals mode does this math instantly.",
    },
    {
      question: "How is sales tax calculated with discounts?",
      answer: "In most US states, sales tax is applied AFTER discounts. So if a $100 item is 20% off ($80) with 8% tax, you pay $80 + $6.40 = $86.40. Some states apply tax before discounts, which costs more. Always check your receipt.",
    },
    {
      question: "What does '3 for 2' actually save me?",
      answer: "Buy 3, Pay for 2 means you get one item free - that's 33.33% off if all items are the same price. Similarly, Buy 4 Pay 3 = 25% off, and Buy 5 Pay 4 = 20% off. The more you buy, the lower the per-item savings percentage.",
    },
    {
      question: "How do I find the original price from a sale price?",
      answer: "Use the formula: Original = Sale Price ÷ (1 - Discount/100). If something is on sale for $60 at 25% off: $60 ÷ 0.75 = $80 original price. Our Find Original Price mode does this calculation automatically.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════════════════
  references: [
    {
      authors: "Federal Trade Commission",
      year: "2023",
      title: "Truth in Advertising: Guides Against Deceptive Pricing",
      source: "FTC.gov",
      url: "https://www.ftc.gov/business-guidance/resources/advertising-faqs",
    },
    {
      authors: "Baye, M. & Prince, J.",
      year: "2022",
      title: "Managerial Economics and Business Strategy",
      source: "McGraw-Hill Education, 10th Edition",
    },
  ],

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "everyday" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["percentage-calculator", "tip-calculator", "sales-tax-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateDiscount(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;
  
  const mode = values.calculationMode as string || "percentOff";
  const includeTax = values.includeTax as string || "no";
  const taxRate = Number(values.taxRate) || 0;
  
  let finalPrice = 0;
  let originalTotal = 0;
  let savings = 0;
  let effectiveDiscount = 0;
  let pricePerUnit = 0;
  let taxAmount = 0;
  let dealComparison = "";
  let quantity = 1;
  
  // ─────────────────────────────────────────────────────────────────────────
  // PERCENT OFF
  // ─────────────────────────────────────────────────────────────────────────
  if (mode === "percentOff") {
    originalTotal = Number(values.originalPrice) || 0;
    
    // Check for quick preset
    let discount = Number(values.discountPercent) || 0;
    const quickDiscount = values.quickDiscount as string;
    if (quickDiscount && quickDiscount !== "custom") {
      discount = Number(quickDiscount);
    }
    
    // Apply first discount
    finalPrice = originalTotal * (1 - discount / 100);
    
    // Apply stacked discounts if enabled
    if (values.useStackedDiscounts === "yes") {
      const d2Type = values.discount2Type as string || "percent";
      const d2Value = Number(values.discount2Value) || 0;
      const d3Type = values.discount3Type as string || "percent";
      const d3Value = Number(values.discount3Value) || 0;
      
      if (d2Value > 0) {
        if (d2Type === "percent") {
          finalPrice = finalPrice * (1 - d2Value / 100);
        } else {
          finalPrice = Math.max(0, finalPrice - d2Value);
        }
      }
      
      if (d3Value > 0) {
        if (d3Type === "percent") {
          finalPrice = finalPrice * (1 - d3Value / 100);
        } else {
          finalPrice = Math.max(0, finalPrice - d3Value);
        }
      }
    }
    
    savings = originalTotal - finalPrice;
    effectiveDiscount = originalTotal > 0 ? (savings / originalTotal) * 100 : 0;
    pricePerUnit = finalPrice;
  }
  
  // ─────────────────────────────────────────────────────────────────────────
  // DOLLAR OFF
  // ─────────────────────────────────────────────────────────────────────────
  else if (mode === "dollarOff") {
    originalTotal = Number(values.originalPrice) || 0;
    const dollarOff = Number(values.dollarOff) || 0;
    
    finalPrice = Math.max(0, originalTotal - dollarOff);
    
    // Apply stacked discounts if enabled
    if (values.useStackedDiscounts === "yes") {
      const d2Type = values.discount2Type as string || "percent";
      const d2Value = Number(values.discount2Value) || 0;
      const d3Type = values.discount3Type as string || "percent";
      const d3Value = Number(values.discount3Value) || 0;
      
      if (d2Value > 0) {
        if (d2Type === "percent") {
          finalPrice = finalPrice * (1 - d2Value / 100);
        } else {
          finalPrice = Math.max(0, finalPrice - d2Value);
        }
      }
      
      if (d3Value > 0) {
        if (d3Type === "percent") {
          finalPrice = finalPrice * (1 - d3Value / 100);
        } else {
          finalPrice = Math.max(0, finalPrice - d3Value);
        }
      }
    }
    
    savings = originalTotal - finalPrice;
    effectiveDiscount = originalTotal > 0 ? (savings / originalTotal) * 100 : 0;
    pricePerUnit = finalPrice;
  }
  
  // ─────────────────────────────────────────────────────────────────────────
  // FIND ORIGINAL PRICE
  // ─────────────────────────────────────────────────────────────────────────
  else if (mode === "findOriginal") {
    const salePrice = Number(values.salePrice) || 0;
    const discount = Number(values.discountPercent) || 0;
    
    if (discount >= 100) {
      return {
        values: {},
        formatted: { finalPrice: "Invalid discount (must be < 100%)" },
        summary: "Discount cannot be 100% or more",
        isValid: false,
      };
    }
    
    originalTotal = salePrice / (1 - discount / 100);
    finalPrice = salePrice;
    savings = originalTotal - salePrice;
    effectiveDiscount = discount;
    pricePerUnit = salePrice;
  }
  
  // ─────────────────────────────────────────────────────────────────────────
  // FIND DISCOUNT PERCENT
  // ─────────────────────────────────────────────────────────────────────────
  else if (mode === "findPercent") {
    originalTotal = Number(values.originalPriceForPercent) || 0;
    const salePrice = Number(values.salePrice) || 0;
    
    if (originalTotal <= 0) {
      return {
        values: {},
        formatted: { finalPrice: "Enter original price" },
        summary: "Original price required",
        isValid: false,
      };
    }
    
    finalPrice = salePrice;
    savings = originalTotal - salePrice;
    effectiveDiscount = (savings / originalTotal) * 100;
    pricePerUnit = salePrice;
  }
  
  // ─────────────────────────────────────────────────────────────────────────
  // BOGO DEALS
  // ─────────────────────────────────────────────────────────────────────────
  else if (mode === "bogo") {
    const item1Price = Number(values.originalPrice) || 0;
    let item2Price = Number(values.item2Price) || 0;
    if (item2Price === 0) item2Price = item1Price;
    
    const bogoType = values.bogoType as string || "free";
    
    originalTotal = item1Price + item2Price;
    quantity = 2;
    
    if (bogoType === "free") {
      // Buy 1, Get 1 FREE - second item is free
      finalPrice = item1Price; // Only pay for first item
    } else if (bogoType === "half") {
      // Buy 1, Get 1 50% off
      finalPrice = item1Price + (item2Price * 0.5);
    } else {
      // Buy 1, Get 1 X% off
      const bogoPercent = Number(values.bogoPercent) || 30;
      finalPrice = item1Price + (item2Price * (1 - bogoPercent / 100));
    }
    
    savings = originalTotal - finalPrice;
    effectiveDiscount = (savings / originalTotal) * 100;
    pricePerUnit = finalPrice / 2;
  }
  
  // ─────────────────────────────────────────────────────────────────────────
  // BULK DEALS (3 for 2, etc.)
  // ─────────────────────────────────────────────────────────────────────────
  else if (mode === "bulkDeal") {
    const itemPrice = Number(values.originalPrice) || 0;
    const bulkType = values.bulkType as string || "3for2";
    
    let buyQty = 3;
    let payQty = 2;
    
    if (bulkType === "3for2") { buyQty = 3; payQty = 2; }
    else if (bulkType === "4for3") { buyQty = 4; payQty = 3; }
    else if (bulkType === "5for4") { buyQty = 5; payQty = 4; }
    else {
      buyQty = Number(values.buyQuantity) || 3;
      payQty = Number(values.payQuantity) || 2;
    }
    
    quantity = buyQty;
    originalTotal = itemPrice * buyQty;
    finalPrice = itemPrice * payQty;
    savings = originalTotal - finalPrice;
    effectiveDiscount = (savings / originalTotal) * 100;
    pricePerUnit = finalPrice / buyQty;
  }
  
  // ─────────────────────────────────────────────────────────────────────────
  // COMPARE DEALS
  // ─────────────────────────────────────────────────────────────────────────
  else if (mode === "compare") {
    const price = Number(values.comparePrice) || 100;
    const deal1Percent = Number(values.deal1Percent) || 0;
    const deal2Dollar = Number(values.deal2Dollar) || 0;
    
    const deal1Final = price * (1 - deal1Percent / 100);
    const deal2Final = Math.max(0, price - deal2Dollar);
    
    const deal1Savings = price - deal1Final;
    const deal2Savings = price - deal2Final;
    
    originalTotal = price;
    
    if (deal1Savings > deal2Savings) {
      finalPrice = deal1Final;
      savings = deal1Savings;
      effectiveDiscount = deal1Percent;
      dealComparison = `🏆 Deal A wins! ${deal1Percent}% off saves $${deal1Savings.toFixed(2)} vs $${deal2Savings.toFixed(2)}`;
    } else if (deal2Savings > deal1Savings) {
      finalPrice = deal2Final;
      savings = deal2Savings;
      effectiveDiscount = (deal2Savings / price) * 100;
      dealComparison = `🏆 Deal B wins! $${deal2Dollar} off saves $${deal2Savings.toFixed(2)} vs $${deal1Savings.toFixed(2)}`;
    } else {
      finalPrice = deal1Final;
      savings = deal1Savings;
      effectiveDiscount = deal1Percent;
      dealComparison = `🤝 It's a tie! Both save $${deal1Savings.toFixed(2)}`;
    }
    
    pricePerUnit = finalPrice;
  }
  
  // ─────────────────────────────────────────────────────────────────────────
  // APPLY TAX
  // ─────────────────────────────────────────────────────────────────────────
  if (includeTax === "after" && taxRate > 0) {
    taxAmount = finalPrice * (taxRate / 100);
    finalPrice = finalPrice + taxAmount;
  } else if (includeTax === "before" && taxRate > 0) {
    // Tax applied to original, then discount
    const taxedOriginal = originalTotal * (1 + taxRate / 100);
    taxAmount = originalTotal * (taxRate / 100);
    // Recalculate with taxed amounts
    if (mode === "percentOff" || mode === "dollarOff") {
      // Already calculated final, just add tax
      taxAmount = finalPrice * (taxRate / 100);
      finalPrice = finalPrice + taxAmount;
    }
  }
  
  // ─────────────────────────────────────────────────────────────────────────
  // FORMAT RESULTS
  // ─────────────────────────────────────────────────────────────────────────
  const formatCurrency = (val: number) => `$${val.toFixed(2)}`;
  
  return {
    values: {
      finalPrice,
      savings,
      effectiveDiscount,
      pricePerUnit,
      taxAmount,
      originalTotal,
    },
    formatted: {
      finalPrice: formatCurrency(finalPrice),
      youSave: `${formatCurrency(savings)} (${effectiveDiscount.toFixed(1)}% off)`,
      effectiveDiscount: `${effectiveDiscount.toFixed(1)}%`,
      pricePerUnit: quantity > 1 ? `${formatCurrency(pricePerUnit)}/item` : formatCurrency(pricePerUnit),
      taxAmount: taxAmount > 0 ? formatCurrency(taxAmount) : "No tax",
      originalTotal: formatCurrency(originalTotal),
      dealComparison: dealComparison || "—",
    },
    summary: `Final: ${formatCurrency(finalPrice)} — You save ${formatCurrency(savings)} (${effectiveDiscount.toFixed(1)}% off)`,
    isValid: true,
  };
}

export default discountCalculatorConfig;
