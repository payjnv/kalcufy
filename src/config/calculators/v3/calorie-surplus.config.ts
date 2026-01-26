import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// ============================================================================
// CALORIE SURPLUS CALCULATOR V3 - Kalcufy
// Competitive advantages:
// - Lean bulk vs Moderate vs Aggressive bulk options
// - Natural muscle gain potential (based on training age)
// - Fat gain estimate alongside muscle gain
// - Optimal bulk duration recommendations
// - Training age impact on surplus needs
// ============================================================================

const ACTIVITY_MULTIPLIERS = {
  sedentary: { value: 1.2, label: "Sedentary" },
  light: { value: 1.375, label: "Lightly Active" },
  moderate: { value: 1.55, label: "Moderately Active" },
  active: { value: 1.725, label: "Very Active" },
  extreme: { value: 1.9, label: "Extremely Active" },
};

const SURPLUS_OPTIONS = {
  lean: { surplus: 200, label: "Lean Bulk (+200)", gainPerMonth: 0.5 },
  moderate: { surplus: 350, label: "Moderate Bulk (+350)", gainPerMonth: 1.0 },
  aggressive: { surplus: 500, label: "Aggressive Bulk (+500)", gainPerMonth: 1.5 },
  dreamer: { surplus: 750, label: "Dreamer Bulk (+750)", gainPerMonth: 2.0 },
};

// Natural muscle gain potential by training year (McDonald/Aragon model)
const MUSCLE_GAIN_POTENTIAL = {
  beginner: { monthly: 1.5, yearly: 18, fatRatio: 0.3 }, // Year 1
  intermediate: { monthly: 0.75, yearly: 9, fatRatio: 0.4 }, // Year 2-3
  advanced: { monthly: 0.4, yearly: 5, fatRatio: 0.5 }, // Year 4-5
  elite: { monthly: 0.2, yearly: 2, fatRatio: 0.6 }, // Year 6+
};

export const calorieSurplusCalculatorConfig: CalculatorConfigV3 = {
  id: "calorie-surplus-calculator",
  slug: "calorie-surplus-calculator",
  name: "Calorie Surplus Calculator",
  category: "health",
  icon: "📈",

  seo: {
    title: "Calorie Surplus Calculator - Muscle Gain & Bulking | Free Tool",
    description: "Calculate your calorie surplus for muscle gain. Choose lean, moderate, or aggressive bulk. Get muscle vs fat gain estimates based on training experience.",
    shortDescription: "Calculate calories for muscle gain",
    keywords: ["calorie surplus calculator", "bulking calories", "muscle gain calories", "lean bulk calculator", "how many calories to build muscle"],
  },

  hero: { badge: "Muscle Building", rating: { average: 4.8, count: 32100 } },

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
    { id: "age", type: "number", label: "Age", required: true, defaultValue: 25, min: 15, max: 65, step: 1, suffix: " years" },
    { id: "weight", type: "number", label: "Current Weight", required: true, defaultValue: 160, min: 90, max: 350, step: 1, units: { imperial: { suffix: " lbs", min: 90, max: 350, default: 160 }, metric: { suffix: " kg", min: 45, max: 160, default: 73 } } },
    { id: "heightFeet", type: "number", label: "Height (feet)", required: true, defaultValue: 5, min: 4, max: 7, step: 1, suffix: " ft", width: "half", showWhen: { field: "unitSystem", value: "imperial" } },
    { id: "heightInches", type: "number", label: "Height (inches)", required: true, defaultValue: 10, min: 0, max: 11, step: 1, suffix: " in", width: "half", showWhen: { field: "unitSystem", value: "imperial" } },
    { id: "heightCm", type: "number", label: "Height", required: true, defaultValue: 178, min: 120, max: 220, step: 1, suffix: " cm", showWhen: { field: "unitSystem", value: "metric" } },
    { id: "activityLevel", type: "select", label: "Activity Level", required: true, defaultValue: "active", options: [{ value: "sedentary", label: "Sedentary (desk job)" }, { value: "light", label: "Lightly Active (1-2 days/week)" }, { value: "moderate", label: "Moderately Active (3-5 days/week)" }, { value: "active", label: "Very Active (6-7 days/week)" }, { value: "extreme", label: "Extremely Active (athlete, 2x/day)" }] },
    { id: "trainingExperience", type: "select", label: "Training Experience", required: true, defaultValue: "beginner", options: [{ value: "beginner", label: "Beginner (0-1 years lifting)" }, { value: "intermediate", label: "Intermediate (2-3 years)" }, { value: "advanced", label: "Advanced (4-5 years)" }, { value: "elite", label: "Elite (6+ years, near genetic limit)" }] },
    { id: "surplusLevel", type: "select", label: "Bulk Aggressiveness", required: true, defaultValue: "moderate", options: [{ value: "lean", label: "Lean Bulk (+200 kcal = minimal fat gain)" }, { value: "moderate", label: "Moderate Bulk (+350 kcal = balanced)" }, { value: "aggressive", label: "Aggressive Bulk (+500 kcal = faster gains)" }, { value: "dreamer", label: "Dreamer Bulk (+750 kcal = max growth, more fat)" }] },
    { id: "bodyFatKnown", type: "radio", label: "Know your body fat %?", required: true, defaultValue: "no", options: [{ value: "no", label: "No" }, { value: "yes", label: "Yes" }] },
    { id: "bodyFatPercent", type: "slider", label: "Body Fat %", required: false, defaultValue: 15, min: 6, max: 35, step: 1, suffix: "%", showWhen: { field: "bodyFatKnown", value: "yes" } },
  ],

  inputGroups: [],

  results: [
    { id: "surplusCalories", type: "primary", label: "Daily Calories for Bulking", format: "number", suffix: " kcal/day" },
    { id: "maintenanceCalories", type: "secondary", label: "Maintenance Calories", format: "text" },
    { id: "dailySurplus", type: "secondary", label: "Daily Surplus", format: "text" },
    { id: "monthlyGainTotal", type: "secondary", label: "Expected Monthly Gain", format: "text" },
    { id: "muscleGainMonthly", type: "secondary", label: "Est. Muscle Gain", format: "text" },
    { id: "fatGainMonthly", type: "secondary", label: "Est. Fat Gain", format: "text" },
    { id: "proteinGrams", type: "secondary", label: "Protein Target", format: "text" },
    { id: "carbsGrams", type: "secondary", label: "Carbs Target", format: "text" },
    { id: "fatGrams", type: "secondary", label: "Fat Target", format: "text" },
  ],

  infoCards: [
    { id: "surplusGuide", type: "list", title: "Surplus Guidelines", icon: "📊", items: [{ label: "Lean Bulk", value: "+200 kcal (minimal fat)", color: "green" }, { label: "Moderate", value: "+350 kcal (balanced)", color: "blue" }, { label: "Aggressive", value: "+500 kcal (faster gains)", color: "yellow" }, { label: "Dreamer", value: "+750 kcal (max growth)", color: "orange" }] },
    { id: "muscleRates", type: "horizontal", title: "Natural Muscle Gain Limits", icon: "💪", items: [{ label: "Year 1", value: "1-1.5 lb/mo" }, { label: "Year 2-3", value: "0.5-1 lb/mo" }, { label: "Year 4-5", value: "0.25-0.5 lb/mo" }, { label: "Year 6+", value: "<0.25 lb/mo" }] },
  ],

  referenceData: [
    { id: "bulkComparison", title: "Bulk Type Comparison", icon: "📈", columns: [{ id: "type", label: "Bulk Type", align: "left" as const }, { id: "surplus", label: "Surplus", align: "center" as const }, { id: "muscle", label: "Muscle Gain", align: "center" as const }, { id: "fat", label: "Fat Gain", align: "right" as const }], data: [{ type: "Lean Bulk", surplus: "+200 kcal", muscle: "Maximized", fat: "Minimal" }, { type: "Moderate Bulk", surplus: "+350 kcal", muscle: "Optimal", fat: "Low" }, { type: "Aggressive Bulk", surplus: "+500 kcal", muscle: "Good", fat: "Moderate" }, { type: "Dreamer Bulk", surplus: "+750 kcal", muscle: "Same as aggressive", fat: "High" }] },
  ],

  educationSections: [
    { id: "exampleCalculation", type: "code-example", title: "Example Surplus Calculation", icon: "🧮", description: "How bulking calories are calculated", columns: 2, examples: [{ title: "Lean Bulk (Beginner)", steps: ["TDEE: 2,600 kcal/day", "Training: Year 1 (can gain 1-1.5 lb muscle/mo)", "Surplus needed: +200 kcal", "Daily calories: 2,600 + 200 = 2,800", "Monthly gain: ~2 lbs (1.5 muscle + 0.5 fat)"], result: "Eat 2,800 kcal/day for lean gains" }, { title: "Moderate Bulk (Intermediate)", steps: ["TDEE: 2,800 kcal/day", "Training: Year 3 (can gain 0.5-1 lb muscle/mo)", "Surplus needed: +350 kcal", "Daily calories: 2,800 + 350 = 3,150", "Monthly gain: ~2.5 lbs (0.75 muscle + 1.75 fat)"], result: "Eat 3,150 kcal/day for moderate gains" }] },
    { id: "considerations", type: "list", title: "Important Considerations", icon: "⚠️", items: [{ text: "Beginners can gain muscle faster - larger surplus is more efficient", type: "info" }, { text: "Advanced lifters should use lean bulk only - extra calories just become fat", type: "warning" }, { text: "Surplus beyond what supports muscle growth = extra fat gain", type: "warning" }, { text: "Women typically gain muscle at 50-60% the rate of men", type: "info" }, { text: "Optimal bulk duration: 12-20 weeks, then mini-cut or maintenance", type: "info" }, { text: "Track weight weekly - gaining >0.5% bodyweight/week means too much fat", type: "info" }] },
    { id: "whatIsSurplus", type: "prose", title: "What is a Calorie Surplus?", icon: "📚", content: "A calorie surplus means eating more calories than your body burns, providing extra energy for muscle tissue construction. Building muscle requires both adequate protein AND excess energy. Without a surplus, muscle growth is significantly slower (body recomposition), though possible for beginners and those returning to training." },
    { id: "muscleGainLimits", type: "prose", title: "Natural Muscle Gain Limits", icon: "💪", content: "The body can only build muscle at a limited rate, regardless of how much you eat. Beginners can gain 18-25 lbs of muscle in year 1, but this decreases each year. By year 4-5, gains slow to 2-5 lbs/year. Eating more than needed for maximum muscle growth just adds fat. This is why experienced lifters should use smaller surpluses than beginners." },
    { id: "bulkCutCycle", type: "prose", title: "Bulk and Cut Cycles", icon: "🔄", content: "Most effective approach: bulk for 12-20 weeks until body fat reaches 15-18% (men) or 23-28% (women), then cut back down to 10-12% (men) or 18-22% (women). This cycling optimizes hormones for muscle growth during bulk and keeps you lean year-round. Avoid permabulking - extended high body fat impairs insulin sensitivity and hormone levels." },
  ],

  faqs: [
    { question: "How much surplus do I actually need?", answer: "Research suggests 200-500 calories above maintenance maximizes muscle gain while minimizing fat. Beginners can use the higher end (350-500), while advanced lifters should stick to 200-300. Any surplus beyond what supports muscle growth just adds fat." },
    { question: "Why do advanced lifters need smaller surpluses?", answer: "Muscle gain potential decreases with training experience. A beginner might gain 1.5 lbs muscle/month, needing ~300 extra kcal. An advanced lifter gaining 0.25 lbs/month only needs ~50 extra kcal. Larger surpluses for advanced trainees just become fat." },
    { question: "How do I know if I'm gaining too much fat?", answer: "Track weekly weight gain. Aim for 0.25-0.5% of bodyweight per week for most people. If gaining faster, reduce surplus by 100-200 calories. Visual cues: if you're losing ab definition rapidly or pants getting tight, you're likely in too aggressive a surplus." },
    { question: "Can I build muscle without a surplus?", answer: "Yes, but slower. Body recomposition (building muscle while losing fat or at maintenance) works for beginners, those returning after a break, or those with higher body fat. Experienced, lean lifters typically need a surplus for meaningful muscle gains." },
    { question: "How long should I bulk?", answer: "Optimal bulk phases are 12-20 weeks. Shorter and you don't maximize muscle gains; longer and you accumulate too much fat and hormonal/health markers decline. After bulking, either cut (if >15-18% BF) or maintain for 2-4 weeks before next bulk." },
    { question: "Why is protein so important during a bulk?", answer: "Protein provides amino acids for muscle protein synthesis. During a bulk, aim for 0.8-1g per pound bodyweight. Extra protein beyond this doesn't build more muscle - it's just converted to energy. Focus on hitting protein target, then fill remaining calories with carbs and fats." },
  ],

  references: [
    { authors: "Slater GJ, Dieter BP, Marsh DJ, et al.", year: "2019", title: "Is an Energy Surplus Required to Maximize Skeletal Muscle Hypertrophy?", source: "Frontiers in Nutrition, 6:131", url: "https://pubmed.ncbi.nlm.nih.gov/31482093/" },
    { authors: "Iraki J, Fitschen P, Espinar S, Helms E", year: "2019", title: "Nutrition Recommendations for Bodybuilders in the Off-Season", source: "Journal of the International Society of Sports Nutrition, 16:38", url: "https://pubmed.ncbi.nlm.nih.gov/31182159/" },
    { authors: "Ribeiro AS, Nunes JP, Schoenfeld BJ, et al.", year: "2022", title: "Effects of Different Dietary Energy Intake on Muscle Hypertrophy", source: "International Journal of Sports Medicine, 43(6):515-521", url: "https://pubmed.ncbi.nlm.nih.gov/34883506/" },
  ],

  detailedTable: { id: "bulkProjection", buttonLabel: "View Bulk Timeline", buttonIcon: "📅", modalTitle: "Projected Bulk Results", columns: [{ id: "month", label: "Month", align: "left" }, { id: "weight", label: "Projected Weight", align: "center" }, { id: "muscle", label: "Est. Muscle Gained", align: "center", highlight: true }, { id: "fat", label: "Est. Fat Gained", align: "right" }] },

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: true, category: "health" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["maintenance-calories-calculator", "calorie-deficit-calculator", "macro-calculator", "protein-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// ============================================================================
// CALCULATE FUNCTION
// ============================================================================
export function calculateCalorieSurplus(data: { values: Record<string, unknown>; units: Record<string, string>; unitSystem: "metric" | "imperial"; }): CalculatorResults {
  const { values, unitSystem } = data;
  const gender = values.gender as string;
  const age = values.age as number;
  const weight = values.weight as number;
  const activityLevel = values.activityLevel as string;
  const trainingExperience = values.trainingExperience as string;
  const surplusLevel = values.surplusLevel as string;
  const bodyFatKnown = values.bodyFatKnown as string;
  const bodyFatPercent = values.bodyFatPercent as number;

  let heightCm: number;
  if (unitSystem === "imperial") {
    heightCm = (((values.heightFeet as number) * 12) + (values.heightInches as number)) * 2.54;
  } else {
    heightCm = values.heightCm as number;
  }
  
  const weightKg = unitSystem === "imperial" ? weight * 0.453592 : weight;
  const weightLbs = unitSystem === "imperial" ? weight : weight * 2.205;
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
  const surplusInfo = SURPLUS_OPTIONS[surplusLevel as keyof typeof SURPLUS_OPTIONS];
  const surplus = surplusInfo.surplus;
  const surplusCalories = tdee + surplus;

  // Get muscle gain potential based on training experience
  const gainPotential = MUSCLE_GAIN_POTENTIAL[trainingExperience as keyof typeof MUSCLE_GAIN_POTENTIAL];
  let muscleGainMonthly = gainPotential.monthly;
  
  // Adjust for gender (women ~50-60% of male rate)
  if (gender === "female") {
    muscleGainMonthly *= 0.55;
  }

  // Calculate estimated fat vs muscle gain
  const totalMonthlyGainCalories = surplus * 30; // Monthly surplus in calories
  const muscleCaloriesNeeded = muscleGainMonthly * 2500; // ~2500 kcal to build 1 lb muscle
  const excessCalories = Math.max(0, totalMonthlyGainCalories - muscleCaloriesNeeded);
  const fatGainMonthly = excessCalories / 3500; // 3500 kcal = 1 lb fat
  const totalMonthlyGain = muscleGainMonthly + fatGainMonthly;

  // Macros (bulking: 30% protein, 45% carbs, 25% fat)
  const proteinGrams = Math.round((surplusCalories * 0.30) / 4);
  const carbsGrams = Math.round((surplusCalories * 0.45) / 4);
  const fatGrams = Math.round((surplusCalories * 0.25) / 9);

  // Generate timeline table (6 month projection)
  const tableData = [];
  let projectedWeight = weightLbs;
  let totalMuscle = 0;
  let totalFat = 0;
  
  for (let month = 0; month <= 6; month++) {
    tableData.push({
      month: month === 0 ? "Start" : `Month ${month}`,
      weight: `${projectedWeight.toFixed(1)} lbs`,
      muscle: `+${totalMuscle.toFixed(1)} lbs`,
      fat: `+${totalFat.toFixed(1)} lbs`,
    });
    projectedWeight += totalMonthlyGain;
    totalMuscle += muscleGainMonthly;
    totalFat += fatGainMonthly;
  }

  // Recommendations
  let recommendation = "";
  if (trainingExperience === "beginner") {
    recommendation = "As a beginner, you can gain muscle quickly. A moderate-aggressive surplus is efficient.";
  } else if (trainingExperience === "intermediate") {
    recommendation = "Intermediate lifter: moderate surplus recommended. Aggressive bulking adds unnecessary fat.";
  } else if (trainingExperience === "advanced" || trainingExperience === "elite") {
    recommendation = "Advanced/elite: lean bulk only (+200-250 kcal). Your muscle gain potential is limited - excess calories become fat.";
  }

  return {
    values: { surplusCalories, tdee, surplus, muscleGainMonthly, fatGainMonthly, totalMonthlyGain, proteinGrams, carbsGrams, fatGrams },
    formatted: {
      surplusCalories: surplusCalories.toLocaleString(),
      maintenanceCalories: `${tdee.toLocaleString()} kcal/day`,
      dailySurplus: `+${surplus.toLocaleString()} kcal/day`,
      monthlyGainTotal: `~${totalMonthlyGain.toFixed(1)} lbs/month`,
      muscleGainMonthly: `~${muscleGainMonthly.toFixed(2)} lbs (${Math.round(muscleGainMonthly / totalMonthlyGain * 100)}%)`,
      fatGainMonthly: `~${fatGainMonthly.toFixed(2)} lbs (${Math.round(fatGainMonthly / totalMonthlyGain * 100)}%)`,
      proteinGrams: `${proteinGrams}g (30%)`,
      carbsGrams: `${carbsGrams}g (45%)`,
      fatGrams: `${fatGrams}g (25%)`,
    },
    summary: `To build muscle, eat ${surplusCalories.toLocaleString()} kcal/day (+${surplus} surplus). Expected monthly gain: ~${totalMonthlyGain.toFixed(1)} lbs (${muscleGainMonthly.toFixed(1)} lbs muscle, ${fatGainMonthly.toFixed(1)} lbs fat). ${recommendation}`,
    isValid: true,
    metadata: { tableData, recommendation, trainingExperience, gainPotential },
  };
}

export default calorieSurplusCalculatorConfig;
