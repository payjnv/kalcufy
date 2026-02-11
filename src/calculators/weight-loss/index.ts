import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";
import { convertToBase, convertFromBase } from "@/engine/v4/units";

/* ═══════════════════════════════════════════════════════════════════
   WEIGHT LOSS CALCULATOR — V4.3 Toggle Upgrade (2026-02-10)
   New: Toggle "Show Metabolic Details" + Toggle "Show Body Composition"
   New: Dual BMR display, BMI current→goal, loss quality rating,
        muscle preservation estimate, fiber rec, all 3 macros shown
   New: "Post-Holiday Reset" + "Female Steady Cut" presets
   KEY DIFFERENTIATOR: Metabolic adaptation — recalculates BMR each week
   as weight drops, providing accurate projections competitors lack.
   ═══════════════════════════════════════════════════════════════════ */

export const weightLossConfig: CalculatorConfigV4 = {
  id: "weight-loss",
  version: "4.3",
  category: "health",
  icon: "⚖️",

  // ═══════════════════════════════════════════════════════════════
  // PRESETS (5 presets)
  // ═══════════════════════════════════════════════════════════════
  presets: [
    {
      id: "gradualLoss",
      icon: "🐢",
      values: {
        gender: "male",
        age: 30,
        weight: 90,
        height: 178,
        targetWeight: 82,
        activityLevel: "moderate",
        lossPace: "slow",
        bodyFatPercent: null,
        showMetabolic: false,
        showBodyComp: false,
      },
    },
    {
      id: "steadyLoss",
      icon: "🚶",
      values: {
        gender: "female",
        age: 28,
        weight: 75,
        height: 165,
        targetWeight: 63,
        activityLevel: "light",
        lossPace: "moderate",
        bodyFatPercent: null,
        showMetabolic: false,
        showBodyComp: false,
      },
    },
    {
      id: "aggressiveLoss",
      icon: "🏃",
      values: {
        gender: "male",
        age: 25,
        weight: 100,
        height: 183,
        targetWeight: 82,
        activityLevel: "active",
        lossPace: "aggressive",
        bodyFatPercent: null,
        showMetabolic: false,
        showBodyComp: false,
      },
    },
    {
      id: "postHoliday",
      icon: "🎄",
      values: {
        gender: "male",
        age: 35,
        weight: 95,
        height: 180,
        targetWeight: 85,
        activityLevel: "moderate",
        lossPace: "moderate",
        bodyFatPercent: 25,
        showMetabolic: true,
        showBodyComp: true,
      },
    },
    {
      id: "femaleSteadyCut",
      icon: "🌸",
      values: {
        gender: "female",
        age: 30,
        weight: 68,
        height: 165,
        targetWeight: 58,
        activityLevel: "moderate",
        lossPace: "slow",
        bodyFatPercent: 28,
        showMetabolic: false,
        showBodyComp: true,
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // CHART — Weight projection curve
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
      name: "Weight Loss Calculator",
      slug: "weight-loss-calculator",
      subtitle:
        "Calculate your daily calorie target, deficit, and macros for safe weight loss with metabolic adaptation, dual BMR formulas, and body composition tracking",
      breadcrumb: "Weight Loss",

      seo: {
        title:
          "Weight Loss Calculator — Calorie Deficit, Macros & Body Composition | Free",
        description:
          "Free weight loss calculator with metabolic adaptation, dual BMR formulas, BMI tracking, and muscle preservation analysis. See a realistic week-by-week projection that adjusts as your metabolism changes.",
        shortDescription:
          "Plan your weight loss with adaptive calorie and macro targets plus body composition tracking",
        keywords: [
          "weight loss calculator",
          "calorie deficit calculator",
          "how many calories to lose weight",
          "weight loss calorie calculator",
          "macro calculator weight loss",
          "TDEE calculator for weight loss",
          "metabolic adaptation calculator",
          "weight loss projection",
          "muscle preservation calculator",
        ],
      },

      calculator: { yourInformation: "Your Information" },
      ui: {
        yourInformation: "Your Information",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      // ─── INPUTS ────────────────────────────────────────────
      inputs: {
        gender: {
          label: "Gender",
          helpText: "BMR formulas differ by gender",
          options: { male: "Male", female: "Female" },
        },
        age: {
          label: "Age",
          helpText: "Age affects metabolic rate",
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
          label: "Goal Weight",
          helpText: "Your target weight — must be lower than current weight",
        },
        activityLevel: {
          label: "Activity Level",
          helpText: "How active are you on a typical week?",
          options: {
            sedentary: "Sedentary (desk job, little exercise)",
            light: "Lightly Active (1-3 days/week)",
            moderate: "Moderately Active (3-5 days/week)",
            active: "Very Active (6-7 days/week)",
            veryActive: "Athlete (2× per day / physical job)",
          },
        },
        lossPace: {
          label: "Loss Pace",
          helpText: "Slower pace preserves more muscle mass",
          options: {
            slow: "Gradual",
            moderate: "Moderate",
            aggressive: "Aggressive",
          },
          descriptions: {
            slow: "~0.5 lb/wk",
            moderate: "~1 lb/wk",
            aggressive: "~1.5 lb/wk",
          },
        },
        bodyFatPercent: {
          label: "Body Fat %",
          helpText: "Optional — enables Katch-McArdle BMR and body composition analysis",
          placeholder: "e.g. 25",
        },
        showMetabolic: {
          label: "Show Metabolic Details",
          helpText: "Toggle on to see BMR formulas, TDEE, deficit %, and safety floor status",
        },
        showBodyComp: {
          label: "Show Body Composition",
          helpText: "Toggle on to see BMI tracking, loss quality rating, and muscle preservation estimate",
        },
      },

      // ─── INPUT GROUPS ──────────────────────────────────────
      inputGroups: {},

      // ─── RESULTS ───────────────────────────────────────────
      results: {
        dailyCalories: { label: "Daily Calorie Target" },
        deficitPerDay: { label: "Daily Deficit" },
        weeklyLoss: { label: "Expected Weekly Loss" },
        timeToGoal: { label: "Time to Goal" },
        proteinTarget: { label: "Protein Target" },
        carbsTarget: { label: "Carbs Target" },
        fatTarget: { label: "Fat Target" },
        fiberTarget: { label: "Daily Fiber" },
        // Metabolic (toggle)
        bmrMifflin: { label: "BMR (Mifflin-St Jeor)" },
        bmrKatch: { label: "BMR (Katch-McArdle)" },
        tdee: { label: "Maintenance (TDEE)" },
        deficitPercent: { label: "Deficit %" },
        safetyFloor: { label: "Safety Floor" },
        // Body composition (toggle)
        currentBmi: { label: "Current BMI" },
        goalBmi: { label: "Goal BMI" },
        lossRate: { label: "Weekly Loss (% BW)" },
        lossQuality: { label: "Loss Quality" },
        musclePreservation: { label: "Muscle Preservation" },
      },

      // ─── TOOLTIPS ──────────────────────────────────────────
      tooltips: {
        dailyCalories: "Total calories to eat per day after deficit",
        deficitPerDay: "How many fewer calories than maintenance",
        weeklyLoss: "Expected weight loss per week at this deficit",
        timeToGoal: "Estimated weeks to reach your goal weight",
        proteinTarget: "High protein preserves muscle during a deficit (1g/lb)",
        carbsTarget: "Daily carbohydrate target for energy and workout fuel",
        fatTarget: "Daily fat target for hormonal health (~25% of calories)",
        fiberTarget: "Recommended daily fiber (14g per 1,000 cal) for satiety and digestion",
        bmrMifflin:
          "Basal Metabolic Rate using Mifflin-St Jeor (age, gender, weight, height)",
        bmrKatch:
          "Basal Metabolic Rate using Katch-McArdle (lean body mass — requires body fat %)",
        tdee: "Total Daily Energy Expenditure — your maintenance calories",
        deficitPercent:
          "Your deficit as a percentage of TDEE — 10-20% is the recommended range",
        safetyFloor:
          "Whether the safety minimum was applied (1,500 cal men / 1,200 cal women)",
        currentBmi: "Your current Body Mass Index based on weight and height",
        goalBmi: "Your projected BMI at goal weight",
        lossRate:
          "Weekly loss as percentage of body weight — 0.5-1.0% is optimal",
        lossQuality:
          "Rating based on loss rate relative to body weight — moderate = best",
        musclePreservation:
          "Estimated ability to preserve muscle based on deficit size and protein intake",
      },

      // ─── PRESETS ───────────────────────────────────────────
      presets: {
        gradualLoss: {
          label: "Gradual Loss",
          description: "Male, 90→82 kg, moderate activity, slow pace",
        },
        steadyLoss: {
          label: "Steady Loss",
          description: "Female, 75→63 kg, light activity, moderate pace",
        },
        aggressiveLoss: {
          label: "Aggressive Loss",
          description: "Male, 100→82 kg, very active, aggressive pace",
        },
        postHoliday: {
          label: "Post-Holiday Reset",
          description: "35yo male, 95→85 kg, 25% BF — full analysis ON",
        },
        femaleSteadyCut: {
          label: "Female Steady Cut",
          description: "30yo female, 68→58 kg, slow pace — body comp ON",
        },
      },

      // ─── DYNAMIC VALUES ────────────────────────────────────
      values: {
        "cal/day": "cal/day",
        cal: "cal",
        "g/day": "g/day",
        g: "g",
        "lb/wk": "lb/wk",
        "kg/wk": "kg/wk",
        lbs: "lbs",
        lb: "lb",
        kg: "kg",
        days: "days",
        day: "day",
        weeks: "weeks",
        week: "week",
        months: "months",
        month: "month",
        Week: "Week",
        Weight: "Weight",
        Calories: "Calories",
        Protein: "Protein",
        Carbs: "Carbs",
        Fat: "Fat",
        Goal: "🎯 Goal",
        "⚠️ Minimum floor applied": "⚠️ Minimum floor applied",
        "% BW/wk": "% BW/wk",
        "Requires body fat %": "Requires body fat %",
        Underweight: "Underweight",
        Normal: "Normal",
        Overweight: "Overweight",
        Obese: "Obese",
        "Not applied": "Not applied",
      },

      // ─── FORMATS ───────────────────────────────────────────
      formats: {
        summary:
          "Eat {dailyCalories} cal/day ({deficit} deficit). Your BMR is {bmr} cal and TDEE is {tdee} cal. Expected loss: {weeklyLoss}/week. Reach {targetWeight} in {timeToGoal}.",
      },

      // ─── CHART ─────────────────────────────────────────────
      chart: {
        title: "Weight Loss Projection",
        xLabel: "Week",
        yLabel: "Weight",
        series: {
          weight: "Projected Weight",
          goalWeight: "Goal Weight",
        },
      },

      // ─── INFO CARDS ────────────────────────────────────────
      infoCards: {
        nutritionTips: {
          title: "💡 Nutrition Tips",
          items: [
            "Prioritize protein at every meal to preserve muscle",
            "Eat whole foods — fiber keeps you full on fewer calories",
            "Drink water before meals to reduce hunger naturally",
            "Don't eliminate food groups — balance beats restriction",
          ],
        },
        exerciseTips: {
          title: "🏋️ Exercise Tips",
          items: [
            "Resistance training preserves muscle during a deficit",
            "Walk 8,000-10,000 steps daily for extra calorie burn",
            "Avoid over-exercising — recovery matters more in a deficit",
            "Increase NEAT (non-exercise activity) instead of cardio marathons",
          ],
        },
        quickFacts: {
          title: "📊 Quick Facts",
          items: [
            "0.5-1% of body weight per week is the optimal loss rate for preserving muscle",
            "Protein has the highest thermic effect — you burn 20-30% of protein calories digesting it",
            "Metabolic adaptation can reduce your TDEE by 10-15% beyond what weight loss alone predicts",
            "Diet breaks at maintenance every 8-12 weeks help prevent metabolic slowdown",
          ],
        },
      },

      // ─── REFERENCE DATA ────────────────────────────────────
      referenceData: {
        deficitGuide: {
          title: "Calorie Deficit Guide",
          items: {
            slow: {
              label: "Gradual (10%)",
              value: "~0.5 lb/wk — best for muscle retention",
            },
            moderate: {
              label: "Moderate (15%)",
              value: "~1 lb/wk — balanced approach",
            },
            aggressive: {
              label: "Aggressive (20%)",
              value: "~1.5 lb/wk — faster but harder to sustain",
            },
            veryAggressive: {
              label: "Very Aggressive (25%+)",
              value: "Not recommended — muscle loss risk",
            },
            safeMinMale: {
              label: "Safe Floor (Male)",
              value: "1,500 cal/day minimum",
            },
            safeMinFemale: {
              label: "Safe Floor (Female)",
              value: "1,200 cal/day minimum",
            },
          },
        },
      },

      // ─── DETAILED TABLE ────────────────────────────────────
      detailedTable: {
        weeklyPlan: {
          button: "View Weekly Weight Loss Plan",
          title: "Personalized Weekly Weight Loss Plan",
          columns: {
            week: "Week",
            weight: "Est. Weight",
            dailyCal: "Daily Cal",
            protein: "Protein (g)",
            carbs: "Carbs (g)",
            fat: "Fat (g)",
          },
        },
      },

      // ─── EDUCATION ─────────────────────────────────────────
      education: {
        whatIs: {
          title: "What Is a Weight Loss Calculator?",
          content:
            "A weight loss calculator estimates how many calories you should eat each day to lose weight at a safe, sustainable pace. It works by first calculating your Basal Metabolic Rate (BMR) — the energy your body burns at rest — then factoring in your activity level to determine your Total Daily Energy Expenditure (TDEE). A calorie deficit is then applied below your TDEE to create the energy gap that drives fat loss. Unlike basic calculators, this tool accounts for metabolic adaptation — the fact that your BMR decreases as you lose weight — giving you a realistic week-by-week projection rather than an overly optimistic straight-line estimate. It also uses dual BMR formulas (Mifflin-St Jeor and Katch-McArdle) for maximum accuracy.",
        },
        howItWorks: {
          title: "How Calorie Deficit Drives Weight Loss",
          content:
            "Weight loss happens when you consistently burn more calories than you consume. Approximately 3,500 calories equals one pound of body weight, so a daily deficit of 500 calories should produce roughly 1 pound of loss per week. However, this simple math breaks down over time because your body adapts: as you weigh less, your BMR drops, meaning you burn fewer calories doing the same activities. This calculator recalculates your BMR at each projected weight, showing how your calorie needs change week by week. This metabolic adaptation is why weight loss plateaus happen — and why a 'set it and forget it' approach doesn't work long-term. The Mifflin-St Jeor equation, validated as the most accurate BMR predictor for healthy adults, powers the primary calculations. When body fat % is provided, the Katch-McArdle formula offers an additional reference based on lean body mass.",
        },
        nutritionStrategy: {
          title: "Nutrition Tips for Weight Loss",
          items: [
            {
              text: "Eat at least 1g of protein per pound of bodyweight — high protein preserves lean muscle during a calorie deficit",
              type: "info",
            },
            {
              text: "Fill half your plate with vegetables — they add volume and fiber for very few calories",
              type: "info",
            },
            {
              text: "Don't drink your calories — liquid calories (soda, juice, alcohol) add up quickly without making you feel full",
              type: "warning",
            },
            {
              text: "Meal prep on weekends to avoid impulsive high-calorie choices during the week",
              type: "info",
            },
            {
              text: "Aim for 25-30g of fiber daily — it slows digestion and keeps you satiated longer",
              type: "info",
            },
            {
              text: "Avoid 'zero-calorie' processed diet foods — real whole foods are more satisfying",
              type: "warning",
            },
          ],
        },
        commonMistakes: {
          title: "Common Weight Loss Mistakes",
          items: [
            {
              text: "Cutting too aggressively — very low calorie diets cause muscle loss, metabolic slowdown, and rebounds",
              type: "warning",
            },
            {
              text: "Ignoring protein — low protein during a deficit means you lose muscle instead of just fat",
              type: "warning",
            },
            {
              text: "Relying only on the scale — body composition changes matter more than raw weight",
              type: "warning",
            },
            {
              text: "Skipping strength training — resistance exercise is the #1 tool for muscle preservation during a cut",
              type: "warning",
            },
            {
              text: "Expecting linear progress — weight fluctuates from water, food volume, and hormones, especially for women",
              type: "info",
            },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step weight loss calculations",
          examples: [
            {
              title: "Male, 30, 5'10\", 200 lbs, moderate activity",
              steps: [
                "BMR = 10 × 90.7 + 6.25 × 178 − 5 × 30 + 5 = 1,872 cal",
                "TDEE = 1,872 × 1.55 = 2,902 cal (maintenance)",
                "Moderate deficit (15%): 2,902 × 0.15 = 435 cal/day",
                "Daily target = 2,902 − 435 = 2,467 cal",
                "Protein = 200g, Fat = 68g, Carbs = 260g",
                "Weekly loss ≈ 0.87 lb/wk → reach 180 lbs in ~23 weeks",
              ],
              result:
                "Eat 2,467 cal/day to lose ~0.87 lb/week. Goal of 180 lbs in approximately 23 weeks.",
            },
            {
              title: "Female, 28, 5'5\", 160 lbs, light activity",
              steps: [
                "BMR = 10 × 72.6 + 6.25 × 165 − 5 × 28 − 161 = 1,417 cal",
                "TDEE = 1,417 × 1.375 = 1,949 cal (maintenance)",
                "Moderate deficit (15%): 1,949 × 0.15 = 292 cal/day",
                "Daily target = 1,949 − 292 = 1,657 cal",
                "Protein = 160g, Fat = 46g, Carbs = 159g",
                "Weekly loss ≈ 0.58 lb/wk → reach 140 lbs in ~34 weeks",
              ],
              result:
                "Eat 1,657 cal/day to lose ~0.58 lb/week. Goal of 140 lbs in approximately 34 weeks.",
            },
          ],
        },
      },

      // ─── FAQs ──────────────────────────────────────────────
      faqs: [
        {
          question: "How many calories should I eat to lose weight?",
          answer:
            "Your calorie target depends on your BMR, activity level, and desired loss pace. Most people lose weight safely at a 10-20% deficit below their TDEE. For most men this means 1,800-2,500 cal/day; for women 1,400-2,000 cal/day. Never go below 1,500 (men) or 1,200 (women) without medical supervision.",
        },
        {
          question: "What is metabolic adaptation?",
          answer:
            "Metabolic adaptation is your body's response to a calorie deficit — as you lose weight, your BMR drops because there's less body mass to maintain. This means the same calorie intake that initially caused weight loss eventually becomes maintenance. This calculator accounts for this by recalculating your BMR at each projected weight, which is something most competitor calculators don't do.",
        },
        {
          question: "How fast should I lose weight?",
          answer:
            "A safe rate is 0.5-1% of body weight per week. For a 200 lb person, that's 1-2 lbs/week. Faster than this and you risk muscle loss, nutritional deficiencies, and metabolic slowdown. Slower rates (0.5 lb/week) better preserve muscle mass. The Body Composition toggle shows exactly where your loss rate falls.",
        },
        {
          question: "Why is protein so important during weight loss?",
          answer:
            "Protein is the single most important macronutrient during a calorie deficit. It preserves lean muscle mass, increases satiety (you feel fuller longer), and has the highest thermic effect of food — your body burns 20-30% of protein calories just digesting it. Aim for at least 1g per pound of bodyweight. Higher protein intake during a deficit significantly improves muscle preservation.",
        },
        {
          question: "What is the difference between BMR and TDEE?",
          answer:
            "BMR (Basal Metabolic Rate) is the calories you burn at complete rest — just breathing, heart beating, organs functioning. TDEE (Total Daily Energy Expenditure) adds your activity level on top of BMR. To lose weight you eat below your TDEE, not BMR. This calculator shows both in the Metabolic Details toggle.",
        },
        {
          question: "Why did my weight loss slow down?",
          answer:
            "Weight loss plateaus are normal and expected. As you lose weight, your metabolism adapts — your smaller body burns fewer calories. Water retention, hormonal fluctuations, and stress also mask fat loss on the scale. If you've been in a deficit for 8+ weeks, consider a diet break at maintenance calories for 1-2 weeks to reset.",
        },
        {
          question: "Should I do cardio or weight training to lose weight?",
          answer:
            "Both, but prioritize strength training. Resistance exercise preserves muscle during a deficit and keeps your metabolism higher long-term. Cardio helps create additional deficit, but walking (NEAT) is more sustainable than intense sessions. The best approach: lift weights 3-4×/week and walk 8,000+ steps daily.",
        },
        {
          question: "Is it safe to go below 1,200 calories per day?",
          answer:
            "Not without medical supervision. Very low calorie diets (VLCDs) below 1,200 cal/day risk nutritional deficiencies, muscle loss, gallstones, and metabolic damage. This calculator enforces a 1,200 cal minimum for women and 1,500 for men. If your calculated target hits this floor, the Safety Floor indicator will show a warning.",
        },
        {
          question: "Why does the calculator show two BMR formulas?",
          answer:
            "The Mifflin-St Jeor formula uses age, gender, weight, and height — accurate for most people. The Katch-McArdle formula uses lean body mass (requires body fat %) and is more accurate for lean or muscular individuals. When you enter body fat %, the calculator uses Katch-McArdle for projections but shows both so you can compare. The difference is typically 50-150 calories per day.",
        },
        {
          question: "How important is fiber during weight loss?",
          answer:
            "Very important. Fiber slows digestion, stabilizes blood sugar, and keeps you feeling full on fewer calories. The IOM recommends 14g of fiber per 1,000 calories consumed. For someone eating 1,800 calories, that's about 25g per day. Good sources include vegetables, fruits, legumes, whole grains, and seeds. Most people only get 15g/day — nearly half the recommendation.",
        },
      ],

      // ─── FIXED UI BLOCKS ───────────────────────────────────
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
      "name": "Calculadora de Pérdida de Peso",
      "slug": "calculadora-perdida-peso",
      "subtitle": "Calcula tu objetivo diario de calorías, déficit y macros para una pérdida de peso segura con adaptación metabólica, fórmulas duales de TMB y seguimiento de composición corporal",
      "breadcrumb": "Pérdida de Peso",
      "seo": {
        "title": "Calculadora de Pérdida de Peso — Déficit Calórico, Macros y Composición Corporal | Gratis",
        "description": "Calculadora gratuita de pérdida de peso con adaptación metabólica, fórmulas duales de TMB, seguimiento de IMC y análisis de preservación muscular. Ve una proyección semanal realista que se ajusta según cambia tu metabolismo.",
        "shortDescription": "Planifica tu pérdida de peso con objetivos adaptativos de calorías y macros más seguimiento de composición corporal",
        "keywords": [
          "calculadora pérdida de peso",
          "calculadora déficit calórico",
          "cuántas calorías para perder peso",
          "calculadora calorías pérdida peso",
          "calculadora macros pérdida peso",
          "calculadora TDEE pérdida peso",
          "calculadora adaptación metabólica",
          "proyección pérdida peso",
          "calculadora preservación muscular"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "gender": {
          "label": "Sexo",
          "helpText": "Las fórmulas de TMB difieren según el sexo",
          "options": {
            "male": "Masculino",
            "female": "Femenino"
          }
        },
        "age": {
          "label": "Edad",
          "helpText": "La edad afecta la tasa metabólica"
        },
        "weight": {
          "label": "Peso Actual",
          "helpText": "Tu peso corporal actual"
        },
        "height": {
          "label": "Estatura",
          "helpText": "Tu estatura para el cálculo de TMB"
        },
        "targetWeight": {
          "label": "Peso Objetivo",
          "helpText": "Tu peso objetivo — debe ser menor que el peso actual"
        },
        "activityLevel": {
          "label": "Nivel de Actividad",
          "helpText": "¿Qué tan activo eres en una semana típica?",
          "options": {
            "sedentary": "Sedentario (trabajo de oficina, poco ejercicio)",
            "light": "Ligeramente Activo (1-3 días/semana)",
            "moderate": "Moderadamente Activo (3-5 días/semana)",
            "active": "Muy Activo (6-7 días/semana)",
            "veryActive": "Atleta (2× por día / trabajo físico)"
          }
        },
        "lossPace": {
          "label": "Ritmo de Pérdida",
          "helpText": "Un ritmo más lento preserva más masa muscular",
          "options": {
            "slow": "Gradual",
            "moderate": "Moderado",
            "aggressive": "Agresivo"
          },
          "descriptions": {
            "slow": "~0.5 lb/sem",
            "moderate": "~1 lb/sem",
            "aggressive": "~1.5 lb/sem"
          }
        },
        "bodyFatPercent": {
          "label": "% Grasa Corporal",
          "helpText": "Opcional — habilita TMB Katch-McArdle y análisis de composición corporal",
          "placeholder": "ej. 25"
        },
        "showMetabolic": {
          "label": "Mostrar Detalles Metabólicos",
          "helpText": "Activa para ver fórmulas TMB, TDEE, % déficit y estado de piso de seguridad"
        },
        "showBodyComp": {
          "label": "Mostrar Composición Corporal",
          "helpText": "Activa para ver seguimiento de IMC, calificación de calidad de pérdida y estimación de preservación muscular"
        }
      },
      "inputGroups": {},
      "results": {
        "dailyCalories": {
          "label": "Objetivo Diario de Calorías"
        },
        "deficitPerDay": {
          "label": "Déficit Diario"
        },
        "weeklyLoss": {
          "label": "Pérdida Semanal Esperada"
        },
        "timeToGoal": {
          "label": "Tiempo al Objetivo"
        },
        "proteinTarget": {
          "label": "Objetivo de Proteína"
        },
        "carbsTarget": {
          "label": "Objetivo de Carbohidratos"
        },
        "fatTarget": {
          "label": "Objetivo de Grasa"
        },
        "fiberTarget": {
          "label": "Fibra Diaria"
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
        "deficitPercent": {
          "label": "% Déficit"
        },
        "safetyFloor": {
          "label": "Piso de Seguridad"
        },
        "currentBmi": {
          "label": "IMC Actual"
        },
        "goalBmi": {
          "label": "IMC Objetivo"
        },
        "lossRate": {
          "label": "Pérdida Semanal (% PC)"
        },
        "lossQuality": {
          "label": "Calidad de Pérdida"
        },
        "musclePreservation": {
          "label": "Preservación Muscular"
        }
      },
      "tooltips": {
        "dailyCalories": "Total de calorías a consumir por día después del déficit",
        "deficitPerDay": "Cuántas menos calorías que el mantenimiento",
        "weeklyLoss": "Pérdida de peso esperada por semana con este déficit",
        "timeToGoal": "Semanas estimadas para alcanzar tu peso objetivo",
        "proteinTarget": "Alta proteína preserva músculo durante un déficit (1g/lb)",
        "carbsTarget": "Objetivo diario de carbohidratos para energía y combustible de entrenamiento",
        "fatTarget": "Objetivo diario de grasa para salud hormonal (~25% de calorías)",
        "fiberTarget": "Fibra diaria recomendada (14g por 1,000 cal) para saciedad y digestión",
        "bmrMifflin": "Tasa Metabólica Basal usando Mifflin-St Jeor (edad, sexo, peso, estatura)",
        "bmrKatch": "Tasa Metabólica Basal usando Katch-McArdle (masa corporal magra — requiere % grasa corporal)",
        "tdee": "Gasto Energético Diario Total — tus calorías de mantenimiento",
        "deficitPercent": "Tu déficit como porcentaje del TDEE — 10-20% es el rango recomendado",
        "safetyFloor": "Si se aplicó el mínimo de seguridad (1,500 cal hombres / 1,200 cal mujeres)",
        "currentBmi": "Tu Índice de Masa Corporal actual basado en peso y estatura",
        "goalBmi": "Tu IMC proyectado en el peso objetivo",
        "lossRate": "Pérdida semanal como porcentaje del peso corporal — 0.5-1.0% es óptimo",
        "lossQuality": "Calificación basada en tasa de pérdida relativa al peso corporal — moderado = mejor",
        "musclePreservation": "Capacidad estimada para preservar músculo basada en tamaño del déficit e ingesta de proteína"
      },
      "presets": {
        "gradualLoss": {
          "label": "Pérdida Gradual",
          "description": "Hombre, 90→82 kg, actividad moderada, ritmo lento"
        },
        "steadyLoss": {
          "label": "Pérdida Constante",
          "description": "Mujer, 75→63 kg, actividad ligera, ritmo moderado"
        },
        "aggressiveLoss": {
          "label": "Pérdida Agresiva",
          "description": "Hombre, 100→82 kg, muy activo, ritmo agresivo"
        },
        "postHoliday": {
          "label": "Reset Post-Fiestas",
          "description": "Hombre 35 años, 95→85 kg, 25% GC — análisis completo ACTIVO"
        },
        "femaleSteadyCut": {
          "label": "Corte Constante Femenino",
          "description": "Mujer 30 años, 68→58 kg, ritmo lento — comp corporal ACTIVO"
        }
      },
      "values": {
        "cal/day": "cal/día",
        "cal": "cal",
        "g/day": "g/día",
        "g": "g",
        "lb/wk": "lb/sem",
        "kg/wk": "kg/sem",
        "lbs": "lbs",
        "lb": "lb",
        "kg": "kg",
        "days": "días",
        "day": "día",
        "weeks": "semanas",
        "week": "semana",
        "months": "meses",
        "month": "mes",
        "Week": "Semana",
        "Weight": "Peso",
        "Calories": "Calorías",
        "Protein": "Proteína",
        "Carbs": "Carbohidratos",
        "Fat": "Grasa",
        "Goal": "🎯 Objetivo",
        "⚠️ Minimum floor applied": "⚠️ Piso mínimo aplicado",
        "% BW/wk": "% PC/sem",
        "Requires body fat %": "Requiere % grasa corporal",
        "Underweight": "Bajo peso",
        "Normal": "Normal",
        "Overweight": "Sobrepeso",
        "Obese": "Obeso",
        "Not applied": "No aplicado"
      },
      "formats": {
        "summary": "Come {dailyCalories} cal/día ({deficit} déficit). Tu TMB es {bmr} cal y TDEE es {tdee} cal. Pérdida esperada: {weeklyLoss}/semana. Alcanzar {targetWeight} en {timeToGoal}."
      },
      "chart": {
        "title": "Proyección de Pérdida de Peso",
        "xLabel": "Semana",
        "yLabel": "Peso",
        "series": {
          "weight": "Peso Proyectado",
          "goalWeight": "Peso Objetivo"
        }
      },
      "infoCards": {
        "nutritionTips": {
          "title": "💡 Consejos de Nutrición",
          "items": [
            "Prioriza proteína en cada comida para preservar músculo",
            "Come alimentos integrales — la fibra te mantiene lleno con menos calorías",
            "Bebe agua antes de las comidas para reducir el hambre naturalmente",
            "No elimines grupos de alimentos — el equilibrio supera la restricción"
          ]
        },
        "exerciseTips": {
          "title": "🏋️ Consejos de Ejercicio",
          "items": [
            "El entrenamiento de resistencia preserva músculo durante un déficit",
            "Camina 8,000-10,000 pasos diarios para quemar calorías extra",
            "Evita ejercitarte en exceso — la recuperación importa más en un déficit",
            "Aumenta NEAT (actividad sin ejercicio) en lugar de maratones de cardio"
          ]
        },
        "quickFacts": {
          "title": "📊 Datos Rápidos",
          "items": [
            "0.5-1% del peso corporal por semana es la tasa óptima de pérdida para preservar músculo",
            "La proteína tiene el mayor efecto térmico — quemas 20-30% de las calorías de proteína digiriéndola",
            "La adaptación metabólica puede reducir tu TDEE un 10-15% más allá de lo que predice solo la pérdida de peso",
            "Los descansos de dieta en mantenimiento cada 8-12 semanas ayudan a prevenir la desaceleración metabólica"
          ]
        }
      },
      "referenceData": {
        "deficitGuide": {
          "title": "Guía de Déficit Calórico",
          "items": {
            "slow": {
              "label": "Gradual (10%)",
              "value": "~0.5 lb/sem — mejor para retención muscular"
            },
            "moderate": {
              "label": "Moderado (15%)",
              "value": "~1 lb/sem — enfoque equilibrado"
            },
            "aggressive": {
              "label": "Agresivo (20%)",
              "value": "~1.5 lb/sem — más rápido pero más difícil de sostener"
            },
            "veryAggressive": {
              "label": "Muy Agresivo (25%+)",
              "value": "No recomendado — riesgo de pérdida muscular"
            },
            "safeMinMale": {
              "label": "Piso Seguro (Hombre)",
              "value": "1,500 cal/día mínimo"
            },
            "safeMinFemale": {
              "label": "Piso Seguro (Mujer)",
              "value": "1,200 cal/día mínimo"
            }
          }
        }
      },
      "detailedTable": {
        "weeklyPlan": {
          "button": "Ver Plan Semanal de Pérdida de Peso",
          "title": "Plan Personalizado Semanal de Pérdida de Peso",
          "columns": {
            "week": "Semana",
            "weight": "Peso Est.",
            "dailyCal": "Cal Diarias",
            "protein": "Proteína (g)",
            "carbs": "Carbohidratos (g)",
            "fat": "Grasa (g)"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es una Calculadora de Pérdida de Peso?",
          "content": "Una calculadora de pérdida de peso estima cuántas calorías debes comer cada día para perder peso a un ritmo seguro y sostenible. Funciona calculando primero tu Tasa Metabólica Basal (TMB) — la energía que tu cuerpo quema en reposo — luego considera tu nivel de actividad para determinar tu Gasto Energético Diario Total (TDEE). Luego se aplica un déficit calórico por debajo de tu TDEE para crear la brecha energética que impulsa la pérdida de grasa. A diferencia de las calculadoras básicas, esta herramienta considera la adaptación metabólica — el hecho de que tu TMB disminuye cuando pierdes peso — dándote una proyección realista semana a semana en lugar de una estimación demasiado optimista en línea recta. También usa fórmulas duales de TMB (Mifflin-St Jeor y Katch-McArdle) para máxima precisión."
        },
        "howItWorks": {
          "title": "Cómo el Déficit Calórico Impulsa la Pérdida de Peso",
          "content": "La pérdida de peso ocurre cuando consistentemente quemas más calorías de las que consumes. Aproximadamente 3,500 calorías equivalen a una libra de peso corporal, así que un déficit diario de 500 calorías debería producir aproximadamente 1 libra de pérdida por semana. Sin embargo, esta matemática simple se descompone con el tiempo porque tu cuerpo se adapta: cuando pesas menos, tu TMB baja, lo que significa que quemas menos calorías haciendo las mismas actividades. Esta calculadora recalcula tu TMB en cada peso proyectado, mostrando cómo cambian tus necesidades calóricas semana a semana. Esta adaptación metabólica es por qué ocurren las mesetas de pérdida de peso — y por qué un enfoque de 'configurar y olvidar' no funciona a largo plazo. La ecuación Mifflin-St Jeor, validada como el predictor de TMB más preciso para adultos saludables, impulsa los cálculos principales. Cuando se proporciona el % de grasa corporal, la fórmula Katch-McArdle ofrece una referencia adicional basada en masa corporal magra."
        },
        "nutritionStrategy": {
          "title": "Consejos de Nutrición para Pérdida de Peso",
          "items": [
            {
              "text": "Come al menos 1g de proteína por libra de peso corporal — alta proteína preserva músculo magro durante un déficit calórico",
              "type": "info"
            },
            {
              "text": "Llena la mitad de tu plato con vegetales — agregan volumen y fibra por muy pocas calorías",
              "type": "info"
            },
            {
              "text": "No bebas tus calorías — las calorías líquidas (soda, jugo, alcohol) se acumulan rápidamente sin hacerte sentir lleno",
              "type": "warning"
            },
            {
              "text": "Prepara comidas los fines de semana para evitar decisiones impulsivas altas en calorías durante la semana",
              "type": "info"
            },
            {
              "text": "Apunta a 25-30g de fibra diaria — ralentiza la digestión y te mantiene saciado más tiempo",
              "type": "info"
            },
            {
              "text": "Evita alimentos dietéticos procesados 'cero calorías' — los alimentos integrales reales son más satisfactorios",
              "type": "warning"
            }
          ]
        },
        "commonMistakes": {
          "title": "Errores Comunes en Pérdida de Peso",
          "items": [
            {
              "text": "Cortar demasiado agresivamente — las dietas muy bajas en calorías causan pérdida muscular, desaceleración metabólica y rebotes",
              "type": "warning"
            },
            {
              "text": "Ignorar la proteína — baja proteína durante un déficit significa que pierdes músculo en lugar de solo grasa",
              "type": "warning"
            },
            {
              "text": "Depender solo de la báscula — los cambios en composición corporal importan más que el peso crudo",
              "type": "warning"
            },
            {
              "text": "Omitir entrenamiento de fuerza — el ejercicio de resistencia es la herramienta #1 para preservación muscular durante un corte",
              "type": "warning"
            },
            {
              "text": "Esperar progreso lineal — el peso fluctúa por agua, volumen de comida y hormonas, especialmente para mujeres",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo",
          "description": "Cálculos de pérdida de peso paso a paso",
          "examples": [
            {
              "title": "Hombre, 30, 5'10\", 200 lbs, actividad moderada",
              "steps": [
                "TMB = 10 × 90.7 + 6.25 × 178 − 5 × 30 + 5 = 1,872 cal",
                "TDEE = 1,872 × 1.55 = 2,902 cal (mantenimiento)",
                "Déficit moderado (15%): 2,902 × 0.15 = 435 cal/día",
                "Objetivo diario = 2,902 − 435 = 2,467 cal",
                "Proteína = 200g, Grasa = 68g, Carbohidratos = 260g",
                "Pérdida semanal ≈ 0.87 lb/sem → alcanzar 180 lbs en ~23 semanas"
              ],
              "result": "Come 2,467 cal/día para perder ~0.87 lb/semana. Objetivo de 180 lbs en aproximadamente 23 semanas."
            },
            {
              "title": "Mujer, 28, 5'5\", 160 lbs, actividad ligera",
              "steps": [
                "TMB = 10 × 72.6 + 6.25 × 165 − 5 × 28 − 161 = 1,417 cal",
                "TDEE = 1,417 × 1.375 = 1,949 cal (mantenimiento)",
                "Déficit moderado (15%): 1,949 × 0.15 = 292 cal/día",
                "Objetivo diario = 1,949 − 292 = 1,657 cal",
                "Proteína = 160g, Grasa = 46g, Carbohidratos = 159g",
                "Pérdida semanal ≈ 0.58 lb/sem → alcanzar 140 lbs en ~34 semanas"
              ],
              "result": "Come 1,657 cal/día para perder ~0.58 lb/semana. Objetivo de 140 lbs en aproximadamente 34 semanas."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántas calorías debo comer para perder peso?",
          "answer": "Tu objetivo calórico depende de tu TMB, nivel de actividad y ritmo de pérdida deseado. La mayoría de las personas pierden peso de forma segura con un déficit del 10-20% por debajo de su TDEE. Para la mayoría de hombres esto significa 1,800-2,500 cal/día; para mujeres 1,400-2,000 cal/día. Nunca bajes de 1,500 (hombres) o 1,200 (mujeres) sin supervisión médica."
        },
        {
          "question": "¿Qué es la adaptación metabólica?",
          "answer": "La adaptación metabólica es la respuesta de tu cuerpo a un déficit calórico — cuando pierdes peso, tu TMB baja porque hay menos masa corporal que mantener. Esto significa que la misma ingesta calórica que inicialmente causó pérdida de peso eventualmente se convierte en mantenimiento. Esta calculadora considera esto recalculando tu TMB en cada peso proyectado, lo cual es algo que la mayoría de calculadoras competidoras no hacen."
        },
        {
          "question": "¿Qué tan rápido debería perder peso?",
          "answer": "Una tasa segura es 0.5-1% del peso corporal por semana. Para una persona de 200 lb, eso es 1-2 lbs/semana. Más rápido que esto y arriesgas pérdida muscular, deficiencias nutricionales y desaceleración metabólica. Tasas más lentas (0.5 lb/semana) preservan mejor la masa muscular. El toggle de Composición Corporal muestra exactamente dónde cae tu tasa de pérdida."
        },
        {
          "question": "¿Por qué es tan importante la proteína durante la pérdida de peso?",
          "answer": "La proteína es el macronutriente más importante durante un déficit calórico. Preserva la masa muscular magra, aumenta la saciedad (te sientes lleno más tiempo) y tiene el mayor efecto térmico de los alimentos — tu cuerpo quema 20-30% de las calorías de proteína solo digiriéndola. Apunta a al menos 1g por libra de peso corporal. Mayor ingesta de proteína durante un déficit mejora significativamente la preservación muscular."
        },
        {
          "question": "¿Cuál es la diferencia entre TMB y TDEE?",
          "answer": "TMB (Tasa Metabólica Basal) son las calorías que quemas en reposo completo — solo respirando, corazón latiendo, órganos funcionando. TDEE (Gasto Energético Diario Total) agrega tu nivel de actividad encima del TMB. Para perder peso comes por debajo de tu TDEE, no TMB. Esta calculadora muestra ambos en el toggle de Detalles Metabólicos."
        },
        {
          "question": "¿Por qué se desaceleró mi pérdida de peso?",
          "answer": "Las mesetas de pérdida de peso son normales y esperadas. Cuando pierdes peso, tu metabolismo se adapta — tu cuerpo más pequeño quema menos calorías. La retención de agua, fluctuaciones hormonales y estrés también enmascaran la pérdida de grasa en la báscula. Si has estado en déficit por 8+ semanas, considera un descanso de dieta en calorías de mantenimiento por 1-2 semanas para reiniciar."
        },
        {
          "question": "¿Debería hacer cardio o entrenamiento con pesas para perder peso?",
          "answer": "Ambos, pero prioriza el entrenamiento de fuerza. El ejercicio de resistencia preserva músculo durante un déficit y mantiene tu metabolismo más alto a largo plazo. El cardio ayuda a crear déficit adicional, pero caminar (NEAT) es más sostenible que sesiones intensas. El mejor enfoque: levantar pesas 3-4×/semana y caminar 8,000+ pasos diarios."
        },
        {
          "question": "¿Es seguro bajar de 1,200 calorías por día?",
          "answer": "No sin supervisión médica. Las dietas muy bajas en calorías (VLCD) por debajo de 1,200 cal/día arriesgan deficiencias nutricionales, pérdida muscular, cálculos biliares y daño metabólico. Esta calculadora aplica un mínimo de 1,200 cal para mujeres y 1,500 para hombres. Si tu objetivo calculado llega a este piso, el indicador de Piso de Seguridad mostrará una advertencia."
        },
        {
          "question": "¿Por qué la calculadora muestra dos fórmulas de TMB?",
          "answer": "La fórmula Mifflin-St Jeor usa edad, sexo, peso y estatura — precisa para la mayoría de personas. La fórmula Katch-McArdle usa masa corporal magra (requiere % grasa corporal) y es más precisa para individuos magros o musculosos. Cuando ingresas % grasa corporal, la calculadora usa Katch-McArdle para proyecciones pero muestra ambas para que puedas comparar. La diferencia típicamente es 50-150 calorías por día."
        },
        {
          "question": "¿Qué tan importante es la fibra durante la pérdida de peso?",
          "answer": "Muy importante. La fibra ralentiza la digestión, estabiliza el azúcar en sangre y te mantiene sintiéndote lleno con menos calorías. El IOM recomienda 14g de fibra por 1,000 calorías consumidas. Para alguien comiendo 1,800 calorías, eso son unos 25g por día. Buenas fuentes incluyen vegetales, frutas, legumbres, granos integrales y semillas. La mayoría de personas solo obtienen 15g/día — casi la mitad de la recomendación."
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
      "name": "Calculadora de Perda de Peso",
      "slug": "calculadora-perda-peso",
      "subtitle": "Calcule sua meta diária de calorias, déficit e macros para perda de peso segura com adaptação metabólica, duplas fórmulas de TMB e acompanhamento da composição corporal",
      "breadcrumb": "Perda de Peso",
      "seo": {
        "title": "Calculadora de Perda de Peso — Déficit Calórico, Macros e Composição Corporal | Grátis",
        "description": "Calculadora gratuita de perda de peso com adaptação metabólica, duplas fórmulas de TMB, acompanhamento de IMC e análise de preservação muscular. Veja uma projeção realista semana a semana que se ajusta conforme seu metabolismo muda.",
        "shortDescription": "Planeje sua perda de peso com metas adaptáveis de calorias e macros mais acompanhamento da composição corporal",
        "keywords": [
          "calculadora perda peso",
          "calculadora déficit calórico",
          "quantas calorias perder peso",
          "calculadora calorias perda peso",
          "calculadora macro perda peso",
          "calculadora TDEE perda peso",
          "calculadora adaptação metabólica",
          "projeção perda peso",
          "calculadora preservação muscular"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "gender": {
          "label": "Sexo",
          "helpText": "As fórmulas de TMB diferem por sexo",
          "options": {
            "male": "Masculino",
            "female": "Feminino"
          }
        },
        "age": {
          "label": "Idade",
          "helpText": "A idade afeta a taxa metabólica"
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
          "helpText": "Seu peso alvo — deve ser menor que o peso atual"
        },
        "activityLevel": {
          "label": "Nível de Atividade",
          "helpText": "Quão ativo você é numa semana típica?",
          "options": {
            "sedentary": "Sedentário (trabalho mesa, pouco exercício)",
            "light": "Levemente Ativo (1-3 dias/semana)",
            "moderate": "Moderadamente Ativo (3-5 dias/semana)",
            "active": "Muito Ativo (6-7 dias/semana)",
            "veryActive": "Atleta (2x por dia / trabalho físico)"
          }
        },
        "lossPace": {
          "label": "Ritmo de Perda",
          "helpText": "Ritmo mais lento preserva mais massa muscular",
          "options": {
            "slow": "Gradual",
            "moderate": "Moderado",
            "aggressive": "Agressivo"
          },
          "descriptions": {
            "slow": "~0,2 kg/sem",
            "moderate": "~0,5 kg/sem",
            "aggressive": "~0,7 kg/sem"
          }
        },
        "bodyFatPercent": {
          "label": "% Gordura Corporal",
          "helpText": "Opcional — habilita TMB Katch-McArdle e análise de composição corporal",
          "placeholder": "ex. 25"
        },
        "showMetabolic": {
          "label": "Mostrar Detalhes Metabólicos",
          "helpText": "Ative para ver fórmulas TMB, TDEE, % déficit e status do piso de segurança"
        },
        "showBodyComp": {
          "label": "Mostrar Composição Corporal",
          "helpText": "Ative para ver acompanhamento IMC, classificação qualidade da perda e estimativa preservação muscular"
        }
      },
      "inputGroups": {},
      "results": {
        "dailyCalories": {
          "label": "Meta Diária de Calorias"
        },
        "deficitPerDay": {
          "label": "Déficit Diário"
        },
        "weeklyLoss": {
          "label": "Perda Semanal Esperada"
        },
        "timeToGoal": {
          "label": "Tempo até Meta"
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
        "fiberTarget": {
          "label": "Fibra Diária"
        },
        "bmrMifflin": {
          "label": "TMB (Mifflin-St Jeor)"
        },
        "bmrKatch": {
          "label": "TMB (Katch-McArdle)"
        },
        "tdee": {
          "label": "Manutenção (TDEE)"
        },
        "deficitPercent": {
          "label": "% Déficit"
        },
        "safetyFloor": {
          "label": "Piso de Segurança"
        },
        "currentBmi": {
          "label": "IMC Atual"
        },
        "goalBmi": {
          "label": "IMC Meta"
        },
        "lossRate": {
          "label": "Perda Semanal (% PC)"
        },
        "lossQuality": {
          "label": "Qualidade da Perda"
        },
        "musclePreservation": {
          "label": "Preservação Muscular"
        }
      },
      "tooltips": {
        "dailyCalories": "Total de calorias para comer por dia após déficit",
        "deficitPerDay": "Quantas calorias a menos que a manutenção",
        "weeklyLoss": "Perda de peso esperada por semana com este déficit",
        "timeToGoal": "Semanas estimadas para atingir seu peso meta",
        "proteinTarget": "Proteína alta preserva músculo durante déficit (1g/kg)",
        "carbsTarget": "Meta diária de carboidratos para energia e combustível treino",
        "fatTarget": "Meta diária de gordura para saúde hormonal (~25% das calorias)",
        "fiberTarget": "Fibra diária recomendada (14g por 1.000 cal) para saciedade e digestão",
        "bmrMifflin": "Taxa Metabólica Basal usando Mifflin-St Jeor (idade, sexo, peso, altura)",
        "bmrKatch": "Taxa Metabólica Basal usando Katch-McArdle (massa magra — requer % gordura corporal)",
        "tdee": "Gasto Energético Diário Total — suas calorias de manutenção",
        "deficitPercent": "Seu déficit como porcentagem do TDEE — 10-20% é a faixa recomendada",
        "safetyFloor": "Se o mínimo de segurança foi aplicado (1.500 cal homens / 1.200 cal mulheres)",
        "currentBmi": "Seu Índice de Massa Corporal atual baseado no peso e altura",
        "goalBmi": "Seu IMC projetado no peso meta",
        "lossRate": "Perda semanal como porcentagem do peso corporal — 0,5-1,0% é ideal",
        "lossQuality": "Classificação baseada na taxa de perda relativa ao peso corporal — moderado = melhor",
        "musclePreservation": "Capacidade estimada de preservar músculo baseada no tamanho do déficit e ingestão proteica"
      },
      "presets": {
        "gradualLoss": {
          "label": "Perda Gradual",
          "description": "Homem, 90→82 kg, atividade moderada, ritmo lento"
        },
        "steadyLoss": {
          "label": "Perda Constante",
          "description": "Mulher, 75→63 kg, atividade leve, ritmo moderado"
        },
        "aggressiveLoss": {
          "label": "Perda Agressiva",
          "description": "Homem, 100→82 kg, muito ativo, ritmo agressivo"
        },
        "postHoliday": {
          "label": "Reset Pós-Férias",
          "description": "Homem 35a, 95→85 kg, 25% GC — análise completa LIGADA"
        },
        "femaleSteadyCut": {
          "label": "Corte Constante Feminino",
          "description": "Mulher 30a, 68→58 kg, ritmo lento — comp. corporal LIGADA"
        }
      },
      "values": {
        "cal/day": "cal/dia",
        "cal": "cal",
        "g/day": "g/dia",
        "g": "g",
        "lb/wk": "kg/sem",
        "kg/wk": "kg/sem",
        "lbs": "kg",
        "lb": "kg",
        "kg": "kg",
        "days": "dias",
        "day": "dia",
        "weeks": "semanas",
        "week": "semana",
        "months": "meses",
        "month": "mês",
        "Week": "Semana",
        "Weight": "Peso",
        "Calories": "Calorias",
        "Protein": "Proteína",
        "Carbs": "Carboidratos",
        "Fat": "Gordura",
        "Goal": "🎯 Meta",
        "⚠️ Minimum floor applied": "⚠️ Piso mínimo aplicado",
        "% BW/wk": "% PC/sem",
        "Requires body fat %": "Requer % gordura corporal",
        "Underweight": "Abaixo do peso",
        "Normal": "Normal",
        "Overweight": "Sobrepeso",
        "Obese": "Obeso",
        "Not applied": "Não aplicado"
      },
      "formats": {
        "summary": "Coma {dailyCalories} cal/dia ({deficit} déficit). Sua TMB é {bmr} cal e TDEE é {tdee} cal. Perda esperada: {weeklyLoss}/semana. Atinja {targetWeight} em {timeToGoal}."
      },
      "chart": {
        "title": "Projeção de Perda de Peso",
        "xLabel": "Semana",
        "yLabel": "Peso",
        "series": {
          "weight": "Peso Projetado",
          "goalWeight": "Peso Meta"
        }
      },
      "infoCards": {
        "nutritionTips": {
          "title": "💡 Dicas de Nutrição",
          "items": [
            "Priorize proteína em todas as refeições para preservar músculo",
            "Coma alimentos integrais — fibra te mantém saciado com menos calorias",
            "Beba água antes das refeições para reduzir fome naturalmente",
            "Não elimine grupos alimentares — equilíbrio supera restrição"
          ]
        },
        "exerciseTips": {
          "title": "🏋️ Dicas de Exercício",
          "items": [
            "Treino resistido preserva músculo durante déficit",
            "Caminhe 8.000-10.000 passos diários para queima extra de calorias",
            "Evite excesso de exercício — recuperação importa mais no déficit",
            "Aumente NEAT (atividade sem exercício) ao invés de maratonas de cardio"
          ]
        },
        "quickFacts": {
          "title": "📊 Fatos Rápidos",
          "items": [
            "0,5-1% do peso corporal por semana é a taxa ideal de perda para preservar músculo",
            "Proteína tem maior efeito térmico — você queima 20-30% das calorias proteicas digerindo",
            "Adaptação metabólica pode reduzir seu TDEE em 10-15% além do que só a perda de peso prediz",
            "Pausas na dieta em manutenção a cada 8-12 semanas ajudam prevenir desaceleração metabólica"
          ]
        }
      },
      "referenceData": {
        "deficitGuide": {
          "title": "Guia de Déficit Calórico",
          "items": {
            "slow": {
              "label": "Gradual (10%)",
              "value": "~0,2 kg/sem — melhor para retenção muscular"
            },
            "moderate": {
              "label": "Moderado (15%)",
              "value": "~0,5 kg/sem — abordagem equilibrada"
            },
            "aggressive": {
              "label": "Agressivo (20%)",
              "value": "~0,7 kg/sem — mais rápido mas difícil sustentar"
            },
            "veryAggressive": {
              "label": "Muito Agressivo (25%+)",
              "value": "Não recomendado — risco perda muscular"
            },
            "safeMinMale": {
              "label": "Piso Seguro (Homem)",
              "value": "1.500 cal/dia mínimo"
            },
            "safeMinFemale": {
              "label": "Piso Seguro (Mulher)",
              "value": "1.200 cal/dia mínimo"
            }
          }
        }
      },
      "detailedTable": {
        "weeklyPlan": {
          "button": "Ver Plano Semanal de Perda de Peso",
          "title": "Plano Personalizado Semanal de Perda de Peso",
          "columns": {
            "week": "Semana",
            "weight": "Peso Est.",
            "dailyCal": "Cal Diária",
            "protein": "Proteína (g)",
            "carbs": "Carboidratos (g)",
            "fat": "Gordura (g)"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é uma Calculadora de Perda de Peso?",
          "content": "Uma calculadora de perda de peso estima quantas calorias você deve comer diariamente para perder peso num ritmo seguro e sustentável. Funciona primeiro calculando sua Taxa Metabólica Basal (TMB) — a energia que seu corpo queima em repouso — depois considerando seu nível de atividade para determinar seu Gasto Energético Diário Total (TDEE). Um déficit calórico é então aplicado abaixo do seu TDEE para criar o gap energético que impulsiona a perda de gordura. Diferente de calculadoras básicas, esta ferramenta considera a adaptação metabólica — o fato de que sua TMB diminui conforme você perde peso — dando uma projeção realista semana a semana ao invés de uma estimativa linear excessivamente otimista. Também usa duplas fórmulas TMB (Mifflin-St Jeor e Katch-McArdle) para máxima precisão."
        },
        "howItWorks": {
          "title": "Como o Déficit Calórico Impulsiona a Perda de Peso",
          "content": "A perda de peso acontece quando você consistentemente queima mais calorias do que consome. Aproximadamente 7.700 calorias equivalem a um quilograma de peso corporal, então um déficit diário de 550 calorias deveria produzir cerca de 0,5 kg de perda por semana. Porém, esta matemática simples falha com o tempo porque seu corpo se adapta: conforme você pesa menos, sua TMB cai, significando que você queima menos calorias fazendo as mesmas atividades. Esta calculadora recalcula sua TMB a cada peso projetado, mostrando como suas necessidades calóricas mudam semana a semana. Esta adaptação metabólica é por que platôs de perda de peso acontecem — e por que uma abordagem 'definir e esquecer' não funciona a longo prazo. A equação Mifflin-St Jeor, validada como o preditor TMB mais preciso para adultos saudáveis, alimenta os cálculos primários. Quando % gordura corporal é fornecida, a fórmula Katch-McArdle oferece referência adicional baseada na massa magra."
        },
        "nutritionStrategy": {
          "title": "Dicas de Nutrição para Perda de Peso",
          "items": [
            {
              "text": "Coma pelo menos 1,6g de proteína por kg de peso corporal — proteína alta preserva músculo magro durante déficit calórico",
              "type": "info"
            },
            {
              "text": "Encha metade do prato com vegetais — eles adicionam volume e fibra por muito poucas calorias",
              "type": "info"
            },
            {
              "text": "Não beba suas calorias — calorias líquidas (refrigerante, suco, álcool) se acumulam rapidamente sem te deixar saciado",
              "type": "warning"
            },
            {
              "text": "Prepare refeições nos fins de semana para evitar escolhas impulsivas altas em calorias durante a semana",
              "type": "info"
            },
            {
              "text": "Mire em 25-30g de fibra diariamente — ela retarda digestão e te mantém saciado por mais tempo",
              "type": "info"
            },
            {
              "text": "Evite alimentos diet processados 'zero calorias' — alimentos integrais reais são mais satisfatórios",
              "type": "warning"
            }
          ]
        },
        "commonMistakes": {
          "title": "Erros Comuns na Perda de Peso",
          "items": [
            {
              "text": "Cortar muito agressivamente — dietas muito baixas em calorias causam perda muscular, desaceleração metabólica e rebotes",
              "type": "warning"
            },
            {
              "text": "Ignorar proteína — pouca proteína durante déficit significa que você perde músculo ao invés de só gordura",
              "type": "warning"
            },
            {
              "text": "Depender só da balança — mudanças na composição corporal importam mais que peso bruto",
              "type": "warning"
            },
            {
              "text": "Pular treino de força — exercício resistido é a ferramenta #1 para preservação muscular durante corte",
              "type": "warning"
            },
            {
              "text": "Esperar progresso linear — peso flutua por água, volume de comida e hormônios, especialmente para mulheres",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo",
          "description": "Cálculos de perda de peso passo a passo",
          "examples": [
            {
              "title": "Homem, 30, 1,78m, 90kg, atividade moderada",
              "steps": [
                "TMB = 10 × 90 + 6,25 × 178 − 5 × 30 + 5 = 1.872 cal",
                "TDEE = 1.872 × 1,55 = 2.902 cal (manutenção)",
                "Déficit moderado (15%): 2.902 × 0,15 = 435 cal/dia",
                "Meta diária = 2.902 − 435 = 2.467 cal",
                "Proteína = 144g, Gordura = 68g, Carboidratos = 260g",
                "Perda semanal ≈ 0,4 kg/sem → atingir 82kg em ~20 semanas"
              ],
              "result": "Coma 2.467 cal/dia para perder ~0,4 kg/semana. Meta de 82kg em aproximadamente 20 semanas."
            },
            {
              "title": "Mulher, 28, 1,65m, 73kg, atividade leve",
              "steps": [
                "TMB = 10 × 73 + 6,25 × 165 − 5 × 28 − 161 = 1.417 cal",
                "TDEE = 1.417 × 1,375 = 1.949 cal (manutenção)",
                "Déficit moderado (15%): 1.949 × 0,15 = 292 cal/dia",
                "Meta diária = 1.949 − 292 = 1.657 cal",
                "Proteína = 117g, Gordura = 46g, Carboidratos = 159g",
                "Perda semanal ≈ 0,3 kg/sem → atingir 64kg em ~30 semanas"
              ],
              "result": "Coma 1.657 cal/dia para perder ~0,3 kg/semana. Meta de 64kg em aproximadamente 30 semanas."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantas calorias devo comer para perder peso?",
          "answer": "Sua meta calórica depende da sua TMB, nível de atividade e ritmo de perda desejado. A maioria das pessoas perde peso com segurança com déficit de 10-20% abaixo do TDEE. Para a maioria dos homens isso significa 1.800-2.500 cal/dia; para mulheres 1.400-2.000 cal/dia. Nunca vá abaixo de 1.500 (homens) ou 1.200 (mulheres) sem supervisão médica."
        },
        {
          "question": "O que é adaptação metabólica?",
          "answer": "Adaptação metabólica é a resposta do seu corpo a um déficit calórico — conforme você perde peso, sua TMB cai porque há menos massa corporal para manter. Isso significa que a mesma ingestão calórica que inicialmente causou perda de peso eventualmente se torna manutenção. Esta calculadora considera isso recalculando sua TMB a cada peso projetado, algo que a maioria das calculadoras concorrentes não fazem."
        },
        {
          "question": "Quão rápido devo perder peso?",
          "answer": "Uma taxa segura é 0,5-1% do peso corporal por semana. Para uma pessoa de 90kg, isso é 0,5-1kg/semana. Mais rápido que isso e você arrisca perda muscular, deficiências nutricionais e desaceleração metabólica. Taxas mais lentas (0,2kg/semana) preservam melhor a massa muscular. O toggle Composição Corporal mostra exatamente onde sua taxa de perda se encaixa."
        },
        {
          "question": "Por que proteína é tão importante durante perda de peso?",
          "answer": "Proteína é o macronutriente mais importante durante déficit calórico. Preserva massa muscular magra, aumenta saciedade (você se sente saciado por mais tempo) e tem maior efeito térmico dos alimentos — seu corpo queima 20-30% das calorias proteicas só digerindo. Mire em pelo menos 1,6g por kg de peso corporal. Maior ingestão proteica durante déficit melhora significativamente a preservação muscular."
        },
        {
          "question": "Qual a diferença entre TMB e TDEE?",
          "answer": "TMB (Taxa Metabólica Basal) são as calorias queimadas em repouso completo — só respirando, coração batendo, órgãos funcionando. TDEE (Gasto Energético Diário Total) adiciona seu nível de atividade em cima da TMB. Para perder peso você come abaixo do TDEE, não TMB. Esta calculadora mostra ambos no toggle Detalhes Metabólicos."
        },
        {
          "question": "Por que minha perda de peso desacelerou?",
          "answer": "Platôs de perda de peso são normais e esperados. Conforme você perde peso, seu metabolismo se adapta — seu corpo menor queima menos calorias. Retenção de água, flutuações hormonais e estresse também mascaram perda de gordura na balança. Se você está em déficit há 8+ semanas, considere uma pausa na dieta em calorias de manutenção por 1-2 semanas para resetar."
        },
        {
          "question": "Devo fazer cardio ou musculação para perder peso?",
          "answer": "Ambos, mas priorize treino de força. Exercício resistido preserva músculo durante déficit e mantém seu metabolismo maior a longo prazo. Cardio ajuda criar déficit adicional, mas caminhada (NEAT) é mais sustentável que sessões intensas. Melhor abordagem: levante pesos 3-4x/semana e caminhe 8.000+ passos diários."
        },
        {
          "question": "É seguro ir abaixo de 1.200 calorias por dia?",
          "answer": "Não sem supervisão médica. Dietas muito baixas em calorias abaixo de 1.200 cal/dia arriscam deficiências nutricionais, perda muscular, pedras na vesícula e dano metabólico. Esta calculadora impõe mínimo de 1.200 cal para mulheres e 1.500 para homens. Se seu alvo calculado atingir este piso, o indicador Piso de Segurança mostrará aviso."
        },
        {
          "question": "Por que a calculadora mostra duas fórmulas TMB?",
          "answer": "A fórmula Mifflin-St Jeor usa idade, sexo, peso e altura — precisa para a maioria das pessoas. A fórmula Katch-McArdle usa massa magra (requer % gordura corporal) e é mais precisa para indivíduos magros ou musculosos. Quando você insere % gordura corporal, a calculadora usa Katch-McArdle para projeções mas mostra ambas para comparar. A diferença é tipicamente 50-150 calorias por dia."
        },
        {
          "question": "Quão importante é fibra durante perda de peso?",
          "answer": "Muito importante. Fibra retarda digestão, estabiliza açúcar no sangue e te mantém saciado com menos calorias. O IOM recomenda 14g de fibra por 1.000 calorias consumidas. Para alguém comendo 1.800 calorias, são cerca de 25g por dia. Boas fontes incluem vegetais, frutas, leguminosas, grãos integrais e sementes. A maioria das pessoas só obtém 15g/dia — quase metade da recomendação."
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
      "name": "Calculateur de Perte de Poids",
      "slug": "calculateur-perte-poids",
      "subtitle": "Calculez votre objectif calorique quotidien, déficit et macros pour une perte de poids sécurisée avec adaptation métabolique, formules BMR duales et suivi de composition corporelle",
      "breadcrumb": "Perte de Poids",
      "seo": {
        "title": "Calculateur de Perte de Poids — Déficit Calorique, Macros & Composition Corporelle | Gratuit",
        "description": "Calculateur de perte de poids gratuit avec adaptation métabolique, formules BMR duales, suivi IMC et analyse de préservation musculaire. Voyez une projection réaliste semaine par semaine qui s'ajuste selon les changements métaboliques.",
        "shortDescription": "Planifiez votre perte de poids avec objectifs caloriques et macros adaptatifs plus suivi de composition corporelle",
        "keywords": [
          "calculateur perte de poids",
          "calculateur déficit calorique",
          "combien de calories pour perdre du poids",
          "calculateur calories perte de poids",
          "calculateur macro perte de poids",
          "calculateur TDEE perte de poids",
          "calculateur adaptation métabolique",
          "projection perte de poids",
          "calculateur préservation musculaire"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "gender": {
          "label": "Sexe",
          "helpText": "Les formules BMR diffèrent selon le sexe",
          "options": {
            "male": "Homme",
            "female": "Femme"
          }
        },
        "age": {
          "label": "Âge",
          "helpText": "L'âge affecte le taux métabolique"
        },
        "weight": {
          "label": "Poids Actuel",
          "helpText": "Votre poids corporel actuel"
        },
        "height": {
          "label": "Taille",
          "helpText": "Votre taille pour le calcul BMR"
        },
        "targetWeight": {
          "label": "Poids Objectif",
          "helpText": "Votre poids cible — doit être inférieur au poids actuel"
        },
        "activityLevel": {
          "label": "Niveau d'Activité",
          "helpText": "À quel point êtes-vous actif dans une semaine typique ?",
          "options": {
            "sedentary": "Sédentaire (travail de bureau, peu d'exercice)",
            "light": "Légèrement Actif (1-3 jours/semaine)",
            "moderate": "Modérément Actif (3-5 jours/semaine)",
            "active": "Très Actif (6-7 jours/semaine)",
            "veryActive": "Athlète (2× par jour / travail physique)"
          }
        },
        "lossPace": {
          "label": "Rythme de Perte",
          "helpText": "Un rythme plus lent préserve davantage la masse musculaire",
          "options": {
            "slow": "Graduel",
            "moderate": "Modéré",
            "aggressive": "Agressif"
          },
          "descriptions": {
            "slow": "~0,2 kg/sem",
            "moderate": "~0,5 kg/sem",
            "aggressive": "~0,7 kg/sem"
          }
        },
        "bodyFatPercent": {
          "label": "% Graisse Corporelle",
          "helpText": "Optionnel — active le BMR Katch-McArdle et l'analyse de composition corporelle",
          "placeholder": "ex. 25"
        },
        "showMetabolic": {
          "label": "Afficher Détails Métaboliques",
          "helpText": "Activez pour voir les formules BMR, TDEE, % déficit et statut seuil sécurité"
        },
        "showBodyComp": {
          "label": "Afficher Composition Corporelle",
          "helpText": "Activez pour voir le suivi IMC, évaluation qualité perte et estimation préservation musculaire"
        }
      },
      "inputGroups": {},
      "results": {
        "dailyCalories": {
          "label": "Objectif Calorique Quotidien"
        },
        "deficitPerDay": {
          "label": "Déficit Quotidien"
        },
        "weeklyLoss": {
          "label": "Perte Hebdomadaire Attendue"
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
        "fiberTarget": {
          "label": "Fibres Quotidiennes"
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
        "deficitPercent": {
          "label": "% Déficit"
        },
        "safetyFloor": {
          "label": "Seuil de Sécurité"
        },
        "currentBmi": {
          "label": "IMC Actuel"
        },
        "goalBmi": {
          "label": "IMC Objectif"
        },
        "lossRate": {
          "label": "Perte Hebdomadaire (% PC)"
        },
        "lossQuality": {
          "label": "Qualité de Perte"
        },
        "musclePreservation": {
          "label": "Préservation Musculaire"
        }
      },
      "tooltips": {
        "dailyCalories": "Total de calories à consommer par jour après déficit",
        "deficitPerDay": "Combien de calories de moins que la maintenance",
        "weeklyLoss": "Perte de poids attendue par semaine avec ce déficit",
        "timeToGoal": "Semaines estimées pour atteindre votre poids objectif",
        "proteinTarget": "Les protéines élevées préservent le muscle pendant un déficit (1g/lb)",
        "carbsTarget": "Objectif glucides quotidiens pour l'énergie et le carburant d'entraînement",
        "fatTarget": "Objectif lipides quotidiens pour la santé hormonale (~25% des calories)",
        "fiberTarget": "Fibres quotidiennes recommandées (14g par 1 000 cal) pour satiété et digestion",
        "bmrMifflin": "Taux Métabolique de Base utilisant Mifflin-St Jeor (âge, sexe, poids, taille)",
        "bmrKatch": "Taux Métabolique de Base utilisant Katch-McArdle (masse maigre — nécessite % graisse corporelle)",
        "tdee": "Dépense Énergétique Quotidienne Totale — vos calories de maintenance",
        "deficitPercent": "Votre déficit en pourcentage du TDEE — 10-20% est la plage recommandée",
        "safetyFloor": "Si le minimum de sécurité a été appliqué (1 500 cal hommes / 1 200 cal femmes)",
        "currentBmi": "Votre Indice de Masse Corporelle actuel basé sur poids et taille",
        "goalBmi": "Votre IMC projeté au poids objectif",
        "lossRate": "Perte hebdomadaire en pourcentage du poids corporel — 0,5-1,0% est optimal",
        "lossQuality": "Évaluation basée sur le taux de perte relatif au poids corporel — modéré = meilleur",
        "musclePreservation": "Capacité estimée à préserver le muscle basée sur la taille du déficit et l'apport protéique"
      },
      "presets": {
        "gradualLoss": {
          "label": "Perte Graduelle",
          "description": "Homme, 90→82 kg, activité modérée, rythme lent"
        },
        "steadyLoss": {
          "label": "Perte Régulière",
          "description": "Femme, 75→63 kg, activité légère, rythme modéré"
        },
        "aggressiveLoss": {
          "label": "Perte Agressive",
          "description": "Homme, 100→82 kg, très actif, rythme agressif"
        },
        "postHoliday": {
          "label": "Remise en Forme Post-Fêtes",
          "description": "Homme 35 ans, 95→85 kg, 25% MG — analyse complète ACTIVÉE"
        },
        "femaleSteadyCut": {
          "label": "Sèche Régulière Femme",
          "description": "Femme 30 ans, 68→58 kg, rythme lent — composition corporelle ACTIVÉE"
        }
      },
      "values": {
        "cal/day": "cal/jour",
        "cal": "cal",
        "g/day": "g/jour",
        "g": "g",
        "lb/wk": "lb/sem",
        "kg/wk": "kg/sem",
        "lbs": "lbs",
        "lb": "lb",
        "kg": "kg",
        "days": "jours",
        "day": "jour",
        "weeks": "semaines",
        "week": "semaine",
        "months": "mois",
        "month": "mois",
        "Week": "Semaine",
        "Weight": "Poids",
        "Calories": "Calories",
        "Protein": "Protéines",
        "Carbs": "Glucides",
        "Fat": "Lipides",
        "Goal": "🎯 Objectif",
        "⚠️ Minimum floor applied": "⚠️ Seuil minimum appliqué",
        "% BW/wk": "% PC/sem",
        "Requires body fat %": "Nécessite % graisse corporelle",
        "Underweight": "Insuffisance pondérale",
        "Normal": "Normal",
        "Overweight": "Surpoids",
        "Obese": "Obèse",
        "Not applied": "Non appliqué"
      },
      "formats": {
        "summary": "Mangez {dailyCalories} cal/jour (déficit {deficit}). Votre BMR est {bmr} cal et TDEE est {tdee} cal. Perte attendue : {weeklyLoss}/semaine. Atteindre {targetWeight} en {timeToGoal}."
      },
      "chart": {
        "title": "Projection de Perte de Poids",
        "xLabel": "Semaine",
        "yLabel": "Poids",
        "series": {
          "weight": "Poids Projeté",
          "goalWeight": "Poids Objectif"
        }
      },
      "infoCards": {
        "nutritionTips": {
          "title": "💡 Conseils Nutrition",
          "items": [
            "Priorisez les protéines à chaque repas pour préserver le muscle",
            "Mangez des aliments entiers — les fibres vous rassasient avec moins de calories",
            "Buvez de l'eau avant les repas pour réduire la faim naturellement",
            "N'éliminez pas de groupes alimentaires — l'équilibre bat la restriction"
          ]
        },
        "exerciseTips": {
          "title": "🏋️ Conseils Exercice",
          "items": [
            "L'entraînement en résistance préserve le muscle pendant un déficit",
            "Marchez 8 000-10 000 pas quotidiennement pour brûler des calories supplémentaires",
            "Évitez le sur-entraînement — la récupération compte plus en déficit",
            "Augmentez le NEAT (activité sans exercice) plutôt que des marathons cardio"
          ]
        },
        "quickFacts": {
          "title": "📊 Faits Rapides",
          "items": [
            "0,5-1% du poids corporel par semaine est le taux de perte optimal pour préserver le muscle",
            "Les protéines ont l'effet thermique le plus élevé — vous brûlez 20-30% des calories protéiques en les digérant",
            "L'adaptation métabolique peut réduire votre TDEE de 10-15% au-delà de ce que la perte de poids seule prédit",
            "Les pauses diététiques à la maintenance toutes les 8-12 semaines aident à prévenir le ralentissement métabolique"
          ]
        }
      },
      "referenceData": {
        "deficitGuide": {
          "title": "Guide Déficit Calorique",
          "items": {
            "slow": {
              "label": "Graduel (10%)",
              "value": "~0,2 kg/sem — meilleur pour la rétention musculaire"
            },
            "moderate": {
              "label": "Modéré (15%)",
              "value": "~0,5 kg/sem — approche équilibrée"
            },
            "aggressive": {
              "label": "Agressif (20%)",
              "value": "~0,7 kg/sem — plus rapide mais plus difficile à maintenir"
            },
            "veryAggressive": {
              "label": "Très Agressif (25%+)",
              "value": "Non recommandé — risque de perte musculaire"
            },
            "safeMinMale": {
              "label": "Seuil Sécurité (Homme)",
              "value": "1 500 cal/jour minimum"
            },
            "safeMinFemale": {
              "label": "Seuil Sécurité (Femme)",
              "value": "1 200 cal/jour minimum"
            }
          }
        }
      },
      "detailedTable": {
        "weeklyPlan": {
          "button": "Voir Plan Hebdomadaire de Perte de Poids",
          "title": "Plan Personnalisé Hebdomadaire de Perte de Poids",
          "columns": {
            "week": "Semaine",
            "weight": "Poids Est.",
            "dailyCal": "Cal Quotid.",
            "protein": "Protéines (g)",
            "carbs": "Glucides (g)",
            "fat": "Lipides (g)"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'un Calculateur de Perte de Poids ?",
          "content": "Un calculateur de perte de poids estime combien de calories vous devriez manger chaque jour pour perdre du poids à un rythme sûr et durable. Il fonctionne en calculant d'abord votre Taux Métabolique de Base (BMR) — l'énergie que votre corps brûle au repos — puis en tenant compte de votre niveau d'activité pour déterminer votre Dépense Énergétique Quotidienne Totale (TDEE). Un déficit calorique est ensuite appliqué en dessous de votre TDEE pour créer l'écart énergétique qui entraîne la perte de graisse. Contrairement aux calculateurs basiques, cet outil tient compte de l'adaptation métabolique — le fait que votre BMR diminue à mesure que vous perdez du poids — vous donnant une projection réaliste semaine par semaine plutôt qu'une estimation linéaire trop optimiste. Il utilise également des formules BMR duales (Mifflin-St Jeor et Katch-McArdle) pour une précision maximale."
        },
        "howItWorks": {
          "title": "Comment le Déficit Calorique Entraîne la Perte de Poids",
          "content": "La perte de poids se produit lorsque vous brûlez constamment plus de calories que vous n'en consommez. Environ 3 500 calories équivalent à une livre de poids corporel, donc un déficit quotidien de 500 calories devrait produire environ 1 livre de perte par semaine. Cependant, cette simple mathématique se décompose avec le temps car votre corps s'adapte : en pesant moins, votre BMR chute, ce qui signifie que vous brûlez moins de calories en faisant les mêmes activités. Ce calculateur recalcule votre BMR à chaque poids projeté, montrant comment vos besoins caloriques changent semaine après semaine. Cette adaptation métabolique est pourquoi les plateaux de perte de poids arrivent — et pourquoi une approche 'définir et oublier' ne fonctionne pas à long terme. L'équation Mifflin-St Jeor, validée comme le prédicteur BMR le plus précis pour les adultes en bonne santé, alimente les calculs primaires. Lorsque le % de graisse corporelle est fourni, la formule Katch-McArdle offre une référence supplémentaire basée sur la masse corporelle maigre."
        },
        "nutritionStrategy": {
          "title": "Conseils Nutritionnels pour la Perte de Poids",
          "items": [
            {
              "text": "Mangez au moins 1g de protéines par livre de poids corporel — les protéines élevées préservent le muscle maigre pendant un déficit calorique",
              "type": "info"
            },
            {
              "text": "Remplissez la moitié de votre assiette de légumes — ils ajoutent du volume et des fibres pour très peu de calories",
              "type": "info"
            },
            {
              "text": "Ne buvez pas vos calories — les calories liquides (soda, jus, alcool) s'accumulent rapidement sans vous rassasier",
              "type": "warning"
            },
            {
              "text": "Préparez vos repas le weekend pour éviter les choix impulsifs riches en calories pendant la semaine",
              "type": "info"
            },
            {
              "text": "Visez 25-30g de fibres quotidiennement — cela ralentit la digestion et vous garde rassasié plus longtemps",
              "type": "info"
            },
            {
              "text": "Évitez les aliments diététiques transformés 'zéro calorie' — les vrais aliments entiers sont plus satisfaisants",
              "type": "warning"
            }
          ]
        },
        "commonMistakes": {
          "title": "Erreurs Communes de Perte de Poids",
          "items": [
            {
              "text": "Couper trop agressivement — les régimes très hypocaloriques causent perte musculaire, ralentissement métabolique et rebonds",
              "type": "warning"
            },
            {
              "text": "Ignorer les protéines — peu de protéines pendant un déficit signifie que vous perdez du muscle au lieu de juste la graisse",
              "type": "warning"
            },
            {
              "text": "Se fier seulement à la balance — les changements de composition corporelle comptent plus que le poids brut",
              "type": "warning"
            },
            {
              "text": "Sauter l'entraînement en force — l'exercice de résistance est l'outil #1 pour la préservation musculaire pendant une sèche",
              "type": "warning"
            },
            {
              "text": "S'attendre à un progrès linéaire — le poids fluctue à cause de l'eau, volume alimentaire et hormones, spécialement pour les femmes",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul",
          "description": "Calculs de perte de poids étape par étape",
          "examples": [
            {
              "title": "Homme, 30 ans, 1m78, 90 kg, activité modérée",
              "steps": [
                "BMR = 10 × 90 + 6,25 × 178 − 5 × 30 + 5 = 1 872 cal",
                "TDEE = 1 872 × 1,55 = 2 902 cal (maintenance)",
                "Déficit modéré (15%) : 2 902 × 0,15 = 435 cal/jour",
                "Objectif quotidien = 2 902 − 435 = 2 467 cal",
                "Protéines = 200g, Lipides = 68g, Glucides = 260g",
                "Perte hebdomadaire ≈ 0,4 kg/sem → atteindre 82 kg en ~20 semaines"
              ],
              "result": "Mangez 2 467 cal/jour pour perdre ~0,4 kg/semaine. Objectif de 82 kg en environ 20 semaines."
            },
            {
              "title": "Femme, 28 ans, 1m65, 73 kg, activité légère",
              "steps": [
                "BMR = 10 × 73 + 6,25 × 165 − 5 × 28 − 161 = 1 426 cal",
                "TDEE = 1 426 × 1,375 = 1 961 cal (maintenance)",
                "Déficit modéré (15%) : 1 961 × 0,15 = 294 cal/jour",
                "Objectif quotidien = 1 961 − 294 = 1 667 cal",
                "Protéines = 146g, Lipides = 46g, Glucides = 159g",
                "Perte hebdomadaire ≈ 0,3 kg/sem → atteindre 64 kg en ~30 semaines"
              ],
              "result": "Mangez 1 667 cal/jour pour perdre ~0,3 kg/semaine. Objectif de 64 kg en environ 30 semaines."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de calories devrais-je manger pour perdre du poids ?",
          "answer": "Votre objectif calorique dépend de votre BMR, niveau d'activité et rythme de perte désiré. La plupart des gens perdent du poids en sécurité avec un déficit de 10-20% en dessous de leur TDEE. Pour la plupart des hommes cela signifie 1 800-2 500 cal/jour ; pour les femmes 1 400-2 000 cal/jour. Ne jamais descendre en dessous de 1 500 (hommes) ou 1 200 (femmes) sans supervision médicale."
        },
        {
          "question": "Qu'est-ce que l'adaptation métabolique ?",
          "answer": "L'adaptation métabolique est la réponse de votre corps à un déficit calorique — à mesure que vous perdez du poids, votre BMR chute car il y a moins de masse corporelle à maintenir. Cela signifie que le même apport calorique qui causait initialement une perte de poids devient éventuellement de la maintenance. Ce calculateur en tient compte en recalculant votre BMR à chaque poids projeté, ce que la plupart des calculateurs concurrents ne font pas."
        },
        {
          "question": "À quelle vitesse devrais-je perdre du poids ?",
          "answer": "Un taux sûr est 0,5-1% du poids corporel par semaine. Pour une personne de 90 kg, c'est 0,5-1 kg/semaine. Plus rapide que cela et vous risquez la perte musculaire, carences nutritionnelles et ralentissement métabolique. Des taux plus lents (0,2 kg/semaine) préservent mieux la masse musculaire. L'option Composition Corporelle montre exactement où se situe votre taux de perte."
        },
        {
          "question": "Pourquoi les protéines sont-elles si importantes pendant la perte de poids ?",
          "answer": "Les protéines sont le macronutriment le plus important pendant un déficit calorique. Elles préservent la masse musculaire maigre, augmentent la satiété (vous vous sentez rassasié plus longtemps), et ont l'effet thermique alimentaire le plus élevé — votre corps brûle 20-30% des calories protéiques juste pour les digérer. Visez au moins 1g par livre de poids corporel. Un apport protéique plus élevé pendant un déficit améliore significativement la préservation musculaire."
        },
        {
          "question": "Quelle est la différence entre BMR et TDEE ?",
          "answer": "Le BMR (Taux Métabolique de Base) est les calories que vous brûlez au repos complet — juste respirer, cœur qui bat, organes qui fonctionnent. Le TDEE (Dépense Énergétique Quotidienne Totale) ajoute votre niveau d'activité par-dessus le BMR. Pour perdre du poids vous mangez en dessous de votre TDEE, pas BMR. Ce calculateur montre les deux dans l'option Détails Métaboliques."
        },
        {
          "question": "Pourquoi ma perte de poids a-t-elle ralenti ?",
          "answer": "Les plateaux de perte de poids sont normaux et attendus. À mesure que vous perdez du poids, votre métabolisme s'adapte — votre corps plus petit brûle moins de calories. La rétention d'eau, fluctuations hormonales et stress masquent aussi la perte de graisse sur la balance. Si vous êtes en déficit depuis 8+ semaines, considérez une pause diététique aux calories de maintenance pendant 1-2 semaines pour reset."
        },
        {
          "question": "Devrais-je faire du cardio ou de la musculation pour perdre du poids ?",
          "answer": "Les deux, mais priorisez l'entraînement en force. L'exercice de résistance préserve le muscle pendant un déficit et maintient votre métabolisme plus élevé à long terme. Le cardio aide à créer un déficit supplémentaire, mais marcher (NEAT) est plus durable que les sessions intenses. La meilleure approche : soulevez des poids 3-4×/semaine et marchez 8 000+ pas quotidiennement."
        },
        {
          "question": "Est-il sûr de descendre en dessous de 1 200 calories par jour ?",
          "answer": "Pas sans supervision médicale. Les régimes très hypocaloriques (VLCD) en dessous de 1 200 cal/jour risquent carences nutritionnelles, perte musculaire, calculs biliaires et dommages métaboliques. Ce calculateur impose un minimum de 1 200 cal pour les femmes et 1 500 pour les hommes. Si votre cible calculée atteint ce plancher, l'indicateur Seuil Sécurité montrera un avertissement."
        },
        {
          "question": "Pourquoi le calculateur montre-t-il deux formules BMR ?",
          "answer": "La formule Mifflin-St Jeor utilise âge, sexe, poids et taille — précise pour la plupart des gens. La formule Katch-McArdle utilise la masse corporelle maigre (nécessite % graisse corporelle) et est plus précise pour les individus maigres ou musclés. Quand vous entrez le % graisse corporelle, le calculateur utilise Katch-McArdle pour les projections mais montre les deux pour que vous puissiez comparer. La différence est typiquement 50-150 calories par jour."
        },
        {
          "question": "Quelle est l'importance des fibres pendant la perte de poids ?",
          "answer": "Très importante. Les fibres ralentissent la digestion, stabilisent la glycémie et vous gardent rassasié avec moins de calories. L'IOM recommande 14g de fibres par 1 000 calories consommées. Pour quelqu'un mangeant 1 800 calories, c'est environ 25g par jour. Les bonnes sources incluent légumes, fruits, légumineuses, grains entiers et graines. La plupart des gens n'obtiennent que 15g/jour — près de la moitié de la recommandation."
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
      "name": "Gewichtsverlust Rechner",
      "slug": "gewichtsverlust-rechner",
      "subtitle": "Berechnen Sie Ihr tägliches Kalorienziel, Defizit und Makros für sicheren Gewichtsverlust mit metabolischer Anpassung, dualen BMR-Formeln und Körperzusammensetzungsverfolgung",
      "breadcrumb": "Gewichtsverlust",
      "seo": {
        "title": "Gewichtsverlust Rechner — Kaloriendefizit, Makros & Körperzusammensetzung | Kostenlos",
        "description": "Kostenloser Gewichtsverlust-Rechner mit metabolischer Anpassung, dualen BMR-Formeln, BMI-Tracking und Muskelerhaltungsanalyse. Sehen Sie eine realistische wöchentliche Prognose, die sich an Ihren Stoffwechsel anpasst.",
        "shortDescription": "Planen Sie Ihren Gewichtsverlust mit adaptiven Kalorien- und Makrozielen plus Körperzusammensetzungsverfolgung",
        "keywords": [
          "gewichtsverlust rechner",
          "kaloriendefizit rechner",
          "wie viele kalorien zum abnehmen",
          "gewichtsverlust kalorien rechner",
          "makro rechner gewichtsverlust",
          "TDEE rechner für gewichtsverlust",
          "metabolische anpassung rechner",
          "gewichtsverlust prognose",
          "muskelerhaltung rechner"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "gender": {
          "label": "Geschlecht",
          "helpText": "BMR-Formeln unterscheiden sich nach Geschlecht",
          "options": {
            "male": "Männlich",
            "female": "Weiblich"
          }
        },
        "age": {
          "label": "Alter",
          "helpText": "Alter beeinflusst die Stoffwechselrate"
        },
        "weight": {
          "label": "Aktuelles Gewicht",
          "helpText": "Ihr aktuelles Körpergewicht"
        },
        "height": {
          "label": "Größe",
          "helpText": "Ihre Größe für die BMR-Berechnung"
        },
        "targetWeight": {
          "label": "Zielgewicht",
          "helpText": "Ihr Zielgewicht — muss niedriger als das aktuelle Gewicht sein"
        },
        "activityLevel": {
          "label": "Aktivitätsniveau",
          "helpText": "Wie aktiv sind Sie in einer typischen Woche?",
          "options": {
            "sedentary": "Sitzend (Bürojob, wenig Bewegung)",
            "light": "Leicht aktiv (1-3 Tage/Woche)",
            "moderate": "Mäßig aktiv (3-5 Tage/Woche)",
            "active": "Sehr aktiv (6-7 Tage/Woche)",
            "veryActive": "Athlet (2× täglich / körperlicher Job)"
          }
        },
        "lossPace": {
          "label": "Verlustgeschwindigkeit",
          "helpText": "Langsameres Tempo erhält mehr Muskelmasse",
          "options": {
            "slow": "Allmählich",
            "moderate": "Mäßig",
            "aggressive": "Aggressiv"
          },
          "descriptions": {
            "slow": "~0,2 kg/Woche",
            "moderate": "~0,5 kg/Woche",
            "aggressive": "~0,7 kg/Woche"
          }
        },
        "bodyFatPercent": {
          "label": "Körperfett %",
          "helpText": "Optional — ermöglicht Katch-McArdle BMR und Körperzusammensetzungsanalyse",
          "placeholder": "z.B. 25"
        },
        "showMetabolic": {
          "label": "Metabolische Details anzeigen",
          "helpText": "Aktivieren um BMR-Formeln, TDEE, Defizit % und Sicherheitsgrenzenstatus zu sehen"
        },
        "showBodyComp": {
          "label": "Körperzusammensetzung anzeigen",
          "helpText": "Aktivieren um BMI-Tracking, Verlustqualitätsbewertung und Muskelerhaltungsschätzung zu sehen"
        }
      },
      "inputGroups": {},
      "results": {
        "dailyCalories": {
          "label": "Tägliches Kalorienziel"
        },
        "deficitPerDay": {
          "label": "Tägliches Defizit"
        },
        "weeklyLoss": {
          "label": "Erwarteter wöchentlicher Verlust"
        },
        "timeToGoal": {
          "label": "Zeit bis zum Ziel"
        },
        "proteinTarget": {
          "label": "Proteinziel"
        },
        "carbsTarget": {
          "label": "Kohlenhydratziel"
        },
        "fatTarget": {
          "label": "Fettziel"
        },
        "fiberTarget": {
          "label": "Tägliche Ballaststoffe"
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
        "deficitPercent": {
          "label": "Defizit %"
        },
        "safetyFloor": {
          "label": "Sicherheitsgrenze"
        },
        "currentBmi": {
          "label": "Aktueller BMI"
        },
        "goalBmi": {
          "label": "Ziel BMI"
        },
        "lossRate": {
          "label": "Wöchentlicher Verlust (% Körpergewicht)"
        },
        "lossQuality": {
          "label": "Verlustqualität"
        },
        "musclePreservation": {
          "label": "Muskelerhaltung"
        }
      },
      "tooltips": {
        "dailyCalories": "Gesamtkalorien pro Tag nach Defizit zu essen",
        "deficitPerDay": "Wie viele Kalorien weniger als der Erhaltungsbedarf",
        "weeklyLoss": "Erwarteter Gewichtsverlust pro Woche bei diesem Defizit",
        "timeToGoal": "Geschätzte Wochen bis zum Erreichen Ihres Zielgewichts",
        "proteinTarget": "Hoher Proteingehalt erhält Muskeln während eines Defizits (1g/kg)",
        "carbsTarget": "Tägliches Kohlenhydratziel für Energie und Workout-Treibstoff",
        "fatTarget": "Tägliches Fettziel für hormonelle Gesundheit (~25% der Kalorien)",
        "fiberTarget": "Empfohlene tägliche Ballaststoffe (14g pro 1.000 kcal) für Sättigung und Verdauung",
        "bmrMifflin": "Grundumsatz mit Mifflin-St Jeor (Alter, Geschlecht, Gewicht, Größe)",
        "bmrKatch": "Grundumsatz mit Katch-McArdle (fettfreie Körpermasse — erfordert Körperfett %)",
        "tdee": "Gesamter täglicher Energieverbrauch — Ihre Erhaltungskalorien",
        "deficitPercent": "Ihr Defizit als Prozentsatz des TDEE — 10-20% ist der empfohlene Bereich",
        "safetyFloor": "Ob das Sicherheitsminimum angewendet wurde (1.500 kcal Männer / 1.200 kcal Frauen)",
        "currentBmi": "Ihr aktueller Body-Mass-Index basierend auf Gewicht und Größe",
        "goalBmi": "Ihr prognostizierter BMI beim Zielgewicht",
        "lossRate": "Wöchentlicher Verlust als Prozentsatz des Körpergewichts — 0,5-1,0% ist optimal",
        "lossQuality": "Bewertung basierend auf Verlustrate relativ zum Körpergewicht — mäßig = am besten",
        "musclePreservation": "Geschätzte Fähigkeit Muskeln zu erhalten basierend auf Defizitgröße und Proteinaufnahme"
      },
      "presets": {
        "gradualLoss": {
          "label": "Allmählicher Verlust",
          "description": "Mann, 90→82 kg, mäßige Aktivität, langsames Tempo"
        },
        "steadyLoss": {
          "label": "Stetiger Verlust",
          "description": "Frau, 75→63 kg, leichte Aktivität, mäßiges Tempo"
        },
        "aggressiveLoss": {
          "label": "Aggressiver Verlust",
          "description": "Mann, 100→82 kg, sehr aktiv, aggressives Tempo"
        },
        "postHoliday": {
          "label": "Nach-Feiertags Reset",
          "description": "35-jähriger Mann, 95→85 kg, 25% Körperfett — vollständige Analyse AN"
        },
        "femaleSteadyCut": {
          "label": "Frauen Stetiger Schnitt",
          "description": "30-jährige Frau, 68→58 kg, langsames Tempo — Körperzusammensetzung AN"
        }
      },
      "values": {
        "cal/day": "kcal/Tag",
        "cal": "kcal",
        "g/day": "g/Tag",
        "g": "g",
        "lb/wk": "kg/Woche",
        "kg/wk": "kg/Woche",
        "lbs": "kg",
        "lb": "kg",
        "kg": "kg",
        "days": "Tage",
        "day": "Tag",
        "weeks": "Wochen",
        "week": "Woche",
        "months": "Monate",
        "month": "Monat",
        "Week": "Woche",
        "Weight": "Gewicht",
        "Calories": "Kalorien",
        "Protein": "Protein",
        "Carbs": "Kohlenhydrate",
        "Fat": "Fett",
        "Goal": "🎯 Ziel",
        "⚠️ Minimum floor applied": "⚠️ Mindestgrenze angewendet",
        "% BW/wk": "% Körpergewicht/Woche",
        "Requires body fat %": "Erfordert Körperfett %",
        "Underweight": "Untergewicht",
        "Normal": "Normal",
        "Overweight": "Übergewicht",
        "Obese": "Adipös",
        "Not applied": "Nicht angewendet"
      },
      "formats": {
        "summary": "Essen Sie {dailyCalories} kcal/Tag ({deficit} Defizit). Ihr BMR beträgt {bmr} kcal und TDEE {tdee} kcal. Erwarteter Verlust: {weeklyLoss}/Woche. Erreichen Sie {targetWeight} in {timeToGoal}."
      },
      "chart": {
        "title": "Gewichtsverlust Prognose",
        "xLabel": "Woche",
        "yLabel": "Gewicht",
        "series": {
          "weight": "Prognostiziertes Gewicht",
          "goalWeight": "Zielgewicht"
        }
      },
      "infoCards": {
        "nutritionTips": {
          "title": "💡 Ernährungstipps",
          "items": [
            "Priorisieren Sie Protein bei jeder Mahlzeit um Muskeln zu erhalten",
            "Essen Sie vollwertige Lebensmittel — Ballaststoffe halten Sie mit weniger Kalorien satt",
            "Trinken Sie Wasser vor den Mahlzeiten um den Hunger natürlich zu reduzieren",
            "Eliminieren Sie keine Lebensmittelgruppen — Balance schlägt Verzicht"
          ]
        },
        "exerciseTips": {
          "title": "🏋️ Trainingstipps",
          "items": [
            "Krafttraining erhält Muskeln während eines Defizits",
            "Gehen Sie 8.000-10.000 Schritte täglich für zusätzlichen Kalorienverbrauch",
            "Vermeiden Sie Übertraining — Erholung ist wichtiger bei einem Defizit",
            "Erhöhen Sie NEAT (nicht-sportliche Aktivität) anstatt Cardio-Marathons"
          ]
        },
        "quickFacts": {
          "title": "📊 Schnelle Fakten",
          "items": [
            "0,5-1% des Körpergewichts pro Woche ist die optimale Verlustrate für Muskelerhaltung",
            "Protein hat den höchsten thermischen Effekt — Sie verbrennen 20-30% der Proteinkalorien bei der Verdauung",
            "Metabolische Anpassung kann Ihren TDEE um 10-15% über das hinaus reduzieren, was Gewichtsverlust allein vorhersagt",
            "Diätpausen bei Erhaltungskalorien alle 8-12 Wochen helfen metabolische Verlangsamung zu verhindern"
          ]
        }
      },
      "referenceData": {
        "deficitGuide": {
          "title": "Kaloriendefizit Leitfaden",
          "items": {
            "slow": {
              "label": "Allmählich (10%)",
              "value": "~0,2 kg/Woche — am besten für Muskelerhaltung"
            },
            "moderate": {
              "label": "Mäßig (15%)",
              "value": "~0,5 kg/Woche — ausgewogener Ansatz"
            },
            "aggressive": {
              "label": "Aggressiv (20%)",
              "value": "~0,7 kg/Woche — schneller aber schwerer durchzuhalten"
            },
            "veryAggressive": {
              "label": "Sehr aggressiv (25%+)",
              "value": "Nicht empfohlen — Muskelverlustrisiko"
            },
            "safeMinMale": {
              "label": "Sicherheitsgrenze (Mann)",
              "value": "1.500 kcal/Tag Minimum"
            },
            "safeMinFemale": {
              "label": "Sicherheitsgrenze (Frau)",
              "value": "1.200 kcal/Tag Minimum"
            }
          }
        }
      },
      "detailedTable": {
        "weeklyPlan": {
          "button": "Wöchentlichen Gewichtsverlust Plan anzeigen",
          "title": "Personalisierter wöchentlicher Gewichtsverlust Plan",
          "columns": {
            "week": "Woche",
            "weight": "Geschätztes Gewicht",
            "dailyCal": "Tägliche Kalorien",
            "protein": "Protein (g)",
            "carbs": "Kohlenhydrate (g)",
            "fat": "Fett (g)"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist ein Gewichtsverlust-Rechner?",
          "content": "Ein Gewichtsverlust-Rechner schätzt, wie viele Kalorien Sie täglich essen sollten, um in einem sicheren, nachhaltigen Tempo Gewicht zu verlieren. Er funktioniert, indem er zuerst Ihren Grundumsatz (BMR) berechnet — die Energie, die Ihr Körper in Ruhe verbrennt — dann Ihr Aktivitätsniveau einbezieht, um Ihren Gesamttäglichen Energieverbrauch (TDEE) zu bestimmen. Ein Kaloriendefizit wird dann unter Ihrem TDEE angewendet, um die Energielücke zu schaffen, die den Fettabbau antreibt. Im Gegensatz zu einfachen Rechnern berücksichtigt dieses Tool die metabolische Anpassung — die Tatsache, dass Ihr BMR abnimmt, wenn Sie Gewicht verlieren — und gibt Ihnen eine realistische wöchentliche Prognose anstatt einer übermäßig optimistischen geraden Linie. Es verwendet auch duale BMR-Formeln (Mifflin-St Jeor und Katch-McArdle) für maximale Genauigkeit."
        },
        "howItWorks": {
          "title": "Wie Kaloriendefizit Gewichtsverlust antreibt",
          "content": "Gewichtsverlust passiert, wenn Sie konstant mehr Kalorien verbrennen als Sie zu sich nehmen. Ungefähr 7.700 Kalorien entsprechen einem Kilogramm Körpergewicht, also sollte ein tägliches Defizit von 550 Kalorien etwa 0,5 Kilogramm Verlust pro Woche produzieren. Jedoch bricht diese einfache Mathematik über die Zeit zusammen, weil sich Ihr Körper anpasst: wenn Sie weniger wiegen, sinkt Ihr BMR, was bedeutet, dass Sie weniger Kalorien bei denselben Aktivitäten verbrennen. Dieser Rechner berechnet Ihren BMR bei jedem projizierten Gewicht neu und zeigt, wie sich Ihr Kalorienbedarf Woche für Woche ändert. Diese metabolische Anpassung ist der Grund, warum Gewichtsverlust-Plateaus auftreten — und warum ein 'einstellen und vergessen' Ansatz langfristig nicht funktioniert. Die Mifflin-St Jeor Gleichung, validiert als genauester BMR-Prädiktor für gesunde Erwachsene, treibt die primären Berechnungen an. Wenn Körperfett % angegeben wird, bietet die Katch-McArdle Formel eine zusätzliche Referenz basierend auf fettfreier Körpermasse."
        },
        "nutritionStrategy": {
          "title": "Ernährungstipps für Gewichtsverlust",
          "items": [
            {
              "text": "Essen Sie mindestens 1g Protein pro Kilogramm Körpergewicht — hoher Proteingehalt erhält die Muskelmasse während eines Kaloriendefizits",
              "type": "info"
            },
            {
              "text": "Füllen Sie die Hälfte Ihres Tellers mit Gemüse — sie fügen Volumen und Ballaststoffe für sehr wenige Kalorien hinzu",
              "type": "info"
            },
            {
              "text": "Trinken Sie Ihre Kalorien nicht — flüssige Kalorien (Limonade, Saft, Alkohol) summieren sich schnell ohne Sie satt zu machen",
              "type": "warning"
            },
            {
              "text": "Bereiten Sie Mahlzeiten am Wochenende vor, um impulsive kalorienreiche Entscheidungen während der Woche zu vermeiden",
              "type": "info"
            },
            {
              "text": "Zielen Sie auf 25-30g Ballaststoffe täglich — sie verlangsamen die Verdauung und halten Sie länger satt",
              "type": "info"
            },
            {
              "text": "Vermeiden Sie 'kalorienfreie' verarbeitete Diätlebensmittel — echte vollwertige Lebensmittel sind befriedigender",
              "type": "warning"
            }
          ]
        },
        "commonMistakes": {
          "title": "Häufige Gewichtsverlust-Fehler",
          "items": [
            {
              "text": "Zu aggressiv kürzen — sehr niedrige Kaloriendiäten verursachen Muskelverlust, Stoffwechselverlangsamung und Rückschläge",
              "type": "warning"
            },
            {
              "text": "Protein ignorieren — niedriger Proteingehalt während eines Defizits bedeutet, dass Sie Muskeln anstatt nur Fett verlieren",
              "type": "warning"
            },
            {
              "text": "Sich nur auf die Waage verlassen — Körperzusammensetzungsänderungen sind wichtiger als rohes Gewicht",
              "type": "warning"
            },
            {
              "text": "Krafttraining auslassen — Widerstandsübungen sind das #1 Werkzeug für Muskelerhaltung während eines Defizits",
              "type": "warning"
            },
            {
              "text": "Linearen Fortschritt erwarten — Gewicht schwankt durch Wasser, Nahrungsvolumen und Hormone, besonders bei Frauen",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Berechnungsbeispiele",
          "description": "Schritt-für-Schritt Gewichtsverlust-Berechnungen",
          "examples": [
            {
              "title": "Mann, 30, 1,78m, 90 kg, mäßige Aktivität",
              "steps": [
                "BMR = 10 × 90 + 6,25 × 178 − 5 × 30 + 5 = 1.872 kcal",
                "TDEE = 1.872 × 1,55 = 2.902 kcal (Erhaltung)",
                "Mäßiges Defizit (15%): 2.902 × 0,15 = 435 kcal/Tag",
                "Tägliches Ziel = 2.902 − 435 = 2.467 kcal",
                "Protein = 90g, Fett = 68g, Kohlenhydrate = 260g",
                "Wöchentlicher Verlust ≈ 0,4 kg/Woche → 82 kg in ~20 Wochen erreichen"
              ],
              "result": "Essen Sie 2.467 kcal/Tag um ~0,4 kg/Woche zu verlieren. Ziel von 82 kg in etwa 20 Wochen."
            },
            {
              "title": "Frau, 28, 1,65m, 72 kg, leichte Aktivität",
              "steps": [
                "BMR = 10 × 72 + 6,25 × 165 − 5 × 28 − 161 = 1.417 kcal",
                "TDEE = 1.417 × 1,375 = 1.949 kcal (Erhaltung)",
                "Mäßiges Defizit (15%): 1.949 × 0,15 = 292 kcal/Tag",
                "Tägliches Ziel = 1.949 − 292 = 1.657 kcal",
                "Protein = 72g, Fett = 46g, Kohlenhydrate = 159g",
                "Wöchentlicher Verlust ≈ 0,3 kg/Woche → 63 kg in ~30 Wochen erreichen"
              ],
              "result": "Essen Sie 1.657 kcal/Tag um ~0,3 kg/Woche zu verlieren. Ziel von 63 kg in etwa 30 Wochen."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viele Kalorien sollte ich essen um Gewicht zu verlieren?",
          "answer": "Ihr Kalorienziel hängt von Ihrem BMR, Aktivitätsniveau und gewünschtem Verlusttempo ab. Die meisten Menschen verlieren sicher Gewicht bei einem 10-20% Defizit unter ihrem TDEE. Für die meisten Männer bedeutet das 1.800-2.500 kcal/Tag; für Frauen 1.400-2.000 kcal/Tag. Gehen Sie niemals unter 1.500 (Männer) oder 1.200 (Frauen) ohne medizinische Aufsicht."
        },
        {
          "question": "Was ist metabolische Anpassung?",
          "answer": "Metabolische Anpassung ist die Reaktion Ihres Körpers auf ein Kaloriendefizit — wenn Sie Gewicht verlieren, sinkt Ihr BMR, weil weniger Körpermasse zu erhalten ist. Das bedeutet, die gleiche Kalorienaufnahme, die anfangs Gewichtsverlust verursachte, wird schließlich zur Erhaltung. Dieser Rechner berücksichtigt dies, indem er Ihren BMR bei jedem projizierten Gewicht neu berechnet, was die meisten Konkurrenz-Rechner nicht tun."
        },
        {
          "question": "Wie schnell sollte ich Gewicht verlieren?",
          "answer": "Eine sichere Rate ist 0,5-1% des Körpergewichts pro Woche. Für eine 90 kg Person sind das 0,45-0,9 kg/Woche. Schneller als das und Sie riskieren Muskelverlust, Nährstoffmängel und Stoffwechselverlangsamung. Langsamere Raten (0,2 kg/Woche) erhalten Muskelmasse besser. Der Körperzusammensetzungs-Schalter zeigt genau, wo Ihre Verlustrate liegt."
        },
        {
          "question": "Warum ist Protein so wichtig beim Gewichtsverlust?",
          "answer": "Protein ist der wichtigste Makronährstoff während eines Kaloriendefizits. Es erhält die fettfreie Muskelmasse, erhöht die Sättigung (Sie fühlen sich länger satt) und hat den höchsten thermischen Effekt von Nahrung — Ihr Körper verbrennt 20-30% der Proteinkalorien allein bei der Verdauung. Zielen Sie auf mindestens 1g pro Kilogramm Körpergewicht. Höhere Proteinaufnahme während eines Defizits verbessert die Muskelerhaltung erheblich."
        },
        {
          "question": "Was ist der Unterschied zwischen BMR und TDEE?",
          "answer": "BMR (Grundumsatz) sind die Kalorien, die Sie in völliger Ruhe verbrennen — nur Atmung, Herzschlag, Organfunktionen. TDEE (Gesamttäglicher Energieverbrauch) addiert Ihr Aktivitätsniveau zum BMR. Um Gewicht zu verlieren, essen Sie unter Ihrem TDEE, nicht BMR. Dieser Rechner zeigt beide in den Metabolischen Details."
        },
        {
          "question": "Warum hat sich mein Gewichtsverlust verlangsamt?",
          "answer": "Gewichtsverlust-Plateaus sind normal und erwartet. Wenn Sie Gewicht verlieren, passt sich Ihr Stoffwechsel an — Ihr kleinerer Körper verbrennt weniger Kalorien. Wassereinlagerungen, hormonelle Schwankungen und Stress maskieren auch Fettabbau auf der Waage. Wenn Sie seit 8+ Wochen in einem Defizit sind, erwägen Sie eine Diätpause bei Erhaltungskalorien für 1-2 Wochen zum Zurücksetzen."
        },
        {
          "question": "Sollte ich Cardio oder Krafttraining machen um Gewicht zu verlieren?",
          "answer": "Beides, aber priorisieren Sie Krafttraining. Widerstandsübungen erhalten Muskeln während eines Defizits und halten Ihren Stoffwechsel langfristig höher. Cardio hilft zusätzliches Defizit zu schaffen, aber Gehen (NEAT) ist nachhaltiger als intensive Einheiten. Der beste Ansatz: Gewichte heben 3-4×/Woche und täglich 8.000+ Schritte gehen."
        },
        {
          "question": "Ist es sicher unter 1.200 Kalorien pro Tag zu gehen?",
          "answer": "Nicht ohne medizinische Aufsicht. Sehr niedrige Kaloriendiäten (VLCDs) unter 1.200 kcal/Tag riskieren Nährstoffmängel, Muskelverlust, Gallensteine und Stoffwechselschäden. Dieser Rechner setzt ein Minimum von 1.200 kcal für Frauen und 1.500 für Männer durch. Wenn Ihr berechnetes Ziel diese Grenze erreicht, zeigt der Sicherheitsgrenze-Indikator eine Warnung."
        },
        {
          "question": "Warum zeigt der Rechner zwei BMR-Formeln?",
          "answer": "Die Mifflin-St Jeor Formel verwendet Alter, Geschlecht, Gewicht und Größe — genau für die meisten Menschen. Die Katch-McArdle Formel verwendet fettfreie Körpermasse (erfordert Körperfett %) und ist genauer für schlanke oder muskulöse Personen. Wenn Sie Körperfett % eingeben, verwendet der Rechner Katch-McArdle für Prognosen, zeigt aber beide, damit Sie vergleichen können. Der Unterschied liegt typischerweise bei 50-150 Kalorien pro Tag."
        },
        {
          "question": "Wie wichtig sind Ballaststoffe beim Gewichtsverlust?",
          "answer": "Sehr wichtig. Ballaststoffe verlangsamen die Verdauung, stabilisieren den Blutzucker und halten Sie mit weniger Kalorien satt. Das IOM empfiehlt 14g Ballaststoffe pro 1.000 verbrauchte Kalorien. Für jemanden, der 1.800 Kalorien isst, sind das etwa 25g pro Tag. Gute Quellen sind Gemüse, Früchte, Hülsenfrüchte, Vollkorn und Samen. Die meisten Menschen bekommen nur 15g/Tag — fast die Hälfte der Empfehlung."
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
      defaultValue: 30,
      min: 15,
      max: 80,
      step: 1,
      suffix: "years",
    },

    // ── Weight ──────────────────────────────────────────────
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

    // ── Goal weight ─────────────────────────────────────────
    {
      id: "targetWeight",
      type: "number",
      defaultValue: null,
      placeholder: "160",
      step: 0.5,
      unitType: "weight",
      syncGroup: false,
      defaultUnit: "lbs",
      allowedUnits: ["kg", "lbs", "st"],
    },

    // ── Activity level ───────────────────────────────────────
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

    // ── Loss pace ────────────────────────────────────────────
    {
      id: "lossPace",
      type: "radio",
      defaultValue: "moderate",
      options: [
        { value: "slow" },
        { value: "moderate" },
        { value: "aggressive" },
      ],
    },

    // ── Body fat % (optional) ────────────────────────────────
    {
      id: "bodyFatPercent",
      type: "number",
      defaultValue: null,
      min: 5,
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
    { id: "deficitPerDay", type: "secondary", format: "number" },
    { id: "weeklyLoss", type: "secondary", format: "text" },
    { id: "timeToGoal", type: "secondary", format: "text" },
    { id: "proteinTarget", type: "secondary", format: "text" },
    { id: "carbsTarget", type: "secondary", format: "text" },
    { id: "fatTarget", type: "secondary", format: "text" },
    { id: "fiberTarget", type: "secondary", format: "text" },
    // Metabolic — visibility controlled by calculate() returning ""
    { id: "bmrMifflin", type: "secondary", format: "text" },
    { id: "bmrKatch", type: "secondary", format: "text" },
    { id: "tdee", type: "secondary", format: "text" },
    { id: "deficitPercent", type: "secondary", format: "text" },
    { id: "safetyFloor", type: "secondary", format: "text" },
    // Body composition — visibility controlled by calculate() returning ""
    { id: "currentBmi", type: "secondary", format: "text" },
    { id: "goalBmi", type: "secondary", format: "text" },
    { id: "lossRate", type: "secondary", format: "text" },
    { id: "lossQuality", type: "secondary", format: "text" },
    { id: "musclePreservation", type: "secondary", format: "text" },
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
  // INFO CARDS (2 list + 1 horizontal)
  // ═══════════════════════════════════════════════════════════════
  infoCards: [
    { id: "nutritionTips", type: "list", icon: "💡", itemCount: 4 },
    { id: "exerciseTips", type: "list", icon: "🏋️", itemCount: 4 },
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
    { id: "nutritionStrategy", type: "list", icon: "✅", itemCount: 6 },
    { id: "commonMistakes", type: "list", icon: "⚠️", itemCount: 5 },
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
    { id: "9" },
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
      authors: "Trexler ET, Smith-Ryan AE, Norton LE",
      year: "2014",
      title:
        "Metabolic adaptation to weight loss: implications for the athlete",
      source: "Journal of the International Society of Sports Nutrition, 11(1), 7",
      url: "https://pubmed.ncbi.nlm.nih.gov/24571926/",
    },
    {
      authors: "Helms ER, Aragon AA, Fitschen PJ",
      year: "2014",
      title:
        "Evidence-based recommendations for natural bodybuilding contest preparation: nutrition and supplementation",
      source: "Journal of the International Society of Sports Nutrition, 11, 20",
      url: "https://pubmed.ncbi.nlm.nih.gov/24864135/",
    },
    {
      authors: "Hall KD, Sacks G, Chandramohan D, et al",
      year: "2011",
      title:
        "Quantification of the effect of energy imbalance on bodyweight",
      source: "The Lancet, 378(9793), 826–837",
      url: "https://pubmed.ncbi.nlm.nih.gov/21872751/",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MISC CONFIG
  // ═══════════════════════════════════════════════════════════════
  hero: {
    badge: "Health",
    highlight: "metabolic adaptation, dual BMR, body composition tracking",
  },
  sidebar: {
    tips: [
      "Enter body fat % to unlock Katch-McArdle BMR and body composition analysis",
      "Toggle 'Body Composition' to track BMI and muscle preservation",
      "The weekly plan table recalculates calories as your weight drops — metabolic adaptation in action",
      "Aim for 0.5-1% of body weight per week for optimal muscle preservation",
    ],
  },
  features: {
    highlights: [
      "Metabolic adaptation — recalculates BMR at each projected weight",
      "Dual BMR formulas (Mifflin-St Jeor + Katch-McArdle)",
      "BMI tracking from current to goal weight",
      "Loss quality and muscle preservation ratings",
      "Fiber recommendation (IOM guideline)",
      "Safety floor enforcement (1,500M / 1,200F)",
      "Week-by-week projection chart with adaptation",
      "Complete macro breakdown with adaptive table",
    ],
  },
  relatedCalculators: [
    "calorie-calculator",
    "bmi-calculator",
    "body-fat-calculator",
    "weight-gain-calculator",
  ],
  ads: {
    topBanner: true,
    sidebar: true,
    inContent: false,
  },
};

/* ═══════════════════════════════════════════════════════════════════
   CALCULATE FUNCTION
   Key feature: Metabolic adaptation — recalculates BMR at each
   projected weight so the chart/table show realistic slowing progress.
   ═══════════════════════════════════════════════════════════════════ */

const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

const PACE_DEFICIT: Record<string, number> = {
  slow: 0.1,
  moderate: 0.15,
  aggressive: 0.2,
};

const SAFE_MIN_MALE = 1500;
const SAFE_MIN_FEMALE = 1200;
const CAL_PER_LB = 3500;

/** Mifflin-St Jeor BMR (or Katch-McArdle if bodyFat provided) */
function mifflinBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: string,
  bodyFatPercent?: number | null
): number {
  if (bodyFatPercent && bodyFatPercent > 0) {
    const leanMassKg = weightKg * (1 - bodyFatPercent / 100);
    return 370 + 21.6 * leanMassKg;
  }
  return gender === "male"
    ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
}

/** Pure Mifflin-St Jeor (never uses body fat) */
function pureMifflinBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: string
): number {
  return gender === "male"
    ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
}

export function calculateWeightLoss(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;

  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read inputs ───────────────────────────────────────────
  const gender = (values.gender as string) || "male";
  const age = values.age as number;
  const activityLevel = (values.activityLevel as string) || "moderate";
  const lossPace = (values.lossPace as string) || "moderate";
  const bodyFatPercent = values.bodyFatPercent as number | null;

  // Toggle states
  const showMetabolic = values.showMetabolic === true;
  const showBodyComp = values.showBodyComp === true;

  // ── Convert to metric ─────────────────────────────────────
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

  const currentWeightLbs = convertFromBase(weightKg, "lbs", "weight");
  const targetWeightLbs = convertFromBase(targetWeightKg, "lbs", "weight");

  // ── Validate: target < current ────────────────────────────
  if (targetWeightKg >= weightKg) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── BMR: both formulas ────────────────────────────────────
  const bmrMifflinVal = pureMifflinBMR(weightKg, heightCm, age, gender);

  let bmrKatchVal: number | null = null;
  if (bodyFatPercent != null && bodyFatPercent > 0) {
    const leanMassKg = weightKg * (1 - bodyFatPercent / 100);
    bmrKatchVal = 370 + 21.6 * leanMassKg;
  }

  // Use best available
  const bmr = mifflinBMR(weightKg, heightCm, age, gender, bodyFatPercent);

  // ── TDEE ──────────────────────────────────────────────────
  const activityFactor = ACTIVITY_MULTIPLIERS[activityLevel] || 1.55;
  const tdee = bmr * activityFactor;

  // ── Deficit & daily calories ──────────────────────────────
  const deficitPercent = PACE_DEFICIT[lossPace] || 0.15;
  const deficitCalories = Math.round(tdee * deficitPercent);
  let dailyCalories = Math.round(tdee - deficitCalories);

  // ── Safety floor ──────────────────────────────────────────
  const safeMin = gender === "male" ? SAFE_MIN_MALE : SAFE_MIN_FEMALE;
  let safetyFloorApplied = false;
  if (dailyCalories < safeMin) {
    dailyCalories = safeMin;
    safetyFloorApplied = true;
  }

  const actualDeficit = Math.round(tdee - dailyCalories);
  const actualDeficitPercent = (actualDeficit / tdee) * 100;

  // ── Weekly loss ───────────────────────────────────────────
  const weeklyLossLbs = (actualDeficit * 7) / CAL_PER_LB;
  const weeklyLossKg = weeklyLossLbs * 0.453592;

  // ── Time to goal ──────────────────────────────────────────
  const totalToLoseLbs = currentWeightLbs - targetWeightLbs;
  const weeksToGoal =
    weeklyLossLbs > 0 ? Math.ceil(totalToLoseLbs / weeklyLossLbs) : 999;

  // ── Protein target ────────────────────────────────────────
  let proteinGrams: number;
  if (bodyFatPercent && bodyFatPercent > 0) {
    const leanMassLbs = currentWeightLbs * (1 - bodyFatPercent / 100);
    proteinGrams = Math.round(leanMassLbs * 1.2);
  } else {
    proteinGrams = Math.round(currentWeightLbs * 1.0);
  }

  // ── Macro split ───────────────────────────────────────────
  const proteinCal = proteinGrams * 4;
  const fatCal = Math.round(dailyCalories * 0.25);
  const fatGrams = Math.round(fatCal / 9);
  const carbCal = Math.max(0, dailyCalories - proteinCal - fatCal);
  const carbGrams = Math.round(carbCal / 4);

  // ── Fiber (IOM: 14g per 1,000 cal) ────────────────────────
  const fiberG = Math.round((dailyCalories / 1000) * 14);

  // ── BMI calculations ──────────────────────────────────────
  const heightM = heightCm / 100;
  const currentBmi = weightKg / (heightM * heightM);
  const goalBmi = targetWeightKg / (heightM * heightM);

  // ── Loss rate as % bodyweight ─────────────────────────────
  const lossRatePercent = (weeklyLossLbs / currentWeightLbs) * 100;

  // ── Loss quality rating ───────────────────────────────────
  let lossQuality = "";
  if (lossRatePercent <= 0.5) {
    lossQuality = "🟢 Optimal — excellent muscle preservation";
  } else if (lossRatePercent <= 1.0) {
    lossQuality = "🟢 Good — sustainable pace with moderate muscle retention";
  } else if (lossRatePercent <= 1.5) {
    lossQuality = "🟡 Fast — some muscle loss risk, increase protein";
  } else {
    lossQuality = "🔴 Aggressive — high muscle loss risk, not recommended long-term";
  }

  // ── Muscle preservation estimate ──────────────────────────
  // Based on deficit size + protein adequacy
  const proteinPerLb = proteinGrams / currentWeightLbs;
  let musclePreservation = "";
  if (proteinPerLb >= 0.8 && deficitPercent <= 0.15) {
    musclePreservation = "🟢 High — sufficient protein + moderate deficit";
  } else if (proteinPerLb >= 0.8 && deficitPercent <= 0.20) {
    musclePreservation = "🟡 Moderate — good protein but larger deficit";
  } else if (proteinPerLb >= 0.6) {
    musclePreservation = "🟡 Moderate — consider increasing protein to 1g/lb";
  } else {
    musclePreservation = "🔴 Low — increase protein and reduce deficit";
  }

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
  const weekLabelSingular = v["week"] || "week";
  const weekLabelPlural = v["weeks"] || "weeks";
  const weekLabel = weeksToGoal === 1 ? weekLabelSingular : weekLabelPlural;
  const weightUnitLabel = v[weightUnit] || weightUnit;
  const reqBfLabel = v["Requires body fat %"] || "Requires body fat %";
  const bwWkUnit = v["% BW/wk"] || "% BW/wk";
  const dayLabel = v["day"] || "day";
  const notApplied = v["Not applied"] || "Not applied";

  // ── Format weekly loss ────────────────────────────────────
  const weeklyLossDisplay = weightUnit === "kg" ? weeklyLossKg : weeklyLossLbs;
  const weeklyLossFormatted = `${weeklyLossDisplay.toFixed(2)} ${weightUnitLabel}/${weekLabelSingular}`;

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
  const targetFormatted = weightUnit === "kg"
    ? `${targetWeightKg.toFixed(1)} ${weightUnitLabel}`
    : `${Math.round(targetWeightLbs)} ${weightUnitLabel}`;

  // ── Summary ───────────────────────────────────────────────
  const summaryTemplate =
    f.summary ||
    "Eat {dailyCalories} cal/day ({deficit} deficit). Your BMR is {bmr} cal and TDEE is {tdee} cal. Expected loss: {weeklyLoss}/week. Reach {targetWeight} in {timeToGoal}.";

  let summary = summaryTemplate
    .replace("{dailyCalories}", dailyCalories.toLocaleString())
    .replace("{deficit}", `−${actualDeficit.toLocaleString()}`)
    .replace("{bmr}", Math.round(bmr).toLocaleString())
    .replace("{tdee}", Math.round(tdee).toLocaleString())
    .replace("{weeklyLoss}", weeklyLossFormatted)
    .replace("{targetWeight}", targetFormatted)
    .replace("{timeToGoal}", timeToGoalFormatted);

  if (safetyFloorApplied) {
    const floorMsg = v["⚠️ Minimum floor applied"] || "⚠️ Minimum floor applied";
    summary += ` ${floorMsg} (${safeMin} ${calUnit}).`;
  }

  // ═════════════════════════════════════════════════════════════
  // CHART DATA — Weight projection with metabolic adaptation
  // ═════════════════════════════════════════════════════════════
  const chartData: Array<Record<string, unknown>> = [];
  const maxChartWeeks = Math.min(weeksToGoal, 104);

  let chartStep: number;
  if (maxChartWeeks <= 26) chartStep = 1;
  else if (maxChartWeeks <= 52) chartStep = 2;
  else chartStep = 4;

  let projWeightKg = weightKg;

  chartData.push({
    week: "W0",
    weight: weightUnit === "kg"
      ? Math.round(projWeightKg * 10) / 10
      : Math.round(projWeightKg * 2.20462 * 10) / 10,
    goalWeight: weightUnit === "kg"
      ? Math.round(targetWeightKg * 10) / 10
      : Math.round(targetWeightLbs * 10) / 10,
  });

  for (let w = chartStep; w <= maxChartWeeks; w += chartStep) {
    const weekBMR = mifflinBMR(projWeightKg, heightCm, age, gender, bodyFatPercent);
    const weekTDEE = weekBMR * activityFactor;
    const weekDeficitCal = Math.round(weekTDEE * deficitPercent);
    let weekDailyCal = Math.round(weekTDEE - weekDeficitCal);
    if (weekDailyCal < safeMin) weekDailyCal = safeMin;

    const weekActualDeficit = weekTDEE - weekDailyCal;
    const weekLossKg = ((weekActualDeficit * 7) / CAL_PER_LB) * 0.453592;

    projWeightKg -= weekLossKg * chartStep;
    if (projWeightKg < targetWeightKg) projWeightKg = targetWeightKg;

    const displayWeight = weightUnit === "kg"
      ? Math.round(projWeightKg * 10) / 10
      : Math.round(projWeightKg * 2.20462 * 10) / 10;

    chartData.push({
      week: `W${w}`,
      weight: displayWeight,
      goalWeight: weightUnit === "kg"
        ? Math.round(targetWeightKg * 10) / 10
        : Math.round(targetWeightLbs * 10) / 10,
    });

    if (projWeightKg <= targetWeightKg) break;
  }

  const lastChart = chartData[chartData.length - 1];
  const goalWeightDisplay = weightUnit === "kg"
    ? Math.round(targetWeightKg * 10) / 10
    : Math.round(targetWeightLbs * 10) / 10;

  if ((lastChart.weight as number) > goalWeightDisplay) {
    chartData.push({
      week: `W${weeksToGoal}`,
      weight: goalWeightDisplay,
      goalWeight: goalWeightDisplay,
    });
  }

  // ═════════════════════════════════════════════════════════════
  // DETAILED TABLE — Weekly plan with metabolic adaptation
  // ═════════════════════════════════════════════════════════════
  const weekLabelCol = v["Week"] || "Week";
  const goalLabelText = v["Goal"] || "🎯 Goal";

  const maxTableWeeks = Math.min(weeksToGoal, 52);
  const tableStep = maxTableWeeks > 26 ? 2 : 1;

  const tableData: Record<string, string>[] = [];
  let tableWeightKg = weightKg;

  for (let w = tableStep; w <= maxTableWeeks; w += tableStep) {
    const wBMR = mifflinBMR(tableWeightKg, heightCm, age, gender, bodyFatPercent);
    const wTDEE = wBMR * activityFactor;
    const wDeficit = Math.round(wTDEE * deficitPercent);
    let wDailyCal = Math.round(wTDEE - wDeficit);
    if (wDailyCal < safeMin) wDailyCal = safeMin;

    const wActualDeficit = wTDEE - wDailyCal;
    const wWeeklyLossKg = ((wActualDeficit * 7) / CAL_PER_LB) * 0.453592;

    tableWeightKg -= wWeeklyLossKg * tableStep;
    if (tableWeightKg < targetWeightKg) tableWeightKg = targetWeightKg;

    const tableWeightLbs = tableWeightKg * 2.20462;

    const wProtein = bodyFatPercent
      ? Math.round(tableWeightLbs * (1 - bodyFatPercent / 100) * 1.2)
      : Math.round(tableWeightLbs * 1.0);
    const wProteinCal = wProtein * 4;
    const wFatCal = Math.round(wDailyCal * 0.25);
    const wFatG = Math.round(wFatCal / 9);
    const wCarbG = Math.round(Math.max(0, wDailyCal - wProteinCal - wFatCal) / 4);

    const estWeightStr = weightUnit === "kg"
      ? `${tableWeightKg.toFixed(1)} ${weightUnitLabel}`
      : `${tableWeightLbs.toFixed(1)} ${weightUnitLabel}`;

    tableData.push({
      week: `${weekLabelCol} ${w}`,
      weight: estWeightStr,
      dailyCal: wDailyCal.toLocaleString(),
      protein: `${wProtein}${gUnit}`,
      carbs: `${wCarbG}${gUnit}`,
      fat: `${wFatG}${gUnit}`,
    });

    if (tableWeightKg <= targetWeightKg) break;
  }

  // Goal row
  const lastRow = tableData.length > 0 ? tableData[tableData.length - 1] : null;
  if (!lastRow || !lastRow.week.includes(`${weeksToGoal}`)) {
    const goalProtein = bodyFatPercent
      ? Math.round(targetWeightLbs * (1 - bodyFatPercent / 100) * 1.2)
      : Math.round(targetWeightLbs * 1.0);
    const goalBMR = mifflinBMR(targetWeightKg, heightCm, age, gender, bodyFatPercent);
    const goalTDEE = goalBMR * activityFactor;
    const goalDeficit = Math.round(goalTDEE * deficitPercent);
    let goalDailyCal = Math.round(goalTDEE - goalDeficit);
    if (goalDailyCal < safeMin) goalDailyCal = safeMin;
    const goalProteinCal = goalProtein * 4;
    const goalFatCal = Math.round(goalDailyCal * 0.25);
    const goalFatG = Math.round(goalFatCal / 9);
    const goalCarbG = Math.round(Math.max(0, goalDailyCal - goalProteinCal - goalFatCal) / 4);

    const goalWeightStr = weightUnit === "kg"
      ? `${targetWeightKg.toFixed(1)} ${weightUnitLabel}`
      : `${Math.round(targetWeightLbs)} ${weightUnitLabel}`;

    tableData.push({
      week: `${goalLabelText} (${weekLabelCol} ${weeksToGoal})`,
      weight: goalWeightStr,
      dailyCal: goalDailyCal.toLocaleString(),
      protein: `${goalProtein}${gUnit}`,
      carbs: `${goalCarbG}${gUnit}`,
      fat: `${goalFatG}${gUnit}`,
    });
  }

  // ═════════════════════════════════════════════════════════════
  // RETURN
  // ═════════════════════════════════════════════════════════════
  return {
    values: {
      dailyCalories,
      bmrMifflin: Math.round(bmrMifflinVal),
      bmrKatch: bmrKatchVal !== null ? Math.round(bmrKatchVal) : null,
      tdee: Math.round(tdee),
      deficitPerDay: actualDeficit,
      weeklyLoss: weeklyLossLbs,
      timeToGoal: weeksToGoal * 7,
      proteinTarget: proteinGrams,
      proteinGrams,
      carbGrams,
      fatGrams,
      currentBmi,
      goalBmi,
    },
    formatted: {
      dailyCalories: `${dailyCalories.toLocaleString()} ${calUnit}`,
      deficitPerDay: `−${actualDeficit.toLocaleString()} ${calUnit}`,
      weeklyLoss: weeklyLossFormatted,
      timeToGoal: timeToGoalFormatted,
      proteinTarget: `${proteinGrams} ${gUnit}/${dayLabel}`,
      carbsTarget: `${carbGrams} ${gUnit}/${dayLabel}`,
      fatTarget: `${fatGrams} ${gUnit}/${dayLabel}`,
      fiberTarget: `${fiberG}${gUnit}`,
      // Metabolic — hidden when toggle OFF
      bmrMifflin: showMetabolic ? `${Math.round(bmrMifflinVal).toLocaleString()} ${calUnit}` : "",
      bmrKatch: showMetabolic
        ? (bmrKatchVal !== null
          ? `${Math.round(bmrKatchVal).toLocaleString()} ${calUnit}`
          : reqBfLabel)
        : "",
      tdee: showMetabolic ? `${Math.round(tdee).toLocaleString()} ${calUnit}` : "",
      deficitPercent: showMetabolic ? `−${Math.round(actualDeficitPercent)}%` : "",
      safetyFloor: showMetabolic
        ? (safetyFloorApplied
          ? `⚠️ Applied (${safeMin} ${calUnit})`
          : `✅ ${notApplied}`)
        : "",
      // Body composition — hidden when toggle OFF
      currentBmi: showBodyComp ? `${currentBmi.toFixed(1)} (${bmiCategory(currentBmi)})` : "",
      goalBmi: showBodyComp ? `${goalBmi.toFixed(1)} (${bmiCategory(goalBmi)})` : "",
      lossRate: showBodyComp ? `${lossRatePercent.toFixed(2)} ${bwWkUnit}` : "",
      lossQuality: showBodyComp ? lossQuality : "",
      musclePreservation: showBodyComp ? musclePreservation : "",
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default weightLossConfig;
