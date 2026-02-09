// ============================================================================
// KALCUFY V4 - UNIT SYSTEM TYPES (UPDATED with 17 Finance UnitTypes)
// ============================================================================
// Comprehensive type definitions for the per-field unit dropdown system.
// Supports Health, Finance, Physics, Construction, Cooking, Everyday, and more.
// ============================================================================

// ─────────────────────────────────────────────────────────────────────────────
// UNIT TYPE - Categories of measurement
// ─────────────────────────────────────────────────────────────────────────────
export type UnitType =
  // ── Body / Health ──────────────────────────────────────────────────────
  | "weight"            // kg, lbs, st, g, oz
  | "height"            // cm, m, ft, in
  | "body_length"       // cm, in  (waist, neck, hip circumference)
  | "body_temperature"  // °C, °F

  // ── Length / Distance ──────────────────────────────────────────────────
  | "length"            // nm, µm, mm, cm, dm, m, hm, km, mil, in, ft, yd, mi, nmi, fathom, furlong, AU, ly
  | "length_small"      // nm, µm, mil, mm, cm, in (precision work)
  | "length_large"      // m, km, ft, yd, mi, nmi (distances)

  // ── Area ───────────────────────────────────────────────────────────────
  | "area"              // mm², cm², m², are, ha, km², manzana, fanegada, cuadra, tarea, in², ft², yd², ac, mi²

  // ── Volume ─────────────────────────────────────────────────────────────
  | "volume"            // mL, cL, dL, L, m³, tsp, tbsp, fl oz, cups, pt, qt, gal(US/UK), ft³, yd³, in³
  | "cooking_volume"    // cups, tbsp, tsp, mL, L, fl oz

  // ── Construction ──────────────────────────────────────────────────────
  | "construction_volume" // m³, ft³, yd³, L, gal (concrete, gravel, mulch)
  | "lumber"              // board feet, linear feet, m³, ft³
  | "roofing"             // squares, ft², m², yd²
  | "slope"               // %, degrees, rise:run
  | "pipe_diameter"       // mm, cm, in
  | "coverage_rate"       // m²/L, ft²/gal (paint, stain)

  // ── Weight / Mass ──────────────────────────────────────────────────────
  | "mass"              // µg, mg, g, kg, oz, lbs, st, ct, t, ton(US/UK), quintal
  | "mass_heavy"        // kg, lbs, tons(metric), tons(short), tons(long)

  // ── Temperature ────────────────────────────────────────────────────────
  | "temperature"       // °C, °F, K, °R

  // ── Speed ──────────────────────────────────────────────────────────────
  | "speed"             // m/s, km/h, mph, ft/s, knots, mach, c

  // ── Pace / Running ─────────────────────────────────────────────────────
  | "pace"              // min/km, min/mi, min/100m
  | "race_distance"     // km, mi, m

  // ── Time / Duration ────────────────────────────────────────────────────
  | "time"              // ns, µs, ms, seconds, minutes, hours, days, weeks
  | "duration"          // days, weeks, months, years
  | "duration_long"     // months, years

  // ── Energy ─────────────────────────────────────────────────────────────
  | "energy"            // J, kJ, MJ, cal, kcal, BTU, kWh, Wh, eV
  | "energy_food"       // cal, kcal, kJ

  // ── Power ──────────────────────────────────────────────────────────────
  | "power"             // mW, W, kW, MW, HP, PS, BTU/h

  // ── Pressure ───────────────────────────────────────────────────────────
  | "pressure"          // Pa, hPa, kPa, MPa, bar, mbar, psi, atm, mmHg, inHg

  // ── Force ──────────────────────────────────────────────────────────────
  | "force"             // mN, N, kN, lbf, kgf, dyn

  // ── Torque ─────────────────────────────────────────────────────────────
  | "torque"            // N·m, kN·m, ft·lbf, in·lbf, kgf·m, kgf·cm, ozf·in

  // ── Angles ─────────────────────────────────────────────────────────────
  | "angle"             // degrees, radians, gradians, arcmin, arcsec, turns

  // ── Data / Digital ─────────────────────────────────────────────────────
  | "data"              // bit, B, KB, MB, GB, TB, PB, KiB, MiB, GiB, TiB, PiB
  | "data_rate"         // bps, Kbps, Mbps, Gbps, B/s, KB/s, MB/s

  // ── Fuel Economy ───────────────────────────────────────────────────────
  | "fuel_economy"      // L/100km, km/L, mpg(US), mpg(UK)

  // ── Density ────────────────────────────────────────────────────────────
  | "density"           // kg/m³, g/cm³, g/mL, lb/ft³, g/L, kg/L

  // ── Electrical ─────────────────────────────────────────────────────────
  | "voltage"           // µV, mV, V, kV, MV
  | "current"           // nA, µA, mA, A, kA
  | "resistance"        // mΩ, Ω, kΩ, MΩ

  // ── Flow Rate ──────────────────────────────────────────────────────────
  | "flow_rate"         // mL/min, L/min, L/h, m³/h, gal/min, CFM

  // ── Frequency (Wave) ───────────────────────────────────────────────────
  | "frequency_wave"    // mHz, Hz, kHz, MHz, GHz, THz, RPM

  // ── Illuminance ────────────────────────────────────────────────────────
  | "illuminance"       // lux, klux, foot-candles, phot

  // ── Acceleration ───────────────────────────────────────────────────────
  | "acceleration"      // m/s², ft/s², g, Gal

  // ── Magnetic Field ─────────────────────────────────────────────────────
  | "magnetic_field"    // nT, µT, mT, T, G

  // ══════════════════════════════════════════════════════════════════════════
  // FINANCE (17 UnitTypes: 3 expanded + 14 new) ★
  // ══════════════════════════════════════════════════════════════════════════
  | "currency"                // USD, EUR, GBP, BRL, MXN, JPY, CAD, AUD, etc. (32 currencies)
  | "frequency"               // daily, weekly, bi-weekly, semi-monthly, monthly, bi-monthly, quarterly, semi-annually, annually
  | "interest_period"         // daily, weekly, bi-weekly, monthly, quarterly, semi-annually, annual (% APR)
  
  // ★ NEW Finance UnitTypes
  | "compounding_frequency"   // continuously, daily, weekly, bi-weekly, semi-monthly, monthly, bi-monthly, quarterly, semi-annually, annually
  | "loan_term"               // months, years
  | "return_period"           // daily, weekly, monthly, quarterly, annual, total
  | "savings_timeline"        // weeks, months, years
  | "debt_timeline"           // months, years
  | "income_frequency"        // hourly, daily, weekly, bi-weekly, semi-monthly, monthly, quarterly, annually
  | "inflation_period"        // monthly, annual
  | "dividend_frequency"      // monthly, quarterly, semi-annually, annually
  | "bond_coupon_frequency"   // monthly, quarterly, semi-annually, annually
  | "retirement_timeline"     // months, years
  | "insurance_frequency"     // monthly, quarterly, semi-annually, annually
  | "rental_period"           // daily, weekly, monthly, annually
;

// ─────────────────────────────────────────────────────────────────────────────
// DUAL UNIT VALUE - For composite units like ft/in (feet and inches)
// ─────────────────────────────────────────────────────────────────────────────
export interface DualUnitValue {
  /** Primary value (e.g., feet in ft/in) */
  primary: number;
  
  /** Secondary value (e.g., inches in ft/in) */
  secondary: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// DUAL UNIT CONFIG - Configuration for composite units
// ─────────────────────────────────────────────────────────────────────────────
export interface DualUnitConfig {
  /** Symbol for primary component (e.g., "ft") */
  primarySymbol: string;
  
  /** Symbol for secondary component (e.g., "in") */
  secondarySymbol: string;
  
  /** Conversion factor: primary to base (e.g., 30.48 for ft→cm) */
  primaryToBase: number;
  
  /** Conversion factor: secondary to base (e.g., 2.54 for in→cm) */
  secondaryToBase: number;
  
  /** Maximum value for secondary before rolling to primary (e.g., 12 for inches) */
  secondaryMax?: number;
  
  /** Decimal places for primary display */
  primaryDecimals?: number;
  
  /** Decimal places for secondary display */
  secondaryDecimals?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// UNIT DEFINITION - Individual unit within a type
// ─────────────────────────────────────────────────────────────────────────────
export interface UnitDefinition {
  /** Unique identifier, e.g. "kg", "lbs", "st", "ft_in" */
  id: string;

  /** Display symbol shown in dropdown and input, e.g. "kg", "lb", "st", "ft/in" */
  symbol: string;

  /** Full name for tooltip/accessibility, e.g. "Kilograms", "Feet and Inches" */
  name: string;

  /** Region hint for smart defaults based on user locale */
  regions?: string[];  // ["US","CA"] = North America, ["GB","IE"] = UK/Ireland, etc.

  // ── Conversion ──────────────────────────────────────────────────────
  // Linear conversion: value_in_base = value * toBase
  // Example: lbs → kg: toBase = 0.453592 (1 lb = 0.453592 kg)
  toBase?: number;
  fromBase?: number;

  // Non-linear conversion (temperature, fuel economy, etc.)
  toBaseFn?: (value: number | DualUnitValue) => number;
  fromBaseFn?: (value: number) => number | DualUnitValue;

  /** Is this the base unit? (toBase = 1) */
  isBase?: boolean;

  /** Decimal places for display */
  decimals?: number;
  
  // ── Dual Unit Support ──────────────────────────────────────────────
  /** Is this a composite unit like ft/in? */
  isDual?: boolean;
  
  /** Configuration for dual units (required if isDual = true) */
  dualConfig?: DualUnitConfig;
}

// ─────────────────────────────────────────────────────────────────────────────
// UNIT GROUP - A collection of units for a UnitType
// ─────────────────────────────────────────────────────────────────────────────
export interface UnitGroup {
  /** The unit type this group represents */
  type: UnitType;

  /** Human-readable name for the group */
  name: string;

  /** The base unit ID (conversions go through this) */
  baseUnit: string;

  /** All available units in this group */
  units: UnitDefinition[];

  /** Category hint for grouping in UI */
  category?: "health" | "finance" | "physics" | "construction" | "cooking" | "everyday" | "math" | "digital";
}

// ─────────────────────────────────────────────────────────────────────────────
// CURRENCY DEFINITION - Extended unit for financial calculators
// ─────────────────────────────────────────────────────────────────────────────
export interface CurrencyDefinition extends UnitDefinition {
  /** ISO 4217 code: "USD", "EUR", "GBP" */
  code: string;

  /** Currency symbol: "$", "€", "£", "R$" */
  currencySymbol: string;

  /** Symbol position: prefix ($100) or suffix (100€) */
  symbolPosition: "prefix" | "suffix";

  /** Decimal separator: "." (US/UK) or "," (EU/BR) */
  decimalSeparator: "." | ",";

  /** Thousands separator: "," (US/UK) or "." (EU/BR) or " " (FR) */
  thousandsSeparator: "," | "." | " " | "'";

  /** Number of decimal places (2 for most, 0 for JPY/KRW) */
  decimalPlaces: number;

  /** Approximate exchange rate to USD (for offline conversion) */
  approximateRateToUSD: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// DROPDOWN CONFIG - How the dropdown behaves for an input
// ─────────────────────────────────────────────────────────────────────────────
export interface UnitDropdownConfig {
  /** Which unit type to show */
  unitType: UnitType;

  /** Override: only show specific unit IDs from the group */
  allowedUnits?: string[];

  /** Override: exclude specific unit IDs */
  excludeUnits?: string[];

  /** Default selected unit */
  defaultUnit: string;

  /** Auto-convert value when switching units? Default: true */
  autoConvert?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// UNIT CHANGE EVENT
// ─────────────────────────────────────────────────────────────────────────────
export interface UnitChangeEvent {
  /** Input field ID */
  inputId: string;

  /** Previous unit ID */
  fromUnit: string;

  /** New unit ID */
  toUnit: string;

  /** Original value before conversion */
  originalValue: number;

  /** Converted value */
  convertedValue: number;

  /** The unit type */
  unitType: UnitType;
}

// ─────────────────────────────────────────────────────────────────────────────
// TRANSLATIONS FOR UNIT SYSTEM
// ─────────────────────────────────────────────────────────────────────────────
export interface UnitTranslations {
  /** Translated unit names by unit ID */
  units?: Record<string, {
    name?: string;
    symbol?: string;
  }>;

  /** Translated frequency labels */
  frequencies?: Record<string, string>;

  /** Dropdown aria labels */
  aria?: {
    changeUnit?: string;      // "Change unit"
    currentUnit?: string;     // "Current unit: {unit}"
    selectUnit?: string;      // "Select unit for {field}"
  };
}
