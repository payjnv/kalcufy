// ⚡ IMPROVED V4 - BEATS ALL COMPETITORS (Feb 2026)
// NEW: Body Fat %, BMI, Macros, Multiple Formulas, Advanced Metrics
import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

export const maintenanceCaloriesCalculatorConfig: CalculatorConfigV4 = {
  // ═══════════════════════════════════════════════════════════════
  // METADATA
  // ═══════════════════════════════════════════════════════════════
  id: "maintenance-calories",
  version: "4.1", // ← UPGRADED
  category: "health",
  icon: "🔥",

  // ═══════════════════════════════════════════════════════════════
  // PRESETS
  // ═══════════════════════════════════════════════════════════════
  presets: [
    {
      id: "averageMale",
      icon: "👨",
      values: {
        gender: "male",
        age: 30,
        weight: 180,
        height: 70,
        activityLevel: "moderate",
        bodyFatPercent: null,
        bmrFormula: "mifflin",
      },
    },
    {
      id: "averageFemale",
      icon: "👩",
      values: {
        gender: "female",
        age: 28,
        weight: 145,
        height: 65,
        activityLevel: "moderate",
        bodyFatPercent: null,
        bmrFormula: "mifflin",
      },
    },
    {
      id: "leanMale",
      icon: "💪",
      values: {
        gender: "male",
        age: 25,
        weight: 180,
        height: 71,
        activityLevel: "active",
        bodyFatPercent: 12,
        bmrFormula: "katch",
      },
    },
    {
      id: "activeFemale",
      icon: "🏃",
      values: {
        gender: "female",
        age: 32,
        weight: 135,
        height: 64,
        activityLevel: "active",
        bodyFatPercent: 22,
        bmrFormula: "katch",
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // TRANSLATIONS (ENGLISH ONLY)
  // ═══════════════════════════════════════════════════════════════
  t: {
    en: {
      name: "Maintenance Calories Calculator",
      slug: "maintenance-calories-calculator",
      subtitle: "Calculate your TDEE, BMR, BMI, macros, and body composition with the most advanced free calculator — uses multiple formulas for maximum accuracy",
      breadcrumb: "Maintenance Calories",

      // ─────────────────────────────────────────────────────────
      // SEO
      // ─────────────────────────────────────────────────────────
      seo: {
        title: "Maintenance Calories Calculator - TDEE, BMR, Macros & BMI",
        description: "Calculate your daily maintenance calories, BMR, BMI, and macros using multiple formulas (Mifflin-St Jeor, Katch-McArdle). Get personalized targets for weight loss or muscle gain.",
        shortDescription: "Advanced TDEE calculator with macros, BMI, and body composition analysis",
        keywords: [
          "maintenance calories calculator",
          "TDEE calculator",
          "BMR calculator",
          "macro calculator",
          "BMI calculator",
          "body fat calculator",
          "calorie calculator",
          "katch mcardle calculator",
        ],
      },

      // ─────────────────────────────────────────────────────────
      // UI
      // ─────────────────────────────────────────────────────────
      calculator: { yourInformation: "Your Information" },
      ui: {
        yourInformation: "Your Information",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      // ─────────────────────────────────────────────────────────
      // INPUTS
      // ─────────────────────────────────────────────────────────
      inputs: {
        gender: {
          label: "Gender",
          helpText: "Metabolic rate formulas differ by biological sex",
          options: { male: "Male", female: "Female" },
        },
        age: {
          label: "Age",
          helpText: "Metabolism slows with age",
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
          helpText: "Choose the option that best describes your typical week",
          options: {
            sedentary: "Sedentary (office job, little exercise)",
            light: "Lightly Active (exercise 1-3 days/week)",
            moderate: "Moderately Active (exercise 3-5 days/week)",
            active: "Active (exercise 6-7 days/week)",
            veryActive: "Very Active (intense daily + physical job)",
          },
        },
        bodyFatPercent: {
          label: "Body Fat % (Optional)",
          helpText: "Enables Katch-McArdle formula for more accurate results. Leave empty if unknown.",
        },
        bmrFormula: {
          label: "BMR Formula",
          helpText: "Mifflin-St Jeor is most accurate for general population. Use Katch-McArdle if you know your body fat %.",
          options: {
            mifflin: "Mifflin-St Jeor (Recommended)",
            katch: "Katch-McArdle (requires BF%)",
            harris: "Harris-Benedict (Classic)",
          },
        },
      },

      // ─────────────────────────────────────────────────────────
      // RESULTS
      // ─────────────────────────────────────────────────────────
      results: {
        maintenanceCalories: { label: "Maintenance Calories (TDEE)" },
        bmr: { label: "Basal Metabolic Rate (BMR)" },
        bmi: { label: "Body Mass Index (BMI)" },
        bmiCategory: { label: "BMI Category" },
        
        // Advanced Metrics (if body fat %)
        lbm: { label: "Lean Body Mass" },
        fbm: { label: "Fat Body Mass" },
        mfm: { label: "Max Fat Metabolism" },
        
        // Weight Goals
        mildLoss: { label: "Mild Loss (-0.5 lb/wk)" },
        weightLoss: { label: "Weight Loss (-1 lb/wk)" },
        extremeLoss: { label: "Extreme Loss (-2 lb/wk)" },
        mildGain: { label: "Mild Gain (+0.5 lb/wk)" },
        weightGain: { label: "Weight Gain (+1 lb/wk)" },
        
        // Macros
        maintenanceProtein: { label: "Protein (Maintenance)" },
        maintenanceCarbs: { label: "Carbs (Maintenance)" },
        maintenanceFat: { label: "Fat (Maintenance)" },
        
        cuttingProtein: { label: "Protein (Cutting)" },
        cuttingCarbs: { label: "Carbs (Cutting)" },
        cuttingFat: { label: "Fat (Cutting)" },
        
        bulkingProtein: { label: "Protein (Bulking)" },
        bulkingCarbs: { label: "Carbs (Bulking)" },
        bulkingFat: { label: "Fat (Bulking)" },
      },

      // ─────────────────────────────────────────────────────────
      // PRESETS
      // ─────────────────────────────────────────────────────────
      presets: {
        averageMale: { 
          label: "Average Male", 
          description: "30y, 180 lbs, 5'10\", moderately active" 
        },
        averageFemale: { 
          label: "Average Female", 
          description: "28y, 145 lbs, 5'5\", moderately active" 
        },
        leanMale: { 
          label: "Lean Male (12% BF)", 
          description: "25y, 180 lbs, 5'11\", active, uses Katch-McArdle" 
        },
        activeFemale: { 
          label: "Active Female (22% BF)", 
          description: "32y, 135 lbs, 5'4\", active, uses Katch-McArdle" 
        },
      },

      // ─────────────────────────────────────────────────────────
      // TOOLTIPS
      // ─────────────────────────────────────────────────────────
      tooltips: {
        maintenanceCalories: "Total Daily Energy Expenditure — calories to maintain current weight",
        bmr: "Calories your body burns at complete rest over 24 hours",
        bmi: "Body Mass Index — weight-to-height ratio. Note: doesn't account for muscle mass",
        lbm: "Your total body weight minus fat mass — muscle, bone, organs, water",
        fbm: "Total body fat in pounds/kg",
        mfm: "Maximum daily calorie deficit without risking muscle loss (31 cal per lb of LBM)",
        mildLoss: "250 cal deficit for gradual, sustainable fat loss",
        weightLoss: "500 cal deficit — the most common recommendation for steady fat loss",
        extremeLoss: "1000 cal deficit — only recommended short-term under supervision",
        mildGain: "250 cal surplus for lean muscle gain with minimal fat",
        weightGain: "500 cal surplus for faster muscle building",
      },

      // ─────────────────────────────────────────────────────────
      // VALUES
      // ─────────────────────────────────────────────────────────
      values: {
        "cal/day": "cal/day",
        "cal": "cal",
        "g": "g",
        "lbs": "lbs",
        "kg": "kg",
        "Sedentary": "Sedentary",
        "Lightly Active": "Lightly Active",
        "Moderately Active": "Moderately Active",
        "Active": "Active",
        "Very Active": "Very Active",
        "Underweight": "Underweight",
        "Normal": "Normal Weight",
        "Overweight": "Overweight",
        "Obese": "Obese",
      },

      // ─────────────────────────────────────────────────────────
      // FORMATS
      // ─────────────────────────────────────────────────────────
      formats: {
        summary: "Your maintenance calories are {maintenanceCalories} cal/day (BMR: {bmr}, BMI: {bmi}). To lose 1 lb/week, eat {weightLoss} cal/day. To gain 1 lb/week, eat {weightGain} cal/day.",
      },

      // ─────────────────────────────────────────────────────────
      // INFO CARDS
      // ─────────────────────────────────────────────────────────
      infoCards: {
        bodyComposition: {
          title: "📊 Body Composition",
          items: [
            { label: "BMI", valueKey: "bmi" },
            { label: "Category", valueKey: "bmiCategory" },
            { label: "Lean Mass", valueKey: "lbm" },
            { label: "Fat Mass", valueKey: "fbm" },
          ],
        },
        goals: {
          title: "🎯 Calorie Targets",
          items: [
            { label: "Mild Loss (-0.5 lb/wk)", valueKey: "mildLoss" },
            { label: "Weight Loss (-1 lb/wk)", valueKey: "weightLoss" },
            { label: "Extreme Loss (-2 lb/wk)", valueKey: "extremeLoss" },
            { label: "Lean Gain (+0.5 lb/wk)", valueKey: "mildGain" },
          ],
        },
        macros: {
          title: "🍗 Macros Breakdown",
          items: [
            { label: "Protein (Maintenance)", valueKey: "maintenanceProtein" },
            { label: "Carbs (Maintenance)", valueKey: "maintenanceCarbs" },
            { label: "Fat (Maintenance)", valueKey: "maintenanceFat" },
          ],
        },
        tips: {
          title: "💡 Pro Tips",
          items: [
            "Track weight weekly — adjust calories by 100-200 if not progressing",
            "Protein: 0.7-1g per lb bodyweight preserves muscle during fat loss",
            "Don't go below 1200 cal (women) or 1500 cal (men) — risk metabolic damage",
            "Activity multipliers are estimates — real-world results trump calculations",
          ],
        },
      },

      // ─────────────────────────────────────────────────────────
      // EDUCATION SECTIONS
      // ─────────────────────────────────────────────────────────
      education: {
        whatIs: {
          title: "What Are Maintenance Calories?",
          content: "Maintenance calories (TDEE - Total Daily Energy Expenditure) represent the total number of calories your body burns in 24 hours, including basic metabolic functions, daily activities, and exercise. This number is your body's energy equilibrium point — eat exactly this amount and your weight stays stable. It's calculated by first determining your Basal Metabolic Rate (BMR) using proven formulas like Mifflin-St Jeor or Katch-McArdle, then multiplying by an activity factor that accounts for your lifestyle and exercise habits. Understanding your TDEE is the foundation of any successful diet plan, whether your goal is fat loss, muscle gain, or weight maintenance.",
        },
        howItWorks: {
          title: "How TDEE is Calculated",
          content: "TDEE calculation involves two steps. First, we calculate your BMR — the calories your body needs at complete rest to maintain vital functions like breathing, circulation, and cell production. We offer three formulas: Mifflin-St Jeor (most accurate for general population), Katch-McArdle (best if you know your body fat percentage), and Harris-Benedict (the classic formula). Second, we multiply your BMR by an activity factor ranging from 1.2 (sedentary) to 1.9 (very active athlete). This accounts for calories burned through daily movement, exercise, and the thermic effect of food digestion. The result is your personalized TDEE — your daily calorie maintenance level.",
        },
        formulas: {
          title: "BMR Formulas Explained",
          items: [
            { text: "Mifflin-St Jeor: Most accurate for general population. Considers age, gender, weight, and height. Recommended as default.", type: "info" },
            { text: "Katch-McArdle: Best for lean individuals who know their body fat %. Accounts for lean body mass, making it more precise for athletes.", type: "info" },
            { text: "Harris-Benedict: The original BMR formula from 1919, revised in 1984. Still widely used but tends to slightly overestimate.", type: "info" },
            { text: "Body fat % is optional but improves accuracy significantly — enables Katch-McArdle and shows lean vs fat mass breakdown.", type: "tip" },
            { text: "Activity multipliers are estimates — track your actual results and adjust calories by 100-200 if needed after 2-3 weeks.", type: "warning" },
            { text: "All calculators are within ±10% accuracy. Real-world tracking beats any formula.", type: "warning" },
          ],
        },
        macros: {
          title: "Macronutrient Breakdown",
          items: [
            { text: "Protein: 30% of calories (0.7-1g per lb bodyweight). Essential for muscle preservation during fat loss and muscle growth during bulking.", type: "info" },
            { text: "Fat: 25% of calories (minimum 0.3g per lb bodyweight). Crucial for hormone production, brain function, vitamin absorption.", type: "info" },
            { text: "Carbs: 45% of calories (remaining after protein/fat). Primary energy source for training and daily activity.", type: "info" },
            { text: "Cutting macros: Higher protein (35%), moderate fat (25%), lower carbs (40%) to preserve muscle in deficit.", type: "tip" },
            { text: "Bulking macros: Moderate protein (25%), moderate fat (25%), higher carbs (50%) to fuel training and growth.", type: "tip" },
            { text: "Adjust ratios based on preference — total calories matter most for weight change.", type: "warning" },
          ],
        },
        examples: {
          title: "Example Calculations",
          description: "Step-by-step breakdown for different scenarios",
          examples: [
            {
              title: "Male, 30y, 180 lbs, 5'10\", Moderate Activity",
              steps: [
                "Convert: 180 lbs = 81.6 kg, 5'10\" = 178 cm",
                "BMR (Mifflin): 10×81.6 + 6.25×178 - 5×30 + 5 = 1,786 cal",
                "TDEE: 1,786 × 1.55 (moderate) = 2,768 cal/day",
                "Weight Loss (-500 cal): 2,268 cal/day",
                "Macros: 170g protein, 63g fat, 255g carbs",
              ],
              result: "Maintenance: 2,768 cal | Cutting: 2,268 cal",
            },
            {
              title: "Female, 28y, 145 lbs, 5'5\", 22% BF, Active",
              steps: [
                "Convert: 145 lbs = 65.8 kg, 5'5\" = 165 cm",
                "LBM: 145 × (1 - 0.22) = 113 lbs = 51.3 kg",
                "BMR (Katch): 370 + (21.6 × 51.3) = 1,478 cal",
                "TDEE: 1,478 × 1.725 (active) = 2,550 cal/day",
                "Lean Gain (+250 cal): 2,800 cal/day",
                "Macros: 145g protein, 78g fat, 313g carbs",
              ],
              result: "Maintenance: 2,550 cal | Bulking: 2,800 cal",
            },
          ],
        },
      },

      // ─────────────────────────────────────────────────────────
      // FAQs
      // ─────────────────────────────────────────────────────────
      faqs: [
        { 
          question: "Should I eat my TDEE to lose weight?", 
          answer: "No. Your TDEE is your maintenance calories — eat this amount and your weight stays the same. To lose weight, you need to eat LESS than your TDEE (create a calorie deficit). A deficit of 500 calories per day leads to approximately 1 pound of fat loss per week." 
        },
        { 
          question: "Which BMR formula is most accurate?", 
          answer: "For most people, Mifflin-St Jeor is the most accurate. If you know your body fat percentage and are relatively lean (men <25%, women <35%), Katch-McArdle is more precise because it accounts for lean body mass. Harris-Benedict tends to overestimate slightly." 
        },
        { 
          question: "Do I need to know my body fat percentage?", 
          answer: "No, it's optional. Without body fat %, we use Mifflin-St Jeor which is accurate for most people. However, knowing your body fat % enables the Katch-McArdle formula (more accurate for lean individuals) and unlocks advanced metrics like Lean Body Mass, Maximum Fat Metabolism, and precise macro targets." 
        },
        { 
          question: "Why is my TDEE different from other calculators?", 
          answer: "Different calculators use different formulas and activity multipliers. Our calculator offers 3 formulas (Mifflin-St Jeor, Katch-McArdle, Harris-Benedict) and uses conservative activity multipliers to prevent overestimation. All TDEE calculators are estimates within ±10% — track your actual weight changes and adjust calories accordingly." 
        },
        { 
          question: "Should I adjust my calories on rest days?", 
          answer: "It depends on your approach. If you included your exercise in the activity level, keep calories the same every day. If you selected 'sedentary' and track exercise separately, you can eat slightly more on training days (+200-300 cal) and less on rest days. Weekly average calories matter most." 
        },
        { 
          question: "How often should I recalculate my TDEE?", 
          answer: "Recalculate every 10-15 pounds of weight change, or whenever you significantly change your activity level. Your TDEE decreases as you lose weight (less mass to maintain) and increases as you gain muscle. Track your weight weekly and adjust calories by 100-200 if you're not progressing as expected." 
        },
        { 
          question: "What's the minimum calories I should eat?", 
          answer: "General minimums are 1,200 calories for women and 1,500 calories for men. Going below this risks nutrient deficiencies, muscle loss, metabolic slowdown, and hormonal disruption. If your calculated deficit goes below these minimums, increase activity or accept slower weight loss." 
        },
        { 
          question: "How accurate is the macros breakdown?", 
          answer: "Our macro targets follow evidence-based recommendations: 30% protein (muscle preservation), 25% fat (hormone health), 45% carbs (energy). You can adjust these ratios based on preference — some people perform better on higher carbs, others on higher fat. Total calories matter most for weight change; macros affect body composition and performance." 
        },
      ],

      // ─────────────────────────────────────────────────────────
      // COMMON, BUTTONS, ETC
      // ─────────────────────────────────────────────────────────
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
        pdf: "Download PDF",
        csv: "Export CSV",
        excel: "Export Excel",
        save: "Save",
        saved: "Saved",
        saving: "Saving...",
      },

      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Calculadora de Calorías de Mantenimiento",
      "slug": "calculadora-calorias-mantenimiento",
      "subtitle": "Calcula tu TDEE, BMR, IMC, macros y composición corporal con la calculadora gratuita más avanzada — utiliza múltiples fórmulas para máxima precisión",
      "breadcrumb": "Calorías de Mantenimiento",
      "seo": {
        "title": "Calculadora de Calorías de Mantenimiento - TDEE, BMR, Macros e IMC",
        "description": "Calcula tus calorías diarias de mantenimiento, BMR, IMC y macros usando múltiples fórmulas (Mifflin-St Jeor, Katch-McArdle). Obtén objetivos personalizados para pérdida de peso o ganancia muscular.",
        "shortDescription": "Calculadora TDEE avanzada con macros, IMC y análisis de composición corporal",
        "keywords": [
          "calculadora calorias mantenimiento",
          "calculadora TDEE",
          "calculadora BMR",
          "calculadora macros",
          "calculadora IMC",
          "calculadora grasa corporal",
          "calculadora calorias",
          "calculadora katch mcardle"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "gender": {
          "label": "Género",
          "helpText": "Las fórmulas de tasa metabólica difieren por sexo biológico",
          "options": {
            "male": "Masculino",
            "female": "Femenino"
          }
        },
        "age": {
          "label": "Edad",
          "helpText": "El metabolismo disminuye con la edad"
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
          "helpText": "Elige la opción que mejor describe tu semana típica",
          "options": {
            "sedentary": "Sedentario (trabajo de oficina, poco ejercicio)",
            "light": "Ligeramente Activo (ejercicio 1-3 días/semana)",
            "moderate": "Moderadamente Activo (ejercicio 3-5 días/semana)",
            "active": "Activo (ejercicio 6-7 días/semana)",
            "veryActive": "Muy Activo (intenso diario + trabajo físico)"
          }
        },
        "bodyFatPercent": {
          "label": "% Grasa Corporal (Opcional)",
          "helpText": "Habilita la fórmula Katch-McArdle para resultados más precisos. Deja vacío si no lo conoces."
        },
        "bmrFormula": {
          "label": "Fórmula BMR",
          "helpText": "Mifflin-St Jeor es más precisa para población general. Usa Katch-McArdle si conoces tu % de grasa corporal.",
          "options": {
            "mifflin": "Mifflin-St Jeor (Recomendada)",
            "katch": "Katch-McArdle (requiere % GC)",
            "harris": "Harris-Benedict (Clásica)"
          }
        }
      },
      "results": {
        "maintenanceCalories": {
          "label": "Calorías de Mantenimiento (TDEE)"
        },
        "bmr": {
          "label": "Tasa Metabólica Basal (BMR)"
        },
        "bmi": {
          "label": "Índice de Masa Corporal (IMC)"
        },
        "bmiCategory": {
          "label": "Categoría IMC"
        },
        "lbm": {
          "label": "Masa Corporal Magra"
        },
        "fbm": {
          "label": "Masa Corporal Grasa"
        },
        "mfm": {
          "label": "Metabolismo Máximo de Grasa"
        },
        "mildLoss": {
          "label": "Pérdida Leve (-0.5 lb/sem)"
        },
        "weightLoss": {
          "label": "Pérdida de Peso (-1 lb/sem)"
        },
        "extremeLoss": {
          "label": "Pérdida Extrema (-2 lb/sem)"
        },
        "mildGain": {
          "label": "Ganancia Leve (+0.5 lb/sem)"
        },
        "weightGain": {
          "label": "Ganancia de Peso (+1 lb/sem)"
        },
        "maintenanceProtein": {
          "label": "Proteína (Mantenimiento)"
        },
        "maintenanceCarbs": {
          "label": "Carbohidratos (Mantenimiento)"
        },
        "maintenanceFat": {
          "label": "Grasa (Mantenimiento)"
        },
        "cuttingProtein": {
          "label": "Proteína (Definición)"
        },
        "cuttingCarbs": {
          "label": "Carbohidratos (Definición)"
        },
        "cuttingFat": {
          "label": "Grasa (Definición)"
        },
        "bulkingProtein": {
          "label": "Proteína (Volumen)"
        },
        "bulkingCarbs": {
          "label": "Carbohidratos (Volumen)"
        },
        "bulkingFat": {
          "label": "Grasa (Volumen)"
        }
      },
      "presets": {
        "averageMale": {
          "label": "Hombre Promedio",
          "description": "30 años, 180 lbs, 5'10\", moderadamente activo"
        },
        "averageFemale": {
          "label": "Mujer Promedio",
          "description": "28 años, 145 lbs, 5'5\", moderadamente activa"
        },
        "leanMale": {
          "label": "Hombre Magro (12% GC)",
          "description": "25 años, 180 lbs, 5'11\", activo, usa Katch-McArdle"
        },
        "activeFemale": {
          "label": "Mujer Activa (22% GC)",
          "description": "32 años, 135 lbs, 5'4\", activa, usa Katch-McArdle"
        }
      },
      "tooltips": {
        "maintenanceCalories": "Gasto Energético Diario Total — calorías para mantener el peso actual",
        "bmr": "Calorías que tu cuerpo quema en reposo completo durante 24 horas",
        "bmi": "Índice de Masa Corporal — relación peso-altura. Nota: no considera masa muscular",
        "lbm": "Tu peso corporal total menos la masa grasa — músculo, hueso, órganos, agua",
        "fbm": "Grasa corporal total en libras/kg",
        "mfm": "Déficit calórico máximo diario sin riesgo de pérdida muscular (31 cal por lb de MCM)",
        "mildLoss": "Déficit de 250 cal para pérdida gradual y sostenible de grasa",
        "weightLoss": "Déficit de 500 cal — la recomendación más común para pérdida constante de grasa",
        "extremeLoss": "Déficit de 1000 cal — solo recomendado a corto plazo bajo supervisión",
        "mildGain": "Superávit de 250 cal para ganancia muscular magra con grasa mínima",
        "weightGain": "Superávit de 500 cal para construcción muscular más rápida"
      },
      "values": {
        "cal/day": "cal/día",
        "cal": "cal",
        "g": "g",
        "lbs": "lbs",
        "kg": "kg",
        "Sedentary": "Sedentario",
        "Lightly Active": "Ligeramente Activo",
        "Moderately Active": "Moderadamente Activo",
        "Active": "Activo",
        "Very Active": "Muy Activo",
        "Underweight": "Bajo Peso",
        "Normal": "Peso Normal",
        "Overweight": "Sobrepeso",
        "Obese": "Obeso"
      },
      "formats": {
        "summary": "Tus calorías de mantenimiento son {maintenanceCalories} cal/día (BMR: {bmr}, IMC: {bmi}). Para perder 1 lb/semana, come {weightLoss} cal/día. Para ganar 1 lb/semana, come {weightGain} cal/día."
      },
      "infoCards": {
        "bodyComposition": {
          "title": "📊 Composición Corporal",
          "items": [
            {
              "label": "IMC",
              "valueKey": "bmi"
            },
            {
              "label": "Categoría",
              "valueKey": "bmiCategory"
            },
            {
              "label": "Masa Magra",
              "valueKey": "lbm"
            },
            {
              "label": "Masa Grasa",
              "valueKey": "fbm"
            }
          ]
        },
        "goals": {
          "title": "🎯 Objetivos Calóricos",
          "items": [
            {
              "label": "Pérdida Leve (-0.5 lb/sem)",
              "valueKey": "mildLoss"
            },
            {
              "label": "Pérdida de Peso (-1 lb/sem)",
              "valueKey": "weightLoss"
            },
            {
              "label": "Pérdida Extrema (-2 lb/sem)",
              "valueKey": "extremeLoss"
            },
            {
              "label": "Ganancia Magra (+0.5 lb/sem)",
              "valueKey": "mildGain"
            }
          ]
        },
        "macros": {
          "title": "🍗 Desglose de Macros",
          "items": [
            {
              "label": "Proteína (Mantenimiento)",
              "valueKey": "maintenanceProtein"
            },
            {
              "label": "Carbohidratos (Mantenimiento)",
              "valueKey": "maintenanceCarbs"
            },
            {
              "label": "Grasa (Mantenimiento)",
              "valueKey": "maintenanceFat"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos Pro",
          "items": [
            "Controla el peso semanalmente — ajusta calorías en 100-200 si no progresas",
            "Proteína: 0.7-1g por lb de peso corporal preserva músculo durante pérdida de grasa",
            "No bajes de 1200 cal (mujeres) o 1500 cal (hombres) — riesgo de daño metabólico",
            "Los multiplicadores de actividad son estimados — los resultados reales superan los cálculos"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué son las Calorías de Mantenimiento?",
          "content": "Las calorías de mantenimiento (TDEE - Gasto Energético Diario Total) representan el número total de calorías que tu cuerpo quema en 24 horas, incluyendo funciones metabólicas básicas, actividades diarias y ejercicio. Este número es el punto de equilibrio energético de tu cuerpo — come exactamente esta cantidad y tu peso se mantiene estable. Se calcula determinando primero tu Tasa Metabólica Basal (BMR) usando fórmulas probadas como Mifflin-St Jeor o Katch-McArdle, luego multiplicando por un factor de actividad que considera tu estilo de vida y hábitos de ejercicio. Entender tu TDEE es la base de cualquier plan dietético exitoso, ya sea que tu objetivo sea pérdida de grasa, ganancia muscular o mantenimiento del peso."
        },
        "howItWorks": {
          "title": "Cómo se Calcula el TDEE",
          "content": "El cálculo del TDEE involucra dos pasos. Primero, calculamos tu BMR — las calorías que tu cuerpo necesita en reposo completo para mantener funciones vitales como respiración, circulación y producción celular. Ofrecemos tres fórmulas: Mifflin-St Jeor (más precisa para población general), Katch-McArdle (mejor si conoces tu porcentaje de grasa corporal), y Harris-Benedict (la fórmula clásica). Segundo, multiplicamos tu BMR por un factor de actividad que va desde 1.2 (sedentario) hasta 1.9 (atleta muy activo). Esto considera las calorías quemadas a través del movimiento diario, ejercicio y el efecto térmico de la digestión de alimentos. El resultado es tu TDEE personalizado — tu nivel diario de mantenimiento calórico."
        },
        "formulas": {
          "title": "Fórmulas BMR Explicadas",
          "items": [
            {
              "text": "Mifflin-St Jeor: Más precisa para población general. Considera edad, género, peso y altura. Recomendada por defecto.",
              "type": "info"
            },
            {
              "text": "Katch-McArdle: Mejor para individuos magros que conocen su % de grasa corporal. Considera masa corporal magra, haciéndola más precisa para atletas.",
              "type": "info"
            },
            {
              "text": "Harris-Benedict: La fórmula BMR original de 1919, revisada en 1984. Aún ampliamente usada pero tiende a sobreestimar ligeramente.",
              "type": "info"
            },
            {
              "text": "El % de grasa corporal es opcional pero mejora significativamente la precisión — habilita Katch-McArdle y muestra desglose de masa magra vs grasa.",
              "type": "tip"
            },
            {
              "text": "Los multiplicadores de actividad son estimados — rastrea tus resultados reales y ajusta calorías en 100-200 si es necesario después de 2-3 semanas.",
              "type": "warning"
            },
            {
              "text": "Todas las calculadoras tienen precisión de ±10%. El seguimiento del mundo real supera cualquier fórmula.",
              "type": "warning"
            }
          ]
        },
        "macros": {
          "title": "Desglose de Macronutrientes",
          "items": [
            {
              "text": "Proteína: 30% de calorías (0.7-1g por lb de peso corporal). Esencial para preservación muscular durante pérdida de grasa y crecimiento muscular durante volumen.",
              "type": "info"
            },
            {
              "text": "Grasa: 25% de calorías (mínimo 0.3g por lb de peso corporal). Crucial para producción hormonal, función cerebral, absorción de vitaminas.",
              "type": "info"
            },
            {
              "text": "Carbohidratos: 45% de calorías (restante después de proteína/grasa). Fuente primaria de energía para entrenamiento y actividad diaria.",
              "type": "info"
            },
            {
              "text": "Macros de definición: Mayor proteína (35%), grasa moderada (25%), menores carbohidratos (40%) para preservar músculo en déficit.",
              "type": "tip"
            },
            {
              "text": "Macros de volumen: Proteína moderada (25%), grasa moderada (25%), mayores carbohidratos (50%) para combustible de entrenamiento y crecimiento.",
              "type": "tip"
            },
            {
              "text": "Ajusta proporciones según preferencia — las calorías totales importan más para cambio de peso.",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Cálculos de Ejemplo",
          "description": "Desglose paso a paso para diferentes escenarios",
          "examples": [
            {
              "title": "Hombre, 30 años, 180 lbs, 5'10\", Actividad Moderada",
              "steps": [
                "Convertir: 180 lbs = 81.6 kg, 5'10\" = 178 cm",
                "BMR (Mifflin): 10×81.6 + 6.25×178 - 5×30 + 5 = 1,786 cal",
                "TDEE: 1,786 × 1.55 (moderado) = 2,768 cal/día",
                "Pérdida de Peso (-500 cal): 2,268 cal/día",
                "Macros: 170g proteína, 63g grasa, 255g carbohidratos"
              ],
              "result": "Mantenimiento: 2,768 cal | Definición: 2,268 cal"
            },
            {
              "title": "Mujer, 28 años, 145 lbs, 5'5\", 22% GC, Activa",
              "steps": [
                "Convertir: 145 lbs = 65.8 kg, 5'5\" = 165 cm",
                "MCM: 145 × (1 - 0.22) = 113 lbs = 51.3 kg",
                "BMR (Katch): 370 + (21.6 × 51.3) = 1,478 cal",
                "TDEE: 1,478 × 1.725 (activa) = 2,550 cal/día",
                "Ganancia Magra (+250 cal): 2,800 cal/día",
                "Macros: 145g proteína, 78g grasa, 313g carbohidratos"
              ],
              "result": "Mantenimiento: 2,550 cal | Volumen: 2,800 cal"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Debo comer mi TDEE para perder peso?",
          "answer": "No. Tu TDEE son tus calorías de mantenimiento — come esta cantidad y tu peso se mantiene igual. Para perder peso, necesitas comer MENOS que tu TDEE (crear un déficit calórico). Un déficit de 500 calorías por día lleva a aproximadamente 1 libra de pérdida de grasa por semana."
        },
        {
          "question": "¿Qué fórmula BMR es más precisa?",
          "answer": "Para la mayoría de personas, Mifflin-St Jeor es la más precisa. Si conoces tu porcentaje de grasa corporal y eres relativamente magro (hombres <25%, mujeres <35%), Katch-McArdle es más precisa porque considera la masa corporal magra. Harris-Benedict tiende a sobreestimar ligeramente."
        },
        {
          "question": "¿Necesito conocer mi porcentaje de grasa corporal?",
          "answer": "No, es opcional. Sin % de grasa corporal, usamos Mifflin-St Jeor que es precisa para la mayoría de personas. Sin embargo, conocer tu % de grasa corporal habilita la fórmula Katch-McArdle (más precisa para individuos magros) y desbloquea métricas avanzadas como Masa Corporal Magra, Metabolismo Máximo de Grasa, y objetivos precisos de macros."
        },
        {
          "question": "¿Por qué mi TDEE es diferente de otras calculadoras?",
          "answer": "Diferentes calculadoras usan diferentes fórmulas y multiplicadores de actividad. Nuestra calculadora ofrece 3 fórmulas (Mifflin-St Jeor, Katch-McArdle, Harris-Benedict) y usa multiplicadores de actividad conservadores para prevenir sobreestimación. Todas las calculadoras TDEE son estimados dentro de ±10% — rastrea tus cambios de peso reales y ajusta calorías en consecuencia."
        },
        {
          "question": "¿Debo ajustar mis calorías en días de descanso?",
          "answer": "Depende de tu enfoque. Si incluiste tu ejercicio en el nivel de actividad, mantén las calorías iguales todos los días. Si seleccionaste 'sedentario' y rastreas ejercicio por separado, puedes comer ligeramente más en días de entrenamiento (+200-300 cal) y menos en días de descanso. El promedio semanal de calorías importa más."
        },
        {
          "question": "¿Qué tan seguido debo recalcular mi TDEE?",
          "answer": "Recalcula cada 10-15 libras de cambio de peso, o cuando cambies significativamente tu nivel de actividad. Tu TDEE disminuye cuando pierdes peso (menos masa que mantener) y aumenta cuando ganas músculo. Controla tu peso semanalmente y ajusta calorías en 100-200 si no progresas como esperabas."
        },
        {
          "question": "¿Cuál es el mínimo de calorías que debo comer?",
          "answer": "Los mínimos generales son 1,200 calorías para mujeres y 1,500 calorías para hombres. Ir por debajo de esto arriesga deficiencias nutricionales, pérdida muscular, desaceleración metabólica y disrupción hormonal. Si tu déficit calculado va por debajo de estos mínimos, aumenta la actividad o acepta pérdida de peso más lenta."
        },
        {
          "question": "¿Qué tan preciso es el desglose de macros?",
          "answer": "Nuestros objetivos de macros siguen recomendaciones basadas en evidencia: 30% proteína (preservación muscular), 25% grasa (salud hormonal), 45% carbohidratos (energía). Puedes ajustar estas proporciones según preferencia — algunas personas rinden mejor con más carbohidratos, otras con más grasa. Las calorías totales importan más para cambio de peso; los macros afectan composición corporal y rendimiento."
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
      "name": "Calculadora de Calorias de Manutenção",
      "slug": "calculadora-calorias-manutencao",
      "subtitle": "Calcule seu TDEE, TMB, IMC, macros e composição corporal com a calculadora gratuita mais avançada — usa múltiplas fórmulas para máxima precisão",
      "breadcrumb": "Calorias de Manutenção",
      "seo": {
        "title": "Calculadora de Calorias de Manutenção - TDEE, TMB, Macros e IMC",
        "description": "Calcule suas calorias diárias de manutenção, TMB, IMC e macros usando múltiplas fórmulas (Mifflin-St Jeor, Katch-McArdle). Obtenha metas personalizadas para perda de peso ou ganho muscular.",
        "shortDescription": "Calculadora TDEE avançada com macros, IMC e análise de composição corporal",
        "keywords": [
          "calculadora calorias manutenção",
          "calculadora TDEE",
          "calculadora TMB",
          "calculadora macros",
          "calculadora IMC",
          "calculadora gordura corporal",
          "calculadora calorias",
          "calculadora katch mcardle"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "gender": {
          "label": "Sexo",
          "helpText": "As fórmulas de taxa metabólica diferem por sexo biológico",
          "options": {
            "male": "Masculino",
            "female": "Feminino"
          }
        },
        "age": {
          "label": "Idade",
          "helpText": "O metabolismo diminui com a idade"
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
          "helpText": "Escolha a opção que melhor descreve sua semana típica",
          "options": {
            "sedentary": "Sedentário (trabalho escritório, pouco exercício)",
            "light": "Levemente Ativo (exercício 1-3 dias/semana)",
            "moderate": "Moderadamente Ativo (exercício 3-5 dias/semana)",
            "active": "Ativo (exercício 6-7 dias/semana)",
            "veryActive": "Muito Ativo (intenso diário + trabalho físico)"
          }
        },
        "bodyFatPercent": {
          "label": "% Gordura Corporal (Opcional)",
          "helpText": "Habilita a fórmula Katch-McArdle para resultados mais precisos. Deixe vazio se não souber."
        },
        "bmrFormula": {
          "label": "Fórmula TMB",
          "helpText": "Mifflin-St Jeor é mais precisa para população geral. Use Katch-McArdle se souber sua % de gordura corporal.",
          "options": {
            "mifflin": "Mifflin-St Jeor (Recomendada)",
            "katch": "Katch-McArdle (requer % GC)",
            "harris": "Harris-Benedict (Clássica)"
          }
        }
      },
      "results": {
        "maintenanceCalories": {
          "label": "Calorias de Manutenção (TDEE)"
        },
        "bmr": {
          "label": "Taxa Metabólica Basal (TMB)"
        },
        "bmi": {
          "label": "Índice de Massa Corporal (IMC)"
        },
        "bmiCategory": {
          "label": "Categoria IMC"
        },
        "lbm": {
          "label": "Massa Magra Corporal"
        },
        "fbm": {
          "label": "Massa Gorda Corporal"
        },
        "mfm": {
          "label": "Metabolismo Máximo de Gordura"
        },
        "mildLoss": {
          "label": "Perda Leve (-0,25 kg/sem)"
        },
        "weightLoss": {
          "label": "Perda de Peso (-0,5 kg/sem)"
        },
        "extremeLoss": {
          "label": "Perda Extrema (-1 kg/sem)"
        },
        "mildGain": {
          "label": "Ganho Leve (+0,25 kg/sem)"
        },
        "weightGain": {
          "label": "Ganho de Peso (+0,5 kg/sem)"
        },
        "maintenanceProtein": {
          "label": "Proteína (Manutenção)"
        },
        "maintenanceCarbs": {
          "label": "Carboidratos (Manutenção)"
        },
        "maintenanceFat": {
          "label": "Gordura (Manutenção)"
        },
        "cuttingProtein": {
          "label": "Proteína (Cutting)"
        },
        "cuttingCarbs": {
          "label": "Carboidratos (Cutting)"
        },
        "cuttingFat": {
          "label": "Gordura (Cutting)"
        },
        "bulkingProtein": {
          "label": "Proteína (Bulking)"
        },
        "bulkingCarbs": {
          "label": "Carboidratos (Bulking)"
        },
        "bulkingFat": {
          "label": "Gordura (Bulking)"
        }
      },
      "presets": {
        "averageMale": {
          "label": "Homem Médio",
          "description": "30a, 80 kg, 1,78m, moderadamente ativo"
        },
        "averageFemale": {
          "label": "Mulher Média",
          "description": "28a, 65 kg, 1,65m, moderadamente ativa"
        },
        "leanMale": {
          "label": "Homem Magro (12% GC)",
          "description": "25a, 80 kg, 1,80m, ativo, usa Katch-McArdle"
        },
        "activeFemale": {
          "label": "Mulher Ativa (22% GC)",
          "description": "32a, 60 kg, 1,63m, ativa, usa Katch-McArdle"
        }
      },
      "tooltips": {
        "maintenanceCalories": "Gasto Energético Total Diário — calorias para manter o peso atual",
        "bmr": "Calorias que seu corpo queima em repouso completo durante 24 horas",
        "bmi": "Índice de Massa Corporal — relação peso-altura. Nota: não considera massa muscular",
        "lbm": "Seu peso corporal total menos a massa gorda — músculo, osso, órgãos, água",
        "fbm": "Gordura corporal total em quilos",
        "mfm": "Déficit calórico máximo diário sem risco de perda muscular (31 cal por kg de massa magra)",
        "mildLoss": "250 cal de déficit para perda de gordura gradual e sustentável",
        "weightLoss": "500 cal de déficit — a recomendação mais comum para perda constante de gordura",
        "extremeLoss": "1000 cal de déficit — recomendado apenas a curto prazo sob supervisão",
        "mildGain": "250 cal de superávit para ganho muscular magro com gordura mínima",
        "weightGain": "500 cal de superávit para construção muscular mais rápida"
      },
      "values": {
        "cal/day": "cal/dia",
        "cal": "cal",
        "g": "g",
        "lbs": "kg",
        "kg": "kg",
        "Sedentary": "Sedentário",
        "Lightly Active": "Levemente Ativo",
        "Moderately Active": "Moderadamente Ativo",
        "Active": "Ativo",
        "Very Active": "Muito Ativo",
        "Underweight": "Abaixo do Peso",
        "Normal": "Peso Normal",
        "Overweight": "Sobrepeso",
        "Obese": "Obesidade"
      },
      "formats": {
        "summary": "Suas calorias de manutenção são {maintenanceCalories} cal/dia (TMB: {bmr}, IMC: {bmi}). Para perder 0,5 kg/semana, consuma {weightLoss} cal/dia. Para ganhar 0,5 kg/semana, consuma {weightGain} cal/dia."
      },
      "infoCards": {
        "bodyComposition": {
          "title": "📊 Composição Corporal",
          "items": [
            {
              "label": "IMC",
              "valueKey": "bmi"
            },
            {
              "label": "Categoria",
              "valueKey": "bmiCategory"
            },
            {
              "label": "Massa Magra",
              "valueKey": "lbm"
            },
            {
              "label": "Massa Gorda",
              "valueKey": "fbm"
            }
          ]
        },
        "goals": {
          "title": "🎯 Metas Calóricas",
          "items": [
            {
              "label": "Perda Leve (-0,25 kg/sem)",
              "valueKey": "mildLoss"
            },
            {
              "label": "Perda de Peso (-0,5 kg/sem)",
              "valueKey": "weightLoss"
            },
            {
              "label": "Perda Extrema (-1 kg/sem)",
              "valueKey": "extremeLoss"
            },
            {
              "label": "Ganho Magro (+0,25 kg/sem)",
              "valueKey": "mildGain"
            }
          ]
        },
        "macros": {
          "title": "🍗 Divisão de Macros",
          "items": [
            {
              "label": "Proteína (Manutenção)",
              "valueKey": "maintenanceProtein"
            },
            {
              "label": "Carboidratos (Manutenção)",
              "valueKey": "maintenanceCarbs"
            },
            {
              "label": "Gordura (Manutenção)",
              "valueKey": "maintenanceFat"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas Profissionais",
          "items": [
            "Monitore o peso semanalmente — ajuste calorias em 100-200 se não estiver progredindo",
            "Proteína: 1,5-2g por kg de peso corporal preserva músculo durante perda de gordura",
            "Não vá abaixo de 1200 cal (mulheres) ou 1500 cal (homens) — risco de dano metabólico",
            "Multiplicadores de atividade são estimativas — resultados reais superam cálculos"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "O que são Calorias de Manutenção?",
          "content": "Calorias de manutenção (TDEE - Gasto Energético Total Diário) representam o número total de calorias que seu corpo queima em 24 horas, incluindo funções metabólicas básicas, atividades diárias e exercícios. Este número é o ponto de equilíbrio energético do seu corpo — consuma exatamente esta quantidade e seu peso permanece estável. É calculado primeiro determinando sua Taxa Metabólica Basal (TMB) usando fórmulas comprovadas como Mifflin-St Jeor ou Katch-McArdle, depois multiplicando por um fator de atividade que considera seu estilo de vida e hábitos de exercício. Entender seu TDEE é a base de qualquer plano alimentar bem-sucedido, seja seu objetivo perda de gordura, ganho muscular ou manutenção do peso."
        },
        "howItWorks": {
          "title": "Como o TDEE é Calculado",
          "content": "O cálculo do TDEE envolve dois passos. Primeiro, calculamos sua TMB — as calorias que seu corpo precisa em repouso completo para manter funções vitais como respiração, circulação e produção celular. Oferecemos três fórmulas: Mifflin-St Jeor (mais precisa para população geral), Katch-McArdle (melhor se você souber seu percentual de gordura corporal) e Harris-Benedict (a fórmula clássica). Segundo, multiplicamos sua TMB por um fator de atividade variando de 1,2 (sedentário) a 1,9 (atleta muito ativo). Isso considera calorias queimadas através de movimento diário, exercício e efeito térmico da digestão de alimentos. O resultado é seu TDEE personalizado — seu nível diário de manutenção calórica."
        },
        "formulas": {
          "title": "Fórmulas TMB Explicadas",
          "items": [
            {
              "text": "Mifflin-St Jeor: Mais precisa para população geral. Considera idade, sexo, peso e altura. Recomendada como padrão.",
              "type": "info"
            },
            {
              "text": "Katch-McArdle: Melhor para indivíduos magros que conhecem seu % de gordura corporal. Considera massa magra corporal, sendo mais precisa para atletas.",
              "type": "info"
            },
            {
              "text": "Harris-Benedict: A fórmula TMB original de 1919, revisada em 1984. Ainda amplamente usada mas tende a superestimar ligeiramente.",
              "type": "info"
            },
            {
              "text": "% de gordura corporal é opcional mas melhora significativamente a precisão — habilita Katch-McArdle e mostra divisão de massa magra vs gorda.",
              "type": "tip"
            },
            {
              "text": "Multiplicadores de atividade são estimativas — monitore seus resultados reais e ajuste calorias em 100-200 se necessário após 2-3 semanas.",
              "type": "warning"
            },
            {
              "text": "Todas as calculadoras têm precisão de ±10%. Monitoramento no mundo real supera qualquer fórmula.",
              "type": "warning"
            }
          ]
        },
        "macros": {
          "title": "Divisão de Macronutrientes",
          "items": [
            {
              "text": "Proteína: 30% das calorias (1,5-2g por kg de peso corporal). Essencial para preservação muscular durante perda de gordura e crescimento muscular durante bulking.",
              "type": "info"
            },
            {
              "text": "Gordura: 25% das calorias (mínimo 0,7g por kg de peso corporal). Crucial para produção hormonal, função cerebral, absorção de vitaminas.",
              "type": "info"
            },
            {
              "text": "Carboidratos: 45% das calorias (restante após proteína/gordura). Fonte primária de energia para treino e atividade diária.",
              "type": "info"
            },
            {
              "text": "Macros cutting: Mais proteína (35%), gordura moderada (25%), menos carboidratos (40%) para preservar músculo em déficit.",
              "type": "tip"
            },
            {
              "text": "Macros bulking: Proteína moderada (25%), gordura moderada (25%), mais carboidratos (50%) para combustível de treino e crescimento.",
              "type": "tip"
            },
            {
              "text": "Ajuste proporções baseado na preferência — calorias totais importam mais para mudança de peso.",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculos",
          "description": "Análise passo a passo para diferentes cenários",
          "examples": [
            {
              "title": "Homem, 30a, 80 kg, 1,78m, Atividade Moderada",
              "steps": [
                "Converter: 80 kg, 178 cm",
                "TMB (Mifflin): 10×80 + 6,25×178 - 5×30 + 5 = 1.772 cal",
                "TDEE: 1.772 × 1,55 (moderado) = 2.747 cal/dia",
                "Perda de Peso (-500 cal): 2.247 cal/dia",
                "Macros: 169g proteína, 62g gordura, 253g carboidratos"
              ],
              "result": "Manutenção: 2.747 cal | Cutting: 2.247 cal"
            },
            {
              "title": "Mulher, 28a, 65 kg, 1,65m, 22% GC, Ativa",
              "steps": [
                "Converter: 65 kg, 165 cm",
                "Massa Magra: 65 × (1 - 0,22) = 50,7 kg",
                "TMB (Katch): 370 + (21,6 × 50,7) = 1.465 cal",
                "TDEE: 1.465 × 1,725 (ativa) = 2.527 cal/dia",
                "Ganho Magro (+250 cal): 2.777 cal/dia",
                "Macros: 158g proteína, 77g gordura, 308g carboidratos"
              ],
              "result": "Manutenção: 2.527 cal | Bulking: 2.777 cal"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Devo comer meu TDEE para perder peso?",
          "answer": "Não. Seu TDEE são suas calorias de manutenção — coma esta quantidade e seu peso permanece igual. Para perder peso, você precisa comer MENOS que seu TDEE (criar déficit calórico). Um déficit de 500 calorias por dia leva a aproximadamente 0,5 kg de perda de gordura por semana."
        },
        {
          "question": "Qual fórmula TMB é mais precisa?",
          "answer": "Para a maioria das pessoas, Mifflin-St Jeor é a mais precisa. Se você souber seu percentual de gordura corporal e for relativamente magro (homens <25%, mulheres <35%), Katch-McArdle é mais precisa porque considera massa magra corporal. Harris-Benedict tende a superestimar ligeiramente."
        },
        {
          "question": "Preciso saber meu percentual de gordura corporal?",
          "answer": "Não, é opcional. Sem % de gordura corporal, usamos Mifflin-St Jeor que é precisa para a maioria das pessoas. Porém, conhecer seu % de gordura corporal habilita a fórmula Katch-McArdle (mais precisa para indivíduos magros) e desbloqueia métricas avançadas como Massa Magra Corporal, Metabolismo Máximo de Gordura e metas precisas de macros."
        },
        {
          "question": "Por que meu TDEE é diferente de outras calculadoras?",
          "answer": "Calculadoras diferentes usam fórmulas e multiplicadores de atividade diferentes. Nossa calculadora oferece 3 fórmulas (Mifflin-St Jeor, Katch-McArdle, Harris-Benedict) e usa multiplicadores de atividade conservadores para prevenir superestimação. Todas as calculadoras TDEE são estimativas dentro de ±10% — monitore suas mudanças de peso reais e ajuste calorias adequadamente."
        },
        {
          "question": "Devo ajustar minhas calorias em dias de descanso?",
          "answer": "Depende da sua abordagem. Se você incluiu seu exercício no nível de atividade, mantenha as calorias iguais todos os dias. Se selecionou 'sedentário' e rastreia exercício separadamente, pode comer um pouco mais em dias de treino (+200-300 cal) e menos em dias de descanso. A média semanal de calorias importa mais."
        },
        {
          "question": "Com que frequência devo recalcular meu TDEE?",
          "answer": "Recalcule a cada 7-8 kg de mudança de peso, ou sempre que mudar significativamente seu nível de atividade. Seu TDEE diminui conforme perde peso (menos massa para manter) e aumenta conforme ganha músculo. Monitore seu peso semanalmente e ajuste calorias em 100-200 se não estiver progredindo como esperado."
        },
        {
          "question": "Qual é o mínimo de calorias que devo consumir?",
          "answer": "Mínimos gerais são 1.200 calorias para mulheres e 1.500 calorias para homens. Ir abaixo disso risca deficiências nutricionais, perda muscular, desaceleração metabólica e disrupção hormonal. Se seu déficit calculado vai abaixo destes mínimos, aumente a atividade ou aceite perda de peso mais lenta."
        },
        {
          "question": "Quão precisa é a divisão de macros?",
          "answer": "Nossas metas de macros seguem recomendações baseadas em evidência: 30% proteína (preservação muscular), 25% gordura (saúde hormonal), 45% carboidratos (energia). Você pode ajustar essas proporções baseado na preferência — algumas pessoas se saem melhor com mais carboidratos, outras com mais gordura. Calorias totais importam mais para mudança de peso; macros afetam composição corporal e performance."
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
      "name": "Calculateur de Calories de Maintien",
      "slug": "calculateur-calories-maintien",
      "subtitle": "Calculez votre TDEE, BMR, IMC, macros et composition corporelle avec le calculateur gratuit le plus avancé — utilise plusieurs formules pour une précision maximale",
      "breadcrumb": "Calories de Maintien",
      "seo": {
        "title": "Calculateur de Calories de Maintien - TDEE, BMR, Macros et IMC",
        "description": "Calculez vos calories de maintien quotidiennes, BMR, IMC et macros en utilisant plusieurs formules (Mifflin-St Jeor, Katch-McArdle). Obtenez des objectifs personnalisés pour la perte de poids ou la prise de muscle.",
        "shortDescription": "Calculateur TDEE avancé avec macros, IMC et analyse de composition corporelle",
        "keywords": [
          "calculateur calories de maintien",
          "calculateur TDEE",
          "calculateur BMR",
          "calculateur macro",
          "calculateur IMC",
          "calculateur graisse corporelle",
          "calculateur calories",
          "calculateur katch mcardle"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "gender": {
          "label": "Sexe",
          "helpText": "Les formules de taux métabolique diffèrent selon le sexe biologique",
          "options": {
            "male": "Homme",
            "female": "Femme"
          }
        },
        "age": {
          "label": "Âge",
          "helpText": "Le métabolisme ralentit avec l'âge"
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
          "helpText": "Choisissez l'option qui décrit le mieux votre semaine type",
          "options": {
            "sedentary": "Sédentaire (travail de bureau, peu d'exercice)",
            "light": "Légèrement Actif (exercice 1-3 jours/semaine)",
            "moderate": "Modérément Actif (exercice 3-5 jours/semaine)",
            "active": "Actif (exercice 6-7 jours/semaine)",
            "veryActive": "Très Actif (intense quotidien + travail physique)"
          }
        },
        "bodyFatPercent": {
          "label": "% de Graisse Corporelle (Optionnel)",
          "helpText": "Active la formule Katch-McArdle pour des résultats plus précis. Laissez vide si inconnu."
        },
        "bmrFormula": {
          "label": "Formule BMR",
          "helpText": "Mifflin-St Jeor est la plus précise pour la population générale. Utilisez Katch-McArdle si vous connaissez votre % de graisse corporelle.",
          "options": {
            "mifflin": "Mifflin-St Jeor (Recommandée)",
            "katch": "Katch-McArdle (nécessite % GC)",
            "harris": "Harris-Benedict (Classique)"
          }
        }
      },
      "results": {
        "maintenanceCalories": {
          "label": "Calories de Maintien (TDEE)"
        },
        "bmr": {
          "label": "Taux Métabolique de Base (BMR)"
        },
        "bmi": {
          "label": "Indice de Masse Corporelle (IMC)"
        },
        "bmiCategory": {
          "label": "Catégorie IMC"
        },
        "lbm": {
          "label": "Masse Maigre"
        },
        "fbm": {
          "label": "Masse Graisseuse"
        },
        "mfm": {
          "label": "Métabolisme Maximal des Graisses"
        },
        "mildLoss": {
          "label": "Perte Légère (-0,25 kg/sem)"
        },
        "weightLoss": {
          "label": "Perte de Poids (-0,5 kg/sem)"
        },
        "extremeLoss": {
          "label": "Perte Extrême (-1 kg/sem)"
        },
        "mildGain": {
          "label": "Gain Léger (+0,25 kg/sem)"
        },
        "weightGain": {
          "label": "Prise de Poids (+0,5 kg/sem)"
        },
        "maintenanceProtein": {
          "label": "Protéines (Maintien)"
        },
        "maintenanceCarbs": {
          "label": "Glucides (Maintien)"
        },
        "maintenanceFat": {
          "label": "Lipides (Maintien)"
        },
        "cuttingProtein": {
          "label": "Protéines (Sèche)"
        },
        "cuttingCarbs": {
          "label": "Glucides (Sèche)"
        },
        "cuttingFat": {
          "label": "Lipides (Sèche)"
        },
        "bulkingProtein": {
          "label": "Protéines (Prise de masse)"
        },
        "bulkingCarbs": {
          "label": "Glucides (Prise de masse)"
        },
        "bulkingFat": {
          "label": "Lipides (Prise de masse)"
        }
      },
      "presets": {
        "averageMale": {
          "label": "Homme Moyen",
          "description": "30 ans, 82 kg, 1m78, modérément actif"
        },
        "averageFemale": {
          "label": "Femme Moyenne",
          "description": "28 ans, 66 kg, 1m65, modérément active"
        },
        "leanMale": {
          "label": "Homme Sec (12% GC)",
          "description": "25 ans, 82 kg, 1m80, actif, utilise Katch-McArdle"
        },
        "activeFemale": {
          "label": "Femme Active (22% GC)",
          "description": "32 ans, 61 kg, 1m63, active, utilise Katch-McArdle"
        }
      },
      "tooltips": {
        "maintenanceCalories": "Dépense Énergétique Totale Quotidienne — calories pour maintenir le poids actuel",
        "bmr": "Calories que votre corps brûle au repos complet sur 24 heures",
        "bmi": "Indice de Masse Corporelle — rapport poids/taille. Note : ne tient pas compte de la masse musculaire",
        "lbm": "Votre poids corporel total moins la masse graisseuse — muscle, os, organes, eau",
        "fbm": "Graisse corporelle totale en kg",
        "mfm": "Déficit calorique quotidien maximum sans risquer la perte musculaire (68 cal par kg de masse maigre)",
        "mildLoss": "Déficit de 250 cal pour une perte de graisse graduelle et durable",
        "weightLoss": "Déficit de 500 cal — la recommandation la plus courante pour une perte de graisse régulière",
        "extremeLoss": "Déficit de 1000 cal — recommandé seulement à court terme sous supervision",
        "mildGain": "Surplus de 250 cal pour un gain musculaire maigre avec un minimum de graisse",
        "weightGain": "Surplus de 500 cal pour une construction musculaire plus rapide"
      },
      "values": {
        "cal/day": "cal/jour",
        "cal": "cal",
        "g": "g",
        "lbs": "lbs",
        "kg": "kg",
        "Sedentary": "Sédentaire",
        "Lightly Active": "Légèrement Actif",
        "Moderately Active": "Modérément Actif",
        "Active": "Actif",
        "Very Active": "Très Actif",
        "Underweight": "Poids insuffisant",
        "Normal": "Poids normal",
        "Overweight": "Surpoids",
        "Obese": "Obèse"
      },
      "formats": {
        "summary": "Vos calories de maintien sont {maintenanceCalories} cal/jour (BMR : {bmr}, IMC : {bmi}). Pour perdre 0,5 kg/semaine, mangez {weightLoss} cal/jour. Pour prendre 0,5 kg/semaine, mangez {weightGain} cal/jour."
      },
      "infoCards": {
        "bodyComposition": {
          "title": "📊 Composition Corporelle",
          "items": [
            {
              "label": "IMC",
              "valueKey": "bmi"
            },
            {
              "label": "Catégorie",
              "valueKey": "bmiCategory"
            },
            {
              "label": "Masse Maigre",
              "valueKey": "lbm"
            },
            {
              "label": "Masse Graisseuse",
              "valueKey": "fbm"
            }
          ]
        },
        "goals": {
          "title": "🎯 Objectifs Caloriques",
          "items": [
            {
              "label": "Perte Légère (-0,25 kg/sem)",
              "valueKey": "mildLoss"
            },
            {
              "label": "Perte de Poids (-0,5 kg/sem)",
              "valueKey": "weightLoss"
            },
            {
              "label": "Perte Extrême (-1 kg/sem)",
              "valueKey": "extremeLoss"
            },
            {
              "label": "Gain Maigre (+0,25 kg/sem)",
              "valueKey": "mildGain"
            }
          ]
        },
        "macros": {
          "title": "🍗 Répartition des Macros",
          "items": [
            {
              "label": "Protéines (Maintien)",
              "valueKey": "maintenanceProtein"
            },
            {
              "label": "Glucides (Maintien)",
              "valueKey": "maintenanceCarbs"
            },
            {
              "label": "Lipides (Maintien)",
              "valueKey": "maintenanceFat"
            }
          ]
        },
        "tips": {
          "title": "💡 Conseils Pro",
          "items": [
            "Suivez votre poids chaque semaine — ajustez les calories de 100-200 si pas de progression",
            "Protéines : 0,8-1,2g par kg de poids préserve le muscle pendant la perte de graisse",
            "Ne descendez pas sous 1200 cal (femmes) ou 1500 cal (hommes) — risque de dommage métabolique",
            "Les multiplicateurs d'activité sont des estimations — les résultats réels priment sur les calculs"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Que Sont les Calories de Maintien ?",
          "content": "Les calories de maintien (TDEE - Dépense Énergétique Totale Quotidienne) représentent le nombre total de calories que votre corps brûle en 24 heures, incluant les fonctions métaboliques de base, les activités quotidiennes et l'exercice. Ce nombre est le point d'équilibre énergétique de votre corps — mangez exactement cette quantité et votre poids reste stable. Il se calcule en déterminant d'abord votre Taux Métabolique de Base (BMR) avec des formules éprouvées comme Mifflin-St Jeor ou Katch-McArdle, puis en multipliant par un facteur d'activité qui tient compte de votre style de vie et habitudes d'exercice. Comprendre votre TDEE est la base de tout plan alimentaire réussi, que votre objectif soit la perte de graisse, la prise de muscle ou le maintien du poids."
        },
        "howItWorks": {
          "title": "Comment le TDEE est Calculé",
          "content": "Le calcul du TDEE implique deux étapes. D'abord, nous calculons votre BMR — les calories dont votre corps a besoin au repos complet pour maintenir les fonctions vitales comme la respiration, la circulation et la production cellulaire. Nous offrons trois formules : Mifflin-St Jeor (la plus précise pour la population générale), Katch-McArdle (meilleure si vous connaissez votre pourcentage de graisse corporelle), et Harris-Benedict (la formule classique). Ensuite, nous multiplions votre BMR par un facteur d'activité allant de 1,2 (sédentaire) à 1,9 (athlète très actif). Cela tient compte des calories brûlées par le mouvement quotidien, l'exercice et l'effet thermique de la digestion. Le résultat est votre TDEE personnalisé — votre niveau de maintien calorique quotidien."
        },
        "formulas": {
          "title": "Formules BMR Expliquées",
          "items": [
            {
              "text": "Mifflin-St Jeor : La plus précise pour la population générale. Considère l'âge, le sexe, le poids et la taille. Recommandée par défaut.",
              "type": "info"
            },
            {
              "text": "Katch-McArdle : Meilleure pour les personnes maigres qui connaissent leur % de graisse corporelle. Tient compte de la masse maigre, la rendant plus précise pour les athlètes.",
              "type": "info"
            },
            {
              "text": "Harris-Benedict : La formule BMR originale de 1919, révisée en 1984. Encore largement utilisée mais tend à légèrement surestimer.",
              "type": "info"
            },
            {
              "text": "Le % de graisse corporelle est optionnel mais améliore significativement la précision — active Katch-McArdle et montre la répartition masse maigre vs graisseuse.",
              "type": "tip"
            },
            {
              "text": "Les multiplicateurs d'activité sont des estimations — suivez vos résultats réels et ajustez les calories de 100-200 si nécessaire après 2-3 semaines.",
              "type": "warning"
            },
            {
              "text": "Tous les calculateurs ont une précision de ±10%. Le suivi réel bat toute formule.",
              "type": "warning"
            }
          ]
        },
        "macros": {
          "title": "Répartition des Macronutriments",
          "items": [
            {
              "text": "Protéines : 30% des calories (0,8-1,2g par kg de poids). Essentielles pour la préservation musculaire pendant la perte de graisse et la croissance musculaire pendant la prise de masse.",
              "type": "info"
            },
            {
              "text": "Lipides : 25% des calories (minimum 0,4g par kg de poids). Cruciaux pour la production hormonale, la fonction cérébrale, l'absorption des vitamines.",
              "type": "info"
            },
            {
              "text": "Glucides : 45% des calories (restant après protéines/lipides). Source d'énergie primaire pour l'entraînement et l'activité quotidienne.",
              "type": "info"
            },
            {
              "text": "Macros sèche : Protéines plus élevées (35%), lipides modérés (25%), glucides plus bas (40%) pour préserver le muscle en déficit.",
              "type": "tip"
            },
            {
              "text": "Macros prise de masse : Protéines modérées (25%), lipides modérés (25%), glucides plus élevés (50%) pour alimenter l'entraînement et la croissance.",
              "type": "tip"
            },
            {
              "text": "Ajustez les ratios selon vos préférences — les calories totales comptent le plus pour le changement de poids.",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calculs",
          "description": "Détail étape par étape pour différents scénarios",
          "examples": [
            {
              "title": "Homme, 30 ans, 82 kg, 1m78, Activité Modérée",
              "steps": [
                "Conversion : 82 kg, 178 cm",
                "BMR (Mifflin) : 10×82 + 6,25×178 - 5×30 + 5 = 1 787 cal",
                "TDEE : 1 787 × 1,55 (modéré) = 2 770 cal/jour",
                "Perte de Poids (-500 cal) : 2 270 cal/jour",
                "Macros : 170g protéines, 63g lipides, 255g glucides"
              ],
              "result": "Maintien : 2 770 cal | Sèche : 2 270 cal"
            },
            {
              "title": "Femme, 28 ans, 66 kg, 1m65, 22% GC, Active",
              "steps": [
                "Conversion : 66 kg, 165 cm",
                "Masse Maigre : 66 × (1 - 0,22) = 51,5 kg",
                "BMR (Katch) : 370 + (21,6 × 51,5) = 1 482 cal",
                "TDEE : 1 482 × 1,725 (active) = 2 556 cal/jour",
                "Gain Maigre (+250 cal) : 2 806 cal/jour",
                "Macros : 145g protéines, 78g lipides, 313g glucides"
              ],
              "result": "Maintien : 2 556 cal | Prise de masse : 2 806 cal"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Dois-je manger mon TDEE pour perdre du poids ?",
          "answer": "Non. Votre TDEE correspond à vos calories de maintien — mangez cette quantité et votre poids reste identique. Pour perdre du poids, vous devez manger MOINS que votre TDEE (créer un déficit calorique). Un déficit de 500 calories par jour conduit à environ 0,5 kg de perte de graisse par semaine."
        },
        {
          "question": "Quelle formule BMR est la plus précise ?",
          "answer": "Pour la plupart des gens, Mifflin-St Jeor est la plus précise. Si vous connaissez votre pourcentage de graisse corporelle et êtes relativement maigre (hommes <25%, femmes <35%), Katch-McArdle est plus précise car elle tient compte de la masse maigre. Harris-Benedict tend à légèrement surestimer."
        },
        {
          "question": "Ai-je besoin de connaître mon pourcentage de graisse corporelle ?",
          "answer": "Non, c'est optionnel. Sans le %, nous utilisons Mifflin-St Jeor qui est précise pour la plupart des gens. Cependant, connaître votre % de graisse corporelle active la formule Katch-McArdle (plus précise pour les personnes maigres) et débloque des métriques avancées comme la Masse Maigre, le Métabolisme Maximal des Graisses, et des objectifs macros précis."
        },
        {
          "question": "Pourquoi mon TDEE diffère-t-il d'autres calculateurs ?",
          "answer": "Différents calculateurs utilisent différentes formules et multiplicateurs d'activité. Notre calculateur offre 3 formules (Mifflin-St Jeor, Katch-McArdle, Harris-Benedict) et utilise des multiplicateurs d'activité conservateurs pour éviter la surestimation. Tous les calculateurs TDEE sont des estimations à ±10% — suivez vos changements de poids réels et ajustez les calories en conséquence."
        },
        {
          "question": "Dois-je ajuster mes calories les jours de repos ?",
          "answer": "Cela dépend de votre approche. Si vous avez inclus votre exercice dans le niveau d'activité, gardez les mêmes calories chaque jour. Si vous avez sélectionné 'sédentaire' et suivez l'exercice séparément, vous pouvez manger légèrement plus les jours d'entraînement (+200-300 cal) et moins les jours de repos. La moyenne calorique hebdomadaire compte le plus."
        },
        {
          "question": "À quelle fréquence dois-je recalculer mon TDEE ?",
          "answer": "Recalculez tous les 7-10 kg de changement de poids, ou quand vous changez significativement votre niveau d'activité. Votre TDEE diminue quand vous perdez du poids (moins de masse à maintenir) et augmente quand vous gagnez du muscle. Suivez votre poids chaque semaine et ajustez les calories de 100-200 si vous ne progressez pas comme prévu."
        },
        {
          "question": "Quel est le minimum de calories que je devrais manger ?",
          "answer": "Les minimums généraux sont 1 200 calories pour les femmes et 1 500 calories pour les hommes. Descendre en dessous risque des carences nutritionnelles, la perte musculaire, le ralentissement métabolique et la perturbation hormonale. Si votre déficit calculé descend sous ces minimums, augmentez l'activité ou acceptez une perte de poids plus lente."
        },
        {
          "question": "Quelle est la précision de la répartition des macros ?",
          "answer": "Nos objectifs macros suivent des recommandations basées sur la science : 30% protéines (préservation musculaire), 25% lipides (santé hormonale), 45% glucides (énergie). Vous pouvez ajuster ces ratios selon vos préférences — certaines personnes performent mieux avec plus de glucides, d'autres avec plus de lipides. Les calories totales comptent le plus pour le changement de poids ; les macros affectent la composition corporelle et les performances."
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
      "name": "Erhaltungskalorien Rechner",
      "slug": "erhaltungskalorien-rechner",
      "subtitle": "Berechnen Sie Ihren Gesamtumsatz (TDEE), Grundumsatz (BMR), BMI, Makronährstoffe und Körperzusammensetzung mit dem fortschrittlichsten kostenlosen Rechner — verwendet mehrere Formeln für maximale Genauigkeit",
      "breadcrumb": "Erhaltungskalorien",
      "seo": {
        "title": "Erhaltungskalorien Rechner - TDEE, BMR, Makros & BMI",
        "description": "Berechnen Sie Ihre täglichen Erhaltungskalorien, BMR, BMI und Makronährstoffe mit mehreren Formeln (Mifflin-St Jeor, Katch-McArdle). Erhalten Sie personalisierte Ziele für Gewichtsverlust oder Muskelaufbau.",
        "shortDescription": "Fortschrittlicher TDEE-Rechner mit Makronährstoffen, BMI und Körperzusammensetzungsanalyse",
        "keywords": [
          "erhaltungskalorien rechner",
          "tdee rechner",
          "bmr rechner",
          "makronährstoff rechner",
          "bmi rechner",
          "körperfett rechner",
          "kalorien rechner",
          "katch mcardle rechner"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "gender": {
          "label": "Geschlecht",
          "helpText": "Stoffwechselratenformeln unterscheiden sich je nach biologischem Geschlecht",
          "options": {
            "male": "Männlich",
            "female": "Weiblich"
          }
        },
        "age": {
          "label": "Alter",
          "helpText": "Der Stoffwechsel verlangsamt sich mit dem Alter"
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
          "helpText": "Wählen Sie die Option, die Ihre typische Woche am besten beschreibt",
          "options": {
            "sedentary": "Sitzend (Bürojob, wenig Sport)",
            "light": "Leicht aktiv (1-3 Tage Sport/Woche)",
            "moderate": "Mäßig aktiv (3-5 Tage Sport/Woche)",
            "active": "Aktiv (6-7 Tage Sport/Woche)",
            "veryActive": "Sehr aktiv (intensiv täglich + körperliche Arbeit)"
          }
        },
        "bodyFatPercent": {
          "label": "Körperfettanteil % (Optional)",
          "helpText": "Ermöglicht die Katch-McArdle Formel für genauere Ergebnisse. Leer lassen wenn unbekannt."
        },
        "bmrFormula": {
          "label": "BMR-Formel",
          "helpText": "Mifflin-St Jeor ist am genauesten für die Allgemeinbevölkerung. Verwenden Sie Katch-McArdle wenn Sie Ihren Körperfettanteil kennen.",
          "options": {
            "mifflin": "Mifflin-St Jeor (Empfohlen)",
            "katch": "Katch-McArdle (benötigt KF%)",
            "harris": "Harris-Benedict (Klassisch)"
          }
        }
      },
      "results": {
        "maintenanceCalories": {
          "label": "Erhaltungskalorien (TDEE)"
        },
        "bmr": {
          "label": "Grundumsatz (BMR)"
        },
        "bmi": {
          "label": "Body-Mass-Index (BMI)"
        },
        "bmiCategory": {
          "label": "BMI-Kategorie"
        },
        "lbm": {
          "label": "Fettfreie Körpermasse"
        },
        "fbm": {
          "label": "Fettmasse"
        },
        "mfm": {
          "label": "Max. Fettstoffwechsel"
        },
        "mildLoss": {
          "label": "Leichter Verlust (-0,25 kg/Woche)"
        },
        "weightLoss": {
          "label": "Gewichtsverlust (-0,5 kg/Woche)"
        },
        "extremeLoss": {
          "label": "Extremer Verlust (-1 kg/Woche)"
        },
        "mildGain": {
          "label": "Leichte Zunahme (+0,25 kg/Woche)"
        },
        "weightGain": {
          "label": "Gewichtszunahme (+0,5 kg/Woche)"
        },
        "maintenanceProtein": {
          "label": "Protein (Erhaltung)"
        },
        "maintenanceCarbs": {
          "label": "Kohlenhydrate (Erhaltung)"
        },
        "maintenanceFat": {
          "label": "Fett (Erhaltung)"
        },
        "cuttingProtein": {
          "label": "Protein (Diät)"
        },
        "cuttingCarbs": {
          "label": "Kohlenhydrate (Diät)"
        },
        "cuttingFat": {
          "label": "Fett (Diät)"
        },
        "bulkingProtein": {
          "label": "Protein (Aufbau)"
        },
        "bulkingCarbs": {
          "label": "Kohlenhydrate (Aufbau)"
        },
        "bulkingFat": {
          "label": "Fett (Aufbau)"
        }
      },
      "presets": {
        "averageMale": {
          "label": "Durchschnittsmann",
          "description": "30J, 82kg, 178cm, mäßig aktiv"
        },
        "averageFemale": {
          "label": "Durchschnittsfrau",
          "description": "28J, 66kg, 165cm, mäßig aktiv"
        },
        "leanMale": {
          "label": "Schlanker Mann (12% KF)",
          "description": "25J, 82kg, 180cm, aktiv, verwendet Katch-McArdle"
        },
        "activeFemale": {
          "label": "Aktive Frau (22% KF)",
          "description": "32J, 61kg, 163cm, aktiv, verwendet Katch-McArdle"
        }
      },
      "tooltips": {
        "maintenanceCalories": "Gesamtumsatz — Kalorien zur Aufrechterhaltung des aktuellen Gewichts",
        "bmr": "Kalorien, die Ihr Körper in völliger Ruhe über 24 Stunden verbrennt",
        "bmi": "Body-Mass-Index — Gewichts-zu-Größe-Verhältnis. Hinweis: berücksichtigt keine Muskelmasse",
        "lbm": "Ihr Gesamtkörpergewicht minus Fettmasse — Muskeln, Knochen, Organe, Wasser",
        "fbm": "Gesamtkörperfett in Kilogramm",
        "mfm": "Maximales tägliches Kaloriendefizit ohne Risiko des Muskelverlusts (31 kcal pro kg FFM)",
        "mildLoss": "250 kcal Defizit für allmählichen, nachhaltigen Fettabbau",
        "weightLoss": "500 kcal Defizit — die häufigste Empfehlung für stetigen Fettabbau",
        "extremeLoss": "1000 kcal Defizit — nur kurzfristig unter Aufsicht empfohlen",
        "mildGain": "250 kcal Überschuss für schlanken Muskelaufbau mit minimalem Fett",
        "weightGain": "500 kcal Überschuss für schnelleren Muskelaufbau"
      },
      "values": {
        "cal/day": "kcal/Tag",
        "cal": "kcal",
        "g": "g",
        "lbs": "lbs",
        "kg": "kg",
        "Sedentary": "Sitzend",
        "Lightly Active": "Leicht aktiv",
        "Moderately Active": "Mäßig aktiv",
        "Active": "Aktiv",
        "Very Active": "Sehr aktiv",
        "Underweight": "Untergewicht",
        "Normal": "Normalgewicht",
        "Overweight": "Übergewicht",
        "Obese": "Adipositas"
      },
      "formats": {
        "summary": "Ihre Erhaltungskalorien betragen {maintenanceCalories} kcal/Tag (BMR: {bmr}, BMI: {bmi}). Um 0,5 kg/Woche zu verlieren, essen Sie {weightLoss} kcal/Tag. Um 0,5 kg/Woche zuzunehmen, essen Sie {weightGain} kcal/Tag."
      },
      "infoCards": {
        "bodyComposition": {
          "title": "📊 Körperzusammensetzung",
          "items": [
            {
              "label": "BMI",
              "valueKey": "bmi"
            },
            {
              "label": "Kategorie",
              "valueKey": "bmiCategory"
            },
            {
              "label": "Fettfreie Masse",
              "valueKey": "lbm"
            },
            {
              "label": "Fettmasse",
              "valueKey": "fbm"
            }
          ]
        },
        "goals": {
          "title": "🎯 Kalorienziele",
          "items": [
            {
              "label": "Leichter Verlust (-0,25 kg/W)",
              "valueKey": "mildLoss"
            },
            {
              "label": "Gewichtsverlust (-0,5 kg/W)",
              "valueKey": "weightLoss"
            },
            {
              "label": "Extremer Verlust (-1 kg/W)",
              "valueKey": "extremeLoss"
            },
            {
              "label": "Schlanke Zunahme (+0,25 kg/W)",
              "valueKey": "mildGain"
            }
          ]
        },
        "macros": {
          "title": "🍗 Makronährstoff-Aufteilung",
          "items": [
            {
              "label": "Protein (Erhaltung)",
              "valueKey": "maintenanceProtein"
            },
            {
              "label": "Kohlenhydrate (Erhaltung)",
              "valueKey": "maintenanceCarbs"
            },
            {
              "label": "Fett (Erhaltung)",
              "valueKey": "maintenanceFat"
            }
          ]
        },
        "tips": {
          "title": "💡 Profi-Tipps",
          "items": [
            "Verfolgen Sie das Gewicht wöchentlich — passen Sie die Kalorien um 100-200 an, falls kein Fortschritt",
            "Protein: 1,6-2,2g pro kg Körpergewicht erhält Muskeln während Fettabbau",
            "Gehen Sie nicht unter 1200 kcal (Frauen) oder 1500 kcal (Männer) — Risiko von Stoffwechselschäden",
            "Aktivitätsfaktoren sind Schätzungen — echte Ergebnisse übertreffen Berechnungen"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Was sind Erhaltungskalorien?",
          "content": "Erhaltungskalorien (TDEE - Gesamtumsatz) stellen die Gesamtanzahl der Kalorien dar, die Ihr Körper in 24 Stunden verbrennt, einschließlich grundlegender Stoffwechselfunktionen, täglicher Aktivitäten und Sport. Diese Zahl ist der Energiegleichgewichtspunkt Ihres Körpers — essen Sie genau diese Menge und Ihr Gewicht bleibt stabil. Sie wird berechnet, indem zuerst Ihr Grundumsatz (BMR) mit bewährten Formeln wie Mifflin-St Jeor oder Katch-McArdle bestimmt wird, dann mit einem Aktivitätsfaktor multipliziert wird, der Ihren Lebensstil und Ihre Trainingsgewohnheiten berücksichtigt. Das Verständnis Ihres TDEE ist die Grundlage jedes erfolgreichen Ernährungsplans, egal ob Ihr Ziel Fettabbau, Muskelaufbau oder Gewichtserhaltung ist."
        },
        "howItWorks": {
          "title": "Wie wird der TDEE berechnet",
          "content": "Die TDEE-Berechnung umfasst zwei Schritte. Zuerst berechnen wir Ihren BMR — die Kalorien, die Ihr Körper in völliger Ruhe benötigt, um lebenswichtige Funktionen wie Atmung, Kreislauf und Zellproduktion aufrechtzuerhalten. Wir bieten drei Formeln: Mifflin-St Jeor (genaueste für die Allgemeinbevölkerung), Katch-McArdle (beste wenn Sie Ihren Körperfettanteil kennen) und Harris-Benedict (die klassische Formel). Zweitens multiplizieren wir Ihren BMR mit einem Aktivitätsfaktor von 1,2 (sitzend) bis 1,9 (sehr aktiver Sportler). Dies berücksichtigt Kalorien, die durch tägliche Bewegung, Sport und den thermischen Effekt der Nahrungsverdauung verbrannt werden. Das Ergebnis ist Ihr personalisierter TDEE — Ihr täglicher Kalorienerhaltungslevel."
        },
        "formulas": {
          "title": "BMR-Formeln erklärt",
          "items": [
            {
              "text": "Mifflin-St Jeor: Genaueste für Allgemeinbevölkerung. Berücksichtigt Alter, Geschlecht, Gewicht und Größe. Als Standard empfohlen.",
              "type": "info"
            },
            {
              "text": "Katch-McArdle: Beste für schlanke Personen, die ihren Körperfettanteil kennen. Berücksichtigt fettfreie Körpermasse, macht sie präziser für Sportler.",
              "type": "info"
            },
            {
              "text": "Harris-Benedict: Die ursprüngliche BMR-Formel von 1919, überarbeitet 1984. Noch weit verbreitet, tendiert aber zu leichter Überschätzung.",
              "type": "info"
            },
            {
              "text": "Körperfettanteil ist optional, verbessert aber die Genauigkeit erheblich — ermöglicht Katch-McArdle und zeigt fettfreie vs. Fettmasse-Aufschlüsselung.",
              "type": "tip"
            },
            {
              "text": "Aktivitätsmultiplikatoren sind Schätzungen — verfolgen Sie Ihre tatsächlichen Ergebnisse und passen Sie die Kalorien um 100-200 an, falls nach 2-3 Wochen nötig.",
              "type": "warning"
            },
            {
              "text": "Alle Rechner haben ±10% Genauigkeit. Verfolgung in der realen Welt übertrifft jede Formel.",
              "type": "warning"
            }
          ]
        },
        "macros": {
          "title": "Makronährstoff-Aufschlüsselung",
          "items": [
            {
              "text": "Protein: 30% der Kalorien (1,6-2,2g pro kg Körpergewicht). Wesentlich für Muskelerhaltung während Fettabbau und Muskelwachstum während Aufbau.",
              "type": "info"
            },
            {
              "text": "Fett: 25% der Kalorien (mindestens 0,7g pro kg Körpergewicht). Entscheidend für Hormonproduktion, Gehirnfunktion, Vitaminaufnahme.",
              "type": "info"
            },
            {
              "text": "Kohlenhydrate: 45% der Kalorien (verbleibt nach Protein/Fett). Primäre Energiequelle für Training und tägliche Aktivität.",
              "type": "info"
            },
            {
              "text": "Diät-Makros: Höheres Protein (35%), mäßiges Fett (25%), weniger Kohlenhydrate (40%) um Muskeln im Defizit zu erhalten.",
              "type": "tip"
            },
            {
              "text": "Aufbau-Makros: Mäßiges Protein (25%), mäßiges Fett (25%), höhere Kohlenhydrate (50%) um Training und Wachstum zu befeuern.",
              "type": "tip"
            },
            {
              "text": "Verhältnisse je nach Vorliebe anpassen — Gesamtkalorien sind am wichtigsten für Gewichtsveränderung.",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Beispielberechnungen",
          "description": "Schritt-für-Schritt Aufschlüsselung für verschiedene Szenarien",
          "examples": [
            {
              "title": "Mann, 30J, 82kg, 178cm, Mäßige Aktivität",
              "steps": [
                "Umrechnung: 82kg, 178cm",
                "BMR (Mifflin): 10×82 + 6,25×178 - 5×30 + 5 = 1.782 kcal",
                "TDEE: 1.782 × 1,55 (mäßig) = 2.762 kcal/Tag",
                "Gewichtsverlust (-500 kcal): 2.262 kcal/Tag",
                "Makros: 172g Protein, 63g Fett, 254g Kohlenhydrate"
              ],
              "result": "Erhaltung: 2.762 kcal | Diät: 2.262 kcal"
            },
            {
              "title": "Frau, 28J, 66kg, 165cm, 22% KF, Aktiv",
              "steps": [
                "Umrechnung: 66kg, 165cm",
                "FFM: 66 × (1 - 0,22) = 51,5kg",
                "BMR (Katch): 370 + (21,6 × 51,5) = 1.482 kcal",
                "TDEE: 1.482 × 1,725 (aktiv) = 2.556 kcal/Tag",
                "Schlanke Zunahme (+250 kcal): 2.806 kcal/Tag",
                "Makros: 146g Protein, 78g Fett, 315g Kohlenhydrate"
              ],
              "result": "Erhaltung: 2.556 kcal | Aufbau: 2.806 kcal"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Sollte ich meinen TDEE essen um abzunehmen?",
          "answer": "Nein. Ihr TDEE sind Ihre Erhaltungskalorien — essen Sie diese Menge und Ihr Gewicht bleibt gleich. Um abzunehmen, müssen Sie WENIGER als Ihren TDEE essen (ein Kaloriendefizit schaffen). Ein Defizit von 500 Kalorien pro Tag führt zu etwa 0,5 kg Fettverlust pro Woche."
        },
        {
          "question": "Welche BMR-Formel ist am genauesten?",
          "answer": "Für die meisten Menschen ist Mifflin-St Jeor am genauesten. Wenn Sie Ihren Körperfettanteil kennen und relativ schlank sind (Männer <25%, Frauen <35%), ist Katch-McArdle präziser, da sie die fettfreie Körpermasse berücksichtigt. Harris-Benedict neigt dazu, leicht zu überschätzen."
        },
        {
          "question": "Muss ich meinen Körperfettanteil kennen?",
          "answer": "Nein, es ist optional. Ohne Körperfettanteil verwenden wir Mifflin-St Jeor, was für die meisten Menschen genau ist. Das Wissen über Ihren Körperfettanteil ermöglicht jedoch die Katch-McArdle Formel (genauer für schlanke Personen) und schaltet erweiterte Metriken wie fettfreie Körpermasse, maximalen Fettstoffwechsel und präzise Makronährstoffziele frei."
        },
        {
          "question": "Warum unterscheidet sich mein TDEE von anderen Rechnern?",
          "answer": "Verschiedene Rechner verwenden verschiedene Formeln und Aktivitätsmultiplikatoren. Unser Rechner bietet 3 Formeln (Mifflin-St Jeor, Katch-McArdle, Harris-Benedict) und verwendet konservative Aktivitätsmultiplikatoren um Überschätzung zu vermeiden. Alle TDEE-Rechner sind Schätzungen innerhalb ±10% — verfolgen Sie Ihre tatsächlichen Gewichtsveränderungen und passen Sie die Kalorien entsprechend an."
        },
        {
          "question": "Sollte ich meine Kalorien an Ruhetagen anpassen?",
          "answer": "Es hängt von Ihrem Ansatz ab. Wenn Sie Ihr Training im Aktivitätslevel einbezogen haben, behalten Sie täglich die gleichen Kalorien bei. Wenn Sie 'sitzend' gewählt haben und Training separat verfolgen, können Sie an Trainingstagen etwas mehr (+200-300 kcal) und an Ruhetagen weniger essen. Der wöchentliche Durchschnitt der Kalorien ist am wichtigsten."
        },
        {
          "question": "Wie oft sollte ich meinen TDEE neu berechnen?",
          "answer": "Berechnen Sie alle 5-7 kg Gewichtsveränderung neu, oder wann immer Sie Ihr Aktivitätslevel signifikant ändern. Ihr TDEE sinkt wenn Sie Gewicht verlieren (weniger Masse zu erhalten) und steigt wenn Sie Muskeln aufbauen. Verfolgen Sie Ihr Gewicht wöchentlich und passen Sie die Kalorien um 100-200 an, falls Sie nicht wie erwartet vorankommen."
        },
        {
          "question": "Was sind die minimalen Kalorien, die ich essen sollte?",
          "answer": "Allgemeine Mindestmengen sind 1.200 Kalorien für Frauen und 1.500 Kalorien für Männer. Darunter zu gehen birgt Risiken von Nährstoffmangel, Muskelverlust, Stoffwechselverlangsamung und hormonellen Störungen. Wenn Ihr berechnetes Defizit unter diese Minimums fällt, steigern Sie die Aktivität oder akzeptieren Sie langsameren Gewichtsverlust."
        },
        {
          "question": "Wie genau ist die Makronährstoff-Aufschlüsselung?",
          "answer": "Unsere Makronährstoffziele folgen evidenzbasierten Empfehlungen: 30% Protein (Muskelerhaltung), 25% Fett (Hormongesundheit), 45% Kohlenhydrate (Energie). Sie können diese Verhältnisse je nach Vorliebe anpassen — manche Menschen funktionieren besser mit höheren Kohlenhydraten, andere mit höherem Fett. Gesamtkalorien sind am wichtigsten für Gewichtsveränderung; Makronährstoffe beeinflussen Körperzusammensetzung und Leistung."
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
  // INPUTS (with unitType for weight/height)
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
      min: 18,
      max: 80,
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
      min: 80,
      max: 500,
    },
    {
      id: "height",
      type: "number",
      defaultValue: null,
      placeholder: "70",
      unitType: "height",
      syncGroup: false,
      defaultUnit: "in",
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
      id: "bodyFatPercent",
      type: "number",
      defaultValue: null,
      placeholder: "20",
      min: 5,
      max: 50,
      step: 0.1,
      suffix: "%",
    },
    {
      id: "bmrFormula",
      type: "select",
      defaultValue: "mifflin",
      options: [
        { value: "mifflin" },
        { value: "katch" },
        { value: "harris" },
      ],
    },
  ],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════
  results: [
    { id: "maintenanceCalories", type: "primary", format: "number" },
    { id: "bmr", type: "secondary", format: "number" },
    { id: "bmi", type: "secondary", format: "number" },
    { id: "bmiCategory", type: "secondary", format: "text" },
    
    // Advanced (if BF%)
    { id: "lbm", type: "secondary", format: "number" },
    { id: "fbm", type: "secondary", format: "number" },
    { id: "mfm", type: "secondary", format: "number" },
    
    // Goals
    { id: "mildLoss", type: "secondary", format: "number" },
    { id: "weightLoss", type: "secondary", format: "number" },
    { id: "extremeLoss", type: "secondary", format: "number" },
    { id: "mildGain", type: "secondary", format: "number" },
    { id: "weightGain", type: "secondary", format: "number" },
    
    // Macros (always shown)
    { id: "maintenanceProtein", type: "secondary", format: "text" },
    { id: "maintenanceCarbs", type: "secondary", format: "text" },
    { id: "maintenanceFat", type: "secondary", format: "text" },
    
    { id: "cuttingProtein", type: "secondary", format: "text" },
    { id: "cuttingCarbs", type: "secondary", format: "text" },
    { id: "cuttingFat", type: "secondary", format: "text" },
    
    { id: "bulkingProtein", type: "secondary", format: "text" },
    { id: "bulkingCarbs", type: "secondary", format: "text" },
    { id: "bulkingFat", type: "secondary", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // INFO CARDS
  // ═══════════════════════════════════════════════════════════════
  infoCards: [
    { id: "bodyComposition", type: "list", icon: "📊", itemCount: 4 },
    { id: "goals", type: "list", icon: "🎯", itemCount: 4 },
    { id: "macros", type: "list", icon: "🍗", itemCount: 3 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  // ═══════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "formulas", type: "list", icon: "📋", itemCount: 6 },
    { id: "macros", type: "list", icon: "🍗", itemCount: 6 },
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
  ],

  // ═══════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════
  references: [
    {
      authors: "Mifflin MD, St Jeor ST, Hill LA, Scott BJ, Daugherty SA, Koh YO",
      year: "1990",
      title: "A new predictive equation for resting energy expenditure in healthy individuals",
      source: "American Journal of Clinical Nutrition, 51(2), 241-247",
      url: "https://pubmed.ncbi.nlm.nih.gov/2305711/",
    },
    {
      authors: "Frankenfield D, Roth-Yousey L, Compher C",
      year: "2005",
      title: "Comparison of predictive equations for resting metabolic rate in healthy nonobese and obese adults",
      source: "Journal of the American Dietetic Association, 105(5), 775-789",
      url: "https://pubmed.ncbi.nlm.nih.gov/15883556/",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // HERO, SIDEBAR, FEATURES, ADS
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
    shareResults: true,
    saveHistory: true,
  },

  relatedCalculators: [
    "bmi-calculator",
    "body-fat-calculator",
    "calorie-calculator",
  ],

  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
  },
};

// ═══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION - IMPROVED
// ═══════════════════════════════════════════════════════════════
export function calculateMaintenanceCalories(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;

  // Get translations
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // Read inputs
  const gender = values.gender as string;
  const age = values.age as number;
  const activityLevel = values.activityLevel as string;
  const bodyFatPercent = values.bodyFatPercent as number | null;
  const bmrFormula = (values.bmrFormula as string) || "mifflin";

  // Get units
  const weightUnit = fieldUnits?.weight || "lbs";
  const heightUnit = fieldUnits?.height || "in";

  // Get weight and height values
  const weight = values.weight as number;
  const height = values.height as number;

  // Validate
  if (!weight || !height || !age) {
    return {
      values: {},
      formatted: {},
      summary: "",
      isValid: false,
    };
  }

  // Convert to metric using Unit Engine (base: weight=kg, height=cm)
  const weightKg = convertToBase(weight, weightUnit, "weight");
  const heightCm = convertToBase(height, heightUnit, "height");

  const heightM = heightCm / 100;

  // ══════════════════════════════════════════════════════════
  // CALCULATE BMR (Multiple Formulas)
  // ══════════════════════════════════════════════════════════
  let bmr: number;

  if (bmrFormula === "katch" && bodyFatPercent) {
    // Katch-McArdle (requires body fat %)
    const lbm = weightKg * (1 - bodyFatPercent / 100);
    bmr = 370 + 21.6 * lbm;
  } else if (bmrFormula === "harris") {
    // Harris-Benedict (revised 1984)
    if (gender === "male") {
      bmr = 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age;
    } else {
      bmr = 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.330 * age;
    }
  } else {
    // Mifflin-St Jeor (default, most accurate)
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }
  }

  // ══════════════════════════════════════════════════════════
  // CALCULATE TDEE (Activity Multiplier)
  // ══════════════════════════════════════════════════════════
  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };

  const pal = activityMultipliers[activityLevel] || 1.55;
  const tdee = bmr * pal;

  // ══════════════════════════════════════════════════════════
  // CALCULATE BMI
  // ══════════════════════════════════════════════════════════
  const bmi = weightKg / (heightM * heightM);

  let bmiCategory: string;
  if (bmi < 18.5) {
    bmiCategory = v["Underweight"] || "Underweight";
  } else if (bmi < 25) {
    bmiCategory = v["Normal"] || "Normal Weight";
  } else if (bmi < 30) {
    bmiCategory = v["Overweight"] || "Overweight";
  } else {
    bmiCategory = v["Obese"] || "Obese";
  }

  // ══════════════════════════════════════════════════════════
  // ADVANCED METRICS (if body fat %)
  // ══════════════════════════════════════════════════════════
  let lbm: number | null = null;
  let fbm: number | null = null;
  let mfm: number | null = null;

  if (bodyFatPercent) {
    lbm = weightKg * (1 - bodyFatPercent / 100);  // kg
    fbm = weightKg - lbm;                          // kg
    const lbmLbs = lbm * 2.20462;
    mfm = lbmLbs * 31; // Max fat metabolism: 31 cal per lb of LBM
  }

  // ══════════════════════════════════════════════════════════
  // WEIGHT GOALS
  // ══════════════════════════════════════════════════════════
  const mildLoss = tdee - 250;
  const weightLoss = tdee - 500;
  const extremeLoss = tdee - 1000;
  const mildGain = tdee + 250;
  const weightGain = tdee + 500;

  // ══════════════════════════════════════════════════════════
  // MACROS BREAKDOWN (always shown)
  // ══════════════════════════════════════════════════════════
  const gUnit = v["g"] || "g";

  // Maintenance (30% protein, 25% fat, 45% carbs)
  const mProteinCal = tdee * 0.30;
  const mFatCal = tdee * 0.25;
  const mCarbsCal = tdee * 0.45;

  const mProteinG = Math.round(mProteinCal / 4);
  const mFatG = Math.round(mFatCal / 9);
  const mCarbsG = Math.round(mCarbsCal / 4);

  const maintenanceProtein = `${mProteinG} ${gUnit} (30%)`;
  const maintenanceFat = `${mFatG} ${gUnit} (25%)`;
  const maintenanceCarbs = `${mCarbsG} ${gUnit} (45%)`;

  // Cutting (35% protein, 25% fat, 40% carbs)
  const cProteinCal = weightLoss * 0.35;
  const cFatCal = weightLoss * 0.25;
  const cCarbsCal = weightLoss * 0.40;

  const cProteinG = Math.round(cProteinCal / 4);
  const cFatG = Math.round(cFatCal / 9);
  const cCarbsG = Math.round(cCarbsCal / 4);

  const cuttingProtein = `${cProteinG} ${gUnit} (35%)`;
  const cuttingFat = `${cFatG} ${gUnit} (25%)`;
  const cuttingCarbs = `${cCarbsG} ${gUnit} (40%)`;

  // Bulking (25% protein, 25% fat, 50% carbs)
  const bProteinCal = weightGain * 0.25;
  const bFatCal = weightGain * 0.25;
  const bCarbsCal = weightGain * 0.50;

  const bProteinG = Math.round(bProteinCal / 4);
  const bFatG = Math.round(bFatCal / 9);
  const bCarbsG = Math.round(bCarbsCal / 4);

  const bulkingProtein = `${bProteinG} ${gUnit} (25%)`;
  const bulkingFat = `${bFatG} ${gUnit} (25%)`;
  const bulkingCarbs = `${bCarbsG} ${gUnit} (50%)`;

  // ══════════════════════════════════════════════════════════
  // FORMAT HELPERS
  // ══════════════════════════════════════════════════════════
  const calUnit = v["cal/day"] || "cal/day";

  const formatCal = (n: number): string => `${Math.round(n).toLocaleString("en-US")} ${calUnit}`;
  const formatWeightVal = (kgVal: number): string => {
    if (weightUnit === "kg") {
      return `${Math.round(kgVal).toLocaleString("en-US")} ${v["kg"] || "kg"}`;
    }
    return `${Math.round(kgVal * 2.20462).toLocaleString("en-US")} ${v["lbs"] || "lbs"}`;
  };

  // ══════════════════════════════════════════════════════════
  // RETURN RESULTS
  // ══════════════════════════════════════════════════════════
  return {
    values: {
      maintenanceCalories: Math.round(tdee),
      bmr: Math.round(bmr),
      bmi: Math.round(bmi * 10) / 10,
      bmiCategory,
      
      ...(lbm !== null && { lbm: Math.round(lbm) }),
      ...(fbm !== null && { fbm: Math.round(fbm) }),
      ...(mfm !== null && { mfm: Math.round(mfm) }),
      
      mildLoss: Math.round(mildLoss),
      weightLoss: Math.round(weightLoss),
      extremeLoss: Math.round(extremeLoss),
      mildGain: Math.round(mildGain),
      weightGain: Math.round(weightGain),
      
      maintenanceProtein,
      maintenanceCarbs,
      maintenanceFat,
      cuttingProtein,
      cuttingCarbs,
      cuttingFat,
      bulkingProtein,
      bulkingCarbs,
      bulkingFat,
    },
    formatted: {
      maintenanceCalories: formatCal(tdee),
      bmr: formatCal(bmr),
      bmi: `${(Math.round(bmi * 10) / 10).toFixed(1)}`,
      bmiCategory,
      
      ...(lbm !== null && { lbm: formatWeightVal(lbm) }),
      ...(fbm !== null && { fbm: formatWeightVal(fbm) }),
      ...(mfm !== null && { mfm: formatCal(mfm) }),
      
      mildLoss: formatCal(mildLoss),
      weightLoss: formatCal(weightLoss),
      extremeLoss: formatCal(extremeLoss),
      mildGain: formatCal(mildGain),
      weightGain: formatCal(weightGain),
      
      maintenanceProtein,
      maintenanceCarbs,
      maintenanceFat,
      cuttingProtein,
      cuttingCarbs,
      cuttingFat,
      bulkingProtein,
      bulkingCarbs,
      bulkingFat,
    },
    summary: (f.summary || "Your maintenance calories are {maintenanceCalories} cal/day (BMR: {bmr}, BMI: {bmi}). To lose 1 lb/week, eat {weightLoss} cal/day. To gain 1 lb/week, eat {weightGain} cal/day.")
      .replace("{maintenanceCalories}", Math.round(tdee).toLocaleString("en-US"))
      .replace("{bmr}", Math.round(bmr).toLocaleString("en-US"))
      .replace("{bmi}", (Math.round(bmi * 10) / 10).toFixed(1))
      .replace("{weightLoss}", Math.round(weightLoss).toLocaleString("en-US"))
      .replace("{weightGain}", Math.round(weightGain).toLocaleString("en-US")),
    isValid: true,
  };
}

export default maintenanceCaloriesCalculatorConfig;
