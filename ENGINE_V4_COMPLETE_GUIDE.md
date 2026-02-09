# Engine V4 - Guia Completa de Creacion de Calculadoras

## Indice
1. [Estructura del Archivo](#estructura-del-archivo)
2. [Secciones Obligatorias](#secciones-obligatorias)
3. [REGLAS CRITICAS V4](#reglas-criticas-v4)
4. [Traducciones (t.en)](#traducciones-ten)
5. [Inputs con showWhen](#inputs-con-showwhen)
6. [Sistema de Unidades Dinamico](#sistema-de-unidades-dinamico)
7. [Results](#results)
8. [InfoCards](#infocards)
9. [ReferenceData](#referencedata)
10. [Education Sections](#education-sections)
11. [FAQs](#faqs)
12. [References](#references)
13. [Funcion Calculate](#funcion-calculate)
14. [NO HARDCODEAR TEXTOS](#no-hardcodear-textos)
15. [Instalacion Paso a Paso](#instalacion-paso-a-paso)
16. [Checklist Final](#checklist-final)
17. [Errores Comunes](#errores-comunes)

---

## ⚠️ ESTRUCTURA ESTÁNDAR OBLIGATORIA V4

> **IMPORTANTE:** Todas las calculadoras V4 DEBEN seguir esta estructura exacta para SEO óptimo.

| # | Sección | Cantidad | SEO Benefit |
|---|---------|----------|-------------|
| 1 | **InfoCards** | 3 (último = tips horizontal) | UX, engagement, tiempo en página |
| 2 | **Dual List** | 2 lado a lado (educationSections type="list") | Contenido estructurado, escaneable |
| 3 | **Code-examples** | 2 (educationSections type="code-example") | Contenido único, diferenciador |
| 4 | **Prose** | 2 (educationSections type="prose") | Texto indexable, keywords long-tail |
| 5 | **References** | 2 mínimo | E-E-A-T (Expertise, Authority, Trust) |
| 6 | **FAQs** | 6 mínimo | FAQ Schema, featured snippets |
| 7 | **ReferenceData** | 0 (usar Dual List en su lugar) | - |

### ¿Por qué esta estructura?

- ✅ **FAQs (6)** → Google muestra como FAQ rich snippets en resultados
- ✅ **References (2)** → Señales E-E-A-T para Google (credibilidad médica/financiera)
- ✅ **Prose (2)** → Contenido largo para keywords y contexto semántico
- ✅ **Code-examples (2)** → Contenido único que competidores NO tienen
- ✅ **Dual List (2)** → Información estructurada, mejor que tablas para mobile
- ✅ **InfoCards (3)** → Engagement visual, reduce bounce rate

### Fuentes Recomendadas por Categoría

| Categoría | Fuentes con autoridad |
|-----------|----------------------|
| **Health** | WHO, CDC, NIH, PubMed, Mayo Clinic, Harvard Health |
| **Finance** | Federal Reserve, SEC, IRS, FDIC, Investopedia |
| **Fitness** | ACSM, ACE, NSCA, PubMed, Sports Medicine journals |
| **Nutrition** | USDA, FDA, Harvard T.H. Chan, Academy of Nutrition |

### Ejemplo de Config Estándar

```typescript
infoCards: [
  { id: "metrics", type: "list", icon: "📊", itemCount: 4 },      // Resultados
  { id: "details", type: "list", icon: "🎯", itemCount: 4 },      // Detalles adicionales  
  { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },   // Tips (SIEMPRE último)
],

referenceData: [],  // VACÍO - usar Dual List

educationSections: [
  { id: "whatIs", type: "prose", icon: "📖" },                    // Prose 1
  { id: "howItWorks", type: "prose", icon: "⚙️" },                // Prose 2
  { id: "considerations", type: "list", icon: "📋", itemCount: 6 }, // List 1 (Dual)
  { id: "categories", type: "list", icon: "📊", itemCount: 6 },     // List 2 (Dual)
  { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
],

faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

references: [
  { authors: "...", year: "2024", title: "...", source: "WHO/CDC/etc", url: "..." },
  { authors: "...", year: "...", title: "...", source: "PubMed/etc", url: "..." },
],
```

---

## Estructura del Archivo

Cada calculadora V4 es UN SOLO archivo ubicado en:
```
src/calculators/{calculator-id}/index.ts
```

Ejemplo: `src/calculators/body-fat/index.ts`

### Estructura General

```typescript
import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

export const myCalculatorConfig: CalculatorConfigV4 = {
  id: "my-calculator",
  version: "4.0",
  category: "health", // health | finance | math | everyday
  icon: "ðŸ“Š",

  presets: [...],        // CON ICONOS!
  unitSystem: {...},     // opcional
  
  t: {
    en: {...},
    es: {...},
    pt: {...},
    fr: {...},
  },

  inputs: [...],
  inputGroups: [],       // VACIO para evitar acordeones

  results: [...],
  infoCards: [...],
  referenceData: [...],
  educationSections: [...],
  faqs: [...],
  references: [...],

  hero: {...},
  sidebar: {...},
  features: {...},
  relatedCalculators: [...],
  ads: {...},
};

export function calculateMyCalculator(data: {...}): CalculatorResults {
  ...
}

export default myCalculatorConfig;
```

---

## Secciones Obligatorias (Resumen Rápido)

| Seccion | Cantidad | Descripcion |
|---------|----------|-------------|
| `infoCards` | **3** | 2 tipo list + 1 tipo horizontal (tips) |
| `educationSections` tipo `prose` | **2** | Párrafos educativos |
| `educationSections` tipo `list` | **2** | Dual List lado a lado |
| `educationSections` tipo `code-example` | **1** | Con 2 ejemplos |
| `faqs` | **6** | Preguntas frecuentes (FAQ Schema) |
| `references` | **2** | Fuentes autoritativas (E-E-A-T) |
| `referenceData` | **0** | Usar Dual List en su lugar |
| `t.en.seo.keywords` | **3+** | Keywords para meta tags |
| `t.en.seo.description` | **50+ chars** | Meta description |

---

## REGLAS CRITICAS V4

### 1. Inputs Lado a Lado: usar `width: "half"`

```typescript
// CORRECTO
{
  id: "heightFt",
  width: "half",  // <-- ESTO
  type: "number",
  defaultValue: 5,
  suffix: "ft",
  showWhen: { field: "unitSystem", value: "imperial" },
},
{
  id: "heightIn",
  width: "half",  // <-- ESTO
  type: "number",
  defaultValue: 10,
  suffix: "in",
  showWhen: { field: "unitSystem", value: "imperial" },
},

// INCORRECTO - NO FUNCIONA
{
  id: "heightFt",
  inline: "height",  // <-- NO EXISTE
}
```

### 2. Presets: SIEMPRE incluir `icon`

```typescript
presets: [
  {
    id: "mildLoss",
    icon: "ðŸ¢",  // <-- OBLIGATORIO
    values: { ... },
  },
  {
    id: "moderateLoss",
    icon: "ðŸš¶",  // <-- OBLIGATORIO
    values: { ... },
  },
  {
    id: "aggressiveLoss",
    icon: "ðŸƒ",  // <-- OBLIGATORIO
    values: { ... },
  },
],
```

### 3. inputGroups: Dejar VACIO

```typescript
// INCORRECTO - Causa acordeones colapsados
inputGroups: [
  { id: "personal", inputs: ["gender", "age"] },
],

// CORRECTO - Todos los campos visibles
inputGroups: [],
```

### 4. page.tsx: OBLIGATORIO crear manualmente

El script de instalacion NO crea page.tsx. Debes crearlo:

```typescript
// src/app/[locale]/my-calculator/page.tsx
"use client";
import { useLocale } from "next-intl";
import { CalculatorEngineV4 } from "@/engine/v4";
import { myCalculatorConfig, calculateMyCalculator } from "@/calculators/my-calculator";

export default function MyCalculatorPage() {
  const locale = useLocale();
  return (
    <CalculatorEngineV4
      config={myCalculatorConfig}
      calculate={calculateMyCalculator}
      locale={locale}
    />
  );
}
```

---

## Traducciones (t.en)

```typescript
t: {
  en: {
    name: "My Calculator",
    slug: "my-calculator",
    subtitle: "Description here...",
    breadcrumb: "My Calc",

    seo: {
      title: "My Calculator - Free Tool",
      description: "Description 50+ chars...",
      shortDescription: "Short desc",
      keywords: ["keyword1", "keyword2", "keyword3"],
    },

    calculator: { yourInformation: "Your Information" },
    ui: {
      yourInformation: "Your Information",
      calculate: "Calculate",
      reset: "Reset",
      results: "Results",
    },

    inputs: {
      fieldId: {
        label: "Field Label",
        helpText: "Help text",
        options: { opt1: "Option 1", opt2: "Option 2" },
      },
    },

    results: {
      resultId: { label: "Result Label" },
    },

    presets: {
      presetId: { label: "Preset Name", description: "Description" },
    },

    // CRITICO: Todos los valores dinamicos
    values: {
      "cal": "cal",
      "g": "g",
      "kg": "kg",
      "lbs": "lbs",
      "weeks": "weeks",
      "week": "week",
      "days": "days",
      "day": "day",
      "Low": "Low",
      "High": "High",
    },

    formats: {
      summary: "Your result is {value}.",
    },

    infoCards: {
      tips: {
        title: "Tips",
        items: ["Tip 1", "Tip 2", "Tip 3", "Tip 4"],
      },
    },

    referenceData: {
      tableId: {
        title: "Reference Table",
        items: {
          row1: { label: "Row 1", value: "Value 1" },
        },
      },
    },

    education: {
      whatIs: { title: "What is X?", content: "..." },
      howItWorks: { title: "How It Works", content: "..." },
      considerations: {
        title: "Considerations",
        items: [
          { text: "Item 1", type: "info" },
          { text: "Item 2", type: "warning" },
        ],
      },
      examples: {
        title: "Examples",
        description: "Step by step",
        examples: [
          { title: "Ex 1", steps: ["Step 1", "Step 2"], result: "Result" },
        ],
      },
    },

    faqs: [
      { question: "Q1?", answer: "A1" },
      { question: "Q2?", answer: "A2" },
      { question: "Q3?", answer: "A3" },
      { question: "Q4?", answer: "A4" },
      { question: "Q5?", answer: "A5" },
      { question: "Q6?", answer: "A6" },
    ],

    rating: {
      title: "Rate this Calculator",
      share: "Share",
      copied: "Copied!",
      copyLink: "Copy Link",
      clickToRate: "Click to rate",
      youRated: "You rated",
      stars: "stars",
      averageFrom: "average from",
      ratings: "ratings",
    },

    common: { home: "Home", calculators: "Calculators" },

    buttons: {
      calculate: "Calculate",
      reset: "Reset",
      pdf: "PDF",
      csv: "CSV",
      excel: "Excel",
      save: "Save",
      saved: "Saved",
      saving: "Saving...",
    },

    share: { calculatedWith: "Calculated with Kalcufy.com" },
    accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
    sources: { title: "Sources & References" },
  },
},
```

---

## Inputs con showWhen

```typescript
inputs: [
  {
    id: "unitSystem",
    type: "radio",
    defaultValue: "imperial",
    options: [{ value: "metric" }, { value: "imperial" }],
  },
  // Solo visible cuando unitSystem = "metric"
  {
    id: "weightKg",
    type: "number",
    defaultValue: 80,
    suffix: "kg",
    showWhen: { field: "unitSystem", value: "metric" },
  },
  // Solo visible cuando unitSystem = "imperial"
  {
    id: "weightLbs",
    type: "number",
    defaultValue: 180,
    suffix: "lbs",
    showWhen: { field: "unitSystem", value: "imperial" },
  },
  // Height lado a lado
  {
    id: "heightFt",
    width: "half",
    type: "number",
    defaultValue: 5,
    suffix: "ft",
    showWhen: { field: "unitSystem", value: "imperial" },
  },
  {
    id: "heightIn",
    width: "half",
    type: "number",
    defaultValue: 10,
    suffix: "in",
    showWhen: { field: "unitSystem", value: "imperial" },
  },
],
```

---

## Sistema de Unidades Dinamico

Usar input radio + showWhen:

```typescript
inputs: [
  {
    id: "unitSystem",
    type: "radio",
    defaultValue: "imperial",
    options: [{ value: "metric" }, { value: "imperial" }],
  },
  // Campos metric con showWhen: { field: "unitSystem", value: "metric" }
  // Campos imperial con showWhen: { field: "unitSystem", value: "imperial" }
],
```

---

## Results

```typescript
results: [
  { id: "mainResult", type: "primary", format: "number" },
  { id: "secondary1", type: "secondary", format: "percent" },
  { id: "secondary2", type: "secondary", format: "text" },
],
```

---

## InfoCards

```typescript
// En config
infoCards: [
  {
    id: "tips",
    type: "horizontal",
    icon: "ðŸ’¡",
    itemCount: 4,
  },
],

// En t.en
infoCards: {
  tips: {
    title: "Tips",
    items: ["Tip 1", "Tip 2", "Tip 3", "Tip 4"],
  },
},
```

---

## ReferenceData

```typescript
// En config
referenceData: [
  {
    id: "categories",
    icon: "ðŸ“‹",
    columns: 2,
    itemIds: ["item1", "item2", "item3"],
  },
],

// En t.en
referenceData: {
  categories: {
    title: "Categories",
    items: {
      item1: { label: "Item 1", value: "Value 1" },
      item2: { label: "Item 2", value: "Value 2" },
      item3: { label: "Item 3", value: "Value 3" },
    },
  },
},
```

---

## Education Sections

```typescript
// En config
educationSections: [
  { id: "whatIs", type: "prose", icon: "ðŸ“–" },
  { id: "howItWorks", type: "prose", icon: "âš™ï¸" },
  { id: "considerations", type: "list", icon: "âš ï¸", itemCount: 5 },
  { id: "examples", type: "code-example", icon: "ðŸ§®", columns: 2, exampleCount: 2 },
],

// En t.en.education
education: {
  whatIs: { title: "...", content: "..." },
  howItWorks: { title: "...", content: "..." },
  considerations: { title: "...", items: [...] },
  examples: { title: "...", description: "...", examples: [...] },
},
```

---

## FAQs

```typescript
// En config
faqs: [
  { id: "0" },
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
  { id: "5" },
],

// En t.en
faqs: [
  { question: "Q1?", answer: "A1" },
  { question: "Q2?", answer: "A2" },
  // ... minimo 6
],
```

---

## References

```typescript
references: [
  {
    authors: "Author Name",
    year: "2024",
    title: "Title",
    source: "Source",
    url: "https://...",
  },
  // ... minimo 2
],
```

---

## Funcion Calculate

```typescript
export function calculateMyCalculator(data: {
  values: Record<string, unknown>;
  units?: Record<string, string>;
  unitSystem?: "metric" | "imperial";
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;

  // CRITICO: Obtener traducciones
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // Leer inputs
  const unitSystem = values.unitSystem as string;
  
  // Convertir unidades
  let weightKg: number;
  if (unitSystem === "metric") {
    weightKg = values.weightKg as number;
  } else {
    weightKg = (values.weightLbs as number) / 2.20462;
  }

  // Calcular...
  const result = weightKg * 2;

  // CRITICO: Usar v["key"] para todo
  const calUnit = v["cal"] || "cal";
  const weekLabel = weeks === 1 ? (v["week"] || "week") : (v["weeks"] || "weeks");

  return {
    values: {
      result: result,
    },
    formatted: {
      result: `${result.toFixed(1)} ${calUnit}`,  // USA v["key"]
    },
    summary: f.summary?.replace("{value}", result.toString()) || "",
    isValid: true,
  };
}
```

---

## NO HARDCODEAR TEXTOS

### MAL - Texto hardcodeado:

```typescript
return {
  formatted: {
    dailyCalories: `${calories} cal`,     // MAL: "cal" hardcodeado
    timeToGoal: `${weeks} weeks`,          // MAL: "weeks" hardcodeado
  },
};
```

### BIEN - Usando traducciones:

```typescript
// En t.en.values:
values: {
  "cal": "cal",
  "weeks": "weeks",
  "week": "week",
},

// En calculate():
const v = (t?.values as Record<string, string>) || {};
const calUnit = v["cal"] || "cal";
const weekLabel = weeks === 1 ? (v["week"] || "week") : (v["weeks"] || "weeks");

return {
  formatted: {
    dailyCalories: `${calories} ${calUnit}`,
    timeToGoal: `${weeks} ${weekLabel}`,
  },
};
```

---

## Instalacion Paso a Paso

### 1. Crear carpeta y archivo

```bash
mkdir -p src/calculators/my-calculator
# Copiar index.ts a src/calculators/my-calculator/
```

### 2. Crear page.tsx (OBLIGATORIO)

```bash
mkdir -p "src/app/[locale]/my-calculator"
```

Crear `src/app/[locale]/my-calculator/page.tsx`:

```typescript
"use client";
import { useLocale } from "next-intl";
import { CalculatorEngineV4 } from "@/engine/v4";
import { myCalculatorConfig, calculateMyCalculator } from "@/calculators/my-calculator";

export default function MyCalculatorPage() {
  const locale = useLocale();
  return (
    <CalculatorEngineV4
      config={myCalculatorConfig}
      calculate={calculateMyCalculator}
      locale={locale}
    />
  );
}
```

### 3. Agregar al Registry

Editar `src/engine/v4/slugs/registry.ts`:

```typescript
export const V4_CALCULATOR_SLUGS = [
  "age",
  "body-fat",
  "my-calculator",  // Agregar
];
```

### 4. Agregar a Base de Datos

```bash
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.calculatorStatus.upsert({
    where: { slug: 'my-calculator' },
    update: {},
    create: { slug: 'my-calculator', isActive: true },
  });
  console.log('Done');
}
main().finally(() => prisma.\$disconnect());
"
```

### 5. Agregar a calculators-config.ts

```typescript
export const HEALTH_CALCULATORS = [
  {
    slug: "my-calculator",
    name: "My Calculator",
    description: "Description",
    icon: "ðŸ“Š",
    color: "blue",
    category: "health",
    isNew: true,
    isPro: false,
  },
];
```

### 6. Agregar traducciones globales

En `messages/en.json`:

```json
{
  "calculators": {
    "names": {
      "myCalculator": "My Calculator"
    }
  },
  "calculatorsPage": {
    "calcs": {
      "myCalculator": {
        "desc": "Description"
      }
    }
  }
}
```

### 7. Limpiar cache y probar

```bash
rm -rf .next
npm run dev
```

---

## Checklist Final

### Config
- [ ] `inputGroups: []` - VACIO
- [ ] `width: "half"` en heightFt y heightIn
- [ ] `icon` en cada preset
- [ ] `presets` tiene valores para ambos sistemas de unidades

### Traducciones (t.en)
- [ ] `values` tiene TODAS las unidades (cal, g, kg, lbs, %, weeks, week, etc)
- [ ] `formats.summary` tiene template
- [ ] `faqs` tiene 6+ items
- [ ] `rating`, `common`, `buttons`, `share`, `accessibility`, `sources` incluidos

### Funcion Calculate
- [ ] Usa `v["key"]` para TODAS las unidades
- [ ] Usa `v["key"]` para valores dinamicos (categorias, mensajes)
- [ ] Usa `f.summary` para template
- [ ] NO tiene textos hardcodeados

### Instalacion
- [ ] `src/calculators/{id}/index.ts` existe
- [ ] `src/app/[locale]/{id}/page.tsx` existe (CREAR MANUALMENTE)
- [ ] Agregado a `registry.ts`
- [ ] Agregado a base de datos
- [ ] Agregado a `calculators-config.ts`
- [ ] Agregado a `messages/*.json`
- [ ] Cache limpiado: `rm -rf .next`

---

## Errores Comunes

| Error | Causa | Solucion |
|-------|-------|----------|
| Campos colapsados | `inputGroups` tiene items | Usar `inputGroups: []` |
| Height no lado a lado | Falta `width: "half"` | Agregar `width: "half"` a ambos |
| Presets sin iconos | Falta `icon` | Agregar `icon: "ðŸƒ"` |
| "Calculator not found" | Falta page.tsx | Crear page.tsx manualmente |
| Textos no traducidos | Hardcodeados | Usar `v["key"]` |
| JSON parse error | Cache corrupto | `rm -rf .next` |
