import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";
import { convertToBase, convertFromBase } from "@/engine/v4/units";

/* ═══════════════════════════════════════════════════════════════════
   WEIGHT GAIN CALCULATOR — V4 Engine
   Mifflin-St Jeor BMR → TDEE → Calorie Surplus → Macros → Weekly Plan
   ═══════════════════════════════════════════════════════════════════ */

export const weightGainConfig: CalculatorConfigV4 = {
  id: "weight-gain",
  version: "4.0",
  category: "health",
  icon: "📈",

  // ═══════════════════════════════════════════════════════════════
  // PRESETS
  // ═══════════════════════════════════════════════════════════════
  presets: [
    {
      id: "leanBulk",
      icon: "🐢",
      values: {
        gender: "male",
        age: 25,
        weight: 70,
        height: 178,
        targetWeight: 77,
        activityLevel: "moderate",
        gainPace: "slow",
      },
    },
    {
      id: "steadyBulk",
      icon: "🏋️",
      values: {
        gender: "male",
        age: 28,
        weight: 75,
        height: 180,
        targetWeight: 84,
        activityLevel: "moderate",
        gainPace: "moderate",
      },
    },
    {
      id: "fastBulk",
      icon: "💪",
      values: {
        gender: "male",
        age: 22,
        weight: 63,
        height: 175,
        targetWeight: 73,
        activityLevel: "active",
        gainPace: "aggressive",
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // CHART — Weight gain projection
  // ═══════════════════════════════════════════════════════════════
  chart: {
    id: "weightProjection",
    type: "composed",
    xKey: "week",
    height: 320,
    stacked: false,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "number",
    series: [
      { key: "weight", type: "area", color: "#3b82f6" },
      { key: "goalWeight", type: "line", color: "#10b981", dashed: true },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // TRANSLATIONS — English only, other languages via install script
  // ═══════════════════════════════════════════════════════════════
  t: {
    en: {
      name: "Weight Gain Calculator",
      slug: "weight-gain-calculator",
      subtitle:
        "Calculate daily calories, surplus, and macros to gain weight safely using the Mifflin-St Jeor equation",
      breadcrumb: "Weight Gain",

      seo: {
        title: "Weight Gain Calculator — Calorie Surplus & Macro Plan | Free",
        description:
          "Calculate how many calories you need to gain weight with a personalized weekly plan. Uses Mifflin-St Jeor formula for BMR, TDEE, calorie surplus, and macro targets.",
        shortDescription:
          "Plan your weight gain with personalized calorie and macro targets",
        keywords: [
          "weight gain calculator",
          "calorie surplus calculator",
          "bulking calculator",
          "how many calories to gain weight",
          "muscle gain calorie calculator",
          "TDEE calculator weight gain",
          "macro calculator bulking",
        ],
      },

      calculator: { yourInformation: "Your Information" },
      ui: {
        yourInformation: "Your Information",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      // ─── Inputs ──────────────────────────────────────────────
      inputs: {
        gender: {
          label: "Gender",
          helpText: "BMR formulas differ by biological sex",
          options: { male: "Male", female: "Female" },
        },
        age: {
          label: "Age",
          helpText: "Ages 15–80 for accurate BMR estimation",
        },
        weight: {
          label: "Current Weight",
          helpText: "Your current body weight",
        },
        height: {
          label: "Height",
          helpText: "Your height for BMR calculation",
        },
        targetWeight: {
          label: "Target Weight",
          helpText: "Your goal weight — must be higher than current weight",
        },
        activityLevel: {
          label: "Activity Level",
          helpText: "Your typical weekly exercise routine",
          options: {
            sedentary: "Sedentary (little or no exercise)",
            light: "Lightly Active (1–3 days/week)",
            moderate: "Moderately Active (3–5 days/week)",
            active: "Very Active (6–7 days/week)",
            veryActive: "Extra Active (athlete / physical job)",
          },
        },
        gainPace: {
          label: "Gain Pace",
          helpText: "Slower pace = more lean mass, less fat",
          options: {
            slow: "Slow — 0.5 lb/week (lean bulk)",
            moderate: "Moderate — 1 lb/week (standard)",
            aggressive: "Aggressive — 1.5 lb/week (fast bulk)",
          },
        },
        bodyFatPercent: {
          label: "Body Fat %",
          helpText: "Optional — improves protein recommendation",
          placeholder: "e.g. 18",
        },
      },

      // ─── Input Groups ────────────────────────────────────────
      inputGroups: {},

      // ─── Results ─────────────────────────────────────────────
      results: {
        dailyCalories: { label: "Daily Calories" },
        bmr: { label: "BMR" },
        tdee: { label: "Maintenance (TDEE)" },
        surplusCalories: { label: "Daily Surplus" },
        weeklyGain: { label: "Weekly Gain" },
        timeToGoal: { label: "Time to Goal" },
        proteinTarget: { label: "Protein Target" },
      },

      // ─── Tooltips ────────────────────────────────────────────
      tooltips: {
        dailyCalories:
          "Total daily calories to eat for weight gain (TDEE + surplus)",
        bmr: "Basal Metabolic Rate — calories your body burns at complete rest",
        tdee: "Total Daily Energy Expenditure — calories to maintain current weight",
        surplusCalories:
          "Extra calories above TDEE needed to gain weight",
        weeklyGain: "Estimated weight gain per week at this surplus",
        timeToGoal:
          "Estimated time to reach your target weight at the selected pace",
        proteinTarget:
          "Recommended daily protein intake for lean muscle gain",
      },

      // ─── Presets ─────────────────────────────────────────────
      presets: {
        leanBulk: {
          label: "Lean Bulk",
          description: "Conservative approach — minimize fat gain",
        },
        steadyBulk: {
          label: "Steady Bulk",
          description: "Balanced muscle gain at moderate pace",
        },
        fastBulk: {
          label: "Fast Bulk",
          description: "Aggressive surplus for beginners or hardgainers",
        },
      },

      // ─── Values (dynamic translations) ───────────────────────
      values: {
        cal: "cal",
        kcal: "kcal",
        g: "g",
        kg: "kg",
        lbs: "lbs",
        lb: "lb",
        weeks: "weeks",
        week: "week",
        months: "months",
        month: "month",
        "/day": "/day",
        "/week": "/week",
        "cal/day": "cal/day",
        Underweight: "Underweight",
        Normal: "Normal",
        Overweight: "Overweight",
        Obese: "Obese",
        Week: "Week",
        Goal: "🎯 Goal",
        Protein: "Protein",
        Carbs: "Carbs",
        Fat: "Fat",
      },

      // ─── Formats ─────────────────────────────────────────────
      formats: {
        summary:
          "Eat {dailyCalories} cal/day (+{surplus} surplus) to gain {weeklyGain}/week. Your BMR is {bmr} cal and TDEE is {tdee} cal. Estimated time to reach {targetWeight}: {timeToGoal}.",
      },

      // ─── Info Cards ──────────────────────────────────────────
      infoCards: {
        nutritionTips: {
          title: "🍽️ Nutrition Tips",
          items: [
            "Eat every 3–4 hours to spread your calorie surplus across the day",
            "Prioritize protein at every meal — aim for 25–40g per serving",
            "Choose calorie-dense foods: nuts, avocado, olive oil, whole grains",
            "Track calories for at least 2 weeks to ensure you're actually in surplus",
          ],
        },
        trainingTips: {
          title: "🏋️ Training Tips",
          items: [
            "Follow a progressive overload program — increase weight or reps weekly",
            "Focus on compound lifts: squats, deadlifts, bench press, rows, overhead press",
            "Train each muscle group 2× per week for optimal growth stimulus",
            "Get 7–9 hours of sleep — most muscle recovery happens during deep sleep",
          ],
        },
        quickFacts: {
          title: "📊 Quick Facts",
          items: [
            "1 lb of weight gain requires roughly a 3,500-calorie surplus",
            "Beginners can gain 1.5–2 lbs of muscle per month with proper training",
            "Protein synthesis peaks 24–48 hours after a resistance training session",
            "A 10–20% calorie surplus is the recommended range for lean bulking",
          ],
        },
      },

      // ─── Reference Data ──────────────────────────────────────
      referenceData: {
        activityLevels: {
          title: "Activity Level Multipliers",
          items: {
            sedentary: {
              label: "Sedentary",
              value: "×1.2 — Desk job, little exercise",
            },
            light: {
              label: "Lightly Active",
              value: "×1.375 — Light exercise 1–3 days/week",
            },
            moderate: {
              label: "Moderately Active",
              value: "×1.55 — Moderate exercise 3–5 days/week",
            },
            active: {
              label: "Very Active",
              value: "×1.725 — Hard exercise 6–7 days/week",
            },
            veryActive: {
              label: "Extra Active",
              value: "×1.9 — Athlete or physical job",
            },
          },
        },
      },

      // ─── DetailedTable ───────────────────────────────────────
      detailedTable: {
        weeklyPlan: {
          button: "📋 View Weekly Gain Plan",
          title: "Weekly Weight Gain Plan & Macros",
          columns: {
            week: "Week",
            weight: "Est. Weight",
            dailyCal: "Daily Cal",
            protein: "Protein",
            carbs: "Carbs",
            fat: "Fat",
          },
        },
      },

      // ─── Chart ───────────────────────────────────────────────
      chart: {
        title: "Weight Gain Projection",
        xLabel: "Week",
        yLabel: "Weight (lbs)",
        series: {
          weight: "Projected Weight",
          goalWeight: "Goal Weight",
        },
      },

      // ─── Education ───────────────────────────────────────────
      education: {
        whatIs: {
          title: "What Is a Weight Gain Calculator?",
          content:
            "A weight gain calculator estimates how many calories you need to eat each day to gain weight at a healthy, sustainable pace. It uses your Basal Metabolic Rate (BMR) — the calories your body burns at rest — and adjusts it based on your activity level to find your Total Daily Energy Expenditure (TDEE). By adding a controlled calorie surplus on top of your TDEE, the calculator provides a personalized daily calorie target and macro breakdown to support lean muscle gain while minimizing excess fat accumulation. This approach is far more effective than guessing or simply 'eating more,' because it gives you a precise starting point based on your unique body composition and lifestyle.",
        },
        howItWorks: {
          title: "How the Mifflin-St Jeor Formula Works",
          content:
            "This calculator uses the Mifflin-St Jeor equation, widely regarded as the most accurate BMR formula for healthy adults. For men, BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) + 5. For women, BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) − 161. Your BMR is then multiplied by an activity factor (ranging from 1.2 for sedentary to 1.9 for extremely active) to get your TDEE — the total calories you burn in a day. To gain weight, you eat above your TDEE: a 10% surplus for lean bulking, 15% for moderate gains, or 20% for aggressive weight gain. The surplus is converted to estimated weekly gain using the widely accepted approximation of 3,500 calories per pound of body weight.",
        },
        gainTips: {
          title: "Healthy Weight Gain Strategies",
          items: [
            {
              text: "Eat at a consistent surplus every day — skipping days slows progress significantly",
              type: "info",
            },
            {
              text: "Prioritize protein (1g per lb of bodyweight) to maximize muscle gain over fat",
              type: "info",
            },
            {
              text: "Choose nutrient-dense calorie sources over junk food for long-term health",
              type: "info",
            },
            {
              text: "Resistance training is essential — extra calories without training just adds fat",
              type: "warning",
            },
            {
              text: "Track your weight weekly, not daily — daily fluctuations are normal (water, food timing)",
              type: "info",
            },
            {
              text: "Increase calories by 100–200 if you aren't gaining after 2 consistent weeks",
              type: "info",
            },
          ],
        },
        mistakes: {
          title: "Common Mistakes When Bulking",
          items: [
            {
              text: "Dirty bulking (eating anything) leads to excessive fat gain and health issues",
              type: "warning",
            },
            {
              text: "Not tracking calories — most people overestimate how much they actually eat",
              type: "warning",
            },
            {
              text: "Skipping meals or being inconsistent with eating schedule derails progress",
              type: "info",
            },
            {
              text: "Neglecting sleep and recovery — muscle is built during rest, not in the gym",
              type: "info",
            },
            {
              text: "Setting unrealistic timelines — sustainable gain is 0.5–1 lb per week for most people",
              type: "info",
            },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step examples using the Mifflin-St Jeor formula",
          examples: [
            {
              title: "Male, 25, 155 lbs, 5'10\", Moderate Activity",
              steps: [
                "Convert: 155 lbs = 70.3 kg, 5'10\" = 177.8 cm",
                "BMR = (10 × 70.3) + (6.25 × 177.8) − (5 × 25) + 5 = 1,696 cal",
                "TDEE = 1,696 × 1.55 (moderate) = 2,629 cal/day",
                "Moderate surplus (+15%): 2,629 × 1.15 = 3,023 cal/day",
                "Surplus = 3,023 − 2,629 = 394 cal/day",
                "Weekly gain = (394 × 7) / 3,500 ≈ 0.79 lbs/week",
              ],
              result: "Eat ~3,023 cal/day to gain ~0.8 lbs/week",
            },
            {
              title: "Female, 30, 55 kg, 165 cm, Lightly Active",
              steps: [
                "BMR = (10 × 55) + (6.25 × 165) − (5 × 30) − 161 = 1,271 cal",
                "TDEE = 1,271 × 1.375 (light) = 1,748 cal/day",
                "Slow surplus (+10%): 1,748 × 1.10 = 1,923 cal/day",
                "Surplus = 1,923 − 1,748 = 175 cal/day",
                "Weekly gain = (175 × 7) / 3,500 ≈ 0.35 lbs/week",
              ],
              result: "Eat ~1,923 cal/day to gain ~0.35 lbs/week",
            },
          ],
        },
      },

      // ─── FAQs ────────────────────────────────────────────────
      faqs: [
        {
          question: "How many calories should I eat to gain weight?",
          answer:
            "You need to eat more calories than your body burns (TDEE). A surplus of 10–20% above TDEE is recommended. For most people, this means eating 250–500 extra calories per day, which results in roughly 0.5–1 lb of weight gain per week. Use this calculator to find your exact number based on your age, weight, height, and activity level.",
        },
        {
          question: "What is the Mifflin-St Jeor equation?",
          answer:
            "The Mifflin-St Jeor equation is a scientifically validated formula for estimating Basal Metabolic Rate (BMR). Published in 1990, it has been shown to be more accurate than the older Harris-Benedict equation. It calculates calories burned at rest using your weight, height, age, and gender, then multiplied by an activity factor to estimate total daily energy expenditure.",
        },
        {
          question: "How fast should I gain weight?",
          answer:
            "Research suggests 0.25–0.5% of your bodyweight per week is optimal for lean gains. For a 150 lb person, that is about 0.4–0.75 lbs per week. Faster rates lead to more fat gain relative to muscle. Beginners can gain slightly faster (up to 1 lb/week) since they have greater muscle-building potential in their first year of training.",
        },
        {
          question: "Should I track macros or just calories?",
          answer:
            "Tracking macros (protein, carbs, fat) leads to better results than tracking calories alone. Protein is the most important macro for weight gain — aim for 0.8–1g per pound of bodyweight daily. Fat should be about 25% of total calories for hormonal health. The remaining calories come from carbohydrates, which fuel workouts and recovery.",
        },
        {
          question: "Can I gain muscle without gaining fat?",
          answer:
            "It is very difficult to gain muscle without any fat gain, but you can minimize fat gain by keeping your surplus small (10–15%), eating sufficient protein, following a progressive resistance training program, and getting adequate sleep. Beginners and people returning to training after a break can sometimes gain muscle while losing fat (body recomposition).",
        },
        {
          question: "What if I am not gaining weight?",
          answer:
            "If you are not gaining weight after 2 consistent weeks, you are not in a calorie surplus. Common reasons include: underestimating portion sizes, skipping meals, increased activity burning extra calories, or a higher metabolism than estimated. Increase daily intake by 200–300 calories and reassess after another 2 weeks.",
        },
        {
          question: "What is the difference between BMR and TDEE?",
          answer:
            "BMR (Basal Metabolic Rate) is the calories your body burns at complete rest — just to keep your organs functioning. TDEE (Total Daily Energy Expenditure) includes BMR plus all calories burned from daily activity, exercise, and digesting food. TDEE is always higher than BMR and represents the actual calories you need to maintain your current weight.",
        },
        {
          question: "Is gaining 2 lbs per week safe?",
          answer:
            "For most people, gaining 2 lbs per week means a very large calorie surplus, and a significant portion will be stored as fat rather than muscle. This pace may be appropriate for severely underweight individuals under medical supervision, but for general fitness goals, 0.5–1 lb per week produces a much better muscle-to-fat ratio and is more sustainable long-term.",
        },
      ],

      // ─── Static sections ─────────────────────────────────────
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
      defaultValue: 25,
      min: 15,
      max: 80,
      step: 1,
      suffix: "years",
    },
    
    // ── Weight ─────────────────────────────────────────────
        {
      id: "weight",
      type: "number",
      defaultValue: null,
      placeholder: "180",
      step: 0.5,
      unitType: "weight",
      syncGroup: false,
      defaultUnit: "lbs",
      allowedUnits: ["kg", "lbs"],
    },
    {
      id: "height",
      type: "number",
      defaultValue: null,
      placeholder: "178",
      step: 1,
      unitType: "height",
      syncGroup: false,
      defaultUnit: "cm",
      allowedUnits: ["cm", "m", "in", "ft_in"],
    },
    
    // ── Activity ────────────────────────────────────────────
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

    // ── Target weight ───────────────────────────────────────
            {
      id: "targetWeight",
      type: "number",
      defaultValue: null,
      placeholder: "200",
      step: 0.5,
      unitType: "weight",
      syncGroup: false,
      defaultUnit: "lbs",
      allowedUnits: ["kg", "lbs"],
    },
    // ── Gain pace ───────────────────────────────────────────
    {
      id: "gainPace",
      type: "radio",
      defaultValue: "moderate",
      options: [
        { value: "slow" },
        { value: "moderate" },
        { value: "aggressive" },
      ],
    },

    // ── Body fat (optional) ─────────────────────────────────
    {
      id: "bodyFatPercent",
      type: "number",
      defaultValue: null,
      min: 3,
      max: 60,
      step: 0.5,
      suffix: "%",
    },
  ],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════
  results: [
    { id: "dailyCalories", type: "primary", format: "number" },
    { id: "bmr", type: "secondary", format: "number" },
    { id: "tdee", type: "secondary", format: "number" },
    { id: "surplusCalories", type: "secondary", format: "number" },
    { id: "weeklyGain", type: "secondary", format: "text" },
    { id: "timeToGoal", type: "secondary", format: "text" },
    { id: "proteinTarget", type: "secondary", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // DETAILED TABLE
  // ═══════════════════════════════════════════════════════════════
  detailedTable: {
    id: "weeklyPlan",
    columns: [
      { id: "week", label: "Week", align: "left" },
      { id: "weight", label: "Est. Weight", align: "center", highlight: true },
      { id: "dailyCal", label: "Daily Cal", align: "center" },
      { id: "protein", label: "Protein", align: "center" },
      { id: "carbs", label: "Carbs", align: "center" },
      { id: "fat", label: "Fat", align: "center" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // INFO CARDS
  // ═══════════════════════════════════════════════════════════════
  infoCards: [
    { id: "nutritionTips", type: "list", icon: "🍽️", itemCount: 4 },
    { id: "trainingTips", type: "list", icon: "🏋️", itemCount: 4 },
    { id: "quickFacts", type: "horizontal", icon: "📊", itemCount: 4 },
  ],

  // ═══════════════════════════════════════════════════════════════
  // REFERENCE DATA
  // ═══════════════════════════════════════════════════════════════
  referenceData: [],

  // ═══════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "gainTips", type: "list", icon: "✅", itemCount: 6 },
    { id: "mistakes", type: "list", icon: "⚠️", itemCount: 5 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  // ═══════════════════════════════════════════════════════════════
  // FAQs
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
      authors: "Mifflin MD, St Jeor ST, Hill LA, Scott BJ, Daugherty SA, Koh YO",
      year: "1990",
      title:
        "A new predictive equation for resting energy expenditure in healthy individuals",
      source: "The American Journal of Clinical Nutrition, 51(2), 241–247",
      url: "https://academic.oup.com/ajcn/article-abstract/51/2/241/4695104",
    },
    {
      authors: "Frankenfield D, Roth-Yousey L, Compher C",
      year: "2005",
      title:
        "Comparison of predictive equations for resting metabolic rate in healthy nonobese and obese adults: a systematic review",
      source: "Journal of the American Dietetic Association, 105(5), 775–789",
      url: "https://pubmed.ncbi.nlm.nih.gov/15883556/",
    },
    {
      authors: "Iraki J, Fitschen P, Espinar S, Helms E",
      year: "2019",
      title:
        "Nutrition Recommendations for Bodybuilders in the Off-Season: A Narrative Review",
      source: "Sports (Basel), 7(7), 154",
      url: "https://pubmed.ncbi.nlm.nih.gov/31247944/",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MISC CONFIG
  // ═══════════════════════════════════════════════════════════════
  hero: {
    badge: "Health",
    rating: { average: 4.9, count: 3200 },
  },
  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: false,
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
    "body-fat-calculator",
    "macro-calculator",
  ],
  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
  },
};

/* ═══════════════════════════════════════════════════════════════════
   CALCULATE FUNCTION
   ═══════════════════════════════════════════════════════════════════ */

// Activity multipliers (Mifflin-St Jeor standard)
const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

// Surplus multipliers per pace
const PACE_SURPLUS: Record<string, number> = {
  slow: 0.1, // +10%
  moderate: 0.15, // +15%
  aggressive: 0.2, // +20%
};

// Calories per lb of body weight
const CAL_PER_LB = 3500;

export function calculateWeightGain(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;

  // ── Translations ──────────────────────────────────────────
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read inputs ───────────────────────────────────────────
  const gender = (values.gender as string) || "male";
  const age = values.age as number;
  const activityLevel = (values.activityLevel as string) || "moderate";
  const gainPace = (values.gainPace as string) || "moderate";
  const bodyFatPercent = values.bodyFatPercent as number | null;

  // ── Convert to metric using Unit Engine ───────────────────
  const rawWeight = values.weight as number | null;
  const rawHeight = values.height as number | null;
  const rawTarget = values.targetWeight as number | null;

  if (!rawWeight || !rawHeight || !rawTarget) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const weightKg = convertToBase(rawWeight, fieldUnits.weight || "lbs", "weight");
  const heightCm = convertToBase(rawHeight, fieldUnits.height || "cm", "height");
  const targetWeightKg = convertToBase(rawTarget, fieldUnits.targetWeight || "lbs", "weight");

  // For display: convert to user's selected unit
  const weightUnit = fieldUnits.weight || "lbs";
  const currentWeightDisplay = rawWeight;
  const targetWeightDisplay = rawTarget;

  // Internal lbs for protein calculations
  const currentWeightLbs = convertFromBase(weightKg, "lbs", "weight");
  const targetWeightLbs = convertFromBase(targetWeightKg, "lbs", "weight");

  // ── Validate target > current ─────────────────────────────
  if (targetWeightKg <= weightKg) {
    return {
      values: {},
      formatted: {},
      summary: "",
      isValid: false,
    };
  }

  // ── BMR (Mifflin-St Jeor) ────────────────────────────────
  const bmr =
    gender === "male"
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

  // ── TDEE ──────────────────────────────────────────────────
  const activityFactor = ACTIVITY_MULTIPLIERS[activityLevel] || 1.55;
  const tdee = bmr * activityFactor;

  // ── Surplus & daily calories ──────────────────────────────
  const surplusPercent = PACE_SURPLUS[gainPace] || 0.15;
  const dailyCalories = Math.round(tdee * (1 + surplusPercent));
  const surplusCalories = Math.round(dailyCalories - tdee);

  // ── Weekly gain ───────────────────────────────────────────
  const weeklySurplus = surplusCalories * 7;
  const weeklyGainLbs = weeklySurplus / CAL_PER_LB;
  const weeklyGainKg = weeklyGainLbs * 0.453592;

  // ── Time to goal ──────────────────────────────────────────
  const totalGainLbs = targetWeightLbs - currentWeightLbs;
  const weeksToGoal = Math.ceil(totalGainLbs / weeklyGainLbs);
  const daysToGoal = weeksToGoal * 7;

  // ── Protein target ────────────────────────────────────────
  let proteinGrams: number;
  if (bodyFatPercent && bodyFatPercent > 0) {
    // Use lean mass for protein calc: 1.2g per lb of lean mass
    const leanMassLbs = currentWeightLbs * (1 - bodyFatPercent / 100);
    proteinGrams = Math.round(leanMassLbs * 1.2);
  } else {
    // Standard: 1g per lb of bodyweight
    proteinGrams = Math.round(currentWeightLbs);
  }

  // ── Macro split ───────────────────────────────────────────
  const proteinCal = proteinGrams * 4;
  const fatCal = Math.round(dailyCalories * 0.25);
  const fatGrams = Math.round(fatCal / 9);
  const carbCal = dailyCalories - proteinCal - fatCal;
  const carbGrams = Math.round(carbCal / 4);

  // ── Translated units ──────────────────────────────────────
  const calUnit = v["cal"] || "cal";
  const gUnit = v["g"] || "g";
  const weekLabel = weeksToGoal === 1 ? (v["week"] || "week") : (v["weeks"] || "weeks");
  const weightUnitLabel = v[weightUnit] || weightUnit;
  const weekSingular = v["week"] || "week";

  // ── Format weekly gain ────────────────────────────────────
  const weeklyGainDisplay = weightUnit === "kg" ? weeklyGainKg : weeklyGainLbs;
  const weeklyGainFormatted = `${weeklyGainDisplay.toFixed(2)} ${weightUnitLabel}/${weekSingular}`;

  // ── Format time to goal ───────────────────────────────────
  let timeToGoalFormatted: string;
  if (weeksToGoal > 52) {
    const months = Math.round(weeksToGoal / 4.33);
    const monthLabel =
      months === 1 ? (v["month"] || "month") : (v["months"] || "months");
    timeToGoalFormatted = `~${months} ${monthLabel}`;
  } else {
    timeToGoalFormatted = `~${weeksToGoal} ${weekLabel}`;
  }

  // ── Format target weight ──────────────────────────────────
  const targetFormatted = `${weightUnit === "kg" ? targetWeightKg.toFixed(1) : Math.round(targetWeightLbs)} ${weightUnitLabel}`;

  // ── Summary ───────────────────────────────────────────────
  const summaryTemplate =
    f.summary ||
    "Eat {dailyCalories} cal/day (+{surplus} surplus) to gain {weeklyGain}/week. Your BMR is {bmr} cal and TDEE is {tdee} cal. Estimated time to reach {targetWeight}: {timeToGoal}.";

  const summary = summaryTemplate
    .replace("{dailyCalories}", dailyCalories.toLocaleString())
    .replace("{surplus}", surplusCalories.toLocaleString())
    .replace("{weeklyGain}", weeklyGainFormatted)
    .replace("{bmr}", Math.round(bmr).toLocaleString())
    .replace("{tdee}", Math.round(tdee).toLocaleString())
    .replace("{targetWeight}", targetFormatted)
    .replace("{timeToGoal}", timeToGoalFormatted);

  // ═════════════════════════════════════════════════════════════
  // DETAILED TABLE — Weekly gain plan
  // ═════════════════════════════════════════════════════════════
  const weekLabelCol = v["Week"] || "Week";
  const goalLabel = v["Goal"] || "🎯 Goal";
  const proteinLabel = v["Protein"] || "Protein";
  const carbsLabel = v["Carbs"] || "Carbs";
  const fatLabel = v["Fat"] || "Fat";

  const maxTableWeeks = Math.min(weeksToGoal, 52);
  // If > 26 weeks, show every 2nd week to keep table manageable
  const stepSize = maxTableWeeks > 26 ? 2 : 1;

  const tableData: Record<string, string>[] = [];

  for (let w = stepSize; w <= maxTableWeeks; w += stepSize) {
    const estWeightLbs = currentWeightLbs + weeklyGainLbs * w;
    const estWeightKg = estWeightLbs * 0.453592;

    const estWeightStr = weightUnit === "kg"
        ? `${estWeightKg.toFixed(1)} ${weightUnitLabel}`
        : `${estWeightLbs.toFixed(1)} ${weightUnitLabel}`;

    // Recalculate protein based on projected weight
    const weekProtein = bodyFatPercent
      ? Math.round(estWeightLbs * (1 - bodyFatPercent / 100) * 1.2)
      : Math.round(estWeightLbs);
    const weekProteinCal = weekProtein * 4;
    const weekFatCal = Math.round(dailyCalories * 0.25);
    const weekFatG = Math.round(weekFatCal / 9);
    const weekCarbG = Math.round((dailyCalories - weekProteinCal - weekFatCal) / 4);

    tableData.push({
      week: `${weekLabelCol} ${w}`,
      weight: estWeightStr,
      dailyCal: dailyCalories.toLocaleString(),
      protein: `${weekProtein}${gUnit}`,
      carbs: `${weekCarbG}${gUnit}`,
      fat: `${weekFatG}${gUnit}`,
    });
  }

  // Ensure the final goal row is always shown
  const lastWeek = tableData.length > 0 ? tableData[tableData.length - 1] : null;
  const goalWeightStr = weightUnit === "kg"
      ? `${targetWeightKg.toFixed(1)} ${weightUnitLabel}`
      : `${Math.round(targetWeightLbs)} ${weightUnitLabel}`;

  // If the last row isn't exactly the goal week, add goal row
  if (!lastWeek || !lastWeek.week.includes(`${weeksToGoal}`)) {
    const goalProtein = bodyFatPercent
      ? Math.round(targetWeightLbs * (1 - bodyFatPercent / 100) * 1.2)
      : Math.round(targetWeightLbs);
    const goalProteinCal = goalProtein * 4;
    const goalFatCal = Math.round(dailyCalories * 0.25);
    const goalFatG = Math.round(goalFatCal / 9);
    const goalCarbG = Math.round((dailyCalories - goalProteinCal - goalFatCal) / 4);

    tableData.push({
      week: `${goalLabel} (${weekLabelCol} ${weeksToGoal})`,
      weight: goalWeightStr,
      dailyCal: dailyCalories.toLocaleString(),
      protein: `${goalProtein}${gUnit}`,
      carbs: `${goalCarbG}${gUnit}`,
      fat: `${goalFatG}${gUnit}`,
    });
  }

  // ═════════════════════════════════════════════════════════════
  // CHART DATA — Weight gain projection
  // ═════════════════════════════════════════════════════════════
  const chartData: Array<Record<string, unknown>> = [];
  const maxChartWeeks = Math.min(weeksToGoal, 104);

  let chartStep: number;
  if (maxChartWeeks <= 26) chartStep = 1;
  else if (maxChartWeeks <= 52) chartStep = 2;
  else chartStep = 4;

  const goalWeightDisplay = weightUnit === "kg"
      ? Math.round(targetWeightKg * 10) / 10
      : Math.round(targetWeightLbs * 10) / 10;

  // Week 0 — starting point
  chartData.push({
    week: "W0",
    weight: weightUnit === "kg"
        ? Math.round(weightKg * 10) / 10
        : Math.round(currentWeightLbs * 10) / 10,
    goalWeight: goalWeightDisplay,
  });

  for (let w = chartStep; w <= maxChartWeeks; w += chartStep) {
    const projWeightLbs = currentWeightLbs + weeklyGainLbs * w;
    const projWeightKg = projWeightLbs * 0.453592;

    const displayWeight = weightUnit === "kg"
        ? Math.round(projWeightKg * 10) / 10
        : Math.round(projWeightLbs * 10) / 10;

    chartData.push({
      week: `W${w}`,
      weight: Math.min(displayWeight, goalWeightDisplay),
      goalWeight: goalWeightDisplay,
    });

    if (projWeightLbs >= targetWeightLbs) break;
  }

  // Ensure final goal point
  const lastChart = chartData[chartData.length - 1];
  if ((lastChart.weight as number) < goalWeightDisplay) {
    chartData.push({
      week: `W${weeksToGoal}`,
      weight: goalWeightDisplay,
      goalWeight: goalWeightDisplay,
    });
  }

  // ═════════════════════════════════════════════════════════════
  // RETURN
  // ═════════════════════════════════════════════════════════════
  return {
    values: {
      dailyCalories,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      surplusCalories,
      weeklyGain: weeklyGainLbs,
      timeToGoal: daysToGoal,
      proteinTarget: proteinGrams,
      // Macro values for potential distribution bars
      proteinGrams,
      carbGrams,
      fatGrams,
    },
    formatted: {
      dailyCalories: `${dailyCalories.toLocaleString()} ${calUnit}`,
      bmr: `${Math.round(bmr).toLocaleString()} ${calUnit}`,
      tdee: `${Math.round(tdee).toLocaleString()} ${calUnit}`,
      surplusCalories: `+${surplusCalories.toLocaleString()} ${calUnit}`,
      weeklyGain: weeklyGainFormatted,
      timeToGoal: timeToGoalFormatted,
      proteinTarget: `${proteinGrams} ${gUnit}/${v["day"] || "day"}`,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default weightGainConfig;
