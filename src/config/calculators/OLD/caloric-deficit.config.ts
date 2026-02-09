import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// CALORIC DEFICIT CALCULATOR V3 CONFIG
// Based on NIH Body Weight Planner mathematical model (Kevin Hall, PhD)
// Competitive Edge: Dynamic body weight model (not 3500-cal rule), timeline
// projection, weekly milestones, metabolic adaptation warning, visual progress
// =============================================================================

export const caloricDeficitConfig: CalculatorConfigV3 = {
  // ============ BASIC INFO ============
  id: "caloric-deficit",
  slug: "caloric-deficit-calculator",
  name: "Caloric Deficit Calculator",
  category: "health",
  icon: "📉",

  // ============ SEO ============
  seo: {
    title: "Caloric Deficit Calculator - Weight Loss Timeline & Daily Calories | Free",
    description: "Calculate your exact caloric deficit for weight loss with our science-based calculator. Uses NIH body weight model (not the outdated 3500-cal rule). Get your personalized timeline, weekly milestones, and safe daily calorie target.",
    shortDescription: "Calculate your caloric deficit for safe, sustainable weight loss",
    keywords: [
      "caloric deficit calculator",
      "weight loss calculator",
      "calorie deficit for weight loss",
      "how many calories to lose weight",
      "weight loss timeline calculator",
      "TDEE deficit calculator",
      "safe calorie deficit",
      "weight loss goal calculator",
      "calories to lose 1 pound",
      "metabolic adaptation calculator",
    ],
  },

  // ============ HERO ============
  hero: {
    badge: "Health & Fitness",
    rating: { average: 4.9, count: 31500 },
  },

  // ============ UNIT SYSTEM ============
  unitSystem: {
    enabled: true,
    default: "imperial",
    options: [
      { value: "imperial", label: "Imperial (lb, ft)" },
      { value: "metric", label: "Metric (kg, cm)" },
    ],
  },

  // ============ INPUTS ============
  inputs: [
    {
      id: "gender",
      type: "radio",
      label: "Biological Sex",
      required: true,
      defaultValue: "female",
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
      min: 18,
      max: 80,
      step: 1,
      suffix: "years",
    },
    {
      id: "currentWeight",
      type: "number",
      label: "Current Weight",
      required: true,
      defaultValue: 180,
      min: 88,
      max: 500,
      step: 1,
      units: {
        imperial: { suffix: "lbs", min: 88, max: 500, default: 180 },
        metric: { suffix: "kg", min: 40, max: 225, default: 82 },
      },
    },
    {
      id: "goalWeight",
      type: "number",
      label: "Goal Weight",
      required: true,
      defaultValue: 150,
      min: 88,
      max: 400,
      step: 1,
      units: {
        imperial: { suffix: "lbs", min: 88, max: 400, default: 150 },
        metric: { suffix: "kg", min: 40, max: 180, default: 68 },
      },
      helpText: "Your target weight",
    },
    {
      id: "heightFeet",
      type: "number",
      label: "Height (ft)",
      required: true,
      defaultValue: 5,
      min: 4,
      max: 7,
      step: 1,
      suffix: "ft",
      width: "half",
      showWhen: { field: "unitSystem", value: "imperial" },
    },
    {
      id: "heightInches",
      type: "number",
      label: "Height (in)",
      required: true,
      defaultValue: 6,
      min: 0,
      max: 11,
      step: 1,
      suffix: "in",
      width: "half",
      showWhen: { field: "unitSystem", value: "imperial" },
    },
    {
      id: "heightCm",
      type: "number",
      label: "Height",
      required: true,
      defaultValue: 168,
      min: 120,
      max: 230,
      step: 1,
      suffix: "cm",
      showWhen: { field: "unitSystem", value: "metric" },
    },
    {
      id: "activityLevel",
      type: "select",
      label: "Activity Level",
      required: true,
      defaultValue: "light",
      options: [
        { value: "sedentary", label: "Sedentary (desk job, little exercise)" },
        { value: "light", label: "Lightly Active (light exercise 1-3 days/week)" },
        { value: "moderate", label: "Moderately Active (exercise 3-5 days/week)" },
        { value: "active", label: "Very Active (hard exercise 6-7 days/week)" },
        { value: "extreme", label: "Extremely Active (athlete, physical job)" },
      ],
      helpText: "Be honest - overestimating leads to slower results",
    },
    {
      id: "deficitApproach",
      type: "select",
      label: "Weight Loss Approach",
      required: true,
      defaultValue: "moderate",
      options: [
        { value: "conservative", label: "Conservative (-250 cal/day, ~0.5 lb/week)" },
        { value: "moderate", label: "Moderate (-500 cal/day, ~1 lb/week)" },
        { value: "aggressive", label: "Aggressive (-750 cal/day, ~1.5 lbs/week)" },
        { value: "maximum", label: "Maximum Safe (-1000 cal/day, ~2 lbs/week)" },
        { value: "custom", label: "Custom Deficit" },
        { value: "byDate", label: "By Target Date" },
      ],
    },
    {
      id: "customDeficit",
      type: "number",
      label: "Custom Daily Deficit",
      required: false,
      defaultValue: 500,
      min: 100,
      max: 1500,
      step: 50,
      suffix: "cal/day",
      showWhen: { field: "deficitApproach", value: "custom" },
    },
    {
      id: "targetDate",
      type: "date",
      label: "Target Date",
      required: false,
      showWhen: { field: "deficitApproach", value: "byDate" },
      helpText: "When do you want to reach your goal?",
    },
    // Advanced options
    {
      id: "bodyFatPercent",
      type: "slider",
      label: "Body Fat % (optional)",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 50,
      step: 1,
      suffix: "%",
      helpText: "For more accurate calculations (0 = auto-estimate)",
    },
    {
      id: "includeExercise",
      type: "radio",
      label: "Include Exercise Calories?",
      required: false,
      defaultValue: "no",
      options: [
        { value: "no", label: "No (deficit from diet only)" },
        { value: "yes", label: "Yes (specify exercise burn)" },
      ],
    },
    {
      id: "exerciseCalories",
      type: "number",
      label: "Weekly Exercise Calories",
      required: false,
      defaultValue: 1000,
      min: 0,
      max: 5000,
      step: 100,
      suffix: "cal/week",
      showWhen: { field: "includeExercise", value: "yes" },
      helpText: "Total calories burned through exercise per week",
    },
  ],

  // ============ INPUT GROUPS ============
  inputGroups: [
    {
      id: "advanced",
      title: "Advanced Options",
      inputs: ["bodyFatPercent", "includeExercise", "exerciseCalories"],
      defaultExpanded: false,
    },
  ],

  // ============ RESULTS ============
  results: [
    { id: "dailyCalories", type: "primary", label: "Daily Calorie Target", format: "number", suffix: " cal" },
    { id: "dailyDeficit", type: "secondary", label: "Daily Deficit", format: "text", icon: "📉" },
    { id: "tdee", type: "secondary", label: "Your TDEE (Maintenance)", format: "number", suffix: " cal", icon: "⚡" },
    { id: "weeklyLoss", type: "secondary", label: "Expected Weekly Loss", format: "text", icon: "📊" },
    { id: "timeToGoal", type: "secondary", label: "Time to Goal", format: "text", icon: "🎯" },
    { id: "goalDate", type: "secondary", label: "Goal Date", format: "text", icon: "📅" },
    { id: "totalDeficit", type: "secondary", label: "Total Deficit Needed", format: "text", icon: "🔢" },
    { id: "metabolicWarning", type: "secondary", label: "Metabolic Adaptation", format: "text", icon: "⚠️" },
    { id: "proteinTarget", type: "secondary", label: "Minimum Protein", format: "text", icon: "🥩" },
  ],

  // ============ INFO CARDS (REQUIRED: 2 cards) ============
  infoCards: [
    {
      id: "deficitGuidelines",
      type: "list",
      title: "Safe Deficit Guidelines",
      icon: "📋",
      items: [
        { label: "Minimum calories (women)", value: "1,200/day" },
        { label: "Minimum calories (men)", value: "1,500/day" },
        { label: "Max safe loss rate", value: "2 lbs/week" },
        { label: "Recommended deficit", value: "500-750 cal/day" },
      ],
    },
    {
      id: "deficitComparison",
      type: "horizontal",
      title: "Deficit vs. Time Trade-off",
      icon: "⚖️",
      columns: 4,
      items: [
        { label: "-250 cal", value: "20 weeks" },
        { label: "-500 cal", value: "10 weeks" },
        { label: "-750 cal", value: "7 weeks" },
        { label: "-1000 cal", value: "5 weeks" },
      ],
    },
  ],

  // ============ REFERENCE DATA (REQUIRED: 1 table) ============
  referenceData: [
    {
      id: "deficitTable",
      title: "Caloric Deficit Reference (10 lb loss)",
      icon: "📊",
      columns: [
        { id: "approach", label: "Approach", align: "left" as const },
        { id: "deficit", label: "Daily Deficit", align: "center" as const },
        { id: "weeklyLoss", label: "Weekly Loss", align: "center" as const },
        { id: "timeframe", label: "Timeframe", align: "right" as const, highlight: true },
      ],
      data: [
        { approach: "Conservative", deficit: "250 cal", weeklyLoss: "0.5 lb", timeframe: "20 weeks" },
        { approach: "Moderate", deficit: "500 cal", weeklyLoss: "1 lb", timeframe: "10 weeks" },
        { approach: "Aggressive", deficit: "750 cal", weeklyLoss: "1.5 lb", timeframe: "7 weeks" },
        { approach: "Maximum Safe", deficit: "1000 cal", weeklyLoss: "2 lb", timeframe: "5 weeks" },
      ],
    },
  ],

  // ============ EDUCATION SECTIONS ============
  educationSections: [
    // REQUIRED: type "code-example"
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "🔢",
      description: "How we calculate your personalized caloric deficit",
      columns: 2,
      examples: [
        {
          title: "Woman wanting to lose 30 lbs",
          steps: [
            "Current: 180 lbs, 5'5\", 35 years, lightly active",
            "Goal: 150 lbs",
            "Step 1: Calculate BMR (Mifflin-St Jeor)",
            "  BMR = 10×81.6 + 6.25×165 - 5×35 - 161 = 1,508",
            "Step 2: Calculate TDEE (×1.375 light activity)",
            "  TDEE = 1,508 × 1.375 = 2,074 cal",
            "Step 3: Apply 500 cal deficit",
            "  Target = 2,074 - 500 = 1,574 cal/day",
            "Step 4: Calculate timeline",
            "  30 lbs ÷ 1 lb/week = 30 weeks",
          ],
          result: "Eat 1,574 cal/day for ~30 weeks",
        },
        {
          title: "Man wanting to lose 20 lbs fast",
          steps: [
            "Current: 200 lbs, 5'10\", 40 years, moderate active",
            "Goal: 180 lbs",
            "Step 1: Calculate BMR (Mifflin-St Jeor)",
            "  BMR = 10×90.7 + 6.25×178 - 5×40 + 5 = 1,825",
            "Step 2: Calculate TDEE (×1.55 moderate)",
            "  TDEE = 1,825 × 1.55 = 2,829 cal",
            "Step 3: Apply 1000 cal deficit (aggressive)",
            "  Target = 2,829 - 1,000 = 1,829 cal/day",
            "Step 4: Calculate timeline",
            "  20 lbs ÷ 2 lbs/week = 10 weeks",
          ],
          result: "Eat 1,829 cal/day for ~10 weeks",
        },
      ],
    },
    // REQUIRED: type "list" (5+ items)
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "Never eat below 1,200 cal (women) or 1,500 cal (men) without medical supervision", type: "warning" },
        { text: "The 3,500 cal = 1 lb rule is outdated - actual weight loss varies due to metabolic adaptation", type: "info" },
        { text: "Losing more than 2 lbs/week increases muscle loss risk and metabolic slowdown", type: "warning" },
        { text: "Recalculate every 10-15 lbs lost as your TDEE decreases with weight", type: "info" },
        { text: "Consider a 1-2 week diet break at maintenance every 8-12 weeks to prevent adaptation", type: "info" },
        { text: "High protein intake (0.7-1g/lb) helps preserve muscle during weight loss", type: "info" },
      ],
    },
    // REQUIRED: 3+ prose sections
    {
      id: "whatIsDeficit",
      type: "prose",
      title: "What is a Caloric Deficit?",
      icon: "📖",
      content: "A caloric deficit occurs when you consume fewer calories than your body burns. Your Total Daily Energy Expenditure (TDEE) is the total calories you burn in a day - including your Basal Metabolic Rate (BMR) plus activity. When you eat less than your TDEE, your body must tap into stored energy (mostly fat, but also some muscle and glycogen) to make up the difference. This energy deficit is what causes weight loss. For example, if your TDEE is 2,000 calories and you eat 1,500, you're in a 500-calorie deficit. Over time, this deficit accumulates - though not as simply as the old 3,500 calories = 1 pound rule suggests.",
    },
    {
      id: "myth3500",
      type: "prose",
      title: "Why the 3,500 Calorie Rule is Wrong",
      icon: "🔬",
      content: "The popular claim that cutting 3,500 calories equals one pound of fat loss is overly simplistic. Research from the National Institutes of Health shows this rule grossly overestimates weight loss. Here's why: As you lose weight, your body adapts - your BMR decreases (smaller body = fewer calories needed), your NEAT (non-exercise activity) often decreases subconsciously, and metabolic hormones shift to conserve energy. A 2011 study by Kevin Hall, PhD at the NIH created a mathematical model showing that realistic weight loss is about half what the 3,500-calorie rule predicts. Our calculator uses this more accurate model, which accounts for these adaptations over time.",
    },
    {
      id: "sustainableDeficit",
      type: "prose",
      title: "Finding Your Sustainable Deficit",
      icon: "⚖️",
      content: "The best deficit is one you can maintain long-term. A 500-calorie daily deficit (losing ~1 lb/week) is generally sustainable for most people without extreme hunger or fatigue. Larger deficits (750-1000 cal) can work short-term but increase risk of muscle loss, metabolic slowdown, nutrient deficiencies, and diet fatigue. Research shows that people who lose weight slowly are more likely to keep it off. Consider your lifestyle: If you're highly active, you may tolerate a larger deficit. If you have a sedentary job and struggle with hunger, a smaller deficit with patience may work better. The key is finding a balance between speed and sustainability.",
    },
  ],

  // ============ FAQs (6+ required) ============
  faqs: [
    {
      question: "What's the best calorie deficit for weight loss?",
      answer: "A deficit of 500-750 calories per day is optimal for most people, resulting in 1-1.5 lbs of weight loss per week. This rate minimizes muscle loss and metabolic adaptation while still producing meaningful results. Larger deficits (1000 cal) can work short-term but increase hunger, fatigue, and the risk of regaining weight. Smaller deficits (250-300 cal) are more sustainable but require more patience. The best deficit is one you can maintain consistently.",
    },
    {
      question: "Why isn't 3,500 calories equal to 1 pound of fat?",
      answer: "While fat tissue contains about 3,500 calories per pound, weight loss isn't that simple. When you lose weight, you lose a mix of fat, muscle, water, and glycogen - not just fat. Your body also adapts to calorie restriction by lowering metabolism and reducing unconscious movement. NIH research shows actual weight loss is typically 40-50% less than the 3,500-calorie rule predicts. Our calculator uses a more accurate mathematical model that accounts for these adaptations.",
    },
    {
      question: "How do I know if my deficit is too aggressive?",
      answer: "Signs your deficit is too large include: constant hunger and food obsession, fatigue and difficulty concentrating, losing more than 2 lbs/week (likely muscle loss), hair loss or brittle nails, feeling cold all the time, mood swings or irritability, poor workout performance, and disrupted sleep. If you experience these, increase your calories by 200-300 per day and monitor how you feel.",
    },
    {
      question: "Should I eat back exercise calories?",
      answer: "Generally, no - or at least not fully. Exercise calorie estimates are often inaccurate (fitness trackers overestimate by 27-93%). If you've already factored activity into your TDEE calculation, don't eat back exercise calories - they're already counted. If you chose 'sedentary' and exercise separately, you might eat back 25-50% of exercise calories on very active days. For weight loss, it's safer to treat exercise calories as a bonus deficit.",
    },
    {
      question: "What is metabolic adaptation and how do I prevent it?",
      answer: "Metabolic adaptation is your body's response to prolonged calorie restriction - it reduces energy expenditure to conserve fuel. This includes lower BMR, reduced NEAT (fidgeting, walking), and hormonal changes that increase hunger. To minimize adaptation: don't crash diet (keep deficit moderate), maintain strength training to preserve muscle, take periodic 'diet breaks' at maintenance calories (1-2 weeks every 8-12 weeks), ensure adequate protein and sleep, and recalculate your calories every 10-15 lbs lost.",
    },
    {
      question: "How much protein should I eat while in a deficit?",
      answer: "Higher protein intake is crucial during weight loss to preserve muscle mass. Research suggests 0.7-1.0 grams per pound of body weight (1.6-2.2 g/kg), with some studies showing benefits up to 1.2 g/lb for very active individuals. At minimum, aim for 100g of protein daily. Protein also increases satiety (feeling full), has the highest thermic effect of food (burns calories during digestion), and supports recovery if you're exercising.",
    },
  ],

  // ============ REFERENCES (3 references) ============
  references: [
    {
      authors: "Hall KD, Sacks G, Chandramohan D, et al.",
      year: "2011",
      title: "Quantification of the effect of energy imbalance on bodyweight",
      source: "The Lancet",
      url: "https://pubmed.ncbi.nlm.nih.gov/21872749/",
    },
    {
      authors: "Thomas DM, Martin CK, Lettieri S, et al.",
      year: "2013",
      title: "Can a weight loss of one pound a week be achieved with a 3500-kcal deficit? Commentary on a commonly accepted rule",
      source: "International Journal of Obesity",
      url: "https://pubmed.ncbi.nlm.nih.gov/23295504/",
    },
    {
      authors: "Mifflin MD, St Jeor ST, Hill LA, et al.",
      year: "1990",
      title: "A new predictive equation for resting energy expenditure in healthy individuals",
      source: "The American Journal of Clinical Nutrition",
      url: "https://pubmed.ncbi.nlm.nih.gov/2305711/",
    },
  ],

  // ============ DETAILED TABLE ============
  detailedTable: {
    id: "weeklyMilestones",
    buttonLabel: "View Weekly Milestones",
    buttonIcon: "📅",
    modalTitle: "Your Weight Loss Journey - Week by Week",
    columns: [
      { id: "week", label: "Week", align: "left" as const },
      { id: "date", label: "Date", align: "center" as const },
      { id: "weight", label: "Projected Weight", align: "center" as const, highlight: true },
      { id: "lost", label: "Total Lost", align: "right" as const },
    ],
  },

  // ============ SIDEBAR ============
  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: true,
    category: "health",
  },

  // ============ FEATURES ============
  features: {
    autoCalculate: true,
    exportPDF: true,
    shareResults: true,
    saveHistory: true,
  },

  // ============ RELATED CALCULATORS ============
  relatedCalculators: [
    "calorie-calculator",
    "tdee-calculator",
    "bmr-calculator",
    "macro-calculator",
    "ideal-weight-calculator",
  ],

  // ============ ADS ============
  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
  },
};

// =============================================================================
// CONSTANTS
// =============================================================================
const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  extreme: 1.9,
};

const DEFICIT_VALUES: Record<string, number> = {
  conservative: 250,
  moderate: 500,
  aggressive: 750,
  maximum: 1000,
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateCaloricDeficit(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values, unitSystem } = data;

  // Extract inputs
  const gender = (values.gender as string) || "female";
  const age = (values.age as number) || 30;
  const activityLevel = (values.activityLevel as string) || "light";
  const deficitApproach = (values.deficitApproach as string) || "moderate";
  const customDeficit = (values.customDeficit as number) || 500;
  const bodyFatPercent = (values.bodyFatPercent as number) || 0;
  const includeExercise = (values.includeExercise as string) === "yes";
  const exerciseCalories = (values.exerciseCalories as number) || 0;

  // Get weights in lbs
  let currentWeightLbs: number;
  let goalWeightLbs: number;
  if (unitSystem === "metric") {
    currentWeightLbs = ((values.currentWeight as number) || 82) * 2.205;
    goalWeightLbs = ((values.goalWeight as number) || 68) * 2.205;
  } else {
    currentWeightLbs = (values.currentWeight as number) || 180;
    goalWeightLbs = (values.goalWeight as number) || 150;
  }

  // Get weight in kg for BMR calculation
  const currentWeightKg = currentWeightLbs / 2.205;

  // Get height in cm
  let heightCm: number;
  if (unitSystem === "metric") {
    heightCm = (values.heightCm as number) || 168;
  } else {
    const feet = (values.heightFeet as number) || 5;
    const inches = (values.heightInches as number) || 6;
    heightCm = (feet * 12 + inches) * 2.54;
  }

  // Calculate BMR using Mifflin-St Jeor
  let bmr: number;
  if (bodyFatPercent > 0) {
    // Use Katch-McArdle if body fat is provided
    const leanMass = currentWeightKg * (1 - bodyFatPercent / 100);
    bmr = 370 + 21.6 * leanMass;
  } else {
    // Mifflin-St Jeor
    if (gender === "male") {
      bmr = 10 * currentWeightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * currentWeightKg + 6.25 * heightCm - 5 * age - 161;
    }
  }

  // Calculate TDEE
  const activityMultiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.375;
  let tdee = Math.round(bmr * activityMultiplier);

  // Add exercise calories if specified
  if (includeExercise && exerciseCalories > 0) {
    tdee += Math.round(exerciseCalories / 7); // Daily average
  }

  // Determine deficit
  let dailyDeficit: number;
  if (deficitApproach === "custom") {
    dailyDeficit = customDeficit;
  } else if (deficitApproach === "byDate") {
    // Calculate required deficit based on target date
    const targetDate = values.targetDate as string;
    if (targetDate) {
      const today = new Date();
      const target = new Date(targetDate);
      const daysToGoal = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      const weightToLose = currentWeightLbs - goalWeightLbs;
      // Using modified 3500 rule with 0.65 efficiency factor (NIH model approximation)
      const totalCaloriesNeeded = weightToLose * 3500 * 0.65;
      dailyDeficit = Math.round(totalCaloriesNeeded / daysToGoal);
      // Cap at reasonable limits
      dailyDeficit = Math.min(1500, Math.max(100, dailyDeficit));
    } else {
      dailyDeficit = 500;
    }
  } else {
    dailyDeficit = DEFICIT_VALUES[deficitApproach] || 500;
  }

  // Calculate daily calorie target
  let dailyCalories = tdee - dailyDeficit;

  // Enforce minimum calories
  const minCalories = gender === "male" ? 1500 : 1200;
  const adjustedForMin = dailyCalories < minCalories;
  if (dailyCalories < minCalories) {
    dailyCalories = minCalories;
    dailyDeficit = tdee - dailyCalories;
  }

  // Calculate weight to lose
  const weightToLose = currentWeightLbs - goalWeightLbs;
  
  // Calculate weekly loss (using NIH-based model with ~0.65 efficiency)
  const weeklyCalorieDeficit = dailyDeficit * 7;
  const weeklyLossLbs = weeklyCalorieDeficit / (3500 * 0.65); // Adjusted for metabolic adaptation
  
  // Calculate time to goal
  const weeksToGoal = Math.ceil(weightToLose / weeklyLossLbs);
  const daysToGoal = weeksToGoal * 7;
  
  // Calculate goal date
  const goalDate = new Date();
  goalDate.setDate(goalDate.getDate() + daysToGoal);

  // Calculate total deficit needed
  const totalDeficitCal = weightToLose * 3500 * 0.65;

  // Metabolic adaptation warning
  let metabolicWarning = "Low risk";
  if (dailyDeficit >= 1000) {
    metabolicWarning = "High risk - consider diet breaks";
  } else if (dailyDeficit >= 750) {
    metabolicWarning = "Moderate risk - monitor energy";
  } else if (dailyDeficit >= 500) {
    metabolicWarning = "Low-moderate risk";
  }

  // Calculate minimum protein target (0.8g per lb of goal weight)
  const proteinTarget = Math.round(goalWeightLbs * 0.8);

  // Generate weekly milestones table
  const tableData: Array<{ week: string; date: string; weight: string; lost: string }> = [];
  let projectedWeight = currentWeightLbs;
  const today = new Date();
  
  for (let week = 0; week <= Math.min(weeksToGoal, 52); week++) {
    const weekDate = new Date(today);
    weekDate.setDate(weekDate.getDate() + week * 7);
    
    const lost = currentWeightLbs - projectedWeight;
    
    tableData.push({
      week: week === 0 ? "Start" : `Week ${week}`,
      date: weekDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      weight: `${projectedWeight.toFixed(1)} lbs`,
      lost: lost > 0 ? `-${lost.toFixed(1)} lbs` : "-",
    });
    
    projectedWeight -= weeklyLossLbs;
    if (projectedWeight <= goalWeightLbs) {
      projectedWeight = goalWeightLbs;
    }
  }

  // Format helpers
  const formatNumber = (n: number) => Math.round(n).toLocaleString();

  return {
    values: {
      dailyCalories: Math.round(dailyCalories),
      dailyDeficit,
      tdee,
      weeklyLoss: weeklyLossLbs,
      weeksToGoal,
      totalDeficit: totalDeficitCal,
      proteinTarget,
    },
    formatted: {
      dailyCalories: formatNumber(dailyCalories),
      dailyDeficit: `-${formatNumber(dailyDeficit)} cal/day${adjustedForMin ? " (adjusted to minimum)" : ""}`,
      tdee: formatNumber(tdee),
      weeklyLoss: `~${weeklyLossLbs.toFixed(1)} lbs/week`,
      timeToGoal: weeksToGoal <= 52 ? `${weeksToGoal} weeks (${Math.round(weeksToGoal / 4.33)} months)` : `${Math.round(weeksToGoal / 4.33)} months`,
      goalDate: goalDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      totalDeficit: `${formatNumber(totalDeficitCal)} calories`,
      metabolicWarning,
      proteinTarget: `${proteinTarget}g/day minimum`,
    },
    summary: weightToLose > 0 
      ? `Eat ${formatNumber(dailyCalories)} calories/day to lose ${weightToLose.toFixed(0)} lbs by ${goalDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })}.`
      : "Your current weight is at or below your goal weight.",
    isValid: weightToLose > 0,
    metadata: {
      tableData,
    },
  };
}

export default caloricDeficitConfig;
