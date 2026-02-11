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
    },
    {
      id: "ohpModerate",
      icon: "💪",
      values: { exercise: "overheadPress", weight: 135, reps: 8, formula: "average", bodyweight: null },
    },
  ],

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
        exercise: {
          label: "Exercise",
          helpText: "Select the exercise you performed",
          options: {
            benchPress: "Bench Press",
            backSquat: "Back Squat",
            deadlift: "Deadlift (Conventional)",
            overheadPress: "Overhead Press (OHP)",
            barbellRow: "Barbell Row",
            frontSquat: "Front Squat",
            inclineBench: "Incline Bench Press",
            romanianDeadlift: "Romanian Deadlift (RDL)",
            hipThrust: "Hip Thrust",
            legPress: "Leg Press",
          },
        },
        reps: { label: "Repetitions", helpText: "Reps completed with proper form (1-15)" },
        formula: {
          label: "Estimation Formula",
          helpText: "Average of all 7 formulas is recommended for best accuracy",
          options: {
            average: "Average (Recommended)",
            epley: "Epley",
            brzycki: "Brzycki",
            lombardi: "Lombardi",
            mayhew: "Mayhew et al.",
            wathen: "Wathen",
            oconner: "O'Conner et al.",
            lander: "Lander",
          },
        },
        bodyweight: {
          label: "Your Bodyweight (Optional)",
          helpText: "See your strength level: Beginner, Intermediate, Advanced, or Elite",
        },
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
        ohpModerate: { label: "Overhead Press", description: "135 lbs × 8 reps" },
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
    es: {
      "name": "Calculadora de Repetición Máxima",
      "slug": "calculadora-repeticion-maxima",
      "subtitle": "Estima tu máximo de una repetición usando 7 fórmulas comprobadas con calculadora de calentamiento y estándares de fuerza",
      "breadcrumb": "Repetición Máxima",
      "seo": {
        "title": "Calculadora de Repetición Máxima (1RM) - 7 Fórmulas + Calentamiento | Herramienta Gratuita",
        "description": "Calcula tu repetición máxima (1RM) usando 7 fórmulas científicamente validadas. Obtén series de calentamiento personalizadas, pesos de zonas de entrenamiento, estándares de fuerza por peso corporal y ve tu clasificación. Herramienta gratuita con soporte kg/lb para press de banca, sentadilla, peso muerto y más.",
        "shortDescription": "Estima tu 1RM con 7 fórmulas, calculadora de calentamiento y estándares de fuerza",
        "keywords": [
          "calculadora repeticion maxima",
          "calculadora 1RM",
          "maximo una repeticion",
          "maximo press banca",
          "calculadora maximo sentadilla",
          "maximo peso muerto",
          "calculadora fuerza",
          "calculadora calentamiento",
          "estandares fuerza"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "exercise": {
          "label": "Ejercicio",
          "helpText": "Selecciona el ejercicio que realizaste",
          "options": {
            "benchPress": "Press de Banca",
            "backSquat": "Sentadilla Trasera",
            "deadlift": "Peso Muerto (Convencional)",
            "overheadPress": "Press Militar",
            "barbellRow": "Remo con Barra",
            "frontSquat": "Sentadilla Frontal",
            "inclineBench": "Press Inclinado",
            "romanianDeadlift": "Peso Muerto Rumano",
            "hipThrust": "Empuje de Cadera",
            "legPress": "Prensa de Piernas"
          }
        },
        "reps": {
          "label": "Repeticiones",
          "helpText": "Repeticiones completadas con forma correcta (1-15)"
        },
        "formula": {
          "label": "Fórmula de Estimación",
          "helpText": "Se recomienda el promedio de las 7 fórmulas para mejor precisión",
          "options": {
            "average": "Promedio (Recomendado)",
            "epley": "Epley",
            "brzycki": "Brzycki",
            "lombardi": "Lombardi",
            "mayhew": "Mayhew et al.",
            "wathen": "Wathen",
            "oconner": "O'Conner et al.",
            "lander": "Lander"
          }
        },
        "bodyweight": {
          "label": "Tu Peso Corporal (Opcional)",
          "helpText": "Ve tu nivel de fuerza: Principiante, Intermedio, Avanzado o Élite"
        }
      },
      "inputGroups": {},
      "results": {
        "oneRepMax": {
          "label": "1RM Estimado"
        },
        "maxStrength": {
          "label": "🔴 Fuerza Máxima (95%)"
        },
        "strength": {
          "label": "🟠 Fuerza (85%)"
        },
        "hypertrophy": {
          "label": "🟡 Hipertrofia (75%)"
        },
        "endurance": {
          "label": "🟢 Resistencia (65%)"
        },
        "speedPower": {
          "label": "🔵 Velocidad y Potencia (55%)"
        },
        "warmUp": {
          "label": "⚪ Calentamiento (50%)"
        }
      },
      "presets": {
        "benchIntermediate": {
          "label": "Press de Banca",
          "description": "102 kg × 5 reps"
        },
        "squatAdvanced": {
          "label": "Sentadilla Trasera",
          "description": "143 kg × 3 reps"
        },
        "deadliftHeavy": {
          "label": "Peso Muerto",
          "description": "184 kg × 2 reps"
        },
        "ohpModerate": {
          "label": "Press Militar",
          "description": "61 kg × 8 reps"
        }
      },
      "tooltips": {
        "oneRepMax": "El peso máximo que puedes levantar por una repetición con forma correcta",
        "maxStrength": "95% del 1RM — 1-2 reps × 3-5 series para fuerza máxima",
        "strength": "85% del 1RM — 3-5 reps × 4-6 series para desarrollo de fuerza",
        "hypertrophy": "75% del 1RM — 8-12 reps × 3-4 series para crecimiento muscular",
        "endurance": "65% del 1RM — 12-15 reps × 2-3 series para resistencia muscular",
        "speedPower": "55% del 1RM — 3-5 reps explosivas × 3-5 series para potencia",
        "warmUp": "50% del 1RM — Peso recomendado para series de calentamiento"
      },
      "values": {
        "kg": "kg",
        "lbs": "lb",
        "reps": "reps",
        "sets": "series",
        "min": "min",
        "Bench Press": "Press de Banca",
        "Back Squat": "Sentadilla Trasera",
        "Deadlift": "Peso Muerto",
        "Overhead Press": "Press Militar",
        "Barbell Row": "Remo con Barra",
        "Front Squat": "Sentadilla Frontal",
        "Incline Bench": "Press Inclinado",
        "Romanian Deadlift": "Peso Muerto Rumano",
        "Hip Thrust": "Empuje de Cadera",
        "Leg Press": "Prensa de Piernas",
        "Epley": "Epley",
        "Brzycki": "Brzycki",
        "Lombardi": "Lombardi",
        "Mayhew": "Mayhew et al.",
        "Wathen": "Wathen",
        "O'Conner": "O'Conner et al.",
        "Lander": "Lander",
        "Average": "Promedio (7 fórmulas)",
        "Max Strength": "Fuerza Máxima",
        "Strength": "Fuerza",
        "Hypertrophy": "Hipertrofia",
        "Endurance": "Resistencia",
        "Speed / Power": "Velocidad / Potencia",
        "Warm-Up": "Calentamiento",
        "Beginner": "Principiante",
        "Intermediate": "Intermedio",
        "Advanced": "Avanzado",
        "Elite": "Élite"
      },
      "detailedTable": {
        "percentageChart": {
          "button": "Ver Tabla de Porcentajes",
          "title": "Tabla de Porcentajes 1RM",
          "columns": {
            "percent": "% del 1RM",
            "weight": "Peso",
            "reps": "~Reps",
            "goal": "Objetivo de Entrenamiento"
          }
        }
      },
      "formats": {
        "summary": "Tu 1RM estimado para {exercise} es {oneRepMax} usando la fórmula {formula}. Para hipertrofia, carga {hypertrophy}. Para fuerza, carga {strength}."
      },
      "infoCards": {
        "formulaComparison": {
          "title": "📊 Las 7 Fórmulas",
          "items": [
            {
              "label": "Promedio (Recomendado)",
              "valueKey": "average"
            },
            {
              "label": "Epley",
              "valueKey": "epley"
            },
            {
              "label": "Brzycki",
              "valueKey": "brzycki"
            },
            {
              "label": "Lombardi",
              "valueKey": "lombardi"
            },
            {
              "label": "Mayhew et al.",
              "valueKey": "mayhew"
            },
            {
              "label": "Wathen",
              "valueKey": "wathen"
            },
            {
              "label": "O'Conner et al.",
              "valueKey": "oconner"
            },
            {
              "label": "Lander",
              "valueKey": "lander"
            }
          ]
        },
        "warmupProgression": {
          "title": "🔥 Progresión de Calentamiento",
          "items": [
            {
              "label": "Serie 1 (40%)",
              "valueKey": "warmup1"
            },
            {
              "label": "Serie 2 (50%)",
              "valueKey": "warmup2"
            },
            {
              "label": "Serie 3 (60%)",
              "valueKey": "warmup3"
            },
            {
              "label": "Serie 4 (70%)",
              "valueKey": "warmup4"
            },
            {
              "label": "Serie 5 (80%)",
              "valueKey": "warmup5"
            },
            {
              "label": "Serie 6 (90%)",
              "valueKey": "warmup6"
            }
          ]
        },
        "strengthLevel": {
          "title": "🏅 Tu Nivel de Fuerza",
          "items": [
            {
              "label": "Tu Nivel",
              "valueKey": "strengthLevel"
            },
            {
              "label": "Principiante",
              "valueKey": "beginnerRange"
            },
            {
              "label": "Intermedio",
              "valueKey": "intermediateRange"
            },
            {
              "label": "Avanzado",
              "valueKey": "advancedRange"
            },
            {
              "label": "Élite",
              "valueKey": "eliteRange"
            }
          ]
        }
      },
      "referenceData": {
        "trainingZones": {
          "title": "Zonas de Entrenamiento por % del 1RM",
          "items": {
            "maxStrength": {
              "label": "Fuerza Máxima (93-100%)",
              "value": "1-2 reps × 3-5 series | Descanso 3-5 min"
            },
            "strength": {
              "label": "Fuerza (83-90%)",
              "value": "3-5 reps × 4-6 series | Descanso 2-4 min"
            },
            "hypertrophy": {
              "label": "Hipertrofia (67-80%)",
              "value": "8-12 reps × 3-4 series | Descanso 1-2 min"
            },
            "endurance": {
              "label": "Resistencia (60-70%)",
              "value": "12-20 reps × 2-3 series | Descanso 30-60s"
            },
            "speedPower": {
              "label": "Velocidad y Potencia (50-60%)",
              "value": "3-5 reps explosivas × 3-5 series | Descanso 2-3 min"
            }
          }
        }
      },
      "chart": {
        "title": "Tabla de Porcentajes 1RM",
        "xLabel": "% del 1RM",
        "yLabel": "Peso",
        "series": {
          "weight": "Peso de Entrenamiento"
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es la Repetición Máxima (1RM)?",
          "content": "Tu máximo de una repetición (1RM) es el peso más pesado que puedes levantar para una sola repetición de un ejercicio dado manteniendo la forma correcta. Es el estándar dorado para medir la fuerza máxima en el entrenamiento con pesas y se usa ampliamente en competiciones de powerlifting, pruebas atléticas y programación de entrenamientos. En lugar de probar tu máximo verdadero directamente — que conlleva mayor riesgo de lesión — la mayoría de atletas y entrenadores usan fórmulas de estimación submáximas. Estas fórmulas toman un peso que puedes levantar por múltiples repeticiones y predicen matemáticamente cuál sería tu máximo de una sola repetición. Este enfoque es más seguro, rápido y notablemente preciso cuando se usan series de 2-10 repeticiones. Conocer tu 1RM te permite calibrar precisamente la intensidad de tu entrenamiento, asegurando que levantes lo suficientemente pesado para estimular ganancias de fuerza mientras mantienes la seguridad suficiente para entrenar consistentemente a lo largo del tiempo."
        },
        "formulas": {
          "title": "Cómo Funcionan las Fórmulas de 1RM",
          "content": "Esta calculadora implementa siete fórmulas científicamente validadas, cada una desarrollada a partir de investigación en diferentes poblaciones y rangos de repeticiones. La fórmula de Epley (1985) es la más usada en gimnasios comerciales y funciona mejor para el rango general de 1-10 repeticiones. La fórmula de Brzycki (1993) proporciona estimaciones más conservadoras y es preferida en entornos de investigación NCAA. La fórmula de Wathen (1994) es recomendada por la NSCA y es particularmente precisa para atletas explosivos. La fórmula de Lombardi (1989) usa una función de potencia no lineal que funciona mejor en rangos de repeticiones más altos. Mayhew et al. (1992) desarrollaron su fórmula basada en regresión usando datos de poblaciones diversas incluyendo individuos entrenados y no entrenados. Lander (1985) y O'Conner et al. (1989) completan el conjunto con fórmulas validadas en poblaciones competitivas y generales respectivamente. Cuando seleccionas 'Promedio', la calculadora computa las siete estimaciones y devuelve la media, lo cual la investigación sugiere que reduce el sesgo de fórmulas individuales y proporciona la estimación general más confiable."
        },
        "trainingZones": {
          "title": "Usando tu 1RM para Entrenar",
          "cards": [
            {
              "title": "Fuerza Máxima",
              "icon": "🔴",
              "description": "93-100% del 1RM para 1-2 reps. Desarrolla producción máxima de fuerza e impulso neural. Descansa 3-5 minutos entre series. Mejor para powerlifters y atletas de fuerza preparándose para competición."
            },
            {
              "title": "Fuerza",
              "icon": "🟠",
              "description": "83-90% del 1RM para 3-5 reps. Construye fuerza pura sin la fatiga del máximo verdadero. Descansa 2-4 minutos. El punto óptimo para la mayoría de programas de entrenamiento de fuerza y levantadores intermedios."
            },
            {
              "title": "Hipertrofia",
              "icon": "🟡",
              "description": "67-80% del 1RM para 8-12 reps. Rango óptimo para crecimiento muscular a través de tensión mecánica y estrés metabólico. Descansa 1-2 minutos. El rango clásico de repeticiones de culturismo que funciona para todos."
            },
            {
              "title": "Resistencia",
              "icon": "🟢",
              "description": "60-70% del 1RM para 12-20 reps. Construye resistencia muscular, capacidad de trabajo y resistencia del tejido conectivo. Descansa 30-60 segundos. Excelente para fases de acondicionamiento y principiantes."
            },
            {
              "title": "Velocidad y Potencia",
              "icon": "🔵",
              "description": "50-60% del 1RM para 3-5 reps explosivas. Enfócate en mover la barra tan rápido como sea posible. Descansa 2-3 minutos entre series. Esencial para atletas en deportes que requieren movimientos explosivos."
            }
          ]
        },
        "howToTest": {
          "title": "Cómo Obtener Estimaciones Precisas",
          "items": [
            {
              "text": "Usa un peso que puedas levantar por 2-10 reps con forma correcta — la precisión cae significativamente por encima de 10 reps",
              "type": "info"
            },
            {
              "text": "Prueba cuando estés completamente recuperado — la fatiga, mal sueño y estrés reducen tu capacidad verdadera y sesgan los resultados",
              "type": "info"
            },
            {
              "text": "Para la serie cuando la forma se rompa — solo cuenta repeticiones limpias de rango completo con técnica adecuada",
              "type": "warning"
            },
            {
              "text": "Cada ejercicio tiene su propio 1RM — nunca apliques tu máximo de press de banca a tu sentadilla o peso muerto",
              "type": "warning"
            },
            {
              "text": "Re-evalúa cada 4-8 semanas según progreses — tu 1RM cambia conforme te vuelves más fuerte",
              "type": "info"
            },
            {
              "text": "Conteos de repeticiones más bajos (3-5) dan estimaciones más precisas que conteos más altos (8-10+)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo",
          "description": "Cálculos paso a paso de 1RM usando diferentes fórmulas",
          "examples": [
            {
              "title": "Press de Banca: 102 kg × 5 reps",
              "steps": [
                "Epley: 102 × (1 + 5/30) = 102 × 1.167 = 119 kg",
                "Brzycki: 102 × 36/(37-5) = 102 × 1.125 = 115 kg",
                "Lombardi: 102 × 5^0.10 = 102 × 1.175 = 120 kg",
                "Promedio de las 7 fórmulas ≈ 117 kg"
              ],
              "result": "1RM Estimado: ~117 kg → Fuerza (85%): 99 kg | Hipertrofia (75%): 88 kg"
            },
            {
              "title": "Sentadilla Trasera: 140 kg × 3 reps",
              "steps": [
                "Epley: 140 × (1 + 3/30) = 140 × 1.10 = 154 kg",
                "Brzycki: 140 × 36/(37-3) = 140 × 1.059 = 148 kg",
                "Wathen: 100×140 / (48.8 + 53.8×e^(−0.075×3)) ≈ 153 kg",
                "Promedio de las 7 fórmulas ≈ 151 kg"
              ],
              "result": "1RM Estimado: ~151 kg → Fuerza (85%): 128 kg | Hipertrofia (75%): 113 kg"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Qué tan precisa es la calculadora de repetición máxima?",
          "answer": "Al usar series de 2-10 reps realizadas hasta casi el fallo con forma correcta, las estimaciones de 1RM típicamente están dentro del 5% de tu máximo real. La precisión disminuye significativamente por encima de 10 reps. Usar el Promedio de las 7 fórmulas ayuda a reducir el sesgo de cualquier fórmula individual. Para la estimación más confiable, usa un peso desafiante que puedas levantar por 3-5 repeticiones limpias."
        },
        {
          "question": "¿Qué fórmula de 1RM debo usar?",
          "answer": "Para la mayoría de personas, se recomienda el Promedio (predeterminado) porque equilibra las tendencias de las siete fórmulas. Si prefieres una sola fórmula: Epley es la más popular para uso general, Brzycki proporciona estimaciones conservadoras buenas para entrenamiento con mentalidad de seguridad, y Wathen es preferida por la NSCA para atletas explosivos. Las fórmulas concuerdan estrechamente para 2-6 reps pero divergen más en rangos de repeticiones más altos."
        },
        {
          "question": "¿Por qué mi 1RM de press de banca difiere de mi 1RM de sentadilla?",
          "answer": "Cada ejercicio involucra diferentes grupos musculares, mecánica articular y ventajas de palanca. Tu 1RM es específico para cada movimiento. Las proporciones típicas de fuerza para hombres entrenados son aproximadamente: Peso Muerto > Sentadilla > Press de Banca > Press Militar, con el peso muerto usualmente siendo 1.2-1.5× el press de banca y el press militar cerca del 0.6-0.7× el press de banca."
        },
        {
          "question": "¿Con qué frecuencia debo re-evaluar mi 1RM?",
          "answer": "Re-estima tu 1RM cada 4-8 semanas durante un ciclo de entrenamiento. Los principiantes pueden ver cambios rápidos y pueden beneficiarse de pruebas mensuales, mientras que los levantadores avanzados pueden necesitar re-evaluar solo cada 8-12 semanas. No necesitas realizar un intento de máximo real — simplemente usa una serie pesada reciente de 3-5 reps en esta calculadora para actualizar tu estimación."
        },
        {
          "question": "¿Puedo usar esta calculadora para dominadas y fondos con peso?",
          "answer": "Sí. Para ejercicios de peso corporal con peso añadido, ingresa tu carga total (peso corporal + peso añadido) como el peso levantado. Por ejemplo, si pesas 82 kg y añades 20 kg para dominadas, ingresa 102 kg. La calculadora estimará tu 1RM total incluyendo el peso corporal. Resta tu peso corporal para encontrar cuánto peso externo añadir para las zonas de entrenamiento."
        },
        {
          "question": "¿Cuál es la diferencia entre 1RM y PR?",
          "answer": "1RM (máximo de una repetición) es el peso más pesado que puedes levantar actualmente por una repetición — fluctúa basado en entrenamiento, recuperación, sueño y nutrición. PR (récord personal) es el peso más pesado que has levantado jamás, sin importar cuándo. Tu 1RM actual puede ser mayor o menor que tu PR dependiendo de tu estado de entrenamiento actual y nivel de fitness."
        },
        {
          "question": "¿Cómo uso la progresión de calentamiento?",
          "answer": "La progresión de calentamiento muestra 6 series llevando a tu intento de 1RM. Comienza con 40% por 8 reps, luego 50% por 5 reps, 60% por 4 reps, 70% por 3 reps, 80% por 2 reps, y 90% por 1 rep. Descansa 1-5 minutos entre series (descansos más largos conforme aumenta el peso). Esta progresión prepara tu sistema nervioso mientras minimiza la fatiga antes de tu intento máximo."
        },
        {
          "question": "¿Qué significan los estándares de fuerza?",
          "answer": "Los estándares de fuerza clasifican tu 1RM relativo a tu peso corporal en niveles Principiante, Intermedio, Avanzado y Élite. Estos están basados en datos de más de 150 millones de levantamientos rastreados por comunidades de entrenamiento de fuerza. Los estándares varían por ejercicio, género y peso corporal. Ingresa tu peso corporal para ver dónde te clasificas y establecer metas realistas para la progresión."
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
      "name": "Calculadora de Uma Repetição Máxima",
      "slug": "calculadora-uma-repeticao-maxima",
      "subtitle": "Estime sua repetição máxima usando 7 fórmulas comprovadas com calculadora de aquecimento e padrões de força",
      "breadcrumb": "Uma Rep Máxima",
      "seo": {
        "title": "Calculadora Uma Repetição Máxima (1RM) - 7 Fórmulas + Aquecimento | Ferramenta Gratuita",
        "description": "Calcule sua repetição máxima (1RM) usando 7 fórmulas cientificamente validadas. Obtenha séries de aquecimento personalizadas, pesos de zona de treino, padrões de força por peso corporal e veja onde você se classifica. Ferramenta gratuita com suporte kg/lb para supino, agachamento, levantamento terra e mais.",
        "shortDescription": "Estime sua 1RM com 7 fórmulas, calculadora de aquecimento e padrões de força",
        "keywords": [
          "calculadora repetição máxima",
          "calculadora 1RM",
          "uma repetição máxima",
          "máximo supino",
          "calculadora máximo agachamento",
          "máximo levantamento terra",
          "calculadora força",
          "calculadora aquecimento",
          "padrões força"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "exercise": {
          "label": "Exercício",
          "helpText": "Selecione o exercício que você executou",
          "options": {
            "benchPress": "Supino Reto",
            "backSquat": "Agachamento Livre",
            "deadlift": "Levantamento Terra (Convencional)",
            "overheadPress": "Desenvolvimento Militar",
            "barbellRow": "Remada com Barra",
            "frontSquat": "Agachamento Frontal",
            "inclineBench": "Supino Inclinado",
            "romanianDeadlift": "Levantamento Terra Romeno",
            "hipThrust": "Elevação de Quadril",
            "legPress": "Leg Press"
          }
        },
        "reps": {
          "label": "Repetições",
          "helpText": "Repetições completadas com forma adequada (1-15)"
        },
        "formula": {
          "label": "Fórmula de Estimativa",
          "helpText": "A média de todas as 7 fórmulas é recomendada para melhor precisão",
          "options": {
            "average": "Média (Recomendada)",
            "epley": "Epley",
            "brzycki": "Brzycki",
            "lombardi": "Lombardi",
            "mayhew": "Mayhew et al.",
            "wathen": "Wathen",
            "oconner": "O'Conner et al.",
            "lander": "Lander"
          }
        },
        "bodyweight": {
          "label": "Seu Peso Corporal (Opcional)",
          "helpText": "Veja seu nível de força: Iniciante, Intermediário, Avançado ou Elite"
        }
      },
      "inputGroups": {},
      "results": {
        "oneRepMax": {
          "label": "1RM Estimado"
        },
        "maxStrength": {
          "label": "🔴 Força Máxima (95%)"
        },
        "strength": {
          "label": "🟠 Força (85%)"
        },
        "hypertrophy": {
          "label": "🟡 Hipertrofia (75%)"
        },
        "endurance": {
          "label": "🟢 Resistência (65%)"
        },
        "speedPower": {
          "label": "🔵 Velocidade e Potência (55%)"
        },
        "warmUp": {
          "label": "⚪ Aquecimento (50%)"
        }
      },
      "presets": {
        "benchIntermediate": {
          "label": "Supino Reto",
          "description": "102 kg × 5 reps"
        },
        "squatAdvanced": {
          "label": "Agachamento Livre",
          "description": "143 kg × 3 reps"
        },
        "deadliftHeavy": {
          "label": "Levantamento Terra",
          "description": "184 kg × 2 reps"
        },
        "ohpModerate": {
          "label": "Desenvolvimento Militar",
          "description": "61 kg × 8 reps"
        }
      },
      "tooltips": {
        "oneRepMax": "O peso máximo que você consegue levantar em uma repetição com forma adequada",
        "maxStrength": "95% do 1RM — 1-2 reps × 3-5 séries para força máxima",
        "strength": "85% do 1RM — 3-5 reps × 4-6 séries para construção de força",
        "hypertrophy": "75% do 1RM — 8-12 reps × 3-4 séries para crescimento muscular",
        "endurance": "65% do 1RM — 12-15 reps × 2-3 séries para resistência muscular",
        "speedPower": "55% do 1RM — 3-5 reps explosivas × 3-5 séries para potência",
        "warmUp": "50% do 1RM — Peso recomendado para séries de aquecimento"
      },
      "values": {
        "kg": "kg",
        "lbs": "lbs",
        "reps": "reps",
        "sets": "séries",
        "min": "min",
        "Bench Press": "Supino Reto",
        "Back Squat": "Agachamento Livre",
        "Deadlift": "Levantamento Terra",
        "Overhead Press": "Desenvolvimento Militar",
        "Barbell Row": "Remada com Barra",
        "Front Squat": "Agachamento Frontal",
        "Incline Bench": "Supino Inclinado",
        "Romanian Deadlift": "Levantamento Terra Romeno",
        "Hip Thrust": "Elevação de Quadril",
        "Leg Press": "Leg Press",
        "Epley": "Epley",
        "Brzycki": "Brzycki",
        "Lombardi": "Lombardi",
        "Mayhew": "Mayhew et al.",
        "Wathen": "Wathen",
        "O'Conner": "O'Conner et al.",
        "Lander": "Lander",
        "Average": "Média (7 fórmulas)",
        "Max Strength": "Força Máxima",
        "Strength": "Força",
        "Hypertrophy": "Hipertrofia",
        "Endurance": "Resistência",
        "Speed / Power": "Velocidade / Potência",
        "Warm-Up": "Aquecimento",
        "Beginner": "Iniciante",
        "Intermediate": "Intermediário",
        "Advanced": "Avançado",
        "Elite": "Elite"
      },
      "detailedTable": {
        "percentageChart": {
          "button": "Ver Gráfico de Percentuais",
          "title": "Gráfico de Percentuais 1RM",
          "columns": {
            "percent": "% do 1RM",
            "weight": "Peso",
            "reps": "~Reps",
            "goal": "Objetivo do Treino"
          }
        }
      },
      "formats": {
        "summary": "Seu 1RM estimado para {exercise} é {oneRepMax} usando a fórmula {formula}. Para hipertrofia, use {hypertrophy}. Para força, use {strength}."
      },
      "infoCards": {
        "formulaComparison": {
          "title": "📊 Todas as 7 Fórmulas",
          "items": [
            {
              "label": "Média (Recomendada)",
              "valueKey": "average"
            },
            {
              "label": "Epley",
              "valueKey": "epley"
            },
            {
              "label": "Brzycki",
              "valueKey": "brzycki"
            },
            {
              "label": "Lombardi",
              "valueKey": "lombardi"
            },
            {
              "label": "Mayhew et al.",
              "valueKey": "mayhew"
            },
            {
              "label": "Wathen",
              "valueKey": "wathen"
            },
            {
              "label": "O'Conner et al.",
              "valueKey": "oconner"
            },
            {
              "label": "Lander",
              "valueKey": "lander"
            }
          ]
        },
        "warmupProgression": {
          "title": "🔥 Progressão de Aquecimento",
          "items": [
            {
              "label": "Série 1 (40%)",
              "valueKey": "warmup1"
            },
            {
              "label": "Série 2 (50%)",
              "valueKey": "warmup2"
            },
            {
              "label": "Série 3 (60%)",
              "valueKey": "warmup3"
            },
            {
              "label": "Série 4 (70%)",
              "valueKey": "warmup4"
            },
            {
              "label": "Série 5 (80%)",
              "valueKey": "warmup5"
            },
            {
              "label": "Série 6 (90%)",
              "valueKey": "warmup6"
            }
          ]
        },
        "strengthLevel": {
          "title": "🏅 Seu Nível de Força",
          "items": [
            {
              "label": "Seu Nível",
              "valueKey": "strengthLevel"
            },
            {
              "label": "Iniciante",
              "valueKey": "beginnerRange"
            },
            {
              "label": "Intermediário",
              "valueKey": "intermediateRange"
            },
            {
              "label": "Avançado",
              "valueKey": "advancedRange"
            },
            {
              "label": "Elite",
              "valueKey": "eliteRange"
            }
          ]
        }
      },
      "referenceData": {
        "trainingZones": {
          "title": "Zonas de Treino por % do 1RM",
          "items": {
            "maxStrength": {
              "label": "Força Máxima (93-100%)",
              "value": "1-2 reps × 3-5 séries | Descanso 3-5 min"
            },
            "strength": {
              "label": "Força (83-90%)",
              "value": "3-5 reps × 4-6 séries | Descanso 2-4 min"
            },
            "hypertrophy": {
              "label": "Hipertrofia (67-80%)",
              "value": "8-12 reps × 3-4 séries | Descanso 1-2 min"
            },
            "endurance": {
              "label": "Resistência (60-70%)",
              "value": "12-20 reps × 2-3 séries | Descanso 30-60s"
            },
            "speedPower": {
              "label": "Velocidade e Potência (50-60%)",
              "value": "3-5 reps explosivas × 3-5 séries | Descanso 2-3 min"
            }
          }
        }
      },
      "chart": {
        "title": "Gráfico de Percentuais 1RM",
        "xLabel": "% do 1RM",
        "yLabel": "Peso",
        "series": {
          "weight": "Peso de Treino"
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é Uma Repetição Máxima (1RM)?",
          "content": "Sua repetição máxima (1RM) é o peso mais pesado que você consegue levantar em uma única repetição de um determinado exercício mantendo a forma adequada. É o padrão ouro para medir a força máxima no treinamento com pesos e é amplamente usado em competições de powerlifting, testes atléticos e programação de treinos. Em vez de testar seu máximo real diretamente — que carrega maior risco de lesão — a maioria dos atletas e treinadores usa fórmulas de estimativa submáximas. Essas fórmulas pegam um peso que você consegue levantar por múltiplas repetições e predizem matematicamente qual seria seu máximo de repetição única. Esta abordagem é mais segura, rápida e notavelmente precisa quando usando séries de 2-10 repetições. Conhecer seu 1RM permite calibrar precisamente a intensidade do seu treino, garantindo que você levante pesado o suficiente para estimular ganhos de força enquanto permanece seguro o suficiente para treinar consistentemente ao longo do tempo."
        },
        "formulas": {
          "title": "Como Funcionam as Fórmulas de 1RM",
          "content": "Esta calculadora implementa sete fórmulas cientificamente validadas, cada uma desenvolvida a partir de pesquisas em diferentes populações e faixas de repetições. A fórmula Epley (1985) é a mais amplamente usada em academias comerciais e funciona melhor para a faixa geral de 1-10 repetições. A fórmula Brzycki (1993) fornece estimativas mais conservadoras e é preferida em configurações de pesquisa NCAA. A fórmula de Wathen (1994) é recomendada pela NSCA e é particularmente precisa para atletas explosivos. A fórmula de Lombardi (1989) usa uma função de potência não-linear que performa melhor em faixas de repetições mais altas. Mayhew et al. (1992) desenvolveram sua fórmula baseada em regressão usando dados de populações diversas incluindo indivíduos treinados e não treinados. Lander (1985) e O'Conner et al. (1989) completam o conjunto com fórmulas validadas em populações competitivas e gerais respectivamente. Quando você seleciona 'Média', a calculadora computa todas as sete estimativas e retorna a média, que pesquisas sugerem reduzir o viés de fórmulas individuais e fornece a estimativa geral mais confiável."
        },
        "trainingZones": {
          "title": "Usando Seu 1RM para Treino",
          "cards": [
            {
              "title": "Força Máxima",
              "icon": "🔴",
              "description": "93-100% do 1RM para 1-2 reps. Desenvolve produção de força máxima e impulso neural. Descanse 3-5 minutos entre séries. Melhor para powerlifters e atletas de força se preparando para competição."
            },
            {
              "title": "Força",
              "icon": "🟠",
              "description": "83-90% do 1RM para 3-5 reps. Constrói força bruta sem a fadiga de maximizar verdadeiramente. Descanse 2-4 minutos. O ponto ideal para a maioria dos programas de treinamento de força e levantadores intermediários."
            },
            {
              "title": "Hipertrofia",
              "icon": "🟡",
              "description": "67-80% do 1RM para 8-12 reps. Faixa ótima para crescimento muscular através de tensão mecânica e estresse metabólico. Descanse 1-2 minutos. A faixa clássica de repetições do bodybuilding que funciona para todos."
            },
            {
              "title": "Resistência",
              "icon": "🟢",
              "description": "60-70% do 1RM para 12-20 reps. Constrói resistência muscular, capacidade de trabalho e resiliência do tecido conectivo. Descanse 30-60 segundos. Ótimo para fases de condicionamento e iniciantes."
            },
            {
              "title": "Velocidade e Potência",
              "icon": "🔵",
              "description": "50-60% do 1RM para 3-5 reps explosivas. Foque em mover a barra o mais rápido possível. Descanse 2-3 minutos entre séries. Essencial para atletas em esportes que requerem movimentos explosivos."
            }
          ]
        },
        "howToTest": {
          "title": "Como Obter Estimativas Precisas",
          "items": [
            {
              "text": "Use um peso que você consegue levantar por 2-10 reps com forma adequada — a precisão diminui significativamente acima de 10 reps",
              "type": "info"
            },
            {
              "text": "Teste quando totalmente recuperado — fadiga, sono ruim e estresse diminuem sua capacidade real e distorcem os resultados",
              "type": "info"
            },
            {
              "text": "Pare a série quando a forma se deteriorar — conte apenas repetições limpas com amplitude completa e técnica adequada",
              "type": "warning"
            },
            {
              "text": "Cada exercício tem seu próprio 1RM — nunca aplique seu máximo de supino ao seu agachamento ou levantamento terra",
              "type": "warning"
            },
            {
              "text": "Reteste a cada 4-8 semanas conforme progride — seu 1RM muda conforme você fica mais forte",
              "type": "info"
            },
            {
              "text": "Contagens menores de repetições (3-5) dão estimativas mais precisas que contagens maiores (8-10+)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo",
          "description": "Cálculos de 1RM passo a passo usando diferentes fórmulas",
          "examples": [
            {
              "title": "Supino: 102 kg × 5 reps",
              "steps": [
                "Epley: 102 × (1 + 5/30) = 102 × 1,167 = 119 kg",
                "Brzycki: 102 × 36/(37-5) = 102 × 1,125 = 115 kg",
                "Lombardi: 102 × 5^0,10 = 102 × 1,175 = 120 kg",
                "Média de todas as 7 fórmulas ≈ 118 kg"
              ],
              "result": "1RM Estimado: ~118 kg → Força (85%): 100 kg | Hipertrofia (75%): 88 kg"
            },
            {
              "title": "Agachamento: 140 kg × 3 reps",
              "steps": [
                "Epley: 140 × (1 + 3/30) = 140 × 1,10 = 154 kg",
                "Brzycki: 140 × 36/(37-3) = 140 × 1,059 = 148 kg",
                "Wathen: 100×140 / (48,8 + 53,8×e^(−0,075×3)) ≈ 153 kg",
                "Média de todas as 7 fórmulas ≈ 151 kg"
              ],
              "result": "1RM Estimado: ~151 kg → Força (85%): 128 kg | Hipertrofia (75%): 113 kg"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quão precisa é a calculadora de repetição máxima?",
          "answer": "Quando usando séries de 2-10 reps executadas próximo à falha com forma adequada, as estimativas de 1RM são tipicamente dentro de 5% do seu máximo real. A precisão diminui significativamente acima de 10 reps. Usar a Média de todas as 7 fórmulas ajuda a reduzir o viés de qualquer fórmula única. Para a estimativa mais confiável, use um peso desafiador que você consegue levantar por 3-5 repetições limpas."
        },
        {
          "question": "Qual fórmula de 1RM devo usar?",
          "answer": "Para a maioria das pessoas, a Média (padrão) é recomendada porque equilibra as tendências de todas as sete fórmulas. Se preferir uma única fórmula: Epley é a mais popular para uso geral, Brzycki fornece estimativas conservadoras boas para treino focado na segurança, e Wathen é preferida pela NSCA para atletas explosivos. As fórmulas concordam proximamente para 2-6 reps mas divergem mais em faixas de repetições maiores."
        },
        {
          "question": "Por que meu 1RM de supino difere do meu 1RM de agachamento?",
          "answer": "Cada exercício envolve diferentes grupos musculares, mecânicas articulares e vantagens de alavanca. Seu 1RM é específico para cada movimento. Proporções típicas de força para homens treinados são aproximadamente: Levantamento Terra > Agachamento > Supino > Desenvolvimento Militar, com levantamento terra usualmente 1,2-1,5× supino e desenvolvimento militar cerca de 0,6-0,7× supino."
        },
        {
          "question": "Com que frequência devo retestar meu 1RM?",
          "answer": "Reestime seu 1RM a cada 4-8 semanas durante um ciclo de treino. Iniciantes podem ver mudanças rápidas e podem se beneficiar de testes mensais, enquanto levantadores avançados podem precisar retestar apenas a cada 8-12 semanas. Você não precisa realizar uma tentativa de máximo real — simplesmente use uma série pesada recente de 3-5 reps nesta calculadora para atualizar sua estimativa."
        },
        {
          "question": "Posso usar esta calculadora para barras fixas e paralelas com peso?",
          "answer": "Sim. Para exercícios de peso corporal com carga adicional, insira sua carga total (peso corporal + peso adicionado) como o peso levantado. Por exemplo, se você pesa 82 kg e adiciona 20 kg para barras, insira 102 kg. A calculadora estimará seu 1RM total incluindo peso corporal. Subtraia seu peso corporal para encontrar quanto peso externo adicionar para zonas de treino."
        },
        {
          "question": "Qual é a diferença entre 1RM e RP?",
          "answer": "1RM (repetição máxima) é o peso mais pesado que você consegue levantar atualmente em uma repetição — flutua baseado no treino, recuperação, sono e nutrição. RP (recorde pessoal) é o peso mais pesado que você já levantou, independentemente de quando. Seu 1RM atual pode ser maior ou menor que seu RP dependendo do seu estado atual de treino e nível de condicionamento."
        },
        {
          "question": "Como usar a progressão de aquecimento?",
          "answer": "A progressão de aquecimento mostra 6 séries levando à sua tentativa de 1RM. Comece com 40% para 8 reps, então 50% para 5 reps, 60% para 4 reps, 70% para 3 reps, 80% para 2 reps, e 90% para 1 rep. Descanse 1-5 minutos entre séries (descansos mais longos conforme o peso aumenta). Esta progressão prepara seu sistema nervoso enquanto minimiza fadiga antes da sua tentativa máxima."
        },
        {
          "question": "O que significam os padrões de força?",
          "answer": "Os padrões de força classificam seu 1RM relativo ao seu peso corporal em níveis Iniciante, Intermediário, Avançado e Elite. Estes são baseados em dados de mais de 150 milhões de levantamentos rastreados por comunidades de treinamento de força. Os padrões variam por exercício, gênero e peso corporal. Insira seu peso corporal para ver onde você se classifica e definir objetivos realistas para progressão."
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
      "name": "Calculateur de Répétition Maximale",
      "slug": "calculateur-repetition-maximale",
      "subtitle": "Estimez votre maximum d'une répétition avec 7 formules éprouvées, calculateur d'échauffement et standards de force",
      "breadcrumb": "Répétition Maximale",
      "seo": {
        "title": "Calculateur de Répétition Maximale (1RM) - 7 Formules + Échauffement | Outil Gratuit",
        "description": "Calculez votre répétition maximale (1RM) avec 7 formules scientifiquement validées. Obtenez des séries d'échauffement personnalisées, des poids de zones d'entraînement, des standards de force par poids corporel et voyez votre classement. Outil gratuit avec support kg/lb pour développé couché, squat, soulevé de terre et plus.",
        "shortDescription": "Estimez votre 1RM avec 7 formules, calculateur d'échauffement et standards de force",
        "keywords": [
          "calculateur répétition maximale",
          "calculateur 1RM",
          "maximum une répétition",
          "max développé couché",
          "calculateur max squat",
          "max soulevé de terre",
          "calculateur force",
          "calculateur échauffement",
          "standards force"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "exercise": {
          "label": "Exercice",
          "helpText": "Sélectionnez l'exercice que vous avez effectué",
          "options": {
            "benchPress": "Développé Couché",
            "backSquat": "Squat Arrière",
            "deadlift": "Soulevé de Terre (Conventionnel)",
            "overheadPress": "Développé Militaire",
            "barbellRow": "Rowing Barre",
            "frontSquat": "Squat Avant",
            "inclineBench": "Développé Incliné",
            "romanianDeadlift": "Soulevé de Terre Roumain",
            "hipThrust": "Hip Thrust",
            "legPress": "Presse à Cuisses"
          }
        },
        "reps": {
          "label": "Répétitions",
          "helpText": "Répétitions complétées avec une forme correcte (1-15)"
        },
        "formula": {
          "label": "Formule d'Estimation",
          "helpText": "La moyenne des 7 formules est recommandée pour la meilleure précision",
          "options": {
            "average": "Moyenne (Recommandée)",
            "epley": "Epley",
            "brzycki": "Brzycki",
            "lombardi": "Lombardi",
            "mayhew": "Mayhew et al.",
            "wathen": "Wathen",
            "oconner": "O'Conner et al.",
            "lander": "Lander"
          }
        },
        "bodyweight": {
          "label": "Votre Poids Corporel (Optionnel)",
          "helpText": "Voyez votre niveau de force : Débutant, Intermédiaire, Avancé ou Élite"
        }
      },
      "inputGroups": {},
      "results": {
        "oneRepMax": {
          "label": "1RM Estimé"
        },
        "maxStrength": {
          "label": "🔴 Force Maximale (95%)"
        },
        "strength": {
          "label": "🟠 Force (85%)"
        },
        "hypertrophy": {
          "label": "🟡 Hypertrophie (75%)"
        },
        "endurance": {
          "label": "🟢 Endurance (65%)"
        },
        "speedPower": {
          "label": "🔵 Vitesse et Puissance (55%)"
        },
        "warmUp": {
          "label": "⚪ Échauffement (50%)"
        }
      },
      "presets": {
        "benchIntermediate": {
          "label": "Développé Couché",
          "description": "102 kg × 5 reps"
        },
        "squatAdvanced": {
          "label": "Squat Arrière",
          "description": "143 kg × 3 reps"
        },
        "deadliftHeavy": {
          "label": "Soulevé de Terre",
          "description": "184 kg × 2 reps"
        },
        "ohpModerate": {
          "label": "Développé Militaire",
          "description": "61 kg × 8 reps"
        }
      },
      "tooltips": {
        "oneRepMax": "Le poids maximum que vous pouvez soulever pour une répétition avec une forme correcte",
        "maxStrength": "95% du 1RM — 1-2 reps × 3-5 séries pour la force maximale",
        "strength": "85% du 1RM — 3-5 reps × 4-6 séries pour développer la force",
        "hypertrophy": "75% du 1RM — 8-12 reps × 3-4 séries pour la croissance musculaire",
        "endurance": "65% du 1RM — 12-15 reps × 2-3 séries pour l'endurance musculaire",
        "speedPower": "55% du 1RM — 3-5 reps explosives × 3-5 séries pour la puissance",
        "warmUp": "50% du 1RM — Poids recommandé pour les séries d'échauffement"
      },
      "values": {
        "kg": "kg",
        "lbs": "lbs",
        "reps": "reps",
        "sets": "séries",
        "min": "min",
        "Bench Press": "Développé Couché",
        "Back Squat": "Squat Arrière",
        "Deadlift": "Soulevé de Terre",
        "Overhead Press": "Développé Militaire",
        "Barbell Row": "Rowing Barre",
        "Front Squat": "Squat Avant",
        "Incline Bench": "Développé Incliné",
        "Romanian Deadlift": "Soulevé de Terre Roumain",
        "Hip Thrust": "Hip Thrust",
        "Leg Press": "Presse à Cuisses",
        "Epley": "Epley",
        "Brzycki": "Brzycki",
        "Lombardi": "Lombardi",
        "Mayhew": "Mayhew et al.",
        "Wathen": "Wathen",
        "O'Conner": "O'Conner et al.",
        "Lander": "Lander",
        "Average": "Moyenne (7 formules)",
        "Max Strength": "Force Maximale",
        "Strength": "Force",
        "Hypertrophy": "Hypertrophie",
        "Endurance": "Endurance",
        "Speed / Power": "Vitesse / Puissance",
        "Warm-Up": "Échauffement",
        "Beginner": "Débutant",
        "Intermediate": "Intermédiaire",
        "Advanced": "Avancé",
        "Elite": "Élite"
      },
      "detailedTable": {
        "percentageChart": {
          "button": "Voir le Graphique des Pourcentages",
          "title": "Graphique des Pourcentages 1RM",
          "columns": {
            "percent": "% du 1RM",
            "weight": "Poids",
            "reps": "~Reps",
            "goal": "Objectif d'Entraînement"
          }
        }
      },
      "formats": {
        "summary": "Votre 1RM estimé pour {exercise} est {oneRepMax} en utilisant la formule {formula}. Pour l'hypertrophie, chargez {hypertrophy}. Pour la force, chargez {strength}."
      },
      "infoCards": {
        "formulaComparison": {
          "title": "📊 Toutes les 7 Formules",
          "items": [
            {
              "label": "Moyenne (Recommandée)",
              "valueKey": "average"
            },
            {
              "label": "Epley",
              "valueKey": "epley"
            },
            {
              "label": "Brzycki",
              "valueKey": "brzycki"
            },
            {
              "label": "Lombardi",
              "valueKey": "lombardi"
            },
            {
              "label": "Mayhew et al.",
              "valueKey": "mayhew"
            },
            {
              "label": "Wathen",
              "valueKey": "wathen"
            },
            {
              "label": "O'Conner et al.",
              "valueKey": "oconner"
            },
            {
              "label": "Lander",
              "valueKey": "lander"
            }
          ]
        },
        "warmupProgression": {
          "title": "🔥 Progression d'Échauffement",
          "items": [
            {
              "label": "Série 1 (40%)",
              "valueKey": "warmup1"
            },
            {
              "label": "Série 2 (50%)",
              "valueKey": "warmup2"
            },
            {
              "label": "Série 3 (60%)",
              "valueKey": "warmup3"
            },
            {
              "label": "Série 4 (70%)",
              "valueKey": "warmup4"
            },
            {
              "label": "Série 5 (80%)",
              "valueKey": "warmup5"
            },
            {
              "label": "Série 6 (90%)",
              "valueKey": "warmup6"
            }
          ]
        },
        "strengthLevel": {
          "title": "🏅 Votre Niveau de Force",
          "items": [
            {
              "label": "Votre Niveau",
              "valueKey": "strengthLevel"
            },
            {
              "label": "Débutant",
              "valueKey": "beginnerRange"
            },
            {
              "label": "Intermédiaire",
              "valueKey": "intermediateRange"
            },
            {
              "label": "Avancé",
              "valueKey": "advancedRange"
            },
            {
              "label": "Élite",
              "valueKey": "eliteRange"
            }
          ]
        }
      },
      "referenceData": {
        "trainingZones": {
          "title": "Zones d'Entraînement par % du 1RM",
          "items": {
            "maxStrength": {
              "label": "Force Maximale (93-100%)",
              "value": "1-2 reps × 3-5 séries | Repos 3-5 min"
            },
            "strength": {
              "label": "Force (83-90%)",
              "value": "3-5 reps × 4-6 séries | Repos 2-4 min"
            },
            "hypertrophy": {
              "label": "Hypertrophie (67-80%)",
              "value": "8-12 reps × 3-4 séries | Repos 1-2 min"
            },
            "endurance": {
              "label": "Endurance (60-70%)",
              "value": "12-20 reps × 2-3 séries | Repos 30-60s"
            },
            "speedPower": {
              "label": "Vitesse et Puissance (50-60%)",
              "value": "3-5 reps explosives × 3-5 séries | Repos 2-3 min"
            }
          }
        }
      },
      "chart": {
        "title": "Graphique des Pourcentages 1RM",
        "xLabel": "% du 1RM",
        "yLabel": "Poids",
        "series": {
          "weight": "Poids d'Entraînement"
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que la Répétition Maximale (1RM) ?",
          "content": "Votre maximum d'une répétition (1RM) est le poids le plus lourd que vous pouvez soulever pour une seule répétition d'un exercice donné en maintenant une forme correcte. C'est l'étalon-or pour mesurer la force maximale en musculation et est largement utilisé dans les compétitions de force athlétique, les tests sportifs et la programmation d'entraînement. Plutôt que de tester votre vrai maximum directement — ce qui présente un risque de blessure plus élevé — la plupart des athlètes et entraîneurs utilisent des formules d'estimation sous-maximales. Ces formules prennent un poids que vous pouvez soulever pour plusieurs répétitions et prédisent mathématiquement ce que serait votre maximum d'une répétition. Cette approche est plus sûre, plus rapide et remarquablement précise lors de l'utilisation de séries de 2-10 répétitions. Connaître votre 1RM vous permet de calibrer précisément l'intensité de votre entraînement, en vous assurant de soulever assez lourd pour stimuler les gains de force tout en restant assez sûr pour vous entraîner de manière cohérente dans le temps."
        },
        "formulas": {
          "title": "Comment Fonctionnent les Formules 1RM",
          "content": "Ce calculateur implémente sept formules scientifiquement validées, chacune développée à partir de recherches sur différentes populations et gammes de répétitions. La formule Epley (1985) est la plus largement utilisée dans les salles de sport commerciales et fonctionne mieux pour la gamme générale de 1-10 répétitions. La formule Brzycki (1993) fournit des estimations plus conservatrices et est préférée dans les contextes de recherche NCAA. La formule de Wathen (1994) est recommandée par la NSCA et est particulièrement précise pour les athlètes explosifs. La formule de Lombardi (1989) utilise une fonction de puissance non linéaire qui performe mieux dans les gammes de répétitions plus élevées. Mayhew et al. (1992) ont développé leur formule basée sur la régression en utilisant des données de populations diverses incluant des individus entraînés et non entraînés. Lander (1985) et O'Conner et al. (1989) complètent l'ensemble avec des formules validées sur des populations compétitives et générales respectivement. Quand vous sélectionnez 'Moyenne', le calculateur calcule les sept estimations et retourne la moyenne, ce que la recherche suggère réduit le biais des formules individuelles et fournit l'estimation globale la plus fiable."
        },
        "trainingZones": {
          "title": "Utiliser Votre 1RM pour l'Entraînement",
          "cards": [
            {
              "title": "Force Maximale",
              "icon": "🔴",
              "description": "93-100% du 1RM pour 1-2 reps. Développe la production de force maximale et l'activation neurale. Repos 3-5 minutes entre séries. Idéal pour les powerlifters et athlètes de force se préparant à la compétition."
            },
            {
              "title": "Force",
              "icon": "🟠",
              "description": "83-90% du 1RM pour 3-5 reps. Construit la force brute sans la fatigue du vrai maximum. Repos 2-4 minutes. Le point idéal pour la plupart des programmes de force et les pratiquants intermédiaires."
            },
            {
              "title": "Hypertrophie",
              "icon": "🟡",
              "description": "67-80% du 1RM pour 8-12 reps. Gamme optimale pour la croissance musculaire par tension mécanique et stress métabolique. Repos 1-2 minutes. La gamme classique de bodybuilding qui fonctionne pour tous."
            },
            {
              "title": "Endurance",
              "icon": "🟢",
              "description": "60-70% du 1RM pour 12-20 reps. Développe l'endurance musculaire, la capacité de travail et la résistance des tissus conjonctifs. Repos 30-60 secondes. Excellent pour les phases de conditionnement et les débutants."
            },
            {
              "title": "Vitesse et Puissance",
              "icon": "🔵",
              "description": "50-60% du 1RM pour 3-5 reps explosives. Focus sur déplacer la barre le plus rapidement possible. Repos 2-3 minutes entre séries. Essentiel pour les athlètes dans les sports nécessitant des mouvements explosifs."
            }
          ]
        },
        "howToTest": {
          "title": "Comment Obtenir des Estimations Précises",
          "items": [
            {
              "text": "Utilisez un poids que vous pouvez soulever pour 2-10 reps avec une forme correcte — la précision diminue significativement au-dessus de 10 reps",
              "type": "info"
            },
            {
              "text": "Testez quand vous êtes complètement récupéré — la fatigue, le mauvais sommeil et le stress réduisent tous votre vraie capacité et faussent les résultats",
              "type": "info"
            },
            {
              "text": "Arrêtez la série quand la forme se dégrade — ne comptez que les répétitions propres, avec amplitude complète et technique correcte",
              "type": "warning"
            },
            {
              "text": "Chaque exercice a son propre 1RM — n'appliquez jamais votre maximum de développé couché à votre squat ou soulevé de terre",
              "type": "warning"
            },
            {
              "text": "Re-testez toutes les 4-8 semaines en progressant — votre 1RM change à mesure que vous devenez plus fort",
              "type": "info"
            },
            {
              "text": "Les comptes de répétitions plus faibles (3-5) donnent des estimations plus précises que les comptes plus élevés (8-10+)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul",
          "description": "Calculs 1RM étape par étape utilisant différentes formules",
          "examples": [
            {
              "title": "Développé Couché : 102 kg × 5 reps",
              "steps": [
                "Epley : 102 × (1 + 5/30) = 102 × 1,167 = 119 kg",
                "Brzycki : 102 × 36/(37-5) = 102 × 1,125 = 115 kg",
                "Lombardi : 102 × 5^0,10 = 102 × 1,175 = 120 kg",
                "Moyenne des 7 formules ≈ 118 kg"
              ],
              "result": "1RM Estimé : ~118 kg → Force (85%) : 100 kg | Hypertrophie (75%) : 88 kg"
            },
            {
              "title": "Squat Arrière : 140 kg × 3 reps",
              "steps": [
                "Epley : 140 × (1 + 3/30) = 140 × 1,10 = 154 kg",
                "Brzycki : 140 × 36/(37-3) = 140 × 1,059 = 148 kg",
                "Wathen : 100×140 / (48,8 + 53,8×e^(−0,075×3)) ≈ 153 kg",
                "Moyenne des 7 formules ≈ 151 kg"
              ],
              "result": "1RM Estimé : ~151 kg → Force (85%) : 128 kg | Hypertrophie (75%) : 113 kg"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle est la précision du calculateur de répétition maximale ?",
          "answer": "Lors de l'utilisation de séries de 2-10 répétitions effectuées près de l'échec avec une forme correcte, les estimations 1RM sont typiquement dans les 5% de votre maximum réel. La précision diminue significativement au-dessus de 10 répétitions. Utiliser la Moyenne des 7 formules aide à réduire le biais de toute formule unique. Pour l'estimation la plus fiable, utilisez un poids difficile que vous pouvez soulever pour 3-5 répétitions propres."
        },
        {
          "question": "Quelle formule 1RM devrais-je utiliser ?",
          "answer": "Pour la plupart des gens, la Moyenne (par défaut) est recommandée car elle équilibre les tendances des sept formules. Si vous préférez une formule unique : Epley est la plus populaire pour usage général, Brzycki fournit des estimations conservatrices bonnes pour un entraînement axé sur la sécurité, et Wathen est préférée par la NSCA pour les athlètes explosifs. Les formules s'accordent étroitement pour 2-6 répétitions mais divergent plus dans les gammes de répétitions plus élevées."
        },
        {
          "question": "Pourquoi mon 1RM de développé couché diffère-t-il de mon 1RM de squat ?",
          "answer": "Chaque exercice implique différents groupes musculaires, mécaniques articulaires et avantages de levier. Votre 1RM est spécifique à chaque mouvement. Les ratios de force typiques pour les hommes entraînés sont approximativement : Soulevé de terre > Squat > Développé couché > Développé militaire, avec le soulevé de terre habituellement 1,2-1,5× le développé couché et le développé militaire environ 0,6-0,7× le développé couché."
        },
        {
          "question": "À quelle fréquence devrais-je retester mon 1RM ?",
          "answer": "Re-estimez votre 1RM toutes les 4-8 semaines pendant un cycle d'entraînement. Les débutants peuvent voir des changements rapides et peuvent bénéficier de tests mensuels, tandis que les pratiquants avancés peuvent seulement avoir besoin de retester toutes les 8-12 semaines. Vous n'avez pas besoin d'effectuer une vraie tentative de maximum — utilisez simplement une série lourde récente de 3-5 répétitions dans ce calculateur pour mettre à jour votre estimation."
        },
        {
          "question": "Puis-je utiliser ce calculateur pour les tractions et dips lestés ?",
          "answer": "Oui. Pour les exercices au poids du corps lestés, entrez votre charge totale (poids corporel + poids ajouté) comme le poids soulevé. Par exemple, si vous pesez 82 kg et ajoutez 20 kg pour les tractions, entrez 102 kg. Le calculateur estimera votre 1RM total incluant le poids corporel. Soustrayez votre poids corporel pour trouver combien de poids externe ajouter pour les zones d'entraînement."
        },
        {
          "question": "Quelle est la différence entre 1RM et PR ?",
          "answer": "1RM (maximum d'une répétition) est le poids le plus lourd que vous pouvez actuellement soulever pour une répétition — il fluctue selon l'entraînement, la récupération, le sommeil et la nutrition. PR (record personnel) est le poids le plus lourd que vous avez jamais soulevé, peu importe quand. Votre 1RM actuel peut être plus élevé ou plus faible que votre PR selon votre état d'entraînement et niveau de forme physique actuels."
        },
        {
          "question": "Comment utiliser la progression d'échauffement ?",
          "answer": "La progression d'échauffement montre 6 séries menant à votre tentative de 1RM. Commencez avec 40% pour 8 reps, puis 50% pour 5 reps, 60% pour 4 reps, 70% pour 3 reps, 80% pour 2 reps, et 90% pour 1 rep. Repos 1-5 minutes entre séries (repos plus longs quand le poids augmente). Cette progression prépare votre système nerveux tout en minimisant la fatigue avant votre tentative de maximum."
        },
        {
          "question": "Que signifient les standards de force ?",
          "answer": "Les standards de force classifient votre 1RM relatif à votre poids corporel en niveaux Débutant, Intermédiaire, Avancé et Élite. Ceux-ci sont basés sur des données de plus de 150 millions de levées suivies par les communautés d'entraînement de force. Les standards varient par exercice, sexe et poids corporel. Entrez votre poids corporel pour voir où vous vous classez et fixer des objectifs réalistes de progression."
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
      "name": "Ein-Wiederholungs-Maximum Rechner",
      "slug": "ein-wiederholungs-maximum-rechner",
      "subtitle": "Schätzen Sie Ihr Ein-Wiederholungs-Maximum mit 7 bewährten Formeln mit Aufwärm-Rechner und Kraftstandards",
      "breadcrumb": "Ein-Wiederholungs-Maximum",
      "seo": {
        "title": "Ein-Wiederholungs-Maximum Rechner (1RM) - 7 Formeln + Aufwärmen | Kostenloses Tool",
        "description": "Berechnen Sie Ihr Ein-Wiederholungs-Maximum (1RM) mit 7 wissenschaftlich validierten Formeln. Erhalten Sie personalisierte Aufwärmsätze, Trainingszonen-Gewichte, Kraftstandards nach Körpergewicht und sehen Sie, wo Sie stehen. Kostenloses Tool mit kg/lbs-Unterstützung für Bankdrücken, Kniebeugen, Kreuzheben und mehr.",
        "shortDescription": "Schätzen Sie Ihr 1RM mit 7 Formeln, Aufwärm-Rechner und Kraftstandards",
        "keywords": [
          "ein wiederholungs maximum rechner",
          "1RM rechner",
          "ein wiederholung maximum",
          "bankdrücken maximum",
          "kniebeuge maximum rechner",
          "kreuzheben maximum",
          "kraft rechner",
          "aufwärmen rechner",
          "kraft standards"
        ]
      },
      "inputs": {
        "exercise": {
          "label": "Übung",
          "helpText": "Wählen Sie die ausgeführte Übung",
          "options": {
            "benchPress": "Bankdrücken",
            "backSquat": "Kniebeuge",
            "deadlift": "Kreuzheben (Konventionell)",
            "overheadPress": "Überkopfdrücken",
            "barbellRow": "Langhantelrudern",
            "frontSquat": "Frontkniebeuge",
            "inclineBench": "Schrägbankdrücken",
            "romanianDeadlift": "Rumänisches Kreuzheben",
            "hipThrust": "Hüftstoß",
            "legPress": "Beinpresse"
          }
        },
        "reps": {
          "label": "Wiederholungen",
          "helpText": "Sauber ausgeführte Wiederholungen (1-15)"
        },
        "formula": {
          "label": "Schätzungsformel",
          "helpText": "Der Durchschnitt aller 7 Formeln wird für beste Genauigkeit empfohlen",
          "options": {
            "average": "Durchschnitt (Empfohlen)",
            "epley": "Epley",
            "brzycki": "Brzycki",
            "lombardi": "Lombardi",
            "mayhew": "Mayhew et al.",
            "wathen": "Wathen",
            "oconner": "O'Conner et al.",
            "lander": "Lander"
          }
        },
        "bodyweight": {
          "label": "Ihr Körpergewicht (Optional)",
          "helpText": "Sehen Sie Ihr Kraftniveau: Anfänger, Fortgeschritten, Profi oder Elite"
        }
      },
      "inputGroups": {},
      "results": {
        "oneRepMax": {
          "label": "Geschätztes 1RM"
        },
        "maxStrength": {
          "label": "🔴 Maximalkraft (95%)"
        },
        "strength": {
          "label": "🟠 Kraft (85%)"
        },
        "hypertrophy": {
          "label": "🟡 Hypertrophie (75%)"
        },
        "endurance": {
          "label": "🟢 Ausdauer (65%)"
        },
        "speedPower": {
          "label": "🔵 Schnellkraft (55%)"
        },
        "warmUp": {
          "label": "⚪ Aufwärmen (50%)"
        }
      },
      "presets": {
        "benchIntermediate": {
          "label": "Bankdrücken",
          "description": "102 kg × 5 Wdh"
        },
        "squatAdvanced": {
          "label": "Kniebeuge",
          "description": "143 kg × 3 Wdh"
        },
        "deadliftHeavy": {
          "label": "Kreuzheben",
          "description": "184 kg × 2 Wdh"
        },
        "ohpModerate": {
          "label": "Überkopfdrücken",
          "description": "61 kg × 8 Wdh"
        }
      },
      "tooltips": {
        "oneRepMax": "Das maximale Gewicht, das Sie für eine Wiederholung mit sauberer Form heben können",
        "maxStrength": "95% des 1RM — 1-2 Wdh × 3-5 Sätze für Maximalkraft",
        "strength": "85% des 1RM — 3-5 Wdh × 4-6 Sätze für Kraftaufbau",
        "hypertrophy": "75% des 1RM — 8-12 Wdh × 3-4 Sätze für Muskelwachstum",
        "endurance": "65% des 1RM — 12-15 Wdh × 2-3 Sätze für Muskelausdauer",
        "speedPower": "55% des 1RM — 3-5 explosive Wdh × 3-5 Sätze für Schnellkraft",
        "warmUp": "50% des 1RM — Empfohlenes Gewicht für Aufwärmsätze"
      },
      "values": {
        "kg": "kg",
        "lbs": "lbs",
        "reps": "Wdh",
        "sets": "Sätze",
        "min": "Min",
        "Bench Press": "Bankdrücken",
        "Back Squat": "Kniebeuge",
        "Deadlift": "Kreuzheben",
        "Overhead Press": "Überkopfdrücken",
        "Barbell Row": "Langhantelrudern",
        "Front Squat": "Frontkniebeuge",
        "Incline Bench": "Schrägbankdrücken",
        "Romanian Deadlift": "Rumänisches Kreuzheben",
        "Hip Thrust": "Hüftstoß",
        "Leg Press": "Beinpresse",
        "Epley": "Epley",
        "Brzycki": "Brzycki",
        "Lombardi": "Lombardi",
        "Mayhew": "Mayhew et al.",
        "Wathen": "Wathen",
        "O'Conner": "O'Conner et al.",
        "Lander": "Lander",
        "Average": "Durchschnitt (7 Formeln)",
        "Max Strength": "Maximalkraft",
        "Strength": "Kraft",
        "Hypertrophy": "Hypertrophie",
        "Endurance": "Ausdauer",
        "Speed / Power": "Schnellkraft",
        "Warm-Up": "Aufwärmen",
        "Beginner": "Anfänger",
        "Intermediate": "Fortgeschritten",
        "Advanced": "Profi",
        "Elite": "Elite"
      },
      "detailedTable": {
        "percentageChart": {
          "button": "Prozent-Diagramm anzeigen",
          "title": "1RM Prozent-Diagramm",
          "columns": {
            "percent": "% des 1RM",
            "weight": "Gewicht",
            "reps": "~Wdh",
            "goal": "Trainingsziel"
          }
        }
      },
      "formats": {
        "summary": "Ihr geschätztes 1RM für {exercise} beträgt {oneRepMax} mit der {formula}-Formel. Für Hypertrophie verwenden Sie {hypertrophy}. Für Kraft verwenden Sie {strength}."
      },
      "infoCards": {
        "formulaComparison": {
          "title": "📊 Alle 7 Formeln",
          "items": [
            {
              "label": "Durchschnitt (Empfohlen)",
              "valueKey": "average"
            },
            {
              "label": "Epley",
              "valueKey": "epley"
            },
            {
              "label": "Brzycki",
              "valueKey": "brzycki"
            },
            {
              "label": "Lombardi",
              "valueKey": "lombardi"
            },
            {
              "label": "Mayhew et al.",
              "valueKey": "mayhew"
            },
            {
              "label": "Wathen",
              "valueKey": "wathen"
            },
            {
              "label": "O'Conner et al.",
              "valueKey": "oconner"
            },
            {
              "label": "Lander",
              "valueKey": "lander"
            }
          ]
        },
        "warmupProgression": {
          "title": "🔥 Aufwärm-Progression",
          "items": [
            {
              "label": "Satz 1 (40%)",
              "valueKey": "warmup1"
            },
            {
              "label": "Satz 2 (50%)",
              "valueKey": "warmup2"
            },
            {
              "label": "Satz 3 (60%)",
              "valueKey": "warmup3"
            },
            {
              "label": "Satz 4 (70%)",
              "valueKey": "warmup4"
            },
            {
              "label": "Satz 5 (80%)",
              "valueKey": "warmup5"
            },
            {
              "label": "Satz 6 (90%)",
              "valueKey": "warmup6"
            }
          ]
        },
        "strengthLevel": {
          "title": "🏅 Ihr Kraftniveau",
          "items": [
            {
              "label": "Ihr Niveau",
              "valueKey": "strengthLevel"
            },
            {
              "label": "Anfänger",
              "valueKey": "beginnerRange"
            },
            {
              "label": "Fortgeschritten",
              "valueKey": "intermediateRange"
            },
            {
              "label": "Profi",
              "valueKey": "advancedRange"
            },
            {
              "label": "Elite",
              "valueKey": "eliteRange"
            }
          ]
        }
      },
      "referenceData": {
        "trainingZones": {
          "title": "Trainingszonen nach % des 1RM",
          "items": {
            "maxStrength": {
              "label": "Maximalkraft (93-100%)",
              "value": "1-2 Wdh × 3-5 Sätze | Pause 3-5 Min"
            },
            "strength": {
              "label": "Kraft (83-90%)",
              "value": "3-5 Wdh × 4-6 Sätze | Pause 2-4 Min"
            },
            "hypertrophy": {
              "label": "Hypertrophie (67-80%)",
              "value": "8-12 Wdh × 3-4 Sätze | Pause 1-2 Min"
            },
            "endurance": {
              "label": "Ausdauer (60-70%)",
              "value": "12-20 Wdh × 2-3 Sätze | Pause 30-60s"
            },
            "speedPower": {
              "label": "Schnellkraft (50-60%)",
              "value": "3-5 explosive Wdh × 3-5 Sätze | Pause 2-3 Min"
            }
          }
        }
      },
      "chart": {
        "title": "1RM Prozent-Diagramm",
        "xLabel": "% des 1RM",
        "yLabel": "Gewicht",
        "series": {
          "weight": "Trainingsgewicht"
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist das Ein-Wiederholungs-Maximum (1RM)?",
          "content": "Ihr Ein-Wiederholungs-Maximum (1RM) ist das schwerste Gewicht, das Sie für eine einzelne Wiederholung einer bestimmten Übung mit sauberer Form heben können. Es ist der Goldstandard zur Messung der Maximalkraft im Krafttraining und wird häufig in Powerlifting-Wettkämpfen, athletischen Tests und Trainingsprogrammen verwendet. Anstatt Ihr wahres Maximum direkt zu testen – was ein höheres Verletzungsrisiko birgt – verwenden die meisten Athleten und Trainer submaximale Schätzungsformeln. Diese Formeln nehmen ein Gewicht, das Sie für mehrere Wiederholungen heben können, und sagen mathematisch voraus, was Ihr Ein-Wiederholungs-Maximum wäre. Dieser Ansatz ist sicherer, schneller und bemerkenswert genau bei Verwendung von Sätzen mit 2-10 Wiederholungen. Ihr 1RM zu kennen ermöglicht es Ihnen, Ihre Trainingsintensität präzise zu kalibrieren und sicherzustellen, dass Sie schwer genug trainieren, um Kraftzuwächse zu stimulieren, während Sie sicher genug bleiben, um langfristig konsistent zu trainieren."
        },
        "formulas": {
          "title": "Wie 1RM-Formeln funktionieren",
          "content": "Dieser Rechner implementiert sieben wissenschaftlich validierte Formeln, die jeweils aus Forschung an verschiedenen Populationen und Wiederholungsbereichen entwickelt wurden. Die Epley-Formel (1985) ist die am weitesten verbreitete in kommerziellen Fitnessstudios und funktioniert am besten für den allgemeinen 1-10 Wiederholungsbereich. Die Brzycki-Formel (1993) liefert konservativere Schätzungen und wird in NCAA-Forschungsumgebungen bevorzugt. Wathens Formel (1994) wird von der NSCA empfohlen und ist besonders genau für explosive Athleten. Lombardis Formel (1989) verwendet eine nichtlineare Potenzfunktion, die bei höheren Wiederholungsbereichen besser funktioniert. Mayhew et al. (1992) entwickelten ihre regressionsbasierte Formel unter Verwendung von Daten verschiedener Populationen, einschließlich trainierter und untrainierter Personen. Lander (1985) und O'Conner et al. (1989) vervollständigen das Set mit Formeln, die an Wettkampf- und allgemeinen Populationen validiert wurden. Wenn Sie 'Durchschnitt' wählen, berechnet der Rechner alle sieben Schätzungen und gibt den Mittelwert zurück, was laut Forschung die Verzerrung einzelner Formeln reduziert und die zuverlässigste Gesamtschätzung liefert."
        },
        "trainingZones": {
          "title": "Ihr 1RM für das Training verwenden",
          "cards": [
            {
              "title": "Maximalkraft",
              "icon": "🔴",
              "description": "93-100% des 1RM für 1-2 Wdh. Entwickelt maximale Kraftproduktion und neurale Ansteuerung. 3-5 Minuten Pause zwischen Sätzen. Optimal für Powerlifter und Kraftsportler in Wettkampfvorbereitung."
            },
            {
              "title": "Kraft",
              "icon": "🟠",
              "description": "83-90% des 1RM für 3-5 Wdh. Baut rohe Kraft auf ohne die Ermüdung echter Maximalversuche. 2-4 Minuten Pause. Der optimale Bereich für die meisten Krafttrainingsprogramme und Fortgeschrittene."
            },
            {
              "title": "Hypertrophie",
              "icon": "🟡",
              "description": "67-80% des 1RM für 8-12 Wdh. Optimaler Bereich für Muskelwachstum durch mechanische Spannung und metabolischen Stress. 1-2 Minuten Pause. Der klassische Bodybuilding-Wiederholungsbereich für alle."
            },
            {
              "title": "Ausdauer",
              "icon": "🟢",
              "description": "60-70% des 1RM für 12-20 Wdh. Baut Muskelausdauer, Arbeitskapazität und Bindegewebsresilienz auf. 30-60 Sekunden Pause. Ideal für Konditionsphasen und Anfänger."
            },
            {
              "title": "Schnellkraft",
              "icon": "🔵",
              "description": "50-60% des 1RM für 3-5 explosive Wdh. Fokus auf maximale Hantelgeschwindigkeit. 2-3 Minuten Pause zwischen Sätzen. Essentiell für Sportler in Sportarten mit explosiven Bewegungen."
            }
          ]
        },
        "howToTest": {
          "title": "Wie Sie genaue Schätzungen erhalten",
          "items": [
            {
              "text": "Verwenden Sie ein Gewicht, das Sie für 2-10 Wiederholungen with sauberer Form heben können — Genauigkeit sinkt deutlich über 10 Wiederholungen",
              "type": "info"
            },
            {
              "text": "Testen Sie vollständig erholt — Ermüdung, schlechter Schlaf und Stress senken alle Ihre wahre Kapazität und verzerren die Ergebnisse",
              "type": "info"
            },
            {
              "text": "Beenden Sie den Satz bei Formverlust — zählen Sie nur saubere, vollständige Wiederholungen mit korrekter Technik",
              "type": "warning"
            },
            {
              "text": "Jede Übung hat ihr eigenes 1RM — wenden Sie niemals Ihr Bankdrück-Maximum auf Kniebeuge oder Kreuzheben an",
              "type": "warning"
            },
            {
              "text": "Testen Sie alle 4-8 Wochen bei Fortschritten neu — Ihr 1RM ändert sich mit zunehmender Kraft",
              "type": "info"
            },
            {
              "text": "Niedrigere Wiederholungszahlen (3-5) geben genauere Schätzungen als höhere (8-10+)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Berechnungsbeispiele",
          "description": "Schritt-für-Schritt 1RM-Berechnungen mit verschiedenen Formeln",
          "examples": [
            {
              "title": "Bankdrücken: 102 kg × 5 Wdh",
              "steps": [
                "Epley: 102 × (1 + 5/30) = 102 × 1,167 = 119 kg",
                "Brzycki: 102 × 36/(37-5) = 102 × 1,125 = 115 kg",
                "Lombardi: 102 × 5^0,10 = 102 × 1,175 = 120 kg",
                "Durchschnitt aller 7 Formeln ≈ 117 kg"
              ],
              "result": "Geschätztes 1RM: ~117 kg → Kraft (85%): 99 kg | Hypertrophie (75%): 88 kg"
            },
            {
              "title": "Kniebeuge: 140 kg × 3 Wdh",
              "steps": [
                "Epley: 140 × (1 + 3/30) = 140 × 1,10 = 154 kg",
                "Brzycki: 140 × 36/(37-3) = 140 × 1,059 = 148 kg",
                "Wathen: 100×140 / (48,8 + 53,8×e^(−0,075×3)) ≈ 153 kg",
                "Durchschnitt aller 7 Formeln ≈ 151 kg"
              ],
              "result": "Geschätztes 1RM: ~151 kg → Kraft (85%): 128 kg | Hypertrophie (75%): 113 kg"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie genau ist der Ein-Wiederholungs-Maximum-Rechner?",
          "answer": "Bei Verwendung von Sätzen mit 2-10 Wiederholungen, die bis nahe ans Muskelversagen mit sauberer Form ausgeführt werden, sind 1RM-Schätzungen typischerweise innerhalb von 5% Ihres tatsächlichen Maximums. Die Genauigkeit nimmt über 10 Wiederholungen deutlich ab. Die Verwendung des Durchschnitts aller 7 Formeln hilft, Verzerrungen einzelner Formeln zu reduzieren. Für die zuverlässigste Schätzung verwenden Sie ein herausforderndes Gewicht, das Sie für 3-5 saubere Wiederholungen heben können."
        },
        {
          "question": "Welche 1RM-Formel sollte ich verwenden?",
          "answer": "Für die meisten Menschen wird der Durchschnitt (Standard) empfohlen, da er die Tendenzen aller sieben Formeln ausgleicht. Falls Sie eine einzelne Formel bevorzugen: Epley ist die beliebteste für den allgemeinen Gebrauch, Brzycki liefert konservative Schätzungen gut für sicherheitsorientiertes Training, und Wathen wird von der NSCA für explosive Athleten bevorzugt. Die Formeln stimmen bei 2-6 Wiederholungen eng überein, divergieren aber mehr bei höheren Wiederholungsbereichen."
        },
        {
          "question": "Warum unterscheidet sich mein Bankdrück-1RM von meinem Kniebeuge-1RM?",
          "answer": "Jede Übung involviert verschiedene Muskelgruppen, Gelenkmechaniken und Hebelverhältnisse. Ihr 1RM ist spezifisch für jede Bewegung. Typische Kraftverhältnisse für trainierte Männer sind etwa: Kreuzheben > Kniebeuge > Bankdrücken > Überkopfdrücken, wobei Kreuzheben meist das 1,2-1,5-fache des Bankdrückens und Überkopfdrücken etwa 0,6-0,7-faches des Bankdrückens beträgt."
        },
        {
          "question": "Wie oft sollte ich mein 1RM neu testen?",
          "answer": "Schätzen Sie Ihr 1RM alle 4-8 Wochen während eines Trainingszyklus neu. Anfänger können schnelle Veränderungen sehen und profitieren möglicherweise von monatlichen Tests, während Fortgeschrittene nur alle 8-12 Wochen neu testen müssen. Sie müssen keinen tatsächlichen Maximalversuch durchführen — verwenden Sie einfach einen aktuellen schweren Satz von 3-5 Wiederholungen in diesem Rechner, um Ihre Schätzung zu aktualisieren."
        },
        {
          "question": "Kann ich diesen Rechner für gewichtete Klimmzüge und Dips verwenden?",
          "answer": "Ja. Für gewichtete Körpergewichtsübungen geben Sie Ihre Gesamtlast (Körpergewicht + zusätzliches Gewicht) als gehobenes Gewicht ein. Wenn Sie beispielsweise 82 kg wiegen und 20 kg für Klimmzüge hinzufügen, geben Sie 102 kg ein. Der Rechner schätzt Ihr Gesamt-1RM einschließlich Körpergewicht. Ziehen Sie Ihr Körpergewicht ab, um herauszufinden, wie viel externes Gewicht für Trainingszonen hinzuzufügen ist."
        },
        {
          "question": "Was ist der Unterschied zwischen 1RM und PR?",
          "answer": "1RM (Ein-Wiederholungs-Maximum) ist das schwerste Gewicht, das Sie derzeit für eine Wiederholung heben können — es schwankt basierend auf Training, Erholung, Schlaf und Ernährung. PR (Persönlicher Rekord) ist das schwerste Gewicht, das Sie jemals gehoben haben, unabhängig davon, wann. Ihr aktuelles 1RM kann höher oder niedriger als Ihr PR sein, abhängig von Ihrem aktuellen Trainingszustand und Fitnessniveau."
        },
        {
          "question": "Wie verwende ich die Aufwärm-Progression?",
          "answer": "Die Aufwärm-Progression zeigt 6 Sätze, die zu Ihrem 1RM-Versuch führen. Beginnen Sie mit 40% für 8 Wdh, dann 50% für 5 Wdh, 60% für 4 Wdh, 70% für 3 Wdh, 80% für 2 Wdh und 90% für 1 Wdh. Pausieren Sie 1-5 Minuten zwischen Sätzen (längere Pausen bei steigendem Gewicht). Diese Progression bereitet Ihr Nervensystem vor und minimiert gleichzeitig Ermüdung vor Ihrem Maximalversuch."
        },
        {
          "question": "Was bedeuten die Kraftstandards?",
          "answer": "Kraftstandards klassifizieren Ihr 1RM relativ zu Ihrem Körpergewicht in Anfänger-, Fortgeschrittenen-, Profi- und Elite-Niveau. Diese basieren auf Daten von über 150 Millionen verfolgten Hebungen von Krafttrainings-Communities. Standards variieren nach Übung, Geschlecht und Körpergewicht. Geben Sie Ihr Körpergewicht ein, um zu sehen, wo Sie stehen und realistische Ziele für den Fortschritt zu setzen."
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
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      }
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // INPUTS (SIMPLIFIED - removed checkbox)
  // ═══════════════════════════════════════════════════════════════
  inputs: [
    {
      id: "exercise",
      type: "select",
      defaultValue: "benchPress",
      options: [
        { value: "benchPress" },
        { value: "backSquat" },
        { value: "deadlift" },
        { value: "overheadPress" },
        { value: "barbellRow" },
        { value: "frontSquat" },
        { value: "inclineBench" },
        { value: "romanianDeadlift" },
        { value: "hipThrust" },
        { value: "legPress" },
      ],
    },
    {
      id: "weight",
      type: "number",
      defaultValue: null,
      placeholder: "225",
      min: 10,
      max: 2000,
      unitType: "weight",
      syncGroup: false,
      defaultUnit: "lbs",
      allowedUnits: ["kg", "lbs", "st"],
    },
    {
      id: "reps",
      type: "number",
      defaultValue: 5,
      min: 1,
      max: 15,
      step: 1,
    },
    {
      id: "formula",
      type: "select",
      defaultValue: "average",
      options: [
        { value: "average" },
        { value: "epley" },
        { value: "brzycki" },
        { value: "lombardi" },
        { value: "mayhew" },
        { value: "wathen" },
        { value: "oconner" },
        { value: "lander" },
      ],
    },
    {
      id: "bodyweight",
      type: "number",
      defaultValue: null,
      placeholder: "180",
      min: 80,
      max: 500,
      unitType: "weight",
      syncGroup: false,
      defaultUnit: "lbs",
      allowedUnits: ["kg", "lbs", "st"],
    },
  ],

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
