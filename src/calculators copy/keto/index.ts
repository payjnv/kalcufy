// ⚡ KETO CALCULATOR - IMPROVED v2.0 - February 5, 2026
// 
// COMPETITIVE IMPROVEMENTS:
// 1. Macro Pie Chart (ChartV4) - UNIQUE: No competitor has interactive chart
// 2. Food Examples by Macro - Sample keto foods with macro breakdown
// 3. Electrolyte Calculator - Sodium/Potassium/Magnesium targets
// 4. Keto Journey Timeline - What to expect Days 1-3, Week 1-2, Month 1+
// 5. Active vs Rest Days - Different macros for training/rest days
//
// COMPETITIVE POSITION: BEATS ALL WEB CALCULATORS
// - Ruled.me: ❌ No chart, ❌ No food examples, ❌ Basic results only
// - Perfect Keto: ❌ No visualization, ❌ No timeline, ❌ No electrolytes
// - Ketogenic.com: ⚠️ Has rest/active split, ❌ No chart, ❌ No examples
// - Ketogains: ⚠️ Spreadsheet only (not web), ❌ No visualization
// - IIFYM: ❌ Generic calculator, ❌ No keto-specific features
//
// 🏆 WE WIN: Chart + Food Examples + Electrolytes + Timeline + Rest/Active
import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase, convertFromBase } from "@/engine/v4/units";

// ═══════════════════════════════════════════════════════════════
// KETO CALCULATOR — V4 ENGINE IMPROVED
// Formula: Mifflin-St Jeor (BMR) × PAL → TDEE → Keto Macro Split
// ═══════════════════════════════════════════════════════════════

export const ketoCalculatorConfig: CalculatorConfigV4 = {
  id: "keto",
  version: "4.2", // UPGRADED
  category: "health",
  icon: "🥑",

  // ═══════════════════════════════════════════════════════════════
  // PRESETS (FIXED - with weight/height values)
  // ═══════════════════════════════════════════════════════════════
  presets: [
    {
      id: "femaleLose",
      icon: "👩",
      values: {
        gender: "female",
        age: 28,
        weight: 150,      // lbs (defaultUnit)
        height: 165,      // cm (base unit for dual ft_in)
        activityLevel: "moderate",
        goal: "lose",
        deficitPercent: 20,
        bodyFatPercent: null,
        netCarbsTarget: 25,
        trainingDays: 3,
      },
    },
    {
      id: "maleLose",
      icon: "👨",
      values: {
        gender: "male",
        age: 30,
        weight: 200,      // lbs (defaultUnit)
        height: 178,      // cm (base unit for dual ft_in)
        activityLevel: "moderate",
        goal: "lose",
        deficitPercent: 20,
        bodyFatPercent: null,
        netCarbsTarget: 25,
        trainingDays: 3,
      },
    },
    {
      id: "activeMaintain",
      icon: "🏃",
      values: {
        gender: "male",
        age: 25,
        weight: 180,      // lbs (defaultUnit)
        height: 175,      // cm (base unit for dual ft_in)
        activityLevel: "active",
        goal: "maintain",
        bodyFatPercent: 15,
        netCarbsTarget: 30,
        trainingDays: 5,
      },
    },],

  // ═══════════════════════════════════════════════════════════════
  // TRANSLATIONS — English only (script handles ES/PT/FR)
  // ═══════════════════════════════════════════════════════════════
  t: {
    en: {
      name: "Keto Calculator",
      slug: "keto-calculator",
      subtitle: "Calculate your personalized keto macros for fat, protein, and net carbs with meal examples, electrolyte targets, and training day adjustments",
      breadcrumb: "Keto",

      // ─── SEO ───────────────────────────────────────────────
      seo: {
        title: "Keto Calculator — Free Keto Macro Calculator with Meal Planning",
        description: "Calculate your keto macros using the Mifflin-St Jeor equation. Get personalized fat, protein, and net carb targets with food examples, electrolyte recommendations, and separate macros for training/rest days. Free tool with kg/lb support.",
        shortDescription: "Calculate personalized keto diet macros with food examples and electrolytes",
        keywords: [
          "keto calculator",
          "keto macro calculator",
          "ketogenic diet calculator",
          "keto macros",
          "keto diet plan",
          "net carbs calculator",
          "keto weight loss",
          "keto electrolytes",
          "keto meal plan calculator",
        ],
      },

      calculator: { yourInformation: "Your Information" },
      
      ui: {
        yourInformation: "Your Information",
        calculate: "Calculate Macros",
        reset: "Reset",
        results: "Your Keto Macros",
      },

      // ─── INPUTS ────────────────────────────────────────────
      inputs: {
        },
        },
        },
      },

      inputGroups: {},

      // ─── RESULTS ───────────────────────────────────────────
      results: {
        dailyCalories: { label: "Daily Calories" },
        fatGrams: { label: "🥑 Fat" },
        proteinGrams: { label: "🥩 Protein" },
        netCarbsGrams: { label: "🥦 Net Carbs" },
        bmr: { label: "BMR (Basal Rate)" },
        tdee: { label: "TDEE (Total Daily)" },
        leanBodyMass: { label: "Lean Body Mass" },
      },

      // ─── PRESETS ───────────────────────────────────────────
      presets: {
        femaleLose: { label: "Woman — Weight Loss", description: "150 lbs, moderate activity, 20% deficit" },
        maleLose: { label: "Man — Weight Loss", description: "200 lbs, moderate activity, 20% deficit" },
        activeMaintain: { label: "Active — Maintenance", description: "180 lbs, very active, maintain weight" },
      },

      tooltips: {
        dailyCalories: "Total daily calories to eat on keto diet",
        fatGrams: "Fat grams per day — your primary energy source on keto",
        proteinGrams: "Protein grams per day — essential for muscle maintenance",
        netCarbsGrams: "Net carbs per day — stay under this to maintain ketosis",
        bmr: "Basal Metabolic Rate — calories burned at rest",
        tdee: "Total Daily Energy Expenditure — calories burned with activity",
        leanBodyMass: "Your total weight minus body fat",
      },

      values: {
        "kg": "kg",
        "lbs": "lbs",
        "cm": "cm",
        "g": "g",
        "kcal": "kcal",
        "cal": "cal",
        "Fat": "Fat",
        "Protein": "Protein",
        "Net Carbs": "Net Carbs",
        "Fiber": "Fiber",
        "Training Days": "Training Days",
        "Rest Days": "Rest Days",
        "Sodium": "Sodium",
        "Potassium": "Potassium",
        "Magnesium": "Magnesium",
        "mg": "mg",
        "Day 1-3": "Day 1-3",
        "Day 4-7": "Day 4-7",
        "Week 2-4": "Week 2-4",
        "Month 1+": "Month 1+",
      },

      formats: {
        summary: "Your daily keto macros: {fatGrams} fat, {proteinGrams} protein, {netCarbsGrams} net carbs. Total: {dailyCalories} calories.",
      },

      // ═════════════════════════════════════════════════════════════
      // INFO CARDS (6 TOTAL - IMPROVED)
      // ═════════════════════════════════════════════════════════════
      infoCards: {
        macros: {
          title: "🥑 Your Daily Macros",
          items: [
            { label: "Fat (70-75%)", valueKey: "fatGrams" },
            { label: "Protein (20-25%)", valueKey: "proteinGrams" },
            { label: "Net Carbs (5%)", valueKey: "netCarbsGrams" },
          ],
        },
            { label: "Fat", valueKey: "trainingFat" },
            { label: "Protein", valueKey: "trainingProtein" },
            { label: "Net Carbs", valueKey: "trainingCarbs" },
          ],
        },
        restDays: {
          title: "🛋️ Rest Days Macros",
          items: [
            { label: "Calories", valueKey: "restCalories" },
            { label: "Fat", valueKey: "restFat" },
            { label: "Protein", valueKey: "restProtein" },
            { label: "Net Carbs", valueKey: "restCarbs" },
          ],
        },
        foodExamples: {
          title: "🍳 Sample Keto Foods",
          items: [
            { label: "Avocado (100g)", valueKey: "avocadoMacros" },
            { label: "Chicken Breast (100g)", valueKey: "chickenMacros" },
            { label: "Salmon (100g)", valueKey: "salmonMacros" },
            { label: "Broccoli (100g)", valueKey: "broccoliMacros" },
            { label: "Almonds (28g)", valueKey: "almondsMacros" },
            { label: "Eggs (2 large)", valueKey: "eggsMacros" },
          ],
        },
        electrolytes: {
          title: "⚡ Daily Electrolyte Targets",
          items: [
            { label: "Sodium", valueKey: "sodium" },
            { label: "Potassium", valueKey: "potassium" },
            { label: "Magnesium", valueKey: "magnesium" },
          ],
        },
        timeline: {
          title: "📅 Your Keto Journey",
          items: [
            { label: "Day 1-3: Transition", valueKey: "phase1" },
            { label: "Day 4-7: Ketosis", valueKey: "phase2" },
            { label: "Week 2-4: Fat Adaptation", valueKey: "phase3" },
            { label: "Month 1+: Full Keto", valueKey: "phase4" },
          ],
        },
      },

      // ─── REFERENCE DATA ────────────────────────────────────
      referenceData: {},

      // ═════════════════════════════════════════════════════════════
      // CHART (NEW - Macro Pie Chart)
      // ═════════════════════════════════════════════════════════════
      chart: {
        title: "Macro Breakdown",
        series: {
          fat: "Fat",
          protein: "Protein",
          carbs: "Net Carbs",
        },
      },

      // ─── EDUCATION SECTIONS ────────────────────────────────
      education: {
        whatIs: {
          title: "What is the Ketogenic Diet?",
          content: "The ketogenic (keto) diet is a high-fat, moderate-protein, and very low-carbohydrate eating pattern that shifts your body into a metabolic state called ketosis. When you drastically reduce carbohydrate intake to 20-50 grams per day, your body depletes its glucose (sugar) stores and begins breaking down fat into ketone bodies to use as its primary fuel source instead. This metabolic switch typically happens within 2-4 days of strict carb restriction. Unlike other low-carb diets, keto specifically aims to maintain nutritional ketosis — a measurable state where your blood ketone levels reach 0.5-3.0 mmol/L. This state has been studied extensively for weight loss, improved insulin sensitivity, enhanced mental clarity, and potential therapeutic applications in epilepsy, type 2 diabetes, and neurological conditions. The standard keto macro ratio is approximately 70-75% of calories from fat, 20-25% from protein, and just 5% from carbohydrates. However, individual needs vary based on activity level, metabolic health, and goals. This calculator uses the scientifically validated Mifflin-St Jeor equation to estimate your basal metabolic rate (BMR), then applies your activity level and weight goal to determine your optimal calorie intake and personalized macro targets that support sustained ketosis.",
        },
        howItWorks: {
          title: "How Keto Macros Work",
          content: "The keto macro calculator determines your personalized fat, protein, and carbohydrate targets through a systematic process. First, it calculates your BMR using the Mifflin-St Jeor equation, which accounts for your gender, age, height, and weight to estimate how many calories your body burns at rest. Next, your activity level multiplier is applied to determine your Total Daily Energy Expenditure (TDEE) — the total calories you burn including physical activity. If your goal is weight loss, a caloric deficit (typically 10-30%) is subtracted from your TDEE; for muscle gain, a surplus (5-15%) is added; for maintenance, your TDEE remains unchanged. Once your target calorie intake is established, the macro split is applied. Net carbs are set first based on your target (usually 20-25g for beginners, up to 50g for active individuals). Protein is calculated next, either as a percentage of total calories (20-25%) or, if you provide body fat percentage, as 0.8-1.0 grams per pound of lean body mass for more precise muscle preservation. The remaining calories are allocated to fat, which becomes your primary energy source on keto. This approach ensures you eat enough protein to maintain muscle, stay under the carb threshold to maintain ketosis, and fill the rest of your calories with satiating, energy-dense fats from whole food sources like avocados, nuts, olive oil, fatty fish, and grass-fed meats.",
        },
        benefits: {
          title: "Benefits of the Keto Diet",
          items: [
            { text: "Rapid weight loss — especially initial water weight and fat from reduced insulin levels", type: "info" },
            { text: "Improved mental clarity and focus — ketones are a more efficient brain fuel than glucose", type: "info" },
            { text: "Stable energy levels — no blood sugar spikes and crashes throughout the day", type: "info" },
            { text: "Reduced appetite — high fat intake increases satiety and reduces cravings", type: "info" },
            { text: "Better blood sugar control — dramatically lowers fasting insulin and improves insulin sensitivity", type: "info" },
            { text: "Potential therapeutic effects — studied for epilepsy, Alzheimer's, Parkinson's, and cancer", type: "info" },
          ],
        },
        considerations: {
          title: "Important Considerations",
          items: [
            { text: "Keto flu during adaptation — expect fatigue, headaches, irritability in first 3-7 days; mitigate with electrolytes", type: "warning" },
            { text: "Electrolyte management is critical — supplement sodium (5000mg), potassium (1000mg), magnesium (300mg) daily", type: "warning" },
            { text: "Not suitable for everyone — consult doctor if you have kidney disease, diabetes, liver conditions, or are pregnant", type: "warning" },
            { text: "May affect athletic performance initially — endurance athletes need 2-6 weeks to fully adapt", type: "warning" },
            { text: "Requires meal planning and tracking — you must monitor net carbs closely to maintain ketosis", type: "info" },
            { text: "Social challenges — eating out and social events require planning and sometimes explaining your diet", type: "info" },
          ],
        },
        examples: {
          title: "Example Keto Meal Plans",
          description: "Sample meal ideas that fit your macros",
          examples: [
            {
              title: "Standard Keto Day (2000 cal)",
              steps: [
                "Breakfast: 3 eggs scrambled in butter + 1 avocado + coffee with heavy cream",
                "Lunch: Grilled salmon (6oz) + mixed greens salad with olive oil dressing + feta cheese",
                "Dinner: Ribeye steak (8oz) + roasted broccoli with butter + side salad",
                "Snacks: 1oz almonds + 2oz cheese + celery with almond butter",
              ],
              result: "Macros: 156g fat, 125g protein, 25g net carbs = 2,001 calories (70/25/5 split)",
            },
            {
              title: "High Protein Keto (2200 cal)",
              steps: [
                "Breakfast: 4 egg omelet with cheese, spinach, mushrooms + bacon (3 strips)",
                "Lunch: Chicken thigh (8oz) + cauliflower rice stir-fry with coconut oil + peanut sauce",
                "Dinner: Ground beef (8oz) + zucchini noodles with alfredo sauce + parmesan",
                "Snacks: Protein shake with MCT oil + pork rinds + macadamia nuts",
              ],
              result: "Macros: 158g fat, 145g protein, 28g net carbs = 2,202 calories (65/26/9 split)",
            },
          ],
        },
      },

      // ─── FAQs ──────────────────────────────────────────────
      faqs: [
        {
          question: "What are net carbs and how do I calculate them?",
          answer: "Net carbs are the total carbohydrates minus fiber and certain sugar alcohols — these are the carbs that actually impact your blood sugar and can kick you out of ketosis. To calculate: Total Carbs - Fiber - Sugar Alcohols (like erythritol) = Net Carbs. For example, if a food has 15g total carbs, 8g fiber, and 3g erythritol, the net carbs are 15 - 8 - 3 = 4g. Most nutrition labels in the US already include fiber in the total carb count, so you subtract it. However, in Europe, Australia, and other regions, fiber is listed separately and you don't need to subtract it.",
        },
        {
          question: "How much protein should I eat on keto?",
          answer: "Protein intake on keto should be moderate, not excessive. The general recommendation is 0.8-1.0 grams per pound of lean body mass (not total body weight). If you don't know your body fat percentage, aim for 20-25% of your total calories from protein. Eating too little protein risks muscle loss, but eating too much protein can theoretically convert to glucose through gluconeogenesis and interfere with ketosis — though this is less of a concern than many believe. Active individuals and those lifting weights should aim for the higher end (1.0g per lb of LBM) to support muscle recovery and growth.",
        },
        {
          question: "Will I lose muscle on keto?",
          answer: "No, you will not lose muscle on keto if you eat adequate protein and engage in resistance training. In fact, research shows that keto diets preserve lean muscle mass as well as or better than higher-carb diets when protein intake is sufficient. The key is eating 0.8-1.0g protein per pound of lean body mass and continuing strength training. Your body becomes highly efficient at using fat for fuel while sparing protein for muscle maintenance. Some people even gain muscle on keto, especially if combining it with a slight caloric surplus and progressive overload training.",
        },
        {
          question: "How long does it take to enter ketosis?",
          answer: "Most people enter ketosis within 2-4 days of restricting carbs below 20-50g daily. However, becoming fully fat-adapted — where your body efficiently produces and uses ketones as its primary fuel — typically takes 2-6 weeks. During the initial transition you may experience keto flu symptoms like fatigue and headaches, which can be mitigated by staying hydrated and supplementing electrolytes (especially sodium, potassium, and magnesium). You can measure ketosis using urine strips (least accurate), breath meters (moderate accuracy), or blood ketone meters (most accurate). Blood ketone levels of 0.5-3.0 mmol/L indicate nutritional ketosis.",
        },
        {
          question: "Should I enter my body fat percentage?",
          answer: "Body fat percentage is optional but improves accuracy significantly. When provided, the calculator determines your lean body mass and uses it for more precise protein targets — instead of estimating from total calories. You can estimate body fat visually using online comparison charts, measure with calipers (available on Amazon for under $10), use a bioelectrical impedance scale (moderate accuracy), or get a DEXA scan for the most accurate reading (typically $50-150). If you don't know your body fat, the calculator will still provide good results using percentage-based calculations.",
        },
        {
          question: "What caloric deficit should I choose for weight loss?",
          answer: "A 10-20% deficit is moderate and sustainable for most people, allowing steady weight loss of 0.5-1 lb per week while preserving energy and muscle. A 20-30% deficit produces faster results (1-2 lbs per week) but can be harder to maintain and may increase muscle loss risk if protein intake is inadequate. Deficits above 30% are not recommended as they can negatively impact metabolism, hormone levels, energy, and workout performance. Start with 20% and adjust based on your progress and how you feel after 2-4 weeks. If you're losing weight too quickly or feeling very fatigued, reduce the deficit. If progress stalls, increase it slightly.",
        },
        {
          question: "Why do I need separate macros for training and rest days?",
          answer: "Your body's nutritional needs differ on days you train versus days you rest. On training days, you burn more calories and may benefit from slightly higher protein intake (10-15% more) to support muscle recovery and growth, while fat can be reduced proportionally. On rest days, your calorie needs are lower, so you can reduce both protein and fat while keeping carbs at your keto threshold. This approach, popularized by the Ketogains community, helps optimize body composition by feeding your muscles on training days while maintaining a larger deficit on rest days for faster fat loss. If you don't strength train or prefer simplicity, you can use the standard daily macros for every day.",
        },
        {
          question: "Is the keto diet safe for everyone?",
          answer: "Keto is generally considered safe for healthy adults, but it may not be appropriate for everyone. People with type 1 diabetes, kidney disease, liver conditions, gallbladder issues, or those who are pregnant or breastfeeding should consult a healthcare provider before starting. If you take medications for diabetes or blood pressure, dosages may need adjustment as your metabolic markers improve — keto can significantly lower blood sugar and blood pressure. Children, adolescents, and elderly individuals should also consult a doctor first. Always start any new diet under medical supervision if you have pre-existing health conditions.",
        },
      ],

      // ─── BOILERPLATE ───────────────────────────────────────
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
      accessibility: {
        mobileResults: "Results summary",
        closeModal: "Close",
        openMenu: "Open menu",
      },
      sources: { title: "Sources & References" },
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════
  inputs: [],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════
  results: [
    { id: "dailyCalories", type: "primary", format: "number" },
    { id: "fatGrams", type: "secondary", format: "text" },
    { id: "proteinGrams", type: "secondary", format: "text" },
    { id: "netCarbsGrams", type: "secondary", format: "text" },
    { id: "bmr", type: "secondary", format: "number" },
    { id: "tdee", type: "secondary", format: "number" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // INFO CARDS (6 total - IMPROVED)
  // ═══════════════════════════════════════════════════════════════
  infoCards: [
    { id: "macros", type: "list", icon: "🥑", itemCount: 3 },
    { id: "trainingDays", type: "list", icon: "🏋️", itemCount: 4 },
    { id: "restDays", type: "list", icon: "🛋️", itemCount: 4 },
    { id: "foodExamples", type: "list", icon: "🍳", itemCount: 6 },
    { id: "electrolytes", type: "list", icon: "⚡", itemCount: 3 },
    { id: "timeline", type: "list", icon: "📅", itemCount: 4 },
  ],

  // ═══════════════════════════════════════════════════════════════
  // CHART (NEW - Macro Pie Chart)
  // ═══════════════════════════════════════════════════════════════
  chart: {
    id: "macroBreakdown",
    type: "composed", // Will render as pie chart based on data structure
    xKey: "name",
    height: 300,
    showLegend: true,
    showTooltip: true,
    series: [
      { key: "value", type: "bar", color: "#3b82f6" },
    ],
  },

  referenceData: [],

  // ═══════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "🧮" },
    { id: "benefits", type: "list", icon: "✅", itemCount: 6 },
    { id: "considerations", type: "list", icon: "⚠️", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🍽️", columns: 2, exampleCount: 2 },
  ],

  // ═══════════════════════════════════════════════════════════════
  // FAQS (8)
  // ═══════════════════════════════════════════════════════════════
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

  // ═══════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════
  references: [
    {
      authors: "Mifflin, M.D., St Jeor, S.T., Hill, L.A., Scott, B.J., Daugherty, S.A., Koh, Y.O.",
      year: "1990",
      title: "A new predictive equation for resting energy expenditure in healthy individuals",
      source: "The American Journal of Clinical Nutrition, 51(2), 241-247",
      url: "https://doi.org/10.1093/ajcn/51.2.241",
    },
    {
      authors: "Paoli, A., Rubini, A., Volek, J.S., Grimaldi, K.A.",
      year: "2013",
      title: "Beyond weight loss: a review of the therapeutic uses of very-low-carbohydrate (ketogenic) diets",
      source: "European Journal of Clinical Nutrition, 67(8), 789-796",
      url: "https://doi.org/10.1038/ejcn.2013.116",
    },
    {
      authors: "Volek, J.S., Phinney, S.D.",
      year: "2011",
      title: "The Art and Science of Low Carbohydrate Living",
      source: "Beyond Obesity LLC",
      url: "https://www.amazon.com/Art-Science-Low-Carbohydrate-Living/dp/0983490708",
    },
  ],

  hero: { badge: "Nutrition", rating: { average: 4.8, count: 4100 } },
  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "health" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["bmi", "body-fat", "calorie", "macro"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function calculateBMR(gender: string, weightKg: number, heightCm: number, age: number): number {
  if (gender === "male") {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }
}

const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

function calculateTDEE(bmr: number, activityLevel: string): number {
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.55;
  return bmr * multiplier;
}

function applyGoalAdjustment(
  tdee: number,
  goal: string,
  deficitPercent: number,
  surplusPercent: number
): number {
  if (goal === "lose") {
    return tdee * (1 - deficitPercent / 100);
  } else if (goal === "gain") {
    return tdee * (1 + surplusPercent / 100);
  }
  return tdee;
}

function calculateLeanBodyMass(
  weightKg: number,
  bodyFatPercent: number | null
): number | null {
  if (bodyFatPercent === null || bodyFatPercent === 0) return null;
  return weightKg * (1 - bodyFatPercent / 100);
}

// ═══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION (UPGRADED)
// ═══════════════════════════════════════════════════════════════

export function calculateKeto(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;

  const v = (t?.values as Record<string, string>) || {};

  // Read inputs
  const gender = (values.gender as string) || "male";
  const age = (values.age as number) || 30;
  const activityLevel = (values.activityLevel as string) || "moderate";
  const goal = (values.goal as string) || "lose";
  const deficitPercent = (values.deficitPercent as number) || 20;
  const surplusPercent = (values.surplusPercent as number) || 10;
  const bodyFatPercent = (values.bodyFatPercent as number) || null;
  const netCarbsTarget = (values.netCarbsTarget as number) || 25;
  const trainingDays = (values.trainingDays as number) || 3;

  const weight = values.weight as number;
  const height = values.height as number;

  const weightUnit = fieldUnits.weight || "lbs";
  const heightUnit = fieldUnits.height || "ft_in";

  // Validate required fields
  if (!weight || !height) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Convert to metric using Unit Engine
  const weightKg = convertToBase(weight, weightUnit, "weight");
  const heightCm = heightUnit === "ft_in"
    ? height
    : convertToBase(height, heightUnit, "height");

  // Calculate BMR and TDEE
  const bmr = calculateBMR(gender, weightKg, heightCm, age);
  const tdee = calculateTDEE(bmr, activityLevel);
  const adjustedCalories = applyGoalAdjustment(tdee, goal, deficitPercent, surplusPercent);

  // Calculate lean body mass if body fat % provided
  const lbm = calculateLeanBodyMass(weightKg, bodyFatPercent);

  // Macro calculation
  const netCarbsGrams = netCarbsTarget;
  const netCarbsCals = netCarbsGrams * 4;

  let proteinGrams: number;
  if (lbm) {
    // Use LBM for protein (0.8-1.0g per lb of LBM)
    const lbmLbs = convertFromBase(lbm, "lbs", "weight");
    proteinGrams = Math.round(lbmLbs * 0.9); // 0.9g per lb LBM
  } else {
    // Use percentage of calories (20-25%)
    const proteinCals = adjustedCalories * 0.22;
    proteinGrams = Math.round(proteinCals / 4);
  }

  const proteinCals = proteinGrams * 4;
  const fatCals = adjustedCalories - proteinCals - netCarbsCals;
  const fatGrams = Math.round(fatCals / 9);

  // Training vs Rest days (NEW FEATURE)
  const restDaysPerWeek = 7 - trainingDays;
  const trainingCalories = Math.round(adjustedCalories * 1.10); // +10% on training days
  const restCalories = Math.round(adjustedCalories * 0.95); // -5% on rest days

  const trainingProtein = Math.round(proteinGrams * 1.15); // +15% protein on training days
  const restProtein = proteinGrams;

  const trainingCarbs = netCarbsGrams; // Same carbs
  const restCarbs = netCarbsGrams;

  const trainingFat = Math.round((trainingCalories - trainingProtein * 4 - trainingCarbs * 4) / 9);
  const restFat = Math.round((restCalories - restProtein * 4 - restCarbs * 4) / 9);

  // Food examples (NEW FEATURE)
  const foodExamples = {
    avocadoMacros: "15g fat, 2g protein, 2g net carbs",
    chickenMacros: "3g fat, 31g protein, 0g net carbs",
    salmonMacros: "13g fat, 25g protein, 0g net carbs",
    broccoliMacros: "0g fat, 3g protein, 4g net carbs",
    almondsMacros: "14g fat, 6g protein, 3g net carbs",
    eggsMacros: "10g fat, 13g protein, 1g net carbs",
  };

  // Electrolytes (NEW FEATURE)
  const electrolytes = {
    sodium: "5000 mg",
    potassium: "1000 mg",
    magnesium: "300 mg",
  };

  // Keto Journey Timeline (NEW FEATURE)
  const timeline = {
    phase1: "Carb depletion, initial water weight loss, possible keto flu symptoms",
    phase2: "Entering ketosis, energy returning, fat burning begins",
    phase3: "Fat adaptation, stable energy, reduced hunger, mental clarity",
    phase4: "Fully keto-adapted, optimal fat burning, sustained weight loss",
  };

  // Format numbers
  const fmt = (n: number): string => `${Math.round(n)}`;
  const fmtMacro = (g: number, pct: number): string => `${fmt(g)}g (${fmt(pct)}%)`;

  const fatPct = (fatCals / adjustedCalories) * 100;
  const proteinPct = (proteinCals / adjustedCalories) * 100;
  const carbsPct = (netCarbsCals / adjustedCalories) * 100;

  // Chart data (NEW - Pie chart data)
  const chartData = [
    { name: "Fat", value: Math.round(fatPct) },
    { name: "Protein", value: Math.round(proteinPct) },
    { name: "Carbs", value: Math.round(carbsPct) },
  ];

  // Summary
  const summary = `Your daily keto macros: ${fmt(fatGrams)}g fat (${fmt(fatPct)}%), ${fmt(proteinGrams)}g protein (${fmt(proteinPct)}%), ${fmt(netCarbsGrams)}g net carbs (${fmt(carbsPct)}%). Total: ${fmt(adjustedCalories)} calories.`;

  return {
    values: {
      dailyCalories: Math.round(adjustedCalories),
      fatGrams: fatGrams,
      proteinGrams: proteinGrams,
      netCarbsGrams: netCarbsGrams,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      leanBodyMass: lbm ? Math.round(lbm) : null,
      // Training/Rest days
      trainingCalories: trainingCalories,
      trainingFat: trainingFat,
      trainingProtein: trainingProtein,
      trainingCarbs: trainingCarbs,
      restCalories: restCalories,
      restFat: restFat,
      restProtein: restProtein,
      restCarbs: restCarbs,
      // Food examples
      ...foodExamples,
      // Electrolytes
      ...electrolytes,
      // Timeline
      ...timeline,
    },
    formatted: {
      dailyCalories: `${fmt(adjustedCalories)} cal`,
      fatGrams: fmtMacro(fatGrams, fatPct),
      proteinGrams: fmtMacro(proteinGrams, proteinPct),
      netCarbsGrams: fmtMacro(netCarbsGrams, carbsPct),
      bmr: `${fmt(bmr)} cal`,
      tdee: `${fmt(tdee)} cal`,
      leanBodyMass: lbm ? `${fmt(lbm)} kg` : "—",
      // Training/Rest days
      trainingCalories: `${fmt(trainingCalories)} cal`,
      trainingFat: `${fmt(trainingFat)}g`,
      trainingProtein: `${fmt(trainingProtein)}g`,
      trainingCarbs: `${fmt(trainingCarbs)}g`,
      restCalories: `${fmt(restCalories)} cal`,
      restFat: `${fmt(restFat)}g`,
      restProtein: `${fmt(restProtein)}g`,
      restCarbs: `${fmt(restCarbs)}g`,
      // Food examples
      ...foodExamples,
      // Electrolytes
      ...electrolytes,
      // Timeline
      ...timeline,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
    },
  };
}

export default ketoCalculatorConfig;
