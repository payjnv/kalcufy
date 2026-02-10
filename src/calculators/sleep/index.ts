// ═══════════════════════════════════════════════════════════════
// SLEEP CALCULATOR V4 — IMPROVED (2026-02-05)
// New: Sleep Stages Chart, Light Exposure Schedule, Meal/Exercise Timing
// Sleep Quality Score, 12 FAQs, 7 Education Sections, 5 InfoCards
// All-in-one: Bedtime/Wake-up Cycles + Caffeine + Screen + Nap + Debt + Chronotype
// ═══════════════════════════════════════════════════════════════

import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

export const sleepCalculatorConfig: CalculatorConfigV4 = {
  id: "sleep",
  version: "4.0",
  category: "health",
  icon: "😴",

  // ═══════════════════════════════════════════════════════════════
  // PRESETS (6 presets with icons)
  // ═══════════════════════════════════════════════════════════════
  presets: [
    {
      id: "earlyBird",
      icon: "🦁",
      values: {
        mode: "wakeup",
        targetHour: "5",
        targetMinute: "30",
        targetPeriod: "am",
        age: 35,
        chronotype: "lion",
        fallAsleepTime: "10",
        caffeinePerDay: 1,
        sleepDebtHours: 0,
        wantsNap: "no",
      },
    },
    {
      id: "standard",
      icon: "🐻",
      values: {
        mode: "wakeup",
        targetHour: "7",
        targetMinute: "0",
        targetPeriod: "am",
        age: 30,
        chronotype: "bear",
        fallAsleepTime: "15",
        caffeinePerDay: 2,
        sleepDebtHours: 0,
        wantsNap: "no",
      },
    },
    {
      id: "nightOwl",
      icon: "🐺",
      values: {
        mode: "wakeup",
        targetHour: "9",
        targetMinute: "0",
        targetPeriod: "am",
        age: 25,
        chronotype: "wolf",
        fallAsleepTime: "20",
        caffeinePerDay: 3,
        sleepDebtHours: 2,
        wantsNap: "yes",
        napType: "power10",
      },
    },
    {
      id: "shiftWorker",
      icon: "👷",
      values: {
        mode: "wakeup",
        targetHour: "5",
        targetMinute: "0",
        targetPeriod: "am",
        age: 35,
        chronotype: "bear",
        fallAsleepTime: "20",
        caffeinePerDay: 4,
        sleepDebtHours: 5,
        wantsNap: "yes",
        napType: "short20",
      },
    },
    {
      id: "student",
      icon: "📚",
      values: {
        mode: "wakeup",
        targetHour: "8",
        targetMinute: "0",
        targetPeriod: "am",
        age: 20,
        chronotype: "bear",
        fallAsleepTime: "15",
        caffeinePerDay: 2,
        sleepDebtHours: 3,
        wantsNap: "yes",
        napType: "short20",
      },
    },
    {
      id: "lightSleeper",
      icon: "🐬",
      values: {
        mode: "wakeup",
        targetHour: "6",
        targetMinute: "30",
        targetPeriod: "am",
        age: 40,
        chronotype: "dolphin",
        fallAsleepTime: "30",
        caffeinePerDay: 2,
        sleepDebtHours: 1,
        wantsNap: "no",
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // TRANSLATIONS (English only)
  // ═══════════════════════════════════════════════════════════════
  t: {
    en: {
      name: "Sleep Calculator",
      slug: "sleep-calculator",
      subtitle:
        "Find your perfect sleep schedule with personalized cycle timing, chronotype alignment, caffeine cutoff, light exposure plan, and recovery planning — free sleep cycle calculator",
      breadcrumb: "Sleep",

      // ─── SEO ───────────────────────────────────────────────────
      seo: {
        title:
          "Sleep Calculator - Bedtime & Wake-Up Cycle Planner with Chronotype",
        description:
          "Calculate your optimal bedtime or wake-up time with age-adjusted sleep cycles and chronotype analysis. Get caffeine cutoff, light exposure schedule, meal timing, nap window, and debt recovery plan — completely free.",
        shortDescription:
          "Find optimal bedtime and wake-up times using sleep cycles and chronotype",
        keywords: [
          "sleep calculator",
          "bedtime calculator",
          "sleep cycle calculator",
          "wake up time calculator",
          "chronotype calculator",
          "nap calculator",
          "sleep debt tracker",
          "circadian rhythm calculator",
        ],
      },

      // ─── UI ────────────────────────────────────────────────────
      calculator: { yourInformation: "Your Sleep Profile" },
      ui: {
        yourInformation: "Your Sleep Profile",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      // ─── INPUTS ────────────────────────────────────────────────
      inputs: {
        mode: {
          label: "I want to find my...",
          helpText: "Choose what to calculate",
          options: {
            wakeup: "Bedtime (I know my wake-up time)",
            bedtime: "Wake-up time (I know my bedtime)",
          },
        },
        targetHour: {
          label: "Hour",
          helpText: "",
          options: {
            "1": "1",
            "2": "2",
            "3": "3",
            "4": "4",
            "5": "5",
            "6": "6",
            "7": "7",
            "8": "8",
            "9": "9",
            "10": "10",
            "11": "11",
            "12": "12",
          },
        },
        targetMinute: {
          label: "Minute",
          helpText: "",
          options: { "0": ":00", "15": ":15", "30": ":30", "45": ":45" },
        },
        targetPeriod: {
          label: "AM / PM",
          helpText: "",
          options: { am: "AM", pm: "PM" },
        },
        age: {
          label: "Age",
          helpText: "Sleep needs and cycle length change with age",
        },
        chronotype: {
          label: "Chronotype",
          helpText: "Your natural sleep-wake preference",
          options: {
            bear: "🐻 Bear — Standard (55%)",
            lion: "🦁 Lion — Early Bird (15%)",
            wolf: "🐺 Wolf — Night Owl (15%)",
            dolphin: "🐬 Dolphin — Light Sleeper (10%)",
          },
        },
        fallAsleepTime: {
          label: "Time to Fall Asleep",
          helpText: "How long it usually takes you to fall asleep",
          options: {
            "5": "5 min — very fast",
            "10": "10 min — fast",
            "15": "15 min — average",
            "20": "20 min — normal",
            "30": "30 min — slow",
            "45": "45 min — very slow",
            "60": "60 min — difficulty",
          },
        },
        caffeinePerDay: {
          label: "Daily Caffeine",
          helpText: "Cups of coffee, tea, or energy drinks",
        },
        sleepDebtHours: {
          label: "Weekly Sleep Debt",
          helpText: "Hours of sleep missed this week",
        },
        wantsNap: {
          label: "Plan a nap?",
          helpText: "Get your optimal nap window",
          options: { no: "No", yes: "Yes" },
        },
        napType: {
          label: "Nap Type",
          helpText: "Choose based on available time and need",
          options: {
            power10: "Power Nap (10 min)",
            short20: "Short Nap (20 min)",
            full90: "Full Cycle (90 min)",
          },
        },
      },

      // ─── INPUT GROUPS ──────────────────────────────────────────
      inputGroups: {},

      // ─── RESULTS ───────────────────────────────────────────────
      results: {
        optimalTime: { label: "Optimal Time" },
        totalSleep: { label: "Total Sleep" },
        sleepCycles: { label: "Complete Cycles" },
        caffeineDeadline: { label: "Caffeine Cutoff" },
        screenDeadline: { label: "Screens Off" },
        napWindow: { label: "Nap Window" },
        debtStatus: { label: "Sleep Debt" },
        recoveryPlan: { label: "Recovery Plan" },
        sleepQuality: { label: "Sleep Quality Score" },
        morningLight: { label: "Morning Light" },
        lastMeal: { label: "Last Meal" },
        exerciseCutoff: { label: "Exercise Cutoff" },
      },

      // ─── TOOLTIPS ──────────────────────────────────────────────
      tooltips: {
        optimalTime:
          "Calculated using age-adjusted sleep cycles and fall-asleep latency",
        totalSleep: "Total time sleeping (excludes time to fall asleep)",
        sleepCycles:
          "Complete sleep cycles — each includes NREM + REM stages",
        caffeineDeadline:
          "Based on caffeine's 5-hour half-life and your daily intake",
        screenDeadline:
          "Blue light suppresses melatonin — screens off 45 min before bed",
        napWindow:
          "Optimal nap timing based on chronotype and waking hours",
        debtStatus:
          "Cumulative sleep deficit — mild (<3h), moderate (3-5h), severe (>5h)",
        recoveryPlan:
          "Add 30 min per night to recover sleep debt gradually",
        sleepQuality:
          "Score based on cycles, chronotype alignment, debt, and sleep hygiene",
        morningLight:
          "Bright light exposure within 30 min of waking resets circadian rhythm",
        lastMeal:
          "Eating 3+ hours before bed improves sleep quality and reduces reflux",
        exerciseCutoff:
          "Vigorous exercise raises core temperature — avoid 3h before bed",
      },

      // ─── PRESETS ───────────────────────────────────────────────
      presets: {
        earlyBird: {
          label: "Early Bird (Lion)",
          description:
            "Lion chronotype, wake 5:30 AM, minimal caffeine, no debt",
        },
        standard: {
          label: "Standard (Bear)",
          description:
            "Bear chronotype, wake 7:00 AM, moderate caffeine, no debt",
        },
        nightOwl: {
          label: "Night Owl (Wolf)",
          description:
            "Wolf chronotype, wake 9:00 AM, high caffeine, 2h debt, power nap",
        },
        shiftWorker: {
          label: "Shift Worker",
          description:
            "Early wake, high caffeine, 5h debt, nap plan, recovery needed",
        },
        student: {
          label: "Student",
          description:
            "Wake 8 AM, moderate caffeine, 3h debt, nap recommended",
        },
        lightSleeper: {
          label: "Light Sleeper (Dolphin)",
          description:
            "Dolphin chronotype, wake 6:30 AM, 30 min fall-asleep latency",
        },
      },

      // ─── VALUES ────────────────────────────────────────────────
      values: {
        hours: "hours",
        hour: "hour",
        minutes: "minutes",
        min: "min",
        cycle: "cycle",
        cycles: "cycles",
        "Bedtime": "🛏️ Bedtime",
        "Wake-Up": "⏰ Wake Up",
        "No caffeine needed": "No caffeine needed",
        "No nap planned": "No nap planned",
        "No sleep debt": "No sleep debt ✅",
        mild: "mild",
        moderate: "moderate",
        severe: "severe",
        deficit: "deficit",
        "Keep current schedule": "On track — keep your schedule!",
        night: "night",
        nights: "nights",
        Excellent: "⭐ Excellent",
        Recommended: "✅ Recommended",
        Adequate: "Adequate",
        Minimum: "⚠️ Minimum",
        NREM1: "NREM 1 (Light)",
        NREM2: "NREM 2",
        NREM3: "NREM 3 (Deep)",
        REM: "REM (Dream)",
      },

      // ─── FORMATS ───────────────────────────────────────────────
      formats: {
        summary:
          "{mode} {optimalTime} for {totalSleep} of sleep ({cycles} complete cycles). Sleep quality score: {score}/100.",
      },

      // ─── INFO CARDS ────────────────────────────────────────────
      infoCards: {
        schedule: {
          title: "Your Sleep Schedule",
          items: [
            { label: "Optimal Time", valueKey: "optimalTime" },
            { label: "Total Sleep", valueKey: "totalSleep" },
            { label: "Sleep Cycles", valueKey: "sleepCycles" },
            { label: "Sleep Quality", valueKey: "sleepQuality" },
          ],
        },
        hygiene: {
          title: "Sleep Hygiene Deadlines",
          items: [
            { label: "Caffeine Cutoff", valueKey: "caffeineDeadline" },
            { label: "Screens Off", valueKey: "screenDeadline" },
            { label: "Last Meal", valueKey: "lastMeal" },
            { label: "Exercise Cutoff", valueKey: "exerciseCutoff" },
          ],
        },
        circadian: {
          title: "Circadian Rhythm",
          items: [
            { label: "Morning Light", valueKey: "morningLight" },
            { label: "Nap Window", valueKey: "napWindow" },
            { label: "Sleep Debt", valueKey: "debtStatus" },
            { label: "Recovery Plan", valueKey: "recoveryPlan" },
          ],
        },
        qualityFactors: {
          title: "Sleep Quality Factors",
          items: [
            {
              label: "Chronotype Alignment",
              valueKey: "chronotypeAlignment",
            },
            { label: "Cycle Completion", valueKey: "cycleCompletion" },
            { label: "Sleep Debt Impact", valueKey: "debtImpact" },
            { label: "Sleep Hygiene", valueKey: "hygieneScore" },
          ],
        },
        tips: {
          title: "Pro Tips",
          items: [
            "Get bright light within 30 min of waking to reset your circadian rhythm",
            "Avoid caffeine 8-10 hours before bed — it has a 5-6 hour half-life",
            "Keep your bedroom cool (60-67°F), dark, and quiet for optimal sleep",
            "Power naps (10-20 min) boost alertness without grogginess — full cycles (90 min) improve memory",
          ],
        },
      },

      // ─── CHART ─────────────────────────────────────────────────
      chart: {
        title: "Sleep Stages Across Your Cycles",
        xLabel: "Minutes Asleep",
        yLabel: "Sleep Stage",
        series: {
          nrem1: "NREM 1 (Light)",
          nrem2: "NREM 2",
          nrem3: "NREM 3 (Deep)",
          rem: "REM (Dream)",
        },
      },

      // ─── DETAILED TABLE ────────────────────────────────────────
      detailedTable: {
        cycleOptions: {
          button: "View Cycle Options",
          title: "Sleep Cycle Options",
          columns: {
            cycles: "Cycles",
            time: "Time",
            duration: "Duration",
            quality: "Quality",
          },
        },
      },

      // ─── EDUCATION SECTIONS ────────────────────────────────────
      education: {
        whatAreCycles: {
          title: "What Are Sleep Cycles?",
          content:
            "Sleep cycles are 90-minute periods during which your brain cycles through four distinct stages: NREM 1 (light sleep, transition), NREM 2 (light sleep, body temperature drops), NREM 3 (deep sleep, physical restoration), and REM (rapid eye movement, dreaming and memory consolidation). A complete cycle takes 90-120 minutes depending on your age — children have longer cycles (95-100 min) while seniors have shorter ones (80-85 min). You typically go through 4-6 cycles per night. Waking up during NREM 3 or mid-REM causes grogginess, while waking at the end of a cycle (during NREM 1 or at the REM-to-NREM 1 transition) leaves you feeling refreshed. This is why you can sleep 8 hours and feel terrible, or sleep 7.5 hours and feel amazing — it's not just duration, it's cycle alignment.",
        },
        chronotypes: {
          title: "Understanding Chronotypes",
          content:
            "Your chronotype is your genetically determined circadian preference — it's not a habit, it's your biology. About 55% of people are Bears (standard 10pm-6am sleepers), 15% are Lions (early birds who wake 5-6am naturally), 15% are Wolves (night owls who peak 9pm-midnight), and 10% are Dolphins (light sleepers with irregular patterns). Chronotype affects more than bedtime: Lions peak mentally 8am-12pm, Bears peak 10am-2pm, Wolves peak 5pm-midnight. Trying to force a Wolf to be productive at 8am is like asking a Lion to do creative work at 11pm — you're fighting your biology. Your chronotype also affects fall-asleep latency: Lions fall asleep in 10-15 min, Bears in 15-20 min, Wolves in 20-30 min, Dolphins in 30-45 min. The calculator adjusts for this automatically.",
        },
        lightExposure: {
          title: "Light Exposure & Circadian Rhythm",
          items: [
            {
              text: "Morning light (6-8 AM) — Get 10-30 min of bright light within 30 min of waking. Outdoor sunlight is best (10,000 lux), but a lightbox (10,000 lux) works. This resets your circadian clock and advances your sleep phase.",
              type: "success",
            },
            {
              text: "Midday light — Exposure to bright light during lunch helps consolidate the morning signal. A 15-min outdoor walk is ideal.",
              type: "info",
            },
            {
              text: "Avoid blue light after sunset — Blue wavelengths (450-480nm) suppress melatonin production. Screens off 45-60 min before bed. Use blue-light blocking glasses if unavoidable.",
              type: "warning",
            },
            {
              text: "Dim evening lighting — Keep lights dim (< 50 lux) 2-3 hours before bed. Use warm-colored bulbs (amber/red) in bedrooms and bathrooms.",
              type: "info",
            },
            {
              text: "Blackout bedroom — Complete darkness during sleep maximizes melatonin. Use blackout curtains or an eye mask.",
              type: "info",
            },
            {
              text: "Light therapy for night owls — If you're a Wolf struggling with early work hours, use a 10,000 lux lightbox for 20-30 min at 6-7 AM to gradually shift your clock earlier.",
              type: "success",
            },
          ],
        },
        mealExerciseTiming: {
          title: "Meal & Exercise Timing for Better Sleep",
          items: [
            {
              text: "Last meal 3+ hours before bed — Digestion raises core body temperature and delays sleep onset. Large meals 4+ hours before bed is ideal.",
              type: "warning",
            },
            {
              text: "Avoid alcohol 3-4 hours before bed — Alcohol disrupts REM sleep and causes fragmented sleep in the second half of the night.",
              type: "warning",
            },
            {
              text: "Vigorous exercise 3+ hours before bed — Intense workouts raise core temperature for 4-6 hours. Morning or afternoon exercise is best.",
              type: "info",
            },
            {
              text: "Light stretching/yoga is OK — Gentle movement 30-60 min before bed can aid relaxation. Avoid heart rate spikes.",
              type: "success",
            },
            {
              text: "Caffeine cutoff — Coffee has a 5-6 hour half-life. If you're sensitive, cut off 10-12 hours before bed. Tea has less caffeine but still matters.",
              type: "warning",
            },
            {
              text: "Protein before bed (optional) — A small high-protein snack (Greek yogurt, cottage cheese) 1 hour before bed can improve overnight muscle recovery without disrupting sleep.",
              type: "info",
            },
          ],
        },
        sleepDebt: {
          title: "Sleep Debt Recovery",
          content:
            "Sleep debt is cumulative lost sleep — if you need 8 hours but sleep 6, you accrue 2 hours of debt per night. Research shows you can recover about 30 minutes of debt per night by sleeping longer. Don't try to pay back all debt in one weekend — sleeping 12 hours on Saturday creates 'social jet lag' that disrupts your rhythm. Instead, add 30-60 min per night for a week. Mild debt (<3h) recovers in 3-4 nights, moderate debt (3-5h) takes a week, severe debt (>5h) needs 2+ weeks. Chronic debt (months/years) may need professional help. Signs of unrecovered debt: daytime sleepiness, microsleeps (brief unintentional sleep), reduced reaction time, mood changes, sugar cravings. The calculator gives you a night-by-night recovery plan.",
        },
        napping: {
          title: "Strategic Napping",
          content:
            "Naps are powerful if timed correctly. Power naps (10-20 min) provide alertness boost without sleep inertia — you wake up refreshed. Full-cycle naps (90 min) include deep sleep and REM, improving memory consolidation and creativity, but can cause grogginess if interrupted mid-cycle. Avoid naps >90 min or after 3 PM — they can disrupt nighttime sleep. The ideal nap window is 1-3 PM, aligned with the natural post-lunch dip in circadian rhythm. For night owls (Wolves), naps are more beneficial because their nighttime sleep is often restricted by social/work schedules. For early birds (Lions), naps can signal sleep debt — if you're napping daily, you're not getting enough nighttime sleep. The calculator places your nap at the midpoint of your waking hours, capped at 3 PM.",
        },
        commonMistakes: {
          title: "Common Sleep Mistakes",
          items: [
            {
              text: "Sleeping in on weekends — Going to bed 11 PM Fri, 3 AM Sat is like flying to Hawaii and back every weekend (social jet lag). Stick to ±1 hour of your weekday schedule.",
              type: "warning",
            },
            {
              text: "Hitting snooze — Those extra 10 minutes are fragmented, low-quality sleep. You enter a new sleep cycle you won't complete. Set one alarm and get up.",
              type: "warning",
            },
            {
              text: "Using screens in bed — Your brain associates bed with sleep. Reading on a tablet or scrolling on your phone trains your brain that bed = awake time.",
              type: "warning",
            },
            {
              text: "Exercising right before bed — Your core temperature needs to drop 1-2°F to initiate sleep. Vigorous exercise raises it for 4-6 hours.",
              type: "warning",
            },
            {
              text: "Relying on sleeping pills long-term — Most sleep meds (Ambien, Lunesta) don't produce natural sleep architecture. They sedate you but don't provide restorative sleep.",
              type: "warning",
            },
            {
              text: "Thinking you can 'catch up' on sleep — You can recover acute debt (1-2 weeks) but chronic debt (months/years) causes permanent cognitive and metabolic changes.",
              type: "warning",
            },
          ],
        },
      },

      // ─── FAQs ──────────────────────────────────────────────────
      faqs: [
        {
          question: "What's the difference between chronotypes?",
          answer:
            "Chronotypes are genetically determined circadian preferences. Lions (15% of people) naturally wake 5-6 AM and peak mentally 8 AM-12 PM. Bears (55%) follow standard 10 PM-6 AM schedules and peak 10 AM-2 PM. Wolves (15%) naturally sleep midnight-8 AM and peak creatively 5 PM-midnight. Dolphins (10%) are light sleepers with irregular patterns and high anxiety. Your chronotype affects fall-asleep latency, optimal work hours, and even when you should eat and exercise. The calculator adjusts sleep cycles and recommendations based on your chronotype.",
        },
        {
          question:
            "Can I change my chronotype or am I stuck with it forever?",
          answer:
            "Your chronotype is ~50% genetic and ~50% environmental. You can shift it slightly (30-90 min) with consistent light exposure and meal timing, but you can't turn a Wolf into a Lion. If you're a night owl forced to wake at 6 AM for work, use morning light therapy (10,000 lux for 20-30 min at 6-7 AM) and avoid light after 8 PM. Gradual shifts (15 min per week) work better than sudden changes. Most important: align your hardest mental work with your chronotype's peak hours, even if you can't change your sleep schedule.",
        },
        {
          question:
            "Why do I sometimes wake up groggy even after 8 hours of sleep?",
          answer:
            "You woke up mid-cycle, likely during NREM 3 (deep sleep) or mid-REM. Sleep cycles are 90-120 minutes, and waking during the deepest stages causes sleep inertia — grogginess lasting 30-60 minutes. This is why 7.5 hours (5 complete cycles) can feel better than 8 hours (5.33 cycles). Use the calculator to target wake times at the end of cycles (NREM 1 or REM-to-NREM transition). If you consistently wake groggy despite cycle timing, you may have sleep apnea or other sleep disorders — see a sleep specialist.",
        },
        {
          question: "How long does it take to recover from sleep debt?",
          answer:
            "You can recover about 30 minutes of sleep debt per night by sleeping longer. Mild debt (<3 hours) recovers in 3-4 nights. Moderate debt (3-5 hours) takes a week. Severe debt (>5 hours) needs 2+ weeks. Don't try to 'catch up' by sleeping 12 hours on Saturday — this creates social jet lag and worsens your rhythm. Instead, add 30-60 min per night consistently. Chronic sleep debt (months or years of insufficient sleep) may cause permanent changes to cognition, metabolism, and immune function that can't be fully recovered.",
        },
        {
          question: "What's the best time to nap and for how long?",
          answer:
            "The best nap window is 1-3 PM, aligned with the natural post-lunch dip in your circadian rhythm. Power naps (10-20 min) boost alertness without sleep inertia — you wake up refreshed. Full-cycle naps (90 min) include deep sleep and REM, improving memory and creativity, but can cause grogginess if interrupted. Avoid naps after 3 PM as they can disrupt nighttime sleep. If you're napping daily, you're not getting enough nighttime sleep. Wolves (night owls) benefit more from naps because social schedules restrict their natural sleep window.",
        },
        {
          question: "Why does caffeine affect my sleep even 8 hours later?",
          answer:
            "Caffeine has a 5-6 hour half-life, meaning if you drink coffee at 2 PM, 50% of the caffeine is still in your system at 8 PM. For sensitive individuals, the quarter-life (75% eliminated) is 10-12 hours. Caffeine blocks adenosine receptors — adenosine is the chemical that makes you sleepy. Even if you 'feel fine' and fall asleep, caffeine reduces deep sleep (NREM 3) by 15-30%, sabotaging sleep quality. The calculator recommends caffeine cutoffs 8-12 hours before bed based on your intake. If you drink 4+ cups daily, consider cutting off 10-12 hours before bed.",
        },
        {
          question: "Is it better to sleep less or wake up mid-cycle?",
          answer:
            "Always complete full cycles. Waking mid-cycle (especially during NREM 3 or REM) causes severe sleep inertia and impairs cognitive function for 30-60 minutes. If you have to choose between 6 hours (4 complete cycles) or 7 hours (4.67 cycles), choose 6 hours. Most people feel better on 7.5 hours (5 cycles) than 8 hours (5.33 cycles). That said, 4 cycles (6 hours) is below the recommended 7-9 hours for adults. Short sleep (<6 hours) chronically increases risk of cardiovascular disease, obesity, and cognitive decline. Use cycle timing for occasional short sleep, not as a long-term strategy.",
        },
        {
          question:
            "How does light exposure affect my sleep and circadian rhythm?",
          answer:
            "Light is the most powerful circadian regulator. Morning light (6-8 AM, 10,000 lux) resets your circadian clock and advances your sleep phase (makes you sleepy earlier). Blue light (450-480 nm) suppresses melatonin production for 2-3 hours, delaying sleep onset. Outdoor sunlight is 10,000-100,000 lux; indoor lighting is 300-500 lux. Get 10-30 min of outdoor light within 30 min of waking. Avoid screens 45-60 min before bed or use blue-light blocking glasses. For night owls, morning light therapy (10,000 lux lightbox for 20-30 min) can gradually shift your clock earlier.",
        },
        {
          question:
            "Why does the calculator recommend eating 3 hours before bed?",
          answer:
            "Digestion raises your core body temperature and diverts blood flow to your digestive system. Sleep onset requires a 1-2°F drop in core temperature. Large meals 3-4 hours before bed prevent this temperature drop and delay sleep by 30-60 minutes. Additionally, lying down with a full stomach increases acid reflux risk. Spicy or fatty foods can cause digestive discomfort during the night. A light snack (Greek yogurt, small banana) 1 hour before bed is OK and may even help some people sleep. Avoid alcohol 3-4 hours before bed — it fragments REM sleep in the second half of the night.",
        },
        {
          question:
            "What's the 'sleep quality score' and how is it calculated?",
          answer:
            "The sleep quality score (0-100) combines four factors: (1) Cycle completion — getting recommended cycles for your age (40 points), (2) Chronotype alignment — sleeping at times matching your genetic preference (25 points), (3) Sleep debt — lower debt = higher score (20 points), (4) Sleep hygiene — caffeine cutoff, screen deadline, meal timing (15 points). A score of 85+ is excellent, 70-84 is good, 60-69 is fair, below 60 indicates room for improvement. The score helps you see how well your current schedule aligns with optimal sleep practices. It's not a medical diagnosis, just a quick assessment tool.",
        },
        {
          question: "Can I train myself to need less sleep?",
          answer:
            "No. The idea that you can 'train' yourself to need 4-5 hours of sleep is a myth perpetuated by sleep-deprived overachievers. Adults need 7-9 hours per night (5-6 complete cycles). Less than 1% of the population has a genetic mutation (DEC2) that allows them to function on 6 hours. Chronic short sleep (<7 hours) increases risk of cardiovascular disease, obesity, diabetes, dementia, and early death. You might 'feel fine' on 6 hours due to adrenaline and caffeine, but cognitive tests show impaired performance equivalent to being legally drunk. Sleep is not optional — it's when your brain clears toxins, consolidates memories, and repairs tissue.",
        },
        {
          question:
            "What should I do if I can't fall asleep within 20-30 minutes?",
          answer:
            "Get out of bed. Lying awake frustrating yourself creates a negative association between your bed and wakefulness. Go to another room, do a boring activity in dim light (read a paper book, light stretching, listen to calming music), and return to bed only when you feel sleepy. This is called stimulus control therapy. Also check: Did you have caffeine 8+ hours before bed? Did you exercise late? Is your room cool (60-67°F), dark, and quiet? Did you look at screens in the last hour? Are you stressed or anxious? If you take >30 min to fall asleep 3+ nights per week for 3+ months, see a sleep specialist — you may have insomnia or another sleep disorder.",
        },
      ],

      // ─── RATING ────────────────────────────────────────────────
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

      // ─── COMMON ────────────────────────────────────────────────
      common: { home: "Home", calculators: "Calculators" },

      // ─── BUTTONS ───────────────────────────────────────────────
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

      // ─── SHARE ─────────────────────────────────────────────────
      share: { calculatedWith: "Calculated with Kalcufy.com" },

      // ─── ACCESSIBILITY ─────────────────────────────────────────
      accessibility: {
        mobileResults: "Results",
        closeModal: "Close",
        openMenu: "Menu",
      },

      // ─── SOURCES ───────────────────────────────────────────────
      sources: { title: "Sources & References" },
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════
  inputs: [
    // ─── Mode ──────────────────────────────────────────────────
    {
      id: "mode",
      type: "radio",
      defaultValue: "wakeup",
      options: [{ value: "wakeup" }, { value: "bedtime" }],
    },

    // ─── Target Time (3 selects side by side) ──────────────────
    {
      id: "targetHour",
      type: "select",
      defaultValue: "7",
      options: [
        { value: "1" },
        { value: "2" },
        { value: "3" },
        { value: "4" },
        { value: "5" },
        { value: "6" },
        { value: "7" },
        { value: "8" },
        { value: "9" },
        { value: "10" },
        { value: "11" },
        { value: "12" },
      ],
    },
    {
      id: "targetMinute",
      type: "select",
      defaultValue: "0",
      options: [
        { value: "0" },
        { value: "15" },
        { value: "30" },
        { value: "45" },
      ],
    },
    {
      id: "targetPeriod",
      type: "select",
      defaultValue: "am",
      options: [{ value: "am" }, { value: "pm" }],
    },

    // ─── Personal Profile ──────────────────────────────────────
    {
      id: "age",
      type: "number",
      defaultValue: 30,
      min: 5,
      max: 80,
      suffix: "years",
    },
    {
      id: "chronotype",
      type: "select",
      defaultValue: "bear",
      options: [
        { value: "bear" },
        { value: "lion" },
        { value: "wolf" },
        { value: "dolphin" },
      ],
    },
    {
      id: "fallAsleepTime",
      type: "select",
      defaultValue: "15",
      options: [
        { value: "5" },
        { value: "10" },
        { value: "15" },
        { value: "20" },
        { value: "30" },
        { value: "45" },
        { value: "60" },
      ],
    },

    // ─── Sleep Hygiene ─────────────────────────────────────────
    {
      id: "caffeinePerDay",
      type: "number",
      defaultValue: 2,
      min: 0,
      max: 10,
      suffix: "cups",
    },
    {
      id: "sleepDebtHours",
      type: "number",
      defaultValue: 0,
      min: 0,
      max: 20,
      suffix: "hours",
    },

    // ─── Nap Planning ──────────────────────────────────────────
    {
      id: "wantsNap",
      type: "radio",
      defaultValue: "no",
      options: [{ value: "no" }, { value: "yes" }],
    },
    {
      id: "napType",
      type: "select",
      defaultValue: "power10",
      options: [
        { value: "power10" },
        { value: "short20" },
        { value: "full90" },
      ],
      showWhen: { field: "wantsNap", value: "yes" },
    },
  ],

  inputGroups: [], // EMPTY for V4

  // ═══════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════
  results: [
    { id: "optimalTime", type: "primary", format: "text" },
    { id: "totalSleep", type: "secondary", format: "text" },
    { id: "sleepCycles", type: "secondary", format: "text" },
    { id: "sleepQuality", type: "secondary", format: "text" },
    { id: "caffeineDeadline", type: "secondary", format: "text" },
    { id: "screenDeadline", type: "secondary", format: "text" },
    { id: "lastMeal", type: "secondary", format: "text" },
    { id: "exerciseCutoff", type: "secondary", format: "text" },
    { id: "morningLight", type: "secondary", format: "text" },
    { id: "napWindow", type: "secondary", format: "text" },
    { id: "debtStatus", type: "secondary", format: "text" },
    { id: "recoveryPlan", type: "secondary", format: "text" },
    { id: "chronotypeAlignment", type: "secondary", format: "text" },
    { id: "cycleCompletion", type: "secondary", format: "text" },
    { id: "debtImpact", type: "secondary", format: "text" },
    { id: "hygieneScore", type: "secondary", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // INFO CARDS (5 cards)
  // ═══════════════════════════════════════════════════════════════
  infoCards: [
    { id: "schedule", type: "list", icon: "😴", itemCount: 4 },
    { id: "hygiene", type: "list", icon: "🛏️", itemCount: 4 },
    { id: "circadian", type: "list", icon: "☀️", itemCount: 4 },
    { id: "qualityFactors", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ═══════════════════════════════════════════════════════════════
  // CHART (Sleep Stages Visualization)
  // ═══════════════════════════════════════════════════════════════
  chart: {
    id: "sleepStages",
    type: "composed",
    xKey: "minute",
    height: 320,
    stacked: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "number",
    series: [
      { key: "nrem1", type: "area", color: "#93c5fd", stackId: "sleep" },
      { key: "nrem2", type: "area", color: "#60a5fa", stackId: "sleep" },
      { key: "nrem3", type: "area", color: "#3b82f6", stackId: "sleep" },
      { key: "rem", type: "area", color: "#1d4ed8", stackId: "sleep" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // DETAILED TABLE (Cycle Options)
  // ═══════════════════════════════════════════════════════════════
  detailedTable: {
    id: "cycleOptions",
    buttonLabel: "View Cycle Options",
    buttonIcon: "🔄",
    modalTitle: "Sleep Cycle Options",
    columns: [
      { id: "cycles", label: "Cycles", align: "left" },
      { id: "time", label: "Time", align: "center", highlight: true },
      { id: "duration", label: "Duration", align: "center" },
      { id: "quality", label: "Quality", align: "right" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // REFERENCE DATA
  // ═══════════════════════════════════════════════════════════════
  referenceData: [], // EMPTY for V4

  // ═══════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS (7 sections)
  // ═══════════════════════════════════════════════════════════════
  educationSections: [
    { id: "whatAreCycles", type: "prose", icon: "🔄" },
    { id: "chronotypes", type: "prose", icon: "🐻" },
    { id: "lightExposure", type: "list", icon: "☀️", itemCount: 6 },
    { id: "mealExerciseTiming", type: "list", icon: "🍽️", itemCount: 6 },
    { id: "sleepDebt", type: "prose", icon: "⚠️" },
    { id: "napping", type: "prose", icon: "😴" },
    { id: "commonMistakes", type: "list", icon: "❌", itemCount: 6 },
  ],

  // ═══════════════════════════════════════════════════════════════
  // FAQS (12 FAQs)
  // ═══════════════════════════════════════════════════════════════
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

  // ═══════════════════════════════════════════════════════════════
  // REFERENCES (3 references)
  // ═══════════════════════════════════════════════════════════════
  references: [
    {
      authors: "Walker MP",
      year: "2017",
      title: "Why We Sleep: Unlocking the Power of Sleep and Dreams",
      source: "Scribner",
      url: "https://www.simonandschuster.com/books/Why-We-Sleep/Matthew-Walker/9781501144318",
    },
    {
      authors: "Breus MJ",
      year: "2016",
      title:
        "The Power of When: Discover Your Chronotype and the Best Time to Eat Lunch, Ask for a Raise, Have Sex, Write a Novel",
      source: "Little, Brown Spark",
      url: "https://www.thepowerofwhenbook.com/",
    },
    {
      authors: "National Sleep Foundation",
      year: "2024",
      title: "Sleep Duration Recommendations by Age",
      source: "National Sleep Foundation",
      url: "https://www.thensf.org/how-much-sleep-do-we-really-need/",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // HERO, SIDEBAR, FEATURES, RELATED
  // ═══════════════════════════════════════════════════════════════
  hero: {
    badge: "Free Sleep Cycle Calculator",
    highlight:
      "chronotype analysis, light exposure plan, meal/exercise timing",
  },

  sidebar: {
    tips: [
      "Enter your chronotype for personalized sleep timing recommendations",
      "Get morning light within 30 min of waking to reset your circadian rhythm",
      "Avoid screens 45-60 min before bed — blue light suppresses melatonin",
      "Plan naps 1-3 PM for maximum benefit without disrupting nighttime sleep",
    ],
  },

  features: {
    highlights: [
      "Age-adjusted sleep cycles (children to seniors)",
      "4 chronotype profiles (Lion, Bear, Wolf, Dolphin)",
      "Caffeine cutoff calculator (based on half-life)",
      "Light exposure schedule (morning + evening)",
      "Meal & exercise timing recommendations",
      "Sleep debt tracking + recovery plan",
      "Sleep quality score (0-100)",
      "Visual sleep stages chart",
    ],
  },

  relatedCalculators: ["calorie", "bmi", "body-fat", "heart-rate-zones"],

  ads: {
    topBanner: true,
    sidebar: true,
    inContent: false,
  },
};

// ═══════════════════════════════════════════════════════════════
// CONSTANTS & HELPERS
// ═══════════════════════════════════════════════════════════════

/** Convert 12-hour time to minutes since midnight */
function to24hMin(h: number, m: number, period: string): number {
  let hour24 = h === 12 ? 0 : h;
  if (period === "pm" && h !== 12) hour24 += 12;
  return hour24 * 60 + m;
}

/** Normalize minutes to 0-1439 range */
function normMin(m: number): number {
  while (m < 0) m += 1440;
  while (m >= 1440) m -= 1440;
  return m;
}

/** Format minutes since midnight as 12h time */
function fmtTime(m: number): string {
  m = normMin(m);
  const h = Math.floor(m / 60);
  const min = m % 60;
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  const period = h < 12 ? "AM" : "PM";
  return `${hour12}:${min.toString().padStart(2, "0")} ${period}`;
}

/** Cycle length in minutes, adjusted by age */
function getCycleLen(a: number): number {
  if (a <= 13) return 95; // children: longer cycles
  if (a <= 25) return 95; // young adults: still long
  if (a <= 55) return 90; // middle adults: standard
  if (a <= 65) return 85; // older adults: shorter
  return 80; // seniors: shortest
}

/** Recommended number of complete cycles by age */
function getRecCycles(a: number): number {
  if (a <= 5) return 7; // 11-16 hours → ~7 cycles
  if (a <= 13) return 6; // 9-12 hours → ~6 cycles
  if (a <= 17) return 6; // 8-10 hours → ~6 cycles
  if (a <= 64) return 5; // 7-9 hours  → 5 cycles
  return 5; // 7-8 hours  → 5 cycles
}

/** Chronotype latency adjustment (minutes added to fall-asleep time) */
function getChronoAdj(c: string): number {
  switch (c) {
    case "lion":
      return -5; // falls asleep faster (aligned early schedule)
    case "bear":
      return 0; // standard
    case "wolf":
      return 5; // takes slightly longer
    case "dolphin":
      return 10; // light sleeper, more latency
    default:
      return 0;
  }
}

// ═══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════

export function calculateSleepCalculator(data: {
  values: Record<string, unknown>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;

  // Translation helpers
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ─── Read inputs ───────────────────────────────────────────────
  const mode = values.mode as string;
  const targetHour = parseInt(values.targetHour as string);
  const targetMinute = parseInt(values.targetMinute as string);
  const targetPeriod = values.targetPeriod as string;
  const age = values.age as number;
  const chronotype = values.chronotype as string;
  const fallAsleepMin = parseInt(values.fallAsleepTime as string);
  const caffeinePerDay = values.caffeinePerDay as number;
  const sleepDebtHours = values.sleepDebtHours as number;
  const wantsNap = values.wantsNap as string;
  const napType = (values.napType as string) || "power10";

  // ─── Validate ──────────────────────────────────────────────────
  if (!mode || !age) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ═══════════════════════════════════════════════════════════════
  // CORE CALCULATIONS
  // ═══════════════════════════════════════════════════════════════

  const targetMin = to24hMin(targetHour, targetMinute, targetPeriod);
  const cycleLen = getCycleLen(age);
  const recCycles = getRecCycles(age);
  const adjustedLatency = Math.max(
    5,
    fallAsleepMin + getChronoAdj(chronotype)
  );
  const totalSleepMin = recCycles * cycleLen;

  // Calculate optimal time and identify bedtime/wake time
  let optimalMin: number;
  let bedtimeMin: number;
  let wakeMin: number;

  if (mode === "wakeup") {
    // User provides wake time → calculate bedtime
    wakeMin = targetMin;
    optimalMin = targetMin - totalSleepMin - adjustedLatency;
    bedtimeMin = normMin(optimalMin);
    wakeMin = targetMin;
  } else {
    // User provides bedtime → calculate wake time
    bedtimeMin = targetMin;
    optimalMin = targetMin + adjustedLatency + totalSleepMin;
    wakeMin = normMin(optimalMin);
    bedtimeMin = targetMin;
  }

  const optNorm = normMin(optimalMin);

  // ═══════════════════════════════════════════════════════════════
  // SLEEP QUALITY SCORE (0-100)
  // ═══════════════════════════════════════════════════════════════

  // Factor 1: Cycle Completion (40 points)
  let cycleScore = 40;
  if (recCycles < 5) cycleScore = 30;
  if (recCycles > 6) cycleScore = 40;

  // Factor 2: Chronotype Alignment (25 points)
  let chronoScore = 25;
  const bedtimeHour = Math.floor(bedtimeMin / 60);
  if (chronotype === "lion" && bedtimeHour >= 21 && bedtimeHour <= 22)
    chronoScore = 25;
  else if (chronotype === "lion") chronoScore = 15;
  if (chronotype === "bear" && bedtimeHour >= 22 && bedtimeHour <= 23)
    chronoScore = 25;
  else if (chronotype === "bear") chronoScore = 15;
  if (
    chronotype === "wolf" &&
    ((bedtimeHour >= 23 && bedtimeHour <= 24) || bedtimeHour === 0)
  )
    chronoScore = 25;
  else if (chronotype === "wolf") chronoScore = 15;
  if (chronotype === "dolphin" && bedtimeHour >= 22 && bedtimeHour <= 23)
    chronoScore = 25;
  else if (chronotype === "dolphin") chronoScore = 15;

  // Factor 3: Sleep Debt (20 points)
  let debtScore = 20;
  if (sleepDebtHours > 0 && sleepDebtHours <= 2) debtScore = 15;
  if (sleepDebtHours > 2 && sleepDebtHours <= 5) debtScore = 10;
  if (sleepDebtHours > 5) debtScore = 5;

  // Factor 4: Sleep Hygiene (15 points)
  let hygieneScore = 15;
  if (caffeinePerDay > 4) hygieneScore -= 5;
  if (fallAsleepMin > 30) hygieneScore -= 5;

  const sleepQualityScore = Math.round(
    cycleScore + chronoScore + debtScore + hygieneScore
  );

  // ═══════════════════════════════════════════════════════════════
  // FORMAT RESULTS
  // ═══════════════════════════════════════════════════════════════

  // ── Primary: Optimal Time ──
  const modePrefix =
    mode === "wakeup"
      ? v["Bedtime"] || "🛏️ Bedtime"
      : v["Wake-Up"] || "⏰ Wake Up";
  const optimalTimeStr = `${modePrefix}: ${fmtTime(optNorm)}`;

  // ── Total Sleep ──
  const totalH = Math.floor(totalSleepMin / 60);
  const totalM = totalSleepMin % 60;
  const hLabel = v["hours"] || "hours";
  const mLabel = v["minutes"] || "minutes";
  const totalSleepStr =
    totalM > 0
      ? `${totalH} ${hLabel} ${totalM} ${mLabel}`
      : `${totalH} ${hLabel}`;

  // ── Sleep Cycles ──
  const cycleWord =
    recCycles === 1 ? v["cycle"] || "cycle" : v["cycles"] || "cycles";
  const minWord = v["min"] || "min";
  const sleepCyclesStr = `${recCycles} ${cycleWord} × ${cycleLen} ${minWord}`;

  // ── Sleep Quality Score ──
  const sleepQualityStr = `${sleepQualityScore}/100${
    sleepQualityScore >= 85
      ? " ⭐ Excellent"
      : sleepQualityScore >= 70
        ? " ✅ Good"
        : sleepQualityScore >= 60
          ? " ⚠️ Fair"
          : " ❌ Needs Work"
  }`;

  // ── Caffeine Cutoff ──
  let caffeineStr: string;
  if (caffeinePerDay === 0) {
    caffeineStr = v["No caffeine needed"] || "No caffeine needed";
  } else {
    let hoursBack = 8;
    if (caffeinePerDay >= 3) hoursBack = 10;
    if (caffeinePerDay >= 5) hoursBack = 12;
    const cutoffMin = normMin(bedtimeMin - hoursBack * 60);
    caffeineStr = `Before ${fmtTime(cutoffMin)}`;
  }

  // ── Screen Cutoff ──
  const screenMin = normMin(bedtimeMin - 45);
  const screenStr = fmtTime(screenMin);

  // ── Morning Light Window ──
  const lightStart = normMin(wakeMin);
  const lightEnd = normMin(wakeMin + 30);
  const morningLightStr = `${fmtTime(lightStart)} – ${fmtTime(lightEnd)} (10-30 min)`;

  // ── Last Meal Deadline ──
  const mealMin = normMin(bedtimeMin - 180); // 3 hours before
  const lastMealStr = `Before ${fmtTime(mealMin)}`;

  // ── Exercise Cutoff ──
  const exerciseMin = normMin(bedtimeMin - 180); // 3 hours before
  const exerciseCutoffStr = `Before ${fmtTime(exerciseMin)}`;

  // ── Nap Window ──
  let napStr: string;
  if (wantsNap !== "yes") {
    napStr = v["No nap planned"] || "No nap planned";
  } else {
    // Calculate midpoint of waking hours
    let wakingDur = bedtimeMin - wakeMin;
    if (wakingDur <= 0) wakingDur += 1440;
    const midpoint = normMin(wakeMin + Math.floor(wakingDur / 2));

    // Nap duration
    let napDur = 20;
    if (napType === "power10") napDur = 10;
    else if (napType === "full90") napDur = 90;

    let napStart = midpoint - Math.floor(napDur / 2);
    // Cap: no later than 3 PM end
    const maxStart = 900 - napDur; // 3:00 PM minus duration
    if (napStart > maxStart) napStart = maxStart;
    // Floor: no earlier than 12 PM
    if (napStart < 720) napStart = 720;
    const napEnd = napStart + napDur;

    napStr = `${fmtTime(napStart)} – ${fmtTime(napEnd)}`;
  }

  // ── Sleep Debt Status ──
  let debtStr: string;
  if (sleepDebtHours <= 0) {
    debtStr = v["No sleep debt"] || "No sleep debt ✅";
  } else {
    const severity =
      sleepDebtHours <= 2
        ? v["mild"] || "mild"
        : sleepDebtHours <= 5
          ? v["moderate"] || "moderate"
          : v["severe"] || "severe";
    const deficitWord = v["deficit"] || "deficit";
    debtStr = `${sleepDebtHours}h ${deficitWord} — ${severity}`;
  }

  // ── Recovery Plan ──
  let recoveryStr: string;
  if (sleepDebtHours <= 0) {
    recoveryStr =
      v["Keep current schedule"] || "On track — keep your schedule!";
  } else {
    const extraMin = 30;
    const recoveryNights = Math.ceil((sleepDebtHours * 60) / extraMin);
    const nightWord =
      recoveryNights === 1
        ? v["night"] || "night"
        : v["nights"] || "nights";
    recoveryStr = `+${extraMin} ${minWord} × ${recoveryNights} ${nightWord}`;
  }

  // ── Quality Factors (for InfoCard) ──
  const chronotypeAlignmentStr = `${chronoScore}/25${chronoScore >= 20 ? " ✅" : chronoScore >= 15 ? " ⚠️" : " ❌"}`;
  const cycleCompletionStr = `${cycleScore}/40${cycleScore >= 35 ? " ✅" : cycleScore >= 30 ? " ⚠️" : " ❌"}`;
  const debtImpactStr = `${debtScore}/20${debtScore >= 15 ? " ✅" : debtScore >= 10 ? " ⚠️" : " ❌"}`;
  const hygieneScoreStr = `${hygieneScore}/15${hygieneScore >= 12 ? " ✅" : hygieneScore >= 8 ? " ⚠️" : " ❌"}`;

  // ═══════════════════════════════════════════════════════════════
  // DETAILED TABLE: Cycle Options
  // ═══════════════════════════════════════════════════════════════

  const cycleOptions: Record<string, string>[] = [];
  const cycleCounts = [6, 5, 4, 3];

  for (const c of cycleCounts) {
    const sleepMin = c * cycleLen;
    let timeMin: number;
    if (mode === "wakeup") {
      timeMin = targetMin - sleepMin - adjustedLatency;
    } else {
      timeMin = targetMin + adjustedLatency + sleepMin;
    }
    timeMin = normMin(timeMin);

    const h = Math.floor(sleepMin / 60);
    const m = sleepMin % 60;
    const durStr = m > 0 ? `${h}h ${m}m` : `${h}h`;

    let quality: string;
    if (c > recCycles) {
      quality = v["Excellent"] || "⭐ Excellent";
    } else if (c === recCycles) {
      quality = v["Recommended"] || "✅ Recommended";
    } else if (c === recCycles - 1) {
      quality = v["Adequate"] || "Adequate";
    } else {
      quality = v["Minimum"] || "⚠️ Minimum";
    }

    cycleOptions.push({
      cycles: `${c} ${v["cycles"] || "cycles"}`,
      time: fmtTime(timeMin),
      duration: durStr,
      quality,
    });
  }

  // Summary row (last row = auto-highlighted by engine)
  cycleOptions.push({
    cycles: `Best: ${recCycles} ${v["cycles"] || "cycles"}`,
    time: fmtTime(optNorm),
    duration: totalM > 0 ? `${totalH}h ${totalM}m` : `${totalH}h`,
    quality: `✅ Optimal for age ${age}`,
  });

  // ═══════════════════════════════════════════════════════════════
  // CHART DATA: Sleep Stages
  // ═══════════════════════════════════════════════════════════════

  const chartData: Array<Record<string, unknown>> = [];
  const cycleCount = recCycles;

  // Generate sleep stages data
  for (let cycle = 0; cycle < cycleCount; cycle++) {
    const cycleStart = cycle * cycleLen;

    // NREM 1 (light): 5 min
    for (let i = 0; i < 5; i++) {
      chartData.push({
        minute: cycleStart + i,
        nrem1: 1,
        nrem2: 0,
        nrem3: 0,
        rem: 0,
      });
    }

    // NREM 2 (light): 20 min
    for (let i = 5; i < 25; i++) {
      chartData.push({
        minute: cycleStart + i,
        nrem1: 0,
        nrem2: 1,
        nrem3: 0,
        rem: 0,
      });
    }

    // NREM 3 (deep): 30 min (decreases in later cycles)
    const nrem3Duration = cycle < 2 ? 30 : cycle < 4 ? 20 : 10;
    for (let i = 25; i < 25 + nrem3Duration; i++) {
      chartData.push({
        minute: cycleStart + i,
        nrem1: 0,
        nrem2: 0,
        nrem3: 1,
        rem: 0,
      });
    }

    // REM: remainder (increases in later cycles)
    const remStart = 25 + nrem3Duration;
    const remDuration = cycleLen - remStart;
    for (let i = remStart; i < remStart + remDuration; i++) {
      chartData.push({
        minute: cycleStart + i,
        nrem1: 0,
        nrem2: 0,
        nrem3: 0,
        rem: 1,
      });
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // SUMMARY
  // ═══════════════════════════════════════════════════════════════

  const modeAction = mode === "wakeup" ? "Go to bed at" : "Wake up at";
  const summaryTemplate =
    f.summary ||
    "{mode} {optimalTime} for {totalSleep} of sleep ({cycles} complete cycles). Sleep quality score: {score}/100.";
  const summary = summaryTemplate
    .replace("{mode}", modeAction)
    .replace("{optimalTime}", fmtTime(optNorm))
    .replace("{totalSleep}", totalSleepStr)
    .replace("{cycles}", String(recCycles))
    .replace("{score}", String(sleepQualityScore));

  // ═══════════════════════════════════════════════════════════════
  // RETURN
  // ═══════════════════════════════════════════════════════════════

  return {
    values: {
      optimalTime: optimalTimeStr,
      totalSleep: totalSleepStr,
      sleepCycles: sleepCyclesStr,
      sleepQuality: sleepQualityStr,
      caffeineDeadline: caffeineStr,
      screenDeadline: screenStr,
      morningLight: morningLightStr,
      lastMeal: lastMealStr,
      exerciseCutoff: exerciseCutoffStr,
      napWindow: napStr,
      debtStatus: debtStr,
      recoveryPlan: recoveryStr,
      chronotypeAlignment: chronotypeAlignmentStr,
      cycleCompletion: cycleCompletionStr,
      debtImpact: debtImpactStr,
      hygieneScore: hygieneScoreStr,
    },
    formatted: {
      optimalTime: optimalTimeStr,
      totalSleep: totalSleepStr,
      sleepCycles: sleepCyclesStr,
      sleepQuality: sleepQualityStr,
      caffeineDeadline: caffeineStr,
      screenDeadline: screenStr,
      morningLight: morningLightStr,
      lastMeal: lastMealStr,
      exerciseCutoff: exerciseCutoffStr,
      napWindow: napStr,
      debtStatus: debtStr,
      recoveryPlan: recoveryStr,
      chronotypeAlignment: chronotypeAlignmentStr,
      cycleCompletion: cycleCompletionStr,
      debtImpact: debtImpactStr,
      hygieneScore: hygieneScoreStr,
    },
    summary,
    isValid: true,
    metadata: {
      tableData: cycleOptions,
      chartData,
    },
  };
}

export default sleepCalculatorConfig;
