import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

export const gallonsToLitersConverterConfig: CalculatorConfigV4 = {
  id: "gallons-to-liters",
  version: "4.0",
  category: "conversion",
  icon: "🛢️",

  presets: [
    { id: "carTank", icon: "⛽", values: { amount: 15 } },
    { id: "waterJug", icon: "💧", values: { amount: 5 } },
    { id: "swimmingPool", icon: "🏊", values: { amount: 20000 } },
  ],

  t: {
    en: {
      name: "Gallons to Liters Converter",
      slug: "gallons-to-liters",
      subtitle: "Convert gallons to liters instantly. Works for US and UK gallons with metric equivalents.",
      breadcrumb: "Gal to L",

      seo: {
        title: "Gallons to Liters Converter - Free Volume Tool",
        description: "Convert US and UK gallons to liters instantly. Essential for cooking, fuel economy, and international recipes. Includes quarts, pints, and cups.",
        shortDescription: "Convert gallons to liters for cooking and fuel.",
        keywords: ["gallons to liters", "gal to L", "volume converter", "US gallon", "UK gallon", "imperial gallon", "metric conversion", "fuel converter"],
      },

      calculator: { yourInformation: "Enter Volume" },
      ui: { yourInformation: "Enter Volume", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Volume", helpText: "Enter the volume to convert" },
      },

      results: {
        liters: { label: "Liters" },
        milliliters: { label: "Milliliters" },
        cubicMeters: { label: "Cubic Meters" },
      },

      presets: {
        carTank: { label: "Car Gas Tank", description: "15 gallons (~57 L)" },
        waterJug: { label: "Water Jug", description: "5 gallons (~19 L)" },
        swimmingPool: { label: "Swimming Pool", description: "20,000 gal (~76,000 L)" },
      },

      values: { "L": "L", "mL": "mL", "m³": "m³", "gal": "gal", "qt": "qt", "pt": "pt", "cups": "cups", "fl oz": "fl oz" },

      formats: { summary: "{value} gal = {liters} L" },

      infoCards: {
        results: {
          title: "Conversion Results",
          items: [
            { label: "Liters", valueKey: "liters" },
            { label: "Milliliters", valueKey: "milliliters" },
            { label: "Cubic Meters", valueKey: "cubicMeters" },
            { label: "Quarts", valueKey: "quarts" },
          ],
        },
        reference: {
          title: "Quick Reference",
          items: [
            { label: "1 US Gallon", valueKey: "ref1gal" },
            { label: "1 UK Gallon", valueKey: "ref1ukgal" },
            { label: "5 US Gallons", valueKey: "ref5gal" },
            { label: "10 US Gallons", valueKey: "ref10gal" },
          ],
        },
        tips: {
          title: "Conversion Tips",
          items: [
            "US gallon = 3.785 liters, UK gallon = 4.546 liters",
            "UK gallons are ~20% larger than US gallons",
            "1 gallon = 4 quarts = 8 pints = 16 cups",
            "For fuel: multiply MPG by 0.425 to get km/L",
          ],
        },
      },

      education: {
        whatIs: {
          title: "Understanding Gallons and Liters",
          content: "Gallons and liters are both units of volume, but they come from different measurement systems. The gallon is used primarily in the United States (US gallon = 3.785 L) and the United Kingdom (Imperial gallon = 4.546 L). The liter is the standard metric unit used worldwide. Understanding the conversion is essential for international cooking, fuel economy comparisons, and scientific applications.",
        },
        howItWorks: {
          title: "How the Conversion Works",
          content: "To convert US gallons to liters, multiply by 3.78541. For UK gallons, multiply by 4.54609. The difference exists because the US gallon is based on the wine gallon (231 cubic inches) while the UK gallon is based on 10 pounds of water. This converter automatically detects which gallon type you're using based on your selection.",
        },
        considerations: {
          title: "Important Considerations",
          items: [
            { text: "US gallon (3.785 L) is used in the United States", type: "info" },
            { text: "UK/Imperial gallon (4.546 L) is used in the UK and some Commonwealth countries", type: "info" },
            { text: "Always verify which gallon type your source uses", type: "warning" },
            { text: "Fuel economy varies significantly: 30 MPG (US) ≈ 36 MPG (UK)", type: "info" },
            { text: "Recipes from different countries may use different gallon sizes", type: "warning" },
            { text: "Scientific applications typically use liters or milliliters", type: "info" },
          ],
        },
        commonVolumes: {
          title: "Common Volume Conversions",
          items: [
            { text: "1 US gallon = 3.785 liters = 128 fl oz", type: "info" },
            { text: "1 UK gallon = 4.546 liters = 160 UK fl oz", type: "info" },
            { text: "1 liter = 0.264 US gallons = 0.22 UK gallons", type: "info" },
            { text: "1 quart = 0.946 liters (US) or 1.137 liters (UK)", type: "info" },
            { text: "1 pint = 473 mL (US) or 568 mL (UK)", type: "info" },
            { text: "1 cup = 237 mL (US) or 284 mL (UK)", type: "info" },
          ],
        },
        examples: {
          title: "Conversion Examples",
          description: "Real-world scenarios",
          examples: [
            {
              title: "Car Fuel Tank",
              steps: ["Tank capacity: 15 US gallons", "Convert: 15 × 3.785 = 56.78 liters", "This is typical for mid-size sedans"],
              result: "15 gal = 56.78 L",
            },
            {
              title: "Recipe Conversion",
              steps: ["Recipe calls for 0.5 UK gallons of milk", "Convert: 0.5 × 4.546 = 2.27 liters", "Note: UK gallon is larger than US"],
              result: "0.5 UK gal = 2.27 L",
            },
          ],
        },
      },

      faqs: [
        { question: "What's the difference between US and UK gallons?", answer: "A US gallon equals 3.785 liters (128 fl oz), while a UK/Imperial gallon equals 4.546 liters (160 UK fl oz). The UK gallon is approximately 20% larger than the US gallon." },
        { question: "How do I convert gallons to liters?", answer: "Multiply US gallons by 3.78541 or UK gallons by 4.54609. For example, 5 US gallons = 5 × 3.785 = 18.93 liters." },
        { question: "Which countries use gallons?", answer: "The US uses US gallons for fuel and liquids. The UK officially uses liters but still references gallons informally. Some Caribbean and Latin American countries also use US gallons." },
        { question: "Why are there different gallon sizes?", answer: "The US gallon (231 cubic inches) was based on the English wine gallon, while the UK Imperial gallon was defined in 1824 as the volume of 10 pounds of water at 62°F." },
        { question: "How many liters in a gallon of gas?", answer: "In the US, 1 gallon of gas = 3.785 liters. Gas stations in metric countries sell fuel by the liter. To compare prices, divide the per-gallon price by 3.785." },
        { question: "How do I convert fuel economy from MPG to L/100km?", answer: "Divide 235.215 by the MPG value. For example, 30 MPG = 235.215 ÷ 30 = 7.84 L/100km. Lower L/100km means better fuel economy." },
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
      step: 0.1,
      unitType: "volume",
      syncGroup: false,
      defaultUnit: "gal_us",
      allowedUnits: ["gal_us", "gal_uk", "L", "mL", "qt_us", "pt_us", "cups", "fl_oz"],
    },
  ],

  inputGroups: [],

  results: [
    { id: "liters", type: "primary", format: "number" },
    { id: "milliliters", type: "secondary", format: "number" },
    { id: "cubicMeters", type: "secondary", format: "number" },
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
    { id: "commonVolumes", type: "list", icon: "🔢", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "NIST", year: "2024", title: "Handbook 44 - Specifications for Volume Measures", source: "National Institute of Standards and Technology", url: "https://www.nist.gov/pml/weights-and-measures/publications/nist-handbooks/handbook-44" },
    { authors: "UK Weights and Measures Act", year: "1985", title: "Units of Measurement Regulations", source: "UK Government", url: "https://www.legislation.gov.uk/ukpga/1985/72" },
  ],

  hero: { badge: "Volume Converter", title: "Gallons to Liters" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["cups-to-ml", "mph-to-kmh", "square-feet-to-square-meters"],
  ads: { showTopBanner: false, showSidebar: true, showBetweenSections: false },
};

// ============================================================================
// CALCULATE FUNCTION
// ============================================================================

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) < 0.001) return val.toExponential(2);
  if (Math.abs(val) >= 1000) return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 4 });
}

export function calculateGallonsToLiters(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};

  const amount = values.amount as number;
  const fromUnit = fieldUnits.amount || "gal_us";

  if (amount === undefined || amount === null || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Conversion factors to liters (from registry.ts VOLUME)
  const toL: Record<string, number> = {
    "gal_us": 3.78541,
    "gal_uk": 4.54609,
    "L": 1,
    "mL": 0.001,
    "qt_us": 0.946353,
    "pt_us": 0.473176,
    "cups": 0.24,
    "fl_oz": 0.0295735,
  };

  const factor = toL[fromUnit] || 3.78541;
  const liters = amount * factor;
  const milliliters = liters * 1000;
  const cubicMeters = liters / 1000;
  const quarts = liters / 0.946353;

  // Reference values
  const ref1gal = 3.78541;
  const ref1ukgal = 4.54609;
  const ref5gal = 5 * 3.78541;
  const ref10gal = 10 * 3.78541;

  const lUnit = v["L"] || "L";
  const mlUnit = v["mL"] || "mL";
  const m3Unit = v["m³"] || "m³";
  const qtUnit = v["qt"] || "qt";

  return {
    values: { liters, milliliters, cubicMeters, quarts, ref1gal, ref1ukgal, ref5gal, ref10gal },
    formatted: {
      liters: `${fmtNum(liters)} ${lUnit}`,
      milliliters: `${fmtNum(milliliters)} ${mlUnit}`,
      cubicMeters: `${fmtNum(cubicMeters)} ${m3Unit}`,
      quarts: `${fmtNum(quarts)} ${qtUnit}`,
      ref1gal: `${fmtNum(ref1gal)} ${lUnit}`,
      ref1ukgal: `${fmtNum(ref1ukgal)} ${lUnit}`,
      ref5gal: `${fmtNum(ref5gal)} ${lUnit}`,
      ref10gal: `${fmtNum(ref10gal)} ${lUnit}`,
    },
    summary: `${fmtNum(amount)} ${fromUnit} = ${fmtNum(liters)} ${lUnit}`,
    isValid: true,
  };
}

export default gallonsToLitersConverterConfig;
