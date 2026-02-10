import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

export const tablespoonToMlConverterConfig: CalculatorConfigV4 = {
  id: "tablespoon-to-ml-converter",
  version: "4.0",
  category: "conversion",
  icon: "🥄",

  presets: [
    { id: "half", icon: "🫗", values: { tbspValue: 0.5 } },
    { id: "one", icon: "🥄", values: { tbspValue: 1 } },
    { id: "three", icon: "🍯", values: { tbspValue: 3 } },
    { id: "quarter", icon: "🥣", values: { tbspValue: 4 } },
  ],

  t: {
    en: {
      name: "Tablespoons to mL Converter",
      slug: "tablespoon-to-ml-converter",
      subtitle:
        "Convert tablespoons to milliliters instantly — essential for cooking, baking, and medicine dosing with US, UK, and metric standards.",
      breadcrumb: "Tbsp to mL",

      seo: {
        title: "Tablespoons to mL Converter - Cooking & Baking | Free Tool",
        description:
          "Convert tablespoons to milliliters instantly. Supports US, UK, and Australian tablespoon standards with a quick reference table for common cooking measurements.",
        shortDescription: "Convert tablespoons to milliliters for cooking and baking.",
        keywords: [
          "tablespoon to ml",
          "tbsp to ml",
          "tablespoon to milliliters",
          "how many ml in a tablespoon",
          "tablespoon converter",
          "cooking measurement converter",
          "tbsp ml conversion",
          "tablespoon size ml",
        ],
      },

      calculator: { yourInformation: "Enter Measurement" },
      ui: { yourInformation: "Enter Measurement", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        tbspValue: {
          label: "Tablespoons",
          helpText: "Enter the number of tablespoons to convert to milliliters",
        },
        tbspStandard: {
          label: "Tablespoon Standard",
          helpText: "US tablespoon = 14.787 mL. UK tablespoon = 17.758 mL. Australian = 20 mL. Metric = 15 mL",
          options: {
            us: "US (14.79 mL)",
            metric: "Metric (15 mL)",
            uk: "UK (17.76 mL)",
            australian: "Australian (20 mL)",
          },
        },
      },

      results: {
        milliliters: { label: "Milliliters" },
        teaspoons: { label: "Teaspoons" },
        fluidOunces: { label: "Fluid Ounces" },
        cups: { label: "Cups" },
      },

      presets: {
        half: { label: "½ Tbsp", description: "~7.4 mL" },
        one: { label: "1 Tbsp", description: "~14.8 mL" },
        three: { label: "3 Tbsp", description: "~44.4 mL" },
        quarter: { label: "¼ Cup (4 Tbsp)", description: "~59.1 mL" },
      },

      values: { ml: "mL", tsp: "tsp", tbsp: "tbsp", floz: "fl oz", cups: "cups" },

      formats: {
        summary: "{tbsp} tablespoons = {ml} mL ({tsp} tsp)",
      },

      infoCards: {
        conversions: {
          title: "Conversion Results",
          items: [
            { label: "Milliliters", valueKey: "milliliters" },
            { label: "Teaspoons", valueKey: "teaspoons" },
            { label: "Fluid Ounces", valueKey: "fluidOunces" },
            { label: "Cups", valueKey: "cups" },
          ],
        },
        quickRef: {
          title: "Quick Reference",
          items: [
            { label: "1 tbsp", valueKey: "ref1" },
            { label: "2 tbsp", valueKey: "ref2" },
            { label: "4 tbsp (¼ cup)", valueKey: "ref4" },
            { label: "8 tbsp (½ cup)", valueKey: "ref8" },
          ],
        },
        tips: {
          title: "Cooking Tips",
          items: [
            "For baking precision, use measuring spoons rather than regular silverware. A dinner spoon holds roughly 2 tbsp — nearly double the standard tablespoon.",
            "When a recipe says 'tablespoon', it means a level tablespoon unless stated otherwise. A heaped tablespoon can hold nearly twice as much.",
            "For sticky ingredients like honey or peanut butter, spray the measuring spoon with cooking oil first — the ingredient slides right out for accurate measurement.",
            "3 teaspoons = 1 tablespoon. This is one of the most useful kitchen conversions to memorize, especially when scaling recipes up or down.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is a Tablespoon in mL?",
          content:
            "A tablespoon (tbsp) is a common cooking measurement whose exact size varies by country. The US tablespoon equals 14.787 mL, the metric tablespoon used in international recipes equals exactly 15 mL, the UK tablespoon equals 17.758 mL, and the Australian tablespoon is 20 mL. This variation causes confusion when following recipes from different countries. For most cooking purposes, the difference between US (14.79 mL) and metric (15 mL) tablespoons is negligible — just 1.4% — and won't affect your recipe. However, the Australian tablespoon is 35% larger than the US version, which can significantly impact baking recipes where precision matters. This converter handles all four standards so you always get accurate measurements regardless of which country's recipes you're following.",
        },
        howItWorks: {
          title: "How to Convert Tablespoons to Milliliters",
          content:
            "Multiply the number of tablespoons by the appropriate conversion factor for your standard: US tablespoon × 14.787 = mL, metric tablespoon × 15 = mL, UK tablespoon × 17.758 = mL, or Australian tablespoon × 20 = mL. For example, 3 US tablespoons = 3 × 14.787 = 44.36 mL. To convert the other direction (mL to tablespoons), divide milliliters by the same factor. For quick mental math with US tablespoons, multiply by 15 (the metric approximation) — you'll be within 1.5% of the exact answer, which is close enough for cooking. For baking, where precision matters more, use the exact 14.787 factor or this converter.",
        },
        considerations: {
          title: "Measurement Standards",
          items: [
            { text: "US tablespoon = 14.787 mL (defined as ½ US fluid ounce). This is the standard in American cookbooks and recipes.", type: "info" },
            { text: "Metric tablespoon = 15 mL exactly. Used in international recipes and most modern cookbooks published outside the US.", type: "info" },
            { text: "UK tablespoon = 17.758 mL (defined as ⅝ UK fluid ounce). Older British recipes use this larger tablespoon.", type: "warning" },
            { text: "Australian tablespoon = 20 mL. Significantly larger than US/metric. Always check if a recipe uses Australian measurements.", type: "warning" },
            { text: "1 US tablespoon = 3 US teaspoons. 1 US cup = 16 tablespoons. These relationships are consistent within the US system.", type: "info" },
            { text: "For medicine dosing, always use the metric tablespoon (15 mL) or the dosing device provided. Never use kitchen spoons for medication.", type: "warning" },
          ],
        },
        categories: {
          title: "Common Cooking Conversions",
          items: [
            { text: "½ tablespoon = 1½ teaspoons = ~7.4 mL. Often needed for halving recipes that call for 1 tablespoon.", type: "info" },
            { text: "1 tablespoon = 3 teaspoons = ~14.8 mL (US). The fundamental tablespoon-to-teaspoon ratio.", type: "info" },
            { text: "2 tablespoons = 1 fluid ounce = ~29.6 mL. Useful when converting between volume and weight for liquids.", type: "info" },
            { text: "4 tablespoons = ¼ cup = ~59.1 mL. Common measurement in baking (butter, sugar, flour).", type: "info" },
            { text: "8 tablespoons = ½ cup = ~118.3 mL. Another critical baking conversion to know.", type: "info" },
            { text: "16 tablespoons = 1 cup = ~236.6 mL. Full cup equivalent in tablespoons.", type: "info" },
          ],
        },
        examples: {
          title: "Conversion Examples",
          description: "Step-by-step tablespoon to mL conversions",
          examples: [
            {
              title: "Convert 2.5 US tablespoons to mL",
              steps: [
                "2.5 × 14.787 = 36.97 mL",
                "Also equals 7.5 teaspoons",
                "Also equals ~1.25 fluid ounces",
              ],
              result: "2.5 US tbsp = 36.97 mL",
            },
            {
              title: "Convert 3 Australian tablespoons to mL",
              steps: [
                "3 × 20 = 60 mL",
                "Equivalent to ~4.06 US tablespoons",
                "Nearly ¼ cup (US)",
              ],
              result: "3 Australian tbsp = 60 mL",
            },
          ],
        },
      },

      faqs: [
        { question: "How many mL in a tablespoon?", answer: "It depends on the standard: a US tablespoon is 14.787 mL, a metric tablespoon is exactly 15 mL, a UK tablespoon is 17.758 mL, and an Australian tablespoon is 20 mL. For most cooking purposes, using 15 mL per tablespoon is accurate enough." },
        { question: "Is a tablespoon 15 mL or 20 mL?", answer: "A metric tablespoon is 15 mL, which is the international standard. An Australian tablespoon is 20 mL. If you're following an Australian recipe, use 20 mL per tablespoon. For recipes from most other countries, use 15 mL." },
        { question: "How many teaspoons in a tablespoon?", answer: "In the US system, 1 tablespoon = 3 teaspoons exactly. This is consistent across US, metric, and UK standards. An Australian tablespoon equals 4 Australian teaspoons (each 5 mL)." },
        { question: "Can I use a regular spoon as a tablespoon?", answer: "Not accurately. Regular dinner spoons vary widely in size, typically holding 10-20 mL. For cooking, use proper measuring spoons. For medication dosing, always use the provided dosing device, as inaccurate doses can be harmful." },
        { question: "How do I convert tablespoons to cups?", answer: "Divide the number of tablespoons by 16 to get US cups. For example, 6 tablespoons ÷ 16 = 0.375 cups (⅜ cup). Key benchmarks: 4 tbsp = ¼ cup, 8 tbsp = ½ cup, 12 tbsp = ¾ cup, 16 tbsp = 1 cup." },
        { question: "Why are Australian tablespoons different?", answer: "When Australia adopted the metric system in the 1970s, they defined the tablespoon as 20 mL (4 teaspoons of 5 mL each) for easy metric math. Most other countries adopted 15 mL (3 teaspoons of 5 mL). This means Australian recipes use about 33% more per tablespoon — important to know when cooking from Australian sources." },
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
      id: "tbspValue",
      type: "number",
      defaultValue: null,
      placeholder: "2",
      min: 0.01,
      max: 500,
      step: 0.25,
      suffix: "tbsp",
    },
    {
      id: "tbspStandard",
      type: "select",
      defaultValue: "us",
      options: [
        { value: "us" },
        { value: "metric" },
        { value: "uk" },
        { value: "australian" },
      ],
    },
  ],

  inputGroups: [],

  results: [
    { id: "milliliters", type: "primary", format: "number" },
    { id: "teaspoons", type: "secondary", format: "number" },
    { id: "fluidOunces", type: "secondary", format: "number" },
    { id: "cups", type: "secondary", format: "number" },
  ],

  infoCards: [
    { id: "conversions", type: "list", icon: "🥄", itemCount: 4 },
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
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 133 – Checking the Net Contents of Packaged Goods", source: "NIST", url: "https://www.nist.gov/pml/owm/handbook-133-current-edition" },
    { authors: "U.S. Food and Drug Administration", year: "2024", title: "Guidance for Industry: Nutrition Labeling Manual", source: "FDA", url: "https://www.fda.gov/" },
  ],

  hero: { icon: "🥄", label: "Conversion" },
  sidebar: { showRelated: true, showPopular: true },
  features: { saveResults: true, pdfExport: true, sharing: true },
  relatedCalculators: ["oz-to-ml-calculator", "cups-to-ml-calculator", "gallons-to-liters-calculator"],
  ads: { showSidebar: true, showBetweenSections: true },
};

// ─── Calculate ───────────────────────────────────────────────────────────────

export function calculateTablespoonToMlConverter(data: {
  values: Record<string, unknown>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};

  const tbsp = values.tbspValue as number | null;
  if (tbsp === null || tbsp <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const standard = (values.tbspStandard as string) || "us";

  const ML_PER_TBSP: Record<string, number> = {
    us: 14.7868,
    metric: 15,
    uk: 17.7582,
    australian: 20,
  };

  const factor = ML_PER_TBSP[standard] || 14.7868;
  const ml = tbsp * factor;
  const tsp = tbsp * 3; // 3 tsp per tbsp (US/metric/UK)
  const floz = ml / 29.5735;
  const cups = tbsp / 16;

  const mlUnit = v["ml"] || "mL";
  const tspUnit = v["tsp"] || "tsp";
  const flozUnit = v["floz"] || "fl oz";

  const fmtMl = (val: number) =>
    val < 10 ? val.toFixed(2) : val.toFixed(1);

  // Quick ref (always US standard for consistency)
  const ref = (n: number) => `${(n * 14.7868).toFixed(1)} ${mlUnit}`;

  const f = (t?.formats as Record<string, string>) || {};
  const summary = f.summary
    ?.replace("{tbsp}", tbsp.toString())
    .replace("{ml}", fmtMl(ml))
    .replace("{tsp}", tsp.toFixed(1)) || "";

  return {
    values: {
      milliliters: Math.round(ml * 100) / 100,
      teaspoons: Math.round(tsp * 10) / 10,
      fluidOunces: Math.round(floz * 1000) / 1000,
      cups: Math.round(cups * 1000) / 1000,
      ref1: ref(1),
      ref2: ref(2),
      ref4: ref(4),
      ref8: ref(8),
    },
    formatted: {
      milliliters: `${fmtMl(ml)} ${mlUnit}`,
      teaspoons: `${tsp.toFixed(1)} ${tspUnit}`,
      fluidOunces: `${floz.toFixed(2)} ${flozUnit}`,
      cups: cups >= 0.25 ? `${cups.toFixed(2)} cups` : `${(cups * 16).toFixed(1)} tbsp`,
      ref1: ref(1),
      ref2: ref(2),
      ref4: `${(4 * 14.7868).toFixed(1)} ${mlUnit} (¼ cup)`,
      ref8: `${(8 * 14.7868).toFixed(1)} ${mlUnit} (½ cup)`,
    },
    summary,
    isValid: true,
  };
}

export default tablespoonToMlConverterConfig;
