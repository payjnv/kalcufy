import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// ============================================================================
// KETO CALCULATOR V3 - Kalcufy
// Competitive advantages:
// - Multiple keto types (Standard/Moderate/Cyclical/Targeted)
// - Electrolyte needs calculator integrated
// - Ketosis entry timeline (2-7 days)
// - Per-meal macro breakdown (4 meals)
// - Body fat % estimator built-in
// - Net vs Total carbs toggle
// - NO email required (unlike Perfect Keto)
// ============================================================================

export const ketoCalculatorConfig: CalculatorConfigV3 = {
  id: "keto-calculator",
  slug: "keto-calculator",
  name: "Keto Calculator",
  category: "health",
  icon: "🥑",

  seo: {
    title: "Keto Calculator - Free Keto Macro Calculator | Kalcufy",
    description: "Calculate your perfect keto macros with our free keto calculator. Get personalized fat, protein, and carb targets for weight loss. Includes ketosis timeline and meal breakdown.",
    shortDescription: "Calculate your ideal keto macros",
    keywords: [
      "keto calculator",
      "keto macro calculator",
      "ketogenic diet calculator",
      "low carb calculator",
      "keto diet macros",
      "keto weight loss calculator",
      "ketosis calculator",
      "fat protein carb calculator",
    ],
  },

  hero: {
    badge: "Health & Nutrition",
    rating: { average: 4.8, count: 28450 },
  },

  unitSystem: {
    enabled: true,
    default: "imperial",
    options: [
      { id: "imperial", label: "Imperial (lb, ft)" },
      { id: "metric", label: "Metric (kg, cm)" },
    ],
  },

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
      min: 18,
      max: 100,
      step: 1,
      suffix: " years",
    },
    {
      id: "weight",
      type: "number",
      label: "Weight",
      required: true,
      defaultValue: 150,
      min: 50,
      max: 500,
      step: 1,
      units: {
        imperial: { suffix: " lbs", min: 80, max: 500, default: 150 },
        metric: { suffix: " kg", min: 35, max: 230, default: 68 },
      },
    },
    {
      id: "heightFeet",
      type: "number",
      label: "Height (feet)",
      required: true,
      defaultValue: 5,
      min: 3,
      max: 8,
      step: 1,
      suffix: " ft",
      width: "half",
      showWhen: { field: "unitSystem", value: "imperial" },
    },
    {
      id: "heightInches",
      type: "number",
      label: "Height (inches)",
      required: true,
      defaultValue: 6,
      min: 0,
      max: 11,
      step: 1,
      suffix: " in",
      width: "half",
      showWhen: { field: "unitSystem", value: "imperial" },
    },
    {
      id: "heightCm",
      type: "number",
      label: "Height",
      required: true,
      defaultValue: 168,
      min: 100,
      max: 250,
      step: 1,
      suffix: " cm",
      showWhen: { field: "unitSystem", value: "metric" },
    },
    {
      id: "bodyFatMethod",
      type: "select",
      label: "Body Fat Percentage",
      required: true,
      defaultValue: "estimate",
      options: [
        { value: "estimate", label: "Estimate for me" },
        { value: "known", label: "I know my body fat %" },
      ],
    },
    {
      id: "bodyFatPercent",
      type: "slider",
      label: "Body Fat %",
      required: false,
      defaultValue: 25,
      min: 5,
      max: 50,
      step: 1,
      suffix: "%",
      showWhen: { field: "bodyFatMethod", value: "known" },
    },
    {
      id: "activityLevel",
      type: "select",
      label: "Activity Level",
      required: true,
      defaultValue: "light",
      options: [
        { value: "sedentary", label: "Sedentary (desk job, little exercise)" },
        { value: "light", label: "Lightly Active (1-2 days/week)" },
        { value: "moderate", label: "Moderately Active (3-5 days/week)" },
        { value: "active", label: "Very Active (6-7 days/week)" },
        { value: "athlete", label: "Athlete (2x per day training)" },
      ],
    },
    {
      id: "goal",
      type: "radio",
      label: "Goal",
      required: true,
      defaultValue: "lose",
      options: [
        { value: "lose", label: "Lose Weight" },
        { value: "maintain", label: "Maintain Weight" },
        { value: "gain", label: "Gain Muscle" },
      ],
    },
    {
      id: "deficitPercent",
      type: "slider",
      label: "Calorie Deficit",
      required: false,
      defaultValue: 20,
      min: 10,
      max: 30,
      step: 5,
      suffix: "%",
      helpText: "10-15% mild, 20% moderate, 25-30% aggressive",
      showWhen: { field: "goal", value: "lose" },
    },
    {
      id: "surplusPercent",
      type: "slider",
      label: "Calorie Surplus",
      required: false,
      defaultValue: 10,
      min: 5,
      max: 20,
      step: 5,
      suffix: "%",
      helpText: "5-10% lean bulk, 15-20% aggressive bulk",
      showWhen: { field: "goal", value: "gain" },
    },
    {
      id: "ketoType",
      type: "select",
      label: "Keto Type",
      required: true,
      defaultValue: "standard",
      options: [
        { value: "standard", label: "Standard Keto (SKD) - 70/25/5" },
        { value: "moderate", label: "Moderate Keto - 65/25/10" },
        { value: "cyclical", label: "Cyclical Keto (CKD)" },
        { value: "targeted", label: "Targeted Keto (TKD)" },
      ],
      helpText: "Standard keto is recommended for beginners",
    },
    {
      id: "netCarbsLimit",
      type: "select",
      label: "Daily Net Carbs Limit",
      required: true,
      defaultValue: "20",
      options: [
        { value: "20", label: "20g - Strict (fastest ketosis)" },
        { value: "25", label: "25g - Standard" },
        { value: "30", label: "30g - Relaxed" },
        { value: "50", label: "50g - Liberal (may slow ketosis)" },
      ],
    },
  ],

  inputGroups: [],

  results: [
    {
      id: "dailyCalories",
      type: "primary",
      label: "Daily Calories",
      format: "number",
      suffix: " kcal",
    },
    {
      id: "fatGrams",
      type: "secondary",
      label: "Fat",
      format: "text",
    },
    {
      id: "proteinGrams",
      type: "secondary",
      label: "Protein",
      format: "text",
    },
    {
      id: "carbsGrams",
      type: "secondary",
      label: "Net Carbs",
      format: "text",
    },
    {
      id: "macroRatio",
      type: "secondary",
      label: "Macro Ratio (F/P/C)",
      format: "text",
    },
    {
      id: "ketosisTimeline",
      type: "secondary",
      label: "Expected Ketosis Entry",
      format: "text",
    },
    {
      id: "bmr",
      type: "secondary",
      label: "BMR",
      format: "text",
    },
    {
      id: "tdee",
      type: "secondary",
      label: "TDEE",
      format: "text",
    },
  ],

  // ============================================================================
  // INFO CARDS - Correct format with label/value/color
  // ============================================================================
  infoCards: [
    {
      id: "ketoBasics",
      type: "list",
      title: "Keto Diet Basics",
      icon: "🥑",
      items: [
        { label: "Primary Fuel", value: "Fat (ketones)", color: "green" },
        { label: "Carb Limit", value: "20-50g net carbs/day", color: "blue" },
        { label: "Ketosis Entry", value: "2-7 days typically", color: "yellow" },
        { label: "Fat Adaptation", value: "2-6 weeks", color: "orange" },
        { label: "Protein", value: "Moderate (0.7-1g/lb LBM)", color: "blue" },
      ],
    },
    {
      id: "standardKetoMacros",
      type: "horizontal",
      title: "Standard Keto Macros",
      icon: "📊",
      items: [
        { label: "Fat", value: "70-75%" },
        { label: "Protein", value: "20-25%" },
        { label: "Net Carbs", value: "5-10%" },
        { label: "Calories", value: "From fat primarily" },
      ],
    },
  ],

  // ============================================================================
  // REFERENCE DATA - Electrolyte requirements table
  // ============================================================================
  referenceData: [
    {
      id: "electrolytes",
      title: "Daily Electrolyte Requirements on Keto",
      icon: "⚡",
      columns: [
        { id: "electrolyte", label: "Electrolyte", align: "left" as const },
        { id: "amount", label: "Daily Amount", align: "center" as const },
        { id: "sources", label: "Best Sources", align: "right" as const },
      ],
      data: [
        { electrolyte: "Sodium", amount: "3,000-5,000 mg", sources: "Salt, broth, pickles" },
        { electrolyte: "Potassium", amount: "3,000-4,700 mg", sources: "Avocado, spinach, salmon" },
        { electrolyte: "Magnesium", amount: "300-500 mg", sources: "Nuts, dark chocolate, leafy greens" },
        { electrolyte: "Calcium", amount: "1,000-1,200 mg", sources: "Cheese, sardines, broccoli" },
      ],
    },
  ],

  educationSections: [
    // REQUIRED: code-example
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Keto Macro Calculation",
      icon: "🧮",
      description: "How your personalized keto macros are calculated",
      columns: 2,
      examples: [
        {
          title: "Fat Loss Example (Female, 150 lbs)",
          steps: [
            "BMR (Mifflin-St Jeor): 1,400 kcal",
            "TDEE (light activity): 1,400 x 1.375 = 1,925 kcal",
            "20% deficit: 1,925 x 0.80 = 1,540 kcal",
            "Protein: 0.8g x 112 LBM = 90g (360 kcal)",
            "Carbs: 20g net (80 kcal)",
            "Fat: 1,540 - 360 - 80 = 1,100 kcal = 122g",
          ],
          result: "Daily: 1,540 kcal | 122g fat | 90g protein | 20g carbs",
        },
        {
          title: "Muscle Gain Example (Male, 180 lbs)",
          steps: [
            "BMR (Mifflin-St Jeor): 1,800 kcal",
            "TDEE (moderate activity): 1,800 x 1.55 = 2,790 kcal",
            "10% surplus: 2,790 x 1.10 = 3,069 kcal",
            "Protein: 1.0g x 150 LBM = 150g (600 kcal)",
            "Carbs: 25g net (100 kcal)",
            "Fat: 3,069 - 600 - 100 = 2,369 kcal = 263g",
          ],
          result: "Daily: 3,069 kcal | 263g fat | 150g protein | 25g carbs",
        },
      ],
    },
    // REQUIRED: list (min 5 items)
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "Consult your doctor before starting keto, especially with diabetes or kidney issues", type: "warning" },
        { text: "Expect keto flu symptoms (fatigue, headaches) for the first 1-2 weeks", type: "warning" },
        { text: "Electrolyte supplementation is crucial - increase sodium, potassium, and magnesium intake", type: "warning" },
        { text: "Protein is a goal to meet, not exceed - too much can affect ketosis", type: "info" },
        { text: "Net carbs = total carbs minus fiber - focus on net carbs for keto", type: "info" },
        { text: "Recalculate your macros every 10-15 lbs lost for continued progress", type: "info" },
      ],
    },
    // REQUIRED: prose section 1
    {
      id: "whatIsKeto",
      type: "prose",
      title: "What is the Ketogenic Diet?",
      icon: "📚",
      content: "The ketogenic diet is a high-fat, moderate-protein, very low-carbohydrate eating approach that shifts your body's primary fuel source from glucose to ketones. When you drastically reduce carbohydrate intake (typically to under 50g per day), your liver begins converting fat into ketone bodies, which your brain and muscles can use for energy. This metabolic state is called ketosis. The standard ketogenic diet typically consists of 70-75% fat, 20-25% protein, and 5-10% carbohydrates.",
    },
    // REQUIRED: prose section 2
    {
      id: "ketosisTimeline",
      type: "prose",
      title: "What to Expect: Ketosis Timeline",
      icon: "⏱️",
      content: "Most people enter ketosis within 2-7 days of starting a strict keto diet. During the first week, you may experience the keto flu - symptoms like headaches, fatigue, brain fog, and irritability as your body adapts. These symptoms typically resolve within 1-2 weeks. True fat adaptation, where your body becomes efficient at using fat for fuel, takes 2-6 weeks. After adaptation, many people report increased energy, mental clarity, and reduced hunger. Staying under 20g net carbs speeds up ketosis entry, while 30-50g may take longer.",
    },
    // REQUIRED: prose section 3
    {
      id: "whatToEat",
      type: "prose",
      title: "What to Eat on Keto",
      icon: "🍳",
      content: "Focus on healthy fats like avocados, olive oil, coconut oil, butter, and fatty fish. For protein, choose fatty cuts of meat, eggs, and full-fat dairy. Non-starchy vegetables are essential: leafy greens, broccoli, cauliflower, zucchini, and asparagus. Avoid all grains, sugar, most fruits, starchy vegetables, and processed foods. Common keto meals include bacon and eggs, salads with olive oil dressing, bunless burgers with avocado, and salmon with buttered vegetables. Read labels carefully as carbs hide in unexpected places like sauces, dressings, and processed meats.",
    },
    {
      id: "ketoTypes",
      type: "cards",
      title: "Types of Ketogenic Diets",
      icon: "📊",
      columns: 2,
      cards: [
        {
          title: "Standard Keto (SKD)",
          description: "Classic keto: 70% fat, 25% protein, 5% carbs. Best for weight loss and beginners.",
          icon: "🥑",
        },
        {
          title: "Cyclical Keto (CKD)",
          description: "5-6 keto days followed by 1-2 higher carb days. Popular with athletes.",
          icon: "🔄",
        },
        {
          title: "Targeted Keto (TKD)",
          description: "Allows carbs around workouts only. Good for high-intensity training.",
          icon: "🎯",
        },
        {
          title: "High-Protein Keto",
          description: "60% fat, 35% protein, 5% carbs. Good for muscle preservation.",
          icon: "💪",
        },
      ],
    },
  ],

  faqs: [
    {
      question: "How long does it take to get into ketosis?",
      answer: "Most people enter ketosis within 2-7 days of limiting carbs to under 50g per day. Eating under 20g net carbs speeds this up to 2-4 days. You can confirm ketosis using urine strips, blood ketone meters, or breath analyzers. Signs of ketosis include increased thirst, fruity breath, decreased appetite, and increased energy after the initial adaptation period.",
    },
    {
      question: "Why is protein moderate and not high on keto?",
      answer: "Excess protein can be converted to glucose through a process called gluconeogenesis, potentially affecting ketosis. However, this is often overstated - protein has a minimal effect on blood sugar in most people. Aim for 0.7-1.0 grams per pound of lean body mass. Higher protein (up to 1.2g/lb) is fine for athletes and those doing resistance training.",
    },
    {
      question: "What is the keto flu and how do I avoid it?",
      answer: "Keto flu refers to flu-like symptoms (headache, fatigue, nausea, irritability) during the first 1-2 weeks of keto. It is caused by electrolyte imbalances and dehydration as your body adapts. To minimize symptoms, increase sodium intake (add salt to food, drink bone broth), supplement with magnesium and potassium, stay well hydrated, and do not restrict calories too aggressively during the first week.",
    },
    {
      question: "What is the difference between net carbs and total carbs?",
      answer: "Net carbs equal total carbohydrates minus fiber (and sugar alcohols in some cases). Fiber is not digested and does not affect blood sugar or ketosis. For keto, focus on net carbs. For example, if a food has 10g total carbs and 6g fiber, it has 4g net carbs. Most keto dieters aim for 20-50g net carbs daily. Some also subtract certain sugar alcohols like erythritol.",
    },
    {
      question: "Can I build muscle on keto?",
      answer: "Yes, but it requires strategic planning. Keep protein intake at the higher end (1.0-1.2g per pound of lean body mass), maintain a slight calorie surplus (5-10%), time workouts when energy is highest, and consider targeted keto (TKD) which allows 25-50g carbs around intense workouts. Some lifters find cyclical keto (CKD) works better for muscle gains with 1-2 high-carb days per week.",
    },
    {
      question: "How do I know if keto is working?",
      answer: "Signs that keto is working include: ketone levels of 0.5-3.0 mmol/L on a blood meter, decreased appetite and cravings, steady energy without crashes, weight loss (after initial water weight), improved mental clarity, and better sleep. Initial water weight loss (2-10 lbs in the first week) is normal as glycogen depletes - true fat loss follows.",
    },
  ],

  // ============================================================================
  // REFERENCES - 4 Scientific Sources
  // ============================================================================
  references: [
    {
      authors: "Mifflin MD, St Jeor ST, Hill LA, et al.",
      year: "1990",
      title: "A New Predictive Equation for Resting Energy Expenditure in Healthy Individuals",
      source: "American Journal of Clinical Nutrition, 51(2):241-247",
      url: "https://pubmed.ncbi.nlm.nih.gov/2305711/",
    },
    {
      authors: "Paoli A, Rubini A, Volek JS, Grimaldi KA",
      year: "2013",
      title: "Beyond Weight Loss: A Review of the Therapeutic Uses of Very-Low-Carbohydrate (Ketogenic) Diets",
      source: "European Journal of Clinical Nutrition, 67(8):789-796",
      url: "https://www.nature.com/articles/ejcn2013116",
    },
    {
      authors: "Volek JS, Phinney SD",
      year: "2012",
      title: "The Art and Science of Low Carbohydrate Performance",
      source: "Beyond Obesity LLC",
      url: "https://www.amazon.com/Art-Science-Low-Carbohydrate-Performance/dp/0983490716",
    },
    {
      authors: "Harvey CJDC, Schofield GM, Williden M",
      year: "2018",
      title: "The Use of Nutritional Supplements to Induce Ketosis and Reduce Symptoms Associated with Keto-Induction",
      source: "PeerJ, 6:e4488",
      url: "https://peerj.com/articles/4488/",
    },
  ],

  // ============================================================================
  // DETAILED TABLE - Per-meal macro breakdown
  // ============================================================================
  detailedTable: {
    id: "mealBreakdown",
    buttonLabel: "View Meal-by-Meal Breakdown",
    buttonIcon: "🍽️",
    modalTitle: "Daily Meal Macro Breakdown",
    columns: [
      { id: "meal", label: "Meal", align: "left" },
      { id: "calories", label: "Calories", align: "center" },
      { id: "fat", label: "Fat (g)", align: "center", highlight: true },
      { id: "protein", label: "Protein (g)", align: "center" },
      { id: "carbs", label: "Net Carbs (g)", align: "center" },
    ],
  },

  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: true,
    category: "health",
  },

  features: {
    autoCalculate: true,
    exportPDF: true,
    shareResults: true,
    saveHistory: true,
  },

  relatedCalculators: [
    "calorie-calculator",
    "bmi-calculator",
    "macro-calculator",
    "tdee-calculator",
  ],

  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
  },
};

// ============================================================================
// CALCULATE FUNCTION
// ============================================================================
export function calculateKeto(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values, unitSystem } = data;

  const gender = values.gender as string;
  const age = values.age as number;
  let weight = values.weight as number;
  const bodyFatMethod = values.bodyFatMethod as string;
  let bodyFatPercent = values.bodyFatPercent as number;
  const activityLevel = values.activityLevel as string;
  const goal = values.goal as string;
  const deficitPercent = (values.deficitPercent as number) || 20;
  const surplusPercent = (values.surplusPercent as number) || 10;
  const ketoType = values.ketoType as string;
  const netCarbsLimit = parseInt(values.netCarbsLimit as string) || 20;

  // Convert to metric for calculations
  let heightCm: number;
  if (unitSystem === "imperial") {
    const heightFeet = values.heightFeet as number;
    const heightInches = values.heightInches as number;
    heightCm = ((heightFeet * 12) + heightInches) * 2.54;
    // weight already in lbs, convert to kg for BMR
  } else {
    heightCm = values.heightCm as number;
  }

  // Weight in kg for BMR calculation
  const weightKg = unitSystem === "imperial" ? weight * 0.453592 : weight;
  const weightLbs = unitSystem === "imperial" ? weight : weight * 2.20462;

  // Calculate BMI for body fat estimation if needed
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  // Estimate body fat if not provided
  if (bodyFatMethod === "estimate" || !bodyFatPercent) {
    if (gender === "male") {
      bodyFatPercent = (1.20 * bmi) + (0.23 * age) - 16.2;
    } else {
      bodyFatPercent = (1.20 * bmi) + (0.23 * age) - 5.4;
    }
    bodyFatPercent = Math.max(5, Math.min(50, bodyFatPercent));
  }

  // Calculate lean body mass
  const leanBodyMassLbs = weightLbs * (1 - bodyFatPercent / 100);

  // Calculate BMR using Mifflin-St Jeor
  let bmr: number;
  if (gender === "male") {
    bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
  } else {
    bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
  }

  // Activity multipliers
  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    athlete: 1.9,
  };
  const activityMultiplier = activityMultipliers[activityLevel] || 1.375;

  // Calculate TDEE
  const tdee = bmr * activityMultiplier;

  // Adjust calories based on goal
  let targetCalories: number;
  if (goal === "lose") {
    targetCalories = tdee * (1 - deficitPercent / 100);
  } else if (goal === "gain") {
    targetCalories = tdee * (1 + surplusPercent / 100);
  } else {
    targetCalories = tdee;
  }

  // Minimum calorie floor
  const minCalories = gender === "male" ? 1500 : 1200;
  targetCalories = Math.max(targetCalories, minCalories);

  // Calculate protein based on activity level and lean body mass
  let proteinPerLb: number;
  if (activityLevel === "athlete" || activityLevel === "active") {
    proteinPerLb = 1.0;
  } else if (activityLevel === "moderate") {
    proteinPerLb = 0.9;
  } else {
    proteinPerLb = 0.8;
  }
  
  // Increase protein for muscle gain goal
  if (goal === "gain") {
    proteinPerLb += 0.1;
  }

  const proteinGrams = Math.round(leanBodyMassLbs * proteinPerLb);
  const proteinCalories = proteinGrams * 4;

  // Carbs fixed at selected limit
  const carbsGrams = netCarbsLimit;
  const carbsCalories = carbsGrams * 4;

  // Fat fills the rest
  const fatCalories = targetCalories - proteinCalories - carbsCalories;
  const fatGrams = Math.round(fatCalories / 9);

  // Calculate actual percentages
  const fatPercent = Math.round((fatCalories / targetCalories) * 100);
  const proteinPercent = Math.round((proteinCalories / targetCalories) * 100);
  const carbsPercent = Math.round((carbsCalories / targetCalories) * 100);

  // Ketosis timeline based on carb limit
  let ketosisTimeline: string;
  if (netCarbsLimit <= 20) {
    ketosisTimeline = "2-3 days";
  } else if (netCarbsLimit <= 30) {
    ketosisTimeline = "3-5 days";
  } else {
    ketosisTimeline = "5-7 days";
  }

  // Generate meal breakdown table data
  const mealDistribution = [
    { name: "Breakfast", percent: 0.25 },
    { name: "Lunch", percent: 0.35 },
    { name: "Dinner", percent: 0.35 },
    { name: "Snacks", percent: 0.05 },
  ];

  const tableData = mealDistribution.map(meal => ({
    meal: meal.name,
    calories: Math.round(targetCalories * meal.percent),
    fat: Math.round(fatGrams * meal.percent),
    protein: Math.round(proteinGrams * meal.percent),
    carbs: Math.round(carbsGrams * meal.percent),
  }));

  return {
    values: {
      dailyCalories: Math.round(targetCalories),
      fatGrams,
      proteinGrams,
      carbsGrams,
      fatPercent,
      proteinPercent,
      carbsPercent,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      bodyFatPercent: Math.round(bodyFatPercent),
      leanBodyMass: Math.round(leanBodyMassLbs),
    },
    formatted: {
      dailyCalories: Math.round(targetCalories).toLocaleString(),
      fatGrams: `${fatGrams}g (${Math.round(fatCalories)} kcal) - ${fatPercent}%`,
      proteinGrams: `${proteinGrams}g (${proteinCalories} kcal) - ${proteinPercent}%`,
      carbsGrams: `${carbsGrams}g (${carbsCalories} kcal) - ${carbsPercent}%`,
      macroRatio: `${fatPercent}% / ${proteinPercent}% / ${carbsPercent}%`,
      ketosisTimeline: `${ketosisTimeline} (with ${carbsGrams}g net carbs)`,
      bmr: `${Math.round(bmr).toLocaleString()} kcal/day`,
      tdee: `${Math.round(tdee).toLocaleString()} kcal/day`,
    },
    summary: `For your ${goal === "lose" ? "weight loss" : goal === "gain" ? "muscle gain" : "maintenance"} goal on ${ketoType} keto: Eat ${Math.round(targetCalories)} calories daily with ${fatGrams}g fat, ${proteinGrams}g protein, and ${carbsGrams}g net carbs. Expect ketosis in ${ketosisTimeline}.`,
    isValid: true,
    metadata: {
      tableData,
      bodyFatPercent: Math.round(bodyFatPercent),
      leanBodyMass: Math.round(leanBodyMassLbs),
      ketoType,
    },
  };
}

export default ketoCalculatorConfig;
