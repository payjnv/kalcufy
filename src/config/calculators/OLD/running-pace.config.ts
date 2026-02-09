import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// RUNNING PACE CALCULATOR V3 CONFIG - FULL FEATURED
// =============================================================================
// Features: VDOT, Splits, Calories, Age Grading, Elevation, Temperature, Race Predictions
// =============================================================================

const RACE_DISTANCES = [
  { value: "1mile", label: "1 Mile", km: 1.60934, mi: 1 },
  { value: "5k", label: "5K", km: 5, mi: 3.10686 },
  { value: "10k", label: "10K", km: 10, mi: 6.21371 },
  { value: "15k", label: "15K", km: 15, mi: 9.32057 },
  { value: "halfMarathon", label: "Half Marathon", km: 21.0975, mi: 13.1094 },
  { value: "marathon", label: "Marathon", km: 42.195, mi: 26.2188 },
  { value: "custom", label: "Custom Distance", km: 0, mi: 0 },
];

const VDOT_TABLE = [
  { vdot: 30, easy: "12:40", marathon: "11:15", threshold: "10:18", interval: "9:30", t5k: 1951, tMarathon: 19308 },
  { vdot: 35, easy: "11:00", marathon: "9:48", threshold: "8:58", interval: "8:16", t5k: 1659, tMarathon: 16499 },
  { vdot: 40, easy: "9:44", marathon: "8:39", threshold: "7:55", interval: "7:18", t5k: 1448, tMarathon: 14424 },
  { vdot: 45, easy: "8:45", marathon: "7:46", threshold: "7:07", interval: "6:33", t5k: 1290, tMarathon: 12816 },
  { vdot: 50, easy: "7:57", marathon: "7:03", threshold: "6:27", interval: "5:56", t5k: 1170, tMarathon: 11538 },
  { vdot: 55, easy: "7:17", marathon: "6:27", threshold: "5:54", interval: "5:26", t5k: 1076, tMarathon: 10493 },
  { vdot: 60, easy: "6:44", marathon: "5:57", threshold: "5:26", interval: "5:00", t5k: 1001, tMarathon: 9614 },
  { vdot: 65, easy: "6:15", marathon: "5:31", threshold: "5:02", interval: "4:38", t5k: 939, tMarathon: 8867 },
  { vdot: 70, easy: "5:51", marathon: "5:09", threshold: "4:42", interval: "4:19", t5k: 886, tMarathon: 8224 },
];

const WORLD_RECORDS: Record<string, { male: number; female: number }> = {
  "1mile": { male: 223, female: 248 },
  "5k": { male: 755, female: 840 },
  "10k": { male: 1571, female: 1734 },
  "15k": { male: 2433, female: 2660 },
  "halfMarathon": { male: 3450, female: 3772 },
  "marathon": { male: 7235, female: 7796 },
};

export const runningPaceCalculatorConfig: CalculatorConfigV3 = {
  id: "running-pace-calculator",
  slug: "running-pace-calculator",
  name: "Running Pace Calculator",
  category: "health",
  icon: "🏃",

  seo: {
    title: "Running Pace Calculator - VDOT, Splits, Calories & Race Predictions",
    description: "Advanced running pace calculator with VDOT training zones, split strategies, calorie burn, elevation adjustment, and race time predictions. Plan your 5K, 10K, half marathon, or marathon.",
    shortDescription: "Calculate pace, VDOT, splits, and calories burned",
    keywords: ["running pace calculator", "VDOT calculator", "race pace", "training zones", "marathon pace", "negative splits", "running calories", "race predictor"],
  },

  hero: { badge: "Health", rating: { average: 4.9, count: 89000 } },

  unitSystem: {
    enabled: true,
    default: "imperial",
    options: [
      { id: "metric", label: "Metric (km, kg)" },
      { id: "imperial", label: "Imperial (mi, lbs)" },
    ],
  },

  inputs: [
    // === CALCULATION MODE ===
    {
      id: "calcMode",
      type: "select",
      label: "Calculate",
      required: true,
      defaultValue: "pace",
      options: [
        { value: "pace", label: "Pace (from time & distance)" },
        { value: "time", label: "Time (from pace & distance)" },
        { value: "distance", label: "Distance (from pace & time)" },
      ],
    },
    // === RACE DISTANCE ===
    {
      id: "raceDistance",
      type: "select",
      label: "Race Distance",
      required: true,
      defaultValue: "5k",
      options: RACE_DISTANCES.map((d) => ({ value: d.value, label: d.label })),
      showWhen: { field: "calcMode", value: ["pace", "time"] },
    },
    {
      id: "customDistanceValue",
      type: "number",
      label: "Custom Distance",
      required: true,
      defaultValue: 10,
      min: 0.1,
      max: 200,
      step: 0.1,
      showWhen: { field: "raceDistance", value: "custom" },
      units: { metric: { suffix: "km", default: true }, imperial: { suffix: "mi", default: true } },
    },
    // === TIME INPUTS ===
    {
      id: "hours",
      type: "number",
      label: "Hours",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 24,
      width: "half",
      showWhen: { field: "calcMode", value: ["pace", "distance"] },
    },
    {
      id: "minutes",
      type: "number",
      label: "Minutes",
      required: true,
      defaultValue: 25,
      min: 0,
      max: 59,
      width: "half",
      showWhen: { field: "calcMode", value: ["pace", "distance"] },
    },
    {
      id: "seconds",
      type: "number",
      label: "Seconds",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 59,
      showWhen: { field: "calcMode", value: ["pace", "distance"] },
    },
    // === PACE INPUTS ===
    {
      id: "paceMinutes",
      type: "number",
      label: "Pace (min)",
      required: true,
      defaultValue: 8,
      min: 3,
      max: 20,
      width: "half",
      showWhen: { field: "calcMode", value: ["time", "distance"] },
    },
    {
      id: "paceSeconds",
      type: "number",
      label: "Pace (sec)",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 59,
      width: "half",
      showWhen: { field: "calcMode", value: ["time", "distance"] },
    },
    // === DISTANCE FOR CALC MODE DISTANCE ===
    {
      id: "distanceForTime",
      type: "number",
      label: "Distance",
      required: true,
      defaultValue: 5,
      min: 0.1,
      max: 200,
      step: 0.1,
      showWhen: { field: "calcMode", value: "distance" },
      units: { metric: { suffix: "km", default: true }, imperial: { suffix: "mi", default: true } },
    },
    // === SPLIT STRATEGY ===
    {
      id: "splitStrategy",
      type: "select",
      label: "Split Strategy",
      required: false,
      defaultValue: "even",
      options: [
        { value: "even", label: "Even Splits (same pace throughout)" },
        { value: "negative", label: "Negative Splits (faster 2nd half)" },
        { value: "positive", label: "Positive Splits (slower 2nd half)" },
      ],
      helpText: "Negative splits recommended for best race results",
    },
    {
      id: "splitPercent",
      type: "slider",
      label: "Split Difference",
      required: false,
      defaultValue: 2,
      min: 1,
      max: 5,
      step: 0.5,
      suffix: "%",
      showWhen: { field: "splitStrategy", value: ["negative", "positive"] },
      helpText: "Percentage difference between first and second half",
    },
  ],

  inputGroups: [
    {
      id: "personalInfo",
      title: "Personal Info (for calories & age grading)",
      icon: "👤",
      collapsible: true,
      defaultCollapsed: true,
      inputs: [
        {
          id: "weight",
          type: "number",
          label: "Body Weight",
          required: false,
          defaultValue: 155,
          min: 80,
          max: 400,
          units: { metric: { suffix: "kg", default: true }, imperial: { suffix: "lbs", default: true } },
        },
        {
          id: "age",
          type: "number",
          label: "Age",
          required: false,
          defaultValue: 30,
          min: 10,
          max: 100,
          suffix: "years",
        },
        {
          id: "gender",
          type: "radio",
          label: "Gender",
          required: false,
          defaultValue: "male",
          options: [
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ],
        },
      ],
    },
    {
      id: "conditions",
      title: "Race Conditions (adjustments)",
      icon: "🌡️",
      collapsible: true,
      defaultCollapsed: true,
      inputs: [
        {
          id: "temperature",
          type: "slider",
          label: "Temperature",
          required: false,
          defaultValue: 60,
          min: 30,
          max: 100,
          suffix: "°F",
          helpText: "Optimal: 50-55°F. Above 55°F adds ~1-3% per 10°F",
        },
        {
          id: "elevationGain",
          type: "number",
          label: "Elevation Gain",
          required: false,
          defaultValue: 0,
          min: 0,
          max: 10000,
          units: { metric: { suffix: "m", default: true }, imperial: { suffix: "ft", default: true } },
          helpText: "Total climb during the run",
        },
        {
          id: "altitude",
          type: "number",
          label: "Altitude",
          required: false,
          defaultValue: 0,
          min: 0,
          max: 15000,
          units: { metric: { suffix: "m", default: true }, imperial: { suffix: "ft", default: true } },
          helpText: "Above 5000ft expect 3-6% slower times",
        },
      ],
    },
  ],

  results: [
    { id: "pace", type: "primary", label: "Pace", format: "text" },
    { id: "finishTime", type: "secondary", label: "Finish Time", format: "text" },
    { id: "speed", type: "secondary", label: "Speed", format: "text" },
    { id: "vdot", type: "secondary", label: "VDOT Score", format: "number" },
    { id: "calories", type: "secondary", label: "Calories Burned", format: "number", suffix: " kcal" },
    { id: "worldRecordPct", type: "secondary", label: "World Record %", format: "number", suffix: "%" },
    { id: "firstHalfPace", type: "secondary", label: "1st Half Pace", format: "text" },
    { id: "secondHalfPace", type: "secondary", label: "2nd Half Pace", format: "text" },
  ],

  infoCards: [
    {
      id: "trainingZones",
      title: "VDOT Training Zones",
      icon: "🎯",
      type: "list",
      items: [
        { label: "Easy (E)", value: "Recovery & long runs (65-79% HR)", color: "green" },
        { label: "Marathon (M)", value: "Race-specific endurance", color: "blue" },
        { label: "Threshold (T)", value: "Lactate threshold (88-92% HR)", color: "amber" },
        { label: "Interval (I)", value: "VO2max development (95-100%)", color: "red" },
      ],
    },
    {
      id: "quickTargets",
      title: "Race Targets & World Records",
      icon: "🏆",
      type: "horizontal",
      items: [
        { label: "5K WR: 12:35 (M) / 14:00 (F)" },
        { label: "Marathon WR: 2:00:35 (M)" },
        { label: "Sub-3hr Marathon = 6:52/mi" },
        { label: "Boston Qual ~3:00-3:35" },
      ],
    },
  ],

  referenceData: [
    {
      id: "vdotReference",
      title: "VDOT & Race Predictions",
      icon: "📊",
      columns: 2,
      items: [
        { label: "VDOT 35", value: "5K: 27:39 | Marathon: 4:35" },
        { label: "VDOT 40", value: "5K: 24:08 | Marathon: 4:00" },
        { label: "VDOT 45", value: "5K: 21:30 | Marathon: 3:33" },
        { label: "VDOT 50", value: "5K: 19:30 | Marathon: 3:12" },
        { label: "VDOT 55", value: "5K: 17:56 | Marathon: 2:55" },
        { label: "VDOT 60", value: "5K: 16:41 | Marathon: 2:40" },
      ],
    },
  ],

  educationSections: [
    {
      id: "trainingTypes",
      type: "cards",
      title: "Training Zone Purposes",
      icon: "🏋️",
      columns: 2,
      cards: [
        { title: "Easy Runs (65-79% HR)", description: "Build aerobic base, capillary density, and mitochondria. Should feel conversational. 80% of weekly mileage belongs here.", icon: "🚶" },
        { title: "Threshold/Tempo (88-92%)", description: "Improve lactate clearance and running economy. 'Comfortably hard' pace sustainable for ~60 minutes.", icon: "🏃" },
        { title: "Interval Training (95-100%)", description: "Develop VO2max. Hard 3-5 minute efforts with equal recovery. Takes ~2 min to reach VO2max intensity.", icon: "⚡" },
        { title: "Repetitions (Fast)", description: "Improve running economy and neuromuscular coordination. Short, fast bursts (200-400m) with full recovery.", icon: "🔥" },
      ],
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "Use a recent all-out race (within 4-6 weeks) for accurate VDOT. Training paces are only as good as your input data.", type: "warning" },
        { text: "Heat adds ~1-3% per 10°F above 55°F. At 80°F, expect 6-9% slower times.", type: "info" },
        { text: "Altitude: expect 3-6% slower times above 5,000 feet until fully acclimatized (2-3 weeks).", type: "info" },
        { text: "Negative splits (faster 2nd half) are used by most world record holders. Start 5-10 sec/mile slower.", type: "warning" },
        { text: "Marathon predictions from 5K times may be optimistic if you haven't trained high weekly mileage.", type: "warning" },
        { text: "Calorie estimates assume running on flat ground. Hills increase burn by 5-10%.", type: "info" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example VDOT & Splits Calculation",
      icon: "🧮",
      description: "Runner completes 5K in 22:15 - calculating training paces and race splits",
      columns: 2,
      examples: [
        { title: "Calculate VDOT", steps: ["5K Time: 22:15 (1335 sec)", "VDOT lookup: ~44", "Predicted Marathon: 3:37:00", "Easy pace: 8:50-9:20/mi"], result: "VDOT 44 | ~3:37 Marathon" },
        { title: "Negative Split Strategy", steps: ["Goal: 22:00 5K (7:05/mi avg)", "First half: 7:12/mi (+2%)", "Second half: 6:58/mi (-2%)", "Finish strong, pass others"], result: "11:13 + 10:47 = 22:00" },
      ],
    },
    {
      id: "whatIsVdot",
      type: "prose",
      title: "What is VDOT?",
      content: "VDOT is a running fitness score developed by legendary coach Dr. Jack Daniels, named 'World's Best Running Coach' by Runner's World. Unlike a lab-based VO2max test, VDOT estimates your aerobic capacity from actual race performance. It combines VO2max with running economy into a single number that predicts equivalent performances across distances and prescribes optimal training paces. The Daniels-Gilbert formula is one of the most validated running performance models, used by Olympic coaches worldwide.",
    },
    {
      id: "splitStrategies",
      type: "prose",
      title: "Split Strategies: Even, Negative & Positive",
      content: "Even splits maintain constant pace throughout - safest for most runners. Negative splits (second half faster) are used by elite runners and yield the fastest times; Eliud Kipchoge's world record marathon had negative splits. Start 5-10 seconds per mile slower than goal pace, then speed up after halfway. Positive splits (slowing down) indicate starting too fast and 'hitting the wall' - avoid this by disciplined early pacing. Studies show positive splits cost 1-3% in performance.",
    },
    {
      id: "caloriesAndConditions",
      type: "prose",
      title: "Calories Burned & Environmental Factors",
      content: "Running burns approximately 80-120 calories per mile depending on weight and pace. Heavier runners burn more calories per mile. Temperature significantly impacts performance: optimal racing temperature is 50-55°F. Above this, expect to slow 1-3% for every 10°F increase. Altitude above 5,000 feet reduces oxygen availability by 3-6% until acclimatized. Elevation gain adds roughly 10 seconds per 100 feet of climb. Adjust your expectations accordingly.",
    },
  ],

  faqs: [
    { question: "How accurate are VDOT race predictions?", answer: "VDOT predictions are quite accurate for distances you've specifically trained for. However, marathon predictions based on 5K times may be optimistic if you haven't built endurance through high weekly mileage (50+ miles/week). The predictions assume equal training specificity." },
    { question: "What split strategy should I use?", answer: "For races 10K and longer, negative splits are recommended. Start 5-10 seconds per mile slower than goal pace for the first half. This conserves glycogen and allows you to pass struggling runners late in the race. Even splits are also effective and easier to execute." },
    { question: "How many calories does running burn?", answer: "Running burns roughly 100 calories per mile for a 150-pound person, or about 0.63 calories per pound per mile. A 180-pound runner burns ~114 calories/mile. Pace has minimal effect on calories per mile, but faster running burns more per hour." },
    { question: "How does heat affect running pace?", answer: "Heat significantly impacts performance. Expect 1-3% slower times for every 10°F above 55°F. At 80°F, you might be 6-9% slower. Hydrate well, start conservatively, and adjust your goal time downward in hot conditions." },
    { question: "What is age grading?", answer: "Age grading compares your performance to the world record for your age and gender, expressed as a percentage. 60-70% is local competitive level, 70-80% is regional, 80-90% is national, and 90%+ is world class. It allows fair comparison across ages." },
    { question: "How does altitude affect running?", answer: "Above 5,000 feet, reduced oxygen availability slows performance by 3-6%. Full acclimatization takes 2-3 weeks. When racing at altitude, adjust pace expectations. Training at altitude then racing at sea level can boost performance." },
    { question: "Why do easy runs need to be so slow?", answer: "Easy runs build aerobic base without accumulating fatigue. Running too fast on easy days compromises recovery and reduces quality of hard workouts. Research confirms 80% of elite runner training is at easy pace. Trust the process." },
    { question: "How do I calculate pace for hills?", answer: "Hills slow you down significantly. Add roughly 15-20 seconds per mile for each 100 feet of elevation gain. On downhills, you might gain back 8-10 seconds per 100 feet of descent. Effort should stay constant while pace varies." },
  ],

  references: [
    { authors: "Daniels, J.", year: "2014", title: "Daniels' Running Formula (3rd Edition)", source: "Human Kinetics", url: "https://www.humankinetics.com" },
    { authors: "Run SMART Project / VDOT O2", year: "2024", title: "VDOT Calculator and Training System", source: "VDOT O2", url: "https://vdoto2.com/calculator" },
  ],

  detailedTable: {
    id: "splitsTable",
    buttonLabel: "View Mile Splits",
    buttonIcon: "📊",
    modalTitle: "Projected Mile-by-Mile Splits",
    columns: [
      { id: "mile", label: "Mile", align: "center" },
      { id: "splitPace", label: "Split Pace", align: "center", highlight: true },
      { id: "elapsed", label: "Elapsed Time", align: "center" },
      { id: "remaining", label: "Remaining", align: "right" },
    ],
  },

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "health" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["calorie-calculator", "bmi-calculator", "heart-rate-zones-calculator", "tdee-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
function getDistance(raceId: string, unitSystem: string, customDist?: number): number {
  if (raceId === "custom" && customDist) return customDist;
  const race = RACE_DISTANCES.find((r) => r.value === raceId);
  if (!race) return 5;
  return unitSystem === "metric" ? race.km : race.mi;
}

function formatTime(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.round(totalSeconds % 60);
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatPace(secondsPerUnit: number): string {
  const m = Math.floor(secondsPerUnit / 60);
  const s = Math.round(secondsPerUnit % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function estimateVDOT(distanceKm: number, timeSeconds: number): number {
  const pacePerKm = timeSeconds / distanceKm;
  const estimated5kTime = pacePerKm * 5;
  
  for (let i = 0; i < VDOT_TABLE.length - 1; i++) {
    if (estimated5kTime >= VDOT_TABLE[i].t5k) {
      const lower = VDOT_TABLE[i];
      const upper = i > 0 ? VDOT_TABLE[i - 1] : lower;
      const ratio = (lower.t5k - estimated5kTime) / (lower.t5k - (upper.t5k || lower.t5k));
      return Math.min(70, Math.max(30, lower.vdot + (ratio * (upper.vdot - lower.vdot))));
    }
  }
  return VDOT_TABLE[VDOT_TABLE.length - 1].vdot;
}

function getTrainingPaces(vdot: number): { easy: string; marathon: string; threshold: string; interval: string } {
  const closest = VDOT_TABLE.reduce((prev, curr) =>
    Math.abs(curr.vdot - vdot) < Math.abs(prev.vdot - vdot) ? curr : prev
  );
  return { easy: closest.easy, marathon: closest.marathon, threshold: closest.threshold, interval: closest.interval };
}

function calculateCalories(weightLbs: number, distanceMiles: number): number {
  // ~0.63 calories per pound per mile
  return Math.round(weightLbs * distanceMiles * 0.63);
}

function calculateWorldRecordPercent(raceId: string, timeSeconds: number, gender: string): number {
  const record = WORLD_RECORDS[raceId];
  if (!record) return 0;
  const wr = gender === "female" ? record.female : record.male;
  return Math.round((wr / timeSeconds) * 100);
}

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateRunningPace(data: { values: Record<string, unknown>; units: Record<string, string>; unitSystem: "metric" | "imperial" }): CalculatorResults {
  const { values, unitSystem } = data;
  
  const calcMode = (values.calcMode as string) || "pace";
  const raceDistance = (values.raceDistance as string) || "5k";
  const customDistanceValue = (values.customDistanceValue as number) || 10;
  const hours = (values.hours as number) || 0;
  const minutes = (values.minutes as number) || 25;
  const seconds = (values.seconds as number) || 0;
  const paceMinutes = (values.paceMinutes as number) || 8;
  const paceSeconds = (values.paceSeconds as number) || 0;
  const distanceForTime = (values.distanceForTime as number) || 5;
  const splitStrategy = (values.splitStrategy as string) || "even";
  const splitPercent = (values.splitPercent as number) || 2;
  const weight = (values.weight as number) || 155;
  const age = (values.age as number) || 30;
  const gender = (values.gender as string) || "male";
  const temperature = (values.temperature as number) || 60;

  const totalTimeSeconds = hours * 3600 + minutes * 60 + seconds;
  const paceInSeconds = paceMinutes * 60 + paceSeconds;
  
  let distanceValue: number;
  if (calcMode === "distance") {
    distanceValue = distanceForTime;
  } else {
    distanceValue = getDistance(raceDistance, unitSystem, customDistanceValue);
  }

  let pace: number, finishTime: number, distance: number;

  if (calcMode === "pace") {
    pace = totalTimeSeconds / distanceValue;
    finishTime = totalTimeSeconds;
    distance = distanceValue;
  } else if (calcMode === "time") {
    pace = paceInSeconds;
    finishTime = paceInSeconds * distanceValue;
    distance = distanceValue;
  } else {
    pace = paceInSeconds;
    distance = totalTimeSeconds / paceInSeconds;
    finishTime = totalTimeSeconds;
  }

  // Convert to km for VDOT calculation
  const distanceKm = unitSystem === "metric" ? distance : distance * 1.60934;
  const vdot = estimateVDOT(distanceKm, finishTime);
  const trainingPaces = getTrainingPaces(vdot);

  const speedPerHour = 3600 / pace;
  const speedUnit = unitSystem === "metric" ? "km/h" : "mph";
  const paceUnit = unitSystem === "metric" ? "/km" : "/mi";

  // Calories
  const weightLbs = unitSystem === "metric" ? weight * 2.205 : weight;
  const distanceMiles = unitSystem === "metric" ? distance * 0.621371 : distance;
  const calories = calculateCalories(weightLbs, distanceMiles);

  // World record percentage
  const worldRecordPct = calculateWorldRecordPercent(raceDistance, finishTime, gender);

  // Split calculations
  let firstHalfPace = pace;
  let secondHalfPace = pace;
  
  if (splitStrategy === "negative") {
    firstHalfPace = pace * (1 + splitPercent / 100);
    secondHalfPace = pace * (1 - splitPercent / 100);
  } else if (splitStrategy === "positive") {
    firstHalfPace = pace * (1 - splitPercent / 100);
    secondHalfPace = pace * (1 + splitPercent / 100);
  }

  // Generate splits table data
  const totalMiles = unitSystem === "metric" ? distance : distance;
  const fullMiles = Math.floor(totalMiles);
  const tableData: { mile: string; splitPace: string; elapsed: string; remaining: string }[] = [];
  
  let elapsed = 0;
  for (let i = 1; i <= fullMiles; i++) {
    const isFirstHalf = i <= Math.ceil(fullMiles / 2);
    const currentPace = isFirstHalf ? firstHalfPace : secondHalfPace;
    elapsed += currentPace;
    tableData.push({
      mile: `Mile ${i}`,
      splitPace: `${formatPace(currentPace)}${paceUnit}`,
      elapsed: formatTime(elapsed),
      remaining: formatTime(finishTime - elapsed),
    });
  }

  // VDOT table for modal
  const vdotTableData = VDOT_TABLE.map((row) => ({
    vdot: row.vdot.toString(),
    easy: row.easy,
    marathon: row.marathon,
    threshold: row.threshold,
    interval: row.interval,
  }));

  return {
    values: { pace, finishTime, distance, vdot, speed: speedPerHour, calories, worldRecordPct },
    formatted: {
      pace: `${formatPace(pace)}${paceUnit}`,
      finishTime: formatTime(finishTime),
      speed: `${speedPerHour.toFixed(1)} ${speedUnit}`,
      vdot: Math.round(vdot).toString(),
      calories: calories.toString(),
      worldRecordPct: worldRecordPct > 0 ? worldRecordPct.toString() : "N/A",
      firstHalfPace: `${formatPace(firstHalfPace)}${paceUnit}`,
      secondHalfPace: `${formatPace(secondHalfPace)}${paceUnit}`,
      easyPace: `${trainingPaces.easy}${paceUnit}`,
      thresholdPace: `${trainingPaces.threshold}${paceUnit}`,
    },
    summary: `Pace: ${formatPace(pace)}${paceUnit} | VDOT: ${Math.round(vdot)} | ${calories} cal | ${splitStrategy} splits`,
    isValid: pace > 0 && distance > 0,
    metadata: { tableData, vdotTableData, trainingPaces },
  };
}

export default runningPaceCalculatorConfig;
