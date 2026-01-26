# Kalcufy Calculator Engine V3

## Overview
Engine V3 is the standard template for creating calculators in Kalcufy. It provides a consistent UI, automatic validation, SEO optimization, and educational content sections.

## Required Sections (Validation Enforced)
Every calculator MUST include these sections or it will throw an error:

1. **references** - Sources & References (top-level property)
2. **educationSections with type: "code-example"** - Example Calculation
3. **educationSections with type: "list"** - Important Considerations

## File Structure
```
src/
├── engine/v3/
│   ├── CalculatorEngineV3.tsx    # Main engine component
│   ├── types/engine.types.ts      # TypeScript types
│   └── components/
│       ├── index.ts               # Component exports
│       ├── InputCard.tsx          # Input form with all input types
│       ├── ResultsCard.tsx        # Results display
│       ├── ExampleSection.tsx     # Code examples
│       ├── SourcesSection.tsx     # References
│       ├── ProseSection.tsx       # Text content
│       ├── FAQAccordion.tsx       # FAQ section
│       ├── ConsiderationsList.tsx # Warnings/info list
│       ├── MobileResultsBar.tsx   # Mobile sticky bar
│       └── DetailedTableModal.tsx # Week-by-week, Year-by-year tables
├── config/calculators/v3/
│   ├── pregnancy.config.ts        # Example: Pregnancy calculator
│   └── ideal-weight.config.ts     # Example: Ideal weight calculator
└── app/[locale]/v3/
    └── [calculator-slug]/
        └── page.tsx               # Page component
```

## Creating a New Calculator

### Step 1: Create Config File
Create `src/config/calculators/v3/[name].config.ts`:

```typescript
import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

export const myCalculatorConfig: CalculatorConfigV3 = {
  // Basic Info
  id: "my-calculator",
  slug: "my-calculator",
  name: "My Calculator",
  category: "finance", // or "health", "pregnancy", "everyday"
  icon: "📊",

  // SEO
  seo: {
    title: "My Calculator - Free Online Tool",
    description: "Calculate X with our free online calculator.",
    shortDescription: "Calculate X easily",
    keywords: ["calculator", "my calculator"],
  },

  // Hero Section
  hero: {
    badge: "Finance",
    rating: { average: 4.9, count: 1000 },
  },

  // Unit System (optional)
  unitSystem: {
    enabled: false,
    default: "imperial",
    options: [],
  },

  // INPUTS - See Input Types section below
  inputs: [...],

  // Input Groups (collapsible sections)
  inputGroups: [],

  // RESULTS
  results: [
    { id: "mainResult", type: "primary", label: "Result", format: "number", suffix: "$" },
    { id: "secondary1", type: "secondary", label: "Detail", format: "text" },
  ],

  // EDUCATION SECTIONS (REQUIRED: must include "code-example" and "list" types)
  educationSections: [
    // Cards grid
    {
      id: "aboutMethods",
      type: "cards",
      title: "About Methods",
      icon: "📊",
      columns: 2,
      cards: [
        { title: "Method 1", description: "Description...", icon: "📈" },
      ],
    },
    // REQUIRED: Important Considerations (type: "list")
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "Warning message", type: "warning" },
        { text: "Info message", type: "info" },
      ],
    },
    // REQUIRED: Example Calculation (type: "code-example")
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "📊",
      description: "Example scenario description",
      columns: 2,
      examples: [
        {
          title: "Method Name",
          code: "Step 1: ...\nStep 2: ...\nResult: X",
          // OR use steps array:
          // steps: ["Step 1", "Step 2", "Step 3"],
          // result: "Final Result: X",
        },
      ],
    },
    // Prose (text content)
    {
      id: "explanation",
      type: "prose",
      title: "What is X?",
      content: "Explanation paragraph...",
    },
  ],

  // FAQs
  faqs: [
    { question: "Question 1?", answer: "Answer 1" },
  ],

  // REQUIRED: References
  references: [
    {
      authors: "Author Name",
      year: "2024",
      title: "Article Title",
      source: "Journal Name",
      url: "https://..." // optional
    },
  ],

  // Detailed Table (optional - for week-by-week, year-by-year data)
  detailedTable: {
    id: "weekByWeek",
    buttonLabel: "View Week-by-Week",
    buttonIcon: "📅",
    modalTitle: "Week-by-Week Data",
    columns: [
      { id: "week", label: "Week", align: "left" },
      { id: "value", label: "Value", align: "right", highlight: true },
    ],
  },

  // Sidebar
  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "finance" },

  // Features
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },

  // Related Calculators
  relatedCalculators: ["other-calculator-slug"],

  // Ads
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// CALCULATE FUNCTION
export function calculateMyCalculator(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;
  
  // Your calculation logic here
  const result = (values.input1 as number) * 2;
  
  return {
    values: { mainResult: result },
    formatted: {
      mainResult: result.toFixed(2),
      secondary1: "Some text",
    },
    summary: "Your result is X",
    isValid: true,
    // Optional: for DetailedTableModal
    metadata: {
      tableData: [
        { week: "Week 1", value: 100 },
        { week: "Week 2", value: 200 },
      ],
    },
  };
}

export default myCalculatorConfig;
```

### Step 2: Create Page Component
Create `src/app/[locale]/v3/my-calculator/page.tsx`:

```typescript
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
```

## Input Types

### select
```typescript
{
  id: "method",
  type: "select",
  label: "Select Method",
  required: true,
  defaultValue: "option1",
  options: [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ],
}
```

### number
```typescript
{
  id: "amount",
  type: "number",
  label: "Amount",
  required: true,
  defaultValue: 1000,
  min: 0,
  max: 1000000,
  step: 100,
  suffix: "$",
}
```

### slider
```typescript
{
  id: "percentage",
  type: "slider",
  label: "Percentage",
  required: true,
  defaultValue: 50,
  min: 0,
  max: 100,
  step: 1,
  suffix: "%",
  helpText: "Adjust the value",
}
```

### radio
```typescript
{
  id: "gender",
  type: "radio",
  label: "Gender",
  required: true,
  defaultValue: "female",
  options: [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
  ],
}
```

### date
```typescript
{
  id: "birthDate",
  type: "date",
  label: "Birth Date",
  required: true,
}
```

### text
```typescript
{
  id: "name",
  type: "text",
  label: "Your Name",
  required: false,
  placeholder: "Enter name",
}
```

### Conditional Inputs (showWhen)
Show/hide inputs based on another input's value:

```typescript
{
  id: "lmpDate",
  type: "date",
  label: "Last Period Date",
  required: false,
  showWhen: { field: "calculationMethod", value: "lmp" },
}
// Or multiple values:
{
  id: "field",
  type: "number",
  label: "Field",
  showWhen: { field: "method", value: ["option1", "option2"] },
}
```

### Half-width Inputs
```typescript
{
  id: "weeks",
  type: "number",
  label: "Weeks",
  width: "half", // Will display side-by-side with next half-width input
},
{
  id: "days",
  type: "number",
  label: "Days",
  width: "half",
}
```

## Education Section Types

### cards
Grid of info cards
```typescript
{ type: "cards", columns: 2, cards: [...] }
```

### list (REQUIRED)
Warning/info list
```typescript
{ type: "list", items: [{ text: "...", type: "warning" | "info" }] }
```

### code-example (REQUIRED)
Calculation examples
```typescript
{
  type: "code-example",
  examples: [
    { title: "...", code: "..." }
    // OR
    { title: "...", steps: ["..."], result: "..." }
  ]
}
```

### prose
Text paragraphs
```typescript
{ type: "prose", title: "...", content: "..." }
```

## Result Formats

- `number` - Numeric with optional suffix
- `text` - Plain text
- `date` - Formatted date string

## DetailedTableModal

For showing detailed data (week-by-week, year-by-year):

1. Add `detailedTable` config to your calculator
2. Return `metadata.tableData` array from calculate function
3. The button appears automatically in ResultsCard

## Validation

The engine validates that every calculator has:
- `references` array (not empty)
- At least one `educationSection` with `type: "code-example"`
- At least one `educationSection` with `type: "list"`

Missing any of these will throw an error at runtime.

## Examples

See these files for complete examples:
- `src/config/calculators/v3/pregnancy.config.ts` - Health calculator with date inputs, conditional fields, week-by-week table
- `src/config/calculators/v3/ideal-weight.config.ts` - Health calculator with unit system, formula comparisons

## Component Props

### CalculatorEngineV3
```typescript
interface Props {
  config: CalculatorConfigV3;
  calculate: (data: CalculateInput) => CalculatorResults;
  t: TranslationFn;
  getFormulaResults?: (results) => FormulaResult[];
  getRangeVisualization?: (results, state) => RangeVisualization | null;
  getFrameSizeData?: (results) => FrameSizeData | undefined;
}
```

## Prompt for New Chats

Use this prompt when starting a new chat to create a calculator:

```
Proyecto: Kalcufy (Next.js calculator platform)
Ubicación: ~/Desktop/kalcufy

Lee el archivo src/engine/v3/README.md para entender el Engine V3.

Crea una calculadora de [NOMBRE] siguiendo el template V3:
1. Config en src/config/calculators/v3/[slug].config.ts
2. Page en src/app/[locale]/v3/[slug]/page.tsx

Requisitos obligatorios:
- references (Sources & References)
- educationSections con type: "code-example" (Example Calculation)
- educationSections con type: "list" (Important Considerations)

Usa como referencia: src/config/calculators/v3/pregnancy.config.ts
```

### Example Prompt

```
Proyecto: Kalcufy (Next.js calculator platform)
Ubicación: ~/Desktop/kalcufy

Lee el archivo src/engine/v3/README.md para entender el Engine V3.

Crea una calculadora de "Body Fat Percentage" siguiendo el template V3:
1. Config en src/config/calculators/v3/body-fat.config.ts
2. Page en src/app/[locale]/v3/body-fat-calculator/page.tsx

Inputs: gender (radio), age (number), weight (number), height (number), neck (number), waist (number), hip (number - solo mujeres)
Métodos: US Navy, BMI-based

Usa como referencia: src/config/calculators/v3/pregnancy.config.ts
```

## Styling

The engine uses Tailwind CSS with Kalcufy's design system:
- Primary: Blue gradient (`from-blue-600 to-cyan-500`)
- Cards: White with `border-slate-200`
- Backgrounds: `bg-slate-50` for sections
- Text: `text-slate-900` for headings, `text-slate-600` for body
