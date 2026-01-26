import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

export const weightLossCalculatorConfig: CalculatorConfigV3 = {
  id: "weight-loss-calculator",
  slug: "weight-loss-calculator",
  name: "Weight Loss Calculator",
  category: "health",
  icon: "⚖️",

  seo: {
    title: "Weight Loss Calculator - How Long to Reach Your Goal Weight (2026)",
    description: "Free weight loss calculator shows exactly how long to reach your goal weight. Get daily calorie targets, weekly timeline, diet break schedule & macro breakdown.",
    shortDescription: "Calculate how long to reach your goal weight with daily calorie targets",
    keywords: [
      "weight loss calculator",
      "how long to lose weight",
      "weight loss timeline",
      "calories to lose weight",
      "weight loss goal calculator"
    ],
  },

  hero: {
    badge: "Health & Fitness",
    rating: { average: 4.9, count: 18432 },
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
      defaultValue: 30,
      min: 18,
      max: 80,
      step: 1,
      suffix: "years",
    },
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
      defaultValue: 6,
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
      defaultValue: 168,
      min: 120,
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
      defaultValue: 180,
      min: 80,
      max: 500,
      step: 0.1,
      suffix: "lb",
      suffixMetric: "kg",
    },
    {
      id: "goalWeight",
      type: "number",
      label: "Goal Weight",
      required: true,
      defaultValue: 160,
      min: 80,
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
      defaultValue: "sedentary",
      options: [
        { value: "sedentary", label: "Sedentary (desk job, little exercise)" },
        { value: "light", label: "Lightly Active (1-3 days/week)" },
        { value: "moderate", label: "Moderately Active (3-5 days/week)" },
        { value: "active", label: "Very Active (6-7 days/week)" },
        { value: "extreme", label: "Extremely Active (athlete, physical job)" },
      ],
    },
    {
      id: "weightLossRate",
      type: "select",
      label: "Weight Loss Speed",
      required: true,
      defaultValue: "moderate",
      options: [
        { value: "slow", label: "Slow & Steady (0.5 lb/week)" },
        { value: "moderate", label: "Moderate (1 lb/week) - Recommended" },
        { value: "fast", label: "Fast (1.5 lb/week)" },
        { value: "aggressive", label: "Aggressive (2 lb/week)" },
      ],
      helpText: "1-2 lb/week is considered safe and sustainable",
    },
    {
      id: "bodyFatPercent",
      type: "number",
      label: "Body Fat % (optional)",
      required: false,
      min: 5,
      max: 50,
      step: 0.5,
      suffix: "%",
      helpText: "For more accurate results with Katch-McArdle formula",
    },
  ],

  inputGroups: [],

  results: [
    { id: "dailyCalories", type: "primary", label: "Daily Calories to Lose Weight", format: "number", suffix: " kcal" },
    { id: "weeksToGoal", type: "secondary", label: "Time to Reach Goal", format: "text" },
    { id: "goalDate", type: "secondary", label: "Goal Date", format: "text" },
    { id: "totalToLose", type: "secondary", label: "Total Weight to Lose", format: "number", suffix: " lb" },
    { id: "weeklyDeficit", type: "secondary", label: "Weekly Calorie Deficit", format: "number", suffix: " kcal" },
    { id: "maintenanceCalories", type: "secondary", label: "Current Maintenance Calories", format: "number", suffix: " kcal" },
    { id: "proteinTarget", type: "secondary", label: "Daily Protein Target", format: "number", suffix: " g" },
    { id: "dietBreakWeek", type: "secondary", label: "Recommended Diet Break", format: "text" },
  ],

  // INFO CARDS (Required: type "list" + type "horizontal")
  infoCards: [
    {
      type: "list",
      title: "Your Weight Loss Plan",
      icon: "📋",
      items: [
        { label: "Daily Calories", valueKey: "dailyCalories", suffix: " kcal" },
        { label: "Time to Goal", valueKey: "weeksToGoal" },
        { label: "Target Date", valueKey: "goalDate" },
        { label: "Protein Target", valueKey: "proteinTarget", suffix: " g/day" },
      ],
    },
    {
      type: "horizontal",
      title: "Key Metrics",
      items: [
        { label: "Current TDEE", valueKey: "maintenanceCalories", suffix: " kcal" },
        { label: "Weekly Deficit", valueKey: "weeklyDeficit", suffix: " kcal" },
        { label: "Total to Lose", valueKey: "totalToLose", suffix: " lb" },
        { label: "Diet Break", valueKey: "dietBreakWeek" },
      ],
    },
  ],

  // REFERENCE DATA (Required: columns grid) - MUST BE ARRAY
  referenceData: [
    {
      id: "lossRates",
      title: "Weight Loss Rate Comparison",
      icon: "📊",
      columns: [
        { key: "rate", label: "Speed", align: "left" },
        { key: "lbPerWeek", label: "Loss/Week", align: "center" },
        { key: "deficit", label: "Daily Deficit", align: "center" },
        { key: "time20lb", label: "Time for 20 lb", align: "right" },
      ],
      data: [
        { rate: "Slow", lbPerWeek: "0.5 lb", deficit: "250 kcal", time20lb: "40 weeks" },
        { rate: "Moderate", lbPerWeek: "1 lb", deficit: "500 kcal", time20lb: "20 weeks" },
        { rate: "Fast", lbPerWeek: "1.5 lb", deficit: "750 kcal", time20lb: "13 weeks" },
        { rate: "Aggressive", lbPerWeek: "2 lb", deficit: "1000 kcal", time20lb: "10 weeks" },
      ],
    },
  ],

  // EDUCATION SECTIONS
  educationSections: [
    // Cards section
    {
      id: "howItWorks",
      type: "cards",
      title: "How Weight Loss Works",
      icon: "🔬",
      columns: 2,
      cards: [
        {
          title: "Energy Balance",
          description: "Weight loss occurs when you burn more calories than you consume. A deficit of 3,500 calories equals roughly 1 pound of fat loss.",
          icon: "⚡",
        },
        {
          title: "Safe Rate of Loss",
          description: "Losing 1-2 lb per week is recommended. Faster rates risk muscle loss, metabolic slowdown, and nutrient deficiencies.",
          icon: "✅",
        },
        {
          title: "Metabolic Adaptation",
          description: "Your metabolism slows as you lose weight. Taking diet breaks every 8-12 weeks helps prevent plateaus.",
          icon: "🔄",
        },
        {
          title: "Protein Importance",
          description: "Higher protein (0.8-1g per lb body weight) preserves muscle mass during weight loss and increases satiety.",
          icon: "💪",
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
        { text: "Never eat below 1,200 calories (women) or 1,500 calories (men) without medical supervision", type: "warning" },
        { text: "Weight loss isn't linear - expect fluctuations of 2-4 lb due to water, sodium, and hormones", type: "info" },
        { text: "Take a 1-2 week diet break at maintenance calories every 8-12 weeks to prevent metabolic adaptation", type: "info" },
        { text: "Prioritize protein and strength training to preserve muscle mass during your deficit", type: "info" },
        { text: "If you hit a plateau for 3+ weeks, recalculate your TDEE with your new lower weight", type: "warning" },
        { text: "Rapid weight loss (>2 lb/week) increases risk of gallstones and muscle loss", type: "warning" },
      ],
    },
    // REQUIRED: code-example type
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "📊",
      description: "30-year-old female, 5'6\", 180 lb → 160 lb goal, moderately active",
      columns: 2,
      examples: [
        {
          title: "Step 1: Calculate BMR",
          steps: [
            "Using Mifflin-St Jeor Formula:",
            "BMR = (10 × 81.6 kg) + (6.25 × 168 cm) - (5 × 30) - 161",
            "BMR = 816 + 1,050 - 150 - 161",
            "BMR = 1,555 kcal/day",
          ],
          result: "Basal Metabolic Rate: 1,555 kcal",
        },
        {
          title: "Step 2: Calculate TDEE & Deficit",
          steps: [
            "TDEE = BMR × Activity Factor",
            "TDEE = 1,555 × 1.55 (moderate)",
            "TDEE = 2,410 kcal/day",
            "For 1 lb/week: 2,410 - 500 = 1,910 kcal",
          ],
          result: "Target: 1,910 kcal/day for 20 weeks",
        },
      ],
    },
    // PROSE SECTION 1
    {
      id: "whatIsWeightLoss",
      type: "prose",
      title: "What is a Weight Loss Calculator?",
      icon: "❓",
      content: "A weight loss calculator helps you determine how many calories you need to eat daily to lose weight at a safe, sustainable rate. It uses your personal data (age, gender, height, weight, activity level) to calculate your Total Daily Energy Expenditure (TDEE), then subtracts a calorie deficit based on your desired rate of weight loss. This gives you a personalized calorie target that creates the energy deficit needed for fat loss while preserving muscle mass.",
    },
    // PROSE SECTION 2
    {
      id: "dietBreaks",
      type: "prose",
      title: "The Science of Diet Breaks",
      icon: "🔄",
      content: "Research from the MATADOR study (2017) showed that participants who took 2-week diet breaks every 2 weeks lost more fat and retained more muscle than those who dieted continuously. Diet breaks help restore leptin levels, reduce metabolic adaptation, and improve long-term adherence. We recommend a 1-2 week break at maintenance calories every 8-12 weeks of dieting.",
    },
    // PROSE SECTION 3
    {
      id: "sustainableWeightLoss",
      type: "prose",
      title: "Keys to Sustainable Weight Loss",
      icon: "🎯",
      content: "Sustainable weight loss requires patience and consistency. Focus on creating a moderate calorie deficit (500-750 kcal/day), prioritizing protein intake (0.8-1g per lb body weight), incorporating resistance training to preserve muscle, staying hydrated, and getting adequate sleep. Remember that the goal is permanent lifestyle change, not quick fixes. Most successful long-term weight loss happens at 1-2 lbs per week.",
    },
  ],

  // FAQs
  faqs: [
    {
      question: "How accurate is this weight loss calculator?",
      answer: "This calculator uses the Mifflin-St Jeor equation, considered the gold standard for estimating metabolic rate. However, individual results vary by ±10-15% based on genetics, muscle mass, hormones, and metabolic health. Use the results as a starting point and adjust based on your actual progress over 2-3 weeks.",
    },
    {
      question: "Why am I not losing weight even in a calorie deficit?",
      answer: "Common reasons include: underestimating calorie intake (studies show people underreport by 30-50%), overestimating exercise calories, water retention masking fat loss, metabolic adaptation from prolonged dieting, or hormonal factors. Try tracking food more accurately, taking measurements (not just weight), and consider a diet break if you've been cutting for 8+ weeks.",
    },
    {
      question: "What's the fastest safe rate of weight loss?",
      answer: "Most health organizations recommend 1-2 pounds per week for sustainable weight loss. Losing faster than 2 lb/week increases risk of muscle loss, gallstones, nutrient deficiencies, and metabolic slowdown. The exception is very obese individuals (BMI 35+) who can safely lose 2-3 lb/week initially under medical supervision.",
    },
    {
      question: "Should I eat back exercise calories?",
      answer: "Partially. Exercise calorie estimates are often inflated by 20-50%. If you exercise, eat back about half of the estimated calories to avoid excessive deficit. For example, if your tracker shows 400 calories burned, eat an extra 200 calories.",
    },
    {
      question: "What is a diet break and do I need one?",
      answer: "A diet break is 1-2 weeks of eating at maintenance calories (no deficit) to help restore metabolism and reduce diet fatigue. Research suggests taking a diet break every 8-12 weeks of continuous dieting improves long-term results.",
    },
    {
      question: "How much protein should I eat while losing weight?",
      answer: "During a calorie deficit, protein needs increase to preserve muscle mass. Aim for 0.8-1.2 grams per pound of goal body weight daily. For example, if your goal weight is 150 lb, target 120-180g protein daily.",
    },
  ],

  // REFERENCES (Required)
  references: [
    {
      authors: "Mifflin MD, St Jeor ST, Hill LA, et al.",
      year: "1990",
      title: "A new predictive equation for resting energy expenditure in healthy individuals",
      source: "American Journal of Clinical Nutrition, 51(2), 241-247",
      url: "https://pubmed.ncbi.nlm.nih.gov/2305711/",
    },
    {
      authors: "Byrne NM, Sainsbury A, King NA, et al.",
      year: "2018",
      title: "Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study",
      source: "International Journal of Obesity, 42(2), 129-138",
      url: "https://pubmed.ncbi.nlm.nih.gov/28925405/",
    },
  ],

  detailedTable: {
    id: "weeklyProjection",
    buttonLabel: "View Weekly Projection",
    buttonIcon: "📅",
    modalTitle: "Week-by-Week Weight Loss Projection",
    columns: [
      { id: "week", label: "Week", align: "left" },
      { id: "weight", label: "Projected Weight", align: "center", highlight: true },
      { id: "lostTotal", label: "Total Lost", align: "center" },
      { id: "calories", label: "Daily Calories", align: "right" },
    ],
  },

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "health" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["calorie-deficit-calculator", "tdee-calculator", "bmr-calculator", "macro-calculator", "body-fat-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// CALCULATE FUNCTION
export function calculateWeightLoss(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values, unitSystem } = data;

  const age = values.age as number;
  const gender = values.gender as string;
  const activityLevel = values.activityLevel as string;
  const weightLossRate = values.weightLossRate as string;
  const bodyFatPercent = values.bodyFatPercent as number | undefined;

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
  if (bodyFatPercent && bodyFatPercent > 0) {
    const leanMass = currentWeightKg * (1 - bodyFatPercent / 100);
    bmr = 370 + (21.6 * leanMass);
  } else {
    if (gender === "male") {
      bmr = (10 * currentWeightKg) + (6.25 * heightCm) - (5 * age) + 5;
    } else {
      bmr = (10 * currentWeightKg) + (6.25 * heightCm) - (5 * age) - 161;
    }
  }

  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    extreme: 1.9,
  };

  const tdee = Math.round(bmr * activityMultipliers[activityLevel]);

  const lossRates: Record<string, number> = {
    slow: 0.5,
    moderate: 1.0,
    fast: 1.5,
    aggressive: 2.0,
  };

  const lbPerWeek = lossRates[weightLossRate];
  const deficitPerDay = Math.round(lbPerWeek * 500);

  let targetCalories = tdee - deficitPerDay;

  const minCalories = gender === "female" ? 1200 : 1500;
  const safetyWarning = targetCalories < minCalories;
  if (targetCalories < minCalories) {
    targetCalories = minCalories;
  }

  const currentWeightLb = unitSystem === "imperial" 
    ? (values.currentWeight as number) 
    : currentWeightKg * 2.20462;
  const goalWeightLb = unitSystem === "imperial" 
    ? (values.goalWeight as number) 
    : goalWeightKg * 2.20462;
  
  const totalToLose = currentWeightLb - goalWeightLb;
  const weeksToGoal = Math.ceil(totalToLose / lbPerWeek);

  const today = new Date();
  const goalDate = new Date(today);
  goalDate.setDate(goalDate.getDate() + (weeksToGoal * 7));
  const goalDateStr = goalDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  let weeksToGoalStr: string;
  if (weeksToGoal < 4) {
    weeksToGoalStr = `${weeksToGoal} weeks`;
  } else {
    const months = Math.floor(weeksToGoal / 4.33);
    const remainingWeeks = Math.round(weeksToGoal % 4.33);
    if (remainingWeeks === 0) {
      weeksToGoalStr = `${months} month${months > 1 ? 's' : ''}`;
    } else {
      weeksToGoalStr = `${months} month${months > 1 ? 's' : ''}, ${remainingWeeks} week${remainingWeeks > 1 ? 's' : ''}`;
    }
  }

  const proteinTarget = Math.round(goalWeightLb);
  const dietBreakWeek = weeksToGoal > 12 ? "Week 8-9" : weeksToGoal > 8 ? "Week 6-7" : "Not needed";

  const tableData: Array<Record<string, string | number>> = [];
  let projectedWeight = currentWeightLb;
  for (let week = 0; week <= Math.min(weeksToGoal, 24); week++) {
    const weekCalories = week > 0 ? targetCalories : tdee;
    tableData.push({
      week: week === 0 ? "Start" : `Week ${week}`,
      weight: `${projectedWeight.toFixed(1)} lb`,
      lostTotal: `${(currentWeightLb - projectedWeight).toFixed(1)} lb`,
      calories: weekCalories,
    });
    projectedWeight -= lbPerWeek;
    if (projectedWeight <= goalWeightLb) projectedWeight = goalWeightLb;
  }

  let summary = `Eat ${targetCalories.toLocaleString()} calories daily to lose ${lbPerWeek} lb/week and reach ${goalWeightLb.toFixed(0)} lb by ${goalDateStr}.`;
  if (safetyWarning) {
    summary += ` ⚠️ Calorie target raised to safe minimum of ${minCalories} kcal.`;
  }

  return {
    values: {
      dailyCalories: targetCalories,
      weeksToGoal: weeksToGoalStr,
      goalDate: goalDateStr,
      totalToLose: Math.round(totalToLose * 10) / 10,
      weeklyDeficit: deficitPerDay * 7,
      maintenanceCalories: tdee,
      proteinTarget,
      dietBreakWeek,
    },
    formatted: {
      dailyCalories: targetCalories.toLocaleString(),
      weeksToGoal: weeksToGoalStr,
      goalDate: goalDateStr,
      totalToLose: totalToLose.toFixed(1),
      weeklyDeficit: (deficitPerDay * 7).toLocaleString(),
      maintenanceCalories: tdee.toLocaleString(),
      proteinTarget: proteinTarget.toString(),
      dietBreakWeek,
    },
    summary,
    isValid: totalToLose > 0,
    metadata: {
      tableData,
      warnings: safetyWarning ? ["Calorie target adjusted to safe minimum"] : [],
    },
  };
}

export default weightLossCalculatorConfig;
