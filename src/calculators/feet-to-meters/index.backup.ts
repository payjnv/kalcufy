import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// FEET TO METERS CONVERTER - V4 (EN ONLY)
// ============================================================================

export const feetToMetersConverterConfig: CalculatorConfigV4 = {
  id: "feet-to-meters",
  version: "4.0",
  category: "conversion",
  icon: "📏",

  presets: [
    { id: "height6ft", icon: "🧑", values: { amount: 6 } },
    { id: "ceiling8ft", icon: "🏠", values: { amount: 8 } },
    { id: "pool100ft", icon: "🏊", values: { amount: 100 } },
  ],

  t: {
    en: {
      name: "Feet to Meters Converter",
      slug: "feet-to-meters",
      subtitle: "Convert feet to meters instantly — great for height, construction, and international measurements.",
      breadcrumb: "Feet to Meters",

      seo: {
        title: "Feet to Meters Converter - Free Length Conversion Tool",
        description: "Convert feet to meters instantly. Perfect for height, construction, real estate, and international measurements. Includes reference table and common values.",
        shortDescription: "Convert feet to meters instantly.",
        keywords: ["feet to meters", "ft to m converter", "convert feet to meters", "feet to meters chart", "height converter feet", "free feet converter", "imperial to metric length"],
      },

      calculator: { yourInformation: "Feet to Meters" },
      ui: { yourInformation: "Feet to Meters", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Length", helpText: "Enter value and select unit" },
      },

      results: {
        meters: { label: "Meters" },
        centimeters: { label: "Centimeters" },
        millimeters: { label: "Millimeters" },
        inches: { label: "Inches" },
        kilometers: { label: "Kilometers" },
      },

      presets: {
        height6ft: { label: "6 feet", description: "6 ft = 1.83 m" },
        ceiling8ft: { label: "8 feet", description: "Standard US ceiling height" },
        pool100ft: { label: "100 feet", description: "Pool or building length" },
      },

      values: { "m": "m", "cm": "cm", "mm": "mm", "in": "in", "km": "km", "ft": "ft" },
      formats: { summary: "{ft} ft = {m} meters" },

      infoCards: {
        results: {
          title: "📏 Conversion Results",
          items: [
            { label: "Meters", valueKey: "meters" },
            { label: "Centimeters", valueKey: "centimeters" },
            { label: "Millimeters", valueKey: "millimeters" },
            { label: "Inches", valueKey: "inches" },
          ],
        },
        quickRef: {
          title: "📊 Quick Reference",
          items: [
            { label: "1 foot", valueKey: "ref1" },
            { label: "5 feet", valueKey: "ref5" },
            { label: "10 feet", valueKey: "ref10" },
            { label: "100 feet", valueKey: "ref100" },
          ],
        },
        tips: {
          title: "💡 Conversion Tips",
          items: [
            "1 foot = exactly 0.3048 meters — multiply feet by 0.3 for a quick estimate.",
            "1 foot = 12 inches = 30.48 cm exactly.",
            "Quick: divide feet by 3.3 to get approximate meters.",
            "5 feet = 1.524 m, 6 feet = 1.829 m — useful height references.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert Feet to Meters",
          content: "To convert feet to meters, multiply by 0.3048. One foot equals exactly 0.3048 meters (30.48 cm). This exact relationship was established in 1959 by international agreement. The foot has been used since ancient civilizations — its origin relates to the length of a human foot. Today, it's primarily used in the United States and UK (for height). Nearly every other country uses the meter, which is the SI base unit of length defined by the speed of light.",
        },
        howItWorks: {
          title: "The Feet to Meters Formula",
          content: "The formula is: meters = feet × 0.3048. This is an exact conversion factor. For feet and inches combined, first convert to total feet: total feet = feet + (inches / 12), then multiply by 0.3048. Alternatively, convert feet to inches (× 12), add remaining inches, then multiply by 0.0254. Example: 5'10\" = 5 + (10/12) = 5.833 ft × 0.3048 = 1.778 m.",
        },
        considerations: {
          title: "Common Feet to Meters Conversions",
          items: [
            { text: "1 ft = 0.3048 m = 30.48 cm exactly", type: "info" },
            { text: "3 ft (1 yard) = 0.9144 m — slightly less than a meter", type: "info" },
            { text: "5 ft = 1.524 m — short adult height", type: "info" },
            { text: "5 ft 6 in = 1.676 m — average height range", type: "info" },
            { text: "6 ft = 1.829 m — tall adult height", type: "info" },
            { text: "5,280 ft = 1 mile = 1,609.344 m", type: "info" },
          ],
        },
        heightChart: {
          title: "Height Chart: Feet to Meters",
          items: [
            { text: "5'0\" = 1.524 m = 152.4 cm", type: "info" },
            { text: "5'4\" = 1.626 m = 162.6 cm — average US female height", type: "info" },
            { text: "5'7\" = 1.702 m = 170.2 cm", type: "info" },
            { text: "5'9\" = 1.753 m = 175.3 cm — average US male height", type: "info" },
            { text: "6'0\" = 1.829 m = 182.9 cm", type: "info" },
            { text: "6'3\" = 1.905 m = 190.5 cm — well above average", type: "info" },
          ],
        },
        examples: {
          title: "Feet to Meters Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Convert 5'10\" to meters",
              steps: ["5 feet + 10 inches", "Total inches: (5 × 12) + 10 = 70 in", "70 × 0.0254 = 1.778 m", "Or: 5.833 ft × 0.3048 = 1.778 m"],
              result: "5'10\" = 1.778 m (177.8 cm)",
            },
            {
              title: "Room: 12 × 15 feet to meters",
              steps: ["12 ft × 0.3048 = 3.658 m", "15 ft × 0.3048 = 4.572 m", "Area: 12 × 15 = 180 sq ft", "In metric: 3.66 × 4.57 = 16.72 m²"],
              result: "12 × 15 ft = 3.66 × 4.57 m (16.7 m²)",
            },
          ],
        },
      },

      faqs: [
        { question: "How many meters is 1 foot?", answer: "1 foot equals exactly 0.3048 meters (30.48 cm). This is an exact definition, not an approximation. To convert feet to meters, multiply by 0.3048." },
        { question: "How do I convert feet and inches to meters?", answer: "Convert to total inches first: (feet × 12) + inches. Then multiply by 0.0254 to get meters. Example: 5'8\" = 68 inches × 0.0254 = 1.727 m. Or convert to decimal feet: 5 + 8/12 = 5.667 ft × 0.3048 = 1.727 m." },
        { question: "What is 6 feet in meters?", answer: "6 feet = 1.8288 meters, commonly rounded to 1.83 m. In centimeters, that's 182.88 cm." },
        { question: "How many feet is 1 meter?", answer: "1 meter = 3.28084 feet ≈ 3 ft 3.4 in. A meter is slightly longer than a yard (3 feet)." },
        { question: "How do I convert square feet to square meters?", answer: "Divide square feet by 10.764 to get square meters. Example: 1,000 sq ft ÷ 10.764 = 92.9 m². This factor comes from (0.3048)² × 12² ... or simply (3.28084)² = 10.764." },
        { question: "Is a meter bigger than a foot?", answer: "Yes, significantly. 1 meter = 3.281 feet, so a meter is about 3.3 times longer than a foot. It takes about 3 feet and 3 inches to equal 1 meter." },
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
      placeholder: "6",
      min: 0,
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["mm", "cm", "m", "km", "in", "ft", "yd", "mi"],
    },
  ],

  inputGroups: [],

  results: [
    { id: "meters", type: "primary", format: "text" },
    { id: "centimeters", type: "secondary", format: "text" },
    { id: "millimeters", type: "secondary", format: "text" },
    { id: "inches", type: "secondary", format: "text" },
    { id: "kilometers", type: "secondary", format: "text" },
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
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 — Length Specifications", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-length" },
    { authors: "Bureau International des Poids et Mesures", year: "2023", title: "SI Brochure: The International System of Units", source: "BIPM", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Conversion", title: "Feet to Meters" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["meters-to-feet", "inches-to-cm", "length-converter"],
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

export function calculateFeetToMeters(data: {
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
  const km = meters / 1000;

  const ref1 = 0.3048;
  const ref5 = 5 * 0.3048;
  const ref10 = 10 * 0.3048;
  const ref100 = 100 * 0.3048;

  return {
    values: { meters, centimeters: cm, millimeters: mm, inches, kilometers: km },
    formatted: {
      meters: `${fmtNum(meters)} m`,
      centimeters: `${fmtNum(cm)} cm`,
      millimeters: `${fmtNum(mm)} mm`,
      inches: `${fmtNum(inches)} in`,
      kilometers: `${fmtNum(km)} km`,
      ref1: `${fmtNum(ref1)} m`,
      ref5: `${fmtNum(ref5)} m`,
      ref10: `${fmtNum(ref10)} m`,
      ref100: `${fmtNum(ref100)} m`,
    },
    summary: `${fmtNum(amount)} ${fromUnit} = ${fmtNum(meters)} m = ${fmtNum(cm)} cm`,
    isValid: true,
  };
}

export default feetToMetersConverterConfig;
