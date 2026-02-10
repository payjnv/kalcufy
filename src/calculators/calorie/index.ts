// ⚡ MIGRATED TO UNIT DROPDOWN SYSTEM (2026-02-04)
// Old: unitSystem radio + dual inputs (weightKg/weightLbs)
// New: unitType per field with auto-conversion
// TODO: Update calculate() to use convertToBase() or normalizeToBase()
import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

/* ═══════════════════════════════════════════════════════════════════
   CALORIE CALCULATOR — V4 Engine
   Mifflin-St Jeor (primary) + Harris-Benedict + Katch-McArdle
   Maintenance · Weight Loss · Weight Gain · Zig-Zag · Diet Modes · Macros
   ═══════════════════════════════════════════════════════════════════ */

// ── Constants ─────────────────────────────────────────────────────
const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

const DEFICIT_MAP: Record<string, number> = {
  mild: 250,
  moderate: 500,
  aggressive: 750,
  extreme: 1000,
};

const SURPLUS_MAP: Record<string, number> = {
  slow: 250,
  moderate: 500,
  fast: 750,
};

const MACRO_RATIOS: Record<string, { p: number; c: number; f: number }> = {
  balanced: { p: 0.3, c: 0.4, f: 0.3 },
  keto: { p: 0.25, c: 0.05, f: 0.7 },
  lowCarb: { p: 0.35, c: 0.2, f: 0.45 },
  highProtein: { p: 0.4, c: 0.35, f: 0.25 },
  leangains: { p: 0.4, c: 0.4, f: 0.2 },
};

// Zig-zag multipliers — must sum to exactly 7.0
const ZIGZAG_PATTERN = [1.0, 0.85, 1.1, 0.85, 1.0, 1.15, 1.05];
const DAY_KEYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// ═══════════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════════
export const calorieCalculatorConfig: CalculatorConfigV4 = {
  id: "calorie",
  version: "4.0",
  category: "health",
  icon: "🔥",

  // ═══════════════════════════════════════════════════════════════
  // PRESETS
  // ═══════════════════════════════════════════════════════════════
  presets: [
    {
      id: "sedentaryLoss",
      icon: "🪑",
      values: {
        gender: "female",
        age: 30,
        weight: 150,
        height: 165,
        activityLevel: "sedentary",
        goal: "loss",
        lossPace: "moderate",
        formula: "mifflin",
        dietMode: "balanced",
      },
    },
    {
      id: "activeMaintain",
      icon: "🏃",
      values: {
        gender: "male",
        age: 28,
        weight: 180,
        height: 180,
        activityLevel: "active",
        goal: "maintain",
        formula: "mifflin",
        dietMode: "balanced",
      },
    },
    {
      id: "ketoLoss",
      icon: "🥑",
      values: {
        gender: "female",
        age: 35,
        weight: 160,
        height: 163,
        activityLevel: "moderate",
        goal: "loss",
        lossPace: "mild",
        formula: "mifflin",
        dietMode: "keto",
        carbLimitG: 25,
      },
    },
    {
      id: "bulkGain",
      icon: "💪",
      values: {
        gender: "male",
        age: 24,
        weight: 170,
        height: 178,
        activityLevel: "moderate",
        goal: "gain",
        gainPace: "moderate",
        formula: "mifflin",
        dietMode: "highProtein",
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // TRANSLATIONS — English only
  // ═══════════════════════════════════════════════════════════════
  t: {
    en: {
      name: "Calorie Calculator",
      slug: "calorie-calculator",
      subtitle:
        "Find your daily calorie needs with zig-zag cycling, macro breakdown, and diet mode support for smarter nutrition planning",
      breadcrumb: "Calories",

      seo: {
        title:
          "Calorie Calculator — Daily Intake, Zig-Zag & Macros | Free Tool",
        description:
          "Calculate your daily calorie needs using the Mifflin-St Jeor formula. Get maintenance, weight loss, and weight gain targets with 7-day zig-zag cycling, macro breakdown, and diet mode support including keto and high-protein plans.",
        keywords: [
          "calorie calculator",
          "daily calorie intake calculator",
          "how many calories do I need",
          "calorie deficit calculator",
          "zig-zag calorie cycling",
          "macro calculator",
          "TDEE calculator",
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
        mode: {
          label: "Calculator Mode",
          helpText: "Basic covers most needs — Advanced adds formula selection, diet modes, and body fat input",
          options: { basic: "⚡ Basic", advanced: "🔧 Advanced" },
        },
        gender: {
          label: "Gender",
          helpText: "BMR formulas differ by biological sex",
          options: { male: "Male", female: "Female" },
        },
        age: {
          label: "Age",
          helpText: "Ages 15–80 for accurate estimation",
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
        goal: {
          label: "Goal",
          helpText: "What you want to achieve",
          options: {
            maintain: "Maintain Weight",
            loss: "Lose Weight",
            gain: "Gain Weight",
          },
        },
        lossPace: {
          label: "Weight Loss Pace",
          helpText: "Slower is more sustainable and preserves muscle",
          options: {
            mild: "Mild — 0.5 lb/week (-250 cal)",
            moderate: "Moderate — 1 lb/week (-500 cal)",
            aggressive: "Aggressive — 1.5 lb/week (-750 cal)",
            extreme: "Extreme — 2 lb/week (-1,000 cal)",
          },
        },
        gainPace: {
          label: "Weight Gain Pace",
          helpText: "Slower pace minimizes fat gain",
          options: {
            slow: "Slow — 0.5 lb/week (+250 cal)",
            moderate: "Moderate — 1 lb/week (+500 cal)",
            fast: "Fast — 1.5 lb/week (+750 cal)",
          },
        },
        formula: {
          label: "BMR Formula",
          helpText: "Mifflin-St Jeor is recommended for most people",
          options: {
            mifflin: "Mifflin-St Jeor (recommended)",
            harris: "Harris-Benedict (revised)",
            katch: "Katch-McArdle (requires body fat %)",
          },
        },
        bodyFatPercent: {
          label: "Body Fat %",
          helpText:
            "Required for Katch-McArdle — estimate or use a body fat calculator",
          placeholder: "e.g. 20",
        },
        dietMode: {
          label: "Diet Mode",
          helpText: "Changes how calories are split into macros",
          options: {
            balanced: "Balanced (30/40/30)",
            keto: "Keto (25/5/70)",
            lowCarb: "Low Carb (35/20/45)",
            highProtein: "High Protein (40/35/25)",
            leangains: "Leangains (40/40/20)",
          },
        },
        carbLimitG: {
          label: "Daily Carb Limit",
          helpText:
            "Fixed carb intake for keto — protein and fat adjust automatically",
          placeholder: "25",
        },
      },

      inputGroups: {},

      // ─── Results ─────────────────────────────────────────────
      results: {
        dailyCalories: { label: "Daily Calories" },
        bmr: { label: "BMR (Basal Metabolic Rate)" },
        tdee: { label: "Maintenance (TDEE)" },
        adjustment: { label: "Daily Adjustment" },
        weeklyChange: { label: "Est. Weekly Change" },
        proteinG: { label: "Protein" },
        carbsG: { label: "Carbs" },
        fatG: { label: "Fat" },
      },

      tooltips: {
        dailyCalories:
          "Your recommended daily calorie intake based on your goal",
        bmr: "Calories your body burns at complete rest — just to keep organs functioning",
        tdee: "Total Daily Energy Expenditure — calories to maintain current weight including activity",
        adjustment: "Calorie deficit or surplus relative to your TDEE",
        weeklyChange:
          "Estimated weight change per week at this calorie level",
        proteinG:
          "Daily protein target based on your diet mode — 4 cal per gram",
        carbsG: "Daily carbohydrate target — 4 cal per gram",
        fatG: "Daily fat target — 9 cal per gram",
      },

      presets: {
        sedentaryLoss: {
          label: "Office Worker Weight Loss",
          description: "Sedentary female, moderate deficit",
        },
        activeMaintain: {
          label: "Active Maintenance",
          description: "Active male maintaining current weight",
        },
        ketoLoss: {
          label: "Keto Diet",
          description: "Low-carb approach with 25g carb limit",
        },
        bulkGain: {
          label: "Muscle Gain",
          description: "Moderate surplus with high protein",
        },
      },

      // ─── Values (dynamic translations) ───────────────────────
      values: {
        cal: "cal",
        g: "g",
        kg: "kg",
        lbs: "lbs",
        lb: "lb",
        week: "week",
        weeks: "weeks",
        day: "day",
        Monday: "Monday",
        Tuesday: "Tuesday",
        Wednesday: "Wednesday",
        Thursday: "Thursday",
        Friday: "Friday",
        Saturday: "Saturday",
        Sunday: "Sunday",
        Average: "Average",
        Total: "Total",
        Maintain: "Maintain",
        Loss: "Loss",
        Gain: "Gain",
        Sedentary: "Sedentary",
        Light: "Light",
        Moderate: "Moderate",
        Active: "Active",
        "Very Active": "Very Active",
        Protein: "Protein",
        Carbs: "Carbs",
        Fat: "Fat",
        Balanced: "Balanced",
        Keto: "Keto",
        "Low Carb": "Low Carb",
        "High Protein": "High Protein",
        Leangains: "Leangains",
        "Mifflin-St Jeor": "Mifflin-St Jeor",
        "Harris-Benedict": "Harris-Benedict",
        "Katch-McArdle": "Katch-McArdle",
      },

      formats: {
        summary:
          "Your daily target is {dailyCalories} cal ({goalLabel}). BMR: {bmr} cal, TDEE: {tdee} cal. Macros: {protein}g protein, {carbs}g carbs, {fat}g fat ({dietLabel}).",
      },

      // ─── Info Cards ──────────────────────────────────────────
      infoCards: {
        energyBreakdown: {
          title: "⚡ Energy Breakdown",
          items: [
            { label: "BMR", valueKey: "bmr" },
            { label: "TDEE (Maintenance)", valueKey: "tdee" },
            { label: "Daily Target", valueKey: "dailyCalories" },
            { label: "Adjustment", valueKey: "adjustment" },
          ],
        },
        macroSplit: {
          title: "🥗 Macro Split",
          items: [
            { label: "Protein", valueKey: "proteinG" },
            { label: "Carbs", valueKey: "carbsG" },
            { label: "Fat", valueKey: "fatG" },
          ],
        },
        tips: {
          title: "💡 Quick Tips",
          items: [
            "Track your intake for at least 2 weeks before adjusting — consistency beats precision",
            "Weigh yourself at the same time daily and use weekly averages, not daily swings",
            "Never go below 1,200 cal (women) or 1,500 cal (men) without medical supervision",
            "If weight stalls for 2+ weeks, recalculate — your TDEE drops as you lose weight",
          ],
        },
      },

      // ─── Reference Data ──────────────────────────────────────
      referenceData: {
        activityLevels: {
          title: "Activity Level Multipliers",
          items: [
            { label: "Sedentary", value: "×1.20 — Desk job, little exercise" },
            {
              label: "Lightly Active",
              value: "×1.375 — Light exercise 1–3 days/week",
            },
            {
              label: "Moderately Active",
              value: "×1.55 — Moderate exercise 3–5 days/week",
            },
            {
              label: "Very Active",
              value: "×1.725 — Hard exercise 6–7 days/week",
            },
            {
              label: "Extra Active",
              value: "×1.90 — Athlete or physical labor job",
            },
          ],
        },
      },

      // ─── Education ───────────────────────────────────────────
      education: {
        whatIs: {
          title: "What is a Calorie Calculator?",
          content:
            "A calorie calculator estimates the number of calories your body needs each day based on your age, gender, height, weight, and activity level. It starts by calculating your Basal Metabolic Rate (BMR) — the energy your body uses at complete rest just to keep your heart beating, lungs breathing, and organs functioning. Your BMR typically accounts for 60–75% of total daily calories. The calculator then multiplies your BMR by an activity factor to determine your Total Daily Energy Expenditure (TDEE), which represents the calories needed to maintain your current weight. From there, you can create a calorie deficit to lose weight, a surplus to gain weight, or eat at maintenance to stay the same. Understanding your calorie needs is the foundation of any effective nutrition plan, whether your goal is fat loss, muscle gain, or simply maintaining a healthy weight.",
        },
        formulas: {
          title: "Understanding BMR Formulas",
          content:
            "This calculator offers three scientifically validated BMR formulas. The Mifflin-St Jeor equation (1990) is considered the gold standard — recommended by the American Dietetic Association for its accuracy in 82% of non-obese individuals. It uses a simple linear equation based on weight, height, age, and gender. The Harris-Benedict equation (originally 1918, revised 1984) was the standard for decades but tends to overestimate BMR by about 5%, especially in overweight individuals. It remains useful for comparison. The Katch-McArdle formula (1991) is unique because it uses lean body mass instead of total weight, making it the most accurate option for athletes or anyone who knows their body fat percentage. Since it ignores gender (lean mass already accounts for the difference), it requires an accurate body fat measurement to work properly. For most people, Mifflin-St Jeor provides the best balance of accuracy and simplicity.",
        },
        considerations: {
          title: "Important Considerations",
          items: [
            {
              text: "Calorie calculators provide estimates, not exact numbers — individual metabolism can vary by ±10% due to genetics, hormones, and gut health",
              type: "warning" as const,
            },
            {
              text: "Never go below 1,200 cal/day (women) or 1,500 cal/day (men) without medical supervision — extreme deficits slow metabolism and risk nutrient deficiencies",
              type: "warning" as const,
            },
            {
              text: "Metabolic adaptation is real — your body burns fewer calories as you lose weight, so recalculate every 10–15 lbs lost",
              type: "info" as const,
            },
            {
              text: "Activity level is the biggest source of error — most people overestimate their exercise intensity, so start conservative",
              type: "info" as const,
            },
            {
              text: "The thermic effect of food (TEF) accounts for about 10% of total calories — protein has the highest TEF at 20–30%",
              type: "info" as const,
            },
            {
              text: "Consistency matters more than precision — a rough calorie target followed daily beats a perfect number followed sporadically",
              type: "info" as const,
            },
          ],
        },
        zigzag: {
          title: "How Zig-Zag Calorie Cycling Works",
          items: [
            {
              text: "Zig-zag cycling alternates between higher and lower calorie days while keeping the weekly total the same — your body gets the same energy but metabolic adaptation is reduced",
              type: "info" as const,
            },
            {
              text: "Higher calorie days help maintain leptin levels (the hunger hormone), making dieting more sustainable and preventing the plateau many people hit after 4–6 weeks",
              type: "info" as const,
            },
            {
              text: "The pattern varies daily intake by ±15–20% around your target — for example, on a 2,000 cal target, days range from 1,700 to 2,300 cal",
              type: "info" as const,
            },
            {
              text: "Schedule higher calorie days on training days and lower calorie days on rest days for optimal performance and recovery",
              type: "info" as const,
            },
            {
              text: "Zig-zagging is especially effective during fat loss plateaus — if your weight has stalled for 2+ weeks at a consistent deficit, try cycling your calories",
              type: "info" as const,
            },
          ],
        },
        examples: {
          title: "Example Calculations",
          description: "Step-by-step using the Mifflin-St Jeor formula",
          examples: [
            {
              title: "Weight Loss — 30 y/o Female",
              steps: [
                'Stats: Female, 30 years, 160 lbs (72.6 kg), 5\'5" (165 cm), moderately active',
                "BMR = (10 × 72.6) + (6.25 × 165) - (5 × 30) - 161 = 1,408 cal",
                "TDEE = 1,408 × 1.55 (moderate) = 2,182 cal",
                "Moderate deficit (-500 cal): 2,182 - 500 = 1,682 cal/day",
                "Macros (balanced 30/40/30): 126g protein, 168g carbs, 56g fat",
              ],
              result: "Daily target: 1,682 cal — estimated loss ~1 lb/week",
            },
            {
              title: "Muscle Gain — 24 y/o Male",
              steps: [
                'Stats: Male, 24 years, 160 lbs (72.6 kg), 5\'10" (178 cm), moderately active',
                "BMR = (10 × 72.6) + (6.25 × 178) - (5 × 24) + 5 = 1,724 cal",
                "TDEE = 1,724 × 1.55 (moderate) = 2,672 cal",
                "Moderate surplus (+500 cal): 2,672 + 500 = 3,172 cal/day",
                "Macros (high protein 40/35/25): 317g protein, 278g carbs, 88g fat",
              ],
              result: "Daily target: 3,172 cal — estimated gain ~1 lb/week",
            },
          ],
        },
      },

      // ─── FAQs ────────────────────────────────────────────────
      faqs: [
        {
          question: "Which BMR formula should I use?",
          answer:
            "For most people, the Mifflin-St Jeor equation is the best choice — it's the most accurate for the general population and is recommended by the American Dietetic Association. Use Harris-Benedict if you want a second opinion for comparison. Choose Katch-McArdle only if you know your body fat percentage accurately, as it uses lean body mass for a more precise estimate, especially for athletes.",
        },
        {
          question:
            "How does zig-zag calorie cycling help with weight loss?",
          answer:
            "Zig-zag cycling alternates between higher and lower calorie days while keeping the same weekly total. This prevents your body from adapting to a constant calorie level, which often causes weight loss plateaus after 4–6 weeks. Higher calorie days help maintain leptin (the satiety hormone) and thyroid function, making the diet more sustainable. Research suggests that calorie cycling can improve adherence and long-term results compared to straight calorie restriction.",
        },
        {
          question: "What is the minimum safe calorie intake?",
          answer:
            "Health authorities generally recommend not going below 1,200 calories per day for women or 1,500 calories per day for men without medical supervision. Going too low risks nutrient deficiencies, muscle loss, metabolic slowdown, and hormonal disruption. If the calculator suggests a number below these thresholds, consider reducing your deficit or increasing your activity level instead.",
        },
        {
          question: "Which diet mode should I choose?",
          answer:
            "Balanced (30/40/30) works for most people and is the easiest to maintain long-term. Keto (25/5/70) is effective for rapid fat loss but requires strict carb restriction and may be hard to sustain. Low Carb (35/20/45) is a moderate approach that reduces carbs without full keto restriction. High Protein (40/35/25) is ideal for muscle building or preservation during a cut. Leangains (40/40/20) combines high protein with high carbs for performance-focused training.",
        },
        {
          question: "How accurate are calorie calculators?",
          answer:
            "The Mifflin-St Jeor formula is accurate within ±10% for about 82% of non-obese individuals. The biggest source of error is usually the activity level estimate — most people overestimate how active they are. Use the calculator as a starting point, then adjust based on actual results over 2–3 weeks. If you're not seeing expected weight changes, adjust by 100–200 calories rather than making drastic changes.",
        },
        {
          question: "Should I eat back exercise calories?",
          answer:
            "Your TDEE already includes your activity level, so additional exercise calories are partially accounted for. If you do extra exercise beyond your stated activity level, eating back about 50% of those calories is a safe approach. Fitness trackers and machines tend to overestimate calories burned by 20–40%, so eating back all of them often leads to slower progress than expected.",
        },
        {
          question:
            "What is the difference between BMR and TDEE?",
          answer:
            "BMR (Basal Metabolic Rate) is the number of calories your body burns at complete rest — just to keep your organs functioning. TDEE (Total Daily Energy Expenditure) is your BMR multiplied by an activity factor, representing the total calories you burn in a day including movement and exercise. TDEE is the number you use to set your calorie target: eat below it to lose weight, above it to gain weight, or at it to maintain.",
        },
        {
          question: "How fast should I lose weight?",
          answer:
            "A rate of 0.5–1 lb per week (250–500 calorie deficit) is generally recommended for sustainable weight loss that preserves muscle mass. Faster rates of 1.5–2 lbs per week are possible but increase the risk of muscle loss, metabolic slowdown, and nutrient deficiencies. People with more weight to lose can safely sustain a larger deficit initially, while those closer to their goal weight should use a smaller deficit to avoid plateaus and maintain muscle.",
        },
      ],

      // ─── Chart ───────────────────────────────────────────────
      chart: {
        title: "Calories by Activity Level",
        xLabel: "Activity Level",
        yLabel: "Calories/day",
        series: {
          maintenance: "Maintenance",
          target: "Your Target",
        },
      },

      detailedTable: {
        zigzagPlan: {
          button: "📅 View 7-Day Zig-Zag Plan",
          title: "7-Day Zig-Zag Calorie Cycling Plan",
          columns: {
            day: "Day",
            calories: "Calories",
            protein: "Protein",
            carbs: "Carbs",
            fat: "Fat",
          },
        },
      },

      // ─── Boilerplate ─────────────────────────────────────────
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
      "name": "Calculadora de Calorías",
      "slug": "calculadora-calorias",
      "subtitle": "Encuentra tus necesidades calóricas diarias con ciclado zig-zag, desglose de macros y soporte para modos de dieta para una planificación nutricional más inteligente",
      "breadcrumb": "Calorías",
      "seo": {
        "title": "Calculadora de Calorías — Ingesta Diaria, Zig-Zag y Macros | Herramienta Gratuita",
        "description": "Calcula tus necesidades calóricas diarias usando la fórmula Mifflin-St Jeor. Obtén objetivos de mantenimiento, pérdida y ganancia de peso con ciclado zig-zag de 7 días, desglose de macros y soporte para modos de dieta incluyendo keto y planes altos en proteína.",
        "keywords": [
          "calculadora de calorías",
          "calculadora de ingesta calórica diaria",
          "cuántas calorías necesito",
          "calculadora de déficit calórico",
          "ciclado calórico zig-zag",
          "calculadora de macros",
          "calculadora TDEE"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "mode": {
          "label": "Modo de Calculadora",
          "helpText": "Básico cubre la mayoría de necesidades — Avanzado añade selección de fórmulas, modos de dieta y entrada de grasa corporal",
          "options": {
            "basic": "⚡ Básico",
            "advanced": "🔧 Avanzado"
          }
        },
        "gender": {
          "label": "Género",
          "helpText": "Las fórmulas de TMB difieren por sexo biológico",
          "options": {
            "male": "Masculino",
            "female": "Femenino"
          }
        },
        "age": {
          "label": "Edad",
          "helpText": "Edades 15-80 para estimación precisa"
        },
        "activityLevel": {
          "label": "Nivel de Actividad",
          "helpText": "Tu rutina de ejercicio semanal típica",
          "options": {
            "sedentary": "Sedentario (poco o nada de ejercicio)",
            "light": "Ligeramente Activo (1-3 días/semana)",
            "moderate": "Moderadamente Activo (3-5 días/semana)",
            "active": "Muy Activo (6-7 días/semana)",
            "veryActive": "Extra Activo (atleta / trabajo físico)"
          }
        },
        "goal": {
          "label": "Objetivo",
          "helpText": "Lo que quieres lograr",
          "options": {
            "maintain": "Mantener Peso",
            "loss": "Perder Peso",
            "gain": "Ganar Peso"
          }
        },
        "lossPace": {
          "label": "Ritmo de Pérdida de Peso",
          "helpText": "Más lento es más sostenible y preserva músculo",
          "options": {
            "mild": "Suave — 0.5 lb/semana (-250 cal)",
            "moderate": "Moderado — 1 lb/semana (-500 cal)",
            "aggressive": "Agresivo — 1.5 lb/semana (-750 cal)",
            "extreme": "Extremo — 2 lb/semana (-1,000 cal)"
          }
        },
        "gainPace": {
          "label": "Ritmo de Ganancia de Peso",
          "helpText": "Ritmo más lento minimiza ganancia de grasa",
          "options": {
            "slow": "Lento — 0.5 lb/semana (+250 cal)",
            "moderate": "Moderado — 1 lb/semana (+500 cal)",
            "fast": "Rápido — 1.5 lb/semana (+750 cal)"
          }
        },
        "formula": {
          "label": "Fórmula TMB",
          "helpText": "Mifflin-St Jeor es recomendada para la mayoría de personas",
          "options": {
            "mifflin": "Mifflin-St Jeor (recomendada)",
            "harris": "Harris-Benedict (revisada)",
            "katch": "Katch-McArdle (requiere % de grasa corporal)"
          }
        },
        "bodyFatPercent": {
          "label": "% Grasa Corporal",
          "helpText": "Requerido para Katch-McArdle — estima o usa una calculadora de grasa corporal",
          "placeholder": "ej. 20"
        },
        "dietMode": {
          "label": "Modo de Dieta",
          "helpText": "Cambia cómo se dividen las calorías en macros",
          "options": {
            "balanced": "Equilibrada (30/40/30)",
            "keto": "Keto (25/5/70)",
            "lowCarb": "Baja en Carbos (35/20/45)",
            "highProtein": "Alta en Proteína (40/35/25)",
            "leangains": "Leangains (40/40/20)"
          }
        },
        "carbLimitG": {
          "label": "Límite Diario de Carbos",
          "helpText": "Ingesta fija de carbos para keto — proteína y grasa se ajustan automáticamente",
          "placeholder": "25"
        }
      },
      "inputGroups": {},
      "results": {
        "dailyCalories": {
          "label": "Calorías Diarias"
        },
        "bmr": {
          "label": "TMB (Tasa Metabólica Basal)"
        },
        "tdee": {
          "label": "Mantenimiento (TDEE)"
        },
        "adjustment": {
          "label": "Ajuste Diario"
        },
        "weeklyChange": {
          "label": "Cambio Semanal Est."
        },
        "proteinG": {
          "label": "Proteína"
        },
        "carbsG": {
          "label": "Carbohidratos"
        },
        "fatG": {
          "label": "Grasa"
        }
      },
      "tooltips": {
        "dailyCalories": "Tu ingesta calórica diaria recomendada basada en tu objetivo",
        "bmr": "Calorías que tu cuerpo quema en reposo completo — solo para mantener los órganos funcionando",
        "tdee": "Gasto Energético Diario Total — calorías para mantener peso actual incluyendo actividad",
        "adjustment": "Déficit o superávit calórico relativo a tu TDEE",
        "weeklyChange": "Cambio de peso estimado por semana en este nivel calórico",
        "proteinG": "Objetivo diario de proteína basado en tu modo de dieta — 4 cal por gramo",
        "carbsG": "Objetivo diario de carbohidratos — 4 cal por gramo",
        "fatG": "Objetivo diario de grasa — 9 cal por gramo"
      },
      "presets": {
        "sedentaryLoss": {
          "label": "Pérdida de Peso Trabajador de Oficina",
          "description": "Mujer sedentaria, déficit moderado"
        },
        "activeMaintain": {
          "label": "Mantenimiento Activo",
          "description": "Hombre activo manteniendo peso actual"
        },
        "ketoLoss": {
          "label": "Dieta Keto",
          "description": "Enfoque bajo en carbos con límite de 25g carbos"
        },
        "bulkGain": {
          "label": "Ganancia Muscular",
          "description": "Superávit moderado con alta proteína"
        }
      },
      "values": {
        "cal": "cal",
        "g": "g",
        "kg": "kg",
        "lbs": "lbs",
        "lb": "lb",
        "week": "semana",
        "weeks": "semanas",
        "day": "día",
        "Monday": "Lunes",
        "Tuesday": "Martes",
        "Wednesday": "Miércoles",
        "Thursday": "Jueves",
        "Friday": "Viernes",
        "Saturday": "Sábado",
        "Sunday": "Domingo",
        "Average": "Promedio",
        "Total": "Total",
        "Maintain": "Mantener",
        "Loss": "Pérdida",
        "Gain": "Ganancia",
        "Sedentary": "Sedentario",
        "Light": "Ligero",
        "Moderate": "Moderado",
        "Active": "Activo",
        "Very Active": "Muy Activo",
        "Protein": "Proteína",
        "Carbs": "Carbohidratos",
        "Fat": "Grasa",
        "Balanced": "Equilibrada",
        "Keto": "Keto",
        "Low Carb": "Baja en Carbos",
        "High Protein": "Alta en Proteína",
        "Leangains": "Leangains",
        "Mifflin-St Jeor": "Mifflin-St Jeor",
        "Harris-Benedict": "Harris-Benedict",
        "Katch-McArdle": "Katch-McArdle"
      },
      "formats": {
        "summary": "Tu objetivo diario es {dailyCalories} cal ({goalLabel}). TMB: {bmr} cal, TDEE: {tdee} cal. Macros: {protein}g proteína, {carbs}g carbohidratos, {fat}g grasa ({dietLabel})."
      },
      "infoCards": {
        "energyBreakdown": {
          "title": "⚡ Desglose Energético",
          "items": [
            {
              "label": "TMB",
              "valueKey": "bmr"
            },
            {
              "label": "TDEE (Mantenimiento)",
              "valueKey": "tdee"
            },
            {
              "label": "Objetivo Diario",
              "valueKey": "dailyCalories"
            },
            {
              "label": "Ajuste",
              "valueKey": "adjustment"
            }
          ]
        },
        "macroSplit": {
          "title": "🥗 División de Macros",
          "items": [
            {
              "label": "Proteína",
              "valueKey": "proteinG"
            },
            {
              "label": "Carbohidratos",
              "valueKey": "carbsG"
            },
            {
              "label": "Grasa",
              "valueKey": "fatG"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos Rápidos",
          "items": [
            "Rastrea tu ingesta por al menos 2 semanas antes de ajustar — consistencia supera precisión",
            "Pésate a la misma hora diariamente y usa promedios semanales, no fluctuaciones diarias",
            "Nunca bajes de 1,200 cal (mujeres) o 1,500 cal (hombres) sin supervisión médica",
            "Si el peso se estanca por 2+ semanas, recalcula — tu TDEE disminuye mientras pierdes peso"
          ]
        }
      },
      "referenceData": {
        "activityLevels": {
          "title": "Multiplicadores de Nivel de Actividad",
          "items": [
            {
              "label": "Sedentario",
              "value": "×1.20 — Trabajo de escritorio, poco ejercicio"
            },
            {
              "label": "Ligeramente Activo",
              "value": "×1.375 — Ejercicio ligero 1-3 días/semana"
            },
            {
              "label": "Moderadamente Activo",
              "value": "×1.55 — Ejercicio moderado 3-5 días/semana"
            },
            {
              "label": "Muy Activo",
              "value": "×1.725 — Ejercicio intenso 6-7 días/semana"
            },
            {
              "label": "Extra Activo",
              "value": "×1.90 — Atleta o trabajo de labor física"
            }
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es una Calculadora de Calorías?",
          "content": "Una calculadora de calorías estima el número de calorías que tu cuerpo necesita cada día basado en tu edad, género, altura, peso y nivel de actividad. Comienza calculando tu Tasa Metabólica Basal (TMB) — la energía que tu cuerpo usa en reposo completo solo para mantener tu corazón latiendo, pulmones respirando y órganos funcionando. Tu TMB típicamente representa 60-75% de las calorías diarias totales. La calculadora luego multiplica tu TMB por un factor de actividad para determinar tu Gasto Energético Diario Total (TDEE), que representa las calorías necesarias para mantener tu peso actual. Desde ahí, puedes crear un déficit calórico para perder peso, un superávit para ganar peso, o comer en mantenimiento para permanecer igual. Entender tus necesidades calóricas es la base de cualquier plan nutricional efectivo, ya sea tu objetivo pérdida de grasa, ganancia muscular, o simplemente mantener un peso saludable."
        },
        "formulas": {
          "title": "Entendiendo las Fórmulas de TMB",
          "content": "Esta calculadora ofrece tres fórmulas de TMB científicamente validadas. La ecuación Mifflin-St Jeor (1990) es considerada el estándar dorado — recomendada por la Asociación Dietética Americana por su precisión en 82% de individuos no obesos. Usa una ecuación lineal simple basada en peso, altura, edad y género. La ecuación Harris-Benedict (originalmente 1918, revisada 1984) fue el estándar por décadas pero tiende a sobreestimar TMB por aproximadamente 5%, especialmente en individuos con sobrepeso. Permanece útil para comparación. La fórmula Katch-McArdle (1991) es única porque usa masa corporal magra en lugar de peso total, haciéndola la opción más precisa para atletas o cualquiera que conozca su porcentaje de grasa corporal. Como ignora el género (la masa magra ya cuenta la diferencia), requiere una medición precisa de grasa corporal para funcionar apropiadamente. Para la mayoría de personas, Mifflin-St Jeor proporciona el mejor balance de precisión y simplicidad."
        },
        "considerations": {
          "title": "Consideraciones Importantes",
          "items": [
            {
              "text": "Las calculadoras de calorías proporcionan estimaciones, no números exactos — el metabolismo individual puede variar ±10% debido a genética, hormonas y salud intestinal",
              "type": "warning"
            },
            {
              "text": "Nunca bajes de 1,200 cal/día (mujeres) o 1,500 cal/día (hombres) sin supervisión médica — déficits extremos ralentizan metabolismo y riesgan deficiencias nutricionales",
              "type": "warning"
            },
            {
              "text": "La adaptación metabólica es real — tu cuerpo quema menos calorías mientras pierdes peso, así que recalcula cada 10-15 lbs perdidas",
              "type": "info"
            },
            {
              "text": "El nivel de actividad es la mayor fuente de error — la mayoría de personas sobreestiman su intensidad de ejercicio, así que comienza conservador",
              "type": "info"
            },
            {
              "text": "El efecto térmico de los alimentos (TEF) representa aproximadamente 10% de calorías totales — la proteína tiene el TEF más alto en 20-30%",
              "type": "info"
            },
            {
              "text": "La consistencia importa más que la precisión — un objetivo calórico aproximado seguido diariamente supera un número perfecto seguido esporádicamente",
              "type": "info"
            }
          ]
        },
        "zigzag": {
          "title": "Cómo Funciona el Ciclado Calórico Zig-Zag",
          "items": [
            {
              "text": "El ciclado zig-zag alterna entre días de calorías más altas y bajas mientras mantiene el total semanal igual — tu cuerpo obtiene la misma energía pero la adaptación metabólica se reduce",
              "type": "info"
            },
            {
              "text": "Los días de calorías más altas ayudan a mantener niveles de leptina (la hormona del hambre), haciendo la dieta más sostenible y previniendo la meseta que muchas personas experimentan después de 4-6 semanas",
              "type": "info"
            },
            {
              "text": "El patrón varía la ingesta diaria ±15-20% alrededor de tu objetivo — por ejemplo, en un objetivo de 2,000 cal, los días van de 1,700 a 2,300 cal",
              "type": "info"
            },
            {
              "text": "Programa días de calorías más altas en días de entrenamiento y días de calorías más bajas en días de descanso para rendimiento y recuperación óptimos",
              "type": "info"
            },
            {
              "text": "El zig-zagging es especialmente efectivo durante mesetas de pérdida de grasa — si tu peso se ha estancado por 2+ semanas en un déficit consistente, intenta ciclar tus calorías",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculos",
          "description": "Paso a paso usando la fórmula Mifflin-St Jeor",
          "examples": [
            {
              "title": "Pérdida de Peso — Mujer 30 años",
              "steps": [
                "Stats: Mujer, 30 años, 160 lbs (72.6 kg), 5'5\" (165 cm), moderadamente activa",
                "TMB = (10 × 72.6) + (6.25 × 165) - (5 × 30) - 161 = 1,408 cal",
                "TDEE = 1,408 × 1.55 (moderado) = 2,182 cal",
                "Déficit moderado (-500 cal): 2,182 - 500 = 1,682 cal/día",
                "Macros (equilibrada 30/40/30): 126g proteína, 168g carbohidratos, 56g grasa"
              ],
              "result": "Objetivo diario: 1,682 cal — pérdida estimada ~1 lb/semana"
            },
            {
              "title": "Ganancia Muscular — Hombre 24 años",
              "steps": [
                "Stats: Hombre, 24 años, 160 lbs (72.6 kg), 5'10\" (178 cm), moderadamente activo",
                "TMB = (10 × 72.6) + (6.25 × 178) - (5 × 24) + 5 = 1,724 cal",
                "TDEE = 1,724 × 1.55 (moderado) = 2,672 cal",
                "Superávit moderado (+500 cal): 2,672 + 500 = 3,172 cal/día",
                "Macros (alta proteína 40/35/25): 317g proteína, 278g carbohidratos, 88g grasa"
              ],
              "result": "Objetivo diario: 3,172 cal — ganancia estimada ~1 lb/semana"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Qué fórmula de TMB debo usar?",
          "answer": "Para la mayoría de personas, la ecuación Mifflin-St Jeor es la mejor opción — es la más precisa para la población general y es recomendada por la Asociación Dietética Americana. Usa Harris-Benedict si quieres una segunda opinión para comparación. Elige Katch-McArdle solo si conoces tu porcentaje de grasa corporal con precisión, ya que usa masa corporal magra para una estimación más precisa, especialmente para atletas."
        },
        {
          "question": "¿Cómo ayuda el ciclado calórico zig-zag con la pérdida de peso?",
          "answer": "El ciclado zig-zag alterna entre días de calorías más altas y bajas mientras mantiene el mismo total semanal. Esto previene que tu cuerpo se adapte a un nivel calórico constante, lo que a menudo causa mesetas de pérdida de peso después de 4-6 semanas. Los días de calorías más altas ayudan a mantener la leptina (hormona de saciedad) y función tiroidea, haciendo la dieta más sostenible. La investigación sugiere que el ciclado calórico puede mejorar la adherencia y resultados a largo plazo comparado con restricción calórica directa."
        },
        {
          "question": "¿Cuál es la ingesta calórica mínima segura?",
          "answer": "Las autoridades de salud generalmente recomiendan no bajar de 1,200 calorías por día para mujeres o 1,500 calorías por día para hombres sin supervisión médica. Ir muy bajo riesga deficiencias nutricionales, pérdida muscular, ralentización metabólica y disrupción hormonal. Si la calculadora sugiere un número bajo estos umbrales, considera reducir tu déficit o aumentar tu nivel de actividad en su lugar."
        },
        {
          "question": "¿Qué modo de dieta debo elegir?",
          "answer": "Equilibrada (30/40/30) funciona para la mayoría de personas y es la más fácil de mantener a largo plazo. Keto (25/5/70) es efectiva para pérdida rápida de grasa pero requiere restricción estricta de carbos y puede ser difícil de sostener. Baja en Carbos (35/20/45) es un enfoque moderado que reduce carbos sin restricción keto completa. Alta en Proteína (40/35/25) es ideal para construcción o preservación muscular durante un corte. Leangains (40/40/20) combina alta proteína con altos carbos para entrenamiento enfocado en rendimiento."
        },
        {
          "question": "¿Qué tan precisas son las calculadoras de calorías?",
          "answer": "La fórmula Mifflin-St Jeor es precisa dentro de ±10% para aproximadamente 82% de individuos no obesos. La mayor fuente de error usualmente es la estimación del nivel de actividad — la mayoría de personas sobreestiman qué tan activas son. Usa la calculadora como punto de partida, luego ajusta basado en resultados reales sobre 2-3 semanas. Si no estás viendo cambios de peso esperados, ajusta por 100-200 calorías en lugar de hacer cambios drásticos."
        },
        {
          "question": "¿Debo comer de vuelta las calorías del ejercicio?",
          "answer": "Tu TDEE ya incluye tu nivel de actividad, así que las calorías de ejercicio adicional están parcialmente contabilizadas. Si haces ejercicio extra más allá de tu nivel de actividad declarado, comer de vuelta aproximadamente 50% de esas calorías es un enfoque seguro. Los rastreadores de fitness y máquinas tienden a sobreestimar calorías quemadas por 20-40%, así que comer de vuelta todas a menudo lleva a progreso más lento del esperado."
        },
        {
          "question": "¿Cuál es la diferencia entre TMB y TDEE?",
          "answer": "TMB (Tasa Metabólica Basal) es el número de calorías que tu cuerpo quema en reposo completo — solo para mantener tus órganos funcionando. TDEE (Gasto Energético Diario Total) es tu TMB multiplicada por un factor de actividad, representando las calorías totales que quemas en un día incluyendo movimiento y ejercicio. TDEE es el número que usas para establecer tu objetivo calórico: come debajo para perder peso, arriba para ganar peso, o igual para mantener."
        },
        {
          "question": "¿Qué tan rápido debo perder peso?",
          "answer": "Una tasa de 0.5-1 lb por semana (déficit de 250-500 calorías) es generalmente recomendada para pérdida de peso sostenible que preserva masa muscular. Tasas más rápidas de 1.5-2 lbs por semana son posibles pero aumentan el riesgo de pérdida muscular, ralentización metabólica y deficiencias nutricionales. Personas con más peso que perder pueden sostener un déficit mayor inicialmente, mientras aquellas más cerca de su peso objetivo deben usar un déficit menor para evitar mesetas y mantener músculo."
        }
      ],
      "chart": {
        "title": "Calorías por Nivel de Actividad",
        "xLabel": "Nivel de Actividad",
        "yLabel": "Calorías/día",
        "series": {
          "maintenance": "Mantenimiento",
          "target": "Tu Objetivo"
        }
      },
      "detailedTable": {
        "zigzagPlan": {
          "button": "📅 Ver Plan Zig-Zag de 7 Días",
          "title": "Plan de Ciclado Calórico Zig-Zag de 7 Días",
          "columns": {
            "day": "Día",
            "calories": "Calorías",
            "protein": "Proteína",
            "carbs": "Carbohidratos",
            "fat": "Grasa"
          }
        }
      },
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
      "name": "Calculadora de Calorias",
      "slug": "calculadora-calorias",
      "subtitle": "Descubra suas necessidades diárias de calorias com ciclagem zig-zag, distribuição de macros e suporte a diferentes dietas para um planejamento nutricional inteligente",
      "breadcrumb": "Calorias",
      "seo": {
        "title": "Calculadora de Calorias — Ingestão Diária, Zig-Zag e Macros | Ferramenta Gratuita",
        "description": "Calcule suas necessidades diárias de calorias usando a fórmula Mifflin-St Jeor. Obtenha metas de manutenção, perda e ganho de peso com ciclagem zig-zag de 7 dias, distribuição de macros e suporte a diferentes dietas incluindo cetogênica e alta proteína.",
        "keywords": [
          "calculadora de calorias",
          "calculadora ingestão calórica diária",
          "quantas calorias preciso",
          "calculadora déficit calórico",
          "ciclagem calórica zig-zag",
          "calculadora de macros",
          "calculadora TDEE"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "mode": {
          "label": "Modo da Calculadora",
          "helpText": "Básico atende a maioria das necessidades — Avançado adiciona seleção de fórmula, modos de dieta e entrada de percentual de gordura corporal",
          "options": {
            "basic": "⚡ Básico",
            "advanced": "🔧 Avançado"
          }
        },
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
          "helpText": "Idades de 15–80 para estimativa precisa"
        },
        "activityLevel": {
          "label": "Nível de Atividade",
          "helpText": "Sua rotina típica de exercícios semanal",
          "options": {
            "sedentary": "Sedentário (pouco ou nenhum exercício)",
            "light": "Levemente Ativo (1–3 dias/semana)",
            "moderate": "Moderadamente Ativo (3–5 dias/semana)",
            "active": "Muito Ativo (6–7 dias/semana)",
            "veryActive": "Extra Ativo (atleta / trabalho físico)"
          }
        },
        "goal": {
          "label": "Objetivo",
          "helpText": "O que você quer alcançar",
          "options": {
            "maintain": "Manter Peso",
            "loss": "Perder Peso",
            "gain": "Ganhar Peso"
          }
        },
        "lossPace": {
          "label": "Ritmo de Perda de Peso",
          "helpText": "Mais lento é mais sustentável e preserva músculo",
          "options": {
            "mild": "Suave — 0,25 kg/semana (-250 cal)",
            "moderate": "Moderado — 0,5 kg/semana (-500 cal)",
            "aggressive": "Agressivo — 0,75 kg/semana (-750 cal)",
            "extreme": "Extremo — 1 kg/semana (-1.000 cal)"
          }
        },
        "gainPace": {
          "label": "Ritmo de Ganho de Peso",
          "helpText": "Ritmo mais lento minimiza ganho de gordura",
          "options": {
            "slow": "Lento — 0,25 kg/semana (+250 cal)",
            "moderate": "Moderado — 0,5 kg/semana (+500 cal)",
            "fast": "Rápido — 0,75 kg/semana (+750 cal)"
          }
        },
        "formula": {
          "label": "Fórmula TMB",
          "helpText": "Mifflin-St Jeor é recomendada para a maioria das pessoas",
          "options": {
            "mifflin": "Mifflin-St Jeor (recomendada)",
            "harris": "Harris-Benedict (revisada)",
            "katch": "Katch-McArdle (requer % gordura corporal)"
          }
        },
        "bodyFatPercent": {
          "label": "% Gordura Corporal",
          "helpText": "Necessário para Katch-McArdle — estime ou use uma calculadora de gordura corporal",
          "placeholder": "ex. 20"
        },
        "dietMode": {
          "label": "Modo de Dieta",
          "helpText": "Altera como as calorias são divididas em macros",
          "options": {
            "balanced": "Balanceada (30/40/30)",
            "keto": "Cetogênica (25/5/70)",
            "lowCarb": "Baixo Carbo (35/20/45)",
            "highProtein": "Alta Proteína (40/35/25)",
            "leangains": "Leangains (40/40/20)"
          }
        },
        "carbLimitG": {
          "label": "Limite Diário de Carboidratos",
          "helpText": "Ingestão fixa de carboidratos para cetogênica — proteína e gordura se ajustam automaticamente",
          "placeholder": "25"
        }
      },
      "inputGroups": {},
      "results": {
        "dailyCalories": {
          "label": "Calorias Diárias"
        },
        "bmr": {
          "label": "TMB (Taxa Metabólica Basal)"
        },
        "tdee": {
          "label": "Manutenção (TDEE)"
        },
        "adjustment": {
          "label": "Ajuste Diário"
        },
        "weeklyChange": {
          "label": "Mudança Semanal Est."
        },
        "proteinG": {
          "label": "Proteína"
        },
        "carbsG": {
          "label": "Carboidratos"
        },
        "fatG": {
          "label": "Gordura"
        }
      },
      "tooltips": {
        "dailyCalories": "Sua ingestão calórica diária recomendada baseada no seu objetivo",
        "bmr": "Calorias que seu corpo queima em repouso completo — apenas para manter os órgãos funcionando",
        "tdee": "Gasto Energético Diário Total — calorias para manter peso atual incluindo atividade",
        "adjustment": "Déficit ou superávit calórico relativo ao seu TDEE",
        "weeklyChange": "Mudança estimada de peso por semana neste nível calórico",
        "proteinG": "Meta diária de proteína baseada no seu modo de dieta — 4 cal por grama",
        "carbsG": "Meta diária de carboidratos — 4 cal por grama",
        "fatG": "Meta diária de gordura — 9 cal por grama"
      },
      "presets": {
        "sedentaryLoss": {
          "label": "Perda de Peso Trabalhador de Escritório",
          "description": "Mulher sedentária, déficit moderado"
        },
        "activeMaintain": {
          "label": "Manutenção Ativa",
          "description": "Homem ativo mantendo peso atual"
        },
        "ketoLoss": {
          "label": "Dieta Cetogênica",
          "description": "Abordagem baixo carbo com limite de 25g de carboidratos"
        },
        "bulkGain": {
          "label": "Ganho de Músculo",
          "description": "Superávit moderado com alta proteína"
        }
      },
      "values": {
        "cal": "cal",
        "g": "g",
        "kg": "kg",
        "lbs": "lbs",
        "lb": "lb",
        "week": "semana",
        "weeks": "semanas",
        "day": "dia",
        "Monday": "Segunda-feira",
        "Tuesday": "Terça-feira",
        "Wednesday": "Quarta-feira",
        "Thursday": "Quinta-feira",
        "Friday": "Sexta-feira",
        "Saturday": "Sábado",
        "Sunday": "Domingo",
        "Average": "Média",
        "Total": "Total",
        "Maintain": "Manter",
        "Loss": "Perda",
        "Gain": "Ganho",
        "Sedentary": "Sedentário",
        "Light": "Leve",
        "Moderate": "Moderado",
        "Active": "Ativo",
        "Very Active": "Muito Ativo",
        "Protein": "Proteína",
        "Carbs": "Carboidratos",
        "Fat": "Gordura",
        "Balanced": "Balanceada",
        "Keto": "Cetogênica",
        "Low Carb": "Baixo Carbo",
        "High Protein": "Alta Proteína",
        "Leangains": "Leangains",
        "Mifflin-St Jeor": "Mifflin-St Jeor",
        "Harris-Benedict": "Harris-Benedict",
        "Katch-McArdle": "Katch-McArdle"
      },
      "formats": {
        "summary": "Sua meta diária é {dailyCalories} cal ({goalLabel}). TMB: {bmr} cal, TDEE: {tdee} cal. Macros: {protein}g proteína, {carbs}g carboidratos, {fat}g gordura ({dietLabel})."
      },
      "infoCards": {
        "energyBreakdown": {
          "title": "⚡ Divisão de Energia",
          "items": [
            {
              "label": "TMB",
              "valueKey": "bmr"
            },
            {
              "label": "TDEE (Manutenção)",
              "valueKey": "tdee"
            },
            {
              "label": "Meta Diária",
              "valueKey": "dailyCalories"
            },
            {
              "label": "Ajuste",
              "valueKey": "adjustment"
            }
          ]
        },
        "macroSplit": {
          "title": "🥗 Divisão de Macros",
          "items": [
            {
              "label": "Proteína",
              "valueKey": "proteinG"
            },
            {
              "label": "Carboidratos",
              "valueKey": "carbsG"
            },
            {
              "label": "Gordura",
              "valueKey": "fatG"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas Rápidas",
          "items": [
            "Monitore sua ingestão por pelo menos 2 semanas antes de ajustar — consistência supera precisão",
            "Pese-se no mesmo horário diariamente e use médias semanais, não oscilações diárias",
            "Nunca vá abaixo de 1.200 cal (mulheres) ou 1.500 cal (homens) sem supervisão médica",
            "Se o peso estagnar por 2+ semanas, recalcule — seu TDEE diminui conforme você perde peso"
          ]
        }
      },
      "referenceData": {
        "activityLevels": {
          "title": "Multiplicadores de Nível de Atividade",
          "items": [
            {
              "label": "Sedentário",
              "value": "×1.20 — Trabalho de mesa, pouco exercício"
            },
            {
              "label": "Levemente Ativo",
              "value": "×1.375 — Exercício leve 1–3 dias/semana"
            },
            {
              "label": "Moderadamente Ativo",
              "value": "×1.55 — Exercício moderado 3–5 dias/semana"
            },
            {
              "label": "Muito Ativo",
              "value": "×1.725 — Exercício intenso 6–7 dias/semana"
            },
            {
              "label": "Extra Ativo",
              "value": "×1.90 — Atleta ou trabalho físico"
            }
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é uma Calculadora de Calorias?",
          "content": "Uma calculadora de calorias estima o número de calorias que seu corpo precisa diariamente baseado na sua idade, sexo, altura, peso e nível de atividade. Ela começa calculando sua Taxa Metabólica Basal (TMB) — a energia que seu corpo usa em repouso completo apenas para manter seu coração batendo, pulmões respirando e órgãos funcionando. Sua TMB tipicamente representa 60–75% do total de calorias diárias. A calculadora então multiplica sua TMB por um fator de atividade para determinar seu Gasto Energético Diário Total (TDEE), que representa as calorias necessárias para manter seu peso atual. A partir daí, você pode criar um déficit calórico para perder peso, um superávit para ganhar peso, ou comer na manutenção para permanecer igual. Entender suas necessidades calóricas é a base de qualquer plano nutricional eficaz, seja seu objetivo perda de gordura, ganho de músculo, ou simplesmente manter um peso saudável."
        },
        "formulas": {
          "title": "Entendendo as Fórmulas de TMB",
          "content": "Esta calculadora oferece três fórmulas de TMB cientificamente validadas. A equação Mifflin-St Jeor (1990) é considerada o padrão ouro — recomendada pela Associação Dietética Americana por sua precisão em 82% dos indivíduos não obesos. Ela usa uma equação linear simples baseada em peso, altura, idade e sexo. A equação Harris-Benedict (originalmente 1918, revisada 1984) foi o padrão por décadas mas tende a superestimar a TMB em cerca de 5%, especialmente em indivíduos com sobrepeso. Permanece útil para comparação. A fórmula Katch-McArdle (1991) é única porque usa massa corporal magra ao invés do peso total, tornando-a a opção mais precisa para atletas ou qualquer pessoa que conheça seu percentual de gordura corporal. Como ignora o sexo (massa magra já considera a diferença), requer uma medição precisa de gordura corporal para funcionar adequadamente. Para a maioria das pessoas, Mifflin-St Jeor fornece o melhor equilíbrio entre precisão e simplicidade."
        },
        "considerations": {
          "title": "Considerações Importantes",
          "items": [
            {
              "text": "Calculadoras de calorias fornecem estimativas, não números exatos — o metabolismo individual pode variar ±10% devido à genética, hormônios e saúde intestinal",
              "type": "warning"
            },
            {
              "text": "Nunca vá abaixo de 1.200 cal/dia (mulheres) ou 1.500 cal/dia (homens) sem supervisão médica — déficits extremos desaceleram o metabolismo e arriscam deficiências nutricionais",
              "type": "warning"
            },
            {
              "text": "A adaptação metabólica é real — seu corpo queima menos calorias conforme você perde peso, então recalcule a cada 5–7 kg perdidos",
              "type": "info"
            },
            {
              "text": "O nível de atividade é a maior fonte de erro — a maioria das pessoas superestima sua intensidade de exercício, então comece conservador",
              "type": "info"
            },
            {
              "text": "O efeito térmico dos alimentos (ETA) representa cerca de 10% das calorias totais — proteína tem o maior ETA com 20–30%",
              "type": "info"
            },
            {
              "text": "Consistência importa mais que precisão — uma meta calórica aproximada seguida diariamente supera um número perfeito seguido esporadicamente",
              "type": "info"
            }
          ]
        },
        "zigzag": {
          "title": "Como Funciona a Ciclagem Calórica Zig-Zag",
          "items": [
            {
              "text": "A ciclagem zig-zag alterna entre dias de calorias mais altas e mais baixas mantendo o total semanal igual — seu corpo recebe a mesma energia mas a adaptação metabólica é reduzida",
              "type": "info"
            },
            {
              "text": "Dias de calorias mais altas ajudam a manter os níveis de leptina (o hormônio da fome), tornando a dieta mais sustentável e prevenindo o platô que muitas pessoas atingem após 4–6 semanas",
              "type": "info"
            },
            {
              "text": "O padrão varia a ingestão diária em ±15–20% em torno da sua meta — por exemplo, numa meta de 2.000 cal, os dias variam de 1.700 a 2.300 cal",
              "type": "info"
            },
            {
              "text": "Agende dias de calorias mais altas nos dias de treino e dias de calorias mais baixas nos dias de descanso para ótimo desempenho e recuperação",
              "type": "info"
            },
            {
              "text": "Zig-zag é especialmente eficaz durante platôs de perda de gordura — se seu peso estagnou por 2+ semanas num déficit consistente, tente ciclar suas calorias",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculos",
          "description": "Passo a passo usando a fórmula Mifflin-St Jeor",
          "examples": [
            {
              "title": "Perda de Peso — Mulher de 30 anos",
              "steps": [
                "Dados: Mulher, 30 anos, 72,6 kg, 1,65m, moderadamente ativa",
                "TMB = (10 × 72,6) + (6,25 × 165) - (5 × 30) - 161 = 1.408 cal",
                "TDEE = 1.408 × 1,55 (moderado) = 2.182 cal",
                "Déficit moderado (-500 cal): 2.182 - 500 = 1.682 cal/dia",
                "Macros (balanceada 30/40/30): 126g proteína, 168g carboidratos, 56g gordura"
              ],
              "result": "Meta diária: 1.682 cal — perda estimada ~0,5 kg/semana"
            },
            {
              "title": "Ganho de Músculo — Homem de 24 anos",
              "steps": [
                "Dados: Homem, 24 anos, 72,6 kg, 1,78m, moderadamente ativo",
                "TMB = (10 × 72,6) + (6,25 × 178) - (5 × 24) + 5 = 1.724 cal",
                "TDEE = 1.724 × 1,55 (moderado) = 2.672 cal",
                "Superávit moderado (+500 cal): 2.672 + 500 = 3.172 cal/dia",
                "Macros (alta proteína 40/35/25): 317g proteína, 278g carboidratos, 88g gordura"
              ],
              "result": "Meta diária: 3.172 cal — ganho estimado ~0,5 kg/semana"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qual fórmula de TMB devo usar?",
          "answer": "Para a maioria das pessoas, a equação Mifflin-St Jeor é a melhor escolha — é a mais precisa para a população geral e é recomendada pela Associação Dietética Americana. Use Harris-Benedict se quiser uma segunda opinião para comparação. Escolha Katch-McArdle apenas se conhecer seu percentual de gordura corporal com precisão, pois usa massa corporal magra para uma estimativa mais precisa, especialmente para atletas."
        },
        {
          "question": "Como a ciclagem calórica zig-zag ajuda na perda de peso?",
          "answer": "A ciclagem zig-zag alterna entre dias de calorias mais altas e mais baixas mantendo o mesmo total semanal. Isso previne que seu corpo se adapte a um nível calórico constante, que frequentemente causa platôs de perda de peso após 4–6 semanas. Dias de calorias mais altas ajudam a manter a leptina (o hormônio da saciedade) e função da tireoide, tornando a dieta mais sustentável. Pesquisas sugerem que a ciclagem calórica pode melhorar a aderência e resultados a longo prazo comparado à restrição calórica constante."
        },
        {
          "question": "Qual é a ingestão calórica mínima segura?",
          "answer": "Autoridades de saúde geralmente recomendam não ir abaixo de 1.200 calorias por dia para mulheres ou 1.500 calorias por dia para homens sem supervisão médica. Ir muito baixo arrisca deficiências nutricionais, perda muscular, desaceleração metabólica e disrupção hormonal. Se a calculadora sugerir um número abaixo desses limites, considere reduzir seu déficit ou aumentar seu nível de atividade."
        },
        {
          "question": "Qual modo de dieta devo escolher?",
          "answer": "Balanceada (30/40/30) funciona para a maioria das pessoas e é a mais fácil de manter a longo prazo. Cetogênica (25/5/70) é eficaz para perda rápida de gordura mas requer restrição rigorosa de carboidratos e pode ser difícil de sustentar. Baixo Carbo (35/20/45) é uma abordagem moderada que reduz carboidratos sem restrição cetogênica completa. Alta Proteína (40/35/25) é ideal para construção ou preservação muscular durante um corte. Leangains (40/40/20) combina alta proteína com altos carboidratos para treino focado em desempenho."
        },
        {
          "question": "Quão precisas são as calculadoras de calorias?",
          "answer": "A fórmula Mifflin-St Jeor é precisa dentro de ±10% para cerca de 82% dos indivíduos não obesos. A maior fonte de erro geralmente é a estimativa do nível de atividade — a maioria das pessoas superestima o quão ativas são. Use a calculadora como ponto de partida, então ajuste baseado nos resultados reais ao longo de 2–3 semanas. Se não estiver vendo mudanças de peso esperadas, ajuste em 100–200 calorias ao invés de fazer mudanças drásticas."
        },
        {
          "question": "Devo comer de volta as calorias do exercício?",
          "answer": "Seu TDEE já inclui seu nível de atividade, então calorias de exercício adicional são parcialmente consideradas. Se fizer exercício extra além do seu nível de atividade declarado, comer de volta cerca de 50% dessas calorias é uma abordagem segura. Monitores de fitness e máquinas tendem a superestimar calorias queimadas em 20–40%, então comer todas de volta frequentemente leva a progresso mais lento que o esperado."
        },
        {
          "question": "Qual é a diferença entre TMB e TDEE?",
          "answer": "TMB (Taxa Metabólica Basal) é o número de calorias que seu corpo queima em repouso completo — apenas para manter seus órgãos funcionando. TDEE (Gasto Energético Diário Total) é sua TMB multiplicada por um fator de atividade, representando o total de calorias que você queima num dia incluindo movimento e exercício. TDEE é o número que você usa para definir sua meta calórica: coma abaixo para perder peso, acima para ganhar peso, ou nele para manter."
        },
        {
          "question": "Quão rápido devo perder peso?",
          "answer": "Uma taxa de 0,25–0,5 kg por semana (déficit de 250–500 calorias) é geralmente recomendada para perda de peso sustentável que preserva massa muscular. Taxas mais rápidas de 0,75–1 kg por semana são possíveis mas aumentam o risco de perda muscular, desaceleração metabólica e deficiências nutricionais. Pessoas com mais peso a perder podem sustentar com segurança um déficit maior inicialmente, enquanto aquelas mais próximas da meta devem usar um déficit menor para evitar platôs e manter músculo."
        }
      ],
      "chart": {
        "title": "Calorias por Nível de Atividade",
        "xLabel": "Nível de Atividade",
        "yLabel": "Calorias/dia",
        "series": {
          "maintenance": "Manutenção",
          "target": "Sua Meta"
        }
      },
      "detailedTable": {
        "zigzagPlan": {
          "button": "📅 Ver Plano Zig-Zag de 7 Dias",
          "title": "Plano de Ciclagem Calórica Zig-Zag de 7 Dias",
          "columns": {
            "day": "Dia",
            "calories": "Calorias",
            "protein": "Proteína",
            "carbs": "Carboidratos",
            "fat": "Gordura"
          }
        }
      },
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
      "name": "Calculateur de Calories",
      "slug": "calculateur-calories",
      "subtitle": "Trouvez vos besoins caloriques quotidiens avec le cyclage zig-zag, la répartition des macronutriments et le support des modes de régime pour une planification nutritionnelle plus intelligente",
      "breadcrumb": "Calories",
      "seo": {
        "title": "Calculateur de Calories — Apport Quotidien, Zig-Zag & Macros | Outil Gratuit",
        "description": "Calculez vos besoins caloriques quotidiens avec la formule de Mifflin-St Jeor. Obtenez les objectifs de maintien, perte et prise de poids avec le cyclage zig-zag sur 7 jours, la répartition des macronutriments et le support des modes de régime incluant keto et hyperprotéiné.",
        "keywords": [
          "calculateur de calories",
          "calculateur apport calorique quotidien",
          "combien de calories ai-je besoin",
          "calculateur déficit calorique",
          "cyclage calorique zig-zag",
          "calculateur de macronutriments",
          "calculateur TDEE"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "mode": {
          "label": "Mode du Calculateur",
          "helpText": "Le mode Basique couvre la plupart des besoins — Avancé ajoute la sélection de formules, les modes de régime et la saisie du pourcentage de graisse corporelle",
          "options": {
            "basic": "⚡ Basique",
            "advanced": "🔧 Avancé"
          }
        },
        "gender": {
          "label": "Sexe",
          "helpText": "Les formules de BMR diffèrent selon le sexe biologique",
          "options": {
            "male": "Homme",
            "female": "Femme"
          }
        },
        "age": {
          "label": "Âge",
          "helpText": "Âges 15–80 pour une estimation précise"
        },
        "activityLevel": {
          "label": "Niveau d'Activité",
          "helpText": "Votre routine d'exercice hebdomadaire typique",
          "options": {
            "sedentary": "Sédentaire (peu ou pas d'exercice)",
            "light": "Légèrement Actif (1–3 jours/semaine)",
            "moderate": "Modérément Actif (3–5 jours/semaine)",
            "active": "Très Actif (6–7 jours/semaine)",
            "veryActive": "Extrêmement Actif (athlète / travail physique)"
          }
        },
        "goal": {
          "label": "Objectif",
          "helpText": "Ce que vous voulez atteindre",
          "options": {
            "maintain": "Maintenir le Poids",
            "loss": "Perdre du Poids",
            "gain": "Prendre du Poids"
          }
        },
        "lossPace": {
          "label": "Rythme de Perte de Poids",
          "helpText": "Plus lent est plus durable et préserve les muscles",
          "options": {
            "mild": "Léger — 0,2 kg/semaine (-250 cal)",
            "moderate": "Modéré — 0,5 kg/semaine (-500 cal)",
            "aggressive": "Agressif — 0,7 kg/semaine (-750 cal)",
            "extreme": "Extrême — 0,9 kg/semaine (-1 000 cal)"
          }
        },
        "gainPace": {
          "label": "Rythme de Prise de Poids",
          "helpText": "Un rythme plus lent minimise la prise de graisse",
          "options": {
            "slow": "Lent — 0,2 kg/semaine (+250 cal)",
            "moderate": "Modéré — 0,5 kg/semaine (+500 cal)",
            "fast": "Rapide — 0,7 kg/semaine (+750 cal)"
          }
        },
        "formula": {
          "label": "Formule BMR",
          "helpText": "Mifflin-St Jeor est recommandée pour la plupart des personnes",
          "options": {
            "mifflin": "Mifflin-St Jeor (recommandée)",
            "harris": "Harris-Benedict (révisée)",
            "katch": "Katch-McArdle (nécessite le % de graisse corporelle)"
          }
        },
        "bodyFatPercent": {
          "label": "% Graisse Corporelle",
          "helpText": "Requis pour Katch-McArdle — estimez ou utilisez un calculateur de graisse corporelle",
          "placeholder": "ex. 20"
        },
        "dietMode": {
          "label": "Mode de Régime",
          "helpText": "Change la façon dont les calories sont réparties en macronutriments",
          "options": {
            "balanced": "Équilibré (30/40/30)",
            "keto": "Keto (25/5/70)",
            "lowCarb": "Faible en Glucides (35/20/45)",
            "highProtein": "Riche en Protéines (40/35/25)",
            "leangains": "Leangains (40/40/20)"
          }
        },
        "carbLimitG": {
          "label": "Limite de Glucides Quotidienne",
          "helpText": "Apport fixe en glucides pour keto — les protéines et lipides s'ajustent automatiquement",
          "placeholder": "25"
        }
      },
      "inputGroups": {},
      "results": {
        "dailyCalories": {
          "label": "Calories Quotidiennes"
        },
        "bmr": {
          "label": "BMR (Métabolisme de Base)"
        },
        "tdee": {
          "label": "Maintien (TDEE)"
        },
        "adjustment": {
          "label": "Ajustement Quotidien"
        },
        "weeklyChange": {
          "label": "Changement Hebdo. Estimé"
        },
        "proteinG": {
          "label": "Protéines"
        },
        "carbsG": {
          "label": "Glucides"
        },
        "fatG": {
          "label": "Lipides"
        }
      },
      "tooltips": {
        "dailyCalories": "Votre apport calorique quotidien recommandé basé sur votre objectif",
        "bmr": "Calories que votre corps brûle au repos complet — juste pour faire fonctionner les organes",
        "tdee": "Dépense Énergétique Quotidienne Totale — calories pour maintenir le poids actuel incluant l'activité",
        "adjustment": "Déficit ou surplus calorique par rapport à votre TDEE",
        "weeklyChange": "Changement de poids estimé par semaine à ce niveau calorique",
        "proteinG": "Objectif de protéines quotidiennes basé sur votre mode de régime — 4 cal par gramme",
        "carbsG": "Objectif de glucides quotidiens — 4 cal par gramme",
        "fatG": "Objectif de lipides quotidiens — 9 cal par gramme"
      },
      "presets": {
        "sedentaryLoss": {
          "label": "Perte de Poids Travailleur de Bureau",
          "description": "Femme sédentaire, déficit modéré"
        },
        "activeMaintain": {
          "label": "Maintien Actif",
          "description": "Homme actif maintenant son poids actuel"
        },
        "ketoLoss": {
          "label": "Régime Keto",
          "description": "Approche faible en glucides avec limite de 25g de glucides"
        },
        "bulkGain": {
          "label": "Prise de Muscle",
          "description": "Surplus modéré avec protéines élevées"
        }
      },
      "values": {
        "cal": "cal",
        "g": "g",
        "kg": "kg",
        "lbs": "lbs",
        "lb": "lb",
        "week": "semaine",
        "weeks": "semaines",
        "day": "jour",
        "Monday": "Lundi",
        "Tuesday": "Mardi",
        "Wednesday": "Mercredi",
        "Thursday": "Jeudi",
        "Friday": "Vendredi",
        "Saturday": "Samedi",
        "Sunday": "Dimanche",
        "Average": "Moyenne",
        "Total": "Total",
        "Maintain": "Maintien",
        "Loss": "Perte",
        "Gain": "Prise",
        "Sedentary": "Sédentaire",
        "Light": "Léger",
        "Moderate": "Modéré",
        "Active": "Actif",
        "Very Active": "Très Actif",
        "Protein": "Protéines",
        "Carbs": "Glucides",
        "Fat": "Lipides",
        "Balanced": "Équilibré",
        "Keto": "Keto",
        "Low Carb": "Faible en Glucides",
        "High Protein": "Riche en Protéines",
        "Leangains": "Leangains",
        "Mifflin-St Jeor": "Mifflin-St Jeor",
        "Harris-Benedict": "Harris-Benedict",
        "Katch-McArdle": "Katch-McArdle"
      },
      "formats": {
        "summary": "Votre objectif quotidien est {dailyCalories} cal ({goalLabel}). BMR : {bmr} cal, TDEE : {tdee} cal. Macros : {protein}g protéines, {carbs}g glucides, {fat}g lipides ({dietLabel})."
      },
      "infoCards": {
        "energyBreakdown": {
          "title": "⚡ Répartition Énergétique",
          "items": [
            {
              "label": "BMR",
              "valueKey": "bmr"
            },
            {
              "label": "TDEE (Maintien)",
              "valueKey": "tdee"
            },
            {
              "label": "Objectif Quotidien",
              "valueKey": "dailyCalories"
            },
            {
              "label": "Ajustement",
              "valueKey": "adjustment"
            }
          ]
        },
        "macroSplit": {
          "title": "🥗 Répartition Macros",
          "items": [
            {
              "label": "Protéines",
              "valueKey": "proteinG"
            },
            {
              "label": "Glucides",
              "valueKey": "carbsG"
            },
            {
              "label": "Lipides",
              "valueKey": "fatG"
            }
          ]
        },
        "tips": {
          "title": "💡 Conseils Rapides",
          "items": [
            "Suivez votre apport pendant au moins 2 semaines avant d'ajuster — la constance bat la précision",
            "Pesez-vous à la même heure quotidiennement et utilisez les moyennes hebdomadaires, pas les variations quotidiennes",
            "Ne descendez jamais en dessous de 1 200 cal (femmes) ou 1 500 cal (hommes) sans supervision médicale",
            "Si le poids stagne pendant 2+ semaines, recalculez — votre TDEE diminue quand vous perdez du poids"
          ]
        }
      },
      "referenceData": {
        "activityLevels": {
          "title": "Multiplicateurs de Niveau d'Activité",
          "items": [
            {
              "label": "Sédentaire",
              "value": "×1,20 — Travail de bureau, peu d'exercice"
            },
            {
              "label": "Légèrement Actif",
              "value": "×1,375 — Exercice léger 1–3 jours/semaine"
            },
            {
              "label": "Modérément Actif",
              "value": "×1,55 — Exercice modéré 3–5 jours/semaine"
            },
            {
              "label": "Très Actif",
              "value": "×1,725 — Exercice intense 6–7 jours/semaine"
            },
            {
              "label": "Extrêmement Actif",
              "value": "×1,90 — Athlète ou travail physique"
            }
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'un Calculateur de Calories ?",
          "content": "Un calculateur de calories estime le nombre de calories dont votre corps a besoin chaque jour en fonction de votre âge, sexe, taille, poids et niveau d'activité. Il commence par calculer votre Métabolisme de Base (BMR) — l'énergie que votre corps utilise au repos complet juste pour maintenir votre cœur qui bat, vos poumons qui respirent et vos organes qui fonctionnent. Votre BMR représente généralement 60–75% des calories quotidiennes totales. Le calculateur multiplie ensuite votre BMR par un facteur d'activité pour déterminer votre Dépense Énergétique Quotidienne Totale (TDEE), qui représente les calories nécessaires pour maintenir votre poids actuel. À partir de là, vous pouvez créer un déficit calorique pour perdre du poids, un surplus pour en prendre, ou manger à niveau de maintien pour rester stable. Comprendre vos besoins caloriques est la base de tout plan nutritionnel efficace, que votre objectif soit la perte de graisse, la prise de muscle ou simplement maintenir un poids sain."
        },
        "formulas": {
          "title": "Comprendre les Formules de BMR",
          "content": "Ce calculateur propose trois formules de BMR scientifiquement validées. L'équation de Mifflin-St Jeor (1990) est considérée comme la référence — recommandée par l'Association Américaine de Diététique pour sa précision chez 82% des individus non obèses. Elle utilise une équation linéaire simple basée sur le poids, la taille, l'âge et le sexe. L'équation de Harris-Benedict (originellement 1918, révisée 1984) fut la norme pendant des décennies mais tend à surestimer le BMR d'environ 5%, surtout chez les individus en surpoids. Elle reste utile pour comparaison. La formule de Katch-McArdle (1991) est unique car elle utilise la masse maigre au lieu du poids total, la rendant la plus précise pour les athlètes ou quiconque connaît son pourcentage de graisse corporelle. Puisqu'elle ignore le sexe (la masse maigre tient déjà compte de la différence), elle nécessite une mesure précise de graisse corporelle pour fonctionner correctement. Pour la plupart des gens, Mifflin-St Jeor offre le meilleur équilibre entre précision et simplicité."
        },
        "considerations": {
          "title": "Considérations Importantes",
          "items": [
            {
              "text": "Les calculateurs de calories fournissent des estimations, pas des chiffres exacts — le métabolisme individuel peut varier de ±10% dû à la génétique, aux hormones et à la santé intestinale",
              "type": "warning"
            },
            {
              "text": "Ne descendez jamais en dessous de 1 200 cal/jour (femmes) ou 1 500 cal/jour (hommes) sans supervision médicale — les déficits extrêmes ralentissent le métabolisme et risquent des carences nutritionnelles",
              "type": "warning"
            },
            {
              "text": "L'adaptation métabolique est réelle — votre corps brûle moins de calories quand vous perdez du poids, donc recalculez tous les 4–7 kg perdus",
              "type": "info"
            },
            {
              "text": "Le niveau d'activité est la plus grande source d'erreur — la plupart des gens surestiment leur intensité d'exercice, donc commencez conservateur",
              "type": "info"
            },
            {
              "text": "L'effet thermique de la nourriture (ETN) représente environ 10% des calories totales — les protéines ont l'ETN le plus élevé à 20–30%",
              "type": "info"
            },
            {
              "text": "La constance importe plus que la précision — un objectif calorique approximatif suivi quotidiennement bat un chiffre parfait suivi sporadiquement",
              "type": "info"
            }
          ]
        },
        "zigzag": {
          "title": "Comment Fonctionne le Cyclage Calorique Zig-Zag",
          "items": [
            {
              "text": "Le cyclage zig-zag alterne entre des jours à calories plus hautes et plus basses tout en gardant le total hebdomadaire identique — votre corps reçoit la même énergie mais l'adaptation métabolique est réduite",
              "type": "info"
            },
            {
              "text": "Les jours à calories plus hautes aident à maintenir les niveaux de leptine (l'hormone de la faim), rendant le régime plus durable et prévenant le plateau que beaucoup atteignent après 4–6 semaines",
              "type": "info"
            },
            {
              "text": "Le motif varie l'apport quotidien de ±15–20% autour de votre cible — par exemple, sur un objectif de 2 000 cal, les jours vont de 1 700 à 2 300 cal",
              "type": "info"
            },
            {
              "text": "Programmez les jours à calories plus hautes les jours d'entraînement et les jours à calories plus basses les jours de repos pour une performance et récupération optimales",
              "type": "info"
            },
            {
              "text": "Le zig-zag est particulièrement efficace durant les plateaux de perte de graisse — si votre poids a stagné pendant 2+ semaines avec un déficit constant, essayez de cycler vos calories",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calculs",
          "description": "Étape par étape avec la formule de Mifflin-St Jeor",
          "examples": [
            {
              "title": "Perte de Poids — Femme 30 ans",
              "steps": [
                "Stats : Femme, 30 ans, 72,6 kg, 165 cm, modérément active",
                "BMR = (10 × 72,6) + (6,25 × 165) - (5 × 30) - 161 = 1 408 cal",
                "TDEE = 1 408 × 1,55 (modéré) = 2 182 cal",
                "Déficit modéré (-500 cal) : 2 182 - 500 = 1 682 cal/jour",
                "Macros (équilibré 30/40/30) : 126g protéines, 168g glucides, 56g lipides"
              ],
              "result": "Objectif quotidien : 1 682 cal — perte estimée ~0,5 kg/semaine"
            },
            {
              "title": "Prise de Muscle — Homme 24 ans",
              "steps": [
                "Stats : Homme, 24 ans, 72,6 kg, 178 cm, modérément actif",
                "BMR = (10 × 72,6) + (6,25 × 178) - (5 × 24) + 5 = 1 724 cal",
                "TDEE = 1 724 × 1,55 (modéré) = 2 672 cal",
                "Surplus modéré (+500 cal) : 2 672 + 500 = 3 172 cal/jour",
                "Macros (riche en protéines 40/35/25) : 317g protéines, 278g glucides, 88g lipides"
              ],
              "result": "Objectif quotidien : 3 172 cal — prise estimée ~0,5 kg/semaine"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle formule de BMR devrais-je utiliser ?",
          "answer": "Pour la plupart des gens, l'équation de Mifflin-St Jeor est le meilleur choix — c'est la plus précise pour la population générale et elle est recommandée par l'Association Américaine de Diététique. Utilisez Harris-Benedict si vous voulez un second avis pour comparaison. Choisissez Katch-McArdle seulement si vous connaissez précisément votre pourcentage de graisse corporelle, car elle utilise la masse maigre pour une estimation plus précise, surtout pour les athlètes."
        },
        {
          "question": "Comment le cyclage calorique zig-zag aide-t-il la perte de poids ?",
          "answer": "Le cyclage zig-zag alterne entre des jours à calories plus hautes et plus basses tout en gardant le même total hebdomadaire. Cela empêche votre corps de s'adapter à un niveau calorique constant, ce qui cause souvent des plateaux de perte de poids après 4–6 semaines. Les jours à calories plus hautes aident à maintenir la leptine (l'hormone de satiété) et la fonction thyroïdienne, rendant le régime plus durable. Les recherches suggèrent que le cyclage calorique peut améliorer l'adhésion et les résultats à long terme comparé à la restriction calorique constante."
        },
        {
          "question": "Quel est l'apport calorique minimum sécuritaire ?",
          "answer": "Les autorités sanitaires recommandent généralement de ne pas descendre en dessous de 1 200 calories par jour pour les femmes ou 1 500 calories par jour pour les hommes sans supervision médicale. Aller trop bas risque des carences nutritionnelles, une perte musculaire, un ralentissement métabolique et des perturbations hormonales. Si le calculateur suggère un chiffre en dessous de ces seuils, considérez réduire votre déficit ou augmenter votre niveau d'activité à la place."
        },
        {
          "question": "Quel mode de régime devrais-je choisir ?",
          "answer": "Équilibré (30/40/30) fonctionne pour la plupart des gens et est le plus facile à maintenir à long terme. Keto (25/5/70) est efficace pour une perte de graisse rapide mais nécessite une restriction stricte en glucides et peut être difficile à soutenir. Faible en Glucides (35/20/45) est une approche modérée qui réduit les glucides sans restriction keto complète. Riche en Protéines (40/35/25) est idéal pour la construction ou préservation musculaire durant une sèche. Leangains (40/40/20) combine protéines élevées avec glucides élevés pour un entraînement axé performance."
        },
        {
          "question": "À quel point les calculateurs de calories sont-ils précis ?",
          "answer": "La formule de Mifflin-St Jeor est précise à ±10% près pour environ 82% des individus non obèses. La plus grande source d'erreur est généralement l'estimation du niveau d'activité — la plupart des gens surestiment à quel point ils sont actifs. Utilisez le calculateur comme point de départ, puis ajustez selon les résultats réels sur 2–3 semaines. Si vous ne voyez pas les changements de poids attendus, ajustez de 100–200 calories plutôt que de faire des changements drastiques."
        },
        {
          "question": "Devrais-je remanger les calories d'exercice ?",
          "answer": "Votre TDEE inclut déjà votre niveau d'activité, donc les calories d'exercice supplémentaires sont partiellement comptabilisées. Si vous faites de l'exercice extra au-delà de votre niveau d'activité déclaré, remanger environ 50% de ces calories est une approche sécuritaire. Les trackers de fitness et machines tendent à surestimer les calories brûlées de 20–40%, donc les remanger toutes mène souvent à des progrès plus lents qu'attendu."
        },
        {
          "question": "Quelle est la différence entre BMR et TDEE ?",
          "answer": "Le BMR (Métabolisme de Base) est le nombre de calories que votre corps brûle au repos complet — juste pour faire fonctionner vos organes. Le TDEE (Dépense Énergétique Quotidienne Totale) est votre BMR multiplié par un facteur d'activité, représentant les calories totales que vous brûlez dans une journée incluant mouvement et exercice. Le TDEE est le chiffre que vous utilisez pour fixer votre objectif calorique : mangez en dessous pour perdre du poids, au-dessus pour en prendre, ou à niveau pour maintenir."
        },
        {
          "question": "À quelle vitesse devrais-je perdre du poids ?",
          "answer": "Un rythme de 0,2–0,5 kg par semaine (déficit de 250–500 calories) est généralement recommandé pour une perte de poids durable qui préserve la masse musculaire. Des rythmes plus rapides de 0,7–0,9 kg par semaine sont possibles mais augmentent le risque de perte musculaire, ralentissement métabolique et carences nutritionnelles. Les personnes avec plus de poids à perdre peuvent maintenir un déficit plus grand initialement, tandis que celles proches de leur objectif devraient utiliser un déficit plus petit pour éviter les plateaux et maintenir le muscle."
        }
      ],
      "chart": {
        "title": "Calories par Niveau d'Activité",
        "xLabel": "Niveau d'Activité",
        "yLabel": "Calories/jour",
        "series": {
          "maintenance": "Maintien",
          "target": "Votre Objectif"
        }
      },
      "detailedTable": {
        "zigzagPlan": {
          "button": "📅 Voir le Plan Zig-Zag sur 7 Jours",
          "title": "Plan de Cyclage Calorique Zig-Zag sur 7 Jours",
          "columns": {
            "day": "Jour",
            "calories": "Calories",
            "protein": "Protéines",
            "carbs": "Glucides",
            "fat": "Lipides"
          }
        }
      },
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
      "name": "Kalorienrechner",
      "slug": "kalorien-rechner",
      "subtitle": "Bestimmen Sie Ihren täglichen Kalorienbedarf mit Zick-Zack-Cycling, Makronährstoff-Aufschlüsselung und Diätmodus-Unterstützung für eine intelligentere Ernährungsplanung",
      "breadcrumb": "Kalorien",
      "seo": {
        "title": "Kalorienrechner — Tagesbedarf, Zick-Zack & Makros | Kostenloses Tool",
        "description": "Berechnen Sie Ihren täglichen Kalorienbedarf mit der Mifflin-St Jeor Formel. Erhalten Sie Zielwerte für Gewichtserhaltung, Gewichtsabnahme und Gewichtszunahme mit 7-Tage-Zick-Zack-Cycling, Makronährstoff-Aufschlüsselung und Diätmodus-Unterstützung einschließlich Keto- und proteinreicher Pläne.",
        "keywords": [
          "Kalorienrechner",
          "täglicher Kalorienbedarf Rechner",
          "wie viele Kalorien brauche ich",
          "Kaloriendefizit Rechner",
          "Zick-Zack Kalorien Cycling",
          "Makro Rechner",
          "TDEE Rechner"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "mode": {
          "label": "Rechner-Modus",
          "helpText": "Basis deckt die meisten Bedürfnisse ab — Erweitert fügt Formelauswahl, Diätmodi und Körperfett-Eingabe hinzu",
          "options": {
            "basic": "⚡ Basis",
            "advanced": "🔧 Erweitert"
          }
        },
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
          "helpText": "Alter 15–80 für genaue Schätzung"
        },
        "activityLevel": {
          "label": "Aktivitätslevel",
          "helpText": "Ihre typische wöchentliche Trainingsroutine",
          "options": {
            "sedentary": "Sitzend (wenig oder kein Sport)",
            "light": "Leicht Aktiv (1–3 Tage/Woche)",
            "moderate": "Mäßig Aktiv (3–5 Tage/Woche)",
            "active": "Sehr Aktiv (6–7 Tage/Woche)",
            "veryActive": "Extrem Aktiv (Athlet / körperlicher Beruf)"
          }
        },
        "goal": {
          "label": "Ziel",
          "helpText": "Was Sie erreichen möchten",
          "options": {
            "maintain": "Gewicht Halten",
            "loss": "Abnehmen",
            "gain": "Zunehmen"
          }
        },
        "lossPace": {
          "label": "Abnehm-Tempo",
          "helpText": "Langsamer ist nachhaltiger und erhält Muskeln",
          "options": {
            "mild": "Mild — 0,25 kg/Woche (-250 kcal)",
            "moderate": "Mäßig — 0,5 kg/Woche (-500 kcal)",
            "aggressive": "Aggressiv — 0,7 kg/Woche (-750 kcal)",
            "extreme": "Extrem — 0,9 kg/Woche (-1.000 kcal)"
          }
        },
        "gainPace": {
          "label": "Zunahme-Tempo",
          "helpText": "Langsameres Tempo minimiert Fettzunahme",
          "options": {
            "slow": "Langsam — 0,25 kg/Woche (+250 kcal)",
            "moderate": "Mäßig — 0,5 kg/Woche (+500 kcal)",
            "fast": "Schnell — 0,7 kg/Woche (+750 kcal)"
          }
        },
        "formula": {
          "label": "BMR-Formel",
          "helpText": "Mifflin-St Jeor wird für die meisten Menschen empfohlen",
          "options": {
            "mifflin": "Mifflin-St Jeor (empfohlen)",
            "harris": "Harris-Benedict (überarbeitet)",
            "katch": "Katch-McArdle (erfordert Körperfett %)"
          }
        },
        "bodyFatPercent": {
          "label": "Körperfett %",
          "helpText": "Erforderlich für Katch-McArdle — schätzen oder Körperfett-Rechner verwenden",
          "placeholder": "z.B. 20"
        },
        "dietMode": {
          "label": "Diät-Modus",
          "helpText": "Ändert wie Kalorien in Makros aufgeteilt werden",
          "options": {
            "balanced": "Ausgewogen (30/40/30)",
            "keto": "Keto (25/5/70)",
            "lowCarb": "Low Carb (35/20/45)",
            "highProtein": "Proteinreich (40/35/25)",
            "leangains": "Leangains (40/40/20)"
          }
        },
        "carbLimitG": {
          "label": "Tägliches Kohlenhydrat-Limit",
          "helpText": "Feste Kohlenhydrat-Zufuhr für Keto — Protein und Fett passen sich automatisch an",
          "placeholder": "25"
        }
      },
      "inputGroups": {},
      "results": {
        "dailyCalories": {
          "label": "Tägliche Kalorien"
        },
        "bmr": {
          "label": "BMR (Grundumsatz)"
        },
        "tdee": {
          "label": "Erhaltung (TDEE)"
        },
        "adjustment": {
          "label": "Tägliche Anpassung"
        },
        "weeklyChange": {
          "label": "Geschätzte Wochenänderung"
        },
        "proteinG": {
          "label": "Protein"
        },
        "carbsG": {
          "label": "Kohlenhydrate"
        },
        "fatG": {
          "label": "Fett"
        }
      },
      "tooltips": {
        "dailyCalories": "Ihre empfohlene tägliche Kalorienzufuhr basierend auf Ihrem Ziel",
        "bmr": "Kalorien, die Ihr Körper in völliger Ruhe verbrennt — nur um die Organe am Laufen zu halten",
        "tdee": "Gesamter Täglicher Energieverbrauch — Kalorien zum Halten des aktuellen Gewichts einschließlich Aktivität",
        "adjustment": "Kaloriendefizit oder -überschuss relativ zu Ihrem TDEE",
        "weeklyChange": "Geschätzte Gewichtsveränderung pro Woche bei diesem Kalorienlevel",
        "proteinG": "Tägliches Proteinziel basierend auf Ihrem Diätmodus — 4 kcal pro Gramm",
        "carbsG": "Tägliches Kohlenhydratziel — 4 kcal pro Gramm",
        "fatG": "Tägliches Fettziel — 9 kcal pro Gramm"
      },
      "presets": {
        "sedentaryLoss": {
          "label": "Büroarbeiter Gewichtsverlust",
          "description": "Sitzende Frau, mäßiges Defizit"
        },
        "activeMaintain": {
          "label": "Aktive Erhaltung",
          "description": "Aktiver Mann hält aktuelles Gewicht"
        },
        "ketoLoss": {
          "label": "Keto Diät",
          "description": "Low-Carb Ansatz mit 25g Kohlenhydrat-Limit"
        },
        "bulkGain": {
          "label": "Muskelaufbau",
          "description": "Mäßiger Überschuss mit hohem Protein"
        }
      },
      "values": {
        "cal": "kcal",
        "g": "g",
        "kg": "kg",
        "lbs": "lbs",
        "lb": "lb",
        "week": "Woche",
        "weeks": "Wochen",
        "day": "Tag",
        "Monday": "Montag",
        "Tuesday": "Dienstag",
        "Wednesday": "Mittwoch",
        "Thursday": "Donnerstag",
        "Friday": "Freitag",
        "Saturday": "Samstag",
        "Sunday": "Sonntag",
        "Average": "Durchschnitt",
        "Total": "Gesamt",
        "Maintain": "Halten",
        "Loss": "Verlust",
        "Gain": "Zunahme",
        "Sedentary": "Sitzend",
        "Light": "Leicht",
        "Moderate": "Mäßig",
        "Active": "Aktiv",
        "Very Active": "Sehr Aktiv",
        "Protein": "Protein",
        "Carbs": "Kohlenhydrate",
        "Fat": "Fett",
        "Balanced": "Ausgewogen",
        "Keto": "Keto",
        "Low Carb": "Low Carb",
        "High Protein": "Proteinreich",
        "Leangains": "Leangains",
        "Mifflin-St Jeor": "Mifflin-St Jeor",
        "Harris-Benedict": "Harris-Benedict",
        "Katch-McArdle": "Katch-McArdle"
      },
      "formats": {
        "summary": "Ihr tägliches Ziel sind {dailyCalories} kcal ({goalLabel}). BMR: {bmr} kcal, TDEE: {tdee} kcal. Makros: {protein}g Protein, {carbs}g Kohlenhydrate, {fat}g Fett ({dietLabel})."
      },
      "infoCards": {
        "energyBreakdown": {
          "title": "⚡ Energie-Aufschlüsselung",
          "items": [
            {
              "label": "BMR",
              "valueKey": "bmr"
            },
            {
              "label": "TDEE (Erhaltung)",
              "valueKey": "tdee"
            },
            {
              "label": "Tägliches Ziel",
              "valueKey": "dailyCalories"
            },
            {
              "label": "Anpassung",
              "valueKey": "adjustment"
            }
          ]
        },
        "macroSplit": {
          "title": "🥗 Makro-Aufteilung",
          "items": [
            {
              "label": "Protein",
              "valueKey": "proteinG"
            },
            {
              "label": "Kohlenhydrate",
              "valueKey": "carbsG"
            },
            {
              "label": "Fett",
              "valueKey": "fatG"
            }
          ]
        },
        "tips": {
          "title": "💡 Schnelle Tipps",
          "items": [
            "Verfolgen Sie Ihre Zufuhr mindestens 2 Wochen bevor Sie anpassen — Beständigkeit schlägt Präzision",
            "Wiegen Sie sich täglich zur gleichen Zeit und verwenden Sie Wochendurchschnitte, nicht tägliche Schwankungen",
            "Gehen Sie niemals unter 1.200 kcal (Frauen) oder 1.500 kcal (Männer) ohne medizinische Betreuung",
            "Wenn das Gewicht 2+ Wochen stagniert, neu berechnen — Ihr TDEE sinkt beim Abnehmen"
          ]
        }
      },
      "referenceData": {
        "activityLevels": {
          "title": "Aktivitätslevel-Multiplikatoren",
          "items": [
            {
              "label": "Sitzend",
              "value": "×1,20 — Bürojob, wenig Sport"
            },
            {
              "label": "Leicht Aktiv",
              "value": "×1,375 — Leichter Sport 1–3 Tage/Woche"
            },
            {
              "label": "Mäßig Aktiv",
              "value": "×1,55 — Mäßiger Sport 3–5 Tage/Woche"
            },
            {
              "label": "Sehr Aktiv",
              "value": "×1,725 — Intensiver Sport 6–7 Tage/Woche"
            },
            {
              "label": "Extrem Aktiv",
              "value": "×1,90 — Athlet oder körperlicher Beruf"
            }
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist ein Kalorienrechner?",
          "content": "Ein Kalorienrechner schätzt die Anzahl der Kalorien, die Ihr Körper täglich benötigt, basierend auf Alter, Geschlecht, Größe, Gewicht und Aktivitätslevel. Er beginnt mit der Berechnung Ihres Grundumsatzes (BMR) — der Energie, die Ihr Körper in völliger Ruhe verbraucht, nur um Herz, Lunge und Organe am Laufen zu halten. Ihr BMR macht typischerweise 60–75% der gesamten täglichen Kalorien aus. Der Rechner multipliziert dann Ihren BMR mit einem Aktivitätsfaktor, um Ihren Gesamten Täglichen Energieverbrauch (TDEE) zu bestimmen, der die Kalorien repräsentiert, die zur Erhaltung Ihres aktuellen Gewichts benötigt werden. Von dort aus können Sie ein Kaloriendefizit zum Abnehmen, einen Überschuss zum Zunehmen oder Erhaltungskalorien zum Gewicht halten erstellen. Das Verständnis Ihres Kalorienbedarfs ist die Grundlage jedes effektiven Ernährungsplans."
        },
        "formulas": {
          "title": "BMR-Formeln verstehen",
          "content": "Dieser Rechner bietet drei wissenschaftlich validierte BMR-Formeln. Die Mifflin-St Jeor Gleichung (1990) gilt als Goldstandard — empfohlen von der American Dietetic Association für ihre Genauigkeit bei 82% der nicht-übergewichtigen Personen. Sie verwendet eine einfache lineare Gleichung basierend auf Gewicht, Größe, Alter und Geschlecht. Die Harris-Benedict Gleichung (ursprünglich 1918, überarbeitet 1984) war jahrzehntelang der Standard, neigt aber dazu, den BMR um etwa 5% zu überschätzen, besonders bei übergewichtigen Personen. Die Katch-McArdle Formel (1991) ist einzigartig, da sie fettfreie Körpermasse statt Gesamtgewicht verwendet, was sie zur genauesten Option für Athleten macht. Da sie das Geschlecht ignoriert, benötigt sie eine genaue Körperfettmessung. Für die meisten Menschen bietet Mifflin-St Jeor die beste Balance aus Genauigkeit und Einfachheit."
        },
        "considerations": {
          "title": "Wichtige Überlegungen",
          "items": [
            {
              "text": "Kalorienrechner liefern Schätzungen, keine exakten Zahlen — der individuelle Stoffwechsel kann um ±10% aufgrund von Genetik, Hormonen und Darmgesundheit variieren",
              "type": "warning"
            },
            {
              "text": "Gehen Sie niemals unter 1.200 kcal/Tag (Frauen) oder 1.500 kcal/Tag (Männer) ohne medizinische Betreuung — extreme Defizite verlangsamen den Stoffwechsel und riskieren Nährstoffmängel",
              "type": "warning"
            },
            {
              "text": "Metabolische Anpassung ist real — Ihr Körper verbrennt weniger Kalorien beim Abnehmen, also neu berechnen alle 5–7 kg Gewichtsverlust",
              "type": "info"
            },
            {
              "text": "Aktivitätslevel ist die größte Fehlerquelle — die meisten Menschen überschätzen ihre Trainingsintensität, also beginnen Sie konservativ",
              "type": "info"
            },
            {
              "text": "Der thermische Effekt der Nahrung (TEF) macht etwa 10% der Gesamtkalorien aus — Protein hat den höchsten TEF mit 20–30%",
              "type": "info"
            },
            {
              "text": "Beständigkeit ist wichtiger als Präzision — ein grobes Kalorienziel täglich befolgt schlägt eine perfekte Zahl sporadisch befolgt",
              "type": "info"
            }
          ]
        },
        "zigzag": {
          "title": "Wie Zick-Zack Kalorien-Cycling funktioniert",
          "items": [
            {
              "text": "Zick-Zack Cycling wechselt zwischen höheren und niedrigeren Kalorientagen bei gleichbleibendem Wochentotal — Ihr Körper bekommt dieselbe Energie, aber metabolische Anpassung wird reduziert",
              "type": "info"
            },
            {
              "text": "Höhere Kalorientage helfen Leptin-Level (Hungerhormon) zu erhalten, machen Diäten nachhaltiger und verhindern das Plateau, das viele nach 4–6 Wochen erreichen",
              "type": "info"
            },
            {
              "text": "Das Muster variiert die tägliche Zufuhr um ±15–20% um Ihr Ziel — zum Beispiel bei 2.000 kcal Ziel reichen Tage von 1.700 bis 2.300 kcal",
              "type": "info"
            },
            {
              "text": "Planen Sie höhere Kalorientage an Trainingstagen und niedrigere an Ruhetagen für optimale Leistung und Erholung",
              "type": "info"
            },
            {
              "text": "Zick-Zagging ist besonders effektiv bei Fettabbau-Plateaus — wenn Ihr Gewicht 2+ Wochen bei konstantem Defizit stagniert hat, versuchen Sie Kaloriencycling",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Beispielberechnungen",
          "description": "Schritt-für-Schritt mit der Mifflin-St Jeor Formel",
          "examples": [
            {
              "title": "Gewichtsverlust — 30-jährige Frau",
              "steps": [
                "Daten: Frau, 30 Jahre, 72,6 kg, 165 cm, mäßig aktiv",
                "BMR = (10 × 72,6) + (6,25 × 165) - (5 × 30) - 161 = 1.408 kcal",
                "TDEE = 1.408 × 1,55 (mäßig) = 2.182 kcal",
                "Mäßiges Defizit (-500 kcal): 2.182 - 500 = 1.682 kcal/Tag",
                "Makros (ausgewogen 30/40/30): 126g Protein, 168g Kohlenhydrate, 56g Fett"
              ],
              "result": "Tägliches Ziel: 1.682 kcal — geschätzter Verlust ~0,5 kg/Woche"
            },
            {
              "title": "Muskelaufbau — 24-jähriger Mann",
              "steps": [
                "Daten: Mann, 24 Jahre, 72,6 kg, 178 cm, mäßig aktiv",
                "BMR = (10 × 72,6) + (6,25 × 178) - (5 × 24) + 5 = 1.724 kcal",
                "TDEE = 1.724 × 1,55 (mäßig) = 2.672 kcal",
                "Mäßiger Überschuss (+500 kcal): 2.672 + 500 = 3.172 kcal/Tag",
                "Makros (proteinreich 40/35/25): 317g Protein, 278g Kohlenhydrate, 88g Fett"
              ],
              "result": "Tägliches Ziel: 3.172 kcal — geschätzte Zunahme ~0,5 kg/Woche"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Welche BMR-Formel sollte ich verwenden?",
          "answer": "Für die meisten Menschen ist die Mifflin-St Jeor Gleichung die beste Wahl — sie ist die genaueste für die Allgemeinbevölkerung und wird von der American Dietetic Association empfohlen. Verwenden Sie Harris-Benedict wenn Sie eine zweite Meinung zum Vergleich möchten. Wählen Sie Katch-McArdle nur wenn Sie Ihren Körperfettanteil genau kennen, da sie fettfreie Körpermasse für eine präzisere Schätzung verwendet, besonders für Athleten."
        },
        {
          "question": "Wie hilft Zick-Zack Kalorien-Cycling beim Abnehmen?",
          "answer": "Zick-Zack Cycling wechselt zwischen höheren und niedrigeren Kalorientagen bei gleichem Wochentotal. Dies verhindert, dass sich Ihr Körper an ein konstantes Kalorienlevel anpasst, was oft Gewichtsverlust-Plateaus nach 4–6 Wochen verursacht. Höhere Kalorientage helfen Leptin (Sättigungshormon) und Schilddrüsenfunktion zu erhalten, wodurch die Diät nachhaltiger wird. Forschung zeigt, dass Kaloriencycling Adhärenz und Langzeitergebnisse im Vergleich zu konstanter Kalorienrestriktion verbessern kann."
        },
        {
          "question": "Was ist die minimale sichere Kalorienzufuhr?",
          "answer": "Gesundheitsbehörden empfehlen generell nicht unter 1.200 Kalorien pro Tag für Frauen oder 1.500 Kalorien pro Tag für Männer ohne medizinische Betreuung zu gehen. Zu niedrig zu gehen riskiert Nährstoffmängel, Muskelverlust, Stoffwechselverlangsamung und hormonelle Störungen. Wenn der Rechner eine Zahl unter diesen Schwellenwerten vorschlägt, erwägen Sie Ihr Defizit zu reduzieren oder Ihr Aktivitätslevel zu erhöhen."
        },
        {
          "question": "Welchen Diätmodus sollte ich wählen?",
          "answer": "Ausgewogen (30/40/30) funktioniert für die meisten Menschen und ist am einfachsten langfristig beizubehalten. Keto (25/5/70) ist effektiv für schnellen Fettabbau, erfordert aber strikte Kohlenhydratrestriktion und kann schwer durchzuhalten sein. Low Carb (35/20/45) ist ein moderater Ansatz, der Kohlenhydrate reduziert ohne volle Keto-Restriktion. Proteinreich (40/35/25) ist ideal für Muskelaufbau oder -erhalt während einer Diät. Leangains (40/40/20) kombiniert hohes Protein mit hohen Kohlenhydraten für leistungsfokussiertes Training."
        },
        {
          "question": "Wie genau sind Kalorienrechner?",
          "answer": "Die Mifflin-St Jeor Formel ist genau innerhalb ±10% für etwa 82% der nicht-übergewichtigen Personen. Die größte Fehlerquelle ist normalerweise die Aktivitätslevel-Schätzung — die meisten Menschen überschätzen wie aktiv sie sind. Verwenden Sie den Rechner als Ausgangspunkt, dann passen Sie basierend auf tatsächlichen Ergebnissen über 2–3 Wochen an. Wenn Sie nicht die erwarteten Gewichtsveränderungen sehen, passen Sie um 100–200 Kalorien an statt drastische Änderungen zu machen."
        },
        {
          "question": "Sollte ich Sportkalorien zurückessen?",
          "answer": "Ihr TDEE beinhaltet bereits Ihr Aktivitätslevel, also sind zusätzliche Sportkalorien teilweise berücksichtigt. Wenn Sie extra Sport über Ihr angegebenes Aktivitätslevel hinaus machen, ist das Zurückessen von etwa 50% dieser Kalorien ein sicherer Ansatz. Fitnesstracker und Geräte neigen dazu, verbrannte Kalorien um 20–40% zu überschätzen, also führt das Zurückessen aller oft zu langsamerem Fortschritt als erwartet."
        },
        {
          "question": "Was ist der Unterschied zwischen BMR und TDEE?",
          "answer": "BMR (Grundumsatz) ist die Anzahl der Kalorien, die Ihr Körper in völliger Ruhe verbrennt — nur um Ihre Organe am Laufen zu halten. TDEE (Gesamter Täglicher Energieverbrauch) ist Ihr BMR multipliziert mit einem Aktivitätsfaktor, repräsentiert die Gesamtkalorien, die Sie an einem Tag verbrennen einschließlich Bewegung und Sport. TDEE ist die Zahl, die Sie verwenden, um Ihr Kalorienziel zu setzen: essen Sie darunter zum Abnehmen, darüber zum Zunehmen, oder dabei zum Halten."
        },
        {
          "question": "Wie schnell sollte ich abnehmen?",
          "answer": "Eine Rate von 0,25–0,5 kg pro Woche (250–500 Kalorien Defizit) wird generell für nachhaltigen Gewichtsverlust empfohlen, der Muskelmasse erhält. Schnellere Raten von 0,7–0,9 kg pro Woche sind möglich, erhöhen aber das Risiko von Muskelverlust, Stoffwechselverlangsamung und Nährstoffmängeln. Menschen mit mehr Gewicht zum Verlieren können anfangs sicher ein größeres Defizit aufrechterhalten, während die näher an ihrem Zielgewicht ein kleineres Defizit verwenden sollten, um Plateaus zu vermeiden und Muskeln zu erhalten."
        }
      ],
      "chart": {
        "title": "Kalorien nach Aktivitätslevel",
        "xLabel": "Aktivitätslevel",
        "yLabel": "Kalorien/Tag",
        "series": {
          "maintenance": "Erhaltung",
          "target": "Ihr Ziel"
        }
      },
      "detailedTable": {
        "zigzagPlan": {
          "button": "📅 7-Tage-Zig-Zag-Plan anzeigen",
          "title": "7-Tage Zig-Zag Kalorienzyklus-Plan",
          "columns": {
            "day": "Tag",
            "calories": "Kalorien",
            "protein": "Protein",
            "carbs": "Kohlenhydrate",
            "fat": "Fett"
          }
        }
      },
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
      id: "mode",
      type: "radio",
      defaultValue: "basic",
      options: [{ value: "basic" }, { value: "advanced" }],
    },
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
    },
        // Imperial
                // Metric
        {
      id: "weight",
      type: "number",
      defaultValue: null,
      placeholder: "180",
      min: 35,
      max: 230,
      step: 0.5,
      unitType: "weight",
      syncGroup: false,
      defaultUnit: "lbs",
      allowedUnits: ["kg", "lbs"],
    },
    {
      id: "height",
      type: "number",
      defaultValue: null,
      placeholder: "170",
      step: 1,
      unitType: "height",
      syncGroup: false,
      defaultUnit: "cm",
      allowedUnits: ["cm", "m", "in", "ft_in"],
    },        // Activity & Goal
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
      id: "goal",
      type: "radio",
      defaultValue: "maintain",
      options: [
        { value: "maintain" },
        { value: "loss" },
        { value: "gain" },
      ],
    },
    {
      id: "lossPace",
      type: "select",
      defaultValue: "moderate",
      options: [
        { value: "mild" },
        { value: "moderate" },
        { value: "aggressive" },
        { value: "extreme" },
      ],
      showWhen: { field: "goal", value: "loss" },
    },
    {
      id: "gainPace",
      type: "select",
      defaultValue: "moderate",
      options: [
        { value: "slow" },
        { value: "moderate" },
        { value: "fast" },
      ],
      showWhen: { field: "goal", value: "gain" },
    },
    // Formula & Diet (Advanced only)
    {
      id: "formula",
      type: "select",
      defaultValue: "mifflin",
      options: [
        { value: "mifflin" },
        { value: "harris" },
        { value: "katch" },
      ],
      showWhen: { field: "mode", value: "advanced" },
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
      showWhen: { field: "formula", value: "katch" },
    },
    {
      id: "dietMode",
      type: "select",
      defaultValue: "balanced",
      options: [
        { value: "balanced" },
        { value: "keto" },
        { value: "lowCarb" },
        { value: "highProtein" },
        { value: "leangains" },
      ],
      showWhen: { field: "mode", value: "advanced" },
    },
    {
      id: "carbLimitG",
      type: "number",
      defaultValue: 25,
      min: 15,
      max: 50,
      step: 5,
      suffix: "g",
      showWhen: { field: "dietMode", value: "keto" },
    },
  ],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════
  results: [
    { id: "dailyCalories", type: "primary", format: "number" },
    { id: "bmr", type: "secondary", format: "number" },
    { id: "tdee", type: "secondary", format: "number" },
    {
      id: "adjustment",
      type: "secondary",
      format: "number",
      showWhen: { field: "goal", value: ["loss", "gain"] },
    },
    {
      id: "weeklyChange",
      type: "secondary",
      format: "text",
      showWhen: { field: "goal", value: ["loss", "gain"] },
    },
    { id: "proteinG", type: "secondary", format: "number" },
    { id: "carbsG", type: "secondary", format: "number" },
    { id: "fatG", type: "secondary", format: "number" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // CHART — Calories by Activity Level
  // ═══════════════════════════════════════════════════════════════
  chart: {
    id: "activityComparison",
    type: "bar",
    xKey: "activity",
    series: [
      { key: "maintenance", type: "bar", color: "#94a3b8" },
      { key: "target", type: "bar", color: "#f97316" },
    ],
    height: 300,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "number",
  },

  // ═══════════════════════════════════════════════════════════════
  // DETAILED TABLE — 7-Day Zig-Zag Plan
  // ═══════════════════════════════════════════════════════════════
  detailedTable: {
    id: "zigzagPlan",
    buttonLabel: "📅 View 7-Day Zig-Zag Plan",
    buttonIcon: "📅",
    modalTitle: "7-Day Zig-Zag Calorie Cycling Plan",
    columns: [
      { id: "day", label: "Day", align: "left" },
      { id: "calories", label: "Calories", align: "center", highlight: true },
      { id: "protein", label: "Protein", align: "center" },
      { id: "carbs", label: "Carbs", align: "center" },
      { id: "fat", label: "Fat", align: "center" },
    ],
    exportEnabled: true,
  },

  // ═══════════════════════════════════════════════════════════════
  // INFO CARDS (2 list + 1 horizontal)
  // ═══════════════════════════════════════════════════════════════
  infoCards: [
    {
      id: "energyBreakdown",
      type: "list",
      icon: "⚡",
      items: [
        { valueKey: "bmr" },
        { valueKey: "tdee" },
        { valueKey: "dailyCalories" },
        { valueKey: "adjustment" },
      ],
    },
    {
      id: "macroSplit",
      type: "list",
      icon: "🥗",
      items: [
        { valueKey: "proteinG" },
        { valueKey: "carbsG" },
        { valueKey: "fatG" },
      ],
    },
    {
      id: "tips",
      type: "horizontal",
      icon: "💡",
      items: [{}, {}, {}, {}],
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // REFERENCE DATA
  // ═══════════════════════════════════════════════════════════════
  referenceData: [{ id: "activityLevels", icon: "📋", columns: 2 }],

  // ═══════════════════════════════════════════════════════════════
  // EDUCATION (2 prose + 2 list + 1 code-example)
  // ═══════════════════════════════════════════════════════════════
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "formulas", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "⚠️" },
    { id: "zigzag", type: "list", icon: "📊" },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2 },
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
  ],

  // ═══════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════
  references: [
    {
      authors:
        "Mifflin MD, St Jeor ST, Hill LA, Scott BJ, Daugherty SA, Koh YO",
      year: "1990",
      title:
        "A new predictive equation for resting energy expenditure in healthy individuals",
      source: "American Journal of Clinical Nutrition, 51(2), 241–247",
      url: "https://pubmed.ncbi.nlm.nih.gov/2305711/",
    },
    {
      authors: "Roza AM, Shizgal HM",
      year: "1984",
      title:
        "The Harris Benedict equation reevaluated: resting energy requirements and the body cell mass",
      source: "American Journal of Clinical Nutrition, 40(1), 168–182",
      url: "https://pubmed.ncbi.nlm.nih.gov/6741850/",
    },
    {
      authors: "Frankenfield D, Roth-Yousey L, Compher C",
      year: "2005",
      title:
        "Comparison of predictive equations for resting metabolic rate in healthy nonobese and obese adults",
      source:
        "Journal of the American Dietetic Association, 105(5), 775–789",
      url: "https://pubmed.ncbi.nlm.nih.gov/15883556/",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MISC CONFIG
  // ═══════════════════════════════════════════════════════════════
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
    exportCSV: true,
    shareResults: true,
    saveHistory: true,
    presetsEnabled: true,
  },
  relatedCalculators: [
    "tdee-calculator",
    "caloric-deficit-calculator",
    "maintenance-calories-calculator",
    "macro-calculator",
    "weight-loss-calculator",
    "weight-gain-calculator",
  ],
  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
  },
};

// ═══════════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════════
export function calculateCalorie(data: {
  values: Record<string, unknown>;
  units?: Record<string, string>;
  unitSystem?: "metric" | "imperial";
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;

  // ── Translations ────────────────────────────────────────────
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read inputs ─────────────────────────────────────────────
  const gender = (values.gender as string) || "male";
  const age = values.age as number;
  const activityLevel = (values.activityLevel as string) || "moderate";
  const goal = (values.goal as string) || "maintain";
  const lossPace = (values.lossPace as string) || "moderate";
  const gainPace = (values.gainPace as string) || "moderate";
  const formula = (values.formula as string) || "mifflin";
  const bodyFatPercent = values.bodyFatPercent as number | null;
  const dietMode = (values.dietMode as string) || "balanced";
  const carbLimitG = (values.carbLimitG as number) || 25;

  // ── Convert to metric using Unit Engine ────────────────────
  const weightKg = values.weight
    ? convertToBase(values.weight as number, fieldUnits.weight || "lbs", "weight")
    : null;

  const heightCm = values.height
    ? convertToBase(values.height as number, fieldUnits.height || "cm", "height")
    : null;

  if (!weightKg || !heightCm || !age) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const weightLbs = weightKg * 2.20462;

  // ── BMR calculation ─────────────────────────────────────────
  let bmr: number;

  if (formula === "katch" && bodyFatPercent && bodyFatPercent > 0) {
    const leanMassKg = weightKg * (1 - bodyFatPercent / 100);
    bmr = 370 + 21.6 * leanMassKg;
  } else if (formula === "harris") {
    bmr =
      gender === "male"
        ? 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age
        : 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age;
  } else {
    // Mifflin-St Jeor (default / fallback when katch missing bf%)
    bmr =
      gender === "male"
        ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
        : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }

  // ── TDEE ────────────────────────────────────────────────────
  const activityFactor = ACTIVITY_MULTIPLIERS[activityLevel] || 1.55;
  const tdee = bmr * activityFactor;

  // ── Goal calories ───────────────────────────────────────────
  let adjustment = 0;
  if (goal === "loss") {
    adjustment = -(DEFICIT_MAP[lossPace] || 500);
  } else if (goal === "gain") {
    adjustment = SURPLUS_MAP[gainPace] || 500;
  }

  let dailyCalories = Math.round(tdee + adjustment);

  // Safety floor
  const minCal = gender === "female" ? 1200 : 1500;
  if (dailyCalories < minCal && goal === "loss") {
    dailyCalories = minCal;
    adjustment = dailyCalories - Math.round(tdee);
  }

  // ── Macros ──────────────────────────────────────────────────
  let proteinG: number;
  let carbsG: number;
  let fatG: number;

  if (dietMode === "keto") {
    carbsG = carbLimitG;
    proteinG = Math.round(weightLbs * 0.8);
    const remainingCal = dailyCalories - carbsG * 4 - proteinG * 4;
    fatG = Math.max(Math.round(remainingCal / 9), 0);
  } else {
    const ratio = MACRO_RATIOS[dietMode] || MACRO_RATIOS.balanced;
    proteinG = Math.round((dailyCalories * ratio.p) / 4);
    carbsG = Math.round((dailyCalories * ratio.c) / 4);
    fatG = Math.round((dailyCalories * ratio.f) / 9);
  }

  // ── Weekly change ───────────────────────────────────────────
  const weeklyChangeLbs = (adjustment * 7) / 3500;
  const weeklyChangeKg = weeklyChangeLbs * 0.453592;

  // ── Translated labels ───────────────────────────────────────
  const calUnit = v["cal"] || "cal";
  const gUnit = v["g"] || "g";
  const lbLabel = v["lb"] || "lb";
  const kgLabel = v["kg"] || "kg";
  const weekLabel = v["week"] || "week";

  const goalLabels: Record<string, string> = {
    maintain: v["Maintain"] || "Maintain",
    loss: v["Loss"] || "Loss",
    gain: v["Gain"] || "Gain",
  };
  const goalLabel = goalLabels[goal] || goal;

  const dietLabels: Record<string, string> = {
    balanced: v["Balanced"] || "Balanced",
    keto: v["Keto"] || "Keto",
    lowCarb: v["Low Carb"] || "Low Carb",
    highProtein: v["High Protein"] || "High Protein",
    leangains: v["Leangains"] || "Leangains",
  };
  const dietLabel = dietLabels[dietMode] || dietMode;

  // ── Format adjustment ───────────────────────────────────────
  const adjustmentFormatted =
    adjustment === 0
      ? `0 ${calUnit}`
      : adjustment > 0
        ? `+${adjustment.toLocaleString()} ${calUnit}`
        : `${adjustment.toLocaleString()} ${calUnit}`;

  // ── Format weekly change ────────────────────────────────────
  const wUnit = fieldUnits.weight || "lbs";
  let weeklyChangeFormatted = "";
  if (goal !== "maintain") {
    if (wUnit === "kg") {
      const val = weeklyChangeKg.toFixed(2);
      weeklyChangeFormatted =
        weeklyChangeKg >= 0
          ? `+${val} ${kgLabel}/${weekLabel}`
          : `${val} ${kgLabel}/${weekLabel}`;
    } else {
      const val = weeklyChangeLbs.toFixed(2);
      weeklyChangeFormatted =
        weeklyChangeLbs >= 0
          ? `+${val} ${lbLabel}/${weekLabel}`
          : `${val} ${lbLabel}/${weekLabel}`;
    }
  }

  // ── Summary ─────────────────────────────────────────────────
  const summaryTemplate =
    f.summary ||
    "Your daily target is {dailyCalories} cal ({goalLabel}). BMR: {bmr} cal, TDEE: {tdee} cal. Macros: {protein}g protein, {carbs}g carbs, {fat}g fat ({dietLabel}).";

  const summary = summaryTemplate
    .replace("{dailyCalories}", dailyCalories.toLocaleString())
    .replace("{goalLabel}", goalLabel)
    .replace("{bmr}", Math.round(bmr).toLocaleString())
    .replace("{tdee}", Math.round(tdee).toLocaleString())
    .replace("{protein}", String(proteinG))
    .replace("{carbs}", String(carbsG))
    .replace("{fat}", String(fatG))
    .replace("{dietLabel}", dietLabel);

  // ═══════════════════════════════════════════════════════════════
  // ZIG-ZAG TABLE DATA (7 days + average row)
  // ═══════════════════════════════════════════════════════════════
  const tableData: Record<string, string>[] = [];
  let totalZZCal = 0;
  let totalZZP = 0;
  let totalZZC = 0;
  let totalZZF = 0;

  for (let i = 0; i < 7; i++) {
    const dayCal = Math.round(dailyCalories * ZIGZAG_PATTERN[i]);
    let dayP: number;
    let dayC: number;
    let dayF: number;

    if (dietMode === "keto") {
      dayC = carbLimitG;
      dayP = proteinG;
      dayF = Math.max(Math.round((dayCal - dayC * 4 - dayP * 4) / 9), 0);
    } else {
      const ratio = MACRO_RATIOS[dietMode] || MACRO_RATIOS.balanced;
      dayP = Math.round((dayCal * ratio.p) / 4);
      dayC = Math.round((dayCal * ratio.c) / 4);
      dayF = Math.round((dayCal * ratio.f) / 9);
    }

    totalZZCal += dayCal;
    totalZZP += dayP;
    totalZZC += dayC;
    totalZZF += dayF;

    const dayName = v[DAY_KEYS[i]] || DAY_KEYS[i];
    tableData.push({
      day: dayName,
      calories: dayCal.toLocaleString(),
      protein: `${dayP}${gUnit}`,
      carbs: `${dayC}${gUnit}`,
      fat: `${dayF}${gUnit}`,
    });
  }

  // Average row (last row auto-highlights in DetailedTable)
  const avgLabel = v["Average"] || "Average";
  tableData.push({
    day: `📊 ${avgLabel}`,
    calories: Math.round(totalZZCal / 7).toLocaleString(),
    protein: `${Math.round(totalZZP / 7)}${gUnit}`,
    carbs: `${Math.round(totalZZC / 7)}${gUnit}`,
    fat: `${Math.round(totalZZF / 7)}${gUnit}`,
  });

  // ═══════════════════════════════════════════════════════════════
  // CHART DATA — Calories by Activity Level
  // ═══════════════════════════════════════════════════════════════
  const activityLabels: Record<string, string> = {
    sedentary: v["Sedentary"] || "Sedentary",
    light: v["Light"] || "Light",
    moderate: v["Moderate"] || "Moderate",
    active: v["Active"] || "Active",
    veryActive: v["Very Active"] || "Very Active",
  };

  const chartData = Object.entries(ACTIVITY_MULTIPLIERS).map(
    ([key, factor]) => {
      const maint = Math.round(bmr * factor);
      let target = maint;
      if (goal === "loss") {
        target = Math.max(maint + adjustment, minCal);
      } else if (goal === "gain") {
        target = maint + adjustment;
      }
      return {
        activity: activityLabels[key] || key,
        maintenance: maint,
        target,
      };
    }
  );

  // ═══════════════════════════════════════════════════════════════
  // DISTRIBUTION BARS — Macro percentages
  // ═══════════════════════════════════════════════════════════════
  const totalMacroCal = proteinG * 4 + carbsG * 4 + fatG * 9;
  const proteinPct =
    totalMacroCal > 0
      ? Math.round(((proteinG * 4) / totalMacroCal) * 100)
      : 0;
  const carbsPct =
    totalMacroCal > 0
      ? Math.round(((carbsG * 4) / totalMacroCal) * 100)
      : 0;
  const fatPct =
    totalMacroCal > 0 ? Math.round(((fatG * 9) / totalMacroCal) * 100) : 0;

  const proteinLabel = v["Protein"] || "Protein";
  const carbsLabel = v["Carbs"] || "Carbs";
  const fatLabel = v["Fat"] || "Fat";

  // ═══════════════════════════════════════════════════════════════
  // RETURN
  // ═══════════════════════════════════════════════════════════════
  return {
    values: {
      dailyCalories,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      adjustment,
      weeklyChange: weeklyChangeLbs,
      proteinG,
      carbsG,
      fatG,
      proteinPct,
      carbsPct,
      fatPct,
    },
    formatted: {
      dailyCalories: `${dailyCalories.toLocaleString()} ${calUnit}`,
      bmr: `${Math.round(bmr).toLocaleString()} ${calUnit}`,
      tdee: `${Math.round(tdee).toLocaleString()} ${calUnit}`,
      adjustment: adjustmentFormatted,
      weeklyChange: weeklyChangeFormatted,
      proteinG: `${proteinG}${gUnit} (${proteinPct}%)`,
      carbsG: `${carbsG}${gUnit} (${carbsPct}%)`,
      fatG: `${fatG}${gUnit} (${fatPct}%)`,
    },
    summary,
    isValid: true,
    metadata: {
      tableData,
      chartData,
      distribution: [
        {
          id: "protein",
          label: `${proteinLabel} (${proteinPct}%)`,
          value: proteinPct,
          max: 100,
        },
        {
          id: "carbs",
          label: `${carbsLabel} (${carbsPct}%)`,
          value: carbsPct,
          max: 100,
        },
        {
          id: "fat",
          label: `${fatLabel} (${fatPct}%)`,
          value: fatPct,
          max: 100,
        },
      ],
    },
  };
}

export default calorieCalculatorConfig;
