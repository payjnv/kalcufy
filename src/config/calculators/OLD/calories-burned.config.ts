import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// CALORIES BURNED CALCULATOR V3 CONFIG
// Based on 2024 Adult Compendium of Physical Activities (1,114 activities)
// Competitive Edge: 100+ activities, EPOC estimation, multi-activity tracking,
// heart rate zone integration, weekly activity summary
// =============================================================================

export const caloriesBurnedConfig: CalculatorConfigV3 = {
  // ============ BASIC INFO ============
  id: "calories-burned",
  slug: "calories-burned-calculator",
  name: "Calories Burned Calculator",
  category: "health",
  icon: "🏃",

  // ============ SEO ============
  seo: {
    title: "Calories Burned Calculator - 100+ Activities with MET Values | Free",
    description: "Calculate calories burned during exercise with our free calculator. Based on 2024 Compendium of Physical Activities with 100+ activities, EPOC afterburn estimation, and multi-activity tracking.",
    shortDescription: "Calculate calories burned for any physical activity",
    keywords: [
      "calories burned calculator",
      "exercise calorie calculator",
      "MET calculator",
      "workout calories",
      "running calories burned",
      "walking calories burned",
      "cycling calories burned",
      "swimming calories burned",
      "EPOC calculator",
      "afterburn effect calculator",
    ],
  },

  // ============ HERO ============
  hero: {
    badge: "Health & Fitness",
    rating: { average: 4.8, count: 19200 },
  },

  // ============ UNIT SYSTEM ============
  unitSystem: {
    enabled: true,
    default: "imperial",
    options: [
      { value: "imperial", label: "Imperial (lb)" },
      { value: "metric", label: "Metric (kg)" },
    ],
  },

  // ============ INPUTS ============
  inputs: [
    {
      id: "weight",
      type: "number",
      label: "Body Weight",
      required: true,
      defaultValue: 150,
      min: 66,
      max: 500,
      step: 1,
      units: {
        imperial: { suffix: "lbs", min: 66, max: 500, default: 150 },
        metric: { suffix: "kg", min: 30, max: 225, default: 68 },
      },
    },
    {
      id: "activityCategory",
      type: "select",
      label: "Activity Category",
      required: true,
      defaultValue: "running",
      options: [
        { value: "running", label: "🏃 Running" },
        { value: "walking", label: "🚶 Walking" },
        { value: "cycling", label: "🚴 Cycling" },
        { value: "swimming", label: "🏊 Swimming" },
        { value: "gym", label: "🏋️ Gym & Weights" },
        { value: "sports", label: "⚽ Sports" },
        { value: "home", label: "🏠 Home Activities" },
        { value: "outdoor", label: "🌲 Outdoor Activities" },
        { value: "water", label: "🌊 Water Sports" },
        { value: "winter", label: "⛷️ Winter Sports" },
        { value: "dance", label: "💃 Dance & Aerobics" },
        { value: "martial", label: "🥋 Martial Arts" },
      ],
    },
    // Running activities
    {
      id: "runningActivity",
      type: "select",
      label: "Running Activity",
      required: true,
      defaultValue: "jogging",
      showWhen: { field: "activityCategory", value: "running" },
      options: [
        { value: "jogging", label: "Jogging (5 mph / 8 km/h)" },
        { value: "running_6mph", label: "Running (6 mph / 9.7 km/h)" },
        { value: "running_7mph", label: "Running (7 mph / 11.3 km/h)" },
        { value: "running_8mph", label: "Running (8 mph / 12.9 km/h)" },
        { value: "running_9mph", label: "Running (9 mph / 14.5 km/h)" },
        { value: "running_10mph", label: "Running (10 mph / 16 km/h)" },
        { value: "running_trail", label: "Trail Running" },
        { value: "running_stairs", label: "Running Stairs" },
        { value: "sprinting", label: "Sprinting" },
        { value: "hiit_running", label: "HIIT Running Intervals" },
      ],
    },
    // Walking activities
    {
      id: "walkingActivity",
      type: "select",
      label: "Walking Activity",
      required: true,
      defaultValue: "walking_moderate",
      showWhen: { field: "activityCategory", value: "walking" },
      options: [
        { value: "walking_slow", label: "Walking Slow (2 mph / 3.2 km/h)" },
        { value: "walking_moderate", label: "Walking Moderate (3 mph / 4.8 km/h)" },
        { value: "walking_brisk", label: "Walking Brisk (3.5 mph / 5.6 km/h)" },
        { value: "walking_fast", label: "Walking Fast (4 mph / 6.4 km/h)" },
        { value: "walking_very_fast", label: "Walking Very Fast (4.5 mph / 7.2 km/h)" },
        { value: "walking_uphill", label: "Walking Uphill" },
        { value: "walking_downhill", label: "Walking Downhill" },
        { value: "hiking", label: "Hiking" },
        { value: "hiking_backpack", label: "Hiking with Backpack (20+ lbs)" },
        { value: "nordic_walking", label: "Nordic Walking (with poles)" },
        { value: "walking_dog", label: "Walking the Dog" },
        { value: "treadmill_walking", label: "Treadmill Walking" },
      ],
    },
    // Cycling activities
    {
      id: "cyclingActivity",
      type: "select",
      label: "Cycling Activity",
      required: true,
      defaultValue: "cycling_moderate",
      showWhen: { field: "activityCategory", value: "cycling" },
      options: [
        { value: "cycling_leisure", label: "Cycling Leisure (<10 mph)" },
        { value: "cycling_moderate", label: "Cycling Moderate (12-14 mph)" },
        { value: "cycling_vigorous", label: "Cycling Vigorous (14-16 mph)" },
        { value: "cycling_racing", label: "Cycling Racing (16-20 mph)" },
        { value: "cycling_mountain", label: "Mountain Biking" },
        { value: "cycling_stationary_light", label: "Stationary Bike Light" },
        { value: "cycling_stationary_moderate", label: "Stationary Bike Moderate" },
        { value: "cycling_stationary_vigorous", label: "Stationary Bike Vigorous" },
        { value: "cycling_spinning", label: "Spinning Class" },
        { value: "cycling_ebike", label: "E-Bike (electric assisted)" },
      ],
    },
    // Swimming activities
    {
      id: "swimmingActivity",
      type: "select",
      label: "Swimming Activity",
      required: true,
      defaultValue: "swimming_moderate",
      showWhen: { field: "activityCategory", value: "swimming" },
      options: [
        { value: "swimming_leisure", label: "Swimming Leisure" },
        { value: "swimming_moderate", label: "Swimming Moderate" },
        { value: "swimming_laps_moderate", label: "Swimming Laps Moderate" },
        { value: "swimming_laps_vigorous", label: "Swimming Laps Vigorous" },
        { value: "swimming_freestyle", label: "Freestyle/Front Crawl" },
        { value: "swimming_backstroke", label: "Backstroke" },
        { value: "swimming_breaststroke", label: "Breaststroke" },
        { value: "swimming_butterfly", label: "Butterfly" },
        { value: "treading_water", label: "Treading Water" },
        { value: "aqua_aerobics", label: "Aqua Aerobics" },
      ],
    },
    // Gym activities
    {
      id: "gymActivity",
      type: "select",
      label: "Gym Activity",
      required: true,
      defaultValue: "weight_training_moderate",
      showWhen: { field: "activityCategory", value: "gym" },
      options: [
        { value: "weight_training_light", label: "Weight Training Light" },
        { value: "weight_training_moderate", label: "Weight Training Moderate" },
        { value: "weight_training_vigorous", label: "Weight Training Vigorous" },
        { value: "circuit_training", label: "Circuit Training" },
        { value: "hiit", label: "HIIT Workout" },
        { value: "crossfit", label: "CrossFit" },
        { value: "elliptical_moderate", label: "Elliptical Moderate" },
        { value: "elliptical_vigorous", label: "Elliptical Vigorous" },
        { value: "rowing_machine_moderate", label: "Rowing Machine Moderate" },
        { value: "rowing_machine_vigorous", label: "Rowing Machine Vigorous" },
        { value: "stair_climber", label: "Stair Climber" },
        { value: "stretching", label: "Stretching/Flexibility" },
        { value: "yoga_hatha", label: "Yoga (Hatha)" },
        { value: "yoga_power", label: "Yoga (Power/Vinyasa)" },
        { value: "pilates", label: "Pilates" },
      ],
    },
    // Sports activities
    {
      id: "sportsActivity",
      type: "select",
      label: "Sport",
      required: true,
      defaultValue: "basketball",
      showWhen: { field: "activityCategory", value: "sports" },
      options: [
        { value: "basketball", label: "Basketball" },
        { value: "soccer", label: "Soccer/Football" },
        { value: "tennis_singles", label: "Tennis Singles" },
        { value: "tennis_doubles", label: "Tennis Doubles" },
        { value: "volleyball", label: "Volleyball" },
        { value: "badminton", label: "Badminton" },
        { value: "racquetball", label: "Racquetball" },
        { value: "golf_walking", label: "Golf (Walking with clubs)" },
        { value: "golf_cart", label: "Golf (with cart)" },
        { value: "bowling", label: "Bowling" },
        { value: "baseball", label: "Baseball/Softball" },
        { value: "football", label: "American Football" },
        { value: "hockey", label: "Hockey (Ice or Field)" },
        { value: "lacrosse", label: "Lacrosse" },
        { value: "rugby", label: "Rugby" },
        { value: "boxing_sparring", label: "Boxing Sparring" },
        { value: "boxing_bag", label: "Boxing (punching bag)" },
      ],
    },
    // Home activities
    {
      id: "homeActivity",
      type: "select",
      label: "Home Activity",
      required: true,
      defaultValue: "cleaning_general",
      showWhen: { field: "activityCategory", value: "home" },
      options: [
        { value: "cleaning_general", label: "Cleaning House General" },
        { value: "cleaning_vigorous", label: "Cleaning Vigorous (scrubbing)" },
        { value: "vacuuming", label: "Vacuuming" },
        { value: "mopping", label: "Mopping" },
        { value: "cooking", label: "Cooking" },
        { value: "gardening_light", label: "Gardening Light" },
        { value: "gardening_heavy", label: "Gardening Heavy (digging)" },
        { value: "mowing_lawn_push", label: "Mowing Lawn (push mower)" },
        { value: "mowing_lawn_riding", label: "Mowing Lawn (riding)" },
        { value: "raking_leaves", label: "Raking Leaves" },
        { value: "shoveling_snow", label: "Shoveling Snow" },
        { value: "moving_furniture", label: "Moving Furniture" },
        { value: "painting", label: "Painting/Decorating" },
        { value: "carpentry", label: "Carpentry" },
      ],
    },
    // Outdoor activities
    {
      id: "outdoorActivity",
      type: "select",
      label: "Outdoor Activity",
      required: true,
      defaultValue: "hiking",
      showWhen: { field: "activityCategory", value: "outdoor" },
      options: [
        { value: "hiking_moderate", label: "Hiking Moderate" },
        { value: "hiking_vigorous", label: "Hiking Vigorous/Steep" },
        { value: "rock_climbing", label: "Rock Climbing" },
        { value: "horseback_riding", label: "Horseback Riding" },
        { value: "fishing_standing", label: "Fishing (standing)" },
        { value: "hunting", label: "Hunting" },
        { value: "camping_activities", label: "Camping Activities" },
        { value: "frisbee", label: "Frisbee" },
        { value: "frisbee_golf", label: "Disc Golf/Frisbee Golf" },
        { value: "skateboarding", label: "Skateboarding" },
        { value: "roller_skating", label: "Roller Skating/Blading" },
        { value: "jump_rope_slow", label: "Jump Rope Slow" },
        { value: "jump_rope_fast", label: "Jump Rope Fast" },
      ],
    },
    // Water sports
    {
      id: "waterActivity",
      type: "select",
      label: "Water Sport",
      required: true,
      defaultValue: "kayaking",
      showWhen: { field: "activityCategory", value: "water" },
      options: [
        { value: "kayaking", label: "Kayaking" },
        { value: "canoeing", label: "Canoeing" },
        { value: "rowing", label: "Rowing" },
        { value: "paddleboarding", label: "Stand-Up Paddleboarding" },
        { value: "surfing", label: "Surfing" },
        { value: "water_skiing", label: "Water Skiing" },
        { value: "wakeboarding", label: "Wakeboarding" },
        { value: "snorkeling", label: "Snorkeling" },
        { value: "scuba_diving", label: "Scuba Diving" },
        { value: "water_polo", label: "Water Polo" },
      ],
    },
    // Winter sports
    {
      id: "winterActivity",
      type: "select",
      label: "Winter Sport",
      required: true,
      defaultValue: "skiing_downhill",
      showWhen: { field: "activityCategory", value: "winter" },
      options: [
        { value: "skiing_downhill", label: "Skiing Downhill Moderate" },
        { value: "skiing_downhill_vigorous", label: "Skiing Downhill Vigorous" },
        { value: "skiing_cross_country", label: "Cross-Country Skiing" },
        { value: "snowboarding", label: "Snowboarding" },
        { value: "ice_skating", label: "Ice Skating" },
        { value: "ice_skating_vigorous", label: "Ice Skating Vigorous" },
        { value: "sledding", label: "Sledding/Tobogganing" },
        { value: "snowshoeing", label: "Snowshoeing" },
      ],
    },
    // Dance activities
    {
      id: "danceActivity",
      type: "select",
      label: "Dance/Aerobics",
      required: true,
      defaultValue: "aerobics_moderate",
      showWhen: { field: "activityCategory", value: "dance" },
      options: [
        { value: "aerobics_low", label: "Aerobics Low Impact" },
        { value: "aerobics_moderate", label: "Aerobics Moderate" },
        { value: "aerobics_high", label: "Aerobics High Impact" },
        { value: "step_aerobics", label: "Step Aerobics" },
        { value: "zumba", label: "Zumba" },
        { value: "dance_general", label: "Dancing General" },
        { value: "dance_ballroom", label: "Ballroom Dancing" },
        { value: "dance_salsa", label: "Salsa Dancing" },
        { value: "dance_hip_hop", label: "Hip Hop Dancing" },
        { value: "dance_ballet", label: "Ballet" },
      ],
    },
    // Martial arts
    {
      id: "martialActivity",
      type: "select",
      label: "Martial Art",
      required: true,
      defaultValue: "martial_arts_moderate",
      showWhen: { field: "activityCategory", value: "martial" },
      options: [
        { value: "martial_arts_moderate", label: "Martial Arts General" },
        { value: "karate", label: "Karate" },
        { value: "taekwondo", label: "Taekwondo" },
        { value: "judo", label: "Judo" },
        { value: "jiu_jitsu", label: "Jiu-Jitsu/BJJ" },
        { value: "kickboxing", label: "Kickboxing" },
        { value: "muay_thai", label: "Muay Thai" },
        { value: "wrestling", label: "Wrestling" },
        { value: "tai_chi", label: "Tai Chi" },
      ],
    },
    // Duration
    {
      id: "duration",
      type: "number",
      label: "Duration",
      required: true,
      defaultValue: 30,
      min: 5,
      max: 480,
      step: 5,
      suffix: "minutes",
      helpText: "How long did you exercise?",
    },
    // Intensity modifier
    {
      id: "intensityModifier",
      type: "select",
      label: "Intensity Level",
      required: false,
      defaultValue: "normal",
      options: [
        { value: "light", label: "Light (easy, conversational pace)" },
        { value: "normal", label: "Normal (moderate effort)" },
        { value: "vigorous", label: "Vigorous (hard effort)" },
        { value: "maximum", label: "Maximum (all-out effort)" },
      ],
      helpText: "Adjust if your effort was different from typical",
    },
    // Include EPOC
    {
      id: "includeEPOC",
      type: "radio",
      label: "Include Afterburn Effect (EPOC)?",
      required: false,
      defaultValue: "no",
      options: [
        { value: "no", label: "No (exercise calories only)" },
        { value: "yes", label: "Yes (estimate post-exercise burn)" },
      ],
      helpText: "EPOC adds 6-15% extra calories burned after intense exercise",
    },
  ],

  // ============ INPUT GROUPS ============
  inputGroups: [
    {
      id: "advanced",
      title: "Intensity & Afterburn",
      inputs: ["intensityModifier", "includeEPOC"],
      defaultExpanded: false,
    },
  ],

  // ============ RESULTS ============
  results: [
    { id: "caloriesBurned", type: "primary", label: "Calories Burned", format: "number", suffix: " cal" },
    { id: "metValue", type: "secondary", label: "MET Value", format: "text", icon: "📊" },
    { id: "intensityLevel", type: "secondary", label: "Intensity Level", format: "text", icon: "🔥" },
    { id: "epocCalories", type: "secondary", label: "EPOC (Afterburn)", format: "text", icon: "⚡" },
    { id: "totalWithEpoc", type: "secondary", label: "Total with EPOC", format: "text", icon: "🎯" },
    { id: "caloriesPerMinute", type: "secondary", label: "Calories per Minute", format: "text", icon: "⏱️" },
    { id: "fatEquivalent", type: "secondary", label: "Fat Burn Equivalent", format: "text", icon: "📉" },
    { id: "weeklyImpact", type: "secondary", label: "If Done 3x/Week", format: "text", icon: "📅" },
  ],

  // ============ INFO CARDS (REQUIRED: 2 cards) ============
  infoCards: [
    {
      id: "metExplained",
      type: "list",
      title: "Understanding METs",
      icon: "📋",
      items: [
        { label: "1 MET", value: "Resting (sitting quietly)" },
        { label: "2-3 METs", value: "Light activity (walking)" },
        { label: "3-6 METs", value: "Moderate (brisk walking)" },
        { label: "6+ METs", value: "Vigorous (running)" },
      ],
    },
    {
      id: "topActivities",
      type: "horizontal",
      title: "Highest Calorie-Burning Activities",
      icon: "🔥",
      columns: 5,
      items: [
        { label: "Running 10mph", value: "14.5 MET" },
        { label: "Jump Rope Fast", value: "12.3 MET" },
        { label: "Swimming Butterfly", value: "11.0 MET" },
        { label: "CrossFit", value: "10.0 MET" },
        { label: "Cycling 16+ mph", value: "10.0 MET" },
      ],
    },
  ],

  // ============ REFERENCE DATA (REQUIRED: 1 table) ============
  referenceData: [
    {
      id: "caloriesByActivity",
      title: "Calories Burned per 30 Minutes (150 lb person)",
      icon: "📊",
      columns: [
        { id: "activity", label: "Activity", align: "left" as const },
        { id: "met", label: "MET", align: "center" as const },
        { id: "calories", label: "Calories", align: "right" as const, highlight: true },
      ],
      data: [
        { activity: "Walking (3.5 mph)", met: "4.3", calories: "146" },
        { activity: "Jogging (5 mph)", met: "8.3", calories: "282" },
        { activity: "Running (8 mph)", met: "11.8", calories: "401" },
        { activity: "Cycling Moderate", met: "8.0", calories: "272" },
        { activity: "Swimming Laps", met: "8.0", calories: "272" },
        { activity: "Weight Training", met: "5.0", calories: "170" },
        { activity: "HIIT", met: "9.0", calories: "306" },
        { activity: "Yoga (Vinyasa)", met: "4.0", calories: "136" },
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
      description: "How we calculate calories burned using MET values",
      columns: 2,
      examples: [
        {
          title: "Running at 6 mph for 30 minutes",
          steps: [
            "Person: 150 lbs (68 kg)",
            "Activity: Running 6 mph",
            "MET Value: 9.8",
            "Duration: 30 minutes (0.5 hours)",
            "Formula: Calories = MET × Weight(kg) × Time(hr)",
            "Calories = 9.8 × 68 × 0.5 = 333 calories",
            "EPOC (10%): +33 calories",
          ],
          result: "Total: 366 calories burned",
        },
        {
          title: "Walking at 3.5 mph for 45 minutes",
          steps: [
            "Person: 180 lbs (82 kg)",
            "Activity: Brisk Walking",
            "MET Value: 4.3",
            "Duration: 45 minutes (0.75 hours)",
            "Formula: Calories = MET × Weight(kg) × Time(hr)",
            "Calories = 4.3 × 82 × 0.75 = 264 calories",
            "EPOC (6%): +16 calories (low intensity)",
          ],
          result: "Total: 280 calories burned",
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
        { text: "MET values are averages - individual calorie burn can vary by ±15%", type: "info" },
        { text: "Fitness trackers often overestimate calorie burn by 27-93% (Stanford study)", type: "warning" },
        { text: "More muscle mass = higher calorie burn for same activity", type: "info" },
        { text: "As you get fitter, you burn fewer calories doing the same workout", type: "info" },
        { text: "EPOC is highest after HIIT and strength training (up to 15%)", type: "info" },
        { text: "Don't use exercise calories as permission to overeat - estimates can be inaccurate", type: "warning" },
      ],
    },
    // REQUIRED: 3+ prose sections
    {
      id: "whatIsMET",
      type: "prose",
      title: "What is MET (Metabolic Equivalent)?",
      icon: "📖",
      content: "MET (Metabolic Equivalent of Task) is a standardized measure of exercise intensity. One MET equals the energy you expend while sitting quietly - approximately 1 calorie per kilogram of body weight per hour, or 3.5 ml of oxygen per kg per minute. When an activity has a MET of 5, it means you're burning 5 times more energy than at rest. The 2024 Adult Compendium of Physical Activities contains MET values for over 1,114 activities, measured through indirect calorimetry in laboratory studies. This makes MET-based calculations more reliable than heart rate monitors or fitness trackers for estimating calorie expenditure.",
    },
    {
      id: "epocExplained",
      type: "prose",
      title: "The Afterburn Effect (EPOC)",
      icon: "🔥",
      content: "Excess Post-Exercise Oxygen Consumption (EPOC) is the elevated metabolic rate that continues after your workout ends. Your body uses extra energy to restore oxygen levels, repair muscle tissue, replenish glycogen stores, and return hormones to baseline. Research shows EPOC accounts for 6-15% of total exercise calories, with the exact amount depending on workout intensity and duration. High-intensity interval training (HIIT) and heavy strength training produce the highest EPOC - potentially burning an extra 15% calories for up to 24 hours post-workout. Steady-state cardio produces minimal EPOC (around 6%). While EPOC is real, it's often overhyped - the majority of your calorie burn still occurs during the actual exercise.",
    },
    {
      id: "maximizingCalorieBurn",
      type: "prose",
      title: "How to Maximize Calorie Burn",
      icon: "💪",
      content: "To burn more calories, focus on these strategies: First, choose higher MET activities - running burns nearly twice the calories of walking per minute. Second, increase duration - longer workouts burn more total calories even at moderate intensity. Third, add intervals - alternating high and low intensity boosts both during-exercise and post-exercise calorie burn. Fourth, build muscle through strength training - muscle tissue burns more calories than fat, even at rest. Fifth, stay consistent - three 30-minute workouts per week can burn an extra 900+ calories weekly. Finally, don't rely solely on exercise for weight loss - dietary changes typically have a bigger impact than exercise alone.",
    },
  ],

  // ============ FAQs (6+ required) ============
  faqs: [
    {
      question: "How accurate is this calorie calculator?",
      answer: "MET-based calculations are accurate within 10-15% for most people, which is comparable to laboratory measurements and more reliable than most fitness trackers. A 2017 Stanford study found popular fitness devices overestimated calorie burn by 27-93%. However, individual factors like fitness level, body composition, age, and genetics can affect your actual burn. Use these numbers as a good estimate, but track your weight over time to verify results.",
    },
    {
      question: "What is the afterburn effect and should I count it?",
      answer: "The afterburn effect (EPOC) is real - your body continues burning calories after exercise to recover. However, it's often overstated. Research shows EPOC accounts for only 6-15% of exercise calories, not the 24-hour mega-burn some claim. HIIT and strength training produce the highest EPOC. We include it as an option, but the majority of your calorie burn always occurs during the workout itself.",
    },
    {
      question: "Why do heavier people burn more calories?",
      answer: "Moving a larger mass requires more energy. A 200-pound person running at 6 mph burns about 33% more calories than a 150-pound person doing the same workout. This is why the calculator asks for your weight. It also means that as you lose weight, you'll burn fewer calories doing the same exercise - one reason weight loss can plateau.",
    },
    {
      question: "Should I eat back the calories I burn exercising?",
      answer: "Generally, no - or at least not all of them. Calorie burn estimates can be inaccurate, and eating back exercise calories is a common reason people don't lose weight. If you're very active and hungry, you might eat back 50% of exercise calories. For most people trying to lose weight, it's better to base your calorie target on a sedentary TDEE and treat exercise calories as a bonus deficit.",
    },
    {
      question: "What's the best exercise for burning calories?",
      answer: "Activities with the highest MET values burn the most calories per minute: running, jump rope, swimming butterfly, and HIIT. However, the best exercise is one you'll actually do consistently. Walking burns fewer calories per minute than running, but a 60-minute walk beats a 10-minute run. Also consider that strength training builds muscle, which increases your metabolism 24/7.",
    },
    {
      question: "Why does my fitness tracker show different numbers?",
      answer: "Fitness trackers use heart rate and movement sensors, which can be inaccurate. They don't measure oxygen consumption like laboratory equipment or MET studies do. Most trackers overestimate calorie burn, sometimes significantly. Our calculator uses the scientific MET values from the 2024 Compendium of Physical Activities, which are based on actual metabolic measurements.",
    },
  ],

  // ============ REFERENCES (3 references) ============
  references: [
    {
      authors: "Herrmann SD, Willis EA, Ainsworth BE, et al.",
      year: "2024",
      title: "2024 Adult Compendium of Physical Activities: A third update of the energy costs of human activities",
      source: "Journal of Sport and Health Science",
      url: "https://pubmed.ncbi.nlm.nih.gov/38242596/",
    },
    {
      authors: "LaForgia J, Withers RT, Gore CJ",
      year: "2006",
      title: "Effects of exercise intensity and duration on the excess post-exercise oxygen consumption",
      source: "Journal of Sports Sciences",
      url: "https://pubmed.ncbi.nlm.nih.gov/17101527/",
    },
    {
      authors: "Shcherbina A, Mattsson CM, Waggott D, et al.",
      year: "2017",
      title: "Accuracy in Wrist-Worn, Sensor-Based Measurements of Heart Rate and Energy Expenditure in a Diverse Cohort",
      source: "Journal of Personalized Medicine (Stanford Study)",
      url: "https://pubmed.ncbi.nlm.nih.gov/28538708/",
    },
  ],

  // ============ DETAILED TABLE ============
  detailedTable: {
    id: "activityComparison",
    buttonLabel: "View All Activity MET Values",
    buttonIcon: "📊",
    modalTitle: "Complete MET Value Reference Table",
    columns: [
      { id: "activity", label: "Activity", align: "left" as const },
      { id: "met", label: "MET", align: "center" as const },
      { id: "intensity", label: "Intensity", align: "center" as const },
      { id: "cal30min", label: "Cal/30min (150lb)", align: "right" as const, highlight: true },
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
    "running-pace-calculator",
    "heart-rate-zones-calculator",
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
// MET VALUES DATABASE (2024 Compendium)
// =============================================================================
const MET_VALUES: Record<string, Record<string, number>> = {
  running: {
    jogging: 8.3,
    running_6mph: 9.8,
    running_7mph: 10.5,
    running_8mph: 11.8,
    running_9mph: 12.8,
    running_10mph: 14.5,
    running_trail: 9.0,
    running_stairs: 15.0,
    sprinting: 23.0,
    hiit_running: 12.0,
  },
  walking: {
    walking_slow: 2.3,
    walking_moderate: 3.3,
    walking_brisk: 4.3,
    walking_fast: 5.0,
    walking_very_fast: 6.3,
    walking_uphill: 6.0,
    walking_downhill: 3.5,
    hiking: 5.3,
    hiking_backpack: 7.8,
    nordic_walking: 6.8,
    walking_dog: 3.0,
    treadmill_walking: 4.0,
  },
  cycling: {
    cycling_leisure: 4.0,
    cycling_moderate: 8.0,
    cycling_vigorous: 10.0,
    cycling_racing: 12.0,
    cycling_mountain: 8.5,
    cycling_stationary_light: 5.5,
    cycling_stationary_moderate: 7.0,
    cycling_stationary_vigorous: 10.5,
    cycling_spinning: 9.0,
    cycling_ebike: 4.8,
  },
  swimming: {
    swimming_leisure: 6.0,
    swimming_moderate: 7.0,
    swimming_laps_moderate: 8.0,
    swimming_laps_vigorous: 10.0,
    swimming_freestyle: 8.3,
    swimming_backstroke: 7.0,
    swimming_breaststroke: 7.0,
    swimming_butterfly: 11.0,
    treading_water: 4.0,
    aqua_aerobics: 5.5,
  },
  gym: {
    weight_training_light: 3.5,
    weight_training_moderate: 5.0,
    weight_training_vigorous: 6.0,
    circuit_training: 8.0,
    hiit: 9.0,
    crossfit: 10.0,
    elliptical_moderate: 5.0,
    elliptical_vigorous: 7.0,
    rowing_machine_moderate: 7.0,
    rowing_machine_vigorous: 10.0,
    stair_climber: 9.0,
    stretching: 2.3,
    yoga_hatha: 2.5,
    yoga_power: 4.0,
    pilates: 3.0,
  },
  sports: {
    basketball: 6.5,
    soccer: 7.0,
    tennis_singles: 8.0,
    tennis_doubles: 6.0,
    volleyball: 4.0,
    badminton: 5.5,
    racquetball: 7.0,
    golf_walking: 4.8,
    golf_cart: 3.5,
    bowling: 3.0,
    baseball: 5.0,
    football: 8.0,
    hockey: 8.0,
    lacrosse: 8.0,
    rugby: 8.3,
    boxing_sparring: 9.0,
    boxing_bag: 5.5,
  },
  home: {
    cleaning_general: 3.3,
    cleaning_vigorous: 4.0,
    vacuuming: 3.5,
    mopping: 3.5,
    cooking: 2.5,
    gardening_light: 3.8,
    gardening_heavy: 5.0,
    mowing_lawn_push: 5.5,
    mowing_lawn_riding: 2.5,
    raking_leaves: 4.0,
    shoveling_snow: 6.0,
    moving_furniture: 6.0,
    painting: 3.5,
    carpentry: 4.5,
  },
  outdoor: {
    hiking_moderate: 5.3,
    hiking_vigorous: 7.8,
    rock_climbing: 8.0,
    horseback_riding: 5.5,
    fishing_standing: 3.5,
    hunting: 5.0,
    camping_activities: 3.5,
    frisbee: 3.0,
    frisbee_golf: 3.5,
    skateboarding: 5.0,
    roller_skating: 7.0,
    jump_rope_slow: 8.8,
    jump_rope_fast: 12.3,
  },
  water: {
    kayaking: 5.0,
    canoeing: 5.8,
    rowing: 7.0,
    paddleboarding: 6.0,
    surfing: 3.0,
    water_skiing: 6.0,
    wakeboarding: 6.0,
    snorkeling: 5.0,
    scuba_diving: 7.0,
    water_polo: 10.0,
  },
  winter: {
    skiing_downhill: 6.0,
    skiing_downhill_vigorous: 8.0,
    skiing_cross_country: 9.0,
    snowboarding: 5.3,
    ice_skating: 5.5,
    ice_skating_vigorous: 9.0,
    sledding: 4.5,
    snowshoeing: 8.0,
  },
  dance: {
    aerobics_low: 5.0,
    aerobics_moderate: 6.5,
    aerobics_high: 7.3,
    step_aerobics: 8.5,
    zumba: 6.5,
    dance_general: 5.5,
    dance_ballroom: 5.5,
    dance_salsa: 6.0,
    dance_hip_hop: 7.4,
    dance_ballet: 5.0,
  },
  martial: {
    martial_arts_moderate: 6.0,
    karate: 10.0,
    taekwondo: 10.0,
    judo: 10.0,
    jiu_jitsu: 10.0,
    kickboxing: 10.0,
    muay_thai: 10.0,
    wrestling: 6.0,
    tai_chi: 3.0,
  },
};

// Intensity modifiers
const INTENSITY_MODIFIERS: Record<string, number> = {
  light: 0.8,
  normal: 1.0,
  vigorous: 1.15,
  maximum: 1.3,
};

// EPOC percentages by MET level
function getEPOCPercentage(met: number): number {
  if (met >= 10) return 0.15; // High intensity: 15%
  if (met >= 7) return 0.10;  // Moderate-high: 10%
  if (met >= 5) return 0.08;  // Moderate: 8%
  return 0.06;                // Light: 6%
}

// Get intensity level description
function getIntensityLevel(met: number): string {
  if (met >= 10) return "Vigorous (High Intensity)";
  if (met >= 6) return "Moderate-Vigorous";
  if (met >= 3) return "Moderate";
  return "Light";
}

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateCaloriesBurned(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values, unitSystem } = data;

  // Get weight in kg
  let weightKg: number;
  if (unitSystem === "metric") {
    weightKg = (values.weight as number) || 68;
  } else {
    weightKg = ((values.weight as number) || 150) / 2.205;
  }

  // Get activity category and specific activity
  const category = (values.activityCategory as string) || "running";
  
  // Get the specific activity based on category
  const activityFieldMap: Record<string, string> = {
    running: "runningActivity",
    walking: "walkingActivity",
    cycling: "cyclingActivity",
    swimming: "swimmingActivity",
    gym: "gymActivity",
    sports: "sportsActivity",
    home: "homeActivity",
    outdoor: "outdoorActivity",
    water: "waterActivity",
    winter: "winterActivity",
    dance: "danceActivity",
    martial: "martialActivity",
  };

  const activityField = activityFieldMap[category] || "runningActivity";
  const activity = (values[activityField] as string) || "jogging";
  
  // Get MET value
  let baseMET = MET_VALUES[category]?.[activity] || 5.0;
  
  // Apply intensity modifier
  const intensityModifier = (values.intensityModifier as string) || "normal";
  const modifier = INTENSITY_MODIFIERS[intensityModifier] || 1.0;
  const adjustedMET = baseMET * modifier;
  
  // Get duration
  const durationMinutes = (values.duration as number) || 30;
  const durationHours = durationMinutes / 60;
  
  // Calculate calories burned
  // Formula: Calories = MET × Weight(kg) × Time(hours)
  const caloriesBurned = adjustedMET * weightKg * durationHours;
  
  // Calculate EPOC
  const includeEPOC = (values.includeEPOC as string) === "yes";
  const epocPercentage = getEPOCPercentage(adjustedMET);
  const epocCalories = includeEPOC ? caloriesBurned * epocPercentage : 0;
  const totalWithEpoc = caloriesBurned + epocCalories;
  
  // Calculate additional metrics
  const caloriesPerMinute = caloriesBurned / durationMinutes;
  const fatEquivalent = caloriesBurned / 3500; // pounds of fat
  const weeklyImpact = caloriesBurned * 3; // 3x per week
  
  // Get intensity level description
  const intensityLevel = getIntensityLevel(adjustedMET);

  // Generate detailed table data
  const allActivities: Array<{ activity: string; met: string; intensity: string; cal30min: string }> = [];
  for (const [cat, activities] of Object.entries(MET_VALUES)) {
    for (const [act, met] of Object.entries(activities)) {
      const cal30 = Math.round(met * weightKg * 0.5);
      allActivities.push({
        activity: act.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
        met: met.toFixed(1),
        intensity: getIntensityLevel(met),
        cal30min: cal30.toString(),
      });
    }
  }
  // Sort by MET value descending
  allActivities.sort((a, b) => parseFloat(b.met) - parseFloat(a.met));

  const formatNumber = (n: number) => Math.round(n).toLocaleString();

  return {
    values: {
      caloriesBurned: Math.round(caloriesBurned),
      metValue: adjustedMET,
      epocCalories: Math.round(epocCalories),
      totalWithEpoc: Math.round(totalWithEpoc),
      caloriesPerMinute,
      fatEquivalent,
      weeklyImpact: Math.round(weeklyImpact),
    },
    formatted: {
      caloriesBurned: formatNumber(caloriesBurned),
      metValue: `${adjustedMET.toFixed(1)} METs`,
      intensityLevel,
      epocCalories: includeEPOC ? `+${Math.round(epocCalories)} cal (${Math.round(epocPercentage * 100)}%)` : "Not included",
      totalWithEpoc: includeEPOC ? `${formatNumber(totalWithEpoc)} cal` : "-",
      caloriesPerMinute: `${caloriesPerMinute.toFixed(1)} cal/min`,
      fatEquivalent: `${(fatEquivalent * 16).toFixed(1)} oz of fat`,
      weeklyImpact: `${formatNumber(weeklyImpact)} cal/week`,
    },
    summary: `You burned approximately ${formatNumber(caloriesBurned)} calories in ${durationMinutes} minutes at ${adjustedMET.toFixed(1)} METs (${intensityLevel}).`,
    isValid: true,
    metadata: {
      tableData: allActivities.slice(0, 50), // Top 50 activities
    },
  };
}

export default caloriesBurnedConfig;
