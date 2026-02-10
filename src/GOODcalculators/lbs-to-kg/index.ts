import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// LBS TO KG CONVERTER - V4 (EN ONLY)
// ============================================================================

export const lbsToKgConverterConfig: CalculatorConfigV4 = {
  id: "lbs-to-kg",
  version: "4.0",
  category: "everyday",
  icon: "⚖️",

  presets: [
    { id: "lbs150", icon: "🧑", values: { amount: 150 } },
    { id: "lbs200", icon: "🏋️", values: { amount: 200 } },
    { id: "plate45", icon: "🏋️‍♂️", values: { amount: 45 } },
  ],

  t: {
    en: {
      name: "LBS to KG Converter",
      slug: "lbs-to-kg",
      subtitle: "Convert pounds to kilograms instantly — perfect for fitness, travel, shipping, and cooking.",
      breadcrumb: "LBS to KG",

      seo: {
        title: "LBS to KG Converter - Free Weight Conversion Tool",
        description: "Convert pounds to kilograms instantly. Perfect for fitness tracking, international travel, shipping, and recipes. Includes ounces-to-grams and common weight references.",
        shortDescription: "Convert pounds to kilograms instantly.",
        keywords: ["lbs to kg", "pounds to kilograms", "lbs to kg converter", "convert pounds to kg", "weight converter", "free lbs converter", "imperial to metric weight"],
      },

      calculator: { yourInformation: "LBS to KG" },
      ui: { yourInformation: "LBS to KG", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Weight", helpText: "Enter value and select unit" },
      },

      results: {
        kilograms: { label: "Kilograms" },
        grams: { label: "Grams" },
        ounces: { label: "Total Ounces" },
        stones: { label: "Stones & Pounds (UK)" },
        metricTons: { label: "Metric Tons" },
      },

      presets: {
        lbs150: { label: "150 lbs", description: "68 kg — average weight" },
        lbs200: { label: "200 lbs", description: "90.7 kg — above average" },
        plate45: { label: "45 lbs", description: "Standard barbell plate (~20.4 kg)" },
      },

      values: { "kg": "kg", "g": "g", "oz": "oz", "st": "st", "t": "t", "lbs": "lbs" },
      formats: { summary: "{lbs} lbs = {kg} kg" },

      infoCards: {
        results: {
          title: "⚖️ Conversion Results",
          items: [
            { label: "Kilograms", valueKey: "kilograms" },
            { label: "Grams", valueKey: "grams" },
            { label: "Total Ounces", valueKey: "ounces" },
            { label: "Stones (UK)", valueKey: "stones" },
          ],
        },
        quickRef: {
          title: "📊 Quick Reference",
          items: [
            { label: "1 lb", valueKey: "ref1" },
            { label: "10 lbs", valueKey: "ref10" },
            { label: "50 lbs", valueKey: "ref50" },
            { label: "100 lbs", valueKey: "ref100" },
          ],
        },
        tips: {
          title: "💡 Weight Tips",
          items: [
            "Divide lbs by 2.2 for a quick kg estimate — close enough for most uses.",
            "Airline luggage: 50 lbs = 22.7 kg (most airlines allow 23 kg).",
            "Gym: 45 lb plate = 20.4 kg (Olympic plates are 20 kg = 44 lbs).",
            "Body weight: 150 lbs = 68 kg, 180 lbs = 82 kg, 200 lbs = 91 kg.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert Pounds to Kilograms",
          content: "To convert pounds to kilograms, divide by 2.20462 (or multiply by 0.453592). One pound equals exactly 0.45359237 kilograms by international definition. The pound (abbreviated lb, from the Latin 'libra') is the primary unit of weight in the US customary system. The kilogram is the SI base unit of mass, used by virtually every country except the US. Converting between these units is one of the most common daily conversions for international travelers, fitness enthusiasts, and online shoppers.",
        },
        howItWorks: {
          title: "The LBS to KG Formula",
          content: "The formula is: kilograms = pounds × 0.453592. For quick mental math, divide pounds by 2.2 (error < 0.2%). For grams: multiply the kg result by 1000. For stones: divide pounds by 14. Example: 180 lbs × 0.453592 = 81.65 kg = 81,647 g. Or quickly: 180 ÷ 2.2 ≈ 81.8 kg. The exact factor 0.45359237 kg/lb is the international definition since 1959.",
        },
        considerations: {
          title: "Common LBS to KG Conversions",
          items: [
            { text: "1 lb = 0.4536 kg = 453.6 g — the fundamental conversion", type: "info" },
            { text: "10 lbs = 4.536 kg — bag of potatoes", type: "info" },
            { text: "50 lbs = 22.68 kg — airline luggage limit", type: "info" },
            { text: "100 lbs = 45.36 kg — round number reference", type: "info" },
            { text: "150 lbs = 68.04 kg — average adult weight", type: "info" },
            { text: "200 lbs = 90.72 kg — above-average adult weight", type: "info" },
          ],
        },
        shippingWeights: {
          title: "Shipping & Package Weights",
          items: [
            { text: "USPS First Class: up to 13 oz (0.37 kg)", type: "info" },
            { text: "USPS Priority Mail: up to 70 lbs (31.75 kg)", type: "info" },
            { text: "FedEx/UPS standard: up to 150 lbs (68 kg)", type: "info" },
            { text: "Amazon Prime box: typically 1-5 lbs (0.5-2.3 kg)", type: "info" },
            { text: "Airline carry-on: 15-22 lbs (7-10 kg) varies by airline", type: "info" },
            { text: "Airline checked: 50 lbs (23 kg) economy, 70 lbs (32 kg) business", type: "info" },
          ],
        },
        examples: {
          title: "LBS to KG Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Convert 185 lbs body weight to kg",
              steps: ["185 × 0.453592 = 83.91 kg", "Quick check: 185 ÷ 2.2 = 84.1 kg (close)", "In grams: 83,915 g", "In stones: 185 ÷ 14 = 13 st 3 lbs"],
              result: "185 lbs = 83.9 kg (13 st 3 lbs)",
            },
            {
              title: "Shipping package: 12 lbs 8 oz to kg",
              steps: ["Convert to decimal lbs: 12 + 8/16 = 12.5 lbs", "12.5 × 0.453592 = 5.67 kg", "In grams: 5,670 g", "Under most shipping limits"],
              result: "12 lbs 8 oz = 5.67 kg",
            },
          ],
        },
      },

      faqs: [
        { question: "How many kg is 1 pound?", answer: "1 pound equals exactly 0.45359237 kilograms (commonly rounded to 0.4536 kg). For quick mental math, divide pounds by 2.2 to get kg." },
        { question: "How do I convert lbs to kg quickly?", answer: "Divide by 2.2 for a fast estimate. For more accuracy, multiply by 0.4536. Example: 180 lbs ÷ 2.2 ≈ 81.8 kg (exact: 81.65 kg). The error with ÷2.2 is less than 0.2%." },
        { question: "How many kg is 200 lbs?", answer: "200 lbs = 90.72 kg. Quick check: 200 ÷ 2.2 = 90.9 kg. This is close to the metric \"round number\" of 91 kg." },
        { question: "What is the difference between lbs and kg?", answer: "The pound (lb) is an imperial unit used in the US, while the kilogram (kg) is a metric unit used worldwide. 1 kg = 2.205 lbs, so a kg is about 2.2× heavier than a lb. Technically, kg measures mass while lb measures force (weight), but in everyday use they're interchangeable." },
        { question: "How much is 50 lbs in kg for luggage?", answer: "50 lbs = 22.68 kg. Most international airlines set the checked luggage limit at 23 kg, which is 50.7 lbs. So a 50-lb bag is just under the limit. Always check your specific airline's rules." },
        { question: "Is a 45 lb plate the same as 20 kg?", answer: "Close but not exact. A 45 lb plate = 20.41 kg, while a 20 kg plate = 44.09 lbs. The difference is about 0.9 lbs (0.41 kg). In competition, Olympic plates are calibrated in kg (20 kg), while most US gym plates are 45 lbs." },
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
      placeholder: "180",
      min: 0,
      unitType: "weight",
      syncGroup: false,
      defaultUnit: "lbs",
      allowedUnits: ["kg", "lbs", "st", "g", "oz"],
    },
  ],

  inputGroups: [],

  results: [
    { id: "kilograms", type: "primary", format: "text" },
    { id: "grams", type: "secondary", format: "text" },
    { id: "ounces", type: "secondary", format: "text" },
    { id: "stones", type: "secondary", format: "text" },
    { id: "metricTons", type: "secondary", format: "text" },
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
    { id: "shippingWeights", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 — Specifications for Mass/Weight", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-mass" },
    { authors: "Bureau International des Poids et Mesures", year: "2023", title: "SI Brochure: The International System of Units — Mass", source: "BIPM", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Conversion", title: "LBS to KG" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["kg-to-lbs", "bmi", "ideal-weight"],
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

export function calculateLbsToKg(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const fromUnit = fieldUnits.amount || "lbs";
  const kg = convertToBase(amount, fromUnit, "weight");

  const grams = kg * 1000;
  const totalLbs = kg * 2.20462;
  const totalOz = totalLbs * 16;
  const totalStones = totalLbs / 14;
  const stPart = Math.floor(totalStones);
  const stLbsPart = totalLbs - stPart * 14;
  const metricTons = kg / 1000;

  return {
    values: { kilograms: kg, grams, ounces: totalOz, stones: totalStones, metricTons },
    formatted: {
      kilograms: `${fmtNum(kg)} kg`,
      grams: `${fmtNum(grams)} g`,
      ounces: `${fmtNum(totalOz)} oz`,
      stones: `${stPart} st ${fmtNum(Math.round(stLbsPart * 10) / 10)} lbs`,
      metricTons: `${fmtNum(metricTons)} t`,
      ref1: `${fmtNum(0.4536)} kg`,
      ref10: `${fmtNum(4.536)} kg`,
      ref50: `${fmtNum(22.68)} kg`,
      ref100: `${fmtNum(45.36)} kg`,
    },
    summary: `${fmtNum(amount)} ${fromUnit} = ${fmtNum(kg)} kg`,
    isValid: true,
  };
}

export default lbsToKgConverterConfig;
