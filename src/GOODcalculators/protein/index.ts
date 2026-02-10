import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ═══════════════════════════════════════════════════════════════════
// PROTEIN INTAKE CALCULATOR V4 - IMPROVED
// ═══════════════════════════════════════════════════════════════════
// NEW FEATURES (2026-02-05):
// 1. DetailedTable: High-Protein Foods (30+ items filtered by diet)
// 2. Sample Meal Plans (3 diet types)
// 3. Macro Split Recommendation (P/C/F based on goal)
// 4. Chart: Protein Distribution Across Meals (visual bar chart)
// ═══════════════════════════════════════════════════════════════════

export const proteinCalculatorConfig: CalculatorConfigV4 = {
  id: "protein",
  version: "4.0",
  category: "health",
  icon: "🥩",

  // ═══════════════════════════════════════════════════════════════════
  // PRESETS (with weight/height values for testing)
  // ═══════════════════════════════════════════════════════════════════
  presets: [
    {
      id: "officeWorker",
      icon: "💼",
      values: {
        gender: "male",
        age: 30,
        weight: 180,      // lbs (defaultUnit)
        height: 178,      // cm (base for ft_in)
        goal: "maintain",
        activityLevel: "sedentary",
        trainingType: "none",
        dietPreference: "omnivore",
        mealsPerDay: 3,
        pregnancyStatus: "none",
      },
    },
    {
      id: "weekendGym",
      icon: "🏃",
      values: {
        gender: "male",
        age: 28,
        weight: 185,      // lbs (defaultUnit)
        height: 180,      // cm (base for ft_in)
        goal: "muscle",
        activityLevel: "moderate",
        trainingType: "strength",
        dietPreference: "omnivore",
        mealsPerDay: 4,
        pregnancyStatus: "none",
      },
    },
    {
      id: "athlete",
      icon: "🏋️",
      values: {
        gender: "male",
        age: 25,
        weight: 190,      // lbs (defaultUnit)
        height: 183,      // cm (base for ft_in)
        goal: "muscle",
        activityLevel: "veryActive",
        trainingType: "strength",
        dietPreference: "omnivore",
        mealsPerDay: 5,
        pregnancyStatus: "none",
      },
    },
    {
      id: "cuttingPhase",
      icon: "✂️",
      values: {
        gender: "male",
        age: 32,
        weight: 175,      // lbs (defaultUnit)
        height: 175,      // cm (base for ft_in)
        goal: "loss",
        activityLevel: "active",
        trainingType: "mixed",
        dietPreference: "omnivore",
        mealsPerDay: 4,
        pregnancyStatus: "none",
      },
    },
    {
      id: "veganAthlete",
      icon: "🌱",
      values: {
        gender: "female",
        age: 28,
        weight: 140,      // lbs (defaultUnit)
        height: 165,      // cm (base for ft_in)
        goal: "muscle",
        activityLevel: "active",
        trainingType: "strength",
        dietPreference: "vegan",
        mealsPerDay: 5,
        pregnancyStatus: "none",
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // TRANSLATIONS (English only)
  // ═══════════════════════════════════════════════════════════════════
  t: {
    en: {
      name: "Protein Calculator",
      slug: "protein-calculator",
      subtitle: "Calculate your optimal daily protein intake, get personalized meal plans, and discover the best high-protein foods for your diet",
      breadcrumb: "Protein",

      seo: {
        title: "Protein Calculator - Daily Intake, Meal Plans & Food Guide",
        description: "Calculate your optimal daily protein intake with personalized macro split, sample meal plans, and a database of 30+ high-protein foods filtered by diet type. Free tool with science-backed recommendations.",
        shortDescription: "Calculate protein needs with meal plans and food suggestions",
        keywords: [
          "protein calculator",
          "daily protein intake",
          "high protein foods",
          "protein meal plan",
          "macro calculator",
          "protein per day",
          "protein for muscle gain",
          "protein for weight loss",
        ],
      },

      calculator: { yourInformation: "Your Body & Goals" },
      ui: {
        yourInformation: "Your Body & Goals",
        calculate: "Calculate Protein",
        reset: "Reset",
        results: "Your Protein Plan",
      },

      // ─────────────────────────────────────────────────────────────
      // INPUTS
      // ─────────────────────────────────────────────────────────────
      inputs: {
        gender: {
          label: "Gender",
          helpText: "Affects basal metabolic rate and protein calculation",
          options: { male: "Male", female: "Female" },
        },
        age: {
          label: "Age",
          helpText: "Protein needs increase after 65 due to reduced synthesis efficiency",
        },
        weight: {
          label: "Weight",
          helpText: "Current body weight",
        },
        height: {
          label: "Height",
          helpText: "Used to estimate total daily energy expenditure",
        },
        bodyFatPercent: {
          label: "Body Fat % (optional)",
          helpText: "If known, improves accuracy by using lean mass instead of total weight",
          placeholder: "e.g. 20",
        },
        goal: {
          label: "Primary Goal",
          helpText: "Your goal determines the protein-to-bodyweight ratio and macro split",
          options: {
            muscle: "Build Muscle",
            loss: "Lose Fat, Keep Muscle",
            maintain: "Maintain Weight & Health",
            recomp: "Body Recomposition (lose fat + gain muscle)",
          },
        },
        activityLevel: {
          label: "Activity Level",
          helpText: "How active are you on a typical week?",
          options: {
            sedentary: "Sedentary (desk job, little exercise)",
            light: "Light (1-2 workouts/week)",
            moderate: "Moderate (3-4 workouts/week)",
            active: "Active (5-6 workouts/week)",
            veryActive: "Very Active (daily intense training)",
            extraActive: "Extra Active (2x/day or physical job + training)",
          },
        },
        trainingType: {
          label: "Training Type",
          helpText: "Resistance training increases protein needs more than cardio",
          options: {
            strength: "Strength / Hypertrophy",
            cardio: "Cardio / Endurance",
            hiit: "HIIT / CrossFit",
            mixed: "Mixed (strength + cardio)",
            none: "No regular training",
          },
        },
        dietPreference: {
          label: "Diet Preference",
          helpText: "Affects protein source recommendations and meal plans",
          options: {
            omnivore: "Omnivore (eat everything)",
            vegetarian: "Vegetarian (no meat, eggs/dairy OK)",
            vegan: "Vegan (plant-based only)",
          },
        },
        mealsPerDay: {
          label: "Meals Per Day",
          helpText: "Used to calculate per-meal protein distribution",
        },
        pregnancyStatus: {
          label: "Pregnancy / Lactation",
          helpText: "Pregnancy and breastfeeding increase protein needs",
          options: {
            none: "Not applicable",
            trimester1: "Pregnant — 1st trimester",
            trimester2: "Pregnant — 2nd trimester",
            trimester3: "Pregnant — 3rd trimester",
            lactating: "Breastfeeding",
          },
        },
      },

      // ─────────────────────────────────────────────────────────────
      // RESULTS (NEW: added macro split results)
      // ─────────────────────────────────────────────────────────────
      results: {
        dailyProtein: { label: "Daily Protein Target" },
        perMealProtein: { label: "Protein Per Meal" },
        proteinPerKg: { label: "Protein Per kg Bodyweight" },
        caloriesFromProtein: { label: "Calories From Protein" },
        percentOfCalories: { label: "% of Daily Calories" },
        postWorkoutDose: { label: "Post-Workout Dose" },
        supplementMax: { label: "Max From Supplements" },
        // NEW: Macro split results
        suggestedCarbs: { label: "Suggested Carbs" },
        suggestedFats: { label: "Suggested Fats" },
        macroSplit: { label: "Macro Split" },
        totalCalories: { label: "Estimated TDEE" },
      },

      // ─────────────────────────────────────────────────────────────
      // PRESETS
      // ─────────────────────────────────────────────────────────────
      presets: {
        officeWorker: {
          label: "Office Worker",
          description: "Sedentary lifestyle, maintain health",
        },
        weekendGym: {
          label: "Weekend Gym",
          description: "Moderate training, building muscle",
        },
        athlete: {
          label: "Serious Athlete",
          description: "Daily training, maximizing gains",
        },
        cuttingPhase: {
          label: "Cutting Phase",
          description: "Active training, losing fat, protecting muscle",
        },
        veganAthlete: {
          label: "Vegan Athlete",
          description: "Plant-based, muscle building",
        },
      },

      // ─────────────────────────────────────────────────────────────
      // DYNAMIC VALUES
      // ─────────────────────────────────────────────────────────────
      values: {
        "g/day": "g/day",
        "g/meal": "g/meal",
        "g/kg": "g/kg",
        "g": "g",
        "cal": "cal",
        "max": "max",
        "P": "P",
        "C": "C",
        "F": "F",
      },

      // ─────────────────────────────────────────────────────────────
      // FORMATS
      // ─────────────────────────────────────────────────────────────
      formats: {
        summary: "You should eat {dailyProtein} of protein per day ({proteinPerKg}). That's about {perMealProtein} per meal across {meals} meals. Your suggested macro split is {macroSplit} based on your {goal} goal.",
      },

      // ─────────────────────────────────────────────────────────────
      // INFO CARDS (NEW: Added macro split card)
      // ─────────────────────────────────────────────────────────────
      infoCards: {
        proteinPlan: {
          title: "Your Protein Plan",
          items: {
            "0": "Daily Target",
            "1": "Per Meal",
            "2": "Post-Workout",
            "3": "Max Supplements",
          },
        },
        macroSplit: {
          title: "Complete Macro Plan",
          items: {
            "0": "Protein",
            "1": "Carbs",
            "2": "Fats",
            "3": "Macro Split",
          },
        },
        tips: {
          title: "Protein Optimization Tips",
          items: [
            "Spread protein evenly across meals — 20-40g per sitting maximizes muscle protein synthesis",
            "Prioritize complete proteins: eggs, chicken, fish, dairy, soy, and quinoa contain all 9 essential amino acids",
            "Eat 25-30g of protein at breakfast to break overnight muscle catabolism and reduce cravings",
            "Aim for whole food sources first — limit supplements to no more than 35% of total daily protein",
          ],
        },
      },

      // ─────────────────────────────────────────────────────────────
      // DETAILED TABLE (NEW: High-Protein Foods filtered by diet)
      // ─────────────────────────────────────────────────────────────
      detailedTable: {
        proteinFoods: {
          button: "View High-Protein Foods",
          title: "High-Protein Foods by Diet Type",
          columns: {
            food: "Food",
            serving: "Serving",
            protein: "Protein",
            calories: "Calories",
            diet: "Diet Type",
          },
        },
      },

      // ─────────────────────────────────────────────────────────────
      // REFERENCE DATA (Protein by Goal)
      // ─────────────────────────────────────────────────────────────
      referenceData: {
        proteinByGoal: {
          title: "Protein Recommendations by Goal",
          items: {
            muscle: { label: "Build Muscle", value: "1.6 – 2.2 g/kg/day" },
            loss: { label: "Fat Loss (preserve muscle)", value: "1.8 – 2.7 g/kg/day" },
            maintain: { label: "Maintain / General Health", value: "1.2 – 1.6 g/kg/day" },
            recomp: { label: "Body Recomposition", value: "1.6 – 2.2 g/kg/day" },
            sedentary: { label: "Sedentary (RDA minimum)", value: "0.8 g/kg/day" },
            overweight: { label: "Overweight Fat Loss", value: "1.2 – 1.5 g/kg/day" },
            elderly: { label: "Adults 65+", value: "1.0 – 1.2 g/kg/day" },
            pregnancy: { label: "Pregnancy / Lactation", value: "1.7+ g/kg/day" },
          },
        },
      },

      // ─────────────────────────────────────────────────────────────
      // EDUCATION (NEW: Added mealPlans section)
      // ─────────────────────────────────────────────────────────────
      education: {
        whatIs: {
          title: "Why Protein Intake Matters",
          content: "Protein is one of three macronutrients your body needs daily, alongside carbohydrates and fats. Unlike the other two, protein is the primary building block for muscles, bones, skin, enzymes, and hormones. Your body cannot store excess protein the way it stores fat or glycogen, so you need a consistent daily intake. When you eat protein, your body breaks it down into amino acids — 9 of which are essential, meaning you can only get them from food. These amino acids drive muscle protein synthesis (the process of building and repairing muscle tissue), support immune function, and regulate metabolism. The recommended dietary allowance (RDA) of 0.8 g/kg is a minimum to prevent deficiency in sedentary adults — not an optimal target. Research consistently shows that active individuals, those trying to lose fat, older adults, and pregnant women all benefit from significantly higher intakes, typically 1.2 to 2.2 g/kg per day depending on their goal.",
        },
        howItWorks: {
          title: "How This Calculator Works",
          content: "This calculator determines your optimal protein intake in three steps. First, it estimates your total daily energy expenditure (TDEE) using the Mifflin-St Jeor equation for basal metabolic rate, adjusted by your activity level. Second, it selects a protein-per-kilogram ratio based on your primary goal — muscle gain, fat loss, maintenance, or body recomposition — with further adjustments for training type, age, and body composition. Third, it distributes your daily target across your meals and provides a complete macro split (protein, carbs, fats) optimized for your goal. If you provide your body fat percentage, the calculator uses lean body mass instead of total weight for improved accuracy.",
        },
        timing: {
          title: "Protein Timing & Distribution",
          items: [
            { text: "Spread protein evenly across 3-5 meals — this stimulates muscle protein synthesis more effectively than loading one meal", type: "info" },
            { text: "Consume 25-30g of high-quality protein at breakfast to break the overnight catabolic state and reduce hunger throughout the day", type: "info" },
            { text: "Eat 20-40g of protein within 2 hours after resistance training — the 'anabolic window' is wider than previously thought but still important", type: "info" },
            { text: "Consider 20-30g of slow-digesting protein (casein, cottage cheese) before sleep to support overnight muscle protein synthesis", type: "info" },
            { text: "There is no practical upper limit to protein absorption per meal — recent research shows 100g is utilized over 12 hours — but distribution still optimizes MPS", type: "warning" },
          ],
        },
        sources: {
          title: "Best Protein Sources by Diet Type",
          items: [
            { text: "Omnivore: chicken breast (31g/100g), eggs (13g/100g), salmon (25g/100g), Greek yogurt (10g/100g), lean beef (26g/100g)", type: "info" },
            { text: "Vegetarian: eggs, Greek yogurt, cottage cheese, whey protein, tempeh (19g/100g), lentils (9g/100g)", type: "info" },
            { text: "Vegan: tofu (17g/100g), tempeh (19g/100g), lentils, chickpeas (9g/100g), seitan (25g/100g), soy protein, pea protein", type: "info" },
            { text: "Complete proteins contain all 9 essential amino acids — most animal sources are complete; plant sources often need to be combined", type: "warning" },
            { text: "Leucine is the key amino acid for triggering muscle protein synthesis — aim for 2.5-3g per meal (found in ~25-30g of quality protein)", type: "info" },
          ],
        },
        // NEW: Sample Meal Plans by diet type
        mealPlans: {
          title: "Sample Meal Plans",
          description: "Real-world examples showing how to hit your daily protein target across different diet types",
          examples: [
            {
              title: "Omnivore - 150g/day",
              steps: [
                "Breakfast: 3 eggs + 2 toast → 19g protein",
                "Snack: Greek yogurt 200g → 20g protein",
                "Lunch: Chicken breast 150g + rice → 47g protein",
                "Snack: Protein shake 1 scoop → 25g protein",
                "Dinner: Salmon 150g + veggies → 38g protein",
              ],
              result: "Total: 149g protein, ~1,950 calories",
            },
            {
              title: "Vegetarian - 150g/day",
              steps: [
                "Breakfast: Oatmeal + whey protein → 30g protein",
                "Snack: Cottage cheese 150g → 17g protein",
                "Lunch: Paneer tikka 150g + naan → 35g protein",
                "Snack: Almonds 30g + Greek yogurt → 16g protein",
                "Dinner: Lentil dal 200g + quinoa → 25g protein",
                "Before bed: Casein shake → 27g protein",
              ],
              result: "Total: 150g protein, ~2,000 calories",
            },
            {
              title: "Vegan - 150g/day",
              steps: [
                "Breakfast: Smoothie (pea protein, banana, PB) → 32g protein",
                "Snack: Edamame 150g → 17g protein",
                "Lunch: Tempeh stir-fry 200g + rice → 38g protein",
                "Snack: Hummus + veggies + bread → 12g protein",
                "Dinner: Seitan 150g + quinoa 100g → 42g protein",
                "Snack: Soy milk 250ml → 9g protein",
              ],
              result: "Total: 150g protein, ~2,100 calories",
            },
          ],
        },
        examples: {
          title: "Protein Calculation Examples",
          description: "See how goals change your daily protein target",
          examples: [
            {
              title: "180 lb Male — Muscle Gain",
              steps: [
                "Weight: 180 lbs = 81.6 kg",
                "Goal: Build Muscle → 1.6-2.2 g/kg",
                "Activity: Moderate (3-4x/week) → use mid-range",
                "Training: Strength → slight bump to upper range",
                "Daily target: 81.6 × 1.8-2.2 = 147-180 g/day",
                "4 meals/day → 37-45 g/meal",
              ],
              result: "Target: 147-180 g/day | 37-45 g/meal | 588-720 cal from protein",
            },
            {
              title: "140 lb Female — Fat Loss",
              steps: [
                "Weight: 140 lbs = 63.5 kg",
                "Goal: Lose Fat → 1.8-2.7 g/kg",
                "Activity: Active (5-6x/week) → use mid-upper range",
                "Training: Mixed → standard range",
                "Daily target: 63.5 × 2.0-2.4 = 127-152 g/day",
                "3 meals/day → 42-51 g/meal",
              ],
              result: "Target: 127-152 g/day | 42-51 g/meal | 508-610 cal from protein",
            },
          ],
        },
      },

      // ─────────────────────────────────────────────────────────────
      // CHART (NEW: Protein distribution across meals)
      // ─────────────────────────────────────────────────────────────
      chart: {
        title: "Protein Distribution Across Meals",
        xLabel: "Meal",
        yLabel: "Protein (g)",
        series: {
          protein: "Protein per Meal",
        },
      },

      // ─────────────────────────────────────────────────────────────
      // FAQS
      // ─────────────────────────────────────────────────────────────
      faqs: [
        {
          question: "How much protein do I actually need per day?",
          answer: "It depends on your goal and activity level. The RDA of 0.8 g/kg is a bare minimum to prevent deficiency — most active people need significantly more. For muscle gain, research supports 1.6-2.2 g/kg per day. For fat loss while preserving muscle, 1.8-2.7 g/kg. For general health maintenance with light activity, 1.2-1.6 g/kg. A 180 lb (82 kg) person building muscle would need roughly 130-180 grams per day.",
        },
        {
          question: "Can I eat too much protein?",
          answer: "For healthy individuals, there is no known harmful upper limit for protein intake. Research shows that even 2-3x the RDA has no negative effects on kidney function, bone health, or liver function in healthy adults. However, eating excessive protein at the expense of other macronutrients can lead to an unbalanced diet. The practical concern is more about diminishing returns — above 2.2 g/kg, additional protein provides little extra benefit for muscle growth.",
        },
        {
          question: "Is protein timing important or does only total daily intake matter?",
          answer: "Total daily intake is the most important factor, but distribution matters too. Research shows that spreading protein across 3-5 meals stimulates muscle protein synthesis about 25% more than loading it into 1-2 meals. Consuming 20-40g of protein within 2 hours post-workout and 25-30g at breakfast both have measurable benefits. The 'anabolic window' is real but wider than the old 30-minute myth suggested.",
        },
        {
          question: "Do I need more protein as I get older?",
          answer: "Yes. After age 50-60, the body becomes less efficient at using dietary protein for muscle maintenance — a phenomenon called 'anabolic resistance.' Adults over 65 should aim for at least 1.0-1.2 g/kg per day (vs 0.8 g/kg RDA), and those who exercise regularly may benefit from 1.2-1.6 g/kg. Higher protein intake in older adults is strongly linked to reduced muscle loss, better bone density, and maintained independence.",
        },
        {
          question: "Can I build muscle on a vegan diet?",
          answer: "Absolutely. The key is consuming enough total protein and combining plant sources to get all essential amino acids. Soy, tempeh, seitan, and quinoa are complete proteins. Combining legumes with grains (rice and beans) also provides a complete amino acid profile. Vegans may benefit from aiming at the higher end of protein recommendations (2.0+ g/kg) since plant proteins are generally less digestible than animal proteins. Pea and soy protein supplements can help fill gaps.",
        },
        {
          question: "Should I use protein supplements or just eat whole foods?",
          answer: "Whole foods should always be your primary protein source because they provide additional nutrients, fiber, and satiety that supplements lack. However, supplements like whey, casein, or plant protein powders are convenient for hitting daily targets — especially post-workout or when time is limited. A good rule of thumb is to get no more than 35% of your daily protein from supplements and the rest from real food.",
        },
        {
          question: "How does a calorie deficit affect protein needs?",
          answer: "When you eat fewer calories than you burn, your body is more likely to break down muscle tissue for energy. Higher protein intake during a deficit protects your lean mass. Research recommends 1.8-2.7 g/kg for active individuals in a calorie deficit — significantly higher than maintenance levels. The leaner you are and the more aggressively you cut, the more protein you need to preserve muscle.",
        },
        {
          question: "Do women need less protein than men?",
          answer: "Women need less total grams because they typically weigh less, but the protein-per-kilogram recommendations are the same regardless of gender. A 140 lb woman building muscle needs the same 1.6-2.2 g/kg ratio as a 200 lb man — the absolute gram amount is just proportionally lower. Pregnant and breastfeeding women need additional protein: +10g in the 2nd trimester, +31g in the 3rd trimester, and +19g during the first 6 months of lactation.",
        },
      ],

      // ─────────────────────────────────────────────────────────────
      // STANDARD SECTIONS
      // ─────────────────────────────────────────────────────────────
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
        calculate: "Calculate Protein",
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
        mobileResults: "Protein results",
        closeModal: "Close",
        openMenu: "Menu",
      },
      sources: { title: "Sources & References" },
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════════
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
      max: 90,
      step: 1,
      suffix: "years",
    },
    {
      id: "bodyFatPercent",
      type: "number",
      defaultValue: null,
      placeholder: "20",
      min: 3,
      max: 60,
      step: 0.5,
      suffix: "%",
    },
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
    {
      id: "goal",
      type: "select",
      defaultValue: "muscle",
      options: [
        { value: "muscle" },
        { value: "loss" },
        { value: "maintain" },
        { value: "recomp" },
      ],
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
        { value: "extraActive" },
      ],
    },
    {
      id: "trainingType",
      type: "select",
      defaultValue: "strength",
      width: "half",
      options: [
        { value: "strength" },
        { value: "cardio" },
        { value: "hiit" },
        { value: "mixed" },
        { value: "none" },
      ],
    },
    {
      id: "dietPreference",
      type: "select",
      defaultValue: "omnivore",
      width: "half",
      options: [
        { value: "omnivore" },
        { value: "vegetarian" },
        { value: "vegan" },
      ],
    },
    {
      id: "mealsPerDay",
      type: "number",
      defaultValue: 4,
      min: 2,
      max: 7,
      step: 1,
      width: "half",
    },
    {
      id: "pregnancyStatus",
      type: "select",
      defaultValue: "none",
      width: "half",
      showWhen: { field: "gender", value: "female" },
      options: [
        { value: "none" },
        { value: "trimester1" },
        { value: "trimester2" },
        { value: "trimester3" },
        { value: "lactating" },
      ],
    },
  ],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════════
  // RESULTS (NEW: Added macro split results)
  // ═══════════════════════════════════════════════════════════════════
  results: [
    { id: "dailyProtein", type: "primary", format: "text" },
    { id: "perMealProtein", type: "secondary", format: "text" },
    { id: "proteinPerKg", type: "secondary", format: "text" },
    { id: "caloriesFromProtein", type: "secondary", format: "text" },
    { id: "percentOfCalories", type: "secondary", format: "text" },
    { id: "postWorkoutDose", type: "secondary", format: "text" },
    { id: "supplementMax", type: "secondary", format: "text" },
    // NEW: Macro split results
    { id: "suggestedCarbs", type: "secondary", format: "text" },
    { id: "suggestedFats", type: "secondary", format: "text" },
    { id: "macroSplit", type: "secondary", format: "text" },
    { id: "totalCalories", type: "secondary", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // INFO CARDS (NEW: Added macro split card)
  // ═══════════════════════════════════════════════════════════════════
  infoCards: [
    {
      id: "proteinPlan",
      type: "list",
      icon: "🎯",
      items: [
        { label: "Daily Target", valueKey: "dailyProtein" },
        { label: "Per Meal", valueKey: "perMealProtein" },
        { label: "Post-Workout", valueKey: "postWorkoutDose" },
        { label: "Max Supplements", valueKey: "supplementMax" },
      ],
    },
    {
      id: "macroSplit",
      type: "list",
      icon: "📊",
      items: [
        { label: "Protein", valueKey: "dailyProtein" },
        { label: "Carbs", valueKey: "suggestedCarbs" },
        { label: "Fats", valueKey: "suggestedFats" },
        { label: "Macro Split", valueKey: "macroSplit" },
      ],
    },
    {
      id: "tips",
      type: "horizontal",
      icon: "💡",
      itemCount: 4,
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // CHART (NEW: Protein distribution visual)
  // ═══════════════════════════════════════════════════════════════════
  chart: {
    id: "mealDistribution",
    type: "bar",
    xKey: "meal",
    height: 280,
    showGrid: true,
    showLegend: false,
    showTooltip: true,
    yAxisFormat: "number",
    series: [
      { key: "protein", type: "bar", color: "#3b82f6" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // DETAILED TABLE (NEW: High-Protein Foods)
  // ═══════════════════════════════════════════════════════════════════
  detailedTable: {
    id: "proteinFoods",
    buttonLabel: "View High-Protein Foods",
    buttonIcon: "🥩",
    modalTitle: "High-Protein Foods by Diet Type",
    columns: [
      { id: "food", label: "Food", align: "left" },
      { id: "serving", label: "Serving", align: "center" },
      { id: "protein", label: "Protein", align: "right", highlight: true },
      { id: "calories", label: "Calories", align: "right" },
      { id: "diet", label: "Diet Type", align: "center" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // REFERENCE DATA
  // ═══════════════════════════════════════════════════════════════════
  referenceData: [
    {
      id: "proteinByGoal",
      icon: "📋",
      columns: 2,
      itemIds: ["muscle", "loss", "maintain", "recomp", "sedentary", "overweight", "elderly", "pregnancy"],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS (NEW: Added mealPlans)
  // ═══════════════════════════════════════════════════════════════════
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "timing", type: "list", icon: "⏱️", itemCount: 5 },
    { id: "sources", type: "list", icon: "🥩", itemCount: 5 },
    { id: "mealPlans", type: "code-example", icon: "🍽️", columns: 3, exampleCount: 3 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // FAQS
  // ═══════════════════════════════════════════════════════════════════
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

  // ═══════════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════════
  references: [
    {
      authors: "Morton RW, Murphy KT, McKellar SR, et al.",
      year: "2018",
      title: "A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults",
      source: "British Journal of Sports Medicine, 52(6), 376-384",
      url: "https://bjsm.bmj.com/content/52/6/376",
    },
    {
      authors: "Mamerow MM, Mettler JA, English KL, et al.",
      year: "2014",
      title: "Dietary protein distribution positively influences 24-h muscle protein synthesis in healthy adults",
      source: "The Journal of Nutrition, 144(6), 876-880",
      url: "https://academic.oup.com/jn/article/144/6/876/4589943",
    },
    {
      authors: "Schoenfeld BJ, Aragon AA",
      year: "2018",
      title: "How much protein can the body use in a single meal for muscle-building? Implications for daily protein distribution",
      source: "Journal of the International Society of Sports Nutrition, 15(10)",
      url: "https://jissn.biomedcentral.com/articles/10.1186/s12970-018-0215-1",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // ADDITIONAL CONFIG
  // ═══════════════════════════════════════════════════════════════════
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
  },

  relatedCalculators: ["macro", "calorie-deficit", "bmi", "body-fat", "tdee"],

  ads: {
    enableAds: true,
    adSlots: ["top", "sidebar", "bottom"],
  },
};

// ═══════════════════════════════════════════════════════════════════
// CALCULATE FUNCTION (IMPROVED with macro split + chart + table data)
// ═══════════════════════════════════════════════════════════════════

export function calculateProtein(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;

  // ── Translations ──────────────────────────────────────────────────
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read inputs ───────────────────────────────────────────────────
  const gender = values.gender as string;
  const age = values.age as number;
  const goal = values.goal as string;
  const activityLevel = values.activityLevel as string;
  const trainingType = values.trainingType as string;
  const dietPreference = values.dietPreference as string;
  const mealsPerDay = values.mealsPerDay as number;
  const pregnancyStatus = (values.pregnancyStatus as string) || "none";
  const bodyFatInput = values.bodyFatPercent as number | null;

  // ── Validate required fields ──────────────────────────────────────
  if (!gender || !age || !goal || !activityLevel || !mealsPerDay) {
    return {
      values: {},
      formatted: {},
      summary: "",
      isValid: false,
    };
  }

  // ── Get weight and height from unitType fields ────────────────────
  const weight = values.weight as number;
  const height = values.height as number;
  const weightUnit = fieldUnits.weight || "lbs";
  const heightUnit = fieldUnits.height || "ft_in";

  if (!weight || !height) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Convert to base units using Unit Engine (kg, cm) ─────────────
  const weightKg = convertToBase(weight, weightUnit, "weight");
  const heightCm = heightUnit === "ft_in"
    ? height  // Already in cm (base unit from DualNumberInput)
    : convertToBase(height, heightUnit, "height");

  // ── Determine effective weight (lean mass if BF% provided) ────────
  let effectiveKg = weightKg;
  let usingLeanMass = false;

  if (bodyFatInput && bodyFatInput > 0 && bodyFatInput < 60) {
    effectiveKg = weightKg * (1 - bodyFatInput / 100);
    usingLeanMass = true;
  }

  // ── Calculate TDEE (Mifflin-St Jeor) ─────────────────────────────
  let bmr: number;
  if (gender === "male") {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }

  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
    extraActive: 2.1,
  };

  const tdee = Math.round(bmr * (activityMultipliers[activityLevel] || 1.55));

  // ── Protein ratio (g/kg) based on goal ────────────────────────────
  const goalRanges: Record<string, { low: number; high: number }> = {
    muscle: { low: 1.6, high: 2.2 },
    loss: { low: 1.8, high: 2.7 },
    maintain: { low: 1.2, high: 1.6 },
    recomp: { low: 1.6, high: 2.2 },
  };

  let { low, high } = goalRanges[goal] || goalRanges.maintain;

  // ── Activity level adjustment ─────────────────────────────────────
  const activityAdjust: Record<string, number> = {
    sedentary: -0.2,
    light: -0.1,
    moderate: 0,
    active: 0.1,
    veryActive: 0.2,
    extraActive: 0.3,
  };

  const actAdj = activityAdjust[activityLevel] || 0;
  low += actAdj;
  high += actAdj;

  // ── Training type adjustment ──────────────────────────────────────
  const trainingAdjust: Record<string, number> = {
    strength: 0.1,
    hiit: 0.05,
    mixed: 0.05,
    cardio: 0,
    none: -0.1,
  };

  const trainAdj = trainingAdjust[trainingType] || 0;
  low += trainAdj;
  high += trainAdj;

  // ── Age adjustment ────────────────────────────────────────────────
  if (age >= 65) {
    low = Math.max(low, 1.0);
    high = Math.max(high, 1.2);
    low += 0.1;
    high += 0.1;
  } else if (age >= 50) {
    low += 0.05;
    high += 0.05;
  }

  // ── Lean mass adjustment (if using BF%) ───────────────────────────
  if (usingLeanMass) {
    low *= 1.15;
    high *= 1.15;
  }

  // ── Clamp ratios ──────────────────────────────────────────────────
  low = Math.max(0.8, Math.round(low * 10) / 10);
  high = Math.max(low + 0.2, Math.round(high * 10) / 10);

  // ── Calculate daily protein ───────────────────────────────────────
  const baseWeight = usingLeanMass ? effectiveKg : weightKg;
  const dailyLow = Math.round(baseWeight * low);
  const dailyHigh = Math.round(baseWeight * high);
  const dailyMid = Math.round((dailyLow + dailyHigh) / 2);

  // ── Pregnancy / Lactation addition ────────────────────────────────
  let pregnancyAddition = 0;
  if (gender === "female" && pregnancyStatus !== "none") {
    const additions: Record<string, number> = {
      trimester1: 1,
      trimester2: 10,
      trimester3: 31,
      lactating: 19,
    };
    pregnancyAddition = additions[pregnancyStatus] || 0;
  }

  const finalDailyLow = dailyLow + pregnancyAddition;
  const finalDailyHigh = dailyHigh + pregnancyAddition;
  const finalDailyMid = dailyMid + pregnancyAddition;

  // ── Per-meal distribution ─────────────────────────────────────────
  const perMealLow = Math.round(finalDailyLow / mealsPerDay);
  const perMealHigh = Math.round(finalDailyHigh / mealsPerDay);
  const perMealMid = Math.round((perMealLow + perMealHigh) / 2);

  // ── Protein per kg ────────────────────────────────────────────────
  const proteinPerKg = Math.round((finalDailyMid / weightKg) * 10) / 10;

  // ── Calories from protein (4 cal/g) ───────────────────────────────
  const calLow = finalDailyLow * 4;
  const calHigh = finalDailyHigh * 4;
  const calMid = Math.round((calLow + calHigh) / 2);

  // ── Percent of TDEE ───────────────────────────────────────────────
  const pctLow = Math.round((calLow / tdee) * 100);
  const pctHigh = Math.round((calHigh / tdee) * 100);
  const pctMid = Math.round((pctLow + pctHigh) / 2);

  // ── Post-workout dose ─────────────────────────────────────────────
  const postWorkout = Math.min(40, Math.max(20, Math.round(finalDailyMid * 0.2)));

  // ── Supplement max (35% of daily) ─────────────────────────────────
  const suppMax = Math.round(finalDailyMid * 0.35);

  // ══════════════════════════════════════════════════════════════════
  // NEW: MACRO SPLIT CALCULATION
  // ══════════════════════════════════════════════════════════════════
  let proteinPercent = 0;
  let carbsPercent = 0;
  let fatsPercent = 0;

  if (goal === "muscle") {
    // Bulking: 25% P, 50% C, 25% F
    proteinPercent = 25;
    carbsPercent = 50;
    fatsPercent = 25;
  } else if (goal === "loss") {
    // Cutting: 35% P, 35% C, 30% F
    proteinPercent = 35;
    carbsPercent = 35;
    fatsPercent = 30;
  } else if (goal === "recomp") {
    // Recomp: 30% P, 40% C, 30% F
    proteinPercent = 30;
    carbsPercent = 40;
    fatsPercent = 30;
  } else {
    // Maintenance: 25% P, 45% C, 30% F
    proteinPercent = 25;
    carbsPercent = 45;
    fatsPercent = 30;
  }

  const proteinCal = calMid;
  const totalCal = Math.round(proteinCal / (proteinPercent / 100));
  const carbsCal = Math.round(totalCal * (carbsPercent / 100));
  const fatsCal = Math.round(totalCal * (fatsPercent / 100));
  const carbsGrams = Math.round(carbsCal / 4);
  const fatsGrams = Math.round(fatsCal / 9);

  // ══════════════════════════════════════════════════════════════════
  // NEW: CHART DATA (Protein distribution across meals)
  // ══════════════════════════════════════════════════════════════════
  const chartData: Array<Record<string, unknown>> = [];
  const basePerMeal = Math.round(finalDailyMid / mealsPerDay);

  for (let i = 1; i <= mealsPerDay; i++) {
    let mealProtein = basePerMeal;
    let mealLabel = `Meal ${i}`;

    // If training and mid-meal, slightly increase for post-workout
    if (trainingType !== "none" && i === Math.ceil(mealsPerDay / 2)) {
      mealProtein = Math.round(basePerMeal * 1.15);
      mealLabel = "Post-Workout";
    }

    chartData.push({
      meal: mealLabel,
      protein: mealProtein,
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // NEW: HIGH-PROTEIN FOODS TABLE (filtered by diet preference)
  // ══════════════════════════════════════════════════════════════════
  const allProteinFoods = [
    // MEAT (Omnivore)
    { food: "Chicken Breast", serving: "100g", protein: "31g", calories: "165", diet: "Omnivore" },
    { food: "Turkey Breast", serving: "100g", protein: "29g", calories: "135", diet: "Omnivore" },
    { food: "Lean Beef (Sirloin)", serving: "100g", protein: "26g", calories: "250", diet: "Omnivore" },
    { food: "Pork Tenderloin", serving: "100g", protein: "26g", calories: "143", diet: "Omnivore" },
    { food: "Salmon", serving: "100g", protein: "25g", calories: "206", diet: "Omnivore" },
    { food: "Tuna (canned)", serving: "100g", protein: "26g", calories: "116", diet: "Omnivore" },
    { food: "Cod", serving: "100g", protein: "19g", calories: "82", diet: "Omnivore" },
    { food: "Shrimp", serving: "100g", protein: "24g", calories: "99", diet: "Omnivore" },
    { food: "Bison", serving: "100g", protein: "24g", calories: "146", diet: "Omnivore" },
    
    // DAIRY (Vegetarian + Omnivore)
    { food: "Greek Yogurt (nonfat)", serving: "100g", protein: "10g", calories: "59", diet: "Vegetarian" },
    { food: "Cottage Cheese (low-fat)", serving: "100g", protein: "11g", calories: "98", diet: "Vegetarian" },
    { food: "Eggs (whole)", serving: "2 large", protein: "13g", calories: "143", diet: "Vegetarian" },
    { food: "Egg Whites", serving: "100g", protein: "11g", calories: "52", diet: "Vegetarian" },
    { food: "Whey Protein Powder", serving: "1 scoop", protein: "25g", calories: "120", diet: "Vegetarian" },
    { food: "Casein Protein Powder", serving: "1 scoop", protein: "24g", calories: "120", diet: "Vegetarian" },
    { food: "Mozzarella (part-skim)", serving: "100g", protein: "24g", calories: "254", diet: "Vegetarian" },
    { food: "Cheddar Cheese", serving: "100g", protein: "25g", calories: "403", diet: "Vegetarian" },
    { food: "Milk (skim)", serving: "1 cup", protein: "8g", calories: "83", diet: "Vegetarian" },
    
    // PLANT (Vegan + All)
    { food: "Tofu (firm)", serving: "100g", protein: "17g", calories: "144", diet: "Vegan" },
    { food: "Tempeh", serving: "100g", protein: "19g", calories: "193", diet: "Vegan" },
    { food: "Seitan", serving: "100g", protein: "25g", calories: "370", diet: "Vegan" },
    { food: "Edamame", serving: "100g", protein: "11g", calories: "122", diet: "Vegan" },
    { food: "Lentils (cooked)", serving: "100g", protein: "9g", calories: "116", diet: "Vegan" },
    { food: "Chickpeas (cooked)", serving: "100g", protein: "9g", calories: "164", diet: "Vegan" },
    { food: "Black Beans (cooked)", serving: "100g", protein: "9g", calories: "132", diet: "Vegan" },
    { food: "Quinoa (cooked)", serving: "100g", protein: "4g", calories: "120", diet: "Vegan" },
    { food: "Pea Protein Powder", serving: "1 scoop", protein: "24g", calories: "120", diet: "Vegan" },
    { food: "Soy Protein Powder", serving: "1 scoop", protein: "25g", calories: "120", diet: "Vegan" },
    { food: "Almonds", serving: "30g", protein: "6g", calories: "164", diet: "Vegan" },
    { food: "Peanut Butter", serving: "2 tbsp", protein: "8g", calories: "188", diet: "Vegan" },
    { food: "Hemp Seeds", serving: "30g", protein: "10g", calories: "166", diet: "Vegan" },
    { food: "Chia Seeds", serving: "30g", protein: "5g", calories: "146", diet: "Vegan" },
    { food: "Spirulina", serving: "1 tbsp", protein: "4g", calories: "20", diet: "Vegan" },
  ];

  // Filter by user's diet preference
  const filteredFoods = allProteinFoods.filter(f => {
    if (dietPreference === "vegan") return f.diet === "Vegan";
    if (dietPreference === "vegetarian") return f.diet !== "Omnivore";
    return true; // omnivore sees all
  });

  // ── Translated units ──────────────────────────────────────────────
  const gDay = v["g/day"] || "g/day";
  const gMeal = v["g/meal"] || "g/meal";
  const gKg = v["g/kg"] || "g/kg";
  const cal = v["cal"] || "cal";
  const g = v["g"] || "g";

  // ── Build summary ─────────────────────────────────────────────────
  const goalMap: Record<string, string> = {
    muscle: "muscle gain",
    loss: "fat loss",
    maintain: "maintenance",
    recomp: "body recomposition",
  };
  const goalText = goalMap[goal] || goal;

  const summaryTemplate = f.summary || "You should eat {dailyProtein} of protein per day ({proteinPerKg}). That's about {perMealProtein} per meal across {meals} meals. Your suggested macro split is {macroSplit} based on your {goal} goal.";
  const summary = summaryTemplate
    .replace("{dailyProtein}", `${finalDailyLow}–${finalDailyHigh} ${g}`)
    .replace("{proteinPerKg}", `${low}–${high} ${gKg}`)
    .replace("{perMealProtein}", `${perMealLow}–${perMealHigh} ${g}`)
    .replace("{meals}", String(mealsPerDay))
    .replace("{macroSplit}", `${proteinPercent}P / ${carbsPercent}C / ${fatsPercent}F`)
    .replace("{goal}", goalText);

  return {
    values: {
      dailyProtein: finalDailyMid,
      dailyProteinLow: finalDailyLow,
      dailyProteinHigh: finalDailyHigh,
      perMealProtein: perMealMid,
      proteinPerKg: proteinPerKg,
      caloriesFromProtein: calMid,
      percentOfCalories: pctMid,
      postWorkoutDose: postWorkout,
      supplementMax: suppMax,
      // NEW: Macro split values
      suggestedCarbs: carbsGrams,
      suggestedFats: fatsGrams,
      macroSplit: `${proteinPercent}P / ${carbsPercent}C / ${fatsPercent}F`,
      totalCalories: totalCal,
    },
    formatted: {
      dailyProtein: `${finalDailyLow}–${finalDailyHigh} ${gDay}`,
      perMealProtein: `${perMealLow}–${perMealHigh} ${gMeal}`,
      proteinPerKg: `${low}–${high} ${gKg}`,
      caloriesFromProtein: `${calLow.toLocaleString()}–${calHigh.toLocaleString()} ${cal}`,
      percentOfCalories: `${pctLow}–${pctHigh}%`,
      postWorkoutDose: `${postWorkout} ${g}`,
      supplementMax: `${suppMax} ${g} ${v["max"] || "max"}`,
      // NEW: Macro split formatted
      suggestedCarbs: `${carbsGrams}${g} (${carbsPercent}%)`,
      suggestedFats: `${fatsGrams}${g} (${fatsPercent}%)`,
      macroSplit: `${proteinPercent}${v["P"] || "P"} / ${carbsPercent}${v["C"] || "C"} / ${fatsPercent}${v["F"] || "F"}`,
      totalCalories: `${totalCal.toLocaleString()} ${cal}`,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,           // Chart: Protein distribution
      tableData: filteredFoods,  // DetailedTable: High-protein foods
    },
  };
}

export default proteinCalculatorConfig;
