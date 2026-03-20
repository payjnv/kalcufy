#!/usr/bin/env node

// ═══════════════════════════════════════════════════════════════════════
// 🔄 BATCH CONVERTER GENERATOR 3 — Top 6 most searched
// ═══════════════════════════════════════════════════════════════════════
// Usage:
//   node scripts/generate-converters-b3.js --dry-run
//   node scripts/generate-converters-b3.js
// ═══════════════════════════════════════════════════════════════════════

const fs = require("fs");
const path = require("path");

const DRY_RUN = process.argv.includes("--dry-run");

const CONVERTERS = [
  {
    id: "bar-to-psi",
    icon: "🔧",
    unitType: "pressure",
    defaultUnit: "bar",
    allowedUnits: ["bar", "psi", "kPa", "atm", "mmHg", "Pa", "hPa", "MPa"],
    primaryResult: "psi",
    title: "Bar to PSI Converter",
    seoTitle: "Bar to PSI Converter - Pressure Conversion Tool",
    seoDesc: "Convert bar to PSI instantly. Essential for tire pressure, HVAC, diving, and industrial applications. 1 bar = 14.504 PSI.",
    subtitle: "Convert bar to PSI, kPa, and atm for tire pressure, engineering, and industrial use.",
    keywords: ["bar to psi", "bar to pounds per square inch", "pressure converter", "tire pressure bar to psi", "bar psi conversion", "pressure unit calculator"],
    quickTip: "1 bar = 14.504 PSI | Car tires: ~2.2 bar = 32 PSI",
    presets: [
      { id: "tire", icon: "🛞", amount: 2.2, desc: "2.2 bar (32 PSI car tire)" },
      { id: "bike", icon: "🚲", amount: 6.9, desc: "6.9 bar (100 PSI bike)" },
      { id: "scuba", icon: "🤿", amount: 207, desc: "207 bar (3000 PSI scuba)" },
    ],
  },
  {
    id: "radians-to-degrees",
    icon: "📐",
    unitType: "angle",
    defaultUnit: "rad",
    allowedUnits: ["rad", "deg", "grad", "arcmin", "arcsec", "turn"],
    primaryResult: "deg",
    title: "Radians to Degrees Converter",
    seoTitle: "Radians to Degrees Converter - Angle Conversion Tool",
    seoDesc: "Convert radians to degrees instantly. Essential for trigonometry, physics, programming, and engineering. π rad = 180°.",
    subtitle: "Convert radians to degrees and gradians for math, physics, and programming.",
    keywords: ["radians to degrees", "rad to deg", "angle converter", "trigonometry converter", "pi to degrees", "radian degree calculator"],
    quickTip: "π rad = 180° | π/2 = 90° | 2π = 360° | 1 rad ≈ 57.3°",
    presets: [
      { id: "piHalf", icon: "📐", amount: 1.5708, desc: "π/2 (90°)" },
      { id: "pi", icon: "↔️", amount: 3.1416, desc: "π (180°)" },
      { id: "twoPi", icon: "🔄", amount: 6.2832, desc: "2π (360°)" },
    ],
  },
  {
    id: "horsepower-to-watts",
    icon: "🐴",
    unitType: "power",
    defaultUnit: "HP",
    allowedUnits: ["HP", "W", "kW", "MW", "BTUh", "PS"],
    primaryResult: "W",
    title: "Horsepower to Watts Converter",
    seoTitle: "Horsepower to Watts Converter - Power Conversion Tool",
    seoDesc: "Convert horsepower to watts and kilowatts instantly. 1 HP = 745.7 watts. Essential for motors, vehicles, and electrical engineering.",
    subtitle: "Convert horsepower to watts, kilowatts, and PS for motors, vehicles, and engineering.",
    keywords: ["horsepower to watts", "HP to W", "hp to kw", "power converter", "motor power conversion", "engine horsepower watts"],
    quickTip: "1 HP = 745.7 W = 0.746 kW | A 200 HP car = 149 kW",
    presets: [
      { id: "one", icon: "🐴", amount: 1, desc: "1 HP (746 W)" },
      { id: "hundred", icon: "🚗", amount: 100, desc: "100 HP (74.6 kW)" },
      { id: "threeHundred", icon: "🏎️", amount: 300, desc: "300 HP (224 kW)" },
    ],
  },
  {
    id: "cm-to-mm",
    icon: "📏",
    unitType: "length_small",
    defaultUnit: "cm",
    allowedUnits: ["cm", "mm", "in", "um", "mil"],
    primaryResult: "mm",
    title: "CM to MM Converter",
    seoTitle: "CM to MM Converter - Length Conversion Tool",
    seoDesc: "Convert centimeters to millimeters instantly. 1 cm = 10 mm. Essential for engineering, crafts, and precision measurements.",
    subtitle: "Convert centimeters to millimeters for engineering, crafts, and precision work.",
    keywords: ["cm to mm", "centimeters to millimeters", "length converter", "metric conversion", "precision measurement", "cm mm calculator"],
    quickTip: "1 cm = 10 mm | 1 inch = 25.4 mm = 2.54 cm",
    presets: [
      { id: "one", icon: "📏", amount: 1, desc: "1 cm (10 mm)" },
      { id: "five", icon: "📐", amount: 5, desc: "5 cm (50 mm)" },
      { id: "thirty", icon: "📏", amount: 30, desc: "30 cm (300 mm = 1 ft)" },
    ],
  },
  {
    id: "mm-to-cm",
    icon: "📏",
    unitType: "length_small",
    defaultUnit: "mm",
    allowedUnits: ["mm", "cm", "in", "um", "mil"],
    primaryResult: "cm",
    title: "MM to CM Converter",
    seoTitle: "MM to CM Converter - Length Conversion Tool",
    seoDesc: "Convert millimeters to centimeters instantly. 10 mm = 1 cm. Essential for engineering, manufacturing, and everyday measurements.",
    subtitle: "Convert millimeters to centimeters for engineering, manufacturing, and everyday use.",
    keywords: ["mm to cm", "millimeters to centimeters", "length converter", "metric conversion", "mm cm calculator", "precision measurement tool"],
    quickTip: "10 mm = 1 cm | 25.4 mm = 1 inch | 304.8 mm = 1 foot",
    presets: [
      { id: "ten", icon: "📏", amount: 10, desc: "10 mm (1 cm)" },
      { id: "hundred", icon: "📐", amount: 100, desc: "100 mm (10 cm)" },
      { id: "twoFiftyFour", icon: "📏", amount: 25.4, desc: "25.4 mm (1 inch)" },
    ],
  },
  {
    id: "kilowatts-to-watts",
    icon: "⚡",
    unitType: "power",
    defaultUnit: "kW",
    allowedUnits: ["kW", "W", "MW", "HP", "BTUh", "mW"],
    primaryResult: "W",
    title: "Kilowatts to Watts Converter",
    seoTitle: "Kilowatts to Watts Converter - Power Conversion Tool",
    seoDesc: "Convert kilowatts to watts instantly. 1 kW = 1,000 W. Essential for solar panels, appliances, and electricity calculations.",
    subtitle: "Convert kilowatts to watts for solar panels, appliances, and electricity calculations.",
    keywords: ["kilowatts to watts", "kW to W", "power converter", "solar panel wattage", "appliance power calculator", "electricity conversion"],
    quickTip: "1 kW = 1,000 W | A 5 kW solar system = 5,000 watts",
    presets: [
      { id: "one", icon: "💡", amount: 1, desc: "1 kW (1,000 W)" },
      { id: "five", icon: "☀️", amount: 5, desc: "5 kW (solar system)" },
      { id: "ten", icon: "⚡", amount: 10, desc: "10 kW (10,000 W)" },
    ],
  },
];

// ─── UNIT TYPE LABELS ────────────────────────────────────────────────
const UNIT_LABELS = {
  volume: { section: "Enter Volume", input: "Volume" },
  cooking_volume: { section: "Enter Amount", input: "Amount" },
  speed: { section: "Enter Speed", input: "Speed" },
  area: { section: "Enter Area", input: "Area" },
  mass: { section: "Enter Weight", input: "Weight" },
  length: { section: "Enter Length", input: "Length" },
  length_small: { section: "Enter Length", input: "Length" },
  data: { section: "Enter Data Size", input: "Data Size" },
  data_rate: { section: "Enter Speed", input: "Speed" },
  fuel_economy: { section: "Enter Fuel Economy", input: "Fuel Economy" },
  pressure: { section: "Enter Pressure", input: "Pressure" },
  power: { section: "Enter Power", input: "Power" },
  energy: { section: "Enter Energy", input: "Energy" },
  angle: { section: "Enter Angle", input: "Angle" },
  torque: { section: "Enter Torque", input: "Torque" },
  temperature: { section: "Enter Temperature", input: "Temperature" },
};

// ─── TEMPLATE ────────────────────────────────────────────────────────
function generateConverter(conv) {
  const configName = conv.id
    .split("-")
    .map((w, i) => (i === 0 ? w : w[0].toUpperCase() + w.slice(1)))
    .join("")
    .replace(/[^a-zA-Z0-9]/g, "");

  const funcName = "calculate" + conv.id
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join("")
    .replace(/[^a-zA-Z0-9]/g, "");

  const allowedStr = conv.allowedUnits.map(u => `"${u}"`).join(", ");
  const labels = UNIT_LABELS[conv.unitType] || { section: "Enter Value", input: "Value" };

  return `import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convert, UNIT_REGISTRY } from "@/engine/v4/units";

export const ${configName}Config: CalculatorConfigV4 = {
  id: "${conv.id}",
  version: "4.0",
  category: "conversion",
  icon: "${conv.icon}",

  presets: [
${conv.presets.map(p => `    { id: "${p.id}", icon: "${p.icon}", values: { amount: ${p.amount} } },`).join("\n")}
  ],

  t: {
    en: {
      name: "${conv.title}",
      slug: "${conv.id}",
      subtitle: "${conv.subtitle}",
      breadcrumb: "${conv.title.replace(" Converter", "").replace(" (DR)", "")}",

      seo: {
        title: "${conv.seoTitle}",
        description: "${conv.seoDesc}",
        shortDescription: "${conv.subtitle.substring(0, 80)}",
        keywords: [${conv.keywords.map(k => `"${k}"`).join(", ")}],
      },

      calculator: { yourInformation: "${labels.section}" },
      ui: { yourInformation: "${labels.section}", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "${labels.input}", helpText: "Enter the ${labels.input.toLowerCase()} to convert" },
      },

      results: {
        primary: { label: "Result" },
      },

      presets: {
${conv.presets.map(p => `        ${p.id}: { label: "${p.icon} ${p.desc.split(" (")[0]}", description: "${p.desc}" },`).join("\n")}
      },

      values: {},
      formats: { summary: "Conversion result" },

      infoCards: {
        results: {
          title: "All Conversions",
          items: [
            { label: "Primary Result", valueKey: "primary" },
            { label: "Secondary", valueKey: "secondary1" },
            { label: "Tertiary", valueKey: "secondary2" },
            { label: "Additional", valueKey: "secondary3" },
          ],
        },
        tips: {
          title: "Conversion Tips",
          items: [
            "${conv.quickTip}",
            "Select any unit from the dropdown to convert from that unit instead.",
            "Results update instantly as you type.",
            "Use presets for common conversion values.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "About This Conversion",
          content: "${conv.seoDesc} This converter supports all related units in the ${conv.unitType} category, letting you convert between any combination with a single input.",
        },
        howItWorks: {
          title: "How to Convert",
          content: "Enter your value and select the source unit from the dropdown. The converter instantly shows the equivalent in all other units of this type. All conversions use precise factors from international standards (NIST/BIPM).",
        },
        considerations: {
          title: "Important Notes",
          items: [
            { text: "${conv.quickTip}", type: "info" },
            { text: "Select any unit from the dropdown to change the source unit.", type: "info" },
            { text: "All conversions are bidirectional — works both ways.", type: "info" },
            { text: "Results are calculated using exact conversion factors.", type: "info" },
            { text: "For very large or small numbers, scientific notation may be used.", type: "info" },
            { text: "Bookmark this page for quick access to this converter.", type: "info" },
          ],
        },
        commonValues: {
          title: "Common Conversions",
          items: [
            { text: "Use presets above for frequently used amounts.", type: "info" },
            { text: "All results update in real-time as you type.", type: "info" },
            { text: "Works on mobile — use it anywhere.", type: "info" },
            { text: "Share results using the Share button below.", type: "info" },
            { text: "Save results for later with the Save button.", type: "info" },
            { text: "Supports all units in the ${conv.unitType} group.", type: "info" },
          ],
        },
        examples: {
          title: "Conversion Examples",
          description: "Common scenarios",
          examples: [
            {
              title: "Basic Conversion",
              steps: ["Enter value in source unit", "Read result in target unit", "Use dropdown to change source unit"],
              result: "Instant conversion result",
            },
            {
              title: "Reverse Conversion",
              steps: ["Change the dropdown to the target unit", "Enter your value", "Read the result in the original unit"],
              result: "Works both ways — just change the dropdown",
            },
          ],
        },
      },

      faqs: [
        { question: "How accurate are these conversions?", answer: "All conversions use exact factors from NIST and BIPM international standards. Results are accurate to at least 6 significant digits." },
        { question: "Can I convert in the reverse direction?", answer: "Yes! Simply change the unit in the dropdown to convert from any unit to all others. The converter is fully bidirectional." },
        { question: "What units are supported?", answer: "This converter supports all units in the ${conv.unitType} category: ${conv.allowedUnits.join(", ")}. Select any from the dropdown." },
        { question: "Does this work on mobile?", answer: "Yes, this converter is fully responsive and works on any device — phone, tablet, or desktop." },
        { question: "Can I share my conversion result?", answer: "Yes! Use the Share Results button to generate a link with your exact conversion that you can send to anyone." },
        { question: "Is this converter free?", answer: "Yes, 100% free with no registration required. Use it as many times as you need." },
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
      defaultValue: ${conv.presets[0].amount},
      placeholder: "${conv.presets[0].amount}",
      min: 0,
      step: 1,
      unitType: "${conv.unitType}",
      syncGroup: false,
      defaultUnit: "${conv.defaultUnit}",
      allowedUnits: [${allowedStr}],
    },
  ],

  inputGroups: [],

  results: [
    { id: "primary", type: "primary", format: "number" },
  ],

  infoCards: [
    { id: "results", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "commonValues", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "NIST", year: "2024", title: "Unit Conversion Factors", source: "National Institute of Standards and Technology", url: "https://www.nist.gov/pml/owm/metric-si/unit-conversion" },
    { authors: "BIPM", year: "2023", title: "The International System of Units (SI)", source: "Bureau International des Poids et Mesures", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Converter" },
  sidebar: {},
  features: {},
  relatedCalculators: [],
  ads: {},
};

// ============================================================================
// CALCULATE
// ============================================================================

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) < 0.001) return val.toExponential(3);
  if (Math.abs(val) >= 1e9) return val.toExponential(4);
  if (Math.abs(val) >= 1000) return val.toLocaleString("en-US", { maximumFractionDigits: 4 });
  return val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 6 });
}

export function ${funcName}(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number;
  const fromUnit = fieldUnits.amount || "${conv.defaultUnit}";

  if (amount === undefined || amount === null || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const unitGroup = UNIT_REGISTRY["${conv.unitType}"];
  const units = unitGroup?.units || [];
  const results: Record<string, number> = {};
  const formatted: Record<string, string> = {};

  for (const unit of units) {
    try {
      const converted = convert(amount, fromUnit, unit.id, "${conv.unitType}");
      results[unit.id] = converted;
      formatted[unit.id] = \`\${fmtNum(converted)} \${unit.symbol}\`;
    } catch {
      // Skip units that can't convert
    }
  }

  const allUnits = [${allowedStr}];
  const otherUnits = allUnits.filter(u => u !== fromUnit);

  formatted.primary = formatted[otherUnits[0]] || formatted[allUnits[1]] || "—";
  formatted.secondary1 = formatted[otherUnits[1]] || "—";
  formatted.secondary2 = formatted[otherUnits[2]] || "—";
  formatted.secondary3 = formatted[otherUnits[3]] || "—";

  const fromSymbol = units.find(u => u.id === fromUnit)?.symbol || fromUnit;
  const toSymbol = units.find(u => u.id === otherUnits[0])?.symbol || otherUnits[0];
  const primaryVal = results[otherUnits[0]] || 0;

  return {
    values: { primary: primaryVal, ...results },
    formatted,
    summary: \`\${fmtNum(amount)} \${fromSymbol} = \${fmtNum(primaryVal)} \${toSymbol}\`,
    isValid: true,
  };
}

export default ${configName}Config;
`;
}

// ─── MAIN ────────────────────────────────────────────────────────────
function main() {
  const baseDir = path.join(process.cwd(), "src", "calculators");
  let created = 0;
  let skipped = 0;

  console.log(`\n🔄 Generating ${CONVERTERS.length} converters (batch 3 — top 6)...\n`);

  for (const conv of CONVERTERS) {
    const dir = path.join(baseDir, conv.id);
    const file = path.join(dir, "index.ts");

    if (fs.existsSync(file)) {
      console.log(`  ⏭️  ${conv.id} — already exists, skipping`);
      skipped++;
      continue;
    }

    const content = generateConverter(conv);

    if (DRY_RUN) {
      console.log(`  🔍 ${conv.id} — would create (${content.length} chars)`);
    } else {
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(file, content, "utf-8");
      console.log(`  ✅ ${conv.id} — created`);
    }
    created++;
  }

  console.log(`\n📊 Done! Created: ${created} | Skipped: ${skipped} | Total: ${CONVERTERS.length}`);
}

main();
