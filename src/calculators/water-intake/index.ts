// ⚡ WATER INTAKE CALCULATOR V4 - IMPROVED (2026-02-06)
// NEW FEATURES:
// 1. 📊 Hydration Timeline Chart - bar chart showing hourly drinking schedule
// 2. 🥒 Water-Rich Foods List - top 10 hydrating foods with % water content
// 3. 🎨 Urine Color Guide - 7-level visual hydration assessment

import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════

const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.0,
  light: 1.1,
  moderate: 1.2,
  active: 1.3,
  veryActive: 1.4,
};

const CLIMATE_MULTIPLIERS: Record<string, number> = {
  temperate: 1.0,
  hot: 1.15,
  hotHumid: 1.3,
  cold: 0.95,
  highAltitude: 1.2,
};

const FOOD_WATER_PERCENT: Record<string, number> = {
  highFruitVeg: 0.25,
  mixed: 0.2,
  processed: 0.15,
};

const SCHEDULE = [
  { time: "7:00 AM", weight: 0.15 },
  { time: "9:00 AM", weight: 0.14 },
  { time: "11:00 AM", weight: 0.13 },
  { time: "1:00 PM", weight: 0.14 },
  { time: "3:00 PM", weight: 0.13 },
  { time: "5:00 PM", weight: 0.13 },
  { time: "7:00 PM", weight: 0.11 },
  { time: "9:00 PM", weight: 0.07 },
];

// ═══════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════

export const waterIntakeCalculatorConfig: CalculatorConfigV4 = {
  id: "water-intake",
  version: "4.0",
  category: "health",
  icon: "💧",

  // ═══════════════════════════════════════════════════════════════
  // PRESETS
  // ═══════════════════════════════════════════════════════════════
  presets: [
    {
      id: "activeMale",
      icon: "🏃",
      values: {
        gender: "male",
        age: 30,
        weight: 180,
        activityLevel: "active",
        exerciseMinutes: 60,
        climate: "temperate",
        specialCondition: "none",
        caffeineIntake: 1,
        alcoholIntake: 0,
        dietType: "mixed",
      },
    },
    {
      id: "activeFemale",
      icon: "🏃‍♀️",
      values: {
        gender: "female",
        age: 28,
        weight: 140,
        activityLevel: "active",
        exerciseMinutes: 45,
        climate: "temperate",
        specialCondition: "none",
        caffeineIntake: 1,
        alcoholIntake: 0,
        dietType: "highFruitVeg",
      },
    },
    {
      id: "officeWorker",
      icon: "💼",
      values: {
        gender: "male",
        age: 35,
        weight: 170,
        activityLevel: "sedentary",
        exerciseMinutes: 0,
        climate: "temperate",
        specialCondition: "none",
        caffeineIntake: 3,
        alcoholIntake: 0,
        dietType: "processed",
      },
    },
    {
      id: "expectingMom",
      icon: "🤰",
      values: {
        gender: "female",
        age: 30,
        weight: 150,
        activityLevel: "light",
        exerciseMinutes: 20,
        climate: "temperate",
        specialCondition: "pregnant",
        caffeineIntake: 0,
        alcoholIntake: 0,
        dietType: "highFruitVeg",
      },
    },
  ],

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
      min: 13,
      max: 100,
      suffix: "years",
    },
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
    {
      id: "exerciseMinutes",
      type: "number",
      defaultValue: 0,
      min: 0,
      max: 300,
      step: 5,
      suffix: "min/day",
    },
    {
      id: "climate",
      type: "select",
      defaultValue: "temperate",
      options: [
        { value: "temperate" },
        { value: "hot" },
        { value: "hotHumid" },
        { value: "cold" },
        { value: "highAltitude" },
      ],
    },
    {
      id: "specialCondition",
      type: "select",
      defaultValue: "none",
      options: [
        { value: "none" },
        { value: "pregnant" },
        { value: "breastfeeding" },
      ],
    },
    {
      id: "caffeineIntake",
      type: "number",
      defaultValue: 1,
      min: 0,
      max: 10,
      suffix: "cups/day",
    },
    {
      id: "alcoholIntake",
      type: "number",
      defaultValue: 0,
      min: 0,
      max: 10,
      suffix: "drinks/day",
    },
    {
      id: "dietType",
      type: "select",
      defaultValue: "mixed",
      options: [
        { value: "highFruitVeg" },
        { value: "mixed" },
        { value: "processed" },
      ],
    },
  ],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════
  results: [
    { id: "dailyTotal", type: "primary", format: "text" },
    { id: "fromBeverages", type: "secondary", format: "text" },
    { id: "fromFood", type: "secondary", format: "text" },
    { id: "glasses", type: "secondary", format: "text" },
    { id: "bottles500", type: "secondary", format: "text" },
    { id: "weightBased", type: "secondary", format: "text" },
    { id: "iomBased", type: "secondary", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // ✨ NEW: CHART VISUALIZATION
  // ═══════════════════════════════════════════════════════════════
  chart: {
    id: "hydrationTimeline",
    type: "bar",
    xKey: "time",
    height: 300,
    showGrid: true,
    showLegend: false,
    showTooltip: true,
    yAxisFormat: "number",
    series: [
      {
        key: "amount",
        type: "bar",
        color: "#3b82f6", // Blue (water theme)
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // INFO CARDS (4 total: 2 existing + 2 NEW)
  // ═══════════════════════════════════════════════════════════════
  infoCards: [
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
    { id: "signs", type: "horizontal", icon: "⚠️", itemCount: 4 },
    // ✨ NEW: Water-Rich Foods
    { id: "waterRichFoods", type: "list", icon: "🥒", itemCount: 10 },
    // ✨ NEW: Urine Color Guide
    { id: "urineColorGuide", type: "list", icon: "🎨", itemCount: 7 },
  ],

  referenceData: [],

  // ═══════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════
  educationSections: [
    { id: "whatIsHydration", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "hydrationSources", type: "list", icon: "📊", itemCount: 5 },
    {
      id: "examples",
      type: "code-example",
      icon: "🧮",
      columns: 2,
      exampleCount: 2,
    },
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
  ],

  // ═══════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════
  references: [
    {
      authors: "Institute of Medicine",
      year: "2004",
      title:
        "Dietary Reference Intakes for Water, Potassium, Sodium, Chloride, and Sulfate",
      source: "National Academies Press",
      url: "https://doi.org/10.17226/10925",
    },
    {
      authors: "European Food Safety Authority (EFSA)",
      year: "2010",
      title: "Scientific Opinion on Dietary Reference Values for Water",
      source: "EFSA Journal",
      url: "https://www.efsa.europa.eu/en/efsajournal/pub/1459",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // TRANSLATIONS — English Only
  // ═══════════════════════════════════════════════════════════════
  t: {
    en: {
      name: "Water Intake Calculator",
      slug: "water-intake-calculator",
      subtitle:
        "Find your personalized daily water intake based on weight, activity, climate, and lifestyle — not the generic 8 glasses rule",
      breadcrumb: "Water Intake",

      // ─── SEO ──────────────────────────────────────────────
      seo: {
        title:
          "Water Intake Calculator - Personalized Daily Hydration | Free",
        description:
          "Calculate your exact daily water intake based on weight, activity level, climate, and lifestyle. Dual-formula approach with hourly hydration schedule, caffeine offset, and food water contribution.",
        shortDescription:
          "Calculate your personalized daily water intake",
        keywords: [
          "water intake calculator",
          "daily water intake",
          "hydration calculator",
          "how much water to drink",
          "water calculator by weight",
          "daily hydration needs",
          "water intake schedule chart",
          "hydration timeline",
        ],
      },

      // ─── UI ───────────────────────────────────────────────
      calculator: { yourInformation: "Your Information" },
      ui: {
        yourInformation: "Your Information",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      // ─── INPUTS ───────────────────────────────────────────
      inputs: {
        gender: {
          label: "Gender",
          helpText: "Men typically need more water due to higher muscle mass",
          options: { male: "Male", female: "Female" },
        },
        age: {
          label: "Age",
          helpText: "Hydration needs change with age",
        },
        weight: {
          label: "Weight",
          helpText: "Heavier bodies require more water",
        },
        activityLevel: {
          label: "Activity Level",
          helpText:
            "Higher activity increases sweat and water loss",
          options: {
            sedentary: "Sedentary (office job, little movement)",
            light: "Light (walking, light chores 1-3 days/week)",
            moderate: "Moderate (exercise 3-5 days/week)",
            active: "Active (hard exercise 6-7 days/week)",
            veryActive: "Very Active (intense training, physical job)",
          },
        },
        exerciseMinutes: {
          label: "Exercise Minutes per Day",
          helpText:
            "Additional water needed: ~12 oz per 30 minutes of exercise",
        },
        climate: {
          label: "Climate",
          helpText:
            "Hot and humid climates increase water loss through sweat",
          options: {
            temperate: "Temperate (moderate weather)",
            hot: "Hot (warm/sunny climate)",
            hotHumid: "Hot & Humid (tropical)",
            cold: "Cold (winter/cool climate)",
            highAltitude: "High Altitude (above 2,500 m / 8,200 ft)",
          },
        },
        specialCondition: {
          label: "Special Condition",
          helpText:
            "Pregnancy adds ~300 mL/day, breastfeeding adds ~700 mL/day",
          options: {
            none: "None",
            pregnant: "Pregnant",
            breastfeeding: "Breastfeeding",
          },
        },
        caffeineIntake: {
          label: "Coffee / Tea",
          helpText:
            "Caffeine is a mild diuretic — increases water needs",
        },
        alcoholIntake: {
          label: "Alcoholic Drinks",
          helpText:
            "Alcohol increases water loss — each drink adds ~250 mL to your needs",
        },
        dietType: {
          label: "Diet Type",
          helpText:
            "Fruits and vegetables contribute 15-25% of daily water",
          options: {
            highFruitVeg:
              "High in fruits & vegetables (25% water from food)",
            mixed: "Mixed / balanced diet (20% water from food)",
            processed:
              "Mostly processed foods (15% water from food)",
          },
        },
      },

      // ─── RESULTS ──────────────────────────────────────────
      results: {
        dailyTotal: { label: "Total Daily Water Need" },
        fromBeverages: { label: "Water to Drink" },
        fromFood: { label: "Water from Food" },
        glasses: { label: "8oz Glasses per Day" },
        bottles500: { label: "500mL Bottles per Day" },
        weightBased: { label: "Weight-Based Estimate" },
        iomBased: { label: "IOM Recommendation" },
      },

      // ─── TOOLTIPS ─────────────────────────────────────────
      tooltips: {
        dailyTotal:
          "Total water from all sources (beverages + food)",
        fromBeverages:
          "How much you actually need to drink (total minus food contribution)",
        fromFood:
          "Estimated water you get from food based on your diet type",
        glasses: "Standard 8 oz (237 mL) glasses of water",
        bottles500: "Standard 500 mL (16.9 oz) water bottles",
        weightBased:
          "Calculated using body weight × 30-35 mL per kg",
        iomBased:
          "Based on IOM Adequate Intake: 3.7 L men, 2.7 L women",
      },

      // ─── PRESETS ──────────────────────────────────────────
      presets: {
        activeMale: {
          label: "Active Male",
          description: "180 lbs, exercises 60 min/day",
        },
        activeFemale: {
          label: "Active Female",
          description: "140 lbs, exercises 45 min/day",
        },
        officeWorker: {
          label: "Office Worker",
          description: "170 lbs, sedentary, 3 coffees/day",
        },
        expectingMom: {
          label: "Expecting Mom",
          description: "150 lbs, light activity, no caffeine",
        },
      },

      // ─── VALUES (dynamic translations) ────────────────────
      values: {
        oz: "oz",
        mL: "mL",
        L: "L",
        glasses: "glasses",
        glass: "glass",
        bottles: "bottles",
        bottle: "bottle",
        cups: "cups",
        drinks: "drinks",
        "7:00 AM": "7:00 AM",
        "9:00 AM": "9:00 AM",
        "11:00 AM": "11:00 AM",
        "1:00 PM": "1:00 PM",
        "3:00 PM": "3:00 PM",
        "5:00 PM": "5:00 PM",
        "7:00 PM": "7:00 PM",
        "9:00 PM": "9:00 PM",
        Total: "Total",
      },

      // ─── FORMATS ──────────────────────────────────────────
      formats: {
        summary:
          "Your daily water need is {dailyTotal}. Drink {fromBeverages} from beverages ({glasses} glasses or {bottles500} bottles). About {fromFood} comes from food.",
      },

      // ─── ✨ NEW: CHART TRANSLATIONS ───────────────────────
      chart: {
        title: "Your Drinking Schedule",
        xLabel: "Time of Day",
        yLabel: "Water Amount",
        series: {
          amount: "Water to Drink",
        },
      },

      // ─── INFO CARDS (2 existing + 2 NEW) ──────────────────
      infoCards: {
        tips: {
          title: "💡 Hydration Tips",
          items: [
            "Drink a full glass of water right when you wake up to rehydrate after sleep",
            "Keep a water bottle visible at your desk — visual reminders increase intake by 25%",
            "Drink water 30 minutes before meals to aid digestion and reduce overeating",
            "If your urine is dark yellow, you need more water — aim for pale straw color",
          ],
        },
        signs: {
          title: "⚠️ Dehydration Warning Signs",
          items: [
            "Dark yellow urine, dry mouth, and persistent thirst indicate dehydration",
            "Headaches, fatigue, and difficulty concentrating are early warning signs",
            "Dizziness, rapid heartbeat, and muscle cramps signal moderate dehydration",
            "Thirst lags behind actual dehydration — drink before you feel thirsty",
          ],
        },
        // ✨ NEW: Water-Rich Foods List
        waterRichFoods: {
          title: "🥒 Top 10 Hydrating Foods",
          items: [
            {
              label: "Cucumber",
              valueKey: "cucumber",
            },
            {
              label: "Lettuce",
              valueKey: "lettuce",
            },
            {
              label: "Celery",
              valueKey: "celery",
            },
            {
              label: "Tomatoes",
              valueKey: "tomatoes",
            },
            {
              label: "Zucchini",
              valueKey: "zucchini",
            },
            {
              label: "Watermelon",
              valueKey: "watermelon",
            },
            {
              label: "Bell Peppers",
              valueKey: "bellPeppers",
            },
            {
              label: "Strawberries",
              valueKey: "strawberries",
            },
            {
              label: "Cantaloupe",
              valueKey: "cantaloupe",
            },
            {
              label: "Oranges",
              valueKey: "oranges",
            },
          ],
        },
        // ✨ NEW: Urine Color Guide
        urineColorGuide: {
          title: "🎨 Urine Color Hydration Guide",
          items: [
            "Clear: Overhydrated (rare, reduce intake slightly)",
            "Pale straw: Optimal hydration ✅ (keep it up!)",
            "Light yellow: Well hydrated (good range)",
            "Yellow: Normal (could drink a bit more)",
            "Dark yellow: Mild dehydration ⚠️ (drink water now)",
            "Amber/honey: Dehydrated 🚨 (drink water immediately)",
            "Orange/brown: Severe dehydration (seek medical help)",
          ],
        },
      },

      // ─── EDUCATION ────────────────────────────────────────
      education: {
        whatIsHydration: {
          title: "Why Hydration Matters",
          content:
            "Water makes up approximately 60% of your body weight and is involved in virtually every physiological process. It regulates body temperature through sweating, transports nutrients and oxygen to cells, cushions joints and organs, removes waste through urine and bowel movements, and supports cognitive function and mood. Even mild dehydration of just 1-2% body weight loss can impair concentration, increase fatigue, and reduce physical performance. The popular '8 glasses a day' advice, while easy to remember, lacks scientific backing — your actual needs depend on your unique body, activity level, climate, and diet. This calculator provides a personalized recommendation based on established medical research rather than one-size-fits-all guidelines.",
        },
        howItWorks: {
          title: "How This Calculator Works",
          content:
            "This calculator uses two evidence-based approaches and averages them for a more accurate recommendation. The Weight-Based Method multiplies your body weight by 30-35 mL per kilogram (adjusted for gender), then applies multipliers for activity level, climate, exercise duration, and special conditions like pregnancy. The IOM Method starts from the Institute of Medicine's Adequate Intake recommendations (3.7 L for men, 2.7 L for women) and applies the same adjustment factors. Caffeine adds approximately 50 mL per cup to your needs due to its mild diuretic effect, while alcohol adds approximately 250 mL per drink. Your diet type determines how much water comes from food (15-25%), with the remainder being what you actually need to drink. The hourly schedule distributes your drinking target across the day, with more water in the morning and less before bedtime.",
        },
        considerations: {
          title: "Important Considerations",
          items: [
            {
              text: "These are estimates based on population averages — individual needs vary. Consult a healthcare provider for medical advice.",
              type: "warning",
            },
            {
              text: "Medical conditions like kidney disease, heart failure, or diabetes may require different water intake. Always follow your doctor's guidance.",
              type: "warning",
            },
            {
              text: "Thirst signals become less reliable with age — older adults should drink on a schedule rather than waiting for thirst.",
              type: "info",
            },
            {
              text: "Overhydration (hyponatremia) is rare but possible with extreme intake over 10 L/day. Drink steadily, not in large bursts.",
              type: "warning",
            },
            {
              text: "Some medications like diuretics and blood pressure drugs increase water loss and may require higher intake.",
              type: "info",
            },
            {
              text: "During illness with fever, vomiting, or diarrhea, increase intake by 500-1,000 mL per day to replace lost fluids.",
              type: "info",
            },
          ],
        },
        hydrationSources: {
          title: "Best Hydration Sources",
          items: [
            {
              text: "Plain water is the gold standard — calorie-free, readily available, and most efficiently absorbed by the body.",
              type: "info",
            },
            {
              text: "Herbal teas (caffeine-free) count fully toward your daily intake and add variety without calories.",
              type: "info",
            },
            {
              text: "Water-rich fruits like watermelon (92%), strawberries (91%), and oranges (87%) contribute significantly to hydration.",
              type: "info",
            },
            {
              text: "Vegetables like cucumber (96%), lettuce (95%), and celery (95%) are among the most hydrating foods available.",
              type: "info",
            },
            {
              text: "Caffeinated beverages still contribute to hydration despite mild diuretic effects — the net effect is positive.",
              type: "info",
            },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step water intake calculations",
          examples: [
            {
              title: "Active Male, 180 lbs",
              steps: [
                "Weight: 180 lbs = 81.6 kg",
                "Weight-Based: 81.6 × 33 mL = 2,693 mL",
                "Activity (active ×1.3): 3,501 mL",
                "Exercise 60 min: +710 mL → 4,211 mL",
                "IOM: 3,700 × 1.3 + 710 = 5,520 mL",
                "Average: (4,211 + 5,520) / 2 = 4,866 mL",
                "+1 coffee (50 mL): 4,916 mL total",
                "Food (20%): 983 mL → Drink: 3,933 mL",
              ],
              result: "Drink: 133 oz (17 glasses, 7.9 bottles)",
            },
            {
              title: "Office Female, 140 lbs",
              steps: [
                "Weight: 140 lbs = 63.5 kg",
                "Weight-Based: 63.5 × 31 mL = 1,969 mL",
                "Activity (sedentary ×1.0): 1,969 mL",
                "Exercise 0 min: no change",
                "IOM: 2,700 × 1.0 = 2,700 mL",
                "Average: (1,969 + 2,700) / 2 = 2,335 mL",
                "+3 coffees (150 mL): 2,485 mL total",
                "Food (15%): 373 mL → Drink: 2,112 mL",
              ],
              result: "Drink: 71 oz (9 glasses, 4.2 bottles)",
            },
          ],
        },
      },

      // ─── FAQs ─────────────────────────────────────────────
      faqs: [
        {
          question: "Is 8 glasses of water a day really enough?",
          answer:
            "The '8 glasses a day' rule (about 64 oz or 1.9 L) is a rough guideline but doesn't account for individual factors. Most adults actually need 80-130 oz (2.4-3.8 L) depending on weight, activity, and climate. This calculator provides a personalized recommendation based on your specific situation.",
        },
        {
          question: "Does coffee count toward my water intake?",
          answer:
            "Yes, coffee and tea do contribute to hydration. While caffeine has a mild diuretic effect, the net fluid gain is still positive. However, each cup increases your total water need by about 50 mL to compensate for the diuretic effect. Our calculator accounts for this automatically.",
        },
        {
          question: "Can I drink too much water?",
          answer:
            "Yes, though it's rare. Drinking excessive amounts (typically over 10 liters per day) can cause hyponatremia — dangerously low sodium levels. This is most common during extreme endurance events. For most people, the bigger risk is not drinking enough rather than too much.",
        },
        {
          question: "How do I know if I'm dehydrated?",
          answer:
            "The easiest indicator is urine color: pale straw yellow means well-hydrated, dark yellow indicates dehydration. Other signs include persistent thirst, dry mouth, headaches, fatigue, dizziness, and reduced urination frequency. Note that thirst is a lagging indicator — you're already mildly dehydrated when you feel thirsty.",
        },
        {
          question: "Should I drink more water in hot weather?",
          answer:
            "Absolutely. Hot climates can increase water needs by 15-30% due to increased sweating. Hot and humid conditions are even more demanding (up to 30% increase) because sweat evaporates less efficiently. Our calculator adjusts for five different climate conditions including high altitude.",
        },
        {
          question: "Does water help with weight loss?",
          answer:
            "Research shows that drinking water before meals can reduce calorie intake by promoting fullness. A 2014 study found that drinking 500 mL of water 30 minutes before meals led to significant weight reduction over 8 weeks. Water also supports metabolism and has zero calories, making it the ideal beverage for weight management.",
        },
        {
          question:
            "How much extra water do I need during pregnancy?",
          answer:
            "The EFSA recommends an additional 300 mL per day during pregnancy and 700 mL per day while breastfeeding. This supports increased blood volume, amniotic fluid, and milk production. Always consult your OB-GYN for personalized hydration advice during pregnancy.",
        },
        {
          question:
            "What about electrolytes — do I need those too?",
          answer:
            "For most people with normal diets, water alone is sufficient. However, during intense exercise lasting over 60 minutes, or in extreme heat with heavy sweating, adding electrolytes (sodium, potassium, magnesium) can help maintain fluid balance and prevent cramping. Sports drinks or electrolyte tablets are useful in these situations.",
        },
      ],

      // ─── BOILERPLATE ──────────────────────────────────────
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
      "name": "Calculadora de Ingesta de Agua",
      "slug": "calculadora-ingesta-agua",
      "subtitle": "Encuentra tu ingesta diaria personalizada de agua basada en peso, actividad, clima y estilo de vida — no la regla genérica de 8 vasos",
      "breadcrumb": "Ingesta de Agua",
      "seo": {
        "title": "Calculadora de Ingesta de Agua - Hidratación Diaria Personalizada | Gratis",
        "description": "Calcula tu ingesta diaria exacta de agua basada en peso, nivel de actividad, clima y estilo de vida. Enfoque de fórmula dual con horario de hidratación por horas, compensación de cafeína y contribución de agua de alimentos.",
        "shortDescription": "Calcula tu ingesta diaria personalizada de agua",
        "keywords": [
          "calculadora ingesta agua",
          "ingesta diaria agua",
          "calculadora hidratación",
          "cuanta agua beber",
          "calculadora agua por peso",
          "necesidades hidratación diaria",
          "tabla horario ingesta agua",
          "cronograma hidratación"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "gender": {
          "label": "Género",
          "helpText": "Los hombres típicamente necesitan más agua debido a mayor masa muscular",
          "options": {
            "male": "Hombre",
            "female": "Mujer"
          }
        },
        "age": {
          "label": "Edad",
          "helpText": "Las necesidades de hidratación cambian con la edad"
        },
        "weight": {
          "label": "Peso",
          "helpText": "Los cuerpos más pesados requieren más agua"
        },
        "activityLevel": {
          "label": "Nivel de Actividad",
          "helpText": "Mayor actividad aumenta el sudor y la pérdida de agua",
          "options": {
            "sedentary": "Sedentario (trabajo de oficina, poco movimiento)",
            "light": "Ligero (caminar, tareas ligeras 1-3 días/semana)",
            "moderate": "Moderado (ejercicio 3-5 días/semana)",
            "active": "Activo (ejercicio intenso 6-7 días/semana)",
            "veryActive": "Muy Activo (entrenamiento intenso, trabajo físico)"
          }
        },
        "exerciseMinutes": {
          "label": "Minutos de Ejercicio por Día",
          "helpText": "Agua adicional necesaria: ~350 ml por 30 minutos de ejercicio"
        },
        "climate": {
          "label": "Clima",
          "helpText": "Climas calientes y húmedos aumentan la pérdida de agua por sudor",
          "options": {
            "temperate": "Templado (clima moderado)",
            "hot": "Caliente (clima cálido/soleado)",
            "hotHumid": "Caliente y Húmedo (tropical)",
            "cold": "Frío (invierno/clima fresco)",
            "highAltitude": "Gran Altitud (sobre 2,500 m / 8,200 ft)"
          }
        },
        "specialCondition": {
          "label": "Condición Especial",
          "helpText": "Embarazo agrega ~300 ml/día, lactancia agrega ~700 ml/día",
          "options": {
            "none": "Ninguna",
            "pregnant": "Embarazada",
            "breastfeeding": "Lactancia"
          }
        },
        "caffeineIntake": {
          "label": "Café / Té",
          "helpText": "La cafeína es un diurético leve — aumenta las necesidades de agua"
        },
        "alcoholIntake": {
          "label": "Bebidas Alcohólicas",
          "helpText": "El alcohol aumenta la pérdida de agua — cada bebida agrega ~250 ml a tus necesidades"
        },
        "dietType": {
          "label": "Tipo de Dieta",
          "helpText": "Las frutas y verduras contribuyen 15-25% del agua diaria",
          "options": {
            "highFruitVeg": "Rica en frutas y verduras (25% agua de alimentos)",
            "mixed": "Mixta / dieta equilibrada (20% agua de alimentos)",
            "processed": "Principalmente alimentos procesados (15% agua de alimentos)"
          }
        }
      },
      "results": {
        "dailyTotal": {
          "label": "Necesidad Total Diaria de Agua"
        },
        "fromBeverages": {
          "label": "Agua para Beber"
        },
        "fromFood": {
          "label": "Agua de Alimentos"
        },
        "glasses": {
          "label": "Vasos de 250ml por Día"
        },
        "bottles500": {
          "label": "Botellas de 500ml por Día"
        },
        "weightBased": {
          "label": "Estimación Basada en Peso"
        },
        "iomBased": {
          "label": "Recomendación IOM"
        }
      },
      "tooltips": {
        "dailyTotal": "Agua total de todas las fuentes (bebidas + alimentos)",
        "fromBeverages": "Cuánto realmente necesitas beber (total menos contribución de alimentos)",
        "fromFood": "Agua estimada que obtienes de alimentos según tu tipo de dieta",
        "glasses": "Vasos estándar de 250 ml de agua",
        "bottles500": "Botellas estándar de 500 ml de agua",
        "weightBased": "Calculado usando peso corporal × 30-35 ml por kg",
        "iomBased": "Basado en Ingesta Adecuada IOM: 3.7 L hombres, 2.7 L mujeres"
      },
      "presets": {
        "activeMale": {
          "label": "Hombre Activo",
          "description": "82 kg, ejercita 60 min/día"
        },
        "activeFemale": {
          "label": "Mujer Activa",
          "description": "64 kg, ejercita 45 min/día"
        },
        "officeWorker": {
          "label": "Trabajador de Oficina",
          "description": "77 kg, sedentario, 3 cafés/día"
        },
        "expectingMom": {
          "label": "Futura Mamá",
          "description": "68 kg, actividad ligera, sin cafeína"
        }
      },
      "values": {
        "oz": "oz",
        "mL": "ml",
        "L": "L",
        "glasses": "vasos",
        "glass": "vaso",
        "bottles": "botellas",
        "bottle": "botella",
        "cups": "tazas",
        "drinks": "bebidas",
        "7:00 AM": "7:00 AM",
        "9:00 AM": "9:00 AM",
        "11:00 AM": "11:00 AM",
        "1:00 PM": "1:00 PM",
        "3:00 PM": "3:00 PM",
        "5:00 PM": "5:00 PM",
        "7:00 PM": "7:00 PM",
        "9:00 PM": "9:00 PM",
        "Total": "Total"
      },
      "formats": {
        "summary": "Tu necesidad diaria de agua es {dailyTotal}. Bebe {fromBeverages} de bebidas ({glasses} vasos o {bottles500} botellas). Aproximadamente {fromFood} proviene de alimentos."
      },
      "chart": {
        "title": "Tu Horario de Hidratación",
        "xLabel": "Hora del Día",
        "yLabel": "Cantidad de Agua",
        "series": {
          "amount": "Agua para Beber"
        }
      },
      "infoCards": {
        "tips": {
          "title": "💡 Consejos de Hidratación",
          "items": [
            "Bebe un vaso completo de agua al despertar para rehidratarte después del sueño",
            "Mantén una botella de agua visible en tu escritorio — los recordatorios visuales aumentan la ingesta en 25%",
            "Bebe agua 30 minutos antes de las comidas para ayudar la digestión y reducir el exceso de comida",
            "Si tu orina es amarillo oscuro, necesitas más agua — busca un color amarillo paja pálido"
          ]
        },
        "signs": {
          "title": "⚠️ Señales de Advertencia de Deshidratación",
          "items": [
            "Orina amarillo oscuro, boca seca y sed persistente indican deshidratación",
            "Dolores de cabeza, fatiga y dificultad para concentrarse son señales tempranas de advertencia",
            "Mareos, ritmo cardíaco acelerado y calambres musculares señalan deshidratación moderada",
            "La sed va detrás de la deshidratación real — bebe antes de sentir sed"
          ]
        },
        "waterRichFoods": {
          "title": "🥒 Top 10 Alimentos Hidratantes",
          "items": [
            {
              "label": "Pepino",
              "valueKey": "cucumber"
            },
            {
              "label": "Lechuga",
              "valueKey": "lettuce"
            },
            {
              "label": "Apio",
              "valueKey": "celery"
            },
            {
              "label": "Tomates",
              "valueKey": "tomatoes"
            },
            {
              "label": "Calabacín",
              "valueKey": "zucchini"
            },
            {
              "label": "Sandía",
              "valueKey": "watermelon"
            },
            {
              "label": "Pimientos",
              "valueKey": "bellPeppers"
            },
            {
              "label": "Fresas",
              "valueKey": "strawberries"
            },
            {
              "label": "Melón",
              "valueKey": "cantaloupe"
            },
            {
              "label": "Naranjas",
              "valueKey": "oranges"
            }
          ]
        },
        "urineColorGuide": {
          "title": "🎨 Guía de Color de Orina para Hidratación",
          "items": [
            "Transparente: Sobrehidratado (raro, reduce la ingesta ligeramente)",
            "Amarillo paja pálido: Hidratación óptima ✅ (¡sigue así!)",
            "Amarillo claro: Bien hidratado (buen rango)",
            "Amarillo: Normal (podrías beber un poco más)",
            "Amarillo oscuro: Deshidratación leve ⚠️ (bebe agua ahora)",
            "Ámbar/miel: Deshidratado 🚨 (bebe agua inmediatamente)",
            "Naranja/marrón: Deshidratación severa (busca ayuda médica)"
          ]
        }
      },
      "education": {
        "whatIsHydration": {
          "title": "Por Qué Importa la Hidratación",
          "content": "El agua constituye aproximadamente el 60% de tu peso corporal y está involucrada en virtualmente todos los procesos fisiológicos. Regula la temperatura corporal a través del sudor, transporta nutrientes y oxígeno a las células, amortigua articulaciones y órganos, elimina desechos a través de la orina y movimientos intestinales, y apoya la función cognitiva y el estado de ánimo. Incluso una deshidratación leve de solo 1-2% de pérdida de peso corporal puede deteriorar la concentración, aumentar la fatiga y reducir el rendimiento físico. El popular consejo de '8 vasos al día', aunque fácil de recordar, carece de respaldo científico — tus necesidades reales dependen de tu cuerpo único, nivel de actividad, clima y dieta. Esta calculadora proporciona una recomendación personalizada basada en investigación médica establecida en lugar de pautas universales."
        },
        "howItWorks": {
          "title": "Cómo Funciona Esta Calculadora",
          "content": "Esta calculadora usa dos enfoques basados en evidencia y los promedia para una recomendación más precisa. El Método Basado en Peso multiplica tu peso corporal por 30-35 ml por kilogramo (ajustado por género), luego aplica multiplicadores para nivel de actividad, clima, duración del ejercicio y condiciones especiales como embarazo. El Método IOM comienza con las recomendaciones de Ingesta Adecuada del Instituto de Medicina (3.7 L para hombres, 2.7 L para mujeres) y aplica los mismos factores de ajuste. La cafeína agrega aproximadamente 50 ml por taza a tus necesidades debido a su efecto diurético leve, mientras que el alcohol agrega aproximadamente 250 ml por bebida. Tu tipo de dieta determina cuánta agua proviene de alimentos (15-25%), siendo el resto lo que realmente necesitas beber. El horario por horas distribuye tu objetivo de bebida a lo largo del día, con más agua por la mañana y menos antes de dormir."
        },
        "considerations": {
          "title": "Consideraciones Importantes",
          "items": [
            {
              "text": "Estas son estimaciones basadas en promedios poblacionales — las necesidades individuales varían. Consulta un proveedor de salud para consejo médico.",
              "type": "warning"
            },
            {
              "text": "Condiciones médicas como enfermedad renal, insuficiencia cardíaca o diabetes pueden requerir diferente ingesta de agua. Siempre sigue la guía de tu médico.",
              "type": "warning"
            },
            {
              "text": "Las señales de sed se vuelven menos confiables con la edad — los adultos mayores deben beber según horario en lugar de esperar la sed.",
              "type": "info"
            },
            {
              "text": "La sobrehidratación (hiponatremia) es rara pero posible con ingesta extrema sobre 10 L/día. Bebe constantemente, no en grandes cantidades.",
              "type": "warning"
            },
            {
              "text": "Algunos medicamentos como diuréticos y medicinas para presión arterial aumentan la pérdida de agua y pueden requerir mayor ingesta.",
              "type": "info"
            },
            {
              "text": "Durante enfermedad con fiebre, vómito o diarrea, aumenta la ingesta en 500-1,000 ml por día para reemplazar líquidos perdidos.",
              "type": "info"
            }
          ]
        },
        "hydrationSources": {
          "title": "Mejores Fuentes de Hidratación",
          "items": [
            {
              "text": "El agua pura es el estándar dorado — sin calorías, fácilmente disponible y absorbida más eficientemente por el cuerpo.",
              "type": "info"
            },
            {
              "text": "Tés herbales (sin cafeína) cuentan completamente hacia tu ingesta diaria y agregan variedad sin calorías.",
              "type": "info"
            },
            {
              "text": "Frutas ricas en agua como sandía (92%), fresas (91%) y naranjas (87%) contribuyen significativamente a la hidratación.",
              "type": "info"
            },
            {
              "text": "Verduras como pepino (96%), lechuga (95%) y apio (95%) están entre los alimentos más hidratantes disponibles.",
              "type": "info"
            },
            {
              "text": "Bebidas con cafeína aún contribuyen a la hidratación a pesar de efectos diuréticos leves — el efecto neto es positivo.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo",
          "description": "Cálculos paso a paso de ingesta de agua",
          "examples": [
            {
              "title": "Hombre Activo, 82 kg",
              "steps": [
                "Peso: 82 kg",
                "Basado en Peso: 82 × 33 ml = 2,706 ml",
                "Actividad (activo ×1.3): 3,518 ml",
                "Ejercicio 60 min: +710 ml → 4,228 ml",
                "IOM: 3,700 × 1.3 + 710 = 5,520 ml",
                "Promedio: (4,228 + 5,520) / 2 = 4,874 ml",
                "+1 café (50 ml): 4,924 ml total",
                "Alimentos (20%): 985 ml → Beber: 3,939 ml"
              ],
              "result": "Beber: 3,939 ml (16 vasos, 7.9 botellas)"
            },
            {
              "title": "Mujer de Oficina, 64 kg",
              "steps": [
                "Peso: 64 kg",
                "Basado en Peso: 64 × 31 ml = 1,984 ml",
                "Actividad (sedentaria ×1.0): 1,984 ml",
                "Ejercicio 0 min: sin cambio",
                "IOM: 2,700 × 1.0 = 2,700 ml",
                "Promedio: (1,984 + 2,700) / 2 = 2,342 ml",
                "+3 cafés (150 ml): 2,492 ml total",
                "Alimentos (15%): 374 ml → Beber: 2,118 ml"
              ],
              "result": "Beber: 2,118 ml (8 vasos, 4.2 botellas)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Son realmente suficientes 8 vasos de agua al día?",
          "answer": "La regla de '8 vasos al día' (aproximadamente 1.9 L) es una guía general pero no considera factores individuales. La mayoría de adultos realmente necesitan 2.4-3.8 L dependiendo del peso, actividad y clima. Esta calculadora proporciona una recomendación personalizada basada en tu situación específica."
        },
        {
          "question": "¿Cuenta el café hacia mi ingesta de agua?",
          "answer": "Sí, el café y té sí contribuyen a la hidratación. Aunque la cafeína tiene un efecto diurético leve, la ganancia neta de líquido sigue siendo positiva. Sin embargo, cada taza aumenta tu necesidad total de agua en aproximadamente 50 ml para compensar el efecto diurético. Nuestra calculadora considera esto automáticamente."
        },
        {
          "question": "¿Puedo beber demasiada agua?",
          "answer": "Sí, aunque es raro. Beber cantidades excesivas (típicamente sobre 10 litros por día) puede causar hiponatremia — niveles peligrosamente bajos de sodio. Esto es más común durante eventos de resistencia extrema. Para la mayoría de personas, el mayor riesgo es no beber suficiente en lugar de demasiado."
        },
        {
          "question": "¿Cómo sé si estoy deshidratado?",
          "answer": "El indicador más fácil es el color de la orina: amarillo paja pálido significa bien hidratado, amarillo oscuro indica deshidratación. Otras señales incluyen sed persistente, boca seca, dolores de cabeza, fatiga, mareos y frecuencia reducida de orina. Nota que la sed es un indicador tardío — ya estás ligeramente deshidratado cuando sientes sed."
        },
        {
          "question": "¿Debo beber más agua en clima caliente?",
          "answer": "Absolutamente. Los climas calientes pueden aumentar las necesidades de agua en 15-30% debido al aumento del sudor. Las condiciones calientes y húmedas son aún más demandantes (hasta 30% de aumento) porque el sudor se evapora menos eficientemente. Nuestra calculadora se ajusta para cinco condiciones climáticas diferentes incluyendo gran altitud."
        },
        {
          "question": "¿Ayuda el agua con la pérdida de peso?",
          "answer": "La investigación muestra que beber agua antes de las comidas puede reducir la ingesta de calorías promoviendo la saciedad. Un estudio de 2014 encontró que beber 500 ml de agua 30 minutos antes de las comidas llevó a una reducción significativa de peso durante 8 semanas. El agua también apoya el metabolismo y tiene cero calorías, haciéndola la bebida ideal para el manejo del peso."
        },
        {
          "question": "¿Cuánta agua extra necesito durante el embarazo?",
          "answer": "La EFSA recomienda 300 ml adicionales por día durante el embarazo y 700 ml por día durante la lactancia. Esto apoya el aumento del volumen sanguíneo, líquido amniótico y producción de leche. Siempre consulta tu obstetra para consejo personalizado de hidratación durante el embarazo."
        },
        {
          "question": "¿Qué hay de los electrolitos — los necesito también?",
          "answer": "Para la mayoría de personas con dietas normales, solo agua es suficiente. Sin embargo, durante ejercicio intenso que dura más de 60 minutos, o en calor extremo con sudor abundante, agregar electrolitos (sodio, potasio, magnesio) puede ayudar a mantener el equilibrio de líquidos y prevenir calambres. Las bebidas deportivas o tabletas de electrolitos son útiles en estas situaciones."
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
      "name": "Calculadora de Ingestão de Água",
      "slug": "calculadora-ingestao-agua",
      "subtitle": "Encontre sua ingestão diária personalizada de água baseada no peso, atividade, clima e estilo de vida — não a regra genérica dos 8 copos",
      "breadcrumb": "Ingestão de Água",
      "seo": {
        "title": "Calculadora de Ingestão de Água - Hidratação Diária Personalizada | Gratuito",
        "description": "Calcule sua ingestão diária exata de água baseada no peso, nível de atividade, clima e estilo de vida. Abordagem dupla de fórmulas com cronograma de hidratação por hora, compensação de cafeína e contribuição de água dos alimentos.",
        "shortDescription": "Calcule sua ingestão diária personalizada de água",
        "keywords": [
          "calculadora ingestão água",
          "ingestão diária água",
          "calculadora hidratação",
          "quanta água beber",
          "calculadora água por peso",
          "necessidades hidratação diária",
          "cronograma ingestão água",
          "cronograma hidratação"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "gender": {
          "label": "Sexo",
          "helpText": "Homens geralmente precisam de mais água devido à maior massa muscular",
          "options": {
            "male": "Masculino",
            "female": "Feminino"
          }
        },
        "age": {
          "label": "Idade",
          "helpText": "As necessidades de hidratação mudam com a idade"
        },
        "weight": {
          "label": "Peso",
          "helpText": "Corpos mais pesados requerem mais água"
        },
        "activityLevel": {
          "label": "Nível de Atividade",
          "helpText": "Maior atividade aumenta o suor e a perda de água",
          "options": {
            "sedentary": "Sedentário (trabalho escritório, pouco movimento)",
            "light": "Leve (caminhada, tarefas leves 1-3 dias/semana)",
            "moderate": "Moderado (exercício 3-5 dias/semana)",
            "active": "Ativo (exercício intenso 6-7 dias/semana)",
            "veryActive": "Muito Ativo (treino intenso, trabalho físico)"
          }
        },
        "exerciseMinutes": {
          "label": "Minutos de Exercício por Dia",
          "helpText": "Água adicional necessária: ~350 ml a cada 30 minutos de exercício"
        },
        "climate": {
          "label": "Clima",
          "helpText": "Climas quentes e úmidos aumentam a perda de água pelo suor",
          "options": {
            "temperate": "Temperado (clima moderado)",
            "hot": "Quente (clima quente/ensolarado)",
            "hotHumid": "Quente e Úmido (tropical)",
            "cold": "Frio (inverno/clima fresco)",
            "highAltitude": "Alta Altitude (acima de 2.500 m)"
          }
        },
        "specialCondition": {
          "label": "Condição Especial",
          "helpText": "Gravidez adiciona ~300 ml/dia, amamentação adiciona ~700 ml/dia",
          "options": {
            "none": "Nenhuma",
            "pregnant": "Grávida",
            "breastfeeding": "Amamentando"
          }
        },
        "caffeineIntake": {
          "label": "Café / Chá",
          "helpText": "Cafeína é um diurético leve — aumenta as necessidades de água"
        },
        "alcoholIntake": {
          "label": "Bebidas Alcoólicas",
          "helpText": "Álcool aumenta a perda de água — cada dose adiciona ~250 ml às suas necessidades"
        },
        "dietType": {
          "label": "Tipo de Dieta",
          "helpText": "Frutas e vegetais contribuem com 15-25% da água diária",
          "options": {
            "highFruitVeg": "Rica em frutas e vegetais (25% água dos alimentos)",
            "mixed": "Dieta mista/equilibrada (20% água dos alimentos)",
            "processed": "Principalmente alimentos processados (15% água dos alimentos)"
          }
        }
      },
      "results": {
        "dailyTotal": {
          "label": "Necessidade Total Diária de Água"
        },
        "fromBeverages": {
          "label": "Água para Beber"
        },
        "fromFood": {
          "label": "Água dos Alimentos"
        },
        "glasses": {
          "label": "Copos de 240ml por Dia"
        },
        "bottles500": {
          "label": "Garrafas de 500ml por Dia"
        },
        "weightBased": {
          "label": "Estimativa Baseada no Peso"
        },
        "iomBased": {
          "label": "Recomendação IOM"
        }
      },
      "tooltips": {
        "dailyTotal": "Água total de todas as fontes (bebidas + alimentos)",
        "fromBeverages": "Quanto você realmente precisa beber (total menos contribuição dos alimentos)",
        "fromFood": "Água estimada que você obtém dos alimentos baseada no seu tipo de dieta",
        "glasses": "Copos padrão de 240 ml de água",
        "bottles500": "Garrafas padrão de 500 ml de água",
        "weightBased": "Calculado usando peso corporal × 30-35 ml por kg",
        "iomBased": "Baseado na Ingestão Adequada IOM: 3,7 L homens, 2,7 L mulheres"
      },
      "presets": {
        "activeMale": {
          "label": "Homem Ativo",
          "description": "82 kg, exercita-se 60 min/dia"
        },
        "activeFemale": {
          "label": "Mulher Ativa",
          "description": "64 kg, exercita-se 45 min/dia"
        },
        "officeWorker": {
          "label": "Trabalhador de Escritório",
          "description": "77 kg, sedentário, 3 cafés/dia"
        },
        "expectingMom": {
          "label": "Futura Mamãe",
          "description": "68 kg, atividade leve, sem cafeína"
        }
      },
      "values": {
        "oz": "ml",
        "mL": "ml",
        "L": "L",
        "glasses": "copos",
        "glass": "copo",
        "bottles": "garrafas",
        "bottle": "garrafa",
        "cups": "xícaras",
        "drinks": "doses",
        "7:00 AM": "7:00",
        "9:00 AM": "9:00",
        "11:00 AM": "11:00",
        "1:00 PM": "13:00",
        "3:00 PM": "15:00",
        "5:00 PM": "17:00",
        "7:00 PM": "19:00",
        "9:00 PM": "21:00",
        "Total": "Total"
      },
      "formats": {
        "summary": "Sua necessidade diária de água é {dailyTotal}. Beba {fromBeverages} de bebidas ({glasses} copos ou {bottles500} garrafas). Cerca de {fromFood} vem dos alimentos."
      },
      "chart": {
        "title": "Seu Cronograma de Hidratação",
        "xLabel": "Hora do Dia",
        "yLabel": "Quantidade de Água",
        "series": {
          "amount": "Água para Beber"
        }
      },
      "infoCards": {
        "tips": {
          "title": "💡 Dicas de Hidratação",
          "items": [
            "Beba um copo cheio de água logo ao acordar para se rehidratar após o sono",
            "Mantenha uma garrafa de água visível em sua mesa — lembretes visuais aumentam a ingestão em 25%",
            "Beba água 30 minutos antes das refeições para ajudar a digestão e reduzir o excesso de comida",
            "Se sua urina estiver amarelo escuro, você precisa de mais água — mire na cor palha clara"
          ]
        },
        "signs": {
          "title": "⚠️ Sinais de Alerta de Desidratação",
          "items": [
            "Urina amarelo escuro, boca seca e sede persistente indicam desidratação",
            "Dores de cabeça, fadiga e dificuldade de concentração são sinais de alerta precoce",
            "Tonturas, batimentos cardíacos rápidos e cãibras musculares sinalizam desidratação moderada",
            "A sede fica atrás da desidratação real — beba antes de sentir sede"
          ]
        },
        "waterRichFoods": {
          "title": "🥒 Top 10 Alimentos Hidratantes",
          "items": [
            {
              "label": "Pepino",
              "valueKey": "cucumber"
            },
            {
              "label": "Alface",
              "valueKey": "lettuce"
            },
            {
              "label": "Aipo",
              "valueKey": "celery"
            },
            {
              "label": "Tomate",
              "valueKey": "tomatoes"
            },
            {
              "label": "Abobrinha",
              "valueKey": "zucchini"
            },
            {
              "label": "Melancia",
              "valueKey": "watermelon"
            },
            {
              "label": "Pimentão",
              "valueKey": "bellPeppers"
            },
            {
              "label": "Morango",
              "valueKey": "strawberries"
            },
            {
              "label": "Melão",
              "valueKey": "cantaloupe"
            },
            {
              "label": "Laranja",
              "valueKey": "oranges"
            }
          ]
        },
        "urineColorGuide": {
          "title": "🎨 Guia de Cor da Urina para Hidratação",
          "items": [
            "Transparente: Super-hidratado (raro, reduza ligeiramente a ingestão)",
            "Palha clara: Hidratação ótima ✅ (continue assim!)",
            "Amarelo claro: Bem hidratado (boa faixa)",
            "Amarelo: Normal (pode beber um pouco mais)",
            "Amarelo escuro: Desidratação leve ⚠️ (beba água agora)",
            "Âmbar/mel: Desidratado 🚨 (beba água imediatamente)",
            "Laranja/marrom: Desidratação severa (procure ajuda médica)"
          ]
        }
      },
      "education": {
        "whatIsHydration": {
          "title": "Por que a Hidratação Importa",
          "content": "A água compõe aproximadamente 60% do seu peso corporal e está envolvida em praticamente todos os processos fisiológicos. Ela regula a temperatura corporal através do suor, transporta nutrientes e oxigênio para as células, amortece articulações e órgãos, remove resíduos através da urina e movimentos intestinais, e suporta a função cognitiva e o humor. Até mesmo desidratação leve de apenas 1-2% da perda de peso corporal pode prejudicar a concentração, aumentar a fadiga e reduzir o desempenho físico. O conselho popular de '8 copos por dia', embora fácil de lembrar, carece de base científica — suas necessidades reais dependem do seu corpo único, nível de atividade, clima e dieta. Esta calculadora fornece uma recomendação personalizada baseada em pesquisa médica estabelecida em vez de diretrizes universais."
        },
        "howItWorks": {
          "title": "Como Esta Calculadora Funciona",
          "content": "Esta calculadora usa duas abordagens baseadas em evidências e calcula a média delas para uma recomendação mais precisa. O Método Baseado no Peso multiplica seu peso corporal por 30-35 ml por quilograma (ajustado para sexo), depois aplica multiplicadores para nível de atividade, clima, duração do exercício e condições especiais como gravidez. O Método IOM começa das recomendações de Ingestão Adequada do Institute of Medicine (3,7 L para homens, 2,7 L para mulheres) e aplica os mesmos fatores de ajuste. Cafeína adiciona aproximadamente 50 ml por xícara às suas necessidades devido ao seu efeito diurético leve, enquanto álcool adiciona aproximadamente 250 ml por dose. Seu tipo de dieta determina quanta água vem dos alimentos (15-25%), sendo o restante o que você realmente precisa beber. O cronograma por hora distribui sua meta de bebida ao longo do dia, com mais água pela manhã e menos antes de dormir."
        },
        "considerations": {
          "title": "Considerações Importantes",
          "items": [
            {
              "text": "Estas são estimativas baseadas em médias populacionais — necessidades individuais variam. Consulte um profissional de saúde para aconselhamento médico.",
              "type": "warning"
            },
            {
              "text": "Condições médicas como doença renal, insuficiência cardíaca ou diabetes podem requerer ingestão diferente de água. Sempre siga a orientação do seu médico.",
              "type": "warning"
            },
            {
              "text": "Sinais de sede tornam-se menos confiáveis com a idade — adultos mais velhos devem beber em horários programados em vez de esperar pela sede.",
              "type": "info"
            },
            {
              "text": "Super-hidratação (hiponatremia) é rara mas possível com ingestão extrema acima de 10 L/dia. Beba de forma constante, não em grandes quantidades.",
              "type": "warning"
            },
            {
              "text": "Alguns medicamentos como diuréticos e remédios para pressão arterial aumentam a perda de água e podem requerer maior ingestão.",
              "type": "info"
            },
            {
              "text": "Durante doença com febre, vômito ou diarreia, aumente a ingestão em 500-1.000 ml por dia para repor fluidos perdidos.",
              "type": "info"
            }
          ]
        },
        "hydrationSources": {
          "title": "Melhores Fontes de Hidratação",
          "items": [
            {
              "text": "Água pura é o padrão ouro — sem calorias, prontamente disponível e absorvida mais eficientemente pelo corpo.",
              "type": "info"
            },
            {
              "text": "Chás de ervas (sem cafeína) contam totalmente para sua ingestão diária e adicionam variedade sem calorias.",
              "type": "info"
            },
            {
              "text": "Frutas ricas em água como melancia (92%), morango (91%) e laranja (87%) contribuem significativamente para a hidratação.",
              "type": "info"
            },
            {
              "text": "Vegetais como pepino (96%), alface (95%) e aipo (95%) estão entre os alimentos mais hidratantes disponíveis.",
              "type": "info"
            },
            {
              "text": "Bebidas com cafeína ainda contribuem para a hidratação apesar dos efeitos diuréticos leves — o efeito líquido é positivo.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo",
          "description": "Cálculos de ingestão de água passo a passo",
          "examples": [
            {
              "title": "Homem Ativo, 82 kg",
              "steps": [
                "Peso: 82 kg",
                "Baseado no Peso: 82 × 33 ml = 2.706 ml",
                "Atividade (ativo ×1,3): 3.518 ml",
                "Exercício 60 min: +710 ml → 4.228 ml",
                "IOM: 3.700 × 1,3 + 710 = 5.520 ml",
                "Média: (4.228 + 5.520) / 2 = 4.874 ml",
                "+1 café (50 ml): 4.924 ml total",
                "Alimentos (20%): 985 ml → Beber: 3.939 ml"
              ],
              "result": "Beber: 3.939 ml (16 copos, 7,9 garrafas)"
            },
            {
              "title": "Mulher Escritório, 64 kg",
              "steps": [
                "Peso: 64 kg",
                "Baseado no Peso: 64 × 31 ml = 1.984 ml",
                "Atividade (sedentário ×1,0): 1.984 ml",
                "Exercício 0 min: sem alteração",
                "IOM: 2.700 × 1,0 = 2.700 ml",
                "Média: (1.984 + 2.700) / 2 = 2.342 ml",
                "+3 cafés (150 ml): 2.492 ml total",
                "Alimentos (15%): 374 ml → Beber: 2.118 ml"
              ],
              "result": "Beber: 2.118 ml (9 copos, 4,2 garrafas)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "8 copos de água por dia são realmente suficientes?",
          "answer": "A regra dos '8 copos por dia' (cerca de 1,9 L) é uma diretriz aproximada, mas não leva em conta fatores individuais. A maioria dos adultos na verdade precisa de 2,4-3,8 L dependendo do peso, atividade e clima. Esta calculadora fornece uma recomendação personalizada baseada na sua situação específica."
        },
        {
          "question": "Café conta para minha ingestão de água?",
          "answer": "Sim, café e chá contribuem para a hidratação. Embora a cafeína tenha um efeito diurético leve, o ganho líquido de fluidos ainda é positivo. No entanto, cada xícara aumenta sua necessidade total de água em cerca de 50 ml para compensar o efeito diurético. Nossa calculadora leva isso em conta automaticamente."
        },
        {
          "question": "Posso beber água demais?",
          "answer": "Sim, embora seja raro. Beber quantidades excessivas (tipicamente acima de 10 litros por dia) pode causar hiponatremia — níveis perigosamente baixos de sódio. Isso é mais comum durante eventos de resistência extrema. Para a maioria das pessoas, o maior risco é não beber o suficiente em vez de beber demais."
        },
        {
          "question": "Como sei se estou desidratado?",
          "answer": "O indicador mais fácil é a cor da urina: amarelo palha claro significa bem hidratado, amarelo escuro indica desidratação. Outros sinais incluem sede persistente, boca seca, dores de cabeça, fadiga, tontura e frequência reduzida de urinação. Note que a sede é um indicador atrasado — você já está levemente desidratado quando sente sede."
        },
        {
          "question": "Devo beber mais água no tempo quente?",
          "answer": "Absolutamente. Climas quentes podem aumentar as necessidades de água em 15-30% devido ao aumento da transpiração. Condições quentes e úmidas são ainda mais exigentes (até 30% de aumento) porque o suor evapora com menos eficiência. Nossa calculadora se ajusta para cinco condições climáticas diferentes incluindo alta altitude."
        },
        {
          "question": "Água ajuda na perda de peso?",
          "answer": "Pesquisas mostram que beber água antes das refeições pode reduzir a ingestão calórica promovendo saciedade. Um estudo de 2014 descobriu que beber 500 ml de água 30 minutos antes das refeições levou a redução significativa de peso ao longo de 8 semanas. A água também suporta o metabolismo e tem zero calorias, tornando-se a bebida ideal para controle de peso."
        },
        {
          "question": "Quanta água extra preciso durante a gravidez?",
          "answer": "A EFSA recomenda 300 ml adicionais por dia durante a gravidez e 700 ml por dia durante a amamentação. Isso suporta o aumento do volume sanguíneo, líquido amniótico e produção de leite. Sempre consulte seu obstetra para aconselhamento personalizado de hidratação durante a gravidez."
        },
        {
          "question": "E os eletrólitos — preciso deles também?",
          "answer": "Para a maioria das pessoas com dietas normais, apenas água é suficiente. No entanto, durante exercício intenso com duração superior a 60 minutos, ou em calor extremo com transpiração intensa, adicionar eletrólitos (sódio, potássio, magnésio) pode ajudar a manter o equilíbrio de fluidos e prevenir cãibras. Bebidas esportivas ou comprimidos de eletrólitos são úteis nessas situações."
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
      "name": "Calculateur d'Apport Hydrique",
      "slug": "calculateur-apport-hydrique",
      "subtitle": "Trouvez votre apport quotidien en eau personnalisé basé sur le poids, l'activité, le climat et le mode de vie — pas la règle générique des 8 verres",
      "breadcrumb": "Apport Hydrique",
      "seo": {
        "title": "Calculateur d'Apport Hydrique - Hydratation Quotidienne Personnalisée | Gratuit",
        "description": "Calculez votre apport quotidien exact en eau basé sur le poids, niveau d'activité, climat et mode de vie. Approche double formule avec programme d'hydratation horaire, compensation caféine et contribution alimentaire.",
        "shortDescription": "Calculez votre apport quotidien personnalisé en eau",
        "keywords": [
          "calculateur apport hydrique",
          "apport quotidien eau",
          "calculateur hydratation",
          "combien eau boire",
          "calculateur eau par poids",
          "besoins hydratation quotidiens",
          "tableau programme hydratation",
          "chronologie hydratation"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "gender": {
          "label": "Sexe",
          "helpText": "Les hommes ont généralement besoin de plus d'eau en raison d'une masse musculaire plus élevée",
          "options": {
            "male": "Homme",
            "female": "Femme"
          }
        },
        "age": {
          "label": "Âge",
          "helpText": "Les besoins d'hydratation changent avec l'âge"
        },
        "weight": {
          "label": "Poids",
          "helpText": "Les corps plus lourds nécessitent plus d'eau"
        },
        "activityLevel": {
          "label": "Niveau d'Activité",
          "helpText": "Une activité élevée augmente la transpiration et la perte d'eau",
          "options": {
            "sedentary": "Sédentaire (travail de bureau, peu de mouvement)",
            "light": "Léger (marche, tâches légères 1-3 jours/semaine)",
            "moderate": "Modéré (exercice 3-5 jours/semaine)",
            "active": "Actif (exercice intense 6-7 jours/semaine)",
            "veryActive": "Très Actif (entraînement intense, travail physique)"
          }
        },
        "exerciseMinutes": {
          "label": "Minutes d'Exercice par Jour",
          "helpText": "Eau supplémentaire nécessaire : ~350 ml par 30 minutes d'exercice"
        },
        "climate": {
          "label": "Climat",
          "helpText": "Les climats chauds et humides augmentent la perte d'eau par transpiration",
          "options": {
            "temperate": "Tempéré (climat modéré)",
            "hot": "Chaud (climat chaud/ensoleillé)",
            "hotHumid": "Chaud et Humide (tropical)",
            "cold": "Froid (hiver/climat frais)",
            "highAltitude": "Haute Altitude (au-dessus de 2 500 m / 8 200 pi)"
          }
        },
        "specialCondition": {
          "label": "Condition Spéciale",
          "helpText": "La grossesse ajoute ~300 ml/jour, l'allaitement ajoute ~700 ml/jour",
          "options": {
            "none": "Aucune",
            "pregnant": "Enceinte",
            "breastfeeding": "Allaitement"
          }
        },
        "caffeineIntake": {
          "label": "Café / Thé",
          "helpText": "La caféine est un diurétique léger — augmente les besoins en eau"
        },
        "alcoholIntake": {
          "label": "Boissons Alcoolisées",
          "helpText": "L'alcool augmente la perte d'eau — chaque verre ajoute ~250 ml à vos besoins"
        },
        "dietType": {
          "label": "Type de Régime",
          "helpText": "Les fruits et légumes contribuent à 15-25% de l'eau quotidienne",
          "options": {
            "highFruitVeg": "Riche en fruits et légumes (25% d'eau des aliments)",
            "mixed": "Régime mixte / équilibré (20% d'eau des aliments)",
            "processed": "Principalement aliments transformés (15% d'eau des aliments)"
          }
        }
      },
      "results": {
        "dailyTotal": {
          "label": "Besoin Total Quotidien en Eau"
        },
        "fromBeverages": {
          "label": "Eau à Boire"
        },
        "fromFood": {
          "label": "Eau des Aliments"
        },
        "glasses": {
          "label": "Verres de 250ml par Jour"
        },
        "bottles500": {
          "label": "Bouteilles de 500ml par Jour"
        },
        "weightBased": {
          "label": "Estimation Basée sur le Poids"
        },
        "iomBased": {
          "label": "Recommandation IOM"
        }
      },
      "tooltips": {
        "dailyTotal": "Eau totale de toutes sources (boissons + aliments)",
        "fromBeverages": "Quantité que vous devez réellement boire (total moins contribution alimentaire)",
        "fromFood": "Eau estimée provenant des aliments selon votre type de régime",
        "glasses": "Verres standards de 250 ml d'eau",
        "bottles500": "Bouteilles d'eau standards de 500 ml",
        "weightBased": "Calculé en utilisant poids corporel × 30-35 ml par kg",
        "iomBased": "Basé sur l'Apport Adéquat IOM : 3,7 L hommes, 2,7 L femmes"
      },
      "presets": {
        "activeMale": {
          "label": "Homme Actif",
          "description": "82 kg, fait de l'exercice 60 min/jour"
        },
        "activeFemale": {
          "label": "Femme Active",
          "description": "64 kg, fait de l'exercice 45 min/jour"
        },
        "officeWorker": {
          "label": "Employé de Bureau",
          "description": "77 kg, sédentaire, 3 cafés/jour"
        },
        "expectingMom": {
          "label": "Future Maman",
          "description": "68 kg, activité légère, pas de caféine"
        }
      },
      "values": {
        "oz": "ml",
        "mL": "ml",
        "L": "L",
        "glasses": "verres",
        "glass": "verre",
        "bottles": "bouteilles",
        "bottle": "bouteille",
        "cups": "tasses",
        "drinks": "boissons",
        "7:00 AM": "7h00",
        "9:00 AM": "9h00",
        "11:00 AM": "11h00",
        "1:00 PM": "13h00",
        "3:00 PM": "15h00",
        "5:00 PM": "17h00",
        "7:00 PM": "19h00",
        "9:00 PM": "21h00",
        "Total": "Total"
      },
      "formats": {
        "summary": "Votre besoin quotidien en eau est de {dailyTotal}. Buvez {fromBeverages} de boissons ({glasses} verres ou {bottles500} bouteilles). Environ {fromFood} provient des aliments."
      },
      "chart": {
        "title": "Votre Programme de Consommation",
        "xLabel": "Heure de la Journée",
        "yLabel": "Quantité d'Eau",
        "series": {
          "amount": "Eau à Boire"
        }
      },
      "infoCards": {
        "tips": {
          "title": "💡 Conseils d'Hydratation",
          "items": [
            "Buvez un verre d'eau complet dès le réveil pour vous réhydrater après le sommeil",
            "Gardez une bouteille d'eau visible à votre bureau — les rappels visuels augmentent la consommation de 25%",
            "Buvez de l'eau 30 minutes avant les repas pour faciliter la digestion et réduire la suralimentation",
            "Si votre urine est jaune foncé, vous avez besoin de plus d'eau — visez une couleur jaune paille pâle"
          ]
        },
        "signs": {
          "title": "⚠️ Signes d'Alerte de Déshydratation",
          "items": [
            "Urine jaune foncé, bouche sèche et soif persistante indiquent une déshydratation",
            "Maux de tête, fatigue et difficultés de concentration sont des signes d'alerte précoces",
            "Étourdissements, rythme cardiaque rapide et crampes musculaires signalent une déshydratation modérée",
            "La soif est en retard par rapport à la déshydratation réelle — buvez avant d'avoir soif"
          ]
        },
        "waterRichFoods": {
          "title": "🥒 Top 10 des Aliments Hydratants",
          "items": [
            {
              "label": "Concombre",
              "valueKey": "concombre"
            },
            {
              "label": "Laitue",
              "valueKey": "laitue"
            },
            {
              "label": "Céleri",
              "valueKey": "celeri"
            },
            {
              "label": "Tomates",
              "valueKey": "tomates"
            },
            {
              "label": "Courgette",
              "valueKey": "courgette"
            },
            {
              "label": "Pastèque",
              "valueKey": "pasteque"
            },
            {
              "label": "Poivrons",
              "valueKey": "poivrons"
            },
            {
              "label": "Fraises",
              "valueKey": "fraises"
            },
            {
              "label": "Cantaloup",
              "valueKey": "cantaloup"
            },
            {
              "label": "Oranges",
              "valueKey": "oranges"
            }
          ]
        },
        "urineColorGuide": {
          "title": "🎨 Guide de Couleur d'Urine pour l'Hydratation",
          "items": [
            "Transparente : Surhydraté (rare, réduire légèrement la consommation)",
            "Jaune paille pâle : Hydratation optimale ✅ (continuez !)",
            "Jaune clair : Bien hydraté (bonne fourchette)",
            "Jaune : Normal (pourrait boire un peu plus)",
            "Jaune foncé : Déshydratation légère ⚠️ (boire de l'eau maintenant)",
            "Ambre/miel : Déshydraté 🚨 (boire de l'eau immédiatement)",
            "Orange/brun : Déshydratation sévère (consulter un médecin)"
          ]
        }
      },
      "education": {
        "whatIsHydration": {
          "title": "Pourquoi l'Hydratation Importe",
          "content": "L'eau représente environ 60% de votre poids corporel et participe à pratiquement tous les processus physiologiques. Elle régule la température corporelle par la transpiration, transporte nutriments et oxygène aux cellules, amortit articulations et organes, élimine les déchets par l'urine et les selles, et soutient fonction cognitive et humeur. Même une déshydratation légère de seulement 1-2% de perte de poids peut altérer la concentration, augmenter la fatigue et réduire les performances physiques. Le conseil populaire des '8 verres par jour', bien que facile à retenir, manque de base scientifique — vos besoins réels dépendent de votre corps unique, niveau d'activité, climat et régime. Ce calculateur fournit une recommandation personnalisée basée sur la recherche médicale établie plutôt que des directives universelles."
        },
        "howItWorks": {
          "title": "Comment Fonctionne ce Calculateur",
          "content": "Ce calculateur utilise deux approches basées sur les preuves et en fait la moyenne pour une recommandation plus précise. La Méthode Basée sur le Poids multiplie votre poids corporel par 30-35 ml par kilogramme (ajusté selon le sexe), puis applique des multiplicateurs pour niveau d'activité, climat, durée d'exercice et conditions spéciales comme la grossesse. La Méthode IOM part des recommandations d'Apport Adéquat de l'Institut de Médecine (3,7 L pour hommes, 2,7 L pour femmes) et applique les mêmes facteurs d'ajustement. La caféine ajoute environ 50 ml par tasse à vos besoins en raison de son effet diurétique léger, tandis que l'alcool ajoute environ 250 ml par verre. Votre type de régime détermine combien d'eau provient des aliments (15-25%), le reste étant ce que vous devez réellement boire. Le programme horaire distribue votre objectif de consommation sur la journée, avec plus d'eau le matin et moins avant le coucher."
        },
        "considerations": {
          "title": "Considérations Importantes",
          "items": [
            {
              "text": "Ce sont des estimations basées sur les moyennes de population — les besoins individuels varient. Consultez un professionnel de santé pour des conseils médicaux.",
              "type": "warning"
            },
            {
              "text": "Les conditions médicales comme maladie rénale, insuffisance cardiaque ou diabète peuvent nécessiter un apport hydrique différent. Suivez toujours les conseils de votre médecin.",
              "type": "warning"
            },
            {
              "text": "Les signaux de soif deviennent moins fiables avec l'âge — les adultes âgés devraient boire selon un horaire plutôt que d'attendre la soif.",
              "type": "info"
            },
            {
              "text": "La surhydratation (hyponatrémie) est rare mais possible avec un apport extrême dépassant 10 L/jour. Boire régulièrement, pas par grandes quantités.",
              "type": "warning"
            },
            {
              "text": "Certains médicaments comme diurétiques et médicaments pour tension artérielle augmentent la perte d'eau et peuvent nécessiter un apport plus élevé.",
              "type": "info"
            },
            {
              "text": "Pendant maladie avec fièvre, vomissements ou diarrhée, augmentez l'apport de 500-1000 ml par jour pour remplacer les fluides perdus.",
              "type": "info"
            }
          ]
        },
        "hydrationSources": {
          "title": "Meilleures Sources d'Hydratation",
          "items": [
            {
              "text": "L'eau pure est la référence absolue — sans calories, facilement disponible et absorbée le plus efficacement par le corps.",
              "type": "info"
            },
            {
              "text": "Les tisanes (sans caféine) comptent entièrement dans votre apport quotidien et ajoutent de la variété sans calories.",
              "type": "info"
            },
            {
              "text": "Les fruits riches en eau comme pastèque (92%), fraises (91%) et oranges (87%) contribuent significativement à l'hydratation.",
              "type": "info"
            },
            {
              "text": "Les légumes comme concombre (96%), laitue (95%) et céleri (95%) sont parmi les aliments les plus hydratants disponibles.",
              "type": "info"
            },
            {
              "text": "Les boissons caféinées contribuent encore à l'hydratation malgré les effets diurétiques légers — l'effet net est positif.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul",
          "description": "Calculs détaillés d'apport hydrique étape par étape",
          "examples": [
            {
              "title": "Homme Actif, 82 kg",
              "steps": [
                "Poids : 82 kg",
                "Basé sur poids : 82 × 33 ml = 2 706 ml",
                "Activité (actif ×1,3) : 3 518 ml",
                "Exercice 60 min : +710 ml → 4 228 ml",
                "IOM : 3 700 × 1,3 + 710 = 5 520 ml",
                "Moyenne : (4 228 + 5 520) / 2 = 4 874 ml",
                "+1 café (50 ml) : 4 924 ml total",
                "Aliments (20%) : 985 ml → À boire : 3 939 ml"
              ],
              "result": "À boire : 3 939 ml (16 verres, 7,9 bouteilles)"
            },
            {
              "title": "Femme Bureau, 64 kg",
              "steps": [
                "Poids : 64 kg",
                "Basé sur poids : 64 × 31 ml = 1 984 ml",
                "Activité (sédentaire ×1,0) : 1 984 ml",
                "Exercice 0 min : pas de changement",
                "IOM : 2 700 × 1,0 = 2 700 ml",
                "Moyenne : (1 984 + 2 700) / 2 = 2 342 ml",
                "+3 cafés (150 ml) : 2 492 ml total",
                "Aliments (15%) : 374 ml → À boire : 2 118 ml"
              ],
              "result": "À boire : 2 118 ml (8 verres, 4,2 bouteilles)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "8 verres d'eau par jour suffisent-ils vraiment ?",
          "answer": "La règle des '8 verres par jour' (environ 1,9 L) est une directive approximative mais ne tient pas compte des facteurs individuels. La plupart des adultes ont réellement besoin de 2,4-3,8 L selon le poids, l'activité et le climat. Ce calculateur fournit une recommandation personnalisée basée sur votre situation spécifique."
        },
        {
          "question": "Le café compte-t-il dans mon apport hydrique ?",
          "answer": "Oui, le café et le thé contribuent à l'hydratation. Bien que la caféine ait un effet diurétique léger, le gain net de fluide reste positif. Cependant, chaque tasse augmente votre besoin total en eau d'environ 50 ml pour compenser l'effet diurétique. Notre calculateur en tient compte automatiquement."
        },
        {
          "question": "Puis-je boire trop d'eau ?",
          "answer": "Oui, bien que ce soit rare. Boire des quantités excessives (généralement plus de 10 litres par jour) peut causer l'hyponatrémie — des niveaux de sodium dangereusement bas. C'est plus courant lors d'événements d'endurance extrême. Pour la plupart des gens, le plus grand risque est de ne pas boire assez plutôt que trop."
        },
        {
          "question": "Comment savoir si je suis déshydraté ?",
          "answer": "L'indicateur le plus facile est la couleur de l'urine : jaune paille pâle signifie bien hydraté, jaune foncé indique déshydratation. Autres signes incluent soif persistante, bouche sèche, maux de tête, fatigue, étourdissements et fréquence urinaire réduite. Notez que la soif est un indicateur retardé — vous êtes déjà légèrement déshydraté quand vous avez soif."
        },
        {
          "question": "Dois-je boire plus d'eau par temps chaud ?",
          "answer": "Absolument. Les climats chauds peuvent augmenter les besoins en eau de 15-30% en raison de la transpiration accrue. Les conditions chaudes et humides sont encore plus exigeantes (jusqu'à 30% d'augmentation) car la sueur s'évapore moins efficacement. Notre calculateur s'ajuste pour cinq conditions climatiques différentes incluant haute altitude."
        },
        {
          "question": "L'eau aide-t-elle à perdre du poids ?",
          "answer": "La recherche montre que boire de l'eau avant les repas peut réduire l'apport calorique en favorisant la satiété. Une étude de 2014 a trouvé que boire 500 ml d'eau 30 minutes avant les repas a mené à une réduction significative du poids sur 8 semaines. L'eau soutient aussi le métabolisme et n'a pas de calories, en faisant la boisson idéale pour la gestion du poids."
        },
        {
          "question": "Combien d'eau supplémentaire ai-je besoin pendant la grossesse ?",
          "answer": "L'EFSA recommande 300 ml supplémentaires par jour pendant la grossesse et 700 ml par jour pendant l'allaitement. Cela soutient l'augmentation du volume sanguin, le liquide amniotique et la production de lait. Consultez toujours votre gynécologue-obstétricien pour des conseils d'hydratation personnalisés pendant la grossesse."
        },
        {
          "question": "Qu'en est-il des électrolytes — en ai-je aussi besoin ?",
          "answer": "Pour la plupart des gens avec des régimes normaux, l'eau seule suffit. Cependant, pendant un exercice intense durant plus de 60 minutes, ou par chaleur extrême avec transpiration abondante, ajouter des électrolytes (sodium, potassium, magnésium) peut aider à maintenir l'équilibre hydrique et prévenir les crampes. Les boissons sportives ou comprimés d'électrolytes sont utiles dans ces situations."
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
      "name": "Wasserbedarf Rechner",
      "slug": "wasserbedarf-rechner",
      "subtitle": "Finden Sie Ihren personalisierten täglichen Wasserbedarf basierend auf Gewicht, Aktivität, Klima und Lebensstil — nicht die pauschale 8-Gläser-Regel",
      "breadcrumb": "Wasserbedarf",
      "seo": {
        "title": "Wasserbedarf Rechner - Personalisierte Tägliche Hydratation | Kostenlos",
        "description": "Berechnen Sie Ihren exakten täglichen Wasserbedarf basierend auf Gewicht, Aktivitätsniveau, Klima und Lebensstil. Duale-Formel-Ansatz mit stündlichem Hydratationsplan, Koffein-Ausgleich und Wasser aus der Nahrung.",
        "shortDescription": "Berechnen Sie Ihren personalisierten täglichen Wasserbedarf",
        "keywords": [
          "wasserbedarf rechner",
          "täglicher wasserbedarf",
          "hydratation rechner",
          "wie viel wasser trinken",
          "wasser rechner nach gewicht",
          "täglicher hydratationsbedarf",
          "wasserbedarf zeitplan tabelle",
          "hydratations zeitlinie"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "gender": {
          "label": "Geschlecht",
          "helpText": "Männer benötigen typischerweise mehr Wasser aufgrund höherer Muskelmasse",
          "options": {
            "male": "Männlich",
            "female": "Weiblich"
          }
        },
        "age": {
          "label": "Alter",
          "helpText": "Hydratationsbedarf ändert sich mit dem Alter"
        },
        "weight": {
          "label": "Gewicht",
          "helpText": "Schwerere Körper benötigen mehr Wasser"
        },
        "activityLevel": {
          "label": "Aktivitätsniveau",
          "helpText": "Höhere Aktivität erhöht Schweiß und Wasserverlust",
          "options": {
            "sedentary": "Sitzend (Bürojob, wenig Bewegung)",
            "light": "Leicht (Gehen, leichte Hausarbeit 1-3 Tage/Woche)",
            "moderate": "Mäßig (Training 3-5 Tage/Woche)",
            "active": "Aktiv (hartes Training 6-7 Tage/Woche)",
            "veryActive": "Sehr Aktiv (intensives Training, körperlicher Job)"
          }
        },
        "exerciseMinutes": {
          "label": "Trainingsminuten pro Tag",
          "helpText": "Zusätzlicher Wasserbedarf: ~350 ml pro 30 Minuten Training"
        },
        "climate": {
          "label": "Klima",
          "helpText": "Heißes und feuchtes Klima erhöht Wasserverlust durch Schweiß",
          "options": {
            "temperate": "Gemäßigt (moderates Wetter)",
            "hot": "Heiß (warmes/sonniges Klima)",
            "hotHumid": "Heiß & Feucht (tropisch)",
            "cold": "Kalt (Winter/kühles Klima)",
            "highAltitude": "Große Höhe (über 2.500 m)"
          }
        },
        "specialCondition": {
          "label": "Besondere Umstände",
          "helpText": "Schwangerschaft fügt ~300 ml/Tag hinzu, Stillen fügt ~700 ml/Tag hinzu",
          "options": {
            "none": "Keine",
            "pregnant": "Schwanger",
            "breastfeeding": "Stillend"
          }
        },
        "caffeineIntake": {
          "label": "Kaffee / Tee",
          "helpText": "Koffein ist ein mildes Diuretikum — erhöht den Wasserbedarf"
        },
        "alcoholIntake": {
          "label": "Alkoholische Getränke",
          "helpText": "Alkohol erhöht Wasserverlust — jedes Getränk fügt ~250 ml zu Ihrem Bedarf hinzu"
        },
        "dietType": {
          "label": "Ernährungsart",
          "helpText": "Obst und Gemüse tragen 15-25% des täglichen Wassers bei",
          "options": {
            "highFruitVeg": "Reich an Obst & Gemüse (25% Wasser aus der Nahrung)",
            "mixed": "Gemischte / ausgewogene Ernährung (20% Wasser aus der Nahrung)",
            "processed": "Hauptsächlich verarbeitete Lebensmittel (15% Wasser aus der Nahrung)"
          }
        }
      },
      "results": {
        "dailyTotal": {
          "label": "Gesamter Täglicher Wasserbedarf"
        },
        "fromBeverages": {
          "label": "Zu Trinkendes Wasser"
        },
        "fromFood": {
          "label": "Wasser aus der Nahrung"
        },
        "glasses": {
          "label": "250ml Gläser pro Tag"
        },
        "bottles500": {
          "label": "500ml Flaschen pro Tag"
        },
        "weightBased": {
          "label": "Gewichtsbasierte Schätzung"
        },
        "iomBased": {
          "label": "IOM Empfehlung"
        }
      },
      "tooltips": {
        "dailyTotal": "Gesamtwasser aus allen Quellen (Getränke + Nahrung)",
        "fromBeverages": "Wie viel Sie tatsächlich trinken müssen (gesamt minus Nahrungsanteil)",
        "fromFood": "Geschätztes Wasser aus der Nahrung basierend auf Ihrer Ernährungsart",
        "glasses": "Standard 250 ml Gläser Wasser",
        "bottles500": "Standard 500 ml Wasserflaschen",
        "weightBased": "Berechnet mit Körpergewicht × 30-35 ml pro kg",
        "iomBased": "Basiert auf IOM Angemessener Aufnahme: 3,7 L Männer, 2,7 L Frauen"
      },
      "presets": {
        "activeMale": {
          "label": "Aktiver Mann",
          "description": "82 kg, trainiert 60 min/Tag"
        },
        "activeFemale": {
          "label": "Aktive Frau",
          "description": "64 kg, trainiert 45 min/Tag"
        },
        "officeWorker": {
          "label": "Büroangestellter",
          "description": "77 kg, sitzend, 3 Kaffees/Tag"
        },
        "expectingMom": {
          "label": "Werdende Mutter",
          "description": "68 kg, leichte Aktivität, kein Koffein"
        }
      },
      "values": {
        "oz": "oz",
        "mL": "ml",
        "L": "L",
        "glasses": "Gläser",
        "glass": "Glas",
        "bottles": "Flaschen",
        "bottle": "Flasche",
        "cups": "Tassen",
        "drinks": "Getränke",
        "7:00 AM": "7:00",
        "9:00 AM": "9:00",
        "11:00 AM": "11:00",
        "1:00 PM": "13:00",
        "3:00 PM": "15:00",
        "5:00 PM": "17:00",
        "7:00 PM": "19:00",
        "9:00 PM": "21:00",
        "Total": "Gesamt"
      },
      "formats": {
        "summary": "Ihr täglicher Wasserbedarf beträgt {dailyTotal}. Trinken Sie {fromBeverages} aus Getränken ({glasses} Gläser oder {bottles500} Flaschen). Etwa {fromFood} kommt aus der Nahrung."
      },
      "chart": {
        "title": "Ihr Trinkplan",
        "xLabel": "Tageszeit",
        "yLabel": "Wassermenge",
        "series": {
          "amount": "Zu Trinkendes Wasser"
        }
      },
      "infoCards": {
        "tips": {
          "title": "💡 Hydratations-Tipps",
          "items": [
            "Trinken Sie gleich beim Aufwachen ein volles Glas Wasser, um nach dem Schlaf zu rehydrieren",
            "Halten Sie eine Wasserflasche sichtbar an Ihrem Schreibtisch — visuelle Erinnerungen erhöhen die Aufnahme um 25%",
            "Trinken Sie 30 Minuten vor den Mahlzeiten Wasser, um die Verdauung zu unterstützen und Überessen zu reduzieren",
            "Wenn Ihr Urin dunkelgelb ist, benötigen Sie mehr Wasser — streben Sie eine blasse strohgelbe Farbe an"
          ]
        },
        "signs": {
          "title": "⚠️ Dehydratations-Warnzeichen",
          "items": [
            "Dunkelgelber Urin, trockener Mund und anhaltender Durst zeigen Dehydratation an",
            "Kopfschmerzen, Müdigkeit und Konzentrationsschwierigkeiten sind frühe Warnzeichen",
            "Schwindel, schneller Herzschlag und Muskelkrämpfe signalisieren mäßige Dehydratation",
            "Durst hinkt hinter tatsächlicher Dehydratation her — trinken Sie, bevor Sie Durst verspüren"
          ]
        },
        "waterRichFoods": {
          "title": "🥒 Top 10 Hydratisierende Lebensmittel",
          "items": [
            {
              "label": "Gurke",
              "valueKey": "cucumber"
            },
            {
              "label": "Kopfsalat",
              "valueKey": "lettuce"
            },
            {
              "label": "Sellerie",
              "valueKey": "celery"
            },
            {
              "label": "Tomaten",
              "valueKey": "tomatoes"
            },
            {
              "label": "Zucchini",
              "valueKey": "zucchini"
            },
            {
              "label": "Wassermelone",
              "valueKey": "watermelon"
            },
            {
              "label": "Paprika",
              "valueKey": "bellPeppers"
            },
            {
              "label": "Erdbeeren",
              "valueKey": "strawberries"
            },
            {
              "label": "Cantaloupe-Melone",
              "valueKey": "cantaloupe"
            },
            {
              "label": "Orangen",
              "valueKey": "oranges"
            }
          ]
        },
        "urineColorGuide": {
          "title": "🎨 Urinfarb-Hydratations-Leitfaden",
          "items": [
            "Klar: Überhydriert (selten, Aufnahme leicht reduzieren)",
            "Blasses Strohgelb: Optimale Hydratation ✅ (weiter so!)",
            "Hellgelb: Gut hydriert (guter Bereich)",
            "Gelb: Normal (könnte etwas mehr trinken)",
            "Dunkelgelb: Leichte Dehydratation ⚠️ (jetzt Wasser trinken)",
            "Bernstein/Honig: Dehydriert 🚨 (sofort Wasser trinken)",
            "Orange/Braun: Schwere Dehydratation (ärztliche Hilfe suchen)"
          ]
        }
      },
      "education": {
        "whatIsHydration": {
          "title": "Warum Hydratation Wichtig Ist",
          "content": "Wasser macht etwa 60% Ihres Körpergewichts aus und ist an praktisch jedem physiologischen Prozess beteiligt. Es reguliert die Körpertemperatur durch Schwitzen, transportiert Nährstoffe und Sauerstoff zu den Zellen, polstert Gelenke und Organe, entfernt Abfallstoffe durch Urin und Stuhlgang und unterstützt kognitive Funktion und Stimmung. Selbst eine leichte Dehydratation von nur 1-2% Körpergewichtsverlust kann die Konzentration beeinträchtigen, Müdigkeit erhöhen und die körperliche Leistung reduzieren. Der populäre Ratschlag '8 Gläser am Tag', obwohl leicht zu merken, entbehrt wissenschaftlicher Grundlage — Ihr tatsächlicher Bedarf hängt von Ihrem einzigartigen Körper, Aktivitätsniveau, Klima und Ernährung ab. Dieser Rechner bietet eine personalisierte Empfehlung basierend auf etablierter medizinischer Forschung statt pauschaler Richtlinien."
        },
        "howItWorks": {
          "title": "Wie Dieser Rechner Funktioniert",
          "content": "Dieser Rechner verwendet zwei evidenzbasierte Ansätze und mittelt sie für eine genauere Empfehlung. Die Gewichtsbasierte Methode multipliziert Ihr Körpergewicht mit 30-35 ml pro Kilogramm (angepasst nach Geschlecht) und wendet dann Multiplikatoren für Aktivitätsniveau, Klima, Trainingsdauer und besondere Umstände wie Schwangerschaft an. Die IOM-Methode beginnt mit den Empfehlungen des Institute of Medicine zur Angemessenen Aufnahme (3,7 L für Männer, 2,7 L für Frauen) und wendet die gleichen Anpassungsfaktoren an. Koffein fügt etwa 50 ml pro Tasse zu Ihrem Bedarf hinzu aufgrund seiner milden diuretischen Wirkung, während Alkohol etwa 250 ml pro Getränk hinzufügt. Ihre Ernährungsart bestimmt, wie viel Wasser aus der Nahrung kommt (15-25%), wobei der Rest das ist, was Sie tatsächlich trinken müssen. Der stündliche Zeitplan verteilt Ihr Trinkziel über den Tag, mit mehr Wasser am Morgen und weniger vor dem Schlafengehen."
        },
        "considerations": {
          "title": "Wichtige Überlegungen",
          "items": [
            {
              "text": "Dies sind Schätzungen basierend auf Bevölkerungsdurchschnitten — individuelle Bedürfnisse variieren. Konsultieren Sie einen Arzt für medizinische Beratung.",
              "type": "warning"
            },
            {
              "text": "Medizinische Erkrankungen wie Nierenerkrankungen, Herzinsuffizienz oder Diabetes können unterschiedliche Wasseraufnahme erfordern. Folgen Sie immer den Anweisungen Ihres Arztes.",
              "type": "warning"
            },
            {
              "text": "Durstsignale werden mit dem Alter weniger zuverlässig — ältere Erwachsene sollten nach einem Zeitplan trinken, anstatt auf Durst zu warten.",
              "type": "info"
            },
            {
              "text": "Überhydratation (Hyponatriämie) ist selten, aber bei extremer Aufnahme über 10 L/Tag möglich. Trinken Sie stetig, nicht in großen Mengen.",
              "type": "warning"
            },
            {
              "text": "Einige Medikamente wie Diuretika und Blutdruckmedikamente erhöhen Wasserverlust und können höhere Aufnahme erfordern.",
              "type": "info"
            },
            {
              "text": "Bei Krankheit mit Fieber, Erbrechen oder Durchfall erhöhen Sie die Aufnahme um 500-1.000 ml pro Tag, um verlorene Flüssigkeiten zu ersetzen.",
              "type": "info"
            }
          ]
        },
        "hydrationSources": {
          "title": "Beste Hydratationsquellen",
          "items": [
            {
              "text": "Reines Wasser ist der Goldstandard — kalorienfrei, leicht verfügbar und am effizientesten vom Körper aufgenommen.",
              "type": "info"
            },
            {
              "text": "Kräutertees (koffeinfrei) zählen vollständig zu Ihrer täglichen Aufnahme und bieten Abwechslung ohne Kalorien.",
              "type": "info"
            },
            {
              "text": "Wasserreiche Früchte wie Wassermelone (92%), Erdbeeren (91%) und Orangen (87%) tragen erheblich zur Hydratation bei.",
              "type": "info"
            },
            {
              "text": "Gemüse wie Gurke (96%), Kopfsalat (95%) und Sellerie (95%) gehören zu den hydratisierendsten verfügbaren Lebensmitteln.",
              "type": "info"
            },
            {
              "text": "Koffeinhaltige Getränke tragen trotz milder diuretischer Wirkung zur Hydratation bei — der Nettoeffekt ist positiv.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Berechnungsbeispiele",
          "description": "Schrittweise Wasserbedarfs-Berechnungen",
          "examples": [
            {
              "title": "Aktiver Mann, 82 kg",
              "steps": [
                "Gewicht: 82 kg",
                "Gewichtsbasiert: 82 × 33 ml = 2.706 ml",
                "Aktivität (aktiv ×1,3): 3.518 ml",
                "Training 60 min: +710 ml → 4.228 ml",
                "IOM: 3.700 × 1,3 + 710 = 5.520 ml",
                "Durchschnitt: (4.228 + 5.520) / 2 = 4.874 ml",
                "+1 Kaffee (50 ml): 4.924 ml gesamt",
                "Nahrung (20%): 985 ml → Trinken: 3.939 ml"
              ],
              "result": "Trinken: 3.939 ml (16 Gläser, 7,9 Flaschen)"
            },
            {
              "title": "Büro-Frau, 64 kg",
              "steps": [
                "Gewicht: 64 kg",
                "Gewichtsbasiert: 64 × 31 ml = 1.984 ml",
                "Aktivität (sitzend ×1,0): 1.984 ml",
                "Training 0 min: keine Änderung",
                "IOM: 2.700 × 1,0 = 2.700 ml",
                "Durchschnitt: (1.984 + 2.700) / 2 = 2.342 ml",
                "+3 Kaffees (150 ml): 2.492 ml gesamt",
                "Nahrung (15%): 374 ml → Trinken: 2.118 ml"
              ],
              "result": "Trinken: 2.118 ml (8 Gläser, 4,2 Flaschen)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Sind 8 Gläser Wasser am Tag wirklich genug?",
          "answer": "Die '8 Gläser am Tag' Regel (etwa 1,9 L) ist eine grobe Richtlinie, berücksichtigt aber keine individuellen Faktoren. Die meisten Erwachsenen benötigen tatsächlich 2,4-3,8 L je nach Gewicht, Aktivität und Klima. Dieser Rechner bietet eine personalisierte Empfehlung basierend auf Ihrer spezifischen Situation."
        },
        {
          "question": "Zählt Kaffee zu meiner Wasseraufnahme?",
          "answer": "Ja, Kaffee und Tee tragen zur Hydratation bei. Obwohl Koffein eine milde diuretische Wirkung hat, ist der Nettoflüssigkeitsgewinn noch positiv. Jedoch erhöht jede Tasse Ihren gesamten Wasserbedarf um etwa 50 ml, um die diuretische Wirkung auszugleichen. Unser Rechner berücksichtigt dies automatisch."
        },
        {
          "question": "Kann ich zu viel Wasser trinken?",
          "answer": "Ja, obwohl es selten ist. Das Trinken übermäßiger Mengen (typischerweise über 10 Liter pro Tag) kann Hyponatriämie verursachen — gefährlich niedrige Natriumwerte. Dies ist am häufigsten bei extremen Ausdauerveranstaltungen. Für die meisten Menschen ist das größere Risiko, nicht genug zu trinken, anstatt zu viel."
        },
        {
          "question": "Wie erkenne ich, ob ich dehydriert bin?",
          "answer": "Der einfachste Indikator ist die Urinfarbe: blasses Strohgelb bedeutet gut hydriert, dunkelgelb zeigt Dehydratation an. Andere Anzeichen sind anhaltender Durst, trockener Mund, Kopfschmerzen, Müdigkeit, Schwindel und reduzierte Harnfrequenz. Beachten Sie, dass Durst ein nacheilender Indikator ist — Sie sind bereits leicht dehydriert, wenn Sie Durst verspüren."
        },
        {
          "question": "Sollte ich bei heißem Wetter mehr Wasser trinken?",
          "answer": "Absolut. Heiße Klimata können den Wasserbedarf um 15-30% erhöhen aufgrund vermehrten Schwitzens. Heiße und feuchte Bedingungen sind noch anspruchsvoller (bis zu 30% Erhöhung), weil Schweiß weniger effizient verdunstet. Unser Rechner passt sich an fünf verschiedene Klimabedingungen einschließlich großer Höhen an."
        },
        {
          "question": "Hilft Wasser beim Abnehmen?",
          "answer": "Forschung zeigt, dass das Trinken von Wasser vor den Mahlzeiten die Kalorienaufnahme reduzieren kann, indem es das Sättigungsgefühl fördert. Eine Studie von 2014 fand heraus, dass das Trinken von 500 ml Wasser 30 Minuten vor den Mahlzeiten über 8 Wochen zu signifikantem Gewichtsverlust führte. Wasser unterstützt auch den Stoffwechsel und hat null Kalorien, was es zum idealen Getränk für Gewichtsmanagement macht."
        },
        {
          "question": "Wie viel zusätzliches Wasser benötige ich während der Schwangerschaft?",
          "answer": "Die EFSA empfiehlt zusätzliche 300 ml pro Tag während der Schwangerschaft und 700 ml pro Tag während des Stillens. Dies unterstützt erhöhtes Blutvolumen, Fruchtwasser und Milchproduktion. Konsultieren Sie immer Ihren Gynäkologen für personalisierte Hydratationsberatung während der Schwangerschaft."
        },
        {
          "question": "Was ist mit Elektrolyten — brauche ich die auch?",
          "answer": "Für die meisten Menschen mit normaler Ernährung ist Wasser allein ausreichend. Jedoch während intensivem Training über 60 Minuten oder bei extremer Hitze mit starkem Schwitzen kann das Hinzufügen von Elektrolyten (Natrium, Kalium, Magnesium) helfen, das Flüssigkeitsgleichgewicht zu erhalten und Krämpfe zu verhindern. Sportgetränke oder Elektrolyttabletten sind in diesen Situationen nützlich."
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

  hero: {
    showCalculatorName: true,
    showSubtitle: true,
    showBreadcrumbs: true,
  },

  sidebar: {
    showRelatedCalculators: true,
    showAd: true,
  },

  features: {
    showRating: true,
    showSharing: true,
    showSaveResults: true,
  },

  relatedCalculators: [
    "bmi",
    "body-fat",
    "calorie-deficit",
    "tdee",
    "calorie-calculator",
    "macro-calculator",
  ],

  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
  },
};

// ═══════════════════════════════════════════════════════════════
// ✨ IMPROVED CALCULATE FUNCTION (with chartData)
// ═══════════════════════════════════════════════════════════════

export function calculateWaterIntake(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;

  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ─── Empty result template ────────────────────────────
  const emptyResult: CalculatorResults = {
    values: {},
    formatted: {
      dailyTotal: "--",
      fromBeverages: "--",
      fromFood: "--",
      glasses: "--",
      bottles500: "--",
      weightBased: "--",
      iomBased: "--",
      // Water-rich foods (static values)
      cucumber: "96% water (~288 mL per cup)",
      lettuce: "95% water (~285 mL per cup)",
      celery: "95% water (~285 mL per cup)",
      tomatoes: "94% water (~282 mL per cup)",
      zucchini: "93% water (~279 mL per cup)",
      watermelon: "92% water (~276 mL per cup)",
      bellPeppers: "92% water (~276 mL per cup)",
      strawberries: "91% water (~273 mL per cup)",
      cantaloupe: "90% water (~270 mL per cup)",
      oranges: "87% water (~261 mL per cup)",
    },
    summary: "",
    isValid: false,
  };

  // ─── Read inputs ──────────────────────────────────────
  const gender = values.gender as string;
  const age = (values.age as number) || 30;
  const activityLevel = (values.activityLevel as string) || "moderate";
  const exerciseMinutes = (values.exerciseMinutes as number) || 0;
  const climate = (values.climate as string) || "temperate";
  const specialCondition = (values.specialCondition as string) || "none";
  const caffeineIntake = (values.caffeineIntake as number) || 0;
  const alcoholIntake = (values.alcoholIntake as number) || 0;
  const dietType = (values.dietType as string) || "mixed";

  // ─── Get weight (with unit dropdown support) ──────────
  const weightRaw = values.weight as number | null;
  if (!weightRaw) return emptyResult;

  const weightUnit = fieldUnits.weight || "lbs";
  const weightKg = convertToBase(weightRaw, weightUnit, "weight");

  // ─── Multipliers ──────────────────────────────────────
  const actMult = ACTIVITY_MULTIPLIERS[activityLevel] || 1.0;
  const climMult = CLIMATE_MULTIPLIERS[climate] || 1.0;

  // Age adjustment (slight reduction for older adults)
  let ageFactor = 1.0;
  if (age >= 65) ageFactor = 0.9;
  else if (age >= 56) ageFactor = 0.95;

  // Exercise bonus: 355 mL (12 oz) per 30 min (ACSM)
  const exerciseBonusMl = (exerciseMinutes / 30) * 355;

  // ─── METHOD 1: Weight-Based ───────────────────────────
  // Male: 33 mL/kg, Female: 31 mL/kg
  const basePerKg = gender === "male" ? 33 : 31;
  let weightBasedMl = weightKg * basePerKg * ageFactor;
  weightBasedMl *= actMult;
  weightBasedMl *= climMult;
  weightBasedMl += exerciseBonusMl;
  if (specialCondition === "pregnant") weightBasedMl += 300;
  if (specialCondition === "breastfeeding") weightBasedMl += 700;

  // ─── METHOD 2: IOM Adequate Intake ────────────────────
  // Adults: M=3700 mL, F=2700 mL | Teens: M=3300, F=2300
  let iomBaseMl: number;
  if (age < 18) {
    iomBaseMl = gender === "male" ? 3300 : 2300;
  } else {
    iomBaseMl = gender === "male" ? 3700 : 2700;
  }
  let iomMl = iomBaseMl * ageFactor;
  iomMl *= actMult;
  iomMl *= climMult;
  iomMl += exerciseBonusMl;
  if (specialCondition === "pregnant") iomMl += 300;
  if (specialCondition === "breastfeeding") iomMl += 700;

  // ─── Average both methods ─────────────────────────────
  let totalMl = (weightBasedMl + iomMl) / 2;

  // ─── Caffeine & alcohol offset (ADD to need) ──────────
  // Caffeine: mild diuretic, ~50 mL extra per cup
  // Alcohol: stronger diuretic, ~250 mL extra per drink
  const caffeineOffsetMl = caffeineIntake * 50;
  const alcoholOffsetMl = alcoholIntake * 250;
  totalMl += caffeineOffsetMl + alcoholOffsetMl;

  // For display of individual methods (with offsets)
  const weightBasedFinalMl =
    weightBasedMl + caffeineOffsetMl + alcoholOffsetMl;
  const iomFinalMl = iomMl + caffeineOffsetMl + alcoholOffsetMl;

  // Floor at 1500 mL (minimum safe intake)
  totalMl = Math.max(totalMl, 1500);

  // ─── Food water contribution ──────────────────────────
  const foodPct = FOOD_WATER_PERCENT[dietType] || 0.2;
  const fromFoodMl = totalMl * foodPct;
  const fromBeveragesMl = totalMl - fromFoodMl;

  // ─── Convert to oz ────────────────────────────────────
  const totalOz = totalMl / 29.5735;
  const beveragesOz = fromBeveragesMl / 29.5735;
  const foodOz = fromFoodMl / 29.5735;
  const weightBasedOz = weightBasedFinalMl / 29.5735;
  const iomOz = iomFinalMl / 29.5735;

  // ─── Glasses & bottles ────────────────────────────────
  const glassesCount = Math.ceil(beveragesOz / 8); // 8 oz glasses
  const bottles500Count =
    Math.round((fromBeveragesMl / 500) * 10) / 10;

  // ─── Unit labels via v[] ──────────────────────────────
  const ozLabel = v["oz"] || "oz";
  const mlLabel = v["mL"] || "mL";
  const lLabel = v["L"] || "L";
  const glassesLabel =
    glassesCount === 1
      ? v["glass"] || "glass"
      : v["glasses"] || "glasses";
  const bottlesLabel =
    bottles500Count === 1
      ? v["bottle"] || "bottle"
      : v["bottles"] || "bottles";

  // ─── Format helpers ───────────────────────────────────
  const fmtMl = (ml: number) => Math.round(ml).toLocaleString();
  const fmtOz = (oz: number) => Math.round(oz);
  const fmtL = (ml: number) => (ml / 1000).toFixed(1);

  const fmtDual = (ml: number, oz: number) => {
    // Use weight unit to determine preference
    if (weightUnit === "lbs") {
      return `${fmtOz(oz)} ${ozLabel} (${fmtL(ml)} ${lLabel})`;
    }
    return `${fmtL(ml)} ${lLabel} (${fmtOz(oz)} ${ozLabel})`;
  };

  // ─── Formatted results ────────────────────────────────
  const fDailyTotal = fmtDual(totalMl, totalOz);
  const fBeverages = fmtDual(fromBeveragesMl, beveragesOz);
  const fFood = fmtDual(fromFoodMl, foodOz);
  const fGlasses = `${glassesCount} ${glassesLabel}`;
  const fBottles = `${bottles500Count} ${bottlesLabel}`;
  const fWeightBased = fmtDual(weightBasedFinalMl, weightBasedOz);
  const fIom = fmtDual(iomFinalMl, iomOz);

  // ─── ✨ NEW: Generate chartData for hydration timeline ─
  const chartData: Array<Record<string, unknown>> = [];
  
  for (const slot of SCHEDULE) {
    const slotMl = fromBeveragesMl * slot.weight;
    const slotOz = beveragesOz * slot.weight;
    const timeLabel = v[slot.time] || slot.time;

    if (weightUnit === "lbs") {
      chartData.push({
        time: timeLabel,
        amount: Math.round(slotOz), // Integer for chart
        amountLabel: `${fmtOz(slotOz)} ${ozLabel}`, // Formatted for tooltip
      });
    } else {
      chartData.push({
        time: timeLabel,
        amount: Math.round(slotMl), // Integer for chart
        amountLabel: `${fmtMl(slotMl)} ${mlLabel}`, // Formatted for tooltip
      });
    }
  }

  // ─── Summary ──────────────────────────────────────────
  const tmpl =
    f.summary ||
    "Your daily water need is {dailyTotal}. Drink {fromBeverages} from beverages ({glasses} glasses or {bottles500} bottles). About {fromFood} comes from food.";
  const summary = tmpl
    .replace("{dailyTotal}", fDailyTotal)
    .replace("{fromBeverages}", fBeverages)
    .replace("{glasses}", String(glassesCount))
    .replace("{bottles500}", String(bottles500Count))
    .replace("{fromFood}", fFood);

  // ─── Return ───────────────────────────────────────────
  return {
    values: {
      dailyTotal: Math.round(totalMl),
      fromBeverages: Math.round(fromBeveragesMl),
      fromFood: Math.round(fromFoodMl),
      glasses: glassesCount,
      bottles500: bottles500Count,
      weightBased: Math.round(weightBasedFinalMl),
      iomBased: Math.round(iomFinalMl),
    },
    formatted: {
      dailyTotal: fDailyTotal,
      fromBeverages: fBeverages,
      fromFood: fFood,
      glasses: fGlasses,
      bottles500: fBottles,
      weightBased: fWeightBased,
      iomBased: fIom,
      // ✨ Water-rich foods (static values in results card)
      cucumber: "96% water (~288 mL per cup)",
      lettuce: "95% water (~285 mL per cup)",
      celery: "95% water (~285 mL per cup)",
      tomatoes: "94% water (~282 mL per cup)",
      zucchini: "93% water (~279 mL per cup)",
      watermelon: "92% water (~276 mL per cup)",
      bellPeppers: "92% water (~276 mL per cup)",
      strawberries: "91% water (~273 mL per cup)",
      cantaloupe: "90% water (~270 mL per cup)",
      oranges: "87% water (~261 mL per cup)",
    },
    summary,
    isValid: true,
    metadata: {
      // ✨ NEW: chartData powers the hydration timeline visualization
      chartData,
    },
  };
}

export default waterIntakeCalculatorConfig;
