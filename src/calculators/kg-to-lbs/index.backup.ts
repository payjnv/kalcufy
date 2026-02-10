import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// KG TO LBS CONVERTER - V4 (EN ONLY)
// ============================================================================

export const kgToLbsConverterConfig: CalculatorConfigV4 = {
  id: "kg-to-lbs",
  version: "4.0",
  category: "everyday",
  icon: "⚖️",

  presets: [
    { id: "kg1", icon: "📦", values: { amount: 1 } },
    { id: "kg50", icon: "🧳", values: { amount: 50 } },
    { id: "kg100", icon: "🏋️", values: { amount: 100 } },
  ],

  t: {
    en: {
      name: "KG to LBS Converter",
      slug: "kg-to-lbs",
      subtitle: "Convert kilograms to pounds instantly — essential for travel, fitness, shipping, and cooking.",
      breadcrumb: "KG to LBS",

      seo: {
        title: "KG to LBS Converter - Free Weight Conversion Tool",
        description: "Convert kilograms to pounds instantly. Essential for travel luggage, gym weights, shipping, and cooking. Includes ounces breakdown and quick reference table.",
        shortDescription: "Convert kilograms to pounds instantly.",
        keywords: ["kg to lbs", "kilograms to pounds", "kg to pounds converter", "convert kg to lbs", "weight converter", "free kg converter", "metric to imperial weight"],
      },

      calculator: { yourInformation: "KG to LBS" },
      ui: { yourInformation: "KG to LBS", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Weight", helpText: "Enter value and select unit" },
      },

      results: {
        pounds: { label: "Pounds" },
        poundsOz: { label: "Pounds & Ounces" },
        ounces: { label: "Total Ounces" },
        grams: { label: "Grams" },
        stones: { label: "Stones & Pounds (UK)" },
      },

      presets: {
        kg1: { label: "1 kg", description: "2.205 lbs" },
        kg50: { label: "50 kg", description: "Luggage limit ~110 lbs" },
        kg100: { label: "100 kg", description: "220.5 lbs" },
      },

      values: { "lbs": "lbs", "oz": "oz", "g": "g", "kg": "kg", "st": "st" },
      formats: { summary: "{kg} kg = {lbs} lbs" },

      infoCards: {
        results: {
          title: "⚖️ Conversion Results",
          items: [
            { label: "Pounds", valueKey: "pounds" },
            { label: "Pounds & Ounces", valueKey: "poundsOz" },
            { label: "Total Ounces", valueKey: "ounces" },
            { label: "Stones (UK)", valueKey: "stones" },
          ],
        },
        quickRef: {
          title: "📊 Quick Reference",
          items: [
            { label: "1 kg", valueKey: "ref1" },
            { label: "5 kg", valueKey: "ref5" },
            { label: "10 kg", valueKey: "ref10" },
            { label: "25 kg", valueKey: "ref25" },
          ],
        },
        tips: {
          title: "💡 Weight Tips",
          items: [
            "1 kg = 2.20462 lbs — multiply kg by 2.2 for a quick estimate.",
            "Airline luggage: typically 23 kg (50 lbs) checked, 7 kg (15 lbs) carry-on.",
            "Gym plates: 20 kg = 44 lbs, 25 kg = 55 lbs — common Olympic sizes.",
            "Body weight: 70 kg = 154 lbs, 80 kg = 176 lbs, 90 kg = 198 lbs.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert KG to Pounds",
          content: "To convert kilograms to pounds, multiply by 2.20462. One kilogram equals approximately 2.205 pounds. The kilogram is the base unit of mass in the SI (metric) system, originally defined as the mass of 1 liter of water. The pound (lb) is used primarily in the US and was historically defined as 7,000 grains. Since 1959, 1 pound = 0.45359237 kg exactly. This conversion is needed daily for international travel, fitness tracking, shipping, cooking, and any cross-border weight comparison.",
        },
        howItWorks: {
          title: "The KG to LBS Formula",
          content: "The formula is: pounds = kilograms × 2.20462. For quick mental math, multiply by 2.2 (error < 0.2%). For pounds and ounces: multiply kg by 2.20462 to get total pounds, then take the decimal × 16 for ounces. For stones (UK): divide total pounds by 14. Example: 75 kg × 2.20462 = 165.35 lbs = 11 stone 11.3 lbs. The conversion factor 2.20462 is the reciprocal of 0.45359237.",
        },
        considerations: {
          title: "Common KG to LBS Conversions",
          items: [
            { text: "1 kg = 2.205 lbs — the fundamental conversion", type: "info" },
            { text: "5 kg = 11.02 lbs — common kitchen/shipping weight", type: "info" },
            { text: "10 kg = 22.05 lbs — standard bag of rice", type: "info" },
            { text: "23 kg = 50.7 lbs — airline checked luggage limit", type: "info" },
            { text: "50 kg = 110.2 lbs — lightweight adult", type: "info" },
            { text: "100 kg = 220.5 lbs — ~1/10 of a metric ton", type: "info" },
          ],
        },
        gymWeights: {
          title: "Gym & Fitness Weights (KG → LBS)",
          items: [
            { text: "2.5 kg plate = 5.5 lbs", type: "info" },
            { text: "5 kg plate = 11 lbs (closest: 10 lb plate)", type: "info" },
            { text: "10 kg plate = 22 lbs (closest: 25 lb plate)", type: "info" },
            { text: "20 kg plate = 44 lbs (closest: 45 lb plate)", type: "info" },
            { text: "20 kg Olympic bar = 44 lbs (standard barbell)", type: "info" },
            { text: "25 kg plate = 55 lbs (competition standard)", type: "info" },
          ],
        },
        examples: {
          title: "KG to LBS Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Convert 75 kg body weight to lbs",
              steps: ["75 × 2.20462 = 165.35 lbs", "Pounds: 165 lbs", "Ounces: 0.35 × 16 = 5.5 oz", "In stones: 165.35 ÷ 14 = 11 st 11.3 lbs"],
              result: "75 kg = 165 lbs 5.5 oz (11 st 11 lbs)",
            },
            {
              title: "Luggage: 23 kg limit in pounds",
              steps: ["23 × 2.20462 = 50.7 lbs", "Most airlines allow 50 lbs (22.7 kg)", "23 kg is slightly over 50 lbs", "Pack to 22 kg to be safe: 48.5 lbs"],
              result: "23 kg = 50.7 lbs (just over 50 lb limit)",
            },
          ],
        },
      },

      faqs: [
        { question: "How many pounds is 1 kg?", answer: "1 kilogram equals 2.20462 pounds. For quick mental math, multiply kg by 2.2 — the error is less than 0.2%. For exact conversions, use 2.20462." },
        { question: "How do I convert kg to pounds and ounces?", answer: "Multiply kg by 2.20462 for total pounds. The whole number is pounds, and multiply the decimal by 16 for ounces. Example: 3.5 kg = 7.716 lbs → 7 lbs + (0.716 × 16) = 7 lbs 11.5 oz." },
        { question: "What is the difference between kg and lbs?", answer: "The kilogram is a metric unit used worldwide, while the pound is an imperial unit used mainly in the US. 1 kg = 2.205 lbs, or 1 lb = 0.4536 kg. The kg is about 2.2 times heavier than a pound." },
        { question: "How many kg is 200 pounds?", answer: "200 lbs = 90.72 kg (200 ÷ 2.20462). For quick estimation: 200 ÷ 2.2 ≈ 91 kg." },
        { question: "What is a stone in kg?", answer: "1 stone = 14 pounds = 6.35 kg. Stones are used in the UK and Ireland for body weight. Example: 12 stone = 168 lbs = 76.2 kg." },
        { question: "How much is 23 kg in pounds for luggage?", answer: "23 kg = 50.7 lbs. Most international airlines set checked luggage at 23 kg (≈50 lbs). Note that some airlines use 50 lbs (22.7 kg) as the limit, so 23 kg may be slightly over." },
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
      placeholder: "75",
      min: 0,
      unitType: "weight",
      syncGroup: false,
      defaultUnit: "kg",
      allowedUnits: ["kg", "lbs", "st", "g", "oz"],
    },
  ],

  inputGroups: [],

  results: [
    { id: "pounds", type: "primary", format: "text" },
    { id: "poundsOz", type: "secondary", format: "text" },
    { id: "ounces", type: "secondary", format: "text" },
    { id: "grams", type: "secondary", format: "text" },
    { id: "stones", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "results", type: "list", icon: "⚖️", itemCount: 4 },
    { id: "quickRef", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "gymWeights", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 — Specifications for Mass/Weight", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-mass" },
    { authors: "Bureau International des Poids et Mesures", year: "2023", title: "SI Brochure: The International System of Units — Mass", source: "BIPM", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Conversion", title: "KG to LBS" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["lbs-to-kg", "length-converter", "bmi"],
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

export function calculateKgToLbs(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const fromUnit = fieldUnits.amount || "kg";
  const kg = convertToBase(amount, fromUnit, "weight");

  const totalLbs = kg * 2.20462;
  const lbsPart = Math.floor(totalLbs);
  const ozPart = (totalLbs - lbsPart) * 16;
  const totalOz = kg * 35.274;
  const grams = kg * 1000;
  const totalStones = totalLbs / 14;
  const stPart = Math.floor(totalStones);
  const stLbsPart = totalLbs - stPart * 14;

  return {
    values: { pounds: totalLbs, poundsOz: totalLbs, ounces: totalOz, grams, stones: totalStones },
    formatted: {
      pounds: `${fmtNum(totalLbs)} lbs`,
      poundsOz: `${lbsPart} lbs ${fmtNum(Math.round(ozPart * 10) / 10)} oz`,
      ounces: `${fmtNum(totalOz)} oz`,
      grams: `${fmtNum(grams)} g`,
      stones: `${stPart} st ${fmtNum(Math.round(stLbsPart * 10) / 10)} lbs`,
      ref1: `${fmtNum(1 * 2.20462)} lbs`,
      ref5: `${fmtNum(5 * 2.20462)} lbs`,
      ref10: `${fmtNum(10 * 2.20462)} lbs`,
      ref25: `${fmtNum(25 * 2.20462)} lbs`,
    },
    summary: `${fmtNum(amount)} ${fromUnit} = ${fmtNum(totalLbs)} lbs`,
    isValid: true,
  };
}

export default kgToLbsConverterConfig;
