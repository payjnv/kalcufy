// ============================================================================
// KALCUFY V4 - UNIT REGISTRY (EXPANDED)
// ============================================================================
// Complete catalog of units organized by UnitType.
// Each group defines a base unit and all available conversions.
//
// Conversion factors: value_in_base = value × toBase
// Example: 1 lb × 0.453592 = 0.453592 kg (base)
//
// Regions enable smart locale defaults (guessDefaultUnit).
// NO flags or emojis — clean text-only design.
//
// Total: ~200+ units across 40+ groups
// ============================================================================

import type { UnitGroup, DualUnitValue } from "./types";
import { CURRENCY_GROUP } from "./currencies";

// ─────────────────────────────────────────────────────────────────────────────
// HEALTH / BODY
// ─────────────────────────────────────────────────────────────────────────────

export const WEIGHT: UnitGroup = {
  type: "weight",
  name: "Weight",
  baseUnit: "kg",
  category: "health",
  units: [
    { id: "kg",  symbol: "kg",  name: "Kilograms", regions: ["EU","BR","MX","AR","CL","CO","PE","IN","JP","AU","NZ","DE","FR","IT","ES","PT"], isBase: true, toBase: 1, decimals: 1 },
    { id: "lbs", symbol: "lbs", name: "Pounds",    regions: ["US","LR","MM"],                          toBase: 0.453592, decimals: 1 },
    { id: "st",  symbol: "st",  name: "Stones",    regions: ["GB","IE"],                               toBase: 6.35029, decimals: 1 },
    { id: "g",   symbol: "g",   name: "Grams",                                                        toBase: 0.001, decimals: 0 },
    { id: "oz",  symbol: "oz",  name: "Ounces",    regions: ["US","CA","GB"],                          toBase: 0.0283495, decimals: 1 },
  ],
};

export const HEIGHT: UnitGroup = {
  type: "height",
  name: "Height",
  baseUnit: "cm",
  category: "health",
  units: [
    { id: "cm", symbol: "cm", name: "Centimeters", regions: ["EU","BR","MX","AR","CL","CO","PE","IN","JP","AU","NZ","DE","FR","IT","ES","PT"], isBase: true, toBase: 1, decimals: 1 },
    { id: "m",  symbol: "m",  name: "Meters",                                                     toBase: 100, decimals: 2 },
    { id: "in", symbol: "in", name: "Inches",       regions: ["US","CA","GB","IE"],                toBase: 2.54, decimals: 1 },
    { id: "ft", symbol: "ft", name: "Feet",         regions: ["US","CA","GB","IE"],                toBase: 30.48, decimals: 1 },
    // ✅ DUAL UNIT: Feet and Inches (like OmniCalculator)
    { 
      id: "ft_in", 
      symbol: "ft/in", 
      name: "Feet and Inches", 
      regions: ["US","CA","GB","IE"],
      isDual: true,
      decimals: 0,
      dualConfig: {
        primarySymbol: "ft",
        secondarySymbol: "in",
        primaryToBase: 30.48,      // 1 ft = 30.48 cm
        secondaryToBase: 2.54,     // 1 in = 2.54 cm
        secondaryMax: 12,          // 12 inches = 1 foot
        primaryDecimals: 0,
        secondaryDecimals: 1,
      },
      toBaseFn: (value: number | DualUnitValue) => {
        if (typeof value === 'number') return value;
        const { primary, secondary } = value;
        return (primary * 30.48) + (secondary * 2.54);
      },
      fromBaseFn: (cm: number) => {
        const totalInches = cm / 2.54;
        const feet = Math.floor(totalInches / 12);
        const inches = totalInches % 12;
        return { primary: feet, secondary: Math.round(inches * 10) / 10 };
      },
    },
  ],
};

export const BODY_LENGTH: UnitGroup = {
  type: "body_length",
  name: "Body Measurement",
  baseUnit: "cm",
  category: "health",
  units: [
    { id: "cm", symbol: "cm", name: "Centimeters", regions: ["EU","BR","MX","AR","CL","CO","PE","IN","JP","AU","NZ"], isBase: true, toBase: 1, decimals: 1 },
    { id: "in", symbol: "in", name: "Inches",      regions: ["US","CA","GB","IE"], toBase: 2.54, decimals: 1 },
  ],
};

export const BODY_TEMPERATURE: UnitGroup = {
  type: "body_temperature",
  name: "Body Temperature",
  baseUnit: "C",
  category: "health",
  units: [
    {
      id: "C", symbol: "°C", name: "Celsius",
      regions: ["EU","BR","MX","AR","CL","CO","PE","GB","AU","NZ","IN","JP","DE","FR","IT","ES","PT"],
      isBase: true, toBase: 1, decimals: 1,
      toBaseFn: (v) => v,
      fromBaseFn: (v) => v,
    },
    {
      id: "F", symbol: "°F", name: "Fahrenheit", regions: ["US"],
      decimals: 1,
      toBaseFn: (v) => (v - 32) * 5 / 9,
      fromBaseFn: (v) => v * 9 / 5 + 32,
    },
  ],
};

export const ENERGY_FOOD: UnitGroup = {
  type: "energy_food",
  name: "Food Energy",
  baseUnit: "kcal",
  category: "health",
  units: [
    { id: "kcal", symbol: "kcal", name: "Kilocalories", regions: ["US","CA","MX","BR","AR","GB","AU"], isBase: true, toBase: 1, decimals: 0 },
    { id: "cal",  symbol: "cal",  name: "Calories",     toBase: 0.001, decimals: 0 },
    { id: "kJ",   symbol: "kJ",   name: "Kilojoules",  regions: ["EU","AU","NZ"], toBase: 0.239006, decimals: 0 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// LENGTH / DISTANCE (EXPANDED: 8 → 18 units)
// ─────────────────────────────────────────────────────────────────────────────

export const LENGTH: UnitGroup = {
  type: "length",
  name: "Length",
  baseUnit: "m",
  category: "everyday",
  units: [
    // ── Metric (complete SI scale) ──
    { id: "nm",  symbol: "nm",  name: "Nanometers",    toBase: 1e-9, decimals: 0 },
    { id: "um",  symbol: "µm",  name: "Micrometers",   toBase: 1e-6, decimals: 1 },
    { id: "mm",  symbol: "mm",  name: "Millimeters",   regions: ["EU","BR","MX","AR","CL","CO","PE","DE","FR","IT","ES","PT"], toBase: 0.001, decimals: 1 },
    { id: "cm",  symbol: "cm",  name: "Centimeters",   regions: ["EU","BR","MX","AR","CL","CO","PE","IN","JP","DE","FR","IT","ES","PT"], toBase: 0.01, decimals: 2 },
    { id: "dm",  symbol: "dm",  name: "Decimeters",    toBase: 0.1, decimals: 2 },
    { id: "m",   symbol: "m",   name: "Meters",        isBase: true, toBase: 1, decimals: 4 },
    { id: "hm",  symbol: "hm",  name: "Hectometers",   toBase: 100, decimals: 4 },
    { id: "km",  symbol: "km",  name: "Kilometers",    regions: ["EU","BR","MX","AR","CL","CO","PE","IN","JP","AU","NZ","DE","FR","IT","ES","PT"], toBase: 1000, decimals: 4 },

    // ── Imperial / US Customary ──
    { id: "mil",  symbol: "mil",  name: "Mils (Thou)",   toBase: 0.0000254, decimals: 1 },
    { id: "in",   symbol: "in",   name: "Inches",        regions: ["US","CA","GB","IE"], toBase: 0.0254, decimals: 3 },
    { id: "ft",   symbol: "ft",   name: "Feet",          regions: ["US","CA","GB","IE"], toBase: 0.3048, decimals: 3 },
    { id: "yd",   symbol: "yd",   name: "Yards",         regions: ["US","CA","GB"],      toBase: 0.9144, decimals: 3 },
    { id: "mi",   symbol: "mi",   name: "Miles",         regions: ["US","CA","GB","IE"], toBase: 1609.344, decimals: 4 },

    // ── Nautical / Maritime ──
    { id: "nmi",     symbol: "nmi",  name: "Nautical Miles",  toBase: 1852, decimals: 4 },
    { id: "fathom",  symbol: "ftm",  name: "Fathoms",         toBase: 1.8288, decimals: 3 },

    // ── Traditional / Niche ──
    { id: "furlong", symbol: "fur",  name: "Furlongs",        toBase: 201.168, decimals: 4 },

    // ── Astronomical ──
    { id: "au",  symbol: "AU",  name: "Astronomical Units", toBase: 149_597_870_700, decimals: 6 },
    { id: "ly",  symbol: "ly",  name: "Light-years",        toBase: 9_460_730_472_580_800, decimals: 6 },
  ],
};

export const LENGTH_SMALL: UnitGroup = {
  type: "length_small",
  name: "Length (Small)",
  baseUnit: "mm",
  category: "construction",
  units: [
    { id: "nm",  symbol: "nm",  name: "Nanometers",   toBase: 0.000001, decimals: 0 },
    { id: "um",  symbol: "µm",  name: "Micrometers",  toBase: 0.001, decimals: 1 },
    { id: "mil", symbol: "mil", name: "Mils (Thou)",  toBase: 0.0254, decimals: 2 },
    { id: "mm",  symbol: "mm",  name: "Millimeters",  regions: ["EU","BR","MX","AR","DE","FR","IT","ES","PT"], isBase: true, toBase: 1, decimals: 2 },
    { id: "cm",  symbol: "cm",  name: "Centimeters",  toBase: 10, decimals: 2 },
    { id: "in",  symbol: "in",  name: "Inches",       regions: ["US","CA","GB","IE"], toBase: 25.4, decimals: 3 },
  ],
};

export const LENGTH_LARGE: UnitGroup = {
  type: "length_large",
  name: "Distance",
  baseUnit: "km",
  category: "everyday",
  units: [
    { id: "m",       symbol: "m",    name: "Meters",          toBase: 0.001, decimals: 0 },
    { id: "km",      symbol: "km",   name: "Kilometers",      regions: ["EU","BR","MX","AR","CL","CO","PE","IN","JP","AU","NZ","DE","FR","IT","ES","PT"], isBase: true, toBase: 1, decimals: 2 },
    { id: "ft",      symbol: "ft",   name: "Feet",            regions: ["US","CA"],       toBase: 0.0003048, decimals: 0 },
    { id: "yd",      symbol: "yd",   name: "Yards",           toBase: 0.0009144, decimals: 0 },
    { id: "mi",      symbol: "mi",   name: "Miles",           regions: ["US","CA","GB","IE"], toBase: 1.609344, decimals: 2 },
    { id: "nmi",     symbol: "nmi",  name: "Nautical Miles",  toBase: 1.852, decimals: 3 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// AREA (EXPANDED: 9 → 14 units, LATAM-focused)
// ─────────────────────────────────────────────────────────────────────────────

export const AREA: UnitGroup = {
  type: "area",
  name: "Area",
  baseUnit: "m2",
  category: "construction",
  units: [
    { id: "mm2",      symbol: "mm²",  name: "Square Millimeters",   toBase: 0.000001, decimals: 1 },
    { id: "cm2",      symbol: "cm²",  name: "Square Centimeters",   toBase: 0.0001, decimals: 2 },
    { id: "m2",       symbol: "m²",   name: "Square Meters",        regions: ["EU","BR","MX","AR","CL","CO","PE","DE","FR","IT","ES","PT","IN","JP","AU","NZ"], isBase: true, toBase: 1, decimals: 2 },
    { id: "are",      symbol: "a",    name: "Ares",                 regions: ["EU","BR","MX","AR","CL","CO","PE","FR","DE","IT","ES","PT"], toBase: 100, decimals: 3 },
    { id: "hectares", symbol: "ha",   name: "Hectares",             regions: ["EU","BR","MX","AR","CL","CO","PE","FR","DE","IT","ES","PT","AU","NZ"], toBase: 10_000, decimals: 4 },
    { id: "km2",      symbol: "km²",  name: "Square Kilometers",    toBase: 1_000_000, decimals: 4 },

    // ── LATAM specific ──
    { id: "manzana",  symbol: "mz",   name: "Manzanas",             regions: ["SV","HN","NI","GT","CR"], toBase: 6987.295, decimals: 4 },
    { id: "fanegada", symbol: "fan",  name: "Fanegadas",            regions: ["CO"], toBase: 6400, decimals: 4 },
    { id: "cuadra",   symbol: "cda",  name: "Cuadras",              regions: ["AR","UY","PY"], toBase: 17_500, decimals: 4 },
    { id: "tarea",    symbol: "ta",   name: "Tareas",               regions: ["DO"], toBase: 628.86, decimals: 3 },

    // ── Imperial ──
    { id: "in2",      symbol: "in²",  name: "Square Inches",        regions: ["US","CA","GB"], toBase: 0.00064516, decimals: 2 },
    { id: "ft2",      symbol: "ft²",  name: "Square Feet",          regions: ["US","CA","GB","IE","IN"], toBase: 0.092903, decimals: 2 },
    { id: "yd2",      symbol: "yd²",  name: "Square Yards",         regions: ["US","CA","GB"],  toBase: 0.836127, decimals: 2 },
    { id: "acres",    symbol: "ac",   name: "Acres",                regions: ["US","CA","GB","IE","AU"], toBase: 4046.856, decimals: 4 },
    { id: "mi2",      symbol: "mi²",  name: "Square Miles",         regions: ["US","CA","GB"], toBase: 2_589_988, decimals: 4 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// VOLUME (EXPANDED: 11 → 16 units)
// ─────────────────────────────────────────────────────────────────────────────

export const VOLUME: UnitGroup = {
  type: "volume",
  name: "Volume",
  baseUnit: "L",
  category: "everyday",
  units: [
    { id: "mL",     symbol: "mL",     name: "Milliliters",        regions: ["EU","BR","MX","AR","CL","CO","PE","DE","FR","IT","ES","PT"], toBase: 0.001, decimals: 1 },
    { id: "cL",     symbol: "cL",     name: "Centiliters",        regions: ["FR","ES","IT","BE"], toBase: 0.01, decimals: 2 },
    { id: "dL",     symbol: "dL",     name: "Deciliters",         regions: ["SE","NO","FI"], toBase: 0.1, decimals: 2 },
    { id: "L",      symbol: "L",      name: "Liters",             regions: ["EU","BR","MX","AR","CL","CO","PE","AU","NZ","IN","JP","DE","FR","IT","ES","PT"], isBase: true, toBase: 1, decimals: 3 },
    { id: "m3",     symbol: "m³",     name: "Cubic Meters",       toBase: 1000, decimals: 4 },

    // ── US Customary ──
    { id: "tsp",    symbol: "tsp",    name: "Teaspoons (US)",     toBase: 0.00492892, decimals: 1 },
    { id: "tbsp",   symbol: "tbsp",   name: "Tablespoons (US)",   toBase: 0.0147868, decimals: 1 },
    { id: "fl_oz",  symbol: "fl oz",  name: "Fluid Ounces (US)",  regions: ["US","CA"], toBase: 0.0295735, decimals: 1 },
    { id: "cups",   symbol: "cups",   name: "Cups (US)",          regions: ["US","CA"], toBase: 0.236588, decimals: 2 },
    { id: "pt_us",  symbol: "pt",     name: "Pints (US)",         regions: ["US","CA"], toBase: 0.473176, decimals: 3 },
    { id: "qt_us",  symbol: "qt",     name: "Quarts (US)",        regions: ["US","CA"], toBase: 0.946353, decimals: 3 },
    { id: "gal_us", symbol: "gal",    name: "Gallons (US)",       regions: ["US","CA"], toBase: 3.78541, decimals: 3 },

    // ── Imperial ──
    { id: "pt_uk",  symbol: "pt",     name: "Pints (Imperial)",   regions: ["GB","IE"], toBase: 0.568261, decimals: 3 },
    { id: "qt_uk",  symbol: "qt",     name: "Quarts (Imperial)",  regions: ["GB","IE"], toBase: 1.13652, decimals: 3 },
    { id: "gal_uk", symbol: "gal",    name: "Gallons (Imperial)", regions: ["GB","IE"], toBase: 4.54609, decimals: 3 },

    // ── Cubic ──
    { id: "ft3",    symbol: "ft³",    name: "Cubic Feet",         regions: ["US","CA","GB"], toBase: 28.3168, decimals: 4 },
    { id: "yd3",    symbol: "yd³",    name: "Cubic Yards",        toBase: 764.555, decimals: 4 },
    { id: "in3",    symbol: "in³",    name: "Cubic Inches",       toBase: 0.0163871, decimals: 2 },
  ],
};

export const COOKING_VOLUME: UnitGroup = {
  type: "cooking_volume",
  name: "Cooking Volume",
  baseUnit: "mL",
  category: "cooking",
  units: [
    { id: "tsp",   symbol: "tsp",   name: "Teaspoons",    regions: ["US","CA","GB","AU"], toBase: 4.92892, decimals: 1 },
    { id: "tbsp",  symbol: "tbsp",  name: "Tablespoons",  regions: ["US","CA","GB","AU"], toBase: 14.7868, decimals: 1 },
    { id: "fl_oz", symbol: "fl oz", name: "Fluid Ounces", regions: ["US","CA"],           toBase: 29.5735, decimals: 1 },
    { id: "cups",  symbol: "cups",  name: "Cups",         regions: ["US","CA","AU"],      toBase: 236.588, decimals: 2 },
    { id: "mL",    symbol: "mL",    name: "Milliliters",  regions: ["EU","BR","MX","AR","CL","CO","PE","FR","DE","IT","ES","PT"], isBase: true, toBase: 1, decimals: 0 },
    { id: "L",     symbol: "L",     name: "Liters",       toBase: 1000, decimals: 3 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// CONSTRUCTION - SPECIALIZED
// ─────────────────────────────────────────────────────────────────────────────

export const CONSTRUCTION_VOLUME: UnitGroup = {
  type: "construction_volume",
  name: "Construction Volume",
  baseUnit: "m3",
  category: "construction",
  units: [
    { id: "m3",     symbol: "m³",    name: "Cubic Meters",  regions: ["EU","BR","MX","AR","CL","CO","PE","DE","FR","IT","ES","PT"], isBase: true, toBase: 1, decimals: 2 },
    { id: "ft3",    symbol: "ft³",   name: "Cubic Feet",    regions: ["US","CA","GB"], toBase: 0.0283168, decimals: 2 },
    { id: "yd3",    symbol: "yd³",   name: "Cubic Yards",   regions: ["US","CA"],      toBase: 0.764555, decimals: 2 },
    { id: "L",      symbol: "L",     name: "Liters",        toBase: 0.001, decimals: 1 },
    { id: "gal_us", symbol: "gal",   name: "Gallons (US)",  regions: ["US","CA"], toBase: 0.00378541, decimals: 3 },
  ],
};

export const LUMBER: UnitGroup = {
  type: "lumber",
  name: "Lumber",
  baseUnit: "bdft",
  category: "construction",
  units: [
    { id: "bdft",  symbol: "bd ft",  name: "Board Feet",   regions: ["US","CA"], isBase: true, toBase: 1, decimals: 1 },
    { id: "lnft",  symbol: "ln ft",  name: "Linear Feet",  regions: ["US","CA"], toBase: 1, decimals: 1 },
    { id: "m3",    symbol: "m³",     name: "Cubic Meters",  regions: ["EU","BR","MX"], toBase: 423.776, decimals: 4 },
    { id: "ft3",   symbol: "ft³",    name: "Cubic Feet",    toBase: 12, decimals: 2 },
  ],
};

export const ROOFING: UnitGroup = {
  type: "roofing",
  name: "Roofing Area",
  baseUnit: "sq",
  category: "construction",
  units: [
    { id: "sq",   symbol: "sq",   name: "Squares (100ft²)", regions: ["US","CA"], isBase: true, toBase: 1, decimals: 1 },
    { id: "ft2",  symbol: "ft²",  name: "Square Feet",      regions: ["US","CA","GB"], toBase: 0.01, decimals: 0 },
    { id: "m2",   symbol: "m²",   name: "Square Meters",    regions: ["EU","BR","MX","AR","CL","CO","PE"], toBase: 0.107639, decimals: 2 },
    { id: "yd2",  symbol: "yd²",  name: "Square Yards",     toBase: 0.111111, decimals: 2 },
  ],
};

export const SLOPE: UnitGroup = {
  type: "slope",
  name: "Slope / Grade",
  baseUnit: "pct",
  category: "construction",
  units: [
    { id: "pct",  symbol: "%",    name: "Percent Grade",  isBase: true, toBase: 1, decimals: 1 },
    {
      id: "deg",  symbol: "°",    name: "Degrees",
      decimals: 2,
      toBaseFn: (v) => Math.tan((v * Math.PI) / 180) * 100,
      fromBaseFn: (v) => (Math.atan(v / 100) * 180) / Math.PI,
    },
    {
      id: "ratio", symbol: "rise:run", name: "Rise over Run (1:X)",
      decimals: 1,
      toBaseFn: (v) => v > 0 ? (1 / v) * 100 : 0,
      fromBaseFn: (v) => v > 0 ? 100 / v : 0,
    },
  ],
};

export const PIPE_DIAMETER: UnitGroup = {
  type: "pipe_diameter",
  name: "Pipe Diameter",
  baseUnit: "mm",
  category: "construction",
  units: [
    { id: "mm",  symbol: "mm",  name: "Millimeters", regions: ["EU","BR","MX","AR","CL","CO","PE","DE","FR","IT","ES","PT"], isBase: true, toBase: 1, decimals: 1 },
    { id: "cm",  symbol: "cm",  name: "Centimeters", toBase: 10, decimals: 2 },
    { id: "in",  symbol: "in",  name: "Inches",      regions: ["US","CA","GB","IE"], toBase: 25.4, decimals: 3 },
  ],
};

export const COVERAGE_RATE: UnitGroup = {
  type: "coverage_rate",
  name: "Coverage Rate",
  baseUnit: "m2L",
  category: "construction",
  units: [
    { id: "m2L",    symbol: "m²/L",    name: "Sq Meters per Liter",  regions: ["EU","BR","MX","AR","CL","CO","PE"], isBase: true, toBase: 1, decimals: 1 },
    { id: "ft2gal", symbol: "ft²/gal", name: "Sq Feet per Gallon",   regions: ["US","CA","GB"], toBase: 0.02454, decimals: 0 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// MASS (EXPANDED: 7 → 12 units)
// ─────────────────────────────────────────────────────────────────────────────

export const MASS: UnitGroup = {
  type: "mass",
  name: "Mass",
  baseUnit: "kg",
  category: "physics",
  units: [
    { id: "ug",          symbol: "µg",  name: "Micrograms",       toBase: 1e-9, decimals: 0 },
    { id: "mg",          symbol: "mg",  name: "Milligrams",       toBase: 0.000001, decimals: 2 },
    { id: "g",           symbol: "g",   name: "Grams",            regions: ["EU","BR","MX","AR","CL","CO","PE","DE","FR","IT","ES","PT"], toBase: 0.001, decimals: 2 },
    { id: "kg",          symbol: "kg",  name: "Kilograms",        regions: ["EU","BR","MX","AR","CL","CO","PE","IN","JP","AU","NZ","DE","FR","IT","ES","PT"], isBase: true, toBase: 1, decimals: 3 },
    { id: "oz",          symbol: "oz",  name: "Ounces",           regions: ["US","CA","GB"], toBase: 0.0283495, decimals: 2 },
    { id: "lbs",         symbol: "lb",  name: "Pounds",           regions: ["US","CA","LR","MM"], toBase: 0.453592, decimals: 2 },
    { id: "st",          symbol: "st",  name: "Stones",           regions: ["GB","IE"], toBase: 6.35029, decimals: 2 },
    { id: "carat",       symbol: "ct",  name: "Carats",           toBase: 0.0002, decimals: 2 },
    { id: "ton_metric",  symbol: "t",   name: "Metric Tons",      regions: ["EU","BR","MX","AR","CL","CO","PE","IN","AU"], toBase: 1000, decimals: 4 },
    { id: "ton_us",      symbol: "ton", name: "Short Tons (US)",  regions: ["US","CA"], toBase: 907.185, decimals: 4 },
    { id: "ton_uk",      symbol: "ton", name: "Long Tons (UK)",   regions: ["GB"], toBase: 1016.047, decimals: 4 },
    { id: "quintal",     symbol: "q",   name: "Quintals",         regions: ["FR","DE","IT","ES","PT","BR","AR"], toBase: 100, decimals: 3 },
  ],
};

export const MASS_HEAVY: UnitGroup = {
  type: "mass_heavy",
  name: "Heavy Mass",
  baseUnit: "kg",
  category: "construction",
  units: [
    { id: "kg",         symbol: "kg",  name: "Kilograms",       regions: ["EU","BR","MX","AR","CL","CO","PE","IN","JP","AU","NZ"], isBase: true, toBase: 1, decimals: 1 },
    { id: "lbs",        symbol: "lb",  name: "Pounds",          regions: ["US","CA","LR","MM"], toBase: 0.453592, decimals: 1 },
    { id: "ton_metric", symbol: "t",   name: "Metric Tons",     regions: ["EU","BR","MX","AR","CL","CO","PE","AU"], toBase: 1000, decimals: 3 },
    { id: "ton_us",     symbol: "ton", name: "Short Tons (US)", regions: ["US","CA"], toBase: 907.185, decimals: 3 },
    { id: "ton_uk",     symbol: "ton", name: "Long Tons (UK)",  regions: ["GB"], toBase: 1016.047, decimals: 3 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// TEMPERATURE (EXPANDED: 3 → 4 units)
// ─────────────────────────────────────────────────────────────────────────────

export const TEMPERATURE: UnitGroup = {
  type: "temperature",
  name: "Temperature",
  baseUnit: "C",
  category: "physics",
  units: [
    {
      id: "C", symbol: "°C", name: "Celsius",
      regions: ["EU","BR","MX","AR","CL","CO","PE","GB","AU","NZ","IN","JP","DE","FR","IT","ES","PT"],
      isBase: true, decimals: 1,
      toBaseFn: (v) => v,
      fromBaseFn: (v) => v,
    },
    {
      id: "F", symbol: "°F", name: "Fahrenheit", regions: ["US","LR","MM"],
      decimals: 1,
      toBaseFn: (v) => (v - 32) * 5 / 9,
      fromBaseFn: (v) => v * 9 / 5 + 32,
    },
    {
      id: "K", symbol: "K", name: "Kelvin",
      decimals: 2,
      toBaseFn: (v) => v - 273.15,
      fromBaseFn: (v) => v + 273.15,
    },
    {
      id: "R", symbol: "°R", name: "Rankine",
      decimals: 2,
      toBaseFn: (v) => (v - 491.67) * 5 / 9,
      fromBaseFn: (v) => (v * 9 / 5) + 491.67,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// SPEED (EXPANDED: 5 → 7 units)
// ─────────────────────────────────────────────────────────────────────────────

export const SPEED: UnitGroup = {
  type: "speed",
  name: "Speed",
  baseUnit: "ms",
  category: "physics",
  units: [
    { id: "ms",    symbol: "m/s",  name: "Meters/second",   regions: ["EU","BR","MX","AR","CL","CO","PE"], isBase: true, toBase: 1, decimals: 2 },
    { id: "kmh",   symbol: "km/h", name: "Kilometers/hour", regions: ["EU","BR","MX","AR","CL","CO","PE","AU","NZ","IN","JP","DE","FR","IT","ES","PT"], toBase: 0.277778, decimals: 1 },
    { id: "mph",   symbol: "mph",  name: "Miles/hour",      regions: ["US","CA","GB","IE"], toBase: 0.44704, decimals: 1 },
    { id: "fts",   symbol: "ft/s", name: "Feet/second",     regions: ["US","CA"], toBase: 0.3048, decimals: 2 },
    { id: "knots", symbol: "kn",   name: "Knots",           toBase: 0.514444, decimals: 2 },
    { id: "mach",  symbol: "Ma",   name: "Mach (at sea level)", toBase: 343, decimals: 4 },
    { id: "c",     symbol: "c",    name: "Speed of Light",  toBase: 299_792_458, decimals: 10 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PACE (Running / Walking — time per distance unit)
// ─────────────────────────────────────────────────────────────────────────────
// Base unit: min/km (most universal for running)
// Conversion: 1 min/km × 1.609344 = 1.609344 min/mi
// Example: 5:00 min/km = 8:03 min/mi

export const PACE: UnitGroup = {
  type: "pace",
  name: "Pace",
  baseUnit: "min_km",
  category: "health",
  units: [
    { id: "min_km",  symbol: "min/km",  name: "Minutes per Kilometer", regions: ["EU","BR","MX","AR","CL","CO","PE","IN","JP","AU","NZ","DE","FR","IT","ES","PT"], isBase: true, toBase: 1, decimals: 2 },
    { id: "min_mi",  symbol: "min/mi",  name: "Minutes per Mile",      regions: ["US","CA","GB","IE"], toBase: 0.621371, decimals: 2 },
    { id: "min_100m", symbol: "min/100m", name: "Minutes per 100m",    toBase: 10, decimals: 2 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// RACE DISTANCE (Common running/cycling distances)
// ─────────────────────────────────────────────────────────────────────────────
// Base unit: km
// Only common race distances — for free-form use length_large

export const RACE_DISTANCE: UnitGroup = {
  type: "race_distance",
  name: "Race Distance",
  baseUnit: "km",
  category: "health",
  units: [
    { id: "km",  symbol: "km",  name: "Kilometers", regions: ["EU","BR","MX","AR","CL","CO","PE","IN","JP","AU","NZ","DE","FR","IT","ES","PT"], isBase: true, toBase: 1, decimals: 2 },
    { id: "mi",  symbol: "mi",  name: "Miles",      regions: ["US","CA","GB","IE"], toBase: 1.609344, decimals: 2 },
    { id: "m",   symbol: "m",   name: "Meters",     toBase: 0.001, decimals: 0 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// TIME / DURATION
// ─────────────────────────────────────────────────────────────────────────────

export const TIME: UnitGroup = {
  type: "time",
  name: "Time",
  baseUnit: "s",
  category: "everyday",
  units: [
    { id: "ns",  symbol: "ns",  name: "Nanoseconds",  toBase: 1e-9, decimals: 0 },
    { id: "us",  symbol: "µs",  name: "Microseconds", toBase: 1e-6, decimals: 0 },
    { id: "ms",  symbol: "ms",  name: "Milliseconds", toBase: 0.001, decimals: 0 },
    { id: "s",   symbol: "s",   name: "Seconds",      isBase: true, toBase: 1, decimals: 2 },
    { id: "min", symbol: "min", name: "Minutes",       toBase: 60, decimals: 2 },
    { id: "h",   symbol: "h",   name: "Hours",         toBase: 3600, decimals: 3 },
    { id: "d",   symbol: "d",   name: "Days",          toBase: 86400, decimals: 3 },
    { id: "wk",  symbol: "wk",  name: "Weeks",         toBase: 604800, decimals: 3 },
  ],
};

export const DURATION: UnitGroup = {
  type: "duration",
  name: "Duration",
  baseUnit: "days",
  category: "everyday",
  units: [
    { id: "days",   symbol: "days", name: "Days",   isBase: true, toBase: 1, decimals: 0 },
    { id: "weeks",  symbol: "wk",   name: "Weeks",  toBase: 7, decimals: 1 },
    { id: "months", symbol: "mo",   name: "Months", toBase: 30.4375, decimals: 1 },
    { id: "years",  symbol: "yr",   name: "Years",  toBase: 365.25, decimals: 2 },
  ],
};

export const DURATION_LONG: UnitGroup = {
  type: "duration_long",
  name: "Loan/Investment Term",
  baseUnit: "months",
  category: "finance",
  units: [
    { id: "months", symbol: "mo", name: "Months", isBase: true, toBase: 1, decimals: 0 },
    { id: "years",  symbol: "yr", name: "Years",  toBase: 12, decimals: 1 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// ENERGY (already solid)
// ─────────────────────────────────────────────────────────────────────────────

export const ENERGY: UnitGroup = {
  type: "energy",
  name: "Energy",
  baseUnit: "J",
  category: "physics",
  units: [
    { id: "J",    symbol: "J",    name: "Joules",         isBase: true, toBase: 1, decimals: 2 },
    { id: "kJ",   symbol: "kJ",   name: "Kilojoules",    toBase: 1000, decimals: 3 },
    { id: "MJ",   symbol: "MJ",   name: "Megajoules",    toBase: 1_000_000, decimals: 4 },
    { id: "cal",  symbol: "cal",  name: "Calories",       toBase: 4.184, decimals: 2 },
    { id: "kcal", symbol: "kcal", name: "Kilocalories",   toBase: 4184, decimals: 3 },
    { id: "BTU",  symbol: "BTU",  name: "BTU",            regions: ["US","CA","GB"], toBase: 1055.06, decimals: 2 },
    { id: "kWh",  symbol: "kWh",  name: "Kilowatt-hours", toBase: 3_600_000, decimals: 4 },
    { id: "Wh",   symbol: "Wh",   name: "Watt-hours",    toBase: 3600, decimals: 3 },
    { id: "eV",   symbol: "eV",   name: "Electronvolts",  toBase: 1.602176634e-19, decimals: 4 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// POWER (EXPANDED: 5 → 7 units)
// ─────────────────────────────────────────────────────────────────────────────

export const POWER: UnitGroup = {
  type: "power",
  name: "Power",
  baseUnit: "W",
  category: "physics",
  units: [
    { id: "mW",   symbol: "mW",    name: "Milliwatts",     toBase: 0.001, decimals: 1 },
    { id: "W",    symbol: "W",     name: "Watts",          isBase: true, toBase: 1, decimals: 2 },
    { id: "kW",   symbol: "kW",    name: "Kilowatts",      toBase: 1000, decimals: 3 },
    { id: "MW",   symbol: "MW",    name: "Megawatts",      toBase: 1_000_000, decimals: 4 },
    { id: "HP",   symbol: "HP",    name: "Horsepower",     regions: ["US","CA","GB"], toBase: 745.7, decimals: 3 },
    { id: "PS",   symbol: "PS",    name: "Pferdestärke",   regions: ["DE","JP"], toBase: 735.499, decimals: 3 },
    { id: "BTUh", symbol: "BTU/h", name: "BTU per hour",   regions: ["US","CA"], toBase: 0.293071, decimals: 2 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PRESSURE (already solid)
// ─────────────────────────────────────────────────────────────────────────────

export const PRESSURE: UnitGroup = {
  type: "pressure",
  name: "Pressure",
  baseUnit: "Pa",
  category: "physics",
  units: [
    { id: "Pa",   symbol: "Pa",   name: "Pascals",           isBase: true, toBase: 1, decimals: 0 },
    { id: "hPa",  symbol: "hPa",  name: "Hectopascals",      toBase: 100, decimals: 1 },
    { id: "kPa",  symbol: "kPa",  name: "Kilopascals",       toBase: 1000, decimals: 3 },
    { id: "MPa",  symbol: "MPa",  name: "Megapascals",       toBase: 1_000_000, decimals: 4 },
    { id: "bar",  symbol: "bar",  name: "Bar",               regions: ["EU","BR","MX","AR","DE","FR","IT","ES","PT"], toBase: 100_000, decimals: 4 },
    { id: "mbar", symbol: "mbar", name: "Millibar",          toBase: 100, decimals: 1 },
    { id: "psi",  symbol: "psi",  name: "PSI",               regions: ["US","CA","GB"], toBase: 6894.76, decimals: 2 },
    { id: "atm",  symbol: "atm",  name: "Atmospheres",       toBase: 101_325, decimals: 4 },
    { id: "mmHg", symbol: "mmHg", name: "mmHg (Torr)",       toBase: 133.322, decimals: 1 },
    { id: "inHg", symbol: "inHg", name: "Inches of Mercury", regions: ["US","CA"], toBase: 3386.39, decimals: 2 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// FORCE (already solid)
// ─────────────────────────────────────────────────────────────────────────────

export const FORCE: UnitGroup = {
  type: "force",
  name: "Force",
  baseUnit: "N",
  category: "physics",
  units: [
    { id: "mN",  symbol: "mN",  name: "Millinewtons",   toBase: 0.001, decimals: 1 },
    { id: "N",   symbol: "N",   name: "Newtons",        isBase: true, toBase: 1, decimals: 3 },
    { id: "kN",  symbol: "kN",  name: "Kilonewtons",    toBase: 1000, decimals: 4 },
    { id: "lbf", symbol: "lbf", name: "Pound-force",    regions: ["US","CA","GB"], toBase: 4.44822, decimals: 3 },
    { id: "kgf", symbol: "kgf", name: "Kilogram-force", toBase: 9.80665, decimals: 3 },
    { id: "dyn", symbol: "dyn", name: "Dynes",          toBase: 0.00001, decimals: 0 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// ANGLES (already solid)
// ─────────────────────────────────────────────────────────────────────────────

export const ANGLE: UnitGroup = {
  type: "angle",
  name: "Angle",
  baseUnit: "deg",
  category: "math",
  units: [
    { id: "deg",     symbol: "°",     name: "Degrees",      isBase: true, toBase: 1, decimals: 2 },
    { id: "rad",     symbol: "rad",   name: "Radians",      toBase: 57.2958, decimals: 4 },
    { id: "grad",    symbol: "grad",  name: "Gradians",     toBase: 0.9, decimals: 2 },
    { id: "arcmin",  symbol: "′",     name: "Arcminutes",   toBase: 1/60, decimals: 2 },
    { id: "arcsec",  symbol: "″",     name: "Arcseconds",   toBase: 1/3600, decimals: 2 },
    { id: "turn",    symbol: "turn",  name: "Turns (rev)",  toBase: 360, decimals: 4 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// DATA / DIGITAL (EXPANDED: 5 → 12 units with IEC binary)
// ─────────────────────────────────────────────────────────────────────────────

export const DATA: UnitGroup = {
  type: "data",
  name: "Data Size",
  baseUnit: "byte",
  category: "digital",
  units: [
    // ── Bits ──
    { id: "bit",  symbol: "bit",  name: "Bits",         toBase: 0.125, decimals: 0 },

    // ── Decimal (SI) — IDs lowercase, symbols keep proper notation ──
    { id: "byte", symbol: "B",    name: "Bytes",         isBase: true, toBase: 1, decimals: 0 },
    { id: "kb",   symbol: "KB",   name: "Kilobytes",     toBase: 1000, decimals: 2 },
    { id: "mb",   symbol: "MB",   name: "Megabytes",     toBase: 1_000_000, decimals: 2 },
    { id: "gb",   symbol: "GB",   name: "Gigabytes",     toBase: 1_000_000_000, decimals: 3 },
    { id: "tb",   symbol: "TB",   name: "Terabytes",     toBase: 1_000_000_000_000, decimals: 4 },
    { id: "pb",   symbol: "PB",   name: "Petabytes",     toBase: 1_000_000_000_000_000, decimals: 4 },

    // ── Binary (IEC) ──
    { id: "kib",  symbol: "KiB",  name: "Kibibytes",     toBase: 1024, decimals: 2 },
    { id: "mib",  symbol: "MiB",  name: "Mebibytes",     toBase: 1_048_576, decimals: 2 },
    { id: "gib",  symbol: "GiB",  name: "Gibibytes",     toBase: 1_073_741_824, decimals: 3 },
    { id: "tib",  symbol: "TiB",  name: "Tebibytes",     toBase: 1_099_511_627_776, decimals: 4 },
    { id: "pib",  symbol: "PiB",  name: "Pebibytes",     toBase: 1_125_899_906_842_624, decimals: 4 },
  ],
};

export const DATA_RATE: UnitGroup = {
  type: "data_rate",
  name: "Data Rate",
  baseUnit: "bps",
  category: "digital",
  units: [
    // ── Bits per second (lowercase IDs — what devs naturally type) ──
    { id: "bps",     symbol: "bps",   name: "Bits/second",      isBase: true, toBase: 1, decimals: 0 },
    { id: "kbps",    symbol: "Kbps",  name: "Kilobits/second",  toBase: 1000, decimals: 2 },
    { id: "mbps",    symbol: "Mbps",  name: "Megabits/second",  toBase: 1_000_000, decimals: 2 },
    { id: "gbps",    symbol: "Gbps",  name: "Gigabits/second",  toBase: 1_000_000_000, decimals: 3 },

    // ── Bytes per second (suffix _s to avoid confusion with bits) ──
    { id: "byte_s",  symbol: "B/s",   name: "Bytes/second",     toBase: 8, decimals: 0 },
    { id: "kb_s",    symbol: "KB/s",  name: "Kilobytes/second", toBase: 8000, decimals: 2 },
    { id: "mb_s",    symbol: "MB/s",  name: "Megabytes/second", toBase: 8_000_000, decimals: 2 },
    { id: "gb_s",    symbol: "GB/s",  name: "Gigabytes/second", toBase: 8_000_000_000, decimals: 3 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// FUEL ECONOMY (already solid)
// ─────────────────────────────────────────────────────────────────────────────

export const FUEL_ECONOMY: UnitGroup = {
  type: "fuel_economy",
  name: "Fuel Economy",
  baseUnit: "L100km",
  category: "everyday",
  units: [
    {
      id: "L100km", symbol: "L/100km", name: "Liters per 100km",
      regions: ["EU","BR","MX","AR","CL","CO","PE","AU","DE","FR","IT","ES","PT"],
      isBase: true, decimals: 1,
      toBaseFn: (v) => v,
      fromBaseFn: (v) => v,
    },
    {
      id: "kmL", symbol: "km/L", name: "Kilometers per liter",
      regions: ["BR","JP","IN"],
      decimals: 1,
      toBaseFn: (v) => v > 0 ? 100 / v : 0,
      fromBaseFn: (v) => v > 0 ? 100 / v : 0,
    },
    {
      id: "mpg_us", symbol: "mpg", name: "Miles per gallon (US)",
      regions: ["US","CA"],
      decimals: 1,
      toBaseFn: (v) => v > 0 ? 235.215 / v : 0,
      fromBaseFn: (v) => v > 0 ? 235.215 / v : 0,
    },
    {
      id: "mpg_uk", symbol: "mpg", name: "Miles per gallon (UK)",
      regions: ["GB","IE"],
      decimals: 1,
      toBaseFn: (v) => v > 0 ? 282.481 / v : 0,
      fromBaseFn: (v) => v > 0 ? 282.481 / v : 0,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// DENSITY (already solid)
// ─────────────────────────────────────────────────────────────────────────────

export const DENSITY: UnitGroup = {
  type: "density",
  name: "Density",
  baseUnit: "kgm3",
  category: "physics",
  units: [
    { id: "kgm3",  symbol: "kg/m³",  name: "Kilograms per m³", isBase: true, toBase: 1, decimals: 2 },
    { id: "gcm3",  symbol: "g/cm³",  name: "Grams per cm³",    toBase: 1000, decimals: 4 },
    { id: "gml",   symbol: "g/mL",   name: "Grams per mL",     toBase: 1000, decimals: 4 },
    { id: "lbft3", symbol: "lb/ft³", name: "Pounds per ft³",   regions: ["US","CA","GB"], toBase: 16.0185, decimals: 3 },
    { id: "gL",    symbol: "g/L",    name: "Grams per liter",  toBase: 1, decimals: 2 },
    { id: "kgL",   symbol: "kg/L",   name: "Kilograms per liter", toBase: 1000, decimals: 4 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// ELECTRICAL
// ─────────────────────────────────────────────────────────────────────────────

export const VOLTAGE: UnitGroup = {
  type: "voltage",
  name: "Voltage",
  baseUnit: "V",
  category: "physics",
  units: [
    { id: "uV", symbol: "µV", name: "Microvolts", toBase: 0.000001, decimals: 0 },
    { id: "mV", symbol: "mV", name: "Millivolts", toBase: 0.001, decimals: 1 },
    { id: "V",  symbol: "V",  name: "Volts",      isBase: true, toBase: 1, decimals: 3 },
    { id: "kV", symbol: "kV", name: "Kilovolts",  toBase: 1000, decimals: 4 },
    { id: "MV", symbol: "MV", name: "Megavolts",  toBase: 1_000_000, decimals: 4 },
  ],
};

export const CURRENT: UnitGroup = {
  type: "current",
  name: "Electric Current",
  baseUnit: "A",
  category: "physics",
  units: [
    { id: "nA", symbol: "nA", name: "Nanoamperes",  toBase: 1e-9, decimals: 0 },
    { id: "uA", symbol: "µA", name: "Microamperes", toBase: 0.000001, decimals: 1 },
    { id: "mA", symbol: "mA", name: "Milliamperes", toBase: 0.001, decimals: 2 },
    { id: "A",  symbol: "A",  name: "Amperes",      isBase: true, toBase: 1, decimals: 3 },
    { id: "kA", symbol: "kA", name: "Kiloamperes",  toBase: 1000, decimals: 4 },
  ],
};

export const RESISTANCE: UnitGroup = {
  type: "resistance",
  name: "Resistance",
  baseUnit: "ohm",
  category: "physics",
  units: [
    { id: "mohm", symbol: "mΩ", name: "Milliohms", toBase: 0.001, decimals: 1 },
    { id: "ohm",  symbol: "Ω",  name: "Ohms",      isBase: true, toBase: 1, decimals: 2 },
    { id: "kohm", symbol: "kΩ", name: "Kilohms",   toBase: 1000, decimals: 3 },
    { id: "Mohm", symbol: "MΩ", name: "Megaohms",  toBase: 1_000_000, decimals: 4 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// FLOW RATE (already solid)
// ─────────────────────────────────────────────────────────────────────────────

export const FLOW_RATE: UnitGroup = {
  type: "flow_rate",
  name: "Flow Rate",
  baseUnit: "Lmin",
  category: "construction",
  units: [
    { id: "mLmin",   symbol: "mL/min",  name: "Milliliters/min",  toBase: 0.001, decimals: 1 },
    { id: "Lmin",    symbol: "L/min",   name: "Liters/minute",    isBase: true, toBase: 1, decimals: 2 },
    { id: "Lh",      symbol: "L/h",     name: "Liters/hour",      toBase: 1/60, decimals: 2 },
    { id: "m3h",     symbol: "m³/h",    name: "Cubic m/hour",     toBase: 1000/60, decimals: 4 },
    { id: "gal_min", symbol: "gal/min", name: "Gallons/min (US)", regions: ["US","CA"], toBase: 3.78541, decimals: 3 },
    { id: "cfm",     symbol: "CFM",     name: "Cubic feet/min",   regions: ["US","CA","GB"], toBase: 28.3168/60, decimals: 3 },
  ],
};


// ─────────────────────────────────────────────────────────────────────────────
// FINANCE - Payment Frequency (EXPANDED: 6 → 9 options)
// ─────────────────────────────────────────────────────────────────────────────

export const FREQUENCY: UnitGroup = {
  type: "frequency",
  name: "Payment Frequency",
  baseUnit: "monthly",
  category: "finance",
  units: [
    { id: "daily",        symbol: "daily",        name: "Daily",          toBase: 1/30.4375, decimals: 4 },
    { id: "weekly",       symbol: "weekly",       name: "Weekly",         toBase: 7/30.4375, decimals: 3 },
    { id: "biweekly",     symbol: "bi-weekly",    name: "Bi-weekly",      toBase: 14/30.4375, decimals: 3 },
    { id: "semimonthly",  symbol: "semi-monthly", name: "Semi-monthly",   toBase: 0.5, decimals: 2 },
    { id: "monthly",      symbol: "monthly",      name: "Monthly",        isBase: true, toBase: 1, decimals: 2 },
    { id: "bimonthly",    symbol: "bi-monthly",   name: "Bi-monthly",     toBase: 2, decimals: 2 },
    { id: "quarterly",    symbol: "quarterly",    name: "Quarterly",      toBase: 3, decimals: 2 },
    { id: "semiannually", symbol: "semi-annually",name: "Semi-annually",  toBase: 6, decimals: 2 },
    { id: "annually",     symbol: "annually",     name: "Annually",       toBase: 12, decimals: 2 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// FINANCE - Interest Rate Period (EXPANDED: 2 → 7 options)
// ─────────────────────────────────────────────────────────────────────────────

export const INTEREST_PERIOD: UnitGroup = {
  type: "interest_period",
  name: "Interest Rate Period",
  baseUnit: "annual",
  category: "finance",
  units: [
    { id: "daily",        symbol: "% daily",         name: "Daily Rate",       toBase: 365, decimals: 6 },
    { id: "weekly",       symbol: "% weekly",        name: "Weekly Rate",      toBase: 52, decimals: 5 },
    { id: "biweekly",     symbol: "% bi-weekly",     name: "Bi-weekly Rate",   toBase: 26, decimals: 4 },
    { id: "monthly",      symbol: "% monthly",       name: "Monthly Rate",     toBase: 12, decimals: 4 },
    { id: "quarterly",    symbol: "% quarterly",     name: "Quarterly Rate",   toBase: 4, decimals: 3 },
    { id: "semiannually", symbol: "% semi-annually", name: "Semi-annual Rate", toBase: 2, decimals: 3 },
    { id: "annual",       symbol: "% APR",           name: "Annual Rate (APR)",isBase: true, toBase: 1, decimals: 2 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// FINANCE - Compounding Frequency ★ NEW
// ─────────────────────────────────────────────────────────────────────────────

export const COMPOUNDING_FREQUENCY: UnitGroup = {
  type: "compounding_frequency",
  name: "Compounding Frequency",
  baseUnit: "annually",
  category: "finance",
  units: [
    { id: "continuously", symbol: "Continuously", name: "Continuously (e^rt)", toBase: Infinity, decimals: 6 },
    { id: "daily",        symbol: "Daily",        name: "Daily (365/yr)",      toBase: 365, decimals: 4 },
    { id: "weekly",       symbol: "Weekly",       name: "Weekly (52/yr)",      toBase: 52, decimals: 3 },
    { id: "biweekly",     symbol: "Bi-weekly",    name: "Bi-weekly (26/yr)",   toBase: 26, decimals: 3 },
    { id: "semimonthly",  symbol: "Semi-monthly", name: "Semi-monthly (24/yr)",toBase: 24, decimals: 3 },
    { id: "monthly",      symbol: "Monthly",      name: "Monthly (12/yr)",     toBase: 12, decimals: 2 },
    { id: "bimonthly",    symbol: "Bi-monthly",   name: "Bi-monthly (6/yr)",   toBase: 6, decimals: 2 },
    { id: "quarterly",    symbol: "Quarterly",    name: "Quarterly (4/yr)",    toBase: 4, decimals: 2 },
    { id: "semiannually", symbol: "Semi-annually",name: "Semi-annually (2/yr)",toBase: 2, decimals: 2 },
    { id: "annually",     symbol: "Annually",     name: "Annually (1/yr)",     isBase: true, toBase: 1, decimals: 2 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// FINANCE - Loan Term ★ NEW
// ─────────────────────────────────────────────────────────────────────────────

export const LOAN_TERM: UnitGroup = {
  type: "loan_term",
  name: "Loan Term",
  baseUnit: "months",
  category: "finance",
  units: [
    { id: "months", symbol: "months", name: "Months", isBase: true, toBase: 1, decimals: 0 },
    { id: "years",  symbol: "years",  name: "Years",  toBase: 12, decimals: 1 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// FINANCE - Investment Return Period ★ NEW
// ─────────────────────────────────────────────────────────────────────────────

export const RETURN_PERIOD: UnitGroup = {
  type: "return_period",
  name: "Return Period",
  baseUnit: "annual",
  category: "finance",
  units: [
    { id: "daily",     symbol: "daily",     name: "Daily Return",     toBase: 365, decimals: 6 },
    { id: "weekly",    symbol: "weekly",    name: "Weekly Return",    toBase: 52, decimals: 4 },
    { id: "monthly",   symbol: "monthly",   name: "Monthly Return",   toBase: 12, decimals: 3 },
    { id: "quarterly", symbol: "quarterly", name: "Quarterly Return", toBase: 4, decimals: 3 },
    { id: "annual",    symbol: "annual",    name: "Annual Return",    isBase: true, toBase: 1, decimals: 2 },
    { id: "total",     symbol: "total",     name: "Total Return",     toBase: 0, decimals: 2 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// FINANCE - Savings Goal Timeline ★ NEW
// ─────────────────────────────────────────────────────────────────────────────

export const SAVINGS_TIMELINE: UnitGroup = {
  type: "savings_timeline",
  name: "Savings Timeline",
  baseUnit: "months",
  category: "finance",
  units: [
    { id: "weeks",  symbol: "weeks",  name: "Weeks",  toBase: 0.25, decimals: 0 },
    { id: "months", symbol: "months", name: "Months", isBase: true, toBase: 1, decimals: 0 },
    { id: "years",  symbol: "years",  name: "Years",  toBase: 12, decimals: 1 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// FINANCE - Debt Payoff Timeline ★ NEW
// ─────────────────────────────────────────────────────────────────────────────

export const DEBT_TIMELINE: UnitGroup = {
  type: "debt_timeline",
  name: "Debt Payoff Timeline",
  baseUnit: "months",
  category: "finance",
  units: [
    { id: "months", symbol: "months", name: "Months", isBase: true, toBase: 1, decimals: 0 },
    { id: "years",  symbol: "years",  name: "Years",  toBase: 12, decimals: 1 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// FINANCE - Income/Salary Frequency ★ NEW
// ─────────────────────────────────────────────────────────────────────────────

export const INCOME_FREQUENCY: UnitGroup = {
  type: "income_frequency",
  name: "Income Frequency",
  baseUnit: "annually",
  category: "finance",
  units: [
    { id: "hourly",       symbol: "hourly",       name: "Hourly",        toBase: 2080, decimals: 2 },
    { id: "daily",        symbol: "daily",        name: "Daily",         toBase: 260, decimals: 2 },
    { id: "weekly",       symbol: "weekly",       name: "Weekly",        toBase: 52, decimals: 2 },
    { id: "biweekly",     symbol: "bi-weekly",    name: "Bi-weekly",     toBase: 26, decimals: 2 },
    { id: "semimonthly",  symbol: "semi-monthly", name: "Semi-monthly",  toBase: 24, decimals: 2 },
    { id: "monthly",      symbol: "monthly",      name: "Monthly",       toBase: 12, decimals: 2 },
    { id: "quarterly",    symbol: "quarterly",    name: "Quarterly",     toBase: 4, decimals: 2 },
    { id: "annually",     symbol: "annually",     name: "Annually",      isBase: true, toBase: 1, decimals: 2 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// FINANCE - Inflation Rate Period ★ NEW
// ─────────────────────────────────────────────────────────────────────────────

export const INFLATION_PERIOD: UnitGroup = {
  type: "inflation_period",
  name: "Inflation Rate Period",
  baseUnit: "annual",
  category: "finance",
  units: [
    { id: "monthly", symbol: "% monthly", name: "Monthly Inflation", toBase: 12, decimals: 4 },
    { id: "annual",  symbol: "% annual",  name: "Annual Inflation",  isBase: true, toBase: 1, decimals: 2 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// FINANCE - Dividend Frequency ★ NEW
// ─────────────────────────────────────────────────────────────────────────────

export const DIVIDEND_FREQUENCY: UnitGroup = {
  type: "dividend_frequency",
  name: "Dividend Frequency",
  baseUnit: "annually",
  category: "finance",
  units: [
    { id: "monthly",      symbol: "monthly",       name: "Monthly",       toBase: 12, decimals: 2 },
    { id: "quarterly",    symbol: "quarterly",     name: "Quarterly",     toBase: 4, decimals: 2 },
    { id: "semiannually", symbol: "semi-annually", name: "Semi-annually", toBase: 2, decimals: 2 },
    { id: "annually",     symbol: "annually",      name: "Annually",      isBase: true, toBase: 1, decimals: 2 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// FINANCE - Bond Coupon Frequency ★ NEW
// ─────────────────────────────────────────────────────────────────────────────

export const BOND_COUPON_FREQUENCY: UnitGroup = {
  type: "bond_coupon_frequency",
  name: "Coupon Frequency",
  baseUnit: "semiannually",
  category: "finance",
  units: [
    { id: "monthly",      symbol: "monthly",       name: "Monthly",        toBase: 6, decimals: 2 },
    { id: "quarterly",    symbol: "quarterly",     name: "Quarterly",      toBase: 2, decimals: 2 },
    { id: "semiannually", symbol: "semi-annually", name: "Semi-annually",  isBase: true, toBase: 1, decimals: 2 },
    { id: "annually",     symbol: "annually",      name: "Annually",       toBase: 0.5, decimals: 2 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// FINANCE - Retirement Timeline ★ NEW
// ─────────────────────────────────────────────────────────────────────────────

export const RETIREMENT_TIMELINE: UnitGroup = {
  type: "retirement_timeline",
  name: "Time to Retirement",
  baseUnit: "years",
  category: "finance",
  units: [
    { id: "months", symbol: "months", name: "Months", toBase: 1/12, decimals: 0 },
    { id: "years",  symbol: "years",  name: "Years",  isBase: true, toBase: 1, decimals: 0 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// FINANCE - Insurance Premium Frequency ★ NEW
// ─────────────────────────────────────────────────────────────────────────────

export const INSURANCE_FREQUENCY: UnitGroup = {
  type: "insurance_frequency",
  name: "Premium Frequency",
  baseUnit: "annually",
  category: "finance",
  units: [
    { id: "monthly",      symbol: "monthly",       name: "Monthly",        toBase: 12, decimals: 2 },
    { id: "quarterly",    symbol: "quarterly",     name: "Quarterly",      toBase: 4, decimals: 2 },
    { id: "semiannually", symbol: "semi-annually", name: "Semi-annually",  toBase: 2, decimals: 2 },
    { id: "annually",     symbol: "annually",      name: "Annually",       isBase: true, toBase: 1, decimals: 2 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// FINANCE - Real Estate Rental Period ★ NEW
// ─────────────────────────────────────────────────────────────────────────────

export const RENTAL_PERIOD: UnitGroup = {
  type: "rental_period",
  name: "Rental Period",
  baseUnit: "monthly",
  category: "finance",
  units: [
    { id: "daily",    symbol: "daily",    name: "Daily (Short-term)",  toBase: 1/30, decimals: 2 },
    { id: "weekly",   symbol: "weekly",   name: "Weekly",              toBase: 7/30, decimals: 2 },
    { id: "monthly",  symbol: "monthly",  name: "Monthly",             isBase: true, toBase: 1, decimals: 2 },
    { id: "annually", symbol: "annually", name: "Annually",            toBase: 12, decimals: 2 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// ★ NEW GROUP: TORQUE
// ─────────────────────────────────────────────────────────────────────────────

export const TORQUE: UnitGroup = {
  type: "torque",
  name: "Torque",
  baseUnit: "Nm",
  category: "physics",
  units: [
    { id: "Nm",     symbol: "N·m",    name: "Newton-meters",      regions: ["EU","BR","MX","AR","CL","CO","PE","AU","NZ","IN","JP","DE","FR","IT","ES","PT"], isBase: true, toBase: 1, decimals: 2 },
    { id: "kNm",    symbol: "kN·m",   name: "Kilonewton-meters",  toBase: 1000, decimals: 4 },
    { id: "ftlbf",  symbol: "ft·lbf", name: "Foot-pounds",        regions: ["US","CA","GB"], toBase: 1.35582, decimals: 2 },
    { id: "inlbf",  symbol: "in·lbf", name: "Inch-pounds",        regions: ["US","CA"], toBase: 0.112985, decimals: 2 },
    { id: "kgfm",   symbol: "kgf·m",  name: "Kilogram-force meters", toBase: 9.80665, decimals: 3 },
    { id: "kgfcm",  symbol: "kgf·cm", name: "Kilogram-force cm",    toBase: 0.0980665, decimals: 3 },
    { id: "ozfin",  symbol: "ozf·in", name: "Ounce-force inches",   regions: ["US","CA"], toBase: 0.00706155, decimals: 3 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// ★ NEW GROUP: FREQUENCY (WAVE) — Hz, kHz, MHz, GHz, THz
// ─────────────────────────────────────────────────────────────────────────────

export const FREQUENCY_WAVE: UnitGroup = {
  type: "frequency_wave",
  name: "Frequency",
  baseUnit: "Hz",
  category: "physics",
  units: [
    { id: "mHz",  symbol: "mHz",  name: "Millihertz",  toBase: 0.001, decimals: 2 },
    { id: "Hz",   symbol: "Hz",   name: "Hertz",       isBase: true, toBase: 1, decimals: 2 },
    { id: "kHz",  symbol: "kHz",  name: "Kilohertz",   toBase: 1000, decimals: 3 },
    { id: "MHz",  symbol: "MHz",  name: "Megahertz",   toBase: 1_000_000, decimals: 3 },
    { id: "GHz",  symbol: "GHz",  name: "Gigahertz",   toBase: 1_000_000_000, decimals: 4 },
    { id: "THz",  symbol: "THz",  name: "Terahertz",   toBase: 1_000_000_000_000, decimals: 4 },
    { id: "rpm",  symbol: "RPM",  name: "Revolutions/minute", toBase: 1/60, decimals: 1 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// ★ NEW GROUP: LUMINOSITY / ILLUMINANCE
// ─────────────────────────────────────────────────────────────────────────────

export const ILLUMINANCE: UnitGroup = {
  type: "illuminance",
  name: "Illuminance",
  baseUnit: "lux",
  category: "physics",
  units: [
    { id: "lux",    symbol: "lx",     name: "Lux",           isBase: true, toBase: 1, decimals: 1 },
    { id: "klux",   symbol: "klx",    name: "Kilolux",       toBase: 1000, decimals: 3 },
    { id: "fc",     symbol: "fc",     name: "Foot-candles",  regions: ["US","CA"], toBase: 10.7639, decimals: 2 },
    { id: "phot",   symbol: "ph",     name: "Phots",         toBase: 10_000, decimals: 4 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// ★ NEW GROUP: ACCELERATION
// ─────────────────────────────────────────────────────────────────────────────

export const ACCELERATION: UnitGroup = {
  type: "acceleration",
  name: "Acceleration",
  baseUnit: "ms2",
  category: "physics",
  units: [
    { id: "ms2",    symbol: "m/s²",    name: "Meters/s²",           isBase: true, toBase: 1, decimals: 3 },
    { id: "fts2",   symbol: "ft/s²",   name: "Feet/s²",            regions: ["US","CA","GB"], toBase: 0.3048, decimals: 3 },
    { id: "g_acc",  symbol: "g",       name: "Standard gravity",    toBase: 9.80665, decimals: 4 },
    { id: "gal",    symbol: "Gal",     name: "Gals (cm/s²)",       toBase: 0.01, decimals: 2 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// ★ NEW GROUP: MAGNETIC FIELD
// ─────────────────────────────────────────────────────────────────────────────

export const MAGNETIC_FIELD: UnitGroup = {
  type: "magnetic_field",
  name: "Magnetic Field",
  baseUnit: "T",
  category: "physics",
  units: [
    { id: "nT",  symbol: "nT",  name: "Nanotesla",   toBase: 1e-9, decimals: 0 },
    { id: "uT",  symbol: "µT",  name: "Microtesla",  toBase: 1e-6, decimals: 1 },
    { id: "mT",  symbol: "mT",  name: "Millitesla",  toBase: 0.001, decimals: 2 },
    { id: "T",   symbol: "T",   name: "Tesla",        isBase: true, toBase: 1, decimals: 4 },
    { id: "G",   symbol: "G",   name: "Gauss",        toBase: 0.0001, decimals: 2 },
  ],
};


// =============================================================================
// MASTER REGISTRY - Lookup by UnitType (UPDATED with 17 Finance UnitTypes)
// =============================================================================

export const UNIT_REGISTRY: Record<string, UnitGroup> = {
  // Health / Body
  weight: WEIGHT,
  height: HEIGHT,
  body_length: BODY_LENGTH,
  body_temperature: BODY_TEMPERATURE,
  energy_food: ENERGY_FOOD,

  // Length / Distance
  length: LENGTH,
  length_small: LENGTH_SMALL,
  length_large: LENGTH_LARGE,

  // Area
  area: AREA,

  // Volume
  volume: VOLUME,
  cooking_volume: COOKING_VOLUME,

  // Construction
  construction_volume: CONSTRUCTION_VOLUME,
  lumber: LUMBER,
  roofing: ROOFING,
  slope: SLOPE,
  pipe_diameter: PIPE_DIAMETER,
  coverage_rate: COVERAGE_RATE,

  // Mass
  mass: MASS,
  mass_heavy: MASS_HEAVY,

  // Temperature
  temperature: TEMPERATURE,

  // Speed
  speed: SPEED,

  // Pace / Running
  pace: PACE,
  race_distance: RACE_DISTANCE,

  // Time / Duration
  time: TIME,
  duration: DURATION,
  duration_long: DURATION_LONG,

  // Energy / Power
  energy: ENERGY,
  power: POWER,
  pressure: PRESSURE,
  force: FORCE,

  // Torque
  torque: TORQUE,

  // Angles
  angle: ANGLE,

  // Digital
  data: DATA,
  data_rate: DATA_RATE,

  // Automotive
  fuel_economy: FUEL_ECONOMY,
  density: DENSITY,

  // Electrical
  voltage: VOLTAGE,
  current: CURRENT,
  resistance: RESISTANCE,

  // Flow
  flow_rate: FLOW_RATE,

  // Frequency (Wave)
  frequency_wave: FREQUENCY_WAVE,

  // Illuminance
  illuminance: ILLUMINANCE,

  // Acceleration
  acceleration: ACCELERATION,

  // Magnetic Field
  magnetic_field: MAGNETIC_FIELD,

  // ══════════════════════════════════════════════════════════════════════════
  // FINANCE (17 UnitTypes: 3 expanded + 14 new) ★
  // ══════════════════════════════════════════════════════════════════════════
  currency: CURRENCY_GROUP,
  frequency: FREQUENCY,
  interest_period: INTEREST_PERIOD,
  
  // ★ NEW Finance UnitTypes
  compounding_frequency: COMPOUNDING_FREQUENCY,
  loan_term: LOAN_TERM,
  return_period: RETURN_PERIOD,
  savings_timeline: SAVINGS_TIMELINE,
  debt_timeline: DEBT_TIMELINE,
  income_frequency: INCOME_FREQUENCY,
  inflation_period: INFLATION_PERIOD,
  dividend_frequency: DIVIDEND_FREQUENCY,
  bond_coupon_frequency: BOND_COUPON_FREQUENCY,
  retirement_timeline: RETIREMENT_TIMELINE,
  insurance_frequency: INSURANCE_FREQUENCY,
  rental_period: RENTAL_PERIOD,
};

/**
 * Get a unit group by type
 */
export function getUnitGroup(unitType: string): UnitGroup | undefined {
  return UNIT_REGISTRY[unitType];
}

/**
 * Get all unit types available
 */
export function getAvailableUnitTypes(): string[] {
  return Object.keys(UNIT_REGISTRY);
}

/**
 * Get a specific unit definition
 */
export function getUnit(unitType: string, unitId: string) {
  const group = UNIT_REGISTRY[unitType];
  if (!group) return undefined;
  return group.units.find(u => u.id === unitId);
}

/**
 * Get all unit types for a specific category
 */
export function getUnitTypesByCategory(category: string): string[] {
  return Object.entries(UNIT_REGISTRY)
    .filter(([, group]) => group.category === category)
    .map(([key]) => key);
}

/**
 * Get all construction-related unit types
 */
export function getConstructionUnitTypes(): string[] {
  return getUnitTypesByCategory("construction");
}

/**
 * Get all finance-related unit types
 */
export function getFinanceUnitTypes(): string[] {
  return getUnitTypesByCategory("finance");
}

/**
 * Get total number of unique units across all groups
 */
export function getTotalUnitCount(): number {
  const seen = new Set<string>();
  for (const group of Object.values(UNIT_REGISTRY)) {
    for (const unit of group.units) {
      seen.add(`${group.type}:${unit.id}`);
    }
  }
  return seen.size;
}
