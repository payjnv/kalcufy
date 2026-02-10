import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

export const stonesToKgConverterConfig: CalculatorConfigV4 = {
  id: "stones-to-kg-converter",
  version: "4.0",
  category: "conversion",
  icon: "⚖️",

  presets: [
    { id: "light", icon: "🪶", values: { stoneValue: 8 } },
    { id: "average", icon: "⚖️", values: { stoneValue: 11 } },
    { id: "heavy", icon: "🏋️", values: { stoneValue: 15 } },
    { id: "veryHeavy", icon: "💪", values: { stoneValue: 20 } },
  ],

  t: {
    en: {
      name: "Stones to KG Converter",
      slug: "stones-to-kg-converter",
      subtitle:
        "Convert stones to kilograms instantly with a reference table for common weights — perfect for UK to metric conversions.",
      breadcrumb: "Stones to KG",

      seo: {
        title: "Stones to KG Converter - Quick & Accurate | Free Tool",
        description:
          "Convert stones to kilograms instantly. Includes a reference table for common weights, decimal and fractional stone support, and reverse kg to stone conversion.",
        shortDescription: "Convert stones to kilograms with a handy reference table.",
        keywords: [
          "stones to kg",
          "stones to kilograms",
          "stone to kg converter",
          "convert stones to kg",
          "st to kg",
          "uk weight to metric",
          "stone weight converter",
          "how many kg in a stone",
        ],
      },

      calculator: { yourInformation: "Enter Weight" },
      ui: {
        yourInformation: "Enter Weight",
        calculate: "Convert",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        stoneValue: {
          label: "Weight in Stones",
          helpText: "Enter the weight in stones (st). 1 stone = 6.35029 kg",
        },
      },

      results: {
        kilograms: { label: "Kilograms" },
        grams: { label: "Grams" },
        pounds: { label: "Pounds" },
      },

      presets: {
        light: { label: "8 Stone", description: "~50.8 kg (light adult)" },
        average: { label: "11 Stone", description: "~69.9 kg (average adult)" },
        heavy: { label: "15 Stone", description: "~95.3 kg (heavy adult)" },
        veryHeavy: { label: "20 Stone", description: "~127.0 kg" },
      },

      values: {
        kg: "kg",
        g: "g",
        lbs: "lbs",
        st: "st",
      },

      formats: {
        summary: "{stone} stone = {kg} kg ({lbs} lbs)",
      },

      infoCards: {
        conversions: {
          title: "Conversion Results",
          items: [
            { label: "Kilograms", valueKey: "kilograms" },
            { label: "Grams", valueKey: "grams" },
            { label: "Pounds", valueKey: "pounds" },
            { label: "Stone + Pounds", valueKey: "stonePounds" },
          ],
        },
        quickRef: {
          title: "Quick Reference",
          items: [
            { label: "1 stone", valueKey: "ref1" },
            { label: "5 stones", valueKey: "ref5" },
            { label: "10 stones", valueKey: "ref10" },
            { label: "14 stones", valueKey: "ref14" },
          ],
        },
        tips: {
          title: "Did You Know?",
          items: [
            "The stone is still widely used in the UK and Ireland for body weight. Most British people describe their weight in stones and pounds rather than kilograms.",
            "1 stone = exactly 14 pounds = 6.35029318 kg. The stone has been used as a unit of weight since at least the 14th century.",
            "In most countries outside the UK and Ireland, the stone is not commonly used. Medical and scientific contexts always use kilograms.",
            "When traveling between the UK and continental Europe, converting stones to kg is essential for understanding weight-related information on medical forms and gym equipment.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is a Stone?",
          content:
            "A stone (abbreviated \"st\") is an Imperial unit of weight equal to 14 pounds or approximately 6.35 kilograms. It is commonly used in the United Kingdom and Ireland to express body weight. For example, a person weighing 11 stone 4 pounds would weigh about 71.7 kg. The stone has been used since medieval times for trade, originally varying by commodity — a stone of wool weighed differently than a stone of glass. In 1835, the British Weights and Measures Act standardized the stone at 14 pounds. While most of the world uses kilograms for body weight, the stone remains the preferred unit in casual conversation throughout the UK and Ireland. You'll hear it used in everyday life, fitness discussions, and even on British TV shows, making this conversion essential for international communication.",
        },
        howItWorks: {
          title: "How to Convert Stones to Kilograms",
          content:
            "The conversion formula is straightforward: multiply the number of stones by 6.35029318 to get kilograms. For example, 10 stones × 6.35029 = 63.5 kg. If you have stones and pounds (like 11 st 7 lbs), first convert everything to pounds (11 × 14 + 7 = 161 lbs), then multiply by 0.453592 to get kilograms (161 × 0.453592 = 73.03 kg). Alternatively, convert the stones portion and pounds portion separately: 11 st = 69.85 kg, 7 lbs = 3.18 kg, total = 73.03 kg. For a quick mental approximation, multiply stones by 6.35 — this is accurate to within 0.01% of the exact conversion factor.",
        },
        considerations: {
          title: "Conversion Facts",
          items: [
            { text: "1 stone = 14 pounds = 6.35029318 kilograms exactly. This is the internationally recognized conversion factor.", type: "info" },
            { text: "To convert back: 1 kg = 0.157473 stones. Divide kilograms by 6.35029 to get stones.", type: "info" },
            { text: "UK medical records increasingly use kilograms, but many British people still think of their weight in stones and pounds.", type: "info" },
            { text: "The stone is NOT used in the United States. Americans use pounds only, making the stone confusing for US visitors to the UK.", type: "info" },
            { text: "In boxing and horse racing, weight classes are sometimes expressed in stones in the UK, while international competitions use kilograms.", type: "info" },
            { text: "Australia, New Zealand, and South Africa formerly used stones but have fully converted to kilograms since metrication in the 1970s.", type: "info" },
          ],
        },
        categories: {
          title: "Common Weight Ranges in Stones",
          items: [
            { text: "6-8 stone (38-51 kg): Typical weight range for children ages 8-12 and very petite adults.", type: "info" },
            { text: "8-10 stone (51-64 kg): Common range for smaller adults and teenagers. Average woman in many countries.", type: "info" },
            { text: "10-12 stone (64-76 kg): Average adult range. Typical healthy weight for men 5'7\"-5'10\".", type: "info" },
            { text: "12-14 stone (76-89 kg): Above average range. Common for taller men and active/muscular individuals.", type: "info" },
            { text: "14-16 stone (89-102 kg): Heavy range. May indicate overweight for most heights unless very tall or muscular.", type: "info" },
            { text: "16-20+ stone (102-127+ kg): Very heavy range. Often seen in heavyweight athletes, bodybuilders, or tall individuals.", type: "info" },
          ],
        },
        examples: {
          title: "Conversion Examples",
          description: "Step-by-step stone to kg conversions",
          examples: [
            {
              title: "Convert 11 stone 4 pounds to kilograms",
              steps: [
                "Stones portion: 11 × 6.35029 = 69.853 kg",
                "Pounds portion: 4 × 0.45359 = 1.814 kg",
                "Total: 69.853 + 1.814 = 71.667 kg",
              ],
              result: "11 st 4 lbs = 71.67 kg",
            },
            {
              title: "Convert 9.5 stone to kilograms",
              steps: [
                "9.5 × 6.35029 = 60.328 kg",
                "Or: 9 st = 57.15 kg, 0.5 st = 7 lbs = 3.18 kg",
                "Total: 57.15 + 3.18 = 60.33 kg",
              ],
              result: "9.5 stone = 60.33 kg",
            },
          ],
        },
      },

      faqs: [
        { question: "How many kilograms are in 1 stone?", answer: "1 stone equals exactly 6.35029318 kilograms. For quick mental math, 1 stone ≈ 6.35 kg. This conversion factor is defined by international agreement and does not change." },
        { question: "How do I convert stones and pounds to kg?", answer: "Convert the stones portion and pounds portion separately, then add them. Multiply stones by 6.35029 and pounds by 0.45359, then sum both results. For example, 12 st 8 lbs = (12 × 6.35029) + (8 × 0.45359) = 76.20 + 3.63 = 79.83 kg." },
        { question: "Why does the UK still use stones for weight?", answer: "Cultural habit and tradition. Despite the UK officially adopting the metric system, stones remain deeply embedded in everyday conversation about body weight. Most British people learned their weight in stones from family and friends, and the habit persists across generations. Medical settings increasingly use kilograms, but casual usage of stones shows no signs of disappearing." },
        { question: "Is a stone the same in all countries?", answer: "The modern stone is standardized at 14 pounds (6.35029 kg) since the 1835 British Weights and Measures Act. Historically, the stone varied by region and commodity. Today, it is only commonly used in the UK and Ireland. The United States, Canada, Australia, and most other countries do not use the stone." },
        { question: "How do I convert kg back to stones?", answer: "Divide the kilogram value by 6.35029 to get stones. For example, 80 kg ÷ 6.35029 = 12.598 stones, which is 12 stone 8.4 pounds. To get the remaining pounds: take the decimal portion (0.598) and multiply by 14 = 8.4 pounds." },
        { question: "What is 10 stone in kg?", answer: "10 stone equals 63.503 kg (or approximately 63.5 kg). This is also equal to 140 pounds. 10 stone is a commonly referenced benchmark weight in UK fitness and health discussions." },
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
      id: "stoneValue",
      type: "number",
      defaultValue: null,
      placeholder: "11",
      min: 0.01,
      max: 200,
      step: 0.1,
      suffix: "st",
    },
  ],

  inputGroups: [],

  results: [
    { id: "kilograms", type: "primary", format: "number" },
    { id: "grams", type: "secondary", format: "number" },
    { id: "pounds", type: "secondary", format: "number" },
  ],

  infoCards: [
    { id: "conversions", type: "list", icon: "⚖️", itemCount: 4 },
    { id: "quickRef", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "Handbook 44 – Specifications for Weighing Devices", source: "NIST", url: "https://www.nist.gov/pml/owm/handbook-44-current-edition" },
    { authors: "UK National Measurement Office", year: "2023", title: "The Weights and Measures Act 1985 – Units of Measurement", source: "UK Government", url: "https://www.legislation.gov.uk/ukpga/1985/72" },
  ],

  hero: { icon: "⚖️", label: "Conversion" },
  sidebar: { showRelated: true, showPopular: true },
  features: { saveResults: true, pdfExport: true, sharing: true },
  relatedCalculators: ["kg-to-stones-converter", "kg-to-lbs-calculator", "lbs-to-kg-calculator"],
  ads: { showSidebar: true, showBetweenSections: true },
};

// ─── Calculate ───────────────────────────────────────────────────────────────

export function calculateStonesToKgConverter(data: {
  values: Record<string, unknown>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};

  const stoneVal = values.stoneValue as number | null;
  if (stoneVal === null || stoneVal <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const kg = stoneVal * 6.35029318;
  const g = kg * 1000;
  const lbs = stoneVal * 14;
  const wholeSt = Math.floor(stoneVal);
  const remainLbs = Math.round((stoneVal - wholeSt) * 14 * 10) / 10;

  const kgUnit = v["kg"] || "kg";
  const gUnit = v["g"] || "g";
  const lbsUnit = v["lbs"] || "lbs";
  const stUnit = v["st"] || "st";

  const f = (t?.formats as Record<string, string>) || {};
  const summary = f.summary
    ?.replace("{stone}", stoneVal.toString())
    .replace("{kg}", kg.toFixed(2))
    .replace("{lbs}", lbs.toFixed(1)) || "";

  return {
    values: {
      kilograms: Math.round(kg * 100) / 100,
      grams: Math.round(g * 10) / 10,
      pounds: Math.round(lbs * 10) / 10,
      stonePounds: `${wholeSt} ${stUnit} ${remainLbs} ${lbsUnit}`,
      ref1: "6.35 kg",
      ref5: "31.75 kg",
      ref10: "63.50 kg",
      ref14: "88.90 kg",
    },
    formatted: {
      kilograms: `${kg.toFixed(2)} ${kgUnit}`,
      grams: `${g.toFixed(1)} ${gUnit}`,
      pounds: `${lbs.toFixed(1)} ${lbsUnit}`,
      stonePounds: `${wholeSt} ${stUnit} ${remainLbs} ${lbsUnit}`,
      ref1: `6.35 ${kgUnit}`,
      ref5: `31.75 ${kgUnit}`,
      ref10: `63.50 ${kgUnit}`,
      ref14: `88.90 ${kgUnit}`,
    },
    summary,
    isValid: true,
  };
}

export default stonesToKgConverterConfig;
