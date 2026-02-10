import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ═══════════════════════════════════════════════════════════════════
// HEART RATE ZONES CALCULATOR V4
// Karvonen + LTHR + 4 MaxHR formulas + sport-specific adjustments
// + gender fat burn zones + calorie estimates + RHR fitness assessment
// ═══════════════════════════════════════════════════════════════════

export const heartRateZonesCalculatorConfig: CalculatorConfigV4 = {
  id: "heart-rate-zones",
  version: "4.0",
  category: "health",
  icon: "❤️",

  // ═══════════════════════════════════════════════════════════════════
  // PRESETS
  // ═══════════════════════════════════════════════════════════════════
  presets: [
    {
      id: "beginner",
      icon: "🚶",
      values: {        gender: "male",
        age: 35,
        restingHR: 75,
        knowsMaxHR: "no",
        maxHRFormula: "tanaka",
        knowsLTHR: "no",
        sport: "general",
      },
    },
    {
      id: "weekendRunner",
      icon: "🏃",
      values: {        gender: "female",
        age: 30,
        restingHR: 65,
        knowsMaxHR: "no",
        maxHRFormula: "tanaka",
        knowsLTHR: "no",
        sport: "running",
      },
    },
    {
      id: "seriousRunner",
      icon: "🥇",
      values: {        gender: "male",
        age: 28,
        restingHR: 52,
        knowsMaxHR: "no",
        maxHRFormula: "tanaka",
        knowsLTHR: "no",
        weight: 72,
        sport: "running",
      },
    },
    {
      id: "eliteCyclist",
      icon: "🚴",
      values: {        gender: "male",
        age: 32,
        restingHR: 46,
        knowsMaxHR: "yes",
        maxHR: 192,
        knowsLTHR: "yes",
        lactateThresholdHR: 172,
        weight: 68,
        sport: "cycling",
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // TRANSLATIONS (EN only)
  // ═══════════════════════════════════════════════════════════════════
  t: {
    en: {
      name: "Heart Rate Zones Calculator",
      slug: "heart-rate-zones-calculator",
      subtitle: "Get personalized training zones using Karvonen, LTHR, or 4 different MaxHR formulas — with sport-specific adjustments, fat burn zones, and calorie estimates",
      breadcrumb: "Heart Rate Zones",

      // ─── SEO ───────────────────────────────────────────────────
      seo: {
        title: "Heart Rate Zones Calculator — Karvonen, LTHR & Multi-Formula",
        description: "Calculate your 5 personalized heart rate training zones using Karvonen, lactate threshold, or 4 MaxHR formulas. Includes sport-specific adjustments for running, cycling, and swimming plus calorie burn estimates and 80/20 training split.",
        shortDescription: "Personalized training zones with multiple scientific methods",
        keywords: [
          "heart rate zone calculator",
          "heart rate training zones",
          "Karvonen formula calculator",
          "target heart rate calculator",
          "HR zone calculator running",
          "cycling heart rate zones",
          "fat burning heart rate zone",
          "80/20 training zones",
        ],
      },

      // ─── UI ────────────────────────────────────────────────────
      calculator: { yourInformation: "Your Information" },
      ui: {
        yourInformation: "Your Information",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      // ─── INPUTS ────────────────────────────────────────────────
      inputs: {
        gender: {
          label: "Gender",
          helpText: "Affects fat burning zone calculation and RHR assessment",
          options: { male: "Male", female: "Female" },
        },
        age: {
          label: "Age",
          helpText: "Used to estimate max heart rate if not measured",
        },
        restingHR: {
          label: "Resting Heart Rate",
          helpText: "Measure first thing in the morning before getting out of bed (enables Karvonen method)",
        },
        knowsMaxHR: {
          label: "Do you know your max heart rate?",
          helpText: "A measured max HR from a stress test or all-out effort is more accurate than formulas",
          options: { no: "No, estimate it", yes: "Yes, I've tested it" },
        },
        maxHR: {
          label: "Max Heart Rate",
          helpText: "Enter the highest heart rate recorded during an all-out effort or stress test",
        },
        maxHRFormula: {
          label: "Estimation Formula",
          helpText: "Tanaka (2001) is generally more accurate than the classic 220-age",
          options: {
            fox: "Fox: 220 − age (classic)",
            tanaka: "Tanaka: 208 − 0.7 × age (recommended)",
            gellish: "Gellish: 206.9 − 0.67 × age",
            nes: "Nes: 211 − 0.64 × age",
          },
        },
        knowsLTHR: {
          label: "Do you know your lactate threshold HR?",
          helpText: "LTHR-based zones (Friel method) are the most precise for trained athletes",
          options: { no: "No", yes: "Yes, I've tested it" },
        },
        lactateThresholdHR: {
          label: "Lactate Threshold Heart Rate",
          helpText: "Determined from a 30-minute time trial or lab test — average HR of the last 20 minutes",
        },
        sport: {
          label: "Primary Sport",
          helpText: "Cycling zones are ~5 bpm lower than running; swimming ~10 bpm lower",
          options: {
            general: "General Fitness",
            running: "Running",
            cycling: "Cycling (−5 bpm offset)",
            swimming: "Swimming (−10 bpm offset)",
          },
        },
        weight: {
          label: "Weight (optional)",
          helpText: "Enter your weight to see estimated calories burned per zone",
        },
      },

      // ─── INPUT GROUPS ──────────────────────────────────────────
      inputGroups: {},

      // ─── RESULTS ───────────────────────────────────────────────
      results: {
        maxHR: { label: "Max Heart Rate" },
        zone1: { label: "Zone 1 — Recovery" },
        zone2: { label: "Zone 2 — Endurance" },
        zone3: { label: "Zone 3 — Tempo" },
        zone4: { label: "Zone 4 — Threshold" },
        zone5: { label: "Zone 5 — VO2 Max" },
        fatBurnZone: { label: "Fat Burn Zone" },
        rhrAssessment: { label: "Resting HR Fitness" },
        heartRateReserve: { label: "Heart Rate Reserve" },
        eightyTwentyCutoff: { label: "80/20 Training Split" },
      },

      // ─── TOOLTIPS ──────────────────────────────────────────────
      tooltips: {
        maxHR: "The highest heart rate your heart can safely achieve during all-out exertion",
        zone1: "Light effort — recovery runs, warm-up, cool-down. You can sing comfortably",
        zone2: "Moderate effort — the aerobic base zone. You can talk easily. Most training should be here",
        zone3: "Moderately hard — tempo pace. Short sentences only. Builds speed and lactate tolerance",
        zone4: "Hard effort — at or near lactate threshold. Only a few words. Improves maximum sustained pace",
        zone5: "Maximum effort — VO2 max intervals. Cannot talk. Sustainable for 1–5 minutes only",
        fatBurnZone: "The heart rate range where your body burns the highest percentage of calories from fat",
        rhrAssessment: "How your resting heart rate compares to population norms — lower generally means fitter",
        heartRateReserve: "The difference between your max HR and resting HR — used in the Karvonen formula",
        eightyTwentyCutoff: "The HR above which only 20% of your weekly training volume should occur",
      },

      // ─── PRESETS ───────────────────────────────────────────────
      presets: {
        beginner: {
          label: "Beginner",
          description: "New to exercise, 35 yrs, RHR 75, general fitness",
        },
        weekendRunner: {
          label: "Weekend Runner",
          description: "Recreational runner, 30 yrs, RHR 65",
        },
        seriousRunner: {
          label: "Serious Runner",
          description: "Structured training, 28 yrs, RHR 52",
        },
        eliteCyclist: {
          label: "Elite Cyclist",
          description: "Competitive cyclist, 32 yrs, RHR 46, known LTHR",
        },
      },

      // ─── VALUES (dynamic translations) ─────────────────────────
      values: {
        "bpm": "bpm",
        "cal/min": "cal/min",
        "N/A": "N/A",
        "Measured": "Measured",
        "Fox (220−age)": "Fox (220−age)",
        "Tanaka": "Tanaka",
        "Gellish": "Gellish",
        "Nes": "Nes",
        "Karvonen (HRR)": "Karvonen (HRR)",
        "%MaxHR": "%MaxHR",
        "LTHR (Friel)": "LTHR (Friel)",
        "Recovery": "Recovery",
        "Endurance": "Endurance",
        "Tempo": "Tempo",
        "Threshold": "Threshold",
        "VO2 Max": "VO2 Max",
        "Athlete": "Athlete",
        "Excellent": "Excellent",
        "Good": "Good",
        "Average": "Average",
        "Below Average": "Below Average",
        "Poor": "Poor",
        "below": "below",
        "above": "above",
        "Can sing": "Can sing",
        "Can talk easily": "Can talk easily",
        "Short sentences": "Short sentences",
        "Few words only": "Few words only",
        "Cannot talk": "Cannot talk",
      },

      // ─── FORMATS ───────────────────────────────────────────────
      formats: {
        summary: "Max HR: {maxHR} bpm ({formula}). Zone 2 (endurance): {z2Low}–{z2High} bpm. Fat burn: {fatLow}–{fatHigh} bpm. 80/20 cutoff: {cutoff} bpm. Method: {method}.",
      },

      // ─── CHART ──────────────────────────────────────────────────
      chart: {
        title: "Heart Rate Zone Ranges",
        xLabel: "Zone",
        yLabel: "Heart Rate (bpm)",
        series: {
          base: "",
          z1Range: "Z1 Recovery",
          z2Range: "Z2 Endurance",
          z3Range: "Z3 Tempo",
          z4Range: "Z4 Threshold",
          z5Range: "Z5 VO2 Max",
        },
      },

      // ─── INFO CARDS ────────────────────────────────────────────
      infoCards: {
        zones: {
          title: "🏃 Your Training Zones",
        },
        insights: {
          title: "📊 Fitness Insights",
        },
        tips: {
          title: "💡 Training Tips",
          items: [
            "Do 80% of your weekly training in Zone 1–2 and only 20% in Zone 3–5 for optimal gains",
            "Measure resting HR first thing in the morning for 3 days and use the average for best accuracy",
            "Heart rate zones differ between sports — cycling zones are 5–8 bpm lower than running zones",
            "If you take beta blockers or other HR-affecting medication, use RPE (perceived effort) instead of HR zones",
          ],
        },
      },

      // ─── REFERENCE DATA (empty per V4) ─────────────────────────
      referenceData: {},

      // ─── EDUCATION ─────────────────────────────────────────────
      education: {
        whatAre: {
          title: "What Are Heart Rate Training Zones?",
          content: "Heart rate training zones are ranges of heartbeats per minute that correspond to different exercise intensities and physiological responses. By training within specific zones, you can target precise adaptations — from building aerobic endurance to improving your VO2 max. The most widely used model divides effort into five zones: Zone 1 (50–60% intensity) for recovery, Zone 2 (60–70%) for aerobic base building and fat burning, Zone 3 (70–80%) for tempo and lactate tolerance, Zone 4 (80–90%) for threshold training, and Zone 5 (90–100%) for VO2 max intervals. Research consistently shows that athletes who train with heart rate monitoring improve faster and reduce injury risk because they avoid the common mistake of going too hard on easy days and too easy on hard days. The key insight that transformed endurance training is the 80/20 rule: approximately 80% of training volume should occur in Zones 1–2 (below the ventilatory threshold), while only 20% should be in Zones 3–5. This polarized approach, validated by decades of research on elite endurance athletes, produces superior adaptations compared to spending most training time at moderate intensity.",
        },
        methods: {
          title: "Karvonen vs Simple Percentage vs LTHR Methods",
          content: "There are three primary approaches to calculating heart rate zones, each with different accuracy levels. The simplest method multiplies your estimated max heart rate by zone percentages (e.g., Zone 2 = 60–70% of MaxHR). This is easy but imprecise because it ignores individual fitness. The Karvonen method, developed by Finnish physiologist Martti Karvonen in 1957, is more accurate because it uses your heart rate reserve (HRR = MaxHR − Resting HR) to calculate zones: Target HR = (HRR × %intensity) + Resting HR. By incorporating resting heart rate, the Karvonen formula accounts for individual cardiovascular fitness — a trained athlete with a resting HR of 45 bpm gets very different zones than a beginner at 78 bpm, even if both have the same max HR. The most precise method uses your lactate threshold heart rate (LTHR), determined through a 30-minute time trial or lab test. The Friel method calculates all zones as percentages of LTHR, which directly represents the physiological boundary between sustainable aerobic effort and unsustainable anaerobic effort. For competitive athletes, LTHR-based zones are the gold standard because they align zones with actual metabolic thresholds rather than estimated percentages.",
        },
        howToMeasure: {
          title: "How to Measure Your Heart Rate Accurately",
          items: [
            { text: "Resting HR: Measure first thing in the morning before getting out of bed — count beats for 60 full seconds or use a chest strap monitor for 3 consecutive mornings and average the results", type: "info" },
            { text: "Max HR test: After a thorough warm-up, run up a steep hill for 2–3 minutes at maximum effort, recover, repeat twice — the highest reading is your approximate max HR", type: "info" },
            { text: "LTHR test: Warm up for 10 minutes, then do a 30-minute solo time trial at maximum sustainable effort — your average HR for the last 20 minutes is your LTHR", type: "info" },
            { text: "Use a chest strap heart rate monitor for testing — wrist-based optical sensors can be inaccurate by 5–15 bpm during high-intensity exercise", type: "warning" },
            { text: "Do not use the 220-minus-age formula as gospel — it has a standard deviation of ±10–12 bpm, meaning your true max could be 20+ bpm different from the estimate", type: "warning" },
            { text: "Retest every 6–8 weeks during training blocks — both resting HR and lactate threshold change as fitness improves, so zones should be updated accordingly", type: "info" },
          ],
        },
        zoneBenefits: {
          title: "Training Benefits by Zone",
          items: [
            { text: "Zone 1 (Recovery): Promotes blood flow for muscle repair, reduces cortisol, and supports active recovery between hard sessions — heart can strengthen without stress", type: "info" },
            { text: "Zone 2 (Endurance): Builds aerobic base, increases mitochondrial density, improves fat oxidation efficiency, and enhances capillary networks in muscles — the foundation of all endurance performance", type: "info" },
            { text: "Zone 3 (Tempo): Improves lactate clearance rate, increases cardiac stroke volume, and develops the ability to sustain moderately hard efforts for extended periods", type: "info" },
            { text: "Zone 4 (Threshold): Raises lactate threshold so you can sustain higher intensities before fatiguing — critical for race performance and time trial ability", type: "info" },
            { text: "Zone 5 (VO2 Max): Maximizes oxygen uptake capacity, improves cardiac output, and develops the ability to produce power at maximum aerobic intensity — essential for intervals and finishing kicks", type: "warning" },
            { text: "Fat Burn Zone: Training at 55–75% of MaxHR burns the highest percentage of calories from fat stores, but total calorie burn is lower than higher zones — both approaches contribute to body composition goals", type: "info" },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step zone calculations using different methods",
          examples: [
            {
              title: "Karvonen Method — 30yo Runner",
              steps: [
                "Age: 30, Resting HR: 60 bpm",
                "MaxHR (Tanaka): 208 − (0.7 × 30) = 187 bpm",
                "Heart Rate Reserve: 187 − 60 = 127 bpm",
                "Zone 2 low: (127 × 0.60) + 60 = 136 bpm",
                "Zone 2 high: (127 × 0.70) + 60 = 149 bpm",
                "Zone 2 range: 136–149 bpm (Endurance)",
              ],
              result: "Zone 2: 136–149 bpm — Easy conversational pace",
            },
            {
              title: "LTHR Method — Competitive Cyclist",
              steps: [
                "Lactate Threshold HR: 170 bpm (from 30-min TT)",
                "Zone 1: 170 × 0.68–0.83 = 116–141 bpm",
                "Zone 2: 170 × 0.84–0.89 = 143–151 bpm",
                "Zone 4: 170 × 0.96–1.00 = 163–170 bpm",
                "Sport offset for cycling: −5 bpm",
                "Adjusted Zone 4: 158–165 bpm",
              ],
              result: "Zone 4: 158–165 bpm — Threshold intervals on the bike",
            },
          ],
        },
      },

      // ─── FAQS ──────────────────────────────────────────────────
      faqs: [
        {
          question: "Which max heart rate formula is most accurate?",
          answer: "The Tanaka formula (208 − 0.7 × age) has been shown to be more accurate across a wider age range than the classic Fox formula (220 − age), which was never based on original research and has a standard deviation of ±10–12 bpm. The Gellish and Nes formulas offer similar accuracy to Tanaka. However, all age-based formulas are estimates — the only truly accurate way to know your max HR is through a maximal effort test supervised by a professional.",
        },
        {
          question: "What is the Karvonen formula and why is it better?",
          answer: "The Karvonen formula calculates target heart rate as: THR = ((MaxHR − RestingHR) × %intensity) + RestingHR. It is more accurate than simple percentage-of-max methods because it accounts for your individual cardiovascular fitness through resting heart rate. A fit athlete with a resting HR of 45 gets different, more appropriate zones than a sedentary person with a resting HR of 80, even at the same age.",
        },
        {
          question: "Why are my cycling zones lower than my running zones?",
          answer: "During cycling, you use less muscle mass than running (primarily legs vs. full body), your body weight is supported by the bike, and the seated position reduces venous return demands. This means your heart doesn't need to work as hard at equivalent effort levels. Research shows cycling heart rates are typically 5–8 bpm lower than running at the same perceived effort, which is why this calculator applies a sport-specific offset.",
        },
        {
          question: "What is the 80/20 rule in heart rate training?",
          answer: "The 80/20 rule states that approximately 80% of your training time should be spent in low-intensity zones (Zone 1–2, below ventilatory threshold) and only 20% in high-intensity zones (Zone 3–5). This polarized approach has been validated by research on elite endurance athletes and consistently produces better performance improvements than training mostly at moderate intensity. The calculator shows your 80/20 cutoff heart rate.",
        },
        {
          question: "What is a good resting heart rate?",
          answer: "For adults, a resting heart rate between 60–100 bpm is considered normal. However, fitter individuals typically have lower resting rates: 60–69 bpm is good, 50–59 bpm is excellent, and below 50 bpm is typical of well-trained athletes. A decreasing resting heart rate over weeks of training is one of the clearest signs of improving cardiovascular fitness. Conversely, a resting HR elevated 5+ bpm above normal on a given morning can indicate incomplete recovery or illness.",
        },
        {
          question: "Is the fat burning zone really the best for weight loss?",
          answer: "It's nuanced. Training in the fat burning zone (55–75% MaxHR) does burn a higher percentage of calories from fat. However, higher-intensity exercise burns more total calories per minute, including more absolute grams of fat. For weight loss, total calorie expenditure matters more than fuel source. The best approach combines Zone 2 training (sustainable, builds aerobic base) with occasional higher-intensity sessions (boosts metabolism and EPOC — excess post-exercise oxygen consumption).",
        },
        {
          question: "How do I know my lactate threshold heart rate?",
          answer: "The simplest field test is a 30-minute solo time trial at the maximum pace you can sustain evenly. After a 10-minute warm-up, start your watch and go as hard as you can maintain for 30 minutes. Your average heart rate for the last 20 minutes of the effort approximates your LTHR. For more accurate results, a lab-based lactate test with blood sampling at increasing intensities is the gold standard.",
        },
        {
          question: "Should I adjust zones if I take beta blockers?",
          answer: "Yes. Beta blockers lower your maximum heart rate and resting heart rate, making standard HR zone calculations inaccurate. If you take beta blockers or other heart rate-affecting medications, consult your physician for guidance. You may want to use Rate of Perceived Exertion (RPE) as your primary intensity guide instead: Zone 1 feels like a 2–3/10, Zone 2 is 4–5/10, Zone 3 is 6–7/10, Zone 4 is 8/10, and Zone 5 is 9–10/10.",
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

      share: { calculatedWith: "Calculated with Kalcufy.com" },

      accessibility: {
        mobileResults: "Results summary",
        closeModal: "Close",
        openMenu: "Open menu",
      },

      sources: { title: "Sources & References" },
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════════
  inputs: [
        {
      id: "gender",
      type: "radio",
      defaultValue: "male",
      options: [{ value: "male" }, { value: "female" }],
    },
    {
      id: "age",
      type: "number",
      defaultValue: 30,
      min: 15,
      max: 100,
      step: 1,
      suffix: "years",
    },
    {
      id: "restingHR",
      type: "number",
      defaultValue: null,
      placeholder: "e.g. 65",
      min: 28,
      max: 120,
      step: 1,
      suffix: "bpm",
    },
    {
      id: "knowsMaxHR",
      type: "radio",
      defaultValue: "no",
      options: [{ value: "no" }, { value: "yes" }],
    },
    {
      id: "maxHR",
      type: "number",
      defaultValue: null,
      placeholder: "e.g. 190",
      min: 100,
      max: 230,
      step: 1,
      suffix: "bpm",
      showWhen: { field: "knowsMaxHR", value: "yes" },
    },
    {
      id: "maxHRFormula",
      type: "select",
      defaultValue: "tanaka",
      options: [
        { value: "fox" },
        { value: "tanaka" },
        { value: "gellish" },
        { value: "nes" },
      ],
      showWhen: { field: "knowsMaxHR", value: "no" },
    },
    {
      id: "knowsLTHR",
      type: "radio",
      defaultValue: "no",
      options: [{ value: "no" }, { value: "yes" }],
    },
    {
      id: "lactateThresholdHR",
      type: "number",
      defaultValue: null,
      placeholder: "e.g. 168",
      min: 80,
      max: 215,
      step: 1,
      suffix: "bpm",
      showWhen: { field: "knowsLTHR", value: "yes" },
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
    },        {
      id: "sport",
      type: "select",
      defaultValue: "running",
      options: [
        { value: "general" },
        { value: "running" },
        { value: "cycling" },
        { value: "swimming" },
      ],
    },
  ],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════════
  results: [
    { id: "maxHR", type: "primary", format: "number" },
    { id: "zone1", type: "secondary", format: "text" },
    { id: "zone2", type: "secondary", format: "text" },
    { id: "zone3", type: "secondary", format: "text" },
    { id: "zone4", type: "secondary", format: "text" },
    { id: "zone5", type: "secondary", format: "text" },
    { id: "fatBurnZone", type: "secondary", format: "text" },
    { id: "rhrAssessment", type: "secondary", format: "text" },
    { id: "heartRateReserve", type: "secondary", format: "text" },
    { id: "eightyTwentyCutoff", type: "secondary", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // INFO CARDS (2 list + 1 horizontal tips)
  // ═══════════════════════════════════════════════════════════════════
  infoCards: [
    {
      id: "zones",
      type: "list",
      icon: "🏃",
      items: [
        { label: "Zone 1 (Recovery)", valueKey: "zone1" },
        { label: "Zone 2 (Endurance)", valueKey: "zone2" },
        { label: "Zone 3 (Tempo)", valueKey: "zone3" },
        { label: "Zone 4 (Threshold)", valueKey: "zone4" },
        { label: "Zone 5 (VO2 Max)", valueKey: "zone5" },
      ],
    },
    {
      id: "insights",
      type: "list",
      icon: "📊",
      items: [
        { label: "Max Heart Rate", valueKey: "maxHR" },
        { label: "Heart Rate Reserve", valueKey: "heartRateReserve" },
        { label: "Fat Burn Zone", valueKey: "fatBurnZone" },
        { label: "Resting HR Fitness", valueKey: "rhrAssessment" },
        { label: "80/20 Split", valueKey: "eightyTwentyCutoff" },
      ],
    },
    {
      id: "tips",
      type: "horizontal",
      icon: "💡",
      itemCount: 4,
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // REFERENCE DATA (empty per V4)
  // ═══════════════════════════════════════════════════════════════════
  referenceData: [],

  // ═══════════════════════════════════════════════════════════════════
  // CHART — Zone Ranges (stacked bar with invisible base)
  // ═══════════════════════════════════════════════════════════════════
  chart: {
    id: "zoneRanges",
    type: "composed",
    xKey: "zone",
    stacked: true,
    height: 320,
    showGrid: true,
    showLegend: false,
    showTooltip: true,
    yAxisFormat: "number",
    series: [
      { key: "base", type: "bar", stackId: "zones", color: "transparent" },
      { key: "z1Range", type: "bar", stackId: "zones", color: "#94a3b8" },
      { key: "z2Range", type: "bar", stackId: "zones", color: "#3b82f6" },
      { key: "z3Range", type: "bar", stackId: "zones", color: "#10b981" },
      { key: "z4Range", type: "bar", stackId: "zones", color: "#f59e0b" },
      { key: "z5Range", type: "bar", stackId: "zones", color: "#ef4444" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS (2 prose + 2 list + 1 code-example)
  // ═══════════════════════════════════════════════════════════════════
  educationSections: [
    { id: "whatAre", type: "prose", icon: "📖" },
    { id: "methods", type: "prose", icon: "⚖️" },
    { id: "howToMeasure", type: "list", icon: "📐", itemCount: 6 },
    { id: "zoneBenefits", type: "list", icon: "🎯", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // FAQS
  // ═══════════════════════════════════════════════════════════════════
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

  // ═══════════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════════
  references: [
    {
      authors: "Karvonen MJ, Kentala E, Mustala O",
      year: "1957",
      title: "The effects of training on heart rate: a longitudinal study",
      source: "Annales Medicinae Experimentalis et Biologiae Fenniae, 35(3), 307-315",
      url: "https://pubmed.ncbi.nlm.nih.gov/13470504/",
    },
    {
      authors: "Tanaka H, Monahan KD, Seals DR",
      year: "2001",
      title: "Age-predicted maximal heart rate revisited",
      source: "Journal of the American College of Cardiology, 37(1), 153-156",
      url: "https://pubmed.ncbi.nlm.nih.gov/11153730/",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // ADDITIONAL CONFIG
  // ═══════════════════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════════════
export function calculateHeartRateZones(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;

  // ── Translations ──────────────────────────────────────────────────
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read inputs ───────────────────────────────────────────────────
  const gender = values.gender as string;
  const age = values.age as number;
  const restingHR = values.restingHR as number | null;
  const knowsMaxHR = values.knowsMaxHR as string;
  const customMaxHR = values.maxHR as number | null;
  const formulaId = values.maxHRFormula as string;
  const knowsLTHR = values.knowsLTHR as string;
  const lthr = values.lactateThresholdHR as number | null;
  const sport = values.sport as string;

  if (!age || age < 15) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── 1. Determine Max Heart Rate ───────────────────────────────────
  let maxHR: number;
  let formulaNameRaw: string;

  if (knowsMaxHR === "yes" && customMaxHR && customMaxHR > 0) {
    maxHR = customMaxHR;
    formulaNameRaw = "Measured";
  } else {
    switch (formulaId) {
      case "fox":
        maxHR = 220 - age;
        formulaNameRaw = "Fox (220−age)";
        break;
      case "gellish":
        maxHR = Math.round(206.9 - 0.67 * age);
        formulaNameRaw = "Gellish";
        break;
      case "nes":
        maxHR = Math.round(211 - 0.64 * age);
        formulaNameRaw = "Nes";
        break;
      case "tanaka":
      default:
        maxHR = Math.round(208 - 0.7 * age);
        formulaNameRaw = "Tanaka";
        break;
    }
  }

  const formulaName = v[formulaNameRaw] || formulaNameRaw;

  // ── 2. Calculate zones ────────────────────────────────────────────
  type ZoneRange = { low: number; high: number };
  let zones: ZoneRange[];
  let methodRaw: string;

  if (knowsLTHR === "yes" && lthr && lthr > 0) {
    // Friel LTHR-based zones
    methodRaw = "LTHR (Friel)";
    zones = [
      { low: Math.round(lthr * 0.68), high: Math.round(lthr * 0.83) },
      { low: Math.round(lthr * 0.84), high: Math.round(lthr * 0.89) },
      { low: Math.round(lthr * 0.90), high: Math.round(lthr * 0.95) },
      { low: Math.round(lthr * 0.96), high: Math.round(lthr * 1.00) },
      { low: Math.round(lthr * 1.01), high: Math.round(lthr * 1.10) },
    ];
  } else if (restingHR && restingHR > 0) {
    // Karvonen (Heart Rate Reserve) method
    methodRaw = "Karvonen (HRR)";
    const hrr = maxHR - restingHR;
    zones = [
      { low: Math.round(hrr * 0.50 + restingHR), high: Math.round(hrr * 0.60 + restingHR) },
      { low: Math.round(hrr * 0.60 + restingHR), high: Math.round(hrr * 0.70 + restingHR) },
      { low: Math.round(hrr * 0.70 + restingHR), high: Math.round(hrr * 0.80 + restingHR) },
      { low: Math.round(hrr * 0.80 + restingHR), high: Math.round(hrr * 0.90 + restingHR) },
      { low: Math.round(hrr * 0.90 + restingHR), high: maxHR },
    ];
  } else {
    // Simple %MaxHR method
    methodRaw = "%MaxHR";
    zones = [
      { low: Math.round(maxHR * 0.50), high: Math.round(maxHR * 0.60) },
      { low: Math.round(maxHR * 0.60), high: Math.round(maxHR * 0.70) },
      { low: Math.round(maxHR * 0.70), high: Math.round(maxHR * 0.80) },
      { low: Math.round(maxHR * 0.80), high: Math.round(maxHR * 0.90) },
      { low: Math.round(maxHR * 0.90), high: maxHR },
    ];
  }

  const method = v[methodRaw] || methodRaw;

  // ── 3. Sport-specific offset ──────────────────────────────────────
  let sportOffset = 0;
  if (sport === "cycling") sportOffset = -5;
  else if (sport === "swimming") sportOffset = -10;

  if (sportOffset !== 0) {
    zones = zones.map((z) => ({
      low: z.low + sportOffset,
      high: z.high + sportOffset,
    }));
  }

  // ── 4. Fat burn zone (gender-specific) ────────────────────────────
  let fatLow: number;
  let fatHigh: number;
  if (gender === "female") {
    fatLow = Math.round(maxHR * 0.55) + sportOffset;
    fatHigh = Math.round(maxHR * 0.70) + sportOffset;
  } else {
    fatLow = Math.round(maxHR * 0.60) + sportOffset;
    fatHigh = Math.round(maxHR * 0.75) + sportOffset;
  }

  // ── 5. Heart Rate Reserve ─────────────────────────────────────────
  const hrr = restingHR && restingHR > 0 ? maxHR - restingHR : null;

  // ── 6. Resting HR fitness assessment ──────────────────────────────
  let rhrAssessmentRaw = "N/A";
  if (restingHR && restingHR > 0) {
    if (restingHR < 50) rhrAssessmentRaw = "Athlete";
    else if (restingHR < 60) rhrAssessmentRaw = "Excellent";
    else if (restingHR < 70) rhrAssessmentRaw = "Good";
    else if (restingHR < 80) rhrAssessmentRaw = "Average";
    else if (restingHR < 90) rhrAssessmentRaw = "Below Average";
    else rhrAssessmentRaw = "Poor";
  }
  const rhrAssessment = v[rhrAssessmentRaw] || rhrAssessmentRaw;

  // ── 7. Calorie burn per zone (if weight provided) ─────────────────
  let weightKg: number | null = null;
  const rawWeight = values.weight as number | null;
  if (rawWeight && rawWeight > 0) {
    weightKg = convertToBase(rawWeight, fieldUnits.weight || "lbs", "weight");
  }

  // MET-based estimates: cal/min = METs × 3.5 × weightKg / 200
  const metsByZone = [3.5, 5.5, 8.0, 10.5, 13.0];
  let calsPerMin: number[] = [];
  if (weightKg) {
    calsPerMin = metsByZone.map(
      (met) => Math.round((met * 3.5 * weightKg!) / 200 * 10) / 10
    );
  }

  // ── 8. 80/20 cutoff ──────────────────────────────────────────────
  const eightyTwentyCutoff = zones[1].high;

  // ── Format outputs ────────────────────────────────────────────────
  const bpmLabel = v["bpm"] || "bpm";
  const calMinLabel = v["cal/min"] || "cal/min";
  const naLabel = v["N/A"] || "N/A";
  const belowLabel = v["below"] || "below";
  const aboveLabel = v["above"] || "above";

  const zoneNames = [
    v["Recovery"] || "Recovery",
    v["Endurance"] || "Endurance",
    v["Tempo"] || "Tempo",
    v["Threshold"] || "Threshold",
    v["VO2 Max"] || "VO2 Max",
  ];

  const rpeLabels = [
    v["Can sing"] || "Can sing",
    v["Can talk easily"] || "Can talk easily",
    v["Short sentences"] || "Short sentences",
    v["Few words only"] || "Few words only",
    v["Cannot talk"] || "Cannot talk",
  ];

  const formatZone = (z: ZoneRange, idx: number): string => {
    let str = `${z.low}–${z.high} ${bpmLabel}`;
    if (calsPerMin.length > 0) {
      str += ` (~${calsPerMin[idx]} ${calMinLabel})`;
    }
    return str;
  };

  const maxHRFormatted = `${maxHR} ${bpmLabel} (${formulaName})`;
  const fatBurnFormatted = `${fatLow}–${fatHigh} ${bpmLabel}`;
  const hrrFormatted = hrr ? `${hrr} ${bpmLabel}` : naLabel;
  const rhrFormatted = restingHR
    ? `${rhrAssessment} (${restingHR} ${bpmLabel})`
    : naLabel;
  const cutoffFormatted = `80% ${belowLabel} ${eightyTwentyCutoff} ${bpmLabel}, 20% ${aboveLabel}`;

  // ── Build summary ─────────────────────────────────────────────────
  const summaryTemplate =
    f.summary ||
    "Max HR: {maxHR} bpm ({formula}). Zone 2 (endurance): {z2Low}–{z2High} bpm. Fat burn: {fatLow}–{fatHigh} bpm. 80/20 cutoff: {cutoff} bpm. Method: {method}.";

  const summary = summaryTemplate
    .replace("{maxHR}", String(maxHR))
    .replace("{formula}", formulaName)
    .replace("{z2Low}", String(zones[1].low))
    .replace("{z2High}", String(zones[1].high))
    .replace("{fatLow}", String(fatLow))
    .replace("{fatHigh}", String(fatHigh))
    .replace("{cutoff}", String(eightyTwentyCutoff))
    .replace("{method}", method);

  // ── Build chart data (zone range stacked bars) ────────────────
  const chartZoneLabels = [
    `Z1 ${zoneNames[0]}`,
    `Z2 ${zoneNames[1]}`,
    `Z3 ${zoneNames[2]}`,
    `Z4 ${zoneNames[3]}`,
    `Z5 ${zoneNames[4]}`,
  ];
  const chartData = zones.map((z, i) => ({
    zone: chartZoneLabels[i],
    base: z.low,
    z1Range: i === 0 ? z.high - z.low : 0,
    z2Range: i === 1 ? z.high - z.low : 0,
    z3Range: i === 2 ? z.high - z.low : 0,
    z4Range: i === 3 ? z.high - z.low : 0,
    z5Range: i === 4 ? z.high - z.low : 0,
    // Extra data for tooltip
    low: z.low,
    high: z.high,
    rpe: rpeLabels[i],
  }));

  return {
    values: {
      maxHR,
      zone1: zones[0].low,
      zone2: zones[1].low,
      zone3: zones[2].low,
      zone4: zones[3].low,
      zone5: zones[4].low,
      fatBurnZone: fatLow,
      rhrAssessment: rhrAssessmentRaw,
      heartRateReserve: hrr || 0,
      eightyTwentyCutoff,
    },
    formatted: {
      maxHR: maxHRFormatted,
      zone1: formatZone(zones[0], 0),
      zone2: formatZone(zones[1], 1),
      zone3: formatZone(zones[2], 2),
      zone4: formatZone(zones[3], 3),
      zone5: formatZone(zones[4], 4),
      fatBurnZone: fatBurnFormatted,
      rhrAssessment: rhrFormatted,
      heartRateReserve: hrrFormatted,
      eightyTwentyCutoff: cutoffFormatted,
    },
    metadata: {
      chartData,
    },
    summary,
    isValid: true,
  };
}

export default heartRateZonesCalculatorConfig;
