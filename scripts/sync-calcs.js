#!/usr/bin/env node
/**
 * SYNC ALL 78 CALCULATORS INTO LISTING
 * 
 * 1. Add 9 missing entries to registry.ts
 * 2. Rewrite calculators-config.ts with ALL 78 from DB
 * 3. Add translation stubs to messages/*.json
 * 4. Upsert categories + ensure all 78 active in DB
 */

const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const ROOT = process.cwd();

// ═══════════════════════════════════════════════════
// METADATA FOR ALL 78 CALCULATORS
// ═══════════════════════════════════════════════════

const META = {
  // FINANCE (4)
  "401k-calculator":        { icon: "📈", cat: "finance", desc: "Plan your 401(k) retirement savings and employer match" },
  "auto-loan-calculator":   { icon: "🚗", cat: "finance", desc: "Calculate car loan payments and total cost of financing" },
  "currency-converter-calculator": { icon: "💱", cat: "finance", desc: "Convert between 30+ world currencies instantly" },
  "loan-calculator":        { icon: "💳", cat: "finance", desc: "Calculate loan payments, total interest, and payoff schedule" },

  // HEALTH (29)
  "bmi-calculator":                     { icon: "💪", cat: "health", desc: "Calculate your Body Mass Index with advanced metrics including WHO standards" },
  "bmr-calculator":                     { icon: "⚡", cat: "health", desc: "Calculate your Basal Metabolic Rate and daily calorie needs" },
  "body-fat-calculator":                { icon: "📐", cat: "health", desc: "Calculate your body fat percentage using Navy and BMI methods" },
  "caloric-deficit-calculator":         { icon: "📉", cat: "health", desc: "Calculate your daily calorie needs for weight loss" },
  "calorie-calculator":                 { icon: "🔥", cat: "health", desc: "Calculate daily calorie needs based on your goals and activity level" },
  "calories-burned-calculator":         { icon: "🔥", cat: "health", desc: "Calculate calories burned for 100+ activities and exercises" },
  "chinese-gender-predictor-calculator": { icon: "🎎", cat: "health", desc: "Predict baby gender using the ancient Chinese gender prediction chart" },
  "conception-date-calculator":         { icon: "📅", cat: "health", desc: "Estimate your conception date based on due date or last period" },
  "hcg-calculator-calculator":          { icon: "🔬", cat: "health", desc: "Track hCG hormone levels and doubling time during early pregnancy" },
  "heart-rate-zones-calculator":        { icon: "❤️", cat: "health", desc: "Calculate your training heart rate zones for optimal fitness" },
  "ideal-weight-calculator":            { icon: "⚖️", cat: "health", desc: "Calculate your ideal body weight using 5 scientific formulas" },
  "implantation-calculator":            { icon: "🌱", cat: "health", desc: "Estimate when embryo implantation may occur after ovulation" },
  "intermittent-fasting-calculator":    { icon: "⏰", cat: "health", desc: "Plan your fasting schedule and calculate optimal eating windows" },
  "keto-calculator":                    { icon: "🥑", cat: "health", desc: "Calculate your personalized keto macros for fat, protein, and carbs" },
  "lean-body-mass-calculator":          { icon: "💪", cat: "health", desc: "Calculate lean body mass using 5 formulas with FFMI" },
  "macro-calculator":                   { icon: "🥗", cat: "health", desc: "Calculate your daily protein, carbs, and fat targets" },
  "maintenance-calories-calculator":    { icon: "⚖️", cat: "health", desc: "Calculate your TDEE, BMR, and personalized calorie targets" },
  "one-rep-max-calculator":             { icon: "🏋️", cat: "health", desc: "Estimate the maximum weight you can lift for one rep" },
  "ovulation-calculator":               { icon: "🌸", cat: "health", desc: "Track your fertile window and ovulation for family planning" },
  "pregnancy-due-date-calculator":      { icon: "👶", cat: "health", desc: "Calculate your pregnancy due date and track weekly milestones" },
  "pregnancy-weight-gain-calculator":   { icon: "🤰", cat: "health", desc: "Track healthy weight gain during pregnancy by trimester" },
  "protein-calculator":                 { icon: "🥩", cat: "health", desc: "Calculate your optimal daily protein intake based on goals" },
  "rest-day-calculator":                { icon: "🛋️", cat: "health", desc: "Calculate optimal recovery time between workouts" },
  "running-pace-calculator":            { icon: "🏃", cat: "health", desc: "Calculate your pace, predict race times, get VDOT training zones" },
  "sleep-calculator":                   { icon: "😴", cat: "health", desc: "Calculate optimal bedtime and wake-up times for quality sleep" },
  "tdee-calculator":                    { icon: "📊", cat: "health", desc: "Calculate your Total Daily Energy Expenditure and calorie needs" },
  "waist-to-height-ratio-calculator":   { icon: "📏", cat: "health", desc: "Better than BMI for health risk assessment" },
  "water-intake-calculator":            { icon: "💧", cat: "health", desc: "Calculate your daily water needs based on activity and climate" },
  "weight-gain-calculator":             { icon: "📈", cat: "health", desc: "Calculate bulking calories with muscle vs fat gain projection" },
  "weight-loss-calculator":             { icon: "⚖️", cat: "health", desc: "Calculate how long to reach your goal weight" },

  // MATH (2)
  "percentage-calculator":       { icon: "%", cat: "math", desc: "Calculate percentages, increases, decreases, and conversions" },
  "quadratic-formula-calculator": { icon: "🔢", cat: "math", desc: "Solve quadratic equations step by step" },

  // EVERYDAY (4)
  "age-calculator":              { icon: "🎂", cat: "everyday", desc: "Calculate your exact age with zodiac sign, life statistics, and milestones" },
  "date-calculator":             { icon: "📅", cat: "everyday", desc: "Add days, calculate differences, and find business days between dates" },
  "random-number-generator-calculator": { icon: "🎲", cat: "everyday", desc: "Generate random numbers, roll dice, flip coins" },
  "tip-calculator":              { icon: "🧾", cat: "everyday", desc: "Calculate tips and split bills easily for any group size" },

  // TECHNOLOGY (10)
  "bandwidth-calculator":          { icon: "📶", cat: "technology", desc: "Calculate bandwidth requirements and data transfer speeds" },
  "cidr-calculator":               { icon: "🌐", cat: "technology", desc: "Calculate CIDR notation, subnet ranges, and IP allocation" },
  "digital-unit-converter-calculator": { icon: "💾", cat: "technology", desc: "Convert between bytes, KB, MB, GB, TB and data rate units" },
  "ip-subnet-calculator":          { icon: "🌐", cat: "technology", desc: "Calculate IP subnets, network ranges, and broadcast addresses" },
  "password-generator-calculator": { icon: "🔑", cat: "technology", desc: "Generate secure passwords with entropy analysis" },
  "password-strength-calculator":  { icon: "🔒", cat: "technology", desc: "Test password strength with entropy and crack time analysis" },
  "psu-calculator-calculator":     { icon: "⚡", cat: "technology", desc: "Calculate PC power supply wattage for your build" },
  "raid-calculator":               { icon: "💾", cat: "technology", desc: "Calculate RAID storage capacity, redundancy, and performance" },
  "transfer-time-calculator":      { icon: "⏱️", cat: "technology", desc: "Calculate file transfer time based on size and speed" },
  "vlsm-calculator":               { icon: "🔧", cat: "technology", desc: "Calculate Variable Length Subnet Masks for IP allocation" },

  // CONVERSION (22)
  "length-converter-calculator":  { icon: "📏", cat: "conversion", desc: "Convert between all length units instantly" },
  "cm-to-inches-calculator":      { icon: "📏", cat: "conversion", desc: "Convert centimeters to inches quickly" },
  "inches-to-cm-calculator":      { icon: "📏", cat: "conversion", desc: "Convert inches to centimeters with precision" },
  "km-to-miles-calculator":       { icon: "🛣️", cat: "conversion", desc: "Convert kilometers to miles for distance calculations" },
  "miles-to-km-calculator":       { icon: "🛣️", cat: "conversion", desc: "Convert miles to kilometers" },
  "meters-to-feet-calculator":    { icon: "📏", cat: "conversion", desc: "Convert meters to feet for construction" },
  "feet-to-meters-calculator":    { icon: "📏", cat: "conversion", desc: "Convert feet to meters with precision" },
  "mm-to-inches-calculator":      { icon: "📏", cat: "conversion", desc: "Convert millimeters to inches" },
  "inches-to-mm-calculator":      { icon: "📏", cat: "conversion", desc: "Convert inches to millimeters" },
  "cm-to-feet-calculator":        { icon: "📏", cat: "conversion", desc: "Convert centimeters to feet and inches" },
  "feet-to-cm-calculator":        { icon: "📏", cat: "conversion", desc: "Convert feet to centimeters" },
  "inches-to-feet-calculator":    { icon: "📏", cat: "conversion", desc: "Convert inches to feet and remaining inches" },
  "kg-to-lbs-calculator":         { icon: "⚖️", cat: "conversion", desc: "Convert kilograms to pounds instantly" },
  "lbs-to-kg-calculator":         { icon: "⚖️", cat: "conversion", desc: "Convert pounds to kilograms with precision" },
  "celsius-to-fahrenheit-calculator":   { icon: "🌡️", cat: "conversion", desc: "Convert Celsius to Fahrenheit" },
  "fahrenheit-to-celsius-calculator":   { icon: "🌡️", cat: "conversion", desc: "Convert Fahrenheit to Celsius" },
  "oz-to-ml-calculator":          { icon: "🥤", cat: "conversion", desc: "Convert fluid ounces to milliliters" },
  "gallons-to-liters-calculator":  { icon: "🥤", cat: "conversion", desc: "Convert gallons to liters" },
  "cups-to-ml-calculator":        { icon: "☕", cat: "conversion", desc: "Convert cups to milliliters for recipes" },
  "square-feet-to-square-meters-calculator": { icon: "📐", cat: "conversion", desc: "Convert square feet to square meters" },
  "mph-to-kmh-calculator":        { icon: "🏎️", cat: "conversion", desc: "Convert miles per hour to kilometers per hour" },
  "cuadras-to-hectareas-converter-calculator":       { icon: "🌾", cat: "conversion", desc: "Convert cuadras to hectáreas - Latin American land" },
  "fanegadas-to-hectareas-converter-calculator":     { icon: "🌾", cat: "conversion", desc: "Convert fanegadas to hectáreas - Colombian land" },
  "manzanas-to-hectareas-converter-calculator":      { icon: "🌾", cat: "conversion", desc: "Convert manzanas to hectáreas - Central America" },
  "tareas-to-metros-cuadrados-converter-calculator": { icon: "🌾", cat: "conversion", desc: "Convert tareas to metros cuadrados - Dominican Republic" },
  "varas-to-metros-converter-calculator":            { icon: "🌾", cat: "conversion", desc: "Convert varas to metros - Latin America" },

  // HOME & CONSTRUCTION (2)
  "paint-calculator-calculator":     { icon: "🎨", cat: "home", desc: "Calculate how much paint you need for walls and rooms" },
  "concrete-calculator-calculator":  { icon: "🏗️", cat: "home", desc: "Calculate concrete volume for slabs, footings, and columns" },
};

// ═══════════════════════════════════════════════════
// STEP 1: Add 9 missing entries to registry.ts
// ═══════════════════════════════════════════════════

console.log("\n🔄 SYNCING ALL CALCULATORS...\n");
console.log("--- STEP 1: Registry ---");

const registryPath = path.join(ROOT, "src/engine/v4/slugs/registry.ts");
let regContent = fs.readFileSync(registryPath, "utf-8");

const MISSING = [
  { id: "date-calculator", cat: "everyday", slugs: `en: "date-calculator", es: "calculadora-fechas", pt: "calculadora-datas", fr: "calculateur-dates", de: "datum-rechner"` },
  { id: "loan-calculator", cat: "finance", slugs: `en: "loan-calculator", es: "calculadora-prestamos", pt: "calculadora-emprestimos", fr: "calculateur-prets", de: "kredit-rechner"` },
  { id: "percentage-calculator", cat: "math", slugs: `en: "percentage-calculator", es: "calculadora-porcentajes", pt: "calculadora-porcentagem", fr: "calculateur-pourcentage", de: "prozent-rechner"` },
  { id: "random-number-generator", cat: "everyday", slugs: `en: "random-number-generator-calculator", es: "generador-numeros-aleatorios", pt: "gerador-numeros-aleatorios", fr: "generateur-nombres-aleatoires", de: "zufallszahlen-generator"` },
  { id: "cuadras-to-hectareas-converter", cat: "conversion", slugs: `en: "cuadras-to-hectareas-converter-calculator", es: "calculadora-cuadras-a-hectareas", pt: "calculadora-cuadras-para-hectares", fr: "calculateur-cuadras-vers-hectares", de: "cuadras-zu-hektar-rechner"` },
  { id: "fanegadas-to-hectareas-converter", cat: "conversion", slugs: `en: "fanegadas-to-hectareas-converter-calculator", es: "calculadora-fanegadas-a-hectareas", pt: "calculadora-fanegadas-para-hectares", fr: "calculateur-fanegadas-vers-hectares", de: "fanegadas-zu-hektar-rechner"` },
  { id: "manzanas-to-hectareas-converter", cat: "conversion", slugs: `en: "manzanas-to-hectareas-converter-calculator", es: "calculadora-manzanas-a-hectareas", pt: "calculadora-manzanas-para-hectares", fr: "calculateur-manzanas-vers-hectares", de: "manzanas-zu-hektar-rechner"` },
  { id: "tareas-to-metros-cuadrados-converter", cat: "conversion", slugs: `en: "tareas-to-metros-cuadrados-converter-calculator", es: "calculadora-tareas-a-metros-cuadrados", pt: "calculadora-tarefas-para-metros-quadrados", fr: "calculateur-tareas-vers-metres-carres", de: "tareas-zu-quadratmeter-rechner"` },
  { id: "varas-to-metros-converter", cat: "conversion", slugs: `en: "varas-to-metros-converter-calculator", es: "calculadora-varas-a-metros", pt: "calculadora-varas-para-metros", fr: "calculateur-varas-vers-metres", de: "varas-zu-meter-rechner"` },
];

let addedReg = 0;
for (const m of MISSING) {
  if (!regContent.includes(`id: "${m.id}"`)) {
    const line = `  { id: "${m.id}", category: "${m.cat}", slugs: { ${m.slugs} } },`;
    if (regContent.includes("]; // END SLUG_REGISTRY")) {
      regContent = regContent.replace("]; // END SLUG_REGISTRY", line + "\n]; // END SLUG_REGISTRY");
    } else {
      // Fallback: find last ]; in the file
      const lastBracket = regContent.lastIndexOf("];");
      if (lastBracket !== -1) {
        regContent = regContent.slice(0, lastBracket) + line + "\n" + regContent.slice(lastBracket);
      }
    }
    addedReg++;
    console.log(`  ✅ +${m.id}`);
  } else {
    console.log(`  ⏭️  ${m.id} (already exists)`);
  }
}
if (addedReg > 0) fs.writeFileSync(registryPath, regContent, "utf-8");
console.log(`📋 Registry: ${addedReg} added\n`);

// ═══════════════════════════════════════════════════
// STEP 2: Rewrite calculators-config.ts
// ═══════════════════════════════════════════════════

console.log("--- STEP 2: calculators-config.ts ---");

const groups = {};
for (const [slug, m] of Object.entries(META)) {
  if (!groups[m.cat]) groups[m.cat] = [];
  groups[m.cat].push({ slug, ...m });
}
for (const cat of Object.keys(groups)) {
  groups[cat].sort((a, b) => a.slug.localeCompare(b.slug));
}

const colorMap = {
  health: "green", finance: "blue", math: "violet", everyday: "purple",
  technology: "cyan", conversion: "indigo", home: "amber",
};

function makeEntries(items) {
  return items.map(item => {
    const name = item.slug
      .replace(/-calculator$/, "")
      .replace(/-converter-calculator$/, " Converter")
      .replace(/-generator-calculator$/, " Generator")
      .replace(/-calculator-calculator$/, "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());
    const finalName = item.slug.includes("converter-calculator") ? name :
                      item.slug.includes("generator-calculator") ? name :
                      name + " Calculator";
    return `  {
    slug: "${item.slug}",
    name: "${finalName}",
    description: "${item.desc.replace(/"/g, '\\"')}",
    icon: "${item.icon}",
    color: "${colorMap[item.cat] || "purple"}",
    category: "${item.cat}",
    isNew: true,
    isPro: false,
  }`;
  }).join(",\n");
}

const CAT_ORDER = ["finance", "health", "math", "everyday", "technology", "conversion", "home"];
const CAT_CONST = {
  finance: "FINANCE_CALCULATORS", health: "HEALTH_CALCULATORS", math: "MATH_CALCULATORS",
  everyday: "EVERYDAY_CALCULATORS", technology: "TECHNOLOGY_CALCULATORS",
  conversion: "CONVERSION_CALCULATORS", home: "HOME_CALCULATORS",
};
const CAT_STATS = {
  finance: { icon: "💰", color: "blue" },
  health: { icon: "💪", color: "emerald" },
  math: { icon: "🔢", color: "violet" },
  everyday: { icon: "🧮", color: "orange" },
  technology: { icon: "💻", color: "cyan" },
  conversion: { icon: "🔄", color: "indigo" },
  home: { icon: "🏠", color: "amber" },
};

let cfg = `// Calculator configuration for Kalcufy
// AUTO-GENERATED by sync-calcs.js — ${new Date().toISOString().slice(0, 10)}
// Total: ${Object.keys(META).length} calculators

export interface Calculator {
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: string;
  isNew?: boolean;
  isPro?: boolean;
}

export interface CategoryStat {
  id: string;
  icon: string;
  color: string;
  count: number;
  status?: "active" | "coming-soon";
}

`;

for (const cat of CAT_ORDER) {
  const items = groups[cat] || [];
  if (!items.length) continue;
  cfg += `// ${cat.toUpperCase()} (${items.length})\n`;
  cfg += `export const ${CAT_CONST[cat]}: Calculator[] = [\n${makeEntries(items)},\n];\n\n`;
}

cfg += `export const ALL_CALCULATORS: Calculator[] = [\n`;
for (const cat of CAT_ORDER) {
  if (groups[cat]?.length) cfg += `  ...${CAT_CONST[cat]},\n`;
}
cfg += `];\n\n`;

cfg += `export function getCalculatorBySlug(slug: string): Calculator | undefined {
  return ALL_CALCULATORS.find((c) => c.slug === slug);
}

export function getCalculatorsByCategory(category: string): Calculator[] {
  return ALL_CALCULATORS.filter((c) => c.category === category);
}

export function getActiveCalculators(): Calculator[] {
  return ALL_CALCULATORS;
}

export function getTotalActiveCalculators(): number {
  return ALL_CALCULATORS.length;
}

export function getCalculatorCountByCategory(category: string): number {
  return ALL_CALCULATORS.filter((c) => c.category === category).length;
}

export function getCategoryStats(): CategoryStat[] {
  return [\n`;
for (const cat of CAT_ORDER) {
  if (!groups[cat]?.length) continue;
  const s = CAT_STATS[cat];
  cfg += `    { id: "${cat}", icon: "${s.icon}", color: "${s.color}", count: ${CAT_CONST[cat]}.length, status: "active" },\n`;
}
cfg += `  ];
}

export function slugToTranslationKey(slug: string): string {
  return slug
    .replace(/-calculator$/, "")
    .replace(/-generator$/, "")
    .replace(/-converter$/, "")
    .replace(/-([a-z])/g, (_, l) => l.toUpperCase());
}

export const CALCULATOR_COUNTS = {
  total: ALL_CALCULATORS.length,\n`;
for (const cat of CAT_ORDER) {
  if (groups[cat]?.length) cfg += `  ${cat}: ${CAT_CONST[cat]}.length,\n`;
}
cfg += `};\n`;

fs.writeFileSync(path.join(ROOT, "src/config/calculators-config.ts"), cfg, "utf-8");
console.log(`✅ ${Object.keys(META).length} calculators written\n`);

// ═══════════════════════════════════════════════════
// STEP 3: Translation stubs
// ═══════════════════════════════════════════════════

console.log("--- STEP 3: Translations ---");

for (const locale of ["en", "es", "pt", "fr", "de"]) {
  const msgPath = path.join(ROOT, `messages/${locale}.json`);
  if (!fs.existsSync(msgPath)) continue;

  let msgs;
  try { msgs = JSON.parse(fs.readFileSync(msgPath, "utf-8")); } catch { continue; }

  if (!msgs.calculators) msgs.calculators = {};
  if (!msgs.calculators.names) msgs.calculators.names = {};
  if (!msgs.calculatorsPage) msgs.calculatorsPage = {};
  if (!msgs.calculatorsPage.calcs) msgs.calculatorsPage.calcs = {};

  let added = 0;
  for (const [slug, m] of Object.entries(META)) {
    const key = slug
      .replace(/-calculator$/, "")
      .replace(/-generator$/, "")
      .replace(/-converter$/, "")
      .replace(/-([a-z])/g, (_, l) => l.toUpperCase());

    if (!msgs.calculators.names[key]) {
      msgs.calculators.names[key] = slug
        .replace(/-calculator$/, "").replace(/-/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase()) + " Calculator";
      added++;
    }
    if (!msgs.calculatorsPage.calcs[key]) {
      msgs.calculatorsPage.calcs[key] = { desc: m.desc };
    }
  }
  fs.writeFileSync(msgPath, JSON.stringify(msgs, null, 2) + "\n", "utf-8");
  if (added > 0) console.log(`  📝 ${locale}.json: +${added} stubs`);
}
console.log("");

// ═══════════════════════════════════════════════════
// STEP 4: Upsert DB
// ═══════════════════════════════════════════════════

async function upsertDB() {
  console.log("--- STEP 4: Database ---");
  const prisma = new PrismaClient();
  try {
    // Try categories (may not exist in schema)
    try {
      for (const [i, cat] of [
        ["finance", "Finance", "💰", "blue"],
        ["health", "Health & Fitness", "💪", "emerald"],
        ["math", "Math", "🔢", "violet"],
        ["everyday", "Everyday", "🧮", "orange"],
        ["technology", "Technology", "💻", "cyan"],
        ["conversion", "Conversion", "🔄", "indigo"],
        ["home", "Home & Construction", "🏠", "amber"],
      ].entries()) {
        await prisma.calculatorCategory.upsert({
          where: { id: cat[0] },
          update: { name: cat[1], icon: cat[2], color: cat[3], sortOrder: i + 1 },
          create: { id: cat[0], name: cat[1], icon: cat[2], color: cat[3], sortOrder: i + 1 },
        });
      }
      console.log("  ✅ 7 categories upserted");
    } catch (e) {
      console.log("  ⏭️  Categories table not available, skipping");
    }

    // Ensure all slugs active
    let count = 0;
    for (const slug of Object.keys(META)) {
      await prisma.calculatorStatus.upsert({
        where: { slug },
        update: { isActive: true },
        create: { slug, isActive: true },
      });
      count++;
    }
    console.log(`  ✅ ${count} calculators confirmed active in DB`);
  } catch (e) {
    console.error("  ⚠️ DB error:", e.message);
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  await upsertDB();
  console.log(`\n🎉 SYNC COMPLETE!`);
  console.log(`   Next: rm -rf .next && npm run dev`);
  console.log(`   Check: http://localhost:3000/en/calculators\n`);
}

main().catch(console.error);
