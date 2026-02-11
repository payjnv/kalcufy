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
    es: {
      "name": "Calculadora de Zonas de Frecuencia Cardíaca",
      "slug": "calculadora-zonas-frecuencia-cardiaca",
      "subtitle": "Obtén zonas de entrenamiento personalizadas usando Karvonen, LTHR, o 4 fórmulas diferentes de FC máxima — con ajustes específicos por deporte, zonas de quema de grasa y estimaciones de calorías",
      "breadcrumb": "Zonas de Frecuencia Cardíaca",
      "seo": {
        "title": "Calculadora de Zonas de Frecuencia Cardíaca — Karvonen, LTHR y Múltiples Fórmulas",
        "description": "Calcula tus 5 zonas de entrenamiento personalizadas de frecuencia cardíaca usando Karvonen, umbral de lactato, o 4 fórmulas de FC máxima. Incluye ajustes específicos para running, ciclismo y natación más estimaciones de quema de calorías y distribución de entrenamiento 80/20.",
        "shortDescription": "Zonas de entrenamiento personalizadas con múltiples métodos científicos",
        "keywords": [
          "calculadora zonas frecuencia cardiaca",
          "zonas entrenamiento frecuencia cardiaca",
          "calculadora fórmula Karvonen",
          "calculadora frecuencia cardiaca objetivo",
          "calculadora zonas FC running",
          "zonas frecuencia cardiaca ciclismo",
          "zona quema grasa frecuencia cardiaca",
          "zonas entrenamiento 80/20"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "gender": {
          "label": "Género",
          "helpText": "Afecta el cálculo de la zona de quema de grasa y evaluación de FC en reposo",
          "options": {
            "male": "Hombre",
            "female": "Mujer"
          }
        },
        "age": {
          "label": "Edad",
          "helpText": "Usado para estimar la frecuencia cardíaca máxima si no está medida"
        },
        "restingHR": {
          "label": "Frecuencia Cardíaca en Reposo",
          "helpText": "Mide a primera hora de la mañana antes de levantarte de la cama (habilita el método Karvonen)"
        },
        "knowsMaxHR": {
          "label": "¿Conoces tu frecuencia cardíaca máxima?",
          "helpText": "Una FC máxima medida de una prueba de esfuerzo o esfuerzo máximo es más precisa que las fórmulas",
          "options": {
            "no": "No, estímala",
            "yes": "Sí, la he probado"
          }
        },
        "maxHR": {
          "label": "Frecuencia Cardíaca Máxima",
          "helpText": "Introduce la frecuencia cardíaca más alta registrada durante un esfuerzo máximo o prueba de esfuerzo"
        },
        "maxHRFormula": {
          "label": "Fórmula de Estimación",
          "helpText": "Tanaka (2001) es generalmente más precisa que la clásica 220-edad",
          "options": {
            "fox": "Fox: 220 − edad (clásica)",
            "tanaka": "Tanaka: 208 − 0.7 × edad (recomendada)",
            "gellish": "Gellish: 206.9 − 0.67 × edad",
            "nes": "Nes: 211 − 0.64 × edad"
          }
        },
        "knowsLTHR": {
          "label": "¿Conoces tu FC de umbral de lactato?",
          "helpText": "Las zonas basadas en LTHR (método Friel) son las más precisas para atletas entrenados",
          "options": {
            "no": "No",
            "yes": "Sí, la he probado"
          }
        },
        "lactateThresholdHR": {
          "label": "Frecuencia Cardíaca de Umbral de Lactato",
          "helpText": "Determinada de una prueba contrarreloj de 30 minutos o prueba de laboratorio — FC promedio de los últimos 20 minutos"
        },
        "sport": {
          "label": "Deporte Principal",
          "helpText": "Las zonas de ciclismo son ~5 ppm más bajas que las de running; natación ~10 ppm más bajas",
          "options": {
            "general": "Fitness General",
            "running": "Running",
            "cycling": "Ciclismo (−5 ppm de compensación)",
            "swimming": "Natación (−10 ppm de compensación)"
          }
        },
        "weight": {
          "label": "Peso (opcional)",
          "helpText": "Introduce tu peso para ver las calorías estimadas quemadas por zona"
        }
      },
      "inputGroups": {},
      "results": {
        "maxHR": {
          "label": "Frecuencia Cardíaca Máxima"
        },
        "zone1": {
          "label": "Zona 1 — Recuperación"
        },
        "zone2": {
          "label": "Zona 2 — Resistencia"
        },
        "zone3": {
          "label": "Zona 3 — Tempo"
        },
        "zone4": {
          "label": "Zona 4 — Umbral"
        },
        "zone5": {
          "label": "Zona 5 — VO2 Máx"
        },
        "fatBurnZone": {
          "label": "Zona de Quema de Grasa"
        },
        "rhrAssessment": {
          "label": "Condición Física FC Reposo"
        },
        "heartRateReserve": {
          "label": "Reserva de Frecuencia Cardíaca"
        },
        "eightyTwentyCutoff": {
          "label": "División Entrenamiento 80/20"
        }
      },
      "tooltips": {
        "maxHR": "La frecuencia cardíaca más alta que tu corazón puede alcanzar de forma segura durante el esfuerzo máximo",
        "zone1": "Esfuerzo ligero — carreras de recuperación, calentamiento, enfriamiento. Puedes cantar cómodamente",
        "zone2": "Esfuerzo moderado — la zona de base aeróbica. Puedes hablar fácilmente. La mayoría del entrenamiento debería estar aquí",
        "zone3": "Moderadamente difícil — ritmo tempo. Solo frases cortas. Desarrolla velocidad y tolerancia al lactato",
        "zone4": "Esfuerzo difícil — en o cerca del umbral de lactato. Solo pocas palabras. Mejora el ritmo máximo sostenible",
        "zone5": "Esfuerzo máximo — intervalos de VO2 máx. No puedes hablar. Sostenible solo por 1–5 minutos",
        "fatBurnZone": "El rango de frecuencia cardíaca donde tu cuerpo quema el mayor porcentaje de calorías de grasa",
        "rhrAssessment": "Cómo se compara tu frecuencia cardíaca en reposo con las normas poblacionales — más baja generalmente significa mejor forma",
        "heartRateReserve": "La diferencia entre tu FC máxima y FC en reposo — usado en la fórmula Karvonen",
        "eightyTwentyCutoff": "La FC por encima de la cual solo el 20% de tu volumen de entrenamiento semanal debería ocurrir"
      },
      "presets": {
        "beginner": {
          "label": "Principiante",
          "description": "Nuevo en ejercicio, 35 años, FC reposo 75, fitness general"
        },
        "weekendRunner": {
          "label": "Corredor de Fin de Semana",
          "description": "Corredor recreativo, 30 años, FC reposo 65"
        },
        "seriousRunner": {
          "label": "Corredor Serio",
          "description": "Entrenamiento estructurado, 28 años, FC reposo 52"
        },
        "eliteCyclist": {
          "label": "Ciclista Elite",
          "description": "Ciclista competitivo, 32 años, FC reposo 46, LTHR conocido"
        }
      },
      "values": {
        "bpm": "ppm",
        "cal/min": "cal/min",
        "N/A": "N/A",
        "Measured": "Medida",
        "Fox (220−age)": "Fox (220−edad)",
        "Tanaka": "Tanaka",
        "Gellish": "Gellish",
        "Nes": "Nes",
        "Karvonen (HRR)": "Karvonen (RFC)",
        "%MaxHR": "%FCMáx",
        "LTHR (Friel)": "LTHR (Friel)",
        "Recovery": "Recuperación",
        "Endurance": "Resistencia",
        "Tempo": "Tempo",
        "Threshold": "Umbral",
        "VO2 Max": "VO2 Máx",
        "Athlete": "Atleta",
        "Excellent": "Excelente",
        "Good": "Bueno",
        "Average": "Promedio",
        "Below Average": "Bajo Promedio",
        "Poor": "Pobre",
        "below": "debajo",
        "above": "arriba",
        "Can sing": "Puedes cantar",
        "Can talk easily": "Puedes hablar fácilmente",
        "Short sentences": "Frases cortas",
        "Few words only": "Solo pocas palabras",
        "Cannot talk": "No puedes hablar"
      },
      "formats": {
        "summary": "FC Máx: {maxHR} ppm ({formula}). Zona 2 (resistencia): {z2Low}–{z2High} ppm. Quema grasa: {fatLow}–{fatHigh} ppm. Corte 80/20: {cutoff} ppm. Método: {method}."
      },
      "chart": {
        "title": "Rangos de Zonas de Frecuencia Cardíaca",
        "xLabel": "Zona",
        "yLabel": "Frecuencia Cardíaca (ppm)",
        "series": {
          "base": "",
          "z1Range": "Z1 Recuperación",
          "z2Range": "Z2 Resistencia",
          "z3Range": "Z3 Tempo",
          "z4Range": "Z4 Umbral",
          "z5Range": "Z5 VO2 Máx"
        }
      },
      "infoCards": {
        "zones": {
          "title": "🏃 Tus Zonas de Entrenamiento"
        },
        "insights": {
          "title": "📊 Perspectivas de Condición Física"
        },
        "tips": {
          "title": "💡 Consejos de Entrenamiento",
          "items": [
            "Haz el 80% de tu entrenamiento semanal en Zona 1–2 y solo el 20% en Zona 3–5 para ganancias óptimas",
            "Mide la FC en reposo a primera hora de la mañana durante 3 días y usa el promedio para mejor precisión",
            "Las zonas de frecuencia cardíaca difieren entre deportes — las zonas de ciclismo son 5–8 ppm más bajas que las de running",
            "Si tomas betabloqueantes u otros medicamentos que afecten la FC, usa RPE (esfuerzo percibido) en lugar de zonas de FC"
          ]
        }
      },
      "referenceData": {},
      "education": {
        "whatAre": {
          "title": "¿Qué son las Zonas de Entrenamiento de Frecuencia Cardíaca?",
          "content": "Las zonas de entrenamiento de frecuencia cardíaca son rangos de latidos por minuto que corresponden a diferentes intensidades de ejercicio y respuestas fisiológicas. Al entrenar dentro de zonas específicas, puedes dirigir adaptaciones precisas — desde construir resistencia aeróbica hasta mejorar tu VO2 máx. El modelo más ampliamente usado divide el esfuerzo en cinco zonas: Zona 1 (50–60% intensidad) para recuperación, Zona 2 (60–70%) para construcción de base aeróbica y quema de grasa, Zona 3 (70–80%) para tempo y tolerancia al lactato, Zona 4 (80–90%) para entrenamiento de umbral, y Zona 5 (90–100%) para intervalos de VO2 máx. La investigación muestra consistentemente que los atletas que entrenan con monitoreo de frecuencia cardíaca mejoran más rápido y reducen el riesgo de lesión porque evitan el error común de ir muy fuerte en días fáciles y muy fácil en días duros. La perspectiva clave que transformó el entrenamiento de resistencia es la regla 80/20: aproximadamente el 80% del volumen de entrenamiento debería ocurrir en Zonas 1–2 (debajo del umbral ventilatorio), mientras que solo el 20% debería estar en Zonas 3–5. Este enfoque polarizado, validado por décadas de investigación en atletas de resistencia de élite, produce adaptaciones superiores comparado con pasar la mayoría del tiempo de entrenamiento a intensidad moderada."
        },
        "methods": {
          "title": "Métodos Karvonen vs Porcentaje Simple vs LTHR",
          "content": "Hay tres enfoques principales para calcular zonas de frecuencia cardíaca, cada uno con diferentes niveles de precisión. El método más simple multiplica tu frecuencia cardíaca máxima estimada por porcentajes de zona (ej., Zona 2 = 60–70% de FCMáx). Esto es fácil pero impreciso porque ignora la condición física individual. El método Karvonen, desarrollado por el fisiólogo finlandés Martti Karvonen en 1957, es más preciso porque usa tu reserva de frecuencia cardíaca (RFC = FCMáx − FC Reposo) para calcular zonas: FC Objetivo = (RFC × %intensidad) + FC Reposo. Al incorporar la frecuencia cardíaca en reposo, la fórmula Karvonen cuenta para la condición cardiovascular individual — un atleta entrenado con FC reposo de 45 ppm obtiene zonas muy diferentes que un principiante a 78 ppm, incluso si ambos tienen la misma FC máx. El método más preciso usa tu frecuencia cardíaca de umbral de lactato (LTHR), determinada a través de una prueba contrarreloj de 30 minutos o prueba de laboratorio. El método Friel calcula todas las zonas como porcentajes de LTHR, que representa directamente la frontera fisiológica entre esfuerzo aeróbico sostenible y esfuerzo anaeróbico insostenible. Para atletas competitivos, las zonas basadas en LTHR son el estándar de oro porque alinean las zonas con umbrales metabólicos reales en lugar de porcentajes estimados."
        },
        "howToMeasure": {
          "title": "Cómo Medir tu Frecuencia Cardíaca con Precisión",
          "items": [
            {
              "text": "FC Reposo: Mide a primera hora de la mañana antes de levantarte de la cama — cuenta latidos durante 60 segundos completos o usa un monitor de banda pectoral durante 3 mañanas consecutivas y promedia los resultados",
              "type": "info"
            },
            {
              "text": "Prueba FC máx: Después de un calentamiento completo, corre cuesta arriba durante 2–3 minutos a esfuerzo máximo, recupérate, repite dos veces — la lectura más alta es tu FC máx aproximada",
              "type": "info"
            },
            {
              "text": "Prueba LTHR: Calienta 10 minutos, luego haz una prueba contrarreloj en solitario de 30 minutos a esfuerzo máximo sostenible — tu FC promedio de los últimos 20 minutos es tu LTHR",
              "type": "info"
            },
            {
              "text": "Usa un monitor de frecuencia cardíaca de banda pectoral para las pruebas — los sensores ópticos de muñeca pueden ser imprecisos por 5–15 ppm durante ejercicio de alta intensidad",
              "type": "warning"
            },
            {
              "text": "No uses la fórmula 220-menos-edad como dogma — tiene una desviación estándar de ±10–12 ppm, significando que tu máximo real podría ser 20+ ppm diferente de la estimación",
              "type": "warning"
            },
            {
              "text": "Re-evalúa cada 6–8 semanas durante bloques de entrenamiento — tanto la FC reposo como el umbral de lactato cambian al mejorar la condición física, por lo que las zonas deberían actualizarse en consecuencia",
              "type": "info"
            }
          ]
        },
        "zoneBenefits": {
          "title": "Beneficios del Entrenamiento por Zona",
          "items": [
            {
              "text": "Zona 1 (Recuperación): Promueve flujo sanguíneo para reparación muscular, reduce cortisol, y apoya recuperación activa entre sesiones duras — el corazón puede fortalecerse sin estrés",
              "type": "info"
            },
            {
              "text": "Zona 2 (Resistencia): Construye base aeróbica, aumenta densidad mitocondrial, mejora eficiencia de oxidación de grasa, y mejora redes capilares en músculos — la fundación de todo rendimiento de resistencia",
              "type": "info"
            },
            {
              "text": "Zona 3 (Tempo): Mejora tasa de eliminación de lactato, aumenta volumen sistólico cardíaco, y desarrolla la habilidad de sostener esfuerzos moderadamente duros por períodos extendidos",
              "type": "info"
            },
            {
              "text": "Zona 4 (Umbral): Eleva el umbral de lactato para que puedas sostener intensidades más altas antes de fatigarte — crítico para rendimiento de carrera y habilidad de contrarreloj",
              "type": "info"
            },
            {
              "text": "Zona 5 (VO2 Máx): Maximiza capacidad de captación de oxígeno, mejora gasto cardíaco, y desarrolla la habilidad de producir potencia a intensidad aeróbica máxima — esencial para intervalos y sprints finales",
              "type": "warning"
            },
            {
              "text": "Zona Quema Grasa: Entrenar al 55–75% de FCMáx quema el mayor porcentaje de calorías de reservas de grasa, pero la quema total de calorías es menor que zonas más altas — ambos enfoques contribuyen a objetivos de composición corporal",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo",
          "description": "Cálculos de zonas paso a paso usando diferentes métodos",
          "examples": [
            {
              "title": "Método Karvonen — Corredor de 30 años",
              "steps": [
                "Edad: 30, FC Reposo: 60 ppm",
                "FCMáx (Tanaka): 208 − (0.7 × 30) = 187 ppm",
                "Reserva Frecuencia Cardíaca: 187 − 60 = 127 ppm",
                "Zona 2 baja: (127 × 0.60) + 60 = 136 ppm",
                "Zona 2 alta: (127 × 0.70) + 60 = 149 ppm",
                "Rango Zona 2: 136–149 ppm (Resistencia)"
              ],
              "result": "Zona 2: 136–149 ppm — Ritmo conversacional fácil"
            },
            {
              "title": "Método LTHR — Ciclista Competitivo",
              "steps": [
                "FC Umbral de Lactato: 170 ppm (de contrarreloj 30 min)",
                "Zona 1: 170 × 0.68–0.83 = 116–141 ppm",
                "Zona 2: 170 × 0.84–0.89 = 143–151 ppm",
                "Zona 4: 170 × 0.96–1.00 = 163–170 ppm",
                "Compensación deportiva para ciclismo: −5 ppm",
                "Zona 4 Ajustada: 158–165 ppm"
              ],
              "result": "Zona 4: 158–165 ppm — Intervalos de umbral en bicicleta"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuál fórmula de frecuencia cardíaca máxima es más precisa?",
          "answer": "La fórmula Tanaka (208 − 0.7 × edad) ha demostrado ser más precisa en un rango de edad más amplio que la fórmula clásica Fox (220 − edad), que nunca se basó en investigación original y tiene una desviación estándar de ±10–12 ppm. Las fórmulas Gellish y Nes ofrecen precisión similar a Tanaka. Sin embargo, todas las fórmulas basadas en edad son estimaciones — la única forma verdaderamente precisa de conocer tu FC máx es a través de una prueba de esfuerzo máximo supervisada por un profesional."
        },
        {
          "question": "¿Qué es la fórmula Karvonen y por qué es mejor?",
          "answer": "La fórmula Karvonen calcula la frecuencia cardíaca objetivo como: FCO = ((FCMáx − FC Reposo) × %intensidad) + FC Reposo. Es más precisa que los métodos simples de porcentaje de máximo porque cuenta para tu condición cardiovascular individual a través de la frecuencia cardíaca en reposo. Un atleta en forma con FC reposo de 45 obtiene zonas diferentes y más apropiadas que una persona sedentaria con FC reposo de 80, incluso a la misma edad."
        },
        {
          "question": "¿Por qué mis zonas de ciclismo son más bajas que mis zonas de running?",
          "answer": "Durante el ciclismo, usas menos masa muscular que en running (principalmente piernas vs cuerpo completo), tu peso corporal está soportado por la bicicleta, y la posición sentada reduce las demandas de retorno venoso. Esto significa que tu corazón no necesita trabajar tan duro en niveles de esfuerzo equivalentes. La investigación muestra que las frecuencias cardíacas de ciclismo son típicamente 5–8 ppm más bajas que running al mismo esfuerzo percibido, por lo que esta calculadora aplica una compensación específica del deporte."
        },
        {
          "question": "¿Qué es la regla 80/20 en entrenamiento de frecuencia cardíaca?",
          "answer": "La regla 80/20 establece que aproximadamente el 80% de tu tiempo de entrenamiento debería gastarse en zonas de baja intensidad (Zona 1–2, debajo del umbral ventilatorio) y solo el 20% en zonas de alta intensidad (Zona 3–5). Este enfoque polarizado ha sido validado por investigación en atletas de resistencia de élite y produce consistentemente mejores mejoras de rendimiento que entrenar mayormente a intensidad moderada. La calculadora muestra tu frecuencia cardíaca de corte 80/20."
        },
        {
          "question": "¿Qué es una buena frecuencia cardíaca en reposo?",
          "answer": "Para adultos, una frecuencia cardíaca en reposo entre 60–100 ppm se considera normal. Sin embargo, individuos más en forma típicamente tienen tasas de reposo más bajas: 60–69 ppm es bueno, 50–59 ppm es excelente, y debajo de 50 ppm es típico de atletas bien entrenados. Una frecuencia cardíaca en reposo decreciente durante semanas de entrenamiento es una de las señales más claras de mejora de condición cardiovascular. Por el contrario, una FC reposo elevada 5+ ppm sobre lo normal en una mañana dada puede indicar recuperación incompleta o enfermedad."
        },
        {
          "question": "¿Es realmente la zona de quema de grasa la mejor para pérdida de peso?",
          "answer": "Es complejo. Entrenar en la zona de quema de grasa (55–75% FCMáx) sí quema un mayor porcentaje de calorías de grasa. Sin embargo, el ejercicio de mayor intensidad quema más calorías totales por minuto, incluyendo más gramos absolutos de grasa. Para pérdida de peso, el gasto calórico total importa más que la fuente de combustible. El mejor enfoque combina entrenamiento Zona 2 (sostenible, construye base aeróbica) con sesiones ocasionales de mayor intensidad (aumenta metabolismo y EPOC — consumo excesivo de oxígeno post-ejercicio)."
        },
        {
          "question": "¿Cómo sé mi frecuencia cardíaca de umbral de lactato?",
          "answer": "La prueba de campo más simple es una prueba contrarreloj en solitario de 30 minutos al ritmo máximo que puedes sostener uniformemente. Después de un calentamiento de 10 minutos, inicia tu reloj y ve tan fuerte como puedas mantener durante 30 minutos. Tu frecuencia cardíaca promedio de los últimos 20 minutos del esfuerzo aproxima tu LTHR. Para resultados más precisos, una prueba de lactato basada en laboratorio con muestreo de sangre a intensidades crecientes es el estándar de oro."
        },
        {
          "question": "¿Debo ajustar las zonas si tomo betabloqueantes?",
          "answer": "Sí. Los betabloqueantes bajan tu frecuencia cardíaca máxima y frecuencia cardíaca en reposo, haciendo imprecisos los cálculos estándar de zonas de FC. Si tomas betabloqueantes u otros medicamentos que afecten la frecuencia cardíaca, consulta a tu médico para orientación. Podrías querer usar la Tasa de Esfuerzo Percibido (RPE) como tu guía de intensidad principal en su lugar: Zona 1 se siente como 2–3/10, Zona 2 es 4–5/10, Zona 3 es 6–7/10, Zona 4 es 8/10, y Zona 5 es 9–10/10."
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
      "name": "Calculadora de Zonas de Frequência Cardíaca",
      "slug": "calculadora-zonas-frequencia-cardiaca",
      "subtitle": "Obtenha zonas de treino personalizadas usando Karvonen, LTHR ou 4 fórmulas diferentes de FCMax — com ajustes específicos por esporte, zonas de queima de gordura e estimativas de calorias",
      "breadcrumb": "Zonas de Frequência Cardíaca",
      "seo": {
        "title": "Calculadora de Zonas de Frequência Cardíaca — Karvonen, LTHR e Multi-Fórmula",
        "description": "Calcule suas 5 zonas de treino personalizadas de frequência cardíaca usando Karvonen, limiar de lactato ou 4 fórmulas de FCMax. Inclui ajustes específicos para corrida, ciclismo e natação, além de estimativas de queima de calorias e divisão de treino 80/20.",
        "shortDescription": "Zonas de treino personalizadas com múltiplos métodos científicos",
        "keywords": [
          "calculadora zona frequência cardíaca",
          "zonas de treino frequência cardíaca",
          "calculadora fórmula Karvonen",
          "calculadora frequência cardíaca alvo",
          "calculadora zona FC corrida",
          "zonas frequência cardíaca ciclismo",
          "zona frequência cardíaca queima gordura",
          "zonas treino 80/20"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "gender": {
          "label": "Sexo",
          "helpText": "Afeta o cálculo da zona de queima de gordura e avaliação da FCR",
          "options": {
            "male": "Masculino",
            "female": "Feminino"
          }
        },
        "age": {
          "label": "Idade",
          "helpText": "Usado para estimar a frequência cardíaca máxima se não medida"
        },
        "restingHR": {
          "label": "Frequência Cardíaca de Repouso",
          "helpText": "Meça pela manhã antes de sair da cama (habilita o método Karvonen)"
        },
        "knowsMaxHR": {
          "label": "Você conhece sua frequência cardíaca máxima?",
          "helpText": "Uma FCMax medida através de teste de esforço ou esforço máximo é mais precisa que fórmulas",
          "options": {
            "no": "Não, estimá-la",
            "yes": "Sim, eu testei"
          }
        },
        "maxHR": {
          "label": "Frequência Cardíaca Máxima",
          "helpText": "Digite a maior frequência cardíaca registrada durante esforço máximo ou teste de esforço"
        },
        "maxHRFormula": {
          "label": "Fórmula de Estimativa",
          "helpText": "Tanaka (2001) é geralmente mais precisa que a clássica 220-idade",
          "options": {
            "fox": "Fox: 220 − idade (clássica)",
            "tanaka": "Tanaka: 208 − 0.7 × idade (recomendada)",
            "gellish": "Gellish: 206.9 − 0.67 × idade",
            "nes": "Nes: 211 − 0.64 × idade"
          }
        },
        "knowsLTHR": {
          "label": "Você conhece sua FC do limiar de lactato?",
          "helpText": "Zonas baseadas em LTHR (método Friel) são as mais precisas para atletas treinados",
          "options": {
            "no": "Não",
            "yes": "Sim, eu testei"
          }
        },
        "lactateThresholdHR": {
          "label": "Frequência Cardíaca do Limiar de Lactato",
          "helpText": "Determinada através de teste de 30 minutos ou teste laboratorial — FC média dos últimos 20 minutos"
        },
        "sport": {
          "label": "Esporte Principal",
          "helpText": "Zonas do ciclismo são ~5 bpm menores que corrida; natação ~10 bpm menores",
          "options": {
            "general": "Condicionamento Geral",
            "running": "Corrida",
            "cycling": "Ciclismo (−5 bpm de ajuste)",
            "swimming": "Natação (−10 bpm de ajuste)"
          }
        },
        "weight": {
          "label": "Peso (opcional)",
          "helpText": "Digite seu peso para ver estimativas de calorias queimadas por zona"
        }
      },
      "inputGroups": {},
      "results": {
        "maxHR": {
          "label": "Frequência Cardíaca Máxima"
        },
        "zone1": {
          "label": "Zona 1 — Recuperação"
        },
        "zone2": {
          "label": "Zona 2 — Resistência"
        },
        "zone3": {
          "label": "Zona 3 — Tempo"
        },
        "zone4": {
          "label": "Zona 4 — Limiar"
        },
        "zone5": {
          "label": "Zona 5 — VO2 Máx"
        },
        "fatBurnZone": {
          "label": "Zona Queima Gordura"
        },
        "rhrAssessment": {
          "label": "Condicionamento FCR"
        },
        "heartRateReserve": {
          "label": "Reserva Frequência Cardíaca"
        },
        "eightyTwentyCutoff": {
          "label": "Divisão Treino 80/20"
        }
      },
      "tooltips": {
        "maxHR": "A maior frequência cardíaca que seu coração pode alcançar com segurança durante esforço máximo",
        "zone1": "Esforço leve — corridas de recuperação, aquecimento, volta à calma. Você consegue cantar confortavelmente",
        "zone2": "Esforço moderado — zona da base aeróbica. Você consegue conversar facilmente. A maior parte do treino deve ser aqui",
        "zone3": "Moderadamente difícil — ritmo de tempo. Apenas frases curtas. Desenvolve velocidade e tolerância ao lactato",
        "zone4": "Esforço intenso — no ou próximo ao limiar de lactato. Apenas algumas palavras. Melhora o ritmo sustentado máximo",
        "zone5": "Esforço máximo — intervalos de VO2 máx. Não consegue falar. Sustentável por 1–5 minutos apenas",
        "fatBurnZone": "A faixa de frequência cardíaca onde seu corpo queima o maior percentual de calorias da gordura",
        "rhrAssessment": "Como sua frequência cardíaca de repouso se compara às normas populacionais — menor geralmente significa mais em forma",
        "heartRateReserve": "A diferença entre sua FC máx e FC de repouso — usada na fórmula de Karvonen",
        "eightyTwentyCutoff": "A FC acima da qual apenas 20% do seu volume semanal de treino deve ocorrer"
      },
      "presets": {
        "beginner": {
          "label": "Iniciante",
          "description": "Novo no exercício, 35 anos, FCR 75, condicionamento geral"
        },
        "weekendRunner": {
          "label": "Corredor de Fim de Semana",
          "description": "Corredor recreativo, 30 anos, FCR 65"
        },
        "seriousRunner": {
          "label": "Corredor Sério",
          "description": "Treino estruturado, 28 anos, FCR 52"
        },
        "eliteCyclist": {
          "label": "Ciclista Elite",
          "description": "Ciclista competitivo, 32 anos, FCR 46, LTHR conhecido"
        }
      },
      "values": {
        "bpm": "bpm",
        "cal/min": "cal/min",
        "N/A": "N/A",
        "Measured": "Medido",
        "Fox (220−age)": "Fox (220−idade)",
        "Tanaka": "Tanaka",
        "Gellish": "Gellish",
        "Nes": "Nes",
        "Karvonen (HRR)": "Karvonen (RFC)",
        "%MaxHR": "%FCMáx",
        "LTHR (Friel)": "LTHR (Friel)",
        "Recovery": "Recuperação",
        "Endurance": "Resistência",
        "Tempo": "Tempo",
        "Threshold": "Limiar",
        "VO2 Max": "VO2 Máx",
        "Athlete": "Atleta",
        "Excellent": "Excelente",
        "Good": "Bom",
        "Average": "Médio",
        "Below Average": "Abaixo da Média",
        "Poor": "Ruim",
        "below": "abaixo",
        "above": "acima",
        "Can sing": "Consegue cantar",
        "Can talk easily": "Consegue conversar facilmente",
        "Short sentences": "Frases curtas",
        "Few words only": "Apenas algumas palavras",
        "Cannot talk": "Não consegue falar"
      },
      "formats": {
        "summary": "FC Máx: {maxHR} bpm ({formula}). Zona 2 (resistência): {z2Low}–{z2High} bpm. Queima gordura: {fatLow}–{fatHigh} bpm. Corte 80/20: {cutoff} bpm. Método: {method}."
      },
      "chart": {
        "title": "Faixas das Zonas de Frequência Cardíaca",
        "xLabel": "Zona",
        "yLabel": "Frequência Cardíaca (bpm)",
        "series": {
          "base": "",
          "z1Range": "Z1 Recuperação",
          "z2Range": "Z2 Resistência",
          "z3Range": "Z3 Tempo",
          "z4Range": "Z4 Limiar",
          "z5Range": "Z5 VO2 Máx"
        }
      },
      "infoCards": {
        "zones": {
          "title": "🏃 Suas Zonas de Treino"
        },
        "insights": {
          "title": "📊 Insights de Condicionamento"
        },
        "tips": {
          "title": "💡 Dicas de Treino",
          "items": [
            "Faça 80% do seu treino semanal na Zona 1–2 e apenas 20% na Zona 3–5 para ganhos ótimos",
            "Meça a FC de repouso pela manhã por 3 dias e use a média para melhor precisão",
            "Zonas de frequência cardíaca diferem entre esportes — zonas do ciclismo são 5–8 bpm menores que da corrida",
            "Se você toma beta bloqueadores ou outros medicamentos que afetam FC, use PSE (esforço percebido) ao invés de zonas de FC"
          ]
        }
      },
      "referenceData": {},
      "education": {
        "whatAre": {
          "title": "O Que São Zonas de Treino de Frequência Cardíaca?",
          "content": "Zonas de treino de frequência cardíaca são faixas de batimentos por minuto que correspondem a diferentes intensidades de exercício e respostas fisiológicas. Ao treinar dentro de zonas específicas, você pode direcionar adaptações precisas — desde construir resistência aeróbica até melhorar seu VO2 máximo. O modelo mais amplamente usado divide o esforço em cinco zonas: Zona 1 (50–60% intensidade) para recuperação, Zona 2 (60–70%) para construção da base aeróbica e queima de gordura, Zona 3 (70–80%) para tempo e tolerância ao lactato, Zona 4 (80–90%) para treino de limiar, e Zona 5 (90–100%) para intervalos de VO2 máx. Pesquisas consistentemente mostram que atletas que treinam com monitoramento de frequência cardíaca melhoram mais rápido e reduzem o risco de lesão porque evitam o erro comum de ir muito forte nos dias fáceis e muito fácil nos dias difíceis. O insight chave que transformou o treino de resistência é a regra 80/20: aproximadamente 80% do volume de treino deve ocorrer nas Zonas 1–2 (abaixo do limiar ventilatório), enquanto apenas 20% deve ser nas Zonas 3–5. Esta abordagem polarizada, validada por décadas de pesquisa em atletas de resistência de elite, produz adaptações superiores comparado a gastar a maior parte do tempo de treino em intensidade moderada."
        },
        "methods": {
          "title": "Métodos Karvonen vs Percentual Simples vs LTHR",
          "content": "Existem três abordagens principais para calcular zonas de frequência cardíaca, cada uma com diferentes níveis de precisão. O método mais simples multiplica sua frequência cardíaca máxima estimada por percentuais de zona (ex: Zona 2 = 60–70% da FCMáx). Isso é fácil mas impreciso porque ignora o condicionamento individual. O método Karvonen, desenvolvido pelo fisiologista finlandês Martti Karvonen em 1957, é mais preciso porque usa sua reserva de frequência cardíaca (RFC = FCMáx − FC Repouso) para calcular zonas: FC Alvo = (RFC × %intensidade) + FC Repouso. Ao incorporar a frequência cardíaca de repouso, a fórmula Karvonen considera o condicionamento cardiovascular individual — um atleta treinado com FC de repouso de 45 bpm obtém zonas muito diferentes de um iniciante com 78 bpm, mesmo se ambos têm a mesma FC máx. O método mais preciso usa sua frequência cardíaca do limiar de lactato (LTHR), determinada através de teste de 30 minutos ou teste laboratorial. O método Friel calcula todas as zonas como percentuais da LTHR, que representa diretamente a fronteira fisiológica entre esforço aeróbico sustentável e esforço anaeróbico insustentável. Para atletas competitivos, zonas baseadas em LTHR são o padrão ouro porque alinham as zonas com limiares metabólicos reais ao invés de percentuais estimados."
        },
        "howToMeasure": {
          "title": "Como Medir Sua Frequência Cardíaca com Precisão",
          "items": [
            {
              "text": "FC Repouso: Meça pela manhã antes de sair da cama — conte batimentos por 60 segundos completos ou use monitor de cinta peitoral por 3 manhãs consecutivas e tire a média",
              "type": "info"
            },
            {
              "text": "Teste FC máx: Após aquecimento completo, corra subindo uma ladeira íngreme por 2–3 minutos em esforço máximo, recupere, repita duas vezes — a maior leitura é sua FC máx aproximada",
              "type": "info"
            },
            {
              "text": "Teste LTHR: Aqueça por 10 minutos, então faça um contra-relógio solo de 30 minutos em esforço máximo sustentável — sua FC média nos últimos 20 minutos é sua LTHR",
              "type": "info"
            },
            {
              "text": "Use monitor de frequência cardíaca de cinta peitoral para testes — sensores óticos de pulso podem ser imprecisos em 5–15 bpm durante exercício de alta intensidade",
              "type": "warning"
            },
            {
              "text": "Não use a fórmula 220-menos-idade como absoluta — tem desvio padrão de ±10–12 bpm, significando que sua FC máx real pode ser 20+ bpm diferente da estimativa",
              "type": "warning"
            },
            {
              "text": "Reteste a cada 6–8 semanas durante blocos de treino — tanto FC de repouso quanto limiar de lactato mudam conforme o condicionamento melhora, então zonas devem ser atualizadas",
              "type": "info"
            }
          ]
        },
        "zoneBenefits": {
          "title": "Benefícios do Treino por Zona",
          "items": [
            {
              "text": "Zona 1 (Recuperação): Promove fluxo sanguíneo para reparo muscular, reduz cortisol e suporta recuperação ativa entre sessões intensas — coração pode fortalecer sem estresse",
              "type": "info"
            },
            {
              "text": "Zona 2 (Resistência): Constrói base aeróbica, aumenta densidade mitocondrial, melhora eficiência de oxidação de gordura e aprimora redes capilares nos músculos — fundação de toda performance de resistência",
              "type": "info"
            },
            {
              "text": "Zona 3 (Tempo): Melhora taxa de remoção de lactato, aumenta volume sistólico cardíaco e desenvolve capacidade de sustentar esforços moderadamente intensos por períodos prolongados",
              "type": "info"
            },
            {
              "text": "Zona 4 (Limiar): Eleva limiar de lactato para que você possa sustentar intensidades maiores antes de fadigar — crítico para performance de prova e capacidade de contra-relógio",
              "type": "info"
            },
            {
              "text": "Zona 5 (VO2 Máx): Maximiza capacidade de consumo de oxigênio, melhora débito cardíaco e desenvolve capacidade de produzir potência em intensidade aeróbica máxima — essencial para intervalos e arrancadas finais",
              "type": "warning"
            },
            {
              "text": "Zona Queima Gordura: Treinar a 55–75% da FCMáx queima o maior percentual de calorias das reservas de gordura, mas queima calórica total é menor que zonas superiores — ambas abordagens contribuem para objetivos de composição corporal",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo",
          "description": "Cálculos de zona passo a passo usando diferentes métodos",
          "examples": [
            {
              "title": "Método Karvonen — Corredor de 30 anos",
              "steps": [
                "Idade: 30, FC Repouso: 60 bpm",
                "FCMáx (Tanaka): 208 − (0.7 × 30) = 187 bpm",
                "Reserva Frequência Cardíaca: 187 − 60 = 127 bpm",
                "Zona 2 baixa: (127 × 0.60) + 60 = 136 bpm",
                "Zona 2 alta: (127 × 0.70) + 60 = 149 bpm",
                "Faixa Zona 2: 136–149 bpm (Resistência)"
              ],
              "result": "Zona 2: 136–149 bpm — Ritmo de conversa fácil"
            },
            {
              "title": "Método LTHR — Ciclista Competitivo",
              "steps": [
                "FC Limiar de Lactato: 170 bpm (de TT de 30 min)",
                "Zona 1: 170 × 0.68–0.83 = 116–141 bpm",
                "Zona 2: 170 × 0.84–0.89 = 143–151 bpm",
                "Zona 4: 170 × 0.96–1.00 = 163–170 bpm",
                "Ajuste esportivo para ciclismo: −5 bpm",
                "Zona 4 Ajustada: 158–165 bpm"
              ],
              "result": "Zona 4: 158–165 bpm — Intervalos de limiar na bike"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qual fórmula de frequência cardíaca máxima é mais precisa?",
          "answer": "A fórmula de Tanaka (208 − 0.7 × idade) demonstrou ser mais precisa numa faixa etária mais ampla que a fórmula clássica de Fox (220 − idade), que nunca foi baseada em pesquisa original e tem desvio padrão de ±10–12 bpm. As fórmulas de Gellish e Nes oferecem precisão similar à Tanaka. Porém, todas as fórmulas baseadas em idade são estimativas — a única forma verdadeiramente precisa de conhecer sua FC máx é através de teste de esforço máximo supervisionado por profissional."
        },
        {
          "question": "O que é a fórmula de Karvonen e por que é melhor?",
          "answer": "A fórmula de Karvonen calcula a frequência cardíaca alvo como: FCA = ((FCMáx − FCRepouso) × %intensidade) + FCRepouso. É mais precisa que métodos simples de percentual da máxima porque considera seu condicionamento cardiovascular individual através da frequência cardíaca de repouso. Um atleta em forma com FC de repouso de 45 obtém zonas diferentes e mais apropriadas que uma pessoa sedentária com FC de repouso de 80, mesmo na mesma idade."
        },
        {
          "question": "Por que minhas zonas de ciclismo são menores que de corrida?",
          "answer": "Durante o ciclismo, você usa menos massa muscular que na corrida (principalmente pernas vs. corpo todo), seu peso corporal é suportado pela bicicleta, e a posição sentada reduz demandas de retorno venoso. Isso significa que seu coração não precisa trabalhar tanto em níveis de esforço equivalentes. Pesquisas mostram que frequências cardíacas do ciclismo são tipicamente 5–8 bpm menores que corrida no mesmo esforço percebido, razão pela qual esta calculadora aplica ajuste específico do esporte."
        },
        {
          "question": "O que é a regra 80/20 no treino de frequência cardíaca?",
          "answer": "A regra 80/20 estabelece que aproximadamente 80% do seu tempo de treino deve ser gasto em zonas de baixa intensidade (Zona 1–2, abaixo do limiar ventilatório) e apenas 20% em zonas de alta intensidade (Zona 3–5). Esta abordagem polarizada foi validada por pesquisas em atletas de resistência de elite e consistentemente produz melhores melhorias de performance que treinar principalmente em intensidade moderada. A calculadora mostra seu ponto de corte de frequência cardíaca 80/20."
        },
        {
          "question": "Qual é uma boa frequência cardíaca de repouso?",
          "answer": "Para adultos, frequência cardíaca de repouso entre 60–100 bpm é considerada normal. Porém, indivíduos mais em forma tipicamente têm taxas de repouso menores: 60–69 bpm é bom, 50–59 bpm é excelente, e abaixo de 50 bpm é típico de atletas bem treinados. Uma frequência cardíaca de repouso decrescente ao longo de semanas de treino é um dos sinais mais claros de melhoria do condicionamento cardiovascular. Inversamente, uma FC de repouso elevada 5+ bpm acima do normal numa manhã pode indicar recuperação incompleta ou doença."
        },
        {
          "question": "A zona de queima de gordura é realmente a melhor para perda de peso?",
          "answer": "É uma questão complexa. Treinar na zona de queima de gordura (55–75% FCMáx) realmente queima maior percentual de calorias da gordura. Porém, exercício de alta intensidade queima mais calorias totais por minuto, incluindo mais gramas absolutas de gordura. Para perda de peso, gasto calórico total importa mais que fonte de combustível. A melhor abordagem combina treino Zona 2 (sustentável, constrói base aeróbica) com sessões ocasionais de alta intensidade (acelera metabolismo e EPOC — consumo excessivo de oxigênio pós-exercício)."
        },
        {
          "question": "Como sei minha frequência cardíaca do limiar de lactato?",
          "answer": "O teste de campo mais simples é um contra-relógio solo de 30 minutos no ritmo máximo que você consegue sustentar uniformemente. Após aquecimento de 10 minutos, inicie seu cronômetro e vá o mais forte que conseguir manter por 30 minutos. Sua frequência cardíaca média nos últimos 20 minutos do esforço aproxima sua LTHR. Para resultados mais precisos, teste laboratorial baseado em lactato com coletas de sangue em intensidades crescentes é o padrão ouro."
        },
        {
          "question": "Devo ajustar zonas se tomo beta bloqueadores?",
          "answer": "Sim. Beta bloqueadores reduzem sua frequência cardíaca máxima e de repouso, tornando cálculos padrão de zonas de FC imprecisos. Se você toma beta bloqueadores ou outros medicamentos que afetam frequência cardíaca, consulte seu médico para orientação. Você pode querer usar Taxa de Esforço Percebido (TEP) como seu guia principal de intensidade: Zona 1 sente como 2–3/10, Zona 2 é 4–5/10, Zona 3 é 6–7/10, Zona 4 é 8/10, e Zona 5 é 9–10/10."
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
      "name": "Calculateur de Zones de Fréquence Cardiaque",
      "slug": "calculateur-zones-frequence-cardiaque",
      "subtitle": "Obtenez des zones d'entraînement personnalisées avec Karvonen, LTHR, ou 4 formules FCmax différentes — avec ajustements spécifiques au sport, zones de combustion des graisses et estimations caloriques",
      "breadcrumb": "Zones de Fréquence Cardiaque",
      "seo": {
        "title": "Calculateur de Zones de Fréquence Cardiaque — Karvonen, LTHR & Multi-Formule",
        "description": "Calculez vos 5 zones d'entraînement personnalisées avec Karvonen, seuil lactique, ou 4 formules FCmax. Inclut des ajustements spécifiques pour course, cyclisme et natation plus estimations caloriques et répartition 80/20.",
        "shortDescription": "Zones d'entraînement personnalisées avec plusieurs méthodes scientifiques",
        "keywords": [
          "calculateur zone fréquence cardiaque",
          "zones entraînement fréquence cardiaque",
          "calculateur formule Karvonen",
          "calculateur fréquence cardiaque cible",
          "calculateur zone FC course",
          "zones fréquence cardiaque vélo",
          "zone fréquence cardiaque brûlage graisse",
          "zones entraînement 80/20"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "gender": {
          "label": "Sexe",
          "helpText": "Affecte le calcul de la zone de combustion des graisses et l'évaluation de la FCR",
          "options": {
            "male": "Homme",
            "female": "Femme"
          }
        },
        "age": {
          "label": "Âge",
          "helpText": "Utilisé pour estimer la fréquence cardiaque maximale si non mesurée"
        },
        "restingHR": {
          "label": "Fréquence Cardiaque de Repos",
          "helpText": "Mesurez au réveil avant de sortir du lit (permet la méthode Karvonen)"
        },
        "knowsMaxHR": {
          "label": "Connaissez-vous votre fréquence cardiaque maximale ?",
          "helpText": "Une FCmax mesurée par test d'effort ou effort maximal est plus précise que les formules",
          "options": {
            "no": "Non, l'estimer",
            "yes": "Oui, je l'ai testée"
          }
        },
        "maxHR": {
          "label": "Fréquence Cardiaque Maximale",
          "helpText": "Entrez la plus haute fréquence cardiaque enregistrée lors d'un effort maximal ou test d'effort"
        },
        "maxHRFormula": {
          "label": "Formule d'Estimation",
          "helpText": "Tanaka (2001) est généralement plus précise que le classique 220-âge",
          "options": {
            "fox": "Fox : 220 − âge (classique)",
            "tanaka": "Tanaka : 208 − 0,7 × âge (recommandée)",
            "gellish": "Gellish : 206,9 − 0,67 × âge",
            "nes": "Nes : 211 − 0,64 × âge"
          }
        },
        "knowsLTHR": {
          "label": "Connaissez-vous votre FC au seuil lactique ?",
          "helpText": "Les zones basées sur LTHR (méthode Friel) sont les plus précises pour les athlètes entraînés",
          "options": {
            "no": "Non",
            "yes": "Oui, je l'ai testée"
          }
        },
        "lactateThresholdHR": {
          "label": "Fréquence Cardiaque au Seuil Lactique",
          "helpText": "Déterminée par un contre-la-montre de 30 minutes ou test en laboratoire — FC moyenne des 20 dernières minutes"
        },
        "sport": {
          "label": "Sport Principal",
          "helpText": "Les zones vélo sont ~5 bpm plus basses que la course ; natation ~10 bpm plus bas",
          "options": {
            "general": "Forme Physique Générale",
            "running": "Course à Pied",
            "cycling": "Cyclisme (−5 bpm décalage)",
            "swimming": "Natation (−10 bpm décalage)"
          }
        },
        "weight": {
          "label": "Poids (optionnel)",
          "helpText": "Entrez votre poids pour voir les calories estimées brûlées par zone"
        }
      },
      "inputGroups": {},
      "results": {
        "maxHR": {
          "label": "Fréquence Cardiaque Maximale"
        },
        "zone1": {
          "label": "Zone 1 — Récupération"
        },
        "zone2": {
          "label": "Zone 2 — Endurance"
        },
        "zone3": {
          "label": "Zone 3 — Tempo"
        },
        "zone4": {
          "label": "Zone 4 — Seuil"
        },
        "zone5": {
          "label": "Zone 5 — VO2 Max"
        },
        "fatBurnZone": {
          "label": "Zone de Combustion des Graisses"
        },
        "rhrAssessment": {
          "label": "Forme FC de Repos"
        },
        "heartRateReserve": {
          "label": "Réserve de Fréquence Cardiaque"
        },
        "eightyTwentyCutoff": {
          "label": "Répartition Entraînement 80/20"
        }
      },
      "tooltips": {
        "maxHR": "La plus haute fréquence cardiaque que votre cœur peut atteindre en sécurité lors d'un effort maximal",
        "zone1": "Effort léger — courses de récupération, échauffement, récupération. Vous pouvez chanter confortablement",
        "zone2": "Effort modéré — la zone de base aérobie. Vous pouvez parler facilement. La plupart de l'entraînement devrait être ici",
        "zone3": "Effort modérément dur — allure tempo. Phrases courtes seulement. Développe la vitesse et la tolérance au lactate",
        "zone4": "Effort dur — au seuil lactique ou proche. Quelques mots seulement. Améliore l'allure maximale soutenue",
        "zone5": "Effort maximal — intervalles VO2 max. Ne peut pas parler. Soutenable seulement 1-5 minutes",
        "fatBurnZone": "La plage de fréquence cardiaque où votre corps brûle le plus haut pourcentage de calories provenant des graisses",
        "rhrAssessment": "Comment votre fréquence cardiaque de repos se compare aux normes de population — plus bas signifie généralement plus en forme",
        "heartRateReserve": "La différence entre votre FC max et de repos — utilisée dans la formule Karvonen",
        "eightyTwentyCutoff": "La FC au-dessus de laquelle seulement 20% de votre volume d'entraînement hebdomadaire devrait se faire"
      },
      "presets": {
        "beginner": {
          "label": "Débutant",
          "description": "Nouveau à l'exercice, 35 ans, FCR 75, forme générale"
        },
        "weekendRunner": {
          "label": "Coureur du Weekend",
          "description": "Coureur récréatif, 30 ans, FCR 65"
        },
        "seriousRunner": {
          "label": "Coureur Sérieux",
          "description": "Entraînement structuré, 28 ans, FCR 52"
        },
        "eliteCyclist": {
          "label": "Cycliste Elite",
          "description": "Cycliste compétitif, 32 ans, FCR 46, LTHR connu"
        }
      },
      "values": {
        "bpm": "bpm",
        "cal/min": "cal/min",
        "N/A": "N/A",
        "Measured": "Mesurée",
        "Fox (220−age)": "Fox (220−âge)",
        "Tanaka": "Tanaka",
        "Gellish": "Gellish",
        "Nes": "Nes",
        "Karvonen (HRR)": "Karvonen (RFC)",
        "%MaxHR": "%FCMax",
        "LTHR (Friel)": "LTHR (Friel)",
        "Recovery": "Récupération",
        "Endurance": "Endurance",
        "Tempo": "Tempo",
        "Threshold": "Seuil",
        "VO2 Max": "VO2 Max",
        "Athlete": "Athlète",
        "Excellent": "Excellent",
        "Good": "Bon",
        "Average": "Moyen",
        "Below Average": "Sous la Moyenne",
        "Poor": "Faible",
        "below": "sous",
        "above": "au-dessus",
        "Can sing": "Peut chanter",
        "Can talk easily": "Peut parler facilement",
        "Short sentences": "Phrases courtes",
        "Few words only": "Quelques mots seulement",
        "Cannot talk": "Ne peut pas parler"
      },
      "formats": {
        "summary": "FC Max : {maxHR} bpm ({formula}). Zone 2 (endurance) : {z2Low}–{z2High} bpm. Combustion graisses : {fatLow}–{fatHigh} bpm. Seuil 80/20 : {cutoff} bpm. Méthode : {method}."
      },
      "chart": {
        "title": "Plages des Zones de Fréquence Cardiaque",
        "xLabel": "Zone",
        "yLabel": "Fréquence Cardiaque (bpm)",
        "series": {
          "base": "",
          "z1Range": "Z1 Récupération",
          "z2Range": "Z2 Endurance",
          "z3Range": "Z3 Tempo",
          "z4Range": "Z4 Seuil",
          "z5Range": "Z5 VO2 Max"
        }
      },
      "infoCards": {
        "zones": {
          "title": "🏃 Vos Zones d'Entraînement"
        },
        "insights": {
          "title": "📊 Analyses de Forme"
        },
        "tips": {
          "title": "💡 Conseils d'Entraînement",
          "items": [
            "Faites 80% de votre entraînement hebdomadaire en Zone 1-2 et seulement 20% en Zone 3-5 pour des gains optimaux",
            "Mesurez la FC de repos au réveil pendant 3 jours et utilisez la moyenne pour une meilleure précision",
            "Les zones de fréquence cardiaque diffèrent entre sports — les zones vélo sont 5-8 bpm plus basses que la course",
            "Si vous prenez des bêta-bloquants ou autres médicaments affectant la FC, utilisez la RPE (effort perçu) plutôt que les zones FC"
          ]
        }
      },
      "referenceData": {},
      "education": {
        "whatAre": {
          "title": "Que sont les Zones d'Entraînement par Fréquence Cardiaque ?",
          "content": "Les zones d'entraînement par fréquence cardiaque sont des plages de battements par minute qui correspondent à différentes intensités d'exercice et réponses physiologiques. En s'entraînant dans des zones spécifiques, vous pouvez cibler des adaptations précises — de la construction d'endurance aérobie à l'amélioration de votre VO2 max. Le modèle le plus utilisé divise l'effort en cinq zones : Zone 1 (50-60% d'intensité) pour la récupération, Zone 2 (60-70%) pour la base aérobie et la combustion des graisses, Zone 3 (70-80%) pour le tempo et la tolérance au lactate, Zone 4 (80-90%) pour l'entraînement au seuil, et Zone 5 (90-100%) pour les intervalles VO2 max. La recherche montre constamment que les athlètes qui s'entraînent avec un suivi de fréquence cardiaque s'améliorent plus rapidement et réduisent le risque de blessure car ils évitent l'erreur commune d'aller trop fort les jours faciles et trop facile les jours durs. L'insight clé qui a transformé l'entraînement d'endurance est la règle 80/20 : environ 80% du volume d'entraînement devrait se faire en Zones 1-2 (sous le seuil ventilatoire), tandis que seulement 20% devrait être en Zones 3-5. Cette approche polarisée, validée par des décennies de recherche sur les athlètes d'endurance élites, produit des adaptations supérieures comparé à passer la plupart du temps d'entraînement à intensité modérée."
        },
        "methods": {
          "title": "Méthodes Karvonen vs Pourcentage Simple vs LTHR",
          "content": "Il y a trois approches principales pour calculer les zones de fréquence cardiaque, chacune avec différents niveaux de précision. La méthode la plus simple multiplie votre fréquence cardiaque maximale estimée par les pourcentages de zone (ex: Zone 2 = 60-70% de FCMax). C'est facile mais imprécis car cela ignore la forme individuelle. La méthode Karvonen, développée par le physiologiste finlandais Martti Karvonen en 1957, est plus précise car elle utilise votre réserve de fréquence cardiaque (RFC = FCMax − FC Repos) pour calculer les zones : FC Cible = (RFC × %intensité) + FC Repos. En incorporant la fréquence cardiaque de repos, la formule Karvonen tient compte de la forme cardiovasculaire individuelle — un athlète entraîné avec une FC de repos de 45 bpm obtient des zones très différentes d'un débutant à 78 bpm, même s'ils ont tous deux la même FC max. La méthode la plus précise utilise votre fréquence cardiaque au seuil lactique (LTHR), déterminée par un contre-la-montre de 30 minutes ou test en laboratoire. La méthode Friel calcule toutes les zones comme pourcentages de LTHR, qui représente directement la frontière physiologique entre effort aérobie soutenable et effort anaérobie non soutenable. Pour les athlètes compétitifs, les zones basées sur LTHR sont le gold standard car elles alignent les zones avec les seuils métaboliques réels plutôt que des pourcentages estimés."
        },
        "howToMeasure": {
          "title": "Comment Mesurer Votre Fréquence Cardiaque Avec Précision",
          "items": [
            {
              "text": "FC de repos : Mesurez au réveil avant de sortir du lit — comptez les battements pendant 60 secondes complètes ou utilisez un cardiofréquencemètre ceinture pendant 3 matins consécutifs et faites la moyenne",
              "type": "info"
            },
            {
              "text": "Test FC max : Après un échauffement complet, courez en montée raide pendant 2-3 minutes à effort maximum, récupérez, répétez deux fois — la lecture la plus haute est votre FC max approximative",
              "type": "info"
            },
            {
              "text": "Test LTHR : Échauffez-vous 10 minutes, puis faites un contre-la-montre solo de 30 minutes à effort maximal soutenable — votre FC moyenne des 20 dernières minutes est votre LTHR",
              "type": "info"
            },
            {
              "text": "Utilisez un cardiofréquencemètre ceinture pour les tests — les capteurs optiques au poignet peuvent être imprécis de 5-15 bpm pendant l'exercice haute intensité",
              "type": "warning"
            },
            {
              "text": "N'utilisez pas la formule 220-moins-âge comme parole d'évangile — elle a un écart-type de ±10-12 bpm, signifiant que votre vraie max pourrait être 20+ bpm différente de l'estimation",
              "type": "warning"
            },
            {
              "text": "Retestez toutes les 6-8 semaines pendant les blocs d'entraînement — la FC de repos et le seuil lactique changent quand la forme s'améliore, donc les zones devraient être mises à jour en conséquence",
              "type": "info"
            }
          ]
        },
        "zoneBenefits": {
          "title": "Bénéfices d'Entraînement par Zone",
          "items": [
            {
              "text": "Zone 1 (Récupération) : Favorise la circulation sanguine pour la réparation musculaire, réduit le cortisol, et soutient la récupération active entre séances dures — le cœur peut se renforcer sans stress",
              "type": "info"
            },
            {
              "text": "Zone 2 (Endurance) : Construit la base aérobie, augmente la densité mitochondriale, améliore l'efficacité d'oxydation des graisses, et renforce les réseaux capillaires dans les muscles — la fondation de toute performance d'endurance",
              "type": "info"
            },
            {
              "text": "Zone 3 (Tempo) : Améliore le taux d'élimination du lactate, augmente le volume d'éjection cardiaque, et développe la capacité à soutenir des efforts modérément durs pour des périodes prolongées",
              "type": "info"
            },
            {
              "text": "Zone 4 (Seuil) : Élève le seuil lactique pour pouvoir soutenir des intensités plus hautes avant fatigue — critique pour la performance de course et capacité contre-la-montre",
              "type": "info"
            },
            {
              "text": "Zone 5 (VO2 Max) : Maximise la capacité de consommation d'oxygène, améliore le débit cardiaque, et développe la capacité à produire de la puissance à intensité aérobie maximale — essentiel pour intervalles et sprints finaux",
              "type": "warning"
            },
            {
              "text": "Zone Combustion Graisses : S'entraîner à 55-75% de FCMax brûle le plus haut pourcentage de calories provenant des réserves de graisses, mais la combustion calorique totale est plus basse que les zones plus hautes — les deux approches contribuent aux objectifs de composition corporelle",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calculs",
          "description": "Calculs de zones étape par étape utilisant différentes méthodes",
          "examples": [
            {
              "title": "Méthode Karvonen — Coureur 30 ans",
              "steps": [
                "Âge : 30, FC Repos : 60 bpm",
                "FCMax (Tanaka) : 208 − (0,7 × 30) = 187 bpm",
                "Réserve FC : 187 − 60 = 127 bpm",
                "Zone 2 bas : (127 × 0,60) + 60 = 136 bpm",
                "Zone 2 haut : (127 × 0,70) + 60 = 149 bpm",
                "Plage Zone 2 : 136-149 bpm (Endurance)"
              ],
              "result": "Zone 2 : 136-149 bpm — Allure conversationnelle facile"
            },
            {
              "title": "Méthode LTHR — Cycliste Compétitif",
              "steps": [
                "FC Seuil Lactique : 170 bpm (d'un CLM 30 min)",
                "Zone 1 : 170 × 0,68-0,83 = 116-141 bpm",
                "Zone 2 : 170 × 0,84-0,89 = 143-151 bpm",
                "Zone 4 : 170 × 0,96-1,00 = 163-170 bpm",
                "Décalage sport pour cyclisme : −5 bpm",
                "Zone 4 ajustée : 158-165 bpm"
              ],
              "result": "Zone 4 : 158-165 bpm — Intervalles seuil à vélo"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle formule de fréquence cardiaque maximale est la plus précise ?",
          "answer": "La formule Tanaka (208 − 0,7 × âge) s'est avérée plus précise sur une plus large gamme d'âges que la formule classique Fox (220 − âge), qui n'était jamais basée sur une recherche originale et a un écart-type de ±10-12 bpm. Les formules Gellish et Nes offrent une précision similaire à Tanaka. Cependant, toutes les formules basées sur l'âge sont des estimations — la seule façon vraiment précise de connaître votre FC max est par un test d'effort maximal supervisé par un professionnel."
        },
        {
          "question": "Qu'est-ce que la formule Karvonen et pourquoi est-elle meilleure ?",
          "answer": "La formule Karvonen calcule la fréquence cardiaque cible comme : FCCible = ((FCMax − FCRepos) × %intensité) + FCRepos. Elle est plus précise que les méthodes simples de pourcentage-de-max car elle tient compte de votre forme cardiovasculaire individuelle à travers la fréquence cardiaque de repos. Un athlète en forme avec une FC de repos de 45 obtient des zones différentes et plus appropriées qu'une personne sédentaire avec une FC de repos de 80, même au même âge."
        },
        {
          "question": "Pourquoi mes zones cyclisme sont-elles plus basses que mes zones course ?",
          "answer": "Pendant le cyclisme, vous utilisez moins de masse musculaire qu'en course (principalement jambes vs corps entier), votre poids corporel est soutenu par le vélo, et la position assise réduit les demandes de retour veineux. Cela signifie que votre cœur n'a pas besoin de travailler aussi dur à niveaux d'effort équivalents. La recherche montre que les fréquences cardiaques cyclisme sont typiquement 5-8 bpm plus basses que la course au même effort perçu, c'est pourquoi ce calculateur applique un décalage spécifique au sport."
        },
        {
          "question": "Qu'est-ce que la règle 80/20 dans l'entraînement fréquence cardiaque ?",
          "answer": "La règle 80/20 stipule qu'environ 80% de votre temps d'entraînement devrait être passé en zones basse intensité (Zone 1-2, sous seuil ventilatoire) et seulement 20% en zones haute intensité (Zone 3-5). Cette approche polarisée a été validée par la recherche sur athlètes d'endurance élites et produit constamment de meilleures améliorations de performance que s'entraîner principalement à intensité modérée. Le calculateur montre votre seuil 80/20 de fréquence cardiaque."
        },
        {
          "question": "Qu'est-ce qu'une bonne fréquence cardiaque de repos ?",
          "answer": "Pour les adultes, une fréquence cardiaque de repos entre 60-100 bpm est considérée normale. Cependant, les individus plus en forme ont typiquement des taux de repos plus bas : 60-69 bpm est bon, 50-59 bpm est excellent, et sous 50 bpm est typique d'athlètes bien entraînés. Une fréquence cardiaque de repos qui diminue sur des semaines d'entraînement est un des signes les plus clairs d'amélioration de la forme cardiovasculaire. Inversement, une FC repos élevée de 5+ bpm au-dessus de la normale un matin donné peut indiquer récupération incomplète ou maladie."
        },
        {
          "question": "La zone de combustion des graisses est-elle vraiment la meilleure pour la perte de poids ?",
          "answer": "C'est nuancé. S'entraîner dans la zone de combustion des graisses (55-75% FCMax) brûle effectivement un plus haut pourcentage de calories provenant des graisses. Cependant, l'exercice haute intensité brûle plus de calories totales par minute, incluant plus de grammes absolus de graisse. Pour la perte de poids, la dépense calorique totale importe plus que la source de carburant. La meilleure approche combine l'entraînement Zone 2 (soutenable, construit base aérobie) avec des séances haute intensité occasionnelles (booste métabolisme et EPOC — consommation d'oxygène post-exercice excessive)."
        },
        {
          "question": "Comment puis-je connaître ma fréquence cardiaque au seuil lactique ?",
          "answer": "Le test de terrain le plus simple est un contre-la-montre solo de 30 minutes à l'allure maximale que vous pouvez soutenir uniformément. Après un échauffement de 10 minutes, démarrez votre montre et allez aussi fort que vous pouvez maintenir pendant 30 minutes. Votre fréquence cardiaque moyenne pour les 20 dernières minutes de l'effort approxime votre LTHR. Pour des résultats plus précis, un test lactate en laboratoire avec échantillonnage sanguin à intensités croissantes est le gold standard."
        },
        {
          "question": "Dois-je ajuster les zones si je prends des bêta-bloquants ?",
          "answer": "Oui. Les bêta-bloquants abaissent votre fréquence cardiaque maximale et de repos, rendant les calculs de zones FC standards imprécis. Si vous prenez des bêta-bloquants ou autres médicaments affectant la fréquence cardiaque, consultez votre médecin pour des conseils. Vous pourriez vouloir utiliser l'Échelle d'Effort Perçu (RPE) comme guide d'intensité principal à la place : Zone 1 ressemble à 2-3/10, Zone 2 est 4-5/10, Zone 3 est 6-7/10, Zone 4 est 8/10, et Zone 5 est 9-10/10."
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
      "name": "Herzfrequenzzonen Rechner",
      "slug": "herzfrequenzzonen-rechner",
      "subtitle": "Erhalten Sie personalisierte Trainingszonen mit Karvonen, LT-HF oder 4 verschiedenen MaxHF-Formeln — mit sportspezifischen Anpassungen, Fettverbrennungszonen und Kalorienangaben",
      "breadcrumb": "Herzfrequenzzonen",
      "seo": {
        "title": "Herzfrequenzzonen Rechner — Karvonen, LT-HF & Multi-Formel",
        "description": "Berechnen Sie Ihre 5 personalisierten Herzfrequenz-Trainingszonen mit Karvonen, Laktatschwelle oder 4 MaxHF-Formeln. Inkl. sportspezifischen Anpassungen für Laufen, Radfahren und Schwimmen plus Kalorienverbrauch und 80/20-Trainingsverteilung.",
        "shortDescription": "Personalisierte Trainingszonen mit mehreren wissenschaftlichen Methoden",
        "keywords": [
          "herzfrequenz zonen rechner",
          "herzfrequenz trainingszonen",
          "karvonen formel rechner",
          "zielherzfrequenz rechner",
          "hf zonen rechner laufen",
          "radsport herzfrequenzzonen",
          "fettverbrennung herzfrequenzzone",
          "80/20 trainingszonen"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "gender": {
          "label": "Geschlecht",
          "helpText": "Beeinflusst die Berechnung der Fettverbrennungszone und RHF-Bewertung",
          "options": {
            "male": "Männlich",
            "female": "Weiblich"
          }
        },
        "age": {
          "label": "Alter",
          "helpText": "Wird zur Schätzung der maximalen Herzfrequenz verwendet, falls nicht gemessen"
        },
        "restingHR": {
          "label": "Ruheherzfrequenz",
          "helpText": "Morgens vor dem Aufstehen messen (ermöglicht die Karvonen-Methode)"
        },
        "knowsMaxHR": {
          "label": "Kennen Sie Ihre maximale Herzfrequenz?",
          "helpText": "Eine gemessene MaxHF aus einem Belastungstest oder Maximalversuch ist genauer als Formeln",
          "options": {
            "no": "Nein, schätzen",
            "yes": "Ja, ich habe sie getestet"
          }
        },
        "maxHR": {
          "label": "Maximale Herzfrequenz",
          "helpText": "Geben Sie die höchste Herzfrequenz ein, die bei maximaler Anstrengung oder im Belastungstest gemessen wurde"
        },
        "maxHRFormula": {
          "label": "Schätzungsformel",
          "helpText": "Tanaka (2001) ist im Allgemeinen genauer als die klassische 220-Alter-Formel",
          "options": {
            "fox": "Fox: 220 − Alter (klassisch)",
            "tanaka": "Tanaka: 208 − 0,7 × Alter (empfohlen)",
            "gellish": "Gellish: 206,9 − 0,67 × Alter",
            "nes": "Nes: 211 − 0,64 × Alter"
          }
        },
        "knowsLTHR": {
          "label": "Kennen Sie Ihre Laktatschwellen-HF?",
          "helpText": "LT-HF-basierte Zonen (Friel-Methode) sind für trainierte Athleten am präzisesten",
          "options": {
            "no": "Nein",
            "yes": "Ja, ich habe sie getestet"
          }
        },
        "lactateThresholdHR": {
          "label": "Laktatschwellen-Herzfrequenz",
          "helpText": "Ermittelt aus einem 30-Minuten-Zeitfahren oder Labortest — durchschnittliche HF der letzten 20 Minuten"
        },
        "sport": {
          "label": "Hauptsportart",
          "helpText": "Radsportzonen sind ~5 Schläge niedriger als Laufzonen; Schwimmen ~10 Schläge niedriger",
          "options": {
            "general": "Allgemeine Fitness",
            "running": "Laufen",
            "cycling": "Radfahren (−5 Schläge Versatz)",
            "swimming": "Schwimmen (−10 Schläge Versatz)"
          }
        },
        "weight": {
          "label": "Gewicht (optional)",
          "helpText": "Geben Sie Ihr Gewicht ein, um geschätzte Kalorienverbrennung pro Zone zu sehen"
        }
      },
      "inputGroups": {},
      "results": {
        "maxHR": {
          "label": "Maximale Herzfrequenz"
        },
        "zone1": {
          "label": "Zone 1 — Regeneration"
        },
        "zone2": {
          "label": "Zone 2 — Ausdauer"
        },
        "zone3": {
          "label": "Zone 3 — Tempo"
        },
        "zone4": {
          "label": "Zone 4 — Schwelle"
        },
        "zone5": {
          "label": "Zone 5 — VO2 Max"
        },
        "fatBurnZone": {
          "label": "Fettverbrennungszone"
        },
        "rhrAssessment": {
          "label": "Ruhe-HF Fitness"
        },
        "heartRateReserve": {
          "label": "Herzfrequenzreserve"
        },
        "eightyTwentyCutoff": {
          "label": "80/20-Trainingsverteilung"
        }
      },
      "tooltips": {
        "maxHR": "Die höchste Herzfrequenz, die Ihr Herz bei maximaler Anstrengung sicher erreichen kann",
        "zone1": "Leichte Belastung — Regenerationsläufe, Aufwärmen, Abkühlen. Sie können bequem singen",
        "zone2": "Moderate Belastung — die aerobe Grundlagenzone. Sie können leicht sprechen. Das meiste Training sollte hier stattfinden",
        "zone3": "Mäßig schwer — Tempopace. Nur kurze Sätze. Entwickelt Geschwindigkeit und Laktattoleranz",
        "zone4": "Schwere Belastung — an oder nahe der Laktatschwelle. Nur wenige Worte. Verbessert die maximale Dauergeschwindigkeit",
        "zone5": "Maximale Anstrengung — VO2-Max-Intervalle. Sprechen unmöglich. Nur 1–5 Minuten durchhaltbar",
        "fatBurnZone": "Der Herzfrequenzbereich, in dem Ihr Körper den höchsten Prozentsatz an Kalorien aus Fett verbrennt",
        "rhrAssessment": "Wie Ihre Ruheherzfrequenz im Vergleich zu Bevölkerungsnormen abschneidet — niedriger bedeutet generell fitter",
        "heartRateReserve": "Die Differenz zwischen Ihrer maximalen HF und Ruhe-HF — wird in der Karvonen-Formel verwendet",
        "eightyTwentyCutoff": "Die HF, über der nur 20% Ihres wöchentlichen Trainingsumfangs stattfinden sollte"
      },
      "presets": {
        "beginner": {
          "label": "Anfänger",
          "description": "Neu im Training, 35 Jahre, RHF 75, allgemeine Fitness"
        },
        "weekendRunner": {
          "label": "Wochenendläufer",
          "description": "Freizeitläufer, 30 Jahre, RHF 65"
        },
        "seriousRunner": {
          "label": "Ambitionierter Läufer",
          "description": "Strukturiertes Training, 28 Jahre, RHF 52"
        },
        "eliteCyclist": {
          "label": "Elite-Radfahrer",
          "description": "Wettkampfradfahrer, 32 Jahre, RHF 46, bekannte LT-HF"
        }
      },
      "values": {
        "bpm": "Schläge/min",
        "cal/min": "Kal/min",
        "N/A": "Nicht verfügbar",
        "Measured": "Gemessen",
        "Fox (220−age)": "Fox (220−Alter)",
        "Tanaka": "Tanaka",
        "Gellish": "Gellish",
        "Nes": "Nes",
        "Karvonen (HRR)": "Karvonen (HFR)",
        "%MaxHR": "%MaxHF",
        "LTHR (Friel)": "LT-HF (Friel)",
        "Recovery": "Regeneration",
        "Endurance": "Ausdauer",
        "Tempo": "Tempo",
        "Threshold": "Schwelle",
        "VO2 Max": "VO2 Max",
        "Athlete": "Athlet",
        "Excellent": "Ausgezeichnet",
        "Good": "Gut",
        "Average": "Durchschnitt",
        "Below Average": "Unterdurchschnittlich",
        "Poor": "Schlecht",
        "below": "unter",
        "above": "über",
        "Can sing": "Kann singen",
        "Can talk easily": "Kann leicht sprechen",
        "Short sentences": "Kurze Sätze",
        "Few words only": "Nur wenige Worte",
        "Cannot talk": "Kann nicht sprechen"
      },
      "formats": {
        "summary": "Max HF: {maxHF} Schläge/min ({formula}). Zone 2 (Ausdauer): {z2Low}–{z2High} Schläge/min. Fettverbrennung: {fatLow}–{fatHigh} Schläge/min. 80/20-Grenze: {cutoff} Schläge/min. Methode: {method}."
      },
      "chart": {
        "title": "Herzfrequenzzonen-Bereiche",
        "xLabel": "Zone",
        "yLabel": "Herzfrequenz (Schläge/min)",
        "series": {
          "base": "",
          "z1Range": "Z1 Regeneration",
          "z2Range": "Z2 Ausdauer",
          "z3Range": "Z3 Tempo",
          "z4Range": "Z4 Schwelle",
          "z5Range": "Z5 VO2 Max"
        }
      },
      "infoCards": {
        "zones": {
          "title": "🏃 Ihre Trainingszonen"
        },
        "insights": {
          "title": "📊 Fitness-Erkenntnisse"
        },
        "tips": {
          "title": "💡 Trainingstipps",
          "items": [
            "Führen Sie 80% Ihres wöchentlichen Trainings in Zone 1–2 und nur 20% in Zone 3–5 durch für optimale Fortschritte",
            "Messen Sie die Ruhe-HF morgens vor dem Aufstehen für 3 Tage und verwenden Sie den Durchschnitt für beste Genauigkeit",
            "Herzfrequenzzonen unterscheiden sich zwischen Sportarten — Radsportzonen sind 5–8 Schläge niedriger als Laufzonen",
            "Wenn Sie Betablocker oder andere HF-beeinflussende Medikamente nehmen, verwenden Sie RPE (wahrgenommene Anstrengung) statt HF-Zonen"
          ]
        }
      },
      "referenceData": {},
      "education": {
        "whatAre": {
          "title": "Was sind Herzfrequenz-Trainingszonen?",
          "content": "Herzfrequenz-Trainingszonen sind Bereiche von Herzschlägen pro Minute, die verschiedenen Trainingsintensitäten und physiologischen Reaktionen entsprechen. Durch Training in bestimmten Zonen können Sie gezielte Anpassungen erreichen — vom Aufbau der aeroben Ausdauer bis zur Verbesserung Ihrer VO2-Max. Das am weitesten verbreitete Modell teilt die Anstrengung in fünf Zonen: Zone 1 (50–60% Intensität) für Regeneration, Zone 2 (60–70%) für aerobe Grundlagenbildung und Fettverbrennung, Zone 3 (70–80%) für Tempo und Laktattoleranz, Zone 4 (80–90%) für Schwellentraining und Zone 5 (90–100%) für VO2-Max-Intervalle. Forschung zeigt durchgehend, dass Athleten, die mit Herzfrequenzmessung trainieren, sich schneller verbessern und das Verletzungsrisiko reduzieren, weil sie den häufigen Fehler vermeiden, an leichten Tagen zu hart und an harten Tagen zu leicht zu trainieren. Die Schlüsselerkenntnis, die das Ausdauertraining transformiert hat, ist die 80/20-Regel: etwa 80% des Trainingsvolumens sollte in Zone 1–2 (unter der Ventilationsschwelle) stattfinden, während nur 20% in Zone 3–5 sein sollten. Dieser polarisierte Ansatz, validiert durch Jahrzehnte der Forschung an Elite-Ausdauerathleten, erzeugt bessere Anpassungen als die meiste Trainingszeit bei moderater Intensität zu verbringen."
        },
        "methods": {
          "title": "Karvonen vs. Einfache Prozentsatz vs. LT-HF-Methoden",
          "content": "Es gibt drei Hauptansätze zur Berechnung von Herzfrequenzzonen, jeweils mit unterschiedlichen Genauigkeitsgraden. Die einfachste Methode multipliziert Ihre geschätzte maximale Herzfrequenz mit Zonenprozentsätzen (z.B. Zone 2 = 60–70% der MaxHF). Dies ist einfach, aber ungenau, weil es die individuelle Fitness ignoriert. Die Karvonen-Methode, entwickelt vom finnischen Physiologen Martti Karvonen 1957, ist genauer, weil sie Ihre Herzfrequenzreserve (HFR = MaxHF − Ruhe-HF) zur Zonenberechnung verwendet: Ziel-HF = (HFR × %Intensität) + Ruhe-HF. Durch die Einbeziehung der Ruheherzfrequenz berücksichtigt die Karvonen-Formel die individuelle kardiovaskuläre Fitness — ein trainierter Athlet mit einer Ruhe-HF von 45 Schlägen/min bekommt sehr unterschiedliche Zonen als ein Anfänger mit 78 Schlägen/min, selbst wenn beide die gleiche Max-HF haben. Die präziseste Methode verwendet Ihre Laktatschwellen-Herzfrequenz (LT-HF), ermittelt durch ein 30-Minuten-Zeitfahren oder Labortest. Die Friel-Methode berechnet alle Zonen als Prozentsätze der LT-HF, die direkt die physiologische Grenze zwischen nachhaltiger aerober Anstrengung und nicht nachhaltiger anaerober Anstrengung darstellt. Für Wettkampfathleten sind LT-HF-basierte Zonen der Goldstandard, weil sie Zonen an tatsächlichen metabolischen Schwellen ausrichten, anstatt an geschätzten Prozentsätzen."
        },
        "howToMeasure": {
          "title": "Wie Sie Ihre Herzfrequenz genau messen",
          "items": [
            {
              "text": "Ruhe-HF: Morgens vor dem Aufstehen messen — 60 volle Sekunden zählen oder Brustgurt-Monitor für 3 aufeinanderfolgende Morgen verwenden und Durchschnitt bilden",
              "type": "info"
            },
            {
              "text": "Max-HF-Test: Nach gründlichem Aufwärmen einen steilen Hügel 2–3 Minuten mit maximaler Anstrengung hinauflaufen, erholen, zweimal wiederholen — der höchste Wert ist Ihre ungefähre Max-HF",
              "type": "info"
            },
            {
              "text": "LT-HF-Test: 10 Minuten aufwärmen, dann 30-Minuten-Solo-Zeitfahren mit maximaler nachhaltiger Anstrengung — Ihre durchschnittliche HF der letzten 20 Minuten ist Ihre LT-HF",
              "type": "info"
            },
            {
              "text": "Verwenden Sie einen Brustgurt-Herzfrequenzmesser für Tests — handgelenkbasierte optische Sensoren können bei hochintensivem Training um 5–15 Schläge/min ungenau sein",
              "type": "warning"
            },
            {
              "text": "Verwenden Sie die 220-minus-Alter-Formel nicht als Evangelium — sie hat eine Standardabweichung von ±10–12 Schlägen/min, bedeutet Ihre wahre Max könnte 20+ Schläge/min von der Schätzung abweichen",
              "type": "warning"
            },
            {
              "text": "Alle 6–8 Wochen während Trainingsblöcken neu testen — sowohl Ruhe-HF als auch Laktatschwelle ändern sich mit verbesserter Fitness, also sollten Zonen entsprechend aktualisiert werden",
              "type": "info"
            }
          ]
        },
        "zoneBenefits": {
          "title": "Trainingsvorteile nach Zone",
          "items": [
            {
              "text": "Zone 1 (Regeneration): Fördert Durchblutung für Muskelreparatur, reduziert Cortisol und unterstützt aktive Erholung zwischen harten Einheiten — Herz kann sich ohne Stress stärken",
              "type": "info"
            },
            {
              "text": "Zone 2 (Ausdauer): Baut aerobe Basis auf, erhöht Mitochondriendichte, verbessert Fettoxidationseffizienz und verstärkt Kapillarnetzwerke in Muskeln — das Fundament aller Ausdauerleistung",
              "type": "info"
            },
            {
              "text": "Zone 3 (Tempo): Verbessert Laktatabbaurate, erhöht Herz-Schlagvolumen und entwickelt die Fähigkeit, mäßig harte Anstrengungen über längere Zeiträume aufrechtzuerhalten",
              "type": "info"
            },
            {
              "text": "Zone 4 (Schwelle): Erhöht Laktatschwelle, so dass Sie höhere Intensitäten vor Ermüdung aufrechterhalten können — kritisch für Rennleistung und Zeitfahrfähigkeit",
              "type": "info"
            },
            {
              "text": "Zone 5 (VO2 Max): Maximiert Sauerstoffaufnahmekapazität, verbessert Herzminutenvolumen und entwickelt die Fähigkeit, Leistung bei maximaler aerober Intensität zu produzieren — wesentlich für Intervalle und Endspurts",
              "type": "warning"
            },
            {
              "text": "Fettverbrennungszone: Training bei 55–75% der MaxHF verbrennt den höchsten Prozentsatz an Kalorien aus Fettspeichern, aber der Gesamtkalorienverbrauch ist niedriger als in höheren Zonen — beide Ansätze tragen zu Körperzusammensetzungszielen bei",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Berechnungsbeispiele",
          "description": "Schritt-für-Schritt Zonenberechnungen mit verschiedenen Methoden",
          "examples": [
            {
              "title": "Karvonen-Methode — 30-jähriger Läufer",
              "steps": [
                "Alter: 30, Ruhe-HF: 60 Schläge/min",
                "MaxHF (Tanaka): 208 − (0,7 × 30) = 187 Schläge/min",
                "Herzfrequenzreserve: 187 − 60 = 127 Schläge/min",
                "Zone 2 niedrig: (127 × 0,60) + 60 = 136 Schläge/min",
                "Zone 2 hoch: (127 × 0,70) + 60 = 149 Schläge/min",
                "Zone 2 Bereich: 136–149 Schläge/min (Ausdauer)"
              ],
              "result": "Zone 2: 136–149 Schläge/min — Leichtes Gesprächstempo"
            },
            {
              "title": "LT-HF-Methode — Wettkampfradfahrer",
              "steps": [
                "Laktatschwellen-HF: 170 Schläge/min (aus 30-Min-ZF)",
                "Zone 1: 170 × 0,68–0,83 = 116–141 Schläge/min",
                "Zone 2: 170 × 0,84–0,89 = 143–151 Schläge/min",
                "Zone 4: 170 × 0,96–1,00 = 163–170 Schläge/min",
                "Sportversatz für Radfahren: −5 Schläge/min",
                "Angepasste Zone 4: 158–165 Schläge/min"
              ],
              "result": "Zone 4: 158–165 Schläge/min — Schwellenintervalle auf dem Rad"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Welche Max-Herzfrequenz-Formel ist am genauesten?",
          "answer": "Die Tanaka-Formel (208 − 0,7 × Alter) hat sich als genauer über einen größeren Altersbereich erwiesen als die klassische Fox-Formel (220 − Alter), die nie auf ursprünglicher Forschung basierte und eine Standardabweichung von ±10–12 Schlägen/min hat. Die Gellish- und Nes-Formeln bieten ähnliche Genauigkeit wie Tanaka. Jedoch sind alle altersbasierten Formeln Schätzungen — der einzig wirklich genaue Weg, Ihre Max-HF zu kennen, ist durch einen Maximalbelastungstest unter professioneller Aufsicht."
        },
        {
          "question": "Was ist die Karvonen-Formel und warum ist sie besser?",
          "answer": "Die Karvonen-Formel berechnet die Zielherzfrequenz als: ZHF = ((MaxHF − RuheHF) × %Intensität) + RuheHF. Sie ist genauer als einfache Prozent-vom-Maximum-Methoden, weil sie Ihre individuelle kardiovaskuläre Fitness durch die Ruheherzfrequenz berücksichtigt. Ein fitter Athlet mit einer Ruhe-HF von 45 bekommt andere, angemessenere Zonen als eine untrainierte Person mit einer Ruhe-HF von 80, selbst im gleichen Alter."
        },
        {
          "question": "Warum sind meine Radsportzonen niedriger als meine Laufzonen?",
          "answer": "Beim Radfahren verwenden Sie weniger Muskelmasse als beim Laufen (hauptsächlich Beine vs. Ganzkörper), Ihr Körpergewicht wird vom Rad getragen, und die sitzende Position reduziert die venösen Rückflussanforderungen. Das bedeutet, Ihr Herz muss bei gleichwertigen Anstrengungsgraden nicht so hart arbeiten. Forschung zeigt, dass Radsport-Herzfrequenzen typischerweise 5–8 Schläge/min niedriger sind als Laufen bei der gleichen wahrgenommenen Anstrengung, weshalb dieser Rechner einen sportspezifischen Versatz anwendet."
        },
        {
          "question": "Was ist die 80/20-Regel im Herzfrequenztraining?",
          "answer": "Die 80/20-Regel besagt, dass etwa 80% Ihrer Trainingszeit in niedrigintensiven Zonen (Zone 1–2, unter der Ventilationsschwelle) und nur 20% in hochintensiven Zonen (Zone 3–5) verbracht werden sollte. Dieser polarisierte Ansatz wurde durch Forschung an Elite-Ausdauerathleten validiert und produziert durchgehend bessere Leistungsverbesserungen als Training hauptsächlich bei moderater Intensität. Der Rechner zeigt Ihre 80/20-Grenz-Herzfrequenz."
        },
        {
          "question": "Was ist eine gute Ruheherzfrequenz?",
          "answer": "Für Erwachsene gilt eine Ruheherzfrequenz zwischen 60–100 Schlägen/min als normal. Jedoch haben fittere Personen typischerweise niedrigere Ruhewerte: 60–69 Schläge/min ist gut, 50–59 Schläge/min ist ausgezeichnet, und unter 50 Schlägen/min ist typisch für gut trainierte Athleten. Eine sinkende Ruheherzfrequenz über Trainingswochen ist eines der klarsten Zeichen verbesserter kardiovaskulärer Fitness. Umgekehrt kann eine um 5+ Schläge/min über dem Normalwert erhöhte Ruhe-HF an einem gegebenen Morgen auf unvollständige Erholung oder Krankheit hinweisen."
        },
        {
          "question": "Ist die Fettverbrennungszone wirklich am besten für Gewichtsverlust?",
          "answer": "Es ist nuanciert. Training in der Fettverbrennungszone (55–75% MaxHF) verbrennt tatsächlich einen höheren Prozentsatz an Kalorien aus Fett. Jedoch verbrennt hochintensives Training mehr Gesamtkalorien pro Minute, einschließlich mehr absoluter Gramm Fett. Für Gewichtsverlust ist der Gesamtkalorienverbrauch wichtiger als die Brennstoffquelle. Der beste Ansatz kombiniert Zone-2-Training (nachhaltig, baut aerobe Basis auf) mit gelegentlichen hochintensiven Einheiten (steigert Stoffwechsel und EPOC — überschüssiger Sauerstoffverbrauch nach dem Training)."
        },
        {
          "question": "Wie kenne ich meine Laktatschwellen-Herzfrequenz?",
          "answer": "Der einfachste Feldtest ist ein 30-Minuten-Solo-Zeitfahren im maximalen Tempo, das Sie gleichmäßig aufrechterhalten können. Nach einem 10-Minuten-Aufwärmen starten Sie Ihre Uhr und gehen so hart, wie Sie 30 Minuten aufrechterhalten können. Ihre durchschnittliche Herzfrequenz der letzten 20 Minuten der Anstrengung approximiert Ihre LT-HF. Für genauere Ergebnisse ist ein laborbasierter Laktattest mit Blutprobenentnahme bei steigenden Intensitäten der Goldstandard."
        },
        {
          "question": "Sollte ich Zonen anpassen, wenn ich Betablocker nehme?",
          "answer": "Ja. Betablocker senken Ihre maximale Herzfrequenz und Ruheherzfrequenz, wodurch Standard-HF-Zonenberechnungen ungenau werden. Wenn Sie Betablocker oder andere herzfrequenzbeeinflussende Medikamente nehmen, konsultieren Sie Ihren Arzt für Anleitung. Sie möchten möglicherweise die Wahrgenommene Anstrengungsskala (RPE) als Ihren primären Intensitätsführer verwenden: Zone 1 fühlt sich wie 2–3/10 an, Zone 2 ist 4–5/10, Zone 3 ist 6–7/10, Zone 4 ist 8/10, und Zone 5 ist 9–10/10."
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
