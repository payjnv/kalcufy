import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ─── CONFIG ─────────────────────────────────────────────────────────────────
export const intermittentFastingConfig: CalculatorConfigV4 = {
  id: "intermittent-fasting",
  version: "4.0",
  category: "health",
  icon: "⏰",

  // ─── PRESETS ────────────────────────────────────────────────────────────────
  presets: [
    {
      id: "beginner",
      icon: "🌱",
      values: {
        gender: "female",
        age: 30,
        weight: 150,
        height: 165.1,
        activityLevel: "light",
        fastingMethod: "16_8",
        goal: "lose",
        mealsPerDay: "3",
        firstMealTime: "12",
      },
    },
    {
      id: "weightLoss",
      icon: "🔥",
      values: {
        gender: "male",
        age: 35,
        weight: 200,
        height: 177.8,
        activityLevel: "moderate",
        fastingMethod: "18_6",
        goal: "lose",
        mealsPerDay: "3",
        firstMealTime: "12",
      },
    },
    {
      id: "advanced",
      icon: "⚡",
      values: {
        gender: "male",
        age: 28,
        weight: 185,
        height: 180.3,
        activityLevel: "active",
        fastingMethod: "20_4",
        goal: "recomp",
        mealsPerDay: "2",
        firstMealTime: "14",
      },
    },
  ],

  // ─── TRANSLATIONS (EN ONLY) ─────────────────────────────────────────────────
  t: {
    en: {
      name: "Intermittent Fasting Calculator",
      slug: "intermittent-fasting",
      subtitle: "Plan your fasting schedule, calculate daily calories and macros, and see your estimated results.",
      breadcrumb: "IF Calculator",

      seo: {
        title: "Intermittent Fasting Calculator - Free Meal Plan Tool",
        description: "Plan your intermittent fasting schedule with calorie and macro calculations. Compare 7 methods including 16:8, 18:6, OMAD, and 5:2 with per-meal breakdowns.",
        shortDescription: "Calculate your fasting schedule, calories, and macros.",
        keywords: [
          "intermittent fasting calculator",
          "IF calculator",
          "16:8 fasting calculator",
          "fasting schedule calculator",
          "intermittent fasting meal plan",
          "free fasting calculator",
          "OMAD calculator",
          "fasting calories calculator",
        ],
      },

      calculator: { yourInformation: "Your Information" },
      ui: {
        yourInformation: "Your Information",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        gender: {
          label: "Gender",
          helpText: "Affects basal metabolic rate calculation",
          options: { male: "Male", female: "Female" },
        },
        age: {
          label: "Age",
          helpText: "Your current age in years",
        },
        weight: {
          label: "Weight",
          helpText: "Your current body weight",
        },
        height: {
          label: "Height",
          helpText: "Your current height",
        },
        activityLevel: {
          label: "Activity Level",
          helpText: "Your typical weekly physical activity",
          options: {
            sedentary: "Sedentary (office job, little exercise)",
            light: "Lightly Active (1-3 days/week)",
            moderate: "Moderately Active (3-5 days/week)",
            active: "Very Active (6-7 days/week)",
            veryActive: "Extremely Active (athlete, physical job)",
          },
        },
        fastingMethod: {
          label: "Fasting Method",
          helpText: "Choose your intermittent fasting protocol",
          options: {
            "12_12": "12:12 — 12h fast, 12h eat (Beginner)",
            "14_10": "14:10 — 14h fast, 10h eat (Easy)",
            "16_8": "16:8 — 16h fast, 8h eat (Popular)",
            "18_6": "18:6 — 18h fast, 6h eat (Intermediate)",
            "20_4": "20:4 — 20h fast, 4h eat (Warrior)",
            "23_1": "23:1 — OMAD, One Meal a Day (Advanced)",
            "5_2": "5:2 — 5 days normal, 2 days ~500 cal",
          },
        },
        goal: {
          label: "Goal",
          helpText: "What you want to achieve with fasting",
          options: {
            lose: "Lose Weight",
            maintain: "Maintain Weight",
            recomp: "Body Recomposition",
          },
        },
        mealsPerDay: {
          label: "Meals Per Day",
          helpText: "Number of meals within your eating window",
          options: {
            "2": "2 Meals",
            "3": "3 Meals",
            "4": "4 Meals",
          },
        },
        firstMealTime: {
          label: "First Meal Time",
          helpText: "When you want to break your fast",
          options: {
            "7": "7:00 AM",
            "8": "8:00 AM",
            "9": "9:00 AM",
            "10": "10:00 AM",
            "11": "11:00 AM",
            "12": "12:00 PM",
            "13": "1:00 PM",
            "14": "2:00 PM",
          },
        },
      },

      results: {
        dailyCalories: { label: "Daily Calories" },
        bmr: { label: "Basal Metabolic Rate" },
        tdee: { label: "Total Daily Energy" },
        eatingWindow: { label: "Eating Window" },
        fastingHours: { label: "Fasting Hours" },
        protein: { label: "Protein" },
        carbs: { label: "Carbohydrates" },
        fat: { label: "Fat" },
        caloriesPerMeal: { label: "Calories Per Meal" },
        estimatedWeeklyLoss: { label: "Est. Weekly Change" },
      },

      presets: {
        beginner: {
          label: "Beginner",
          description: "16:8 method with light activity — great starting point",
        },
        weightLoss: {
          label: "Weight Loss",
          description: "18:6 method with moderate activity for faster results",
        },
        advanced: {
          label: "Advanced",
          description: "20:4 warrior method for experienced fasters",
        },
      },

      values: {
        cal: "cal",
        kcal: "kcal",
        g: "g",
        lbs: "lbs",
        kg: "kg",
        "lbs/week": "lbs/week",
        "kg/week": "kg/week",
        hours: "hours",
        hour: "hour",
        to: "to",
        am: "AM",
        pm: "PM",
        meals: "meals",
        meal: "meal",
        normalDays: "normal days",
        restrictedDays: "restricted days",
      },

      formats: {
        summary: "Eat {calories} cal/day in a {eatingHours}h window ({method}). Target: {protein}g protein, {carbs}g carbs, {fat}g fat per day.",
      },

      infoCards: {
        nutrition: {
          title: "Your Daily Nutrition",
          items: [
            { label: "Daily Calories", valueKey: "dailyCalories" },
            { label: "Protein", valueKey: "protein" },
            { label: "Carbohydrates", valueKey: "carbs" },
            { label: "Fat", valueKey: "fat" },
          ],
        },
        schedule: {
          title: "Your Fasting Schedule",
          items: [
            { label: "Eating Window", valueKey: "eatingWindow" },
            { label: "Fasting Hours", valueKey: "fastingHours" },
            { label: "Calories Per Meal", valueKey: "caloriesPerMeal" },
            { label: "Est. Weekly Change", valueKey: "estimatedWeeklyLoss" },
          ],
        },
        tips: {
          title: "Fasting Tips",
          items: [
            "Stay hydrated — drink water, black coffee, and plain tea during your fast. Zero-calorie beverages don't break your fast.",
            "Start with a shorter fast like 12:12 or 14:10 and gradually increase. Your body needs 1-2 weeks to adapt.",
            "Break your fast with protein and healthy fats first, then add carbs. This prevents blood sugar spikes.",
            "Schedule workouts near the end of your fast or right after eating for best performance and recovery.",
          ],
        },
      },

      detailedTable: {
        methodComparison: {
          button: "View All Fasting Methods",
          title: "Fasting Method Comparison",
          columns: {
            method: "Method",
            fastHours: "Fast",
            eatHours: "Eat",
            difficulty: "Difficulty",
            bestFor: "Best For",
            schedule: "Example Schedule",
          },
        },
      },

      education: {
        whatIs: {
          title: "What Is Intermittent Fasting?",
          content: "Intermittent fasting (IF) is an eating pattern that cycles between periods of fasting and eating. Unlike traditional diets that focus on what you eat, IF focuses on when you eat. The most popular method is 16:8, where you fast for 16 hours and eat within an 8-hour window. Research published in the New England Journal of Medicine (2019) shows that intermittent fasting can improve metabolic health, reduce inflammation, and promote cellular repair through a process called autophagy. During fasting, your body shifts from using glucose as its primary fuel to burning stored fat, typically entering a state of ketosis after 12-16 hours without food.",
        },
        howItWorks: {
          title: "How This Calculator Works",
          content: "This calculator uses the Mifflin-St Jeor equation to estimate your Basal Metabolic Rate (BMR) based on your gender, age, weight, and height. It then multiplies your BMR by an activity factor to determine your Total Daily Energy Expenditure (TDEE). Based on your goal — lose weight, maintain, or body recomposition — it adjusts your daily calorie target. For weight loss, it applies a 20% caloric deficit; for recomposition, a 10% deficit with higher protein. Finally, it distributes your daily macronutrients (protein, carbs, fat) across your chosen number of meals within your eating window, giving you a complete per-meal breakdown.",
        },
        benefits: {
          title: "Science-Backed Benefits of IF",
          items: [
            { text: "Fat burning increases significantly after 12+ hours of fasting as the body depletes glycogen stores and switches to fat oxidation (ketosis)", type: "info" },
            { text: "Autophagy — cellular cleanup and repair — activates during extended fasting periods, removing damaged proteins and organelles", type: "info" },
            { text: "Insulin sensitivity improves, reducing the risk of type 2 diabetes. Studies show fasting can lower fasting insulin by 20-31%", type: "info" },
            { text: "Human Growth Hormone (HGH) levels can increase up to 5x during fasting, supporting muscle preservation and fat loss", type: "info" },
            { text: "Inflammation markers (CRP, IL-6) decrease with regular fasting, potentially reducing risk of chronic diseases", type: "info" },
            { text: "Warning: IF is not recommended for pregnant or breastfeeding women, people with eating disorders, type 1 diabetes, or children under 18", type: "warning" },
          ],
        },
        methods: {
          title: "Fasting Methods Explained",
          items: [
            { text: "12:12 — Equal split between fasting and eating. Ideal for beginners since overnight sleep covers most of the fast", type: "info" },
            { text: "14:10 — Slightly longer fast. Skip late-night snacking and delay breakfast by 1-2 hours for easy compliance", type: "info" },
            { text: "16:8 — The most researched and popular method. Skip breakfast, eat from noon to 8 PM. Sustainable long-term", type: "info" },
            { text: "18:6 — Intermediate protocol. Two larger meals with better autophagy activation and deeper ketosis", type: "info" },
            { text: "20:4 (Warrior) — Advanced method with a 4-hour eating window. Usually one main meal plus a small snack", type: "warning" },
            { text: "5:2 — Eat normally 5 days per week, restrict to 500-600 calories on 2 non-consecutive days. More flexible schedule", type: "info" },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step examples of how fasting calories are calculated",
          examples: [
            {
              title: "Male, 30, 180 lbs, 5'10\", Moderate Activity, 16:8, Lose Weight",
              steps: [
                "BMR = 10 × 81.6kg + 6.25 × 177.8cm − 5 × 30 + 5 = 1,778 cal",
                "TDEE = 1,778 × 1.55 (moderate) = 2,756 cal",
                "Weight loss target = 2,756 × 0.80 = 2,205 cal/day",
                "Protein = 180g (1g per lb), Fat = 61g (25%), Carbs = 208g (remaining)",
                "3 meals → 735 cal/meal (60g protein, 20g fat, 69g carbs each)",
              ],
              result: "Eat 2,205 cal/day from 12 PM to 8 PM — lose ~1.1 lbs/week",
            },
            {
              title: "Female, 28, 140 lbs, 5'5\", Light Activity, 14:10, Maintain",
              steps: [
                "BMR = 10 × 63.5kg + 6.25 × 165.1cm − 5 × 28 − 161 = 1,368 cal",
                "TDEE = 1,368 × 1.375 (light) = 1,881 cal",
                "Maintenance target = 1,881 cal/day (no deficit)",
                "Protein = 112g (0.8g per lb), Fat = 63g (30%), Carbs = 218g",
                "3 meals → 627 cal/meal in a 10-hour eating window",
              ],
              result: "Eat 1,881 cal/day from 9 AM to 7 PM — maintain current weight",
            },
          ],
        },
      },

      faqs: [
        {
          question: "Does coffee break my fast?",
          answer: "Black coffee, plain tea, and water do not break your fast. They contain virtually zero calories and may even enhance fasting benefits by boosting metabolism. However, adding cream, sugar, milk, or artificial sweeteners can trigger an insulin response and technically break your fast. If you need flavor, a small squeeze of lemon in water is generally acceptable.",
        },
        {
          question: "Which fasting method is best for beginners?",
          answer: "The 16:8 method is the most popular starting point because it's simple and sustainable — you essentially skip breakfast and stop eating after dinner. If 16 hours feels too long, start with 12:12 or 14:10 for the first 1-2 weeks, then gradually extend your fasting window. The key is consistency, not intensity.",
        },
        {
          question: "Will I lose muscle while fasting?",
          answer: "Not if you eat enough protein and do resistance training. Intermittent fasting actually increases Human Growth Hormone (HGH) levels, which helps preserve muscle. Aim for 0.8-1.2g of protein per pound of body weight, prioritize protein-rich foods when breaking your fast, and maintain your strength training routine. Most research shows IF preserves lean mass better than continuous calorie restriction.",
        },
        {
          question: "Can women do intermittent fasting safely?",
          answer: "Yes, but women may need a gentler approach. Some research suggests that extended fasting (18+ hours) can affect female hormones, particularly if you're already lean or under stress. Women are often advised to start with 14:10 or 16:8 and avoid fasting on consecutive days initially. Pregnant or breastfeeding women should not practice IF. If you notice menstrual irregularities, reduce your fasting window.",
        },
        {
          question: "How long does it take to see results from intermittent fasting?",
          answer: "Most people notice initial changes within 2-4 weeks, including reduced bloating and improved energy. Significant fat loss typically becomes visible at 4-8 weeks with consistent fasting and appropriate calorie intake. Weight loss averages 0.5-2 lbs per week depending on your caloric deficit. The metabolic benefits like improved insulin sensitivity can be measured within 2-3 weeks.",
        },
        {
          question: "Should I exercise while fasting?",
          answer: "Yes, moderate exercise during fasting is safe and can enhance fat burning. Light cardio, yoga, and moderate strength training work well in a fasted state. For intense workouts, consider scheduling them near the end of your fast or within your eating window for better performance. Always listen to your body — if you feel dizzy or weak, eat something and adjust your schedule.",
        },
        {
          question: "What should I eat to break my fast?",
          answer: "Break your fast with easily digestible, nutrient-dense foods. Start with protein (eggs, chicken, fish, Greek yogurt) and healthy fats (avocado, nuts, olive oil), then add complex carbohydrates. Avoid breaking your fast with sugary foods, processed carbs, or large portions — this can cause digestive discomfort and blood sugar spikes. A balanced meal with 30-40g of protein is ideal.",
        },
        {
          question: "Is the 5:2 method effective for weight loss?",
          answer: "Yes, the 5:2 method is effective and may be easier for people who prefer not to fast daily. On restricted days, you eat 500-600 calories (typically as one or two small meals). Research from the University of Illinois shows similar weight loss results between 5:2 and daily calorie restriction. The advantage is psychological — knowing you can eat normally most days improves adherence.",
        },
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

      chart: {
        title: "Per-Meal Macro Distribution",
        xLabel: "Meal",
        yLabel: "Grams",
        series: {
          protein: "Protein",
          carbs: "Carbs",
          fat: "Fat",
        },
      },
    },
  },

  // ─── INPUTS ─────────────────────────────────────────────────────────────────
  inputs: [
    {
      id: "gender",
      type: "radio",
      defaultValue: "male",
      options: [{ value: "male" }, { value: "female" }],
    },
    {
      id: "age",
      type: "number",
      defaultValue: 30,
      min: 18,
      max: 80,
      suffix: "years",
    },
    {
      id: "weight",
      type: "number",
      defaultValue: null,
      placeholder: "180",
      unitType: "weight",
      syncGroup: false,
      defaultUnit: "lbs",
      allowedUnits: ["kg", "lbs", "st"],
    },
    {
      id: "height",
      type: "number",
      defaultValue: null,
      placeholder: "70",
      unitType: "height",
      syncGroup: false,
      defaultUnit: "ft_in",
      allowedUnits: ["cm", "m", "in", "ft_in"],
    },
    {
      id: "activityLevel",
      type: "select",
      defaultValue: "moderate",
      options: [
        { value: "sedentary" },
        { value: "light" },
        { value: "moderate" },
        { value: "active" },
        { value: "veryActive" },
      ],
    },
    {
      id: "fastingMethod",
      type: "select",
      defaultValue: "16_8",
      options: [
        { value: "12_12" },
        { value: "14_10" },
        { value: "16_8" },
        { value: "18_6" },
        { value: "20_4" },
        { value: "23_1" },
        { value: "5_2" },
      ],
    },
    {
      id: "goal",
      type: "radio",
      defaultValue: "lose",
      options: [{ value: "lose" }, { value: "maintain" }, { value: "recomp" }],
    },
    {
      id: "mealsPerDay",
      type: "select",
      defaultValue: "3",
      options: [{ value: "2" }, { value: "3" }, { value: "4" }],
    },
    {
      id: "firstMealTime",
      type: "select",
      defaultValue: "12",
      options: [
        { value: "7" },
        { value: "8" },
        { value: "9" },
        { value: "10" },
        { value: "11" },
        { value: "12" },
        { value: "13" },
        { value: "14" },
      ],
    },
  ],

  inputGroups: [],

  // ─── RESULTS ────────────────────────────────────────────────────────────────
  results: [
    { id: "dailyCalories", type: "primary", format: "number" },
    { id: "bmr", type: "secondary", format: "number" },
    { id: "tdee", type: "secondary", format: "number" },
    { id: "eatingWindow", type: "secondary", format: "text" },
    { id: "fastingHours", type: "secondary", format: "text" },
    { id: "protein", type: "secondary", format: "text" },
    { id: "carbs", type: "secondary", format: "text" },
    { id: "fat", type: "secondary", format: "text" },
    { id: "caloriesPerMeal", type: "secondary", format: "number" },
    { id: "estimatedWeeklyLoss", type: "secondary", format: "text" },
  ],

  // ─── INFOCARDS ──────────────────────────────────────────────────────────────
  infoCards: [
    { id: "nutrition", type: "list", icon: "🍽️", itemCount: 4 },
    { id: "schedule", type: "list", icon: "⏰", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ─── CHART ──────────────────────────────────────────────────────────────────
  chart: {
    id: "mealMacros",
    type: "bar",
    xKey: "meal",
    stacked: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "number",
    series: [
      { key: "protein", color: "#3b82f6", stackId: "macros" },
      { key: "carbs", color: "#22c55e", stackId: "macros" },
      { key: "fat", color: "#f97316", stackId: "macros" },
    ],
  },

  // ─── DETAILED TABLE ─────────────────────────────────────────────────────────
  detailedTable: {
    id: "methodComparison",
    buttonLabel: "View All Fasting Methods",
    buttonIcon: "📊",
    modalTitle: "Fasting Method Comparison",
    columns: [
      { id: "method", label: "Method", align: "left" },
      { id: "fastHours", label: "Fast", align: "center" },
      { id: "eatHours", label: "Eat", align: "center" },
      { id: "difficulty", label: "Difficulty", align: "center" },
      { id: "bestFor", label: "Best For", align: "left" },
      { id: "schedule", label: "Example Schedule", align: "left", highlight: true },
    ],
  },

  referenceData: [],

  // ─── EDUCATION ──────────────────────────────────────────────────────────────
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "benefits", type: "list", icon: "✅", itemCount: 6 },
    { id: "methods", type: "list", icon: "📋", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  // ─── FAQS ───────────────────────────────────────────────────────────────────
  faqs: [
    { id: "0" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
  ],

  // ─── REFERENCES ─────────────────────────────────────────────────────────────
  references: [
    {
      authors: "de Cabo R, Mattson MP",
      year: "2019",
      title: "Effects of Intermittent Fasting on Health, Aging, and Disease",
      source: "New England Journal of Medicine",
      url: "https://www.nejm.org/doi/full/10.1056/NEJMra1905136",
    },
    {
      authors: "Varady KA, Cienfuegos S, Ezpeleta M, Gabel K",
      year: "2022",
      title: "Clinical application of intermittent fasting for weight loss",
      source: "Annual Review of Nutrition",
      url: "https://pubmed.ncbi.nlm.nih.gov/35584800/",
    },
  ],

  hero: { badge: "Popular" },
  sidebar: {},
  features: {},
  relatedCalculators: [
    "calorie",
    "macro",
    "protein",
    "bmi",
    "caloric-deficit",
    "ideal-weight",
  ],
  ads: {},
};

// ─── CALCULATE ────────────────────────────────────────────────────────────────
export function calculateIntermittentFasting(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read inputs ──
  const gender = (values.gender as string) || "male";
  const age = (values.age as number) || 30;
  const activityLevel = (values.activityLevel as string) || "moderate";
  const fastingMethod = (values.fastingMethod as string) || "16_8";
  const goal = (values.goal as string) || "lose";
  const mealsPerDay = parseInt((values.mealsPerDay as string) || "3", 10);
  const firstMealHour = parseInt((values.firstMealTime as string) || "12", 10);

  // ── Convert units to base (weight → kg, height → cm) ──
  const rawWeight = values.weight as number | null;
  const rawHeight = values.height as number | null;

  if (rawWeight === null || rawWeight === undefined || rawHeight === null || rawHeight === undefined) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const weightKg = convertToBase(rawWeight, fieldUnits.weight || "lbs", "weight");
  const heightCm = convertToBase(rawHeight, fieldUnits.height || "ft_in", "height");

  if (weightKg <= 0 || heightCm <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Calculate BMR (Mifflin-St Jeor) ──
  let bmr: number;
  if (gender === "male") {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }
  bmr = Math.round(bmr);

  // ── Calculate TDEE ──
  const ACTIVITY_MULTIPLIERS: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };
  const activityMultiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.55;
  const tdee = Math.round(bmr * activityMultiplier);

  // ── Apply goal adjustment ──
  let dailyCalories: number;
  let goalMultiplier: number;
  switch (goal) {
    case "lose":
      goalMultiplier = 0.80; // 20% deficit
      break;
    case "recomp":
      goalMultiplier = 0.90; // 10% deficit
      break;
    default: // maintain
      goalMultiplier = 1.0;
  }
  dailyCalories = Math.round(tdee * goalMultiplier);

  // ── Fasting method config ──
  const METHODS: Record<string, { fastH: number; eatH: number }> = {
    "12_12": { fastH: 12, eatH: 12 },
    "14_10": { fastH: 14, eatH: 10 },
    "16_8": { fastH: 16, eatH: 8 },
    "18_6": { fastH: 18, eatH: 6 },
    "20_4": { fastH: 20, eatH: 4 },
    "23_1": { fastH: 23, eatH: 1 },
    "5_2": { fastH: 0, eatH: 24 },
  };
  const method = METHODS[fastingMethod] || METHODS["16_8"];

  // ── For 5:2, calculate restricted day calories ──
  let restrictedDayCal = 0;
  let effectiveDailyCal = dailyCalories;
  if (fastingMethod === "5_2") {
    restrictedDayCal = gender === "male" ? 600 : 500;
    // Weekly average: (5 × dailyCal + 2 × restrictedCal) / 7
    effectiveDailyCal = Math.round((5 * dailyCalories + 2 * restrictedDayCal) / 7);
  }

  // ── Calculate eating/fasting window times ──
  const eatStart = firstMealHour;
  const eatEnd = fastingMethod === "5_2" ? 24 : (firstMealHour + method.eatH) % 24;

  // ── Macros ──
  const weightLbs = weightKg * 2.20462;

  // Protein: based on goal
  let proteinPerLb: number;
  switch (goal) {
    case "lose":
      proteinPerLb = 1.0;
      break;
    case "recomp":
      proteinPerLb = 1.2;
      break;
    default:
      proteinPerLb = 0.8;
  }
  const proteinG = Math.round(weightLbs * proteinPerLb);
  const proteinCal = proteinG * 4;

  // Fat: 25% for deficit, 30% for maintain/recomp
  const fatPercent = goal === "lose" ? 0.25 : 0.30;
  const fatCal = Math.round(dailyCalories * fatPercent);
  const fatG = Math.round(fatCal / 9);

  // Carbs: remaining
  const carbsCal = Math.max(0, dailyCalories - proteinCal - fatCal);
  const carbsG = Math.round(carbsCal / 4);

  // ── Per-meal breakdown ──
  const effectiveMeals = fastingMethod === "23_1" ? 1 : mealsPerDay;
  const calPerMeal = Math.round(dailyCalories / effectiveMeals);
  const proteinPerMeal = Math.round(proteinG / effectiveMeals);
  const carbsPerMeal = Math.round(carbsG / effectiveMeals);
  const fatPerMeal = Math.round(fatG / effectiveMeals);

  // ── Estimated weekly weight change ──
  const dailyDeficit = tdee - dailyCalories;
  const weeklyDeficit = fastingMethod === "5_2"
    ? (5 * (tdee - dailyCalories) + 2 * (tdee - restrictedDayCal))
    : dailyDeficit * 7;
  const weeklyLossLbs = Math.abs(weeklyDeficit / 3500);
  const weeklyLossKg = weeklyLossLbs * 0.453592;

  // ── Format time helper ──
  function fmtTime(hour24: number): string {
    const amPm = v["am"] || "AM";
    const pmPm = v["pm"] || "PM";
    if (hour24 === 0 || hour24 === 24) return `12:00 ${amPm}`;
    if (hour24 === 12) return `12:00 ${pmPm}`;
    if (hour24 < 12) return `${hour24}:00 ${amPm}`;
    return `${hour24 - 12}:00 ${pmPm}`;
  }

  // ── Format results ──
  const calUnit = v["kcal"] || "kcal";
  const gUnit = v["g"] || "g";
  const toWord = v["to"] || "to";

  const eatingWindowStr = fastingMethod === "5_2"
    ? `5 ${v["normalDays"] || "normal days"} + 2 ${v["restrictedDays"] || "restricted days"}`
    : `${fmtTime(eatStart)} ${toWord} ${fmtTime(eatEnd)}`;

  const fastingHoursStr = fastingMethod === "5_2"
    ? `${restrictedDayCal} ${calUnit} ${v["restrictedDays"] || "restricted days"}`
    : `${method.fastH} ${v["hours"] || "hours"}`;

  let weeklyChangeStr: string;
  if (dailyDeficit > 0) {
    weeklyChangeStr = `-${weeklyLossLbs.toFixed(1)} ${v["lbs/week"] || "lbs/week"}`;
  } else if (dailyDeficit < 0) {
    weeklyChangeStr = `+${weeklyLossLbs.toFixed(1)} ${v["lbs/week"] || "lbs/week"}`;
  } else {
    weeklyChangeStr = "0";
  }

  // ── Chart data: per-meal macro distribution ──
  const chartData: Array<Record<string, unknown>> = [];
  for (let i = 1; i <= effectiveMeals; i++) {
    chartData.push({
      meal: `${v["meal"] || "Meal"} ${i}`,
      protein: proteinPerMeal,
      carbs: carbsPerMeal,
      fat: fatPerMeal,
    });
  }

  // ── DetailedTable: method comparison ──
  const tableData = [
    { method: "12:12", fastHours: "12h", eatHours: "12h", difficulty: "⭐", bestFor: "Beginners, first-timers", schedule: "7 AM – 7 PM eating" },
    { method: "14:10", fastHours: "14h", eatHours: "10h", difficulty: "⭐⭐", bestFor: "Easy transition, women", schedule: "9 AM – 7 PM eating" },
    { method: "16:8", fastHours: "16h", eatHours: "8h", difficulty: "⭐⭐", bestFor: "Most people, weight loss", schedule: "12 PM – 8 PM eating" },
    { method: "18:6", fastHours: "18h", eatHours: "6h", difficulty: "⭐⭐⭐", bestFor: "Faster results, experienced", schedule: "12 PM – 6 PM eating" },
    { method: "20:4", fastHours: "20h", eatHours: "4h", difficulty: "⭐⭐⭐⭐", bestFor: "Advanced, deep ketosis", schedule: "2 PM – 6 PM eating" },
    { method: "OMAD (23:1)", fastHours: "23h", eatHours: "1h", difficulty: "⭐⭐⭐⭐⭐", bestFor: "Maximum autophagy, experts", schedule: "One meal at 6 PM" },
    { method: "5:2", fastHours: "2 days", eatHours: "5 days", difficulty: "⭐⭐⭐", bestFor: "Flexible schedule, variety", schedule: "Normal M-F, restrict Tu/Th" },
  ];

  // ── Build method label for summary ──
  const methodLabel = fastingMethod === "5_2" ? "5:2" : fastingMethod.replace("_", ":");

  const summary = f.summary
    ? f.summary
        .replace("{calories}", dailyCalories.toLocaleString())
        .replace("{eatingHours}", String(method.eatH))
        .replace("{method}", methodLabel)
        .replace("{protein}", String(proteinG))
        .replace("{carbs}", String(carbsG))
        .replace("{fat}", String(fatG))
    : `Eat ${dailyCalories.toLocaleString()} cal/day (${methodLabel}). ${proteinG}g protein, ${carbsG}g carbs, ${fatG}g fat.`;

  return {
    values: {
      dailyCalories,
      bmr,
      tdee,
      eatingWindow: eatingWindowStr,
      fastingHours: fastingHoursStr,
      protein: proteinG,
      carbs: carbsG,
      fat: fatG,
      caloriesPerMeal: calPerMeal,
      estimatedWeeklyLoss: weeklyChangeStr,
    },
    formatted: {
      dailyCalories: `${dailyCalories.toLocaleString()} ${calUnit}`,
      bmr: `${bmr.toLocaleString()} ${calUnit}`,
      tdee: `${tdee.toLocaleString()} ${calUnit}`,
      eatingWindow: eatingWindowStr,
      fastingHours: fastingHoursStr,
      protein: `${proteinG} ${gUnit}`,
      carbs: `${carbsG} ${gUnit}`,
      fat: `${fatG} ${gUnit}`,
      caloriesPerMeal: `${calPerMeal.toLocaleString()} ${calUnit}`,
      estimatedWeeklyLoss: weeklyChangeStr,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default intermittentFastingConfig;
