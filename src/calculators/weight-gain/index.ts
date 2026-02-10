import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";
import { convertToBase, convertFromBase } from "@/engine/v4/units";

/* ═══════════════════════════════════════════════════════════════════
   WEIGHT GAIN CALCULATOR — V4.3 Toggle Upgrade (2026-02-10)
   New: Toggle "Show Metabolic Details" + Toggle "Show Body Composition"
   New: Katch-McArdle BMR, BMI current→goal, gain quality rating,
        weekly gain as % bodyweight, lean vs fat estimate
   New: "Underweight Recovery" + "Female Lean Bulk" presets
   Preserved: Mifflin-St Jeor, TDEE, surplus, macros, weekly plan, chart
   ═══════════════════════════════════════════════════════════════════ */

export const weightGainConfig: CalculatorConfigV4 = {
  id: "weight-gain",
  version: "4.3",
  category: "health",
  icon: "📈",

  // ═══════════════════════════════════════════════════════════════
  // PRESETS (5 presets)
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
        bodyFatPercent: null,
        showMetabolic: false,
        showBodyComp: false,
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
        bodyFatPercent: null,
        showMetabolic: false,
        showBodyComp: false,
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
        bodyFatPercent: null,
        showMetabolic: false,
        showBodyComp: false,
      },
    },
    {
      id: "underweightRecovery",
      icon: "🩺",
      values: {
        gender: "male",
        age: 20,
        weight: 55,
        height: 175,
        targetWeight: 65,
        activityLevel: "light",
        gainPace: "moderate",
        bodyFatPercent: 10,
        showMetabolic: true,
        showBodyComp: true,
      },
    },
    {
      id: "femaleLeanBulk",
      icon: "🌸",
      values: {
        gender: "female",
        age: 26,
        weight: 55,
        height: 165,
        targetWeight: 60,
        activityLevel: "moderate",
        gainPace: "slow",
        bodyFatPercent: 22,
        showMetabolic: false,
        showBodyComp: true,
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
  // TRANSLATIONS — English only
  // ═══════════════════════════════════════════════════════════════
  t: {
    en: {
      name: "Weight Gain Calculator",
      slug: "weight-gain-calculator",
      subtitle:
        "Calculate daily calories, surplus, macros, and body composition tracking to gain weight safely with Mifflin-St Jeor and Katch-McArdle formulas",
      breadcrumb: "Weight Gain",

      seo: {
        title: "Weight Gain Calculator — Calorie Surplus, Macros & Body Composition | Free",
        description:
          "Calculate how many calories you need to gain weight with a personalized weekly plan. Uses Mifflin-St Jeor and Katch-McArdle BMR, TDEE, calorie surplus, macro targets, BMI tracking, and gain quality analysis.",
        shortDescription:
          "Plan your weight gain with personalized calorie, macro, and body composition targets",
        keywords: [
          "weight gain calculator",
          "calorie surplus calculator",
          "bulking calculator",
          "how many calories to gain weight",
          "muscle gain calorie calculator",
          "TDEE calculator weight gain",
          "macro calculator bulking",
          "lean bulk calculator",
          "body recomposition calculator",
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
            slow: "Lean Bulk",
            moderate: "Standard",
            aggressive: "Fast Bulk",
          },
          descriptions: {
            slow: "0.5 lb/wk",
            moderate: "1 lb/wk",
            aggressive: "1.5 lb/wk",
          },
        },
        bodyFatPercent: {
          label: "Body Fat %",
          helpText: "Optional — enables Katch-McArdle BMR and body composition analysis",
          placeholder: "e.g. 18",
        },
        showMetabolic: {
          label: "Show Metabolic Details",
          helpText: "Toggle on to see BMR formulas, TDEE breakdown, and surplus percentage",
        },
        showBodyComp: {
          label: "Show Body Composition",
          helpText: "Toggle on to see BMI tracking, gain quality rating, and lean vs fat estimates",
        },
      },

      // ─── Input Groups ────────────────────────────────────────
      inputGroups: {},

      // ─── Results ─────────────────────────────────────────────
      results: {
        dailyCalories: { label: "Daily Calories" },
        surplusCalories: { label: "Daily Surplus" },
        weeklyGain: { label: "Weekly Gain" },
        timeToGoal: { label: "Time to Goal" },
        proteinTarget: { label: "Protein Target" },
        carbsTarget: { label: "Carbs Target" },
        fatTarget: { label: "Fat Target" },
        // Metabolic (toggle)
        bmrMifflin: { label: "BMR (Mifflin-St Jeor)" },
        bmrKatch: { label: "BMR (Katch-McArdle)" },
        tdee: { label: "Maintenance (TDEE)" },
        surplusPercent: { label: "Surplus %" },
        // Body composition (toggle)
        currentBmi: { label: "Current BMI" },
        goalBmi: { label: "Goal BMI" },
        gainRate: { label: "Weekly Gain (% BW)" },
        gainQuality: { label: "Gain Quality" },
        leanFatRatio: { label: "Est. Lean vs Fat" },
      },

      // ─── Tooltips ────────────────────────────────────────────
      tooltips: {
        dailyCalories:
          "Total daily calories to eat for weight gain (TDEE + surplus)",
        surplusCalories:
          "Extra calories above TDEE needed to gain weight",
        weeklyGain: "Estimated weight gain per week at this surplus",
        timeToGoal:
          "Estimated time to reach your target weight at the selected pace",
        proteinTarget:
          "Recommended daily protein intake for lean muscle gain (1g/lb)",
        carbsTarget:
          "Daily carbohydrate target for energy and recovery",
        fatTarget:
          "Daily fat target for hormonal health (~25% of calories)",
        bmrMifflin:
          "Basal Metabolic Rate using Mifflin-St Jeor (age, gender, weight, height)",
        bmrKatch:
          "Basal Metabolic Rate using Katch-McArdle (lean body mass — requires body fat %)",
        tdee:
          "Total Daily Energy Expenditure — calories to maintain current weight",
        surplusPercent:
          "Your surplus as a percentage of TDEE — 10-20% is recommended for bulking",
        currentBmi:
          "Your current Body Mass Index based on weight and height",
        goalBmi:
          "Your projected BMI at target weight — track BMI change over your bulk",
        gainRate:
          "Weekly gain as percentage of body weight — 0.25-0.5% is optimal for lean gains",
        gainQuality:
          "Rating based on gain rate relative to body weight — slower = leaner",
        leanFatRatio:
          "Estimated split of muscle vs fat gain based on surplus size and body fat",
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
        underweightRecovery: {
          label: "Underweight Recovery",
          description: "20yo male, 55kg, underweight — moderate gain with full analysis ON",
        },
        femaleLeanBulk: {
          label: "Female Lean Bulk",
          description: "26yo female, 55kg, slow pace — body composition ON",
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
        day: "day",
        "/day": "/day",
        "/week": "/week",
        "cal/day": "cal/day",
        "% BW/wk": "% BW/wk",
        Underweight: "Underweight",
        Normal: "Normal",
        Overweight: "Overweight",
        Obese: "Obese",
        Week: "Week",
        Goal: "🎯 Goal",
        Protein: "Protein",
        Carbs: "Carbs",
        Fat: "Fat",
        "Requires body fat %": "Requires body fat %",
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
        yLabel: "Weight",
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
          title: "How the BMR Formulas Work",
          content:
            "This calculator uses two BMR formulas. The Mifflin-St Jeor equation is the gold standard for most people: for men, BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) + 5; for women, BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) − 161. If you enter body fat percentage, the Katch-McArdle formula (BMR = 370 + 21.6 × lean mass in kg) is also calculated and used for more accurate results. Your BMR is multiplied by an activity factor (1.2 to 1.9) to get your TDEE. To gain weight, you eat above your TDEE: a 10% surplus for lean bulking, 15% for moderate gains, or 20% for aggressive weight gain. The surplus is converted to estimated weekly gain using ~3,500 calories per pound.",
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
          question: "What does 'gain quality' mean?",
          answer:
            "Gain quality measures how your weekly weight gain compares to the optimal range of 0.25–0.5% of body weight per week. Within this range, you maximize the ratio of muscle to fat gained. Below 0.25% is very lean but slow, and above 0.5% means a larger portion of the weight gained will likely be fat rather than muscle. The body composition toggle shows your gain quality rating.",
        },
        {
          question: "Why does the calculator show two BMR formulas?",
          answer:
            "The Mifflin-St Jeor formula uses age, gender, weight, and height — accurate for most people. The Katch-McArdle formula uses lean body mass (requires body fat %) and is more accurate for lean or muscular individuals. When you enter body fat %, the calculator uses Katch-McArdle for better precision but shows both results so you can compare. The difference is typically 50-150 calories per day.",
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
      allowedUnits: ["kg", "lbs", "st"],
    },
    {
      id: "height",
      type: "number",
      defaultValue: null,
      placeholder: "178",
      step: 1,
      unitType: "height",
      syncGroup: false,
      defaultUnit: "ft_in",
      allowedUnits: ["cm", "m", "in", "ft_in"],
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
      allowedUnits: ["kg", "lbs", "st"],
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

    // ── 🔘 Toggle: Show Metabolic Details ───────────────────
    {
      id: "showMetabolic",
      type: "toggle",
      defaultValue: false,
    },

    // ── 🔘 Toggle: Show Body Composition ────────────────────
    {
      id: "showBodyComp",
      type: "toggle",
      defaultValue: false,
    },
  ],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════
  results: [
    { id: "dailyCalories", type: "primary", format: "number" },
    { id: "surplusCalories", type: "secondary", format: "number" },
    { id: "weeklyGain", type: "secondary", format: "text" },
    { id: "timeToGoal", type: "secondary", format: "text" },
    { id: "proteinTarget", type: "secondary", format: "text" },
    { id: "carbsTarget", type: "secondary", format: "text" },
    { id: "fatTarget", type: "secondary", format: "text" },
    // Metabolic — visibility controlled by calculate() returning ""
    { id: "bmrMifflin", type: "secondary", format: "text" },
    { id: "bmrKatch", type: "secondary", format: "text" },
    { id: "tdee", type: "secondary", format: "text" },
    { id: "surplusPercent", type: "secondary", format: "text" },
    // Body composition — visibility controlled by calculate() returning ""
    { id: "currentBmi", type: "secondary", format: "text" },
    { id: "goalBmi", type: "secondary", format: "text" },
    { id: "gainRate", type: "secondary", format: "text" },
    { id: "gainQuality", type: "secondary", format: "text" },
    { id: "leanFatRatio", type: "secondary", format: "text" },
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
  // INFO CARDS (2 list + 1 horizontal tips)
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
    { id: "8" },
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
    {
      authors: "Hall KD, Heymsfield SB, Kemnitz JW, Klein S, Schoeller DA, Speakman JR",
      year: "2012",
      title:
        "Energy balance and its components: implications for body weight regulation",
      source: "The American Journal of Clinical Nutrition, 95(4), 989–994",
      url: "https://pubmed.ncbi.nlm.nih.gov/22434603/",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MISC CONFIG
  // ═══════════════════════════════════════════════════════════════
  hero: {
    badge: "Health",
    highlight: "dual BMR formulas, body composition tracking, macro plan",
  },
  sidebar: {
    tips: [
      "Enter body fat % to unlock Katch-McArdle BMR and body composition analysis",
      "Toggle 'Body Composition' to track BMI change and gain quality",
      "Use the weekly plan table to see projected weight and macros over time",
      "Aim for 0.25-0.5% of body weight per week for optimal lean gains",
    ],
  },
  features: {
    highlights: [
      "Dual BMR formulas (Mifflin-St Jeor + Katch-McArdle)",
      "BMI tracking from current to goal weight",
      "Gain quality rating with % bodyweight analysis",
      "Estimated lean vs fat gain ratio",
      "Weekly projection chart and detailed plan table",
      "Complete macro breakdown (protein, carbs, fat)",
    ],
  },
  relatedCalculators: [
    "calorie-calculator",
    "bmi-calculator",
    "body-fat-calculator",
    "macro-calculator",
  ],
  ads: {
    topBanner: true,
    sidebar: true,
    inContent: false,
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

  // Toggle states
  const showMetabolic = values.showMetabolic === true;
  const showBodyComp = values.showBodyComp === true;

  // ── Convert to metric using Unit Engine ───────────────────
  const rawWeight = values.weight as number | null;
  const rawHeight = values.height as number | null;
  const rawTarget = values.targetWeight as number | null;

  if (!rawWeight || !rawHeight || !rawTarget) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const weightUnit = fieldUnits.weight || "lbs";
  const heightUnit = fieldUnits.height || "ft_in";

  const weightKg = convertToBase(rawWeight, weightUnit, "weight");
  const heightCm = heightUnit === "ft_in"
    ? rawHeight
    : convertToBase(rawHeight, heightUnit, "height");
  const targetWeightKg = convertToBase(rawTarget, fieldUnits.targetWeight || weightUnit, "weight");

  // Internal lbs for protein calculations
  const currentWeightLbs = convertFromBase(weightKg, "lbs", "weight");
  const targetWeightLbs = convertFromBase(targetWeightKg, "lbs", "weight");

  // ── Validate target > current ─────────────────────────────
  if (targetWeightKg <= weightKg) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── BMR: Mifflin-St Jeor ────────────────────────────────
  const bmrMifflin =
    gender === "male"
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

  // ── BMR: Katch-McArdle (optional) ────────────────────────
  let bmrKatch: number | null = null;
  if (bodyFatPercent != null && bodyFatPercent > 0) {
    const leanMassKg = weightKg * (1 - bodyFatPercent / 100);
    bmrKatch = 370 + 21.6 * leanMassKg;
  }

  // Use Katch-McArdle if available, otherwise Mifflin
  const bmrUsed = bmrKatch !== null ? bmrKatch : bmrMifflin;

  // ── TDEE ──────────────────────────────────────────────────
  const activityFactor = ACTIVITY_MULTIPLIERS[activityLevel] || 1.55;
  const tdee = bmrUsed * activityFactor;

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
    const leanMassLbs = currentWeightLbs * (1 - bodyFatPercent / 100);
    proteinGrams = Math.round(leanMassLbs * 1.2);
  } else {
    proteinGrams = Math.round(currentWeightLbs);
  }

  // ── Macro split ───────────────────────────────────────────
  const proteinCal = proteinGrams * 4;
  const fatCal = Math.round(dailyCalories * 0.25);
  const fatGrams = Math.round(fatCal / 9);
  const carbCal = dailyCalories - proteinCal - fatCal;
  const carbGrams = Math.round(carbCal / 4);

  // ── BMI calculations ──────────────────────────────────────
  const heightM = heightCm / 100;
  const currentBmi = weightKg / (heightM * heightM);
  const goalBmi = targetWeightKg / (heightM * heightM);

  // ── Gain rate as % bodyweight per week ────────────────────
  const gainRatePercent = (weeklyGainLbs / currentWeightLbs) * 100;

  // ── Gain quality rating ───────────────────────────────────
  let gainQuality = "";
  if (gainRatePercent <= 0.25) {
    gainQuality = "🐢 Very Lean — minimal fat gain, slower progress";
  } else if (gainRatePercent <= 0.50) {
    gainQuality = "🟢 Optimal — best muscle-to-fat ratio";
  } else if (gainRatePercent <= 0.75) {
    gainQuality = "🟡 Moderate — some extra fat gain expected";
  } else {
    gainQuality = "🔴 Aggressive — significant fat gain likely";
  }

  // ── Lean vs fat estimate ──────────────────────────────────
  // Based on research: smaller surplus → higher lean %, larger → more fat
  let leanPercent: number;
  if (surplusPercent <= 0.10) {
    leanPercent = 70; // lean bulk
  } else if (surplusPercent <= 0.15) {
    leanPercent = 55; // moderate
  } else {
    leanPercent = 40; // aggressive
  }
  const fatPercent = 100 - leanPercent;
  const leanFatLabel = `~${leanPercent}% muscle / ~${fatPercent}% fat`;

  // ── BMI category helper ───────────────────────────────────
  const bmiCategory = (bmi: number): string => {
    if (bmi < 18.5) return v["Underweight"] || "Underweight";
    if (bmi < 25) return v["Normal"] || "Normal";
    if (bmi < 30) return v["Overweight"] || "Overweight";
    return v["Obese"] || "Obese";
  };

  // ── Translated units ──────────────────────────────────────
  const calUnit = v["cal"] || "cal";
  const gUnit = v["g"] || "g";
  const weekLabel = weeksToGoal === 1 ? (v["week"] || "week") : (v["weeks"] || "weeks");
  const weightUnitLabel = v[weightUnit] || weightUnit;
  const weekSingular = v["week"] || "week";
  const reqBfLabel = v["Requires body fat %"] || "Requires body fat %";
  const bwWkUnit = v["% BW/wk"] || "% BW/wk";
  const dayLabel = v["day"] || "day";

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
    .replace("{bmr}", Math.round(bmrUsed).toLocaleString())
    .replace("{tdee}", Math.round(tdee).toLocaleString())
    .replace("{targetWeight}", targetFormatted)
    .replace("{timeToGoal}", timeToGoalFormatted);

  // ═════════════════════════════════════════════════════════════
  // DETAILED TABLE — Weekly gain plan
  // ═════════════════════════════════════════════════════════════
  const weekLabelCol = v["Week"] || "Week";
  const goalLabel = v["Goal"] || "🎯 Goal";

  const maxTableWeeks = Math.min(weeksToGoal, 52);
  const stepSize = maxTableWeeks > 26 ? 2 : 1;

  const tableData: Record<string, string>[] = [];

  for (let w = stepSize; w <= maxTableWeeks; w += stepSize) {
    const estWeightLbs = currentWeightLbs + weeklyGainLbs * w;
    const estWeightKg = estWeightLbs * 0.453592;

    const estWeightStr = weightUnit === "kg"
      ? `${estWeightKg.toFixed(1)} ${weightUnitLabel}`
      : `${estWeightLbs.toFixed(1)} ${weightUnitLabel}`;

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

  // Ensure the final goal row
  const lastWeek = tableData.length > 0 ? tableData[tableData.length - 1] : null;
  const goalWeightStr = weightUnit === "kg"
    ? `${targetWeightKg.toFixed(1)} ${weightUnitLabel}`
    : `${Math.round(targetWeightLbs)} ${weightUnitLabel}`;

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
      bmrMifflin: Math.round(bmrMifflin),
      bmrKatch: bmrKatch !== null ? Math.round(bmrKatch) : null,
      tdee: Math.round(tdee),
      surplusCalories,
      weeklyGain: weeklyGainLbs,
      timeToGoal: daysToGoal,
      proteinTarget: proteinGrams,
      proteinGrams,
      carbGrams,
      fatGrams,
      currentBmi,
      goalBmi,
    },
    formatted: {
      dailyCalories: `${dailyCalories.toLocaleString()} ${calUnit}`,
      surplusCalories: `+${surplusCalories.toLocaleString()} ${calUnit}`,
      weeklyGain: weeklyGainFormatted,
      timeToGoal: timeToGoalFormatted,
      proteinTarget: `${proteinGrams} ${gUnit}/${dayLabel}`,
      carbsTarget: `${carbGrams} ${gUnit}/${dayLabel}`,
      fatTarget: `${fatGrams} ${gUnit}/${dayLabel}`,
      // Metabolic — hidden when toggle OFF
      bmrMifflin: showMetabolic ? `${Math.round(bmrMifflin).toLocaleString()} ${calUnit}` : "",
      bmrKatch: showMetabolic
        ? (bmrKatch !== null
          ? `${Math.round(bmrKatch).toLocaleString()} ${calUnit}`
          : reqBfLabel)
        : "",
      tdee: showMetabolic ? `${Math.round(tdee).toLocaleString()} ${calUnit}` : "",
      surplusPercent: showMetabolic ? `+${Math.round(surplusPercent * 100)}%` : "",
      // Body composition — hidden when toggle OFF
      currentBmi: showBodyComp ? `${currentBmi.toFixed(1)} (${bmiCategory(currentBmi)})` : "",
      goalBmi: showBodyComp ? `${goalBmi.toFixed(1)} (${bmiCategory(goalBmi)})` : "",
      gainRate: showBodyComp ? `${gainRatePercent.toFixed(2)} ${bwWkUnit}` : "",
      gainQuality: showBodyComp ? gainQuality : "",
      leanFatRatio: showBodyComp ? leanFatLabel : "",
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
