import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// INCHES TO FEET CONVERTER - V4 (EN ONLY)
// ============================================================================

export const inchesToFeetConverterConfig: CalculatorConfigV4 = {
  id: "inches-to-feet",
  version: "4.0",
  category: "everyday",
  icon: "📐",

  presets: [
    { id: "tv55", icon: "📺", values: { amount: 55 } },
    { id: "height70", icon: "🧑", values: { amount: 70 } },
    { id: "yard36", icon: "📏", values: { amount: 36 } },
  ],

  t: {
    en: {
      name: "Inches to Feet Converter",
      slug: "inches-to-feet",
      subtitle: "Convert inches to feet and inches instantly — great for height, screen sizes, and measurements.",
      breadcrumb: "Inches to Feet",

      seo: {
        title: "Inches to Feet Converter - Free Measurement Tool",
        description: "Convert inches to feet instantly. Ideal for height measurements, TV screen sizes, and construction. Shows feet-and-inches breakdown with metric equivalents.",
        shortDescription: "Convert inches to feet instantly.",
        keywords: ["inches to feet", "in to ft converter", "convert inches to feet", "inches to feet and inches", "height in feet", "free inches to feet", "70 inches in feet"],
      },

      calculator: { yourInformation: "Inches to Feet" },
      ui: { yourInformation: "Inches to Feet", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Length", helpText: "Enter value and select unit" },
      },

      results: {
        feetDecimal: { label: "Feet (decimal)" },
        feetInches: { label: "Feet & Inches" },
        centimeters: { label: "Centimeters" },
        meters: { label: "Meters" },
        yards: { label: "Yards" },
      },

      presets: {
        tv55: { label: "55 inches", description: "55\" TV diagonal" },
        height70: { label: "70 inches", description: "5'10\" — average male height" },
        yard36: { label: "36 inches", description: "1 yard = 3 feet exactly" },
      },

      values: { "ft": "ft", "in": "in", "cm": "cm", "m": "m", "yd": "yd" },
      formats: { summary: "{in} in = {feetInches}" },

      infoCards: {
        results: {
          title: "📐 Conversion Results",
          items: [
            { label: "Feet (decimal)", valueKey: "feetDecimal" },
            { label: "Feet & Inches", valueKey: "feetInches" },
            { label: "Centimeters", valueKey: "centimeters" },
            { label: "Meters", valueKey: "meters" },
          ],
        },
        quickRef: {
          title: "📊 Quick Reference",
          items: [
            { label: "12 inches", valueKey: "ref12" },
            { label: "24 inches", valueKey: "ref24" },
            { label: "48 inches", valueKey: "ref48" },
            { label: "72 inches", valueKey: "ref72" },
          ],
        },
        tips: {
          title: "💡 Quick Tips",
          items: [
            "Divide inches by 12 to get feet — the remainder is inches.",
            "12 inches = 1 foot, 36 inches = 3 feet (1 yard), 72 inches = 6 feet.",
            "TV screens are measured diagonally — a 55\" TV is about 4.6 feet wide.",
            "Height: 60\" = 5'0\", 66\" = 5'6\", 72\" = 6'0\".",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert Inches to Feet",
          content: "To convert inches to feet, divide by 12 (since 1 foot = 12 inches). The whole number is feet, and the remainder is the leftover inches. For example, 70 inches ÷ 12 = 5 remainder 10, so 70 inches = 5 feet 10 inches. This conversion is used constantly in everyday American life — for height measurements, lumber dimensions, furniture sizing, and screen sizes. The inch-to-foot relationship is one of the most fundamental in the US measurement system.",
        },
        howItWorks: {
          title: "The Inches to Feet Formula",
          content: "The formula is: feet = inches ÷ 12. For feet and inches: whole feet = floor(inches ÷ 12), remaining inches = inches mod 12. For decimal feet: simply divide by 12. Example: 67 inches → 67 ÷ 12 = 5.583 ft → 5 ft + (0.583 × 12) = 5 ft 7 in. For metric: multiply inches by 2.54 to get cm. So 67\" × 2.54 = 170.18 cm.",
        },
        considerations: {
          title: "Common Inches to Feet Conversions",
          items: [
            { text: "48 inches = 4'0\" — standard countertop clearance", type: "info" },
            { text: "60 inches = 5'0\" — petite adult height", type: "info" },
            { text: "66 inches = 5'6\" — near-average height", type: "info" },
            { text: "70 inches = 5'10\" — average US male height", type: "info" },
            { text: "72 inches = 6'0\" (1 yard × 2) — tall benchmark", type: "info" },
            { text: "96 inches = 8'0\" — standard US ceiling height", type: "info" },
          ],
        },
        screenSizes: {
          title: "TV & Screen Sizes (diagonal inches → feet)",
          items: [
            { text: "32\" TV: 2'4\" × 1'4\" (28\" × 16\" actual screen)", type: "info" },
            { text: "43\" TV: 3'2\" × 1'9\" (37.5\" × 21\" actual)", type: "info" },
            { text: "55\" TV: 4'0\" × 2'3\" (48\" × 27\" actual)", type: "info" },
            { text: "65\" TV: 4'9\" × 2'8\" (57\" × 32\" actual)", type: "info" },
            { text: "75\" TV: 5'5\" × 3'1\" (65\" × 37\" actual)", type: "info" },
            { text: "85\" TV: 6'2\" × 3'5\" (74\" × 42\" actual)", type: "info" },
          ],
        },
        examples: {
          title: "Inches to Feet Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Convert 67 inches (height) to feet",
              steps: ["67 ÷ 12 = 5 remainder 7", "5 feet and 7 inches", "In cm: 67 × 2.54 = 170.18 cm", "In meters: 1.70 m"],
              result: "67 inches = 5'7\" (170.2 cm)",
            },
            {
              title: "55-inch TV actual dimensions",
              steps: ["55\" is the diagonal measurement", "For 16:9 ratio: width = 55 × cos(29.4°) = 47.9\"", "Height = 55 × sin(29.4°) = 27\"", "47.9\" ÷ 12 = 4'0\", 27\" ÷ 12 = 2'3\""],
              result: "55\" TV ≈ 4'0\" wide × 2'3\" tall",
            },
          ],
        },
      },

      faqs: [
        { question: "How many feet is 72 inches?", answer: "72 inches = exactly 6 feet (72 ÷ 12 = 6). This is a clean conversion with no remaining inches." },
        { question: "How do I convert inches to feet and inches?", answer: "Divide total inches by 12. The whole number is feet, and the remainder is inches. Example: 67\" ÷ 12 = 5 feet, remainder 7 inches → 5'7\"." },
        { question: "How many feet is 60 inches?", answer: "60 inches = exactly 5 feet (60 ÷ 12 = 5). In metric, 60 inches = 152.4 cm = 1.524 m." },
        { question: "How tall is 70 inches in feet?", answer: "70 inches = 5 feet 10 inches (70 ÷ 12 = 5 remainder 10). This is approximately the average height for US adult males. In metric: 177.8 cm." },
        { question: "What is 55 inches in feet?", answer: "55 inches = 4 feet 7 inches (55 ÷ 12 = 4 remainder 7). TV screen sizes are measured diagonally — a 55\" TV is about 48\" (4 feet) wide and 27\" (2.25 feet) tall for 16:9 aspect ratio." },
        { question: "How many inches are in a yard?", answer: "1 yard = 36 inches = 3 feet exactly. A yard is a common unit for fabric, field sports (football), and landscaping measurements." },
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
      placeholder: "70",
      min: 0,
      unitType: "length",
      syncGroup: false,
      defaultUnit: "in",
      allowedUnits: ["mm", "cm", "m", "km", "in", "ft", "yd", "mi"],
    },
  ],

  inputGroups: [],

  results: [
    { id: "feetDecimal", type: "primary", format: "text" },
    { id: "feetInches", type: "secondary", format: "text" },
    { id: "centimeters", type: "secondary", format: "text" },
    { id: "meters", type: "secondary", format: "text" },
    { id: "yards", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "results", type: "list", icon: "📐", itemCount: 4 },
    { id: "quickRef", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "screenSizes", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 — Length Specifications", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-length" },
    { authors: "Bureau International des Poids et Mesures", year: "2023", title: "SI Brochure: The International System of Units", source: "BIPM", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Conversion", title: "Inches to Feet" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["feet-to-meters", "inches-to-cm", "length-converter"],
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

export function calculateInchesToFeet(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const fromUnit = fieldUnits.amount || "in";
  const meters = convertToBase(amount, fromUnit, "length");

  const totalInches = meters / 0.0254;
  const totalFeet = totalInches / 12;
  const feetPart = Math.floor(totalInches / 12);
  const inchesPart = totalInches - feetPart * 12;
  const cm = meters * 100;
  const yards = meters / 0.9144;

  return {
    values: { feetDecimal: totalFeet, feetInches: totalFeet, centimeters: cm, meters, yards },
    formatted: {
      feetDecimal: `${fmtNum(totalFeet)} ft`,
      feetInches: `${feetPart}' ${fmtNum(Math.round(inchesPart * 10) / 10)}"`,
      centimeters: `${fmtNum(cm)} cm`,
      meters: `${fmtNum(meters)} m`,
      yards: `${fmtNum(yards)} yd`,
      ref12: "1' 0\" (1 foot)",
      ref24: "2' 0\" (2 feet)",
      ref48: "4' 0\" (4 feet)",
      ref72: "6' 0\" (6 feet)",
    },
    summary: `${fmtNum(amount)} ${fromUnit} = ${feetPart}' ${Math.round(inchesPart * 10) / 10}" (${fmtNum(totalFeet)} ft)`,
    isValid: true,
  };
}

export default inchesToFeetConverterConfig;
