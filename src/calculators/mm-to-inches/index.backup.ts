import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// MM TO INCHES CONVERTER - V4 (EN ONLY)
// ============================================================================

export const mmToInchesConverterConfig: CalculatorConfigV4 = {
  id: "mm-to-inches",
  version: "4.0",
  category: "conversion",
  icon: "📏",

  presets: [
    { id: "bolt10mm", icon: "🔩", values: { amount: 10 } },
    { id: "screen6mm", icon: "📱", values: { amount: 6.1 } },
    { id: "pipe25mm", icon: "🔧", values: { amount: 25.4 } },
  ],

  t: {
    en: {
      name: "MM to Inches Converter",
      slug: "mm-to-inches",
      subtitle: "Convert millimeters to inches instantly — essential for engineering, manufacturing, and precision work.",
      breadcrumb: "MM to Inches",

      seo: {
        title: "MM to Inches Converter - Free Millimeter to Inch Tool",
        description: "Convert millimeters to inches instantly. Essential for engineering, manufacturing, 3D printing, and precision measurements. Includes fraction chart and common sizes.",
        shortDescription: "Convert millimeters to inches instantly.",
        keywords: ["mm to inches", "millimeters to inches", "mm to in converter", "convert mm to inches", "mm to inches chart", "free mm converter", "mm to fraction inches"],
      },

      calculator: { yourInformation: "MM to Inches" },
      ui: { yourInformation: "MM to Inches", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Measurement", helpText: "Enter value and select unit" },
      },

      results: {
        inches: { label: "Inches (decimal)" },
        fraction: { label: "Inches (fraction)" },
        centimeters: { label: "Centimeters" },
        mils: { label: "Mils (thou)" },
      },

      presets: {
        bolt10mm: { label: "10 mm", description: "Common bolt/screw size" },
        screen6mm: { label: "6.1 mm", description: "Smartphone thickness" },
        pipe25mm: { label: "25.4 mm", description: "Exactly 1 inch" },
      },

      values: { "in": "in", "cm": "cm", "mm": "mm", "mil": "mil" },
      formats: { summary: "{mm} mm = {inches} inches" },

      infoCards: {
        results: {
          title: "📏 Conversion Results",
          items: [
            { label: "Inches (decimal)", valueKey: "inches" },
            { label: "Inches (fraction)", valueKey: "fraction" },
            { label: "Centimeters", valueKey: "centimeters" },
            { label: "Mils (thousandths)", valueKey: "mils" },
          ],
        },
        quickRef: {
          title: "📊 Common Sizes",
          items: [
            { label: "1 mm", valueKey: "ref1" },
            { label: "5 mm", valueKey: "ref5" },
            { label: "10 mm", valueKey: "ref10" },
            { label: "25.4 mm (1 in)", valueKey: "ref25" },
          ],
        },
        tips: {
          title: "💡 Precision Tips",
          items: [
            "1 inch = exactly 25.4 mm — divide mm by 25.4 to get inches.",
            "Quick estimate: divide mm by 25 for a rough inch value.",
            "Common wrench sizes: 10mm ≈ 3/8\", 13mm ≈ 1/2\", 19mm ≈ 3/4\".",
            "1 mil (thou) = 0.001 inches = 0.0254 mm — used in manufacturing.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert MM to Inches",
          content: "To convert millimeters to inches, divide by 25.4. One inch equals exactly 25.4 millimeters by international definition (since 1959). So 1 mm = 0.03937 inches, or approximately 1/25 of an inch. This conversion is essential in engineering, manufacturing, 3D printing, CNC machining, and any field where metric and imperial specifications intersect. Many bolts, screws, and hardware come in both metric (mm) and imperial (inches) sizes.",
        },
        howItWorks: {
          title: "The MM to Inches Formula",
          content: "The formula is: inches = millimeters ÷ 25.4. For fractional inches (common in US construction and hardware), find the nearest fraction: divide the decimal inches by the fraction increment (1/16, 1/32, or 1/64) and round. For example, 10 mm = 0.3937\" ≈ 25/64\" (0.3906\") or approximately 3/8\" (0.375\"). The 'mil' or 'thou' (thousandth of an inch) is useful for thin materials: 1 mm = 39.37 mils.",
        },
        considerations: {
          title: "Common MM to Inches Conversions",
          items: [
            { text: "1 mm = 0.03937 in = ~1/25\" — about the thickness of a credit card", type: "info" },
            { text: "3.175 mm = 1/8 inch exactly", type: "info" },
            { text: "6.35 mm = 1/4 inch exactly", type: "info" },
            { text: "12.7 mm = 1/2 inch exactly", type: "info" },
            { text: "19.05 mm = 3/4 inch exactly", type: "info" },
            { text: "25.4 mm = 1 inch exactly — the key reference value", type: "info" },
          ],
        },
        wrenchSizes: {
          title: "Wrench & Socket Size Equivalents",
          items: [
            { text: "8 mm ≈ 5/16\" (0.3125\") — small bolt", type: "info" },
            { text: "10 mm ≈ 3/8\" (0.375\") — very common automotive", type: "info" },
            { text: "13 mm ≈ 1/2\" (0.5\") — standard bolt size", type: "info" },
            { text: "17 mm ≈ 11/16\" (0.6875\") — lug nuts, larger bolts", type: "info" },
            { text: "19 mm ≈ 3/4\" (0.75\") — common lug nut size", type: "info" },
            { text: "22 mm ≈ 7/8\" (0.875\") — large industrial bolts", type: "info" },
          ],
        },
        examples: {
          title: "MM to Inches Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Convert 10mm wrench to inches",
              steps: ["10 ÷ 25.4 = 0.3937 inches", "Nearest fraction: 0.3937 × 16 = 6.3", "Round to 6/16 = 3/8\" (0.375\")", "Difference: 0.3937 - 0.375 = 0.019\"", "3/8\" wrench fits ~10mm bolts"],
              result: "10 mm = 0.394\" ≈ 3/8\" (close but not exact)",
            },
            {
              title: "3D print layer height: 0.2mm",
              steps: ["0.2 ÷ 25.4 = 0.00787 inches", "In mils: 0.2 × 39.37 = 7.87 mils", "This is ~8 thou (thousandths)", "Common range: 0.1-0.3 mm (4-12 thou)"],
              result: "0.2 mm = 0.008\" = 7.87 mils",
            },
          ],
        },
      },

      faqs: [
        { question: "How many inches is 1 mm?", answer: "1 millimeter equals 0.03937 inches, or approximately 1/25 of an inch. To convert mm to inches, divide by 25.4. To convert inches to mm, multiply by 25.4." },
        { question: "How do I convert mm to fractional inches?", answer: "Divide mm by 25.4 to get decimal inches. Then multiply by the denominator you want (16 for 16ths, 32 for 32nds, 64 for 64ths) and round. Example: 10 mm = 0.3937\" × 32 = 12.6/32 ≈ 13/32\"." },
        { question: "What is 25.4 mm in inches?", answer: "25.4 mm equals exactly 1 inch. This is the exact definition — 1 inch = 25.4 mm was established by international agreement in 1959." },
        { question: "Is a 10mm wrench the same as 3/8 inch?", answer: "Very close but not exact. 10mm = 0.3937\" while 3/8\" = 0.375\" — a difference of 0.019\" (0.47 mm). A 3/8\" wrench can usually fit a 10mm bolt, but it may be slightly loose. For precision work, use the correct metric or imperial tool." },
        { question: "What is a mil or thou?", answer: "A mil (also called thou) is 1/1000 of an inch = 0.0254 mm. It's used in manufacturing for thin materials like sheet metal, wire gauge, paint thickness, and PCB traces. 1 mm = 39.37 mils." },
        { question: "How do I measure mm without a metric ruler?", answer: "If you only have an imperial ruler: 1/16\" ≈ 1.6 mm, 1/8\" ≈ 3.2 mm, 1/4\" ≈ 6.4 mm, 1/2\" ≈ 12.7 mm, 1\" = 25.4 mm. For precise work, use a digital caliper that displays both mm and inches." },
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
      placeholder: "10",
      min: 0,
      unitType: "length_small",
      syncGroup: false,
      defaultUnit: "mm",
    },
  ],

  inputGroups: [],

  results: [
    { id: "inches", type: "primary", format: "text" },
    { id: "fraction", type: "secondary", format: "text" },
    { id: "centimeters", type: "secondary", format: "text" },
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
    { id: "wrenchSizes", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 — Specifications for Length", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-length" },
    { authors: "ISO", year: "2023", title: "ISO 80000-3 — Quantities and Units: Space and Time", source: "ISO", url: "https://www.iso.org/standard/64974.html" },
  ],

  hero: { badge: "Conversion", title: "MM to Inches" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["inches-to-mm", "cm-to-inches", "length-converter"],
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

function toFraction(decimal: number): string {
  const denominators = [2, 4, 8, 16, 32, 64];
  let bestNum = 0, bestDen = 1, bestErr = decimal;
  for (const den of denominators) {
    const num = Math.round(decimal * den);
    const err = Math.abs(decimal - num / den);
    if (err < bestErr) { bestNum = num; bestDen = den; bestErr = err; }
  }
  if (bestNum === 0) return "0";
  // Simplify
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const d = gcd(bestNum, bestDen);
  const sNum = bestNum / d;
  const sDen = bestDen / d;
  if (sDen === 1) return `${sNum}`;
  const whole = Math.floor(sNum / sDen);
  const rem = sNum % sDen;
  if (whole > 0 && rem > 0) return `${whole} ${rem}/${sDen * d / bestDen}"`;
  return `${sNum}/${sDen}`;
}

export function calculateMmToInches(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const fromUnit = fieldUnits.amount || "mm";
  const mm = convertToBase(amount, fromUnit, "length_small");

  const inches = mm / 25.4;
  const cm = mm / 10;
  const mils = inches * 1000;
  const fractionStr = toFraction(inches) + "\"";

  const ref1 = 1 / 25.4;
  const ref5 = 5 / 25.4;
  const ref10 = 10 / 25.4;
  const ref25 = 25.4 / 25.4;

  return {
    values: { inches, fraction: inches, centimeters: cm, mils },
    formatted: {
      inches: `${fmtNum(inches)} in`,
      fraction: `≈ ${fractionStr}`,
      centimeters: `${fmtNum(cm)} cm`,
      mils: `${fmtNum(mils)} mil`,
      ref1: `${fmtNum(ref1)} in`,
      ref5: `${fmtNum(ref5)} in`,
      ref10: `${fmtNum(ref10)} in`,
      ref25: `1 in (exact)`,
    },
    summary: `${fmtNum(amount)} ${fromUnit} = ${fmtNum(inches)} inches ≈ ${fractionStr}`,
    isValid: true,
  };
}

export default mmToInchesConverterConfig;
