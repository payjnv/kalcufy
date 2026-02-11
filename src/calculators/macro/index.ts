// ⚡ MACRO CALCULATOR V4.3 — TOGGLE UPGRADE (2026-02-10)
// New: Toggle "Show Metabolic Details" + Toggle "Show Protein Analysis"
// New: Protein per lb/kg, protein recommendation, sugar/sat fat limits
// New: % deficit option, "Recomp" + "Endurance" presets
// Preserved: Dual BMR, 8 diet types, meal splitting, fiber, water, chart
// ═══════════════════════════════════════════════════════════════

import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";
import { convertToBase, convertFromBase } from "@/engine/v4/units";

export const macroCalculatorConfig: CalculatorConfigV4 = {
  id: "macro",
  version: "4.3",
  category: "health",
  icon: "🍽️",

  // ═══════════════════════════════════════════════════════════════
  // PRESETS (8 presets with icons)
  // ═══════════════════════════════════════════════════════════════
  presets: [
    {
      id: "cutMale",
      icon: "🔥",
      values: {
        gender: "male",
        age: 25,
        weight: 180,
        height: 177.8,
        activityLevel: "moderate",
        goal: "lose1",
        dietType: "highProtein",
        bodyFat: null,
        mealsPerDay: "4",
        showMetabolic: false,
        showProteinAnalysis: false,
      },
    },
    {
      id: "cutFemale",
      icon: "✨",
      values: {
        gender: "female",
        age: 25,
        weight: 140,
        height: 165.1,
        activityLevel: "moderate",
        goal: "lose1",
        dietType: "balanced",
        bodyFat: null,
        mealsPerDay: "4",
        showMetabolic: false,
        showProteinAnalysis: false,
      },
    },
    {
      id: "bulkMale",
      icon: "💪",
      values: {
        gender: "male",
        age: 25,
        weight: 180,
        height: 177.8,
        activityLevel: "veryActive",
        goal: "gain1",
        dietType: "highProtein",
        bodyFat: null,
        mealsPerDay: "5",
        showMetabolic: false,
        showProteinAnalysis: false,
      },
    },
    {
      id: "bulkFemale",
      icon: "🏋️",
      values: {
        gender: "female",
        age: 25,
        weight: 140,
        height: 165.1,
        activityLevel: "veryActive",
        goal: "gain05",
        dietType: "balanced",
        bodyFat: null,
        mealsPerDay: "4",
        showMetabolic: false,
        showProteinAnalysis: false,
      },
    },
    {
      id: "ketoMale",
      icon: "🥑",
      values: {
        gender: "male",
        age: 35,
        weight: 200,
        height: 182.9,
        activityLevel: "light",
        goal: "lose1",
        dietType: "keto",
        bodyFat: null,
        mealsPerDay: "3",
        showMetabolic: false,
        showProteinAnalysis: false,
      },
    },
    {
      id: "veganAthlete",
      icon: "🌱",
      values: {
        gender: "female",
        age: 28,
        weight: 135,
        height: 167.6,
        activityLevel: "active",
        goal: "maintain",
        dietType: "veganProtein",
        bodyFat: null,
        mealsPerDay: "5",
        showMetabolic: false,
        showProteinAnalysis: false,
      },
    },
    {
      id: "recomp",
      icon: "🔄",
      values: {
        gender: "male",
        age: 28,
        weight: 175,
        height: 177.8,
        activityLevel: "active",
        goal: "maintain",
        dietType: "highProtein",
        bodyFat: 18,
        mealsPerDay: "5",
        showMetabolic: true,
        showProteinAnalysis: true,
      },
    },
    {
      id: "endurance",
      icon: "🏃",
      values: {
        gender: "male",
        age: 30,
        weight: 160,
        height: 175.3,
        activityLevel: "veryActive",
        goal: "maintain",
        dietType: "balanced",
        bodyFat: null,
        mealsPerDay: "6",
        showMetabolic: true,
        showProteinAnalysis: false,
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // TRANSLATIONS (English only)
  // ═══════════════════════════════════════════════════════════════
  t: {
    en: {
      name: "Macro Calculator",
      slug: "macro-calculator",
      subtitle:
        "Calculate your daily macros with dual BMR formulas, 8 diet types, custom ratios, protein analysis, and per-meal macro splitting — visualize your nutrition plan with our free macro calculator",
      breadcrumb: "Macros",

      // ─── SEO ───────────────────────────────────────────────────
      seo: {
        title: "Macro Calculator - Free IIFYM & TDEE Tool with Custom Ratios",
        description:
          "Calculate your daily protein, carbs and fat with Mifflin-St Jeor and Katch-McArdle formulas. 8 diet types, custom macros, protein per lb analysis, meal splitting, fiber and water recommendations — completely free.",
        shortDescription:
          "Calculate daily macros with dual BMR formulas, protein analysis, and 8 diet types",
        keywords: [
          "macro calculator",
          "macronutrient calculator",
          "IIFYM calculator",
          "TDEE macro calculator",
          "protein carbs fat calculator",
          "free macro calculator",
          "custom macro calculator",
          "meal macro calculator",
          "protein per pound calculator",
        ],
      },

      // ─── UI ────────────────────────────────────────────────────
      calculator: { yourInformation: "Your Information" },
      ui: {
        yourInformation: "Your Information",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      // ─── INPUTS ────────────────────────────────────────────────
      inputs: {
        gender: {
          label: "Gender",
          helpText: "BMR formulas differ by gender",
          options: { male: "Male", female: "Female" },
        },
        age: {
          label: "Age",
          helpText: "Age affects your basal metabolic rate",
        },
        weight: {
          label: "Weight",
          helpText: "Your current body weight",
        },
        height: {
          label: "Height",
          helpText: "Your height in any unit",
        },
        activityLevel: {
          label: "Activity Level",
          helpText: "How active are you on a typical week?",
          options: {
            sedentary: "Sedentary (office job, little exercise)",
            light: "Lightly Active (1-3 days/week)",
            moderate: "Moderately Active (3-5 days/week)",
            active: "Active (daily exercise or intense 3-4 days)",
            veryActive: "Very Active (intense 6-7 days/week)",
            extraActive: "Extra Active (athlete / physical job)",
          },
        },
        goal: {
          label: "Goal",
          helpText: "Your weight management objective",
          options: {
            lose2: "Lose Weight — Aggressive (2 lb/week)",
            lose1: "Lose Weight — Moderate (1 lb/week)",
            lose05: "Lose Weight — Mild (0.5 lb/week)",
            maintain: "Maintain Weight",
            gain05: "Gain Weight — Lean (0.5 lb/week)",
            gain1: "Gain Weight — Moderate (1 lb/week)",
            gain2: "Gain Weight — Aggressive (2 lb/week)",
          },
        },
        dietType: {
          label: "Diet Type",
          helpText:
            "Macro ratio preset — determines protein, carb, and fat split",
          options: {
            balanced: "Balanced (50/25/25) C/P/F",
            lowCarb: "Low Carb (30/35/35) C/P/F",
            highProtein: "High Protein (30/40/30) C/P/F",
            keto: "Keto (5/25/70) C/P/F",
            paleo: "Paleo (35/35/30) C/P/F",
            zone: "Zone (40/30/30) C/P/F",
            veganProtein: "High-Protein Vegan (35/40/25) C/P/F",
            custom: "Custom (set your own ratios)",
          },
        },
        customCarbs: {
          label: "Custom Carbs %",
          helpText: "Percentage of calories from carbohydrates",
        },
        customProtein: {
          label: "Custom Protein %",
          helpText: "Percentage of calories from protein",
        },
        customFat: {
          label: "Custom Fat %",
          helpText: "Percentage of calories from fat (auto-calculated)",
        },
        bodyFat: {
          label: "Body Fat %",
          helpText:
            "Optional — enables Katch-McArdle formula for more accurate BMR",
          placeholder: "e.g. 18",
        },
        mealsPerDay: {
          label: "Meals Per Day",
          helpText: "Number of meals for the splitting table",
          options: {
            "3": "3 meals",
            "4": "4 meals",
            "5": "5 meals",
            "6": "6 meals",
          },
        },
        showMetabolic: {
          label: "Show Metabolic Details",
          helpText: "Toggle on to see BMR, TDEE, and calorie adjustment breakdown",
        },
        showProteinAnalysis: {
          label: "Show Protein Analysis",
          helpText: "Toggle on to see protein per lb/kg, recommendation rating, and daily limits for sugar and saturated fat",
        },
      },

      // ─── INPUT GROUPS ──────────────────────────────────────────
      inputGroups: {},

      // ─── RESULTS ───────────────────────────────────────────────
      results: {
        dailyCalories: { label: "Daily Calories" },
        protein: { label: "Protein" },
        carbs: { label: "Carbohydrates" },
        fat: { label: "Fat" },
        proteinCal: { label: "Protein Calories" },
        carbsCal: { label: "Carb Calories" },
        fatCal: { label: "Fat Calories" },
        fiber: { label: "Daily Fiber" },
        water: { label: "Daily Water" },
        // Metabolic (toggle)
        bmrMifflin: { label: "BMR (Mifflin-St Jeor)" },
        bmrKatch: { label: "BMR (Katch-McArdle)" },
        tdee: { label: "TDEE" },
        calorieAdjustment: { label: "Calorie Adjustment" },
        // Protein analysis (toggle)
        proteinPerLb: { label: "Protein per lb" },
        proteinPerKg: { label: "Protein per kg" },
        proteinRating: { label: "Protein Rating" },
        maxSugar: { label: "Max Added Sugar" },
        maxSatFat: { label: "Max Saturated Fat" },
      },

      // ─── TOOLTIPS ──────────────────────────────────────────────
      tooltips: {
        dailyCalories:
          "Total daily calories adjusted for your goal (TDEE ± deficit/surplus)",
        protein:
          "Grams of protein per day — essential for muscle repair and satiety",
        carbs:
          "Grams of carbohydrates per day — your body's primary energy source",
        fat: "Grams of dietary fat per day — vital for hormones and nutrient absorption",
        proteinCal: "Calories from protein (4 cal per gram)",
        carbsCal: "Calories from carbohydrates (4 cal per gram)",
        fatCal: "Calories from fat (9 cal per gram)",
        fiber:
          "Recommended daily fiber intake based on IOM guidelines (14g per 1,000 cal)",
        water:
          "Recommended daily water intake based on body weight (~0.5 oz per lb)",
        bmrMifflin:
          "Basal Metabolic Rate calculated using Mifflin-St Jeor equation",
        bmrKatch:
          "Basal Metabolic Rate calculated using Katch-McArdle equation (requires body fat %)",
        tdee: "Total Daily Energy Expenditure = BMR × Activity Multiplier",
        calorieAdjustment:
          "The calorie surplus or deficit applied to your TDEE based on your goal",
        proteinPerLb:
          "Grams of protein per pound of body weight — key metric for athletes",
        proteinPerKg:
          "Grams of protein per kilogram of body weight — international standard",
        proteinRating:
          "How your protein intake compares to research-backed recommendations",
        maxSugar:
          "WHO recommends limiting added sugar to <25g/day (6 tsp) for health",
        maxSatFat:
          "AHA recommends limiting saturated fat to <10% of total calories",
      },

      // ─── PRESETS ───────────────────────────────────────────────
      presets: {
        cutMale: {
          label: "Cut (Male)",
          description:
            "25yo male, 180 lb, 5'10\", moderate activity, lose 1 lb/week",
        },
        cutFemale: {
          label: "Cut (Female)",
          description:
            "25yo female, 140 lb, 5'5\", moderate activity, lose 1 lb/week",
        },
        bulkMale: {
          label: "Bulk (Male)",
          description:
            "25yo male, 180 lb, 5'10\", very active, gain 1 lb/week",
        },
        bulkFemale: {
          label: "Bulk (Female)",
          description:
            "25yo female, 140 lb, 5'5\", very active, lean gain 0.5 lb/week",
        },
        ketoMale: {
          label: "Keto (Male)",
          description: "35yo male, 200 lb, 6'0\", keto diet, lose 1 lb/week",
        },
        veganAthlete: {
          label: "Vegan Athlete",
          description:
            "28yo female, 135 lb, 5'6\", active, high-protein vegan",
        },
        recomp: {
          label: "Body Recomp",
          description:
            "28yo male, 175 lb, 5'10\", active, high protein, maintain weight — all details ON",
        },
        endurance: {
          label: "Endurance Athlete",
          description:
            "30yo male, 160 lb, 5'9\", very active, balanced diet, 6 meals — metabolic ON",
        },
      },

      // ─── VALUES ────────────────────────────────────────────────
      values: {
        g: "g",
        kcal: "kcal",
        oz: "oz",
        L: "L",
        "N/A": "N/A",
        "Requires body fat %": "Requires body fat %",
        Breakfast: "Breakfast",
        Lunch: "Lunch",
        Dinner: "Dinner",
        Snack: "Snack",
        "Snack 1": "Snack 1",
        "Snack 2": "Snack 2",
        "Snack 3": "Snack 3",
        Total: "Total",
        "g/lb": "g/lb",
        "g/kg": "g/kg",
      },

      // ─── FORMATS ───────────────────────────────────────────────
      formats: {
        summary:
          "Your daily target is {dailyCalories} calories: {protein}g protein ({proteinPct}%), {carbs}g carbs ({carbsPct}%), {fat}g fat ({fatPct}%). Fiber: {fiber}g. Water: {water}.",
      },

      // ─── INFO CARDS ────────────────────────────────────────────
      infoCards: {
        macros: {
          title: "Your Daily Macros",
          items: [
            { label: "Daily Calories", valueKey: "dailyCalories" },
            { label: "Protein", valueKey: "protein" },
            { label: "Carbohydrates", valueKey: "carbs" },
            { label: "Fat", valueKey: "fat" },
          ],
        },
        calories: {
          title: "Calorie Breakdown",
          items: [
            { label: "Protein Calories", valueKey: "proteinCal" },
            { label: "Carb Calories", valueKey: "carbsCal" },
            { label: "Fat Calories", valueKey: "fatCal" },
            { label: "Total Calories", valueKey: "dailyCalories" },
          ],
        },
        tips: {
          title: "Pro Tips",
          items: [
            "Hit your protein target first — it's the most important macro for muscle and satiety",
            "Track fiber separately — aim for at least 25-35g per day from whole foods",
            "Stay hydrated — water intake affects energy, recovery, and digestion",
            "Adjust macros weekly based on progress — your body adapts over time",
          ],
        },
      },

      // ─── CHART ─────────────────────────────────────────────────
      chart: {
        title: "Macro Distribution",
        series: {
          protein: "Protein",
          carbs: "Carbohydrates",
          fat: "Fat",
        },
      },

      // ─── DETAILED TABLE ────────────────────────────────────────
      detailedTable: {
        mealSplit: {
          button: "View Meal Breakdown",
          title: "Per-Meal Macro Breakdown",
          columns: {
            meal: "Meal",
            protein: "Protein",
            carbs: "Carbs",
            fat: "Fat",
            calories: "Calories",
          },
        },
      },

      // ─── EDUCATION SECTIONS ────────────────────────────────────
      education: {
        whatAreMacros: {
          title: "What Are Macronutrients?",
          content:
            "Macronutrients (macros) are the three nutrients your body needs in large amounts: protein, carbohydrates, and fat. Unlike micronutrients (vitamins and minerals), macros provide energy and are measured in grams. Each macro serves a unique purpose: protein builds and repairs muscle, carbohydrates fuel your workouts and brain, and fat supports hormones and nutrient absorption. Tracking macros instead of just calories ensures you're getting the right balance of nutrients to support your specific goals — whether that's fat loss, muscle gain, or athletic performance.",
        },
        bmrFormulas: {
          title: "Mifflin-St Jeor vs Katch-McArdle",
          content:
            "This calculator uses two BMR formulas to give you the most accurate results. The Mifflin-St Jeor equation is the gold standard for most people — it's based on age, gender, weight, and height. The Katch-McArdle formula is more accurate if you know your body fat percentage because it calculates BMR based on lean body mass (muscle burns more calories than fat). If you enter a body fat percentage, the calculator will use Katch-McArdle and show both results side-by-side. For most people, the difference is 50-150 calories per day, which matters when you're trying to lose or gain weight.",
        },
        dietTypes: {
          title: "Diet Type Presets",
          items: [
            {
              text: "Balanced (50/25/25) — Equal carbs and fat, moderate protein. Best for general health and beginners.",
              type: "info",
            },
            {
              text: "Low Carb (30/35/35) — Reduced carbs, higher fat and protein. Good for fat loss without keto restrictions.",
              type: "info",
            },
            {
              text: "High Protein (30/40/30) — Increased protein for muscle building or preserving muscle while cutting.",
              type: "info",
            },
            {
              text: "Keto (5/25/70) — Very low carb, high fat. Designed for ketosis and fat adaptation.",
              type: "warning",
            },
            {
              text: "Paleo (35/35/30) — Balanced macros with whole foods emphasis. Mimics ancestral eating patterns.",
              type: "info",
            },
            {
              text: "Zone (40/30/30) — Barry Sears' Zone Diet. Balanced macros for stable blood sugar and energy.",
              type: "info",
            },
            {
              text: "Vegan Protein (35/40/25) — Higher protein for plant-based athletes. Requires strategic food choices.",
              type: "info",
            },
            {
              text: "Custom — Set your own ratios. Advanced users can dial in specific macro targets based on their needs.",
              type: "success",
            },
          ],
        },
        mealTiming: {
          title: "Meal Timing & Distribution",
          items: [
            {
              text: "Protein distribution matters — spread protein evenly across meals (20-40g per meal) for optimal muscle protein synthesis.",
              type: "info",
            },
            {
              text: "Post-workout nutrition — the meal splitting table emphasizes protein in meals around your training window.",
              type: "success",
            },
            {
              text: "Meal frequency is flexible — 3-6 meals per day works equally well. Choose what fits your schedule and hunger patterns.",
              type: "info",
            },
            {
              text: "Don't obsess over timing — total daily macros matter far more than precise meal timing for most people.",
              type: "warning",
            },
            {
              text: "Fiber at every meal — spreading fiber intake prevents digestive discomfort and stabilizes blood sugar.",
              type: "info",
            },
            {
              text: "Hydration strategy — drink 16-20 oz with each meal, plus extra during and after workouts.",
              type: "info",
            },
          ],
        },
        topFoods: {
          title: "Top 50 High-Protein Foods",
          description:
            "Hitting your protein target is easier when you know which foods pack the most protein per serving. Here are the top 50 high-protein foods across all categories:",
          examples: [
            {
              title: "Animal Proteins (per 100g cooked)",
              steps: [
                "Chicken breast: 31g protein, 165 cal (lean, versatile)",
                "Turkey breast: 30g protein, 135 cal (very lean)",
                "Tuna (canned): 30g protein, 116 cal (omega-3s)",
                "Salmon: 25g protein, 206 cal (omega-3s, vitamin D)",
                "Lean beef (sirloin): 26g protein, 183 cal (iron, B12)",
                "Pork tenderloin: 26g protein, 143 cal (lean cut)",
                "Shrimp: 24g protein, 99 cal (very low fat)",
                "Cod: 23g protein, 105 cal (white fish, mild)",
                "Eggs (2 large): 13g protein, 140 cal (complete amino acids)",
                "Greek yogurt (plain): 10g protein/100g, 59 cal (probiotics)",
              ],
              result:
                "Animal proteins provide complete amino acid profiles and are the easiest way to hit high protein targets.",
            },
            {
              title: "Plant Proteins (per 100g cooked)",
              steps: [
                "Seitan (wheat gluten): 25g protein, 370 cal (highest plant protein)",
                "Tempeh: 19g protein, 193 cal (fermented soy, probiotics)",
                "Tofu (firm): 17g protein, 144 cal (versatile, calcium)",
                "Edamame: 12g protein, 122 cal (whole soybeans)",
                "Lentils: 9g protein, 116 cal (fiber, iron)",
                "Chickpeas: 9g protein, 164 cal (fiber, versatile)",
                "Black beans: 9g protein, 132 cal (fiber, antioxidants)",
                "Quinoa: 4.4g protein, 120 cal (complete protein)",
                "Peanut butter (2 tbsp): 8g protein, 188 cal (healthy fats)",
                "Almonds (28g): 6g protein, 164 cal (vitamin E, fiber)",
              ],
              result:
                "Plant proteins often come with fiber and micronutrients but require combining sources for complete amino acids.",
            },
          ],
        },
        howToTrack: {
          title: "How to Track Your Macros",
          content:
            "Use a food tracking app like MyFitnessPal, Cronometer, or MacroFactor to log your meals. Weigh your food with a digital kitchen scale for the first 2-4 weeks until you can eyeball portions accurately. Pre-log your meals the night before or plan a full week using meal prep. Don't aim for perfection — hitting within 5-10g of each macro target is close enough. Focus on consistency over time rather than stressing about hitting exact numbers every single day. Track for at least 4-6 weeks before adjusting your macros, as your body needs time to adapt and show real trends.",
        },
      },

      // ─── FAQs ──────────────────────────────────────────────────
      faqs: [
        {
          question:
            "What's the difference between Mifflin-St Jeor and Katch-McArdle formulas?",
          answer:
            "Mifflin-St Jeor calculates BMR based on age, gender, weight, and height. It's accurate for most people and doesn't require knowing body fat percentage. Katch-McArdle uses lean body mass (total weight minus fat mass) and is more accurate if you know your body fat %. The difference is typically 50-150 calories per day. If you enter body fat %, the calculator will use Katch-McArdle; otherwise it defaults to Mifflin-St Jeor.",
        },
        {
          question: "Do I need to know my body fat % for accurate results?",
          answer:
            "No, body fat % is optional. The Mifflin-St Jeor formula (which doesn't need body fat %) is accurate for most people. However, if you're very lean (<15% men, <25% women) or have a lot of muscle mass, knowing your body fat % and using Katch-McArdle will give you 5-10% more accurate results. You can measure body fat with calipers, DEXA scan, or bioelectrical impedance scales.",
        },
        {
          question: "What if I can't hit my protein target every day?",
          answer:
            "Aim to hit your protein target 80% of the time (5-6 days per week). On days you fall short, try to get within 20g of your target. Protein is the most important macro for preserving muscle during fat loss and building muscle during a bulk. If you consistently struggle, try protein shakes, Greek yogurt, or lean meats at every meal. Remember: total weekly protein matters more than daily perfection.",
        },
        {
          question: "Should I eat different macros on rest days vs workout days?",
          answer:
            "For most people, keeping macros consistent every day is simpler and works just as well. However, advanced lifters sometimes use 'carb cycling' — eating more carbs on workout days and fewer carbs on rest days. If you want to try this, reduce carbs by 50-100g on rest days and replace those calories with fat. Keep protein the same every day regardless of training.",
        },
        {
          question: "Is it better to count macros or just count calories?",
          answer:
            "Counting macros is superior if you care about body composition (muscle vs fat). Calories determine whether you gain or lose weight, but macros determine whether that weight is muscle or fat. For example, losing weight on low protein means you'll lose more muscle. Gaining weight on low protein means more fat gain. If you're short on time, prioritize: 1) Total calories, 2) Protein, 3) Carbs and fat can be flexible.",
        },
        {
          question:
            "How do I track macros without getting obsessed or stressed?",
          answer:
            "Start with an 80/20 approach: track 80% of your meals (pre-planned meals) and be flexible with 20% (eating out, social events). Pre-log your day the night before so you're not constantly thinking about food. Use the same meals repeatedly — 'boring' meal plans are easier to track and stick to. Take diet breaks every 8-12 weeks where you just maintain weight without strict tracking. Remember: macros are a tool, not a lifestyle prison.",
        },
        {
          question:
            "What's the best macro split for building muscle (bulking)?",
          answer:
            "For muscle building, protein is king — aim for 0.8-1g per lb of body weight. The classic bulk split is 40% carbs, 30% protein, 30% fat, but you can push carbs higher (50%) if you train hard and need the energy. Don't go below 20% fat as it affects hormone production. Total calories matter most: eat 10-20% above your TDEE (300-500 cal surplus). Smaller surpluses mean slower, leaner gains; larger surpluses mean faster gains but more fat.",
        },
        {
          question: "Can I lose fat and gain muscle at the same time?",
          answer:
            "Yes, but only under specific conditions: you're a beginner lifter, returning after a break, or significantly overweight. This is called 'body recomposition.' Keep protein very high (1g per lb), eat at maintenance or a small deficit (-200 to -300 cal), and lift weights 3-5x per week. Progress is slower than pure cutting or bulking, but you improve body composition without extreme dieting. Most people see better results choosing one goal at a time.",
        },
        {
          question: "Why does the calculator recommend fiber and water?",
          answer:
            "Fiber (14g per 1,000 calories) improves digestion, keeps you full, and stabilizes blood sugar — especially important on high-protein diets. Water (0.5 oz per lb of body weight) prevents dehydration from increased protein intake, supports performance, and helps with appetite control. Most people under-consume both, which can sabotage fat loss and muscle building despite hitting macros perfectly.",
        },
        {
          question:
            "How often should I recalculate my macros as I lose or gain weight?",
          answer:
            "Recalculate every 10-15 lbs of weight change or every 8-12 weeks, whichever comes first. As you lose weight, your TDEE drops and you'll need to reduce calories to keep losing at the same rate. As you gain weight (muscle), your TDEE increases. Also recalculate if your activity level changes significantly (new job, training program, injury). Track your weight weekly and adjust if you're not seeing expected progress after 3-4 weeks.",
        },
        {
          question: "What does protein per lb/kg mean and what should I aim for?",
          answer:
            "Protein per lb (or kg) measures how much protein you eat relative to your body weight. Research suggests 0.7-1.0g per lb (1.6-2.2g per kg) for active people trying to build or maintain muscle. For fat loss, aim for 0.8-1.2g per lb to preserve muscle. For general health, 0.36g per lb (0.8g per kg) is the minimum RDA. The 'Protein Analysis' toggle shows exactly where your intake falls relative to these benchmarks.",
        },
      ],

      // ─── RATING ────────────────────────────────────────────────
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

      // ─── COMMON ────────────────────────────────────────────────
      common: { home: "Home", calculators: "Calculators" },

      // ─── BUTTONS ───────────────────────────────────────────────
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

      // ─── SHARE ─────────────────────────────────────────────────
      share: { calculatedWith: "Calculated with Kalcufy.com" },

      // ─── ACCESSIBILITY ─────────────────────────────────────────
      accessibility: {
        mobileResults: "Results",
        closeModal: "Close",
        openMenu: "Menu",
      },

      // ─── SOURCES ───────────────────────────────────────────────
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Calculadora de Macros",
      "slug": "calculadora-macronutrientes",
      "subtitle": "Calcula tus macros diarios con fórmulas de TMB duales, 8 tipos de dieta, proporciones personalizadas, análisis de proteínas y división por comidas — visualiza tu plan nutricional con nuestra calculadora gratuita de macros",
      "breadcrumb": "Macros",
      "seo": {
        "title": "Calculadora de Macros - Herramienta Gratuita IIFYM y TDEE con Proporciones Personalizadas",
        "description": "Calcula tus proteínas, carbohidratos y grasas diarias con las fórmulas Mifflin-St Jeor y Katch-McArdle. 8 tipos de dieta, macros personalizados, análisis de proteína por libra, división por comidas, recomendaciones de fibra y agua — completamente gratis.",
        "shortDescription": "Calcula macros diarios con fórmulas de TMB duales, análisis de proteínas y 8 tipos de dieta",
        "keywords": [
          "calculadora de macros",
          "calculadora de macronutrientes",
          "calculadora IIFYM",
          "calculadora de macros TDEE",
          "calculadora proteínas carbohidratos grasas",
          "calculadora de macros gratis",
          "calculadora de macros personalizada",
          "calculadora de macros por comida",
          "calculadora proteína por libra"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "gender": {
          "label": "Género",
          "helpText": "Las fórmulas de TMB difieren por género",
          "options": {
            "male": "Masculino",
            "female": "Femenino"
          }
        },
        "age": {
          "label": "Edad",
          "helpText": "La edad afecta tu tasa metabólica basal"
        },
        "weight": {
          "label": "Peso",
          "helpText": "Tu peso corporal actual"
        },
        "height": {
          "label": "Altura",
          "helpText": "Tu altura en cualquier unidad"
        },
        "activityLevel": {
          "label": "Nivel de Actividad",
          "helpText": "¿Qué tan activo eres en una semana típica?",
          "options": {
            "sedentary": "Sedentario (trabajo de oficina, poco ejercicio)",
            "light": "Ligeramente Activo (1-3 días/semana)",
            "moderate": "Moderadamente Activo (3-5 días/semana)",
            "active": "Activo (ejercicio diario o intenso 3-4 días)",
            "veryActive": "Muy Activo (intenso 6-7 días/semana)",
            "extraActive": "Extra Activo (atleta / trabajo físico)"
          }
        },
        "goal": {
          "label": "Objetivo",
          "helpText": "Tu objetivo de manejo de peso",
          "options": {
            "lose2": "Perder Peso — Agresivo (2 lb/semana)",
            "lose1": "Perder Peso — Moderado (1 lb/semana)",
            "lose05": "Perder Peso — Suave (0.5 lb/semana)",
            "maintain": "Mantener Peso",
            "gain05": "Ganar Peso — Magro (0.5 lb/semana)",
            "gain1": "Ganar Peso — Moderado (1 lb/semana)",
            "gain2": "Ganar Peso — Agresivo (2 lb/semana)"
          }
        },
        "dietType": {
          "label": "Tipo de Dieta",
          "helpText": "Preset de proporción de macros — determina la división de proteínas, carbohidratos y grasas",
          "options": {
            "balanced": "Balanceada (50/25/25) C/P/G",
            "lowCarb": "Baja en Carbohidratos (30/35/35) C/P/G",
            "highProtein": "Alta en Proteínas (30/40/30) C/P/G",
            "keto": "Keto (5/25/70) C/P/G",
            "paleo": "Paleo (35/35/30) C/P/G",
            "zone": "Zona (40/30/30) C/P/G",
            "veganProtein": "Vegana Alta en Proteínas (35/40/25) C/P/G",
            "custom": "Personalizada (establece tus propias proporciones)"
          }
        },
        "customCarbs": {
          "label": "Carbohidratos Personalizados %",
          "helpText": "Porcentaje de calorías de carbohidratos"
        },
        "customProtein": {
          "label": "Proteínas Personalizadas %",
          "helpText": "Porcentaje de calorías de proteínas"
        },
        "customFat": {
          "label": "Grasas Personalizadas %",
          "helpText": "Porcentaje de calorías de grasas (calculado automáticamente)"
        },
        "bodyFat": {
          "label": "Grasa Corporal %",
          "helpText": "Opcional — habilita la fórmula Katch-McArdle para un TMB más preciso",
          "placeholder": "ej. 18"
        },
        "mealsPerDay": {
          "label": "Comidas por Día",
          "helpText": "Número de comidas para la tabla de división",
          "options": {
            "3": "3 comidas",
            "4": "4 comidas",
            "5": "5 comidas",
            "6": "6 comidas"
          }
        },
        "showMetabolic": {
          "label": "Mostrar Detalles Metabólicos",
          "helpText": "Activa para ver el desglose de TMB, TDEE y ajuste de calorías"
        },
        "showProteinAnalysis": {
          "label": "Mostrar Análisis de Proteínas",
          "helpText": "Activa para ver proteína por lb/kg, calificación de recomendación y límites diarios de azúcar y grasa saturada"
        }
      },
      "inputGroups": {},
      "results": {
        "dailyCalories": {
          "label": "Calorías Diarias"
        },
        "protein": {
          "label": "Proteínas"
        },
        "carbs": {
          "label": "Carbohidratos"
        },
        "fat": {
          "label": "Grasas"
        },
        "proteinCal": {
          "label": "Calorías de Proteínas"
        },
        "carbsCal": {
          "label": "Calorías de Carbohidratos"
        },
        "fatCal": {
          "label": "Calorías de Grasas"
        },
        "fiber": {
          "label": "Fibra Diaria"
        },
        "water": {
          "label": "Agua Diaria"
        },
        "bmrMifflin": {
          "label": "TMB (Mifflin-St Jeor)"
        },
        "bmrKatch": {
          "label": "TMB (Katch-McArdle)"
        },
        "tdee": {
          "label": "TDEE"
        },
        "calorieAdjustment": {
          "label": "Ajuste Calórico"
        },
        "proteinPerLb": {
          "label": "Proteína por lb"
        },
        "proteinPerKg": {
          "label": "Proteína por kg"
        },
        "proteinRating": {
          "label": "Calificación de Proteína"
        },
        "maxSugar": {
          "label": "Máx. Azúcar Añadido"
        },
        "maxSatFat": {
          "label": "Máx. Grasa Saturada"
        }
      },
      "tooltips": {
        "dailyCalories": "Calorías diarias totales ajustadas para tu objetivo (TDEE ± déficit/superávit)",
        "protein": "Gramos de proteína por día — esencial para la reparación muscular y saciedad",
        "carbs": "Gramos de carbohidratos por día — la fuente primaria de energía de tu cuerpo",
        "fat": "Gramos de grasa dietética por día — vital para hormonas y absorción de nutrientes",
        "proteinCal": "Calorías de proteínas (4 cal por gramo)",
        "carbsCal": "Calorías de carbohidratos (4 cal por gramo)",
        "fatCal": "Calorías de grasas (9 cal por gramo)",
        "fiber": "Ingesta diaria recomendada de fibra basada en las guías IOM (14g por 1,000 cal)",
        "water": "Ingesta diaria recomendada de agua basada en peso corporal (~0.5 oz por lb)",
        "bmrMifflin": "Tasa Metabólica Basal calculada usando la ecuación Mifflin-St Jeor",
        "bmrKatch": "Tasa Metabólica Basal calculada usando la ecuación Katch-McArdle (requiere % de grasa corporal)",
        "tdee": "Gasto Energético Diario Total = TMB × Multiplicador de Actividad",
        "calorieAdjustment": "El superávit o déficit calórico aplicado a tu TDEE basado en tu objetivo",
        "proteinPerLb": "Gramos de proteína por libra de peso corporal — métrica clave para atletas",
        "proteinPerKg": "Gramos de proteína por kilogramo de peso corporal — estándar internacional",
        "proteinRating": "Cómo se compara tu ingesta de proteína con las recomendaciones basadas en investigación",
        "maxSugar": "La OMS recomienda limitar el azúcar añadido a <25g/día (6 cditas) para la salud",
        "maxSatFat": "La AHA recomienda limitar la grasa saturada a <10% del total de calorías"
      },
      "presets": {
        "cutMale": {
          "label": "Definición (Hombre)",
          "description": "Hombre de 25 años, 180 lb, 5'10\", actividad moderada, perder 1 lb/semana"
        },
        "cutFemale": {
          "label": "Definición (Mujer)",
          "description": "Mujer de 25 años, 140 lb, 5'5\", actividad moderada, perder 1 lb/semana"
        },
        "bulkMale": {
          "label": "Volumen (Hombre)",
          "description": "Hombre de 25 años, 180 lb, 5'10\", muy activo, ganar 1 lb/semana"
        },
        "bulkFemale": {
          "label": "Volumen (Mujer)",
          "description": "Mujer de 25 años, 140 lb, 5'5\", muy activa, ganancia magra 0.5 lb/semana"
        },
        "ketoMale": {
          "label": "Keto (Hombre)",
          "description": "Hombre de 35 años, 200 lb, 6'0\", dieta keto, perder 1 lb/semana"
        },
        "veganAthlete": {
          "label": "Atleta Vegano",
          "description": "Mujer de 28 años, 135 lb, 5'6\", activa, vegana alta en proteínas"
        },
        "recomp": {
          "label": "Recomposición Corporal",
          "description": "Hombre de 28 años, 175 lb, 5'10\", activo, proteína alta, mantener peso — todos los detalles ACTIVADOS"
        },
        "endurance": {
          "label": "Atleta de Resistencia",
          "description": "Hombre de 30 años, 160 lb, 5'9\", muy activo, dieta balanceada, 6 comidas — metabólico ACTIVADO"
        }
      },
      "values": {
        "g": "g",
        "kcal": "kcal",
        "oz": "oz",
        "L": "L",
        "N/A": "N/A",
        "Requires body fat %": "Requiere % de grasa corporal",
        "Breakfast": "Desayuno",
        "Lunch": "Almuerzo",
        "Dinner": "Cena",
        "Snack": "Merienda",
        "Snack 1": "Merienda 1",
        "Snack 2": "Merienda 2",
        "Snack 3": "Merienda 3",
        "Total": "Total",
        "g/lb": "g/lb",
        "g/kg": "g/kg"
      },
      "formats": {
        "summary": "Tu objetivo diario es {dailyCalories} calorías: {protein}g proteínas ({proteinPct}%), {carbs}g carbohidratos ({carbsPct}%), {fat}g grasas ({fatPct}%). Fibra: {fiber}g. Agua: {water}."
      },
      "infoCards": {
        "macros": {
          "title": "Tus Macros Diarios",
          "items": [
            {
              "label": "Calorías Diarias",
              "valueKey": "dailyCalories"
            },
            {
              "label": "Proteínas",
              "valueKey": "protein"
            },
            {
              "label": "Carbohidratos",
              "valueKey": "carbs"
            },
            {
              "label": "Grasas",
              "valueKey": "fat"
            }
          ]
        },
        "calories": {
          "title": "Desglose de Calorías",
          "items": [
            {
              "label": "Calorías de Proteínas",
              "valueKey": "proteinCal"
            },
            {
              "label": "Calorías de Carbohidratos",
              "valueKey": "carbsCal"
            },
            {
              "label": "Calorías de Grasas",
              "valueKey": "fatCal"
            },
            {
              "label": "Calorías Totales",
              "valueKey": "dailyCalories"
            }
          ]
        },
        "tips": {
          "title": "Consejos Pro",
          "items": [
            "Alcanza tu objetivo de proteína primero — es el macro más importante para músculo y saciedad",
            "Rastrea la fibra por separado — apunta a al menos 25-35g por día de alimentos integrales",
            "Mantente hidratado — la ingesta de agua afecta energía, recuperación y digestión",
            "Ajusta los macros semanalmente según el progreso — tu cuerpo se adapta con el tiempo"
          ]
        }
      },
      "chart": {
        "title": "Distribución de Macros",
        "series": {
          "protein": "Proteínas",
          "carbs": "Carbohidratos",
          "fat": "Grasas"
        }
      },
      "detailedTable": {
        "mealSplit": {
          "button": "Ver Desglose por Comida",
          "title": "Desglose de Macros por Comida",
          "columns": {
            "meal": "Comida",
            "protein": "Proteínas",
            "carbs": "Carbohidratos",
            "fat": "Grasas",
            "calories": "Calorías"
          }
        }
      },
      "education": {
        "whatAreMacros": {
          "title": "¿Qué son los Macronutrientes?",
          "content": "Los macronutrientes (macros) son los tres nutrientes que tu cuerpo necesita en grandes cantidades: proteínas, carbohidratos y grasas. A diferencia de los micronutrientes (vitaminas y minerales), los macros proporcionan energía y se miden en gramos. Cada macro cumple un propósito único: las proteínas construyen y reparan músculo, los carbohidratos alimentan tus entrenamientos y cerebro, y las grasas apoyan las hormonas y absorción de nutrientes. Rastrear macros en lugar de solo calorías asegura que obtienes el equilibrio correcto de nutrientes para apoyar tus objetivos específicos — ya sea pérdida de grasa, ganancia muscular o rendimiento atlético."
        },
        "bmrFormulas": {
          "title": "Mifflin-St Jeor vs Katch-McArdle",
          "content": "Esta calculadora usa dos fórmulas de TMB para darte los resultados más precisos. La ecuación Mifflin-St Jeor es el estándar de oro para la mayoría de personas — se basa en edad, género, peso y altura. La fórmula Katch-McArdle es más precisa si conoces tu porcentaje de grasa corporal porque calcula el TMB basado en masa corporal magra (el músculo quema más calorías que la grasa). Si ingresas un porcentaje de grasa corporal, la calculadora usará Katch-McArdle y mostrará ambos resultados lado a lado. Para la mayoría de personas, la diferencia es de 50-150 calorías por día, lo cual importa cuando intentas perder o ganar peso."
        },
        "dietTypes": {
          "title": "Presets de Tipos de Dieta",
          "items": [
            {
              "text": "Balanceada (50/25/25) — Carbohidratos y grasas iguales, proteína moderada. Mejor para salud general y principiantes.",
              "type": "info"
            },
            {
              "text": "Baja en Carbohidratos (30/35/35) — Carbohidratos reducidos, mayor grasa y proteína. Buena para pérdida de grasa sin restricciones keto.",
              "type": "info"
            },
            {
              "text": "Alta en Proteínas (30/40/30) — Proteína aumentada para construcción muscular o preservar músculo durante definición.",
              "type": "info"
            },
            {
              "text": "Keto (5/25/70) — Muy baja en carbohidratos, alta en grasas. Diseñada para cetosis y adaptación a grasas.",
              "type": "warning"
            },
            {
              "text": "Paleo (35/35/30) — Macros balanceados con énfasis en alimentos integrales. Imita patrones de alimentación ancestrales.",
              "type": "info"
            },
            {
              "text": "Zona (40/30/30) — Dieta de la Zona de Barry Sears. Macros balanceados para azúcar en sangre y energía estables.",
              "type": "info"
            },
            {
              "text": "Vegana Proteica (35/40/25) — Mayor proteína para atletas basados en plantas. Requiere elecciones alimentarias estratégicas.",
              "type": "info"
            },
            {
              "text": "Personalizada — Establece tus propias proporciones. Usuarios avanzados pueden ajustar objetivos de macros específicos según sus necesidades.",
              "type": "success"
            }
          ]
        },
        "mealTiming": {
          "title": "Horario y Distribución de Comidas",
          "items": [
            {
              "text": "La distribución de proteína importa — distribuye la proteína uniformemente entre comidas (20-40g por comida) para síntesis óptima de proteína muscular.",
              "type": "info"
            },
            {
              "text": "Nutrición post-entreno — la tabla de división de comidas enfatiza proteína en comidas alrededor de tu ventana de entrenamiento.",
              "type": "success"
            },
            {
              "text": "La frecuencia de comidas es flexible — 3-6 comidas por día funcionan igualmente bien. Elige lo que se ajuste a tu horario y patrones de hambre.",
              "type": "info"
            },
            {
              "text": "No te obsesiones con el horario — los macros diarios totales importan mucho más que el horario preciso de comidas para la mayoría de personas.",
              "type": "warning"
            },
            {
              "text": "Fibra en cada comida — distribuir la ingesta de fibra previene molestias digestivas y estabiliza el azúcar en sangre.",
              "type": "info"
            },
            {
              "text": "Estrategia de hidratación — bebe 16-20 oz con cada comida, más extra durante y después de entrenamientos.",
              "type": "info"
            }
          ]
        },
        "topFoods": {
          "title": "Los 50 Mejores Alimentos Altos en Proteínas",
          "description": "Alcanzar tu objetivo de proteína es más fácil cuando sabes qué alimentos contienen más proteína por porción. Aquí están los 50 mejores alimentos altos en proteínas en todas las categorías:",
          "examples": [
            {
              "title": "Proteínas Animales (por 100g cocido)",
              "steps": [
                "Pechuga de pollo: 31g proteína, 165 cal (magra, versátil)",
                "Pechuga de pavo: 30g proteína, 135 cal (muy magra)",
                "Atún (enlatado): 30g proteína, 116 cal (omega-3)",
                "Salmón: 25g proteína, 206 cal (omega-3, vitamina D)",
                "Carne magra (solomillo): 26g proteína, 183 cal (hierro, B12)",
                "Lomo de cerdo: 26g proteína, 143 cal (corte magro)",
                "Camarones: 24g proteína, 99 cal (muy baja grasa)",
                "Bacalao: 23g proteína, 105 cal (pescado blanco, suave)",
                "Huevos (2 grandes): 13g proteína, 140 cal (aminoácidos completos)",
                "Yogur griego (natural): 10g proteína/100g, 59 cal (probióticos)"
              ],
              "result": "Las proteínas animales proporcionan perfiles completos de aminoácidos y son la forma más fácil de alcanzar objetivos altos de proteína."
            },
            {
              "title": "Proteínas Vegetales (por 100g cocido)",
              "steps": [
                "Seitán (gluten de trigo): 25g proteína, 370 cal (mayor proteína vegetal)",
                "Tempeh: 19g proteína, 193 cal (soja fermentada, probióticos)",
                "Tofu (firme): 17g proteína, 144 cal (versátil, calcio)",
                "Edamame: 12g proteína, 122 cal (soja entera)",
                "Lentejas: 9g proteína, 116 cal (fibra, hierro)",
                "Garbanzos: 9g proteína, 164 cal (fibra, versátil)",
                "Frijoles negros: 9g proteína, 132 cal (fibra, antioxidantes)",
                "Quinoa: 4.4g proteína, 120 cal (proteína completa)",
                "Mantequilla de maní (2 cdas): 8g proteína, 188 cal (grasas saludables)",
                "Almendras (28g): 6g proteína, 164 cal (vitamina E, fibra)"
              ],
              "result": "Las proteínas vegetales a menudo vienen con fibra y micronutrientes pero requieren combinar fuentes para aminoácidos completos."
            }
          ]
        },
        "howToTrack": {
          "title": "Cómo Rastrear tus Macros",
          "content": "Usa una app de seguimiento alimentario como MyFitnessPal, Cronometer o MacroFactor para registrar tus comidas. Pesa tu comida con una báscula digital de cocina las primeras 2-4 semanas hasta que puedas calcular porciones a ojo. Pre-registra tus comidas la noche anterior o planifica una semana completa usando preparación de comidas. No busques la perfección — llegar dentro de 5-10g de cada objetivo macro es suficientemente cerca. Enfócate en consistencia a través del tiempo en lugar de estresarte por alcanzar números exactos cada día. Rastrea por al menos 4-6 semanas antes de ajustar tus macros, ya que tu cuerpo necesita tiempo para adaptarse y mostrar tendencias reales."
        }
      },
      "faqs": [
        {
          "question": "¿Cuál es la diferencia entre las fórmulas Mifflin-St Jeor y Katch-McArdle?",
          "answer": "Mifflin-St Jeor calcula el TMB basado en edad, género, peso y altura. Es precisa para la mayoría de personas y no requiere conocer el porcentaje de grasa corporal. Katch-McArdle usa masa corporal magra (peso total menos masa grasa) y es más precisa si conoces tu % de grasa corporal. La diferencia típicamente es 50-150 calorías por día. Si ingresas grasa corporal %, la calculadora usará Katch-McArdle; de lo contrario usa Mifflin-St Jeor por defecto."
        },
        {
          "question": "¿Necesito conocer mi % de grasa corporal para resultados precisos?",
          "answer": "No, el % de grasa corporal es opcional. La fórmula Mifflin-St Jeor (que no necesita % de grasa corporal) es precisa para la mayoría de personas. Sin embargo, si eres muy delgado (<15% hombres, <25% mujeres) o tienes mucha masa muscular, conocer tu % de grasa corporal y usar Katch-McArdle te dará resultados 5-10% más precisos. Puedes medir grasa corporal con calibres, escaneo DEXA o básculas de impedancia bioeléctrica."
        },
        {
          "question": "¿Qué pasa si no puedo alcanzar mi objetivo de proteína todos los días?",
          "answer": "Apunta a alcanzar tu objetivo de proteína el 80% del tiempo (5-6 días por semana). En días que te quedas corto, trata de llegar dentro de 20g de tu objetivo. La proteína es el macro más importante para preservar músculo durante pérdida de grasa y construir músculo durante volumen. Si constantemente luchas, prueba batidos de proteína, yogur griego o carnes magras en cada comida. Recuerda: la proteína total semanal importa más que la perfección diaria."
        },
        {
          "question": "¿Debo comer diferentes macros en días de descanso vs días de entrenamiento?",
          "answer": "Para la mayoría de personas, mantener los macros consistentes todos los días es más simple y funciona igual de bien. Sin embargo, levantadores avanzados a veces usan 'ciclado de carbohidratos' — comiendo más carbohidratos en días de entrenamiento y menos carbohidratos en días de descanso. Si quieres probar esto, reduce carbohidratos por 50-100g en días de descanso y reemplaza esas calorías con grasa. Mantén la proteína igual todos los días independientemente del entrenamiento."
        },
        {
          "question": "¿Es mejor contar macros o solo contar calorías?",
          "answer": "Contar macros es superior si te preocupa la composición corporal (músculo vs grasa). Las calorías determinan si ganas o pierdes peso, pero los macros determinan si ese peso es músculo o grasa. Por ejemplo, perder peso con proteína baja significa que perderás más músculo. Ganar peso con proteína baja significa más ganancia de grasa. Si tienes poco tiempo, prioriza: 1) Calorías totales, 2) Proteína, 3) Carbohidratos y grasas pueden ser flexibles."
        },
        {
          "question": "¿Cómo rastro macros sin obsesionarme o estresarme?",
          "answer": "Comienza con un enfoque 80/20: rastrea 80% de tus comidas (comidas pre-planificadas) y sé flexible con 20% (comer fuera, eventos sociales). Pre-registra tu día la noche anterior para no estar constantemente pensando en comida. Usa las mismas comidas repetidamente — planes de comida 'aburridos' son más fáciles de rastrear y seguir. Toma descansos de dieta cada 8-12 semanas donde solo mantienes peso sin rastreo estricto. Recuerda: los macros son una herramienta, no una prisión de estilo de vida."
        },
        {
          "question": "¿Cuál es la mejor división de macros para construir músculo (volumen)?",
          "answer": "Para construcción muscular, la proteína es rey — apunta a 0.8-1g por lb de peso corporal. La división clásica de volumen es 40% carbohidratos, 30% proteína, 30% grasa, pero puedes empujar los carbohidratos más alto (50%) si entrenas duro y necesitas la energía. No bajes de 20% grasa ya que afecta la producción hormonal. Las calorías totales importan más: come 10-20% sobre tu TDEE (300-500 cal de superávit). Superávits más pequeños significan ganancias más lentas y magras; superávits más grandes significan ganancias más rápidas pero más grasa."
        },
        {
          "question": "¿Puedo perder grasa y ganar músculo al mismo tiempo?",
          "answer": "Sí, pero solo bajo condiciones específicas: eres un levantador principiante, regresando después de un descanso, o significativamente con sobrepeso. Esto se llama 'recomposición corporal.' Mantén la proteína muy alta (1g por lb), come en mantenimiento o un déficit pequeño (-200 a -300 cal), y levanta pesas 3-5x por semana. El progreso es más lento que definición o volumen puro, pero mejoras la composición corporal sin dieta extrema. La mayoría de personas ven mejores resultados eligiendo un objetivo a la vez."
        },
        {
          "question": "¿Por qué la calculadora recomienda fibra y agua?",
          "answer": "La fibra (14g por 1,000 calorías) mejora la digestión, te mantiene lleno y estabiliza el azúcar en sangre — especialmente importante en dietas altas en proteína. El agua (0.5 oz por lb de peso corporal) previene deshidratación por ingesta aumentada de proteína, apoya el rendimiento y ayuda con control del apetito. La mayoría de personas consume poco de ambos, lo cual puede sabotear la pérdida de grasa y construcción muscular a pesar de alcanzar los macros perfectamente."
        },
        {
          "question": "¿Con qué frecuencia debo recalcular mis macros mientras pierdo o gano peso?",
          "answer": "Recalcula cada 10-15 lbs de cambio de peso o cada 8-12 semanas, lo que ocurra primero. Mientras pierdes peso, tu TDEE baja y necesitarás reducir calorías para seguir perdiendo a la misma velocidad. Mientras ganas peso (músculo), tu TDEE aumenta. También recalcula si tu nivel de actividad cambia significativamente (nuevo trabajo, programa de entrenamiento, lesión). Rastrea tu peso semanalmente y ajusta si no ves el progreso esperado después de 3-4 semanas."
        },
        {
          "question": "¿Qué significa proteína por lb/kg y a qué debo apuntar?",
          "answer": "Proteína por lb (o kg) mide cuánta proteína comes relativa a tu peso corporal. La investigación sugiere 0.7-1.0g por lb (1.6-2.2g por kg) para personas activas tratando de construir o mantener músculo. Para pérdida de grasa, apunta a 0.8-1.2g por lb para preservar músculo. Para salud general, 0.36g por lb (0.8g por kg) es el mínimo RDA. El toggle 'Análisis de Proteína' muestra exactamente dónde cae tu ingesta relativa a estos puntos de referencia."
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
      "name": "Calculadora de Macros",
      "slug": "calculadora-macronutrientes",
      "subtitle": "Calcule seus macros diários com duplas fórmulas de TMB, 8 tipos de dieta, proporções personalizadas, análise de proteína e divisão de macros por refeição — visualize seu plano nutricional com nossa calculadora gratuita de macros",
      "breadcrumb": "Macros",
      "seo": {
        "title": "Calculadora de Macros - Ferramenta Gratuita IIFYM & TDEE com Proporções Personalizadas",
        "description": "Calcule sua proteína, carboidratos e gordura diários com fórmulas Mifflin-St Jeor e Katch-McArdle. 8 tipos de dieta, macros personalizados, análise de proteína por kg, divisão de refeições, recomendações de fibra e água — completamente gratuito.",
        "shortDescription": "Calcule macros diários com duplas fórmulas de TMB, análise de proteína e 8 tipos de dieta",
        "keywords": [
          "calculadora de macros",
          "calculadora de macronutrientes",
          "calculadora IIFYM",
          "calculadora TDEE macros",
          "calculadora proteina carboidratos gordura",
          "calculadora macros gratuita",
          "calculadora macros personalizada",
          "calculadora macros refeição",
          "calculadora proteina por quilo"
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
          "helpText": "A idade afeta sua taxa metabólica basal"
        },
        "weight": {
          "label": "Peso",
          "helpText": "Seu peso corporal atual"
        },
        "height": {
          "label": "Altura",
          "helpText": "Sua altura em qualquer unidade"
        },
        "activityLevel": {
          "label": "Nível de Atividade",
          "helpText": "Quão ativo você é em uma semana típica?",
          "options": {
            "sedentary": "Sedentário (trabalho escritório, pouco exercício)",
            "light": "Levemente Ativo (1-3 dias/semana)",
            "moderate": "Moderadamente Ativo (3-5 dias/semana)",
            "active": "Ativo (exercício diário ou intenso 3-4 dias)",
            "veryActive": "Muito Ativo (intenso 6-7 dias/semana)",
            "extraActive": "Extra Ativo (atleta / trabalho físico)"
          }
        },
        "goal": {
          "label": "Objetivo",
          "helpText": "Seu objetivo de controle de peso",
          "options": {
            "lose2": "Perder Peso — Agressivo (1 kg/semana)",
            "lose1": "Perder Peso — Moderado (0,5 kg/semana)",
            "lose05": "Perder Peso — Suave (0,25 kg/semana)",
            "maintain": "Manter Peso",
            "gain05": "Ganhar Peso — Magro (0,25 kg/semana)",
            "gain1": "Ganhar Peso — Moderado (0,5 kg/semana)",
            "gain2": "Ganhar Peso — Agressivo (1 kg/semana)"
          }
        },
        "dietType": {
          "label": "Tipo de Dieta",
          "helpText": "Preset de proporção de macros — determina a divisão de proteína, carboidratos e gordura",
          "options": {
            "balanced": "Equilibrada (50/25/25) C/P/G",
            "lowCarb": "Baixo Carbo (30/35/35) C/P/G",
            "highProtein": "Alta Proteína (30/40/30) C/P/G",
            "keto": "Cetogênica (5/25/70) C/P/G",
            "paleo": "Paleo (35/35/30) C/P/G",
            "zone": "Zone (40/30/30) C/P/G",
            "veganProtein": "Vegana Alta Proteína (35/40/25) C/P/G",
            "custom": "Personalizada (defina suas próprias proporções)"
          }
        },
        "customCarbs": {
          "label": "Carboidratos Personalizados %",
          "helpText": "Porcentagem de calorias dos carboidratos"
        },
        "customProtein": {
          "label": "Proteína Personalizada %",
          "helpText": "Porcentagem de calorias da proteína"
        },
        "customFat": {
          "label": "Gordura Personalizada %",
          "helpText": "Porcentagem de calorias da gordura (calculado automaticamente)"
        },
        "bodyFat": {
          "label": "Gordura Corporal %",
          "helpText": "Opcional — permite fórmula Katch-McArdle para TMB mais precisa",
          "placeholder": "ex. 18"
        },
        "mealsPerDay": {
          "label": "Refeições Por Dia",
          "helpText": "Número de refeições para a tabela de divisão",
          "options": {
            "3": "3 refeições",
            "4": "4 refeições",
            "5": "5 refeições",
            "6": "6 refeições"
          }
        },
        "showMetabolic": {
          "label": "Mostrar Detalhes Metabólicos",
          "helpText": "Ativar para ver TMB, TDEE e detalhamento do ajuste calórico"
        },
        "showProteinAnalysis": {
          "label": "Mostrar Análise de Proteína",
          "helpText": "Ativar para ver proteína por kg, classificação da recomendação e limites diários para açúcar e gordura saturada"
        }
      },
      "inputGroups": {},
      "results": {
        "dailyCalories": {
          "label": "Calorias Diárias"
        },
        "protein": {
          "label": "Proteína"
        },
        "carbs": {
          "label": "Carboidratos"
        },
        "fat": {
          "label": "Gordura"
        },
        "proteinCal": {
          "label": "Calorias da Proteína"
        },
        "carbsCal": {
          "label": "Calorias dos Carboidratos"
        },
        "fatCal": {
          "label": "Calorias da Gordura"
        },
        "fiber": {
          "label": "Fibra Diária"
        },
        "water": {
          "label": "Água Diária"
        },
        "bmrMifflin": {
          "label": "TMB (Mifflin-St Jeor)"
        },
        "bmrKatch": {
          "label": "TMB (Katch-McArdle)"
        },
        "tdee": {
          "label": "TDEE"
        },
        "calorieAdjustment": {
          "label": "Ajuste Calórico"
        },
        "proteinPerLb": {
          "label": "Proteína por lb"
        },
        "proteinPerKg": {
          "label": "Proteína por kg"
        },
        "proteinRating": {
          "label": "Classificação da Proteína"
        },
        "maxSugar": {
          "label": "Açúcar Adicionado Máximo"
        },
        "maxSatFat": {
          "label": "Gordura Saturada Máxima"
        }
      },
      "tooltips": {
        "dailyCalories": "Total de calorias diárias ajustadas para seu objetivo (TDEE ± déficit/superávit)",
        "protein": "Gramas de proteína por dia — essencial para reparação muscular e saciedade",
        "carbs": "Gramas de carboidratos por dia — principal fonte de energia do seu corpo",
        "fat": "Gramas de gordura dietética por dia — vital para hormônios e absorção de nutrientes",
        "proteinCal": "Calorias da proteína (4 cal por grama)",
        "carbsCal": "Calorias dos carboidratos (4 cal por grama)",
        "fatCal": "Calorias da gordura (9 cal por grama)",
        "fiber": "Ingestão diária recomendada de fibra baseada nas diretrizes IOM (14g por 1.000 cal)",
        "water": "Ingestão diária recomendada de água baseada no peso corporal (~15 ml por kg)",
        "bmrMifflin": "Taxa Metabólica Basal calculada usando equação Mifflin-St Jeor",
        "bmrKatch": "Taxa Metabólica Basal calculada usando equação Katch-McArdle (requer % de gordura corporal)",
        "tdee": "Gasto Energético Diário Total = TMB × Multiplicador de Atividade",
        "calorieAdjustment": "O superávit ou déficit calórico aplicado ao seu TDEE baseado no seu objetivo",
        "proteinPerLb": "Gramas de proteína por libra de peso corporal — métrica chave para atletas",
        "proteinPerKg": "Gramas de proteína por quilograma de peso corporal — padrão internacional",
        "proteinRating": "Como sua ingestão de proteína se compara às recomendações baseadas em pesquisa",
        "maxSugar": "OMS recomenda limitar açúcar adicionado a <25g/dia (6 colheres de chá) para saúde",
        "maxSatFat": "AHA recomenda limitar gordura saturada a <10% do total de calorias"
      },
      "presets": {
        "cutMale": {
          "label": "Corte (Masculino)",
          "description": "Homem 25 anos, 82 kg, 1,78m, atividade moderada, perder 0,5 kg/semana"
        },
        "cutFemale": {
          "label": "Corte (Feminino)",
          "description": "Mulher 25 anos, 64 kg, 1,65m, atividade moderada, perder 0,5 kg/semana"
        },
        "bulkMale": {
          "label": "Bulk (Masculino)",
          "description": "Homem 25 anos, 82 kg, 1,78m, muito ativo, ganhar 0,5 kg/semana"
        },
        "bulkFemale": {
          "label": "Bulk (Feminino)",
          "description": "Mulher 25 anos, 64 kg, 1,65m, muito ativa, ganho magro 0,25 kg/semana"
        },
        "ketoMale": {
          "label": "Cetogênica (Masculino)",
          "description": "Homem 35 anos, 91 kg, 1,83m, dieta cetogênica, perder 0,5 kg/semana"
        },
        "veganAthlete": {
          "label": "Atleta Vegano",
          "description": "Mulher 28 anos, 61 kg, 1,68m, ativa, vegana alta proteína"
        },
        "recomp": {
          "label": "Recomposição Corporal",
          "description": "Homem 28 anos, 79 kg, 1,78m, ativo, alta proteína, manter peso — todos detalhes ATIVADOS"
        },
        "endurance": {
          "label": "Atleta de Resistência",
          "description": "Homem 30 anos, 73 kg, 1,75m, muito ativo, dieta equilibrada, 6 refeições — metabólico ATIVADO"
        }
      },
      "values": {
        "g": "g",
        "kcal": "kcal",
        "oz": "ml",
        "L": "L",
        "N/A": "N/D",
        "Requires body fat %": "Requer % de gordura corporal",
        "Breakfast": "Café da Manhã",
        "Lunch": "Almoço",
        "Dinner": "Jantar",
        "Snack": "Lanche",
        "Snack 1": "Lanche 1",
        "Snack 2": "Lanche 2",
        "Snack 3": "Lanche 3",
        "Total": "Total",
        "g/lb": "g/lb",
        "g/kg": "g/kg"
      },
      "formats": {
        "summary": "Sua meta diária é {dailyCalories} calorias: {protein}g proteína ({proteinPct}%), {carbs}g carboidratos ({carbsPct}%), {fat}g gordura ({fatPct}%). Fibra: {fiber}g. Água: {water}."
      },
      "infoCards": {
        "macros": {
          "title": "Seus Macros Diários",
          "items": [
            {
              "label": "Calorias Diárias",
              "valueKey": "dailyCalories"
            },
            {
              "label": "Proteína",
              "valueKey": "protein"
            },
            {
              "label": "Carboidratos",
              "valueKey": "carbs"
            },
            {
              "label": "Gordura",
              "valueKey": "fat"
            }
          ]
        },
        "calories": {
          "title": "Detalhamento Calórico",
          "items": [
            {
              "label": "Calorias da Proteína",
              "valueKey": "proteinCal"
            },
            {
              "label": "Calorias dos Carboidratos",
              "valueKey": "carbsCal"
            },
            {
              "label": "Calorias da Gordura",
              "valueKey": "fatCal"
            },
            {
              "label": "Total de Calorias",
              "valueKey": "dailyCalories"
            }
          ]
        },
        "tips": {
          "title": "Dicas Profissionais",
          "items": [
            "Atinja sua meta de proteína primeiro — é o macro mais importante para músculo e saciedade",
            "Monitore fibra separadamente — mire pelo menos 25-35g por dia de alimentos integrais",
            "Mantenha-se hidratado — ingestão de água afeta energia, recuperação e digestão",
            "Ajuste macros semanalmente baseado no progresso — seu corpo se adapta ao longo do tempo"
          ]
        }
      },
      "chart": {
        "title": "Distribuição de Macros",
        "series": {
          "protein": "Proteína",
          "carbs": "Carboidratos",
          "fat": "Gordura"
        }
      },
      "detailedTable": {
        "mealSplit": {
          "button": "Ver Divisão por Refeição",
          "title": "Divisão de Macros por Refeição",
          "columns": {
            "meal": "Refeição",
            "protein": "Proteína",
            "carbs": "Carboidratos",
            "fat": "Gordura",
            "calories": "Calorias"
          }
        }
      },
      "education": {
        "whatAreMacros": {
          "title": "O que são Macronutrientes?",
          "content": "Macronutrientes (macros) são os três nutrientes que seu corpo precisa em grandes quantidades: proteína, carboidratos e gordura. Diferente dos micronutrientes (vitaminas e minerais), os macros fornecem energia e são medidos em gramas. Cada macro serve um propósito único: proteína constrói e repara músculos, carboidratos alimentam seus treinos e cérebro, e gordura suporta hormônios e absorção de nutrientes. Monitorar macros ao invés de apenas calorias garante que você está obtendo o equilíbrio certo de nutrientes para apoiar seus objetivos específicos — seja perda de gordura, ganho muscular ou performance atlética."
        },
        "bmrFormulas": {
          "title": "Mifflin-St Jeor vs Katch-McArdle",
          "content": "Esta calculadora usa duas fórmulas de TMB para dar os resultados mais precisos. A equação Mifflin-St Jeor é o padrão ouro para a maioria das pessoas — é baseada em idade, sexo, peso e altura. A fórmula Katch-McArdle é mais precisa se você sabe sua porcentagem de gordura corporal porque calcula TMB baseada na massa corporal magra (músculo queima mais calorias que gordura). Se você inserir porcentagem de gordura corporal, a calculadora usará Katch-McArdle e mostrará ambos resultados lado a lado. Para a maioria das pessoas, a diferença é 50-150 calorias por dia, o que importa quando você está tentando perder ou ganhar peso."
        },
        "dietTypes": {
          "title": "Presets de Tipos de Dieta",
          "items": [
            {
              "text": "Equilibrada (50/25/25) — Carboidratos e gorduras iguais, proteína moderada. Melhor para saúde geral e iniciantes.",
              "type": "info"
            },
            {
              "text": "Baixo Carbo (30/35/35) — Carboidratos reduzidos, gordura e proteína mais altas. Bom para perda de gordura sem restrições cetogênicas.",
              "type": "info"
            },
            {
              "text": "Alta Proteína (30/40/30) — Proteína aumentada para construção muscular ou preservar músculo durante corte.",
              "type": "info"
            },
            {
              "text": "Cetogênica (5/25/70) — Muito baixo carbo, alta gordura. Projetada para cetose e adaptação à gordura.",
              "type": "warning"
            },
            {
              "text": "Paleo (35/35/30) — Macros equilibrados com ênfase em alimentos integrais. Imita padrões alimentares ancestrais.",
              "type": "info"
            },
            {
              "text": "Zone (40/30/30) — Dieta Zone de Barry Sears. Macros equilibrados para açúcar no sangue e energia estáveis.",
              "type": "info"
            },
            {
              "text": "Vegana Proteína (35/40/25) — Proteína mais alta para atletas baseados em plantas. Requer escolhas alimentares estratégicas.",
              "type": "info"
            },
            {
              "text": "Personalizada — Defina suas próprias proporções. Usuários avançados podem ajustar metas específicas de macros baseadas em suas necessidades.",
              "type": "success"
            }
          ]
        },
        "mealTiming": {
          "title": "Timing e Distribuição das Refeições",
          "items": [
            {
              "text": "Distribuição de proteína importa — espalhe proteína uniformemente pelas refeições (20-40g por refeição) para síntese proteica muscular ótima.",
              "type": "info"
            },
            {
              "text": "Nutrição pós-treino — a tabela de divisão de refeições enfatiza proteína nas refeições em torno da janela de treino.",
              "type": "success"
            },
            {
              "text": "Frequência de refeições é flexível — 3-6 refeições por dia funcionam igualmente bem. Escolha o que se adapta à sua agenda e padrões de fome.",
              "type": "info"
            },
            {
              "text": "Não se obsesse com timing — total diário de macros importa muito mais que timing preciso das refeições para a maioria das pessoas.",
              "type": "warning"
            },
            {
              "text": "Fibra em cada refeição — espalhar ingestão de fibra previne desconforto digestivo e estabiliza açúcar no sangue.",
              "type": "info"
            },
            {
              "text": "Estratégia de hidratação — beba 500-600ml com cada refeição, mais extra durante e após treinos.",
              "type": "info"
            }
          ]
        },
        "topFoods": {
          "title": "Top 50 Alimentos Ricos em Proteína",
          "description": "Atingir sua meta de proteína é mais fácil quando você sabe quais alimentos têm mais proteína por porção. Aqui estão os top 50 alimentos ricos em proteína de todas as categorias:",
          "examples": [
            {
              "title": "Proteínas Animais (por 100g cozido)",
              "steps": [
                "Peito de frango: 31g proteína, 165 cal (magro, versátil)",
                "Peito de peru: 30g proteína, 135 cal (muito magro)",
                "Atum (enlatado): 30g proteína, 116 cal (ômega-3)",
                "Salmão: 25g proteína, 206 cal (ômega-3, vitamina D)",
                "Carne magra (alcatra): 26g proteína, 183 cal (ferro, B12)",
                "Lombo suíno: 26g proteína, 143 cal (corte magro)",
                "Camarão: 24g proteína, 99 cal (muito baixa gordura)",
                "Bacalhau: 23g proteína, 105 cal (peixe branco, suave)",
                "Ovos (2 grandes): 13g proteína, 140 cal (aminoácidos completos)",
                "Iogurte grego (natural): 10g proteína/100g, 59 cal (probióticos)"
              ],
              "result": "Proteínas animais fornecem perfis completos de aminoácidos e são a forma mais fácil de atingir metas altas de proteína."
            },
            {
              "title": "Proteínas Vegetais (por 100g cozido)",
              "steps": [
                "Seitan (glúten de trigo): 25g proteína, 370 cal (maior proteína vegetal)",
                "Tempeh: 19g proteína, 193 cal (soja fermentada, probióticos)",
                "Tofu (firme): 17g proteína, 144 cal (versátil, cálcio)",
                "Edamame: 12g proteína, 122 cal (soja integral)",
                "Lentilhas: 9g proteína, 116 cal (fibra, ferro)",
                "Grão-de-bico: 9g proteína, 164 cal (fibra, versátil)",
                "Feijão preto: 9g proteína, 132 cal (fibra, antioxidantes)",
                "Quinoa: 4,4g proteína, 120 cal (proteína completa)",
                "Pasta de amendoim (2 colheres): 8g proteína, 188 cal (gorduras saudáveis)",
                "Amêndoas (28g): 6g proteína, 164 cal (vitamina E, fibra)"
              ],
              "result": "Proteínas vegetais frequentemente vêm com fibra e micronutrientes mas requerem combinar fontes para aminoácidos completos."
            }
          ]
        },
        "howToTrack": {
          "title": "Como Monitorar Seus Macros",
          "content": "Use um aplicativo de monitoramento alimentar como MyFitnessPal, Cronometer ou MacroFactor para registrar suas refeições. Pese sua comida com balança digital de cozinha nas primeiras 2-4 semanas até conseguir estimar porções com precisão. Pré-registre suas refeições na noite anterior ou planeje uma semana inteira usando meal prep. Não mire perfeição — ficar dentro de 5-10g de cada meta de macro está bom o suficiente. Foque na consistência ao longo do tempo ao invés de se estressar sobre atingir números exatos todos os dias. Monitore por pelo menos 4-6 semanas antes de ajustar seus macros, pois seu corpo precisa de tempo para se adaptar e mostrar tendências reais."
        }
      },
      "faqs": [
        {
          "question": "Qual a diferença entre as fórmulas Mifflin-St Jeor e Katch-McArdle?",
          "answer": "Mifflin-St Jeor calcula TMB baseada em idade, sexo, peso e altura. É precisa para a maioria das pessoas e não requer saber porcentagem de gordura corporal. Katch-McArdle usa massa corporal magra (peso total menos massa gorda) e é mais precisa se você sabe sua % de gordura corporal. A diferença é tipicamente 50-150 calorias por dia. Se você inserir % de gordura corporal, a calculadora usará Katch-McArdle; caso contrário usa Mifflin-St Jeor por padrão."
        },
        {
          "question": "Preciso saber minha % de gordura corporal para resultados precisos?",
          "answer": "Não, % de gordura corporal é opcional. A fórmula Mifflin-St Jeor (que não precisa de % de gordura corporal) é precisa para a maioria das pessoas. Porém, se você é muito magro (<15% homens, <25% mulheres) ou tem muita massa muscular, saber sua % de gordura corporal e usar Katch-McArdle dará resultados 5-10% mais precisos. Você pode medir gordura corporal com adipômetros, DEXA scan ou balanças de bioimpedância."
        },
        {
          "question": "E se eu não conseguir atingir minha meta de proteína todos os dias?",
          "answer": "Mire atingir sua meta de proteína 80% do tempo (5-6 dias por semana). Nos dias que ficar aquém, tente chegar dentro de 20g da sua meta. Proteína é o macro mais importante para preservar músculo durante perda de gordura e construir músculo durante bulk. Se você consistentemente tem dificuldade, tente shakes de proteína, iogurte grego ou carnes magras em cada refeição. Lembre-se: proteína semanal total importa mais que perfeição diária."
        },
        {
          "question": "Devo comer macros diferentes em dias de descanso vs dias de treino?",
          "answer": "Para a maioria das pessoas, manter macros consistentes todos os dias é mais simples e funciona igualmente bem. Porém, levantadores avançados às vezes usam 'ciclagem de carboidratos' — comendo mais carboidratos em dias de treino e menos carboidratos em dias de descanso. Se quiser tentar isso, reduza carboidratos em 50-100g nos dias de descanso e substitua essas calorias por gordura. Mantenha proteína igual todos os dias independente do treino."
        },
        {
          "question": "É melhor contar macros ou apenas contar calorias?",
          "answer": "Contar macros é superior se você se importa com composição corporal (músculo vs gordura). Calorias determinam se você ganha ou perde peso, mas macros determinam se esse peso é músculo ou gordura. Por exemplo, perder peso com pouca proteína significa que você perderá mais músculo. Ganhar peso com pouca proteína significa mais ganho de gordura. Se você tem pouco tempo, priorize: 1) Total de calorias, 2) Proteína, 3) Carboidratos e gordura podem ser flexíveis."
        },
        {
          "question": "Como monitorar macros sem ficar obsecado ou estressado?",
          "answer": "Comece com abordagem 80/20: monitore 80% das suas refeições (refeições pré-planejadas) e seja flexível com 20% (comer fora, eventos sociais). Pré-registre seu dia na noite anterior para não ficar constantemente pensando em comida. Use as mesmas refeições repetidamente — planos de refeição 'chatos' são mais fáceis de monitorar e seguir. Faça pausas da dieta a cada 8-12 semanas onde você apenas mantém peso sem monitoramento rigoroso. Lembre-se: macros são uma ferramenta, não uma prisão de estilo de vida."
        },
        {
          "question": "Qual é a melhor divisão de macros para construir músculo (bulk)?",
          "answer": "Para construção muscular, proteína é rei — mire 1,6-2,2g por kg de peso corporal. A divisão clássica de bulk é 40% carboidratos, 30% proteína, 30% gordura, mas você pode elevar carboidratos (50%) se treina pesado e precisa da energia. Não vá abaixo de 20% gordura pois afeta produção hormonal. Total de calorias importa mais: coma 10-20% acima do seu TDEE (superávit de 300-500 cal). Superávits menores significam ganhos mais lentos e magros; superávits maiores significam ganhos mais rápidos mas mais gordura."
        },
        {
          "question": "Posso perder gordura e ganhar músculo ao mesmo tempo?",
          "answer": "Sim, mas apenas sob condições específicas: você é iniciante no treino, retornando após pausa, ou significativamente acima do peso. Isso é chamado 'recomposição corporal'. Mantenha proteína muito alta (2,2g por kg), coma na manutenção ou pequeno déficit (-200 a -300 cal), e levante pesos 3-5x por semana. Progresso é mais lento que corte ou bulk puros, mas você melhora composição corporal sem dieta extrema. A maioria das pessoas vê melhores resultados escolhendo um objetivo por vez."
        },
        {
          "question": "Por que a calculadora recomenda fibra e água?",
          "answer": "Fibra (14g por 1.000 calorias) melhora digestão, mantém você saciado e estabiliza açúcar no sangue — especialmente importante em dietas ricas em proteína. Água (35ml por kg de peso corporal) previne desidratação do aumento da ingestão de proteína, suporta performance e ajuda com controle de apetite. A maioria das pessoas consome pouco de ambos, o que pode sabotar perda de gordura e construção muscular apesar de atingir macros perfeitamente."
        },
        {
          "question": "Com que frequência devo recalcular meus macros conforme perco ou ganho peso?",
          "answer": "Recalcule a cada 7-10 kg de mudança de peso ou a cada 8-12 semanas, o que vier primeiro. Conforme você perde peso, seu TDEE diminui e você precisará reduzir calorias para continuar perdendo na mesma velocidade. Conforme você ganha peso (músculo), seu TDEE aumenta. Também recalcule se seu nível de atividade mudar significativamente (novo trabalho, programa de treino, lesão). Monitore seu peso semanalmente e ajuste se não estiver vendo progresso esperado após 3-4 semanas."
        },
        {
          "question": "O que significa proteína por kg e qual devo mirar?",
          "answer": "Proteína por kg mede quanta proteína você come relativa ao seu peso corporal. Pesquisa sugere 1,6-2,2g por kg para pessoas ativas tentando construir ou manter músculo. Para perda de gordura, mire 1,8-2,6g por kg para preservar músculo. Para saúde geral, 0,8g por kg é o mínimo da RDA. O toggle 'Análise de Proteína' mostra exatamente onde sua ingestão está relativa a esses benchmarks."
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
      "name": "Calculateur de Macros",
      "slug": "calculateur-macronutriments",
      "subtitle": "Calculez vos macros quotidiennes avec deux formules de MB, 8 types de régimes, ratios personnalisés, analyse protéique et répartition par repas — visualisez votre plan nutritionnel avec notre calculateur de macros gratuit",
      "breadcrumb": "Macros",
      "seo": {
        "title": "Calculateur de Macros - Outil IIFYM & TDEE Gratuit avec Ratios Personnalisés",
        "description": "Calculez vos protéines, glucides et lipides quotidiens avec les formules Mifflin-St Jeor et Katch-McArdle. 8 types de régimes, macros personnalisées, analyse protéique par livre, répartition des repas, recommandations fibres et eau — entièrement gratuit.",
        "shortDescription": "Calculez les macros quotidiennes avec deux formules de MB, analyse protéique et 8 types de régimes",
        "keywords": [
          "calculateur macros",
          "calculateur macronutriments",
          "calculateur IIFYM",
          "calculateur macros TDEE",
          "calculateur protéines glucides lipides",
          "calculateur macros gratuit",
          "calculateur macros personnalisé",
          "calculateur macros repas",
          "calculateur protéines par kilo"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "gender": {
          "label": "Sexe",
          "helpText": "Les formules de MB diffèrent selon le sexe",
          "options": {
            "male": "Homme",
            "female": "Femme"
          }
        },
        "age": {
          "label": "Âge",
          "helpText": "L'âge affecte votre métabolisme de base"
        },
        "weight": {
          "label": "Poids",
          "helpText": "Votre poids corporel actuel"
        },
        "height": {
          "label": "Taille",
          "helpText": "Votre taille dans n'importe quelle unité"
        },
        "activityLevel": {
          "label": "Niveau d'Activité",
          "helpText": "À quel point êtes-vous actif dans une semaine type ?",
          "options": {
            "sedentary": "Sédentaire (travail de bureau, peu d'exercice)",
            "light": "Légèrement Actif (1-3 jours/semaine)",
            "moderate": "Modérément Actif (3-5 jours/semaine)",
            "active": "Actif (exercice quotidien ou intense 3-4 jours)",
            "veryActive": "Très Actif (intense 6-7 jours/semaine)",
            "extraActive": "Extra Actif (athlète / travail physique)"
          }
        },
        "goal": {
          "label": "Objectif",
          "helpText": "Votre objectif de gestion du poids",
          "options": {
            "lose2": "Perdre du Poids — Agressif (1 kg/semaine)",
            "lose1": "Perdre du Poids — Modéré (0,5 kg/semaine)",
            "lose05": "Perdre du Poids — Léger (0,25 kg/semaine)",
            "maintain": "Maintenir le Poids",
            "gain05": "Prendre du Poids — Sec (0,25 kg/semaine)",
            "gain1": "Prendre du Poids — Modéré (0,5 kg/semaine)",
            "gain2": "Prendre du Poids — Agressif (1 kg/semaine)"
          }
        },
        "dietType": {
          "label": "Type de Régime",
          "helpText": "Préréglage de ratio de macros — détermine la répartition protéines, glucides et lipides",
          "options": {
            "balanced": "Équilibré (50/25/25) G/P/L",
            "lowCarb": "Faible en Glucides (30/35/35) G/P/L",
            "highProtein": "Riche en Protéines (30/40/30) G/P/L",
            "keto": "Keto (5/25/70) G/P/L",
            "paleo": "Paléo (35/35/30) G/P/L",
            "zone": "Zone (40/30/30) G/P/L",
            "veganProtein": "Végétalien Riche en Protéines (35/40/25) G/P/L",
            "custom": "Personnalisé (définissez vos propres ratios)"
          }
        },
        "customCarbs": {
          "label": "Glucides Personnalisés %",
          "helpText": "Pourcentage de calories provenant des glucides"
        },
        "customProtein": {
          "label": "Protéines Personnalisées %",
          "helpText": "Pourcentage de calories provenant des protéines"
        },
        "customFat": {
          "label": "Lipides Personnalisés %",
          "helpText": "Pourcentage de calories provenant des lipides (calculé automatiquement)"
        },
        "bodyFat": {
          "label": "Masse Grasse %",
          "helpText": "Optionnel — active la formule Katch-McArdle pour un MB plus précis",
          "placeholder": "ex. 18"
        },
        "mealsPerDay": {
          "label": "Repas Par Jour",
          "helpText": "Nombre de repas pour le tableau de répartition",
          "options": {
            "3": "3 repas",
            "4": "4 repas",
            "5": "5 repas",
            "6": "6 repas"
          }
        },
        "showMetabolic": {
          "label": "Afficher Détails Métaboliques",
          "helpText": "Activez pour voir la répartition du MB, TDEE et ajustement calorique"
        },
        "showProteinAnalysis": {
          "label": "Afficher Analyse Protéique",
          "helpText": "Activez pour voir les protéines par kg, évaluation recommandation et limites quotidiennes sucre et graisses saturées"
        }
      },
      "inputGroups": {},
      "results": {
        "dailyCalories": {
          "label": "Calories Quotidiennes"
        },
        "protein": {
          "label": "Protéines"
        },
        "carbs": {
          "label": "Glucides"
        },
        "fat": {
          "label": "Lipides"
        },
        "proteinCal": {
          "label": "Calories Protéines"
        },
        "carbsCal": {
          "label": "Calories Glucides"
        },
        "fatCal": {
          "label": "Calories Lipides"
        },
        "fiber": {
          "label": "Fibres Quotidiennes"
        },
        "water": {
          "label": "Eau Quotidienne"
        },
        "bmrMifflin": {
          "label": "MB (Mifflin-St Jeor)"
        },
        "bmrKatch": {
          "label": "MB (Katch-McArdle)"
        },
        "tdee": {
          "label": "TDEE"
        },
        "calorieAdjustment": {
          "label": "Ajustement Calorique"
        },
        "proteinPerLb": {
          "label": "Protéines par livre"
        },
        "proteinPerKg": {
          "label": "Protéines par kg"
        },
        "proteinRating": {
          "label": "Évaluation Protéique"
        },
        "maxSugar": {
          "label": "Sucre Ajouté Max"
        },
        "maxSatFat": {
          "label": "Graisses Saturées Max"
        }
      },
      "tooltips": {
        "dailyCalories": "Calories quotidiennes totales ajustées pour votre objectif (TDEE ± déficit/surplus)",
        "protein": "Grammes de protéines par jour — essentielles pour la réparation musculaire et la satiété",
        "carbs": "Grammes de glucides par jour — principale source d'énergie de votre corps",
        "fat": "Grammes de lipides alimentaires par jour — vitaux pour les hormones et l'absorption des nutriments",
        "proteinCal": "Calories provenant des protéines (4 cal par gramme)",
        "carbsCal": "Calories provenant des glucides (4 cal par gramme)",
        "fatCal": "Calories provenant des lipides (9 cal par gramme)",
        "fiber": "Apport quotidien recommandé en fibres basé sur les directives IOM (14g pour 1000 cal)",
        "water": "Apport quotidien recommandé en eau basé sur le poids corporel (~15 ml par kg)",
        "bmrMifflin": "Métabolisme de Base calculé avec l'équation Mifflin-St Jeor",
        "bmrKatch": "Métabolisme de Base calculé avec l'équation Katch-McArdle (nécessite % masse grasse)",
        "tdee": "Dépense Énergétique Quotidienne Totale = MB × Multiplicateur d'Activité",
        "calorieAdjustment": "Le surplus ou déficit calorique appliqué à votre TDEE selon votre objectif",
        "proteinPerLb": "Grammes de protéines par livre de poids corporel — métrique clé pour les athlètes",
        "proteinPerKg": "Grammes de protéines par kilogramme de poids corporel — standard international",
        "proteinRating": "Comment votre apport protéique se compare aux recommandations scientifiques",
        "maxSugar": "L'OMS recommande de limiter le sucre ajouté à <25g/jour pour la santé",
        "maxSatFat": "L'AHA recommande de limiter les graisses saturées à <10% des calories totales"
      },
      "presets": {
        "cutMale": {
          "label": "Sèche (Homme)",
          "description": "Homme 25 ans, 82 kg, 1m78, activité modérée, perdre 0,5 kg/semaine"
        },
        "cutFemale": {
          "label": "Sèche (Femme)",
          "description": "Femme 25 ans, 64 kg, 1m65, activité modérée, perdre 0,5 kg/semaine"
        },
        "bulkMale": {
          "label": "Prise de Masse (Homme)",
          "description": "Homme 25 ans, 82 kg, 1m78, très actif, prendre 0,5 kg/semaine"
        },
        "bulkFemale": {
          "label": "Prise de Masse (Femme)",
          "description": "Femme 25 ans, 64 kg, 1m65, très active, prise sèche 0,25 kg/semaine"
        },
        "ketoMale": {
          "label": "Keto (Homme)",
          "description": "Homme 35 ans, 91 kg, 1m83, régime keto, perdre 0,5 kg/semaine"
        },
        "veganAthlete": {
          "label": "Athlète Végétalien",
          "description": "Femme 28 ans, 61 kg, 1m68, active, végétalienne riche en protéines"
        },
        "recomp": {
          "label": "Recomposition Corporelle",
          "description": "Homme 28 ans, 79 kg, 1m78, actif, riche en protéines, maintenir poids — tous détails ACTIVÉS"
        },
        "endurance": {
          "label": "Athlète Endurance",
          "description": "Homme 30 ans, 73 kg, 1m75, très actif, régime équilibré, 6 repas — métabolique ACTIVÉ"
        }
      },
      "values": {
        "g": "g",
        "kcal": "kcal",
        "oz": "oz",
        "L": "L",
        "N/A": "N/A",
        "Requires body fat %": "Nécessite % masse grasse",
        "Breakfast": "Petit-déjeuner",
        "Lunch": "Déjeuner",
        "Dinner": "Dîner",
        "Snack": "Collation",
        "Snack 1": "Collation 1",
        "Snack 2": "Collation 2",
        "Snack 3": "Collation 3",
        "Total": "Total",
        "g/lb": "g/livre",
        "g/kg": "g/kg"
      },
      "formats": {
        "summary": "Votre objectif quotidien est de {dailyCalories} calories : {protein}g protéines ({proteinPct}%), {carbs}g glucides ({carbsPct}%), {fat}g lipides ({fatPct}%). Fibres : {fiber}g. Eau : {water}."
      },
      "infoCards": {
        "macros": {
          "title": "Vos Macros Quotidiennes",
          "items": [
            {
              "label": "Calories Quotidiennes",
              "valueKey": "dailyCalories"
            },
            {
              "label": "Protéines",
              "valueKey": "protein"
            },
            {
              "label": "Glucides",
              "valueKey": "carbs"
            },
            {
              "label": "Lipides",
              "valueKey": "fat"
            }
          ]
        },
        "calories": {
          "title": "Répartition Calorique",
          "items": [
            {
              "label": "Calories Protéines",
              "valueKey": "proteinCal"
            },
            {
              "label": "Calories Glucides",
              "valueKey": "carbsCal"
            },
            {
              "label": "Calories Lipides",
              "valueKey": "fatCal"
            },
            {
              "label": "Calories Totales",
              "valueKey": "dailyCalories"
            }
          ]
        },
        "tips": {
          "title": "Conseils Pro",
          "items": [
            "Atteignez d'abord votre objectif protéique — c'est la macro la plus importante pour le muscle et la satiété",
            "Suivez les fibres séparément — visez au moins 25-35g par jour d'aliments entiers",
            "Restez hydraté — l'apport en eau affecte l'énergie, la récupération et la digestion",
            "Ajustez les macros chaque semaine selon les progrès — votre corps s'adapte avec le temps"
          ]
        }
      },
      "chart": {
        "title": "Répartition des Macros",
        "series": {
          "protein": "Protéines",
          "carbs": "Glucides",
          "fat": "Lipides"
        }
      },
      "detailedTable": {
        "mealSplit": {
          "button": "Voir Répartition des Repas",
          "title": "Répartition des Macros par Repas",
          "columns": {
            "meal": "Repas",
            "protein": "Protéines",
            "carbs": "Glucides",
            "fat": "Lipides",
            "calories": "Calories"
          }
        }
      },
      "education": {
        "whatAreMacros": {
          "title": "Que sont les Macronutriments ?",
          "content": "Les macronutriments (macros) sont les trois nutriments dont votre corps a besoin en grandes quantités : protéines, glucides et lipides. Contrairement aux micronutriments (vitamines et minéraux), les macros fournissent de l'énergie et sont mesurées en grammes. Chaque macro a un rôle unique : les protéines construisent et réparent les muscles, les glucides alimentent vos entraînements et votre cerveau, et les lipides soutiennent les hormones et l'absorption des nutriments. Suivre les macros au lieu de seulement les calories garantit que vous obtenez le bon équilibre nutritionnel pour vos objectifs spécifiques — que ce soit la perte de graisse, la prise de muscle ou la performance athlétique."
        },
        "bmrFormulas": {
          "title": "Mifflin-St Jeor vs Katch-McArdle",
          "content": "Ce calculateur utilise deux formules de MB pour vous donner les résultats les plus précis. L'équation Mifflin-St Jeor est la référence pour la plupart des gens — elle se base sur l'âge, le sexe, le poids et la taille. La formule Katch-McArdle est plus précise si vous connaissez votre pourcentage de masse grasse car elle calcule le MB basé sur la masse maigre (le muscle brûle plus de calories que la graisse). Si vous entrez un pourcentage de masse grasse, le calculateur utilisera Katch-McArdle et montrera les deux résultats côte à côte. Pour la plupart des gens, la différence est de 50-150 calories par jour, ce qui compte quand vous essayez de perdre ou prendre du poids."
        },
        "dietTypes": {
          "title": "Préréglages de Types de Régimes",
          "items": [
            {
              "text": "Équilibré (50/25/25) — Glucides et lipides égaux, protéines modérées. Idéal pour la santé générale et les débutants.",
              "type": "info"
            },
            {
              "text": "Faible en Glucides (30/35/35) — Glucides réduits, lipides et protéines plus élevés. Bon pour la perte de graisse sans restrictions keto.",
              "type": "info"
            },
            {
              "text": "Riche en Protéines (30/40/30) — Protéines augmentées pour la construction musculaire ou préserver le muscle en sèche.",
              "type": "info"
            },
            {
              "text": "Keto (5/25/70) — Très faible en glucides, riche en lipides. Conçu pour la cétose et l'adaptation aux graisses.",
              "type": "warning"
            },
            {
              "text": "Paléo (35/35/30) — Macros équilibrées avec emphase sur les aliments entiers. Imite les habitudes alimentaires ancestrales.",
              "type": "info"
            },
            {
              "text": "Zone (40/30/30) — Régime Zone de Barry Sears. Macros équilibrées pour sucre sanguin et énergie stables.",
              "type": "info"
            },
            {
              "text": "Végétalien Protéiné (35/40/25) — Protéines plus élevées pour athlètes végétaliens. Nécessite choix alimentaires stratégiques.",
              "type": "info"
            },
            {
              "text": "Personnalisé — Définissez vos propres ratios. Utilisateurs avancés peuvent ajuster des objectifs macros spécifiques selon leurs besoins.",
              "type": "success"
            }
          ]
        },
        "mealTiming": {
          "title": "Timing et Répartition des Repas",
          "items": [
            {
              "text": "La répartition protéique compte — répartissez les protéines uniformément entre les repas (20-40g par repas) pour une synthèse protéique musculaire optimale.",
              "type": "info"
            },
            {
              "text": "Nutrition post-entraînement — le tableau de répartition des repas met l'accent sur les protéines dans les repas autour de votre fenêtre d'entraînement.",
              "type": "success"
            },
            {
              "text": "La fréquence des repas est flexible — 3-6 repas par jour fonctionnent également bien. Choisissez ce qui correspond à votre horaire et vos signaux de faim.",
              "type": "info"
            },
            {
              "text": "N'obsédez pas sur le timing — les macros quotidiennes totales comptent beaucoup plus que le timing précis des repas pour la plupart des gens.",
              "type": "warning"
            },
            {
              "text": "Fibres à chaque repas — répartir l'apport en fibres prévient l'inconfort digestif et stabilise la glycémie.",
              "type": "info"
            },
            {
              "text": "Stratégie d'hydratation — buvez 500-600 ml avec chaque repas, plus extra pendant et après les entraînements.",
              "type": "info"
            }
          ]
        },
        "topFoods": {
          "title": "Top 50 des Aliments Riches en Protéines",
          "description": "Atteindre votre objectif protéique est plus facile quand vous savez quels aliments contiennent le plus de protéines par portion. Voici le top 50 des aliments riches en protéines dans toutes les catégories :",
          "examples": [
            {
              "title": "Protéines Animales (pour 100g cuit)",
              "steps": [
                "Blanc de poulet : 31g protéines, 165 cal (maigre, polyvalent)",
                "Blanc de dinde : 30g protéines, 135 cal (très maigre)",
                "Thon (en conserve) : 30g protéines, 116 cal (oméga-3)",
                "Saumon : 25g protéines, 206 cal (oméga-3, vitamine D)",
                "Bœuf maigre (aloyau) : 26g protéines, 183 cal (fer, B12)",
                "Filet de porc : 26g protéines, 143 cal (morceau maigre)",
                "Crevettes : 24g protéines, 99 cal (très faible en gras)",
                "Cabillaud : 23g protéines, 105 cal (poisson blanc, doux)",
                "Œufs (2 gros) : 13g protéines, 140 cal (acides aminés complets)",
                "Yaourt grec (nature) : 10g protéines/100g, 59 cal (probiotiques)"
              ],
              "result": "Les protéines animales fournissent des profils d'acides aminés complets et sont le moyen le plus facile d'atteindre des objectifs protéiques élevés."
            },
            {
              "title": "Protéines Végétales (pour 100g cuit)",
              "steps": [
                "Seitan (gluten de blé) : 25g protéines, 370 cal (plus haute protéine végétale)",
                "Tempeh : 19g protéines, 193 cal (soja fermenté, probiotiques)",
                "Tofu (ferme) : 17g protéines, 144 cal (polyvalent, calcium)",
                "Edamame : 12g protéines, 122 cal (fèves de soja entières)",
                "Lentilles : 9g protéines, 116 cal (fibres, fer)",
                "Pois chiches : 9g protéines, 164 cal (fibres, polyvalents)",
                "Haricots noirs : 9g protéines, 132 cal (fibres, antioxydants)",
                "Quinoa : 4,4g protéines, 120 cal (protéine complète)",
                "Beurre d'arachide (2 c. à soupe) : 8g protéines, 188 cal (bonnes graisses)",
                "Amandes (28g) : 6g protéines, 164 cal (vitamine E, fibres)"
              ],
              "result": "Les protéines végétales viennent souvent avec des fibres et micronutriments mais nécessitent de combiner les sources pour des acides aminés complets."
            }
          ]
        },
        "howToTrack": {
          "title": "Comment Suivre Vos Macros",
          "content": "Utilisez une application de suivi alimentaire comme MyFitnessPal, Cronometer ou MacroFactor pour enregistrer vos repas. Pesez vos aliments avec une balance de cuisine numérique pendant les 2-4 premières semaines jusqu'à ce que vous puissiez estimer les portions précisément. Pré-enregistrez vos repas la veille ou planifiez une semaine complète avec la préparation de repas. Ne visez pas la perfection — atteindre dans les 5-10g de chaque objectif macro est suffisant. Concentrez-vous sur la constance dans le temps plutôt que de stresser sur des chiffres exacts chaque jour. Suivez pendant au moins 4-6 semaines avant d'ajuster vos macros, car votre corps a besoin de temps pour s'adapter et montrer de vraies tendances."
        }
      },
      "faqs": [
        {
          "question": "Quelle est la différence entre les formules Mifflin-St Jeor et Katch-McArdle ?",
          "answer": "Mifflin-St Jeor calcule le MB basé sur l'âge, le sexe, le poids et la taille. C'est précis pour la plupart des gens et ne nécessite pas de connaître le pourcentage de masse grasse. Katch-McArdle utilise la masse maigre (poids total moins masse grasse) et est plus précis si vous connaissez votre % de masse grasse. La différence est typiquement de 50-150 calories par jour. Si vous entrez la masse grasse %, le calculateur utilisera Katch-McArdle ; sinon il utilise par défaut Mifflin-St Jeor."
        },
        {
          "question": "Ai-je besoin de connaître mon % de masse grasse pour des résultats précis ?",
          "answer": "Non, le % de masse grasse est optionnel. La formule Mifflin-St Jeor (qui n'a pas besoin de masse grasse %) est précise pour la plupart des gens. Cependant, si vous êtes très sec (<15% hommes, <25% femmes) ou avez beaucoup de masse musculaire, connaître votre % de masse grasse et utiliser Katch-McArdle vous donnera des résultats 5-10% plus précis. Vous pouvez mesurer la masse grasse avec des plis cutanés, scan DEXA ou balances à impédance bioélectrique."
        },
        {
          "question": "Que faire si je ne peux pas atteindre mon objectif protéique chaque jour ?",
          "answer": "Visez à atteindre votre objectif protéique 80% du temps (5-6 jours par semaine). Les jours où vous êtes en dessous, essayez d'arriver dans les 20g de votre objectif. Les protéines sont la macro la plus importante pour préserver le muscle pendant la perte de graisse et construire du muscle en prise de masse. Si vous avez constamment du mal, essayez les shakes protéinés, yaourt grec ou viandes maigres à chaque repas. Rappel : les protéines hebdomadaires totales comptent plus que la perfection quotidienne."
        },
        {
          "question": "Dois-je manger différentes macros les jours de repos vs jours d'entraînement ?",
          "answer": "Pour la plupart des gens, garder les macros constantes chaque jour est plus simple et fonctionne aussi bien. Cependant, les pratiquants avancés utilisent parfois le 'carb cycling' — manger plus de glucides les jours d'entraînement et moins les jours de repos. Si vous voulez essayer, réduisez les glucides de 50-100g les jours de repos et remplacez ces calories par des lipides. Gardez les protéines identiques chaque jour peu importe l'entraînement."
        },
        {
          "question": "Est-il mieux de compter les macros ou juste les calories ?",
          "answer": "Compter les macros est supérieur si vous vous souciez de la composition corporelle (muscle vs graisse). Les calories déterminent si vous prenez ou perdez du poids, mais les macros déterminent si ce poids est muscle ou graisse. Par exemple, perdre du poids avec peu de protéines signifie que vous perdrez plus de muscle. Prendre du poids avec peu de protéines signifie plus de prise de graisse. Si vous manquez de temps, priorisez : 1) Calories totales, 2) Protéines, 3) Glucides et lipides peuvent être flexibles."
        },
        {
          "question": "Comment suivre les macros sans devenir obsédé ou stressé ?",
          "answer": "Commencez avec une approche 80/20 : suivez 80% de vos repas (repas pré-planifiés) et soyez flexible avec 20% (restaurants, événements sociaux). Pré-enregistrez votre journée la veille pour ne pas constamment penser à la nourriture. Utilisez les mêmes repas répétitivement — les plans de repas 'ennuyeux' sont plus faciles à suivre et respecter. Prenez des pauses diététiques toutes les 8-12 semaines où vous maintenez juste le poids sans suivi strict. Rappelez-vous : les macros sont un outil, pas une prison lifestyle."
        },
        {
          "question": "Quelle est la meilleure répartition macro pour construire du muscle (prise de masse) ?",
          "answer": "Pour la construction musculaire, les protéines sont reines — visez 1,6-2,2g par kg de poids corporel. La répartition classique de prise de masse est 40% glucides, 30% protéines, 30% lipides, mais vous pouvez pousser les glucides plus haut (50%) si vous vous entraînez dur et avez besoin d'énergie. Ne descendez pas sous 20% lipides car cela affecte la production hormonale. Les calories totales comptent le plus : mangez 10-20% au-dessus de votre TDEE (300-500 cal surplus). Petits surplus = gains plus lents et plus secs ; gros surplus = gains plus rapides mais plus de graisse."
        },
        {
          "question": "Puis-je perdre de la graisse et gagner du muscle en même temps ?",
          "answer": "Oui, mais seulement sous conditions spécifiques : vous êtes débutant en musculation, vous revenez après une pause, ou significativement en surpoids. Ceci s'appelle la 'recomposition corporelle'. Gardez les protéines très hautes (2,2g par kg), mangez à la maintenance ou petit déficit (-200 à -300 cal), et faites de la musculation 3-5x par semaine. Le progrès est plus lent qu'une sèche ou prise de masse pure, mais vous améliorez la composition corporelle sans régime extrême. La plupart des gens voient de meilleurs résultats en choisissant un objectif à la fois."
        },
        {
          "question": "Pourquoi le calculateur recommande-t-il fibres et eau ?",
          "answer": "Les fibres (14g pour 1000 calories) améliorent la digestion, vous rassasient et stabilisent la glycémie — spécialement important sur des régimes riches en protéines. L'eau (environ 35ml par kg de poids corporel) prévient la déshydratation de l'apport protéique augmenté, soutient la performance et aide au contrôle de l'appétit. La plupart des gens sous-consomment les deux, ce qui peut saboter la perte de graisse et construction musculaire malgré des macros parfaites."
        },
        {
          "question": "À quelle fréquence dois-je recalculer mes macros en perdant ou prenant du poids ?",
          "answer": "Recalculez tous les 7-10 kg de changement de poids ou toutes les 8-12 semaines, selon ce qui arrive en premier. Quand vous perdez du poids, votre TDEE baisse et vous devrez réduire les calories pour continuer à perdre au même rythme. Quand vous prenez du poids (muscle), votre TDEE augmente. Recalculez aussi si votre niveau d'activité change significativement (nouveau travail, programme d'entraînement, blessure). Suivez votre poids chaque semaine et ajustez si vous ne voyez pas les progrès attendus après 3-4 semaines."
        },
        {
          "question": "Que signifie protéines par livre/kg et que dois-je viser ?",
          "answer": "Les protéines par livre (ou kg) mesurent combien de protéines vous mangez relativement à votre poids corporel. La recherche suggère 1,6-2,2g par kg pour les personnes actives essayant de construire ou maintenir du muscle. Pour la perte de graisse, visez 1,8-2,4g par kg pour préserver le muscle. Pour la santé générale, 0,8g par kg est le minimum RDA. Le toggle 'Analyse Protéique' montre exactement où votre apport se situe relativement à ces références."
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
      "name": "Makronährstoff-Rechner",
      "slug": "makronaehrstoff-rechner",
      "subtitle": "Berechnen Sie Ihre täglichen Makronährstoffe mit dualen BMR-Formeln, 8 Diätarten, benutzerdefinierten Verhältnissen, Proteinanalyse und Makro-Aufteilung pro Mahlzeit — visualisieren Sie Ihren Ernährungsplan mit unserem kostenlosen Makronährstoff-Rechner",
      "breadcrumb": "Makronährstoffe",
      "seo": {
        "title": "Makronährstoff-Rechner - Kostenloses IIFYM & TDEE Tool mit benutzerdefinierten Verhältnissen",
        "description": "Berechnen Sie Ihre täglichen Proteine, Kohlenhydrate und Fette mit Mifflin-St Jeor und Katch-McArdle Formeln. 8 Diätarten, benutzerdefinierte Makronährstoffe, Protein pro Pfund Analyse, Mahlzeitenaufteilung, Ballaststoff- und Wasserempfehlungen — komplett kostenlos.",
        "shortDescription": "Berechnen Sie tägliche Makronährstoffe mit dualen BMR-Formeln, Proteinanalyse und 8 Diätarten",
        "keywords": [
          "makronährstoff rechner",
          "makronährstoff kalkulator",
          "IIFYM rechner",
          "TDEE makro rechner",
          "protein kohlenhydrate fett rechner",
          "kostenloser makro rechner",
          "benutzerdefinierter makro rechner",
          "mahlzeit makro rechner",
          "protein pro pfund rechner"
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
          "helpText": "Alter beeinflusst Ihren Grundumsatz"
        },
        "weight": {
          "label": "Gewicht",
          "helpText": "Ihr aktuelles Körpergewicht"
        },
        "height": {
          "label": "Größe",
          "helpText": "Ihre Körpergröße in beliebiger Einheit"
        },
        "activityLevel": {
          "label": "Aktivitätslevel",
          "helpText": "Wie aktiv sind Sie in einer typischen Woche?",
          "options": {
            "sedentary": "Sitzend (Bürojob, wenig Bewegung)",
            "light": "Leicht Aktiv (1-3 Tage/Woche)",
            "moderate": "Mäßig Aktiv (3-5 Tage/Woche)",
            "active": "Aktiv (tägliche Bewegung oder intensiv 3-4 Tage)",
            "veryActive": "Sehr Aktiv (intensiv 6-7 Tage/Woche)",
            "extraActive": "Extrem Aktiv (Athlet / körperlicher Beruf)"
          }
        },
        "goal": {
          "label": "Ziel",
          "helpText": "Ihr Gewichtsmanagement-Ziel",
          "options": {
            "lose2": "Gewicht verlieren — Aggressiv (1 kg/Woche)",
            "lose1": "Gewicht verlieren — Moderat (0,5 kg/Woche)",
            "lose05": "Gewicht verlieren — Mild (0,25 kg/Woche)",
            "maintain": "Gewicht halten",
            "gain05": "Gewicht zunehmen — Lean (0,25 kg/Woche)",
            "gain1": "Gewicht zunehmen — Moderat (0,5 kg/Woche)",
            "gain2": "Gewicht zunehmen — Aggressiv (1 kg/Woche)"
          }
        },
        "dietType": {
          "label": "Diätart",
          "helpText": "Makronährstoff-Voreinstellung — bestimmt die Aufteilung von Protein, Kohlenhydraten und Fetten",
          "options": {
            "balanced": "Ausgewogen (50/25/25) K/P/F",
            "lowCarb": "Low Carb (30/35/35) K/P/F",
            "highProtein": "High Protein (30/40/30) K/P/F",
            "keto": "Keto (5/25/70) K/P/F",
            "paleo": "Paleo (35/35/30) K/P/F",
            "zone": "Zone (40/30/30) K/P/F",
            "veganProtein": "High-Protein Vegan (35/40/25) K/P/F",
            "custom": "Benutzerdefiniert (eigene Verhältnisse festlegen)"
          }
        },
        "customCarbs": {
          "label": "Benutzerdefinierte Kohlenhydrate %",
          "helpText": "Prozentsatz der Kalorien aus Kohlenhydraten"
        },
        "customProtein": {
          "label": "Benutzerdefiniertes Protein %",
          "helpText": "Prozentsatz der Kalorien aus Protein"
        },
        "customFat": {
          "label": "Benutzerdefinierte Fette %",
          "helpText": "Prozentsatz der Kalorien aus Fetten (automatisch berechnet)"
        },
        "bodyFat": {
          "label": "Körperfett %",
          "helpText": "Optional — ermöglicht Katch-McArdle Formel für genaueren BMR",
          "placeholder": "z.B. 18"
        },
        "mealsPerDay": {
          "label": "Mahlzeiten pro Tag",
          "helpText": "Anzahl der Mahlzeiten für die Aufteilungstabelle",
          "options": {
            "3": "3 Mahlzeiten",
            "4": "4 Mahlzeiten",
            "5": "5 Mahlzeiten",
            "6": "6 Mahlzeiten"
          }
        },
        "showMetabolic": {
          "label": "Stoffwechseldetails anzeigen",
          "helpText": "Einschalten, um BMR, TDEE und Kalorien-Anpassungsaufschlüsselung zu sehen"
        },
        "showProteinAnalysis": {
          "label": "Proteinanalyse anzeigen",
          "helpText": "Einschalten, um Protein pro Pfund/kg, Bewertungsrating und Tageslimits für Zucker und gesättigte Fette zu sehen"
        }
      },
      "inputGroups": {},
      "results": {
        "dailyCalories": {
          "label": "Tägliche Kalorien"
        },
        "protein": {
          "label": "Protein"
        },
        "carbs": {
          "label": "Kohlenhydrate"
        },
        "fat": {
          "label": "Fett"
        },
        "proteinCal": {
          "label": "Protein-Kalorien"
        },
        "carbsCal": {
          "label": "Kohlenhydrat-Kalorien"
        },
        "fatCal": {
          "label": "Fett-Kalorien"
        },
        "fiber": {
          "label": "Tägliche Ballaststoffe"
        },
        "water": {
          "label": "Tägliches Wasser"
        },
        "bmrMifflin": {
          "label": "BMR (Mifflin-St Jeor)"
        },
        "bmrKatch": {
          "label": "BMR (Katch-McArdle)"
        },
        "tdee": {
          "label": "TDEE"
        },
        "calorieAdjustment": {
          "label": "Kalorien-Anpassung"
        },
        "proteinPerLb": {
          "label": "Protein pro Pfund"
        },
        "proteinPerKg": {
          "label": "Protein pro kg"
        },
        "proteinRating": {
          "label": "Protein-Bewertung"
        },
        "maxSugar": {
          "label": "Max. zugesetzter Zucker"
        },
        "maxSatFat": {
          "label": "Max. gesättigte Fette"
        }
      },
      "tooltips": {
        "dailyCalories": "Gesamte tägliche Kalorien angepasst für Ihr Ziel (TDEE ± Defizit/Überschuss)",
        "protein": "Gramm Protein pro Tag — essentiell für Muskelreparatur und Sättigung",
        "carbs": "Gramm Kohlenhydrate pro Tag — die primäre Energiequelle Ihres Körpers",
        "fat": "Gramm Nahrungsfett pro Tag — lebenswichtig für Hormone und Nährstoffaufnahme",
        "proteinCal": "Kalorien aus Protein (4 kcal pro Gramm)",
        "carbsCal": "Kalorien aus Kohlenhydraten (4 kcal pro Gramm)",
        "fatCal": "Kalorien aus Fett (9 kcal pro Gramm)",
        "fiber": "Empfohlene tägliche Ballaststoffzufuhr basierend auf IOM-Richtlinien (14g pro 1.000 kcal)",
        "water": "Empfohlene tägliche Wasserzufuhr basierend auf Körpergewicht (~15 ml pro kg)",
        "bmrMifflin": "Grundumsatz berechnet mit der Mifflin-St Jeor Gleichung",
        "bmrKatch": "Grundumsatz berechnet mit der Katch-McArdle Gleichung (erfordert Körperfett %)",
        "tdee": "Gesamtenergieumsatz = BMR × Aktivitätsfaktor",
        "calorieAdjustment": "Der Kalorienüberschuss oder -defizit angewendet auf Ihren TDEE basierend auf Ihrem Ziel",
        "proteinPerLb": "Gramm Protein pro Pfund Körpergewicht — Schlüsselmetrik für Athleten",
        "proteinPerKg": "Gramm Protein pro Kilogramm Körpergewicht — internationaler Standard",
        "proteinRating": "Wie Ihre Proteinzufuhr im Vergleich zu forschungsbasierten Empfehlungen abschneidet",
        "maxSugar": "WHO empfiehlt, zugesetzten Zucker auf <25g/Tag (6 TL) für die Gesundheit zu begrenzen",
        "maxSatFat": "AHA empfiehlt, gesättigte Fette auf <10% der Gesamtkalorien zu begrenzen"
      },
      "presets": {
        "cutMale": {
          "label": "Diät (Mann)",
          "description": "25 Jahre Mann, 80 kg, 178 cm, mäßig aktiv, 0,5 kg/Woche verlieren"
        },
        "cutFemale": {
          "label": "Diät (Frau)",
          "description": "25 Jahre Frau, 63 kg, 165 cm, mäßig aktiv, 0,5 kg/Woche verlieren"
        },
        "bulkMale": {
          "label": "Aufbau (Mann)",
          "description": "25 Jahre Mann, 80 kg, 178 cm, sehr aktiv, 0,5 kg/Woche zunehmen"
        },
        "bulkFemale": {
          "label": "Aufbau (Frau)",
          "description": "25 Jahre Frau, 63 kg, 165 cm, sehr aktiv, lean gain 0,25 kg/Woche"
        },
        "ketoMale": {
          "label": "Keto (Mann)",
          "description": "35 Jahre Mann, 90 kg, 183 cm, Keto-Diät, 0,5 kg/Woche verlieren"
        },
        "veganAthlete": {
          "label": "Veganer Athlet",
          "description": "28 Jahre Frau, 61 kg, 168 cm, aktiv, proteinreiche vegane Ernährung"
        },
        "recomp": {
          "label": "Körperrekomposition",
          "description": "28 Jahre Mann, 79 kg, 178 cm, aktiv, proteinreich, Gewicht halten — alle Details AN"
        },
        "endurance": {
          "label": "Ausdauersportler",
          "description": "30 Jahre Mann, 72 kg, 175 cm, sehr aktiv, ausgewogene Ernährung, 6 Mahlzeiten — Stoffwechsel AN"
        }
      },
      "values": {
        "g": "g",
        "kcal": "kcal",
        "oz": "oz",
        "L": "L",
        "N/A": "N/V",
        "Requires body fat %": "Erfordert Körperfett %",
        "Breakfast": "Frühstück",
        "Lunch": "Mittagessen",
        "Dinner": "Abendessen",
        "Snack": "Snack",
        "Snack 1": "Snack 1",
        "Snack 2": "Snack 2",
        "Snack 3": "Snack 3",
        "Total": "Gesamt",
        "g/lb": "g/Pfund",
        "g/kg": "g/kg"
      },
      "formats": {
        "summary": "Ihr tägliches Ziel sind {dailyCalories} Kalorien: {protein}g Protein ({proteinPct}%), {carbs}g Kohlenhydrate ({carbsPct}%), {fat}g Fett ({fatPct}%). Ballaststoffe: {fiber}g. Wasser: {water}."
      },
      "infoCards": {
        "macros": {
          "title": "Ihre täglichen Makronährstoffe",
          "items": [
            {
              "label": "Tägliche Kalorien",
              "valueKey": "dailyCalories"
            },
            {
              "label": "Protein",
              "valueKey": "protein"
            },
            {
              "label": "Kohlenhydrate",
              "valueKey": "carbs"
            },
            {
              "label": "Fett",
              "valueKey": "fat"
            }
          ]
        },
        "calories": {
          "title": "Kalorien-Aufschlüsselung",
          "items": [
            {
              "label": "Protein-Kalorien",
              "valueKey": "proteinCal"
            },
            {
              "label": "Kohlenhydrat-Kalorien",
              "valueKey": "carbsCal"
            },
            {
              "label": "Fett-Kalorien",
              "valueKey": "fatCal"
            },
            {
              "label": "Gesamtkalorien",
              "valueKey": "dailyCalories"
            }
          ]
        },
        "tips": {
          "title": "Profi-Tipps",
          "items": [
            "Erreichen Sie zuerst Ihr Proteinziel — es ist der wichtigste Makronährstoff für Muskel und Sättigung",
            "Verfolgen Sie Ballaststoffe separat — streben Sie mindestens 25-35g pro Tag aus Vollwertkost an",
            "Bleiben Sie hydriert — Wasserzufuhr beeinflusst Energie, Erholung und Verdauung",
            "Passen Sie Makronährstoffe wöchentlich basierend auf Fortschritt an — Ihr Körper passt sich mit der Zeit an"
          ]
        }
      },
      "chart": {
        "title": "Makronährstoff-Verteilung",
        "series": {
          "protein": "Protein",
          "carbs": "Kohlenhydrate",
          "fat": "Fett"
        }
      },
      "detailedTable": {
        "mealSplit": {
          "button": "Mahlzeitenaufschlüsselung anzeigen",
          "title": "Makronährstoff-Aufschlüsselung pro Mahlzeit",
          "columns": {
            "meal": "Mahlzeit",
            "protein": "Protein",
            "carbs": "Kohlenhydrate",
            "fat": "Fett",
            "calories": "Kalorien"
          }
        }
      },
      "education": {
        "whatAreMacros": {
          "title": "Was sind Makronährstoffe?",
          "content": "Makronährstoffe (Makros) sind die drei Nährstoffe, die Ihr Körper in großen Mengen benötigt: Protein, Kohlenhydrate und Fett. Im Gegensatz zu Mikronährstoffen (Vitaminen und Mineralien) liefern Makros Energie und werden in Gramm gemessen. Jeder Makro erfüllt einen einzigartigen Zweck: Protein baut Muskeln auf und repariert sie, Kohlenhydrate versorgen Ihre Workouts und Ihr Gehirn mit Energie, und Fett unterstützt Hormone und Nährstoffaufnahme. Das Verfolgen von Makros anstatt nur Kalorien stellt sicher, dass Sie die richtige Balance von Nährstoffen erhalten, um Ihre spezifischen Ziele zu unterstützen — ob das Fettabbau, Muskelaufbau oder sportliche Leistung ist."
        },
        "bmrFormulas": {
          "title": "Mifflin-St Jeor vs Katch-McArdle",
          "content": "Dieser Rechner verwendet zwei BMR-Formeln, um Ihnen die genauesten Ergebnisse zu geben. Die Mifflin-St Jeor Gleichung ist der Goldstandard für die meisten Menschen — sie basiert auf Alter, Geschlecht, Gewicht und Größe. Die Katch-McArdle Formel ist genauer, wenn Sie Ihren Körperfettanteil kennen, da sie den BMR basierend auf der Magermasse berechnet (Muskel verbrennt mehr Kalorien als Fett). Wenn Sie einen Körperfettanteil eingeben, verwendet der Rechner Katch-McArdle und zeigt beide Ergebnisse nebeneinander. Für die meisten Menschen beträgt der Unterschied 50-150 Kalorien pro Tag, was wichtig ist, wenn Sie Gewicht verlieren oder zunehmen möchten."
        },
        "dietTypes": {
          "title": "Diätart-Voreinstellungen",
          "items": [
            {
              "text": "Ausgewogen (50/25/25) — Gleiche Kohlenhydrate und Fette, moderates Protein. Am besten für allgemeine Gesundheit und Anfänger.",
              "type": "info"
            },
            {
              "text": "Low Carb (30/35/35) — Reduzierte Kohlenhydrate, höhere Fette und Protein. Gut für Fettabbau ohne Keto-Einschränkungen.",
              "type": "info"
            },
            {
              "text": "High Protein (30/40/30) — Erhöhtes Protein für Muskelaufbau oder Muskelerhaltung beim Abnehmen.",
              "type": "info"
            },
            {
              "text": "Keto (5/25/70) — Sehr niedrige Kohlenhydrate, hohe Fette. Entwickelt für Ketose und Fettanpassung.",
              "type": "warning"
            },
            {
              "text": "Paleo (35/35/30) — Ausgewogene Makros mit Vollwertkost-Betonung. Imitiert ancestrale Essgewohnheiten.",
              "type": "info"
            },
            {
              "text": "Zone (40/30/30) — Barry Sears' Zone-Diät. Ausgewogene Makros für stabilen Blutzucker und Energie.",
              "type": "info"
            },
            {
              "text": "Vegan Protein (35/40/25) — Höheres Protein für pflanzenbasierte Athleten. Erfordert strategische Lebensmittelauswahl.",
              "type": "info"
            },
            {
              "text": "Benutzerdefiniert — Setzen Sie Ihre eigenen Verhältnisse. Fortgeschrittene Benutzer können spezifische Makroziele basierend auf ihren Bedürfnissen einstellen.",
              "type": "success"
            }
          ]
        },
        "mealTiming": {
          "title": "Mahlzeitentiming & Verteilung",
          "items": [
            {
              "text": "Proteinverteilung ist wichtig — verteilen Sie Protein gleichmäßig über die Mahlzeiten (20-40g pro Mahlzeit) für optimale Muskelproteinsynthese.",
              "type": "info"
            },
            {
              "text": "Post-Workout Ernährung — die Mahlzeitenaufteilungstabelle betont Protein in Mahlzeiten um Ihr Trainingsfenster.",
              "type": "success"
            },
            {
              "text": "Mahlzeitenhäufigkeit ist flexibel — 3-6 Mahlzeiten pro Tag funktionieren gleich gut. Wählen Sie, was zu Ihrem Zeitplan und Hungergefühl passt.",
              "type": "info"
            },
            {
              "text": "Obsessieren Sie sich nicht mit dem Timing — tägliche Gesamtmakros sind für die meisten Menschen viel wichtiger als präzises Mahlzeitentiming.",
              "type": "warning"
            },
            {
              "text": "Ballaststoffe bei jeder Mahlzeit — die Verteilung der Ballaststoffzufuhr verhindert Verdauungsbeschwerden und stabilisiert den Blutzucker.",
              "type": "info"
            },
            {
              "text": "Hydratationsstrategie — trinken Sie 400-500 ml zu jeder Mahlzeit, plus extra während und nach dem Training.",
              "type": "info"
            }
          ]
        },
        "topFoods": {
          "title": "Top 50 proteinreiche Lebensmittel",
          "description": "Das Erreichen Ihres Proteinziels ist einfacher, wenn Sie wissen, welche Lebensmittel das meiste Protein pro Portion enthalten. Hier sind die Top 50 proteinreichen Lebensmittel aus allen Kategorien:",
          "examples": [
            {
              "title": "Tierische Proteine (pro 100g gekocht)",
              "steps": [
                "Hähnchenbrust: 31g Protein, 165 kcal (mager, vielseitig)",
                "Putenbrust: 30g Protein, 135 kcal (sehr mager)",
                "Thunfisch (Dose): 30g Protein, 116 kcal (Omega-3)",
                "Lachs: 25g Protein, 206 kcal (Omega-3, Vitamin D)",
                "Mageres Rindfleisch (Filet): 26g Protein, 183 kcal (Eisen, B12)",
                "Schweinefilet: 26g Protein, 143 kcal (magerer Schnitt)",
                "Garnelen: 24g Protein, 99 kcal (sehr fettarm)",
                "Kabeljau: 23g Protein, 105 kcal (Weißfisch, mild)",
                "Eier (2 große): 13g Protein, 140 kcal (vollständige Aminosäuren)",
                "Griechischer Joghurt (natur): 10g Protein/100g, 59 kcal (Probiotika)"
              ],
              "result": "Tierische Proteine liefern vollständige Aminosäureprofile und sind der einfachste Weg, hohe Proteinziele zu erreichen."
            },
            {
              "title": "Pflanzliche Proteine (pro 100g gekocht)",
              "steps": [
                "Seitan (Weizengluten): 25g Protein, 370 kcal (höchstes Pflanzenprotein)",
                "Tempeh: 19g Protein, 193 kcal (fermentiertes Soja, Probiotika)",
                "Tofu (fest): 17g Protein, 144 kcal (vielseitig, Kalzium)",
                "Edamame: 12g Protein, 122 kcal (ganze Sojabohnen)",
                "Linsen: 9g Protein, 116 kcal (Ballaststoffe, Eisen)",
                "Kichererbsen: 9g Protein, 164 kcal (Ballaststoffe, vielseitig)",
                "Schwarze Bohnen: 9g Protein, 132 kcal (Ballaststoffe, Antioxidantien)",
                "Quinoa: 4,4g Protein, 120 kcal (vollständiges Protein)",
                "Erdnussbutter (2 EL): 8g Protein, 188 kcal (gesunde Fette)",
                "Mandeln (28g): 6g Protein, 164 kcal (Vitamin E, Ballaststoffe)"
              ],
              "result": "Pflanzenproteine kommen oft mit Ballaststoffen und Mikronährstoffen, erfordern aber die Kombination von Quellen für vollständige Aminosäuren."
            }
          ]
        },
        "howToTrack": {
          "title": "Wie Sie Ihre Makronährstoffe verfolgen",
          "content": "Verwenden Sie eine Ernährungs-Tracking-App wie MyFitnessPal, Cronometer oder MacroFactor, um Ihre Mahlzeiten zu protokollieren. Wiegen Sie Ihr Essen mit einer digitalen Küchenwaage für die ersten 2-4 Wochen, bis Sie Portionen genau schätzen können. Protokollieren Sie Ihre Mahlzeiten am Abend vorher oder planen Sie eine ganze Woche mit Meal Prep. Streben Sie nicht nach Perfektion — innerhalb von 5-10g jedes Makroziels zu sein ist nah genug. Konzentrieren Sie sich auf Konsistenz über Zeit anstatt sich über das Erreichen exakter Zahlen jeden einzelnen Tag zu stressen. Verfolgen Sie mindestens 4-6 Wochen, bevor Sie Ihre Makros anpassen, da Ihr Körper Zeit braucht, sich anzupassen und echte Trends zu zeigen."
        }
      },
      "faqs": [
        {
          "question": "Was ist der Unterschied zwischen Mifflin-St Jeor und Katch-McArdle Formeln?",
          "answer": "Mifflin-St Jeor berechnet BMR basierend auf Alter, Geschlecht, Gewicht und Größe. Es ist genau für die meisten Menschen und erfordert nicht, den Körperfettanteil zu kennen. Katch-McArdle verwendet die Magermasse (Gesamtgewicht minus Fettmasse) und ist genauer, wenn Sie Ihren Körperfettanteil kennen. Der Unterschied beträgt typischerweise 50-150 Kalorien pro Tag. Wenn Sie Körperfett eingeben, verwendet der Rechner Katch-McArdle; andernfalls standardmäßig Mifflin-St Jeor."
        },
        {
          "question": "Muss ich meinen Körperfettanteil für genaue Ergebnisse kennen?",
          "answer": "Nein, der Körperfettanteil ist optional. Die Mifflin-St Jeor Formel (die keinen Körperfettanteil benötigt) ist für die meisten Menschen genau. Wenn Sie jedoch sehr schlank sind (<15% Männer, <25% Frauen) oder viel Muskelmasse haben, wird das Kennen Ihres Körperfettanteils und die Verwendung von Katch-McArdle Ihnen 5-10% genauere Ergebnisse geben. Sie können Körperfett mit Kalipern, DEXA-Scan oder bioelektrischen Impedanzwaagen messen."
        },
        {
          "question": "Was ist, wenn ich mein Proteinziel nicht jeden Tag erreichen kann?",
          "answer": "Streben Sie an, Ihr Proteinziel 80% der Zeit zu erreichen (5-6 Tage pro Woche). An Tagen, an denen Sie zu kurz kommen, versuchen Sie, innerhalb von 20g Ihres Ziels zu bleiben. Protein ist der wichtigste Makronährstoff für die Erhaltung von Muskeln während des Fettabbaus und den Aufbau von Muskeln während einer Aufbauphase. Wenn Sie konstant Schwierigkeiten haben, probieren Sie Proteinshakes, griechischen Joghurt oder mageres Fleisch bei jeder Mahlzeit. Denken Sie daran: wöchentliches Gesamtprotein ist wichtiger als tägliche Perfektion."
        },
        {
          "question": "Sollte ich verschiedene Makros an Ruhetagen vs. Trainingstagen essen?",
          "answer": "Für die meisten Menschen ist es einfacher und funktioniert genauso gut, Makros jeden Tag konstant zu halten. Fortgeschrittene Lifter verwenden jedoch manchmal 'Carb Cycling' — mehr Kohlenhydrate an Trainingstagen und weniger Kohlenhydrate an Ruhetagen essen. Wenn Sie das ausprobieren möchten, reduzieren Sie Kohlenhydrate um 50-100g an Ruhetagen und ersetzen Sie diese Kalorien durch Fett. Halten Sie Protein jeden Tag gleich, unabhängig vom Training."
        },
        {
          "question": "Ist es besser, Makros zu zählen oder nur Kalorien zu zählen?",
          "answer": "Makros zu zählen ist überlegen, wenn Ihnen die Körperzusammensetzung (Muskel vs. Fett) wichtig ist. Kalorien bestimmen, ob Sie Gewicht zunehmen oder verlieren, aber Makros bestimmen, ob dieses Gewicht Muskel oder Fett ist. Zum Beispiel bedeutet Gewichtsverlust bei niedrigem Protein, dass Sie mehr Muskel verlieren. Gewichtszunahme bei niedrigem Protein bedeutet mehr Fettzunahme. Wenn Sie wenig Zeit haben, priorisieren Sie: 1) Gesamtkalorien, 2) Protein, 3) Kohlenhydrate und Fett können flexibel sein."
        },
        {
          "question": "Wie verfolge ich Makros, ohne besessen oder gestresst zu werden?",
          "answer": "Beginnen Sie mit einem 80/20 Ansatz: verfolgen Sie 80% Ihrer Mahlzeiten (vorab geplante Mahlzeiten) und seien Sie flexibel mit 20% (auswärts essen, soziale Ereignisse). Protokollieren Sie Ihren Tag am Abend vorher, damit Sie nicht ständig an Essen denken. Verwenden Sie wiederholt die gleichen Mahlzeiten — 'langweilige' Essenspläne sind einfacher zu verfolgen und einzuhalten. Machen Sie alle 8-12 Wochen Diätpausen, wo Sie einfach Gewicht halten ohne strenges Verfolgen. Denken Sie daran: Makros sind ein Werkzeug, kein Lebensstil-Gefängnis."
        },
        {
          "question": "Was ist die beste Makroaufteilung für Muskelaufbau (Bulking)?",
          "answer": "Für Muskelaufbau ist Protein König — streben Sie 0,8-1g pro Pfund Körpergewicht an. Die klassische Bulk-Aufteilung ist 40% Kohlenhydrate, 30% Protein, 30% Fett, aber Sie können Kohlenhydrate höher (50%) treiben, wenn Sie hart trainieren und die Energie brauchen. Gehen Sie nicht unter 20% Fett, da es die Hormonproduktion beeinflusst. Gesamtkalorien sind am wichtigsten: essen Sie 10-20% über Ihrem TDEE (300-500 kcal Überschuss). Kleinere Überschüsse bedeuten langsamere, magerere Zunahmen; größere Überschüsse bedeuten schnellere Zunahmen aber mehr Fett."
        },
        {
          "question": "Kann ich gleichzeitig Fett verlieren und Muskeln aufbauen?",
          "answer": "Ja, aber nur unter spezifischen Bedingungen: Sie sind ein Anfänger-Lifter, kehren nach einer Pause zurück, oder sind deutlich übergewichtig. Das wird 'Körperrekomposition' genannt. Halten Sie Protein sehr hoch (1g pro Pfund), essen Sie bei Erhaltung oder einem kleinen Defizit (-200 bis -300 kcal), und heben Sie Gewichte 3-5x pro Woche. Der Fortschritt ist langsamer als reines Schneiden oder Bulking, aber Sie verbessern die Körperzusammensetzung ohne extreme Diät. Die meisten Menschen sehen bessere Ergebnisse, wenn sie ein Ziel nach dem anderen wählen."
        },
        {
          "question": "Warum empfiehlt der Rechner Ballaststoffe und Wasser?",
          "answer": "Ballaststoffe (14g pro 1.000 Kalorien) verbessern die Verdauung, halten Sie satt und stabilisieren den Blutzucker — besonders wichtig bei proteinreichen Diäten. Wasser (15 ml pro kg Körpergewicht) verhindert Dehydration durch erhöhte Proteinzufuhr, unterstützt die Leistung und hilft bei der Appetitkontrolle. Die meisten Menschen konsumieren beide zu wenig, was Fettabbau und Muskelaufbau sabotieren kann, trotz perfekter Makros."
        },
        {
          "question": "Wie oft sollte ich meine Makros neu berechnen, wenn ich Gewicht verliere oder zunehme?",
          "answer": "Berechnen Sie alle 10-15 Pfund Gewichtsveränderung oder alle 8-12 Wochen neu, je nachdem, was zuerst eintritt. Wenn Sie Gewicht verlieren, sinkt Ihr TDEE und Sie müssen Kalorien reduzieren, um weiterhin mit derselben Rate zu verlieren. Wenn Sie Gewicht zunehmen (Muskel), steigt Ihr TDEE. Berechnen Sie auch neu, wenn sich Ihr Aktivitätslevel erheblich ändert (neuer Job, Trainingsprogramm, Verletzung). Verfolgen Sie Ihr Gewicht wöchentlich und passen Sie an, wenn Sie nach 3-4 Wochen keinen erwarteten Fortschritt sehen."
        },
        {
          "question": "Was bedeutet Protein pro Pfund/kg und worauf sollte ich abzielen?",
          "answer": "Protein pro Pfund (oder kg) misst, wie viel Protein Sie relativ zu Ihrem Körpergewicht essen. Forschung schlägt 0,7-1,0g pro Pfund (1,6-2,2g pro kg) für aktive Menschen vor, die Muskeln aufbauen oder erhalten möchten. Für Fettabbau zielen Sie auf 0,8-1,2g pro Pfund, um Muskel zu erhalten. Für allgemeine Gesundheit sind 0,36g pro Pfund (0,8g pro kg) das Minimum RDA. Der 'Proteinanalyse' Toggle zeigt genau, wo Ihre Zufuhr relativ zu diesen Benchmarks steht."
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
    // ─── Personal Info ─────────────────────────────────────────
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

    // ─── Weight (unit dropdown) ────────────────────────────────
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

    // ─── Height (unit dropdown) ────────────────────────────────
    {
      id: "height",
      type: "number",
      defaultValue: null,
      placeholder: "178",
      unitType: "height",
      syncGroup: false,
      defaultUnit: "ft_in",
      allowedUnits: ["cm", "m", "in", "ft_in"],
    },

    // ─── Activity & Goal ───────────────────────────────────────
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
      id: "goal",
      type: "select",
      defaultValue: "maintain",
      options: [
        { value: "lose2" },
        { value: "lose1" },
        { value: "lose05" },
        { value: "maintain" },
        { value: "gain05" },
        { value: "gain1" },
        { value: "gain2" },
      ],
    },

    // ─── Diet Type ─────────────────────────────────────────────
    {
      id: "dietType",
      type: "select",
      defaultValue: "balanced",
      options: [
        { value: "balanced" },
        { value: "lowCarb" },
        { value: "highProtein" },
        { value: "keto" },
        { value: "paleo" },
        { value: "zone" },
        { value: "veganProtein" },
        { value: "custom" },
      ],
    },

    // ─── Custom Macros (conditional) ───────────────────────────
    {
      id: "customCarbs",
      type: "number",
      defaultValue: 40,
      min: 5,
      max: 75,
      suffix: "%",
      showWhen: { field: "dietType", value: "custom" },
    },
    {
      id: "customProtein",
      type: "number",
      defaultValue: 30,
      min: 10,
      max: 50,
      suffix: "%",
      showWhen: { field: "dietType", value: "custom" },
    },
    {
      id: "customFat",
      type: "number",
      defaultValue: 30,
      min: 15,
      max: 75,
      suffix: "%",
      showWhen: { field: "dietType", value: "custom" },
    },

    // ─── Optional Body Fat ─────────────────────────────────────
    {
      id: "bodyFat",
      type: "number",
      defaultValue: null,
      placeholder: "18",
      min: 3,
      max: 60,
      suffix: "%",
    },

    // ─── Meals Per Day ─────────────────────────────────────────
    {
      id: "mealsPerDay",
      type: "select",
      defaultValue: "4",
      options: [
        { value: "3" },
        { value: "4" },
        { value: "5" },
        { value: "6" },
      ],
    },

    // ─── 🔘 Toggle: Show Metabolic Details ─────────────────────
    {
      id: "showMetabolic",
      type: "toggle",
      defaultValue: false,
    },

    // ─── 🔘 Toggle: Show Protein Analysis ──────────────────────
    {
      id: "showProteinAnalysis",
      type: "toggle",
      defaultValue: false,
    },
  ],

  inputGroups: [], // EMPTY for V4

  // ═══════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════
  results: [
    { id: "dailyCalories", type: "primary", format: "number" },
    { id: "protein", type: "secondary", format: "text" },
    { id: "carbs", type: "secondary", format: "text" },
    { id: "fat", type: "secondary", format: "text" },
    { id: "proteinCal", type: "secondary", format: "text" },
    { id: "carbsCal", type: "secondary", format: "text" },
    { id: "fatCal", type: "secondary", format: "text" },
    { id: "fiber", type: "secondary", format: "text" },
    { id: "water", type: "secondary", format: "text" },
    // Metabolic — visibility controlled by calculate() returning ""
    { id: "bmrMifflin", type: "secondary", format: "text" },
    { id: "bmrKatch", type: "secondary", format: "text" },
    { id: "tdee", type: "secondary", format: "text" },
    { id: "calorieAdjustment", type: "secondary", format: "text" },
    // Protein analysis — visibility controlled by calculate() returning ""
    { id: "proteinPerLb", type: "secondary", format: "text" },
    { id: "proteinPerKg", type: "secondary", format: "text" },
    { id: "proteinRating", type: "secondary", format: "text" },
    { id: "maxSugar", type: "secondary", format: "text" },
    { id: "maxSatFat", type: "secondary", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // INFO CARDS (2 list + 1 horizontal tips)
  // ═══════════════════════════════════════════════════════════════
  infoCards: [
    { id: "macros", type: "list", icon: "🍽️", itemCount: 4 },
    { id: "calories", type: "list", icon: "🔥", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ═══════════════════════════════════════════════════════════════
  // CHART (Macro Pie Distribution)
  // ═══════════════════════════════════════════════════════════════
  chart: {
    id: "macroDistribution",
    type: "composed",
    xKey: "macro",
    height: 300,
    showGrid: false,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "percentage",
    series: [
      { key: "percentage", type: "bar", color: "#3b82f6" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // DETAILED TABLE (Meal Splitting)
  // ═══════════════════════════════════════════════════════════════
  detailedTable: {
    id: "mealSplit",
    buttonLabel: "View Meal Breakdown",
    buttonIcon: "🍴",
    modalTitle: "Per-Meal Macro Breakdown",
    columns: [
      { id: "meal", label: "Meal", align: "left" },
      { id: "protein", label: "Protein", align: "center", highlight: true },
      { id: "carbs", label: "Carbs", align: "center" },
      { id: "fat", label: "Fat", align: "center" },
      { id: "calories", label: "Calories", align: "right" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // REFERENCE DATA
  // ═══════════════════════════════════════════════════════════════
  referenceData: [], // EMPTY for V4

  // ═══════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════
  educationSections: [
    { id: "whatAreMacros", type: "prose", icon: "📚" },
    { id: "bmrFormulas", type: "prose", icon: "⚙️" },
    { id: "dietTypes", type: "list", icon: "🥗", itemCount: 8 },
    { id: "mealTiming", type: "list", icon: "⏰", itemCount: 6 },
    {
      id: "topFoods",
      type: "code-example",
      icon: "🍗",
      columns: 2,
      exampleCount: 2,
    },
    { id: "howToTrack", type: "prose", icon: "📱" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // FAQS
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
    { id: "10" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════
  references: [
    {
      authors: "Mifflin MD, St Jeor ST, Hill LA, et al",
      year: "1990",
      title:
        "A new predictive equation for resting energy expenditure in healthy individuals",
      source: "The American Journal of Clinical Nutrition",
      url: "https://pubmed.ncbi.nlm.nih.gov/2305711/",
    },
    {
      authors: "McArdle WD, Katch FI, Katch VL",
      year: "2010",
      title: "Exercise Physiology: Nutrition, Energy, and Human Performance",
      source: "Lippincott Williams & Wilkins",
      url: "https://www.lww.com/",
    },
    {
      authors: "Institute of Medicine",
      year: "2005",
      title:
        "Dietary Reference Intakes for Energy, Carbohydrate, Fiber, Fat, Fatty Acids, Cholesterol, Protein, and Amino Acids",
      source: "National Academies Press",
      url: "https://www.nap.edu/catalog/10490/",
    },
    {
      authors: "World Health Organization",
      year: "2015",
      title: "Guideline: Sugars intake for adults and children",
      source: "WHO",
      url: "https://www.who.int/publications/i/item/9789241549028",
    },
    {
      authors: "Helms ER, Aragon AA, Fitschen PJ",
      year: "2014",
      title:
        "Evidence-based recommendations for natural bodybuilding contest preparation: nutrition and supplementation",
      source: "Journal of the International Society of Sports Nutrition",
      url: "https://pubmed.ncbi.nlm.nih.gov/24864135/",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // HERO, SIDEBAR, FEATURES, RELATED
  // ═══════════════════════════════════════════════════════════════
  hero: {
    badge: "Free IIFYM Tool",
    highlight: "dual BMR formulas, 8 diet types, protein analysis, custom macros",
  },

  sidebar: {
    tips: [
      "Enter body fat % for Katch-McArdle BMR (more accurate for lean individuals)",
      "Choose 'Custom' diet type to set your own macro ratios",
      "Use the meal splitting table to plan your daily nutrition",
      "Toggle on 'Protein Analysis' to see how your intake compares to research benchmarks",
      "Track fiber and water — often overlooked but critical for results",
    ],
  },

  features: {
    highlights: [
      "Dual BMR formulas (Mifflin-St Jeor + Katch-McArdle)",
      "8 diet type presets + custom macro ratios",
      "Protein per lb/kg analysis with research-backed ratings",
      "Per-meal macro breakdown (3-6 meals)",
      "Sugar and saturated fat daily limits",
      "Fiber and water recommendations",
      "Visual macro distribution chart",
      "Top 50 high-protein foods database",
    ],
  },

  relatedCalculators: ["tdee", "calorie", "body-fat", "bmr"],

  ads: {
    topBanner: true,
    sidebar: true,
    inContent: false,
  },
};

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════

// Activity multipliers
const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
  extraActive: 2.2,
};

// Goal adjustments (calories)
const GOAL_ADJUSTMENTS: Record<string, number> = {
  lose2: -1000,
  lose1: -500,
  lose05: -250,
  maintain: 0,
  gain05: 250,
  gain1: 500,
  gain2: 1000,
};

// Diet type ratios (carbs, protein, fat)
const DIET_RATIOS: Record<string, { carbs: number; protein: number; fat: number }> = {
  balanced: { carbs: 0.5, protein: 0.25, fat: 0.25 },
  lowCarb: { carbs: 0.3, protein: 0.35, fat: 0.35 },
  highProtein: { carbs: 0.3, protein: 0.4, fat: 0.3 },
  keto: { carbs: 0.05, protein: 0.25, fat: 0.7 },
  paleo: { carbs: 0.35, protein: 0.35, fat: 0.3 },
  zone: { carbs: 0.4, protein: 0.3, fat: 0.3 },
  veganProtein: { carbs: 0.35, protein: 0.4, fat: 0.25 },
  custom: { carbs: 0.4, protein: 0.3, fat: 0.3 }, // default
};

// Meal names by count
const MEAL_NAMES: Record<number, string[]> = {
  3: ["Breakfast", "Lunch", "Dinner"],
  4: ["Breakfast", "Lunch", "Snack", "Dinner"],
  5: ["Breakfast", "Snack 1", "Lunch", "Snack 2", "Dinner"],
  6: ["Breakfast", "Snack 1", "Lunch", "Snack 2", "Dinner", "Snack 3"],
};

// Protein distribution weights (emphasize post-workout / larger meals)
const MEAL_WEIGHTS: Record<number, number[]> = {
  3: [0.3, 0.35, 0.35],
  4: [0.28, 0.3, 0.12, 0.3],
  5: [0.25, 0.1, 0.28, 0.1, 0.27],
  6: [0.22, 0.08, 0.25, 0.08, 0.25, 0.12],
};

// ═══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════

export function calculateMacroCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;

  // Translation helpers
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ─── Read inputs ───────────────────────────────────────────────
  const gender = values.gender as string;
  const age = values.age as number;
  const weight = values.weight as number | null;
  const height = values.height as number | null;
  const activityLevel = values.activityLevel as string;
  const goal = values.goal as string;
  const dietType = values.dietType as string;
  const bodyFat = values.bodyFat as number | null;
  const mealsPerDay = parseInt(values.mealsPerDay as string) || 4;

  // Toggle states
  const showMetabolic = values.showMetabolic === true;
  const showProteinAnalysis = values.showProteinAnalysis === true;

  // Custom macros
  const customCarbs = values.customCarbs as number;
  const customProtein = values.customProtein as number;
  const customFat = values.customFat as number;

  // ─── Validate required fields ──────────────────────────────────
  if (!gender || !age || weight === null || height === null) {
    return {
      values: {},
      formatted: {},
      summary: "",
      isValid: false,
    };
  }

  // ─── Read units from fieldUnits ────────────────────────────────
  const weightUnit = fieldUnits.weight || "lbs";
  const heightUnit = fieldUnits.height || "ft_in";

  // ─── Convert to metric using Unit Engine ──────────────────────
  const weightKg = convertToBase(weight, weightUnit, "weight");
  const weightLbs = convertFromBase(weightKg, "lbs", "weight");

  const heightCm = heightUnit === "ft_in"
    ? height
    : convertToBase(height, heightUnit, "height");

  // ─── BMR: Mifflin-St Jeor ─────────────────────────────────────
  const bmrMifflin =
    gender === "male"
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

  // ─── BMR: Katch-McArdle (optional) ─────────────────────────────
  let bmrKatch: number | null = null;
  if (bodyFat != null && bodyFat > 0) {
    const leanMassKg = weightKg * (1 - bodyFat / 100);
    bmrKatch = 370 + 21.6 * leanMassKg;
  }

  // Use Katch-McArdle if available, otherwise Mifflin
  const bmrUsed = bmrKatch !== null ? bmrKatch : bmrMifflin;

  // ─── TDEE ──────────────────────────────────────────────────────
  const activityMultiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.55;
  const tdee = bmrUsed * activityMultiplier;

  // ─── Goal adjustment ───────────────────────────────────────────
  const adjustment = GOAL_ADJUSTMENTS[goal] || 0;
  const dailyCalories = Math.max(Math.round(tdee + adjustment), 1200); // floor at 1200

  // ─── Macro split ───────────────────────────────────────────────
  let ratios = DIET_RATIOS[dietType] || DIET_RATIOS.balanced;

  // Override with custom if selected
  if (dietType === "custom") {
    const total = customCarbs + customProtein + customFat;
    if (total === 100) {
      ratios = {
        carbs: customCarbs / 100,
        protein: customProtein / 100,
        fat: customFat / 100,
      };
    }
  }

  const proteinCal = Math.round(dailyCalories * ratios.protein);
  const carbsCal = Math.round(dailyCalories * ratios.carbs);
  const fatCal = dailyCalories - proteinCal - carbsCal; // remainder to avoid rounding drift

  const proteinG = Math.round(proteinCal / 4);
  const carbsG = Math.round(carbsCal / 4);
  const fatG = Math.round(fatCal / 9);

  // Percentages
  const proteinPct = Math.round((proteinCal / dailyCalories) * 100);
  const carbsPct = Math.round((carbsCal / dailyCalories) * 100);
  const fatPct = 100 - proteinPct - carbsPct;

  // ─── Protein per bodyweight ──────────────────────────────────
  const proteinPerLb = proteinG / weightLbs;
  const proteinPerKg = proteinG / weightKg;

  // Protein rating based on research (Helms et al., ISSN)
  let proteinRating = "";
  if (proteinPerLb >= 1.0) {
    proteinRating = "🟢 Excellent — optimal for muscle building & fat loss";
  } else if (proteinPerLb >= 0.8) {
    proteinRating = "🟢 Good — meets recommendations for active individuals";
  } else if (proteinPerLb >= 0.6) {
    proteinRating = "🟡 Moderate — adequate for general fitness, could increase for better results";
  } else if (proteinPerLb >= 0.36) {
    proteinRating = "🟠 Low — meets minimum RDA but suboptimal for body composition";
  } else {
    proteinRating = "🔴 Very Low — below RDA minimum, increase protein intake";
  }

  // ─── Sugar & Saturated Fat limits ────────────────────────────
  // WHO: <25g added sugar/day (6 tsp) — conditional max 10% cal
  const maxSugarG = 25; // WHO strong recommendation
  // AHA: <10% of total cal from saturated fat
  const maxSatFatG = Math.round((dailyCalories * 0.10) / 9);

  // ─── Calorie adjustment display ──────────────────────────────
  let adjustmentLabel = "";
  if (adjustment < 0) {
    const pctDeficit = Math.abs(Math.round((adjustment / tdee) * 100));
    adjustmentLabel = `${adjustment.toLocaleString()} kcal (${pctDeficit}% deficit)`;
  } else if (adjustment > 0) {
    const pctSurplus = Math.round((adjustment / tdee) * 100);
    adjustmentLabel = `+${adjustment.toLocaleString()} kcal (${pctSurplus}% surplus)`;
  } else {
    adjustmentLabel = "0 kcal (maintenance)";
  }

  // ─── Fiber & Water ─────────────────────────────────────────────
  const fiberG = Math.round((dailyCalories / 1000) * 14);
  const waterOz = Math.round(weightLbs * 0.5);
  const waterL = (waterOz * 0.0295735).toFixed(1);

  // ─── Translated units ──────────────────────────────────────────
  const gUnit = v["g"] || "g";
  const calUnit = v["kcal"] || "kcal";
  const ozUnit = v["oz"] || "oz";
  const lUnit = v["L"] || "L";
  const reqBfLabel = v["Requires body fat %"] || "Requires body fat %";
  const gPerLbUnit = v["g/lb"] || "g/lb";
  const gPerKgUnit = v["g/kg"] || "g/kg";

  // ─── Meal splitting ────────────────────────────────────────────
  const mealNames = MEAL_NAMES[mealsPerDay] || MEAL_NAMES[4];
  const weights = MEAL_WEIGHTS[mealsPerDay] || MEAL_WEIGHTS[4];

  const tableData = mealNames.map((name, i) => {
    const mealProtein = Math.round(proteinG * weights[i]);
    const mealCarbs = Math.round(carbsG * weights[i]);
    const mealFat = Math.round(fatG * weights[i]);
    const mealCal = mealProtein * 4 + mealCarbs * 4 + mealFat * 9;
    return {
      meal: v[name] || name,
      protein: `${mealProtein}${gUnit}`,
      carbs: `${mealCarbs}${gUnit}`,
      fat: `${mealFat}${gUnit}`,
      calories: `${mealCal}`,
    };
  });

  // Add total row (last row auto-highlights)
  tableData.push({
    meal: v["Total"] || "Total",
    protein: `${proteinG}${gUnit}`,
    carbs: `${carbsG}${gUnit}`,
    fat: `${fatG}${gUnit}`,
    calories: `${dailyCalories}`,
  });

  // ─── Chart data (macro pie) ────────────────────────────────────
  const chartData = [
    { macro: "Protein", percentage: proteinPct },
    { macro: "Carbs", percentage: carbsPct },
    { macro: "Fat", percentage: fatPct },
  ];

  // ─── Summary ───────────────────────────────────────────────────
  const summaryTemplate =
    f.summary ||
    "Your daily target is {dailyCalories} calories: {protein}g protein ({proteinPct}%), {carbs}g carbs ({carbsPct}%), {fat}g fat ({fatPct}%). Fiber: {fiber}g. Water: {water}.";

  const waterFormatted = `${waterOz} ${ozUnit} (${waterL} ${lUnit})`;

  const summary = summaryTemplate
    .replace("{dailyCalories}", dailyCalories.toLocaleString())
    .replace("{protein}", String(proteinG))
    .replace("{proteinPct}", String(proteinPct))
    .replace("{carbs}", String(carbsG))
    .replace("{carbsPct}", String(carbsPct))
    .replace("{fat}", String(fatG))
    .replace("{fatPct}", String(fatPct))
    .replace("{fiber}", String(fiberG))
    .replace("{water}", waterFormatted);

  // ─── Return ────────────────────────────────────────────────────
  return {
    values: {
      dailyCalories,
      protein: proteinG,
      carbs: carbsG,
      fat: fatG,
      proteinCal,
      carbsCal,
      fatCal,
      fiber: fiberG,
      water: waterOz,
      bmrMifflin: Math.round(bmrMifflin),
      bmrKatch: bmrKatch !== null ? Math.round(bmrKatch) : null,
      tdee: Math.round(tdee),
      proteinPct,
      carbsPct,
      fatPct,
    },
    formatted: {
      dailyCalories: `${dailyCalories.toLocaleString()} ${calUnit}`,
      protein: `${proteinG}${gUnit} (${proteinPct}%)`,
      carbs: `${carbsG}${gUnit} (${carbsPct}%)`,
      fat: `${fatG}${gUnit} (${fatPct}%)`,
      proteinCal: `${proteinCal} ${calUnit}`,
      carbsCal: `${carbsCal} ${calUnit}`,
      fatCal: `${fatCal} ${calUnit}`,
      fiber: `${fiberG}${gUnit}`,
      water: waterFormatted,
      // Metabolic — hidden when toggle OFF
      bmrMifflin: showMetabolic ? `${Math.round(bmrMifflin).toLocaleString()} ${calUnit}` : "",
      bmrKatch: showMetabolic
        ? (bmrKatch !== null
          ? `${Math.round(bmrKatch).toLocaleString()} ${calUnit}`
          : reqBfLabel)
        : "",
      tdee: showMetabolic ? `${Math.round(tdee).toLocaleString()} ${calUnit}` : "",
      calorieAdjustment: showMetabolic ? adjustmentLabel : "",
      // Protein analysis — hidden when toggle OFF
      proteinPerLb: showProteinAnalysis ? `${proteinPerLb.toFixed(2)} ${gPerLbUnit}` : "",
      proteinPerKg: showProteinAnalysis ? `${proteinPerKg.toFixed(1)} ${gPerKgUnit}` : "",
      proteinRating: showProteinAnalysis ? proteinRating : "",
      maxSugar: showProteinAnalysis ? `${maxSugarG}${gUnit} (WHO limit)` : "",
      maxSatFat: showProteinAnalysis ? `${maxSatFatG}${gUnit} (<10% cal)` : "",
    },
    summary,
    isValid: true,
    metadata: {
      tableData,
      chartData,
    },
  };
}

export default macroCalculatorConfig;
