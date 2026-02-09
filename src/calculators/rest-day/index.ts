import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ═══════════════════════════════════════════════════════════════════
// REST DAY CALCULATOR V4 — IMPROVED WITH HEART RATE & ADVANCED METRICS
// Now includes: HRV/RHR, Hydration, Hours Since Workout, Health Status
// ═══════════════════════════════════════════════════════════════════

export const restDayCalculatorConfig: CalculatorConfigV4 = {
  id: "rest-day",
  version: "4.0",
  category: "health",
  icon: "🛋️",

  presets: [
    {
      id: "beginner",
      icon: "🌱",
      values: {
        mode: "advanced",
        workoutType: "strength",
        intensity: "light",
        duration: 30,
        muscleGroup: "upper",
        eccentricFocus: "no",
        trainingGoal: "general",
        hoursSinceWorkout: 24,
        consecutiveDays: 1,
        weeksWithoutDeload: 2,
        sleepHours: "7to8",
        sleepQuality: "good",
        soreness: "mild",
        stressLevel: "low",
        hydration: "adequate",
        nutritionStatus: "maintenance",
        healthStatus: "healthy",
        restingHeartRate: null,
        normalRestingHR: null,
        age: 25,
        experience: "beginner",
      },
    },
    {
      id: "weekendWarrior",
      icon: "🏃",
      values: {
        mode: "advanced",
        workoutType: "hiit",
        intensity: "moderate",
        duration: 45,
        muscleGroup: "fullBody",
        eccentricFocus: "no",
        trainingGoal: "general",
        hoursSinceWorkout: 18,
        consecutiveDays: 2,
        weeksWithoutDeload: 4,
        sleepHours: "6to7",
        sleepQuality: "fair",
        soreness: "moderate",
        stressLevel: "moderate",
        hydration: "adequate",
        nutritionStatus: "deficit",
        healthStatus: "healthy",
        restingHeartRate: null,
        normalRestingHR: null,
        age: 35,
        experience: "intermediate",
      },
    },
    {
      id: "seriousLifter",
      icon: "🏋️",
      values: {
        mode: "advanced",
        workoutType: "strength",
        intensity: "hard",
        duration: 75,
        muscleGroup: "lower",
        eccentricFocus: "yes",
        trainingGoal: "strength",
        hoursSinceWorkout: 36,
        consecutiveDays: 4,
        weeksWithoutDeload: 6,
        sleepHours: "7to8",
        sleepQuality: "good",
        soreness: "moderate",
        stressLevel: "low",
        hydration: "optimal",
        nutritionStatus: "surplus",
        healthStatus: "healthy",
        restingHeartRate: 58,
        normalRestingHR: 55,
        age: 28,
        experience: "advanced",
      },
    },
    {
      id: "competitionPrep",
      icon: "🏆",
      values: {
        mode: "advanced",
        workoutType: "mixed",
        intensity: "max",
        duration: 90,
        muscleGroup: "fullBody",
        eccentricFocus: "yes",
        trainingGoal: "power",
        hoursSinceWorkout: 20,
        consecutiveDays: 5,
        weeksWithoutDeload: 8,
        sleepHours: "6to7",
        sleepQuality: "fair",
        soreness: "severe",
        stressLevel: "high",
        hydration: "poor",
        nutritionStatus: "surplus",
        healthStatus: "healthy",
        restingHeartRate: 62,
        normalRestingHR: 52,
        age: 26,
        experience: "elite",
      },
    },
  ],

  t: {
    en: {
      name: "Rest Day Calculator",
      slug: "rest-day-calculator",
      subtitle: "Advanced recovery calculator with heart rate monitoring, hydration tracking, and personalized readiness scores",
      breadcrumb: "Rest Day",

      seo: {
        title: "Rest Day Calculator — Heart Rate, HRV & Recovery Planner",
        description: "Calculate training readiness with heart rate monitoring, hydration tracking, and sleep analysis. Get personalized recovery time, overtraining risk assessment, and active recovery plans.",
        shortDescription: "Should you train today? Get your readiness score with HRV and heart rate data",
        keywords: [
          "rest day calculator",
          "HRV calculator",
          "heart rate variability recovery",
          "resting heart rate overtraining",
          "recovery heart rate",
          "workout recovery calculator",
          "training readiness score",
          "overtraining risk calculator",
        ],
      },

      calculator: { yourInformation: "Your Training & Recovery Data" },
      ui: {
        yourInformation: "Your Training & Recovery Data",
        calculate: "Check Readiness",
        reset: "Reset",
        results: "Your Recovery Analysis",
      },

      inputs: {
        mode: {
          label: "Calculator Mode",
          helpText: "Simple mode asks 6 questions. Advanced mode includes heart rate, hydration, nutrition, and 17 total factors.",
          options: { simple: "⚡ Simple (Quick Check)", advanced: "🔬 Advanced (Full Analysis)" },
        },
        workoutType: {
          label: "Last Workout Type",
          helpText: "What kind of training did you do?",
          options: {
            strength: "Strength Training",
            cardio: "Cardio / Endurance",
            hiit: "HIIT / CrossFit",
            sport: "Sport / Recreation",
            mixed: "Mixed / Circuit",
          },
        },
        intensity: {
          label: "Workout Intensity (RPE)",
          helpText: "Rate of Perceived Exertion — how hard did it feel?",
          options: {
            light: "Light (RPE 1-3) — Could talk easily",
            moderate: "Moderate (RPE 4-6) — Challenging but manageable",
            hard: "Hard (RPE 7-8) — Near failure on some sets",
            max: "Max Effort (RPE 9-10) — Everything I had",
          },
        },
        duration: {
          label: "Workout Duration",
          helpText: "Total workout time in minutes",
        },
        muscleGroup: {
          label: "Muscle Groups Worked",
          helpText: "Which area did you focus on?",
          options: {
            upper: "Upper Body (chest, back, arms, shoulders)",
            lower: "Lower Body (quads, hamstrings, glutes, calves)",
            fullBody: "Full Body (compound movements)",
            core: "Core / Isolation Only",
          },
        },
        eccentricFocus: {
          label: "Heavy Eccentric Work?",
          helpText: "Slow negatives, Romanian deadlifts, or eccentric-focused exercises cause more muscle damage",
          options: { no: "No", yes: "Yes" },
        },
        trainingGoal: {
          label: "Primary Training Goal",
          helpText: "Different goals require different recovery strategies",
          options: {
            strength: "Max Strength (heavy, low reps)",
            hypertrophy: "Muscle Size (8-12 reps)",
            endurance: "Endurance (cardio, long duration)",
            power: "Power (explosive, plyometrics)",
            general: "General Fitness",
          },
        },
        hoursSinceWorkout: {
          label: "Hours Since Last Workout",
          helpText: "More precise than days — helps if you train twice daily",
        },
        consecutiveDays: {
          label: "Consecutive Training Days",
          helpText: "How many days in a row have you trained?",
        },
        weeksWithoutDeload: {
          label: "Weeks Without Deload",
          helpText: "How many weeks since your last rest/deload week?",
        },
        sleepHours: {
          label: "Sleep Last Night",
          helpText: "Total hours of sleep",
          options: {
            under5: "Under 5 hours",
            "5to6": "5-6 hours",
            "6to7": "6-7 hours",
            "7to8": "7-8 hours",
            "8to9": "8-9 hours",
            "9plus": "9+ hours",
          },
        },
        sleepQuality: {
          label: "Sleep Quality",
          helpText: "How restful was your sleep?",
          options: {
            poor: "Poor — Woke up multiple times",
            fair: "Fair — Some interruptions",
            good: "Good — Mostly solid",
            excellent: "Excellent — Deep, uninterrupted",
          },
        },
        soreness: {
          label: "Current Soreness",
          helpText: "How sore are your muscles right now?",
          options: {
            none: "None — Feeling fresh",
            mild: "Mild — Slight tightness",
            moderate: "Moderate — Noticeable when moving",
            severe: "Severe — Hurts to move normally",
          },
        },
        stressLevel: {
          label: "Life Stress Level",
          helpText: "Work, relationships, finances — everything adds up",
          options: {
            low: "Low — Things are calm",
            moderate: "Moderate — Some pressure",
            high: "High — Stressed out",
            veryHigh: "Very High — Overwhelmed",
          },
        },
        hydration: {
          label: "Hydration Status",
          helpText: "Check your urine color — dark yellow = poor, pale = good, clear = optimal",
          options: {
            poor: "Poor — Dark urine, thirsty",
            adequate: "Adequate — Light yellow",
            optimal: "Optimal — Clear/pale urine",
          },
        },
        nutritionStatus: {
          label: "Current Nutrition",
          helpText: "Your caloric balance affects recovery speed",
          options: {
            deficit: "Calorie Deficit (cutting)",
            maintenance: "Maintenance Calories",
            surplus: "Calorie Surplus (bulking)",
          },
        },
        healthStatus: {
          label: "Health Status",
          helpText: "Do NOT train if you have fever, acute pain, or infection",
          options: {
            healthy: "Healthy — No issues",
            mild: "Mild — Minor cold, allergies",
            sick: "Sick — Fever, flu, infection",
            injured: "Injured — Acute pain, sprain",
          },
        },
        restingHeartRate: {
          label: "Resting Heart Rate (Optional)",
          helpText: "Your heart rate this morning before getting out of bed. Leave empty if you don't track this.",
        },
        normalRestingHR: {
          label: "Normal Resting HR (Optional)",
          helpText: "Your typical resting heart rate when well-rested. Only needed if you entered RHR above.",
        },
        age: {
          label: "Age",
          helpText: "Recovery slows with age — this adjusts your estimate",
        },
        experience: {
          label: "Training Experience",
          helpText: "How long have you been consistently training?",
          options: {
            beginner: "Beginner (under 1 year)",
            intermediate: "Intermediate (1-3 years)",
            advanced: "Advanced (3-5 years)",
            elite: "Elite (5+ years)",
          },
        },
      },

      results: {
        readinessScore: { label: "Readiness Score" },
        restType: { label: "Today's Recommendation" },
        recoveryHours: { label: "Recovery Time Needed" },
        timeRemaining: { label: "Recovery Time Remaining" },
        overtrainingRisk: { label: "Overtraining Risk" },
        weeklyRestDays: { label: "Weekly Rest Days Needed" },
        deloadStatus: { label: "Deload Status" },
        heartRateStatus: { label: "Heart Rate Status" },
        activeRecovery: { label: "Active Recovery Plan" },
      },

      presets: {
        beginner: {
          label: "Beginner",
          description: "New to training, light workout, good sleep, no heart rate data",
        },
        weekendWarrior: {
          label: "Weekend Warrior",
          description: "Moderate HIIT, busy lifestyle, cutting weight, average recovery",
        },
        seriousLifter: {
          label: "Serious Lifter",
          description: "Heavy leg day with eccentrics, tracking HRV, well-recovered",
        },
        competitionPrep: {
          label: "Competition Prep",
          description: "Max intensity, high volume, accumulated fatigue, elevated RHR",
        },
      },

      tooltips: {
        readinessScore: "0-100 score based on workout load, sleep, stress, heart rate, and recovery time. Higher = more ready to train.",
        restType: "Personalized recommendation for today based on all your inputs.",
        recoveryHours: "Total estimated hours your body needs to fully recover from the last workout.",
        timeRemaining: "Hours remaining until you're fully recovered, based on time since workout.",
        overtrainingRisk: "Risk level based on training frequency, intensity, accumulated fatigue, and heart rate elevation.",
        weeklyRestDays: "How many rest or active recovery days you should take per week.",
        deloadStatus: "Whether you need a deload week and when to schedule it.",
        heartRateStatus: "Resting heart rate compared to your normal baseline. Elevation indicates incomplete recovery.",
        activeRecovery: "Suggested activities based on your current recovery state.",
      },

      values: {
        "Full Rest": "Full Rest",
        "Active Recovery": "Active Recovery",
        "Light Training": "Light Training",
        "Normal Training": "Normal Training",
        "Low": "Low",
        "Moderate": "Moderate",
        "High": "High",
        "Critical": "Critical",
        "hours": "hours",
        "hour": "hour",
        "days": "days",
        "day": "day",
        "weeks": "weeks",
        "week": "week",
        "h": "h",
        "Deload now!": "Deload now!",
        "In": "In",
        "✅ Optimal": "✅ Optimal",
        "✅ Good": "✅ Good",
        "⚠️ Moderate": "⚠️ Moderate",
        "⚠️ High": "⚠️ High",
        "🔴 Critical": "🔴 Critical",
        "Complete rest — sleep, hydrate, eat well": "Complete rest — sleep, hydrate, eat well",
        "Light walk 20-30 min, gentle stretching, foam rolling": "Light walk 20-30 min, gentle stretching, foam rolling",
        "Yoga, mobility work, technique drills at 50% effort": "Yoga, mobility work, technique drills at 50% effort",
        "Fully recovered — warm up well and train hard": "Fully recovered — warm up well and train hard",
        "🟢 Normal": "🟢 Normal",
        "⚠️ Elevated": "⚠️ Elevated",
        "🔴 High Elevation": "🔴 High Elevation",
        "N/A — Not tracking": "N/A — Not tracking",
        "🚨 DO NOT TRAIN": "🚨 DO NOT TRAIN",
        "Factor": "Factor",
        "Your Status": "Your Status",
        "Impact": "Impact",
        "Rating": "Rating",
        "TOTAL": "TOTAL",
        "Workout Load": "Workout Load",
        "Muscle Group": "Muscle Group",
        "Eccentric Stress": "Eccentric Stress",
        "Training Goal": "Training Goal",
        "Time Passed": "Time Passed",
        "Sleep": "Sleep",
        "Stress & Soreness": "Stress & Soreness",
        "Hydration": "Hydration",
        "Nutrition": "Nutrition",
        "Health Status": "Health Status",
        "Heart Rate": "Heart Rate",
        "Age & Experience": "Age & Experience",
        "Cumulative Fatigue": "Cumulative Fatigue",
        "None": "None",
      },

      formats: {
        summary: "Your readiness score is {readinessScore}/100 ({restType}). You need {recoveryHours} total recovery, with {timeRemaining} remaining. Overtraining risk: {overtrainingRisk}.",
      },

      infoCards: {
        recoveryOverview: {
          title: "Recovery Overview",
          items: {
            "0": "Readiness Score",
            "1": "Recommendation",
            "2": "Time Remaining",
            "3": "Heart Rate Status",
            "4": "Active Recovery",
          },
        },
        trainingStatus: {
          title: "Training Status",
          items: {
            "0": "Overtraining Risk",
            "1": "Weekly Rest Days",
            "2": "Deload Status",
          },
        },
        tips: {
          title: "Recovery Optimization",
          items: [
            "Track your resting heart rate every morning — a 5+ BPM elevation means you need more recovery",
            "Sleep is the #1 recovery tool — prioritize 7-9 hours of quality sleep every night",
            "Hydration matters — dehydration slows recovery by up to 25% and impairs performance",
            "Alternate hard and easy days — never stack 3+ max-effort sessions back-to-back without recovery",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is Training Recovery?",
          content: "Training recovery is the biological process of repairing muscle tissue, replenishing glycogen stores, and restoring nervous system function after exercise. When you train, you create controlled damage to muscle fibers through mechanical tension and metabolic stress. Your body then rebuilds these fibers stronger during rest periods — a process called supercompensation. Without adequate recovery, this process is interrupted, leading to stalled progress, accumulated fatigue, and increased injury risk. Recovery is not simply the absence of training; it is an active physiological process influenced by sleep quality, nutrition, stress levels, hydration, heart rate variability, and the specific demands of your workout. Elite athletes monitor resting heart rate (RHR) and heart rate variability (HRV) daily to objectively track recovery status. Understanding your recovery needs is what separates smart training from overtraining.",
        },
        howItWorks: {
          title: "How This Calculator Works",
          content: "This advanced calculator evaluates your training readiness by analyzing three categories of factors. First, it assesses your workout demands — the type, intensity, duration, muscle groups involved, eccentric work, and training goal. Second, it evaluates your recovery capacity — sleep quality and duration, stress levels, muscle soreness, hydration, nutritional status, age, and training experience. Third, it incorporates objective biomarkers — your resting heart rate compared to baseline, hours since your last workout, and current health status. These factors are combined into a Readiness Score from 0 to 100, where higher scores indicate greater readiness to train. The calculator also estimates total recovery time needed, calculates time remaining based on hours since workout, assesses overtraining risk based on cumulative fatigue and heart rate elevation, recommends weekly rest days, evaluates deload timing, and provides specific active recovery suggestions tailored to your current state. If you have fever, acute pain, or infection, the calculator will override all other factors and recommend complete rest.",
        },
        heartRate: {
          title: "Heart Rate & Recovery",
          items: [
            { text: "Resting heart rate (RHR) is measured first thing in the morning before getting out of bed — it's the most reliable recovery marker", type: "info" },
            { text: "A resting heart rate 5+ BPM above your normal baseline indicates incomplete recovery and elevated stress on your body", type: "warning" },
            { text: "Heart rate variability (HRV) measures the variation between heartbeats — higher HRV generally indicates better recovery", type: "info" },
            { text: "Track RHR consistently for 2-4 weeks to establish your personal baseline, as individual baselines vary from 40-80 BPM", type: "info" },
            { text: "Factors that elevate RHR: poor sleep, illness, dehydration, overtraining, alcohol, stress, and incomplete recovery", type: "warning" },
            { text: "If your RHR is elevated 10+ BPM above baseline and stays elevated for multiple days, take a complete rest day immediately", type: "warning" },
          ],
        },
        hydrationRecovery: {
          title: "Hydration & Recovery",
          items: [
            { text: "Even 2% dehydration can slow muscle recovery by up to 25% and impair strength performance significantly", type: "warning" },
            { text: "Check urine color daily — dark yellow indicates dehydration, pale yellow is optimal, clear means well-hydrated", type: "info" },
            { text: "Drink 0.5-1 oz of water per pound of bodyweight daily, plus extra for sweat loss during training", type: "info" },
            { text: "Electrolytes matter — sodium, potassium, and magnesium are lost through sweat and need replenishment", type: "info" },
            { text: "Caffeine and alcohol are diuretics that increase fluid loss — compensate with extra water intake", type: "info" },
          ],
        },
        examples: {
          title: "Example Calculations",
          description: "How different scenarios affect recovery with heart rate data",
          examples: [
            {
              title: "Example 1: Normal Recovery",
              steps: [
                "Workout: Moderate strength, 60 min, 24h ago",
                "Sleep: 8 hours, good quality",
                "RHR: 58 BPM (normal baseline: 56)",
                "Hydration: Optimal",
                "Health: No issues",
              ],
              result: "Readiness: 88/100 → Normal Training | Recovery: 36h total, 12h remaining",
            },
            {
              title: "Example 2: Elevated Heart Rate Warning",
              steps: [
                "Workout: Max effort legs, 90 min, 20h ago",
                "Sleep: 6 hours, fair quality",
                "RHR: 68 BPM (normal baseline: 52) ← +16 BPM!",
                "Severe soreness, high stress",
                "5 consecutive days training",
              ],
              result: "Readiness: 32/100 → Active Recovery Only | Recovery: 96h total, 76h remaining | Heart Rate: 🔴 High Elevation",
            },
          ],
        },
      },

      faqs: [
        {
          question: "Why is resting heart rate important for recovery?",
          answer: "Resting heart rate (RHR) is one of the most reliable objective indicators of recovery status. When your body is still recovering from training stress, illness, or inadequate sleep, your nervous system remains in a heightened state, causing your heart to beat faster even at rest. A resting heart rate 5+ BPM above your normal baseline is a clear signal that your body needs more recovery time. Elite athletes track RHR every morning and adjust their training based on these readings. Research shows that training with an elevated RHR significantly increases injury risk and reduces workout quality.",
        },
        {
          question: "How do I measure my resting heart rate correctly?",
          answer: "Measure your resting heart rate first thing in the morning, before getting out of bed, at the same time each day. Place two fingers on your wrist or neck, count beats for 60 seconds (or 30 seconds and multiply by 2). Alternatively, use a fitness tracker or smartwatch that measures RHR automatically during sleep. Track your RHR for 2-4 weeks to establish your personal baseline. Your baseline is the average RHR when you feel well-rested and healthy. Individual baselines vary widely — a well-trained endurance athlete might have an RHR of 40-50 BPM, while an untrained person might be 70-80 BPM.",
        },
        {
          question: "What should I do if my heart rate is elevated?",
          answer: "If your resting heart rate is 5-9 BPM above baseline, reduce training intensity and volume by 30-50% — do an easy active recovery session or take a complete rest day. If your RHR is 10+ BPM above baseline, take a full rest day and focus on sleep, hydration, and stress management. If elevation persists for 3+ consecutive days, consider taking 2-3 rest days or scheduling a deload week. Common causes of elevated RHR include inadequate sleep, overtraining, dehydration, illness, high life stress, alcohol consumption, and poor nutrition. Address these factors first before resuming hard training.",
        },
        {
          question: "How does dehydration affect recovery?",
          answer: "Dehydration has a profound negative impact on recovery. Even 2% dehydration (losing 3 lbs of water for a 150 lb person) can reduce muscle protein synthesis by up to 25%, impair muscle glycogen replenishment, and slow the removal of metabolic waste products from damaged muscle tissue. Dehydration also reduces blood volume, forcing your heart to work harder, which elevates resting heart rate. It impairs thermoregulation, increases perceived exertion, and reduces strength and power output by 10-20%. Check your urine color daily — dark yellow indicates dehydration. Aim for pale yellow urine and drink at least 0.5 oz of water per pound of bodyweight daily.",
        },
        {
          question: "Should I train if I'm sick or have a fever?",
          answer: "No. Never train with a fever, infection, or acute illness. This calculator will always recommend complete rest if you indicate you are sick or injured, regardless of other factors. Training while sick suppresses immune function further, prolongs illness, and can lead to serious complications like myocarditis (heart inflammation). The 'neck rule' is a general guideline: symptoms above the neck (runny nose, mild sore throat) might allow light exercise, but symptoms below the neck (chest congestion, body aches, fever) require complete rest. When in doubt, rest. Missing a few days of training to fully recover is far better than training sick and being sidelined for weeks.",
        },
        {
          question: "How many rest days do I need per week?",
          answer: "The number of rest days depends on training intensity, volume, experience level, age, and recovery capacity. Beginners need 3-4 rest days per week while their bodies adapt to training stress. Intermediate lifters typically need 2-3 rest days. Advanced athletes can train 5-6 days per week but must alternate hard and easy sessions strategically. Elite athletes often train 6 days per week but incorporate active recovery, mobility work, and deload weeks. Key principle: match your rest to your actual recovery capacity, not a fixed schedule. Monitor resting heart rate, sleep quality, soreness levels, and performance metrics to determine if you're getting adequate recovery.",
        },
        {
          question: "What is a deload week and when should I take one?",
          answer: "A deload week is a planned reduction in training volume (typically 40-60% less) while maintaining or slightly reducing intensity. Deload weeks prevent cumulative fatigue buildup, allow full recovery, and re-sensitize muscles to training stimulus. Most people benefit from a deload every 4-8 weeks depending on training intensity and experience level. Beginners should deload every 3-4 weeks, intermediates every 4-6 weeks, advanced lifters every 6-8 weeks, and elite athletes may deload every 8-12 weeks. Signs you need an immediate deload: persistent elevated resting heart rate, stalled or declining performance, persistent muscle soreness, poor sleep quality, increased irritability, and loss of motivation. A properly timed deload week often leads to new personal records the following week.",
        },
        {
          question: "Can I use this calculator if I don't track heart rate?",
          answer: "Yes, absolutely. The resting heart rate fields are optional. If you don't enter heart rate data, the calculator will still provide accurate readiness scores and recovery recommendations based on workout load, sleep, stress, soreness, hydration, nutrition, and time since workout. However, adding heart rate data significantly improves accuracy because it provides an objective biomarker of recovery status. If you train seriously and want to optimize performance while avoiding overtraining, consider investing in a basic heart rate monitor or fitness tracker that measures resting heart rate. Many smartwatches and fitness trackers now measure RHR automatically during sleep, making it effortless to track this valuable metric.",
        },
      ],

      detailedTable: {
        title: "Recovery Factor Breakdown",
        buttonLabel: "View Detailed Breakdown",
        columns: ["Factor", "Your Status", "Impact", "Rating"],
      },

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
        calculate: "Check Readiness",
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
        mobileResults: "Recovery analysis",
        closeModal: "Close",
        openMenu: "Menu",
      },
      sources: { title: "Sources & References" },
    },
  },

  inputs: [
    {
      id: "mode",
      type: "radio",
      defaultValue: "simple",
      options: [{ value: "simple" }, { value: "advanced" }],
    },
    {
      id: "workoutType",
      type: "select",
      defaultValue: "strength",
      options: [
        { value: "strength" },
        { value: "cardio" },
        { value: "hiit" },
        { value: "sport" },
        { value: "mixed" },
      ],
    },
    {
      id: "intensity",
      type: "select",
      defaultValue: "moderate",
      options: [
        { value: "light" },
        { value: "moderate" },
        { value: "hard" },
        { value: "max" },
      ],
    },
    {
      id: "duration",
      type: "number",
      defaultValue: 45,
      min: 10,
      max: 240,
      suffix: "min",
    },
    {
      id: "muscleGroup",
      type: "select",
      defaultValue: "fullBody",
      showWhen: { field: "mode", value: "advanced" },
      options: [
        { value: "upper" },
        { value: "lower" },
        { value: "fullBody" },
        { value: "core" },
      ],
    },
    {
      id: "eccentricFocus",
      type: "radio",
      defaultValue: "no",
      showWhen: { field: "mode", value: "advanced" },
      options: [{ value: "no" }, { value: "yes" }],
    },
    {
      id: "trainingGoal",
      type: "select",
      defaultValue: "general",
      showWhen: { field: "mode", value: "advanced" },
      options: [
        { value: "strength" },
        { value: "hypertrophy" },
        { value: "endurance" },
        { value: "power" },
        { value: "general" },
      ],
    },
    {
      id: "hoursSinceWorkout",
      type: "number",
      defaultValue: 24,
      min: 0,
      max: 336,
      showWhen: { field: "mode", value: "advanced" },
      suffix: "hours",
    },
    {
      id: "consecutiveDays",
      type: "number",
      defaultValue: 1,
      min: 0,
      max: 14,
      showWhen: { field: "mode", value: "advanced" },
      suffix: "days",
    },
    {
      id: "weeksWithoutDeload",
      type: "number",
      defaultValue: 3,
      min: 0,
      max: 20,
      showWhen: { field: "mode", value: "advanced" },
      suffix: "weeks",
    },
    {
      id: "sleepHours",
      type: "select",
      defaultValue: "7to8",
      options: [
        { value: "under5" },
        { value: "5to6" },
        { value: "6to7" },
        { value: "7to8" },
        { value: "8to9" },
        { value: "9plus" },
      ],
    },
    {
      id: "sleepQuality",
      type: "select",
      defaultValue: "good",
      showWhen: { field: "mode", value: "advanced" },
      options: [
        { value: "poor" },
        { value: "fair" },
        { value: "good" },
        { value: "excellent" },
      ],
    },
    {
      id: "soreness",
      type: "select",
      defaultValue: "mild",
      options: [
        { value: "none" },
        { value: "mild" },
        { value: "moderate" },
        { value: "severe" },
      ],
    },
    {
      id: "stressLevel",
      type: "select",
      defaultValue: "moderate",
      showWhen: { field: "mode", value: "advanced" },
      options: [
        { value: "low" },
        { value: "moderate" },
        { value: "high" },
        { value: "veryHigh" },
      ],
    },
    {
      id: "hydration",
      type: "select",
      defaultValue: "adequate",
      showWhen: { field: "mode", value: "advanced" },
      options: [
        { value: "poor" },
        { value: "adequate" },
        { value: "optimal" },
      ],
    },
    {
      id: "nutritionStatus",
      type: "select",
      defaultValue: "maintenance",
      showWhen: { field: "mode", value: "advanced" },
      options: [
        { value: "deficit" },
        { value: "maintenance" },
        { value: "surplus" },
      ],
    },
    {
      id: "healthStatus",
      type: "select",
      defaultValue: "healthy",
      showWhen: { field: "mode", value: "advanced" },
      options: [
        { value: "healthy" },
        { value: "mild" },
        { value: "sick" },
        { value: "injured" },
      ],
    },
    {
      id: "restingHeartRate",
      type: "number",
      defaultValue: null,
      placeholder: "60",
      min: 35,
      max: 120,
      showWhen: { field: "mode", value: "advanced" },
      suffix: "bpm",
    },
    {
      id: "normalRestingHR",
      type: "number",
      defaultValue: null,
      placeholder: "58",
      min: 35,
      max: 120,
      showWhen: { field: "mode", value: "advanced" },
      suffix: "bpm",
    },
    {
      id: "age",
      type: "number",
      defaultValue: 30,
      min: 14,
      max: 80,
      suffix: "years",
    },
    {
      id: "experience",
      type: "select",
      defaultValue: "intermediate",
      showWhen: { field: "mode", value: "advanced" },
      options: [
        { value: "beginner" },
        { value: "intermediate" },
        { value: "advanced" },
        { value: "elite" },
      ],
    },
  ],

  inputGroups: [],

  results: [
    { id: "readinessScore", type: "primary", format: "number" },
    { id: "restType", type: "secondary", format: "text" },
    { id: "recoveryHours", type: "secondary", format: "text" },
    { id: "timeRemaining", type: "secondary", format: "text" },
    { id: "overtrainingRisk", type: "secondary", format: "text" },
    { id: "weeklyRestDays", type: "secondary", format: "text" },
    { id: "deloadStatus", type: "secondary", format: "text" },
    { id: "heartRateStatus", type: "secondary", format: "text" },
    { id: "activeRecovery", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "recoveryOverview", type: "list", icon: "📊", itemCount: 5 },
    { id: "trainingStatus", type: "list", icon: "⚠️", itemCount: 3 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "heartRate", type: "list", icon: "❤️", itemCount: 6 },
    { id: "hydrationRecovery", type: "list", icon: "💧", itemCount: 5 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

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

  references: [
    {
      authors: "American College of Sports Medicine",
      year: "2021",
      title: "ACSM's Guidelines for Exercise Testing and Prescription",
      source: "ACSM",
      url: "https://www.acsm.org/education-resources/books/guidelines-exercise-testing-prescription",
    },
    {
      authors: "Cole CR, et al.",
      year: "1999",
      title: "Heart-rate recovery immediately after exercise as a predictor of mortality",
      source: "New England Journal of Medicine",
      url: "https://www.nejm.org/doi/full/10.1056/NEJM199910283411804",
    },
  ],

  detailedTable: {
    id: "recoveryBreakdown",
    buttonLabel: "View Detailed Breakdown",
    buttonIcon: "📊",
    modalTitle: "Recovery Factor Breakdown",
    columns: [
      { id: "factor", label: "Factor", align: "left" },
      { id: "status", label: "Your Status", align: "left" },
      { id: "impact", label: "Impact", align: "center" },
      { id: "rating", label: "Rating", align: "center", highlight: true },
    ],
  },

  hero: {
    title: "Advanced Rest Day Calculator",
    description: "Calculate optimal recovery time with heart rate monitoring, hydration tracking, and personalized readiness scores",
  },

  sidebar: {
    title: "How to Use",
    steps: [
      "Enter your last workout details",
      "Add sleep, stress, and hydration data",
      "Optional: Add resting heart rate for accuracy",
      "Get your readiness score and recovery plan",
    ],
  },

  features: {
    title: "Advanced Features",
    items: [
      "Heart rate variability monitoring",
      "Hydration status tracking",
      "Precise hour-based recovery timing",
      "Health status safety override",
      "Training goal optimization",
    ],
  },

  relatedCalculators: ["one-rep-max", "heart-rate-zones", "calorie"],

  ads: {
    enabled: true,
    slots: ["top", "sidebar", "bottom"],
  },
};

// ═══════════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════════

export function calculateRestDay(data: {
  values: Record<string, unknown>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // Extract inputs
  const mode = (values.mode as string) || "simple";
  const isSimple = mode === "simple";

  const workoutType = values.workoutType as string;
  const intensity = values.intensity as string;
  const duration = values.duration as number;
  const muscleGroup = isSimple ? "fullBody" : (values.muscleGroup as string);
  const eccentricFocus = isSimple ? "no" : (values.eccentricFocus as string);
  const trainingGoal = isSimple ? "general" : (values.trainingGoal as string);
  const hoursSinceWorkout = isSimple ? 24 : (values.hoursSinceWorkout as number);
  const consecutiveDays = isSimple ? 1 : (values.consecutiveDays as number);
  const weeksWithoutDeload = isSimple ? 3 : (values.weeksWithoutDeload as number);
  const sleepHours = values.sleepHours as string;
  const sleepQuality = isSimple ? "good" : (values.sleepQuality as string);
  const soreness = values.soreness as string;
  const stressLevel = isSimple ? "moderate" : (values.stressLevel as string);
  const hydration = isSimple ? "adequate" : (values.hydration as string);
  const nutritionStatus = isSimple ? "maintenance" : (values.nutritionStatus as string);
  const healthStatus = isSimple ? "healthy" : (values.healthStatus as string);
  const restingHeartRate = isSimple ? null : (values.restingHeartRate as number | null);
  const normalRestingHR = isSimple ? null : (values.normalRestingHR as number | null);
  const age = values.age as number;
  const experience = isSimple ? "intermediate" : (values.experience as string);

  // ═══════════════════════════════════════════════════════════════════
  // SAFETY OVERRIDE — Illness/Injury
  // ═══════════════════════════════════════════════════════════════════
  if (healthStatus === "sick" || healthStatus === "injured") {
    const restTypeRaw = "🚨 DO NOT TRAIN";
    const restType = v[restTypeRaw] || restTypeRaw;
    const overtrainingRaw = "Critical";
    const overtrainingRisk = v[overtrainingRaw] || overtrainingRaw;

    return {
      values: {
        readinessScore: 0,
        restType: restTypeRaw,
        recoveryHours: 999,
        timeRemaining: 999,
        overtrainingRisk: overtrainingRaw,
        weeklyRestDays: "7 days",
        deloadStatus: "🔴 Rest until healthy",
        heartRateStatus: "N/A",
        activeRecovery: "Complete rest — see a doctor if symptoms persist",
      },
      formatted: {
        readinessScore: "0 / 100",
        restType,
        recoveryHours: "∞ (until healthy)",
        timeRemaining: "∞",
        overtrainingRisk,
        weeklyRestDays: "7 days",
        deloadStatus: "🔴 Rest until healthy",
        heartRateStatus: "N/A",
        activeRecovery: "Complete rest — see a doctor if symptoms persist",
      },
      summary: "⚠️ You should NOT train while sick or injured. Your body needs to heal first. Rest, hydrate, eat well, and seek medical care if symptoms worsen.",
      isValid: true,
    };
  }

  // ═══════════════════════════════════════════════════════════════════
  // BASE RECOVERY CALCULATION
  // ═══════════════════════════════════════════════════════════════════
  let baseRecovery = 24;

  // Workout type
  const workoutTypeMods: Record<string, number> = {
    strength: 12,
    cardio: -4,
    hiit: 8,
    sport: 4,
    mixed: 8,
  };
  const typeAdj = workoutTypeMods[workoutType] || 0;

  // Intensity
  const intensityMods: Record<string, number> = {
    light: -8,
    moderate: 0,
    hard: 12,
    max: 24,
  };
  const intensityAdj = intensityMods[intensity] || 0;

  // Duration
  let durationAdj = 0;
  if (duration <= 30) durationAdj = -4;
  else if (duration <= 45) durationAdj = 0;
  else if (duration <= 60) durationAdj = 4;
  else if (duration <= 90) durationAdj = 8;
  else durationAdj = 12;

  // Muscle groups
  const muscleMods: Record<string, number> = {
    upper: 0,
    lower: 6,
    fullBody: 8,
    core: -4,
  };
  const muscleAdj = muscleMods[muscleGroup] || 0;

  // Eccentric
  const eccentricAdj = eccentricFocus === "yes" ? 12 : 0;

  // Training goal (affects CNS recovery)
  const goalMods: Record<string, number> = {
    power: 8,
    strength: 6,
    hypertrophy: 0,
    endurance: -4,
    general: 0,
  };
  const goalAdj = goalMods[trainingGoal] || 0;

  // Sleep hours
  const sleepHoursMods: Record<string, number> = {
    under5: 18,
    "5to6": 12,
    "6to7": 6,
    "7to8": 0,
    "8to9": -6,
    "9plus": -8,
  };
  const sleepHoursAdj = sleepHoursMods[sleepHours] || 0;

  // Sleep quality
  const sleepQualityMods: Record<string, number> = {
    poor: 8,
    fair: 4,
    good: 0,
    excellent: -4,
  };
  const sleepQualityAdj = sleepQualityMods[sleepQuality] || 0;

  // Soreness
  const sorenessMods: Record<string, number> = {
    none: -4,
    mild: 0,
    moderate: 8,
    severe: 16,
  };
  const sorenessAdj = sorenessMods[soreness] || 0;

  // Stress
  const stressMods: Record<string, number> = {
    low: 0,
    moderate: 6,
    high: 12,
    veryHigh: 18,
  };
  const stressAdj = stressMods[stressLevel] || 0;

  // Hydration
  const hydrationMods: Record<string, number> = {
    poor: 8,
    adequate: 0,
    optimal: -4,
  };
  const hydrationAdj = hydrationMods[hydration] || 0;

  // Nutrition
  const nutritionMods: Record<string, number> = {
    deficit: 8,
    maintenance: 0,
    surplus: -4,
  };
  const nutritionAdj = nutritionMods[nutritionStatus] || 0;

  // Age
  let ageAdj = 0;
  if (age < 25) ageAdj = -4;
  else if (age < 35) ageAdj = 0;
  else if (age < 45) ageAdj = 6;
  else if (age < 55) ageAdj = 12;
  else if (age < 65) ageAdj = 18;
  else ageAdj = 24;

  // Experience
  const experienceMods: Record<string, number> = {
    beginner: 12,
    intermediate: 4,
    advanced: 0,
    elite: -6,
  };
  const experienceAdj = experienceMods[experience] || 0;

  // Consecutive days
  let consecutiveAdj = 0;
  if (consecutiveDays > 2) {
    consecutiveAdj = (consecutiveDays - 2) * 4;
  }

  // Weeks without deload
  let deloadAdj = 0;
  if (weeksWithoutDeload > 6) deloadAdj = 8;
  else if (weeksWithoutDeload > 4) deloadAdj = 4;

  // Total recovery hours
  const workoutTotal = typeAdj + intensityAdj + durationAdj + muscleAdj + eccentricAdj + goalAdj;
  const lifestyleTotal = sleepHoursAdj + sleepQualityAdj + sorenessAdj + stressAdj + hydrationAdj + nutritionAdj + ageAdj + experienceAdj;
  const cumulativeTotal = consecutiveAdj + deloadAdj;

  let totalRecoveryHours = Math.max(12, Math.round(baseRecovery + workoutTotal + lifestyleTotal + cumulativeTotal));

  // ═══════════════════════════════════════════════════════════════════
  // HEART RATE ANALYSIS
  // ═══════════════════════════════════════════════════════════════════
  let hrElevation = 0;
  let hrStatusRaw = "N/A — Not tracking";
  let hrAdj = 0;

  if (restingHeartRate !== null && normalRestingHR !== null) {
    hrElevation = restingHeartRate - normalRestingHR;

    if (hrElevation >= 10) {
      hrStatusRaw = "🔴 High Elevation";
      hrAdj = 20;
      totalRecoveryHours += 24;
    } else if (hrElevation >= 5) {
      hrStatusRaw = "⚠️ Elevated";
      hrAdj = 12;
      totalRecoveryHours += 12;
    } else if (hrElevation >= 3) {
      hrStatusRaw = "⚠️ Slightly Elevated";
      hrAdj = 6;
    } else {
      hrStatusRaw = "🟢 Normal";
      hrAdj = 0;
    }
  }

  const hrStatus = v[hrStatusRaw] || hrStatusRaw;

  // ═══════════════════════════════════════════════════════════════════
  // TIME REMAINING
  // ═══════════════════════════════════════════════════════════════════
  const timeRemaining = Math.max(0, totalRecoveryHours - hoursSinceWorkout);

  // ═══════════════════════════════════════════════════════════════════
  // READINESS SCORE (0-100)
  // ═══════════════════════════════════════════════════════════════════
  let readiness = 100;

  // Sleep penalty
  const sleepPenalties: Record<string, number> = {
    under5: 30,
    "5to6": 22,
    "6to7": 12,
    "7to8": 4,
    "8to9": 0,
    "9plus": 0,
  };
  readiness -= sleepPenalties[sleepHours] || 0;

  const qualityPenalties: Record<string, number> = {
    poor: 15,
    fair: 8,
    good: 2,
    excellent: 0,
  };
  readiness -= qualityPenalties[sleepQuality] || 0;

  // Soreness penalty
  const sorenessPenalties: Record<string, number> = {
    none: 0,
    mild: 5,
    moderate: 15,
    severe: 25,
  };
  readiness -= sorenessPenalties[soreness] || 0;

  // Stress penalty
  const stressPenalties: Record<string, number> = {
    low: 0,
    moderate: 8,
    high: 15,
    veryHigh: 22,
  };
  readiness -= stressPenalties[stressLevel] || 0;

  // Hydration penalty
  const hydrationPenalties: Record<string, number> = {
    poor: 10,
    adequate: 0,
    optimal: 0,
  };
  readiness -= hydrationPenalties[hydration] || 0;

  // Consecutive days penalty
  if (consecutiveDays <= 1) readiness -= 0;
  else if (consecutiveDays <= 2) readiness -= 3;
  else if (consecutiveDays <= 3) readiness -= 8;
  else if (consecutiveDays <= 4) readiness -= 13;
  else readiness -= 20;

  // Nutrition penalty
  const nutritionPenalties: Record<string, number> = {
    surplus: 0,
    maintenance: 3,
    deficit: 10,
  };
  readiness -= nutritionPenalties[nutritionStatus] || 0;

  // Age penalty
  if (age >= 55) readiness -= 8;
  else if (age >= 45) readiness -= 5;
  else if (age >= 35) readiness -= 3;

  // Heart rate penalty
  if (hrElevation >= 10) readiness -= 25;
  else if (hrElevation >= 5) readiness -= 15;
  else if (hrElevation >= 3) readiness -= 8;

  // Time-based recovery bonus
  const timePassedRatio = hoursSinceWorkout / totalRecoveryHours;
  if (timePassedRatio >= 1.0) {
    readiness += 10;
  } else if (timePassedRatio >= 0.75) {
    readiness += 5;
  } else if (timePassedRatio < 0.25) {
    readiness -= 10;
  }

  // Mild illness penalty
  if (healthStatus === "mild") {
    readiness -= 20;
  }

  readiness = Math.max(0, Math.min(100, Math.round(readiness)));

  // ═══════════════════════════════════════════════════════════════════
  // REST TYPE RECOMMENDATION
  // ═══════════════════════════════════════════════════════════════════
  let restTypeRaw: string;
  if (healthStatus === "mild") {
    restTypeRaw = "Active Recovery";
  } else if (readiness >= 80) {
    restTypeRaw = "Normal Training";
  } else if (readiness >= 60) {
    restTypeRaw = "Light Training";
  } else if (readiness >= 40) {
    restTypeRaw = "Active Recovery";
  } else {
    restTypeRaw = "Full Rest";
  }
  const restType = v[restTypeRaw] || restTypeRaw;

  // ═══════════════════════════════════════════════════════════════════
  // OVERTRAINING RISK
  // ═══════════════════════════════════════════════════════════════════
  let otScore = 0;

  if (consecutiveDays >= 6) otScore += 3;
  else if (consecutiveDays >= 4) otScore += 2;
  else if (consecutiveDays >= 2) otScore += 1;

  if (weeksWithoutDeload >= 8) otScore += 3;
  else if (weeksWithoutDeload >= 6) otScore += 2;
  else if (weeksWithoutDeload >= 4) otScore += 1;

  if (intensity === "max") otScore += 2;
  else if (intensity === "hard") otScore += 1;

  if (readiness < 40) otScore += 3;
  else if (readiness < 60) otScore += 2;
  else if (readiness < 80) otScore += 1;

  if (soreness === "severe") otScore += 2;
  else if (soreness === "moderate") otScore += 1;

  if (hrElevation >= 10) otScore += 3;
  else if (hrElevation >= 5) otScore += 2;

  if (hydration === "poor") otScore += 1;

  let overtrainingRaw: string;
  if (otScore >= 10) overtrainingRaw = "Critical";
  else if (otScore >= 7) overtrainingRaw = "High";
  else if (otScore >= 4) overtrainingRaw = "Moderate";
  else overtrainingRaw = "Low";
  const overtrainingRisk = v[overtrainingRaw] || overtrainingRaw;

  // ═══════════════════════════════════════════════════════════════════
  // WEEKLY REST DAYS
  // ═══════════════════════════════════════════════════════════════════
  let minRest = 1;
  let maxRest = 2;

  if (experience === "beginner") {
    minRest = 3;
    maxRest = 4;
  } else if (experience === "intermediate") {
    minRest = 2;
    maxRest = 3;
  } else if (experience === "advanced") {
    minRest = 1;
    maxRest = 2;
  } else {
    minRest = 1;
    maxRest = 2;
  }

  if (age >= 50) {
    minRest += 1;
    maxRest += 1;
  } else if (age >= 40) {
    maxRest += 1;
  }

  if (intensity === "max") {
    minRest += 1;
  }

  if (trainingGoal === "power" || trainingGoal === "strength") {
    minRest += 1;
  }

  minRest = Math.min(minRest, 4);
  maxRest = Math.min(maxRest, 5);

  const daysLabel = v["days"] || "days";
  const weeklyRestDaysStr = `${minRest}-${maxRest} ${daysLabel}`;

  // ═══════════════════════════════════════════════════════════════════
  // DELOAD STATUS
  // ═══════════════════════════════════════════════════════════════════
  const deloadIntervals: Record<string, number> = {
    beginner: 4,
    intermediate: 5,
    advanced: 7,
    elite: 6,
  };
  const deloadInterval = deloadIntervals[experience] || 5;
  const weeksUntilDeload = Math.max(0, deloadInterval - weeksWithoutDeload);
  const weekLabel =
    weeksUntilDeload === 1 ? v["week"] || "week" : v["weeks"] || "weeks";
  const inLabel = v["In"] || "In";
  const deloadNowLabel = v["Deload now!"] || "Deload now!";
  const deloadStatus =
    weeksUntilDeload <= 0
      ? `🔴 ${deloadNowLabel}`
      : `${inLabel} ${weeksUntilDeload} ${weekLabel}`;

  // ═══════════════════════════════════════════════════════════════════
  // ACTIVE RECOVERY PLAN
  // ═══════════════════════════════════════════════════════════════════
  let activeRecoveryRaw: string;
  if (healthStatus === "mild") {
    activeRecoveryRaw = "Light walk 20-30 min, gentle stretching, foam rolling";
  } else if (readiness < 40) {
    activeRecoveryRaw = "Complete rest — sleep, hydrate, eat well";
  } else if (readiness < 60) {
    activeRecoveryRaw = "Light walk 20-30 min, gentle stretching, foam rolling";
  } else if (readiness < 80) {
    activeRecoveryRaw = "Yoga, mobility work, technique drills at 50% effort";
  } else {
    activeRecoveryRaw = "Fully recovered — warm up well and train hard";
  }
  const activeRecovery = v[activeRecoveryRaw] || activeRecoveryRaw;

  // ═══════════════════════════════════════════════════════════════════
  // FORMAT OUTPUTS
  // ═══════════════════════════════════════════════════════════════════
  const hoursLabel =
    totalRecoveryHours === 1 ? v["hour"] || "hour" : v["hours"] || "hours";
  const recoveryHoursStr = `~${totalRecoveryHours} ${hoursLabel}`;

  const remainingLabel =
    timeRemaining === 1 ? v["hour"] || "hour" : v["hours"] || "hours";
  const timeRemainingStr =
    timeRemaining > 0 ? `~${timeRemaining} ${remainingLabel}` : "Fully recovered";

  // ═══════════════════════════════════════════════════════════════════
  // SUMMARY
  // ═══════════════════════════════════════════════════════════════════
  const summaryTemplate =
    f.summary ||
    "Your readiness score is {readinessScore}/100 ({restType}). You need {recoveryHours} total recovery, with {timeRemaining} remaining. Overtraining risk: {overtrainingRisk}.";
  const summary = summaryTemplate
    .replace("{readinessScore}", readiness.toString())
    .replace("{restType}", restType)
    .replace("{recoveryHours}", recoveryHoursStr)
    .replace("{timeRemaining}", timeRemainingStr)
    .replace("{overtrainingRisk}", overtrainingRisk);

  // ═══════════════════════════════════════════════════════════════════
  // DETAILED TABLE
  // ═══════════════════════════════════════════════════════════════════
  const fV = (key: string) => v[key] || key;

  function ratingFor(adj: number): string {
    if (adj <= -4) return fV("✅ Optimal");
    if (adj <= 0) return fV("✅ Good");
    if (adj <= 12) return fV("⚠️ Moderate");
    if (adj <= 20) return fV("⚠️ High");
    return fV("🔴 Critical");
  }

  function formatAdj(adj: number): string {
    if (adj === 0) return "0h";
    return adj > 0 ? `+${adj}h` : `${adj}h`;
  }

  const workoutLoadStatus = `${intensity.charAt(0).toUpperCase() + intensity.slice(1)} ${workoutType}, ${duration}min`;
  const muscleGroupStatus =
    muscleGroup === "fullBody"
      ? "Full Body"
      : muscleGroup === "upper"
      ? "Upper Body"
      : muscleGroup === "lower"
      ? "Lower Body"
      : "Core / Isolation";
  const eccentricStatus = eccentricFocus === "yes" ? "Yes (+12h)" : fV("None");
  const goalStatus =
    trainingGoal.charAt(0).toUpperCase() + trainingGoal.slice(1);
  const timingStatus = `${hoursSinceWorkout}h ago (${timePassedRatio >= 1 ? "100%" : Math.round(timePassedRatio * 100) + "%"} recovered)`;
  const sleepStatus = `${sleepHours.replace("to", "-").replace("under", "<").replace("plus", "+")}h, ${sleepQuality}`;
  const stressSorenessStatus = `${soreness} soreness, ${stressLevel} stress`;
  const hydrationStatus = hydration.charAt(0).toUpperCase() + hydration.slice(1);
  const nutritionStatusText =
    nutritionStatus.charAt(0).toUpperCase() + nutritionStatus.slice(1);
  const healthStatusText =
    healthStatus === "healthy"
      ? "Healthy"
      : healthStatus === "mild"
      ? "Mild illness"
      : healthStatus === "sick"
      ? "Sick"
      : "Injured";
  const hrStatusText =
    restingHeartRate !== null && normalRestingHR !== null
      ? `${restingHeartRate} bpm (baseline: ${normalRestingHR}, ${hrElevation >= 0 ? "+" : ""}${hrElevation})`
      : "Not tracking";
  const ageExpStatus = `${age}y, ${experience}`;
  const cumulativeStatus = `${consecutiveDays}d consecutive, ${weeksWithoutDeload}w no deload`;

  const detailedTableRows = [
    [
      fV("Workout Load"),
      workoutLoadStatus,
      formatAdj(typeAdj + intensityAdj + durationAdj),
      ratingFor(typeAdj + intensityAdj + durationAdj),
    ],
    [fV("Muscle Group"), muscleGroupStatus, formatAdj(muscleAdj), ratingFor(muscleAdj)],
    [
      fV("Eccentric Stress"),
      eccentricStatus,
      formatAdj(eccentricAdj),
      eccentricAdj > 0 ? fV("⚠️ Moderate") : fV("✅ Good"),
    ],
    [fV("Training Goal"), goalStatus, formatAdj(goalAdj), ratingFor(goalAdj)],
    [
      fV("Time Passed"),
      timingStatus,
      timeRemaining > 0 ? `${timeRemaining}h left` : "Complete",
      timeRemaining === 0 ? fV("✅ Good") : ratingFor(timeRemaining / 6),
    ],
    [
      fV("Sleep"),
      sleepStatus,
      formatAdj(sleepHoursAdj + sleepQualityAdj),
      ratingFor(sleepHoursAdj + sleepQualityAdj),
    ],
    [
      fV("Stress & Soreness"),
      stressSorenessStatus,
      formatAdj(stressAdj + sorenessAdj),
      ratingFor(stressAdj + sorenessAdj),
    ],
    [fV("Hydration"), hydrationStatus, formatAdj(hydrationAdj), ratingFor(hydrationAdj)],
    [fV("Nutrition"), nutritionStatusText, formatAdj(nutritionAdj), ratingFor(nutritionAdj)],
    [
      fV("Health Status"),
      healthStatusText,
      healthStatus === "healthy" ? "No impact" : "⚠️ Affected",
      healthStatus === "healthy" ? fV("✅ Good") : fV("⚠️ Moderate"),
    ],
    [
      fV("Heart Rate"),
      hrStatusText,
      formatAdj(hrAdj),
      hrElevation >= 10
        ? fV("🔴 Critical")
        : hrElevation >= 5
        ? fV("⚠️ High")
        : fV("✅ Good"),
    ],
    [
      fV("Age & Experience"),
      ageExpStatus,
      formatAdj(ageAdj + experienceAdj),
      ratingFor(ageAdj + experienceAdj),
    ],
    [
      fV("Cumulative Fatigue"),
      cumulativeStatus,
      formatAdj(cumulativeTotal),
      ratingFor(cumulativeTotal),
    ],
    [
      fV("TOTAL"),
      `Recovery: ${totalRecoveryHours}h`,
      `Readiness: ${readiness}/100`,
      restType,
    ],
  ];

  // ═══════════════════════════════════════════════════════════════════
  // RETURN
  // ═══════════════════════════════════════════════════════════════════
  return {
    values: {
      readinessScore: readiness,
      restType: restTypeRaw,
      recoveryHours: totalRecoveryHours,
      timeRemaining: timeRemaining,
      overtrainingRisk: overtrainingRaw,
      weeklyRestDays: weeklyRestDaysStr,
      deloadStatus,
      heartRateStatus: hrStatusRaw,
      activeRecovery: activeRecoveryRaw,
    },
    formatted: {
      readinessScore: `${readiness} / 100`,
      restType,
      recoveryHours: recoveryHoursStr,
      timeRemaining: timeRemainingStr,
      overtrainingRisk,
      weeklyRestDays: weeklyRestDaysStr,
      deloadStatus,
      heartRateStatus: hrStatus,
      activeRecovery,
    },
    summary,
    isValid: true,
    detailedTable: {
      rows: detailedTableRows,
    },
  };
}

export default restDayCalculatorConfig;
