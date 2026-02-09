// ============================================================================
// KALCUFY V4 - UNIT SYSTEM (Barrel Export) - UPDATED with 17 Finance UnitTypes
// ============================================================================
// Import everything from here:
//   import { convert, getUnitGroup, CURRENCIES, ... } from "@/engine/v4/units";
// ============================================================================

// Types
export type {
  UnitType,
  UnitDefinition,
  UnitGroup,
  CurrencyDefinition,
  UnitDropdownConfig,
  UnitChangeEvent,
  UnitTranslations,
  DualUnitValue,
  DualUnitConfig,
} from "./types";

// Registry
export {
  UNIT_REGISTRY,
  getUnitGroup,
  getUnit,
  getAvailableUnitTypes,
  getUnitTypesByCategory,
  getConstructionUnitTypes,
  getFinanceUnitTypes,
  getTotalUnitCount,
  // Individual groups for direct import
  WEIGHT,
  HEIGHT,
  BODY_LENGTH,
  BODY_TEMPERATURE,
  ENERGY_FOOD,
  LENGTH,
  LENGTH_SMALL,
  LENGTH_LARGE,
  AREA,
  VOLUME,
  COOKING_VOLUME,
  CONSTRUCTION_VOLUME,
  LUMBER,
  ROOFING,
  SLOPE,
  PIPE_DIAMETER,
  COVERAGE_RATE,
  MASS,
  MASS_HEAVY,
  TEMPERATURE,
  SPEED,
  PACE,
  RACE_DISTANCE,
  TIME,
  DURATION,
  DURATION_LONG,
  ENERGY,
  POWER,
  PRESSURE,
  FORCE,
  ANGLE,
  DATA,
  DATA_RATE,
  FUEL_ECONOMY,
  DENSITY,
  VOLTAGE,
  CURRENT,
  RESISTANCE,
  FLOW_RATE,
  // Physics (NEW)
  TORQUE,
  FREQUENCY_WAVE,
  ILLUMINANCE,
  ACCELERATION,
  MAGNETIC_FIELD,
  // ══════════════════════════════════════════════════════════════════════════
  // FINANCE (17 UnitTypes) ★
  // ══════════════════════════════════════════════════════════════════════════
  FREQUENCY,
  INTEREST_PERIOD,
  // ★ NEW Finance Groups
  COMPOUNDING_FREQUENCY,
  LOAN_TERM,
  RETURN_PERIOD,
  SAVINGS_TIMELINE,
  DEBT_TIMELINE,
  INCOME_FREQUENCY,
  INFLATION_PERIOD,
  DIVIDEND_FREQUENCY,
  BOND_COUPON_FREQUENCY,
  RETIREMENT_TIMELINE,
  INSURANCE_FREQUENCY,
  RENTAL_PERIOD,
} from "./registry";

// Currencies
export {
  CURRENCIES,
  CURRENCY_GROUP,
  getCurrency,
  getTopCurrencies,
  getCurrenciesByRegion,
  formatCurrency,
  guessCurrencyFromLocale,
} from "./currencies";

// Conversion engine
export {
  convert,
  convertSmart,
  convertToBase,
  convertFromBase,
  normalizeToBase,
  handleUnitChange,
  guessDefaultUnit,
  convertDualToBase,
  convertBaseToDual,
  convertFlexible,
} from "./convert";
