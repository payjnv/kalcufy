import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

export const ruleOfThreeCalculatorConfig: CalculatorConfigV3 = {
  id: "rule-of-three-calculator",
  slug: "rule-of-three-calculator",
  name: "Rule of Three Calculator",
  category: "math",
  icon: "⚖️",

  seo: {
    title: "Rule of Three Calculator | Kalcufy",
    description: "Calculate proportions using the rule of three. Solve direct and inverse proportion problems.",
    shortDescription: "Solve proportions with direct and inverse rule of three",
    keywords: ["rule of three calculator", "proportion calculator", "cross multiplication"],
  },

  hero: {
    badge: "Math",
    rating: { average: 4.9, count: 5234 },
  },

  unitSystem: {
    enabled: false,
    default: "metric",
    options: [],
  },

  inputs: [
    {
      id: "proportionType",
      type: "radio",
      label: "Proportion Type",
      required: true,
      defaultValue: "direct",
      options: [
        { value: "direct", label: "Direct (more → more)" },
        { value: "inverse", label: "Inverse (more → less)" },
      ],
      helpText: "Direct: both values increase together. Inverse: one increases, the other decreases.",
    },
    {
      id: "valueA",
      type: "number",
      label: "Value A",
      required: true,
      defaultValue: 2,
      step: 0.01,
      helpText: "First known value",
      width: "half",
    },
    {
      id: "valueB",
      type: "number",
      label: "Value B",
      required: true,
      defaultValue: 5,
      step: 0.01,
      helpText: "Second known value",
      width: "half",
    },
    {
      id: "valueC",
      type: "number",
      label: "Value C",
      required: true,
      defaultValue: 8,
      step: 0.01,
      helpText: "Third known value",
    },
  ],

  inputGroups: [],

  results: [
    { id: "result", type: "primary", label: "Result (X)", format: "number" },
    { id: "proportion", type: "secondary", label: "Proportion", format: "text" },
    { id: "formula", type: "secondary", label: "Formula", format: "text" },
  ],

  infoCards: [
    {
      id: "relationship",
      title: "Proportion Relationship",
      type: "list",
      icon: "🔗",
      items: [
        { label: "A is to B as C is to X" },
        { label: "Direct: A/B = C/X" },
        { label: "Inverse: A × B = C × X" },
      ],
    },
    {
      id: "applications",
      title: "Common Applications",
      type: "horizontal",
      icon: "💡",
      items: [
        { label: "Currency conversion" },
        { label: "Recipe scaling" },
        { label: "Speed/time/distance" },
        { label: "Price calculations" },
      ],
    },
  ],

  referenceData: [
    {
      id: "formulas",
      title: "Formulas",
      icon: "📐",
      columns: 2,
      items: [
        { label: "Direct", value: "X = (B × C) / A" },
        { label: "Inverse", value: "X = (A × B) / C" },
        { label: "Proportion", value: "A : B = C : X" },
        { label: "Cross Multiply", value: "A × X = B × C" },
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
        { text: "Always identify if the proportion is direct or inverse before calculating", type: "warning" },
        { text: "Direct proportion: both quantities change in the same direction", type: "info" },
        { text: "Inverse proportion: quantities change in opposite directions", type: "info" },
        { text: "Value A cannot be zero (division by zero is undefined)", type: "warning" },
        { text: "Units must be consistent on both sides of the proportion", type: "info" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculations",
      icon: "📊",
      description: "Practical examples of proportions",
      columns: 2,
      examples: [
        {
          title: "Direct: Price Calculation",
          steps: [
            "If 3 kg costs $12, how much does 5 kg cost?",
            "A = 3, B = 12, C = 5, X = ?",
            "X = (B × C) / A",
            "X = (12 × 5) / 3 = 20",
          ],
          result: "5 kg costs $20",
        },
        {
          title: "Inverse: Workers & Time",
          steps: [
            "If 4 workers finish in 6 days, how long for 8?",
            "A = 4, B = 6, C = 8, X = ?",
            "X = (A × B) / C",
            "X = (4 × 6) / 8 = 3",
          ],
          result: "8 workers finish in 3 days",
        },
      ],
    },
    {
      id: "prose1",
      type: "prose",
      title: "What is the Rule of Three?",
      content: "The rule of three is a mathematical method for solving proportion problems. Given three known values and one unknown, it allows you to find the missing value using the relationship between proportional quantities. This technique has been used for centuries in commerce, cooking, and construction.",
    },
    {
      id: "prose2",
      type: "prose",
      title: "Understanding Direct Proportion",
      content: "In a direct proportion, when one quantity increases, the other increases at the same rate. Think of buying products: if 2 apples cost $4, then 4 apples cost $8. The more you buy, the more you pay. The formula is X = (B × C) / A. Examples include currency exchange and recipe scaling.",
    },
    {
      id: "prose3",
      type: "prose",
      title: "Understanding Inverse Proportion",
      content: "In an inverse proportion, when one quantity increases, the other decreases. Consider workers completing a task: if 2 workers take 10 days, 4 workers would take 5 days. More workers means less time needed. The formula is X = (A × B) / C. Common examples include speed and time.",
    },
  ],

  faqs: [
    {
      question: "How do I know if it's direct or inverse proportion?",
      answer: "Ask yourself: 'If I increase the first quantity, does the result increase or decrease?' If both increase together (more work = more pay), it's direct. If one increases while the other decreases (more workers = less time), it's inverse.",
    },
    {
      question: "What is cross multiplication?",
      answer: "Cross multiplication is a technique to solve proportions. For A/B = C/X, multiply diagonally (A × X = B × C), then solve for X: X = (B × C) / A. It's called 'cross' because you multiply across the equals sign.",
    },
    {
      question: "Can I use the rule of three for percentages?",
      answer: "Yes! For example, if 100% equals 250, what is 30%? Using direct proportion: A=100, B=250, C=30, X=(250×30)/100=75. Percentages work perfectly with rule of three.",
    },
    {
      question: "What if I get a negative result?",
      answer: "In most real-world applications, a negative result indicates an error in setup or that you chose the wrong proportion type. Check if you used direct when you should have used inverse, or verify your input values.",
    },
    {
      question: "Can I use decimals and fractions?",
      answer: "Yes, the rule of three works with any numbers: whole numbers, decimals, and fractions. The calculator handles all numeric types. Just ensure your units are consistent throughout the calculation.",
    },
    {
      question: "What is the compound rule of three?",
      answer: "The compound rule of three is used when you have more than two related quantities (3, 4, or more). You apply the simple rule of three multiple times, once for each pair of related quantities, combining all factors to get the final result.",
    },
  ],

  references: [
    {
      authors: "Wikipedia Contributors",
      year: "2024",
      title: "Cross-multiplication",
      source: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Cross-multiplication",
    },
    {
      authors: "Khan Academy",
      year: "2024",
      title: "Ratios and Proportional Relationships",
      source: "Khan Academy Mathematics",
      url: "https://www.khanacademy.org/math",
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

export function calculateRuleOfThree(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;
  
  const proportionType = values.proportionType as string;
  const a = values.valueA as number;
  const b = values.valueB as number;
  const c = values.valueC as number;

  if (a === 0) {
    return {
      values: {},
      formatted: {},
      summary: "Value A cannot be zero",
      isValid: false,
    };
  }

  if (proportionType === "inverse" && c === 0) {
    return {
      values: {},
      formatted: {},
      summary: "Value C cannot be zero for inverse proportion",
      isValid: false,
    };
  }

  let result: number;
  let formula: string;
  let proportion: string;

  if (proportionType === "direct") {
    result = (b * c) / a;
    formula = "X = (B × C) / A = (" + b + " × " + c + ") / " + a;
    proportion = a + " : " + b + " = " + c + " : " + result;
  } else {
    result = (a * b) / c;
    formula = "X = (A × B) / C = (" + a + " × " + b + ") / " + c;
    proportion = a + " × " + b + " = " + c + " × " + result;
  }

  const formatNumber = (n: number): string => {
    if (!isFinite(n)) return "∞";
    if (Number.isInteger(n)) return n.toLocaleString();
    return (Math.round(n * 10000) / 10000).toLocaleString(undefined, { maximumFractionDigits: 4 });
  };

  return {
    values: {
      result,
      proportion,
      formula,
    },
    formatted: {
      result: formatNumber(result),
      proportion,
      formula,
    },
    summary: "X = " + formatNumber(result),
    isValid: true,
  };
}

export default ruleOfThreeCalculatorConfig;
