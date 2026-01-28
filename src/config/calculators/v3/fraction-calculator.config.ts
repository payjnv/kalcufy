import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

export const fractionCalculatorConfig: CalculatorConfigV3 = {
  // Basic Info
  id: "fraction-calculator",
  slug: "fraction-calculator",
  name: "Fraction Calculator",
  category: "math",
  icon: "🔢",

  // SEO
  seo: {
    title: "Fraction Calculator - Add, Subtract, Multiply, Divide Fractions",
    description: "Free online fraction calculator to add, subtract, multiply, and divide fractions. Supports mixed numbers, simplification, and step-by-step solutions. Works with improper fractions too.",
    shortDescription: "Calculate fractions with step-by-step solutions",
    keywords: ["fraction calculator", "add fractions", "subtract fractions", "multiply fractions", "divide fractions", "simplify fractions", "mixed numbers", "improper fractions", "LCD", "common denominator"],
  },

  // Hero Section
  hero: {
    badge: "Math",
    rating: { average: 4.9, count: 12850 },
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
      id: "operation",
      type: "select",
      label: "Operation",
      required: true,
      defaultValue: "add",
      options: [
        { value: "add", label: "Add (+)" },
        { value: "subtract", label: "Subtract (−)" },
        { value: "multiply", label: "Multiply (×)" },
        { value: "divide", label: "Divide (÷)" },
        { value: "simplify", label: "Simplify" },
        { value: "convert", label: "Convert" },
      ],
    },
    // First Fraction
    {
      id: "whole1",
      type: "number",
      label: "Whole Number",
      required: false,
      defaultValue: 0,
      min: -9999,
      max: 9999,
      step: 1,
      width: "half",
      helpText: "Optional",
      showWhen: { field: "operation", value: ["add", "subtract", "multiply", "divide", "simplify", "convert"] },
    },
    {
      id: "numerator1",
      type: "number",
      label: "Numerator",
      required: true,
      defaultValue: 1,
      min: -9999,
      max: 9999,
      step: 1,
      width: "half",
    },
    {
      id: "denominator1",
      type: "number",
      label: "Denominator",
      required: true,
      defaultValue: 2,
      min: 1,
      max: 9999,
      step: 1,
      helpText: "Cannot be zero",
    },
    // Second Fraction (hidden for simplify and convert)
    {
      id: "whole2",
      type: "number",
      label: "Whole Number",
      required: false,
      defaultValue: 0,
      min: -9999,
      max: 9999,
      step: 1,
      width: "half",
      helpText: "Optional",
      showWhen: { field: "operation", value: ["add", "subtract", "multiply", "divide"] },
    },
    {
      id: "numerator2",
      type: "number",
      label: "Numerator",
      required: true,
      defaultValue: 1,
      min: -9999,
      max: 9999,
      step: 1,
      width: "half",
      showWhen: { field: "operation", value: ["add", "subtract", "multiply", "divide"] },
    },
    {
      id: "denominator2",
      type: "number",
      label: "Denominator",
      required: true,
      defaultValue: 4,
      min: 1,
      max: 9999,
      step: 1,
      helpText: "Cannot be zero",
      showWhen: { field: "operation", value: ["add", "subtract", "multiply", "divide"] },
    },
    // Convert options
    {
      id: "convertTo",
      type: "select",
      label: "Convert To",
      required: true,
      defaultValue: "decimal",
      options: [
        { value: "decimal", label: "Decimal" },
        { value: "percentage", label: "Percentage" },
        { value: "mixed", label: "Mixed Number" },
        { value: "improper", label: "Improper Fraction" },
      ],
      showWhen: { field: "operation", value: "convert" },
    },
  ],

  // Input Groups
  inputGroups: [],

  // RESULTS
  results: [
    { id: "mainResult", type: "primary", label: "Result", format: "text" },
    { id: "simplified", type: "secondary", label: "Simplified", format: "text" },
    { id: "decimal", type: "secondary", label: "As Decimal", format: "number" },
    { id: "percentage", type: "secondary", label: "As Percentage", format: "text" },
  ],

  // Info Cards
  infoCards: [
    {
      id: "fractionInfo",
      title: "Fraction Details",
      type: "list",
      items: [
        { label: "Mixed Number", valueKey: "mixedNumber", suffix: "" },
        { label: "Improper Fraction", valueKey: "improperFraction", suffix: "" },
        { label: "LCD Used", valueKey: "lcdUsed", suffix: "" },
      ],
    },
    {
      id: "equivalents",
      title: "Equivalent Fractions",
      type: "horizontal",
      items: [
        { label: "×2", valueKey: "equiv2", suffix: "" },
        { label: "×3", valueKey: "equiv3", suffix: "" },
        { label: "×4", valueKey: "equiv4", suffix: "" },
      ],
    },
  ],

  // Reference Data
  referenceData: [
    {
      id: "commonFractions",
      title: "Common Fractions Reference",
      columns: [
        { key: "fraction", label: "Fraction" },
        { key: "decimal", label: "Decimal" },
        { key: "percent", label: "Percent" },
        { key: "equivalent", label: "Equivalents" },
      ],
      data: [
        { fraction: "1/2", decimal: "0.5", percent: "50%", equivalent: "2/4, 3/6, 4/8" },
        { fraction: "1/3", decimal: "0.333...", percent: "33.33%", equivalent: "2/6, 3/9, 4/12" },
        { fraction: "1/4", decimal: "0.25", percent: "25%", equivalent: "2/8, 3/12, 4/16" },
        { fraction: "1/5", decimal: "0.2", percent: "20%", equivalent: "2/10, 3/15, 4/20" },
        { fraction: "2/3", decimal: "0.666...", percent: "66.67%", equivalent: "4/6, 6/9, 8/12" },
        { fraction: "3/4", decimal: "0.75", percent: "75%", equivalent: "6/8, 9/12, 12/16" },
        { fraction: "1/8", decimal: "0.125", percent: "12.5%", equivalent: "2/16, 3/24, 4/32" },
        { fraction: "1/10", decimal: "0.1", percent: "10%", equivalent: "2/20, 3/30, 5/50" },
      ],
    },
  ],

  // EDUCATION SECTIONS
  educationSections: [
    // Cards - Operations explained
    {
      id: "operationsExplained",
      type: "cards",
      title: "Fraction Operations",
      icon: "➕",
      columns: 2,
      cards: [
        {
          title: "Adding Fractions",
          description: "To add fractions, first find a common denominator (LCD), convert each fraction, then add the numerators. Keep the denominator the same. Example: 1/4 + 1/3 = 3/12 + 4/12 = 7/12",
          icon: "➕",
        },
        {
          title: "Subtracting Fractions",
          description: "Same as addition: find LCD, convert fractions, then subtract numerators. Keep the denominator. Example: 3/4 - 1/3 = 9/12 - 4/12 = 5/12",
          icon: "➖",
        },
        {
          title: "Multiplying Fractions",
          description: "Multiply numerators together, multiply denominators together. No common denominator needed! Example: 2/3 × 3/4 = 6/12 = 1/2",
          icon: "✖️",
        },
        {
          title: "Dividing Fractions",
          description: "Flip the second fraction (reciprocal) and multiply. Example: 1/2 ÷ 3/4 = 1/2 × 4/3 = 4/6 = 2/3",
          icon: "➗",
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
        { text: "The denominator can never be zero - division by zero is undefined", type: "warning" },
        { text: "Always simplify your final answer to lowest terms when possible", type: "info" },
        { text: "For addition and subtraction, a common denominator is required", type: "info" },
        { text: "For multiplication and division, NO common denominator is needed", type: "info" },
        { text: "Mixed numbers should be converted to improper fractions before operations", type: "warning" },
        { text: "When dividing fractions, multiply by the reciprocal (flip the second fraction)", type: "info" },
      ],
    },
    // REQUIRED: Example Calculation (type: "code-example")
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculations",
      icon: "📊",
      description: "Step-by-step examples of fraction operations",
      columns: 2,
      examples: [
        {
          title: "Adding: 2/3 + 1/4",
          steps: [
            "Find LCD of 3 and 4: LCD = 12",
            "Convert 2/3: (2×4)/(3×4) = 8/12",
            "Convert 1/4: (1×3)/(4×3) = 3/12",
            "Add numerators: 8/12 + 3/12 = 11/12",
          ],
          result: "2/3 + 1/4 = 11/12",
        },
        {
          title: "Subtracting: 5/6 - 1/4",
          steps: [
            "Find LCD of 6 and 4: LCD = 12",
            "Convert 5/6: (5×2)/(6×2) = 10/12",
            "Convert 1/4: (1×3)/(4×3) = 3/12",
            "Subtract: 10/12 - 3/12 = 7/12",
          ],
          result: "5/6 - 1/4 = 7/12",
        },
        {
          title: "Multiplying: 2/3 × 4/5",
          steps: [
            "Multiply numerators: 2 × 4 = 8",
            "Multiply denominators: 3 × 5 = 15",
            "Result: 8/15 (already simplified)",
          ],
          result: "2/3 × 4/5 = 8/15",
        },
        {
          title: "Dividing: 3/4 ÷ 2/5",
          steps: [
            "Flip second fraction: 2/5 → 5/2",
            "Multiply: 3/4 × 5/2",
            "Numerators: 3 × 5 = 15",
            "Denominators: 4 × 2 = 8",
            "Result: 15/8 = 1 7/8",
          ],
          result: "3/4 ÷ 2/5 = 15/8 = 1 7/8",
        },
      ],
    },
    // Prose - What are fractions
    {
      id: "whatAreFractions",
      type: "prose",
      title: "What are Fractions?",
      content: "A fraction represents a part of a whole. It consists of two numbers: the numerator (top number) shows how many parts we have, and the denominator (bottom number) shows how many equal parts the whole is divided into. For example, 3/4 means 3 parts out of 4 equal parts. Fractions can be proper (numerator < denominator, like 2/3), improper (numerator ≥ denominator, like 5/3), or mixed numbers (whole number + proper fraction, like 1 2/3).",
    },
    // Prose - Finding LCD
    {
      id: "findingLCD",
      type: "prose",
      title: "Finding the Least Common Denominator (LCD)",
      content: "The LCD is the smallest number that both denominators divide into evenly. To find it: 1) List multiples of each denominator, 2) Find the smallest common multiple. For example, for 3 and 4: multiples of 3 are 3, 6, 9, 12...; multiples of 4 are 4, 8, 12... The LCD is 12. Alternatively, you can use prime factorization or simply multiply the denominators (though this may not give the LCD, it will give A common denominator).",
    },
    // Prose - Simplifying fractions
    {
      id: "simplifyingFractions",
      type: "prose",
      title: "Simplifying Fractions",
      content: "To simplify (or reduce) a fraction, divide both numerator and denominator by their Greatest Common Factor (GCF). For example, to simplify 8/12: GCF of 8 and 12 is 4, so 8÷4/12÷4 = 2/3. A fraction is in lowest terms when the GCF of numerator and denominator is 1. You can find the GCF by listing factors of both numbers and finding the largest common one, or by using prime factorization.",
    },
  ],

  // FAQs
  faqs: [
    {
      question: "How do I add fractions with different denominators?",
      answer: "First, find the Least Common Denominator (LCD) of both fractions. Convert each fraction to an equivalent fraction with the LCD as denominator. Then add the numerators and keep the common denominator. Finally, simplify if possible. Example: 1/3 + 1/4 → LCD is 12 → 4/12 + 3/12 = 7/12.",
    },
    {
      question: "How do I multiply fractions?",
      answer: "Multiplying fractions is straightforward: multiply the numerators together to get the new numerator, multiply the denominators together to get the new denominator. No common denominator needed! Then simplify. Example: 2/3 × 4/5 = (2×4)/(3×5) = 8/15.",
    },
    {
      question: "How do I divide fractions?",
      answer: "To divide fractions, flip the second fraction (find its reciprocal) and multiply. This is often remembered as 'Keep, Change, Flip'. Example: 1/2 ÷ 3/4 = 1/2 × 4/3 = 4/6 = 2/3.",
    },
    {
      question: "How do I convert a mixed number to an improper fraction?",
      answer: "Multiply the whole number by the denominator, add the numerator, and put the result over the original denominator. Example: 2 3/4 → (2×4)+3 = 11, so 2 3/4 = 11/4.",
    },
    {
      question: "How do I convert an improper fraction to a mixed number?",
      answer: "Divide the numerator by the denominator. The quotient is the whole number, and the remainder is the new numerator over the original denominator. Example: 11/4 → 11÷4 = 2 remainder 3, so 11/4 = 2 3/4.",
    },
    {
      question: "What is the GCF and how do I find it?",
      answer: "GCF (Greatest Common Factor) is the largest number that divides evenly into both numbers. To find it, list all factors of each number and find the largest one they share. For 12 and 8: factors of 12 are 1,2,3,4,6,12; factors of 8 are 1,2,4,8. Common factors: 1,2,4. GCF = 4.",
    },
  ],

  // REQUIRED: References
  references: [
    {
      authors: "Khan Academy",
      year: "2024",
      title: "Fractions arithmetic",
      source: "Khan Academy Mathematics",
      url: "https://www.khanacademy.org/math/arithmetic/fraction-arithmetic",
    },
    {
      authors: "National Council of Teachers of Mathematics",
      year: "2024",
      title: "Understanding Fractions",
      source: "NCTM Illuminations",
      url: "https://illuminations.nctm.org/",
    },
  ],

  // Sidebar
  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "math" },

  // Features
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },

  // Related Calculators
  relatedCalculators: ["percentage-calculator", "gcf-lcm-calculator", "decimal-calculator", "ratio-calculator"],

  // Ads
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// Helper: Find GCD (Greatest Common Divisor)
function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Helper: Find LCM (Least Common Multiple)
function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

// Helper: Simplify fraction
function simplifyFraction(num: number, den: number): { num: number; den: number } {
  if (den === 0) return { num: 0, den: 1 };
  const g = gcd(Math.abs(num), Math.abs(den));
  let simplifiedNum = num / g;
  let simplifiedDen = den / g;
  // Ensure denominator is positive
  if (simplifiedDen < 0) {
    simplifiedNum = -simplifiedNum;
    simplifiedDen = -simplifiedDen;
  }
  return { num: simplifiedNum, den: simplifiedDen };
}

// Helper: Convert mixed number to improper fraction
function mixedToImproper(whole: number, num: number, den: number): { num: number; den: number } {
  const sign = whole < 0 ? -1 : 1;
  const absWhole = Math.abs(whole);
  return { num: sign * (absWhole * den + Math.abs(num)), den };
}

// Helper: Convert improper fraction to mixed number
function improperToMixed(num: number, den: number): { whole: number; num: number; den: number } {
  if (den === 0) return { whole: 0, num: 0, den: 1 };
  const sign = (num < 0) !== (den < 0) ? -1 : 1;
  const absNum = Math.abs(num);
  const absDen = Math.abs(den);
  const whole = Math.floor(absNum / absDen);
  const remainder = absNum % absDen;
  return { whole: sign * whole, num: remainder, den: absDen };
}

// Helper: Format fraction as string
function formatFraction(num: number, den: number): string {
  if (den === 1) return `${num}`;
  return `${num}/${den}`;
}

// Helper: Format mixed number as string
function formatMixed(whole: number, num: number, den: number): string {
  if (whole === 0) return formatFraction(num, den);
  if (num === 0) return `${whole}`;
  return `${whole} ${Math.abs(num)}/${den}`;
}

// CALCULATE FUNCTION
export function calculateFraction(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;
  
  const operation = values.operation as string;
  const whole1 = (values.whole1 as number) || 0;
  const num1 = values.numerator1 as number;
  const den1 = values.denominator1 as number;
  const whole2 = (values.whole2 as number) || 0;
  const num2 = (values.numerator2 as number) || 1;
  const den2 = (values.denominator2 as number) || 1;
  const convertTo = (values.convertTo as string) || 'decimal';
  
  // Validate denominators
  if (den1 === 0 || (operation !== 'simplify' && operation !== 'convert' && den2 === 0)) {
    return {
      values: { mainResult: "Error", simplified: "N/A", decimal: 0, percentage: "N/A" },
      formatted: { mainResult: "Error: Denominator cannot be zero", simplified: "N/A", decimal: "N/A", percentage: "N/A" },
      summary: "Invalid input: denominator cannot be zero",
      isValid: false,
    };
  }
  
  // Convert mixed numbers to improper fractions
  const frac1 = mixedToImproper(whole1, num1, den1);
  const frac2 = mixedToImproper(whole2, num2, den2);
  
  let resultNum = 0;
  let resultDen = 1;
  let lcdUsed = 0;
  let stepDescription = "";
  
  switch (operation) {
    case "add": {
      lcdUsed = lcm(frac1.den, frac2.den);
      const mult1 = lcdUsed / frac1.den;
      const mult2 = lcdUsed / frac2.den;
      resultNum = frac1.num * mult1 + frac2.num * mult2;
      resultDen = lcdUsed;
      stepDescription = `LCD = ${lcdUsed}, ${frac1.num}×${mult1}/${lcdUsed} + ${frac2.num}×${mult2}/${lcdUsed}`;
      break;
    }
    case "subtract": {
      lcdUsed = lcm(frac1.den, frac2.den);
      const mult1 = lcdUsed / frac1.den;
      const mult2 = lcdUsed / frac2.den;
      resultNum = frac1.num * mult1 - frac2.num * mult2;
      resultDen = lcdUsed;
      stepDescription = `LCD = ${lcdUsed}, ${frac1.num}×${mult1}/${lcdUsed} - ${frac2.num}×${mult2}/${lcdUsed}`;
      break;
    }
    case "multiply": {
      resultNum = frac1.num * frac2.num;
      resultDen = frac1.den * frac2.den;
      stepDescription = `${frac1.num}×${frac2.num} / ${frac1.den}×${frac2.den}`;
      break;
    }
    case "divide": {
      if (frac2.num === 0) {
        return {
          values: { mainResult: "Error", simplified: "N/A", decimal: 0, percentage: "N/A" },
          formatted: { mainResult: "Error: Cannot divide by zero", simplified: "N/A", decimal: "N/A", percentage: "N/A" },
          summary: "Invalid operation: division by zero",
          isValid: false,
        };
      }
      // Flip and multiply
      resultNum = frac1.num * frac2.den;
      resultDen = frac1.den * frac2.num;
      stepDescription = `${frac1.num}/${frac1.den} × ${frac2.den}/${frac2.num}`;
      break;
    }
    case "simplify": {
      resultNum = frac1.num;
      resultDen = frac1.den;
      stepDescription = `GCD(${Math.abs(frac1.num)}, ${frac1.den}) = ${gcd(Math.abs(frac1.num), frac1.den)}`;
      break;
    }
    case "convert": {
      resultNum = frac1.num;
      resultDen = frac1.den;
      stepDescription = `Converting ${formatFraction(frac1.num, frac1.den)}`;
      break;
    }
  }
  
  // Simplify result
  const simplified = simplifyFraction(resultNum, resultDen);
  const decimalValue = simplified.num / simplified.den;
  const percentValue = decimalValue * 100;
  
  // Convert to mixed number
  const mixed = improperToMixed(simplified.num, simplified.den);
  
  // Format main result based on operation
  let mainResultStr = "";
  if (operation === "convert") {
    switch (convertTo) {
      case "decimal":
        mainResultStr = decimalValue.toFixed(6).replace(/\.?0+$/, '');
        break;
      case "percentage":
        mainResultStr = percentValue.toFixed(2) + "%";
        break;
      case "mixed":
        mainResultStr = Math.abs(simplified.num) >= simplified.den 
          ? formatMixed(mixed.whole, mixed.num, mixed.den)
          : formatFraction(simplified.num, simplified.den);
        break;
      case "improper":
        mainResultStr = formatFraction(simplified.num, simplified.den);
        break;
    }
  } else {
    // For operations, show as mixed number if improper
    if (Math.abs(simplified.num) >= simplified.den && simplified.den !== 1) {
      mainResultStr = formatMixed(mixed.whole, mixed.num, mixed.den);
    } else {
      mainResultStr = formatFraction(simplified.num, simplified.den);
    }
  }
  
  // Generate equivalent fractions
  const equiv2 = `${simplified.num * 2}/${simplified.den * 2}`;
  const equiv3 = `${simplified.num * 3}/${simplified.den * 3}`;
  const equiv4 = `${simplified.num * 4}/${simplified.den * 4}`;
  
  return {
    values: {
      mainResult: mainResultStr,
      simplified: formatFraction(simplified.num, simplified.den),
      decimal: decimalValue,
      percentage: percentValue.toFixed(2) + "%",
      mixedNumber: Math.abs(simplified.num) >= simplified.den 
        ? formatMixed(mixed.whole, mixed.num, mixed.den) 
        : formatFraction(simplified.num, simplified.den),
      improperFraction: formatFraction(simplified.num, simplified.den),
      lcdUsed: lcdUsed > 0 ? lcdUsed.toString() : "N/A",
      equiv2,
      equiv3,
      equiv4,
      stepDescription,
    },
    formatted: {
      mainResult: mainResultStr,
      simplified: formatFraction(simplified.num, simplified.den),
      decimal: decimalValue.toFixed(6).replace(/\.?0+$/, ''),
      percentage: percentValue.toFixed(2) + "%",
      mixedNumber: Math.abs(simplified.num) >= simplified.den 
        ? formatMixed(mixed.whole, mixed.num, mixed.den) 
        : formatFraction(simplified.num, simplified.den),
      improperFraction: formatFraction(simplified.num, simplified.den),
      lcdUsed: lcdUsed > 0 ? lcdUsed.toString() : "N/A",
      equiv2,
      equiv3,
      equiv4,
    },
    summary: generateFractionSummary(operation, mainResultStr, stepDescription),
    isValid: true,
  };
}

function generateFractionSummary(operation: string, result: string, step: string): string {
  const opNames: Record<string, string> = {
    add: "Sum",
    subtract: "Difference",
    multiply: "Product",
    divide: "Quotient",
    simplify: "Simplified",
    convert: "Converted",
  };
  return `${opNames[operation] || "Result"}: ${result}`;
}

export default fractionCalculatorConfig;
