import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

export const cupsToMlConverterConfig: CalculatorConfigV4 = {
  id: "cups-to-ml",
  version: "4.0",
  category: "conversion",
  icon: "🥛",

  presets: [
    { id: "halfCup", icon: "🥄", values: { amount: 0.5 } },
    { id: "oneCup", icon: "🥛", values: { amount: 1 } },
    { id: "twoCups", icon: "🫗", values: { amount: 2 } },
  ],

  t: {
    en: {
      name: "Cups to mL Converter",
      slug: "cups-to-ml",
      subtitle: "Convert cups to milliliters for cooking and baking. Includes tablespoons, teaspoons, and fluid ounces.",
      breadcrumb: "Cups to mL",

      seo: {
        title: "Cups to mL Converter - Free Cooking Measurement Tool",
        description: "Convert cups to milliliters instantly for cooking and baking. Includes US cups, metric cups, tablespoons, teaspoons, and fluid ounces.",
        shortDescription: "Convert cups to mL for recipes.",
        keywords: ["cups to ml", "cups to milliliters", "cooking converter", "baking measurements", "recipe converter", "US cups metric", "tablespoon ml", "teaspoon ml"],
      },

      calculator: { yourInformation: "Enter Volume" },
      ui: { yourInformation: "Enter Volume", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Volume", helpText: "Enter the volume to convert" },
      },

      results: {
        milliliters: { label: "Milliliters" },
        liters: { label: "Liters" },
        flOz: { label: "Fluid Ounces" },
      },

      presets: {
        halfCup: { label: "Half Cup", description: "½ cup (~118 mL)" },
        oneCup: { label: "One Cup", description: "1 cup (~237 mL)" },
        twoCups: { label: "Two Cups", description: "2 cups (~473 mL)" },
      },

      values: { "mL": "mL", "L": "L", "fl oz": "fl oz", "cups": "cups", "tbsp": "tbsp", "tsp": "tsp" },

      formats: { summary: "{value} cups = {ml} mL" },

      infoCards: {
        results: {
          title: "Conversion Results",
          items: [
            { label: "Milliliters", valueKey: "milliliters" },
            { label: "Liters", valueKey: "liters" },
            { label: "Fluid Ounces", valueKey: "flOz" },
            { label: "Tablespoons", valueKey: "tablespoons" },
          ],
        },
        reference: {
          title: "Quick Reference",
          items: [
            { label: "1 Cup (US)", valueKey: "ref1cup" },
            { label: "½ Cup", valueKey: "refHalfCup" },
            { label: "¼ Cup", valueKey: "refQuarterCup" },
            { label: "1 Tablespoon", valueKey: "ref1tbsp" },
          ],
        },
        tips: {
          title: "Cooking Tips",
          items: [
            "US cup = 237 mL, Metric cup = 250 mL",
            "1 cup = 16 tablespoons = 48 teaspoons",
            "1 tablespoon = 15 mL, 1 teaspoon = 5 mL",
            "For dry ingredients, use weight (grams) for accuracy",
          ],
        },
      },

      education: {
        whatIs: {
          title: "Understanding Cups and Milliliters",
          content: "Cups and milliliters are both units of volume commonly used in cooking. The cup is primarily used in the United States and varies slightly from metric cups used elsewhere. A US cup equals approximately 237 mL, while a metric cup equals 250 mL. Understanding these conversions is essential for following international recipes accurately.",
        },
        howItWorks: {
          title: "How the Conversion Works",
          content: "To convert US cups to milliliters, multiply by 236.588. For metric cups, multiply by 250. The difference exists because US measurements evolved separately from the metric system. This converter handles both systems and includes common cooking measurements like tablespoons and teaspoons.",
        },
        considerations: {
          title: "Important Considerations",
          items: [
            { text: "US cup = 236.588 mL (commonly rounded to 237 mL)", type: "info" },
            { text: "Metric cup (Australia, NZ) = 250 mL exactly", type: "info" },
            { text: "UK recipes may use Imperial cups (284 mL) - now rare", type: "warning" },
            { text: "Japanese cup = 200 mL (used in rice cookers)", type: "info" },
            { text: "For baking, weight measurements are more accurate", type: "warning" },
            { text: "Liquid and dry cup measurements differ slightly", type: "info" },
          ],
        },
        commonMeasures: {
          title: "Common Cooking Measurements",
          items: [
            { text: "1 cup = 237 mL = 16 tablespoons = 8 fl oz", type: "info" },
            { text: "½ cup = 118 mL = 8 tablespoons = 4 fl oz", type: "info" },
            { text: "¼ cup = 59 mL = 4 tablespoons = 2 fl oz", type: "info" },
            { text: "1 tablespoon = 15 mL = 3 teaspoons", type: "info" },
            { text: "1 teaspoon = 5 mL", type: "info" },
            { text: "1 fluid ounce = 29.57 mL = 2 tablespoons", type: "info" },
          ],
        },
        examples: {
          title: "Conversion Examples",
          description: "Recipe scenarios",
          examples: [
            {
              title: "Baking Recipe",
              steps: ["Recipe calls for 1½ cups of flour", "Convert: 1.5 × 237 = 355.5 mL", "Or use 350 mL for easy measuring"],
              result: "1½ cups = 355 mL",
            },
            {
              title: "Liquid Ingredients",
              steps: ["Need ¾ cup of milk", "Convert: 0.75 × 237 = 177.75 mL", "Round to 175 or 180 mL"],
              result: "¾ cup = 178 mL",
            },
          ],
        },
      },

      faqs: [
        { question: "How many mL in a cup?", answer: "A US cup contains approximately 237 mL (236.588 mL exactly). A metric cup used in Australia and New Zealand contains exactly 250 mL. Always check which cup measurement your recipe uses." },
        { question: "What's the difference between US and metric cups?", answer: "A US cup is 236.588 mL while a metric cup is 250 mL—a difference of about 5.5%. For most recipes this small difference won't matter, but for precise baking it can affect results." },
        { question: "How do I convert tablespoons to mL?", answer: "1 US tablespoon = 14.79 mL (usually rounded to 15 mL). So 2 tablespoons = 30 mL, and 1 cup = 16 tablespoons = 237 mL." },
        { question: "Why do recipes use cups instead of mL?", answer: "Cups are traditional in American cooking and are convenient for home cooks without scales. Professional bakers prefer weight measurements (grams) for accuracy, as volume can vary based on how ingredients are packed." },
        { question: "How many teaspoons in a tablespoon?", answer: "There are 3 teaspoons in 1 tablespoon. 1 teaspoon = 5 mL, so 1 tablespoon = 15 mL. This is consistent across US and metric measurements." },
        { question: "Should I use a liquid or dry measuring cup?", answer: "Use liquid measuring cups (with pour spout) for liquids and dry measuring cups (flat top) for dry ingredients. Liquid cups allow you to fill to the line without spilling, while dry cups let you level off ingredients." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
  },

  inputs: [
    {
      id: "amount",
      type: "number",
      defaultValue: 1,
      placeholder: "1",
      min: 0,
      step: 0.25,
      unitType: "cooking_volume",
      syncGroup: false,
      defaultUnit: "cups",
      allowedUnits: ["cups", "mL", "L", "tbsp", "tsp", "fl_oz"],
    },
  ],

  inputGroups: [],

  results: [
    { id: "milliliters", type: "primary", format: "number" },
    { id: "liters", type: "secondary", format: "number" },
    { id: "flOz", type: "secondary", format: "number" },
  ],

  infoCards: [
    { id: "results", type: "list", icon: "📊", itemCount: 4 },
    { id: "reference", type: "list", icon: "📖", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "commonMeasures", type: "list", icon: "🥄", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "USDA", year: "2024", title: "Food Composition Databases - Measurement Conversions", source: "US Department of Agriculture", url: "https://fdc.nal.usda.gov/" },
    { authors: "FDA", year: "2024", title: "Food Labeling Guide - Reference Amounts", source: "US Food and Drug Administration", url: "https://www.fda.gov/food/food-labeling-nutrition" },
  ],

  hero: { badge: "Cooking Converter", title: "Cups to mL" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["gallons-to-liters", "mph-to-kmh", "square-feet-to-square-meters"],
  ads: { showTopBanner: false, showSidebar: true, showBetweenSections: false },
};

// ============================================================================
// CALCULATE FUNCTION
// ============================================================================

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) < 0.001) return val.toExponential(2);
  if (Math.abs(val) >= 1000) return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

export function calculateCupsToMl(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};

  const amount = values.amount as number;
  const fromUnit = fieldUnits.amount || "cups";

  if (amount === undefined || amount === null || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Conversion factors to mL (from registry.ts COOKING_VOLUME)
  const toMl: Record<string, number> = {
    "cups": 236.588,
    "mL": 1,
    "L": 1000,
    "tbsp": 14.787,
    "tsp": 4.929,
    "fl_oz": 29.574,
  };

  const factor = toMl[fromUnit] || 236.588;
  const milliliters = amount * factor;
  const liters = milliliters / 1000;
  const flOz = milliliters / 29.574;
  const tablespoons = milliliters / 14.787;

  // Reference values
  const ref1cup = 236.588;
  const refHalfCup = 118.294;
  const refQuarterCup = 59.147;
  const ref1tbsp = 14.787;

  const mlUnit = v["mL"] || "mL";
  const lUnit = v["L"] || "L";
  const flOzUnit = v["fl oz"] || "fl oz";
  const tbspUnit = v["tbsp"] || "tbsp";

  return {
    values: { milliliters, liters, flOz, tablespoons, ref1cup, refHalfCup, refQuarterCup, ref1tbsp },
    formatted: {
      milliliters: `${fmtNum(milliliters)} ${mlUnit}`,
      liters: `${fmtNum(liters)} ${lUnit}`,
      flOz: `${fmtNum(flOz)} ${flOzUnit}`,
      tablespoons: `${fmtNum(tablespoons)} ${tbspUnit}`,
      ref1cup: `${fmtNum(ref1cup)} ${mlUnit}`,
      refHalfCup: `${fmtNum(refHalfCup)} ${mlUnit}`,
      refQuarterCup: `${fmtNum(refQuarterCup)} ${mlUnit}`,
      ref1tbsp: `${fmtNum(ref1tbsp)} ${mlUnit}`,
    },
    summary: `${fmtNum(amount)} cups = ${fmtNum(milliliters)} ${mlUnit}`,
    isValid: true,
  };
}

export default cupsToMlConverterConfig;
