#!/usr/bin/env node

// ═══════════════════════════════════════════════════════════════════════
// 🔄 BATCH CONVERTER GENERATOR 2 — Kalcufy V4
// ═══════════════════════════════════════════════════════════════════════
// 19 new converters: Cocina, Peso, Tecnología, Energía+Temperatura
// Only 1 infoCard (results) + 1 tips — NO redundant reference card
//
// Usage:
//   node scripts/generate-converters-b2.js --dry-run
//   node scripts/generate-converters-b2.js
// ═══════════════════════════════════════════════════════════════════════

const fs = require("fs");
const path = require("path");

const DRY_RUN = process.argv.includes("--dry-run");

const CONVERTERS = [
  // ═══ COCINA (6) ═══════════════════════════════════════════════════════
  {
    id: "ml-to-teaspoons",
    icon: "🫖",
    unitType: "cooking_volume",
    defaultUnit: "mL",
    allowedUnits: ["mL", "tsp", "tbsp", "cups", "fl_oz", "L"],
    primaryResult: "tsp",
    title: "mL to Teaspoons Converter",
    seoTitle: "mL to Teaspoons Converter - Kitchen Measurement Tool",
    seoDesc: "Convert milliliters to teaspoons instantly for cooking, baking, and medicine dosing. Includes tablespoons and cups.",
    subtitle: "Convert milliliters to teaspoons for precise cooking, baking, and medicine measurements.",
    keywords: ["ml to teaspoons", "milliliters to tsp", "cooking converter", "baking measurements", "medicine dosing ml", "kitchen measurement converter"],
    quickTip: "Quick estimate: 5 mL = 1 teaspoon (US standard)",
    presets: [
      { id: "five", icon: "🫖", amount: 5, desc: "5 mL (1 tsp)" },
      { id: "fifteen", icon: "🥄", amount: 15, desc: "15 mL (3 tsp = 1 tbsp)" },
      { id: "sixty", icon: "🥛", amount: 60, desc: "60 mL (12 tsp = ¼ cup)" },
    ],
  },
  {
    id: "cups-to-liters",
    icon: "🥛",
    unitType: "cooking_volume",
    defaultUnit: "cups",
    allowedUnits: ["cups", "L", "mL", "fl_oz", "tbsp", "tsp"],
    primaryResult: "L",
    title: "Cups to Liters Converter",
    seoTitle: "Cups to Liters Converter - Volume Conversion Tool",
    seoDesc: "Convert cups to liters instantly for cooking and baking. Essential for international recipe conversions.",
    subtitle: "Convert US cups to liters and milliliters for international cooking and baking.",
    keywords: ["cups to liters", "cups to L", "cooking conversion", "baking cups to liters", "US cups metric", "recipe converter"],
    quickTip: "Quick estimate: 4 cups ≈ 1 liter (exactly 0.946 L)",
    presets: [
      { id: "one", icon: "🥛", amount: 1, desc: "1 cup (0.237 L)" },
      { id: "two", icon: "🫗", amount: 2, desc: "2 cups (0.473 L)" },
      { id: "four", icon: "🧊", amount: 4, desc: "4 cups ≈ 1 liter" },
    ],
  },
  {
    id: "liters-to-cups",
    icon: "☕",
    unitType: "cooking_volume",
    defaultUnit: "L",
    allowedUnits: ["L", "cups", "mL", "fl_oz", "tbsp", "tsp"],
    primaryResult: "cups",
    title: "Liters to Cups Converter",
    seoTitle: "Liters to Cups Converter - Volume Conversion Tool",
    seoDesc: "Convert liters to cups instantly for cooking and baking. Essential for converting metric recipes to US measurements.",
    subtitle: "Convert liters to US cups for cooking, baking, and beverage measurements.",
    keywords: ["liters to cups", "L to cups", "metric to cups", "cooking conversion", "baking liters to cups", "recipe converter"],
    quickTip: "Quick estimate: 1 liter ≈ 4.23 US cups",
    presets: [
      { id: "quarter", icon: "☕", amount: 0.25, desc: "250 mL (1.06 cups)" },
      { id: "half", icon: "🥛", amount: 0.5, desc: "500 mL (2.11 cups)" },
      { id: "one", icon: "🫗", amount: 1, desc: "1 L (4.23 cups)" },
    ],
  },
  {
    id: "tablespoons-to-cups",
    icon: "🥄",
    unitType: "cooking_volume",
    defaultUnit: "tbsp",
    allowedUnits: ["tbsp", "cups", "tsp", "mL", "fl_oz", "L"],
    primaryResult: "cups",
    title: "Tablespoons to Cups Converter",
    seoTitle: "Tablespoons to Cups Converter - Kitchen Measurement",
    seoDesc: "Convert tablespoons to cups for cooking and baking. 16 tablespoons = 1 cup. Includes teaspoons and milliliters.",
    subtitle: "Convert tablespoons to cups, teaspoons, and milliliters for kitchen measurements.",
    keywords: ["tablespoons to cups", "tbsp to cups", "how many tablespoons in a cup", "cooking measurement", "baking conversion", "kitchen converter"],
    quickTip: "16 tablespoons = 1 cup | 1 tablespoon = 3 teaspoons",
    presets: [
      { id: "four", icon: "🥄", amount: 4, desc: "4 tbsp (¼ cup)" },
      { id: "eight", icon: "🥛", amount: 8, desc: "8 tbsp (½ cup)" },
      { id: "sixteen", icon: "☕", amount: 16, desc: "16 tbsp (1 cup)" },
    ],
  },
  {
    id: "oz-to-cups",
    icon: "🥤",
    unitType: "cooking_volume",
    defaultUnit: "fl_oz",
    allowedUnits: ["fl_oz", "cups", "mL", "L", "tbsp", "tsp"],
    primaryResult: "cups",
    title: "Fluid Ounces to Cups Converter",
    seoTitle: "Oz to Cups Converter - Fluid Ounces to Cups",
    seoDesc: "Convert fluid ounces to cups for cooking and beverages. 8 fl oz = 1 cup. Includes milliliters and tablespoons.",
    subtitle: "Convert fluid ounces to cups for cooking, beverages, and recipe measurements.",
    keywords: ["oz to cups", "fluid ounces to cups", "how many oz in a cup", "cooking conversion", "beverage measurement", "oz cups converter"],
    quickTip: "8 fluid ounces = 1 cup | 1 fl oz ≈ 29.6 mL",
    presets: [
      { id: "four", icon: "🥤", amount: 4, desc: "4 fl oz (½ cup)" },
      { id: "eight", icon: "☕", amount: 8, desc: "8 fl oz (1 cup)" },
      { id: "sixteen", icon: "🫗", amount: 16, desc: "16 fl oz (2 cups)" },
    ],
  },
  {
    id: "cups-to-oz",
    icon: "☕",
    unitType: "cooking_volume",
    defaultUnit: "cups",
    allowedUnits: ["cups", "fl_oz", "mL", "L", "tbsp", "tsp"],
    primaryResult: "fl_oz",
    title: "Cups to Fluid Ounces Converter",
    seoTitle: "Cups to Oz Converter - Cups to Fluid Ounces",
    seoDesc: "Convert cups to fluid ounces instantly. 1 cup = 8 fl oz. Essential for cooking, baking, and beverage recipes.",
    subtitle: "Convert cups to fluid ounces for cooking, baking, and beverage measurements.",
    keywords: ["cups to oz", "cups to fluid ounces", "how many oz in a cup", "cooking converter", "baking measurement", "cups ounces conversion"],
    quickTip: "1 cup = 8 fluid ounces = 16 tablespoons = 236.6 mL",
    presets: [
      { id: "half", icon: "🥛", amount: 0.5, desc: "½ cup (4 fl oz)" },
      { id: "one", icon: "☕", amount: 1, desc: "1 cup (8 fl oz)" },
      { id: "three", icon: "🫗", amount: 3, desc: "3 cups (24 fl oz)" },
    ],
  },
  // ═══ PESO (5) ═════════════════════════════════════════════════════════
  {
    id: "ounces-to-pounds",
    icon: "⚖️",
    unitType: "mass",
    defaultUnit: "oz",
    allowedUnits: ["oz", "lbs", "g", "kg"],
    primaryResult: "lbs",
    title: "Ounces to Pounds Converter",
    seoTitle: "Ounces to Pounds Converter - Weight Conversion Tool",
    seoDesc: "Convert ounces to pounds instantly. Essential for cooking, shipping, baby weight, and everyday measurements.",
    subtitle: "Convert ounces to pounds for cooking, shipping, baby weight, and everyday use.",
    keywords: ["ounces to pounds", "oz to lbs", "weight converter", "how many ounces in a pound", "cooking weight", "shipping weight conversion"],
    quickTip: "16 ounces = 1 pound | 1 oz = 0.0625 lbs",
    presets: [
      { id: "eight", icon: "🍼", amount: 8, desc: "8 oz (0.5 lbs)" },
      { id: "sixteen", icon: "⚖️", amount: 16, desc: "16 oz (1 lb)" },
      { id: "thirtytwo", icon: "📦", amount: 32, desc: "32 oz (2 lbs)" },
    ],
  },
  {
    id: "pounds-to-ounces",
    icon: "⚖️",
    unitType: "mass",
    defaultUnit: "lbs",
    allowedUnits: ["lbs", "oz", "g", "kg"],
    primaryResult: "oz",
    title: "Pounds to Ounces Converter",
    seoTitle: "Pounds to Ounces Converter - Weight Conversion Tool",
    seoDesc: "Convert pounds to ounces instantly. 1 pound = 16 ounces. Perfect for cooking, shipping, and everyday weight measurements.",
    subtitle: "Convert pounds to ounces for cooking, shipping, and everyday weight measurements.",
    keywords: ["pounds to ounces", "lbs to oz", "weight converter", "how many ounces in a pound", "cooking conversion", "shipping weight"],
    quickTip: "1 pound = 16 ounces = 453.6 grams",
    presets: [
      { id: "half", icon: "🍖", amount: 0.5, desc: "0.5 lbs (8 oz)" },
      { id: "one", icon: "⚖️", amount: 1, desc: "1 lb (16 oz)" },
      { id: "five", icon: "📦", amount: 5, desc: "5 lbs (80 oz)" },
    ],
  },
  {
    id: "kg-to-grams",
    icon: "⚖️",
    unitType: "mass",
    defaultUnit: "kg",
    allowedUnits: ["kg", "g", "mg", "lbs", "oz"],
    primaryResult: "g",
    title: "Kilograms to Grams Converter",
    seoTitle: "KG to Grams Converter - Weight Conversion Tool",
    seoDesc: "Convert kilograms to grams instantly. 1 kg = 1000 g. Essential for cooking, science, and everyday measurements.",
    subtitle: "Convert kilograms to grams for cooking, science, and everyday weight measurements.",
    keywords: ["kg to grams", "kilograms to grams", "weight converter", "kg g conversion", "metric weight", "cooking weight converter"],
    quickTip: "1 kilogram = 1,000 grams = 2.205 pounds",
    presets: [
      { id: "quarter", icon: "🧈", amount: 0.25, desc: "250 g" },
      { id: "one", icon: "⚖️", amount: 1, desc: "1 kg (1,000 g)" },
      { id: "five", icon: "📦", amount: 5, desc: "5 kg (5,000 g)" },
    ],
  },
  {
    id: "grams-to-kg",
    icon: "⚖️",
    unitType: "mass",
    defaultUnit: "g",
    allowedUnits: ["g", "kg", "mg", "lbs", "oz"],
    primaryResult: "kg",
    title: "Grams to Kilograms Converter",
    seoTitle: "Grams to KG Converter - Weight Conversion Tool",
    seoDesc: "Convert grams to kilograms instantly. 1000 g = 1 kg. Perfect for cooking, science, and international measurements.",
    subtitle: "Convert grams to kilograms for cooking, science, and international measurements.",
    keywords: ["grams to kg", "grams to kilograms", "weight converter", "g to kg", "metric weight conversion", "cooking weight"],
    quickTip: "1,000 grams = 1 kilogram | 500 g = 0.5 kg",
    presets: [
      { id: "hundred", icon: "🧈", amount: 100, desc: "100 g (0.1 kg)" },
      { id: "fiveHundred", icon: "⚖️", amount: 500, desc: "500 g (0.5 kg)" },
      { id: "thousand", icon: "📦", amount: 1000, desc: "1,000 g (1 kg)" },
    ],
  },
  {
    id: "carats-to-grams",
    icon: "💎",
    unitType: "mass",
    defaultUnit: "carat",
    allowedUnits: ["carat", "g", "mg", "oz", "kg"],
    primaryResult: "g",
    title: "Carats to Grams Converter",
    seoTitle: "Carats to Grams Converter - Gemstone Weight Tool",
    seoDesc: "Convert carats to grams for diamonds, gemstones, and jewelry. 1 carat = 0.2 grams. Essential for jewelers and buyers.",
    subtitle: "Convert carats to grams for diamonds, gemstones, and jewelry measurements.",
    keywords: ["carats to grams", "ct to g", "diamond weight converter", "gemstone weight", "jewelry carat converter", "carat gram conversion"],
    quickTip: "1 carat = 0.2 grams = 200 milligrams",
    presets: [
      { id: "one", icon: "💎", amount: 1, desc: "1 ct (0.2 g)" },
      { id: "two", icon: "💍", amount: 2, desc: "2 ct (0.4 g)" },
      { id: "five", icon: "👑", amount: 5, desc: "5 ct (1.0 g)" },
    ],
  },
  // ═══ TECNOLOGÍA (3) ═══════════════════════════════════════════════════
  {
    id: "mbps-to-mbytes",
    icon: "📶",
    unitType: "data_rate",
    defaultUnit: "mbps",
    allowedUnits: ["mbps", "mb_s", "gbps", "gb_s", "kbps", "kb_s", "bps"],
    primaryResult: "mb_s",
    title: "Mbps to MB/s Converter",
    seoTitle: "Mbps to MB/s Converter - Internet Speed Tool",
    seoDesc: "Convert megabits per second to megabytes per second. Understand your real download speed: 100 Mbps = 12.5 MB/s.",
    subtitle: "Convert Mbps to MB/s to understand your real internet download and upload speeds.",
    keywords: ["mbps to mb/s", "megabits to megabytes", "internet speed converter", "download speed calculator", "bandwidth converter", "mbps mbytes conversion"],
    quickTip: "Divide Mbps by 8 to get MB/s. Example: 100 Mbps = 12.5 MB/s",
    presets: [
      { id: "fifty", icon: "📶", amount: 50, desc: "50 Mbps (6.25 MB/s)" },
      { id: "hundred", icon: "🌐", amount: 100, desc: "100 Mbps (12.5 MB/s)" },
      { id: "gig", icon: "⚡", amount: 1000, desc: "1 Gbps (125 MB/s)" },
    ],
  },
  {
    id: "kb-to-mb",
    icon: "💾",
    unitType: "data",
    defaultUnit: "kb",
    allowedUnits: ["kb", "mb", "gb", "tb", "byte", "pb"],
    primaryResult: "mb",
    title: "KB to MB Converter",
    seoTitle: "KB to MB Converter - Data Size Conversion Tool",
    seoDesc: "Convert kilobytes to megabytes instantly. 1 MB = 1,000 KB. Essential for file sizes, storage, and data management.",
    subtitle: "Convert kilobytes to megabytes for file sizes, storage, and data management.",
    keywords: ["kb to mb", "kilobytes to megabytes", "file size converter", "data size conversion", "storage converter", "KB MB calculator"],
    quickTip: "1 MB = 1,000 KB (decimal) or 1,024 KB (binary/KiB)",
    presets: [
      { id: "fiveHundred", icon: "📄", amount: 500, desc: "500 KB (0.5 MB)" },
      { id: "thousand", icon: "📁", amount: 1000, desc: "1,000 KB (1 MB)" },
      { id: "fiveThousand", icon: "📸", amount: 5000, desc: "5,000 KB (5 MB)" },
    ],
  },
  {
    id: "mb-to-gb",
    icon: "💾",
    unitType: "data",
    defaultUnit: "mb",
    allowedUnits: ["mb", "gb", "tb", "kb", "byte", "pb"],
    primaryResult: "gb",
    title: "MB to GB Converter",
    seoTitle: "MB to GB Converter - Data Size Conversion Tool",
    seoDesc: "Convert megabytes to gigabytes instantly. 1 GB = 1,000 MB. Essential for phone storage, file sizes, and data plans.",
    subtitle: "Convert megabytes to gigabytes for phone storage, file sizes, and data plans.",
    keywords: ["mb to gb", "megabytes to gigabytes", "storage converter", "phone storage calculator", "data plan converter", "MB GB conversion"],
    quickTip: "1 GB = 1,000 MB | A typical phone photo is 3-5 MB",
    presets: [
      { id: "fiveHundred", icon: "📱", amount: 500, desc: "500 MB (0.5 GB)" },
      { id: "thousand", icon: "💻", amount: 1000, desc: "1,000 MB (1 GB)" },
      { id: "tenThousand", icon: "🖥️", amount: 10000, desc: "10,000 MB (10 GB)" },
    ],
  },
  // ═══ ENERGÍA (4) ═════════════════════════════════════════════════════
  {
    id: "kwh-to-btu",
    icon: "⚡",
    unitType: "energy",
    defaultUnit: "kWh",
    allowedUnits: ["kWh", "BTU", "J", "kJ", "MJ", "Wh", "kcal"],
    primaryResult: "BTU",
    title: "kWh to BTU Converter",
    seoTitle: "kWh to BTU Converter - Energy Conversion Tool",
    seoDesc: "Convert kilowatt-hours to BTU for HVAC, electricity, and energy calculations. 1 kWh = 3,412 BTU.",
    subtitle: "Convert kilowatt-hours to BTU for HVAC, electricity bills, and energy comparisons.",
    keywords: ["kwh to btu", "kilowatt hours to btu", "energy converter", "hvac calculator", "electricity conversion", "heating energy calculator"],
    quickTip: "1 kWh = 3,412 BTU | Average US home uses ~30 kWh/day",
    presets: [
      { id: "one", icon: "💡", amount: 1, desc: "1 kWh (3,412 BTU)" },
      { id: "ten", icon: "🏠", amount: 10, desc: "10 kWh (34,121 BTU)" },
      { id: "thirty", icon: "⚡", amount: 30, desc: "30 kWh (daily avg)" },
    ],
  },
  {
    id: "btu-to-kwh",
    icon: "🔥",
    unitType: "energy",
    defaultUnit: "BTU",
    allowedUnits: ["BTU", "kWh", "J", "kJ", "MJ", "Wh", "kcal"],
    primaryResult: "kWh",
    title: "BTU to kWh Converter",
    seoTitle: "BTU to kWh Converter - Energy Conversion Tool",
    seoDesc: "Convert BTU to kilowatt-hours for HVAC sizing, energy costs, and heating calculations. 3,412 BTU = 1 kWh.",
    subtitle: "Convert BTU to kilowatt-hours for HVAC, energy costs, and heating calculations.",
    keywords: ["btu to kwh", "btu to kilowatt hours", "energy converter", "hvac sizing", "heating calculator", "energy cost conversion"],
    quickTip: "3,412 BTU = 1 kWh | Divide BTU by 3,412 to get kWh",
    presets: [
      { id: "tenThousand", icon: "🔥", amount: 10000, desc: "10,000 BTU (2.93 kWh)" },
      { id: "fifty", icon: "❄️", amount: 50000, desc: "50,000 BTU (14.65 kWh)" },
      { id: "hundred", icon: "🏠", amount: 100000, desc: "100,000 BTU (furnace)" },
    ],
  },
  {
    id: "joules-to-calories",
    icon: "🔬",
    unitType: "energy",
    defaultUnit: "J",
    allowedUnits: ["J", "cal", "kcal", "kJ", "BTU", "Wh", "eV"],
    primaryResult: "cal",
    title: "Joules to Calories Converter",
    seoTitle: "Joules to Calories Converter - Energy Conversion Tool",
    seoDesc: "Convert joules to calories for physics, chemistry, and nutrition. 1 calorie = 4.184 joules.",
    subtitle: "Convert joules to calories for physics, chemistry, nutrition, and energy calculations.",
    keywords: ["joules to calories", "J to cal", "energy converter", "physics converter", "chemistry energy", "nutrition joules calories"],
    quickTip: "1 calorie = 4.184 joules | 1 food Calorie (kcal) = 4,184 J",
    presets: [
      { id: "thousand", icon: "🔬", amount: 1000, desc: "1,000 J (239 cal)" },
      { id: "fourThousand", icon: "🍎", amount: 4184, desc: "4,184 J (1 kcal)" },
      { id: "million", icon: "⚡", amount: 1000000, desc: "1 MJ (239 kcal)" },
    ],
  },
  {
    id: "watts-to-kilowatts",
    icon: "⚡",
    unitType: "power",
    defaultUnit: "W",
    allowedUnits: ["W", "kW", "MW", "HP", "BTUh", "mW"],
    primaryResult: "kW",
    title: "Watts to Kilowatts Converter",
    seoTitle: "Watts to Kilowatts Converter - Power Conversion Tool",
    seoDesc: "Convert watts to kilowatts instantly. 1 kW = 1,000 W. Essential for appliances, solar panels, and electricity.",
    subtitle: "Convert watts to kilowatts for appliances, solar panels, and electricity calculations.",
    keywords: ["watts to kilowatts", "W to kW", "power converter", "appliance wattage", "solar panel calculator", "electricity conversion"],
    quickTip: "1 kW = 1,000 W | A typical microwave uses 1,000-1,200 W (1-1.2 kW)",
    presets: [
      { id: "hundred", icon: "💡", amount: 100, desc: "100 W (light bulb)" },
      { id: "thousand", icon: "🔌", amount: 1000, desc: "1,000 W (1 kW)" },
      { id: "fiveThousand", icon: "☀️", amount: 5000, desc: "5 kW (solar system)" },
    ],
  },
  // ═══ TEMPERATURA (1) ═════════════════════════════════════════════════
  {
    id: "kelvin-converter",
    icon: "🌡️",
    unitType: "temperature",
    defaultUnit: "K",
    allowedUnits: ["K", "C", "F", "R"],
    primaryResult: "C",
    title: "Kelvin Converter",
    seoTitle: "Kelvin Converter - Temperature Conversion Tool",
    seoDesc: "Convert Kelvin to Celsius, Fahrenheit, and Rankine. Essential for science, physics, and engineering calculations.",
    subtitle: "Convert Kelvin to Celsius, Fahrenheit, and Rankine for science and engineering.",
    keywords: ["kelvin converter", "kelvin to celsius", "kelvin to fahrenheit", "temperature converter", "K to C", "science temperature calculator"],
    quickTip: "0 K = -273.15°C = -459.67°F (absolute zero)",
    presets: [
      { id: "zero", icon: "❄️", amount: 0, desc: "0 K (absolute zero)" },
      { id: "water", icon: "💧", amount: 373.15, desc: "373.15 K (100°C boiling)" },
      { id: "room", icon: "🏠", amount: 293.15, desc: "293.15 K (20°C room temp)" },
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

  console.log(`\n🔄 Generating ${CONVERTERS.length} converters (batch 2)...\n`);

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

  if (!DRY_RUN && created > 0) {
    console.log(`\n📦 Next steps:`);
    console.log(`  1. Install all:`);
    console.log(`     for dir in ${CONVERTERS.map(c => c.id).join(" ")}; do`);
    console.log(`       node --env-file=.env.local scripts/install-calc-v4.js $dir --no-translate`);
    console.log(`     done`);
    console.log(`\n  2. Clean: rm -rf .next && npm run dev`);
    console.log(`\n  3. Translate all:`);
    console.log(`     for dir in ${CONVERTERS.map(c => c.id).join(" ")}; do`);
    console.log(`       node --env-file=.env.local scripts/translate-calc-v4.js $dir`);
    console.log(`     done`);
  }
}

main();
