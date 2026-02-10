import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

export const mphToKmhConverterConfig: CalculatorConfigV4 = {
  id: "mph-to-kmh",
  version: "4.0",
  category: "conversion",
  icon: "🚗",

  presets: [
    { id: "citySpeed", icon: "🏙️", values: { amount: 30 } },
    { id: "highwaySpeed", icon: "🛣️", values: { amount: 65 } },
    { id: "topSpeed", icon: "🏎️", values: { amount: 100 } },
  ],

  t: {
    en: {
      name: "MPH to KM/H Converter",
      slug: "mph-to-kmh",
      subtitle: "Convert miles per hour to kilometers per hour for speed comparisons, travel planning, and vehicle specs.",
      breadcrumb: "MPH to KM/H",

      seo: {
        title: "MPH to KM/H Converter - Free Speed Conversion Tool",
        description: "Convert miles per hour to kilometers per hour instantly. Essential for travel between US and metric countries, vehicle specifications, and speed limit comparisons.",
        shortDescription: "Convert mph to km/h for speed and driving.",
        keywords: ["mph to kmh", "miles per hour to kilometers", "speed converter", "mph to kph", "speed conversion", "driving speed converter", "velocity converter", "car speed calculator"],
      },

      calculator: { yourInformation: "Enter Speed" },
      ui: { yourInformation: "Enter Speed", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Speed", helpText: "Enter the speed to convert" },
      },

      results: {
        kmh: { label: "Kilometers per Hour" },
        mps: { label: "Meters per Second" },
        knots: { label: "Knots" },
        fps: { label: "Feet per Second" },
      },

      presets: {
        citySpeed: { label: "City Driving", description: "30 mph (~48 km/h)" },
        highwaySpeed: { label: "Highway Speed", description: "65 mph (~105 km/h)" },
        topSpeed: { label: "Top Speed", description: "100 mph (161 km/h)" },
      },

      values: { "km/h": "km/h", "mph": "mph", "m/s": "m/s", "kn": "kn", "ft/s": "ft/s" },

      formats: { summary: "{value} mph = {kmh} km/h" },

      infoCards: {
        results: {
          title: "Conversion Results",
          items: [
            { label: "Kilometers per Hour", valueKey: "kmh" },
            { label: "Meters per Second", valueKey: "mps" },
            { label: "Knots", valueKey: "knots" },
            { label: "Feet per Second", valueKey: "fps" },
          ],
        },
        speedLimits: {
          title: "US Speed Limits",
          items: [
            { label: "School Zone (25 mph)", valueKey: "ref25" },
            { label: "Two-Lane (55 mph)", valueKey: "ref55" },
            { label: "Interstate (70 mph)", valueKey: "ref70" },
            { label: "Texas Toll (85 mph)", valueKey: "ref85" },
          ],
        },
        tips: {
          title: "Conversion Tips",
          items: [
            "Quick estimate: multiply mph by 1.6 for km/h",
            "US uses mph; most countries use km/h",
            "Speedometers often show both units",
            "Maritime and aviation use knots",
          ],
        },
      },

      education: {
        whatIs: {
          title: "Understanding MPH and KM/H",
          content: "Miles per hour (mph) and kilometers per hour (km/h) are units of speed measuring distance traveled per unit of time. The United States, United Kingdom, and a few other countries use mph for road signs and vehicle speedometers, while most of the world uses km/h. One mile equals exactly 1.609344 kilometers, so 1 mph = 1.609344 km/h.",
        },
        howItWorks: {
          title: "How the Conversion Works",
          content: "To convert mph to km/h, multiply by 1.609344. For example, 60 mph × 1.609344 = 96.56 km/h. For quick mental math, multiply by 1.6 and round. To convert km/h to mph, divide by 1.609344 (or multiply by 0.621371).",
        },
        considerations: {
          title: "Important Considerations",
          items: [
            { text: "US, UK, and Myanmar are the only countries using mph for road signs", type: "info" },
            { text: "Most vehicles show both mph and km/h on speedometers", type: "info" },
            { text: "GPS devices can be set to display either unit", type: "info" },
            { text: "Aviation uses knots (nautical miles per hour) globally", type: "warning" },
            { text: "Weather reports may use different units by country", type: "info" },
            { text: "Car specifications may list top speed in both units", type: "info" },
          ],
        },
        commonSpeeds: {
          title: "Common Speed Conversions",
          items: [
            { text: "25 mph (school zone) = 40 km/h", type: "info" },
            { text: "35 mph (residential) = 56 km/h", type: "info" },
            { text: "55 mph (two-lane) = 89 km/h", type: "info" },
            { text: "65 mph (highway) = 105 km/h", type: "info" },
            { text: "70 mph (interstate) = 113 km/h", type: "info" },
            { text: "100 mph = 161 km/h", type: "info" },
          ],
        },
        examples: {
          title: "Conversion Examples",
          description: "Real-world scenarios",
          examples: [
            {
              title: "Rental Car in Europe",
              steps: ["Speed limit sign: 120 km/h", "Convert: 120 ÷ 1.609 = 74.6 mph", "This is similar to US interstate speeds"],
              result: "120 km/h ≈ 75 mph",
            },
            {
              title: "Vehicle Top Speed",
              steps: ["Car specs: 155 mph top speed", "Convert: 155 × 1.609 = 249.4 km/h", "Many luxury cars are limited to 250 km/h"],
              result: "155 mph = 249 km/h",
            },
          ],
        },
      },

      faqs: [
        { question: "How do I convert mph to km/h?", answer: "Multiply the mph value by 1.609344. For example, 60 mph × 1.609344 = 96.56 km/h. For quick mental math, multiply by 1.6." },
        { question: "What countries use mph?", answer: "Only the United States, United Kingdom, and Myanmar use miles per hour for road speed limits. All other countries use km/h." },
        { question: "Why do some countries use mph and others km/h?", answer: "The US, UK, and former British colonies originally used miles. Most of the world adopted the metric system starting in the 1790s." },
        { question: "What is a knot?", answer: "A knot is one nautical mile per hour, equal to 1.151 mph or 1.852 km/h. It's used in maritime and aviation worldwide." },
        { question: "How fast is 100 km/h in mph?", answer: "100 km/h equals 62.14 mph. This is a common highway speed limit in many countries." },
        { question: "What's the fastest speed limit in the world?", answer: "Germany's Autobahn has sections with no limit. Among posted limits, Texas has 85 mph (137 km/h) sections." },
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
      defaultValue: 60,
      placeholder: "60",
      min: 0,
      step: 1,
      unitType: "speed",
      syncGroup: false,
      defaultUnit: "mph",
      allowedUnits: ["mph", "kmh", "ms", "knots", "fts"],
    },
  ],

  inputGroups: [],

  results: [
    { id: "kmh", type: "primary", format: "number" },
    { id: "mps", type: "secondary", format: "number" },
    { id: "knots", type: "secondary", format: "number" },
    { id: "fps", type: "secondary", format: "number" },
  ],

  infoCards: [
    { id: "results", type: "list", icon: "📊", itemCount: 4 },
    { id: "speedLimits", type: "list", icon: "🚦", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "commonSpeeds", type: "list", icon: "🚗", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "NIST", year: "2024", title: "Units of Measurement - Speed", source: "National Institute of Standards and Technology", url: "https://www.nist.gov/pml/owm/metric-si/unit-conversion" },
    { authors: "BIPM", year: "2023", title: "SI Brochure: The International System of Units", source: "International Bureau of Weights and Measures", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Speed Converter", title: "MPH to KM/H" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["gallons-to-liters", "cups-to-ml", "square-feet-to-square-meters"],
  ads: { showTopBanner: false, showSidebar: true, showBetweenSections: false },
};

// ============================================================================
// CALCULATE FUNCTION
// ============================================================================

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) < 0.01) return val.toExponential(2);
  if (Math.abs(val) >= 1000) return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

export function calculateMphToKmh(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};

  const amount = values.amount as number;
  const fromUnit = fieldUnits.amount || "mph";

  if (amount === undefined || amount === null || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Conversion factors to m/s (base) - from registry.ts SPEED
  const toMs: Record<string, number> = {
    "mph": 0.44704,
    "kmh": 0.277778,
    "ms": 1,
    "knots": 0.514444,
    "fts": 0.3048,
  };

  const factor = toMs[fromUnit] || 0.44704;
  const mps = amount * factor;
  const kmh = mps / 0.277778;
  const knots = mps / 0.514444;
  const fps = mps / 0.3048;

  // Reference values (from mph)
  const ref25 = 25 * 1.609344;
  const ref55 = 55 * 1.609344;
  const ref70 = 70 * 1.609344;
  const ref85 = 85 * 1.609344;

  const kmhUnit = v["km/h"] || "km/h";
  const mpsUnit = v["m/s"] || "m/s";
  const knUnit = v["kn"] || "kn";
  const fpsUnit = v["ft/s"] || "ft/s";

  return {
    values: { kmh, mps, knots, fps, ref25, ref55, ref70, ref85 },
    formatted: {
      kmh: `${fmtNum(kmh)} ${kmhUnit}`,
      mps: `${fmtNum(mps)} ${mpsUnit}`,
      knots: `${fmtNum(knots)} ${knUnit}`,
      fps: `${fmtNum(fps)} ${fpsUnit}`,
      ref25: `${fmtNum(ref25)} ${kmhUnit}`,
      ref55: `${fmtNum(ref55)} ${kmhUnit}`,
      ref70: `${fmtNum(ref70)} ${kmhUnit}`,
      ref85: `${fmtNum(ref85)} ${kmhUnit}`,
    },
    summary: `${fmtNum(amount)} mph = ${fmtNum(kmh)} ${kmhUnit}`,
    isValid: true,
  };
}

export default mphToKmhConverterConfig;
