import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// BODY FAT CATEGORIES (ACE - American Council on Exercise)
// =============================================================================
const BODY_FAT_CATEGORIES = {
  male: [
    { name: "Essential Fat", min: 2, max: 5, color: "red", description: "Minimum for survival" },
    { name: "Athletes", min: 6, max: 13, color: "blue", description: "Competition-ready athletes" },
    { name: "Fitness", min: 14, max: 17, color: "green", description: "Fit and active" },
    { name: "Average", min: 18, max: 24, color: "yellow", description: "Typical healthy adult" },
    { name: "Obese", min: 25, max: 100, color: "red", description: "Health risk" },
  ],
  female: [
    { name: "Essential Fat", min: 10, max: 13, color: "red", description: "Minimum for survival" },
    { name: "Athletes", min: 14, max: 20, color: "blue", description: "Competition-ready athletes" },
    { name: "Fitness", min: 21, max: 24, color: "green", description: "Fit and active" },
    { name: "Average", min: 25, max: 31, color: "yellow", description: "Typical healthy adult" },
    { name: "Obese", min: 32, max: 100, color: "red", description: "Health risk" },
  ],
};

// =============================================================================
// CONFIG
// =============================================================================
export const bodyFatCalculatorConfig: CalculatorConfigV3 = {
  id: "body-fat-calculator",
  slug: "body-fat-calculator",
  name: "Body Fat Calculator",
  category: "health",
  icon: "📊",

  // ═══════════════════════════════════════════════════════════════════════════
  // SEO
  // ═══════════════════════════════════════════════════════════════════════════
  seo: {
    title: "Body Fat Calculator - Navy, BMI & Army Methods | Free Tool",
    description: "Calculate your body fat percentage using the U.S. Navy method, BMI estimation, or Army formula. Get accurate results with measurement guides, category charts, and health insights. Free online calculator.",
    shortDescription: "Calculate your body fat percentage using multiple methods",
    keywords: ["body fat calculator", "body fat percentage", "navy body fat", "body composition", "fat percentage calculator", "lean body mass", "body fat measurement"],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HERO
  // ═══════════════════════════════════════════════════════════════════════════
  hero: {
    badge: "Health",
    rating: { average: 4.9, count: 28500 },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UNIT SYSTEM
  // ═══════════════════════════════════════════════════════════════════════════
  unitSystem: {
    enabled: true,
    default: "imperial",
    options: [
      { value: "imperial", label: "Imperial (in, lbs)" },
      { value: "metric", label: "Metric (cm, kg)" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CALCULATION MODES
  // ═══════════════════════════════════════════════════════════════════════════
  calculationModes: {
    enabled: true,
    default: "navy",
    style: "buttons",
    modes: [
      { id: "navy", label: "Navy Method", icon: "⚓", description: "Most accurate - uses measurements" },
      { id: "bmi", label: "BMI Method", icon: "📏", description: "Quick estimate - height/weight only" },
      { id: "army", label: "Army Method", icon: "🎖️", description: "U.S. Army standard formula" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════════════════
  inputs: [
    {
      id: "gender",
      type: "radio",
      label: "Gender",
      required: true,
      defaultValue: "male",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
      width: "full",
    },
    {
      id: "age",
      type: "slider",
      label: "Age",
      required: true,
      defaultValue: 30,
      min: 18,
      max: 80,
      step: 1,
      suffix: "years",
      width: "full",
    },
    // Imperial Height
    {
      id: "heightFeet",
      type: "number",
      label: "Height (feet)",
      required: true,
      defaultValue: 5,
      min: 4,
      max: 7,
      suffix: "ft",
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
      suffix: "in",
      width: "half",
      showWhen: { field: "unitSystem", value: "imperial" },
    },
    // Metric Height
    {
      id: "heightCm",
      type: "number",
      label: "Height",
      required: true,
      defaultValue: 178,
      min: 120,
      max: 230,
      suffix: "cm",
      width: "full",
      showWhen: { field: "unitSystem", value: "metric" },
    },
    // Imperial Weight
    {
      id: "weightLbs",
      type: "slider",
      label: "Weight",
      required: true,
      defaultValue: 170,
      min: 80,
      max: 400,
      step: 1,
      suffix: "lbs",
      width: "full",
      showWhen: { field: "unitSystem", value: "imperial" },
    },
    // Metric Weight
    {
      id: "weightKg",
      type: "slider",
      label: "Weight",
      required: true,
      defaultValue: 77,
      min: 35,
      max: 180,
      step: 0.5,
      suffix: "kg",
      width: "full",
      showWhen: { field: "unitSystem", value: "metric" },
    },
    // Navy/Army Method - Neck (Imperial)
    {
      id: "neckIn",
      type: "number",
      label: "Neck Circumference",
      required: true,
      defaultValue: 15,
      min: 10,
      max: 25,
      step: 0.5,
      suffix: "in",
      helpText: "Measure below Adam's apple",
      width: "full",
      showWhen: { field: "unitSystem", value: "imperial" },
      modes: ["navy", "army"],
    },
    // Navy/Army Method - Neck (Metric)
    {
      id: "neckCm",
      type: "number",
      label: "Neck Circumference",
      required: true,
      defaultValue: 38,
      min: 25,
      max: 60,
      step: 0.5,
      suffix: "cm",
      helpText: "Measure below Adam's apple",
      width: "full",
      showWhen: { field: "unitSystem", value: "metric" },
      modes: ["navy", "army"],
    },
    // Navy/Army Method - Waist (Imperial)
    {
      id: "waistIn",
      type: "number",
      label: "Waist Circumference",
      required: true,
      defaultValue: 34,
      min: 20,
      max: 60,
      step: 0.5,
      suffix: "in",
      helpText: "Men: at navel | Women: narrowest point",
      width: "full",
      showWhen: { field: "unitSystem", value: "imperial" },
      modes: ["navy", "army"],
    },
    // Navy/Army Method - Waist (Metric)
    {
      id: "waistCm",
      type: "number",
      label: "Waist Circumference",
      required: true,
      defaultValue: 86,
      min: 50,
      max: 150,
      step: 0.5,
      suffix: "cm",
      helpText: "Men: at navel | Women: narrowest point",
      width: "full",
      showWhen: { field: "unitSystem", value: "metric" },
      modes: ["navy", "army"],
    },
    // Navy/Army Method - Hip (Imperial) - Women only
    {
      id: "hipIn",
      type: "number",
      label: "Hip Circumference",
      required: true,
      defaultValue: 38,
      min: 25,
      max: 65,
      step: 0.5,
      suffix: "in",
      helpText: "Widest part of buttocks (women only)",
      width: "full",
      showWhen: { field: "unitSystem", value: "imperial" },
      modes: ["navy", "army"],
    },
    // Navy/Army Method - Hip (Metric) - Women only
    {
      id: "hipCm",
      type: "number",
      label: "Hip Circumference",
      required: true,
      defaultValue: 97,
      min: 60,
      max: 160,
      step: 0.5,
      suffix: "cm",
      helpText: "Widest part of buttocks (women only)",
      width: "full",
      showWhen: { field: "unitSystem", value: "metric" },
      modes: ["navy", "army"],
    },
    // Goal body fat
    {
      id: "goalBodyFat",
      type: "slider",
      label: "Goal Body Fat %",
      required: false,
      defaultValue: 15,
      min: 5,
      max: 40,
      step: 1,
      suffix: "%",
      helpText: "Optional: Set a target to see weight change needed",
      width: "full",
    },
  ],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════════════════
  results: [
    { id: "bodyFat", type: "primary", label: "Body Fat", format: "number", decimals: 1, suffix: "%" },
    { id: "category", type: "badge", label: "Category", format: "text" },
    { id: "fatMass", type: "secondary", label: "Fat Mass", format: "text" },
    { id: "leanMass", type: "secondary", label: "Lean Body Mass", format: "text" },
    { id: "toGoal", type: "secondary", label: "To Reach Goal", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // VISUALIZATIONS
  // ═══════════════════════════════════════════════════════════════════════════
  visualizations: [
    {
      id: "bodyFatScale",
      type: "distribution-bars",
      title: "Body Fat Categories",
      icon: "📊",
      distributionBars: {
        dataKey: "categoryScale",
        labelField: "label",
        valueField: "value",
        maxValue: 40,
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // INFO CARDS
  // ═══════════════════════════════════════════════════════════════════════════
  infoCards: [
    {
      id: "categoryChart",
      title: "Body Fat Categories (ACE)",
      icon: "📋",
      type: "grid",
      columns: 2,
      items: [
        { label: "Essential Fat", value: "Men: 2-5% | Women: 10-13%", color: "red" },
        { label: "Athletes", value: "Men: 6-13% | Women: 14-20%", color: "blue" },
        { label: "Fitness", value: "Men: 14-17% | Women: 21-24%", color: "green" },
        { label: "Average", value: "Men: 18-24% | Women: 25-31%", color: "yellow" },
        { label: "Obese", value: "Men: 25%+ | Women: 32%+", color: "red" },
      ],
    },
    {
      id: "measurementTips",
      title: "How to Measure",
      icon: "📏",
      type: "list",
      items: [
        { label: "Neck", value: "Below Adam's apple, tape sloping down" },
        { label: "Waist (Men)", value: "At belly button level" },
        { label: "Waist (Women)", value: "At narrowest point" },
        { label: "Hips", value: "Widest part of buttocks (women only)" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCE DATA
  // ═══════════════════════════════════════════════════════════════════════════
  referenceData: [
    {
      id: "methodAccuracy",
      title: "Method Accuracy Comparison",
      icon: "🎯",
      columns: 3,
      items: [
        { label: "Navy Method", value: "±3-4%" },
        { label: "BMI Method", value: "±5-8%" },
        { label: "Army Method", value: "±3-4%" },
        { label: "Calipers", value: "±3%" },
        { label: "DEXA Scan", value: "±1-2%" },
        { label: "BIA Scales", value: "±5-8%" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  educationSections: [
    {
      id: "methods",
      type: "cards",
      title: "Calculation Methods",
      icon: "🔬",
      columns: 3,
      cards: [
        { title: "Navy Method", description: "Uses neck, waist, and hip (women) measurements. Developed by U.S. Navy, accurate to ±3-4%.", icon: "⚓" },
        { title: "BMI Method", description: "Estimates from height, weight, age, and gender. Quick but less accurate for muscular people.", icon: "📏" },
        { title: "Army Method", description: "Similar to Navy, used by U.S. Army for fitness standards. Good for tracking progress.", icon: "🎖️" },
      ],
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "The Navy method is most accurate for general population (±3-4% error)", type: "info" },
        { text: "BMI method may overestimate body fat for muscular individuals", type: "warning" },
        { text: "Women naturally carry more essential fat (10-13% vs 2-5% for men)", type: "info" },
        { text: "Measure at the same time of day for consistent tracking", type: "info" },
        { text: "Hydration levels can affect measurement accuracy", type: "warning" },
        { text: "Extremely low body fat (<6% men, <14% women) can harm health", type: "warning" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Navy Method Calculation",
      icon: "📊",
      description: "Example: 30-year-old male, 5'10\" (178 cm), Neck: 15\" (38 cm), Waist: 34\" (86 cm)",
      columns: 2,
      examples: [
        {
          title: "Step 1: Convert Measurements",
          steps: [
            "Height = 178 cm",
            "Waist - Neck = 86 - 38 = 48 cm",
            "Log10(48) = 1.681",
            "Log10(178) = 2.250",
          ],
          result: "Values ready for formula",
        },
        {
          title: "Step 2: Apply Navy Formula",
          steps: [
            "BF% = 495 / (1.0324 - 0.19077×log(W-N)",
            "       + 0.15456×log(H)) - 450",
            "BF% = 495 / (1.0324 - 0.320 + 0.348) - 450",
            "BF% = 495 / 1.060 - 450",
          ],
          result: "Body Fat ≈ 17.0%",
        },
      ],
    },
    {
      id: "whatIsBodyFat",
      type: "prose",
      title: "What is Body Fat Percentage?",
      content: "Body fat percentage is the proportion of your total body weight that consists of fat tissue. Unlike BMI, which only considers height and weight, body fat percentage distinguishes between fat mass and lean mass (muscle, bone, organs, water). This makes it a more accurate indicator of health and fitness. Your body fat includes essential fat (needed for normal physiological function) and storage fat (energy reserves in adipose tissue). Essential fat is about 2-5% for men and 10-13% for women.",
    },
    {
      id: "whyItMatters",
      type: "prose",
      title: "Why Body Fat Percentage Matters",
      content: "Research shows that body fat percentage predicts cardiometabolic risk more accurately than BMI alone. High body fat is associated with increased risk of heart disease, type 2 diabetes, high blood pressure, and certain cancers. However, too little body fat is also dangerous—dropping below essential levels can disrupt hormones, impair immune function, and harm bone density. The goal is to maintain body fat within a healthy range for your age, gender, and activity level.",
    },
    {
      id: "methodsExplained",
      type: "prose",
      title: "Understanding the Different Methods",
      content: "The U.S. Navy method uses circumference measurements (neck, waist, and hip for women) along with height. It's accurate to ±3-4% for most people and requires only a tape measure. The BMI method estimates body fat from your BMI, age, and gender—it's convenient but less accurate because BMI doesn't distinguish between muscle and fat. The Army method is similar to Navy but uses slightly different formulas. For the most accurate home measurement, the Navy method is recommended.",
    },
    {
      id: "improvingBodyComp",
      type: "prose",
      title: "How to Improve Body Composition",
      content: "To reduce body fat while maintaining muscle, focus on resistance training 2-4 times per week, adequate protein intake (0.7-1g per pound of body weight), a moderate calorie deficit (300-500 calories), and sufficient sleep (7-9 hours). Avoid crash diets that lead to muscle loss. For building muscle, prioritize progressive overload in your training, eat in a slight calorie surplus, and allow adequate recovery time between workouts.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // FAQs
  // ═══════════════════════════════════════════════════════════════════════════
  faqs: [
    { question: "What is a healthy body fat percentage?", answer: "For men, a healthy range is typically 10-24% depending on age and activity level. For women, it's 18-31%. Athletes and very fit individuals may be lower (6-17% for men, 14-24% for women), but dropping below essential fat levels (2-5% men, 10-13% women) is dangerous." },
    { question: "Which method is most accurate?", answer: "The Navy method is most accurate for home use, with an error margin of ±3-4%. For the most precise measurement, DEXA scans are the gold standard (±1-2% error) but require clinical equipment. Avoid relying solely on BIA scales, which can be off by 5-8%." },
    { question: "How do I measure my waist correctly?", answer: "For men, measure at belly button level. For women, measure at the narrowest point of your waist (usually just above the belly button). Stand relaxed, don't suck in your stomach, and keep the tape snug but not tight." },
    { question: "Why is BMI method less accurate?", answer: "The BMI method uses statistical averages and doesn't account for muscle mass. Athletes or muscular individuals may show artificially high body fat percentages because the formula assumes average body composition. It's best used as a quick estimate when you can't take measurements." },
    { question: "How often should I measure my body fat?", answer: "For tracking progress, measure every 2-4 weeks using the same method, same time of day, and same conditions. Weekly measurements can show normal fluctuations that aren't meaningful. Focus on long-term trends rather than daily or weekly changes." },
    { question: "Why do women have higher body fat percentages?", answer: "Women naturally carry more essential fat (10-13% vs 2-5% for men) due to reproductive physiology—fat is needed for estrogen production, fertility, and pregnancy support. This is why the healthy ranges differ between genders, and women shouldn't aim for male body fat levels." },
    { question: "Can I have a healthy BMI but unhealthy body fat?", answer: "Yes, this is sometimes called 'skinny fat' or metabolically obese normal weight. You can have a normal weight but high body fat percentage, especially around internal organs (visceral fat). This is why body fat percentage is often more meaningful than BMI alone." },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════════════════
  references: [
    { authors: "Hodgdon JA, Beckett MB", year: "1984", title: "Prediction of percent body fat for U.S. Navy men and women from body circumferences and height", source: "Naval Health Research Center, Report No. 84-29", url: "https://apps.dtic.mil/sti/citations/ADA143890" },
    { authors: "American Council on Exercise", year: "2024", title: "Body Fat Percentage Norms", source: "ACE Fitness", url: "https://www.acefitness.org" },
    { authors: "Gallagher D, et al.", year: "2000", title: "Healthy percentage body fat ranges: an approach for developing guidelines based on body mass index", source: "American Journal of Clinical Nutrition, 72(3):694-701" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SIDEBAR & FEATURES
  // ═══════════════════════════════════════════════════════════════════════════
  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: true,
    category: "health",
    cta: {
      title: "Check Your BMI",
      description: "Compare your body fat results with your BMI for a complete picture.",
      linkText: "Try BMI Calculator →",
      link: "/bmi-calculator",
    },
  },

  features: {
    autoCalculate: true,
    saveHistory: true,
    exportPDF: true,
    shareResults: true,
  },

  relatedCalculators: ["bmi-calculator", "calorie-calculator", "ideal-weight-calculator", "tdee-calculator"],

  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
    afterResults: true,
  },
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateBodyFat(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
  mode?: string;
}): CalculatorResults {
  const { values, unitSystem, mode = "navy" } = data;
  
  const gender = (values.gender as string) || "male";
  const age = (values.age as number) || 30;
  const goalBodyFat = values.goalBodyFat as number | undefined;

  // Get measurements in cm/kg
  let heightCm: number;
  let weightKg: number;
  let neckCm: number;
  let waistCm: number;
  let hipCm: number;

  if (unitSystem === "metric") {
    heightCm = (values.heightCm as number) || 178;
    weightKg = (values.weightKg as number) || 77;
    neckCm = (values.neckCm as number) || 38;
    waistCm = (values.waistCm as number) || 86;
    hipCm = (values.hipCm as number) || 97;
  } else {
    const feet = (values.heightFeet as number) || 5;
    const inches = (values.heightInches as number) || 10;
    heightCm = (feet * 12 + inches) * 2.54;
    weightKg = ((values.weightLbs as number) || 170) * 0.453592;
    neckCm = ((values.neckIn as number) || 15) * 2.54;
    waistCm = ((values.waistIn as number) || 34) * 2.54;
    hipCm = ((values.hipIn as number) || 38) * 2.54;
  }

  let bodyFat: number;

  // ═══════════════════════════════════════════════════════════════════════════
  // NAVY METHOD
  // ═══════════════════════════════════════════════════════════════════════════
  if (mode === "navy") {
    if (gender === "male") {
      // Male Navy Formula
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
    } else {
      // Female Navy Formula (includes hip)
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450;
    }
  }
  // ═══════════════════════════════════════════════════════════════════════════
  // BMI METHOD
  // ═══════════════════════════════════════════════════════════════════════════
  else if (mode === "bmi") {
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    
    if (gender === "male") {
      bodyFat = (1.20 * bmi) + (0.23 * age) - 16.2;
    } else {
      bodyFat = (1.20 * bmi) + (0.23 * age) - 5.4;
    }
  }
  // ═══════════════════════════════════════════════════════════════════════════
  // ARMY METHOD
  // ═══════════════════════════════════════════════════════════════════════════
  else {
    if (gender === "male") {
      bodyFat = 86.010 * Math.log10(waistCm - neckCm) - 70.041 * Math.log10(heightCm) + 36.76;
    } else {
      bodyFat = 163.205 * Math.log10(waistCm + hipCm - neckCm) - 97.684 * Math.log10(heightCm) - 78.387;
    }
  }

  // Clamp body fat to reasonable range
  bodyFat = Math.max(2, Math.min(60, bodyFat));

  // Get category
  const categories = BODY_FAT_CATEGORIES[gender as keyof typeof BODY_FAT_CATEGORIES];
  const category = categories.find(c => bodyFat >= c.min && bodyFat < c.max) || categories[categories.length - 1];

  // Calculate fat mass and lean mass
  const fatMass = weightKg * (bodyFat / 100);
  const leanMass = weightKg - fatMass;

  // Calculate weight to reach goal
  let toGoal = "";
  let weightChange = 0;
  if (goalBodyFat && goalBodyFat !== bodyFat) {
    // Weight at goal = Lean Mass / (1 - Goal BF%)
    const targetWeight = leanMass / (1 - goalBodyFat / 100);
    weightChange = targetWeight - weightKg;
    
    const changeKg = Math.abs(weightChange);
    const changeLbs = changeKg * 2.20462;
    
    if (unitSystem === "metric") {
      toGoal = weightChange < 0 
        ? `Lose ${changeKg.toFixed(1)} kg` 
        : `Gain ${changeKg.toFixed(1)} kg`;
    } else {
      toGoal = weightChange < 0 
        ? `Lose ${Math.round(changeLbs)} lbs` 
        : `Gain ${Math.round(changeLbs)} lbs`;
    }
  } else {
    toGoal = "Set a goal above";
  }

  // Format weights for display
  const weightUnit = unitSystem === "metric" ? "kg" : "lbs";
  const displayFatMass = unitSystem === "metric" ? fatMass : fatMass * 2.20462;
  const displayLeanMass = unitSystem === "metric" ? leanMass : leanMass * 2.20462;

  // Category scale for visualization
  const categoryScale = categories.map((cat, i) => ({
    id: cat.name.toLowerCase().replace(" ", "-"),
    label: cat.name,
    value: i === categories.findIndex(c => c.name === category.name) ? bodyFat : (cat.min + cat.max) / 2,
    displayValue: `${cat.min}-${cat.max === 100 ? "+" : cat.max}%`,
  }));
  
  // Add user's current position
  categoryScale.push({
    id: "yours",
    label: "Your Body Fat",
    value: Math.min(bodyFat, 40),
    displayValue: `${bodyFat.toFixed(1)}%`,
  });

  return {
    values: {
      bodyFat,
      fatMass,
      leanMass,
      category: category.name,
      weightChange,
    },
    formatted: {
      bodyFat: bodyFat.toFixed(1),
      category: category.name,
      fatMass: `${displayFatMass.toFixed(1)} ${weightUnit}`,
      leanMass: `${displayLeanMass.toFixed(1)} ${weightUnit}`,
      toGoal,
    },
    summary: `Your body fat is ${bodyFat.toFixed(1)}%, classified as "${category.name}". Lean mass: ${displayLeanMass.toFixed(1)} ${weightUnit}.`,
    isValid: true,
    metadata: {
      categoryScale,
      categoryColor: category.color,
      method: mode,
    },
  };
}

export default bodyFatCalculatorConfig;
