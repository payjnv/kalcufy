import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// CALORIE CALCULATOR V3 CONFIG
// Competitive Edge: Multi-formula, Zigzag cycling, Special populations,
// Body recomposition, Macro presets, Timeline projection
// =============================================================================

export const calorieCalculatorConfig: CalculatorConfigV3 = {
  // ============ BASIC INFO ============
  id: "calorie",
  slug: "calorie-calculator",
  name: "Calorie Calculator",
  category: "health",
  icon: "🔥",

  // ============ SEO ============
  seo: {
    title: "Calorie Calculator - TDEE, BMR & Macro Calculator | Free",
    description: "Calculate daily calories for weight loss, muscle gain, or maintenance. Features 3 scientific formulas, zigzag cycling, pregnancy/breastfeeding modes, and macro breakdown.",
    shortDescription: "Calculate your daily calorie needs with multiple formulas",
    keywords: [
      "calorie calculator",
      "TDEE calculator",
      "BMR calculator",
      "weight loss calculator",
      "macro calculator",
      "calories for weight loss",
      "calorie deficit calculator",
      "zigzag diet calculator",
      "pregnancy calorie calculator",
      "breastfeeding calorie calculator",
    ],
  },

  // ============ HERO ============
  hero: {
    badge: "Health & Fitness",
    rating: { average: 4.9, count: 28500 },
  },

  // ============ UNIT SYSTEM ============
  unitSystem: {
    enabled: true,
    default: "imperial",
    options: [
      { value: "imperial", label: "Imperial (lb, ft)" },
      { value: "metric", label: "Metric (kg, cm)" },
    ],
  },

  // ============ INPUTS ============
  inputs: [
    {
      id: "gender",
      type: "radio",
      label: "Biological Sex",
      required: true,
      defaultValue: "female",
      options: [
        { value: "female", label: "Female" },
        { value: "male", label: "Male" },
      ],
    },
    {
      id: "age",
      type: "number",
      label: "Age",
      required: true,
      defaultValue: 30,
      min: 15,
      max: 100,
      step: 1,
      suffix: "years",
    },
    {
      id: "weight",
      type: "number",
      label: "Weight",
      required: true,
      defaultValue: 150,
      min: 66,
      max: 600,
      step: 1,
      units: {
        imperial: { suffix: "lbs", min: 66, max: 600, default: 150 },
        metric: { suffix: "kg", min: 30, max: 270, default: 68 },
      },
    },
    {
      id: "heightFeet",
      type: "number",
      label: "Height (ft)",
      required: true,
      defaultValue: 5,
      min: 4,
      max: 7,
      step: 1,
      suffix: "ft",
      width: "half",
      showWhen: { field: "unitSystem", value: "imperial" },
    },
    {
      id: "heightInches",
      type: "number",
      label: "Height (in)",
      required: true,
      defaultValue: 6,
      min: 0,
      max: 11,
      step: 1,
      suffix: "in",
      width: "half",
      showWhen: { field: "unitSystem", value: "imperial" },
    },
    {
      id: "heightCm",
      type: "number",
      label: "Height",
      required: true,
      defaultValue: 168,
      min: 120,
      max: 230,
      step: 1,
      suffix: "cm",
      showWhen: { field: "unitSystem", value: "metric" },
    },
    {
      id: "activityLevel",
      type: "select",
      label: "Activity Level",
      required: true,
      defaultValue: "moderate",
      options: [
        { value: "sedentary", label: "Sedentary (office job, little exercise)" },
        { value: "light", label: "Lightly Active (light exercise 1-3 days/week)" },
        { value: "moderate", label: "Moderately Active (exercise 3-5 days/week)" },
        { value: "active", label: "Very Active (hard exercise 6-7 days/week)" },
        { value: "extreme", label: "Extremely Active (athlete, physical job)" },
      ],
      helpText: "Choose based on your typical weekly activity",
    },
    {
      id: "goal",
      type: "select",
      label: "Your Goal",
      required: true,
      defaultValue: "lose",
      options: [
        { value: "lose-fast", label: "Lose Weight Fast (-1 kg/2 lbs per week)" },
        { value: "lose", label: "Lose Weight (-0.5 kg/1 lb per week)" },
        { value: "lose-slow", label: "Lose Weight Slowly (-0.25 kg/0.5 lb per week)" },
        { value: "maintain", label: "Maintain Weight" },
        { value: "gain-slow", label: "Gain Weight Slowly (+0.25 kg/0.5 lb per week)" },
        { value: "gain", label: "Build Muscle (+0.5 kg/1 lb per week)" },
        { value: "recomp", label: "Body Recomposition (lose fat, gain muscle)" },
      ],
    },
    {
      id: "formula",
      type: "select",
      label: "Calculation Formula",
      required: true,
      defaultValue: "mifflin",
      options: [
        { value: "mifflin", label: "Mifflin-St Jeor (recommended)" },
        { value: "harris", label: "Harris-Benedict (revised)" },
        { value: "katch", label: "Katch-McArdle (requires body fat %)" },
      ],
      helpText: "Mifflin-St Jeor is most accurate for general population",
    },
    {
      id: "bodyFat",
      type: "slider",
      label: "Body Fat Percentage",
      required: false,
      defaultValue: 25,
      min: 5,
      max: 50,
      step: 1,
      suffix: "%",
      showWhen: { field: "formula", value: "katch" },
      helpText: "Required for Katch-McArdle formula",
    },
    {
      id: "specialCondition",
      type: "select",
      label: "Special Condition",
      required: false,
      defaultValue: "none",
      options: [
        { value: "none", label: "None" },
        { value: "pregnant1", label: "Pregnant - 1st Trimester" },
        { value: "pregnant2", label: "Pregnant - 2nd Trimester (+340 cal)" },
        { value: "pregnant3", label: "Pregnant - 3rd Trimester (+450 cal)" },
        { value: "breastfeeding-exclusive", label: "Breastfeeding - Exclusive (+400-500 cal)" },
        { value: "breastfeeding-partial", label: "Breastfeeding - Partial (+250 cal)" },
        { value: "teen", label: "Teen (15-17) - Growing (+200-400 cal)" },
        { value: "elderly", label: "Elderly (65+) - Reduced metabolism" },
      ],
    },
    {
      id: "zigzagPattern",
      type: "select",
      label: "Calorie Cycling Pattern",
      required: false,
      defaultValue: "none",
      options: [
        { value: "none", label: "Fixed Daily Calories" },
        { value: "training", label: "Training-Matched (high on workout days)" },
        { value: "weekend", label: "Weekend-Focused (high Sat/Sun)" },
        { value: "52", label: "5:2 Pattern (5 low, 2 refeed days)" },
        { value: "wave", label: "Gradual Wave (mid-week peak)" },
      ],
      helpText: "Cycling can prevent metabolic adaptation",
    },
    {
      id: "workoutDays",
      type: "number",
      label: "Workout Days per Week",
      required: false,
      defaultValue: 4,
      min: 1,
      max: 7,
      step: 1,
      suffix: "days",
      showWhen: { field: "zigzagPattern", value: "training" },
    },
    {
      id: "macroPreset",
      type: "select",
      label: "Macro Distribution",
      required: false,
      defaultValue: "balanced",
      options: [
        { value: "balanced", label: "Balanced (30P/40C/30F)" },
        { value: "high-protein", label: "High Protein (40P/30C/30F)" },
        { value: "low-carb", label: "Low Carb (30P/20C/50F)" },
        { value: "keto", label: "Keto (25P/5C/70F)" },
        { value: "high-carb", label: "High Carb/Athletic (25P/55C/20F)" },
        { value: "zone", label: "Zone Diet (30P/40C/30F)" },
      ],
    },
    {
      id: "goalWeight",
      type: "number",
      label: "Goal Weight (optional)",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 500,
      step: 1,
      helpText: "Enter to see estimated timeline",
      units: {
        imperial: { suffix: "lbs", min: 0, max: 500, default: 0 },
        metric: { suffix: "kg", min: 0, max: 225, default: 0 },
      },
    },
  ],

  // ============ INPUT GROUPS ============
  inputGroups: [
    {
      id: "advanced",
      title: "Advanced Options",
      inputs: ["formula", "bodyFat", "specialCondition", "zigzagPattern", "workoutDays", "macroPreset", "goalWeight"],
      defaultExpanded: false,
    },
  ],

  // ============ RESULTS ============
  results: [
    { id: "dailyCalories", type: "primary", label: "Daily Calories", format: "number", suffix: " cal" },
    { id: "bmr", type: "secondary", label: "BMR (Basal Metabolic Rate)", format: "number", suffix: " cal", icon: "💤" },
    { id: "tdee", type: "secondary", label: "TDEE (Maintenance)", format: "number", suffix: " cal", icon: "⚡" },
    { id: "deficit", type: "secondary", label: "Daily Deficit/Surplus", format: "text", icon: "📊" },
    { id: "protein", type: "secondary", label: "Protein", format: "text", icon: "🥩" },
    { id: "carbs", type: "secondary", label: "Carbohydrates", format: "text", icon: "🍞" },
    { id: "fat", type: "secondary", label: "Fat", format: "text", icon: "🥑" },
    { id: "weeklyChange", type: "secondary", label: "Weekly Change", format: "text", icon: "📈" },
    { id: "timeline", type: "secondary", label: "Goal Timeline", format: "text", icon: "🎯" },
  ],

  // ============ INFO CARDS (REQUIRED: 2 cards - 1 list + 1 horizontal) ============
  infoCards: [
    {
      id: "quickFacts",
      type: "list",
      title: "Calorie Quick Facts",
      icon: "📋",
      items: [
        { label: "1 lb of fat", value: "≈ 3,500 calories" },
        { label: "Safe weight loss", value: "0.5-1 kg/week" },
        { label: "Minimum intake (women)", value: "1,200 cal/day" },
        { label: "Minimum intake (men)", value: "1,500 cal/day" },
      ],
    },
    {
      id: "activityMultipliers",
      type: "horizontal",
      title: "Activity Level Multipliers",
      icon: "🏃",
      columns: 5,
      items: [
        { label: "Sedentary", value: "×1.2" },
        { label: "Light", value: "×1.375" },
        { label: "Moderate", value: "×1.55" },
        { label: "Active", value: "×1.725" },
        { label: "Extreme", value: "×1.9" },
      ],
    },
  ],

  // ============ REFERENCE DATA (REQUIRED: 1 table with columns array) ============
  referenceData: [
    {
      id: "calorieDeficits",
      title: "Calorie Deficit Guide (2025)",
      icon: "📉",
      columns: [
        { id: "goal", label: "Goal", align: "left" as const },
        { id: "deficit", label: "Daily Deficit", align: "center" as const },
        { id: "weekly", label: "Weekly Loss", align: "center" as const },
        { id: "timeline", label: "10 lbs Timeline", align: "right" as const, highlight: true },
      ],
      data: [
        { goal: "Aggressive", deficit: "-1,000 cal", weekly: "2 lbs", timeline: "5 weeks" },
        { goal: "Moderate", deficit: "-500 cal", weekly: "1 lb", timeline: "10 weeks" },
        { goal: "Conservative", deficit: "-250 cal", weekly: "0.5 lb", timeline: "20 weeks" },
        { goal: "Maintenance", deficit: "0 cal", weekly: "0 lb", timeline: "N/A" },
        { goal: "Lean Bulk", deficit: "+250 cal", weekly: "+0.5 lb", timeline: "N/A" },
      ],
    },
  ],

  // ============ EDUCATION SECTIONS ============
  educationSections: [
    // REQUIRED: type "code-example"
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "🔢",
      description: "How we calculate your daily calories using the Mifflin-St Jeor equation",
      columns: 2,
      examples: [
        {
          title: "30-year-old Female, 150 lbs, 5'6\"",
          steps: [
            "Step 1: Convert to metric",
            "  Weight: 150 lbs ÷ 2.205 = 68 kg",
            "  Height: 5'6\" = 167.6 cm",
            "Step 2: Calculate BMR (Mifflin-St Jeor)",
            "  BMR = (10 × 68) + (6.25 × 167.6) - (5 × 30) - 161",
            "  BMR = 680 + 1,048 - 150 - 161 = 1,417 cal",
            "Step 3: Apply Activity Multiplier (Moderate)",
            "  TDEE = 1,417 × 1.55 = 2,196 cal",
            "Step 4: Apply Goal (Lose 1 lb/week)",
            "  Daily Calories = 2,196 - 500 = 1,696 cal",
          ],
          result: "Daily Target: 1,696 calories",
        },
        {
          title: "35-year-old Male, 180 lbs, 5'10\"",
          steps: [
            "Step 1: Convert to metric",
            "  Weight: 180 lbs ÷ 2.205 = 82 kg",
            "  Height: 5'10\" = 177.8 cm",
            "Step 2: Calculate BMR (Mifflin-St Jeor)",
            "  BMR = (10 × 82) + (6.25 × 177.8) - (5 × 35) + 5",
            "  BMR = 820 + 1,111 - 175 + 5 = 1,761 cal",
            "Step 3: Apply Activity Multiplier (Active)",
            "  TDEE = 1,761 × 1.725 = 3,038 cal",
            "Step 4: Apply Goal (Build Muscle)",
            "  Daily Calories = 3,038 + 500 = 3,538 cal",
          ],
          result: "Daily Target: 3,538 calories",
        },
      ],
    },
    // REQUIRED: type "list" (5+ items)
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "Never eat below 1,200 cal (women) or 1,500 cal (men) without medical supervision", type: "warning" },
        { text: "Calculators provide estimates - track your progress and adjust as needed", type: "info" },
        { text: "Losing more than 2 lbs/week can cause muscle loss and metabolic slowdown", type: "warning" },
        { text: "Recalculate every 10-15 lbs lost as your calorie needs will change", type: "info" },
        { text: "Pregnant and breastfeeding women should consult a healthcare provider", type: "warning" },
        { text: "If you hit a plateau for 2+ weeks, consider a 1-week diet break at maintenance", type: "info" },
      ],
    },
    // REQUIRED: 3+ prose sections
    {
      id: "whatIsTDEE",
      type: "prose",
      title: "What is TDEE and Why Does It Matter?",
      icon: "📖",
      content: "Total Daily Energy Expenditure (TDEE) represents the total calories your body burns in a day, combining your Basal Metabolic Rate (BMR) with calories burned through activity. Your BMR accounts for 60-70% of daily calories - the energy needed for basic functions like breathing, circulation, and cell production while at rest. The remaining 30-40% comes from physical activity (exercise and daily movement) and the thermic effect of food (energy used to digest meals). Understanding your TDEE is the foundation of any successful weight management plan because it tells you exactly how many calories you need to maintain your current weight. To lose weight, you eat below your TDEE; to gain weight, you eat above it.",
    },
    {
      id: "formulaComparison",
      type: "prose",
      title: "Which Formula Should You Use?",
      icon: "🔬",
      content: "The Mifflin-St Jeor equation (1990) is considered the most accurate for the general population, predicting BMR within 10% of measured values in 82% of people. The Harris-Benedict equation (1919, revised 1984) is older but still widely used - it tends to slightly overestimate calories for most people. The Katch-McArdle formula is unique because it factors in lean body mass, making it more accurate for athletic individuals with lower body fat percentages. If you know your body fat percentage from a DEXA scan or reliable measurement, Katch-McArdle may give you the most precise results. For most people, we recommend starting with Mifflin-St Jeor and adjusting based on real-world results after 2-3 weeks.",
    },
    {
      id: "zigzagBenefits",
      type: "prose",
      title: "Benefits of Calorie Cycling (Zigzag Diet)",
      icon: "📊",
      content: "Calorie cycling alternates between higher and lower calorie days while maintaining the same weekly deficit. Research shows this approach may help prevent metabolic adaptation - the phenomenon where your body reduces energy expenditure in response to prolonged calorie restriction. A 2017 study found that participants using intermittent energy restriction lost similar weight but experienced less metabolic slowdown compared to continuous dieters. Zigzag dieting also offers psychological benefits: knowing you have higher-calorie days ahead makes low-calorie days more manageable. The training-matched approach (eating more on workout days) can improve exercise performance and recovery, while the 5:2 pattern provides built-in diet breaks that reduce feelings of restriction.",
    },
  ],

  // ============ FAQs (6+ required) ============
  faqs: [
    {
      question: "How accurate is this calorie calculator?",
      answer: "Calorie calculators estimate your needs based on equations derived from metabolic research. The Mifflin-St Jeor formula is accurate within 10% for about 82% of people. However, individual factors like genetics, hormones, gut microbiome, and medication can affect your actual metabolism. We recommend using calculator results as a starting point, then tracking your weight for 2-3 weeks and adjusting by 100-200 calories if you're not seeing expected results.",
    },
    {
      question: "What's the difference between BMR and TDEE?",
      answer: "BMR (Basal Metabolic Rate) is the calories your body burns at complete rest - just to keep you alive. TDEE (Total Daily Energy Expenditure) is your BMR plus all the calories you burn through activity, exercise, and digesting food. TDEE is the number you should use for weight management. If you eat exactly your TDEE, you'll maintain weight. Eat below it to lose, above it to gain.",
    },
    {
      question: "How many calories should I eat to lose weight?",
      answer: "For sustainable weight loss, create a deficit of 500-750 calories below your TDEE, which typically results in losing 1-1.5 lbs per week. Larger deficits (1,000+ calories) can lead to muscle loss, metabolic slowdown, nutrient deficiencies, and are harder to maintain. Never go below 1,200 calories (women) or 1,500 calories (men) without medical supervision. Slow and steady weight loss is more likely to be permanent.",
    },
    {
      question: "Should I eat back the calories I burn exercising?",
      answer: "It depends on your approach. If you selected your activity level accurately in the calculator, exercise calories are already factored into your TDEE - you don't need to eat them back. However, if you chose sedentary and exercise separately, you may want to eat back 50-75% of exercise calories (fitness trackers often overestimate burns by 20-40%). For intense workouts over 60 minutes, eating slightly more can support recovery.",
    },
    {
      question: "How many extra calories do I need during pregnancy?",
      answer: "Calorie needs increase throughout pregnancy: 1st trimester requires minimal extra calories (0-100), 2nd trimester adds about 340 calories/day, and 3rd trimester adds about 450 calories/day. These are averages - your healthcare provider may recommend different amounts based on your starting weight, activity level, and whether you're carrying multiples. Weight loss dieting is NOT recommended during pregnancy.",
    },
    {
      question: "What if I hit a weight loss plateau?",
      answer: "Plateaus are normal! First, ensure you're accurately tracking calories (measure portions, count everything including cooking oils and sauces). If tracking is accurate, your TDEE may have decreased as you've lost weight - recalculate with your new weight. Consider a 1-2 week diet break eating at maintenance, which can help reset hunger hormones and metabolism. Also verify you're getting enough sleep and managing stress, as both affect weight loss.",
    },
  ],

  // ============ REFERENCES (REQUIRED: exactly 2) ============
  references: [
    {
      authors: "Mifflin MD, St Jeor ST, Hill LA, Scott BJ, Daugherty SA, Koh YO",
      year: "1990",
      title: "A new predictive equation for resting energy expenditure in healthy individuals",
      source: "The American Journal of Clinical Nutrition",
      url: "https://pubmed.ncbi.nlm.nih.gov/2305711/",
    },
    {
      authors: "Frankenfield D, Roth-Yousey L, Compher C",
      year: "2005",
      title: "Comparison of predictive equations for resting metabolic rate in healthy nonobese and obese adults",
      source: "Journal of the American Dietetic Association",
      url: "https://pubmed.ncbi.nlm.nih.gov/15883556/",
    },
  ],

  // ============ DETAILED TABLE (Zigzag Schedule) ============
  detailedTable: {
    id: "zigzagSchedule",
    buttonLabel: "View Weekly Calorie Schedule",
    buttonIcon: "📅",
    modalTitle: "Your Weekly Calorie Cycling Schedule",
    columns: [
      { id: "day", label: "Day", align: "left" as const },
      { id: "type", label: "Type", align: "center" as const },
      { id: "calories", label: "Calories", align: "right" as const, highlight: true },
      { id: "protein", label: "Protein (g)", align: "right" as const },
      { id: "carbs", label: "Carbs (g)", align: "right" as const },
      { id: "fat", label: "Fat (g)", align: "right" as const },
    ],
  },

  // ============ SIDEBAR ============
  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: true,
    category: "health",
  },

  // ============ FEATURES ============
  features: {
    autoCalculate: true,
    exportPDF: true,
    shareResults: true,
    saveHistory: true,
  },

  // ============ RELATED CALCULATORS ============
  relatedCalculators: [
    "tdee-calculator",
    "bmr-calculator",
    "macro-calculator",
    "protein-calculator",
    "body-fat-calculator",
    "ideal-weight-calculator",
  ],

  // ============ ADS ============
  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
  },
};

// =============================================================================
// CONSTANTS
// =============================================================================
const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  extreme: 1.9,
};

const GOAL_ADJUSTMENTS: Record<string, number> = {
  "lose-fast": -1000,
  "lose": -500,
  "lose-slow": -250,
  "maintain": 0,
  "gain-slow": 250,
  "gain": 500,
  "recomp": -200,
};

const SPECIAL_ADJUSTMENTS: Record<string, number> = {
  "none": 0,
  "pregnant1": 0,
  "pregnant2": 340,
  "pregnant3": 450,
  "breastfeeding-exclusive": 450,
  "breastfeeding-partial": 250,
  "teen": 300,
  "elderly": -100,
};

const MACRO_PRESETS: Record<string, { protein: number; carbs: number; fat: number }> = {
  "balanced": { protein: 30, carbs: 40, fat: 30 },
  "high-protein": { protein: 40, carbs: 30, fat: 30 },
  "low-carb": { protein: 30, carbs: 20, fat: 50 },
  "keto": { protein: 25, carbs: 5, fat: 70 },
  "high-carb": { protein: 25, carbs: 55, fat: 20 },
  "zone": { protein: 30, carbs: 40, fat: 30 },
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateCalories(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values, unitSystem } = data;

  const gender = values.gender as string || "female";
  const age = values.age as number || 30;
  const activityLevel = values.activityLevel as string || "moderate";
  const goal = values.goal as string || "maintain";
  const formula = values.formula as string || "mifflin";
  const bodyFat = values.bodyFat as number || 25;
  const specialCondition = values.specialCondition as string || "none";
  const zigzagPattern = values.zigzagPattern as string || "none";
  const workoutDays = values.workoutDays as number || 4;
  const macroPreset = values.macroPreset as string || "balanced";
  const goalWeight = values.goalWeight as number || 0;

  // Get weight in kg
  let weightKg: number;
  if (unitSystem === "metric") {
    weightKg = values.weight as number || 68;
  } else {
    const weightLbs = values.weight as number || 150;
    weightKg = weightLbs / 2.205;
  }

  // Get height in cm
  let heightCm: number;
  if (unitSystem === "metric") {
    heightCm = values.heightCm as number || 168;
  } else {
    const feet = values.heightFeet as number || 5;
    const inches = values.heightInches as number || 6;
    heightCm = (feet * 12 + inches) * 2.54;
  }

  // Calculate BMR
  let bmr: number;
  
  if (formula === "mifflin") {
    if (gender === "male") {
      bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
    } else {
      bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
    }
  } else if (formula === "harris") {
    if (gender === "male") {
      bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age);
    }
  } else {
    const leanBodyMass = weightKg * (1 - bodyFat / 100);
    bmr = 370 + (21.6 * leanBodyMass);
  }

  // Calculate TDEE
  const activityMultiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.55;
  const tdee = Math.round(bmr * activityMultiplier);

  // Apply adjustments
  const goalAdjustment = GOAL_ADJUSTMENTS[goal] || 0;
  let dailyCalories = tdee + goalAdjustment;

  const specialAdjustment = SPECIAL_ADJUSTMENTS[specialCondition] || 0;
  dailyCalories += specialAdjustment;

  // Enforce minimum
  const minCalories = gender === "male" ? 1500 : 1200;
  if (dailyCalories < minCalories && !goal.includes("gain") && goal !== "maintain") {
    dailyCalories = minCalories;
  }

  // Calculate macros
  const macros = MACRO_PRESETS[macroPreset] || MACRO_PRESETS["balanced"];
  const proteinGrams = Math.round((dailyCalories * macros.protein / 100) / 4);
  const carbsGrams = Math.round((dailyCalories * macros.carbs / 100) / 4);
  const fatGrams = Math.round((dailyCalories * macros.fat / 100) / 9);

  // Calculate deficit/surplus
  const deficit = dailyCalories - tdee;
  let deficitText = deficit < 0 ? `${Math.abs(deficit)} cal deficit` : 
                    deficit > 0 ? `${deficit} cal surplus` : "Maintenance";

  // Calculate weekly change
  const weeklyPoundChange = (deficit * 7) / 3500;
  let weeklyText = weeklyPoundChange < 0 ? `~${Math.abs(weeklyPoundChange).toFixed(1)} lbs/week loss` :
                   weeklyPoundChange > 0 ? `~${weeklyPoundChange.toFixed(1)} lbs/week gain` : "Weight maintenance";

  // Calculate timeline
  let timelineText = "Enter goal weight to see timeline";
  if (goalWeight > 0 && weeklyPoundChange !== 0) {
    const currentWeightLbs = unitSystem === "metric" ? weightKg * 2.205 : (values.weight as number);
    const goalWeightLbs = unitSystem === "metric" ? goalWeight * 2.205 : goalWeight;
    const weightToChange = Math.abs(currentWeightLbs - goalWeightLbs);
    const weeksToGoal = Math.round(weightToChange / Math.abs(weeklyPoundChange));
    
    if (weeksToGoal > 0 && weeksToGoal < 200) {
      const goalDate = new Date();
      goalDate.setDate(goalDate.getDate() + weeksToGoal * 7);
      timelineText = `~${weeksToGoal} weeks (${goalDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })})`;
    }
  }

  // Generate zigzag schedule
  const tableData = generateZigzagSchedule(dailyCalories, zigzagPattern, workoutDays, macros);

  const formatNumber = (num: number): string => Math.round(num).toLocaleString();

  return {
    values: {
      dailyCalories: Math.round(dailyCalories),
      bmr: Math.round(bmr),
      tdee,
      deficit,
      protein: proteinGrams,
      carbs: carbsGrams,
      fat: fatGrams,
      weeklyChange: weeklyPoundChange,
    },
    formatted: {
      dailyCalories: formatNumber(dailyCalories),
      bmr: formatNumber(bmr),
      tdee: formatNumber(tdee),
      deficit: deficitText,
      protein: `${proteinGrams}g (${macros.protein}%)`,
      carbs: `${carbsGrams}g (${macros.carbs}%)`,
      fat: `${fatGrams}g (${macros.fat}%)`,
      weeklyChange: weeklyText,
      timeline: timelineText,
    },
    summary: `Eat ${formatNumber(dailyCalories)} calories/day to ${goal.replace("-", " ")}. Maintenance: ${formatNumber(tdee)} cal.`,
    isValid: true,
    metadata: { tableData },
  };
}

// =============================================================================
// ZIGZAG SCHEDULE GENERATOR
// =============================================================================
function generateZigzagSchedule(
  baseCalories: number,
  pattern: string,
  workoutDays: number,
  macros: { protein: number; carbs: number; fat: number }
): Array<{ day: string; type: string; calories: number; protein: number; carbs: number; fat: number }> {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  if (pattern === "none") {
    return days.map(day => ({
      day,
      type: "Standard",
      calories: Math.round(baseCalories),
      protein: Math.round((baseCalories * macros.protein / 100) / 4),
      carbs: Math.round((baseCalories * macros.carbs / 100) / 4),
      fat: Math.round((baseCalories * macros.fat / 100) / 9),
    }));
  }

  let dayCalories: number[] = [];
  const weeklyTotal = baseCalories * 7;

  if (pattern === "training") {
    const highCal = Math.round(baseCalories * 1.15);
    const restDays = 7 - workoutDays;
    const lowCal = Math.round((weeklyTotal - highCal * workoutDays) / restDays);
    for (let i = 0; i < 7; i++) {
      dayCalories.push(i < workoutDays ? highCal : lowCal);
    }
  } else if (pattern === "weekend") {
    const highCal = Math.round(baseCalories * 1.2);
    const lowCal = Math.round((weeklyTotal - highCal * 2) / 5);
    dayCalories = [lowCal, lowCal, lowCal, lowCal, lowCal, highCal, highCal];
  } else if (pattern === "52") {
    const refeedCal = Math.round(baseCalories * 1.3);
    const lowCal = Math.round((weeklyTotal - refeedCal * 2) / 5);
    dayCalories = [lowCal, lowCal, lowCal, lowCal, lowCal, refeedCal, refeedCal];
  } else if (pattern === "wave") {
    const multipliers = [0.85, 0.95, 1.1, 1.15, 1.0, 0.95, 1.0];
    const totalMultiplier = multipliers.reduce((a, b) => a + b, 0);
    dayCalories = multipliers.map(m => Math.round((weeklyTotal / totalMultiplier) * m));
  }

  return days.map((day, i) => {
    const cal = dayCalories[i] || baseCalories;
    const isHigh = cal > baseCalories * 1.05;
    const isLow = cal < baseCalories * 0.95;
    return {
      day,
      type: isHigh ? "High" : isLow ? "Low" : "Standard",
      calories: cal,
      protein: Math.round((cal * macros.protein / 100) / 4),
      carbs: Math.round((cal * macros.carbs / 100) / 4),
      fat: Math.round((cal * macros.fat / 100) / 9),
    };
  });
}

export default calorieCalculatorConfig;
