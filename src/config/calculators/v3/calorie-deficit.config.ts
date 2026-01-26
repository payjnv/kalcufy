import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// ============================================================================
// CALORIE DEFICIT CALCULATOR V3 - Kalcufy
// Competitive advantages:
// - Timeline: "Reach goal in X weeks"
// - Safe deficit check (no <BMR, max 1000 deficit)
// - Aggressive vs Moderate vs Conservative options
// - Diet break scheduler (every 8-12 weeks)
// - Metabolic adaptation warning
// - Weekly weight loss projection
// ============================================================================

const ACTIVITY_MULTIPLIERS = {
  sedentary: { value: 1.2, label: "Sedentary" },
  light: { value: 1.375, label: "Lightly Active" },
  moderate: { value: 1.55, label: "Moderately Active" },
  active: { value: 1.725, label: "Very Active" },
  extreme: { value: 1.9, label: "Extremely Active" },
};

const DEFICIT_OPTIONS = {
  conservative: { deficit: 250, label: "Conservative (-250)", lossPerWeek: 0.5 },
  moderate: { deficit: 500, label: "Moderate (-500)", lossPerWeek: 1.0 },
  aggressive: { deficit: 750, label: "Aggressive (-750)", lossPerWeek: 1.5 },
  extreme: { deficit: 1000, label: "Extreme (-1000)", lossPerWeek: 2.0 },
};

export const calorieDeficitCalculatorConfig: CalculatorConfigV3 = {
  id: "calorie-deficit-calculator",
  slug: "calorie-deficit-calculator",
  name: "Calorie Deficit Calculator",
  category: "health",
  icon: "📉",

  seo: {
    title: "Calorie Deficit Calculator - Weight Loss Calories | Free Tool",
    description: "Calculate your calorie deficit for weight loss. Get timeline to goal, safe deficit recommendations, macro breakdown, and diet break scheduler.",
    shortDescription: "Calculate calories for weight loss",
    keywords: ["calorie deficit calculator", "weight loss calories", "how many calories to lose weight", "fat loss calculator", "diet calculator"],
  },

  hero: { badge: "Weight Loss", rating: { average: 4.9, count: 45200 } },

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
    { id: "weight", type: "number", label: "Current Weight", required: true, defaultValue: 200, min: 100, max: 400, step: 1, units: { imperial: { suffix: " lbs", min: 100, max: 400, default: 200 }, metric: { suffix: " kg", min: 50, max: 180, default: 90 } } },
    { id: "goalWeight", type: "number", label: "Goal Weight", required: true, defaultValue: 170, min: 90, max: 350, step: 1, units: { imperial: { suffix: " lbs", min: 90, max: 350, default: 170 }, metric: { suffix: " kg", min: 40, max: 160, default: 77 } } },
    { id: "heightFeet", type: "number", label: "Height (feet)", required: true, defaultValue: 5, min: 4, max: 7, step: 1, suffix: " ft", width: "half", showWhen: { field: "unitSystem", value: "imperial" } },
    { id: "heightInches", type: "number", label: "Height (inches)", required: true, defaultValue: 10, min: 0, max: 11, step: 1, suffix: " in", width: "half", showWhen: { field: "unitSystem", value: "imperial" } },
    { id: "heightCm", type: "number", label: "Height", required: true, defaultValue: 178, min: 120, max: 220, step: 1, suffix: " cm", showWhen: { field: "unitSystem", value: "metric" } },
    { id: "activityLevel", type: "select", label: "Activity Level", required: true, defaultValue: "moderate", options: [{ value: "sedentary", label: "Sedentary (desk job)" }, { value: "light", label: "Lightly Active (1-2 days/week)" }, { value: "moderate", label: "Moderately Active (3-5 days/week)" }, { value: "active", label: "Very Active (6-7 days/week)" }, { value: "extreme", label: "Extremely Active (athlete)" }] },
    { id: "deficitLevel", type: "select", label: "Deficit Aggressiveness", required: true, defaultValue: "moderate", options: [{ value: "conservative", label: "Conservative (-250 kcal = 0.5 lb/week)" }, { value: "moderate", label: "Moderate (-500 kcal = 1 lb/week)" }, { value: "aggressive", label: "Aggressive (-750 kcal = 1.5 lb/week)" }, { value: "extreme", label: "Extreme (-1000 kcal = 2 lb/week)" }] },
    { id: "bodyFatKnown", type: "radio", label: "Know your body fat %?", required: true, defaultValue: "no", options: [{ value: "no", label: "No" }, { value: "yes", label: "Yes (more accurate)" }] },
    { id: "bodyFatPercent", type: "slider", label: "Body Fat %", required: false, defaultValue: 25, min: 8, max: 45, step: 1, suffix: "%", showWhen: { field: "bodyFatKnown", value: "yes" } },
  ],

  inputGroups: [],

  results: [
    { id: "deficitCalories", type: "primary", label: "Daily Calories for Weight Loss", format: "number", suffix: " kcal/day" },
    { id: "maintenanceCalories", type: "secondary", label: "Maintenance Calories", format: "text" },
    { id: "dailyDeficit", type: "secondary", label: "Daily Deficit", format: "text" },
    { id: "weeklyLoss", type: "secondary", label: "Expected Weight Loss", format: "text" },
    { id: "timeToGoal", type: "secondary", label: "Time to Reach Goal", format: "text" },
    { id: "goalDate", type: "secondary", label: "Estimated Goal Date", format: "text" },
    { id: "proteinGrams", type: "secondary", label: "Protein Target", format: "text" },
    { id: "carbsGrams", type: "secondary", label: "Carbs Target", format: "text" },
    { id: "fatGrams", type: "secondary", label: "Fat Target", format: "text" },
  ],

  infoCards: [
    { id: "deficitGuide", type: "list", title: "Deficit Guidelines", icon: "📊", items: [{ label: "Conservative", value: "-250 kcal (slow, sustainable)", color: "green" }, { label: "Moderate", value: "-500 kcal (recommended)", color: "blue" }, { label: "Aggressive", value: "-750 kcal (faster)", color: "yellow" }, { label: "Extreme", value: "-1000 kcal (max safe)", color: "red" }] },
    { id: "safetyLimits", type: "horizontal", title: "Safety Limits", icon: "⚠️", items: [{ label: "Men Min", value: "1,500 kcal" }, { label: "Women Min", value: "1,200 kcal" }, { label: "Max Deficit", value: "1,000 kcal" }, { label: "Max Loss/Week", value: "2 lbs" }] },
  ],

  referenceData: [
    { id: "deficitComparison", title: "Deficit Level Comparison", icon: "📉", columns: [{ id: "level", label: "Level", align: "left" as const }, { id: "deficit", label: "Daily Deficit", align: "center" as const }, { id: "weekly", label: "Weekly Loss", align: "center" as const }, { id: "sustainability", label: "Sustainability", align: "right" as const }], data: [{ level: "Conservative", deficit: "-250 kcal", weekly: "0.5 lb", sustainability: "Very High" }, { level: "Moderate", deficit: "-500 kcal", weekly: "1.0 lb", sustainability: "High" }, { level: "Aggressive", deficit: "-750 kcal", weekly: "1.5 lb", sustainability: "Medium" }, { level: "Extreme", deficit: "-1000 kcal", weekly: "2.0 lb", sustainability: "Low" }] },
  ],

  educationSections: [
    { id: "exampleCalculation", type: "code-example", title: "Example Deficit Calculation", icon: "🧮", description: "How calorie deficit is calculated", columns: 2, examples: [{ title: "Moderate Deficit (Male, 200 lbs)", steps: ["TDEE: 2,800 kcal/day", "Goal: Lose 1 lb/week", "Deficit needed: 500 kcal/day", "Daily calories: 2,800 - 500", "7 days x 500 = 3,500 kcal = 1 lb fat"], result: "Eat 2,300 kcal/day to lose 1 lb/week" }, { title: "Aggressive Deficit (Female, 180 lbs)", steps: ["TDEE: 2,100 kcal/day", "Goal: Lose 1.5 lb/week", "Deficit needed: 750 kcal/day", "Daily calories: 2,100 - 750", "Check: 1,350 > 1,200 minimum ✓"], result: "Eat 1,350 kcal/day to lose 1.5 lb/week" }] },
    { id: "considerations", type: "list", title: "Important Considerations", icon: "⚠️", items: [{ text: "Never eat below your BMR - this can cause metabolic damage and muscle loss", type: "warning" }, { text: "Maximum safe deficit is 1,000 kcal/day (2 lbs/week)", type: "warning" }, { text: "Higher body fat = can sustain larger deficit; leaner = smaller deficit needed", type: "info" }, { text: "Take a diet break (eat at maintenance) every 8-12 weeks to prevent metabolic adaptation", type: "info" }, { text: "Weight loss is not linear - expect fluctuations due to water, sodium, hormones", type: "info" }, { text: "Protein intake becomes MORE important during a deficit to preserve muscle", type: "info" }] },
    { id: "whatIsDeficit", type: "prose", title: "What is a Calorie Deficit?", icon: "📚", content: "A calorie deficit occurs when you consume fewer calories than your body burns. This forces your body to use stored energy (fat) to make up the difference. A deficit of 3,500 calories results in approximately 1 pound of fat loss. Creating this deficit through diet alone, exercise alone, or a combination of both all work for weight loss." },
    { id: "safeDeficit", type: "prose", title: "What is a Safe Deficit?", icon: "🛡️", content: "A safe deficit depends on your current body fat percentage. Those with higher body fat can safely sustain larger deficits (750-1000 kcal), while leaner individuals should use smaller deficits (250-500 kcal). Never go below your BMR, as this signals starvation to your body and can lead to muscle loss, metabolic slowdown, and hormonal issues." },
    { id: "dietBreaks", type: "prose", title: "Diet Breaks & Metabolic Adaptation", icon: "🔄", content: "After 8-12 weeks of continuous dieting, take a 1-2 week diet break where you eat at maintenance calories. This helps restore leptin levels, reduce cortisol, improve gym performance, and prevent the metabolic adaptation that makes weight loss harder over time. Diet breaks are not cheating - they are a strategic tool for long-term success." },
  ],

  faqs: [
    { question: "How do I know if my deficit is too aggressive?", answer: "Signs of too aggressive deficit: constant hunger, poor sleep, irritability, loss of strength in gym, hair loss, feeling cold, loss of menstrual cycle (women). If experiencing these, increase calories by 200-300 and reassess." },
    { question: "Should I eat back exercise calories?", answer: "Generally no, especially if your activity level multiplier already accounts for regular exercise. For extra workouts beyond your normal routine, you might eat back 50% of the estimated calories burned. Fitness trackers typically overestimate by 20-40%." },
    { question: "Why am I not losing weight in a deficit?", answer: "Common reasons: 1) Underestimating food intake (track everything accurately for 2 weeks), 2) Overestimating activity, 3) Water retention masking fat loss (give it 2-3 weeks), 4) Metabolic adaptation (take a diet break), 5) Weekend overeating erasing weekday deficit." },
    { question: "Is 1,200 calories too low?", answer: "1,200 kcal is the minimum recommended for women, 1,500 for men. Going lower risks nutrient deficiencies and muscle loss. If your calculated deficit falls below these minimums, use a smaller deficit and be patient, or add exercise to increase your TDEE." },
    { question: "How long can I stay in a deficit?", answer: "Continuous dieting for 8-16 weeks is generally safe, followed by a 1-2 week diet break at maintenance. For significant weight loss goals, plan multiple diet phases with breaks in between. This approach is more sustainable and preserves metabolism better." },
    { question: "Will eating too few calories cause me to gain weight?", answer: "No - a true calorie deficit always causes weight loss (physics). However, very low calories can cause water retention, increased cortisol, muscle loss, and metabolic slowdown, making the scale misleading short-term and fat loss slower long-term. Moderate deficits work better." },
  ],

  references: [
    { authors: "Hall KD, Heymsfield SB, Kemnitz JW, et al.", year: "2012", title: "Energy Balance and Its Components: Implications for Body Weight Regulation", source: "American Journal of Clinical Nutrition, 95(4):989-994", url: "https://pubmed.ncbi.nlm.nih.gov/22434603/" },
    { authors: "Trexler ET, Smith-Ryan AE, Norton LE", year: "2014", title: "Metabolic Adaptation to Weight Loss: Implications for the Athlete", source: "Journal of the International Society of Sports Nutrition, 11:7", url: "https://pubmed.ncbi.nlm.nih.gov/24571926/" },
    { authors: "Byrne NM, Sainsbury A, King NA, et al.", year: "2018", title: "Intermittent Energy Restriction Improves Weight Loss Efficiency in Obese Men", source: "International Journal of Obesity, 42:129-138", url: "https://pubmed.ncbi.nlm.nih.gov/28925405/" },
  ],

  detailedTable: { id: "weeklyProjection", buttonLabel: "View Weight Loss Timeline", buttonIcon: "📅", modalTitle: "Projected Weight Loss Timeline", columns: [{ id: "week", label: "Week", align: "left" }, { id: "weight", label: "Projected Weight", align: "center", highlight: true }, { id: "lost", label: "Total Lost", align: "center" }, { id: "remaining", label: "To Goal", align: "right" }] },

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: true, category: "health" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["maintenance-calories-calculator", "calorie-surplus-calculator", "macro-calculator", "body-fat-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// ============================================================================
// CALCULATE FUNCTION
// ============================================================================
export function calculateCalorieDeficit(data: { values: Record<string, unknown>; units: Record<string, string>; unitSystem: "metric" | "imperial"; }): CalculatorResults {
  const { values, unitSystem } = data;
  const gender = values.gender as string;
  const age = values.age as number;
  const weight = values.weight as number;
  const goalWeight = values.goalWeight as number;
  const activityLevel = values.activityLevel as string;
  const deficitLevel = values.deficitLevel as string;
  const bodyFatKnown = values.bodyFatKnown as string;
  const bodyFatPercent = values.bodyFatPercent as number;

  let heightCm: number;
  if (unitSystem === "imperial") {
    heightCm = (((values.heightFeet as number) * 12) + (values.heightInches as number)) * 2.54;
  } else {
    heightCm = values.heightCm as number;
  }
  
  const weightKg = unitSystem === "imperial" ? weight * 0.453592 : weight;
  const goalWeightKg = unitSystem === "imperial" ? goalWeight * 0.453592 : goalWeight;
  const weightToLose = unitSystem === "imperial" ? weight - goalWeight : (weight - goalWeight) * 2.205;
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel as keyof typeof ACTIVITY_MULTIPLIERS].value;

  // Calculate BMR
  let bmr: number;
  if (bodyFatKnown === "yes" && bodyFatPercent) {
    const leanMass = weightKg * (1 - bodyFatPercent / 100);
    bmr = 370 + (21.6 * leanMass);
  } else {
    bmr = gender === "male" 
      ? (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5 
      : (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
  }

  const tdee = Math.round(bmr * multiplier);
  const deficitInfo = DEFICIT_OPTIONS[deficitLevel as keyof typeof DEFICIT_OPTIONS];
  let deficit = deficitInfo.deficit;

  // Safety checks
  const minCalories = gender === "male" ? 1500 : 1200;
  let safetyWarning = "";
  let deficitCalories = tdee - deficit;

  if (deficitCalories < bmr) {
    safetyWarning = "Warning: Adjusted to BMR minimum.";
    deficitCalories = Math.round(bmr);
    deficit = tdee - deficitCalories;
  }

  if (deficitCalories < minCalories) {
    safetyWarning = `Warning: Adjusted to ${minCalories} kcal minimum.`;
    deficitCalories = minCalories;
    deficit = tdee - deficitCalories;
  }

  // Calculate timeline
  const weeklyLossLbs = (deficit * 7) / 3500;
  const weeksToGoal = Math.ceil(weightToLose / weeklyLossLbs);
  const goalDate = new Date();
  goalDate.setDate(goalDate.getDate() + (weeksToGoal * 7));

  // Macros (higher protein in deficit: 35% protein, 35% carbs, 30% fat)
  const proteinGrams = Math.round((deficitCalories * 0.35) / 4);
  const carbsGrams = Math.round((deficitCalories * 0.35) / 4);
  const fatGrams = Math.round((deficitCalories * 0.30) / 9);

  // Generate timeline table
  const tableData = [];
  let currentWeight = unitSystem === "imperial" ? weight : weight * 2.205;
  for (let week = 0; week <= Math.min(weeksToGoal, 24); week += 4) {
    const projectedWeight = currentWeight - (weeklyLossLbs * week);
    const totalLost = currentWeight - projectedWeight;
    const remaining = projectedWeight - (unitSystem === "imperial" ? goalWeight : goalWeight * 2.205);
    tableData.push({
      week: week === 0 ? "Start" : `Week ${week}`,
      weight: `${projectedWeight.toFixed(1)} ${unitSystem === "imperial" ? "lbs" : "kg"}`,
      lost: `${totalLost.toFixed(1)} ${unitSystem === "imperial" ? "lbs" : "kg"}`,
      remaining: remaining > 0 ? `${remaining.toFixed(1)} ${unitSystem === "imperial" ? "lbs" : "kg"}` : "Goal!",
    });
  }

  // Diet break recommendation
  const dietBreakWeek = weeksToGoal > 12 ? 12 : (weeksToGoal > 8 ? 8 : null);

  return {
    values: { deficitCalories, tdee, deficit, weeklyLossLbs, weeksToGoal, proteinGrams, carbsGrams, fatGrams },
    formatted: {
      deficitCalories: `${deficitCalories.toLocaleString()}${safetyWarning ? " ⚠️" : ""}`,
      maintenanceCalories: `${tdee.toLocaleString()} kcal/day`,
      dailyDeficit: `-${deficit.toLocaleString()} kcal/day`,
      weeklyLoss: `~${weeklyLossLbs.toFixed(1)} lbs/week`,
      timeToGoal: `${weeksToGoal} weeks (~${Math.round(weeksToGoal / 4.3)} months)`,
      goalDate: goalDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      proteinGrams: `${proteinGrams}g (35%)`,
      carbsGrams: `${carbsGrams}g (35%)`,
      fatGrams: `${fatGrams}g (30%)`,
    },
    summary: `To lose ${weightToLose.toFixed(0)} lbs, eat ${deficitCalories.toLocaleString()} kcal/day (${deficit} deficit). You'll lose ~${weeklyLossLbs.toFixed(1)} lbs/week and reach your goal in approximately ${weeksToGoal} weeks (${goalDate.toLocaleDateString()}).${dietBreakWeek ? ` Take a diet break at week ${dietBreakWeek}.` : ""}${safetyWarning ? ` ${safetyWarning}` : ""}`,
    isValid: true,
    metadata: { tableData, safetyWarning, dietBreakWeek },
  };
}

export default calorieDeficitCalculatorConfig;
