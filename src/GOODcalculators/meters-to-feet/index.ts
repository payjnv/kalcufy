import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// METERS TO FEET CONVERTER - V4 (EN ONLY)
// ============================================================================

export const metersToFeetConverterConfig: CalculatorConfigV4 = {
  id: "meters-to-feet",
  version: "4.0",
  category: "conversion",
  icon: "📏",

  presets: [
    { id: "height180", icon: "🧑", values: { amount: 1.80 } },
    { id: "room3", icon: "🏠", values: { amount: 3 } },
    { id: "pool25", icon: "🏊", values: { amount: 25 } },
  ],

  t: {
    en: {
      name: "Meters to Feet Converter",
      slug: "meters-to-feet",
      subtitle: "Convert meters to feet instantly — ideal for height, construction, and real estate measurements.",
      breadcrumb: "Meters to Feet",

      seo: {
        title: "Meters to Feet Converter - Free Length Conversion Tool",
        description: "Convert meters to feet instantly. Ideal for height conversions, construction projects, and real estate. Includes feet-and-inches breakdown and reference table.",
        shortDescription: "Convert meters to feet instantly.",
        keywords: ["meters to feet", "m to ft converter", "convert meters to feet", "meters to feet and inches", "height converter", "free meters converter", "metric to imperial length"],
      },

      calculator: { yourInformation: "Meters to Feet" },
      ui: { yourInformation: "Meters to Feet", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Length", helpText: "Enter value and select unit" },
      },

      results: {
        feet: { label: "Feet (decimal)" },
        feetInches: { label: "Feet & Inches" },
        inches: { label: "Inches" },
        centimeters: { label: "Centimeters" },
        yards: { label: "Yards" },
      },

      presets: {
        height180: { label: "1.80 m", description: "Average tall height ~5'11\"" },
        room3: { label: "3 meters", description: "Standard room height ~10 ft" },
        pool25: { label: "25 meters", description: "Olympic short course pool" },
      },

      values: { "ft": "ft", "in": "in", "cm": "cm", "yd": "yd", "m": "m" },
      formats: { summary: "{m} m = {ft} feet" },

      infoCards: {
        results: {
          title: "📏 Conversion Results",
          items: [
            { label: "Feet (decimal)", valueKey: "feet" },
            { label: "Feet & Inches", valueKey: "feetInches" },
            { label: "Total Inches", valueKey: "inches" },
            { label: "Centimeters", valueKey: "centimeters" },
          ],
        },
        quickRef: {
          title: "📊 Quick Reference",
          items: [
            { label: "1 meter", valueKey: "ref1" },
            { label: "2 meters", valueKey: "ref2" },
            { label: "5 meters", valueKey: "ref5" },
            { label: "10 meters", valueKey: "ref10" },
          ],
        },
        tips: {
          title: "💡 Conversion Tips",
          items: [
            "1 meter = 3.28084 feet — multiply meters by 3.3 for a quick estimate.",
            "1 meter ≈ 3 feet 3⅜ inches — slightly longer than a yard.",
            "Standard ceiling height: 2.4 m = 7.87 ft (US: 8 ft = 2.44 m).",
            "A 6-foot person is 1.83 m, a 5'4\" person is 1.63 m.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert Meters to Feet",
          content: "To convert meters to feet, multiply by 3.28084. One meter equals exactly 100 centimeters or about 3 feet 3.37 inches. The meter is the base unit of length in the metric system, defined as the distance light travels in 1/299,792,458 of a second. The foot is an imperial unit used primarily in the US, UK (for height), and Canada, defined as exactly 0.3048 meters since 1959. This conversion is commonly needed for height measurements, room dimensions, property sizes, and construction projects.",
        },
        howItWorks: {
          title: "The Meters to Feet Formula",
          content: "The formula is: feet = meters × 3.28084 (or meters / 0.3048). Since 1 foot = 0.3048 meters exactly, dividing meters by 0.3048 gives precise feet. For feet and inches: multiply meters by 3.28084 to get total feet, then take the decimal portion × 12 for inches. Example: 1.75 m × 3.28084 = 5.741 ft. The .741 × 12 = 8.9 inches, so 1.75 m = 5 ft 8.9 in.",
        },
        considerations: {
          title: "Common Meters to Feet Conversions",
          items: [
            { text: "1 m = 3.281 ft = 3 ft 3.37 in — slightly more than a yard", type: "info" },
            { text: "1.5 m = 4.921 ft = 4 ft 11.1 in — short adult height", type: "info" },
            { text: "1.7 m = 5.577 ft = 5 ft 6.9 in — average height range", type: "info" },
            { text: "1.8 m = 5.906 ft = 5 ft 10.9 in — tall adult height", type: "info" },
            { text: "2.0 m = 6.562 ft = 6 ft 6.7 in — very tall", type: "info" },
            { text: "100 m = 328.084 ft — length of a football (soccer) field", type: "info" },
          ],
        },
        buildingHeights: {
          title: "Building & Structure Heights",
          items: [
            { text: "Standard door: 2.03 m = 6 ft 8 in", type: "info" },
            { text: "Standard ceiling: 2.44 m = 8 ft (US) or 2.7 m = 8 ft 10 in (EU)", type: "info" },
            { text: "Basketball hoop: 3.05 m = 10 ft", type: "info" },
            { text: "One story: ~3 m = ~10 ft", type: "info" },
            { text: "Statue of Liberty (to torch): 93 m = 305 ft", type: "info" },
            { text: "Eiffel Tower: 330 m = 1,083 ft", type: "info" },
          ],
        },
        examples: {
          title: "Meters to Feet Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Convert 1.75 m height to feet & inches",
              steps: ["1.75 × 3.28084 = 5.7415 feet", "Whole feet: 5", "Decimal: 0.7415 × 12 = 8.898 inches", "Round: 5 ft 8.9 in ≈ 5'9\""],
              result: "1.75 m = 5 ft 8.9 in (≈ 5'9\")",
            },
            {
              title: "Room: 4.5 × 3.5 meters to feet",
              steps: ["Length: 4.5 × 3.28084 = 14.76 ft", "Width: 3.5 × 3.28084 = 11.48 ft", "Area: 14.76 × 11.48 = 169.5 sq ft", "Or: 4.5 × 3.5 = 15.75 m² = 169.5 ft²"],
              result: "4.5 × 3.5 m = 14.8 × 11.5 ft (169.5 ft²)",
            },
          ],
        },
      },

      faqs: [
        { question: "How many feet is 1 meter?", answer: "1 meter equals 3.28084 feet, or about 3 feet 3.37 inches. For quick estimation, think of a meter as slightly longer than a yard (3 feet)." },
        { question: "How do I convert meters to feet and inches?", answer: "Multiply meters by 3.28084 to get decimal feet. The whole number is feet. Multiply the decimal by 12 to get inches. Example: 1.65 m × 3.28084 = 5.413 ft → 5 ft + (0.413 × 12) = 5 ft 5.0 in." },
        { question: "What is 2 meters in feet?", answer: "2 meters = 6.562 feet = 6 feet 6.7 inches. This is very tall — only about 1% of men are 6'6\" or taller." },
        { question: "How tall is 1.70 meters in feet?", answer: "1.70 m = 5.577 ft = 5 feet 6.9 inches, approximately 5'7\". This is close to the average adult height in many countries." },
        { question: "Is a meter longer than a foot?", answer: "Yes, significantly. 1 meter = 3.281 feet, so a meter is more than 3 times longer than a foot. A meter is also slightly longer than a yard (1 m = 1.094 yd)." },
        { question: "How do I convert square meters to square feet?", answer: "Multiply square meters by 10.764 to get square feet. For example, a 50 m² apartment = 538.2 sq ft. This is because (3.28084)² = 10.764." },
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
      placeholder: "1.80",
      min: 0,
      unitType: "length",
      syncGroup: false,
      defaultUnit: "m",
      allowedUnits: ["mm", "cm", "m", "km", "in", "ft", "yd", "mi"],
    },
  ],

  inputGroups: [],

  results: [
    { id: "feet", type: "primary", format: "text" },
    { id: "feetInches", type: "secondary", format: "text" },
    { id: "inches", type: "secondary", format: "text" },
    { id: "centimeters", type: "secondary", format: "text" },
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
    { id: "buildingHeights", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 — Length Specifications", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-length" },
    { authors: "Bureau International des Poids et Mesures", year: "2023", title: "SI Brochure: The International System of Units", source: "BIPM", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Conversion", title: "Meters to Feet" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["feet-to-meters", "cm-to-inches", "length-converter"],
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

export function calculateMetersToFeet(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const fromUnit = fieldUnits.amount || "m";
  const meters = convertToBase(amount, fromUnit, "length");

  const totalFeet = meters / 0.3048;
  const feetPart = Math.floor(totalFeet);
  const inchesPart = (totalFeet - feetPart) * 12;
  const totalInches = meters / 0.0254;
  const cm = meters * 100;
  const yards = meters / 0.9144;

  const ref1 = 1 / 0.3048;
  const ref2 = 2 / 0.3048;
  const ref5 = 5 / 0.3048;
  const ref10 = 10 / 0.3048;

  return {
    values: { feet: totalFeet, feetInches: totalFeet, inches: totalInches, centimeters: cm, yards },
    formatted: {
      feet: `${fmtNum(totalFeet)} ft`,
      feetInches: `${feetPart}' ${fmtNum(Math.round(inchesPart * 10) / 10)}"`,
      inches: `${fmtNum(totalInches)} in`,
      centimeters: `${fmtNum(cm)} cm`,
      yards: `${fmtNum(yards)} yd`,
      ref1: `${fmtNum(ref1)} ft`,
      ref2: `${fmtNum(ref2)} ft`,
      ref5: `${fmtNum(ref5)} ft`,
      ref10: `${fmtNum(ref10)} ft`,
    },
    summary: `${fmtNum(amount)} ${fromUnit} = ${fmtNum(totalFeet)} ft = ${feetPart}' ${Math.round(inchesPart * 10) / 10}"`,
    isValid: true,
  };
}

export default metersToFeetConverterConfig;
