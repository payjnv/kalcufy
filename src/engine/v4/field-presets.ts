// =============================================================================
// KALCUFY V4 — FIELD PRESETS BY CATEGORY
// =============================================================================
// Standard field configurations for each calculator category.
// Use spread syntax: { id: "weight", ...HEALTH_WEIGHT }
// 
// These presets guarantee:
// ✅ syncGroup: false (always)
// ✅ Correct allowedUnits per category
// ✅ Correct defaultUnit (geo-system overrides at runtime)
// ✅ Smart Defaults (null + placeholder for sensitive fields)
// ✅ UK stones support for weight
// ✅ Consistent across ALL calculators
// =============================================================================

// ─────────────────────────────────────────────────────────────────────────────
// HEALTH & FITNESS FIELDS
// ─────────────────────────────────────────────────────────────────────────────

/** Weight — kg/lbs/st (stones for UK via geo-detection) */
export const HEALTH_WEIGHT = {
  type: "number" as const,
  defaultValue: null,
  placeholder: "180",
  unitType: "weight",
  syncGroup: false,
  defaultUnit: "lbs",
  allowedUnits: ["kg", "lbs", "st"],
} as const;

/** Height — cm/m/in/ft_in (dual ft/in for US/CA/GB via geo-detection) */
export const HEALTH_HEIGHT = {
  type: "number" as const,
  defaultValue: null,
  placeholder: "170",
  unitType: "height",
  syncGroup: false,
  defaultUnit: "cm",
  allowedUnits: ["cm", "m", "in", "ft_in"],
} as const;

/** Body measurement (waist, neck, hip, etc.) — cm/in */
export const HEALTH_BODY_LENGTH = {
  type: "number" as const,
  defaultValue: null,
  unitType: "body_length",
  syncGroup: false,
  defaultUnit: "in",
  allowedUnits: ["cm", "in"],
} as const;

/** Body temperature — °C/°F */
export const HEALTH_TEMPERATURE = {
  type: "number" as const,
  defaultValue: null,
  placeholder: "98.6",
  unitType: "body_temperature",
  syncGroup: false,
  defaultUnit: "F",
  allowedUnits: ["C", "F"],
} as const;

/** Food energy — kcal/kJ */
export const HEALTH_ENERGY = {
  type: "number" as const,
  defaultValue: null,
  placeholder: "2000",
  unitType: "energy_food",
  syncGroup: false,
  defaultUnit: "kcal",
  allowedUnits: ["kcal", "kJ"],
} as const;

/** Gender radio — male/female, default male */
export const HEALTH_GENDER = {
  type: "radio" as const,
  defaultValue: "male",
  options: [{ value: "male" }, { value: "female" }],
} as const;

/** Age — default 30, range 18-80 */
export const HEALTH_AGE = {
  type: "number" as const,
  defaultValue: 30,
  min: 18,
  max: 100,
  suffix: "years",
} as const;

/** Activity level select — default moderatelyActive */
export const HEALTH_ACTIVITY = {
  type: "select" as const,
  defaultValue: "moderatelyActive",
  options: [
    { value: "sedentary" },
    { value: "lightlyActive" },
    { value: "moderatelyActive" },
    { value: "veryActive" },
    { value: "extraActive" },
  ],
} as const;

/** Body fat percentage — sensitive, empty with placeholder */
export const HEALTH_BODY_FAT = {
  type: "number" as const,
  defaultValue: null,
  placeholder: "20",
  min: 2,
  max: 60,
  suffix: "%",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// FINANCE FIELDS
// ─────────────────────────────────────────────────────────────────────────────

/** Currency amount — auto-detects country currency via geo-system */
export const FINANCE_CURRENCY = {
  type: "number" as const,
  defaultValue: null,
  unitType: "currency",
  syncGroup: false,
  autoConvert: false,
  defaultUnit: "USD",
} as const;

/** Interest rate — fixed %, not a unitType */
export const FINANCE_INTEREST_RATE = {
  type: "number" as const,
  defaultValue: 6.5,
  min: 0,
  max: 50,
  step: 0.1,
  suffix: "%",
} as const;

/** Loan term in years */
export const FINANCE_TERM_YEARS = {
  type: "number" as const,
  defaultValue: 30,
  min: 1,
  max: 50,
  suffix: "years",
} as const;

/** Loan term in months */
export const FINANCE_TERM_MONTHS = {
  type: "number" as const,
  defaultValue: 60,
  min: 1,
  max: 600,
  suffix: "months",
} as const;

/** Down payment percentage */
export const FINANCE_DOWN_PAYMENT_PCT = {
  type: "number" as const,
  defaultValue: 20,
  min: 0,
  max: 100,
  suffix: "%",
} as const;

/** Payment frequency select */
export const FINANCE_FREQUENCY = {
  type: "select" as const,
  defaultValue: "monthly",
  options: [
    { value: "weekly" },
    { value: "biweekly" },
    { value: "monthly" },
    { value: "quarterly" },
    { value: "annually" },
  ],
} as const;

/** Compounding frequency select */
export const FINANCE_COMPOUNDING = {
  type: "select" as const,
  defaultValue: "monthly",
  options: [
    { value: "daily" },
    { value: "monthly" },
    { value: "quarterly" },
    { value: "semiannually" },
    { value: "annually" },
  ],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// CONSTRUCTION / HOME FIELDS
// ─────────────────────────────────────────────────────────────────────────────

/** Length — ft/m/cm for construction measurements */
export const CONSTRUCTION_LENGTH = {
  type: "number" as const,
  defaultValue: null,
  unitType: "length",
  syncGroup: false,
  defaultUnit: "ft",
  allowedUnits: ["ft", "m", "cm"],
} as const;

/** Small length — in/cm/mm for thickness, diameter */
export const CONSTRUCTION_LENGTH_SMALL = {
  type: "number" as const,
  defaultValue: null,
  unitType: "length_small",
  syncGroup: false,
  defaultUnit: "in",
  allowedUnits: ["in", "cm", "mm"],
} as const;

/** Area — ft²/m²/acres for rooms, lots */
export const CONSTRUCTION_AREA = {
  type: "number" as const,
  defaultValue: null,
  unitType: "area",
  syncGroup: false,
  defaultUnit: "ft²",
  allowedUnits: ["ft²", "m²", "yd²", "acres"],
} as const;

/** Volume — ft³/m³/yd³ for concrete, fill */
export const CONSTRUCTION_VOLUME = {
  type: "number" as const,
  defaultValue: null,
  unitType: "construction_volume",
  syncGroup: false,
  defaultUnit: "ft³",
  allowedUnits: ["ft³", "m³", "yd³"],
} as const;

/** Waste factor — default 10% */
export const CONSTRUCTION_WASTE = {
  type: "number" as const,
  defaultValue: 10,
  min: 0,
  max: 50,
  suffix: "%",
} as const;

/** Quantity — generic count field */
export const CONSTRUCTION_QUANTITY = {
  type: "number" as const,
  defaultValue: 1,
  min: 1,
  max: 999,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// CONVERSION FIELDS
// ─────────────────────────────────────────────────────────────────────────────

/** Generic "from" value for converters */
export const CONVERTER_FROM = {
  type: "number" as const,
  defaultValue: 1,
  min: 0,
  syncGroup: false,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// TECHNOLOGY FIELDS
// ─────────────────────────────────────────────────────────────────────────────

/** Data size — B/KB/MB/GB/TB */
export const TECH_DATA = {
  type: "number" as const,
  defaultValue: null,
  placeholder: "1000",
  unitType: "data",
  syncGroup: false,
  defaultUnit: "GB",
  allowedUnits: ["MB", "GB", "TB"],
} as const;

/** Data rate — Mbps/Gbps */
export const TECH_DATA_RATE = {
  type: "number" as const,
  defaultValue: null,
  placeholder: "100",
  unitType: "data_rate",
  syncGroup: false,
  defaultUnit: "Mbps",
  allowedUnits: ["Kbps", "Mbps", "Gbps"],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// PHYSICS / ENGINEERING FIELDS
// ─────────────────────────────────────────────────────────────────────────────

/** Temperature — °C/°F/K */
export const PHYSICS_TEMPERATURE = {
  type: "number" as const,
  defaultValue: null,
  unitType: "temperature",
  syncGroup: false,
  defaultUnit: "C",
  allowedUnits: ["C", "F", "K"],
} as const;

/** Speed — m/s, km/h, mph */
export const PHYSICS_SPEED = {
  type: "number" as const,
  defaultValue: null,
  unitType: "speed",
  syncGroup: false,
  defaultUnit: "km/h",
  allowedUnits: ["m/s", "km/h", "mph", "knots"],
} as const;

/** Mass — g/kg/oz/lb */
export const PHYSICS_MASS = {
  type: "number" as const,
  defaultValue: null,
  unitType: "mass",
  syncGroup: false,
  defaultUnit: "kg",
  allowedUnits: ["g", "kg", "oz", "lb"],
} as const;

/** Energy — J/kJ/cal/kcal/kWh */
export const PHYSICS_ENERGY = {
  type: "number" as const,
  defaultValue: null,
  unitType: "energy",
  syncGroup: false,
  defaultUnit: "kJ",
  allowedUnits: ["J", "kJ", "cal", "kcal", "kWh", "BTU"],
} as const;

/** Pressure — Pa/kPa/bar/psi/atm */
export const PHYSICS_PRESSURE = {
  type: "number" as const,
  defaultValue: null,
  unitType: "pressure",
  syncGroup: false,
  defaultUnit: "psi",
  allowedUnits: ["Pa", "kPa", "bar", "psi", "atm"],
} as const;

/** Power — W/kW/hp */
export const PHYSICS_POWER = {
  type: "number" as const,
  defaultValue: null,
  unitType: "power",
  syncGroup: false,
  defaultUnit: "W",
  allowedUnits: ["W", "kW", "hp"],
} as const;
