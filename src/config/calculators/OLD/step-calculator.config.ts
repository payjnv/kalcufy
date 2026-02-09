import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

export const stepCalculatorConfig: CalculatorConfigV3 = {
  id: "step-calculator",
  slug: "step-calculator",
  name: "Step Calculator",
  category: "health",
  icon: "🚶",

  seo: {
    title: "Step Calculator - Convert Steps to Miles, Kilometers & Calories",
    description: "Convert steps to distance (miles/km) and calories burned. Also convert distance to steps or find how many steps to burn specific calories.",
    shortDescription: "Convert steps ↔ distance ↔ calories with precision",
    keywords: ["steps to miles calculator", "steps to calories calculator", "steps to km calculator", "10000 steps distance"],
  },

  hero: { badge: "Health", rating: { average: 4.9, count: 5600 } },

  unitSystem: {
    enabled: true,
    default: "imperial",
    options: [
      { value: "imperial", label: "Imperial (mi, lb, in)" },
      { value: "metric", label: "Metric (km, kg, cm)" },
    ],
  },

  inputs: [
    {
      id: "calculationMode",
      type: "select",
      label: "What do you want to calculate?",
      required: true,
      defaultValue: "stepsToDistance",
      options: [
        { value: "stepsToDistance", label: "Steps → Distance & Calories" },
        { value: "distanceToSteps", label: "Distance → Steps & Calories" },
        { value: "stepsToCalories", label: "Steps → Calories (detailed)" },
        { value: "caloriesToSteps", label: "Calories → Steps needed" },
      ],
    },
    {
      id: "gender",
      type: "radio",
      label: "Gender",
      required: true,
      defaultValue: "male",
      options: [{ value: "male", label: "Male" }, { value: "female", label: "Female" }],
    },
    {
      id: "height",
      type: "number",
      label: "Height",
      required: true,
      defaultValue: 70,
      min: 48,
      max: 96,
      step: 0.5,
      suffix: "in",
      helpText: "Used to estimate your stride length",
      units: {
        imperial: { suffix: "in", min: 48, max: 96, step: 0.5, default: 70 },
        metric: { suffix: "cm", min: 120, max: 250, step: 1, default: 178 },
      },
    },
    {
      id: "weight",
      type: "number",
      label: "Weight",
      required: true,
      defaultValue: 170,
      min: 80,
      max: 400,
      step: 1,
      suffix: "lb",
      helpText: "Used to calculate calories burned",
      units: {
        imperial: { suffix: "lb", min: 80, max: 400, step: 1, default: 170 },
        metric: { suffix: "kg", min: 35, max: 180, step: 0.5, default: 77 },
      },
    },
    {
      id: "pace",
      type: "select",
      label: "Walking Pace",
      required: true,
      defaultValue: "average",
      options: [
        { value: "slow", label: "Slow (2 mph / 3.2 km/h)" },
        { value: "average", label: "Average (3 mph / 4.8 km/h)" },
        { value: "brisk", label: "Brisk (4 mph / 6.4 km/h)" },
        { value: "fast", label: "Fast/Jogging (5 mph / 8 km/h)" },
      ],
    },
    {
      id: "steps",
      type: "number",
      label: "Number of Steps",
      required: false,
      defaultValue: 10000,
      min: 100,
      max: 100000,
      step: 100,
      suffix: "steps",
      showWhen: { field: "calculationMode", value: ["stepsToDistance", "stepsToCalories"] },
    },
    {
      id: "distance",
      type: "number",
      label: "Distance",
      required: false,
      defaultValue: 5,
      min: 0.1,
      max: 50,
      step: 0.1,
      suffix: "mi",
      showWhen: { field: "calculationMode", value: "distanceToSteps" },
      units: {
        imperial: { suffix: "mi", min: 0.1, max: 50, step: 0.1, default: 5 },
        metric: { suffix: "km", min: 0.1, max: 80, step: 0.1, default: 8 },
      },
    },
    {
      id: "targetCalories",
      type: "number",
      label: "Target Calories to Burn",
      required: false,
      defaultValue: 300,
      min: 50,
      max: 2000,
      step: 10,
      suffix: "kcal",
      showWhen: { field: "calculationMode", value: "caloriesToSteps" },
    },
  ],

  inputGroups: [],

  results: [
    { id: "primaryResult", type: "primary", label: "Result", format: "text" },
    { id: "distanceMiles", type: "secondary", label: "Distance (miles)", format: "text" },
    { id: "distanceKm", type: "secondary", label: "Distance (km)", format: "text" },
    { id: "caloriesBurned", type: "secondary", label: "Calories Burned", format: "text" },
    { id: "walkingTime", type: "secondary", label: "Walking Time", format: "text" },
    { id: "strideLength", type: "secondary", label: "Your Stride Length", format: "text" },
  ],

  infoCards: [
    {
      id: "conversionResults",
      title: "Your Results",
      type: "list",
      icon: "🚶",
      items: [
        { label: "Distance", valueKey: "distanceMiles" },
        { label: "Kilometers", valueKey: "distanceKm" },
        { label: "Calories Burned", valueKey: "caloriesBurned" },
        { label: "Walking Time", valueKey: "walkingTime" },
      ],
    },
    {
      id: "stepTips",
      title: "Step Goals & Health Benefits",
      type: "horizontal",
      icon: "💡",
      items: [
        { label: "10,000 steps ≈ 4-5 miles, burns 300-500 calories" },
        { label: "Walking reduces cardiovascular disease risk by 35%" },
        { label: "Brisk walking burns 80% more calories than slow walking" },
        { label: "Higher pace = longer stride = fewer steps per mile" },
      ],
    },
  ],

  referenceData: [
    {
      id: "stepsReference",
      title: "Steps per Mile by Pace",
      icon: "📊",
      columns: 2,
      items: [
        { label: "Slow (2 mph)", value: "~2,400 steps/mi" },
        { label: "Average (3 mph)", value: "~2,000 steps/mi" },
        { label: "Brisk (4 mph)", value: "~1,800 steps/mi" },
        { label: "Fast (5 mph)", value: "~1,500 steps/mi" },
      ],
    },
  ],

  educationSections: [
    {
      id: "howItWorks",
      type: "prose",
      title: "How Steps Are Converted to Distance",
      icon: "📏",
      content: "Your stride length determines how much distance each step covers. We calculate stride length based on your height and gender: men typically have a stride length of 41.5% of their height, while women have 41.3%. For example, a 5'10\" man has an average stride of about 29 inches (74 cm). Once we know your stride, we multiply by your step count to get distance, then use MET values to calculate calories burned based on your weight and walking pace.",
    },
    {
      id: "healthBenefits",
      type: "prose",
      title: "Health Benefits of Walking",
      icon: "❤️",
      content: "Walking is one of the most accessible and effective forms of exercise. Studies show regular walking reduces cardiovascular disease risk by up to 35%, lowers blood pressure, improves blood sugar regulation, and helps maintain healthy weight. Walking also benefits mental health by reducing stress, anxiety, and symptoms of depression. Even moderate amounts of walking (7,500+ steps daily) show significant health improvements compared to sedentary lifestyles.",
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "Stride length varies with pace - faster walking means longer strides", type: "info" },
        { text: "Terrain affects calorie burn - hills and rough terrain increase expenditure", type: "info" },
        { text: "Individual metabolisms vary - these are estimates based on averages", type: "warning" },
        { text: "Fitness trackers may show different values due to different algorithms", type: "info" },
        { text: "For weight loss, combine walking with dietary changes for best results", type: "info" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "🧮",
      description: "How 10,000 steps converts to distance and calories",
      columns: 2,
      examples: [
        {
          title: "10,000 Steps (Average Male)",
          steps: ["Height: 5'10\" (178 cm)", "Stride = 178 × 0.415 = 73.9 cm", "Distance = 10,000 × 0.739m = 7.39 km", "Time @ 3 mph = 92 min"],
          result: "4.6 miles, ~412 calories, 92 minutes",
        },
        {
          title: "5,000 Steps (Average Female)",
          steps: ["Height: 5'4\" (163 cm)", "Stride = 163 × 0.413 = 67.3 cm", "Distance = 5,000 × 0.673m = 3.37 km", "Time @ 3 mph = 42 min"],
          result: "2.1 miles, ~154 calories, 42 minutes",
        },
      ],
    },
  ],

  faqs: [
    { question: "How many steps are in a mile?", answer: "On average, there are about 2,000-2,400 steps in a mile, depending on your stride length and pace. Taller people take fewer steps per mile." },
    { question: "How many calories does 10,000 steps burn?", answer: "For most people, 10,000 steps burns approximately 300-500 calories, depending on weight, height, and walking pace." },
    { question: "Is 10,000 steps a day really necessary?", answer: "Recent studies suggest health benefits plateau around 7,500-8,000 steps for most adults. Any increase in daily steps provides benefits." },
    { question: "Why does walking pace affect calorie burn so much?", answer: "MET values (metabolic equivalent) increase from 2.8 for slow walking to 5.0 for brisk walking. Brisk walking burns nearly 80% more calories per minute." },
    { question: "How accurate are fitness tracker step counts?", answer: "Most fitness trackers are accurate within 5-10% for step counting. Wrist-worn devices may count extra steps from arm movements." },
    { question: "What's the best time of day to walk for health?", answer: "Any time works! Morning walks help establish routine, while evening walks aid digestion and sleep. Consistency matters more than timing." },
  ],

  references: [
    { authors: "ACSM Health & Fitness Journal", year: "2019", title: "One-mile step count at walking and running speeds", source: "American College of Sports Medicine", url: "https://journals.lww.com/acsm-healthfitness/" },
    { authors: "Ainsworth BE, et al.", year: "2011", title: "Compendium of Physical Activities: MET intensities", source: "Medicine & Science in Sports & Exercise", url: "https://pubmed.ncbi.nlm.nih.gov/21681120/" },
  ],

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "health" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["calorie-calculator", "bmi-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

const MET_VALUES: Record<string, { met: number; mph: number; strideFactor: number }> = {
  slow: { met: 2.8, mph: 2, strideFactor: 0.95 },
  average: { met: 3.5, mph: 3, strideFactor: 1.0 },
  brisk: { met: 5.0, mph: 4, strideFactor: 1.08 },
  fast: { met: 8.0, mph: 5, strideFactor: 1.15 },
};

export function calculateSteps(data: { values: Record<string, unknown>; units: Record<string, string>; unitSystem: "metric" | "imperial" }): CalculatorResults {
  const { values, unitSystem } = data;
  const mode = values.calculationMode as string;
  const gender = values.gender as string;
  const pace = values.pace as string;

  let height = values.height as number;
  let weight = values.weight as number;

  if (unitSystem === "imperial") {
    height = height * 2.54;
    weight = weight * 0.453592;
  }

  const paceInfo = MET_VALUES[pace];
  const baseStrideFactor = gender === "male" ? 0.415 : 0.413;
  const strideLength = height * baseStrideFactor * paceInfo.strideFactor;
  const strideLengthM = strideLength / 100;

  let steps = 0, distanceM = 0, calories = 0, timeMinutes = 0;

  switch (mode) {
    case "stepsToDistance":
    case "stepsToCalories":
      steps = values.steps as number;
      distanceM = steps * strideLengthM;
      const distanceMiles = distanceM / 1609.34;
      timeMinutes = (distanceMiles / paceInfo.mph) * 60;
      calories = (paceInfo.met * 3.5 * weight * timeMinutes) / 200;
      break;
    case "distanceToSteps":
      let inputDistance = values.distance as number;
      distanceM = unitSystem === "imperial" ? inputDistance * 1609.34 : inputDistance * 1000;
      steps = Math.round(distanceM / strideLengthM);
      const distMiles = distanceM / 1609.34;
      timeMinutes = (distMiles / paceInfo.mph) * 60;
      calories = (paceInfo.met * 3.5 * weight * timeMinutes) / 200;
      break;
    case "caloriesToSteps":
      const targetCals = values.targetCalories as number;
      timeMinutes = (targetCals * 200) / (paceInfo.met * 3.5 * weight);
      const distMi = (timeMinutes / 60) * paceInfo.mph;
      distanceM = distMi * 1609.34;
      steps = Math.round(distanceM / strideLengthM);
      calories = targetCals;
      break;
  }

  const distanceMiles = distanceM / 1609.34;
  const distanceKm = distanceM / 1000;
  const hours = Math.floor(timeMinutes / 60);
  const mins = Math.round(timeMinutes % 60);
  const timeFormatted = hours > 0 ? `${hours}h ${mins}min` : `${mins} min`;
  const strideLengthFormatted = unitSystem === "imperial" ? `${(strideLength / 2.54).toFixed(1)} in` : `${strideLength.toFixed(1)} cm`;

  let primaryResult = "";
  switch (mode) {
    case "stepsToDistance": primaryResult = unitSystem === "imperial" ? `${distanceMiles.toFixed(2)} miles` : `${distanceKm.toFixed(2)} km`; break;
    case "distanceToSteps": primaryResult = `${steps.toLocaleString()} steps`; break;
    case "stepsToCalories": primaryResult = `${Math.round(calories)} calories`; break;
    case "caloriesToSteps": primaryResult = `${steps.toLocaleString()} steps`; break;
  }

  const summary = `${steps.toLocaleString()} steps = ${distanceMiles.toFixed(2)} miles (${distanceKm.toFixed(2)} km), burns ~${Math.round(calories)} calories in ${timeFormatted}.`;

  return {
    values: { steps, distanceM, distanceMiles, distanceKm, calories, timeMinutes, strideLength },
    formatted: { primaryResult, distanceMiles: `${distanceMiles.toFixed(2)} mi`, distanceKm: `${distanceKm.toFixed(2)} km`, caloriesBurned: `${Math.round(calories)} kcal`, walkingTime: timeFormatted, strideLength: strideLengthFormatted },
    summary,
    isValid: true,
  };
}

export default stepCalculatorConfig;
