import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// PROTEIN CALCULATOR V3 - FULL FEATURED
// =============================================================================
// Features: Lean Body Mass calculation, GLP-1 medication support, Pregnancy/Lactation,
// Elderly sarcopenia prevention, Sports-specific needs, Meal timing distribution,
// Body fat % adjustment, Goal-based recommendations
// =============================================================================

// Protein multipliers by activity level (g per kg)
const ACTIVITY_MULTIPLIERS: Record<string, { min: number; max: number; label: string }> = {
  sedentary: { min: 0.8, max: 1.0, label: "Sedentary (minimal activity)" },
  light: { min: 1.0, max: 1.2, label: "Light (1-3 days/week)" },
  moderate: { min: 1.2, max: 1.4, label: "Moderate (3-5 days/week)" },
  active: { min: 1.4, max: 1.6, label: "Active (6-7 days/week)" },
  veryActive: { min: 1.6, max: 1.8, label: "Very Active (hard daily training)" },
  athlete: { min: 1.8, max: 2.2, label: "Athlete (competitive training)" },
};

// Goal adjustments (added to base)
const GOAL_ADJUSTMENTS: Record<string, number> = {
  maintain: 0,
  loseWeight: 0.3, // Higher protein preserves muscle in deficit
  gainMuscle: 0.2,
  recomposition: 0.3,
};

// Sport-specific multipliers
const SPORT_MULTIPLIERS: Record<string, { min: number; max: number }> = {
  none: { min: 0, max: 0 },
  endurance: { min: 1.2, max: 1.6 }, // Running, cycling, swimming
  strength: { min: 1.6, max: 2.2 }, // Powerlifting, bodybuilding
  team: { min: 1.4, max: 1.7 }, // Soccer, basketball
  combat: { min: 1.6, max: 2.0 }, // Boxing, MMA
  crossfit: { min: 1.6, max: 2.0 }, // High intensity mixed
};

export const proteinCalculatorConfig: CalculatorConfigV3 = {
  id: "protein-calculator",
  slug: "protein-calculator",
  name: "Protein Calculator",
  category: "health",
  icon: "🥩",

  seo: {
    title: "Protein Calculator - Daily Protein Intake for Your Goals",
    description: "Calculate your optimal daily protein intake based on weight, body composition, activity level, and goals. Includes GLP-1 medication support, pregnancy needs, elderly recommendations, and meal distribution.",
    shortDescription: "Calculate your daily protein needs",
    keywords: ["protein calculator", "daily protein intake", "protein for muscle gain", "protein for weight loss", "GLP-1 protein", "lean body mass protein"],
  },

  hero: { badge: "Health", rating: { average: 4.8, count: 156000 } },

  unitSystem: {
    enabled: true,
    default: "imperial",
    options: [
      { value: "imperial", label: "Imperial (lb)" },
      { value: "metric", label: "Metric (kg)" },
    ],
  },

  inputs: [
    {
      id: "weight",
      type: "number",
      label: "Body Weight",
      required: true,
      defaultValue: 160,
      min: 80,
      max: 400,
      step: 1,
      unitKey: "weight",
      unitOptions: {
        imperial: { suffix: "lb", min: 80, max: 400 },
        metric: { suffix: "kg", min: 36, max: 180 },
      },
      helpText: "Your current body weight",
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
      id: "age",
      type: "number",
      label: "Age",
      required: true,
      defaultValue: 35,
      min: 18,
      max: 100,
      step: 1,
      suffix: "years",
    },
    {
      id: "activityLevel",
      type: "select",
      label: "Activity Level",
      required: true,
      defaultValue: "moderate",
      options: [
        { value: "sedentary", label: "Sedentary (minimal activity)" },
        { value: "light", label: "Light (exercise 1-3 days/week)" },
        { value: "moderate", label: "Moderate (exercise 3-5 days/week)" },
        { value: "active", label: "Active (exercise 6-7 days/week)" },
        { value: "veryActive", label: "Very Active (hard daily training)" },
        { value: "athlete", label: "Athlete (competitive training)" },
      ],
    },
    {
      id: "goal",
      type: "select",
      label: "Primary Goal",
      required: true,
      defaultValue: "maintain",
      options: [
        { value: "maintain", label: "Maintain current weight" },
        { value: "loseWeight", label: "Lose weight (preserve muscle)" },
        { value: "gainMuscle", label: "Build muscle (bulk)" },
        { value: "recomposition", label: "Body recomposition (lose fat + gain muscle)" },
      ],
    },
  ],

  inputGroups: [
    {
      id: "bodyComposition",
      title: "Body Composition (Optional)",
      icon: "📊",
      collapsible: true,
      defaultCollapsed: false,
      inputs: [
        {
          id: "knowBodyFat",
          type: "radio",
          label: "Do you know your body fat percentage?",
          required: false,
          defaultValue: "no",
          options: [
            { value: "yes", label: "Yes - use for more accurate calculation" },
            { value: "no", label: "No - estimate based on weight only" },
          ],
          helpText: "Lean body mass gives more accurate protein targets",
        },
        {
          id: "bodyFatPercent",
          type: "slider",
          label: "Body Fat Percentage",
          required: false,
          defaultValue: 25,
          min: 5,
          max: 50,
          step: 1,
          suffix: "%",
          showWhen: { field: "knowBodyFat", value: "yes" },
          helpText: "Estimate: Men 10-20% fit, 20-30% average | Women 18-28% fit, 28-38% average",
        },
      ],
    },
    {
      id: "sportsSection",
      title: "Sport-Specific Needs",
      icon: "🏋️",
      collapsible: true,
      defaultCollapsed: true,
      inputs: [
        {
          id: "sportType",
          type: "select",
          label: "Primary Sport/Training Type",
          required: false,
          defaultValue: "none",
          options: [
            { value: "none", label: "General fitness / No specific sport" },
            { value: "endurance", label: "Endurance (running, cycling, swimming)" },
            { value: "strength", label: "Strength (powerlifting, bodybuilding)" },
            { value: "team", label: "Team sports (soccer, basketball, hockey)" },
            { value: "combat", label: "Combat sports (boxing, MMA, wrestling)" },
            { value: "crossfit", label: "CrossFit / High-intensity functional" },
          ],
        },
        {
          id: "trainingExperience",
          type: "select",
          label: "Training Experience",
          required: false,
          defaultValue: "intermediate",
          options: [
            { value: "beginner", label: "Beginner (< 1 year consistent training)" },
            { value: "intermediate", label: "Intermediate (1-3 years)" },
            { value: "advanced", label: "Advanced (3+ years)" },
          ],
          showWhen: { field: "sportType", value: ["endurance", "strength", "team", "combat", "crossfit"] },
        },
      ],
    },
    {
      id: "specialConditions",
      title: "Special Conditions",
      icon: "⚕️",
      collapsible: true,
      defaultCollapsed: true,
      inputs: [
        {
          id: "onGLP1",
          type: "radio",
          label: "Taking GLP-1 medication? (Ozempic, Wegovy, Mounjaro, Zepbound)",
          required: false,
          defaultValue: "no",
          options: [
            { value: "yes", label: "Yes - I need higher protein to preserve muscle" },
            { value: "no", label: "No" },
          ],
          helpText: "GLP-1 users need 1.6-2.2g/kg to prevent muscle loss",
        },
        {
          id: "pregnancyStatus",
          type: "select",
          label: "Pregnancy/Lactation Status",
          required: false,
          defaultValue: "none",
          showWhen: { field: "gender", value: "female" },
          options: [
            { value: "none", label: "Not pregnant or breastfeeding" },
            { value: "pregnant", label: "Pregnant (+25g/day)" },
            { value: "breastfeeding", label: "Breastfeeding (+20g/day)" },
          ],
        },
        {
          id: "recovering",
          type: "radio",
          label: "Recovering from injury or surgery?",
          required: false,
          defaultValue: "no",
          options: [
            { value: "yes", label: "Yes - increase protein for healing" },
            { value: "no", label: "No" },
          ],
        },
      ],
    },
    {
      id: "mealPlanning",
      title: "Meal Planning",
      icon: "🍽️",
      collapsible: true,
      defaultCollapsed: true,
      inputs: [
        {
          id: "mealsPerDay",
          type: "select",
          label: "Meals Per Day",
          required: false,
          defaultValue: "3",
          options: [
            { value: "2", label: "2 meals" },
            { value: "3", label: "3 meals" },
            { value: "4", label: "4 meals" },
            { value: "5", label: "5 meals" },
            { value: "6", label: "6 meals" },
          ],
        },
        {
          id: "dietType",
          type: "select",
          label: "Dietary Preference",
          required: false,
          defaultValue: "omnivore",
          options: [
            { value: "omnivore", label: "Omnivore (all foods)" },
            { value: "vegetarian", label: "Vegetarian (+10% for incomplete proteins)" },
            { value: "vegan", label: "Vegan (+15-20% for plant protein absorption)" },
          ],
        },
      ],
    },
  ],

  results: [
    { id: "dailyProtein", type: "primary", label: "Daily Protein Target", format: "text" },
    { id: "proteinRange", type: "secondary", label: "Recommended Range", format: "text" },
    { id: "perMealProtein", type: "secondary", label: "Per Meal Target", format: "text" },
    { id: "leanBodyMass", type: "secondary", label: "Lean Body Mass", format: "text" },
    { id: "proteinPerLBM", type: "secondary", label: "Protein per LBM", format: "text" },
    { id: "caloriesFromProtein", type: "secondary", label: "Calories from Protein", format: "text" },
  ],

  infoCards: [
    {
      id: "proteinByGoal",
      title: "Protein Needs by Goal",
      icon: "🎯",
      type: "list",
      items: [
        { label: "Sedentary (RDA minimum)", value: "0.8 g/kg", color: "slate" },
        { label: "Weight loss (preserve muscle)", value: "1.2-1.6 g/kg", color: "amber" },
        { label: "Muscle gain (bulking)", value: "1.6-2.2 g/kg", color: "green" },
        { label: "Athletes/GLP-1 users", value: "1.6-2.4 g/kg", color: "blue" },
      ],
    },
    {
      id: "timingTips",
      title: "Protein Timing Tips",
      icon: "⏰",
      type: "horizontal",
      items: [
        { label: "20-40g per meal for optimal muscle protein synthesis" },
        { label: "Protein within 2 hours post-workout" },
        { label: "Include protein at breakfast for satiety" },
        { label: "Casein before bed for overnight recovery" },
      ],
    },
  ],

  referenceData: [
    {
      id: "proteinSources",
      title: "High-Quality Protein Sources",
      icon: "🥗",
      columns: 2,
      items: [
        { label: "Chicken breast (3oz)", value: "26g protein" },
        { label: "Greek yogurt (1 cup)", value: "17g protein" },
        { label: "Eggs (2 large)", value: "12g protein" },
        { label: "Salmon (3oz)", value: "22g protein" },
        { label: "Tofu (1/2 cup)", value: "10g protein" },
        { label: "Lentils (1 cup cooked)", value: "18g protein" },
      ],
    },
  ],

  educationSections: [
    {
      id: "proteinBasics",
      type: "cards",
      title: "Why Protein Matters",
      icon: "💪",
      columns: 2,
      cards: [
        { title: "Muscle Preservation", description: "Adequate protein prevents muscle loss during weight loss and aging. Critical for those on GLP-1 medications or caloric deficit.", icon: "🏋️" },
        { title: "Satiety & Appetite", description: "Protein is the most filling macronutrient. High-protein meals reduce hunger hormones and increase satiety hormones like GLP-1.", icon: "🍽️" },
        { title: "Thermic Effect", description: "Protein burns 20-30% of its calories during digestion (vs 5-10% for carbs). This slightly boosts metabolism.", icon: "🔥" },
        { title: "Recovery & Repair", description: "Essential for muscle repair after exercise, wound healing, and maintaining immune function.", icon: "🩹" },
      ],
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "GLP-1 medication users (Ozempic, Wegovy, Mounjaro) need 1.6-2.2g/kg protein to prevent muscle loss during rapid weight loss.", type: "warning" },
        { text: "Elderly adults (65+) need 1.0-1.5g/kg due to anabolic resistance - muscles become less efficient at using protein.", type: "warning" },
        { text: "Distribute protein evenly across meals (20-40g per meal) rather than consuming most at dinner.", type: "info" },
        { text: "Plant-based eaters may need 10-20% more protein due to lower digestibility of some plant proteins.", type: "info" },
        { text: "Pregnant women need +25g/day; breastfeeding women need +20g/day above baseline.", type: "info" },
        { text: "People with kidney disease should consult a doctor before increasing protein intake.", type: "warning" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "🧮",
      description: "160 lb (72.5 kg) person, moderate activity, weight loss goal",
      columns: 2,
      examples: [
        { title: "Using Total Body Weight", steps: ["Weight: 160 lb = 72.5 kg", "Activity multiplier: 1.3 g/kg", "Goal adjustment: +0.3 g/kg", "Total: 72.5 × 1.6 = 116g"], result: "Daily target: 116g protein" },
        { title: "Using Lean Body Mass (25% BF)", steps: ["LBM: 160 × 0.75 = 120 lb = 54.4 kg", "LBM multiplier: 2.0 g/kg", "Total: 54.4 × 2.0 = 109g", "Per meal (3): 36g each"], result: "Daily target: 109g protein" },
      ],
    },
    {
      id: "glp1Guide",
      type: "prose",
      title: "Protein for GLP-1 Medication Users",
      content: "GLP-1 receptor agonists (Ozempic, Wegovy, Mounjaro, Zepbound) cause rapid weight loss but can lead to significant muscle loss if protein intake is inadequate. Studies show 30-40% of weight lost on GLP-1s can be lean muscle mass. To prevent this: aim for 1.6-2.2g protein per kg body weight, eat protein first at each meal (before you feel full), distribute protein across 3-4 meals, combine with resistance training 2-3x weekly, and consider protein shakes if appetite is very suppressed.",
    },
    {
      id: "elderlyProtein",
      type: "prose",
      title: "Protein Needs for Adults 65+",
      content: "Older adults experience 'anabolic resistance' - their muscles respond less efficiently to protein. The RDA of 0.8g/kg is insufficient for most seniors. Research from the PROT-AGE study group recommends 1.0-1.2g/kg for healthy older adults, and 1.2-1.5g/kg for those who are ill or at risk of malnutrition. Distributing protein evenly (25-30g per meal) and including leucine-rich sources is particularly important for stimulating muscle protein synthesis in older adults.",
    },
    {
      id: "proteinTimingGuide",
      type: "prose",
      title: "Optimal Protein Timing & Distribution",
      content: "Research shows that distributing protein intake evenly across meals (20-40g per meal) maximizes muscle protein synthesis better than consuming most protein in one meal. The 'anabolic window' post-workout extends to 24-48 hours, though consuming 20-40g of protein within 2 hours after exercise may optimize recovery. For overnight muscle preservation, consuming 30-40g of slow-digesting protein (like casein) before sleep supports muscle protein synthesis during the fasting period. Athletes and those building muscle should aim for protein at each meal, including breakfast, which is often protein-deficient in typical Western diets.",
    },
  ],

  faqs: [
    { question: "Can I eat too much protein?", answer: "For healthy individuals, protein up to 2.5g/kg is safe. There's no evidence that high protein intake damages kidneys in healthy people. However, those with existing kidney disease should limit protein. Excess protein beyond what your body can use will be converted to energy or stored as fat." },
    { question: "Does protein timing matter?", answer: "Yes, somewhat. Distributing protein evenly across 3-5 meals (20-40g each) optimizes muscle protein synthesis better than eating most protein in one meal. Post-workout protein (within 2 hours) and protein before bed (casein) can enhance recovery, but total daily intake matters most." },
    { question: "Are plant proteins as good as animal proteins?", answer: "Plant proteins can be excellent but often lack one or more essential amino acids (incomplete proteins). Vegetarians and vegans should eat varied sources (beans, lentils, tofu, tempeh, quinoa) and may need 10-20% more total protein due to lower digestibility. Soy and quinoa are complete plant proteins." },
    { question: "How do I know if I'm getting enough protein?", answer: "Signs of adequate protein: maintaining muscle mass during weight loss, feeling satisfied after meals, good recovery from exercise, strong nails and hair. Signs of deficiency: persistent hunger, muscle loss, slow recovery, fatigue, hair loss, brittle nails." },
    { question: "Should I use protein powder?", answer: "Protein powder is a convenient supplement but not necessary if you can meet needs through food. It's especially useful for: hitting targets when appetite is low (GLP-1 users), post-workout convenience, vegetarians/vegans needing extra protein, and older adults struggling to eat enough. Whey, casein, and pea protein are all effective options." },
    { question: "Does protein help with weight loss?", answer: "Yes, significantly. Protein increases satiety (fullness), has a higher thermic effect (burns more calories during digestion), and preserves muscle mass during caloric restriction. Studies show high-protein diets lead to better weight loss outcomes and less weight regain compared to standard protein diets." },
  ],

  references: [
    { authors: "Phillips SM, Van Loon LJ", year: "2011", title: "Dietary protein for athletes: from requirements to optimum adaptation", source: "Journal of Sports Sciences", url: "https://pubmed.ncbi.nlm.nih.gov/22150425/" },
    { authors: "Bauer J, Biolo G, Cederholm T, et al.", year: "2013", title: "Evidence-based recommendations for optimal dietary protein intake in older people: PROT-AGE Study Group", source: "Journal of the American Medical Directors Association", url: "https://pubmed.ncbi.nlm.nih.gov/23867520/" },
  ],

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "health" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["calorie-calculator", "bmi-calculator", "macro-calculator", "tdee-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateProtein(data: { values: Record<string, unknown>; units: Record<string, string>; unitSystem: "metric" | "imperial" }): CalculatorResults {
  const { values, unitSystem } = data;

  // Basic inputs
  let weightLb = (values.weight as number) || 160;
  const gender = (values.gender as string) || "female";
  const age = (values.age as number) || 35;
  const activityLevel = (values.activityLevel as string) || "moderate";
  const goal = (values.goal as string) || "maintain";

  // Convert weight to kg
  const weightKg = unitSystem === "metric" ? weightLb : weightLb * 0.453592;
  weightLb = unitSystem === "metric" ? weightLb * 2.20462 : weightLb;

  // Body composition
  const knowBodyFat = (values.knowBodyFat as string) === "yes";
  const bodyFatPercent = (values.bodyFatPercent as number) || 25;

  // Sports
  const sportType = (values.sportType as string) || "none";
  const trainingExperience = (values.trainingExperience as string) || "intermediate";

  // Special conditions
  const onGLP1 = (values.onGLP1 as string) === "yes";
  const pregnancyStatus = (values.pregnancyStatus as string) || "none";
  const recovering = (values.recovering as string) === "yes";

  // Meal planning
  const mealsPerDay = parseInt((values.mealsPerDay as string) || "3");
  const dietType = (values.dietType as string) || "omnivore";

  // Calculate Lean Body Mass
  let leanBodyMassKg = weightKg;
  let leanBodyMassLb = weightLb;
  let usingLBM = false;

  if (knowBodyFat && bodyFatPercent > 0 && bodyFatPercent < 100) {
    leanBodyMassKg = weightKg * (1 - bodyFatPercent / 100);
    leanBodyMassLb = weightLb * (1 - bodyFatPercent / 100);
    usingLBM = true;
  }

  // Base protein calculation
  const activityData = ACTIVITY_MULTIPLIERS[activityLevel] || ACTIVITY_MULTIPLIERS.moderate;
  let baseMultiplierMin = activityData.min;
  let baseMultiplierMax = activityData.max;

  // Goal adjustments
  const goalAdjustment = GOAL_ADJUSTMENTS[goal] || 0;
  baseMultiplierMin += goalAdjustment;
  baseMultiplierMax += goalAdjustment;

  // Sport-specific adjustments
  if (sportType !== "none" && SPORT_MULTIPLIERS[sportType]) {
    const sportData = SPORT_MULTIPLIERS[sportType];
    baseMultiplierMin = Math.max(baseMultiplierMin, sportData.min);
    baseMultiplierMax = Math.max(baseMultiplierMax, sportData.max);
    
    // Training experience bonus
    if (trainingExperience === "beginner") {
      baseMultiplierMax += 0.1; // Beginners benefit from higher protein
    }
  }

  // GLP-1 adjustment (higher protein to preserve muscle)
  if (onGLP1) {
    baseMultiplierMin = Math.max(baseMultiplierMin, 1.6);
    baseMultiplierMax = Math.max(baseMultiplierMax, 2.2);
  }

  // Elderly adjustment (65+)
  if (age >= 65) {
    baseMultiplierMin = Math.max(baseMultiplierMin, 1.0);
    baseMultiplierMax = Math.max(baseMultiplierMax, 1.5);
  }

  // Recovery adjustment
  if (recovering) {
    baseMultiplierMin += 0.2;
    baseMultiplierMax += 0.3;
  }

  // Calculate protein amounts
  const referenceWeight = usingLBM ? leanBodyMassKg : weightKg;
  let proteinMin = referenceWeight * baseMultiplierMin;
  let proteinMax = referenceWeight * baseMultiplierMax;
  let proteinMid = (proteinMin + proteinMax) / 2;

  // Pregnancy/lactation additions
  if (pregnancyStatus === "pregnant") {
    proteinMin += 25;
    proteinMax += 25;
    proteinMid += 25;
  } else if (pregnancyStatus === "breastfeeding") {
    proteinMin += 20;
    proteinMax += 20;
    proteinMid += 20;
  }

  // Diet type adjustments (plant proteins less bioavailable)
  if (dietType === "vegetarian") {
    proteinMin *= 1.1;
    proteinMax *= 1.1;
    proteinMid *= 1.1;
  } else if (dietType === "vegan") {
    proteinMin *= 1.15;
    proteinMax *= 1.15;
    proteinMid *= 1.15;
  }

  // Per meal calculation
  const perMealMin = proteinMin / mealsPerDay;
  const perMealMax = proteinMax / mealsPerDay;
  const perMealMid = proteinMid / mealsPerDay;

  // Calories from protein (4 cal per gram)
  const caloriesFromProtein = proteinMid * 4;

  // Protein per LBM
  const proteinPerLBM = usingLBM ? proteinMid / leanBodyMassKg : proteinMid / weightKg;

  return {
    values: {
      dailyProtein: proteinMid,
      proteinMin,
      proteinMax,
      perMealProtein: perMealMid,
      leanBodyMass: leanBodyMassKg,
      proteinPerLBM,
      caloriesFromProtein,
    },
    formatted: {
      dailyProtein: `${Math.round(proteinMid)}g`,
      proteinRange: `${Math.round(proteinMin)}g - ${Math.round(proteinMax)}g`,
      perMealProtein: `${Math.round(perMealMin)}g - ${Math.round(perMealMax)}g per meal`,
      leanBodyMass: usingLBM ? `${Math.round(leanBodyMassLb)} lb (${Math.round(leanBodyMassKg)} kg)` : "Not calculated (enter body fat %)",
      proteinPerLBM: `${proteinPerLBM.toFixed(1)} g/kg ${usingLBM ? "of lean mass" : "of body weight"}`,
      caloriesFromProtein: `${Math.round(caloriesFromProtein)} kcal`,
    },
    summary: `${Math.round(proteinMid)}g protein daily | ${Math.round(perMealMid)}g per meal (${mealsPerDay} meals)`,
    isValid: weightKg > 0,
    metadata: {
      usingLBM,
      baseMultiplier: (baseMultiplierMin + baseMultiplierMax) / 2,
      adjustments: { onGLP1, elderly: age >= 65, recovering, pregnancyStatus },
    },
  };
}

export default proteinCalculatorConfig;
