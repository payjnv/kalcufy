import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase, convert } from "@/engine/v4/units";

// ============================================================================
// LENGTH CONVERTER - V4 (EN ONLY)
// ============================================================================

export const lengthConverterConfig: CalculatorConfigV4 = {
  id: "length-converter",
  version: "4.0",
  category: "conversion",
  icon: "📏",

  presets: [
    { id: "oneMeter", icon: "📏", values: { amount: 1 } },
    { id: "oneFoot", icon: "👣", values: { amount: 0.3048 } },
    { id: "oneMile", icon: "🛣️", values: { amount: 1609.344 } },
  ],

  t: {
    en: {
      name: "Length Converter",
      slug: "length-converter",
      subtitle: "Convert between 18 length units instantly — from nanometers to light-years.",
      breadcrumb: "Length",

      seo: {
        title: "Length Converter - Free Unit Conversion Tool",
        description: "Convert between 18 length units instantly. Supports meters, feet, inches, miles, kilometers, yards, and more with precise conversion factors.",
        shortDescription: "Convert between length units instantly.",
        keywords: [
          "length converter",
          "unit converter",
          "meters to feet",
          "feet to meters",
          "inches to cm",
          "km to miles",
          "free length converter",
          "distance converter",
        ],
      },

      calculator: { yourInformation: "Length Conversion" },
      ui: { yourInformation: "Length Conversion", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Length", helpText: "Enter value and select unit from dropdown" },
      },

      results: {
        meters: { label: "Meters" },
        feet: { label: "Feet" },
        inches: { label: "Inches" },
        centimeters: { label: "Centimeters" },
        kilometers: { label: "Kilometers" },
        miles: { label: "Miles" },
        yards: { label: "Yards" },
        millimeters: { label: "Millimeters" },
      },

      presets: {
        oneMeter: { label: "1 Meter", description: "Convert one meter to all units" },
        oneFoot: { label: "1 Foot", description: "Convert one foot to all units" },
        oneMile: { label: "1 Mile", description: "Convert one mile to all units" },
      },

      values: {
        "m": "m", "ft": "ft", "in": "in", "cm": "cm", "km": "km",
        "mi": "mi", "yd": "yd", "mm": "mm", "nm": "nm", "µm": "µm",
      },

      formats: { summary: "{value} {from} = {result} {to}" },

      infoCards: {
        results: {
          title: "📏 Conversion Results",
          items: [
            { label: "Meters", valueKey: "meters" },
            { label: "Feet", valueKey: "feet" },
            { label: "Inches", valueKey: "inches" },
            { label: "Centimeters", valueKey: "centimeters" },
          ],
        },
        more: {
          title: "📐 More Units",
          items: [
            { label: "Kilometers", valueKey: "kilometers" },
            { label: "Miles", valueKey: "miles" },
            { label: "Yards", valueKey: "yards" },
            { label: "Millimeters", valueKey: "millimeters" },
          ],
        },
        tips: {
          title: "💡 Quick References",
          items: [
            "1 inch = 2.54 cm exactly (defined by international agreement since 1959).",
            "1 mile = 1.60934 km — multiply miles by 1.6 for a quick estimate.",
            "1 meter ≈ 3 feet 3 inches — slightly longer than a yard (3 feet).",
            "1 foot = 12 inches = 30.48 cm — the most common US measurement unit.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "Understanding Length Units",
          content: "Length measurement systems evolved independently across civilizations. Today, two major systems dominate: the metric system (meters, centimeters, kilometers) used by most of the world, and the imperial/US customary system (feet, inches, miles) used primarily in the United States, Liberia, and Myanmar. The metric system is based on powers of 10, making conversions straightforward (1 km = 1,000 m = 100,000 cm). The imperial system has irregular relationships (1 mile = 5,280 feet = 63,360 inches). The international inch was defined as exactly 25.4 millimeters in 1959, creating a precise bridge between the two systems.",
        },
        howItWorks: {
          title: "How Length Conversion Works",
          content: "All length conversions work through a base unit — in this converter, the meter. To convert from any unit to any other, we first convert to meters using the known conversion factor, then convert from meters to the target unit. For example, to convert 5 feet to centimeters: 5 ft × 0.3048 m/ft = 1.524 m, then 1.524 m × 100 cm/m = 152.4 cm. This two-step process through a base unit ensures accuracy and allows conversion between any pair of units without needing a direct conversion factor for every possible pair.",
        },
        considerations: {
          title: "Common Length Equivalences",
          items: [
            { text: "1 inch = 25.4 mm = 2.54 cm (exact by international definition)", type: "info" },
            { text: "1 foot = 12 inches = 30.48 cm = 0.3048 m (exact)", type: "info" },
            { text: "1 yard = 3 feet = 36 inches = 0.9144 m (exact)", type: "info" },
            { text: "1 mile = 5,280 feet = 1,760 yards = 1.60934 km", type: "info" },
            { text: "1 kilometer = 1,000 m = 0.621371 miles ≈ 5/8 of a mile", type: "info" },
            { text: "1 nautical mile = 1,852 m = 1.15078 statute miles (used in navigation)", type: "info" },
          ],
        },
        specialUnits: {
          title: "Special Length Units",
          items: [
            { text: "Nanometer (nm): 1 billionth of a meter — used for wavelengths of light and semiconductor chips", type: "info" },
            { text: "Micrometer (µm): 1 millionth of a meter — used for bacteria, cell sizes, and thin film measurements", type: "info" },
            { text: "Fathom: 6 feet — traditionally used for measuring water depth in maritime navigation", type: "info" },
            { text: "Furlong: 660 feet (1/8 mile) — still used in horse racing distances", type: "info" },
            { text: "Astronomical Unit (AU): ~150 million km — the distance from Earth to the Sun", type: "info" },
            { text: "Light-year: ~9.46 trillion km — the distance light travels in one year", type: "info" },
          ],
        },
        examples: {
          title: "Length Conversion Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Height: 5'10\" to cm",
              steps: ["5 feet = 5 × 30.48 = 152.4 cm", "10 inches = 10 × 2.54 = 25.4 cm", "Total = 152.4 + 25.4 = 177.8 cm", "Or: 70 inches × 2.54 = 177.8 cm", "Verify: 177.8 / 30.48 = 5.833 ft = 5'10\""],
              result: "5 feet 10 inches = 177.8 cm",
            },
            {
              title: "Marathon: 26.2 miles to km",
              steps: ["1 mile = 1.60934 km", "26.2 × 1.60934 = 42.165 km", "Standard marathon = 42.195 km (exact)", "Half marathon = 21.0975 km = 13.1 mi", "Quick estimate: miles × 1.6 ≈ km"],
              result: "26.2 miles ≈ 42.16 km",
            },
          ],
        },
      },

      faqs: [
        { question: "How many centimeters are in an inch?", answer: "There are exactly 2.54 centimeters in one inch. This is an exact definition established by international agreement in 1959. To convert inches to centimeters, multiply by 2.54. To convert centimeters to inches, divide by 2.54 (or multiply by 0.3937)." },
        { question: "How do I convert meters to feet?", answer: "Multiply meters by 3.28084 to get feet. For example, 1.8 meters × 3.28084 = 5.905 feet ≈ 5 feet 10.9 inches. For a quick estimate, multiply meters by 3.3. To convert feet to meters, multiply by 0.3048." },
        { question: "How many kilometers are in a mile?", answer: "One mile equals 1.60934 kilometers. For quick mental math, multiply miles by 1.6 (or by 8 and divide by 5). One kilometer equals 0.621371 miles, or roughly 5/8 of a mile." },
        { question: "What is the difference between metric and imperial systems?", answer: "The metric system is based on powers of 10 (1 km = 1,000 m = 1,000,000 mm), making conversions simple. The imperial system uses irregular ratios (1 mile = 5,280 feet, 1 foot = 12 inches). The metric system is used by most of the world; imperial is primarily used in the US, Liberia, and Myanmar." },
        { question: "How do I convert between feet and inches?", answer: "1 foot = 12 inches. To convert feet to inches, multiply by 12. To convert inches to feet, divide by 12. For mixed measurements like 5'10\", convert: (5 × 12) + 10 = 70 total inches. To go back: 70 ÷ 12 = 5 remainder 10, so 5 feet 10 inches." },
        { question: "What is a nautical mile?", answer: "A nautical mile equals 1,852 meters (1.15078 statute miles or 6,076 feet). It was originally defined as one minute of arc of latitude along the Earth's surface, making it particularly useful for navigation. Nautical miles are used in maritime and aviation for measuring distances, and speed in knots is nautical miles per hour." },
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
      placeholder: "100",
      min: 0,
      unitType: "length",
      syncGroup: false,
      defaultUnit: "m",
    },
  ],

  inputGroups: [],

  results: [
    { id: "meters", type: "primary", format: "text" },
    { id: "feet", type: "secondary", format: "text" },
    { id: "inches", type: "secondary", format: "text" },
    { id: "centimeters", type: "secondary", format: "text" },
    { id: "kilometers", type: "secondary", format: "text" },
    { id: "miles", type: "secondary", format: "text" },
    { id: "yards", type: "secondary", format: "text" },
    { id: "millimeters", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "results", type: "list", icon: "📏", itemCount: 4 },
    { id: "more", type: "list", icon: "📐", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "specialUnits", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Guide to the SI — Length Units", source: "NIST", url: "https://www.nist.gov/pml/owm/si-units-length" },
    { authors: "Bureau International des Poids et Mesures", year: "2023", title: "SI Brochure: The International System of Units", source: "BIPM", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Conversion", title: "Length Converter" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["cm-to-inches", "inches-to-cm", "feet-to-meters"],
  ads: { showTopBanner: false, showSidebar: true, showBetweenSections: false },
};

// ============================================================================
// CALCULATE
// ============================================================================

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) < 0.001) return val.toExponential(3);
  if (Math.abs(val) >= 1e6) return val.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (Math.abs(val) >= 1000) return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (Math.abs(val) < 1) return val.toFixed(4);
  return val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 4 });
}

export function calculateLengthConverter(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;

  const amount = values.amount as number | null;
  if (amount === null || amount === undefined) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const fromUnit = fieldUnits.amount || "m";

  // Convert to base (meters) using Unit Engine
  const meters = convertToBase(amount, fromUnit, "length");

  // Convert from meters to all target units
  const feet = convert(meters, "m", "ft", "length");
  const inches = convert(meters, "m", "in", "length");
  const cm = meters * 100;
  const km = meters / 1000;
  const miles = convert(meters, "m", "mi", "length");
  const yards = convert(meters, "m", "yd", "length");
  const mm = meters * 1000;

  return {
    values: { meters, feet, inches, centimeters: cm, kilometers: km, miles, yards, millimeters: mm },
    formatted: {
      meters: `${fmtNum(meters)} m`,
      feet: `${fmtNum(feet)} ft`,
      inches: `${fmtNum(inches)} in`,
      centimeters: `${fmtNum(cm)} cm`,
      kilometers: `${fmtNum(km)} km`,
      miles: `${fmtNum(miles)} mi`,
      yards: `${fmtNum(yards)} yd`,
      millimeters: `${fmtNum(mm)} mm`,
    },
    summary: `${fmtNum(amount)} ${fromUnit} = ${fmtNum(meters)} m = ${fmtNum(feet)} ft`,
    isValid: true,
  };
}

export default lengthConverterConfig;
