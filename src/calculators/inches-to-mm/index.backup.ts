import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// INCHES TO MM CONVERTER - V4 (EN ONLY)
// ============================================================================

export const inchesToMmConverterConfig: CalculatorConfigV4 = {
  id: "inches-to-mm",
  version: "4.0",
  category: "conversion",
  icon: "📏",

  presets: [
    { id: "quarter", icon: "🔩", values: { amount: 0.25 } },
    { id: "half", icon: "🔧", values: { amount: 0.5 } },
    { id: "one", icon: "📏", values: { amount: 1 } },
  ],

  t: {
    en: {
      name: "Inches to MM Converter",
      slug: "inches-to-mm",
      subtitle: "Convert inches to millimeters instantly — perfect for engineering, hardware, and precision measurements.",
      breadcrumb: "Inches to MM",

      seo: {
        title: "Inches to MM Converter - Free Inch to Millimeter Tool",
        description: "Convert inches to millimeters instantly. Perfect for engineering, 3D printing, CNC machining, and hardware sizing. Includes fraction-to-mm chart and common sizes.",
        shortDescription: "Convert inches to millimeters instantly.",
        keywords: ["inches to mm", "inches to millimeters", "in to mm converter", "convert inches to mm", "fraction to mm chart", "free inches converter", "imperial to metric mm"],
      },

      calculator: { yourInformation: "Inches to MM" },
      ui: { yourInformation: "Inches to MM", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Measurement", helpText: "Enter value and select unit" },
      },

      results: {
        millimeters: { label: "Millimeters" },
        centimeters: { label: "Centimeters" },
        meters: { label: "Meters" },
        mils: { label: "Mils (thou)" },
      },

      presets: {
        quarter: { label: "1/4 inch", description: "0.25\" = 6.35 mm" },
        half: { label: "1/2 inch", description: "0.5\" = 12.7 mm" },
        one: { label: "1 inch", description: "1\" = 25.4 mm" },
      },

      values: { "mm": "mm", "cm": "cm", "m": "m", "mil": "mil", "in": "in" },
      formats: { summary: "{in} in = {mm} mm" },

      infoCards: {
        results: {
          title: "📏 Conversion Results",
          items: [
            { label: "Millimeters", valueKey: "millimeters" },
            { label: "Centimeters", valueKey: "centimeters" },
            { label: "Meters", valueKey: "meters" },
            { label: "Mils", valueKey: "mils" },
          ],
        },
        quickRef: {
          title: "📊 Fraction to MM",
          items: [
            { label: "1/8\"", valueKey: "ref8th" },
            { label: "1/4\"", valueKey: "ref4th" },
            { label: "1/2\"", valueKey: "refHalf" },
            { label: "3/4\"", valueKey: "ref34" },
          ],
        },
        tips: {
          title: "💡 Precision Tips",
          items: [
            "Multiply inches by 25.4 to get mm — this is an exact conversion.",
            "Common fractions: 1/16\" = 1.588 mm, 1/8\" = 3.175 mm, 1/4\" = 6.35 mm.",
            "Drill bits: #30 = 3.26 mm, 1/8\" = 3.175 mm, #7 = 5.11 mm.",
            "Sheet metal gauge: 18 ga = 1.27 mm, 16 ga = 1.52 mm, 14 ga = 1.90 mm.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert Inches to Millimeters",
          content: "To convert inches to millimeters, multiply by 25.4. One inch equals exactly 25.4 millimeters — this is an exact definition, not an approximation. The relationship was established by international agreement in 1959. This conversion is crucial in engineering, manufacturing, hardware sizing, and any field where imperial and metric specifications coexist. Many technical drawings, CNC programs, and 3D printing specifications require mm, while US hardware and construction use inches.",
        },
        howItWorks: {
          title: "The Inches to MM Formula",
          content: "The formula is: millimeters = inches × 25.4. For fractional inches, first convert to decimal: 1/4\" = 0.25, 3/8\" = 0.375, 1/2\" = 0.5, 5/8\" = 0.625, 3/4\" = 0.75. Then multiply by 25.4. Example: 3/8\" × 25.4 = 9.525 mm. For mixed fractions like 2-3/8\": 2.375 × 25.4 = 60.325 mm. The 'mil' or 'thou' (0.001\") is also useful: 1 mil = 0.0254 mm.",
        },
        considerations: {
          title: "Common Inches to MM Conversions",
          items: [
            { text: "1/16\" = 1.5875 mm — smallest common fraction", type: "info" },
            { text: "1/8\" = 3.175 mm — common in hardware and plumbing", type: "info" },
            { text: "1/4\" = 6.35 mm — very common bolt and screw size", type: "info" },
            { text: "3/8\" = 9.525 mm — close to 10mm metric", type: "info" },
            { text: "1/2\" = 12.7 mm — standard pipe and hardware size", type: "info" },
            { text: "1\" = 25.4 mm exactly — the fundamental conversion", type: "info" },
          ],
        },
        drillBits: {
          title: "Drill Bit Size Conversions",
          items: [
            { text: "1/16\" = 1.588 mm — smallest common drill bit", type: "info" },
            { text: "3/32\" = 2.381 mm — fine pilot holes", type: "info" },
            { text: "1/8\" = 3.175 mm — standard pilot hole", type: "info" },
            { text: "3/16\" = 4.763 mm — medium-small holes", type: "info" },
            { text: "1/4\" = 6.350 mm — standard through-holes", type: "info" },
            { text: "3/8\" = 9.525 mm — large through-holes", type: "info" },
          ],
        },
        examples: {
          title: "Inches to MM Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Convert 3/8\" bolt to mm",
              steps: ["3/8 = 0.375 inches", "0.375 × 25.4 = 9.525 mm", "Closest metric: 10 mm bolt", "Difference: 10 - 9.525 = 0.475 mm", "NOT interchangeable for precision"],
              result: "3/8\" = 9.525 mm (≈ 10 mm metric)",
            },
            {
              title: "Convert 2.5\" pipe diameter to mm",
              steps: ["2.5 × 25.4 = 63.5 mm", "Standard metric pipe: 65 mm", "Or DN65 (nominal diameter)", "2.5\" is a common US pipe size"],
              result: "2.5\" = 63.5 mm",
            },
          ],
        },
      },

      faqs: [
        { question: "How many mm is 1 inch?", answer: "1 inch equals exactly 25.4 millimeters. This is an exact definition established by international agreement in 1959, not an approximation." },
        { question: "How do I convert inch fractions to mm?", answer: "Convert the fraction to decimal first, then multiply by 25.4. Examples: 1/8\" = 0.125 × 25.4 = 3.175 mm. 5/16\" = 0.3125 × 25.4 = 7.938 mm. 3/4\" = 0.75 × 25.4 = 19.05 mm." },
        { question: "Can I use a 10mm wrench on a 3/8\" bolt?", answer: "A 3/8\" bolt is 9.525 mm, so a 10mm wrench is 0.475 mm larger — it may work but can round off bolt heads over time. For precision work, always use the correct size. Metric and imperial wrenches are close but not interchangeable." },
        { question: "What is a mil or thou?", answer: "A mil (also called thou) is 1/1000 of an inch = 0.0254 mm = 25.4 micrometers. It's used in manufacturing, PCB design, and thin material measurements. To convert mils to mm, multiply by 0.0254." },
        { question: "How thick is 1mm in inches?", answer: "1 mm = 0.03937 inches ≈ 1/25 of an inch, or about 39.4 mils. For context, a credit card is about 0.76 mm (0.030\") thick, and a US dime is about 1.35 mm (0.053\") thick." },
        { question: "What are standard drill bit sizes in mm?", answer: "US drill bits come in fractional inches (1/16\" increments), number sizes (#1-80), and letter sizes (A-Z). Common conversions: 1/8\" = 3.175 mm, 1/4\" = 6.35 mm, 3/8\" = 9.525 mm, 1/2\" = 12.7 mm. Metric drill bits go in 0.5mm increments: 3.0, 3.5, 4.0, 4.5, 5.0 mm, etc." },
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
      placeholder: "1",
      min: 0,
      unitType: "length_small",
      syncGroup: false,
      defaultUnit: "in",
    },
  ],

  inputGroups: [],

  results: [
    { id: "millimeters", type: "primary", format: "text" },
    { id: "centimeters", type: "secondary", format: "text" },
    { id: "meters", type: "secondary", format: "text" },
    { id: "mils", type: "secondary", format: "text" },
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
    { id: "drillBits", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 — Specifications for Length", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-length" },
    { authors: "ISO", year: "2023", title: "ISO 80000-3 — Quantities and Units: Space and Time", source: "ISO", url: "https://www.iso.org/standard/64974.html" },
  ],

  hero: { badge: "Conversion", title: "Inches to MM" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["mm-to-inches", "inches-to-cm", "length-converter"],
  ads: { showTopBanner: false, showSidebar: true, showBetweenSections: false },
};

// ============================================================================
// CALCULATE
// ============================================================================

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) >= 1e6) return val.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (Math.abs(val) >= 1000) return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (Math.abs(val) < 0.001) return val.toExponential(3);
  if (Math.abs(val) < 0.01) return val.toFixed(4);
  return val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 4 });
}

export function calculateInchesToMm(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const fromUnit = fieldUnits.amount || "in";
  const mm = convertToBase(amount, fromUnit, "length_small");

  const cm = mm / 10;
  const meters = mm / 1000;
  const inches = mm / 25.4;
  const mils = inches * 1000;

  const ref8th = (1 / 8) * 25.4;
  const ref4th = (1 / 4) * 25.4;
  const refHalf = (1 / 2) * 25.4;
  const ref34 = (3 / 4) * 25.4;

  return {
    values: { millimeters: mm, centimeters: cm, meters, mils },
    formatted: {
      millimeters: `${fmtNum(mm)} mm`,
      centimeters: `${fmtNum(cm)} cm`,
      meters: `${fmtNum(meters)} m`,
      mils: `${fmtNum(mils)} mil`,
      ref8th: `${fmtNum(ref8th)} mm`,
      ref4th: `${fmtNum(ref4th)} mm`,
      refHalf: `${fmtNum(refHalf)} mm`,
      ref34: `${fmtNum(ref34)} mm`,
    },
    summary: `${fmtNum(amount)} ${fromUnit} = ${fmtNum(mm)} mm`,
    isValid: true,
  };
}

export default inchesToMmConverterConfig;
