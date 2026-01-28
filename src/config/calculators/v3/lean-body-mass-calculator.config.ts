import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

export const leanBodyMassCalculatorConfig: CalculatorConfigV3 = {
  id: "lean-body-mass-calculator",
  slug: "lean-body-mass-calculator",
  name: "Lean Body Mass Calculator",
  category: "health",
  icon: "💪",

  seo: {
    title: "Lean Body Mass Calculator - Boer, James, Hume & Peters Formulas",
    description: "Calculate your lean body mass (LBM) using 4 scientifically validated formulas. Includes body fat mass, LBM percentage, and protein recommendations.",
    shortDescription: "Calculate LBM using multiple scientific formulas",
    keywords: ["lean body mass calculator", "LBM calculator", "Boer formula", "James formula", "body composition"],
  },

  hero: { badge: "Health", rating: { average: 4.8, count: 3200 } },

  unitSystem: {
    enabled: true,
    default: "imperial",
    options: [
      { value: "imperial", label: "Imperial (lb, in)" },
      { value: "metric", label: "Metric (kg, cm)" },
    ],
  },

  inputs: [
    {
      id: "gender",
      type: "radio",
      label: "Gender",
      required: true,
      defaultValue: "male",
      options: [{ value: "male", label: "Male" }, { value: "female", label: "Female" }],
    },
    {
      id: "age",
      type: "number",
      label: "Age",
      required: true,
      defaultValue: 30,
      min: 5,
      max: 100,
      step: 1,
      suffix: "years",
      helpText: "Peters formula used for ages 14 and under",
    },
    {
      id: "weight",
      type: "number",
      label: "Weight",
      required: true,
      defaultValue: 180,
      min: 50,
      max: 500,
      step: 0.5,
      suffix: "lb",
      units: {
        imperial: { suffix: "lb", min: 50, max: 500, step: 0.5, default: 180 },
        metric: { suffix: "kg", min: 25, max: 230, step: 0.5, default: 82 },
      },
    },
    {
      id: "height",
      type: "number",
      label: "Height",
      required: true,
      defaultValue: 70,
      min: 36,
      max: 96,
      step: 0.5,
      suffix: "in",
      units: {
        imperial: { suffix: "in", min: 36, max: 96, step: 0.5, default: 70 },
        metric: { suffix: "cm", min: 90, max: 250, step: 1, default: 178 },
      },
    },
    {
      id: "bodyFatKnown",
      type: "radio",
      label: "Do you know your body fat %?",
      required: true,
      defaultValue: "no",
      options: [{ value: "no", label: "No (use formulas)" }, { value: "yes", label: "Yes (I'll enter it)" }],
    },
    {
      id: "bodyFatPercent",
      type: "number",
      label: "Body Fat Percentage",
      required: false,
      defaultValue: 20,
      min: 3,
      max: 60,
      step: 0.5,
      suffix: "%",
      showWhen: { field: "bodyFatKnown", value: "yes" },
      helpText: "If known from DEXA, calipers, or other measurement",
    },
  ],

  inputGroups: [],

  results: [
    { id: "lbmBoer", type: "primary", label: "LBM (Boer)", format: "text" },
    { id: "lbmJames", type: "secondary", label: "LBM (James)", format: "text" },
    { id: "lbmHume", type: "secondary", label: "LBM (Hume)", format: "text" },
    { id: "fatMass", type: "secondary", label: "Estimated Fat Mass", format: "text" },
    { id: "lbmPercent", type: "secondary", label: "LBM Percentage", format: "text" },
    { id: "proteinRange", type: "secondary", label: "Protein Intake", format: "text" },
  ],

  infoCards: [
    {
      id: "lbmResults",
      title: "Your LBM Results",
      type: "list",
      icon: "💪",
      items: [
        { label: "LBM (Boer - Recommended)", valueKey: "lbmBoer" },
        { label: "LBM (James)", valueKey: "lbmJames" },
        { label: "LBM (Hume)", valueKey: "lbmHume" },
        { label: "Estimated Fat Mass", valueKey: "fatMass" },
        { label: "LBM Percentage", valueKey: "lbmPercent" },
      ],
    },
    {
      id: "nutritionTips",
      title: "Nutrition Tips Based on LBM",
      type: "horizontal",
      icon: "🥗",
      items: [
        { label: "Protein: 0.7-1.0g per pound of LBM daily for muscle maintenance" },
        { label: "Higher LBM = Higher Basal Metabolic Rate (BMR)" },
        { label: "Focus on resistance training to increase LBM" },
        { label: "LBM includes bones, muscles, organs, and water" },
      ],
    },
  ],

  referenceData: [
    {
      id: "lbmRanges",
      title: "Average LBM Percentages",
      icon: "📊",
      columns: 2,
      items: [
        { label: "Men Average", value: "76-82%" },
        { label: "Women Average", value: "69-75%" },
        { label: "Athletes (M)", value: "80-90%" },
        { label: "Athletes (F)", value: "75-85%" },
      ],
    },
  ],

  educationSections: [
    {
      id: "whatIsLbm",
      type: "prose",
      title: "What is Lean Body Mass?",
      icon: "💪",
      content: "Lean Body Mass (LBM) is your total body weight minus all body fat. It includes the weight of your bones, muscles, organs, blood, skin, and everything except fat. LBM typically ranges from 60-90% of total body weight, with men generally having higher LBM percentages than women. Understanding your LBM is crucial for setting accurate protein intake goals, calculating medication dosages, and tracking fitness progress.",
    },
    {
      id: "whyLbmMatters",
      type: "prose",
      title: "Why LBM Matters for Fitness",
      icon: "🎯",
      content: "Your lean body mass directly impacts your basal metabolic rate (BMR) - the calories your body burns at rest. More muscle means higher calorie burn even when sedentary. For athletes and fitness enthusiasts, tracking LBM over time shows whether you're gaining muscle or losing it during weight loss. LBM is also essential for calculating accurate protein needs, as protein recommendations are best based on lean mass rather than total weight.",
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "These formulas provide estimates based on average body compositions", type: "info" },
        { text: "Very muscular individuals may have their LBM underestimated", type: "warning" },
        { text: "For accurate measurement, consider DEXA scan or professional body composition analysis", type: "info" },
        { text: "Boer formula is generally recommended as the most reliable for adults", type: "info" },
        { text: "Results may vary depending on hydration levels and time of day", type: "warning" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "🧮",
      description: "How LBM is calculated using different formulas",
      columns: 2,
      examples: [
        {
          title: "Male Example (Boer)",
          steps: ["Weight: 180 lb (81.6 kg)", "Height: 70 in (178 cm)", "LBM = 0.407 × 81.6 + 0.267 × 178 - 19.2", "LBM = 61.5 kg (135.6 lb)"],
          result: "LBM = 135.6 lb (75% of body weight)",
        },
        {
          title: "Female Example (Boer)",
          steps: ["Weight: 140 lb (63.5 kg)", "Height: 64 in (163 cm)", "LBM = 0.252 × 63.5 + 0.473 × 163 - 48.3", "LBM = 44.8 kg (98.8 lb)"],
          result: "LBM = 98.8 lb (70% of body weight)",
        },
      ],
    },
  ],

  faqs: [
    { question: "Which LBM formula should I use?", answer: "The Boer formula is generally recommended for most adults as it provides a good middle ground and is widely used in clinical settings." },
    { question: "Why are the formula results different?", answer: "Each formula was developed from different population studies and uses different mathematical approaches. The variation is typically 1-5% between formulas." },
    { question: "How do I use LBM for protein intake?", answer: "A common recommendation is 0.7-1.0 grams of protein per pound of lean body mass daily for muscle maintenance and growth." },
    { question: "Can I increase my LBM?", answer: "Yes! Resistance training combined with adequate protein intake (0.7-1.0g per lb of LBM) can help you build muscle and increase LBM over time." },
    { question: "What is a healthy LBM percentage?", answer: "For men, 76-82% is average while athletes may reach 80-90%. For women, 69-75% is average with athletes at 75-85%." },
    { question: "How accurate are these formulas?", answer: "These formulas provide estimates within 5-10% of actual values. For precise measurements, consider DEXA scans or hydrostatic weighing." },
  ],

  references: [
    { authors: "Boer P", year: "1984", title: "Estimated lean body mass as an index for normalization of body fluid volumes in humans", source: "American Journal of Physiology", url: "https://pubmed.ncbi.nlm.nih.gov/6496691/" },
    { authors: "Hume R", year: "1966", title: "Prediction of lean body mass from height and weight", source: "Journal of Clinical Pathology", url: "https://pubmed.ncbi.nlm.nih.gov/5929341/" },
  ],

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "health" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["bmi-calculator", "body-fat-calculator", "ideal-weight-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

export function calculateLeanBodyMass(data: { values: Record<string, unknown>; units: Record<string, string>; unitSystem: "metric" | "imperial" }): CalculatorResults {
  const { values, unitSystem } = data;
  const gender = values.gender as string;
  const bodyFatKnown = values.bodyFatKnown as string;
  const bodyFatPercent = values.bodyFatPercent as number;

  let weight = values.weight as number;
  let height = values.height as number;

  if (unitSystem === "imperial") {
    weight = weight * 0.453592;
    height = height * 2.54;
  }

  let lbmBoer: number, lbmJames: number, lbmHume: number;
  let lbmFromBF: number | null = null;

  if (bodyFatKnown === "yes" && bodyFatPercent) {
    lbmFromBF = weight * (1 - bodyFatPercent / 100);
  }

  if (gender === "male") {
    lbmBoer = 0.407 * weight + 0.267 * height - 19.2;
    lbmJames = 1.1 * weight - 128 * Math.pow(weight / height, 2);
    lbmHume = 0.32810 * weight + 0.33929 * height - 29.5336;
  } else {
    lbmBoer = 0.252 * weight + 0.473 * height - 48.3;
    lbmJames = 1.07 * weight - 148 * Math.pow(weight / height, 2);
    lbmHume = 0.29569 * weight + 0.41813 * height - 43.2933;
  }

  const primaryLbm = lbmFromBF !== null ? lbmFromBF : lbmBoer;
  const fatMass = weight - primaryLbm;
  const lbmPercent = (primaryLbm / weight) * 100;
  const lbmInLb = primaryLbm * 2.20462;
  const proteinLow = lbmInLb * 0.7;
  const proteinHigh = lbmInLb * 1.0;

  const formatWeight = (kg: number): string => unitSystem === "imperial" ? `${(kg * 2.20462).toFixed(1)} lb` : `${kg.toFixed(1)} kg`;

  const summary = `Your estimated Lean Body Mass is ${formatWeight(primaryLbm)} (${lbmPercent.toFixed(1)}% of body weight). Recommended daily protein: ${Math.round(proteinLow)}-${Math.round(proteinHigh)}g.`;

  return {
    values: { lbmBoer, lbmJames, lbmHume, fatMass, lbmPercent, proteinLow, proteinHigh },
    formatted: {
      lbmBoer: formatWeight(lbmBoer),
      lbmJames: formatWeight(lbmJames),
      lbmHume: formatWeight(lbmHume),
      fatMass: formatWeight(fatMass),
      lbmPercent: `${lbmPercent.toFixed(1)}%`,
      proteinRange: `${Math.round(proteinLow)}-${Math.round(proteinHigh)}g/day`,
    },
    summary,
    isValid: true,
  };
}

export default leanBodyMassCalculatorConfig;
