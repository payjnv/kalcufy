import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// CELSIUS TO FAHRENHEIT CONVERTER - V4 (EN ONLY)
// ============================================================================

export const celsiusToFahrenheitConverterConfig: CalculatorConfigV4 = {
  id: "celsius-to-fahrenheit",
  version: "4.0",
  category: "everyday",
  icon: "🌡️",

  presets: [
    { id: "freezing", icon: "🧊", values: { amount: 0 } },
    { id: "body", icon: "🤒", values: { amount: 37 } },
    { id: "boiling", icon: "♨️", values: { amount: 100 } },
  ],

  t: {
    en: {
      name: "Celsius to Fahrenheit Converter",
      slug: "celsius-to-fahrenheit",
      subtitle: "Convert Celsius to Fahrenheit instantly — essential for weather, cooking, travel, and science.",
      breadcrumb: "°C to °F",

      seo: {
        title: "Celsius to Fahrenheit Converter - Free Temperature Tool",
        description: "Convert Celsius to Fahrenheit instantly. Essential for weather, cooking, travel, and science. Includes Kelvin, common temperatures, and oven conversion chart.",
        shortDescription: "Convert Celsius to Fahrenheit instantly.",
        keywords: ["celsius to fahrenheit", "c to f converter", "convert celsius to fahrenheit", "temperature converter", "celsius to fahrenheit formula", "free temperature converter", "metric to imperial temperature"],
      },

      calculator: { yourInformation: "°C to °F" },
      ui: { yourInformation: "°C to °F", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Temperature", helpText: "Enter value and select unit" },
      },

      results: {
        fahrenheit: { label: "Fahrenheit" },
        kelvin: { label: "Kelvin" },
        rankine: { label: "Rankine" },
      },

      presets: {
        freezing: { label: "0°C", description: "Water freezing point (32°F)" },
        body: { label: "37°C", description: "Normal body temperature (98.6°F)" },
        boiling: { label: "100°C", description: "Water boiling point (212°F)" },
      },

      values: { "°F": "°F", "°C": "°C", "K": "K", "°R": "°R" },
      formats: { summary: "{c}°C = {f}°F" },

      infoCards: {
        results: {
          title: "🌡️ Conversion Results",
          items: [
            { label: "Fahrenheit", valueKey: "fahrenheit" },
            { label: "Kelvin", valueKey: "kelvin" },
            { label: "Rankine", valueKey: "rankine" },
          ],
        },
        quickRef: {
          title: "📊 Key Temperatures",
          items: [
            { label: "Freezing (0°C)", valueKey: "refFreeze" },
            { label: "Room temp (20°C)", valueKey: "refRoom" },
            { label: "Body temp (37°C)", valueKey: "refBody" },
            { label: "Boiling (100°C)", valueKey: "refBoil" },
          ],
        },
        tips: {
          title: "💡 Temperature Tips",
          items: [
            "Formula: °F = (°C × 9/5) + 32. Quick: double °C and add 30 for an estimate.",
            "Key anchors: 0°C = 32°F, 10°C = 50°F, 20°C = 68°F, 30°C = 86°F.",
            "-40 is the magic number — it's the same in both scales: -40°C = -40°F.",
            "Oven temps: 180°C = 356°F, 200°C = 392°F, 220°C = 428°F.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert Celsius to Fahrenheit",
          content: "To convert Celsius to Fahrenheit, multiply by 9/5 (or 1.8) and add 32. The formula is: °F = (°C × 9/5) + 32. The Celsius scale (also called centigrade) was devised by Anders Celsius in 1742 and sets water's freezing point at 0° and boiling point at 100° at standard pressure. The Fahrenheit scale, created by Daniel Fahrenheit in 1724, sets water's freezing at 32° and boiling at 212°. Most of the world uses Celsius, while the US is the only major country using Fahrenheit for daily weather and cooking.",
        },
        howItWorks: {
          title: "The °C to °F Formula Explained",
          content: "The exact formula is: °F = (°C × 1.8) + 32. The factor 1.8 (or 9/5) accounts for the different scale sizes: Fahrenheit has 180 degrees between freezing and boiling (32 to 212), while Celsius has 100 degrees (0 to 100). So each Celsius degree = 1.8 Fahrenheit degrees. The +32 shifts the scale since freezing is at 32°F. For quick mental math: double the Celsius value and add 30. Example: 25°C → (25 × 2) + 30 = 80°F (actual: 77°F — close enough for weather).",
        },
        considerations: {
          title: "Common Temperature Conversions",
          items: [
            { text: "-40°C = -40°F — the only point where both scales are equal", type: "info" },
            { text: "0°C = 32°F — water freezes, snow/ice weather", type: "info" },
            { text: "20°C = 68°F — comfortable room temperature", type: "info" },
            { text: "37°C = 98.6°F — normal human body temperature", type: "info" },
            { text: "100°C = 212°F — water boils at sea level", type: "info" },
            { text: "180°C = 356°F — common oven baking temperature", type: "info" },
          ],
        },
        ovenTemps: {
          title: "Oven Temperature Conversions",
          items: [
            { text: "120°C = 248°F — very low / slow cooking", type: "info" },
            { text: "150°C = 302°F — low oven / slow roasting", type: "info" },
            { text: "180°C = 356°F — moderate oven (most baking)", type: "info" },
            { text: "200°C = 392°F — hot oven (roasting, pizza)", type: "info" },
            { text: "220°C = 428°F — very hot oven (bread, crispy skin)", type: "info" },
            { text: "250°C = 482°F — maximum for most home ovens", type: "info" },
          ],
        },
        examples: {
          title: "Celsius to Fahrenheit Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Weather: 28°C to °F",
              steps: ["28 × 1.8 = 50.4", "50.4 + 32 = 82.4°F", "Quick method: 28 × 2 + 30 = 86°F (close)", "28°C is a warm summer day"],
              result: "28°C = 82.4°F (warm day)",
            },
            {
              title: "Fever: 38.5°C to °F",
              steps: ["38.5 × 1.8 = 69.3", "69.3 + 32 = 101.3°F", "Normal body temp: 37°C = 98.6°F", "38.5°C is a moderate fever"],
              result: "38.5°C = 101.3°F (fever)",
            },
          ],
        },
      },

      faqs: [
        { question: "What is the formula for Celsius to Fahrenheit?", answer: "°F = (°C × 9/5) + 32, or equivalently °F = (°C × 1.8) + 32. Multiply the Celsius temperature by 1.8, then add 32 to get Fahrenheit." },
        { question: "What is 0°C in Fahrenheit?", answer: "0°C = 32°F. This is the freezing point of water at standard atmospheric pressure. It's one of the two key anchor points for temperature conversion." },
        { question: "What is normal body temperature in Fahrenheit?", answer: "Normal body temperature is 37°C = 98.6°F. A fever is generally considered 38°C (100.4°F) or higher. However, normal body temperature can range from 36.1°C to 37.2°C (97°F to 99°F)." },
        { question: "How do I quickly estimate °C to °F?", answer: "Double the Celsius value and add 30. Example: 25°C → 50 + 30 = 80°F (actual: 77°F). This method works well for weather temperatures (0-40°C) with about ±3°F accuracy." },
        { question: "At what temperature are Celsius and Fahrenheit equal?", answer: "-40 degrees is the only temperature that is the same on both scales: -40°C = -40°F. You can verify: (-40 × 1.8) + 32 = -72 + 32 = -40." },
        { question: "What is 180°C in Fahrenheit for baking?", answer: "180°C = 356°F, which is the most common baking temperature (often called \"moderate oven\" or Gas Mark 4). Most cakes, cookies, and casseroles bake at this temperature." },
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
      placeholder: "37",
      unitType: "temperature",
      syncGroup: false,
      defaultUnit: "C",
    },
  ],

  inputGroups: [],

  results: [
    { id: "fahrenheit", type: "primary", format: "text" },
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
    { id: "ovenTemps", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST SI Units — Temperature", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-temperature" },
    { authors: "Bureau International des Poids et Mesures", year: "2023", title: "SI Brochure: The International System of Units — Temperature", source: "BIPM", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Conversion", title: "°C to °F" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["fahrenheit-to-celsius", "length-converter"],
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

export function calculateCelsiusToFahrenheit(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Temperature is non-linear — convert input to °C first (base)
  const fromUnit = fieldUnits.amount || "C";
  let celsius: number;
  switch (fromUnit) {
    case "F": celsius = (amount - 32) * 5 / 9; break;
    case "K": celsius = amount - 273.15; break;
    case "R": celsius = (amount - 491.67) * 5 / 9; break;
    default: celsius = amount; // C
  }

  const fahrenheit = (celsius * 9 / 5) + 32;
  const kelvin = celsius + 273.15;
  const rankine = fahrenheit + 459.67;

  return {
    values: { fahrenheit, kelvin, rankine },
    formatted: {
      fahrenheit: `${fmtNum(fahrenheit)}°F`,
      kelvin: `${fmtNum(kelvin)} K`,
      rankine: `${fmtNum(rankine)}°R`,
      refFreeze: "32°F",
      refRoom: "68°F",
      refBody: "98.6°F",
      refBoil: "212°F",
    },
    summary: `${fmtNum(amount)}°${fromUnit} = ${fmtNum(fahrenheit)}°F = ${fmtNum(kelvin)} K`,
    isValid: true,
  };
}

export default celsiusToFahrenheitConverterConfig;
