// ⚡ MACRO CALCULATOR V4 — IMPROVED (2026-02-05)
// New: Unit dropdowns, Custom macros, Macro pie chart, Top 50 foods table
// Dual BMR (Mifflin + Katch), 8 diet types, meal splitting, fiber + water
// ═══════════════════════════════════════════════════════════════

import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";
import { convertToBase, convertFromBase } from "@/engine/v4/units";

export const macroCalculatorConfig: CalculatorConfigV4 = {
  id: "macro",
  version: "4.0",
  category: "health",
  icon: "🍽️",

  // ═══════════════════════════════════════════════════════════════
  // PRESETS (6 presets with icons)
  // ═══════════════════════════════════════════════════════════════
  presets: [
    {
      id: "cutMale",
      icon: "🔥",
      values: {
        gender: "male",
        age: 25,
        weight: 180,
        height: 177.8,    // cm (base unit for dual ft_in)
        activityLevel: "moderate",
        goal: "lose1",
        dietType: "highProtein",
        bodyFat: null,
        mealsPerDay: "4",
      },
    },
    {
      id: "cutFemale",
      icon: "✨",
      values: {
        gender: "female",
        age: 25,
        weight: 140,
        height: 165.1,    // cm (base unit for dual ft_in)
        activityLevel: "moderate",
        goal: "lose1",
        dietType: "balanced",
        bodyFat: null,
        mealsPerDay: "4",
      },
    },
    {
      id: "bulkMale",
      icon: "💪",
      values: {
        gender: "male",
        age: 25,
        weight: 180,
        height: 177.8,    // cm (base unit for dual ft_in)
        activityLevel: "veryActive",
        goal: "gain1",
        dietType: "highProtein",
        bodyFat: null,
        mealsPerDay: "5",
      },
    },],

  // ═══════════════════════════════════════════════════════════════
  // TRANSLATIONS (English only)
  // ═══════════════════════════════════════════════════════════════
  t: {
    en: {
      name: "Macro Calculator",
      slug: "macro-calculator",
      subtitle:
        "Calculate your daily macros with dual BMR formulas, 8 diet types, custom ratios, and per-meal macro splitting — visualize your nutrition plan with our free macro calculator",
      breadcrumb: "Macros",

      // ─── SEO ───────────────────────────────────────────────────
      seo: {
        title: "Macro Calculator - Free IIFYM & TDEE Tool with Custom Ratios",
        description:
          "Calculate your daily protein, carbs and fat with Mifflin-St Jeor and Katch-McArdle formulas. 8 diet types, custom macros, meal splitting, fiber and water recommendations — completely free.",
        shortDescription:
          "Calculate daily macros with dual BMR formulas and 8 diet types",
        keywords: [
          "macro calculator",
          "macronutrient calculator",
          "IIFYM calculator",
          "TDEE macro calculator",
          "protein carbs fat calculator",
          "free macro calculator",
          "custom macro calculator",
          "meal macro calculator",
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
        },
        },
        },
        },
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
        bmrMifflin: { label: "BMR (Mifflin-St Jeor)" },
        bmrKatch: { label: "BMR (Katch-McArdle)" },
        tdee: { label: "TDEE" },
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
        bmr: {
          title: "BMR & TDEE",
          items: [
            { label: "BMR (Mifflin-St Jeor)", valueKey: "bmrMifflin" },
            { label: "BMR (Katch-McArdle)", valueKey: "bmrKatch" },
            { label: "TDEE", valueKey: "tdee" },
            { label: "Daily Goal", valueKey: "dailyCalories" },
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
            "For most people, keeping macros consistent every day is simpler and works just as well. However, advanced lifters sometimes use 'carb cycling' — eating more carbs on workout days for energy and fewer carbs on rest days. If you want to try this, reduce carbs by 50-100g on rest days and replace those calories with fat. Keep protein the same every day regardless of training.",
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
          question: "Can I use the meal splitting table for intermittent fasting?",
          answer:
            "Yes! Just condense your meals into your eating window. For example, if you do 16:8 IF (eating 12pm-8pm), use the 3-meal option and eat at 12pm, 3pm, and 7pm. The protein distribution still matters — try to spread protein across your meals rather than eating it all in one sitting. The meal weights in the table emphasize post-workout meals, which works perfectly if you train during your eating window.",
        },
      ],

      // ─── REFERENCES ────────────────────────────────────────────
      // (outside t, not translated)

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
  },

  // ═══════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════
  inputs: [
    // ─── Personal Info ─────────────────────────────────────────// ─── Weight (unit dropdown) ────────────────────────────────// ─── Height (unit dropdown) ────────────────────────────────// ─── Activity & Goal ───────────────────────────────────────// ─── Diet Type ─────────────────────────────────────────────// ─── Custom Macros (conditional) ───────────────────────────// ─── Optional Body Fat ─────────────────────────────────────// ─── Meals Per Day ─────────────────────────────────────────],

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
    { id: "bmrMifflin", type: "secondary", format: "text" },
    { id: "bmrKatch", type: "secondary", format: "text" },
    { id: "tdee", type: "secondary", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // INFO CARDS
  // ═══════════════════════════════════════════════════════════════
  infoCards: [
    { id: "macros", type: "list", icon: "🍽️", itemCount: 4 },
    { id: "calories", type: "list", icon: "🔥", itemCount: 4 },
    { id: "bmr", type: "list", icon: "📊", itemCount: 4 },
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
  ],

  // ═══════════════════════════════════════════════════════════════
  // HERO, SIDEBAR, FEATURES, RELATED
  // ═══════════════════════════════════════════════════════════════
  hero: {
    badge: "Free IIFYM Tool",
    highlight: "dual BMR formulas, 8 diet types, custom macros",
  },

  sidebar: {
    tips: [
      "Enter body fat % for Katch-McArdle BMR (more accurate for lean individuals)",
      "Choose 'Custom' diet type to set your own macro ratios",
      "Use the meal splitting table to plan your daily nutrition",
      "Track fiber and water — often overlooked but critical for results",
    ],
  },

  features: {
    highlights: [
      "Dual BMR formulas (Mifflin-St Jeor + Katch-McArdle)",
      "8 diet type presets + custom macro ratios",
      "Per-meal macro breakdown (3-6 meals)",
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
    // Ensure they add up to 100%
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

  // ─── Fiber & Water ─────────────────────────────────────────────
  const fiberG = Math.round((dailyCalories / 1000) * 14);
  const waterOz = Math.round(weightLbs * 0.5);
  const waterL = (waterOz * 0.0295735).toFixed(1);

  // ─── Translated units ──────────────────────────────────────────
  const gUnit = v["g"] || "g";
  const calUnit = v["kcal"] || "kcal";
  const ozUnit = v["oz"] || "oz";
  const lUnit = v["L"] || "L";
  const naLabel = v["N/A"] || "N/A";
  const reqBfLabel = v["Requires body fat %"] || "Requires body fat %";

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
      bmrMifflin: `${Math.round(bmrMifflin).toLocaleString()} ${calUnit}`,
      bmrKatch:
        bmrKatch !== null
          ? `${Math.round(bmrKatch).toLocaleString()} ${calUnit}`
          : reqBfLabel,
      tdee: `${Math.round(tdee).toLocaleString()} ${calUnit}`,
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
