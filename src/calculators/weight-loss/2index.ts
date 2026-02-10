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
            slow: "Gradual — ~0.5 lb/wk",
            moderate: "Moderate — ~1 lb/wk",
            aggressive: "Aggressive — ~1.5 lb/wk",
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
