import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// PERCENTAGE CALCULATOR V3
// =============================================================================
// Features that beat competitors:
// ✓ 8 Different calculation modes in one calculator
// ✓ Real-world examples for each mode
// ✓ Instant results as you type
// ✓ Reverse calculations
// ✓ Common quick calculations
// ✓ Fraction to percentage converter
// ✓ Step-by-step formula display
// =============================================================================

export const percentageCalculatorConfig: CalculatorConfigV3 = {
  id: "percentage-calculator",
  slug: "percentage-calculator",
  name: "Percentage Calculator",
  category: "everyday",
  icon: "%",

  seo: {
    title: "Percentage Calculator - All Percentage Calculations in One Tool",
    description: "Free percentage calculator for all your needs: find percentages, calculate increase/decrease, percentage difference, tip calculator, discount calculator, and more. 8 calculators in one.",
    shortDescription: "Calculate any percentage instantly",
    keywords: ["percentage calculator", "percent calculator", "percentage increase", "percentage decrease", "discount calculator", "tip calculator", "percentage difference"],
  },

  hero: { badge: "Everyday", rating: { average: 4.8, count: 520000 } },
  unitSystem: { enabled: false, default: "imperial", options: [] },

  inputs: [
    // ═══════════════════════════════════════════════════════════════════════
    // CALCULATION MODE SELECTOR
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: "calculationMode",
      type: "select",
      label: "What do you want to calculate?",
      required: true,
      defaultValue: "findPercent",
      options: [
        { value: "findPercent", label: "🔢 What is X% of Y?" },
        { value: "whatPercent", label: "❓ X is what percent of Y?" },
        { value: "percentIncrease", label: "📈 Percentage Increase" },
        { value: "percentDecrease", label: "📉 Percentage Decrease" },
        { value: "percentDifference", label: "↔️ Percentage Difference" },
        { value: "addPercent", label: "➕ Add X% to Y" },
        { value: "subtractPercent", label: "➖ Subtract X% from Y" },
        { value: "reversePercent", label: "🔄 Find Original (before %)" },
      ],
    },
    // ═══════════════════════════════════════════════════════════════════════
    // MODE: What is X% of Y?
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: "percentValue",
      type: "number",
      label: "Percentage",
      required: false,
      defaultValue: 15,
      min: 0, max: 100000, step: 0.1,
      suffix: "%",
      showWhen: { field: "calculationMode", value: ["findPercent", "addPercent", "subtractPercent"] },
    },
    {
      id: "baseValue",
      type: "number",
      label: "Of this number",
      required: false,
      defaultValue: 200,
      min: 0, max: 999999999, step: 1,
      showWhen: { field: "calculationMode", value: ["findPercent", "addPercent", "subtractPercent"] },
    },
    // ═══════════════════════════════════════════════════════════════════════
    // MODE: X is what percent of Y?
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: "partValue",
      type: "number",
      label: "This number",
      required: false,
      defaultValue: 25,
      min: 0, max: 999999999, step: 1,
      showWhen: { field: "calculationMode", value: "whatPercent" },
    },
    {
      id: "wholeValue",
      type: "number",
      label: "Is what % of",
      required: false,
      defaultValue: 100,
      min: 0, max: 999999999, step: 1,
      showWhen: { field: "calculationMode", value: "whatPercent" },
    },
    // ═══════════════════════════════════════════════════════════════════════
    // MODE: Percentage Increase/Decrease
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: "fromValue",
      type: "number",
      label: "From (original value)",
      required: false,
      defaultValue: 100,
      min: 0, max: 999999999, step: 1,
      showWhen: { field: "calculationMode", value: ["percentIncrease", "percentDecrease", "percentDifference"] },
    },
    {
      id: "toValue",
      type: "number",
      label: "To (new value)",
      required: false,
      defaultValue: 125,
      min: 0, max: 999999999, step: 1,
      showWhen: { field: "calculationMode", value: ["percentIncrease", "percentDecrease", "percentDifference"] },
    },
    // ═══════════════════════════════════════════════════════════════════════
    // MODE: Reverse Percentage (find original)
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: "finalValue",
      type: "number",
      label: "Final value (after % change)",
      required: false,
      defaultValue: 115,
      min: 0, max: 999999999, step: 1,
      showWhen: { field: "calculationMode", value: "reversePercent" },
    },
    {
      id: "percentChange",
      type: "number",
      label: "Percentage that was added/removed",
      required: false,
      defaultValue: 15,
      min: -100, max: 100000, step: 0.1,
      suffix: "%",
      showWhen: { field: "calculationMode", value: "reversePercent" },
      helpText: "Positive for increase, negative for decrease",
    },
  ],

  inputGroups: [
    // ═══════════════════════════════════════════════════════════════════════
    // QUICK CALCULATIONS
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: "quickCalcSection",
      title: "Quick Calculations",
      icon: "⚡",
      collapsible: true,
      defaultCollapsed: true,
      inputs: [
        {
          id: "quickNumber",
          type: "number",
          label: "Enter a number",
          required: false,
          defaultValue: 100,
          min: 0, max: 999999999, step: 1,
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════════════
    // FRACTION TO PERCENT
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: "fractionSection",
      title: "Fraction to Percentage",
      icon: "🔢",
      collapsible: true,
      defaultCollapsed: true,
      inputs: [
        {
          id: "numerator",
          type: "number",
          label: "Numerator (top)",
          required: false,
          defaultValue: 3,
          min: 0, max: 999999, step: 1,
        },
        {
          id: "denominator",
          type: "number",
          label: "Denominator (bottom)",
          required: false,
          defaultValue: 4,
          min: 1, max: 999999, step: 1,
        },
      ],
    },
  ],

  results: [
    { id: "mainResult", type: "primary", label: "Result", format: "text" },
    { id: "formula", type: "secondary", label: "Formula Used", format: "text" },
    { id: "calculation", type: "secondary", label: "Calculation", format: "text" },
    { id: "quickResults", type: "secondary", label: "Quick Percentages", format: "text" },
    { id: "fractionResult", type: "secondary", label: "Fraction to %", format: "text" },
  ],

  infoCards: [
    {
      id: "commonPercentages",
      title: "Common Percentages",
      icon: "📊",
      type: "list",
      items: [
        { label: "10%", value: "Divide by 10", color: "blue" },
        { label: "25%", value: "Divide by 4", color: "green" },
        { label: "50%", value: "Divide by 2", color: "amber" },
        { label: "75%", value: "= 50% + 25%", color: "slate" },
      ],
    },
    {
      id: "realWorldExamples",
      title: "Real-World Uses",
      icon: "🌍",
      type: "horizontal",
      items: [
        { label: "Tips: 15-20% of bill" },
        { label: "Sales Tax: 5-10% varies by state" },
        { label: "Discounts: 10-50% off" },
        { label: "Interest: APY on savings" },
      ],
    },
  ],

  referenceData: [
    {
      id: "percentToDecimal",
      title: "Percentage ↔ Decimal",
      icon: "🔄",
      columns: 2,
      items: [
        { label: "10%", value: "0.10" },
        { label: "25%", value: "0.25" },
        { label: "33.3%", value: "0.333" },
        { label: "50%", value: "0.50" },
        { label: "75%", value: "0.75" },
        { label: "100%", value: "1.00" },
      ],
    },
  ],

  educationSections: [
    {
      id: "percentageTypes",
      type: "cards",
      title: "8 Ways to Calculate Percentages",
      icon: "🧮",
      columns: 2,
      cards: [
        { title: "What is X% of Y?", description: "Find a percentage of any number. Example: 15% of 200 = 30", icon: "🔢" },
        { title: "X is what % of Y?", description: "Find what percentage one number is of another. Example: 25 is 25% of 100", icon: "❓" },
        { title: "% Increase", description: "How much did something grow? Example: 100 to 125 = 25% increase", icon: "📈" },
        { title: "% Decrease", description: "How much did something shrink? Example: 100 to 80 = 20% decrease", icon: "📉" },
        { title: "% Difference", description: "Compare two values. Uses average as base.", icon: "↔️" },
        { title: "Add Percentage", description: "Add X% to a number. Example: 100 + 20% = 120", icon: "➕" },
        { title: "Subtract Percentage", description: "Remove X% from a number. Example: 100 - 20% = 80", icon: "➖" },
        { title: "Find Original", description: "Reverse calculation. If 115 is after 15% increase, original was 100", icon: "🔄" },
      ],
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Tips",
      icon: "💡",
      items: [
        { text: "Percentage increase and decrease are NOT reversible: 20% off then 20% on ≠ original", type: "warning" },
        { text: "To find 10%, just move the decimal one place left: 250 → 25", type: "info" },
        { text: "To find 1%, divide by 100: 350 → 3.5", type: "info" },
        { text: "Percentage difference uses the average as the base, not either original value", type: "info" },
        { text: "When calculating tips, round up for easier math and better service!", type: "info" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculations",
      icon: "📝",
      description: "Common percentage problems solved step by step",
      columns: 2,
      examples: [
        {
          title: "Finding a Percentage",
          steps: [
            "Question: What is 15% of 200?",
            "Convert: 15% = 15/100 = 0.15",
            "Multiply: 200 × 0.15 = 30"
          ],
          result: "15% of 200 = 30"
        },
        {
          title: "Percentage Increase",
          steps: [
            "Question: 80 to 100 = ?% increase",
            "Difference: 100 - 80 = 20",
            "Divide by original: 20 ÷ 80 = 0.25",
            "Convert: 0.25 × 100 = 25%"
          ],
          result: "25% increase"
        },
      ],
    },
    {
      id: "percentageFormulas",
      type: "prose",
      title: "Percentage Formulas Explained",
      content: "A percentage is a way to express a number as a fraction of 100. The word 'percent' literally means 'per hundred.' To convert a percentage to a decimal, divide by 100 (or move the decimal point two places left). To convert a decimal to a percentage, multiply by 100. The basic percentage formula is: (Part ÷ Whole) × 100 = Percentage. For percentage change: ((New - Old) ÷ Old) × 100. For percentage difference: (|A - B| ÷ ((A + B) ÷ 2)) × 100, which uses the average of both values as the base.",
    },
    {
      id: "realWorldApplications",
      type: "prose",
      title: "Real-World Applications",
      content: "Percentages are everywhere in daily life. When shopping, discounts are shown as percentages - a 25% off sale means you pay 75% of the original price. Restaurant tips are typically 15-20% of the bill before tax. Credit card interest rates (APR) tell you what percentage of your balance you'll pay annually. Investment returns are measured as percentage gains or losses. Tax rates are percentages of your income. Understanding percentages helps you make better financial decisions, from comparing loans to evaluating investment performance.",
    },
    {
      id: "commonMistakes",
      type: "prose",
      title: "Common Percentage Mistakes to Avoid",
      content: "The most common mistake is thinking percentage increases and decreases are reversible. If a $100 item goes on sale for 20% off ($80), then the price increases by 20%, it becomes $96 - not $100. This is because the 20% increase is calculated on the new lower price. Another mistake is confusing percentage points with percentages. If interest rates go from 5% to 6%, that's a 1 percentage point increase but a 20% relative increase. When comparing values, be careful whether you're using percentage difference (symmetric) or percentage change (directional from one specific value).",
    },
  ],

  faqs: [
    { question: "How do I calculate percentage in my head?", answer: "For 10%, move the decimal one place left (250 becomes 25). For 1%, divide by 100 (350 becomes 3.5). For other percentages, combine these: 15% = 10% + 5% (half of 10%). For 25%, divide by 4. For 50%, divide by 2. Practice makes perfect!" },
    { question: "What's the difference between percentage change and percentage difference?", answer: "Percentage change has a direction - it measures increase or decrease FROM a specific value. Percentage difference is symmetric - it measures how different two values are using their average as the base. Use change when one value is 'before' and one is 'after'; use difference when comparing two values without a time element." },
    { question: "Why doesn't a 20% increase followed by 20% decrease give the original number?", answer: "Because the second percentage is calculated on a different base. If $100 increases by 20%, it becomes $120. Then 20% of $120 is $24, so decreasing by 20% gives $96, not $100. The percentages are the same, but they're calculated on different amounts." },
    { question: "How do I find the original price before a discount?", answer: "If you know the sale price and discount percentage, divide the sale price by (1 - discount rate as decimal). For example, if something costs $80 after 20% off: $80 ÷ (1 - 0.20) = $80 ÷ 0.80 = $100 original price." },
    { question: "How do I calculate a tip quickly?", answer: "For 20%, calculate 10% (move decimal left) and double it. For 15%, calculate 10% plus half of that. For example, on a $85 bill: 10% = $8.50, so 20% = $17 and 15% = $8.50 + $4.25 = $12.75. Round up for easier math!" },
    { question: "What's the formula for percentage increase?", answer: "((New Value - Original Value) ÷ Original Value) × 100. For example, if a stock goes from $50 to $65: (65 - 50) ÷ 50 × 100 = 15 ÷ 50 × 100 = 30% increase." },
  ],

  references: [
    { authors: "Khan Academy", year: "2024", title: "Percentages: Meaning, Formula & Applications", source: "Khan Academy Math", url: "https://www.khanacademy.org/math/pre-algebra/pre-algebra-ratios-rates/pre-algebra-percent-problems" },
    { authors: "Math is Fun", year: "2024", title: "Percentage Calculator and Formulas", source: "MathIsFun.com", url: "https://www.mathsisfun.com/percentage.html" },
  ],

  detailedTable: {
    id: "commonPercentages",
    buttonLabel: "View Common Percentages Table",
    buttonIcon: "📊",
    modalTitle: "Common Percentage Reference",
    columns: [
      { id: "percent", label: "%", align: "center" },
      { id: "decimal", label: "Decimal", align: "center" },
      { id: "fraction", label: "Fraction", align: "center" },
      { id: "of100", label: "Of 100", align: "center", highlight: true },
      { id: "tip", label: "Tip Example", align: "left" },
    ],
  },

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "everyday" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["tip-calculator", "discount-calculator", "margin-calculator", "fraction-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// =============================================================================
// CALCULATION FUNCTION
// =============================================================================
export function calculatePercentage(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;

  const mode = (values.calculationMode as string) || "findPercent";
  
  let mainResult = "";
  let formula = "";
  let calculation = "";

  switch (mode) {
    case "findPercent": {
      // What is X% of Y?
      const percent = (values.percentValue as number) || 0;
      const base = (values.baseValue as number) || 0;
      const result = (percent / 100) * base;
      mainResult = `${result.toLocaleString(undefined, { maximumFractionDigits: 4 })}`;
      formula = "Result = (Percentage ÷ 100) × Number";
      calculation = `(${percent} ÷ 100) × ${base} = ${result.toLocaleString(undefined, { maximumFractionDigits: 4 })}`;
      break;
    }

    case "whatPercent": {
      // X is what percent of Y?
      const part = (values.partValue as number) || 0;
      const whole = (values.wholeValue as number) || 1;
      const percent = (part / whole) * 100;
      mainResult = `${percent.toLocaleString(undefined, { maximumFractionDigits: 2 })}%`;
      formula = "Percentage = (Part ÷ Whole) × 100";
      calculation = `(${part} ÷ ${whole}) × 100 = ${percent.toLocaleString(undefined, { maximumFractionDigits: 2 })}%`;
      break;
    }

    case "percentIncrease": {
      // Percentage Increase
      const from = (values.fromValue as number) || 1;
      const to = (values.toValue as number) || 0;
      const increase = ((to - from) / Math.abs(from)) * 100;
      mainResult = `${increase >= 0 ? "+" : ""}${increase.toLocaleString(undefined, { maximumFractionDigits: 2 })}%`;
      formula = "Increase = ((New - Old) ÷ |Old|) × 100";
      calculation = `((${to} - ${from}) ÷ ${Math.abs(from)}) × 100 = ${increase.toLocaleString(undefined, { maximumFractionDigits: 2 })}%`;
      break;
    }

    case "percentDecrease": {
      // Percentage Decrease
      const from = (values.fromValue as number) || 1;
      const to = (values.toValue as number) || 0;
      const decrease = ((from - to) / Math.abs(from)) * 100;
      mainResult = `${decrease.toLocaleString(undefined, { maximumFractionDigits: 2 })}%`;
      formula = "Decrease = ((Old - New) ÷ |Old|) × 100";
      calculation = `((${from} - ${to}) ÷ ${Math.abs(from)}) × 100 = ${decrease.toLocaleString(undefined, { maximumFractionDigits: 2 })}%`;
      break;
    }

    case "percentDifference": {
      // Percentage Difference (uses average as base)
      const a = (values.fromValue as number) || 0;
      const b = (values.toValue as number) || 0;
      const avg = (a + b) / 2;
      const diff = avg !== 0 ? (Math.abs(a - b) / avg) * 100 : 0;
      mainResult = `${diff.toLocaleString(undefined, { maximumFractionDigits: 2 })}%`;
      formula = "Difference = |A - B| ÷ ((A + B) ÷ 2) × 100";
      calculation = `|${a} - ${b}| ÷ ((${a} + ${b}) ÷ 2) × 100 = ${diff.toLocaleString(undefined, { maximumFractionDigits: 2 })}%`;
      break;
    }

    case "addPercent": {
      // Add X% to Y
      const percent = (values.percentValue as number) || 0;
      const base = (values.baseValue as number) || 0;
      const result = base * (1 + percent / 100);
      mainResult = `${result.toLocaleString(undefined, { maximumFractionDigits: 4 })}`;
      formula = "Result = Number × (1 + Percentage ÷ 100)";
      calculation = `${base} × (1 + ${percent} ÷ 100) = ${base} × ${(1 + percent/100).toFixed(4)} = ${result.toLocaleString(undefined, { maximumFractionDigits: 4 })}`;
      break;
    }

    case "subtractPercent": {
      // Subtract X% from Y
      const percent = (values.percentValue as number) || 0;
      const base = (values.baseValue as number) || 0;
      const result = base * (1 - percent / 100);
      mainResult = `${result.toLocaleString(undefined, { maximumFractionDigits: 4 })}`;
      formula = "Result = Number × (1 - Percentage ÷ 100)";
      calculation = `${base} × (1 - ${percent} ÷ 100) = ${base} × ${(1 - percent/100).toFixed(4)} = ${result.toLocaleString(undefined, { maximumFractionDigits: 4 })}`;
      break;
    }

    case "reversePercent": {
      // Find original before percentage change
      const final = (values.finalValue as number) || 0;
      const change = (values.percentChange as number) || 0;
      const original = final / (1 + change / 100);
      mainResult = `${original.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
      formula = "Original = Final ÷ (1 + Change ÷ 100)";
      calculation = `${final} ÷ (1 + ${change} ÷ 100) = ${final} ÷ ${(1 + change/100).toFixed(4)} = ${original.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
      break;
    }
  }

  // Quick calculations for any number
  const quickNum = (values.quickNumber as number) || 100;
  const quickResults = `10%=${(quickNum*0.1).toLocaleString()}, 15%=${(quickNum*0.15).toLocaleString()}, 20%=${(quickNum*0.2).toLocaleString()}, 25%=${(quickNum*0.25).toLocaleString()}, 50%=${(quickNum*0.5).toLocaleString()}`;

  // Fraction to percentage
  const numerator = (values.numerator as number) || 1;
  const denominator = (values.denominator as number) || 1;
  const fractionPercent = (numerator / denominator) * 100;
  const fractionResult = `${numerator}/${denominator} = ${fractionPercent.toLocaleString(undefined, { maximumFractionDigits: 2 })}%`;

  // Common percentages table
  const tableData = [
    { percent: "1%", decimal: "0.01", fraction: "1/100", of100: "1", tip: "$50 bill → $0.50" },
    { percent: "5%", decimal: "0.05", fraction: "1/20", of100: "5", tip: "$50 bill → $2.50" },
    { percent: "10%", decimal: "0.10", fraction: "1/10", of100: "10", tip: "$50 bill → $5.00" },
    { percent: "15%", decimal: "0.15", fraction: "3/20", of100: "15", tip: "$50 bill → $7.50" },
    { percent: "20%", decimal: "0.20", fraction: "1/5", of100: "20", tip: "$50 bill → $10.00" },
    { percent: "25%", decimal: "0.25", fraction: "1/4", of100: "25", tip: "$50 bill → $12.50" },
    { percent: "33.3%", decimal: "0.333", fraction: "1/3", of100: "33.3", tip: "$50 bill → $16.65" },
    { percent: "50%", decimal: "0.50", fraction: "1/2", of100: "50", tip: "$50 bill → $25.00" },
    { percent: "75%", decimal: "0.75", fraction: "3/4", of100: "75", tip: "$50 bill → $37.50" },
    { percent: "100%", decimal: "1.00", fraction: "1/1", of100: "100", tip: "$50 bill → $50.00" },
  ];

  return {
    values: {
      mainResult,
      quickNum,
      fractionPercent,
    },
    formatted: {
      mainResult,
      formula,
      calculation,
      quickResults,
      fractionResult,
    },
    summary: mainResult,
    isValid: true,
    metadata: { tableData, mode },
  };
}

export default percentageCalculatorConfig;
