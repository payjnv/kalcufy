import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// ============================================================================
// MAINTENANCE CALORIES CALCULATOR V3 - Kalcufy
// ============================================================================

const ACTIVITY_MULTIPLIERS = {
  sedentary: { value: 1.2, label: "Sedentary" },
  light: { value: 1.375, label: "Lightly Active" },
  moderate: { value: 1.55, label: "Moderately Active" },
  active: { value: 1.725, label: "Very Active" },
  extreme: { value: 1.9, label: "Extremely Active" },
};

export const maintenanceCaloriesCalculatorConfig: CalculatorConfigV3 = {
  id: "maintenance-calories-calculator",
  slug: "maintenance-calories-calculator",
  name: "Maintenance Calories Calculator",
  category: "health",
  icon: "⚖️",

  seo: {
    title: "Maintenance Calories Calculator - Find Your TDEE | Free Tool",
    description: "Calculate maintenance calories using 3 scientific formulas. Get macro breakdown, calories per meal, and accurate TDEE to maintain weight.",
    shortDescription: "Find how many calories to maintain weight",
    keywords: ["maintenance calories", "TDEE calculator", "calories to maintain weight", "daily calorie needs"],
  },

  hero: { badge: "Nutrition", rating: { average: 4.9, count: 28400 } },

  unitSystem: {
    enabled: true,
    default: "imperial",
    options: [
      { id: "imperial", label: "Imperial (lb, ft)" },
      { id: "metric", label: "Metric (kg, cm)" },
    ],
  },

  inputs: [
    { id: "gender", type: "radio", label: "Biological Sex", required: true, defaultValue: "male", options: [{ value: "female", label: "Female" }, { value: "male", label: "Male" }] },
    { id: "age", type: "number", label: "Age", required: true, defaultValue: 30, min: 15, max: 80, step: 1, suffix: " years" },
    { id: "weight", type: "number", label: "Weight", required: true, defaultValue: 170, min: 80, max: 400, step: 1, units: { imperial: { suffix: " lbs", min: 80, max: 400, default: 170 }, metric: { suffix: " kg", min: 40, max: 180, default: 77 } } },
    { id: "heightFeet", type: "number", label: "Height (feet)", required: true, defaultValue: 5, min: 4, max: 7, step: 1, suffix: " ft", width: "half", showWhen: { field: "unitSystem", value: "imperial" } },
    { id: "heightInches", type: "number", label: "Height (inches)", required: true, defaultValue: 10, min: 0, max: 11, step: 1, suffix: " in", width: "half", showWhen: { field: "unitSystem", value: "imperial" } },
    { id: "heightCm", type: "number", label: "Height", required: true, defaultValue: 178, min: 120, max: 220, step: 1, suffix: " cm", showWhen: { field: "unitSystem", value: "metric" } },
    { id: "activityLevel", type: "select", label: "Activity Level", required: true, defaultValue: "moderate", options: [{ value: "sedentary", label: "Sedentary (desk job, little exercise)" }, { value: "light", label: "Lightly Active (1-2 days/week)" }, { value: "moderate", label: "Moderately Active (3-5 days/week)" }, { value: "active", label: "Very Active (6-7 days/week)" }, { value: "extreme", label: "Extremely Active (athlete, 2x/day)" }] },
    { id: "bodyFatKnown", type: "radio", label: "Know your body fat %?", required: true, defaultValue: "no", options: [{ value: "no", label: "No - Use Mifflin-St Jeor" }, { value: "yes", label: "Yes - Use Katch-McArdle" }] },
    { id: "bodyFatPercent", type: "slider", label: "Body Fat %", required: false, defaultValue: 20, min: 5, max: 45, step: 1, suffix: "%", showWhen: { field: "bodyFatKnown", value: "yes" } },
    { id: "mealsPerDay", type: "select", label: "Meals Per Day", required: true, defaultValue: "3", options: [{ value: "2", label: "2 meals" }, { value: "3", label: "3 meals" }, { value: "4", label: "4 meals" }, { value: "5", label: "5 meals" }] },
  ],

  inputGroups: [],

  results: [
    { id: "maintenanceCalories", type: "primary", label: "Maintenance Calories (TDEE)", format: "number", suffix: " kcal/day" },
    { id: "bmr", type: "secondary", label: "Basal Metabolic Rate", format: "text" },
    { id: "weeklyCalories", type: "secondary", label: "Weekly Calories", format: "text" },
    { id: "caloriesPerMeal", type: "secondary", label: "Calories Per Meal", format: "text" },
    { id: "proteinGrams", type: "secondary", label: "Protein Target", format: "text" },
    { id: "carbsGrams", type: "secondary", label: "Carbs Target", format: "text" },
    { id: "fatGrams", type: "secondary", label: "Fat Target", format: "text" },
  ],

  infoCards: [
    { id: "tdeeBasics", type: "list", title: "TDEE Components", icon: "🔥", items: [{ label: "BMR", value: "60-70% of TDEE", color: "blue" }, { label: "Activity", value: "15-30% of TDEE", color: "green" }, { label: "TEF (digestion)", value: "10% of TDEE", color: "yellow" }, { label: "NEAT", value: "Variable", color: "orange" }] },
    { id: "activityGuide", type: "horizontal", title: "Activity Multipliers", icon: "🏃", items: [{ label: "Sedentary", value: "x1.2" }, { label: "Light", value: "x1.375" }, { label: "Moderate", value: "x1.55" }, { label: "Active", value: "x1.725" }] },
  ],

  referenceData: [
    { id: "formulaComparison", title: "BMR Formula Comparison", icon: "📊", columns: [{ id: "formula", label: "Formula", align: "left" as const }, { id: "year", label: "Year", align: "center" as const }, { id: "accuracy", label: "Accuracy", align: "right" as const }], data: [{ formula: "Mifflin-St Jeor", year: "1990", accuracy: "Most accurate" }, { formula: "Harris-Benedict", year: "1918", accuracy: "Overestimates 5%" }, { formula: "Katch-McArdle", year: "1996", accuracy: "Best if BF% known" }] },
  ],

  educationSections: [
    { id: "exampleCalculation", type: "code-example", title: "Example Calculation", icon: "🧮", description: "TDEE calculation steps", columns: 2, examples: [{ title: "Mifflin-St Jeor (Male)", steps: ["Weight: 77kg, Height: 178cm, Age: 30", "BMR = (10 x 77) + (6.25 x 178) - (5 x 30) + 5", "BMR = 770 + 1112 - 150 + 5 = 1,737 kcal", "Activity: Moderate (x1.55)", "TDEE = 1,737 x 1.55"], result: "Maintenance: 2,692 kcal/day" }, { title: "Katch-McArdle (18% BF)", steps: ["Weight: 77kg, Body Fat: 18%", "Lean Mass = 77 x 0.82 = 63.1 kg", "BMR = 370 + (21.6 x 63.1)", "BMR = 370 + 1,363 = 1,733 kcal", "TDEE = 1,733 x 1.55"], result: "Maintenance: 2,686 kcal/day" }] },
    { id: "considerations", type: "list", title: "Important Considerations", icon: "⚠️", items: [{ text: "TDEE is an estimate - track weight 2-3 weeks to verify", type: "warning" }, { text: "Most people overestimate activity level", type: "warning" }, { text: "Metabolism varies 5-10% between individuals", type: "info" }, { text: "TDEE decreases ~2% per decade after age 20", type: "info" }, { text: "Recalculate every 10-15 lbs of weight change", type: "info" }] },
    { id: "whatIsTDEE", type: "prose", title: "What Are Maintenance Calories?", icon: "📚", content: "Maintenance calories (TDEE) represent the total energy your body burns daily. This includes BMR (60-70%), physical activity (15-30%), and the thermic effect of food (10%). Eating at maintenance keeps weight stable." },
    { id: "howToUse", type: "prose", title: "How to Use This Number", icon: "🎯", content: "Use maintenance as your baseline. For fat loss, subtract 300-500 calories. For muscle gain, add 200-300 calories. Track weight weekly and adjust by 100-200 calories if results differ from expectations after 2-3 weeks." },
    { id: "macros", type: "prose", title: "Macro Distribution", icon: "🥗", content: "At maintenance, aim for 30% protein, 40% carbs, 30% fat. Active individuals may increase carbs to 50%. Those focused on satiety can boost protein to 35%. The key is consistency and adequate protein intake." },
  ],

  faqs: [
    { question: "How accurate is this calculator?", answer: "TDEE estimates are within 10-15% accuracy. The Mifflin-St Jeor formula is most accurate for general population. Track weight for 2-3 weeks to verify and adjust by 100-200 calories if needed." },
    { question: "Which BMR formula is best?", answer: "Mifflin-St Jeor is the gold standard. If you know your body fat % from DEXA or calipers, Katch-McArdle is more accurate for lean/muscular individuals." },
    { question: "Why does activity level matter so much?", answer: "Activity can change TDEE by 500-1000+ calories. A sedentary vs very active person with same stats can have 900+ calorie difference. When unsure, choose lower activity level." },
    { question: "How often should I recalculate?", answer: "Every 10-15 pounds of weight change, or every 3-6 months. After prolonged dieting, eating at maintenance for 2-4 weeks helps restore metabolic rate." },
    { question: "Can I eat different amounts daily?", answer: "Yes! Weekly total matters more than daily. If maintenance is 2,500/day, you could eat 2,800 on training days and 2,200 on rest days (calorie cycling)." },
    { question: "Why is this different from my fitness tracker?", answer: "Trackers often overestimate by 20-40%. Use tracker data for relative comparisons, not absolute numbers. Calculator formulas are based on research studies." },
  ],

  references: [
    { authors: "Mifflin MD, St Jeor ST, Hill LA, et al.", year: "1990", title: "A New Predictive Equation for Resting Energy Expenditure in Healthy Individuals", source: "American Journal of Clinical Nutrition, 51(2):241-247", url: "https://pubmed.ncbi.nlm.nih.gov/2305711/" },
    { authors: "Frankenfield D, Roth-Yousey L, Compher C", year: "2005", title: "Comparison of Predictive Equations for Resting Metabolic Rate in Healthy Adults", source: "Journal of the American Dietetic Association, 105(5):775-789", url: "https://pubmed.ncbi.nlm.nih.gov/15883556/" },
    { authors: "Harris JA, Benedict FG", year: "1918", title: "A Biometric Study of Human Basal Metabolism", source: "Proceedings of the National Academy of Sciences, 4(12):370-373", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1091498/" },
  ],

  detailedTable: { id: "formulaResults", buttonLabel: "Compare All Formulas", buttonIcon: "📊", modalTitle: "BMR & TDEE Comparison", columns: [{ id: "formula", label: "Formula", align: "left" }, { id: "bmr", label: "BMR", align: "center" }, { id: "tdee", label: "TDEE", align: "center", highlight: true }, { id: "perMeal", label: "Per Meal", align: "right" }] },

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: true, category: "health" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["calorie-deficit-calculator", "calorie-surplus-calculator", "macro-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// ============================================================================
// CALCULATE FUNCTION
// ============================================================================
export function calculateMaintenanceCalories(data: { values: Record<string, unknown>; units: Record<string, string>; unitSystem: "metric" | "imperial"; }): CalculatorResults {
  const { values, unitSystem } = data;
  const gender = values.gender as string;
  const age = values.age as number;
  const weight = values.weight as number;
  const activityLevel = values.activityLevel as string;
  const bodyFatKnown = values.bodyFatKnown as string;
  const bodyFatPercent = values.bodyFatPercent as number;
  const mealsPerDay = parseInt(values.mealsPerDay as string);

  let heightCm: number;
  if (unitSystem === "imperial") {
    heightCm = (((values.heightFeet as number) * 12) + (values.heightInches as number)) * 2.54;
  } else {
    heightCm = values.heightCm as number;
  }
  const weightKg = unitSystem === "imperial" ? weight * 0.453592 : weight;
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel as keyof typeof ACTIVITY_MULTIPLIERS].value;

  // BMR Formulas
  const bmrMifflin = gender === "male" ? (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5 : (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
  const bmrHarris = gender === "male" ? 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age) : 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age);
  let bmrKatch: number | null = null;
  if (bodyFatKnown === "yes" && bodyFatPercent) {
    const leanMass = weightKg * (1 - bodyFatPercent / 100);
    bmrKatch = 370 + (21.6 * leanMass);
  }

  const primaryBmr = bmrKatch || bmrMifflin;
  const tdee = Math.round(primaryBmr * multiplier);
  const weeklyCalories = tdee * 7;
  const caloriesPerMeal = Math.round(tdee / mealsPerDay);

  // Macros (30% protein, 40% carbs, 30% fat)
  const proteinGrams = Math.round((tdee * 0.30) / 4);
  const carbsGrams = Math.round((tdee * 0.40) / 4);
  const fatGrams = Math.round((tdee * 0.30) / 9);

  const tableData = [
    { formula: "Mifflin-St Jeor", bmr: `${Math.round(bmrMifflin).toLocaleString()} kcal`, tdee: `${Math.round(bmrMifflin * multiplier).toLocaleString()} kcal`, perMeal: `${Math.round((bmrMifflin * multiplier) / mealsPerDay)} kcal` },
    { formula: "Harris-Benedict", bmr: `${Math.round(bmrHarris).toLocaleString()} kcal`, tdee: `${Math.round(bmrHarris * multiplier).toLocaleString()} kcal`, perMeal: `${Math.round((bmrHarris * multiplier) / mealsPerDay)} kcal` },
  ];
  if (bmrKatch) {
    tableData.unshift({ formula: "Katch-McArdle ✓", bmr: `${Math.round(bmrKatch).toLocaleString()} kcal`, tdee: `${Math.round(bmrKatch * multiplier).toLocaleString()} kcal`, perMeal: `${Math.round((bmrKatch * multiplier) / mealsPerDay)} kcal` });
  }

  const formulaUsed = bmrKatch ? "Katch-McArdle" : "Mifflin-St Jeor";

  return {
    values: { maintenanceCalories: tdee, bmr: primaryBmr, weeklyCalories, proteinGrams, carbsGrams, fatGrams },
    formatted: {
      maintenanceCalories: tdee.toLocaleString(),
      bmr: `${Math.round(primaryBmr).toLocaleString()} kcal (${formulaUsed})`,
      weeklyCalories: `${weeklyCalories.toLocaleString()} kcal/week`,
      caloriesPerMeal: `~${caloriesPerMeal.toLocaleString()} kcal (${mealsPerDay} meals)`,
      proteinGrams: `${proteinGrams}g (30%)`,
      carbsGrams: `${carbsGrams}g (40%)`,
      fatGrams: `${fatGrams}g (30%)`,
    },
    summary: `Your maintenance calories are ${tdee.toLocaleString()} kcal/day (${weeklyCalories.toLocaleString()}/week). Aim for ~${caloriesPerMeal} calories per meal. Macros: ${proteinGrams}g protein, ${carbsGrams}g carbs, ${fatGrams}g fat.`,
    isValid: true,
    metadata: { tableData, formulaUsed },
  };
}

export default maintenanceCaloriesCalculatorConfig;
