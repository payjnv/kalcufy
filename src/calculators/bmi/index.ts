// KALCUFY V4 - BMI CALCULATOR EXAMPLE

import type { CalculatorConfigV4, CalculatorResults, CalculateInput, CalculatorModule } from "@/engine/v4";

export const config: CalculatorConfigV4 = {
  id: "bmi",
  slug: { en: "bmi-calculator", es: "calculadora-imc", pt: "calculadora-imc" },
  name: "BMI Calculator",
  category: "health",
  icon: "⚖️",
  isPro: false,

  seo: {
    title: "BMI Calculator - Calculate Your Body Mass Index",
    description: "Free BMI calculator to find your Body Mass Index. Get instant results with health recommendations.",
    shortDescription: "Calculate your Body Mass Index instantly",
    keywords: ["bmi calculator", "body mass index", "bmi chart", "healthy weight"],
  },

  hero: { badge: "Health", rating: { average: 4.9, count: 15420 } },

  unitSystem: {
    enabled: true,
    default: "imperial",
    options: [
      { value: "imperial", label: "Imperial (lb, ft/in)" },
      { value: "metric", label: "Metric (kg, cm)" },
    ],
  },

  inputs: [
    {
      id: "weight", type: "number", label: "Weight", required: true,
      defaultValue: 150, min: 50, max: 700, step: 1, suffix: "lb",
      helpText: "Enter your current weight",
      units: {
        imperial: { suffix: "lb", min: 50, max: 700, step: 1, default: 150 },
        metric: { suffix: "kg", min: 25, max: 320, step: 0.5, default: 70 },
      },
    },
    { id: "heightFeet", type: "number", label: "Height (feet)", required: true, defaultValue: 5, min: 3, max: 8, step: 1, suffix: "ft", showWhen: { field: "_unitSystem", value: "imperial" } },
    { id: "heightInches", type: "number", label: "Height (inches)", required: true, defaultValue: 10, min: 0, max: 11, step: 1, suffix: "in", showWhen: { field: "_unitSystem", value: "imperial" } },
    { id: "heightCm", type: "number", label: "Height", required: true, defaultValue: 175, min: 100, max: 250, step: 1, suffix: "cm", showWhen: { field: "_unitSystem", value: "metric" } },
  ],

  inputGroups: [],

  results: [
    { id: "bmi", type: "primary", label: "Your BMI", format: "number", decimals: 1 },
    { id: "category", type: "secondary", label: "Category", format: "text" },
    { id: "healthyWeightRange", type: "tertiary", label: "Healthy Weight Range", format: "text" },
  ],

  infoCards: [
    { id: "resultsCard", title: "Your Results", type: "list", icon: "📊", items: [{ label: "BMI", valueKey: "bmi" }, { label: "Category", valueKey: "category" }, { label: "Healthy Range", valueKey: "healthyWeightRange" }] },
    { id: "tipsCard", title: "Quick Tips", type: "horizontal", icon: "💡", items: [{ label: "BMI is just one health indicator" }, { label: "Muscle mass affects BMI accuracy" }, { label: "Consult a doctor for health advice" }, { label: "Regular exercise improves health" }] },
  ],

  referenceData: [
    { id: "bmiCategories", title: "BMI Categories", icon: "📋", columns: 2, items: [{ label: "Underweight", value: "< 18.5" }, { label: "Normal weight", value: "18.5 - 24.9" }, { label: "Overweight", value: "25 - 29.9" }, { label: "Obesity Class I", value: "30 - 34.9" }, { label: "Obesity Class II", value: "35 - 39.9" }, { label: "Obesity Class III", value: "≥ 40" }] },
  ],

  educationSections: [
    { id: "whatIsBmi", type: "prose", title: "What is BMI?", icon: "📖", content: "Body Mass Index (BMI) is a simple calculation using a person's height and weight. The formula is BMI = kg/m² where kg is a person's weight in kilograms and m² is their height in metres squared. A BMI of 25.0 or more is overweight, while the healthy range is 18.5 to 24.9." },
    { id: "howItWorks", type: "prose", title: "How BMI Calculation Works", icon: "⚙️", content: "BMI provides a reliable indicator of body fatness for most people and is used to screen for weight categories that may lead to health problems. While BMI does not measure body fat directly, research has shown that BMI correlates to direct measures of body fat." },
    { id: "considerations", type: "list", title: "Important Considerations", icon: "⚠️", items: [{ text: "BMI may overestimate body fat in athletes with high muscle mass", type: "warning" }, { text: "BMI may underestimate body fat in older persons", type: "warning" }, { text: "BMI is a screening tool, not a diagnostic tool", type: "info" }, { text: "Health professionals use BMI along with other indicators", type: "info" }, { text: "BMI categories are the same for men and women", type: "info" }] },
    { id: "exampleCalculation", type: "code-example", title: "Example Calculations", icon: "🧮", description: "Step-by-step BMI calculations", columns: 2, examples: [{ title: "Metric Example", steps: ["Weight: 70 kg", "Height: 1.75 m", "BMI = 70 ÷ (1.75)²", "BMI = 70 ÷ 3.0625"], result: "BMI = 22.9 (Normal weight)" }, { title: "Imperial Example", steps: ["Weight: 150 lb", "Height: 5'10\" (70 in)", "BMI = (150 ÷ 70²) × 703"], result: "BMI = 21.5 (Normal weight)" }] },
  ],

  faqs: [
    { question: "What is a healthy BMI range?", answer: "A healthy BMI is between 18.5 and 24.9. This range is associated with the lowest health risks for most adults." },
    { question: "Is BMI accurate for athletes?", answer: "BMI may not be accurate for athletes or people with high muscle mass, as muscle weighs more than fat." },
    { question: "Does age affect BMI calculations?", answer: "The BMI formula is the same for all adults, but interpretation may vary. Older adults may have more body fat at the same BMI." },
    { question: "How often should I check my BMI?", answer: "Checking your BMI once a month is sufficient. Focus on long-term trends rather than daily fluctuations." },
    { question: "Can BMI predict health problems?", answer: "BMI is a screening tool that can indicate potential health risks, but should be used with other health measures." },
    { question: "Is BMI different for men and women?", answer: "The BMI formula and categories are the same for both. However, women typically have more body fat than men at the same BMI." },
  ],

  references: [
    { authors: "World Health Organization", year: "2024", title: "Body mass index - BMI", source: "WHO Europe", url: "https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations" },
    { authors: "Centers for Disease Control and Prevention", year: "2024", title: "About Adult BMI", source: "CDC", url: "https://www.cdc.gov/healthyweight/assessing/bmi/adult_bmi/index.html" },
  ],

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "health" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["body-fat", "ideal-weight", "calorie", "tdee"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

export function calculate(data: CalculateInput): CalculatorResults {
  const { values, unitSystem } = data;
  let weightKg: number, heightM: number;

  if (unitSystem === "imperial") {
    weightKg = (values.weight as number) * 0.453592;
    const heightInches = (values.heightFeet as number) * 12 + (values.heightInches as number);
    heightM = heightInches * 0.0254;
  } else {
    weightKg = values.weight as number;
    heightM = (values.heightCm as number) / 100;
  }

  const bmi = weightKg / (heightM * heightM);

  let category: string, categoryKey: string;
  if (bmi < 18.5) { category = "Underweight"; categoryKey = "underweight"; }
  else if (bmi < 25) { category = "Normal weight"; categoryKey = "normal"; }
  else if (bmi < 30) { category = "Overweight"; categoryKey = "overweight"; }
  else if (bmi < 35) { category = "Obesity Class I"; categoryKey = "obesity1"; }
  else if (bmi < 40) { category = "Obesity Class II"; categoryKey = "obesity2"; }
  else { category = "Obesity Class III"; categoryKey = "obesity3"; }

  const minHealthyWeight = 18.5 * (heightM * heightM);
  const maxHealthyWeight = 24.9 * (heightM * heightM);

  let healthyWeightRange: string;
  if (unitSystem === "imperial") {
    healthyWeightRange = `${Math.round(minHealthyWeight / 0.453592)} - ${Math.round(maxHealthyWeight / 0.453592)} lb`;
  } else {
    healthyWeightRange = `${minHealthyWeight.toFixed(1)} - ${maxHealthyWeight.toFixed(1)} kg`;
  }

  return {
    values: { bmi, category: categoryKey, healthyWeightRange, minHealthyWeight, maxHealthyWeight },
    formatted: { bmi: bmi.toFixed(1), category, healthyWeightRange },
    summary: `Your BMI is ${bmi.toFixed(1)}, which is classified as ${category}.`,
    isValid: true,
    chartData: [{ label: "Your BMI", value: bmi, color: "#3B82F6" }, { label: "Healthy Min", value: 18.5, color: "#10B981" }, { label: "Healthy Max", value: 24.9, color: "#10B981" }],
  };
}

const bmiModule: CalculatorModule = { config, calculate };
export default bmiModule;
