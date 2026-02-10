// ⚡ UPDATED V4 — Unit Dropdown System + Unit Engine + DetailedTables (2026-02-05)
// Changes:
// 1. REMOVED unitSystem radio → Each field has its own unitType dropdown
// 2. ADDED syncGroup: false to ALL unitType fields
// 3. UPDATED calculate() to use Unit Engine (normalizeToBase)
// 4. ADDED Navy Standards detailedTable
// 5. ADDED Method Comparison detailedTable (when ≥3 methods have data)

import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// =============================================================================
// BODY FAT CALCULATOR V4 — 5 METHODS (UPDATED)
// =============================================================================
// Methods: U.S. Navy, BMI (Deurenberg), CUN-BAE, BAI, RFM
// All methods work without calipers — tape measure + scale only
// NEW: unitType dropdowns, Unit Engine conversion, 2 detailedTables
// =============================================================================

export const bodyFatConfig: CalculatorConfigV4 = {
  id: "body-fat",
  version: "4.0",
  category: "health",
  icon: "📐",

  // ═══════════════════════════════════════════════════════════════════
  // PRESETS
  // ═══════════════════════════════════════════════════════════════════
  presets: [
    {
      id: "athleticMale",
      icon: "🏋️",
      values: {
        method: "navy",
        gender: "male",
        age: 28,
        weight: 185, // lbs (defaultUnit)
        height: 70, // inches as number (for ft_in: 5'10" = 70in)
        waist: 32, // inches (defaultUnit)
        neck: 15.5, // inches (defaultUnit)
      },
    },
    {
      id: "averageFemale",
      icon: "👩",
      values: {
        method: "navy",
        gender: "female",
        age: 32,
        weight: 145, // lbs
        height: 65, // inches (5'5" = 65in)
        waist: 28, // inches
        neck: 13, // inches
        hip: 38, // inches
      },
    },
    {
      id: "quickCheck",
      icon: "⚡",
      values: {
        method: "bmi",
        gender: "male",
        age: 30,
        weight: 180, // lbs
        height: 70, // inches (5'10")
      },
    },],

  // ═══════════════════════════════════════════════════════════════════
  // TRANSLATIONS (EN only — ES/PT/FR via translate script)
  // ═══════════════════════════════════════════════════════════════════
  t: {
    en: {
      name: "Body Fat Calculator",
      slug: "body-fat-calculator",
      subtitle: "Estimate your body fat percentage with 5 science-backed methods — no calipers needed.",
      breadcrumb: "Body Fat",

      seo: {
        title: "Body Fat Calculator — 5 Free Methods: Navy, BMI, BAI & More",
        description: "Calculate your body fat percentage using 5 science-backed methods: U.S. Navy, BMI, CUN-BAE, BAI, and RFM. No calipers needed — just a tape measure. Instant results with body composition breakdown, fat mass, lean mass, and personalized category. Free tool in 4 languages.",
        shortDescription: "5 methods to estimate body fat — no calipers needed",
        keywords: [
          "body fat calculator",
          "body fat percentage",
          "navy method body fat",
          "body composition calculator",
          "lean body mass calculator",
          "body adiposity index",
          "body fat percentage calculator",
          "how to calculate body fat",
        ],
      },

      calculator: { yourInformation: "Your Measurements" },
      ui: {
        yourInformation: "Your Measurements",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        },
        },
      },

      inputGroups: {},

      results: {
        bodyFat: { label: "Body Fat" },
        category: { label: "Category" },
        fatMass: { label: "Fat Mass" },
        leanMass: { label: "Lean Mass" },
        bmi: { label: "BMI" },
        idealRange: { label: "Ideal Range" },
        fatToLose: { label: "Fat to Lose" },
      },

      presets: {
        athleticMale: { label: "Athletic Male", description: "Lean male, Navy method" },
        averageFemale: { label: "Average Female", description: "Average female, Navy method" },
        quickCheck: { label: "Quick BMI Check", description: "Just height + weight + age" },
      },

      tooltips: {
        bodyFat: "Your estimated body fat percentage using the selected method",
        category: "ACE (American Council on Exercise) classification",
        fatMass: "Total weight of fat tissue in your body",
        leanMass: "Everything except fat: muscle, bone, water, organs",
        bmi: "Body Mass Index — weight relative to height",
        idealRange: "Fitness-level body fat range for your gender",
        fatToLose: "Fat to lose to reach the top of the fitness range",
      },

      values: {
        "Essential Fat": "Essential Fat",
        "Athletes": "Athletes",
        "Fitness": "Fitness",
        "Average": "Average",
        "Obese": "Obese",
        "Underweight": "Underweight",
        "%": "%",
        "kg": "kg",
        "lbs": "lbs",
        "cm": "cm",
        "in": "in",
        "N/A": "N/A",
        "Fat": "Fat",
        "Lean": "Lean",
        "U.S. Navy": "U.S. Navy",
        "BMI Method": "BMI Method",
        "Tape: waist, neck": "Tape: waist, neck",
        "Tape: waist, neck, hip": "Tape: waist, neck, hip",
        "Scale + height": "Scale + height",
        "Scale + height + age": "Scale + height + age",
        "Tape: hip + height (no scale)": "Tape: hip + height (no scale)",
        "Tape: waist + height": "Tape: waist + height",
      },

      formats: {
        summary: "Body fat: {bodyFat}% ({category}) via {method}. {composition}",
      },

      infoCards: {
        methodGuide: {
          title: "🎯 Which Method to Use?",
          items: [
            "Navy: Most accurate home method — needs tape measure for waist, neck, hip",
            "BMI: Quickest — only height, weight, and age. Less precise for muscular people",
            "CUN-BAE: Research formula from Diabetes Care journal. Uses BMI + age for better accuracy",
            "BAI: Don't have a scale? Only needs hip circumference and height",
            "RFM: Simple and accurate — validated against DXA scans on 12,000+ adults",
          ],
        },
        measureTips: {
          title: "📏 How to Measure Correctly",
          items: [
            "Measure in the morning before eating, on bare skin",
            "Keep tape horizontal and snug — don't compress the skin",
            "Take 2-3 measurements at each site and use the average",
            "Exhale normally before reading waist measurement",
          ],
        },
        accuracy: {
          title: "🔬 Method Accuracy",
          items: [
            "Navy Method: ±3.5% (most accurate tape-based method)",
            "RFM: ±5% (validated vs. DXA, better than BMI)",
            "CUN-BAE: ±4.6% (better than BMI for general population)",
            "BMI Method: ±4.1% (quick but less accurate for athletes)",
            "BAI: ±6% (useful when scale not available)",
          ],
        },
      },

      referenceData: {
        categories: {
          title: "Body Fat Categories (ACE)",
          items: {
            essential: { label: "Essential Fat", value: "2-5% ♂ | 10-13% ♀" },
            athletes: { label: "Athletes", value: "6-13% ♂ | 14-20% ♀" },
            fitness: { label: "Fitness", value: "14-17% ♂ | 21-24% ♀" },
            aver
            obese: { label: "Obese", value: "25%+ ♂ | 32%+ ♀" },
          },
        },
      },

      detailedTable: {
        navyStandards: {
          button: "View Navy Body Fat Standards",
          title: "U.S. Navy Body Fat Standards",
          columns: {
            ageGroup: "Age Group",
            maleMax: "Male Max %",
            femaleMax: "Female Max %",
          },
        },
        methodComparison: {
          button: "Compare All Methods",
          title: "Method Comparison",
          columns: {
            method: "Method",
            result: "Body Fat %",
            accuracy: "Accuracy",
            requires: "Requires",
          },
        },
      },

      education: {
        whatIs: {
          title: "What Is Body Fat Percentage?",
          content: "Body fat percentage is the proportion of your total body weight that is fat tissue. Unlike BMI, which only considers height and weight, body fat percentage distinguishes between fat mass and lean mass (muscle, bone, water, and organs). This makes it a far more accurate indicator of health and fitness. For men, essential fat (the minimum needed for survival) is 2-5%, while women require 10-13% for hormonal function and reproductive health. The American Council on Exercise defines 'fitness' levels as 14-17% for men and 21-24% for women. Body fat above 25% for men or 32% for women is classified as obese. Athletes typically maintain 6-13% (men) or 14-20% (women). Knowing your body fat helps set realistic goals — a 200-pound man at 25% body fat carries 50 lbs of fat and 150 lbs of lean mass. To reach 'fitness' level (17%), he'd need to lose about 19 lbs of pure fat while preserving muscle.",
        },
        fiveMethods: {
          title: "Understanding the 5 Calculation Methods",
          content: "This calculator offers five evidence-based methods, all usable at home without calipers. The U.S. Navy method (Hodgdon & Beckett, 1984) is the gold standard for tape-measure estimates, using waist, neck, and hip circumferences with ±3.5% accuracy. The BMI method (Deurenberg, 1991) converts Body Mass Index into body fat using age and gender — quick but less accurate for muscular individuals. CUN-BAE (Gómez-Ambrosi, 2012) improves on the BMI method with a more complex formula published in Diabetes Care, accounting for nonlinear relationships between BMI, age, and fat. BAI (Bergman, 2011) uniquely requires no scale — only hip circumference and height — making it ideal when a scale isn't available. Finally, RFM (Woolcott & Bergman, 2018), published in Scientific Reports (Nature), uses only height and waist circumference but was validated against DXA scans on 12,000+ adults, offering excellent accuracy with minimal measurements.",
        },
        considerations: {
          title: "Important Considerations",
          items: [
            { text: "These are estimates, not medical diagnoses. For precise measurements, use DEXA, BodPod, or hydrostatic weighing", type: "warning" },
            { text: "Body fat percentage varies throughout the day. Measure at the same time for consistency", type: "info" },
            { text: "The Navy method is most accurate for general populations but may underestimate in very lean individuals", type: "info" },
            { text: "BMI-based methods (BMI, CUN-BAE) can overestimate body fat in muscular individuals", type: "warning" },
            { text: "Women naturally have higher essential fat (10-13%) vs. men (2-5%) due to reproductive requirements", type: "info" },
            { text: "Body fat distribution matters for health — visceral fat (around organs) is more harmful than subcutaneous", type: "warning" },
          ],
        },
        categories: {
          title: "Body Fat Categories",
          items: [
            { text: "Essential Fat (2-5% ♂, 10-13% ♀): Minimum needed for survival. Below this is dangerous", type: "warning" },
            { text: "Athletes (6-13% ♂, 14-20% ♀): Competitive athletes and bodybuilders", type: "info" },
            { text: "Fitness (14-17% ♂, 21-24% ♀): Active individuals with visible muscle definition", type: "success" },
            { text: "Average (18-24% ♂, 25-31% ♀): Healthy range for general population", type: "info" },
            { text: "Obese (25%+ ♂, 32%+ ♀): Increased health risks. Consider lifestyle changes", type: "warning" },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step examples using different methods",
          examples: [
            {
              title: "Navy Method (Male)",
              steps: [
                "Height: 70 in (177.8 cm)",
                "Waist: 32 in (81.3 cm)",
                "Neck: 15.5 in (39.4 cm)",
                "Formula: 86.010 × log₁₀(waist - neck) - 70.041 × log₁₀(height) + 36.76",
                "86.010 × log₁₀(16.5) - 70.041 × log₁₀(70) + 36.76",
                "86.010 × 1.2175 - 70.041 × 1.845 + 36.76",
              ],
              result: "Result: 12.3% body fat (Athletes category)",
            },
            {
              title: "BMI Method (Female)",
              steps: [
                "Height: 65 in (165 cm)",
                "Weight: 145 lbs (65.8 kg)",
                "Age: 32 years",
                "BMI = 65.8 / (1.65²) = 24.2",
                "Formula: 1.2 × BMI + 0.23 × age - 10.8 × sex - 5.4",
                "1.2 × 24.2 + 0.23 × 32 - 10.8 × 0 - 5.4",
              ],
              result: "Result: 30.1% body fat (Average category)",
            },
          ],
        },
      },

      faqs: [
        {
          question: "Which body fat calculation method is most accurate?",
          answer: "The U.S. Navy method is the most accurate tape-based method with ±3.5% accuracy when compared to DEXA scans. It requires waist, neck, and hip (women only) measurements. RFM is second-best at ±5% and only requires waist and height. The BMI method is quickest but least accurate (±4.1%), especially for muscular individuals. For absolute precision, DEXA, BodPod, or hydrostatic weighing are needed but are expensive and less accessible.",
        },
        {
          question: "Do I need calipers to measure body fat?",
          answer: "No! All 5 methods in this calculator work without calipers. You only need a flexible tape measure and a scale (except for BAI, which doesn't require a scale). Caliper methods (skinfold) can be accurate but require training and consistent technique. Our tape-based methods are easier to perform accurately at home.",
        },
        {
          question: "What is a healthy body fat percentage?",
          answer: "Healthy ranges vary by gender. For men: 14-17% is fitness level, 18-24% is average/acceptable. For women: 21-24% is fitness level, 25-31% is average/acceptable. Athletes often maintain lower percentages (6-13% for men, 14-20% for women), but going below essential fat levels (2-5% for men, 10-13% for women) is dangerous and can impair hormonal function and health.",
        },
        {
          question: "Why do the different methods give different results?",
          answer: "Each method uses different equations and measurements, so results vary by ±3-6%. The Navy method uses circumferences and is most accurate for general populations. BMI-based methods (BMI, CUN-BAE) use height/weight ratios and can overestimate in muscular people. RFM uses waist-to-height ratio and performs well across diverse populations. BAI uses hip-to-height and works without a scale. Use the method that best fits your available measurements and body type.",
        },
        {
          question: "How often should I measure my body fat percentage?",
          answer: "Measure every 2-4 weeks, always at the same time of day (ideally morning before eating) for consistency. Body fat changes slowly — weekly measurements show too much natural fluctuation. Take 2-3 measurements at each site and average them. Track the trend over months rather than worrying about small daily variations.",
        },
        {
          question: "Can I convert body fat percentage to pounds of fat?",
          answer: "Yes! Multiply your total weight by your body fat percentage. For example: 180 lbs × 0.20 (20% body fat) = 36 lbs of fat mass. Your lean mass is 180 - 36 = 144 lbs. This calculator shows both fat mass and lean mass in your results.",
        },
        {
          question: "Is BMI the same as body fat percentage?",
          answer: "No. BMI is a simple height-to-weight ratio that doesn't distinguish between muscle and fat. Body fat percentage specifically measures the proportion of fat in your body. A muscular person might have a high BMI but low body fat. Body fat percentage is a much better indicator of health and fitness than BMI alone.",
        },
        {
          question: "Why do women have higher body fat than men?",
          answer: "Women require more essential fat (10-13% vs. 2-5% for men) for reproductive functions and hormone production. This is biological and normal. Women's 'fitness' level (21-24%) is higher than men's (14-17%), but represents the same level of health and athleticism. These differences are accounted for in all calculation methods.",
        },
        {
          question: "What are the U.S. Navy body fat standards?",
          answer: "The Navy has maximum body fat limits by age and gender. For ages 17-39, the max is 22% for men and 33% for women. At age 40+, it increases to 23% for men and 34% for women. These are maximum allowable percentages for active duty service members, not ideal fitness levels. Click 'View Navy Body Fat Standards' in the results to see the full table.",
        },
        {
          question: "How accurate is the RFM (Relative Fat Mass) method?",
          answer: "RFM has ±5% accuracy and was validated against DXA scans on 12,000+ adults in the NHANES study (published in Scientific Reports, Nature, 2018). It's more accurate than BMI and nearly as accurate as the Navy method, but only requires waist and height measurements. RFM performs well across diverse ethnic groups (Mexican-American, European-American, African-American) and all age ranges.",
        },
        {
          question: "Can I use this calculator for children or teenagers?",
          answer: "This calculator is designed for adults (18+ years). Children and teenagers have different body composition formulas because they're still growing. The BMI and CUN-BAE methods have separate equations for youth under 18. Consult a pediatrician or use a youth-specific body composition tool for anyone under 18.",
        },
        {
          question: "What is CUN-BAE and how is it different from BMI?",
          answer: "CUN-BAE (Clínica Universidad de Navarra - Body Adiposity Estimator) is an advanced formula published in Diabetes Care (2012). It uses BMI, age, and gender but includes quadratic and interaction terms that account for nonlinear relationships. It has higher correlation with actual body fat (r=0.89) than simple BMI conversion (r=0.79). CUN-BAE is particularly accurate for predicting cardiovascular risk and type 2 diabetes.",
        },
        {
          question: "What measurements do I need for the Navy method?",
          answer: "For men: height, waist (at navel), and neck (below Adam's apple). For women: height, waist (narrowest point), neck (below Adam's apple), and hips (widest part of buttocks). Measure on bare skin with tape horizontal and snug but not compressing. Take the average of 2-3 measurements. The Navy method is ±3.5% accurate when measurements are done correctly.",
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
      "name": "Calculadora de Grasa Corporal",
      "slug": "calculadora-grasa-corporal",
      "subtitle": "Estima tu porcentaje de grasa corporal con 5 métodos respaldados por la ciencia — no necesitas calibradores.",
      "breadcrumb": "Grasa Corporal",
      "seo": {
        "title": "Calculadora de Grasa Corporal — 5 Métodos Gratuitos: Navy, IMC, BAI y Más",
        "description": "Calcula tu porcentaje de grasa corporal usando 5 métodos respaldados por la ciencia: Marina de EE.UU., IMC, CUN-BAE, BAI y RFM. No necesitas calibradores — solo una cinta métrica. Resultados instantáneos con desglose de composición corporal, masa grasa, masa magra y categoría personalizada. Herramienta gratuita en 4 idiomas.",
        "shortDescription": "5 métodos para estimar grasa corporal — no necesitas calibradores",
        "keywords": [
          "calculadora grasa corporal",
          "porcentaje grasa corporal",
          "metodo navy grasa corporal",
          "calculadora composicion corporal",
          "calculadora masa corporal magra",
          "indice adiposidad corporal",
          "calculadora porcentaje grasa corporal",
          "como calcular grasa corporal"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "method": {
          "label": "Método de Cálculo",
          "helpText": "Cada método usa medidas diferentes — las entradas se ajustan automáticamente",
          "options": {
            "navy": "🎖️ Marina de EE.UU.",
            "bmi": "⚖️ Método IMC",
            "cunbae": "🔬 CUN-BAE",
            "bai": "📏 BAI (Sin Báscula)",
            "rfm": "📐 RFM (Altura + Cintura)"
          }
        },
        "gender": {
          "label": "Género",
          "helpText": "Las fórmulas de grasa corporal difieren significativamente por género",
          "options": {
            "male": "Hombre",
            "female": "Mujer"
          }
        },
        "age": {
          "label": "Edad",
          "helpText": "Usado por los métodos IMC y CUN-BAE para estimaciones ajustadas por edad"
        },
        "weight": {
          "label": "Peso",
          "helpText": "Requerido para los métodos Navy, IMC, CUN-BAE y RFM"
        },
        "height": {
          "label": "Altura",
          "helpText": "Requerido para todos los métodos"
        },
        "waist": {
          "label": "Circunferencia de Cintura",
          "helpText": "Navy: a nivel del ombligo para hombres, punto más estrecho para mujeres. RFM: en el ombligo."
        },
        "neck": {
          "label": "Circunferencia del Cuello",
          "helpText": "Mide justo debajo de la laringe (nuez de Adán), cinta ligeramente inclinada hacia abajo"
        },
        "hip": {
          "label": "Circunferencia de Cadera",
          "helpText": "Mide en la parte más ancha de los glúteos, cinta horizontal"
        }
      },
      "inputGroups": {},
      "results": {
        "bodyFat": {
          "label": "Grasa Corporal"
        },
        "category": {
          "label": "Categoría"
        },
        "fatMass": {
          "label": "Masa Grasa"
        },
        "leanMass": {
          "label": "Masa Magra"
        },
        "bmi": {
          "label": "IMC"
        },
        "idealRange": {
          "label": "Rango Ideal"
        },
        "fatToLose": {
          "label": "Grasa a Perder"
        }
      },
      "presets": {
        "athleticMale": {
          "label": "Hombre Atlético",
          "description": "Hombre delgado, método Navy"
        },
        "averageFemale": {
          "label": "Mujer Promedio",
          "description": "Mujer promedio, método Navy"
        },
        "quickCheck": {
          "label": "Verificación Rápida IMC",
          "description": "Solo altura + peso + edad"
        },
        "noScale": {
          "label": "Sin Báscula",
          "description": "BAI: solo cadera + altura"
        }
      },
      "tooltips": {
        "bodyFat": "Tu porcentaje estimado de grasa corporal usando el método seleccionado",
        "category": "Clasificación ACE (Consejo Americano del Ejercicio)",
        "fatMass": "Peso total del tejido graso en tu cuerpo",
        "leanMass": "Todo excepto grasa: músculo, hueso, agua, órganos",
        "bmi": "Índice de Masa Corporal — peso relativo a la altura",
        "idealRange": "Rango de grasa corporal nivel fitness para tu género",
        "fatToLose": "Grasa a perder para alcanzar la parte superior del rango fitness"
      },
      "values": {
        "Essential Fat": "Grasa Esencial",
        "Athletes": "Atletas",
        "Fitness": "Fitness",
        "Average": "Promedio",
        "Obese": "Obeso",
        "Underweight": "Bajo Peso",
        "%": "%",
        "kg": "kg",
        "lbs": "lbs",
        "cm": "cm",
        "in": "in",
        "N/A": "N/A",
        "Fat": "Grasa",
        "Lean": "Masa Magra",
        "U.S. Navy": "Marina de EE.UU.",
        "BMI Method": "Método IMC",
        "Tape: waist, neck": "Cinta: cintura, cuello",
        "Tape: waist, neck, hip": "Cinta: cintura, cuello, cadera",
        "Scale + height": "Báscula + altura",
        "Scale + height + age": "Báscula + altura + edad",
        "Tape: hip + height (no scale)": "Cinta: cadera + altura (sin báscula)",
        "Tape: waist + height": "Cinta: cintura + altura"
      },
      "formats": {
        "summary": "Grasa corporal: {bodyFat}% ({category}) vía {method}. {composition}"
      },
      "infoCards": {
        "methodGuide": {
          "title": "🎯 ¿Qué Método Usar?",
          "items": [
            "Navy: Método casero más preciso — necesita cinta métrica para cintura, cuello, cadera",
            "IMC: Más rápido — solo altura, peso y edad. Menos preciso para personas musculosas",
            "CUN-BAE: Fórmula de investigación de la revista Diabetes Care. Usa IMC + edad para mejor precisión",
            "BAI: ¿No tienes báscula? Solo necesita circunferencia de cadera y altura",
            "RFM: Simple y preciso — validado contra escáneres DXA en 12,000+ adultos"
          ]
        },
        "measureTips": {
          "title": "📏 Cómo Medir Correctamente",
          "items": [
            "Mide en la mañana antes de comer, sobre piel desnuda",
            "Mantén la cinta horizontal y ajustada — no comprimas la piel",
            "Toma 2-3 medidas en cada sitio y usa el promedio",
            "Exhala normalmente antes de leer la medida de cintura"
          ]
        },
        "accuracy": {
          "title": "🔬 Precisión del Método",
          "items": [
            "Método Navy: ±3.5% (método más preciso basado en cinta)",
            "RFM: ±5% (validado vs. DXA, mejor que IMC)",
            "CUN-BAE: ±4.6% (mejor que IMC para población general)",
            "Método IMC: ±4.1% (rápido pero menos preciso para atletas)",
            "BAI: ±6% (útil cuando no hay báscula disponible)"
          ]
        }
      },
      "referenceData": {
        "categories": {
          "title": "Categorías de Grasa Corporal (ACE)",
          "items": {
            "essential": {
              "label": "Grasa Esencial",
              "value": "2-5% ♂ | 10-13% ♀"
            },
            "athletes": {
              "label": "Atletas",
              "value": "6-13% ♂ | 14-20% ♀"
            },
            "fitness": {
              "label": "Fitness",
              "value": "14-17% ♂ | 21-24% ♀"
            },
            "average": {
              "label": "Promedio",
              "value": "18-24% ♂ | 25-31% ♀"
            },
            "obese": {
              "label": "Obeso",
              "value": "25%+ ♂ | 32%+ ♀"
            }
          }
        }
      },
      "detailedTable": {
        "navyStandards": {
          "button": "Ver Estándares de Grasa Corporal de la Marina",
          "title": "Estándares de Grasa Corporal de la Marina de EE.UU.",
          "columns": {
            "ageGroup": "Grupo de Edad",
            "maleMax": "Máx. Hombre %",
            "femaleMax": "Máx. Mujer %"
          }
        },
        "methodComparison": {
          "button": "Comparar Todos los Métodos",
          "title": "Comparación de Métodos",
          "columns": {
            "method": "Método",
            "result": "Grasa Corporal %",
            "accuracy": "Precisión",
            "requires": "Requiere"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es el Porcentaje de Grasa Corporal?",
          "content": "El porcentaje de grasa corporal es la proporción de tu peso corporal total que es tejido graso. A diferencia del IMC, que solo considera altura y peso, el porcentaje de grasa corporal distingue entre masa grasa y masa magra (músculo, hueso, agua y órganos). Esto lo convierte en un indicador mucho más preciso de salud y fitness. Para hombres, la grasa esencial (el mínimo necesario para supervivencia) es 2-5%, mientras que las mujeres requieren 10-13% para función hormonal y salud reproductiva. El Consejo Americano del Ejercicio define niveles 'fitness' como 14-17% para hombres y 21-24% para mujeres. Grasa corporal por encima de 25% para hombres o 32% para mujeres se clasifica como obeso. Los atletas típicamente mantienen 6-13% (hombres) o 14-20% (mujeres). Conocer tu grasa corporal ayuda a establecer metas realistas — un hombre de 200 libras con 25% de grasa corporal tiene 50 lbs de grasa y 150 lbs de masa magra. Para alcanzar nivel 'fitness' (17%), necesitaría perder alrededor de 19 lbs de grasa pura mientras preserva músculo."
        },
        "fiveMethods": {
          "title": "Entendiendo los 5 Métodos de Cálculo",
          "content": "Esta calculadora ofrece cinco métodos basados en evidencia, todos utilizables en casa sin calibradores. El método de la Marina de EE.UU. (Hodgdon & Beckett, 1984) es el estándar de oro para estimaciones con cinta métrica, usando circunferencias de cintura, cuello y cadera con ±3.5% de precisión. El método IMC (Deurenberg, 1991) convierte el Índice de Masa Corporal en grasa corporal usando edad y género — rápido pero menos preciso para individuos musculosos. CUN-BAE (Gómez-Ambrosi, 2012) mejora el método IMC con una fórmula más compleja publicada en Diabetes Care, considerando relaciones no lineales entre IMC, edad y grasa. BAI (Bergman, 2011) únicamente no requiere báscula — solo circunferencia de cadera y altura — haciéndolo ideal cuando no hay báscula disponible. Finalmente, RFM (Woolcott & Bergman, 2018), publicado en Scientific Reports (Nature), usa solo altura y circunferencia de cintura pero fue validado contra escáneres DXA en 12,000+ adultos, ofreciendo excelente precisión con medidas mínimas."
        },
        "considerations": {
          "title": "Consideraciones Importantes",
          "items": [
            {
              "text": "Estas son estimaciones, no diagnósticos médicos. Para medidas precisas, usa DEXA, BodPod o pesaje hidrostático",
              "type": "warning"
            },
            {
              "text": "El porcentaje de grasa corporal varía durante el día. Mide a la misma hora para consistencia",
              "type": "info"
            },
            {
              "text": "El método Navy es más preciso para poblaciones generales pero puede subestimar en individuos muy delgados",
              "type": "info"
            },
            {
              "text": "Los métodos basados en IMC (IMC, CUN-BAE) pueden sobreestimar grasa corporal en individuos musculosos",
              "type": "warning"
            },
            {
              "text": "Las mujeres naturalmente tienen mayor grasa esencial (10-13%) vs. hombres (2-5%) debido a requerimientos reproductivos",
              "type": "info"
            },
            {
              "text": "La distribución de grasa corporal importa para la salud — grasa visceral (alrededor de órganos) es más dañina que subcutánea",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Categorías de Grasa Corporal",
          "items": [
            {
              "text": "Grasa Esencial (2-5% ♂, 10-13% ♀): Mínimo necesario para supervivencia. Por debajo de esto es peligroso",
              "type": "warning"
            },
            {
              "text": "Atletas (6-13% ♂, 14-20% ♀): Atletas competitivos y fisiculturistas",
              "type": "info"
            },
            {
              "text": "Fitness (14-17% ♂, 21-24% ♀): Individuos activos con definición muscular visible",
              "type": "success"
            },
            {
              "text": "Promedio (18-24% ♂, 25-31% ♀): Rango saludable para población general",
              "type": "info"
            },
            {
              "text": "Obeso (25%+ ♂, 32%+ ♀): Riesgos de salud aumentados. Considera cambios de estilo de vida",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo",
          "description": "Ejemplos paso a paso usando diferentes métodos",
          "examples": [
            {
              "title": "Método Navy (Hombre)",
              "steps": [
                "Altura: 70 in (177.8 cm)",
                "Cintura: 32 in (81.3 cm)",
                "Cuello: 15.5 in (39.4 cm)",
                "Fórmula: 86.010 × log₁₀(cintura - cuello) - 70.041 × log₁₀(altura) + 36.76",
                "86.010 × log₁₀(16.5) - 70.041 × log₁₀(70) + 36.76",
                "86.010 × 1.2175 - 70.041 × 1.845 + 36.76"
              ],
              "result": "Resultado: 12.3% grasa corporal (categoría Atletas)"
            },
            {
              "title": "Método IMC (Mujer)",
              "steps": [
                "Altura: 65 in (165 cm)",
                "Peso: 145 lbs (65.8 kg)",
                "Edad: 32 años",
                "IMC = 65.8 / (1.65²) = 24.2",
                "Fórmula: 1.2 × IMC + 0.23 × edad - 10.8 × sexo - 5.4",
                "1.2 × 24.2 + 0.23 × 32 - 10.8 × 0 - 5.4"
              ],
              "result": "Resultado: 30.1% grasa corporal (categoría Promedio)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuál método de cálculo de grasa corporal es más preciso?",
          "answer": "El método de la Marina de EE.UU. es el método más preciso basado en cinta con ±3.5% de precisión cuando se compara con escáneres DEXA. Requiere medidas de cintura, cuello y cadera (solo mujeres). RFM es segundo mejor con ±5% y solo requiere cintura y altura. El método IMC es más rápido pero menos preciso (±4.1%), especialmente para individuos musculosos. Para precisión absoluta, se necesitan DEXA, BodPod o pesaje hidrostático, pero son costosos y menos accesibles."
        },
        {
          "question": "¿Necesito calibradores para medir grasa corporal?",
          "answer": "¡No! Los 5 métodos en esta calculadora funcionan sin calibradores. Solo necesitas una cinta métrica flexible y una báscula (excepto para BAI, que no requiere báscula). Los métodos con calibradores (pliegues cutáneos) pueden ser precisos pero requieren entrenamiento y técnica consistente. Nuestros métodos basados en cinta son más fáciles de realizar con precisión en casa."
        },
        {
          "question": "¿Cuál es un porcentaje saludable de grasa corporal?",
          "answer": "Los rangos saludables varían por género. Para hombres: 14-17% es nivel fitness, 18-24% es promedio/aceptable. Para mujeres: 21-24% es nivel fitness, 25-31% es promedio/aceptable. Los atletas a menudo mantienen porcentajes más bajos (6-13% para hombres, 14-20% para mujeres), pero ir por debajo de niveles de grasa esencial (2-5% para hombres, 10-13% para mujeres) es peligroso y puede afectar la función hormonal y la salud."
        },
        {
          "question": "¿Por qué los diferentes métodos dan resultados diferentes?",
          "answer": "Cada método usa diferentes ecuaciones y medidas, por lo que los resultados varían ±3-6%. El método Navy usa circunferencias y es más preciso para poblaciones generales. Los métodos basados en IMC (IMC, CUN-BAE) usan ratios altura/peso y pueden sobreestimar en personas musculosas. RFM usa ratio cintura-altura y funciona bien en poblaciones diversas. BAI usa cadera-altura y funciona sin báscula. Usa el método que mejor se ajuste a tus medidas disponibles y tipo de cuerpo."
        },
        {
          "question": "¿Con qué frecuencia debo medir mi porcentaje de grasa corporal?",
          "answer": "Mide cada 2-4 semanas, siempre a la misma hora del día (idealmente en la mañana antes de comer) para consistencia. La grasa corporal cambia lentamente — las medidas semanales muestran demasiada fluctuación natural. Toma 2-3 medidas en cada sitio y promédia-las. Rastrea la tendencia durante meses en lugar de preocuparte por pequeñas variaciones diarias."
        },
        {
          "question": "¿Puedo convertir porcentaje de grasa corporal a libras de grasa?",
          "answer": "¡Sí! Multiplica tu peso total por tu porcentaje de grasa corporal. Por ejemplo: 180 lbs × 0.20 (20% grasa corporal) = 36 lbs de masa grasa. Tu masa magra es 180 - 36 = 144 lbs. Esta calculadora muestra tanto masa grasa como masa magra en tus resultados."
        },
        {
          "question": "¿Es el IMC lo mismo que el porcentaje de grasa corporal?",
          "answer": "No. El IMC es un simple ratio altura-peso que no distingue entre músculo y grasa. El porcentaje de grasa corporal específicamente mide la proporción de grasa en tu cuerpo. Una persona musculosa podría tener un IMC alto pero baja grasa corporal. El porcentaje de grasa corporal es un indicador mucho mejor de salud y fitness que solo el IMC."
        },
        {
          "question": "¿Por qué las mujeres tienen mayor grasa corporal que los hombres?",
          "answer": "Las mujeres requieren más grasa esencial (10-13% vs. 2-5% para hombres) para funciones reproductivas y producción hormonal. Esto es biológico y normal. El nivel 'fitness' de las mujeres (21-24%) es más alto que el de los hombres (14-17%), pero representa el mismo nivel de salud y atletismo. Estas diferencias están consideradas en todos los métodos de cálculo."
        },
        {
          "question": "¿Cuáles son los estándares de grasa corporal de la Marina de EE.UU.?",
          "answer": "La Marina tiene límites máximos de grasa corporal por edad y género. Para edades 17-39, el máximo es 22% para hombres y 33% para mujeres. A los 40+, aumenta a 23% para hombres y 34% para mujeres. Estos son porcentajes máximos permitidos para miembros en servicio activo, no niveles ideales de fitness. Haz clic en 'Ver Estándares de Grasa Corporal de la Marina' en los resultados para ver la tabla completa."
        },
        {
          "question": "¿Qué tan preciso es el método RFM (Masa Grasa Relativa)?",
          "answer": "RFM tiene ±5% de precisión y fue validado contra escáneres DXA en 12,000+ adultos en el estudio NHANES (publicado en Scientific Reports, Nature, 2018). Es más preciso que el IMC y casi tan preciso como el método Navy, pero solo requiere medidas de cintura y altura. RFM funciona bien en diversos grupos étnicos (mexicano-americano, europeo-americano, afro-americano) y todos los rangos de edad."
        },
        {
          "question": "¿Puedo usar esta calculadora para niños o adolescentes?",
          "answer": "Esta calculadora está diseñada para adultos (18+ años). Los niños y adolescentes tienen diferentes fórmulas de composición corporal porque aún están creciendo. Los métodos IMC y CUN-BAE tienen ecuaciones separadas para jóvenes menores de 18. Consulta un pediatra o usa una herramienta de composición corporal específica para jóvenes para cualquier persona menor de 18."
        },
        {
          "question": "¿Qué es CUN-BAE y cómo es diferente del IMC?",
          "answer": "CUN-BAE (Clínica Universidad de Navarra - Estimador de Adiposidad Corporal) es una fórmula avanzada publicada en Diabetes Care (2012). Usa IMC, edad y género pero incluye términos cuadráticos y de interacción que consideran relaciones no lineales. Tiene mayor correlación con grasa corporal real (r=0.89) que conversión simple de IMC (r=0.79). CUN-BAE es particularmente preciso para predecir riesgo cardiovascular y diabetes tipo 2."
        },
        {
          "question": "¿Qué medidas necesito para el método Navy?",
          "answer": "Para hombres: altura, cintura (en el ombligo) y cuello (debajo de la nuez de Adán). Para mujeres: altura, cintura (punto más estrecho), cuello (debajo de la nuez de Adán) y caderas (parte más ancha de los glúteos). Mide sobre piel desnuda con cinta horizontal y ajustada pero sin comprimir. Toma el promedio de 2-3 medidas. El método Navy es ±3.5% preciso cuando las medidas se hacen correctamente."
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
        "saving": "Guardando...",
      },
      "share": {
        "calculatedWith": "Calculado con Kalcufy.com"
      },
      "ui": {
        "results": "Resultados",
        "yourInformation": "Tu Información"
      },
      "accessibility": {
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
        "ratings": "calificaciones",
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
      "name": "Calculadora de Gordura Corporal",
      "slug": "calculadora-gordura-corporal",
      "subtitle": "Estime sua porcentagem de gordura corporal com 5 métodos cientificamente comprovados — sem necessidade de adipômetros.",
      "breadcrumb": "Gordura Corporal",
      "seo": {
        "title": "Calculadora de Gordura Corporal — 5 Métodos Gratuitos: Marinha, IMC, BAI e Mais",
        "description": "Calcule sua porcentagem de gordura corporal usando 5 métodos cientificamente comprovados: Marinha dos EUA, IMC, CUN-BAE, BAI e RFM. Sem necessidade de adipômetros — apenas uma fita métrica. Resultados instantâneos com análise da composição corporal, massa gorda, massa magra e categoria personalizada. Ferramenta gratuita em 4 idiomas.",
        "shortDescription": "5 métodos para estimar gordura corporal — sem adipômetros",
        "keywords": [
          "calculadora gordura corporal",
          "porcentagem gordura corporal",
          "método marinha gordura corporal",
          "calculadora composição corporal",
          "calculadora massa magra",
          "índice adiposidade corporal",
          "calculadora porcentagem gordura corporal",
          "como calcular gordura corporal"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "method": {
          "label": "Método de Cálculo",
          "helpText": "Cada método usa medidas diferentes — os campos se ajustam automaticamente",
          "options": {
            "navy": "🎖️ Marinha dos EUA",
            "bmi": "⚖️ Método IMC",
            "cunbae": "🔬 CUN-BAE",
            "bai": "📏 BAI (Sem Balança)",
            "rfm": "📐 RFM (Altura + Cintura)"
          }
        },
        "gender": {
          "label": "Sexo",
          "helpText": "As fórmulas de gordura corporal diferem significativamente por sexo",
          "options": {
            "male": "Masculino",
            "female": "Feminino"
          }
        },
        "age": {
          "label": "Idade",
          "helpText": "Usado pelos métodos IMC e CUN-BAE para estimativas ajustadas por idade"
        },
        "weight": {
          "label": "Peso",
          "helpText": "Necessário para os métodos Marinha, IMC, CUN-BAE e RFM"
        },
        "height": {
          "label": "Altura",
          "helpText": "Necessário para todos os métodos"
        },
        "waist": {
          "label": "Circunferência da Cintura",
          "helpText": "Marinha: ao nível do umbigo para homens, ponto mais estreito para mulheres. RFM: ao nível do umbigo."
        },
        "neck": {
          "label": "Circunferência do Pescoço",
          "helpText": "Meça logo abaixo da laringe (pomo de Adão), fita ligeiramente inclinada para baixo"
        },
        "hip": {
          "label": "Circunferência do Quadril",
          "helpText": "Meça na parte mais larga das nádegas, fita horizontal"
        }
      },
      "inputGroups": {},
      "results": {
        "bodyFat": {
          "label": "Gordura Corporal"
        },
        "category": {
          "label": "Categoria"
        },
        "fatMass": {
          "label": "Massa Gorda"
        },
        "leanMass": {
          "label": "Massa Magra"
        },
        "bmi": {
          "label": "IMC"
        },
        "idealRange": {
          "label": "Faixa Ideal"
        },
        "fatToLose": {
          "label": "Gordura a Perder"
        }
      },
      "presets": {
        "athleticMale": {
          "label": "Homem Atlético",
          "description": "Homem magro, método Marinha"
        },
        "averageFemale": {
          "label": "Mulher Média",
          "description": "Mulher média, método Marinha"
        },
        "quickCheck": {
          "label": "Verificação Rápida IMC",
          "description": "Apenas altura + peso + idade"
        },
        "noScale": {
          "label": "Sem Balança",
          "description": "BAI: apenas quadril + altura"
        }
      },
      "tooltips": {
        "bodyFat": "Sua porcentagem estimada de gordura corporal usando o método selecionado",
        "category": "Classificação ACE (Conselho Americano de Exercício)",
        "fatMass": "Peso total do tecido adiposo em seu corpo",
        "leanMass": "Tudo exceto gordura: músculo, osso, água, órgãos",
        "bmi": "Índice de Massa Corporal — peso relativo à altura",
        "idealRange": "Faixa de gordura corporal de nível fitness para seu sexo",
        "fatToLose": "Gordura a perder para atingir o topo da faixa fitness"
      },
      "values": {
        "Essential Fat": "Gordura Essencial",
        "Athletes": "Atletas",
        "Fitness": "Fitness",
        "Average": "Média",
        "Obese": "Obeso",
        "Underweight": "Abaixo do Peso",
        "%": "%",
        "kg": "kg",
        "lbs": "lbs",
        "cm": "cm",
        "in": "pol",
        "N/A": "N/A",
        "Fat": "Gordura",
        "Lean": "Massa Magra",
        "U.S. Navy": "Marinha dos EUA",
        "BMI Method": "Método IMC",
        "Tape: waist, neck": "Fita: cintura, pescoço",
        "Tape: waist, neck, hip": "Fita: cintura, pescoço, quadril",
        "Scale + height": "Balança + altura",
        "Scale + height + age": "Balança + altura + idade",
        "Tape: hip + height (no scale)": "Fita: quadril + altura (sem balança)",
        "Tape: waist + height": "Fita: cintura + altura"
      },
      "formats": {
        "summary": "Gordura corporal: {bodyFat}% ({category}) via {method}. {composition}"
      },
      "infoCards": {
        "methodGuide": {
          "title": "🎯 Qual Método Usar?",
          "items": [
            "Marinha: Método caseiro mais preciso — precisa de fita métrica para cintura, pescoço, quadril",
            "IMC: Mais rápido — apenas altura, peso e idade. Menos preciso para pessoas musculosas",
            "CUN-BAE: Fórmula de pesquisa da revista Diabetes Care. Usa IMC + idade para melhor precisão",
            "BAI: Não tem balança? Precisa apenas da circunferência do quadril e altura",
            "RFM: Simples e preciso — validado contra exames DXA em mais de 12.000 adultos"
          ]
        },
        "measureTips": {
          "title": "📏 Como Medir Corretamente",
          "items": [
            "Meça pela manhã antes de comer, na pele nua",
            "Mantenha a fita horizontal e justa — não comprima a pele",
            "Faça 2-3 medições em cada local e use a média",
            "Expire normalmente antes de ler a medida da cintura"
          ]
        },
        "accuracy": {
          "title": "🔬 Precisão dos Métodos",
          "items": [
            "Método Marinha: ±3,5% (método mais preciso baseado em fita)",
            "RFM: ±5% (validado vs. DXA, melhor que IMC)",
            "CUN-BAE: ±4,6% (melhor que IMC para população geral)",
            "Método IMC: ±4,1% (rápido mas menos preciso para atletas)",
            "BAI: ±6% (útil quando balança não está disponível)"
          ]
        }
      },
      "referenceData": {
        "categories": {
          "title": "Categorias de Gordura Corporal (ACE)",
          "items": {
            "essential": {
              "label": "Gordura Essencial",
              "value": "2-5% ♂ | 10-13% ♀"
            },
            "athletes": {
              "label": "Atletas",
              "value": "6-13% ♂ | 14-20% ♀"
            },
            "fitness": {
              "label": "Fitness",
              "value": "14-17% ♂ | 21-24% ♀"
            },
            "average": {
              "label": "Média",
              "value": "18-24% ♂ | 25-31% ♀"
            },
            "obese": {
              "label": "Obeso",
              "value": "25%+ ♂ | 32%+ ♀"
            }
          }
        }
      },
      "detailedTable": {
        "navyStandards": {
          "button": "Ver Padrões Marinha de Gordura Corporal",
          "title": "Padrões de Gordura Corporal da Marinha dos EUA",
          "columns": {
            "ageGroup": "Faixa Etária",
            "maleMax": "Máx. Masculino %",
            "femaleMax": "Máx. Feminino %"
          }
        },
        "methodComparison": {
          "button": "Comparar Todos os Métodos",
          "title": "Comparação de Métodos",
          "columns": {
            "method": "Método",
            "result": "Gordura Corporal %",
            "accuracy": "Precisão",
            "requires": "Requer"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é Porcentagem de Gordura Corporal?",
          "content": "A porcentagem de gordura corporal é a proporção do seu peso corporal total que é tecido adiposo. Diferente do IMC, que considera apenas altura e peso, a porcentagem de gordura corporal distingue entre massa gorda e massa magra (músculo, osso, água e órgãos). Isso a torna um indicador muito mais preciso de saúde e condicionamento físico. Para homens, a gordura essencial (o mínimo necessário para sobrevivência) é 2-5%, enquanto as mulheres precisam de 10-13% para função hormonal e saúde reprodutiva. O Conselho Americano de Exercício define níveis 'fitness' como 14-17% para homens e 21-24% para mulheres. Gordura corporal acima de 25% para homens ou 32% para mulheres é classificada como obesa. Atletas tipicamente mantêm 6-13% (homens) ou 14-20% (mulheres). Conhecer sua gordura corporal ajuda a definir metas realistas — um homem de 90kg com 25% de gordura corporal carrega 22,5kg de gordura e 67,5kg de massa magra. Para atingir nível 'fitness' (17%), ele precisaria perder cerca de 8,6kg de gordura pura preservando o músculo."
        },
        "fiveMethods": {
          "title": "Entendendo os 5 Métodos de Cálculo",
          "content": "Esta calculadora oferece cinco métodos baseados em evidências, todos utilizáveis em casa sem adipômetros. O método da Marinha dos EUA (Hodgdon & Beckett, 1984) é o padrão ouro para estimativas com fita métrica, usando circunferências da cintura, pescoço e quadril com ±3,5% de precisão. O método IMC (Deurenberg, 1991) converte o Índice de Massa Corporal em gordura corporal usando idade e sexo — rápido mas menos preciso para indivíduos musculosos. CUN-BAE (Gómez-Ambrosi, 2012) melhora o método IMC com uma fórmula mais complexa publicada na Diabetes Care, considerando relações não-lineares entre IMC, idade e gordura. BAI (Bergman, 2011) unicamente não requer balança — apenas circunferência do quadril e altura — ideal quando uma balança não está disponível. Finalmente, RFM (Woolcott & Bergman, 2018), publicado em Scientific Reports (Nature), usa apenas altura e circunferência da cintura mas foi validado contra exames DXA em mais de 12.000 adultos, oferecendo excelente precisão com medidas mínimas."
        },
        "considerations": {
          "title": "Considerações Importantes",
          "items": [
            {
              "text": "Estas são estimativas, não diagnósticos médicos. Para medições precisas, use DEXA, BodPod ou pesagem hidrostática",
              "type": "warning"
            },
            {
              "text": "A porcentagem de gordura corporal varia ao longo do dia. Meça no mesmo horário para consistência",
              "type": "info"
            },
            {
              "text": "O método da Marinha é mais preciso para populações gerais mas pode subestimar em indivíduos muito magros",
              "type": "info"
            },
            {
              "text": "Métodos baseados em IMC (IMC, CUN-BAE) podem superestimar gordura corporal em indivíduos musculosos",
              "type": "warning"
            },
            {
              "text": "Mulheres naturalmente têm maior gordura essencial (10-13%) vs. homens (2-5%) devido a requisitos reprodutivos",
              "type": "info"
            },
            {
              "text": "A distribuição de gordura corporal importa para a saúde — gordura visceral (ao redor dos órgãos) é mais prejudicial que subcutânea",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Categorias de Gordura Corporal",
          "items": [
            {
              "text": "Gordura Essencial (2-5% ♂, 10-13% ♀): Mínimo necessário para sobrevivência. Abaixo disso é perigoso",
              "type": "warning"
            },
            {
              "text": "Atletas (6-13% ♂, 14-20% ♀): Atletas competitivos e fisiculturistas",
              "type": "info"
            },
            {
              "text": "Fitness (14-17% ♂, 21-24% ♀): Indivíduos ativos com definição muscular visível",
              "type": "success"
            },
            {
              "text": "Média (18-24% ♂, 25-31% ♀): Faixa saudável para população geral",
              "type": "info"
            },
            {
              "text": "Obeso (25%+ ♂, 32%+ ♀): Riscos aumentados à saúde. Considere mudanças no estilo de vida",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo",
          "description": "Exemplos passo a passo usando diferentes métodos",
          "examples": [
            {
              "title": "Método Marinha (Masculino)",
              "steps": [
                "Altura: 178 cm (70 pol)",
                "Cintura: 81 cm (32 pol)",
                "Pescoço: 39 cm (15,5 pol)",
                "Fórmula: 86,010 × log₁₀(cintura - pescoço) - 70,041 × log₁₀(altura) + 36,76",
                "86,010 × log₁₀(42) - 70,041 × log₁₀(178) + 36,76",
                "86,010 × 1,623 - 70,041 × 2,250 + 36,76"
              ],
              "result": "Resultado: 12,3% gordura corporal (categoria Atletas)"
            },
            {
              "title": "Método IMC (Feminino)",
              "steps": [
                "Altura: 165 cm (65 pol)",
                "Peso: 66 kg (145 lbs)",
                "Idade: 32 anos",
                "IMC = 66 / (1,65²) = 24,2",
                "Fórmula: 1,2 × IMC + 0,23 × idade - 10,8 × sexo - 5,4",
                "1,2 × 24,2 + 0,23 × 32 - 10,8 × 0 - 5,4"
              ],
              "result": "Resultado: 30,1% gordura corporal (categoria Média)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qual método de cálculo de gordura corporal é mais preciso?",
          "answer": "O método da Marinha dos EUA é o método baseado em fita mais preciso com ±3,5% de precisão quando comparado a exames DEXA. Requer medidas de cintura, pescoço e quadril (apenas mulheres). RFM é o segundo melhor com ±5% e requer apenas cintura e altura. O método IMC é o mais rápido mas menos preciso (±4,1%), especialmente para indivíduos musculosos. Para precisão absoluta, DEXA, BodPod ou pesagem hidrostática são necessários mas são caros e menos acessíveis."
        },
        {
          "question": "Preciso de adipômetros para medir gordura corporal?",
          "answer": "Não! Todos os 5 métodos nesta calculadora funcionam sem adipômetros. Você precisa apenas de uma fita métrica flexível e uma balança (exceto para BAI, que não requer balança). Métodos com adipômetros (dobras cutâneas) podem ser precisos mas requerem treinamento e técnica consistente. Nossos métodos baseados em fita são mais fáceis de realizar com precisão em casa."
        },
        {
          "question": "Qual é uma porcentagem saudável de gordura corporal?",
          "answer": "Faixas saudáveis variam por sexo. Para homens: 14-17% é nível fitness, 18-24% é média/aceitável. Para mulheres: 21-24% é nível fitness, 25-31% é média/aceitável. Atletas frequentemente mantêm porcentagens menores (6-13% para homens, 14-20% para mulheres), mas ir abaixo dos níveis de gordura essencial (2-5% para homens, 10-13% para mulheres) é perigoso e pode prejudicar a função hormonal e a saúde."
        },
        {
          "question": "Por que os diferentes métodos dão resultados diferentes?",
          "answer": "Cada método usa equações e medidas diferentes, então os resultados variam em ±3-6%. O método da Marinha usa circunferências e é mais preciso para populações gerais. Métodos baseados em IMC (IMC, CUN-BAE) usam proporções altura/peso e podem superestimar em pessoas musculosas. RFM usa proporção cintura-altura e funciona bem em populações diversas. BAI usa proporção quadril-altura e funciona sem balança. Use o método que melhor se ajusta às suas medidas disponíveis e tipo corporal."
        },
        {
          "question": "Com que frequência devo medir minha porcentagem de gordura corporal?",
          "answer": "Meça a cada 2-4 semanas, sempre no mesmo horário do dia (idealmente pela manhã antes de comer) para consistência. Gordura corporal muda lentamente — medições semanais mostram muita flutuação natural. Faça 2-3 medições em cada local e calcule a média. Acompanhe a tendência ao longo de meses em vez de se preocupar com pequenas variações diárias."
        },
        {
          "question": "Posso converter porcentagem de gordura corporal para quilos de gordura?",
          "answer": "Sim! Multiplique seu peso total pela sua porcentagem de gordura corporal. Por exemplo: 80kg × 0,20 (20% de gordura corporal) = 16kg de massa gorda. Sua massa magra é 80 - 16 = 64kg. Esta calculadora mostra tanto massa gorda quanto massa magra em seus resultados."
        },
        {
          "question": "IMC é o mesmo que porcentagem de gordura corporal?",
          "answer": "Não. IMC é uma simples proporção altura-peso que não distingue entre músculo e gordura. Porcentagem de gordura corporal mede especificamente a proporção de gordura em seu corpo. Uma pessoa musculosa pode ter IMC alto mas baixa gordura corporal. Porcentagem de gordura corporal é um indicador muito melhor de saúde e condicionamento físico que apenas o IMC."
        },
        {
          "question": "Por que as mulheres têm maior gordura corporal que os homens?",
          "answer": "Mulheres requerem mais gordura essencial (10-13% vs. 2-5% para homens) para funções reprodutivas e produção hormonal. Isso é biológico e normal. O nível 'fitness' das mulheres (21-24%) é maior que o dos homens (14-17%), mas representa o mesmo nível de saúde e atletismo. Essas diferenças são consideradas em todos os métodos de cálculo."
        },
        {
          "question": "Quais são os padrões de gordura corporal da Marinha dos EUA?",
          "answer": "A Marinha tem limites máximos de gordura corporal por idade e sexo. Para idades 17-39, o máximo é 22% para homens e 33% para mulheres. Aos 40+, aumenta para 23% para homens e 34% para mulheres. Essas são porcentagens máximas permitidas para militares da ativa, não níveis ideais de condicionamento físico. Clique em 'Ver Padrões Marinha de Gordura Corporal' nos resultados para ver a tabela completa."
        },
        {
          "question": "Quão preciso é o método RFM (Massa Gorda Relativa)?",
          "answer": "RFM tem ±5% de precisão e foi validado contra exames DXA em mais de 12.000 adultos no estudo NHANES (publicado em Scientific Reports, Nature, 2018). É mais preciso que IMC e quase tão preciso quanto o método da Marinha, mas requer apenas medidas de cintura e altura. RFM funciona bem em grupos étnicos diversos (mexicano-americanos, euro-americanos, afro-americanos) e todas as faixas etárias."
        },
        {
          "question": "Posso usar esta calculadora para crianças ou adolescentes?",
          "answer": "Esta calculadora é projetada para adultos (18+ anos). Crianças e adolescentes têm fórmulas diferentes de composição corporal porque ainda estão crescendo. Os métodos IMC e CUN-BAE têm equações separadas para jovens abaixo de 18 anos. Consulte um pediatra ou use uma ferramenta específica de composição corporal para jovens para qualquer pessoa abaixo de 18 anos."
        },
        {
          "question": "O que é CUN-BAE e como difere do IMC?",
          "answer": "CUN-BAE (Clínica Universidad de Navarra - Body Adiposity Estimator) é uma fórmula avançada publicada na Diabetes Care (2012). Usa IMC, idade e sexo mas inclui termos quadráticos e de interação que consideram relações não-lineares. Tem maior correlação com gordura corporal real (r=0,89) que conversão simples de IMC (r=0,79). CUN-BAE é particularmente preciso para prever risco cardiovascular e diabetes tipo 2."
        },
        {
          "question": "Quais medidas preciso para o método da Marinha?",
          "answer": "Para homens: altura, cintura (no umbigo) e pescoço (abaixo do pomo de Adão). Para mulheres: altura, cintura (ponto mais estreito), pescoço (abaixo do pomo de Adão) e quadris (parte mais larga das nádegas). Meça na pele nua com fita horizontal e justa mas sem comprimir. Faça a média de 2-3 medições. O método da Marinha tem ±3,5% de precisão quando as medições são feitas corretamente."
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
        "saving": "Salvando...",
      },
      "share": {
        "calculatedWith": "Calculado com Kalcufy.com"
      },
      "ui": {
        "results": "Resultados",
        "yourInformation": "Suas Informações"
      },
      "accessibility": {
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
        "ratings": "avaliações",
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
      "name": "Calculateur de Graisse Corporelle",
      "slug": "calculateur-graisse-corporelle",
      "subtitle": "Estimez votre pourcentage de graisse corporelle avec 5 méthodes scientifiques — pas besoin de pince à plis cutanés.",
      "breadcrumb": "Graisse Corporelle",
      "seo": {
        "title": "Calculateur de Graisse Corporelle — 5 Méthodes Gratuites : Navy, IMC, BAI & Plus",
        "description": "Calculez votre pourcentage de graisse corporelle avec 5 méthodes scientifiques : Navy américaine, IMC, CUN-BAE, BAI et RFM. Pas besoin de pince à plis — juste un mètre ruban. Résultats instantanés avec répartition de la composition corporelle, masse grasse, masse maigre et catégorie personnalisée. Outil gratuit en 4 langues.",
        "shortDescription": "5 méthodes pour estimer la graisse corporelle — pas besoin de pince à plis",
        "keywords": [
          "calculateur graisse corporelle",
          "pourcentage graisse corporelle",
          "méthode navy graisse corporelle",
          "calculateur composition corporelle",
          "calculateur masse maigre",
          "indice adiposité corporelle",
          "calculateur pourcentage graisse corporelle",
          "comment calculer graisse corporelle"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "method": {
          "label": "Méthode de Calcul",
          "helpText": "Chaque méthode utilise différentes mesures — les champs s'ajustent automatiquement",
          "options": {
            "navy": "🎖️ Navy américaine",
            "bmi": "⚖️ Méthode IMC",
            "cunbae": "🔬 CUN-BAE",
            "bai": "📏 BAI (Sans Balance)",
            "rfm": "📐 RFM (Taille + Tour de Taille)"
          }
        },
        "gender": {
          "label": "Sexe",
          "helpText": "Les formules de graisse corporelle diffèrent significativement selon le sexe",
          "options": {
            "male": "Homme",
            "female": "Femme"
          }
        },
        "age": {
          "label": "Âge",
          "helpText": "Utilisé par les méthodes IMC et CUN-BAE pour des estimations ajustées selon l'âge"
        },
        "weight": {
          "label": "Poids",
          "helpText": "Requis pour les méthodes Navy, IMC, CUN-BAE et RFM"
        },
        "height": {
          "label": "Taille",
          "helpText": "Requise pour toutes les méthodes"
        },
        "waist": {
          "label": "Tour de Taille",
          "helpText": "Navy : au niveau du nombril pour les hommes, au point le plus étroit pour les femmes. RFM : au nombril."
        },
        "neck": {
          "label": "Tour de Cou",
          "helpText": "Mesurez juste en dessous du larynx (pomme d'Adam), le ruban légèrement incliné vers le bas"
        },
        "hip": {
          "label": "Tour de Hanches",
          "helpText": "Mesurez à la partie la plus large des fesses, ruban horizontal"
        }
      },
      "inputGroups": {},
      "results": {
        "bodyFat": {
          "label": "Graisse Corporelle"
        },
        "category": {
          "label": "Catégorie"
        },
        "fatMass": {
          "label": "Masse Grasse"
        },
        "leanMass": {
          "label": "Masse Maigre"
        },
        "bmi": {
          "label": "IMC"
        },
        "idealRange": {
          "label": "Fourchette Idéale"
        },
        "fatToLose": {
          "label": "Graisse à Perdre"
        }
      },
      "presets": {
        "athleticMale": {
          "label": "Homme Athlétique",
          "description": "Homme mince, méthode Navy"
        },
        "averageFemale": {
          "label": "Femme Moyenne",
          "description": "Femme moyenne, méthode Navy"
        },
        "quickCheck": {
          "label": "Vérification IMC Rapide",
          "description": "Juste taille + poids + âge"
        },
        "noScale": {
          "label": "Pas de Balance Nécessaire",
          "description": "BAI : seulement hanches + taille"
        }
      },
      "tooltips": {
        "bodyFat": "Votre pourcentage de graisse corporelle estimé avec la méthode sélectionnée",
        "category": "Classification ACE (American Council on Exercise)",
        "fatMass": "Poids total du tissu adipeux dans votre corps",
        "leanMass": "Tout sauf la graisse : muscle, os, eau, organes",
        "bmi": "Indice de Masse Corporelle — poids par rapport à la taille",
        "idealRange": "Fourchette de graisse corporelle de niveau fitness pour votre sexe",
        "fatToLose": "Graisse à perdre pour atteindre le haut de la fourchette fitness"
      },
      "values": {
        "Essential Fat": "Graisse Essentielle",
        "Athletes": "Athlètes",
        "Fitness": "Fitness",
        "Average": "Moyenne",
        "Obese": "Obèse",
        "Underweight": "Insuffisance pondérale",
        "%": "%",
        "kg": "kg",
        "lbs": "lbs",
        "cm": "cm",
        "in": "in",
        "N/A": "N/A",
        "Fat": "Graisse",
        "Lean": "Masse Maigre",
        "U.S. Navy": "Marine américaine",
        "BMI Method": "Méthode IMC",
        "Tape: waist, neck": "Mètre : taille, cou",
        "Tape: waist, neck, hip": "Mètre : taille, cou, hanches",
        "Scale + height": "Balance + taille",
        "Scale + height + age": "Balance + taille + âge",
        "Tape: hip + height (no scale)": "Mètre : hanches + taille (sans balance)",
        "Tape: waist + height": "Mètre : taille + stature"
      },
      "formats": {
        "summary": "Graisse corporelle : {bodyFat}% ({category}) via {method}. {composition}"
      },
      "infoCards": {
        "methodGuide": {
          "title": "🎯 Quelle Méthode Utiliser ?",
          "items": [
            "Navy : Méthode domestique la plus précise — nécessite un mètre ruban pour taille, cou, hanches",
            "IMC : La plus rapide — seulement taille, poids et âge. Moins précise pour les personnes musclées",
            "CUN-BAE : Formule de recherche du journal Diabetes Care. Utilise IMC + âge pour une meilleure précision",
            "BAI : Pas de balance ? Nécessite seulement tour de hanches et taille",
            "RFM : Simple et précise — validée contre les scans DXA sur 12 000+ adultes"
          ]
        },
        "measureTips": {
          "title": "📏 Comment Mesurer Correctement",
          "items": [
            "Mesurez le matin avant de manger, sur peau nue",
            "Gardez le ruban horizontal et ajusté — ne comprimez pas la peau",
            "Prenez 2-3 mesures à chaque endroit et utilisez la moyenne",
            "Expirez normalement avant de lire la mesure de taille"
          ]
        },
        "accuracy": {
          "title": "🔬 Précision des Méthodes",
          "items": [
            "Méthode Navy : ±3,5% (méthode au ruban la plus précise)",
            "RFM : ±5% (validée vs DXA, meilleure que l'IMC)",
            "CUN-BAE : ±4,6% (meilleure que l'IMC pour la population générale)",
            "Méthode IMC : ±4,1% (rapide mais moins précise pour les athlètes)",
            "BAI : ±6% (utile quand la balance n'est pas disponible)"
          ]
        }
      },
      "referenceData": {
        "categories": {
          "title": "Catégories de Graisse Corporelle (ACE)",
          "items": {
            "essential": {
              "label": "Graisse Essentielle",
              "value": "2-5% ♂ | 10-13% ♀"
            },
            "athletes": {
              "label": "Athlètes",
              "value": "6-13% ♂ | 14-20% ♀"
            },
            "fitness": {
              "label": "Fitness",
              "value": "14-17% ♂ | 21-24% ♀"
            },
            "average": {
              "label": "Moyenne",
              "value": "18-24% ♂ | 25-31% ♀"
            },
            "obese": {
              "label": "Obèse",
              "value": "25%+ ♂ | 32%+ ♀"
            }
          }
        }
      },
      "detailedTable": {
        "navyStandards": {
          "button": "Voir Standards Navy Graisse Corporelle",
          "title": "Standards de Graisse Corporelle Navy américaine",
          "columns": {
            "ageGroup": "Groupe d'Âge",
            "maleMax": "Max Homme %",
            "femaleMax": "Max Femme %"
          }
        },
        "methodComparison": {
          "button": "Comparer Toutes les Méthodes",
          "title": "Comparaison des Méthodes",
          "columns": {
            "method": "Méthode",
            "result": "Graisse Corporelle %",
            "accuracy": "Précision",
            "requires": "Nécessite"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que le Pourcentage de Graisse Corporelle ?",
          "content": "Le pourcentage de graisse corporelle est la proportion de votre poids corporel total qui est constituée de tissu adipeux. Contrairement à l'IMC, qui ne considère que la taille et le poids, le pourcentage de graisse corporelle distingue entre la masse grasse et la masse maigre (muscle, os, eau et organes). Cela en fait un indicateur beaucoup plus précis de la santé et de la forme physique. Pour les hommes, la graisse essentielle (le minimum nécessaire à la survie) est de 2-5%, tandis que les femmes nécessitent 10-13% pour la fonction hormonale et la santé reproductive. L'American Council on Exercise définit les niveaux de 'fitness' comme 14-17% pour les hommes et 21-24% pour les femmes. Une graisse corporelle supérieure à 25% pour les hommes ou 32% for les femmes est classée comme obèse. Les athlètes maintiennent généralement 6-13% (hommes) ou 14-20% (femmes). Connaître votre graisse corporelle aide à fixer des objectifs réalistes — un homme de 90 kg à 25% de graisse corporelle porte 22,5 kg de graisse et 67,5 kg de masse maigre. Pour atteindre le niveau 'fitness' (17%), il devrait perdre environ 8,6 kg de graisse pure tout en préservant le muscle."
        },
        "fiveMethods": {
          "title": "Comprendre les 5 Méthodes de Calcul",
          "content": "Ce calculateur offre cinq méthodes basées sur des preuves, toutes utilisables à domicile sans pince à plis cutanés. La méthode Navy américaine (Hodgdon & Beckett, 1984) est l'étalon-or pour les estimations au mètre ruban, utilisant les circonférences de taille, cou et hanches avec une précision de ±3,5%. La méthode IMC (Deurenberg, 1991) convertit l'Indice de Masse Corporelle en graisse corporelle en utilisant l'âge et le sexe — rapide mais moins précise pour les individus musclés. CUN-BAE (Gómez-Ambrosi, 2012) améliore la méthode IMC avec une formule plus complexe publiée dans Diabetes Care, tenant compte des relations non linéaires entre IMC, âge et graisse. BAI (Bergman, 2011) ne nécessite uniquement aucune balance — seulement la circonférence des hanches et la taille — ce qui la rend idéale quand une balance n'est pas disponible. Enfin, RFM (Woolcott & Bergman, 2018), publié dans Scientific Reports (Nature), utilise seulement la taille et le tour de taille mais a été validé contre les scans DXA sur 12 000+ adultes, offrant une excellente précision avec un minimum de mesures."
        },
        "considerations": {
          "title": "Considérations Importantes",
          "items": [
            {
              "text": "Ce sont des estimations, pas des diagnostics médicaux. Pour des mesures précises, utilisez DEXA, BodPod ou pesée hydrostatique",
              "type": "warning"
            },
            {
              "text": "Le pourcentage de graisse corporelle varie tout au long de la journée. Mesurez au même moment pour la cohérence",
              "type": "info"
            },
            {
              "text": "La méthode Navy est la plus précise pour les populations générales mais peut sous-estimer chez les individus très maigres",
              "type": "info"
            },
            {
              "text": "Les méthodes basées sur l'IMC (IMC, CUN-BAE) peuvent surestimer la graisse corporelle chez les individus musclés",
              "type": "warning"
            },
            {
              "text": "Les femmes ont naturellement plus de graisse essentielle (10-13%) vs les hommes (2-5%) en raison des exigences reproductives",
              "type": "info"
            },
            {
              "text": "La distribution de la graisse corporelle importe pour la santé — la graisse viscérale (autour des organes) est plus nocive que sous-cutanée",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Catégories de Graisse Corporelle",
          "items": [
            {
              "text": "Graisse Essentielle (2-5% ♂, 10-13% ♀) : Minimum nécessaire à la survie. En dessous c'est dangereux",
              "type": "warning"
            },
            {
              "text": "Athlètes (6-13% ♂, 14-20% ♀) : Athlètes de compétition et bodybuilders",
              "type": "info"
            },
            {
              "text": "Fitness (14-17% ♂, 21-24% ♀) : Individus actifs avec définition musculaire visible",
              "type": "success"
            },
            {
              "text": "Moyenne (18-24% ♂, 25-31% ♀) : Fourchette saine pour la population générale",
              "type": "info"
            },
            {
              "text": "Obèse (25%+ ♂, 32%+ ♀) : Risques de santé accrus. Considérez des changements de mode de vie",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul",
          "description": "Exemples étape par étape utilisant différentes méthodes",
          "examples": [
            {
              "title": "Méthode Navy (Homme)",
              "steps": [
                "Taille : 177,8 cm",
                "Tour de taille : 81,3 cm",
                "Tour de cou : 39,4 cm",
                "Formule : 86,010 × log₁₀(taille - cou) - 70,041 × log₁₀(hauteur) + 36,76",
                "86,010 × log₁₀(41,9) - 70,041 × log₁₀(177,8) + 36,76",
                "86,010 × 1,6222 - 70,041 × 2,25 + 36,76"
              ],
              "result": "Résultat : 12,3% de graisse corporelle (catégorie Athlètes)"
            },
            {
              "title": "Méthode IMC (Femme)",
              "steps": [
                "Taille : 165 cm",
                "Poids : 65,8 kg",
                "Âge : 32 ans",
                "IMC = 65,8 / (1,65²) = 24,2",
                "Formule : 1,2 × IMC + 0,23 × âge - 10,8 × sexe - 5,4",
                "1,2 × 24,2 + 0,23 × 32 - 10,8 × 0 - 5,4"
              ],
              "result": "Résultat : 30,1% de graisse corporelle (catégorie Moyenne)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle méthode de calcul de graisse corporelle est la plus précise ?",
          "answer": "La méthode Navy américaine est la méthode au ruban la plus précise avec une précision de ±3,5% comparée aux scans DEXA. Elle nécessite des mesures de taille, cou et hanches (femmes seulement). RFM arrive en second à ±5% et ne nécessite que la taille et le tour de taille. La méthode IMC est la plus rapide mais la moins précise (±4,1%), surtout pour les individus musclés. Pour une précision absolue, DEXA, BodPod ou pesée hydrostatique sont nécessaires mais coûteux et moins accessibles."
        },
        {
          "question": "Ai-je besoin de pinces à plis cutanés pour mesurer la graisse corporelle ?",
          "answer": "Non ! Toutes les 5 méthodes de ce calculateur fonctionnent sans pinces à plis cutanés. Vous n'avez besoin que d'un mètre ruban flexible et d'une balance (sauf pour BAI, qui ne nécessite pas de balance). Les méthodes aux pinces (plis cutanés) peuvent être précises mais nécessitent une formation et une technique cohérente. Nos méthodes au ruban sont plus faciles à réaliser avec précision à domicile."
        },
        {
          "question": "Quel est un pourcentage de graisse corporelle sain ?",
          "answer": "Les fourchettes saines varient selon le sexe. Pour les hommes : 14-17% est le niveau fitness, 18-24% est moyen/acceptable. Pour les femmes : 21-24% est le niveau fitness, 25-31% est moyen/acceptable. Les athlètes maintiennent souvent des pourcentages plus bas (6-13% pour les hommes, 14-20% pour les femmes), mais descendre en dessous des niveaux de graisse essentielle (2-5% pour les hommes, 10-13% pour les femmes) est dangereux et peut altérer la fonction hormonale et la santé."
        },
        {
          "question": "Pourquoi les différentes méthodes donnent-elles des résultats différents ?",
          "answer": "Chaque méthode utilise différentes équations et mesures, donc les résultats varient de ±3-6%. La méthode Navy utilise les circonférences et est la plus précise pour les populations générales. Les méthodes basées sur l'IMC (IMC, CUN-BAE) utilisent les rapports taille/poids et peuvent surestimer chez les personnes musclées. RFM utilise le rapport taille-hauteur et performe bien dans diverses populations. BAI utilise le rapport hanches-hauteur et fonctionne sans balance. Utilisez la méthode qui correspond le mieux à vos mesures disponibles et type de corps."
        },
        {
          "question": "À quelle fréquence dois-je mesurer mon pourcentage de graisse corporelle ?",
          "answer": "Mesurez toutes les 2-4 semaines, toujours au même moment de la journée (idéalement le matin avant de manger) pour la cohérence. La graisse corporelle change lentement — les mesures hebdomadaires montrent trop de fluctuations naturelles. Prenez 2-3 mesures à chaque endroit et faites la moyenne. Suivez la tendance sur des mois plutôt que de vous inquiéter des petites variations quotidiennes."
        },
        {
          "question": "Puis-je convertir le pourcentage de graisse corporelle en kilogrammes de graisse ?",
          "answer": "Oui ! Multipliez votre poids total par votre pourcentage de graisse corporelle. Par exemple : 82 kg × 0,20 (20% de graisse corporelle) = 16,4 kg de masse grasse. Votre masse maigre est 82 - 16,4 = 65,6 kg. Ce calculateur montre à la fois la masse grasse et la masse maigre dans vos résultats."
        },
        {
          "question": "L'IMC est-il identique au pourcentage de graisse corporelle ?",
          "answer": "Non. L'IMC est un simple rapport taille-poids qui ne distingue pas entre muscle et graisse. Le pourcentage de graisse corporelle mesure spécifiquement la proportion de graisse dans votre corps. Une personne musclée pourrait avoir un IMC élevé mais un faible pourcentage de graisse corporelle. Le pourcentage de graisse corporelle est un bien meilleur indicateur de santé et forme physique que l'IMC seul."
        },
        {
          "question": "Pourquoi les femmes ont-elles plus de graisse corporelle que les hommes ?",
          "answer": "Les femmes nécessitent plus de graisse essentielle (10-13% vs 2-5% pour les hommes) pour les fonctions reproductives et la production hormonale. C'est biologique et normal. Le niveau 'fitness' des femmes (21-24%) est plus élevé que celui des hommes (14-17%), mais représente le même niveau de santé et d'athlétisme. Ces différences sont prises en compte dans toutes les méthodes de calcul."
        },
        {
          "question": "Quels sont les standards de graisse corporelle de la Navy américaine ?",
          "answer": "La Navy a des limites maximales de graisse corporelle par âge et sexe. Pour les âges 17-39, le maximum est 22% pour les hommes et 33% pour les femmes. À 40+, cela augmente à 23% pour les hommes et 34% pour les femmes. Ce sont les pourcentages maximaux autorisés pour les membres de service actif, pas les niveaux de forme idéaux. Cliquez 'Voir Standards Navy Graisse Corporelle' dans les résultats pour voir le tableau complet."
        },
        {
          "question": "Quelle est la précision de la méthode RFM (Masse Grasse Relative) ?",
          "answer": "RFM a une précision de ±5% et a été validé contre les scans DXA sur 12 000+ adultes dans l'étude NHANES (publié dans Scientific Reports, Nature, 2018). Il est plus précis que l'IMC et presque aussi précis que la méthode Navy, mais ne nécessite que des mesures de taille et tour de taille. RFM performe bien dans divers groupes ethniques (Mexicains-Américains, Européens-Américains, Africains-Américains) et toutes les tranches d'âge."
        },
        {
          "question": "Puis-je utiliser ce calculateur pour des enfants ou adolescents ?",
          "answer": "Ce calculateur est conçu pour les adultes (18+ ans). Les enfants et adolescents ont des formules de composition corporelle différentes car ils sont encore en croissance. Les méthodes IMC et CUN-BAE ont des équations séparées pour les jeunes de moins de 18 ans. Consultez un pédiatre ou utilisez un outil de composition corporelle spécifique aux jeunes pour toute personne de moins de 18 ans."
        },
        {
          "question": "Qu'est-ce que CUN-BAE et en quoi diffère-t-il de l'IMC ?",
          "answer": "CUN-BAE (Clínica Universidad de Navarra - Body Adiposity Estimator) est une formule avancée publiée dans Diabetes Care (2012). Il utilise IMC, âge et sexe mais inclut des termes quadratiques et d'interaction qui tiennent compte des relations non linéaires. Il a une corrélation plus élevée avec la graisse corporelle réelle (r=0,89) que la simple conversion IMC (r=0,79). CUN-BAE est particulièrement précis pour prédire le risque cardiovasculaire et le diabète de type 2."
        },
        {
          "question": "Quelles mesures ai-je besoin pour la méthode Navy ?",
          "answer": "Pour les hommes : taille, tour de taille (au nombril) et cou (sous la pomme d'Adam). Pour les femmes : taille, tour de taille (point le plus étroit), cou (sous la pomme d'Adam) et hanches (partie la plus large des fesses). Mesurez sur peau nue avec le ruban horizontal et ajusté mais sans comprimer. Prenez la moyenne de 2-3 mesures. La méthode Navy est précise à ±3,5% quand les mesures sont faites correctement."
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
        "ratings": "évaluations",
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
      "name": "Körperfett Rechner",
      "slug": "koerperfett-rechner",
      "subtitle": "Schätzen Sie Ihren Körperfettanteil mit 5 wissenschaftlich fundierten Methoden — keine Caliper benötigt.",
      "breadcrumb": "Körperfett",
      "seo": {
        "title": "Körperfett Rechner — 5 Kostenlose Methoden: Navy, BMI, BAI & Mehr",
        "description": "Berechnen Sie Ihren Körperfettanteil mit 5 wissenschaftlich fundierten Methoden: U.S. Navy, BMI, CUN-BAE, BAI und RFM. Keine Caliper benötigt — nur ein Maßband. Sofortige Ergebnisse mit Körperzusammensetzung, Fettmasse, Magermasse und personalisierter Kategorie. Kostenloses Tool in 4 Sprachen.",
        "shortDescription": "5 Methoden zur Schätzung des Körperfetts — keine Caliper benötigt",
        "keywords": [
          "körperfett rechner",
          "körperfettanteil",
          "navy methode körperfett",
          "körperzusammensetzung rechner",
          "magermasse rechner",
          "körper adipositas index",
          "körperfettanteil rechner",
          "wie körperfett berechnen"
        ]
      },
      "inputs": {
        "method": {
          "label": "Berechnungsmethode",
          "helpText": "Jede Methode verwendet verschiedene Messungen — Eingaben passen sich automatisch an",
          "options": {
            "navy": "🎖️ U.S. Navy",
            "bmi": "⚖️ BMI Methode",
            "cunbae": "🔬 CUN-BAE",
            "bai": "📏 BAI (Ohne Waage)",
            "rfm": "📐 RFM (Größe + Taille)"
          }
        },
        "gender": {
          "label": "Geschlecht",
          "helpText": "Körperfett-Formeln unterscheiden sich erheblich nach Geschlecht",
          "options": {
            "male": "Männlich",
            "female": "Weiblich"
          }
        },
        "age": {
          "label": "Alter",
          "helpText": "Wird von BMI und CUN-BAE Methoden für altersangepasste Schätzungen verwendet"
        },
        "weight": {
          "label": "Gewicht",
          "helpText": "Erforderlich für Navy, BMI, CUN-BAE und RFM Methoden"
        },
        "height": {
          "label": "Größe",
          "helpText": "Erforderlich für alle Methoden"
        },
        "waist": {
          "label": "Taillenumfang",
          "helpText": "Navy: auf Nabelhöhe für Männer, schmalste Stelle für Frauen. RFM: am Nabel."
        },
        "neck": {
          "label": "Halsumfang",
          "helpText": "Messen Sie knapp unter dem Kehlkopf (Adamsapfel), Band leicht nach unten geneigt"
        },
        "hip": {
          "label": "Hüftumfang",
          "helpText": "Messen Sie an der breitesten Stelle des Gesäßes, Band horizontal"
        }
      },
      "inputGroups": {},
      "results": {
        "bodyFat": {
          "label": "Körperfett"
        },
        "category": {
          "label": "Kategorie"
        },
        "fatMass": {
          "label": "Fettmasse"
        },
        "leanMass": {
          "label": "Magermasse"
        },
        "bmi": {
          "label": "BMI"
        },
        "idealRange": {
          "label": "Idealbereich"
        },
        "fatToLose": {
          "label": "Zu verlierendes Fett"
        }
      },
      "presets": {
        "athleticMale": {
          "label": "Athletischer Mann",
          "description": "Schlanker Mann, Navy Methode"
        },
        "averageFemale": {
          "label": "Durchschnittliche Frau",
          "description": "Durchschnittliche Frau, Navy Methode"
        },
        "quickCheck": {
          "label": "Schnelle BMI Prüfung",
          "description": "Nur Größe + Gewicht + Alter"
        },
        "noScale": {
          "label": "Keine Waage nötig",
          "description": "BAI: nur Hüfte + Größe"
        }
      },
      "tooltips": {
        "bodyFat": "Ihr geschätzter Körperfettanteil mit der gewählten Methode",
        "category": "ACE (American Council on Exercise) Klassifizierung",
        "fatMass": "Gesamtgewicht des Fettgewebes in Ihrem Körper",
        "leanMass": "Alles außer Fett: Muskel, Knochen, Wasser, Organe",
        "bmi": "Body Mass Index — Gewicht im Verhältnis zur Größe",
        "idealRange": "Fitness-Level Körperfettbereich für Ihr Geschlecht",
        "fatToLose": "Zu verlierendes Fett um die Obergrenze des Fitness-Bereichs zu erreichen"
      },
      "values": {
        "Essential Fat": "Essentielles Fett",
        "Athletes": "Athleten",
        "Fitness": "Fitness",
        "Average": "Durchschnitt",
        "Obese": "Adipös",
        "Underweight": "Untergewicht",
        "%": "%",
        "kg": "kg",
        "lbs": "lbs",
        "cm": "cm",
        "in": "in",
        "N/A": "N/V",
        "Fat": "Fett",
        "Lean": "Magermasse",
        "U.S. Navy": "US-Marine",
        "BMI Method": "BMI-Methode",
        "Tape: waist, neck": "Maßband: Taille, Hals",
        "Tape: waist, neck, hip": "Maßband: Taille, Hals, Hüfte",
        "Scale + height": "Waage + Größe",
        "Scale + height + age": "Waage + Größe + Alter",
        "Tape: hip + height (no scale)": "Maßband: Hüfte + Größe (ohne Waage)",
        "Tape: waist + height": "Maßband: Taille + Größe"
      },
      "formats": {
        "summary": "Körperfett: {bodyFat}% ({category}) via {method}. {composition}"
      },
      "infoCards": {
        "methodGuide": {
          "title": "🎯 Welche Methode verwenden?",
          "items": [
            "Navy: Genaueste Heimmethode — benötigt Maßband für Taille, Hals, Hüfte",
            "BMI: Schnellste — nur Größe, Gewicht und Alter. Weniger präzise für muskulöse Personen",
            "CUN-BAE: Forschungsformel aus dem Diabetes Care Journal. Verwendet BMI + Alter für bessere Genauigkeit",
            "BAI: Keine Waage? Benötigt nur Hüftumfang und Größe",
            "RFM: Einfach und genau — validiert gegen DXA-Scans an 12.000+ Erwachsenen"
          ]
        },
        "measureTips": {
          "title": "📏 Richtig Messen",
          "items": [
            "Morgens vor dem Essen auf nackter Haut messen",
            "Band horizontal und fest halten — Haut nicht zusammendrücken",
            "2-3 Messungen an jeder Stelle nehmen und den Durchschnitt verwenden",
            "Normal ausatmen vor Ablesung der Taillenmessung"
          ]
        },
        "accuracy": {
          "title": "🔬 Methodengenauigkeit",
          "items": [
            "Navy Methode: ±3,5% (genaueste bandbasierte Methode)",
            "RFM: ±5% (validiert vs. DXA, besser als BMI)",
            "CUN-BAE: ±4,6% (besser als BMI für Allgemeinbevölkerung)",
            "BMI Methode: ±4,1% (schnell aber weniger genau für Athleten)",
            "BAI: ±6% (nützlich wenn keine Waage verfügbar)"
          ]
        }
      },
      "referenceData": {
        "categories": {
          "title": "Körperfett Kategorien (ACE)",
          "items": {
            "essential": {
              "label": "Essentielles Fett",
              "value": "2-5% ♂ | 10-13% ♀"
            },
            "athletes": {
              "label": "Athleten",
              "value": "6-13% ♂ | 14-20% ♀"
            },
            "fitness": {
              "label": "Fitness",
              "value": "14-17% ♂ | 21-24% ♀"
            },
            "average": {
              "label": "Durchschnitt",
              "value": "18-24% ♂ | 25-31% ♀"
            },
            "obese": {
              "label": "Adipös",
              "value": "25%+ ♂ | 32%+ ♀"
            }
          }
        }
      },
      "detailedTable": {
        "navyStandards": {
          "button": "Navy Körperfett Standards anzeigen",
          "title": "U.S. Navy Körperfett Standards",
          "columns": {
            "ageGroup": "Altersgruppe",
            "maleMax": "Männlich Max %",
            "femaleMax": "Weiblich Max %"
          }
        },
        "methodComparison": {
          "button": "Alle Methoden vergleichen",
          "title": "Methodenvergleich",
          "columns": {
            "method": "Methode",
            "result": "Körperfett %",
            "accuracy": "Genauigkeit",
            "requires": "Benötigt"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist der Körperfettanteil?",
          "content": "Der Körperfettanteil ist der Anteil Ihres Gesamtkörpergewichts, der aus Fettgewebe besteht. Im Gegensatz zum BMI, der nur Größe und Gewicht berücksichtigt, unterscheidet der Körperfettanteil zwischen Fettmasse und Magermasse (Muskel, Knochen, Wasser und Organe). Dies macht ihn zu einem weitaus genaueren Indikator für Gesundheit und Fitness. Für Männer liegt das essentielle Fett (das Minimum für das Überleben) bei 2-5%, während Frauen 10-13% für Hormonfunktion und Fortpflanzungsgesundheit benötigen. Der American Council on Exercise definiert 'Fitness'-Level als 14-17% für Männer und 21-24% für Frauen. Körperfett über 25% für Männer oder 32% für Frauen wird als adipös klassifiziert. Athleten halten typischerweise 6-13% (Männer) oder 14-20% (Frauen). Den Körperfettanteil zu kennen hilft bei realistischen Zielen — ein 90kg Mann mit 25% Körperfett trägt 22,5kg Fett und 67,5kg Magermasse. Um das 'Fitness'-Level (17%) zu erreichen, müsste er etwa 8,6kg reines Fett verlieren während er Muskeln erhält."
        },
        "fiveMethods": {
          "title": "Die 5 Berechnungsmethoden verstehen",
          "content": "Dieser Rechner bietet fünf evidenzbasierte Methoden, alle zu Hause ohne Caliper verwendbar. Die U.S. Navy Methode (Hodgdon & Beckett, 1984) ist der Goldstandard für Maßband-Schätzungen, verwendet Taillen-, Hals- und Hüftumfang mit ±3,5% Genauigkeit. Die BMI Methode (Deurenberg, 1991) wandelt den Body Mass Index in Körperfett um unter Verwendung von Alter und Geschlecht — schnell aber weniger genau für muskulöse Personen. CUN-BAE (Gómez-Ambrosi, 2012) verbessert die BMI Methode mit einer komplexeren Formel aus Diabetes Care, die nichtlineare Beziehungen zwischen BMI, Alter und Fett berücksichtigt. BAI (Bergman, 2011) benötigt einzigartig keine Waage — nur Hüftumfang und Größe — ideal wenn keine Waage verfügbar ist. Schließlich verwendet RFM (Woolcott & Bergman, 2018), veröffentlicht in Scientific Reports (Nature), nur Größe und Taillenumfang, wurde aber gegen DXA-Scans an 12.000+ Erwachsenen validiert und bietet exzellente Genauigkeit mit minimalen Messungen."
        },
        "considerations": {
          "title": "Wichtige Überlegungen",
          "items": [
            {
              "text": "Dies sind Schätzungen, keine medizinischen Diagnosen. Für präzise Messungen verwenden Sie DEXA, BodPod oder hydrostatisches Wiegen",
              "type": "warning"
            },
            {
              "text": "Der Körperfettanteil variiert über den Tag. Messen Sie zur gleichen Zeit für Konsistenz",
              "type": "info"
            },
            {
              "text": "Die Navy Methode ist am genauesten für die Allgemeinbevölkerung, kann aber bei sehr schlanken Personen unterschätzen",
              "type": "info"
            },
            {
              "text": "BMI-basierte Methoden (BMI, CUN-BAE) können Körperfett bei muskulösen Personen überschätzen",
              "type": "warning"
            },
            {
              "text": "Frauen haben natürlich höheres essentielles Fett (10-13%) vs. Männer (2-5%) aufgrund reproduktiver Anforderungen",
              "type": "info"
            },
            {
              "text": "Körperfettverteilung ist wichtig für Gesundheit — viszerales Fett (um Organe) ist schädlicher als subkutanes",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Körperfett Kategorien",
          "items": [
            {
              "text": "Essentielles Fett (2-5% ♂, 10-13% ♀): Minimum für Überleben. Darunter ist gefährlich",
              "type": "warning"
            },
            {
              "text": "Athleten (6-13% ♂, 14-20% ♀): Wettkampfathleten und Bodybuilder",
              "type": "info"
            },
            {
              "text": "Fitness (14-17% ♂, 21-24% ♀): Aktive Personen mit sichtbarer Muskeldefinition",
              "type": "success"
            },
            {
              "text": "Durchschnitt (18-24% ♂, 25-31% ♀): Gesunder Bereich für Allgemeinbevölkerung",
              "type": "info"
            },
            {
              "text": "Adipös (25%+ ♂, 32%+ ♀): Erhöhte Gesundheitsrisiken. Erwägen Sie Lebensstiländerungen",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Berechnungsbeispiele",
          "description": "Schritt-für-Schritt Beispiele mit verschiedenen Methoden",
          "examples": [
            {
              "title": "Navy Methode (Männlich)",
              "steps": [
                "Größe: 178 cm",
                "Taille: 81 cm",
                "Hals: 39 cm",
                "Formel: 86,010 × log₁₀(Taille - Hals) - 70,041 × log₁₀(Größe) + 36,76",
                "86,010 × log₁₀(42) - 70,041 × log₁₀(178) + 36,76",
                "86,010 × 1,623 - 70,041 × 2,250 + 36,76"
              ],
              "result": "Ergebnis: 12,3% Körperfett (Athleten Kategorie)"
            },
            {
              "title": "BMI Methode (Weiblich)",
              "steps": [
                "Größe: 165 cm",
                "Gewicht: 66 kg",
                "Alter: 32 Jahre",
                "BMI = 66 / (1,65²) = 24,2",
                "Formel: 1,2 × BMI + 0,23 × Alter - 10,8 × Geschlecht - 5,4",
                "1,2 × 24,2 + 0,23 × 32 - 10,8 × 0 - 5,4"
              ],
              "result": "Ergebnis: 30,1% Körperfett (Durchschnitt Kategorie)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Welche Körperfett-Berechnungsmethode ist am genauesten?",
          "answer": "Die U.S. Navy Methode ist die genaueste bandbasierte Methode mit ±3,5% Genauigkeit im Vergleich zu DEXA-Scans. Sie benötigt Taillen-, Hals- und Hüftmessungen (nur Frauen). RFM ist zweitbeste mit ±5% und benötigt nur Taille und Größe. Die BMI Methode ist schnellste aber am wenigsten genau (±4,1%), besonders für muskulöse Personen. Für absolute Präzision sind DEXA, BodPod oder hydrostatisches Wiegen nötig, aber teuer und weniger zugänglich."
        },
        {
          "question": "Brauche ich Caliper um Körperfett zu messen?",
          "answer": "Nein! Alle 5 Methoden in diesem Rechner funktionieren ohne Caliper. Sie benötigen nur ein flexibles Maßband und eine Waage (außer BAI, das keine Waage benötigt). Caliper-Methoden (Hautfalten) können genau sein, erfordern aber Training und konsistente Technik. Unsere bandbasierten Methoden sind einfacher zu Hause genau durchzuführen."
        },
        {
          "question": "Was ist ein gesunder Körperfettanteil?",
          "answer": "Gesunde Bereiche variieren nach Geschlecht. Für Männer: 14-17% ist Fitness-Level, 18-24% ist durchschnittlich/akzeptabel. Für Frauen: 21-24% ist Fitness-Level, 25-31% ist durchschnittlich/akzeptabel. Athleten halten oft niedrigere Prozentsätze (6-13% für Männer, 14-20% für Frauen), aber unter essentielle Fettlevel zu gehen (2-5% für Männer, 10-13% für Frauen) ist gefährlich und kann Hormon- und Gesundheitsfunktionen beeinträchtigen."
        },
        {
          "question": "Warum geben die verschiedenen Methoden unterschiedliche Ergebnisse?",
          "answer": "Jede Methode verwendet verschiedene Gleichungen und Messungen, daher variieren Ergebnisse um ±3-6%. Die Navy Methode verwendet Umfänge und ist am genauesten für Allgemeinbevölkerung. BMI-basierte Methoden (BMI, CUN-BAE) verwenden Größe/Gewicht-Verhältnisse und können bei muskulösen Personen überschätzen. RFM verwendet Taillen-zu-Größe-Verhältnis und funktioniert gut bei diversen Bevölkerungen. BAI verwendet Hüfte-zu-Größe und funktioniert ohne Waage. Verwenden Sie die Methode, die am besten zu Ihren verfügbaren Messungen und Körpertyp passt."
        },
        {
          "question": "Wie oft sollte ich meinen Körperfettanteil messen?",
          "answer": "Messen Sie alle 2-4 Wochen, immer zur gleichen Tageszeit (idealerweise morgens vor dem Essen) für Konsistenz. Körperfett ändert sich langsam — wöchentliche Messungen zeigen zu viel natürliche Schwankung. Nehmen Sie 2-3 Messungen an jeder Stelle und bilden Sie den Durchschnitt. Verfolgen Sie den Trend über Monate statt sich über kleine tägliche Variationen zu sorgen."
        },
        {
          "question": "Kann ich Körperfettanteil in Kilogramm Fett umwandeln?",
          "answer": "Ja! Multiplizieren Sie Ihr Gesamtgewicht mit Ihrem Körperfettanteil. Zum Beispiel: 80 kg × 0,20 (20% Körperfett) = 16 kg Fettmasse. Ihre Magermasse ist 80 - 16 = 64 kg. Dieser Rechner zeigt sowohl Fettmasse als auch Magermasse in Ihren Ergebnissen."
        },
        {
          "question": "Ist BMI dasselbe wie Körperfettanteil?",
          "answer": "Nein. BMI ist ein einfaches Größe-zu-Gewicht-Verhältnis, das nicht zwischen Muskel und Fett unterscheidet. Körperfettanteil misst spezifisch den Anteil von Fett in Ihrem Körper. Eine muskulöse Person könnte einen hohen BMI aber niedrigen Körperfettanteil haben. Körperfettanteil ist ein viel besserer Indikator für Gesundheit und Fitness als BMI allein."
        },
        {
          "question": "Warum haben Frauen höheres Körperfett als Männer?",
          "answer": "Frauen benötigen mehr essentielles Fett (10-13% vs. 2-5% für Männer) für Fortpflanzungsfunktionen und Hormonproduktion. Dies ist biologisch und normal. Frauen's 'Fitness'-Level (21-24%) ist höher als Männer's (14-17%), stellt aber das gleiche Niveau von Gesundheit und Athletik dar. Diese Unterschiede sind in allen Berechnungsmethoden berücksichtigt."
        },
        {
          "question": "Was sind die U.S. Navy Körperfett Standards?",
          "answer": "Die Navy hat maximale Körperfettgrenzen nach Alter und Geschlecht. Für Alter 17-39 ist das Maximum 22% für Männer und 33% für Frauen. Ab 40 Jahre steigt es auf 23% für Männer und 34% für Frauen. Dies sind maximal erlaubte Prozentsätze für aktive Dienstmitglieder, nicht ideale Fitness-Level. Klicken Sie 'Navy Körperfett Standards anzeigen' in den Ergebnissen für die vollständige Tabelle."
        },
        {
          "question": "Wie genau ist die RFM (Relative Fettmasse) Methode?",
          "answer": "RFM hat ±5% Genauigkeit und wurde gegen DXA-Scans an 12.000+ Erwachsenen in der NHANES Studie validiert (veröffentlicht in Scientific Reports, Nature, 2018). Es ist genauer als BMI und fast so genau wie die Navy Methode, benötigt aber nur Taillen- und Größenmessungen. RFM funktioniert gut bei diversen ethnischen Gruppen (Mexiko-Amerikaner, Europa-Amerikaner, Afrika-Amerikaner) und allen Altersgruppen."
        },
        {
          "question": "Kann ich diesen Rechner für Kinder oder Teenager verwenden?",
          "answer": "Dieser Rechner ist für Erwachsene (18+ Jahre) konzipiert. Kinder und Teenager haben verschiedene Körperzusammensetzungsformeln weil sie noch wachsen. Die BMI und CUN-BAE Methoden haben separate Gleichungen für Jugendliche unter 18. Konsultieren Sie einen Kinderarzt oder verwenden Sie ein jugendspezifisches Körperzusammensetzungs-Tool für jeden unter 18."
        },
        {
          "question": "Was ist CUN-BAE und wie unterscheidet es sich von BMI?",
          "answer": "CUN-BAE (Clínica Universidad de Navarra - Body Adiposity Estimator) ist eine fortgeschrittene Formel aus Diabetes Care (2012). Es verwendet BMI, Alter und Geschlecht aber enthält quadratische und Interaktionsterme die nichtlineare Beziehungen berücksichtigen. Es hat höhere Korrelation mit tatsächlichem Körperfett (r=0,89) als einfache BMI Umwandlung (r=0,79). CUN-BAE ist besonders genau zur Vorhersage kardiovaskulärer Risiken und Typ-2-Diabetes."
        },
        {
          "question": "Welche Messungen brauche ich für die Navy Methode?",
          "answer": "Für Männer: Größe, Taille (am Nabel) und Hals (unter Adamsapfel). Für Frauen: Größe, Taille (schmalste Stelle), Hals (unter Adamsapfel) und Hüften (breiteste Stelle des Gesäßes). Messen Sie auf nackter Haut mit Band horizontal und fest aber nicht zusammendrückend. Nehmen Sie den Durchschnitt von 2-3 Messungen. Die Navy Methode ist ±3,5% genau wenn Messungen korrekt durchgeführt werden."
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
        "saving": "Speichern...",
      },
      "share": {
        "calculatedWith": "Berechnet mit Kalcufy.com"
      },
      "ui": {
        "results": "Ergebnisse",
        "yourInformation": "Ihre Informationen"
      },
      "accessibility": {
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
        "ratings": "Bewertungen",
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

  // ═══════════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════════
  inputs: [// ─── WEIGHT (with unitType dropdown) ───// ─── HEIGHT (with unitType dropdown) ───// ─── WAIST (with unitType dropdown) ───// ─── NECK (with unitType dropdown) ───// ─── HIP (with unitType dropdown) ───],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════════
  results: [
    { id: "bodyFat", type: "primary", format: "text" },
    { id: "category", type: "secondary", format: "text" },
    { id: "fatMass", type: "secondary", format: "text" },
    { id: "leanMass", type: "secondary", format: "text" },
    { id: "bmi", type: "secondary", format: "text" },
    { id: "idealRange", type: "secondary", format: "text" },
    { id: "fatToLose", type: "secondary", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // INFO CARDS
  // ═══════════════════════════════════════════════════════════════════
  infoCards: [
    { id: "methodGuide", type: "list", icon: "🎯", itemCount: 5 },
    { id: "measureTips", type: "list", icon: "📏", itemCount: 4 },
    { id: "accuracy", type: "list", icon: "🔬", itemCount: 5 },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // DETAILED TABLES
  // ═══════════════════════════════════════════════════════════════════
  detailedTable: [
    {
      id: "navyStandards",
      buttonLabel: "View Navy Body Fat Standards",
      buttonIcon: "🎖️",
      modalTitle: "U.S. Navy Body Fat Standards",
      columns: [
        { id: "ageGroup", label: "Age Group", align: "left" },
        { id: "maleMax", label: "Male Max %", align: "center", highlight: true },
        { id: "femaleMax", label: "Female Max %", align: "center", highlight: true },
      ],
    },
    {
      id: "methodComparison",
      buttonLabel: "Compare All Methods",
      buttonIcon: "📊",
      modalTitle: "Method Comparison",
      columns: [
        { id: "method", label: "Method", align: "left" },
        { id: "result", label: "Body Fat %", align: "center", highlight: true },
        { id: "accuracy", label: "Accuracy", align: "center" },
        { id: "requires", label: "Requires", align: "left" },
      ],
    },
  ],

  referenceData: [],

  // ═══════════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════════
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "fiveMethods", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 5 },
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
    { id: "8" },
    { id: "9" },
    { id: "10" },
    { id: "11" },
    { id: "12" },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════════
  references: [
    {
      authors: "Hodgdon, J. A., & Beckett, M. B.",
      year: "1984",
      title: "Prediction of percent body fat for U.S. Navy men and women from body circumferences and height",
      source: "Naval Health Research Center Technical Report",
      url: "https://apps.dtic.mil/sti/citations/ADA150981",
    },
    {
      authors: "Woolcott, O. O., & Bergman, R. N.",
      year: "2018",
      title: "Relative fat mass (RFM) as a new estimator of whole-body fat percentage",
      source: "Scientific Reports (Nature)",
      url: "https://www.nature.com/articles/s41598-018-29362-1",
    },
  ],

  hero: {
    title: "Body Fat Calculator",
    description: "Calculate your body fat percentage with 5 science-backed methods",
  },

  sidebar: {
    relatedPosts: [],
  },

  features: {
    share: true,
    save: true,
    print: true,
  },

  relatedCalculators: ["bmi", "caloric-deficit", "ideal-weight", "one-rep-max"],

  ads: {
    enabled: true,
    slots: ["top", "sidebar", "bottom"],
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function getCategory(bodyFat: number, gender: string): string {
  if (gender === "male") {
    if (bodyFat < 2) return "Underweight";
    if (bodyFat <= 5) return "Essential Fat";
    if (bodyFat <= 13) return "Athletes";
    if (bodyFat <= 17) return "Fitness";
    if (bodyFat <= 24) return "Average";
    return "Obese";
  } else {
    if (bodyFat < 10) return "Underweight";
    if (bodyFat <= 13) return "Essential Fat";
    if (bodyFat <= 20) return "Athletes";
    if (bodyFat <= 24) return "Fitness";
    if (bodyFat <= 31) return "Average";
    return "Obese";
  }
}

function getMethodName(method: string): string {
  const names: Record<string, string> = {
    navy: "U.S. Navy",
    bmi: "BMI Method",
    cunbae: "CUN-BAE",
    bai: "BAI",
    rfm: "RFM",
  };
  return names[method] || method;
}

// =============================================================================
// CALCULATE FUNCTION (UPDATED — USES UNIT ENGINE)
// =============================================================================
export function calculateBodyFat(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;

  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // Read common inputs
  const method = (values.method as string) || "navy";
  const gender = (values.gender as string) || "male";
  const age = (values.age as number) || 30;

  // ✅ CONVERT ALL MEASUREMENTS USING UNIT ENGINE
  // Height: base unit is CM (not meters!)
  const heightCm = values.height
    ? convertToBase(values.height as number, fieldUnits.height || "in", "height")
    : 0;

  // Weight: base unit is kg
  const weightKg = values.weight
    ? convertToBase(values.weight as number, fieldUnits.weight || "lbs", "weight")
    : null;

  // Body measurements: base unit is CM (not meters!)
  const waistCm = values.waist
    ? convertToBase(values.waist as number, fieldUnits.waist || "in", "body_length")
    : null;

  const neckCm = values.neck
    ? convertToBase(values.neck as number, fieldUnits.neck || "in", "body_length")
    : null;

  const hipCm = values.hip
    ? convertToBase(values.hip as number, fieldUnits.hip || "in", "body_length")
    : null;

  if (heightCm <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const heightMFinal = heightCm / 100;
  let bodyFat: number | null = null;

  // ─── NAVY METHOD ───
  if (method === "navy") {
    if (!waistCm || !neckCm || waistCm <= neckCm) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }
    if (gender === "male") {
      bodyFat =
        495 /
          (1.0324 -
            0.19077 * Math.log10(waistCm - neckCm) +
            0.15456 * Math.log10(heightCm)) -
        450;
    } else {
      if (!hipCm) {
        return { values: {}, formatted: {}, summary: "", isValid: false };
      }
      bodyFat =
        495 /
          (1.29579 -
            0.35004 * Math.log10(waistCm + hipCm - neckCm) +
            0.221 * Math.log10(heightCm)) -
        450;
    }
  }

  // ─── BMI METHOD (Deurenberg) ───
  if (method === "bmi") {
    if (!weightKg) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }
    const bmiVal = weightKg / (heightMFinal * heightMFinal);
    const sex = gender === "male" ? 1 : 0;
    bodyFat = 1.2 * bmiVal + 0.23 * age - 10.8 * sex - 5.4;
  }

  // ─── CUN-BAE ───
  if (method === "cunbae") {
    if (!weightKg) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }
    const bmiVal = weightKg / (heightMFinal * heightMFinal);
    const sex = gender === "male" ? 0 : 1;
    bodyFat =
      -44.988 +
      0.503 * age +
      10.689 * sex +
      3.172 * bmiVal -
      0.026 * bmiVal * bmiVal +
      0.181 * bmiVal * sex -
      0.02 * bmiVal * age -
      0.005 * bmiVal * bmiVal * sex +
      0.00021 * bmiVal * bmiVal * age;
  }

  // ─── BAI ───
  if (method === "bai") {
    if (!hipCm) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }
    bodyFat = hipCm / Math.pow(heightMFinal, 1.5) - 18;
  }

  // ─── RFM ───
  if (method === "rfm") {
    if (!waistCm) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }
    bodyFat =
      gender === "male"
        ? 64 - 20 * (heightCm / waistCm)
        : 76 - 20 * (heightCm / waistCm);
  }

  // Validate result
  if (bodyFat === null || isNaN(bodyFat)) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Clamp to reasonable range
  bodyFat = Math.max(1, Math.min(65, bodyFat));

  // ─── DERIVED CALCULATIONS ───
  const categoryRaw = getCategory(bodyFat, gender);
  const category = v[categoryRaw] || categoryRaw;

  // BMI (when weight is available)
  let bmiVal: number | null = null;
  if (weightKg) {
    bmiVal = weightKg / (heightMFinal * heightMFinal);
  }

  // Fat mass & lean mass (when weight is available)
  let fatMassKg: number | null = null;
  let leanMassKg: number | null = null;
  if (weightKg) {
    fatMassKg = weightKg * (bodyFat / 100);
    leanMassKg = weightKg - fatMassKg;
  }

  // Ideal range (fitness level)
  const idealRange = gender === "male" ? "14-17%" : "21-24%";
  const idealUpper = gender === "male" ? 17 : 24;

  // Fat to lose to reach ideal
  let fatToLose: number | null = null;
  if (weightKg && bodyFat > idealUpper) {
    const idealWeight = leanMassKg! / (1 - idealUpper / 100);
    fatToLose = weightKg - idealWeight;
  }

  // ─── FORMAT (use user's selected weight unit) ───
  const pct = v["%"] || "%";
  const weightUnit = fieldUnits.weight || "lbs";
  const weightSymbol = weightUnit === "kg" ? (v["kg"] || "kg") : (v["lbs"] || "lbs");
  const na = v["N/A"] || "N/A";

  const toDisplay = (kg: number | null): string => {
    if (kg === null) return na;
    // Convert kg to user's selected unit
    if (weightUnit === "kg") {
      return `${kg.toFixed(1)} ${weightSymbol}`;
    } else {
      const lbs = kg * 2.20462;
      return `${lbs.toFixed(1)} ${weightSymbol}`;
    }
  };

  const METHOD_NAMES: Record<string, string> = {
    navy: "U.S. Navy",
    bmi: "BMI Method",
    cunbae: "CUN-BAE",
    bai: "BAI",
    rfm: "RFM",
  };
  const methodNameRaw = METHOD_NAMES[method] || method;
  const methodName = v[methodNameRaw] || methodNameRaw;

  const fatLabel = v["Fat"] || "Fat";
  const leanLabel = v["Lean"] || "Lean";

  const compositionText =
    fatMassKg !== null
      ? `${fatLabel}: ${toDisplay(fatMassKg)}, ${leanLabel}: ${toDisplay(leanMassKg)}`
      : "";

  const summary = (f.summary || "Body fat: {bodyFat}% ({category}) via {method}. {composition}")
    .replace("{bodyFat}", bodyFat.toFixed(1))
    .replace("{category}", category)
    .replace("{method}", methodName)
    .replace("{composition}", compositionText);

  // ─── CALCULATE ALL 5 METHODS (for comparison table) ───
  const allResults: Array<{ method: string; result: number | null; accuracy: string; requires: string }> = [];

  // Navy
  if (waistCm && neckCm && waistCm > neckCm) {
    let navyResult: number;
    if (gender === "male") {
      navyResult =
        495 /
          (1.0324 -
            0.19077 * Math.log10(waistCm - neckCm) +
            0.15456 * Math.log10(heightCm)) -
        450;
    } else {
      if (hipCm) {
        navyResult =
          495 /
            (1.29579 -
              0.35004 * Math.log10(waistCm + hipCm - neckCm) +
              0.221 * Math.log10(heightCm)) -
          450;
      } else {
        navyResult = NaN;
      }
    }
    if (!isNaN(navyResult)) {
      allResults.push({
        method: "Navy",
        result: Math.max(1, Math.min(65, navyResult)),
        accuracy: "±3.5%",
        requires: gender === "male" ? (v["Tape: waist, neck"] || "Tape: waist, neck") : (v["Tape: waist, neck, hip"] || "Tape: waist, neck, hip"),
      });
    }
  }

  // BMI
  if (weightKg) {
    const bmiVal = weightKg / (heightMFinal * heightMFinal);
    const sex = gender === "male" ? 1 : 0;
    const bmiResult = 1.2 * bmiVal + 0.23 * age - 10.8 * sex - 5.4;
    allResults.push({
      method: "BMI",
      result: Math.max(1, Math.min(65, bmiResult)),
      accuracy: "±4.1%",
      requires: v["Scale + height"] || "Scale + height",
    });
  }

  // CUN-BAE
  if (weightKg) {
    const bmiVal = weightKg / (heightMFinal * heightMFinal);
    const sex = gender === "male" ? 0 : 1;
    const cunbaeResult =
      -44.988 +
      0.503 * age +
      10.689 * sex +
      3.172 * bmiVal -
      0.026 * bmiVal * bmiVal +
      0.181 * bmiVal * sex -
      0.02 * bmiVal * age -
      0.005 * bmiVal * bmiVal * sex +
      0.00021 * bmiVal * bmiVal * age;
    allResults.push({
      method: "CUN-BAE",
      result: Math.max(1, Math.min(65, cunbaeResult)),
      accuracy: "±4.6%",
      requires: v["Scale + height + age"] || "Scale + height + age",
    });
  }

  // BAI
  if (hipCm) {
    const baiResult = hipCm / Math.pow(heightMFinal, 1.5) - 18;
    allResults.push({
      method: "BAI",
      result: Math.max(1, Math.min(65, baiResult)),
      accuracy: "±6%",
      requires: v["Tape: hip + height (no scale)"] || "Tape: hip + height (no scale)",
    });
  }

  // RFM
  if (waistCm) {
    const rfmResult =
      gender === "male"
        ? 64 - 20 * (heightCm / waistCm)
        : 76 - 20 * (heightCm / waistCm);
    allResults.push({
      method: "RFM",
      result: Math.max(1, Math.min(65, rfmResult)),
      accuracy: "±5%",
      requires: v["Tape: waist + height"] || "Tape: waist + height",
    });
  }

  // ─── BUILD DETAILED TABLES DATA ───
  const navyStandardsData = [
    { ageGroup: "17-20", maleMax: "20%", femaleMax: "30%" },
    { ageGroup: "21-27", maleMax: "22%", femaleMax: "32%" },
    { ageGroup: "28-39", maleMax: "24%", femaleMax: "34%" },
    { ageGroup: "40+", maleMax: "26%", femaleMax: "36%" },
  ];

  const methodComparisonData = allResults.length >= 3
    ? allResults.map((r) => ({
        method: r.method,
        result: `${r.result!.toFixed(1)}%`,
        accuracy: r.accuracy,
        requires: r.requires,
      }))
    : undefined;

  return {
    values: {
      bodyFat,
      category: categoryRaw,
      fatMass: fatMassKg,
      leanMass: leanMassKg,
      bmi: bmiVal,
      idealRange,
      fatToLose,
    },
    formatted: {
      bodyFat: `${bodyFat.toFixed(1)}${pct}`,
      category,
      fatMass: toDisplay(fatMassKg),
      leanMass: toDisplay(leanMassKg),
      bmi: bmiVal !== null ? bmiVal.toFixed(1) : na,
      idealRange,
      fatToLose: fatToLose !== null && fatToLose > 0 ? toDisplay(fatToLose) : "—",
    },
    summary,
    isValid: true,
    metadata: {
      navyStandards: navyStandardsData,
      methodComparison: methodComparisonData,
    },
  };
}

export default bodyFatConfig;
