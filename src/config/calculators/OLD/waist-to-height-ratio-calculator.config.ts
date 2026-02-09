import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

export const waistToHeightRatioCalculatorConfig: CalculatorConfigV3 = {
  id: "waist-to-height-ratio-calculator",
  slug: "waist-to-height-ratio-calculator",
  name: "Waist-to-Height Ratio Calculator",
  category: "health",
  icon: "📏",

  seo: {
    title: "Waist-to-Height Ratio Calculator - Free WHtR Health Assessment",
    description: "Calculate your waist-to-height ratio (WHtR) to assess health risks. Better than BMI for predicting cardiovascular disease, diabetes, and stroke risk.",
    shortDescription: "Assess your health risk with WHtR - a better indicator than BMI",
    keywords: ["waist to height ratio calculator", "WHtR calculator", "health risk calculator", "better than BMI"],
  },

  hero: { badge: "Health", rating: { average: 4.9, count: 2850 } },

  unitSystem: {
    enabled: true,
    default: "imperial",
    options: [
      { value: "imperial", label: "Imperial (in)" },
      { value: "metric", label: "Metric (cm)" },
    ],
  },

  inputs: [
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
    },
    {
      id: "waistCircumference",
      type: "number",
      label: "Waist Circumference",
      required: true,
      defaultValue: 32,
      min: 15,
      max: 80,
      step: 0.5,
      suffix: "in",
      helpText: "Measure at the midpoint between lower rib and hip bone",
      units: {
        imperial: { suffix: "in", min: 15, max: 80, step: 0.5, default: 32 },
        metric: { suffix: "cm", min: 40, max: 200, step: 1, default: 81 },
      },
    },
    {
      id: "height",
      type: "number",
      label: "Height",
      required: true,
      defaultValue: 66,
      min: 36,
      max: 96,
      step: 0.5,
      suffix: "in",
      units: {
        imperial: { suffix: "in", min: 36, max: 96, step: 0.5, default: 66 },
        metric: { suffix: "cm", min: 90, max: 250, step: 1, default: 168 },
      },
    },
  ],

  inputGroups: [],

  results: [
    { id: "whtr", type: "primary", label: "Waist-to-Height Ratio", format: "number" },
    { id: "category", type: "secondary", label: "Health Category", format: "text" },
    { id: "riskLevel", type: "secondary", label: "Risk Level", format: "text" },
    { id: "idealWaist", type: "secondary", label: "Ideal Waist (Max)", format: "text" },
    { id: "waistToLose", type: "secondary", label: "Waist to Lose", format: "text" },
  ],

  infoCards: [
    {
      id: "whtrResults",
      title: "Your WHtR Results",
      type: "list",
      icon: "📊",
      items: [
        { label: "WHtR Ratio", valueKey: "whtr" },
        { label: "Category", valueKey: "category" },
        { label: "Risk Level", valueKey: "riskLevel" },
        { label: "Ideal Max Waist", valueKey: "idealWaist" },
      ],
    },
    {
      id: "quickTips",
      title: "Quick Health Tips",
      type: "horizontal",
      icon: "💡",
      items: [
        { label: "Keep waist less than half your height (WHtR < 0.5)" },
        { label: "WHtR is better than BMI for predicting health risks" },
        { label: "Measure waist at belly button level, relaxed" },
        { label: "Check quarterly to track progress" },
      ],
    },
  ],

  referenceData: [
    {
      id: "whtrCategories",
      title: "WHtR Health Categories",
      icon: "📋",
      columns: 3,
      items: [
        { label: "< 0.4", value: "Underweight" },
        { label: "0.4 - 0.5", value: "Healthy" },
        { label: "0.5 - 0.6", value: "Overweight" },
        { label: "> 0.6", value: "Obese" },
        { label: "< 0.5", value: "✅ Low Risk" },
        { label: "≥ 0.5", value: "⚠️ Higher Risk" },
      ],
    },
  ],

  educationSections: [
    {
      id: "whatIsWhtr",
      type: "prose",
      title: "What is Waist-to-Height Ratio?",
      icon: "📏",
      content: "Waist-to-Height Ratio (WHtR) is a simple measurement that compares your waist circumference to your height. Research shows it's a better predictor of health risks than BMI because it specifically measures central obesity - the dangerous fat around your organs. The UK's NHS and NICE guidelines recommend keeping your waist less than half your height. A WHtR below 0.5 indicates lower risk of heart disease, stroke, and diabetes, regardless of your BMI classification.",
    },
    {
      id: "whyBetterThanBmi",
      type: "prose",
      title: "Why WHtR is Better Than BMI",
      icon: "⚖️",
      content: "BMI (Body Mass Index) has been the standard measure for decades, but it has significant limitations. BMI doesn't distinguish between muscle and fat, and it doesn't account for where fat is stored. A muscular athlete might have an 'overweight' BMI despite being very healthy, while a 'normal' BMI person with belly fat could have hidden health risks. WHtR specifically targets abdominal fat, which is the most dangerous type because it surrounds vital organs and is strongly linked to metabolic syndrome, type 2 diabetes, and cardiovascular disease.",
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "WHtR is a screening tool, not a diagnosis - consult healthcare professionals for medical advice", type: "warning" },
        { text: "Pregnant women should not use WHtR as a health indicator", type: "warning" },
        { text: "Valid for adults and children over 5 years old", type: "info" },
        { text: "Gender-specific thresholds provide more accurate risk assessment", type: "info" },
        { text: "Lancet Commission (2024) recommends WHtR over BMI alone for obesity diagnosis", type: "info" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "🧮",
      description: "See how WHtR is calculated and interpreted for different scenarios",
      columns: 2,
      examples: [
        {
          title: "Healthy WHtR Example",
          steps: ["Waist: 30 inches (76 cm)", "Height: 66 inches (168 cm)", "WHtR = 30 ÷ 66 = 0.45", "Category: Healthy", "✅ Below 0.5 threshold"],
          result: "WHtR = 0.45 - Low health risk",
        },
        {
          title: "At-Risk WHtR Example",
          steps: ["Waist: 38 inches (97 cm)", "Height: 70 inches (178 cm)", "WHtR = 38 ÷ 70 = 0.54", "Category: Overweight", "⚠️ Above 0.5 threshold"],
          result: "WHtR = 0.54 - Consider action",
        },
      ],
    },
  ],

  faqs: [
    { question: "Is WHtR better than BMI?", answer: "Yes, research shows WHtR is a better predictor of cardiovascular disease, diabetes, and stroke risk than BMI because it measures central obesity specifically." },
    { question: "What is a healthy waist-to-height ratio?", answer: "A WHtR below 0.5 is considered healthy for both men and women. Your waist should be less than half your height." },
    { question: "How often should I check my WHtR?", answer: "Checking your WHtR every 3 months is recommended for tracking progress with diet and exercise changes." },
    { question: "Can children use this calculator?", answer: "Yes, WHtR is valid for children aged 5 and older. The same 0.5 threshold applies, making it simpler than BMI percentiles." },
    { question: "How do I measure my waist correctly?", answer: "Stand relaxed, measure at the midpoint between your lowest rib and hip bone (usually at belly button level). Keep the tape horizontal and snug but not tight." },
    { question: "What can I do to improve my WHtR?", answer: "Focus on reducing abdominal fat through aerobic exercise, resistance training, reducing refined carbs and sugar, managing stress, and getting adequate sleep." },
  ],

  references: [
    { authors: "Ashwell M, Gunn P, Gibson S", year: "2012", title: "Waist-to-height ratio is a better screening tool than waist circumference and BMI", source: "Obesity Reviews", url: "https://pubmed.ncbi.nlm.nih.gov/22106927/" },
    { authors: "NICE", year: "2025", title: "Waist-to-height ratio boundary values for central adiposity assessment", source: "NICE Guidelines", url: "https://www.nice.org.uk/guidance/cg189" },
  ],

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "health" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["bmi-calculator", "body-fat-calculator", "lean-body-mass-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

function getWhtrCategory(whtr: number, gender: string) {
  if (gender === "male") {
    if (whtr < 0.35) return { category: "Abnormally Slim", riskLevel: "Underweight Risk" };
    if (whtr < 0.43) return { category: "Extremely Slim", riskLevel: "Low Risk" };
    if (whtr < 0.46) return { category: "Slender & Healthy", riskLevel: "Low Risk" };
    if (whtr < 0.53) return { category: "Healthy", riskLevel: "Low Risk" };
    if (whtr < 0.58) return { category: "Overweight", riskLevel: "Increased Risk" };
    if (whtr < 0.63) return { category: "Very Overweight", riskLevel: "High Risk" };
    return { category: "Highly Obese", riskLevel: "Very High Risk" };
  } else {
    if (whtr < 0.35) return { category: "Abnormally Slim", riskLevel: "Underweight Risk" };
    if (whtr < 0.42) return { category: "Extremely Slim", riskLevel: "Low Risk" };
    if (whtr < 0.46) return { category: "Slender & Healthy", riskLevel: "Low Risk" };
    if (whtr < 0.49) return { category: "Healthy", riskLevel: "Low Risk" };
    if (whtr < 0.54) return { category: "Overweight", riskLevel: "Increased Risk" };
    if (whtr < 0.58) return { category: "Very Overweight", riskLevel: "High Risk" };
    return { category: "Highly Obese", riskLevel: "Very High Risk" };
  }
}

export function calculateWaistToHeightRatio(data: { values: Record<string, unknown>; units: Record<string, string>; unitSystem: "metric" | "imperial" }): CalculatorResults {
  const { values, unitSystem } = data;
  const gender = values.gender as string;
  let waist = values.waistCircumference as number;
  let height = values.height as number;

  if (unitSystem === "imperial") {
    waist = waist * 2.54;
    height = height * 2.54;
  }

  const whtr = waist / height;
  const { category, riskLevel } = getWhtrCategory(whtr, gender);
  const idealWaistCm = height * 0.5;
  const waistToLoseCm = Math.max(0, waist - idealWaistCm);

  const idealWaistFormatted = unitSystem === "imperial" ? `${(idealWaistCm / 2.54).toFixed(1)} in` : `${idealWaistCm.toFixed(1)} cm`;
  const waistToLoseFormatted = waistToLoseCm > 0 ? (unitSystem === "imperial" ? `${(waistToLoseCm / 2.54).toFixed(1)} in` : `${waistToLoseCm.toFixed(1)} cm`) : "0 - You're at goal!";

  const summary = whtr < 0.5 ? `Great! Your WHtR of ${whtr.toFixed(2)} is below 0.5, indicating lower health risk.` : `Your WHtR of ${whtr.toFixed(2)} is above 0.5. Consider reducing waist circumference by ${waistToLoseFormatted}.`;

  return {
    values: { whtr, category, riskLevel, idealWaist: idealWaistCm, waistToLose: waistToLoseCm },
    formatted: { whtr: whtr.toFixed(3), category, riskLevel, idealWaist: idealWaistFormatted, waistToLose: waistToLoseFormatted },
    summary,
    isValid: true,
  };
}

export default waistToHeightRatioCalculatorConfig;
