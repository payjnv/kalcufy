import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ═══════════════════════════════════════════════════════════════
// MET DATABASE — 2011 Compendium of Physical Activities (Ainsworth et al.)
// Formula: Calories = (MET × 3.5 × weight_kg) / 200 × duration_min
// ═══════════════════════════════════════════════════════════════
const ACTIVITY_MET: Record<string, number> = {
  // CYCLING
  cyclingLeisure: 4.0,
  cyclingLight: 6.8,
  cyclingModerate: 8.0,
  cyclingVigorous: 10.0,
  cyclingRacing: 12.0,
  mountainBiking: 8.5,
  stationaryModerate: 7.0,
  stationaryVigorous: 10.5,
  spinning: 8.5,
  // DANCE
  aerobicDance: 7.3,
  ballroomDance: 5.5,
  salsaDance: 4.5,
  balletDance: 5.0,
  // GYM & FITNESS
  circuitTraining: 8.0,
  elliptical: 5.0,
  hiit: 8.0,
  jumpRope: 10.0,
  pilates: 3.0,
  rowingMachine: 7.0,
  stairStepper: 9.0,
  stretching: 2.3,
  weightliftingLight: 3.5,
  weightliftingVigorous: 6.0,
  yogaHatha: 2.5,
  yogaPower: 4.0,
  calisthenics: 8.0,
  // HOME & DAILY
  cleaning: 3.3,
  cooking: 2.0,
  gardening: 3.8,
  mowingLawn: 5.5,
  movingFurniture: 6.0,
  playingWithKids: 4.0,
  shovelingSnow: 6.0,
  // MARTIAL ARTS
  boxingSparring: 9.0,
  kickboxing: 10.0,
  martialArtsModerate: 5.3,
  taiChi: 3.0,
  // OUTDOOR
  hiking: 6.0,
  kayaking: 5.0,
  paddleboarding: 6.0,
  rockClimbing: 8.0,
  rowingOutdoor: 7.0,
  skiingCrossCountry: 8.0,
  // RUNNING
  jogging: 7.0,
  running5: 8.3,
  running6: 9.8,
  running7: 11.0,
  running8: 11.8,
  running9: 12.8,
  running10: 14.5,
  // SPORTS
  badminton: 7.0,
  baseball: 5.0,
  basketball: 8.0,
  bowling: 3.0,
  golfWalking: 4.3,
  hockey: 8.0,
  racquetball: 10.0,
  skiingDownhill: 6.0,
  iceSkating: 5.5,
  snowboarding: 5.3,
  soccer: 10.0,
  tableTennis: 4.0,
  tennisSingles: 8.0,
  tennisDoubles: 6.0,
  volleyball: 6.0,
  // SWIMMING
  aquaAerobics: 5.3,
  swimmingBackstroke: 4.8,
  swimmingBreaststroke: 5.3,
  swimmingButterfly: 13.8,
  swimmingModerate: 5.8,
  swimmingVigorous: 9.8,
  treading: 3.5,
  // WALKING
  walkingSlow: 2.5,
  walkingModerate: 3.5,
  walkingBrisk: 4.3,
  walkingVeryBrisk: 5.0,
  walkingUphill: 6.0,
  raceWalking: 6.5,
};

// Activities shown in comparison chart
const CHART_ACTIVITIES: { key: string; labelKey: string }[] = [
  { key: "walkingBrisk", labelKey: "Walking" },
  { key: "jogging", labelKey: "Jogging" },
  { key: "running6", labelKey: "Running" },
  { key: "cyclingModerate", labelKey: "Cycling" },
  { key: "swimmingModerate", labelKey: "Swimming" },
  { key: "weightliftingVigorous", labelKey: "Weights" },
  { key: "basketball", labelKey: "Basketball" },
  { key: "jumpRope", labelKey: "Jump Rope" },
  { key: "hiit", labelKey: "HIIT" },
  { key: "aerobicDance", labelKey: "Dance" },
];

// All select option IDs (ordered alphabetically by category label)
const ACTIVITY_IDS = Object.keys(ACTIVITY_MET);

// ═══════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════
export const caloriesBurnedCalculatorConfig: CalculatorConfigV4 = {
  id: "calories-burned",
  version: "4.0",
  category: "health",
  icon: "🔥",

  // ─── Presets ──────────────────────────────────────────────
  presets: [
    {
      id: "quickWalk",
      icon: "🚶",
      values: { activity: "walkingBrisk", duration: 30, weight: 70,},
    },
    {
      id: "cardioRun",
      icon: "🏃",
      values: { activity: "running6", duration: 30, weight: 70,},
    },
    {
      id: "gymSession",
      icon: "🏋️",
      values: { activity: "weightliftingVigorous", duration: 60, weight: 82,},
    },
    {
      id: "hiitWorkout",
      icon: "⚡",
      values: { activity: "hiit", duration: 20, weight: 70,},
    },
  ],

  // ─── Translations (EN only — install script translates) ───
  t: {
    en: {
      name: "Calories Burned Calculator",
      slug: "calories-burned-calculator",
      subtitle: "Find out how many calories you burn during any exercise or activity using scientifically-validated MET values",
      breadcrumb: "Calories Burned",

      seo: {
        title: "Calories Burned Calculator — 78 Activities | Free MET Tool",
        description: "Calculate calories burned during 78+ exercises and activities using the scientifically-validated MET method from the Compendium of Physical Activities. Compare activities and plan your fitness routine.",
        shortDescription: "Calculate how many calories you burn during any exercise or daily activity",
        keywords: [
          "calories burned calculator",
          "exercise calorie calculator",
          "MET calculator",
          "activity calorie counter",
          "workout calorie tracker",
          "calories burned per activity",
          "metabolic equivalent calculator",
          "exercise energy expenditure",
        ],
      },

      calculator: { yourInformation: "Your Activity" },
      ui: {
        yourInformation: "Your Activity",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      // ─── Input Labels ─────────────────────────────────────
      inputs: {
        activity: {
          label: "Activity",
          helpText: "Select your exercise or activity",
          options: {
            // CYCLING
            cyclingLeisure: "Cycling — Leisure (<10 mph)",
            cyclingLight: "Cycling — Light (10-12 mph)",
            cyclingModerate: "Cycling — Moderate (12-14 mph)",
            cyclingVigorous: "Cycling — Vigorous (14-16 mph)",
            cyclingRacing: "Cycling — Racing (16-19 mph)",
            mountainBiking: "Cycling — Mountain biking",
            stationaryModerate: "Cycling — Stationary bike, moderate",
            stationaryVigorous: "Cycling — Stationary bike, vigorous",
            spinning: "Cycling — Spinning / indoor class",
            // DANCE
            aerobicDance: "Dance — Aerobic / Zumba",
            ballroomDance: "Dance — Ballroom, general",
            salsaDance: "Dance — Salsa / Latin",
            balletDance: "Dance — Ballet",
            // GYM & FITNESS
            circuitTraining: "Gym — Circuit training",
            elliptical: "Gym — Elliptical trainer",
            hiit: "Gym — HIIT / interval training",
            jumpRope: "Gym — Jump rope",
            pilates: "Gym — Pilates",
            rowingMachine: "Gym — Rowing machine",
            stairStepper: "Gym — Stair machine / stepper",
            stretching: "Gym — Stretching, light",
            weightliftingLight: "Gym — Weight lifting, light",
            weightliftingVigorous: "Gym — Weight lifting, vigorous",
            yogaHatha: "Gym — Yoga, hatha",
            yogaPower: "Gym — Yoga, power / vinyasa",
            calisthenics: "Gym — Calisthenics (pushups, pullups)",
            // HOME & DAILY
            cleaning: "Home — Cleaning, general",
            cooking: "Home — Cooking",
            gardening: "Home — Gardening",
            mowingLawn: "Home — Mowing lawn (push mower)",
            movingFurniture: "Home — Moving furniture",
            playingWithKids: "Home — Playing with children",
            shovelingSnow: "Home — Shoveling snow",
            // MARTIAL ARTS
            boxingSparring: "Martial Arts — Boxing, sparring",
            kickboxing: "Martial Arts — Kickboxing",
            martialArtsModerate: "Martial Arts — Judo / karate",
            taiChi: "Martial Arts — Tai chi",
            // OUTDOOR
            hiking: "Outdoor — Hiking, cross-country",
            kayaking: "Outdoor — Kayaking",
            paddleboarding: "Outdoor — Stand-up paddleboarding",
            rockClimbing: "Outdoor — Rock climbing",
            rowingOutdoor: "Outdoor — Rowing, moderate",
            skiingCrossCountry: "Outdoor — Skiing, cross-country",
            // RUNNING
            jogging: "Running — Jogging, general",
            running5: "Running — 5 mph (12 min/mile)",
            running6: "Running — 6 mph (10 min/mile)",
            running7: "Running — 7 mph (8.5 min/mile)",
            running8: "Running — 8 mph (7.5 min/mile)",
            running9: "Running — 9 mph (6.7 min/mile)",
            running10: "Running — 10 mph (6 min/mile)",
            // SPORTS
            badminton: "Sports — Badminton",
            baseball: "Sports — Baseball / softball",
            basketball: "Sports — Basketball, game",
            bowling: "Sports — Bowling",
            golfWalking: "Sports — Golf (walking w/ clubs)",
            hockey: "Sports — Hockey",
            racquetball: "Sports — Racquetball",
            skiingDownhill: "Sports — Skiing, downhill",
            iceSkating: "Sports — Ice skating",
            snowboarding: "Sports — Snowboarding",
            soccer: "Sports — Soccer, competitive",
            tableTennis: "Sports — Table tennis / ping pong",
            tennisSingles: "Sports — Tennis, singles",
            tennisDoubles: "Sports — Tennis, doubles",
            volleyball: "Sports — Volleyball",
            // SWIMMING
            aquaAerobics: "Swimming — Water aerobics",
            swimmingBackstroke: "Swimming — Backstroke",
            swimmingBreaststroke: "Swimming — Breaststroke",
            swimmingButterfly: "Swimming — Butterfly",
            swimmingModerate: "Swimming — Freestyle, moderate",
            swimmingVigorous: "Swimming — Freestyle, vigorous",
            treading: "Swimming — Treading water",
            // WALKING
            walkingSlow: "Walking — Slow pace (2 mph)",
            walkingModerate: "Walking — Moderate (3 mph)",
            walkingBrisk: "Walking — Brisk (3.5 mph)",
            walkingVeryBrisk: "Walking — Very brisk (4 mph)",
            walkingUphill: "Walking — Uphill",
            raceWalking: "Walking — Race walking",
          },
        },
        duration: {
          label: "Duration (minutes)",
          helpText: "Exercise time in minutes (e.g. 30 min = half hour)",
        },
        weight: {
          label: "Your Weight",
          helpText: "Used to estimate calorie burn — heavier people burn more",
        },
      },

      // ─── Results ──────────────────────────────────────────
      results: {
        caloriesBurned: { label: "Calories Burned" },
        metValue: { label: "MET Value" },
        caloriesPerHour: { label: "Calories Per Hour" },
        fatEquivalent: { label: "Fat Equivalent" },
        intensity: { label: "Intensity Level" },
        weeklyBurn: { label: "3× Per Week" },
      },

      tooltips: {
        caloriesBurned: "Total estimated calories burned during the activity",
        metValue: "Metabolic Equivalent of Task — how intense the activity is relative to rest",
        caloriesPerHour: "Projected calorie burn if sustained for one full hour",
        fatEquivalent: "Approximate grams of body fat equivalent to calories burned (1 lb fat ≈ 3,500 cal)",
        intensity: "Activity classification based on MET value: Light (<3), Moderate (3-6), Vigorous (>6)",
        weeklyBurn: "Total calories if you do this activity 3 times per week",
      },

      // ─── Presets ──────────────────────────────────────────
      presets: {
        quickWalk: { label: "Quick Walk", description: "30 min brisk walk" },
        cardioRun: { label: "Cardio Run", description: "30 min run at 6 mph" },
        gymSession: { label: "Gym Session", description: "60 min weight lifting" },
        hiitWorkout: { label: "HIIT Workout", description: "20 min high-intensity" },
      },

      // ─── Values (dynamic translations) ────────────────────
      values: {
        "cal": "cal",
        "kcal": "kcal",
        "g": "g",
        "lbs": "lbs",
        "kg": "kg",
        "min": "min",
        "hr": "hr",
        "Light": "Light",
        "Moderate": "Moderate",
        "Vigorous": "Vigorous",
        // Chart activity labels
        "Walking": "Walking",
        "Jogging": "Jogging",
        "Running": "Running",
        "Cycling": "Cycling",
        "Swimming": "Swimming",
        "Weights": "Weights",
        "Basketball": "Basketball",
        "Jump Rope": "Jump Rope",
        "HIIT": "HIIT",
        "Dance": "Dance",
      },

      // ─── Formats ──────────────────────────────────────────
      formats: {
        summary: "You burn approximately {caloriesBurned} calories in {duration} minutes of {activity}. That's equivalent to about {fatEquivalent} of body fat. Intensity: {intensity} ({metValue} METs).",
      },

      // ─── Chart ────────────────────────────────────────────
      charts: {
        title: "Calories Burned Comparison",
        series: {
          calories: "Calories",
        },
      },

      // ─── InfoCards ────────────────────────────────────────
      infoCards: {
        activityInfo: {
          title: "🔥 Your Burn",
        },
        burnProjection: {
          title: "📊 Projections",
        },
        tips: {
          title: "💡 Quick Tips",
          items: [
            "MET values are population averages — your actual burn varies with fitness level and body composition",
            "Heavier individuals burn more calories performing the same activity at the same intensity",
            "Higher intensity burns more calories per minute, but moderate exercise is easier to sustain",
            "Allow for ±15-20% variation in these estimates compared to actual energy expenditure",
          ],
        },
      },

      // ─── Reference Data ───────────────────────────────────
      referenceData: {
        metLevels: {
          title: "MET Intensity Classifications",
          items: {
            sedentary: { label: "Sedentary", value: "1.0 – 1.5 METs (sitting, reclining)" },
            light: { label: "Light Activity", value: "1.6 – 2.9 METs (slow walking, cooking)" },
            moderate: { label: "Moderate Activity", value: "3.0 – 5.9 METs (brisk walking, cycling)" },
            vigorous: { label: "Vigorous Activity", value: "6.0 – 8.9 METs (jogging, basketball)" },
            veryVigorous: { label: "Very Vigorous", value: "9.0+ METs (running, jump rope)" },
          },
        },
      },

      // ─── Education Sections ───────────────────────────────
      education: {
        whatIsMET: {
          title: "What Is a MET and How Does It Measure Calories?",
          content: "A MET (Metabolic Equivalent of Task) is a unit that measures the energy cost of physical activity relative to rest. One MET equals the energy your body uses while sitting quietly — approximately 3.5 mL of oxygen per kilogram of body weight per minute, or about 1 kilocalorie per kilogram per hour. When an activity has a MET value of 5, it means you're expending five times more energy than at rest. The MET system was developed by researchers to standardize how we compare the intensity of different activities, from light housework to competitive athletics. The 2011 Compendium of Physical Activities catalogs 821 activities with their measured MET values, making it the most comprehensive scientific resource for estimating calorie expenditure. This calculator uses the standard formula: Calories = (MET × 3.5 × weight in kg) / 200 × duration in minutes.",
        },
        howToUse: {
          title: "How to Get Accurate Results",
          content: "For the most accurate calorie estimate, select the activity that most closely matches what you actually did — intensity matters significantly. A casual neighborhood bike ride (4.0 METs) burns roughly half the calories of moderate road cycling at 12-14 mph (8.0 METs). Enter your actual body weight, as it directly affects the calculation: a 200 lb person burns about 30% more calories than a 150 lb person doing the identical activity. Duration should reflect your active exercise time, excluding warm-up, cool-down, and rest periods between sets. Keep in mind that MET values represent steady-state energy expenditure — if you took breaks during your workout, your actual burn will be somewhat lower than the estimate. For weight training, count total time including rest between sets, as the MET value already accounts for typical rest intervals.",
        },
        factors: {
          title: "Factors That Affect Your Calorie Burn",
          items: [
            { text: "Body weight is the single biggest factor — heavier people burn significantly more calories for the same activity and duration", type: "info" },
            { text: "Exercise intensity has a multiplier effect — running at 8 mph burns 43% more calories than running at 6 mph", type: "info" },
            { text: "Fitness level matters — trained athletes are more metabolically efficient and may burn slightly fewer calories at the same MET level", type: "info" },
            { text: "Age reduces resting metabolic rate by roughly 1-2% per decade after age 20, which slightly lowers total burn", type: "info" },
            { text: "Environmental conditions like heat, cold, altitude, and humidity can increase energy expenditure by 5-15%", type: "info" },
            { text: "Body composition plays a role — more muscle mass means a higher resting metabolic rate and slightly more calories burned", type: "warning" },
            { text: "EPOC (afterburn effect) is not included in MET calculations — vigorous exercise can elevate your metabolism for hours afterward", type: "warning" },
          ],
        },
        accuracy: {
          title: "How Accurate Are MET-Based Estimates?",
          items: [
            { text: "MET values from the Compendium are based on measured oxygen consumption in laboratory settings, making them scientifically validated", type: "info" },
            { text: "Individual variation is typically ±15-20% due to differences in fitness, technique, and body composition", type: "warning" },
            { text: "Fitness trackers and smartwatches often overestimate calorie burn by 27-93% compared to laboratory measurements (Stanford study)", type: "warning" },
            { text: "MET-based calculations assume a constant exercise rate — intermittent activities like team sports will have more variation", type: "info" },
            { text: "The standard 3.5 mL/kg/min oxygen baseline was derived from a 40-year-old, 70 kg male — it may overestimate for smaller or older individuals", type: "info" },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step examples using the MET formula",
          examples: [
            {
              title: "Running at 6 mph — 155 lb person, 30 minutes",
              steps: [
                "Step 1: Convert weight → 155 lbs ÷ 2.205 = 70.3 kg",
                "Step 2: Find MET value → Running 6 mph = 9.8 METs",
                "Step 3: Apply formula → (9.8 × 3.5 × 70.3) / 200 = 12.06 cal/min",
                "Step 4: Multiply by duration → 12.06 × 30 = 361.8 cal",
              ],
              result: "Total: ~362 calories burned",
            },
            {
              title: "Brisk Walking — 180 lb person, 45 minutes",
              steps: [
                "Step 1: Convert weight → 180 lbs ÷ 2.205 = 81.6 kg",
                "Step 2: Find MET value → Brisk walking 3.5 mph = 4.3 METs",
                "Step 3: Apply formula → (4.3 × 3.5 × 81.6) / 200 = 6.14 cal/min",
                "Step 4: Multiply by duration → 6.14 × 45 = 276.4 cal",
              ],
              result: "Total: ~276 calories burned",
            },
          ],
        },
      },

      // ─── FAQs ─────────────────────────────────────────────
      faqs: [
        {
          question: "What is a MET and why is it used to calculate calories?",
          answer: "A MET (Metabolic Equivalent of Task) measures how much energy an activity requires compared to sitting at rest. One MET equals approximately 1 kcal/kg/hour. The system was developed by exercise scientists and is used by the American College of Sports Medicine, the WHO, and researchers worldwide. It provides the most standardized and scientifically-validated way to estimate calorie expenditure across different activities.",
        },
        {
          question: "How accurate is this calories burned calculator?",
          answer: "MET-based calculations are considered the gold standard for estimating energy expenditure from self-reported activity, with typical accuracy within ±15-20%. However, individual factors like fitness level, body composition, exercise technique, and environmental conditions can affect actual calorie burn. For comparison, consumer fitness trackers have been shown to overestimate by 27-93% in research studies.",
        },
        {
          question: "Does body weight really affect how many calories I burn?",
          answer: "Yes, significantly. Body weight is directly proportional in the calorie formula — a 200 lb person burns roughly 33% more calories than a 150 lb person doing the exact same activity for the same duration. This is because moving a heavier body requires more energy. It's one of the most important variables in the calculation.",
        },
        {
          question: "What exercise burns the most calories?",
          answer: "Based on MET values, the highest-calorie activities include running at 10 mph (14.5 METs), swimming butterfly (13.8 METs), running at 9 mph (12.8 METs), and jump rope (10.0 METs). However, sustainability matters — most people can sustain moderate activities like brisk walking or cycling much longer, potentially burning more total calories per session.",
        },
        {
          question: "Why does this calculator show different results than my fitness tracker?",
          answer: "Fitness trackers use heart rate and accelerometer data with proprietary algorithms, while this calculator uses scientifically-measured MET values from the Compendium of Physical Activities. Research from Stanford University found that popular wearable devices overestimate calorie burn by 27-93%. MET-based calculations, while not perfect, use validated scientific data and are generally considered more reliable for estimating exercise energy expenditure.",
        },
        {
          question: "Does this include the 'afterburn effect' (EPOC)?",
          answer: "No, MET values measure the energy cost during the activity itself. EPOC (Excess Post-Exercise Oxygen Consumption), often called the 'afterburn effect,' can increase your total calorie expenditure by 6-15% for moderate exercise and up to 15-25% for high-intensity exercise. This additional burn occurs in the hours following vigorous activity as your body returns to its resting state.",
        },
        {
          question: "How many calories should I burn per day through exercise?",
          answer: "The American Heart Association recommends at least 150 minutes of moderate-intensity aerobic activity (3.0-6.0 METs) or 75 minutes of vigorous activity (>6.0 METs) per week. In MET-minutes, the target is 500-1,000 MET-minutes per week for substantial health benefits. For weight loss, creating a deficit of 500-750 calories per day through a combination of diet and exercise is commonly recommended.",
        },
        {
          question: "Are the MET values the same for everyone?",
          answer: "MET values from the Compendium are population averages based on measured oxygen consumption in adults aged 19-59. Trained athletes may be more metabolically efficient (burning slightly fewer calories), while beginners or older adults may burn slightly more. The standard baseline of 3.5 mL O₂/kg/min was derived from a 70 kg, 40-year-old male, so individual resting metabolic rates may differ.",
        },
      ],

      // ─── Standard UI Blocks (copy from template) ──────────
      rating: {
        title: "Rate this Calculator",
        share: "Share",
        copied: "Copied!",
        copyLink: "Copy Link",
        clickToRate: "Click to rate",
        youRated: "You rated",
        stars: "stars",
        averageFrom: "average from",
        ratings: "ratings",
      },
      common: { home: "Home", calculators: "Calculators" },
      buttons: {
        calculate: "Calculate",
        reset: "Reset",
        pdf: "PDF",
        csv: "CSV",
        excel: "Excel",
        save: "Save",
        saved: "Saved",
        saving: "Saving...",
      },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: {
        mobileResults: "Results summary",
        closeModal: "Close",
        openMenu: "Open menu",
      },
      sources: { title: "Sources & References" },
    },
  },

  // ─── Inputs ───────────────────────────────────────────────
  inputs: [
    {
      id: "activity",
      type: "select",
      defaultValue: "running6",
      options: ACTIVITY_IDS.map((id) => ({ value: id })),
    },
    {
      id: "duration",
      type: "number",
      defaultValue: 30,
      min: 5,
      max: 240,
      step: 5,
      suffix: "min",
    },
                {
      id: "weight",
      type: "number",
      defaultValue: null,
      placeholder: "180",
      step: 0.5,
      unitType: "weight",
      syncGroup: false,
      defaultUnit: "lbs",
      allowedUnits: ["kg", "lbs"],
    },  ],

  inputGroups: [],

  // ─── Results ──────────────────────────────────────────────
  results: [
    { id: "caloriesBurned", type: "primary", format: "number" },
    { id: "metValue", type: "secondary", format: "number" },
    { id: "caloriesPerHour", type: "secondary", format: "number" },
    { id: "fatEquivalent", type: "secondary", format: "text" },
    { id: "intensity", type: "secondary", format: "text" },
    { id: "weeklyBurn", type: "secondary", format: "number" },
  ],

  // ─── Chart (bar comparison) ───────────────────────────────
  chart: {
    type: "bar",
    xKey: "activity",
    series: [{ key: "calories", color: "#f97316" }],
  },

  // ─── InfoCards ────────────────────────────────────────────
  infoCards: [
    {
      id: "activityInfo",
      type: "list",
      icon: "🔥",
      items: [
        { label: "Calories Burned", valueKey: "caloriesBurned" },
        { label: "MET Value", valueKey: "metValue" },
        { label: "Intensity Level", valueKey: "intensity" },
      ],
    },
    {
      id: "burnProjection",
      type: "list",
      icon: "📊",
      items: [
        { label: "Calories Per Hour", valueKey: "caloriesPerHour" },
        { label: "Fat Equivalent", valueKey: "fatEquivalent" },
        { label: "3× Per Week", valueKey: "weeklyBurn" },
      ],
    },
    {
      id: "tips",
      type: "horizontal",
      icon: "💡",
      itemCount: 4,
    },
  ],

  // ─── Reference Data ───────────────────────────────────────
  referenceData: [
    {
      id: "metLevels",
      icon: "📋",
      columns: 2,
      itemIds: ["sedentary", "light", "moderate", "vigorous", "veryVigorous"],
    },
  ],

  // ─── Education Sections ───────────────────────────────────
  educationSections: [
    { id: "whatIsMET", type: "prose", icon: "📖" },
    { id: "howToUse", type: "prose", icon: "⚙️" },
    { id: "factors", type: "list", icon: "⚡", itemCount: 7 },
    { id: "accuracy", type: "list", icon: "🎯", itemCount: 5 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  // ─── FAQs ─────────────────────────────────────────────────
  faqs: [
    { id: "0" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
  ],

  // ─── References ───────────────────────────────────────────
  references: [
    {
      authors: "Ainsworth BE, Haskell WL, Herrmann SD, et al.",
      year: "2011",
      title: "2011 Compendium of Physical Activities: A Second Update of Codes and MET Values",
      source: "Medicine & Science in Sports & Exercise, 43(8):1575-1581",
      url: "https://pubmed.ncbi.nlm.nih.gov/21681120/",
    },
    {
      authors: "Shcherbina A, Mattsson CM, Waggott D, et al.",
      year: "2017",
      title: "Accuracy in Wrist-Worn, Sensor-Based Measurements of Heart Rate and Energy Expenditure in a Diverse Cohort",
      source: "Journal of Personalized Medicine, 7(2):3",
      url: "https://pubmed.ncbi.nlm.nih.gov/28538708/",
    },
  ],

  // ─── Hero / Sidebar / Features / Ads ──────────────────────
  hero: {
    badge: "Health",
    rating: { average: 4.9, count: 3200 },
  },

  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: false,
    category: "health",
  },

  features: {
    autoCalculate: true,
    exportPDF: true,
    shareResults: true,
    saveHistory: true,
  },

  relatedCalculators: [
    "bmi-calculator",
    "calorie-calculator",
    "weight-loss-calculator",
    "body-fat-calculator",
  ],

  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
  },
};

// ═══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════
export function calculateCaloriesBurned(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;

  // ─── Translations ──────────────────────────────────────────
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ─── Read Inputs ───────────────────────────────────────────
  const activityId = values.activity as string;
  const duration = values.duration as number;

  // Weight conversion using Unit Engine
  const rawWeight = values.weight as number | null;
  if (!rawWeight || rawWeight <= 0 || !duration || duration <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }
  const weightKg = convertToBase(rawWeight, fieldUnits.weight || "lbs", "weight");

  // ─── Core Calculation ──────────────────────────────────────
  const met = ACTIVITY_MET[activityId] || 3.5;

  // Standard MET formula: (MET × 3.5 × weight_kg) / 200 = cal/min
  const calPerMin = (met * 3.5 * weightKg) / 200;
  const totalCalories = calPerMin * duration;
  const calPerHour = calPerMin * 60;

  // Fat equivalent: 1 lb fat ≈ 3,500 cal → 1 g fat ≈ 7.7 cal
  const fatGrams = totalCalories / 7.7;

  // Weekly projection (3x/week)
  const weeklyCalories = totalCalories * 3;

  // Intensity category
  let intensityRaw: string;
  if (met < 3.0) intensityRaw = "Light";
  else if (met < 6.0) intensityRaw = "Moderate";
  else intensityRaw = "Vigorous";

  const intensity = v[intensityRaw] || intensityRaw;

  // ─── Chart Data ────────────────────────────────────────────
  const chartData = CHART_ACTIVITIES.map((a) => {
    const aMet = ACTIVITY_MET[a.key] || 3.5;
    const aCal = Math.round(((aMet * 3.5 * weightKg) / 200) * duration);
    return {
      activity: v[a.labelKey] || a.labelKey,
      calories: aCal,
    };
  });

  // ─── Translate units ───────────────────────────────────────
  const calUnit = v["cal"] || "cal";
  const gUnit = v["g"] || "g";

  // ─── Format fat equivalent ─────────────────────────────────
  let fatFormatted: string;
  if (fatGrams >= 454) {
    // >= 1 lb
    const fatLbs = fatGrams / 453.6;
    fatFormatted = `${fatLbs.toFixed(1)} ${v["lbs"] || "lbs"}`;
  } else {
    fatFormatted = `${Math.round(fatGrams)} ${gUnit}`;
  }

  // ─── Build Summary ─────────────────────────────────────────
  const summaryTemplate =
    f.summary ||
    "You burn approximately {caloriesBurned} calories in {duration} minutes. Intensity: {intensity} ({metValue} METs).";
  const summary = summaryTemplate
    .replace("{caloriesBurned}", Math.round(totalCalories).toLocaleString())
    .replace("{duration}", String(duration))
    .replace("{activity}", activityId)
    .replace("{fatEquivalent}", fatFormatted)
    .replace("{intensity}", intensity)
    .replace("{metValue}", met.toFixed(1));

  // ─── Return ────────────────────────────────────────────────
  return {
    values: {
      caloriesBurned: Math.round(totalCalories),
      metValue: met,
      caloriesPerHour: Math.round(calPerHour),
      fatEquivalent: fatGrams,
      intensity: intensityRaw,
      weeklyBurn: Math.round(weeklyCalories),
    },
    formatted: {
      caloriesBurned: `${Math.round(totalCalories).toLocaleString()} ${calUnit}`,
      metValue: met.toFixed(1),
      caloriesPerHour: `${Math.round(calPerHour).toLocaleString()} ${calUnit}/${v["hr"] || "hr"}`,
      fatEquivalent: fatFormatted,
      intensity: intensity,
      weeklyBurn: `${Math.round(weeklyCalories).toLocaleString()} ${calUnit}`,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
    },
  };
}

export default caloriesBurnedCalculatorConfig;
