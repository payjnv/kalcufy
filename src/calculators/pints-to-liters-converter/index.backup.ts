import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

export const pintsToLitersConverterConfig: CalculatorConfigV4 = {
  id: "pints-to-liters-converter",
  version: "4.0",
  category: "conversion",
  icon: "🍺",

  presets: [
    { id: "one", icon: "🥛", values: { pintValue: 1 } },
    { id: "two", icon: "🍺", values: { pintValue: 2 } },
    { id: "half", icon: "🫗", values: { pintValue: 0.5 } },
    { id: "six", icon: "🍻", values: { pintValue: 6 } },
  ],

  t: {
    en: {
      name: "Pints to Liters Converter",
      slug: "pints-to-liters-converter",
      subtitle:
        "Convert pints to liters instantly — supports both US and UK (Imperial) pint standards for cooking, beverages, and daily use.",
      breadcrumb: "Pints to Liters",

      seo: {
        title: "Pints to Liters Converter - US & UK Pints | Free Tool",
        description:
          "Convert pints to liters instantly. Supports US pints (473 mL) and UK Imperial pints (568 mL) with a quick reference table for common volumes in cooking and beverages.",
        shortDescription: "Convert US and UK pints to liters with a reference table.",
        keywords: [
          "pints to liters",
          "pint to liter converter",
          "how many liters in a pint",
          "pint to litres",
          "us pint to liters",
          "uk pint to liters",
          "imperial pint to liters",
          "pint converter",
        ],
      },

      calculator: { yourInformation: "Enter Volume" },
      ui: { yourInformation: "Enter Volume", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        pintValue: {
          label: "Pints",
          helpText: "Enter the number of pints to convert to liters",
        },
        pintStandard: {
          label: "Pint Standard",
          helpText: "US pint = 473.176 mL. UK (Imperial) pint = 568.261 mL. The UK pint is 20% larger",
          options: {
            us: "US Pint (473 mL)",
            uk: "UK / Imperial Pint (568 mL)",
          },
        },
      },

      results: {
        liters: { label: "Liters" },
        milliliters: { label: "Milliliters" },
        cups: { label: "Cups" },
        fluidOunces: { label: "Fluid Ounces" },
        gallons: { label: "Gallons" },
      },

      presets: {
        one: { label: "1 Pint", description: "~0.473 L (US)" },
        two: { label: "2 Pints", description: "~0.946 L (US) ≈ 1 quart" },
        half: { label: "½ Pint", description: "~0.237 L (US) = 1 cup" },
        six: { label: "6 Pints", description: "~2.84 L (US)" },
      },

      values: { l: "L", ml: "mL", cups: "cups", floz: "fl oz", gal: "gal", pt: "pt" },

      formats: {
        summary: "{pint} pints = {liters} liters ({ml} mL)",
      },

      infoCards: {
        conversions: {
          title: "Conversion Results",
          items: [
            { label: "Liters", valueKey: "liters" },
            { label: "Milliliters", valueKey: "milliliters" },
            { label: "Cups", valueKey: "cups" },
            { label: "Fluid Ounces", valueKey: "fluidOunces" },
          ],
        },
        quickRef: {
          title: "Quick Reference",
          items: [
            { label: "1 US pint", valueKey: "ref1us" },
            { label: "1 UK pint", valueKey: "ref1uk" },
            { label: "4 US pints", valueKey: "ref4us" },
            { label: "8 US pints", valueKey: "ref8us" },
          ],
        },
        tips: {
          title: "Good to Know",
          items: [
            "A UK pint is 20% larger than a US pint. If you order a pint of beer in London, you get 568 mL — in New York, only 473 mL. Always check which pint standard a recipe uses.",
            "2 US pints = 1 quart. 4 quarts = 1 gallon. So 8 pints = 1 US gallon (3.785 liters). These relationships are consistent within the US system.",
            "In most countries outside the US and UK, the liter is the standard unit for liquid volume. A liter is slightly more than 2 US pints (2.11 pints).",
            "For cooking: 1 US pint = 2 cups = 16 fluid ounces. This makes halving and doubling recipes straightforward when working with pint measurements.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is a Pint?",
          content:
            "A pint is a unit of liquid volume used primarily in the United States and the United Kingdom, though the two countries define it differently. The US pint equals 473.176 mL (approximately 0.473 liters), while the UK Imperial pint is larger at 568.261 mL (approximately 0.568 liters) — a 20% difference. This discrepancy dates back to 1824 when the British Imperial system was standardized differently from the American customary system, which retained an older English wine gallon definition. In everyday life, pints are used for beverages (especially beer and milk), cooking recipes, and measuring berries and other produce. The liter, used by most of the world, provides a universal standard: 1 liter = 2.113 US pints or 1.760 UK pints. Understanding this conversion is essential for international cooking, traveling, and following recipes from different countries.",
        },
        howItWorks: {
          title: "How to Convert Pints to Liters",
          content:
            "For US pints, multiply by 0.473176 to get liters. For UK Imperial pints, multiply by 0.568261. For example, 3 US pints = 3 × 0.473176 = 1.419 liters. To convert liters back to pints, divide by the same factor: 2 liters ÷ 0.473176 = 4.227 US pints. For quick mental math with US pints, remember that 2 pints ≈ 1 liter (actually 0.946 L, so about 5% under). For UK pints, think of each pint as just over half a liter (0.568 L). The key relationship to remember: 1 US gallon = 8 US pints = 3.785 liters, and 1 UK gallon = 8 UK pints = 4.546 liters.",
        },
        considerations: {
          title: "Pint Standards & Facts",
          items: [
            { text: "US pint = 473.176 mL = 16 US fluid ounces = 2 US cups. This is the standard in American cookbooks and recipes.", type: "info" },
            { text: "UK Imperial pint = 568.261 mL = 20 UK fluid ounces. Note that a UK fluid ounce (28.413 mL) is also different from a US fluid ounce (29.574 mL).", type: "info" },
            { text: "The UK pint is 20% larger than the US pint. A 'pint of beer' in London contains significantly more than in New York.", type: "warning" },
            { text: "Canada officially uses the metric system but the Imperial pint (568 mL) is still the legal measure for draft beer served in bars.", type: "info" },
            { text: "In Australia and New Zealand, a 'pint' of beer is actually 570 mL — practically identical to the UK Imperial pint, even though these countries are fully metric.", type: "info" },
            { text: "For cooking: 1 US pint of water weighs approximately 1.043 pounds (473 grams). 1 UK pint of water weighs approximately 1.25 pounds (568 grams).", type: "info" },
          ],
        },
        categories: {
          title: "Common Volumes in Pints & Liters",
          items: [
            { text: "½ US pint = 1 cup = 237 mL. The basic cup measurement in American cooking.", type: "info" },
            { text: "1 US pint = 473 mL ≈ 0.47 L. A standard US beer serving or measuring cup.", type: "info" },
            { text: "2 US pints = 1 quart = 946 mL ≈ 0.95 L. Nearly 1 liter — useful for approximation.", type: "info" },
            { text: "1 UK pint = 568 mL ≈ 0.57 L. The standard British beer glass and milk measure.", type: "info" },
            { text: "4 US pints = ½ gallon = 1.89 L. A common milk container size in the US.", type: "info" },
            { text: "8 US pints = 1 gallon = 3.79 L. The standard US gallon, used for milk, fuel, and large volumes.", type: "info" },
          ],
        },
        examples: {
          title: "Conversion Examples",
          description: "Step-by-step pint to liter conversions",
          examples: [
            {
              title: "Convert 3 US pints to liters",
              steps: [
                "3 × 0.473176 = 1.4195 liters",
                "Also equals 1,419.5 mL",
                "Also equals 6 US cups",
                "Also equals 48 US fluid ounces",
              ],
              result: "3 US pints = 1.42 liters",
            },
            {
              title: "Convert 2 UK pints to liters",
              steps: [
                "2 × 0.568261 = 1.1365 liters",
                "Also equals 1,136.5 mL",
                "Also equals 40 UK fluid ounces",
                "Note: same 2 pints in US = only 0.946 L",
              ],
              result: "2 UK pints = 1.14 liters",
            },
          ],
        },
      },

      faqs: [
        { question: "How many liters is 1 pint?", answer: "1 US pint = 0.473 liters (473 mL). 1 UK Imperial pint = 0.568 liters (568 mL). The UK pint is about 20% larger than the US pint. For quick estimation, remember that 2 US pints is close to 1 liter (actually 0.946 L)." },
        { question: "Is a US pint the same as a UK pint?", answer: "No. A US pint is 473 mL (16 US fl oz), while a UK Imperial pint is 568 mL (20 UK fl oz). The UK pint is 20% larger. This difference dates to 1824 when Britain redefined its gallon based on the weight of water, while the US kept the older English wine gallon definition." },
        { question: "How many pints in a liter?", answer: "There are 2.113 US pints in 1 liter, or 1.760 UK Imperial pints in 1 liter. For a quick approximation, think of a liter as 'just over 2 US pints' or 'just under 2 UK pints'." },
        { question: "How many cups in a pint?", answer: "1 US pint = 2 US cups exactly (each cup = 236.6 mL). In the UK system, 1 Imperial pint = 2.27 US cups. The cup is not officially used in the UK, but when referenced it typically means 284 mL (½ Imperial pint), giving exactly 2 UK cups per pint." },
        { question: "How do I convert a recipe from pints to liters?", answer: "First determine whether the recipe uses US or UK pints (US is more common in American cookbooks, UK in British ones). Multiply US pints by 0.473 or UK pints by 0.568 to get liters. For rough cooking estimates, simply halve the pint value — 4 pints ≈ 2 liters. For baking where precision matters, use the exact conversion." },
        { question: "Why is a pint of beer different in the US and UK?", answer: "The difference traces back to the early 19th century when Britain and the US standardized their measurement systems independently. The US kept the English wine gallon (231 cubic inches), making the US pint 473 mL. Britain adopted the Imperial gallon based on 10 pounds of water (277.4 cubic inches), making the Imperial pint 568 mL. Many British visitors to the US are disappointed by the smaller 'pint' served in American bars." },
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
      id: "pintValue",
      type: "number",
      defaultValue: null,
      placeholder: "2",
      min: 0.01,
      max: 1000,
      step: 0.25,
      suffix: "pt",
    },
    {
      id: "pintStandard",
      type: "select",
      defaultValue: "us",
      options: [
        { value: "us" },
        { value: "uk" },
      ],
    },
  ],

  inputGroups: [],

  results: [
    { id: "liters", type: "primary", format: "number" },
    { id: "milliliters", type: "secondary", format: "number" },
    { id: "cups", type: "secondary", format: "number" },
    { id: "fluidOunces", type: "secondary", format: "number" },
    { id: "gallons", type: "secondary", format: "number" },
  ],

  infoCards: [
    { id: "conversions", type: "list", icon: "🍺", itemCount: 4 },
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
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 – Specifications, Tolerances, and Other Technical Requirements for Weighing and Measuring Devices", source: "NIST", url: "https://www.nist.gov/pml/owm/handbook-44-current-edition" },
    { authors: "UK Weights and Measures Act", year: "1985", title: "Weights and Measures Act 1985 – Definitions of Imperial Units", source: "UK Government", url: "https://www.legislation.gov.uk/ukpga/1985/72" },
  ],

  hero: { icon: "🍺", label: "Conversion" },
  sidebar: { showRelated: true, showPopular: true },
  features: { saveResults: true, pdfExport: true, sharing: true },
  relatedCalculators: ["gallons-to-liters-calculator", "cups-to-ml-calculator", "oz-to-ml-calculator"],
  ads: { showSidebar: true, showBetweenSections: true },
};

// ─── Calculate ───────────────────────────────────────────────────────────────

export function calculatePintsToLitersConverter(data: {
  values: Record<string, unknown>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};

  const pintVal = values.pintValue as number | null;
  if (pintVal === null || pintVal <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const standard = (values.pintStandard as string) || "us";

  const ML_PER_PINT: Record<string, number> = {
    us: 473.17647,
    uk: 568.26125,
  };

  const factor = ML_PER_PINT[standard] || 473.17647;
  const ml = pintVal * factor;
  const liters = ml / 1000;
  const cups = standard === "us" ? pintVal * 2 : pintVal * 2.273;
  const floz = standard === "us" ? pintVal * 16 : pintVal * 20;
  const gallons = standard === "us" ? pintVal / 8 : pintVal / 8;

  const lUnit = v["l"] || "L";
  const mlUnit = v["ml"] || "mL";
  const flozUnit = v["floz"] || "fl oz";

  const fmtL = (val: number) =>
    val < 1 ? val.toFixed(3) : val < 10 ? val.toFixed(2) : val.toFixed(1);

  const f = (t?.formats as Record<string, string>) || {};
  const summary = f.summary
    ?.replace("{pint}", pintVal.toString())
    .replace("{liters}", fmtL(liters))
    .replace("{ml}", Math.round(ml).toString()) || "";

  return {
    values: {
      liters: Math.round(liters * 1000) / 1000,
      milliliters: Math.round(ml * 10) / 10,
      cups: Math.round(cups * 100) / 100,
      fluidOunces: Math.round(floz * 10) / 10,
      gallons: Math.round(gallons * 1000) / 1000,
      ref1us: "0.473 L",
      ref1uk: "0.568 L",
      ref4us: "1.893 L",
      ref8us: "3.785 L (1 gal)",
    },
    formatted: {
      liters: `${fmtL(liters)} ${lUnit}`,
      milliliters: `${ml.toFixed(1)} ${mlUnit}`,
      cups: `${cups.toFixed(2)} cups`,
      fluidOunces: `${floz.toFixed(1)} ${flozUnit}`,
      gallons: `${gallons.toFixed(3)} gal`,
      ref1us: `0.473 ${lUnit}`,
      ref1uk: `0.568 ${lUnit}`,
      ref4us: `1.893 ${lUnit}`,
      ref8us: `3.785 ${lUnit} (1 gal)`,
    },
    summary,
    isValid: true,
  };
}

export default pintsToLitersConverterConfig;
