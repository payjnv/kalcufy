import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// BMR CALCULATOR V3 CONFIG
// =============================================================================
// Mifflin-St Jeor (1990) - Recommended by American Dietetic Association
// Harris-Benedict (1918, revised 1984) - Classic equation
// Katch-McArdle - Uses lean body mass for athletes
// =============================================================================

export const bmrCalculatorConfig: CalculatorConfigV3 = {
  id: "bmr-calculator",
  slug: "bmr-calculator",
  name: "BMR Calculator",
  category: "health",
  icon: "🔥",

  // ═══════════════════════════════════════════════════════════════════════════
  // SEO
  // ═══════════════════════════════════════════════════════════════════════════
  seo: {
    title: "BMR Calculator - Basal Metabolic Rate & TDEE Calculator",
    description: "Free BMR calculator using Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle formulas. Calculate your basal metabolic rate and total daily energy expenditure (TDEE) to understand your calorie needs.",
    shortDescription: "Calculate your basal metabolic rate and daily calories",
    keywords: [
      "BMR calculator",
      "basal metabolic rate",
      "TDEE calculator",
      "calorie calculator",
      "Mifflin St Jeor",
      "Harris Benedict",
      "Katch McArdle",
      "metabolism calculator",
      "resting metabolic rate",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HERO
  // ═══════════════════════════════════════════════════════════════════════════
  hero: {
    badge: "Health",
    rating: { average: 4.9, count: 52300 },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UNIT SYSTEM
  // ═══════════════════════════════════════════════════════════════════════════
  unitSystem: {
    enabled: true,
    default: "metric",
    options: [
      { id: "metric", label: "Metric (kg, cm)" },
      { id: "imperial", label: "Imperial (lb, in)" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════════════════
  inputs: [
    {
      id: "gender",
      type: "radio",
      label: "Biological Sex",
      required: true,
      defaultValue: "male",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
    },
    {
      id: "age",
      type: "slider",
      label: "Age",
      required: true,
      defaultValue: 30,
      min: 15,
      max: 80,
      step: 1,
      suffix: "years",
    },
    {
      id: "weight",
      type: "number",
      label: "Weight",
      required: true,
      defaultValue: 70,
      min: 30,
      max: 300,
      step: 0.1,
      units: {
        metric: { suffix: "kg", default: true },
        imperial: { suffix: "lb", default: true },
      },
    },
    {
      id: "height",
      type: "number",
      label: "Height",
      required: true,
      defaultValue: 170,
      min: 100,
      max: 250,
      step: 1,
      units: {
        metric: { suffix: "cm", default: true },
        imperial: { suffix: "in", default: true },
      },
    },
    {
      id: "formula",
      type: "select",
      label: "BMR Formula",
      required: true,
      defaultValue: "mifflin",
      options: [
        { value: "mifflin", label: "Mifflin-St Jeor (Recommended)" },
        { value: "harris", label: "Harris-Benedict (Revised)" },
        { value: "katch", label: "Katch-McArdle (Requires Body Fat %)" },
      ],
      helpText: "Mifflin-St Jeor is most accurate for general population",
    },
    {
      id: "bodyFatPercent",
      type: "slider",
      label: "Body Fat Percentage",
      required: false,
      defaultValue: 20,
      min: 5,
      max: 50,
      step: 1,
      suffix: "%",
      helpText: "Required for Katch-McArdle formula",
      showWhen: { field: "formula", value: "katch" },
    },
    {
      id: "activityLevel",
      type: "select",
      label: "Activity Level",
      required: true,
      defaultValue: "1.2",
      options: [
        { value: "1.2", label: "Sedentary (little or no exercise)" },
        { value: "1.375", label: "Lightly Active (1-3 days/week)" },
        { value: "1.55", label: "Moderately Active (3-5 days/week)" },
        { value: "1.725", label: "Very Active (6-7 days/week)" },
        { value: "1.9", label: "Extra Active (athlete, physical job)" },
      ],
      helpText: "Used to calculate Total Daily Energy Expenditure (TDEE)",
    },
  ],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════════════════
  results: [
    {
      id: "bmr",
      type: "primary",
      label: "Basal Metabolic Rate",
      format: "number",
      suffix: " kcal/day",
    },
    {
      id: "tdee",
      type: "secondary",
      label: "TDEE (Maintenance)",
      format: "number",
      suffix: " kcal/day",
    },
    {
      id: "weightLoss",
      type: "secondary",
      label: "Weight Loss (-500 kcal)",
      format: "number",
      suffix: " kcal/day",
    },
    {
      id: "weightGain",
      type: "secondary",
      label: "Weight Gain (+500 kcal)",
      format: "number",
      suffix: " kcal/day",
    },
    {
      id: "bmrMifflin",
      type: "secondary",
      label: "Mifflin-St Jeor",
      format: "number",
      suffix: " kcal",
    },
    {
      id: "bmrHarris",
      type: "secondary",
      label: "Harris-Benedict",
      format: "number",
      suffix: " kcal",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // INFO CARDS
  // ═══════════════════════════════════════════════════════════════════════════
  infoCards: [
    {
      id: "formulaComparison",
      title: "BMR Formula Comparison",
      icon: "📊",
      type: "list",
      items: [
        { label: "Mifflin-St Jeor", value: "Most accurate (82%)", color: "green" },
        { label: "Harris-Benedict", value: "Classic, tends to overestimate", color: "blue" },
        { label: "Katch-McArdle", value: "Best for athletes", color: "purple" },
      ],
    },
    {
      id: "quickTips",
      title: "Metabolism Tips",
      icon: "💡",
      type: "horizontal",
      items: [
        { label: "Build muscle to increase BMR" },
        { label: "Don't eat below your BMR" },
        { label: "Protein has highest thermic effect" },
        { label: "Sleep affects metabolism significantly" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCE DATA
  // ═══════════════════════════════════════════════════════════════════════════
  referenceData: [
    {
      id: "activityMultipliers",
      title: "Activity Level Multipliers",
      icon: "🏃",
      columns: 2,
      items: [
        { label: "Sedentary", value: "BMR × 1.2" },
        { label: "Light Activity", value: "BMR × 1.375" },
        { label: "Moderate Activity", value: "BMR × 1.55" },
        { label: "Very Active", value: "BMR × 1.725" },
        { label: "Extra Active", value: "BMR × 1.9" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  educationSections: [
    // BMR Formulas
    {
      id: "formulas",
      type: "cards",
      title: "BMR Formulas Explained",
      icon: "📐",
      columns: 3,
      cards: [
        {
          title: "Mifflin-St Jeor (1990)",
          description: "Most accurate for modern lifestyles. Recommended by ADA. Predicts BMR within 10% for 82% of people. Best for general population.",
          icon: "⭐",
        },
        {
          title: "Harris-Benedict (1918)",
          description: "Classic equation revised in 1984. Widely used but tends to overestimate by 5%. Still accurate for many people.",
          icon: "📜",
        },
        {
          title: "Katch-McArdle",
          description: "Uses lean body mass instead of total weight. Most accurate for athletes and those who know their body fat percentage.",
          icon: "💪",
        },
      ],
    },
    // Factors Affecting BMR
    {
      id: "factors",
      type: "cards",
      title: "Factors That Affect Your BMR",
      icon: "⚡",
      columns: 2,
      cards: [
        {
          title: "Muscle Mass",
          description: "Muscle burns 6 kcal/lb at rest vs 2 kcal/lb for fat. More muscle = higher BMR. Strength training is key.",
          icon: "💪",
        },
        {
          title: "Age",
          description: "BMR decreases ~2% per decade after age 20, largely due to muscle loss. Staying active helps maintain BMR.",
          icon: "📅",
        },
        {
          title: "Hormones",
          description: "Thyroid hormones directly regulate metabolism. Low thyroid (hypothyroidism) can significantly reduce BMR.",
          icon: "🧬",
        },
        {
          title: "Body Size",
          description: "Larger bodies require more energy to maintain. Height and weight both increase BMR proportionally.",
          icon: "📏",
        },
      ],
    },
    // REQUIRED: Important Considerations
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        {
          text: "BMR formulas are estimates with ±10-15% error. Individual metabolism varies based on genetics, body composition, and hormones.",
          type: "warning",
        },
        {
          text: "Never eat below your BMR for extended periods. This can slow metabolism, cause muscle loss, and trigger hormonal issues.",
          type: "warning",
        },
        {
          text: "Mifflin-St Jeor is recommended by the American Dietetic Association as the most accurate formula for most people.",
          type: "info",
        },
        {
          text: "If you know your body fat percentage, Katch-McArdle is more accurate because it accounts for lean mass directly.",
          type: "info",
        },
        {
          text: "TDEE (maintenance calories) = BMR × Activity Factor. This is the number you need to maintain your current weight.",
          type: "info",
        },
        {
          text: "For weight loss, a deficit of 500 kcal/day = ~1 lb/week loss. Never exceed 1000 kcal deficit without medical supervision.",
          type: "warning",
        },
      ],
    },
    // REQUIRED: Example Calculation
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example BMR Calculation",
      icon: "🧮",
      description: "30-year-old male, 70 kg (154 lb), 175 cm (5'9\")",
      columns: 2,
      examples: [
        {
          title: "Mifflin-St Jeor Formula",
          steps: [
            "Men: (10 × weight) + (6.25 × height) - (5 × age) + 5",
            "BMR = (10 × 70) + (6.25 × 175) - (5 × 30) + 5",
            "BMR = 700 + 1093.75 - 150 + 5",
          ],
          result: "BMR = 1,649 kcal/day",
        },
        {
          title: "Calculate TDEE",
          steps: [
            "BMR: 1,649 kcal",
            "Activity: Moderately Active (×1.55)",
            "TDEE = 1,649 × 1.55",
          ],
          result: "TDEE = 2,556 kcal/day",
        },
      ],
    },
    // Prose: What is BMR
    {
      id: "whatIsBmr",
      type: "prose",
      title: "What is Basal Metabolic Rate?",
      content: "Basal Metabolic Rate (BMR) is the number of calories your body needs to perform basic life-sustaining functions while at complete rest. This includes breathing, circulation, cell production, nutrient processing, and temperature regulation. BMR accounts for about 60-75% of total daily calorie expenditure. Understanding your BMR is the foundation for any nutrition plan, whether your goal is weight loss, maintenance, or muscle gain.",
    },
    // Prose: BMR vs TDEE
    {
      id: "bmrVsTdee",
      type: "prose",
      title: "BMR vs TDEE: What's the Difference?",
      content: "BMR measures calories burned at complete rest — imagine lying in bed all day without moving. TDEE (Total Daily Energy Expenditure) adds physical activity to your BMR. TDEE = BMR × Activity Multiplier. For weight management, TDEE is the more practical number: eat below it to lose weight, above it to gain. Most people's TDEE is 1.3-2x their BMR depending on activity level.",
    },
    // Prose: How to Boost Metabolism
    {
      id: "boostMetabolism",
      type: "prose",
      title: "How to Boost Your Metabolism",
      content: "Building muscle is the most effective long-term strategy — each pound of muscle burns about 6 calories per day at rest, compared to 2 calories for fat. High-protein diets increase the thermic effect of food (TEF), burning more calories during digestion. Cold exposure, adequate sleep, and avoiding crash diets also help maintain metabolic rate. Extreme calorie restriction can lower BMR by 20% or more through 'metabolic adaptation.'",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // FAQs
  // ═══════════════════════════════════════════════════════════════════════════
  faqs: [
    {
      question: "Which BMR formula is most accurate?",
      answer: "The Mifflin-St Jeor equation (1990) is recommended by the American Dietetic Association as the most accurate for most people, predicting BMR within 10% for about 82% of individuals. If you know your body fat percentage, Katch-McArdle may be more accurate as it accounts for lean body mass directly.",
    },
    {
      question: "What's the difference between BMR and RMR?",
      answer: "BMR (Basal Metabolic Rate) is measured under strict conditions: complete rest, fasting, and thermoneutral environment. RMR (Resting Metabolic Rate) is measured under less strict conditions and is typically 10-20% higher than BMR. In practice, the terms are often used interchangeably, and most calculators actually estimate RMR.",
    },
    {
      question: "Should I eat below my BMR to lose weight?",
      answer: "No. Eating below BMR for extended periods can trigger metabolic adaptation, muscle loss, and hormonal imbalances. For safe weight loss, eat below your TDEE (maintenance calories), not your BMR. A deficit of 500 calories below TDEE is recommended for losing about 1 pound per week.",
    },
    {
      question: "Why does BMR decrease with age?",
      answer: "BMR decreases approximately 2% per decade after age 20, primarily due to loss of muscle mass (sarcopenia). Hormonal changes also play a role. Regular strength training and adequate protein intake can help maintain muscle mass and slow this decline.",
    },
    {
      question: "How does muscle mass affect BMR?",
      answer: "Muscle is metabolically active tissue that burns about 6 calories per pound per day at rest, compared to only 2 calories for fat tissue. This is why strength training is valuable for long-term weight management — building muscle increases your baseline calorie burn even when you're not exercising.",
    },
    {
      question: "What is the thermic effect of food (TEF)?",
      answer: "TEF is the energy required to digest, absorb, and process nutrients. Protein has the highest TEF (20-30% of calories consumed), followed by carbohydrates (5-10%), and fats (0-3%). This is one reason high-protein diets can support weight loss — you burn more calories processing protein.",
    },
    {
      question: "Can I increase my metabolism permanently?",
      answer: "Yes, to some extent. Building muscle mass through strength training permanently increases BMR. Avoiding extreme calorie restriction prevents metabolic adaptation. Adequate sleep and managing stress hormones also support healthy metabolism. However, genetics set an upper limit on metabolic rate.",
    },
    {
      question: "How accurate are online BMR calculators?",
      answer: "Online calculators using validated formulas like Mifflin-St Jeor are accurate within ±10-15% for most people. For precise measurement, indirect calorimetry is the gold standard. Factors like body composition, genetics, and metabolic conditions can cause individual variation beyond what equations predict.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCES (exactly 2)
  // ═══════════════════════════════════════════════════════════════════════════
  references: [
    {
      authors: "Mifflin MD, St Jeor ST, Hill LA, Scott BJ, Daugherty SA, Koh YO",
      year: "1990",
      title: "A new predictive equation for resting energy expenditure in healthy individuals",
      source: "American Journal of Clinical Nutrition, 51(2):241-247",
      url: "https://pubmed.ncbi.nlm.nih.gov/2305711/",
    },
    {
      authors: "Frankenfield D, Roth-Yousey L, Compher C",
      year: "2005",
      title: "Comparison of Predictive Equations for Resting Metabolic Rate in Healthy Nonobese and Obese Adults",
      source: "Journal of the American Dietetic Association, 105(5):775-789",
      url: "https://pubmed.ncbi.nlm.nih.gov/15883556/",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // DETAILED TABLE
  // ═══════════════════════════════════════════════════════════════════════════
  detailedTable: {
    id: "calorieTargets",
    buttonLabel: "View Calorie Targets",
    buttonIcon: "📋",
    modalTitle: "Daily Calorie Targets by Goal",
    columns: [
      { id: "goal", label: "Goal", align: "left" },
      { id: "calories", label: "Calories", align: "right", highlight: true },
      { id: "deficit", label: "vs TDEE", align: "center" },
      { id: "weeklyChange", label: "Weekly Change", align: "right" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SIDEBAR
  // ═══════════════════════════════════════════════════════════════════════════
  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: false,
    category: "health",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FEATURES
  // ═══════════════════════════════════════════════════════════════════════════
  features: {
    autoCalculate: true,
    exportPDF: true,
    shareResults: true,
    saveHistory: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // RELATED CALCULATORS
  // ═══════════════════════════════════════════════════════════════════════════
  relatedCalculators: [
    "tdee-calculator",
    "calorie-calculator",
    "macro-calculator",
    "body-fat-calculator",
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // ADS
  // ═══════════════════════════════════════════════════════════════════════════
  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
  },
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateBMR(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values, unitSystem } = data;

  const gender = (values.gender as string) || "male";
  const age = (values.age as number) || 30;
  let weight = (values.weight as number) || 70;
  let height = (values.height as number) || 170;
  const formula = (values.formula as string) || "mifflin";
  const bodyFatPercent = (values.bodyFatPercent as number) || 20;
  const activityLevel = parseFloat((values.activityLevel as string) || "1.2");

  // Convert to metric if imperial
  if (unitSystem === "imperial") {
    weight = weight * 0.453592; // lb to kg
    height = height * 2.54; // in to cm
  }

  // Mifflin-St Jeor Equation (1990)
  let bmrMifflin = 0;
  if (gender === "male") {
    bmrMifflin = (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    bmrMifflin = (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }

  // Revised Harris-Benedict Equation (1984)
  let bmrHarris = 0;
  if (gender === "male") {
    bmrHarris = (13.397 * weight) + (4.799 * height) - (5.677 * age) + 88.362;
  } else {
    bmrHarris = (9.247 * weight) + (3.098 * height) - (4.330 * age) + 447.593;
  }

  // Katch-McArdle Formula (uses lean body mass)
  const leanMass = weight * (1 - bodyFatPercent / 100);
  const bmrKatch = 370 + (21.6 * leanMass);

  // Select BMR based on formula choice
  let bmr = bmrMifflin;
  if (formula === "harris") bmr = bmrHarris;
  if (formula === "katch") bmr = bmrKatch;

  // Calculate TDEE and targets
  const tdee = bmr * activityLevel;
  const weightLoss = tdee - 500;
  const weightGain = tdee + 500;

  // Build table data for calorie targets
  const tableData = [
    { goal: "Extreme Weight Loss", calories: `${Math.round(tdee - 1000)}`, deficit: "-1000", weeklyChange: "-2 lb" },
    { goal: "Weight Loss", calories: `${Math.round(tdee - 500)}`, deficit: "-500", weeklyChange: "-1 lb" },
    { goal: "Mild Weight Loss", calories: `${Math.round(tdee - 250)}`, deficit: "-250", weeklyChange: "-0.5 lb" },
    { goal: "Maintenance", calories: `${Math.round(tdee)}`, deficit: "0", weeklyChange: "0 lb" },
    { goal: "Mild Weight Gain", calories: `${Math.round(tdee + 250)}`, deficit: "+250", weeklyChange: "+0.5 lb" },
    { goal: "Weight Gain", calories: `${Math.round(tdee + 500)}`, deficit: "+500", weeklyChange: "+1 lb" },
  ];

  return {
    values: {
      bmr,
      tdee,
      weightLoss,
      weightGain,
      bmrMifflin,
      bmrHarris,
    },
    formatted: {
      bmr: Math.round(bmr).toLocaleString(),
      tdee: Math.round(tdee).toLocaleString(),
      weightLoss: Math.round(weightLoss).toLocaleString(),
      weightGain: Math.round(weightGain).toLocaleString(),
      bmrMifflin: Math.round(bmrMifflin).toLocaleString(),
      bmrHarris: Math.round(bmrHarris).toLocaleString(),
    },
    summary: `BMR: ${Math.round(bmr)} kcal | TDEE: ${Math.round(tdee)} kcal`,
    isValid: weight > 0 && height > 0 && age > 0,
    metadata: {
      tableData,
      formula,
      leanMass: Math.round(leanMass * 10) / 10,
    },
  };
}

export default bmrCalculatorConfig;
