# 🎯 KALCUFY V4 — FIELD PRESETS (Campos Estándar por Categoría)

> **Fecha:** 8 Febrero 2026  
> **Archivo:** `src/engine/v4/field-presets.ts`  
> **Estado:** ✅ LISTO — Usar en TODAS las calculadoras nuevas

---

## 🚀 QUÉ ES

Constantes TypeScript con la configuración completa de campos comunes. Incluyen `unitType`, `syncGroup: false`, `allowedUnits`, `defaultUnit`, placeholders, y Smart Defaults — TODO ya configurado y probado.

**SIN presets:** 8 propiedades que recordar por campo, fácil olvidar algo.  
**CON presets:** 1 línea, imposible equivocarse.

---

## 📦 CÓMO USAR

```typescript
import { HEALTH_WEIGHT, HEALTH_HEIGHT, HEALTH_GENDER, HEALTH_AGE, HEALTH_ACTIVITY } from "@/engine/v4/field-presets";

inputs: [
  { id: "gender", ...HEALTH_GENDER },
  { id: "age", ...HEALTH_AGE },
  { id: "weight", ...HEALTH_WEIGHT },
  { id: "height", ...HEALTH_HEIGHT },
  { id: "activityLevel", ...HEALTH_ACTIVITY },
],
```

**Se expande automáticamente a:**
```typescript
{
  id: "weight",
  type: "number",
  defaultValue: null,       // Smart Default — vacío
  placeholder: "180",       // Hint visual
  unitType: "weight",       // Dropdown: kg, lbs, st
  syncGroup: false,         // Independiente
  defaultUnit: "lbs",       // Geo-system overridea según país
  allowedUnits: ["kg", "lbs", "st"],  // UK stones incluido
}
```

### Sobreescribir una propiedad específica

```typescript
// Cambiar solo el placeholder
{ id: "weight", ...HEALTH_WEIGHT, placeholder: "150" },

// Agregar min/max
{ id: "age", ...HEALTH_AGE, min: 15, max: 90 },

// Cambiar default
{ id: "interestRate", ...FINANCE_INTEREST_RATE, defaultValue: 5.0 },
```

---

## ❤️ HEALTH & FITNESS

| Preset | unitType | Units | Default | Sensible? |
|--------|----------|-------|---------|-----------|
| `HEALTH_WEIGHT` | weight | kg, lbs, st | lbs | ✅ null |
| `HEALTH_HEIGHT` | height | cm, m, in, ft_in | cm | ✅ null |
| `HEALTH_BODY_LENGTH` | body_length | cm, in | in | ✅ null |
| `HEALTH_TEMPERATURE` | body_temperature | °C, °F | °F | ✅ null |
| `HEALTH_ENERGY` | energy_food | kcal, kJ | kcal | ✅ null |
| `HEALTH_GENDER` | — (radio) | male, female | male | ❌ prellenado |
| `HEALTH_AGE` | — (number) | — | 30 | ❌ prellenado |
| `HEALTH_ACTIVITY` | — (select) | 5 niveles | moderatelyActive | ❌ prellenado |
| `HEALTH_BODY_FAT` | — (number) | — | null | ✅ null |

### Ejemplo: BMI Calculator
```typescript
inputs: [
  { id: "gender", ...HEALTH_GENDER },
  { id: "age", ...HEALTH_AGE },
  { id: "weight", ...HEALTH_WEIGHT },
  { id: "height", ...HEALTH_HEIGHT },
],
```

### Ejemplo: Body Fat Calculator
```typescript
inputs: [
  { id: "gender", ...HEALTH_GENDER },
  { id: "age", ...HEALTH_AGE },
  { id: "weight", ...HEALTH_WEIGHT },
  { id: "height", ...HEALTH_HEIGHT },
  { id: "waist", ...HEALTH_BODY_LENGTH, placeholder: "34" },
  { id: "neck", ...HEALTH_BODY_LENGTH, placeholder: "15" },
  { id: "hip", ...HEALTH_BODY_LENGTH, placeholder: "38" },
],
```

---

## 💰 FINANCE

| Preset | unitType | Default | Sensible? |
|--------|----------|---------|-----------|
| `FINANCE_CURRENCY` | currency | USD (geo overrides) | ✅ null |
| `FINANCE_INTEREST_RATE` | — (suffix %) | 6.5 | ❌ prellenado |
| `FINANCE_TERM_YEARS` | — (suffix years) | 30 | ❌ prellenado |
| `FINANCE_TERM_MONTHS` | — (suffix months) | 60 | ❌ prellenado |
| `FINANCE_DOWN_PAYMENT_PCT` | — (suffix %) | 20 | ❌ prellenado |
| `FINANCE_FREQUENCY` | — (select) | monthly | ❌ prellenado |
| `FINANCE_COMPOUNDING` | — (select) | monthly | ❌ prellenado |

### Ejemplo: Auto Loan Calculator
```typescript
inputs: [
  { id: "vehiclePrice", ...FINANCE_CURRENCY, placeholder: "35000" },
  { id: "downPayment", ...FINANCE_CURRENCY, placeholder: "5000" },
  { id: "interestRate", ...FINANCE_INTEREST_RATE },
  { id: "loanTerm", ...FINANCE_TERM_MONTHS, defaultValue: 60 },
],
```

### Ejemplo: Mortgage Calculator
```typescript
inputs: [
  { id: "homePrice", ...FINANCE_CURRENCY, placeholder: "350000" },
  { id: "downPayment", ...FINANCE_DOWN_PAYMENT_PCT },
  { id: "interestRate", ...FINANCE_INTEREST_RATE, defaultValue: 7.0 },
  { id: "loanTerm", ...FINANCE_TERM_YEARS, defaultValue: 30 },
  { id: "paymentFrequency", ...FINANCE_FREQUENCY },
],
```

---

## 🏠 CONSTRUCTION / HOME

| Preset | unitType | Units | Default |
|--------|----------|-------|---------|
| `CONSTRUCTION_LENGTH` | length | ft, m, cm | ft |
| `CONSTRUCTION_LENGTH_SMALL` | length_small | in, cm, mm | in |
| `CONSTRUCTION_AREA` | area | ft², m², yd², acres | ft² |
| `CONSTRUCTION_VOLUME` | construction_volume | ft³, m³, yd³ | ft³ |
| `CONSTRUCTION_WASTE` | — (suffix %) | 10 | prellenado |
| `CONSTRUCTION_QUANTITY` | — (number) | 1 | prellenado |

### Ejemplo: Paint Calculator
```typescript
inputs: [
  { id: "roomLength", ...CONSTRUCTION_LENGTH, placeholder: "12" },
  { id: "roomWidth", ...CONSTRUCTION_LENGTH, placeholder: "10" },
  { id: "wallHeight", ...CONSTRUCTION_LENGTH, placeholder: "8" },
  { id: "coats", ...CONSTRUCTION_QUANTITY, defaultValue: 2, max: 5 },
  { id: "wasteFactor", ...CONSTRUCTION_WASTE },
],
```

---

## 💻 TECHNOLOGY

| Preset | unitType | Units | Default |
|--------|----------|-------|---------|
| `TECH_DATA` | data | MB, GB, TB | GB |
| `TECH_DATA_RATE` | data_rate | Kbps, Mbps, Gbps | Mbps |

---

## ⚛️ PHYSICS / ENGINEERING

| Preset | unitType | Units | Default |
|--------|----------|-------|---------|
| `PHYSICS_TEMPERATURE` | temperature | °C, °F, K | °C |
| `PHYSICS_SPEED` | speed | m/s, km/h, mph, knots | km/h |
| `PHYSICS_MASS` | mass | g, kg, oz, lb | kg |
| `PHYSICS_ENERGY` | energy | J, kJ, cal, kcal, kWh, BTU | kJ |
| `PHYSICS_PRESSURE` | pressure | Pa, kPa, bar, psi, atm | psi |
| `PHYSICS_POWER` | power | W, kW, hp | W |

---

## 🔄 CONVERSION

| Preset | Uso |
|--------|-----|
| `CONVERTER_FROM` | Campo "from" genérico (value=1, syncGroup=false) |

Para converters, combinar con el unitType específico:
```typescript
{ id: "fromValue", ...CONVERTER_FROM, unitType: "length", defaultUnit: "cm", allowedUnits: ["cm", "m", "km", "in", "ft", "mi"] },
```

---

## 🌍 INTEGRACIÓN CON GEO-DETECTION

Los presets definen `defaultUnit` como fallback. El **geo-system** (country-config.ts) lo sobreescribe automáticamente en runtime:

| País | weight | height | body_length | currency |
|------|--------|--------|-------------|----------|
| 🇺🇸 US | lbs | ft_in | in | USD |
| 🇬🇧 GB | **st** | ft_in | in | GBP |
| 🇲🇽 MX | kg | cm | cm | MXN |
| 🇧🇷 BR | kg | cm | cm | BRL |
| 🇫🇷 FR | kg | cm | cm | EUR |
| 🇩🇪 DE | kg | cm | cm | EUR |

**No necesitas hacer nada extra** — el engine lee la cookie `kalcufy-country` y cambia `defaultUnit` automáticamente. El preset solo garantiza que `allowedUnits` incluya TODAS las opciones (incluido `st` para UK).

---

## ⚠️ REGLAS

1. **SIEMPRE usar presets** para campos con unitType en calculadoras nuevas
2. **Sobreescribir** solo lo que necesites (placeholder, min, max, defaultValue)
3. **NUNCA** quitar `syncGroup: false` del spread
4. **NUNCA** quitar `"st"` de weight allowedUnits (UK market)
5. Si necesitas un campo que NO existe como preset, créalo en field-presets.ts PRIMERO

---

## 📂 ARCHIVO

```
src/engine/v4/field-presets.ts
```

Importar: `import { HEALTH_WEIGHT, ... } from "@/engine/v4/field-presets";`
