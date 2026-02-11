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
    es: {
      "name": "Calculadora de Aumento de Peso",
      "slug": "calculadora-aumento-peso",
      "subtitle": "Calcula calorías diarias, excedente, macros y seguimiento de composición corporal para aumentar de peso de forma segura con las fórmulas Mifflin-St Jeor y Katch-McArdle",
      "breadcrumb": "Aumento de Peso",
      "seo": {
        "title": "Calculadora de Aumento de Peso — Excedente Calórico, Macros y Composición Corporal | Gratis",
        "description": "Calcula cuántas calorías necesitas para aumentar de peso con un plan semanal personalizado. Usa Mifflin-St Jeor y Katch-McArdle para TMB, TDEE, excedente calórico, objetivos de macros, seguimiento de IMC y análisis de calidad de aumento.",
        "shortDescription": "Planifica tu aumento de peso con objetivos personalizados de calorías, macros y composición corporal",
        "keywords": [
          "calculadora aumento peso",
          "calculadora excedente calorico",
          "calculadora bulking",
          "cuantas calorias para ganar peso",
          "calculadora calorias ganancia muscular",
          "calculadora TDEE aumento peso",
          "calculadora macros bulking",
          "calculadora bulking limpio",
          "calculadora recomposicion corporal"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "gender": {
          "label": "Sexo",
          "helpText": "Las fórmulas TMB difieren según el sexo biológico",
          "options": {
            "male": "Masculino",
            "female": "Femenino"
          }
        },
        "age": {
          "label": "Edad",
          "helpText": "Edades 15–80 para estimación precisa de TMB"
        },
        "weight": {
          "label": "Peso Actual",
          "helpText": "Tu peso corporal actual"
        },
        "height": {
          "label": "Altura",
          "helpText": "Tu altura para el cálculo de TMB"
        },
        "targetWeight": {
          "label": "Peso Objetivo",
          "helpText": "Tu peso meta — debe ser mayor que el peso actual"
        },
        "activityLevel": {
          "label": "Nivel de Actividad",
          "helpText": "Tu rutina de ejercicio semanal típica",
          "options": {
            "sedentary": "Sedentario (poco o ningún ejercicio)",
            "light": "Ligeramente Activo (1–3 días/semana)",
            "moderate": "Moderadamente Activo (3–5 días/semana)",
            "active": "Muy Activo (6–7 días/semana)",
            "veryActive": "Extra Activo (atleta / trabajo físico)"
          }
        },
        "gainPace": {
          "label": "Ritmo de Aumento",
          "helpText": "Ritmo más lento = más masa magra, menos grasa",
          "options": {
            "slow": "Bulking Limpio",
            "moderate": "Estándar",
            "aggressive": "Bulking Rápido"
          },
          "descriptions": {
            "slow": "0.5 lb/sem",
            "moderate": "1 lb/sem",
            "aggressive": "1.5 lb/sem"
          }
        },
        "bodyFatPercent": {
          "label": "% Grasa Corporal",
          "helpText": "Opcional — habilita TMB Katch-McArdle y análisis de composición corporal",
          "placeholder": "ej. 18"
        },
        "showMetabolic": {
          "label": "Mostrar Detalles Metabólicos",
          "helpText": "Activar para ver fórmulas TMB, desglose TDEE y porcentaje de excedente"
        },
        "showBodyComp": {
          "label": "Mostrar Composición Corporal",
          "helpText": "Activar para ver seguimiento de IMC, calificación de calidad de aumento y estimaciones magra vs grasa"
        }
      },
      "inputGroups": {},
      "results": {
        "dailyCalories": {
          "label": "Calorías Diarias"
        },
        "surplusCalories": {
          "label": "Excedente Diario"
        },
        "weeklyGain": {
          "label": "Aumento Semanal"
        },
        "timeToGoal": {
          "label": "Tiempo al Objetivo"
        },
        "proteinTarget": {
          "label": "Objetivo Proteína"
        },
        "carbsTarget": {
          "label": "Objetivo Carbohidratos"
        },
        "fatTarget": {
          "label": "Objetivo Grasas"
        },
        "bmrMifflin": {
          "label": "TMB (Mifflin-St Jeor)"
        },
        "bmrKatch": {
          "label": "TMB (Katch-McArdle)"
        },
        "tdee": {
          "label": "Mantenimiento (TDEE)"
        },
        "surplusPercent": {
          "label": "% Excedente"
        },
        "currentBmi": {
          "label": "IMC Actual"
        },
        "goalBmi": {
          "label": "IMC Objetivo"
        },
        "gainRate": {
          "label": "Aumento Semanal (% PC)"
        },
        "gainQuality": {
          "label": "Calidad del Aumento"
        },
        "leanFatRatio": {
          "label": "Est. Magra vs Grasa"
        }
      },
      "tooltips": {
        "dailyCalories": "Total de calorías diarias a consumir para aumento de peso (TDEE + excedente)",
        "surplusCalories": "Calorías extra por encima de TDEE necesarias para aumentar de peso",
        "weeklyGain": "Aumento de peso estimado por semana con este excedente",
        "timeToGoal": "Tiempo estimado para alcanzar tu peso objetivo al ritmo seleccionado",
        "proteinTarget": "Ingesta diaria recomendada de proteína para ganancia de músculo magro (1g/lb)",
        "carbsTarget": "Objetivo diario de carbohidratos para energía y recuperación",
        "fatTarget": "Objetivo diario de grasas para salud hormonal (~25% de calorías)",
        "bmrMifflin": "Tasa Metabólica Basal usando Mifflin-St Jeor (edad, sexo, peso, altura)",
        "bmrKatch": "Tasa Metabólica Basal usando Katch-McArdle (masa corporal magra — requiere % grasa corporal)",
        "tdee": "Gasto Energético Diario Total — calorías para mantener peso actual",
        "surplusPercent": "Tu excedente como porcentaje de TDEE — 10-20% se recomienda para bulking",
        "currentBmi": "Tu Índice de Masa Corporal actual basado en peso y altura",
        "goalBmi": "Tu IMC proyectado al peso objetivo — rastrea cambio de IMC durante tu bulking",
        "gainRate": "Aumento semanal como porcentaje del peso corporal — 0.25-0.5% es óptimo para ganancias magras",
        "gainQuality": "Calificación basada en ritmo de aumento relativo al peso corporal — más lento = más magro",
        "leanFatRatio": "División estimada de ganancia de músculo vs grasa basada en tamaño del excedente y grasa corporal"
      },
      "presets": {
        "leanBulk": {
          "label": "Bulking Limpio",
          "description": "Enfoque conservador — minimizar ganancia de grasa"
        },
        "steadyBulk": {
          "label": "Bulking Constante",
          "description": "Ganancia muscular equilibrada a ritmo moderado"
        },
        "fastBulk": {
          "label": "Bulking Rápido",
          "description": "Excedente agresivo para principiantes o hardgainers"
        },
        "underweightRecovery": {
          "label": "Recuperación Bajo Peso",
          "description": "Hombre 20 años, 55kg, bajo peso — aumento moderado con análisis completo ACTIVADO"
        },
        "femaleLeanBulk": {
          "label": "Bulking Limpio Femenino",
          "description": "Mujer 26 años, 55kg, ritmo lento — composición corporal ACTIVADA"
        }
      },
      "values": {
        "cal": "cal",
        "kcal": "kcal",
        "g": "g",
        "kg": "kg",
        "lbs": "lbs",
        "lb": "lb",
        "weeks": "semanas",
        "week": "semana",
        "months": "meses",
        "month": "mes",
        "day": "día",
        "/day": "/día",
        "/week": "/semana",
        "cal/day": "cal/día",
        "% BW/wk": "% PC/sem",
        "Underweight": "Bajo Peso",
        "Normal": "Normal",
        "Overweight": "Sobrepeso",
        "Obese": "Obeso",
        "Week": "Semana",
        "Goal": "🎯 Objetivo",
        "Protein": "Proteína",
        "Carbs": "Carbohidratos",
        "Fat": "Grasas",
        "Requires body fat %": "Requiere % grasa corporal"
      },
      "formats": {
        "summary": "Come {dailyCalories} cal/día (+{surplus} excedente) para ganar {weeklyGain}/semana. Tu TMB es {bmr} cal y TDEE es {tdee} cal. Tiempo estimado para alcanzar {targetWeight}: {timeToGoal}."
      },
      "infoCards": {
        "nutritionTips": {
          "title": "🍽️ Consejos Nutricionales",
          "items": [
            "Come cada 3–4 horas para distribuir tu excedente calórico a lo largo del día",
            "Prioriza proteína en cada comida — apunta a 25–40g por porción",
            "Elige alimentos densos en calorías: nueces, aguacate, aceite de oliva, granos integrales",
            "Rastrea calorías durante al menos 2 semanas para asegurar que estés realmente en excedente"
          ]
        },
        "trainingTips": {
          "title": "🏋️ Consejos de Entrenamiento",
          "items": [
            "Sigue un programa de sobrecarga progresiva — aumenta peso o repeticiones semanalmente",
            "Enfócate en ejercicios compuestos: sentadillas, peso muerto, press banca, remo, press militar",
            "Entrena cada grupo muscular 2× por semana para estímulo óptimo de crecimiento",
            "Duerme 7–9 horas — la mayor recuperación muscular ocurre durante el sueño profundo"
          ]
        },
        "quickFacts": {
          "title": "📊 Datos Rápidos",
          "items": [
            "1 lb de aumento de peso requiere aproximadamente un excedente de 3,500 calorías",
            "Los principiantes pueden ganar 1.5–2 lbs de músculo por mes con entrenamiento adecuado",
            "La síntesis de proteínas alcanza su pico 24–48 horas después de una sesión de entrenamiento de resistencia",
            "Un excedente calórico del 10–20% es el rango recomendado para bulking limpio"
          ]
        }
      },
      "referenceData": {
        "activityLevels": {
          "title": "Multiplicadores de Nivel de Actividad",
          "items": {
            "sedentary": {
              "label": "Sedentario",
              "value": "×1.2 — Trabajo de escritorio, poco ejercicio"
            },
            "light": {
              "label": "Ligeramente Activo",
              "value": "×1.375 — Ejercicio ligero 1–3 días/semana"
            },
            "moderate": {
              "label": "Moderadamente Activo",
              "value": "×1.55 — Ejercicio moderado 3–5 días/semana"
            },
            "active": {
              "label": "Muy Activo",
              "value": "×1.725 — Ejercicio intenso 6–7 días/semana"
            },
            "veryActive": {
              "label": "Extra Activo",
              "value": "×1.9 — Atleta o trabajo físico"
            }
          }
        }
      },
      "detailedTable": {
        "weeklyPlan": {
          "button": "📋 Ver Plan Semanal de Aumento",
          "title": "Plan Semanal de Aumento de Peso y Macros",
          "columns": {
            "week": "Semana",
            "weight": "Peso Est.",
            "dailyCal": "Cal Diarias",
            "protein": "Proteína",
            "carbs": "Carbohidratos",
            "fat": "Grasas"
          }
        }
      },
      "chart": {
        "title": "Proyección de Aumento de Peso",
        "xLabel": "Semana",
        "yLabel": "Peso",
        "series": {
          "weight": "Peso Proyectado",
          "goalWeight": "Peso Objetivo"
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es una Calculadora de Aumento de Peso?",
          "content": "Una calculadora de aumento de peso estima cuántas calorías necesitas comer cada día para ganar peso a un ritmo saludable y sostenible. Utiliza tu Tasa Metabólica Basal (TMB) — las calorías que tu cuerpo quema en reposo — y la ajusta según tu nivel de actividad para encontrar tu Gasto Energético Diario Total (TDEE). Al agregar un excedente calórico controlado encima de tu TDEE, la calculadora proporciona un objetivo calórico diario personalizado y desglose de macros para apoyar la ganancia de músculo magro mientras minimiza la acumulación excesiva de grasa. Este enfoque es mucho más efectivo que adivinar o simplemente 'comer más', porque te da un punto de partida preciso basado en tu composición corporal única y estilo de vida."
        },
        "howItWorks": {
          "title": "Cómo Funcionan las Fórmulas TMB",
          "content": "Esta calculadora usa dos fórmulas TMB. La ecuación Mifflin-St Jeor es el estándar de oro para la mayoría de personas: para hombres, TMB = (10 × peso en kg) + (6.25 × altura en cm) − (5 × edad) + 5; para mujeres, TMB = (10 × peso en kg) + (6.25 × altura en cm) − (5 × edad) − 161. Si ingresas porcentaje de grasa corporal, la fórmula Katch-McArdle (TMB = 370 + 21.6 × masa magra en kg) también se calcula y usa para resultados más precisos. Tu TMB se multiplica por un factor de actividad (1.2 a 1.9) para obtener tu TDEE. Para ganar peso, comes por encima de tu TDEE: un excedente del 10% para bulking limpio, 15% para ganancias moderadas, o 20% para aumento agresivo de peso. El excedente se convierte a ganancia semanal estimada usando ~3,500 calorías por libra."
        },
        "gainTips": {
          "title": "Estrategias de Aumento de Peso Saludable",
          "items": [
            {
              "text": "Come en excedente consistente todos los días — saltarse días ralentiza el progreso significativamente",
              "type": "info"
            },
            {
              "text": "Prioriza proteína (1g por lb de peso corporal) para maximizar ganancia muscular sobre grasa",
              "type": "info"
            },
            {
              "text": "Elige fuentes calóricas densas en nutrientes sobre comida chatarra para salud a largo plazo",
              "type": "info"
            },
            {
              "text": "El entrenamiento de resistencia es esencial — calorías extra sin entrenamiento solo agrega grasa",
              "type": "warning"
            },
            {
              "text": "Rastrea tu peso semanalmente, no diariamente — las fluctuaciones diarias son normales (agua, horario de comida)",
              "type": "info"
            },
            {
              "text": "Aumenta calorías en 100–200 si no estás ganando después de 2 semanas consistentes",
              "type": "info"
            }
          ]
        },
        "mistakes": {
          "title": "Errores Comunes en el Bulking",
          "items": [
            {
              "text": "Bulking sucio (comer cualquier cosa) lleva a ganancia excesiva de grasa y problemas de salud",
              "type": "warning"
            },
            {
              "text": "No rastrear calorías — la mayoría sobrestima cuánto realmente come",
              "type": "warning"
            },
            {
              "text": "Saltarse comidas o ser inconsistente con el horario de comida descarrila el progreso",
              "type": "info"
            },
            {
              "text": "Descuidar sueño y recuperación — el músculo se construye durante el descanso, no en el gimnasio",
              "type": "info"
            },
            {
              "text": "Establecer cronogramas irreales — la ganancia sostenible es 0.5–1 lb por semana para la mayoría",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo",
          "description": "Ejemplos paso a paso usando la fórmula Mifflin-St Jeor",
          "examples": [
            {
              "title": "Hombre, 25, 155 lbs, 5'10\", Actividad Moderada",
              "steps": [
                "Convertir: 155 lbs = 70.3 kg, 5'10\" = 177.8 cm",
                "TMB = (10 × 70.3) + (6.25 × 177.8) − (5 × 25) + 5 = 1,696 cal",
                "TDEE = 1,696 × 1.55 (moderado) = 2,629 cal/día",
                "Excedente moderado (+15%): 2,629 × 1.15 = 3,023 cal/día",
                "Excedente = 3,023 − 2,629 = 394 cal/día",
                "Ganancia semanal = (394 × 7) / 3,500 ≈ 0.79 lbs/semana"
              ],
              "result": "Come ~3,023 cal/día para ganar ~0.8 lbs/semana"
            },
            {
              "title": "Mujer, 30, 55 kg, 165 cm, Ligeramente Activa",
              "steps": [
                "TMB = (10 × 55) + (6.25 × 165) − (5 × 30) − 161 = 1,271 cal",
                "TDEE = 1,271 × 1.375 (ligero) = 1,748 cal/día",
                "Excedente lento (+10%): 1,748 × 1.10 = 1,923 cal/día",
                "Excedente = 1,923 − 1,748 = 175 cal/día",
                "Ganancia semanal = (175 × 7) / 3,500 ≈ 0.35 lbs/semana"
              ],
              "result": "Come ~1,923 cal/día para ganar ~0.35 lbs/semana"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántas calorías debo comer para ganar peso?",
          "answer": "Necesitas comer más calorías de las que tu cuerpo quema (TDEE). Se recomienda un excedente del 10–20% por encima del TDEE. Para la mayoría de personas, esto significa comer 250–500 calorías extra por día, lo que resulta en aproximadamente 0.5–1 lb de aumento de peso por semana. Usa esta calculadora para encontrar tu número exacto basado en tu edad, peso, altura y nivel de actividad."
        },
        {
          "question": "¿Qué es la ecuación Mifflin-St Jeor?",
          "answer": "La ecuación Mifflin-St Jeor es una fórmula científicamente validada para estimar la Tasa Metabólica Basal (TMB). Publicada en 1990, se ha demostrado que es más precisa que la ecuación Harris-Benedict más antigua. Calcula las calorías quemadas en reposo usando tu peso, altura, edad y sexo, luego se multiplica por un factor de actividad para estimar el gasto energético diario total."
        },
        {
          "question": "¿Qué tan rápido debería ganar peso?",
          "answer": "La investigación sugiere que 0.25–0.5% de tu peso corporal por semana es óptimo para ganancias magras. Para una persona de 150 lb, eso es aproximadamente 0.4–0.75 lbs por semana. Ritmos más rápidos llevan a más ganancia de grasa relativa al músculo. Los principiantes pueden ganar un poco más rápido (hasta 1 lb/semana) ya que tienen mayor potencial de construcción muscular en su primer año de entrenamiento."
        },
        {
          "question": "¿Debo rastrear macros o solo calorías?",
          "answer": "Rastrear macros (proteína, carbohidratos, grasas) lleva a mejores resultados que rastrear solo calorías. La proteína es el macro más importante para aumento de peso — apunta a 0.8–1g por libra de peso corporal diariamente. Las grasas deben ser aproximadamente el 25% del total de calorías para salud hormonal. Las calorías restantes vienen de carbohidratos, que alimentan entrenamientos y recuperación."
        },
        {
          "question": "¿Puedo ganar músculo sin ganar grasa?",
          "answer": "Es muy difícil ganar músculo sin ninguna ganancia de grasa, pero puedes minimizar la ganancia de grasa manteniendo tu excedente pequeño (10–15%), comiendo suficiente proteína, siguiendo un programa progresivo de entrenamiento de resistencia, y durmiendo adecuadamente. Los principiantes y personas regresando al entrenamiento después de un descanso a veces pueden ganar músculo mientras pierden grasa (recomposición corporal)."
        },
        {
          "question": "¿Qué pasa si no estoy ganando peso?",
          "answer": "Si no estás ganando peso después de 2 semanas consistentes, no estás en excedente calórico. Razones comunes incluyen: subestimar tamaños de porciones, saltarse comidas, aumento de actividad quemando calorías extra, o un metabolismo más alto de lo estimado. Aumenta la ingesta diaria en 200–300 calorías y reevalúa después de otras 2 semanas."
        },
        {
          "question": "¿Cuál es la diferencia entre TMB y TDEE?",
          "answer": "TMB (Tasa Metabólica Basal) son las calorías que tu cuerpo quema en reposo completo — solo para mantener tus órganos funcionando. TDEE (Gasto Energético Diario Total) incluye TMB más todas las calorías quemadas por actividad diaria, ejercicio y digerir comida. TDEE siempre es mayor que TMB y representa las calorías reales que necesitas para mantener tu peso actual."
        },
        {
          "question": "¿Qué significa 'calidad del aumento'?",
          "answer": "La calidad del aumento mide cómo tu ganancia de peso semanal se compara al rango óptimo de 0.25–0.5% del peso corporal por semana. Dentro de este rango, maximizas la proporción de músculo a grasa ganada. Por debajo del 0.25% es muy magro pero lento, y por encima del 0.5% significa que una porción mayor del peso ganado probablemente será grasa en lugar de músculo. El toggle de composición corporal muestra tu calificación de calidad de aumento."
        },
        {
          "question": "¿Por qué la calculadora muestra dos fórmulas TMB?",
          "answer": "La fórmula Mifflin-St Jeor usa edad, sexo, peso y altura — precisa para la mayoría de personas. La fórmula Katch-McArdle usa masa corporal magra (requiere % grasa corporal) y es más precisa para individuos magros o musculosos. Cuando ingresas % grasa corporal, la calculadora usa Katch-McArdle para mejor precisión pero muestra ambos resultados para que puedas comparar. La diferencia típicamente es 50-150 calorías por día."
        }
      ],
      "buttons": {
        "calculate": "Calcular",
        "reset": "Reiniciar",
        "pdf": "PDF",
        "csv": "CSV",
        "excel": "Excel",
        "save": "Guardar",
        "saved": "Guardado",
        "saving": "Guardando..."
      },
      "share": {
        "calculatedWith": "Calculado con Kalcufy.com"
      },
      "ui": {
        "results": "Resultados",
        "yourInformation": "Tu Información"
      },
      "accessibility": {
        "mobileResults": "Resumen de resultados",
        "closeModal": "Cerrar",
        "openMenu": "Abrir menú"
      },
      "rating": {
        "title": "Califica esta Calculadora",
        "share": "Compartir",
        "copied": "¡Copiado!",
        "copyLink": "Copiar Enlace",
        "clickToRate": "Clic para calificar",
        "youRated": "Calificaste",
        "stars": "estrellas",
        "averageFrom": "promedio de",
        "ratings": "calificaciones"
      },
      "common": {
        "home": "Inicio",
        "calculators": "Calculadoras"
      },
      "sources": {
        "title": "Fuentes y Referencias"
      }
    },
    pt: {
      "name": "Calculadora de Ganho de Peso",
      "slug": "calculadora-ganho-peso",
      "subtitle": "Calcule calorias diárias, superávit, macros e acompanhamento da composição corporal para ganhar peso com segurança usando as fórmulas Mifflin-St Jeor e Katch-McArdle",
      "breadcrumb": "Ganho de Peso",
      "seo": {
        "title": "Calculadora de Ganho de Peso — Superávit Calórico, Macros e Composição Corporal | Grátis",
        "description": "Calcule quantas calorias você precisa para ganhar peso com um plano semanal personalizado. Usa Mifflin-St Jeor e Katch-McArdle BMR, GDET, superávit calórico, metas de macros, acompanhamento de IMC e análise da qualidade do ganho.",
        "shortDescription": "Planeje seu ganho de peso com metas personalizadas de calorias, macros e composição corporal",
        "keywords": [
          "calculadora ganho peso",
          "calculadora superávit calórico",
          "calculadora bulking",
          "quantas calorias para ganhar peso",
          "calculadora calorias ganho muscular",
          "calculadora GDET ganho peso",
          "calculadora macro bulking",
          "calculadora lean bulk",
          "calculadora recomposição corporal"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "gender": {
          "label": "Sexo",
          "helpText": "As fórmulas de TMB diferem por sexo biológico",
          "options": {
            "male": "Masculino",
            "female": "Feminino"
          }
        },
        "age": {
          "label": "Idade",
          "helpText": "Idades de 15–80 anos para estimativa precisa de TMB"
        },
        "weight": {
          "label": "Peso Atual",
          "helpText": "Seu peso corporal atual"
        },
        "height": {
          "label": "Altura",
          "helpText": "Sua altura para cálculo da TMB"
        },
        "targetWeight": {
          "label": "Peso Meta",
          "helpText": "Seu peso objetivo — deve ser maior que o peso atual"
        },
        "activityLevel": {
          "label": "Nível de Atividade",
          "helpText": "Sua rotina típica de exercícios semanais",
          "options": {
            "sedentary": "Sedentário (pouco ou nenhum exercício)",
            "light": "Levemente Ativo (1–3 dias/semana)",
            "moderate": "Moderadamente Ativo (3–5 dias/semana)",
            "active": "Muito Ativo (6–7 dias/semana)",
            "veryActive": "Extra Ativo (atleta / trabalho físico)"
          }
        },
        "gainPace": {
          "label": "Ritmo de Ganho",
          "helpText": "Ritmo mais lento = mais massa magra, menos gordura",
          "options": {
            "slow": "Bulk Magro",
            "moderate": "Padrão",
            "aggressive": "Bulk Rápido"
          },
          "descriptions": {
            "slow": "0,2 kg/sem",
            "moderate": "0,5 kg/sem",
            "aggressive": "0,7 kg/sem"
          }
        },
        "bodyFatPercent": {
          "label": "% Gordura Corporal",
          "helpText": "Opcional — habilita TMB Katch-McArdle e análise de composição corporal",
          "placeholder": "ex: 18"
        },
        "showMetabolic": {
          "label": "Mostrar Detalhes Metabólicos",
          "helpText": "Ative para ver fórmulas de TMB, detalhamento de GDET e porcentagem de superávit"
        },
        "showBodyComp": {
          "label": "Mostrar Composição Corporal",
          "helpText": "Ative para ver acompanhamento de IMC, classificação da qualidade do ganho e estimativas de massa magra vs gordura"
        }
      },
      "inputGroups": {},
      "results": {
        "dailyCalories": {
          "label": "Calorias Diárias"
        },
        "surplusCalories": {
          "label": "Superávit Diário"
        },
        "weeklyGain": {
          "label": "Ganho Semanal"
        },
        "timeToGoal": {
          "label": "Tempo para Meta"
        },
        "proteinTarget": {
          "label": "Meta de Proteína"
        },
        "carbsTarget": {
          "label": "Meta de Carboidratos"
        },
        "fatTarget": {
          "label": "Meta de Gordura"
        },
        "bmrMifflin": {
          "label": "TMB (Mifflin-St Jeor)"
        },
        "bmrKatch": {
          "label": "TMB (Katch-McArdle)"
        },
        "tdee": {
          "label": "Manutenção (GDET)"
        },
        "surplusPercent": {
          "label": "% Superávit"
        },
        "currentBmi": {
          "label": "IMC Atual"
        },
        "goalBmi": {
          "label": "IMC Meta"
        },
        "gainRate": {
          "label": "Ganho Semanal (% PC)"
        },
        "gainQuality": {
          "label": "Qualidade do Ganho"
        },
        "leanFatRatio": {
          "label": "Est. Magro vs Gordura"
        }
      },
      "tooltips": {
        "dailyCalories": "Total de calorias diárias para comer para ganho de peso (GDET + superávit)",
        "surplusCalories": "Calorias extras acima da GDET necessárias para ganhar peso",
        "weeklyGain": "Ganho de peso estimado por semana com este superávit",
        "timeToGoal": "Tempo estimado para atingir seu peso meta no ritmo selecionado",
        "proteinTarget": "Ingestão diária recomendada de proteína para ganho de massa magra (1g/kg)",
        "carbsTarget": "Meta diária de carboidratos para energia e recuperação",
        "fatTarget": "Meta diária de gordura para saúde hormonal (~25% das calorias)",
        "bmrMifflin": "Taxa Metabólica Basal usando Mifflin-St Jeor (idade, sexo, peso, altura)",
        "bmrKatch": "Taxa Metabólica Basal usando Katch-McArdle (massa corporal magra — requer % de gordura corporal)",
        "tdee": "Gasto Energético Diário Total — calorias para manter peso atual",
        "surplusPercent": "Seu superávit como porcentagem da GDET — 10-20% é recomendado para bulking",
        "currentBmi": "Seu Índice de Massa Corporal atual baseado no peso e altura",
        "goalBmi": "Seu IMC projetado no peso meta — acompanhe a mudança do IMC durante seu bulk",
        "gainRate": "Ganho semanal como porcentagem do peso corporal — 0,25-0,5% é ideal para ganhos magros",
        "gainQuality": "Classificação baseada na taxa de ganho relativa ao peso corporal — mais lento = mais magro",
        "leanFatRatio": "Divisão estimada de ganho de músculo vs gordura baseada no tamanho do superávit e gordura corporal"
      },
      "presets": {
        "leanBulk": {
          "label": "Bulk Magro",
          "description": "Abordagem conservadora — minimizar ganho de gordura"
        },
        "steadyBulk": {
          "label": "Bulk Constante",
          "description": "Ganho muscular equilibrado em ritmo moderado"
        },
        "fastBulk": {
          "label": "Bulk Rápido",
          "description": "Superávit agressivo para iniciantes ou hardgainers"
        },
        "underweightRecovery": {
          "label": "Recuperação Baixo Peso",
          "description": "Homem 20 anos, 55kg, abaixo do peso — ganho moderado com análise completa ATIVA"
        },
        "femaleLeanBulk": {
          "label": "Bulk Magro Feminino",
          "description": "Mulher 26 anos, 55kg, ritmo lento — composição corporal ATIVA"
        }
      },
      "values": {
        "cal": "cal",
        "kcal": "kcal",
        "g": "g",
        "kg": "kg",
        "lbs": "lbs",
        "lb": "lb",
        "weeks": "semanas",
        "week": "semana",
        "months": "meses",
        "month": "mês",
        "day": "dia",
        "/day": "/dia",
        "/week": "/semana",
        "cal/day": "cal/dia",
        "% BW/wk": "% PC/sem",
        "Underweight": "Abaixo do Peso",
        "Normal": "Normal",
        "Overweight": "Sobrepeso",
        "Obese": "Obeso",
        "Week": "Semana",
        "Goal": "🎯 Meta",
        "Protein": "Proteína",
        "Carbs": "Carboidratos",
        "Fat": "Gordura",
        "Requires body fat %": "Requer % gordura corporal"
      },
      "formats": {
        "summary": "Coma {dailyCalories} cal/dia (+{surplus} superávit) para ganhar {weeklyGain}/semana. Sua TMB é {bmr} cal e GDET é {tdee} cal. Tempo estimado para atingir {targetWeight}: {timeToGoal}."
      },
      "infoCards": {
        "nutritionTips": {
          "title": "🍽️ Dicas de Nutrição",
          "items": [
            "Coma a cada 3–4 horas para distribuir seu superávit calórico ao longo do dia",
            "Priorize proteína em cada refeição — mire em 25–40g por porção",
            "Escolha alimentos densos em calorias: nozes, abacate, azeite, grãos integrais",
            "Acompanhe calorias por pelo menos 2 semanas para garantir que está realmente em superávit"
          ]
        },
        "trainingTips": {
          "title": "🏋️ Dicas de Treinamento",
          "items": [
            "Siga um programa de sobrecarga progressiva — aumente peso ou repetições semanalmente",
            "Foque em exercícios compostos: agachamento, levantamento terra, supino, remadas, desenvolvimento",
            "Treine cada grupo muscular 2× por semana para estímulo de crescimento ideal",
            "Durma 7–9 horas — a maior parte da recuperação muscular acontece durante o sono profundo"
          ]
        },
        "quickFacts": {
          "title": "📊 Fatos Rápidos",
          "items": [
            "0,5 kg de ganho de peso requer aproximadamente um superávit de 3.500 calorias",
            "Iniciantes podem ganhar 0,7–1 kg de músculo por mês com treinamento adequado",
            "A síntese proteica atinge o pico 24–48 horas após uma sessão de treinamento resistido",
            "Um superávit calórico de 10–20% é a faixa recomendada para bulking magro"
          ]
        }
      },
      "referenceData": {
        "activityLevels": {
          "title": "Multiplicadores de Nível de Atividade",
          "items": {
            "sedentary": {
              "label": "Sedentário",
              "value": "×1,2 — Trabalho de escritório, pouco exercício"
            },
            "light": {
              "label": "Levemente Ativo",
              "value": "×1,375 — Exercício leve 1–3 dias/semana"
            },
            "moderate": {
              "label": "Moderadamente Ativo",
              "value": "×1,55 — Exercício moderado 3–5 dias/semana"
            },
            "active": {
              "label": "Muito Ativo",
              "value": "×1,725 — Exercício intenso 6–7 dias/semana"
            },
            "veryActive": {
              "label": "Extra Ativo",
              "value": "×1,9 — Atleta ou trabalho físico"
            }
          }
        }
      },
      "detailedTable": {
        "weeklyPlan": {
          "button": "📋 Ver Plano Semanal de Ganho",
          "title": "Plano Semanal de Ganho de Peso e Macros",
          "columns": {
            "week": "Semana",
            "weight": "Peso Est.",
            "dailyCal": "Cal Diárias",
            "protein": "Proteína",
            "carbs": "Carboidratos",
            "fat": "Gordura"
          }
        }
      },
      "chart": {
        "title": "Projeção de Ganho de Peso",
        "xLabel": "Semana",
        "yLabel": "Peso",
        "series": {
          "weight": "Peso Projetado",
          "goalWeight": "Peso Meta"
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é uma Calculadora de Ganho de Peso?",
          "content": "Uma calculadora de ganho de peso estima quantas calorias você precisa comer diariamente para ganhar peso de forma saudável e sustentável. Ela usa sua Taxa Metabólica Basal (TMB) — as calorias que seu corpo queima em repouso — e a ajusta com base no seu nível de atividade para encontrar seu Gasto Energético Diário Total (GDET). Ao adicionar um superávit calórico controlado sobre sua GDET, a calculadora fornece uma meta diária personalizada de calorias e distribuição de macros para apoiar o ganho de massa magra minimizando o acúmulo excessivo de gordura. Esta abordagem é muito mais eficaz do que adivinhar ou simplesmente 'comer mais', porque fornece um ponto de partida preciso baseado na sua composição corporal e estilo de vida únicos."
        },
        "howItWorks": {
          "title": "Como Funcionam as Fórmulas de TMB",
          "content": "Esta calculadora usa duas fórmulas de TMB. A equação Mifflin-St Jeor é o padrão-ouro para a maioria das pessoas: para homens, TMB = (10 × peso em kg) + (6,25 × altura em cm) − (5 × idade) + 5; para mulheres, TMB = (10 × peso em kg) + (6,25 × altura em cm) − (5 × idade) − 161. Se você inserir a porcentagem de gordura corporal, a fórmula Katch-McArdle (TMB = 370 + 21,6 × massa magra em kg) também é calculada e usada para resultados mais precisos. Sua TMB é multiplicada por um fator de atividade (1,2 a 1,9) para obter sua GDET. Para ganhar peso, você come acima da sua GDET: um superávit de 10% para bulking magro, 15% para ganhos moderados, ou 20% para ganho de peso agressivo. O superávit é convertido em ganho semanal estimado usando ~3.500 calorias por quilo."
        },
        "gainTips": {
          "title": "Estratégias de Ganho de Peso Saudável",
          "items": [
            {
              "text": "Coma em superávit consistente todos os dias — pular dias desacelera significativamente o progresso",
              "type": "info"
            },
            {
              "text": "Priorize proteína (1g por kg de peso corporal) para maximizar ganho muscular sobre gordura",
              "type": "info"
            },
            {
              "text": "Escolha fontes calóricas densas em nutrientes em vez de junk food para saúde a longo prazo",
              "type": "info"
            },
            {
              "text": "Treinamento resistido é essencial — calorias extras sem treinamento apenas adiciona gordura",
              "type": "warning"
            },
            {
              "text": "Acompanhe seu peso semanalmente, não diariamente — flutuações diárias são normais (água, horário das refeições)",
              "type": "info"
            },
            {
              "text": "Aumente calorias em 100–200 se não estiver ganhando após 2 semanas consistentes",
              "type": "info"
            }
          ]
        },
        "mistakes": {
          "title": "Erros Comuns ao Fazer Bulking",
          "items": [
            {
              "text": "Dirty bulking (comer qualquer coisa) leva ao ganho excessivo de gordura e problemas de saúde",
              "type": "warning"
            },
            {
              "text": "Não acompanhar calorias — a maioria das pessoas superestima o quanto realmente come",
              "type": "warning"
            },
            {
              "text": "Pular refeições ou ser inconsistente com horário das refeições descarrila o progresso",
              "type": "info"
            },
            {
              "text": "Negligenciar sono e recuperação — músculo é construído durante o descanso, não na academia",
              "type": "info"
            },
            {
              "text": "Definir cronogramas irreais — ganho sustentável é 0,2–0,5 kg por semana para a maioria das pessoas",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo",
          "description": "Exemplos passo a passo usando a fórmula Mifflin-St Jeor",
          "examples": [
            {
              "title": "Homem, 25 anos, 70 kg, 1,78m, Atividade Moderada",
              "steps": [
                "TMB = (10 × 70) + (6,25 × 178) − (5 × 25) + 5 = 1.690 cal",
                "GDET = 1.690 × 1,55 (moderado) = 2.620 cal/dia",
                "Superávit moderado (+15%): 2.620 × 1,15 = 3.013 cal/dia",
                "Superávit = 3.013 − 2.620 = 393 cal/dia",
                "Ganho semanal = (393 × 7) / 3.500 ≈ 0,78 kg/semana"
              ],
              "result": "Coma ~3.013 cal/dia para ganhar ~0,8 kg/semana"
            },
            {
              "title": "Mulher, 30 anos, 55 kg, 1,65m, Levemente Ativa",
              "steps": [
                "TMB = (10 × 55) + (6,25 × 165) − (5 × 30) − 161 = 1.271 cal",
                "GDET = 1.271 × 1,375 (leve) = 1.748 cal/dia",
                "Superávit lento (+10%): 1.748 × 1,10 = 1.923 cal/dia",
                "Superávit = 1.923 − 1.748 = 175 cal/dia",
                "Ganho semanal = (175 × 7) / 3.500 ≈ 0,35 kg/semana"
              ],
              "result": "Coma ~1.923 cal/dia para ganhar ~0,35 kg/semana"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantas calorias devo comer para ganhar peso?",
          "answer": "Você precisa comer mais calorias do que seu corpo queima (GDET). Um superávit de 10–20% acima da GDET é recomendado. Para a maioria das pessoas, isso significa comer 250–500 calorias extras por dia, resultando em aproximadamente 0,2–0,5 kg de ganho de peso por semana. Use esta calculadora para encontrar seu número exato baseado na sua idade, peso, altura e nível de atividade."
        },
        {
          "question": "O que é a equação Mifflin-St Jeor?",
          "answer": "A equação Mifflin-St Jeor é uma fórmula cientificamente validada para estimar a Taxa Metabólica Basal (TMB). Publicada em 1990, foi demonstrado ser mais precisa que a equação Harris-Benedict mais antiga. Ela calcula calorias queimadas em repouso usando seu peso, altura, idade e sexo, então multiplicada por um fator de atividade para estimar o gasto energético diário total."
        },
        {
          "question": "Quão rápido devo ganhar peso?",
          "answer": "Pesquisas sugerem que 0,25–0,5% do seu peso corporal por semana é ideal para ganhos magros. Para uma pessoa de 70 kg, isso é cerca de 0,18–0,35 kg por semana. Taxas mais rápidas levam a mais ganho de gordura relativo ao músculo. Iniciantes podem ganhar um pouco mais rápido (até 0,5 kg/semana) já que têm maior potencial de construção muscular no primeiro ano de treinamento."
        },
        {
          "question": "Devo acompanhar macros ou apenas calorias?",
          "answer": "Acompanhar macros (proteína, carboidratos, gordura) leva a melhores resultados do que acompanhar apenas calorias. Proteína é o macro mais importante para ganho de peso — mire em 0,8–1g por kg de peso corporal diariamente. Gordura deve ser cerca de 25% do total de calorias para saúde hormonal. As calorias restantes vêm de carboidratos, que alimentam treinos e recuperação."
        },
        {
          "question": "Posso ganhar músculo sem ganhar gordura?",
          "answer": "É muito difícil ganhar músculo sem qualquer ganho de gordura, mas você pode minimizar o ganho de gordura mantendo seu superávit pequeno (10–15%), comendo proteína suficiente, seguindo um programa progressivo de treinamento resistido e dormindo adequadamente. Iniciantes e pessoas retornando ao treinamento após uma pausa às vezes podem ganhar músculo perdendo gordura (recomposição corporal)."
        },
        {
          "question": "E se eu não estiver ganhando peso?",
          "answer": "Se não está ganhando peso após 2 semanas consistentes, você não está em superávit calórico. Razões comuns incluem: subestimar tamanhos de porções, pular refeições, atividade aumentada queimando calorias extras, ou metabolismo mais alto que o estimado. Aumente a ingestão diária em 200–300 calorias e reavalie após mais 2 semanas."
        },
        {
          "question": "Qual é a diferença entre TMB e GDET?",
          "answer": "TMB (Taxa Metabólica Basal) são as calorias que seu corpo queima em repouso completo — apenas para manter seus órgãos funcionando. GDET (Gasto Energético Diário Total) inclui TMB mais todas as calorias queimadas da atividade diária, exercício e digestão de alimentos. GDET é sempre maior que TMB e representa as calorias reais que você precisa para manter seu peso atual."
        },
        {
          "question": "O que significa 'qualidade do ganho'?",
          "answer": "Qualidade do ganho mede como seu ganho de peso semanal se compara à faixa ideal de 0,25–0,5% do peso corporal por semana. Dentro desta faixa, você maximiza a proporção de músculo para gordura ganha. Abaixo de 0,25% é muito magro mas lento, e acima de 0,5% significa que uma porção maior do peso ganho provavelmente será gordura em vez de músculo. O toggle de composição corporal mostra sua classificação de qualidade do ganho."
        },
        {
          "question": "Por que a calculadora mostra duas fórmulas de TMB?",
          "answer": "A fórmula Mifflin-St Jeor usa idade, sexo, peso e altura — precisa para a maioria das pessoas. A fórmula Katch-McArdle usa massa corporal magra (requer % gordura corporal) e é mais precisa para indivíduos magros ou musculosos. Quando você insere % gordura corporal, a calculadora usa Katch-McArdle para melhor precisão mas mostra ambos os resultados para que você possa comparar. A diferença é tipicamente 50-150 calorias por dia."
        }
      ],
      "buttons": {
        "calculate": "Calcular",
        "reset": "Reiniciar",
        "pdf": "PDF",
        "csv": "CSV",
        "excel": "Excel",
        "save": "Salvar",
        "saved": "Salvo",
        "saving": "Salvando..."
      },
      "share": {
        "calculatedWith": "Calculado com Kalcufy.com"
      },
      "ui": {
        "results": "Resultados",
        "yourInformation": "Suas Informações"
      },
      "accessibility": {
        "mobileResults": "Resumo dos resultados",
        "closeModal": "Fechar",
        "openMenu": "Abrir menu"
      },
      "rating": {
        "title": "Avalie esta Calculadora",
        "share": "Compartilhar",
        "copied": "Copiado!",
        "copyLink": "Copiar Link",
        "clickToRate": "Clique para avaliar",
        "youRated": "Você avaliou",
        "stars": "estrelas",
        "averageFrom": "média de",
        "ratings": "avaliações"
      },
      "common": {
        "home": "Início",
        "calculators": "Calculadoras"
      },
      "sources": {
        "title": "Fontes e Referências"
      }
    },
    fr: {
      "name": "Calculateur de Prise de Poids",
      "slug": "calculateur-prise-de-poids",
      "subtitle": "Calculez les calories quotidiennes, l'excédent, les macros et le suivi de la composition corporelle pour prendre du poids en toute sécurité avec les formules Mifflin-St Jeor et Katch-McArdle",
      "breadcrumb": "Prise de Poids",
      "seo": {
        "title": "Calculateur de Prise de Poids — Excédent Calorique, Macros & Composition Corporelle | Gratuit",
        "description": "Calculez combien de calories vous devez consommer pour prendre du poids avec un plan hebdomadaire personnalisé. Utilise Mifflin-St Jeor et Katch-McArdle pour le BMR, TDEE, excédent calorique, objectifs macros, suivi IMC et analyse de qualité de prise.",
        "shortDescription": "Planifiez votre prise de poids avec des objectifs personnalisés de calories, macros et composition corporelle",
        "keywords": [
          "calculateur prise de poids",
          "calculateur excédent calorique",
          "calculateur prise de masse",
          "combien de calories pour prendre du poids",
          "calculateur calories gain musculaire",
          "calculateur TDEE prise de poids",
          "calculateur macro prise de masse",
          "calculateur prise de masse sèche",
          "calculateur recomposition corporelle"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "gender": {
          "label": "Sexe",
          "helpText": "Les formules BMR diffèrent selon le sexe biologique",
          "options": {
            "male": "Homme",
            "female": "Femme"
          }
        },
        "age": {
          "label": "Âge",
          "helpText": "Âges 15-80 pour une estimation BMR précise"
        },
        "weight": {
          "label": "Poids Actuel",
          "helpText": "Votre poids corporel actuel"
        },
        "height": {
          "label": "Taille",
          "helpText": "Votre taille pour le calcul du BMR"
        },
        "targetWeight": {
          "label": "Poids Cible",
          "helpText": "Votre poids objectif — doit être supérieur au poids actuel"
        },
        "activityLevel": {
          "label": "Niveau d'Activité",
          "helpText": "Votre routine d'exercice hebdomadaire typique",
          "options": {
            "sedentary": "Sédentaire (peu ou pas d'exercice)",
            "light": "Légèrement Actif (1-3 jours/semaine)",
            "moderate": "Modérément Actif (3-5 jours/semaine)",
            "active": "Très Actif (6-7 jours/semaine)",
            "veryActive": "Extra Actif (athlète / travail physique)"
          }
        },
        "gainPace": {
          "label": "Rythme de Prise",
          "helpText": "Rythme plus lent = plus de masse maigre, moins de graisse",
          "options": {
            "slow": "Prise Sèche",
            "moderate": "Standard",
            "aggressive": "Prise Rapide"
          },
          "descriptions": {
            "slow": "0,25 kg/sem",
            "moderate": "0,5 kg/sem",
            "aggressive": "0,75 kg/sem"
          }
        },
        "bodyFatPercent": {
          "label": "% Graisse Corporelle",
          "helpText": "Optionnel — permet le BMR Katch-McArdle et l'analyse de composition corporelle",
          "placeholder": "ex. 18"
        },
        "showMetabolic": {
          "label": "Afficher Détails Métaboliques",
          "helpText": "Activez pour voir les formules BMR, répartition TDEE et pourcentage d'excédent"
        },
        "showBodyComp": {
          "label": "Afficher Composition Corporelle",
          "helpText": "Activez pour voir le suivi IMC, évaluation qualité de prise et estimations masse maigre vs graisse"
        }
      },
      "inputGroups": {},
      "results": {
        "dailyCalories": {
          "label": "Calories Quotidiennes"
        },
        "surplusCalories": {
          "label": "Excédent Quotidien"
        },
        "weeklyGain": {
          "label": "Prise Hebdomadaire"
        },
        "timeToGoal": {
          "label": "Temps jusqu'à l'Objectif"
        },
        "proteinTarget": {
          "label": "Objectif Protéines"
        },
        "carbsTarget": {
          "label": "Objectif Glucides"
        },
        "fatTarget": {
          "label": "Objectif Lipides"
        },
        "bmrMifflin": {
          "label": "BMR (Mifflin-St Jeor)"
        },
        "bmrKatch": {
          "label": "BMR (Katch-McArdle)"
        },
        "tdee": {
          "label": "Maintenance (TDEE)"
        },
        "surplusPercent": {
          "label": "% Excédent"
        },
        "currentBmi": {
          "label": "IMC Actuel"
        },
        "goalBmi": {
          "label": "IMC Objectif"
        },
        "gainRate": {
          "label": "Prise Hebdomadaire (% PC)"
        },
        "gainQuality": {
          "label": "Qualité de Prise"
        },
        "leanFatRatio": {
          "label": "Est. Maigre vs Graisse"
        }
      },
      "tooltips": {
        "dailyCalories": "Total de calories quotidiennes à consommer pour la prise de poids (TDEE + excédent)",
        "surplusCalories": "Calories supplémentaires au-dessus du TDEE nécessaires pour prendre du poids",
        "weeklyGain": "Prise de poids estimée par semaine avec cet excédent",
        "timeToGoal": "Temps estimé pour atteindre votre poids cible au rythme sélectionné",
        "proteinTarget": "Apport quotidien de protéines recommandé pour le gain musculaire maigre (1g/lb)",
        "carbsTarget": "Objectif quotidien de glucides pour l'énergie et la récupération",
        "fatTarget": "Objectif quotidien de lipides pour la santé hormonale (~25% des calories)",
        "bmrMifflin": "Taux Métabolique de Base utilisant Mifflin-St Jeor (âge, sexe, poids, taille)",
        "bmrKatch": "Taux Métabolique de Base utilisant Katch-McArdle (masse corporelle maigre — nécessite % graisse corporelle)",
        "tdee": "Dépense Énergétique Quotidienne Totale — calories pour maintenir le poids actuel",
        "surplusPercent": "Votre excédent en pourcentage du TDEE — 10-20% est recommandé pour la prise de masse",
        "currentBmi": "Votre Indice de Masse Corporelle actuel basé sur le poids et la taille",
        "goalBmi": "Votre IMC projeté au poids cible — suivez le changement d'IMC pendant votre prise de masse",
        "gainRate": "Prise hebdomadaire en pourcentage du poids corporel — 0,25-0,5% est optimal pour les gains maigres",
        "gainQuality": "Évaluation basée sur le taux de prise relatif au poids corporel — plus lent = plus maigre",
        "leanFatRatio": "Répartition estimée du gain muscle vs graisse basée sur la taille de l'excédent et la graisse corporelle"
      },
      "presets": {
        "leanBulk": {
          "label": "Prise Sèche",
          "description": "Approche conservatrice — minimiser le gain de graisse"
        },
        "steadyBulk": {
          "label": "Prise Régulière",
          "description": "Gain musculaire équilibré à rythme modéré"
        },
        "fastBulk": {
          "label": "Prise Rapide",
          "description": "Excédent agressif pour débutants ou hard gainers"
        },
        "underweightRecovery": {
          "label": "Récupération Maigreur",
          "description": "Homme 20 ans, 55kg, sous-poids — gain modéré avec analyse complète ACTIVÉE"
        },
        "femaleLeanBulk": {
          "label": "Prise Sèche Femme",
          "description": "Femme 26 ans, 55kg, rythme lent — composition corporelle ACTIVÉE"
        }
      },
      "values": {
        "cal": "cal",
        "kcal": "kcal",
        "g": "g",
        "kg": "kg",
        "lbs": "lbs",
        "lb": "lb",
        "weeks": "semaines",
        "week": "semaine",
        "months": "mois",
        "month": "mois",
        "day": "jour",
        "/day": "/jour",
        "/week": "/semaine",
        "cal/day": "cal/jour",
        "% BW/wk": "% PC/sem",
        "Underweight": "Maigreur",
        "Normal": "Normal",
        "Overweight": "Surpoids",
        "Obese": "Obèse",
        "Week": "Semaine",
        "Goal": "🎯 Objectif",
        "Protein": "Protéines",
        "Carbs": "Glucides",
        "Fat": "Lipides",
        "Requires body fat %": "Nécessite % graisse corporelle"
      },
      "formats": {
        "summary": "Consommez {dailyCalories} cal/jour (+{surplus} excédent) pour gagner {weeklyGain}/semaine. Votre BMR est {bmr} cal et TDEE est {tdee} cal. Temps estimé pour atteindre {targetWeight} : {timeToGoal}."
      },
      "infoCards": {
        "nutritionTips": {
          "title": "🍽️ Conseils Nutrition",
          "items": [
            "Mangez toutes les 3-4 heures pour répartir votre excédent calorique sur la journée",
            "Priorisez les protéines à chaque repas — visez 25-40g par portion",
            "Choisissez des aliments denses en calories : noix, avocat, huile d'olive, céréales complètes",
            "Suivez les calories pendant au moins 2 semaines pour vous assurer d'être en excédent"
          ]
        },
        "trainingTips": {
          "title": "🏋️ Conseils Entraînement",
          "items": [
            "Suivez un programme de surcharge progressive — augmentez le poids ou les répétitions chaque semaine",
            "Concentrez-vous sur les mouvements composés : squats, soulevés de terre, développé couché, tirages, développé militaire",
            "Entraînez chaque groupe musculaire 2× par semaine pour un stimulus de croissance optimal",
            "Dormez 7-9 heures — la plupart de la récupération musculaire se fait pendant le sommeil profond"
          ]
        },
        "quickFacts": {
          "title": "📊 Faits Rapides",
          "items": [
            "1 lb de prise de poids nécessite environ un excédent de 3 500 calories",
            "Les débutants peuvent gagner 0,75-1 kg de muscle par mois avec un entraînement approprié",
            "La synthèse protéique atteint son pic 24-48 heures après une séance de musculation",
            "Un excédent calorique de 10-20% est la fourchette recommandée pour la prise de masse sèche"
          ]
        }
      },
      "referenceData": {
        "activityLevels": {
          "title": "Multiplicateurs Niveaux d'Activité",
          "items": {
            "sedentary": {
              "label": "Sédentaire",
              "value": "×1,2 — Travail de bureau, peu d'exercice"
            },
            "light": {
              "label": "Légèrement Actif",
              "value": "×1,375 — Exercice léger 1-3 jours/semaine"
            },
            "moderate": {
              "label": "Modérément Actif",
              "value": "×1,55 — Exercice modéré 3-5 jours/semaine"
            },
            "active": {
              "label": "Très Actif",
              "value": "×1,725 — Exercice intense 6-7 jours/semaine"
            },
            "veryActive": {
              "label": "Extra Actif",
              "value": "×1,9 — Athlète ou travail physique"
            }
          }
        }
      },
      "detailedTable": {
        "weeklyPlan": {
          "button": "📋 Voir Plan de Prise Hebdomadaire",
          "title": "Plan Hebdomadaire de Prise de Poids & Macros",
          "columns": {
            "week": "Semaine",
            "weight": "Poids Est.",
            "dailyCal": "Cal Quotidiennes",
            "protein": "Protéines",
            "carbs": "Glucides",
            "fat": "Lipides"
          }
        }
      },
      "chart": {
        "title": "Projection de Prise de Poids",
        "xLabel": "Semaine",
        "yLabel": "Poids",
        "series": {
          "weight": "Poids Projeté",
          "goalWeight": "Poids Objectif"
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'un Calculateur de Prise de Poids ?",
          "content": "Un calculateur de prise de poids estime combien de calories vous devez consommer chaque jour pour prendre du poids à un rythme sain et durable. Il utilise votre Taux Métabolique de Base (BMR) — les calories que votre corps brûle au repos — et l'ajuste selon votre niveau d'activité pour trouver votre Dépense Énergétique Quotidienne Totale (TDEE). En ajoutant un excédent calorique contrôlé au-dessus de votre TDEE, le calculateur fournit un objectif calorique quotidien personnalisé et une répartition des macros pour soutenir le gain de masse maigre tout en minimisant l'accumulation excessive de graisse. Cette approche est bien plus efficace que deviner ou simplement 'manger plus', car elle vous donne un point de départ précis basé sur votre composition corporelle unique et votre style de vie."
        },
        "howItWorks": {
          "title": "Comment Fonctionnent les Formules BMR",
          "content": "Ce calculateur utilise deux formules BMR. L'équation de Mifflin-St Jeor est la référence pour la plupart des gens : pour les hommes, BMR = (10 × poids en kg) + (6,25 × taille en cm) − (5 × âge) + 5 ; pour les femmes, BMR = (10 × poids en kg) + (6,25 × taille en cm) − (5 × âge) − 161. Si vous entrez le pourcentage de graisse corporelle, la formule de Katch-McArdle (BMR = 370 + 21,6 × masse maigre en kg) est aussi calculée et utilisée pour des résultats plus précis. Votre BMR est multiplié par un facteur d'activité (1,2 à 1,9) pour obtenir votre TDEE. Pour prendre du poids, vous mangez au-dessus de votre TDEE : un excédent de 10% pour la prise sèche, 15% pour des gains modérés, ou 20% pour une prise de poids agressive. L'excédent est converti en gain hebdomadaire estimé utilisant ~3 500 calories par livre."
        },
        "gainTips": {
          "title": "Stratégies de Prise de Poids Saine",
          "items": [
            {
              "text": "Mangez avec un excédent constant chaque jour — sauter des jours ralentit significativement les progrès",
              "type": "info"
            },
            {
              "text": "Priorisez les protéines (1g par lb de poids corporel) pour maximiser le gain musculaire sur la graisse",
              "type": "info"
            },
            {
              "text": "Choisissez des sources caloriques denses en nutriments plutôt que de la malbouffe pour la santé à long terme",
              "type": "info"
            },
            {
              "text": "L'entraînement en résistance est essentiel — les calories supplémentaires sans entraînement ajoutent juste de la graisse",
              "type": "warning"
            },
            {
              "text": "Suivez votre poids hebdomadairement, pas quotidiennement — les fluctuations quotidiennes sont normales (eau, timing alimentaire)",
              "type": "info"
            },
            {
              "text": "Augmentez les calories de 100-200 si vous ne prenez pas après 2 semaines consistantes",
              "type": "info"
            }
          ]
        },
        "mistakes": {
          "title": "Erreurs Communes en Prise de Masse",
          "items": [
            {
              "text": "La prise de masse sale (manger n'importe quoi) mène à un gain excessif de graisse et des problèmes de santé",
              "type": "warning"
            },
            {
              "text": "Ne pas suivre les calories — la plupart des gens surestiment combien ils mangent réellement",
              "type": "warning"
            },
            {
              "text": "Sauter des repas ou être incohérent avec l'horaire alimentaire fait dérailler les progrès",
              "type": "info"
            },
            {
              "text": "Négliger le sommeil et la récupération — le muscle se construit pendant le repos, pas en salle",
              "type": "info"
            },
            {
              "text": "Fixer des délais irréalistes — un gain durable est de 0,25-0,5 kg par semaine pour la plupart des gens",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul",
          "description": "Exemples étape par étape utilisant la formule de Mifflin-St Jeor",
          "examples": [
            {
              "title": "Homme, 25 ans, 70 kg, 177 cm, Activité Modérée",
              "steps": [
                "Données : 70 kg, 177 cm",
                "BMR = (10 × 70) + (6,25 × 177) − (5 × 25) + 5 = 1 696 cal",
                "TDEE = 1 696 × 1,55 (modéré) = 2 629 cal/jour",
                "Excédent modéré (+15%) : 2 629 × 1,15 = 3 023 cal/jour",
                "Excédent = 3 023 − 2 629 = 394 cal/jour",
                "Gain hebdomadaire = (394 × 7) / 3 500 ≈ 0,79 lb/semaine"
              ],
              "result": "Consommez ~3 023 cal/jour pour gagner ~0,36 kg/semaine"
            },
            {
              "title": "Femme, 30 ans, 55 kg, 165 cm, Légèrement Active",
              "steps": [
                "BMR = (10 × 55) + (6,25 × 165) − (5 × 30) − 161 = 1 271 cal",
                "TDEE = 1 271 × 1,375 (léger) = 1 748 cal/jour",
                "Excédent lent (+10%) : 1 748 × 1,10 = 1 923 cal/jour",
                "Excédent = 1 923 − 1 748 = 175 cal/jour",
                "Gain hebdomadaire = (175 × 7) / 3 500 ≈ 0,35 lb/semaine"
              ],
              "result": "Consommez ~1 923 cal/jour pour gagner ~0,16 kg/semaine"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de calories dois-je consommer pour prendre du poids ?",
          "answer": "Vous devez consommer plus de calories que votre corps n'en brûle (TDEE). Un excédent de 10-20% au-dessus du TDEE est recommandé. Pour la plupart des gens, cela signifie manger 250-500 calories supplémentaires par jour, ce qui résulte en environ 0,25-0,5 kg de prise de poids par semaine. Utilisez ce calculateur pour trouver votre nombre exact basé sur votre âge, poids, taille et niveau d'activité."
        },
        {
          "question": "Qu'est-ce que l'équation de Mifflin-St Jeor ?",
          "answer": "L'équation de Mifflin-St Jeor est une formule scientifiquement validée pour estimer le Taux Métabolique de Base (BMR). Publiée en 1990, elle s'est révélée plus précise que l'ancienne équation de Harris-Benedict. Elle calcule les calories brûlées au repos en utilisant votre poids, taille, âge et sexe, puis multipliée par un facteur d'activité pour estimer la dépense énergétique quotidienne totale."
        },
        {
          "question": "À quelle vitesse dois-je prendre du poids ?",
          "answer": "La recherche suggère que 0,25-0,5% de votre poids corporel par semaine est optimal pour les gains maigres. Pour une personne de 70 kg, cela représente environ 0,18-0,35 kg par semaine. Des rythmes plus rapides mènent à plus de gain de graisse relativement au muscle. Les débutants peuvent prendre un peu plus rapidement (jusqu'à 0,5 kg/semaine) car ils ont un plus grand potentiel de construction musculaire durant leur première année d'entraînement."
        },
        {
          "question": "Dois-je suivre les macros ou juste les calories ?",
          "answer": "Suivre les macros (protéines, glucides, lipides) mène à de meilleurs résultats que suivre les calories seules. Les protéines sont la macro la plus importante pour la prise de poids — visez 0,8-1g par livre de poids corporel quotidiennement. Les lipides devraient représenter environ 25% des calories totales pour la santé hormonale. Les calories restantes proviennent des glucides, qui alimentent les entraînements et la récupération."
        },
        {
          "question": "Puis-je gagner du muscle sans gagner de graisse ?",
          "answer": "Il est très difficile de gagner du muscle sans aucun gain de graisse, mais vous pouvez minimiser le gain de graisse en gardant votre excédent petit (10-15%), en consommant suffisamment de protéines, en suivant un programme d'entraînement de résistance progressif, et en dormant adéquatement. Les débutants et les personnes qui reprennent l'entraînement après une pause peuvent parfois gagner du muscle tout en perdant de la graisse (recomposition corporelle)."
        },
        {
          "question": "Que faire si je ne prends pas de poids ?",
          "answer": "Si vous ne prenez pas de poids après 2 semaines consistantes, vous n'êtes pas en excédent calorique. Les raisons communes incluent : sous-estimer les portions, sauter des repas, activité accrue brûlant des calories supplémentaires, ou un métabolisme plus élevé qu'estimé. Augmentez l'apport quotidien de 200-300 calories et réévaluez après 2 autres semaines."
        },
        {
          "question": "Quelle est la différence entre BMR et TDEE ?",
          "answer": "BMR (Taux Métabolique de Base) sont les calories que votre corps brûle au repos complet — juste pour faire fonctionner vos organes. TDEE (Dépense Énergétique Quotidienne Totale) inclut le BMR plus toutes les calories brûlées par l'activité quotidienne, l'exercice, et la digestion des aliments. Le TDEE est toujours plus élevé que le BMR et représente les calories réelles dont vous avez besoin pour maintenir votre poids actuel."
        },
        {
          "question": "Que signifie 'qualité de prise' ?",
          "answer": "La qualité de prise mesure comment votre gain de poids hebdomadaire se compare à la fourchette optimale de 0,25-0,5% du poids corporel par semaine. Dans cette fourchette, vous maximisez le ratio muscle/graisse gagné. En dessous de 0,25% est très maigre mais lent, et au-dessus de 0,5% signifie qu'une plus grande portion du poids gagné sera probablement de la graisse plutôt que du muscle. Le toggle composition corporelle montre votre évaluation de qualité de prise."
        },
        {
          "question": "Pourquoi le calculateur montre-t-il deux formules BMR ?",
          "answer": "La formule de Mifflin-St Jeor utilise l'âge, le sexe, le poids et la taille — précise pour la plupart des gens. La formule de Katch-McArdle utilise la masse corporelle maigre (nécessite % graisse corporelle) et est plus précise pour les individus maigres ou musclés. Quand vous entrez le % de graisse corporelle, le calculateur utilise Katch-McArdle pour une meilleure précision mais montre les deux résultats pour que vous puissiez comparer. La différence est typiquement de 50-150 calories par jour."
        }
      ],
      "buttons": {
        "calculate": "Calculer",
        "reset": "Réinitialiser",
        "pdf": "PDF",
        "csv": "CSV",
        "excel": "Excel",
        "save": "Sauvegarder",
        "saved": "Sauvegardé",
        "saving": "Sauvegarde..."
      },
      "share": {
        "calculatedWith": "Calculé avec Kalcufy.com"
      },
      "ui": {
        "results": "Résultats",
        "yourInformation": "Vos Informations"
      },
      "accessibility": {
        "mobileResults": "Résumé des résultats",
        "closeModal": "Fermer",
        "openMenu": "Ouvrir le menu"
      },
      "rating": {
        "title": "Notez cette Calculatrice",
        "share": "Partager",
        "copied": "Copié!",
        "copyLink": "Copier le Lien",
        "clickToRate": "Cliquez pour noter",
        "youRated": "Vous avez noté",
        "stars": "étoiles",
        "averageFrom": "moyenne de",
        "ratings": "évaluations"
      },
      "common": {
        "home": "Accueil",
        "calculators": "Calculatrices"
      },
      "sources": {
        "title": "Sources et Références"
      }
    },
    de: {
      "name": "Gewichtszunahme Rechner",
      "slug": "gewichtszunahme-rechner",
      "subtitle": "Berechne tägliche Kalorien, Überschuss, Makros und Körperzusammensetzungs-Tracking für sichere Gewichtszunahme mit Mifflin-St Jeor und Katch-McArdle Formeln",
      "breadcrumb": "Gewichtszunahme",
      "seo": {
        "title": "Gewichtszunahme Rechner — Kalorienüberschuss, Makros & Körperzusammensetzung | Kostenlos",
        "description": "Berechne wie viele Kalorien du für die Gewichtszunahme benötigst mit einem personalisierten Wochenplan. Nutzt Mifflin-St Jeor und Katch-McArdle BMR, TDEE, Kalorienüberschuss, Makro-Ziele, BMI-Tracking und Zunahme-Qualitäts-Analyse.",
        "shortDescription": "Plane deine Gewichtszunahme mit personalisierten Kalorien-, Makro- und Körperzusammensetzungs-Zielen",
        "keywords": [
          "gewichtszunahme rechner",
          "kalorienüberschuss rechner",
          "masse aufbau rechner",
          "wie viele kalorien für gewichtszunahme",
          "muskelaufbau kalorien rechner",
          "TDEE rechner gewichtszunahme",
          "makro rechner masseaufbau",
          "lean bulk rechner",
          "körperkomposition rechner"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "gender": {
          "label": "Geschlecht",
          "helpText": "BMR-Formeln unterscheiden sich nach biologischem Geschlecht",
          "options": {
            "male": "Männlich",
            "female": "Weiblich"
          }
        },
        "age": {
          "label": "Alter",
          "helpText": "Alter 15–80 für präzise BMR-Schätzung"
        },
        "weight": {
          "label": "Aktuelles Gewicht",
          "helpText": "Dein aktuelles Körpergewicht"
        },
        "height": {
          "label": "Größe",
          "helpText": "Deine Größe für BMR-Berechnung"
        },
        "targetWeight": {
          "label": "Zielgewicht",
          "helpText": "Dein Wunschgewicht — muss höher als aktuelles Gewicht sein"
        },
        "activityLevel": {
          "label": "Aktivitätslevel",
          "helpText": "Deine typische wöchentliche Trainingsroutine",
          "options": {
            "sedentary": "Sitzend (wenig oder kein Sport)",
            "light": "Leicht aktiv (1–3 Tage/Woche)",
            "moderate": "Mäßig aktiv (3–5 Tage/Woche)",
            "active": "Sehr aktiv (6–7 Tage/Woche)",
            "veryActive": "Extrem aktiv (Athlet / körperliche Arbeit)"
          }
        },
        "gainPace": {
          "label": "Zunahme-Tempo",
          "helpText": "Langsameres Tempo = mehr Muskelmasse, weniger Fett",
          "options": {
            "slow": "Lean Bulk",
            "moderate": "Standard",
            "aggressive": "Schneller Aufbau"
          },
          "descriptions": {
            "slow": "0,23 kg/Wo",
            "moderate": "0,45 kg/Wo",
            "aggressive": "0,68 kg/Wo"
          }
        },
        "bodyFatPercent": {
          "label": "Körperfettanteil %",
          "helpText": "Optional — ermöglicht Katch-McArdle BMR und Körperzusammensetzungs-Analyse",
          "placeholder": "z.B. 18"
        },
        "showMetabolic": {
          "label": "Stoffwechsel-Details anzeigen",
          "helpText": "Aktivieren um BMR-Formeln, TDEE-Aufschlüsselung und Überschuss-Prozentsatz zu sehen"
        },
        "showBodyComp": {
          "label": "Körperzusammensetzung anzeigen",
          "helpText": "Aktivieren um BMI-Tracking, Zunahme-Qualitäts-Bewertung und Muskel-vs-Fett-Schätzungen zu sehen"
        }
      },
      "inputGroups": {},
      "results": {
        "dailyCalories": {
          "label": "Tägliche Kalorien"
        },
        "surplusCalories": {
          "label": "Täglicher Überschuss"
        },
        "weeklyGain": {
          "label": "Wöchentliche Zunahme"
        },
        "timeToGoal": {
          "label": "Zeit bis zum Ziel"
        },
        "proteinTarget": {
          "label": "Protein-Ziel"
        },
        "carbsTarget": {
          "label": "Kohlenhydrat-Ziel"
        },
        "fatTarget": {
          "label": "Fett-Ziel"
        },
        "bmrMifflin": {
          "label": "BMR (Mifflin-St Jeor)"
        },
        "bmrKatch": {
          "label": "BMR (Katch-McArdle)"
        },
        "tdee": {
          "label": "Erhaltung (TDEE)"
        },
        "surplusPercent": {
          "label": "Überschuss %"
        },
        "currentBmi": {
          "label": "Aktueller BMI"
        },
        "goalBmi": {
          "label": "Ziel-BMI"
        },
        "gainRate": {
          "label": "Wöchentliche Zunahme (% KG)"
        },
        "gainQuality": {
          "label": "Zunahme-Qualität"
        },
        "leanFatRatio": {
          "label": "Geschätzt Muskel vs Fett"
        }
      },
      "tooltips": {
        "dailyCalories": "Gesamte tägliche Kalorien für Gewichtszunahme (TDEE + Überschuss)",
        "surplusCalories": "Extra Kalorien über TDEE hinaus für Gewichtszunahme benötigt",
        "weeklyGain": "Geschätzte Gewichtszunahme pro Woche bei diesem Überschuss",
        "timeToGoal": "Geschätzte Zeit um dein Zielgewicht beim gewählten Tempo zu erreichen",
        "proteinTarget": "Empfohlene tägliche Proteinzufuhr für mageren Muskelaufbau (1g/kg KG)",
        "carbsTarget": "Tägliches Kohlenhydrat-Ziel für Energie und Erholung",
        "fatTarget": "Tägliches Fett-Ziel für hormonelle Gesundheit (~25% der Kalorien)",
        "bmrMifflin": "Grundumsatz mit Mifflin-St Jeor (Alter, Geschlecht, Gewicht, Größe)",
        "bmrKatch": "Grundumsatz mit Katch-McArdle (Magermasse — benötigt Körperfettanteil %)",
        "tdee": "Gesamtumsatz — Kalorien zum Erhalt des aktuellen Gewichts",
        "surplusPercent": "Dein Überschuss als Prozentsatz von TDEE — 10-20% ist empfohlen für Masseaufbau",
        "currentBmi": "Dein aktueller Body-Mass-Index basierend auf Gewicht und Größe",
        "goalBmi": "Dein projizierter BMI beim Zielgewicht — verfolge BMI-Änderung während deines Aufbaus",
        "gainRate": "Wöchentliche Zunahme als Prozentsatz des Körpergewichts — 0,25-0,5% ist optimal für magere Zunahmen",
        "gainQuality": "Bewertung basierend auf Zunahme-Rate relativ zum Körpergewicht — langsamer = magerer",
        "leanFatRatio": "Geschätzte Aufteilung von Muskel- vs Fettzunahme basierend auf Überschuss-Größe und Körperfett"
      },
      "presets": {
        "leanBulk": {
          "label": "Lean Bulk",
          "description": "Konservativer Ansatz — Fettzunahme minimieren"
        },
        "steadyBulk": {
          "label": "Stetiger Aufbau",
          "description": "Ausgewogener Muskelaufbau in moderatem Tempo"
        },
        "fastBulk": {
          "label": "Schneller Aufbau",
          "description": "Aggressiver Überschuss für Anfänger oder Hardgainer"
        },
        "underweightRecovery": {
          "label": "Untergewicht Aufbau",
          "description": "20j Mann, 55kg, untergewichtig — moderate Zunahme mit vollständiger Analyse EIN"
        },
        "femaleLeanBulk": {
          "label": "Weiblicher Lean Bulk",
          "description": "26j Frau, 55kg, langsames Tempo — Körperzusammensetzung EIN"
        }
      },
      "values": {
        "cal": "kcal",
        "kcal": "kcal",
        "g": "g",
        "kg": "kg",
        "lbs": "lbs",
        "lb": "lb",
        "weeks": "Wochen",
        "week": "Woche",
        "months": "Monate",
        "month": "Monat",
        "day": "Tag",
        "/day": "/Tag",
        "/week": "/Woche",
        "cal/day": "kcal/Tag",
        "% BW/wk": "% KG/Wo",
        "Underweight": "Untergewicht",
        "Normal": "Normal",
        "Overweight": "Übergewicht",
        "Obese": "Adipös",
        "Week": "Woche",
        "Goal": "🎯 Ziel",
        "Protein": "Protein",
        "Carbs": "Kohlenhydrate",
        "Fat": "Fett",
        "Requires body fat %": "Benötigt Körperfettanteil %"
      },
      "formats": {
        "summary": "Esse {dailyCalories} kcal/Tag (+{surplus} Überschuss) um {weeklyGain}/Woche zuzunehmen. Dein BMR ist {bmr} kcal und TDEE ist {tdee} kcal. Geschätzte Zeit um {targetWeight} zu erreichen: {timeToGoal}."
      },
      "infoCards": {
        "nutritionTips": {
          "title": "🍽️ Ernährungs-Tipps",
          "items": [
            "Esse alle 3–4 Stunden um deinen Kalorienüberschuss über den Tag zu verteilen",
            "Priorisiere Protein bei jeder Mahlzeit — ziele auf 25–40g pro Portion",
            "Wähle kalorienreiche Lebensmittel: Nüsse, Avocado, Olivenöl, Vollkornprodukte",
            "Tracke Kalorien mindestens 2 Wochen um sicherzustellen, dass du wirklich im Überschuss bist"
          ]
        },
        "trainingTips": {
          "title": "🏋️ Training-Tipps",
          "items": [
            "Folge einem progressiven Überlastungs-Programm — steigere Gewicht oder Wiederholungen wöchentlich",
            "Fokussiere auf Grundübungen: Kniebeugen, Kreuzheben, Bankdrücken, Rudern, Überkopfdrücken",
            "Trainiere jede Muskelgruppe 2× pro Woche für optimalen Wachstumsreiz",
            "Schlafe 7–9 Stunden — die meiste Muskelregeneration passiert im Tiefschlaf"
          ]
        },
        "quickFacts": {
          "title": "📊 Schnelle Fakten",
          "items": [
            "0,45 kg Gewichtszunahme benötigt etwa einen 3.500-Kalorien-Überschuss",
            "Anfänger können 0,7–0,9 kg Muskeln pro Monat mit richtigem Training aufbauen",
            "Proteinsynthese erreicht ihren Höhepunkt 24–48 Stunden nach einer Krafttraining-Einheit",
            "Ein 10–20% Kalorienüberschuss ist der empfohlene Bereich für Lean Bulking"
          ]
        }
      },
      "referenceData": {
        "activityLevels": {
          "title": "Aktivitätslevel Multiplikatoren",
          "items": {
            "sedentary": {
              "label": "Sitzend",
              "value": "×1,2 — Bürojob, wenig Sport"
            },
            "light": {
              "label": "Leicht aktiv",
              "value": "×1,375 — Leichtes Training 1–3 Tage/Woche"
            },
            "moderate": {
              "label": "Mäßig aktiv",
              "value": "×1,55 — Moderates Training 3–5 Tage/Woche"
            },
            "active": {
              "label": "Sehr aktiv",
              "value": "×1,725 — Hartes Training 6–7 Tage/Woche"
            },
            "veryActive": {
              "label": "Extrem aktiv",
              "value": "×1,9 — Athlet oder körperliche Arbeit"
            }
          }
        }
      },
      "detailedTable": {
        "weeklyPlan": {
          "button": "📋 Wöchentlichen Zunahme-Plan anzeigen",
          "title": "Wöchentlicher Gewichtszunahme-Plan & Makros",
          "columns": {
            "week": "Woche",
            "weight": "Geschätztes Gewicht",
            "dailyCal": "Tägliche kcal",
            "protein": "Protein",
            "carbs": "Kohlenhydrate",
            "fat": "Fett"
          }
        }
      },
      "chart": {
        "title": "Gewichtszunahme-Prognose",
        "xLabel": "Woche",
        "yLabel": "Gewicht",
        "series": {
          "weight": "Prognostiziertes Gewicht",
          "goalWeight": "Zielgewicht"
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist ein Gewichtszunahme-Rechner?",
          "content": "Ein Gewichtszunahme-Rechner schätzt wie viele Kalorien du täglich essen musst, um in einem gesunden, nachhaltigen Tempo zuzunehmen. Er nutzt deinen Grundumsatz (BMR) — die Kalorien, die dein Körper in Ruhe verbrennt — und passt ihn basierend auf deinem Aktivitätslevel an, um deinen Gesamtumsatz (TDEE) zu ermitteln. Durch das Hinzufügen eines kontrollierten Kalorienüberschusses zu deinem TDEE liefert der Rechner ein personalisiertes tägliches Kalorienziel und Makro-Aufschlüsselung zur Unterstützung mageren Muskelaufbaus bei minimaler überschüssiger Fettansammlung. Dieser Ansatz ist weit effektiver als Raten oder einfach 'mehr essen', weil er dir einen präzisen Startpunkt basierend auf deiner einzigartigen Körperzusammensetzung und Lebensstil gibt."
        },
        "howItWorks": {
          "title": "Wie die BMR-Formeln funktionieren",
          "content": "Dieser Rechner nutzt zwei BMR-Formeln. Die Mifflin-St Jeor Gleichung ist der Goldstandard für die meisten Menschen: für Männer, BMR = (10 × Gewicht in kg) + (6,25 × Größe in cm) − (5 × Alter) + 5; für Frauen, BMR = (10 × Gewicht in kg) + (6,25 × Größe in cm) − (5 × Alter) − 161. Wenn du den Körperfettanteil eingibst, wird auch die Katch-McArdle Formel (BMR = 370 + 21,6 × Magermasse in kg) berechnet und für genauere Ergebnisse verwendet. Dein BMR wird mit einem Aktivitätsfaktor (1,2 bis 1,9) multipliziert um deinen TDEE zu erhalten. Um Gewicht zuzunehmen, isst du über deinem TDEE: ein 10% Überschuss für Lean Bulking, 15% für moderate Zunahmen, oder 20% für aggressive Gewichtszunahme. Der Überschuss wird in geschätzte wöchentliche Zunahme umgewandelt mit ~3.500 Kalorien pro Pfund."
        },
        "gainTips": {
          "title": "Gesunde Gewichtszunahme-Strategien",
          "items": [
            {
              "text": "Esse täglich in einem konstanten Überschuss — Tage auslassen verlangsamt den Fortschritt erheblich",
              "type": "info"
            },
            {
              "text": "Priorisiere Protein (1g pro kg Körpergewicht) um Muskelaufbau über Fettzunahme zu maximieren",
              "type": "info"
            },
            {
              "text": "Wähle nährstoffreiche Kalorienquellen über Junk Food für langfristige Gesundheit",
              "type": "info"
            },
            {
              "text": "Krafttraining ist essentiell — zusätzliche Kalorien ohne Training führt nur zu Fettzunahme",
              "type": "warning"
            },
            {
              "text": "Verfolge dein Gewicht wöchentlich, nicht täglich — tägliche Schwankungen sind normal (Wasser, Essenszeiten)",
              "type": "info"
            },
            {
              "text": "Erhöhe die Kalorien um 100–200 wenn du nach 2 konsistenten Wochen nicht zunimmst",
              "type": "info"
            }
          ]
        },
        "mistakes": {
          "title": "Häufige Fehler beim Masseaufbau",
          "items": [
            {
              "text": "Dirty Bulking (alles essen) führt zu übermäßiger Fettzunahme und Gesundheitsproblemen",
              "type": "warning"
            },
            {
              "text": "Kalorien nicht tracken — die meisten Menschen überschätzen wie viel sie tatsächlich essen",
              "type": "warning"
            },
            {
              "text": "Mahlzeiten auslassen oder unregelmäßiger Essensplan entgleist den Fortschritt",
              "type": "info"
            },
            {
              "text": "Schlaf und Erholung vernachlässigen — Muskeln werden während der Ruhe aufgebaut, nicht im Gym",
              "type": "info"
            },
            {
              "text": "Unrealistische Zeitpläne setzen — nachhaltige Zunahme ist 0,23–0,45 kg pro Woche für die meisten Menschen",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Berechnungs-Beispiele",
          "description": "Schritt-für-Schritt Beispiele mit der Mifflin-St Jeor Formel",
          "examples": [
            {
              "title": "Mann, 25, 70 kg, 177 cm, Mäßige Aktivität",
              "steps": [
                "BMR = (10 × 70) + (6,25 × 177) − (5 × 25) + 5 = 1.696 kcal",
                "TDEE = 1.696 × 1,55 (mäßig) = 2.629 kcal/Tag",
                "Moderater Überschuss (+15%): 2.629 × 1,15 = 3.023 kcal/Tag",
                "Überschuss = 3.023 − 2.629 = 394 kcal/Tag",
                "Wöchentliche Zunahme = (394 × 7) / 3.500 ≈ 0,36 kg/Woche"
              ],
              "result": "Esse ~3.023 kcal/Tag um ~0,36 kg/Woche zuzunehmen"
            },
            {
              "title": "Frau, 30, 55 kg, 165 cm, Leicht aktiv",
              "steps": [
                "BMR = (10 × 55) + (6,25 × 165) − (5 × 30) − 161 = 1.271 kcal",
                "TDEE = 1.271 × 1,375 (leicht) = 1.748 kcal/Tag",
                "Langsamer Überschuss (+10%): 1.748 × 1,10 = 1.923 kcal/Tag",
                "Überschuss = 1.923 − 1.748 = 175 kcal/Tag",
                "Wöchentliche Zunahme = (175 × 7) / 3.500 ≈ 0,16 kg/Woche"
              ],
              "result": "Esse ~1.923 kcal/Tag um ~0,16 kg/Woche zuzunehmen"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viele Kalorien sollte ich essen um Gewicht zuzunehmen?",
          "answer": "Du musst mehr Kalorien essen als dein Körper verbrennt (TDEE). Ein Überschuss von 10–20% über TDEE wird empfohlen. Für die meisten Menschen bedeutet das 250–500 zusätzliche Kalorien pro Tag, was zu etwa 0,23–0,45 kg Gewichtszunahme pro Woche führt. Nutze diesen Rechner um deine exakte Zahl basierend auf deinem Alter, Gewicht, Größe und Aktivitätslevel zu finden."
        },
        {
          "question": "Was ist die Mifflin-St Jeor Gleichung?",
          "answer": "Die Mifflin-St Jeor Gleichung ist eine wissenschaftlich validierte Formel zur Schätzung des Grundumsatzes (BMR). Veröffentlicht 1990, hat sie sich als genauer als die ältere Harris-Benedict Gleichung erwiesen. Sie berechnet in Ruhe verbrannte Kalorien mit deinem Gewicht, Größe, Alter und Geschlecht, dann multipliziert mit einem Aktivitätsfaktor um den Gesamtumsatz zu schätzen."
        },
        {
          "question": "Wie schnell sollte ich Gewicht zunehmen?",
          "answer": "Forschung zeigt dass 0,25–0,5% deines Körpergewichts pro Woche optimal für magere Zunahmen ist. Für eine 70 kg Person sind das etwa 0,18–0,35 kg pro Woche. Schnellere Raten führen zu mehr Fettzunahme relativ zum Muskel. Anfänger können etwas schneller zunehmen (bis zu 0,45 kg/Woche) da sie größeres muskelaufbauendes Potenzial in ihrem ersten Trainingsjahr haben."
        },
        {
          "question": "Sollte ich Makros oder nur Kalorien tracken?",
          "answer": "Makros tracken (Protein, Kohlenhydrate, Fett) führt zu besseren Ergebnissen als nur Kalorien zu tracken. Protein ist das wichtigste Makro für Gewichtszunahme — ziele auf 0,8–1g pro kg Körpergewicht täglich. Fett sollte etwa 25% der Gesamtkalorien für hormonelle Gesundheit sein. Die verbleibenden Kalorien kommen aus Kohlenhydraten, die Workouts und Erholung antreiben."
        },
        {
          "question": "Kann ich Muskeln ohne Fettzunahme aufbauen?",
          "answer": "Es ist sehr schwierig Muskeln ohne jede Fettzunahme aufzubauen, aber du kannst Fettzunahme minimieren indem du deinen Überschuss klein hältst (10–15%), ausreichend Protein isst, einem progressiven Krafttraining-Programm folgst und ausreichend schläfst. Anfänger und Menschen die nach einer Pause zum Training zurückkehren können manchmal Muskeln aufbauen während sie Fett verlieren (Körperrekomposition)."
        },
        {
          "question": "Was wenn ich nicht an Gewicht zunehme?",
          "answer": "Wenn du nach 2 konsistenten Wochen nicht an Gewicht zunimmst, bist du nicht in einem Kalorienüberschuss. Häufige Gründe sind: Portionsgrößen unterschätzen, Mahlzeiten auslassen, erhöhte Aktivität verbrennt extra Kalorien, oder ein höherer Stoffwechsel als geschätzt. Erhöhe die tägliche Aufnahme um 200–300 Kalorien und bewerte nach weiteren 2 Wochen neu."
        },
        {
          "question": "Was ist der Unterschied zwischen BMR und TDEE?",
          "answer": "BMR (Grundumsatz) sind die Kalorien die dein Körper in kompletter Ruhe verbrennt — nur um deine Organe funktionsfähig zu halten. TDEE (Gesamtumsatz) beinhaltet BMR plus alle Kalorien die durch tägliche Aktivität, Sport und Nahrungsverdauung verbrannt werden. TDEE ist immer höher als BMR und repräsentiert die tatsächlichen Kalorien die du zur Erhaltung deines aktuellen Gewichts benötigst."
        },
        {
          "question": "Was bedeutet 'Zunahme-Qualität'?",
          "answer": "Zunahme-Qualität misst wie deine wöchentliche Gewichtszunahme mit dem optimalen Bereich von 0,25–0,5% des Körpergewichts pro Woche vergleicht. Innerhalb dieses Bereichs maximierst du das Verhältnis von Muskel zu Fett Zunahme. Unter 0,25% ist sehr mager aber langsam, und über 0,5% bedeutet dass ein größerer Anteil der zugenommenen Gewichts wahrscheinlich Fett statt Muskel sein wird. Der Körperzusammensetzungs-Schalter zeigt deine Zunahme-Qualitäts-Bewertung."
        },
        {
          "question": "Warum zeigt der Rechner zwei BMR-Formeln?",
          "answer": "Die Mifflin-St Jeor Formel nutzt Alter, Geschlecht, Gewicht und Größe — genau für die meisten Menschen. Die Katch-McArdle Formel nutzt Magermasse (benötigt Körperfett %) und ist genauer für magere oder muskulöse Individuen. Wenn du Körperfett % eingibst, nutzt der Rechner Katch-McArdle für bessere Präzision aber zeigt beide Ergebnisse damit du vergleichen kannst. Der Unterschied ist typischerweise 50-150 Kalorien pro Tag."
        }
      ],
      "buttons": {
        "calculate": "Berechnen",
        "reset": "Zurücksetzen",
        "pdf": "PDF",
        "csv": "CSV",
        "excel": "Excel",
        "save": "Speichern",
        "saved": "Gespeichert",
        "saving": "Speichern..."
      },
      "share": {
        "calculatedWith": "Berechnet mit Kalcufy.com"
      },
      "ui": {
        "results": "Ergebnisse",
        "yourInformation": "Ihre Informationen"
      },
      "accessibility": {
        "mobileResults": "Ergebniszusammenfassung",
        "closeModal": "Schließen",
        "openMenu": "Menü öffnen"
      },
      "rating": {
        "title": "Bewerten Sie diesen Rechner",
        "share": "Teilen",
        "copied": "Kopiert!",
        "copyLink": "Link kopieren",
        "clickToRate": "Klicken zum Bewerten",
        "youRated": "Sie haben bewertet",
        "stars": "Sterne",
        "averageFrom": "Durchschnitt von",
        "ratings": "Bewertungen"
      },
      "common": {
        "home": "Startseite",
        "calculators": "Rechner"
      },
      "sources": {
        "title": "Quellen und Referenzen"
      }
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
