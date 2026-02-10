import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// OZ TO ML CONVERTER - V4 (EN ONLY)
// ============================================================================

export const ozToMlConverterConfig: CalculatorConfigV4 = {
  id: "oz-to-ml",
  version: "4.0",
  category: "everyday",
  icon: "🥤",

  presets: [
    { id: "shot", icon: "🥃", values: { amount: 1.5 } },
    { id: "cup8oz", icon: "☕", values: { amount: 8 } },
    { id: "bottle16", icon: "🍶", values: { amount: 16.9 } },
  ],

  t: {
    en: {
      name: "OZ to ML Converter",
      slug: "oz-to-ml",
      subtitle: "Convert fluid ounces to milliliters instantly — essential for cooking, drinks, medicine, and travel.",
      breadcrumb: "OZ to ML",

      seo: {
        title: "OZ to ML Converter - Free Volume Conversion Tool",
        description: "Convert fluid ounces to milliliters instantly. Essential for cooking recipes, drink measurements, medicine dosing, and travel. Includes cups, liters, and common bottle sizes.",
        shortDescription: "Convert fluid ounces to milliliters instantly.",
        keywords: ["oz to ml", "ounces to milliliters", "fl oz to ml converter", "convert oz to ml", "fluid ounces to ml", "free oz converter", "imperial to metric volume"],
      },

      calculator: { yourInformation: "OZ to ML" },
      ui: { yourInformation: "OZ to ML", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Volume", helpText: "Enter value and select unit" },
      },

      results: {
        milliliters: { label: "Milliliters" },
        liters: { label: "Liters" },
        cups: { label: "US Cups" },
        tablespoons: { label: "Tablespoons" },
        teaspoons: { label: "Teaspoons" },
      },

      presets: {
        shot: { label: "1.5 fl oz", description: "Standard shot (44.4 mL)" },
        cup8oz: { label: "8 fl oz", description: "1 US cup (236.6 mL)" },
        bottle16: { label: "16.9 fl oz", description: "Standard water bottle (500 mL)" },
      },

      values: { "mL": "mL", "L": "L", "cups": "cups", "tbsp": "tbsp", "tsp": "tsp", "fl oz": "fl oz" },
      formats: { summary: "{oz} fl oz = {ml} mL" },

      infoCards: {
        results: {
          title: "🥤 Conversion Results",
          items: [
            { label: "Milliliters", valueKey: "milliliters" },
            { label: "Liters", valueKey: "liters" },
            { label: "US Cups", valueKey: "cups" },
            { label: "Tablespoons", valueKey: "tablespoons" },
          ],
        },
        quickRef: {
          title: "📊 Common Sizes",
          items: [
            { label: "1 fl oz", valueKey: "ref1" },
            { label: "8 fl oz (1 cup)", valueKey: "ref8" },
            { label: "12 fl oz (soda can)", valueKey: "ref12" },
            { label: "33.8 fl oz (1 liter)", valueKey: "ref34" },
          ],
        },
        tips: {
          title: "💡 Volume Tips",
          items: [
            "1 fl oz = 29.5735 mL — multiply oz by 30 for a quick estimate.",
            "Standard soda can: 12 fl oz = 355 mL. Water bottle: 16.9 fl oz = 500 mL.",
            "1 US cup = 8 fl oz = 236.6 mL (NOT 250 mL — metric cup is different).",
            "Medicine: 1 teaspoon = 5 mL, 1 tablespoon = 15 mL = 0.5 fl oz.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert Fluid Ounces to Milliliters",
          content: "To convert US fluid ounces to milliliters, multiply by 29.5735. One US fluid ounce equals exactly 29.5735 mL. Note: a fluid ounce (volume) is different from an ounce (weight). Also, US fluid ounces differ from UK (Imperial) fluid ounces — 1 UK fl oz = 28.4131 mL. This converter uses US fluid ounces, which are standard in American recipes, nutrition labels, and drink sizes. The milliliter (1/1000 of a liter) is used worldwide for liquid measurements.",
        },
        howItWorks: {
          title: "The OZ to ML Formula",
          content: "The formula is: mL = fluid ounces × 29.5735. For quick mental math, multiply by 30 (error < 1.5%). For cups: 1 US cup = 8 fl oz = 236.588 mL (NOT 250 mL — that's a metric cup used in Australia). For tablespoons: 1 tbsp = 0.5 fl oz = 14.787 mL. For teaspoons: 1 tsp = 1/6 fl oz = 4.929 mL ≈ 5 mL. These relationships make it easy to convert between kitchen measurements.",
        },
        considerations: {
          title: "Common OZ to ML Conversions",
          items: [
            { text: "1 fl oz = 29.57 mL — the fundamental conversion", type: "info" },
            { text: "2 fl oz = 59.15 mL — standard espresso double shot", type: "info" },
            { text: "8 fl oz = 236.59 mL — 1 US cup", type: "info" },
            { text: "12 fl oz = 354.88 mL — standard soda can", type: "info" },
            { text: "16 fl oz = 473.18 mL — US pint", type: "info" },
            { text: "33.814 fl oz = 1,000 mL — 1 liter", type: "info" },
          ],
        },
        drinkSizes: {
          title: "Common Drink Sizes (fl oz → mL)",
          items: [
            { text: "Espresso shot: 1 fl oz = 30 mL", type: "info" },
            { text: "Standard shot (liquor): 1.5 fl oz = 44 mL", type: "info" },
            { text: "Juice box: 6.75 fl oz = 200 mL", type: "info" },
            { text: "Soda can: 12 fl oz = 355 mL", type: "info" },
            { text: "Water bottle: 16.9 fl oz = 500 mL", type: "info" },
            { text: "Wine bottle: 25.4 fl oz = 750 mL", type: "info" },
          ],
        },
        examples: {
          title: "OZ to ML Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Recipe: 3/4 cup milk in mL",
              steps: ["3/4 cup = 6 fl oz", "6 × 29.5735 = 177.4 mL", "Quick: 6 × 30 = 180 mL (close enough)", "Use 175 mL for a metric recipe"],
              result: "3/4 cup = 6 fl oz = 177.4 mL",
            },
            {
              title: "Medicine: 2 tablespoons to mL",
              steps: ["1 tablespoon = 0.5 fl oz", "2 tablespoons = 1 fl oz", "1 × 29.5735 = 29.57 mL", "Or: 2 × 15 mL = 30 mL (standard dose)"],
              result: "2 tbsp = 1 fl oz ≈ 30 mL",
            },
          ],
        },
      },

      faqs: [
        { question: "How many mL is 1 fl oz?", answer: "1 US fluid ounce = 29.5735 mL. For quick cooking conversions, 30 mL is close enough (error < 1.5%). Note: 1 UK (Imperial) fl oz = 28.4131 mL, slightly smaller." },
        { question: "How many fl oz is 500 mL?", answer: "500 mL = 16.907 fl oz, commonly written as 16.9 fl oz. This is the standard size of a water bottle in the US." },
        { question: "Is a US cup 250 mL?", answer: "No. A US cup = 236.588 mL (8 fl oz), NOT 250 mL. The 250 mL \"cup\" is a metric cup used in Australia and some other countries. This 14 mL difference can matter in baking." },
        { question: "How do I convert fl oz to liters?", answer: "Divide fluid ounces by 33.814 to get liters. Example: 64 fl oz (half gallon) = 64 ÷ 33.814 = 1.893 liters. Or multiply fl oz by 0.02957 for liters." },
        { question: "What is the difference between fl oz and oz?", answer: "Fluid ounces (fl oz) measure volume (how much space a liquid takes up). Ounces (oz) measure weight/mass. For water, they're approximately equal (1 fl oz of water weighs ~1 oz), but for other liquids they differ. Honey: 1 fl oz weighs ~1.5 oz. Oil: 1 fl oz weighs ~0.8 oz." },
        { question: "How many mL in a tablespoon?", answer: "1 US tablespoon = 14.787 mL ≈ 15 mL. 1 US teaspoon = 4.929 mL ≈ 5 mL. In recipes and medicine, tablespoons and teaspoons are commonly rounded to 15 mL and 5 mL respectively." },
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
      defaultValue: null,
      placeholder: "8",
      min: 0,
      unitType: "volume",
      syncGroup: false,
      defaultUnit: "fl oz",
      allowedUnits: ["mL", "cL", "L", "tsp", "tbsp", "fl oz", "cups", "pt", "qt", "gal"],
    },
  ],

  inputGroups: [],

  results: [
    { id: "milliliters", type: "primary", format: "text" },
    { id: "liters", type: "secondary", format: "text" },
    { id: "cups", type: "secondary", format: "text" },
    { id: "tablespoons", type: "secondary", format: "text" },
    { id: "teaspoons", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "results", type: "list", icon: "🥤", itemCount: 4 },
    { id: "quickRef", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "drinkSizes", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 — Specifications for Volume", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-volume" },
    { authors: "U.S. Food and Drug Administration", year: "2024", title: "CFR Title 21 — Food Labeling", source: "FDA", url: "https://www.fda.gov/food/food-labeling-nutrition" },
  ],

  hero: { badge: "Conversion", title: "OZ to ML" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["length-converter", "kg-to-lbs"],
  ads: { showTopBanner: false, showSidebar: true, showBetweenSections: false },
};

// ============================================================================
// CALCULATE
// ============================================================================

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) >= 1e6) return val.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (Math.abs(val) >= 1000) return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (Math.abs(val) < 0.01) return val.toFixed(4);
  return val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 4 });
}

export function calculateOzToMl(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const fromUnit = fieldUnits.amount || "fl oz";
  // Volume base in registry is L (liters)
  const liters = convertToBase(amount, fromUnit, "volume");

  const mL = liters * 1000;
  const cups = mL / 236.588;
  const tbsp = mL / 14.787;
  const tsp = mL / 4.929;

  return {
    values: { milliliters: mL, liters, cups, tablespoons: tbsp, teaspoons: tsp },
    formatted: {
      milliliters: `${fmtNum(mL)} mL`,
      liters: `${fmtNum(liters)} L`,
      cups: `${fmtNum(cups)} cups`,
      tablespoons: `${fmtNum(tbsp)} tbsp`,
      teaspoons: `${fmtNum(tsp)} tsp`,
      ref1: `${fmtNum(29.5735)} mL`,
      ref8: `${fmtNum(236.588)} mL`,
      ref12: `${fmtNum(354.882)} mL`,
      ref34: `1,000 mL`,
    },
    summary: `${fmtNum(amount)} ${fromUnit} = ${fmtNum(mL)} mL (${fmtNum(liters)} L)`,
    isValid: true,
  };
}

export default ozToMlConverterConfig;
