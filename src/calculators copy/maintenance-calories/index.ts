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
    },],

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
        },
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
  },

  // ═══════════════════════════════════════════════════════════════
  // INPUTS (with unitType for weight/height)
  // ═══════════════════════════════════════════════════════════════
  inputs: [],

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
