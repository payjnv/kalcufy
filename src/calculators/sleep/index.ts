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
    es: {
      "name": "Calculadora de Sueño",
      "slug": "calculadora-sueno",
      "subtitle": "Encuentra tu horario de sueño perfecto con sincronización personalizada de ciclos, alineación de cronotipo, corte de cafeína, plan de exposición a luz y planificación de recuperación — calculadora gratuita de ciclos de sueño",
      "breadcrumb": "Sueño",
      "seo": {
        "title": "Calculadora de Sueño - Planificador de Hora de Dormir y Despertar con Cronotipo",
        "description": "Calcula tu hora óptima para dormir o despertar con ciclos de sueño ajustados por edad y análisis de cronotipo. Obtén corte de cafeína, horario de exposición a luz, horario de comidas, ventana de siesta y plan de recuperación de deuda — completamente gratis.",
        "shortDescription": "Encuentra las horas óptimas para dormir y despertar usando ciclos de sueño y cronotipo",
        "keywords": [
          "calculadora de sueño",
          "calculadora hora de dormir",
          "calculadora ciclo de sueño",
          "calculadora hora de despertar",
          "calculadora cronotipo",
          "calculadora siesta",
          "rastreador deuda de sueño",
          "calculadora ritmo circadiano"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "mode": {
          "label": "Quiero encontrar mi...",
          "helpText": "Elige qué calcular",
          "options": {
            "wakeup": "Hora de dormir (conozco mi hora de despertar)",
            "bedtime": "Hora de despertar (conozco mi hora de dormir)"
          }
        },
        "targetHour": {
          "label": "Hora",
          "helpText": "",
          "options": {
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
            "12": "12"
          }
        },
        "targetMinute": {
          "label": "Minuto",
          "helpText": "",
          "options": {
            "0": ":00",
            "15": ":15",
            "30": ":30",
            "45": ":45"
          }
        },
        "targetPeriod": {
          "label": "AM / PM",
          "helpText": "",
          "options": {
            "am": "AM",
            "pm": "PM"
          }
        },
        "age": {
          "label": "Edad",
          "helpText": "Las necesidades de sueño y duración de ciclos cambian con la edad"
        },
        "chronotype": {
          "label": "Cronotipo",
          "helpText": "Tu preferencia natural de sueño-vigilia",
          "options": {
            "bear": "🐻 Oso — Estándar (55%)",
            "lion": "🦁 León — Madrugador (15%)",
            "wolf": "🐺 Lobo — Búho Nocturno (15%)",
            "dolphin": "🐬 Delfín — Sueño Ligero (10%)"
          }
        },
        "fallAsleepTime": {
          "label": "Tiempo para Quedarse Dormido",
          "helpText": "Cuánto tiempo tardas normalmente en quedarte dormido",
          "options": {
            "5": "5 min — muy rápido",
            "10": "10 min — rápido",
            "15": "15 min — promedio",
            "20": "20 min — normal",
            "30": "30 min — lento",
            "45": "45 min — muy lento",
            "60": "60 min — dificultad"
          }
        },
        "caffeinePerDay": {
          "label": "Cafeína Diaria",
          "helpText": "Tazas de café, té o bebidas energéticas"
        },
        "sleepDebtHours": {
          "label": "Deuda de Sueño Semanal",
          "helpText": "Horas de sueño perdidas esta semana"
        },
        "wantsNap": {
          "label": "¿Planificar una siesta?",
          "helpText": "Obtén tu ventana óptima de siesta",
          "options": {
            "no": "No",
            "yes": "Sí"
          }
        },
        "napType": {
          "label": "Tipo de Siesta",
          "helpText": "Elige según el tiempo disponible y la necesidad",
          "options": {
            "power10": "Siesta Energizante (10 min)",
            "short20": "Siesta Corta (20 min)",
            "full90": "Ciclo Completo (90 min)"
          }
        }
      },
      "inputGroups": {},
      "results": {
        "optimalTime": {
          "label": "Hora Óptima"
        },
        "totalSleep": {
          "label": "Sueño Total"
        },
        "sleepCycles": {
          "label": "Ciclos Completos"
        },
        "caffeineDeadline": {
          "label": "Corte de Cafeína"
        },
        "screenDeadline": {
          "label": "Apagar Pantallas"
        },
        "napWindow": {
          "label": "Ventana de Siesta"
        },
        "debtStatus": {
          "label": "Deuda de Sueño"
        },
        "recoveryPlan": {
          "label": "Plan de Recuperación"
        },
        "sleepQuality": {
          "label": "Puntuación Calidad de Sueño"
        },
        "morningLight": {
          "label": "Luz Matutina"
        },
        "lastMeal": {
          "label": "Última Comida"
        },
        "exerciseCutoff": {
          "label": "Corte de Ejercicio"
        }
      },
      "tooltips": {
        "optimalTime": "Calculado usando ciclos de sueño ajustados por edad y latencia para dormirse",
        "totalSleep": "Tiempo total durmiendo (excluye tiempo para quedarse dormido)",
        "sleepCycles": "Ciclos completos de sueño — cada uno incluye etapas NREM + REM",
        "caffeineDeadline": "Basado en la vida media de 5 horas de la cafeína y tu consumo diario",
        "screenDeadline": "La luz azul suprime la melatonina — pantallas apagadas 45 min antes de dormir",
        "napWindow": "Horario óptimo de siesta basado en cronotipo y horas de vigilia",
        "debtStatus": "Déficit acumulativo de sueño — leve (<3h), moderado (3-5h), severo (>5h)",
        "recoveryPlan": "Añade 30 min por noche para recuperar la deuda de sueño gradualmente",
        "sleepQuality": "Puntuación basada en ciclos, alineación de cronotipo, deuda e higiene del sueño",
        "morningLight": "Exposición a luz brillante dentro de 30 min al despertar reinicia el ritmo circadiano",
        "lastMeal": "Comer 3+ horas antes de dormir mejora la calidad del sueño y reduce el reflujo",
        "exerciseCutoff": "El ejercicio vigoroso eleva la temperatura corporal — evitar 3h antes de dormir"
      },
      "presets": {
        "earlyBird": {
          "label": "Madrugador (León)",
          "description": "Cronotipo león, despertar 5:30 AM, cafeína mínima, sin deuda"
        },
        "standard": {
          "label": "Estándar (Oso)",
          "description": "Cronotipo oso, despertar 7:00 AM, cafeína moderada, sin deuda"
        },
        "nightOwl": {
          "label": "Búho Nocturno (Lobo)",
          "description": "Cronotipo lobo, despertar 9:00 AM, cafeína alta, 2h deuda, siesta energizante"
        },
        "shiftWorker": {
          "label": "Trabajador de Turno",
          "description": "Despertar temprano, cafeína alta, 5h deuda, plan de siesta, recuperación necesaria"
        },
        "student": {
          "label": "Estudiante",
          "description": "Despertar 8 AM, cafeína moderada, 3h deuda, siesta recomendada"
        },
        "lightSleeper": {
          "label": "Sueño Ligero (Delfín)",
          "description": "Cronotipo delfín, despertar 6:30 AM, 30 min latencia para dormirse"
        }
      },
      "values": {
        "hours": "horas",
        "hour": "hora",
        "minutes": "minutos",
        "min": "min",
        "cycle": "ciclo",
        "cycles": "ciclos",
        "Bedtime": "🛏️ Hora de Dormir",
        "Wake-Up": "⏰ Despertar",
        "No caffeine needed": "No se necesita cafeína",
        "No nap planned": "No hay siesta planificada",
        "No sleep debt": "Sin deuda de sueño ✅",
        "mild": "leve",
        "moderate": "moderado",
        "severe": "severo",
        "deficit": "déficit",
        "Keep current schedule": "En camino — ¡mantén tu horario!",
        "night": "noche",
        "nights": "noches",
        "Excellent": "⭐ Excelente",
        "Recommended": "✅ Recomendado",
        "Adequate": "Adecuado",
        "Minimum": "⚠️ Mínimo",
        "NREM1": "NREM 1 (Ligero)",
        "NREM2": "NREM 2",
        "NREM3": "NREM 3 (Profundo)",
        "REM": "REM (Sueños)"
      },
      "formats": {
        "summary": "{mode} {optimalTime} para {totalSleep} de sueño ({cycles} ciclos completos). Puntuación de calidad de sueño: {score}/100."
      },
      "infoCards": {
        "schedule": {
          "title": "Tu Horario de Sueño",
          "items": [
            {
              "label": "Hora Óptima",
              "valueKey": "optimalTime"
            },
            {
              "label": "Sueño Total",
              "valueKey": "totalSleep"
            },
            {
              "label": "Ciclos de Sueño",
              "valueKey": "sleepCycles"
            },
            {
              "label": "Calidad de Sueño",
              "valueKey": "sleepQuality"
            }
          ]
        },
        "hygiene": {
          "title": "Plazos de Higiene del Sueño",
          "items": [
            {
              "label": "Corte de Cafeína",
              "valueKey": "caffeineDeadline"
            },
            {
              "label": "Apagar Pantallas",
              "valueKey": "screenDeadline"
            },
            {
              "label": "Última Comida",
              "valueKey": "lastMeal"
            },
            {
              "label": "Corte de Ejercicio",
              "valueKey": "exerciseCutoff"
            }
          ]
        },
        "circadian": {
          "title": "Ritmo Circadiano",
          "items": [
            {
              "label": "Luz Matutina",
              "valueKey": "morningLight"
            },
            {
              "label": "Ventana de Siesta",
              "valueKey": "napWindow"
            },
            {
              "label": "Deuda de Sueño",
              "valueKey": "debtStatus"
            },
            {
              "label": "Plan de Recuperación",
              "valueKey": "recoveryPlan"
            }
          ]
        },
        "qualityFactors": {
          "title": "Factores de Calidad del Sueño",
          "items": [
            {
              "label": "Alineación de Cronotipo",
              "valueKey": "chronotypeAlignment"
            },
            {
              "label": "Finalización de Ciclos",
              "valueKey": "cycleCompletion"
            },
            {
              "label": "Impacto de Deuda de Sueño",
              "valueKey": "debtImpact"
            },
            {
              "label": "Higiene del Sueño",
              "valueKey": "hygieneScore"
            }
          ]
        },
        "tips": {
          "title": "Consejos Profesionales",
          "items": [
            "Obtén luz brillante dentro de 30 min al despertar para reiniciar tu ritmo circadiano",
            "Evita la cafeína 8-10 horas antes de dormir — tiene una vida media de 5-6 horas",
            "Mantén tu habitación fresca (15-19°C), oscura y silenciosa para un sueño óptimo",
            "Las siestas energizantes (10-20 min) aumentan el estado de alerta sin aturdimiento — los ciclos completos (90 min) mejoran la memoria"
          ]
        }
      },
      "chart": {
        "title": "Etapas del Sueño a Través de tus Ciclos",
        "xLabel": "Minutos Dormido",
        "yLabel": "Etapa del Sueño",
        "series": {
          "nrem1": "NREM 1 (Ligero)",
          "nrem2": "NREM 2",
          "nrem3": "NREM 3 (Profundo)",
          "rem": "REM (Sueños)"
        }
      },
      "detailedTable": {
        "cycleOptions": {
          "button": "Ver Opciones de Ciclos",
          "title": "Opciones de Ciclos de Sueño",
          "columns": {
            "cycles": "Ciclos",
            "time": "Hora",
            "duration": "Duración",
            "quality": "Calidad"
          }
        }
      },
      "education": {
        "whatAreCycles": {
          "title": "¿Qué son los Ciclos de Sueño?",
          "content": "Los ciclos de sueño son períodos de 90 minutos durante los cuales tu cerebro pasa por cuatro etapas distintas: NREM 1 (sueño ligero, transición), NREM 2 (sueño ligero, temperatura corporal baja), NREM 3 (sueño profundo, restauración física), y REM (movimiento ocular rápido, sueños y consolidación de memoria). Un ciclo completo toma 90-120 minutos dependiendo de tu edad — los niños tienen ciclos más largos (95-100 min) mientras que los adultos mayores tienen ciclos más cortos (80-85 min). Típicamente pasas por 4-6 ciclos por noche. Despertar durante NREM 3 o en medio del REM causa aturdimiento, mientras despertar al final de un ciclo (durante NREM 1 o en la transición REM-a-NREM 1) te deja sintiéndote renovado. Por eso puedes dormir 8 horas y sentirte terrible, o dormir 7.5 horas y sentirte increíble — no es solo duración, es alineación de ciclos."
        },
        "chronotypes": {
          "title": "Entendiendo los Cronotipos",
          "content": "Tu cronotipo es tu preferencia circadiana determinada genéticamente — no es un hábito, es tu biología. Aproximadamente 55% de las personas son Osos (duermen estándar 10pm-6am), 15% son Leones (madrugadores que despiertan 5-6am naturalmente), 15% son Lobos (búhos nocturnos que alcanzan su pico 9pm-medianoche), y 10% son Delfines (duermen ligero con patrones irregulares). El cronotipo afecta más que la hora de dormir: Los Leones alcanzan su pico mental 8am-12pm, los Osos alcanzan su pico 10am-2pm, los Lobos alcanzan su pico 5pm-medianoche. Tratar de forzar a un Lobo a ser productivo a las 8am es como pedirle a un León hacer trabajo creativo a las 11pm — estás luchando contra tu biología. Tu cronotipo también afecta la latencia para quedarse dormido: Los Leones se duermen en 10-15 min, los Osos en 15-20 min, los Lobos en 20-30 min, los Delfines en 30-45 min. La calculadora ajusta esto automáticamente."
        },
        "lightExposure": {
          "title": "Exposición a Luz y Ritmo Circadiano",
          "items": [
            {
              "text": "Luz matutina (6-8 AM) — Obtén 10-30 min de luz brillante dentro de 30 min al despertar. La luz solar exterior es mejor (10,000 lux), pero una caja de luz (10,000 lux) funciona. Esto reinicia tu reloj circadiano y avanza tu fase de sueño.",
              "type": "success"
            },
            {
              "text": "Luz del mediodía — La exposición a luz brillante durante el almuerzo ayuda a consolidar la señal matutina. Una caminata exterior de 15 min es ideal.",
              "type": "info"
            },
            {
              "text": "Evita luz azul después del atardecer — Las longitudes de onda azules (450-480nm) suprimen la producción de melatonina. Pantallas apagadas 45-60 min antes de dormir. Usa gafas bloqueadoras de luz azul si es inevitable.",
              "type": "warning"
            },
            {
              "text": "Iluminación tenue en la noche — Mantén las luces tenues (< 50 lux) 2-3 horas antes de dormir. Usa bombillas de color cálido (ámbar/rojo) en dormitorios y baños.",
              "type": "info"
            },
            {
              "text": "Dormitorio completamente oscuro — La oscuridad completa durante el sueño maximiza la melatonina. Usa cortinas opacas o una máscara para los ojos.",
              "type": "info"
            },
            {
              "text": "Terapia de luz para búhos nocturnos — Si eres un Lobo luchando con horarios de trabajo tempranos, usa una caja de luz de 10,000 lux por 20-30 min a las 6-7 AM para cambiar gradualmente tu reloj más temprano.",
              "type": "success"
            }
          ]
        },
        "mealExerciseTiming": {
          "title": "Horario de Comidas y Ejercicio para Mejor Sueño",
          "items": [
            {
              "text": "Última comida 3+ horas antes de dormir — La digestión eleva la temperatura corporal central y retrasa el inicio del sueño. Comidas grandes 4+ horas antes de dormir es ideal.",
              "type": "warning"
            },
            {
              "text": "Evita alcohol 3-4 horas antes de dormir — El alcohol interrumpe el sueño REM y causa sueño fragmentado en la segunda mitad de la noche.",
              "type": "warning"
            },
            {
              "text": "Ejercicio vigoroso 3+ horas antes de dormir — Los entrenamientos intensos elevan la temperatura central por 4-6 horas. El ejercicio matutino o vespertino es mejor.",
              "type": "info"
            },
            {
              "text": "Estiramientos ligeros/yoga está bien — El movimiento suave 30-60 min antes de dormir puede ayudar con la relajación. Evita picos de frecuencia cardíaca.",
              "type": "success"
            },
            {
              "text": "Corte de cafeína — El café tiene una vida media de 5-6 horas. Si eres sensible, corta 10-12 horas antes de dormir. El té tiene menos cafeína pero aún importa.",
              "type": "warning"
            },
            {
              "text": "Proteína antes de dormir (opcional) — Un pequeño snack alto en proteína (yogur griego, requesón) 1 hora antes de dormir puede mejorar la recuperación muscular nocturna sin interrumpir el sueño.",
              "type": "info"
            }
          ]
        },
        "sleepDebt": {
          "title": "Recuperación de Deuda de Sueño",
          "content": "La deuda de sueño es el sueño perdido acumulativo — si necesitas 8 horas pero duermes 6, acumulas 2 horas de deuda por noche. La investigación muestra que puedes recuperar aproximadamente 30 minutos de deuda por noche durmiendo más tiempo. No trates de pagar toda la deuda en un fin de semana — dormir 12 horas el sábado crea 'jet lag social' que interrumpe tu ritmo. En su lugar, añade 30-60 min por noche durante una semana. La deuda leve (<3h) se recupera en 3-4 noches, la deuda moderada (3-5h) toma una semana, la deuda severa (>5h) necesita 2+ semanas. La deuda crónica (meses/años) puede necesitar ayuda profesional. Signos de deuda no recuperada: somnolencia diurna, microsuelos (sueño involuntario breve), tiempo de reacción reducido, cambios de humor, antojos de azúcar. La calculadora te da un plan de recuperación noche por noche."
        },
        "napping": {
          "title": "Siestas Estratégicas",
          "content": "Las siestas son poderosas si se programan correctamente. Las siestas energizantes (10-20 min) proporcionan un impulso de alerta sin inercia del sueño — despiertas renovado. Las siestas de ciclo completo (90 min) incluyen sueño profundo y REM, mejorando la consolidación de memoria y creatividad, pero pueden causar aturdimiento si se interrumpen a medio ciclo. Evita siestas >90 min o después de las 3 PM — pueden interrumpir el sueño nocturno. La ventana ideal de siesta es 1-3 PM, alineada con la caída natural post-almuerzo en el ritmo circadiano. Para los búhos nocturnos (Lobos), las siestas son más beneficiosas porque su sueño nocturno a menudo se ve restringido por horarios sociales/laborales. Para los madrugadores (Leones), las siestas pueden señalar deuda de sueño — si estás tomando siestas diariamente, no estás durmiendo suficiente por la noche. La calculadora coloca tu siesta en el punto medio de tus horas de vigilia, limitado a las 3 PM."
        },
        "commonMistakes": {
          "title": "Errores Comunes del Sueño",
          "items": [
            {
              "text": "Dormir hasta tarde los fines de semana — Ir a la cama 11 PM viernes, 3 AM sábado es como volar a Hawái y regresar cada fin de semana (jet lag social). Mantente dentro de ±1 hora de tu horario de días laborables.",
              "type": "warning"
            },
            {
              "text": "Presionar el botón de repetir — Esos 10 minutos extra son sueño fragmentado de baja calidad. Entras en un nuevo ciclo de sueño que no completarás. Pon una alarma y levántate.",
              "type": "warning"
            },
            {
              "text": "Usar pantallas en la cama — Tu cerebro asocia la cama con el sueño. Leer en una tableta o hacer scroll en tu teléfono entrena a tu cerebro que cama = tiempo despierto.",
              "type": "warning"
            },
            {
              "text": "Hacer ejercicio justo antes de dormir — Tu temperatura central necesita bajar 1-2°F para iniciar el sueño. El ejercicio vigoroso la eleva por 4-6 horas.",
              "type": "warning"
            },
            {
              "text": "Depender de pastillas para dormir a largo plazo — La mayoría de medicamentos para dormir (Ambien, Lunesta) no producen arquitectura natural del sueño. Te sedan pero no proporcionan sueño reparador.",
              "type": "warning"
            },
            {
              "text": "Pensar que puedes 'ponerte al día' con el sueño — Puedes recuperar deuda aguda (1-2 semanas) pero la deuda crónica (meses/años) causa cambios cognitivos y metabólicos permanentes.",
              "type": "warning"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuál es la diferencia entre cronotipos?",
          "answer": "Los cronotipos son preferencias circadianas determinadas genéticamente. Los Leones (15% de las personas) naturalmente despiertan 5-6 AM y alcanzan su pico mental 8 AM-12 PM. Los Osos (55%) siguen horarios estándar 10 PM-6 AM y alcanzan su pico 10 AM-2 PM. Los Lobos (15%) naturalmente duermen medianoche-8 AM y alcanzan su pico creativo 5 PM-medianoche. Los Delfines (10%) son durmientes ligeros con patrones irregulares y alta ansiedad. Tu cronotipo afecta la latencia para dormirse, horas óptimas de trabajo, e incluso cuándo deberías comer y hacer ejercicio. La calculadora ajusta los ciclos de sueño y recomendaciones basándose en tu cronotipo."
        },
        {
          "question": "¿Puedo cambiar mi cronotipo o estoy atascado con él para siempre?",
          "answer": "Tu cronotipo es ~50% genético y ~50% ambiental. Puedes cambiarlo ligeramente (30-90 min) con exposición consistente a luz y horario de comidas, pero no puedes convertir un Lobo en un León. Si eres un búho nocturno forzado a despertar a las 6 AM para trabajar, usa terapia de luz matutina (10,000 lux por 20-30 min a las 6-7 AM) y evita la luz después de las 8 PM. Los cambios graduales (15 min por semana) funcionan mejor que cambios súbitos. Lo más importante: alinea tu trabajo mental más difícil con las horas pico de tu cronotipo, incluso si no puedes cambiar tu horario de sueño."
        },
        {
          "question": "¿Por qué a veces me despierto aturdido incluso después de 8 horas de sueño?",
          "answer": "Despertaste a medio ciclo, probablemente durante NREM 3 (sueño profundo) o en medio del REM. Los ciclos de sueño duran 90-120 minutos, y despertar durante las etapas más profundas causa inercia del sueño — aturdimiento que dura 30-60 minutos. Por eso 7.5 horas (5 ciclos completos) pueden sentirse mejor que 8 horas (5.33 ciclos). Usa la calculadora para apuntar a horas de despertar al final de ciclos (NREM 1 o transición REM-a-NREM). Si constantemente despiertas aturdido a pesar del timing de ciclos, podrías tener apnea del sueño u otros trastornos del sueño — consulta a un especialista en sueño."
        },
        {
          "question": "¿Cuánto tiempo toma recuperarse de la deuda de sueño?",
          "answer": "Puedes recuperar aproximadamente 30 minutos de deuda de sueño por noche durmiendo más tiempo. La deuda leve (<3 horas) se recupera en 3-4 noches. La deuda moderada (3-5 horas) toma una semana. La deuda severa (>5 horas) necesita 2+ semanas. No trates de 'ponerte al día' durmiendo 12 horas el sábado — esto crea jet lag social y empeora tu ritmo. En su lugar, añade 30-60 min por noche consistentemente. La deuda crónica de sueño (meses o años de sueño insuficiente) puede causar cambios permanentes en cognición, metabolismo y función inmune que no se pueden recuperar completamente."
        },
        {
          "question": "¿Cuál es el mejor momento para tomar una siesta y por cuánto tiempo?",
          "answer": "La mejor ventana de siesta es 1-3 PM, alineada con la caída natural post-almuerzo en tu ritmo circadiano. Las siestas energizantes (10-20 min) aumentan el estado de alerta sin inercia del sueño — despiertas renovado. Las siestas de ciclo completo (90 min) incluyen sueño profundo y REM, mejorando memoria y creatividad, pero pueden causar aturdimiento si se interrumpen. Evita siestas después de las 3 PM ya que pueden interrumpir el sueño nocturno. Si estás tomando siestas diariamente, no estás durmiendo suficiente por la noche. Los Lobos (búhos nocturnos) se benefician más de las siestas porque los horarios sociales restringen su ventana natural de sueño."
        },
        {
          "question": "¿Por qué la cafeína afecta mi sueño incluso 8 horas después?",
          "answer": "La cafeína tiene una vida media de 5-6 horas, lo que significa que si bebes café a las 2 PM, 50% de la cafeína aún está en tu sistema a las 8 PM. Para individuos sensibles, el cuarto de vida (75% eliminado) es de 10-12 horas. La cafeína bloquea los receptores de adenosina — la adenosina es el químico que te hace sentir somnoliento. Incluso si 'te sientes bien' y te quedas dormido, la cafeína reduce el sueño profundo (NREM 3) en 15-30%, saboteando la calidad del sueño. La calculadora recomienda cortes de cafeína 8-12 horas antes de dormir basándose en tu consumo. Si bebes 4+ tazas diariamente, considera cortar 10-12 horas antes de dormir."
        },
        {
          "question": "¿Es mejor dormir menos o despertar a medio ciclo?",
          "answer": "Siempre completa ciclos completos. Despertar a medio ciclo (especialmente durante NREM 3 o REM) causa inercia severa del sueño y afecta la función cognitiva por 30-60 minutos. Si tienes que elegir entre 6 horas (4 ciclos completos) o 7 horas (4.67 ciclos), elige 6 horas. La mayoría de las personas se sienten mejor con 7.5 horas (5 ciclos) que con 8 horas (5.33 ciclos). Dicho esto, 4 ciclos (6 horas) está por debajo de las 7-9 horas recomendadas para adultos. El sueño corto (<6 horas) crónicamente aumenta el riesgo de enfermedad cardiovascular, obesidad y declive cognitivo. Usa el timing de ciclos para sueño corto ocasional, no como estrategia a largo plazo."
        },
        {
          "question": "¿Cómo afecta la exposición a luz mi sueño y ritmo circadiano?",
          "answer": "La luz es el regulador circadiano más poderoso. La luz matutina (6-8 AM, 10,000 lux) reinicia tu reloj circadiano y avanza tu fase de sueño (te hace sentir somnoliento más temprano). La luz azul (450-480 nm) suprime la producción de melatonina por 2-3 horas, retrasando el inicio del sueño. La luz solar exterior es 10,000-100,000 lux; la iluminación interior es 300-500 lux. Obtén 10-30 min de luz exterior dentro de 30 min al despertar. Evita pantallas 45-60 min antes de dormir o usa gafas bloqueadoras de luz azul. Para búhos nocturnos, la terapia de luz matutina (caja de luz de 10,000 lux por 20-30 min) puede cambiar gradualmente tu reloj más temprano."
        },
        {
          "question": "¿Por qué la calculadora recomienda comer 3 horas antes de dormir?",
          "answer": "La digestión eleva tu temperatura corporal central y desvía el flujo sanguíneo a tu sistema digestivo. El inicio del sueño requiere una caída de 1-2°F en temperatura central. Las comidas grandes 3-4 horas antes de dormir previenen esta caída de temperatura y retrasan el sueño por 30-60 minutos. Además, acostarse con el estómago lleno aumenta el riesgo de reflujo ácido. Los alimentos picantes o grasosos pueden causar molestias digestivas durante la noche. Un snack ligero (yogur griego, plátano pequeño) 1 hora antes de dormir está bien e incluso puede ayudar a algunas personas a dormir. Evita alcohol 3-4 horas antes de dormir — fragmenta el sueño REM en la segunda mitad de la noche."
        },
        {
          "question": "¿Qué es la 'puntuación de calidad de sueño' y cómo se calcula?",
          "answer": "La puntuación de calidad de sueño (0-100) combina cuatro factores: (1) Finalización de ciclos — obtener ciclos recomendados para tu edad (40 puntos), (2) Alineación de cronotipo — dormir en momentos que coinciden con tu preferencia genética (25 puntos), (3) Deuda de sueño — menor deuda = puntuación más alta (20 puntos), (4) Higiene del sueño — corte de cafeína, deadline de pantallas, timing de comidas (15 puntos). Una puntuación de 85+ es excelente, 70-84 es buena, 60-69 es regular, debajo de 60 indica espacio para mejora. La puntuación te ayuda a ver qué tan bien tu horario actual se alinea con las prácticas óptimas de sueño. No es un diagnóstico médico, solo una herramienta de evaluación rápida."
        },
        {
          "question": "¿Puedo entrenarme para necesitar menos sueño?",
          "answer": "No. La idea de que puedes 'entrenarte' para necesitar 4-5 horas de sueño es un mito perpetuado por personas privadas de sueño que trabajan demasiado. Los adultos necesitan 7-9 horas por noche (5-6 ciclos completos). Menos del 1% de la población tiene una mutación genética (DEC2) que les permite funcionar con 6 horas. El sueño corto crónico (<7 horas) aumenta el riesgo de enfermedad cardiovascular, obesidad, diabetes, demencia y muerte temprana. Podrías 'sentirte bien' con 6 horas debido a adrenalina y cafeína, pero las pruebas cognitivas muestran rendimiento afectado equivalente a estar legalmente ebrio. El sueño no es opcional — es cuando tu cerebro limpia toxinas, consolida memorias y repara tejidos."
        },
        {
          "question": "¿Qué debo hacer si no puedo quedarme dormido en 20-30 minutos?",
          "answer": "Sal de la cama. Quedarte acostado frustrado crea una asociación negativa entre tu cama y el estar despierto. Ve a otra habitación, haz una actividad aburrida con luz tenue (lee un libro en papel, estiramientos ligeros, escucha música calmante), y regresa a la cama solo cuando te sientas somnoliento. Esto se llama terapia de control de estímulos. También revisa: ¿Tomaste cafeína 8+ horas antes de dormir? ¿Hiciste ejercicio tarde? ¿Está tu habitación fresca (15-19°C), oscura y silenciosa? ¿Miraste pantallas en la última hora? ¿Estás estresado o ansioso? Si tardas >30 min en quedarte dormido 3+ noches por semana durante 3+ meses, consulta a un especialista en sueño — podrías tener insomnio u otro trastorno del sueño."
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
      "name": "Calculadora do Sono",
      "slug": "calculadora-sono",
      "subtitle": "Encontre seu cronograma de sono perfeito com temporização personalizada de ciclos, alinhamento de cronotipo, horário limite de cafeína, plano de exposição à luz e planejamento de recuperação — calculadora gratuita de ciclos do sono",
      "breadcrumb": "Sono",
      "seo": {
        "title": "Calculadora do Sono - Planejador de Horário de Dormir e Acordar com Cronotipo",
        "description": "Calcule seu horário ideal para dormir ou acordar com ciclos de sono ajustados por idade e análise de cronotipo. Obtenha horário limite de cafeína, cronograma de exposição à luz, horário das refeições, janela de cochilo e plano de recuperação de débito — completamente gratuito.",
        "shortDescription": "Encontre horários ideais para dormir e acordar usando ciclos do sono e cronotipo",
        "keywords": [
          "calculadora do sono",
          "calculadora de horário para dormir",
          "calculadora de ciclo do sono",
          "calculadora de horário para acordar",
          "calculadora de cronotipo",
          "calculadora de cochilo",
          "rastreador de débito de sono",
          "calculadora de ritmo circadiano"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "mode": {
          "label": "Quero encontrar meu...",
          "helpText": "Escolha o que calcular",
          "options": {
            "wakeup": "Horário para dormir (sei meu horário de acordar)",
            "bedtime": "Horário para acordar (sei meu horário de dormir)"
          }
        },
        "targetHour": {
          "label": "Hora",
          "helpText": "",
          "options": {
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
            "12": "12"
          }
        },
        "targetMinute": {
          "label": "Minuto",
          "helpText": "",
          "options": {
            "0": ":00",
            "15": ":15",
            "30": ":30",
            "45": ":45"
          }
        },
        "targetPeriod": {
          "label": "AM / PM",
          "helpText": "",
          "options": {
            "am": "AM",
            "pm": "PM"
          }
        },
        "age": {
          "label": "Idade",
          "helpText": "Necessidades de sono e duração do ciclo mudam com a idade"
        },
        "chronotype": {
          "label": "Cronotipo",
          "helpText": "Sua preferência natural de sono-vigília",
          "options": {
            "bear": "🐻 Urso — Padrão (55%)",
            "lion": "🦁 Leão — Madrugador (15%)",
            "wolf": "🐺 Lobo — Coruja (15%)",
            "dolphin": "🐬 Golfinho — Sono Leve (10%)"
          }
        },
        "fallAsleepTime": {
          "label": "Tempo para Adormecer",
          "helpText": "Quanto tempo geralmente leva para você adormecer",
          "options": {
            "5": "5 min — muito rápido",
            "10": "10 min — rápido",
            "15": "15 min — média",
            "20": "20 min — normal",
            "30": "30 min — lento",
            "45": "45 min — muito lento",
            "60": "60 min — dificuldade"
          }
        },
        "caffeinePerDay": {
          "label": "Cafeína Diária",
          "helpText": "Xícaras de café, chá ou bebidas energéticas"
        },
        "sleepDebtHours": {
          "label": "Débito de Sono Semanal",
          "helpText": "Horas de sono perdidas nesta semana"
        },
        "wantsNap": {
          "label": "Planejar um cochilo?",
          "helpText": "Obtenha sua janela ideal de cochilo",
          "options": {
            "no": "Não",
            "yes": "Sim"
          }
        },
        "napType": {
          "label": "Tipo de Cochilo",
          "helpText": "Escolha baseado no tempo disponível e necessidade",
          "options": {
            "power10": "Cochilo Energético (10 min)",
            "short20": "Cochilo Curto (20 min)",
            "full90": "Ciclo Completo (90 min)"
          }
        }
      },
      "inputGroups": {},
      "results": {
        "optimalTime": {
          "label": "Horário Ideal"
        },
        "totalSleep": {
          "label": "Sono Total"
        },
        "sleepCycles": {
          "label": "Ciclos Completos"
        },
        "caffeineDeadline": {
          "label": "Limite de Cafeína"
        },
        "screenDeadline": {
          "label": "Desligar Telas"
        },
        "napWindow": {
          "label": "Janela de Cochilo"
        },
        "debtStatus": {
          "label": "Débito de Sono"
        },
        "recoveryPlan": {
          "label": "Plano de Recuperação"
        },
        "sleepQuality": {
          "label": "Pontuação de Qualidade do Sono"
        },
        "morningLight": {
          "label": "Luz Matinal"
        },
        "lastMeal": {
          "label": "Última Refeição"
        },
        "exerciseCutoff": {
          "label": "Limite de Exercício"
        }
      },
      "tooltips": {
        "optimalTime": "Calculado usando ciclos de sono ajustados por idade e latência para adormecer",
        "totalSleep": "Tempo total dormindo (exclui tempo para adormecer)",
        "sleepCycles": "Ciclos completos de sono — cada um inclui estágios NREM + REM",
        "caffeineDeadline": "Baseado na meia-vida de 5 horas da cafeína e sua ingestão diária",
        "screenDeadline": "Luz azul suprime melatonina — telas desligadas 45 min antes de dormir",
        "napWindow": "Horário ideal de cochilo baseado no cronotipo e horas acordado",
        "debtStatus": "Déficit cumulativo de sono — leve (<3h), moderado (3-5h), severo (>5h)",
        "recoveryPlan": "Adicione 30 min por noite para recuperar débito de sono gradualmente",
        "sleepQuality": "Pontuação baseada em ciclos, alinhamento de cronotipo, débito e higiene do sono",
        "morningLight": "Exposição à luz brilhante em 30 min após acordar reinicia o ritmo circadiano",
        "lastMeal": "Comer 3+ horas antes de dormir melhora qualidade do sono e reduz refluxo",
        "exerciseCutoff": "Exercício vigoroso eleva temperatura corporal — evite 3h antes de dormir"
      },
      "presets": {
        "earlyBird": {
          "label": "Madrugador (Leão)",
          "description": "Cronotipo leão, acordar 5:30, cafeína mínima, sem débito"
        },
        "standard": {
          "label": "Padrão (Urso)",
          "description": "Cronotipo urso, acordar 7:00, cafeína moderada, sem débito"
        },
        "nightOwl": {
          "label": "Coruja (Lobo)",
          "description": "Cronotipo lobo, acordar 9:00, alta cafeína, 2h débito, cochilo energético"
        },
        "shiftWorker": {
          "label": "Trabalhador de Turno",
          "description": "Acordar cedo, alta cafeína, 5h débito, plano de cochilo, recuperação necessária"
        },
        "student": {
          "label": "Estudante",
          "description": "Acordar 8h, cafeína moderada, 3h débito, cochilo recomendado"
        },
        "lightSleeper": {
          "label": "Sono Leve (Golfinho)",
          "description": "Cronotipo golfinho, acordar 6:30, 30 min latência para adormecer"
        }
      },
      "values": {
        "hours": "horas",
        "hour": "hora",
        "minutes": "minutos",
        "min": "min",
        "cycle": "ciclo",
        "cycles": "ciclos",
        "Bedtime": "🛏️ Hora de Dormir",
        "Wake-Up": "⏰ Acordar",
        "No caffeine needed": "Cafeína não necessária",
        "No nap planned": "Nenhum cochilo planejado",
        "No sleep debt": "Sem débito de sono ✅",
        "mild": "leve",
        "moderate": "moderado",
        "severe": "severo",
        "deficit": "déficit",
        "Keep current schedule": "No caminho certo — mantenha seu cronograma!",
        "night": "noite",
        "nights": "noites",
        "Excellent": "⭐ Excelente",
        "Recommended": "✅ Recomendado",
        "Adequate": "Adequado",
        "Minimum": "⚠️ Mínimo",
        "NREM1": "NREM 1 (Leve)",
        "NREM2": "NREM 2",
        "NREM3": "NREM 3 (Profundo)",
        "REM": "REM (Sonho)"
      },
      "formats": {
        "summary": "{mode} {optimalTime} para {totalSleep} de sono ({cycles} ciclos completos). Pontuação de qualidade do sono: {score}/100."
      },
      "infoCards": {
        "schedule": {
          "title": "Seu Cronograma de Sono",
          "items": [
            {
              "label": "Horário Ideal",
              "valueKey": "optimalTime"
            },
            {
              "label": "Sono Total",
              "valueKey": "totalSleep"
            },
            {
              "label": "Ciclos do Sono",
              "valueKey": "sleepCycles"
            },
            {
              "label": "Qualidade do Sono",
              "valueKey": "sleepQuality"
            }
          ]
        },
        "hygiene": {
          "title": "Prazos de Higiene do Sono",
          "items": [
            {
              "label": "Limite de Cafeína",
              "valueKey": "caffeineDeadline"
            },
            {
              "label": "Desligar Telas",
              "valueKey": "screenDeadline"
            },
            {
              "label": "Última Refeição",
              "valueKey": "lastMeal"
            },
            {
              "label": "Limite de Exercício",
              "valueKey": "exerciseCutoff"
            }
          ]
        },
        "circadian": {
          "title": "Ritmo Circadiano",
          "items": [
            {
              "label": "Luz Matinal",
              "valueKey": "morningLight"
            },
            {
              "label": "Janela de Cochilo",
              "valueKey": "napWindow"
            },
            {
              "label": "Débito de Sono",
              "valueKey": "debtStatus"
            },
            {
              "label": "Plano de Recuperação",
              "valueKey": "recoveryPlan"
            }
          ]
        },
        "qualityFactors": {
          "title": "Fatores de Qualidade do Sono",
          "items": [
            {
              "label": "Alinhamento do Cronotipo",
              "valueKey": "chronotypeAlignment"
            },
            {
              "label": "Conclusão do Ciclo",
              "valueKey": "cycleCompletion"
            },
            {
              "label": "Impacto do Débito de Sono",
              "valueKey": "debtImpact"
            },
            {
              "label": "Higiene do Sono",
              "valueKey": "hygieneScore"
            }
          ]
        },
        "tips": {
          "title": "Dicas Profissionais",
          "items": [
            "Receba luz brilhante em 30 min após acordar para reiniciar seu ritmo circadiano",
            "Evite cafeína 8-10 horas antes de dormir — tem meia-vida de 5-6 horas",
            "Mantenha seu quarto fresco (15-19°C), escuro e silencioso para sono ideal",
            "Cochilos energéticos (10-20 min) aumentam alerta sem sonolência — ciclos completos (90 min) melhoram memória"
          ]
        }
      },
      "chart": {
        "title": "Estágios do Sono Durante Seus Ciclos",
        "xLabel": "Minutos Dormindo",
        "yLabel": "Estágio do Sono",
        "series": {
          "nrem1": "NREM 1 (Leve)",
          "nrem2": "NREM 2",
          "nrem3": "NREM 3 (Profundo)",
          "rem": "REM (Sonho)"
        }
      },
      "detailedTable": {
        "cycleOptions": {
          "button": "Ver Opções de Ciclo",
          "title": "Opções de Ciclo do Sono",
          "columns": {
            "cycles": "Ciclos",
            "time": "Horário",
            "duration": "Duração",
            "quality": "Qualidade"
          }
        }
      },
      "education": {
        "whatAreCycles": {
          "title": "O que são Ciclos do Sono?",
          "content": "Ciclos do sono são períodos de 90 minutos durante os quais seu cérebro passa por quatro estágios distintos: NREM 1 (sono leve, transição), NREM 2 (sono leve, temperatura corporal diminui), NREM 3 (sono profundo, restauração física), e REM (movimento rápido dos olhos, sonho e consolidação de memória). Um ciclo completo leva 90-120 minutos dependendo da sua idade — crianças têm ciclos mais longos (95-100 min) enquanto idosos têm mais curtos (80-85 min). Você geralmente passa por 4-6 ciclos por noite. Acordar durante NREM 3 ou no meio do REM causa sonolência, enquanto acordar no final de um ciclo (durante NREM 1 ou na transição REM-para-NREM 1) deixa você se sentindo revigorado. É por isso que você pode dormir 8 horas e se sentir terrível, ou dormir 7,5 horas e se sentir incrível — não é apenas duração, é alinhamento de ciclo."
        },
        "chronotypes": {
          "title": "Entendendo Cronotipos",
          "content": "Seu cronotipo é sua preferência circadiana determinada geneticamente — não é um hábito, é sua biologia. Cerca de 55% das pessoas são Ursos (dormem padrão 22h-6h), 15% são Leões (madrugadores que acordam 5-6h naturalmente), 15% são Lobos (corujas que têm pico 21h-meia-noite), e 10% são Golfinhos (sono leve com padrões irregulares). Cronotipo afeta mais que hora de dormir: Leões têm pico mental 8h-12h, Ursos têm pico 10h-14h, Lobos têm pico 17h-meia-noite. Tentar forçar um Lobo a ser produtivo às 8h é como pedir a um Leão para fazer trabalho criativo às 23h — você está lutando contra sua biologia. Seu cronotipo também afeta latência para adormecer: Leões adormecem em 10-15 min, Ursos em 15-20 min, Lobos em 20-30 min, Golfinhos em 30-45 min. A calculadora ajusta automaticamente para isso."
        },
        "lightExposure": {
          "title": "Exposição à Luz e Ritmo Circadiano",
          "items": [
            {
              "text": "Luz matinal (6-8h) — Receba 10-30 min de luz brilhante em 30 min após acordar. Luz solar externa é melhor (10.000 lux), mas uma caixa de luz (10.000 lux) funciona. Isso reinicia seu relógio circadiano e adianta sua fase do sono.",
              "type": "success"
            },
            {
              "text": "Luz do meio-dia — Exposição à luz brilhante durante o almoço ajuda consolidar o sinal matinal. Uma caminhada externa de 15 min é ideal.",
              "type": "info"
            },
            {
              "text": "Evite luz azul após o pôr do sol — Comprimentos de onda azuis (450-480nm) suprimem produção de melatonina. Telas desligadas 45-60 min antes de dormir. Use óculos bloqueadores de luz azul se inevitável.",
              "type": "warning"
            },
            {
              "text": "Iluminação noturna fraca — Mantenha luzes fracas (< 50 lux) 2-3 horas antes de dormir. Use lâmpadas de cor quente (âmbar/vermelho) em quartos e banheiros.",
              "type": "info"
            },
            {
              "text": "Quarto totalmente escuro — Escuridão completa durante o sono maximiza melatonina. Use cortinas blackout ou máscara de dormir.",
              "type": "info"
            },
            {
              "text": "Terapia de luz para corujas — Se você é um Lobo lutando com horários de trabalho cedo, use uma caixa de luz de 10.000 lux por 20-30 min às 6-7h para gradualmente adiantar seu relógio.",
              "type": "success"
            }
          ]
        },
        "mealExerciseTiming": {
          "title": "Horário de Refeições e Exercícios para Melhor Sono",
          "items": [
            {
              "text": "Última refeição 3+ horas antes de dormir — Digestão eleva temperatura corporal e atrasa início do sono. Refeições grandes 4+ horas antes de dormir é ideal.",
              "type": "warning"
            },
            {
              "text": "Evite álcool 3-4 horas antes de dormir — Álcool perturba sono REM e causa sono fragmentado na segunda metade da noite.",
              "type": "warning"
            },
            {
              "text": "Exercício vigoroso 3+ horas antes de dormir — Treinos intensos elevam temperatura corporal por 4-6 horas. Exercício matinal ou vespertino é melhor.",
              "type": "info"
            },
            {
              "text": "Alongamento leve/yoga está ok — Movimento suave 30-60 min antes de dormir pode ajudar relaxamento. Evite picos de frequência cardíaca.",
              "type": "success"
            },
            {
              "text": "Limite de cafeína — Café tem meia-vida de 5-6 horas. Se você é sensível, corte 10-12 horas antes de dormir. Chá tem menos cafeína mas ainda importa.",
              "type": "warning"
            },
            {
              "text": "Proteína antes de dormir (opcional) — Um pequeno lanche rico em proteína (iogurte grego, queijo cottage) 1 hora antes de dormir pode melhorar recuperação muscular noturna sem perturbar o sono.",
              "type": "info"
            }
          ]
        },
        "sleepDebt": {
          "title": "Recuperação de Débito de Sono",
          "content": "Débito de sono é sono perdido cumulativo — se você precisa de 8 horas mas dorme 6, acumula 2 horas de débito por noite. Pesquisas mostram que você pode recuperar cerca de 30 minutos de débito por noite dormindo mais. Não tente pagar todo débito num fim de semana — dormir 12 horas no sábado cria 'jet lag social' que perturba seu ritmo. Em vez disso, adicione 30-60 min por noite por uma semana. Débito leve (<3h) se recupera em 3-4 noites, débito moderado (3-5h) leva uma semana, débito severo (>5h) precisa 2+ semanas. Débito crônico (meses/anos) pode precisar ajuda profissional. Sinais de débito não recuperado: sonolência diurna, microsonos (sono breve não intencional), tempo de reação reduzido, mudanças de humor, desejos por açúcar. A calculadora oferece um plano de recuperação noite por noite."
        },
        "napping": {
          "title": "Cochilo Estratégico",
          "content": "Cochilos são poderosos se cronometrados corretamente. Cochilos energéticos (10-20 min) proporcionam aumento de alerta sem inércia do sono — você acorda revigorado. Cochilos de ciclo completo (90 min) incluem sono profundo e REM, melhorando consolidação de memória e criatividade, mas podem causar sonolência se interrompidos no meio do ciclo. Evite cochilos >90 min ou após 15h — podem perturbar sono noturno. A janela ideal de cochilo é 13h-15h, alinhada com a queda natural pós-almoço no ritmo circadiano. Para corujas (Lobos), cochilos são mais benéficos porque seu sono noturno é frequentemente restrito por cronogramas sociais/trabalho. Para madrugadores (Leões), cochilos podem sinalizar débito de sono — se você está cochilando diariamente, não está tendo sono noturno suficiente. A calculadora posiciona seu cochilo no ponto médio de suas horas acordado, limitado às 15h."
        },
        "commonMistakes": {
          "title": "Erros Comuns do Sono",
          "items": [
            {
              "text": "Dormir até mais tarde nos fins de semana — Ir para cama 23h sex, 3h sáb é como voar para o Havaí e voltar todo fim de semana (jet lag social). Mantenha ±1 hora do seu cronograma de dias úteis.",
              "type": "warning"
            },
            {
              "text": "Apertar soneca — Esses 10 minutos extras são sono fragmentado e de baixa qualidade. Você entra num novo ciclo de sono que não vai completar. Configure um alarme e levante.",
              "type": "warning"
            },
            {
              "text": "Usar telas na cama — Seu cérebro associa cama com sono. Ler num tablet ou rolar no telefone treina seu cérebro que cama = tempo acordado.",
              "type": "warning"
            },
            {
              "text": "Exercitar-se antes de dormir — Sua temperatura corporal precisa cair 1-2°C para iniciar o sono. Exercício vigoroso a eleva por 4-6 horas.",
              "type": "warning"
            },
            {
              "text": "Depender de pílulas para dormir a longo prazo — A maioria dos medicamentos para sono (Ambien, Lunesta) não produz arquitetura natural do sono. Eles sedam você mas não proporcionam sono restaurador.",
              "type": "warning"
            },
            {
              "text": "Pensar que pode 'recuperar' sono — Você pode recuperar débito agudo (1-2 semanas) mas débito crônico (meses/anos) causa mudanças cognitivas e metabólicas permanentes.",
              "type": "warning"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qual é a diferença entre cronotipos?",
          "answer": "Cronotipos são preferências circadianas determinadas geneticamente. Leões (15% das pessoas) naturalmente acordam 5-6h e têm pico mental 8h-12h. Ursos (55%) seguem cronogramas padrão 22h-6h e têm pico 10h-14h. Lobos (15%) naturalmente dormem meia-noite-8h e têm pico criativo 17h-meia-noite. Golfinhos (10%) são pessoas de sono leve com padrões irregulares e alta ansiedade. Seu cronotipo afeta latência para adormecer, horários ideais de trabalho, e até quando você deveria comer e se exercitar. A calculadora ajusta ciclos de sono e recomendações baseado no seu cronotipo."
        },
        {
          "question": "Posso mudar meu cronotipo ou estou preso com ele para sempre?",
          "answer": "Seu cronotipo é ~50% genético e ~50% ambiental. Você pode mudá-lo ligeiramente (30-90 min) com exposição consistente à luz e horário de refeições, mas não pode transformar um Lobo num Leão. Se você é uma coruja forçada a acordar às 6h para trabalho, use terapia de luz matinal (10.000 lux por 20-30 min às 6-7h) e evite luz após 20h. Mudanças graduais (15 min por semana) funcionam melhor que mudanças súbitas. Mais importante: alinhe seu trabalho mental mais difícil com as horas de pico do seu cronotipo, mesmo se não puder mudar seu cronograma de sono."
        },
        {
          "question": "Por que às vezes acordo sonolento mesmo após 8 horas de sono?",
          "answer": "Você acordou no meio do ciclo, provavelmente durante NREM 3 (sono profundo) ou meio do REM. Ciclos de sono são 90-120 minutos, e acordar durante os estágios mais profundos causa inércia do sono — sonolência durando 30-60 minutos. É por isso que 7,5 horas (5 ciclos completos) pode se sentir melhor que 8 horas (5,33 ciclos). Use a calculadora para mirar horários de acordar no final dos ciclos (NREM 1 ou transição REM-para-NREM). Se você consistentemente acorda sonolento apesar do cronometragem de ciclo, pode ter apneia do sono ou outros distúrbios do sono — veja um especialista do sono."
        },
        {
          "question": "Quanto tempo leva para me recuperar do débito de sono?",
          "answer": "Você pode recuperar cerca de 30 minutos de débito de sono por noite dormindo mais. Débito leve (<3 horas) se recupera em 3-4 noites. Débito moderado (3-5 horas) leva uma semana. Débito severo (>5 horas) precisa 2+ semanas. Não tente 'recuperar' dormindo 12 horas no sábado — isso cria jet lag social e piora seu ritmo. Em vez disso, adicione 30-60 min por noite consistentemente. Débito crônico de sono (meses ou anos de sono insuficiente) pode causar mudanças permanentes na cognição, metabolismo e função imune que não podem ser totalmente recuperadas."
        },
        {
          "question": "Qual é o melhor horário para cochilar e por quanto tempo?",
          "answer": "A melhor janela de cochilo é 13h-15h, alinhada com a queda natural pós-almoço no seu ritmo circadiano. Cochilos energéticos (10-20 min) aumentam alerta sem inércia do sono — você acorda revigorado. Cochilos de ciclo completo (90 min) incluem sono profundo e REM, melhorando memória e criatividade, mas podem causar sonolência se interrompidos. Evite cochilos após 15h pois podem perturbar sono noturno. Se você está cochilando diariamente, não está tendo sono noturno suficiente. Lobos (corujas) se beneficiam mais de cochilos porque cronogramas sociais restringem sua janela natural de sono."
        },
        {
          "question": "Por que cafeína afeta meu sono mesmo 8 horas depois?",
          "answer": "Cafeína tem meia-vida de 5-6 horas, significando que se você bebe café às 14h, 50% da cafeína ainda está no seu sistema às 20h. Para indivíduos sensíveis, o quarto de vida (75% eliminado) é 10-12 horas. Cafeína bloqueia receptores de adenosina — adenosina é o químico que faz você sonolento. Mesmo se você 'se sente bem' e adormece, cafeína reduz sono profundo (NREM 3) em 15-30%, sabotando qualidade do sono. A calculadora recomenda limites de cafeína 8-12 horas antes de dormir baseado na sua ingestão. Se você bebe 4+ xícaras diariamente, considere cortar 10-12 horas antes de dormir."
        },
        {
          "question": "É melhor dormir menos ou acordar no meio do ciclo?",
          "answer": "Sempre complete ciclos inteiros. Acordar no meio do ciclo (especialmente durante NREM 3 ou REM) causa severa inércia do sono e prejudica função cognitiva por 30-60 minutos. Se você tem que escolher entre 6 horas (4 ciclos completos) ou 7 horas (4,67 ciclos), escolha 6 horas. A maioria das pessoas se sente melhor com 7,5 horas (5 ciclos) que 8 horas (5,33 ciclos). Dito isso, 4 ciclos (6 horas) está abaixo das 7-9 horas recomendadas para adultos. Sono curto (<6 horas) cronicamente aumenta risco de doença cardiovascular, obesidade e declínio cognitivo. Use cronometragem de ciclo para sono curto ocasional, não como estratégia de longo prazo."
        },
        {
          "question": "Como exposição à luz afeta meu sono e ritmo circadiano?",
          "answer": "Luz é o regulador circadiano mais poderoso. Luz matinal (6-8h, 10.000 lux) reinicia seu relógio circadiano e adianta sua fase do sono (faz você sonolento mais cedo). Luz azul (450-480 nm) suprime produção de melatonina por 2-3 horas, atrasando início do sono. Luz solar externa é 10.000-100.000 lux; iluminação interna é 300-500 lux. Receba 10-30 min de luz externa em 30 min após acordar. Evite telas 45-60 min antes de dormir ou use óculos bloqueadores de luz azul. Para corujas, terapia de luz matinal (caixa de luz de 10.000 lux por 20-30 min) pode gradualmente adiantar seu relógio."
        },
        {
          "question": "Por que a calculadora recomenda comer 3 horas antes de dormir?",
          "answer": "Digestão eleva sua temperatura corporal e desvia fluxo sanguíneo para seu sistema digestivo. Início do sono requer queda de 1-2°C na temperatura corporal. Refeições grandes 3-4 horas antes de dormir previnem essa queda de temperatura e atrasam sono em 30-60 minutos. Adicionalmente, deitar com estômago cheio aumenta risco de refluxo ácido. Alimentos picantes ou gordurosos podem causar desconforto digestivo durante a noite. Um lanche leve (iogurte grego, banana pequena) 1 hora antes de dormir está ok e pode até ajudar algumas pessoas a dormir. Evite álcool 3-4 horas antes de dormir — fragmenta sono REM na segunda metade da noite."
        },
        {
          "question": "O que é a 'pontuação de qualidade do sono' e como é calculada?",
          "answer": "A pontuação de qualidade do sono (0-100) combina quatro fatores: (1) Conclusão de ciclo — obter ciclos recomendados para sua idade (40 pontos), (2) Alinhamento de cronotipo — dormir em horários combinando com sua preferência genética (25 pontos), (3) Débito de sono — menor débito = maior pontuação (20 pontos), (4) Higiene do sono — limite de cafeína, prazo de telas, horário de refeições (15 pontos). Uma pontuação de 85+ é excelente, 70-84 é boa, 60-69 é razoável, abaixo de 60 indica espaço para melhoria. A pontuação ajuda você ver quão bem seu cronograma atual se alinha com práticas ideais de sono. Não é um diagnóstico médico, apenas uma ferramenta de avaliação rápida."
        },
        {
          "question": "Posso me treinar para precisar de menos sono?",
          "answer": "Não. A ideia de que você pode 'treinar' a si mesmo para precisar de 4-5 horas de sono é um mito perpetuado por workaholics privados de sono. Adultos precisam de 7-9 horas por noite (5-6 ciclos completos). Menos de 1% da população tem uma mutação genética (DEC2) que permite funcionar com 6 horas. Sono curto crônico (<7 horas) aumenta risco de doença cardiovascular, obesidade, diabetes, demência e morte precoce. Você pode 'se sentir bem' com 6 horas devido à adrenalina e cafeína, mas testes cognitivos mostram desempenho prejudicado equivalente a estar legalmente bêbado. Sono não é opcional — é quando seu cérebro limpa toxinas, consolida memórias e repara tecidos."
        },
        {
          "question": "O que devo fazer se não consigo adormecer em 20-30 minutos?",
          "answer": "Saia da cama. Ficar acordado se frustrando cria uma associação negativa entre sua cama e vigília. Vá para outro cômodo, faça uma atividade entediante em luz fraca (ler um livro de papel, alongamento leve, escutar música calmante), e retorne à cama apenas quando se sentir sonolento. Isso é chamado terapia de controle de estímulo. Também verifique: Você tomou cafeína 8+ horas antes de dormir? Se exercitou tarde? Seu quarto está fresco (15-19°C), escuro e silencioso? Olhou para telas na última hora? Está estressado ou ansioso? Se você leva >30 min para adormecer 3+ noites por semana por 3+ meses, veja um especialista do sono — você pode ter insônia ou outro distúrbio do sono."
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
      "name": "Calculateur de Sommeil",
      "slug": "calculateur-sommeil",
      "subtitle": "Trouvez votre horaire de sommeil parfait avec un timing de cycles personnalisé, alignement du chronotype, limite de caféine, plan d'exposition lumineuse et planification de récupération — calculateur de cycles de sommeil gratuit",
      "breadcrumb": "Sommeil",
      "seo": {
        "title": "Calculateur de Sommeil - Planificateur de Coucher & Réveil avec Chronotype",
        "description": "Calculez votre heure de coucher ou de réveil optimale avec des cycles de sommeil ajustés à l'âge et une analyse de chronotype. Obtenez la limite de caféine, l'horaire d'exposition lumineuse, le timing des repas, la fenêtre de sieste et le plan de récupération de dette — complètement gratuit.",
        "shortDescription": "Trouvez les heures optimales de coucher et de réveil en utilisant les cycles de sommeil et le chronotype",
        "keywords": [
          "calculateur de sommeil",
          "calculateur heure coucher",
          "calculateur cycles sommeil",
          "calculateur heure réveil",
          "calculateur chronotype",
          "calculateur sieste",
          "suivi dette sommeil",
          "calculateur rythme circadien"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "mode": {
          "label": "Je veux trouver mon...",
          "helpText": "Choisissez quoi calculer",
          "options": {
            "wakeup": "Heure de coucher (je connais mon heure de réveil)",
            "bedtime": "Heure de réveil (je connais mon heure de coucher)"
          }
        },
        "targetHour": {
          "label": "Heure",
          "helpText": "",
          "options": {
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
            "12": "12"
          }
        },
        "targetMinute": {
          "label": "Minute",
          "helpText": "",
          "options": {
            "0": ":00",
            "15": ":15",
            "30": ":30",
            "45": ":45"
          }
        },
        "targetPeriod": {
          "label": "AM / PM",
          "helpText": "",
          "options": {
            "am": "AM",
            "pm": "PM"
          }
        },
        "age": {
          "label": "Âge",
          "helpText": "Les besoins de sommeil et la durée des cycles changent avec l'âge"
        },
        "chronotype": {
          "label": "Chronotype",
          "helpText": "Votre préférence naturelle veille-sommeil",
          "options": {
            "bear": "🐻 Ours — Standard (55%)",
            "lion": "🦁 Lion — Lève-tôt (15%)",
            "wolf": "🐺 Loup — Couche-tard (15%)",
            "dolphin": "🐬 Dauphin — Sommeil léger (10%)"
          }
        },
        "fallAsleepTime": {
          "label": "Temps pour s'endormir",
          "helpText": "Temps qu'il vous faut habituellement pour vous endormir",
          "options": {
            "5": "5 min — très rapide",
            "10": "10 min — rapide",
            "15": "15 min — moyen",
            "20": "20 min — normal",
            "30": "30 min — lent",
            "45": "45 min — très lent",
            "60": "60 min — difficulté"
          }
        },
        "caffeinePerDay": {
          "label": "Caféine quotidienne",
          "helpText": "Tasses de café, thé ou boissons énergisantes"
        },
        "sleepDebtHours": {
          "label": "Dette de sommeil hebdomadaire",
          "helpText": "Heures de sommeil manquées cette semaine"
        },
        "wantsNap": {
          "label": "Planifier une sieste ?",
          "helpText": "Obtenez votre fenêtre de sieste optimale",
          "options": {
            "no": "Non",
            "yes": "Oui"
          }
        },
        "napType": {
          "label": "Type de sieste",
          "helpText": "Choisissez selon le temps disponible et le besoin",
          "options": {
            "power10": "Sieste éclair (10 min)",
            "short20": "Sieste courte (20 min)",
            "full90": "Cycle complet (90 min)"
          }
        }
      },
      "inputGroups": {},
      "results": {
        "optimalTime": {
          "label": "Heure optimale"
        },
        "totalSleep": {
          "label": "Sommeil total"
        },
        "sleepCycles": {
          "label": "Cycles complets"
        },
        "caffeineDeadline": {
          "label": "Limite caféine"
        },
        "screenDeadline": {
          "label": "Extinction écrans"
        },
        "napWindow": {
          "label": "Fenêtre sieste"
        },
        "debtStatus": {
          "label": "Dette de sommeil"
        },
        "recoveryPlan": {
          "label": "Plan de récupération"
        },
        "sleepQuality": {
          "label": "Score qualité sommeil"
        },
        "morningLight": {
          "label": "Lumière matinale"
        },
        "lastMeal": {
          "label": "Dernier repas"
        },
        "exerciseCutoff": {
          "label": "Limite exercice"
        }
      },
      "tooltips": {
        "optimalTime": "Calculé avec les cycles de sommeil ajustés à l'âge et la latence d'endormissement",
        "totalSleep": "Temps total de sommeil (exclut le temps pour s'endormir)",
        "sleepCycles": "Cycles de sommeil complets — chacun inclut les phases NREM + REM",
        "caffeineDeadline": "Basé sur la demi-vie de 5 heures de la caféine et votre consommation quotidienne",
        "screenDeadline": "La lumière bleue supprime la mélatonine — écrans éteints 45 min avant le coucher",
        "napWindow": "Timing optimal de sieste basé sur le chronotype et les heures de réveil",
        "debtStatus": "Déficit de sommeil cumulé — léger (<3h), modéré (3-5h), sévère (>5h)",
        "recoveryPlan": "Ajoutez 30 min par nuit pour récupérer la dette de sommeil graduellement",
        "sleepQuality": "Score basé sur les cycles, l'alignement chronotype, la dette et l'hygiène du sommeil",
        "morningLight": "L'exposition à la lumière vive dans les 30 min du réveil remet le rythme circadien à zéro",
        "lastMeal": "Manger 3h+ avant le coucher améliore la qualité du sommeil et réduit le reflux",
        "exerciseCutoff": "L'exercice vigoureux élève la température corporelle — éviter 3h avant le coucher"
      },
      "presets": {
        "earlyBird": {
          "label": "Lève-tôt (Lion)",
          "description": "Chronotype Lion, réveil 5h30, caféine minimale, pas de dette"
        },
        "standard": {
          "label": "Standard (Ours)",
          "description": "Chronotype Ours, réveil 7h00, caféine modérée, pas de dette"
        },
        "nightOwl": {
          "label": "Couche-tard (Loup)",
          "description": "Chronotype Loup, réveil 9h00, caféine élevée, dette 2h, sieste éclair"
        },
        "shiftWorker": {
          "label": "Travailleur posté",
          "description": "Réveil tôt, caféine élevée, dette 5h, plan sieste, récupération nécessaire"
        },
        "student": {
          "label": "Étudiant",
          "description": "Réveil 8h, caféine modérée, dette 3h, sieste recommandée"
        },
        "lightSleeper": {
          "label": "Sommeil léger (Dauphin)",
          "description": "Chronotype Dauphin, réveil 6h30, latence d'endormissement 30 min"
        }
      },
      "values": {
        "hours": "heures",
        "hour": "heure",
        "minutes": "minutes",
        "min": "min",
        "cycle": "cycle",
        "cycles": "cycles",
        "Bedtime": "🛏️ Coucher",
        "Wake-Up": "⏰ Réveil",
        "No caffeine needed": "Pas de caféine nécessaire",
        "No nap planned": "Pas de sieste prévue",
        "No sleep debt": "Pas de dette de sommeil ✅",
        "mild": "léger",
        "moderate": "modéré",
        "severe": "sévère",
        "deficit": "déficit",
        "Keep current schedule": "Sur la bonne voie — gardez votre horaire !",
        "night": "nuit",
        "nights": "nuits",
        "Excellent": "⭐ Excellent",
        "Recommended": "✅ Recommandé",
        "Adequate": "Adéquat",
        "Minimum": "⚠️ Minimum",
        "NREM1": "NREM 1 (Léger)",
        "NREM2": "NREM 2",
        "NREM3": "NREM 3 (Profond)",
        "REM": "REM (Rêve)"
      },
      "formats": {
        "summary": "{mode} {optimalTime} pour {totalSleep} de sommeil ({cycles} cycles complets). Score qualité sommeil : {score}/100."
      },
      "infoCards": {
        "schedule": {
          "title": "Votre horaire de sommeil",
          "items": [
            {
              "label": "Heure optimale",
              "valueKey": "optimalTime"
            },
            {
              "label": "Sommeil total",
              "valueKey": "totalSleep"
            },
            {
              "label": "Cycles de sommeil",
              "valueKey": "sleepCycles"
            },
            {
              "label": "Qualité du sommeil",
              "valueKey": "sleepQuality"
            }
          ]
        },
        "hygiene": {
          "title": "Limites d'hygiène du sommeil",
          "items": [
            {
              "label": "Limite caféine",
              "valueKey": "caffeineDeadline"
            },
            {
              "label": "Extinction écrans",
              "valueKey": "screenDeadline"
            },
            {
              "label": "Dernier repas",
              "valueKey": "lastMeal"
            },
            {
              "label": "Limite exercice",
              "valueKey": "exerciseCutoff"
            }
          ]
        },
        "circadian": {
          "title": "Rythme circadien",
          "items": [
            {
              "label": "Lumière matinale",
              "valueKey": "morningLight"
            },
            {
              "label": "Fenêtre sieste",
              "valueKey": "napWindow"
            },
            {
              "label": "Dette sommeil",
              "valueKey": "debtStatus"
            },
            {
              "label": "Plan récupération",
              "valueKey": "recoveryPlan"
            }
          ]
        },
        "qualityFactors": {
          "title": "Facteurs qualité sommeil",
          "items": [
            {
              "label": "Alignement chronotype",
              "valueKey": "chronotypeAlignment"
            },
            {
              "label": "Complétion cycles",
              "valueKey": "cycleCompletion"
            },
            {
              "label": "Impact dette sommeil",
              "valueKey": "debtImpact"
            },
            {
              "label": "Hygiène sommeil",
              "valueKey": "hygieneScore"
            }
          ]
        },
        "tips": {
          "title": "Conseils pro",
          "items": [
            "Obtenez une lumière vive dans les 30 min du réveil pour remettre votre rythme circadien à zéro",
            "Évitez la caféine 8-10 heures avant le coucher — elle a une demi-vie de 5-6 heures",
            "Gardez votre chambre fraîche (15-19°C), sombre et silencieuse pour un sommeil optimal",
            "Les siestes éclair (10-20 min) augmentent la vigilance sans somnolence — les cycles complets (90 min) améliorent la mémoire"
          ]
        }
      },
      "chart": {
        "title": "Phases de sommeil à travers vos cycles",
        "xLabel": "Minutes endormi",
        "yLabel": "Phase de sommeil",
        "series": {
          "nrem1": "NREM 1 (Léger)",
          "nrem2": "NREM 2",
          "nrem3": "NREM 3 (Profond)",
          "rem": "REM (Rêve)"
        }
      },
      "detailedTable": {
        "cycleOptions": {
          "button": "Voir options cycles",
          "title": "Options cycles sommeil",
          "columns": {
            "cycles": "Cycles",
            "time": "Heure",
            "duration": "Durée",
            "quality": "Qualité"
          }
        }
      },
      "education": {
        "whatAreCycles": {
          "title": "Que sont les cycles de sommeil ?",
          "content": "Les cycles de sommeil sont des périodes de 90 minutes durant lesquelles votre cerveau passe par quatre phases distinctes : NREM 1 (sommeil léger, transition), NREM 2 (sommeil léger, température corporelle baisse), NREM 3 (sommeil profond, restauration physique), et REM (mouvements oculaires rapides, rêves et consolidation mémoire). Un cycle complet dure 90-120 minutes selon votre âge — les enfants ont des cycles plus longs (95-100 min) tandis que les seniors ont des cycles plus courts (80-85 min). Vous passez typiquement par 4-6 cycles par nuit. Se réveiller pendant NREM 3 ou en mi-REM cause de la somnolence, tandis que se réveiller à la fin d'un cycle (pendant NREM 1 ou à la transition REM-vers-NREM 1) vous laisse frais. C'est pourquoi vous pouvez dormir 8 heures et vous sentir terrible, ou dormir 7,5 heures et vous sentir formidable — ce n'est pas que la durée, c'est l'alignement des cycles."
        },
        "chronotypes": {
          "title": "Comprendre les chronotypes",
          "content": "Votre chronotype est votre préférence circadienne déterminée génétiquement — ce n'est pas une habitude, c'est votre biologie. Environ 55% des gens sont des Ours (dormeurs standard 22h-6h), 15% sont des Lions (lève-tôt qui se réveillent naturellement 5h-6h), 15% sont des Loups (couche-tard qui culminent 21h-minuit), et 10% sont des Dauphins (sommeil léger avec des patterns irréguliers). Le chronotype affecte plus que l'heure du coucher : les Lions culminent mentalement 8h-12h, les Ours culminent 10h-14h, les Loups culminent 17h-minuit. Essayer de forcer un Loup à être productif à 8h c'est comme demander à un Lion de faire du travail créatif à 23h — vous luttez contre votre biologie. Votre chronotype affecte aussi la latence d'endormissement : Lions s'endorment en 10-15 min, Ours en 15-20 min, Loups en 20-30 min, Dauphins en 30-45 min. Le calculateur s'ajuste automatiquement."
        },
        "lightExposure": {
          "title": "Exposition lumineuse et rythme circadien",
          "items": [
            {
              "text": "Lumière matinale (6h-8h) — Obtenez 10-30 min de lumière vive dans les 30 min du réveil. La lumière solaire extérieure est meilleure (10 000 lux), mais une lampe de luminothérapie (10 000 lux) fonctionne. Ceci remet votre horloge circadienne à zéro et avance votre phase de sommeil.",
              "type": "success"
            },
            {
              "text": "Lumière de midi — L'exposition à la lumière vive pendant le déjeuner aide à consolider le signal matinal. Une marche extérieure de 15 min est idéale.",
              "type": "info"
            },
            {
              "text": "Évitez la lumière bleue après le coucher du soleil — Les longueurs d'onde bleues (450-480nm) suppriment la production de mélatonine. Écrans éteints 45-60 min avant le coucher. Utilisez des lunettes anti-lumière bleue si inévitable.",
              "type": "warning"
            },
            {
              "text": "Éclairage tamisé le soir — Gardez les lumières tamisées (< 50 lux) 2-3 heures avant le coucher. Utilisez des ampoules de couleur chaude (ambre/rouge) dans les chambres et salles de bain.",
              "type": "info"
            },
            {
              "text": "Chambre occultée — Obscurité complète pendant le sommeil maximise la mélatonine. Utilisez des rideaux occultants ou un masque pour les yeux.",
              "type": "info"
            },
            {
              "text": "Luminothérapie pour couche-tard — Si vous êtes un Loup luttant avec des heures de travail matinales, utilisez une lampe de 10 000 lux pendant 20-30 min à 6h-7h pour décaler graduellement votre horloge plus tôt.",
              "type": "success"
            }
          ]
        },
        "mealExerciseTiming": {
          "title": "Timing repas et exercice pour un meilleur sommeil",
          "items": [
            {
              "text": "Dernier repas 3h+ avant le coucher — La digestion élève la température corporelle centrale et retarde l'endormissement. Gros repas 4h+ avant le coucher est idéal.",
              "type": "warning"
            },
            {
              "text": "Évitez l'alcool 3-4 heures avant le coucher — L'alcool perturbe le sommeil REM et cause un sommeil fragmenté dans la seconde moitié de la nuit.",
              "type": "warning"
            },
            {
              "text": "Exercice vigoureux 3h+ avant le coucher — Les entraînements intenses élèvent la température centrale pendant 4-6 heures. L'exercice matinal ou après-midi est meilleur.",
              "type": "info"
            },
            {
              "text": "Étirements légers/yoga OK — Mouvements doux 30-60 min avant le coucher peuvent aider la relaxation. Évitez les pics de rythme cardiaque.",
              "type": "success"
            },
            {
              "text": "Limite caféine — Le café a une demi-vie de 5-6 heures. Si vous êtes sensible, coupez 10-12 heures avant le coucher. Le thé a moins de caféine mais compte quand même.",
              "type": "warning"
            },
            {
              "text": "Protéines avant le coucher (optionnel) — Une petite collation riche en protéines (yaourt grec, fromage cottage) 1 heure avant le coucher peut améliorer la récupération musculaire nocturne sans perturber le sommeil.",
              "type": "info"
            }
          ]
        },
        "sleepDebt": {
          "title": "Récupération dette sommeil",
          "content": "La dette de sommeil est le sommeil perdu cumulé — si vous avez besoin de 8 heures mais dormez 6, vous accumulez 2 heures de dette par nuit. La recherche montre que vous pouvez récupérer environ 30 minutes de dette par nuit en dormant plus longtemps. N'essayez pas de rembourser toute la dette en un week-end — dormir 12 heures le samedi crée un 'jet lag social' qui perturbe votre rythme. Ajoutez plutôt 30-60 min par nuit pendant une semaine. Dette légère (<3h) récupère en 3-4 nuits, dette modérée (3-5h) prend une semaine, dette sévère (>5h) nécessite 2+ semaines. Dette chronique (mois/années) peut nécessiter une aide professionnelle. Signes de dette non récupérée : somnolence diurne, micro-sommeils (sommeil bref involontaire), temps de réaction réduit, changements d'humeur, envies de sucre. Le calculateur vous donne un plan de récupération nuit par nuit."
        },
        "napping": {
          "title": "Siestes stratégiques",
          "content": "Les siestes sont puissantes si chronométrées correctement. Les siestes éclair (10-20 min) procurent un boost de vigilance sans inertie de sommeil — vous vous réveillez frais. Les siestes cycle-complet (90 min) incluent le sommeil profond et REM, améliorant la consolidation mémoire et la créativité, mais peuvent causer de la somnolence si interrompues mi-cycle. Évitez les siestes >90 min ou après 15h — elles peuvent perturber le sommeil nocturne. La fenêtre de sieste idéale est 13h-15h, alignée avec la baisse naturelle post-déjeuner du rythme circadien. Pour les couche-tard (Loups), les siestes sont plus bénéfiques car leur sommeil nocturne est souvent restreint par les horaires sociaux/travail. Pour les lève-tôt (Lions), les siestes peuvent signaler une dette de sommeil — si vous faites la sieste quotidiennement, vous ne dormez pas assez la nuit. Le calculateur place votre sieste au point médian de vos heures d'éveil, plafonné à 15h."
        },
        "commonMistakes": {
          "title": "Erreurs communes de sommeil",
          "items": [
            {
              "text": "Grasses matinées le week-end — Se coucher 23h vendredi, 3h samedi c'est comme voler vers Hawaï et revenir chaque week-end (jet lag social). Tenez-vous à ±1 heure de votre horaire en semaine.",
              "type": "warning"
            },
            {
              "text": "Appuyer sur répéter — Ces 10 minutes supplémentaires sont fragmentées, sommeil de mauvaise qualité. Vous entrez un nouveau cycle de sommeil que vous ne compléterez pas. Réglez une alarme et levez-vous.",
              "type": "warning"
            },
            {
              "text": "Utiliser des écrans au lit — Votre cerveau associe le lit au sommeil. Lire sur tablette ou défiler sur téléphone entraîne votre cerveau que lit = temps d'éveil.",
              "type": "warning"
            },
            {
              "text": "Faire de l'exercice juste avant le coucher — Votre température centrale doit baisser de 1-2°C pour initier le sommeil. L'exercice vigoureux l'élève pendant 4-6 heures.",
              "type": "warning"
            },
            {
              "text": "Compter sur les somnifères long-terme — La plupart des médicaments pour dormir (Ambien, Lunesta) ne produisent pas une architecture de sommeil naturelle. Ils vous sédatent mais ne procurent pas de sommeil réparateur.",
              "type": "warning"
            },
            {
              "text": "Penser pouvoir 'rattraper' le sommeil — Vous pouvez récupérer une dette aiguë (1-2 semaines) mais une dette chronique (mois/années) cause des changements cognitifs et métaboliques permanents.",
              "type": "warning"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle est la différence entre les chronotypes ?",
          "answer": "Les chronotypes sont des préférences circadiennes déterminées génétiquement. Les Lions (15% des gens) se réveillent naturellement 5h-6h et culminent mentalement 8h-12h. Les Ours (55%) suivent des horaires standard 22h-6h et culminent 10h-14h. Les Loups (15%) dorment naturellement minuit-8h et culminent créativement 17h-minuit. Les Dauphins (10%) ont un sommeil léger avec des patterns irréguliers et une anxiété élevée. Votre chronotype affecte la latence d'endormissement, les heures de travail optimales, et même quand vous devriez manger et faire de l'exercice. Le calculateur ajuste les cycles de sommeil et recommandations selon votre chronotype."
        },
        {
          "question": "Puis-je changer mon chronotype ou suis-je coincé avec pour toujours ?",
          "answer": "Votre chronotype est ~50% génétique et ~50% environnemental. Vous pouvez le décaler légèrement (30-90 min) avec une exposition lumineuse et un timing de repas cohérents, mais vous ne pouvez pas transformer un Loup en Lion. Si vous êtes un couche-tard forcé de vous réveiller à 6h pour le travail, utilisez la luminothérapie matinale (10 000 lux pendant 20-30 min à 6h-7h) et évitez la lumière après 20h. Les décalages graduels (15 min par semaine) fonctionnent mieux que les changements soudains. Plus important : alignez votre travail mental le plus dur avec les heures de pointe de votre chronotype, même si vous ne pouvez pas changer votre horaire de sommeil."
        },
        {
          "question": "Pourquoi je me réveille parfois groggy même après 8 heures de sommeil ?",
          "answer": "Vous vous êtes réveillé mi-cycle, probablement pendant NREM 3 (sommeil profond) ou mi-REM. Les cycles de sommeil durent 90-120 minutes, et se réveiller pendant les phases les plus profondes cause de l'inertie de sommeil — somnolence durant 30-60 minutes. C'est pourquoi 7,5 heures (5 cycles complets) peuvent sembler mieux que 8 heures (5,33 cycles). Utilisez le calculateur pour cibler les heures de réveil à la fin des cycles (NREM 1 ou transition REM-vers-NREM). Si vous vous réveillez constamment groggy malgré le timing des cycles, vous pourriez avoir de l'apnée du sommeil ou autres troubles du sommeil — consultez un spécialiste du sommeil."
        },
        {
          "question": "Combien de temps faut-il pour récupérer d'une dette de sommeil ?",
          "answer": "Vous pouvez récupérer environ 30 minutes de dette de sommeil par nuit en dormant plus longtemps. Dette légère (<3 heures) récupère en 3-4 nuits. Dette modérée (3-5 heures) prend une semaine. Dette sévère (>5 heures) nécessite 2+ semaines. N'essayez pas de 'rattraper' en dormant 12 heures le samedi — cela crée un jet lag social et empire votre rythme. Ajoutez plutôt 30-60 min par nuit de façon cohérente. La dette de sommeil chronique (mois ou années de sommeil insuffisant) peut causer des changements permanents à la cognition, métabolisme et fonction immunitaire qui ne peuvent pas être entièrement récupérés."
        },
        {
          "question": "Quel est le meilleur moment pour faire la sieste et pendant combien de temps ?",
          "answer": "La meilleure fenêtre de sieste est 13h-15h, alignée avec la baisse naturelle post-déjeuner de votre rythme circadien. Les siestes éclair (10-20 min) boostent la vigilance sans inertie de sommeil — vous vous réveillez frais. Les siestes cycle-complet (90 min) incluent le sommeil profond et REM, améliorant mémoire et créativité, mais peuvent causer de la somnolence si interrompues. Évitez les siestes après 15h car elles peuvent perturber le sommeil nocturne. Si vous faites la sieste quotidiennement, vous ne dormez pas assez la nuit. Les Loups (couche-tard) bénéficient plus des siestes car les horaires sociaux restreignent leur fenêtre de sommeil naturelle."
        },
        {
          "question": "Pourquoi la caféine affecte-t-elle mon sommeil même 8 heures plus tard ?",
          "answer": "La caféine a une demi-vie de 5-6 heures, ce qui signifie que si vous buvez du café à 14h, 50% de la caféine est encore dans votre système à 20h. Pour les individus sensibles, le quart-de-vie (75% éliminé) est de 10-12 heures. La caféine bloque les récepteurs d'adénosine — l'adénosine est le produit chimique qui vous rend somnolent. Même si vous 'vous sentez bien' et vous endormez, la caféine réduit le sommeil profond (NREM 3) de 15-30%, sabotant la qualité du sommeil. Le calculateur recommande des limites de caféine 8-12 heures avant le coucher selon votre consommation. Si vous buvez 4+ tasses quotidiennement, considérez couper 10-12 heures avant le coucher."
        },
        {
          "question": "Vaut-il mieux dormir moins ou se réveiller mi-cycle ?",
          "answer": "Complétez toujours des cycles complets. Se réveiller mi-cycle (surtout pendant NREM 3 ou REM) cause une inertie de sommeil sévère et altère la fonction cognitive pendant 30-60 minutes. Si vous devez choisir entre 6 heures (4 cycles complets) ou 7 heures (4,67 cycles), choisissez 6 heures. La plupart des gens se sentent mieux avec 7,5 heures (5 cycles) qu'avec 8 heures (5,33 cycles). Cela dit, 4 cycles (6 heures) est en-dessous des 7-9 heures recommandées pour les adultes. Le sommeil court (<6 heures) chroniquement augmente le risque de maladie cardiovasculaire, obésité et déclin cognitif. Utilisez le timing des cycles pour un sommeil court occasionnel, pas comme stratégie long-terme."
        },
        {
          "question": "Comment l'exposition lumineuse affecte-t-elle mon sommeil et rythme circadien ?",
          "answer": "La lumière est le régulateur circadien le plus puissant. La lumière matinale (6h-8h, 10 000 lux) remet votre horloge circadienne à zéro et avance votre phase de sommeil (vous rend somnolent plus tôt). La lumière bleue (450-480 nm) supprime la production de mélatonine pendant 2-3 heures, retardant l'endormissement. La lumière solaire extérieure fait 10 000-100 000 lux ; l'éclairage intérieur fait 300-500 lux. Obtenez 10-30 min de lumière extérieure dans les 30 min du réveil. Évitez les écrans 45-60 min avant le coucher ou utilisez des lunettes anti-lumière bleue. Pour les couche-tard, la luminothérapie matinale (lampe 10 000 lux pendant 20-30 min) peut graduellement décaler votre horloge plus tôt."
        },
        {
          "question": "Pourquoi le calculateur recommande-t-il de manger 3 heures avant le coucher ?",
          "answer": "La digestion élève votre température corporelle centrale et détourne le flux sanguin vers votre système digestif. L'endormissement nécessite une baisse de 1-2°C de la température centrale. Les gros repas 3-4 heures avant le coucher empêchent cette baisse de température et retardent le sommeil de 30-60 minutes. De plus, se coucher avec un estomac plein augmente le risque de reflux acide. Les aliments épicés ou gras peuvent causer un inconfort digestif pendant la nuit. Une collation légère (yaourt grec, petite banane) 1 heure avant le coucher est OK et peut même aider certaines personnes à dormir. Évitez l'alcool 3-4 heures avant le coucher — il fragmente le sommeil REM dans la seconde moitié de la nuit."
        },
        {
          "question": "Qu'est-ce que le 'score de qualité du sommeil' et comment est-il calculé ?",
          "answer": "Le score de qualité du sommeil (0-100) combine quatre facteurs : (1) Complétion des cycles — obtenir les cycles recommandés pour votre âge (40 points), (2) Alignement chronotype — dormir aux heures correspondant à votre préférence génétique (25 points), (3) Dette de sommeil — dette plus faible = score plus élevé (20 points), (4) Hygiène du sommeil — limite caféine, extinction écrans, timing repas (15 points). Un score de 85+ est excellent, 70-84 est bon, 60-69 est correct, en-dessous de 60 indique place à amélioration. Le score vous aide à voir à quel point votre horaire actuel s'aligne avec les pratiques de sommeil optimales. Ce n'est pas un diagnostic médical, juste un outil d'évaluation rapide."
        },
        {
          "question": "Puis-je m'entraîner à avoir besoin de moins de sommeil ?",
          "answer": "Non. L'idée que vous pouvez 'vous entraîner' à avoir besoin de 4-5 heures de sommeil est un mythe perpétué par des surachieveurs privés de sommeil. Les adultes ont besoin de 7-9 heures par nuit (5-6 cycles complets). Moins de 1% de la population a une mutation génétique (DEC2) qui leur permet de fonctionner avec 6 heures. Le sommeil court chronique (<7 heures) augmente le risque de maladie cardiovasculaire, obésité, diabète, démence et mort précoce. Vous pourriez 'vous sentir bien' avec 6 heures grâce à l'adrénaline et la caféine, mais les tests cognitifs montrent une performance altérée équivalente à être légalement ivre. Le sommeil n'est pas optionnel — c'est quand votre cerveau élimine les toxines, consolide les souvenirs et répare les tissus."
        },
        {
          "question": "Que dois-je faire si je n'arrive pas à m'endormir dans les 20-30 minutes ?",
          "answer": "Sortez du lit. Rester éveillé à vous frustrer crée une association négative entre votre lit et l'éveil. Allez dans une autre pièce, faites une activité ennuyeuse dans une lumière tamisée (lire un livre papier, étirements légers, écouter de la musique apaisante), et retournez au lit seulement quand vous vous sentez somnolent. C'est appelé la thérapie de contrôle du stimulus. Vérifiez aussi : Avez-vous pris de la caféine 8h+ avant le coucher ? Avez-vous fait de l'exercice tard ? Votre chambre est-elle fraîche (15-19°C), sombre et silencieuse ? Avez-vous regardé des écrans dans la dernière heure ? Êtes-vous stressé ou anxieux ? Si vous mettez >30 min à vous endormir 3+ nuits par semaine pendant 3+ mois, consultez un spécialiste du sommeil — vous pourriez avoir de l'insomnie ou un autre trouble du sommeil."
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
      "name": "Schlaf-Rechner",
      "slug": "schlaf-rechner",
      "subtitle": "Finden Sie Ihren perfekten Schlafrhythmus mit personalisierter Zyklus-Zeit, Chronotyp-Anpassung, Koffein-Stopp, Lichtexpositionsplan und Erholungsplanung — kostenloser Schlafzyklus-Rechner",
      "breadcrumb": "Schlaf",
      "seo": {
        "title": "Schlaf-Rechner - Schlafenszeit & Aufwach-Zyklus-Planer mit Chronotyp",
        "description": "Berechnen Sie Ihre optimale Schlafenszeit oder Aufwachzeit mit altersangepassten Schlafzyklen und Chronotyp-Analyse. Erhalten Sie Koffein-Stopp, Lichtexpositionsplan, Mahlzeiten-Zeit, Nickerchen-Fenster und Schlafschuld-Erholungsplan — völlig kostenlos.",
        "shortDescription": "Finden Sie optimale Schlafens- und Aufwachzeiten mit Schlafzyklen und Chronotyp",
        "keywords": [
          "schlaf rechner",
          "schlafenszeit rechner",
          "schlafzyklus rechner",
          "aufwachzeit rechner",
          "chronotyp rechner",
          "nickerchen rechner",
          "schlafschuld tracker",
          "zirkadianer rhythmus rechner"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "mode": {
          "label": "Ich möchte finden...",
          "helpText": "Wählen Sie, was berechnet werden soll",
          "options": {
            "wakeup": "Schlafenszeit (Ich kenne meine Aufwachzeit)",
            "bedtime": "Aufwachzeit (Ich kenne meine Schlafenszeit)"
          }
        },
        "targetHour": {
          "label": "Stunde",
          "helpText": "",
          "options": {
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
            "12": "12"
          }
        },
        "targetMinute": {
          "label": "Minute",
          "helpText": "",
          "options": {
            "0": ":00",
            "15": ":15",
            "30": ":30",
            "45": ":45"
          }
        },
        "targetPeriod": {
          "label": "Vormittags / Nachmittags",
          "helpText": "",
          "options": {
            "am": "Vormittags",
            "pm": "Nachmittags"
          }
        },
        "age": {
          "label": "Alter",
          "helpText": "Schlafbedürfnisse und Zykluslänge ändern sich mit dem Alter"
        },
        "chronotype": {
          "label": "Chronotyp",
          "helpText": "Ihre natürliche Schlaf-Wach-Präferenz",
          "options": {
            "bear": "🐻 Bär — Standard (55%)",
            "lion": "🦁 Löwe — Frühaufsteher (15%)",
            "wolf": "🐺 Wolf — Nachteule (15%)",
            "dolphin": "🐬 Delfin — Leichtschläfer (10%)"
          }
        },
        "fallAsleepTime": {
          "label": "Zeit zum Einschlafen",
          "helpText": "Wie lange Sie normalerweise zum Einschlafen brauchen",
          "options": {
            "5": "5 Min — sehr schnell",
            "10": "10 Min — schnell",
            "15": "15 Min — durchschnittlich",
            "20": "20 Min — normal",
            "30": "30 Min — langsam",
            "45": "45 Min — sehr langsam",
            "60": "60 Min — Schwierigkeiten"
          }
        },
        "caffeinePerDay": {
          "label": "Tägliches Koffein",
          "helpText": "Tassen Kaffee, Tee oder Energy-Drinks"
        },
        "sleepDebtHours": {
          "label": "Wöchentliche Schlafschuld",
          "helpText": "Verpasste Schlafstunden diese Woche"
        },
        "wantsNap": {
          "label": "Nickerchen planen?",
          "helpText": "Erhalten Sie Ihr optimales Nickerchen-Fenster",
          "options": {
            "no": "Nein",
            "yes": "Ja"
          }
        },
        "napType": {
          "label": "Nickerchen-Typ",
          "helpText": "Wählen Sie basierend auf verfügbarer Zeit und Bedarf",
          "options": {
            "power10": "Power-Nickerchen (10 Min)",
            "short20": "Kurzes Nickerchen (20 Min)",
            "full90": "Vollzyklus (90 Min)"
          }
        }
      },
      "inputGroups": {},
      "results": {
        "optimalTime": {
          "label": "Optimale Zeit"
        },
        "totalSleep": {
          "label": "Gesamtschlaf"
        },
        "sleepCycles": {
          "label": "Vollständige Zyklen"
        },
        "caffeineDeadline": {
          "label": "Koffein-Stopp"
        },
        "screenDeadline": {
          "label": "Bildschirme aus"
        },
        "napWindow": {
          "label": "Nickerchen-Fenster"
        },
        "debtStatus": {
          "label": "Schlafschuld"
        },
        "recoveryPlan": {
          "label": "Erholungsplan"
        },
        "sleepQuality": {
          "label": "Schlafqualitäts-Bewertung"
        },
        "morningLight": {
          "label": "Morgenlicht"
        },
        "lastMeal": {
          "label": "Letzte Mahlzeit"
        },
        "exerciseCutoff": {
          "label": "Sport-Stopp"
        }
      },
      "tooltips": {
        "optimalTime": "Berechnet mit altersangepassten Schlafzyklen und Einschlaflatenz",
        "totalSleep": "Gesamte Schlafzeit (ohne Zeit zum Einschlafen)",
        "sleepCycles": "Vollständige Schlafzyklen — jeder enthält NREM + REM-Phasen",
        "caffeineDeadline": "Basierend auf Koffeins 5-Stunden-Halbwertszeit und Ihrer täglichen Aufnahme",
        "screenDeadline": "Blaues Licht unterdrückt Melatonin — Bildschirme 45 Min vor dem Schlafengehen aus",
        "napWindow": "Optimales Nickerchen-Timing basierend auf Chronotyp und Wachstunden",
        "debtStatus": "Kumulative Schlafdefizit — leicht (<3h), mäßig (3-5h), schwer (>5h)",
        "recoveryPlan": "Fügen Sie 30 Min pro Nacht hinzu, um Schlafschuld allmählich abzubauen",
        "sleepQuality": "Bewertung basierend auf Zyklen, Chronotyp-Anpassung, Schuld und Schlafhygiene",
        "morningLight": "Helles Licht innerhalb von 30 Min nach dem Aufwachen setzt den zirkadianen Rhythmus zurück",
        "lastMeal": "Essen 3+ Stunden vor dem Schlafengehen verbessert Schlafqualität und reduziert Reflux",
        "exerciseCutoff": "Intensiver Sport erhöht Körpertemperatur — vermeiden Sie ihn 3h vor dem Schlafengehen"
      },
      "presets": {
        "earlyBird": {
          "label": "Frühaufsteher (Löwe)",
          "description": "Löwen-Chronotyp, Aufwachen 5:30, minimales Koffein, keine Schuld"
        },
        "standard": {
          "label": "Standard (Bär)",
          "description": "Bären-Chronotyp, Aufwachen 7:00, mäßiges Koffein, keine Schuld"
        },
        "nightOwl": {
          "label": "Nachteule (Wolf)",
          "description": "Wolf-Chronotyp, Aufwachen 9:00, viel Koffein, 2h Schuld, Power-Nickerchen"
        },
        "shiftWorker": {
          "label": "Schichtarbeiter",
          "description": "Frühes Aufwachen, viel Koffein, 5h Schuld, Nickerchen-Plan, Erholung nötig"
        },
        "student": {
          "label": "Student",
          "description": "Aufwachen 8:00, mäßiges Koffein, 3h Schuld, Nickerchen empfohlen"
        },
        "lightSleeper": {
          "label": "Leichtschläfer (Delfin)",
          "description": "Delfin-Chronotyp, Aufwachen 6:30, 30 Min Einschlaflatenz"
        }
      },
      "values": {
        "hours": "Stunden",
        "hour": "Stunde",
        "minutes": "Minuten",
        "min": "Min",
        "cycle": "Zyklus",
        "cycles": "Zyklen",
        "Bedtime": "🛏️ Schlafenszeit",
        "Wake-Up": "⏰ Aufwachen",
        "No caffeine needed": "Kein Koffein nötig",
        "No nap planned": "Kein Nickerchen geplant",
        "No sleep debt": "Keine Schlafschuld ✅",
        "mild": "leicht",
        "moderate": "mäßig",
        "severe": "schwer",
        "deficit": "Defizit",
        "Keep current schedule": "Auf Kurs — behalten Sie Ihren Rhythmus bei!",
        "night": "Nacht",
        "nights": "Nächte",
        "Excellent": "⭐ Ausgezeichnet",
        "Recommended": "✅ Empfohlen",
        "Adequate": "Angemessen",
        "Minimum": "⚠️ Minimum",
        "NREM1": "NREM 1 (Leicht)",
        "NREM2": "NREM 2",
        "NREM3": "NREM 3 (Tief)",
        "REM": "REM (Traum)"
      },
      "formats": {
        "summary": "{mode} {optimalTime} für {totalSleep} Schlaf ({cycles} vollständige Zyklen). Schlafqualitäts-Bewertung: {score}/100."
      },
      "infoCards": {
        "schedule": {
          "title": "Ihr Schlafplan",
          "items": [
            {
              "label": "Optimale Zeit",
              "valueKey": "optimalTime"
            },
            {
              "label": "Gesamtschlaf",
              "valueKey": "totalSleep"
            },
            {
              "label": "Schlafzyklen",
              "valueKey": "sleepCycles"
            },
            {
              "label": "Schlafqualität",
              "valueKey": "sleepQuality"
            }
          ]
        },
        "hygiene": {
          "title": "Schlafhygiene-Fristen",
          "items": [
            {
              "label": "Koffein-Stopp",
              "valueKey": "caffeineDeadline"
            },
            {
              "label": "Bildschirme aus",
              "valueKey": "screenDeadline"
            },
            {
              "label": "Letzte Mahlzeit",
              "valueKey": "lastMeal"
            },
            {
              "label": "Sport-Stopp",
              "valueKey": "exerciseCutoff"
            }
          ]
        },
        "circadian": {
          "title": "Zirkadianer Rhythmus",
          "items": [
            {
              "label": "Morgenlicht",
              "valueKey": "morningLight"
            },
            {
              "label": "Nickerchen-Fenster",
              "valueKey": "napWindow"
            },
            {
              "label": "Schlafschuld",
              "valueKey": "debtStatus"
            },
            {
              "label": "Erholungsplan",
              "valueKey": "recoveryPlan"
            }
          ]
        },
        "qualityFactors": {
          "title": "Schlafqualitätsfaktoren",
          "items": [
            {
              "label": "Chronotyp-Anpassung",
              "valueKey": "chronotypeAlignment"
            },
            {
              "label": "Zyklus-Vollendung",
              "valueKey": "cycleCompletion"
            },
            {
              "label": "Schlafschuld-Auswirkung",
              "valueKey": "debtImpact"
            },
            {
              "label": "Schlafhygiene",
              "valueKey": "hygieneScore"
            }
          ]
        },
        "tips": {
          "title": "Profi-Tipps",
          "items": [
            "Bekommen Sie helles Licht innerhalb von 30 Min nach dem Aufwachen, um Ihren zirkadianen Rhythmus zurückzusetzen",
            "Vermeiden Sie Koffein 8-10 Stunden vor dem Schlafengehen — es hat eine 5-6 Stunden Halbwertszeit",
            "Halten Sie Ihr Schlafzimmer kühl (15-19°C), dunkel und ruhig für optimalen Schlaf",
            "Power-Nickerchen (10-20 Min) steigern die Aufmerksamkeit ohne Benommenheit — Vollzyklen (90 Min) verbessern das Gedächtnis"
          ]
        }
      },
      "chart": {
        "title": "Schlafphasen über Ihre Zyklen",
        "xLabel": "Minuten im Schlaf",
        "yLabel": "Schlafphase",
        "series": {
          "nrem1": "NREM 1 (Leicht)",
          "nrem2": "NREM 2",
          "nrem3": "NREM 3 (Tief)",
          "rem": "REM (Traum)"
        }
      },
      "detailedTable": {
        "cycleOptions": {
          "button": "Zyklus-Optionen anzeigen",
          "title": "Schlafzyklus-Optionen",
          "columns": {
            "cycles": "Zyklen",
            "time": "Zeit",
            "duration": "Dauer",
            "quality": "Qualität"
          }
        }
      },
      "education": {
        "whatAreCycles": {
          "title": "Was sind Schlafzyklen?",
          "content": "Schlafzyklen sind 90-Minuten-Perioden, in denen Ihr Gehirn vier verschiedene Phasen durchläuft: NREM 1 (Leichtschlaf, Übergang), NREM 2 (Leichtschlaf, Körpertemperatur sinkt), NREM 3 (Tiefschlaf, körperliche Erholung) und REM (schnelle Augenbewegung, Träumen und Gedächtniskonsolidierung). Ein vollständiger Zyklus dauert je nach Alter 90-120 Minuten — Kinder haben längere Zyklen (95-100 Min), während Senioren kürzere haben (80-85 Min). Sie durchlaufen normalerweise 4-6 Zyklen pro Nacht. Das Aufwachen während NREM 3 oder mitten im REM verursacht Benommenheit, während das Aufwachen am Ende eines Zyklus (während NREM 1 oder beim REM-zu-NREM-1-Übergang) Sie erfrischt fühlen lässt. Deshalb können Sie 8 Stunden schlafen und sich schrecklich fühlen, oder 7,5 Stunden schlafen und sich großartig fühlen — es geht nicht nur um die Dauer, sondern um die Zyklus-Anpassung."
        },
        "chronotypes": {
          "title": "Chronotypen verstehen",
          "content": "Ihr Chronotyp ist Ihre genetisch bestimmte zirkadiane Präferenz — es ist keine Gewohnheit, es ist Ihre Biologie. Etwa 55% der Menschen sind Bären (Standard 22-6 Uhr Schläfer), 15% sind Löwen (Frühaufsteher, die natürlich 5-6 Uhr aufwachen), 15% sind Wölfe (Nachteulen, die 21-24 Uhr Höchstleistung haben) und 10% sind Delfine (Leichtschläfer mit unregelmäßigen Mustern). Der Chronotyp beeinflusst mehr als die Schlafenszeit: Löwen haben mental 8-12 Uhr Höchstleistung, Bären 10-14 Uhr, Wölfe 17-24 Uhr. Einen Wolf zu zwingen, um 8 Uhr produktiv zu sein, ist wie einen Löwen zu bitten, um 23 Uhr kreativ zu arbeiten — Sie kämpfen gegen Ihre Biologie. Ihr Chronotyp beeinflusst auch die Einschlaflatenz: Löwen schlafen in 10-15 Min ein, Bären in 15-20 Min, Wölfe in 20-30 Min, Delfine in 30-45 Min. Der Rechner passt sich automatisch daran an."
        },
        "lightExposure": {
          "title": "Lichtexposition & Zirkadianer Rhythmus",
          "items": [
            {
              "text": "Morgenlicht (6-8 Uhr) — Bekommen Sie 10-30 Min helles Licht innerhalb von 30 Min nach dem Aufwachen. Sonnenlicht im Freien ist am besten (10.000 Lux), aber eine Lichtbox (10.000 Lux) funktioniert. Dies setzt Ihre zirkadiane Uhr zurück und verschiebt Ihre Schlafphase vor.",
              "type": "success"
            },
            {
              "text": "Mittagslicht — Helles Licht während des Mittagessens hilft, das Morgensignal zu festigen. Ein 15-minütiger Spaziergang im Freien ist ideal.",
              "type": "info"
            },
            {
              "text": "Blaues Licht nach Sonnenuntergang vermeiden — Blaue Wellenlängen (450-480nm) unterdrücken die Melatoninproduktion. Bildschirme 45-60 Min vor dem Schlafengehen ausschalten. Verwenden Sie blaulichtblockierende Brille, wenn unvermeidbar.",
              "type": "warning"
            },
            {
              "text": "Gedämpfte Abendbeleuchtung — Halten Sie Lichter gedämpft (< 50 Lux) 2-3 Stunden vor dem Schlafengehen. Verwenden Sie warmfarbige Glühbirnen (bernstein/rot) in Schlaf- und Badezimmern.",
              "type": "info"
            },
            {
              "text": "Verdunkeltes Schlafzimmer — Vollständige Dunkelheit während des Schlafs maximiert Melatonin. Verwenden Sie Verdunkelungsvorhänge oder eine Augenmaske.",
              "type": "info"
            },
            {
              "text": "Lichttherapie für Nachteulen — Wenn Sie ein Wolf sind, der mit frühen Arbeitszeiten kämpft, verwenden Sie eine 10.000-Lux-Lichtbox für 20-30 Min um 6-7 Uhr, um Ihre Uhr allmählich früher zu verschieben.",
              "type": "success"
            }
          ]
        },
        "mealExerciseTiming": {
          "title": "Mahlzeiten- & Sport-Timing für besseren Schlaf",
          "items": [
            {
              "text": "Letzte Mahlzeit 3+ Stunden vor dem Schlafengehen — Verdauung erhöht die Körpertemperatur und verzögert den Schlafbeginn. Große Mahlzeiten 4+ Stunden vor dem Schlafengehen sind ideal.",
              "type": "warning"
            },
            {
              "text": "Alkohol 3-4 Stunden vor dem Schlafengehen vermeiden — Alkohol stört den REM-Schlaf und verursacht fragmentierten Schlaf in der zweiten Nachthälfte.",
              "type": "warning"
            },
            {
              "text": "Intensiver Sport 3+ Stunden vor dem Schlafengehen — Intensive Workouts erhöhen die Körpertemperatur für 4-6 Stunden. Morgen- oder Nachmittagssport ist am besten.",
              "type": "info"
            },
            {
              "text": "Leichtes Dehnen/Yoga ist OK — Sanfte Bewegung 30-60 Min vor dem Schlafengehen kann bei der Entspannung helfen. Vermeiden Sie Herzfrequenzspitzen.",
              "type": "success"
            },
            {
              "text": "Koffein-Stopp — Kaffee hat eine 5-6 Stunden Halbwertszeit. Wenn Sie empfindlich sind, stoppen Sie 10-12 Stunden vor dem Schlafengehen. Tee hat weniger Koffein, ist aber trotzdem wichtig.",
              "type": "warning"
            },
            {
              "text": "Protein vor dem Schlafengehen (optional) — Ein kleiner proteinreicher Snack (griechischer Joghurt, Hüttenkäse) 1 Stunde vor dem Schlafengehen kann die nächtliche Muskelerholung verbessern, ohne den Schlaf zu stören.",
              "type": "info"
            }
          ]
        },
        "sleepDebt": {
          "title": "Schlafschuld-Erholung",
          "content": "Schlafschuld ist kumulativ verlorener Schlaf — wenn Sie 8 Stunden brauchen, aber 6 schlafen, sammeln Sie 2 Stunden Schuld pro Nacht an. Forschung zeigt, dass Sie etwa 30 Minuten Schuld pro Nacht durch längeren Schlaf abbauen können. Versuchen Sie nicht, alle Schulden an einem Wochenende zurückzuzahlen — 12 Stunden am Samstag zu schlafen erzeugt 'sozialen Jetlag', der Ihren Rhythmus stört. Fügen Sie stattdessen 30-60 Min pro Nacht für eine Woche hinzu. Leichte Schuld (<3h) erholt sich in 3-4 Nächten, mäßige Schuld (3-5h) braucht eine Woche, schwere Schuld (>5h) braucht 2+ Wochen. Chronische Schuld (Monate/Jahre) benötigt möglicherweise professionelle Hilfe. Anzeichen nicht abgebauter Schuld: Tagesmüdigkeit, Mikroschlaf (kurzer unbeabsichtigter Schlaf), reduzierte Reaktionszeit, Stimmungsschwankungen, Zuckerverlangen. Der Rechner gibt Ihnen einen Nacht-für-Nacht-Erholungsplan."
        },
        "napping": {
          "title": "Strategisches Nickerchen",
          "content": "Nickerchen sind kraftvoll, wenn sie richtig getimed sind. Power-Nickerchen (10-20 Min) bieten Aufmerksamkeitsschub ohne Schlafträgheit — Sie wachen erfrischt auf. Vollzyklus-Nickerchen (90 Min) umfassen Tiefschlaf und REM, verbessern Gedächtniskonsolidierung und Kreativität, können aber Benommenheit verursachen, wenn sie mitten im Zyklus unterbrochen werden. Vermeiden Sie Nickerchen >90 Min oder nach 15 Uhr — sie können den nächtlichen Schlaf stören. Das ideale Nickerchen-Fenster ist 13-15 Uhr, angepasst an das natürliche Nach-Mittag-Tief im zirkadianen Rhythmus. Für Nachteulen (Wölfe) sind Nickerchen vorteilhafter, weil ihr nächtlicher Schlaf oft durch soziale/Arbeitszeiten eingeschränkt ist. Für Frühaufsteher (Löwen) können Nickerchen Schlafschuld signalisieren — wenn Sie täglich Nickerchen machen, bekommen Sie nicht genug nächtlichen Schlaf. Der Rechner platziert Ihr Nickerchen in der Mitte Ihrer Wachstunden, begrenzt auf 15 Uhr."
        },
        "commonMistakes": {
          "title": "Häufige Schlaffehler",
          "items": [
            {
              "text": "Am Wochenende ausschlafen — Freitag 23 Uhr ins Bett, Samstag 3 Uhr ist wie jedes Wochenende nach Hawaii und zurück zu fliegen (sozialer Jetlag). Bleiben Sie ±1 Stunde bei Ihrem Wochentagsplan.",
              "type": "warning"
            },
            {
              "text": "Schlummertaste drücken — Diese zusätzlichen 10 Minuten sind fragmentierter, schlechter Schlaf. Sie beginnen einen neuen Schlafzyklus, den Sie nicht vollenden werden. Stellen Sie einen Alarm und stehen Sie auf.",
              "type": "warning"
            },
            {
              "text": "Bildschirme im Bett verwenden — Ihr Gehirn verbindet das Bett mit Schlaf. Auf einem Tablet lesen oder am Handy scrollen trainiert Ihr Gehirn, dass Bett = Wachzeit bedeutet.",
              "type": "warning"
            },
            {
              "text": "Sport direkt vor dem Schlafengehen — Ihre Körpertemperatur muss um 1-2°C sinken, um Schlaf einzuleiten. Intensiver Sport erhöht sie für 4-6 Stunden.",
              "type": "warning"
            },
            {
              "text": "Langfristig auf Schlaftabletten angewiesen — Die meisten Schlafmedikamente (Ambien, Lunesta) erzeugen keine natürliche Schlafarchitektur. Sie betäuben Sie, bieten aber keinen erholsamen Schlaf.",
              "type": "warning"
            },
            {
              "text": "Denken, Sie können Schlaf 'nachholen' — Sie können akute Schuld (1-2 Wochen) abbauen, aber chronische Schuld (Monate/Jahre) verursacht permanente kognitive und metabolische Veränderungen.",
              "type": "warning"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Was ist der Unterschied zwischen Chronotypen?",
          "answer": "Chronotypen sind genetisch bestimmte zirkadiane Präferenzen. Löwen (15% der Menschen) wachen natürlich 5-6 Uhr auf und haben mental 8-12 Uhr Höchstleistung. Bären (55%) folgen Standard-22-6-Uhr-Plänen und haben 10-14 Uhr Höchstleistung. Wölfe (15%) schlafen natürlich 24-8 Uhr und haben kreativ 17-24 Uhr Höchstleistung. Delfine (10%) sind Leichtschläfer mit unregelmäßigen Mustern und hoher Angst. Ihr Chronotyp beeinflusst Einschlaflatenz, optimale Arbeitszeiten und sogar wann Sie essen und Sport treiben sollten. Der Rechner passt Schlafzyklen und Empfehlungen basierend auf Ihrem Chronotyp an."
        },
        {
          "question": "Kann ich meinen Chronotyp ändern oder bin ich für immer damit festgelegt?",
          "answer": "Ihr Chronotyp ist ~50% genetisch und ~50% umweltbedingt. Sie können ihn leicht (30-90 Min) mit konsistenter Lichtexposition und Mahlzeiten-Timing verschieben, aber Sie können keinen Wolf in einen Löwen verwandeln. Wenn Sie eine Nachteule sind, die um 6 Uhr für die Arbeit aufwachen muss, verwenden Sie morgendliche Lichttherapie (10.000 Lux für 20-30 Min um 6-7 Uhr) und vermeiden Sie Licht nach 20 Uhr. Allmähliche Verschiebungen (15 Min pro Woche) funktionieren besser als plötzliche Änderungen. Am wichtigsten: Richten Sie Ihre schwerste geistige Arbeit auf die Spitzenzeiten Ihres Chronotyps aus, auch wenn Sie Ihren Schlafplan nicht ändern können."
        },
        {
          "question": "Warum wache ich manchmal benommen auf, auch nach 8 Stunden Schlaf?",
          "answer": "Sie sind mitten im Zyklus aufgewacht, wahrscheinlich während NREM 3 (Tiefschlaf) oder mitten im REM. Schlafzyklen dauern 90-120 Minuten, und das Aufwachen während der tiefsten Phasen verursacht Schlafträgheit — Benommenheit, die 30-60 Minuten anhält. Deshalb können sich 7,5 Stunden (5 vollständige Zyklen) besser anfühlen als 8 Stunden (5,33 Zyklen). Verwenden Sie den Rechner, um Aufwachzeiten am Ende von Zyklen anzuzielen (NREM 1 oder REM-zu-NREM-Übergang). Wenn Sie trotz Zyklus-Timing konsistent benommen aufwachen, haben Sie möglicherweise Schlafapnoe oder andere Schlafstörungen — suchen Sie einen Schlafspezialisten auf."
        },
        {
          "question": "Wie lange dauert es, sich von Schlafschuld zu erholen?",
          "answer": "Sie können etwa 30 Minuten Schlafschuld pro Nacht durch längeren Schlaf abbauen. Leichte Schuld (<3 Stunden) erholt sich in 3-4 Nächten. Mäßige Schuld (3-5 Stunden) braucht eine Woche. Schwere Schuld (>5 Stunden) braucht 2+ Wochen. Versuchen Sie nicht, durch 12 Stunden Schlaf am Samstag 'aufzuholen' — das erzeugt sozialen Jetlag und verschlechtert Ihren Rhythmus. Fügen Sie stattdessen konsistent 30-60 Min pro Nacht hinzu. Chronische Schlafschuld (Monate oder Jahre unzureichenden Schlafs) kann permanente Veränderungen in Kognition, Stoffwechsel und Immunfunktion verursachen, die nicht vollständig wiederherstellbar sind."
        },
        {
          "question": "Was ist die beste Zeit für ein Nickerchen und wie lange?",
          "answer": "Das beste Nickerchen-Fenster ist 13-15 Uhr, angepasst an das natürliche Nach-Mittag-Tief in Ihrem zirkadianen Rhythmus. Power-Nickerchen (10-20 Min) steigern die Aufmerksamkeit ohne Schlafträgheit — Sie wachen erfrischt auf. Vollzyklus-Nickerchen (90 Min) umfassen Tiefschlaf und REM, verbessern Gedächtnis und Kreativität, können aber Benommenheit verursachen, wenn unterbrochen. Vermeiden Sie Nickerchen nach 15 Uhr, da sie den nächtlichen Schlaf stören können. Wenn Sie täglich Nickerchen machen, bekommen Sie nicht genug nächtlichen Schlaf. Wölfe (Nachteulen) profitieren mehr von Nickerchen, weil soziale Zeitpläne ihr natürliches Schlaffenster einschränken."
        },
        {
          "question": "Warum beeinflusst Koffein meinen Schlaf noch 8 Stunden später?",
          "answer": "Koffein hat eine 5-6 Stunden Halbwertszeit, das bedeutet, wenn Sie um 14 Uhr Kaffee trinken, sind um 20 Uhr noch 50% des Koffeins in Ihrem System. Für empfindliche Personen beträgt die Viertel-Lebensdauer (75% eliminiert) 10-12 Stunden. Koffein blockiert Adenosin-Rezeptoren — Adenosin ist die Chemikalie, die Sie müde macht. Selbst wenn Sie sich 'gut fühlen' und einschlafen, reduziert Koffein Tiefschlaf (NREM 3) um 15-30% und sabotiert die Schlafqualität. Der Rechner empfiehlt Koffein-Stopps 8-12 Stunden vor dem Schlafengehen basierend auf Ihrer Aufnahme. Wenn Sie täglich 4+ Tassen trinken, erwägen Sie, 10-12 Stunden vor dem Schlafengehen aufzuhören."
        },
        {
          "question": "Ist es besser, weniger zu schlafen oder mitten im Zyklus aufzuwachen?",
          "answer": "Vollenden Sie immer vollständige Zyklen. Das Aufwachen mitten im Zyklus (besonders während NREM 3 oder REM) verursacht schwere Schlafträgheit und beeinträchtigt die kognitive Funktion für 30-60 Minuten. Wenn Sie zwischen 6 Stunden (4 vollständige Zyklen) oder 7 Stunden (4,67 Zyklen) wählen müssen, wählen Sie 6 Stunden. Die meisten Menschen fühlen sich bei 7,5 Stunden (5 Zyklen) besser als bei 8 Stunden (5,33 Zyklen). Allerdings liegen 4 Zyklen (6 Stunden) unter den empfohlenen 7-9 Stunden für Erwachsene. Kurzer Schlaf (<6 Stunden) erhöht chronisch das Risiko von Herz-Kreislauf-Erkrankungen, Fettleibigkeit und kognitivem Abbau. Verwenden Sie Zyklus-Timing für gelegentlichen kurzen Schlaf, nicht als langfristige Strategie."
        },
        {
          "question": "Wie beeinflusst Lichtexposition meinen Schlaf und zirkadianen Rhythmus?",
          "answer": "Licht ist der mächtigste zirkadiane Regulator. Morgenlicht (6-8 Uhr, 10.000 Lux) setzt Ihre zirkadiane Uhr zurück und verschiebt Ihre Schlafphase vor (macht Sie früher müde). Blaues Licht (450-480 nm) unterdrückt die Melatoninproduktion für 2-3 Stunden und verzögert den Schlafbeginn. Sonnenlicht im Freien hat 10.000-100.000 Lux; Innenbeleuchtung 300-500 Lux. Bekommen Sie 10-30 Min Licht im Freien innerhalb von 30 Min nach dem Aufwachen. Vermeiden Sie Bildschirme 45-60 Min vor dem Schlafengehen oder verwenden Sie blaulichtblockierende Brille. Für Nachteulen kann morgendliche Lichttherapie (10.000 Lux Lichtbox für 20-30 Min) Ihre Uhr allmählich früher verschieben."
        },
        {
          "question": "Warum empfiehlt der Rechner, 3 Stunden vor dem Schlafengehen zu essen?",
          "answer": "Verdauung erhöht Ihre Körpertemperatur und leitet Blutfluss zu Ihrem Verdauungssystem um. Schlafbeginn erfordert einen 1-2°C Abfall der Körpertemperatur. Große Mahlzeiten 3-4 Stunden vor dem Schlafengehen verhindern diesen Temperaturabfall und verzögern den Schlaf um 30-60 Minuten. Zusätzlich erhöht das Liegen mit vollem Magen das Risiko von saurem Reflux. Scharfe oder fettige Speisen können nächtliche Verdauungsbeschwerden verursachen. Ein leichter Snack (griechischer Joghurt, kleine Banane) 1 Stunde vor dem Schlafengehen ist OK und kann manchen Menschen beim Schlafen helfen. Vermeiden Sie Alkohol 3-4 Stunden vor dem Schlafengehen — er fragmentiert REM-Schlaf in der zweiten Nachthälfte."
        },
        {
          "question": "Was ist die 'Schlafqualitäts-Bewertung' und wie wird sie berechnet?",
          "answer": "Die Schlafqualitäts-Bewertung (0-100) kombiniert vier Faktoren: (1) Zyklus-Vollendung — empfohlene Zyklen für Ihr Alter bekommen (40 Punkte), (2) Chronotyp-Anpassung — zu Zeiten schlafen, die Ihrer genetischen Präferenz entsprechen (25 Punkte), (3) Schlafschuld — weniger Schuld = höhere Bewertung (20 Punkte), (4) Schlafhygiene — Koffein-Stopp, Bildschirm-Frist, Mahlzeiten-Timing (15 Punkte). Eine Bewertung von 85+ ist ausgezeichnet, 70-84 ist gut, 60-69 ist fair, unter 60 zeigt Verbesserungsmöglichkeiten an. Die Bewertung hilft Ihnen zu sehen, wie gut Ihr aktueller Plan mit optimalen Schlafpraktiken übereinstimmt. Es ist keine medizinische Diagnose, nur ein schnelles Bewertungswerkzeug."
        },
        {
          "question": "Kann ich mich dazu trainieren, weniger Schlaf zu brauchen?",
          "answer": "Nein. Die Idee, dass Sie sich dazu 'trainieren' können, 4-5 Stunden Schlaf zu brauchen, ist ein Mythos, der von schlafmangel-geplagten Überfliegern verbreitet wird. Erwachsene brauchen 7-9 Stunden pro Nacht (5-6 vollständige Zyklen). Weniger als 1% der Bevölkerung hat eine genetische Mutation (DEC2), die ihnen erlaubt, mit 6 Stunden zu funktionieren. Chronischer kurzer Schlaf (<7 Stunden) erhöht das Risiko von Herz-Kreislauf-Erkrankungen, Fettleibigkeit, Diabetes, Demenz und frühem Tod. Sie fühlen sich vielleicht bei 6 Stunden 'gut' wegen Adrenalin und Koffein, aber kognitive Tests zeigen beeinträchtigte Leistung entsprechend rechtlich betrunken zu sein. Schlaf ist nicht optional — da räumt Ihr Gehirn Giftstoffe ab, konsolidiert Erinnerungen und repariert Gewebe."
        },
        {
          "question": "Was soll ich tun, wenn ich nicht innerhalb von 20-30 Minuten einschlafen kann?",
          "answer": "Stehen Sie auf. Wach zu liegen und sich zu ärgern erzeugt eine negative Verbindung zwischen Ihrem Bett und Wachsein. Gehen Sie in einen anderen Raum, machen Sie eine langweilige Aktivität bei gedämpftem Licht (Papierbuch lesen, leichtes Dehnen, beruhigende Musik hören) und kehren Sie nur ins Bett zurück, wenn Sie sich schläfrig fühlen. Das nennt sich Stimulus-Kontroll-Therapie. Prüfen Sie auch: Hatten Sie 8+ Stunden vor dem Schlafengehen Koffein? Haben Sie spät Sport gemacht? Ist Ihr Zimmer kühl (15-19°C), dunkel und ruhig? Haben Sie in der letzten Stunde auf Bildschirme geschaut? Sind Sie gestresst oder ängstlich? Wenn Sie 3+ Nächte pro Woche für 3+ Monate >30 Min zum Einschlafen brauchen, suchen Sie einen Schlafspezialisten auf — Sie haben möglicherweise Schlaflosigkeit oder eine andere Schlafstörung."
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
