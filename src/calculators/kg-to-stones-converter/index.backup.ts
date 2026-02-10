import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

export const kgToStonesConverterConfig: CalculatorConfigV4 = {
  id: "kg-to-stones-converter",
  version: "4.0",
  category: "conversion",
  icon: "⚖️",

  presets: [
    { id: "light", icon: "🪶", values: { kgValue: 50 } },
    { id: "average", icon: "⚖️", values: { kgValue: 70 } },
    { id: "heavy", icon: "🏋️", values: { kgValue: 95 } },
    { id: "veryHeavy", icon: "💪", values: { kgValue: 120 } },
  ],

  t: {
    en: {
      name: "KG to Stones Converter",
      slug: "kg-to-stones-converter",
      subtitle:
        "Convert kilograms to stones and pounds instantly — essential for understanding UK body weight measurements.",
      breadcrumb: "KG to Stones",

      seo: {
        title: "KG to Stones Converter - Kilograms to Stone | Free Tool",
        description:
          "Convert kilograms to stones and pounds instantly. Includes a reference table, precise decimal output, and automatic stones-and-pounds breakdown for UK weight measurements.",
        shortDescription: "Convert kilograms to stones and pounds with a reference table.",
        keywords: [
          "kg to stones",
          "kilograms to stones",
          "kg to stone converter",
          "convert kg to stone",
          "kg to st",
          "metric to uk weight",
          "kilograms to stone and pounds",
          "how many stone am i",
        ],
      },

      calculator: { yourInformation: "Enter Weight" },
      ui: { yourInformation: "Enter Weight", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        kgValue: {
          label: "Weight in Kilograms",
          helpText: "Enter the weight in kilograms (kg). 1 kg = 0.15747 stone",
        },
      },

      results: {
        stones: { label: "Stones (decimal)" },
        stonePounds: { label: "Stone & Pounds" },
        pounds: { label: "Pounds" },
      },

      presets: {
        light: { label: "50 kg", description: "~7 st 12 lbs" },
        average: { label: "70 kg", description: "~11 st 0 lbs" },
        heavy: { label: "95 kg", description: "~14 st 13 lbs" },
        veryHeavy: { label: "120 kg", description: "~18 st 13 lbs" },
      },

      values: { kg: "kg", g: "g", lbs: "lbs", st: "st" },

      formats: {
        summary: "{kg} kg = {stones} stone ({stonePounds})",
      },

      infoCards: {
        conversions: {
          title: "Conversion Results",
          items: [
            { label: "Stones (decimal)", valueKey: "stones" },
            { label: "Stone & Pounds", valueKey: "stonePounds" },
            { label: "Total Pounds", valueKey: "pounds" },
            { label: "Grams", valueKey: "grams" },
          ],
        },
        quickRef: {
          title: "Quick Reference",
          items: [
            { label: "50 kg", valueKey: "ref50" },
            { label: "70 kg", valueKey: "ref70" },
            { label: "80 kg", valueKey: "ref80" },
            { label: "100 kg", valueKey: "ref100" },
          ],
        },
        tips: {
          title: "Did You Know?",
          items: [
            "In the UK, people typically express weight as stones and pounds, e.g., '11 stone 4 pounds' rather than a decimal like '11.29 stone'. This converter provides both formats.",
            "Most bathroom scales sold in the UK display weight in all three units: stones, kilograms, and pounds. Digital scales often let you switch between them with a button.",
            "The NHS (UK National Health Service) uses kilograms for medical records, but patients are asked their weight in stones during routine consultations.",
            "When converting kg to stones for a rough estimate, divide by 6.35 — or even quicker, divide by 6 and subtract 5% for a close approximation.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is a Stone in Weight?",
          content:
            "The stone is an Imperial unit of weight equal to 14 pounds or approximately 6.35 kilograms, primarily used in the United Kingdom and Ireland for measuring body weight. While the kilogram is the internationally recognized SI unit for mass, the stone persists in British and Irish culture as the preferred way to discuss personal weight in everyday conversation. Understanding the kg-to-stone conversion is essential for anyone moving between metric and Imperial systems, whether you're reading a British fitness magazine, discussing weight with a UK doctor, or following a British diet program. The conversion factor is precise: 1 kilogram = 0.157473044 stones, or equivalently, divide kilograms by 6.35029318 to get stones.",
        },
        howItWorks: {
          title: "How to Convert Kilograms to Stones",
          content:
            "To convert kilograms to stones, divide the kilogram value by 6.35029318. For example, 80 kg ÷ 6.35029 = 12.598 stones. To express this as stones and pounds (the typical UK format), take the whole number (12 stones) and multiply the decimal by 14 to get pounds: 0.598 × 14 = 8.37 pounds, giving you 12 stone 8 pounds. For mental math, a quick approximation is to multiply kilograms by 0.157 — this gives you stones directly. Or divide by 6.35 and round to the nearest quarter stone for a casual estimate.",
        },
        considerations: {
          title: "Conversion Facts",
          items: [
            { text: "1 kg = 0.157473 stones = 2.20462 pounds. These are exact conversion factors defined by international standards.", type: "info" },
            { text: "To convert back: 1 stone = 6.35029 kg. Multiply stones by 6.35029 to get kilograms.", type: "info" },
            { text: "The stone is subdivided into 14 pounds. There are no smaller subdivisions — fractions are expressed in pounds (e.g., 10 st 7 lbs).", type: "info" },
            { text: "In the US, weight is expressed in pounds only. In most of Europe, Asia, and South America, kilograms are the standard.", type: "info" },
            { text: "Airline baggage limits are in kilograms worldwide. A typical 23 kg limit = 3 stone 9 lbs = 50.7 lbs.", type: "info" },
            { text: "BMI calculations require kilograms. If you know your weight in stones, convert to kg first: multiply stones by 6.35029, add extra pounds × 0.45359.", type: "info" },
          ],
        },
        categories: {
          title: "Common Weights in Stones & KG",
          items: [
            { text: "50 kg = 7 st 12 lbs — Typical weight for a petite adult or older teenager.", type: "info" },
            { text: "60 kg = 9 st 6 lbs — Average weight for women in many countries.", type: "info" },
            { text: "70 kg = 11 st 0 lbs — Average weight for adults globally.", type: "info" },
            { text: "80 kg = 12 st 8 lbs — Average weight for men in the UK.", type: "info" },
            { text: "90 kg = 14 st 2 lbs — Above average, common for tall or muscular men.", type: "info" },
            { text: "100 kg = 15 st 10 lbs — Heavyweight range. Often used as a benchmark in UK fitness goals.", type: "info" },
          ],
        },
        examples: {
          title: "Conversion Examples",
          description: "Step-by-step kg to stone conversions",
          examples: [
            {
              title: "Convert 75 kg to stones and pounds",
              steps: [
                "75 ÷ 6.35029 = 11.811 stones",
                "Whole stones: 11",
                "Remaining: 0.811 × 14 = 11.35 pounds ≈ 11 lbs",
              ],
              result: "75 kg = 11 stone 11 lbs (11.81 st)",
            },
            {
              title: "Convert 63 kg to stones and pounds",
              steps: [
                "63 ÷ 6.35029 = 9.921 stones",
                "Whole stones: 9",
                "Remaining: 0.921 × 14 = 12.89 pounds ≈ 13 lbs",
              ],
              result: "63 kg = 9 stone 13 lbs (9.92 st)",
            },
          ],
        },
      },

      faqs: [
        { question: "How do I convert kg to stones and pounds?", answer: "Divide kilograms by 6.35029 to get total stones. Take the whole number as stones, then multiply the decimal portion by 14 to get remaining pounds. For example, 85 kg ÷ 6.35029 = 13.385 stones → 13 stone and 0.385 × 14 = 5.4 pounds → 13 stone 5 lbs." },
        { question: "What is 70 kg in stones?", answer: "70 kg equals 11.02 stones, which is 11 stone 0.3 pounds — essentially exactly 11 stone. This makes 70 kg a convenient reference point for the conversion." },
        { question: "What is 80 kg in stones?", answer: "80 kg equals 12.60 stones, or 12 stone 8.4 pounds. This is close to the average weight for men in the United Kingdom." },
        { question: "How many kg is 10 stone?", answer: "10 stone equals 63.503 kg. To reverse the conversion, multiply stones by 6.35029." },
        { question: "Is the stone used anywhere besides the UK?", answer: "The stone is primarily used in the UK and Ireland for body weight. It was historically used in Australia, New Zealand, and Canada but those countries fully adopted the metric system in the 1970s. It is not used in the United States, where pounds are the standard Imperial unit for weight." },
        { question: "Why is a stone 14 pounds?", answer: "The standardization dates to the 1835 Weights and Measures Act. Before that, the stone varied from 5 to 40 pounds depending on the commodity being weighed. The 14-pound stone was the most common for wool trading and was selected as the official standard. It has remained unchanged since." },
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
      id: "kgValue",
      type: "number",
      defaultValue: null,
      placeholder: "70",
      min: 0.01,
      max: 1500,
      step: 0.1,
      suffix: "kg",
    },
  ],

  inputGroups: [],

  results: [
    { id: "stones", type: "primary", format: "number" },
    { id: "stonePounds", type: "secondary", format: "text" },
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
    { authors: "UK National Measurement Office", year: "2023", title: "The Weights and Measures Act 1985", source: "UK Government", url: "https://www.legislation.gov.uk/ukpga/1985/72" },
  ],

  hero: { icon: "⚖️", label: "Conversion" },
  sidebar: { showRelated: true, showPopular: true },
  features: { saveResults: true, pdfExport: true, sharing: true },
  relatedCalculators: ["stones-to-kg-converter", "kg-to-lbs-calculator", "lbs-to-kg-calculator"],
  ads: { showSidebar: true, showBetweenSections: true },
};

// ─── Calculate ───────────────────────────────────────────────────────────────

export function calculateKgToStonesConverter(data: {
  values: Record<string, unknown>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};

  const kgVal = values.kgValue as number | null;
  if (kgVal === null || kgVal <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const stonesDecimal = kgVal / 6.35029318;
  const totalLbs = kgVal * 2.20462;
  const wholeSt = Math.floor(stonesDecimal);
  const remainLbs = Math.round((stonesDecimal - wholeSt) * 14 * 10) / 10;
  const grams = kgVal * 1000;

  const stUnit = v["st"] || "st";
  const lbsUnit = v["lbs"] || "lbs";
  const kgUnit = v["kg"] || "kg";

  const stonePoundsStr = `${wholeSt} ${stUnit} ${remainLbs} ${lbsUnit}`;

  const f = (t?.formats as Record<string, string>) || {};
  const summary = f.summary
    ?.replace("{kg}", kgVal.toString())
    .replace("{stones}", stonesDecimal.toFixed(2))
    .replace("{stonePounds}", stonePoundsStr) || "";

  const fmt = (kg: number) => {
    const s = kg / 6.35029318;
    const ws = Math.floor(s);
    const rl = Math.round((s - ws) * 14);
    return `${ws} ${stUnit} ${rl} ${lbsUnit}`;
  };

  return {
    values: {
      stones: Math.round(stonesDecimal * 100) / 100,
      stonePounds: stonePoundsStr,
      pounds: Math.round(totalLbs * 10) / 10,
      grams: Math.round(grams),
      ref50: fmt(50),
      ref70: fmt(70),
      ref80: fmt(80),
      ref100: fmt(100),
    },
    formatted: {
      stones: `${stonesDecimal.toFixed(2)} ${stUnit}`,
      stonePounds: stonePoundsStr,
      pounds: `${totalLbs.toFixed(1)} ${lbsUnit}`,
      grams: `${grams.toLocaleString("en-US", { maximumFractionDigits: 0 })} g`,
      ref50: fmt(50),
      ref70: fmt(70),
      ref80: fmt(80),
      ref100: fmt(100),
    },
    summary,
    isValid: true,
  };
}

export default kgToStonesConverterConfig;
