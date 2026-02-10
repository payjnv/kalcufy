// ============================================================================
// KALCUFY V4 - UNIT CONVERSION ENGINE
// ============================================================================
// Handles conversion between any two units in the same UnitGroup.
// Supports both linear (factor-based) and non-linear (function-based) conversions.
//
// Algorithm:
//   1. Convert source value → base unit
//   2. Convert base unit → target value
//
// Example: 180 lbs → kg
//   Step 1: 180 × 0.453592 (toBase) = 81.65 kg (base)
//   Step 2: 81.65 × 1 (fromBase for kg) = 81.65 kg
//
// Example: 98.6 °F → °C
//   Step 1: toBaseFn(98.6) = (98.6 - 32) × 5/9 = 37.0 °C (base)
//   Step 2: fromBaseFn(37.0) = 37.0 °C
// ============================================================================

import type { UnitDefinition, UnitGroup, UnitType, UnitChangeEvent, DualUnitValue } from "./types";
import { getUnitGroup, UNIT_REGISTRY } from "./registry";
import { CURRENCY_GROUP } from "./currencies";

// ─────────────────────────────────────────────────────────────────────────────
// CORE CONVERSION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Convert a value from one unit to another within the same UnitType.
 * 
 * @param value - The numeric value to convert
 * @param fromUnitId - Source unit ID (e.g. "lbs")
 * @param toUnitId - Target unit ID (e.g. "kg")
 * @param unitType - The UnitType (e.g. "weight")
 * @returns The converted value, or NaN if conversion fails
 * 
 * @example
 * convert(180, "lbs", "kg", "weight")  // → 81.65
 * convert(98.6, "F", "C", "temperature")  // → 37.0
 * convert(5, "ft", "cm", "height")  // → 152.4
 */
export function convert(
  value: number,
  fromUnitId: string,
  toUnitId: string,
  unitType: UnitType | string
): number {
  if (fromUnitId === toUnitId) return value;
  if (isNaN(value)) return NaN;

  const group = resolveGroup(unitType);
  if (!group) return NaN;

  const fromUnit = group.units.find(u => u.id === fromUnitId);
  const toUnit = group.units.find(u => u.id === toUnitId);
  if (!fromUnit || !toUnit) return NaN;

  // Step 1: Convert to base unit
  const baseValue = toBaseUnit(value, fromUnit);

  // Step 2: Convert from base to target unit
  const result = fromBaseUnit(baseValue, toUnit);

  // Round to target's decimal precision
  const decimals = toUnit.decimals ?? 2;
  return roundTo(result, decimals);
}

/**
 * Smart convert: Handles both regular units and dual units (ft/in).
 * When converting FROM/TO dual units, it works with base unit as intermediary.
 * 
 * @example
 * // Converting from dual to single
 * convertSmart(70, "in", "ft_in", "height") // 70 in base → 5 ft 10 in display
 * 
 * // Converting from single to dual  
 * convertSmart(177.8, "cm", "ft_in", "height") // 177.8 cm base → 5 ft 10 in display
 * 
 * // Converting between singles (normal convert)
 * convertSmart(70, "in", "cm", "height") // 177.8 cm
 */
export function convertSmart(
  value: number,
  fromUnitId: string,
  toUnitId: string,
  unitType: UnitType | string
): number {
  if (fromUnitId === toUnitId) return value;
  
  const group = resolveGroup(unitType);
  if (!group) return value;

  const fromUnit = group.units.find(u => u.id === fromUnitId);
  const toUnit = group.units.find(u => u.id === toUnitId);
  if (!fromUnit || !toUnit) return value;

  // ✅ CASE 1: FROM dual unit → value is already in base unit (cm)
  // Just return as-is, no conversion needed
  if (fromUnit.isDual) {
    return value;
  }

  // ✅ CASE 2: TO dual unit → value is in fromUnit, convert to base
  if (toUnit.isDual) {
    // Convert to base unit (cm)
    return toBaseUnit(value, fromUnit);
  }

  // ✅ CASE 3: Both single units → normal convert
  return convert(value, fromUnitId, toUnitId, unitType);
}

/**
 * Convert a value to the base unit of its type.
 * Useful when calculator functions need all values normalized.
 * 
 * @example
 * convertToBase(180, "lbs", "weight")  // → 81.65 (kg)
 * convertToBase(5.10, "ft", "height")  // → 155.45 (cm)
 */
export function convertToBase(
  value: number,
  fromUnitId: string,
  unitType: UnitType | string
): number {
  if (isNaN(value)) return NaN;

  const group = resolveGroup(unitType);
  if (!group) return NaN;

  const fromUnit = group.units.find(u => u.id === fromUnitId);
  if (!fromUnit) return NaN;

  return toBaseUnit(value, fromUnit);
}

/**
 * Convert a value from the base unit to a specific unit.
 * 
 * @example
 * convertFromBase(81.65, "lbs", "weight")  // → 180.0 (lbs)
 */
export function convertFromBase(
  value: number,
  toUnitId: string,
  unitType: UnitType | string
): number {
  if (isNaN(value)) return NaN;

  const group = resolveGroup(unitType);
  if (!group) return NaN;

  const toUnit = group.units.find(u => u.id === toUnitId);
  if (!toUnit) return NaN;

  return fromBaseUnit(value, toUnit);
}

// ─────────────────────────────────────────────────────────────────────────────
// BATCH CONVERSION (for calculate functions)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Convert multiple input values to base units at once.
 * Useful inside calculate() functions.
 * 
 * @param values - Record of input values { weight: 180, height: 70 }
 * @param units - Record of selected units { weight: "lbs", height: "in" }
 * @param unitTypes - Record of unit types { weight: "weight", height: "height" }
 * @returns Record of base-unit values { weight: 81.65, height: 177.8 }
 */
export function normalizeToBase(
  values: Record<string, unknown>,
  units: Record<string, string>,
  unitTypes: Record<string, string>
): Record<string, number> {
  const result: Record<string, number> = {};

  for (const [key, unitType] of Object.entries(unitTypes)) {
    const value = values[key] as number;
    const unit = units[key];

    if (value !== undefined && value !== null && unit && unitType) {
      result[key] = convertToBase(value, unit, unitType);
    } else {
      result[key] = value as number;
    }
  }

  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// DUAL UNIT CONVERSION (for ft/in composite units)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Convert a dual unit value (e.g., ft/in) to base units.
 * 
 * @param value - DualUnitValue with primary and secondary components
 * @param fromUnitId - Source unit ID (e.g., "ft_in")
 * @param unitType - The UnitType (e.g., "height")
 * @returns The value in base units (e.g., cm)
 * 
 * @example
 * convertDualToBase({ primary: 5, secondary: 10 }, "ft_in", "height")  // → 177.8 cm
 */
export function convertDualToBase(
  value: DualUnitValue,
  fromUnitId: string,
  unitType: UnitType | string
): number {
  const group = resolveGroup(unitType);
  if (!group) return NaN;

  const fromUnit = group.units.find(u => u.id === fromUnitId);
  if (!fromUnit || !fromUnit.isDual) return NaN;

  // Use toBaseFn if defined
  if (fromUnit.toBaseFn) {
    return fromUnit.toBaseFn(value);
  }

  // Fallback: use dualConfig
  if (fromUnit.dualConfig) {
    const { primary, secondary } = value;
    const { primaryToBase, secondaryToBase } = fromUnit.dualConfig;
    return (primary * primaryToBase) + (secondary * secondaryToBase);
  }

  return NaN;
}

/**
 * Convert a base unit value to a dual unit (e.g., cm → ft/in).
 * 
 * @param baseValue - Value in base units (e.g., 177.8 cm)
 * @param toUnitId - Target unit ID (e.g., "ft_in")
 * @param unitType - The UnitType (e.g., "height")
 * @returns DualUnitValue with primary and secondary components
 * 
 * @example
 * convertBaseToDual(177.8, "ft_in", "height")  // → { primary: 5, secondary: 10 }
 */
export function convertBaseToDual(
  baseValue: number,
  toUnitId: string,
  unitType: UnitType | string
): DualUnitValue {
  const group = resolveGroup(unitType);
  if (!group) return { primary: 0, secondary: 0 };

  const toUnit = group.units.find(u => u.id === toUnitId);
  if (!toUnit || !toUnit.isDual) return { primary: 0, secondary: 0 };

  // Use fromBaseFn if defined
  if (toUnit.fromBaseFn) {
    const result = toUnit.fromBaseFn(baseValue);
    if (typeof result === 'object' && 'primary' in result) {
      return result as DualUnitValue;
    }
  }

  // Fallback: use dualConfig
  if (toUnit.dualConfig) {
    const { secondaryToBase, secondaryMax } = toUnit.dualConfig;
    const totalSecondary = baseValue / secondaryToBase;
    const rollover = secondaryMax || 12; // default to 12 for inches
    const primary = Math.floor(totalSecondary / rollover);
    const secondary = totalSecondary % rollover;
    return { 
      primary, 
      secondary: Math.round(secondary * 10) / 10,
    };
  }

  return { primary: 0, secondary: 0 };
}

/**
 * Convert between any two units, supporting dual units.
 * 
 * @param value - Numeric value or DualUnitValue
 * @param fromUnitId - Source unit ID
 * @param toUnitId - Target unit ID
 * @param unitType - The UnitType
 * @returns number | DualUnitValue depending on target unit
 * 
 * @example
 * convertFlexible({ primary: 5, secondary: 10 }, "ft_in", "cm", "height")  // → 177.8
 * convertFlexible(177.8, "cm", "ft_in", "height")  // → { primary: 5, secondary: 10 }
 */
export function convertFlexible(
  value: number | DualUnitValue,
  fromUnitId: string,
  toUnitId: string,
  unitType: UnitType | string
): number | DualUnitValue {
  if (fromUnitId === toUnitId) return value;

  const group = resolveGroup(unitType);
  if (!group) return typeof value === 'number' ? NaN : { primary: 0, secondary: 0 };

  const fromUnit = group.units.find(u => u.id === fromUnitId);
  const toUnit = group.units.find(u => u.id === toUnitId);
  if (!fromUnit || !toUnit) return typeof value === 'number' ? NaN : { primary: 0, secondary: 0 };

  // Convert to base first
  let baseValue: number;
  if (fromUnit.isDual && typeof value === 'object') {
    baseValue = convertDualToBase(value as DualUnitValue, fromUnitId, unitType);
  } else if (typeof value === 'number') {
    baseValue = toBaseUnit(value, fromUnit);
  } else {
    return NaN;
  }

  // Convert from base to target
  if (toUnit.isDual) {
    return convertBaseToDual(baseValue, toUnitId, unitType);
  } else {
    return fromBaseUnit(baseValue, toUnit);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// UNIT CHANGE HANDLER (for auto-conversion in UI)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Handle a unit change event: convert the current value to the new unit.
 * Returns a UnitChangeEvent with all details.
 * 
 * @example
 * const event = handleUnitChange("weight", 180, "lbs", "kg", "weight");
 * // event.convertedValue = 81.65
 */
export function handleUnitChange(
  inputId: string,
  currentValue: number,
  fromUnit: string,
  toUnit: string,
  unitType: UnitType | string
): UnitChangeEvent {
  const convertedValue = convert(currentValue, fromUnit, toUnit, unitType);

  return {
    inputId,
    fromUnit,
    toUnit,
    originalValue: currentValue,
    convertedValue: isNaN(convertedValue) ? currentValue : convertedValue,
    unitType: unitType as UnitType,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// SMART DEFAULTS - Guess best unit from locale
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Suggest the best default unit for a given type based on user locale.
 * 
 * @example
 * guessDefaultUnit("weight", "en-US")  // → "lbs"
 * guessDefaultUnit("weight", "de-DE")  // → "kg"
 * guessDefaultUnit("weight", "en-GB")  // → "st"
 * guessDefaultUnit("height", "es-MX")  // → "cm"
 * guessDefaultUnit("temperature", "en-US")  // → "F"
 * guessDefaultUnit("torque", "en-US")  // → "ftlbf"
 * guessDefaultUnit("torque", "de-DE")  // → "Nm"
 */
export function guessDefaultUnit(unitType: UnitType | string, locale: string): string {
  const group = resolveGroup(unitType);
  if (!group) return "";

  // Extract country from locale
  const parts = locale.split("-");
  const country = parts.length > 1 ? parts[1].toUpperCase() : "";
  const lang = parts[0].toLowerCase();

  // Try to find a unit matching the user's region
  for (const unit of group.units) {
    if (unit.regions && unit.regions.includes(country)) {
      return unit.id;
    }
  }

  // Fallback: US for English, metric for everyone else
  const isImperial = country === "US" || country === "LR" || country === "MM";
  const isCanada = country === "CA";
  const isUK = country === "GB" || country === "IE";

  // ── Body / Health ──
  if (unitType === "weight") {
    if (isUK) return "st";
    if (isImperial) return "lbs";
    return "kg";
  }

  if (unitType === "height" || unitType === "body_length") {
    if (isImperial || isUK) return "in";
    return "cm";
  }

  if (unitType === "body_temperature" || unitType === "temperature") {
    if (isImperial) return "F";
    return "C";
  }

  // ── Length / Distance ──
  if (unitType === "length" || unitType === "length_small") {
    if (isImperial || isUK) return unitType === "length_small" ? "in" : "ft";
    return unitType === "length_small" ? "mm" : "m";
  }

  if (unitType === "length_large") {
    if (isImperial || isUK) return "mi";
    return "km";
  }

  // ── Area ──
  if (unitType === "area") {
    if (isImperial) return "ft2";
    return "m2";
  }

  // ── Volume ──
  if (unitType === "volume" || unitType === "cooking_volume") {
    if (isImperial) return unitType === "cooking_volume" ? "cups" : "gal_us";
    if (isUK) return unitType === "cooking_volume" ? "mL" : "gal_uk";
    return unitType === "cooking_volume" ? "mL" : "L";
  }

  // ── Speed ──
  if (unitType === "speed") {
    if (isImperial || isUK) return "mph";
    return "kmh";
  }

  // ── Mass ──
  if (unitType === "mass" || unitType === "mass_heavy") {
    if (isImperial) return "lbs";
    if (isUK) return unitType === "mass" ? "st" : "kg";
    return "kg";
  }

  // ── Energy ──
  if (unitType === "energy") {
    if (isImperial) return "BTU";
    return "kJ";
  }

  if (unitType === "energy_food") {
    return "kcal";
  }

  // ── Power ──
  if (unitType === "power") {
    if (isImperial || isUK) return "HP";
    if (country === "DE" || country === "JP") return "PS";
    return "kW";
  }

  // ── Pressure ──
  if (unitType === "pressure") {
    if (isImperial) return "psi";
    return "bar";
  }

  // ── Torque ──
  if (unitType === "torque") {
    if (isImperial || isUK) return "ftlbf";
    return "Nm";
  }

  // ── Fuel economy ──
  if (unitType === "fuel_economy") {
    if (isImperial || isCanada) return "mpg_us";
    if (isUK) return "mpg_uk";
    return "L100km";
  }

  // ── Flow rate ──
  if (unitType === "flow_rate") {
    if (isImperial) return "gal_min";
    return "Lmin";
  }

  // ── Data ──
  if (unitType === "data") return "gb";
  if (unitType === "data_rate") return "mbps";

  // ── New groups: universal defaults ──
  if (unitType === "frequency_wave") return "Hz";
  if (unitType === "illuminance") return isImperial ? "fc" : "lux";
  if (unitType === "acceleration") return "ms2";
  if (unitType === "magnetic_field") return "T";

  // Default: return the base unit
  return group.baseUnit;
}

// ─────────────────────────────────────────────────────────────────────────────
// INTERNAL HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function resolveGroup(unitType: string): UnitGroup | undefined {
  if (unitType === "currency") return CURRENCY_GROUP;
  return UNIT_REGISTRY[unitType];
}

function toBaseUnit(value: number, unit: UnitDefinition): number {
  if (unit.isBase) return value;
  if (unit.toBaseFn) return unit.toBaseFn(value);
  if (unit.toBase !== undefined) return value * unit.toBase;
  return value;
}

function fromBaseUnit(baseValue: number, unit: UnitDefinition): number {
  if (unit.isBase) return baseValue;
  if (unit.fromBaseFn) return unit.fromBaseFn(baseValue);
  if (unit.toBase !== undefined && unit.toBase !== 0) return baseValue / unit.toBase;
  return baseValue;
}

function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
