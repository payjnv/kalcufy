# Unit Dropdown System - Integration Guide

## Overview

The unit dropdown system replaces the old Imperial/Metric toggle with **per-field unit selectors**. Each input field can have its own unit dropdown, and values auto-convert when switching units.

### Before (Old Way - Verbose)
```typescript
inputs: [
  // Global toggle
  { id: "unitSystem", type: "radio", defaultValue: "imperial",
    options: [{ value: "metric" }, { value: "imperial" }] },
  // Duplicate fields with showWhen
  { id: "weightKg", type: "number", defaultValue: 80, suffix: "kg",
    showWhen: { field: "unitSystem", value: "metric" } },
  { id: "weightLbs", type: "number", defaultValue: 180, suffix: "lbs",
    showWhen: { field: "unitSystem", value: "imperial" } },
  { id: "heightCm", type: "number", defaultValue: 178, suffix: "cm",
    showWhen: { field: "unitSystem", value: "metric" } },
  { id: "heightFt", type: "number", defaultValue: 5, suffix: "ft", width: "half",
    showWhen: { field: "unitSystem", value: "imperial" } },
  { id: "heightIn", type: "number", defaultValue: 10, suffix: "in", width: "half",
    showWhen: { field: "unitSystem", value: "imperial" } },
]
// = 6 inputs for 2 fields!
```

### After (New Way - Clean)
```typescript
inputs: [
  { id: "weight", type: "number", defaultValue: 180,
    unitType: "weight", defaultUnit: "lbs" },
  { id: "height", type: "number", defaultValue: 178,
    unitType: "height", defaultUnit: "cm" },
]
// = 2 inputs for 2 fields!
```

---

## Type Changes (engine.types.ts)

### Add to InputConfig:
```typescript
export interface InputConfig {
  // ... existing fields ...

  /** Unit type - enables per-field unit dropdown */
  unitType?: UnitType;

  /** Specific units to show (overrides full list from registry) */
  allowedUnits?: string[];

  /** Units to exclude from dropdown */
  excludeUnits?: string[];

  /** Default unit for this field */
  defaultUnit?: string;

  /** Auto-convert value when switching units? Default: true */
  autoConvert?: boolean;
}
```

### Add UnitType import:
```typescript
import type { UnitType } from "./units/types";
```

---

## How It Works in InputCardV4

### NumberInput Changes

Replace the static suffix `<span>` with a conditional:

```tsx
// BEFORE (line ~832 in InputCardV4.tsx):
{suffix && <span className="pr-3 shrink-0 text-slate-400 text-xs font-medium">{suffix}</span>}

// AFTER:
{input.unitType && availableUnits.length > 1 ? (
  <UnitDropdown
    units={availableUnits}
    selectedUnit={currentUnit}
    onUnitChange={(newUnit) => onUnitDropdownChange(input.id, newUnit)}
    size="sm"
    size="sm"
  />
) : (
  suffix && <span className="pr-3 shrink-0 text-slate-400 text-xs font-medium">{suffix}</span>
)}
```

### Where to resolve units:

In the RenderInput or NumberInput component:
```typescript
import { getUnitGroup } from "../units";

// Resolve available units for this field
const group = input.unitType ? getUnitGroup(input.unitType) : null;
let availableUnits = group?.units || [];

// Filter if allowedUnits specified
if (input.allowedUnits) {
  availableUnits = availableUnits.filter(u => input.allowedUnits!.includes(u.id));
}
if (input.excludeUnits) {
  availableUnits = availableUnits.filter(u => !input.excludeUnits!.includes(u.id));
}

const currentUnit = units[input.id] || input.defaultUnit || group?.baseUnit || "";
```

---

## How It Works in CalculatorEngineV4

### State Changes

```typescript
// Add to state initialization:
const [fieldUnits, setFieldUnits] = useState<Record<string, string>>(() => {
  const initial: Record<string, string> = {};
  config.inputs.forEach(input => {
    if (input.unitType && input.defaultUnit) {
      initial[input.id] = input.defaultUnit;
    }
  });
  return initial;
});

// Handle unit change with auto-conversion:
const handleFieldUnitChange = (inputId: string, newUnit: string) => {
  const input = config.inputs.find(i => i.id === inputId);
  if (!input?.unitType) return;

  const oldUnit = fieldUnits[inputId];
  const currentValue = values[inputId] as number;

  // Auto-convert value
  if (input.autoConvert !== false && oldUnit && currentValue !== null && currentValue !== undefined) {
    const converted = convert(currentValue, oldUnit, newUnit, input.unitType);
    if (!isNaN(converted)) {
      setValues(prev => ({ ...prev, [inputId]: converted }));
    }
  }

  // Update unit
  setFieldUnits(prev => ({ ...prev, [inputId]: newUnit }));
};
```

### Passing to Calculate Function

```typescript
// When calling calculate(), include field units:
const result = calculate({
  values,
  units: fieldUnits,            // Per-field unit selections
  unitSystem,                   // Legacy support
  mode: currentMode,
  t: translations,
});
```

### In the Calculator's calculate() Function

```typescript
import { convertToBase, normalizeToBase } from "@/engine/v4/units";

export function calculateBodyFat(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;  // { weight: "lbs", height: "cm", waist: "in" }
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, units, t } = data;

  // Option 1: Convert individually
  const weightKg = convertToBase(values.weight as number, units.weight || "kg", "weight");
  const heightCm = convertToBase(values.height as number, units.height || "cm", "height");

  // Option 2: Batch normalize
  const base = normalizeToBase(values, units, {
    weight: "weight",
    height: "height",
    waist: "body_length",
    neck: "body_length",
  });
  // base.weight is always in kg, base.height in cm, etc.

  // Calculate with normalized values...
  const bmi = base.weight / Math.pow(base.height / 100, 2);

  return { ... };
}
```

---

## Available Unit Types

| UnitType | Base Unit | Options | Category |
|----------|-----------|---------|----------|
| `weight` | kg | kg, lb, st, g, oz | Health |
| `height` | cm | cm, m, ft, in | Health |
| `body_length` | cm | cm, in | Health |
| `body_temperature` | °C | °C, °F | Health |
| `energy_food` | kcal | kcal, cal, kJ | Health |
| `length` | m | mm, cm, m, km, in, ft, yd, mi | Construction |
| `length_small` | mm | mm, cm, in | Construction |
| `length_large` | km | m, km, ft, yd, mi | Everyday |
| `area` | m² | cm², m², km², in², ft², yd², ac, ha, mi² | Construction |
| `volume` | L | mL, L, m³, fl oz, cups, pt, qt, gal(US), gal(UK), ft³ | Everyday |
| `cooking_volume` | mL | tsp, tbsp, fl oz, cups, mL, L | Cooking |
| `mass` | kg | mg, g, kg, lb, oz, t(metric), ton(US) | Physics |
| `mass_heavy` | kg | kg, lb, t(metric), ton(US), ton(UK) | Construction |
| `temperature` | °C | °C, °F, K | Physics |
| `speed` | m/s | m/s, km/h, mph, ft/s, knots | Physics |
| `time` | s | ms, s, min, h, d | Everyday |
| `duration` | days | days, wk, mo, yr | Everyday |
| `duration_long` | months | mo, yr | Finance |
| `energy` | J | J, kJ, cal, kcal, BTU, kWh, Wh | Physics |
| `power` | W | W, kW, MW, HP, BTU/h | Physics |
| `pressure` | Pa | Pa, kPa, bar, psi, atm, mmHg, inHg | Physics |
| `force` | N | N, kN, lbf, kgf, dyn | Physics |
| `angle` | ° | °, rad, grad | Math |
| `data` | B | B, KB, MB, GB, TB | Digital |
| `data_rate` | bps | bps, Kbps, Mbps, Gbps | Digital |
| `fuel_economy` | L/100km | L/100km, km/L, mpg(US), mpg(UK) | Everyday |
| `density` | kg/m³ | kg/m³, g/cm³, lb/ft³, g/L | Physics |
| `voltage` | V | mV, V, kV | Physics |
| `current` | A | μA, mA, A | Physics |
| `resistance` | Ω | Ω, kΩ, MΩ | Physics |
| `flow_rate` | L/min | L/min, L/h, m³/h, gal/min | Construction |
| `currency` | USD | 35+ currencies with symbols | Finance |
| `frequency` | monthly | daily, weekly, bi-weekly, monthly, quarterly, yearly | Finance |
| `interest_period` | annual | % APR, % monthly | Finance |

---

## Finance Calculator Example

```typescript
inputs: [
  {
    id: "loanAmount",
    type: "number",
    defaultValue: 250000,
    unitType: "currency",
    defaultUnit: "USD",
    // Only show top currencies
    allowedUnits: ["USD", "EUR", "GBP", "CAD", "AUD", "BRL", "MXN"],
  },
  {
    id: "interestRate",
    type: "number",
    defaultValue: 6.5,
    suffix: "%",  // Fixed suffix - no dropdown
  },
  {
    id: "loanTerm",
    type: "number",
    defaultValue: 30,
    unitType: "duration_long",
    defaultUnit: "years",
  },
  {
    id: "paymentFrequency",
    type: "select",
    defaultValue: "monthly",
    options: [
      { value: "monthly" },
      { value: "biweekly" },
      { value: "weekly" },
    ],
  },
]
```

---

## Health Calculator Example

```typescript
inputs: [
  {
    id: "gender",
    type: "radio",
    defaultValue: "male",
    options: [{ value: "male" }, { value: "female" }],
  },
  {
    id: "age",
    type: "number",
    defaultValue: 30,
    suffix: "years",  // Fixed - no dropdown
  },
  {
    id: "weight",
    type: "number",
    defaultValue: 180,
    unitType: "weight",
    defaultUnit: "lbs",
  },
  {
    id: "height",
    type: "number",
    defaultValue: 178,
    unitType: "height",
    defaultUnit: "cm",
  },
  {
    id: "waist",
    type: "number",
    defaultValue: 86,
    unitType: "body_length",
    defaultUnit: "cm",
  },
  {
    id: "neck",
    type: "number",
    defaultValue: 38,
    unitType: "body_length",
    defaultUnit: "cm",
  },
]
```

---

## Physics Calculator Example

```typescript
inputs: [
  {
    id: "mass",
    type: "number",
    defaultValue: 10,
    unitType: "mass",
    defaultUnit: "kg",
  },
  {
    id: "velocity",
    type: "number",
    defaultValue: 20,
    unitType: "speed",
    defaultUnit: "ms",
  },
  {
    id: "force",
    type: "number",
    defaultValue: null,
    placeholder: "Calculated",
    unitType: "force",
    defaultUnit: "N",
  },
]
```

---

## Translation Support

Unit names can be translated in the calculator's `t` object:

```typescript
t: {
  en: {
    units: {
      kg: { name: "Kilograms" },
      lbs: { name: "Pounds" },
      st: { name: "Stones" },
    },
  },
  es: {
    units: {
      kg: { name: "Kilogramos" },
      lbs: { name: "Libras" },
      st: { name: "Piedras" },
    },
  },
}
```

The dropdown will use translated names when available.
