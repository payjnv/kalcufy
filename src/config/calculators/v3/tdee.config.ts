import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// TDEE CALCULATOR V3 CONFIG
// =============================================================================

export const tdeeCalculatorConfig: CalculatorConfigV3 = {
  id: "tdee-calculator",
  slug: "tdee-calculator",
  name: "TDEE Calculator",
  category: "health",
  icon: "🔥",

  // ═══════════════════════════════════════════════════════════════════════════
  // SEO
  // ═══════════════════════════════════════════════════════════════════════════
  seo: {
    title: "TDEE Calculator - Total Daily Energy Expenditure Calculator",
    description: "Calculate your Total Daily Energy Expenditure (TDEE) with our free calculator. Uses Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle formulas. Find your exact calorie needs for weight loss, maintenance, or muscle gain.",
    shortDescription: "Calculate how many calories you burn daily",
    keywords: [
      "tdee calculator",
      "total daily energy expenditure",
      "calorie calculator",
      "bmr calculator",
      "metabolic rate",
      "calories burned",
      "weight loss calculator",
      "maintenance calories",
      "mifflin st jeor",
      "harris benedict",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HERO
  // ═══════════════════════════════════════════════════════════════════════════
  hero: {
    badge: "Health",
    rating: { average: 4.9, count: 38500 },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UNIT SYSTEM
  // ═══════════════════════════════════════════════════════════════════════════
  unitSystem: {
    enabled: true,
    default: "imperial",
    options: [
      { value: "imperial", label: "Imperial (lb, ft/in)" },
      { value: "metric", label: "Metric (kg, cm)" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════════════════
  inputs: [
    // Gender
    {
      id: "gender",
      type: "radio",
      label: "Gender",
      required: true,
      defaultValue: "male",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
    },
    // Age
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
    // Weight - Imperial
    {
      id: "weightLbs",
      type: "slider",
      label: "Weight",
      required: true,
      defaultValue: 170,
      min: 66,
      max: 440,
      step: 1,
      suffix: "lbs",
      showWhen: { field: "unitSystem", value: "imperial" },
    },
    // Weight - Metric
    {
      id: "weightKg",
      type: "slider",
      label: "Weight",
      required: true,
      defaultValue: 77,
      min: 30,
      max: 200,
      step: 1,
      suffix: "kg",
      showWhen: { field: "unitSystem", value: "metric" },
    },
    // Height (feet) - Imperial
    {
      id: "heightFeet",
      type: "number",
      label: "Height (feet)",
      required: true,
      defaultValue: 5,
      min: 4,
      max: 7,
      step: 1,
      suffix: "ft",
      width: "half",
      showWhen: { field: "unitSystem", value: "imperial" },
    },
    // Height (inches) - Imperial
    {
      id: "heightInches",
      type: "number",
      label: "Height (inches)",
      required: true,
      defaultValue: 10,
      min: 0,
      max: 11,
      step: 1,
      suffix: "in",
      width: "half",
      showWhen: { field: "unitSystem", value: "imperial" },
    },
    // Height - Metric
    {
      id: "heightCm",
      type: "slider",
      label: "Height",
      required: true,
      defaultValue: 178,
      min: 120,
      max: 220,
      step: 1,
      suffix: "cm",
      showWhen: { field: "unitSystem", value: "metric" },
    },
    // Activity Level
    {
      id: "activityLevel",
      type: "select",
      label: "Activity Level",
      required: true,
      defaultValue: "moderate",
      options: [
        { value: "sedentary", label: "Sedentary (little or no exercise)" },
        { value: "light", label: "Lightly Active (1-3 days/week)" },
        { value: "moderate", label: "Moderately Active (3-5 days/week)" },
        { value: "active", label: "Very Active (6-7 days/week)" },
        { value: "extra", label: "Extra Active (athlete/physical job)" },
      ],
      helpText: "Be honest - most people overestimate their activity level",
    },
    // Formula Selection
    {
      id: "formula",
      type: "select",
      label: "Formula",
      required: true,
      defaultValue: "mifflin",
      options: [
        { value: "mifflin", label: "Mifflin-St Jeor (Recommended)" },
        { value: "harris", label: "Harris-Benedict (Classic)" },
        { value: "katch", label: "Katch-McArdle (Requires Body Fat %)" },
      ],
      helpText: "Mifflin-St Jeor is most accurate for general population",
    },
    // Body Fat % (only for Katch-McArdle)
    {
      id: "bodyFat",
      type: "slider",
      label: "Body Fat %",
      required: false,
      defaultValue: 20,
      min: 5,
      max: 50,
      step: 1,
      suffix: "%",
      showWhen: { field: "formula", value: "katch" },
      helpText: "Required for Katch-McArdle formula",
    },
  ],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════════════════
  results: [
    {
      id: "tdee",
      type: "primary",
      label: "Your TDEE",
      format: "number",
      suffix: "cal/day",
    },
    {
      id: "bmr",
      type: "secondary",
      label: "Basal Metabolic Rate (BMR)",
      format: "number",
      suffix: "cal/day",
    },
    {
      id: "loseWeight",
      type: "secondary",
      label: "Weight Loss (-500 cal)",
      format: "number",
      suffix: "cal/day",
    },
    {
      id: "loseFast",
      type: "secondary",
      label: "Aggressive Loss (-750 cal)",
      format: "number",
      suffix: "cal/day",
    },
    {
      id: "gainWeight",
      type: "secondary",
      label: "Weight Gain (+300 cal)",
      format: "number",
      suffix: "cal/day",
    },
    {
      id: "gainMuscle",
      type: "secondary",
      label: "Muscle Building (+500 cal)",
      format: "number",
      suffix: "cal/day",
    },
    {
      id: "activityCalories",
      type: "secondary",
      label: "Activity Calories",
      format: "number",
      suffix: "cal/day",
    },
    {
      id: "weeklyTdee",
      type: "secondary",
      label: "Weekly TDEE",
      format: "number",
      suffix: "cal/week",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // INFO CARDS (shown in results area)
  // ═══════════════════════════════════════════════════════════════════════════
  infoCards: [
    {
      id: "tdeeComponents",
      title: "TDEE Components",
      icon: "📊",
      type: "list",
      items: [
        { label: "BMR (Basal Metabolic Rate)", value: "60-70%", color: "blue" },
        { label: "NEAT (Daily Activities)", value: "15-30%", color: "green" },
        { label: "TEF (Food Digestion)", value: "~10%", color: "yellow" },
        { label: "EAT (Exercise)", value: "5-10%", color: "orange" },
      ],
    },
    {
      id: "weightTips",
      title: "Weight Management Tips",
      icon: "💡",
      type: "horizontal",
      items: [
        { label: "Never eat below your BMR for safety" },
        { label: "500 cal deficit = ~1 lb loss per week" },
        { label: "Increase NEAT to burn more calories" },
        { label: "Protein has highest thermic effect" },
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
        { label: "Lightly Active", value: "BMR × 1.375" },
        { label: "Moderately Active", value: "BMR × 1.55" },
        { label: "Very Active", value: "BMR × 1.725" },
        { label: "Extra Active", value: "BMR × 1.9" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  educationSections: [
    // Formula Comparison Cards
    {
      id: "formulaComparison",
      type: "cards",
      title: "BMR Formula Comparison",
      icon: "🧮",
      columns: 3,
      cards: [
        {
          title: "Mifflin-St Jeor",
          description: "Most accurate for general population (±10%). Developed in 1990. Recommended by the Academy of Nutrition and Dietetics.",
          icon: "⭐",
        },
        {
          title: "Harris-Benedict",
          description: "Classic formula from 1919, revised in 1984. Tends to slightly overestimate calories. Still widely used.",
          icon: "📜",
        },
        {
          title: "Katch-McArdle",
          description: "Most accurate for lean individuals. Requires body fat percentage. Accounts for lean body mass.",
          icon: "💪",
        },
      ],
    },
    // TDEE Components Cards
    {
      id: "tdeeExplained",
      type: "cards",
      title: "Understanding TDEE Components",
      icon: "🔥",
      columns: 2,
      cards: [
        {
          title: "🛋️ BMR (60-70%)",
          description: "Calories burned at complete rest to maintain vital functions: breathing, heartbeat, brain activity, body temperature.",
          icon: "🛋️",
        },
        {
          title: "🚶 NEAT (15-30%)",
          description: "Non-Exercise Activity Thermogenesis: walking, fidgeting, standing, house chores. High variability between individuals.",
          icon: "🚶",
        },
        {
          title: "🍽️ TEF (~10%)",
          description: "Thermic Effect of Food: energy to digest and process food. Protein: 20-30%, Carbs: 5-10%, Fat: 0-5%.",
          icon: "🍽️",
        },
        {
          title: "🏋️ EAT (5-10%)",
          description: "Exercise Activity Thermogenesis: intentional workouts, gym sessions, sports. Varies based on duration and intensity.",
          icon: "🏋️",
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
          text: "TDEE is an estimate based on population averages. Individual metabolism can vary by ±10-15%. Track results and adjust after 2-3 weeks.",
          type: "warning",
        },
        {
          text: "Most people overestimate their activity level. If unsure, choose the lower option. 80% of people select too high.",
          type: "warning",
        },
        {
          text: "Never eat fewer calories than your BMR. This can slow your metabolism, cause muscle loss, and harm your health.",
          type: "warning",
        },
        {
          text: "Mifflin-St Jeor is recommended for most people. Use Katch-McArdle only if you know your accurate body fat percentage.",
          type: "info",
        },
        {
          text: "TDEE changes over time due to age, weight changes, muscle gain/loss, and activity level changes. Recalculate periodically.",
          type: "info",
        },
        {
          text: "For sustainable weight loss, aim for 0.5-1% of body weight per week. Faster loss often leads to muscle loss and rebound.",
          type: "info",
        },
      ],
    },
    // REQUIRED: Example Calculation
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example TDEE Calculation",
      icon: "📊",
      description: "How to calculate TDEE manually using Mifflin-St Jeor",
      columns: 2,
      examples: [
        {
          title: "Male Example",
          steps: [
            "Age: 30, Weight: 180 lbs (81.6 kg), Height: 5'10\" (177.8 cm)",
            "BMR = (10 × 81.6) + (6.25 × 177.8) - (5 × 30) + 5",
            "BMR = 816 + 1111.25 - 150 + 5 = 1,782 cal",
            "Activity: Moderate (×1.55)",
            "TDEE = 1,782 × 1.55",
          ],
          result: "TDEE = 2,762 calories/day",
        },
        {
          title: "Female Example",
          steps: [
            "Age: 28, Weight: 140 lbs (63.5 kg), Height: 5'5\" (165 cm)",
            "BMR = (10 × 63.5) + (6.25 × 165) - (5 × 28) - 161",
            "BMR = 635 + 1031.25 - 140 - 161 = 1,365 cal",
            "Activity: Light (×1.375)",
            "TDEE = 1,365 × 1.375",
          ],
          result: "TDEE = 1,877 calories/day",
        },
      ],
    },
    // Prose: What is TDEE
    {
      id: "whatIsTdee",
      type: "prose",
      title: "What is TDEE?",
      content: "Total Daily Energy Expenditure (TDEE) is the total number of calories your body burns in a 24-hour period. Unlike BMR which only accounts for calories burned at rest, TDEE includes all energy expenditure: breathing, digestion, walking, exercise, and even fidgeting. Understanding your TDEE is the foundation of any successful weight management plan, whether you're trying to lose fat, build muscle, or maintain your current weight.",
    },
    // Prose: Activity Level
    {
      id: "activityLevelGuide",
      type: "prose",
      title: "Choosing Your Activity Level",
      content: "Be conservative when selecting your activity level - studies show 80% of people overestimate. Sedentary means desk job with minimal movement. Light activity includes 1-3 workout days or a job requiring some walking. Moderate fits those exercising 3-5 days weekly. Very active suits those with daily intense workouts or physical jobs. Extra active is reserved for athletes training multiple times daily or extremely demanding physical labor.",
    },
    // Prose: Weight Goals
    {
      id: "weightGoals",
      type: "prose",
      title: "Using TDEE for Weight Goals",
      content: "To lose weight, eat fewer calories than your TDEE - a 500 calorie deficit creates roughly 1 pound loss per week. For muscle gain, eat 300-500 calories above your TDEE while strength training. Never eat below your BMR as this signals starvation to your body, slowing metabolism and causing muscle loss. The key is finding a sustainable deficit that you can maintain long-term while preserving muscle mass through adequate protein intake and resistance training.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // FAQs
  // ═══════════════════════════════════════════════════════════════════════════
  faqs: [
    {
      question: "What's the difference between BMR and TDEE?",
      answer: "BMR (Basal Metabolic Rate) is the calories your body burns at complete rest - just to keep you alive. TDEE includes BMR plus all other energy expenditure: daily activities, digestion, and exercise. BMR typically accounts for 60-70% of your TDEE. You should eat above BMR but can eat below TDEE to lose weight.",
    },
    {
      question: "Which formula should I use?",
      answer: "Mifflin-St Jeor is recommended for most people as studies show it's the most accurate for the general population (±10%). Use Katch-McArdle if you know your body fat percentage and are relatively lean (<25% men, <35% women). Harris-Benedict is still valid but tends to slightly overestimate.",
    },
    {
      question: "Why does my TDEE seem too high or low?",
      answer: "TDEE calculators are estimates based on averages. Individual metabolism varies due to genetics, muscle mass, hormones, and metabolic adaptation. Use the calculated TDEE as a starting point, track your weight for 2-3 weeks, and adjust by 100-200 calories if needed. If losing too fast, eat more; if not losing, reduce calories slightly.",
    },
    {
      question: "How often should I recalculate my TDEE?",
      answer: "Recalculate every 10-15 pounds of weight change, or every 8-12 weeks. As you lose weight, your TDEE decreases because there's less body mass to maintain. This is why weight loss plateaus happen - you may need to reduce calories or increase activity as you progress.",
    },
    {
      question: "Should I eat back exercise calories?",
      answer: "If you selected an activity level that includes your exercise, don't eat back additional exercise calories - they're already factored in. If you selected 'Sedentary' and exercise separately, you can eat back 50-75% of estimated exercise calories (not 100% as calorie burns are often overestimated by devices).",
    },
    {
      question: "What is NEAT and why does it matter?",
      answer: "NEAT (Non-Exercise Activity Thermogenesis) includes all calories burned from daily movement that isn't exercise: walking, fidgeting, standing, household chores. NEAT can account for 15-30% of TDEE and varies dramatically between individuals. Increasing NEAT through more daily movement can significantly boost calorie burn without formal exercise.",
    },
    {
      question: "Can I lose weight eating at my TDEE?",
      answer: "No, eating at TDEE maintains your current weight. To lose weight, you must eat below TDEE to create a calorie deficit. A 500 calorie daily deficit creates about 1 pound of fat loss per week. However, don't create too large a deficit as this can backfire through muscle loss and metabolic adaptation.",
    },
    {
      question: "How does protein affect my TDEE?",
      answer: "Protein has the highest thermic effect of food (TEF), burning 20-30% of its calories during digestion. Carbs burn 5-10% and fat only 0-5%. Eating more protein slightly increases your TDEE through higher TEF, plus helps preserve muscle during weight loss. This is one reason high-protein diets are effective for fat loss.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════════════════
  references: [
    {
      authors: "Mifflin MD, St Jeor ST, Hill LA, Scott BJ, Daugherty SA, Koh YO",
      year: "1990",
      title: "A new predictive equation for resting energy expenditure in healthy individuals",
      source: "American Journal of Clinical Nutrition",
      url: "https://pubmed.ncbi.nlm.nih.gov/2305711/",
    },
    {
      authors: "Frankenfield D, Roth-Yousey L, Compher C",
      year: "2005",
      title: "Comparison of predictive equations for resting metabolic rate in healthy nonobese and obese adults",
      source: "Journal of the American Dietetic Association",
      url: "https://pubmed.ncbi.nlm.nih.gov/15883556/",
    },
    {
      authors: "Levine JA",
      year: "2004",
      title: "Non-exercise activity thermogenesis (NEAT)",
      source: "Best Practice & Research Clinical Endocrinology & Metabolism",
      url: "https://pubmed.ncbi.nlm.nih.gov/15533774/",
    },
    {
      authors: "Westerterp KR",
      year: "2004",
      title: "Diet induced thermogenesis",
      source: "Nutrition & Metabolism",
      url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC524030/",
    },
    {
      authors: "Academy of Nutrition and Dietetics",
      year: "2023",
      title: "Position of the Academy: Interventions for the Treatment of Overweight and Obesity in Adults",
      source: "Journal of the Academy of Nutrition and Dietetics",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // DETAILED TABLE (Activity Level Breakdown)
  // ═══════════════════════════════════════════════════════════════════════════
  detailedTable: {
    id: "calorieBreakdown",
    buttonLabel: "View Weekly Breakdown",
    buttonIcon: "📅",
    modalTitle: "Weekly Calorie Breakdown",
    columns: [
      { id: "day", label: "Day", align: "left" },
      { id: "tdee", label: "TDEE", align: "right", highlight: true },
      { id: "lose", label: "Weight Loss", align: "right" },
      { id: "gain", label: "Weight Gain", align: "right" },
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
    "bmi-calculator",
    "macro-calculator",
    "calorie-calculator",
    "body-fat-calculator",
    "ideal-weight-calculator",
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
// ACTIVITY MULTIPLIERS
// =============================================================================
const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  extra: 1.9,
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateTDEE(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values, unitSystem } = data;

  // Get gender
  const gender = values.gender as string;
  const age = values.age as number;
  const formula = values.formula as string;
  const activityLevel = values.activityLevel as string;

  // Get weight in kg
  let weightKg: number;
  if (unitSystem === "imperial") {
    const weightLbs = values.weightLbs as number;
    weightKg = weightLbs / 2.20462;
  } else {
    weightKg = values.weightKg as number;
  }

  // Get height in cm
  let heightCm: number;
  if (unitSystem === "imperial") {
    const feet = values.heightFeet as number;
    const inches = values.heightInches as number;
    const totalInches = feet * 12 + inches;
    heightCm = totalInches * 2.54;
  } else {
    heightCm = values.heightCm as number;
  }

  // Calculate BMR based on formula
  let bmr: number;

  if (formula === "mifflin") {
    // Mifflin-St Jeor Equation
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }
  } else if (formula === "harris") {
    // Harris-Benedict Equation (Revised)
    if (gender === "male") {
      bmr = 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age;
    } else {
      bmr = 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.330 * age;
    }
  } else {
    // Katch-McArdle Formula
    const bodyFat = (values.bodyFat as number) || 20;
    const leanBodyMass = weightKg * (1 - bodyFat / 100);
    bmr = 370 + 21.6 * leanBodyMass;
  }

  // Calculate TDEE
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.55;
  const tdee = bmr * multiplier;

  // Calculate activity calories
  const activityCalories = tdee - bmr;

  // Calculate goal calories
  const loseWeight = tdee - 500;
  const loseFast = tdee - 750;
  const gainWeight = tdee + 300;
  const gainMuscle = tdee + 500;

  // Weekly TDEE
  const weeklyTdee = tdee * 7;

  // Generate weekly breakdown for detailed table
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const tableData = days.map((day) => ({
    day,
    tdee: Math.round(tdee).toLocaleString(),
    lose: Math.round(loseWeight).toLocaleString(),
    gain: Math.round(gainWeight).toLocaleString(),
  }));

  // Add totals row
  tableData.push({
    day: "Weekly Total",
    tdee: Math.round(weeklyTdee).toLocaleString(),
    lose: Math.round(loseWeight * 7).toLocaleString(),
    gain: Math.round(gainWeight * 7).toLocaleString(),
  });

  return {
    values: {
      tdee: Math.round(tdee),
      bmr: Math.round(bmr),
      loseWeight: Math.round(loseWeight),
      loseFast: Math.round(loseFast),
      gainWeight: Math.round(gainWeight),
      gainMuscle: Math.round(gainMuscle),
      activityCalories: Math.round(activityCalories),
      weeklyTdee: Math.round(weeklyTdee),
    },
    formatted: {
      tdee: Math.round(tdee).toLocaleString(),
      bmr: Math.round(bmr).toLocaleString(),
      loseWeight: Math.round(loseWeight).toLocaleString(),
      loseFast: Math.round(loseFast).toLocaleString(),
      gainWeight: Math.round(gainWeight).toLocaleString(),
      gainMuscle: Math.round(gainMuscle).toLocaleString(),
      activityCalories: Math.round(activityCalories).toLocaleString(),
      weeklyTdee: Math.round(weeklyTdee).toLocaleString(),
    },
    summary: `Your TDEE is ${Math.round(tdee).toLocaleString()} calories per day. BMR: ${Math.round(bmr).toLocaleString()} cal. Activity adds ${Math.round(activityCalories).toLocaleString()} cal.`,
    isValid: true,
    metadata: {
      tableData,
      formula,
      activityLevel,
      multiplier,
    },
  };
}

export default tdeeCalculatorConfig;
