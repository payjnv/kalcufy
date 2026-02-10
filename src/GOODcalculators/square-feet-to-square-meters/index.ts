import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

export const squareFeetToSquareMetersConverterConfig: CalculatorConfigV4 = {
  id: "square-feet-to-square-meters",
  version: "4.0",
  category: "conversion",
  icon: "📐",

  presets: [
    { id: "bedroom", icon: "🛏️", values: { amount: 150 } },
    { id: "apartment", icon: "🏠", values: { amount: 1000 } },
    { id: "house", icon: "🏡", values: { amount: 2500 } },
  ],

  t: {
    en: {
      name: "Square Feet to Square Meters Converter",
      slug: "square-feet-to-square-meters",
      subtitle: "Convert square feet to square meters for real estate, construction, and floor planning.",
      breadcrumb: "Sq Ft to Sq M",

      seo: {
        title: "Square Feet to Square Meters Converter - Free Area Tool",
        description: "Convert square feet to square meters instantly for real estate, construction, and interior design. Includes acres, hectares, and square yards.",
        shortDescription: "Convert sq ft to sq m for real estate.",
        keywords: ["square feet to square meters", "sq ft to sq m", "area converter", "floor area calculator", "real estate converter", "construction calculator", "sqft to m2", "feet squared to meters squared"],
      },

      calculator: { yourInformation: "Enter Area" },
      ui: { yourInformation: "Enter Area", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Area", helpText: "Enter the area to convert" },
      },

      results: {
        squareMeters: { label: "Square Meters" },
        squareYards: { label: "Square Yards" },
        acres: { label: "Acres" },
      },

      presets: {
        bedroom: { label: "Bedroom", description: "150 sq ft (~14 m²)" },
        apartment: { label: "Apartment", description: "1,000 sq ft (~93 m²)" },
        house: { label: "House", description: "2,500 sq ft (~232 m²)" },
      },

      values: { "m²": "m²", "ft²": "ft²", "yd²": "yd²", "acres": "acres", "hectares": "hectares", "cm²": "cm²", "in²": "in²" },

      formats: { summary: "{value} ft² = {sqm} m²" },

      infoCards: {
        results: {
          title: "Conversion Results",
          items: [
            { label: "Square Meters", valueKey: "squareMeters" },
            { label: "Square Yards", valueKey: "squareYards" },
            { label: "Acres", valueKey: "acres" },
            { label: "Hectares", valueKey: "hectares" },
          ],
        },
        reference: {
          title: "Quick Reference",
          items: [
            { label: "100 sq ft", valueKey: "ref100" },
            { label: "500 sq ft", valueKey: "ref500" },
            { label: "1,000 sq ft", valueKey: "ref1000" },
            { label: "1 acre", valueKey: "ref1acre" },
          ],
        },
        tips: {
          title: "Conversion Tips",
          items: [
            "1 sq ft = 0.0929 m² (divide by ~10.764 to convert)",
            "1 sq m = 10.764 sq ft (multiply by ~10.76)",
            "1 acre = 43,560 sq ft = 4,047 m²",
            "1 hectare = 10,000 m² = 2.471 acres",
          ],
        },
      },

      education: {
        whatIs: {
          title: "Understanding Square Feet and Square Meters",
          content: "Square feet and square meters are units of area used to measure two-dimensional spaces like floors, rooms, and land. Square feet (ft²) is the standard in the United States, United Kingdom, and Canada for real estate. Square meters (m²) is used throughout most of the world and is part of the metric system. Converting between them is essential for international property listings, construction projects, and interior design.",
        },
        howItWorks: {
          title: "How the Conversion Works",
          content: "Since 1 foot = 0.3048 meters exactly, 1 square foot = 0.3048² = 0.092903 square meters. To convert square feet to square meters, multiply by 0.092903. To convert square meters to square feet, multiply by 10.7639. These conversion factors are exact by international agreement since 1959.",
        },
        considerations: {
          title: "Important Considerations",
          items: [
            { text: "1 square foot = 0.092903 square meters exactly", type: "info" },
            { text: "1 square meter = 10.7639 square feet", type: "info" },
            { text: "Real estate in US/UK uses sq ft; most other countries use m²", type: "info" },
            { text: "Apartment sizes in Asia are often listed in 'ping' (Taiwan) or 'pyeong' (Korea)", type: "warning" },
            { text: "Commercial real estate may use different measurement standards", type: "warning" },
            { text: "Always verify which measurement method was used for listed areas", type: "info" },
          ],
        },
        commonAreas: {
          title: "Common Area References",
          items: [
            { text: "Parking space: ~150 sq ft (14 m²)", type: "info" },
            { text: "Small bedroom: 100-150 sq ft (9-14 m²)", type: "info" },
            { text: "Master bedroom: 200-350 sq ft (19-33 m²)", type: "info" },
            { text: "1-bedroom apartment: 600-800 sq ft (56-74 m²)", type: "info" },
            { text: "Average US home: 2,300 sq ft (214 m²)", type: "info" },
            { text: "Tennis court: 2,808 sq ft (261 m²)", type: "info" },
          ],
        },
        examples: {
          title: "Conversion Examples",
          description: "Real estate scenarios",
          examples: [
            {
              title: "Apartment Listing",
              steps: ["US listing: 850 sq ft apartment", "Convert: 850 × 0.0929 = 78.97 m²", "This is a typical 1-2 bedroom size"],
              result: "850 sq ft = 79 m²",
            },
            {
              title: "Land Plot",
              steps: ["Land area: 0.5 acres", "Convert to sq ft: 0.5 × 43,560 = 21,780 sq ft", "Convert to m²: 21,780 × 0.0929 = 2,023 m²"],
              result: "0.5 acres = 2,023 m²",
            },
          ],
        },
      },

      faqs: [
        { question: "How do I convert square feet to square meters?", answer: "Multiply square feet by 0.092903 to get square meters. For quick mental math, divide by 10.76 or roughly divide by 11 for an estimate. Example: 1,000 sq ft ÷ 10.76 = 93 m²." },
        { question: "How many square feet in a square meter?", answer: "There are 10.7639 square feet in one square meter. So a 100 m² apartment equals 1,076 sq ft." },
        { question: "What's the average apartment size in square meters?", answer: "This varies by country: US averages 80-90 m² (850-970 sq ft), UK averages 67 m² (720 sq ft), Hong Kong averages 40 m² (430 sq ft), and Australia averages 90 m² (970 sq ft)." },
        { question: "How do I convert acres to square meters?", answer: "1 acre = 4,046.86 square meters = 43,560 square feet. To convert acres to m², multiply by 4,047. Example: 2 acres × 4,047 = 8,094 m²." },
        { question: "What is a hectare?", answer: "A hectare is 10,000 square meters (100m × 100m), which equals 2.471 acres or 107,639 square feet. It's commonly used for measuring large land areas outside the US." },
        { question: "Why do some countries use square feet and others square meters?", answer: "Countries that were part of the British Empire (US, UK, Canada, India) traditionally use square feet. Most other countries adopted the metric system and use square meters. Even the UK now commonly uses both." },
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
      defaultValue: 100,
      placeholder: "100",
      min: 0,
      step: 1,
      unitType: "area",
      syncGroup: false,
      defaultUnit: "ft2",
      allowedUnits: ["ft2", "m2", "yd2", "in2", "cm2", "acres", "hectares"],
    },
  ],

  inputGroups: [],

  results: [
    { id: "squareMeters", type: "primary", format: "number" },
    { id: "squareYards", type: "secondary", format: "number" },
    { id: "acres", type: "secondary", format: "number" },
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
    { id: "commonAreas", type: "list", icon: "🏠", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "NIST", year: "2024", title: "Handbook 44 - Specifications for Area Measures", source: "National Institute of Standards and Technology", url: "https://www.nist.gov/pml/weights-and-measures/publications/nist-handbooks/handbook-44" },
    { authors: "International Bureau of Weights and Measures", year: "2023", title: "SI Brochure: The International System of Units", source: "BIPM", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Area Converter", title: "Square Feet to Square Meters" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["gallons-to-liters", "cups-to-ml", "mph-to-kmh"],
  ads: { showTopBanner: false, showSidebar: true, showBetweenSections: false },
};

// ============================================================================
// CALCULATE FUNCTION
// ============================================================================

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) < 0.0001) return val.toExponential(2);
  if (Math.abs(val) >= 1000) return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 4 });
}

export function calculateSquareFeetToSquareMeters(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};

  const amount = values.amount as number;
  const fromUnit = fieldUnits.amount || "ft2";

  if (amount === undefined || amount === null || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Conversion factors to m² (from registry.ts AREA)
  const toM2: Record<string, number> = {
    "ft2": 0.092903,
    "m2": 1,
    "yd2": 0.836127,
    "in2": 0.00064516,
    "cm2": 0.0001,
    "acres": 4046.86,
    "hectares": 10000,
  };

  const factor = toM2[fromUnit] || 0.092903;
  const squareMeters = amount * factor;
  const squareYards = squareMeters / 0.836127;
  const acres = squareMeters / 4046.86;
  const hectares = squareMeters / 10000;

  // Reference values (in m²)
  const ref100 = 100 * 0.092903;
  const ref500 = 500 * 0.092903;
  const ref1000 = 1000 * 0.092903;
  const ref1acre = 4046.86;

  const m2Unit = v["m²"] || "m²";
  const yd2Unit = v["yd²"] || "yd²";
  const acresUnit = v["acres"] || "acres";
  const hectaresUnit = v["hectares"] || "hectares";

  return {
    values: { squareMeters, squareYards, acres, hectares, ref100, ref500, ref1000, ref1acre },
    formatted: {
      squareMeters: `${fmtNum(squareMeters)} ${m2Unit}`,
      squareYards: `${fmtNum(squareYards)} ${yd2Unit}`,
      acres: `${fmtNum(acres)} ${acresUnit}`,
      hectares: `${fmtNum(hectares)} ${hectaresUnit}`,
      ref100: `${fmtNum(ref100)} ${m2Unit}`,
      ref500: `${fmtNum(ref500)} ${m2Unit}`,
      ref1000: `${fmtNum(ref1000)} ${m2Unit}`,
      ref1acre: `${fmtNum(ref1acre)} ${m2Unit}`,
    },
    summary: `${fmtNum(amount)} ft² = ${fmtNum(squareMeters)} ${m2Unit}`,
    isValid: true,
  };
}

export default squareFeetToSquareMetersConverterConfig;
