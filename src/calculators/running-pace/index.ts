// ⚡ RUNNING PACE CALCULATOR V4 - IMPROVED
// Added: Heart Rate Zones, Split Times Table, Pace Chart, 12 FAQs, 6 Education Sections
import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════
const DISTANCES: Record<string, { miles: number; km: number; meters: number }> =
  {
    "1mile": { miles: 1, km: 1.609344, meters: 1609.344 },
    "5k": { miles: 3.10686, km: 5, meters: 5000 },
    "10k": { miles: 6.21371, km: 10, meters: 10000 },
    halfMarathon: { miles: 13.10938, km: 21.0975, meters: 21097.5 },
    marathon: { miles: 26.21875, km: 42.195, meters: 42195 },
  };

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/** VO₂ from velocity in m/min (Daniels & Gilbert) */
function vo2FromVelocity(v: number): number {
  return -4.6 + 0.182258 * v + 0.000104 * v * v;
}

/** %VO₂max sustainable for a given time in minutes (Daniels & Gilbert) */
function percentVO2max(t: number): number {
  return (
    0.8 +
    0.1894393 * Math.exp(-0.012778 * t) +
    0.2989558 * Math.exp(-0.1932605 * t)
  );
}

/** VDOT from race distance (meters) and time (minutes) */
function calcVDOT(distMeters: number, timeMins: number): number {
  const clamped = Math.max(3.5, Math.min(240, timeMins));
  const velocity = distMeters / clamped;
  const vo2 = vo2FromVelocity(velocity);
  const pct = percentVO2max(clamped);
  return pct > 0 ? vo2 / pct : 0;
}

/** Velocity (m/min) from a target VO₂ — inverse of vo2FromVelocity */
function velocityFromVO2(targetVO2: number): number {
  const a = 0.000104;
  const b = 0.182258;
  const c = -4.6 - targetVO2;
  const disc = b * b - 4 * a * c;
  if (disc < 0) return 0;
  return (-b + Math.sqrt(disc)) / (2 * a);
}

/** Seconds-per-mile for a given VDOT and %VO₂max zone */
function paceForZone(vdot: number, pctZone: number): number {
  const tgtVO2 = vdot * pctZone;
  const vel = velocityFromVO2(tgtVO2); // m/min
  if (vel <= 0) return 0;
  return (1609.344 / vel) * 60; // sec/mile
}

/** Format seconds → M:SS or H:MM:SS */
function fmtTime(totalSec: number): string {
  if (!isFinite(totalSec) || totalSec <= 0) return "0:00";
  let h = Math.floor(totalSec / 3600);
  let m = Math.floor((totalSec % 3600) / 60);
  let s = Math.round(totalSec % 60);
  if (s === 60) { m += 1; s = 0; }
  if (m === 60) { h += 1; m = 0; }
  const ss = s.toString().padStart(2, "0");
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${ss}`;
  return `${m}:${ss}`;
}

/** Format seconds → M:SS (always minutes:seconds for pace) */
function fmtPace(sec: number): string {
  if (!isFinite(sec) || sec <= 0) return "0:00";
  let m = Math.floor(sec / 60);
  let s = Math.round(sec % 60);
  if (s === 60) { m += 1; s = 0; }
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/** Calculate max heart rate from age */
function maxHR(age: number): number {
  return 220 - age;
}

// ═══════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════
export const runningPaceConfig: CalculatorConfigV4 = {
  id: "running-pace",
  version: "4.0",
  category: "health",
  icon: "🏃",

  // ─────────────────────────────────────────────────────────────
  // PRESETS
  // ─────────────────────────────────────────────────────────────
  presets: [
    {
      id: "beginner5k",
      icon: "🐢",
      values: {
        calculationMode: "calculatePace",
        raceDistance: "5k",
        timeHours: 0,
        timeMinutes: 35,
        timeSeconds: 0,
        age: 30,
      },
    },
    {
      id: "sub25_5k",
      icon: "🏃",
      values: {
        calculationMode: "calculatePace",
        raceDistance: "5k",
        timeHours: 0,
        timeMinutes: 25,
        timeSeconds: 0,
        age: 30,
      },
    },
    {
      id: "sub2Half",
      icon: "🎯",
      values: {
        calculationMode: "calculatePace",
        raceDistance: "halfMarathon",
        timeHours: 1,
        timeMinutes: 59,
        timeSeconds: 59,
        age: 30,
      },
    },
    {
      id: "bqAttempt",
      icon: "🏅",
      values: {
        calculationMode: "calculatePace",
        raceDistance: "marathon",
        timeHours: 3,
        timeMinutes: 0,
        timeSeconds: 0,
        age: 35,
      },
    },
    {
      id: "fast10k",
      icon: "⚡",
      values: {
        calculationMode: "calculatePace",
        raceDistance: "10k",
        timeHours: 0,
        timeMinutes: 45,
        timeSeconds: 0,
        age: 30,
      },
    },
    {
      id: "eliteMarathon",
      icon: "🔥",
      values: {
        calculationMode: "calculatePace",
        raceDistance: "marathon",
        timeHours: 2,
        timeMinutes: 30,
        timeSeconds: 0,
        age: 28,
      },
    },
  ],

  // ─────────────────────────────────────────────────────────────
  // TRANSLATIONS (English only — install script adds others)
  // ─────────────────────────────────────────────────────────────
  t: {
    en: {
      name: "Running Pace Calculator",
      slug: "running-pace-calculator",
      subtitle:
        "Calculate your pace, predict race times, get VDOT training zones, heart rate zones, and personalized split times for any distance",
      breadcrumb: "Running Pace",

      // ── SEO ──────────────────────────────────────────────────
      seo: {
        title:
          "Running Pace Calculator - VDOT, Heart Rate Zones & Race Splits",
        description:
          "Calculate running pace from time and distance. Get VDOT score, race predictions, training zones, heart rate zones, split times, and calorie estimates for 5K, 10K, half marathon, and marathon.",
        shortDescription:
          "Calculate pace, VDOT, training zones, heart rate zones, and race splits",
        keywords: [
          "running pace calculator",
          "vdot calculator",
          "race time predictor",
          "running training zones",
          "heart rate zones running",
          "marathon pace calculator",
          "race split calculator",
          "5k pace calculator",
          "daniels running formula",
          "running split times",
        ],
      },

      // ── UI ───────────────────────────────────────────────────
      calculator: { yourInformation: "Race Details" },
      ui: {
        yourInformation: "Race Details",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      // ── INPUTS ───────────────────────────────────────────────
      inputs: {
        calculationMode: {
          label: "I want to calculate",
          helpText: "Choose what to solve for",
          options: {
            calculatePace: "My Pace",
            calculateTime: "My Finish Time",
          },
        },
        raceDistance: {
          label: "Race Distance",
          helpText: "Select a standard race or enter a custom distance",
          options: {
            "1mile": "1 Mile",
            "5k": "5K",
            "10k": "10K",
            halfMarathon: "Half Marathon",
            marathon: "Marathon",
            custom: "Custom Distance",
          },
        },
        customDistance: {
          label: "Distance",
          helpText: "Enter your distance based on the selected unit system",
        },
        timeHours: {
          label: "Hours",
        },
        timeMinutes: {
          label: "Minutes",
        },
        timeSeconds: {
          label: "Seconds",
        },
        paceMinutes: {
          label: "Pace (min)",
        },
        paceSeconds: {
          label: "Pace (sec)",
        },
        age: {
          label: "Age",
          helpText: "Used to calculate heart rate training zones",
        },
        weight: {
          label: "Weight",
          helpText: "Optional - used to estimate calories burned",
        },
      },

      // ── INPUT GROUPS ─────────────────────────────────────────
      inputGroups: {},

      // ── RESULTS ──────────────────────────────────────────────
      results: {
        pace: { label: "Pace" },
        pacePerMile: { label: "Pace/mi" },
        pacePerKm: { label: "Pace/km" },
        speed: { label: "Speed" },
        totalTime: { label: "Finish Time" },
        calories: { label: "Calories Burned" },
        vdotScore: { label: "VDOT Score" },
      },

      // ── PRESETS ──────────────────────────────────────────────
      presets: {
        beginner5k: {
          label: "Beginner 5K",
          description: "35-minute 5K finish",
        },
        sub25_5k: {
          label: "Sub-25 5K",
          description: "25-minute 5K goal",
        },
        sub2Half: {
          label: "Sub-2hr Half",
          description: "Break 2 hours in the half marathon",
        },
        bqAttempt: {
          label: "BQ Attempt",
          description: "3:00 marathon — Boston Qualifier pace",
        },
        fast10k: {
          label: "Fast 10K",
          description: "45-minute 10K finish",
        },
        eliteMarathon: {
          label: "Elite Marathon",
          description: "2:30 marathon — elite sub-elite pace",
        },
      },

      // ── TOOLTIPS ─────────────────────────────────────────────
      tooltips: {
        pace: "Time it takes to cover one unit of distance",
        pacePerMile: "Your pace in minutes per mile",
        pacePerKm: "Your pace in minutes per kilometer",
        speed: "How fast you are moving in distance per hour",
        totalTime: "Estimated finish time for the selected distance",
        calories:
          "Estimated calories burned based on weight and distance",
        vdotScore:
          "Jack Daniels' VDOT fitness score — higher is fitter",
      },

      // ── VALUES (dynamic strings for calculate) ───────────────
      values: {
        "min/mi": "min/mi",
        "min/km": "min/km",
        mph: "mph",
        "km/h": "km/h",
        mi: "mi",
        km: "km",
        cal: "cal",
        lbs: "lbs",
        kg: "kg",
        bpm: "bpm",
        Easy: "Easy",
        Marathon: "Marathon",
        Threshold: "Threshold",
        Interval: "Interval",
        Repetition: "Repetition",
        Conversational: "Conversational",
        Steady: "Steady",
        "Comfortably Hard": "Comfortably Hard",
        "Hard (3-5 min)": "Hard (3-5 min)",
        "Fast & Short": "Fast & Short",
        "1 Mile": "1 Mile",
        "5K": "5K",
        "10K": "10K",
        "Half Marathon": "Half Marathon",
        Marathon: "Marathon",
        "Race Predictions": "Race Predictions",
        "Training Zones": "Training Zones",
        "Heart Rate Zones": "Heart Rate Zones",
        "Predicted Time": "Predicted Time",
        "Predicted Pace": "Predicted Pace",
        "Zone 1": "Zone 1",
        "Zone 2": "Zone 2",
        "Zone 3": "Zone 3",
        "Zone 4": "Zone 4",
        "Zone 5": "Zone 5",
        "Recovery": "Recovery",
        "Aerobic": "Aerobic",
        "Tempo": "Tempo",
        "Lactate Threshold": "Lactate Threshold",
        "VO2 Max": "VO2 Max",
      },

      // ── FORMATS ──────────────────────────────────────────────
      formats: {
        summary:
          "Your pace is {pace} {paceUnit}. Speed: {speed}. Estimated VDOT: {vdot}. Max HR: {maxHR} bpm.",
      },

      // ── INFO CARDS ───────────────────────────────────────────
      infoCards: {
        paceMetrics: {
          title: "📊 Pace & Speed",
          items: [
            { label: "Pace per Mile", valueKey: "pacePerMile" },
            { label: "Pace per Km", valueKey: "pacePerKm" },
            { label: "Speed", valueKey: "speed" },
            { label: "Finish Time", valueKey: "totalTime" },
          ],
        },
        fitnessMetrics: {
          title: "💪 Fitness Metrics",
          items: [
            { label: "VDOT Score", valueKey: "vdotScore" },
            { label: "Calories Burned", valueKey: "calories" },
            { label: "Max Heart Rate", valueKey: "maxHR" },
            { label: "Training Level", valueKey: "trainingLevel" },
          ],
        },
        raceTips: {
          title: "🏁 Race Day Tips",
          items: [
            "Start conservatively — aim for even or negative splits",
            "Practice your race pace during training long runs",
            "Don't try anything new on race day (shoes, food, gear)",
            "Hydrate early — by the time you're thirsty it's too late",
          ],
        },
        trainingTips: {
          title: "💡 Training Tips",
          items: [
            "Follow the 80/20 rule — 80% easy, 20% hard effort",
            "Include one tempo run and one interval session per week",
            "Strength train 2x per week to improve running economy",
            "Never increase weekly mileage by more than 10%",
          ],
        },
      },

      // ── REFERENCE DATA ───────────────────────────────────────
      referenceData: {
        worldRecords: {
          title: "World Record Paces",
          items: {
            mile: {
              label: "1 Mile",
              value: "3:43 (M) / 4:07 (F)",
            },
            fiveK: {
              label: "5K",
              value: "12:35 (M) / 14:00 (F)",
            },
            tenK: {
              label: "10K",
              value: "26:11 (M) / 28:54 (F)",
            },
            half: {
              label: "Half Marathon",
              value: "57:31 (M) / 1:02:52 (F)",
            },
            full: {
              label: "Marathon",
              value: "2:00:35 (M) / 2:09:56 (F)",
            },
          },
        },
      },

      // ── EDUCATION ────────────────────────────────────────────
      education: {
        whatIs: {
          title: "What is Running Pace?",
          content:
            "Running pace is the time it takes to cover a specific distance, typically expressed as minutes per mile (min/mi) or minutes per kilometer (min/km). It is the inverse of speed — while speed tells you how fast you are going (e.g., 7.5 mph), pace tells you how long each unit of distance takes (e.g., 8:00/mile). Understanding your pace is fundamental for effective training, smart racing, and consistent improvement. Whether you are training for your first 5K or chasing a marathon personal record, knowing your target pace helps you avoid the most common mistake in distance running: starting too fast and fading in the second half.",
        },
        trainingZones: {
          title: "Understanding VDOT Training Zones",
          content:
            "Training zones, developed by renowned exercise physiologist Jack Daniels, are specific pace ranges designed to target different physiological adaptations. Each zone stresses your body in a unique way: Easy pace builds your aerobic base and promotes recovery, Marathon pace develops efficiency at sustained effort, Threshold (tempo) pace improves your lactate clearance capacity, Interval pace boosts your VO₂max ceiling, and Repetition pace enhances running economy and neuromuscular speed. The key insight from Daniels' research is that training at the right intensity matters more than simply running hard every day. Your VDOT score, calculated from a recent race performance, determines the exact pace for each zone — ensuring your training is precisely calibrated to your current fitness level.",
        },
        heartRateTraining: {
          title: "Heart Rate Training Zones Explained",
          content:
            "Heart rate zones are intensity ranges based on your maximum heart rate (estimated as 220 minus your age). Zone 1 (50-60% max HR) is for recovery and warm-up. Zone 2 (60-70%) builds aerobic base — most training should be here. Zone 3 (70-80%) is moderate effort, marathon pace. Zone 4 (80-90%) is threshold/tempo effort, where lactate begins to accumulate. Zone 5 (90-100%) is maximum effort for short intervals. Training by heart rate helps ensure you're hitting the right intensity — particularly important on hills, in heat, or when fatigue masks your true effort level. Many runners train too hard on easy days (above Zone 2) and not hard enough on hard days (below Zone 4), missing the polarized training effect that drives improvement.",
        },
        paceImprovement: {
          title: "Tips for Improving Your Running Pace",
          items: [
            {
              text: "Follow the 80/20 rule — run 80% of your weekly volume at easy, conversational pace and only 20% at harder efforts",
              type: "info",
            },
            {
              text: "Include one weekly tempo run at threshold pace (comfortably hard) to push your lactate threshold higher",
              type: "info",
            },
            {
              text: "Add strides (6-8 short 20-second accelerations) after easy runs to develop speed without fatigue",
              type: "info",
            },
            {
              text: "Strength train at least twice per week — strong glutes, core, and calves dramatically improve running economy",
              type: "info",
            },
            {
              text: "Avoid increasing total weekly mileage by more than 10% to prevent overuse injuries",
              type: "warning",
            },
            {
              text: "Prioritize sleep and nutrition — recovery is where your body actually builds fitness from the training stimulus",
              type: "info",
            },
          ],
        },
        commonMistakes: {
          title: "Common Pacing Mistakes to Avoid",
          items: [
            {
              text: "Starting too fast in races — burning through glycogen stores in the first miles leads to painful slowdowns after mile 18-20",
              type: "warning",
            },
            {
              text: "Running all workouts at the same moderate intensity — this 'gray zone' training limits both recovery and performance gains",
              type: "warning",
            },
            {
              text: "Ignoring environmental conditions — heat, humidity, altitude, and headwinds all require pace adjustments of 10-30 seconds per mile",
              type: "info",
            },
            {
              text: "Chasing pace on every single run — some days should be genuinely easy regardless of what your watch says",
              type: "info",
            },
            {
              text: "Using your race pace for daily training — most training should be 1-2 minutes per mile slower than your goal race pace",
              type: "warning",
            },
            {
              text: "Ignoring heart rate data — training by pace alone can lead to overtraining on hot days or undertraining on hilly routes",
              type: "warning",
            },
          ],
        },
        raceStrategy: {
          title: "Race Day Pacing Strategy",
          items: [
            {
              text: "Start 10-15 seconds per mile slower than goal pace — early restraint pays huge dividends in the final miles",
              type: "info",
            },
            {
              text: "Run even splits or negative splits (second half faster) — positive splits (fading) cost you 2-3 minutes in a marathon",
              type: "info",
            },
            {
              text: "Use mile markers to check pace, not your watch every 30 seconds — constant checking increases mental fatigue",
              type: "info",
            },
            {
              text: "Account for elevation — slow down 10-20 sec/mile on uphills, don't overcorrect on downhills (save your quads)",
              type: "info",
            },
            {
              text: "Have a plan B — if conditions are brutal (heat, wind), adjust goal pace by 10-30 sec/mile to avoid blowing up",
              type: "warning",
            },
            {
              text: "Practice race pace in training — your goal pace should feel 'comfortably hard' in workouts, not like an all-out sprint",
              type: "info",
            },
          ],
        },
        calculationExamples: {
          title: "Calculation Examples",
          description: "Step-by-step pace and race prediction examples",
          examples: [
            {
              title: "Calculate 5K Pace",
              steps: [
                "Distance: 5K (3.107 miles)",
                "Finish time: 25:00 (1,500 seconds)",
                "Pace = 1,500 ÷ 3.107 = 482.8 sec/mile",
                "Pace = 8:03 per mile (5:00 per km)",
                "Speed = 3.107 ÷ (1500/3600) = 7.46 mph",
              ],
              result: "Pace: 8:03/mi · Speed: 7.5 mph · VDOT: ~44",
            },
            {
              title: "Predict Marathon from 10K",
              steps: [
                "10K time: 50:00 (3,000 seconds)",
                "Marathon distance: 42,195 m",
                "Riegel: T₂ = T₁ × (D₂/D₁)^1.06",
                "T₂ = 3000 × (42195/10000)^1.06",
                "T₂ = 3000 × 4.577 = 13,732 sec",
              ],
              result: "Predicted marathon: 3:48:52",
            },
          ],
        },
      },

      // ── FAQs ─────────────────────────────────────────────────
      faqs: [
        {
          question: "What is a good running pace for beginners?",
          answer:
            "A good beginner pace is typically 10:00-13:00 per mile (6:13-8:05 per km). The most important thing for new runners is being able to hold a conversation while running — if you can talk comfortably, you are at the right pace. Most beginners finish their first 5K between 30-40 minutes, which translates to roughly a 10:00-13:00/mile pace. Focus on completing the distance first before worrying about speed.",
        },
        {
          question:
            "What is the difference between pace and speed?",
          answer:
            "Pace and speed are inverses of each other. Speed measures distance per unit of time (e.g., 7.5 miles per hour), while pace measures time per unit of distance (e.g., 8:00 per mile). Runners prefer pace because it directly translates to race planning — if you know your pace is 8:00/mile for a 5K, you know each mile marker should come at 8-minute intervals. Speed is more commonly used in cycling and driving.",
        },
        {
          question: "What is VDOT and how is it calculated?",
          answer:
            "VDOT is a fitness metric developed by exercise physiologist Jack Daniels. It represents your current running fitness level based on a recent race performance. The calculation uses the Daniels-Gilbert formula which considers your race distance and finishing time to estimate your VO₂max (maximum oxygen uptake). A higher VDOT means greater aerobic fitness. For context, recreational runners typically score 25-45, competitive club runners 45-60, and elite runners 65-85. Your VDOT is used to prescribe personalized training paces for each training zone.",
        },
        {
          question: "How accurate are the race time predictions?",
          answer:
            "Race predictions use Riegel's formula (T₂ = T₁ × (D₂/D₁)^1.06), which is well-validated for trained runners racing between 1 mile and marathon. Predictions are most accurate when your input race is close to the target distance — for example, a 10K result predicts a half marathon more reliably than it predicts a mile time. The formula assumes similar training volume and race conditions. Predictions become less reliable at extreme distances (ultramarathons) or if you are significantly undertrained for the longer distance.",
        },
        {
          question: "What are training zones and why do they matter?",
          answer:
            "Training zones are specific pace ranges that target different physiological adaptations. Easy pace (59-74% VO₂max) builds aerobic endurance and recovery. Marathon pace (75-84%) develops sustained effort capacity. Threshold pace (83-88%) improves lactate clearance — the key to racing faster. Interval pace (95-100%) raises your VO₂max ceiling. Repetition pace (105%+) improves speed and running economy. Training in the right zones ensures you get the intended benefit from each workout without unnecessary fatigue or injury risk.",
        },
        {
          question: "How many calories does running burn?",
          answer:
            "A common approximation is that running burns about 100 calories per mile (62 per km) for a 155-pound (70 kg) person. More precisely, calorie burn is approximately equal to your body weight in kilograms multiplied by the distance in kilometers multiplied by 1.036. So a 70 kg runner covering 10 km burns roughly 725 calories. Pace has a minor effect — faster running burns slightly more calories per minute but fewer per mile, so total distance and body weight are the dominant factors.",
        },
        {
          question:
            "Should I train at my goal race pace every day?",
          answer:
            "No — this is one of the most common training mistakes. Research consistently shows that 80% of your weekly running volume should be at easy, conversational pace (1-2 minutes per mile slower than race pace). Only 20% should be at moderate-to-hard intensity. Running too fast too often puts you in a 'gray zone' where you are too tired to recover properly but not fast enough to trigger the specific adaptations from quality workouts like tempo runs and intervals.",
        },
        {
          question: "What is the Riegel formula?",
          answer:
            "The Riegel formula, published by Peter Riegel in 1977, predicts race performance across distances using the equation T₂ = T₁ × (D₂/D₁)^1.06. T₁ is your known race time, D₁ is that race's distance, D₂ is the target distance, and T₂ is the predicted time. The exponent 1.06 accounts for the fact that pace naturally slows as distance increases due to physiological fatigue factors. It remains one of the most widely used and validated race prediction formulas in running.",
        },
        {
          question: "How do I calculate my heart rate training zones?",
          answer:
            "The simplest method uses your age to estimate max heart rate: 220 minus your age. For example, a 30-year-old has an estimated max HR of 190 bpm. Zone 1 (recovery) is 50-60% of max (95-114 bpm), Zone 2 (aerobic base) is 60-70% (114-133 bpm), Zone 3 (moderate) is 70-80% (133-152 bpm), Zone 4 (threshold) is 80-90% (152-171 bpm), and Zone 5 (max effort) is 90-100% (171-190 bpm). For more accuracy, determine your actual max HR through a field test or lab assessment.",
        },
        {
          question: "What are negative splits and why do they work?",
          answer:
            "Negative splits mean running the second half of your race faster than the first half. This strategy works because it conserves glycogen early when you don't need it, reduces lactic acid buildup, and gives you a psychological boost as you pass fading runners. Studies show negative splits typically result in faster overall times than even pacing. The key is starting 10-15 seconds per mile slower than goal pace in the first quarter, settling into goal pace for the middle half, then increasing effort in the final quarter when you know you can finish.",
        },
        {
          question: "How do split times help with race pacing?",
          answer:
            "Split times break your race into segments (usually miles or kilometers) so you can monitor your pace throughout. For a marathon, mile-by-mile splits help you avoid the classic mistake of starting too fast — if your first mile is 20 seconds faster than goal pace, you know to slow down immediately before damage is done. Splits also help you adjust for hills, wind, or fatigue. Elite runners often have nearly identical splits for each mile, while beginners tend to start fast and fade (positive splits), which costs significant time.",
        },
        {
          question: "Should I train by pace or by heart rate?",
          answer:
            "Both have value, but heart rate is often more reliable for easy runs while pace works better for workouts. Heart rate accounts for external factors (heat, humidity, hills, fatigue) that pace ignores — on a 90°F day, your 'easy pace' might spike your heart rate into Zone 4. For tempo runs and intervals, pace is more precise because heart rate lags behind effort and can be affected by caffeine, stress, or sleep. The ideal approach: use heart rate for easy runs (stay in Zone 2), use pace for quality workouts (hit target times), and use both to detect overtraining or undertraining.",
        },
      ],

      // ── DETAILED TABLE ───────────────────────────────────────
      detailedTable: {
        trainingZones: {
          button: "View Predictions & Training Zones",
          title: "Race Predictions & VDOT Training Zones",
          columns: {
            zone: "Zone / Distance",
            paceMi: "Pace/mi",
            paceKm: "Pace/km",
            detail: "Details",
          },
        },
        splits: {
          button: "View Race Split Times",
          title: "Mile-by-Mile / Km-by-Km Split Times",
          columns: {
            segment: "Mile/Km",
            time: "Split Time",
            elapsed: "Elapsed Time",
            pace: "Pace",
          },
        },
      },

      // ── CHART ────────────────────────────────────────────────
      chart: {
        title: "Pace Across Distances",
        xLabel: "Distance",
        yLabel: "Pace (min/mile)",
        series: {
          pace: "Your Pace",
          easyPace: "Easy Pace",
          thresholdPace: "Threshold Pace",
        },
      },

      // ── RATING ───────────────────────────────────────────────
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

      // ── COMMON ───────────────────────────────────────────────
      common: { home: "Home", calculators: "Calculators" },

      // ── BUTTONS ──────────────────────────────────────────────
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
      "name": "Calculadora de Ritmo de Carrera",
      "slug": "calculadora-ritmo-carrera",
      "subtitle": "Calcula tu ritmo, predice tiempos de carrera, obtén zonas de entrenamiento VDOT, zonas de frecuencia cardíaca y tiempos parciales personalizados para cualquier distancia",
      "breadcrumb": "Ritmo de Carrera",
      "seo": {
        "title": "Calculadora de Ritmo de Carrera - VDOT, Zonas de FC y Parciales",
        "description": "Calcula el ritmo de carrera desde tiempo y distancia. Obtén puntuación VDOT, predicciones de carrera, zonas de entrenamiento, zonas de frecuencia cardíaca, tiempos parciales y estimaciones de calorías para 5K, 10K, medio maratón y maratón.",
        "shortDescription": "Calcula ritmo, VDOT, zonas de entrenamiento, zonas de FC y parciales de carrera",
        "keywords": [
          "calculadora ritmo carrera",
          "calculadora vdot",
          "predictor tiempo carrera",
          "zonas entrenamiento running",
          "zonas frecuencia cardiaca running",
          "calculadora ritmo maraton",
          "calculadora parciales carrera",
          "calculadora ritmo 5k",
          "formula running daniels",
          "tiempos parciales running"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "calculationMode": {
          "label": "Quiero calcular",
          "helpText": "Elige qué resolver",
          "options": {
            "calculatePace": "Mi Ritmo",
            "calculateTime": "Mi Tiempo Final"
          }
        },
        "raceDistance": {
          "label": "Distancia de Carrera",
          "helpText": "Selecciona una carrera estándar o ingresa una distancia personalizada",
          "options": {
            "1mile": "1 Milla",
            "5k": "5K",
            "10k": "10K",
            "halfMarathon": "Medio Maratón",
            "marathon": "Maratón",
            "custom": "Distancia Personalizada"
          }
        },
        "customDistance": {
          "label": "Distancia",
          "helpText": "Ingresa tu distancia basada en el sistema de unidades seleccionado"
        },
        "timeHours": {
          "label": "Horas"
        },
        "timeMinutes": {
          "label": "Minutos"
        },
        "timeSeconds": {
          "label": "Segundos"
        },
        "paceMinutes": {
          "label": "Ritmo (min)"
        },
        "paceSeconds": {
          "label": "Ritmo (seg)"
        },
        "age": {
          "label": "Edad",
          "helpText": "Usado para calcular zonas de entrenamiento por frecuencia cardíaca"
        },
        "weight": {
          "label": "Peso",
          "helpText": "Opcional - usado para estimar calorías quemadas"
        }
      },
      "inputGroups": {},
      "results": {
        "pace": {
          "label": "Ritmo"
        },
        "pacePerMile": {
          "label": "Ritmo/milla"
        },
        "pacePerKm": {
          "label": "Ritmo/km"
        },
        "speed": {
          "label": "Velocidad"
        },
        "totalTime": {
          "label": "Tiempo Final"
        },
        "calories": {
          "label": "Calorías Quemadas"
        },
        "vdotScore": {
          "label": "Puntuación VDOT"
        }
      },
      "presets": {
        "beginner5k": {
          "label": "5K Principiante",
          "description": "Final de 5K en 35 minutos"
        },
        "sub25_5k": {
          "label": "5K Sub-25",
          "description": "Objetivo de 5K en 25 minutos"
        },
        "sub2Half": {
          "label": "Medio Sub-2hr",
          "description": "Romper 2 horas en el medio maratón"
        },
        "bqAttempt": {
          "label": "Intento BQ",
          "description": "Maratón de 3:00 — ritmo clasificatorio Boston"
        },
        "fast10k": {
          "label": "10K Rápido",
          "description": "Final de 10K en 45 minutos"
        },
        "eliteMarathon": {
          "label": "Maratón Elite",
          "description": "Maratón de 2:30 — ritmo elite sub-elite"
        }
      },
      "tooltips": {
        "pace": "Tiempo que toma cubrir una unidad de distancia",
        "pacePerMile": "Tu ritmo en minutos por milla",
        "pacePerKm": "Tu ritmo en minutos por kilómetro",
        "speed": "Qué tan rápido te mueves en distancia por hora",
        "totalTime": "Tiempo final estimado para la distancia seleccionada",
        "calories": "Calorías estimadas quemadas basado en peso y distancia",
        "vdotScore": "Puntuación de fitness VDOT de Jack Daniels — más alto es mejor forma"
      },
      "values": {
        "min/mi": "min/milla",
        "min/km": "min/km",
        "mph": "mph",
        "km/h": "km/h",
        "mi": "milla",
        "km": "km",
        "cal": "cal",
        "lbs": "lbs",
        "kg": "kg",
        "bpm": "ppm",
        "Easy": "Fácil",
        "Marathon": "Maratón",
        "Threshold": "Umbral",
        "Interval": "Intervalo",
        "Repetition": "Repetición",
        "Conversational": "Conversacional",
        "Steady": "Constante",
        "Comfortably Hard": "Cómodamente Duro",
        "Hard (3-5 min)": "Duro (3-5 min)",
        "Fast & Short": "Rápido y Corto",
        "1 Mile": "1 Milla",
        "5K": "5K",
        "10K": "10K",
        "Half Marathon": "Medio Maratón",
        "Race Predictions": "Predicciones de Carrera",
        "Training Zones": "Zonas de Entrenamiento",
        "Heart Rate Zones": "Zonas de Frecuencia Cardíaca",
        "Predicted Time": "Tiempo Predicho",
        "Predicted Pace": "Ritmo Predicho",
        "Zone 1": "Zona 1",
        "Zone 2": "Zona 2",
        "Zone 3": "Zona 3",
        "Zone 4": "Zona 4",
        "Zone 5": "Zona 5",
        "Recovery": "Recuperación",
        "Aerobic": "Aeróbico",
        "Tempo": "Tempo",
        "Lactate Threshold": "Umbral de Lactato",
        "VO2 Max": "VO2 Máx"
      },
      "formats": {
        "summary": "Tu ritmo es {pace} {paceUnit}. Velocidad: {speed}. VDOT estimado: {vdot}. FC máx: {maxHR} ppm."
      },
      "infoCards": {
        "paceMetrics": {
          "title": "📊 Ritmo y Velocidad",
          "items": [
            {
              "label": "Ritmo por Milla",
              "valueKey": "pacePerMile"
            },
            {
              "label": "Ritmo por Km",
              "valueKey": "pacePerKm"
            },
            {
              "label": "Velocidad",
              "valueKey": "speed"
            },
            {
              "label": "Tiempo Final",
              "valueKey": "totalTime"
            }
          ]
        },
        "fitnessMetrics": {
          "title": "💪 Métricas de Fitness",
          "items": [
            {
              "label": "Puntuación VDOT",
              "valueKey": "vdotScore"
            },
            {
              "label": "Calorías Quemadas",
              "valueKey": "calories"
            },
            {
              "label": "Frecuencia Cardíaca Máxima",
              "valueKey": "maxHR"
            },
            {
              "label": "Nivel de Entrenamiento",
              "valueKey": "trainingLevel"
            }
          ]
        },
        "raceTips": {
          "title": "🏁 Consejos Día de Carrera",
          "items": [
            "Comienza conservadoramente — apunta a parciales parejos o negativos",
            "Practica tu ritmo de carrera durante entrenamientos largos",
            "No pruebes nada nuevo el día de carrera (zapatillas, comida, equipo)",
            "Hidrátate temprano — cuando sientes sed ya es muy tarde"
          ]
        },
        "trainingTips": {
          "title": "💡 Consejos de Entrenamiento",
          "items": [
            "Sigue la regla 80/20 — 80% fácil, 20% esfuerzo duro",
            "Incluye una carrera tempo y una sesión de intervalos por semana",
            "Entrena fuerza 2x por semana para mejorar economía de carrera",
            "Nunca aumentes kilometraje semanal más del 10%"
          ]
        }
      },
      "referenceData": {
        "worldRecords": {
          "title": "Ritmos de Récord Mundial",
          "items": {
            "mile": {
              "label": "1 Milla",
              "value": "3:43 (H) / 4:07 (M)"
            },
            "fiveK": {
              "label": "5K",
              "value": "12:35 (H) / 14:00 (M)"
            },
            "tenK": {
              "label": "10K",
              "value": "26:11 (H) / 28:54 (M)"
            },
            "half": {
              "label": "Medio Maratón",
              "value": "57:31 (H) / 1:02:52 (M)"
            },
            "full": {
              "label": "Maratón",
              "value": "2:00:35 (H) / 2:09:56 (M)"
            }
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es el Ritmo de Carrera?",
          "content": "El ritmo de carrera es el tiempo que toma cubrir una distancia específica, típicamente expresado como minutos por milla (min/milla) o minutos por kilómetro (min/km). Es lo inverso de la velocidad — mientras que la velocidad te dice qué tan rápido vas (ej. 12 km/h), el ritmo te dice cuánto tiempo toma cada unidad de distancia (ej. 5:00/km). Entender tu ritmo es fundamental para entrenar efectivamente, correr inteligentemente y mejorar consistentemente. Ya sea que entrenes para tu primer 5K o busques un récord personal en maratón, conocer tu ritmo objetivo te ayuda a evitar el error más común en carreras de distancia: empezar muy rápido y desvanecerse en la segunda mitad."
        },
        "trainingZones": {
          "title": "Entendiendo las Zonas de Entrenamiento VDOT",
          "content": "Las zonas de entrenamiento, desarrolladas por el reconocido fisiólogo del ejercicio Jack Daniels, son rangos de ritmo específicos diseñados para dirigirse a diferentes adaptaciones fisiológicas. Cada zona estresa tu cuerpo de manera única: el ritmo Fácil construye tu base aeróbica y promueve recuperación, el ritmo de Maratón desarrolla eficiencia en esfuerzo sostenido, el ritmo de Umbral (tempo) mejora tu capacidad de eliminación de lactato, el ritmo de Intervalo aumenta tu techo de VO₂max, y el ritmo de Repetición mejora la economía de carrera y velocidad neuromuscular. La clave del descubrimiento de Daniels es que entrenar a la intensidad correcta importa más que simplemente correr duro todos los días. Tu puntuación VDOT, calculada desde un rendimiento de carrera reciente, determina el ritmo exacto para cada zona — asegurando que tu entrenamiento esté precisamente calibrado a tu nivel actual de fitness."
        },
        "heartRateTraining": {
          "title": "Zonas de Entrenamiento por Frecuencia Cardíaca Explicadas",
          "content": "Las zonas de frecuencia cardíaca son rangos de intensidad basados en tu frecuencia cardíaca máxima (estimada como 220 menos tu edad). Zona 1 (50-60% FC máx) es para recuperación y calentamiento. Zona 2 (60-70%) construye base aeróbica — la mayoría del entrenamiento debería estar aquí. Zona 3 (70-80%) es esfuerzo moderado, ritmo de maratón. Zona 4 (80-90%) es esfuerzo de umbral/tempo, donde el lactato comienza a acumularse. Zona 5 (90-100%) es esfuerzo máximo para intervalos cortos. Entrenar por frecuencia cardíaca ayuda a asegurar que estés dando la intensidad correcta — particularmente importante en subidas, calor, o cuando la fatiga enmascara tu esfuerzo real. Muchos corredores entrenan muy duro en días fáciles (sobre Zona 2) y no lo suficientemente duro en días difíciles (bajo Zona 4), perdiendo el efecto de entrenamiento polarizado que impulsa la mejora."
        },
        "paceImprovement": {
          "title": "Consejos para Mejorar tu Ritmo de Carrera",
          "items": [
            {
              "text": "Sigue la regla 80/20 — corre 80% de tu volumen semanal a ritmo fácil, conversacional y solo 20% en esfuerzos más duros",
              "type": "info"
            },
            {
              "text": "Incluye una carrera tempo semanal a ritmo de umbral (cómodamente duro) para empujar tu umbral de lactato más alto",
              "type": "info"
            },
            {
              "text": "Agrega progresiones (6-8 aceleraciones cortas de 20 segundos) después de carreras fáciles para desarrollar velocidad sin fatiga",
              "type": "info"
            },
            {
              "text": "Entrena fuerza al menos dos veces por semana — glúteos, core y pantorrillas fuertes mejoran dramáticamente la economía de carrera",
              "type": "info"
            },
            {
              "text": "Evita aumentar el kilometraje semanal total más del 10% para prevenir lesiones por sobreuso",
              "type": "warning"
            },
            {
              "text": "Prioriza sueño y nutrición — la recuperación es donde tu cuerpo realmente construye fitness del estímulo de entrenamiento",
              "type": "info"
            }
          ]
        },
        "commonMistakes": {
          "title": "Errores Comunes de Ritmo a Evitar",
          "items": [
            {
              "text": "Empezar muy rápido en carreras — quemando reservas de glucógeno en las primeras millas lleva a desaceleraciones dolorosas después de la milla 28-32",
              "type": "warning"
            },
            {
              "text": "Correr todos los entrenamientos a la misma intensidad moderada — este entrenamiento de 'zona gris' limita tanto recuperación como ganancias de rendimiento",
              "type": "warning"
            },
            {
              "text": "Ignorar condiciones ambientales — calor, humedad, altitud y vientos en contra requieren ajustes de ritmo de 10-30 segundos por milla",
              "type": "info"
            },
            {
              "text": "Perseguir ritmo en cada carrera — algunos días deberían ser genuinamente fáciles sin importar lo que diga tu reloj",
              "type": "info"
            },
            {
              "text": "Usar tu ritmo de carrera para entrenamiento diario — la mayoría del entrenamiento debería ser 1-2 minutos por milla más lento que tu ritmo objetivo de carrera",
              "type": "warning"
            },
            {
              "text": "Ignorar datos de frecuencia cardíaca — entrenar solo por ritmo puede llevar a sobreentrenamiento en días calurosos o subentrenamiento en rutas con colinas",
              "type": "warning"
            }
          ]
        },
        "raceStrategy": {
          "title": "Estrategia de Ritmo Día de Carrera",
          "items": [
            {
              "text": "Comienza 10-15 segundos por milla más lento que el ritmo objetivo — la moderación temprana paga enormes dividendos en las millas finales",
              "type": "info"
            },
            {
              "text": "Corre parciales parejos o negativos (segunda mitad más rápida) — parciales positivos (desvanecimiento) te cuestan 2-3 minutos en un maratón",
              "type": "info"
            },
            {
              "text": "Usa marcadores de milla para revisar ritmo, no tu reloj cada 30 segundos — revisar constantemente aumenta la fatiga mental",
              "type": "info"
            },
            {
              "text": "Considera la elevación — desacelera 10-20 seg/milla en subidas, no sobrecorrijas en bajadas (salva tus cuádriceps)",
              "type": "info"
            },
            {
              "text": "Ten un plan B — si las condiciones son brutales (calor, viento), ajusta ritmo objetivo por 10-30 seg/milla para evitar explotar",
              "type": "warning"
            },
            {
              "text": "Practica ritmo de carrera en entrenamientos — tu ritmo objetivo debería sentirse 'cómodamente duro' en entrenamientos, no como un sprint completo",
              "type": "info"
            }
          ]
        },
        "calculationExamples": {
          "title": "Ejemplos de Cálculos",
          "description": "Ejemplos paso a paso de ritmo y predicciones de carrera",
          "examples": [
            {
              "title": "Calcular Ritmo de 5K",
              "steps": [
                "Distancia: 5K (5,000 metros)",
                "Tiempo final: 25:00 (1,500 segundos)",
                "Ritmo = 1,500 ÷ 5 = 300 seg/km",
                "Ritmo = 5:00 por kilómetro (8:03 por milla)",
                "Velocidad = 5 ÷ (1500/3600) = 12 km/h"
              ],
              "result": "Ritmo: 5:00/km · Velocidad: 12 km/h · VDOT: ~44"
            },
            {
              "title": "Predecir Maratón desde 10K",
              "steps": [
                "Tiempo 10K: 50:00 (3,000 segundos)",
                "Distancia maratón: 42,195 m",
                "Riegel: T₂ = T₁ × (D₂/D₁)^1.06",
                "T₂ = 3000 × (42195/10000)^1.06",
                "T₂ = 3000 × 4.577 = 13,732 seg"
              ],
              "result": "Maratón predicho: 3:48:52"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuál es un buen ritmo de carrera para principiantes?",
          "answer": "Un buen ritmo para principiantes es típicamente 6:13-8:05 por kilómetro (10:00-13:00 por milla). Lo más importante para corredores nuevos es poder mantener una conversación mientras corren — si puedes hablar cómodamente, estás al ritmo correcto. La mayoría de principiantes terminan su primer 5K entre 30-40 minutos, lo que se traduce a aproximadamente 6:00-8:00/km de ritmo. Enfócate en completar la distancia primero antes de preocuparte por la velocidad."
        },
        {
          "question": "¿Cuál es la diferencia entre ritmo y velocidad?",
          "answer": "Ritmo y velocidad son inversos el uno del otro. Velocidad mide distancia por unidad de tiempo (ej. 12 kilómetros por hora), mientras que ritmo mide tiempo por unidad de distancia (ej. 5:00 por kilómetro). Los corredores prefieren ritmo porque se traduce directamente a planificación de carrera — si sabes que tu ritmo es 5:00/km para un 5K, sabes que cada marcador de kilómetro debería llegar a intervalos de 5 minutos. Velocidad se usa más comúnmente en ciclismo y conducción."
        },
        {
          "question": "¿Qué es VDOT y cómo se calcula?",
          "answer": "VDOT es una métrica de fitness desarrollada por el fisiólogo del ejercicio Jack Daniels. Representa tu nivel actual de fitness de carrera basado en un rendimiento de carrera reciente. El cálculo usa la fórmula Daniels-Gilbert que considera tu distancia de carrera y tiempo final para estimar tu VO₂max (máximo consumo de oxígeno). Un VDOT más alto significa mayor fitness aeróbico. Para contexto, corredores recreacionales típicamente puntúan 25-45, corredores competitivos de club 45-60, y corredores elite 65-85. Tu VDOT se usa para prescribir ritmos de entrenamiento personalizados para cada zona de entrenamiento."
        },
        {
          "question": "¿Qué tan precisas son las predicciones de tiempo de carrera?",
          "answer": "Las predicciones de carrera usan la fórmula de Riegel (T₂ = T₁ × (D₂/D₁)^1.06), que está bien validada para corredores entrenados corriendo entre 1 milla y maratón. Las predicciones son más precisas cuando tu carrera de entrada está cerca de la distancia objetivo — por ejemplo, un resultado de 10K predice un medio maratón más confiablemente que un tiempo de milla. La fórmula asume volumen de entrenamiento similar y condiciones de carrera. Las predicciones se vuelven menos confiables en distancias extremas (ultramaratones) o si estás significativamente subentrenado para la distancia más larga."
        },
        {
          "question": "¿Qué son las zonas de entrenamiento y por qué importan?",
          "answer": "Las zonas de entrenamiento son rangos de ritmo específicos que apuntan a diferentes adaptaciones fisiológicas. Ritmo fácil (59-74% VO₂max) construye resistencia aeróbica y recuperación. Ritmo de maratón (75-84%) desarrolla capacidad de esfuerzo sostenido. Ritmo de umbral (83-88%) mejora eliminación de lactato — la clave para correr más rápido. Ritmo de intervalo (95-100%) eleva tu techo de VO₂max. Ritmo de repetición (105%+) mejora velocidad y economía de carrera. Entrenar en las zonas correctas asegura que obtienes el beneficio deseado de cada entrenamiento sin fatiga innecesaria o riesgo de lesión."
        },
        {
          "question": "¿Cuántas calorías quema correr?",
          "answer": "Una aproximación común es que correr quema cerca de 62 calorías por kilómetro (100 por milla) para una persona de 70 kg (155 libras). Más precisamente, la quema de calorías es aproximadamente igual a tu peso corporal en kilogramos multiplicado por la distancia en kilómetros multiplicado por 1.036. Así que un corredor de 70 kg cubriendo 10 km quema aproximadamente 725 calorías. El ritmo tiene un efecto menor — correr más rápido quema ligeramente más calorías por minuto pero menos por kilómetro, así que la distancia total y peso corporal son los factores dominantes."
        },
        {
          "question": "¿Debería entrenar a mi ritmo objetivo de carrera todos los días?",
          "answer": "No — este es uno de los errores de entrenamiento más comunes. La investigación muestra consistentemente que 80% de tu volumen semanal de carrera debería ser a ritmo fácil, conversacional (1-2 minutos por milla más lento que ritmo de carrera). Solo 20% debería ser a intensidad moderada-a-dura. Correr muy rápido muy seguido te pone en una 'zona gris' donde estás muy cansado para recuperarte apropiadamente pero no lo suficientemente rápido para activar las adaptaciones específicas de entrenamientos de calidad como carreras tempo e intervalos."
        },
        {
          "question": "¿Qué es la fórmula de Riegel?",
          "answer": "La fórmula de Riegel, publicada por Peter Riegel en 1977, predice rendimiento de carrera a través de distancias usando la ecuación T₂ = T₁ × (D₂/D₁)^1.06. T₁ es tu tiempo de carrera conocido, D₁ es la distancia de esa carrera, D₂ es la distancia objetivo, y T₂ es el tiempo predicho. El exponente 1.06 considera el hecho de que el ritmo naturalmente se desacelera conforme la distancia aumenta debido a factores de fatiga fisiológica. Permanece como una de las fórmulas de predicción de carrera más ampliamente usadas y validadas en running."
        },
        {
          "question": "¿Cómo calculo mis zonas de entrenamiento por frecuencia cardíaca?",
          "answer": "El método más simple usa tu edad para estimar frecuencia cardíaca máxima: 220 menos tu edad. Por ejemplo, una persona de 30 años tiene una FC máx estimada de 190 ppm. Zona 1 (recuperación) es 50-60% de máx (95-114 ppm), Zona 2 (base aeróbica) es 60-70% (114-133 ppm), Zona 3 (moderada) es 70-80% (133-152 ppm), Zona 4 (umbral) es 80-90% (152-171 ppm), y Zona 5 (esfuerzo máximo) es 90-100% (171-190 ppm). Para más precisión, determina tu FC máx real a través de una prueba de campo o evaluación de laboratorio."
        },
        {
          "question": "¿Qué son los parciales negativos y por qué funcionan?",
          "answer": "Parciales negativos significan correr la segunda mitad de tu carrera más rápido que la primera mitad. Esta estrategia funciona porque conserva glucógeno temprano cuando no lo necesitas, reduce acumulación de ácido láctico, y te da un impulso psicológico mientras pasas corredores que se desvanecen. Estudios muestran que parciales negativos típicamente resultan en tiempos generales más rápidos que ritmo parejo. La clave es empezar 10-15 segundos por milla más lento que ritmo objetivo en el primer cuarto, establecerse en ritmo objetivo para la mitad media, luego aumentar esfuerzo en el cuarto final cuando sabes que puedes terminar."
        },
        {
          "question": "¿Cómo ayudan los tiempos parciales con el ritmo de carrera?",
          "answer": "Los tiempos parciales dividen tu carrera en segmentos (usualmente millas o kilómetros) para que puedas monitorear tu ritmo a lo largo. Para un maratón, parciales milla por milla te ayudan a evitar el error clásico de empezar muy rápido — si tu primera milla es 20 segundos más rápida que ritmo objetivo, sabes desacelerar inmediatamente antes de que se haga daño. Los parciales también te ayudan a ajustar por colinas, viento o fatiga. Corredores elite a menudo tienen parciales casi idénticos para cada milla, mientras principiantes tienden a empezar rápido y desvanecerse (parciales positivos), lo que cuesta tiempo significativo."
        },
        {
          "question": "¿Debería entrenar por ritmo o por frecuencia cardíaca?",
          "answer": "Ambos tienen valor, pero frecuencia cardíaca es a menudo más confiable para carreras fáciles mientras ritmo funciona mejor para entrenamientos. Frecuencia cardíaca considera factores externos (calor, humedad, colinas, fatiga) que el ritmo ignora — en un día de 32°C, tu 'ritmo fácil' podría elevar tu frecuencia cardíaca a Zona 4. Para carreras tempo e intervalos, ritmo es más preciso porque frecuencia cardíaca se retrasa detrás del esfuerzo y puede ser afectada por cafeína, estrés o sueño. El enfoque ideal: usa frecuencia cardíaca para carreras fáciles (mantente en Zona 2), usa ritmo para entrenamientos de calidad (alcanza tiempos objetivo), y usa ambos para detectar sobreentrenamiento o subentrenamiento."
        }
      ],
      "detailedTable": {
        "trainingZones": {
          "button": "Ver Predicciones y Zonas de Entrenamiento",
          "title": "Predicciones de Carrera y Zonas de Entrenamiento VDOT",
          "columns": {
            "zone": "Zona / Distancia",
            "paceMi": "Ritmo/milla",
            "paceKm": "Ritmo/km",
            "detail": "Detalles"
          }
        },
        "splits": {
          "button": "Ver Tiempos Parciales de Carrera",
          "title": "Tiempos Parciales Milla por Milla / Km por Km",
          "columns": {
            "segment": "Milla/Km",
            "time": "Tiempo Parcial",
            "elapsed": "Tiempo Transcurrido",
            "pace": "Ritmo"
          }
        }
      },
      "chart": {
        "title": "Ritmo a Través de Distancias",
        "xLabel": "Distancia",
        "yLabel": "Ritmo (min/milla)",
        "series": {
          "pace": "Tu Ritmo",
          "easyPace": "Ritmo Fácil",
          "thresholdPace": "Ritmo de Umbral"
        }
      },
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
      "name": "Calculadora de Ritmo de Corrida",
      "slug": "calculadora-ritmo-corrida",
      "subtitle": "Calcule seu ritmo, preveja tempos de prova, obtenha zonas de treino VDOT, zonas de frequência cardíaca e tempos parciais personalizados para qualquer distância",
      "breadcrumb": "Ritmo de Corrida",
      "seo": {
        "title": "Calculadora de Ritmo de Corrida - VDOT, Zonas FC e Parciais",
        "description": "Calcule ritmo de corrida a partir de tempo e distância. Obtenha pontuação VDOT, previsões de prova, zonas de treino, zonas de frequência cardíaca, tempos parciais e estimativas de calorias para 5K, 10K, meia maratona e maratona.",
        "shortDescription": "Calcule ritmo, VDOT, zonas de treino, zonas FC e parciais de prova",
        "keywords": [
          "calculadora ritmo corrida",
          "calculadora vdot",
          "preditor tempo prova",
          "zonas treino corrida",
          "zonas frequencia cardiaca corrida",
          "calculadora ritmo maratona",
          "calculadora parciais prova",
          "calculadora ritmo 5k",
          "formula corrida daniels",
          "tempos parciais corrida"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "calculationMode": {
          "label": "Quero calcular",
          "helpText": "Escolha o que deseja resolver",
          "options": {
            "calculatePace": "Meu Ritmo",
            "calculateTime": "Meu Tempo Final"
          }
        },
        "raceDistance": {
          "label": "Distância da Prova",
          "helpText": "Selecione uma prova padrão ou insira uma distância personalizada",
          "options": {
            "1mile": "1 Milha",
            "5k": "5K",
            "10k": "10K",
            "halfMarathon": "Meia Maratona",
            "marathon": "Maratona",
            "custom": "Distância Personalizada"
          }
        },
        "customDistance": {
          "label": "Distância",
          "helpText": "Insira sua distância baseada no sistema de unidades selecionado"
        },
        "timeHours": {
          "label": "Horas"
        },
        "timeMinutes": {
          "label": "Minutos"
        },
        "timeSeconds": {
          "label": "Segundos"
        },
        "paceMinutes": {
          "label": "Ritmo (min)"
        },
        "paceSeconds": {
          "label": "Ritmo (seg)"
        },
        "age": {
          "label": "Idade",
          "helpText": "Usado para calcular zonas de treino por frequência cardíaca"
        },
        "weight": {
          "label": "Peso",
          "helpText": "Opcional - usado para estimar calorias queimadas"
        }
      },
      "inputGroups": {},
      "results": {
        "pace": {
          "label": "Ritmo"
        },
        "pacePerMile": {
          "label": "Ritmo/mi"
        },
        "pacePerKm": {
          "label": "Ritmo/km"
        },
        "speed": {
          "label": "Velocidade"
        },
        "totalTime": {
          "label": "Tempo Final"
        },
        "calories": {
          "label": "Calorias Queimadas"
        },
        "vdotScore": {
          "label": "Pontuação VDOT"
        }
      },
      "presets": {
        "beginner5k": {
          "label": "5K Iniciante",
          "description": "Final de 5K em 35 minutos"
        },
        "sub25_5k": {
          "label": "5K Sub-25",
          "description": "Meta de 5K em 25 minutos"
        },
        "sub2Half": {
          "label": "Meia Sub-2h",
          "description": "Quebrar 2 horas na meia maratona"
        },
        "bqAttempt": {
          "label": "Tentativa BQ",
          "description": "Maratona 3:00 — ritmo classificatório Boston"
        },
        "fast10k": {
          "label": "10K Rápido",
          "description": "Final de 10K em 45 minutos"
        },
        "eliteMarathon": {
          "label": "Maratona Elite",
          "description": "Maratona 2:30 — ritmo sub-elite"
        }
      },
      "tooltips": {
        "pace": "Tempo necessário para cobrir uma unidade de distância",
        "pacePerMile": "Seu ritmo em minutos por milha",
        "pacePerKm": "Seu ritmo em minutos por quilômetro",
        "speed": "Quão rápido você está se movendo em distância por hora",
        "totalTime": "Tempo final estimado para a distância selecionada",
        "calories": "Calorias estimadas queimadas baseado em peso e distância",
        "vdotScore": "Pontuação de condicionamento VDOT de Jack Daniels — maior é melhor"
      },
      "values": {
        "min/mi": "min/mi",
        "min/km": "min/km",
        "mph": "mph",
        "km/h": "km/h",
        "mi": "mi",
        "km": "km",
        "cal": "cal",
        "lbs": "lbs",
        "kg": "kg",
        "bpm": "bpm",
        "Easy": "Fácil",
        "Marathon": "Maratona",
        "Threshold": "Limiar",
        "Interval": "Intervalo",
        "Repetition": "Repetição",
        "Conversational": "Conversação",
        "Steady": "Constante",
        "Comfortably Hard": "Confortavelmente Forte",
        "Hard (3-5 min)": "Forte (3-5 min)",
        "Fast & Short": "Rápido e Curto",
        "1 Mile": "1 Milha",
        "5K": "5K",
        "10K": "10K",
        "Half Marathon": "Meia Maratona",
        "Race Predictions": "Previsões de Prova",
        "Training Zones": "Zonas de Treino",
        "Heart Rate Zones": "Zonas de Frequência Cardíaca",
        "Predicted Time": "Tempo Previsto",
        "Predicted Pace": "Ritmo Previsto",
        "Zone 1": "Zona 1",
        "Zone 2": "Zona 2",
        "Zone 3": "Zona 3",
        "Zone 4": "Zona 4",
        "Zone 5": "Zona 5",
        "Recovery": "Recuperação",
        "Aerobic": "Aeróbico",
        "Tempo": "Tempo",
        "Lactate Threshold": "Limiar de Lactato",
        "VO2 Max": "VO2 Máx"
      },
      "formats": {
        "summary": "Seu ritmo é {pace} {paceUnit}. Velocidade: {speed}. VDOT estimado: {vdot}. FC máx: {maxHR} bpm."
      },
      "infoCards": {
        "paceMetrics": {
          "title": "📊 Ritmo e Velocidade",
          "items": [
            {
              "label": "Ritmo por Milha",
              "valueKey": "pacePerMile"
            },
            {
              "label": "Ritmo por Km",
              "valueKey": "pacePerKm"
            },
            {
              "label": "Velocidade",
              "valueKey": "speed"
            },
            {
              "label": "Tempo Final",
              "valueKey": "totalTime"
            }
          ]
        },
        "fitnessMetrics": {
          "title": "💪 Métricas de Condicionamento",
          "items": [
            {
              "label": "Pontuação VDOT",
              "valueKey": "vdotScore"
            },
            {
              "label": "Calorias Queimadas",
              "valueKey": "calories"
            },
            {
              "label": "Frequência Cardíaca Máxima",
              "valueKey": "maxHR"
            },
            {
              "label": "Nível de Treino",
              "valueKey": "trainingLevel"
            }
          ]
        },
        "raceTips": {
          "title": "🏁 Dicas para o Dia da Prova",
          "items": [
            "Comece conservadoramente — busque parciais iguais ou negativas",
            "Pratique seu ritmo de prova durante treinos longos",
            "Não tente nada novo no dia da prova (tênis, alimentação, equipamentos)",
            "Hidrate-se cedo — quando sentir sede já é tarde demais"
          ]
        },
        "trainingTips": {
          "title": "💡 Dicas de Treino",
          "items": [
            "Siga a regra 80/20 — 80% fácil, 20% esforço forte",
            "Inclua um treino de tempo e uma sessão de intervalos por semana",
            "Treine força 2x por semana para melhorar economia de corrida",
            "Nunca aumente quilometragem semanal em mais de 10%"
          ]
        }
      },
      "referenceData": {
        "worldRecords": {
          "title": "Ritmos de Recordes Mundiais",
          "items": {
            "mile": {
              "label": "1 Milha",
              "value": "3:43 (M) / 4:07 (F)"
            },
            "fiveK": {
              "label": "5K",
              "value": "12:35 (M) / 14:00 (F)"
            },
            "tenK": {
              "label": "10K",
              "value": "26:11 (M) / 28:54 (F)"
            },
            "half": {
              "label": "Meia Maratona",
              "value": "57:31 (M) / 1:02:52 (F)"
            },
            "full": {
              "label": "Maratona",
              "value": "2:00:35 (M) / 2:09:56 (F)"
            }
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é Ritmo de Corrida?",
          "content": "Ritmo de corrida é o tempo necessário para cobrir uma distância específica, tipicamente expresso como minutos por milha (min/mi) ou minutos por quilômetro (min/km). É o inverso da velocidade — enquanto velocidade diz quão rápido você está indo (ex: 12 km/h), ritmo diz quanto tempo cada unidade de distância leva (ex: 5:00/km). Entender seu ritmo é fundamental para treino efetivo, corrida inteligente e melhoria consistente. Seja treinando para sua primeira corrida de 5K ou buscando um recorde pessoal na maratona, conhecer seu ritmo alvo ajuda a evitar o erro mais comum na corrida de distância: começar muito rápido e desacelerar na segunda metade."
        },
        "trainingZones": {
          "title": "Entendendo as Zonas de Treino VDOT",
          "content": "Zonas de treino, desenvolvidas pelo renomado fisiologista do exercício Jack Daniels, são faixas específicas de ritmo projetadas para direcionar diferentes adaptações fisiológicas. Cada zona estressa seu corpo de forma única: ritmo Fácil constrói sua base aeróbica e promove recuperação, ritmo de Maratona desenvolve eficiência em esforço sustentado, ritmo de Limiar (tempo) melhora sua capacidade de limpeza de lactato, ritmo de Intervalo eleva seu teto de VO₂max, e ritmo de Repetição aprimora economia de corrida e velocidade neuromuscular. A descoberta chave da pesquisa de Daniels é que treinar na intensidade correta importa mais que simplesmente correr forte todos os dias. Sua pontuação VDOT, calculada a partir de uma performance recente de prova, determina o ritmo exato para cada zona — garantindo que seu treino seja precisamente calibrado ao seu nível atual de condicionamento."
        },
        "heartRateTraining": {
          "title": "Zonas de Treino por Frequência Cardíaca Explicadas",
          "content": "Zonas de frequência cardíaca são faixas de intensidade baseadas em sua frequência cardíaca máxima (estimada como 220 menos sua idade). Zona 1 (50-60% FC máx) é para recuperação e aquecimento. Zona 2 (60-70%) constrói base aeróbica — a maioria do treino deve estar aqui. Zona 3 (70-80%) é esforço moderado, ritmo de maratona. Zona 4 (80-90%) é esforço de limiar/tempo, onde lactato começa a se acumular. Zona 5 (90-100%) é esforço máximo para intervalos curtos. Treinar por frequência cardíaca ajuda a garantir que você esteja atingindo a intensidade correta — particularmente importante em subidas, no calor, ou quando fadiga mascara seu esforço real. Muitos corredores treinam muito forte em dias fáceis (acima da Zona 2) e não forte o suficiente em dias difíceis (abaixo da Zona 4), perdendo o efeito polarizado de treino que impulsiona melhoria."
        },
        "paceImprovement": {
          "title": "Dicas para Melhorar seu Ritmo de Corrida",
          "items": [
            {
              "text": "Siga a regra 80/20 — corra 80% do seu volume semanal em ritmo fácil, de conversa e apenas 20% em esforços mais fortes",
              "type": "info"
            },
            {
              "text": "Inclua um treino semanal de tempo em ritmo de limiar (confortavelmente forte) para elevar seu limiar de lactato",
              "type": "info"
            },
            {
              "text": "Adicione progressões (6-8 acelerações curtas de 20 segundos) após treinos fáceis para desenvolver velocidade sem fadiga",
              "type": "info"
            },
            {
              "text": "Treine força pelo menos duas vezes por semana — glúteos, core e panturrilhas fortes melhoram drasticamente economia de corrida",
              "type": "info"
            },
            {
              "text": "Evite aumentar quilometragem total semanal em mais de 10% para prevenir lesões por uso excessivo",
              "type": "warning"
            },
            {
              "text": "Priorize sono e nutrição — recuperação é onde seu corpo realmente constrói condicionamento a partir do estímulo de treino",
              "type": "info"
            }
          ]
        },
        "commonMistakes": {
          "title": "Erros Comuns de Ritmo para Evitar",
          "items": [
            {
              "text": "Começar muito rápido nas provas — queimar reservas de glicogênio nos primeiros quilômetros leva a desacelerações dolorosas após o km 28-32",
              "type": "warning"
            },
            {
              "text": "Correr todos os treinos na mesma intensidade moderada — este treino de 'zona cinza' limita tanto recuperação quanto ganhos de performance",
              "type": "warning"
            },
            {
              "text": "Ignorar condições ambientais — calor, umidade, altitude e vento contrário exigem ajustes de ritmo de 15-45 segundos por quilômetro",
              "type": "info"
            },
            {
              "text": "Perseguir ritmo em toda corrida — alguns dias devem ser genuinamente fáceis independente do que seu relógio diz",
              "type": "info"
            },
            {
              "text": "Usar ritmo de prova para treino diário — a maioria do treino deve ser 30-60 segundos por quilômetro mais lenta que seu ritmo meta de prova",
              "type": "warning"
            },
            {
              "text": "Ignorar dados de frequência cardíaca — treinar apenas por ritmo pode levar a sobretreino em dias quentes ou subtreino em percursos montanhosos",
              "type": "warning"
            }
          ]
        },
        "raceStrategy": {
          "title": "Estratégia de Ritmo para o Dia da Prova",
          "items": [
            {
              "text": "Comece 15-30 segundos por quilômetro mais devagar que o ritmo meta — contenção inicial paga dividendos enormes nos quilômetros finais",
              "type": "info"
            },
            {
              "text": "Corra parciais iguais ou negativas (segunda metade mais rápida) — parciais positivas (desaceleração) custam 2-3 minutos numa maratona",
              "type": "info"
            },
            {
              "text": "Use marcadores de quilometragem para verificar ritmo, não seu relógio a cada 30 segundos — verificação constante aumenta fadiga mental",
              "type": "info"
            },
            {
              "text": "Considere elevação — desacelere 15-30 seg/km em subidas, não compense demais em descidas (poupe seus quadríceps)",
              "type": "info"
            },
            {
              "text": "Tenha um plano B — se condições estão brutais (calor, vento), ajuste ritmo meta em 15-45 seg/km para evitar colapso",
              "type": "warning"
            },
            {
              "text": "Pratique ritmo de prova no treino — seu ritmo meta deve parecer 'confortavelmente forte' nos treinos, não como um sprint total",
              "type": "info"
            }
          ]
        },
        "calculationExamples": {
          "title": "Exemplos de Cálculo",
          "description": "Exemplos passo a passo de ritmo e previsão de prova",
          "examples": [
            {
              "title": "Calcular Ritmo 5K",
              "steps": [
                "Distância: 5K (5.000 metros)",
                "Tempo final: 25:00 (1.500 segundos)",
                "Ritmo = 1.500 ÷ 5 = 300 seg/km",
                "Ritmo = 5:00 por km",
                "Velocidade = 5 ÷ (1500/3600) = 12 km/h"
              ],
              "result": "Ritmo: 5:00/km · Velocidade: 12 km/h · VDOT: ~44"
            },
            {
              "title": "Prever Maratona a partir de 10K",
              "steps": [
                "Tempo 10K: 50:00 (3.000 segundos)",
                "Distância maratona: 42.195 m",
                "Riegel: T₂ = T₁ × (D₂/D₁)^1.06",
                "T₂ = 3000 × (42195/10000)^1.06",
                "T₂ = 3000 × 4.577 = 13.732 seg"
              ],
              "result": "Maratona prevista: 3:48:52"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qual é um bom ritmo de corrida para iniciantes?",
          "answer": "Um bom ritmo para iniciantes é tipicamente 6:00-8:00 por km. O mais importante para novos corredores é conseguir manter uma conversa enquanto correm — se você consegue falar confortavelmente, está no ritmo certo. A maioria dos iniciantes completa sua primeira corrida de 5K entre 30-40 minutos, o que se traduz em aproximadamente 6:00-8:00/km. Foque em completar a distância primeiro antes de se preocupar com velocidade."
        },
        {
          "question": "Qual é a diferença entre ritmo e velocidade?",
          "answer": "Ritmo e velocidade são inversos um do outro. Velocidade mede distância por unidade de tempo (ex: 12 km por hora), enquanto ritmo mede tempo por unidade de distância (ex: 5:00 por km). Corredores preferem ritmo porque se traduz diretamente ao planejamento de prova — se você sabe que seu ritmo é 5:00/km para um 5K, sabe que cada marcador de quilômetro deve vir em intervalos de 5 minutos. Velocidade é mais comumente usada no ciclismo e direção."
        },
        {
          "question": "O que é VDOT e como é calculado?",
          "answer": "VDOT é uma métrica de condicionamento desenvolvida pelo fisiologista do exercício Jack Daniels. Representa seu nível atual de condicionamento de corrida baseado numa performance recente de prova. O cálculo usa a fórmula Daniels-Gilbert que considera sua distância de prova e tempo final para estimar seu VO₂max (captação máxima de oxigênio). Um VDOT maior significa maior condicionamento aeróbico. Para contexto, corredores recreativos tipicamente pontuam 25-45, corredores competitivos de clube 45-60, e corredores de elite 65-85. Seu VDOT é usado para prescrever ritmos personalizados de treino para cada zona."
        },
        {
          "question": "Quão precisas são as previsões de tempo de prova?",
          "answer": "Previsões de prova usam a fórmula de Riegel (T₂ = T₁ × (D₂/D₁)^1.06), que é bem validada para corredores treinados competindo entre 1600m e maratona. Previsões são mais precisas quando sua prova de entrada está próxima à distância alvo — por exemplo, um resultado de 10K prevê uma meia maratona mais confiavelmente que um tempo de 1600m. A fórmula assume volume de treino similar e condições de prova. Previsões tornam-se menos confiáveis em distâncias extremas (ultramaratonas) ou se você está significativamente subtreinado para a distância maior."
        },
        {
          "question": "O que são zonas de treino e por que importam?",
          "answer": "Zonas de treino são faixas específicas de ritmo que direcionam diferentes adaptações fisiológicas. Ritmo fácil (59-74% VO₂max) constrói resistência aeróbica e recuperação. Ritmo de maratona (75-84%) desenvolve capacidade de esforço sustentado. Ritmo de limiar (83-88%) melhora limpeza de lactato — chave para correr mais rápido. Ritmo de intervalo (95-100%) eleva seu teto de VO₂max. Ritmo de repetição (105%+) melhora velocidade e economia de corrida. Treinar nas zonas certas garante que você obtenha o benefício pretendido de cada treino sem fadiga desnecessária ou risco de lesão."
        },
        {
          "question": "Quantas calorias a corrida queima?",
          "answer": "Uma aproximação comum é que corrida queima cerca de 62 calorias por quilômetro para uma pessoa de 70 kg. Mais precisamente, queima de calorias é aproximadamente igual ao seu peso corporal em quilogramas multiplicado pela distância em quilômetros multiplicado por 1,036. Então um corredor de 70 kg cobrindo 10 km queima aproximadamente 725 calorias. Ritmo tem efeito menor — corrida mais rápida queima ligeiramente mais calorias por minuto mas menos por quilômetro, então distância total e peso corporal são os fatores dominantes."
        },
        {
          "question": "Devo treinar no meu ritmo meta de prova todos os dias?",
          "answer": "Não — este é um dos erros de treino mais comuns. Pesquisa consistentemente mostra que 80% do seu volume semanal de corrida deve ser em ritmo fácil, de conversa (30-60 segundos por quilômetro mais lento que ritmo de prova). Apenas 20% deve ser em intensidade moderada-a-forte. Correr muito rápido com muita frequência te coloca numa 'zona cinza' onde você está muito cansado para recuperar adequadamente mas não rápido o suficiente para desencadear adaptações específicas de treinos de qualidade como corridas de tempo e intervalos."
        },
        {
          "question": "O que é a fórmula de Riegel?",
          "answer": "A fórmula de Riegel, publicada por Peter Riegel em 1977, prevê performance de prova através de distâncias usando a equação T₂ = T₁ × (D₂/D₁)^1.06. T₁ é seu tempo conhecido de prova, D₁ é a distância dessa prova, D₂ é a distância alvo, e T₂ é o tempo previsto. O expoente 1.06 considera o fato de que ritmo naturalmente desacelera conforme distância aumenta devido a fatores de fadiga fisiológicos. Permanece uma das fórmulas de previsão de prova mais amplamente usadas e validadas na corrida."
        },
        {
          "question": "Como calcular minhas zonas de treino por frequência cardíaca?",
          "answer": "O método mais simples usa sua idade para estimar FC máxima: 220 menos sua idade. Por exemplo, uma pessoa de 30 anos tem FC máxima estimada de 190 bpm. Zona 1 (recuperação) é 50-60% do máximo (95-114 bpm), Zona 2 (base aeróbica) é 60-70% (114-133 bpm), Zona 3 (moderada) é 70-80% (133-152 bpm), Zona 4 (limiar) é 80-90% (152-171 bpm), e Zona 5 (esforço máximo) é 90-100% (171-190 bpm). Para mais precisão, determine sua FC máxima real através de teste de campo ou avaliação laboratorial."
        },
        {
          "question": "O que são parciais negativas e por que funcionam?",
          "answer": "Parciais negativas significam correr a segunda metade da sua prova mais rápida que a primeira metade. Esta estratégia funciona porque conserva glicogênio cedo quando você não precisa dele, reduz acúmulo de ácido láctico, e te dá impulso psicológico conforme você passa corredores que estão desacelerando. Estudos mostram que parciais negativas tipicamente resultam em tempos gerais mais rápidos que ritmo uniforme. A chave é começar 15-30 segundos por quilômetro mais devagar que ritmo meta no primeiro quarto, se estabelecer no ritmo meta pela metade do meio, então aumentar esforço no quarto final quando você sabe que pode terminar."
        },
        {
          "question": "Como tempos parciais ajudam com ritmo de prova?",
          "answer": "Tempos parciais dividem sua prova em segmentos (geralmente quilômetros) para que você possa monitorar seu ritmo durante toda a corrida. Para uma maratona, parciais quilômetro-a-quilômetro ajudam você a evitar o erro clássico de começar muito rápido — se seu primeiro quilômetro é 30 segundos mais rápido que ritmo meta, você sabe para desacelerar imediatamente antes que dano seja feito. Parciais também ajudam você a ajustar para subidas, vento, ou fadiga. Corredores de elite frequentemente têm parciais quase idênticas para cada quilômetro, enquanto iniciantes tendem a começar rápido e desacelerar (parciais positivas), o que custa tempo significativo."
        },
        {
          "question": "Devo treinar por ritmo ou por frequência cardíaca?",
          "answer": "Ambos têm valor, mas frequência cardíaca é frequentemente mais confiável para corridas fáceis enquanto ritmo funciona melhor para treinos. Frequência cardíaca considera fatores externos (calor, umidade, subidas, fadiga) que ritmo ignora — num dia de 32°C, seu 'ritmo fácil' pode disparar sua frequência cardíaca para a Zona 4. Para corridas de tempo e intervalos, ritmo é mais preciso porque frequência cardíaca atrasa em relação ao esforço e pode ser afetada por cafeína, estresse, ou sono. A abordagem ideal: use frequência cardíaca para corridas fáceis (permaneça na Zona 2), use ritmo para treinos de qualidade (atinja tempos alvo), e use ambos para detectar sobretreino ou subtreino."
        }
      ],
      "detailedTable": {
        "trainingZones": {
          "button": "Ver Previsões e Zonas de Treino",
          "title": "Previsões de Prova e Zonas de Treino VDOT",
          "columns": {
            "zone": "Zona / Distância",
            "paceMi": "Ritmo/mi",
            "paceKm": "Ritmo/km",
            "detail": "Detalhes"
          }
        },
        "splits": {
          "button": "Ver Tempos Parciais da Prova",
          "title": "Tempos Parciais Quilômetro-a-Quilômetro",
          "columns": {
            "segment": "Km",
            "time": "Tempo Parcial",
            "elapsed": "Tempo Decorrido",
            "pace": "Ritmo"
          }
        }
      },
      "chart": {
        "title": "Ritmo Através das Distâncias",
        "xLabel": "Distância",
        "yLabel": "Ritmo (min/km)",
        "series": {
          "pace": "Seu Ritmo",
          "easyPace": "Ritmo Fácil",
          "thresholdPace": "Ritmo de Limiar"
        }
      },
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
      "name": "Calculateur d'Allure de Course",
      "slug": "calculateur-allure-course",
      "subtitle": "Calculez votre allure, prédisez vos temps de course, obtenez les zones d'entraînement VDOT, zones de fréquence cardiaque, et temps de passage personnalisés pour toute distance",
      "breadcrumb": "Allure de Course",
      "seo": {
        "title": "Calculateur d'Allure de Course - VDOT, Zones Cardiaques & Temps de Passage",
        "description": "Calculez l'allure de course à partir du temps et de la distance. Obtenez le score VDOT, prédictions de course, zones d'entraînement, zones cardiaques, temps de passage, et estimations caloriques pour 5K, 10K, semi-marathon et marathon.",
        "shortDescription": "Calculez l'allure, VDOT, zones d'entraînement, zones cardiaques et temps de passage",
        "keywords": [
          "calculateur allure course",
          "calculateur vdot",
          "prédicteur temps course",
          "zones entraînement course",
          "zones fréquence cardiaque course",
          "calculateur allure marathon",
          "calculateur temps passage",
          "calculateur allure 5k",
          "formule daniels course",
          "temps passage course"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "calculationMode": {
          "label": "Je veux calculer",
          "helpText": "Choisissez ce que vous voulez calculer",
          "options": {
            "calculatePace": "Mon Allure",
            "calculateTime": "Mon Temps d'Arrivée"
          }
        },
        "raceDistance": {
          "label": "Distance de Course",
          "helpText": "Sélectionnez une course standard ou entrez une distance personnalisée",
          "options": {
            "1mile": "1 Mile",
            "5k": "5K",
            "10k": "10K",
            "halfMarathon": "Semi-Marathon",
            "marathon": "Marathon",
            "custom": "Distance Personnalisée"
          }
        },
        "customDistance": {
          "label": "Distance",
          "helpText": "Entrez votre distance selon le système d'unités sélectionné"
        },
        "timeHours": {
          "label": "Heures"
        },
        "timeMinutes": {
          "label": "Minutes"
        },
        "timeSeconds": {
          "label": "Secondes"
        },
        "paceMinutes": {
          "label": "Allure (min)"
        },
        "paceSeconds": {
          "label": "Allure (sec)"
        },
        "age": {
          "label": "Âge",
          "helpText": "Utilisé pour calculer les zones d'entraînement cardiaques"
        },
        "weight": {
          "label": "Poids",
          "helpText": "Optionnel - utilisé pour estimer les calories brûlées"
        }
      },
      "inputGroups": {},
      "results": {
        "pace": {
          "label": "Allure"
        },
        "pacePerMile": {
          "label": "Allure/mile"
        },
        "pacePerKm": {
          "label": "Allure/km"
        },
        "speed": {
          "label": "Vitesse"
        },
        "totalTime": {
          "label": "Temps d'Arrivée"
        },
        "calories": {
          "label": "Calories Brûlées"
        },
        "vdotScore": {
          "label": "Score VDOT"
        }
      },
      "presets": {
        "beginner5k": {
          "label": "5K Débutant",
          "description": "Finir le 5K en 35 minutes"
        },
        "sub25_5k": {
          "label": "5K sous 25min",
          "description": "Objectif 5K en 25 minutes"
        },
        "sub2Half": {
          "label": "Semi sous 2h",
          "description": "Passer sous les 2 heures au semi-marathon"
        },
        "bqAttempt": {
          "label": "Tentative BQ",
          "description": "Marathon 3:00 — allure qualifiante Boston"
        },
        "fast10k": {
          "label": "10K Rapide",
          "description": "Finir le 10K en 45 minutes"
        },
        "eliteMarathon": {
          "label": "Marathon Elite",
          "description": "Marathon 2:30 — allure élite sous-élite"
        }
      },
      "tooltips": {
        "pace": "Temps nécessaire pour parcourir une unité de distance",
        "pacePerMile": "Votre allure en minutes par mile",
        "pacePerKm": "Votre allure en minutes par kilomètre",
        "speed": "Vitesse de déplacement en distance par heure",
        "totalTime": "Temps d'arrivée estimé pour la distance sélectionnée",
        "calories": "Calories estimées brûlées selon le poids et la distance",
        "vdotScore": "Score de condition physique VDOT de Jack Daniels — plus élevé = plus en forme"
      },
      "values": {
        "min/mi": "min/mile",
        "min/km": "min/km",
        "mph": "mph",
        "km/h": "km/h",
        "mi": "mile",
        "km": "km",
        "cal": "cal",
        "lbs": "lbs",
        "kg": "kg",
        "bpm": "bpm",
        "Easy": "Facile",
        "Marathon": "Marathon",
        "Threshold": "Seuil",
        "Interval": "Intervalles",
        "Repetition": "Répétition",
        "Conversational": "Conversationnel",
        "Steady": "Régulier",
        "Comfortably Hard": "Confortablement Difficile",
        "Hard (3-5 min)": "Difficile (3-5 min)",
        "Fast & Short": "Rapide et Court",
        "1 Mile": "1 Mile",
        "5K": "5K",
        "10K": "10K",
        "Half Marathon": "Semi-Marathon",
        "Race Predictions": "Prédictions de Course",
        "Training Zones": "Zones d'Entraînement",
        "Heart Rate Zones": "Zones de Fréquence Cardiaque",
        "Predicted Time": "Temps Prédit",
        "Predicted Pace": "Allure Prédite",
        "Zone 1": "Zone 1",
        "Zone 2": "Zone 2",
        "Zone 3": "Zone 3",
        "Zone 4": "Zone 4",
        "Zone 5": "Zone 5",
        "Recovery": "Récupération",
        "Aerobic": "Aérobie",
        "Tempo": "Tempo",
        "Lactate Threshold": "Seuil Lactique",
        "VO2 Max": "VO2 Max"
      },
      "formats": {
        "summary": "Votre allure est {pace} {paceUnit}. Vitesse : {speed}. VDOT estimé : {vdot}. FC max : {maxHR} bpm."
      },
      "infoCards": {
        "paceMetrics": {
          "title": "📊 Allure & Vitesse",
          "items": [
            {
              "label": "Allure par Mile",
              "valueKey": "pacePerMile"
            },
            {
              "label": "Allure par Km",
              "valueKey": "pacePerKm"
            },
            {
              "label": "Vitesse",
              "valueKey": "speed"
            },
            {
              "label": "Temps d'Arrivée",
              "valueKey": "totalTime"
            }
          ]
        },
        "fitnessMetrics": {
          "title": "💪 Métriques de Forme",
          "items": [
            {
              "label": "Score VDOT",
              "valueKey": "vdotScore"
            },
            {
              "label": "Calories Brûlées",
              "valueKey": "calories"
            },
            {
              "label": "Fréquence Cardiaque Max",
              "valueKey": "maxHR"
            },
            {
              "label": "Niveau d'Entraînement",
              "valueKey": "trainingLevel"
            }
          ]
        },
        "raceTips": {
          "title": "🏁 Conseils Jour de Course",
          "items": [
            "Commencez prudemment — visez des passages réguliers ou négatifs",
            "Pratiquez votre allure de course durant les sorties longues d'entraînement",
            "N'essayez rien de nouveau le jour de course (chaussures, nourriture, équipement)",
            "Hydratez-vous tôt — quand vous avez soif, il est déjà trop tard"
          ]
        },
        "trainingTips": {
          "title": "💡 Conseils d'Entraînement",
          "items": [
            "Suivez la règle 80/20 — 80% facile, 20% effort difficile",
            "Incluez une sortie tempo et une séance d'intervalles par semaine",
            "Entraînez-vous en force 2x par semaine pour améliorer l'économie de course",
            "N'augmentez jamais le kilométrage hebdomadaire de plus de 10%"
          ]
        }
      },
      "referenceData": {
        "worldRecords": {
          "title": "Allures Records du Monde",
          "items": {
            "mile": {
              "label": "1 Mile",
              "value": "3:43 (H) / 4:07 (F)"
            },
            "fiveK": {
              "label": "5K",
              "value": "12:35 (H) / 14:00 (F)"
            },
            "tenK": {
              "label": "10K",
              "value": "26:11 (H) / 28:54 (F)"
            },
            "half": {
              "label": "Semi-Marathon",
              "value": "57:31 (H) / 1:02:52 (F)"
            },
            "full": {
              "label": "Marathon",
              "value": "2:00:35 (H) / 2:09:56 (F)"
            }
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que l'Allure de Course ?",
          "content": "L'allure de course est le temps nécessaire pour parcourir une distance spécifique, généralement exprimée en minutes par mile (min/mile) ou minutes par kilomètre (min/km). C'est l'inverse de la vitesse — tandis que la vitesse indique votre rapidité (ex. 12 km/h), l'allure indique combien de temps prend chaque unité de distance (ex. 5:00/km). Comprendre votre allure est fondamental pour un entraînement efficace, une course intelligente et une amélioration constante. Que vous vous entraîniez pour votre premier 5K ou poursuiviez un record personnel au marathon, connaître votre allure cible vous aide à éviter l'erreur la plus commune en course de fond : partir trop vite et s'effondrer en seconde moitié."
        },
        "trainingZones": {
          "title": "Comprendre les Zones d'Entraînement VDOT",
          "content": "Les zones d'entraînement, développées par le physiologiste renommé Jack Daniels, sont des plages d'allure spécifiques conçues pour cibler différentes adaptations physiologiques. Chaque zone sollicite votre corps de manière unique : l'allure Facile développe votre base aérobie et favorise la récupération, l'allure Marathon développe l'efficacité à l'effort soutenu, l'allure Seuil (tempo) améliore votre capacité d'élimination du lactate, l'allure Intervalles booste votre plafond VO₂max, et l'allure Répétition améliore l'économie de course et la vitesse neuromusculaire. L'idée clé des recherches de Daniels est que s'entraîner à la bonne intensité importe plus que simplement courir dur chaque jour. Votre score VDOT, calculé à partir d'une performance de course récente, détermine l'allure exacte pour chaque zone — assurant que votre entraînement soit précisément calibré à votre niveau de forme actuel."
        },
        "heartRateTraining": {
          "title": "Zones d'Entraînement par Fréquence Cardiaque Expliquées",
          "content": "Les zones de fréquence cardiaque sont des plages d'intensité basées sur votre fréquence cardiaque maximale (estimée à 220 moins votre âge). Zone 1 (50-60% FC max) est pour la récupération et l'échauffement. Zone 2 (60-70%) développe la base aérobie — la plupart de l'entraînement devrait être ici. Zone 3 (70-80%) est l'effort modéré, allure marathon. Zone 4 (80-90%) est l'effort seuil/tempo, où le lactate commence à s'accumuler. Zone 5 (90-100%) est l'effort maximal pour de courts intervalles. S'entraîner par fréquence cardiaque aide à s'assurer que vous atteignez la bonne intensité — particulièrement important en côtes, par forte chaleur, ou quand la fatigue masque votre effort réel. Beaucoup de coureurs s'entraînent trop dur les jours faciles (au-dessus de Zone 2) et pas assez dur les jours difficiles (en dessous de Zone 4), ratant l'effet d'entraînement polarisé qui génère l'amélioration."
        },
        "paceImprovement": {
          "title": "Conseils pour Améliorer votre Allure de Course",
          "items": [
            {
              "text": "Suivez la règle 80/20 — courez 80% de votre volume hebdomadaire à allure facile, conversationnelle et seulement 20% à efforts plus difficiles",
              "type": "info"
            },
            {
              "text": "Incluez une sortie tempo hebdomadaire à allure seuil (confortablement difficile) pour pousser votre seuil lactique plus haut",
              "type": "info"
            },
            {
              "text": "Ajoutez des lignes droites (6-8 courtes accélérations de 20 secondes) après les sorties faciles pour développer la vitesse sans fatigue",
              "type": "info"
            },
            {
              "text": "Entraînez-vous en force au moins deux fois par semaine — des fessiers, abdos et mollets forts améliorent drastiquement l'économie de course",
              "type": "info"
            },
            {
              "text": "Évitez d'augmenter le kilométrage hebdomadaire total de plus de 10% pour prévenir les blessures de surmenage",
              "type": "warning"
            },
            {
              "text": "Priorisez le sommeil et la nutrition — la récupération est quand votre corps développe réellement la forme à partir du stimulus d'entraînement",
              "type": "info"
            }
          ]
        },
        "commonMistakes": {
          "title": "Erreurs d'Allure Communes à Éviter",
          "items": [
            {
              "text": "Partir trop vite en course — brûler les réserves de glycogène dans les premiers kilomètres mène à des ralentissements douloureux après le km 30-35",
              "type": "warning"
            },
            {
              "text": "Courir tous les entraînements à la même intensité modérée — cet entraînement en 'zone grise' limite à la fois la récupération et les gains de performance",
              "type": "warning"
            },
            {
              "text": "Ignorer les conditions environnementales — chaleur, humidité, altitude et vent de face nécessitent tous des ajustements d'allure de 10-30 secondes par kilomètre",
              "type": "info"
            },
            {
              "text": "Poursuivre l'allure à chaque sortie — certains jours devraient être genuinement faciles peu importe ce que dit votre montre",
              "type": "info"
            },
            {
              "text": "Utiliser votre allure de course pour l'entraînement quotidien — la plupart de l'entraînement devrait être 30-60 secondes par kilomètre plus lent que votre allure de course objectif",
              "type": "warning"
            },
            {
              "text": "Ignorer les données de fréquence cardiaque — s'entraîner uniquement par l'allure peut mener au surentraînement par temps chaud ou au sous-entraînement sur parcours vallonné",
              "type": "warning"
            }
          ]
        },
        "raceStrategy": {
          "title": "Stratégie d'Allure Jour de Course",
          "items": [
            {
              "text": "Commencez 10-15 secondes par kilomètre plus lent que l'allure objectif — la retenue précoce paie énormément dans les derniers kilomètres",
              "type": "info"
            },
            {
              "text": "Courez à passages réguliers ou négatifs (seconde moitié plus rapide) — les passages positifs (s'effondrer) vous coûtent 2-3 minutes au marathon",
              "type": "info"
            },
            {
              "text": "Utilisez les bornes kilométriques pour vérifier l'allure, pas votre montre toutes les 30 secondes — la vérification constante augmente la fatigue mentale",
              "type": "info"
            },
            {
              "text": "Tenez compte du dénivelé — ralentissez de 10-20 sec/km en montée, ne sur-corrigez pas en descente (préservez vos quadriceps)",
              "type": "info"
            },
            {
              "text": "Ayez un plan B — si les conditions sont brutales (chaleur, vent), ajustez l'allure objectif de 10-30 sec/km pour éviter l'explosion",
              "type": "warning"
            },
            {
              "text": "Pratiquez l'allure de course à l'entraînement — votre allure objectif devrait sembler 'confortablement difficile' aux entraînements, pas comme un sprint maximal",
              "type": "info"
            }
          ]
        },
        "calculationExamples": {
          "title": "Exemples de Calculs",
          "description": "Exemples détaillés de calculs d'allure et prédictions de course",
          "examples": [
            {
              "title": "Calculer l'Allure 5K",
              "steps": [
                "Distance : 5K (5 000 mètres)",
                "Temps d'arrivée : 25:00 (1 500 secondes)",
                "Allure = 1 500 ÷ 5 = 300 sec/km",
                "Allure = 5:00 par km (8:03 par mile)",
                "Vitesse = 5 ÷ (1500/3600) = 12 km/h"
              ],
              "result": "Allure : 5:00/km · Vitesse : 12 km/h · VDOT : ~44"
            },
            {
              "title": "Prédire Marathon depuis 10K",
              "steps": [
                "Temps 10K : 50:00 (3 000 secondes)",
                "Distance marathon : 42 195 m",
                "Riegel : T₂ = T₁ × (D₂/D₁)^1,06",
                "T₂ = 3000 × (42195/10000)^1,06",
                "T₂ = 3000 × 4,577 = 13 732 sec"
              ],
              "result": "Marathon prédit : 3:48:52"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle est une bonne allure de course pour les débutants ?",
          "answer": "Une bonne allure débutant est généralement 6:13-8:05 par km (10:00-13:00 par mile). Le plus important pour les nouveaux coureurs est de pouvoir tenir une conversation en courant — si vous pouvez parler confortablement, vous êtes à la bonne allure. La plupart des débutants finissent leur premier 5K entre 30-40 minutes, ce qui se traduit par environ 6:00-8:00/km. Concentrez-vous d'abord sur terminer la distance avant de vous soucier de la vitesse."
        },
        {
          "question": "Quelle est la différence entre allure et vitesse ?",
          "answer": "L'allure et la vitesse sont inverses l'une de l'autre. La vitesse mesure la distance par unité de temps (ex. 12 km par heure), tandis que l'allure mesure le temps par unité de distance (ex. 5:00 par km). Les coureurs préfèrent l'allure car elle se traduit directement en planification de course — si vous savez que votre allure est 5:00/km pour un 5K, vous savez que chaque borne kilométrique devrait arriver à intervalles de 5 minutes. La vitesse est plus couramment utilisée en cyclisme et conduite."
        },
        {
          "question": "Qu'est-ce que le VDOT et comment est-il calculé ?",
          "answer": "Le VDOT est une métrique de forme développée par le physiologiste Jack Daniels. Il représente votre niveau de forme physique de course actuel basé sur une performance de course récente. Le calcul utilise la formule Daniels-Gilbert qui considère votre distance de course et temps d'arrivée pour estimer votre VO₂max (consommation maximale d'oxygène). Un VDOT plus élevé signifie une plus grande forme aérobie. Pour le contexte, les coureurs récréatifs scorent typiquement 25-45, les coureurs de club compétitifs 45-60, et les coureurs élites 65-85. Votre VDOT est utilisé pour prescrire des allures d'entraînement personnalisées pour chaque zone d'entraînement."
        },
        {
          "question": "Quelle est la précision des prédictions de temps de course ?",
          "answer": "Les prédictions de course utilisent la formule de Riegel (T₂ = T₁ × (D₂/D₁)^1,06), bien validée pour les coureurs entraînés courant entre 1 mile et marathon. Les prédictions sont plus précises quand votre course d'entrée est proche de la distance cible — par exemple, un résultat 10K prédit un semi-marathon plus fiablement qu'un temps au mile. La formule assume un volume d'entraînement similaire et des conditions de course. Les prédictions deviennent moins fiables aux distances extrêmes (ultra-marathons) ou si vous êtes significativement sous-entraîné pour la distance plus longue."
        },
        {
          "question": "Que sont les zones d'entraînement et pourquoi importent-elles ?",
          "answer": "Les zones d'entraînement sont des plages d'allure spécifiques qui ciblent différentes adaptations physiologiques. L'allure Facile (59-74% VO₂max) développe l'endurance aérobie et la récupération. L'allure Marathon (75-84%) développe la capacité d'effort soutenu. L'allure Seuil (83-88%) améliore l'élimination du lactate — la clé pour courir plus vite. L'allure Intervalles (95-100%) élève votre plafond VO₂max. L'allure Répétition (105%+) améliore la vitesse et l'économie de course. S'entraîner dans les bonnes zones assure que vous obtenez le bénéfice voulu de chaque entraînement sans fatigue ou risque de blessure inutiles."
        },
        {
          "question": "Combien de calories la course brûle-t-elle ?",
          "answer": "Une approximation commune est que la course brûle environ 62 calories par kilomètre pour une personne de 70 kg. Plus précisément, la combustion calorique équivaut approximativement à votre poids corporel en kilogrammes multiplié par la distance en kilomètres multiplié par 1,036. Donc un coureur de 70 kg parcourant 10 km brûle environ 725 calories. L'allure a un effet mineur — courir plus vite brûle légèrement plus de calories par minute mais moins par kilomètre, donc la distance totale et le poids corporel sont les facteurs dominants."
        },
        {
          "question": "Dois-je m'entraîner à mon allure de course objectif chaque jour ?",
          "answer": "Non — c'est une des erreurs d'entraînement les plus communes. La recherche montre constamment que 80% de votre volume de course hebdomadaire devrait être à allure facile, conversationnelle (30-60 secondes par kilomètre plus lent que l'allure de course). Seulement 20% devrait être à intensité modérée-à-difficile. Courir trop vite trop souvent vous place dans une 'zone grise' où vous êtes trop fatigué pour récupérer correctement mais pas assez rapide pour déclencher les adaptations spécifiques d'entraînements de qualité comme les sorties tempo et intervalles."
        },
        {
          "question": "Qu'est-ce que la formule de Riegel ?",
          "answer": "La formule de Riegel, publiée par Peter Riegel en 1977, prédit la performance de course à travers les distances en utilisant l'équation T₂ = T₁ × (D₂/D₁)^1,06. T₁ est votre temps de course connu, D₁ est la distance de cette course, D₂ est la distance cible, et T₂ est le temps prédit. L'exposant 1,06 tient compte du fait que l'allure ralentit naturellement quand la distance augmente due aux facteurs de fatigue physiologique. Elle reste une des formules de prédiction de course les plus largement utilisées et validées en course à pied."
        },
        {
          "question": "Comment calculer mes zones d'entraînement par fréquence cardiaque ?",
          "answer": "La méthode la plus simple utilise votre âge pour estimer la FC max : 220 moins votre âge. Par exemple, un trentenaire a une FC max estimée de 190 bpm. Zone 1 (récupération) est 50-60% du max (95-114 bpm), Zone 2 (base aérobie) est 60-70% (114-133 bpm), Zone 3 (modéré) est 70-80% (133-152 bpm), Zone 4 (seuil) est 80-90% (152-171 bpm), et Zone 5 (effort max) est 90-100% (171-190 bpm). Pour plus de précision, déterminez votre FC max réelle par un test de terrain ou évaluation en laboratoire."
        },
        {
          "question": "Que sont les passages négatifs et pourquoi fonctionnent-ils ?",
          "answer": "Les passages négatifs signifient courir la seconde moitié de votre course plus vite que la première moitié. Cette stratégie fonctionne car elle conserve le glycogène tôt quand vous n'en avez pas besoin, réduit l'accumulation d'acide lactique, et vous donne un boost psychologique en dépassant des coureurs qui s'effondrent. Les études montrent que les passages négatifs résultent typiquement en temps globaux plus rapides que l'allure régulière. La clé est de commencer 10-15 secondes par kilomètre plus lent que l'allure objectif dans le premier quart, s'installer dans l'allure objectif pour la moitié centrale, puis augmenter l'effort dans le dernier quart quand vous savez pouvoir finir."
        },
        {
          "question": "Comment les temps de passage aident-ils avec l'allure de course ?",
          "answer": "Les temps de passage divisent votre course en segments (généralement kilomètres) pour que vous puissiez surveiller votre allure tout au long. Pour un marathon, les passages kilomètre par kilomètre vous aident à éviter l'erreur classique de partir trop vite — si votre premier kilomètre est 20 secondes plus rapide que l'allure objectif, vous savez ralentir immédiatement avant que les dégâts soient faits. Les passages aident aussi à ajuster pour les côtes, vent, ou fatigue. Les coureurs élites ont souvent des passages presque identiques pour chaque kilomètre, tandis que les débutants tendent à partir vite et s'effondrer (passages positifs), ce qui coûte un temps significatif."
        },
        {
          "question": "Dois-je m'entraîner par allure ou par fréquence cardiaque ?",
          "answer": "Les deux ont de la valeur, mais la fréquence cardiaque est souvent plus fiable pour les sorties faciles tandis que l'allure fonctionne mieux pour les entraînements. La fréquence cardiaque tient compte des facteurs externes (chaleur, humidité, côtes, fatigue) que l'allure ignore — par 32°C, votre 'allure facile' pourrait faire monter votre FC en Zone 4. Pour les sorties tempo et intervalles, l'allure est plus précise car la FC traîne derrière l'effort et peut être affectée par la caféine, stress, ou sommeil. L'approche idéale : utilisez la FC pour les sorties faciles (restez en Zone 2), utilisez l'allure pour les entraînements de qualité (atteignez les temps cibles), et utilisez les deux pour détecter le surentraînement ou sous-entraînement."
        }
      ],
      "detailedTable": {
        "trainingZones": {
          "button": "Voir Prédictions & Zones d'Entraînement",
          "title": "Prédictions de Course & Zones d'Entraînement VDOT",
          "columns": {
            "zone": "Zone / Distance",
            "paceMi": "Allure/mile",
            "paceKm": "Allure/km",
            "detail": "Détails"
          }
        },
        "splits": {
          "button": "Voir Temps de Passage",
          "title": "Temps de Passage Kilomètre par Kilomètre",
          "columns": {
            "segment": "Kilomètre",
            "time": "Temps de Passage",
            "elapsed": "Temps Écoulé",
            "pace": "Allure"
          }
        }
      },
      "chart": {
        "title": "Allure selon les Distances",
        "xLabel": "Distance",
        "yLabel": "Allure (min/km)",
        "series": {
          "pace": "Votre Allure",
          "easyPace": "Allure Facile",
          "thresholdPace": "Allure Seuil"
        }
      },
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
      "name": "Lauftempo Rechner",
      "slug": "lauftempo-rechner",
      "subtitle": "Berechnen Sie Ihr Tempo, sagen Sie Rennzeiten voraus, erhalten Sie VDOT-Trainingszonen, Herzfrequenzzonen und personalisierte Split-Zeiten für jede Distanz",
      "breadcrumb": "Lauftempo",
      "seo": {
        "title": "Lauftempo Rechner - VDOT, Herzfrequenzzonen & Renn-Splits",
        "description": "Berechnen Sie Lauftempo aus Zeit und Distanz. Erhalten Sie VDOT-Score, Rennvorhersagen, Trainingszonen, Herzfrequenzzonen, Split-Zeiten und Kalorienschätzungen für 5K, 10K, Halbmarathon und Marathon.",
        "shortDescription": "Berechnen Sie Tempo, VDOT, Trainingszonen, Herzfrequenzzonen und Renn-Splits",
        "keywords": [
          "lauftempo rechner",
          "vdot rechner",
          "rennzeit vorhersage",
          "lauf trainingszonen",
          "herzfrequenzzonen laufen",
          "marathon tempo rechner",
          "renn split rechner",
          "5k tempo rechner",
          "daniels laufformel",
          "lauf split zeiten"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "calculationMode": {
          "label": "Ich möchte berechnen",
          "helpText": "Wählen Sie, was berechnet werden soll",
          "options": {
            "calculatePace": "Mein Tempo",
            "calculateTime": "Meine Zielzeit"
          }
        },
        "raceDistance": {
          "label": "Renndistanz",
          "helpText": "Wählen Sie ein Standardrennen oder geben Sie eine benutzerdefinierte Distanz ein",
          "options": {
            "1mile": "1 Meile",
            "5k": "5K",
            "10k": "10K",
            "halfMarathon": "Halbmarathon",
            "marathon": "Marathon",
            "custom": "Benutzerdefinierte Distanz"
          }
        },
        "customDistance": {
          "label": "Distanz",
          "helpText": "Geben Sie Ihre Distanz basierend auf dem gewählten Einheitensystem ein"
        },
        "timeHours": {
          "label": "Stunden"
        },
        "timeMinutes": {
          "label": "Minuten"
        },
        "timeSeconds": {
          "label": "Sekunden"
        },
        "paceMinutes": {
          "label": "Tempo (min)"
        },
        "paceSeconds": {
          "label": "Tempo (sek)"
        },
        "age": {
          "label": "Alter",
          "helpText": "Wird zur Berechnung der Herzfrequenz-Trainingszonen verwendet"
        },
        "weight": {
          "label": "Gewicht",
          "helpText": "Optional - wird zur Schätzung der verbrannten Kalorien verwendet"
        }
      },
      "inputGroups": {},
      "results": {
        "pace": {
          "label": "Tempo"
        },
        "pacePerMile": {
          "label": "Tempo/Meile"
        },
        "pacePerKm": {
          "label": "Tempo/km"
        },
        "speed": {
          "label": "Geschwindigkeit"
        },
        "totalTime": {
          "label": "Zielzeit"
        },
        "calories": {
          "label": "Verbrannte Kalorien"
        },
        "vdotScore": {
          "label": "VDOT-Score"
        }
      },
      "presets": {
        "beginner5k": {
          "label": "Anfänger 5K",
          "description": "35-Minuten 5K Ziel"
        },
        "sub25_5k": {
          "label": "Unter-25 5K",
          "description": "25-Minuten 5K Ziel"
        },
        "sub2Half": {
          "label": "Unter-2h Halb",
          "description": "Unter 2 Stunden im Halbmarathon"
        },
        "bqAttempt": {
          "label": "BQ-Versuch",
          "description": "3:00 Marathon — Boston Qualifier Tempo"
        },
        "fast10k": {
          "label": "Schnelle 10K",
          "description": "45-Minuten 10K Ziel"
        },
        "eliteMarathon": {
          "label": "Elite Marathon",
          "description": "2:30 Marathon — Elite-Tempo"
        }
      },
      "tooltips": {
        "pace": "Zeit, die benötigt wird, um eine Distanzeinheit zu bewältigen",
        "pacePerMile": "Ihr Tempo in Minuten pro Meile",
        "pacePerKm": "Ihr Tempo in Minuten pro Kilometer",
        "speed": "Wie schnell Sie sich in Distanz pro Stunde bewegen",
        "totalTime": "Geschätzte Zielzeit für die gewählte Distanz",
        "calories": "Geschätzte verbrannte Kalorien basierend auf Gewicht und Distanz",
        "vdotScore": "Jack Daniels' VDOT Fitness-Score — höher ist fitter"
      },
      "values": {
        "min/mi": "min/Meile",
        "min/km": "min/km",
        "mph": "mph",
        "km/h": "km/h",
        "mi": "Meile",
        "km": "km",
        "cal": "kal",
        "lbs": "lbs",
        "kg": "kg",
        "bpm": "bpm",
        "Easy": "Leicht",
        "Marathon": "Marathon",
        "Threshold": "Schwelle",
        "Interval": "Intervall",
        "Repetition": "Wiederholung",
        "Conversational": "Gesprächstempo",
        "Steady": "Gleichmäßig",
        "Comfortably Hard": "Angenehm Hart",
        "Hard (3-5 min)": "Hart (3-5 min)",
        "Fast & Short": "Schnell & Kurz",
        "1 Mile": "1 Meile",
        "5K": "5K",
        "10K": "10K",
        "Half Marathon": "Halbmarathon",
        "Race Predictions": "Renn-Vorhersagen",
        "Training Zones": "Trainingszonen",
        "Heart Rate Zones": "Herzfrequenzzonen",
        "Predicted Time": "Vorhergesagte Zeit",
        "Predicted Pace": "Vorhergesagtes Tempo",
        "Zone 1": "Zone 1",
        "Zone 2": "Zone 2",
        "Zone 3": "Zone 3",
        "Zone 4": "Zone 4",
        "Zone 5": "Zone 5",
        "Recovery": "Erholung",
        "Aerobic": "Aerob",
        "Tempo": "Tempo",
        "Lactate Threshold": "Laktatschwelle",
        "VO2 Max": "VO2 Max"
      },
      "formats": {
        "summary": "Ihr Tempo ist {pace} {paceUnit}. Geschwindigkeit: {speed}. Geschätzter VDOT: {vdot}. Max HF: {maxHR} bpm."
      },
      "infoCards": {
        "paceMetrics": {
          "title": "📊 Tempo & Geschwindigkeit",
          "items": [
            {
              "label": "Tempo pro Meile",
              "valueKey": "pacePerMile"
            },
            {
              "label": "Tempo pro Km",
              "valueKey": "pacePerKm"
            },
            {
              "label": "Geschwindigkeit",
              "valueKey": "speed"
            },
            {
              "label": "Zielzeit",
              "valueKey": "totalTime"
            }
          ]
        },
        "fitnessMetrics": {
          "title": "💪 Fitness-Metriken",
          "items": [
            {
              "label": "VDOT-Score",
              "valueKey": "vdotScore"
            },
            {
              "label": "Verbrannte Kalorien",
              "valueKey": "calories"
            },
            {
              "label": "Maximale Herzfrequenz",
              "valueKey": "maxHR"
            },
            {
              "label": "Trainingslevel",
              "valueKey": "trainingLevel"
            }
          ]
        },
        "raceTips": {
          "title": "🏁 Renntag-Tipps",
          "items": [
            "Beginnen Sie konservativ — streben Sie gleichmäßige oder negative Splits an",
            "Üben Sie Ihr Renntempo während langer Trainingsläufe",
            "Probieren Sie am Renntag nichts Neues aus (Schuhe, Essen, Ausrüstung)",
            "Trinken Sie früh — wenn Sie Durst haben, ist es zu spät"
          ]
        },
        "trainingTips": {
          "title": "💡 Trainings-Tipps",
          "items": [
            "Befolgen Sie die 80/20-Regel — 80% leicht, 20% harte Anstrengung",
            "Integrieren Sie einen Tempolauf und eine Intervallsession pro Woche",
            "Krafttraining 2x pro Woche zur Verbesserung der Laufökonomie",
            "Erhöhen Sie die wöchentliche Kilometerleistung nie um mehr als 10%"
          ]
        }
      },
      "referenceData": {
        "worldRecords": {
          "title": "Weltrekord-Tempos",
          "items": {
            "mile": {
              "label": "1 Meile",
              "value": "3:43 (M) / 4:07 (F)"
            },
            "fiveK": {
              "label": "5K",
              "value": "12:35 (M) / 14:00 (F)"
            },
            "tenK": {
              "label": "10K",
              "value": "26:11 (M) / 28:54 (F)"
            },
            "half": {
              "label": "Halbmarathon",
              "value": "57:31 (M) / 1:02:52 (F)"
            },
            "full": {
              "label": "Marathon",
              "value": "2:00:35 (M) / 2:09:56 (F)"
            }
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist Lauftempo?",
          "content": "Lauftempo ist die Zeit, die benötigt wird, um eine bestimmte Distanz zu bewältigen, typischerweise ausgedrückt als Minuten pro Meile (min/Meile) oder Minuten pro Kilometer (min/km). Es ist das Gegenteil von Geschwindigkeit — während Geschwindigkeit angibt, wie schnell Sie sich bewegen (z.B. 12 km/h), gibt das Tempo an, wie lange jede Distanzeinheit dauert (z.B. 8:00/Meile). Das Verstehen Ihres Tempos ist grundlegend für effektives Training, intelligentes Rennen und kontinuierliche Verbesserung. Ob Sie für Ihren ersten 5K trainieren oder einen Marathon-Rekord jagen, das Kennen Ihres Zieltempos hilft Ihnen, den häufigsten Fehler im Distanzlauf zu vermeiden: zu schnell zu starten und in der zweiten Hälfte nachzulassen."
        },
        "trainingZones": {
          "title": "VDOT-Trainingszonen verstehen",
          "content": "Trainingszonen, entwickelt vom renommierten Sportphysiologen Jack Daniels, sind spezifische Tempobereiche, die darauf ausgelegt sind, verschiedene physiologische Anpassungen zu erreichen. Jede Zone belastet Ihren Körper auf einzigartige Weise: Leichtes Tempo baut Ihre aerobe Basis auf und fördert die Erholung, Marathon-Tempo entwickelt Effizienz bei anhaltender Anstrengung, Schwellen-(Tempo-)Tempo verbessert Ihre Laktat-Clearance-Kapazität, Intervall-Tempo steigert Ihre VO₂max-Obergrenze, und Wiederholungs-Tempo verbessert die Laufökonomie und neuromuskuläre Geschwindigkeit. Die wichtigste Erkenntnis aus Daniels' Forschung ist, dass Training mit der richtigen Intensität wichtiger ist als einfach jeden Tag hart zu laufen. Ihr VDOT-Score, berechnet aus einer aktuellen Rennleistung, bestimmt das genaue Tempo für jede Zone — damit Ihr Training präzise auf Ihr aktuelles Fitnesslevel kalibriert ist."
        },
        "heartRateTraining": {
          "title": "Herzfrequenz-Trainingszonen erklärt",
          "content": "Herzfrequenzzonen sind Intensitätsbereiche basierend auf Ihrer maximalen Herzfrequenz (geschätzt als 220 minus Ihr Alter). Zone 1 (50-60% max HF) ist für Erholung und Aufwärmen. Zone 2 (60-70%) baut die aerobe Basis auf — das meiste Training sollte hier stattfinden. Zone 3 (70-80%) ist moderate Anstrengung, Marathon-Tempo. Zone 4 (80-90%) ist Schwellen-/Tempo-Anstrengung, wo Laktat zu akkumulieren beginnt. Zone 5 (90-100%) ist maximale Anstrengung für kurze Intervalle. Training nach Herzfrequenz hilft sicherzustellen, dass Sie die richtige Intensität treffen — besonders wichtig bei Steigungen, Hitze oder wenn Müdigkeit Ihr wahres Anstrengungslevel verschleiert. Viele Läufer trainieren zu hart an leichten Tagen (über Zone 2) und nicht hart genug an harten Tagen (unter Zone 4), wodurch der polarisierte Trainingseffekt verfehlt wird, der Verbesserung antreibt."
        },
        "paceImprovement": {
          "title": "Tipps zur Verbesserung Ihres Lauftempos",
          "items": [
            {
              "text": "Befolgen Sie die 80/20-Regel — laufen Sie 80% Ihres wöchentlichen Volumens in leichtem, gesprächsfähigem Tempo und nur 20% in härteren Anstrengungen",
              "type": "info"
            },
            {
              "text": "Integrieren Sie einen wöchentlichen Tempolauf im Schwellentempo (angenehm hart), um Ihre Laktatschwelle höher zu drücken",
              "type": "info"
            },
            {
              "text": "Fügen Sie Steigerungen hinzu (6-8 kurze 20-Sekunden-Beschleunigungen) nach leichten Läufen, um Geschwindigkeit ohne Ermüdung zu entwickeln",
              "type": "info"
            },
            {
              "text": "Krafttraining mindestens zweimal pro Woche — starke Gesäßmuskeln, Rumpf und Waden verbessern die Laufökonomie dramatisch",
              "type": "info"
            },
            {
              "text": "Vermeiden Sie es, die gesamte wöchentliche Kilometerleistung um mehr als 10% zu erhöhen, um Überlastungsverletzungen zu verhindern",
              "type": "warning"
            },
            {
              "text": "Priorisieren Sie Schlaf und Ernährung — Erholung ist, wo Ihr Körper tatsächlich Fitness aus dem Trainingsreiz aufbaut",
              "type": "info"
            }
          ]
        },
        "commonMistakes": {
          "title": "Häufige Tempo-Fehler vermeiden",
          "items": [
            {
              "text": "Zu schnell in Rennen starten — das Verbrennen von Glykogenspeichern in den ersten Meilen führt zu schmerzhaften Verlangsamungen nach Meile 18-20",
              "type": "warning"
            },
            {
              "text": "Alle Trainingseinheiten mit der gleichen moderaten Intensität laufen — dieses 'graue Zonen'-Training begrenzt sowohl Erholung als auch Leistungsgewinne",
              "type": "warning"
            },
            {
              "text": "Umweltbedingungen ignorieren — Hitze, Luftfeuchtigkeit, Höhe und Gegenwind erfordern alle Tempo-Anpassungen von 10-30 Sekunden pro Meile",
              "type": "info"
            },
            {
              "text": "Das Tempo bei jedem einzelnen Lauf verfolgen — manche Tage sollten wirklich leicht sein, unabhängig davon, was Ihre Uhr sagt",
              "type": "info"
            },
            {
              "text": "Ihr Renntempo für das tägliche Training verwenden — das meiste Training sollte 1-2 Minuten pro Meile langsamer als Ihr Ziel-Renntempo sein",
              "type": "warning"
            },
            {
              "text": "Herzfrequenzdaten ignorieren — Training nur nach Tempo kann zu Übertraining an heißen Tagen oder Untertraining auf hügeligen Strecken führen",
              "type": "warning"
            }
          ]
        },
        "raceStrategy": {
          "title": "Renntag-Tempo-Strategie",
          "items": [
            {
              "text": "Beginnen Sie 10-15 Sekunden pro Meile langsamer als das Zieltempo — frühe Zurückhaltung zahlt sich in den letzten Meilen riesig aus",
              "type": "info"
            },
            {
              "text": "Laufen Sie gleichmäßige Splits oder negative Splits (zweite Hälfte schneller) — positive Splits (nachlassen) kosten Sie 2-3 Minuten in einem Marathon",
              "type": "info"
            },
            {
              "text": "Nutzen Sie Meilenmarkierungen zur Tempoüberprüfung, nicht Ihre Uhr alle 30 Sekunden — ständiges Überprüfen erhöht die mentale Ermüdung",
              "type": "info"
            },
            {
              "text": "Berücksichtigen Sie die Höhenlage — verlangsamen Sie sich um 10-20 sek/Meile bei Anstiegen, überkorrigieren Sie nicht bei Abstiegen (schonen Sie Ihre Oberschenkel)",
              "type": "info"
            },
            {
              "text": "Haben Sie einen Plan B — wenn die Bedingungen brutal sind (Hitze, Wind), passen Sie das Zieltempo um 10-30 sek/Meile an, um ein Scheitern zu vermeiden",
              "type": "warning"
            },
            {
              "text": "Üben Sie das Renntempo im Training — Ihr Zieltempo sollte sich in Trainingseinheiten 'angenehm hart' anfühlen, nicht wie ein Vollsprint",
              "type": "info"
            }
          ]
        },
        "calculationExamples": {
          "title": "Berechnungsbeispiele",
          "description": "Schritt-für-Schritt Tempo- und Rennvorhersage-Beispiele",
          "examples": [
            {
              "title": "5K-Tempo berechnen",
              "steps": [
                "Distanz: 5K (3,107 Meilen)",
                "Zielzeit: 25:00 (1.500 Sekunden)",
                "Tempo = 1.500 ÷ 3,107 = 482,8 sek/Meile",
                "Tempo = 8:03 pro Meile (5:00 pro km)",
                "Geschwindigkeit = 3,107 ÷ (1500/3600) = 7,46 mph"
              ],
              "result": "Tempo: 8:03/Meile · Geschwindigkeit: 7,5 mph · VDOT: ~44"
            },
            {
              "title": "Marathon aus 10K vorhersagen",
              "steps": [
                "10K-Zeit: 50:00 (3.000 Sekunden)",
                "Marathon-Distanz: 42.195 m",
                "Riegel: T₂ = T₁ × (D₂/D₁)^1,06",
                "T₂ = 3000 × (42195/10000)^1,06",
                "T₂ = 3000 × 4,577 = 13.732 sek"
              ],
              "result": "Vorhergesagter Marathon: 3:48:52"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Was ist ein gutes Lauftempo für Anfänger?",
          "answer": "Ein gutes Anfängertempo liegt typischerweise bei 10:00-13:00 pro Meile (6:13-8:05 pro km). Das Wichtigste für neue Läufer ist, während des Laufens ein Gespräch führen zu können — wenn Sie bequem sprechen können, sind Sie im richtigen Tempo. Die meisten Anfänger beenden ihren ersten 5K zwischen 30-40 Minuten, was ungefähr einem 10:00-13:00/Meile-Tempo entspricht. Konzentrieren Sie sich darauf, zuerst die Distanz zu schaffen, bevor Sie sich um die Geschwindigkeit sorgen."
        },
        {
          "question": "Was ist der Unterschied zwischen Tempo und Geschwindigkeit?",
          "answer": "Tempo und Geschwindigkeit sind Umkehrungen voneinander. Geschwindigkeit misst Distanz pro Zeiteinheit (z.B. 12 Kilometer pro Stunde), während Tempo Zeit pro Distanzeinheit misst (z.B. 8:00 pro Meile). Läufer bevorzugen Tempo, weil es direkt in die Rennplanung übersetzt — wenn Sie wissen, dass Ihr Tempo 8:00/Meile für einen 5K ist, wissen Sie, dass jede Meilenmarkierung in 8-Minuten-Intervallen kommen sollte. Geschwindigkeit wird häufiger beim Radfahren und Autofahren verwendet."
        },
        {
          "question": "Was ist VDOT und wie wird es berechnet?",
          "answer": "VDOT ist eine Fitness-Metrik, die vom Sportphysiologen Jack Daniels entwickelt wurde. Es repräsentiert Ihr aktuelles Lauf-Fitnesslevel basierend auf einer aktuellen Rennleistung. Die Berechnung verwendet die Daniels-Gilbert-Formel, die Ihre Renndistanz und Zielzeit berücksichtigt, um Ihre VO₂max (maximale Sauerstoffaufnahme) zu schätzen. Ein höherer VDOT bedeutet größere aerobe Fitness. Zum Vergleich: Freizeitläufer erreichen typischerweise 25-45, wettkampfmäßige Vereinsläufer 45-60 und Eliteläufer 65-85. Ihr VDOT wird verwendet, um personalisierte Trainingstempos für jede Trainingszone zu verschreiben."
        },
        {
          "question": "Wie genau sind die Rennzeit-Vorhersagen?",
          "answer": "Rennvorhersagen verwenden Riegels Formel (T₂ = T₁ × (D₂/D₁)^1,06), die für trainierte Läufer bei Rennen zwischen 1 Meile und Marathon gut validiert ist. Vorhersagen sind am genauesten, wenn Ihr Eingaberennen nahe der Zieldistanz liegt — zum Beispiel sagt ein 10K-Ergebnis einen Halbmarathon zuverlässiger voraus als eine Meilenzeit. Die Formel nimmt ähnliches Trainingsvolumen und Rennbedingungen an. Vorhersagen werden weniger zuverlässig bei extremen Distanzen (Ultramarathons) oder wenn Sie für die längere Distanz erheblich untertrainiert sind."
        },
        {
          "question": "Was sind Trainingszonen und warum sind sie wichtig?",
          "answer": "Trainingszonen sind spezifische Tempobereiche, die verschiedene physiologische Anpassungen anvisieren. Leichtes Tempo (59-74% VO₂max) baut aerobe Ausdauer und Erholung auf. Marathon-Tempo (75-84%) entwickelt anhaltende Anstrengungskapazität. Schwellentempo (83-88%) verbessert Laktat-Clearance — der Schlüssel zu schnellerem Rennen. Intervalltempo (95-100%) erhöht Ihre VO₂max-Obergrenze. Wiederholungstempo (105%+) verbessert Geschwindigkeit und Laufökonomie. Training in den richtigen Zonen stellt sicher, dass Sie den beabsichtigten Nutzen aus jeder Trainingseinheit erhalten, ohne unnötige Ermüdung oder Verletzungsrisiko."
        },
        {
          "question": "Wie viele Kalorien verbrennt das Laufen?",
          "answer": "Eine häufige Näherung ist, dass Laufen etwa 100 Kalorien pro Meile (62 pro km) für eine 70 kg schwere Person verbrennt. Genauer ist der Kalorienverbrauch ungefähr gleich Ihrem Körpergewicht in Kilogramm multipliziert mit der Distanz in Kilometern multipliziert mit 1,036. So verbrennt ein 70 kg schwerer Läufer über 10 km ungefähr 725 Kalorien. Das Tempo hat einen geringfügigen Effekt — schnelleres Laufen verbrennt etwas mehr Kalorien pro Minute, aber weniger pro Meile, daher sind Gesamtdistanz und Körpergewicht die dominierenden Faktoren."
        },
        {
          "question": "Sollte ich jeden Tag in meinem Ziel-Renntempo trainieren?",
          "answer": "Nein — das ist einer der häufigsten Trainingsfehler. Forschung zeigt konsistent, dass 80% Ihres wöchentlichen Laufvolumens in leichtem, gesprächsfähigem Tempo (1-2 Minuten pro Meile langsamer als Renntempo) sein sollten. Nur 20% sollten bei moderater bis harter Intensität sein. Zu oft zu schnell zu laufen versetzt Sie in eine 'graue Zone', wo Sie zu müde sind, um sich richtig zu erholen, aber nicht schnell genug, um die spezifischen Anpassungen von Qualitätstrainings wie Tempoläufen und Intervallen auszulösen."
        },
        {
          "question": "Was ist die Riegel-Formel?",
          "answer": "Die Riegel-Formel, veröffentlicht von Peter Riegel 1977, sagt Rennleistung über Distanzen mit der Gleichung T₂ = T₁ × (D₂/D₁)^1,06 voraus. T₁ ist Ihre bekannte Rennzeit, D₁ ist die Distanz dieses Rennens, D₂ ist die Zieldistanz und T₂ ist die vorhergesagte Zeit. Der Exponent 1,06 berücksichtigt die Tatsache, dass sich das Tempo natürlich verlangsamt, wenn die Distanz aufgrund physiologischer Ermüdungsfaktoren zunimmt. Es bleibt eine der am weitesten verwendeten und validierten Rennvorhersage-Formeln im Laufsport."
        },
        {
          "question": "Wie berechne ich meine Herzfrequenz-Trainingszonen?",
          "answer": "Die einfachste Methode verwendet Ihr Alter zur Schätzung der maximalen Herzfrequenz: 220 minus Ihr Alter. Zum Beispiel hat ein 30-Jähriger eine geschätzte max HF von 190 bpm. Zone 1 (Erholung) ist 50-60% des Maximums (95-114 bpm), Zone 2 (aerobe Basis) ist 60-70% (114-133 bpm), Zone 3 (moderat) ist 70-80% (133-152 bpm), Zone 4 (Schwelle) ist 80-90% (152-171 bpm) und Zone 5 (maximale Anstrengung) ist 90-100% (171-190 bpm). Für mehr Genauigkeit bestimmen Sie Ihre tatsächliche max HF durch einen Feldtest oder Labortest."
        },
        {
          "question": "Was sind negative Splits und warum funktionieren sie?",
          "answer": "Negative Splits bedeuten, die zweite Hälfte Ihres Rennens schneller zu laufen als die erste Hälfte. Diese Strategie funktioniert, weil sie früh Glykogen spart, wenn Sie es nicht brauchen, Milchsäure-Aufbau reduziert und Ihnen einen psychologischen Schub gibt, wenn Sie nachlassende Läufer überholen. Studien zeigen, dass negative Splits typischerweise zu schnelleren Gesamtzeiten führen als gleichmäßiges Tempo. Der Schlüssel ist, im ersten Viertel 10-15 Sekunden pro Meile langsamer als das Zieltempo zu starten, sich für die mittlere Hälfte ins Zieltempo einzupendeln, dann die Anstrengung im letzten Viertel zu erhöhen, wenn Sie wissen, dass Sie ins Ziel kommen."
        },
        {
          "question": "Wie helfen Split-Zeiten bei der Renn-Tempo-Einteilung?",
          "answer": "Split-Zeiten teilen Ihr Rennen in Segmente (normalerweise Meilen oder Kilometer) auf, sodass Sie Ihr Tempo während des gesamten Rennens überwachen können. Für einen Marathon helfen Meile-für-Meile-Splits dabei, den klassischen Fehler des zu schnellen Starts zu vermeiden — wenn Ihre erste Meile 20 Sekunden schneller als das Zieltempo ist, wissen Sie, dass Sie sofort verlangsamen müssen, bevor Schaden entsteht. Splits helfen Ihnen auch, sich an Hügel, Wind oder Ermüdung anzupassen. Eliteläufer haben oft nahezu identische Splits für jede Meile, während Anfänger dazu neigen, schnell zu starten und nachzulassen (positive Splits), was erheblich Zeit kostet."
        },
        {
          "question": "Sollte ich nach Tempo oder nach Herzfrequenz trainieren?",
          "answer": "Beides hat Wert, aber Herzfrequenz ist oft zuverlässiger für leichte Läufe, während Tempo besser für Trainingseinheiten funktioniert. Herzfrequenz berücksichtigt äußere Faktoren (Hitze, Luftfeuchtigkeit, Hügel, Ermüdung), die das Tempo ignoriert — an einem 32°C-Tag könnte Ihr 'leichtes Tempo' Ihre Herzfrequenz in Zone 4 schnellen lassen. Für Tempoläufe und Intervalle ist Tempo präziser, weil Herzfrequenz der Anstrengung hinterherhinkt und von Koffein, Stress oder Schlaf beeinflusst werden kann. Der ideale Ansatz: Verwenden Sie Herzfrequenz für leichte Läufe (bleiben Sie in Zone 2), verwenden Sie Tempo für Qualitätstrainings (erreichen Sie Zielzeiten) und verwenden Sie beide, um Übertraining oder Untertraining zu erkennen."
        }
      ],
      "detailedTable": {
        "trainingZones": {
          "button": "Vorhersagen & Trainingszonen anzeigen",
          "title": "Renn-Vorhersagen & VDOT-Trainingszonen",
          "columns": {
            "zone": "Zone / Distanz",
            "paceMi": "Tempo/Meile",
            "paceKm": "Tempo/km",
            "detail": "Details"
          }
        },
        "splits": {
          "button": "Renn-Split-Zeiten anzeigen",
          "title": "Meile-für-Meile / Km-für-Km Split-Zeiten",
          "columns": {
            "segment": "Meile/Km",
            "time": "Split-Zeit",
            "elapsed": "Verstrichene Zeit",
            "pace": "Tempo"
          }
        }
      },
      "chart": {
        "title": "Tempo über Distanzen",
        "xLabel": "Distanz",
        "yLabel": "Tempo (min/Meile)",
        "series": {
          "pace": "Ihr Tempo",
          "easyPace": "Leichtes Tempo",
          "thresholdPace": "Schwellentempo"
        }
      },
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

  // ─────────────────────────────────────────────────────────────
  // INPUTS
  // ─────────────────────────────────────────────────────────────
  inputs: [
    {
      id: "calculationMode",
      type: "radio",
      defaultValue: "calculatePace",
      options: [{ value: "calculatePace" }, { value: "calculateTime" }],
    },
    {
      id: "raceDistance",
      type: "select",
      defaultValue: "5k",
      options: [
        { value: "1mile" },
        { value: "5k" },
        { value: "10k" },
        { value: "halfMarathon" },
        { value: "marathon" },
        { value: "custom" },
      ],
    },
    // Custom distance — with unit dropdown (km/mi/m)
    {
      id: "customDistance",
      type: "number",
      defaultValue: 5,
      min: 0.1,
      max: 500,
      step: 0.1,
      unitType: "race_distance",
      syncGroup: false,
      defaultUnit: "km",
      allowedUnits: ["km", "mi", "m"],
      showWhen: { field: "raceDistance", value: "custom" },
    },
    // Time inputs — visible when calculating pace
    {
      id: "timeHours",
      type: "number",
      defaultValue: 0,
      min: 0,
      max: 24,
      step: 1,
      suffix: "h",
      width: "third",
      showWhen: { field: "calculationMode", value: "calculatePace" },
    },
    {
      id: "timeMinutes",
      type: "number",
      defaultValue: 25,
      min: 0,
      max: 59,
      step: 1,
      suffix: "min",
      width: "third",
      showWhen: { field: "calculationMode", value: "calculatePace" },
    },
    {
      id: "timeSeconds",
      type: "number",
      defaultValue: 0,
      min: 0,
      max: 59,
      step: 1,
      suffix: "sec",
      width: "third",
      showWhen: { field: "calculationMode", value: "calculatePace" },
    },
    // Pace inputs — visible when calculating finish time
    {
      id: "paceMinutes",
      type: "number",
      defaultValue: 8,
      min: 2,
      max: 30,
      step: 1,
      suffix: "min",
      width: "half",
      showWhen: { field: "calculationMode", value: "calculateTime" },
    },
    {
      id: "paceSeconds",
      type: "number",
      defaultValue: 0,
      min: 0,
      max: 59,
      step: 1,
      suffix: "sec",
      width: "half",
      showWhen: { field: "calculationMode", value: "calculateTime" },
    },
    // Age — for heart rate zones
    {
      id: "age",
      type: "number",
      defaultValue: 30,
      min: 15,
      max: 80,
      step: 1,
      suffix: "years",
    },
    // Weight — optional, for calorie estimate (SENSITIVE → null + placeholder)
    {
      id: "weight",
      type: "number",
      defaultValue: null,
      placeholder: "180",
      step: 0.5,
      unitType: "weight",
      syncGroup: false,
      defaultUnit: "lbs",
      allowedUnits: ["kg", "lbs", "st"],
    },
  ],

  inputGroups: [],

  // ─────────────────────────────────────────────────────────────
  // RESULTS
  // ─────────────────────────────────────────────────────────────
  results: [
    { id: "pace", type: "primary", format: "text" },
    { id: "pacePerMile", type: "secondary", format: "text" },
    { id: "pacePerKm", type: "secondary", format: "text" },
    { id: "speed", type: "secondary", format: "text" },
    { id: "totalTime", type: "secondary", format: "text" },
    { id: "calories", type: "secondary", format: "text" },
    { id: "vdotScore", type: "secondary", format: "number" },
  ],

  // ─────────────────────────────────────────────────────────────
  // INFO CARDS (4 cards — 2 list + 2 horizontal)
  // ─────────────────────────────────────────────────────────────
  infoCards: [
    {
      id: "paceMetrics",
      type: "list",
      icon: "📊",
      itemCount: 4,
    },
    {
      id: "fitnessMetrics",
      type: "list",
      icon: "💪",
      itemCount: 4,
    },
    {
      id: "raceTips",
      type: "horizontal",
      icon: "🏁",
      itemCount: 4,
    },
    {
      id: "trainingTips",
      type: "horizontal",
      icon: "💡",
      itemCount: 4,
    },
  ],

  // ─────────────────────────────────────────────────────────────
  // REFERENCE DATA
  // ─────────────────────────────────────────────────────────────
  referenceData: [
    {
      id: "worldRecords",
      icon: "🏆",
      columns: 2,
      itemIds: ["mile", "fiveK", "tenK", "half", "full"],
    },
  ],

  // ─────────────────────────────────────────────────────────────
  // EDUCATION SECTIONS (6 sections)
  // ─────────────────────────────────────────────────────────────
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "trainingZones", type: "prose", icon: "🎯" },
    { id: "heartRateTraining", type: "prose", icon: "❤️" },
    { id: "paceImprovement", type: "list", icon: "📈", itemCount: 6 },
    { id: "commonMistakes", type: "list", icon: "⚠️", itemCount: 6 },
    { id: "raceStrategy", type: "list", icon: "🏁", itemCount: 6 },
    {
      id: "calculationExamples",
      type: "code-example",
      icon: "🧮",
      columns: 2,
      exampleCount: 2,
    },
  ],

  // ─────────────────────────────────────────────────────────────
  // FAQs (12 comprehensive FAQs for SEO)
  // ─────────────────────────────────────────────────────────────
  faqs: [
    { id: "0" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
    { id: "8" },
    { id: "9" },
    { id: "10" },
    { id: "11" },
  ],

  // ─────────────────────────────────────────────────────────────
  // REFERENCES
  // ─────────────────────────────────────────────────────────────
  references: [
    {
      authors: "Riegel, Peter S.",
      year: "1977",
      title: "Athletic Records and Human Endurance",
      source: "American Scientist, 69(3), 285–290",
      url: "https://en.wikipedia.org/wiki/Peter_Riegel",
    },
    {
      authors: "Daniels, Jack",
      year: "2014",
      title: "Daniels' Running Formula (3rd Edition)",
      source: "Human Kinetics",
      url: "https://www.coacheseducation.com/endur/jack-daniels-vdot-table.htm",
    },
    {
      authors: "Karvonen, M. J., Kentala, E., & Mustala, O.",
      year: "1957",
      title: "The effects of training on heart rate",
      source: "Annales Medicinae Experimentalis et Biologiae Fenniae, 35(3), 307-315",
      url: "https://en.wikipedia.org/wiki/Heart_rate#Karvonen_method",
    },
  ],

  // ─────────────────────────────────────────────────────────────
  // DETAILED TABLE — Training Zones modal
  // ─────────────────────────────────────────────────────────────
  detailedTable: {
    id: "trainingZones",
    buttonLabel: "View Predictions & Training Zones",
    buttonIcon: "🎯",
    modalTitle: "Race Predictions & VDOT Training Zones",
    columns: [
      { id: "zone", label: "Zone / Distance", align: "left" },
      { id: "paceMi", label: "Pace/mi", align: "center", highlight: true },
      { id: "paceKm", label: "Pace/km", align: "center" },
      { id: "detail", label: "Details", align: "left" },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHART — Pace across distances
  // ─────────────────────────────────────────────────────────────
  chart: {
    id: "paceChart",
    type: "line",
    xKey: "distance",
    height: 320,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "number",
    series: [
      { key: "racePace", type: "line", color: "#3b82f6", dashed: false },
      { key: "easyPace", type: "line", color: "#10b981", dashed: true },
      { key: "thresholdPace", type: "line", color: "#f59e0b", dashed: true },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // HERO / SIDEBAR / FEATURES / ADS
  // ─────────────────────────────────────────────────────────────
  hero: {
    badge: "Health & Fitness",
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
    "calorie-calculator",
    "bmi-calculator",
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
export function calculateRunningPace(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;

  // ── Translations ─────────────────────────────────────────────
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read inputs ──────────────────────────────────────────────
  const mode = values.calculationMode as string;
  const raceKey = values.raceDistance as string;
  const age = (values.age as number) || 30;

  // ── Determine display preference (mi vs km) ──────────────────
  // For standard distances, default to "mi" for EN locale feel
  // For custom distances, use whatever unit the user picked in dropdown
  const distUnit = fieldUnits.customDistance || "km";
  const preferMetric = distUnit === "km" || distUnit === "m";

  // ── Resolve distance in miles ────────────────────────────────
  let distMiles: number;
  if (raceKey === "custom") {
    const customDist = (values.customDistance as number) || 5;
    if (distUnit === "mi") {
      distMiles = customDist;
    } else if (distUnit === "m") {
      distMiles = customDist / 1609.344;
    } else {
      // km (default)
      distMiles = customDist * 0.621371;
    }
  } else {
    distMiles = DISTANCES[raceKey]?.miles || 3.10686;
  }

  const distKm = distMiles * 1.609344;
  const distMeters = distMiles * 1609.344;

  // ── Read time (H:M:S → total seconds) ───────────────────────
  const tH = (values.timeHours as number) || 0;
  const tM = (values.timeMinutes as number) || 0;
  const tS = (values.timeSeconds as number) || 0;
  const inputTimeSec = tH * 3600 + tM * 60 + tS;

  // ── Read pace (M:S → seconds per mile) ──────────────────────
  const pM = (values.paceMinutes as number) || 0;
  const pS = (values.paceSeconds as number) || 0;
  let inputPaceSecPerMile = pM * 60 + pS;

  // If user enters pace in metric mode, it's per km — convert to per mile
  if (preferMetric && mode === "calculateTime") {
    inputPaceSecPerMile = inputPaceSecPerMile * 1.609344;
  }

  // ── Calculate the missing value ──────────────────────────────
  let paceSecPerMile: number;
  let totalTimeSec: number;

  if (mode === "calculatePace") {
    // User provided time + distance → calculate pace
    totalTimeSec = inputTimeSec;
    if (totalTimeSec <= 0 || distMiles <= 0) {
      return {
        values: {},
        formatted: {},
        summary: "",
        isValid: false,
      };
    }
    paceSecPerMile = totalTimeSec / distMiles;
  } else {
    // User provided pace + distance → calculate time
    paceSecPerMile = inputPaceSecPerMile;
    if (paceSecPerMile <= 0 || distMiles <= 0) {
      return {
        values: {},
        formatted: {},
        summary: "",
        isValid: false,
      };
    }
    totalTimeSec = paceSecPerMile * distMiles;
  }

  // ── Derived values ───────────────────────────────────────────
  const paceSecPerKm = paceSecPerMile / 1.609344;
  const speedMph = 3600 / paceSecPerMile;
  const speedKmh = speedMph * 1.609344;

  // ── VDOT ─────────────────────────────────────────────────────
  const timeMins = totalTimeSec / 60;
  const vdot = calcVDOT(distMeters, timeMins);

  // ── Heart Rate Zones ─────────────────────────────────────────
  const hr_max = maxHR(age);
  const hrZones = [
    { zone: "Zone 1", pct: 0.55, label: "Recovery", low: Math.round(hr_max * 0.50), high: Math.round(hr_max * 0.60) },
    { zone: "Zone 2", pct: 0.65, label: "Aerobic", low: Math.round(hr_max * 0.60), high: Math.round(hr_max * 0.70) },
    { zone: "Zone 3", pct: 0.75, label: "Tempo", low: Math.round(hr_max * 0.70), high: Math.round(hr_max * 0.80) },
    { zone: "Zone 4", pct: 0.85, label: "Lactate Threshold", low: Math.round(hr_max * 0.80), high: Math.round(hr_max * 0.90) },
    { zone: "Zone 5", pct: 0.95, label: "VO2 Max", low: Math.round(hr_max * 0.90), high: hr_max },
  ];

  // ── Race Predictions (Riegel) ────────────────────────────────
  const predict = (targetMeters: number): number => {
    return totalTimeSec * Math.pow(targetMeters / distMeters, 1.06);
  };

  const predictionDistances = [
    { key: "1mile", label: "1 Mile", meters: 1609.344, miles: 1, km: 1.609 },
    { key: "5k", label: "5K", meters: 5000, miles: 3.107, km: 5 },
    { key: "10k", label: "10K", meters: 10000, miles: 6.214, km: 10 },
    { key: "halfMarathon", label: "Half Marathon", meters: 21097.5, miles: 13.109, km: 21.098 },
    { key: "marathon", label: "Marathon", meters: 42195, miles: 26.219, km: 42.195 },
  ];

  // Build prediction rows — EXCLUDE the selected distance
  const predictionRows = predictionDistances
    .filter((d) => d.key !== raceKey)
    .map((d) => {
      const predSec = predict(d.meters);
      const predPaceMi = predSec / d.miles;
      const predPaceKm = predSec / d.km;
      return {
        zone: `🏁 ${v[d.label] || d.label}`,
        paceMi: fmtPace(predPaceMi),
        paceKm: fmtPace(predPaceKm),
        detail: fmtTime(predSec),
      };
    });

  // ── Training Zones (Daniels VDOT) ───────────────────────────
  const zones = [
    { key: "Easy", pct: 0.65, effort: "Conversational" },
    { key: "Marathon", pct: 0.79, effort: "Steady" },
    { key: "Threshold", pct: 0.88, effort: "Comfortably Hard" },
    { key: "Interval", pct: 0.98, effort: "Hard (3-5 min)" },
    { key: "Repetition", pct: 1.05, effort: "Fast & Short" },
  ];

  const zoneRows = zones.map((z) => {
    const secMi = paceForZone(vdot, z.pct);
    const secKm = secMi / 1.609344;
    return {
      zone: `🎯 ${v[z.key] || z.key}`,
      paceMi: fmtPace(secMi),
      paceKm: fmtPace(secKm),
      detail: v[z.effort] || z.effort,
    };
  });

  // Combine: predictions first, separator, then training zones
  const tableData = [
    ...predictionRows,
    { zone: "", paceMi: "", paceKm: "", detail: "" },
    ...zoneRows,
  ];

  // ── Split Times (mile or km based on distance unit) ──────────
  const splitData: Array<{
    segment: string;
    time: string;
    elapsed: string;
    pace: string;
  }> = [];

  if (!preferMetric) {
    // Mile splits
    const numMiles = Math.ceil(distMiles);
    let elapsed = 0;
    for (let i = 1; i <= numMiles; i++) {
      const segmentDist = i <= distMiles ? 1 : distMiles - (i - 1);
      const segmentTime = segmentDist * paceSecPerMile;
      elapsed += segmentTime;
      splitData.push({
        segment: `Mile ${i}`,
        time: fmtTime(segmentTime),
        elapsed: fmtTime(elapsed),
        pace: fmtPace(paceSecPerMile),
      });
    }
  } else {
    // Km splits
    const numKm = Math.ceil(distKm);
    let elapsed = 0;
    for (let i = 1; i <= numKm; i++) {
      const segmentDist = i <= distKm ? 1 : distKm - (i - 1);
      const segmentTime = segmentDist * paceSecPerKm;
      elapsed += segmentTime;
      splitData.push({
        segment: `Km ${i}`,
        time: fmtTime(segmentTime),
        elapsed: fmtTime(elapsed),
        pace: fmtPace(paceSecPerKm),
      });
    }
  }

  // ── Chart Data (pace across distances) ──────────────────────
  const chartData = predictionDistances.map((d) => {
    const predSec = predict(d.meters);
    const racePaceMi = predSec / d.miles;
    const easyPaceMi = paceForZone(vdot, 0.65);
    const thresholdPaceMi = paceForZone(vdot, 0.88);
    
    return {
      distance: d.label,
      racePace: racePaceMi / 60, // convert to minutes
      easyPace: easyPaceMi / 60,
      thresholdPace: thresholdPaceMi / 60,
    };
  });

  // ── Calories ─────────────────────────────────────────────────
  const weightUnit = fieldUnits.weight || "lbs";
  const weight = values.weight as number | null;
  const weightKg = weight
    ? convertToBase(weight, weightUnit, "weight")
    : null;
  const calories = weightKg ? Math.round(weightKg * distKm * 1.036) : null;

  // ── Training Level (based on VDOT) ───────────────────────────
  let trainingLevel = "Beginner";
  if (vdot >= 60) trainingLevel = "Elite";
  else if (vdot >= 50) trainingLevel = "Advanced";
  else if (vdot >= 40) trainingLevel = "Intermediate";

  // ── Format outputs ───────────────────────────────────────────
  const pacePerMileFmt = fmtPace(paceSecPerMile);
  const pacePerKmFmt = fmtPace(paceSecPerKm);

  const primaryPace =
    !preferMetric ? pacePerMileFmt : pacePerKmFmt;
  const paceUnit = !preferMetric ? (v["min/mi"] || "min/mi") : (v["min/km"] || "min/km");
  const speedVal = !preferMetric ? speedMph : speedKmh;
  const speedUnit = !preferMetric ? (v["mph"] || "mph") : (v["km/h"] || "km/h");
  const calUnit = v["cal"] || "cal";
  const bpmUnit = v["bpm"] || "bpm";

  // ── Summary ──────────────────────────────────────────────────
  const summaryTemplate =
    f.summary ||
    "Your pace is {pace} {paceUnit}. Speed: {speed}. Estimated VDOT: {vdot}. Max HR: {maxHR} bpm.";
  const summary = summaryTemplate
    .replace("{pace}", primaryPace)
    .replace("{paceUnit}", paceUnit)
    .replace("{speed}", `${speedVal.toFixed(1)} ${speedUnit}`)
    .replace("{vdot}", vdot.toFixed(1))
    .replace("{maxHR}", hr_max.toString());

  // ── Return ───────────────────────────────────────────────────
  return {
    values: {
      pace: !preferMetric ? paceSecPerMile : paceSecPerKm,
      pacePerMile: paceSecPerMile,
      pacePerKm: paceSecPerKm,
      speed: speedVal,
      totalTime: totalTimeSec,
      calories: calories || 0,
      vdotScore: Math.round(vdot * 10) / 10,
      maxHR: hr_max,
      trainingLevel: trainingLevel,
    },
    formatted: {
      pace: `${primaryPace} ${paceUnit}`,
      pacePerMile: `${pacePerMileFmt} ${v["min/mi"] || "min/mi"}`,
      pacePerKm: `${pacePerKmFmt} ${v["min/km"] || "min/km"}`,
      speed: `${speedVal.toFixed(1)} ${speedUnit}`,
      totalTime: fmtTime(totalTimeSec),
      calories: calories ? `${calories.toLocaleString()} ${calUnit}` : "—",
      vdotScore: vdot.toFixed(1),
      maxHR: `${hr_max} ${bpmUnit}`,
      trainingLevel: trainingLevel,
    },
    summary,
    isValid: true,
    metadata: {
      tableData,
      splitData,
      chartData,
      hrZones,
    },
  };
}

export default runningPaceConfig;
