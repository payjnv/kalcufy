# Engine V3 - Requisitos de Validación

## Requisitos Mínimos Obligatorios

| Sección | Mínimo | Descripción |
|---------|--------|-------------|
| `prose` | **2 secciones** | Secciones educativas tipo párrafo (What is X?, How it works, etc) |
| `faqs` | **6 preguntas** | Preguntas frecuentes para SEO |
| `list items` | **5 items** | Items en sección "Important Considerations" |
| `code-example` | **1 sección** | Ejemplos de cálculo con steps |
| `references` | **2 fuentes** | Referencias científicas/oficiales |
| `infoCards` | **2 cards** | 1 tipo "list" + 1 tipo "horizontal" |
| `referenceData` | **1 card** | Tabla de referencia con columns grid |

---

## Estructura Completa del Config

```typescript
import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

export const myCalculatorConfig: CalculatorConfigV3 = {
  // ═══════════════════════════════════════════════════════════════
  // BASIC INFO
  // ═══════════════════════════════════════════════════════════════
  id: "my-calculator",
  slug: "my-calculator",
  name: "My Calculator",
  category: "health", // health | finance | math | everyday
  icon: "📏",

  // ═══════════════════════════════════════════════════════════════
  // SEO (required)
  // ═══════════════════════════════════════════════════════════════
  seo: {
    title: "My Calculator - Free Online Tool",
    description: "Description with at least 50 characters for SEO...",
    shortDescription: "Short description for hero",
    keywords: ["keyword1", "keyword2", "keyword3"], // minimum 3
  },

  // ═══════════════════════════════════════════════════════════════
  // HERO
  // ═══════════════════════════════════════════════════════════════
  hero: {
    badge: "Health",
    rating: { average: 4.9, count: 2500 },
  },

  // ═══════════════════════════════════════════════════════════════
  // UNIT SYSTEM (optional)
  // ═══════════════════════════════════════════════════════════════
  unitSystem: {
    enabled: true,
    default: "imperial",
    options: [
      { value: "imperial", label: "Imperial" },
      { value: "metric", label: "Metric" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════
  inputs: [
    {
      id: "fieldName",
      type: "number", // number | radio | select
      label: "Field Label",
      required: true,
      defaultValue: 100,
      min: 0,
      max: 1000,
      step: 1,
      suffix: "units",
      helpText: "Optional help text",
      // For unit conversion:
      units: {
        imperial: { suffix: "lb", min: 0, max: 500, default: 150 },
        metric: { suffix: "kg", min: 0, max: 230, default: 70 },
      },
    },
  ],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════
  results: [
    { id: "mainResult", type: "primary", label: "Main Result", format: "number" },
    { id: "secondaryResult", type: "secondary", label: "Secondary", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // INFO CARDS (required: 2 cards)
  // Card 1: type "list" - shows result values
  // Card 2: type "horizontal" - shows tips
  // ═══════════════════════════════════════════════════════════════
  infoCards: [
    {
      id: "resultsCard",
      title: "Your Results",
      type: "list",
      icon: "📊",
      items: [
        { label: "Result 1", valueKey: "mainResult" },
        { label: "Result 2", valueKey: "secondaryResult" },
      ],
    },
    {
      id: "tipsCard",
      title: "Quick Tips",
      type: "horizontal",
      icon: "💡",
      items: [
        { label: "Tip 1 text here" },
        { label: "Tip 2 text here" },
        { label: "Tip 3 text here" },
        { label: "Tip 4 text here" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // REFERENCE DATA (required: 1 card with columns)
  // ═══════════════════════════════════════════════════════════════
  referenceData: [
    {
      id: "referenceTable",
      title: "Reference Table",
      icon: "📋",
      columns: 2, // or 3
      items: [
        { label: "Category 1", value: "Value 1" },
        { label: "Category 2", value: "Value 2" },
        { label: "Category 3", value: "Value 3" },
        { label: "Category 4", value: "Value 4" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS (required sections marked)
  // ═══════════════════════════════════════════════════════════════
  educationSections: [
    // REQUIRED: 2 prose sections minimum
    {
      id: "whatIs",
      type: "prose",
      title: "What is X?",
      icon: "📖",
      content: "Paragraph explaining what this calculator does and why it matters...",
    },
    {
      id: "howItWorks",
      type: "prose", 
      title: "How It Works",
      icon: "⚙️",
      content: "Explanation of the methodology, formulas, or process...",
    },

    // OPTIONAL: cards section
    {
      id: "comparison",
      type: "cards",
      title: "Comparison",
      icon: "⚖️",
      columns: 2,
      cards: [
        { title: "Option A", description: "Description of option A", icon: "✅" },
        { title: "Option B", description: "Description of option B", icon: "⚠️" },
      ],
    },

    // REQUIRED: list section with 5+ items
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "Consideration 1", type: "warning" },
        { text: "Consideration 2", type: "warning" },
        { text: "Consideration 3", type: "info" },
        { text: "Consideration 4", type: "info" },
        { text: "Consideration 5", type: "info" },
      ],
    },

    // REQUIRED: code-example section
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "🧮",
      description: "Step-by-step examples",
      columns: 2,
      examples: [
        {
          title: "Example 1",
          steps: ["Step 1: Input X", "Step 2: Calculate Y", "Step 3: Result Z"],
          result: "Final Result: 123",
        },
        {
          title: "Example 2", 
          steps: ["Step 1: Input A", "Step 2: Calculate B"],
          result: "Final Result: 456",
        },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // FAQs (required: 6 minimum)
  // ═══════════════════════════════════════════════════════════════
  faqs: [
    { question: "Question 1?", answer: "Answer 1" },
    { question: "Question 2?", answer: "Answer 2" },
    { question: "Question 3?", answer: "Answer 3" },
    { question: "Question 4?", answer: "Answer 4" },
    { question: "Question 5?", answer: "Answer 5" },
    { question: "Question 6?", answer: "Answer 6" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // REFERENCES (required: 2 minimum)
  // ═══════════════════════════════════════════════════════════════
  references: [
    {
      authors: "Author Name",
      year: "2024",
      title: "Title of the source",
      source: "Journal or Website Name",
      url: "https://example.com",
    },
    {
      authors: "Organization Name",
      year: "2024",
      title: "Official Guidelines",
      source: "Official Source",
      url: "https://example.org",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // SIDEBAR & FEATURES
  // ═══════════════════════════════════════════════════════════════
  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: false,
    category: "health",
  },

  features: {
    autoCalculate: true,
    exportPDF: true,
    shareResults: true,
    saveHistory: true,
  },

  relatedCalculators: ["calculator-1", "calculator-2"],

  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
  },
};

// ═══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════
export function calculateMyCalculator(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values, unitSystem } = data;
  
  // Get input values
  const inputValue = values.fieldName as number;
  
  // Perform calculations
  const result = inputValue * 2;
  
  return {
    values: {
      mainResult: result,
      secondaryResult: "Some text",
    },
    formatted: {
      mainResult: result.toFixed(2),
      secondaryResult: "Formatted text",
    },
    summary: "Summary of results...",
    isValid: true,
  };
}

export default myCalculatorConfig;
```

---

## Checklist Rápido

Antes de crear una calculadora, verifica:

- [ ] 2+ secciones `type: "prose"` en educationSections
- [ ] 1 sección `type: "list"` con 5+ items
- [ ] 1 sección `type: "code-example"` con 2 ejemplos
- [ ] 6+ FAQs
- [ ] 2+ references
- [ ] 2 infoCards (1 list + 1 horizontal)
- [ ] 1 referenceData con columns
- [ ] SEO description 50+ caracteres
- [ ] 3+ SEO keywords

---

## Archivos Necesarios

Para cada calculadora necesitas:

```
src/config/calculators/v3/
  └── my-calculator.config.ts       # Config + función calculate

src/app/[locale]/my-calculator/
  └── page.tsx                       # Componente de página

src/messages/calculators/es/
  └── my.json                        # Traducción español (sin "-calculator")

src/messages/calculators/pt/
  └── my.json                        # Traducción portugués (opcional)
```

### Naming Convention para Traducciones

| Slug de la calculadora | Nombre del archivo JSON |
|------------------------|------------------------|
| `my-calculator` | `my.json` |
| `bmi-calculator` | `bmi.json` |
| `step-calculator` | `step.json` |
| `waist-to-height-ratio-calculator` | `waist-to-height-ratio.json` |

**IMPORTANTE**: El hook `useCalcTranslations` quita automáticamente el sufijo `-calculator` del slug.

---

## Sistema de Traducciones Completo

### Cómo Funciona

```typescript
// En el config (inglés por defecto - fallback)
{
  title: "What is BMI?",  // Este es el fallback en inglés
}

// El sistema busca traducción así:
t("education.whatIs.title", "What is BMI?")
//  ↑ clave de traducción      ↑ fallback si no existe
```

- **Si existe traducción en JSON** → muestra el texto traducido
- **Si NO existe traducción** → muestra el fallback en inglés del config

### Estructura del JSON de Traducción

```json
{
  "calculator": {
    "title": "Título de la Calculadora",
    "subtitle": "Subtítulo corto",
    "breadcrumb": "Nombre corto para breadcrumb",
    "yourInformation": "Tu Información"
  },

  "inputs": {
    "fieldId": {
      "label": "Etiqueta del Campo",
      "helpText": "Texto de ayuda opcional",
      "suffix": "unidades",
      "options": {
        "option1": "Opción 1",
        "option2": "Opción 2"
      }
    }
  },

  "results": {
    "resultId": "Nombre del Resultado"
  },

  "info": {
    "cardId": {
      "title": "Título del Card",
      "0": "Primer item",
      "1": "Segundo item",
      "2": "Tercer item"
    }
  },

  "reference": {
    "tableId": {
      "title": "Título de la Tabla",
      "items": {
        "0": "Fila 1",
        "1": "Fila 2"
      }
    }
  },

  "education": {
    "sectionId": {
      "title": "Título de la Sección",
      "content": "Contenido del párrafo para type prose...",
      "description": "Descripción para code-example...",
      "cards": {
        "0": {
          "title": "Título Card 1",
          "description": "Descripción card 1"
        },
        "1": {
          "title": "Título Card 2",
          "description": "Descripción card 2"
        }
      },
      "items": {
        "0": { "text": "Item 1 de la lista" },
        "1": { "text": "Item 2 de la lista" }
      },
      "examples": {
        "0": {
          "title": "Ejemplo 1",
          "steps": {
            "0": "Paso 1",
            "1": "Paso 2",
            "2": "Paso 3"
          },
          "result": "Resultado: X"
        }
      }
    }
  },

  "faq": {
    "title": "Preguntas Frecuentes",
    "0": {
      "question": "¿Pregunta 1?",
      "answer": "Respuesta 1"
    },
    "1": {
      "question": "¿Pregunta 2?",
      "answer": "Respuesta 2"
    }
  },

  "sources": {
    "title": "Fuentes y Referencias"
  },

  "common": {
    "home": "Inicio",
    "calculators": "Calculadoras"
  },

  "buttons": {
    "calculate": "Calcular",
    "reset": "Reiniciar",
    "pdf": "PDF",
    "excel": "Excel"
  },

  "disclaimers": {
    "health": "Los resultados son estimaciones. Consulta a un profesional.",
    "finance": "Estos cálculos son solo para fines informativos."
  }
}
```

### Mapeo de IDs Config → JSON

| En el Config | En el JSON de Traducción |
|--------------|--------------------------|
| `inputs[].id: "weight"` | `inputs.weight.label` |
| `inputs[].options[].value: "male"` | `inputs.gender.options.male` |
| `results[].id: "bmi"` | `results.bmi` |
| `infoCards[].id: "tipsCard"` | `info.tipsCard.title` |
| `infoCards[].items[0]` | `info.tipsCard.0` |
| `educationSections[].id: "whatIs"` | `education.whatIs.title` |
| `educationSections[].content` | `education.whatIs.content` |
| `faqs[0]` | `faq.0.question`, `faq.0.answer` |
| `referenceData[].id: "table1"` | `reference.table1.title` |

### Ejemplo Completo: BMI Calculator

**Config (inglés fallback):**
```typescript
inputs: [
  {
    id: "weight",
    label: "Weight",  // fallback inglés
    helpText: "Enter your weight",
  },
  {
    id: "gender",
    label: "Gender",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
    ],
  },
],
```

**Traducción español (`bmi.json`):**
```json
{
  "inputs": {
    "weight": {
      "label": "Peso",
      "helpText": "Ingresa tu peso"
    },
    "gender": {
      "label": "Género",
      "options": {
        "male": "Hombre",
        "female": "Mujer"
      }
    }
  }
}
```

### Tips para Traducciones

1. **No necesitas traducir todo** - Solo lo que quieres cambiar del inglés
2. **Los IDs deben coincidir exactamente** - `weight` en config = `weight` en JSON
3. **Usa índices numéricos para arrays** - `"0"`, `"1"`, `"2"` no `"item1"`
4. **El archivo se llama sin `-calculator`** - `bmi-calculator` → `bmi.json`

---

## Errores Comunes

Si ves este error:
```
❌ Calculator my-calculator validation failed:
   - educationSections: minimum 2 prose sections required
```

Significa que te faltan secciones prose. Agrega más secciones con `type: "prose"`.

Si ves:
```
   - faqs: minimum 6 FAQ items required
```

Agrega más preguntas al array `faqs`.

---

## Instalación de una Nueva Calculadora

### Paso 1: Copiar el Config

```bash
cp ~/Downloads/my-calculator.config.ts src/config/calculators/v3/
```

### Paso 2: Copiar la Traducción

```bash
# Español (quitar sufijo -calculator del nombre)
cp ~/Downloads/my.es.json src/messages/calculators/es/my.json

# Portugués (opcional)
cp ~/Downloads/my.pt.json src/messages/calculators/pt/my.json
```

### Paso 3: Crear la Carpeta de la Página

```bash
mkdir -p "src/app/[locale]/my-calculator"
```

### Paso 4: Crear el page.tsx

```bash
cat > "src/app/[locale]/my-calculator/page.tsx" << 'EOF'
"use client";
import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { myCalculatorConfig, calculateMyCalculator } from "@/config/calculators/v3/my-calculator.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function MyCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "my-calculator");
  return (
    <CalculatorEngineV3
      config={myCalculatorConfig}
      calculate={calculateMyCalculator}
      t={t}
    />
  );
}
EOF
```

### Paso 5: Registrar en el Sistema (opcional pero recomendado)

Agregar al archivo de calculadoras activas para que aparezca en el sitemap y listings:

```bash
# Verificar dónde están registradas las calculadoras
cat src/config/calculators/index.ts
```

### Paso 6: Probar

```bash
npm run dev
# Visitar: http://localhost:3000/es/my-calculator
```

---

## Categorías Disponibles

Las categorías se definen en el campo `category` del config:

```typescript
category: "health", // health | finance | math | everyday
```

### Categorías Actuales

| Categoría | Descripción | Icono |
|-----------|-------------|-------|
| `health` | Calculadoras de salud y fitness | 🏥 |
| `finance` | Calculadoras financieras | 💰 |
| `math` | Calculadoras matemáticas | 🔢 |
| `everyday` | Calculadoras de uso diario | 📅 |

### Agregar Nueva Categoría

1. **Editar el archivo de categorías** (si existe):

```bash
# Buscar dónde están definidas las categorías
grep -r "health.*finance.*math" src/
```

2. **O simplemente usar la nueva categoría en el config**:

```typescript
// En tu config
category: "fitness", // Nueva categoría
```

3. **Agregar traducción de la categoría** (si el sistema lo requiere):

```bash
# Buscar archivo de traducciones de categorías
find src -name "*.json" | xargs grep -l "health"
```

4. **Agregar icono de categoría** (si hay un mapeo):

```typescript
// Buscar en el código
const categoryIcons = {
  health: "🏥",
  finance: "💰",
  math: "🔢",
  everyday: "📅",
  fitness: "💪", // Nueva
};
```

### Ubicación de Iconos SVG de Categorías

Si las categorías usan iconos SVG en lugar de emojis:

```bash
ls src/components/icons/categories/
# o
ls public/icons/categories/
```

---

## Comando Rápido: Instalar Calculadora Completa

Script para instalar una calculadora con todos sus archivos:

```bash
# Reemplaza "step" con el nombre de tu calculadora (sin -calculator)
NAME="step"

# 1. Copiar config
cp ~/Downloads/${NAME}-calculator.config.ts src/config/calculators/v3/

# 2. Copiar traducción español
cp ~/Downloads/${NAME}.es.json src/messages/calculators/es/${NAME}.json

# 3. Crear carpeta
mkdir -p "src/app/[locale]/${NAME}-calculator"

# 4. Verificar
ls -la src/config/calculators/v3/${NAME}*
ls -la src/messages/calculators/es/${NAME}*
ls -la "src/app/[locale]/${NAME}-calculator/"
```

### Para las 4 Calculadoras de Salud

```bash
# Waist-to-Height Ratio
cp ~/Downloads/waist-to-height-ratio-calculator.config.ts src/config/calculators/v3/
cp ~/Downloads/waist-to-height-ratio.es.json src/messages/calculators/es/waist-to-height-ratio.json
mkdir -p "src/app/[locale]/waist-to-height-ratio-calculator"

# Lean Body Mass
cp ~/Downloads/lean-body-mass-calculator.config.ts src/config/calculators/v3/
cp ~/Downloads/lean-body-mass.es.json src/messages/calculators/es/lean-body-mass.json
mkdir -p "src/app/[locale]/lean-body-mass-calculator"

# Step Calculator
cp ~/Downloads/step-calculator.config.ts src/config/calculators/v3/
cp ~/Downloads/step.es.json src/messages/calculators/es/step.json
mkdir -p "src/app/[locale]/step-calculator"

# Rest Day Calculator
cp ~/Downloads/rest-day-calculator.config.ts src/config/calculators/v3/
cp ~/Downloads/rest-day.es.json src/messages/calculators/es/rest-day.json
mkdir -p "src/app/[locale]/rest-day-calculator"
```

---

## Tipos de Inputs Disponibles

### Input Type: `number`

```typescript
{
  id: "weight",
  type: "number",
  label: "Weight",
  required: true,
  defaultValue: 150,
  min: 50,
  max: 500,
  step: 0.5,        // Incremento (0.5, 1, 5, etc.)
  suffix: "lb",     // Unidad mostrada
  prefix: "$",      // Para monedas (opcional)
  helpText: "Enter your current weight",
  placeholder: "150",
}
```

### Input Type: `radio`

```typescript
{
  id: "gender",
  type: "radio",
  label: "Gender",
  required: true,
  defaultValue: "male",
  options: [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ],
}
```

### Input Type: `select`

```typescript
{
  id: "activityLevel",
  type: "select",
  label: "Activity Level",
  required: true,
  defaultValue: "moderate",
  options: [
    { value: "sedentary", label: "Sedentary (little or no exercise)" },
    { value: "light", label: "Light (1-3 days/week)" },
    { value: "moderate", label: "Moderate (3-5 days/week)" },
    { value: "active", label: "Active (6-7 days/week)" },
    { value: "veryActive", label: "Very Active (2x per day)" },
  ],
}
```

---

## Sistema de Unidades (Unit System)

### Habilitar Conversión Imperial/Metric

```typescript
unitSystem: {
  enabled: true,
  default: "imperial",  // o "metric"
  options: [
    { value: "imperial", label: "Imperial (lb, in, mi)" },
    { value: "metric", label: "Metric (kg, cm, km)" },
  ],
},
```

### Input con Conversión de Unidades

```typescript
{
  id: "weight",
  type: "number",
  label: "Weight",
  required: true,
  defaultValue: 150,  // Valor por defecto para imperial
  suffix: "lb",       // Sufijo por defecto
  min: 50,
  max: 500,
  // Configuración por sistema de unidades:
  units: {
    imperial: { 
      suffix: "lb", 
      min: 50, 
      max: 500, 
      step: 1,
      default: 150 
    },
    metric: { 
      suffix: "kg", 
      min: 25, 
      max: 230, 
      step: 0.5,
      default: 70 
    },
  },
}
```

### Usar unitSystem en la Función Calculate

```typescript
export function calculateMyCalculator(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values, unitSystem } = data;
  
  let weight = values.weight as number;
  let height = values.height as number;
  
  // Convertir a métrico para cálculos internos
  if (unitSystem === "imperial") {
    weight = weight * 0.453592;  // lb to kg
    height = height * 2.54;       // in to cm
  }
  
  // Hacer cálculos en métrico...
  const result = weight / Math.pow(height / 100, 2);
  
  // Formatear resultado según sistema de unidades
  const formatted = unitSystem === "imperial" 
    ? `${(result * 2.20462).toFixed(1)} lb`
    : `${result.toFixed(1)} kg`;
  
  return { ... };
}
```

---

## Campos Condicionales (showWhen)

Mostrar/ocultar campos basado en el valor de otro campo:

### Ejemplo: Mostrar campo solo si otro tiene valor específico

```typescript
inputs: [
  {
    id: "knowsBodyFat",
    type: "radio",
    label: "Do you know your body fat %?",
    required: true,
    defaultValue: "no",
    options: [
      { value: "no", label: "No" },
      { value: "yes", label: "Yes" },
    ],
  },
  {
    id: "bodyFatPercent",
    type: "number",
    label: "Body Fat Percentage",
    required: false,  // No requerido porque es condicional
    defaultValue: 20,
    min: 3,
    max: 60,
    suffix: "%",
    // SOLO se muestra cuando knowsBodyFat === "yes"
    showWhen: { field: "knowsBodyFat", value: "yes" },
  },
],
```

### Ejemplo: Mostrar para múltiples valores

```typescript
{
  id: "steps",
  type: "number",
  label: "Number of Steps",
  showWhen: { 
    field: "calculationMode", 
    value: ["stepsToDistance", "stepsToCalories"]  // Array de valores
  },
}
```

---

## Formatos de Resultados

### Tipos de formato disponibles

```typescript
results: [
  // Número simple
  { id: "bmi", type: "primary", label: "BMI", format: "number" },
  
  // Texto
  { id: "category", type: "secondary", label: "Category", format: "text" },
  
  // Moneda (no confirmado, verificar en engine)
  { id: "total", type: "primary", label: "Total", format: "currency" },
  
  // Porcentaje (no confirmado, verificar en engine)
  { id: "rate", type: "secondary", label: "Rate", format: "percent" },
]
```

### Formatear en la función calculate

El formato real se hace en `formatted`:

```typescript
return {
  values: {
    bmi: 24.5,           // Valor numérico raw
    category: "normal",  // Valor raw
    savings: 1500.50,    // Valor raw
  },
  formatted: {
    bmi: "24.5",                    // String formateado
    category: "Normal Weight",      // String con formato legible
    savings: "$1,500.50",           // Con símbolo de moneda
    percentage: "15.5%",            // Con símbolo de porcentaje
  },
  summary: "Your BMI is 24.5, which is considered Normal Weight.",
  isValid: true,
};
```

---

## Configuración de Anuncios (Ads)

```typescript
ads: {
  mobileHero: true,      // Anuncio en hero para mobile
  sidebar: true,         // Anuncio en sidebar (desktop)
  mobileContent: true,   // Anuncio entre contenido (mobile)
  bottom: true,          // Anuncio al final de la página
},
```

### Posiciones de Anuncios

| Posición | Descripción | Dispositivo |
|----------|-------------|-------------|
| `mobileHero` | Debajo del hero section | Mobile |
| `sidebar` | En la barra lateral derecha | Desktop |
| `mobileContent` | Entre secciones de contenido | Mobile |
| `bottom` | Al final, antes del footer | Ambos |

---

## Configuración de Features

```typescript
features: {
  autoCalculate: true,   // Calcula automáticamente al cambiar inputs
  exportPDF: true,       // Habilita botón "Export PDF"
  shareResults: true,    // Habilita botón "Share"
  saveHistory: true,     // Guarda historial de cálculos (usuarios PRO)
},
```

### autoCalculate

- `true`: Calcula en tiempo real mientras el usuario escribe
- `false`: Requiere hacer clic en botón "Calculate"

---

## Related Calculators

```typescript
relatedCalculators: [
  "bmi-calculator",
  "body-fat-calculator",
  "ideal-weight-calculator",
],
```

Estos aparecen en el sidebar como "Related Calculators". Usa los slugs exactos.

---

## Sidebar Configuration

```typescript
sidebar: {
  showSearch: true,           // Muestra barra de búsqueda
  showRelatedCalculators: true,  // Muestra calculadoras relacionadas
  showCTA: false,             // Muestra call-to-action (PRO upgrade)
  category: "health",         // Categoría para filtrar related
},
```

---

## Estructura del page.tsx Explicada

```typescript
"use client";  // Requerido para componentes interactivos

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { 
  myCalculatorConfig,      // El objeto de configuración
  calculateMyCalculator    // La función de cálculo
} from "@/config/calculators/v3/my-calculator.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function MyCalculatorPage() {
  // Obtiene el locale actual (en, es, pt)
  const locale = useLocale();
  
  // Hook que carga las traducciones del JSON
  // Nota: pasa el slug completo "my-calculator", 
  // el hook quita "-calculator" automáticamente para buscar "my.json"
  const { t } = useCalcTranslations(locale, "my-calculator");
  
  return (
    <CalculatorEngineV3
      config={myCalculatorConfig}    // Configuración completa
      calculate={calculateMyCalculator}  // Función de cálculo
      t={t}                          // Función de traducción
    />
  );
}
```

---

## Debug y Troubleshooting

### Ver errores de validación

Los errores aparecen en la terminal donde corre `npm run dev`:

```
❌ Calculator my-calculator validation failed:
   - educationSections: minimum 2 prose sections required
   - faqs: minimum 6 FAQ items required
```

### Verificar que el archivo existe

```bash
# Config
ls -la src/config/calculators/v3/my-calculator.config.ts

# Traducción
ls -la src/messages/calculators/es/my.json

# Page
ls -la "src/app/[locale]/my-calculator/page.tsx"
```

### Verificar sintaxis del config

```bash
# Compilar para ver errores de TypeScript
npx tsc --noEmit src/config/calculators/v3/my-calculator.config.ts
```

### Verificar JSON de traducción válido

```bash
# Validar JSON
cat src/messages/calculators/es/my.json | python3 -m json.tool
```

### Limpiar caché de Next.js

```bash
rm -rf .next
npm run dev
```

### Ver logs del servidor

```bash
# En otra terminal, ver logs en tiempo real
tail -f .next/server/app-paths-manifest.json
```

---

## Checklist Final Antes de Deploy

- [ ] Config tiene 2+ prose sections
- [ ] Config tiene 6+ FAQs
- [ ] Config tiene 5+ list items en considerations
- [ ] Config tiene 1+ code-example
- [ ] Config tiene 2+ references
- [ ] Config tiene 2 infoCards (list + horizontal)
- [ ] Config tiene 1+ referenceData
- [ ] SEO description tiene 50+ caracteres
- [ ] SEO tiene 3+ keywords
- [ ] Archivo de traducción existe en `/es/`
- [ ] page.tsx existe y exporta correctamente
- [ ] `npm run dev` no muestra errores
- [ ] La calculadora funciona en `/es/` y `/en/`
- [ ] Los resultados se calculan correctamente
- [ ] Los anuncios aparecen (si están habilitados)

---

## Convenciones de Nombres

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Config file | `{slug}.config.ts` | `bmi-calculator.config.ts` |
| Config export | `{camelCase}Config` | `bmiCalculatorConfig` |
| Calculate function | `calculate{PascalCase}` | `calculateBmiCalculator` |
| JSON traducción | `{slug-sin-calculator}.json` | `bmi.json` |
| Page folder | `{slug}/` | `bmi-calculator/` |
| Page component | `{PascalCase}Page` | `BmiCalculatorPage` |

---

## Ejemplo Rápido: Calculadora Mínima Válida

```typescript
import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

export const simpleCalculatorConfig: CalculatorConfigV3 = {
  id: "simple-calculator",
  slug: "simple-calculator",
  name: "Simple Calculator",
  category: "math",
  icon: "🔢",

  seo: {
    title: "Simple Calculator - Free Online Tool for Quick Math",
    description: "A simple calculator for basic math operations. Add, subtract, multiply and divide numbers quickly and easily online.",
    shortDescription: "Quick and easy math calculations",
    keywords: ["simple calculator", "math calculator", "basic calculator"],
  },

  hero: { badge: "Math", rating: { average: 4.8, count: 1000 } },
  unitSystem: { enabled: false, default: "metric", options: [] },

  inputs: [
    { id: "numberA", type: "number", label: "Number A", required: true, defaultValue: 10, min: 0, max: 1000000 },
    { id: "numberB", type: "number", label: "Number B", required: true, defaultValue: 5, min: 0, max: 1000000 },
  ],

  inputGroups: [],

  results: [
    { id: "sum", type: "primary", label: "Sum", format: "number" },
    { id: "difference", type: "secondary", label: "Difference", format: "number" },
  ],

  infoCards: [
    {
      id: "results", title: "Results", type: "list", icon: "📊",
      items: [{ label: "Sum", valueKey: "sum" }, { label: "Difference", valueKey: "difference" }],
    },
    {
      id: "tips", title: "Tips", type: "horizontal", icon: "💡",
      items: [{ label: "Tip 1" }, { label: "Tip 2" }, { label: "Tip 3" }, { label: "Tip 4" }],
    },
  ],

  referenceData: [
    { id: "ref", title: "Reference", icon: "📋", columns: 2, items: [{ label: "A", value: "1" }, { label: "B", value: "2" }] },
  ],

  educationSections: [
    { id: "what", type: "prose", title: "What is This?", icon: "📖", content: "This is a simple calculator for basic math operations..." },
    { id: "how", type: "prose", title: "How to Use", icon: "⚙️", content: "Enter two numbers and see the results instantly..." },
    {
      id: "considerations", type: "list", title: "Considerations", icon: "⚠️",
      items: [
        { text: "Item 1", type: "info" }, { text: "Item 2", type: "info" }, { text: "Item 3", type: "info" },
        { text: "Item 4", type: "warning" }, { text: "Item 5", type: "warning" },
      ],
    },
    {
      id: "example", type: "code-example", title: "Example", icon: "🧮", description: "Example calculation", columns: 2,
      examples: [
        { title: "Ex 1", steps: ["Step 1", "Step 2"], result: "Result: 15" },
        { title: "Ex 2", steps: ["Step 1", "Step 2"], result: "Result: 5" },
      ],
    },
  ],

  faqs: [
    { question: "Q1?", answer: "A1" }, { question: "Q2?", answer: "A2" }, { question: "Q3?", answer: "A3" },
    { question: "Q4?", answer: "A4" }, { question: "Q5?", answer: "A5" }, { question: "Q6?", answer: "A6" },
  ],

  references: [
    { authors: "Author 1", year: "2024", title: "Title 1", source: "Source 1", url: "https://example.com" },
    { authors: "Author 2", year: "2024", title: "Title 2", source: "Source 2", url: "https://example.org" },
  ],

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "math" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: [],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

export function calculateSimple(data: { values: Record<string, unknown> }): CalculatorResults {
  const a = data.values.numberA as number;
  const b = data.values.numberB as number;
  return {
    values: { sum: a + b, difference: a - b },
    formatted: { sum: String(a + b), difference: String(a - b) },
    summary: `${a} + ${b} = ${a + b}`,
    isValid: true,
  };
}

export default simpleCalculatorConfig;
```
