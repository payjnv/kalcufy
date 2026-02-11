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
    es: {
      "name": "Calculadora de Días de Descanso",
      "slug": "calculadora-dias-descanso",
      "subtitle": "Calculadora avanzada de recuperación con monitoreo de frecuencia cardíaca, seguimiento de hidratación y puntuaciones personalizadas de preparación",
      "breadcrumb": "Día de Descanso",
      "seo": {
        "title": "Calculadora de Días de Descanso — Frecuencia Cardíaca, VFC y Planificador de Recuperación",
        "description": "Calcula la preparación para entrenar con monitoreo de frecuencia cardíaca, seguimiento de hidratación y análisis del sueño. Obtén tiempo de recuperación personalizado, evaluación de riesgo de sobreentrenamiento y planes de recuperación activa.",
        "shortDescription": "¿Deberías entrenar hoy? Obtén tu puntuación de preparación con datos de VFC y frecuencia cardíaca",
        "keywords": [
          "calculadora día de descanso",
          "calculadora VFC",
          "variabilidad frecuencia cardíaca recuperación",
          "frecuencia cardíaca reposo sobreentrenamiento",
          "frecuencia cardíaca recuperación",
          "calculadora recuperación entrenamiento",
          "puntuación preparación entrenamiento",
          "calculadora riesgo sobreentrenamiento"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "mode": {
          "label": "Modo de Calculadora",
          "helpText": "El modo simple hace 6 preguntas. El modo avanzado incluye frecuencia cardíaca, hidratación, nutrición y 17 factores en total.",
          "options": {
            "simple": "⚡ Simple (Revisión Rápida)",
            "advanced": "🔬 Avanzado (Análisis Completo)"
          }
        },
        "workoutType": {
          "label": "Tipo de Último Entrenamiento",
          "helpText": "¿Qué tipo de entrenamiento hiciste?",
          "options": {
            "strength": "Entrenamiento de Fuerza",
            "cardio": "Cardio / Resistencia",
            "hiit": "HIIT / CrossFit",
            "sport": "Deporte / Recreación",
            "mixed": "Mixto / Circuito"
          }
        },
        "intensity": {
          "label": "Intensidad del Entrenamiento (EPE)",
          "helpText": "Escala de Percepción del Esfuerzo — ¿qué tan difícil se sintió?",
          "options": {
            "light": "Ligero (EPE 1-3) — Podía hablar fácilmente",
            "moderate": "Moderado (EPE 4-6) — Desafiante pero manejable",
            "hard": "Difícil (EPE 7-8) — Cerca del fallo en algunas series",
            "max": "Máximo Esfuerzo (EPE 9-10) — Todo lo que tenía"
          }
        },
        "duration": {
          "label": "Duración del Entrenamiento",
          "helpText": "Tiempo total del entrenamiento en minutos"
        },
        "muscleGroup": {
          "label": "Grupos Musculares Trabajados",
          "helpText": "¿En qué área te enfocaste?",
          "options": {
            "upper": "Tren Superior (pecho, espalda, brazos, hombros)",
            "lower": "Tren Inferior (cuádriceps, isquiotibiales, glúteos, pantorrillas)",
            "fullBody": "Cuerpo Completo (movimientos compuestos)",
            "core": "Core / Solo Aislamiento"
          }
        },
        "eccentricFocus": {
          "label": "¿Trabajo Excéntrico Pesado?",
          "helpText": "Negativos lentos, peso muerto rumano o ejercicios enfocados en excéntricos causan más daño muscular",
          "options": {
            "no": "No",
            "yes": "Sí"
          }
        },
        "trainingGoal": {
          "label": "Objetivo Principal de Entrenamiento",
          "helpText": "Diferentes objetivos requieren diferentes estrategias de recuperación",
          "options": {
            "strength": "Fuerza Máxima (pesado, pocas repeticiones)",
            "hypertrophy": "Tamaño Muscular (8-12 repeticiones)",
            "endurance": "Resistencia (cardio, larga duración)",
            "power": "Potencia (explosivo, pliométricos)",
            "general": "Fitness General"
          }
        },
        "hoursSinceWorkout": {
          "label": "Horas Desde el Último Entrenamiento",
          "helpText": "Más preciso que días — útil si entrenas dos veces al día"
        },
        "consecutiveDays": {
          "label": "Días Consecutivos de Entrenamiento",
          "helpText": "¿Cuántos días seguidos has entrenado?"
        },
        "weeksWithoutDeload": {
          "label": "Semanas Sin Descarga",
          "helpText": "¿Cuántas semanas desde tu última semana de descanso/descarga?"
        },
        "sleepHours": {
          "label": "Sueño de Anoche",
          "helpText": "Horas totales de sueño",
          "options": {
            "under5": "Menos de 5 horas",
            "5to6": "5-6 horas",
            "6to7": "6-7 horas",
            "7to8": "7-8 horas",
            "8to9": "8-9 horas",
            "9plus": "9+ horas"
          }
        },
        "sleepQuality": {
          "label": "Calidad del Sueño",
          "helpText": "¿Qué tan reparador fue tu sueño?",
          "options": {
            "poor": "Malo — Me desperté varias veces",
            "fair": "Regular — Algunas interrupciones",
            "good": "Bueno — Mayormente sólido",
            "excellent": "Excelente — Profundo, sin interrupciones"
          }
        },
        "soreness": {
          "label": "Dolor Muscular Actual",
          "helpText": "¿Qué tan doloridos están tus músculos ahora mismo?",
          "options": {
            "none": "Ninguno — Me siento fresco",
            "mild": "Leve — Ligera tensión",
            "moderate": "Moderado — Notable al moverse",
            "severe": "Severo — Duele moverse normalmente"
          }
        },
        "stressLevel": {
          "label": "Nivel de Estrés Vital",
          "helpText": "Trabajo, relaciones, finanzas — todo suma",
          "options": {
            "low": "Bajo — Las cosas están tranquilas",
            "moderate": "Moderado — Algo de presión",
            "high": "Alto — Estresado",
            "veryHigh": "Muy Alto — Abrumado"
          }
        },
        "hydration": {
          "label": "Estado de Hidratación",
          "helpText": "Revisa el color de tu orina — amarillo oscuro = pobre, pálido = bueno, claro = óptimo",
          "options": {
            "poor": "Pobre — Orina oscura, sed",
            "adequate": "Adecuada — Amarillo claro",
            "optimal": "Óptima — Orina clara/pálida"
          }
        },
        "nutritionStatus": {
          "label": "Nutrición Actual",
          "helpText": "Tu balance calórico afecta la velocidad de recuperación",
          "options": {
            "deficit": "Déficit Calórico (definición)",
            "maintenance": "Calorías de Mantenimiento",
            "surplus": "Superávit Calórico (volumen)"
          }
        },
        "healthStatus": {
          "label": "Estado de Salud",
          "helpText": "NO entrenes si tienes fiebre, dolor agudo o infección",
          "options": {
            "healthy": "Saludable — Sin problemas",
            "mild": "Leve — Resfriado menor, alergias",
            "sick": "Enfermo — Fiebre, gripe, infección",
            "injured": "Lesionado — Dolor agudo, esguince"
          }
        },
        "restingHeartRate": {
          "label": "Frecuencia Cardíaca en Reposo (Opcional)",
          "helpText": "Tu frecuencia cardíaca esta mañana antes de levantarte de la cama. Déjalo vacío si no haces seguimiento de esto."
        },
        "normalRestingHR": {
          "label": "FC Reposo Normal (Opcional)",
          "helpText": "Tu frecuencia cardíaca en reposo típica cuando estás bien descansado. Solo necesario si ingresaste FC en reposo arriba."
        },
        "age": {
          "label": "Edad",
          "helpText": "La recuperación se ralentiza con la edad — esto ajusta tu estimación"
        },
        "experience": {
          "label": "Experiencia de Entrenamiento",
          "helpText": "¿Cuánto tiempo has estado entrenando consistentemente?",
          "options": {
            "beginner": "Principiante (menos de 1 año)",
            "intermediate": "Intermedio (1-3 años)",
            "advanced": "Avanzado (3-5 años)",
            "elite": "Elite (5+ años)"
          }
        }
      },
      "results": {
        "readinessScore": {
          "label": "Puntuación de Preparación"
        },
        "restType": {
          "label": "Recomendación para Hoy"
        },
        "recoveryHours": {
          "label": "Tiempo de Recuperación Necesario"
        },
        "timeRemaining": {
          "label": "Tiempo de Recuperación Restante"
        },
        "overtrainingRisk": {
          "label": "Riesgo de Sobreentrenamiento"
        },
        "weeklyRestDays": {
          "label": "Días de Descanso Semanales Necesarios"
        },
        "deloadStatus": {
          "label": "Estado de Descarga"
        },
        "heartRateStatus": {
          "label": "Estado de Frecuencia Cardíaca"
        },
        "activeRecovery": {
          "label": "Plan de Recuperación Activa"
        }
      },
      "presets": {
        "beginner": {
          "label": "Principiante",
          "description": "Nuevo en el entrenamiento, entrenamiento ligero, buen sueño, sin datos de frecuencia cardíaca"
        },
        "weekendWarrior": {
          "label": "Guerrero de Fin de Semana",
          "description": "HIIT moderado, estilo de vida ocupado, perdiendo peso, recuperación promedio"
        },
        "seriousLifter": {
          "label": "Levantador Serio",
          "description": "Día pesado de piernas con excéntricos, siguiendo VFC, bien recuperado"
        },
        "competitionPrep": {
          "label": "Preparación para Competencia",
          "description": "Intensidad máxima, alto volumen, fatiga acumulada, FC en reposo elevada"
        }
      },
      "tooltips": {
        "readinessScore": "Puntuación 0-100 basada en carga de entrenamiento, sueño, estrés, frecuencia cardíaca y tiempo de recuperación. Mayor = más preparado para entrenar.",
        "restType": "Recomendación personalizada para hoy basada en todas tus entradas.",
        "recoveryHours": "Horas totales estimadas que tu cuerpo necesita para recuperarse completamente del último entrenamiento.",
        "timeRemaining": "Horas restantes hasta que estés completamente recuperado, basado en el tiempo desde el entrenamiento.",
        "overtrainingRisk": "Nivel de riesgo basado en frecuencia de entrenamiento, intensidad, fatiga acumulada y elevación de frecuencia cardíaca.",
        "weeklyRestDays": "Cuántos días de descanso o recuperación activa deberías tomar por semana.",
        "deloadStatus": "Si necesitas una semana de descarga y cuándo programarla.",
        "heartRateStatus": "Frecuencia cardíaca en reposo comparada con tu línea base normal. La elevación indica recuperación incompleta.",
        "activeRecovery": "Actividades sugeridas basadas en tu estado actual de recuperación."
      },
      "values": {
        "Full Rest": "Descanso Completo",
        "Active Recovery": "Recuperación Activa",
        "Light Training": "Entrenamiento Ligero",
        "Normal Training": "Entrenamiento Normal",
        "Low": "Bajo",
        "Moderate": "Moderado",
        "High": "Alto",
        "Critical": "Crítico",
        "hours": "horas",
        "hour": "hora",
        "days": "días",
        "day": "día",
        "weeks": "semanas",
        "week": "semana",
        "h": "h",
        "Deload now!": "¡Descarga ahora!",
        "In": "En",
        "✅ Optimal": "✅ Óptimo",
        "✅ Good": "✅ Bueno",
        "⚠️ Moderate": "⚠️ Moderado",
        "⚠️ High": "⚠️ Alto",
        "🔴 Critical": "🔴 Crítico",
        "Complete rest — sleep, hydrate, eat well": "Descanso completo — dormir, hidratarse, comer bien",
        "Light walk 20-30 min, gentle stretching, foam rolling": "Caminata ligera 20-30 min, estiramientos suaves, rodillo de espuma",
        "Yoga, mobility work, technique drills at 50% effort": "Yoga, trabajo de movilidad, ejercicios de técnica al 50% de esfuerzo",
        "Fully recovered — warm up well and train hard": "Completamente recuperado — calienta bien y entrena duro",
        "🟢 Normal": "🟢 Normal",
        "⚠️ Elevated": "⚠️ Elevada",
        "🔴 High Elevation": "🔴 Elevación Alta",
        "N/A — Not tracking": "N/A — Sin seguimiento",
        "🚨 DO NOT TRAIN": "🚨 NO ENTRENAR",
        "Factor": "Factor",
        "Your Status": "Tu Estado",
        "Impact": "Impacto",
        "Rating": "Calificación",
        "TOTAL": "TOTAL",
        "Workout Load": "Carga de Entrenamiento",
        "Muscle Group": "Grupo Muscular",
        "Eccentric Stress": "Estrés Excéntrico",
        "Training Goal": "Objetivo de Entrenamiento",
        "Time Passed": "Tiempo Transcurrido",
        "Sleep": "Sueño",
        "Stress & Soreness": "Estrés y Dolor",
        "Hydration": "Hidratación",
        "Nutrition": "Nutrición",
        "Health Status": "Estado de Salud",
        "Heart Rate": "Frecuencia Cardíaca",
        "Age & Experience": "Edad y Experiencia",
        "Cumulative Fatigue": "Fatiga Acumulativa",
        "None": "Ninguno"
      },
      "formats": {
        "summary": "Tu puntuación de preparación es {readinessScore}/100 ({restType}). Necesitas {recoveryHours} de recuperación total, con {timeRemaining} restante. Riesgo de sobreentrenamiento: {overtrainingRisk}."
      },
      "infoCards": {
        "recoveryOverview": {
          "title": "Resumen de Recuperación",
          "items": {
            "0": "Puntuación de Preparación",
            "1": "Recomendación",
            "2": "Tiempo Restante",
            "3": "Estado de Frecuencia Cardíaca",
            "4": "Recuperación Activa"
          }
        },
        "trainingStatus": {
          "title": "Estado de Entrenamiento",
          "items": {
            "0": "Riesgo de Sobreentrenamiento",
            "1": "Días de Descanso Semanales",
            "2": "Estado de Descarga"
          }
        },
        "tips": {
          "title": "Optimización de Recuperación",
          "items": [
            "Haz seguimiento de tu frecuencia cardíaca en reposo cada mañana — una elevación de 5+ LPM significa que necesitas más recuperación",
            "El sueño es la herramienta #1 de recuperación — prioriza 7-9 horas de sueño de calidad cada noche",
            "La hidratación importa — la deshidratación ralentiza la recuperación hasta un 25% y deteriora el rendimiento",
            "Alterna días duros y fáciles — nunca apiles 3+ sesiones de máximo esfuerzo consecutivas sin recuperación"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es la Recuperación del Entrenamiento?",
          "content": "La recuperación del entrenamiento es el proceso biológico de reparar el tejido muscular, reponer las reservas de glucógeno y restaurar la función del sistema nervioso después del ejercicio. Cuando entrenas, creates daño controlado a las fibras musculares a través de tensión mecánica y estrés metabólico. Tu cuerpo luego reconstruye estas fibras más fuertes durante los períodos de descanso — un proceso llamado supercompensación. Sin recuperación adecuada, este proceso se interrumpe, llevando a progreso estancado, fatiga acumulada y mayor riesgo de lesión. La recuperación no es simplemente la ausencia de entrenamiento; es un proceso fisiológico activo influenciado por la calidad del sueño, nutrición, niveles de estrés, hidratación, variabilidad de la frecuencia cardíaca y las demandas específicas de tu entrenamiento. Los atletas de élite monitorean la frecuencia cardíaca en reposo (FCR) y la variabilidad de la frecuencia cardíaca (VFC) diariamente para hacer seguimiento objetivo del estado de recuperación. Entender tus necesidades de recuperación es lo que separa el entrenamiento inteligente del sobreentrenamiento."
        },
        "howItWorks": {
          "title": "Cómo Funciona Esta Calculadora",
          "content": "Esta calculadora avanzada evalúa tu preparación para entrenar analizando tres categorías de factores. Primero, evalúa las demandas de tu entrenamiento — el tipo, intensidad, duración, grupos musculares involucrados, trabajo excéntrico y objetivo de entrenamiento. Segundo, evalúa tu capacidad de recuperación — calidad y duración del sueño, niveles de estrés, dolor muscular, hidratación, estado nutricional, edad y experiencia de entrenamiento. Tercero, incorpora biomarcadores objetivos — tu frecuencia cardíaca en reposo comparada con la línea base, horas desde tu último entrenamiento y estado de salud actual. Estos factores se combinan en una Puntuación de Preparación de 0 a 100, donde puntuaciones más altas indican mayor preparación para entrenar. La calculadora también estima el tiempo total de recuperación necesario, calcula el tiempo restante basado en las horas desde el entrenamiento, evalúa el riesgo de sobreentrenamiento basado en fatiga acumulativa y elevación de frecuencia cardíaca, recomienda días de descanso semanales, evalúa el momento de descarga y proporciona sugerencias específicas de recuperación activa adaptadas a tu estado actual. Si tienes fiebre, dolor agudo o infección, la calculadora anulará todos los otros factores y recomendará descanso completo."
        },
        "heartRate": {
          "title": "Frecuencia Cardíaca y Recuperación",
          "items": [
            {
              "text": "La frecuencia cardíaca en reposo (FCR) se mide a primera hora de la mañana antes de levantarse de la cama — es el marcador de recuperación más confiable",
              "type": "info"
            },
            {
              "text": "Una frecuencia cardíaca en reposo 5+ LPM por encima de tu línea base normal indica recuperación incompleta y estrés elevado en tu cuerpo",
              "type": "warning"
            },
            {
              "text": "La variabilidad de la frecuencia cardíaca (VFC) mide la variación entre latidos — mayor VFC generalmente indica mejor recuperación",
              "type": "info"
            },
            {
              "text": "Haz seguimiento de la FCR consistentemente durante 2-4 semanas para establecer tu línea base personal, ya que las líneas base individuales varían de 40-80 LPM",
              "type": "info"
            },
            {
              "text": "Factores que elevan la FCR: sueño pobre, enfermedad, deshidratación, sobreentrenamiento, alcohol, estrés y recuperación incompleta",
              "type": "warning"
            },
            {
              "text": "Si tu FCR está elevada 10+ LPM por encima de la línea base y permanece elevada por múltiples días, toma un día de descanso completo inmediatamente",
              "type": "warning"
            }
          ]
        },
        "hydrationRecovery": {
          "title": "Hidratación y Recuperación",
          "items": [
            {
              "text": "Incluso 2% de deshidratación puede ralentizar la recuperación muscular hasta un 25% y deteriorar significativamente el rendimiento de fuerza",
              "type": "warning"
            },
            {
              "text": "Revisa el color de la orina diariamente — amarillo oscuro indica deshidratación, amarillo pálido es óptimo, claro significa bien hidratado",
              "type": "info"
            },
            {
              "text": "Bebe 0.5-1 oz de agua por libra de peso corporal diariamente, más extra por pérdida de sudor durante el entrenamiento",
              "type": "info"
            },
            {
              "text": "Los electrolitos importan — sodio, potasio y magnesio se pierden a través del sudor y necesitan reposición",
              "type": "info"
            },
            {
              "text": "La cafeína y el alcohol son diuréticos que aumentan la pérdida de líquidos — compensa con ingesta extra de agua",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Cálculos de Ejemplo",
          "description": "Cómo diferentes escenarios afectan la recuperación con datos de frecuencia cardíaca",
          "examples": [
            {
              "title": "Ejemplo 1: Recuperación Normal",
              "steps": [
                "Entrenamiento: Fuerza moderada, 60 min, hace 24h",
                "Sueño: 8 horas, buena calidad",
                "FCR: 58 LPM (línea base normal: 56)",
                "Hidratación: Óptima",
                "Salud: Sin problemas"
              ],
              "result": "Preparación: 88/100 → Entrenamiento Normal | Recuperación: 36h total, 12h restantes"
            },
            {
              "title": "Ejemplo 2: Advertencia de Frecuencia Cardíaca Elevada",
              "steps": [
                "Entrenamiento: Piernas máximo esfuerzo, 90 min, hace 20h",
                "Sueño: 6 horas, calidad regular",
                "FCR: 68 LPM (línea base normal: 52) ← ¡+16 LPM!",
                "Dolor severo, estrés alto",
                "5 días consecutivos entrenando"
              ],
              "result": "Preparación: 32/100 → Solo Recuperación Activa | Recuperación: 96h total, 76h restantes | Frecuencia Cardíaca: 🔴 Elevación Alta"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Por qué es importante la frecuencia cardíaca en reposo para la recuperación?",
          "answer": "La frecuencia cardíaca en reposo (FCR) es uno de los indicadores objetivos más confiables del estado de recuperación. Cuando tu cuerpo aún se está recuperando del estrés del entrenamiento, enfermedad o sueño inadecuado, tu sistema nervioso permanece en un estado elevado, causando que tu corazón lata más rápido incluso en reposo. Una frecuencia cardíaca en reposo 5+ LPM por encima de tu línea base normal es una señal clara de que tu cuerpo necesita más tiempo de recuperación. Los atletas de élite hacen seguimiento de la FCR cada mañana y ajustan su entrenamiento basado en estas lecturas. La investigación muestra que entrenar con una FCR elevada aumenta significativamente el riesgo de lesión y reduce la calidad del entrenamiento."
        },
        {
          "question": "¿Cómo mido correctamente mi frecuencia cardíaca en reposo?",
          "answer": "Mide tu frecuencia cardíaca en reposo a primera hora de la mañana, antes de levantarte de la cama, a la misma hora cada día. Coloca dos dedos en tu muñeca o cuello, cuenta los latidos durante 60 segundos (o 30 segundos y multiplica por 2). Alternativamente, usa un rastreador de fitness o smartwatch que mida la FCR automáticamente durante el sueño. Haz seguimiento de tu FCR durante 2-4 semanas para establecer tu línea base personal. Tu línea base es la FCR promedio cuando te sientes bien descansado y saludable. Las líneas base individuales varían ampliamente — un atleta de resistencia bien entrenado podría tener una FCR de 40-50 LPM, mientras que una persona no entrenada podría estar en 70-80 LPM."
        },
        {
          "question": "¿Qué debo hacer si mi frecuencia cardíaca está elevada?",
          "answer": "Si tu frecuencia cardíaca en reposo está 5-9 LPM por encima de la línea base, reduce la intensidad y volumen del entrenamiento en 30-50% — haz una sesión fácil de recuperación activa o toma un día de descanso completo. Si tu FCR está 10+ LPM por encima de la línea base, toma un día de descanso completo y enfócate en el sueño, hidratación y manejo del estrés. Si la elevación persiste por 3+ días consecutivos, considera tomar 2-3 días de descanso o programar una semana de descarga. Las causas comunes de FCR elevada incluyen sueño inadecuado, sobreentrenamiento, deshidratación, enfermedad, alto estrés vital, consumo de alcohol y nutrición pobre. Aborda estos factores primero antes de reanudar el entrenamiento intenso."
        },
        {
          "question": "¿Cómo afecta la deshidratación a la recuperación?",
          "answer": "La deshidratación tiene un impacto negativo profundo en la recuperación. Incluso 2% de deshidratación (perder 3 libras de agua para una persona de 150 libras) puede reducir la síntesis de proteína muscular hasta un 25%, deteriorar la reposición de glucógeno muscular y ralentizar la eliminación de productos de desecho metabólicos del tejido muscular dañado. La deshidratación también reduce el volumen sanguíneo, forzando a tu corazón a trabajar más duro, lo que eleva la frecuencia cardíaca en reposo. Deteriora la termorregulación, aumenta la percepción del esfuerzo y reduce la fuerza y potencia de salida en 10-20%. Revisa el color de tu orina diariamente — amarillo oscuro indica deshidratación. Apunta a orina amarilla pálida y bebe al menos 0.5 oz de agua por libra de peso corporal diariamente."
        },
        {
          "question": "¿Debo entrenar si estoy enfermo o tengo fiebre?",
          "answer": "No. Nunca entrenes con fiebre, infección o enfermedad aguda. Esta calculadora siempre recomendará descanso completo si indicas que estás enfermo o lesionado, independientemente de otros factores. Entrenar mientras estás enfermo suprime más la función inmune, prolonga la enfermedad y puede llevar a complicaciones serias como miocarditis (inflamación del corazón). La 'regla del cuello' es una guía general: síntomas por encima del cuello (nariz que gotea, dolor de garganta leve) podrían permitir ejercicio ligero, pero síntomas por debajo del cuello (congestión en el pecho, dolores corporales, fiebre) requieren descanso completo. Cuando tengas dudas, descansa. Perder algunos días de entrenamiento para recuperarte completamente es mucho mejor que entrenar enfermo y estar fuera de combate por semanas."
        },
        {
          "question": "¿Cuántos días de descanso necesito por semana?",
          "answer": "El número de días de descanso depende de la intensidad del entrenamiento, volumen, nivel de experiencia, edad y capacidad de recuperación. Los principiantes necesitan 3-4 días de descanso por semana mientras sus cuerpos se adaptan al estrés del entrenamiento. Los levantadores intermedios típicamente necesitan 2-3 días de descanso. Los atletas avanzados pueden entrenar 5-6 días por semana pero deben alternar sesiones duras y fáciles estratégicamente. Los atletas de élite a menudo entrenan 6 días por semana pero incorporan recuperación activa, trabajo de movilidad y semanas de descarga. Principio clave: empareja tu descanso con tu capacidad real de recuperación, no un horario fijo. Monitorea la frecuencia cardíaca en reposo, calidad del sueño, niveles de dolor y métricas de rendimiento para determinar si estás obteniendo recuperación adecuada."
        },
        {
          "question": "¿Qué es una semana de descarga y cuándo debo tomarla?",
          "answer": "Una semana de descarga es una reducción planificada en el volumen de entrenamiento (típicamente 40-60% menos) mientras se mantiene o reduce ligeramente la intensidad. Las semanas de descarga previenen la acumulación de fatiga, permiten recuperación completa y re-sensibilizan los músculos al estímulo del entrenamiento. La mayoría de las personas se benefician de una descarga cada 4-8 semanas dependiendo de la intensidad del entrenamiento y nivel de experiencia. Los principiantes deberían descargar cada 3-4 semanas, intermedios cada 4-6 semanas, levantadores avanzados cada 6-8 semanas y atletas de élite pueden descargar cada 8-12 semanas. Señales de que necesitas una descarga inmediata: frecuencia cardíaca en reposo persistentemente elevada, rendimiento estancado o en declive, dolor muscular persistente, calidad de sueño pobre, irritabilidad aumentada y pérdida de motivación. Una semana de descarga apropiadamente programada a menudo lleva a nuevos récords personales la semana siguiente."
        },
        {
          "question": "¿Puedo usar esta calculadora si no hago seguimiento de la frecuencia cardíaca?",
          "answer": "Sí, absolutamente. Los campos de frecuencia cardíaca en reposo son opcionales. Si no ingresas datos de frecuencia cardíaca, la calculadora aún proporcionará puntuaciones de preparación precisas y recomendaciones de recuperación basadas en carga de entrenamiento, sueño, estrés, dolor, hidratación, nutrición y tiempo desde el entrenamiento. Sin embargo, agregar datos de frecuencia cardíaca mejora significativamente la precisión porque proporciona un biomarcador objetivo del estado de recuperación. Si entrenas seriamente y quieres optimizar el rendimiento mientras evitas el sobreentrenamiento, considera invertir en un monitor básico de frecuencia cardíaca o rastreador de fitness que mida la frecuencia cardíaca en reposo. Muchos smartwatches y rastreadores de fitness ahora miden la FCR automáticamente durante el sueño, haciendo que el seguimiento de esta métrica valiosa sea sin esfuerzo."
        }
      ],
      "detailedTable": {
        "title": "Desglose de Factores de Recuperación",
        "buttonLabel": "Ver Desglose Detallado",
        "columns": [
          "Factor",
          "Tu Estado",
          "Impacto",
          "Calificación"
        ]
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
      "name": "Calculadora de Dia de Descanso",
      "slug": "calculadora-dia-descanso",
      "subtitle": "Calculadora avançada de recuperação com monitoramento de frequência cardíaca, rastreamento de hidratação e pontuações de prontidão personalizadas",
      "breadcrumb": "Dia de Descanso",
      "seo": {
        "title": "Calculadora de Dia de Descanso — Frequência Cardíaca, VFC e Planejador de Recuperação",
        "description": "Calcule a prontidão para treinar com monitoramento de frequência cardíaca, rastreamento de hidratação e análise do sono. Obtenha tempo de recuperação personalizado, avaliação de risco de overtraining e planos de recuperação ativa.",
        "shortDescription": "Deve treinar hoje? Obtenha sua pontuação de prontidão com dados de VFC e frequência cardíaca",
        "keywords": [
          "calculadora dia descanso",
          "calculadora VFC",
          "recuperação variabilidade frequência cardíaca",
          "frequência cardíaca repouso overtraining",
          "frequência cardíaca recuperação",
          "calculadora recuperação treino",
          "pontuação prontidão treino",
          "calculadora risco overtraining"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "mode": {
          "label": "Modo da Calculadora",
          "helpText": "Modo simples faz 6 perguntas. Modo avançado inclui frequência cardíaca, hidratação, nutrição e 17 fatores totais.",
          "options": {
            "simple": "⚡ Simples (Verificação Rápida)",
            "advanced": "🔬 Avançado (Análise Completa)"
          }
        },
        "workoutType": {
          "label": "Tipo do Último Treino",
          "helpText": "Que tipo de treino você fez?",
          "options": {
            "strength": "Musculação",
            "cardio": "Cardio / Resistência",
            "hiit": "HIIT / CrossFit",
            "sport": "Esporte / Recreação",
            "mixed": "Misto / Circuito"
          }
        },
        "intensity": {
          "label": "Intensidade do Treino (EPE)",
          "helpText": "Escala de Percepção de Esforço — quão difícil foi?",
          "options": {
            "light": "Leve (EPE 1-3) — Conseguia conversar facilmente",
            "moderate": "Moderado (EPE 4-6) — Desafiador mas controlável",
            "hard": "Difícil (EPE 7-8) — Perto da falha em algumas séries",
            "max": "Esforço Máximo (EPE 9-10) — Tudo que tinha"
          }
        },
        "duration": {
          "label": "Duração do Treino",
          "helpText": "Tempo total de treino em minutos"
        },
        "muscleGroup": {
          "label": "Grupos Musculares Trabalhados",
          "helpText": "Em qual área você focou?",
          "options": {
            "upper": "Membros Superiores (peito, costas, braços, ombros)",
            "lower": "Membros Inferiores (quadríceps, posteriores, glúteos, panturrilhas)",
            "fullBody": "Corpo Inteiro (movimentos compostos)",
            "core": "Core / Apenas Isolamento"
          }
        },
        "eccentricFocus": {
          "label": "Trabalho Excêntrico Intenso?",
          "helpText": "Negativos lentos, levantamento romeno ou exercícios com foco excêntrico causam mais dano muscular",
          "options": {
            "no": "Não",
            "yes": "Sim"
          }
        },
        "trainingGoal": {
          "label": "Objetivo Principal do Treino",
          "helpText": "Objetivos diferentes requerem estratégias de recuperação diferentes",
          "options": {
            "strength": "Força Máxima (pesado, poucas repetições)",
            "hypertrophy": "Hipertrofia (8-12 repetições)",
            "endurance": "Resistência (cardio, longa duração)",
            "power": "Potência (explosivo, pliometria)",
            "general": "Condicionamento Geral"
          }
        },
        "hoursSinceWorkout": {
          "label": "Horas Desde o Último Treino",
          "helpText": "Mais preciso que dias — útil se você treina duas vezes ao dia"
        },
        "consecutiveDays": {
          "label": "Dias Consecutivos de Treino",
          "helpText": "Quantos dias seguidos você treinou?"
        },
        "weeksWithoutDeload": {
          "label": "Semanas Sem Deload",
          "helpText": "Quantas semanas desde sua última semana de descanso/deload?"
        },
        "sleepHours": {
          "label": "Sono da Última Noite",
          "helpText": "Total de horas de sono",
          "options": {
            "under5": "Menos de 5 horas",
            "5to6": "5-6 horas",
            "6to7": "6-7 horas",
            "7to8": "7-8 horas",
            "8to9": "8-9 horas",
            "9plus": "9+ horas"
          }
        },
        "sleepQuality": {
          "label": "Qualidade do Sono",
          "helpText": "Quão reparador foi seu sono?",
          "options": {
            "poor": "Ruim — Acordei várias vezes",
            "fair": "Regular — Algumas interrupções",
            "good": "Bom — Principalmente sólido",
            "excellent": "Excelente — Profundo, ininterrupto"
          }
        },
        "soreness": {
          "label": "Dor Muscular Atual",
          "helpText": "Quão doloridos estão seus músculos agora?",
          "options": {
            "none": "Nenhuma — Sentindo-me bem",
            "mild": "Leve — Leve tensão",
            "moderate": "Moderada — Perceptível ao mover",
            "severe": "Severa — Dói mover normalmente"
          }
        },
        "stressLevel": {
          "label": "Nível de Estresse",
          "helpText": "Trabalho, relacionamentos, finanças — tudo se acumula",
          "options": {
            "low": "Baixo — As coisas estão calmas",
            "moderate": "Moderado — Alguma pressão",
            "high": "Alto — Estressado",
            "veryHigh": "Muito Alto — Sobrecarregado"
          }
        },
        "hydration": {
          "label": "Estado de Hidratação",
          "helpText": "Verifique a cor da urina — amarelo escuro = ruim, amarelo claro = bom, transparente = ótimo",
          "options": {
            "poor": "Ruim — Urina escura, com sede",
            "adequate": "Adequado — Amarelo claro",
            "optimal": "Ótimo — Urina transparente/clara"
          }
        },
        "nutritionStatus": {
          "label": "Estado Nutricional Atual",
          "helpText": "Seu balanço calórico afeta a velocidade de recuperação",
          "options": {
            "deficit": "Déficit Calórico (cutting)",
            "maintenance": "Calorias de Manutenção",
            "surplus": "Superávit Calórico (bulking)"
          }
        },
        "healthStatus": {
          "label": "Estado de Saúde",
          "helpText": "NÃO treine se tiver febre, dor aguda ou infecção",
          "options": {
            "healthy": "Saudável — Sem problemas",
            "mild": "Leve — Resfriado leve, alergias",
            "sick": "Doente — Febre, gripe, infecção",
            "injured": "Lesionado — Dor aguda, entorse"
          }
        },
        "restingHeartRate": {
          "label": "Frequência Cardíaca de Repouso (Opcional)",
          "helpText": "Sua frequência cardíaca desta manhã antes de sair da cama. Deixe vazio se não monitora isso."
        },
        "normalRestingHR": {
          "label": "FC Repouso Normal (Opcional)",
          "helpText": "Sua frequência cardíaca de repouso típica quando bem descansado. Necessário apenas se preencheu a FC acima."
        },
        "age": {
          "label": "Idade",
          "helpText": "A recuperação diminui com a idade — isso ajusta sua estimativa"
        },
        "experience": {
          "label": "Experiência de Treino",
          "helpText": "Há quanto tempo você treina consistentemente?",
          "options": {
            "beginner": "Iniciante (menos de 1 ano)",
            "intermediate": "Intermediário (1-3 anos)",
            "advanced": "Avançado (3-5 anos)",
            "elite": "Elite (5+ anos)"
          }
        }
      },
      "results": {
        "readinessScore": {
          "label": "Pontuação de Prontidão"
        },
        "restType": {
          "label": "Recomendação de Hoje"
        },
        "recoveryHours": {
          "label": "Tempo de Recuperação Necessário"
        },
        "timeRemaining": {
          "label": "Tempo de Recuperação Restante"
        },
        "overtrainingRisk": {
          "label": "Risco de Overtraining"
        },
        "weeklyRestDays": {
          "label": "Dias de Descanso Semanais Necessários"
        },
        "deloadStatus": {
          "label": "Status de Deload"
        },
        "heartRateStatus": {
          "label": "Status da Frequência Cardíaca"
        },
        "activeRecovery": {
          "label": "Plano de Recuperação Ativa"
        }
      },
      "presets": {
        "beginner": {
          "label": "Iniciante",
          "description": "Novo no treino, treino leve, bom sono, sem dados de frequência cardíaca"
        },
        "weekendWarrior": {
          "label": "Guerreiro de Fim de Semana",
          "description": "HIIT moderado, estilo de vida corrido, cortando peso, recuperação média"
        },
        "seriousLifter": {
          "label": "Levantador Sério",
          "description": "Treino pesado de pernas com excêntricos, monitorando VFC, bem recuperado"
        },
        "competitionPrep": {
          "label": "Preparação para Competição",
          "description": "Intensidade máxima, alto volume, fadiga acumulada, FC elevada"
        }
      },
      "tooltips": {
        "readinessScore": "Pontuação 0-100 baseada na carga de treino, sono, estresse, frequência cardíaca e tempo de recuperação. Maior = mais pronto para treinar.",
        "restType": "Recomendação personalizada para hoje baseada em todos os seus dados.",
        "recoveryHours": "Total estimado de horas que seu corpo precisa para se recuperar completamente do último treino.",
        "timeRemaining": "Horas restantes até você estar completamente recuperado, baseado no tempo desde o treino.",
        "overtrainingRisk": "Nível de risco baseado na frequência de treino, intensidade, fadiga acumulada e elevação da frequência cardíaca.",
        "weeklyRestDays": "Quantos dias de descanso ou recuperação ativa você deveria ter por semana.",
        "deloadStatus": "Se você precisa de uma semana de deload e quando agendá-la.",
        "heartRateStatus": "Frequência cardíaca de repouso comparada à sua linha de base normal. Elevação indica recuperação incompleta.",
        "activeRecovery": "Atividades sugeridas baseadas no seu estado atual de recuperação."
      },
      "values": {
        "Full Rest": "Descanso Completo",
        "Active Recovery": "Recuperação Ativa",
        "Light Training": "Treino Leve",
        "Normal Training": "Treino Normal",
        "Low": "Baixo",
        "Moderate": "Moderado",
        "High": "Alto",
        "Critical": "Crítico",
        "hours": "horas",
        "hour": "hora",
        "days": "dias",
        "day": "dia",
        "weeks": "semanas",
        "week": "semana",
        "h": "h",
        "Deload now!": "Deload agora!",
        "In": "Em",
        "✅ Optimal": "✅ Ótimo",
        "✅ Good": "✅ Bom",
        "⚠️ Moderate": "⚠️ Moderado",
        "⚠️ High": "⚠️ Alto",
        "🔴 Critical": "🔴 Crítico",
        "Complete rest — sleep, hydrate, eat well": "Descanso completo — durma, hidrate-se, coma bem",
        "Light walk 20-30 min, gentle stretching, foam rolling": "Caminhada leve 20-30 min, alongamento suave, rolo de espuma",
        "Yoga, mobility work, technique drills at 50% effort": "Yoga, trabalho de mobilidade, exercícios técnicos a 50% do esforço",
        "Fully recovered — warm up well and train hard": "Completamente recuperado — aqueça bem e treine pesado",
        "🟢 Normal": "🟢 Normal",
        "⚠️ Elevated": "⚠️ Elevada",
        "🔴 High Elevation": "🔴 Muito Elevada",
        "N/A — Not tracking": "N/A — Não monitorando",
        "🚨 DO NOT TRAIN": "🚨 NÃO TREINE",
        "Factor": "Fator",
        "Your Status": "Seu Status",
        "Impact": "Impacto",
        "Rating": "Avaliação",
        "TOTAL": "TOTAL",
        "Workout Load": "Carga de Treino",
        "Muscle Group": "Grupo Muscular",
        "Eccentric Stress": "Estresse Excêntrico",
        "Training Goal": "Objetivo do Treino",
        "Time Passed": "Tempo Passado",
        "Sleep": "Sono",
        "Stress & Soreness": "Estresse e Dor",
        "Hydration": "Hidratação",
        "Nutrition": "Nutrição",
        "Health Status": "Estado de Saúde",
        "Heart Rate": "Frequência Cardíaca",
        "Age & Experience": "Idade e Experiência",
        "Cumulative Fatigue": "Fadiga Cumulativa",
        "None": "Nenhum"
      },
      "formats": {
        "summary": "Sua pontuação de prontidão é {readinessScore}/100 ({restType}). Você precisa de {recoveryHours} de recuperação total, com {timeRemaining} restantes. Risco de overtraining: {overtrainingRisk}."
      },
      "infoCards": {
        "recoveryOverview": {
          "title": "Visão Geral da Recuperação",
          "items": {
            "0": "Pontuação de Prontidão",
            "1": "Recomendação",
            "2": "Tempo Restante",
            "3": "Status da Frequência Cardíaca",
            "4": "Recuperação Ativa"
          }
        },
        "trainingStatus": {
          "title": "Status do Treino",
          "items": {
            "0": "Risco de Overtraining",
            "1": "Dias de Descanso Semanais",
            "2": "Status de Deload"
          }
        },
        "tips": {
          "title": "Otimização da Recuperação",
          "items": [
            "Monitore sua frequência cardíaca de repouso toda manhã — uma elevação de 5+ BPM significa que você precisa de mais recuperação",
            "O sono é a ferramenta de recuperação #1 — priorize 7-9 horas de sono de qualidade todas as noites",
            "A hidratação importa — desidratação diminui a recuperação em até 25% e prejudica o desempenho",
            "Alterne dias difíceis e fáceis — nunca empilhe 3+ sessões de esforço máximo consecutivas sem recuperação"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "O Que É Recuperação do Treino?",
          "content": "A recuperação do treino é o processo biológico de reparar o tecido muscular, repor estoques de glicogênio e restaurar a função do sistema nervoso após o exercício. Quando você treina, cria dano controlado às fibras musculares através de tensão mecânica e estresse metabólico. Seu corpo então reconstrói essas fibras mais fortes durante períodos de descanso — um processo chamado supercompensação. Sem recuperação adequada, este processo é interrompido, levando ao progresso estagnado, fadiga acumulada e aumento do risco de lesões. Recuperação não é simplesmente a ausência de treino; é um processo fisiológico ativo influenciado pela qualidade do sono, nutrição, níveis de estresse, hidratação, variabilidade da frequência cardíaca e as demandas específicas do seu treino. Atletas de elite monitoram a frequência cardíaca de repouso (FCR) e variabilidade da frequência cardíaca (VFC) diariamente para acompanhar objetivamente o status de recuperação. Entender suas necessidades de recuperação é o que separa o treino inteligente do overtraining."
        },
        "howItWorks": {
          "title": "Como Esta Calculadora Funciona",
          "content": "Esta calculadora avançada avalia sua prontidão para treinar analisando três categorias de fatores. Primeiro, avalia as demandas do seu treino — tipo, intensidade, duração, grupos musculares envolvidos, trabalho excêntrico e objetivo do treino. Segundo, avalia sua capacidade de recuperação — qualidade e duração do sono, níveis de estresse, dor muscular, hidratação, estado nutricional, idade e experiência de treino. Terceiro, incorpora biomarcadores objetivos — sua frequência cardíaca de repouso comparada à linha de base, horas desde seu último treino e estado atual de saúde. Esses fatores são combinados em uma Pontuação de Prontidão de 0 a 100, onde pontuações mais altas indicam maior prontidão para treinar. A calculadora também estima o tempo total de recuperação necessário, calcula o tempo restante baseado nas horas desde o treino, avalia o risco de overtraining baseado na fadiga cumulativa e elevação da frequência cardíaca, recomenda dias de descanso semanais, avalia o tempo de deload e fornece sugestões específicas de recuperação ativa adaptadas ao seu estado atual. Se você tiver febre, dor aguda ou infecção, a calculadora substituirá todos os outros fatores e recomendará descanso completo."
        },
        "heartRate": {
          "title": "Frequência Cardíaca e Recuperação",
          "items": [
            {
              "text": "A frequência cardíaca de repouso (FCR) é medida logo pela manhã antes de sair da cama — é o marcador de recuperação mais confiável",
              "type": "info"
            },
            {
              "text": "Uma frequência cardíaca de repouso 5+ BPM acima da sua linha de base normal indica recuperação incompleta e estresse elevado no seu corpo",
              "type": "warning"
            },
            {
              "text": "A variabilidade da frequência cardíaca (VFC) mede a variação entre batimentos cardíacos — VFC maior geralmente indica melhor recuperação",
              "type": "info"
            },
            {
              "text": "Monitore a FCR consistentemente por 2-4 semanas para estabelecer sua linha de base pessoal, já que as linhas de base individuais variam de 40-80 BPM",
              "type": "info"
            },
            {
              "text": "Fatores que elevam a FCR: sono ruim, doença, desidratação, overtraining, álcool, estresse e recuperação incompleta",
              "type": "warning"
            },
            {
              "text": "Se sua FCR estiver elevada 10+ BPM acima da linha de base e permanecer elevada por vários dias, descanse completamente imediatamente",
              "type": "warning"
            }
          ]
        },
        "hydrationRecovery": {
          "title": "Hidratação e Recuperação",
          "items": [
            {
              "text": "Mesmo 2% de desidratação pode diminuir a recuperação muscular em até 25% e prejudicar significativamente o desempenho de força",
              "type": "warning"
            },
            {
              "text": "Verifique a cor da urina diariamente — amarelo escuro indica desidratação, amarelo claro é ótimo, transparente significa bem hidratado",
              "type": "info"
            },
            {
              "text": "Beba 0,5-1 oz de água por libra de peso corporal diariamente, mais extra para perda de suor durante o treino",
              "type": "info"
            },
            {
              "text": "Eletrólitos importam — sódio, potássio e magnésio são perdidos através do suor e precisam ser repostos",
              "type": "info"
            },
            {
              "text": "Cafeína e álcool são diuréticos que aumentam a perda de fluidos — compense com ingestão extra de água",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculos",
          "description": "Como diferentes cenários afetam a recuperação com dados de frequência cardíaca",
          "examples": [
            {
              "title": "Exemplo 1: Recuperação Normal",
              "steps": [
                "Treino: Força moderada, 60 min, há 24h",
                "Sono: 8 horas, boa qualidade",
                "FCR: 58 BPM (linha de base normal: 56)",
                "Hidratação: Ótima",
                "Saúde: Sem problemas"
              ],
              "result": "Prontidão: 88/100 → Treino Normal | Recuperação: 36h total, 12h restantes"
            },
            {
              "title": "Exemplo 2: Alerta de Frequência Cardíaca Elevada",
              "steps": [
                "Treino: Esforço máximo pernas, 90 min, há 20h",
                "Sono: 6 horas, qualidade regular",
                "FCR: 68 BPM (linha de base normal: 52) ← +16 BPM!",
                "Dor severa, estresse alto",
                "5 dias consecutivos treinando"
              ],
              "result": "Prontidão: 32/100 → Apenas Recuperação Ativa | Recuperação: 96h total, 76h restantes | Frequência Cardíaca: 🔴 Muito Elevada"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Por que a frequência cardíaca de repouso é importante para recuperação?",
          "answer": "A frequência cardíaca de repouso (FCR) é um dos indicadores objetivos mais confiáveis do status de recuperação. Quando seu corpo ainda está se recuperando do estresse do treino, doença ou sono inadequado, seu sistema nervoso permanece em estado elevado, fazendo seu coração bater mais rápido mesmo em repouso. Uma frequência cardíaca de repouso 5+ BPM acima de sua linha de base normal é um sinal claro de que seu corpo precisa de mais tempo de recuperação. Atletas de elite monitoram a FCR todas as manhãs e ajustam seu treino baseado nessas leituras. Pesquisas mostram que treinar com FCR elevada aumenta significativamente o risco de lesões e reduz a qualidade do treino."
        },
        {
          "question": "Como medir minha frequência cardíaca de repouso corretamente?",
          "answer": "Meça sua frequência cardíaca de repouso logo pela manhã, antes de sair da cama, no mesmo horário todos os dias. Coloque dois dedos no pulso ou pescoço, conte batimentos por 60 segundos (ou 30 segundos e multiplique por 2). Alternativamente, use um monitor de atividade ou smartwatch que mede FCR automaticamente durante o sono. Monitore sua FCR por 2-4 semanas para estabelecer sua linha de base pessoal. Sua linha de base é a FCR média quando você se sente bem descansado e saudável. Linhas de base individuais variam amplamente — um atleta de resistência bem treinado pode ter FCR de 40-50 BPM, enquanto uma pessoa não treinada pode ter 70-80 BPM."
        },
        {
          "question": "O que devo fazer se minha frequência cardíaca estiver elevada?",
          "answer": "Se sua frequência cardíaca de repouso estiver 5-9 BPM acima da linha de base, reduza intensidade e volume do treino em 30-50% — faça uma sessão fácil de recuperação ativa ou descanse completamente. Se sua FCR estiver 10+ BPM acima da linha de base, descanse completamente e foque no sono, hidratação e gerenciamento de estresse. Se a elevação persistir por 3+ dias consecutivos, considere descansar 2-3 dias ou agendar uma semana de deload. Causas comuns de FCR elevada incluem sono inadequado, overtraining, desidratação, doença, alto estresse da vida, consumo de álcool e nutrição ruim. Trate esses fatores primeiro antes de retomar treino pesado."
        },
        {
          "question": "Como a desidratação afeta a recuperação?",
          "answer": "A desidratação tem um impacto negativo profundo na recuperação. Mesmo 2% de desidratação (perder 1,5 kg de água para uma pessoa de 70 kg) pode reduzir a síntese proteica muscular em até 25%, prejudicar o reabastecimento de glicogênio muscular e diminuir a remoção de produtos residuais metabólicos do tecido muscular danificado. A desidratação também reduz o volume sanguíneo, forçando seu coração a trabalhar mais, o que eleva a frequência cardíaca de repouso. Prejudica a termorregulação, aumenta o esforço percebido e reduz força e potência em 10-20%. Verifique a cor da sua urina diariamente — amarelo escuro indica desidratação. Mire em urina amarelo claro e beba pelo menos 35ml de água por kg de peso corporal diariamente."
        },
        {
          "question": "Devo treinar se estiver doente ou com febre?",
          "answer": "Não. Nunca treine com febre, infecção ou doença aguda. Esta calculadora sempre recomendará descanso completo se você indicar que está doente ou lesionado, independentemente de outros fatores. Treinar doente suprime ainda mais a função imunológica, prolonga a doença e pode levar a complicações sérias como miocardite (inflamação do coração). A 'regra do pescoço' é uma diretriz geral: sintomas acima do pescoço (nariz escorrendo, dor de garganta leve) podem permitir exercício leve, mas sintomas abaixo do pescoço (congestão no peito, dores no corpo, febre) requerem descanso completo. Na dúvida, descanse. Perder alguns dias de treino para se recuperar completamente é muito melhor que treinar doente e ficar afastado por semanas."
        },
        {
          "question": "Quantos dias de descanso preciso por semana?",
          "answer": "O número de dias de descanso depende da intensidade do treino, volume, nível de experiência, idade e capacidade de recuperação. Iniciantes precisam de 3-4 dias de descanso por semana enquanto seus corpos se adaptam ao estresse do treino. Intermediários tipicamente precisam de 2-3 dias de descanso. Atletas avançados podem treinar 5-6 dias por semana mas devem alternar sessões pesadas e leves estrategicamente. Atletas de elite frequentemente treinam 6 dias por semana mas incorporam recuperação ativa, trabalho de mobilidade e semanas de deload. Princípio chave: combine seu descanso à sua capacidade real de recuperação, não a um cronograma fixo. Monitore frequência cardíaca de repouso, qualidade do sono, níveis de dor e métricas de desempenho para determinar se está obtendo recuperação adequada."
        },
        {
          "question": "O que é uma semana de deload e quando devo fazê-la?",
          "answer": "Uma semana de deload é uma redução planejada no volume de treino (tipicamente 40-60% menos) mantendo ou reduzindo ligeiramente a intensidade. Semanas de deload previnem acúmulo de fadiga cumulativa, permitem recuperação completa e re-sensibilizam músculos ao estímulo do treino. A maioria das pessoas se beneficia de um deload a cada 4-8 semanas dependendo da intensidade do treino e nível de experiência. Iniciantes devem fazer deload a cada 3-4 semanas, intermediários a cada 4-6 semanas, avançados a cada 6-8 semanas, e atletas de elite podem fazer deload a cada 8-12 semanas. Sinais de que você precisa de deload imediato: frequência cardíaca de repouso persistentemente elevada, desempenho estagnado ou em declínio, dor muscular persistente, qualidade do sono ruim, irritabilidade aumentada e perda de motivação. Uma semana de deload bem cronometrada frequentemente leva a novos recordes pessoais na semana seguinte."
        },
        {
          "question": "Posso usar esta calculadora se não monitoro frequência cardíaca?",
          "answer": "Sim, absolutamente. Os campos de frequência cardíaca de repouso são opcionais. Se você não inserir dados de frequência cardíaca, a calculadora ainda fornecerá pontuações de prontidão e recomendações de recuperação precisas baseadas na carga de treino, sono, estresse, dor, hidratação, nutrição e tempo desde o treino. No entanto, adicionar dados de frequência cardíaca melhora significativamente a precisão porque fornece um biomarcador objetivo do status de recuperação. Se você treina seriamente e quer otimizar desempenho evitando overtraining, considere investir em um monitor de frequência cardíaca básico ou rastreador de atividade que mede frequência cardíaca de repouso. Muitos smartwatches e rastreadores de atividade agora medem FCR automaticamente durante o sono, tornando effortless monitorar essa métrica valiosa."
        }
      ],
      "detailedTable": {
        "title": "Detalhamento dos Fatores de Recuperação",
        "buttonLabel": "Ver Detalhamento Completo",
        "columns": [
          "Fator",
          "Seu Status",
          "Impacto",
          "Avaliação"
        ]
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
      "name": "Calculateur de Jour de Repos",
      "slug": "calculateur-jour-repos",
      "subtitle": "Calculateur de récupération avancé avec surveillance de la fréquence cardiaque, suivi d'hydratation et scores de préparation personnalisés",
      "breadcrumb": "Jour de Repos",
      "seo": {
        "title": "Calculateur de Jour de Repos — Fréquence Cardiaque, VFC et Planificateur de Récupération",
        "description": "Calculez votre préparation à l'entraînement avec surveillance de la fréquence cardiaque, suivi d'hydratation et analyse du sommeil. Obtenez un temps de récupération personnalisé, une évaluation du risque de surentraînement et des plans de récupération active.",
        "shortDescription": "Devriez-vous vous entraîner aujourd'hui ? Obtenez votre score de préparation avec les données VFC et fréquence cardiaque",
        "keywords": [
          "calculateur jour de repos",
          "calculateur VFC",
          "récupération variabilité fréquence cardiaque",
          "fréquence cardiaque repos surentraînement",
          "fréquence cardiaque récupération",
          "calculateur récupération entraînement",
          "score préparation entraînement",
          "calculateur risque surentraînement"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "mode": {
          "label": "Mode du Calculateur",
          "helpText": "Le mode simple pose 6 questions. Le mode avancé inclut la fréquence cardiaque, l'hydratation, la nutrition et 17 facteurs au total.",
          "options": {
            "simple": "⚡ Simple (Vérification Rapide)",
            "advanced": "🔬 Avancé (Analyse Complète)"
          }
        },
        "workoutType": {
          "label": "Type de Dernier Entraînement",
          "helpText": "Quel type d'entraînement avez-vous fait ?",
          "options": {
            "strength": "Musculation",
            "cardio": "Cardio / Endurance",
            "hiit": "HIIT / CrossFit",
            "sport": "Sport / Loisir",
            "mixed": "Mixte / Circuit"
          }
        },
        "intensity": {
          "label": "Intensité de l'Entraînement (EPE)",
          "helpText": "Échelle de Perception de l'Effort — à quel point c'était difficile ?",
          "options": {
            "light": "Léger (EPE 1-3) — Pouvais parler facilement",
            "moderate": "Modéré (EPE 4-6) — Difficile mais gérable",
            "hard": "Dur (EPE 7-8) — Près de l'échec sur certaines séries",
            "max": "Effort Maximal (EPE 9-10) — Tout ce que j'avais"
          }
        },
        "duration": {
          "label": "Durée de l'Entraînement",
          "helpText": "Temps total d'entraînement en minutes"
        },
        "muscleGroup": {
          "label": "Groupes Musculaires Travaillés",
          "helpText": "Sur quelle zone vous êtes-vous concentré ?",
          "options": {
            "upper": "Haut du Corps (pectoraux, dos, bras, épaules)",
            "lower": "Bas du Corps (quadriceps, ischio-jambiers, fessiers, mollets)",
            "fullBody": "Corps Entier (mouvements composés)",
            "core": "Core / Isolation Seulement"
          }
        },
        "eccentricFocus": {
          "label": "Travail Excentrique Intense ?",
          "helpText": "Négatives lentes, soulevés de terre roumains ou exercices axés excentriques causent plus de dommages musculaires",
          "options": {
            "no": "Non",
            "yes": "Oui"
          }
        },
        "trainingGoal": {
          "label": "Objectif Principal d'Entraînement",
          "helpText": "Différents objectifs nécessitent différentes stratégies de récupération",
          "options": {
            "strength": "Force Maximale (lourd, peu de répétitions)",
            "hypertrophy": "Volume Musculaire (8-12 répétitions)",
            "endurance": "Endurance (cardio, longue durée)",
            "power": "Puissance (explosif, pliométrie)",
            "general": "Fitness Général"
          }
        },
        "hoursSinceWorkout": {
          "label": "Heures Depuis le Dernier Entraînement",
          "helpText": "Plus précis que les jours — utile si vous vous entraînez deux fois par jour"
        },
        "consecutiveDays": {
          "label": "Jours d'Entraînement Consécutifs",
          "helpText": "Combien de jours consécutifs vous êtes-vous entraîné ?"
        },
        "weeksWithoutDeload": {
          "label": "Semaines Sans Décharge",
          "helpText": "Combien de semaines depuis votre dernière semaine de repos/décharge ?"
        },
        "sleepHours": {
          "label": "Sommeil la Nuit Dernière",
          "helpText": "Nombre total d'heures de sommeil",
          "options": {
            "under5": "Moins de 5 heures",
            "5to6": "5-6 heures",
            "6to7": "6-7 heures",
            "7to8": "7-8 heures",
            "8to9": "8-9 heures",
            "9plus": "9+ heures"
          }
        },
        "sleepQuality": {
          "label": "Qualité du Sommeil",
          "helpText": "À quel point votre sommeil était-il réparateur ?",
          "options": {
            "poor": "Mauvaise — Réveillé plusieurs fois",
            "fair": "Correcte — Quelques interruptions",
            "good": "Bonne — Plutôt solide",
            "excellent": "Excellente — Profond, ininterrompu"
          }
        },
        "soreness": {
          "label": "Courbatures Actuelles",
          "helpText": "À quel point vos muscles sont-ils endoloris maintenant ?",
          "options": {
            "none": "Aucune — Me sens frais",
            "mild": "Légères — Légère tension",
            "moderate": "Modérées — Perceptibles en bougeant",
            "severe": "Sévères — Mal en bougeant normalement"
          }
        },
        "stressLevel": {
          "label": "Niveau de Stress de Vie",
          "helpText": "Travail, relations, finances — tout s'additionne",
          "options": {
            "low": "Faible — Les choses sont calmes",
            "moderate": "Modéré — Un peu de pression",
            "high": "Élevé — Stressé",
            "veryHigh": "Très Élevé — Submergé"
          }
        },
        "hydration": {
          "label": "État d'Hydratation",
          "helpText": "Vérifiez la couleur de votre urine — jaune foncé = mauvais, pâle = bon, claire = optimal",
          "options": {
            "poor": "Mauvais — Urine foncée, soif",
            "adequate": "Adéquat — Jaune clair",
            "optimal": "Optimal — Urine claire/pâle"
          }
        },
        "nutritionStatus": {
          "label": "Nutrition Actuelle",
          "helpText": "Votre équilibre calorique affecte la vitesse de récupération",
          "options": {
            "deficit": "Déficit Calorique (sèche)",
            "maintenance": "Calories de Maintenance",
            "surplus": "Surplus Calorique (prise de masse)"
          }
        },
        "healthStatus": {
          "label": "État de Santé",
          "helpText": "NE vous entraînez PAS si vous avez de la fièvre, une douleur aiguë ou une infection",
          "options": {
            "healthy": "En Bonne Santé — Aucun problème",
            "mild": "Léger — Petit rhume, allergies",
            "sick": "Malade — Fièvre, grippe, infection",
            "injured": "Blessé — Douleur aiguë, entorse"
          }
        },
        "restingHeartRate": {
          "label": "Fréquence Cardiaque de Repos (Optionnel)",
          "helpText": "Votre fréquence cardiaque ce matin avant de sortir du lit. Laissez vide si vous ne suivez pas cela."
        },
        "normalRestingHR": {
          "label": "FC de Repos Normale (Optionnel)",
          "helpText": "Votre fréquence cardiaque de repos typique quand vous êtes bien reposé. Nécessaire seulement si vous avez entré la FC ci-dessus."
        },
        "age": {
          "label": "Âge",
          "helpText": "La récupération ralentit avec l'âge — ceci ajuste votre estimation"
        },
        "experience": {
          "label": "Expérience d'Entraînement",
          "helpText": "Depuis combien de temps vous entraînez-vous régulièrement ?",
          "options": {
            "beginner": "Débutant (moins d'1 an)",
            "intermediate": "Intermédiaire (1-3 ans)",
            "advanced": "Avancé (3-5 ans)",
            "elite": "Élite (5+ ans)"
          }
        }
      },
      "results": {
        "readinessScore": {
          "label": "Score de Préparation"
        },
        "restType": {
          "label": "Recommandation d'Aujourd'hui"
        },
        "recoveryHours": {
          "label": "Temps de Récupération Nécessaire"
        },
        "timeRemaining": {
          "label": "Temps de Récupération Restant"
        },
        "overtrainingRisk": {
          "label": "Risque de Surentraînement"
        },
        "weeklyRestDays": {
          "label": "Jours de Repos Hebdomadaires Nécessaires"
        },
        "deloadStatus": {
          "label": "État de Décharge"
        },
        "heartRateStatus": {
          "label": "État de la Fréquence Cardiaque"
        },
        "activeRecovery": {
          "label": "Plan de Récupération Active"
        }
      },
      "presets": {
        "beginner": {
          "label": "Débutant",
          "description": "Nouveau à l'entraînement, exercice léger, bon sommeil, pas de données de fréquence cardiaque"
        },
        "weekendWarrior": {
          "label": "Guerrier du Week-end",
          "description": "HIIT modéré, style de vie occupé, perte de poids, récupération moyenne"
        },
        "seriousLifter": {
          "label": "Haltérophile Sérieux",
          "description": "Jour de jambes intense avec excentriques, suivi VFC, bien récupéré"
        },
        "competitionPrep": {
          "label": "Préparation Compétition",
          "description": "Intensité maximale, volume élevé, fatigue accumulée, FC de repos élevée"
        }
      },
      "tooltips": {
        "readinessScore": "Score 0-100 basé sur la charge d'entraînement, sommeil, stress, fréquence cardiaque et temps de récupération. Plus élevé = plus prêt à s'entraîner.",
        "restType": "Recommandation personnalisée pour aujourd'hui basée sur toutes vos données.",
        "recoveryHours": "Nombre total d'heures estimées dont votre corps a besoin pour récupérer complètement du dernier entraînement.",
        "timeRemaining": "Heures restantes jusqu'à ce que vous soyez complètement récupéré, basé sur le temps depuis l'entraînement.",
        "overtrainingRisk": "Niveau de risque basé sur la fréquence d'entraînement, l'intensité, la fatigue accumulée et l'élévation de la fréquence cardiaque.",
        "weeklyRestDays": "Combien de jours de repos ou de récupération active vous devriez prendre par semaine.",
        "deloadStatus": "Si vous avez besoin d'une semaine de décharge et quand la programmer.",
        "heartRateStatus": "Fréquence cardiaque de repos comparée à votre ligne de base normale. L'élévation indique une récupération incomplète.",
        "activeRecovery": "Activités suggérées basées sur votre état de récupération actuel."
      },
      "values": {
        "Full Rest": "Repos Complet",
        "Active Recovery": "Récupération Active",
        "Light Training": "Entraînement Léger",
        "Normal Training": "Entraînement Normal",
        "Low": "Faible",
        "Moderate": "Modéré",
        "High": "Élevé",
        "Critical": "Critique",
        "hours": "heures",
        "hour": "heure",
        "days": "jours",
        "day": "jour",
        "weeks": "semaines",
        "week": "semaine",
        "h": "h",
        "Deload now!": "Décharge maintenant !",
        "In": "Dans",
        "✅ Optimal": "✅ Optimal",
        "✅ Good": "✅ Bon",
        "⚠️ Moderate": "⚠️ Modéré",
        "⚠️ High": "⚠️ Élevé",
        "🔴 Critical": "🔴 Critique",
        "Complete rest — sleep, hydrate, eat well": "Repos complet — dormir, s'hydrater, bien manger",
        "Light walk 20-30 min, gentle stretching, foam rolling": "Marche légère 20-30 min, étirements doux, rouleau de massage",
        "Yoga, mobility work, technique drills at 50% effort": "Yoga, travail de mobilité, exercices techniques à 50% d'effort",
        "Fully recovered — warm up well and train hard": "Complètement récupéré — bien s'échauffer et s'entraîner dur",
        "🟢 Normal": "🟢 Normal",
        "⚠️ Elevated": "⚠️ Élevé",
        "🔴 High Elevation": "🔴 Élévation Importante",
        "N/A — Not tracking": "N/A — Non suivi",
        "🚨 DO NOT TRAIN": "🚨 NE PAS S'ENTRAÎNER",
        "Factor": "Facteur",
        "Your Status": "Votre État",
        "Impact": "Impact",
        "Rating": "Évaluation",
        "TOTAL": "TOTAL",
        "Workout Load": "Charge d'Entraînement",
        "Muscle Group": "Groupe Musculaire",
        "Eccentric Stress": "Stress Excentrique",
        "Training Goal": "Objectif d'Entraînement",
        "Time Passed": "Temps Écoulé",
        "Sleep": "Sommeil",
        "Stress & Soreness": "Stress et Courbatures",
        "Hydration": "Hydratation",
        "Nutrition": "Nutrition",
        "Health Status": "État de Santé",
        "Heart Rate": "Fréquence Cardiaque",
        "Age & Experience": "Âge et Expérience",
        "Cumulative Fatigue": "Fatigue Cumulative",
        "None": "Aucune"
      },
      "formats": {
        "summary": "Votre score de préparation est {readinessScore}/100 ({restType}). Vous avez besoin de {recoveryHours} de récupération totale, avec {timeRemaining} restant. Risque de surentraînement : {overtrainingRisk}."
      },
      "infoCards": {
        "recoveryOverview": {
          "title": "Aperçu de la Récupération",
          "items": {
            "0": "Score de Préparation",
            "1": "Recommandation",
            "2": "Temps Restant",
            "3": "État Fréquence Cardiaque",
            "4": "Récupération Active"
          }
        },
        "trainingStatus": {
          "title": "État d'Entraînement",
          "items": {
            "0": "Risque de Surentraînement",
            "1": "Jours de Repos Hebdomadaires",
            "2": "État de Décharge"
          }
        },
        "tips": {
          "title": "Optimisation de la Récupération",
          "items": [
            "Suivez votre fréquence cardiaque de repos chaque matin — une élévation de 5+ BPM signifie que vous avez besoin de plus de récupération",
            "Le sommeil est l'outil de récupération n°1 — priorisez 7-9 heures de sommeil de qualité chaque nuit",
            "L'hydratation compte — la déshydratation ralentit la récupération jusqu'à 25% et nuit aux performances",
            "Alternez jours difficiles et faciles — ne jamais enchaîner 3+ séances d'effort maximal consécutives sans récupération"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que la Récupération d'Entraînement ?",
          "content": "La récupération d'entraînement est le processus biologique de réparation des tissus musculaires, de reconstitution des réserves de glycogène et de restauration de la fonction du système nerveux après l'exercice. Quand vous vous entraînez, vous créez des dommages contrôlés aux fibres musculaires par tension mécanique et stress métabolique. Votre corps reconstruit ensuite ces fibres plus fortes pendant les périodes de repos — un processus appelé surcompensation. Sans récupération adéquate, ce processus est interrompu, menant à des progrès stagnants, une fatigue accumulée et un risque de blessure accru. La récupération n'est pas simplement l'absence d'entraînement ; c'est un processus physiologique actif influencé par la qualité du sommeil, la nutrition, les niveaux de stress, l'hydratation, la variabilité de la fréquence cardiaque et les demandes spécifiques de votre entraînement. Les athlètes d'élite surveillent quotidiennement la fréquence cardiaque de repos (FCR) et la variabilité de la fréquence cardiaque (VFC) pour suivre objectivement l'état de récupération. Comprendre vos besoins de récupération est ce qui sépare l'entraînement intelligent du surentraînement."
        },
        "howItWorks": {
          "title": "Comment Fonctionne ce Calculateur",
          "content": "Ce calculateur avancé évalue votre préparation à l'entraînement en analysant trois catégories de facteurs. D'abord, il évalue les exigences de votre entraînement — le type, l'intensité, la durée, les groupes musculaires impliqués, le travail excentrique et l'objectif d'entraînement. Ensuite, il évalue votre capacité de récupération — qualité et durée du sommeil, niveaux de stress, courbatures musculaires, hydratation, état nutritionnel, âge et expérience d'entraînement. Troisièmement, il incorpore des biomarqueurs objectifs — votre fréquence cardiaque de repos comparée à la ligne de base, heures depuis votre dernier entraînement et état de santé actuel. Ces facteurs sont combinés en un Score de Préparation de 0 à 100, où des scores plus élevés indiquent une plus grande préparation à s'entraîner. Le calculateur estime aussi le temps de récupération total nécessaire, calcule le temps restant basé sur les heures depuis l'entraînement, évalue le risque de surentraînement basé sur la fatigue cumulative et l'élévation de la fréquence cardiaque, recommande des jours de repos hebdomadaires, évalue le timing de décharge, et fournit des suggestions spécifiques de récupération active adaptées à votre état actuel. Si vous avez de la fièvre, une douleur aiguë ou une infection, le calculateur ignorera tous les autres facteurs et recommandera un repos complet."
        },
        "heartRate": {
          "title": "Fréquence Cardiaque et Récupération",
          "items": [
            {
              "text": "La fréquence cardiaque de repos (FCR) se mesure le matin au réveil avant de sortir du lit — c'est le marqueur de récupération le plus fiable",
              "type": "info"
            },
            {
              "text": "Une fréquence cardiaque de repos 5+ BPM au-dessus de votre ligne de base normale indique une récupération incomplète et un stress élevé sur votre corps",
              "type": "warning"
            },
            {
              "text": "La variabilité de la fréquence cardiaque (VFC) mesure la variation entre les battements cardiaques — une VFC plus élevée indique généralement une meilleure récupération",
              "type": "info"
            },
            {
              "text": "Suivez la FCR régulièrement pendant 2-4 semaines pour établir votre ligne de base personnelle, car les lignes de base individuelles varient de 40-80 BPM",
              "type": "info"
            },
            {
              "text": "Facteurs qui élèvent la FCR : mauvais sommeil, maladie, déshydratation, surentraînement, alcool, stress et récupération incomplète",
              "type": "warning"
            },
            {
              "text": "Si votre FCR est élevée de 10+ BPM au-dessus de la ligne de base et reste élevée plusieurs jours, prenez immédiatement un jour de repos complet",
              "type": "warning"
            }
          ]
        },
        "hydrationRecovery": {
          "title": "Hydratation et Récupération",
          "items": [
            {
              "text": "Même 2% de déshydratation peut ralentir la récupération musculaire jusqu'à 25% et nuire significativement aux performances de force",
              "type": "warning"
            },
            {
              "text": "Vérifiez quotidiennement la couleur de l'urine — jaune foncé indique déshydratation, jaune pâle est optimal, claire signifie bien hydraté",
              "type": "info"
            },
            {
              "text": "Buvez 0,5-1 oz d'eau par livre de poids corporel quotidiennement, plus extra pour les pertes de sueur pendant l'entraînement",
              "type": "info"
            },
            {
              "text": "Les électrolytes comptent — sodium, potassium et magnésium sont perdus par la sueur et nécessitent reconstitution",
              "type": "info"
            },
            {
              "text": "La caféine et l'alcool sont diurétiques qui augmentent la perte de liquide — compensez avec un apport d'eau supplémentaire",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calculs",
          "description": "Comment différents scénarios affectent la récupération avec données de fréquence cardiaque",
          "examples": [
            {
              "title": "Exemple 1 : Récupération Normale",
              "steps": [
                "Entraînement : Force modérée, 60 min, il y a 24h",
                "Sommeil : 8 heures, bonne qualité",
                "FCR : 58 BPM (ligne de base normale : 56)",
                "Hydratation : Optimale",
                "Santé : Aucun problème"
              ],
              "result": "Préparation : 88/100 → Entraînement Normal | Récupération : 36h total, 12h restant"
            },
            {
              "title": "Exemple 2 : Avertissement Fréquence Cardiaque Élevée",
              "steps": [
                "Entraînement : Jambes effort max, 90 min, il y a 20h",
                "Sommeil : 6 heures, qualité correcte",
                "FCR : 68 BPM (ligne de base normale : 52) ← +16 BPM !",
                "Courbatures sévères, stress élevé",
                "5 jours d'entraînement consécutifs"
              ],
              "result": "Préparation : 32/100 → Récupération Active Seulement | Récupération : 96h total, 76h restant | Fréquence Cardiaque : 🔴 Élévation Importante"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Pourquoi la fréquence cardiaque de repos est-elle importante pour la récupération ?",
          "answer": "La fréquence cardiaque de repos (FCR) est l'un des indicateurs objectifs les plus fiables de l'état de récupération. Quand votre corps récupère encore du stress d'entraînement, de maladie ou de sommeil inadéquat, votre système nerveux reste dans un état élevé, causant un battement cardiaque plus rapide même au repos. Une fréquence cardiaque de repos 5+ BPM au-dessus de votre ligne de base normale est un signal clair que votre corps a besoin de plus de temps de récupération. Les athlètes d'élite suivent la FCR chaque matin et ajustent leur entraînement basé sur ces lectures. La recherche montre que s'entraîner avec une FCR élevée augmente significativement le risque de blessure et réduit la qualité de l'entraînement."
        },
        {
          "question": "Comment mesurer correctement ma fréquence cardiaque de repos ?",
          "answer": "Mesurez votre fréquence cardiaque de repos le matin au réveil, avant de sortir du lit, à la même heure chaque jour. Placez deux doigts sur votre poignet ou cou, comptez les battements pendant 60 secondes (ou 30 secondes et multipliez par 2). Alternativement, utilisez un tracker de fitness ou montre connectée qui mesure automatiquement la FCR pendant le sommeil. Suivez votre FCR pendant 2-4 semaines pour établir votre ligne de base personnelle. Votre ligne de base est la FCR moyenne quand vous vous sentez bien reposé et en bonne santé. Les lignes de base individuelles varient largement — un athlète d'endurance bien entraîné pourrait avoir une FCR de 40-50 BPM, tandis qu'une personne non entraînée pourrait être à 70-80 BPM."
        },
        {
          "question": "Que dois-je faire si ma fréquence cardiaque est élevée ?",
          "answer": "Si votre fréquence cardiaque de repos est 5-9 BPM au-dessus de la ligne de base, réduisez l'intensité et le volume d'entraînement de 30-50% — faites une séance de récupération active facile ou prenez un jour de repos complet. Si votre FCR est 10+ BPM au-dessus de la ligne de base, prenez un jour de repos complet et concentrez-vous sur le sommeil, l'hydratation et la gestion du stress. Si l'élévation persiste pendant 3+ jours consécutifs, considérez prendre 2-3 jours de repos ou programmer une semaine de décharge. Les causes communes d'une FCR élevée incluent le sommeil inadéquat, le surentraînement, la déshydratation, la maladie, le stress élevé de la vie, la consommation d'alcool et une mauvaise nutrition. Adressez ces facteurs d'abord avant de reprendre l'entraînement dur."
        },
        {
          "question": "Comment la déshydratation affecte-t-elle la récupération ?",
          "answer": "La déshydratation a un impact négatif profond sur la récupération. Même 2% de déshydratation (perdre 1,5 kg d'eau pour une personne de 75 kg) peut réduire la synthèse des protéines musculaires jusqu'à 25%, nuire à la reconstitution du glycogène musculaire, et ralentir l'élimination des déchets métaboliques des tissus musculaires endommagés. La déshydratation réduit aussi le volume sanguin, forçant votre cœur à travailler plus dur, ce qui élève la fréquence cardiaque de repos. Elle nuit à la thermorégulation, augmente l'effort perçu, et réduit la force et la puissance de sortie de 10-20%. Vérifiez quotidiennement la couleur de votre urine — jaune foncé indique déshydratation. Visez une urine jaune pâle et buvez au moins 0,5 oz d'eau par livre de poids corporel quotidiennement."
        },
        {
          "question": "Devrais-je m'entraîner si je suis malade ou si j'ai de la fièvre ?",
          "answer": "Non. Ne vous entraînez jamais avec de la fièvre, une infection ou une maladie aiguë. Ce calculateur recommandera toujours un repos complet si vous indiquez que vous êtes malade ou blessé, indépendamment des autres facteurs. S'entraîner quand on est malade supprime davantage la fonction immunitaire, prolonge la maladie, et peut mener à des complications sérieuses comme la myocardite (inflammation cardiaque). La 'règle du cou' est une directive générale : symptômes au-dessus du cou (nez qui coule, mal de gorge léger) pourraient permettre un exercice léger, mais symptômes en-dessous du cou (congestion thoracique, courbatures corporelles, fièvre) nécessitent un repos complet. En cas de doute, reposez-vous. Manquer quelques jours d'entraînement pour récupérer complètement est bien mieux que s'entraîner malade et être écarté pendant des semaines."
        },
        {
          "question": "Combien de jours de repos ai-je besoin par semaine ?",
          "answer": "Le nombre de jours de repos dépend de l'intensité d'entraînement, du volume, du niveau d'expérience, de l'âge et de la capacité de récupération. Les débutants ont besoin de 3-4 jours de repos par semaine pendant que leurs corps s'adaptent au stress d'entraînement. Les pratiquants intermédiaires ont typiquement besoin de 2-3 jours de repos. Les athlètes avancés peuvent s'entraîner 5-6 jours par semaine mais doivent alterner stratégiquement séances dures et faciles. Les athlètes d'élite s'entraînent souvent 6 jours par semaine mais incorporent récupération active, travail de mobilité et semaines de décharge. Principe clé : adaptez votre repos à votre capacité de récupération réelle, pas un horaire fixe. Surveillez la fréquence cardiaque de repos, la qualité du sommeil, les niveaux de courbatures et les métriques de performance pour déterminer si vous obtenez une récupération adéquate."
        },
        {
          "question": "Qu'est-ce qu'une semaine de décharge et quand devrais-je en prendre une ?",
          "answer": "Une semaine de décharge est une réduction planifiée du volume d'entraînement (typiquement 40-60% de moins) tout en maintenant ou réduisant légèrement l'intensité. Les semaines de décharge préviennent l'accumulation de fatigue cumulative, permettent une récupération complète et re-sensibilisent les muscles au stimulus d'entraînement. La plupart des gens bénéficient d'une décharge toutes les 4-8 semaines selon l'intensité d'entraînement et le niveau d'expérience. Les débutants devraient décharger toutes les 3-4 semaines, les intermédiaires toutes les 4-6 semaines, les pratiquants avancés toutes les 6-8 semaines, et les athlètes d'élite peuvent décharger toutes les 8-12 semaines. Signes que vous avez besoin d'une décharge immédiate : fréquence cardiaque de repos persistamment élevée, performance stagnante ou déclinante, courbatures musculaires persistantes, mauvaise qualité de sommeil, irritabilité accrue et perte de motivation. Une semaine de décharge bien programmée mène souvent à de nouveaux records personnels la semaine suivante."
        },
        {
          "question": "Puis-je utiliser ce calculateur si je ne suis pas la fréquence cardiaque ?",
          "answer": "Oui, absolument. Les champs de fréquence cardiaque de repos sont optionnels. Si vous n'entrez pas de données de fréquence cardiaque, le calculateur fournira toujours des scores de préparation et recommandations de récupération précis basés sur la charge d'entraînement, le sommeil, le stress, les courbatures, l'hydratation, la nutrition et le temps depuis l'entraînement. Cependant, ajouter des données de fréquence cardiaque améliore significativement la précision car cela fournit un biomarqueur objectif de l'état de récupération. Si vous vous entraînez sérieusement et voulez optimiser la performance tout en évitant le surentraînement, considérez investir dans un moniteur de fréquence cardiaque de base ou tracker de fitness qui mesure la fréquence cardiaque de repos. Beaucoup de montres connectées et trackers de fitness mesurent maintenant automatiquement la FCR pendant le sommeil, rendant le suivi de cette métrique précieuse sans effort."
        }
      ],
      "detailedTable": {
        "title": "Répartition des Facteurs de Récupération",
        "buttonLabel": "Voir la Répartition Détaillée",
        "columns": [
          "Facteur",
          "Votre État",
          "Impact",
          "Évaluation"
        ]
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
      "name": "Ruhetag Rechner",
      "slug": "ruhetag-rechner",
      "subtitle": "Erweiterte Regenerationsberechnung mit Herzfrequenzüberwachung, Hydrationstracking und personalisierten Bereitschaftswerten",
      "breadcrumb": "Ruhetag",
      "seo": {
        "title": "Ruhetag Rechner — Herzfrequenz, HRV & Regenerationsplaner",
        "description": "Berechnen Sie Ihre Trainingsbereitschaft mit Herzfrequenzüberwachung, Hydrationstracking und Schlafanalyse. Erhalten Sie personalisierte Regenerationszeiten, Übertrainingsrisiko-Bewertung und aktive Erholungspläne.",
        "shortDescription": "Sollten Sie heute trainieren? Erhalten Sie Ihren Bereitschaftswert mit HRV- und Herzfrequenzdaten",
        "keywords": [
          "ruhetag rechner",
          "hrv rechner",
          "herzfrequenzvariabilität regeneration",
          "ruheherzfrequenz übertraining",
          "regenerations herzfrequenz",
          "workout regenerations rechner",
          "trainingsbereitschafts wert",
          "übertrainings risiko rechner"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "mode": {
          "label": "Rechner-Modus",
          "helpText": "Einfacher Modus stellt 6 Fragen. Erweiterter Modus umfasst Herzfrequenz, Hydration, Ernährung und insgesamt 17 Faktoren.",
          "options": {
            "simple": "⚡ Einfach (Schnellcheck)",
            "advanced": "🔬 Erweitert (Vollanalyse)"
          }
        },
        "workoutType": {
          "label": "Letzter Trainingstyp",
          "helpText": "Welche Art von Training haben Sie durchgeführt?",
          "options": {
            "strength": "Krafttraining",
            "cardio": "Cardio / Ausdauer",
            "hiit": "HIIT / CrossFit",
            "sport": "Sport / Freizeit",
            "mixed": "Gemischt / Zirkel"
          }
        },
        "intensity": {
          "label": "Trainingsintensität (RPE)",
          "helpText": "Wahrgenommene Anstrengung — wie schwer fühlte es sich an?",
          "options": {
            "light": "Leicht (RPE 1-3) — Konnte leicht sprechen",
            "moderate": "Moderat (RPE 4-6) — Herausfordernd aber machbar",
            "hard": "Hart (RPE 7-8) — Nahe dem Versagen bei einigen Sätzen",
            "max": "Maximaler Einsatz (RPE 9-10) — Alles was ich hatte"
          }
        },
        "duration": {
          "label": "Trainingsdauer",
          "helpText": "Gesamte Trainingszeit in Minuten"
        },
        "muscleGroup": {
          "label": "Trainierte Muskelgruppen",
          "helpText": "Auf welchen Bereich haben Sie sich konzentriert?",
          "options": {
            "upper": "Oberkörper (Brust, Rücken, Arme, Schultern)",
            "lower": "Unterkörper (Quadrizeps, Beinbeuger, Gesäß, Waden)",
            "fullBody": "Ganzkörper (Verbundübungen)",
            "core": "Core / Nur Isolation"
          }
        },
        "eccentricFocus": {
          "label": "Schwere exzentrische Arbeit?",
          "helpText": "Langsame negative Phasen, rumänische Kreuzheben oder exzentrisch fokussierte Übungen verursachen mehr Muskelschäden",
          "options": {
            "no": "Nein",
            "yes": "Ja"
          }
        },
        "trainingGoal": {
          "label": "Primäres Trainingsziel",
          "helpText": "Verschiedene Ziele erfordern unterschiedliche Regenerationsstrategien",
          "options": {
            "strength": "Maximalkraft (schwer, wenige Wiederholungen)",
            "hypertrophy": "Muskelgröße (8-12 Wiederholungen)",
            "endurance": "Ausdauer (Cardio, lange Dauer)",
            "power": "Kraft (explosiv, plyometrisch)",
            "general": "Allgemeine Fitness"
          }
        },
        "hoursSinceWorkout": {
          "label": "Stunden seit letztem Training",
          "helpText": "Präziser als Tage — hilfreich wenn Sie zweimal täglich trainieren"
        },
        "consecutiveDays": {
          "label": "Aufeinanderfolgende Trainingstage",
          "helpText": "Wie viele Tage hintereinander haben Sie trainiert?"
        },
        "weeksWithoutDeload": {
          "label": "Wochen ohne Entlastung",
          "helpText": "Wie viele Wochen seit Ihrer letzten Ruhe-/Entlastungswoche?"
        },
        "sleepHours": {
          "label": "Schlaf letzte Nacht",
          "helpText": "Gesamte Schlafstunden",
          "options": {
            "under5": "Unter 5 Stunden",
            "5to6": "5-6 Stunden",
            "6to7": "6-7 Stunden",
            "7to8": "7-8 Stunden",
            "8to9": "8-9 Stunden",
            "9plus": "9+ Stunden"
          }
        },
        "sleepQuality": {
          "label": "Schlafqualität",
          "helpText": "Wie erholsam war Ihr Schlaf?",
          "options": {
            "poor": "Schlecht — Mehrfach aufgewacht",
            "fair": "Mäßig — Einige Unterbrechungen",
            "good": "Gut — Größtenteils fest",
            "excellent": "Ausgezeichnet — Tief, ununterbrochen"
          }
        },
        "soreness": {
          "label": "Aktueller Muskelkater",
          "helpText": "Wie stark ist Ihr Muskelkater gerade?",
          "options": {
            "none": "Keiner — Fühle mich frisch",
            "mild": "Leicht — Leichte Verspannung",
            "moderate": "Moderat — Spürbar bei Bewegung",
            "severe": "Stark — Schmerzt bei normaler Bewegung"
          }
        },
        "stressLevel": {
          "label": "Lebensstresslevel",
          "helpText": "Arbeit, Beziehungen, Finanzen — alles summiert sich",
          "options": {
            "low": "Niedrig — Alles ist ruhig",
            "moderate": "Moderat — Etwas Druck",
            "high": "Hoch — Gestresst",
            "veryHigh": "Sehr hoch — Überwältigt"
          }
        },
        "hydration": {
          "label": "Hydrationsstatus",
          "helpText": "Prüfen Sie Ihre Urinfarbe — dunkelgelb = schlecht, blass = gut, klar = optimal",
          "options": {
            "poor": "Schlecht — Dunkler Urin, durstig",
            "adequate": "Ausreichend — Hellgelb",
            "optimal": "Optimal — Klarer/blasser Urin"
          }
        },
        "nutritionStatus": {
          "label": "Aktuelle Ernährung",
          "helpText": "Ihre Kalorienbilanz beeinflusst die Regenerationsgeschwindigkeit",
          "options": {
            "deficit": "Kaloriendefizit (Diät)",
            "maintenance": "Erhaltungskalorien",
            "surplus": "Kalorienüberschuss (Aufbau)"
          }
        },
        "healthStatus": {
          "label": "Gesundheitszustand",
          "helpText": "Trainieren Sie NICHT bei Fieber, akuten Schmerzen oder Infektionen",
          "options": {
            "healthy": "Gesund — Keine Probleme",
            "mild": "Leicht — Kleine Erkältung, Allergien",
            "sick": "Krank — Fieber, Grippe, Infektion",
            "injured": "Verletzt — Akute Schmerzen, Verstauchung"
          }
        },
        "restingHeartRate": {
          "label": "Ruheherzfrequenz (Optional)",
          "helpText": "Ihre Herzfrequenz heute Morgen vor dem Aufstehen. Leer lassen, wenn Sie das nicht verfolgen."
        },
        "normalRestingHR": {
          "label": "Normale Ruhe-HF (Optional)",
          "helpText": "Ihre typische Ruheherzfrequenz wenn gut erholt. Nur nötig, wenn Sie oben RHF eingegeben haben."
        },
        "age": {
          "label": "Alter",
          "helpText": "Regeneration verlangsamt sich mit dem Alter — dies passt Ihre Schätzung an"
        },
        "experience": {
          "label": "Trainingserfahrung",
          "helpText": "Wie lange trainieren Sie schon kontinuierlich?",
          "options": {
            "beginner": "Anfänger (unter 1 Jahr)",
            "intermediate": "Fortgeschritten (1-3 Jahre)",
            "advanced": "Erfahren (3-5 Jahre)",
            "elite": "Elite (5+ Jahre)"
          }
        }
      },
      "results": {
        "readinessScore": {
          "label": "Bereitschaftswert"
        },
        "restType": {
          "label": "Heutige Empfehlung"
        },
        "recoveryHours": {
          "label": "Benötigte Regenerationszeit"
        },
        "timeRemaining": {
          "label": "Verbleibende Regenerationszeit"
        },
        "overtrainingRisk": {
          "label": "Übertrainingsrisiko"
        },
        "weeklyRestDays": {
          "label": "Wöchentlich benötigte Ruhetage"
        },
        "deloadStatus": {
          "label": "Entlastungsstatus"
        },
        "heartRateStatus": {
          "label": "Herzfrequenzstatus"
        },
        "activeRecovery": {
          "label": "Aktiver Erholungsplan"
        }
      },
      "presets": {
        "beginner": {
          "label": "Anfänger",
          "description": "Neu im Training, leichtes Workout, guter Schlaf, keine Herzfrequenzdaten"
        },
        "weekendWarrior": {
          "label": "Wochenend-Kämpfer",
          "description": "Moderates HIIT, stressiger Lebensstil, Gewichtsreduktion, durchschnittliche Regeneration"
        },
        "seriousLifter": {
          "label": "Ernsthafter Kraftsportler",
          "description": "Schwerer Beintag mit Exzentrik, HRV-Tracking, gut erholt"
        },
        "competitionPrep": {
          "label": "Wettkampfvorbereitung",
          "description": "Maximale Intensität, hohes Volumen, akkumulierte Ermüdung, erhöhte RHF"
        }
      },
      "tooltips": {
        "readinessScore": "0-100 Wert basierend auf Trainingsbelastung, Schlaf, Stress, Herzfrequenz und Regenerationszeit. Höher = bereiter zu trainieren.",
        "restType": "Personalisierte Empfehlung für heute basierend auf all Ihren Eingaben.",
        "recoveryHours": "Geschätzte Gesamtstunden, die Ihr Körper braucht, um sich vollständig vom letzten Training zu erholen.",
        "timeRemaining": "Verbleibende Stunden bis Sie vollständig erholt sind, basierend auf Zeit seit Training.",
        "overtrainingRisk": "Risikolevel basierend auf Trainingshäufigkeit, Intensität, akkumulierter Ermüdung und Herzfrequenzerhöhung.",
        "weeklyRestDays": "Wie viele Ruhe- oder aktive Erholungstage Sie pro Woche nehmen sollten.",
        "deloadStatus": "Ob Sie eine Entlastungswoche brauchen und wann Sie sie planen sollten.",
        "heartRateStatus": "Ruheherzfrequenz verglichen mit Ihrer normalen Baseline. Erhöhung zeigt unvollständige Regeneration an.",
        "activeRecovery": "Vorgeschlagene Aktivitäten basierend auf Ihrem aktuellen Regenerationszustand."
      },
      "values": {
        "Full Rest": "Vollständige Ruhe",
        "Active Recovery": "Aktive Erholung",
        "Light Training": "Leichtes Training",
        "Normal Training": "Normales Training",
        "Low": "Niedrig",
        "Moderate": "Moderat",
        "High": "Hoch",
        "Critical": "Kritisch",
        "hours": "Stunden",
        "hour": "Stunde",
        "days": "Tage",
        "day": "Tag",
        "weeks": "Wochen",
        "week": "Woche",
        "h": "Std",
        "Deload now!": "Jetzt entlasten!",
        "In": "In",
        "✅ Optimal": "✅ Optimal",
        "✅ Good": "✅ Gut",
        "⚠️ Moderate": "⚠️ Moderat",
        "⚠️ High": "⚠️ Hoch",
        "🔴 Critical": "🔴 Kritisch",
        "Complete rest — sleep, hydrate, eat well": "Vollständige Ruhe — schlafen, hydratisieren, gut essen",
        "Light walk 20-30 min, gentle stretching, foam rolling": "Leichter Spaziergang 20-30 Min, sanftes Dehnen, Faszienrolle",
        "Yoga, mobility work, technique drills at 50% effort": "Yoga, Beweglichkeitsarbeit, Technikübungen bei 50% Anstrengung",
        "Fully recovered — warm up well and train hard": "Vollständig erholt — gut aufwärmen und hart trainieren",
        "🟢 Normal": "🟢 Normal",
        "⚠️ Elevated": "⚠️ Erhöht",
        "🔴 High Elevation": "🔴 Stark erhöht",
        "N/A — Not tracking": "N/V — Nicht verfolgt",
        "🚨 DO NOT TRAIN": "🚨 NICHT TRAINIEREN",
        "Factor": "Faktor",
        "Your Status": "Ihr Status",
        "Impact": "Auswirkung",
        "Rating": "Bewertung",
        "TOTAL": "GESAMT",
        "Workout Load": "Trainingsbelastung",
        "Muscle Group": "Muskelgruppe",
        "Eccentric Stress": "Exzentrischer Stress",
        "Training Goal": "Trainingsziel",
        "Time Passed": "Verstrichene Zeit",
        "Sleep": "Schlaf",
        "Stress & Soreness": "Stress & Muskelkater",
        "Hydration": "Hydration",
        "Nutrition": "Ernährung",
        "Health Status": "Gesundheitszustand",
        "Heart Rate": "Herzfrequenz",
        "Age & Experience": "Alter & Erfahrung",
        "Cumulative Fatigue": "Kumulative Ermüdung",
        "None": "Keine"
      },
      "formats": {
        "summary": "Ihr Bereitschaftswert ist {readinessScore}/100 ({restType}). Sie brauchen {recoveryHours} Gesamtregeneration, mit {timeRemaining} verbleibend. Übertrainingsrisiko: {overtrainingRisk}."
      },
      "infoCards": {
        "recoveryOverview": {
          "title": "Regenerationsübersicht",
          "items": {
            "0": "Bereitschaftswert",
            "1": "Empfehlung",
            "2": "Verbleibende Zeit",
            "3": "Herzfrequenzstatus",
            "4": "Aktive Erholung"
          }
        },
        "trainingStatus": {
          "title": "Trainingsstatus",
          "items": {
            "0": "Übertrainingsrisiko",
            "1": "Wöchentliche Ruhetage",
            "2": "Entlastungsstatus"
          }
        },
        "tips": {
          "title": "Regenerationsoptimierung",
          "items": [
            "Verfolgen Sie Ihre Ruheherzfrequenz jeden Morgen — eine 5+ BPM Erhöhung bedeutet, Sie brauchen mehr Regeneration",
            "Schlaf ist das wichtigste Regenerationsmittel — priorisieren Sie 7-9 Stunden qualitativ hochwertigen Schlaf jede Nacht",
            "Hydration ist wichtig — Dehydration verlangsamt die Regeneration um bis zu 25% und beeinträchtigt die Leistung",
            "Wechseln Sie harte und leichte Tage ab — stapeln Sie nie 3+ maximale Trainingseinheiten hintereinander ohne Regeneration"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist Trainingsregeneration?",
          "content": "Trainingsregeneration ist der biologische Prozess der Reparatur von Muskelgewebe, Wiederauffüllung der Glykogenspeicher und Wiederherstellung der Nervensystemfunktion nach dem Training. Wenn Sie trainieren, erzeugen Sie kontrollierten Schaden an Muskelfasern durch mechanische Spannung und metabolischen Stress. Ihr Körper baut diese Fasern dann während Ruhephasen stärker wieder auf — ein Prozess namens Superkompensation. Ohne ausreichende Regeneration wird dieser Prozess unterbrochen, was zu stagnierendem Fortschritt, akkumulierter Ermüdung und erhöhtem Verletzungsrisiko führt. Regeneration ist nicht einfach die Abwesenheit von Training; es ist ein aktiver physiologischer Prozess, der von Schlafqualität, Ernährung, Stresslevel, Hydration, Herzfrequenzvariabilität und den spezifischen Anforderungen Ihres Trainings beeinflusst wird. Elite-Athleten überwachen Ruheherzfrequenz (RHF) und Herzfrequenzvariabilität (HRV) täglich, um den Regenerationsstatus objektiv zu verfolgen. Das Verstehen Ihrer Regenerationsbedürfnisse unterscheidet intelligentes Training von Übertraining."
        },
        "howItWorks": {
          "title": "Wie dieser Rechner funktioniert",
          "content": "Dieser erweiterte Rechner bewertet Ihre Trainingsbereitschaft durch Analyse von drei Faktorkategorien. Erstens bewertet er Ihre Trainingsanforderungen — Typ, Intensität, Dauer, beteiligte Muskelgruppen, exzentrische Arbeit und Trainingsziel. Zweitens bewertet er Ihre Regenerationskapazität — Schlafqualität und -dauer, Stresslevel, Muskelkater, Hydration, Ernährungsstatus, Alter und Trainingserfahrung. Drittens berücksichtigt er objektive Biomarker — Ihre Ruheherzfrequenz verglichen mit der Baseline, Stunden seit Ihrem letzten Training und aktueller Gesundheitszustand. Diese Faktoren werden zu einem Bereitschaftswert von 0 bis 100 kombiniert, wobei höhere Werte größere Trainingsbereitschaft anzeigen. Der Rechner schätzt auch die benötigte Gesamtregenerationszeit, berechnet die verbleibende Zeit basierend auf Stunden seit dem Training, bewertet das Übertrainingsrisiko basierend auf kumulativer Ermüdung und Herzfrequenzerhöhung, empfiehlt wöchentliche Ruhetage, bewertet das Timing der Entlastung und bietet spezifische Vorschläge für aktive Erholung, die auf Ihren aktuellen Zustand zugeschnitten sind. Bei Fieber, akuten Schmerzen oder Infektionen überschreibt der Rechner alle anderen Faktoren und empfiehlt vollständige Ruhe."
        },
        "heartRate": {
          "title": "Herzfrequenz & Regeneration",
          "items": [
            {
              "text": "Die Ruheherzfrequenz (RHF) wird am frühen Morgen vor dem Aufstehen gemessen — es ist der zuverlässigste Regenerationsmarker",
              "type": "info"
            },
            {
              "text": "Eine Ruheherzfrequenz 5+ BPM über Ihrer normalen Baseline zeigt unvollständige Regeneration und erhöhten Stress auf Ihren Körper an",
              "type": "warning"
            },
            {
              "text": "Herzfrequenzvariabilität (HRV) misst die Variation zwischen Herzschlägen — höhere HRV zeigt generell bessere Regeneration an",
              "type": "info"
            },
            {
              "text": "Verfolgen Sie RHF konsistent für 2-4 Wochen, um Ihre persönliche Baseline zu etablieren, da individuelle Baselines von 40-80 BPM variieren",
              "type": "info"
            },
            {
              "text": "Faktoren, die RHF erhöhen: schlechter Schlaf, Krankheit, Dehydration, Übertraining, Alkohol, Stress und unvollständige Regeneration",
              "type": "warning"
            },
            {
              "text": "Wenn Ihre RHF 10+ BPM über der Baseline erhöht ist und mehrere Tage erhöht bleibt, nehmen Sie sofort einen vollständigen Ruhetag",
              "type": "warning"
            }
          ]
        },
        "hydrationRecovery": {
          "title": "Hydration & Regeneration",
          "items": [
            {
              "text": "Bereits 2% Dehydration kann die Muskelregeneration um bis zu 25% verlangsamen und die Kraftleistung erheblich beeinträchtigen",
              "type": "warning"
            },
            {
              "text": "Prüfen Sie täglich die Urinfarbe — dunkelgelb zeigt Dehydration an, blassgelb ist optimal, klar bedeutet gut hydratisiert",
              "type": "info"
            },
            {
              "text": "Trinken Sie täglich 0,5-1 Unzen Wasser pro Pfund Körpergewicht, plus extra für Schweißverlust während des Trainings",
              "type": "info"
            },
            {
              "text": "Elektrolyte sind wichtig — Natrium, Kalium und Magnesium gehen durch Schweiß verloren und müssen ersetzt werden",
              "type": "info"
            },
            {
              "text": "Koffein und Alkohol sind harntreibend und erhöhen den Flüssigkeitsverlust — kompensieren Sie mit zusätzlicher Wasseraufnahme",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Berechnungsbeispiele",
          "description": "Wie verschiedene Szenarien die Regeneration mit Herzfrequenzdaten beeinflussen",
          "examples": [
            {
              "title": "Beispiel 1: Normale Regeneration",
              "steps": [
                "Training: Moderates Krafttraining, 60 Min, vor 24h",
                "Schlaf: 8 Stunden, gute Qualität",
                "RHF: 58 BPM (normale Baseline: 56)",
                "Hydration: Optimal",
                "Gesundheit: Keine Probleme"
              ],
              "result": "Bereitschaft: 88/100 → Normales Training | Regeneration: 36h gesamt, 12h verbleibend"
            },
            {
              "title": "Beispiel 2: Erhöhte Herzfrequenz Warnung",
              "steps": [
                "Training: Maximale Beine, 90 Min, vor 20h",
                "Schlaf: 6 Stunden, mäßige Qualität",
                "RHF: 68 BPM (normale Baseline: 52) ← +16 BPM!",
                "Starker Muskelkater, hoher Stress",
                "5 aufeinanderfolgende Trainingstage"
              ],
              "result": "Bereitschaft: 32/100 → Nur aktive Erholung | Regeneration: 96h gesamt, 76h verbleibend | Herzfrequenz: 🔴 Stark erhöht"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Warum ist die Ruheherzfrequenz für die Regeneration wichtig?",
          "answer": "Die Ruheherzfrequenz (RHF) ist einer der zuverlässigsten objektiven Indikatoren für den Regenerationsstatus. Wenn Ihr Körper sich noch von Trainingsstress, Krankheit oder unzureichendem Schlaf erholt, bleibt Ihr Nervensystem in einem erhöhten Zustand, was dazu führt, dass Ihr Herz auch in Ruhe schneller schlägt. Eine Ruheherzfrequenz 5+ BPM über Ihrer normalen Baseline ist ein klares Signal, dass Ihr Körper mehr Regenerationszeit benötigt. Elite-Athleten verfolgen RHF jeden Morgen und passen ihr Training basierend auf diesen Messungen an. Forschung zeigt, dass Training mit erhöhter RHF das Verletzungsrisiko signifikant erhöht und die Trainingsqualität reduziert."
        },
        {
          "question": "Wie messe ich meine Ruheherzfrequenz korrekt?",
          "answer": "Messen Sie Ihre Ruheherzfrequenz am frühen Morgen, bevor Sie aus dem Bett steigen, jeden Tag zur gleichen Zeit. Legen Sie zwei Finger an Ihr Handgelenk oder Ihren Hals, zählen Sie die Schläge für 60 Sekunden (oder 30 Sekunden und multiplizieren Sie mit 2). Alternativ verwenden Sie einen Fitness-Tracker oder eine Smartwatch, die RHF automatisch während des Schlafs misst. Verfolgen Sie Ihre RHF für 2-4 Wochen, um Ihre persönliche Baseline zu etablieren. Ihre Baseline ist die durchschnittliche RHF, wenn Sie sich gut ausgeruht und gesund fühlen. Individuelle Baselines variieren stark — ein gut trainierter Ausdauersportler könnte eine RHF von 40-50 BPM haben, während eine untrainierte Person 70-80 BPM haben könnte."
        },
        {
          "question": "Was soll ich tun, wenn meine Herzfrequenz erhöht ist?",
          "answer": "Wenn Ihre Ruheherzfrequenz 5-9 BPM über der Baseline liegt, reduzieren Sie Trainingsintensität und -volumen um 30-50% — machen Sie eine leichte aktive Erholungseinheit oder nehmen Sie einen vollständigen Ruhetag. Wenn Ihre RHF 10+ BPM über der Baseline liegt, nehmen Sie einen vollen Ruhetag und konzentrieren Sie sich auf Schlaf, Hydration und Stressmanagement. Wenn die Erhöhung für 3+ aufeinanderfolgende Tage anhält, erwägen Sie 2-3 Ruhetage oder planen Sie eine Entlastungswoche. Häufige Ursachen für erhöhte RHF sind unzureichender Schlaf, Übertraining, Dehydration, Krankheit, hoher Lebensstress, Alkoholkonsum und schlechte Ernährung. Adressieren Sie diese Faktoren zuerst, bevor Sie hartes Training wieder aufnehmen."
        },
        {
          "question": "Wie beeinflusst Dehydration die Regeneration?",
          "answer": "Dehydration hat einen tiefgreifend negativen Einfluss auf die Regeneration. Bereits 2% Dehydration (Verlust von 1,4 kg Wasser für eine 70 kg Person) kann die Muskelproteinsynthese um bis zu 25% reduzieren, die Muskelglykogenauffüllung beeinträchtigen und die Entfernung von Stoffwechselabfallprodukten aus geschädigtem Muskelgewebe verlangsamen. Dehydration reduziert auch das Blutvolumen, zwingt Ihr Herz härter zu arbeiten, was die Ruheherzfrequenz erhöht. Sie beeinträchtigt die Thermoregulation, erhöht die wahrgenommene Anstrengung und reduziert Kraft- und Kraftausdauer um 10-20%. Prüfen Sie täglich Ihre Urinfarbe — dunkelgelb zeigt Dehydration an. Streben Sie blassgelben Urin an und trinken Sie mindestens 0,5 Unzen Wasser pro Pfund Körpergewicht täglich."
        },
        {
          "question": "Soll ich trainieren, wenn ich krank bin oder Fieber habe?",
          "answer": "Nein. Trainieren Sie niemals mit Fieber, Infektion oder akuter Krankheit. Dieser Rechner wird immer vollständige Ruhe empfehlen, wenn Sie angeben, dass Sie krank oder verletzt sind, unabhängig von anderen Faktoren. Training während Krankheit unterdrückt die Immunfunktion weiter, verlängert die Krankheit und kann zu ernsthaften Komplikationen wie Myokarditis (Herzentzündung) führen. Die 'Halsregel' ist eine allgemeine Richtlinie: Symptome über dem Hals (laufende Nase, leichte Halsschmerzen) könnten leichte Bewegung erlauben, aber Symptome unter dem Hals (Brustbeschwerden, Gliederschmerzen, Fieber) erfordern vollständige Ruhe. Im Zweifel ruhen Sie. Ein paar Trainingstage zu verpassen, um sich vollständig zu erholen, ist weit besser als krank zu trainieren und wochenlang außer Gefecht gesetzt zu sein."
        },
        {
          "question": "Wie viele Ruhetage brauche ich pro Woche?",
          "answer": "Die Anzahl der Ruhetage hängt von Trainingsintensität, Volumen, Erfahrungslevel, Alter und Regenerationskapazität ab. Anfänger brauchen 3-4 Ruhetage pro Woche, während sich ihre Körper an den Trainingsstress anpassen. Fortgeschrittene Kraftsportler brauchen typischerweise 2-3 Ruhetage. Erfahrene Sportler können 5-6 Tage pro Woche trainieren, müssen aber harte und leichte Einheiten strategisch abwechseln. Elite-Athleten trainieren oft 6 Tage pro Woche, integrieren aber aktive Erholung, Beweglichkeitsarbeit und Entlastungswochen. Schlüsselprinzip: Passen Sie Ihre Ruhe an Ihre tatsächliche Regenerationskapazität an, nicht an einen festen Zeitplan. Überwachen Sie Ruheherzfrequenz, Schlafqualität, Muskelkatergrad und Leistungsmetriken, um zu bestimmen, ob Sie ausreichende Regeneration erhalten."
        },
        {
          "question": "Was ist eine Entlastungswoche und wann sollte ich eine nehmen?",
          "answer": "Eine Entlastungswoche ist eine geplante Reduzierung des Trainingsvolumens (typischerweise 40-60% weniger) während die Intensität beibehalten oder leicht reduziert wird. Entlastungswochen verhindern kumulative Ermüdungsansammlung, erlauben vollständige Regeneration und sensibilisieren Muskeln wieder für Trainingsreize. Die meisten Menschen profitieren von einer Entlastung alle 4-8 Wochen, abhängig von Trainingsintensität und Erfahrungslevel. Anfänger sollten alle 3-4 Wochen entlasten, Fortgeschrittene alle 4-6 Wochen, erfahrene Kraftsportler alle 6-8 Wochen und Elite-Athleten können alle 8-12 Wochen entlasten. Anzeichen, dass Sie sofortige Entlastung brauchen: anhaltend erhöhte Ruheherzfrequenz, stagnierende oder abnehmende Leistung, anhaltender Muskelkater, schlechte Schlafqualität, erhöhte Reizbarkeit und Motivationsverlust. Eine richtig getimte Entlastungswoche führt oft zu neuen persönlichen Bestleistungen in der folgenden Woche."
        },
        {
          "question": "Kann ich diesen Rechner verwenden, wenn ich keine Herzfrequenz verfolge?",
          "answer": "Ja, absolut. Die Ruheherzfrequenzfelder sind optional. Wenn Sie keine Herzfrequenzdaten eingeben, wird der Rechner trotzdem genaue Bereitschaftswerte und Regenerationsempfehlungen basierend auf Trainingsbelastung, Schlaf, Stress, Muskelkater, Hydration, Ernährung und Zeit seit Training liefern. Das Hinzufügen von Herzfrequenzdaten verbessert jedoch die Genauigkeit erheblich, da es einen objektiven Biomarker des Regenerationsstatus liefert. Wenn Sie ernsthaft trainieren und Leistung optimieren wollen während Sie Übertraining vermeiden, erwägen Sie die Investition in einen einfachen Herzfrequenzmesser oder Fitness-Tracker, der Ruheherzfrequenz misst. Viele Smartwatches und Fitness-Tracker messen jetzt RHF automatisch während des Schlafs, was die Verfolgung dieser wertvollen Metrik mühelos macht."
        }
      ],
      "detailedTable": {
        "title": "Regenerationsfaktor-Aufschlüsselung",
        "buttonLabel": "Detaillierte Aufschlüsselung anzeigen",
        "columns": [
          "Faktor",
          "Ihr Status",
          "Auswirkung",
          "Bewertung"
        ]
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
