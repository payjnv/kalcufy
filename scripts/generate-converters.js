#!/usr/bin/env node

// ═══════════════════════════════════════════════════════════════════════
// 🔄 BATCH CONVERTER GENERATOR — Kalcufy V4
// ═══════════════════════════════════════════════════════════════════════
// Generates full V4 converter calculators (English only).
// After running, translate each with:
//   node --env-file=.env.local scripts/translate-calc-v4.js {id}
//
// Usage:
//   node scripts/generate-converters.js
//   node scripts/generate-converters.js --dry-run   (preview only)
// ═══════════════════════════════════════════════════════════════════════

const fs = require("fs");
const path = require("path");

const DRY_RUN = process.argv.includes("--dry-run");

// ─── CONVERTER DEFINITIONS ───────────────────────────────────────────
const CONVERTERS = [
  // ── Reversos faltantes ─────────────────────────────────────────────
  {
    id: "liters-to-gallons",
    icon: "🫗",
    unitType: "volume",
    defaultUnit: "L",
    allowedUnits: ["L", "gal_us", "gal_uk", "mL", "fl_oz", "cups", "pt_us", "qt_us"],
    primaryResult: "gal_us",
    title: "Liters to Gallons Converter",
    seoTitle: "Liters to Gallons Converter - Free Volume Conversion",
    seoDesc: "Convert liters to gallons instantly. Supports US and UK gallons with metric equivalents for cooking, fuel, and everyday use.",
    subtitle: "Convert liters to US and UK gallons instantly for cooking, fuel, and everyday measurements.",
    keywords: ["liters to gallons", "L to gal", "liter gallon converter", "metric to imperial volume", "liters to gallons conversion", "free volume converter"],
    quickTip: "Quick estimate: 1 liter ≈ 0.264 US gallons (roughly ¼ gallon)",
    presets: [
      { id: "oneLiter", icon: "🥤", amount: 1, desc: "1 L (0.26 gal)" },
      { id: "fiveLiters", icon: "🫗", amount: 5, desc: "5 L (1.32 gal)" },
      { id: "twentyLiters", icon: "⛽", amount: 20, desc: "20 L (5.28 gal)" },
    ],
  },
  {
    id: "ml-to-oz",
    icon: "💧",
    unitType: "volume",
    defaultUnit: "mL",
    allowedUnits: ["mL", "fl_oz", "L", "cups", "tbsp", "tsp"],
    primaryResult: "fl_oz",
    title: "mL to Fluid Ounces Converter",
    seoTitle: "mL to Oz Converter - Milliliters to Fluid Ounces",
    seoDesc: "Convert milliliters to fluid ounces instantly. Essential for cooking recipes, medicine dosing, and beverage measurements.",
    subtitle: "Convert milliliters to fluid ounces for cooking, medicine, and drinks.",
    keywords: ["ml to oz", "milliliters to ounces", "ml to fluid ounces", "mL converter", "metric to oz", "cooking conversion ml oz"],
    quickTip: "Quick estimate: 30 mL ≈ 1 fl oz",
    presets: [
      { id: "shot", icon: "🥃", amount: 30, desc: "30 mL (1 oz shot)" },
      { id: "cup", icon: "☕", amount: 240, desc: "240 mL (8 oz cup)" },
      { id: "bottle", icon: "🍼", amount: 500, desc: "500 mL (16.9 oz)" },
    ],
  },
  {
    id: "ml-to-cups",
    icon: "🥛",
    unitType: "cooking_volume",
    defaultUnit: "mL",
    allowedUnits: ["mL", "cups", "tbsp", "tsp", "fl_oz", "L"],
    primaryResult: "cups",
    title: "mL to Cups Converter",
    seoTitle: "mL to Cups Converter - Milliliters to Cups",
    seoDesc: "Convert milliliters to cups for baking and cooking. Includes tablespoons, teaspoons, and other kitchen measurements.",
    subtitle: "Convert milliliters to cups, tablespoons, and teaspoons for kitchen measurements.",
    keywords: ["ml to cups", "milliliters to cups", "mL cups converter", "baking conversion", "cooking ml to cups", "metric cups converter"],
    quickTip: "Quick estimate: 250 mL ≈ 1 cup (US standard)",
    presets: [
      { id: "halfCup", icon: "🥛", amount: 125, desc: "125 mL (½ cup)" },
      { id: "oneCup", icon: "☕", amount: 250, desc: "250 mL (1 cup)" },
      { id: "twoCups", icon: "🫗", amount: 500, desc: "500 mL (2 cups)" },
    ],
  },
  {
    id: "kmh-to-mph",
    icon: "🏎️",
    unitType: "speed",
    defaultUnit: "kmh",
    allowedUnits: ["kmh", "mph", "ms", "knots", "fts"],
    primaryResult: "mph",
    title: "KM/H to MPH Converter",
    seoTitle: "KM/H to MPH Converter - Speed Conversion Tool",
    seoDesc: "Convert kilometers per hour to miles per hour instantly. Essential for travel, driving in the US/UK, and vehicle speed comparisons.",
    subtitle: "Convert km/h to mph for travel, driving, and speed comparisons worldwide.",
    keywords: ["kmh to mph", "km/h to miles per hour", "speed converter", "kph to mph", "kilometers to miles speed", "driving speed conversion"],
    quickTip: "Quick estimate: divide km/h by 1.6 to get mph",
    presets: [
      { id: "city", icon: "🏙️", amount: 50, desc: "50 km/h (31 mph)" },
      { id: "highway", icon: "🛣️", amount: 120, desc: "120 km/h (75 mph)" },
      { id: "fast", icon: "🏎️", amount: 200, desc: "200 km/h (124 mph)" },
    ],
  },
  {
    id: "square-meters-to-square-feet",
    icon: "📐",
    unitType: "area",
    defaultUnit: "m2",
    allowedUnits: ["m2", "ft2", "yd2", "acres", "hectares", "km2"],
    primaryResult: "ft2",
    title: "Square Meters to Square Feet Converter",
    seoTitle: "Square Meters to Square Feet Converter - Area Conversion",
    seoDesc: "Convert square meters to square feet for real estate, construction, and floor planning. Includes acres and hectares.",
    subtitle: "Convert m² to ft² for real estate, construction, and property measurements.",
    keywords: ["square meters to square feet", "m2 to ft2", "sqm to sqft", "area converter", "property size conversion", "real estate area calculator"],
    quickTip: "Quick estimate: 1 m² ≈ 10.76 ft² (roughly multiply by 11)",
    presets: [
      { id: "room", icon: "🏠", amount: 20, desc: "20 m² (215 ft²)" },
      { id: "apartment", icon: "🏢", amount: 80, desc: "80 m² (861 ft²)" },
      { id: "house", icon: "🏡", amount: 200, desc: "200 m² (2,153 ft²)" },
    ],
  },
  {
    id: "ml-to-tablespoons",
    icon: "🥄",
    unitType: "cooking_volume",
    defaultUnit: "mL",
    allowedUnits: ["mL", "tbsp", "tsp", "cups", "fl_oz", "L"],
    primaryResult: "tbsp",
    title: "mL to Tablespoons Converter",
    seoTitle: "mL to Tablespoons Converter - Kitchen Measurement Tool",
    seoDesc: "Convert milliliters to tablespoons for cooking and baking. Includes teaspoons, cups, and fluid ounces.",
    subtitle: "Convert mL to tablespoons and teaspoons for precise cooking and baking measurements.",
    keywords: ["ml to tablespoons", "milliliters to tbsp", "cooking converter", "baking measurements", "ml tbsp conversion", "kitchen measurement converter"],
    quickTip: "Quick estimate: 15 mL = 1 tablespoon (US standard)",
    presets: [
      { id: "oneTbsp", icon: "🥄", amount: 15, desc: "15 mL (1 tbsp)" },
      { id: "threeTbsp", icon: "🥄", amount: 45, desc: "45 mL (3 tbsp)" },
      { id: "quarterCup", icon: "🥛", amount: 60, desc: "60 mL (4 tbsp)" },
    ],
  },
  {
    id: "liters-to-pints",
    icon: "🍺",
    unitType: "volume",
    defaultUnit: "L",
    allowedUnits: ["L", "pt_us", "gal_us", "fl_oz", "mL", "cups"],
    primaryResult: "pt_us",
    title: "Liters to Pints Converter",
    seoTitle: "Liters to Pints Converter - Volume Conversion Tool",
    seoDesc: "Convert liters to pints instantly. Supports both US and UK pints for beverages, cooking, and everyday measurements.",
    subtitle: "Convert liters to US and UK pints for beverages, cooking, and everyday use.",
    keywords: ["liters to pints", "L to pints", "metric to pints", "beer pint converter", "liters pints conversion", "volume converter"],
    quickTip: "Quick estimate: 1 liter ≈ 2.11 US pints",
    presets: [
      { id: "halfLiter", icon: "🥤", amount: 0.5, desc: "0.5 L (1.06 pt)" },
      { id: "oneLiter", icon: "🍺", amount: 1, desc: "1 L (2.11 pt)" },
      { id: "threeLiters", icon: "🫗", amount: 3, desc: "3 L (6.34 pt)" },
    ],
  },
  // ── Cocina ─────────────────────────────────────────────────────────
  {
    id: "teaspoons-to-ml",
    icon: "🫖",
    unitType: "cooking_volume",
    defaultUnit: "tsp",
    allowedUnits: ["tsp", "mL", "tbsp", "cups", "fl_oz", "L"],
    primaryResult: "mL",
    title: "Teaspoons to mL Converter",
    seoTitle: "Teaspoons to mL Converter - Kitchen Measurement Tool",
    seoDesc: "Convert teaspoons to milliliters for precise cooking, baking, and medicine dosing. Includes tablespoons and cups.",
    subtitle: "Convert teaspoons to milliliters for cooking, baking, and medicine measurements.",
    keywords: ["teaspoons to ml", "tsp to mL", "teaspoon milliliter converter", "cooking measurement", "baking conversion", "medicine dosing tsp"],
    quickTip: "1 US teaspoon = exactly 4.929 mL (often rounded to 5 mL)",
    presets: [
      { id: "one", icon: "🫖", amount: 1, desc: "1 tsp (5 mL)" },
      { id: "three", icon: "🥄", amount: 3, desc: "3 tsp = 1 tbsp" },
      { id: "twelve", icon: "🥛", amount: 12, desc: "12 tsp = ¼ cup" },
    ],
  },
  {
    id: "grams-to-ounces",
    icon: "⚖️",
    unitType: "mass",
    defaultUnit: "g",
    allowedUnits: ["g", "oz", "kg", "lbs", "mg"],
    primaryResult: "oz",
    title: "Grams to Ounces Converter",
    seoTitle: "Grams to Ounces Converter - Weight Conversion Tool",
    seoDesc: "Convert grams to ounces instantly. Essential for cooking recipes, jewelry, postal weight, and international shipping.",
    subtitle: "Convert grams to ounces for cooking, jewelry, shipping, and everyday weight measurements.",
    keywords: ["grams to ounces", "g to oz", "gram ounce converter", "weight converter", "cooking grams to oz", "metric to imperial weight"],
    quickTip: "Quick estimate: 28 grams ≈ 1 ounce",
    presets: [
      { id: "oneOz", icon: "💎", amount: 28.35, desc: "28.35g (1 oz)" },
      { id: "hundred", icon: "📦", amount: 100, desc: "100g (3.53 oz)" },
      { id: "halfPound", icon: "⚖️", amount: 226.8, desc: "226.8g (8 oz)" },
    ],
  },
  {
    id: "ounces-to-grams",
    icon: "⚖️",
    unitType: "mass",
    defaultUnit: "oz",
    allowedUnits: ["oz", "g", "kg", "lbs", "mg"],
    primaryResult: "g",
    title: "Ounces to Grams Converter",
    seoTitle: "Ounces to Grams Converter - Weight Conversion Tool",
    seoDesc: "Convert ounces to grams instantly. Perfect for cooking, baking, jewelry, and international recipe conversions.",
    subtitle: "Convert ounces to grams for cooking, baking, jewelry, and shipping measurements.",
    keywords: ["ounces to grams", "oz to g", "ounce gram converter", "weight conversion", "cooking oz to grams", "imperial to metric weight"],
    quickTip: "Quick estimate: 1 ounce ≈ 28.35 grams",
    presets: [
      { id: "one", icon: "💎", amount: 1, desc: "1 oz (28.35g)" },
      { id: "four", icon: "🧈", amount: 4, desc: "4 oz = ¼ lb (113g)" },
      { id: "eight", icon: "📦", amount: 8, desc: "8 oz = ½ lb (227g)" },
    ],
  },
  {
    id: "quarts-to-liters",
    icon: "🫗",
    unitType: "volume",
    defaultUnit: "qt_us",
    allowedUnits: ["qt_us", "L", "gal_us", "mL", "cups", "pt_us", "fl_oz"],
    primaryResult: "L",
    title: "Quarts to Liters Converter",
    seoTitle: "Quarts to Liters Converter - Volume Conversion Tool",
    seoDesc: "Convert quarts to liters instantly for cooking, automotive fluids, and everyday measurements.",
    subtitle: "Convert quarts to liters for cooking, automotive, and everyday volume measurements.",
    keywords: ["quarts to liters", "qt to L", "quart liter converter", "cooking conversion", "volume converter", "automotive fluid conversion"],
    quickTip: "Quick estimate: 1 quart ≈ 0.946 liters (almost 1 liter)",
    presets: [
      { id: "one", icon: "🥛", amount: 1, desc: "1 qt (0.95 L)" },
      { id: "four", icon: "🫗", amount: 4, desc: "4 qt = 1 gallon" },
      { id: "five", icon: "🛢️", amount: 5, desc: "5 qt (oil change)" },
    ],
  },
  // ── Área ────────────────────────────────────────────────────────────
  {
    id: "hectares-to-acres",
    icon: "🌾",
    unitType: "area",
    defaultUnit: "hectares",
    allowedUnits: ["hectares", "acres", "m2", "km2", "ft2", "mi2"],
    primaryResult: "acres",
    title: "Hectares to Acres Converter",
    seoTitle: "Hectares to Acres Converter - Land Area Conversion",
    seoDesc: "Convert hectares to acres instantly for real estate, farming, and land measurement. Includes square meters and square miles.",
    subtitle: "Convert hectares to acres for real estate, agriculture, and land measurement worldwide.",
    keywords: ["hectares to acres", "ha to acres", "land area converter", "farm size conversion", "hectare acre calculator", "property area conversion"],
    quickTip: "Quick estimate: 1 hectare ≈ 2.47 acres",
    presets: [
      { id: "one", icon: "🌱", amount: 1, desc: "1 ha (2.47 acres)" },
      { id: "ten", icon: "🌾", amount: 10, desc: "10 ha (24.7 acres)" },
      { id: "hundred", icon: "🏡", amount: 100, desc: "100 ha (247 acres)" },
    ],
  },
  {
    id: "acres-to-hectares",
    icon: "🏞️",
    unitType: "area",
    defaultUnit: "acres",
    allowedUnits: ["acres", "hectares", "m2", "km2", "ft2", "yd2"],
    primaryResult: "hectares",
    title: "Acres to Hectares Converter",
    seoTitle: "Acres to Hectares Converter - Land Area Conversion",
    seoDesc: "Convert acres to hectares instantly for international real estate, farming, and land measurement.",
    subtitle: "Convert acres to hectares for international real estate, farming, and property measurements.",
    keywords: ["acres to hectares", "acres to ha", "land converter", "farm area conversion", "property hectares", "acre hectare calculator"],
    quickTip: "Quick estimate: 1 acre ≈ 0.405 hectares",
    presets: [
      { id: "one", icon: "🏡", amount: 1, desc: "1 acre (0.405 ha)" },
      { id: "five", icon: "🌾", amount: 5, desc: "5 acres (2.02 ha)" },
      { id: "forty", icon: "🏞️", amount: 40, desc: "40 acres (16.2 ha)" },
    ],
  },
  // ── Longitud ───────────────────────────────────────────────────────
  {
    id: "yards-to-meters",
    icon: "📏",
    unitType: "length",
    defaultUnit: "yd",
    allowedUnits: ["yd", "m", "ft", "in", "cm", "km", "mi"],
    primaryResult: "m",
    title: "Yards to Meters Converter",
    seoTitle: "Yards to Meters Converter - Length Conversion Tool",
    seoDesc: "Convert yards to meters instantly. Essential for sports fields, fabric, construction, and international measurements.",
    subtitle: "Convert yards to meters for sports, fabric, construction, and international measurements.",
    keywords: ["yards to meters", "yd to m", "yard meter converter", "football field conversion", "fabric yards to meters", "length conversion"],
    quickTip: "Quick estimate: 1 yard ≈ 0.914 meters (slightly less than 1 meter)",
    presets: [
      { id: "one", icon: "📏", amount: 1, desc: "1 yd (0.914 m)" },
      { id: "hundred", icon: "🏈", amount: 100, desc: "100 yd football field" },
      { id: "thousand", icon: "🏃", amount: 1760, desc: "1760 yd = 1 mile" },
    ],
  },
  {
    id: "meters-to-yards",
    icon: "📏",
    unitType: "length",
    defaultUnit: "m",
    allowedUnits: ["m", "yd", "ft", "in", "cm", "km", "mi"],
    primaryResult: "yd",
    title: "Meters to Yards Converter",
    seoTitle: "Meters to Yards Converter - Length Conversion Tool",
    seoDesc: "Convert meters to yards instantly for sports, fabric, construction, and everyday measurements.",
    subtitle: "Convert meters to yards for sports fields, fabric, construction, and everyday use.",
    keywords: ["meters to yards", "m to yd", "meter yard converter", "length conversion", "metric to yards", "sports field conversion"],
    quickTip: "Quick estimate: 1 meter ≈ 1.094 yards (slightly more than 1 yard)",
    presets: [
      { id: "one", icon: "📏", amount: 1, desc: "1 m (1.09 yd)" },
      { id: "hundred", icon: "🏊", amount: 100, desc: "100 m (109 yd)" },
      { id: "fiveHundred", icon: "🏃", amount: 500, desc: "500 m (547 yd)" },
    ],
  },
  // ── Tecnología ─────────────────────────────────────────────────────
  {
    id: "bytes-converter",
    icon: "💾",
    unitType: "data",
    defaultUnit: "gb",
    allowedUnits: ["byte", "kb", "mb", "gb", "tb", "pb"],
    primaryResult: "mb",
    title: "Bytes Converter (MB, GB, TB)",
    seoTitle: "Bytes Converter - MB to GB to TB Data Size Tool",
    seoDesc: "Convert between bytes, KB, MB, GB, TB, and PB instantly. Essential for storage, file sizes, and data management.",
    subtitle: "Convert between KB, MB, GB, TB, and PB for storage, file sizes, and data management.",
    keywords: ["bytes converter", "MB to GB", "GB to TB", "data size converter", "file size calculator", "storage converter", "KB MB GB TB"],
    quickTip: "1 GB = 1,024 MB = 1,048,576 KB",
    presets: [
      { id: "oneGB", icon: "📱", amount: 1, desc: "1 GB (1,024 MB)" },
      { id: "hundredGB", icon: "💻", amount: 100, desc: "100 GB" },
      { id: "oneTB", icon: "🖥️", amount: 1024, desc: "1 TB (1,024 GB)" },
    ],
  },
  // ── Automotriz ─────────────────────────────────────────────────────
  {
    id: "mpg-to-km-per-liter",
    icon: "⛽",
    unitType: "fuel_economy",
    defaultUnit: "mpg_us",
    allowedUnits: ["mpg_us", "mpg_uk", "kmL", "L100km"],
    primaryResult: "kmL",
    title: "MPG to KM/L Converter",
    seoTitle: "MPG to KM/L Converter - Fuel Economy Conversion",
    seoDesc: "Convert miles per gallon to kilometers per liter for international fuel economy comparison. Includes L/100km.",
    subtitle: "Convert MPG to KM/L and L/100km for international fuel economy comparisons.",
    keywords: ["mpg to km/l", "fuel economy converter", "miles per gallon to km per liter", "gas mileage converter", "fuel consumption converter", "mpg converter"],
    quickTip: "Quick estimate: divide MPG by 2.35 for km/L",
    presets: [
      { id: "city", icon: "🏙️", amount: 25, desc: "25 mpg (city car)" },
      { id: "highway", icon: "🛣️", amount: 35, desc: "35 mpg (efficient)" },
      { id: "hybrid", icon: "⚡", amount: 50, desc: "50 mpg (hybrid)" },
    ],
  },
  // ── Física ─────────────────────────────────────────────────────────
  {
    id: "psi-to-bar",
    icon: "🔧",
    unitType: "pressure",
    defaultUnit: "psi",
    allowedUnits: ["psi", "bar", "kPa", "atm", "mmHg", "Pa"],
    primaryResult: "bar",
    title: "PSI to Bar Converter",
    seoTitle: "PSI to Bar Converter - Pressure Conversion Tool",
    seoDesc: "Convert PSI to bar and other pressure units instantly. Essential for tire pressure, HVAC, diving, and engineering.",
    subtitle: "Convert PSI to bar, kPa, and atm for tire pressure, engineering, and industrial applications.",
    keywords: ["psi to bar", "pressure converter", "tire pressure conversion", "psi bar kpa", "pressure unit converter", "air pressure calculator"],
    quickTip: "Quick estimate: 14.5 PSI ≈ 1 bar ≈ 1 atm",
    presets: [
      { id: "tire", icon: "🛞", amount: 32, desc: "32 PSI (car tire)" },
      { id: "bike", icon: "🚲", amount: 100, desc: "100 PSI (bike tire)" },
      { id: "scuba", icon: "🤿", amount: 3000, desc: "3000 PSI (scuba)" },
    ],
  },
  {
    id: "watts-to-horsepower",
    icon: "🐴",
    unitType: "power",
    defaultUnit: "W",
    allowedUnits: ["W", "kW", "HP", "BTUh"],
    primaryResult: "HP",
    title: "Watts to Horsepower Converter",
    seoTitle: "Watts to Horsepower Converter - Power Conversion Tool",
    seoDesc: "Convert watts to horsepower instantly. Essential for motors, vehicles, appliances, and electrical engineering.",
    subtitle: "Convert watts to horsepower for motors, vehicles, and electrical engineering.",
    keywords: ["watts to horsepower", "W to HP", "power converter", "motor power conversion", "kW to HP", "engine power calculator"],
    quickTip: "Quick estimate: 746 watts = 1 horsepower",
    presets: [
      { id: "appliance", icon: "🔌", amount: 1000, desc: "1,000 W (1.34 HP)" },
      { id: "motor", icon: "⚡", amount: 5000, desc: "5 kW (6.7 HP)" },
      { id: "car", icon: "🚗", amount: 150000, desc: "150 kW (201 HP)" },
    ],
  },
  {
    id: "degrees-to-radians",
    icon: "📐",
    unitType: "angle",
    defaultUnit: "deg",
    allowedUnits: ["deg", "rad", "grad"],
    primaryResult: "rad",
    title: "Degrees to Radians Converter",
    seoTitle: "Degrees to Radians Converter - Angle Conversion Tool",
    seoDesc: "Convert degrees to radians and gradians instantly. Essential for math, physics, engineering, and programming.",
    subtitle: "Convert degrees to radians and gradians for math, physics, and programming.",
    keywords: ["degrees to radians", "deg to rad", "angle converter", "trigonometry converter", "math angle conversion", "degrees radians calculator"],
    quickTip: "Key values: 90° = π/2, 180° = π, 360° = 2π",
    presets: [
      { id: "right", icon: "📐", amount: 90, desc: "90° (π/2 rad)" },
      { id: "straight", icon: "↔️", amount: 180, desc: "180° (π rad)" },
      { id: "full", icon: "🔄", amount: 360, desc: "360° (2π rad)" },
    ],
  },
  // ── LATAM reversos ─────────────────────────────────────────────────
  {
    id: "hectareas-to-tareas",
    icon: "🇩🇴",
    unitType: "area",
    defaultUnit: "hectares",
    allowedUnits: ["hectares", "tarea", "m2", "acres", "ft2"],
    primaryResult: "tarea",
    title: "Hectáreas to Tareas Converter (DR)",
    seoTitle: "Hectáreas to Tareas Converter - Dominican Republic Land",
    seoDesc: "Convert hectares to tareas (Dominican Republic land unit). 1 hectare = 15.9 tareas. Essential for DR real estate and agriculture.",
    subtitle: "Convert hectares to tareas — the Dominican Republic's standard land measurement unit.",
    keywords: ["hectareas a tareas", "hectares to tareas", "dominican republic land", "tareas converter", "DR real estate", "tierra dominicana"],
    quickTip: "1 hectare = 15.9 tareas | 1 tarea = 628.86 m²",
    presets: [
      { id: "one", icon: "🌱", amount: 1, desc: "1 ha (15.9 tareas)" },
      { id: "five", icon: "🌾", amount: 5, desc: "5 ha (79.5 tareas)" },
      { id: "ten", icon: "🏡", amount: 10, desc: "10 ha (159 tareas)" },
    ],
  },
  {
    id: "metros-cuadrados-to-tareas",
    icon: "🇩🇴",
    unitType: "area",
    defaultUnit: "m2",
    allowedUnits: ["m2", "tarea", "hectares", "ft2", "acres"],
    primaryResult: "tarea",
    title: "Metros Cuadrados to Tareas Converter",
    seoTitle: "m² to Tareas Converter - Dominican Republic Land Unit",
    seoDesc: "Convert square meters to tareas for Dominican Republic land measurements. 1 tarea = 628.86 m². Free and instant.",
    subtitle: "Convert square meters to tareas — essential for buying and selling land in the Dominican Republic.",
    keywords: ["metros cuadrados a tareas", "m2 to tareas", "square meters tareas", "dominican land converter", "tarea calculadora", "terreno dominicano"],
    quickTip: "1 tarea = 628.86 m² | 1 m² = 0.00159 tareas",
    presets: [
      { id: "solar", icon: "🏠", amount: 300, desc: "300 m² (0.48 ta)" },
      { id: "oneTarea", icon: "📐", amount: 628.86, desc: "628.86 m² (1 ta)" },
      { id: "finca", icon: "🌾", amount: 5000, desc: "5,000 m² (7.95 ta)" },
    ],
  },
  // ── Knots ──────────────────────────────────────────────────────────
  {
    id: "knots-to-mph",
    icon: "⛵",
    unitType: "speed",
    defaultUnit: "knots",
    allowedUnits: ["knots", "mph", "kmh", "ms", "fts"],
    primaryResult: "mph",
    title: "Knots to MPH Converter",
    seoTitle: "Knots to MPH Converter - Nautical Speed Conversion",
    seoDesc: "Convert knots to miles per hour for sailing, aviation, and weather. 1 knot = 1.151 mph = 1.852 km/h.",
    subtitle: "Convert knots to mph and km/h for sailing, aviation, and weather forecasting.",
    keywords: ["knots to mph", "nautical speed converter", "knots miles per hour", "sailing speed", "aviation speed conversion", "wind speed knots"],
    quickTip: "Quick estimate: 1 knot ≈ 1.15 mph ≈ 1.85 km/h",
    presets: [
      { id: "breeze", icon: "🌬️", amount: 15, desc: "15 kn (gentle breeze)" },
      { id: "sailing", icon: "⛵", amount: 30, desc: "30 kn (strong wind)" },
      { id: "jet", icon: "✈️", amount: 500, desc: "500 kn (jetliner)" },
    ],
  },
  // ── Torque ─────────────────────────────────────────────────────────
  {
    id: "torque-converter",
    icon: "🔩",
    unitType: "torque",
    defaultUnit: "Nm",
    allowedUnits: ["Nm", "ftlbf", "kgfm", "inlbf"],
    primaryResult: "ftlbf",
    title: "Torque Converter (Nm to ft·lbf)",
    seoTitle: "Torque Converter - Nm to ft·lbf Conversion Tool",
    seoDesc: "Convert Newton-meters to foot-pounds and other torque units. Essential for automotive, engineering, and mechanical work.",
    subtitle: "Convert Nm to ft·lbf and other torque units for automotive and mechanical applications.",
    keywords: ["torque converter", "Nm to ft lbs", "newton meter to foot pound", "torque conversion", "engine torque calculator", "bolt torque converter"],
    quickTip: "Quick estimate: 1 Nm ≈ 0.738 ft·lbf",
    presets: [
      { id: "wheel", icon: "🛞", amount: 110, desc: "110 Nm (lug nuts)" },
      { id: "engine", icon: "🏎️", amount: 350, desc: "350 Nm (V6 engine)" },
      { id: "diesel", icon: "🚛", amount: 800, desc: "800 Nm (diesel)" },
    ],
  },
];

// ─── UNIT TYPE LABELS (contextual, not generic "Enter Value") ─────
const UNIT_LABELS = {
  volume: { section: "Enter Volume", input: "Volume" },
  cooking_volume: { section: "Enter Amount", input: "Amount" },
  speed: { section: "Enter Speed", input: "Speed" },
  area: { section: "Enter Area", input: "Area" },
  mass: { section: "Enter Weight", input: "Weight" },
  length: { section: "Enter Length", input: "Length" },
  data: { section: "Enter Data Size", input: "Data Size" },
  fuel_economy: { section: "Enter Fuel Economy", input: "Fuel Economy" },
  pressure: { section: "Enter Pressure", input: "Pressure" },
  power: { section: "Enter Power", input: "Power" },
  angle: { section: "Enter Angle", input: "Angle" },
  torque: { section: "Enter Torque", input: "Torque" },
};

// ─── TEMPLATE GENERATOR ──────────────────────────────────────────────
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
        reference: {
          title: "Quick Reference",
          items: [
            { label: "Ref 1", valueKey: "ref1" },
            { label: "Ref 2", valueKey: "ref2" },
            { label: "Ref 3", valueKey: "ref3" },
            { label: "Ref 4", valueKey: "ref4" },
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
            { text: "See the Quick Reference card for common values.", type: "info" },
            { text: "Use presets above for frequently used amounts.", type: "info" },
            { text: "All results update in real-time as you type.", type: "info" },
            { text: "Works on mobile — use it anywhere.", type: "info" },
            { text: "Share results using the Share button below.", type: "info" },
            { text: "Save results for later with the Save button.", type: "info" },
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
    { id: "reference", type: "list", icon: "📋", itemCount: 4 },
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

  // Convert to all available units
  for (const unit of units) {
    try {
      const converted = convert(amount, fromUnit, unit.id, "${conv.unitType}");
      results[unit.id] = converted;
      formatted[unit.id] = \`\${fmtNum(converted)} \${unit.symbol}\`;
    } catch {
      // Skip units that can't convert
    }
  }

  // Map to standard result keys
  const allUnits = [${allowedStr}];
  const otherUnits = allUnits.filter(u => u !== fromUnit);

  formatted.primary = formatted[otherUnits[0]] || formatted[allUnits[1]] || "—";
  formatted.secondary1 = formatted[otherUnits[1]] || "—";
  formatted.secondary2 = formatted[otherUnits[2]] || "—";
  formatted.secondary3 = formatted[otherUnits[3]] || "—";

  // Reference values
  formatted.ref1 = formatted[allUnits[0]] || "—";
  formatted.ref2 = formatted[allUnits[1]] || "—";
  formatted.ref3 = formatted[allUnits[2]] || "—";
  formatted.ref4 = formatted[allUnits[3]] || "—";

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

  console.log(`\\n🔄 Generating ${CONVERTERS.length} converters...\\n`);

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

  console.log(`\\n📊 Done! Created: ${created} | Skipped: ${skipped} | Total: ${CONVERTERS.length}`);

  if (!DRY_RUN && created > 0) {
    console.log(`\\n📦 Next steps:`);
    console.log(`  1. Install each converter:`);
    for (const conv of CONVERTERS) {
      const file = path.join(baseDir, conv.id, "index.ts");
      if (!fs.existsSync(file) || created > 0) {
        console.log(`     node --env-file=.env.local scripts/install-calc-v4.js ${conv.id} --no-translate`);
      }
    }
    console.log(`\\n  2. Clean cache: rm -rf .next && npm run dev`);
    console.log(`\\n  3. Translate each:`);
    for (const conv of CONVERTERS) {
      console.log(`     node --env-file=.env.local scripts/translate-calc-v4.js ${conv.id}`);
    }
  }
}

main();
