import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ============================================================================
// FAHRENHEIT TO CELSIUS CONVERTER - V4 (EN ONLY)
// ============================================================================

export const fahrenheitToCelsiusConverterConfig: CalculatorConfigV4 = {
  id: "fahrenheit-to-celsius",
  version: "4.0",
  category: "everyday",
  icon: "🌡️",

  presets: [
    { id: "freezing", icon: "🧊", values: { amount: 32 } },
    { id: "body", icon: "🤒", values: { amount: 98.6 } },
    { id: "boiling", icon: "♨️", values: { amount: 212 } },
  ],

  t: {
    en: {
      name: "Fahrenheit to Celsius Converter",
      slug: "fahrenheit-to-celsius",
      subtitle: "Convert Fahrenheit to Celsius instantly — essential for weather, cooking, travel, and science.",
      breadcrumb: "°F to °C",

      seo: {
        title: "Fahrenheit to Celsius Converter - Free Temperature Tool",
        description: "Convert Fahrenheit to Celsius instantly. Essential for international travel, cooking recipes, weather, and science. Includes Kelvin, oven chart, and weather reference.",
        shortDescription: "Convert Fahrenheit to Celsius instantly.",
        keywords: ["fahrenheit to celsius", "f to c converter", "convert fahrenheit to celsius", "temperature converter", "fahrenheit to celsius formula", "free temperature converter", "imperial to metric temperature"],
      },

      calculator: { yourInformation: "°F to °C" },
      ui: { yourInformation: "°F to °C", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Temperature", helpText: "Enter value and select unit" },
      },

      results: {
        celsius: { label: "Celsius" },
        kelvin: { label: "Kelvin" },
        rankine: { label: "Rankine" },
      },

      presets: {
        freezing: { label: "32°F", description: "Water freezing point (0°C)" },
        body: { label: "98.6°F", description: "Normal body temperature (37°C)" },
        boiling: { label: "212°F", description: "Water boiling point (100°C)" },
      },

      values: { "°C": "°C", "°F": "°F", "K": "K", "°R": "°R" },
      formats: { summary: "{f}°F = {c}°C" },

      infoCards: {
        results: {
          title: "🌡️ Conversion Results",
          items: [
            { label: "Celsius", valueKey: "celsius" },
            { label: "Kelvin", valueKey: "kelvin" },
            { label: "Rankine", valueKey: "rankine" },
          ],
        },
        quickRef: {
          title: "📊 Weather Reference",
          items: [
            { label: "32°F (freezing)", valueKey: "refFreeze" },
            { label: "68°F (room temp)", valueKey: "refRoom" },
            { label: "77°F (warm day)", valueKey: "ref77" },
            { label: "100°F (heat wave)", valueKey: "ref100" },
          ],
        },
        tips: {
          title: "💡 Temperature Tips",
          items: [
            "Formula: °C = (°F - 32) × 5/9. Quick: subtract 30, then divide by 2.",
            "Key anchors: 32°F = 0°C, 72°F = 22°C, 98.6°F = 37°C, 212°F = 100°C.",
            "-40 is the same in both scales: -40°F = -40°C.",
            "US oven temps: 350°F = 177°C, 375°F = 191°C, 400°F = 204°C, 425°F = 218°C.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert Fahrenheit to Celsius",
          content: "To convert Fahrenheit to Celsius, subtract 32 and multiply by 5/9. The formula is: °C = (°F - 32) × 5/9. The Fahrenheit scale is used daily in the United States for weather, cooking, and thermostats. Most other countries use Celsius. The -32 removes the offset (water freezes at 32°F vs 0°C), and ×5/9 scales the degree size (180°F range = 100°C range between freezing and boiling). Understanding this conversion is essential for international travel, following recipes from other countries, and interpreting global weather reports.",
        },
        howItWorks: {
          title: "The °F to °C Formula Explained",
          content: "The exact formula is: °C = (°F - 32) / 1.8. The factor 1.8 (or 9/5) exists because there are 180 Fahrenheit degrees between water's freezing (32°F) and boiling (212°F), compared to 100 Celsius degrees (0°C to 100°C). So 180/100 = 1.8. For quick mental math: subtract 30 and divide by 2. Example: 72°F → (72-30)/2 = 21°C (actual: 22.2°C — close enough for weather). This shortcut works well between 30°F and 100°F.",
        },
        considerations: {
          title: "Common Fahrenheit to Celsius Conversions",
          items: [
            { text: "0°F = -17.8°C — very cold winter weather", type: "info" },
            { text: "32°F = 0°C — water freezes, snow likely", type: "info" },
            { text: "68°F = 20°C — comfortable room temperature", type: "info" },
            { text: "72°F = 22.2°C — ideal thermostat setting", type: "info" },
            { text: "98.6°F = 37°C — normal human body temperature", type: "info" },
            { text: "212°F = 100°C — water boils at sea level", type: "info" },
          ],
        },
        usOvenChart: {
          title: "US Oven Temperature Chart (°F → °C)",
          items: [
            { text: "250°F = 121°C — very low / warming", type: "info" },
            { text: "325°F = 163°C — low oven / slow roasting", type: "info" },
            { text: "350°F = 177°C — moderate oven (most baking)", type: "info" },
            { text: "375°F = 191°C — moderate-hot (cookies, pies)", type: "info" },
            { text: "400°F = 204°C — hot oven (roasting vegetables)", type: "info" },
            { text: "450°F = 232°C — very hot (pizza, bread)", type: "info" },
          ],
        },
        examples: {
          title: "Fahrenheit to Celsius Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Weather: 85°F to °C",
              steps: ["85 - 32 = 53", "53 × 5/9 = 53 / 1.8 = 29.4°C", "Quick method: (85-30)/2 = 27.5°C (close)", "85°F is a hot summer day"],
              result: "85°F = 29.4°C (hot summer day)",
            },
            {
              title: "Oven: 375°F to °C",
              steps: ["375 - 32 = 343", "343 × 5/9 = 343 / 1.8 = 190.6°C", "Round to 190°C or 191°C", "Gas Mark 5 equivalent"],
              result: "375°F = 190.6°C ≈ 190°C",
            },
          ],
        },
      },

      faqs: [
        { question: "What is the formula for Fahrenheit to Celsius?", answer: "°C = (°F - 32) × 5/9, or equivalently °C = (°F - 32) / 1.8. Subtract 32 from Fahrenheit, then multiply by 5/9 (or divide by 1.8) to get Celsius." },
        { question: "What is 72°F in Celsius?", answer: "72°F = 22.2°C. This is a common room temperature and thermostat setting in the US. In Celsius-using countries, 22°C is considered comfortable indoor temperature." },
        { question: "What is 98.6°F in Celsius?", answer: "98.6°F = 37°C exactly. This is the standard normal human body temperature. A fever is generally considered 100.4°F (38°C) or higher." },
        { question: "How do I quickly estimate °F to °C?", answer: "Subtract 30 and divide by 2. Example: 80°F → (80-30)/2 = 25°C (actual: 26.7°C). This works within ±2°C for normal weather temperatures (30-100°F). For more accuracy, subtract 32 and divide by 1.8." },
        { question: "What is 350°F in Celsius for baking?", answer: "350°F = 176.7°C, typically rounded to 177°C or 180°C. This is the most common baking temperature in US recipes. In metric countries, the equivalent is usually stated as 180°C." },
        { question: "What temperature is the same in °F and °C?", answer: "-40 degrees is identical on both scales: -40°F = -40°C. You can verify: (-40 - 32) × 5/9 = -72 × 5/9 = -40. This is extremely cold — roughly the temperature of an arctic winter." },
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
      placeholder: "72",
      unitType: "temperature",
      syncGroup: false,
      defaultUnit: "F",
    },
  ],

  inputGroups: [],

  results: [
    { id: "celsius", type: "primary", format: "text" },
    { id: "kelvin", type: "secondary", format: "text" },
    { id: "rankine", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "results", type: "list", icon: "🌡️", itemCount: 3 },
    { id: "quickRef", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "usOvenChart", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST SI Units — Temperature", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-temperature" },
    { authors: "Bureau International des Poids et Mesures", year: "2023", title: "SI Brochure: The International System of Units — Temperature", source: "BIPM", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Conversion", title: "°F to °C" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["celsius-to-fahrenheit", "length-converter"],
  ads: { showTopBanner: false, showSidebar: true, showBetweenSections: false },
};

// ============================================================================
// CALCULATE — Temperature is NON-LINEAR, handle manually
// ============================================================================

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) >= 1e6) return val.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (Math.abs(val) >= 1000) return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

export function calculateFahrenheitToCelsius(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const fromUnit = fieldUnits.amount || "F";
  let celsius: number;
  switch (fromUnit) {
    case "C": celsius = amount; break;
    case "K": celsius = amount - 273.15; break;
    case "R": celsius = (amount - 491.67) * 5 / 9; break;
    default: celsius = (amount - 32) * 5 / 9; // F
  }

  const fahrenheit = (celsius * 9 / 5) + 32;
  const kelvin = celsius + 273.15;
  const rankine = fahrenheit + 459.67;

  return {
    values: { celsius, kelvin, rankine },
    formatted: {
      celsius: `${fmtNum(celsius)}°C`,
      kelvin: `${fmtNum(kelvin)} K`,
      rankine: `${fmtNum(rankine)}°R`,
      refFreeze: "0°C",
      refRoom: "20°C",
      ref77: "25°C",
      ref100: "37.8°C",
    },
    summary: `${fmtNum(amount)}°${fromUnit} = ${fmtNum(celsius)}°C = ${fmtNum(kelvin)} K`,
    isValid: true,
  };
}

export default fahrenheitToCelsiusConverterConfig;
