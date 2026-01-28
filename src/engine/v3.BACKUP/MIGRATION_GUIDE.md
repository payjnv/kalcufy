# Guía de Migración a Engine V3

## Prompt para Nuevo Chat

```
Proyecto: Kalcufy (Next.js calculator platform)
Ubicación: ~/Desktop/kalcufy

TAREA: Migrar calculadora [NOMBRE] a Engine V3

1. Lee la documentación: src/engine/v3/README.md
2. Lee la calculadora original: src/app/[locale]/[nombre]-calculator/page.tsx
3. Lee ejemplo V3: src/config/calculators/v3/pregnancy.config.ts

CREAR:
- Config: src/config/calculators/v3/[nombre].config.ts
- Page: src/app/[locale]/v3/[nombre]-calculator/page.tsx

SECCIONES OBLIGATORIAS (el Engine lanza error si faltan):
- references: [] (Sources & References)
- educationSections con type: "code-example" (Example Calculation)
- educationSections con type: "list" (Important Considerations)
```

---

## Paso a Paso Manual

### Paso 1: Identificar Inputs de la Calculadora Original

Buscar en el archivo original:
- useState para valores
- Campos de formulario (input, select, radio)
- Validaciones

### Paso 2: Crear Config File

Ubicación: `src/config/calculators/v3/[nombre].config.ts`

```typescript
import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

export const nombreConfig: CalculatorConfigV3 = {
  id: "nombre",
  slug: "nombre-calculator",
  name: "Nombre Calculator",
  category: "finance", // finance | health | everyday
  icon: "📊",

  seo: {
    title: "Nombre Calculator - Free Online Tool",
    description: "Calculate...",
    shortDescription: "Calculate...",
    keywords: ["calculator", "..."],
  },

  hero: {
    badge: "Finance",
    rating: { average: 4.9, count: 1000 },
  },

  unitSystem: {
    enabled: false, // true si necesita imperial/metric
    default: "imperial",
    options: [],
  },

  // INPUTS - Convertir de la calculadora original
  inputs: [
    // Ver sección "Tipos de Inputs" abajo
  ],

  inputGroups: [], // Grupos colapsables opcionales

  // RESULTS - Definir qué mostrar
  results: [
    { id: "mainResult", type: "primary", label: "Total Cost", format: "number", suffix: "$" },
    { id: "detail1", type: "secondary", label: "Detail", format: "text" },
  ],

  // OBLIGATORIO: educationSections
  educationSections: [
    // Opcional: Cards
    {
      id: "aboutMethods",
      type: "cards",
      title: "About This Calculator",
      icon: "📊",
      columns: 2,
      cards: [
        { title: "Feature 1", description: "...", icon: "✅" },
        { title: "Feature 2", description: "...", icon: "📈" },
      ],
    },
    // OBLIGATORIO: Important Considerations
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "These are estimates only", type: "warning" },
        { text: "Actual results may vary", type: "info" },
      ],
    },
    // OBLIGATORIO: Example Calculation
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "📊",
      description: "Example scenario",
      columns: 1,
      examples: [
        {
          title: "Example",
          steps: [
            "Step 1: Input value = 100",
            "Step 2: Multiply by rate",
            "Step 3: Add fees",
          ],
          result: "Total: $150",
        },
      ],
    },
    // Opcional: Prose
    {
      id: "whatIs",
      type: "prose",
      title: "What is Nombre?",
      content: "Explanation paragraph...",
    },
  ],

  // FAQs
  faqs: [
    { question: "How accurate is this?", answer: "..." },
    { question: "What factors affect the result?", answer: "..." },
  ],

  // OBLIGATORIO: References
  references: [
    { authors: "Source Name", year: "2024", title: "Article Title", source: "Website/Journal" },
  ],

  // Opcional: Detailed Table Modal
  // detailedTable: { ... },

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "finance" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["compound-interest-calculator", "loan-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// FUNCIÓN DE CÁLCULO - Convertir lógica de la calculadora original
export function calculateNombre(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;
  
  // Extraer valores
  const input1 = values.input1 as number;
  const input2 = values.input2 as number;
  
  // Lógica de cálculo (copiar de original)
  const result = input1 * input2;
  
  // Validación
  if (!input1 || !input2) {
    return {
      values: {},
      formatted: { mainResult: "—" },
      summary: "Enter values to calculate",
      isValid: false,
    };
  }
  
  return {
    values: { mainResult: result },
    formatted: {
      mainResult: "$" + result.toFixed(2),
      detail1: "Some detail",
    },
    summary: "Your total cost is $" + result.toFixed(2),
    isValid: true,
  };
}

export default nombreConfig;
```

### Paso 3: Crear Page Component

Ubicación: `src/app/[locale]/v3/[nombre]-calculator/page.tsx`

```typescript
"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { nombreConfig, calculateNombre } from "@/config/calculators/v3/nombre.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function NombreCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "nombre-calculator");

  return (
    <CalculatorEngineV3
      config={nombreConfig}
      calculate={calculateNombre}
      t={t}
    />
  );
}
```

---

## Tipos de Inputs

### number
```typescript
{ id: "amount", type: "number", label: "Amount", required: true, defaultValue: 1000, min: 0, max: 100000, suffix: "$" }
```

### slider
```typescript
{ id: "rate", type: "slider", label: "Rate", required: true, defaultValue: 5, min: 0, max: 100, step: 0.1, suffix: "%" }
```

### select
```typescript
{ id: "type", type: "select", label: "Type", required: true, defaultValue: "option1", options: [{ value: "option1", label: "Option 1" }, { value: "option2", label: "Option 2" }] }
```

### radio
```typescript
{ id: "gender", type: "radio", label: "Gender", required: true, defaultValue: "male", options: [{ value: "male", label: "Male" }, { value: "female", label: "Female" }] }
```

### date
```typescript
{ id: "startDate", type: "date", label: "Start Date", required: true }
```

### text
```typescript
{ id: "name", type: "text", label: "Name", required: false, placeholder: "Enter name" }
```

### Inputs Condicionales (showWhen)
```typescript
{ id: "extraField", type: "number", label: "Extra", showWhen: { field: "type", value: "option2" } }
```

### Half-width (lado a lado)
```typescript
{ id: "min", type: "number", label: "Min", width: "half" },
{ id: "max", type: "number", label: "Max", width: "half" }
```

---

## Checklist de Migración

- [ ] Config creado en src/config/calculators/v3/
- [ ] Page creado en src/app/[locale]/v3/
- [ ] Todos los inputs definidos
- [ ] Función de cálculo implementada
- [ ] references agregado (OBLIGATORIO)
- [ ] educationSections con type: "list" (OBLIGATORIO)
- [ ] educationSections con type: "code-example" (OBLIGATORIO)
- [ ] FAQs agregados
- [ ] Probado en navegador: http://localhost:3000/en/v3/[nombre]-calculator

---

## Ejemplo: Migrar fuel-cost-calculator

### Prompt para Chat:

```
Proyecto: Kalcufy (Next.js calculator platform)
Ubicación: ~/Desktop/kalcufy

Migrar fuel-cost-calculator a V3:

1. Lee: src/engine/v3/README.md
2. Lee original: src/app/[locale]/fuel-cost-calculator/page.tsx
3. Lee ejemplo: src/config/calculators/v3/pregnancy.config.ts

Crear:
- src/config/calculators/v3/fuel-cost.config.ts
- src/app/[locale]/v3/fuel-cost-calculator/page.tsx

Inputs probables: distance, fuel efficiency (mpg/L per 100km), fuel price
Resultados: total fuel cost, fuel needed, cost per mile/km
```
