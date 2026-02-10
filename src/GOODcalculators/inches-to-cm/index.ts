import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// INCHES TO CM CONVERTER - V4 (EN ONLY)
// ============================================================================

export const inchesToCmConverterConfig: CalculatorConfigV4 = {
  id: "inches-to-cm",
  version: "4.0",
  category: "everyday",
  icon: "📏",

  presets: [
    { id: "screen55", icon: "📺", values: { amount: 55 } },
    { id: "foot12", icon: "👣", values: { amount: 12 } },
    { id: "height70", icon: "🧑", values: { amount: 70 } },
  ],

  t: {
    en: {
      name: "Inches to CM Converter",
      slug: "inches-to-cm",
      subtitle: "Convert inches to centimeters instantly with a reference table for common measurements.",
      breadcrumb: "Inches to CM",

      seo: {
        title: "Inches to CM Converter - Free Inch to Centimeter Tool",
        description: "Convert inches to centimeters instantly. Includes a conversion table, feet breakdown, and common conversions for height, screen sizes, and paper dimensions.",
        shortDescription: "Convert inches to centimeters instantly.",
        keywords: ["inches to cm", "inches to centimeters", "in to cm converter", "convert inches to cm", "inch to cm chart", "free inch converter", "imperial to metric"],
      },

      calculator: { yourInformation: "Inches to CM" },
      ui: { yourInformation: "Inches to CM", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Inches (in)", helpText: "Enter the value in inches" },
      },

      results: {
        centimeters: { label: "Centimeters" },
        meters: { label: "Meters" },
        millimeters: { label: "Millimeters" },
        feet: { label: "Feet (decimal)" },
      },

      presets: {
        screen55: { label: "55 inches", description: "Common TV screen size" },
        foot12: { label: "12 inches", description: "Exactly 1 foot" },
        height70: { label: "70 inches", description: "5'10\" — average male height" },
      },

      values: { "cm": "cm", "m": "m", "mm": "mm", "ft": "ft", "in": "in" },
      formats: { summary: "{inches} inches = {cm} cm" },

      infoCards: {
        results: {
          title: "📏 Conversion Results",
          items: [
            { label: "Centimeters", valueKey: "centimeters" },
            { label: "Meters", valueKey: "meters" },
            { label: "Millimeters", valueKey: "millimeters" },
            { label: "Feet", valueKey: "feet" },
          ],
        },
        quickRef: {
          title: "📊 Quick Reference",
          items: [
            { label: "1 inch", valueKey: "ref1" },
            { label: "6 inches", valueKey: "ref6" },
            { label: "12 inches (1 ft)", valueKey: "ref12" },
            { label: "36 inches (1 yd)", valueKey: "ref36" },
          ],
        },
        tips: {
          title: "💡 Conversion Tips",
          items: [
            "Multiply inches by 2.54 to get centimeters — this is an exact conversion.",
            "Quick estimate: multiply inches by 2.5 for a rough cm value.",
            "12 inches = 1 foot = 30.48 cm exactly.",
            "Common screen sizes: 27\" = 68.58 cm, 32\" = 81.28 cm, 55\" = 139.7 cm.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert Inches to Centimeters",
          content: "To convert inches to centimeters, multiply the inch value by 2.54. This conversion factor is exact — it was established by international agreement in 1959. One inch equals exactly 25.4 millimeters or 2.54 centimeters. For example, 70 inches × 2.54 = 177.8 cm. This conversion is commonly needed when shopping internationally, comparing screen sizes, converting height measurements, or working with technical specifications that use different measurement systems.",
        },
        howItWorks: {
          title: "The Inches to CM Formula",
          content: "The formula is straightforward: centimeters = inches × 2.54. Since this is an exact definition, there's no approximation involved. For feet and inches combined: first convert feet to inches (multiply by 12), add the remaining inches, then multiply the total by 2.54. For example, 5'10\" = (5 × 12) + 10 = 70 inches. Then 70 × 2.54 = 177.8 cm. You can also work in reverse: cm ÷ 2.54 = inches.",
        },
        considerations: {
          title: "Common Inches to CM Conversions",
          items: [
            { text: "1 inch = 2.54 cm exactly — the fundamental conversion factor", type: "info" },
            { text: "12 inches = 30.48 cm (1 foot)", type: "info" },
            { text: "36 inches = 91.44 cm (1 yard)", type: "info" },
            { text: "39.37 inches ≈ 100 cm (1 meter)", type: "info" },
            { text: "63,360 inches = 1 mile = 160,934 cm", type: "info" },
            { text: "Fraction conversion: 1/4\" = 0.635 cm, 1/2\" = 1.27 cm, 3/4\" = 1.905 cm", type: "info" },
          ],
        },
        screenSizes: {
          title: "Screen Size Conversions",
          items: [
            { text: "24 inches = 60.96 cm — popular desktop monitor size", type: "info" },
            { text: "27 inches = 68.58 cm — standard desktop monitor", type: "info" },
            { text: "32 inches = 81.28 cm — large monitor or small TV", type: "info" },
            { text: "43 inches = 109.22 cm — medium TV for bedrooms", type: "info" },
            { text: "55 inches = 139.7 cm — most popular living room TV size", type: "info" },
            { text: "65 inches = 165.1 cm — large living room TV", type: "info" },
          ],
        },
        examples: {
          title: "Inches to CM Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Convert 5'10\" height to cm",
              steps: ["5 feet = 5 × 12 = 60 inches", "Total = 60 + 10 = 70 inches", "70 × 2.54 = 177.8 cm", "Or: 5 ft × 30.48 = 152.4 cm", "Plus: 10 in × 2.54 = 25.4 cm", "Total: 152.4 + 25.4 = 177.8 cm"],
              result: "5'10\" = 70 inches = 177.8 cm",
            },
            {
              title: "Convert 8.5 × 11 inches (US Letter) to cm",
              steps: ["Width: 8.5 × 2.54 = 21.59 cm", "Height: 11 × 2.54 = 27.94 cm", "Compare to A4: 21.0 × 29.7 cm", "US Letter is slightly wider", "A4 is slightly taller"],
              result: "US Letter = 21.59 × 27.94 cm",
            },
          ],
        },
      },

      faqs: [
        { question: "How many cm is 1 inch?", answer: "1 inch equals exactly 2.54 centimeters. This is an exact definition, not an approximation. To convert any inch measurement to centimeters, multiply by 2.54." },
        { question: "How do I convert feet and inches to cm?", answer: "First convert feet to inches by multiplying by 12, then add the remaining inches. Finally, multiply total inches by 2.54. Example: 5'8\" = (5×12)+8 = 68 inches × 2.54 = 172.72 cm." },
        { question: "What is 6 feet in cm?", answer: "6 feet = 72 inches = 182.88 cm. Each foot is 30.48 cm, so 6 × 30.48 = 182.88 cm exactly." },
        { question: "How big is a 55-inch TV in cm?", answer: "A 55-inch TV has a diagonal measurement of 139.7 cm (55 × 2.54). For a 16:9 aspect ratio, the screen is approximately 121.7 cm wide and 68.5 cm tall. The overall TV dimensions are slightly larger due to the bezel." },
        { question: "What is the difference between US and UK inches?", answer: "There is no difference — the international inch is exactly 25.4 mm in both the US and UK. This was standardized in 1959 when the US, UK, Canada, Australia, New Zealand, and South Africa agreed on the exact conversion: 1 inch = 25.4 mm." },
        { question: "How do I convert inch fractions to cm?", answer: "Multiply the fraction in decimal form by 2.54. Common fractions: 1/8\" = 0.3175 cm, 1/4\" = 0.635 cm, 3/8\" = 0.9525 cm, 1/2\" = 1.27 cm, 5/8\" = 1.5875 cm, 3/4\" = 1.905 cm, 7/8\" = 2.2225 cm." },
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
      unitType: "length_small",
      syncGroup: false,
      defaultUnit: "in",
    },
  ],

  inputGroups: [],

  results: [
    { id: "centimeters", type: "primary", format: "text" },
    { id: "meters", type: "secondary", format: "text" },
    { id: "millimeters", type: "secondary", format: "text" },
    { id: "feet", type: "secondary", format: "text" },
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
    { id: "screenSizes", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 — Length Specifications", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-length" },
    { authors: "Bureau International des Poids et Mesures", year: "2023", title: "SI Brochure: The International System of Units", source: "BIPM", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Conversion", title: "Inches to CM" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["cm-to-inches", "length-converter", "feet-to-cm"],
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

export function calculateInchesToCm(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Convert any input unit to mm (base of length_small), then derive all
  const fromUnit = fieldUnits.amount || "in";
  const mm = convertToBase(amount, fromUnit, "length_small");
  const inches = mm / 25.4;
  const cm = mm / 10;
  const meters = cm / 100;
  const feet = inches / 12;

  // Quick reference
  const ref1 = 1 * 2.54;
  const ref6 = 6 * 2.54;
  const ref12 = 12 * 2.54;
  const ref36 = 36 * 2.54;

  return {
    values: { centimeters: cm, meters, millimeters: mm, feet },
    formatted: {
      centimeters: `${fmtNum(cm)} cm`,
      meters: `${fmtNum(meters)} m`,
      millimeters: `${fmtNum(mm)} mm`,
      feet: `${fmtNum(feet)} ft`,
      ref1: `${fmtNum(ref1)} cm`,
      ref6: `${fmtNum(ref6)} cm`,
      ref12: `${fmtNum(ref12)} cm (1 ft)`,
      ref36: `${fmtNum(ref36)} cm (1 yd)`,
    },
    summary: `${fmtNum(inches)} in = ${fmtNum(cm)} cm = ${fmtNum(meters)} m`,
    isValid: true,
  };
}

export default inchesToCmConverterConfig;
