import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// MACRO CALCULATOR V3 CONFIG
// =============================================================================
export const macroCalculatorConfig: CalculatorConfigV3 = {
  // Basic Info
  id: "macro-calculator",
  slug: "macro-calculator",
  name: "Macro Calculator",
  category: "health",
  icon: "🥗",

  // SEO
  seo: {
    title: "Macro Calculator - Free Macronutrient Calculator | Kalcufy",
    description: "Calculate your daily protein, carbs, and fat targets with our free macro calculator. Uses the Mifflin-St Jeor equation for accurate BMR and TDEE calculations.",
    shortDescription: "Calculate your daily protein, carbs, and fat targets",
    keywords: [
      "macro calculator",
      "macronutrient calculator",
      "protein calculator",
      "carbs calculator",
      "fat calculator",
      "TDEE calculator",
      "BMR calculator",
      "calorie calculator",
      "diet calculator",
      "keto macros",
      "muscle building macros",
      "weight loss macros"
    ],
  },

  // Hero Section
  hero: {
    badge: "Health & Fitness",
    rating: { average: 4.9, count: 12500 },
  },

  // Unit System
  unitSystem: {
    enabled: true,
    default: "imperial",
    options: [
      { value: "imperial", label: "Imperial (lb, ft/in)" },
      { value: "metric", label: "Metric (kg, cm)" },
    ],
  },

  // =============================================================================
  // INPUTS
  // =============================================================================
  inputs: [
    // Gender
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
      suffix: " years",
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
      suffix: " lbs",
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
      suffix: " kg",
      showWhen: { field: "unitSystem", value: "metric" },
    },
    // Height - Imperial (feet)
    {
      id: "heightFeet",
      type: "number",
      label: "Height (feet)",
      required: true,
      defaultValue: 5,
      min: 3,
      max: 8,
      step: 1,
      width: "half",
      showWhen: { field: "unitSystem", value: "imperial" },
    },
    // Height - Imperial (inches)
    {
      id: "heightInches",
      type: "number",
      label: "Height (inches)",
      required: true,
      defaultValue: 10,
      min: 0,
      max: 11,
      step: 1,
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
      min: 100,
      max: 250,
      step: 1,
      suffix: " cm",
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
        { value: "veryActive", label: "Extra Active (physical job + exercise)" },
        { value: "extraActive", label: "Athlete (2x training/day)" },
      ],
    },
    // Goal
    {
      id: "goal",
      type: "select",
      label: "Goal",
      required: true,
      defaultValue: "maintain",
      options: [
        { value: "lose", label: "Lose Fat (~1 lb/week loss)" },
        { value: "maintain", label: "Maintain Weight" },
        { value: "gain", label: "Build Muscle (lean gain)" },
        { value: "recomp", label: "Body Recomposition" },
      ],
    },
    // Diet Type
    {
      id: "dietType",
      type: "select",
      label: "Diet Type",
      required: true,
      defaultValue: "standard",
      options: [
        { value: "standard", label: "Standard Balanced (30/40/30)" },
        { value: "lowCarb", label: "Low-Carb (35/25/40)" },
        { value: "keto", label: "Ketogenic (25/5/70)" },
        { value: "highProtein", label: "High-Protein (40/35/25)" },
        { value: "zone", label: "Zone Diet (30/40/30)" },
        { value: "custom", label: "Custom Ratios" },
      ],
    },
    // Custom Protein %
    {
      id: "customProtein",
      type: "slider",
      label: "Protein %",
      required: false,
      defaultValue: 30,
      min: 10,
      max: 60,
      step: 1,
      suffix: "%",
      showWhen: { field: "dietType", value: "custom" },
    },
    // Custom Carbs %
    {
      id: "customCarbs",
      type: "slider",
      label: "Carbs %",
      required: false,
      defaultValue: 40,
      min: 5,
      max: 65,
      step: 1,
      suffix: "%",
      showWhen: { field: "dietType", value: "custom" },
    },
    // Custom Fat %
    {
      id: "customFat",
      type: "slider",
      label: "Fat %",
      required: false,
      defaultValue: 30,
      min: 10,
      max: 75,
      step: 1,
      suffix: "%",
      showWhen: { field: "dietType", value: "custom" },
    },
    // Advanced: Body Fat %
    {
      id: "bodyFatPercent",
      type: "number",
      label: "Body Fat % (optional)",
      required: false,
      defaultValue: undefined,
      min: 3,
      max: 60,
      step: 0.5,
      suffix: "%",
      helpText: "For more accurate protein recommendations",
    },
    // Advanced: Meals per day
    {
      id: "mealsPerDay",
      type: "select",
      label: "Meals Per Day",
      required: false,
      defaultValue: "4",
      options: [
        { value: "2", label: "2 meals" },
        { value: "3", label: "3 meals" },
        { value: "4", label: "4 meals" },
        { value: "5", label: "5 meals" },
        { value: "6", label: "6 meals" },
      ],
    },
  ],

  // Input Groups (disabled - inputs shown directly)
  inputGroups: [],

  // =============================================================================
  // RESULTS
  // =============================================================================
  results: [
    // Primary Results
    {
      id: "targetCalories",
      type: "primary",
      label: "Daily Calories",
      format: "number",
      suffix: " cal",
    },
    // Macro grams
    {
      id: "proteinGrams",
      type: "primary",
      label: "Protein",
      format: "number",
      suffix: "g",
    },
    {
      id: "carbsGrams",
      type: "primary",
      label: "Carbs",
      format: "number",
      suffix: "g",
    },
    {
      id: "fatGrams",
      type: "primary",
      label: "Fat",
      format: "number",
      suffix: "g",
    },
    // Secondary Results
    {
      id: "bmr",
      type: "secondary",
      label: "BMR (Basal Metabolic Rate)",
      format: "number",
      suffix: " cal",
    },
    {
      id: "tdee",
      type: "secondary",
      label: "TDEE (Total Daily Energy)",
      format: "number",
      suffix: " cal",
    },
    {
      id: "fiber",
      type: "secondary",
      label: "Fiber Recommendation",
      format: "number",
      suffix: "g",
    },
    {
      id: "proteinPerLb",
      type: "secondary",
      label: "Protein per lb Body Weight",
      format: "number",
      suffix: "g/lb",
    },
    // Meal Breakdown
    {
      id: "mealCalories",
      type: "secondary",
      label: "Calories per Meal",
      format: "number",
      suffix: " cal",
    },
    {
      id: "mealProtein",
      type: "secondary",
      label: "Protein per Meal",
      format: "number",
      suffix: "g",
    },
  ],

  // =============================================================================
  // EDUCATION SECTIONS
  // =============================================================================
  educationSections: [
    // Quick Reference Cards
    {
      id: "quickReference",
      type: "cards",
      title: "Quick Reference",
      icon: "📋",
      columns: 2,
      cards: [
        {
          title: "🥩 High-Protein Foods",
          description: "Chicken Breast (4oz): 31g • Greek Yogurt (1 cup): 17g • Eggs (2 large): 12g • Salmon (4oz): 25g • Tofu (1 cup): 20g • Whey Protein (scoop): 25g",
          icon: "🥩",
        },
        {
          title: "⏰ Optimal Meal Timing",
          description: "Pre-Workout: 1-2 hrs before (carbs + protein) • Post-Workout: Within 2 hrs (25-40g protein) • Before Bed: Casein for slow digestion • Spacing: Every 3-4 hrs, 25-40g each",
          icon: "⏰",
        },
      ],
    },
    // Macronutrients Overview Cards
    {
      id: "macroOverview",
      type: "cards",
      title: "Understanding Macronutrients",
      icon: "🍽️",
      columns: 3,
      cards: [
        {
          title: "🥩 Protein (4 cal/g)",
          description: "Builds and repairs muscle, supports immune function, increases satiety. Essential for muscle building and recovery from exercise.",
          icon: "🥩",
        },
        {
          title: "🍞 Carbs (4 cal/g)",
          description: "Primary energy source for brain and muscles. Fuels high-intensity exercise and supports cognitive function.",
          icon: "🍞",
        },
        {
          title: "🥑 Fat (9 cal/g)",
          description: "Hormone production, nutrient absorption, brain health. Essential for vitamin absorption and long-lasting energy.",
          icon: "🥑",
        },
      ],
    },
    // Diet Types Cards
    {
      id: "dietTypes",
      type: "cards",
      title: "Popular Diet Approaches",
      icon: "📊",
      columns: 2,
      cards: [
        {
          title: "Standard Balanced",
          description: "30% protein, 40% carbs, 30% fat. Ideal for general fitness and sustainable eating. Provides balanced energy and nutrient intake.",
          icon: "⚖️",
        },
        {
          title: "Ketogenic",
          description: "25% protein, 5% carbs, 70% fat. Induces ketosis for fat burning. Reduces carbs below 50g/day to shift metabolism.",
          icon: "🔥",
        },
        {
          title: "High-Protein",
          description: "40% protein, 35% carbs, 25% fat. Optimal for muscle building and athletes. Research supports 1.6-2.2g/kg for hypertrophy.",
          icon: "💪",
        },
        {
          title: "Zone Diet",
          description: "30% protein, 40% carbs, 30% fat. Designed by Dr. Barry Sears for hormonal balance and reduced inflammation.",
          icon: "🎯",
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
          text: "These calculations are estimates based on population averages. Individual metabolism varies by ±10%. Track your progress and adjust after 2-4 weeks.",
          type: "warning",
        },
        {
          text: "The Mifflin-St Jeor equation is most accurate for the general population. If you know your body fat %, the Katch-McArdle formula may be more precise.",
          type: "info",
        },
        {
          text: "Protein needs increase during calorie deficits (1.8-2.4g/kg) to preserve muscle mass. Don't reduce protein when cutting.",
          type: "info",
        },
        {
          text: "Extremely low calorie diets (<1200 for women, <1500 for men) can cause metabolic adaptation. Aim for gradual fat loss of 0.5-1% body weight per week.",
          type: "warning",
        },
        {
          text: "Fiber intake (25-38g daily) is crucial for digestive health and satiety. Most fiber comes from carbohydrates.",
          type: "info",
        },
        {
          text: "Consult a healthcare provider or registered dietitian before starting any significant dietary changes, especially with medical conditions.",
          type: "warning",
        },
      ],
    },
    // REQUIRED: Example Calculation
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "📊",
      description: "30-year-old male, 170 lbs (77kg), 5'10\" (178cm), moderately active, maintenance goal, standard diet",
      columns: 3,
      examples: [
        {
          title: "Step 1: Calculate BMR",
          steps: [
            "Using Mifflin-St Jeor:",
            "BMR = (10 × 77) + (6.25 × 178) - (5 × 30) + 5",
            "BMR = 770 + 1,112.5 - 150 + 5",
          ],
          result: "BMR = 1,738 calories",
        },
        {
          title: "Step 2: Calculate TDEE",
          steps: [
            "Activity: Moderately Active",
            "Multiplier: 1.55",
            "TDEE = 1,738 × 1.55",
          ],
          result: "TDEE = 2,694 calories",
        },
        {
          title: "Step 3: Calculate Macros",
          steps: [
            "Standard: 30/40/30 ratio",
            "Protein: 2,694 × 30% ÷ 4 = 202g",
            "Carbs: 2,694 × 40% ÷ 4 = 269g",
            "Fat: 2,694 × 30% ÷ 9 = 90g",
          ],
          result: "Daily: 202g P / 269g C / 90g F",
        },
      ],
    },
    // Prose: Protein Guidelines
    {
      id: "proteinGuide",
      type: "prose",
      title: "How Much Protein Do You Need?",
      icon: "🥩",
      content: "Research shows optimal protein intake varies by goal. The RDA of 0.8g/kg is the minimum to prevent deficiency, not optimal for fitness. For muscle building, meta-analyses find no additional benefit beyond 1.6g/kg (0.73g/lb), though 2.2g/kg (1g/lb) provides a safety margin. During fat loss, higher protein (1.8-2.4g/kg) helps preserve muscle mass. Older adults (65+) benefit from 1.2-1.6g/kg to combat age-related muscle loss. Spread protein across 3-4 meals with 25-40g per meal for optimal muscle protein synthesis.",
    },
    // Prose: Activity Levels
    {
      id: "activityExplained",
      type: "prose",
      title: "Understanding Activity Levels",
      icon: "🏃",
      content: "Activity multipliers account for all daily movement, not just exercise. Sedentary (1.2x) means desk job with no exercise. Light (1.375x) includes 1-3 light workouts per week or active commuting. Moderate (1.55x) is 3-5 days of exercise like gym sessions or sports. Very Active (1.725x) means intense daily training. Extra Active (1.9x) involves physical labor plus exercise. Most people overestimate their activity level—if you have a desk job, even with daily workouts, you might be moderate at best.",
    },
    // Prose: Calorie Adjustments
    {
      id: "calorieAdjustments",
      type: "prose",
      title: "Adjusting Calories for Your Goals",
      icon: "🎯",
      content: "For fat loss, a 500 calorie deficit leads to approximately 1 pound per week loss (3,500 calories = 1 lb fat). Larger deficits increase muscle loss risk. For muscle gain, a 200-300 calorie surplus supports lean mass gains without excessive fat. Body recomposition (maintaining weight while changing body composition) works best for beginners or those returning to training—eat at maintenance with high protein and progressive resistance training.",
    },
  ],

  // =============================================================================
  // FAQs
  // =============================================================================
  faqs: [
    {
      question: "What are macros and why should I track them?",
      answer: "Macros (macronutrients) are the three main nutrients that provide calories: protein (4 cal/g), carbohydrates (4 cal/g), and fat (9 cal/g). Tracking macros ensures you're getting the right balance for your goals—whether building muscle, losing fat, or maintaining health. It's more precise than just counting calories because body composition depends on what you eat, not just how much.",
    },
    {
      question: "Which diet type should I choose?",
      answer: "For most people, Standard (30/40/30) or Zone works well and is sustainable long-term. Choose High-Protein (40/35/25) if you're actively building muscle or an athlete. Low-Carb (35/25/40) may help with fat loss if you respond better to lower carbs. Keto (25/5/70) is a more extreme approach that some find effective for rapid fat loss, but it's restrictive and not necessary for most goals. Consult a nutritionist for personalized advice.",
    },
    {
      question: "How accurate is the Mifflin-St Jeor equation?",
      answer: "The Mifflin-St Jeor equation is considered the most accurate BMR formula for the general population, with studies showing it predicts resting metabolic rate within ±10% of measured values. However, individual factors like muscle mass, metabolic adaptations, hormones, and genetics can cause variations. Use these numbers as a starting point, then adjust based on your actual results over 2-4 weeks.",
    },
    {
      question: "Should I eat the same macros on rest days?",
      answer: "For most people, keeping macros consistent works fine. However, some athletes use 'carb cycling'—eating more carbs on training days and fewer on rest days while keeping protein constant. The total weekly intake matters more than daily variations. Beginners should keep it simple with consistent daily targets until they're comfortable tracking.",
    },
    {
      question: "How do I hit my protein target if it seems high?",
      answer: "Spread protein across 4-5 meals with 25-40g each. Prioritize lean meats, fish, eggs, dairy, and legumes. A protein shake (25-30g) can help fill gaps. Good sources include: chicken breast (31g per 4oz), Greek yogurt (17g per cup), eggs (6g each), tuna (25g per can), tofu (20g per cup). Aim for protein at every meal rather than one large serving.",
    },
    {
      question: "What if my custom macro percentages don't add up to 100%?",
      answer: "The calculator automatically normalizes your custom percentages to 100%. For example, if you enter 35/45/25 (total 105%), it will be adjusted proportionally to maintain your desired ratios. The displayed macros will reflect accurate gram amounts based on your normalized percentages.",
    },
    {
      question: "Is body recomposition possible?",
      answer: "Yes, especially for beginners, those returning to training, or people with higher body fat. Eating at maintenance calories with high protein (1.6-2.2g/kg) and following a progressive strength training program can simultaneously build muscle and lose fat. It's slower than bulking or cutting separately, but results in a leaner physique without extreme dieting phases.",
    },
    {
      question: "How should I adjust if I'm not seeing results?",
      answer: "Track accurately for 2-3 weeks before adjusting. If not losing weight, reduce calories by 100-200/day (keep protein high). If not gaining, add 100-200 calories from carbs or fats. If losing muscle while cutting, increase protein to 2.2-2.4g/kg. Weight fluctuates daily due to water, so focus on weekly averages and monthly trends rather than daily changes.",
    },
  ],

  // =============================================================================
  // REFERENCES
  // =============================================================================
  references: [
    {
      authors: "Mifflin MD, St Jeor ST, Hill LA, Scott BJ, Daugherty SA, Koh YO",
      year: "1990",
      title: "A new predictive equation for resting energy expenditure in healthy individuals",
      source: "American Journal of Clinical Nutrition, 51(2), 241-247",
      url: "https://pubmed.ncbi.nlm.nih.gov/2305711/",
    },
    {
      authors: "Morton RW, Murphy KT, McKellar SR, et al.",
      year: "2018",
      title: "A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength",
      source: "British Journal of Sports Medicine, 52(6), 376-384",
      url: "https://pubmed.ncbi.nlm.nih.gov/28698222/",
    },
    {
      authors: "Phillips SM, Van Loon LJC",
      year: "2011",
      title: "Dietary protein for athletes: From requirements to optimum adaptation",
      source: "Journal of Sports Sciences, 29(sup1), S29-S38",
      url: "https://pubmed.ncbi.nlm.nih.gov/22150425/",
    },
    {
      authors: "Helms ER, Zinn C, Rowlands DS, Brown SR",
      year: "2014",
      title: "A systematic review of dietary protein during caloric restriction in resistance trained lean athletes",
      source: "International Journal of Sport Nutrition and Exercise Metabolism, 24(2), 127-138",
      url: "https://pubmed.ncbi.nlm.nih.gov/24092765/",
    },
    {
      authors: "NCBI Bookshelf",
      year: "2025",
      title: "The Ketogenic Diet: Clinical Applications, Evidence-based Indications, and Implementation",
      source: "StatPearls Publishing",
      url: "https://www.ncbi.nlm.nih.gov/books/NBK499830/",
    },
  ],

  // Detailed Table: Meal Breakdown
  detailedTable: {
    id: "mealBreakdown",
    buttonLabel: "View Meal Breakdown",
    buttonIcon: "🍽️",
    modalTitle: "Daily Meal Breakdown",
    columns: [
      { id: "meal", label: "Meal", align: "left" },
      { id: "calories", label: "Calories", align: "right" },
      { id: "protein", label: "Protein (g)", align: "right", highlight: true },
      { id: "carbs", label: "Carbs (g)", align: "right" },
      { id: "fat", label: "Fat (g)", align: "right" },
    ],
  },

  // Sidebar
  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: true,
    category: "health",
  },

  // Features
  features: {
    autoCalculate: true,
    exportPDF: true,
    shareResults: true,
    saveHistory: true,
  },

  // Related Calculators
  relatedCalculators: [
    "bmi-calculator",
    "calorie-calculator",
    "tdee-calculator",
    "bmr-calculator",
    "body-fat-calculator",
    "ideal-weight-calculator",
  ],

  // Ads
  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INFO CARDS (shown in results area)
  // ═══════════════════════════════════════════════════════════════════════════
  infoCards: [
    {
      id: "proteinSources",
      title: "High-Protein Foods",
      icon: "🥩",
      type: "list",
      items: [
        { label: "Chicken Breast (4oz)", value: "31g", color: "blue" },
        { label: "Greek Yogurt (1 cup)", value: "17g", color: "blue" },
        { label: "Eggs (2 large)", value: "12g", color: "blue" },
        { label: "Salmon (4oz)", value: "25g", color: "blue" },
        { label: "Tofu (1 cup)", value: "20g", color: "blue" },
        { label: "Whey Protein (scoop)", value: "25g", color: "blue" },
      ],
    },
    {
      id: "mealTiming",
      title: "Meal Timing Tips",
      icon: "⏰",
      type: "horizontal",
      items: [
        { label: "Pre-Workout: 1-2 hrs before (carbs + protein)" },
        { label: "Post-Workout: Within 2 hrs (25-40g protein)" },
        { label: "Before Bed: Casein for slow digestion" },
        { label: "Spacing: Every 3-4 hrs, 25-40g each" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCE DATA (grid cards below info cards)
  // ═══════════════════════════════════════════════════════════════════════════
  referenceData: [
    {
      id: "proteinGuidelines",
      title: "Protein Guidelines by Goal",
      icon: "💪",
      columns: 2,
      items: [
        { label: "Maintenance", value: "0.8-1.0 g/lb" },
        { label: "Muscle Building", value: "1.0-1.2 g/lb" },
        { label: "Fat Loss", value: "1.0-1.4 g/lb" },
        { label: "Athletes", value: "1.2+ g/lb" },
      ],
    },
  ],
};

// =============================================================================
// CONSTANTS
// =============================================================================
const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
  extraActive: 2.0,
};

const GOAL_ADJUSTMENTS: Record<string, number> = {
  lose: -500,
  maintain: 0,
  gain: 300,
  recomp: 0,
};

const DIET_RATIOS: Record<string, { protein: number; carbs: number; fat: number }> = {
  standard: { protein: 30, carbs: 40, fat: 30 },
  lowCarb: { protein: 35, carbs: 25, fat: 40 },
  keto: { protein: 25, carbs: 5, fat: 70 },
  highProtein: { protein: 40, carbs: 35, fat: 25 },
  zone: { protein: 30, carbs: 40, fat: 30 },
  custom: { protein: 30, carbs: 40, fat: 30 },
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateMacros(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values, unitSystem } = data;

  // Extract values with defaults
  const gender = (values.gender as string) || "male";
  const age = (values.age as number) || 30;
  const activityLevel = (values.activityLevel as string) || "moderate";
  const goal = (values.goal as string) || "maintain";
  const dietType = (values.dietType as string) || "standard";
  const mealsPerDay = parseInt((values.mealsPerDay as string) || "4", 10);
  const bodyFatPercent = values.bodyFatPercent as number | undefined;

  // Get weight in kg
  let weightKg: number;
  if (unitSystem === "metric") {
    weightKg = (values.weightKg as number) || 77;
  } else {
    const weightLbs = (values.weightLbs as number) || 170;
    weightKg = weightLbs * 0.453592;
  }

  // Get height in cm
  let heightCm: number;
  if (unitSystem === "metric") {
    heightCm = (values.heightCm as number) || 178;
  } else {
    const heightFeet = (values.heightFeet as number) || 5;
    const heightInches = (values.heightInches as number) || 10;
    heightCm = (heightFeet * 12 + heightInches) * 2.54;
  }

  // Calculate BMR using Mifflin-St Jeor equation
  let bmr: number;
  if (gender === "male") {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }

  // Calculate TDEE
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.55;
  const tdee = bmr * multiplier;

  // Apply goal adjustment
  const adjustment = GOAL_ADJUSTMENTS[goal] || 0;
  const targetCalories = Math.round(tdee + adjustment);

  // Get macro ratios
  let ratios = DIET_RATIOS[dietType] || DIET_RATIOS.standard;
  
  if (dietType === "custom") {
    const customProtein = (values.customProtein as number) || 30;
    const customCarbs = (values.customCarbs as number) || 40;
    const customFat = (values.customFat as number) || 30;
    const total = customProtein + customCarbs + customFat;
    
    ratios = {
      protein: (customProtein / total) * 100,
      carbs: (customCarbs / total) * 100,
      fat: (customFat / total) * 100,
    };
  }

  // Calculate macros in grams
  const proteinCals = targetCalories * (ratios.protein / 100);
  const carbsCals = targetCalories * (ratios.carbs / 100);
  const fatCals = targetCalories * (ratios.fat / 100);

  const proteinGrams = Math.round(proteinCals / 4);
  const carbsGrams = Math.round(carbsCals / 4);
  const fatGrams = Math.round(fatCals / 9);

  // Calculate fiber (14g per 1000 calories)
  const fiber = Math.round((targetCalories / 1000) * 14);

  // Calculate protein per lb body weight
  const weightLbs = unitSystem === "imperial" 
    ? ((values.weightLbs as number) || 170) 
    : weightKg * 2.20462;
  const proteinPerLb = proteinGrams / weightLbs;

  // Calculate meal breakdown
  const mealCalories = Math.round(targetCalories / mealsPerDay);
  const mealProtein = Math.round(proteinGrams / mealsPerDay);
  const mealCarbs = Math.round(carbsGrams / mealsPerDay);
  const mealFat = Math.round(fatGrams / mealsPerDay);

  // Generate meal breakdown table data
  const mealNames = ["Breakfast", "Lunch", "Dinner", "Snack 1", "Snack 2", "Snack 3"];
  const tableData = [];
  for (let i = 0; i < mealsPerDay; i++) {
    tableData.push({
      meal: mealNames[i] || `Meal ${i + 1}`,
      calories: mealCalories,
      protein: mealProtein,
      carbs: mealCarbs,
      fat: mealFat,
    });
  }

  // Calculate lean mass protein if body fat provided
  let leanMassProtein: number | null = null;
  if (bodyFatPercent && bodyFatPercent > 0 && bodyFatPercent < 100) {
    const leanMassLbs = weightLbs * (1 - bodyFatPercent / 100);
    leanMassProtein = Math.round(leanMassLbs); // 1g per lb lean mass
  }

  // Build summary
  const goalText = goal === "lose" ? "fat loss" : goal === "gain" ? "muscle building" : goal === "recomp" ? "body recomposition" : "maintenance";
  const summary = `To support ${goalText}, consume ${targetCalories.toLocaleString()} calories daily with ${proteinGrams}g protein, ${carbsGrams}g carbs, and ${fatGrams}g fat. This is based on ${Math.round(ratios.protein)}/${Math.round(ratios.carbs)}/${Math.round(ratios.fat)} macro ratio.`;

  return {
    values: {
      targetCalories,
      proteinGrams,
      carbsGrams,
      fatGrams,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      fiber,
      proteinPerLb,
      mealCalories,
      mealProtein,
      proteinPercent: Math.round(ratios.protein),
      carbsPercent: Math.round(ratios.carbs),
      fatPercent: Math.round(ratios.fat),
      leanMassProtein,
    },
    formatted: {
      targetCalories: targetCalories.toLocaleString(),
      proteinGrams: proteinGrams.toString(),
      carbsGrams: carbsGrams.toString(),
      fatGrams: fatGrams.toString(),
      bmr: Math.round(bmr).toLocaleString(),
      tdee: Math.round(tdee).toLocaleString(),
      fiber: fiber.toString(),
      proteinPerLb: proteinPerLb.toFixed(2),
      mealCalories: mealCalories.toLocaleString(),
      mealProtein: mealProtein.toString(),
    },
    summary,
    isValid: true,
    metadata: {
      tableData,
      ratios,
      weightKg,
      heightCm,
      leanMassProtein,
    },
  };
}

export default macroCalculatorConfig;
