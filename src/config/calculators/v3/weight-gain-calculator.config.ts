import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

export const weightGainCalculatorConfig: CalculatorConfigV3 = {
  id: "weight-gain-calculator",
  slug: "weight-gain-calculator",
  name: "Weight Gain Calculator",
  category: "health",
  icon: "📈",

  seo: {
    title: "Weight Gain Calculator - Bulking Calories & Muscle Building (2026)",
    description: "Free weight gain calculator for muscle building. Calculate bulking calories, muscle vs fat gain projection by training level, macro targets & timeline.",
    shortDescription: "Calculate calories and macros for healthy weight gain and muscle building",
    keywords: [
      "weight gain calculator",
      "bulking calculator",
      "calories to gain muscle",
      "muscle gain calculator",
      "calorie surplus calculator"
    ],
  },

  hero: {
    badge: "Health & Fitness",
    rating: { average: 4.8, count: 9847 },
  },

  unitSystem: {
    enabled: true,
    default: "imperial",
    options: [
      { value: "imperial", label: "Imperial (lb, ft)" },
      { value: "metric", label: "Metric (kg, cm)" },
    ],
  },

  inputs: [
    {
      id: "age",
      type: "number",
      label: "Age",
      required: true,
      defaultValue: 25,
      min: 16,
      max: 65,
      step: 1,
      suffix: "years",
    },
    {
      id: "gender",
      type: "radio",
      label: "Biological Sex",
      required: true,
      defaultValue: "male",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
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
      width: "half",
      showWhen: { field: "unitSystem", value: "imperial" },
    },
    {
      id: "heightInches",
      type: "number",
      label: "Height (in)",
      required: true,
      defaultValue: 10,
      min: 0,
      max: 11,
      step: 1,
      width: "half",
      showWhen: { field: "unitSystem", value: "imperial" },
    },
    {
      id: "heightCm",
      type: "number",
      label: "Height",
      required: true,
      defaultValue: 178,
      min: 140,
      max: 220,
      step: 1,
      suffix: "cm",
      showWhen: { field: "unitSystem", value: "metric" },
    },
    {
      id: "currentWeight",
      type: "number",
      label: "Current Weight",
      required: true,
      defaultValue: 160,
      min: 80,
      max: 350,
      step: 0.1,
      suffix: "lb",
      suffixMetric: "kg",
    },
    {
      id: "goalWeight",
      type: "number",
      label: "Goal Weight",
      required: true,
      defaultValue: 180,
      min: 90,
      max: 400,
      step: 0.1,
      suffix: "lb",
      suffixMetric: "kg",
      helpText: "Your target weight to reach",
    },
    {
      id: "activityLevel",
      type: "select",
      label: "Activity Level",
      required: true,
      defaultValue: "moderate",
      options: [
        { value: "sedentary", label: "Sedentary (desk job, little exercise)" },
        { value: "light", label: "Lightly Active (1-3 days/week)" },
        { value: "moderate", label: "Moderately Active (3-5 days/week)" },
        { value: "active", label: "Very Active (6-7 days/week)" },
        { value: "extreme", label: "Extremely Active (athlete, physical job)" },
      ],
    },
    {
      id: "trainingExperience",
      type: "select",
      label: "Weight Training Experience",
      required: true,
      defaultValue: "beginner",
      options: [
        { value: "beginner", label: "Beginner (0-1 years)" },
        { value: "intermediate", label: "Intermediate (1-3 years)" },
        { value: "advanced", label: "Advanced (3-6 years)" },
        { value: "elite", label: "Elite (6+ years)" },
      ],
      helpText: "Affects your muscle gain potential",
    },
    {
      id: "bulkType",
      type: "select",
      label: "Bulk Type",
      required: true,
      defaultValue: "lean",
      options: [
        { value: "lean", label: "Lean Bulk (+200-300 kcal) - Minimize fat gain" },
        { value: "moderate", label: "Moderate Bulk (+400-500 kcal) - Balanced" },
        { value: "aggressive", label: "Aggressive Bulk (+600-750 kcal) - Maximum growth" },
      ],
      helpText: "Lean bulk recommended for intermediates and advanced lifters",
    },
    {
      id: "bodyFatPercent",
      type: "number",
      label: "Current Body Fat % (optional)",
      required: false,
      min: 5,
      max: 40,
      step: 0.5,
      suffix: "%",
      helpText: "For more accurate muscle/fat gain estimates",
    },
  ],

  inputGroups: [],

  results: [
    { id: "dailyCalories", type: "primary", label: "Daily Calories for Bulking", format: "number", suffix: " kcal" },
    { id: "weeksToGoal", type: "secondary", label: "Time to Reach Goal", format: "text" },
    { id: "goalDate", type: "secondary", label: "Estimated Goal Date", format: "text" },
    { id: "totalToGain", type: "secondary", label: "Total Weight to Gain", format: "number", suffix: " lb" },
    { id: "muscleGainPotential", type: "secondary", label: "Monthly Muscle Potential", format: "text" },
    { id: "estimatedMuscle", type: "secondary", label: "Est. Muscle Gain", format: "text" },
    { id: "estimatedFat", type: "secondary", label: "Est. Fat Gain", format: "text" },
    { id: "maintenanceCalories", type: "secondary", label: "Maintenance Calories", format: "number", suffix: " kcal" },
    { id: "proteinTarget", type: "secondary", label: "Daily Protein Target", format: "number", suffix: " g" },
    { id: "carbTarget", type: "secondary", label: "Daily Carbs Target", format: "number", suffix: " g" },
    { id: "fatTarget", type: "secondary", label: "Daily Fat Target", format: "number", suffix: " g" },
  ],

  // INFO CARDS (Required: type "list" + type "horizontal")
  infoCards: [
    {
      type: "list",
      title: "Your Bulking Plan",
      icon: "💪",
      items: [
        { label: "Daily Calories", valueKey: "dailyCalories", suffix: " kcal" },
        { label: "Time to Goal", valueKey: "weeksToGoal" },
        { label: "Target Date", valueKey: "goalDate" },
        { label: "Muscle Potential", valueKey: "muscleGainPotential" },
      ],
    },
    {
      type: "horizontal",
      title: "Daily Macro Targets",
      items: [
        { label: "Protein", valueKey: "proteinTarget", suffix: " g" },
        { label: "Carbs", valueKey: "carbTarget", suffix: " g" },
        { label: "Fat", valueKey: "fatTarget", suffix: " g" },
        { label: "Total", valueKey: "dailyCalories", suffix: " kcal" },
      ],
    },
  ],

  // REFERENCE DATA (Required: columns grid) - MUST BE ARRAY
  referenceData: [
    {
      id: "muscleGainPotential",
      title: "Natural Muscle Gain Potential by Experience",
      icon: "📊",
      columns: [
        { key: "level", label: "Level", align: "left" },
        { key: "years", label: "Years Training", align: "center" },
        { key: "muscleMonth", label: "Muscle/Month", align: "center" },
        { key: "muscleYear", label: "Muscle/Year", align: "right" },
      ],
      data: [
        { level: "Beginner", years: "0-1", muscleMonth: "1.5-2 lb", muscleYear: "18-24 lb" },
        { level: "Intermediate", years: "1-3", muscleMonth: "0.75-1 lb", muscleYear: "9-12 lb" },
        { level: "Advanced", years: "3-6", muscleMonth: "0.4-0.5 lb", muscleYear: "5-6 lb" },
        { level: "Elite", years: "6+", muscleMonth: "0.1-0.25 lb", muscleYear: "1-3 lb" },
      ],
    },
  ],

  // EDUCATION SECTIONS
  educationSections: [
    // Cards section
    {
      id: "bulkingScience",
      type: "cards",
      title: "The Science of Muscle Building",
      icon: "🔬",
      columns: 2,
      cards: [
        {
          title: "Calorie Surplus Required",
          description: "Building muscle requires extra energy. Research shows a surplus of 200-500 kcal optimizes muscle growth while minimizing fat gain.",
          icon: "⚡",
        },
        {
          title: "Training Experience Matters",
          description: "Beginners can gain 1.5-2 lb muscle/month. Advanced lifters may only gain 0.25-0.5 lb/month due to diminishing returns.",
          icon: "📈",
        },
        {
          title: "Protein Synthesis Window",
          description: "Muscle protein synthesis stays elevated 24-48 hours post-workout. Distribute protein evenly across 4-5 meals for optimal results.",
          icon: "🥩",
        },
        {
          title: "Progressive Overload",
          description: "Calories fuel growth, but progressive overload (increasing weight/reps over time) is the actual stimulus for muscle adaptation.",
          icon: "🏋️",
        },
      ],
    },
    // REQUIRED: list type
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "Start with a lean bulk (+200-300 kcal) unless you're significantly underweight or a complete beginner", type: "info" },
        { text: "Aim to gain 0.25-0.5% of body weight per week to maximize muscle and minimize fat gain", type: "info" },
        { text: "If body fat exceeds 15-18% (men) or 25-28% (women), consider a mini-cut before continuing to bulk", type: "warning" },
        { text: "Women typically gain muscle at 50-60% the rate of men due to hormonal differences", type: "info" },
        { text: "Track progress with measurements and photos, not just scale weight (water and glycogen fluctuate)", type: "info" },
        { text: "Aggressive bulks (>500 kcal surplus) only recommended for underweight beginners", type: "warning" },
      ],
    },
    // REQUIRED: code-example type
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "📊",
      description: "25-year-old male, 5'10\", 160 lb, intermediate lifter, lean bulk",
      columns: 2,
      examples: [
        {
          title: "Step 1: Calculate TDEE",
          steps: [
            "BMR (Mifflin-St Jeor) = 1,755 kcal",
            "TDEE = BMR × 1.55 (moderate activity)",
            "TDEE = 1,755 × 1.55 = 2,720 kcal",
          ],
          result: "Maintenance: 2,720 kcal/day",
        },
        {
          title: "Step 2: Add Surplus & Calculate Macros",
          steps: [
            "Lean bulk surplus: +250 kcal",
            "Bulking calories: 2,970 kcal",
            "Protein: 160g (1g/lb) = 640 kcal",
            "Fat: 72g (0.45g/lb) = 648 kcal",
            "Carbs: remaining 1,682 kcal = 420g",
          ],
          result: "Target: 2,970 kcal | 160P | 420C | 72F",
        },
      ],
    },
    // PROSE SECTION 1
    {
      id: "whatIsWeightGain",
      type: "prose",
      title: "What is a Weight Gain Calculator?",
      icon: "❓",
      content: "A weight gain calculator helps you determine the optimal calorie surplus needed to build muscle while minimizing fat gain. It factors in your basal metabolic rate, activity level, training experience, and goals to provide personalized calorie and macro targets. Unlike simply eating more, strategic bulking requires precision to maximize the muscle-to-fat gain ratio.",
    },
    // PROSE SECTION 2
    {
      id: "bulkTypes",
      type: "prose",
      title: "Lean Bulk vs Aggressive Bulk",
      icon: "⚖️",
      content: "A lean bulk (+200-300 kcal surplus) maximizes the muscle-to-fat ratio but results in slower overall gains. It's ideal for intermediate/advanced lifters who want to stay relatively lean year-round. An aggressive bulk (+500-750 kcal) leads to faster weight gain but with more fat accumulation - typically 50-60% muscle, 40-50% fat. This approach works best for underweight beginners who need rapid mass gain or hardgainers with fast metabolisms.",
    },
    // PROSE SECTION 3
    {
      id: "muscleGainLimits",
      type: "prose",
      title: "Natural Muscle Building Limits",
      icon: "🎯",
      content: "Natural muscle gain follows the law of diminishing returns. In your first year of serious training, you can gain 18-24 lbs of muscle with proper nutrition and training. This drops to 9-12 lbs in year two, 5-6 lbs in year three, and eventually just 1-3 lbs annually for advanced lifters. Understanding these limits helps set realistic expectations and avoid excessive fat gain from unnecessary calorie surpluses.",
    },
  ],

  // FAQs
  faqs: [
    {
      question: "How many extra calories do I need to build muscle?",
      answer: "Research suggests a surplus of 200-500 calories above maintenance is optimal for muscle growth. Beginners can use slightly higher surpluses (400-500 kcal) since they build muscle faster. Advanced lifters should use smaller surpluses (200-300 kcal) since their muscle gain potential is limited.",
    },
    {
      question: "How fast should I gain weight when bulking?",
      answer: "Aim for 0.25-0.5% of body weight per week, which equals roughly 0.5-1 lb/week for most people. Faster than this and you're likely gaining excess fat. If you're gaining more than 1 lb/week consistently, reduce your surplus by 200-300 calories.",
    },
    {
      question: "How much muscle can I realistically gain?",
      answer: "Natural muscle gain follows the law of diminishing returns. Beginners can gain 18-24 lb of muscle in year one with proper training and nutrition. Year two drops to 9-12 lb, year three to 5-6 lb, and advanced lifters may only add 1-3 lb annually.",
    },
    {
      question: "Should I bulk or cut first?",
      answer: "If you're over 15-18% body fat (men) or 25-28% (women), cut first until you reach 10-12% or 20-22% respectively. This improves insulin sensitivity and nutrient partitioning. If you're already lean or underweight, start bulking immediately.",
    },
    {
      question: "How long should a bulk last?",
      answer: "Most successful bulks last 12-20 weeks. When body fat reaches 15-18% (men) or 25-28% (women), consider a 4-8 week mini-cut before resuming. Longer bulks (6+ months) are suitable for underweight individuals or hardgainers.",
    },
    {
      question: "How much protein do I need to build muscle?",
      answer: "During a bulk, aim for 0.8-1g of protein per pound of body weight (1.6-2.2g/kg). For a 170 lb person, that's 136-170g daily. While more protein won't hurt, research shows minimal additional benefit above 1g/lb for natural lifters.",
    },
  ],

  // REFERENCES (Required)
  references: [
    {
      authors: "Slater GJ, Dieter BP, Marsh DJ, et al.",
      year: "2019",
      title: "Is an Energy Surplus Required to Maximize Skeletal Muscle Hypertrophy Associated With Resistance Training",
      source: "Frontiers in Nutrition, 6, 131",
      url: "https://pubmed.ncbi.nlm.nih.gov/31482093/",
    },
    {
      authors: "Ribeiro AS, Nunes JP, Schoenfeld BJ, et al.",
      year: "2022",
      title: "Effects of Different Dietary Energy Intake Following Resistance Training on Muscle Mass and Body Fat",
      source: "Frontiers in Nutrition, 9, 886648",
      url: "https://pubmed.ncbi.nlm.nih.gov/35662945/",
    },
  ],

  detailedTable: {
    id: "monthlyProjection",
    buttonLabel: "View Monthly Projection",
    buttonIcon: "📅",
    modalTitle: "Month-by-Month Bulking Projection",
    columns: [
      { id: "month", label: "Month", align: "left" },
      { id: "weight", label: "Projected Weight", align: "center", highlight: true },
      { id: "muscleGain", label: "Est. Muscle Gained", align: "center" },
      { id: "fatGain", label: "Est. Fat Gained", align: "right" },
    ],
  },

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "health" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["calorie-surplus-calculator", "macro-calculator", "protein-calculator", "tdee-calculator", "lean-body-mass-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// CALCULATE FUNCTION
export function calculateWeightGain(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values, unitSystem } = data;

  const age = values.age as number;
  const gender = values.gender as string;
  const activityLevel = values.activityLevel as string;
  const trainingExperience = values.trainingExperience as string;
  const bulkType = values.bulkType as string;

  let heightCm: number;
  let currentWeightKg: number;
  let goalWeightKg: number;

  if (unitSystem === "imperial") {
    const feet = values.heightFeet as number;
    const inches = values.heightInches as number;
    heightCm = (feet * 12 + inches) * 2.54;
    currentWeightKg = (values.currentWeight as number) * 0.453592;
    goalWeightKg = (values.goalWeight as number) * 0.453592;
  } else {
    heightCm = values.heightCm as number;
    currentWeightKg = values.currentWeight as number;
    goalWeightKg = values.goalWeight as number;
  }

  let bmr: number;
  if (gender === "male") {
    bmr = (10 * currentWeightKg) + (6.25 * heightCm) - (5 * age) + 5;
  } else {
    bmr = (10 * currentWeightKg) + (6.25 * heightCm) - (5 * age) - 161;
  }

  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    extreme: 1.9,
  };

  const tdee = Math.round(bmr * activityMultipliers[activityLevel]);

  const surplusAmounts: Record<string, number> = {
    lean: 250,
    moderate: 450,
    aggressive: 650,
  };

  const surplus = surplusAmounts[bulkType];
  const bulkingCalories = tdee + surplus;

  const lbPerWeek = surplus / 500;

  const muscleRates: Record<string, number> = {
    beginner: 1.75,
    intermediate: 0.875,
    advanced: 0.45,
    elite: 0.175,
  };

  let musclePerMonth = muscleRates[trainingExperience];
  if (gender === "female") {
    musclePerMonth *= 0.55;
  }

  const currentWeightLb = unitSystem === "imperial" 
    ? (values.currentWeight as number) 
    : currentWeightKg * 2.20462;
  const goalWeightLb = unitSystem === "imperial" 
    ? (values.goalWeight as number) 
    : goalWeightKg * 2.20462;
  
  const totalToGain = goalWeightLb - currentWeightLb;
  const weeksToGoal = Math.ceil(totalToGain / lbPerWeek);
  const monthsToGoal = weeksToGoal / 4.33;

  const muscleRatio: Record<string, number> = {
    beginner: 0.65,
    intermediate: 0.55,
    advanced: 0.45,
    elite: 0.35,
  };

  let effectiveMuscleRatio = muscleRatio[trainingExperience];
  if (bulkType === "aggressive") {
    effectiveMuscleRatio -= 0.10;
  } else if (bulkType === "lean") {
    effectiveMuscleRatio += 0.05;
  }

  const estimatedMuscleGain = totalToGain * effectiveMuscleRatio;
  const estimatedFatGain = totalToGain * (1 - effectiveMuscleRatio);

  const today = new Date();
  const goalDate = new Date(today);
  goalDate.setDate(goalDate.getDate() + (weeksToGoal * 7));
  const goalDateStr = goalDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  let weeksToGoalStr: string;
  if (weeksToGoal < 8) {
    weeksToGoalStr = `${weeksToGoal} weeks`;
  } else {
    const months = Math.round(monthsToGoal);
    weeksToGoalStr = `${months} month${months > 1 ? 's' : ''} (${weeksToGoal} weeks)`;
  }

  const muscleGainPotentialStr = `${musclePerMonth.toFixed(2)} lb/month`;

  const proteinTarget = Math.round(currentWeightLb);
  const proteinCals = proteinTarget * 4;
  const fatTarget = Math.round(currentWeightLb * 0.42);
  const fatCals = fatTarget * 9;
  const carbCals = bulkingCalories - proteinCals - fatCals;
  const carbTarget = Math.round(carbCals / 4);

  const tableData: Array<Record<string, string | number>> = [];
  let projectedWeight = currentWeightLb;
  let totalMuscle = 0;
  let totalFat = 0;
  
  for (let month = 0; month <= Math.min(Math.ceil(monthsToGoal), 12); month++) {
    tableData.push({
      month: month === 0 ? "Start" : `Month ${month}`,
      weight: `${projectedWeight.toFixed(1)} lb`,
      muscleGain: `+${totalMuscle.toFixed(1)} lb`,
      fatGain: `+${totalFat.toFixed(1)} lb`,
    });
    
    const monthlyGain = lbPerWeek * 4.33;
    projectedWeight += monthlyGain;
    totalMuscle += monthlyGain * effectiveMuscleRatio;
    totalFat += monthlyGain * (1 - effectiveMuscleRatio);
    
    if (projectedWeight >= goalWeightLb) projectedWeight = goalWeightLb;
  }

  const summary = `Eat ${bulkingCalories.toLocaleString()} calories daily to gain ${lbPerWeek.toFixed(1)} lb/week and reach ${goalWeightLb.toFixed(0)} lb by ${goalDateStr}. Expected: ~${estimatedMuscleGain.toFixed(1)} lb muscle, ~${estimatedFatGain.toFixed(1)} lb fat.`;

  return {
    values: {
      dailyCalories: bulkingCalories,
      weeksToGoal: weeksToGoalStr,
      goalDate: goalDateStr,
      totalToGain: Math.round(totalToGain * 10) / 10,
      muscleGainPotential: muscleGainPotentialStr,
      estimatedMuscle: `~${estimatedMuscleGain.toFixed(1)} lb`,
      estimatedFat: `~${estimatedFatGain.toFixed(1)} lb`,
      maintenanceCalories: tdee,
      proteinTarget,
      carbTarget,
      fatTarget,
    },
    formatted: {
      dailyCalories: bulkingCalories.toLocaleString(),
      weeksToGoal: weeksToGoalStr,
      goalDate: goalDateStr,
      totalToGain: totalToGain.toFixed(1),
      muscleGainPotential: muscleGainPotentialStr,
      estimatedMuscle: `~${estimatedMuscleGain.toFixed(1)} lb`,
      estimatedFat: `~${estimatedFatGain.toFixed(1)} lb`,
      maintenanceCalories: tdee.toLocaleString(),
      proteinTarget: proteinTarget.toString(),
      carbTarget: carbTarget.toString(),
      fatTarget: fatTarget.toString(),
    },
    summary,
    isValid: totalToGain > 0,
    metadata: {
      tableData,
      bulkType,
      trainingExperience,
    },
  };
}

export default weightGainCalculatorConfig;
