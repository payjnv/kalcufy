// ============================================================================
// TDEE CALCULATOR - Engine V4.3
// ============================================================================
// Total Daily Energy Expenditure calculator with 3 scientific formulas:
// Mifflin-St Jeor, Harris-Benedict (1984 revised), Katch-McArdle
// Features: Multi-chart visualization, macro breakdown, calorie goals
// V4.3: Toggle "Include BMR Comparison" shows all 3 formulas side by side
// ============================================================================

// ⚡ V4.3 — Toggle "Include BMR Comparison" + stones support + ft_in default
import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ─────────────────────────────────────────────────────────────────────────────
// TRANSLATIONS (EN)
// ─────────────────────────────────────────────────────────────────────────────

const EN = {
  name: "TDEE Calculator",
  slug: "tdee-calculator",
  subtitle:
    "Calculate your Total Daily Energy Expenditure using 3 scientific formulas with interactive charts and personalized calorie goals",
  breadcrumb: "TDEE",

  seo: {
    title: "TDEE Calculator - Total Daily Energy Expenditure | Free",
    description:
      "Calculate your TDEE with Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle formulas. Get personalized calorie goals, macro breakdown, and interactive visual analysis charts.",
    shortDescription: "Calculate total daily energy expenditure and calorie goals",
    keywords: [
      "TDEE calculator",
      "total daily energy expenditure",
      "calorie calculator",
      "BMR calculator",
      "macro calculator",
      "daily calorie needs",
      "energy expenditure",
      "basal metabolic rate",
    ],
  },

  calculator: { yourInformation: "Your Information" },
  ui: {
    yourInformation: "Your Information",
    calculate: "Calculate",
    reset: "Reset",
    results: "Results",
  },

  // ─── INPUTS ──────────────────────────────────────────────────────────────
  inputs: {
    gender: {
      label: "Biological Sex",
      helpText: "BMR formulas differ by biological sex",
      options: { male: "Male", female: "Female" },
    },
    age: {
      label: "Age",
      helpText: "Metabolic rate decreases ~2% per decade after 20",
    },
    activityLevel: {
      label: "Activity Level",
      helpText: "Select your typical weekly physical activity",
      options: {
        sedentary: "Sedentary (office job, little exercise)",
        light: "Lightly Active (1-3 days/week)",
        moderate: "Moderately Active (3-5 days/week)",
        active: "Very Active (6-7 days/week)",
        veryActive: "Extremely Active (athlete, 2x/day)",
      },
    },
    bodyFatPercent: {
      label: "Body Fat %",
      helpText: "Optional — enables the Katch-McArdle formula for higher accuracy",
    },
    showBmrComparison: {
      label: "Include BMR Comparison",
      helpText: "Show all 3 BMR formulas side by side",
    },
  },

  // ─── RESULTS ─────────────────────────────────────────────────────────────
  results: {
    tdee: { label: "Daily Calories (TDEE)" },
    bmrMifflin: { label: "BMR (Mifflin-St Jeor)" },
    bmrHarris: { label: "BMR (Harris-Benedict)" },
    bmrKatch: { label: "BMR (Katch-McArdle)" },
    bmi: { label: "Body Mass Index" },
    cuttingCalories: { label: "Weight Loss (-500 cal)" },
    bulkingCalories: { label: "Weight Gain (+500 cal)" },
    protein: { label: "Daily Protein" },
    carbs: { label: "Daily Carbs" },
    fats: { label: "Daily Fat" },
  },

  // ─── TOOLTIPS ────────────────────────────────────────────────────────────
  tooltips: {
    tdee: "Your estimated total daily calorie expenditure including all physical activity",
    bmrMifflin: "Basal metabolic rate using the most widely recommended formula (Mifflin-St Jeor, 1990)",
    bmrHarris: "BMR using the revised Harris-Benedict equation (Roza & Shizgal, 1984)",
    bmrKatch: "BMR using lean body mass — requires body fat percentage input",
    bmi: "Body Mass Index — a ratio of weight to height squared",
    cuttingCalories: "Daily calorie target for steady weight loss (500 calorie deficit ≈ 1 lb/week)",
    bulkingCalories: "Daily calorie target for lean muscle gain (500 calorie surplus)",
    protein: "Recommended daily protein intake for your calorie goal",
    carbs: "Recommended daily carbohydrate intake",
    fats: "Recommended daily fat intake",
  },

  // ─── PRESETS ─────────────────────────────────────────────────────────────
  presets: {
    weightLoss: {
      label: "Weight Loss",
      description: "Female, 30, moderate activity",
    },
    activeMale: {
      label: "Active Male",
      description: "Male, 28, very active",
    },
    beginner: {
      label: "Beginner",
      description: "Male, 35, lightly active",
    },
    muscleGain: {
      label: "Muscle Gain",
      description: "Male, 25, active, 15% BF",
    },
  },

  // ─── DYNAMIC VALUES (for calculate function) ────────────────────────────
  values: {
    kcal: "kcal",
    "kcal/day": "kcal/day",
    g: "g",
    "g/day": "g/day",
    kg: "kg",
    lbs: "lbs",
    "%": "%",
    Underweight: "Underweight",
    Normal: "Normal",
    Overweight: "Overweight",
    Obese: "Obese",
    "Mifflin-St Jeor": "Mifflin-St Jeor",
    "Harris-Benedict": "Harris-Benedict",
    "Katch-McArdle": "Katch-McArdle",
    BMR: "BMR",
    TEF: "TEF (Thermic Effect of Food)",
    NEAT: "NEAT (Non-Exercise Activity)",
    EAT: "EAT (Exercise Activity)",
    "Aggressive Cut": "Aggressive Cut (−25%)",
    "Moderate Cut": "Moderate Cut (−15%)",
    "Mild Cut": "Mild Cut (−10%)",
    Maintenance: "Maintenance",
    "Lean Bulk": "Lean Bulk (+10%)",
    "Moderate Bulk": "Moderate Bulk (+15%)",
    "Aggressive Bulk": "Aggressive Bulk (+25%)",
    "N/A": "N/A",
  },

  // ─── FORMAT TEMPLATES ────────────────────────────────────────────────────
  formats: {
    summary:
      "Your TDEE is {tdee} kcal/day (Mifflin-St Jeor). For weight loss aim for {cutting} kcal/day, for muscle gain target {bulking} kcal/day.",
  },

  // ─── CHARTS ──────────────────────────────────────────────────────────────
  charts: {
    title: "TDEE Visual Analysis",
    series: {
      value: "Calories (kcal)",
      calories: "Daily Calories (kcal)",
    },
    tabs: {
      "tdee-breakdown": {
        label: "TDEE Breakdown",
        icon: "🔥",
        subtitle: "How your body burns calories",
      },
      "formula-comparison": {
        label: "Formula Comparison",
        icon: "📊",
        subtitle: "BMR estimates by method",
      },
      "calorie-goals": {
        label: "Calorie Goals",
        icon: "🎯",
        subtitle: "Daily targets by objective",
      },
    },
  },

  // ─── INFO CARDS ──────────────────────────────────────────────────────────
  infoCards: {
    dailyCalories: {
      title: "🔥 Daily Calorie Targets",
      items: [
        { label: "Maintenance (TDEE)", valueKey: "tdee" },
        { label: "Weight Loss (−500)", valueKey: "cuttingCalories" },
        { label: "Weight Gain (+500)", valueKey: "bulkingCalories" },
      ],
    },
    macros: {
      title: "🥗 Recommended Macros",
      items: [
        { label: "Protein", valueKey: "protein" },
        { label: "Carbohydrates", valueKey: "carbs" },
        { label: "Fat", valueKey: "fats" },
      ],
    },
    tips: {
      title: "💡 Quick Tips",
      items: [
        "Recalculate your TDEE every 4-6 weeks as your weight changes",
        "Activity level has the biggest impact on TDEE after your BMR",
        "Adding body fat % enables the most accurate Katch-McArdle formula",
        "Track actual intake for 2 weeks to calibrate and validate your TDEE estimate",
      ],
    },
  },

  // ─── REFERENCE DATA ──────────────────────────────────────────────────────
  referenceData: {
    activityMultipliers: {
      title: "Activity Level Multipliers",
      items: [
        { label: "Sedentary (office job, little exercise)", value: "BMR × 1.200" },
        { label: "Lightly Active (1-3 days/week)", value: "BMR × 1.375" },
        { label: "Moderately Active (3-5 days/week)", value: "BMR × 1.550" },
        { label: "Very Active (6-7 days/week)", value: "BMR × 1.725" },
        { label: "Extremely Active (athlete, 2x/day)", value: "BMR × 1.900" },
      ],
    },
  },

  // ─── EDUCATION ───────────────────────────────────────────────────────────
  education: {
    whatIsTdee: {
      title: "What is TDEE?",
      content:
        "Total Daily Energy Expenditure (TDEE) is the total number of calories your body burns in a 24-hour period. It accounts for every form of energy use — from the calories needed to keep your heart beating and lungs breathing (basal metabolic rate) to the energy spent walking to the kitchen, digesting food, and exercising at the gym. Understanding your TDEE is the foundation of any effective nutrition plan because it tells you exactly how many calories you need to consume each day to maintain your current weight. Eating below your TDEE creates a calorie deficit that leads to weight loss, while eating above it creates a surplus that supports muscle growth. The concept was formalized in exercise physiology research and has become the gold standard for dietitians, personal trainers, and medical professionals when designing individualized meal plans. Unlike simple BMR calculators, TDEE gives you the actionable number you actually need for daily nutrition planning.",
    },
    howTdeeWorks: {
      title: "How TDEE Is Calculated",
      content:
        "TDEE is calculated in two steps. First, your Basal Metabolic Rate (BMR) is estimated using a validated scientific formula such as Mifflin-St Jeor, Harris-Benedict, or Katch-McArdle. BMR represents the calories your body needs at complete rest — just to maintain vital functions like breathing, circulation, cell production, and temperature regulation. It typically accounts for 60-75% of your total daily calorie burn. Second, your BMR is multiplied by an activity factor that accounts for the additional energy you spend through movement and exercise. This multiplier ranges from 1.2 for sedentary individuals to 1.9 for extremely active athletes. The resulting number is your TDEE. Your total expenditure is further broken down into four components: BMR (basal functions), TEF (thermic effect of food — energy used for digestion, roughly 8-10% of intake), NEAT (non-exercise activity thermogenesis — fidgeting, walking, standing), and EAT (exercise activity thermogenesis — intentional workouts).",
    },
    formulas: {
      title: "BMR Formulas Explained",
      items: [
        {
          text: "Mifflin-St Jeor (1990): The most accurate formula for the general population. Uses weight, height, age, and sex. Recommended by the Academy of Nutrition and Dietetics.",
          type: "info" as const,
        },
        {
          text: "Harris-Benedict (Revised 1984): The classic BMR formula, updated by Roza & Shizgal. Tends to overestimate BMR by about 5% compared to Mifflin-St Jeor.",
          type: "info" as const,
        },
        {
          text: "Katch-McArdle: Uses lean body mass instead of total weight, making it more accurate for athletes and lean individuals. Requires knowing your body fat percentage.",
          type: "info" as const,
        },
        {
          text: "Activity multipliers are estimates. If you have a desk job but train 3x/week, 'Moderately Active' (1.55) is usually most accurate.",
          type: "warning" as const,
        },
        {
          text: "No formula is 100% accurate — individual variation of ±10-15% is normal. Use your TDEE as a starting point and adjust based on real results over 2-4 weeks.",
          type: "warning" as const,
        },
        {
          text: "Muscle mass significantly affects BMR. Two people of the same weight can have BMRs differing by 200+ calories if one has more lean mass.",
          type: "info" as const,
        },
      ],
    },
    considerations: {
      title: "Important Considerations",
      items: [
        {
          text: "TDEE is an estimate, not an exact measurement. Real-world tracking over 2-4 weeks is the most reliable way to calibrate your personal calorie needs.",
          type: "warning" as const,
        },
        {
          text: "Never eat below 1,200 kcal/day (women) or 1,500 kcal/day (men) without medical supervision, regardless of what your deficit calculation suggests.",
          type: "warning" as const,
        },
        {
          text: "Recalculate your TDEE every 4-6 weeks or whenever your weight changes by 10+ pounds, as your metabolic rate adjusts with your body composition.",
          type: "info" as const,
        },
        {
          text: "Macro ratios matter as much as total calories. Higher protein intake (1.6-2.2 g/kg) helps preserve muscle during a calorie deficit.",
          type: "info" as const,
        },
        {
          text: "Metabolic adaptation occurs during prolonged dieting — your body may reduce TDEE by 5-15% beyond what weight loss alone would predict.",
          type: "warning" as const,
        },
        {
          text: "Stress, sleep quality, hormonal changes, and medications can all affect your actual energy expenditure independent of activity level.",
          type: "info" as const,
        },
      ],
    },
    examples: {
      title: "Calculation Examples",
      description: "Step-by-step TDEE calculations using the Mifflin-St Jeor equation",
      examples: [
        {
          title: "30-Year-Old Male (180 lbs, 5'10\", Moderate Activity)",
          steps: [
            "Convert units: 180 lbs = 81.6 kg, 5'10\" = 177.8 cm",
            "Mifflin-St Jeor (Male): 10 × 81.6 + 6.25 × 177.8 − 5 × 30 + 5",
            "BMR = 816 + 1,111 − 150 + 5 = 1,782 kcal/day",
            "Activity multiplier: Moderately Active = 1.55",
            "TDEE = 1,782 × 1.55 = 2,762 kcal/day",
            "Weight loss target: 2,762 − 500 = 2,262 kcal/day",
          ],
          result: "TDEE: 2,762 kcal/day | Cut: 2,262 | Bulk: 3,262",
        },
        {
          title: "25-Year-Old Female (140 lbs, 5'5\", Lightly Active)",
          steps: [
            "Convert units: 140 lbs = 63.5 kg, 5'5\" = 165.1 cm",
            "Mifflin-St Jeor (Female): 10 × 63.5 + 6.25 × 165.1 − 5 × 25 − 161",
            "BMR = 635 + 1,032 − 125 − 161 = 1,381 kcal/day",
            "Activity multiplier: Lightly Active = 1.375",
            "TDEE = 1,381 × 1.375 = 1,899 kcal/day",
            "Weight loss target: 1,899 − 500 = 1,399 kcal/day",
          ],
          result: "TDEE: 1,899 kcal/day | Cut: 1,399 | Bulk: 2,399",
        },
      ],
    },
  },

  // ─── FAQs ────────────────────────────────────────────────────────────────
  faqs: [
    {
      question: "What is the difference between TDEE and BMR?",
      answer:
        "BMR (Basal Metabolic Rate) is the number of calories your body burns at complete rest just to sustain vital functions like breathing, circulation, and cell repair. TDEE (Total Daily Energy Expenditure) includes your BMR plus all additional calories burned through daily movement, exercise, and digestion. Your TDEE is always higher than your BMR — typically 20-90% higher depending on your activity level. For weight management, TDEE is the number you should use to set your daily calorie target.",
    },
    {
      question: "Which BMR formula is the most accurate?",
      answer:
        "The Mifflin-St Jeor equation (1990) is considered the most accurate for the general population. Studies show it predicts BMR within 10% of measured values in about 82% of people. However, if you know your body fat percentage, the Katch-McArdle formula may be more accurate because it uses lean body mass rather than total weight, making it better for athletes and people with unusual body compositions.",
    },
    {
      question: "How do I choose the right activity level?",
      answer:
        "Most people overestimate their activity level. If you have a desk job and exercise 3-5 times per week, 'Moderately Active' is usually the right choice. 'Very Active' should only be selected if you exercise intensely 6-7 days per week or have a physically demanding job. 'Extremely Active' is reserved for competitive athletes training twice daily or people with very physical jobs who also exercise regularly. When in doubt, choose one level lower than you think.",
    },
    {
      question: "How many calories should I cut for weight loss?",
      answer:
        "A deficit of 500 calories per day below your TDEE results in approximately 1 pound of weight loss per week, which is considered a safe and sustainable rate. For more aggressive goals, a 750-calorie deficit yields about 1.5 lbs/week, but never go below 1,200 kcal/day (women) or 1,500 kcal/day (men) without medical supervision. Larger deficits increase the risk of muscle loss, nutrient deficiencies, and metabolic adaptation.",
    },
    {
      question: "How often should I recalculate my TDEE?",
      answer:
        "Recalculate every 4-6 weeks, or whenever your weight changes by 10 or more pounds. As you lose weight, your BMR decreases because there is less body mass to maintain. This means your TDEE also decreases, and the calorie target that initially created a deficit may eventually become your new maintenance level. Regular recalculation prevents weight loss plateaus.",
    },
    {
      question: "What macronutrient split should I follow?",
      answer:
        "A commonly recommended starting point is 30% protein, 40% carbohydrates, and 30% fat. For weight loss, increasing protein to 35-40% helps preserve muscle mass. For muscle gain, carbohydrates can be increased to 45-50% to fuel workouts. Protein should be at least 1.6-2.2 grams per kilogram of body weight for anyone who exercises regularly, regardless of their overall calorie goal.",
    },
    {
      question: "Does body fat percentage affect TDEE accuracy?",
      answer:
        "Yes, significantly. Two people who weigh the same but have different body fat percentages will have different BMRs because muscle tissue is more metabolically active than fat tissue. Providing your body fat percentage enables the Katch-McArdle formula, which accounts for lean body mass and can give a more accurate BMR estimate, especially for very lean or very overweight individuals.",
    },
    {
      question: "Can TDEE change even if my weight stays the same?",
      answer:
        "Yes. TDEE can change due to shifts in body composition (gaining muscle while losing fat), changes in activity level, hormonal fluctuations, stress, sleep quality, aging, and metabolic adaptation from prolonged dieting. Seasonal changes in temperature can also slightly affect BMR. This is why tracking actual intake and weight trends over time is more reliable than relying solely on formula-based estimates.",
    },
  ],

  // ─── STANDARD SECTIONS ───────────────────────────────────────────────────
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
};

// ─────────────────────────────────────────────────────────────────────────────
// TRANSLATIONS (ES)
// ─────────────────────────────────────────────────────────────────────────────

const ES = {
  name: "Calculadora TDEE",
  slug: "calculadora-tdee",
  subtitle: "Calcula tu Gasto Energético Diario Total con 3 fórmulas científicas, gráficos interactivos y objetivos calóricos personalizados",
  breadcrumb: "TDEE",
  seo: {
    title: "Calculadora TDEE - Gasto Energético Diario Total Gratis",
    description: "Calcula tu TDEE con las fórmulas Mifflin-St Jeor, Harris-Benedict y Katch-McArdle. Obtén objetivos calóricos personalizados, distribución de macros y gráficos interactivos.",
    shortDescription: "Calcula tu gasto energético diario total y objetivos calóricos",
    keywords: ["calculadora TDEE", "gasto energético diario", "calculadora de calorías", "calculadora TMB", "calculadora de macros", "calorías diarias necesarias", "gasto energético", "tasa metabólica basal"],
  },
  calculator: { yourInformation: "Tu Información" },
  ui: { yourInformation: "Tu Información", calculate: "Calcular", reset: "Reiniciar", results: "Resultados" },
  inputs: {
    gender: { label: "Sexo Biológico", helpText: "Las fórmulas de TMB difieren según el sexo biológico", options: { male: "Masculino", female: "Femenino" } },
    age: { label: "Edad", helpText: "La tasa metabólica disminuye ~2% por década después de los 20" },
    activityLevel: {
      label: "Nivel de Actividad",
      helpText: "Selecciona tu actividad física semanal típica",
      options: {
        sedentary: "Sedentario (trabajo de oficina, poco ejercicio)",
        light: "Ligeramente Activo (1-3 días/semana)",
        moderate: "Moderadamente Activo (3-5 días/semana)",
        active: "Muy Activo (6-7 días/semana)",
        veryActive: "Extremadamente Activo (atleta, 2x/día)",
      },
    },
    bodyFatPercent: { label: "% de Grasa Corporal", helpText: "Opcional — habilita la fórmula Katch-McArdle para mayor precisión" },
    showBmrComparison: { label: "Incluir Comparación de TMB", helpText: "Mostrar las 3 fórmulas de TMB lado a lado" },
  },
  results: {
    tdee: { label: "Calorías Diarias (TDEE)" },
    bmrMifflin: { label: "TMB (Mifflin-St Jeor)" },
    bmrHarris: { label: "TMB (Harris-Benedict)" },
    bmrKatch: { label: "TMB (Katch-McArdle)" },
    bmi: { label: "Índice de Masa Corporal" },
    cuttingCalories: { label: "Pérdida de Peso (-500 cal)" },
    bulkingCalories: { label: "Aumento de Peso (+500 cal)" },
    protein: { label: "Proteína Diaria" },
    carbs: { label: "Carbohidratos Diarios" },
    fats: { label: "Grasa Diaria" },
  },
  tooltips: {
    tdee: "Tu gasto calórico diario total estimado incluyendo toda la actividad física",
    bmrMifflin: "Tasa metabólica basal usando la fórmula más recomendada (Mifflin-St Jeor, 1990)",
    bmrHarris: "TMB usando la ecuación revisada de Harris-Benedict (Roza & Shizgal, 1984)",
    bmrKatch: "TMB usando masa corporal magra — requiere porcentaje de grasa corporal",
    bmi: "Índice de Masa Corporal — relación entre peso y altura al cuadrado",
    cuttingCalories: "Objetivo calórico diario para pérdida de peso constante (déficit de 500 cal ≈ 0.45 kg/semana)",
    bulkingCalories: "Objetivo calórico diario para ganancia muscular magra (superávit de 500 cal)",
    protein: "Ingesta diaria de proteína recomendada para tu objetivo calórico",
    carbs: "Ingesta diaria de carbohidratos recomendada",
    fats: "Ingesta diaria de grasa recomendada",
  },
  presets: {
    weightLoss: { label: "Pérdida de Peso", description: "Mujer, 30, actividad moderada" },
    activeMale: { label: "Hombre Activo", description: "Hombre, 28, muy activo" },
    beginner: { label: "Principiante", description: "Hombre, 35, ligeramente activo" },
    muscleGain: { label: "Ganancia Muscular", description: "Hombre, 25, activo, 15% GC" },
  },
  values: {
    kcal: "kcal", "kcal/day": "kcal/día", g: "g", "g/day": "g/día", kg: "kg", lbs: "lbs", "%": "%",
    Underweight: "Bajo Peso", Normal: "Normal", Overweight: "Sobrepeso", Obese: "Obesidad",
    "Mifflin-St Jeor": "Mifflin-St Jeor", "Harris-Benedict": "Harris-Benedict", "Katch-McArdle": "Katch-McArdle",
    BMR: "TMB", TEF: "TEF (Efecto Térmico de Alimentos)", NEAT: "NEAT (Actividad No Ejercicio)", EAT: "EAT (Actividad de Ejercicio)",
    "Aggressive Cut": "Corte Agresivo (−25%)", "Moderate Cut": "Corte Moderado (−15%)", "Mild Cut": "Corte Suave (−10%)",
    Maintenance: "Mantenimiento", "Lean Bulk": "Volumen Limpio (+10%)", "Moderate Bulk": "Volumen Moderado (+15%)", "Aggressive Bulk": "Volumen Agresivo (+25%)", "N/A": "N/D",
  },
  formats: { summary: "Tu TDEE es {tdee} kcal/día (Mifflin-St Jeor). Para perder peso apunta a {cutting} kcal/día, para ganar músculo apunta a {bulking} kcal/día." },
  charts: {
    title: "Análisis Visual TDEE",
    series: { value: "Calorías (kcal)", calories: "Calorías Diarias (kcal)" },
    tabs: {
      "tdee-breakdown": { label: "Desglose TDEE", icon: "🔥", subtitle: "Cómo tu cuerpo quema calorías" },
      "formula-comparison": { label: "Comparación de Fórmulas", icon: "📊", subtitle: "Estimaciones de TMB por método" },
      "calorie-goals": { label: "Objetivos Calóricos", icon: "🎯", subtitle: "Metas diarias por objetivo" },
    },
  },
  infoCards: {
    dailyCalories: {
      title: "🔥 Objetivos Calóricos Diarios",
      items: [
        { label: "Mantenimiento (TDEE)", valueKey: "tdee" },
        { label: "Pérdida de Peso (−500)", valueKey: "cuttingCalories" },
        { label: "Aumento de Peso (+500)", valueKey: "bulkingCalories" },
      ],
    },
    macros: {
      title: "🥗 Macros Recomendados",
      items: [
        { label: "Proteína", valueKey: "protein" },
        { label: "Carbohidratos", valueKey: "carbs" },
        { label: "Grasa", valueKey: "fats" },
      ],
    },
    tips: {
      title: "💡 Consejos Rápidos",
      items: [
        "Recalcula tu TDEE cada 4-6 semanas a medida que cambia tu peso",
        "El nivel de actividad tiene el mayor impacto en el TDEE después de tu TMB",
        "Agregar el % de grasa corporal habilita la fórmula más precisa (Katch-McArdle)",
        "Registra tu ingesta real durante 2 semanas para calibrar y validar tu estimación de TDEE",
      ],
    },
  },
  referenceData: {
    activityMultipliers: {
      title: "Multiplicadores de Nivel de Actividad",
      items: [
        { label: "Sedentario (trabajo de oficina, poco ejercicio)", value: "TMB × 1.200" },
        { label: "Ligeramente Activo (1-3 días/semana)", value: "TMB × 1.375" },
        { label: "Moderadamente Activo (3-5 días/semana)", value: "TMB × 1.550" },
        { label: "Muy Activo (6-7 días/semana)", value: "TMB × 1.725" },
        { label: "Extremadamente Activo (atleta, 2x/día)", value: "TMB × 1.900" },
      ],
    },
  },
  education: {
    whatIsTdee: {
      title: "¿Qué es el TDEE?",
      content: "El Gasto Energético Diario Total (TDEE) es el número total de calorías que tu cuerpo quema en un período de 24 horas. Incluye cada forma de uso de energía — desde las calorías necesarias para mantener tu corazón latiendo y tus pulmones respirando (tasa metabólica basal) hasta la energía gastada caminando, digiriendo alimentos y haciendo ejercicio. Entender tu TDEE es la base de cualquier plan nutricional efectivo porque te dice exactamente cuántas calorías necesitas consumir cada día para mantener tu peso actual. Comer por debajo de tu TDEE crea un déficit calórico que lleva a la pérdida de peso, mientras que comer por encima crea un superávit que apoya el crecimiento muscular. El concepto fue formalizado en la investigación de fisiología del ejercicio y se ha convertido en el estándar de oro para nutricionistas, entrenadores personales y profesionales médicos al diseñar planes de alimentación individualizados. A diferencia de las calculadoras simples de TMB, el TDEE te da el número accionable que realmente necesitas para la planificación nutricional diaria.",
    },
    howTdeeWorks: {
      title: "Cómo se Calcula el TDEE",
      content: "El TDEE se calcula en dos pasos. Primero, tu Tasa Metabólica Basal (TMB) se estima usando una fórmula científica validada como Mifflin-St Jeor, Harris-Benedict o Katch-McArdle. La TMB representa las calorías que tu cuerpo necesita en reposo completo — solo para mantener funciones vitales como la respiración, circulación, producción celular y regulación de temperatura. Típicamente representa el 60-75% de tu quema calórica diaria total. Segundo, tu TMB se multiplica por un factor de actividad que tiene en cuenta la energía adicional que gastas a través del movimiento y el ejercicio. Este multiplicador va de 1.2 para personas sedentarias a 1.9 para atletas extremadamente activos. El número resultante es tu TDEE. Tu gasto total se desglosa en cuatro componentes: TMB (funciones basales), TEF (efecto térmico de los alimentos — energía usada para la digestión, aproximadamente 8-10% de la ingesta), NEAT (termogénesis de actividad no ejercicio — moverse, caminar, estar de pie) y EAT (termogénesis de actividad de ejercicio — entrenamientos intencionales).",
    },
    formulas: {
      title: "Fórmulas de TMB Explicadas",
      items: [
        { text: "Mifflin-St Jeor (1990): La fórmula más precisa para la población general. Usa peso, altura, edad y sexo. Recomendada por la Academia de Nutrición y Dietética.", type: "info" as const },
        { text: "Harris-Benedict (Revisada 1984): La fórmula clásica de TMB, actualizada por Roza & Shizgal. Tiende a sobreestimar la TMB en aproximadamente 5% comparada con Mifflin-St Jeor.", type: "info" as const },
        { text: "Katch-McArdle: Usa masa corporal magra en lugar del peso total, haciéndola más precisa para atletas e individuos delgados. Requiere conocer tu porcentaje de grasa corporal.", type: "info" as const },
        { text: "Los multiplicadores de actividad son estimaciones. Si tienes trabajo de oficina pero entrenas 3x/semana, 'Moderadamente Activo' (1.55) suele ser lo más preciso.", type: "warning" as const },
        { text: "Ninguna fórmula es 100% precisa — la variación individual de ±10-15% es normal. Usa tu TDEE como punto de partida y ajusta basándote en resultados reales en 2-4 semanas.", type: "warning" as const },
        { text: "La masa muscular afecta significativamente la TMB. Dos personas del mismo peso pueden tener TMBs que difieren en 200+ calorías si una tiene más masa magra.", type: "info" as const },
      ],
    },
    considerations: {
      title: "Consideraciones Importantes",
      items: [
        { text: "El TDEE es una estimación, no una medición exacta. El seguimiento real durante 2-4 semanas es la forma más confiable de calibrar tus necesidades calóricas personales.", type: "warning" as const },
        { text: "Nunca comas por debajo de 1,200 kcal/día (mujeres) o 1,500 kcal/día (hombres) sin supervisión médica, independientemente de lo que sugiera tu cálculo de déficit.", type: "warning" as const },
        { text: "Recalcula tu TDEE cada 4-6 semanas o cuando tu peso cambie más de 5 kg, ya que tu tasa metabólica se ajusta con tu composición corporal.", type: "info" as const },
        { text: "Las proporciones de macros importan tanto como las calorías totales. Una ingesta alta de proteína (1.6-2.2 g/kg) ayuda a preservar músculo durante un déficit calórico.", type: "info" as const },
        { text: "La adaptación metabólica ocurre durante dietas prolongadas — tu cuerpo puede reducir el TDEE un 5-15% más allá de lo que la pérdida de peso sola predice.", type: "warning" as const },
        { text: "El estrés, la calidad del sueño, los cambios hormonales y los medicamentos pueden afectar tu gasto energético real independientemente del nivel de actividad.", type: "info" as const },
      ],
    },
    examples: {
      title: "Ejemplos de Cálculo",
      description: "Cálculos paso a paso del TDEE usando la ecuación Mifflin-St Jeor",
      examples: [
        { title: "Hombre de 30 Años (82 kg, 1.78 m, Actividad Moderada)", steps: ["Datos: 82 kg, 178 cm, 30 años, masculino", "Mifflin-St Jeor (Hombre): 10 × 82 + 6.25 × 178 − 5 × 30 + 5", "TMB = 820 + 1,113 − 150 + 5 = 1,788 kcal/día", "Multiplicador de actividad: Moderadamente Activo = 1.55", "TDEE = 1,788 × 1.55 = 2,771 kcal/día", "Objetivo pérdida de peso: 2,771 − 500 = 2,271 kcal/día"], result: "TDEE: 2,771 kcal/día | Corte: 2,271 | Volumen: 3,271" },
        { title: "Mujer de 25 Años (64 kg, 1.65 m, Ligeramente Activa)", steps: ["Datos: 64 kg, 165 cm, 25 años, femenino", "Mifflin-St Jeor (Mujer): 10 × 64 + 6.25 × 165 − 5 × 25 − 161", "TMB = 640 + 1,031 − 125 − 161 = 1,385 kcal/día", "Multiplicador de actividad: Ligeramente Activa = 1.375", "TDEE = 1,385 × 1.375 = 1,904 kcal/día", "Objetivo pérdida de peso: 1,904 − 500 = 1,404 kcal/día"], result: "TDEE: 1,904 kcal/día | Corte: 1,404 | Volumen: 2,404" },
      ],
    },
  },
  faqs: [
    { question: "¿Cuál es la diferencia entre TDEE y TMB?", answer: "La TMB (Tasa Metabólica Basal) es el número de calorías que tu cuerpo quema en reposo completo solo para mantener funciones vitales como respirar, circulación y reparación celular. El TDEE (Gasto Energético Diario Total) incluye tu TMB más todas las calorías adicionales quemadas a través del movimiento diario, ejercicio y digestión. Tu TDEE siempre es mayor que tu TMB — típicamente 20-90% mayor dependiendo de tu nivel de actividad. Para el control de peso, el TDEE es el número que debes usar para establecer tu objetivo calórico diario." },
    { question: "¿Cuál fórmula de TMB es la más precisa?", answer: "La ecuación Mifflin-St Jeor (1990) se considera la más precisa para la población general. Los estudios muestran que predice la TMB dentro del 10% de los valores medidos en aproximadamente el 82% de las personas. Sin embargo, si conoces tu porcentaje de grasa corporal, la fórmula Katch-McArdle puede ser más precisa porque usa masa corporal magra en lugar del peso total, haciéndola mejor para atletas y personas con composiciones corporales inusuales." },
    { question: "¿Cómo elijo el nivel de actividad correcto?", answer: "La mayoría de las personas sobreestiman su nivel de actividad. Si tienes un trabajo de oficina y haces ejercicio 3-5 veces por semana, 'Moderadamente Activo' suele ser la opción correcta. 'Muy Activo' solo debe seleccionarse si haces ejercicio intenso 6-7 días por semana o tienes un trabajo físicamente exigente. 'Extremadamente Activo' está reservado para atletas competitivos que entrenan dos veces al día. En caso de duda, elige un nivel por debajo de lo que crees." },
    { question: "¿Cuántas calorías debo reducir para perder peso?", answer: "Un déficit de 500 calorías por día por debajo de tu TDEE resulta en aproximadamente 0.45 kg de pérdida de peso por semana, lo cual se considera una tasa segura y sostenible. Para objetivos más agresivos, un déficit de 750 calorías produce aproximadamente 0.7 kg/semana, pero nunca bajes de 1,200 kcal/día (mujeres) o 1,500 kcal/día (hombres) sin supervisión médica." },
    { question: "¿Con qué frecuencia debo recalcular mi TDEE?", answer: "Recalcula cada 4-6 semanas, o cuando tu peso cambie 5 kg o más. A medida que pierdes peso, tu TMB disminuye porque hay menos masa corporal que mantener. Esto significa que tu TDEE también disminuye, y el objetivo calórico que inicialmente creaba un déficit puede eventualmente convertirse en tu nuevo nivel de mantenimiento. La recalculación regular previene estancamientos en la pérdida de peso." },
    { question: "¿Qué distribución de macronutrientes debo seguir?", answer: "Un punto de partida comúnmente recomendado es 30% proteína, 40% carbohidratos y 30% grasa. Para pérdida de peso, aumentar la proteína al 35-40% ayuda a preservar la masa muscular. Para ganancia muscular, los carbohidratos pueden aumentarse al 45-50% para alimentar los entrenamientos. La proteína debe ser al menos 1.6-2.2 gramos por kilogramo de peso corporal para cualquier persona que haga ejercicio regularmente." },
    { question: "¿El porcentaje de grasa corporal afecta la precisión del TDEE?", answer: "Sí, significativamente. Dos personas que pesan lo mismo pero tienen diferentes porcentajes de grasa corporal tendrán diferentes TMBs porque el tejido muscular es metabólicamente más activo que el tejido graso. Proporcionar tu porcentaje de grasa corporal habilita la fórmula Katch-McArdle, que tiene en cuenta la masa corporal magra y puede dar una estimación de TMB más precisa." },
    { question: "¿Puede cambiar el TDEE incluso si mi peso se mantiene igual?", answer: "Sí. El TDEE puede cambiar debido a cambios en la composición corporal (ganar músculo mientras pierdes grasa), cambios en el nivel de actividad, fluctuaciones hormonales, estrés, calidad del sueño, envejecimiento y adaptación metabólica por dietas prolongadas. Los cambios estacionales de temperatura también pueden afectar ligeramente la TMB." },
  ],
  rating: { title: "Califica esta Calculadora", share: "Compartir", copied: "¡Copiado!", copyLink: "Copiar Enlace", clickToRate: "Clic para calificar", youRated: "Calificaste", stars: "estrellas", averageFrom: "promedio de", ratings: "calificaciones" },
  common: { home: "Inicio", calculators: "Calculadoras" },
  buttons: { calculate: "Calcular", reset: "Reiniciar", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Guardar", saved: "Guardado", saving: "Guardando..." },
  share: { calculatedWith: "Calculado con Kalcufy.com" },
  accessibility: { mobileResults: "Resumen de resultados", closeModal: "Cerrar", openMenu: "Abrir menú" },
  sources: { title: "Fuentes y Referencias" },
};

// ─────────────────────────────────────────────────────────────────────────────
// TRANSLATIONS (PT)
// ─────────────────────────────────────────────────────────────────────────────

const PT = {
  name: "Calculadora TDEE",
  slug: "calculadora-tdee",
  subtitle: "Calcule seu Gasto Energético Diário Total com 3 fórmulas científicas, gráficos interativos e metas calóricas personalizadas",
  breadcrumb: "TDEE",
  seo: { title: "Calculadora TDEE - Gasto Energético Diário Total Grátis", description: "Calcule seu TDEE com Mifflin-St Jeor, Harris-Benedict e Katch-McArdle. Metas calóricas personalizadas, distribuição de macros e gráficos interativos.", shortDescription: "Calcule seu gasto energético diário total e metas calóricas", keywords: ["calculadora TDEE", "gasto energético diário", "calculadora de calorias", "calculadora TMB", "calculadora de macros", "calorias diárias", "gasto energético", "taxa metabólica basal"] },
  calculator: { yourInformation: "Suas Informações" },
  ui: { yourInformation: "Suas Informações", calculate: "Calcular", reset: "Reiniciar", results: "Resultados" },
  inputs: {
    gender: { label: "Sexo Biológico", helpText: "Fórmulas de TMB diferem por sexo biológico", options: { male: "Masculino", female: "Feminino" } },
    age: { label: "Idade", helpText: "A taxa metabólica diminui ~2% por década após os 20" },
    activityLevel: { label: "Nível de Atividade", helpText: "Selecione sua atividade física semanal típica", options: { sedentary: "Sedentário (trabalho de escritório, pouco exercício)", light: "Levemente Ativo (1-3 dias/semana)", moderate: "Moderadamente Ativo (3-5 dias/semana)", active: "Muito Ativo (6-7 dias/semana)", veryActive: "Extremamente Ativo (atleta, 2x/dia)" } },
    bodyFatPercent: { label: "% de Gordura Corporal", helpText: "Opcional — habilita a fórmula Katch-McArdle para maior precisão" },
    showBmrComparison: { label: "Incluir Comparação de TMB", helpText: "Mostrar as 3 fórmulas de TMB lado a lado" },
  },
  results: { tdee: { label: "Calorias Diárias (TDEE)" }, bmrMifflin: { label: "TMB (Mifflin-St Jeor)" }, bmrHarris: { label: "TMB (Harris-Benedict)" }, bmrKatch: { label: "TMB (Katch-McArdle)" }, bmi: { label: "Índice de Massa Corporal" }, cuttingCalories: { label: "Perda de Peso (-500 cal)" }, bulkingCalories: { label: "Ganho de Peso (+500 cal)" }, protein: { label: "Proteína Diária" }, carbs: { label: "Carboidratos Diários" }, fats: { label: "Gordura Diária" } },
  tooltips: { tdee: "Seu gasto calórico diário total estimado incluindo toda atividade física", bmrMifflin: "Taxa metabólica basal usando a fórmula mais recomendada (Mifflin-St Jeor, 1990)", bmrHarris: "TMB usando a equação revisada de Harris-Benedict (Roza & Shizgal, 1984)", bmrKatch: "TMB usando massa corporal magra — requer percentual de gordura corporal", bmi: "Índice de Massa Corporal — razão entre peso e altura ao quadrado", cuttingCalories: "Meta calórica diária para perda de peso constante (déficit de 500 cal ≈ 0,45 kg/semana)", bulkingCalories: "Meta calórica diária para ganho muscular magro (superávit de 500 cal)", protein: "Ingestão diária de proteína recomendada", carbs: "Ingestão diária de carboidratos recomendada", fats: "Ingestão diária de gordura recomendada" },
  presets: { weightLoss: { label: "Perda de Peso", description: "Mulher, 30, atividade moderada" }, activeMale: { label: "Homem Ativo", description: "Homem, 28, muito ativo" }, beginner: { label: "Iniciante", description: "Homem, 35, levemente ativo" }, muscleGain: { label: "Ganho Muscular", description: "Homem, 25, ativo, 15% GC" } },
  values: { kcal: "kcal", "kcal/day": "kcal/dia", g: "g", "g/day": "g/dia", kg: "kg", lbs: "lbs", "%": "%", Underweight: "Abaixo do Peso", Normal: "Normal", Overweight: "Sobrepeso", Obese: "Obesidade", "Mifflin-St Jeor": "Mifflin-St Jeor", "Harris-Benedict": "Harris-Benedict", "Katch-McArdle": "Katch-McArdle", BMR: "TMB", TEF: "TEF (Efeito Térmico dos Alimentos)", NEAT: "NEAT (Atividade Não Exercício)", EAT: "EAT (Atividade de Exercício)", "Aggressive Cut": "Corte Agressivo (−25%)", "Moderate Cut": "Corte Moderado (−15%)", "Mild Cut": "Corte Leve (−10%)", Maintenance: "Manutenção", "Lean Bulk": "Volume Limpo (+10%)", "Moderate Bulk": "Volume Moderado (+15%)", "Aggressive Bulk": "Volume Agressivo (+25%)", "N/A": "N/D" },
  formats: { summary: "Seu TDEE é {tdee} kcal/dia (Mifflin-St Jeor). Para perda de peso mire {cutting} kcal/dia, para ganho muscular mire {bulking} kcal/dia." },
  charts: { title: "Análise Visual TDEE", series: { value: "Calorias (kcal)", calories: "Calorias Diárias (kcal)" }, tabs: { "tdee-breakdown": { label: "Composição do TDEE", icon: "🔥", subtitle: "Como seu corpo queima calorias" }, "formula-comparison": { label: "Comparação de Fórmulas", icon: "📊", subtitle: "Estimativas de TMB por método" }, "calorie-goals": { label: "Metas Calóricas", icon: "🎯", subtitle: "Metas diárias por objetivo" } } },
  infoCards: {
    dailyCalories: { title: "🔥 Metas Calóricas Diárias", items: [{ label: "Manutenção (TDEE)", valueKey: "tdee" }, { label: "Perda de Peso (−500)", valueKey: "cuttingCalories" }, { label: "Ganho de Peso (+500)", valueKey: "bulkingCalories" }] },
    macros: { title: "🥗 Macros Recomendados", items: [{ label: "Proteína", valueKey: "protein" }, { label: "Carboidratos", valueKey: "carbs" }, { label: "Gordura", valueKey: "fats" }] },
    tips: { title: "💡 Dicas Rápidas", items: ["Recalcule seu TDEE a cada 4-6 semanas conforme seu peso muda", "O nível de atividade tem o maior impacto no TDEE depois da TMB", "Adicionar o % de gordura corporal habilita a fórmula mais precisa (Katch-McArdle)", "Registre sua ingestão real por 2 semanas para calibrar sua estimativa de TDEE"] },
  },
  referenceData: { activityMultipliers: { title: "Multiplicadores de Nível de Atividade", items: [{ label: "Sedentário (trabalho de escritório, pouco exercício)", value: "TMB × 1.200" }, { label: "Levemente Ativo (1-3 dias/semana)", value: "TMB × 1.375" }, { label: "Moderadamente Ativo (3-5 dias/semana)", value: "TMB × 1.550" }, { label: "Muito Ativo (6-7 dias/semana)", value: "TMB × 1.725" }, { label: "Extremamente Ativo (atleta, 2x/dia)", value: "TMB × 1.900" }] } },
  education: {
    whatIsTdee: { title: "O que é TDEE?", content: "O Gasto Energético Diário Total (TDEE) é o número total de calorias que seu corpo queima em um período de 24 horas. Inclui toda forma de uso de energia — desde as calorias necessárias para manter seu coração batendo e pulmões respirando (taxa metabólica basal) até a energia gasta caminhando, digerindo alimentos e se exercitando. Entender seu TDEE é a base de qualquer plano nutricional eficaz porque diz exatamente quantas calorias você precisa consumir diariamente para manter seu peso atual. Comer abaixo do TDEE cria um déficit calórico que leva à perda de peso, enquanto comer acima cria um superávit que apoia o crescimento muscular. O conceito se tornou o padrão-ouro para nutricionistas e profissionais médicos ao projetar planos alimentares individualizados." },
    howTdeeWorks: { title: "Como o TDEE é Calculado", content: "O TDEE é calculado em dois passos. Primeiro, sua Taxa Metabólica Basal (TMB) é estimada usando uma fórmula científica validada como Mifflin-St Jeor, Harris-Benedict ou Katch-McArdle. A TMB representa as calorias que seu corpo precisa em repouso completo — apenas para manter funções vitais como respiração, circulação e regulação de temperatura. Tipicamente representa 60-75% da sua queima calórica diária total. Segundo, sua TMB é multiplicada por um fator de atividade que considera a energia adicional gasta através de movimento e exercício. Este multiplicador varia de 1.2 para sedentários a 1.9 para atletas extremamente ativos. Seu gasto total se divide em quatro componentes: TMB (funções basais), TEF (efeito térmico dos alimentos — ~8-10% da ingestão), NEAT (termogênese de atividade não exercício) e EAT (termogênese de atividade de exercício)." },
    formulas: { title: "Fórmulas de TMB Explicadas", items: [
      { text: "Mifflin-St Jeor (1990): A fórmula mais precisa para a população geral. Usa peso, altura, idade e sexo. Recomendada pela Academia de Nutrição e Dietética.", type: "info" as const },
      { text: "Harris-Benedict (Revisada 1984): A fórmula clássica de TMB, atualizada por Roza & Shizgal. Tende a superestimar a TMB em aproximadamente 5% comparada com Mifflin-St Jeor.", type: "info" as const },
      { text: "Katch-McArdle: Usa massa corporal magra em vez do peso total, tornando-a mais precisa para atletas e indivíduos magros. Requer conhecer seu percentual de gordura corporal.", type: "info" as const },
      { text: "Multiplicadores de atividade são estimativas. Se você tem trabalho de escritório mas treina 3x/semana, 'Moderadamente Ativo' (1.55) geralmente é o mais preciso.", type: "warning" as const },
      { text: "Nenhuma fórmula é 100% precisa — variação individual de ±10-15% é normal. Use seu TDEE como ponto de partida e ajuste com base em resultados reais em 2-4 semanas.", type: "warning" as const },
      { text: "A massa muscular afeta significativamente a TMB. Duas pessoas do mesmo peso podem ter TMBs diferindo em 200+ calorias se uma tiver mais massa magra.", type: "info" as const },
    ] },
    considerations: { title: "Considerações Importantes", items: [
      { text: "O TDEE é uma estimativa, não uma medição exata. O rastreamento real por 2-4 semanas é a forma mais confiável de calibrar suas necessidades calóricas pessoais.", type: "warning" as const },
      { text: "Nunca coma abaixo de 1.200 kcal/dia (mulheres) ou 1.500 kcal/dia (homens) sem supervisão médica.", type: "warning" as const },
      { text: "Recalcule seu TDEE a cada 4-6 semanas ou quando seu peso mudar mais de 5 kg.", type: "info" as const },
      { text: "Proporções de macros importam tanto quanto calorias totais. Ingestão alta de proteína (1.6-2.2 g/kg) ajuda a preservar músculo durante déficit calórico.", type: "info" as const },
      { text: "Adaptação metabólica ocorre durante dietas prolongadas — seu corpo pode reduzir o TDEE em 5-15% além do que a perda de peso sozinha prevê.", type: "warning" as const },
      { text: "Estresse, qualidade do sono, mudanças hormonais e medicamentos podem afetar seu gasto energético real independentemente do nível de atividade.", type: "info" as const },
    ] },
    examples: { title: "Exemplos de Cálculo", description: "Cálculos passo a passo do TDEE usando a equação Mifflin-St Jeor", examples: [
      { title: "Homem de 30 Anos (82 kg, 1,78 m, Atividade Moderada)", steps: ["Dados: 82 kg, 178 cm, 30 anos, masculino", "Mifflin-St Jeor (Homem): 10 × 82 + 6,25 × 178 − 5 × 30 + 5", "TMB = 820 + 1.113 − 150 + 5 = 1.788 kcal/dia", "Multiplicador: Moderadamente Ativo = 1,55", "TDEE = 1.788 × 1,55 = 2.771 kcal/dia", "Meta perda de peso: 2.771 − 500 = 2.271 kcal/dia"], result: "TDEE: 2.771 kcal/dia | Corte: 2.271 | Volume: 3.271" },
      { title: "Mulher de 25 Anos (64 kg, 1,65 m, Levemente Ativa)", steps: ["Dados: 64 kg, 165 cm, 25 anos, feminino", "Mifflin-St Jeor (Mulher): 10 × 64 + 6,25 × 165 − 5 × 25 − 161", "TMB = 640 + 1.031 − 125 − 161 = 1.385 kcal/dia", "Multiplicador: Levemente Ativa = 1,375", "TDEE = 1.385 × 1,375 = 1.904 kcal/dia", "Meta perda de peso: 1.904 − 500 = 1.404 kcal/dia"], result: "TDEE: 1.904 kcal/dia | Corte: 1.404 | Volume: 2.404" },
    ] },
  },
  faqs: [
    { question: "Qual a diferença entre TDEE e TMB?", answer: "A TMB é o número de calorias que seu corpo queima em repouso completo para funções vitais. O TDEE inclui sua TMB mais todas as calorias adicionais queimadas através de movimento, exercício e digestão. Seu TDEE é sempre maior que sua TMB — tipicamente 20-90% maior dependendo do nível de atividade." },
    { question: "Qual fórmula de TMB é a mais precisa?", answer: "A equação Mifflin-St Jeor (1990) é considerada a mais precisa para a população geral. Se você conhece seu percentual de gordura corporal, a fórmula Katch-McArdle pode ser mais precisa pois usa massa corporal magra." },
    { question: "Como escolho o nível de atividade correto?", answer: "A maioria das pessoas superestima seu nível de atividade. Se tem trabalho de escritório e se exercita 3-5 vezes por semana, 'Moderadamente Ativo' geralmente é a escolha correta. Na dúvida, escolha um nível abaixo." },
    { question: "Quantas calorias devo reduzir para perder peso?", answer: "Um déficit de 500 calorias por dia resulta em aproximadamente 0,45 kg de perda de peso por semana. Nunca fique abaixo de 1.200 kcal/dia (mulheres) ou 1.500 kcal/dia (homens) sem supervisão médica." },
    { question: "Com que frequência devo recalcular meu TDEE?", answer: "Recalcule a cada 4-6 semanas, ou quando seu peso mudar 5 kg ou mais. A recalculação regular previne estancamentos na perda de peso." },
    { question: "Qual distribuição de macronutrientes devo seguir?", answer: "Um ponto de partida recomendado é 30% proteína, 40% carboidratos e 30% gordura. Para perda de peso, aumente proteína para 35-40%. Proteína deve ser pelo menos 1,6-2,2 g por kg de peso corporal." },
    { question: "O percentual de gordura corporal afeta a precisão?", answer: "Sim, significativamente. Fornecer seu percentual de gordura corporal habilita a fórmula Katch-McArdle, que considera massa magra e dá estimativa mais precisa." },
    { question: "O TDEE pode mudar mesmo se meu peso ficar igual?", answer: "Sim. O TDEE pode mudar por alterações na composição corporal, nível de atividade, flutuações hormonais, estresse, qualidade do sono e adaptação metabólica." },
  ],
  rating: { title: "Avalie esta Calculadora", share: "Compartilhar", copied: "Copiado!", copyLink: "Copiar Link", clickToRate: "Clique para avaliar", youRated: "Você avaliou", stars: "estrelas", averageFrom: "média de", ratings: "avaliações" },
  common: { home: "Início", calculators: "Calculadoras" },
  buttons: { calculate: "Calcular", reset: "Reiniciar", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Salvar", saved: "Salvo", saving: "Salvando..." },
  share: { calculatedWith: "Calculado com Kalcufy.com" },
  accessibility: { mobileResults: "Resumo dos resultados", closeModal: "Fechar", openMenu: "Abrir menu" },
  sources: { title: "Fontes e Referências" },
};

// ─────────────────────────────────────────────────────────────────────────────
// TRANSLATIONS (FR)
// ─────────────────────────────────────────────────────────────────────────────

const FR = {
  name: "Calculateur TDEE", slug: "calculateur-tdee",
  subtitle: "Calculez votre Dépense Énergétique Journalière Totale avec 3 formules scientifiques, graphiques interactifs et objectifs caloriques personnalisés",
  breadcrumb: "TDEE",
  seo: { title: "Calculateur TDEE - Dépense Énergétique Journalière Gratuit", description: "Calculez votre TDEE avec Mifflin-St Jeor, Harris-Benedict et Katch-McArdle. Objectifs caloriques personnalisés, répartition des macros et graphiques interactifs.", shortDescription: "Calculez votre dépense énergétique journalière et objectifs caloriques", keywords: ["calculateur TDEE", "dépense énergétique journalière", "calculateur de calories", "calculateur MB", "calculateur de macros", "calories journalières", "dépense énergétique", "métabolisme de base"] },
  calculator: { yourInformation: "Vos Informations" },
  ui: { yourInformation: "Vos Informations", calculate: "Calculer", reset: "Réinitialiser", results: "Résultats" },
  inputs: {
    gender: { label: "Sexe Biologique", helpText: "Les formules de MB diffèrent selon le sexe biologique", options: { male: "Masculin", female: "Féminin" } },
    age: { label: "Âge", helpText: "Le taux métabolique diminue d'environ 2% par décennie après 20 ans" },
    activityLevel: { label: "Niveau d'Activité", helpText: "Sélectionnez votre activité physique hebdomadaire typique", options: { sedentary: "Sédentaire (travail de bureau, peu d'exercice)", light: "Légèrement Actif (1-3 jours/semaine)", moderate: "Modérément Actif (3-5 jours/semaine)", active: "Très Actif (6-7 jours/semaine)", veryActive: "Extrêmement Actif (athlète, 2x/jour)" } },
    bodyFatPercent: { label: "% de Graisse Corporelle", helpText: "Optionnel — active la formule Katch-McArdle pour plus de précision" },
    showBmrComparison: { label: "Inclure Comparaison TMB", helpText: "Afficher les 3 formules de TMB côte à côte" },
  },
  results: { tdee: { label: "Calories Journalières (TDEE)" }, bmrMifflin: { label: "MB (Mifflin-St Jeor)" }, bmrHarris: { label: "MB (Harris-Benedict)" }, bmrKatch: { label: "MB (Katch-McArdle)" }, bmi: { label: "Indice de Masse Corporelle" }, cuttingCalories: { label: "Perte de Poids (-500 cal)" }, bulkingCalories: { label: "Prise de Poids (+500 cal)" }, protein: { label: "Protéines Journalières" }, carbs: { label: "Glucides Journaliers" }, fats: { label: "Lipides Journaliers" } },
  tooltips: { tdee: "Votre dépense calorique journalière totale estimée incluant toute activité physique", bmrMifflin: "Métabolisme de base utilisant la formule la plus recommandée (Mifflin-St Jeor, 1990)", bmrHarris: "MB utilisant l'équation révisée de Harris-Benedict (Roza & Shizgal, 1984)", bmrKatch: "MB utilisant la masse corporelle maigre — nécessite le pourcentage de graisse corporelle", bmi: "Indice de Masse Corporelle — rapport poids/taille au carré", cuttingCalories: "Objectif calorique pour perte de poids (déficit de 500 cal ≈ 0,45 kg/semaine)", bulkingCalories: "Objectif calorique pour gain musculaire maigre (surplus de 500 cal)", protein: "Apport journalier en protéines recommandé", carbs: "Apport journalier en glucides recommandé", fats: "Apport journalier en lipides recommandé" },
  presets: { weightLoss: { label: "Perte de Poids", description: "Femme, 30, activité modérée" }, activeMale: { label: "Homme Actif", description: "Homme, 28, très actif" }, beginner: { label: "Débutant", description: "Homme, 35, légèrement actif" }, muscleGain: { label: "Gain Musculaire", description: "Homme, 25, actif, 15% MG" } },
  values: { kcal: "kcal", "kcal/day": "kcal/jour", g: "g", "g/day": "g/jour", kg: "kg", lbs: "lbs", "%": "%", Underweight: "Insuffisance Pondérale", Normal: "Normal", Overweight: "Surpoids", Obese: "Obésité", "Mifflin-St Jeor": "Mifflin-St Jeor", "Harris-Benedict": "Harris-Benedict", "Katch-McArdle": "Katch-McArdle", BMR: "MB", TEF: "TEF (Effet Thermique des Aliments)", NEAT: "NEAT (Activité Non Exercice)", EAT: "EAT (Activité d'Exercice)", "Aggressive Cut": "Coupe Agressive (−25%)", "Moderate Cut": "Coupe Modérée (−15%)", "Mild Cut": "Coupe Légère (−10%)", Maintenance: "Maintien", "Lean Bulk": "Prise Propre (+10%)", "Moderate Bulk": "Prise Modérée (+15%)", "Aggressive Bulk": "Prise Agressive (+25%)", "N/A": "N/D" },
  formats: { summary: "Votre TDEE est de {tdee} kcal/jour (Mifflin-St Jeor). Pour perdre du poids visez {cutting} kcal/jour, pour le gain musculaire visez {bulking} kcal/jour." },
  charts: { title: "Analyse Visuelle TDEE", series: { value: "Calories (kcal)", calories: "Calories Journalières (kcal)" }, tabs: { "tdee-breakdown": { label: "Composition du TDEE", icon: "🔥", subtitle: "Comment votre corps brûle les calories" }, "formula-comparison": { label: "Comparaison des Formules", icon: "📊", subtitle: "Estimations du MB par méthode" }, "calorie-goals": { label: "Objectifs Caloriques", icon: "🎯", subtitle: "Objectifs quotidiens par but" } } },
  infoCards: {
    dailyCalories: { title: "🔥 Objectifs Caloriques", items: [{ label: "Maintien (TDEE)", valueKey: "tdee" }, { label: "Perte de Poids (−500)", valueKey: "cuttingCalories" }, { label: "Prise de Poids (+500)", valueKey: "bulkingCalories" }] },
    macros: { title: "🥗 Macros Recommandés", items: [{ label: "Protéines", valueKey: "protein" }, { label: "Glucides", valueKey: "carbs" }, { label: "Lipides", valueKey: "fats" }] },
    tips: { title: "💡 Conseils Rapides", items: ["Recalculez votre TDEE toutes les 4-6 semaines à mesure que votre poids change", "Le niveau d'activité a le plus grand impact sur le TDEE après votre MB", "Ajouter le % de graisse corporelle active la formule la plus précise (Katch-McArdle)", "Suivez votre apport réel pendant 2 semaines pour calibrer votre estimation de TDEE"] },
  },
  referenceData: { activityMultipliers: { title: "Multiplicateurs de Niveau d'Activité", items: [{ label: "Sédentaire (travail de bureau, peu d'exercice)", value: "MB × 1,200" }, { label: "Légèrement Actif (1-3 jours/semaine)", value: "MB × 1,375" }, { label: "Modérément Actif (3-5 jours/semaine)", value: "MB × 1,550" }, { label: "Très Actif (6-7 jours/semaine)", value: "MB × 1,725" }, { label: "Extrêmement Actif (athlète, 2x/jour)", value: "MB × 1,900" }] } },
  education: {
    whatIsTdee: { title: "Qu'est-ce que le TDEE ?", content: "La Dépense Énergétique Journalière Totale (TDEE) est le nombre total de calories que votre corps brûle en 24 heures. Cela inclut chaque forme d'utilisation d'énergie — des calories nécessaires pour maintenir votre cœur et vos poumons en fonctionnement (métabolisme de base) à l'énergie dépensée en marchant, en digérant les aliments et en faisant de l'exercice. Comprendre votre TDEE est la base de tout plan nutritionnel efficace car il vous indique exactement combien de calories vous devez consommer chaque jour pour maintenir votre poids actuel. Manger en dessous de votre TDEE crée un déficit calorique menant à la perte de poids, tandis que manger au-dessus crée un surplus soutenant la croissance musculaire." },
    howTdeeWorks: { title: "Comment le TDEE est Calculé", content: "Le TDEE est calculé en deux étapes. Premièrement, votre Métabolisme de Base (MB) est estimé à l'aide d'une formule scientifique validée. Le MB représente les calories dont votre corps a besoin au repos complet. Il représente typiquement 60-75% de votre dépense calorique quotidienne totale. Deuxièmement, votre MB est multiplié par un facteur d'activité allant de 1,2 pour les sédentaires à 1,9 pour les athlètes extrêmement actifs. Votre dépense totale se décompose en : MB, TEF (effet thermique des aliments ~8-10%), NEAT (thermogenèse d'activité non exercice) et EAT (thermogenèse d'activité d'exercice)." },
    formulas: { title: "Formules de MB Expliquées", items: [
      { text: "Mifflin-St Jeor (1990) : La formule la plus précise pour la population générale. Utilise poids, taille, âge et sexe. Recommandée par l'Académie de Nutrition et Diététique.", type: "info" as const },
      { text: "Harris-Benedict (Révisée 1984) : La formule classique du MB, mise à jour par Roza & Shizgal. Tend à surestimer le MB d'environ 5% par rapport à Mifflin-St Jeor.", type: "info" as const },
      { text: "Katch-McArdle : Utilise la masse corporelle maigre au lieu du poids total, la rendant plus précise pour les athlètes. Nécessite de connaître votre pourcentage de graisse corporelle.", type: "info" as const },
      { text: "Les multiplicateurs d'activité sont des estimations. Si vous avez un travail de bureau mais vous entraînez 3x/semaine, 'Modérément Actif' (1,55) est généralement le plus précis.", type: "warning" as const },
      { text: "Aucune formule n'est précise à 100% — une variation individuelle de ±10-15% est normale. Utilisez votre TDEE comme point de départ et ajustez sur 2-4 semaines.", type: "warning" as const },
      { text: "La masse musculaire affecte significativement le MB. Deux personnes du même poids peuvent avoir des MB différant de 200+ calories.", type: "info" as const },
    ] },
    considerations: { title: "Considérations Importantes", items: [
      { text: "Le TDEE est une estimation, pas une mesure exacte. Le suivi réel sur 2-4 semaines est le moyen le plus fiable de calibrer vos besoins caloriques.", type: "warning" as const },
      { text: "Ne mangez jamais en dessous de 1 200 kcal/jour (femmes) ou 1 500 kcal/jour (hommes) sans supervision médicale.", type: "warning" as const },
      { text: "Recalculez votre TDEE toutes les 4-6 semaines ou quand votre poids change de plus de 5 kg.", type: "info" as const },
      { text: "Les ratios de macros comptent autant que les calories totales. Un apport élevé en protéines (1,6-2,2 g/kg) aide à préserver le muscle en déficit calorique.", type: "info" as const },
      { text: "L'adaptation métabolique survient lors de régimes prolongés — votre corps peut réduire le TDEE de 5-15%.", type: "warning" as const },
      { text: "Le stress, la qualité du sommeil, les changements hormonaux et les médicaments peuvent affecter votre dépense énergétique réelle.", type: "info" as const },
    ] },
    examples: { title: "Exemples de Calcul", description: "Calculs étape par étape du TDEE avec l'équation Mifflin-St Jeor", examples: [
      { title: "Homme de 30 Ans (82 kg, 1,78 m, Activité Modérée)", steps: ["Données : 82 kg, 178 cm, 30 ans, masculin", "Mifflin-St Jeor : 10 × 82 + 6,25 × 178 − 5 × 30 + 5", "MB = 1 788 kcal/jour", "Multiplicateur : Modérément Actif = 1,55", "TDEE = 1 788 × 1,55 = 2 771 kcal/jour", "Objectif perte de poids : 2 271 kcal/jour"], result: "TDEE : 2 771 kcal/jour | Coupe : 2 271 | Prise : 3 271" },
      { title: "Femme de 25 Ans (64 kg, 1,65 m, Légèrement Active)", steps: ["Données : 64 kg, 165 cm, 25 ans, féminin", "Mifflin-St Jeor : 10 × 64 + 6,25 × 165 − 5 × 25 − 161", "MB = 1 385 kcal/jour", "Multiplicateur : Légèrement Active = 1,375", "TDEE = 1 385 × 1,375 = 1 904 kcal/jour", "Objectif perte de poids : 1 404 kcal/jour"], result: "TDEE : 1 904 kcal/jour | Coupe : 1 404 | Prise : 2 404" },
    ] },
  },
  faqs: [
    { question: "Quelle est la différence entre TDEE et MB ?", answer: "Le MB est le nombre de calories brûlées au repos complet pour les fonctions vitales. Le TDEE inclut le MB plus toutes les calories supplémentaires brûlées par le mouvement, l'exercice et la digestion. Le TDEE est toujours supérieur au MB — typiquement 20-90% plus élevé." },
    { question: "Quelle formule de MB est la plus précise ?", answer: "L'équation Mifflin-St Jeor (1990) est considérée la plus précise pour la population générale. Si vous connaissez votre pourcentage de graisse corporelle, Katch-McArdle peut être plus précise." },
    { question: "Comment choisir le bon niveau d'activité ?", answer: "La plupart des gens surestiment leur niveau d'activité. Si vous avez un travail de bureau et faites du sport 3-5 fois par semaine, 'Modérément Actif' est généralement le bon choix." },
    { question: "Combien de calories réduire pour perdre du poids ?", answer: "Un déficit de 500 calories par jour résulte en environ 0,45 kg de perte de poids par semaine. Ne descendez jamais en dessous de 1 200 kcal/jour (femmes) ou 1 500 kcal/jour (hommes) sans supervision médicale." },
    { question: "À quelle fréquence recalculer mon TDEE ?", answer: "Recalculez toutes les 4-6 semaines, ou quand votre poids change de 5 kg ou plus." },
    { question: "Quelle répartition de macronutriments suivre ?", answer: "Un point de départ recommandé est 30% protéines, 40% glucides et 30% lipides. Pour la perte de poids, augmentez les protéines à 35-40%." },
    { question: "Le % de graisse corporelle affecte-t-il la précision ?", answer: "Oui, significativement. Cela active la formule Katch-McArdle qui prend en compte la masse maigre." },
    { question: "Le TDEE peut-il changer si mon poids reste stable ?", answer: "Oui. Le TDEE peut changer en raison de changements dans la composition corporelle, le niveau d'activité, les fluctuations hormonales, le stress et la qualité du sommeil." },
  ],
  rating: { title: "Évaluez cette Calculatrice", share: "Partager", copied: "Copié !", copyLink: "Copier le Lien", clickToRate: "Cliquez pour évaluer", youRated: "Vous avez évalué", stars: "étoiles", averageFrom: "moyenne de", ratings: "évaluations" },
  common: { home: "Accueil", calculators: "Calculateurs" },
  buttons: { calculate: "Calculer", reset: "Réinitialiser", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Sauvegarder", saved: "Sauvegardé", saving: "Sauvegarde..." },
  share: { calculatedWith: "Calculé avec Kalcufy.com" },
  accessibility: { mobileResults: "Résumé des résultats", closeModal: "Fermer", openMenu: "Ouvrir le menu" },
  sources: { title: "Sources et Références" },
};

// ─────────────────────────────────────────────────────────────────────────────
// TRANSLATIONS (DE)
// ─────────────────────────────────────────────────────────────────────────────

const DE = {
  name: "TDEE-Rechner", slug: "tdee-rechner",
  subtitle: "Berechnen Sie Ihren Gesamten Täglichen Energieverbrauch mit 3 wissenschaftlichen Formeln, interaktiven Diagrammen und personalisierten Kalorienzielen",
  breadcrumb: "TDEE",
  seo: { title: "TDEE-Rechner - Gesamter Täglicher Energieverbrauch Kostenlos", description: "Berechnen Sie Ihren TDEE mit Mifflin-St Jeor, Harris-Benedict und Katch-McArdle. Personalisierte Kalorienziele, Makronährstoffverteilung und interaktive Diagramme.", shortDescription: "Berechnen Sie Ihren täglichen Energieverbrauch und Kalorienziele", keywords: ["TDEE-Rechner", "täglicher Energieverbrauch", "Kalorienrechner", "Grundumsatz-Rechner", "Makro-Rechner", "täglicher Kalorienbedarf", "Energieverbrauch", "Grundumsatz"] },
  calculator: { yourInformation: "Ihre Informationen" },
  ui: { yourInformation: "Ihre Informationen", calculate: "Berechnen", reset: "Zurücksetzen", results: "Ergebnisse" },
  inputs: {
    gender: { label: "Biologisches Geschlecht", helpText: "Grundumsatz-Formeln unterscheiden sich nach biologischem Geschlecht", options: { male: "Männlich", female: "Weiblich" } },
    age: { label: "Alter", helpText: "Der Stoffwechsel sinkt ca. 2% pro Jahrzehnt nach 20" },
    activityLevel: { label: "Aktivitätslevel", helpText: "Wählen Sie Ihre typische wöchentliche körperliche Aktivität", options: { sedentary: "Sitzend (Bürojob, wenig Bewegung)", light: "Leicht Aktiv (1-3 Tage/Woche)", moderate: "Mäßig Aktiv (3-5 Tage/Woche)", active: "Sehr Aktiv (6-7 Tage/Woche)", veryActive: "Extrem Aktiv (Athlet, 2x/Tag)" } },
    bodyFatPercent: { label: "Körperfettanteil %", helpText: "Optional — aktiviert die Katch-McArdle-Formel für höhere Genauigkeit" },
    showBmrComparison: { label: "BMR-Vergleich einbeziehen", helpText: "Alle 3 BMR-Formeln nebeneinander anzeigen" },
  },
  results: { tdee: { label: "Tägliche Kalorien (TDEE)" }, bmrMifflin: { label: "GU (Mifflin-St Jeor)" }, bmrHarris: { label: "GU (Harris-Benedict)" }, bmrKatch: { label: "GU (Katch-McArdle)" }, bmi: { label: "Body-Mass-Index" }, cuttingCalories: { label: "Gewichtsverlust (-500 kcal)" }, bulkingCalories: { label: "Gewichtszunahme (+500 kcal)" }, protein: { label: "Tägliches Protein" }, carbs: { label: "Tägliche Kohlenhydrate" }, fats: { label: "Tägliches Fett" } },
  tooltips: { tdee: "Ihr geschätzter täglicher Gesamtkalorienverbrauch einschließlich aller körperlichen Aktivität", bmrMifflin: "Grundumsatz mit der am meisten empfohlenen Formel (Mifflin-St Jeor, 1990)", bmrHarris: "GU mit der revidierten Harris-Benedict-Gleichung (Roza & Shizgal, 1984)", bmrKatch: "GU mit fettfreier Körpermasse — erfordert Körperfettanteil", bmi: "Body-Mass-Index — Verhältnis von Gewicht zu Körpergröße zum Quadrat", cuttingCalories: "Tägliches Kalorienziel für Gewichtsverlust (500 kcal Defizit ≈ 0,45 kg/Woche)", bulkingCalories: "Tägliches Kalorienziel für Muskelaufbau (500 kcal Überschuss)", protein: "Empfohlene tägliche Proteinzufuhr", carbs: "Empfohlene tägliche Kohlenhydratzufuhr", fats: "Empfohlene tägliche Fettzufuhr" },
  presets: { weightLoss: { label: "Gewichtsverlust", description: "Frau, 30, mäßige Aktivität" }, activeMale: { label: "Aktiver Mann", description: "Mann, 28, sehr aktiv" }, beginner: { label: "Anfänger", description: "Mann, 35, leicht aktiv" }, muscleGain: { label: "Muskelaufbau", description: "Mann, 25, aktiv, 15% KF" } },
  values: { kcal: "kcal", "kcal/day": "kcal/Tag", g: "g", "g/day": "g/Tag", kg: "kg", lbs: "lbs", "%": "%", Underweight: "Untergewicht", Normal: "Normalgewicht", Overweight: "Übergewicht", Obese: "Adipositas", "Mifflin-St Jeor": "Mifflin-St Jeor", "Harris-Benedict": "Harris-Benedict", "Katch-McArdle": "Katch-McArdle", BMR: "GU", TEF: "TEF (Thermischer Effekt der Nahrung)", NEAT: "NEAT (Nicht-Trainings-Aktivität)", EAT: "EAT (Trainings-Aktivität)", "Aggressive Cut": "Aggressiver Cut (−25%)", "Moderate Cut": "Moderater Cut (−15%)", "Mild Cut": "Leichter Cut (−10%)", Maintenance: "Erhaltung", "Lean Bulk": "Sauberer Aufbau (+10%)", "Moderate Bulk": "Moderater Aufbau (+15%)", "Aggressive Bulk": "Aggressiver Aufbau (+25%)", "N/A": "k.A." },
  formats: { summary: "Ihr TDEE beträgt {tdee} kcal/Tag (Mifflin-St Jeor). Zum Abnehmen streben Sie {cutting} kcal/Tag an, für Muskelaufbau {bulking} kcal/Tag." },
  charts: { title: "TDEE Visuelle Analyse", series: { value: "Kalorien (kcal)", calories: "Tägliche Kalorien (kcal)" }, tabs: { "tdee-breakdown": { label: "TDEE-Aufschlüsselung", icon: "🔥", subtitle: "Wie Ihr Körper Kalorien verbrennt" }, "formula-comparison": { label: "Formelvergleich", icon: "📊", subtitle: "GU-Schätzungen nach Methode" }, "calorie-goals": { label: "Kalorienziele", icon: "🎯", subtitle: "Tägliche Ziele nach Zweck" } } },
  infoCards: {
    dailyCalories: { title: "🔥 Tägliche Kalorienziele", items: [{ label: "Erhaltung (TDEE)", valueKey: "tdee" }, { label: "Gewichtsverlust (−500)", valueKey: "cuttingCalories" }, { label: "Gewichtszunahme (+500)", valueKey: "bulkingCalories" }] },
    macros: { title: "🥗 Empfohlene Makros", items: [{ label: "Protein", valueKey: "protein" }, { label: "Kohlenhydrate", valueKey: "carbs" }, { label: "Fett", valueKey: "fats" }] },
    tips: { title: "💡 Schnelle Tipps", items: ["Berechnen Sie Ihren TDEE alle 4-6 Wochen neu", "Das Aktivitätslevel hat den größten Einfluss auf den TDEE nach dem Grundumsatz", "Der Körperfettanteil aktiviert die genaueste Formel (Katch-McArdle)", "Verfolgen Sie Ihre tatsächliche Aufnahme 2 Wochen lang zur Kalibrierung"] },
  },
  referenceData: { activityMultipliers: { title: "Aktivitätslevel-Multiplikatoren", items: [{ label: "Sitzend (Bürojob, wenig Bewegung)", value: "GU × 1,200" }, { label: "Leicht Aktiv (1-3 Tage/Woche)", value: "GU × 1,375" }, { label: "Mäßig Aktiv (3-5 Tage/Woche)", value: "GU × 1,550" }, { label: "Sehr Aktiv (6-7 Tage/Woche)", value: "GU × 1,725" }, { label: "Extrem Aktiv (Athlet, 2x/Tag)", value: "GU × 1,900" }] } },
  education: {
    whatIsTdee: { title: "Was ist TDEE?", content: "Der Gesamte Tägliche Energieverbrauch (TDEE) ist die Gesamtanzahl der Kalorien, die Ihr Körper in 24 Stunden verbrennt. Er umfasst jede Form der Energienutzung — von den Kalorien für Herzschlag und Atmung (Grundumsatz) bis zur Energie beim Gehen, Verdauen und Sport. Das Verständnis Ihres TDEE ist die Grundlage jedes effektiven Ernährungsplans, da er genau angibt, wie viele Kalorien Sie täglich konsumieren müssen. Essen unter dem TDEE erzeugt ein Kaloriendefizit das zum Gewichtsverlust führt, während Essen darüber Muskelwachstum unterstützt." },
    howTdeeWorks: { title: "Wie wird der TDEE berechnet?", content: "Der TDEE wird in zwei Schritten berechnet. Zuerst wird Ihr Grundumsatz (GU) mit einer validierten Formel geschätzt. Der GU repräsentiert die Kalorien in vollständiger Ruhe — typischerweise 60-75% des Gesamtverbrauchs. Zweitens wird der GU mit einem Aktivitätsfaktor (1,2 bis 1,9) multipliziert. Ihr Gesamtverbrauch gliedert sich in: GU, TEF (thermischer Effekt der Nahrung ~8-10%), NEAT (Nicht-Trainings-Thermogenese) und EAT (Trainings-Thermogenese)." },
    formulas: { title: "Grundumsatz-Formeln Erklärt", items: [
      { text: "Mifflin-St Jeor (1990): Die genaueste Formel für die Allgemeinbevölkerung. Verwendet Gewicht, Größe, Alter und Geschlecht.", type: "info" as const },
      { text: "Harris-Benedict (Revidiert 1984): Die klassische GU-Formel, aktualisiert von Roza & Shizgal. Überschätzt den GU um etwa 5%.", type: "info" as const },
      { text: "Katch-McArdle: Verwendet fettfreie Körpermasse, genauer für Athleten. Erfordert Kenntnis des Körperfettanteils.", type: "info" as const },
      { text: "Aktivitätsmultiplikatoren sind Schätzungen. Bei Bürojob mit 3x/Woche Training ist 'Mäßig Aktiv' (1,55) meist am genauesten.", type: "warning" as const },
      { text: "Keine Formel ist 100% genau — individuelle Abweichungen von ±10-15% sind normal. Verwenden Sie Ihren TDEE als Ausgangspunkt.", type: "warning" as const },
      { text: "Muskelmasse beeinflusst den GU erheblich. Zwei Personen gleichen Gewichts können GUs haben, die sich um 200+ Kalorien unterscheiden.", type: "info" as const },
    ] },
    considerations: { title: "Wichtige Hinweise", items: [
      { text: "Der TDEE ist eine Schätzung. Tatsächliche Verfolgung über 2-4 Wochen ist die zuverlässigste Methode zur Kalibrierung.", type: "warning" as const },
      { text: "Essen Sie nie unter 1.200 kcal/Tag (Frauen) oder 1.500 kcal/Tag (Männer) ohne ärztliche Aufsicht.", type: "warning" as const },
      { text: "Berechnen Sie Ihren TDEE alle 4-6 Wochen oder bei Gewichtsänderungen von mehr als 5 kg neu.", type: "info" as const },
      { text: "Makroverhältnisse sind genauso wichtig wie Gesamtkalorien. Hohe Proteinzufuhr (1,6-2,2 g/kg) hilft, Muskeln zu erhalten.", type: "info" as const },
      { text: "Metabolische Anpassung tritt bei längeren Diäten auf — Ihr Körper kann den TDEE um 5-15% reduzieren.", type: "warning" as const },
      { text: "Stress, Schlafqualität, hormonelle Veränderungen und Medikamente können Ihren Energieverbrauch beeinflussen.", type: "info" as const },
    ] },
    examples: { title: "Berechnungsbeispiele", description: "Schritt-für-Schritt TDEE-Berechnungen", examples: [
      { title: "30-Jähriger Mann (82 kg, 1,78 m, Mäßige Aktivität)", steps: ["Daten: 82 kg, 178 cm, 30 Jahre, männlich", "Mifflin-St Jeor: 10 × 82 + 6,25 × 178 − 5 × 30 + 5", "GU = 1.788 kcal/Tag", "Multiplikator: Mäßig Aktiv = 1,55", "TDEE = 1.788 × 1,55 = 2.771 kcal/Tag", "Abnehmziel: 2.271 kcal/Tag"], result: "TDEE: 2.771 kcal/Tag | Cut: 2.271 | Aufbau: 3.271" },
      { title: "25-Jährige Frau (64 kg, 1,65 m, Leicht Aktiv)", steps: ["Daten: 64 kg, 165 cm, 25 Jahre, weiblich", "Mifflin-St Jeor: 10 × 64 + 6,25 × 165 − 5 × 25 − 161", "GU = 1.385 kcal/Tag", "Multiplikator: Leicht Aktiv = 1,375", "TDEE = 1.385 × 1,375 = 1.904 kcal/Tag", "Abnehmziel: 1.404 kcal/Tag"], result: "TDEE: 1.904 kcal/Tag | Cut: 1.404 | Aufbau: 2.404" },
    ] },
  },
  faqs: [
    { question: "Was ist der Unterschied zwischen TDEE und GU?", answer: "Der GU ist die Kalorienmenge in Ruhe für vitale Funktionen. Der TDEE umfasst den GU plus alle Kalorien durch Bewegung, Sport und Verdauung. Der TDEE ist immer höher — typischerweise 20-90% mehr." },
    { question: "Welche GU-Formel ist am genauesten?", answer: "Die Mifflin-St Jeor-Gleichung (1990) gilt als die genaueste. Wenn Sie Ihren Körperfettanteil kennen, kann Katch-McArdle genauer sein." },
    { question: "Wie wähle ich das richtige Aktivitätslevel?", answer: "Die meisten überschätzen ihr Aktivitätslevel. Bei Bürojob und 3-5x Sport ist 'Mäßig Aktiv' meist richtig. Im Zweifel eine Stufe niedriger." },
    { question: "Wie viele Kalorien zum Abnehmen reduzieren?", answer: "Ein Defizit von 500 kcal/Tag ergibt ~0,45 kg Gewichtsverlust pro Woche. Nie unter 1.200 kcal (Frauen) oder 1.500 kcal (Männer) ohne Arzt." },
    { question: "Wie oft TDEE neu berechnen?", answer: "Alle 4-6 Wochen oder bei Gewichtsänderungen von 5+ kg. Regelmäßige Neuberechnung verhindert Plateaus." },
    { question: "Welche Makronährstoffverteilung?", answer: "Empfohlen: 30% Protein, 40% Kohlenhydrate, 30% Fett. Zum Abnehmen Protein auf 35-40% erhöhen. Mindestens 1,6-2,2 g Protein pro kg." },
    { question: "Beeinflusst Körperfett die Genauigkeit?", answer: "Ja, erheblich. Körperfettanteil aktiviert Katch-McArdle für genauere Schätzungen basierend auf fettfreier Masse." },
    { question: "Kann sich TDEE bei gleichem Gewicht ändern?", answer: "Ja. Durch Änderungen der Körperzusammensetzung, Aktivitätslevel, Hormone, Stress, Schlaf und metabolische Anpassung." },
  ],
  rating: { title: "Bewerten Sie diesen Rechner", share: "Teilen", copied: "Kopiert!", copyLink: "Link Kopieren", clickToRate: "Zum Bewerten klicken", youRated: "Sie bewerteten", stars: "Sterne", averageFrom: "Durchschnitt von", ratings: "Bewertungen" },
  common: { home: "Startseite", calculators: "Rechner" },
  buttons: { calculate: "Berechnen", reset: "Zurücksetzen", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Speichern", saved: "Gespeichert", saving: "Speichern..." },
  share: { calculatedWith: "Berechnet mit Kalcufy.com" },
  accessibility: { mobileResults: "Ergebnisübersicht", closeModal: "Schließen", openMenu: "Menü öffnen" },
  sources: { title: "Quellen und Referenzen" },
};

// ─────────────────────────────────────────────────────────────────────────────
// CALCULATOR CONFIG
// ─────────────────────────────────────────────────────────────────────────────

export const tdeeCalculatorConfig: CalculatorConfigV4 = {
  id: "tdee",
  version: "4.3",
  category: "health",
  icon: "🔥",

  // ─── PRESETS ─────────────────────────────────────────────────────────────
  // Weight in lbs (defaultUnit), height in cm (defaultUnit)
  presets: [
    {
      id: "weightLoss",
      icon: "🔥",
      values: { gender: "female", age: 30, weight: 150, height: 165, activityLevel: "moderate", bodyFatPercent: null, showBmrComparison: false },
    },
    {
      id: "activeMale",
      icon: "🏃",
      values: { gender: "male", age: 28, weight: 180, height: 180, activityLevel: "active", bodyFatPercent: null, showBmrComparison: false },
    },
    {
      id: "beginner",
      icon: "🚶",
      values: { gender: "male", age: 35, weight: 198, height: 175, activityLevel: "light", bodyFatPercent: null, showBmrComparison: false },
    },
    {
      id: "muscleGain",
      icon: "💪",
      values: { gender: "male", age: 25, weight: 170, height: 178, activityLevel: "active", bodyFatPercent: 15, showBmrComparison: true },
    },
  ],

  // ─── TRANSLATIONS ────────────────────────────────────────────────────────
  t: {
    en: EN,
    es: ES,
    pt: PT,
    fr: FR,
    de: DE,
  },
  // ─── INPUTS ──────────────────────────────────────────────────────────────
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
      max: 100,
      step: 1,
    },
    // ── Weight ────────────────────────────────────────────────────────────
            {
      id: "weight",
      type: "number",
      defaultValue: null,
      placeholder: "180",
      min: 30,
      max: 270,
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
      placeholder: "170",
      step: 1,
      unitType: "height",
      syncGroup: false,
      defaultUnit: "ft_in",
      allowedUnits: ["cm", "m", "in", "ft_in"],
    },    // ── Height ────────────────────────────────────────────────────────────
                // ── Activity ──────────────────────────────────────────────────────────
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
    // ── Optional: Body Fat % ──────────────────────────────────────────────
    {
      id: "bodyFatPercent",
      type: "number",
      defaultValue: null,
      placeholder: "20",
      min: 3,
      max: 60,
      step: 0.5,
    },
    // ── V4.3 Toggle: BMR Comparison ─────────────────────────────────────
    {
      id: "showBmrComparison",
      type: "toggle",
      defaultValue: false,
    },
  ],

  inputGroups: [], // CRITICAL: Empty to avoid accordion collapse

  // ─── RESULTS ─────────────────────────────────────────────────────────────
  results: [
    { id: "tdee", type: "primary", format: "number" },
    { id: "bmrMifflin", type: "secondary", format: "number" },
    { id: "bmrHarris", type: "secondary", format: "number", showWhen: { field: "showBmrComparison", value: true } },
    { id: "bmrKatch", type: "secondary", format: "number", showWhen: { field: "showBmrComparison", value: true } },
    { id: "bmi", type: "secondary", format: "number" },
    { id: "cuttingCalories", type: "secondary", format: "number" },
    { id: "bulkingCalories", type: "secondary", format: "number" },
    { id: "protein", type: "secondary", format: "number" },
    { id: "carbs", type: "secondary", format: "number" },
    { id: "fats", type: "secondary", format: "number" },
  ],

  // ─── MULTI-CHART (3 tabs) ───────────────────────────────────────────────
  charts: [
    {
      id: "tdee-breakdown",
      type: "bar",
      xKey: "name",
      series: [{ key: "value", color: "#f97316" }],
      height: 300,
      showGrid: true,
      showTooltip: true,
      showLegend: false,
      yAxisFormat: "number",
    },
    {
      id: "formula-comparison",
      type: "bar",
      xKey: "name",
      series: [{ key: "value", color: "#3b82f6" }],
      height: 300,
      showGrid: true,
      showTooltip: true,
      showLegend: false,
      yAxisFormat: "number",
    },
    {
      id: "calorie-goals",
      type: "bar",
      xKey: "name",
      series: [{ key: "calories", color: "#10b981" }],
      height: 300,
      showGrid: true,
      showTooltip: true,
      showLegend: false,
      yAxisFormat: "number",
    },
  ],

  // ─── INFO CARDS ──────────────────────────────────────────────────────────
  infoCards: [
    {
      id: "macros",
      type: "list",
      icon: "🥗",
      items: [
        { valueKey: "protein" },
        { valueKey: "carbs" },
        { valueKey: "fats" },
      ],
    },
    {
      id: "tips",
      type: "horizontal",
      icon: "💡",
      items: [{}, {}, {}, {}],
    },
  ],

  // ─── REFERENCE DATA ──────────────────────────────────────────────────────
  referenceData: [
    {
      id: "activityMultipliers",
      icon: "📋",
      columns: 2,
    },
  ],

  // ─── EDUCATION SECTIONS ──────────────────────────────────────────────────
  educationSections: [
    { id: "whatIsTdee", type: "prose", icon: "📖" },
    { id: "howTdeeWorks", type: "prose", icon: "⚙️" },
    { id: "formulas", type: "list", icon: "🧬" },
    { id: "considerations", type: "list", icon: "⚠️" },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2 },
  ],

  // ─── FAQs ────────────────────────────────────────────────────────────────
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

  // ─── REFERENCES ──────────────────────────────────────────────────────────
  references: [
    {
      authors: "Mifflin MD, St Jeor ST, Hill LA, Scott BJ, Daugherty SA, Koh YO",
      year: "1990",
      title:
        "A new predictive equation for resting energy expenditure in healthy individuals",
      source: "American Journal of Clinical Nutrition, 51(2):241-247",
      url: "https://pubmed.ncbi.nlm.nih.gov/2305711/",
    },
    {
      authors: "Roza AM, Shizgal HM",
      year: "1984",
      title:
        "The Harris Benedict equation reevaluated: resting energy requirements and the body cell mass",
      source: "American Journal of Clinical Nutrition, 40(1):168-182",
      url: "https://pubmed.ncbi.nlm.nih.gov/6741850/",
    },
    {
      authors: "Frankenfield D, Roth-Yousey L, Compher C",
      year: "2005",
      title:
        "Comparison of predictive equations for resting metabolic rate in healthy nonobese and obese adults: a systematic review",
      source: "Journal of the American Dietetic Association, 105(5):775-789",
      url: "https://pubmed.ncbi.nlm.nih.gov/15883556/",
    },
  ],

  // ─── UI CONFIG ───────────────────────────────────────────────────────────
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
    "bmi-calculator",
    "calorie-calculator",
    "body-fat-calculator",
  ],
  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// CALCULATE FUNCTION
// ─────────────────────────────────────────────────────────────────────────────

const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

// Approximate EAT (Exercise Activity Thermogenesis) fraction of TDEE
const EAT_FRACTIONS: Record<string, number> = {
  sedentary: 0.02,
  light: 0.05,
  moderate: 0.1,
  active: 0.15,
  veryActive: 0.2,
};

function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export function calculateTdee(data: {
  values: Record<string, unknown>;
  units?: Record<string, string>;
  unitSystem?: "metric" | "imperial";
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;

  // ── Translation helpers ────────────────────────────────────────────────
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read inputs ────────────────────────────────────────────────────────
  const gender = (values.gender as string) || "male";
  const age = values.age as number;
  const activityLevel = (values.activityLevel as string) || "moderate";
  const bodyFatPercent = values.bodyFatPercent as number | null;
  const showBmrComparison = values.showBmrComparison === true;

  // ── Convert to metric using Unit Engine ────────────────────────────────
  const weightKg = values.weight
    ? convertToBase(values.weight as number, fieldUnits.weight || "lbs", "weight")
    : null;

  const heightCm = values.height
    ? convertToBase(values.height as number, fieldUnits.height || "ft_in", "height")
    : null;

  // ── Validate required fields ───────────────────────────────────────────
  if (
    weightKg === null ||
    weightKg === undefined ||
    heightCm === null ||
    heightCm === undefined ||
    !age
  ) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── FORMULA CALCULATIONS ───────────────────────────────────────────────

  // 1. Mifflin-St Jeor (1990)
  const bmrMifflin =
    gender === "male"
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

  // 2. Harris-Benedict (Revised 1984 — Roza & Shizgal)
  const bmrHarris =
    gender === "male"
      ? 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age
      : 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age;

  // 3. Katch-McArdle (requires body fat %)
  let bmrKatch: number | null = null;
  let leanMassKg: number | null = null;
  let fatMassKg: number | null = null;

  if (
    bodyFatPercent !== null &&
    bodyFatPercent !== undefined &&
    bodyFatPercent > 0
  ) {
    leanMassKg = weightKg * (1 - bodyFatPercent / 100);
    fatMassKg = weightKg * (bodyFatPercent / 100);
    bmrKatch = 370 + 21.6 * leanMassKg;
  }

  // ── TDEE (using Mifflin-St Jeor as primary) ───────────────────────────
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.55;
  const tdee = Math.round(bmrMifflin * multiplier);

  // ── BMI ────────────────────────────────────────────────────────────────
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const bmiCategory = getBMICategory(bmi);

  // ── Calorie Goals ──────────────────────────────────────────────────────
  const cuttingCalories = Math.round(tdee - 500);
  const bulkingCalories = Math.round(tdee + 500);

  // ── Macros (30% protein, 40% carbs, 30% fat of TDEE) ──────────────────
  const proteinGrams = Math.round((tdee * 0.3) / 4);
  const carbsGrams = Math.round((tdee * 0.4) / 4);
  const fatGrams = Math.round((tdee * 0.3) / 9);

  // ── Translate dynamic values ───────────────────────────────────────────
  const kcalUnit = v["kcal"] || "kcal";
  const gUnit = v["g"] || "g";
  const kgUnit = v["kg"] || "kg";
  const lbsUnit = v["lbs"] || "lbs";
  const naLabel = v["N/A"] || "N/A";
  const translatedCategory = v[bmiCategory] || bmiCategory;

  // ── Weight display unit ────────────────────────────────────────────────
  const wUnit = fieldUnits.weight || "lbs";
  const weightUnit = (wUnit === "kg") ? kgUnit : lbsUnit;

  // ── Format results ─────────────────────────────────────────────────────
  const formatted: Record<string, string> = {
    tdee: `${tdee.toLocaleString()} ${kcalUnit}`,
    bmrMifflin: `${Math.round(bmrMifflin).toLocaleString()} ${kcalUnit}`,
    ...(showBmrComparison ? {
      bmrHarris: `${Math.round(bmrHarris).toLocaleString()} ${kcalUnit}`,
      bmrKatch:
        bmrKatch !== null
          ? `${Math.round(bmrKatch).toLocaleString()} ${kcalUnit}`
          : naLabel,
    } : {}),
    bmi: `${bmi.toFixed(1)} (${translatedCategory})`,
    cuttingCalories: `${cuttingCalories.toLocaleString()} ${kcalUnit}`,
    bulkingCalories: `${bulkingCalories.toLocaleString()} ${kcalUnit}`,
    protein: `${proteinGrams} ${gUnit}`,
    carbs: `${carbsGrams} ${gUnit}`,
    fats: `${fatGrams} ${gUnit}`,
  };

  // ── Summary ────────────────────────────────────────────────────────────
  const summaryTemplate =
    f.summary ||
    "Your TDEE is {tdee} kcal/day (Mifflin-St Jeor). For weight loss aim for {cutting} kcal/day, for muscle gain target {bulking} kcal/day.";

  const summary = summaryTemplate
    .replace("{tdee}", tdee.toLocaleString())
    .replace("{cutting}", cuttingCalories.toLocaleString())
    .replace("{bulking}", bulkingCalories.toLocaleString());

  // ── CHART DATA ─────────────────────────────────────────────────────────

  // Tab 1: TDEE Breakdown (BMR, TEF, NEAT, EAT)
  const tef = Math.round(tdee * 0.08);
  const eatFraction = EAT_FRACTIONS[activityLevel] || 0.1;
  const eat = Math.round(tdee * eatFraction);
  const neat = Math.max(0, tdee - Math.round(bmrMifflin) - tef - eat);

  const tdeeBreakdownData = [
    { name: v["BMR"] || "BMR", value: Math.round(bmrMifflin) },
    { name: v["NEAT"] || "NEAT", value: neat },
    { name: v["TEF"] || "TEF", value: tef },
    { name: v["EAT"] || "EAT", value: eat },
  ];

  // Tab 2: Formula Comparison (only when toggle is ON)
  let formulaData: Array<Record<string, unknown>> = [];
  if (showBmrComparison) {
    formulaData = [
      {
        name: v["Mifflin-St Jeor"] || "Mifflin-St Jeor",
        value: Math.round(bmrMifflin),
      },
      {
        name: v["Harris-Benedict"] || "Harris-Benedict",
        value: Math.round(bmrHarris),
      },
    ];
    if (bmrKatch !== null) {
      formulaData.push({
        name: v["Katch-McArdle"] || "Katch-McArdle",
        value: Math.round(bmrKatch),
      });
    }
  }

  // Tab 3: Calorie Goals
  const calorieGoalsData = [
    {
      name: v["Aggressive Cut"] || "Aggressive Cut (−25%)",
      calories: Math.round(tdee * 0.75),
    },
    {
      name: v["Moderate Cut"] || "Moderate Cut (−15%)",
      calories: Math.round(tdee * 0.85),
    },
    {
      name: v["Mild Cut"] || "Mild Cut (−10%)",
      calories: Math.round(tdee * 0.9),
    },
    {
      name: v["Maintenance"] || "Maintenance",
      calories: tdee,
    },
    {
      name: v["Lean Bulk"] || "Lean Bulk (+10%)",
      calories: Math.round(tdee * 1.1),
    },
    {
      name: v["Moderate Bulk"] || "Moderate Bulk (+15%)",
      calories: Math.round(tdee * 1.15),
    },
    {
      name: v["Aggressive Bulk"] || "Aggressive Bulk (+25%)",
      calories: Math.round(tdee * 1.25),
    },
  ];

  // ── RETURN ─────────────────────────────────────────────────────────────
  return {
    values: {
      tdee,
      bmrMifflin: Math.round(bmrMifflin),
      ...(showBmrComparison ? {
        bmrHarris: Math.round(bmrHarris),
        bmrKatch: bmrKatch !== null ? Math.round(bmrKatch) : null,
      } : {}),
      bmi: parseFloat(bmi.toFixed(1)),
      bmiCategory,
      cuttingCalories,
      bulkingCalories,
      protein: proteinGrams,
      carbs: carbsGrams,
      fats: fatGrams,
      leanMassKg,
      fatMassKg,
    },
    formatted,
    summary,
    isValid: true,
    metadata: {
      chartsData: {
        "tdee-breakdown": tdeeBreakdownData,
        ...(showBmrComparison ? { "formula-comparison": formulaData } : {}),
        "calorie-goals": calorieGoalsData,
      },
    },
  };
}

export default tdeeCalculatorConfig;
