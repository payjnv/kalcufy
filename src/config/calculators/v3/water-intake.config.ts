import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.0,
  light: 1.1,
  moderate: 1.2,
  active: 1.3,
  athlete: 1.5,
};

const CLIMATE_ADJUSTMENTS: Record<string, number> = {
  cold: -0.1,
  temperate: 0,
  hot: 0.15,
  humid: 0.25,
};

export const waterIntakeCalculatorConfig: CalculatorConfigV3 = {
  id: "water-intake-calculator",
  slug: "water-intake-calculator",
  name: "Water Intake Calculator",
  category: "health",
  icon: "💧",

  seo: {
    title: "Water Intake Calculator - Daily Hydration Needs",
    description: "Free water intake calculator to determine how much water you should drink daily based on weight, activity level, and climate. Stay properly hydrated with personalized recommendations.",
    shortDescription: "Calculate your daily water needs",
    keywords: ["water intake calculator", "hydration calculator", "how much water to drink", "daily water needs", "water consumption", "dehydration prevention"],
  },

  hero: { badge: "Health", rating: { average: 4.8, count: 67200 } },

  unitSystem: {
    enabled: true,
    default: "imperial",
    options: [
      { id: "metric", label: "Metric (kg, L)" },
      { id: "imperial", label: "Imperial (lb, oz)" },
    ],
  },

  inputs: [
    {
      id: "weight",
      type: "number",
      label: "Body Weight",
      required: true,
      defaultValue: 150,
      min: 50,
      max: 500,
      step: 1,
      units: {
        metric: { suffix: "kg", default: true },
        imperial: { suffix: "lb", default: true },
      },
    },
    {
      id: "activityLevel",
      type: "select",
      label: "Activity Level",
      required: true,
      defaultValue: "moderate",
      options: [
        { value: "sedentary", label: "Sedentary (little or no exercise)" },
        { value: "light", label: "Lightly Active (1-3 days/week)" },
        { value: "moderate", label: "Moderately Active (3-5 days/week)" },
        { value: "active", label: "Very Active (6-7 days/week)" },
        { value: "athlete", label: "Athlete (professional training)" },
      ],
    },
    {
      id: "climate",
      type: "select",
      label: "Climate",
      required: true,
      defaultValue: "temperate",
      options: [
        { value: "cold", label: "Cold ❄️" },
        { value: "temperate", label: "Temperate 🌤️" },
        { value: "hot", label: "Hot ☀️" },
        { value: "humid", label: "Hot & Humid 🥵" },
      ],
    },
    {
      id: "isPregnant",
      type: "radio",
      label: "Special Conditions",
      required: false,
      defaultValue: "none",
      options: [
        { value: "none", label: "None" },
        { value: "pregnant", label: "Pregnant" },
        { value: "breastfeeding", label: "Breastfeeding" },
      ],
    },
  ],

  inputGroups: [],

  results: [
    { id: "dailyWater", type: "primary", label: "Daily Water Intake", format: "text" },
    { id: "dailyOz", type: "secondary", label: "In Ounces", format: "number", suffix: " oz" },
    { id: "dailyLiters", type: "secondary", label: "In Liters", format: "number", suffix: " L" },
    { id: "dailyCups", type: "secondary", label: "In Cups", format: "number", suffix: " cups" },
    { id: "glassesPerDay", type: "secondary", label: "8oz Glasses", format: "number", suffix: " glasses" },
    { id: "perHour", type: "secondary", label: "Per Waking Hour", format: "number", suffix: " oz" },
  ],

  infoCards: [
    {
      id: "hydrationSigns",
      title: "Signs of Proper Hydration",
      icon: "✅",
      type: "list",
      items: [
        { label: "Urine color", value: "Pale yellow (like hay)", color: "green" },
        { label: "Frequency", value: "Every 2-4 hours", color: "blue" },
        { label: "Energy", value: "Consistent throughout day", color: "purple" },
        { label: "Skin", value: "Good elasticity", color: "amber" },
      ],
    },
    {
      id: "quickTips",
      title: "Hydration Tips",
      icon: "💡",
      type: "horizontal",
      items: [
        { label: "Drink 16oz upon waking" },
        { label: "Carry a water bottle" },
        { label: "Set hourly reminders" },
        { label: "Eat water-rich foods" },
      ],
    },
  ],

  referenceData: [
    {
      id: "waterContent",
      title: "Water in Common Foods",
      icon: "🥒",
      columns: 2,
      items: [
        { label: "Cucumber", value: "96%" },
        { label: "Watermelon", value: "92%" },
        { label: "Oranges", value: "87%" },
        { label: "Yogurt", value: "85%" },
        { label: "Apples", value: "84%" },
        { label: "Chicken breast", value: "65%" },
      ],
    },
  ],

  educationSections: [
    {
      id: "whyHydration",
      type: "cards",
      title: "Why Hydration Matters",
      icon: "🧠",
      columns: 2,
      cards: [
        { title: "Brain Function", description: "Even 1-2% dehydration impairs concentration, memory, and mood. Proper hydration supports cognitive performance.", icon: "🧠" },
        { title: "Physical Performance", description: "Dehydration reduces endurance, strength, and coordination. Athletes need 125-150% fluid replacement.", icon: "💪" },
        { title: "Temperature Regulation", description: "Water enables sweating which cools the body. Without adequate fluids, overheating risk increases.", icon: "🌡️" },
        { title: "Digestion & Detox", description: "Water aids nutrient absorption, prevents constipation, and helps kidneys flush waste products.", icon: "🫀" },
      ],
    },
    {
      id: "dehydrationSigns",
      type: "cards",
      title: "Signs of Dehydration",
      icon: "⚠️",
      columns: 4,
      cards: [
        { title: "Mild", description: "Thirst, dry mouth, dark yellow urine, slight headache", icon: "😐" },
        { title: "Moderate", description: "Reduced urination, dizziness, fatigue, dry skin", icon: "😟" },
        { title: "Severe", description: "Rapid heartbeat, confusion, no urination, sunken eyes", icon: "😰" },
        { title: "Emergency", description: "Fainting, seizures, very low blood pressure — seek medical help", icon: "🚨" },
      ],
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "About 20% of daily water intake comes from food, not beverages. Water-rich fruits and vegetables count!", type: "info" },
        { text: "The '8 glasses a day' rule is a myth — water needs vary significantly by body weight and activity.", type: "warning" },
        { text: "Pregnant women need 24-32 oz extra daily. Breastfeeding mothers need even more to support milk production.", type: "info" },
        { text: "Caffeine and alcohol have mild diuretic effects but still contribute to hydration in moderation.", type: "info" },
        { text: "Overhydration (hyponatremia) is rare but dangerous. Don't exceed 1 liter per hour sustained.", type: "warning" },
        { text: "Thirst is a late indicator — by the time you feel thirsty, you're already mildly dehydrated.", type: "warning" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "🧮",
      description: "170 lb person, moderately active, temperate climate",
      columns: 2,
      examples: [
        { title: "Base Calculation", steps: ["Weight: 170 lbs", "Base: 170 × 0.5 = 85 oz", "Activity (+20%): 85 × 1.2 = 102 oz", "Climate (0%): No adjustment"], result: "Daily Target: 102 oz (3.0 L)" },
        { title: "Hourly Distribution", steps: ["Daily: 102 oz", "Waking hours: 16", "Per hour: 102 ÷ 16 = 6.4 oz", "That's about half a glass"], result: "Drink ~6 oz every hour" },
      ],
    },
    {
      id: "formula",
      type: "prose",
      title: "The Water Intake Formula",
      content: "The standard formula is to drink half your body weight (in pounds) in ounces of water. For example, a 160 lb person needs 80 oz of water daily. In metric: multiply your weight in kg by 0.033 to get liters. Add 12 oz (350ml) for every 30 minutes of exercise. Adjust upward for hot weather and special conditions like pregnancy.",
    },
    {
      id: "myths",
      type: "prose",
      title: "Hydration Myths Debunked",
      content: "The '8 glasses a day' rule isn't backed by science — needs vary by individual. Coffee and tea do count toward hydration despite mild diuretic effects. Clear urine isn't the goal; pale yellow indicates proper hydration. You can drink too much water, causing dangerous hyponatremia (low sodium), though this is rare outside endurance sports.",
    },
    {
      id: "benefits",
      type: "prose",
      title: "Health Benefits of Proper Hydration",
      content: "Water makes up about 60% of your body weight and is essential for virtually every bodily function. Proper hydration supports kidney function, helps maintain blood pressure, lubricates joints, regulates body temperature, and transports nutrients. Studies show even mild dehydration can negatively impact mood, energy levels, and cognitive performance.",
    },
  ],

  faqs: [
    { question: "How much water should I drink per day?", answer: "A good rule is half your body weight (in pounds) in ounces. For a 150 lb person, that's 75 oz (~2.2 liters). Adjust for activity, climate, and personal factors. The National Academy of Medicine recommends ~13 cups for men and ~9 cups for women." },
    { question: "Does coffee count toward water intake?", answer: "Yes! While caffeine has a mild diuretic effect, coffee and tea still contribute to hydration. Studies show caffeinated beverages provide similar hydration to water when consumed in moderation (under 400mg caffeine/day)." },
    { question: "What's the best way to stay hydrated?", answer: "Drink 16 oz (2 cups) upon waking, 8 oz before each meal, and sip throughout the day. Carry a reusable water bottle, set hourly reminders, and eat water-rich foods like cucumbers, watermelon, and oranges." },
    { question: "How do I know if I'm drinking enough water?", answer: "Check your urine color — pale yellow (like hay) is ideal. Clear urine may mean overhydration. Dark yellow or amber indicates you need more fluids. Urinating every 2-4 hours is healthy." },
    { question: "Can I drink too much water?", answer: "Yes, but it's rare. Hyponatremia (water intoxication) occurs when you drink so much water that blood sodium drops dangerously. It typically requires drinking several liters in a short time. Stay under 1 liter per hour." },
    { question: "Do I need more water when exercising?", answer: "Yes! Add 12 oz (350ml) for every 30 minutes of exercise. For intense workouts over an hour, consider sports drinks with electrolytes to replace sodium and potassium lost through sweat." },
    { question: "How much extra water do pregnant women need?", answer: "Pregnant women need about 24-32 oz (700ml-1L) more daily. Breastfeeding mothers need even more — roughly 32 oz extra to support milk production. Always consult your healthcare provider." },
    { question: "What foods help with hydration?", answer: "Many fruits and vegetables are 80-96% water: cucumbers (96%), watermelon (92%), strawberries (91%), oranges (87%), and celery (95%). About 20% of daily water intake typically comes from food." },
  ],

  references: [
    { authors: "National Academy of Medicine", year: "2005", title: "Dietary Reference Intakes for Water, Potassium, Sodium, Chloride, and Sulfate", source: "The National Academies Press", url: "https://nap.nationalacademies.org/catalog/10925" },
    { authors: "Harvard T.H. Chan School of Public Health", year: "2025", title: "Water: How Much Should You Drink?", source: "The Nutrition Source", url: "https://nutritionsource.hsph.harvard.edu/water/" },
  ],

  detailedTable: {
    id: "hourlySchedule",
    buttonLabel: "View Hourly Schedule",
    buttonIcon: "⏰",
    modalTitle: "Suggested Drinking Schedule",
    columns: [
      { id: "time", label: "Time", align: "left" },
      { id: "amount", label: "Amount", align: "right", highlight: true },
      { id: "tip", label: "Tip", align: "left" },
    ],
  },

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "health" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["calorie-calculator", "bmi-calculator", "tdee-calculator", "macro-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateWaterIntake(data: { values: Record<string, unknown>; units: Record<string, string>; unitSystem: "metric" | "imperial" }): CalculatorResults {
  const { values, unitSystem } = data;

  let weight = (values.weight as number) || 150;
  const activityLevel = (values.activityLevel as string) || "moderate";
  const climate = (values.climate as string) || "temperate";
  const specialCondition = (values.isPregnant as string) || "none";

  // Convert to lbs for calculation
  if (unitSystem === "metric") weight = weight * 2.20462;

  // Base: half body weight in ounces
  let waterOz = weight * 0.5;

  // Activity adjustment
  waterOz *= ACTIVITY_MULTIPLIERS[activityLevel] || 1.0;

  // Climate adjustment
  waterOz *= 1 + (CLIMATE_ADJUSTMENTS[climate] || 0);

  // Special conditions
  if (specialCondition === "pregnant") waterOz += 24;
  if (specialCondition === "breastfeeding") waterOz += 32;

  // Convert to other units
  const waterLiters = waterOz * 0.0295735;
  const waterCups = waterOz / 8;
  const glassesPerDay = Math.round(waterOz / 8);
  const perHour = waterOz / 16;

  const tableData = [
    { time: "7:00 AM - Wake up", amount: "16 oz (2 cups)", tip: "Start your day hydrated" },
    { time: "9:00 AM", amount: "8 oz (1 cup)", tip: "Mid-morning boost" },
    { time: "12:00 PM - Lunch", amount: "8 oz (1 cup)", tip: "Before eating" },
    { time: "2:00 PM", amount: "8 oz (1 cup)", tip: "Beat afternoon slump" },
    { time: "5:00 PM", amount: "8 oz (1 cup)", tip: "Pre-dinner" },
    { time: "7:00 PM - Dinner", amount: "8 oz (1 cup)", tip: "With your meal" },
    { time: "9:00 PM", amount: "8 oz (1 cup)", tip: "Evening (not too late)" },
  ];

  return {
    values: { dailyWater: waterOz, dailyOz: waterOz, dailyLiters: waterLiters, dailyCups: waterCups, glassesPerDay, perHour },
    formatted: {
      dailyWater: unitSystem === "metric" ? `${waterLiters.toFixed(1)} liters` : `${Math.round(waterOz)} oz`,
      dailyOz: Math.round(waterOz).toString(),
      dailyLiters: waterLiters.toFixed(1),
      dailyCups: waterCups.toFixed(1),
      glassesPerDay: glassesPerDay.toString(),
      perHour: perHour.toFixed(1),
    },
    summary: `Daily Target: ${Math.round(waterOz)} oz (${waterLiters.toFixed(1)} L) | ${glassesPerDay} glasses`,
    isValid: weight > 0,
    metadata: { tableData },
  };
}

export default waterIntakeCalculatorConfig;
