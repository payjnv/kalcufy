import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

export const discountCalculatorConfig: CalculatorConfigV4 = {
  id: "discount",
  version: "4.0",
  category: "everyday",
  icon: "🏷️",

  presets: [
    {
      id: "sale20",
      icon: "🛍️",
      values: { originalPrice: 99.99, discountPercent: 20, taxRate: 0 },
    },
    {
      id: "clearance50",
      icon: "🔥",
      values: { originalPrice: 249.99, discountPercent: 50, taxRate: 8.25 },
    },
    {
      id: "coupon15",
      icon: "🎟️",
      values: { originalPrice: 65, discountPercent: 15, taxRate: 7 },
    },
  ],

  t: {
    en: {
      name: "Discount Calculator",
      slug: "discount-calculator",
      subtitle: "Calculate the sale price, savings amount, and final cost after discount and tax instantly.",
      breadcrumb: "Discount",

      seo: {
        title: "Discount Calculator - Sale Price & Savings Tool",
        description: "Calculate your savings instantly. Enter the original price and discount percentage to see the sale price, amount saved, and total after tax. Free online tool.",
        shortDescription: "Calculate discounts, sale prices, and savings.",
        keywords: [
          "discount calculator",
          "sale price calculator",
          "percent off calculator",
          "calculate discount",
          "how much do I save",
          "free discount calculator",
          "online discount tool",
          "price after discount",
        ],
      },

      calculator: { yourInformation: "Price & Discount" },
      ui: {
        yourInformation: "Price & Discount",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        originalPrice: {
          label: "Original Price",
          helpText: "The full price before any discount",
        },
        discountPercent: {
          label: "Discount",
          helpText: "Percentage off the original price",
        },
        taxRate: {
          label: "Tax Rate (Optional)",
          helpText: "Sales tax percentage applied after discount",
        },
      },

      results: {
        salePrice: { label: "Sale Price" },
        youSave: { label: "You Save" },
        finalPrice: { label: "Final Price (with Tax)" },
      },

      presets: {
        sale20: { label: "20% Off $99.99", description: "Standard sale" },
        clearance50: { label: "50% Off $249.99", description: "Clearance + tax" },
        coupon15: { label: "15% Coupon on $65", description: "Coupon with tax" },
      },

      values: {
        "%": "%",
        "off": "off",
        "saved": "saved",
        "tax": "tax",
      },

      formats: {
        summary: "You save {saved} ({percent}% off). Sale price: {salePrice}",
      },

      infoCards: {
        metrics: {
          title: "Price Breakdown",
          items: [
            { label: "Original Price", valueKey: "originalPrice" },
            { label: "Discount Amount", valueKey: "youSave" },
            { label: "Sale Price", valueKey: "salePrice" },
            { label: "Final Price (w/ Tax)", valueKey: "finalPrice" },
          ],
        },
        details: {
          title: "Quick Discounts",
          items: [
            { label: "10% Off", valueKey: "ref10" },
            { label: "25% Off", valueKey: "ref25" },
            { label: "50% Off", valueKey: "ref50" },
            { label: "75% Off", valueKey: "ref75" },
          ],
        },
        tips: {
          title: "Shopping Tips",
          items: [
            "Stack coupons when allowed — apply the bigger discount first for maximum savings",
            "Compare unit prices, not just sale prices, to find the true best deal",
            "A 50% discount followed by an additional 20% off is NOT 70% off — it's 60% off total",
            "Always check if the discount is applied before or after tax — it can change your total",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is a Discount?",
          content: "A discount is a reduction in the regular price of a product or service, typically expressed as a percentage. Retailers use discounts to attract customers, clear inventory, and boost sales during seasonal events. Understanding how discounts work helps you evaluate whether a deal is genuinely worth taking. The calculation is straightforward: multiply the original price by the discount percentage divided by 100, then subtract that amount from the original price. For instance, a 30% discount on a $50 item means you save $15 and pay $35. Tax, if applicable, is usually calculated on the discounted price, not the original.",
        },
        howItWorks: {
          title: "How to Calculate a Discount",
          content: "The discount calculation follows a simple three-step process. First, calculate the savings amount by multiplying the original price by the discount rate: Savings = Price × (Discount% / 100). Second, subtract the savings from the original price to get the sale price: Sale Price = Price - Savings. Third, if sales tax applies, calculate it on the discounted price and add it: Final = Sale Price × (1 + Tax% / 100). For example, a $120 jacket at 25% off with 8% tax: savings = $30, sale price = $90, tax = $7.20, final price = $97.20. You can also combine these into one formula: Final = Price × (1 - Discount/100) × (1 + Tax/100).",
        },
        considerations: {
          title: "Things to Watch For",
          items: [
            { text: "Stacking discounts: Two 25% discounts ≠ 50% off. First 25% off $100 = $75, then 25% off $75 = $56.25 (43.75% total)", type: "warning" },
            { text: "Original price inflated: Some stores raise prices before a 'sale' — check price history on tools like CamelCamelCamel", type: "warning" },
            { text: "Minimum purchases: Many coupons require a minimum spend — make sure you're not buying extra just to use the coupon", type: "info" },
            { text: "Clearance math: 70% off means you pay 30% of the original — a $200 item costs just $60", type: "info" },
            { text: "Buy one get one 50% off: This is effectively 25% off total when buying two identical items", type: "info" },
            { text: "Tax varies by location: US sales tax ranges from 0% (Oregon) to over 10% (parts of Louisiana, Tennessee)", type: "info" },
          ],
        },
        categories: {
          title: "Types of Discounts",
          items: [
            { text: "Percentage off: The most common type — a fixed percentage reduction from the original price (e.g., 20% off)", type: "info" },
            { text: "Dollar amount off: A fixed dollar savings regardless of price (e.g., $10 off any purchase over $50)", type: "info" },
            { text: "BOGO (Buy One Get One): Get a free or discounted additional item with a purchase", type: "info" },
            { text: "Tiered discounts: Bigger savings at higher quantities (e.g., 10% off 1, 15% off 2, 20% off 3+)", type: "info" },
            { text: "Cashback: A percentage of your purchase returned to you after buying, often via credit card or app", type: "info" },
            { text: "Seasonal/Clearance: Deep discounts to clear old inventory, often 50-75% off during end-of-season sales", type: "info" },
          ],
        },
        examples: {
          title: "Discount Examples",
          description: "Common discount scenarios step by step",
          examples: [
            {
              title: "30% Off a $150 Pair of Shoes",
              steps: [
                "Savings = $150 × 30/100 = $45",
                "Sale price = $150 - $45 = $105",
              ],
              result: "You pay $105, saving $45",
            },
            {
              title: "$80 Item at 40% Off + 8% Tax",
              steps: [
                "Savings = $80 × 40/100 = $32",
                "Sale price = $80 - $32 = $48",
                "Tax = $48 × 8/100 = $3.84",
                "Final = $48 + $3.84 = $51.84",
              ],
              result: "Final price $51.84 (saved $32)",
            },
          ],
        },
      },

      faqs: [
        { question: "How do I calculate a percentage discount?", answer: "Multiply the original price by the discount percentage divided by 100. Then subtract that from the original price. Example: 25% off $80 = $80 × 0.25 = $20 savings, so you pay $60." },
        { question: "Is tax calculated before or after the discount?", answer: "In most US states and countries, sales tax is calculated on the discounted price (after the discount is applied), not the original price. This means you pay less tax on discounted items." },
        { question: "How do I calculate the original price from a sale price?", answer: "Divide the sale price by (1 - discount/100). For example, if something costs $60 after a 25% discount: $60 / (1 - 0.25) = $60 / 0.75 = $80 original price." },
        { question: "How do stacking discounts work?", answer: "Stacking means applying multiple discounts sequentially. A 20% off + 10% off doesn't equal 30% off. Instead: first apply 20% (pay 80%), then 10% off the new price (pay 72%). Total discount is 28%, not 30%." },
        { question: "What does 'up to X% off' mean?", answer: "It means the maximum discount available is X%, but most items may have smaller discounts. Typically only a few items reach the advertised maximum percentage off." },
        { question: "Is a bigger percentage off always a better deal?", answer: "Not necessarily. A higher-priced item at 20% off might save you more dollars than a cheaper item at 40% off. Always compare the actual dollar savings and final prices between options." },
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

  inputs: [
    {
      id: "originalPrice",
      type: "number",
      defaultValue: null,
      placeholder: "99.99",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 0,
    },
    {
      id: "discountPercent",
      type: "number",
      defaultValue: null,
      placeholder: "20",
      suffix: "%",
      min: 0,
      max: 100,
      step: 0.5,
    },
    {
      id: "taxRate",
      type: "number",
      defaultValue: 0,
      placeholder: "8.25",
      suffix: "%",
      min: 0,
      max: 30,
      step: 0.25,
    },
  ],

  inputGroups: [],

  results: [
    { id: "salePrice", type: "primary", format: "text" },
    { id: "youSave", type: "secondary", format: "text" },
    { id: "finalPrice", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "🏷️", itemCount: 4 },
    { id: "details", type: "list", icon: "🔢", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    {
      authors: "Federal Trade Commission",
      year: "2024",
      title: "Shopping and Saving: Understanding Discounts and Sales",
      source: "FTC",
      url: "https://consumer.ftc.gov/",
    },
    {
      authors: "Consumer Financial Protection Bureau",
      year: "2024",
      title: "Understanding Pricing and Sales Tax",
      source: "CFPB",
      url: "https://www.consumerfinance.gov/",
    },
  ],

  hero: { icon: "🏷️" },
  sidebar: {},
  features: {},
  relatedCalculators: ["percentage-calculator", "tip-calculator", "grade-calculator"],
  ads: {},
};

export function calculateDiscountCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const originalPrice = values.originalPrice as number | null;
  const discountPercent = values.discountPercent as number | null;
  const taxRate = (values.taxRate as number) || 0;

  if (originalPrice === null || originalPrice === undefined || discountPercent === null || discountPercent === undefined) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Currency symbol
  const curr = fieldUnits?.originalPrice || "USD";
  const SYMBOLS: Record<string, string> = {
    USD: "$", EUR: "€", GBP: "£", MXN: "MX$", BRL: "R$",
    JPY: "¥", INR: "₹", CAD: "C$", AUD: "A$", CHF: "CHF ",
    COP: "COL$", ARS: "AR$", PEN: "S/", CLP: "CLP ",
  };
  const sym = SYMBOLS[curr] || "$";

  const savings = originalPrice * (discountPercent / 100);
  const salePrice = originalPrice - savings;
  const taxAmount = salePrice * (taxRate / 100);
  const finalPrice = salePrice + taxAmount;

  // Quick reference
  const ref10 = originalPrice * 0.9;
  const ref25 = originalPrice * 0.75;
  const ref50 = originalPrice * 0.5;
  const ref75 = originalPrice * 0.25;

  // Chart data - discount breakdown
  const chartData = [
    { label: "You Pay", value: salePrice, savings: 0 },
    { label: "You Save", value: 0, savings: savings },
  ];

  const fmtPrice = (n: number) => `${sym}${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return {
    values: {
      salePrice,
      youSave: savings,
      finalPrice,
      originalPrice,
      taxAmount,
      ref10,
      ref25,
      ref50,
      ref75,
    },
    formatted: {
      salePrice: fmtPrice(salePrice),
      youSave: `${fmtPrice(savings)} (${discountPercent}${v["%"] || "%"} ${v["off"] || "off"})`,
      finalPrice: taxRate > 0 ? `${fmtPrice(finalPrice)} (incl. ${fmtPrice(taxAmount)} ${v["tax"] || "tax"})` : fmtPrice(salePrice),
      originalPrice: fmtPrice(originalPrice),
      ref10: fmtPrice(ref10),
      ref25: fmtPrice(ref25),
      ref50: fmtPrice(ref50),
      ref75: fmtPrice(ref75),
    },
    summary:
      f.summary
        ?.replace("{saved}", fmtPrice(savings))
        .replace("{percent}", String(discountPercent))
        .replace("{salePrice}", fmtPrice(salePrice)) ||
      `You save ${fmtPrice(savings)} (${discountPercent}% off). Sale price: ${fmtPrice(salePrice)}`,
    isValid: true,
    metadata: {
      chartData,
    },
  };
}

export default discountCalculatorConfig;
