/**
 * Unit Conversion Utilities
 * Handles all unit conversions for health and finance calculators
 */

// ============================================================================
// TYPES
// ============================================================================

export type LengthUnit = 'cm' | 'in' | 'ft' | 'm' | 'mm';
export type WeightUnit = 'kg' | 'lb' | 'st' | 'oz' | 'g';
export type TemperatureUnit = 'C' | 'F' | 'K';
export type TimeUnit = 'years' | 'months' | 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds';
export type EnergyUnit = 'kcal' | 'kJ' | 'cal';

export type UnitCategory = 'length' | 'weight' | 'temperature' | 'time' | 'energy';

export interface UnitDefinition {
  id: string;
  label: string;
  shortLabel: string;
  category: UnitCategory;
  toBase: (value: number) => number; // Convert to base unit
  fromBase: (value: number) => number; // Convert from base unit
}

// ============================================================================
// LENGTH CONVERSIONS
// Base unit: centimeters (cm)
// ============================================================================

const LENGTH_UNITS: Record<LengthUnit, UnitDefinition> = {
  cm: {
    id: 'cm',
    label: 'Centimeters',
    shortLabel: 'cm',
    category: 'length',
    toBase: (v) => v,
    fromBase: (v) => v,
  },
  in: {
    id: 'in',
    label: 'Inches',
    shortLabel: 'in',
    category: 'length',
    toBase: (v) => v * 2.54,
    fromBase: (v) => v / 2.54,
  },
  ft: {
    id: 'ft',
    label: 'Feet',
    shortLabel: 'ft',
    category: 'length',
    toBase: (v) => v * 30.48,
    fromBase: (v) => v / 30.48,
  },
  m: {
    id: 'm',
    label: 'Meters',
    shortLabel: 'm',
    category: 'length',
    toBase: (v) => v * 100,
    fromBase: (v) => v / 100,
  },
  mm: {
    id: 'mm',
    label: 'Millimeters',
    shortLabel: 'mm',
    category: 'length',
    toBase: (v) => v / 10,
    fromBase: (v) => v * 10,
  },
};

// ============================================================================
// WEIGHT CONVERSIONS
// Base unit: kilograms (kg)
// ============================================================================

const WEIGHT_UNITS: Record<WeightUnit, UnitDefinition> = {
  kg: {
    id: 'kg',
    label: 'Kilograms',
    shortLabel: 'kg',
    category: 'weight',
    toBase: (v) => v,
    fromBase: (v) => v,
  },
  lb: {
    id: 'lb',
    label: 'Pounds',
    shortLabel: 'lb',
    category: 'weight',
    toBase: (v) => v * 0.453592,
    fromBase: (v) => v / 0.453592,
  },
  st: {
    id: 'st',
    label: 'Stone',
    shortLabel: 'st',
    category: 'weight',
    toBase: (v) => v * 6.35029,
    fromBase: (v) => v / 6.35029,
  },
  oz: {
    id: 'oz',
    label: 'Ounces',
    shortLabel: 'oz',
    category: 'weight',
    toBase: (v) => v * 0.0283495,
    fromBase: (v) => v / 0.0283495,
  },
  g: {
    id: 'g',
    label: 'Grams',
    shortLabel: 'g',
    category: 'weight',
    toBase: (v) => v / 1000,
    fromBase: (v) => v * 1000,
  },
};

// ============================================================================
// TEMPERATURE CONVERSIONS
// Base unit: Celsius (C)
// ============================================================================

const TEMPERATURE_UNITS: Record<TemperatureUnit, UnitDefinition> = {
  C: {
    id: 'C',
    label: 'Celsius',
    shortLabel: '°C',
    category: 'temperature',
    toBase: (v) => v,
    fromBase: (v) => v,
  },
  F: {
    id: 'F',
    label: 'Fahrenheit',
    shortLabel: '°F',
    category: 'temperature',
    toBase: (v) => (v - 32) * (5 / 9),
    fromBase: (v) => v * (9 / 5) + 32,
  },
  K: {
    id: 'K',
    label: 'Kelvin',
    shortLabel: 'K',
    category: 'temperature',
    toBase: (v) => v - 273.15,
    fromBase: (v) => v + 273.15,
  },
};

// ============================================================================
// TIME CONVERSIONS
// Base unit: months (for financial calculations)
// ============================================================================

const TIME_UNITS: Record<TimeUnit, UnitDefinition> = {
  years: {
    id: 'years',
    label: 'Years',
    shortLabel: 'yr',
    category: 'time',
    toBase: (v) => v * 12,
    fromBase: (v) => v / 12,
  },
  months: {
    id: 'months',
    label: 'Months',
    shortLabel: 'mo',
    category: 'time',
    toBase: (v) => v,
    fromBase: (v) => v,
  },
  weeks: {
    id: 'weeks',
    label: 'Weeks',
    shortLabel: 'wk',
    category: 'time',
    toBase: (v) => v / 4.33,
    fromBase: (v) => v * 4.33,
  },
  days: {
    id: 'days',
    label: 'Days',
    shortLabel: 'd',
    category: 'time',
    toBase: (v) => v / 30.44,
    fromBase: (v) => v * 30.44,
  },
  hours: {
    id: 'hours',
    label: 'Hours',
    shortLabel: 'h',
    category: 'time',
    toBase: (v) => v / (30.44 * 24),
    fromBase: (v) => v * 30.44 * 24,
  },
  minutes: {
    id: 'minutes',
    label: 'Minutes',
    shortLabel: 'min',
    category: 'time',
    toBase: (v) => v / (30.44 * 24 * 60),
    fromBase: (v) => v * 30.44 * 24 * 60,
  },
  seconds: {
    id: 'seconds',
    label: 'Seconds',
    shortLabel: 's',
    category: 'time',
    toBase: (v) => v / (30.44 * 24 * 60 * 60),
    fromBase: (v) => v * 30.44 * 24 * 60 * 60,
  },
};

// ============================================================================
// ENERGY CONVERSIONS
// Base unit: kilocalories (kcal)
// ============================================================================

const ENERGY_UNITS: Record<EnergyUnit, UnitDefinition> = {
  kcal: {
    id: 'kcal',
    label: 'Kilocalories',
    shortLabel: 'kcal',
    category: 'energy',
    toBase: (v) => v,
    fromBase: (v) => v,
  },
  kJ: {
    id: 'kJ',
    label: 'Kilojoules',
    shortLabel: 'kJ',
    category: 'energy',
    toBase: (v) => v / 4.184,
    fromBase: (v) => v * 4.184,
  },
  cal: {
    id: 'cal',
    label: 'Calories',
    shortLabel: 'cal',
    category: 'energy',
    toBase: (v) => v / 1000,
    fromBase: (v) => v * 1000,
  },
};

// ============================================================================
// ALL UNITS
// ============================================================================

const ALL_UNITS: Record<string, UnitDefinition> = {
  ...LENGTH_UNITS,
  ...WEIGHT_UNITS,
  ...TEMPERATURE_UNITS,
  ...TIME_UNITS,
  ...ENERGY_UNITS,
};

// ============================================================================
// CONVERSION FUNCTIONS
// ============================================================================

/**
 * Convert a value from one unit to another
 */
export function convertUnit(
  value: number,
  fromUnit: string,
  toUnit: string
): number {
  if (fromUnit === toUnit) return value;

  const from = ALL_UNITS[fromUnit];
  const to = ALL_UNITS[toUnit];

  if (!from || !to) {
    console.warn(`Unknown unit: ${!from ? fromUnit : toUnit}`);
    return value;
  }

  if (from.category !== to.category) {
    console.warn(`Cannot convert between different categories: ${from.category} -> ${to.category}`);
    return value;
  }

  // Convert to base, then to target
  const baseValue = from.toBase(value);
  return to.fromBase(baseValue);
}

/**
 * Get unit definition by ID
 */
export function getUnit(unitId: string): UnitDefinition | undefined {
  return ALL_UNITS[unitId];
}

/**
 * Get all units for a category
 */
export function getUnitsForCategory(category: UnitCategory): UnitDefinition[] {
  return Object.values(ALL_UNITS).filter((unit) => unit.category === category);
}

/**
 * Get unit options for select/dropdown
 */
export function getUnitOptions(
  category: UnitCategory
): Array<{ value: string; label: string }> {
  return getUnitsForCategory(category).map((unit) => ({
    value: unit.id,
    label: unit.shortLabel,
  }));
}

// ============================================================================
// HEIGHT SPECIFIC HELPERS
// ============================================================================

/**
 * Convert height to centimeters from feet and inches
 */
export function feetInchesToCm(feet: number, inches: number): number {
  const totalInches = feet * 12 + inches;
  return totalInches * 2.54;
}

/**
 * Convert centimeters to feet and inches
 */
export function cmToFeetInches(cm: number): { feet: number; inches: number } {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches };
}

/**
 * Format height based on unit preference
 */
export function formatHeight(cm: number, unit: 'cm' | 'ft' | 'in'): string {
  if (unit === 'cm') {
    return `${Math.round(cm)} cm`;
  } else if (unit === 'ft' || unit === 'in') {
    const { feet, inches } = cmToFeetInches(cm);
    return `${feet}'${inches}"`;
  }
  return `${Math.round(cm)} cm`;
}

// ============================================================================
// WEIGHT SPECIFIC HELPERS
// ============================================================================

/**
 * Convert stones and pounds to kilograms
 */
export function stonesPoundsToKg(stones: number, pounds: number): number {
  const totalPounds = stones * 14 + pounds;
  return totalPounds * 0.453592;
}

/**
 * Convert kilograms to stones and pounds
 */
export function kgToStonesPounds(kg: number): { stones: number; pounds: number } {
  const totalPounds = kg / 0.453592;
  const stones = Math.floor(totalPounds / 14);
  const pounds = Math.round(totalPounds % 14);
  return { stones, pounds };
}

/**
 * Format weight based on unit preference
 */
export function formatWeight(kg: number, unit: WeightUnit): string {
  switch (unit) {
    case 'kg':
      return `${kg.toFixed(1)} kg`;
    case 'lb':
      return `${(kg / 0.453592).toFixed(1)} lb`;
    case 'st': {
      const { stones, pounds } = kgToStonesPounds(kg);
      return `${stones}st ${pounds}lb`;
    }
    case 'oz':
      return `${(kg / 0.0283495).toFixed(1)} oz`;
    case 'g':
      return `${Math.round(kg * 1000)} g`;
    default:
      return `${kg.toFixed(1)} kg`;
  }
}

// ============================================================================
// FINANCIAL TIME HELPERS
// ============================================================================

/**
 * Convert years to months
 */
export function yearsToMonths(years: number): number {
  return years * 12;
}

/**
 * Convert months to years
 */
export function monthsToYears(months: number): number {
  return months / 12;
}

/**
 * Format loan term based on unit
 */
export function formatLoanTerm(months: number, showYears: boolean = true): string {
  if (showYears && months >= 12) {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    }
    return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  }
  return `${months} month${months !== 1 ? 's' : ''}`;
}

// ============================================================================
// CALCULATOR-SPECIFIC CONVERSIONS
// ============================================================================

/**
 * Ensure height is in centimeters for calculations
 */
export function normalizeHeight(value: number, unit: string): number {
  return convertUnit(value, unit, 'cm');
}

/**
 * Ensure weight is in kilograms for calculations
 */
export function normalizeWeight(value: number, unit: string): number {
  return convertUnit(value, unit, 'kg');
}

/**
 * Ensure time is in months for financial calculations
 */
export function normalizeTime(value: number, unit: string): number {
  return convertUnit(value, unit, 'months');
}

/**
 * Ensure energy is in kilocalories for calculations
 */
export function normalizeEnergy(value: number, unit: string): number {
  return convertUnit(value, unit, 'kcal');
}

// ============================================================================
// UNIT SYSTEM HELPERS
// ============================================================================

export type UnitSystem = 'metric' | 'imperial';

/**
 * Get default units based on unit system preference
 */
export function getDefaultUnits(system: UnitSystem): {
  length: LengthUnit;
  weight: WeightUnit;
  temperature: TemperatureUnit;
} {
  if (system === 'imperial') {
    return {
      length: 'ft',
      weight: 'lb',
      temperature: 'F',
    };
  }
  return {
    length: 'cm',
    weight: 'kg',
    temperature: 'C',
  };
}

/**
 * Detect likely unit system from locale
 */
export function getUnitSystemFromLocale(locale: string): UnitSystem {
  // US, UK, and a few others use imperial
  const imperialLocales = ['en-US', 'en-GB', 'en-MM', 'en-LR'];
  
  if (imperialLocales.some((l) => locale.startsWith(l.split('-')[0]) && locale.includes(l.split('-')[1]))) {
    return 'imperial';
  }
  
  // Most of the world uses metric
  return 'metric';
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  LENGTH_UNITS,
  WEIGHT_UNITS,
  TEMPERATURE_UNITS,
  TIME_UNITS,
  ENERGY_UNITS,
  ALL_UNITS,
};
