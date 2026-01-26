import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// BMI CATEGORIES
// =============================================================================
const BMI_CATEGORIES = [
  { min: 0, max: 16, label: "Severe Thinness", color: "red" },
  { min: 16, max: 17, label: "Moderate Thinness", color: "orange" },
  { min: 17, max: 18.5, label: "Mild Thinness", color: "yellow" },
  { min: 18.5, max: 25, label: "Normal", color: "green" },
  { min: 25, max: 30, label: "Overweight", color: "yellow" },
  { min: 30, max: 35, label: "Obese Class I", color: "orange" },
  { min: 35, max: 40, label: "Obese Class II", color: "red" },
  { min: 40, max: 100, label: "Obese Class III", color: "red" },
];

// =============================================================================
// CONFIG
// =============================================================================
export const bmiCalculatorConfig: CalculatorConfigV3 = {
  id: "bmi-calculator",
  slug: "bmi-calculator",
  name: "BMI Calculator",
  category: "health",
  icon: "⚖️",

  // ═══════════════════════════════════════════════════════════════════════════
  // SEO
  // ═══════════════════════════════════════════════════════════════════════════
  seo: {
    title: "BMI Calculator - Free Body Mass Index Calculator",
    description: "Calculate your Body Mass Index (BMI) instantly with our free calculator. Supports both metric and imperial units. Learn what your BMI means and get healthy weight recommendations.",
    shortDescription: "Calculate your BMI and find your healthy weight range",
    keywords: ["bmi calculator", "body mass index", "healthy weight", "bmi chart", "weight calculator", "obesity calculator", "ideal weight", "bmi formula"],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HERO
  // ═══════════════════════════════════════════════════════════════════════════
  hero: {
    badge: "Health",
    rating: { average: 4.9, count: 45200 },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UNIT SYSTEM
  // ═══════════════════════════════════════════════════════════════════════════
  unitSystem: {
    enabled: true,
    default: "imperial",
    options: [
      { value: "imperial", label: "Imperial (lb, ft/in)" },
      { value: "metric", label: "Metric (kg, cm)" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════════════════
  inputs: [
    {
      id: "age",
      type: "number",
      label: "Age",
      required: true,
      defaultValue: 30,
      min: 2,
      max: 120,
      step: 1,
      suffix: "years",
      width: "half",
      helpText: "BMI interpretation varies by age for children",
    },
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
      width: "half",
    },
    // Imperial inputs
    {
      id: "heightFeet",
      type: "number",
      label: "Height (feet)",
      required: true,
      defaultValue: 5,
      min: 1,
      max: 8,
      step: 1,
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
      step: 1,
      suffix: "in",
      width: "half",
      showWhen: { field: "unitSystem", value: "imperial" },
    },
    {
      id: "weightLbs",
      type: "number",
      label: "Weight",
      required: true,
      defaultValue: 160,
      min: 50,
      max: 700,
      step: 1,
      suffix: "lbs",
      width: "full",
      showWhen: { field: "unitSystem", value: "imperial" },
    },
    // Metric inputs
    {
      id: "heightCm",
      type: "number",
      label: "Height",
      required: true,
      defaultValue: 175,
      min: 50,
      max: 250,
      step: 1,
      suffix: "cm",
      width: "full",
      showWhen: { field: "unitSystem", value: "metric" },
    },
    {
      id: "weightKg",
      type: "number",
      label: "Weight",
      required: true,
      defaultValue: 70,
      min: 20,
      max: 300,
      step: 0.1,
      suffix: "kg",
      width: "full",
      showWhen: { field: "unitSystem", value: "metric" },
    },
  ],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════════════════
  results: [
    {
      id: "bmi",
      type: "primary",
      label: "Your BMI",
      format: "number",
      decimals: 1,
    },
    {
      id: "category",
      type: "badge",
      label: "Category",
      format: "text",
    },
    {
      id: "healthyWeightRange",
      type: "secondary",
      label: "Healthy Weight Range",
      format: "text",
    },
    {
      id: "weightToHealthy",
      type: "secondary",
      label: "Distance to Healthy",
      format: "text",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // VISUALIZATIONS
  // ═══════════════════════════════════════════════════════════════════════════
  visualizations: [
    {
      id: "bmiRange",
      type: "distribution-bars",
      title: "BMI Scale",
      icon: "📊",
      distributionBars: {
        dataKey: "bmiScale",
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
      id: "bmiCategories",
      title: "BMI Categories",
      icon: "📋",
      type: "list",
      items: [
        { label: "Underweight", value: "< 18.5", color: "yellow" },
        { label: "Normal weight", value: "18.5 - 24.9", color: "green" },
        { label: "Overweight", value: "25 - 29.9", color: "yellow" },
        { label: "Obese Class I", value: "30 - 34.9", color: "orange" },
        { label: "Obese Class II", value: "35 - 39.9", color: "red" },
        { label: "Obese Class III", value: "≥ 40", color: "red" },
      ],
    },
    {
      id: "healthTips",
      title: "Health Tips",
      icon: "💡",
      type: "horizontal",
      items: [
        { label: "BMI is a screening tool, not a diagnostic" },
        { label: "Athletes may have high BMI due to muscle" },
        { label: "Waist circumference is also important" },
        { label: "Consult a doctor for health assessments" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCE DATA
  // ═══════════════════════════════════════════════════════════════════════════
  referenceData: [
    {
      id: "healthyWeightByHeight",
      title: "Healthy Weight by Height",
      icon: "📏",
      columns: 3,
      items: [
        { label: "5'0\" (152 cm)", value: "97-127 lbs" },
        { label: "5'4\" (163 cm)", value: "110-144 lbs" },
        { label: "5'8\" (173 cm)", value: "125-163 lbs" },
        { label: "6'0\" (183 cm)", value: "140-183 lbs" },
        { label: "6'4\" (193 cm)", value: "156-204 lbs" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  educationSections: [
    {
      id: "aboutBMI",
      type: "cards",
      title: "Understanding BMI",
      icon: "📊",
      columns: 2,
      cards: [
        {
          title: "What BMI Measures",
          description: "BMI is a simple calculation using height and weight to estimate body fat and health risk categories.",
          icon: "⚖️",
        },
        {
          title: "BMI Limitations",
          description: "BMI doesn't distinguish between muscle and fat. Athletes or muscular people may have misleading results.",
          icon: "⚠️",
        },
      ],
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "BMI is a screening tool, not a diagnostic measure of health", type: "warning" },
        { text: "Athletes and muscular individuals may have elevated BMI despite low body fat", type: "info" },
        { text: "BMI does not account for age, gender, or ethnicity differences", type: "info" },
        { text: "Waist circumference and body fat percentage provide additional health insights", type: "info" },
        { text: "Children and teens should use age-specific BMI percentiles", type: "warning" },
        { text: "Always consult a healthcare provider for comprehensive health assessment", type: "warning" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "BMI Formula & Example",
      icon: "🧮",
      description: "How to calculate BMI manually",
      columns: 2,
      examples: [
        {
          title: "Metric Formula",
          steps: [
            "BMI = weight (kg) ÷ height² (m²)",
            "Example: 70 kg, 1.75 m tall",
            "BMI = 70 ÷ (1.75 × 1.75)",
            "BMI = 70 ÷ 3.0625",
          ],
          result: "BMI = 22.9 (Normal)",
        },
        {
          title: "Imperial Formula",
          steps: [
            "BMI = (weight (lbs) × 703) ÷ height² (in²)",
            "Example: 160 lbs, 5'10\" (70 in)",
            "BMI = (160 × 703) ÷ (70 × 70)",
            "BMI = 112,480 ÷ 4,900",
          ],
          result: "BMI = 23.0 (Normal)",
        },
      ],
    },
    {
      id: "whatIsBMI",
      type: "prose",
      title: "What is BMI?",
      content: "Body Mass Index (BMI) is a numerical value calculated from your weight and height. Developed by Belgian mathematician Adolphe Quetelet in the 1830s, it provides a simple way to categorize individuals as underweight, normal weight, overweight, or obese. While not a direct measure of body fat, BMI correlates with more accurate measures and is widely used as a quick screening tool for potential health issues.",
    },
    {
      id: "bmiHealth",
      type: "prose",
      title: "BMI and Health Risks",
      content: "Research shows that both very low and very high BMI values are associated with increased health risks. A BMI under 18.5 may indicate malnutrition or other health issues, while a BMI over 25 is associated with increased risk of heart disease, type 2 diabetes, high blood pressure, and certain cancers. However, BMI is just one factor - lifestyle, diet, physical activity, and genetics all play important roles in overall health.",
    },
    {
      id: "beyondBMI",
      type: "prose",
      title: "Beyond BMI: Other Health Metrics",
      content: "While BMI is useful, it has limitations. Consider complementing it with waist circumference (men >40\", women >35\" indicates higher risk), waist-to-hip ratio, body fat percentage measurements, and blood pressure/cholesterol levels. These provide a more complete picture of metabolic health than BMI alone.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // FAQs
  // ═══════════════════════════════════════════════════════════════════════════
  faqs: [
    {
      question: "What is a healthy BMI?",
      answer: "A healthy BMI is generally considered to be between 18.5 and 24.9. This range is associated with the lowest health risks for most adults. However, optimal BMI can vary based on age, ethnicity, and individual factors.",
    },
    {
      question: "Is BMI accurate for athletes?",
      answer: "BMI may not be accurate for athletes or highly muscular individuals. Since muscle is denser than fat, athletic people may have a high BMI despite having low body fat. In these cases, body fat percentage or other measurements are more reliable.",
    },
    {
      question: "Does BMI apply to children?",
      answer: "Children and teens use BMI-for-age percentiles rather than standard adult categories. A child's BMI is compared to others of the same age and sex because body composition varies as children grow.",
    },
    {
      question: "Can I have a normal BMI but still be unhealthy?",
      answer: "Yes, this is sometimes called 'skinny fat' or metabolically obese normal weight (MONW). You can have normal weight but high body fat percentage, especially around the organs. Regular exercise and a balanced diet are important regardless of BMI.",
    },
    {
      question: "How often should I check my BMI?",
      answer: "For most adults, checking BMI a few times per year is sufficient. More frequent monitoring may be helpful if you're actively trying to lose or gain weight. Focus on long-term trends rather than daily fluctuations.",
    },
    {
      question: "What's the difference between BMI and body fat percentage?",
      answer: "BMI is calculated from height and weight only, while body fat percentage directly measures the proportion of your body that is fat tissue. Body fat percentage is more accurate but requires special equipment like calipers, bioelectrical impedance scales, or DEXA scans.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════════════════
  references: [
    {
      authors: "World Health Organization",
      year: "2024",
      title: "Body mass index - BMI",
      source: "WHO Regional Office for Europe",
      url: "https://www.who.int/europe/news-room/fact-sheets/item/body-mass-index---bmi",
    },
    {
      authors: "Centers for Disease Control and Prevention",
      year: "2024",
      title: "About Adult BMI",
      source: "CDC Healthy Weight",
      url: "https://www.cdc.gov/healthyweight/assessing/bmi/adult_bmi/",
    },
    {
      authors: "National Institutes of Health",
      year: "2023",
      title: "Calculate Your Body Mass Index",
      source: "NHLBI",
      url: "https://www.nhlbi.nih.gov/health/educational/lose_wt/BMI/bmicalc.htm",
    },
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
      title: "Calorie Calculator",
      description: "Find out how many calories you need daily",
      linkText: "Calculate Calories →",
      link: "/calorie-calculator",
    },
  },

  features: {
    autoCalculate: true,
    saveHistory: true,
    exportPDF: true,
    shareResults: true,
  },

  relatedCalculators: ["calorie-calculator", "ideal-weight-calculator", "body-fat-calculator"],

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
export function calculateBMI(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
  mode?: string;
}): CalculatorResults {
  const { values, unitSystem } = data;

  let heightM: number;
  let weightKg: number;

  if (unitSystem === "metric") {
    heightM = ((values.heightCm as number) || 175) / 100;
    weightKg = (values.weightKg as number) || 70;
  } else {
    const feet = (values.heightFeet as number) || 5;
    const inches = (values.heightInches as number) || 10;
    const totalInches = feet * 12 + inches;
    heightM = totalInches * 0.0254;
    weightKg = ((values.weightLbs as number) || 160) * 0.453592;
  }

  // Calculate BMI
  const bmi = weightKg / (heightM * heightM);

  // Get category
  const category = BMI_CATEGORIES.find(c => bmi >= c.min && bmi < c.max) || BMI_CATEGORIES[BMI_CATEGORIES.length - 1];

  // Calculate healthy weight range
  const healthyBmiMin = 18.5;
  const healthyBmiMax = 24.9;
  const healthyWeightMinKg = healthyBmiMin * heightM * heightM;
  const healthyWeightMaxKg = healthyBmiMax * heightM * heightM;

  let healthyWeightRange: string;
  let weightToHealthy: string;

  if (unitSystem === "metric") {
    healthyWeightRange = `${healthyWeightMinKg.toFixed(1)} - ${healthyWeightMaxKg.toFixed(1)} kg`;
    if (bmi < healthyBmiMin) {
      const toGain = healthyWeightMinKg - weightKg;
      weightToHealthy = `Gain ${toGain.toFixed(1)} kg to reach healthy range`;
    } else if (bmi > healthyBmiMax) {
      const toLose = weightKg - healthyWeightMaxKg;
      weightToHealthy = `Lose ${toLose.toFixed(1)} kg to reach healthy range`;
    } else {
      weightToHealthy = "You're in the healthy range! 🎉";
    }
  } else {
    const healthyWeightMinLbs = healthyWeightMinKg / 0.453592;
    const healthyWeightMaxLbs = healthyWeightMaxKg / 0.453592;
    healthyWeightRange = `${Math.round(healthyWeightMinLbs)} - ${Math.round(healthyWeightMaxLbs)} lbs`;
    const weightLbs = (values.weightLbs as number) || 160;
    if (bmi < healthyBmiMin) {
      const toGain = healthyWeightMinLbs - weightLbs;
      weightToHealthy = `Gain ${Math.round(toGain)} lbs to reach healthy range`;
    } else if (bmi > healthyBmiMax) {
      const toLose = weightLbs - healthyWeightMaxLbs;
      weightToHealthy = `Lose ${Math.round(toLose)} lbs to reach healthy range`;
    } else {
      weightToHealthy = "You're in the healthy range! 🎉";
    }
  }

  // BMI scale for visualization
  const bmiScale = [
    { id: "underweight", label: "Underweight", value: 18.5, displayValue: "< 18.5" },
    { id: "normal", label: "Normal", value: bmi >= 18.5 && bmi < 25 ? bmi : 24.9, displayValue: "18.5 - 24.9" },
    { id: "overweight", label: "Overweight", value: 29.9, displayValue: "25 - 29.9" },
    { id: "obese", label: "Obese", value: 35, displayValue: "30+" },
    { id: "yours", label: "Your BMI", value: Math.min(bmi, 40), displayValue: bmi.toFixed(1) },
  ];

  return {
    values: {
      bmi,
      category: category.label,
      healthyWeightRange,
      weightToHealthy,
    },
    formatted: {
      bmi: bmi.toFixed(1),
      category: category.label,
      healthyWeightRange,
      weightToHealthy,
    },
    summary: `Your BMI is ${bmi.toFixed(1)}, which is classified as ${category.label}. ${weightToHealthy}`,
    isValid: true,
    metadata: {
      bmiScale,
      categoryColor: category.color,
    },
  };
}

export default bmiCalculatorConfig;
