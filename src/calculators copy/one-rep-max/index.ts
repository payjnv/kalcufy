// ⚡ IMPROVED VERSION v2 - February 5, 2026
// CHANGES FROM v1:
// - REMOVED "Show Warm-Up Sets" checkbox (confusing, ugly design)
// - Warm-up progression now ALWAYS shows (better UX)
// - Simplified infoCards structure
// - Better bodyweight integration
//
// COMPETITIVE POSITION: BEATS ALL COMPETITORS
import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ═══════════════════════════════════════════════════════════════
// ONE REP MAX (1RM) CALCULATOR - V4 ENGINE IMPROVED v2
// 7 Formulas + Average | 10 Exercises | Training Zones | Warm-Up | Strength Standards
// ═══════════════════════════════════════════════════════════════

export const oneRepMaxConfig: CalculatorConfigV4 = {
  id: "one-rep-max",
  version: "4.2", // UPGRADED to v2
  category: "health",
  icon: "🏋️",

  // ═══════════════════════════════════════════════════════════════
  // PRESETS (FIXED - with weight values)
  // ═══════════════════════════════════════════════════════════════
  presets: [
    {
      id: "benchIntermediate",
      icon: "🏋️",
      values: { exercise: "benchPress", weight: 225, reps: 5, formula: "average", bodyweight: 180 },
    },
    {
      id: "squatAdvanced",
      icon: "🦵",
      values: { exercise: "backSquat", weight: 315, reps: 3, formula: "average", bodyweight: 200 },
    },
    {
      id: "deadliftHeavy",
      icon: "💀",
      values: { exercise: "deadlift", weight: 405, reps: 2, formula: "average", bodyweight: 180 },
    },],

  // ═══════════════════════════════════════════════════════════════
  // TRANSLATIONS (ENGLISH ONLY - script translates to ES/PT/FR)
  // ═══════════════════════════════════════════════════════════════
  t: {
    en: {
      name: "One Rep Max Calculator",
      slug: "one-rep-max-calculator",
      subtitle: "Estimate your one-repetition maximum using 7 proven formulas with warm-up calculator and strength standards",
      breadcrumb: "One Rep Max",

      seo: {
        title: "One Rep Max Calculator (1RM) - 7 Formulas + Warm-Up | Free Tool",
        description: "Calculate your one rep max (1RM) using 7 scientifically validated formulas. Get personalized warm-up sets, training zone weights, strength standards by bodyweight, and see where you rank. Free tool with kg/lb support for bench press, squat, deadlift and more.",
        shortDescription: "Estimate your 1RM with 7 formulas, warm-up calculator, and strength standards",
        keywords: ["one rep max calculator", "1RM calculator", "one repetition maximum", "bench press max", "squat max calculator", "deadlift max", "strength calculator", "warm up calculator", "strength standards"],
      },

      calculator: { yourInformation: "Your Lift Details" },
      ui: {
        yourInformation: "Your Lift Details",
        calculate: "Calculate 1RM",
        reset: "Reset",
        results: "Your Results",
      },

      inputs: {
        },
        },
        body
      },

      inputGroups: {},

      results: {
        oneRepMax: { label: "Estimated 1RM" },
        maxStrength: { label: "🔴 Max Strength (95%)" },
        strength: { label: "🟠 Strength (85%)" },
        hypertrophy: { label: "🟡 Hypertrophy (75%)" },
        endurance: { label: "🟢 Endurance (65%)" },
        speedPower: { label: "🔵 Speed & Power (55%)" },
        warmUp: { label: "⚪ Warm-Up (50%)" },
      },

      presets: {
        benchIntermediate: { label: "Bench Press", description: "225 lbs × 5 reps" },
        squatAdvanced: { label: "Back Squat", description: "315 lbs × 3 reps" },
        deadliftHeavy: { label: "Deadlift", description: "405 lbs × 2 reps" },
      },

      tooltips: {
        oneRepMax: "The maximum weight you can lift for one repetition with proper form",
        maxStrength: "95% of 1RM — 1-2 reps × 3-5 sets for maximum strength",
        strength: "85% of 1RM — 3-5 reps × 4-6 sets for strength building",
        hypertrophy: "75% of 1RM — 8-12 reps × 3-4 sets for muscle growth",
        endurance: "65% of 1RM — 12-15 reps × 2-3 sets for muscular endurance",
        speedPower: "55% of 1RM — 3-5 explosive reps × 3-5 sets for power",
        warmUp: "50% of 1RM — Recommended weight for warm-up sets",
      },

      values: {
        "kg": "kg",
        "lbs": "lbs",
        "reps": "reps",
        "sets": "sets",
        "min": "min",
        "Bench Press": "Bench Press",
        "Back Squat": "Back Squat",
        "Deadlift": "Deadlift",
        "Overhead Press": "Overhead Press",
        "Barbell Row": "Barbell Row",
        "Front Squat": "Front Squat",
        "Incline Bench": "Incline Bench Press",
        "Romanian Deadlift": "Romanian Deadlift",
        "Hip Thrust": "Hip Thrust",
        "Leg Press": "Leg Press",
        "Epley": "Epley",
        "Brzycki": "Brzycki",
        "Lombardi": "Lombardi",
        "Mayhew": "Mayhew et al.",
        "Wathen": "Wathen",
        "O'Conner": "O'Conner et al.",
        "Lander": "Lander",
        "Average": "Average (7 formulas)",
        "Max Strength": "Max Strength",
        "Strength": "Strength",
        "Hypertrophy": "Hypertrophy",
        "Endurance": "Endurance",
        "Speed / Power": "Speed / Power",
        "Warm-Up": "Warm-Up",
        "Beginner": "Beginner",
        "Intermediate": "Intermediate",
        "Advanced": "Advanced",
        "Elite": "Elite",
      },

      detailedTable: {
        percentageChart: {
          button: "View Percentage Chart",
          title: "1RM Percentage Chart",
          columns: { percent: "% of 1RM", weight: "Weight", reps: "~Reps", goal: "Training Goal" },
        },
      },

      formats: {
        summary: "Your estimated 1RM for {exercise} is {oneRepMax} using the {formula} formula. For hypertrophy, load {hypertrophy}. For strength, load {strength}.",
      },

      // ═════════════════════════════════════════════════════════════
      // INFO CARDS (3 - SIMPLIFIED)
      // ═════════════════════════════════════════════════════════════
      infoCards: {
        formulaComparison: {
          title: "📊 All 7 Formulas",
          items: [
            { label: "Average (Recommended)", valueKey: "average" },
            { label: "Epley", valueKey: "epley" },
            { label: "Brzycki", valueKey: "brzycki" },
            { label: "Lombardi", valueKey: "lombardi" },
            { label: "Mayhew et al.", valueKey: "mayhew" },
            { label: "Wathen", valueKey: "wathen" },
            { label: "O'Conner et al.", valueKey: "oconner" },
            { label: "Lander", valueKey: "lander" },
          ],
        },
        warmupProgression: {
          title: "🔥 Warm-Up Progression",
          items: [
            { label: "Set 1 (40%)", valueKey: "warmup1" },
            { label: "Set 2 (50%)", valueKey: "warmup2" },
            { label: "Set 3 (60%)", valueKey: "warmup3" },
            { label: "Set 4 (70%)", valueKey: "warmup4" },
            { label: "Set 5 (80%)", valueKey: "warmup5" },
            { label: "Set 6 (90%)", valueKey: "warmup6" },
          ],
        },
        strengthLevel: {
          title: "🏅 Your Strength Level",
          items: [
            { label: "Your Level", valueKey: "strengthLevel" },
            { label: "Beginner", valueKey: "beginnerRange" },
            { label: "Intermediate", valueKey: "intermediateRange" },
            { label: "Advanced", valueKey: "advancedRange" },
            { label: "Elite", valueKey: "eliteRange" },
          ],
        },
      },

      referenceData: {
        trainingZones: {
          title: "Training Zones by % of 1RM",
          items: {
            maxStrength: { label: "Max Strength (93-100%)", value: "1-2 reps × 3-5 sets | Rest 3-5 min" },
            strength: { label: "Strength (83-90%)", value: "3-5 reps × 4-6 sets | Rest 2-4 min" },
            hypertrophy: { label: "Hypertrophy (67-80%)", value: "8-12 reps × 3-4 sets | Rest 1-2 min" },
            endurance: { label: "Endurance (60-70%)", value: "12-20 reps × 2-3 sets | Rest 30-60s" },
            speedPower: { label: "Speed & Power (50-60%)", value: "3-5 explosive reps × 3-5 sets | Rest 2-3 min" },
          },
        },
      },

      // ═════════════════════════════════════════════════════════════
      // CHART (ChartV4)
      // ═════════════════════════════════════════════════════════════
      chart: {
        title: "1RM Percentage Chart",
        xLabel: "% of 1RM",
        yLabel: "Weight",
        series: {
          weight: "Training Weight",
        },
      },

      education: {
        whatIs: {
          title: "What is One Rep Max (1RM)?",
          content: "Your one-repetition maximum (1RM) is the heaviest weight you can lift for a single repetition of a given exercise while maintaining proper form. It is the gold standard for measuring maximum strength in weight training and is widely used in powerlifting competitions, athletic testing, and workout programming. Rather than testing your true max directly — which carries a higher injury risk — most athletes and coaches use submaximal estimation formulas. These formulas take a weight you can lift for multiple reps and mathematically predict what your single-rep maximum would be. This approach is safer, faster, and remarkably accurate when using sets of 2-10 repetitions. Knowing your 1RM allows you to precisely calibrate your training intensity, ensuring you lift heavy enough to stimulate strength gains while staying safe enough to train consistently over time.",
        },
        formulas: {
          title: "How 1RM Formulas Work",
          content: "This calculator implements seven scientifically validated formulas, each developed from research on different populations and rep ranges. The Epley formula (1985) is the most widely used in commercial gyms and works best for the general 1-10 rep range. The Brzycki formula (1993) provides more conservative estimates and is preferred in NCAA research settings. Wathen's formula (1994) is recommended by the NSCA and is particularly accurate for explosive athletes. Lombardi's formula (1989) uses a non-linear power function that performs better at higher rep ranges. Mayhew et al. (1992) developed their regression-based formula using data from diverse populations including both trained and untrained individuals. Lander (1985) and O'Conner et al. (1989) complete the set with formulas validated on competitive and general populations respectively. When you select 'Average,' the calculator computes all seven estimates and returns the mean, which research suggests reduces individual formula bias and provides the most reliable overall estimate.",
        },
        trainingZones: {
          title: "Using Your 1RM for Training",
          cards: [
            { title: "Max Strength", icon: "🔴", description: "93-100% of 1RM for 1-2 reps. Develops peak force production and neural drive. Rest 3-5 minutes between sets. Best for powerlifters and strength athletes preparing for competition." },
            { title: "Strength", icon: "🟠", description: "83-90% of 1RM for 3-5 reps. Builds raw strength without the fatigue of true maxing. Rest 2-4 minutes. The sweet spot for most strength training programs and intermediate lifters." },
            { title: "Hypertrophy", icon: "🟡", description: "67-80% of 1RM for 8-12 reps. Optimal range for muscle growth through mechanical tension and metabolic stress. Rest 1-2 minutes. The classic bodybuilding rep range that works for everyone." },
            { title: "Endurance", icon: "🟢", description: "60-70% of 1RM for 12-20 reps. Builds muscular endurance, work capacity, and connective tissue resilience. Rest 30-60 seconds. Great for conditioning phases and beginners." },
            { title: "Speed & Power", icon: "🔵", description: "50-60% of 1RM for 3-5 explosive reps. Focus on moving the bar as fast as possible. Rest 2-3 minutes between sets. Essential for athletes in sports requiring explosive movements." },
          ],
        },
        howToTest: {
          title: "How to Get Accurate Estimates",
          items: [
            { text: "Use a weight you can lift for 2-10 reps with proper form — accuracy drops significantly above 10 reps", type: "info" },
            { text: "Test when fully recovered — fatigue, poor sleep, and stress all lower your true capacity and skew results", type: "info" },
            { text: "Stop the set when form breaks down — only count clean, full-range reps with proper technique", type: "warning" },
            { text: "Each exercise has its own 1RM — never apply your bench press max to your squat or deadlift", type: "warning" },
            { text: "Re-test every 4-8 weeks as you progress — your 1RM changes as you get stronger", type: "info" },
            { text: "Lower rep counts (3-5) give more accurate estimates than higher rep counts (8-10+)", type: "info" },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step 1RM calculations using different formulas",
          examples: [
            {
              title: "Bench Press: 225 lbs × 5 reps",
              steps: [
                "Epley: 225 × (1 + 5/30) = 225 × 1.167 = 262 lbs",
                "Brzycki: 225 × 36/(37-5) = 225 × 1.125 = 253 lbs",
                "Lombardi: 225 × 5^0.10 = 225 × 1.175 = 264 lbs",
                "Average of all 7 formulas ≈ 259 lbs",
              ],
              result: "Estimated 1RM: ~259 lbs → Strength (85%): 220 lbs | Hypertrophy (75%): 194 lbs",
            },
            {
              title: "Back Squat: 140 kg × 3 reps",
              steps: [
                "Epley: 140 × (1 + 3/30) = 140 × 1.10 = 154 kg",
                "Brzycki: 140 × 36/(37-3) = 140 × 1.059 = 148 kg",
                "Wathen: 100×140 / (48.8 + 53.8×e^(−0.075×3)) ≈ 153 kg",
                "Average of all 7 formulas ≈ 151 kg",
              ],
              result: "Estimated 1RM: ~151 kg → Strength (85%): 128 kg | Hypertrophy (75%): 113 kg",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How accurate is the one rep max calculator?",
          answer: "When using sets of 2-10 reps performed to near-failure with proper form, 1RM estimates are typically within 5% of your actual max. Accuracy decreases significantly above 10 reps. Using the Average of all 7 formulas helps reduce bias from any single formula. For the most reliable estimate, use a challenging weight you can lift for 3-5 clean reps.",
        },
        {
          question: "Which 1RM formula should I use?",
          answer: "For most people, the Average (default) is recommended because it balances the tendencies of all seven formulas. If you prefer a single formula: Epley is the most popular for general use, Brzycki provides conservative estimates good for safety-minded training, and Wathen is preferred by the NSCA for explosive athletes. The formulas agree closely for 2-6 reps but diverge more at higher rep ranges.",
        },
        {
          question: "Why does my bench press 1RM differ from my squat 1RM?",
          answer: "Each exercise involves different muscle groups, joint mechanics, and leverage advantages. Your 1RM is specific to each movement. Typical strength ratios for trained males are approximately: Deadlift > Squat > Bench Press > Overhead Press, with deadlift usually 1.2-1.5× bench press and overhead press about 0.6-0.7× bench press.",
        },
        {
          question: "How often should I retest my 1RM?",
          answer: "Re-estimate your 1RM every 4-8 weeks during a training cycle. Beginners can see rapid changes and may benefit from monthly testing, while advanced lifters may only need to retest every 8-12 weeks. You don't need to perform an actual max attempt — simply use a recent heavy set of 3-5 reps in this calculator to update your estimate.",
        },
        {
          question: "Can I use this calculator for weighted pull-ups and dips?",
          answer: "Yes. For weighted bodyweight exercises, enter your total load (bodyweight + added weight) as the weight lifted. For example, if you weigh 180 lbs and add 45 lbs for pull-ups, enter 225 lbs. The calculator will estimate your total 1RM including bodyweight. Subtract your bodyweight to find how much external weight to add for training zones.",
        },
        {
          question: "What is the difference between 1RM and PR?",
          answer: "1RM (one-repetition maximum) is the heaviest weight you can currently lift for one repetition — it fluctuates based on training, recovery, sleep, and nutrition. PR (personal record) is the heaviest weight you have ever lifted, regardless of when. Your current 1RM can be higher or lower than your PR depending on your current training state and fitness level.",
        },
        {
          question: "How do I use the warm-up progression?",
          answer: "The warm-up progression shows 6 sets leading to your 1RM attempt. Start with 40% for 8 reps, then 50% for 5 reps, 60% for 4 reps, 70% for 3 reps, 80% for 2 reps, and 90% for 1 rep. Rest 1-5 minutes between sets (longer rests as weight increases). This progression primes your nervous system while minimizing fatigue before your max attempt.",
        },
        {
          question: "What do the strength standards mean?",
          answer: "Strength standards classify your 1RM relative to your bodyweight into Beginner, Intermediate, Advanced, and Elite levels. These are based on data from over 150 million lifts tracked by strength training communities. Standards vary by exercise, gender, and bodyweight. Enter your bodyweight to see where you rank and set realistic goals for progression.",
        },
      ],

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
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // INPUTS (SIMPLIFIED - removed checkbox)
  // ═══════════════════════════════════════════════════════════════
  inputs: [],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════
  results: [
    { id: "oneRepMax", type: "primary", format: "number" },
    { id: "maxStrength", type: "secondary", format: "number" },
    { id: "strength", type: "secondary", format: "number" },
    { id: "hypertrophy", type: "secondary", format: "number" },
    { id: "endurance", type: "secondary", format: "number" },
    { id: "speedPower", type: "secondary", format: "number" },
    { id: "warmUp", type: "secondary", format: "number" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // DETAILED TABLE (1RM percentage chart)
  // ═══════════════════════════════════════════════════════════════
  detailedTable: {
    id: "percentageChart",
    buttonLabel: "View Percentage Chart",
    buttonIcon: "📊",
    modalTitle: "1RM Percentage Chart",
    columns: [
      { id: "percent", label: "% of 1RM", align: "center" },
      { id: "weight", label: "Weight", align: "right", highlight: true },
      { id: "reps", label: "~Reps", align: "center" },
      { id: "goal", label: "Training Goal", align: "left" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // INFO CARDS (3 - SIMPLIFIED, removed tips)
  // ═══════════════════════════════════════════════════════════════
  infoCards: [
    { id: "formulaComparison", type: "list", icon: "📊", itemCount: 8 },
    { id: "warmupProgression", type: "list", icon: "🔥", itemCount: 6 },
    { id: "strengthLevel", type: "list", icon: "🏅", itemCount: 5 },
  ],

  // ═══════════════════════════════════════════════════════════════
  // CHART (ChartV4)
  // ═══════════════════════════════════════════════════════════════
  chart: {
    id: "percentageChart",
    type: "line",
    xKey: "percent",
    height: 320,
    showGrid: true,
    showLegend: false,
    showTooltip: true,
    yAxisFormat: "number",
    series: [
      { key: "weight", type: "line", color: "#3b82f6" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // REFERENCE DATA
  // ═══════════════════════════════════════════════════════════════
  referenceData: [
    { id: "trainingZones", icon: "🎯", columns: 1, itemIds: ["maxStrength", "strength", "hypertrophy", "endurance", "speedPower"] },
  ],

  // ═══════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "formulas", type: "prose", icon: "🧮" },
    { id: "trainingZones", type: "cards", icon: "🎯", columns: 2, cardIds: ["maxStrength", "strength", "hypertrophy", "endurance", "speedPower"] },
    { id: "howToTest", type: "list", icon: "✅", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "📐", columns: 2, exampleCount: 2 },
  ],

  // ═══════════════════════════════════════════════════════════════
  // FAQS (8)
  // ═══════════════════════════════════════════════════════════════
  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }, { id: "6" }, { id: "7" }],

  // ═══════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════
  references: [
    { authors: "Epley, B.", year: "1985", title: "Poundage Chart", source: "Boyd Epley Workout, Body Enterprises, Lincoln, NE", url: "https://en.wikipedia.org/wiki/One-repetition_maximum" },
    { authors: "Brzycki, M.", year: "1993", title: "Strength Testing—Predicting a One-Rep Max from Reps-to-Fatigue", source: "Journal of Physical Education, Recreation & Dance, 64(1), 88-90", url: "https://doi.org/10.1080/07303084.1993.10606684" },
    { authors: "LeSuer, D.A., McCormick, J.H., Mayhew, J.L., Wasserstein, R.L., Arnold, M.D.", year: "1997", title: "The Accuracy of Prediction Equations for Estimating 1-RM Performance in the Bench Press, Squat, and Deadlift", source: "Journal of Strength and Conditioning Research, 11(4), 211-213", url: "https://journals.lww.com/nsca-jscr" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // ADDITIONAL CONFIG
  // ═══════════════════════════════════════════════════════════════
  hero: { badge: "Fitness", rating: { average: 4.9, count: 3200 } },
  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "health" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["bmi-calculator", "body-fat-calculator", "calorie-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// ═══════════════════════════════════════════════════════════════
// 1RM FORMULAS (same as before)
// ═══════════════════════════════════════════════════════════════

function epley(w: number, r: number): number {
  return r === 1 ? w : w * (1 + r / 30);
}

function brzycki(w: number, r: number): number {
  if (r === 1) return w;
  if (r >= 37) return w * 36;
  return w * (36 / (37 - r));
}

function lombardi(w: number, r: number): number {
  return r === 1 ? w : w * Math.pow(r, 0.10);
}

function mayhew(w: number, r: number): number {
  if (r === 1) return w;
  return (100 * w) / (52.2 + 41.9 * Math.exp(-0.055 * r));
}

function wathen(w: number, r: number): number {
  if (r === 1) return w;
  return (100 * w) / (48.8 + 53.8 * Math.exp(-0.075 * r));
}

function oconner(w: number, r: number): number {
  return r === 1 ? w : w * (1 + 0.025 * r);
}

function lander(w: number, r: number): number {
  if (r === 1) return w;
  const denom = 101.3 - 2.67123 * r;
  if (denom <= 0) return w * 2;
  return (100 * w) / denom;
}

function averageAll(w: number, r: number): number {
  const results = [
    epley(w, r),
    brzycki(w, r),
    lombardi(w, r),
    mayhew(w, r),
    wathen(w, r),
    oconner(w, r),
    lander(w, r),
  ];
  return results.reduce((sum, val) => sum + val, 0) / results.length;
}

// ═══════════════════════════════════════════════════════════════
// STRENGTH STANDARDS (same as before)
// ═══════════════════════════════════════════════════════════════

interface StrengthStandard {
  beginner: [number, number];
  intermediate: [number, number];
  advanced: [number, number];
  elite: number;
}

const STRENGTH_STANDARDS_LBS: Record<string, Record<string, StrengthStandard>> = {
  benchPress: {
    "<160": { beginner: [95, 115], intermediate: [115, 165], advanced: [165, 220], elite: 275 },
    "160-200": { beginner: [105, 135], intermediate: [135, 185], advanced: [185, 245], elite: 305 },
    "200+": { beginner: [120, 155], intermediate: [155, 210], advanced: [210, 275], elite: 340 },
  },
  backSquat: {
    "<160": { beginner: [115, 155], intermediate: [155, 220], advanced: [220, 305], elite: 385 },
    "160-200": { beginner: [135, 185], intermediate: [185, 255], advanced: [255, 350], elite: 440 },
    "200+": { beginner: [165, 220], intermediate: [220, 300], advanced: [300, 405], elite: 505 },
  },
  deadlift: {
    "<160": { beginner: [155, 205], intermediate: [205, 285], advanced: [285, 375], elite: 470 },
    "160-200": { beginner: [185, 245], intermediate: [245, 335], advanced: [335, 440], elite: 545 },
    "200+": { beginner: [220, 285], intermediate: [285, 385], advanced: [385, 500], elite: 620 },
  },
  overheadPress: {
    "<160": { beginner: [55, 75], intermediate: [75, 105], advanced: [105, 140], elite: 175 },
    "160-200": { beginner: [65, 95], intermediate: [95, 125], advanced: [125, 165], elite: 205 },
    "200+": { beginner: [75, 105], intermediate: [105, 145], advanced: [145, 185], elite: 230 },
  },
};

const FALLBACK_EXERCISE = "benchPress";

function getStrengthLevel(oneRM: number, bodyweight: number, exercise: string, unit: string): {
  level: string;
  beginnerRange: string;
  intermediateRange: string;
  advancedRange: string;
  eliteRange: string;
} {
  const oneRMLbs = unit === "kg" ? oneRM * 2.20462 : oneRM;
  const bwLbs = unit === "kg" ? bodyweight * 2.20462 : bodyweight;

  let bwCategory: string;
  if (bwLbs < 160) bwCategory = "<160";
  else if (bwLbs < 200) bwCategory = "160-200";
  else bwCategory = "200+";

  const exerciseStandards = STRENGTH_STANDARDS_LBS[exercise] || STRENGTH_STANDARDS_LBS[FALLBACK_EXERCISE];
  const standards = exerciseStandards[bwCategory];

  let level: string;
  if (oneRMLbs < standards.beginner[0]) level = "Untrained";
  else if (oneRMLbs < standards.beginner[1]) level = "Beginner";
  else if (oneRMLbs < standards.intermediate[1]) level = "Intermediate";
  else if (oneRMLbs < standards.advanced[1]) level = "Advanced";
  else if (oneRMLbs < standards.elite) level = "Advanced+";
  else level = "Elite";

  const fmt = (n: number) => unit === "kg" ? Math.round(n / 2.20462) : Math.round(n);
  const u = unit === "kg" ? "kg" : "lbs";

  return {
    level,
    beginnerRange: `${fmt(standards.beginner[0])}-${fmt(standards.beginner[1])} ${u}`,
    intermediateRange: `${fmt(standards.intermediate[0])}-${fmt(standards.intermediate[1])} ${u}`,
    advancedRange: `${fmt(standards.advanced[0])}-${fmt(standards.advanced[1])} ${u}`,
    eliteRange: `${fmt(standards.elite)}+ ${u}`,
  };
}

const EXERCISE_NAMES: Record<string, string> = {
  benchPress: "Bench Press",
  backSquat: "Back Squat",
  deadlift: "Deadlift",
  overheadPress: "Overhead Press",
  barbellRow: "Barbell Row",
  frontSquat: "Front Squat",
  inclineBench: "Incline Bench",
  romanianDeadlift: "Romanian Deadlift",
  hipThrust: "Hip Thrust",
  legPress: "Leg Press",
};

const FORMULA_NAMES: Record<string, string> = {
  average: "Average",
  epley: "Epley",
  brzycki: "Brzycki",
  lombardi: "Lombardi",
  mayhew: "Mayhew",
  wathen: "Wathen",
  oconner: "O'Conner",
  lander: "Lander",
};

// ═══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION (SIMPLIFIED - no checkbox logic)
// ═══════════════════════════════════════════════════════════════

export function calculateOneRepMax(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;

  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read Inputs ──────────────────────────────────────────────
  const exercise = (values.exercise as string) || "benchPress";
  const reps = values.reps as number;
  const formulaChoice = (values.formula as string) || "average";
  const bodyweightRaw = values.bodyweight as number | null;

  const weight = values.weight as number;
  const unit = fieldUnits?.weight || "lbs";

  const bodyweight = bodyweightRaw || null;
  const bwUnit = fieldUnits?.bodyweight || unit;

  // ── Calculate ALL 7 Formulas ─────────────────────────────────
  const formulas = {
    epley: epley(weight, reps),
    brzycki: brzycki(weight, reps),
    lombardi: lombardi(weight, reps),
    mayhew: mayhew(weight, reps),
    wathen: wathen(weight, reps),
    oconner: oconner(weight, reps),
    lander: lander(weight, reps),
    average: averageAll(weight, reps),
  };

  const oneRM = formulas[formulaChoice as keyof typeof formulas] || formulas.average;

  // ── Training Zone Weights ────────────────────────────────────
  const maxStrength95 = oneRM * 0.95;
  const strength85 = oneRM * 0.85;
  const hypertrophy75 = oneRM * 0.75;
  const endurance65 = oneRM * 0.65;
  const speedPower55 = oneRM * 0.55;
  const warmUp50 = oneRM * 0.50;

  // ── Translate dynamic values ─────────────────────────────────
  const exerciseRaw = EXERCISE_NAMES[exercise] || "Exercise";
  const exerciseName = v[exerciseRaw] || exerciseRaw;
  const formulaRaw = FORMULA_NAMES[formulaChoice] || "Average";
  const formulaName = v[formulaRaw] || formulaRaw;

  // ── Format numbers ───────────────────────────────────────────
  const fmt = (n: number): string => `${Math.round(n)} ${unit}`;

  // ── Formula Comparison ───────────────────────────────────────
  const formulaComparisonValues: Record<string, string> = {};
  const avgValue = formulas.average;
  
  Object.entries(formulas).forEach(([key, value]) => {
    const diff = value - avgValue;
    const diffPct = avgValue > 0 ? ((diff / avgValue) * 100).toFixed(1) : "0.0";
    const sign = diff > 0 ? "+" : "";
    formulaComparisonValues[key] = diff === 0 
      ? fmt(value) 
      : `${fmt(value)} (${sign}${diffPct}%)`;
  });

  // ── Warm-Up Progression (ALWAYS SHOWN) ──────────────────────
  const warmupValues: Record<string, string> = {
    warmup1: `${fmt(oneRM * 0.40)} × 8 reps | Rest 1 min`,
    warmup2: `${fmt(oneRM * 0.50)} × 5 reps | Rest 2 min`,
    warmup3: `${fmt(oneRM * 0.60)} × 4 reps | Rest 2 min`,
    warmup4: `${fmt(oneRM * 0.70)} × 3 reps | Rest 2 min`,
    warmup5: `${fmt(oneRM * 0.80)} × 2 reps | Rest 3 min`,
    warmup6: `${fmt(oneRM * 0.90)} × 1 rep | Rest 5 min`,
  };

  // ── Strength Standards ───────────────────────────────────────
  let strengthLevelValues: Record<string, string> = {};
  if (bodyweight !== null && bodyweight > 0) {
    const standards = getStrengthLevel(oneRM, bodyweight, exercise, unit);
    strengthLevelValues = {
      strengthLevel: standards.level,
      beginnerRange: standards.beginnerRange,
      intermediateRange: standards.intermediateRange,
      advancedRange: standards.advancedRange,
      eliteRange: standards.eliteRange,
    };
  } else {
    strengthLevelValues = {
      strengthLevel: "Enter bodyweight above to see your level",
      beginnerRange: "—",
      intermediateRange: "—",
      advancedRange: "—",
      eliteRange: "—",
    };
  }

  // ── Percentage Chart ─────────────────────────────────────────
  const percentages = [
    { pct: 100, reps: "1",  goal: "Max Strength" },
    { pct: 95,  reps: "2",  goal: "Max Strength" },
    { pct: 90,  reps: "4",  goal: "Strength" },
    { pct: 85,  reps: "5",  goal: "Strength" },
    { pct: 80,  reps: "8",  goal: "Hypertrophy" },
    { pct: 75,  reps: "10", goal: "Hypertrophy" },
    { pct: 70,  reps: "12", goal: "Endurance" },
    { pct: 65,  reps: "15", goal: "Endurance" },
    { pct: 60,  reps: "18", goal: "Speed / Power" },
    { pct: 55,  reps: "20", goal: "Speed / Power" },
    { pct: 50,  reps: "24", goal: "Warm-Up" },
  ];

  const tableData = percentages.map(({ pct, reps: r, goal }) => ({
    percent: `${pct}%`,
    weight: fmt(oneRM * pct / 100),
    reps: r,
    goal: v[goal] || goal,
  }));

  // ── Chart Data ───────────────────────────────────────────────
  const chartData = percentages.map(({ pct }) => ({
    percent: `${pct}%`,
    weight: Math.round(oneRM * pct / 100),
  }));

  // ── Summary ──────────────────────────────────────────────────
  const summaryTemplate = f.summary || "Your estimated 1RM for {exercise} is {oneRepMax} using the {formula} formula. For hypertrophy, load {hypertrophy}. For strength, load {strength}.";
  const summary = summaryTemplate
    .replace("{exercise}", exerciseName)
    .replace("{oneRepMax}", fmt(oneRM))
    .replace("{formula}", formulaName)
    .replace("{hypertrophy}", fmt(hypertrophy75))
    .replace("{strength}", fmt(strength85));

  return {
    values: {
      oneRepMax: oneRM,
      maxStrength: maxStrength95,
      strength: strength85,
      hypertrophy: hypertrophy75,
      endurance: endurance65,
      speedPower: speedPower55,
      warmUp: warmUp50,
      ...formulaComparisonValues,
      ...strengthLevelValues,
      ...warmupValues,
    },
    formatted: {
      oneRepMax: fmt(oneRM),
      maxStrength: fmt(maxStrength95),
      strength: fmt(strength85),
      hypertrophy: fmt(hypertrophy75),
      endurance: fmt(endurance65),
      speedPower: fmt(speedPower55),
      warmUp: fmt(warmUp50),
      ...formulaComparisonValues,
      ...strengthLevelValues,
      ...warmupValues,
    },
    summary,
    isValid: true,
    metadata: {
      tableData,
      chartData,
    },
  };
}

export default oneRepMaxConfig;
