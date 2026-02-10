import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// CM TO FEET CONVERTER - V4 (EN ONLY)
// ============================================================================

export const cmToFeetConverterConfig: CalculatorConfigV4 = {
  id: "cm-to-feet",
  version: "4.0",
  category: "everyday",
  icon: "📏",

  presets: [
    { id: "height160", icon: "👩", values: { amount: 160 } },
    { id: "height175", icon: "🧑", values: { amount: 175 } },
    { id: "height190", icon: "🧑‍🦱", values: { amount: 190 } },
  ],

  t: {
    en: {
      name: "CM to Feet Converter",
      slug: "cm-to-feet",
      subtitle: "Convert centimeters to feet and inches instantly — perfect for height conversions and measurements.",
      breadcrumb: "CM to Feet",

      seo: {
        title: "CM to Feet Converter - Free Height Conversion Tool",
        description: "Convert centimeters to feet and inches instantly. Perfect for height conversions, international measurements, and everyday use. Includes height chart and reference table.",
        shortDescription: "Convert cm to feet and inches instantly.",
        keywords: ["cm to feet", "cm to ft converter", "centimeters to feet", "height converter cm to feet", "cm to feet and inches", "free cm converter", "metric to imperial height"],
      },

      calculator: { yourInformation: "CM to Feet" },
      ui: { yourInformation: "CM to Feet", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Length", helpText: "Enter value and select unit" },
      },

      results: {
        feetDecimal: { label: "Feet (decimal)" },
        feetInches: { label: "Feet & Inches" },
        inches: { label: "Total Inches" },
        meters: { label: "Meters" },
        yards: { label: "Yards" },
      },

      presets: {
        height160: { label: "160 cm", description: "≈ 5'3\" — average female height" },
        height175: { label: "175 cm", description: "≈ 5'9\" — average male height" },
        height190: { label: "190 cm", description: "≈ 6'3\" — tall" },
      },

      values: { "ft": "ft", "in": "in", "m": "m", "yd": "yd", "cm": "cm" },
      formats: { summary: "{cm} cm = {feetInches}" },

      infoCards: {
        results: {
          title: "📏 Conversion Results",
          items: [
            { label: "Feet (decimal)", valueKey: "feetDecimal" },
            { label: "Feet & Inches", valueKey: "feetInches" },
            { label: "Total Inches", valueKey: "inches" },
            { label: "Meters", valueKey: "meters" },
          ],
        },
        quickRef: {
          title: "📊 Height Chart",
          items: [
            { label: "150 cm", valueKey: "ref150" },
            { label: "165 cm", valueKey: "ref165" },
            { label: "180 cm", valueKey: "ref180" },
            { label: "200 cm", valueKey: "ref200" },
          ],
        },
        tips: {
          title: "💡 Quick Tips",
          items: [
            "Divide cm by 30.48 to get feet — or divide by 2.54 to get inches first.",
            "Quick: 150 cm ≈ 5'0\", 160 cm ≈ 5'3\", 170 cm ≈ 5'7\", 180 cm ≈ 5'11\".",
            "Each inch = 2.54 cm, each foot = 30.48 cm exactly.",
            "Average heights: US male 5'9\" (175.3 cm), US female 5'4\" (162.6 cm).",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert CM to Feet",
          content: "To convert centimeters to feet, divide by 30.48. One foot equals exactly 30.48 centimeters. For feet and inches, first divide cm by 2.54 to get total inches, then divide by 12 for feet with the remainder as inches. This conversion is commonly needed when comparing heights internationally — most countries use centimeters while the US and UK use feet and inches for height. The centimeter (1/100 of a meter) is the standard metric unit for body measurements worldwide.",
        },
        howItWorks: {
          title: "The CM to Feet Formula",
          content: "The formula is: feet = cm ÷ 30.48. For feet and inches: (1) total inches = cm ÷ 2.54, (2) feet = floor(total inches ÷ 12), (3) remaining inches = total inches mod 12. Example: 175 cm ÷ 2.54 = 68.9 inches → 68.9 ÷ 12 = 5 feet remainder 8.9 inches → 5'9\". The conversion factor 30.48 comes from 12 inches × 2.54 cm/inch = 30.48 cm/foot.",
        },
        considerations: {
          title: "Common CM to Feet Conversions",
          items: [
            { text: "152 cm = 5'0\" (4.99 ft) — often considered petite", type: "info" },
            { text: "160 cm = 5'3\" (5.25 ft) — average female height globally", type: "info" },
            { text: "170 cm = 5'7\" (5.58 ft) — near the global average", type: "info" },
            { text: "175 cm = 5'9\" (5.74 ft) — average US male height", type: "info" },
            { text: "183 cm = 6'0\" (6.0 ft) — considered tall", type: "info" },
            { text: "193 cm = 6'4\" (6.33 ft) — well above average", type: "info" },
          ],
        },
        averageHeights: {
          title: "Average Heights by Country (cm → ft)",
          items: [
            { text: "Netherlands: Men 182.5 cm (6'0\"), Women 168.7 cm (5'6\")", type: "info" },
            { text: "USA: Men 175.3 cm (5'9\"), Women 162.6 cm (5'4\")", type: "info" },
            { text: "UK: Men 175.3 cm (5'9\"), Women 161.9 cm (5'4\")", type: "info" },
            { text: "Japan: Men 170.8 cm (5'7\"), Women 158.0 cm (5'2\")", type: "info" },
            { text: "India: Men 166.5 cm (5'6\"), Women 152.6 cm (5'0\")", type: "info" },
            { text: "Brazil: Men 171.5 cm (5'8\"), Women 159.0 cm (5'3\")", type: "info" },
          ],
        },
        examples: {
          title: "CM to Feet Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Convert 172 cm to feet & inches",
              steps: ["172 ÷ 2.54 = 67.72 inches total", "67.72 ÷ 12 = 5 remainder 7.72", "5 feet and 7.72 inches", "≈ 5'8\" (rounded)"],
              result: "172 cm = 5 ft 7.7 in ≈ 5'8\"",
            },
            {
              title: "Baby length: 50 cm to feet",
              steps: ["50 ÷ 2.54 = 19.69 inches total", "19.69 ÷ 12 = 1 remainder 7.69", "1 foot and 7.69 inches", "Average newborn is 49-51 cm"],
              result: "50 cm = 1 ft 7.7 in (19.7 inches)",
            },
          ],
        },
      },

      faqs: [
        { question: "How do I convert cm to feet and inches?", answer: "Divide cm by 2.54 to get total inches, then divide by 12. The whole number is feet, the remainder is inches. Example: 170 cm ÷ 2.54 = 66.93\" → 66.93 ÷ 12 = 5 ft + 6.93 in ≈ 5'7\"." },
        { question: "How many feet is 180 cm?", answer: "180 cm = 5.906 feet = 5 feet 10.87 inches, commonly rounded to 5'11\". This is considered above-average height for men in most countries." },
        { question: "How many feet is 170 cm?", answer: "170 cm = 5.577 feet = 5 feet 6.93 inches, commonly rounded to 5'7\". This is close to the worldwide average adult height." },
        { question: "What is 160 cm in feet?", answer: "160 cm = 5.249 feet = 5 feet 2.99 inches, or essentially 5'3\". This is close to the average height for women in many countries." },
        { question: "How tall is 150 cm in feet?", answer: "150 cm = 4.921 feet = 4 feet 11.06 inches ≈ 4'11\". This is just under 5 feet and is considered petite." },
        { question: "Is cm or feet more accurate?", answer: "Centimeters allow more precision since 1 cm = 0.39 inches, giving finer increments. Feet and inches typically round to the nearest inch (2.54 cm). For medical and scientific purposes, centimeters are preferred worldwide." },
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
      placeholder: "175",
      min: 0,
      unitType: "length",
      syncGroup: false,
      defaultUnit: "cm",
      allowedUnits: ["mm", "cm", "m", "km", "in", "ft", "yd", "mi"],
    },
  ],

  inputGroups: [],

  results: [
    { id: "feetDecimal", type: "primary", format: "text" },
    { id: "feetInches", type: "secondary", format: "text" },
    { id: "inches", type: "secondary", format: "text" },
    { id: "meters", type: "secondary", format: "text" },
    { id: "yards", type: "secondary", format: "text" },
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
    { id: "averageHeights", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "Centers for Disease Control and Prevention", year: "2024", title: "Anthropometric Reference Data for Children and Adults", source: "CDC", url: "https://www.cdc.gov/nchs/data/series/sr_03/sr03-046-508.pdf" },
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 — Length Specifications", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-length" },
  ],

  hero: { badge: "Conversion", title: "CM to Feet" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["feet-to-cm", "cm-to-inches", "meters-to-feet"],
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

export function calculateCmToFeet(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const fromUnit = fieldUnits.amount || "cm";
  const meters = convertToBase(amount, fromUnit, "length");

  const totalInches = meters / 0.0254;
  const totalFeet = meters / 0.3048;
  const feetPart = Math.floor(totalInches / 12);
  const inchesPart = totalInches - feetPart * 12;
  const m = meters;
  const yards = meters / 0.9144;

  const toFi = (cm: number) => {
    const ti = cm / 2.54;
    const fp = Math.floor(ti / 12);
    const ip = ti - fp * 12;
    return `${fp}' ${Math.round(ip * 10) / 10}"`;
  };

  return {
    values: { feetDecimal: totalFeet, feetInches: totalFeet, inches: totalInches, meters: m, yards },
    formatted: {
      feetDecimal: `${fmtNum(totalFeet)} ft`,
      feetInches: `${feetPart}' ${fmtNum(Math.round(inchesPart * 10) / 10)}"`,
      inches: `${fmtNum(totalInches)} in`,
      meters: `${fmtNum(m)} m`,
      yards: `${fmtNum(yards)} yd`,
      ref150: toFi(150),
      ref165: toFi(165),
      ref180: toFi(180),
      ref200: toFi(200),
    },
    summary: `${fmtNum(amount)} ${fromUnit} = ${feetPart}' ${Math.round(inchesPart * 10) / 10}" (${fmtNum(totalFeet)} ft)`,
    isValid: true,
  };
}

export default cmToFeetConverterConfig;
