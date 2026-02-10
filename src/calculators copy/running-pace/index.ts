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
    },],

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
        },
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
  },

  // ─────────────────────────────────────────────────────────────
  // INPUTS
  // ─────────────────────────────────────────────────────────────
  inputs: [// Custom distance — with unit dropdown (km/mi/m)// Time inputs — visible when calculating pace// Pace inputs — visible when calculating finish time// Age — for heart rate zones// Weight — optional, for calorie estimate (SENSITIVE → null + placeholder)],

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
