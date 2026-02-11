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
    es: {
      "name": "Calculadora de Proteínas",
      "slug": "calculadora-proteinas",
      "subtitle": "Calcula tu ingesta diaria óptima de proteínas, obtén planes de comidas personalizados y descubre los mejores alimentos ricos en proteínas para tu dieta",
      "breadcrumb": "Proteínas",
      "seo": {
        "title": "Calculadora de Proteínas - Ingesta Diaria, Planes de Comidas y Guía de Alimentos",
        "description": "Calcula tu ingesta diaria óptima de proteínas con distribución personalizada de macros, planes de comidas de ejemplo y una base de datos de más de 30 alimentos ricos en proteínas filtrados por tipo de dieta. Herramienta gratuita con recomendaciones basadas en ciencia.",
        "shortDescription": "Calcula necesidades de proteínas con planes de comidas y sugerencias de alimentos",
        "keywords": [
          "calculadora de proteínas",
          "ingesta diaria de proteínas",
          "alimentos ricos en proteínas",
          "plan de comidas proteínas",
          "calculadora macros",
          "proteínas por día",
          "proteínas para ganar músculo",
          "proteínas para perder peso"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "gender": {
          "label": "Género",
          "helpText": "Afecta la tasa metabólica basal y el cálculo de proteínas",
          "options": {
            "male": "Masculino",
            "female": "Femenino"
          }
        },
        "age": {
          "label": "Edad",
          "helpText": "Las necesidades de proteínas aumentan después de los 65 debido a la reducción de la eficiencia de síntesis"
        },
        "weight": {
          "label": "Peso",
          "helpText": "Peso corporal actual"
        },
        "height": {
          "label": "Altura",
          "helpText": "Se usa para estimar el gasto energético diario total"
        },
        "bodyFatPercent": {
          "label": "% Grasa Corporal (opcional)",
          "helpText": "Si se conoce, mejora la precisión usando masa magra en lugar del peso total",
          "placeholder": "ej. 20"
        },
        "goal": {
          "label": "Objetivo Principal",
          "helpText": "Tu objetivo determina la proporción proteína-peso corporal y la distribución de macros",
          "options": {
            "muscle": "Ganar Músculo",
            "loss": "Perder Grasa, Mantener Músculo",
            "maintain": "Mantener Peso y Salud",
            "recomp": "Recomposición Corporal (perder grasa + ganar músculo)"
          }
        },
        "activityLevel": {
          "label": "Nivel de Actividad",
          "helpText": "¿Qué tan activo eres en una semana típica?",
          "options": {
            "sedentary": "Sedentario (trabajo de oficina, poco ejercicio)",
            "light": "Ligero (1-2 entrenamientos/semana)",
            "moderate": "Moderado (3-4 entrenamientos/semana)",
            "active": "Activo (5-6 entrenamientos/semana)",
            "veryActive": "Muy Activo (entrenamiento intenso diario)",
            "extraActive": "Extra Activo (2x/día o trabajo físico + entrenamiento)"
          }
        },
        "trainingType": {
          "label": "Tipo de Entrenamiento",
          "helpText": "El entrenamiento de resistencia aumenta las necesidades de proteínas más que el cardio",
          "options": {
            "strength": "Fuerza / Hipertrofia",
            "cardio": "Cardio / Resistencia",
            "hiit": "HIIT / CrossFit",
            "mixed": "Mixto (fuerza + cardio)",
            "none": "Sin entrenamiento regular"
          }
        },
        "dietPreference": {
          "label": "Preferencia Dietética",
          "helpText": "Afecta las recomendaciones de fuentes de proteínas y planes de comidas",
          "options": {
            "omnivore": "Omnívoro (come de todo)",
            "vegetarian": "Vegetariano (sin carne, huevos/lácteos permitidos)",
            "vegan": "Vegano (solo plantas)"
          }
        },
        "mealsPerDay": {
          "label": "Comidas por Día",
          "helpText": "Se usa para calcular la distribución de proteínas por comida"
        },
        "pregnancyStatus": {
          "label": "Embarazo / Lactancia",
          "helpText": "El embarazo y la lactancia aumentan las necesidades de proteínas",
          "options": {
            "none": "No aplica",
            "trimester1": "Embarazada — 1er trimestre",
            "trimester2": "Embarazada — 2do trimestre",
            "trimester3": "Embarazada — 3er trimestre",
            "lactating": "Lactancia"
          }
        }
      },
      "results": {
        "dailyProtein": {
          "label": "Objetivo Diario de Proteínas"
        },
        "perMealProtein": {
          "label": "Proteínas por Comida"
        },
        "proteinPerKg": {
          "label": "Proteínas por kg Peso Corporal"
        },
        "caloriesFromProtein": {
          "label": "Calorías de Proteínas"
        },
        "percentOfCalories": {
          "label": "% de Calorías Diarias"
        },
        "postWorkoutDose": {
          "label": "Dosis Post-Entrenamiento"
        },
        "supplementMax": {
          "label": "Máximo de Suplementos"
        },
        "suggestedCarbs": {
          "label": "Carbohidratos Sugeridos"
        },
        "suggestedFats": {
          "label": "Grasas Sugeridas"
        },
        "macroSplit": {
          "label": "Distribución de Macros"
        },
        "totalCalories": {
          "label": "TDEE Estimado"
        }
      },
      "presets": {
        "officeWorker": {
          "label": "Trabajador de Oficina",
          "description": "Estilo de vida sedentario, mantener salud"
        },
        "weekendGym": {
          "label": "Gimnasio de Fin de Semana",
          "description": "Entrenamiento moderado, ganar músculo"
        },
        "athlete": {
          "label": "Atleta Serio",
          "description": "Entrenamiento diario, maximizar ganancias"
        },
        "cuttingPhase": {
          "label": "Fase de Definición",
          "description": "Entrenamiento activo, perder grasa, proteger músculo"
        },
        "veganAthlete": {
          "label": "Atleta Vegano",
          "description": "Basado en plantas, ganar músculo"
        }
      },
      "values": {
        "g/day": "g/día",
        "g/meal": "g/comida",
        "g/kg": "g/kg",
        "g": "g",
        "cal": "cal",
        "max": "máx",
        "P": "P",
        "C": "C",
        "F": "G"
      },
      "formats": {
        "summary": "Deberías consumir {dailyProtein} de proteínas por día ({proteinPerKg}). Eso son aproximadamente {perMealProtein} por comida a lo largo de {meals} comidas. Tu distribución sugerida de macros es {macroSplit} basada en tu objetivo de {goal}."
      },
      "infoCards": {
        "proteinPlan": {
          "title": "Tu Plan de Proteínas",
          "items": {
            "0": "Objetivo Diario",
            "1": "Por Comida",
            "2": "Post-Entrenamiento",
            "3": "Máx Suplementos"
          }
        },
        "macroSplit": {
          "title": "Plan Completo de Macros",
          "items": {
            "0": "Proteínas",
            "1": "Carbohidratos",
            "2": "Grasas",
            "3": "Distribución de Macros"
          }
        },
        "tips": {
          "title": "Consejos de Optimización de Proteínas",
          "items": [
            "Distribuye las proteínas uniformemente en las comidas — 20-40g por ingesta maximiza la síntesis de proteínas musculares",
            "Prioriza proteínas completas: huevos, pollo, pescado, lácteos, soja y quinoa contienen los 9 aminoácidos esenciales",
            "Come 25-30g de proteína en el desayuno para romper el catabolismo muscular nocturno y reducir antojos",
            "Apunta primero a fuentes de alimentos enteros — limita los suplementos a no más del 35% del total diario de proteínas"
          ]
        }
      },
      "detailedTable": {
        "proteinFoods": {
          "button": "Ver Alimentos Ricos en Proteínas",
          "title": "Alimentos Ricos en Proteínas por Tipo de Dieta",
          "columns": {
            "food": "Alimento",
            "serving": "Porción",
            "protein": "Proteína",
            "calories": "Calorías",
            "diet": "Tipo de Dieta"
          }
        }
      },
      "referenceData": {
        "proteinByGoal": {
          "title": "Recomendaciones de Proteínas por Objetivo",
          "items": {
            "muscle": {
              "label": "Ganar Músculo",
              "value": "1.6 – 2.2 g/kg/día"
            },
            "loss": {
              "label": "Pérdida de Grasa (preservar músculo)",
              "value": "1.8 – 2.7 g/kg/día"
            },
            "maintain": {
              "label": "Mantener / Salud General",
              "value": "1.2 – 1.6 g/kg/día"
            },
            "recomp": {
              "label": "Recomposición Corporal",
              "value": "1.6 – 2.2 g/kg/día"
            },
            "sedentary": {
              "label": "Sedentario (mínimo RDA)",
              "value": "0.8 g/kg/día"
            },
            "overweight": {
              "label": "Pérdida de Grasa con Sobrepeso",
              "value": "1.2 – 1.5 g/kg/día"
            },
            "elderly": {
              "label": "Adultos 65+",
              "value": "1.0 – 1.2 g/kg/día"
            },
            "pregnancy": {
              "label": "Embarazo / Lactancia",
              "value": "1.7+ g/kg/día"
            }
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Por Qué Importa la Ingesta de Proteínas",
          "content": "La proteína es uno de los tres macronutrientes que tu cuerpo necesita diariamente, junto con los carbohidratos y las grasas. A diferencia de los otros dos, la proteína es el bloque de construcción principal para músculos, huesos, piel, enzimas y hormonas. Tu cuerpo no puede almacenar el exceso de proteínas como almacena la grasa o el glucógeno, por lo que necesitas una ingesta diaria constante. Cuando comes proteína, tu cuerpo la descompone en aminoácidos — 9 de los cuales son esenciales, lo que significa que solo puedes obtenerlos de los alimentos. Estos aminoácidos impulsan la síntesis de proteínas musculares (el proceso de construcción y reparación del tejido muscular), apoyan la función inmune y regulan el metabolismo. La cantidad dietética recomendada (RDA) de 0.8 g/kg es un mínimo para prevenir deficiencias en adultos sedentarios — no un objetivo óptimo. La investigación muestra consistentemente que los individuos activos, aquellos que intentan perder grasa, adultos mayores y mujeres embarazadas se benefician de ingestas significativamente más altas, típicamente 1.2 a 2.2 g/kg por día dependiendo de su objetivo."
        },
        "howItWorks": {
          "title": "Cómo Funciona Esta Calculadora",
          "content": "Esta calculadora determina tu ingesta óptima de proteínas en tres pasos. Primero, estima tu gasto energético diario total (TDEE) usando la ecuación Mifflin-St Jeor para la tasa metabólica basal, ajustada por tu nivel de actividad. Segundo, selecciona una proporción proteína-por-kilogramo basada en tu objetivo principal — ganancia muscular, pérdida de grasa, mantenimiento o recomposición corporal — con ajustes adicionales para tipo de entrenamiento, edad y composición corporal. Tercero, distribuye tu objetivo diario a través de tus comidas y proporciona una distribución completa de macros (proteínas, carbohidratos, grasas) optimizada para tu objetivo. Si proporcionas tu porcentaje de grasa corporal, la calculadora usa la masa corporal magra en lugar del peso total para mejorar la precisión."
        },
        "timing": {
          "title": "Timing y Distribución de Proteínas",
          "items": [
            {
              "text": "Distribuye las proteínas uniformemente en 3-5 comidas — esto estimula la síntesis de proteínas musculares más efectivamente que cargar una comida",
              "type": "info"
            },
            {
              "text": "Consume 25-30g de proteína de alta calidad en el desayuno para romper el estado catabólico nocturno y reducir el hambre durante el día",
              "type": "info"
            },
            {
              "text": "Come 20-40g de proteína dentro de las 2 horas después del entrenamiento de resistencia — la 'ventana anabólica' es más amplia de lo que se pensaba pero sigue siendo importante",
              "type": "info"
            },
            {
              "text": "Considera 20-30g de proteína de digestión lenta (caseína, requesón) antes de dormir para apoyar la síntesis de proteínas musculares nocturna",
              "type": "info"
            },
            {
              "text": "No hay límite superior práctico para la absorción de proteínas por comida — investigaciones recientes muestran que 100g se utilizan durante 12 horas — pero la distribución aún optimiza la SPM",
              "type": "warning"
            }
          ]
        },
        "sources": {
          "title": "Mejores Fuentes de Proteínas por Tipo de Dieta",
          "items": [
            {
              "text": "Omnívoro: pechuga de pollo (31g/100g), huevos (13g/100g), salmón (25g/100g), yogur griego (10g/100g), carne magra (26g/100g)",
              "type": "info"
            },
            {
              "text": "Vegetariano: huevos, yogur griego, requesón, proteína de suero, tempeh (19g/100g), lentejas (9g/100g)",
              "type": "info"
            },
            {
              "text": "Vegano: tofu (17g/100g), tempeh (19g/100g), lentejas, garbanzos (9g/100g), seitán (25g/100g), proteína de soja, proteína de guisante",
              "type": "info"
            },
            {
              "text": "Las proteínas completas contienen los 9 aminoácidos esenciales — la mayoría de fuentes animales son completas; las fuentes vegetales a menudo necesitan combinarse",
              "type": "warning"
            },
            {
              "text": "La leucina es el aminoácido clave para activar la síntesis de proteínas musculares — apunta a 2.5-3g por comida (encontrado en ~25-30g de proteína de calidad)",
              "type": "info"
            }
          ]
        },
        "mealPlans": {
          "title": "Planes de Comidas de Ejemplo",
          "description": "Ejemplos del mundo real mostrando cómo alcanzar tu objetivo diario de proteínas en diferentes tipos de dieta",
          "examples": [
            {
              "title": "Omnívoro - 150g/día",
              "steps": [
                "Desayuno: 3 huevos + 2 tostadas → 19g proteína",
                "Snack: Yogur griego 200g → 20g proteína",
                "Almuerzo: Pechuga de pollo 150g + arroz → 47g proteína",
                "Snack: Batido de proteínas 1 scoop → 25g proteína",
                "Cena: Salmón 150g + verduras → 38g proteína"
              ],
              "result": "Total: 149g proteína, ~1,950 calorías"
            },
            {
              "title": "Vegetariano - 150g/día",
              "steps": [
                "Desayuno: Avena + proteína de suero → 30g proteína",
                "Snack: Requesón 150g → 17g proteína",
                "Almuerzo: Paneer tikka 150g + naan → 35g proteína",
                "Snack: Almendras 30g + yogur griego → 16g proteína",
                "Cena: Dal de lentejas 200g + quinoa → 25g proteína",
                "Antes de dormir: Batido de caseína → 27g proteína"
              ],
              "result": "Total: 150g proteína, ~2,000 calorías"
            },
            {
              "title": "Vegano - 150g/día",
              "steps": [
                "Desayuno: Batido (proteína de guisante, plátano, mantequilla de cacahuate) → 32g proteína",
                "Snack: Edamame 150g → 17g proteína",
                "Almuerzo: Salteado de tempeh 200g + arroz → 38g proteína",
                "Snack: Hummus + verduras + pan → 12g proteína",
                "Cena: Seitán 150g + quinoa 100g → 42g proteína",
                "Snack: Leche de soja 250ml → 9g proteína"
              ],
              "result": "Total: 150g proteína, ~2,100 calorías"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo de Proteínas",
          "description": "Ve cómo los objetivos cambian tu meta diaria de proteínas",
          "examples": [
            {
              "title": "Hombre 180 lb — Ganancia Muscular",
              "steps": [
                "Peso: 180 lbs = 81.6 kg",
                "Objetivo: Ganar Músculo → 1.6-2.2 g/kg",
                "Actividad: Moderada (3-4x/semana) → usar rango medio",
                "Entrenamiento: Fuerza → ligero aumento al rango superior",
                "Objetivo diario: 81.6 × 1.8-2.2 = 147-180 g/día",
                "4 comidas/día → 37-45 g/comida"
              ],
              "result": "Objetivo: 147-180 g/día | 37-45 g/comida | 588-720 cal de proteína"
            },
            {
              "title": "Mujer 140 lb — Pérdida de Grasa",
              "steps": [
                "Peso: 140 lbs = 63.5 kg",
                "Objetivo: Perder Grasa → 1.8-2.7 g/kg",
                "Actividad: Activa (5-6x/semana) → usar rango medio-superior",
                "Entrenamiento: Mixto → rango estándar",
                "Objetivo diario: 63.5 × 2.0-2.4 = 127-152 g/día",
                "3 comidas/día → 42-51 g/comida"
              ],
              "result": "Objetivo: 127-152 g/día | 42-51 g/comida | 508-610 cal de proteína"
            }
          ]
        }
      },
      "chart": {
        "title": "Distribución de Proteínas en las Comidas",
        "xLabel": "Comida",
        "yLabel": "Proteína (g)",
        "series": {
          "protein": "Proteína por Comida"
        }
      },
      "faqs": [
        {
          "question": "¿Cuánta proteína necesito realmente por día?",
          "answer": "Depende de tu objetivo y nivel de actividad. La RDA de 0.8 g/kg es un mínimo absoluto para prevenir deficiencias — la mayoría de personas activas necesitan significativamente más. Para ganancia muscular, la investigación apoya 1.6-2.2 g/kg por día. Para pérdida de grasa mientras preservas músculo, 1.8-2.7 g/kg. Para mantenimiento de salud general con actividad ligera, 1.2-1.6 g/kg. Una persona de 180 lb (82 kg) ganando músculo necesitaría aproximadamente 130-180 gramos por día."
        },
        {
          "question": "¿Puedo comer demasiada proteína?",
          "answer": "Para individuos sanos, no hay límite superior dañino conocido para la ingesta de proteínas. La investigación muestra que incluso 2-3x la RDA no tiene efectos negativos en la función renal, salud ósea o función hepática en adultos sanos. Sin embargo, comer proteína excesiva a expensas de otros macronutrientes puede llevar a una dieta desbalanceada. La preocupación práctica es más sobre rendimientos decrecientes — por encima de 2.2 g/kg, la proteína adicional proporciona poco beneficio extra para el crecimiento muscular."
        },
        {
          "question": "¿Es importante el timing de proteínas o solo importa la ingesta diaria total?",
          "answer": "La ingesta diaria total es el factor más importante, pero la distribución también importa. La investigación muestra que distribuir proteínas en 3-5 comidas estimula la síntesis de proteínas musculares aproximadamente 25% más que cargarla en 1-2 comidas. Consumir 20-40g de proteína dentro de las 2 horas post-entrenamiento y 25-30g en el desayuno ambos tienen beneficios medibles. La 'ventana anabólica' es real pero más amplia que el viejo mito de 30 minutos sugería."
        },
        {
          "question": "¿Necesito más proteína a medida que envejezco?",
          "answer": "Sí. Después de los 50-60 años, el cuerpo se vuelve menos eficiente usando proteínas dietéticas para el mantenimiento muscular — un fenómeno llamado 'resistencia anabólica.' Los adultos mayores de 65 deberían apuntar a al menos 1.0-1.2 g/kg por día (vs 0.8 g/kg RDA), y aquellos que ejercitan regularmente pueden beneficiarse de 1.2-1.6 g/kg. La ingesta más alta de proteínas en adultos mayores está fuertemente vinculada a menor pérdida muscular, mejor densidad ósea y mantenimiento de la independencia."
        },
        {
          "question": "¿Puedo ganar músculo con una dieta vegana?",
          "answer": "Absolutamente. La clave es consumir suficiente proteína total y combinar fuentes vegetales para obtener todos los aminoácidos esenciales. Soja, tempeh, seitán y quinoa son proteínas completas. Combinar legumbres con granos (arroz y frijoles) también proporciona un perfil completo de aminoácidos. Los veganos pueden beneficiarse de apuntar al extremo superior de las recomendaciones de proteína (2.0+ g/kg) ya que las proteínas vegetales son generalmente menos digeribles que las animales. Los suplementos de proteína de guisante y soja pueden ayudar a llenar vacíos."
        },
        {
          "question": "¿Debo usar suplementos de proteína o solo comer alimentos enteros?",
          "answer": "Los alimentos enteros siempre deberían ser tu fuente primaria de proteína porque proporcionan nutrientes adicionales, fibra y saciedad que los suplementos carecen. Sin embargo, suplementos como suero, caseína o proteínas vegetales en polvo son convenientes para alcanzar objetivos diarios — especialmente post-entrenamiento o cuando el tiempo es limitado. Una buena regla general es obtener no más del 35% de tu proteína diaria de suplementos y el resto de comida real."
        },
        {
          "question": "¿Cómo afecta un déficit calórico las necesidades de proteína?",
          "answer": "Cuando comes menos calorías de las que quemas, tu cuerpo es más propenso a descomponer tejido muscular para energía. Una mayor ingesta de proteínas durante un déficit protege tu masa magra. La investigación recomienda 1.8-2.7 g/kg para individuos activos en déficit calórico — significativamente más alto que los niveles de mantenimiento. Mientras más delgado estés y más agresivamente cortes, más proteína necesitas para preservar músculo."
        },
        {
          "question": "¿Las mujeres necesitan menos proteína que los hombres?",
          "answer": "Las mujeres necesitan menos gramos totales porque típicamente pesan menos, pero las recomendaciones de proteína-por-kilogramo son las mismas sin importar el género. Una mujer de 140 lb ganando músculo necesita la misma proporción de 1.6-2.2 g/kg que un hombre de 200 lb — la cantidad absoluta en gramos es solo proporcionalmente menor. Las mujeres embarazadas y lactantes necesitan proteína adicional: +10g en el 2do trimestre, +31g en el 3er trimestre, y +19g durante los primeros 6 meses de lactancia."
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
      "name": "Calculadora de Proteína",
      "slug": "calculadora-proteina",
      "subtitle": "Calcule sua ingestão ideal diária de proteína, obtenha planos de refeição personalizados e descubra os melhores alimentos ricos em proteína para sua dieta",
      "breadcrumb": "Proteína",
      "seo": {
        "title": "Calculadora de Proteína - Ingestão Diária, Planos de Refeição e Guia Alimentar",
        "description": "Calcule sua ingestão ideal diária de proteína com divisão personalizada de macronutrientes, planos de refeição exemplo e banco de dados com mais de 30 alimentos ricos em proteína filtrados por tipo de dieta. Ferramenta gratuita com recomendações baseadas em ciência.",
        "shortDescription": "Calcule necessidades de proteína com planos de refeição e sugestões alimentares",
        "keywords": [
          "calculadora de proteína",
          "ingestão diária de proteína",
          "alimentos ricos em proteína",
          "plano de refeição proteica",
          "calculadora de macros",
          "proteína por dia",
          "proteína para ganho muscular",
          "proteína para perda de peso"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "gender": {
          "label": "Sexo",
          "helpText": "Afeta a taxa metabólica basal e o cálculo de proteína",
          "options": {
            "male": "Masculino",
            "female": "Feminino"
          }
        },
        "age": {
          "label": "Idade",
          "helpText": "Necessidades de proteína aumentam após 65 anos devido à redução da eficiência de síntese"
        },
        "weight": {
          "label": "Peso",
          "helpText": "Peso corporal atual"
        },
        "height": {
          "label": "Altura",
          "helpText": "Usado para estimar o gasto energético total diário"
        },
        "bodyFatPercent": {
          "label": "% Gordura Corporal (opcional)",
          "helpText": "Se conhecido, melhora a precisão usando massa magra ao invés do peso total",
          "placeholder": "ex. 20"
        },
        "goal": {
          "label": "Objetivo Principal",
          "helpText": "Seu objetivo determina a proporção proteína-peso corporal e divisão de macros",
          "options": {
            "muscle": "Ganhar Músculo",
            "loss": "Perder Gordura, Manter Músculo",
            "maintain": "Manter Peso e Saúde",
            "recomp": "Recomposição Corporal (perder gordura + ganhar músculo)"
          }
        },
        "activityLevel": {
          "label": "Nível de Atividade",
          "helpText": "Quão ativo você é numa semana típica?",
          "options": {
            "sedentary": "Sedentário (trabalho mesa, pouco exercício)",
            "light": "Leve (1-2 treinos/semana)",
            "moderate": "Moderado (3-4 treinos/semana)",
            "active": "Ativo (5-6 treinos/semana)",
            "veryActive": "Muito Ativo (treino intenso diário)",
            "extraActive": "Extra Ativo (2x/dia ou trabalho físico + treino)"
          }
        },
        "trainingType": {
          "label": "Tipo de Treino",
          "helpText": "Treino de resistência aumenta necessidades de proteína mais que cardio",
          "options": {
            "strength": "Força / Hipertrofia",
            "cardio": "Cardio / Resistência",
            "hiit": "HIIT / CrossFit",
            "mixed": "Misto (força + cardio)",
            "none": "Sem treino regular"
          }
        },
        "dietPreference": {
          "label": "Preferência Alimentar",
          "helpText": "Afeta recomendações de fontes proteicas e planos de refeição",
          "options": {
            "omnivore": "Onívoro (come tudo)",
            "vegetarian": "Vegetariano (sem carne, ovos/laticínios OK)",
            "vegan": "Vegano (apenas vegetais)"
          }
        },
        "mealsPerDay": {
          "label": "Refeições Por Dia",
          "helpText": "Usado para calcular distribuição de proteína por refeição"
        },
        "pregnancyStatus": {
          "label": "Gravidez / Lactação",
          "helpText": "Gravidez e amamentação aumentam necessidades de proteína",
          "options": {
            "none": "Não se aplica",
            "trimester1": "Grávida — 1º trimestre",
            "trimester2": "Grávida — 2º trimestre",
            "trimester3": "Grávida — 3º trimestre",
            "lactating": "Amamentando"
          }
        }
      },
      "results": {
        "dailyProtein": {
          "label": "Meta Diária de Proteína"
        },
        "perMealProtein": {
          "label": "Proteína Por Refeição"
        },
        "proteinPerKg": {
          "label": "Proteína Por kg Peso Corporal"
        },
        "caloriesFromProtein": {
          "label": "Calorias da Proteína"
        },
        "percentOfCalories": {
          "label": "% das Calorias Diárias"
        },
        "postWorkoutDose": {
          "label": "Dose Pós-Treino"
        },
        "supplementMax": {
          "label": "Máximo de Suplementos"
        },
        "suggestedCarbs": {
          "label": "Carboidratos Sugeridos"
        },
        "suggestedFats": {
          "label": "Gorduras Sugeridas"
        },
        "macroSplit": {
          "label": "Divisão de Macros"
        },
        "totalCalories": {
          "label": "TDEE Estimado"
        }
      },
      "presets": {
        "officeWorker": {
          "label": "Trabalhador de Escritório",
          "description": "Estilo de vida sedentário, manter saúde"
        },
        "weekendGym": {
          "label": "Academia Fim de Semana",
          "description": "Treino moderado, construindo músculo"
        },
        "athlete": {
          "label": "Atleta Sério",
          "description": "Treino diário, maximizando ganhos"
        },
        "cuttingPhase": {
          "label": "Fase de Cutting",
          "description": "Treino ativo, perdendo gordura, protegendo músculo"
        },
        "veganAthlete": {
          "label": "Atleta Vegano",
          "description": "Baseado em plantas, construção muscular"
        }
      },
      "values": {
        "g/day": "g/dia",
        "g/meal": "g/refeição",
        "g/kg": "g/kg",
        "g": "g",
        "cal": "cal",
        "max": "máx",
        "P": "P",
        "C": "C",
        "F": "G"
      },
      "formats": {
        "summary": "Você deve comer {dailyProtein} de proteína por dia ({proteinPerKg}). Isso são cerca de {perMealProtein} por refeição ao longo de {meals} refeições. Sua divisão de macros sugerida é {macroSplit} baseada no seu objetivo de {goal}."
      },
      "infoCards": {
        "proteinPlan": {
          "title": "Seu Plano de Proteína",
          "items": {
            "0": "Meta Diária",
            "1": "Por Refeição",
            "2": "Pós-Treino",
            "3": "Máx Suplementos"
          }
        },
        "macroSplit": {
          "title": "Plano Completo de Macros",
          "items": {
            "0": "Proteína",
            "1": "Carboidratos",
            "2": "Gorduras",
            "3": "Divisão Macros"
          }
        },
        "tips": {
          "title": "Dicas de Otimização de Proteína",
          "items": [
            "Distribua proteína uniformemente nas refeições — 20-40g por vez maximiza a síntese proteica muscular",
            "Priorize proteínas completas: ovos, frango, peixe, laticínios, soja e quinoa contêm todos os 9 aminoácidos essenciais",
            "Coma 25-30g de proteína no café da manhã para quebrar o catabolismo muscular noturno e reduzir desejos",
            "Priorize fontes alimentares integrais primeiro — limite suplementos a no máximo 35% da proteína diária total"
          ]
        }
      },
      "detailedTable": {
        "proteinFoods": {
          "button": "Ver Alimentos Ricos em Proteína",
          "title": "Alimentos Ricos em Proteína por Tipo de Dieta",
          "columns": {
            "food": "Alimento",
            "serving": "Porção",
            "protein": "Proteína",
            "calories": "Calorias",
            "diet": "Tipo de Dieta"
          }
        }
      },
      "referenceData": {
        "proteinByGoal": {
          "title": "Recomendações de Proteína por Objetivo",
          "items": {
            "muscle": {
              "label": "Ganhar Músculo",
              "value": "1,6 – 2,2 g/kg/dia"
            },
            "loss": {
              "label": "Perda de Gordura (preservar músculo)",
              "value": "1,8 – 2,7 g/kg/dia"
            },
            "maintain": {
              "label": "Manter / Saúde Geral",
              "value": "1,2 – 1,6 g/kg/dia"
            },
            "recomp": {
              "label": "Recomposição Corporal",
              "value": "1,6 – 2,2 g/kg/dia"
            },
            "sedentary": {
              "label": "Sedentário (mínimo RDA)",
              "value": "0,8 g/kg/dia"
            },
            "overweight": {
              "label": "Perda de Gordura Sobrepeso",
              "value": "1,2 – 1,5 g/kg/dia"
            },
            "elderly": {
              "label": "Adultos 65+",
              "value": "1,0 – 1,2 g/kg/dia"
            },
            "pregnancy": {
              "label": "Gravidez / Lactação",
              "value": "1,7+ g/kg/dia"
            }
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Por Que a Ingestão de Proteína Importa",
          "content": "Proteína é um dos três macronutrientes que seu corpo precisa diariamente, junto com carboidratos e gorduras. Diferente dos outros dois, proteína é o principal bloco de construção para músculos, ossos, pele, enzimas e hormônios. Seu corpo não pode armazenar excesso de proteína como armazena gordura ou glicogênio, então você precisa de uma ingestão diária consistente. Quando você come proteína, seu corpo a decompõe em aminoácidos — 9 dos quais são essenciais, significando que você só pode obtê-los da alimentação. Estes aminoácidos impulsionam a síntese proteica muscular (o processo de construir e reparar tecido muscular), apoiam a função imune e regulam o metabolismo. A ingestão dietética recomendada (IDR) de 0,8 g/kg é um mínimo para prevenir deficiência em adultos sedentários — não um alvo ótimo. Pesquisas mostram consistentemente que indivíduos ativos, aqueles tentando perder gordura, idosos e gestantes se beneficiam de ingestões significativamente maiores, tipicamente 1,2 a 2,2 g/kg por dia dependendo do objetivo."
        },
        "howItWorks": {
          "title": "Como Esta Calculadora Funciona",
          "content": "Esta calculadora determina sua ingestão ótima de proteína em três etapas. Primeiro, estima seu gasto energético total diário (GETD) usando a equação Mifflin-St Jeor para taxa metabólica basal, ajustada pelo seu nível de atividade. Segundo, seleciona uma proporção proteína-por-quilograma baseada no seu objetivo principal — ganho muscular, perda de gordura, manutenção ou recomposição corporal — com ajustes adicionais para tipo de treino, idade e composição corporal. Terceiro, distribui seu alvo diário nas suas refeições e fornece uma divisão completa de macros (proteína, carboidratos, gorduras) otimizada para seu objetivo. Se você fornecer seu percentual de gordura corporal, a calculadora usa massa corporal magra ao invés do peso total para melhor precisão."
        },
        "timing": {
          "title": "Horário e Distribuição de Proteína",
          "items": [
            {
              "text": "Distribua proteína uniformemente em 3-5 refeições — isso estimula a síntese proteica muscular mais efetivamente que sobrecarregar uma refeição",
              "type": "info"
            },
            {
              "text": "Consuma 25-30g de proteína de alta qualidade no café da manhã para quebrar o estado catabólico noturno e reduzir fome ao longo do dia",
              "type": "info"
            },
            {
              "text": "Coma 20-40g de proteína dentro de 2 horas após treino de resistência — a 'janela anabólica' é mais ampla que se pensava anteriormente mas ainda importante",
              "type": "info"
            },
            {
              "text": "Considere 20-30g de proteína de digestão lenta (caseína, queijo cottage) antes de dormir para apoiar síntese proteica muscular noturna",
              "type": "info"
            },
            {
              "text": "Não há limite superior prático para absorção de proteína por refeição — pesquisas recentes mostram que 100g são utilizadas ao longo de 12 horas — mas distribuição ainda otimiza SPM",
              "type": "warning"
            }
          ]
        },
        "sources": {
          "title": "Melhores Fontes de Proteína por Tipo de Dieta",
          "items": [
            {
              "text": "Onívoro: peito de frango (31g/100g), ovos (13g/100g), salmão (25g/100g), iogurte grego (10g/100g), carne magra (26g/100g)",
              "type": "info"
            },
            {
              "text": "Vegetariano: ovos, iogurte grego, queijo cottage, whey protein, tempeh (19g/100g), lentilhas (9g/100g)",
              "type": "info"
            },
            {
              "text": "Vegano: tofu (17g/100g), tempeh (19g/100g), lentilhas, grão-de-bico (9g/100g), seitan (25g/100g), proteína de soja, proteína de ervilha",
              "type": "info"
            },
            {
              "text": "Proteínas completas contêm todos os 9 aminoácidos essenciais — maioria das fontes animais são completas; fontes vegetais frequentemente precisam ser combinadas",
              "type": "warning"
            },
            {
              "text": "Leucina é o aminoácido chave para disparar síntese proteica muscular — objetive 2,5-3g por refeição (encontrada em ~25-30g de proteína de qualidade)",
              "type": "info"
            }
          ]
        },
        "mealPlans": {
          "title": "Planos de Refeição Exemplo",
          "description": "Exemplos do mundo real mostrando como atingir seu alvo diário de proteína através de diferentes tipos de dieta",
          "examples": [
            {
              "title": "Onívoro - 150g/dia",
              "steps": [
                "Café da manhã: 3 ovos + 2 torradas → 19g proteína",
                "Lanche: Iogurte grego 200g → 20g proteína",
                "Almoço: Peito frango 150g + arroz → 47g proteína",
                "Lanche: Shake proteína 1 scoop → 25g proteína",
                "Jantar: Salmão 150g + vegetais → 38g proteína"
              ],
              "result": "Total: 149g proteína, ~1.950 calorias"
            },
            {
              "title": "Vegetariano - 150g/dia",
              "steps": [
                "Café da manhã: Aveia + whey protein → 30g proteína",
                "Lanche: Queijo cottage 150g → 17g proteína",
                "Almoço: Paneer tikka 150g + naan → 35g proteína",
                "Lanche: Amêndoas 30g + iogurte grego → 16g proteína",
                "Jantar: Dal lentilha 200g + quinoa → 25g proteína",
                "Antes dormir: Shake caseína → 27g proteína"
              ],
              "result": "Total: 150g proteína, ~2.000 calorias"
            },
            {
              "title": "Vegano - 150g/dia",
              "steps": [
                "Café da manhã: Smoothie (proteína ervilha, banana, pasta amendoim) → 32g proteína",
                "Lanche: Edamame 150g → 17g proteína",
                "Almoço: Refogado tempeh 200g + arroz → 38g proteína",
                "Lanche: Homus + vegetais + pão → 12g proteína",
                "Jantar: Seitan 150g + quinoa 100g → 42g proteína",
                "Lanche: Leite soja 250ml → 9g proteína"
              ],
              "result": "Total: 150g proteína, ~2.100 calorias"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo de Proteína",
          "description": "Veja como objetivos mudam seu alvo diário de proteína",
          "examples": [
            {
              "title": "Homem 82kg — Ganho Muscular",
              "steps": [
                "Peso: 82kg",
                "Objetivo: Ganhar Músculo → 1,6-2,2 g/kg",
                "Atividade: Moderada (3-4x/semana) → usar meio da faixa",
                "Treino: Força → leve aumento para faixa superior",
                "Alvo diário: 82 × 1,8-2,2 = 148-180 g/dia",
                "4 refeições/dia → 37-45 g/refeição"
              ],
              "result": "Alvo: 148-180 g/dia | 37-45 g/refeição | 592-720 cal da proteína"
            },
            {
              "title": "Mulher 64kg — Perda de Gordura",
              "steps": [
                "Peso: 64kg",
                "Objetivo: Perder Gordura → 1,8-2,7 g/kg",
                "Atividade: Ativa (5-6x/semana) → usar meio-superior da faixa",
                "Treino: Misto → faixa padrão",
                "Alvo diário: 64 × 2,0-2,4 = 128-154 g/dia",
                "3 refeições/dia → 43-51 g/refeição"
              ],
              "result": "Alvo: 128-154 g/dia | 43-51 g/refeição | 512-616 cal da proteína"
            }
          ]
        }
      },
      "chart": {
        "title": "Distribuição de Proteína Nas Refeições",
        "xLabel": "Refeição",
        "yLabel": "Proteína (g)",
        "series": {
          "protein": "Proteína por Refeição"
        }
      },
      "faqs": [
        {
          "question": "Quanta proteína eu realmente preciso por dia?",
          "answer": "Depende do seu objetivo e nível de atividade. A IDR de 0,8 g/kg é um mínimo básico para prevenir deficiência — a maioria das pessoas ativas precisa significativamente mais. Para ganho muscular, pesquisas apoiam 1,6-2,2 g/kg por dia. Para perda de gordura preservando músculo, 1,8-2,7 g/kg. Para manutenção de saúde geral com atividade leve, 1,2-1,6 g/kg. Uma pessoa de 82 kg construindo músculo precisaria cerca de 130-180 gramas por dia."
        },
        {
          "question": "Posso comer proteína demais?",
          "answer": "Para indivíduos saudáveis, não há limite superior prejudicial conhecido para ingestão de proteína. Pesquisas mostram que mesmo 2-3x a IDR não tem efeitos negativos na função renal, saúde óssea ou função hepática em adultos saudáveis. Porém, comer proteína excessiva em detrimento de outros macronutrientes pode levar a uma dieta desequilibrada. A preocupação prática é mais sobre retornos decrescentes — acima de 2,2 g/kg, proteína adicional fornece pouco benefício extra para crescimento muscular."
        },
        {
          "question": "Horário da proteína é importante ou só importa a ingestão diária total?",
          "answer": "Ingestão diária total é o fator mais importante, mas distribuição também importa. Pesquisas mostram que espalhar proteína em 3-5 refeições estimula síntese proteica muscular cerca de 25% mais que concentrá-la em 1-2 refeições. Consumir 20-40g de proteína dentro de 2 horas pós-treino e 25-30g no café da manhã ambos têm benefícios mensuráveis. A 'janela anabólica' é real mas mais ampla que o antigo mito de 30 minutos sugeria."
        },
        {
          "question": "Preciso de mais proteína conforme envelheço?",
          "answer": "Sim. Após 50-60 anos, o corpo se torna menos eficiente em usar proteína dietética para manutenção muscular — um fenômeno chamado 'resistência anabólica.' Adultos acima de 65 devem objetivar pelo menos 1,0-1,2 g/kg por dia (vs 0,8 g/kg IDR), e aqueles que se exercitam regularmente podem se beneficiar de 1,2-1,6 g/kg. Maior ingestão proteica em adultos mais velhos está fortemente ligada à redução de perda muscular, melhor densidade óssea e manutenção de independência."
        },
        {
          "question": "Posso construir músculo numa dieta vegana?",
          "answer": "Absolutamente. A chave é consumir proteína total suficiente e combinar fontes vegetais para obter todos os aminoácidos essenciais. Soja, tempeh, seitan e quinoa são proteínas completas. Combinar leguminosas com grãos (arroz e feijão) também fornece perfil completo de aminoácidos. Veganos podem se beneficiar objetivando o extremo superior das recomendações proteicas (2,0+ g/kg) já que proteínas vegetais são geralmente menos digeríveis que proteínas animais. Suplementos de proteína de ervilha e soja podem ajudar a preencher lacunas."
        },
        {
          "question": "Devo usar suplementos de proteína ou só comer alimentos integrais?",
          "answer": "Alimentos integrais devem sempre ser sua fonte primária de proteína porque fornecem nutrientes adicionais, fibra e saciedade que suplementos carecem. Porém, suplementos como whey, caseína ou proteínas vegetais em pó são convenientes para atingir alvos diários — especialmente pós-treino ou quando o tempo é limitado. Uma boa regra é obter no máximo 35% da sua proteína diária de suplementos e o resto de comida real."
        },
        {
          "question": "Como déficit calórico afeta necessidades de proteína?",
          "answer": "Quando você come menos calorias do que queima, seu corpo tem mais probabilidade de quebrar tecido muscular para energia. Maior ingestão proteica durante déficit protege sua massa magra. Pesquisas recomendam 1,8-2,7 g/kg para indivíduos ativos em déficit calórico — significativamente mais que níveis de manutenção. Quanto mais magro você for e mais agressivamente cortar, mais proteína precisa para preservar músculo."
        },
        {
          "question": "Mulheres precisam de menos proteína que homens?",
          "answer": "Mulheres precisam de menos gramas totais porque tipicamente pesam menos, mas as recomendações de proteína-por-quilograma são as mesmas independente do sexo. Uma mulher de 64 kg construindo músculo precisa da mesma proporção 1,6-2,2 g/kg que um homem de 91 kg — a quantidade absoluta em gramas é apenas proporcionalmente menor. Mulheres grávidas e amamentando precisam proteína adicional: +10g no 2º trimestre, +31g no 3º trimestre, e +19g durante os primeiros 6 meses de lactação."
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
      "name": "Calculateur de Protéines",
      "slug": "calculateur-proteines",
      "subtitle": "Calculez votre apport quotidien optimal en protéines, obtenez des plans de repas personnalisés et découvrez les meilleurs aliments riches en protéines pour votre régime",
      "breadcrumb": "Protéines",
      "seo": {
        "title": "Calculateur de Protéines - Apport Quotidien, Plans de Repas et Guide Alimentaire",
        "description": "Calculez votre apport quotidien optimal en protéines avec une répartition macro personnalisée, des exemples de plans de repas et une base de données de plus de 30 aliments riches en protéines filtrés par type de régime. Outil gratuit avec recommandations scientifiques.",
        "shortDescription": "Calculez vos besoins en protéines avec plans de repas et suggestions d'aliments",
        "keywords": [
          "calculateur de protéines",
          "apport quotidien en protéines",
          "aliments riches en protéines",
          "plan de repas protéiné",
          "calculateur de macros",
          "protéines par jour",
          "protéines pour gain musculaire",
          "protéines pour perte de poids"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "gender": {
          "label": "Sexe",
          "helpText": "Affecte le taux métabolique de base et le calcul des protéines",
          "options": {
            "male": "Homme",
            "female": "Femme"
          }
        },
        "age": {
          "label": "Âge",
          "helpText": "Les besoins en protéines augmentent après 65 ans en raison d'une efficacité de synthèse réduite"
        },
        "weight": {
          "label": "Poids",
          "helpText": "Poids corporel actuel"
        },
        "height": {
          "label": "Taille",
          "helpText": "Utilisée pour estimer la dépense énergétique totale quotidienne"
        },
        "bodyFatPercent": {
          "label": "% de Graisse Corporelle (optionnel)",
          "helpText": "Si connu, améliore la précision en utilisant la masse maigre au lieu du poids total",
          "placeholder": "ex. 20"
        },
        "goal": {
          "label": "Objectif Principal",
          "helpText": "Votre objectif détermine le ratio protéines/poids corporel et la répartition des macros",
          "options": {
            "muscle": "Construire du Muscle",
            "loss": "Perdre du Gras, Garder le Muscle",
            "maintain": "Maintenir le Poids et la Santé",
            "recomp": "Recomposition Corporelle (perdre du gras + gagner du muscle)"
          }
        },
        "activityLevel": {
          "label": "Niveau d'Activité",
          "helpText": "À quel point êtes-vous actif durant une semaine typique ?",
          "options": {
            "sedentary": "Sédentaire (travail de bureau, peu d'exercice)",
            "light": "Léger (1-2 entraînements/semaine)",
            "moderate": "Modéré (3-4 entraînements/semaine)",
            "active": "Actif (5-6 entraînements/semaine)",
            "veryActive": "Très Actif (entraînement intense quotidien)",
            "extraActive": "Extra Actif (2x/jour ou travail physique + entraînement)"
          }
        },
        "trainingType": {
          "label": "Type d'Entraînement",
          "helpText": "L'entraînement en résistance augmente les besoins en protéines plus que le cardio",
          "options": {
            "strength": "Force / Hypertrophie",
            "cardio": "Cardio / Endurance",
            "hiit": "HIIT / CrossFit",
            "mixed": "Mixte (force + cardio)",
            "none": "Pas d'entraînement régulier"
          }
        },
        "dietPreference": {
          "label": "Préférence Alimentaire",
          "helpText": "Affecte les recommandations de sources de protéines et les plans de repas",
          "options": {
            "omnivore": "Omnivore (mange tout)",
            "vegetarian": "Végétarien (pas de viande, œufs/laitages OK)",
            "vegan": "Végan (végétal uniquement)"
          }
        },
        "mealsPerDay": {
          "label": "Repas par Jour",
          "helpText": "Utilisé pour calculer la distribution des protéines par repas"
        },
        "pregnancyStatus": {
          "label": "Grossesse / Allaitement",
          "helpText": "La grossesse et l'allaitement augmentent les besoins en protéines",
          "options": {
            "none": "Non applicable",
            "trimester1": "Enceinte — 1er trimestre",
            "trimester2": "Enceinte — 2e trimestre",
            "trimester3": "Enceinte — 3e trimestre",
            "lactating": "Allaitement"
          }
        }
      },
      "results": {
        "dailyProtein": {
          "label": "Objectif Quotidien de Protéines"
        },
        "perMealProtein": {
          "label": "Protéines par Repas"
        },
        "proteinPerKg": {
          "label": "Protéines par kg de Poids"
        },
        "caloriesFromProtein": {
          "label": "Calories des Protéines"
        },
        "percentOfCalories": {
          "label": "% des Calories Quotidiennes"
        },
        "postWorkoutDose": {
          "label": "Dose Post-Entraînement"
        },
        "supplementMax": {
          "label": "Maximum par Suppléments"
        },
        "suggestedCarbs": {
          "label": "Glucides Suggérés"
        },
        "suggestedFats": {
          "label": "Lipides Suggérés"
        },
        "macroSplit": {
          "label": "Répartition Macros"
        },
        "totalCalories": {
          "label": "TDEE Estimé"
        }
      },
      "presets": {
        "officeWorker": {
          "label": "Employé de Bureau",
          "description": "Mode de vie sédentaire, maintenir la santé"
        },
        "weekendGym": {
          "label": "Sportif du Weekend",
          "description": "Entraînement modéré, construction musculaire"
        },
        "athlete": {
          "label": "Athlète Sérieux",
          "description": "Entraînement quotidien, maximiser les gains"
        },
        "cuttingPhase": {
          "label": "Phase de Sèche",
          "description": "Entraînement actif, perte de gras, protection musculaire"
        },
        "veganAthlete": {
          "label": "Athlète Végan",
          "description": "Végétal, construction musculaire"
        }
      },
      "values": {
        "g/day": "g/jour",
        "g/meal": "g/repas",
        "g/kg": "g/kg",
        "g": "g",
        "cal": "cal",
        "max": "max",
        "P": "P",
        "C": "G",
        "F": "L"
      },
      "formats": {
        "summary": "Vous devriez consommer {dailyProtein} de protéines par jour ({proteinPerKg}). Cela représente environ {perMealProtein} par repas sur {meals} repas. Votre répartition macro suggérée est {macroSplit} basée sur votre objectif {goal}."
      },
      "infoCards": {
        "proteinPlan": {
          "title": "Votre Plan Protéines",
          "items": {
            "0": "Objectif Quotidien",
            "1": "Par Repas",
            "2": "Post-Entraînement",
            "3": "Max Suppléments"
          }
        },
        "macroSplit": {
          "title": "Plan Macro Complet",
          "items": {
            "0": "Protéines",
            "1": "Glucides",
            "2": "Lipides",
            "3": "Répartition Macro"
          }
        },
        "tips": {
          "title": "Conseils d'Optimisation des Protéines",
          "items": [
            "Répartissez les protéines uniformément entre les repas — 20-40g par prise maximise la synthèse protéique musculaire",
            "Privilégiez les protéines complètes : œufs, poulet, poisson, laitages, soja et quinoa contiennent les 9 acides aminés essentiels",
            "Mangez 25-30g de protéines au petit-déjeuner pour interrompre le catabolisme musculaire nocturne et réduire les fringales",
            "Visez d'abord les sources alimentaires entières — limitez les suppléments à 35% maximum de votre apport protéique quotidien total"
          ]
        }
      },
      "detailedTable": {
        "proteinFoods": {
          "button": "Voir les Aliments Riches en Protéines",
          "title": "Aliments Riches en Protéines par Type de Régime",
          "columns": {
            "food": "Aliment",
            "serving": "Portion",
            "protein": "Protéines",
            "calories": "Calories",
            "diet": "Type de Régime"
          }
        }
      },
      "referenceData": {
        "proteinByGoal": {
          "title": "Recommandations Protéiques par Objectif",
          "items": {
            "muscle": {
              "label": "Construire du Muscle",
              "value": "1,6 – 2,2 g/kg/jour"
            },
            "loss": {
              "label": "Perte de Gras (préserver muscle)",
              "value": "1,8 – 2,7 g/kg/jour"
            },
            "maintain": {
              "label": "Maintien / Santé Générale",
              "value": "1,2 – 1,6 g/kg/jour"
            },
            "recomp": {
              "label": "Recomposition Corporelle",
              "value": "1,6 – 2,2 g/kg/jour"
            },
            "sedentary": {
              "label": "Sédentaire (AJR minimum)",
              "value": "0,8 g/kg/jour"
            },
            "overweight": {
              "label": "Perte de Gras en Surpoids",
              "value": "1,2 – 1,5 g/kg/jour"
            },
            "elderly": {
              "label": "Adultes 65+",
              "value": "1,0 – 1,2 g/kg/jour"
            },
            "pregnancy": {
              "label": "Grossesse / Allaitement",
              "value": "1,7+ g/kg/jour"
            }
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Pourquoi l'Apport en Protéines Importe",
          "content": "Les protéines sont l'un des trois macronutriments dont votre corps a besoin quotidiennement, aux côtés des glucides et des lipides. Contrairement aux deux autres, les protéines sont le principal élément constitutif des muscles, os, peau, enzymes et hormones. Votre corps ne peut pas stocker l'excès de protéines comme il stocke les graisses ou le glycogène, donc vous avez besoin d'un apport quotidien constant. Quand vous mangez des protéines, votre corps les décompose en acides aminés — 9 d'entre eux sont essentiels, ce qui signifie que vous ne pouvez les obtenir que par l'alimentation. Ces acides aminés activent la synthèse protéique musculaire (le processus de construction et réparation du tissu musculaire), soutiennent la fonction immunitaire et régulent le métabolisme. L'apport journalier recommandé (AJR) de 0,8 g/kg est un minimum pour prévenir les carences chez les adultes sédentaires — pas un objectif optimal. La recherche montre constamment que les individus actifs, ceux qui essaient de perdre du gras, les adultes âgés et les femmes enceintes bénéficient tous d'apports significativement plus élevés, typiquement 1,2 à 2,2 g/kg par jour selon leur objectif."
        },
        "howItWorks": {
          "title": "Comment Fonctionne ce Calculateur",
          "content": "Ce calculateur détermine votre apport optimal en protéines en trois étapes. Premièrement, il estime votre dépense énergétique totale quotidienne (TDEE) en utilisant l'équation de Mifflin-St Jeor pour le taux métabolique de base, ajustée par votre niveau d'activité. Deuxièmement, il sélectionne un ratio protéines-par-kilogramme basé sur votre objectif principal — gain musculaire, perte de gras, maintien ou recomposition corporelle — avec des ajustements supplémentaires pour le type d'entraînement, l'âge et la composition corporelle. Troisièmement, il distribue votre objectif quotidien entre vos repas et fournit une répartition macro complète (protéines, glucides, lipides) optimisée pour votre objectif. Si vous fournissez votre pourcentage de graisse corporelle, le calculateur utilise la masse corporelle maigre au lieu du poids total pour une précision améliorée."
        },
        "timing": {
          "title": "Timing et Distribution des Protéines",
          "items": [
            {
              "text": "Répartissez les protéines uniformément sur 3-5 repas — cela stimule la synthèse protéique musculaire plus efficacement que de charger un seul repas",
              "type": "info"
            },
            {
              "text": "Consommez 25-30g de protéines de haute qualité au petit-déjeuner pour interrompre l'état catabolique nocturne et réduire la faim tout au long de la journée",
              "type": "info"
            },
            {
              "text": "Mangez 20-40g de protéines dans les 2 heures après l'entraînement en résistance — la 'fenêtre anabolique' est plus large que précédemment pensé mais reste importante",
              "type": "info"
            },
            {
              "text": "Considérez 20-30g de protéines à digestion lente (caséine, fromage cottage) avant le coucher pour soutenir la synthèse protéique musculaire nocturne",
              "type": "info"
            },
            {
              "text": "Il n'y a pas de limite supérieure pratique à l'absorption de protéines par repas — la recherche récente montre que 100g sont utilisées sur 12 heures — mais la distribution optimise toujours la SPM",
              "type": "warning"
            }
          ]
        },
        "sources": {
          "title": "Meilleures Sources de Protéines par Type de Régime",
          "items": [
            {
              "text": "Omnivore : blanc de poulet (31g/100g), œufs (13g/100g), saumon (25g/100g), yaourt grec (10g/100g), bœuf maigre (26g/100g)",
              "type": "info"
            },
            {
              "text": "Végétarien : œufs, yaourt grec, fromage cottage, protéine de lactosérum, tempeh (19g/100g), lentilles (9g/100g)",
              "type": "info"
            },
            {
              "text": "Végan : tofu (17g/100g), tempeh (19g/100g), lentilles, pois chiches (9g/100g), seitan (25g/100g), protéine de soja, protéine de pois",
              "type": "info"
            },
            {
              "text": "Les protéines complètes contiennent les 9 acides aminés essentiels — la plupart des sources animales sont complètes ; les sources végétales doivent souvent être combinées",
              "type": "warning"
            },
            {
              "text": "La leucine est l'acide aminé clé pour déclencher la synthèse protéique musculaire — visez 2,5-3g par repas (trouvée dans ~25-30g de protéines de qualité)",
              "type": "info"
            }
          ]
        },
        "mealPlans": {
          "title": "Exemples de Plans de Repas",
          "description": "Exemples concrets montrant comment atteindre votre objectif quotidien de protéines selon différents types de régimes",
          "examples": [
            {
              "title": "Omnivore - 150g/jour",
              "steps": [
                "Petit-déjeuner : 3 œufs + 2 toasts → 19g protéines",
                "Collation : Yaourt grec 200g → 20g protéines",
                "Déjeuner : Blanc de poulet 150g + riz → 47g protéines",
                "Collation : Shake protéiné 1 dose → 25g protéines",
                "Dîner : Saumon 150g + légumes → 38g protéines"
              ],
              "result": "Total : 149g protéines, ~1 950 calories"
            },
            {
              "title": "Végétarien - 150g/jour",
              "steps": [
                "Petit-déjeuner : Avoine + protéine lactosérum → 30g protéines",
                "Collation : Fromage cottage 150g → 17g protéines",
                "Déjeuner : Paneer tikka 150g + naan → 35g protéines",
                "Collation : Amandes 30g + yaourt grec → 16g protéines",
                "Dîner : Dal aux lentilles 200g + quinoa → 25g protéines",
                "Avant coucher : Shake caséine → 27g protéines"
              ],
              "result": "Total : 150g protéines, ~2 000 calories"
            },
            {
              "title": "Végan - 150g/jour",
              "steps": [
                "Petit-déjeuner : Smoothie (protéine pois, banane, beurre cacahuète) → 32g protéines",
                "Collation : Edamame 150g → 17g protéines",
                "Déjeuner : Sauté tempeh 200g + riz → 38g protéines",
                "Collation : Houmous + légumes + pain → 12g protéines",
                "Dîner : Seitan 150g + quinoa 100g → 42g protéines",
                "Collation : Lait de soja 250ml → 9g protéines"
              ],
              "result": "Total : 150g protéines, ~2 100 calories"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul de Protéines",
          "description": "Voyez comment les objectifs changent votre cible quotidienne de protéines",
          "examples": [
            {
              "title": "Homme 82 kg — Gain Musculaire",
              "steps": [
                "Poids : 82 kg",
                "Objectif : Construire Muscle → 1,6-2,2 g/kg",
                "Activité : Modérée (3-4x/semaine) → utiliser milieu de gamme",
                "Entraînement : Force → légère augmentation vers haut de gamme",
                "Objectif quotidien : 82 × 1,8-2,2 = 148-180 g/jour",
                "4 repas/jour → 37-45 g/repas"
              ],
              "result": "Objectif : 148-180 g/jour | 37-45 g/repas | 590-720 cal des protéines"
            },
            {
              "title": "Femme 64 kg — Perte de Gras",
              "steps": [
                "Poids : 64 kg",
                "Objectif : Perdre Gras → 1,8-2,7 g/kg",
                "Activité : Active (5-6x/semaine) → utiliser milieu-haut de gamme",
                "Entraînement : Mixte → gamme standard",
                "Objectif quotidien : 64 × 2,0-2,4 = 128-154 g/jour",
                "3 repas/jour → 43-51 g/repas"
              ],
              "result": "Objectif : 128-154 g/jour | 43-51 g/repas | 510-615 cal des protéines"
            }
          ]
        }
      },
      "chart": {
        "title": "Distribution des Protéines par Repas",
        "xLabel": "Repas",
        "yLabel": "Protéines (g)",
        "series": {
          "protein": "Protéines par Repas"
        }
      },
      "faqs": [
        {
          "question": "De combien de protéines ai-je réellement besoin par jour ?",
          "answer": "Cela dépend de votre objectif et niveau d'activité. L'AJR de 0,8 g/kg est un minimum absolu pour prévenir les carences — la plupart des personnes actives ont besoin de significativement plus. Pour le gain musculaire, la recherche soutient 1,6-2,2 g/kg par jour. Pour la perte de gras tout en préservant le muscle, 1,8-2,7 g/kg. Pour le maintien de santé générale avec activité légère, 1,2-1,6 g/kg. Une personne de 82 kg construisant du muscle aurait besoin d'environ 130-180 grammes par jour."
        },
        {
          "question": "Puis-je manger trop de protéines ?",
          "answer": "Pour les individus en bonne santé, il n'y a pas de limite supérieure nocive connue pour l'apport en protéines. La recherche montre que même 2-3x l'AJR n'a pas d'effets négatifs sur la fonction rénale, la santé osseuse ou la fonction hépatique chez les adultes sains. Cependant, manger des protéines excessives au détriment d'autres macronutriments peut mener à une alimentation déséquilibrée. La préoccupation pratique concerne plus les rendements décroissants — au-dessus de 2,2 g/kg, les protéines supplémentaires apportent peu de bénéfices extra pour la croissance musculaire."
        },
        {
          "question": "Le timing des protéines est-il important ou seul l'apport quotidien total compte ?",
          "answer": "L'apport quotidien total est le facteur le plus important, mais la distribution compte aussi. La recherche montre que répartir les protéines sur 3-5 repas stimule la synthèse protéique musculaire environ 25% de plus que de les concentrer en 1-2 repas. Consommer 20-40g de protéines dans les 2 heures post-entraînement et 25-30g au petit-déjeuner ont tous deux des bénéfices mesurables. La 'fenêtre anabolique' est réelle mais plus large que l'ancien mythe des 30 minutes suggérait."
        },
        {
          "question": "Ai-je besoin de plus de protéines en vieillissant ?",
          "answer": "Oui. Après 50-60 ans, le corps devient moins efficace à utiliser les protéines alimentaires pour le maintien musculaire — un phénomène appelé 'résistance anabolique'. Les adultes de plus de 65 ans devraient viser au moins 1,0-1,2 g/kg par jour (vs 0,8 g/kg AJR), et ceux qui s'exercent régulièrement peuvent bénéficier de 1,2-1,6 g/kg. Un apport protéique plus élevé chez les adultes âgés est fortement lié à une perte musculaire réduite, une meilleure densité osseuse et le maintien de l'indépendance."
        },
        {
          "question": "Puis-je construire du muscle avec un régime végan ?",
          "answer": "Absolument. La clé est de consommer suffisamment de protéines totales et de combiner les sources végétales pour obtenir tous les acides aminés essentiels. Le soja, tempeh, seitan et quinoa sont des protéines complètes. Combiner légumineuses et céréales (riz et haricots) fournit aussi un profil complet d'acides aminés. Les végans peuvent bénéficier de viser le haut des recommandations protéiques (2,0+ g/kg) car les protéines végétales sont généralement moins digestibles que les protéines animales. Les suppléments de protéine de pois et soja peuvent aider à combler les lacunes."
        },
        {
          "question": "Dois-je utiliser des suppléments de protéines ou juste manger des aliments entiers ?",
          "answer": "Les aliments entiers devraient toujours être votre source protéique principale car ils fournissent des nutriments supplémentaires, fibres et satiété que les suppléments n'ont pas. Cependant, les suppléments comme la lactosérum, caséine ou poudres de protéines végétales sont pratiques pour atteindre les objectifs quotidiens — surtout post-entraînement ou quand le temps est limité. Une bonne règle générale est d'obtenir pas plus de 35% de vos protéines quotidiennes des suppléments et le reste de vrais aliments."
        },
        {
          "question": "Comment un déficit calorique affecte-t-il les besoins en protéines ?",
          "answer": "Quand vous mangez moins de calories que vous n'en brûlez, votre corps est plus susceptible de décomposer le tissu musculaire pour l'énergie. Un apport protéique plus élevé pendant un déficit protège votre masse maigre. La recherche recommande 1,8-2,7 g/kg pour les individus actifs en déficit calorique — significativement plus élevé que les niveaux de maintien. Plus vous êtes mince et plus vous coupez agressivement, plus vous avez besoin de protéines pour préserver le muscle."
        },
        {
          "question": "Les femmes ont-elles besoin de moins de protéines que les hommes ?",
          "answer": "Les femmes ont besoin de moins de grammes totaux car elles pèsent typiquement moins, mais les recommandations protéines-par-kilogramme sont les mêmes quel que soit le sexe. Une femme de 64 kg construisant du muscle a besoin du même ratio 1,6-2,2 g/kg qu'un homme de 90 kg — la quantité absolue en grammes est juste proportionnellement plus basse. Les femmes enceintes et allaitantes ont besoin de protéines supplémentaires : +10g au 2e trimestre, +31g au 3e trimestre, et +19g pendant les 6 premiers mois d'allaitement."
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
      "name": "Protein Rechner",
      "slug": "protein-rechner",
      "subtitle": "Berechnen Sie Ihre optimale tägliche Proteinzufuhr, erhalten Sie personalisierte Ernährungspläne und entdecken Sie die besten proteinreichen Lebensmittel für Ihre Diät",
      "breadcrumb": "Protein",
      "seo": {
        "title": "Protein Rechner - Täglicher Bedarf, Ernährungspläne & Lebensmittel Guide",
        "description": "Berechnen Sie Ihre optimale tägliche Proteinzufuhr mit personalisierten Makro-Aufteilungen, Beispiel-Ernährungsplänen und einer Datenbank von 30+ proteinreichen Lebensmitteln nach Diättyp gefiltert. Kostenloses Tool mit wissenschaftlich fundierten Empfehlungen.",
        "shortDescription": "Berechnen Sie Ihren Proteinbedarf mit Ernährungsplänen und Lebensmittelvorschlägen",
        "keywords": [
          "protein rechner",
          "tägliche proteinzufuhr",
          "proteinreiche lebensmittel",
          "protein ernährungsplan",
          "makro rechner",
          "protein pro tag",
          "protein für muskelaufbau",
          "protein für gewichtsabnahme"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "gender": {
          "label": "Geschlecht",
          "helpText": "Beeinflusst den Grundumsatz und die Proteinberechnung",
          "options": {
            "male": "Männlich",
            "female": "Weiblich"
          }
        },
        "age": {
          "label": "Alter",
          "helpText": "Der Proteinbedarf steigt nach 65 Jahren aufgrund reduzierter Syntheseeffizienz"
        },
        "weight": {
          "label": "Gewicht",
          "helpText": "Aktuelles Körpergewicht"
        },
        "height": {
          "label": "Größe",
          "helpText": "Wird zur Schätzung des täglichen Gesamtenergieverbrauchs verwendet"
        },
        "bodyFatPercent": {
          "label": "Körperfett % (optional)",
          "helpText": "Falls bekannt, verbessert die Genauigkeit durch Verwendung der Magermasse anstatt des Gesamtgewichts",
          "placeholder": "z.B. 20"
        },
        "goal": {
          "label": "Hauptziel",
          "helpText": "Ihr Ziel bestimmt das Protein-zu-Körpergewicht-Verhältnis und die Makro-Aufteilung",
          "options": {
            "muscle": "Muskeln aufbauen",
            "loss": "Fett verlieren, Muskeln erhalten",
            "maintain": "Gewicht halten & Gesundheit",
            "recomp": "Körper-Rekomposition (Fett verlieren + Muskeln aufbauen)"
          }
        },
        "activityLevel": {
          "label": "Aktivitätslevel",
          "helpText": "Wie aktiv sind Sie in einer typischen Woche?",
          "options": {
            "sedentary": "Sitzend (Bürojob, wenig Sport)",
            "light": "Leicht (1-2 Trainings/Woche)",
            "moderate": "Moderat (3-4 Trainings/Woche)",
            "active": "Aktiv (5-6 Trainings/Woche)",
            "veryActive": "Sehr aktiv (täglich intensives Training)",
            "extraActive": "Extrem aktiv (2x/Tag oder körperliche Arbeit + Training)"
          }
        },
        "trainingType": {
          "label": "Trainingsart",
          "helpText": "Krafttraining erhöht den Proteinbedarf mehr als Ausdauertraining",
          "options": {
            "strength": "Kraft / Hypertrophie",
            "cardio": "Ausdauer / Cardio",
            "hiit": "HIIT / CrossFit",
            "mixed": "Gemischt (Kraft + Ausdauer)",
            "none": "Kein regelmäßiges Training"
          }
        },
        "dietPreference": {
          "label": "Ernährungspräferenz",
          "helpText": "Beeinflusst Proteinquellenempfehlungen und Ernährungspläne",
          "options": {
            "omnivore": "Allesesser (esse alles)",
            "vegetarian": "Vegetarisch (kein Fleisch, Eier/Milch OK)",
            "vegan": "Vegan (nur pflanzlich)"
          }
        },
        "mealsPerDay": {
          "label": "Mahlzeiten pro Tag",
          "helpText": "Wird zur Berechnung der Proteinverteilung pro Mahlzeit verwendet"
        },
        "pregnancyStatus": {
          "label": "Schwangerschaft / Stillzeit",
          "helpText": "Schwangerschaft und Stillen erhöhen den Proteinbedarf",
          "options": {
            "none": "Nicht zutreffend",
            "trimester1": "Schwanger — 1. Trimester",
            "trimester2": "Schwanger — 2. Trimester",
            "trimester3": "Schwanger — 3. Trimester",
            "lactating": "Stillen"
          }
        }
      },
      "results": {
        "dailyProtein": {
          "label": "Tägliches Proteinziel"
        },
        "perMealProtein": {
          "label": "Protein pro Mahlzeit"
        },
        "proteinPerKg": {
          "label": "Protein pro kg Körpergewicht"
        },
        "caloriesFromProtein": {
          "label": "Kalorien aus Protein"
        },
        "percentOfCalories": {
          "label": "% der täglichen Kalorien"
        },
        "postWorkoutDose": {
          "label": "Nach-Training-Dosis"
        },
        "supplementMax": {
          "label": "Maximum aus Nahrungsergänzung"
        },
        "suggestedCarbs": {
          "label": "Empfohlene Kohlenhydrate"
        },
        "suggestedFats": {
          "label": "Empfohlene Fette"
        },
        "macroSplit": {
          "label": "Makro-Aufteilung"
        },
        "totalCalories": {
          "label": "Geschätzter Gesamtumsatz"
        }
      },
      "presets": {
        "officeWorker": {
          "label": "Büroangestellter",
          "description": "Sitzender Lebensstil, Gesundheit erhalten"
        },
        "weekendGym": {
          "label": "Wochenend-Sportler",
          "description": "Moderates Training, Muskelaufbau"
        },
        "athlete": {
          "label": "Leistungssportler",
          "description": "Tägliches Training, maximale Erfolge"
        },
        "cuttingPhase": {
          "label": "Diät-Phase",
          "description": "Aktives Training, Fett verlieren, Muskeln schützen"
        },
        "veganAthlete": {
          "label": "Veganer Sportler",
          "description": "Pflanzlich, Muskelaufbau"
        }
      },
      "values": {
        "g/day": "g/Tag",
        "g/meal": "g/Mahlzeit",
        "g/kg": "g/kg",
        "g": "g",
        "cal": "kcal",
        "max": "max",
        "P": "E",
        "C": "K",
        "F": "F"
      },
      "formats": {
        "summary": "Sie sollten {dailyProtein} Protein pro Tag essen ({proteinPerKg}). Das sind etwa {perMealProtein} pro Mahlzeit über {meals} Mahlzeiten verteilt. Ihre empfohlene Makro-Aufteilung ist {macroSplit} basierend auf Ihrem {goal} Ziel."
      },
      "infoCards": {
        "proteinPlan": {
          "title": "Ihr Proteinplan",
          "items": {
            "0": "Tägliches Ziel",
            "1": "Pro Mahlzeit",
            "2": "Nach dem Training",
            "3": "Max. Nahrungsergänzung"
          }
        },
        "macroSplit": {
          "title": "Kompletter Makroplan",
          "items": {
            "0": "Protein",
            "1": "Kohlenhydrate",
            "2": "Fette",
            "3": "Makro-Aufteilung"
          }
        },
        "tips": {
          "title": "Protein-Optimierungstipps",
          "items": [
            "Verteilen Sie Protein gleichmäßig auf Mahlzeiten — 20-40g pro Portion maximiert die Muskelproteinsynthese",
            "Priorisieren Sie vollständige Proteine: Eier, Hähnchen, Fisch, Milchprodukte, Soja und Quinoa enthalten alle 9 essenziellen Aminosäuren",
            "Essen Sie 25-30g Protein zum Frühstück, um den nächtlichen Muskelabbau zu stoppen und Heißhunger zu reduzieren",
            "Setzen Sie zuerst auf natürliche Quellen — begrenzen Sie Nahrungsergänzungen auf maximal 35% des täglichen Proteins"
          ]
        }
      },
      "detailedTable": {
        "proteinFoods": {
          "button": "Proteinreiche Lebensmittel ansehen",
          "title": "Proteinreiche Lebensmittel nach Diättyp",
          "columns": {
            "food": "Lebensmittel",
            "serving": "Portion",
            "protein": "Protein",
            "calories": "Kalorien",
            "diet": "Diättyp"
          }
        }
      },
      "referenceData": {
        "proteinByGoal": {
          "title": "Proteinempfehlungen nach Ziel",
          "items": {
            "muscle": {
              "label": "Muskelaufbau",
              "value": "1,6 – 2,2 g/kg/Tag"
            },
            "loss": {
              "label": "Fettabbau (Muskeln erhalten)",
              "value": "1,8 – 2,7 g/kg/Tag"
            },
            "maintain": {
              "label": "Erhaltung / Allgemeine Gesundheit",
              "value": "1,2 – 1,6 g/kg/Tag"
            },
            "recomp": {
              "label": "Körper-Rekomposition",
              "value": "1,6 – 2,2 g/kg/Tag"
            },
            "sedentary": {
              "label": "Sitzend (RDA Minimum)",
              "value": "0,8 g/kg/Tag"
            },
            "overweight": {
              "label": "Übergewicht Fettabbau",
              "value": "1,2 – 1,5 g/kg/Tag"
            },
            "elderly": {
              "label": "Erwachsene 65+",
              "value": "1,0 – 1,2 g/kg/Tag"
            },
            "pregnancy": {
              "label": "Schwangerschaft / Stillzeit",
              "value": "1,7+ g/kg/Tag"
            }
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Warum die Proteinzufuhr wichtig ist",
          "content": "Protein ist einer von drei Makronährstoffen, die Ihr Körper täglich benötigt, neben Kohlenhydraten und Fetten. Im Gegensatz zu den anderen beiden ist Protein der primäre Baustein für Muskeln, Knochen, Haut, Enzyme und Hormone. Ihr Körper kann überschüssiges Protein nicht speichern wie Fett oder Glykogen, daher benötigen Sie eine konstante tägliche Zufuhr. Wenn Sie Protein essen, zerlegt Ihr Körper es in Aminosäuren — 9 davon sind essentiell, das bedeutet, Sie können sie nur über die Nahrung aufnehmen. Diese Aminosäuren treiben die Muskelproteinsynthese (den Prozess des Aufbaus und der Reparatur von Muskelgewebe) an, unterstützen die Immunfunktion und regulieren den Stoffwechsel. Die empfohlene Tagesdosis (RDA) von 0,8 g/kg ist ein Minimum zur Vermeidung von Mangel bei sitzenden Erwachsenen — nicht ein optimales Ziel. Forschung zeigt konsistent, dass aktive Personen, die versuchen Fett zu verlieren, ältere Erwachsene und schwangere Frauen alle von deutlich höheren Zufuhrmengen profitieren, typischerweise 1,2 bis 2,2 g/kg pro Tag je nach Ziel."
        },
        "howItWorks": {
          "title": "Wie dieser Rechner funktioniert",
          "content": "Dieser Rechner bestimmt Ihre optimale Proteinzufuhr in drei Schritten. Zuerst schätzt er Ihren täglichen Gesamtenergieverbrauch (TDEE) mit der Mifflin-St Jeor-Gleichung für den Grundumsatz, angepasst an Ihr Aktivitätslevel. Zweitens wählt er ein Protein-pro-Kilogramm-Verhältnis basierend auf Ihrem Hauptziel — Muskelaufbau, Fettabbau, Erhaltung oder Körper-Rekomposition — mit weiteren Anpassungen für Trainingsart, Alter und Körperzusammensetzung. Drittens verteilt er Ihr tägliches Ziel auf Ihre Mahlzeiten und bietet eine komplette Makro-Aufteilung (Protein, Kohlenhydrate, Fette) optimiert für Ihr Ziel. Wenn Sie Ihren Körperfettanteil angeben, verwendet der Rechner die Magermasse anstatt des Gesamtgewichts für verbesserte Genauigkeit."
        },
        "timing": {
          "title": "Protein-Timing & Verteilung",
          "items": [
            {
              "text": "Verteilen Sie Protein gleichmäßig auf 3-5 Mahlzeiten — dies stimuliert die Muskelproteinsynthese effektiver als eine Mahlzeit zu überladen",
              "type": "info"
            },
            {
              "text": "Nehmen Sie 25-30g hochwertiges Protein zum Frühstück auf, um den nächtlichen katabolen Zustand zu durchbrechen und den Hunger den ganzen Tag zu reduzieren",
              "type": "info"
            },
            {
              "text": "Essen Sie 20-40g Protein innerhalb von 2 Stunden nach dem Krafttraining — das 'anabole Fenster' ist breiter als früher gedacht, aber immer noch wichtig",
              "type": "info"
            },
            {
              "text": "Erwägen Sie 20-30g langsam verdauliches Protein (Kasein, Hüttenkäse) vor dem Schlafengehen zur Unterstützung der nächtlichen Muskelproteinsynthese",
              "type": "info"
            },
            {
              "text": "Es gibt keine praktische Obergrenze für Proteinabsorption pro Mahlzeit — neueste Forschung zeigt, dass 100g über 12 Stunden verwertet werden — aber Verteilung optimiert immer noch MPS",
              "type": "warning"
            }
          ]
        },
        "sources": {
          "title": "Beste Proteinquellen nach Diättyp",
          "items": [
            {
              "text": "Allesesser: Hähnchenbrust (31g/100g), Eier (13g/100g), Lachs (25g/100g), griechischer Joghurt (10g/100g), mageres Rindfleisch (26g/100g)",
              "type": "info"
            },
            {
              "text": "Vegetarisch: Eier, griechischer Joghurt, Hüttenkäse, Whey Protein, Tempeh (19g/100g), Linsen (9g/100g)",
              "type": "info"
            },
            {
              "text": "Vegan: Tofu (17g/100g), Tempeh (19g/100g), Linsen, Kichererbsen (9g/100g), Seitan (25g/100g), Sojaprotein, Erbsenprotein",
              "type": "info"
            },
            {
              "text": "Vollständige Proteine enthalten alle 9 essenziellen Aminosäuren — die meisten tierischen Quellen sind vollständig; pflanzliche Quellen müssen oft kombiniert werden",
              "type": "warning"
            },
            {
              "text": "Leucin ist die Schlüssel-Aminosäure zur Auslösung der Muskelproteinsynthese — streben Sie 2,5-3g pro Mahlzeit an (enthalten in ~25-30g Qualitätsprotein)",
              "type": "info"
            }
          ]
        },
        "mealPlans": {
          "title": "Beispiel-Ernährungspläne",
          "description": "Praxisnahe Beispiele, die zeigen, wie Sie Ihr tägliches Proteinziel über verschiedene Diättypen erreichen",
          "examples": [
            {
              "title": "Allesesser - 150g/Tag",
              "steps": [
                "Frühstück: 3 Eier + 2 Toast → 19g Protein",
                "Snack: Griechischer Joghurt 200g → 20g Protein",
                "Mittagessen: Hähnchenbrust 150g + Reis → 47g Protein",
                "Snack: Protein-Shake 1 Portion → 25g Protein",
                "Abendessen: Lachs 150g + Gemüse → 38g Protein"
              ],
              "result": "Gesamt: 149g Protein, ~1.950 Kalorien"
            },
            {
              "title": "Vegetarisch - 150g/Tag",
              "steps": [
                "Frühstück: Haferflocken + Whey Protein → 30g Protein",
                "Snack: Hüttenkäse 150g → 17g Protein",
                "Mittagessen: Paneer Tikka 150g + Naan → 35g Protein",
                "Snack: Mandeln 30g + griechischer Joghurt → 16g Protein",
                "Abendessen: Linsen-Dal 200g + Quinoa → 25g Protein",
                "Vor dem Schlaf: Kasein-Shake → 27g Protein"
              ],
              "result": "Gesamt: 150g Protein, ~2.000 Kalorien"
            },
            {
              "title": "Vegan - 150g/Tag",
              "steps": [
                "Frühstück: Smoothie (Erbsenprotein, Banane, Erdnussbutter) → 32g Protein",
                "Snack: Edamame 150g → 17g Protein",
                "Mittagessen: Tempeh Pfannengericht 200g + Reis → 38g Protein",
                "Snack: Hummus + Gemüse + Brot → 12g Protein",
                "Abendessen: Seitan 150g + Quinoa 100g → 42g Protein",
                "Snack: Sojamilch 250ml → 9g Protein"
              ],
              "result": "Gesamt: 150g Protein, ~2.100 Kalorien"
            }
          ]
        },
        "examples": {
          "title": "Proteinberechnungs-Beispiele",
          "description": "Sehen Sie, wie Ziele Ihr tägliches Proteinziel verändern",
          "examples": [
            {
              "title": "82 kg Mann — Muskelaufbau",
              "steps": [
                "Gewicht: 82 kg",
                "Ziel: Muskelaufbau → 1,6-2,2 g/kg",
                "Aktivität: Moderat (3-4x/Woche) → mittlerer Bereich",
                "Training: Kraft → leichter Anstieg zum oberen Bereich",
                "Tägliches Ziel: 82 × 1,8-2,2 = 148-180 g/Tag",
                "4 Mahlzeiten/Tag → 37-45 g/Mahlzeit"
              ],
              "result": "Ziel: 148-180 g/Tag | 37-45 g/Mahlzeit | 592-720 kcal aus Protein"
            },
            {
              "title": "64 kg Frau — Fettabbau",
              "steps": [
                "Gewicht: 64 kg",
                "Ziel: Fett verlieren → 1,8-2,7 g/kg",
                "Aktivität: Aktiv (5-6x/Woche) → mittlerer bis oberer Bereich",
                "Training: Gemischt → Standardbereich",
                "Tägliches Ziel: 64 × 2,0-2,4 = 128-154 g/Tag",
                "3 Mahlzeiten/Tag → 43-51 g/Mahlzeit"
              ],
              "result": "Ziel: 128-154 g/Tag | 43-51 g/Mahlzeit | 512-616 kcal aus Protein"
            }
          ]
        }
      },
      "chart": {
        "title": "Proteinverteilung über Mahlzeiten",
        "xLabel": "Mahlzeit",
        "yLabel": "Protein (g)",
        "series": {
          "protein": "Protein pro Mahlzeit"
        }
      },
      "faqs": [
        {
          "question": "Wie viel Protein brauche ich tatsächlich pro Tag?",
          "answer": "Das hängt von Ihrem Ziel und Aktivitätslevel ab. Die RDA von 0,8 g/kg ist ein absolutes Minimum zur Mangelverhinderung — die meisten aktiven Menschen brauchen deutlich mehr. Für Muskelaufbau unterstützt die Forschung 1,6-2,2 g/kg pro Tag. Für Fettabbau bei Muskelerhalt 1,8-2,7 g/kg. Für allgemeine Gesunderhaltung mit leichter Aktivität 1,2-1,6 g/kg. Eine 82 kg Person beim Muskelaufbau würde etwa 130-180 Gramm pro Tag benötigen."
        },
        {
          "question": "Kann ich zu viel Protein essen?",
          "answer": "Für gesunde Personen gibt es keine bekannte schädliche Obergrenze für Proteinzufuhr. Forschung zeigt, dass selbst das 2-3fache der RDA keine negativen Auswirkungen auf Nieren-, Knochen- oder Leberfunktion bei gesunden Erwachsenen hat. Jedoch kann übermäßiges Protein auf Kosten anderer Makronährstoffe zu einer unausgewogenen Ernährung führen. Die praktische Sorge ist eher der abnehmende Nutzen — über 2,2 g/kg bietet zusätzliches Protein wenig extra Nutzen für Muskelwachstum."
        },
        {
          "question": "Ist Protein-Timing wichtig oder zählt nur die tägliche Gesamtzufuhr?",
          "answer": "Die tägliche Gesamtzufuhr ist der wichtigste Faktor, aber Verteilung spielt auch eine Rolle. Forschung zeigt, dass die Verteilung von Protein über 3-5 Mahlzeiten die Muskelproteinsynthese etwa 25% mehr stimuliert als es in 1-2 Mahlzeiten zu konzentrieren. 20-40g Protein innerhalb von 2 Stunden nach dem Training und 25-30g zum Frühstück haben beide messbare Vorteile. Das 'anabole Fenster' ist real, aber breiter als der alte 30-Minuten-Mythos suggerierte."
        },
        {
          "question": "Brauche ich mehr Protein im Alter?",
          "answer": "Ja. Nach dem 50.-60. Lebensjahr wird der Körper weniger effizient bei der Verwendung von Nahrungsprotein für Muskelerhalt — ein Phänomen namens 'anabole Resistenz'. Erwachsene über 65 sollten mindestens 1,0-1,2 g/kg pro Tag anstreben (vs 0,8 g/kg RDA), und die, die regelmäßig trainieren, können von 1,2-1,6 g/kg profitieren. Höhere Proteinzufuhr bei älteren Erwachsenen ist stark mit reduziertem Muskelverlust, besserer Knochendichte und erhaltener Unabhängigkeit verbunden."
        },
        {
          "question": "Kann ich mit veganer Ernährung Muskeln aufbauen?",
          "answer": "Absolut. Der Schlüssel ist genug Gesamtprotein zu konsumieren und pflanzliche Quellen zu kombinieren, um alle essenziellen Aminosäuren zu erhalten. Soja, Tempeh, Seitan und Quinoa sind vollständige Proteine. Die Kombination von Hülsenfrüchten mit Getreide (Reis und Bohnen) bietet auch ein vollständiges Aminosäureprofil. Veganer können davon profitieren, am oberen Ende der Proteinempfehlungen (2,0+ g/kg) zu zielen, da pflanzliche Proteine generell weniger verdaulich sind als tierische Proteine. Erbsen- und Sojaprotein-Nahrungsergänzungen können helfen, Lücken zu füllen."
        },
        {
          "question": "Sollte ich Proteinpräparate verwenden oder nur echte Lebensmittel essen?",
          "answer": "Echte Lebensmittel sollten immer Ihre primäre Proteinquelle sein, da sie zusätzliche Nährstoffe, Ballaststoffe und Sättigung bieten, die Nahrungsergänzungen fehlen. Jedoch sind Nahrungsergänzungen wie Whey, Kasein oder pflanzliche Proteinpulver praktisch, um tägliche Ziele zu erreichen — besonders nach dem Training oder bei Zeitmangel. Eine gute Faustregel ist, nicht mehr als 35% Ihres täglichen Proteins aus Nahrungsergänzungen zu bekommen und den Rest aus echter Nahrung."
        },
        {
          "question": "Wie beeinflusst ein Kaloriendefizit den Proteinbedarf?",
          "answer": "Wenn Sie weniger Kalorien essen als Sie verbrennen, ist Ihr Körper eher geneigt, Muskelgewebe für Energie abzubauen. Höhere Proteinzufuhr während eines Defizits schützt Ihre Magermasse. Forschung empfiehlt 1,8-2,7 g/kg für aktive Personen in einem Kaloriendefizit — deutlich höher als Erhaltungsmengen. Je schlanker Sie sind und je aggressiver Sie Kalorien reduzieren, desto mehr Protein brauchen Sie zum Muskelerhalt."
        },
        {
          "question": "Brauchen Frauen weniger Protein als Männer?",
          "answer": "Frauen brauchen weniger Gramm insgesamt, weil sie typischerweise weniger wiegen, aber die Protein-pro-Kilogramm-Empfehlungen sind dieselben unabhängig vom Geschlecht. Eine 64 kg Frau beim Muskelaufbau braucht dasselbe 1,6-2,2 g/kg Verhältnis wie ein 90 kg Mann — die absolute Grammzahl ist nur proportional niedriger. Schwangere und stillende Frauen brauchen zusätzliches Protein: +10g im 2. Trimester, +31g im 3. Trimester und +19g während der ersten 6 Monate des Stillens."
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
