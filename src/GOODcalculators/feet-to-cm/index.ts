import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// FEET TO CM CONVERTER - V4 (EN ONLY)
// ============================================================================

export const feetToCmConverterConfig: CalculatorConfigV4 = {
  id: "feet-to-cm",
  version: "4.0",
  category: "everyday",
  icon: "📏",

  presets: [
    { id: "height54", icon: "👩", values: { amount: 5.333 } },
    { id: "height59", icon: "🧑", values: { amount: 5.75 } },
    { id: "height60", icon: "🧑‍🦱", values: { amount: 6 } },
  ],

  t: {
    en: {
      name: "Feet to CM Converter",
      slug: "feet-to-cm",
      subtitle: "Convert feet to centimeters instantly — ideal for height, furniture, and room measurements.",
      breadcrumb: "Feet to CM",

      seo: {
        title: "Feet to CM Converter - Free Height Conversion Tool",
        description: "Convert feet to centimeters instantly. Ideal for height conversions, furniture sizing, and room measurements. Includes height chart and common references.",
        shortDescription: "Convert feet to centimeters instantly.",
        keywords: ["feet to cm", "ft to cm converter", "feet to centimeters", "height converter feet to cm", "5 feet in cm", "free feet to cm", "imperial to metric height"],
      },

      calculator: { yourInformation: "Feet to CM" },
      ui: { yourInformation: "Feet to CM", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Length", helpText: "Enter value and select unit" },
      },

      results: {
        centimeters: { label: "Centimeters" },
        meters: { label: "Meters" },
        millimeters: { label: "Millimeters" },
        inches: { label: "Inches" },
        yards: { label: "Yards" },
      },

      presets: {
        height54: { label: "5'4\"", description: "5.33 ft ≈ 162.6 cm (avg US female)" },
        height59: { label: "5'9\"", description: "5.75 ft ≈ 175.3 cm (avg US male)" },
        height60: { label: "6'0\"", description: "6 ft = 182.9 cm" },
      },

      values: { "cm": "cm", "m": "m", "mm": "mm", "in": "in", "yd": "yd", "ft": "ft" },
      formats: { summary: "{ft} ft = {cm} cm" },

      infoCards: {
        results: {
          title: "📏 Conversion Results",
          items: [
            { label: "Centimeters", valueKey: "centimeters" },
            { label: "Meters", valueKey: "meters" },
            { label: "Millimeters", valueKey: "millimeters" },
            { label: "Inches", valueKey: "inches" },
          ],
        },
        quickRef: {
          title: "📊 Height Chart",
          items: [
            { label: "5'0\"", valueKey: "ref50" },
            { label: "5'6\"", valueKey: "ref56" },
            { label: "6'0\"", valueKey: "ref60" },
            { label: "6'6\"", valueKey: "ref66" },
          ],
        },
        tips: {
          title: "💡 Quick Tips",
          items: [
            "Multiply feet by 30.48 to get cm — this is exact.",
            "For feet + inches: (feet × 30.48) + (inches × 2.54).",
            "Quick reference: 5 ft = 152.4 cm, 6 ft = 182.88 cm.",
            "Each additional inch adds 2.54 cm to the total.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert Feet to Centimeters",
          content: "To convert feet to centimeters, multiply by 30.48. One foot equals exactly 30.48 centimeters. For feet and inches combined, multiply the feet by 30.48 and add the inches multiplied by 2.54. This conversion is essential when comparing heights internationally, shopping for clothes or furniture from metric countries, or filling out forms that require cm. While the US uses feet and inches for height, most medical records worldwide use centimeters for greater precision.",
        },
        howItWorks: {
          title: "The Feet to CM Formula",
          content: "The formula is: cm = feet × 30.48. For feet and inches: cm = (feet × 30.48) + (inches × 2.54). The factor 30.48 comes from 12 inches per foot × 2.54 cm per inch. Example: 5'10\" = (5 × 30.48) + (10 × 2.54) = 152.4 + 25.4 = 177.8 cm. This is an exact conversion — there's no rounding involved. For decimal feet: 5.83 ft × 30.48 = 177.7 cm.",
        },
        considerations: {
          title: "Common Feet to CM Conversions",
          items: [
            { text: "5'0\" = 152.4 cm — petite height", type: "info" },
            { text: "5'4\" = 162.6 cm — average US female height", type: "info" },
            { text: "5'7\" = 170.2 cm — near global average", type: "info" },
            { text: "5'9\" = 175.3 cm — average US male height", type: "info" },
            { text: "6'0\" = 182.9 cm — considered tall", type: "info" },
            { text: "6'6\" = 198.1 cm — very tall, NBA average", type: "info" },
          ],
        },
        furnitureSizes: {
          title: "Furniture & Room Sizes (ft → cm)",
          items: [
            { text: "Standard door: 6'8\" × 2'8\" = 203 × 81 cm", type: "info" },
            { text: "Twin bed: 6'3\" × 3'3\" = 191 × 99 cm", type: "info" },
            { text: "Queen bed: 6'8\" × 5'0\" = 203 × 152 cm", type: "info" },
            { text: "King bed: 6'8\" × 6'4\" = 203 × 193 cm", type: "info" },
            { text: "Standard desk: 2'6\" high = 76 cm (30 inches)", type: "info" },
            { text: "Counter height: 3'0\" = 91.4 cm (36 inches)", type: "info" },
          ],
        },
        examples: {
          title: "Feet to CM Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Convert 5'8\" to cm",
              steps: ["Feet portion: 5 × 30.48 = 152.4 cm", "Inches portion: 8 × 2.54 = 20.32 cm", "Total: 152.4 + 20.32 = 172.72 cm", "Or: 68 total inches × 2.54 = 172.72 cm"],
              result: "5'8\" = 172.72 cm ≈ 1.73 m",
            },
            {
              title: "Room: 10 × 12 feet to cm",
              steps: ["10 ft × 30.48 = 304.8 cm = 3.048 m", "12 ft × 30.48 = 365.76 cm = 3.658 m", "Area: 120 sq ft = 11.15 m²", "Useful for furniture planning in metric"],
              result: "10 × 12 ft = 305 × 366 cm (3.05 × 3.66 m)",
            },
          ],
        },
      },

      faqs: [
        { question: "How many cm is 1 foot?", answer: "1 foot equals exactly 30.48 centimeters. This is an exact conversion factor established by international agreement in 1959." },
        { question: "How do I convert feet and inches to cm?", answer: "Multiply feet by 30.48 and inches by 2.54, then add. Example: 5'10\" = (5 × 30.48) + (10 × 2.54) = 152.4 + 25.4 = 177.8 cm. Or convert to total inches first (5 × 12 + 10 = 70) then multiply by 2.54." },
        { question: "How many cm is 5 feet?", answer: "5 feet = 152.4 cm exactly. 5'0\" = 152.4 cm, 5'6\" = 167.64 cm, 5'9\" = 175.26 cm. Each additional inch adds 2.54 cm." },
        { question: "How tall is 6 feet in cm?", answer: "6 feet = 182.88 cm, commonly rounded to 183 cm. In meters, that's about 1.83 m. 6'0\" is considered tall in most countries." },
        { question: "Why do some countries use cm and others use feet?", answer: "Most countries adopted the metric system (cm/m) by the mid-20th century. The US retained feet/inches from the British imperial system. The UK uses a mix — metric officially but feet/inches for height in daily life. For international purposes, centimeters are the standard for height." },
        { question: "How do I convert square feet to square cm?", answer: "Multiply square feet by 929.03 to get square centimeters (30.48² = 929.03). Or multiply by 0.0929 to get square meters. Example: 200 sq ft = 185,806 cm² = 18.58 m²." },
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
      placeholder: "5.75",
      min: 0,
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["mm", "cm", "m", "km", "in", "ft", "yd", "mi"],
    },
  ],

  inputGroups: [],

  results: [
    { id: "centimeters", type: "primary", format: "text" },
    { id: "meters", type: "secondary", format: "text" },
    { id: "millimeters", type: "secondary", format: "text" },
    { id: "inches", type: "secondary", format: "text" },
    { id: "yards", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "results", type: "list", icon: "📏", itemCount: 4 },
    { id: "quickRef", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "furnitureSizes", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 — Length Specifications", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-length" },
    { authors: "Centers for Disease Control and Prevention", year: "2024", title: "Anthropometric Reference Data", source: "CDC", url: "https://www.cdc.gov/nchs/data/series/sr_03/sr03-046-508.pdf" },
  ],

  hero: { badge: "Conversion", title: "Feet to CM" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["cm-to-feet", "feet-to-meters", "inches-to-cm"],
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

export function calculateFeetToCm(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const fromUnit = fieldUnits.amount || "ft";
  const meters = convertToBase(amount, fromUnit, "length");

  const cm = meters * 100;
  const mm = meters * 1000;
  const inches = meters / 0.0254;
  const yards = meters / 0.9144;

  return {
    values: { centimeters: cm, meters, millimeters: mm, inches, yards },
    formatted: {
      centimeters: `${fmtNum(cm)} cm`,
      meters: `${fmtNum(meters)} m`,
      millimeters: `${fmtNum(mm)} mm`,
      inches: `${fmtNum(inches)} in`,
      yards: `${fmtNum(yards)} yd`,
      ref50: "152.4 cm",
      ref56: "167.64 cm",
      ref60: "182.88 cm",
      ref66: "198.12 cm",
    },
    summary: `${fmtNum(amount)} ${fromUnit} = ${fmtNum(cm)} cm (${fmtNum(meters)} m)`,
    isValid: true,
  };
}

export default feetToCmConverterConfig;
