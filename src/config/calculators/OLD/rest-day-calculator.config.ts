import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

export const restDayCalculatorConfig: CalculatorConfigV3 = {
  id: "rest-day-calculator",
  slug: "rest-day-calculator",
  name: "Rest Day Calculator",
  category: "health",
  icon: "🛋️",

  seo: {
    title: "Rest Day Calculator - Workout Recovery Time & Rest Days Planner",
    description: "Calculate optimal recovery time between workouts. Personalized recommendations based on workout intensity, exercise type, fitness level, and age.",
    shortDescription: "Calculate optimal rest days based on your workouts",
    keywords: ["rest day calculator", "workout recovery calculator", "recovery time calculator", "muscle recovery time"],
  },

  hero: { badge: "Health", rating: { average: 4.8, count: 1850 } },

  unitSystem: { enabled: false, default: "imperial", options: [] },

  inputs: [
    {
      id: "exerciseType",
      type: "select",
      label: "Type of Exercise",
      required: true,
      defaultValue: "strength",
      options: [
        { value: "strength", label: "Strength Training (Weights)" },
        { value: "hiit", label: "HIIT / Intervals" },
        { value: "cardio", label: "Cardio (Running, Cycling)" },
        { value: "endurance", label: "Endurance (Long distance)" },
        { value: "sports", label: "Team Sports / Games" },
        { value: "flexibility", label: "Yoga / Stretching / Mobility" },
      ],
    },
    {
      id: "intensity",
      type: "select",
      label: "Workout Intensity",
      required: true,
      defaultValue: "moderate",
      options: [
        { value: "light", label: "Light (Easy, could talk normally)" },
        { value: "moderate", label: "Moderate (Challenging, slightly breathless)" },
        { value: "high", label: "High (Very challenging, hard to talk)" },
        { value: "extreme", label: "Extreme (Max effort, near failure)" },
      ],
    },
    {
      id: "duration",
      type: "select",
      label: "Workout Duration",
      required: true,
      defaultValue: "45-60",
      options: [
        { value: "15-30", label: "15-30 minutes" },
        { value: "30-45", label: "30-45 minutes" },
        { value: "45-60", label: "45-60 minutes" },
        { value: "60-90", label: "60-90 minutes" },
        { value: "90+", label: "90+ minutes" },
      ],
    },
    {
      id: "muscleGroup",
      type: "select",
      label: "Muscle Groups Worked",
      required: true,
      defaultValue: "mixed",
      options: [
        { value: "upper", label: "Upper Body Only" },
        { value: "lower", label: "Lower Body Only" },
        { value: "core", label: "Core / Abs" },
        { value: "mixed", label: "Full Body / Mixed" },
        { value: "cardio", label: "Primarily Cardio (no weights)" },
      ],
    },
    {
      id: "fitnessLevel",
      type: "select",
      label: "Your Fitness Level",
      required: true,
      defaultValue: "intermediate",
      options: [
        { value: "beginner", label: "Beginner (< 6 months training)" },
        { value: "intermediate", label: "Intermediate (6 months - 2 years)" },
        { value: "advanced", label: "Advanced (2+ years consistent training)" },
        { value: "athlete", label: "Competitive Athlete" },
      ],
    },
    {
      id: "age",
      type: "select",
      label: "Age Range",
      required: true,
      defaultValue: "25-34",
      options: [
        { value: "18-24", label: "18-24 years" },
        { value: "25-34", label: "25-34 years" },
        { value: "35-44", label: "35-44 years" },
        { value: "45-54", label: "45-54 years" },
        { value: "55+", label: "55+ years" },
      ],
    },
    {
      id: "sleepQuality",
      type: "select",
      label: "Recent Sleep Quality",
      required: true,
      defaultValue: "good",
      options: [
        { value: "excellent", label: "Excellent (8+ hours, feel rested)" },
        { value: "good", label: "Good (7-8 hours)" },
        { value: "fair", label: "Fair (5-7 hours)" },
        { value: "poor", label: "Poor (< 5 hours or disturbed)" },
      ],
    },
    {
      id: "soreness",
      type: "select",
      label: "Current Muscle Soreness",
      required: true,
      defaultValue: "mild",
      options: [
        { value: "none", label: "None" },
        { value: "mild", label: "Mild (noticeable but not limiting)" },
        { value: "moderate", label: "Moderate (affects movement)" },
        { value: "severe", label: "Severe (painful to move)" },
      ],
    },
  ],

  inputGroups: [],

  results: [
    { id: "recoveryHours", type: "primary", label: "Recovery Time Needed", format: "text" },
    { id: "restDays", type: "secondary", label: "Recommended Rest Days", format: "text" },
    { id: "nextWorkout", type: "secondary", label: "Next Similar Workout", format: "text" },
    { id: "activeRecovery", type: "secondary", label: "Active Recovery OK", format: "text" },
    { id: "weeklySchedule", type: "secondary", label: "Weekly Recommendation", format: "text" },
  ],

  infoCards: [
    {
      id: "recoveryResults",
      title: "Your Recovery Recommendation",
      type: "list",
      icon: "⏰",
      items: [
        { label: "Recovery Time", valueKey: "recoveryHours" },
        { label: "Rest Days Needed", valueKey: "restDays" },
        { label: "Next Workout", valueKey: "nextWorkout" },
        { label: "Active Recovery", valueKey: "activeRecovery" },
      ],
    },
    {
      id: "recoveryTips",
      title: "Optimize Your Recovery",
      type: "horizontal",
      icon: "💡",
      items: [
        { label: "Sleep 7-9 hours for optimal muscle protein synthesis" },
        { label: "Consume protein within 2 hours post-workout" },
        { label: "Stay hydrated - dehydration slows recovery" },
        { label: "Listen to your body - persistent soreness means rest" },
      ],
    },
  ],

  referenceData: [
    {
      id: "recoveryGuide",
      title: "Recovery Time by Exercise Type",
      icon: "📋",
      columns: 2,
      items: [
        { label: "Heavy Strength", value: "72-96 hours" },
        { label: "Moderate Strength", value: "48-72 hours" },
        { label: "HIIT/Intervals", value: "48-72 hours" },
        { label: "Moderate Cardio", value: "24-36 hours" },
      ],
    },
  ],

  educationSections: [
    {
      id: "whyRecoveryMatters",
      type: "prose",
      title: "Why Recovery Matters",
      icon: "🔄",
      content: "Recovery is when your body actually gets stronger. During exercise, you create micro-tears in muscle fibers and deplete energy stores. Recovery allows your body to repair these tears (making muscles stronger), replenish glycogen, and adapt to the training stress. Without adequate recovery, you risk overtraining syndrome, which leads to decreased performance, chronic fatigue, increased injury risk, and immune system suppression.",
    },
    {
      id: "scienceOfRecovery",
      type: "prose",
      title: "The Science of Muscle Recovery",
      icon: "🔬",
      content: "Research shows muscle protein synthesis peaks 24-72 hours after training, meaning your gains happen during rest, not during the workout itself. Growth hormone, essential for muscle repair, is primarily released during deep sleep stages. This is why sleep quality directly impacts recovery speed. Adequate nutrition, especially protein timing within 2 hours post-workout, provides the building blocks your body needs for repair.",
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "These are general guidelines - listen to your body for personalized recovery", type: "info" },
        { text: "You can train different muscle groups on consecutive days (split routines)", type: "info" },
        { text: "Chronic stress, illness, or poor nutrition extend recovery time", type: "warning" },
        { text: "If soreness persists beyond 72 hours, extend rest and consult a professional", type: "warning" },
        { text: "Active recovery (light walking, stretching) can speed up recovery vs complete rest", type: "info" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Recovery Calculation",
      icon: "🧮",
      description: "How recovery time is calculated based on your inputs",
      columns: 2,
      examples: [
        {
          title: "Moderate Workout Example",
          steps: ["Exercise: Strength Training", "Intensity: Moderate", "Duration: 45-60 min", "Base Recovery: 48 hours", "Age Factor (35-44): ×1.15", "Final: 48 × 1.15 = 55 hours"],
          result: "Recovery: ~55 hours (2-3 days)",
        },
        {
          title: "Intense Workout Example",
          steps: ["Exercise: HIIT", "Intensity: High", "Duration: 30-45 min", "Base Recovery: 60 hours", "Beginner Level: ×1.3", "Poor Sleep: ×1.3"],
          result: "Recovery: ~101 hours (4+ days)",
        },
      ],
    },
  ],

  faqs: [
    { question: "How many rest days should I take per week?", answer: "Most people benefit from 1-3 rest days per week depending on workout intensity. Beginners need more rest (2-3 days), while advanced athletes may need only 1-2." },
    { question: "What's the difference between rest days and active recovery?", answer: "Rest days involve minimal physical activity. Active recovery involves low-intensity movement (walking, light yoga) that promotes blood flow without adding training stress." },
    { question: "Can I work out if I'm still sore?", answer: "Mild soreness is usually okay to train through, especially if you're working different muscle groups. However, if soreness is severe or persists beyond 72 hours, rest more." },
    { question: "Does sleep really affect recovery that much?", answer: "Yes, dramatically. During deep sleep, your body releases up to 75% of daily growth hormone. Poor sleep can reduce recovery efficiency by 30-50%." },
    { question: "How does age affect recovery time?", answer: "Recovery slows with age due to decreased hormone production and slower protein synthesis. A 50-year-old typically needs 20-30% more recovery time than a 25-year-old." },
    { question: "Should beginners rest more than advanced athletes?", answer: "Yes, beginners need more recovery time (48-72h) because their bodies aren't adapted to training stress. Advanced athletes recover faster (24-48h) due to better conditioning." },
  ],

  references: [
    { authors: "NASM", year: "2023", title: "Active Recovery Workouts: What to Do on Your Rest Day", source: "NASM Resource Center", url: "https://www.nasm.org/resource-center/blog/active-recovery" },
    { authors: "Schoenfeld BJ, et al.", year: "2016", title: "Effects of Resistance Training Frequency on Measures of Muscle Hypertrophy", source: "Journal of Strength and Conditioning Research", url: "https://pubmed.ncbi.nlm.nih.gov/27102172/" },
  ],

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "health" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["calorie-calculator", "protein-calculator", "bmi-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

const BASE_RECOVERY: Record<string, Record<string, number>> = {
  strength: { light: 24, moderate: 48, high: 72, extreme: 96 },
  hiit: { light: 24, moderate: 48, high: 60, extreme: 72 },
  cardio: { light: 12, moderate: 24, high: 36, extreme: 48 },
  endurance: { light: 24, moderate: 36, high: 48, extreme: 72 },
  sports: { light: 24, moderate: 36, high: 48, extreme: 60 },
  flexibility: { light: 6, moderate: 12, high: 18, extreme: 24 },
};

const DURATION_MULT: Record<string, number> = { "15-30": 0.85, "30-45": 1.0, "45-60": 1.1, "60-90": 1.25, "90+": 1.4 };
const AGE_FACTOR: Record<string, number> = { "18-24": 1.0, "25-34": 1.05, "35-44": 1.15, "45-54": 1.25, "55+": 1.35 };
const FITNESS_FACTOR: Record<string, number> = { beginner: 1.3, intermediate: 1.0, advanced: 0.85, athlete: 0.75 };
const SLEEP_FACTOR: Record<string, number> = { excellent: 0.9, good: 1.0, fair: 1.15, poor: 1.35 };
const SORENESS_FACTOR: Record<string, number> = { none: 0.9, mild: 1.0, moderate: 1.2, severe: 1.5 };

export function calculateRestDay(data: { values: Record<string, unknown>; units: Record<string, string>; unitSystem: "metric" | "imperial" }): CalculatorResults {
  const { values } = data;
  const exerciseType = values.exerciseType as string;
  const intensity = values.intensity as string;
  const duration = values.duration as string;
  const muscleGroup = values.muscleGroup as string;
  const fitnessLevel = values.fitnessLevel as string;
  const age = values.age as string;
  const sleepQuality = values.sleepQuality as string;
  const soreness = values.soreness as string;

  const baseRecovery = BASE_RECOVERY[exerciseType][intensity];
  let recoveryHours = baseRecovery * DURATION_MULT[duration] * AGE_FACTOR[age] * FITNESS_FACTOR[fitnessLevel] * SLEEP_FACTOR[sleepQuality] * SORENESS_FACTOR[soreness];

  if (muscleGroup === "mixed") recoveryHours *= 1.15;

  const restDays = Math.ceil(recoveryHours / 24);

  let activeRecoveryOk = "Yes";
  if (soreness === "severe" || recoveryHours > 72) activeRecoveryOk = "Only light walking/stretching";
  if (soreness === "severe" && intensity === "extreme") activeRecoveryOk = "Complete rest recommended";

  let nextWorkout = recoveryHours <= 24 ? "Tomorrow (same muscle group OK)" : recoveryHours <= 48 ? "In 2 days (or different muscles tomorrow)" : recoveryHours <= 72 ? "In 2-3 days (rest or active recovery)" : `In ${restDays}+ days (prioritize rest)`;

  let weeklySchedule = intensity === "light" ? "Can train 5-6 days/week" : intensity === "moderate" ? "3-4 workout days, 3-4 rest days" : intensity === "high" ? "2-3 intense workouts, 4-5 rest/easy days" : "Max 2 extreme workouts/week";

  const recoveryFormatted = recoveryHours < 24 ? `${Math.round(recoveryHours)} hours` : `${Math.round(recoveryHours)} hours (${restDays} days)`;
  const restDaysFormatted = restDays <= 1 ? "0-1 days" : restDays <= 2 ? "1-2 days" : restDays <= 3 ? "2-3 days" : `${restDays}+ days`;

  const summary = `Based on your ${intensity} intensity ${exerciseType} workout, you need approximately ${recoveryFormatted} of recovery. ${weeklySchedule}.`;

  return {
    values: { recoveryHours, restDays, baseRecovery },
    formatted: { recoveryHours: recoveryFormatted, restDays: restDaysFormatted, nextWorkout, activeRecovery: activeRecoveryOk, weeklySchedule },
    summary,
    isValid: true,
  };
}

export default restDayCalculatorConfig;
