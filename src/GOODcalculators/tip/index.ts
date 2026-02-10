import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ═══════════════════════════════════════════════════════════════════
// TIP CALCULATOR V4
// Features: Currency dropdown, service quality, bill split, rounding,
// tip on total vs pre-tax, tipping guide by country, comparison chart
// ═══════════════════════════════════════════════════════════════════

export const tipCalculatorConfig: CalculatorConfigV4 = {
  id: "tip",
  version: "4.0",
  category: "finance",
  icon: "💰",

  presets: [
    {
      id: "quickDinner",
      icon: "🍽️",
      values: {
        billAmount: 50,
        serviceQuality: "good",
        tipPercent: 18,
        splitBetween: 1,
        tipCalculation: "total",
        roundTotal: "none",
        taxAmount: null,
      },
    },
    {
      id: "groupDinner",
      icon: "👥",
      values: {
        billAmount: 180,
        serviceQuality: "great",
        tipPercent: 20,
        splitBetween: 4,
        tipCalculation: "total",
        roundTotal: "nearest1",
        taxAmount: null,
      },
    },
    {
      id: "deliveryOrder",
      icon: "🛵",
      values: {
        billAmount: 35,
        serviceQuality: "good",
        tipPercent: 18,
        splitBetween: 1,
        tipCalculation: "total",
        roundTotal: "none",
        taxAmount: null,
      },
    },
    {
      id: "salonVisit",
      icon: "💇",
      values: {
        billAmount: 85,
        serviceQuality: "great",
        tipPercent: 20,
        splitBetween: 1,
        tipCalculation: "total",
        roundTotal: "nearest1",
        taxAmount: null,
      },
    },
  ],

  t: {
    en: {
      name: "Tip Calculator",
      slug: "tip-calculator",
      subtitle: "Calculate the tip, split the bill, and settle up fast — with pre-tax options for any group size",
      breadcrumb: "Tip",

      seo: {
        title: "Tip Calculator — Split Bill, Pre-Tax Tip & Rounding",
        description: "Calculate tips by service quality, split bills evenly, tip before or after tax, and round to the nearest dollar. Supports multiple currencies with built-in tipping guide.",
        shortDescription: "Calculate the perfect tip and split the bill instantly",
        keywords: [
          "tip calculator",
          "tip calculator split bill",
          "tip on pre tax amount",
          "gratuity calculator",
          "restaurant tip calculator",
          "bill split calculator",
          "how much to tip",
          "tip percentage calculator",
        ],
      },

      calculator: { yourInformation: "Bill Details" },
      ui: {
        yourInformation: "Bill Details",
        calculate: "Calculate Tip",
        reset: "Reset",
        results: "Tip Amount",
      },

      inputs: {
        billAmount: {
          label: "Bill Amount",
          helpText: "Enter the total amount on your bill",
        },
        serviceQuality: {
          label: "Service Quality",
          helpText: "Select service quality to guide your tip",
          options: {
            poor: "😐 Poor",
            fair: "🙂 Fair",
            good: "😊 Good",
            great: "😄 Great",
            exceptional: "🌟 Exceptional",
          },
        },
        tipPercent: {
          label: "Tip Percentage",
          helpText: "Auto-set by service quality, or adjust manually",
        },
        splitBetween: {
          label: "Split Between",
          helpText: "Number of people sharing the bill",
        },
        tipCalculation: {
          label: "Tip Calculation",
          helpText: "Choose whether to tip on the total bill or on the pre-tax amount",
          options: {
            total: "Tip on Total",
            preTax: "Tip Before Tax",
          },
        },
        taxAmount: {
          label: "Tax Amount",
          helpText: "Enter the tax amount from your bill (only needed for pre-tax tip calculation)",
        },
        roundTotal: {
          label: "Round Total",
          helpText: "Round the total per person for easier payment",
          options: {
            none: "No Rounding",
            nearest1: "Nearest $1",
            nearest5: "Nearest $5",
            nearest10: "Nearest $10",
          },
        },
      },

      results: {
        tipAmount: { label: "Tip Amount" },
        totalWithTip: { label: "Total with Tip" },
        tipPerPerson: { label: "Tip Per Person" },
        totalPerPerson: { label: "Total Per Person" },
        effectiveTipRate: { label: "Effective Tip Rate" },
        tipCalculatedOn: { label: "Tip Calculated On" },
        youSave: { label: "You Save (Pre-Tax)" },
      },

      presets: {
        quickDinner: {
          label: "Quick Dinner",
          description: "Solo dinner, $50 bill, good service",
        },
        groupDinner: {
          label: "Group Dinner",
          description: "4 people, $180 bill, great service, rounded",
        },
        deliveryOrder: {
          label: "Delivery Order",
          description: "$35 delivery, good service, no split",
        },
        salonVisit: {
          label: "Salon Visit",
          description: "$85 salon, great service, rounded to $1",
        },
      },

      tooltips: {
        tipAmount: "The total tip amount based on the selected percentage and calculation method.",
        totalWithTip: "Your total bill including the tip. May be rounded if rounding is enabled.",
        tipPerPerson: "How much each person pays in tip when splitting the bill.",
        totalPerPerson: "Total amount each person pays including their share of the tip.",
        effectiveTipRate: "The actual tip percentage after rounding adjustments.",
        tipCalculatedOn: "The base amount used to calculate the tip — either the full total or the pre-tax subtotal.",
        youSave: "Amount saved by tipping on the pre-tax amount instead of the total.",
      },

      values: {
        "Total": "Total",
        "Pre-tax subtotal": "Pre-tax subtotal",
        "per person": "per person",
      },

      formats: {
        summary: "Tip: {tipAmount} ({effectiveTipRate}). Total with tip: {totalWithTip}. Each person pays {totalPerPerson}.",
      },

      infoCards: {
        tipBreakdown: {
          title: "Tip Breakdown",
          items: {
            "0": "Tip Amount",
            "1": "Total with Tip",
            "2": "Tip Per Person",
            "3": "Total Per Person",
          },
        },
        tippingGuide: {
          title: "🇺🇸 US Tipping Guide",
          items: {
            "0": "Restaurant",
            "1": "Delivery",
            "2": "Salon / Barber",
            "3": "Bar / Bartender",
            "4": "Taxi / Rideshare",
            "5": "Hotel Housekeeping",
          },
        },
        tips: {
          title: "Tipping Tips",
          items: [
            "In the US, 15-20% is standard for sit-down restaurants",
            "Tip on the pre-tax amount — tax goes to the government, not your server",
            "For delivery, tip at least $3-5 even on small orders",
            "Cash tips go directly to your server without delay",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is a Tip?",
          content: "A tip, or gratuity, is an extra amount of money given to a service worker to recognize the quality of their work. In the United States, tipping is customary and in many cases expected in restaurants, bars, salons, and for delivery services. Service workers in the US often earn a lower base wage because tips are expected to supplement their income. While tipping is voluntary, it plays a critical role in service industry compensation. The standard restaurant tip in the US ranges from 15% to 20% of the pre-tax bill, with 18-20% being the most common range for good service. Understanding when and how much to tip helps ensure fair compensation for the people who serve you.",
        },
        howItWorks: {
          title: "How This Calculator Works",
          content: "This calculator determines the appropriate tip based on your bill amount, chosen tip percentage, and preferred calculation method. You can tip on the full total or on the pre-tax amount to save money while still being generous. The service quality selector automatically adjusts the tip percentage to common standards: 10% for poor service, 15% for fair, 18% for good, 20% for great, and 25% for exceptional. You can override this manually at any time. The bill splitting feature divides both the tip and total evenly among your group. Rounding options let you round the total per person to the nearest dollar, $5, or $10 for easier payment. The calculator also shows your effective tip rate after rounding and how much you save by tipping pre-tax.",
        },
        tippingEtiquette: {
          title: "Tipping Etiquette by Service",
          items: [
            { text: "Restaurants and bars: 15-20% of the pre-tax bill is standard in the US. For exceptional service, 25% or more is appreciated", type: "info" },
            { text: "Food delivery: 15-20% or a minimum of $3-5, whichever is greater. Tip more for long distances or bad weather", type: "info" },
            { text: "Hair salons and barbers: 15-20% of the service cost. Tip the person who washes your hair $2-5 separately", type: "info" },
            { text: "Taxi and rideshare: 15-20% for taxis. For rideshare apps, $2-5 or 15-20% for longer rides", type: "info" },
            { text: "Hotel housekeeping: $2-5 per night. Leave the tip daily since different staff may clean your room each day", type: "info" },
            { text: "Never tip on tax — the tax goes to the government. Calculate your tip on the pre-tax subtotal for accuracy", type: "warning" },
          ],
        },
        globalTipping: {
          title: "Tipping Around the World",
          items: [
            { text: "United States and Canada: 15-20% expected at restaurants. Servers depend on tips as part of their income", type: "info" },
            { text: "United Kingdom and Ireland: 10-15% is common but not mandatory. Some restaurants add a service charge", type: "info" },
            { text: "Japan: Tipping is considered rude and can cause confusion. Excellent service is expected without extra payment", type: "warning" },
            { text: "Australia and New Zealand: Tipping is not expected but appreciated for exceptional service, usually 10%", type: "info" },
            { text: "Europe (France, Germany, Italy, Spain): Rounding up or adding 5-10% is customary. Service charge may be included", type: "info" },
            { text: "China: Tipping is generally not practiced and may be refused. It is considered an insult in some settings", type: "warning" },
          ],
        },
        examples: {
          title: "Example Calculations",
          description: "See how different scenarios affect your tip",
          examples: [
            {
              title: "Example 1: Standard Dinner",
              steps: [
                "Bill: $75.00",
                "Service: Good (18%)",
                "Tip: $75.00 × 18% = $13.50",
                "Total: $75.00 + $13.50 = $88.50",
              ],
              result: "You pay $88.50 total with a $13.50 tip",
            },
            {
              title: "Example 2: Group Split with Pre-Tax Tip",
              steps: [
                "Bill: $200.00 (includes $16.00 tax)",
                "Pre-tax subtotal: $184.00",
                "Tip 20% on pre-tax: $184.00 × 20% = $36.80",
                "Total: $200.00 + $36.80 = $236.80",
                "Split 4 ways: $59.20 per person",
              ],
              result: "Each person pays $59.20 — you saved $3.20 vs tipping on the full total",
            },
          ],
        },
      },

      faqs: [
        {
          question: "Should I tip on the pre-tax or post-tax amount?",
          answer: "Technically, tipping on the pre-tax amount is correct because the tax goes to the government, not the restaurant or server. However, many people tip on the total including tax for simplicity. For a $100 meal with 8% tax, tipping 20% on the pre-tax amount saves you $1.60 compared to tipping on the total. The difference is small on individual bills but adds up over time. This calculator lets you choose either method.",
        },
        {
          question: "How much should I tip for different services?",
          answer: "For sit-down restaurants in the US, 15-20% is standard with 18-20% being the norm for good service. Food delivery should get 15-20% or at least $3-5 minimum. Hair salons and barbers expect 15-20%. Bartenders typically receive $1-2 per drink or 15-20% of the tab. Taxi drivers get 15-20%. Hotel housekeeping should receive $2-5 per night left daily. For takeout, tipping is optional but 10-15% is appreciated especially for large orders.",
        },
        {
          question: "Is it OK to not tip for bad service?",
          answer: "While tipping is technically voluntary in the US, leaving no tip should be reserved for truly terrible service, not just slow or imperfect experiences. Remember that servers often earn a base wage below minimum wage and depend on tips. If service was poor, a 10% tip acknowledges their effort while signaling dissatisfaction. For genuinely bad experiences, speak to a manager rather than withholding tips entirely. The server may be dealing with kitchen delays or being short-staffed, which is not their fault.",
        },
        {
          question: "How does bill splitting work with tips?",
          answer: "This calculator divides the total bill plus tip equally among all people. Each person pays the same amount for both their share of the food and the tip. If rounding is enabled, the per-person amount is rounded for convenience. Note that when the total does not divide evenly, one person may need to pay slightly more — the calculator shows the rounded amount per person. For uneven orders, you may want to calculate individual shares separately.",
        },
        {
          question: "Why does rounding change my effective tip rate?",
          answer: "When you round the total per person up to the nearest dollar, $5, or $10, the actual amount you pay increases slightly. This means the effective tip percentage changes. For example, if your calculated total is $22.35 per person and you round to $23, the extra $0.65 per person effectively increases your tip. The calculator shows this adjusted effective tip rate so you know exactly what percentage you are actually tipping after rounding.",
        },
        {
          question: "Do I need to tip on top of an automatic gratuity?",
          answer: "Many restaurants automatically add 18-20% gratuity for large parties, typically groups of 6 or more. You do not need to tip additional on top of automatic gratuity unless you want to reward exceptional service. Always check your bill carefully — if a service charge or gratuity is already included, it will be listed as a separate line item. If you are unsure, ask your server whether gratuity has been added.",
        },
      ],

      detailedTable: {
        title: "Tip Comparison",
        buttonLabel: "View Tip Comparison",
        columns: ["Tip %", "Tip Amount", "Total", "Per Person"],
      },

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
        calculate: "Calculate Tip",
        reset: "Reset",
        pdf: "PDF",
        csv: "CSV",
        excel: "Excel",
        save: "Save",
        saved: "Saved",
        saving: "Saving...",
      },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: {
        mobileResults: "Tip results",
        closeModal: "Close",
        openMenu: "Menu",
      },
      sources: { title: "Sources & References" },
    },
  },

  inputs: [
    {
      id: "billAmount",
      type: "number",
      defaultValue: null,
      placeholder: "50",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    {
      id: "serviceQuality",
      type: "radio",
      defaultValue: "good",
      options: [
        { value: "poor" },
        { value: "fair" },
        { value: "good" },
        { value: "great" },
        { value: "exceptional" },
      ],
      linkedValues: {
        poor: { tipPercent: 10 },
        fair: { tipPercent: 15 },
        good: { tipPercent: 18 },
        great: { tipPercent: 20 },
        exceptional: { tipPercent: 25 },
      },
    },
    {
      id: "tipPercent",
      type: "number",
      defaultValue: 18,
      min: 0,
      max: 100,
      step: 1,
      suffix: "%",
    },
    {
      id: "splitBetween",
      type: "number",
      defaultValue: 1,
      min: 1,
      max: 50,
    },
    {
      id: "tipCalculation",
      type: "radio",
      defaultValue: "total",
      options: [{ value: "total" }, { value: "preTax" }],
    },
    {
      id: "taxAmount",
      type: "number",
      defaultValue: null,
      placeholder: "0",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "tipCalculation", value: "preTax" },
    },
    {
      id: "roundTotal",
      type: "radio",
      defaultValue: "none",
      options: [
        { value: "none" },
        { value: "nearest1" },
        { value: "nearest5" },
        { value: "nearest10" },
      ],
    },
  ],

  inputGroups: [],

  results: [
    { id: "tipAmount", type: "primary", format: "text" },
    { id: "totalWithTip", type: "secondary", format: "text" },
    { id: "tipPerPerson", type: "secondary", format: "text" },
    { id: "totalPerPerson", type: "secondary", format: "text" },
    { id: "effectiveTipRate", type: "secondary", format: "text" },
    { id: "tipCalculatedOn", type: "secondary", format: "text" },
    { id: "youSave", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "tipBreakdown", type: "list", icon: "💰", itemCount: 4 },
    { id: "tippingGuide", type: "list", icon: "🌎", itemCount: 6 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "tippingEtiquette", type: "list", icon: "🍽️", itemCount: 6 },
    { id: "globalTipping", type: "list", icon: "🌍", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [
    { id: "0" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
  ],

  references: [
    {
      authors: "Emily Post Institute",
      year: "2024",
      title: "Tipping Guide — General Tipping Guidelines",
      source: "Emily Post Institute",
      url: "https://emilypost.com/advice/general-tipping-guide",
    },
    {
      authors: "U.S. Department of Labor",
      year: "2024",
      title: "Fact Sheet — Tipped Employees Under the FLSA",
      source: "DOL Wage and Hour Division",
      url: "https://www.dol.gov/agencies/whd/fact-sheets/15-tipped-employees-flsa",
    },
  ],

  detailedTable: {
    id: "tipComparison",
    buttonLabel: "View Tip Comparison",
    buttonIcon: "📊",
    modalTitle: "Tip Comparison by Percentage",
    columns: [
      { id: "percent", label: "Tip %", align: "center" },
      { id: "tipAmt", label: "Tip Amount", align: "right", highlight: true },
      { id: "total", label: "Total", align: "right" },
      { id: "perPerson", label: "Per Person", align: "right" },
    ],
  },

  chart: {
    id: "tipComparison",
    type: "bar",
    xKey: "label",
    height: 200,
    showGrid: true,
    showLegend: false,
    series: [
      { key: "tip", type: "bar", color: "#3b82f6" },
    ],
  },

  hero: {
    title: "Tip Calculator",
    description: "Calculate the tip, split the bill, and settle up fast",
  },

  sidebar: {
    title: "How to Use",
    steps: [
      "Enter your bill amount",
      "Select service quality or adjust tip %",
      "Choose to tip on total or pre-tax",
      "Split the bill and round if needed",
    ],
  },

  features: {
    title: "Features",
    items: [
      "Auto-set tip by service quality",
      "Tip on total or pre-tax amount",
      "Split bill up to 50 people",
      "Round to nearest $1, $5, or $10",
      "Multi-currency support",
    ],
  },

  relatedCalculators: ["percentage", "discount", "sales-tax"],

  ads: {
    enabled: true,
    slots: ["top", "sidebar", "bottom"],
  },
};

// ═══════════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════════

export function calculateTip(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ═══════════════════════════════════════════════════════════════════
  // EXTRACT INPUTS
  // ═══════════════════════════════════════════════════════════════════
  const billAmount = values.billAmount as number;
  const tipPercent = values.tipPercent as number;
  const splitBetween = Math.max(1, values.splitBetween as number);
  const tipCalculation = values.tipCalculation as string;
  const taxAmount = (values.taxAmount as number) || 0;
  const roundTotal = values.roundTotal as string;

  // Currency symbol
  const curr = fieldUnits?.billAmount || "USD";
  const SYMBOLS: Record<string, string> = {
    USD: "$", EUR: "€", GBP: "£", MXN: "MX$", BRL: "R$",
    JPY: "¥", INR: "₹", CAD: "C$", AUD: "A$", CHF: "CHF ",
    COP: "COL$", ARS: "AR$", PEN: "S/", CLP: "CLP ",
    CNY: "¥", KRW: "₩", SEK: "kr ", NOK: "kr ", DKK: "kr ",
    PLN: "zł ", CZK: "Kč ", HUF: "Ft ", TRY: "₺",
    RUB: "₽", THB: "฿", PHP: "₱", IDR: "Rp ", MYR: "RM ",
    SGD: "S$", HKD: "HK$", TWD: "NT$", NZD: "NZ$",
    ZAR: "R ", ILS: "₪", AED: "د.إ ", SAR: "﷼ ",
    DOP: "RD$", GTQ: "Q", HNL: "L ", NIO: "C$", CRC: "₡",
    PAB: "B/.", BOB: "Bs ", PYG: "₲", UYU: "$U ", VES: "Bs.D ",
    JMD: "J$", TTD: "TT$", BBD: "Bds$", KYD: "CI$",
    BSD: "B$", AWG: "Afl ", ANG: "NAf ", XCD: "EC$",
    HTG: "G ", CUP: "₱", BZD: "BZ$",
  };
  const sym = SYMBOLS[curr] || "$";

  // Helper: format currency
  const fmtCurr = (val: number): string => {
    if (Math.abs(val) >= 1000) {
      return `${sym}${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `${sym}${val.toFixed(2)}`;
  };

  // ═══════════════════════════════════════════════════════════════════
  // CALCULATE TIP
  // ═══════════════════════════════════════════════════════════════════
  let tipBase = billAmount;
  let tipCalculatedOnRaw = "Total";
  let preTaxSavings = 0;

  if (tipCalculation === "preTax" && taxAmount > 0) {
    tipBase = billAmount - taxAmount;
    tipCalculatedOnRaw = "Pre-tax subtotal";
    // Calculate savings vs tipping on total
    preTaxSavings = (billAmount * tipPercent / 100) - (tipBase * tipPercent / 100);
  }

  const tipCalculatedOn = v[tipCalculatedOnRaw] || tipCalculatedOnRaw;
  const tipAmount = tipBase * tipPercent / 100;
  const totalWithTip = billAmount + tipAmount;

  // ═══════════════════════════════════════════════════════════════════
  // SPLIT & ROUND
  // ═══════════════════════════════════════════════════════════════════
  let totalPerPerson = totalWithTip / splitBetween;
  let tipPerPerson = tipAmount / splitBetween;

  // Rounding
  if (roundTotal !== "none") {
    const roundTo = roundTotal === "nearest1" ? 1 : roundTotal === "nearest5" ? 5 : 10;
    totalPerPerson = Math.ceil(totalPerPerson / roundTo) * roundTo;
  }

  // Recalculate effective values after rounding
  const actualTotal = totalPerPerson * splitBetween;
  const actualTip = actualTotal - billAmount;
  const effectiveTipRate = billAmount > 0 ? (actualTip / (tipCalculation === "preTax" && taxAmount > 0 ? tipBase : billAmount)) * 100 : 0;

  // ═══════════════════════════════════════════════════════════════════
  // TIPPING GUIDE (based on bill amount)
  // ═══════════════════════════════════════════════════════════════════
  const guidePercentages: Record<string, [number, number]> = {
    restaurant: [15, 20],
    delivery: [15, 20],
    salon: [15, 20],
    bar: [15, 20],
    taxi: [15, 20],
    hotel: [2, 5], // flat amount per night
  };

  // ═══════════════════════════════════════════════════════════════════
  // CHART DATA — Tip amounts at different percentages
  // ═══════════════════════════════════════════════════════════════════
  const chartPercentages = [10, 15, 18, 20, 25];
  const chartData = chartPercentages.map((pct) => {
    const base = tipCalculation === "preTax" && taxAmount > 0 ? tipBase : billAmount;
    return {
      label: `${pct}%`,
      tip: Math.round((base * pct / 100) * 100) / 100,
    };
  });

  // ═══════════════════════════════════════════════════════════════════
  // DETAILED TABLE — Comparison at multiple percentages
  // ═══════════════════════════════════════════════════════════════════
  const tablePercentages = [10, 12, 15, 18, 20, 22, 25, 30];
  const tableData = tablePercentages.map((pct) => {
    const base = tipCalculation === "preTax" && taxAmount > 0 ? tipBase : billAmount;
    const t = base * pct / 100;
    const tot = billAmount + t;
    const pp = tot / splitBetween;
    return {
      percent: `${pct}%`,
      tipAmt: fmtCurr(t),
      total: fmtCurr(tot),
      perPerson: splitBetween > 1 ? fmtCurr(pp) : "—",
    };
  });

  // ═══════════════════════════════════════════════════════════════════
  // FORMAT OUTPUTS
  // ═══════════════════════════════════════════════════════════════════
  const perPersonLabel = v["per person"] || "per person";

  const summaryTemplate = f.summary || "Tip: {tipAmount} ({effectiveTipRate}). Total with tip: {totalWithTip}. Each person pays {totalPerPerson}.";
  const summary = summaryTemplate
    .replace("{tipAmount}", fmtCurr(roundTotal !== "none" ? actualTip : tipAmount))
    .replace("{effectiveTipRate}", `${effectiveTipRate.toFixed(1)}%`)
    .replace("{totalWithTip}", fmtCurr(roundTotal !== "none" ? actualTotal : totalWithTip))
    .replace("{totalPerPerson}", fmtCurr(totalPerPerson));

  // ═══════════════════════════════════════════════════════════════════
  // RETURN
  // ═══════════════════════════════════════════════════════════════════
  return {
    values: {
      tipAmount: roundTotal !== "none" ? actualTip : tipAmount,
      totalWithTip: roundTotal !== "none" ? actualTotal : totalWithTip,
      tipPerPerson: roundTotal !== "none" ? actualTip / splitBetween : tipPerPerson,
      totalPerPerson,
      effectiveTipRate: Math.round(effectiveTipRate * 10) / 10,
      tipCalculatedOn: tipCalculatedOnRaw,
      youSave: preTaxSavings,
    },
    formatted: {
      tipAmount: fmtCurr(roundTotal !== "none" ? actualTip : tipAmount),
      totalWithTip: fmtCurr(roundTotal !== "none" ? actualTotal : totalWithTip),
      tipPerPerson: fmtCurr(roundTotal !== "none" ? actualTip / splitBetween : tipPerPerson),
      totalPerPerson: fmtCurr(totalPerPerson),
      effectiveTipRate: `${effectiveTipRate.toFixed(1)}%`,
      tipCalculatedOn,
      youSave: preTaxSavings > 0 ? fmtCurr(preTaxSavings) : "—",
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default tipCalculatorConfig;
