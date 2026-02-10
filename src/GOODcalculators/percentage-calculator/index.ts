import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

export const percentageCalculatorConfig: CalculatorConfigV4 = {
  id: "percentage-calculator",
  version: "4.0",
  category: "everyday",
  icon: "📊",

  presets: [
    {
      id: "tipCalc",
      icon: "🍽️",
      values: {
        mode: "whatIsXPercentOfY",
        percentValue: 18,
        ofValue: 85,
        isValue: null,
        totalValue: null,
        fromValue: null,
        toValue: null,
      },
    },
    {
      id: "discount",
      icon: "🏷️",
      values: {
        mode: "whatIsXPercentOfY",
        percentValue: 25,
        ofValue: 120,
        isValue: null,
        totalValue: null,
        fromValue: null,
        toValue: null,
      },
    },
    {
      id: "gradeCalc",
      icon: "📝",
      values: {
        mode: "xIsWhatPercentOfY",
        percentValue: null,
        ofValue: 50,
        isValue: 42,
        totalValue: null,
        fromValue: null,
        toValue: null,
      },
    },
  ],

  t: {
    en: {
      name: "Percentage Calculator",
      slug: "percentage-calculator",
      subtitle: "Calculate percentages instantly — find X% of Y, what percent X is of Y, or the percentage change between two numbers.",
      breadcrumb: "Percentage",

      seo: {
        title: "Percentage Calculator - Quick & Free Online Tool",
        description: "Calculate percentages easily. Find what X% of Y is, what percent one number is of another, or the percentage change between values. Free and instant.",
        shortDescription: "Calculate percentages quickly and easily online.",
        keywords: [
          "percentage calculator",
          "percent calculator",
          "calculate percentage",
          "what percent is",
          "percentage change",
          "free percentage calculator",
          "online percent tool",
          "percentage formula",
        ],
      },

      calculator: { yourInformation: "Your Calculation" },
      ui: {
        yourInformation: "Your Calculation",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        mode: {
          label: "Calculation Type",
          helpText: "Choose what you want to calculate",
          options: {
            whatIsXPercentOfY: "What is X% of Y?",
            xIsWhatPercentOfY: "X is what % of Y?",
            percentageChange: "Percentage change",
          },
        },
        percentValue: {
          label: "Percentage",
          helpText: "Enter the percentage value",
        },
        ofValue: {
          label: "Of Value",
          helpText: "The total or base number",
        },
        isValue: {
          label: "Is Value",
          helpText: "The part or portion",
        },
        totalValue: {
          label: "Total",
          helpText: "The total or base number",
        },
        fromValue: {
          label: "From Value",
          helpText: "The original value",
        },
        toValue: {
          label: "To Value",
          helpText: "The new value",
        },
      },

      results: {
        answer: { label: "Answer" },
        formula: { label: "Formula Used" },
        breakdown: { label: "Step-by-Step" },
      },

      presets: {
        tipCalc: { label: "18% Tip on $85", description: "Restaurant tip calculation" },
        discount: { label: "25% Off $120", description: "Shopping discount" },
        gradeCalc: { label: "42 out of 50", description: "Grade percentage" },
      },

      values: {
        "%": "%",
        "of": "of",
        "is": "is",
        "increase": "increase",
        "decrease": "decrease",
      },

      formats: {
        summary: "{answer}",
      },

      infoCards: {
        metrics: {
          title: "Your Result",
          items: [
            { label: "Answer", valueKey: "answer" },
            { label: "Calculation", valueKey: "formula" },
            { label: "Decimal", valueKey: "decimal" },
            { label: "Fraction", valueKey: "fraction" },
          ],
        },
        details: {
          title: "Quick Reference",
          items: [
            { label: "10%", valueKey: "ref10" },
            { label: "25%", valueKey: "ref25" },
            { label: "50%", valueKey: "ref50" },
            { label: "75%", valueKey: "ref75" },
          ],
        },
        tips: {
          title: "Percentage Tips",
          items: [
            "To find 10%, just move the decimal point one place to the left",
            "To find 50%, simply divide the number by 2",
            "To find 25%, divide by 4 or halve the 50% result",
            "Percentage increase = (new - old) / old × 100",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is a Percentage?",
          content: "A percentage is a way of expressing a number as a fraction of 100. The word comes from the Latin 'per centum,' meaning 'by the hundred.' Percentages are used everywhere in daily life — from calculating discounts and tips to understanding interest rates, test scores, and statistics. When you see 25%, it means 25 out of every 100, or one quarter of the total. The concept makes it easy to compare proportions regardless of the actual quantities involved. For example, saying a product is '30% off' immediately communicates the savings without needing to know the original price.",
        },
        howItWorks: {
          title: "How to Calculate Percentages",
          content: "There are three fundamental percentage calculations. First, finding X% of Y: multiply Y by X and divide by 100. For example, 15% of 200 is (200 × 15) / 100 = 30. Second, finding what percent X is of Y: divide X by Y and multiply by 100. For example, 30 is what percent of 200? (30 / 200) × 100 = 15%. Third, percentage change: subtract the old value from the new value, divide by the old value, and multiply by 100. If a price goes from $80 to $100, the change is ((100 - 80) / 80) × 100 = 25% increase. Each formula is simply a rearrangement of the same basic relationship: Part = Percentage × Whole / 100.",
        },
        considerations: {
          title: "Common Percentage Mistakes",
          items: [
            { text: "Percentage points vs. percentages: Going from 10% to 15% is a 5 percentage point increase but a 50% increase", type: "warning" },
            { text: "Order matters for change: A 50% increase followed by a 50% decrease does NOT return to the original value", type: "warning" },
            { text: "Base confusion: '20% of 50' and '50% of 20' give the same result (10), but represent different scenarios", type: "info" },
            { text: "Compounding: Repeated percentage changes compound — 10% growth per year for 7 years roughly doubles the value", type: "info" },
            { text: "Rounding errors: Always use the full decimal in intermediate steps and only round the final answer", type: "info" },
            { text: "Negative percentages: A negative percentage change means a decrease, not an error", type: "info" },
          ],
        },
        categories: {
          title: "Real-World Percentage Uses",
          items: [
            { text: "Shopping: Calculate discounts, sales tax, and final prices to make informed purchase decisions", type: "info" },
            { text: "Finance: Interest rates, returns on investment, inflation rates, and loan APRs are all expressed as percentages", type: "info" },
            { text: "Cooking: Scale recipes up or down by a percentage to serve more or fewer people", type: "info" },
            { text: "Grades: Convert raw scores (42 out of 50) to percentages (84%) for standardized comparison", type: "info" },
            { text: "Tipping: Calculate restaurant tips by finding 15-20% of the pre-tax bill", type: "info" },
            { text: "Statistics: Polls, surveys, and research results rely on percentages to convey findings clearly", type: "info" },
          ],
        },
        examples: {
          title: "Step-by-Step Examples",
          description: "See how common percentage problems are solved",
          examples: [
            {
              title: "25% Discount on $80 Item",
              steps: [
                "Discount = 80 × 25 / 100 = $20",
                "Sale price = $80 - $20 = $60",
              ],
              result: "You save $20, paying $60",
            },
            {
              title: "Score 37 out of 45 on a Test",
              steps: [
                "Percentage = (37 / 45) × 100",
                "Percentage = 0.8222 × 100 = 82.2%",
              ],
              result: "Your score is 82.2%",
            },
          ],
        },
      },

      faqs: [
        { question: "How do I calculate a percentage of a number?", answer: "Multiply the number by the percentage and divide by 100. For example, 20% of 150 = 150 × 20 / 100 = 30." },
        { question: "How do I find what percentage one number is of another?", answer: "Divide the part by the whole and multiply by 100. For example, 45 is what percent of 200? (45 / 200) × 100 = 22.5%." },
        { question: "How do I calculate percentage change?", answer: "Subtract the old value from the new value, divide by the old value, and multiply by 100. Formula: ((New - Old) / Old) × 100." },
        { question: "What is the difference between percentage and percentage points?", answer: "If an interest rate goes from 5% to 8%, it increased by 3 percentage points but by 60% as a percentage change ((8-5)/5 × 100 = 60%)." },
        { question: "How do I convert a fraction to a percentage?", answer: "Divide the numerator by the denominator and multiply by 100. For example, 3/8 = 0.375 × 100 = 37.5%." },
        { question: "How do I reverse a percentage to find the original value?", answer: "If you know the final value after a percentage increase/decrease, divide by (1 + rate/100) for increases or (1 - rate/100) for decreases. Example: $120 after a 20% increase means the original was 120 / 1.20 = $100." },
      ],

      rating: {
        title: "Rate this Calculator",
        share: "Share",
        copied: "Copied!",
        copyLink: "Copy Link",
        clickToRate: "Click to rate",
        youRated: "You rated",
        stars: "stars",
        averageFrom: "average from",
        ratings: "ratings",
      },

      common: { home: "Home", calculators: "Calculators" },

      buttons: {
        calculate: "Calculate",
        reset: "Reset",
        pdf: "PDF",
        csv: "CSV",
        excel: "Excel",
        save: "Save",
        saved: "Saved",
        saving: "Saving...",
      },

      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
  },

  inputs: [
    {
      id: "mode",
      type: "select",
      defaultValue: "whatIsXPercentOfY",
      options: [
        { value: "whatIsXPercentOfY" },
        { value: "xIsWhatPercentOfY" },
        { value: "percentageChange" },
      ],
    },
    {
      id: "percentValue",
      type: "number",
      defaultValue: null,
      placeholder: "15",
      suffix: "%",
      showWhen: { field: "mode", value: "whatIsXPercentOfY" },
    },
    {
      id: "ofValue",
      type: "number",
      defaultValue: null,
      placeholder: "200",
      showWhen: { field: "mode", value: "whatIsXPercentOfY" },
    },
    {
      id: "isValue",
      type: "number",
      defaultValue: null,
      placeholder: "30",
      showWhen: { field: "mode", value: "xIsWhatPercentOfY" },
    },
    {
      id: "totalValue",
      type: "number",
      defaultValue: null,
      placeholder: "200",
      showWhen: { field: "mode", value: "xIsWhatPercentOfY" },
    },
    {
      id: "fromValue",
      type: "number",
      defaultValue: null,
      placeholder: "80",
      showWhen: { field: "mode", value: "percentageChange" },
    },
    {
      id: "toValue",
      type: "number",
      defaultValue: null,
      placeholder: "100",
      showWhen: { field: "mode", value: "percentageChange" },
    },
  ],

  inputGroups: [],

  results: [
    { id: "answer", type: "primary", format: "text" },
    { id: "formula", type: "secondary", format: "text" },
    { id: "breakdown", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "📊", itemCount: 4 },
    { id: "details", type: "list", icon: "🔢", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    {
      authors: "Khan Academy",
      year: "2024",
      title: "Intro to Percentages",
      source: "Khan Academy",
      url: "https://www.khanacademy.org/math/pre-algebra/pre-algebra-ratios-rates/pre-algebra-percent-problems/v/finding-a-percentage",
    },
    {
      authors: "National Center for Education Statistics",
      year: "2024",
      title: "Mathematical Literacy: Understanding Percentages",
      source: "NCES",
      url: "https://nces.ed.gov/",
    },
  ],

  hero: {
    icon: "📊",
  },

  sidebar: {},

  features: {},

  relatedCalculators: ["tip-calculator", "discount-calculator", "grade-calculator", "gpa-calculator"],

  ads: {},
};

export function calculatePercentageCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const mode = values.mode as string;

  // Mode 1: What is X% of Y?
  if (mode === "whatIsXPercentOfY") {
    const percent = values.percentValue as number | null;
    const ofVal = values.ofValue as number | null;

    if (percent === null || percent === undefined || ofVal === null || ofVal === undefined) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }

    const answer = (ofVal * percent) / 100;
    const pct = v["%"] || "%";

    // Quick reference values
    const ref10 = (ofVal * 10) / 100;
    const ref25 = (ofVal * 25) / 100;
    const ref50 = (ofVal * 50) / 100;
    const ref75 = (ofVal * 75) / 100;

    return {
      values: { answer, decimal: answer, ref10, ref25, ref50, ref75 },
      formatted: {
        answer: `${fmtNum(answer)}`,
        formula: `${percent}${pct} of ${fmtNum(ofVal)} = ${fmtNum(answer)}`,
        breakdown: `${fmtNum(ofVal)} × ${percent} / 100 = ${fmtNum(answer)}`,
        decimal: `${answer.toFixed(4)}`,
        fraction: simpleFraction(percent, 100),
        ref10: `${fmtNum(ref10)}`,
        ref25: `${fmtNum(ref25)}`,
        ref50: `${fmtNum(ref50)}`,
        ref75: `${fmtNum(ref75)}`,
      },
      summary:
        f.summary?.replace("{answer}", `${percent}% of ${fmtNum(ofVal)} = ${fmtNum(answer)}`) ||
        `${percent}% of ${fmtNum(ofVal)} = ${fmtNum(answer)}`,
      isValid: true,
    };
  }

  // Mode 2: X is what % of Y?
  if (mode === "xIsWhatPercentOfY") {
    const isVal = values.isValue as number | null;
    const totalVal = values.totalValue as number | null;

    if (isVal === null || isVal === undefined || totalVal === null || totalVal === undefined || totalVal === 0) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }

    const answer = (isVal / totalVal) * 100;
    const pct = v["%"] || "%";

    const ref10 = (totalVal * 10) / 100;
    const ref25 = (totalVal * 25) / 100;
    const ref50 = (totalVal * 50) / 100;
    const ref75 = (totalVal * 75) / 100;

    return {
      values: { answer, decimal: isVal / totalVal, ref10, ref25, ref50, ref75 },
      formatted: {
        answer: `${answer.toFixed(2)}${pct}`,
        formula: `${fmtNum(isVal)} is ${answer.toFixed(2)}${pct} of ${fmtNum(totalVal)}`,
        breakdown: `(${fmtNum(isVal)} / ${fmtNum(totalVal)}) × 100 = ${answer.toFixed(2)}${pct}`,
        decimal: `${(isVal / totalVal).toFixed(4)}`,
        fraction: simpleFraction(Math.round(answer * 100), 10000),
        ref10: `${fmtNum(ref10)}`,
        ref25: `${fmtNum(ref25)}`,
        ref50: `${fmtNum(ref50)}`,
        ref75: `${fmtNum(ref75)}`,
      },
      summary:
        f.summary?.replace("{answer}", `${fmtNum(isVal)} is ${answer.toFixed(2)}% of ${fmtNum(totalVal)}`) ||
        `${fmtNum(isVal)} is ${answer.toFixed(2)}% of ${fmtNum(totalVal)}`,
      isValid: true,
    };
  }

  // Mode 3: Percentage change
  if (mode === "percentageChange") {
    const fromVal = values.fromValue as number | null;
    const toVal = values.toValue as number | null;

    if (fromVal === null || fromVal === undefined || toVal === null || toVal === undefined || fromVal === 0) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }

    const change = ((toVal - fromVal) / Math.abs(fromVal)) * 100;
    const diff = toVal - fromVal;
    const pct = v["%"] || "%";
    const direction = change >= 0 ? (v["increase"] || "increase") : (v["decrease"] || "decrease");

    const ref10 = fromVal * 0.1;
    const ref25 = fromVal * 0.25;
    const ref50 = fromVal * 0.5;
    const ref75 = fromVal * 0.75;

    return {
      values: { answer: change, decimal: change / 100, ref10, ref25, ref50, ref75 },
      formatted: {
        answer: `${Math.abs(change).toFixed(2)}${pct} ${direction}`,
        formula: `${fmtNum(fromVal)} → ${fmtNum(toVal)} = ${change >= 0 ? "+" : ""}${change.toFixed(2)}${pct}`,
        breakdown: `((${fmtNum(toVal)} - ${fmtNum(fromVal)}) / |${fmtNum(fromVal)}|) × 100 = ${change.toFixed(2)}${pct}`,
        decimal: `${(change / 100).toFixed(4)}`,
        fraction: `${change >= 0 ? "+" : ""}${fmtNum(diff)}`,
        ref10: `${fmtNum(fromVal + ref10)}`,
        ref25: `${fmtNum(fromVal + ref25)}`,
        ref50: `${fmtNum(fromVal + ref50)}`,
        ref75: `${fmtNum(fromVal + ref75)}`,
      },
      summary:
        f.summary?.replace("{answer}", `${Math.abs(change).toFixed(2)}% ${direction} from ${fmtNum(fromVal)} to ${fmtNum(toVal)}`) ||
        `${Math.abs(change).toFixed(2)}% ${direction} from ${fmtNum(fromVal)} to ${fmtNum(toVal)}`,
      isValid: true,
    };
  }

  return { values: {}, formatted: {}, summary: "", isValid: false };
}

// --- Helper functions ---

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) < 0.001) return val.toExponential(2);
  if (Math.abs(val) < 1000) {
    const s = val.toFixed(4).replace(/\.?0+$/, "");
    return s;
  }
  return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

function simpleFraction(num: number, den: number): string {
  const g = gcd(Math.abs(Math.round(num)), Math.abs(Math.round(den)));
  if (g === 0) return `${num}/${den}`;
  return `${Math.round(num) / g}/${Math.round(den) / g}`;
}

function gcd(a: number, b: number): number {
  if (b === 0) return a;
  return gcd(b, a % b);
}

export default percentageCalculatorConfig;
