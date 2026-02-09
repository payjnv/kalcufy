import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

export const debtToIncomeCalculatorConfig: CalculatorConfigV3 = {
  id: "debt-to-income-calculator",
  slug: "debt-to-income-calculator",
  name: "Debt To Income Calculator",
  category: "drafts",
  icon: "🔢",

  seo: {
    title: "Debt To Income Calculator - Free Online Tool",
    description: "Calculate your debt to income quickly and easily with our free online calculator. Get accurate results instantly.",
    shortDescription: "Calculate debt to income instantly",
    keywords: ["debt-to-income calculator", "debt to income", "free calculator"],
  },

  hero: { badge: "Drafts", rating: { average: 4.8, count: 1000 } },
  unitSystem: { enabled: false, default: "metric", options: [] },

  inputs: [
    { id: "value1", type: "number", label: "Value 1", required: true, defaultValue: 100, min: 0, max: 10000 },
    { id: "value2", type: "number", label: "Value 2", required: true, defaultValue: 50, min: 0, max: 10000 },
  ],

  inputGroups: [],

  results: [
    { id: "result", type: "primary", label: "Result", format: "number" },
    { id: "summary", type: "secondary", label: "Summary", format: "text" },
  ],

  infoCards: [
    {
      id: "resultsCard", title: "Your Results", type: "list", icon: "📊",
      items: [{ label: "Result", valueKey: "result" }],
    },
    {
      id: "tipsCard", title: "Tips", type: "horizontal", icon: "💡",
      items: [{ label: "Tip 1" }, { label: "Tip 2" }, { label: "Tip 3" }, { label: "Tip 4" }],
    },
  ],

  referenceData: [
    { id: "reference", title: "Reference", icon: "📋", columns: 2, items: [
      { label: "Low", value: "0-50" }, { label: "Medium", value: "50-100" },
      { label: "High", value: "100-150" }, { label: "Very High", value: "150+" },
    ]},
  ],

  educationSections: [
    { id: "whatIs", type: "prose", title: "What is Debt To Income?", icon: "📖", content: "Explanation of what debt to income is and why it matters..." },
    { id: "howTo", type: "prose", title: "How to Calculate", icon: "⚙️", content: "Step by step guide on how to calculate debt to income..." },
    { id: "considerations", type: "list", title: "Important Considerations", icon: "⚠️", items: [
      { text: "Consider factor 1", type: "info" }, { text: "Consider factor 2", type: "info" },
      { text: "Consider factor 3", type: "info" }, { text: "Consider factor 4", type: "warning" },
      { text: "Consider factor 5", type: "warning" },
    ]},
    { id: "example", type: "code-example", title: "Example Calculation", icon: "🧮", description: "Examples", columns: 2, examples: [
      { title: "Example 1", steps: ["Step 1: Enter value", "Step 2: Calculate"], result: "Result: 150" },
      { title: "Example 2", steps: ["Step 1: Enter value", "Step 2: Calculate"], result: "Result: 200" },
    ]},
  ],

  faqs: [
    { question: "What is a debt to income?", answer: "A debt to income is..." },
    { question: "How accurate is this calculator?", answer: "This calculator provides estimates based on..." },
    { question: "When should I use this?", answer: "Use this calculator when you need to..." },
    { question: "What factors affect the result?", answer: "Several factors can affect..." },
    { question: "Can I use this for professional purposes?", answer: "This calculator is for informational purposes..." },
    { question: "How often should I recalculate?", answer: "It depends on your specific situation..." },
  ],

  references: [
    { authors: "Reference Source", year: "2024", title: "Official Guidelines", source: "Official Organization", url: "https://example.com" },
    { authors: "Research Team", year: "2024", title: "Research Study", source: "Academic Journal", url: "https://example.org" },
  ],

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "drafts" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: [],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

export function calculateDebtToIncome(data: { values: Record<string, unknown> }): CalculatorResults {
  const v1 = data.values.value1 as number;
  const v2 = data.values.value2 as number;
  const result = v1 + v2;
  
  return {
    values: { result, summary: "Calculation complete" },
    formatted: { result: result.toFixed(2), summary: "Calculation complete" },
    summary: `Result: ${result}`,
    isValid: true,
  };
}

export default debtToIncomeCalculatorConfig;
