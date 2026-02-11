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
    es: {
      "name": "Calculadora de Calorías Quemadas",
      "slug": "calculadora-calorias-quemadas",
      "subtitle": "Descubre cuántas calorías quemas durante cualquier ejercicio o actividad usando valores MET validados científicamente",
      "breadcrumb": "Calorías Quemadas",
      "seo": {
        "title": "Calculadora de Calorías Quemadas — 78 Actividades | Herramienta MET Gratis",
        "description": "Calcula las calorías quemadas durante más de 78 ejercicios y actividades usando el método MET validado científicamente del Compendio de Actividades Físicas. Compara actividades y planifica tu rutina de ejercicios.",
        "shortDescription": "Calcula cuántas calorías quemas durante cualquier ejercicio o actividad diaria",
        "keywords": [
          "calculadora calorías quemadas",
          "calculadora calorías ejercicio",
          "calculadora MET",
          "contador calorías actividad",
          "rastreador calorías entrenamiento",
          "calorías quemadas por actividad",
          "calculadora equivalente metabólico",
          "gasto energético ejercicio"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "activity": {
          "label": "Actividad",
          "helpText": "Selecciona tu ejercicio o actividad",
          "options": {
            "cyclingLeisure": "Ciclismo — Recreativo (<16 km/h)",
            "cyclingLight": "Ciclismo — Ligero (16-19 km/h)",
            "cyclingModerate": "Ciclismo — Moderado (19-22 km/h)",
            "cyclingVigorous": "Ciclismo — Vigoroso (22-26 km/h)",
            "cyclingRacing": "Ciclismo — Competición (26-30 km/h)",
            "mountainBiking": "Ciclismo — Ciclismo de montaña",
            "stationaryModerate": "Ciclismo — Bicicleta estática, moderado",
            "stationaryVigorous": "Ciclismo — Bicicleta estática, vigoroso",
            "spinning": "Ciclismo — Spinning / clase interior",
            "aerobicDance": "Baile — Aeróbicos / Zumba",
            "ballroomDance": "Baile — Salón de baile, general",
            "salsaDance": "Baile — Salsa / Latino",
            "balletDance": "Baile — Ballet",
            "circuitTraining": "Gimnasio — Entrenamiento en circuito",
            "elliptical": "Gimnasio — Máquina elíptica",
            "hiit": "Gimnasio — HIIT / entrenamiento por intervalos",
            "jumpRope": "Gimnasio — Saltar la cuerda",
            "pilates": "Gimnasio — Pilates",
            "rowingMachine": "Gimnasio — Máquina de remo",
            "stairStepper": "Gimnasio — Máquina de escalones",
            "stretching": "Gimnasio — Estiramientos, ligero",
            "weightliftingLight": "Gimnasio — Levantamiento de pesas, ligero",
            "weightliftingVigorous": "Gimnasio — Levantamiento de pesas, vigoroso",
            "yogaHatha": "Gimnasio — Yoga, hatha",
            "yogaPower": "Gimnasio — Yoga, power / vinyasa",
            "calisthenics": "Gimnasio — Calistenia (flexiones, dominadas)",
            "cleaning": "Casa — Limpieza, general",
            "cooking": "Casa — Cocinar",
            "gardening": "Casa — Jardinería",
            "mowingLawn": "Casa — Cortar césped (cortacésped manual)",
            "movingFurniture": "Casa — Mover muebles",
            "playingWithKids": "Casa — Jugar con niños",
            "shovelingSnow": "Casa — Palear nieve",
            "boxingSparring": "Artes Marciales — Boxeo, combate",
            "kickboxing": "Artes Marciales — Kickboxing",
            "martialArtsModerate": "Artes Marciales — Judo / karate",
            "taiChi": "Artes Marciales — Tai chi",
            "hiking": "Exterior — Senderismo, campo traviesa",
            "kayaking": "Exterior — Kayak",
            "paddleboarding": "Exterior — Paddle surf",
            "rockClimbing": "Exterior — Escalada en roca",
            "rowingOutdoor": "Exterior — Remo, moderado",
            "skiingCrossCountry": "Exterior — Esquí de fondo",
            "jogging": "Correr — Trotar, general",
            "running5": "Correr — 8 km/h (7.5 min/km)",
            "running6": "Correr — 10 km/h (6 min/km)",
            "running7": "Correr — 11 km/h (5.4 min/km)",
            "running8": "Correr — 13 km/h (4.6 min/km)",
            "running9": "Correr — 14 km/h (4.3 min/km)",
            "running10": "Correr — 16 km/h (3.75 min/km)",
            "badminton": "Deportes — Bádminton",
            "baseball": "Deportes — Béisbol / softball",
            "basketball": "Deportes — Baloncesto, partido",
            "bowling": "Deportes — Bolos",
            "golfWalking": "Deportes — Golf (caminar con palos)",
            "hockey": "Deportes — Hockey",
            "racquetball": "Deportes — Racquetball",
            "skiingDownhill": "Deportes — Esquí alpino",
            "iceSkating": "Deportes — Patinaje sobre hielo",
            "snowboarding": "Deportes — Snowboard",
            "soccer": "Deportes — Fútbol, competitivo",
            "tableTennis": "Deportes — Ping pong",
            "tennisSingles": "Deportes — Tenis, individual",
            "tennisDoubles": "Deportes — Tenis, dobles",
            "volleyball": "Deportes — Voleibol",
            "aquaAerobics": "Natación — Aeróbicos acuáticos",
            "swimmingBackstroke": "Natación — Espalda",
            "swimmingBreaststroke": "Natación — Pecho",
            "swimmingButterfly": "Natación — Mariposa",
            "swimmingModerate": "Natación — Estilo libre, moderado",
            "swimmingVigorous": "Natación — Estilo libre, vigoroso",
            "treading": "Natación — Mantenerse a flote",
            "walkingSlow": "Caminar — Paso lento (3 km/h)",
            "walkingModerate": "Caminar — Moderado (5 km/h)",
            "walkingBrisk": "Caminar — Rápido (5.5 km/h)",
            "walkingVeryBrisk": "Caminar — Muy rápido (6.5 km/h)",
            "walkingUphill": "Caminar — Cuesta arriba",
            "raceWalking": "Caminar — Marcha atlética"
          }
        },
        "duration": {
          "label": "Duración (minutos)",
          "helpText": "Tiempo de ejercicio en minutos (ej. 30 min = media hora)"
        },
        "weight": {
          "label": "Tu Peso",
          "helpText": "Usado para estimar la quema de calorías — las personas más pesadas queman más"
        }
      },
      "results": {
        "caloriesBurned": {
          "label": "Calorías Quemadas"
        },
        "metValue": {
          "label": "Valor MET"
        },
        "caloriesPerHour": {
          "label": "Calorías Por Hora"
        },
        "fatEquivalent": {
          "label": "Equivalente en Grasa"
        },
        "intensity": {
          "label": "Nivel de Intensidad"
        },
        "weeklyBurn": {
          "label": "3× Por Semana"
        }
      },
      "tooltips": {
        "caloriesBurned": "Total estimado de calorías quemadas durante la actividad",
        "metValue": "Equivalente Metabólico de Tarea — qué tan intensa es la actividad en relación al reposo",
        "caloriesPerHour": "Quema de calorías proyectada si se mantiene durante una hora completa",
        "fatEquivalent": "Gramos aproximados de grasa corporal equivalente a las calorías quemadas (0.45 kg grasa ≈ 3,500 cal)",
        "intensity": "Clasificación de actividad basada en valor MET: Ligera (<3), Moderada (3-6), Vigorosa (>6)",
        "weeklyBurn": "Total de calorías si haces esta actividad 3 veces por semana"
      },
      "presets": {
        "quickWalk": {
          "label": "Caminata Rápida",
          "description": "30 min caminata vigorosa"
        },
        "cardioRun": {
          "label": "Carrera Cardio",
          "description": "30 min carrera a 10 km/h"
        },
        "gymSession": {
          "label": "Sesión de Gimnasio",
          "description": "60 min levantamiento de pesas"
        },
        "hiitWorkout": {
          "label": "Entrenamiento HIIT",
          "description": "20 min alta intensidad"
        }
      },
      "values": {
        "cal": "cal",
        "kcal": "kcal",
        "g": "g",
        "lbs": "lbs",
        "kg": "kg",
        "min": "min",
        "hr": "hr",
        "Light": "Ligera",
        "Moderate": "Moderada",
        "Vigorous": "Vigorosa",
        "Walking": "Caminar",
        "Jogging": "Trotar",
        "Running": "Correr",
        "Cycling": "Ciclismo",
        "Swimming": "Natación",
        "Weights": "Pesas",
        "Basketball": "Baloncesto",
        "Jump Rope": "Saltar Cuerda",
        "HIIT": "HIIT",
        "Dance": "Baile"
      },
      "formats": {
        "summary": "Quemas aproximadamente {caloriesBurned} calorías en {duration} minutos de {activity}. Eso equivale a cerca de {fatEquivalent} de grasa corporal. Intensidad: {intensity} ({metValue} METs)."
      },
      "charts": {
        "title": "Comparación de Calorías Quemadas",
        "series": {
          "calories": "Calorías"
        }
      },
      "infoCards": {
        "activityInfo": {
          "title": "🔥 Tu Quema"
        },
        "burnProjection": {
          "title": "📊 Proyecciones"
        },
        "tips": {
          "title": "💡 Consejos Rápidos",
          "items": [
            "Los valores MET son promedios poblacionales — tu quema real varía con el nivel de condición física y composición corporal",
            "Las personas más pesadas queman más calorías realizando la misma actividad a la misma intensidad",
            "La mayor intensidad quema más calorías por minuto, pero el ejercicio moderado es más fácil de mantener",
            "Permite una variación de ±15-20% en estas estimaciones comparado con el gasto energético real"
          ]
        }
      },
      "referenceData": {
        "metLevels": {
          "title": "Clasificaciones de Intensidad MET",
          "items": {
            "sedentary": {
              "label": "Sedentario",
              "value": "1.0 – 1.5 METs (sentado, recostado)"
            },
            "light": {
              "label": "Actividad Ligera",
              "value": "1.6 – 2.9 METs (caminar lento, cocinar)"
            },
            "moderate": {
              "label": "Actividad Moderada",
              "value": "3.0 – 5.9 METs (caminar rápido, ciclismo)"
            },
            "vigorous": {
              "label": "Actividad Vigorosa",
              "value": "6.0 – 8.9 METs (trotar, baloncesto)"
            },
            "veryVigorous": {
              "label": "Muy Vigorosa",
              "value": "9.0+ METs (correr, saltar cuerda)"
            }
          }
        }
      },
      "education": {
        "whatIsMET": {
          "title": "¿Qué es un MET y cómo mide las calorías?",
          "content": "Un MET (Equivalente Metabólico de Tarea) es una unidad que mide el costo energético de la actividad física en relación al reposo. Un MET equivale a la energía que tu cuerpo usa mientras está sentado tranquilo — aproximadamente 3.5 mL de oxígeno por kilogramo de peso corporal por minuto, o cerca de 1 kilocaloría por kilogramo por hora. Cuando una actividad tiene un valor MET de 5, significa que estás gastando cinco veces más energía que en reposo. El sistema MET fue desarrollado por investigadores para estandarizar cómo comparamos la intensidad de diferentes actividades, desde tareas domésticas ligeras hasta atletismo competitivo. El Compendio de Actividades Físicas de 2011 cataloga 821 actividades con sus valores MET medidos, convirtiéndolo en el recurso científico más completo para estimar el gasto calórico. Esta calculadora usa la fórmula estándar: Calorías = (MET × 3.5 × peso en kg) / 200 × duración en minutos."
        },
        "howToUse": {
          "title": "Cómo obtener resultados precisos",
          "content": "Para la estimación de calorías más precisa, selecciona la actividad que más se parezca a lo que realmente hiciste — la intensidad importa significativamente. Un paseo casual en bicicleta por el barrio (4.0 METs) quema aproximadamente la mitad de las calorías que el ciclismo moderado en carretera a 19-22 km/h (8.0 METs). Ingresa tu peso corporal real, ya que afecta directamente el cálculo: una persona de 90 kg quema cerca de 30% más calorías que una persona de 70 kg haciendo la actividad idéntica. La duración debe reflejar tu tiempo de ejercicio activo, excluyendo calentamiento, enfriamiento y períodos de descanso entre series. Ten en cuenta que los valores MET representan el gasto energético en estado estable — si tomaste descansos durante tu entrenamiento, tu quema real será algo menor que la estimación. Para entrenamiento con pesas, cuenta el tiempo total incluyendo descanso entre series, ya que el valor MET ya considera los intervalos de descanso típicos."
        },
        "factors": {
          "title": "Factores que afectan tu quema de calorías",
          "items": [
            {
              "text": "El peso corporal es el factor individual más grande — las personas más pesadas queman significativamente más calorías para la misma actividad y duración",
              "type": "info"
            },
            {
              "text": "La intensidad del ejercicio tiene un efecto multiplicador — correr a 13 km/h quema 43% más calorías que correr a 10 km/h",
              "type": "info"
            },
            {
              "text": "El nivel de condición física importa — los atletas entrenados son más eficientes metabólicamente y pueden quemar ligeramente menos calorías al mismo nivel MET",
              "type": "info"
            },
            {
              "text": "La edad reduce la tasa metabólica basal aproximadamente 1-2% por década después de los 20 años, lo que disminuye ligeramente la quema total",
              "type": "info"
            },
            {
              "text": "Las condiciones ambientales como calor, frío, altitud y humedad pueden aumentar el gasto energético en 5-15%",
              "type": "info"
            },
            {
              "text": "La composición corporal juega un papel — más masa muscular significa una tasa metabólica basal más alta y ligeramente más calorías quemadas",
              "type": "warning"
            },
            {
              "text": "El EPOC (efecto postcombustión) no se incluye en los cálculos MET — el ejercicio vigoroso puede elevar tu metabolismo durante horas después",
              "type": "warning"
            }
          ]
        },
        "accuracy": {
          "title": "¿Qué tan precisas son las estimaciones basadas en MET?",
          "items": [
            {
              "text": "Los valores MET del Compendio se basan en el consumo de oxígeno medido en laboratorio, haciéndolos científicamente validados",
              "type": "info"
            },
            {
              "text": "La variación individual es típicamente ±15-20% debido a diferencias en condición física, técnica y composición corporal",
              "type": "warning"
            },
            {
              "text": "Los rastreadores de actividad y relojes inteligentes a menudo sobreestiman la quema de calorías en 27-93% comparado con mediciones de laboratorio (estudio de Stanford)",
              "type": "warning"
            },
            {
              "text": "Los cálculos basados en MET asumen una tasa de ejercicio constante — las actividades intermitentes como deportes de equipo tendrán más variación",
              "type": "info"
            },
            {
              "text": "La línea base estándar de 3.5 mL/kg/min de oxígeno se derivó de un hombre de 40 años y 70 kg — puede sobreestimar para individuos más pequeños o mayores",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de cálculo",
          "description": "Ejemplos paso a paso usando la fórmula MET",
          "examples": [
            {
              "title": "Correr a 10 km/h — persona de 70 kg, 30 minutos",
              "steps": [
                "Paso 1: Peso ya en kg → 70 kg",
                "Paso 2: Encontrar valor MET → Correr 10 km/h = 9.8 METs",
                "Paso 3: Aplicar fórmula → (9.8 × 3.5 × 70) / 200 = 12.0 cal/min",
                "Paso 4: Multiplicar por duración → 12.0 × 30 = 360 cal"
              ],
              "result": "Total: ~360 calorías quemadas"
            },
            {
              "title": "Caminata rápida — persona de 80 kg, 45 minutos",
              "steps": [
                "Paso 1: Peso ya en kg → 80 kg",
                "Paso 2: Encontrar valor MET → Caminata rápida 5.5 km/h = 4.3 METs",
                "Paso 3: Aplicar fórmula → (4.3 × 3.5 × 80) / 200 = 6.0 cal/min",
                "Paso 4: Multiplicar por duración → 6.0 × 45 = 270 cal"
              ],
              "result": "Total: ~270 calorías quemadas"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Qué es un MET y por qué se usa para calcular calorías?",
          "answer": "Un MET (Equivalente Metabólico de Tarea) mide cuánta energía requiere una actividad comparada con estar sentado en reposo. Un MET equivale a aproximadamente 1 kcal/kg/hora. El sistema fue desarrollado por científicos del ejercicio y es usado por el Colegio Americano de Medicina Deportiva, la OMS e investigadores mundialmente. Proporciona la forma más estandarizada y científicamente validada de estimar el gasto calórico entre diferentes actividades."
        },
        {
          "question": "¿Qué tan precisa es esta calculadora de calorías quemadas?",
          "answer": "Los cálculos basados en MET se consideran el estándar de oro para estimar el gasto energético de actividad autorreportada, con precisión típica dentro de ±15-20%. Sin embargo, factores individuales como nivel de condición física, composición corporal, técnica de ejercicio y condiciones ambientales pueden afectar la quema real de calorías. Para comparación, los rastreadores de actividad comerciales han mostrado sobreestimar en 27-93% en estudios de investigación."
        },
        {
          "question": "¿El peso corporal realmente afecta cuántas calorías quemo?",
          "answer": "Sí, significativamente. El peso corporal es directamente proporcional en la fórmula de calorías — una persona de 90 kg quema aproximadamente 33% más calorías que una persona de 68 kg haciendo exactamente la misma actividad por la misma duración. Esto es porque mover un cuerpo más pesado requiere más energía. Es una de las variables más importantes en el cálculo."
        },
        {
          "question": "¿Qué ejercicio quema más calorías?",
          "answer": "Basado en valores MET, las actividades de más calorías incluyen correr a 16 km/h (14.5 METs), nadar mariposa (13.8 METs), correr a 14 km/h (12.8 METs) y saltar cuerda (10.0 METs). Sin embargo, la sostenibilidad importa — la mayoría de personas pueden mantener actividades moderadas como caminar vigorosamente o ciclismo mucho más tiempo, potencialmente quemando más calorías totales por sesión."
        },
        {
          "question": "¿Por qué esta calculadora muestra resultados diferentes que mi rastreador de actividad?",
          "answer": "Los rastreadores de actividad usan datos de frecuencia cardíaca y acelerómetro con algoritmos propietarios, mientras esta calculadora usa valores MET medidos científicamente del Compendio de Actividades Físicas. Investigación de la Universidad de Stanford encontró que dispositivos portátiles populares sobreestiman la quema de calorías en 27-93%. Los cálculos basados en MET, aunque no perfectos, usan datos científicos validados y generalmente se consideran más confiables para estimar el gasto energético del ejercicio."
        },
        {
          "question": "¿Esto incluye el 'efecto postcombustión' (EPOC)?",
          "answer": "No, los valores MET miden el costo energético durante la actividad misma. El EPOC (Consumo Excesivo de Oxígeno Post-Ejercicio), a menudo llamado 'efecto postcombustión', puede aumentar tu gasto calórico total en 6-15% para ejercicio moderado y hasta 15-25% para ejercicio de alta intensidad. Esta quema adicional ocurre en las horas siguientes a la actividad vigorosa mientras tu cuerpo regresa a su estado de reposo."
        },
        {
          "question": "¿Cuántas calorías debería quemar por día a través del ejercicio?",
          "answer": "La Asociación Americana del Corazón recomienda al menos 150 minutos de actividad aeróbica de intensidad moderada (3.0-6.0 METs) o 75 minutos de actividad vigorosa (>6.0 METs) por semana. En MET-minutos, la meta es 500-1,000 MET-minutos por semana para beneficios sustanciales de salud. Para pérdida de peso, crear un déficit de 500-750 calorías por día a través de una combinación de dieta y ejercicio es comúnmente recomendado."
        },
        {
          "question": "¿Son los valores MET iguales para todos?",
          "answer": "Los valores MET del Compendio son promedios poblacionales basados en consumo de oxígeno medido en adultos de 19-59 años. Los atletas entrenados pueden ser más eficientes metabólicamente (quemando ligeramente menos calorías), mientras principiantes o adultos mayores pueden quemar ligeramente más. La línea base estándar de 3.5 mL O₂/kg/min se derivó de un hombre de 70 kg de 40 años, así que las tasas metabólicas de reposo individuales pueden diferir."
        }
      ],
      "buttons": {
        "calculate": "Calcular",
        "reset": "Reiniciar",
        "pdf": "PDF",
        "csv": "CSV",
        "excel": "Excel",
        "save": "Guardar",
        "saved": "Guardado",
        "saving": "Guardando..."
      },
      "share": {
        "calculatedWith": "Calculado con Kalcufy.com"
      },
      "ui": {
        "results": "Resultados",
        "yourInformation": "Tu Información"
      },
      "accessibility": {
        "mobileResults": "Resumen de resultados",
        "closeModal": "Cerrar",
        "openMenu": "Abrir menú"
      },
      "rating": {
        "title": "Califica esta Calculadora",
        "share": "Compartir",
        "copied": "¡Copiado!",
        "copyLink": "Copiar Enlace",
        "clickToRate": "Clic para calificar",
        "youRated": "Calificaste",
        "stars": "estrellas",
        "averageFrom": "promedio de",
        "ratings": "calificaciones"
      },
      "common": {
        "home": "Inicio",
        "calculators": "Calculadoras"
      },
      "sources": {
        "title": "Fuentes y Referencias"
      }
    },
    pt: {
      "name": "Calculadora de Calorias Queimadas",
      "slug": "calculadora-calorias-queimadas",
      "subtitle": "Descubra quantas calorias você queima durante qualquer exercício ou atividade usando valores MET cientificamente validados",
      "breadcrumb": "Calorias Queimadas",
      "seo": {
        "title": "Calculadora de Calorias Queimadas — 78 Atividades | Ferramenta MET Gratuita",
        "description": "Calcule calorias queimadas durante mais de 78 exercícios e atividades usando o método MET cientificamente validado do Compêndio de Atividades Físicas. Compare atividades e planeje sua rotina de fitness.",
        "shortDescription": "Calcule quantas calorias você queima durante qualquer exercício ou atividade diária",
        "keywords": [
          "calculadora de calorias queimadas",
          "calculadora de calorias de exercício",
          "calculadora MET",
          "contador de calorias de atividade",
          "rastreador de calorias de treino",
          "calorias queimadas por atividade",
          "calculadora equivalente metabólico",
          "gasto energético de exercício"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "activity": {
          "label": "Atividade",
          "helpText": "Selecione seu exercício ou atividade",
          "options": {
            "cyclingLeisure": "Ciclismo — Lazer (<16 km/h)",
            "cyclingLight": "Ciclismo — Leve (16-19 km/h)",
            "cyclingModerate": "Ciclismo — Moderado (19-23 km/h)",
            "cyclingVigorous": "Ciclismo — Vigoroso (23-26 km/h)",
            "cyclingRacing": "Ciclismo — Corrida (26-30 km/h)",
            "mountainBiking": "Ciclismo — Mountain bike",
            "stationaryModerate": "Ciclismo — Bicicleta ergométrica, moderado",
            "stationaryVigorous": "Ciclismo — Bicicleta ergométrica, vigoroso",
            "spinning": "Ciclismo — Spinning / aula indoor",
            "aerobicDance": "Dança — Aeróbica / Zumba",
            "ballroomDance": "Dança — Salão, geral",
            "salsaDance": "Dança — Salsa / Latina",
            "balletDance": "Dança — Ballet",
            "circuitTraining": "Academia — Treino em circuito",
            "elliptical": "Academia — Elíptico",
            "hiit": "Academia — HIIT / treino intervalado",
            "jumpRope": "Academia — Pular corda",
            "pilates": "Academia — Pilates",
            "rowingMachine": "Academia — Máquina de remo",
            "stairStepper": "Academia — Simulador de escada",
            "stretching": "Academia — Alongamento, leve",
            "weightliftingLight": "Academia — Musculação, leve",
            "weightliftingVigorous": "Academia — Musculação, vigorosa",
            "yogaHatha": "Academia — Yoga, hatha",
            "yogaPower": "Academia — Yoga, power / vinyasa",
            "calisthenics": "Academia — Calistenia (flexões, barras)",
            "cleaning": "Casa — Limpeza, geral",
            "cooking": "Casa — Cozinhar",
            "gardening": "Casa — Jardinagem",
            "mowingLawn": "Casa — Cortar grama (cortador manual)",
            "movingFurniture": "Casa — Mover móveis",
            "playingWithKids": "Casa — Brincar com crianças",
            "shovelingSnow": "Casa — Tirar neve com pá",
            "boxingSparring": "Artes Marciais — Boxe, sparring",
            "kickboxing": "Artes Marciais — Kickboxing",
            "martialArtsModerate": "Artes Marciais — Judô / karatê",
            "taiChi": "Artes Marciais — Tai chi",
            "hiking": "Ao Ar Livre — Caminhada, trilha",
            "kayaking": "Ao Ar Livre — Caiaque",
            "paddleboarding": "Ao Ar Livre — Stand-up paddle",
            "rockClimbing": "Ao Ar Livre — Escalada",
            "rowingOutdoor": "Ao Ar Livre — Remo, moderado",
            "skiingCrossCountry": "Ao Ar Livre — Esqui cross-country",
            "jogging": "Corrida — Trote, geral",
            "running5": "Corrida — 8 km/h (12 min/milha)",
            "running6": "Corrida — 10 km/h (10 min/milha)",
            "running7": "Corrida — 11 km/h (8,5 min/milha)",
            "running8": "Corrida — 13 km/h (7,5 min/milha)",
            "running9": "Corrida — 14 km/h (6,7 min/milha)",
            "running10": "Corrida — 16 km/h (6 min/milha)",
            "badminton": "Esportes — Badminton",
            "baseball": "Esportes — Baseball / softball",
            "basketball": "Esportes — Basquete, jogo",
            "bowling": "Esportes — Boliche",
            "golfWalking": "Esportes — Golfe (caminhando c/ tacos)",
            "hockey": "Esportes — Hockey",
            "racquetball": "Esportes — Racquetball",
            "skiingDownhill": "Esportes — Esqui alpino",
            "iceSkating": "Esportes — Patinação no gelo",
            "snowboarding": "Esportes — Snowboard",
            "soccer": "Esportes — Futebol, competitivo",
            "tableTennis": "Esportes — Tênis de mesa / ping pong",
            "tennisSingles": "Esportes — Tênis, individual",
            "tennisDoubles": "Esportes — Tênis, duplas",
            "volleyball": "Esportes — Vôlei",
            "aquaAerobics": "Natação — Hidroginástica",
            "swimmingBackstroke": "Natação — Costas",
            "swimmingBreaststroke": "Natação — Peito",
            "swimmingButterfly": "Natação — Borboleta",
            "swimmingModerate": "Natação — Crawl, moderado",
            "swimmingVigorous": "Natação — Crawl, vigoroso",
            "treading": "Natação — Batendo perna",
            "walkingSlow": "Caminhada — Ritmo lento (3 km/h)",
            "walkingModerate": "Caminhada — Moderado (5 km/h)",
            "walkingBrisk": "Caminhada — Acelerada (5,5 km/h)",
            "walkingVeryBrisk": "Caminhada — Muito acelerada (6,5 km/h)",
            "walkingUphill": "Caminhada — Subida",
            "raceWalking": "Caminhada — Marcha atlética"
          }
        },
        "duration": {
          "label": "Duração (minutos)",
          "helpText": "Tempo de exercício em minutos (ex: 30 min = meia hora)"
        },
        "weight": {
          "label": "Seu Peso",
          "helpText": "Usado para estimar queima de calorias — pessoas mais pesadas queimam mais"
        }
      },
      "results": {
        "caloriesBurned": {
          "label": "Calorias Queimadas"
        },
        "metValue": {
          "label": "Valor MET"
        },
        "caloriesPerHour": {
          "label": "Calorias Por Hora"
        },
        "fatEquivalent": {
          "label": "Equivalente em Gordura"
        },
        "intensity": {
          "label": "Nível de Intensidade"
        },
        "weeklyBurn": {
          "label": "3× Por Semana"
        }
      },
      "tooltips": {
        "caloriesBurned": "Total estimado de calorias queimadas durante a atividade",
        "metValue": "Equivalente Metabólico da Tarefa — quão intensa é a atividade em relação ao repouso",
        "caloriesPerHour": "Queima projetada de calorias se sustentada por uma hora completa",
        "fatEquivalent": "Gramas aproximadas de gordura corporal equivalentes às calorias queimadas (1 kg gordura ≈ 7.700 cal)",
        "intensity": "Classificação da atividade baseada no valor MET: Leve (<3), Moderada (3-6), Vigorosa (>6)",
        "weeklyBurn": "Total de calorias se você fizer esta atividade 3 vezes por semana"
      },
      "presets": {
        "quickWalk": {
          "label": "Caminhada Rápida",
          "description": "30 min caminhada acelerada"
        },
        "cardioRun": {
          "label": "Corrida Cardio",
          "description": "30 min corrida a 10 km/h"
        },
        "gymSession": {
          "label": "Sessão Academia",
          "description": "60 min musculação"
        },
        "hiitWorkout": {
          "label": "Treino HIIT",
          "description": "20 min alta intensidade"
        }
      },
      "values": {
        "cal": "cal",
        "kcal": "kcal",
        "g": "g",
        "lbs": "lbs",
        "kg": "kg",
        "min": "min",
        "hr": "h",
        "Light": "Leve",
        "Moderate": "Moderada",
        "Vigorous": "Vigorosa",
        "Walking": "Caminhada",
        "Jogging": "Trote",
        "Running": "Corrida",
        "Cycling": "Ciclismo",
        "Swimming": "Natação",
        "Weights": "Musculação",
        "Basketball": "Basquete",
        "Jump Rope": "Pular Corda",
        "HIIT": "HIIT",
        "Dance": "Dança"
      },
      "formats": {
        "summary": "Você queima aproximadamente {caloriesBurned} calorias em {duration} minutos de {activity}. Isso equivale a cerca de {fatEquivalent} de gordura corporal. Intensidade: {intensity} ({metValue} METs)."
      },
      "charts": {
        "title": "Comparação de Calorias Queimadas",
        "series": {
          "calories": "Calorias"
        }
      },
      "infoCards": {
        "activityInfo": {
          "title": "🔥 Sua Queima"
        },
        "burnProjection": {
          "title": "📊 Projeções"
        },
        "tips": {
          "title": "💡 Dicas Rápidas",
          "items": [
            "Valores MET são médias populacionais — sua queima real varia com nível de condicionamento e composição corporal",
            "Indivíduos mais pesados queimam mais calorias realizando a mesma atividade na mesma intensidade",
            "Alta intensidade queima mais calorias por minuto, mas exercício moderado é mais fácil de sustentar",
            "Considere variação de ±15-20% nestas estimativas comparado ao gasto energético real"
          ]
        }
      },
      "referenceData": {
        "metLevels": {
          "title": "Classificações de Intensidade MET",
          "items": {
            "sedentary": {
              "label": "Sedentário",
              "value": "1,0 – 1,5 METs (sentado, reclinado)"
            },
            "light": {
              "label": "Atividade Leve",
              "value": "1,6 – 2,9 METs (caminhada lenta, cozinhar)"
            },
            "moderate": {
              "label": "Atividade Moderada",
              "value": "3,0 – 5,9 METs (caminhada acelerada, ciclismo)"
            },
            "vigorous": {
              "label": "Atividade Vigorosa",
              "value": "6,0 – 8,9 METs (trote, basquete)"
            },
            "veryVigorous": {
              "label": "Muito Vigorosa",
              "value": "9,0+ METs (corrida, pular corda)"
            }
          }
        }
      },
      "education": {
        "whatIsMET": {
          "title": "O que é MET e Como Mede Calorias?",
          "content": "Um MET (Equivalente Metabólico da Tarefa) é uma unidade que mede o custo energético da atividade física em relação ao repouso. Um MET equivale à energia que seu corpo usa enquanto sentado quieto — aproximadamente 3,5 mL de oxigênio por quilograma de peso corporal por minuto, ou cerca de 1 quilocaloria por quilograma por hora. Quando uma atividade tem valor MET de 5, significa que você está gastando cinco vezes mais energia que em repouso. O sistema MET foi desenvolvido por pesquisadores para padronizar como comparamos a intensidade de diferentes atividades, desde tarefas domésticas leves até atletismo competitivo. O Compêndio de Atividades Físicas de 2011 cataloga 821 atividades com seus valores MET medidos, tornando-se o recurso científico mais abrangente para estimar gasto calórico. Esta calculadora usa a fórmula padrão: Calorias = (MET × 3,5 × peso em kg) / 200 × duração em minutos."
        },
        "howToUse": {
          "title": "Como Obter Resultados Precisos",
          "content": "Para a estimativa de calorias mais precisa, selecione a atividade que mais se aproxima do que você realmente fez — a intensidade importa significativamente. Um passeio casual de bicicleta no bairro (4,0 METs) queima aproximadamente metade das calorias do ciclismo moderado na estrada a 19-23 km/h (8,0 METs). Digite seu peso corporal real, pois afeta diretamente o cálculo: uma pessoa de 90 kg queima cerca de 30% mais calorias que uma pessoa de 70 kg fazendo a atividade idêntica. A duração deve refletir seu tempo de exercício ativo, excluindo aquecimento, relaxamento e períodos de descanso entre séries. Lembre-se que valores MET representam gasto energético em estado estável — se você fez pausas durante o treino, sua queima real será um pouco menor que a estimativa. Para musculação, conte o tempo total incluindo descanso entre séries, pois o valor MET já considera intervalos típicos de descanso."
        },
        "factors": {
          "title": "Fatores que Afetam sua Queima de Calorias",
          "items": [
            {
              "text": "Peso corporal é o maior fator — pessoas mais pesadas queimam significativamente mais calorias para a mesma atividade e duração",
              "type": "info"
            },
            {
              "text": "Intensidade do exercício tem efeito multiplicador — correr a 13 km/h queima 43% mais calorias que correr a 10 km/h",
              "type": "info"
            },
            {
              "text": "Nível de condicionamento importa — atletas treinados são mais eficientes metabolicamente e podem queimar ligeiramente menos calorias no mesmo nível MET",
              "type": "info"
            },
            {
              "text": "Idade reduz a taxa metabólica basal em aproximadamente 1-2% por década após os 20 anos, o que diminui ligeiramente a queima total",
              "type": "info"
            },
            {
              "text": "Condições ambientais como calor, frio, altitude e umidade podem aumentar o gasto energético em 5-15%",
              "type": "info"
            },
            {
              "text": "Composição corporal tem papel — mais massa muscular significa taxa metabólica basal maior e ligeiramente mais calorias queimadas",
              "type": "warning"
            },
            {
              "text": "EPOC (efeito pós-queima) não está incluído nos cálculos MET — exercício vigoroso pode elevar seu metabolismo por horas depois",
              "type": "warning"
            }
          ]
        },
        "accuracy": {
          "title": "Quão Precisas são as Estimativas Baseadas em MET?",
          "items": [
            {
              "text": "Valores MET do Compêndio são baseados no consumo de oxigênio medido em laboratório, tornando-os cientificamente validados",
              "type": "info"
            },
            {
              "text": "Variação individual é tipicamente ±15-20% devido a diferenças no condicionamento, técnica e composição corporal",
              "type": "warning"
            },
            {
              "text": "Monitores de fitness e smartwatches frequentemente superestimam a queima de calorias em 27-93% comparado a medições laboratoriais (estudo Stanford)",
              "type": "warning"
            },
            {
              "text": "Cálculos baseados em MET assumem taxa de exercício constante — atividades intermitentes como esportes coletivos terão mais variação",
              "type": "info"
            },
            {
              "text": "A linha de base padrão de 3,5 mL/kg/min de oxigênio foi derivada de um homem de 40 anos e 70 kg — pode superestimar para indivíduos menores ou mais velhos",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo",
          "description": "Exemplos passo a passo usando a fórmula MET",
          "examples": [
            {
              "title": "Corrida a 10 km/h — pessoa de 70 kg, 30 minutos",
              "steps": [
                "Passo 1: Peso já em kg → 70 kg",
                "Passo 2: Encontrar valor MET → Corrida 10 km/h = 9,8 METs",
                "Passo 3: Aplicar fórmula → (9,8 × 3,5 × 70) / 200 = 12,05 cal/min",
                "Passo 4: Multiplicar pela duração → 12,05 × 30 = 361,5 cal"
              ],
              "result": "Total: ~362 calorias queimadas"
            },
            {
              "title": "Caminhada Acelerada — pessoa de 80 kg, 45 minutos",
              "steps": [
                "Passo 1: Peso já em kg → 80 kg",
                "Passo 2: Encontrar valor MET → Caminhada acelerada 5,5 km/h = 4,3 METs",
                "Passo 3: Aplicar fórmula → (4,3 × 3,5 × 80) / 200 = 6,02 cal/min",
                "Passo 4: Multiplicar pela duração → 6,02 × 45 = 270,9 cal"
              ],
              "result": "Total: ~271 calorias queimadas"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "O que é MET e por que é usado para calcular calorias?",
          "answer": "MET (Equivalente Metabólico da Tarefa) mede quanta energia uma atividade requer comparado a sentar em repouso. Um MET equivale a aproximadamente 1 kcal/kg/hora. O sistema foi desenvolvido por cientistas do exercício e é usado pelo Colégio Americano de Medicina Esportiva, a OMS e pesquisadores mundialmente. Fornece a forma mais padronizada e cientificamente validada de estimar gasto calórico entre diferentes atividades."
        },
        {
          "question": "Quão precisa é esta calculadora de calorias queimadas?",
          "answer": "Cálculos baseados em MET são considerados o padrão-ouro para estimar gasto energético de atividade auto-relatada, com precisão típica dentro de ±15-20%. Porém, fatores individuais como nível de condicionamento, composição corporal, técnica de exercício e condições ambientais podem afetar a queima real de calorias. Para comparação, monitores de fitness consumidor mostraram superestimar em 27-93% em estudos de pesquisa."
        },
        {
          "question": "O peso corporal realmente afeta quantas calorias eu queimo?",
          "answer": "Sim, significativamente. O peso corporal é diretamente proporcional na fórmula de calorias — uma pessoa de 90 kg queima aproximadamente 33% mais calorias que uma pessoa de 70 kg fazendo exatamente a mesma atividade pela mesma duração. Isso porque mover um corpo mais pesado requer mais energia. É uma das variáveis mais importantes no cálculo."
        },
        {
          "question": "Qual exercício queima mais calorias?",
          "answer": "Baseado nos valores MET, as atividades de maior queima calórica incluem corrida a 16 km/h (14,5 METs), natação borboleta (13,8 METs), corrida a 14 km/h (12,8 METs) e pular corda (10,0 METs). Porém, sustentabilidade importa — a maioria das pessoas pode sustentar atividades moderadas como caminhada acelerada ou ciclismo por muito mais tempo, potencialmente queimando mais calorias totais por sessão."
        },
        {
          "question": "Por que esta calculadora mostra resultados diferentes do meu monitor de fitness?",
          "answer": "Monitores de fitness usam dados de frequência cardíaca e acelerômetro com algoritmos proprietários, enquanto esta calculadora usa valores MET cientificamente medidos do Compêndio de Atividades Físicas. Pesquisa da Universidade Stanford descobriu que dispositivos vestíveis populares superestimam a queima calórica em 27-93%. Cálculos baseados em MET, embora não perfeitos, usam dados científicos validados e são geralmente considerados mais confiáveis para estimar gasto energético de exercício."
        },
        {
          "question": "Isso inclui o 'efeito pós-queima' (EPOC)?",
          "answer": "Não, valores MET medem o custo energético durante a atividade em si. EPOC (Consumo Excessivo de Oxigênio Pós-Exercício), frequentemente chamado de 'efeito pós-queima', pode aumentar seu gasto calórico total em 6-15% para exercício moderado e até 15-25% para exercício de alta intensidade. Esta queima adicional ocorre nas horas seguintes à atividade vigorosa conforme seu corpo retorna ao estado de repouso."
        },
        {
          "question": "Quantas calorias devo queimar por dia através do exercício?",
          "answer": "A Associação Americana do Coração recomenda pelo menos 150 minutos de atividade aeróbica de intensidade moderada (3,0-6,0 METs) ou 75 minutos de atividade vigorosa (>6,0 METs) por semana. Em MET-minutos, o alvo é 500-1.000 MET-minutos por semana para benefícios substanciais à saúde. Para perda de peso, criar um déficit de 500-750 calorias por dia através de combinação de dieta e exercício é comumente recomendado."
        },
        {
          "question": "Os valores MET são iguais para todos?",
          "answer": "Valores MET do Compêndio são médias populacionais baseadas no consumo de oxigênio medido em adultos de 19-59 anos. Atletas treinados podem ser mais eficientes metabolicamente (queimando ligeiramente menos calorias), enquanto iniciantes ou adultos mais velhos podem queimar ligeiramente mais. A linha de base padrão de 3,5 mL O₂/kg/min foi derivada de um homem de 70 kg e 40 anos, então taxas metabólicas basais individuais podem diferir."
        }
      ],
      "buttons": {
        "calculate": "Calcular",
        "reset": "Reiniciar",
        "pdf": "PDF",
        "csv": "CSV",
        "excel": "Excel",
        "save": "Salvar",
        "saved": "Salvo",
        "saving": "Salvando..."
      },
      "share": {
        "calculatedWith": "Calculado com Kalcufy.com"
      },
      "ui": {
        "results": "Resultados",
        "yourInformation": "Suas Informações"
      },
      "accessibility": {
        "mobileResults": "Resumo dos resultados",
        "closeModal": "Fechar",
        "openMenu": "Abrir menu"
      },
      "rating": {
        "title": "Avalie esta Calculadora",
        "share": "Compartilhar",
        "copied": "Copiado!",
        "copyLink": "Copiar Link",
        "clickToRate": "Clique para avaliar",
        "youRated": "Você avaliou",
        "stars": "estrelas",
        "averageFrom": "média de",
        "ratings": "avaliações"
      },
      "common": {
        "home": "Início",
        "calculators": "Calculadoras"
      },
      "sources": {
        "title": "Fontes e Referências"
      }
    },
    fr: {
      "name": "Calculateur de Calories Brûlées",
      "slug": "calculateur-calories-brulees",
      "subtitle": "Découvrez combien de calories vous brûlez pendant n'importe quel exercice ou activité en utilisant les valeurs MET scientifiquement validées",
      "breadcrumb": "Calories Brûlées",
      "seo": {
        "title": "Calculateur de Calories Brûlées — 78 Activités | Outil MET Gratuit",
        "description": "Calculez les calories brûlées pendant plus de 78 exercices et activités en utilisant la méthode MET scientifiquement validée du Compendium des Activités Physiques. Comparez les activités et planifiez votre routine fitness.",
        "shortDescription": "Calculez combien de calories vous brûlez pendant n'importe quel exercice ou activité quotidienne",
        "keywords": [
          "calculateur calories brûlées",
          "calculateur calories exercice",
          "calculateur MET",
          "compteur calories activité",
          "tracker calories entraînement",
          "calories brûlées par activité",
          "calculateur équivalent métabolique",
          "dépense énergétique exercice"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "activity": {
          "label": "Activité",
          "helpText": "Sélectionnez votre exercice ou activité",
          "options": {
            "cyclingLeisure": "Cyclisme — Loisir (<16 km/h)",
            "cyclingLight": "Cyclisme — Léger (16-19 km/h)",
            "cyclingModerate": "Cyclisme — Modéré (19-22 km/h)",
            "cyclingVigorous": "Cyclisme — Vigoureux (22-26 km/h)",
            "cyclingRacing": "Cyclisme — Course (26-30 km/h)",
            "mountainBiking": "Cyclisme — VTT",
            "stationaryModerate": "Cyclisme — Vélo stationnaire, modéré",
            "stationaryVigorous": "Cyclisme — Vélo stationnaire, vigoureux",
            "spinning": "Cyclisme — Spinning / cours en salle",
            "aerobicDance": "Danse — Aérobique / Zumba",
            "ballroomDance": "Danse — Salon, général",
            "salsaDance": "Danse — Salsa / Latine",
            "balletDance": "Danse — Ballet",
            "circuitTraining": "Gym — Entraînement en circuit",
            "elliptical": "Gym — Elliptique",
            "hiit": "Gym — HIIT / entraînement fractionné",
            "jumpRope": "Gym — Corde à sauter",
            "pilates": "Gym — Pilates",
            "rowingMachine": "Gym — Rameur",
            "stairStepper": "Gym — Stepper / monte-escaliers",
            "stretching": "Gym — Étirements, légers",
            "weightliftingLight": "Gym — Musculation, légère",
            "weightliftingVigorous": "Gym — Musculation, vigoureuse",
            "yogaHatha": "Gym — Yoga, hatha",
            "yogaPower": "Gym — Yoga, power / vinyasa",
            "calisthenics": "Gym — Callisthénie (pompes, tractions)",
            "cleaning": "Maison — Ménage, général",
            "cooking": "Maison — Cuisine",
            "gardening": "Maison — Jardinage",
            "mowingLawn": "Maison — Tondre la pelouse (tondeuse poussée)",
            "movingFurniture": "Maison — Déménager des meubles",
            "playingWithKids": "Maison — Jouer avec les enfants",
            "shovelingSnow": "Maison — Pelleter la neige",
            "boxingSparring": "Arts Martiaux — Boxe, combat",
            "kickboxing": "Arts Martiaux — Kickboxing",
            "martialArtsModerate": "Arts Martiaux — Judo / karaté",
            "taiChi": "Arts Martiaux — Taï-chi",
            "hiking": "Extérieur — Randonnée, cross-country",
            "kayaking": "Extérieur — Kayak",
            "paddleboarding": "Extérieur — Paddle debout",
            "rockClimbing": "Extérieur — Escalade",
            "rowingOutdoor": "Extérieur — Aviron, modéré",
            "skiingCrossCountry": "Extérieur — Ski de fond",
            "jogging": "Course — Jogging, général",
            "running5": "Course — 8 km/h (7,5 min/km)",
            "running6": "Course — 10 km/h (6 min/km)",
            "running7": "Course — 11 km/h (5,3 min/km)",
            "running8": "Course — 13 km/h (4,7 min/km)",
            "running9": "Course — 14 km/h (4,2 min/km)",
            "running10": "Course — 16 km/h (3,7 min/km)",
            "badminton": "Sports — Badminton",
            "baseball": "Sports — Baseball / softball",
            "basketball": "Sports — Basketball, match",
            "bowling": "Sports — Bowling",
            "golfWalking": "Sports — Golf (marche avec clubs)",
            "hockey": "Sports — Hockey",
            "racquetball": "Sports — Racquetball",
            "skiingDownhill": "Sports — Ski alpin",
            "iceSkating": "Sports — Patinage sur glace",
            "snowboarding": "Sports — Snowboard",
            "soccer": "Sports — Football, compétitif",
            "tableTennis": "Sports — Tennis de table / ping-pong",
            "tennisSingles": "Sports — Tennis, simple",
            "tennisDoubles": "Sports — Tennis, double",
            "volleyball": "Sports — Volleyball",
            "aquaAerobics": "Natation — Aqua-aérobique",
            "swimmingBackstroke": "Natation — Dos crawlé",
            "swimmingBreaststroke": "Natation — Brasse",
            "swimmingButterfly": "Natation — Papillon",
            "swimmingModerate": "Natation — Crawl, modéré",
            "swimmingVigorous": "Natation — Crawl, vigoureux",
            "treading": "Natation — Nage sur place",
            "walkingSlow": "Marche — Rythme lent (3 km/h)",
            "walkingModerate": "Marche — Modérée (5 km/h)",
            "walkingBrisk": "Marche — Rapide (5,5 km/h)",
            "walkingVeryBrisk": "Marche — Très rapide (6,5 km/h)",
            "walkingUphill": "Marche — En montée",
            "raceWalking": "Marche — Marche rapide"
          }
        },
        "duration": {
          "label": "Durée (minutes)",
          "helpText": "Temps d'exercice en minutes (ex: 30 min = une demi-heure)"
        },
        "weight": {
          "label": "Votre Poids",
          "helpText": "Utilisé pour estimer les calories brûlées — les personnes plus lourdes brûlent plus"
        }
      },
      "results": {
        "caloriesBurned": {
          "label": "Calories Brûlées"
        },
        "metValue": {
          "label": "Valeur MET"
        },
        "caloriesPerHour": {
          "label": "Calories par Heure"
        },
        "fatEquivalent": {
          "label": "Équivalent Graisse"
        },
        "intensity": {
          "label": "Niveau d'Intensité"
        },
        "weeklyBurn": {
          "label": "3× par Semaine"
        }
      },
      "tooltips": {
        "caloriesBurned": "Total estimé des calories brûlées pendant l'activité",
        "metValue": "Équivalent Métabolique de Tâche — intensité de l'activité par rapport au repos",
        "caloriesPerHour": "Calories brûlées projetées si maintenues pendant une heure complète",
        "fatEquivalent": "Grammes approximatifs de graisse corporelle équivalents aux calories brûlées (1 lb graisse ≈ 3 500 cal)",
        "intensity": "Classification d'activité basée sur la valeur MET : Léger (<3), Modéré (3-6), Vigoureux (>6)",
        "weeklyBurn": "Total de calories si vous faites cette activité 3 fois par semaine"
      },
      "presets": {
        "quickWalk": {
          "label": "Marche Rapide",
          "description": "30 min marche vive"
        },
        "cardioRun": {
          "label": "Course Cardio",
          "description": "30 min course à 10 km/h"
        },
        "gymSession": {
          "label": "Séance Gym",
          "description": "60 min musculation"
        },
        "hiitWorkout": {
          "label": "Entraînement HIIT",
          "description": "20 min haute intensité"
        }
      },
      "values": {
        "cal": "cal",
        "kcal": "kcal",
        "g": "g",
        "lbs": "lbs",
        "kg": "kg",
        "min": "min",
        "hr": "h",
        "Light": "Léger",
        "Moderate": "Modéré",
        "Vigorous": "Vigoureux",
        "Walking": "Marche",
        "Jogging": "Jogging",
        "Running": "Course",
        "Cycling": "Cyclisme",
        "Swimming": "Natation",
        "Weights": "Musculation",
        "Basketball": "Basketball",
        "Jump Rope": "Corde à Sauter",
        "HIIT": "HIIT",
        "Dance": "Danse"
      },
      "formats": {
        "summary": "Vous brûlez environ {caloriesBurned} calories en {duration} minutes de {activity}. Cela équivaut à environ {fatEquivalent} de graisse corporelle. Intensité : {intensity} ({metValue} METs)."
      },
      "charts": {
        "title": "Comparaison des Calories Brûlées",
        "series": {
          "calories": "Calories"
        }
      },
      "infoCards": {
        "activityInfo": {
          "title": "🔥 Votre Dépense"
        },
        "burnProjection": {
          "title": "📊 Projections"
        },
        "tips": {
          "title": "💡 Conseils Rapides",
          "items": [
            "Les valeurs MET sont des moyennes de population — votre dépense réelle varie selon votre niveau de forme et composition corporelle",
            "Les individus plus lourds brûlent plus de calories en effectuant la même activité à la même intensité",
            "Une intensité plus élevée brûle plus de calories par minute, mais l'exercice modéré est plus facile à maintenir",
            "Prévoyez une variation de ±15-20% de ces estimations par rapport à la dépense énergétique réelle"
          ]
        }
      },
      "referenceData": {
        "metLevels": {
          "title": "Classifications d'Intensité MET",
          "items": {
            "sedentary": {
              "label": "Sédentaire",
              "value": "1,0 – 1,5 METs (assis, allongé)"
            },
            "light": {
              "label": "Activité Légère",
              "value": "1,6 – 2,9 METs (marche lente, cuisine)"
            },
            "moderate": {
              "label": "Activité Modérée",
              "value": "3,0 – 5,9 METs (marche vive, cyclisme)"
            },
            "vigorous": {
              "label": "Activité Vigoureuse",
              "value": "6,0 – 8,9 METs (jogging, basketball)"
            },
            "veryVigorous": {
              "label": "Très Vigoureux",
              "value": "9,0+ METs (course, corde à sauter)"
            }
          }
        }
      },
      "education": {
        "whatIsMET": {
          "title": "Qu'est-ce qu'un MET et Comment Mesure-t-il les Calories ?",
          "content": "Un MET (Équivalent Métabolique de Tâche) est une unité qui mesure le coût énergétique d'une activité physique par rapport au repos. Un MET équivaut à l'énergie que votre corps utilise en position assise tranquille — environ 3,5 mL d'oxygène par kilogramme de poids corporel par minute, ou environ 1 kilocalorie par kilogramme par heure. Quand une activité a une valeur MET de 5, cela signifie que vous dépensez cinq fois plus d'énergie qu'au repos. Le système MET a été développé par les chercheurs pour standardiser la comparaison de l'intensité de différentes activités, des tâches ménagères légères à l'athlétisme de compétition. Le Compendium des Activités Physiques de 2011 catalogue 821 activités avec leurs valeurs MET mesurées, en faisant la ressource scientifique la plus complète pour estimer la dépense calorique. Ce calculateur utilise la formule standard : Calories = (MET × 3,5 × poids en kg) / 200 × durée en minutes."
        },
        "howToUse": {
          "title": "Comment Obtenir des Résultats Précis",
          "content": "Pour l'estimation calorique la plus précise, sélectionnez l'activité qui correspond le mieux à ce que vous avez réellement fait — l'intensité compte énormément. Une balade à vélo décontractée dans le quartier (4,0 METs) brûle environ la moitié des calories du cyclisme modéré sur route à 19-22 km/h (8,0 METs). Entrez votre poids corporel réel, car il affecte directement le calcul : une personne de 90 kg brûle environ 30% plus de calories qu'une personne de 70 kg faisant la même activité. La durée doit refléter votre temps d'exercice actif, excluant l'échauffement, la récupération et les périodes de repos entre les séries. Gardez à l'esprit que les valeurs MET représentent la dépense énergétique en état stable — si vous avez pris des pauses pendant votre entraînement, votre dépense réelle sera un peu plus faible que l'estimation. Pour la musculation, comptez le temps total incluant le repos entre séries, car la valeur MET tient déjà compte des intervalles de repos typiques."
        },
        "factors": {
          "title": "Facteurs Qui Affectent Votre Dépense Calorique",
          "items": [
            {
              "text": "Le poids corporel est le facteur le plus important — les personnes plus lourdes brûlent significativement plus de calories pour la même activité et durée",
              "type": "info"
            },
            {
              "text": "L'intensité de l'exercice a un effet multiplicateur — courir à 13 km/h brûle 43% plus de calories que courir à 10 km/h",
              "type": "info"
            },
            {
              "text": "Le niveau de forme compte — les athlètes entraînés sont plus efficaces métaboliquement et peuvent brûler légèrement moins de calories au même niveau MET",
              "type": "info"
            },
            {
              "text": "L'âge réduit le métabolisme de base d'environ 1-2% par décennie après 20 ans, ce qui diminue légèrement la dépense totale",
              "type": "info"
            },
            {
              "text": "Les conditions environnementales comme la chaleur, le froid, l'altitude et l'humidité peuvent augmenter la dépense énergétique de 5-15%",
              "type": "info"
            },
            {
              "text": "La composition corporelle joue un rôle — plus de masse musculaire signifie un métabolisme de base plus élevé et légèrement plus de calories brûlées",
              "type": "warning"
            },
            {
              "text": "L'EPOC (effet afterburn) n'est pas inclus dans les calculs MET — l'exercice vigoureux peut élever votre métabolisme pendant des heures après",
              "type": "warning"
            }
          ]
        },
        "accuracy": {
          "title": "Quelle Est la Précision des Estimations Basées sur les MET ?",
          "items": [
            {
              "text": "Les valeurs MET du Compendium sont basées sur la consommation d'oxygène mesurée en laboratoire, les rendant scientifiquement validées",
              "type": "info"
            },
            {
              "text": "La variation individuelle est typiquement de ±15-20% due aux différences de forme, technique et composition corporelle",
              "type": "warning"
            },
            {
              "text": "Les trackers de fitness et montres connectées surestiment souvent la dépense calorique de 27-93% par rapport aux mesures de laboratoire (étude Stanford)",
              "type": "warning"
            },
            {
              "text": "Les calculs basés sur les MET supposent un taux d'exercice constant — les activités intermittentes comme les sports d'équipe auront plus de variation",
              "type": "info"
            },
            {
              "text": "La ligne de base standard de 3,5 mL/kg/min d'oxygène était dérivée d'un homme de 40 ans, 70 kg — elle peut surestimer pour les individus plus petits ou plus âgés",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul",
          "description": "Exemples étape par étape utilisant la formule MET",
          "examples": [
            {
              "title": "Course à 10 km/h — personne de 70 kg, 30 minutes",
              "steps": [
                "Étape 1 : Poids déjà en kg → 70 kg",
                "Étape 2 : Trouver la valeur MET → Course à 10 km/h = 9,8 METs",
                "Étape 3 : Appliquer la formule → (9,8 × 3,5 × 70) / 200 = 12,01 cal/min",
                "Étape 4 : Multiplier par la durée → 12,01 × 30 = 360,3 cal"
              ],
              "result": "Total : ~360 calories brûlées"
            },
            {
              "title": "Marche Rapide — personne de 82 kg, 45 minutes",
              "steps": [
                "Étape 1 : Poids déjà en kg → 82 kg",
                "Étape 2 : Trouver la valeur MET → Marche rapide 5,5 km/h = 4,3 METs",
                "Étape 3 : Appliquer la formule → (4,3 × 3,5 × 82) / 200 = 6,19 cal/min",
                "Étape 4 : Multiplier par la durée → 6,19 × 45 = 278,6 cal"
              ],
              "result": "Total : ~279 calories brûlées"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qu'est-ce qu'un MET et pourquoi est-il utilisé pour calculer les calories ?",
          "answer": "Un MET (Équivalent Métabolique de Tâche) mesure combien d'énergie une activité nécessite par rapport à être assis au repos. Un MET équivaut à environ 1 kcal/kg/heure. Le système a été développé par des scientifiques de l'exercice et est utilisé par l'American College of Sports Medicine, l'OMS et des chercheurs du monde entier. Il fournit la façon la plus standardisée et scientifiquement validée d'estimer la dépense calorique à travers différentes activités."
        },
        {
          "question": "Quelle est la précision de ce calculateur de calories brûlées ?",
          "answer": "Les calculs basés sur les MET sont considérés comme l'étalon-or pour estimer la dépense énergétique à partir d'activités auto-rapportées, avec une précision typique de ±15-20%. Cependant, des facteurs individuels comme le niveau de forme, la composition corporelle, la technique d'exercice et les conditions environnementales peuvent affecter la dépense calorique réelle. En comparaison, les trackers de fitness grand public ont montré qu'ils surestiment de 27-93% dans les études de recherche."
        },
        {
          "question": "Le poids corporel affecte-t-il vraiment le nombre de calories que je brûle ?",
          "answer": "Oui, significativement. Le poids corporel est directement proportionnel dans la formule calorique — une personne de 90 kg brûle environ 33% plus de calories qu'une personne de 68 kg faisant exactement la même activité pour la même durée. C'est parce que bouger un corps plus lourd nécessite plus d'énergie. C'est une des variables les plus importantes dans le calcul."
        },
        {
          "question": "Quel exercice brûle le plus de calories ?",
          "answer": "Basé sur les valeurs MET, les activités les plus caloriques incluent la course à 16 km/h (14,5 METs), la nage papillon (13,8 METs), la course à 14 km/h (12,8 METs) et la corde à sauter (10,0 METs). Cependant, la durabilité compte — la plupart des gens peuvent maintenir des activités modérées comme la marche rapide ou le cyclisme beaucoup plus longtemps, brûlant potentiellement plus de calories totales par séance."
        },
        {
          "question": "Pourquoi ce calculateur montre-t-il des résultats différents de mon tracker de fitness ?",
          "answer": "Les trackers de fitness utilisent des données de fréquence cardiaque et d'accéléromètre avec des algorithmes propriétaires, tandis que ce calculateur utilise des valeurs MET scientifiquement mesurées du Compendium des Activités Physiques. Une recherche de l'Université Stanford a trouvé que les appareils portables populaires surestiment la dépense calorique de 27-93%. Les calculs basés sur les MET, bien qu'imparfaits, utilisent des données scientifiques validées et sont généralement considérés comme plus fiables pour estimer la dépense énergétique d'exercice."
        },
        {
          "question": "Cela inclut-il l'effet 'afterburn' (EPOC) ?",
          "answer": "Non, les valeurs MET mesurent le coût énergétique pendant l'activité elle-même. L'EPOC (Consommation d'Oxygène Post-Exercice en Excès), souvent appelé effet 'afterburn', peut augmenter votre dépense calorique totale de 6-15% pour l'exercice modéré et jusqu'à 15-25% pour l'exercice haute intensité. Cette dépense supplémentaire se produit dans les heures suivant l'activité vigoureuse alors que votre corps retourne à son état de repos."
        },
        {
          "question": "Combien de calories devrais-je brûler par jour par l'exercice ?",
          "answer": "L'American Heart Association recommande au moins 150 minutes d'activité aérobique d'intensité modérée (3,0-6,0 METs) ou 75 minutes d'activité vigoureuse (>6,0 METs) par semaine. En MET-minutes, l'objectif est 500-1 000 MET-minutes par semaine pour des bénéfices santé substantiels. Pour la perte de poids, créer un déficit de 500-750 calories par jour par une combinaison de régime et exercice est communément recommandé."
        },
        {
          "question": "Les valeurs MET sont-elles les mêmes pour tout le monde ?",
          "answer": "Les valeurs MET du Compendium sont des moyennes de population basées sur la consommation d'oxygène mesurée chez des adultes âgés de 19-59 ans. Les athlètes entraînés peuvent être plus efficaces métaboliquement (brûlant légèrement moins de calories), tandis que les débutants ou adultes plus âgés peuvent en brûler légèrement plus. La ligne de base standard de 3,5 mL O₂/kg/min était dérivée d'un homme de 70 kg, 40 ans, donc les métabolismes de base individuels peuvent différer."
        }
      ],
      "buttons": {
        "calculate": "Calculer",
        "reset": "Réinitialiser",
        "pdf": "PDF",
        "csv": "CSV",
        "excel": "Excel",
        "save": "Sauvegarder",
        "saved": "Sauvegardé",
        "saving": "Sauvegarde..."
      },
      "share": {
        "calculatedWith": "Calculé avec Kalcufy.com"
      },
      "ui": {
        "results": "Résultats",
        "yourInformation": "Vos Informations"
      },
      "accessibility": {
        "mobileResults": "Résumé des résultats",
        "closeModal": "Fermer",
        "openMenu": "Ouvrir le menu"
      },
      "rating": {
        "title": "Notez cette Calculatrice",
        "share": "Partager",
        "copied": "Copié!",
        "copyLink": "Copier le Lien",
        "clickToRate": "Cliquez pour noter",
        "youRated": "Vous avez noté",
        "stars": "étoiles",
        "averageFrom": "moyenne de",
        "ratings": "évaluations"
      },
      "common": {
        "home": "Accueil",
        "calculators": "Calculatrices"
      },
      "sources": {
        "title": "Sources et Références"
      }
    },
    de: {
      "name": "Kalorienverbrauch Rechner",
      "slug": "kalorienverbrauch-rechner",
      "subtitle": "Finden Sie heraus, wie viele Kalorien Sie bei jeder Übung oder Aktivität verbrennen, basierend auf wissenschaftlich validierten MET-Werten",
      "breadcrumb": "Kalorienverbrauch",
      "seo": {
        "title": "Kalorienverbrauch Rechner — 78 Aktivitäten | Kostenloser MET-Rechner",
        "description": "Berechnen Sie verbrannte Kalorien bei 78+ Übungen und Aktivitäten mit der wissenschaftlich validierten MET-Methode aus dem Compendium of Physical Activities. Vergleichen Sie Aktivitäten und planen Sie Ihr Fitnessprogramm.",
        "shortDescription": "Berechnen Sie, wie viele Kalorien Sie bei jeder Übung oder täglichen Aktivität verbrennen",
        "keywords": [
          "Kalorienverbrauch Rechner",
          "Übung Kalorien Rechner",
          "MET Rechner",
          "Aktivität Kalorienzähler",
          "Workout Kalorien Tracker",
          "Kalorien pro Aktivität",
          "Metabolisches Äquivalent Rechner",
          "Übung Energieverbrauch"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "activity": {
          "label": "Aktivität",
          "helpText": "Wählen Sie Ihre Übung oder Aktivität",
          "options": {
            "cyclingLeisure": "Radfahren — Freizeit (<16 km/h)",
            "cyclingLight": "Radfahren — Leicht (16-19 km/h)",
            "cyclingModerate": "Radfahren — Mäßig (19-23 km/h)",
            "cyclingVigorous": "Radfahren — Kraftvoll (23-26 km/h)",
            "cyclingRacing": "Radfahren — Rennen (26-30 km/h)",
            "mountainBiking": "Radfahren — Mountainbiking",
            "stationaryModerate": "Radfahren — Heimtrainer, mäßig",
            "stationaryVigorous": "Radfahren — Heimtrainer, kraftvoll",
            "spinning": "Radfahren — Spinning / Indoor Kurs",
            "aerobicDance": "Tanzen — Aerobic / Zumba",
            "ballroomDance": "Tanzen — Standardtanz, allgemein",
            "salsaDance": "Tanzen — Salsa / Lateinamerikanisch",
            "balletDance": "Tanzen — Ballett",
            "circuitTraining": "Fitness — Zirkeltraining",
            "elliptical": "Fitness — Ellipsentrainer",
            "hiit": "Fitness — HIIT / Intervalltraining",
            "jumpRope": "Fitness — Seilspringen",
            "pilates": "Fitness — Pilates",
            "rowingMachine": "Fitness — Rudergerät",
            "stairStepper": "Fitness — Steppergerät",
            "stretching": "Fitness — Dehnen, leicht",
            "weightliftingLight": "Fitness — Krafttraining, leicht",
            "weightliftingVigorous": "Fitness — Krafttraining, kraftvoll",
            "yogaHatha": "Fitness — Yoga, Hatha",
            "yogaPower": "Fitness — Yoga, Power / Vinyasa",
            "calisthenics": "Fitness — Körpergewichtstraining (Liegestütze, Klimmzüge)",
            "cleaning": "Haushalt — Putzen, allgemein",
            "cooking": "Haushalt — Kochen",
            "gardening": "Haushalt — Gartenarbeit",
            "mowingLawn": "Haushalt — Rasenmähen (Handmäher)",
            "movingFurniture": "Haushalt — Möbel bewegen",
            "playingWithKids": "Haushalt — Mit Kindern spielen",
            "shovelingSnow": "Haushalt — Schnee schaufeln",
            "boxingSparring": "Kampfsport — Boxen, Sparring",
            "kickboxing": "Kampfsport — Kickboxen",
            "martialArtsModerate": "Kampfsport — Judo / Karate",
            "taiChi": "Kampfsport — Tai Chi",
            "hiking": "Outdoor — Wandern, Gelände",
            "kayaking": "Outdoor — Kajakfahren",
            "paddleboarding": "Outdoor — Stand-up Paddleboarding",
            "rockClimbing": "Outdoor — Klettern",
            "rowingOutdoor": "Outdoor — Rudern, mäßig",
            "skiingCrossCountry": "Outdoor — Skilanglauf",
            "jogging": "Laufen — Joggen, allgemein",
            "running5": "Laufen — 8 km/h (7,5 min/km)",
            "running6": "Laufen — 10 km/h (6 min/km)",
            "running7": "Laufen — 11 km/h (5,5 min/km)",
            "running8": "Laufen — 13 km/h (4,5 min/km)",
            "running9": "Laufen — 14 km/h (4,3 min/km)",
            "running10": "Laufen — 16 km/h (3,8 min/km)",
            "badminton": "Sport — Badminton",
            "baseball": "Sport — Baseball / Softball",
            "basketball": "Sport — Basketball, Spiel",
            "bowling": "Sport — Bowling",
            "golfWalking": "Sport — Golf (zu Fuß mit Schlägern)",
            "hockey": "Sport — Hockey",
            "racquetball": "Sport — Racquetball",
            "skiingDownhill": "Sport — Skifahren, Abfahrt",
            "iceSkating": "Sport — Eislaufen",
            "snowboarding": "Sport — Snowboarding",
            "soccer": "Sport — Fußball, wettkampfmäßig",
            "tableTennis": "Sport — Tischtennis / Ping Pong",
            "tennisSingles": "Sport — Tennis, Einzel",
            "tennisDoubles": "Sport — Tennis, Doppel",
            "volleyball": "Sport — Volleyball",
            "aquaAerobics": "Schwimmen — Wassergymnastik",
            "swimmingBackstroke": "Schwimmen — Rückenschwimmen",
            "swimmingBreaststroke": "Schwimmen — Brustschwimmen",
            "swimmingButterfly": "Schwimmen — Schmetterling",
            "swimmingModerate": "Schwimmen — Freistil, mäßig",
            "swimmingVigorous": "Schwimmen — Freistil, kraftvoll",
            "treading": "Schwimmen — Wassertreten",
            "walkingSlow": "Gehen — Langsam (3 km/h)",
            "walkingModerate": "Gehen — Mäßig (5 km/h)",
            "walkingBrisk": "Gehen — Zügig (5,5 km/h)",
            "walkingVeryBrisk": "Gehen — Sehr zügig (6,5 km/h)",
            "walkingUphill": "Gehen — Bergauf",
            "raceWalking": "Gehen — Gehen (Sport)"
          }
        },
        "duration": {
          "label": "Dauer (Minuten)",
          "helpText": "Übungszeit in Minuten (z.B. 30 Min = halbe Stunde)"
        },
        "weight": {
          "label": "Ihr Gewicht",
          "helpText": "Wird zur Schätzung des Kalorienverbrauchs verwendet — schwerere Personen verbrennen mehr"
        }
      },
      "results": {
        "caloriesBurned": {
          "label": "Verbrannte Kalorien"
        },
        "metValue": {
          "label": "MET-Wert"
        },
        "caloriesPerHour": {
          "label": "Kalorien pro Stunde"
        },
        "fatEquivalent": {
          "label": "Fettäquivalent"
        },
        "intensity": {
          "label": "Intensitätsstufe"
        },
        "weeklyBurn": {
          "label": "3× pro Woche"
        }
      },
      "tooltips": {
        "caloriesBurned": "Geschätzte Gesamtkalorien, die während der Aktivität verbrannt wurden",
        "metValue": "Metabolisches Äquivalent der Aufgabe — wie intensiv die Aktivität im Verhältnis zur Ruhe ist",
        "caloriesPerHour": "Projizierter Kalorienverbrauch bei Fortsetzung über eine volle Stunde",
        "fatEquivalent": "Ungefähre Gramm Körperfett entsprechend den verbrannten Kalorien (1 lb Fett ≈ 3.500 kcal)",
        "intensity": "Aktivitätsklassifikation basierend auf MET-Wert: Leicht (<3), Mäßig (3-6), Kraftvoll (>6)",
        "weeklyBurn": "Gesamtkalorien wenn Sie diese Aktivität 3-mal pro Woche durchführen"
      },
      "presets": {
        "quickWalk": {
          "label": "Kurzer Spaziergang",
          "description": "30 Min zügiges Gehen"
        },
        "cardioRun": {
          "label": "Cardio-Lauf",
          "description": "30 Min Lauf bei 10 km/h"
        },
        "gymSession": {
          "label": "Fitness-Einheit",
          "description": "60 Min Krafttraining"
        },
        "hiitWorkout": {
          "label": "HIIT-Training",
          "description": "20 Min hochintensiv"
        }
      },
      "values": {
        "cal": "kcal",
        "kcal": "kcal",
        "g": "g",
        "lbs": "lbs",
        "kg": "kg",
        "min": "Min",
        "hr": "Std",
        "Light": "Leicht",
        "Moderate": "Mäßig",
        "Vigorous": "Kraftvoll",
        "Walking": "Gehen",
        "Jogging": "Joggen",
        "Running": "Laufen",
        "Cycling": "Radfahren",
        "Swimming": "Schwimmen",
        "Weights": "Krafttraining",
        "Basketball": "Basketball",
        "Jump Rope": "Seilspringen",
        "HIIT": "HIIT",
        "Dance": "Tanzen"
      },
      "formats": {
        "summary": "Sie verbrennen ungefähr {caloriesBurned} Kalorien in {duration} Minuten {activity}. Das entspricht etwa {fatEquivalent} Körperfett. Intensität: {intensity} ({metValue} METs)."
      },
      "charts": {
        "title": "Kalorienverbrauch-Vergleich",
        "series": {
          "calories": "Kalorien"
        }
      },
      "infoCards": {
        "activityInfo": {
          "title": "🔥 Ihr Verbrauch"
        },
        "burnProjection": {
          "title": "📊 Projektionen"
        },
        "tips": {
          "title": "💡 Schnelle Tipps",
          "items": [
            "MET-Werte sind Bevölkerungsdurchschnitte — Ihr tatsächlicher Verbrauch variiert je nach Fitnesslevel und Körperzusammensetzung",
            "Schwerere Personen verbrennen mehr Kalorien bei derselben Aktivität und Intensität",
            "Höhere Intensität verbrennt mehr Kalorien pro Minute, aber moderate Übung ist leichter durchzuhalten",
            "Rechnen Sie mit ±15-20% Abweichung bei diesen Schätzungen im Vergleich zum tatsächlichen Energieverbrauch"
          ]
        }
      },
      "referenceData": {
        "metLevels": {
          "title": "MET-Intensitätsklassifikationen",
          "items": {
            "sedentary": {
              "label": "Sitzend",
              "value": "1,0 – 1,5 METs (sitzen, liegen)"
            },
            "light": {
              "label": "Leichte Aktivität",
              "value": "1,6 – 2,9 METs (langsames Gehen, Kochen)"
            },
            "moderate": {
              "label": "Mäßige Aktivität",
              "value": "3,0 – 5,9 METs (zügiges Gehen, Radfahren)"
            },
            "vigorous": {
              "label": "Kraftvolle Aktivität",
              "value": "6,0 – 8,9 METs (Joggen, Basketball)"
            },
            "veryVigorous": {
              "label": "Sehr kraftvoll",
              "value": "9,0+ METs (Laufen, Seilspringen)"
            }
          }
        }
      },
      "education": {
        "whatIsMET": {
          "title": "Was ist ein MET und wie misst er Kalorien?",
          "content": "Ein MET (Metabolisches Äquivalent der Aufgabe) ist eine Einheit, die die Energiekosten körperlicher Aktivität im Verhältnis zur Ruhe misst. Ein MET entspricht der Energie, die Ihr Körper beim ruhigen Sitzen verbraucht — etwa 3,5 ml Sauerstoff pro Kilogramm Körpergewicht pro Minute oder etwa 1 Kilokalorie pro Kilogramm pro Stunde. Wenn eine Aktivität einen MET-Wert von 5 hat, bedeutet das, dass Sie fünfmal mehr Energie verbrauchen als in Ruhe. Das MET-System wurde von Forschern entwickelt, um zu standardisieren, wie wir die Intensität verschiedener Aktivitäten vergleichen, von leichter Hausarbeit bis zu Wettkampfsport. Das Compendium of Physical Activities von 2011 katalogisiert 821 Aktivitäten mit ihren gemessenen MET-Werten und ist damit die umfassendste wissenschaftliche Ressource zur Schätzung des Kalorienverbrauchs. Dieser Rechner verwendet die Standardformel: Kalorien = (MET × 3,5 × Gewicht in kg) / 200 × Dauer in Minuten."
        },
        "howToUse": {
          "title": "So erhalten Sie genaue Ergebnisse",
          "content": "Für die genaueste Kalorienschätzung wählen Sie die Aktivität, die dem am nächsten kommt, was Sie tatsächlich getan haben — die Intensität spielt eine wichtige Rolle. Eine gemütliche Fahrradtour im Kiez (4,0 METs) verbrennt etwa halb so viele Kalorien wie mäßiges Straßenradfahren mit 19-23 km/h (8,0 METs). Geben Sie Ihr tatsächliches Körpergewicht ein, da es die Berechnung direkt beeinflusst: Eine 90 kg schwere Person verbrennt etwa 30% mehr Kalorien als eine 70 kg schwere Person bei identischer Aktivität. Die Dauer sollte Ihre aktive Übungszeit widerspiegeln, ohne Aufwärm-, Abkühl- und Ruhepausen zwischen den Sätzen. Bedenken Sie, dass MET-Werte den Energieverbrauch im Steady State messen — wenn Sie Pausen während Ihres Trainings eingelegt haben, wird Ihr tatsächlicher Verbrauch etwas niedriger sein als die Schätzung. Beim Krafttraining zählen Sie die Gesamtzeit einschließlich Pausen zwischen den Sätzen, da der MET-Wert bereits typische Ruheintervalle berücksichtigt."
        },
        "factors": {
          "title": "Faktoren, die Ihren Kalorienverbrauch beeinflussen",
          "items": [
            {
              "text": "Körpergewicht ist der wichtigste Faktor — schwerere Personen verbrennen deutlich mehr Kalorien bei derselben Aktivität und Dauer",
              "type": "info"
            },
            {
              "text": "Übungsintensität hat einen Multiplikatoreffekt — Laufen mit 13 km/h verbrennt 43% mehr Kalorien als Laufen mit 10 km/h",
              "type": "info"
            },
            {
              "text": "Fitnesslevel spielt eine Rolle — trainierte Athleten sind metabolisch effizienter und verbrennen möglicherweise etwas weniger Kalorien auf demselben MET-Level",
              "type": "info"
            },
            {
              "text": "Alter reduziert die Ruhestoffwechselrate um etwa 1-2% pro Jahrzehnt nach dem 20. Lebensjahr, was den Gesamtverbrauch leicht senkt",
              "type": "info"
            },
            {
              "text": "Umweltbedingungen wie Hitze, Kälte, Höhe und Luftfeuchtigkeit können den Energieverbrauch um 5-15% erhöhen",
              "type": "info"
            },
            {
              "text": "Körperzusammensetzung spielt eine Rolle — mehr Muskelmasse bedeutet eine höhere Ruhestoffwechselrate und etwas mehr verbrannte Kalorien",
              "type": "warning"
            },
            {
              "text": "EPOC (Nachbrenneffekt) ist nicht in MET-Berechnungen enthalten — kraftvolles Training kann Ihren Stoffwechsel stundenlang danach erhöhen",
              "type": "warning"
            }
          ]
        },
        "accuracy": {
          "title": "Wie genau sind MET-basierte Schätzungen?",
          "items": [
            {
              "text": "MET-Werte aus dem Compendium basieren auf gemessenem Sauerstoffverbrauch in Laborumgebungen und sind damit wissenschaftlich validiert",
              "type": "info"
            },
            {
              "text": "Individuelle Variation beträgt typischerweise ±15-20% aufgrund von Unterschieden in Fitness, Technik und Körperzusammensetzung",
              "type": "warning"
            },
            {
              "text": "Fitness-Tracker und Smartwatches überschätzen den Kalorienverbrauch oft um 27-93% im Vergleich zu Labormessungen (Stanford-Studie)",
              "type": "warning"
            },
            {
              "text": "MET-basierte Berechnungen nehmen eine konstante Übungsrate an — intermittierende Aktivitäten wie Mannschaftssportarten haben mehr Variation",
              "type": "info"
            },
            {
              "text": "Die Standard-3,5 ml/kg/min Sauerstoff-Baseline wurde von einem 40-jährigen, 70 kg schweren Mann abgeleitet — sie kann für kleinere oder ältere Personen überschätzen",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Berechnungsbeispiele",
          "description": "Schritt-für-Schritt-Beispiele mit der MET-Formel",
          "examples": [
            {
              "title": "Laufen mit 10 km/h — 70 kg Person, 30 Minuten",
              "steps": [
                "Schritt 1: Gewicht ist bereits in kg → 70 kg",
                "Schritt 2: MET-Wert finden → Laufen 10 km/h = 9,8 METs",
                "Schritt 3: Formel anwenden → (9,8 × 3,5 × 70) / 200 = 12,005 kcal/min",
                "Schritt 4: Mit Dauer multiplizieren → 12,005 × 30 = 360,15 kcal"
              ],
              "result": "Gesamt: ~360 Kalorien verbrannt"
            },
            {
              "title": "Zügiges Gehen — 82 kg Person, 45 Minuten",
              "steps": [
                "Schritt 1: Gewicht ist bereits in kg → 82 kg",
                "Schritt 2: MET-Wert finden → Zügiges Gehen 5,5 km/h = 4,3 METs",
                "Schritt 3: Formel anwenden → (4,3 × 3,5 × 82) / 200 = 6,16 kcal/min",
                "Schritt 4: Mit Dauer multiplizieren → 6,16 × 45 = 277,2 kcal"
              ],
              "result": "Gesamt: ~277 Kalorien verbrannt"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Was ist ein MET und warum wird er zur Kalorienberechnung verwendet?",
          "answer": "Ein MET (Metabolisches Äquivalent der Aufgabe) misst, wie viel Energie eine Aktivität im Vergleich zum ruhigen Sitzen benötigt. Ein MET entspricht etwa 1 kcal/kg/Stunde. Das System wurde von Sportwissenschaftlern entwickelt und wird vom American College of Sports Medicine, der WHO und Forschern weltweit verwendet. Es bietet die standardisierteste und wissenschaftlich validierteste Methode zur Schätzung des Kalorienverbrauchs bei verschiedenen Aktivitäten."
        },
        {
          "question": "Wie genau ist dieser Kalorienverbrauch-Rechner?",
          "answer": "MET-basierte Berechnungen gelten als Goldstandard für die Schätzung des Energieverbrauchs basierend auf selbstberichteter Aktivität, mit typischer Genauigkeit innerhalb von ±15-20%. Individuelle Faktoren wie Fitnesslevel, Körperzusammensetzung, Übungstechnik und Umweltbedingungen können jedoch den tatsächlichen Kalorienverbrauch beeinflussen. Zum Vergleich: Consumer-Fitness-Tracker überschätzen in Forschungsstudien um 27-93%."
        },
        {
          "question": "Beeinflusst das Körpergewicht wirklich, wie viele Kalorien ich verbrenne?",
          "answer": "Ja, erheblich. Das Körpergewicht ist direkt proportional in der Kalorienformel — eine 90 kg schwere Person verbrennt etwa 33% mehr Kalorien als eine 68 kg schwere Person bei exakt derselben Aktivität für dieselbe Dauer. Das liegt daran, dass die Bewegung eines schwereren Körpers mehr Energie erfordert. Es ist eine der wichtigsten Variablen in der Berechnung."
        },
        {
          "question": "Welche Übung verbrennt die meisten Kalorien?",
          "answer": "Basierend auf MET-Werten gehören zu den kalorienreichsten Aktivitäten: Laufen mit 16 km/h (14,5 METs), Schmetterlingsschwimmen (13,8 METs), Laufen mit 14 km/h (12,8 METs) und Seilspringen (10,0 METs). Jedoch ist Nachhaltigkeit wichtig — die meisten Menschen können moderate Aktivitäten wie zügiges Gehen oder Radfahren viel länger durchhalten und möglicherweise mehr Gesamtkalorien pro Einheit verbrennen."
        },
        {
          "question": "Warum zeigt dieser Rechner andere Ergebnisse als mein Fitness-Tracker?",
          "answer": "Fitness-Tracker verwenden Herzfrequenz- und Beschleunigungsmesser-Daten mit proprietären Algorithmen, während dieser Rechner wissenschaftlich gemessene MET-Werte aus dem Compendium of Physical Activities verwendet. Forschung der Stanford University fand heraus, dass beliebte tragbare Geräte den Kalorienverbrauch um 27-93% überschätzen. MET-basierte Berechnungen sind zwar nicht perfekt, verwenden aber validierte wissenschaftliche Daten und gelten allgemein als zuverlässiger für die Schätzung des Übungsenergieverbrauchs."
        },
        {
          "question": "Ist der 'Nachbrenneffekt' (EPOC) enthalten?",
          "answer": "Nein, MET-Werte messen die Energiekosten während der Aktivität selbst. EPOC (Excess Post-Exercise Oxygen Consumption), oft als 'Nachbrenneffekt' bezeichnet, kann Ihren Gesamtkalorienverbrauch um 6-15% bei moderater Übung und bis zu 15-25% bei hochintensiver Übung erhöhen. Diese zusätzliche Verbrennung tritt in den Stunden nach kraftvoller Aktivität auf, während Ihr Körper in seinen Ruhezustand zurückkehrt."
        },
        {
          "question": "Wie viele Kalorien sollte ich täglich durch Sport verbrennen?",
          "answer": "Die American Heart Association empfiehlt mindestens 150 Minuten moderate aerobe Aktivität (3,0-6,0 METs) oder 75 Minuten kraftvolle Aktivität (>6,0 METs) pro Woche. In MET-Minuten beträgt das Ziel 500-1.000 MET-Minuten pro Woche für erhebliche Gesundheitsvorteile. Für Gewichtsverlust wird allgemein ein Defizit von 500-750 Kalorien pro Tag durch eine Kombination aus Ernährung und Sport empfohlen."
        },
        {
          "question": "Sind die MET-Werte für alle gleich?",
          "answer": "MET-Werte aus dem Compendium sind Bevölkerungsdurchschnitte basierend auf gemessenem Sauerstoffverbrauch bei Erwachsenen im Alter von 19-59 Jahren. Trainierte Athleten können metabolisch effizienter sein (etwas weniger Kalorien verbrennen), während Anfänger oder ältere Erwachsene etwas mehr verbrennen können. Die Standard-Baseline von 3,5 ml O₂/kg/min wurde von einem 70 kg schweren, 40-jährigen Mann abgeleitet, daher können individuelle Ruhestoffwechselraten abweichen."
        }
      ],
      "buttons": {
        "calculate": "Berechnen",
        "reset": "Zurücksetzen",
        "pdf": "PDF",
        "csv": "CSV",
        "excel": "Excel",
        "save": "Speichern",
        "saved": "Gespeichert",
        "saving": "Speichern..."
      },
      "share": {
        "calculatedWith": "Berechnet mit Kalcufy.com"
      },
      "ui": {
        "results": "Ergebnisse",
        "yourInformation": "Ihre Informationen"
      },
      "accessibility": {
        "mobileResults": "Ergebniszusammenfassung",
        "closeModal": "Schließen",
        "openMenu": "Menü öffnen"
      },
      "rating": {
        "title": "Bewerten Sie diesen Rechner",
        "share": "Teilen",
        "copied": "Kopiert!",
        "copyLink": "Link kopieren",
        "clickToRate": "Klicken zum Bewerten",
        "youRated": "Sie haben bewertet",
        "stars": "Sterne",
        "averageFrom": "Durchschnitt von",
        "ratings": "Bewertungen"
      },
      "common": {
        "home": "Startseite",
        "calculators": "Rechner"
      },
      "sources": {
        "title": "Quellen und Referenzen"
      }
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
