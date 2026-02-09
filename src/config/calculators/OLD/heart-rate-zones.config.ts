import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// HEART RATE ZONES CALCULATOR V3 CONFIG
// =============================================================================

// Max HR Formulas
const MAX_HR_FORMULAS: Record<string, { name: string; desc: string; calc: (age: number) => number }> = {
  tanaka: { name: "Tanaka", desc: "208 - (0.7 × Age)", calc: (age: number) => Math.round(208 - 0.7 * age) },
  standard: { name: "220 - Age", desc: "Traditional formula", calc: (age: number) => 220 - age },
  hunt: { name: "HUNT Study", desc: "211 - (0.64 × Age)", calc: (age: number) => Math.round(211 - 0.64 * age) },
};

// Fitness Levels for RHR estimation
const FITNESS_LEVELS: Record<string, { label: string; range: string; rhr: number }> = {
  sedentary: { label: "Sedentary", range: "70-90 bpm", rhr: 75 },
  moderate: { label: "Moderately Active", range: "60-70 bpm", rhr: 65 },
  active: { label: "Very Active", range: "55-65 bpm", rhr: 58 },
  athlete: { label: "Trained Athlete", range: "45-55 bpm", rhr: 50 },
  elite: { label: "Elite Athlete", range: "35-45 bpm", rhr: 42 },
};

// Heart Rate Zones Definition
const HR_ZONES = [
  { zone: 1, name: "Recovery", pct: [50, 60], color: "bg-gray-400", desc: "Active recovery, warm-up", rpe: "1-2", talk: "Sing comfortably" },
  { zone: 2, name: "Aerobic", pct: [60, 70], color: "bg-blue-500", desc: "Endurance, fat burning", rpe: "3-4", talk: "Full conversation" },
  { zone: 3, name: "Tempo", pct: [70, 80], color: "bg-green-500", desc: "Marathon pace, aerobic power", rpe: "5-6", talk: "Short sentences" },
  { zone: 4, name: "Threshold", pct: [80, 90], color: "bg-yellow-500", desc: "Lactate threshold, 10K pace", rpe: "7-8", talk: "Few words" },
  { zone: 5, name: "Maximum", pct: [90, 100], color: "bg-red-500", desc: "Max effort, sprints", rpe: "9-10", talk: "Cannot talk" },
];

export const heartRateZonesConfig: CalculatorConfigV3 = {
  id: "heart-rate-zones-calculator",
  slug: "heart-rate-zones-calculator",
  name: "Heart Rate Zones Calculator",
  category: "health",
  icon: "❤️",

  // ═══════════════════════════════════════════════════════════════════════════
  // SEO
  // ═══════════════════════════════════════════════════════════════════════════
  seo: {
    title: "Heart Rate Zones Calculator - Karvonen Formula Training Zones",
    description: "Calculate your personalized heart rate training zones using the Karvonen formula. Uses Tanaka, 220-age, and HUNT formulas. Perfect for running, cycling, and endurance training with the 80/20 polarized method.",
    shortDescription: "Calculate your 5 heart rate training zones using the Karvonen method",
    keywords: [
      "heart rate zones calculator",
      "karvonen formula",
      "training zones",
      "heart rate reserve",
      "max heart rate",
      "resting heart rate",
      "fat burning zone",
      "zone 2 training",
      "polarized training",
      "80/20 training",
      "tanaka formula",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HERO
  // ═══════════════════════════════════════════════════════════════════════════
  hero: {
    badge: "Health",
    rating: { average: 4.9, count: 28700 },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UNIT SYSTEM (not needed for HR)
  // ═══════════════════════════════════════════════════════════════════════════
  unitSystem: {
    enabled: false,
    default: "metric",
    options: [],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════════════════
  inputs: [
    // Age
    {
      id: "age",
      type: "slider",
      label: "Age",
      required: true,
      defaultValue: 30,
      min: 15,
      max: 80,
      step: 1,
      suffix: "years",
    },
    // Max HR Formula
    {
      id: "formula",
      type: "select",
      label: "Max HR Formula",
      required: true,
      defaultValue: "tanaka",
      options: [
        { value: "tanaka", label: "Tanaka (Recommended) - 208 - 0.7×Age" },
        { value: "standard", label: "Traditional - 220 - Age" },
        { value: "hunt", label: "HUNT Study - 211 - 0.64×Age" },
        { value: "custom", label: "I Know My Max HR" },
      ],
      helpText: "Tanaka formula is most accurate for general population",
    },
    // Custom Max HR
    {
      id: "customMaxHR",
      type: "number",
      label: "Your Max Heart Rate",
      required: false,
      defaultValue: 190,
      min: 140,
      max: 220,
      step: 1,
      suffix: "bpm",
      showWhen: { field: "formula", value: "custom" },
      helpText: "From a graded exercise test or field test",
    },
    // Know Resting HR?
    {
      id: "knowsRHR",
      type: "radio",
      label: "Do you know your resting heart rate?",
      required: true,
      defaultValue: "no",
      options: [
        { value: "yes", label: "Yes, I've measured it" },
        { value: "no", label: "No, estimate based on fitness" },
      ],
    },
    // Custom Resting HR
    {
      id: "restingHR",
      type: "slider",
      label: "Resting Heart Rate",
      required: false,
      defaultValue: 60,
      min: 35,
      max: 100,
      step: 1,
      suffix: "bpm",
      showWhen: { field: "knowsRHR", value: "yes" },
      helpText: "Measure first thing in the morning before getting up",
    },
    // Fitness Level (for RHR estimation)
    {
      id: "fitnessLevel",
      type: "select",
      label: "Fitness Level",
      required: false,
      defaultValue: "moderate",
      options: [
        { value: "sedentary", label: "Sedentary (Little/no exercise)" },
        { value: "moderate", label: "Moderately Active (2-3 days/week)" },
        { value: "active", label: "Very Active (4-5 days/week)" },
        { value: "athlete", label: "Trained Athlete (6+ days/week)" },
        { value: "elite", label: "Elite Athlete (Professional)" },
      ],
      showWhen: { field: "knowsRHR", value: "no" },
      helpText: "Used to estimate your resting heart rate",
    },
    // Weekly Training Hours
    {
      id: "weeklyHours",
      type: "slider",
      label: "Weekly Training Hours",
      required: true,
      defaultValue: 5,
      min: 1,
      max: 20,
      step: 1,
      suffix: "hrs",
      helpText: "For 80/20 zone time distribution",
    },
  ],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════════════════
  results: [
    {
      id: "maxHR",
      type: "primary",
      label: "Max Heart Rate",
      format: "number",
      suffix: "bpm",
    },
    {
      id: "restingHRResult",
      type: "secondary",
      label: "Resting Heart Rate",
      format: "number",
      suffix: "bpm",
    },
    {
      id: "hrReserve",
      type: "secondary",
      label: "Heart Rate Reserve",
      format: "number",
      suffix: "bpm",
    },
    {
      id: "zone1",
      type: "secondary",
      label: "Zone 1 (Recovery)",
      format: "text",
    },
    {
      id: "zone2",
      type: "secondary",
      label: "Zone 2 (Aerobic)",
      format: "text",
    },
    {
      id: "zone3",
      type: "secondary",
      label: "Zone 3 (Tempo)",
      format: "text",
    },
    {
      id: "zone4",
      type: "secondary",
      label: "Zone 4 (Threshold)",
      format: "text",
    },
    {
      id: "zone5",
      type: "secondary",
      label: "Zone 5 (Maximum)",
      format: "text",
    },
    {
      id: "rhrAnalysis",
      type: "secondary",
      label: "RHR Assessment",
      format: "text",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // INFO CARDS (in results area)
  // ═══════════════════════════════════════════════════════════════════════════
  infoCards: [
    {
      id: "zoneGuide",
      title: "Training Zones Guide",
      icon: "🎯",
      type: "list",
      items: [
        { label: "Zone 1 - Recovery", value: "50-60%", color: "gray" },
        { label: "Zone 2 - Aerobic", value: "60-70%", color: "blue" },
        { label: "Zone 3 - Tempo", value: "70-80%", color: "green" },
        { label: "Zone 4 - Threshold", value: "80-90%", color: "yellow" },
        { label: "Zone 5 - Maximum", value: "90-100%", color: "red" },
      ],
    },
    {
      id: "trainingTips",
      title: "Quick Training Tips",
      icon: "💡",
      type: "horizontal",
      items: [
        { label: "Measure RHR first thing in the morning" },
        { label: "80% of training should be Zone 1-2" },
        { label: "Use a chest strap for best accuracy" },
        { label: "Retest your zones every 3 months" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCE DATA
  // ═══════════════════════════════════════════════════════════════════════════
  referenceData: [
    {
      id: "rhrByFitness",
      title: "Resting HR by Fitness Level",
      icon: "❤️",
      columns: 2,
      items: [
        { label: "Elite Athlete", value: "35-45 bpm" },
        { label: "Trained Athlete", value: "45-55 bpm" },
        { label: "Very Active", value: "55-65 bpm" },
        { label: "Moderate", value: "60-70 bpm" },
        { label: "Sedentary", value: "70-90 bpm" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  educationSections: [
    // Zone Purpose Cards
    {
      id: "zonePurpose",
      type: "cards",
      title: "What Each Zone Trains",
      icon: "🏃",
      columns: 3,
      cards: [
        {
          title: "Zone 1-2: Aerobic Base",
          description: "Builds mitochondria, improves fat oxidation, enhances capillary density. The foundation of endurance fitness.",
          icon: "🫀",
        },
        {
          title: "Zone 3: Tempo",
          description: "Improves lactate clearance, marathon pace fitness, and aerobic power. The 'comfortably hard' zone.",
          icon: "🏃",
        },
        {
          title: "Zone 4-5: High Intensity",
          description: "Boosts VO2max, anaerobic capacity, and speed. Powerful but requires more recovery time.",
          icon: "⚡",
        },
      ],
    },
    // Formula Comparison Cards
    {
      id: "formulaComparison",
      type: "cards",
      title: "Max HR Formula Comparison",
      icon: "📊",
      columns: 3,
      cards: [
        {
          title: "Tanaka (Recommended)",
          description: "208 - (0.7 × Age). From meta-analysis of 18,712 subjects. Most accurate for general population with ~10 bpm error.",
          icon: "⭐",
        },
        {
          title: "220 - Age (Traditional)",
          description: "Classic formula from 1971. Simple but has 10-12 bpm standard error. May overestimate for athletes.",
          icon: "📜",
        },
        {
          title: "HUNT Study",
          description: "211 - (0.64 × Age). Norwegian study of 3,320 healthy adults. Good for active individuals over 35.",
          icon: "🇳🇴",
        },
      ],
    },
    // 80/20 Training
    {
      id: "polarizedTraining",
      type: "cards",
      title: "The 80/20 Polarized Training Method",
      icon: "📈",
      columns: 2,
      cards: [
        {
          title: "80% Low Intensity (Zone 1-2)",
          description: "Most training at conversational pace. Builds aerobic base, improves economy, and allows recovery. Research by Dr. Stephen Seiler shows elite athletes follow this pattern.",
          icon: "🚶",
        },
        {
          title: "20% High Intensity (Zone 4-5)",
          description: "Hard intervals and threshold work. Stimulates VO2max improvements and anaerobic adaptations. Too much causes overtraining and burnout.",
          icon: "🔥",
        },
      ],
    },
    // REQUIRED: Important Considerations
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        {
          text: "All max HR formulas have ±10-12 bpm error. For precise zones, perform a graded exercise test or field test to find your true max HR.",
          type: "warning",
        },
        {
          text: "The Karvonen formula (using HR Reserve) is ACSM-recommended and more accurate than simple %MaxHR, especially for fit individuals.",
          type: "info",
        },
        {
          text: "Your resting HR should be measured first thing in the morning, before getting out of bed. Average 3-5 days for best accuracy.",
          type: "info",
        },
        {
          text: "Medications (especially beta blockers) can significantly affect heart rate. Consult your doctor before using HR-based training.",
          type: "warning",
        },
        {
          text: "As fitness improves, resting HR decreases. Recalculate zones every 3 months or after significant fitness changes.",
          type: "info",
        },
        {
          text: "Factors like heat, dehydration, stress, and caffeine can elevate heart rate. Consider perceived exertion alongside HR.",
          type: "warning",
        },
      ],
    },
    // REQUIRED: Example Calculation
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Karvonen Calculation",
      icon: "🧮",
      description: "Calculate Zone 2 for a 30-year-old with 60 bpm resting HR",
      columns: 3,
      examples: [
        {
          title: "Step 1: Max HR",
          steps: [
            "Using Tanaka formula:",
            "Max HR = 208 - (0.7 × 30)",
            "Max HR = 208 - 21",
          ],
          result: "Max HR = 187 bpm",
        },
        {
          title: "Step 2: HR Reserve",
          steps: [
            "HRR = Max HR - Resting HR",
            "HRR = 187 - 60",
          ],
          result: "HR Reserve = 127 bpm",
        },
        {
          title: "Step 3: Zone 2 (60-70%)",
          steps: [
            "Lower: (127 × 0.60) + 60 = 136",
            "Upper: (127 × 0.70) + 60 = 149",
          ],
          result: "Zone 2: 136-149 bpm",
        },
      ],
    },
    // Prose: What is Karvonen
    {
      id: "whatIsKarvonen",
      type: "prose",
      title: "The Karvonen Formula",
      content: "Developed by Finnish scientist Martti Karvonen in 1957, the Karvonen formula uses Heart Rate Reserve (HRR) to calculate personalized training zones. Unlike simple percentage methods, it accounts for individual fitness through resting heart rate. The formula is: Target HR = ((Max HR - Resting HR) × %Intensity) + Resting HR. This method is the gold standard recommended by ACSM for exercise prescription.",
    },
    // Prose: Why 80/20 Works
    {
      id: "why8020Works",
      type: "prose",
      title: "Why 80/20 Training Works",
      content: "Research by Dr. Stephen Seiler analyzed training patterns of elite endurance athletes across multiple sports and found a consistent pattern: 75-80% of training at low intensity (Zone 1-2) with only 15-20% at high intensity (Zone 4-5). Studies show this polarized distribution produces superior improvements in VO2max, lactate threshold, and race performance compared to threshold-focused training. The key is avoiding the 'moderate intensity trap' - training too hard on easy days and too easy on hard days.",
    },
    // Prose: Measuring RHR
    {
      id: "measuringRHR",
      type: "prose",
      title: "How to Measure Resting Heart Rate",
      content: "For accurate zones, measure your resting heart rate (RHR) correctly. Use a chest strap or accurate wrist monitor first thing in the morning, before getting out of bed. Stay lying down for 1-2 minutes before measuring. Record for 3-5 consecutive mornings and use the average. Factors that temporarily elevate RHR include alcohol, stress, illness, poor sleep, and overtraining. A declining RHR over time indicates improving cardiovascular fitness.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // FAQs
  // ═══════════════════════════════════════════════════════════════════════════
  faqs: [
    {
      question: "What's the difference between %MaxHR and Karvonen zones?",
      answer: "Simple %MaxHR multiplies your max heart rate directly (e.g., 70% of 190 = 133 bpm). The Karvonen method uses Heart Rate Reserve - the range between resting and max HR - giving personalized zones. Two people with the same max HR but different resting rates will have different Karvonen zones. This is more accurate, especially for fit individuals with low resting heart rates.",
    },
    {
      question: "Which max HR formula should I use?",
      answer: "The Tanaka formula (208 - 0.7×age) is most accurate for the general population based on a meta-analysis of 18,712 subjects. However, all formulas have ~10 bpm standard error. If you're serious about training, perform a max HR test: a 20-minute all-out effort or graded treadmill test. Your highest recorded heart rate during an intense workout can also serve as a good estimate.",
    },
    {
      question: "How do I measure my true max heart rate?",
      answer: "The gold standard is a graded exercise test in a lab. A field test alternative: warm up for 15 minutes, then do 3×3 minute all-out efforts with 2 min recovery, finishing with a 1-minute sprint. Your max HR will be the highest reading. Another method: run a 5K race at maximum effort. Note: max HR tests are very demanding - ensure you're healthy and cleared for intense exercise.",
    },
    {
      question: "Why is Zone 2 training so important?",
      answer: "Zone 2 (60-70% HRR) trains your aerobic system optimally - building mitochondria, improving fat oxidation, and increasing capillary density. It's intensity where you can talk comfortably. Research shows elite athletes spend 75-80% of training here. Zone 2 builds the foundation that allows you to handle and recover from high-intensity work.",
    },
    {
      question: "What is the 80/20 rule in endurance training?",
      answer: "The 80/20 rule (polarized training) means doing 80% of training at low intensity (Zone 1-2, conversational pace) and 20% at high intensity (Zone 4-5). Research by Dr. Stephen Seiler shows this distribution produces better results than threshold-focused training. It works because low intensity builds your aerobic base while allowing recovery, and targeted high intensity provides the stimulus for improvement.",
    },
    {
      question: "How often should I recalculate my zones?",
      answer: "Recalculate every 3 months or when you notice significant fitness changes. As you get fitter, your resting heart rate typically decreases (expanding your HR Reserve), and your zones shift slightly higher. Also recalculate after injury, illness, or extended time off training.",
    },
    {
      question: "My heart rate seems too high/low - what's wrong?",
      answer: "Several factors affect heart rate beyond fitness: heat, dehydration, caffeine, stress, lack of sleep, illness, and altitude all raise HR. Some medications (especially beta blockers) lower HR significantly. If your HR seems off, use perceived exertion (RPE) alongside HR. Wrist-based monitors can be inaccurate during high-intensity exercise - chest straps are more reliable.",
    },
    {
      question: "Should I train in Zone 3 (tempo)?",
      answer: "Zone 3 is useful for specific workouts like marathon pace runs, but many athletes spend too much time here - the 'moderate intensity trap'. It's hard enough to accumulate fatigue but not intense enough to maximize adaptation. The polarized approach suggests limiting Zone 3 and instead being truly easy on easy days and truly hard on hard days.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════════════════
  references: [
    {
      authors: "Karvonen MJ, Kentala E, Mustala O",
      year: "1957",
      title: "The effects of training on heart rate: a longitudinal study",
      source: "Annales Medicinae Experimentalis et Biologiae Fenniae",
    },
    {
      authors: "Tanaka H, Monahan KD, Seals DR",
      year: "2001",
      title: "Age-predicted maximal heart rate revisited",
      source: "Journal of the American College of Cardiology",
      url: "https://pubmed.ncbi.nlm.nih.gov/11153730/",
    },
    {
      authors: "Seiler S, Tønnessen E",
      year: "2009",
      title: "Intervals, thresholds, and long slow distance: the role of intensity and duration in endurance training",
      source: "Sportscience",
    },
    {
      authors: "Stöggl T, Sperlich B",
      year: "2014",
      title: "Polarized training has greater impact on key endurance variables than threshold, high intensity, or high volume training",
      source: "Frontiers in Physiology",
      url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3912323/",
    },
    {
      authors: "American College of Sports Medicine",
      year: "2021",
      title: "ACSM's Guidelines for Exercise Testing and Prescription",
      source: "11th Edition, Wolters Kluwer",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // DETAILED TABLE (Zone Time Distribution)
  // ═══════════════════════════════════════════════════════════════════════════
  detailedTable: {
    id: "weeklyDistribution",
    buttonLabel: "View Weekly Zone Distribution",
    buttonIcon: "📅",
    modalTitle: "Weekly Training Distribution (80/20)",
    columns: [
      { id: "zone", label: "Zone", align: "left" },
      { id: "range", label: "HR Range", align: "center" },
      { id: "percent", label: "% Time", align: "center" },
      { id: "minutes", label: "Weekly Min", align: "right", highlight: true },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SIDEBAR
  // ═══════════════════════════════════════════════════════════════════════════
  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: false,
    category: "health",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FEATURES
  // ═══════════════════════════════════════════════════════════════════════════
  features: {
    autoCalculate: true,
    exportPDF: true,
    shareResults: true,
    saveHistory: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // RELATED CALCULATORS
  // ═══════════════════════════════════════════════════════════════════════════
  relatedCalculators: [
    "calorie-calculator",
    "tdee-calculator",
    "bmi-calculator",
    "body-fat-calculator",
    "pace-calculator",
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // ADS
  // ═══════════════════════════════════════════════════════════════════════════
  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
  },
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateHeartRateZones(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;

  const age = values.age as number;
  const formula = values.formula as string;
  const knowsRHR = values.knowsRHR as string;
  const weeklyHours = values.weeklyHours as number;

  // Calculate Max HR
  let maxHR: number;
  if (formula === "custom") {
    maxHR = values.customMaxHR as number;
  } else {
    maxHR = MAX_HR_FORMULAS[formula]?.calc(age) || (220 - age);
  }

  // Get Resting HR
  let restingHR: number;
  if (knowsRHR === "yes") {
    restingHR = values.restingHR as number;
  } else {
    const fitnessLevel = (values.fitnessLevel as string) || "moderate";
    restingHR = FITNESS_LEVELS[fitnessLevel]?.rhr || 65;
  }

  // Calculate HR Reserve (Karvonen)
  const hrReserve = maxHR - restingHR;

  // Calculate zones using Karvonen formula
  const zones = HR_ZONES.map((z) => ({
    ...z,
    min: Math.round(hrReserve * (z.pct[0] / 100) + restingHR),
    max: Math.round(hrReserve * (z.pct[1] / 100) + restingHR),
  }));

  // RHR Analysis
  let rhrAnalysis = "";
  if (restingHR < 45) rhrAnalysis = "Elite cardiovascular fitness";
  else if (restingHR < 55) rhrAnalysis = "Excellent fitness (athlete level)";
  else if (restingHR < 65) rhrAnalysis = "Good fitness (above average)";
  else if (restingHR < 75) rhrAnalysis = "Average fitness";
  else rhrAnalysis = "Below average - room for improvement";

  // Weekly zone distribution (80/20 polarized)
  const weeklyMinutes = weeklyHours * 60;
  const distribution = [10, 70, 10, 8, 2]; // Z1, Z2, Z3, Z4, Z5
  
  const tableData = zones.map((z, i) => ({
    zone: `Zone ${z.zone} (${z.name})`,
    range: `${z.min}-${z.max} bpm`,
    percent: `${distribution[i]}%`,
    minutes: `${Math.round(weeklyMinutes * distribution[i] / 100)} min`,
  }));

  // Add totals
  tableData.push({
    zone: "Total (Zones 1-2)",
    range: "Low Intensity",
    percent: "80%",
    minutes: `${Math.round(weeklyMinutes * 0.8)} min`,
  });
  tableData.push({
    zone: "Total (Zones 4-5)",
    range: "High Intensity",
    percent: "10%",
    minutes: `${Math.round(weeklyMinutes * 0.1)} min`,
  });

  return {
    values: {
      maxHR,
      restingHRResult: restingHR,
      hrReserve,
      zone1: `${zones[0].min}-${zones[0].max}`,
      zone2: `${zones[1].min}-${zones[1].max}`,
      zone3: `${zones[2].min}-${zones[2].max}`,
      zone4: `${zones[3].min}-${zones[3].max}`,
      zone5: `${zones[4].min}-${zones[4].max}`,
      rhrAnalysis,
    },
    formatted: {
      maxHR: `${maxHR}`,
      restingHRResult: `${restingHR}`,
      hrReserve: `${hrReserve}`,
      zone1: `${zones[0].min}-${zones[0].max} bpm`,
      zone2: `${zones[1].min}-${zones[1].max} bpm`,
      zone3: `${zones[2].min}-${zones[2].max} bpm`,
      zone4: `${zones[3].min}-${zones[3].max} bpm`,
      zone5: `${zones[4].min}-${zones[4].max} bpm`,
      rhrAnalysis,
    },
    summary: `Max HR: ${maxHR} bpm | HR Reserve: ${hrReserve} bpm | Zone 2 (Aerobic): ${zones[1].min}-${zones[1].max} bpm`,
    isValid: true,
    metadata: {
      tableData,
      zones,
      formula,
      restingHR,
    },
  };
}

export default heartRateZonesConfig;
