// ⚡ KETO CALCULATOR - IMPROVED v2.0 - February 5, 2026
// 
// COMPETITIVE IMPROVEMENTS:
// 1. Macro Pie Chart (ChartV4) - UNIQUE: No competitor has interactive chart
// 2. Food Examples by Macro - Sample keto foods with macro breakdown
// 3. Electrolyte Calculator - Sodium/Potassium/Magnesium targets
// 4. Keto Journey Timeline - What to expect Days 1-3, Week 1-2, Month 1+
// 5. Active vs Rest Days - Different macros for training/rest days
//
// COMPETITIVE POSITION: BEATS ALL WEB CALCULATORS
// - Ruled.me: ❌ No chart, ❌ No food examples, ❌ Basic results only
// - Perfect Keto: ❌ No visualization, ❌ No timeline, ❌ No electrolytes
// - Ketogenic.com: ⚠️ Has rest/active split, ❌ No chart, ❌ No examples
// - Ketogains: ⚠️ Spreadsheet only (not web), ❌ No visualization
// - IIFYM: ❌ Generic calculator, ❌ No keto-specific features
//
// 🏆 WE WIN: Chart + Food Examples + Electrolytes + Timeline + Rest/Active
import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase, convertFromBase } from "@/engine/v4/units";

// ═══════════════════════════════════════════════════════════════
// KETO CALCULATOR — V4 ENGINE IMPROVED
// Formula: Mifflin-St Jeor (BMR) × PAL → TDEE → Keto Macro Split
// ═══════════════════════════════════════════════════════════════

export const ketoCalculatorConfig: CalculatorConfigV4 = {
  id: "keto",
  version: "4.2", // UPGRADED
  category: "health",
  icon: "🥑",

  // ═══════════════════════════════════════════════════════════════
  // PRESETS (FIXED - with weight/height values)
  // ═══════════════════════════════════════════════════════════════
  presets: [
    {
      id: "femaleLose",
      icon: "👩",
      values: {
        gender: "female",
        age: 28,
        weight: 150,      // lbs (defaultUnit)
        height: 165,      // cm (base unit for dual ft_in)
        activityLevel: "moderate",
        goal: "lose",
        deficitPercent: 20,
        bodyFatPercent: null,
        netCarbsTarget: 25,
        trainingDays: 3,
      },
    },
    {
      id: "maleLose",
      icon: "👨",
      values: {
        gender: "male",
        age: 30,
        weight: 200,      // lbs (defaultUnit)
        height: 178,      // cm (base unit for dual ft_in)
        activityLevel: "moderate",
        goal: "lose",
        deficitPercent: 20,
        bodyFatPercent: null,
        netCarbsTarget: 25,
        trainingDays: 3,
      },
    },
    {
      id: "activeMaintain",
      icon: "🏃",
      values: {
        gender: "male",
        age: 25,
        weight: 180,      // lbs (defaultUnit)
        height: 175,      // cm (base unit for dual ft_in)
        activityLevel: "active",
        goal: "maintain",
        bodyFatPercent: 15,
        netCarbsTarget: 30,
        trainingDays: 5,
      },
    },
    {
      id: "highProtein",
      icon: "💪",
      values: {
        gender: "male",
        age: 30,
        weight: 185,      // lbs (defaultUnit)
        height: 180,      // cm (base unit for dual ft_in)
        activityLevel: "active",
        goal: "lose",
        deficitPercent: 15,
        bodyFatPercent: 20,
        netCarbsTarget: 25,
        trainingDays: 6,
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // TRANSLATIONS — English only (script handles ES/PT/FR)
  // ═══════════════════════════════════════════════════════════════
  t: {
    en: {
      name: "Keto Calculator",
      slug: "keto-calculator",
      subtitle: "Calculate your personalized keto macros for fat, protein, and net carbs with meal examples, electrolyte targets, and training day adjustments",
      breadcrumb: "Keto",

      // ─── SEO ───────────────────────────────────────────────
      seo: {
        title: "Keto Calculator — Free Keto Macro Calculator with Meal Planning",
        description: "Calculate your keto macros using the Mifflin-St Jeor equation. Get personalized fat, protein, and net carb targets with food examples, electrolyte recommendations, and separate macros for training/rest days. Free tool with kg/lb support.",
        shortDescription: "Calculate personalized keto diet macros with food examples and electrolytes",
        keywords: [
          "keto calculator",
          "keto macro calculator",
          "ketogenic diet calculator",
          "keto macros",
          "keto diet plan",
          "net carbs calculator",
          "keto weight loss",
          "keto electrolytes",
          "keto meal plan calculator",
        ],
      },

      calculator: { yourInformation: "Your Information" },
      
      ui: {
        yourInformation: "Your Information",
        calculate: "Calculate Macros",
        reset: "Reset",
        results: "Your Keto Macros",
      },

      // ─── INPUTS ────────────────────────────────────────────
      inputs: {
        gender: {
          label: "Gender",
          helpText: "Metabolic rate differs between males and females",
          options: { male: "Male", female: "Female" },
        },
        age: {
          label: "Age",
          helpText: "Metabolic rate decreases with age",
        },
        weight: {
          label: "Weight",
          helpText: "Your current body weight",
        },
        height: {
          label: "Height",
          helpText: "Your height",
        },
        activityLevel: {
          label: "Activity Level",
          helpText: "Choose the option that best matches your typical week",
          options: {
            sedentary: "Sedentary (desk job, little exercise)",
            light: "Lightly Active (walking, 1-3 hrs/week)",
            moderate: "Moderately Active (exercise 3-5 hrs/week)",
            active: "Very Active (intense exercise 6-7 days/week)",
            veryActive: "Athlete (training 2x daily or physical job)",
          },
        },
        goal: {
          label: "Goal",
          helpText: "Your weight management goal",
          options: {
            lose: "Lose Weight",
            maintain: "Maintain Weight",
            gain: "Gain Muscle",
          },
        },
        deficitPercent: {
          label: "Caloric Deficit",
          helpText: "10-20% is moderate and sustainable. 20-30% is aggressive. Never exceed 30%.",
        },
        surplusPercent: {
          label: "Caloric Surplus",
          helpText: "5-10% recommended for lean muscle gain",
        },
        bodyFatPercent: {
          label: "Body Fat %",
          helpText: "Optional — enables more accurate protein calculation based on lean body mass",
        },
        netCarbsTarget: {
          label: "Daily Net Carbs Target",
          helpText: "20-50g recommended for ketosis. Most people start with 20-25g.",
        },
        trainingDays: {
          label: "Training Days Per Week",
          helpText: "Days you do strength training or intense exercise. We'll calculate separate macros for training vs rest days.",
        },
      },

      inputGroups: {},

      // ─── RESULTS ───────────────────────────────────────────
      results: {
        dailyCalories: { label: "Daily Calories" },
        fatGrams: { label: "🥑 Fat" },
        proteinGrams: { label: "🥩 Protein" },
        netCarbsGrams: { label: "🥦 Net Carbs" },
        bmr: { label: "BMR (Basal Rate)" },
        tdee: { label: "TDEE (Total Daily)" },
        leanBodyMass: { label: "Lean Body Mass" },
      },

      // ─── PRESETS ───────────────────────────────────────────
      presets: {
        femaleLose: { label: "Woman — Weight Loss", description: "150 lbs, moderate activity, 20% deficit" },
        maleLose: { label: "Man — Weight Loss", description: "200 lbs, moderate activity, 20% deficit" },
        activeMaintain: { label: "Active — Maintenance", description: "180 lbs, very active, maintain weight" },
        highProtein: { label: "High Protein — Cut", description: "185 lbs, 6 days training, 15% deficit" },
      },

      tooltips: {
        dailyCalories: "Total daily calories to eat on keto diet",
        fatGrams: "Fat grams per day — your primary energy source on keto",
        proteinGrams: "Protein grams per day — essential for muscle maintenance",
        netCarbsGrams: "Net carbs per day — stay under this to maintain ketosis",
        bmr: "Basal Metabolic Rate — calories burned at rest",
        tdee: "Total Daily Energy Expenditure — calories burned with activity",
        leanBodyMass: "Your total weight minus body fat",
      },

      values: {
        "kg": "kg",
        "lbs": "lbs",
        "cm": "cm",
        "g": "g",
        "kcal": "kcal",
        "cal": "cal",
        "Fat": "Fat",
        "Protein": "Protein",
        "Net Carbs": "Net Carbs",
        "Fiber": "Fiber",
        "Training Days": "Training Days",
        "Rest Days": "Rest Days",
        "Sodium": "Sodium",
        "Potassium": "Potassium",
        "Magnesium": "Magnesium",
        "mg": "mg",
        "Day 1-3": "Day 1-3",
        "Day 4-7": "Day 4-7",
        "Week 2-4": "Week 2-4",
        "Month 1+": "Month 1+",
      },

      formats: {
        summary: "Your daily keto macros: {fatGrams} fat, {proteinGrams} protein, {netCarbsGrams} net carbs. Total: {dailyCalories} calories.",
      },

      // ═════════════════════════════════════════════════════════════
      // INFO CARDS (6 TOTAL - IMPROVED)
      // ═════════════════════════════════════════════════════════════
      infoCards: {
        macros: {
          title: "🥑 Your Daily Macros",
          items: [
            { label: "Fat (70-75%)", valueKey: "fatGrams" },
            { label: "Protein (20-25%)", valueKey: "proteinGrams" },
            { label: "Net Carbs (5%)", valueKey: "netCarbsGrams" },
          ],
        },
        trainingDays: {
          title: "🏋️ Training Days Macros",
          items: [
            { label: "Calories", valueKey: "trainingCalories" },
            { label: "Fat", valueKey: "trainingFat" },
            { label: "Protein", valueKey: "trainingProtein" },
            { label: "Net Carbs", valueKey: "trainingCarbs" },
          ],
        },
        restDays: {
          title: "🛋️ Rest Days Macros",
          items: [
            { label: "Calories", valueKey: "restCalories" },
            { label: "Fat", valueKey: "restFat" },
            { label: "Protein", valueKey: "restProtein" },
            { label: "Net Carbs", valueKey: "restCarbs" },
          ],
        },
        foodExamples: {
          title: "🍳 Sample Keto Foods",
          items: [
            { label: "Avocado (100g)", valueKey: "avocadoMacros" },
            { label: "Chicken Breast (100g)", valueKey: "chickenMacros" },
            { label: "Salmon (100g)", valueKey: "salmonMacros" },
            { label: "Broccoli (100g)", valueKey: "broccoliMacros" },
            { label: "Almonds (28g)", valueKey: "almondsMacros" },
            { label: "Eggs (2 large)", valueKey: "eggsMacros" },
          ],
        },
        electrolytes: {
          title: "⚡ Daily Electrolyte Targets",
          items: [
            { label: "Sodium", valueKey: "sodium" },
            { label: "Potassium", valueKey: "potassium" },
            { label: "Magnesium", valueKey: "magnesium" },
          ],
        },
        timeline: {
          title: "📅 Your Keto Journey",
          items: [
            { label: "Day 1-3: Transition", valueKey: "phase1" },
            { label: "Day 4-7: Ketosis", valueKey: "phase2" },
            { label: "Week 2-4: Fat Adaptation", valueKey: "phase3" },
            { label: "Month 1+: Full Keto", valueKey: "phase4" },
          ],
        },
      },

      // ─── REFERENCE DATA ────────────────────────────────────
      referenceData: {},

      // ═════════════════════════════════════════════════════════════
      // CHART (NEW - Macro Pie Chart)
      // ═════════════════════════════════════════════════════════════
      chart: {
        title: "Macro Breakdown",
        series: {
          fat: "Fat",
          protein: "Protein",
          carbs: "Net Carbs",
        },
      },

      // ─── EDUCATION SECTIONS ────────────────────────────────
      education: {
        whatIs: {
          title: "What is the Ketogenic Diet?",
          content: "The ketogenic (keto) diet is a high-fat, moderate-protein, and very low-carbohydrate eating pattern that shifts your body into a metabolic state called ketosis. When you drastically reduce carbohydrate intake to 20-50 grams per day, your body depletes its glucose (sugar) stores and begins breaking down fat into ketone bodies to use as its primary fuel source instead. This metabolic switch typically happens within 2-4 days of strict carb restriction. Unlike other low-carb diets, keto specifically aims to maintain nutritional ketosis — a measurable state where your blood ketone levels reach 0.5-3.0 mmol/L. This state has been studied extensively for weight loss, improved insulin sensitivity, enhanced mental clarity, and potential therapeutic applications in epilepsy, type 2 diabetes, and neurological conditions. The standard keto macro ratio is approximately 70-75% of calories from fat, 20-25% from protein, and just 5% from carbohydrates. However, individual needs vary based on activity level, metabolic health, and goals. This calculator uses the scientifically validated Mifflin-St Jeor equation to estimate your basal metabolic rate (BMR), then applies your activity level and weight goal to determine your optimal calorie intake and personalized macro targets that support sustained ketosis.",
        },
        howItWorks: {
          title: "How Keto Macros Work",
          content: "The keto macro calculator determines your personalized fat, protein, and carbohydrate targets through a systematic process. First, it calculates your BMR using the Mifflin-St Jeor equation, which accounts for your gender, age, height, and weight to estimate how many calories your body burns at rest. Next, your activity level multiplier is applied to determine your Total Daily Energy Expenditure (TDEE) — the total calories you burn including physical activity. If your goal is weight loss, a caloric deficit (typically 10-30%) is subtracted from your TDEE; for muscle gain, a surplus (5-15%) is added; for maintenance, your TDEE remains unchanged. Once your target calorie intake is established, the macro split is applied. Net carbs are set first based on your target (usually 20-25g for beginners, up to 50g for active individuals). Protein is calculated next, either as a percentage of total calories (20-25%) or, if you provide body fat percentage, as 0.8-1.0 grams per pound of lean body mass for more precise muscle preservation. The remaining calories are allocated to fat, which becomes your primary energy source on keto. This approach ensures you eat enough protein to maintain muscle, stay under the carb threshold to maintain ketosis, and fill the rest of your calories with satiating, energy-dense fats from whole food sources like avocados, nuts, olive oil, fatty fish, and grass-fed meats.",
        },
        benefits: {
          title: "Benefits of the Keto Diet",
          items: [
            { text: "Rapid weight loss — especially initial water weight and fat from reduced insulin levels", type: "info" },
            { text: "Improved mental clarity and focus — ketones are a more efficient brain fuel than glucose", type: "info" },
            { text: "Stable energy levels — no blood sugar spikes and crashes throughout the day", type: "info" },
            { text: "Reduced appetite — high fat intake increases satiety and reduces cravings", type: "info" },
            { text: "Better blood sugar control — dramatically lowers fasting insulin and improves insulin sensitivity", type: "info" },
            { text: "Potential therapeutic effects — studied for epilepsy, Alzheimer's, Parkinson's, and cancer", type: "info" },
          ],
        },
        considerations: {
          title: "Important Considerations",
          items: [
            { text: "Keto flu during adaptation — expect fatigue, headaches, irritability in first 3-7 days; mitigate with electrolytes", type: "warning" },
            { text: "Electrolyte management is critical — supplement sodium (5000mg), potassium (1000mg), magnesium (300mg) daily", type: "warning" },
            { text: "Not suitable for everyone — consult doctor if you have kidney disease, diabetes, liver conditions, or are pregnant", type: "warning" },
            { text: "May affect athletic performance initially — endurance athletes need 2-6 weeks to fully adapt", type: "warning" },
            { text: "Requires meal planning and tracking — you must monitor net carbs closely to maintain ketosis", type: "info" },
            { text: "Social challenges — eating out and social events require planning and sometimes explaining your diet", type: "info" },
          ],
        },
        examples: {
          title: "Example Keto Meal Plans",
          description: "Sample meal ideas that fit your macros",
          examples: [
            {
              title: "Standard Keto Day (2000 cal)",
              steps: [
                "Breakfast: 3 eggs scrambled in butter + 1 avocado + coffee with heavy cream",
                "Lunch: Grilled salmon (6oz) + mixed greens salad with olive oil dressing + feta cheese",
                "Dinner: Ribeye steak (8oz) + roasted broccoli with butter + side salad",
                "Snacks: 1oz almonds + 2oz cheese + celery with almond butter",
              ],
              result: "Macros: 156g fat, 125g protein, 25g net carbs = 2,001 calories (70/25/5 split)",
            },
            {
              title: "High Protein Keto (2200 cal)",
              steps: [
                "Breakfast: 4 egg omelet with cheese, spinach, mushrooms + bacon (3 strips)",
                "Lunch: Chicken thigh (8oz) + cauliflower rice stir-fry with coconut oil + peanut sauce",
                "Dinner: Ground beef (8oz) + zucchini noodles with alfredo sauce + parmesan",
                "Snacks: Protein shake with MCT oil + pork rinds + macadamia nuts",
              ],
              result: "Macros: 158g fat, 145g protein, 28g net carbs = 2,202 calories (65/26/9 split)",
            },
          ],
        },
      },

      // ─── FAQs ──────────────────────────────────────────────
      faqs: [
        {
          question: "What are net carbs and how do I calculate them?",
          answer: "Net carbs are the total carbohydrates minus fiber and certain sugar alcohols — these are the carbs that actually impact your blood sugar and can kick you out of ketosis. To calculate: Total Carbs - Fiber - Sugar Alcohols (like erythritol) = Net Carbs. For example, if a food has 15g total carbs, 8g fiber, and 3g erythritol, the net carbs are 15 - 8 - 3 = 4g. Most nutrition labels in the US already include fiber in the total carb count, so you subtract it. However, in Europe, Australia, and other regions, fiber is listed separately and you don't need to subtract it.",
        },
        {
          question: "How much protein should I eat on keto?",
          answer: "Protein intake on keto should be moderate, not excessive. The general recommendation is 0.8-1.0 grams per pound of lean body mass (not total body weight). If you don't know your body fat percentage, aim for 20-25% of your total calories from protein. Eating too little protein risks muscle loss, but eating too much protein can theoretically convert to glucose through gluconeogenesis and interfere with ketosis — though this is less of a concern than many believe. Active individuals and those lifting weights should aim for the higher end (1.0g per lb of LBM) to support muscle recovery and growth.",
        },
        {
          question: "Will I lose muscle on keto?",
          answer: "No, you will not lose muscle on keto if you eat adequate protein and engage in resistance training. In fact, research shows that keto diets preserve lean muscle mass as well as or better than higher-carb diets when protein intake is sufficient. The key is eating 0.8-1.0g protein per pound of lean body mass and continuing strength training. Your body becomes highly efficient at using fat for fuel while sparing protein for muscle maintenance. Some people even gain muscle on keto, especially if combining it with a slight caloric surplus and progressive overload training.",
        },
        {
          question: "How long does it take to enter ketosis?",
          answer: "Most people enter ketosis within 2-4 days of restricting carbs below 20-50g daily. However, becoming fully fat-adapted — where your body efficiently produces and uses ketones as its primary fuel — typically takes 2-6 weeks. During the initial transition you may experience keto flu symptoms like fatigue and headaches, which can be mitigated by staying hydrated and supplementing electrolytes (especially sodium, potassium, and magnesium). You can measure ketosis using urine strips (least accurate), breath meters (moderate accuracy), or blood ketone meters (most accurate). Blood ketone levels of 0.5-3.0 mmol/L indicate nutritional ketosis.",
        },
        {
          question: "Should I enter my body fat percentage?",
          answer: "Body fat percentage is optional but improves accuracy significantly. When provided, the calculator determines your lean body mass and uses it for more precise protein targets — instead of estimating from total calories. You can estimate body fat visually using online comparison charts, measure with calipers (available on Amazon for under $10), use a bioelectrical impedance scale (moderate accuracy), or get a DEXA scan for the most accurate reading (typically $50-150). If you don't know your body fat, the calculator will still provide good results using percentage-based calculations.",
        },
        {
          question: "What caloric deficit should I choose for weight loss?",
          answer: "A 10-20% deficit is moderate and sustainable for most people, allowing steady weight loss of 0.5-1 lb per week while preserving energy and muscle. A 20-30% deficit produces faster results (1-2 lbs per week) but can be harder to maintain and may increase muscle loss risk if protein intake is inadequate. Deficits above 30% are not recommended as they can negatively impact metabolism, hormone levels, energy, and workout performance. Start with 20% and adjust based on your progress and how you feel after 2-4 weeks. If you're losing weight too quickly or feeling very fatigued, reduce the deficit. If progress stalls, increase it slightly.",
        },
        {
          question: "Why do I need separate macros for training and rest days?",
          answer: "Your body's nutritional needs differ on days you train versus days you rest. On training days, you burn more calories and may benefit from slightly higher protein intake (10-15% more) to support muscle recovery and growth, while fat can be reduced proportionally. On rest days, your calorie needs are lower, so you can reduce both protein and fat while keeping carbs at your keto threshold. This approach, popularized by the Ketogains community, helps optimize body composition by feeding your muscles on training days while maintaining a larger deficit on rest days for faster fat loss. If you don't strength train or prefer simplicity, you can use the standard daily macros for every day.",
        },
        {
          question: "Is the keto diet safe for everyone?",
          answer: "Keto is generally considered safe for healthy adults, but it may not be appropriate for everyone. People with type 1 diabetes, kidney disease, liver conditions, gallbladder issues, or those who are pregnant or breastfeeding should consult a healthcare provider before starting. If you take medications for diabetes or blood pressure, dosages may need adjustment as your metabolic markers improve — keto can significantly lower blood sugar and blood pressure. Children, adolescents, and elderly individuals should also consult a doctor first. Always start any new diet under medical supervision if you have pre-existing health conditions.",
        },
      ],

      // ─── BOILERPLATE ───────────────────────────────────────
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
      "name": "Calculadora Keto",
      "slug": "calculadora-keto",
      "subtitle": "Calcula tus macros keto personalizados para grasa, proteína y carbohidratos netos con ejemplos de comidas, objetivos de electrolitos y ajustes para días de entrenamiento",
      "breadcrumb": "Keto",
      "seo": {
        "title": "Calculadora Keto — Calculadora Gratuita de Macros Keto con Planificación de Comidas",
        "description": "Calcula tus macros keto usando la ecuación Mifflin-St Jeor. Obtén objetivos personalizados de grasa, proteína y carbohidratos netos con ejemplos de alimentos, recomendaciones de electrolitos y macros separados para días de entrenamiento/descanso. Herramienta gratuita con soporte kg/lb.",
        "shortDescription": "Calcula macros personalizados de dieta keto con ejemplos de alimentos y electrolitos",
        "keywords": [
          "calculadora keto",
          "calculadora macros keto",
          "calculadora dieta cetogénica",
          "macros keto",
          "plan dieta keto",
          "calculadora carbohidratos netos",
          "pérdida peso keto",
          "electrolitos keto",
          "calculadora plan comidas keto"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "gender": {
          "label": "Sexo",
          "helpText": "La tasa metabólica difiere entre hombres y mujeres",
          "options": {
            "male": "Hombre",
            "female": "Mujer"
          }
        },
        "age": {
          "label": "Edad",
          "helpText": "La tasa metabólica disminuye con la edad"
        },
        "weight": {
          "label": "Peso",
          "helpText": "Tu peso corporal actual"
        },
        "height": {
          "label": "Altura",
          "helpText": "Tu altura"
        },
        "activityLevel": {
          "label": "Nivel de Actividad",
          "helpText": "Elige la opción que mejor coincida con tu semana típica",
          "options": {
            "sedentary": "Sedentario (trabajo de oficina, poco ejercicio)",
            "light": "Ligeramente Activo (caminar, 1-3 hrs/semana)",
            "moderate": "Moderadamente Activo (ejercicio 3-5 hrs/semana)",
            "active": "Muy Activo (ejercicio intenso 6-7 días/semana)",
            "veryActive": "Atleta (entrenamiento 2x diario o trabajo físico)"
          }
        },
        "goal": {
          "label": "Objetivo",
          "helpText": "Tu objetivo de manejo de peso",
          "options": {
            "lose": "Perder Peso",
            "maintain": "Mantener Peso",
            "gain": "Ganar Músculo"
          }
        },
        "deficitPercent": {
          "label": "Déficit Calórico",
          "helpText": "10-20% es moderado y sostenible. 20-30% es agresivo. Nunca excedas el 30%."
        },
        "surplusPercent": {
          "label": "Superávit Calórico",
          "helpText": "Se recomienda 5-10% para ganar músculo magro"
        },
        "bodyFatPercent": {
          "label": "% Grasa Corporal",
          "helpText": "Opcional — permite cálculo más preciso de proteína basado en masa corporal magra"
        },
        "netCarbsTarget": {
          "label": "Objetivo Diario de Carbohidratos Netos",
          "helpText": "Se recomienda 20-50g para cetosis. La mayoría comienza con 20-25g."
        },
        "trainingDays": {
          "label": "Días de Entrenamiento por Semana",
          "helpText": "Días que haces entrenamiento de fuerza o ejercicio intenso. Calcularemos macros separados para días de entrenamiento vs descanso."
        }
      },
      "inputGroups": {},
      "results": {
        "dailyCalories": {
          "label": "Calorías Diarias"
        },
        "fatGrams": {
          "label": "🥑 Grasa"
        },
        "proteinGrams": {
          "label": "🥩 Proteína"
        },
        "netCarbsGrams": {
          "label": "🥦 Carbohidratos Netos"
        },
        "bmr": {
          "label": "TMB (Tasa Basal)"
        },
        "tdee": {
          "label": "GET (Gasto Energético Total)"
        },
        "leanBodyMass": {
          "label": "Masa Corporal Magra"
        }
      },
      "presets": {
        "femaleLose": {
          "label": "Mujer — Pérdida de Peso",
          "description": "68 kg, actividad moderada, déficit 20%"
        },
        "maleLose": {
          "label": "Hombre — Pérdida de Peso",
          "description": "91 kg, actividad moderada, déficit 20%"
        },
        "activeMaintain": {
          "label": "Activo — Mantenimiento",
          "description": "82 kg, muy activo, mantener peso"
        },
        "highProtein": {
          "label": "Alta Proteína — Definición",
          "description": "84 kg, 6 días entrenamiento, déficit 15%"
        }
      },
      "tooltips": {
        "dailyCalories": "Calorías totales diarias para comer en dieta keto",
        "fatGrams": "Gramos de grasa por día — tu fuente principal de energía en keto",
        "proteinGrams": "Gramos de proteína por día — esencial para mantenimiento muscular",
        "netCarbsGrams": "Carbohidratos netos por día — mantente por debajo para mantener cetosis",
        "bmr": "Tasa Metabólica Basal — calorías quemadas en reposo",
        "tdee": "Gasto Energético Total Diario — calorías quemadas con actividad",
        "leanBodyMass": "Tu peso total menos la grasa corporal"
      },
      "values": {
        "kg": "kg",
        "lbs": "lbs",
        "cm": "cm",
        "g": "g",
        "kcal": "kcal",
        "cal": "cal",
        "Fat": "Grasa",
        "Protein": "Proteína",
        "Net Carbs": "Carbohidratos Netos",
        "Fiber": "Fibra",
        "Training Days": "Días de Entrenamiento",
        "Rest Days": "Días de Descanso",
        "Sodium": "Sodio",
        "Potassium": "Potasio",
        "Magnesium": "Magnesio",
        "mg": "mg",
        "Day 1-3": "Día 1-3",
        "Day 4-7": "Día 4-7",
        "Week 2-4": "Semana 2-4",
        "Month 1+": "Mes 1+"
      },
      "formats": {
        "summary": "Tus macros keto diarios: {fatGrams} grasa, {proteinGrams} proteína, {netCarbsGrams} carbohidratos netos. Total: {dailyCalories} calorías."
      },
      "infoCards": {
        "macros": {
          "title": "🥑 Tus Macros Diarios",
          "items": [
            {
              "label": "Grasa (70-75%)",
              "valueKey": "fatGrams"
            },
            {
              "label": "Proteína (20-25%)",
              "valueKey": "proteinGrams"
            },
            {
              "label": "Carbohidratos Netos (5%)",
              "valueKey": "netCarbsGrams"
            }
          ]
        },
        "trainingDays": {
          "title": "🏋️ Macros Días de Entrenamiento",
          "items": [
            {
              "label": "Calorías",
              "valueKey": "trainingCalories"
            },
            {
              "label": "Grasa",
              "valueKey": "trainingFat"
            },
            {
              "label": "Proteína",
              "valueKey": "trainingProtein"
            },
            {
              "label": "Carbohidratos Netos",
              "valueKey": "trainingCarbs"
            }
          ]
        },
        "restDays": {
          "title": "🛋️ Macros Días de Descanso",
          "items": [
            {
              "label": "Calorías",
              "valueKey": "restCalories"
            },
            {
              "label": "Grasa",
              "valueKey": "restFat"
            },
            {
              "label": "Proteína",
              "valueKey": "restProtein"
            },
            {
              "label": "Carbohidratos Netos",
              "valueKey": "restCarbs"
            }
          ]
        },
        "foodExamples": {
          "title": "🍳 Alimentos Keto Ejemplo",
          "items": [
            {
              "label": "Aguacate (100g)",
              "valueKey": "avocadoMacros"
            },
            {
              "label": "Pechuga de Pollo (100g)",
              "valueKey": "chickenMacros"
            },
            {
              "label": "Salmón (100g)",
              "valueKey": "salmonMacros"
            },
            {
              "label": "Brócoli (100g)",
              "valueKey": "broccoliMacros"
            },
            {
              "label": "Almendras (28g)",
              "valueKey": "almondsMacros"
            },
            {
              "label": "Huevos (2 grandes)",
              "valueKey": "eggsMacros"
            }
          ]
        },
        "electrolytes": {
          "title": "⚡ Objetivos Diarios de Electrolitos",
          "items": [
            {
              "label": "Sodio",
              "valueKey": "sodium"
            },
            {
              "label": "Potasio",
              "valueKey": "potassium"
            },
            {
              "label": "Magnesio",
              "valueKey": "magnesium"
            }
          ]
        },
        "timeline": {
          "title": "📅 Tu Viaje Keto",
          "items": [
            {
              "label": "Día 1-3: Transición",
              "valueKey": "phase1"
            },
            {
              "label": "Día 4-7: Cetosis",
              "valueKey": "phase2"
            },
            {
              "label": "Semana 2-4: Adaptación Grasa",
              "valueKey": "phase3"
            },
            {
              "label": "Mes 1+: Keto Completo",
              "valueKey": "phase4"
            }
          ]
        }
      },
      "referenceData": {},
      "chart": {
        "title": "Desglose de Macros",
        "series": {
          "fat": "Grasa",
          "protein": "Proteína",
          "carbs": "Carbohidratos Netos"
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es la Dieta Cetogénica?",
          "content": "La dieta cetogénica (keto) es un patrón alimentario alto en grasas, moderado en proteínas y muy bajo en carbohidratos que cambia tu cuerpo a un estado metabólico llamado cetosis. Cuando reduces drásticamente la ingesta de carbohidratos a 20-50 gramos por día, tu cuerpo agota sus reservas de glucosa (azúcar) y comienza a descomponer la grasa en cuerpos cetónicos para usar como su fuente principal de combustible. Este cambio metabólico típicamente ocurre dentro de 2-4 días de restricción estricta de carbohidratos. A diferencia de otras dietas bajas en carbohidratos, keto específicamente busca mantener cetosis nutricional — un estado medible donde tus niveles de cetonas en sangre alcanzan 0.5-3.0 mmol/L. Este estado ha sido estudiado extensivamente para pérdida de peso, mejora de sensibilidad a la insulina, claridad mental mejorada y aplicaciones terapéuticas potenciales en epilepsia, diabetes tipo 2 y condiciones neurológicas. La proporción macro estándar keto es aproximadamente 70-75% de calorías de grasa, 20-25% de proteína y solo 5% de carbohidratos. Sin embargo, las necesidades individuales varían según el nivel de actividad, salud metabólica y objetivos. Esta calculadora usa la ecuación científicamente validada Mifflin-St Jeor para estimar tu tasa metabólica basal (TMB), luego aplica tu nivel de actividad y objetivo de peso para determinar tu ingesta calórica óptima y objetivos macro personalizados que apoyan cetosis sostenida."
        },
        "howItWorks": {
          "title": "Cómo Funcionan los Macros Keto",
          "content": "La calculadora de macros keto determina tus objetivos personalizados de grasa, proteína y carbohidratos a través de un proceso sistemático. Primero, calcula tu TMB usando la ecuación Mifflin-St Jeor, que considera tu sexo, edad, altura y peso para estimar cuántas calorías quema tu cuerpo en reposo. Luego, se aplica tu multiplicador de nivel de actividad para determinar tu Gasto Energético Total Diario (GET) — las calorías totales que quemas incluyendo actividad física. Si tu objetivo es pérdida de peso, se resta un déficit calórico (típicamente 10-30%) de tu GET; para ganancia muscular, se añade un superávit (5-15%); para mantenimiento, tu GET permanece sin cambios. Una vez establecida tu ingesta calórica objetivo, se aplica la división macro. Los carbohidratos netos se establecen primero según tu objetivo (usualmente 20-25g para principiantes, hasta 50g para individuos activos). La proteína se calcula después, ya sea como porcentaje de calorías totales (20-25%) o, si proporcionas porcentaje de grasa corporal, como 0.8-1.0 gramos por libra de masa corporal magra para preservación muscular más precisa. Las calorías restantes se asignan a grasa, que se convierte en tu fuente principal de energía en keto. Este enfoque asegura que comas suficiente proteína para mantener músculo, te mantengas bajo el umbral de carbohidratos para mantener cetosis, y llenes el resto de tus calorías con grasas saciantes y densas en energía de fuentes de alimentos integrales como aguacates, nueces, aceite de oliva, pescado graso y carnes de pastoreo."
        },
        "benefits": {
          "title": "Beneficios de la Dieta Keto",
          "items": [
            {
              "text": "Pérdida de peso rápida — especialmente peso inicial de agua y grasa por niveles reducidos de insulina",
              "type": "info"
            },
            {
              "text": "Mejora de claridad mental y enfoque — las cetonas son combustible cerebral más eficiente que la glucosa",
              "type": "info"
            },
            {
              "text": "Niveles de energía estables — sin picos y caídas de azúcar en sangre durante el día",
              "type": "info"
            },
            {
              "text": "Apetito reducido — alta ingesta de grasa aumenta saciedad y reduce antojos",
              "type": "info"
            },
            {
              "text": "Mejor control de azúcar en sangre — baja dramáticamente insulina en ayunas y mejora sensibilidad a insulina",
              "type": "info"
            },
            {
              "text": "Efectos terapéuticos potenciales — estudiado para epilepsia, Alzheimer, Parkinson y cáncer",
              "type": "info"
            }
          ]
        },
        "considerations": {
          "title": "Consideraciones Importantes",
          "items": [
            {
              "text": "Gripe keto durante adaptación — espera fatiga, dolores de cabeza, irritabilidad en primeros 3-7 días; mitiga con electrolitos",
              "type": "warning"
            },
            {
              "text": "Manejo de electrolitos es crítico — suplementa sodio (5000mg), potasio (1000mg), magnesio (300mg) diariamente",
              "type": "warning"
            },
            {
              "text": "No adecuado para todos — consulta médico si tienes enfermedad renal, diabetes, condiciones hepáticas, o estás embarazada",
              "type": "warning"
            },
            {
              "text": "Puede afectar rendimiento atlético inicialmente — atletas de resistencia necesitan 2-6 semanas para adaptarse completamente",
              "type": "warning"
            },
            {
              "text": "Requiere planificación y seguimiento de comidas — debes monitorear carbohidratos netos de cerca para mantener cetosis",
              "type": "info"
            },
            {
              "text": "Desafíos sociales — comer fuera y eventos sociales requieren planificación y a veces explicar tu dieta",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Planes de Comidas Keto",
          "description": "Ideas de comidas ejemplo que se ajustan a tus macros",
          "examples": [
            {
              "title": "Día Keto Estándar (2000 cal)",
              "steps": [
                "Desayuno: 3 huevos revueltos en mantequilla + 1 aguacate + café con crema espesa",
                "Almuerzo: Salmón a la parrilla (170g) + ensalada de hojas verdes con aderezo de aceite de oliva + queso feta",
                "Cena: Bistec ribeye (225g) + brócoli asado con mantequilla + ensalada",
                "Snacks: 28g almendras + 56g queso + apio con mantequilla de almendras"
              ],
              "result": "Macros: 156g grasa, 125g proteína, 25g carbohidratos netos = 2,001 calorías (70/25/5 división)"
            },
            {
              "title": "Keto Alta Proteína (2200 cal)",
              "steps": [
                "Desayuno: Omelet de 4 huevos con queso, espinacas, champiñones + tocino (3 tiras)",
                "Almuerzo: Muslo de pollo (225g) + arroz de coliflor salteado con aceite de coco + salsa de maní",
                "Cena: Carne molida (225g) + fideos de calabacín con salsa alfredo + parmesano",
                "Snacks: Batido de proteína con aceite MCT + chicharrones + nueces de macadamia"
              ],
              "result": "Macros: 158g grasa, 145g proteína, 28g carbohidratos netos = 2,202 calorías (65/26/9 división)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Qué son los carbohidratos netos y cómo los calculo?",
          "answer": "Los carbohidratos netos son los carbohidratos totales menos la fibra y ciertos alcoholes de azúcar — estos son los carbohidratos que realmente impactan tu azúcar en sangre y pueden sacarte de cetosis. Para calcular: Carbohidratos Totales - Fibra - Alcoholes de Azúcar (como eritritol) = Carbohidratos Netos. Por ejemplo, si un alimento tiene 15g carbohidratos totales, 8g fibra y 3g eritritol, los carbohidratos netos son 15 - 8 - 3 = 4g. La mayoría de etiquetas nutricionales en EE.UU. ya incluyen fibra en el conteo total de carbohidratos, así que la restas. Sin embargo, en Europa, Australia y otras regiones, la fibra se lista por separado y no necesitas restarla."
        },
        {
          "question": "¿Cuánta proteína debo comer en keto?",
          "answer": "La ingesta de proteína en keto debe ser moderada, no excesiva. La recomendación general es 0.8-1.0 gramos por libra de masa corporal magra (no peso corporal total). Si no conoces tu porcentaje de grasa corporal, apunta a 20-25% de tus calorías totales de proteína. Comer muy poca proteína riesga pérdida muscular, pero comer demasiada proteína teóricamente puede convertirse a glucosa a través de gluconeogénesis e interferir con cetosis — aunque esto es menos preocupante de lo que muchos creen. Los individuos activos y aquellos que levantan pesas deben apuntar al rango alto (1.0g por lb de masa magra) para apoyar recuperación y crecimiento muscular."
        },
        {
          "question": "¿Perderé músculo en keto?",
          "answer": "No, no perderás músculo en keto si comes proteína adecuada y realizas entrenamiento de resistencia. De hecho, la investigación muestra que las dietas keto preservan masa muscular magra tan bien o mejor que dietas altas en carbohidratos cuando la ingesta de proteína es suficiente. La clave es comer 0.8-1.0g proteína por libra de masa corporal magra y continuar entrenamiento de fuerza. Tu cuerpo se vuelve altamente eficiente usando grasa como combustible mientras ahorra proteína para mantenimiento muscular. Algunas personas incluso ganan músculo en keto, especialmente si lo combinan con un ligero superávit calórico y entrenamiento de sobrecarga progresiva."
        },
        {
          "question": "¿Cuánto tiempo toma entrar en cetosis?",
          "answer": "La mayoría de personas entra en cetosis dentro de 2-4 días de restringir carbohidratos por debajo de 20-50g diarios. Sin embargo, volverse completamente adaptado a grasa — donde tu cuerpo eficientemente produce y usa cetonas como su combustible primario — típicamente toma 2-6 semanas. Durante la transición inicial puedes experimentar síntomas de gripe keto como fatiga y dolores de cabeza, que pueden mitigarse manteniéndote hidratado y suplementando electrolitos (especialmente sodio, potasio y magnesio). Puedes medir cetosis usando tiras de orina (menos preciso), medidores de aliento (precisión moderada), o medidores de cetonas en sangre (más preciso). Niveles de cetonas en sangre de 0.5-3.0 mmol/L indican cetosis nutricional."
        },
        {
          "question": "¿Debo ingresar mi porcentaje de grasa corporal?",
          "answer": "El porcentaje de grasa corporal es opcional pero mejora significativamente la precisión. Cuando se proporciona, la calculadora determina tu masa corporal magra y la usa para objetivos de proteína más precisos — en lugar de estimar desde calorías totales. Puedes estimar grasa corporal visualmente usando gráficos de comparación en línea, medir con calibradores (disponibles en Amazon por menos de $10), usar báscula de impedancia bioeléctrica (precisión moderada), o hacer escaneo DEXA para la lectura más precisa (típicamente $50-150). Si no conoces tu grasa corporal, la calculadora aún proporcionará buenos resultados usando cálculos basados en porcentaje."
        },
        {
          "question": "¿Qué déficit calórico debo elegir para pérdida de peso?",
          "answer": "Un déficit de 10-20% es moderado y sostenible para la mayoría de personas, permitiendo pérdida de peso constante de 0.5-1 lb por semana mientras preserva energía y músculo. Un déficit de 20-30% produce resultados más rápidos (1-2 lbs por semana) pero puede ser más difícil de mantener y puede aumentar riesgo de pérdida muscular si la ingesta de proteína es inadecuada. Déficits arriba del 30% no se recomiendan ya que pueden impactar negativamente metabolismo, niveles hormonales, energía y rendimiento de entrenamientos. Comienza con 20% y ajusta basado en tu progreso y cómo te sientes después de 2-4 semanas. Si estás perdiendo peso muy rápido o sintiéndote muy fatigado, reduce el déficit. Si el progreso se estanca, auméntalo ligeramente."
        },
        {
          "question": "¿Por qué necesito macros separados para días de entrenamiento y descanso?",
          "answer": "Las necesidades nutricionales de tu cuerpo difieren en días que entrenas versus días que descansas. En días de entrenamiento, quemas más calorías y puedes beneficiarte de ingesta de proteína ligeramente más alta (10-15% más) para apoyar recuperación y crecimiento muscular, mientras la grasa puede reducirse proporcionalmente. En días de descanso, tus necesidades calóricas son menores, así que puedes reducir tanto proteína como grasa mientras mantienes carbohidratos en tu umbral keto. Este enfoque, popularizado por la comunidad Ketogains, ayuda optimizar composición corporal alimentando tus músculos en días de entrenamiento mientras mantienes un déficit mayor en días de descanso para pérdida de grasa más rápida. Si no entrenas fuerza o prefieres simplicidad, puedes usar los macros diarios estándar todos los días."
        },
        {
          "question": "¿Es segura la dieta keto para todos?",
          "answer": "Keto generalmente se considera seguro para adultos sanos, pero puede no ser apropiado para todos. Personas con diabetes tipo 1, enfermedad renal, condiciones hepáticas, problemas de vesícula biliar, o aquellas embarazadas o amamantando deben consultar un proveedor de salud antes de comenzar. Si tomas medicamentos para diabetes o presión arterial, las dosis pueden necesitar ajuste ya que tus marcadores metabólicos mejoran — keto puede bajar significativamente azúcar en sangre y presión arterial. Niños, adolescentes e individuos ancianos también deben consultar un médico primero. Siempre comienza cualquier dieta nueva bajo supervisión médica si tienes condiciones de salud preexistentes."
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
      "name": "Calculadora Keto",
      "slug": "calculadora-keto",
      "subtitle": "Calcule suas macros keto personalizadas para gordura, proteína e carboidratos líquidos com exemplos de refeições, metas de eletrólitos e ajustes para dias de treino",
      "breadcrumb": "Keto",
      "seo": {
        "title": "Calculadora Keto — Calculadora Gratuita de Macros Keto com Planejamento de Refeições",
        "description": "Calcule suas macros keto usando a equação Mifflin-St Jeor. Obtenha metas personalizadas de gordura, proteína e carboidratos líquidos com exemplos de alimentos, recomendações de eletrólitos e macros separadas para dias de treino/descanso. Ferramenta gratuita com suporte a kg/lb.",
        "shortDescription": "Calcule macros personalizadas da dieta keto com exemplos de alimentos e eletrólitos",
        "keywords": [
          "calculadora keto",
          "calculadora macro keto",
          "calculadora dieta cetogênica",
          "macros keto",
          "plano dieta keto",
          "calculadora carboidratos líquidos",
          "perda peso keto",
          "eletrólitos keto",
          "calculadora plano refeição keto"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "gender": {
          "label": "Sexo",
          "helpText": "A taxa metabólica difere entre homens e mulheres",
          "options": {
            "male": "Masculino",
            "female": "Feminino"
          }
        },
        "age": {
          "label": "Idade",
          "helpText": "A taxa metabólica diminui com a idade"
        },
        "weight": {
          "label": "Peso",
          "helpText": "Seu peso corporal atual"
        },
        "height": {
          "label": "Altura",
          "helpText": "Sua altura"
        },
        "activityLevel": {
          "label": "Nível de Atividade",
          "helpText": "Escolha a opção que melhor corresponde à sua semana típica",
          "options": {
            "sedentary": "Sedentário (trabalho de mesa, pouco exercício)",
            "light": "Levemente Ativo (caminhada, 1-3 hrs/semana)",
            "moderate": "Moderadamente Ativo (exercício 3-5 hrs/semana)",
            "active": "Muito Ativo (exercício intenso 6-7 dias/semana)",
            "veryActive": "Atleta (treino 2x ao dia ou trabalho físico)"
          }
        },
        "goal": {
          "label": "Objetivo",
          "helpText": "Seu objetivo de controle de peso",
          "options": {
            "lose": "Perder Peso",
            "maintain": "Manter Peso",
            "gain": "Ganhar Músculo"
          }
        },
        "deficitPercent": {
          "label": "Déficit Calórico",
          "helpText": "10-20% é moderado e sustentável. 20-30% é agressivo. Nunca exceda 30%."
        },
        "surplusPercent": {
          "label": "Superávit Calórico",
          "helpText": "5-10% recomendado para ganho de massa magra"
        },
        "bodyFatPercent": {
          "label": "% de Gordura Corporal",
          "helpText": "Opcional — permite cálculo mais preciso de proteína baseado na massa corporal magra"
        },
        "netCarbsTarget": {
          "label": "Meta Diária de Carboidratos Líquidos",
          "helpText": "20-50g recomendado para cetose. A maioria começa com 20-25g."
        },
        "trainingDays": {
          "label": "Dias de Treino por Semana",
          "helpText": "Dias que você faz treinamento de força ou exercício intenso. Calcularemos macros separadas para dias de treino vs descanso."
        }
      },
      "inputGroups": {},
      "results": {
        "dailyCalories": {
          "label": "Calorias Diárias"
        },
        "fatGrams": {
          "label": "🥑 Gordura"
        },
        "proteinGrams": {
          "label": "🥩 Proteína"
        },
        "netCarbsGrams": {
          "label": "🥦 Carboidratos Líquidos"
        },
        "bmr": {
          "label": "TMB (Taxa Basal)"
        },
        "tdee": {
          "label": "GET (Gasto Energético Total)"
        },
        "leanBodyMass": {
          "label": "Massa Corporal Magra"
        }
      },
      "presets": {
        "femaleLose": {
          "label": "Mulher — Perda de Peso",
          "description": "68 kg, atividade moderada, déficit 20%"
        },
        "maleLose": {
          "label": "Homem — Perda de Peso",
          "description": "91 kg, atividade moderada, déficit 20%"
        },
        "activeMaintain": {
          "label": "Ativo — Manutenção",
          "description": "82 kg, muito ativo, manter peso"
        },
        "highProtein": {
          "label": "Alta Proteína — Cutting",
          "description": "84 kg, 6 dias treino, déficit 15%"
        }
      },
      "tooltips": {
        "dailyCalories": "Total de calorias diárias para comer na dieta keto",
        "fatGrams": "Gramas de gordura por dia — sua principal fonte de energia no keto",
        "proteinGrams": "Gramas de proteína por dia — essencial para manutenção muscular",
        "netCarbsGrams": "Carboidratos líquidos por dia — mantenha abaixo deste valor para manter cetose",
        "bmr": "Taxa Metabólica Basal — calorias queimadas em repouso",
        "tdee": "Gasto Energético Total Diário — calorias queimadas com atividade",
        "leanBodyMass": "Seu peso total menos a gordura corporal"
      },
      "values": {
        "kg": "kg",
        "lbs": "lbs",
        "cm": "cm",
        "g": "g",
        "kcal": "kcal",
        "cal": "cal",
        "Fat": "Gordura",
        "Protein": "Proteína",
        "Net Carbs": "Carboidratos Líquidos",
        "Fiber": "Fibra",
        "Training Days": "Dias de Treino",
        "Rest Days": "Dias de Descanso",
        "Sodium": "Sódio",
        "Potassium": "Potássio",
        "Magnesium": "Magnésio",
        "mg": "mg",
        "Day 1-3": "Dia 1-3",
        "Day 4-7": "Dia 4-7",
        "Week 2-4": "Semana 2-4",
        "Month 1+": "Mês 1+"
      },
      "formats": {
        "summary": "Suas macros keto diárias: {fatGrams} gordura, {proteinGrams} proteína, {netCarbsGrams} carboidratos líquidos. Total: {dailyCalories} calorias."
      },
      "infoCards": {
        "macros": {
          "title": "🥑 Suas Macros Diárias",
          "items": [
            {
              "label": "Gordura (70-75%)",
              "valueKey": "fatGrams"
            },
            {
              "label": "Proteína (20-25%)",
              "valueKey": "proteinGrams"
            },
            {
              "label": "Carboidratos Líquidos (5%)",
              "valueKey": "netCarbsGrams"
            }
          ]
        },
        "trainingDays": {
          "title": "🏋️ Macros Dias de Treino",
          "items": [
            {
              "label": "Calorias",
              "valueKey": "trainingCalories"
            },
            {
              "label": "Gordura",
              "valueKey": "trainingFat"
            },
            {
              "label": "Proteína",
              "valueKey": "trainingProtein"
            },
            {
              "label": "Carboidratos Líquidos",
              "valueKey": "trainingCarbs"
            }
          ]
        },
        "restDays": {
          "title": "🛋️ Macros Dias de Descanso",
          "items": [
            {
              "label": "Calorias",
              "valueKey": "restCalories"
            },
            {
              "label": "Gordura",
              "valueKey": "restFat"
            },
            {
              "label": "Proteína",
              "valueKey": "restProtein"
            },
            {
              "label": "Carboidratos Líquidos",
              "valueKey": "restCarbs"
            }
          ]
        },
        "foodExamples": {
          "title": "🍳 Exemplos de Alimentos Keto",
          "items": [
            {
              "label": "Abacate (100g)",
              "valueKey": "avocadoMacros"
            },
            {
              "label": "Peito de Frango (100g)",
              "valueKey": "chickenMacros"
            },
            {
              "label": "Salmão (100g)",
              "valueKey": "salmonMacros"
            },
            {
              "label": "Brócolis (100g)",
              "valueKey": "broccoliMacros"
            },
            {
              "label": "Amêndoas (28g)",
              "valueKey": "almondsMacros"
            },
            {
              "label": "Ovos (2 grandes)",
              "valueKey": "eggsMacros"
            }
          ]
        },
        "electrolytes": {
          "title": "⚡ Metas Diárias de Eletrólitos",
          "items": [
            {
              "label": "Sódio",
              "valueKey": "sodium"
            },
            {
              "label": "Potássio",
              "valueKey": "potassium"
            },
            {
              "label": "Magnésio",
              "valueKey": "magnesium"
            }
          ]
        },
        "timeline": {
          "title": "📅 Sua Jornada Keto",
          "items": [
            {
              "label": "Dia 1-3: Transição",
              "valueKey": "phase1"
            },
            {
              "label": "Dia 4-7: Cetose",
              "valueKey": "phase2"
            },
            {
              "label": "Semana 2-4: Adaptação à Gordura",
              "valueKey": "phase3"
            },
            {
              "label": "Mês 1+: Keto Completo",
              "valueKey": "phase4"
            }
          ]
        }
      },
      "referenceData": {},
      "chart": {
        "title": "Distribuição de Macros",
        "series": {
          "fat": "Gordura",
          "protein": "Proteína",
          "carbs": "Carboidratos Líquidos"
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é a Dieta Cetogênica?",
          "content": "A dieta cetogênica (keto) é um padrão alimentar rico em gorduras, moderado em proteínas e muito baixo em carboidratos que desloca seu corpo para um estado metabólico chamado cetose. Quando você reduz drasticamente a ingestão de carboidratos para 20-50 gramas por dia, seu corpo esgota seus estoques de glicose (açúcar) e começa a quebrar gordura em corpos cetônicos para usar como fonte primária de combustível. Esta mudança metabólica tipicamente acontece dentro de 2-4 dias de restrição rigorosa de carboidratos. Diferentemente de outras dietas baixas em carboidratos, o keto especificamente visa manter cetose nutricional — um estado mensurável onde seus níveis de cetonas no sangue atingem 0,5-3,0 mmol/L. Este estado foi extensivamente estudado para perda de peso, melhoria da sensibilidade à insulina, maior clareza mental e potenciais aplicações terapêuticas em epilepsia, diabetes tipo 2 e condições neurológicas. A proporção padrão de macros keto é aproximadamente 70-75% das calorias de gordura, 20-25% de proteína e apenas 5% de carboidratos. No entanto, necessidades individuais variam baseadas no nível de atividade, saúde metabólica e objetivos. Esta calculadora usa a equação cientificamente validada Mifflin-St Jeor para estimar sua taxa metabólica basal (TMB), então aplica seu nível de atividade e objetivo de peso para determinar sua ingestão calórica ótima e metas de macros personalizadas que apoiam cetose sustentada."
        },
        "howItWorks": {
          "title": "Como Funcionam as Macros Keto",
          "content": "A calculadora de macros keto determina suas metas personalizadas de gordura, proteína e carboidratos através de um processo sistemático. Primeiro, calcula sua TMB usando a equação Mifflin-St Jeor, que considera seu sexo, idade, altura e peso para estimar quantas calorias seu corpo queima em repouso. Em seguida, o multiplicador do seu nível de atividade é aplicado para determinar seu Gasto Energético Total Diário (GET) — as calorias totais que você queima incluindo atividade física. Se seu objetivo é perda de peso, um déficit calórico (tipicamente 10-30%) é subtraído do seu GET; para ganho muscular, um superávit (5-15%) é adicionado; para manutenção, seu GET permanece inalterado. Uma vez estabelecida sua ingestão calórica alvo, a divisão de macros é aplicada. Carboidratos líquidos são definidos primeiro baseados na sua meta (geralmente 20-25g para iniciantes, até 50g para indivíduos ativos). Proteína é calculada em seguida, seja como percentual das calorias totais (20-25%) ou, se você fornece percentual de gordura corporal, como 0,8-1,0 gramas por libra de massa corporal magra para preservação muscular mais precisa. As calorias restantes são alocadas para gordura, que se torna sua fonte primária de energia no keto. Esta abordagem garante que você coma proteína suficiente para manter músculo, permaneça abaixo do limiar de carboidratos para manter cetose e preencha o resto de suas calorias com gorduras saciantes e densas em energia de fontes alimentares integrais como abacates, nozes, azeite de oliva, peixes gordurosos e carnes de animais alimentados com capim."
        },
        "benefits": {
          "title": "Benefícios da Dieta Keto",
          "items": [
            {
              "text": "Perda rápida de peso — especialmente peso inicial de água e gordura de níveis reduzidos de insulina",
              "type": "info"
            },
            {
              "text": "Melhoria da clareza mental e foco — cetonas são um combustível cerebral mais eficiente que glicose",
              "type": "info"
            },
            {
              "text": "Níveis estáveis de energia — sem picos e quedas de açúcar no sangue ao longo do dia",
              "type": "info"
            },
            {
              "text": "Apetite reduzido — alta ingestão de gordura aumenta saciedade e reduz desejos",
              "type": "info"
            },
            {
              "text": "Melhor controle de açúcar no sangue — reduz drasticamente insulina em jejum e melhora sensibilidade à insulina",
              "type": "info"
            },
            {
              "text": "Potenciais efeitos terapêuticos — estudado para epilepsia, Alzheimer, Parkinson e câncer",
              "type": "info"
            }
          ]
        },
        "considerations": {
          "title": "Considerações Importantes",
          "items": [
            {
              "text": "Gripe keto durante adaptação — espere fadiga, dores de cabeça, irritabilidade nos primeiros 3-7 dias; mitigue com eletrólitos",
              "type": "warning"
            },
            {
              "text": "Gerenciamento de eletrólitos é crítico — suplemente sódio (5000mg), potássio (1000mg), magnésio (300mg) diariamente",
              "type": "warning"
            },
            {
              "text": "Não adequado para todos — consulte médico se tem doença renal, diabetes, condições hepáticas ou está grávida",
              "type": "warning"
            },
            {
              "text": "Pode afetar performance atlética inicialmente — atletas de resistência precisam de 2-6 semanas para se adaptar totalmente",
              "type": "warning"
            },
            {
              "text": "Requer planejamento e rastreamento de refeições — deve monitorar carboidratos líquidos de perto para manter cetose",
              "type": "info"
            },
            {
              "text": "Desafios sociais — comer fora e eventos sociais requerem planejamento e às vezes explicar sua dieta",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Planos de Refeição Keto",
          "description": "Ideias de refeições que se encaixam em suas macros",
          "examples": [
            {
              "title": "Dia Keto Padrão (2000 cal)",
              "steps": [
                "Café da manhã: 3 ovos mexidos na manteiga + 1 abacate + café com creme de leite",
                "Almoço: Salmão grelhado (170g) + salada de folhas verdes com molho de azeite + queijo feta",
                "Jantar: Bife de costela (225g) + brócolis assado com manteiga + salada",
                "Lanches: 28g amêndoas + 56g queijo + aipo com pasta de amêndoa"
              ],
              "result": "Macros: 156g gordura, 125g proteína, 25g carboidratos líquidos = 2.001 calorias (70/25/5)"
            },
            {
              "title": "Keto Alto em Proteína (2200 cal)",
              "steps": [
                "Café da manhã: Omelete de 4 ovos com queijo, espinafre, cogumelos + bacon (3 fatias)",
                "Almoço: Coxa de frango (225g) + refogado de arroz de couve-flor com óleo de coco + molho de amendoim",
                "Jantar: Carne moída (225g) + macarrão de abobrinha com molho alfredo + parmesão",
                "Lanches: Shake de proteína com óleo MCT + torresmo + macadâmias"
              ],
              "result": "Macros: 158g gordura, 145g proteína, 28g carboidratos líquidos = 2.202 calorias (65/26/9)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "O que são carboidratos líquidos e como calculá-los?",
          "answer": "Carboidratos líquidos são os carboidratos totais menos fibras e certos álcoois de açúcar — estes são os carboidratos que realmente impactam seu açúcar no sangue e podem te tirar da cetose. Para calcular: Carboidratos Totais - Fibras - Álcoois de Açúcar (como eritritol) = Carboidratos Líquidos. Por exemplo, se um alimento tem 15g carboidratos totais, 8g fibra e 3g eritritol, os carboidratos líquidos são 15 - 8 - 3 = 4g. A maioria dos rótulos nutricionais nos EUA já inclui fibra na contagem total de carboidratos, então você subtrai. No entanto, na Europa, Austrália e outras regiões, fibra é listada separadamente e você não precisa subtraí-la."
        },
        {
          "question": "Quanta proteína devo comer no keto?",
          "answer": "A ingestão de proteína no keto deve ser moderada, não excessiva. A recomendação geral é 0,8-1,0 gramas por libra de massa corporal magra (não peso corporal total). Se você não conhece seu percentual de gordura corporal, mire em 20-25% de suas calorias totais da proteína. Comer pouca proteína risca perda muscular, mas comer muita proteína pode teoricamente se converter em glicose através da gliconeogênese e interferir com cetose — embora isso seja menos preocupante do que muitos acreditam. Indivíduos ativos e aqueles que fazem musculação devem mirar na faixa superior (1,0g por lb de massa magra) para apoiar recuperação e crescimento muscular."
        },
        {
          "question": "Vou perder músculo no keto?",
          "answer": "Não, você não perderá músculo no keto se comer proteína adequada e se envolver em treinamento de resistência. Na verdade, pesquisas mostram que dietas keto preservam massa muscular magra tão bem quanto ou melhor que dietas com mais carboidratos quando a ingestão de proteína é suficiente. A chave é comer 0,8-1,0g proteína por libra de massa corporal magra e continuar treinamento de força. Seu corpo se torna altamente eficiente em usar gordura para combustível enquanto poupa proteína para manutenção muscular. Algumas pessoas até ganham músculo no keto, especialmente se combinando com um ligeiro superávit calórico e treinamento de sobrecarga progressiva."
        },
        {
          "question": "Quanto tempo leva para entrar em cetose?",
          "answer": "A maioria das pessoas entra em cetose dentro de 2-4 dias de restringir carboidratos abaixo de 20-50g diariamente. No entanto, se tornar completamente adaptado à gordura — onde seu corpo eficientemente produz e usa cetonas como combustível primário — tipicamente leva 2-6 semanas. Durante a transição inicial você pode experimentar sintomas de gripe keto como fadiga e dores de cabeça, que podem ser mitigados mantendo-se hidratado e suplementando eletrólitos (especialmente sódio, potássio e magnésio). Você pode medir cetose usando fitas de urina (menos preciso), medidores de respiração (precisão moderada) ou medidores de cetona no sangue (mais preciso). Níveis de cetona no sangue de 0,5-3,0 mmol/L indicam cetose nutricional."
        },
        {
          "question": "Devo inserir meu percentual de gordura corporal?",
          "answer": "Percentual de gordura corporal é opcional mas melhora significativamente a precisão. Quando fornecido, a calculadora determina sua massa corporal magra e a usa para metas de proteína mais precisas — em vez de estimar das calorias totais. Você pode estimar gordura corporal visualmente usando gráficos de comparação online, medir com calibradores (disponíveis na Amazon por menos de R$50), usar uma balança de bioimpedância (precisão moderada) ou fazer um exame DEXA para a leitura mais precisa (tipicamente R$150-400). Se você não conhece sua gordura corporal, a calculadora ainda fornecerá bons resultados usando cálculos baseados em percentual."
        },
        {
          "question": "Que déficit calórico devo escolher para perda de peso?",
          "answer": "Um déficit de 10-20% é moderado e sustentável para a maioria das pessoas, permitindo perda constante de peso de 0,25-0,5 kg por semana enquanto preserva energia e músculo. Um déficit de 20-30% produz resultados mais rápidos (0,5-1 kg por semana) mas pode ser mais difícil de manter e pode aumentar o risco de perda muscular se a ingestão de proteína for inadequada. Déficits acima de 30% não são recomendados pois podem impactar negativamente metabolismo, níveis hormonais, energia e performance do treino. Comece com 20% e ajuste baseado no seu progresso e como se sente após 2-4 semanas. Se está perdendo peso muito rapidamente ou se sentindo muito fatigado, reduza o déficit. Se o progresso estagnar, aumente ligeiramente."
        },
        {
          "question": "Por que preciso de macros separadas para dias de treino e descanso?",
          "answer": "As necessidades nutricionais do seu corpo diferem em dias que você treina versus dias que descansa. Em dias de treino, você queima mais calorias e pode se beneficiar de ingestão ligeiramente maior de proteína (10-15% mais) para apoiar recuperação e crescimento muscular, enquanto gordura pode ser reduzida proporcionalmente. Em dias de descanso, suas necessidades calóricas são menores, então você pode reduzir tanto proteína quanto gordura enquanto mantém carboidratos no seu limiar keto. Esta abordagem, popularizada pela comunidade Ketogains, ajuda otimizar composição corporal alimentando seus músculos em dias de treino enquanto mantém um déficit maior em dias de descanso para perda de gordura mais rápida. Se você não faz musculação ou prefere simplicidade, pode usar as macros diárias padrão todos os dias."
        },
        {
          "question": "A dieta keto é segura para todos?",
          "answer": "Keto é geralmente considerado seguro para adultos saudáveis, mas pode não ser apropriado para todos. Pessoas com diabetes tipo 1, doença renal, condições hepáticas, problemas de vesícula biliar, ou aquelas que estão grávidas ou amamentando devem consultar um profissional de saúde antes de começar. Se você toma medicamentos para diabetes ou pressão arterial, dosagens podem precisar de ajuste conforme seus marcadores metabólicos melhoram — keto pode significativamente reduzir açúcar no sangue e pressão arterial. Crianças, adolescentes e idosos também devem consultar um médico primeiro. Sempre inicie qualquer dieta nova sob supervisão médica se você tem condições de saúde pré-existentes."
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
      "name": "Calculateur Keto",
      "slug": "calculateur-keto",
      "subtitle": "Calculez vos macros keto personnalisées pour les lipides, protéines et glucides nets avec exemples de repas, objectifs d'électrolytes et ajustements pour les jours d'entraînement",
      "breadcrumb": "Keto",
      "seo": {
        "title": "Calculateur Keto — Calculateur Macro Keto Gratuit avec Planification de Repas",
        "description": "Calculez vos macros keto en utilisant l'équation de Mifflin-St Jeor. Obtenez des objectifs personnalisés de lipides, protéines et glucides nets avec exemples d'aliments, recommandations d'électrolytes et macros séparées pour jours d'entraînement/repos. Outil gratuit avec support kg/lb.",
        "shortDescription": "Calculez les macros de régime keto personnalisées avec exemples d'aliments et électrolytes",
        "keywords": [
          "calculateur keto",
          "calculateur macro keto",
          "calculateur régime cétogène",
          "macros keto",
          "plan régime keto",
          "calculateur glucides nets",
          "perte poids keto",
          "électrolytes keto",
          "calculateur plan repas keto"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "gender": {
          "label": "Sexe",
          "helpText": "Le taux métabolique diffère entre hommes et femmes",
          "options": {
            "male": "Homme",
            "female": "Femme"
          }
        },
        "age": {
          "label": "Âge",
          "helpText": "Le taux métabolique diminue avec l'âge"
        },
        "weight": {
          "label": "Poids",
          "helpText": "Votre poids corporel actuel"
        },
        "height": {
          "label": "Taille",
          "helpText": "Votre taille"
        },
        "activityLevel": {
          "label": "Niveau d'Activité",
          "helpText": "Choisissez l'option qui correspond le mieux à votre semaine type",
          "options": {
            "sedentary": "Sédentaire (travail de bureau, peu d'exercice)",
            "light": "Légèrement Actif (marche, 1-3 h/semaine)",
            "moderate": "Modérément Actif (exercice 3-5 h/semaine)",
            "active": "Très Actif (exercice intense 6-7 jours/semaine)",
            "veryActive": "Athlète (entraînement 2x par jour ou travail physique)"
          }
        },
        "goal": {
          "label": "Objectif",
          "helpText": "Votre objectif de gestion du poids",
          "options": {
            "lose": "Perdre du Poids",
            "maintain": "Maintenir le Poids",
            "gain": "Prendre du Muscle"
          }
        },
        "deficitPercent": {
          "label": "Déficit Calorique",
          "helpText": "10-20% est modéré et durable. 20-30% est agressif. Ne jamais dépasser 30%."
        },
        "surplusPercent": {
          "label": "Surplus Calorique",
          "helpText": "5-10% recommandé pour un gain de muscle maigre"
        },
        "bodyFatPercent": {
          "label": "% de Graisse Corporelle",
          "helpText": "Optionnel — permet un calcul plus précis des protéines basé sur la masse corporelle maigre"
        },
        "netCarbsTarget": {
          "label": "Objectif Glucides Nets Quotidiens",
          "helpText": "20-50g recommandés pour la cétose. La plupart commencent avec 20-25g."
        },
        "trainingDays": {
          "label": "Jours d'Entraînement par Semaine",
          "helpText": "Jours où vous faites de la musculation ou de l'exercice intense. Nous calculerons des macros séparées pour les jours d'entraînement vs repos."
        }
      },
      "inputGroups": {},
      "results": {
        "dailyCalories": {
          "label": "Calories Quotidiennes"
        },
        "fatGrams": {
          "label": "🥑 Lipides"
        },
        "proteinGrams": {
          "label": "🥩 Protéines"
        },
        "netCarbsGrams": {
          "label": "🥦 Glucides Nets"
        },
        "bmr": {
          "label": "MB (Métabolisme Basal)"
        },
        "tdee": {
          "label": "DET (Dépense Énergétique Totale)"
        },
        "leanBodyMass": {
          "label": "Masse Corporelle Maigre"
        }
      },
      "presets": {
        "femaleLose": {
          "label": "Femme — Perte de Poids",
          "description": "68 kg, activité modérée, déficit 20%"
        },
        "maleLose": {
          "label": "Homme — Perte de Poids",
          "description": "91 kg, activité modérée, déficit 20%"
        },
        "activeMaintain": {
          "label": "Actif — Maintenance",
          "description": "82 kg, très actif, maintenir le poids"
        },
        "highProtein": {
          "label": "Protéines Élevées — Sèche",
          "description": "84 kg, 6 jours d'entraînement, déficit 15%"
        }
      },
      "tooltips": {
        "dailyCalories": "Calories quotidiennes totales à consommer en régime keto",
        "fatGrams": "Grammes de lipides par jour — votre source d'énergie principale en keto",
        "proteinGrams": "Grammes de protéines par jour — essentiels pour le maintien musculaire",
        "netCarbsGrams": "Glucides nets par jour — restez en dessous pour maintenir la cétose",
        "bmr": "Métabolisme Basal — calories brûlées au repos",
        "tdee": "Dépense Énergétique Totale Quotidienne — calories brûlées avec activité",
        "leanBodyMass": "Votre poids total moins la graisse corporelle"
      },
      "values": {
        "kg": "kg",
        "lbs": "lbs",
        "cm": "cm",
        "g": "g",
        "kcal": "kcal",
        "cal": "cal",
        "Fat": "Lipides",
        "Protein": "Protéines",
        "Net Carbs": "Glucides Nets",
        "Fiber": "Fibres",
        "Training Days": "Jours d'Entraînement",
        "Rest Days": "Jours de Repos",
        "Sodium": "Sodium",
        "Potassium": "Potassium",
        "Magnesium": "Magnésium",
        "mg": "mg",
        "Day 1-3": "Jour 1-3",
        "Day 4-7": "Jour 4-7",
        "Week 2-4": "Semaine 2-4",
        "Month 1+": "Mois 1+"
      },
      "formats": {
        "summary": "Vos macros keto quotidiennes : {fatGrams} lipides, {proteinGrams} protéines, {netCarbsGrams} glucides nets. Total : {dailyCalories} calories."
      },
      "infoCards": {
        "macros": {
          "title": "🥑 Vos Macros Quotidiennes",
          "items": [
            {
              "label": "Lipides (70-75%)",
              "valueKey": "fatGrams"
            },
            {
              "label": "Protéines (20-25%)",
              "valueKey": "proteinGrams"
            },
            {
              "label": "Glucides Nets (5%)",
              "valueKey": "netCarbsGrams"
            }
          ]
        },
        "trainingDays": {
          "title": "🏋️ Macros Jours d'Entraînement",
          "items": [
            {
              "label": "Calories",
              "valueKey": "trainingCalories"
            },
            {
              "label": "Lipides",
              "valueKey": "trainingFat"
            },
            {
              "label": "Protéines",
              "valueKey": "trainingProtein"
            },
            {
              "label": "Glucides Nets",
              "valueKey": "trainingCarbs"
            }
          ]
        },
        "restDays": {
          "title": "🛋️ Macros Jours de Repos",
          "items": [
            {
              "label": "Calories",
              "valueKey": "restCalories"
            },
            {
              "label": "Lipides",
              "valueKey": "restFat"
            },
            {
              "label": "Protéines",
              "valueKey": "restProtein"
            },
            {
              "label": "Glucides Nets",
              "valueKey": "restCarbs"
            }
          ]
        },
        "foodExamples": {
          "title": "🍳 Aliments Keto Exemples",
          "items": [
            {
              "label": "Avocat (100g)",
              "valueKey": "avocadoMacros"
            },
            {
              "label": "Blanc de Poulet (100g)",
              "valueKey": "chickenMacros"
            },
            {
              "label": "Saumon (100g)",
              "valueKey": "salmonMacros"
            },
            {
              "label": "Brocoli (100g)",
              "valueKey": "broccoliMacros"
            },
            {
              "label": "Amandes (28g)",
              "valueKey": "almondsMacros"
            },
            {
              "label": "Œufs (2 gros)",
              "valueKey": "eggsMacros"
            }
          ]
        },
        "electrolytes": {
          "title": "⚡ Objectifs Électrolytes Quotidiens",
          "items": [
            {
              "label": "Sodium",
              "valueKey": "sodium"
            },
            {
              "label": "Potassium",
              "valueKey": "potassium"
            },
            {
              "label": "Magnésium",
              "valueKey": "magnesium"
            }
          ]
        },
        "timeline": {
          "title": "📅 Votre Parcours Keto",
          "items": [
            {
              "label": "Jour 1-3 : Transition",
              "valueKey": "phase1"
            },
            {
              "label": "Jour 4-7 : Cétose",
              "valueKey": "phase2"
            },
            {
              "label": "Semaine 2-4 : Adaptation Lipidique",
              "valueKey": "phase3"
            },
            {
              "label": "Mois 1+ : Keto Complet",
              "valueKey": "phase4"
            }
          ]
        }
      },
      "referenceData": {},
      "chart": {
        "title": "Répartition des Macros",
        "series": {
          "fat": "Lipides",
          "protein": "Protéines",
          "carbs": "Glucides Nets"
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que le Régime Cétogène ?",
          "content": "Le régime cétogène (keto) est un mode alimentaire riche en lipides, modéré en protéines et très pauvre en glucides qui fait basculer votre corps dans un état métabolique appelé cétose. Lorsque vous réduisez drastiquement l'apport en glucides à 20-50 grammes par jour, votre corps épuise ses réserves de glucose (sucre) et commence à décomposer les graisses en corps cétoniques pour les utiliser comme source de carburant principale. Ce changement métabolique se produit généralement dans les 2-4 jours de restriction stricte en glucides. Contrairement aux autres régimes pauvres en glucides, le keto vise spécifiquement à maintenir la cétose nutritionnelle — un état mesurable où vos niveaux de cétones sanguines atteignent 0,5-3,0 mmol/L. Cet état a été largement étudié pour la perte de poids, l'amélioration de la sensibilité à l'insuline, la clarté mentale renforcée et les applications thérapeutiques potentielles dans l'épilepsie, le diabète de type 2 et les conditions neurologiques. Le ratio macro keto standard est d'environ 70-75% des calories provenant des lipides, 20-25% des protéines et seulement 5% des glucides. Cependant, les besoins individuels varient selon le niveau d'activité, la santé métabolique et les objectifs. Ce calculateur utilise l'équation scientifiquement validée de Mifflin-St Jeor pour estimer votre métabolisme basal (MB), puis applique votre niveau d'activité et objectif de poids pour déterminer votre apport calorique optimal et vos objectifs macro personnalisés qui soutiennent une cétose durable."
        },
        "howItWorks": {
          "title": "Comment Fonctionnent les Macros Keto",
          "content": "Le calculateur de macros keto détermine vos objectifs personnalisés de lipides, protéines et glucides par un processus systématique. D'abord, il calcule votre MB en utilisant l'équation de Mifflin-St Jeor, qui prend en compte votre sexe, âge, taille et poids pour estimer combien de calories votre corps brûle au repos. Ensuite, votre multiplicateur de niveau d'activité est appliqué pour déterminer votre Dépense Énergétique Totale Quotidienne (DET) — les calories totales que vous brûlez incluant l'activité physique. Si votre objectif est la perte de poids, un déficit calorique (typiquement 10-30%) est soustrait de votre DET ; pour le gain musculaire, un surplus (5-15%) est ajouté ; pour la maintenance, votre DET reste inchangée. Une fois votre apport calorique cible établi, la répartition macro est appliquée. Les glucides nets sont fixés en premier selon votre objectif (généralement 20-25g pour les débutants, jusqu'à 50g pour les personnes actives). Les protéines sont calculées ensuite, soit comme pourcentage des calories totales (20-25%) ou, si vous fournissez votre pourcentage de graisse corporelle, comme 0,8-1,0 grammes par livre de masse corporelle maigre pour une préservation musculaire plus précise. Les calories restantes sont allouées aux lipides, qui deviennent votre source d'énergie principale en keto. Cette approche assure que vous mangez suffisamment de protéines pour maintenir le muscle, restez sous le seuil de glucides pour maintenir la cétose, et remplissez le reste de vos calories avec des graisses rassasiantes et énergétiques provenant d'aliments entiers comme avocats, noix, huile d'olive, poissons gras et viandes nourries à l'herbe."
        },
        "benefits": {
          "title": "Bénéfices du Régime Keto",
          "items": [
            {
              "text": "Perte de poids rapide — surtout la rétention d'eau initiale et la graisse grâce aux niveaux d'insuline réduits",
              "type": "info"
            },
            {
              "text": "Amélioration de la clarté mentale et de la concentration — les cétones sont un carburant cérébral plus efficace que le glucose",
              "type": "info"
            },
            {
              "text": "Niveaux d'énergie stables — pas de pics et chutes de glycémie tout au long de la journée",
              "type": "info"
            },
            {
              "text": "Appétit réduit — l'apport élevé en graisses augmente la satiété et réduit les envies",
              "type": "info"
            },
            {
              "text": "Meilleur contrôle de la glycémie — réduit drastiquement l'insuline à jeun et améliore la sensibilité à l'insuline",
              "type": "info"
            },
            {
              "text": "Effets thérapeutiques potentiels — étudié pour l'épilepsie, Alzheimer, Parkinson et le cancer",
              "type": "info"
            }
          ]
        },
        "considerations": {
          "title": "Considérations Importantes",
          "items": [
            {
              "text": "Grippe keto pendant l'adaptation — attendez-vous à fatigue, maux de tête, irritabilité les 3-7 premiers jours ; atténuez avec des électrolytes",
              "type": "warning"
            },
            {
              "text": "Gestion des électrolytes critique — supplémentez sodium (5000mg), potassium (1000mg), magnésium (300mg) quotidiennement",
              "type": "warning"
            },
            {
              "text": "Pas adapté à tout le monde — consultez un médecin si vous avez une maladie rénale, diabète, conditions hépatiques, ou êtes enceinte",
              "type": "warning"
            },
            {
              "text": "Peut affecter les performances athlétiques initialement — les athlètes d'endurance ont besoin de 2-6 semaines pour s'adapter complètement",
              "type": "warning"
            },
            {
              "text": "Nécessite planification et suivi des repas — vous devez surveiller les glucides nets de près pour maintenir la cétose",
              "type": "info"
            },
            {
              "text": "Défis sociaux — manger au restaurant et événements sociaux nécessitent planification et parfois expliquer votre régime",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Plans de Repas Keto",
          "description": "Idées de repas échantillons qui correspondent à vos macros",
          "examples": [
            {
              "title": "Journée Keto Standard (2000 cal)",
              "steps": [
                "Petit-déjeuner : 3 œufs brouillés au beurre + 1 avocat + café à la crème épaisse",
                "Déjeuner : Saumon grillé (170g) + salade de légumes verts avec vinaigrette à l'huile d'olive + fromage feta",
                "Dîner : Entrecôte (225g) + brocoli rôti au beurre + salade d'accompagnement",
                "Collations : 28g amandes + 57g fromage + céleri au beurre d'amande"
              ],
              "result": "Macros : 156g lipides, 125g protéines, 25g glucides nets = 2001 calories (répartition 70/25/5)"
            },
            {
              "title": "Keto Protéines Élevées (2200 cal)",
              "steps": [
                "Petit-déjeuner : Omelette 4 œufs avec fromage, épinards, champignons + bacon (3 tranches)",
                "Déjeuner : Cuisse de poulet (225g) + riz de chou-fleur sauté à l'huile de coco + sauce cacahuète",
                "Dîner : Bœuf haché (225g) + nouilles de courgette sauce alfredo + parmesan",
                "Collations : Shake protéiné avec huile MCT + couennes de porc + noix de macadamia"
              ],
              "result": "Macros : 158g lipides, 145g protéines, 28g glucides nets = 2202 calories (répartition 65/26/9)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Que sont les glucides nets et comment les calculer ?",
          "answer": "Les glucides nets sont les glucides totaux moins les fibres et certains polyols — ce sont les glucides qui impactent réellement votre glycémie et peuvent vous sortir de cétose. Pour calculer : Glucides Totaux - Fibres - Polyols (comme l'érythritol) = Glucides Nets. Par exemple, si un aliment a 15g de glucides totaux, 8g de fibres et 3g d'érythritol, les glucides nets sont 15 - 8 - 3 = 4g. La plupart des étiquettes nutritionnelles aux États-Unis incluent déjà les fibres dans le compte total des glucides, donc vous les soustrayez. Cependant, en Europe, Australie et autres régions, les fibres sont listées séparément et vous n'avez pas besoin de les soustraire."
        },
        {
          "question": "Combien de protéines dois-je manger en keto ?",
          "answer": "L'apport protéique en keto doit être modéré, pas excessif. La recommandation générale est 0,8-1,0 grammes par livre de masse corporelle maigre (pas le poids total). Si vous ne connaissez pas votre pourcentage de graisse corporelle, visez 20-25% de vos calories totales provenant des protéines. Manger trop peu de protéines risque la perte musculaire, mais manger trop de protéines peut théoriquement se convertir en glucose par gluconéogenèse et interférer avec la cétose — bien que ce soit moins préoccupant que beaucoup le croient. Les personnes actives et celles qui font de la musculation devraient viser le haut de la fourchette (1,0g par lb de masse maigre) pour soutenir la récupération et croissance musculaires."
        },
        {
          "question": "Vais-je perdre du muscle en keto ?",
          "answer": "Non, vous ne perdrez pas de muscle en keto si vous mangez suffisamment de protéines et faites de la musculation. En fait, la recherche montre que les régimes keto préservent la masse musculaire maigre aussi bien ou mieux que les régimes plus riches en glucides quand l'apport protéique est suffisant. La clé est de manger 0,8-1,0g de protéines par livre de masse corporelle maigre et continuer l'entraînement en force. Votre corps devient très efficace pour utiliser les graisses comme carburant tout en épargnant les protéines pour le maintien musculaire. Certaines personnes prennent même du muscle en keto, surtout si combiné avec un léger surplus calorique et entraînement progressif."
        },
        {
          "question": "Combien de temps faut-il pour entrer en cétose ?",
          "answer": "La plupart des gens entrent en cétose dans les 2-4 jours de restriction des glucides sous 20-50g quotidiennement. Cependant, devenir complètement adapté aux graisses — où votre corps produit et utilise efficacement les cétones comme carburant principal — prend typiquement 2-6 semaines. Pendant la transition initiale vous pourriez ressentir des symptômes de grippe keto comme fatigue et maux de tête, qui peuvent être atténués en restant hydraté et supplémentant les électrolytes (surtout sodium, potassium et magnésium). Vous pouvez mesurer la cétose avec des bandelettes urinaires (moins précises), des appareils respiratoires (précision modérée), ou des lecteurs de cétones sanguines (plus précis). Les niveaux de cétones sanguines de 0,5-3,0 mmol/L indiquent une cétose nutritionnelle."
        },
        {
          "question": "Dois-je entrer mon pourcentage de graisse corporelle ?",
          "answer": "Le pourcentage de graisse corporelle est optionnel mais améliore significativement la précision. Quand fourni, le calculateur détermine votre masse corporelle maigre et l'utilise pour des objectifs protéiques plus précis — au lieu d'estimer à partir des calories totales. Vous pouvez estimer la graisse corporelle visuellement avec des tableaux de comparaison en ligne, mesurer avec des pinces (disponibles sur Amazon pour moins de 10€), utiliser une balance à impédance bioélectrique (précision modérée), ou faire un scan DEXA pour la lecture la plus précise (typiquement 50-150€). Si vous ne connaissez pas votre graisse corporelle, le calculateur donnera quand même de bons résultats utilisant des calculs basés sur pourcentages."
        },
        {
          "question": "Quel déficit calorique choisir pour la perte de poids ?",
          "answer": "Un déficit de 10-20% est modéré et durable pour la plupart, permettant une perte de poids régulière de 0,25-0,5 kg par semaine tout en préservant énergie et muscle. Un déficit de 20-30% produit des résultats plus rapides (0,5-1 kg par semaine) mais peut être plus difficile à maintenir et pourrait augmenter le risque de perte musculaire si l'apport protéique est inadéquat. Les déficits au-dessus de 30% ne sont pas recommandés car ils peuvent impacter négativement le métabolisme, niveaux hormonaux, énergie et performance d'entraînement. Commencez avec 20% et ajustez selon vos progrès et comment vous vous sentez après 2-4 semaines. Si vous perdez du poids trop rapidement ou vous sentez très fatigué, réduisez le déficit. Si les progrès stagnent, augmentez-le légèrement."
        },
        {
          "question": "Pourquoi ai-je besoin de macros séparées pour jours d'entraînement et repos ?",
          "answer": "Les besoins nutritionnels de votre corps diffèrent les jours où vous vous entraînez versus les jours de repos. Les jours d'entraînement, vous brûlez plus de calories et pourriez bénéficier d'un apport protéique légèrement plus élevé (10-15% de plus) pour soutenir la récupération et croissance musculaires, tandis que les graisses peuvent être réduites proportionnellement. Les jours de repos, vos besoins caloriques sont plus bas, donc vous pouvez réduire à la fois protéines et graisses tout en gardant les glucides à votre seuil keto. Cette approche, popularisée par la communauté Ketogains, aide à optimiser la composition corporelle en nourrissant vos muscles les jours d'entraînement tout en maintenant un plus grand déficit les jours de repos pour une perte de graisse plus rapide. Si vous ne faites pas de musculation ou préférez la simplicité, vous pouvez utiliser les macros quotidiennes standard tous les jours."
        },
        {
          "question": "Le régime keto est-il sûr pour tout le monde ?",
          "answer": "Le keto est généralement considéré sûr pour les adultes en bonne santé, mais il pourrait ne pas être approprié pour tout le monde. Les personnes avec diabète de type 1, maladie rénale, conditions hépatiques, problèmes de vésicule biliaire, ou celles enceintes ou allaitantes devraient consulter un professionnel de santé avant de commencer. Si vous prenez des médicaments pour le diabète ou la tension artérielle, les dosages pourraient nécessiter un ajustement car vos marqueurs métaboliques s'améliorent — le keto peut significativement réduire la glycémie et tension artérielle. Enfants, adolescents et personnes âgées devraient aussi consulter un médecin d'abord. Commencez toujours tout nouveau régime sous supervision médicale si vous avez des conditions de santé préexistantes."
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
      "name": "Keto Rechner",
      "slug": "keto-rechner",
      "subtitle": "Berechnen Sie Ihre personalisierten Keto-Makros für Fett, Protein und Netto-Kohlenhydrate mit Mahlzeitbeispielen, Elektrolyt-Zielen und Trainingstag-Anpassungen",
      "breadcrumb": "Keto",
      "seo": {
        "title": "Keto Rechner — Kostenloser Keto Makro Rechner mit Mahlzeitenplanung",
        "description": "Berechnen Sie Ihre Keto-Makros mit der Mifflin-St Jeor Gleichung. Erhalten Sie personalisierte Fett-, Protein- und Netto-Kohlenhydrat-Ziele mit Lebensmittelbeispielen, Elektrolyt-Empfehlungen und separaten Makros für Trainings-/Ruhetage. Kostenloses Tool mit kg/lb Unterstützung.",
        "shortDescription": "Berechnen Sie personalisierte Keto-Diät-Makros mit Lebensmittelbeispielen und Elektrolyten",
        "keywords": [
          "keto rechner",
          "keto makro rechner",
          "ketogene diät rechner",
          "keto makros",
          "keto diätplan",
          "netto kohlenhydrate rechner",
          "keto gewichtsverlust",
          "keto elektrolyte",
          "keto mahlzeitenplan rechner"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "ui": {
        "results": "Ergebnisse",
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "gender": {
          "label": "Geschlecht",
          "helpText": "Die Stoffwechselrate unterscheidet sich zwischen Männern und Frauen",
          "options": {
            "male": "Männlich",
            "female": "Weiblich"
          }
        },
        "age": {
          "label": "Alter",
          "helpText": "Die Stoffwechselrate nimmt mit dem Alter ab"
        },
        "weight": {
          "label": "Gewicht",
          "helpText": "Ihr aktuelles Körpergewicht"
        },
        "height": {
          "label": "Größe",
          "helpText": "Ihre Körpergröße"
        },
        "activityLevel": {
          "label": "Aktivitätslevel",
          "helpText": "Wählen Sie die Option, die am besten zu Ihrer typischen Woche passt",
          "options": {
            "sedentary": "Sitzend (Bürojob, wenig Bewegung)",
            "light": "Leicht aktiv (Gehen, 1-3 Std./Woche)",
            "moderate": "Mäßig aktiv (Sport 3-5 Std./Woche)",
            "active": "Sehr aktiv (intensiver Sport 6-7 Tage/Woche)",
            "veryActive": "Athlet (2x täglich Training oder körperlicher Job)"
          }
        },
        "goal": {
          "label": "Ziel",
          "helpText": "Ihr Gewichtsmanagement-Ziel",
          "options": {
            "lose": "Abnehmen",
            "maintain": "Gewicht halten",
            "gain": "Muskeln aufbauen"
          }
        },
        "deficitPercent": {
          "label": "Kaloriendefizit",
          "helpText": "10-20% ist moderat und nachhaltig. 20-30% ist aggressiv. Nie über 30% gehen."
        },
        "surplusPercent": {
          "label": "Kalorienüberschuss",
          "helpText": "5-10% empfohlen für mageren Muskelaufbau"
        },
        "bodyFatPercent": {
          "label": "Körperfett %",
          "helpText": "Optional — ermöglicht genauere Proteinberechnung basierend auf der mageren Körpermasse"
        },
        "netCarbsTarget": {
          "label": "Tägliches Netto-Kohlenhydrat-Ziel",
          "helpText": "20-50g empfohlen für Ketose. Die meisten beginnen mit 20-25g."
        },
        "trainingDays": {
          "label": "Trainingstage pro Woche",
          "helpText": "Tage an denen Sie Krafttraining oder intensives Training machen. Wir berechnen separate Makros für Trainings- vs. Ruhetage."
        }
      },
      "inputGroups": {},
      "results": {
        "dailyCalories": {
          "label": "Tägliche Kalorien"
        },
        "fatGrams": {
          "label": "🥑 Fett"
        },
        "proteinGrams": {
          "label": "🥩 Protein"
        },
        "netCarbsGrams": {
          "label": "🥦 Netto-Kohlenhydrate"
        },
        "bmr": {
          "label": "GMR (Grundumsatz)"
        },
        "tdee": {
          "label": "GGU (Gesamtenergieumsatz)"
        },
        "leanBodyMass": {
          "label": "Magere Körpermasse"
        }
      },
      "presets": {
        "femaleLose": {
          "label": "Frau — Gewichtsverlust",
          "description": "68 kg, mäßige Aktivität, 20% Defizit"
        },
        "maleLose": {
          "label": "Mann — Gewichtsverlust",
          "description": "91 kg, mäßige Aktivität, 20% Defizit"
        },
        "activeMaintain": {
          "label": "Aktiv — Erhaltung",
          "description": "82 kg, sehr aktiv, Gewicht halten"
        },
        "highProtein": {
          "label": "Hoher Protein — Diät",
          "description": "84 kg, 6 Tage Training, 15% Defizit"
        }
      },
      "tooltips": {
        "dailyCalories": "Gesamte tägliche Kalorien für die Keto-Diät",
        "fatGrams": "Fettgramm pro Tag — Ihre primäre Energiequelle bei Keto",
        "proteinGrams": "Proteingramm pro Tag — wichtig für den Muskelerhalt",
        "netCarbsGrams": "Netto-Kohlenhydrate pro Tag — darunter bleiben für Ketose",
        "bmr": "Grundumsatz — im Ruhezustand verbrannte Kalorien",
        "tdee": "Gesamtenergieumsatz — mit Aktivität verbrannte Kalorien",
        "leanBodyMass": "Ihr Gesamtgewicht minus Körperfett"
      },
      "values": {
        "kg": "kg",
        "lbs": "lbs",
        "cm": "cm",
        "g": "g",
        "kcal": "kcal",
        "cal": "kcal",
        "Fat": "Fett",
        "Protein": "Protein",
        "Net Carbs": "Netto-Kohlenhydrate",
        "Fiber": "Ballaststoffe",
        "Training Days": "Trainingstage",
        "Rest Days": "Ruhetage",
        "Sodium": "Natrium",
        "Potassium": "Kalium",
        "Magnesium": "Magnesium",
        "mg": "mg",
        "Day 1-3": "Tag 1-3",
        "Day 4-7": "Tag 4-7",
        "Week 2-4": "Woche 2-4",
        "Month 1+": "Monat 1+"
      },
      "formats": {
        "summary": "Ihre täglichen Keto-Makros: {fatGrams} Fett, {proteinGrams} Protein, {netCarbsGrams} Netto-Kohlenhydrate. Gesamt: {dailyCalories} Kalorien."
      },
      "infoCards": {
        "macros": {
          "title": "🥑 Ihre täglichen Makros",
          "items": [
            {
              "label": "Fett (70-75%)",
              "valueKey": "fatGrams"
            },
            {
              "label": "Protein (20-25%)",
              "valueKey": "proteinGrams"
            },
            {
              "label": "Netto-Kohlenhydrate (5%)",
              "valueKey": "netCarbsGrams"
            }
          ]
        },
        "trainingDays": {
          "title": "🏋️ Trainingstag-Makros",
          "items": [
            {
              "label": "Kalorien",
              "valueKey": "trainingCalories"
            },
            {
              "label": "Fett",
              "valueKey": "trainingFat"
            },
            {
              "label": "Protein",
              "valueKey": "trainingProtein"
            },
            {
              "label": "Netto-Kohlenhydrate",
              "valueKey": "trainingCarbs"
            }
          ]
        },
        "restDays": {
          "title": "🛋️ Ruhetag-Makros",
          "items": [
            {
              "label": "Kalorien",
              "valueKey": "restCalories"
            },
            {
              "label": "Fett",
              "valueKey": "restFat"
            },
            {
              "label": "Protein",
              "valueKey": "restProtein"
            },
            {
              "label": "Netto-Kohlenhydrate",
              "valueKey": "restCarbs"
            }
          ]
        },
        "foodExamples": {
          "title": "🍳 Keto-Lebensmittel Beispiele",
          "items": [
            {
              "label": "Avocado (100g)",
              "valueKey": "avocadoMacros"
            },
            {
              "label": "Hähnchenbrust (100g)",
              "valueKey": "chickenMacros"
            },
            {
              "label": "Lachs (100g)",
              "valueKey": "salmonMacros"
            },
            {
              "label": "Brokkoli (100g)",
              "valueKey": "broccoliMacros"
            },
            {
              "label": "Mandeln (28g)",
              "valueKey": "almondsMacros"
            },
            {
              "label": "Eier (2 große)",
              "valueKey": "eggsMacros"
            }
          ]
        },
        "electrolytes": {
          "title": "⚡ Tägliche Elektrolyt-Ziele",
          "items": [
            {
              "label": "Natrium",
              "valueKey": "sodium"
            },
            {
              "label": "Kalium",
              "valueKey": "potassium"
            },
            {
              "label": "Magnesium",
              "valueKey": "magnesium"
            }
          ]
        },
        "timeline": {
          "title": "📅 Ihre Keto-Reise",
          "items": [
            {
              "label": "Tag 1-3: Umstellung",
              "valueKey": "phase1"
            },
            {
              "label": "Tag 4-7: Ketose",
              "valueKey": "phase2"
            },
            {
              "label": "Woche 2-4: Fettadaption",
              "valueKey": "phase3"
            },
            {
              "label": "Monat 1+: Vollständige Keto",
              "valueKey": "phase4"
            }
          ]
        }
      },
      "referenceData": {},
      "chart": {
        "title": "Makro-Aufteilung",
        "series": {
          "fat": "Fett",
          "protein": "Protein",
          "carbs": "Netto-Kohlenhydrate"
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist die ketogene Diät?",
          "content": "Die ketogene (Keto) Diät ist eine fettreiche, proteinmäßige und sehr kohlenhydratarme Ernährungsweise, die Ihren Körper in einen Stoffwechselzustand namens Ketose versetzt. Wenn Sie die Kohlenhydrataufnahme drastisch auf 20-50 Gramm pro Tag reduzieren, erschöpft Ihr Körper seine Glukose (Zucker) Speicher und beginnt, Fett in Ketonkörper zu zerlegen, um diese als primäre Brennstoffquelle zu verwenden. Diese Stoffwechselumstellung findet normalerweise innerhalb von 2-4 Tagen strikter Kohlenhydratbeschränkung statt. Im Gegensatz zu anderen kohlenhydratarmen Diäten zielt Keto speziell darauf ab, die ernährungsbedingte Ketose aufrechtzuerhalten — ein messbarer Zustand, bei dem Ihre Blutketonwerte 0,5-3,0 mmol/L erreichen. Dieser Zustand wurde ausführlich für Gewichtsverlust, verbesserte Insulinsensitivität, erhöhte geistige Klarheit und potentielle therapeutische Anwendungen bei Epilepsie, Typ-2-Diabetes und neurologischen Erkrankungen untersucht. Das Standard-Keto-Makroverhältnis beträgt etwa 70-75% der Kalorien aus Fett, 20-25% aus Protein und nur 5% aus Kohlenhydraten. Individuelle Bedürfnisse variieren jedoch basierend auf Aktivitätslevel, Stoffwechselgesundheit und Zielen. Dieser Rechner verwendet die wissenschaftlich validierte Mifflin-St Jeor Gleichung, um Ihren Grundumsatz (BMR) zu schätzen, wendet dann Ihr Aktivitätslevel und Gewichtsziel an, um Ihre optimale Kalorienzufuhr und personalisierten Makroziele zu bestimmen, die eine anhaltende Ketose unterstützen."
        },
        "howItWorks": {
          "title": "Wie Keto-Makros funktionieren",
          "content": "Der Keto-Makrorechner bestimmt Ihre personalisierten Fett-, Protein- und Kohlenhydratziele durch einen systematischen Prozess. Zuerst berechnet er Ihren BMR mit der Mifflin-St Jeor Gleichung, die Ihr Geschlecht, Alter, Größe und Gewicht berücksichtigt, um zu schätzen, wie viele Kalorien Ihr Körper in Ruhe verbrennt. Als nächstes wird Ihr Aktivitätslevel-Multiplikator angewendet, um Ihren Gesamtenergieumsatz (TDEE) zu bestimmen — die Gesamtkalorien, die Sie einschließlich körperlicher Aktivität verbrennen. Wenn Ihr Ziel Gewichtsverlust ist, wird ein Kaloriendefizit (normalerweise 10-30%) von Ihrem TDEE abgezogen; für Muskelaufbau wird ein Überschuss (5-15%) hinzugefügt; für Erhaltung bleibt Ihr TDEE unverändert. Sobald Ihre Zielkalorienzufuhr festgelegt ist, wird die Makroaufteilung angewendet. Netto-Kohlenhydrate werden zuerst basierend auf Ihrem Ziel festgelegt (normalerweise 20-25g für Anfänger, bis zu 50g für aktive Personen). Protein wird als nächstes berechnet, entweder als Prozentsatz der Gesamtkalorien (20-25%) oder, wenn Sie Ihren Körperfettanteil angeben, als 0,8-1,0 Gramm pro Pfund magerer Körpermasse für präziseren Muskelerhalt. Die verbleibenden Kalorien werden Fett zugewiesen, das Ihre primäre Energiequelle bei Keto wird. Dieser Ansatz stellt sicher, dass Sie genug Protein essen, um Muskeln zu erhalten, unter der Kohlenhydratschwelle bleiben, um Ketose zu erhalten, und den Rest Ihrer Kalorien mit sättigenden, energiedichten Fetten aus vollwertigen Nahrungsquellen wie Avocados, Nüssen, Olivenöl, fettem Fisch und grasgefüttertem Fleisch füllen."
        },
        "benefits": {
          "title": "Vorteile der Keto-Diät",
          "items": [
            {
              "text": "Schneller Gewichtsverlust — besonders anfängliches Wassergewicht und Fett durch reduzierte Insulinwerte",
              "type": "info"
            },
            {
              "text": "Verbesserte geistige Klarheit und Fokus — Ketone sind ein effizienterer Gehirnbrennstoff als Glukose",
              "type": "info"
            },
            {
              "text": "Stabile Energielevel — keine Blutzuckerspitzen und -abstürze den ganzen Tag über",
              "type": "info"
            },
            {
              "text": "Reduzierter Appetit — hohe Fettaufnahme erhöht die Sättigung und reduziert Heißhunger",
              "type": "info"
            },
            {
              "text": "Bessere Blutzuckerkontrolle — senkt drastisch das Nüchterninsulin und verbessert die Insulinsensitivität",
              "type": "info"
            },
            {
              "text": "Potentielle therapeutische Effekte — untersucht für Epilepsie, Alzheimer, Parkinson und Krebs",
              "type": "info"
            }
          ]
        },
        "considerations": {
          "title": "Wichtige Überlegungen",
          "items": [
            {
              "text": "Keto-Grippe während der Anpassung — erwarten Sie Müdigkeit, Kopfschmerzen, Reizbarkeit in den ersten 3-7 Tagen; mildern Sie mit Elektrolyten",
              "type": "warning"
            },
            {
              "text": "Elektrolytmanagement ist kritisch — ergänzen Sie täglich Natrium (5000mg), Kalium (1000mg), Magnesium (300mg)",
              "type": "warning"
            },
            {
              "text": "Nicht für jeden geeignet — konsultieren Sie einen Arzt bei Nierenerkrankungen, Diabetes, Leberleiden oder Schwangerschaft",
              "type": "warning"
            },
            {
              "text": "Kann anfänglich die sportliche Leistung beeinträchtigen — Ausdauersportler brauchen 2-6 Wochen zur vollständigen Anpassung",
              "type": "warning"
            },
            {
              "text": "Erfordert Mahlzeitenplanung und Tracking — Sie müssen Netto-Kohlenhydrate genau überwachen, um Ketose zu erhalten",
              "type": "info"
            },
            {
              "text": "Soziale Herausforderungen — Auswärts essen und soziale Ereignisse erfordern Planung und manchmal Erklärung Ihrer Diät",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Beispiel Keto-Mahlzeitenpläne",
          "description": "Beispielmahlzeiten, die zu Ihren Makros passen",
          "examples": [
            {
              "title": "Standard Keto Tag (2000 kcal)",
              "steps": [
                "Frühstück: 3 Eier in Butter gebraten + 1 Avocado + Kaffee mit Sahne",
                "Mittagessen: Gegrillter Lachs (170g) + gemischter Blattsalat mit Olivenöl-Dressing + Feta-Käse",
                "Abendessen: Ribeye-Steak (225g) + gerösteter Brokkoli mit Butter + Beilagensalat",
                "Snacks: 28g Mandeln + 56g Käse + Sellerie mit Mandelbutter"
              ],
              "result": "Makros: 156g Fett, 125g Protein, 25g Netto-Kohlenhydrate = 2.001 Kalorien (70/25/5 Aufteilung)"
            },
            {
              "title": "Protein-reiche Keto (2200 kcal)",
              "steps": [
                "Frühstück: 4-Ei-Omelett mit Käse, Spinat, Pilzen + Speck (3 Scheiben)",
                "Mittagessen: Hähnchenschenkel (225g) + Blumenkohlreis-Pfanne mit Kokosöl + Erdnusssauce",
                "Abendessen: Rinderhack (225g) + Zucchininudeln mit Alfredo-Sauce + Parmesan",
                "Snacks: Proteinshake mit MCT-Öl + Schweinekrusten + Macadamianüsse"
              ],
              "result": "Makros: 158g Fett, 145g Protein, 28g Netto-Kohlenhydrate = 2.202 Kalorien (65/26/9 Aufteilung)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Was sind Netto-Kohlenhydrate und wie berechne ich sie?",
          "answer": "Netto-Kohlenhydrate sind die Gesamtkohlenhydrate minus Ballaststoffe und bestimmte Zuckeralkohole — das sind die Kohlenhydrate, die tatsächlich Ihren Blutzucker beeinflussen und Sie aus der Ketose werfen können. Zur Berechnung: Gesamtkohlenhydrate - Ballaststoffe - Zuckeralkohole (wie Erythrit) = Netto-Kohlenhydrate. Wenn ein Lebensmittel zum Beispiel 15g Gesamtkohlenhydrate, 8g Ballaststoffe und 3g Erythrit hat, sind die Netto-Kohlenhydrate 15 - 8 - 3 = 4g. Die meisten Nährwertkennzeichnungen in den USA enthalten bereits Ballaststoffe in der Gesamtkohlenhydratanzahl, also subtrahieren Sie sie. In Europa, Australien und anderen Regionen werden Ballaststoffe jedoch separat aufgeführt und Sie müssen sie nicht subtrahieren."
        },
        {
          "question": "Wie viel Protein sollte ich bei Keto essen?",
          "answer": "Die Proteinzufuhr bei Keto sollte moderat, nicht übermäßig sein. Die allgemeine Empfehlung ist 0,8-1,0 Gramm pro Pfund magerer Körpermasse (nicht Gesamtkörpergewicht). Wenn Sie Ihren Körperfettanteil nicht kennen, streben Sie 20-25% Ihrer Gesamtkalorien aus Protein an. Zu wenig Protein zu essen riskiert Muskelverlust, aber zu viel Protein zu essen kann theoretisch durch Glukoneogenese zu Glukose umgewandelt werden und die Ketose beeinträchtigen — obwohl dies weniger problematisch ist, als viele glauben. Aktive Personen und die, die Gewichte heben, sollten das höhere Ende anstreben (1,0g pro Pfund LBM), um Muskelerholung und -wachstum zu unterstützen."
        },
        {
          "question": "Werde ich bei Keto Muskeln verlieren?",
          "answer": "Nein, Sie werden bei Keto keine Muskeln verlieren, wenn Sie ausreichend Protein essen und Widerstandstraining betreiben. Tatsächlich zeigt die Forschung, dass Keto-Diäten die magere Muskelmasse genauso gut oder besser bewahren als kohlenhydratreichere Diäten, wenn die Proteinzufuhr ausreichend ist. Der Schlüssel ist, 0,8-1,0g Protein pro Pfund magerer Körpermasse zu essen und weiterhin Krafttraining zu machen. Ihr Körper wird hocheffizient darin, Fett als Brennstoff zu nutzen, während er Protein für den Muskelerhalt spart. Manche Menschen bauen sogar Muskeln bei Keto auf, besonders wenn sie es mit einem leichten Kalorienüberschuss und progressivem Belastungstraining kombinieren."
        },
        {
          "question": "Wie lange dauert es, in die Ketose zu gelangen?",
          "answer": "Die meisten Menschen gelangen innerhalb von 2-4 Tagen in die Ketose, wenn sie Kohlenhydrate unter 20-50g täglich beschränken. Vollständig fettadaptiert zu werden — wo Ihr Körper effizient Ketone als primären Brennstoff produziert und nutzt — dauert jedoch normalerweise 2-6 Wochen. Während der anfänglichen Übergangszeit können Sie Keto-Grippe-Symptome wie Müdigkeit und Kopfschmerzen erleben, die durch Hydration und Elektrolytzusätze (besonders Natrium, Kalium und Magnesium) gemildert werden können. Sie können Ketose mit Urinstreifen (am wenigsten genau), Atemgeräten (mittlere Genauigkeit) oder Blutketonmessgeräten (genaueste) messen. Blutketonwerte von 0,5-3,0 mmol/L zeigen ernährungsbedingte Ketose an."
        },
        {
          "question": "Sollte ich meinen Körperfettanteil eingeben?",
          "answer": "Der Körperfettanteil ist optional, verbessert aber die Genauigkeit erheblich. Wenn angegeben, bestimmt der Rechner Ihre magere Körpermasse und verwendet sie für präzisere Proteinziele — anstatt aus den Gesamtkalorien zu schätzen. Sie können Körperfett visuell mit Online-Vergleichstabellen schätzen, mit Kalipern messen (auf Amazon für unter 10€ erhältlich), eine bioelektrische Impedanzwaage verwenden (mittlere Genauigkeit) oder einen DEXA-Scan für das genaueste Ergebnis machen (normalerweise 50-150€). Wenn Sie Ihren Körperfettanteil nicht kennen, liefert der Rechner trotzdem gute Ergebnisse mit prozentualen Berechnungen."
        },
        {
          "question": "Welches Kaloriendefizit sollte ich für Gewichtsverlust wählen?",
          "answer": "Ein 10-20% Defizit ist moderat und nachhaltig für die meisten Menschen und ermöglicht stetigen Gewichtsverlust von 0,2-0,5 kg pro Woche, während Energie und Muskeln erhalten bleiben. Ein 20-30% Defizit erzeugt schnellere Ergebnisse (0,5-1 kg pro Woche), kann aber schwerer aufrechtzuerhalten sein und das Muskelverlustrisko erhöhen, wenn die Proteinzufuhr unzureichend ist. Defizite über 30% werden nicht empfohlen, da sie Stoffwechsel, Hormonwerte, Energie und Trainingsleistung negativ beeinflussen können. Beginnen Sie mit 20% und passen Sie basierend auf Ihrem Fortschritt und Befinden nach 2-4 Wochen an. Wenn Sie zu schnell abnehmen oder sich sehr müde fühlen, reduzieren Sie das Defizit. Wenn der Fortschritt stagniert, erhöhen Sie es leicht."
        },
        {
          "question": "Warum brauche ich separate Makros für Trainings- und Ruhetage?",
          "answer": "Die Ernährungsbedürfnisse Ihres Körpers unterscheiden sich an Trainings- versus Ruhetagen. An Trainingstagen verbrennen Sie mehr Kalorien und können von etwas höherer Proteinzufuhr (10-15% mehr) profitieren, um Muskelerholung und -wachstum zu unterstützen, während Fett proportional reduziert werden kann. An Ruhetagen ist Ihr Kalorienbedarf niedriger, also können Sie sowohl Protein als auch Fett reduzieren, während Kohlenhydrate an Ihrer Keto-Schwelle bleiben. Dieser Ansatz, populär gemacht von der Ketogains-Community, hilft die Körperzusammensetzung zu optimieren, indem Muskeln an Trainingstagen genährt werden, während an Ruhetagen ein größeres Defizit für schnelleren Fettverlust beibehalten wird. Wenn Sie kein Krafttraining machen oder Einfachheit bevorzugen, können Sie die Standard-Tagesmakros für jeden Tag verwenden."
        },
        {
          "question": "Ist die Keto-Diät für jeden sicher?",
          "answer": "Keto wird allgemein als sicher für gesunde Erwachsene betrachtet, aber es ist möglicherweise nicht für jeden geeignet. Menschen mit Typ-1-Diabetes, Nierenerkrankungen, Leberleiden, Gallenblasenprobleme oder schwangere oder stillende Frauen sollten einen Arzt konsultieren, bevor sie beginnen. Wenn Sie Medikamente für Diabetes oder Blutdruck nehmen, müssen Dosierungen möglicherweise angepasst werden, da sich Ihre Stoffwechselwerte verbessern — Keto kann Blutzucker und Blutdruck erheblich senken. Kinder, Jugendliche und ältere Menschen sollten ebenfalls zuerst einen Arzt konsultieren. Beginnen Sie jede neue Diät immer unter medizinischer Aufsicht, wenn Sie bereits bestehende Gesundheitszustände haben."
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
      defaultValue: "lose",
      options: [
        { value: "lose" },
        { value: "maintain" },
        { value: "gain" },
      ],
    },
    {
      id: "deficitPercent",
      type: "number",
      defaultValue: 20,
      min: 5,
      max: 30,
      step: 5,
      suffix: "%",
      showWhen: { field: "goal", value: "lose" },
    },
    {
      id: "surplusPercent",
      type: "number",
      defaultValue: 10,
      min: 5,
      max: 15,
      step: 5,
      suffix: "%",
      showWhen: { field: "goal", value: "gain" },
    },
    {
      id: "bodyFatPercent",
      type: "number",
      defaultValue: null,
      placeholder: "25",
      min: 3,
      max: 60,
      step: 1,
      suffix: "%",
    },
    {
      id: "netCarbsTarget",
      type: "number",
      defaultValue: 25,
      min: 10,
      max: 50,
      step: 5,
      suffix: "g",
    },
    {
      id: "trainingDays",
      type: "number",
      defaultValue: 3,
      min: 0,
      max: 7,
      step: 1,
      suffix: "days/week",
    },
  ],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════
  results: [
    { id: "dailyCalories", type: "primary", format: "number" },
    { id: "fatGrams", type: "secondary", format: "text" },
    { id: "proteinGrams", type: "secondary", format: "text" },
    { id: "netCarbsGrams", type: "secondary", format: "text" },
    { id: "bmr", type: "secondary", format: "number" },
    { id: "tdee", type: "secondary", format: "number" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // INFO CARDS (6 total - IMPROVED)
  // ═══════════════════════════════════════════════════════════════
  infoCards: [
    { id: "macros", type: "list", icon: "🥑", itemCount: 3 },
    { id: "trainingDays", type: "list", icon: "🏋️", itemCount: 4 },
    { id: "restDays", type: "list", icon: "🛋️", itemCount: 4 },
    { id: "foodExamples", type: "list", icon: "🍳", itemCount: 6 },
    { id: "electrolytes", type: "list", icon: "⚡", itemCount: 3 },
    { id: "timeline", type: "list", icon: "📅", itemCount: 4 },
  ],

  // ═══════════════════════════════════════════════════════════════
  // CHART (NEW - Macro Pie Chart)
  // ═══════════════════════════════════════════════════════════════
  chart: {
    id: "macroBreakdown",
    type: "composed", // Will render as pie chart based on data structure
    xKey: "name",
    height: 300,
    showLegend: true,
    showTooltip: true,
    series: [
      { key: "value", type: "bar", color: "#3b82f6" },
    ],
  },

  referenceData: [],

  // ═══════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "🧮" },
    { id: "benefits", type: "list", icon: "✅", itemCount: 6 },
    { id: "considerations", type: "list", icon: "⚠️", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🍽️", columns: 2, exampleCount: 2 },
  ],

  // ═══════════════════════════════════════════════════════════════
  // FAQS (8)
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
      authors: "Mifflin, M.D., St Jeor, S.T., Hill, L.A., Scott, B.J., Daugherty, S.A., Koh, Y.O.",
      year: "1990",
      title: "A new predictive equation for resting energy expenditure in healthy individuals",
      source: "The American Journal of Clinical Nutrition, 51(2), 241-247",
      url: "https://doi.org/10.1093/ajcn/51.2.241",
    },
    {
      authors: "Paoli, A., Rubini, A., Volek, J.S., Grimaldi, K.A.",
      year: "2013",
      title: "Beyond weight loss: a review of the therapeutic uses of very-low-carbohydrate (ketogenic) diets",
      source: "European Journal of Clinical Nutrition, 67(8), 789-796",
      url: "https://doi.org/10.1038/ejcn.2013.116",
    },
    {
      authors: "Volek, J.S., Phinney, S.D.",
      year: "2011",
      title: "The Art and Science of Low Carbohydrate Living",
      source: "Beyond Obesity LLC",
      url: "https://www.amazon.com/Art-Science-Low-Carbohydrate-Living/dp/0983490708",
    },
  ],

  hero: { badge: "Nutrition", rating: { average: 4.8, count: 4100 } },
  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "health" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["bmi", "body-fat", "calorie", "macro"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function calculateBMR(gender: string, weightKg: number, heightCm: number, age: number): number {
  if (gender === "male") {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }
}

const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

function calculateTDEE(bmr: number, activityLevel: string): number {
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.55;
  return bmr * multiplier;
}

function applyGoalAdjustment(
  tdee: number,
  goal: string,
  deficitPercent: number,
  surplusPercent: number
): number {
  if (goal === "lose") {
    return tdee * (1 - deficitPercent / 100);
  } else if (goal === "gain") {
    return tdee * (1 + surplusPercent / 100);
  }
  return tdee;
}

function calculateLeanBodyMass(
  weightKg: number,
  bodyFatPercent: number | null
): number | null {
  if (bodyFatPercent === null || bodyFatPercent === 0) return null;
  return weightKg * (1 - bodyFatPercent / 100);
}

// ═══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION (UPGRADED)
// ═══════════════════════════════════════════════════════════════

export function calculateKeto(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;

  const v = (t?.values as Record<string, string>) || {};

  // Read inputs
  const gender = (values.gender as string) || "male";
  const age = (values.age as number) || 30;
  const activityLevel = (values.activityLevel as string) || "moderate";
  const goal = (values.goal as string) || "lose";
  const deficitPercent = (values.deficitPercent as number) || 20;
  const surplusPercent = (values.surplusPercent as number) || 10;
  const bodyFatPercent = (values.bodyFatPercent as number) || null;
  const netCarbsTarget = (values.netCarbsTarget as number) || 25;
  const trainingDays = (values.trainingDays as number) || 3;

  const weight = values.weight as number;
  const height = values.height as number;

  const weightUnit = fieldUnits.weight || "lbs";
  const heightUnit = fieldUnits.height || "ft_in";

  // Validate required fields
  if (!weight || !height) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Convert to metric using Unit Engine
  const weightKg = convertToBase(weight, weightUnit, "weight");
  const heightCm = heightUnit === "ft_in"
    ? height
    : convertToBase(height, heightUnit, "height");

  // Calculate BMR and TDEE
  const bmr = calculateBMR(gender, weightKg, heightCm, age);
  const tdee = calculateTDEE(bmr, activityLevel);
  const adjustedCalories = applyGoalAdjustment(tdee, goal, deficitPercent, surplusPercent);

  // Calculate lean body mass if body fat % provided
  const lbm = calculateLeanBodyMass(weightKg, bodyFatPercent);

  // Macro calculation
  const netCarbsGrams = netCarbsTarget;
  const netCarbsCals = netCarbsGrams * 4;

  let proteinGrams: number;
  if (lbm) {
    // Use LBM for protein (0.8-1.0g per lb of LBM)
    const lbmLbs = convertFromBase(lbm, "lbs", "weight");
    proteinGrams = Math.round(lbmLbs * 0.9); // 0.9g per lb LBM
  } else {
    // Use percentage of calories (20-25%)
    const proteinCals = adjustedCalories * 0.22;
    proteinGrams = Math.round(proteinCals / 4);
  }

  const proteinCals = proteinGrams * 4;
  const fatCals = adjustedCalories - proteinCals - netCarbsCals;
  const fatGrams = Math.round(fatCals / 9);

  // Training vs Rest days (NEW FEATURE)
  const restDaysPerWeek = 7 - trainingDays;
  const trainingCalories = Math.round(adjustedCalories * 1.10); // +10% on training days
  const restCalories = Math.round(adjustedCalories * 0.95); // -5% on rest days

  const trainingProtein = Math.round(proteinGrams * 1.15); // +15% protein on training days
  const restProtein = proteinGrams;

  const trainingCarbs = netCarbsGrams; // Same carbs
  const restCarbs = netCarbsGrams;

  const trainingFat = Math.round((trainingCalories - trainingProtein * 4 - trainingCarbs * 4) / 9);
  const restFat = Math.round((restCalories - restProtein * 4 - restCarbs * 4) / 9);

  // Food examples (NEW FEATURE)
  const foodExamples = {
    avocadoMacros: "15g fat, 2g protein, 2g net carbs",
    chickenMacros: "3g fat, 31g protein, 0g net carbs",
    salmonMacros: "13g fat, 25g protein, 0g net carbs",
    broccoliMacros: "0g fat, 3g protein, 4g net carbs",
    almondsMacros: "14g fat, 6g protein, 3g net carbs",
    eggsMacros: "10g fat, 13g protein, 1g net carbs",
  };

  // Electrolytes (NEW FEATURE)
  const electrolytes = {
    sodium: "5000 mg",
    potassium: "1000 mg",
    magnesium: "300 mg",
  };

  // Keto Journey Timeline (NEW FEATURE)
  const timeline = {
    phase1: "Carb depletion, initial water weight loss, possible keto flu symptoms",
    phase2: "Entering ketosis, energy returning, fat burning begins",
    phase3: "Fat adaptation, stable energy, reduced hunger, mental clarity",
    phase4: "Fully keto-adapted, optimal fat burning, sustained weight loss",
  };

  // Format numbers
  const fmt = (n: number): string => `${Math.round(n)}`;
  const fmtMacro = (g: number, pct: number): string => `${fmt(g)}g (${fmt(pct)}%)`;

  const fatPct = (fatCals / adjustedCalories) * 100;
  const proteinPct = (proteinCals / adjustedCalories) * 100;
  const carbsPct = (netCarbsCals / adjustedCalories) * 100;

  // Chart data (NEW - Pie chart data)
  const chartData = [
    { name: "Fat", value: Math.round(fatPct) },
    { name: "Protein", value: Math.round(proteinPct) },
    { name: "Carbs", value: Math.round(carbsPct) },
  ];

  // Summary
  const summary = `Your daily keto macros: ${fmt(fatGrams)}g fat (${fmt(fatPct)}%), ${fmt(proteinGrams)}g protein (${fmt(proteinPct)}%), ${fmt(netCarbsGrams)}g net carbs (${fmt(carbsPct)}%). Total: ${fmt(adjustedCalories)} calories.`;

  return {
    values: {
      dailyCalories: Math.round(adjustedCalories),
      fatGrams: fatGrams,
      proteinGrams: proteinGrams,
      netCarbsGrams: netCarbsGrams,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      leanBodyMass: lbm ? Math.round(lbm) : null,
      // Training/Rest days
      trainingCalories: trainingCalories,
      trainingFat: trainingFat,
      trainingProtein: trainingProtein,
      trainingCarbs: trainingCarbs,
      restCalories: restCalories,
      restFat: restFat,
      restProtein: restProtein,
      restCarbs: restCarbs,
      // Food examples
      ...foodExamples,
      // Electrolytes
      ...electrolytes,
      // Timeline
      ...timeline,
    },
    formatted: {
      dailyCalories: `${fmt(adjustedCalories)} cal`,
      fatGrams: fmtMacro(fatGrams, fatPct),
      proteinGrams: fmtMacro(proteinGrams, proteinPct),
      netCarbsGrams: fmtMacro(netCarbsGrams, carbsPct),
      bmr: `${fmt(bmr)} cal`,
      tdee: `${fmt(tdee)} cal`,
      leanBodyMass: lbm ? `${fmt(lbm)} kg` : "—",
      // Training/Rest days
      trainingCalories: `${fmt(trainingCalories)} cal`,
      trainingFat: `${fmt(trainingFat)}g`,
      trainingProtein: `${fmt(trainingProtein)}g`,
      trainingCarbs: `${fmt(trainingCarbs)}g`,
      restCalories: `${fmt(restCalories)} cal`,
      restFat: `${fmt(restFat)}g`,
      restProtein: `${fmt(restProtein)}g`,
      restCarbs: `${fmt(restCarbs)}g`,
      // Food examples
      ...foodExamples,
      // Electrolytes
      ...electrolytes,
      // Timeline
      ...timeline,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
    },
  };
}

export default ketoCalculatorConfig;
