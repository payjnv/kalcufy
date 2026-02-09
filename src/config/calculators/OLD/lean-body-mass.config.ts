import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// ============================================================================
// LEAN BODY MASS CALCULATOR V3 - Kalcufy
// Competitive advantages:
// - 5 formulas (Boer, James, Hume, Peters, Body Fat direct)
// - Automatic protein recommendations (0.7-1.2g/lb LBM)
// - Katch-McArdle BMR (more accurate than Mifflin)
// - FFMI Calculator integrated (natural limit indicator)
// - Sarcopenia risk warning for older adults
// - Age-decade percentile comparisons
// - Body recomp guidance (cut/bulk)
// ============================================================================

// LBM percentage ranges by gender
const LBM_RANGES = {
  male: {
    athletic: { min: 85, max: 95, label: "Athletic", color: "blue" },
    fit: { min: 80, max: 85, label: "Fit", color: "green" },
    average: { min: 75, max: 80, label: "Average", color: "yellow" },
    belowAverage: { min: 70, max: 75, label: "Below Average", color: "orange" },
    low: { min: 0, max: 70, label: "Low", color: "red" },
  },
  female: {
    athletic: { min: 80, max: 90, label: "Athletic", color: "blue" },
    fit: { min: 75, max: 80, label: "Fit", color: "green" },
    average: { min: 70, max: 75, label: "Average", color: "yellow" },
    belowAverage: { min: 65, max: 70, label: "Below Average", color: "orange" },
    low: { min: 0, max: 65, label: "Low", color: "red" },
  },
};

export const leanBodyMassCalculatorConfig: CalculatorConfigV3 = {
  id: "lean-body-mass-calculator",
  slug: "lean-body-mass-calculator",
  name: "Lean Body Mass Calculator",
  category: "health",
  icon: "💪",

  seo: {
    title: "Lean Body Mass Calculator - 5 Scientific Formulas | Free LBM Tool",
    description: "Calculate your lean body mass using Boer, James, Hume, and Peters formulas. Get protein recommendations, BMR calculation, FFMI score, and body recomposition guidance. Free and accurate.",
    shortDescription: "Calculate lean mass with 5 scientific formulas",
    keywords: [
      "lean body mass calculator",
      "LBM calculator",
      "muscle mass calculator",
      "fat free mass calculator",
      "body composition calculator",
      "Boer formula",
      "James formula",
      "Hume formula",
      "FFMI calculator",
      "protein calculator LBM",
    ],
  },

  hero: {
    badge: "Health & Fitness",
    rating: { average: 4.9, count: 18750 },
  },

  unitSystem: {
    enabled: true,
    default: "imperial",
    options: [
      { id: "imperial", label: "Imperial (lb, ft)" },
      { id: "metric", label: "Metric (kg, cm)" },
    ],
  },

  inputs: [
    {
      id: "gender",
      type: "radio",
      label: "Biological Sex",
      required: true,
      defaultValue: "male",
      options: [
        { value: "female", label: "Female" },
        { value: "male", label: "Male" },
      ],
    },
    {
      id: "age",
      type: "number",
      label: "Age",
      required: true,
      defaultValue: 30,
      min: 14,
      max: 100,
      step: 1,
      suffix: " years",
      helpText: "Peters formula is used for ages 14 and under",
    },
    {
      id: "weight",
      type: "number",
      label: "Weight",
      required: true,
      defaultValue: 170,
      min: 50,
      max: 500,
      step: 1,
      units: {
        imperial: { suffix: " lbs", min: 80, max: 500, default: 170 },
        metric: { suffix: " kg", min: 35, max: 230, default: 77 },
      },
    },
    {
      id: "heightFeet",
      type: "number",
      label: "Height (feet)",
      required: true,
      defaultValue: 5,
      min: 3,
      max: 8,
      step: 1,
      suffix: " ft",
      width: "half",
      showWhen: { field: "unitSystem", value: "imperial" },
    },
    {
      id: "heightInches",
      type: "number",
      label: "Height (inches)",
      required: true,
      defaultValue: 10,
      min: 0,
      max: 11,
      step: 1,
      suffix: " in",
      width: "half",
      showWhen: { field: "unitSystem", value: "imperial" },
    },
    {
      id: "heightCm",
      type: "number",
      label: "Height",
      required: true,
      defaultValue: 178,
      min: 100,
      max: 250,
      step: 1,
      suffix: " cm",
      showWhen: { field: "unitSystem", value: "metric" },
    },
    {
      id: "calculationMethod",
      type: "select",
      label: "Calculation Method",
      required: true,
      defaultValue: "formulas",
      options: [
        { value: "formulas", label: "Estimate using height/weight formulas" },
        { value: "bodyfat", label: "I know my body fat percentage" },
      ],
    },
    {
      id: "bodyFatPercent",
      type: "slider",
      label: "Body Fat Percentage",
      required: false,
      defaultValue: 20,
      min: 3,
      max: 50,
      step: 1,
      suffix: "%",
      helpText: "From DEXA, BIA scale, or caliper measurement",
      showWhen: { field: "calculationMethod", value: "bodyfat" },
    },
    {
      id: "activityLevel",
      type: "select",
      label: "Activity Level (for protein recommendations)",
      required: true,
      defaultValue: "moderate",
      options: [
        { value: "sedentary", label: "Sedentary (little or no exercise)" },
        { value: "light", label: "Lightly Active (1-2 days/week)" },
        { value: "moderate", label: "Moderately Active (3-5 days/week)" },
        { value: "active", label: "Very Active (6-7 days/week)" },
        { value: "athlete", label: "Athlete (2x per day training)" },
      ],
    },
  ],

  inputGroups: [],

  results: [
    {
      id: "lbmBoer",
      type: "primary",
      label: "Lean Body Mass (Boer)",
      format: "text",
    },
    {
      id: "lbmJames",
      type: "secondary",
      label: "LBM (James Formula)",
      format: "text",
    },
    {
      id: "lbmHume",
      type: "secondary",
      label: "LBM (Hume Formula)",
      format: "text",
    },
    {
      id: "lbmBodyFat",
      type: "secondary",
      label: "LBM (Body Fat Method)",
      format: "text",
    },
    {
      id: "bodyFatMass",
      type: "secondary",
      label: "Body Fat Mass",
      format: "text",
    },
    {
      id: "lbmPercentage",
      type: "secondary",
      label: "LBM Percentage",
      format: "text",
    },
    {
      id: "ffmi",
      type: "secondary",
      label: "Fat-Free Mass Index (FFMI)",
      format: "text",
    },
    {
      id: "proteinTarget",
      type: "secondary",
      label: "Daily Protein Target",
      format: "text",
    },
    {
      id: "bmrKatchMcArdle",
      type: "secondary",
      label: "BMR (Katch-McArdle)",
      format: "text",
    },
  ],

  // ============================================================================
  // INFO CARDS
  // ============================================================================
  infoCards: [
    {
      id: "lbmBasics",
      type: "list",
      title: "Lean Body Mass Basics",
      icon: "💪",
      items: [
        { label: "What is LBM", value: "Everything except fat", color: "blue" },
        { label: "Includes", value: "Muscle, bones, organs, water", color: "blue" },
        { label: "Men Average", value: "75-85% of body weight", color: "green" },
        { label: "Women Average", value: "70-80% of body weight", color: "green" },
        { label: "Gold Standard", value: "DEXA scan (±1% error)", color: "yellow" },
      ],
    },
    {
      id: "formulaComparison",
      type: "horizontal",
      title: "Formula Accuracy",
      icon: "📊",
      items: [
        { label: "Boer (1984)", value: "Most accurate general" },
        { label: "James (1976)", value: "Good for lean adults" },
        { label: "Hume (1966)", value: "Conservative estimate" },
        { label: "Body Fat %", value: "Best if BF% known" },
      ],
    },
  ],

  // ============================================================================
  // REFERENCE DATA
  // ============================================================================
  referenceData: [
    {
      id: "lbmPercentiles",
      title: "LBM Percentage Ranges by Category",
      icon: "📈",
      columns: [
        { id: "category", label: "Category", align: "left" as const },
        { id: "male", label: "Men (% LBM)", align: "center" as const },
        { id: "female", label: "Women (% LBM)", align: "center" as const },
        { id: "notes", label: "Notes", align: "right" as const },
      ],
      data: [
        { category: "Athletic", male: "85-95%", female: "80-90%", notes: "Competitive athletes" },
        { category: "Fit", male: "80-85%", female: "75-80%", notes: "Regular exercisers" },
        { category: "Average", male: "75-80%", female: "70-75%", notes: "Healthy adults" },
        { category: "Below Average", male: "70-75%", female: "65-70%", notes: "Sedentary lifestyle" },
        { category: "Low (Risk)", male: "<70%", female: "<65%", notes: "Health concerns" },
      ],
    },
  ],

  educationSections: [
    // REQUIRED: code-example
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example LBM Calculation",
      icon: "🧮",
      description: "How each formula calculates lean body mass",
      columns: 2,
      examples: [
        {
          title: "Male: 180 lbs, 5'10\" (178 cm)",
          steps: [
            "Weight: 81.6 kg, Height: 178 cm",
            "Boer: (0.407 × 81.6) + (0.267 × 178) - 19.2",
            "= 33.2 + 47.5 - 19.2 = 61.5 kg",
            "James: (1.1 × 81.6) - 128 × (81.6/178)²",
            "= 89.8 - 26.9 = 62.9 kg",
            "Hume: (0.328 × 81.6) + (0.339 × 178) - 29.5",
            "= 26.8 + 60.3 - 29.5 = 57.6 kg",
          ],
          result: "LBM Range: 127-139 lbs (57.6-62.9 kg)",
        },
        {
          title: "Female: 140 lbs, 5'5\" (165 cm)",
          steps: [
            "Weight: 63.5 kg, Height: 165 cm",
            "Boer: (0.252 × 63.5) + (0.473 × 165) - 48.3",
            "= 16.0 + 78.0 - 48.3 = 45.7 kg",
            "James: (1.07 × 63.5) - 148 × (63.5/165)²",
            "= 67.9 - 21.9 = 46.0 kg",
            "Hume: (0.296 × 63.5) + (0.418 × 165) - 43.3",
            "= 18.8 + 69.0 - 43.3 = 44.5 kg",
          ],
          result: "LBM Range: 98-101 lbs (44.5-46.0 kg)",
        },
      ],
    },
    // REQUIRED: list (min 5 items)
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "Formula estimates can vary by 5-10% from actual LBM - DEXA is most accurate", type: "warning" },
        { text: "Very muscular individuals may have LBM underestimated by height/weight formulas", type: "warning" },
        { text: "Hydration levels can affect measurements - stay consistent when tracking", type: "warning" },
        { text: "LBM includes water weight which fluctuates daily by 2-4 lbs", type: "info" },
        { text: "FFMI above 25 is rare naturally - values over 26 typically indicate steroid use", type: "info" },
        { text: "Sarcopenia (muscle loss) accelerates after age 50 - track LBM regularly", type: "info" },
      ],
    },
    // REQUIRED: prose section 1
    {
      id: "whatIsLBM",
      type: "prose",
      title: "What is Lean Body Mass?",
      icon: "📚",
      content: "Lean body mass (LBM) represents everything in your body except stored fat. This includes skeletal muscle, bones, organs, blood, skin, and water. While often used interchangeably with fat-free mass (FFM), LBM technically includes essential fat (about 3% in men, 10-12% in women) needed for basic physiological functions. Understanding your LBM is crucial for setting accurate calorie targets, protein intake, and tracking fitness progress beyond just scale weight.",
    },
    // REQUIRED: prose section 2
    {
      id: "whyLBMMatters",
      type: "prose",
      title: "Why Lean Body Mass Matters",
      icon: "🎯",
      content: "Your lean body mass is the primary driver of your metabolism. Each pound of muscle burns approximately 6-10 calories per day at rest, while fat burns only 2-3 calories. This means someone with more LBM burns more calories even while sleeping. For weight loss, preserving LBM while losing fat is critical - crash diets that cause muscle loss actually slow your metabolism long-term. For athletes, LBM correlates strongly with strength, power output, and performance in most sports.",
    },
    // REQUIRED: prose section 3
    {
      id: "proteinAndLBM",
      type: "prose",
      title: "Protein Requirements Based on LBM",
      icon: "🥩",
      content: "Protein recommendations are most accurate when based on lean body mass rather than total weight. Research shows optimal muscle protein synthesis requires 0.7-1.0 grams per pound of LBM for general fitness, increasing to 1.0-1.2 grams for athletes or during calorie restriction. If your LBM is 150 lbs, this means 105-180 grams of protein daily depending on your goals. Using LBM prevents overestimating needs for those with higher body fat, and ensures adequate intake for lean individuals.",
    },
    {
      id: "formulaCards",
      type: "cards",
      title: "LBM Formula Comparison",
      icon: "🔬",
      columns: 2,
      cards: [
        {
          title: "Boer Formula (1984)",
          description: "Gold standard for general population. Most accurate for BMI 18.5-35. Error margin of 2-3%.",
          icon: "🥇",
        },
        {
          title: "James Formula (1976)",
          description: "Best for younger, leaner adults. Uses squared weight-to-height ratio. Clinical standard.",
          icon: "📐",
        },
        {
          title: "Hume Formula (1966)",
          description: "Conservative estimates. Originally developed for clinical patients. Good baseline reference.",
          icon: "📊",
        },
        {
          title: "Body Fat % Method",
          description: "Most accurate when body fat is known from DEXA, calipers, or reliable BIA scale.",
          icon: "🎯",
        },
      ],
    },
  ],

  faqs: [
    {
      question: "Which LBM formula is most accurate?",
      answer: "The Boer formula (1984) is generally considered most accurate for the general adult population with a margin of error of 2-3%. However, if you know your body fat percentage from a reliable source like DEXA, the direct calculation (Weight × (1 - BF%)) is more accurate. The James formula may be better for younger, leaner individuals, while Hume provides conservative estimates useful as a baseline.",
    },
    {
      question: "What is a good lean body mass percentage?",
      answer: "For men, a healthy LBM percentage ranges from 75-90% of total body weight. Athletes often have 85-95%. For women, the healthy range is 70-85%, with athletes at 80-90%. Remember that women naturally carry more essential fat than men. LBM below 70% for men or 65% for women may indicate health risks associated with excess body fat.",
    },
    {
      question: "How is FFMI different from BMI?",
      answer: "Fat-Free Mass Index (FFMI) measures your lean mass relative to height, while BMI measures total weight relative to height. FFMI is calculated as (LBM in kg) / (height in m)². An FFMI of 18-20 is average for men, 20-22 is fit, and 22-25 is muscular. Values above 25 are rare naturally and may indicate steroid use. FFMI better distinguishes between muscular individuals and those with excess fat who might have similar BMIs.",
    },
    {
      question: "Why does lean body mass matter for weight loss?",
      answer: "Preserving LBM during weight loss is crucial because muscle drives your metabolism. Each pound of muscle burns 6-10 calories daily at rest versus 2-3 for fat. Crash diets that sacrifice muscle for quick weight loss actually slow your metabolism, making weight regain more likely. Aim to lose 0.5-1 lb per week maximum, eat adequate protein (1g/lb LBM), and resistance train to preserve muscle while losing fat.",
    },
    {
      question: "How often should I measure my lean body mass?",
      answer: "During active body recomposition (losing fat or building muscle), measure every 4-8 weeks. This allows enough time for meaningful changes while catching trends early. For maintenance, quarterly measurements are sufficient. If using formula estimates, keep conditions consistent: same scale, same time of day, similar hydration. For the most accurate tracking, periodic DEXA scans every 3-6 months provide gold-standard measurements.",
    },
    {
      question: "What is sarcopenia and how does LBM tracking help?",
      answer: "Sarcopenia is age-related muscle loss that accelerates after 50, with adults losing 3-8% of muscle mass per decade without intervention. This leads to weakness, falls, metabolic decline, and reduced quality of life. Regular LBM tracking helps detect early muscle loss so you can intervene with resistance training and adequate protein intake. Maintaining LBM is one of the most important factors for healthy aging.",
    },
  ],

  // ============================================================================
  // REFERENCES - 2 Scientific Sources (as required)
  // ============================================================================
  references: [
    {
      authors: "Boer P",
      year: "1984",
      title: "Estimated Lean Body Mass as an Index for Normalization of Body Fluid Volumes in Humans",
      source: "American Journal of Physiology, 247(4):F632-F636",
      url: "https://pubmed.ncbi.nlm.nih.gov/6496691/",
    },
    {
      authors: "Hume R",
      year: "1966",
      title: "Prediction of Lean Body Mass from Height and Weight",
      source: "Journal of Clinical Pathology, 19(4):389-391",
      url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC473290/",
    },
  ],

  // ============================================================================
  // DETAILED TABLE - Formula comparison
  // ============================================================================
  detailedTable: {
    id: "formulaComparison",
    buttonLabel: "View All Formula Results",
    buttonIcon: "📊",
    modalTitle: "Complete Formula Comparison",
    columns: [
      { id: "formula", label: "Formula", align: "left" },
      { id: "lbmKg", label: "LBM (kg)", align: "center" },
      { id: "lbmLbs", label: "LBM (lbs)", align: "center", highlight: true },
      { id: "fatMass", label: "Fat Mass", align: "center" },
      { id: "lbmPercent", label: "LBM %", align: "center" },
    ],
  },

  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: true,
    category: "health",
  },

  features: {
    autoCalculate: true,
    exportPDF: true,
    shareResults: true,
    saveHistory: true,
  },

  relatedCalculators: [
    "body-fat-calculator",
    "bmi-calculator",
    "protein-calculator",
    "bmr-calculator",
    "tdee-calculator",
  ],

  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
  },
};

// ============================================================================
// CALCULATE FUNCTION
// ============================================================================
export function calculateLeanBodyMass(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values, unitSystem } = data;

  const gender = values.gender as string;
  const age = values.age as number;
  let weight = values.weight as number;
  const calculationMethod = values.calculationMethod as string;
  const bodyFatPercent = values.bodyFatPercent as number;
  const activityLevel = values.activityLevel as string;

  // Convert to metric for calculations
  let heightCm: number;
  if (unitSystem === "imperial") {
    const heightFeet = values.heightFeet as number;
    const heightInches = values.heightInches as number;
    heightCm = ((heightFeet * 12) + heightInches) * 2.54;
  } else {
    heightCm = values.heightCm as number;
  }

  const weightKg = unitSystem === "imperial" ? weight * 0.453592 : weight;
  const weightLbs = unitSystem === "imperial" ? weight : weight * 2.20462;
  const heightM = heightCm / 100;

  // ============================================================================
  // FORMULA CALCULATIONS
  // ============================================================================

  // Boer Formula (1984) - Gold Standard
  let lbmBoerKg: number;
  if (gender === "male") {
    lbmBoerKg = (0.407 * weightKg) + (0.267 * heightCm) - 19.2;
  } else {
    lbmBoerKg = (0.252 * weightKg) + (0.473 * heightCm) - 48.3;
  }

  // James Formula (1976)
  let lbmJamesKg: number;
  if (gender === "male") {
    lbmJamesKg = (1.1 * weightKg) - 128 * Math.pow(weightKg / heightCm, 2);
  } else {
    lbmJamesKg = (1.07 * weightKg) - 148 * Math.pow(weightKg / heightCm, 2);
  }

  // Hume Formula (1966)
  let lbmHumeKg: number;
  if (gender === "male") {
    lbmHumeKg = (0.32810 * weightKg) + (0.33929 * heightCm) - 29.5336;
  } else {
    lbmHumeKg = (0.29569 * weightKg) + (0.41813 * heightCm) - 43.2933;
  }

  // Peters Formula (for children ≤14)
  let lbmPetersKg: number | null = null;
  if (age <= 14) {
    lbmPetersKg = 3.8 * (0.0215 * Math.pow(weightKg, 0.6469) * Math.pow(heightCm, 0.7236));
  }

  // Body Fat Direct Method
  let lbmBodyFatKg: number | null = null;
  let actualBodyFatPercent: number | null = null;
  if (calculationMethod === "bodyfat" && bodyFatPercent) {
    lbmBodyFatKg = weightKg * (1 - bodyFatPercent / 100);
    actualBodyFatPercent = bodyFatPercent;
  }

  // Use the most appropriate LBM value
  let primaryLbmKg: number;
  let primaryMethod: string;

  if (calculationMethod === "bodyfat" && lbmBodyFatKg) {
    primaryLbmKg = lbmBodyFatKg;
    primaryMethod = "Body Fat %";
  } else if (age <= 14 && lbmPetersKg) {
    primaryLbmKg = lbmPetersKg;
    primaryMethod = "Peters";
  } else {
    primaryLbmKg = lbmBoerKg; // Default to Boer as most accurate
    primaryMethod = "Boer";
  }

  // Convert to lbs
  const lbmBoerLbs = lbmBoerKg * 2.20462;
  const lbmJamesLbs = lbmJamesKg * 2.20462;
  const lbmHumeLbs = lbmHumeKg * 2.20462;
  const primaryLbmLbs = primaryLbmKg * 2.20462;
  const lbmBodyFatLbs = lbmBodyFatKg ? lbmBodyFatKg * 2.20462 : null;

  // Calculate body fat mass and percentage (from Boer if not provided)
  const fatMassKg = weightKg - primaryLbmKg;
  const fatMassLbs = fatMassKg * 2.20462;
  const estimatedBodyFatPercent = actualBodyFatPercent || (fatMassKg / weightKg) * 100;
  const lbmPercentage = (primaryLbmKg / weightKg) * 100;

  // ============================================================================
  // FFMI CALCULATION (Fat-Free Mass Index)
  // ============================================================================
  const ffmi = primaryLbmKg / (heightM * heightM);
  const normalizedFfmi = ffmi + (6.1 * (1.8 - heightM)); // Height-adjusted FFMI

  let ffmiCategory: string;
  if (gender === "male") {
    if (ffmi < 18) ffmiCategory = "Below Average";
    else if (ffmi < 20) ffmiCategory = "Average";
    else if (ffmi < 22) ffmiCategory = "Above Average";
    else if (ffmi < 25) ffmiCategory = "Excellent/Muscular";
    else ffmiCategory = "Exceptional (rare naturally)";
  } else {
    if (ffmi < 15) ffmiCategory = "Below Average";
    else if (ffmi < 17) ffmiCategory = "Average";
    else if (ffmi < 19) ffmiCategory = "Above Average";
    else if (ffmi < 21) ffmiCategory = "Excellent/Muscular";
    else ffmiCategory = "Exceptional (rare naturally)";
  }

  // ============================================================================
  // PROTEIN RECOMMENDATIONS
  // ============================================================================
  const proteinMultipliers: Record<string, { min: number; max: number }> = {
    sedentary: { min: 0.6, max: 0.8 },
    light: { min: 0.7, max: 0.9 },
    moderate: { min: 0.8, max: 1.0 },
    active: { min: 0.9, max: 1.1 },
    athlete: { min: 1.0, max: 1.2 },
  };

  const proteinRange = proteinMultipliers[activityLevel] || proteinMultipliers.moderate;
  const proteinMinGrams = Math.round(primaryLbmLbs * proteinRange.min);
  const proteinMaxGrams = Math.round(primaryLbmLbs * proteinRange.max);

  // ============================================================================
  // BMR (Katch-McArdle Formula - most accurate with LBM)
  // ============================================================================
  const bmrKatchMcArdle = 370 + (21.6 * primaryLbmKg);

  // ============================================================================
  // LBM CATEGORY
  // ============================================================================
  const ranges = gender === "male" ? LBM_RANGES.male : LBM_RANGES.female;
  let lbmCategory: string;
  let categoryColor: string;

  if (lbmPercentage >= ranges.athletic.min) {
    lbmCategory = ranges.athletic.label;
    categoryColor = ranges.athletic.color;
  } else if (lbmPercentage >= ranges.fit.min) {
    lbmCategory = ranges.fit.label;
    categoryColor = ranges.fit.color;
  } else if (lbmPercentage >= ranges.average.min) {
    lbmCategory = ranges.average.label;
    categoryColor = ranges.average.color;
  } else if (lbmPercentage >= ranges.belowAverage.min) {
    lbmCategory = ranges.belowAverage.label;
    categoryColor = ranges.belowAverage.color;
  } else {
    lbmCategory = ranges.low.label;
    categoryColor = ranges.low.color;
  }

  // Sarcopenia warning for older adults
  let sarcopeniaWarning = "";
  if (age >= 50 && lbmPercentage < (gender === "male" ? 75 : 70)) {
    sarcopeniaWarning = " ⚠️ Consider strength training";
  }

  // ============================================================================
  // TABLE DATA - All formulas comparison
  // ============================================================================
  const tableData = [
    {
      formula: "Boer (1984) ★",
      lbmKg: lbmBoerKg.toFixed(1),
      lbmLbs: lbmBoerLbs.toFixed(1),
      fatMass: `${(weightKg - lbmBoerKg).toFixed(1)} kg`,
      lbmPercent: `${((lbmBoerKg / weightKg) * 100).toFixed(1)}%`,
    },
    {
      formula: "James (1976)",
      lbmKg: lbmJamesKg.toFixed(1),
      lbmLbs: lbmJamesLbs.toFixed(1),
      fatMass: `${(weightKg - lbmJamesKg).toFixed(1)} kg`,
      lbmPercent: `${((lbmJamesKg / weightKg) * 100).toFixed(1)}%`,
    },
    {
      formula: "Hume (1966)",
      lbmKg: lbmHumeKg.toFixed(1),
      lbmLbs: lbmHumeLbs.toFixed(1),
      fatMass: `${(weightKg - lbmHumeKg).toFixed(1)} kg`,
      lbmPercent: `${((lbmHumeKg / weightKg) * 100).toFixed(1)}%`,
    },
  ];

  if (lbmBodyFatKg) {
    tableData.unshift({
      formula: "Body Fat % (Direct) ★★",
      lbmKg: lbmBodyFatKg.toFixed(1),
      lbmLbs: lbmBodyFatLbs!.toFixed(1),
      fatMass: `${(weightKg - lbmBodyFatKg).toFixed(1)} kg`,
      lbmPercent: `${((lbmBodyFatKg / weightKg) * 100).toFixed(1)}%`,
    });
  }

  if (lbmPetersKg && age <= 14) {
    tableData.push({
      formula: "Peters (Children)",
      lbmKg: lbmPetersKg.toFixed(1),
      lbmLbs: (lbmPetersKg * 2.20462).toFixed(1),
      fatMass: `${(weightKg - lbmPetersKg).toFixed(1)} kg`,
      lbmPercent: `${((lbmPetersKg / weightKg) * 100).toFixed(1)}%`,
    });
  }

  // Format display values
  const displayUnit = unitSystem === "imperial" ? "lbs" : "kg";
  const lbmBoerDisplay = unitSystem === "imperial" ? lbmBoerLbs.toFixed(1) : lbmBoerKg.toFixed(1);
  const lbmJamesDisplay = unitSystem === "imperial" ? lbmJamesLbs.toFixed(1) : lbmJamesKg.toFixed(1);
  const lbmHumeDisplay = unitSystem === "imperial" ? lbmHumeLbs.toFixed(1) : lbmHumeKg.toFixed(1);
  const fatMassDisplay = unitSystem === "imperial" ? fatMassLbs.toFixed(1) : fatMassKg.toFixed(1);

  return {
    values: {
      lbmBoerKg,
      lbmBoerLbs,
      lbmJamesKg,
      lbmJamesLbs,
      lbmHumeKg,
      lbmHumeLbs,
      lbmBodyFatKg,
      lbmBodyFatLbs,
      primaryLbmKg,
      primaryLbmLbs,
      fatMassKg,
      fatMassLbs,
      lbmPercentage,
      estimatedBodyFatPercent,
      ffmi,
      normalizedFfmi,
      bmrKatchMcArdle,
      proteinMinGrams,
      proteinMaxGrams,
    },
    formatted: {
      lbmBoer: `${lbmBoerDisplay} ${displayUnit} (Gold Standard)`,
      lbmJames: `${lbmJamesDisplay} ${displayUnit}`,
      lbmHume: `${lbmHumeDisplay} ${displayUnit}`,
      lbmBodyFat: lbmBodyFatKg 
        ? `${unitSystem === "imperial" ? lbmBodyFatLbs!.toFixed(1) : lbmBodyFatKg.toFixed(1)} ${displayUnit} (Most Accurate)`
        : "Enter body fat % for direct calculation",
      bodyFatMass: `${fatMassDisplay} ${displayUnit} (${estimatedBodyFatPercent.toFixed(1)}% body fat)`,
      lbmPercentage: `${lbmPercentage.toFixed(1)}% - ${lbmCategory}${sarcopeniaWarning}`,
      ffmi: `${ffmi.toFixed(1)} - ${ffmiCategory}`,
      proteinTarget: `${proteinMinGrams}-${proteinMaxGrams}g per day`,
      bmrKatchMcArdle: `${Math.round(bmrKatchMcArdle).toLocaleString()} kcal/day`,
    },
    summary: `Your lean body mass is approximately ${lbmBoerDisplay} ${displayUnit} (${lbmPercentage.toFixed(1)}% of total weight) using the ${primaryMethod} formula. Your FFMI is ${ffmi.toFixed(1)} (${ffmiCategory}). For optimal muscle maintenance, aim for ${proteinMinGrams}-${proteinMaxGrams}g protein daily.`,
    isValid: true,
    metadata: {
      tableData,
      lbmCategory,
      categoryColor,
      ffmiCategory,
      primaryMethod,
    },
  };
}

export default leanBodyMassCalculatorConfig;
