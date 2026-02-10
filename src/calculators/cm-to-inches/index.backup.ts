import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase, convert } from "@/engine/v4/units";

// ============================================================================
// CM TO INCHES CONVERTER - V4 (EN ONLY)
// ============================================================================

export const cmToInchesConverterConfig: CalculatorConfigV4 = {
  id: "cm-to-inches",
  version: "4.0",
  category: "conversion",
  icon: "📏",

  presets: [
    { id: "height170", icon: "🧑", values: { amount: 170 } },
    { id: "foot30", icon: "👣", values: { amount: 30 } },
    { id: "meter100", icon: "📏", values: { amount: 100 } },
  ],

  t: {
    en: {
      name: "CM to Inches Converter",
      slug: "cm-to-inches",
      subtitle: "Convert centimeters to inches instantly with a conversion table for common values.",
      breadcrumb: "CM to Inches",

      seo: {
        title: "CM to Inches Converter - Free Centimeter to Inch Tool",
        description: "Convert centimeters to inches instantly. Includes a reference table, feet and inches breakdown, and common conversions for height, screen sizes, and measurements.",
        shortDescription: "Convert centimeters to inches instantly.",
        keywords: ["cm to inches", "centimeters to inches", "cm to in converter", "convert cm to inches", "cm to inches chart", "free cm converter", "metric to imperial"],
      },

      calculator: { yourInformation: "CM to Inches" },
      ui: { yourInformation: "CM to Inches", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Centimeters (cm)", helpText: "Enter the value in centimeters" },
      },

      results: {
        inches: { label: "Inches" },
        feetInches: { label: "Feet & Inches" },
        feet: { label: "Feet (decimal)" },
        millimeters: { label: "Millimeters" },
      },

      presets: {
        height170: { label: "170 cm", description: "Average height ~5'7\"" },
        foot30: { label: "30 cm", description: "About 1 foot" },
        meter100: { label: "100 cm", description: "1 meter" },
      },

      values: { "in": "in", "ft": "ft", "cm": "cm", "mm": "mm" },
      formats: { summary: "{cm} cm = {inches} inches" },

      infoCards: {
        results: {
          title: "📏 Conversion Results",
          items: [
            { label: "Inches", valueKey: "inches" },
            { label: "Feet & Inches", valueKey: "feetInches" },
            { label: "Feet (decimal)", valueKey: "feet" },
            { label: "Millimeters", valueKey: "millimeters" },
          ],
        },
        quickRef: {
          title: "📊 Quick Reference",
          items: [
            { label: "1 cm", valueKey: "ref1" },
            { label: "10 cm", valueKey: "ref10" },
            { label: "30 cm (≈1 ft)", valueKey: "ref30" },
            { label: "100 cm (1 m)", valueKey: "ref100" },
          ],
        },
        tips: {
          title: "💡 Conversion Tips",
          items: [
            "1 inch = exactly 2.54 cm — divide cm by 2.54 to get inches.",
            "Quick estimate: divide cm by 2.5 for a rough inch value.",
            "For height: 5 feet = 152.4 cm, 6 feet = 182.88 cm.",
            "Screen sizes (TVs, monitors) are always measured diagonally in inches.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert CM to Inches",
          content: "To convert centimeters to inches, divide the centimeter value by 2.54. The inch is defined as exactly 25.4 millimeters (2.54 centimeters) by international agreement since 1959. This means 1 cm = 0.393701 inches. For example, 170 cm ÷ 2.54 = 66.93 inches, which equals 5 feet 6.93 inches. This conversion is commonly needed for height measurements, screen sizes, paper dimensions, and any time you need to translate between metric and imperial systems.",
        },
        howItWorks: {
          title: "The CM to Inches Formula",
          content: "The formula is simple: inches = centimeters ÷ 2.54. Since 1 inch = 2.54 cm exactly, dividing by 2.54 converts any centimeter measurement to inches. To also express the result in feet and inches: divide total inches by 12 to get feet, and the remainder is the inches portion. For example: 180 cm ÷ 2.54 = 70.87 inches. Then 70.87 ÷ 12 = 5 feet with 10.87 inches remaining, so 180 cm = 5'10.9\".",
        },
        considerations: {
          title: "Common CM to Inches Conversions",
          items: [
            { text: "1 cm = 0.3937 inches — less than half an inch", type: "info" },
            { text: "2.54 cm = 1 inch exactly — the fundamental conversion factor", type: "info" },
            { text: "30.48 cm = 1 foot (12 inches) exactly", type: "info" },
            { text: "91.44 cm = 1 yard (3 feet) exactly", type: "info" },
            { text: "152.4 cm = 5 feet — common height reference point", type: "info" },
            { text: "182.88 cm = 6 feet — another common height reference", type: "info" },
          ],
        },
        heightChart: {
          title: "Height Conversion Chart",
          items: [
            { text: "150 cm = 4'11.1\" — short adult height", type: "info" },
            { text: "160 cm = 5'3.0\" — average female height in many countries", type: "info" },
            { text: "170 cm = 5'6.9\" — between average male and female globally", type: "info" },
            { text: "175 cm = 5'8.9\" — average male height in the US", type: "info" },
            { text: "180 cm = 5'10.9\" — tall in most countries", type: "info" },
            { text: "190 cm = 6'2.8\" — very tall, basketball player range", type: "info" },
          ],
        },
        examples: {
          title: "CM to Inches Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Convert 175 cm to feet and inches",
              steps: ["175 ÷ 2.54 = 68.898 inches", "68.898 ÷ 12 = 5 feet remainder 8.898", "Round: 5 feet 8.9 inches", "Or approximately 5'9\""],
              result: "175 cm = 5 feet 8.9 inches (≈ 5'9\")",
            },
            {
              title: "Convert 55-inch TV to cm",
              steps: ["55 inches × 2.54 = 139.7 cm", "Screen diagonal = 139.7 cm", "Width (16:9) ≈ 121.7 cm", "Height (16:9) ≈ 68.5 cm"],
              result: "55 inches = 139.7 cm diagonal",
            },
          ],
        },
      },

      faqs: [
        { question: "How many inches is 1 cm?", answer: "1 centimeter equals 0.393701 inches. To convert cm to inches, divide the cm value by 2.54. For example, 10 cm = 10 ÷ 2.54 = 3.937 inches." },
        { question: "How do I convert cm to feet and inches?", answer: "First divide cm by 2.54 to get total inches. Then divide total inches by 12 — the whole number is feet, the remainder is inches. Example: 170 cm ÷ 2.54 = 66.93 in; 66.93 ÷ 12 = 5 ft 6.93 in ≈ 5'7\"." },
        { question: "What is 170 cm in feet and inches?", answer: "170 cm = 66.93 inches = 5 feet 6.93 inches, which is approximately 5'7\". This is close to the average adult height in many countries." },
        { question: "What is 180 cm in feet?", answer: "180 cm = 70.87 inches = 5 feet 10.87 inches, approximately 5'11\". This is considered above-average height for males in most countries." },
        { question: "How many cm in a foot?", answer: "There are exactly 30.48 centimeters in one foot. This is because 1 foot = 12 inches, and 1 inch = 2.54 cm, so 12 × 2.54 = 30.48 cm." },
        { question: "Is cm to inches exact or approximate?", answer: "The conversion is exact: 1 inch = exactly 2.54 cm by international definition (since 1959). So 1 cm = exactly 10/25.4 inches = 0.393700787... inches. Any rounding in results is due to decimal display, not imprecision in the conversion factor." },
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
      placeholder: "170",
      min: 0,
      unitType: "length_small",
      syncGroup: false,
      defaultUnit: "cm",
    },
  ],

  inputGroups: [],

  results: [
    { id: "inches", type: "primary", format: "text" },
    { id: "feetInches", type: "secondary", format: "text" },
    { id: "feet", type: "secondary", format: "text" },
    { id: "millimeters", type: "secondary", format: "text" },
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
    { id: "heightChart", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 — Specifications for Length", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-length" },
    { authors: "Bureau International des Poids et Mesures", year: "2023", title: "SI Brochure: Definition of the Metre", source: "BIPM", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Conversion", title: "CM to Inches" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["inches-to-cm", "length-converter", "feet-to-meters"],
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

export function calculateCmToInches(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Convert any input unit to mm (base of length_small), then to cm
  const fromUnit = fieldUnits.amount || "cm";
  const mm = convertToBase(amount, fromUnit, "length_small");
  const cm = mm / 10;

  const inches = cm / 2.54;
  const totalFeet = inches / 12;
  const feetPart = Math.floor(totalFeet);
  const inchesPart = inches - (feetPart * 12);
  const millimeters = cm * 10;

  // Quick reference
  const ref1 = 1 / 2.54;
  const ref10 = 10 / 2.54;
  const ref30 = 30 / 2.54;
  const ref100 = 100 / 2.54;

  return {
    values: { inches, feetInches: inches, feet: totalFeet, millimeters: mm },
    formatted: {
      inches: `${fmtNum(inches)} in`,
      feetInches: `${feetPart}' ${fmtNum(Math.round(inchesPart * 10) / 10)}"`,
      feet: `${fmtNum(totalFeet)} ft`,
      millimeters: `${fmtNum(mm)} mm`,
      ref1: `${fmtNum(ref1)} in`,
      ref10: `${fmtNum(ref10)} in`,
      ref30: `${fmtNum(ref30)} in (≈1 ft)`,
      ref100: `${fmtNum(ref100)} in`,
    },
    summary: `${fmtNum(cm)} cm = ${fmtNum(inches)} inches = ${feetPart}' ${Math.round(inchesPart * 10) / 10}"`,
    isValid: true,
  };
}

export default cmToInchesConverterConfig;
