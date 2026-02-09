import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

export const percentageCalculatorConfig: CalculatorConfigV3 = {
  // Basic Info
  id: "percentage-calculator",
  slug: "percentage-calculator",
  name: "Percentage Calculator",
  category: "math",
  icon: "📊",

  // SEO
  seo: {
    title: "Percentage Calculator - Free Online Percentage Tool",
    description: "Calculate percentages easily: find X% of a number, percentage increase/decrease, what percent X is of Y, and more. Free online calculator with step-by-step solutions.",
    shortDescription: "Calculate percentages, increases, decreases and more",
    keywords: ["percentage calculator", "percent calculator", "percentage increase", "percentage decrease", "what percent", "calculate percentage", "discount calculator", "tip calculator"],
  },

  // Hero Section
  hero: {
    badge: "Math",
    rating: { average: 4.9, count: 15420 },
  },

  // Unit System
  unitSystem: {
    enabled: false,
    default: "metric",
    options: [],
  },

  // INPUTS
  inputs: [
    {
      id: "calculationType",
      type: "select",
      label: "Calculation Type",
      required: true,
      defaultValue: "percentOf",
      options: [
        { value: "percentOf", label: "What is X% of Y?" },
        { value: "isWhatPercent", label: "X is what % of Y?" },
        { value: "percentChange", label: "Percentage Change" },
        { value: "percentIncrease", label: "Increase by %" },
        { value: "percentDecrease", label: "Decrease by %" },
        { value: "findOriginal", label: "Find Original Value" },
      ],
    },
    // What is X% of Y?
    {
      id: "percentage",
      type: "number",
      label: "Percentage",
      required: true,
      defaultValue: 25,
      min: 0,
      max: 100000,
      step: 0.01,
      suffix: "%",
      showWhen: { field: "calculationType", value: ["percentOf", "percentIncrease", "percentDecrease"] },
    },
    {
      id: "baseValue",
      type: "number",
      label: "Base Value",
      required: true,
      defaultValue: 200,
      min: 0,
      max: 999999999999,
      step: 0.01,
      showWhen: { field: "calculationType", value: ["percentOf", "percentIncrease", "percentDecrease"] },
    },
    // X is what % of Y?
    {
      id: "partValue",
      type: "number",
      label: "Part Value (X)",
      required: true,
      defaultValue: 50,
      min: 0,
      max: 999999999999,
      step: 0.01,
      showWhen: { field: "calculationType", value: "isWhatPercent" },
    },
    {
      id: "wholeValue",
      type: "number",
      label: "Whole Value (Y)",
      required: true,
      defaultValue: 200,
      min: 0.01,
      max: 999999999999,
      step: 0.01,
      showWhen: { field: "calculationType", value: "isWhatPercent" },
    },
    // Percentage Change
    {
      id: "oldValue",
      type: "number",
      label: "Original Value",
      required: true,
      defaultValue: 100,
      min: 0.01,
      max: 999999999999,
      step: 0.01,
      showWhen: { field: "calculationType", value: "percentChange" },
    },
    {
      id: "newValue",
      type: "number",
      label: "New Value",
      required: true,
      defaultValue: 125,
      min: 0,
      max: 999999999999,
      step: 0.01,
      showWhen: { field: "calculationType", value: "percentChange" },
    },
    // Find Original (after % was applied)
    {
      id: "finalValue",
      type: "number",
      label: "Final Value",
      required: true,
      defaultValue: 120,
      min: 0,
      max: 999999999999,
      step: 0.01,
      showWhen: { field: "calculationType", value: "findOriginal" },
    },
    {
      id: "appliedPercent",
      type: "number",
      label: "Applied Percentage",
      required: true,
      defaultValue: 20,
      min: -100,
      max: 100000,
      step: 0.01,
      suffix: "%",
      helpText: "Use positive for increase, negative for decrease",
      showWhen: { field: "calculationType", value: "findOriginal" },
    },
  ],

  // Input Groups
  inputGroups: [],

  // RESULTS
  results: [
    { id: "mainResult", type: "primary", label: "Result", format: "number", suffix: "" },
    { id: "formula", type: "secondary", label: "Formula Used", format: "text" },
    { id: "stepByStep", type: "secondary", label: "Calculation", format: "text" },
    { id: "percentSymbol", type: "secondary", label: "As Decimal", format: "number" },
  ],

  // Info Cards
  infoCards: [
    {
      id: "quickResults",
      title: "Quick Conversions",
      type: "list",
      items: [
        { label: "As Fraction", valueKey: "asFraction", suffix: "" },
        { label: "As Decimal", valueKey: "asDecimal", suffix: "" },
        { label: "Multiplier", valueKey: "multiplier", suffix: "" },
      ],
    },
    {
      id: "relatedPercents",
      title: "Related Percentages",
      type: "horizontal",
      items: [
        { label: "Half (50%)", valueKey: "halfPercent", suffix: "" },
        { label: "Double (200%)", valueKey: "doublePercent", suffix: "" },
        { label: "10%", valueKey: "tenPercent", suffix: "" },
      ],
    },
  ],

  // Reference Data
  referenceData: [
    {
      id: "commonPercents",
      title: "Common Percentage Reference",
      columns: [
        { key: "percent", label: "Percentage" },
        { key: "decimal", label: "Decimal" },
        { key: "fraction", label: "Fraction" },
        { key: "example", label: "Example (of 100)" },
      ],
      data: [
        { percent: "10%", decimal: "0.10", fraction: "1/10", example: "10" },
        { percent: "20%", decimal: "0.20", fraction: "1/5", example: "20" },
        { percent: "25%", decimal: "0.25", fraction: "1/4", example: "25" },
        { percent: "33.33%", decimal: "0.333", fraction: "1/3", example: "33.33" },
        { percent: "50%", decimal: "0.50", fraction: "1/2", example: "50" },
        { percent: "66.67%", decimal: "0.667", fraction: "2/3", example: "66.67" },
        { percent: "75%", decimal: "0.75", fraction: "3/4", example: "75" },
        { percent: "100%", decimal: "1.00", fraction: "1/1", example: "100" },
      ],
    },
  ],

  // EDUCATION SECTIONS
  educationSections: [
    // Cards - Different calculation types
    {
      id: "calculationTypes",
      type: "cards",
      title: "Types of Percentage Calculations",
      icon: "📈",
      columns: 2,
      cards: [
        {
          title: "Find X% of Y",
          description: "The most common calculation. Multiply the number by the percentage divided by 100. Example: 25% of 200 = 200 × 0.25 = 50",
          icon: "🔢",
        },
        {
          title: "X is what % of Y?",
          description: "Divide the part by the whole and multiply by 100. Example: 50 is what % of 200? = (50 ÷ 200) × 100 = 25%",
          icon: "❓",
        },
        {
          title: "Percentage Increase",
          description: "Add the percentage to the original value. Formula: Original × (1 + %/100). Example: 200 increased by 25% = 200 × 1.25 = 250",
          icon: "📈",
        },
        {
          title: "Percentage Decrease",
          description: "Subtract the percentage from the original value. Formula: Original × (1 - %/100). Example: 200 decreased by 25% = 200 × 0.75 = 150",
          icon: "📉",
        },
      ],
    },
    // REQUIRED: Important Considerations (type: "list")
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "Percentage change is always calculated relative to the original value, not the new value", type: "warning" },
        { text: "A 50% increase followed by a 50% decrease does NOT return to the original value", type: "warning" },
        { text: "To convert a percentage to decimal, divide by 100 (25% = 0.25)", type: "info" },
        { text: "To convert a decimal to percentage, multiply by 100 (0.25 = 25%)", type: "info" },
        { text: "Percentages greater than 100% are possible and represent values greater than the whole", type: "info" },
      ],
    },
    // REQUIRED: Example Calculation (type: "code-example")
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculations",
      icon: "📊",
      description: "Step-by-step examples of common percentage calculations",
      columns: 2,
      examples: [
        {
          title: "What is 15% of $80?",
          steps: [
            "Convert percentage to decimal: 15% = 15 ÷ 100 = 0.15",
            "Multiply by the base value: $80 × 0.15",
            "Calculate: $80 × 0.15 = $12",
          ],
          result: "15% of $80 = $12",
        },
        {
          title: "Percentage Change: $50 to $65",
          steps: [
            "Find the difference: $65 - $50 = $15",
            "Divide by original: $15 ÷ $50 = 0.30",
            "Convert to percentage: 0.30 × 100 = 30%",
          ],
          result: "Increase of 30%",
        },
        {
          title: "25 is what % of 200?",
          steps: [
            "Divide part by whole: 25 ÷ 200 = 0.125",
            "Multiply by 100: 0.125 × 100 = 12.5%",
          ],
          result: "25 is 12.5% of 200",
        },
        {
          title: "Find original if 120 is 20% more",
          steps: [
            "120 = Original × (1 + 0.20)",
            "120 = Original × 1.20",
            "Original = 120 ÷ 1.20 = 100",
          ],
          result: "Original value was 100",
        },
      ],
    },
    // Prose - What is percentage
    {
      id: "whatIsPercentage",
      type: "prose",
      title: "What is a Percentage?",
      content: "A percentage is a way to express a number as a fraction of 100. The word comes from the Latin 'per centum', meaning 'by the hundred'. When you see 25%, it means 25 out of every 100, or simply 25/100 = 0.25. Percentages are incredibly useful because they allow us to compare different quantities on a common scale, regardless of their absolute values. For example, saying 'sales increased by 15%' is more meaningful than saying 'sales increased by $150' because it gives context relative to the original amount.",
    },
    // Prose - Real life applications
    {
      id: "realLifeApps",
      type: "prose",
      title: "Real-Life Applications",
      content: "Percentages are everywhere in daily life: shopping discounts (30% off), restaurant tips (15-20%), sales tax (varies by location), interest rates on loans and savings (APR, APY), grade scores in school (85% = B), battery levels on devices (75% charged), nutrition labels (daily value percentages), and statistics in sports and business. Understanding percentages helps you make informed financial decisions, understand data and statistics, and solve everyday problems efficiently.",
    },
    // Prose - Tips and tricks
    {
      id: "tipsAndTricks",
      type: "prose",
      title: "Mental Math Tips",
      content: "Here are quick mental math tricks for percentages: 10% = move decimal one place left (10% of 80 = 8). 5% = half of 10% (5% of 80 = 4). 1% = move decimal two places left (1% of 80 = 0.80). For 15%, calculate 10% + 5%. For 25%, divide by 4. For 50%, divide by 2. For 75%, calculate 50% + 25%. A useful trick: X% of Y = Y% of X (so 8% of 50 = 50% of 8 = 4).",
    },
  ],

  // FAQs
  faqs: [
    {
      question: "How do I calculate a percentage of a number?",
      answer: "To find X% of Y, convert the percentage to a decimal by dividing by 100, then multiply by the number. For example, 25% of 200 = (25/100) × 200 = 0.25 × 200 = 50.",
    },
    {
      question: "How do I calculate percentage increase or decrease?",
      answer: "Percentage change = ((New Value - Old Value) / Old Value) × 100. If the result is positive, it's an increase; if negative, it's a decrease. For example, going from 100 to 125 is a 25% increase: ((125-100)/100) × 100 = 25%.",
    },
    {
      question: "Why doesn't a 50% increase followed by 50% decrease equal the original?",
      answer: "Because the percentages are calculated from different base values. If 100 increases by 50%, you get 150. If 150 decreases by 50%, you lose 75 (50% of 150), leaving you with 75 - not 100. This is a common mathematical misconception.",
    },
    {
      question: "How do I convert between percentages, decimals, and fractions?",
      answer: "Percentage to decimal: divide by 100 (25% = 0.25). Decimal to percentage: multiply by 100 (0.25 = 25%). Percentage to fraction: put over 100 and simplify (25% = 25/100 = 1/4). Fraction to percentage: divide numerator by denominator, multiply by 100 (1/4 = 0.25 × 100 = 25%).",
    },
    {
      question: "How do I calculate the original price before a discount?",
      answer: "If you know the final price after a discount, use: Original Price = Final Price ÷ (1 - Discount%). For example, if you paid $80 after a 20% discount: Original = $80 ÷ (1 - 0.20) = $80 ÷ 0.80 = $100.",
    },
    {
      question: "What is the percentage of X out of Y?",
      answer: "To find what percentage X is of Y, use: (X ÷ Y) × 100 = %. For example, if you scored 42 out of 50 on a test: (42 ÷ 50) × 100 = 84%.",
    },
  ],

  // REQUIRED: References
  references: [
    {
      authors: "Khan Academy",
      year: "2024",
      title: "Intro to percentages",
      source: "Khan Academy Mathematics",
      url: "https://www.khanacademy.org/math/pre-algebra/pre-algebra-ratios-rates/pre-algebra-intro-percents/v/describing-the-meaning-of-percent",
    },
    {
      authors: "National Council of Teachers of Mathematics",
      year: "2024",
      title: "Understanding Percentages and Their Applications",
      source: "NCTM Illuminations",
      url: "https://illuminations.nctm.org/",
    },
  ],

  // Sidebar
  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "math" },

  // Features
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },

  // Related Calculators
  relatedCalculators: ["fraction-calculator", "discount-calculator", "tip-calculator", "grade-calculator"],

  // Ads
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// CALCULATE FUNCTION
export function calculatePercentage(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;
  
  const calculationType = values.calculationType as string;
  
  let mainResult = 0;
  let formula = "";
  let stepByStep = "";
  let asFraction = "";
  let asDecimal = 0;
  let multiplier = 0;
  let halfPercent = 0;
  let doublePercent = 0;
  let tenPercent = 0;
  let resultSuffix = "";
  
  switch (calculationType) {
    case "percentOf": {
      const percentage = values.percentage as number;
      const baseValue = values.baseValue as number;
      mainResult = (percentage / 100) * baseValue;
      formula = `${percentage}% × ${baseValue}`;
      stepByStep = `${percentage}% = ${percentage}/100 = ${(percentage/100).toFixed(4)} → ${(percentage/100).toFixed(4)} × ${baseValue} = ${mainResult.toFixed(2)}`;
      asDecimal = percentage / 100;
      multiplier = percentage / 100;
      halfPercent = baseValue * 0.5;
      doublePercent = baseValue * 2;
      tenPercent = baseValue * 0.1;
      // Simplify fraction if possible
      const gcd = findGCD(percentage, 100);
      asFraction = `${percentage/gcd}/${100/gcd}`;
      break;
    }
    case "isWhatPercent": {
      const partValue = values.partValue as number;
      const wholeValue = values.wholeValue as number;
      mainResult = (partValue / wholeValue) * 100;
      resultSuffix = "%";
      formula = `(${partValue} ÷ ${wholeValue}) × 100`;
      stepByStep = `${partValue} ÷ ${wholeValue} = ${(partValue/wholeValue).toFixed(4)} → ${(partValue/wholeValue).toFixed(4)} × 100 = ${mainResult.toFixed(2)}%`;
      asDecimal = partValue / wholeValue;
      multiplier = partValue / wholeValue;
      halfPercent = mainResult / 2;
      doublePercent = mainResult * 2;
      tenPercent = mainResult * 0.1;
      asFraction = simplifyFraction(partValue, wholeValue);
      break;
    }
    case "percentChange": {
      const oldValue = values.oldValue as number;
      const newValue = values.newValue as number;
      const change = newValue - oldValue;
      mainResult = (change / oldValue) * 100;
      resultSuffix = "%";
      const changeType = mainResult >= 0 ? "increase" : "decrease";
      formula = `((${newValue} - ${oldValue}) ÷ ${oldValue}) × 100`;
      stepByStep = `Difference: ${newValue} - ${oldValue} = ${change} → ${change} ÷ ${oldValue} = ${(change/oldValue).toFixed(4)} → ${Math.abs(mainResult).toFixed(2)}% ${changeType}`;
      asDecimal = change / oldValue;
      multiplier = newValue / oldValue;
      halfPercent = Math.abs(mainResult) / 2;
      doublePercent = Math.abs(mainResult) * 2;
      tenPercent = Math.abs(mainResult) * 0.1;
      asFraction = simplifyFraction(Math.abs(change), oldValue);
      break;
    }
    case "percentIncrease": {
      const percentage = values.percentage as number;
      const baseValue = values.baseValue as number;
      mainResult = baseValue * (1 + percentage / 100);
      formula = `${baseValue} × (1 + ${percentage}/100)`;
      stepByStep = `${baseValue} × (1 + ${(percentage/100).toFixed(4)}) = ${baseValue} × ${(1 + percentage/100).toFixed(4)} = ${mainResult.toFixed(2)}`;
      asDecimal = 1 + percentage / 100;
      multiplier = 1 + percentage / 100;
      const increaseAmount = mainResult - baseValue;
      halfPercent = baseValue + (increaseAmount / 2);
      doublePercent = baseValue + (increaseAmount * 2);
      tenPercent = baseValue * 1.1;
      asFraction = `${100 + percentage}/100`;
      break;
    }
    case "percentDecrease": {
      const percentage = values.percentage as number;
      const baseValue = values.baseValue as number;
      mainResult = baseValue * (1 - percentage / 100);
      formula = `${baseValue} × (1 - ${percentage}/100)`;
      stepByStep = `${baseValue} × (1 - ${(percentage/100).toFixed(4)}) = ${baseValue} × ${(1 - percentage/100).toFixed(4)} = ${mainResult.toFixed(2)}`;
      asDecimal = 1 - percentage / 100;
      multiplier = 1 - percentage / 100;
      const decreaseAmount = baseValue - mainResult;
      halfPercent = baseValue - (decreaseAmount / 2);
      doublePercent = baseValue - (decreaseAmount * 2);
      tenPercent = baseValue * 0.9;
      asFraction = `${100 - percentage}/100`;
      break;
    }
    case "findOriginal": {
      const finalValue = values.finalValue as number;
      const appliedPercent = values.appliedPercent as number;
      mainResult = finalValue / (1 + appliedPercent / 100);
      formula = `${finalValue} ÷ (1 + ${appliedPercent}/100)`;
      stepByStep = `${finalValue} ÷ (1 + ${(appliedPercent/100).toFixed(4)}) = ${finalValue} ÷ ${(1 + appliedPercent/100).toFixed(4)} = ${mainResult.toFixed(2)}`;
      asDecimal = 1 + appliedPercent / 100;
      multiplier = 1 / (1 + appliedPercent / 100);
      halfPercent = finalValue / (1 + (appliedPercent / 2) / 100);
      doublePercent = finalValue / (1 + (appliedPercent * 2) / 100);
      tenPercent = finalValue / 1.1;
      asFraction = appliedPercent >= 0 ? `${100}/${100 + appliedPercent}` : `${100}/${100 + appliedPercent}`;
      break;
    }
  }
  
  return {
    values: {
      mainResult,
      formula,
      stepByStep,
      percentSymbol: asDecimal,
      asFraction,
      asDecimal: asDecimal.toFixed(4),
      multiplier: multiplier.toFixed(4),
      halfPercent: halfPercent.toFixed(2),
      doublePercent: doublePercent.toFixed(2),
      tenPercent: tenPercent.toFixed(2),
    },
    formatted: {
      mainResult: formatNumber(mainResult) + resultSuffix,
      formula,
      stepByStep,
      percentSymbol: asDecimal.toFixed(4),
      asFraction,
      asDecimal: asDecimal.toFixed(4),
      multiplier: multiplier.toFixed(4),
      halfPercent: formatNumber(halfPercent),
      doublePercent: formatNumber(doublePercent),
      tenPercent: formatNumber(tenPercent),
    },
    summary: generateSummary(calculationType, mainResult, resultSuffix),
    isValid: true,
  };
}

// Helper functions
function findGCD(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function simplifyFraction(numerator: number, denominator: number): string {
  const gcd = findGCD(Math.round(numerator), Math.round(denominator));
  return `${Math.round(numerator/gcd)}/${Math.round(denominator/gcd)}`;
}

function formatNumber(num: number): string {
  if (Math.abs(num) >= 1000000) {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
  return num.toFixed(2).replace(/\.?0+$/, '') || '0';
}

function generateSummary(type: string, result: number, suffix: string): string {
  const formattedResult = formatNumber(result) + suffix;
  switch (type) {
    case "percentOf":
      return `The result is ${formattedResult}`;
    case "isWhatPercent":
      return `The percentage is ${formattedResult}`;
    case "percentChange":
      return result >= 0 
        ? `Increase of ${formatNumber(Math.abs(result))}%`
        : `Decrease of ${formatNumber(Math.abs(result))}%`;
    case "percentIncrease":
      return `After increase: ${formattedResult}`;
    case "percentDecrease":
      return `After decrease: ${formattedResult}`;
    case "findOriginal":
      return `Original value was ${formattedResult}`;
    default:
      return `Result: ${formattedResult}`;
  }
}

export default percentageCalculatorConfig;
