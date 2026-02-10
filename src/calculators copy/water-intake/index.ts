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
    },],

  // ═══════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════
  inputs: [],

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
        },
        },
        },
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
