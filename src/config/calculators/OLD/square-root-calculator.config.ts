import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

export const squareRootCalculatorConfig: CalculatorConfigV3 = {
  id: "square-root-calculator",
  slug: "square-root-calculator",
  name: "Square Root & Exponent Calculator",
  category: "math",
  icon: "√",

  seo: {
    title: "Square Root & Exponent Calculator | Kalcufy",
    description: "Calculate square roots, cube roots, nth roots, and exponents with step-by-step solutions.",
    shortDescription: "Calculate roots and powers of any number",
    keywords: ["square root calculator", "exponent calculator", "power calculator", "cube root"],
  },

  hero: {
    badge: "Math",
    rating: { average: 4.9, count: 3421 },
  },

  unitSystem: {
    enabled: false,
    default: "metric",
    options: [],
  },

  inputs: [
    {
      id: "calculationType",
      type: "select",
      label: "Calculation Type",
      required: true,
      defaultValue: "squareRoot",
      options: [
        { value: "squareRoot", label: "Square Root (√x)" },
        { value: "cubeRoot", label: "Cube Root (∛x)" },
        { value: "nthRoot", label: "Nth Root (ⁿ√x)" },
        { value: "power", label: "Power (xⁿ)" },
      ],
    },
    {
      id: "number",
      type: "number",
      label: "Number",
      required: true,
      defaultValue: 16,
      step: 0.01,
      helpText: "Enter the number to calculate",
    },
    {
      id: "exponent",
      type: "number",
      label: "Exponent / Root Index",
      required: false,
      defaultValue: 2,
      min: 1,
      step: 1,
      helpText: "For nth root or power calculations",
      showWhen: { field: "calculationType", value: ["nthRoot", "power"] },
    },
  ],

  inputGroups: [],

  results: [
    { id: "result", type: "primary", label: "Result", format: "number" },
    { id: "expression", type: "secondary", label: "Expression", format: "text" },
    { id: "isPerfect", type: "secondary", label: "Perfect Square/Cube", format: "text" },
  ],

  infoCards: [
    {
      id: "quickResults",
      title: "Quick Results",
      type: "list",
      icon: "📊",
      items: [
        { label: "Result", valueKey: "result" },
        { label: "Expression", valueKey: "expression" },
      ],
    },
    {
      id: "tips",
      title: "Quick Tips",
      type: "horizontal",
      icon: "💡",
      items: [
        { label: "√x = x^(1/2)" },
        { label: "∛x = x^(1/3)" },
        { label: "ⁿ√x = x^(1/n)" },
      ],
    },
  ],

  referenceData: [
    {
      id: "perfectSquares",
      title: "Perfect Squares",
      icon: "📋",
      columns: 4,
      items: [
        { label: "√1", value: "1" },
        { label: "√4", value: "2" },
        { label: "√9", value: "3" },
        { label: "√16", value: "4" },
        { label: "√25", value: "5" },
        { label: "√36", value: "6" },
        { label: "√49", value: "7" },
        { label: "√64", value: "8" },
      ],
    },
  ],

  educationSections: [
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "Negative numbers don't have real square roots - the result is imaginary", type: "warning" },
        { text: "Every positive number has two square roots: one positive and one negative", type: "info" },
        { text: "Cube roots of negative numbers are negative (∛-8 = -2)", type: "info" },
        { text: "Any number raised to the power of 0 equals 1 (except 0⁰)", type: "info" },
        { text: "The principal square root is always the positive root", type: "info" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "📊",
      description: "Common root and power calculations",
      columns: 2,
      examples: [
        {
          title: "Square Root of 144",
          steps: [
            "Find x where x × x = 144",
            "√144 = 12",
            "Verify: 12 × 12 = 144 ✓",
          ],
          result: "√144 = 12",
        },
        {
          title: "2 raised to power 5",
          steps: [
            "2⁵ = 2 × 2 × 2 × 2 × 2",
            "= 4 × 2 × 2 × 2",
            "= 8 × 2 × 2 = 32",
          ],
          result: "2⁵ = 32",
        },
      ],
    },
    {
      id: "prose1",
      type: "prose",
      title: "What is a Square Root?",
      content: "A square root of a number x is a value that, when multiplied by itself, equals x. For example, the square root of 16 is 4 because 4 × 4 = 16. Every positive number has two square roots: a positive root (principal root) and a negative root. By convention, the √ symbol refers to the positive root.",
    },
    {
      id: "prose2",
      type: "prose",
      title: "What is a Cube Root?",
      content: "A cube root of a number x is a value that, when multiplied by itself three times, equals x. For example, the cube root of 27 is 3 because 3 × 3 × 3 = 27. Unlike square roots, cube roots can be negative. The cube root of -8 is -2 because (-2) × (-2) × (-2) = -8.",
    },
    {
      id: "prose3",
      type: "prose",
      title: "Understanding Exponents",
      content: "An exponent tells you how many times to multiply a number by itself. In the expression xⁿ, x is called the base and n is the exponent. For example, 2³ means 2 × 2 × 2 = 8. Exponents follow specific rules: any number to the power of 0 equals 1, any number to the power of 1 equals itself, and negative exponents represent reciprocals.",
    },
  ],

  faqs: [
    {
      question: "What is the square root of a negative number?",
      answer: "Negative numbers don't have real square roots. The square root of a negative number is an imaginary number. For example, √-1 = i (the imaginary unit). √-16 = 4i.",
    },
    {
      question: "What is a perfect square?",
      answer: "A perfect square is a number whose square root is a whole number. Examples include 1, 4, 9, 16, 25, 36, 49, 64, 81, and 100. These numbers result from multiplying an integer by itself.",
    },
    {
      question: "How do I calculate cube roots?",
      answer: "A cube root is found by determining what number multiplied by itself three times equals the original number. For example, ∛64 = 4 because 4 × 4 × 4 = 64. Unlike square roots, cube roots can be negative.",
    },
    {
      question: "What does x⁰ equal?",
      answer: "Any non-zero number raised to the power of 0 equals 1. This is a mathematical rule: x⁰ = 1 (when x ≠ 0). The expression 0⁰ is typically considered undefined.",
    },
    {
      question: "How are roots and exponents related?",
      answer: "Roots are the inverse of exponents. The nth root of x can be written as x^(1/n). For example, √x = x^(1/2) and ∛x = x^(1/3). This relationship is fundamental in algebra.",
    },
    {
      question: "What is the difference between √ and ²√?",
      answer: "They are the same thing. The √ symbol (radical sign) by default means square root (2nd root). The 2 in ²√ is often omitted. For cube root, we write ³√ or ∛, and for higher roots, we write ⁿ√.",
    },
  ],

  references: [
    {
      authors: "Weisstein, Eric W.",
      year: "2024",
      title: "Square Root",
      source: "MathWorld - A Wolfram Web Resource",
      url: "https://mathworld.wolfram.com/SquareRoot.html",
    },
    {
      authors: "Khan Academy",
      year: "2024",
      title: "Exponents and Radicals",
      source: "Khan Academy Mathematics",
      url: "https://www.khanacademy.org/math/algebra",
    },
  ],

  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: false,
    category: "math",
  },
  features: {
    autoCalculate: true,
    exportPDF: true,
    shareResults: true,
    saveHistory: true,
  },
  relatedCalculators: ["percentage-calculator", "fraction-calculator"],
  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
  },
};

export function calculateSquareRoot(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;
  
  const calculationType = values.calculationType as string;
  const number = values.number as number;
  const exponent = (values.exponent as number) || 2;

  if (number === undefined || number === null) {
    return {
      values: {},
      formatted: {},
      summary: "Enter a number to calculate",
      isValid: false,
    };
  }

  let result: number;
  let expression: string;
  let isPerfect: string = "No";

  switch (calculationType) {
    case "squareRoot":
      if (number < 0) {
        return {
          values: { result: NaN },
          formatted: { result: "Imaginary", expression: "√" + number + " = " + Math.sqrt(Math.abs(number)).toFixed(4) + "i", isPerfect: "N/A" },
          summary: "Negative numbers have imaginary square roots",
          isValid: true,
        };
      }
      result = Math.sqrt(number);
      expression = "√" + number + " = " + result;
      if (Number.isInteger(result)) {
        isPerfect = "Yes (Perfect Square)";
      }
      break;

    case "cubeRoot":
      result = Math.cbrt(number);
      expression = "∛" + number + " = " + result;
      if (Number.isInteger(result)) {
        isPerfect = "Yes (Perfect Cube)";
      }
      break;

    case "nthRoot":
      if (number < 0 && exponent % 2 === 0) {
        return {
          values: { result: NaN },
          formatted: { result: "Imaginary", expression: exponent + "√" + number + " = Imaginary", isPerfect: "N/A" },
          summary: "Even roots of negative numbers are imaginary",
          isValid: true,
        };
      }
      result = number < 0 ? -Math.pow(Math.abs(number), 1 / exponent) : Math.pow(number, 1 / exponent);
      expression = exponent + "√" + number + " = " + result;
      if (Number.isInteger(result)) {
        isPerfect = "Yes (Perfect " + exponent + "th power)";
      }
      break;

    case "power":
      result = Math.pow(number, exponent);
      expression = number + "^" + exponent + " = " + result;
      isPerfect = "N/A";
      break;

    default:
      result = Math.sqrt(number);
      expression = "√" + number + " = " + result;
  }

  const formatNumber = (n: number): string => {
    if (!isFinite(n)) return "∞";
    if (Number.isInteger(n)) return n.toLocaleString();
    return n.toFixed(6).replace(/\.?0+$/, "");
  };

  return {
    values: {
      result,
      expression,
      isPerfect,
    },
    formatted: {
      result: formatNumber(result),
      expression,
      isPerfect,
    },
    summary: expression,
    isValid: true,
  };
}

export default squareRootCalculatorConfig;
