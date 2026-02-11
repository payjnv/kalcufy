// ⚡ WAIST-TO-HEIGHT RATIO CALCULATOR V4
// Uses unitType per field with auto-conversion via Unit Engine
import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase, convertFromBase } from "@/engine/v4/units";

// ═══════════════════════════════════════════════════════════════════
// WAIST-TO-HEIGHT RATIO CALCULATOR V4
// WHtR + gender-specific categories + BMI comparison + target waist
// + age-adjusted risk + WHR bonus + Years of Life Lost estimate
// ═══════════════════════════════════════════════════════════════════

export const waistToHeightRatioCalculatorConfig: CalculatorConfigV4 = {
  id: "waist-to-height-ratio",
  version: "4.0",
  category: "health",
  icon: "📏",

  // ═══════════════════════════════════════════════════════════════════
  // PRESETS
  // ═══════════════════════════════════════════════════════════════════
  presets: [
    {
      id: "athleticMale",
      icon: "🏋️",
      values: {        gender: "male",
        age: 28,
        waist: 31,          // in (defaultUnit)
        height: 178,        // cm (base for ft_in)
        weight: 175,        // lbs (defaultUnit)
        hip: 37,            // in (defaultUnit)
        activityLevel: "active",
      },
    },
    {
      id: "averageFemale",
      icon: "👩",
      values: {        gender: "female",
        age: 32,
        waist: 30,          // in
        height: 165,        // cm
        weight: 145,        // lbs
        hip: 38,            // in
        activityLevel: "moderate",
      },
    },
    {
      id: "overweightRisk",
      icon: "⚠️",
      values: {        gender: "male",
        age: 45,
        waist: 42,          // in
        height: 175,        // cm
        weight: 220,        // lbs
        hip: 40,            // in
        activityLevel: "sedentary",
      },
    },
    {
      id: "seniorHealthy",
      icon: "🧓",
      values: {        gender: "male",
        age: 65,
        waist: 34,          // in
        height: 173,        // cm
        weight: 170,        // lbs
        hip: 38,            // in
        activityLevel: "light",
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // TRANSLATIONS (EN only)
  // ═══════════════════════════════════════════════════════════════════
  t: {
    en: {
      name: "Waist-to-Height Ratio Calculator",
      slug: "waist-to-height-ratio-calculator",
      subtitle: "Assess your cardiometabolic risk with a metric more accurate than BMI — plus get your target waist, BMI comparison, and personalized action plan",
      breadcrumb: "Waist-to-Height Ratio",

      // ─── SEO ───────────────────────────────────────────────────
      seo: {
        title: "Waist-to-Height Ratio Calculator — WHtR Risk & Target Waist",
        description: "Calculate your waist-to-height ratio with gender and age-specific risk categories, BMI comparison, target waist goal, and estimated years of life lost. Based on NICE 2025 guidelines.",
        shortDescription: "Assess cardiometabolic risk more accurately than BMI alone",
        keywords: [
          "waist to height ratio calculator",
          "WHtR calculator",
          "waist height ratio",
          "cardiometabolic risk assessment",
          "abdominal obesity calculator",
          "central obesity screening",
          "waist circumference health risk",
          "NICE waist to height",
        ],
      },

      // ─── UI ────────────────────────────────────────────────────
      calculator: { yourInformation: "Your Measurements" },
      ui: {
        yourInformation: "Your Measurements",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      // ─── INPUTS ────────────────────────────────────────────────
      inputs: {
        gender: {
          label: "Gender",
          helpText: "WHtR risk cutoffs differ between men and women",
          options: { male: "Male", female: "Female" },
        },
        age: {
          label: "Age",
          helpText: "Risk thresholds shift with age (under 40, 40–50, over 50)",
        },
        activityLevel: {
          label: "Activity Level",
          helpText: "Helps generate personalized action recommendations",
          options: {
            sedentary: "Sedentary (little to no exercise)",
            light: "Light (1–3 days/week)",
            moderate: "Moderate (3–5 days/week)",
            active: "Active (6–7 days/week)",
            veryActive: "Very Active (intense daily exercise)",
          },
        },
      },

      // ─── INPUT GROUPS ──────────────────────────────────────────
      inputGroups: {},

      // ─── RESULTS ───────────────────────────────────────────────
      results: {
        whtr: { label: "Waist-to-Height Ratio" },
        category: { label: "Body Shape Category" },
        riskLevel: { label: "Health Risk Level" },
        targetWaist: { label: "Target Waist (Healthy Max)" },
        waistToLose: { label: "Waist Reduction Needed" },
        bmi: { label: "BMI Comparison" },
        whr: { label: "Waist-to-Hip Ratio" },
        yearsOfLifeLost: { label: "Est. Years of Life Lost" },
      },

      // ─── TOOLTIPS ──────────────────────────────────────────────
      tooltips: {
        whtr: "Waist circumference divided by height — values above 0.5 indicate increased health risk",
        category: "Gender-specific classification based on your WHtR value",
        riskLevel: "Adjusted for your age — risk thresholds shift with aging",
        targetWaist: "Maximum healthy waist circumference based on your height (height × 0.5)",
        waistToLose: "How much waist circumference to reduce to reach the healthy zone",
        bmi: "Body Mass Index calculated from your weight and height for comparison",
        whr: "Waist-to-hip ratio — another indicator of fat distribution and cardiovascular risk",
        yearsOfLifeLost: "Estimated reduction in life expectancy based on WHtR from population studies",
      },

      // ─── PRESETS ───────────────────────────────────────────────
      presets: {
        athleticMale: {
          label: "Athletic Male",
          description: "Fit man, 28 yrs, 32 in waist, 5'10\"",
        },
        averageFemale: {
          label: "Average Female",
          description: "Healthy woman, 32 yrs, 30 in waist, 5'5\"",
        },
        overweightRisk: {
          label: "Overweight Risk",
          description: "Man with abdominal fat, 45 yrs, 40 in waist",
        },
        seniorHealthy: {
          label: "Senior Healthy",
          description: "Active senior, 65 yrs, 34 in waist, 5'8\"",
        },
      },

      // ─── VALUES (dynamic translations) ─────────────────────────
      values: {
        "cm": "cm",
        "in": "in",
        "kg": "kg",
        "lbs": "lbs",
        "kg/m²": "kg/m²",
        "N/A": "N/A",
        "none": "none",
        "years": "years",
        "year": "year",
        "Abnormally Slim": "Abnormally Slim",
        "Extremely Slim": "Extremely Slim",
        "Slender & Healthy": "Slender & Healthy",
        "Healthy": "Healthy",
        "Overweight": "Overweight",
        "Extremely Overweight": "Extremely Overweight",
        "Obese": "Obese",
        "Underweight Risk": "Underweight Risk",
        "Low Risk": "Low Risk",
        "Moderate Risk": "Moderate Risk",
        "Increased Risk": "Increased Risk",
        "High Risk": "High Risk",
        "Very High Risk": "Very High Risk",
        "Underweight": "Underweight",
        "Normal": "Normal",
        "Obese Class I": "Obese Class I",
        "Obese Class II": "Obese Class II",
        "Obese Class III": "Obese Class III",
        "Low": "Low",
        "Moderate": "Moderate",
        "High": "High",
        "Very High": "Very High",
        "Already at target": "Already at target",
      },

      // ─── FORMATS ───────────────────────────────────────────────
      formats: {
        summary: "Your waist-to-height ratio is {whtr} ({category}). Risk level: {riskLevel}. Your target waist is {targetWaist}. {waistAction} BMI for comparison: {bmi}.",
      },

      // ─── INFO CARDS ────────────────────────────────────────────
      infoCards: {
        bodyMetrics: {
          title: "📊 Your Body Metrics",
        },
        actionPlan: {
          title: "🎯 Action Plan",
        },
        tips: {
          title: "💡 Measurement Tips",
          items: [
            "Measure waist midway between your lowest rib and hip bone, usually just above the belly button",
            "Use a non-stretch tape measure flat against bare skin — don't compress the skin",
            "Take the reading at the end of a normal exhale, standing upright and relaxed",
            "Measure at the same time of day for consistent tracking — morning before eating is ideal",
          ],
        },
        healthActions: {
          title: "🩺 Health Actions by WHtR",
          items: [
            "WHtR below 0.4 — Consider gaining healthy weight; consult a dietitian if underweight",
            "WHtR 0.4–0.5 — You're in the healthy zone; maintain your current lifestyle and recheck annually",
            "WHtR 0.5–0.6 — Take action: increase daily activity, reduce refined carbs, and aim for 5% waist reduction",
            "WHtR above 0.6 — Seek medical advice: high cardiometabolic risk requires professional guidance and monitoring",
          ],
        },
      },

      // ─── REFERENCE DATA ────────────────────────────────────────
      referenceData: {},

      // ─── EDUCATION ─────────────────────────────────────────────
      education: {
        whatIs: {
          title: "What is Waist-to-Height Ratio?",
          content: "Waist-to-height ratio (WHtR) is a simple screening tool that divides your waist circumference by your height to assess how body fat is distributed around your midsection. Unlike Body Mass Index (BMI), which only considers weight relative to height, WHtR specifically targets abdominal fat — the type most strongly linked to heart disease, type 2 diabetes, stroke, and premature death. The general rule endorsed by the UK's National Institute for Health and Care Excellence (NICE) in their 2025 guidelines is straightforward: keep your waist circumference to less than half your height. A WHtR below 0.5 is considered healthy for adults of all ages, genders, and ethnicities. Values between 0.5 and 0.6 indicate increased risk, while values above 0.6 signal the need for immediate action. Multiple systematic reviews and meta-analyses across 14 countries have confirmed that WHtR outperforms BMI as a predictor of cardiovascular and metabolic risk, making it the preferred first-line screening tool recommended by leading health authorities worldwide.",
        },
        whyBetter: {
          title: "Why WHtR is More Accurate Than BMI",
          content: "BMI was never designed to diagnose obesity in individuals — it was created in the 1830s for population-level statistics. Its biggest flaw is that it cannot distinguish between muscle mass and fat mass, nor does it account for where fat is stored in the body. A muscular athlete and a sedentary person with excess belly fat can have identical BMI scores despite vastly different health profiles. WHtR solves this by focusing specifically on abdominal (visceral) fat, which surrounds vital organs and releases inflammatory substances that drive metabolic disease. Research published in Obesity Reviews (2012) analyzed over 300,000 adults and found that WHtR was a significantly better predictor of cardiovascular risk factors than either BMI or waist circumference alone. A landmark study in PLOS ONE demonstrated that WHtR predicted years of life lost more accurately than BMI, with risk increasing dramatically above a ratio of 0.52. The 2024 Lancet Commission on obesity and the European Association for the Study of Obesity now recommend that obesity should no longer be diagnosed with BMI alone, and should be confirmed with WHtR measurement.",
        },
        howToMeasure: {
          title: "How to Measure Correctly",
          items: [
            { text: "Stand upright and relaxed — do not suck in your stomach or hold your breath during measurement", type: "info" },
            { text: "Locate the measurement point midway between your lowest palpable rib and the top of your iliac crest (hip bone) — this is usually just above the navel", type: "info" },
            { text: "Wrap a flexible, non-stretch measuring tape horizontally around your waist at this point, keeping it snug but not compressing the skin", type: "info" },
            { text: "Read the measurement at the end of a normal exhale — do not inhale deeply before reading", type: "info" },
            { text: "Take two measurements and use the average — if they differ by more than 1 cm, take a third measurement", type: "warning" },
            { text: "Measure on bare skin or light clothing — thick clothing can add 1–2 cm of error to your reading", type: "warning" },
          ],
        },
        riskFactors: {
          title: "Health Risks of High WHtR",
          items: [
            { text: "Cardiovascular disease — WHtR above 0.5 is associated with significantly increased risk of heart attack and stroke, independent of BMI", type: "warning" },
            { text: "Type 2 diabetes — abdominal fat directly impairs insulin sensitivity, and WHtR is a stronger predictor of diabetes risk than BMI in most populations", type: "warning" },
            { text: "Hypertension — central obesity raises blood pressure through increased arterial stiffness and hormonal disruption", type: "warning" },
            { text: "Metabolic syndrome — a cluster of conditions (high blood sugar, abnormal cholesterol, elevated triglycerides) that multiply cardiovascular risk", type: "info" },
            { text: "Reduced life expectancy — research shows years of life lost increase dramatically above WHtR 0.52, with men and women at WHtR 0.6+ losing an estimated 7+ years", type: "warning" },
            { text: "Fatty liver disease and certain cancers (colon, breast) are also associated with elevated waist-to-height ratio independent of overall body weight", type: "info" },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step WHtR calculations for different scenarios",
          examples: [
            {
              title: "Healthy Adult Male",
              steps: [
                "Height: 5 ft 10 in = 70 inches (178 cm)",
                "Waist circumference: 33 inches (84 cm)",
                "WHtR = 33 ÷ 70 = 0.471",
                "Category: Healthy (male 0.46–0.53)",
                "Target waist: 70 × 0.5 = 35 inches max",
                "Status: ✅ Below target — low risk",
              ],
              result: "WHtR: 0.47 — Low Risk, No Action Needed",
            },
            {
              title: "At-Risk Female, Age 50",
              steps: [
                "Height: 5 ft 4 in = 64 inches (163 cm)",
                "Waist circumference: 36 inches (91 cm)",
                "WHtR = 36 ÷ 64 = 0.563",
                "Category: Overweight (female 0.49–0.54 → exceeds)",
                "Target waist: 64 × 0.5 = 32 inches max",
                "Waist to lose: 36 - 32 = 4 inches",
              ],
              result: "WHtR: 0.56 — Increased Risk, Reduce 4 inches",
            },
          ],
        },
      },

      // ─── FAQS ──────────────────────────────────────────────────
      faqs: [
        {
          question: "What is a healthy waist-to-height ratio?",
          answer: "A WHtR below 0.5 is considered healthy for adults of all ages and genders. This means your waist circumference should be less than half your height. For example, if you are 170 cm tall, your waist should be under 85 cm. The NICE 2025 guidelines classify WHtR 0.4–0.5 as healthy, 0.5–0.6 as increased risk requiring action, and above 0.6 as high risk.",
        },
        {
          question: "Is waist-to-height ratio better than BMI?",
          answer: "Yes, multiple meta-analyses have shown WHtR is a superior predictor of cardiovascular disease, diabetes, and mortality risk compared to BMI. The key advantage is that WHtR specifically measures abdominal fat distribution, while BMI cannot distinguish between muscle and fat. The 2024 Lancet Commission and European obesity guidelines now recommend WHtR alongside BMI rather than relying on BMI alone.",
        },
        {
          question: "Where exactly should I measure my waist?",
          answer: "According to WHO protocol, measure at the midpoint between your lowest palpable rib and the top of your iliac crest (hip bone). In practice, this is usually just above the navel or belly button. Use a non-stretch tape measure, keep it horizontal, measure on bare skin, and read at the end of a normal exhale. Take two measurements and average them.",
        },
        {
          question: "Do the risk categories differ by gender?",
          answer: "Yes. While the universal 0.5 cutoff applies to everyone, detailed categories differ. For men, a WHtR of 0.46–0.53 is considered healthy, while for women the healthy range is 0.46–0.49. Women enter the overweight category at a lower WHtR (0.49) compared to men (0.53), reflecting differences in fat distribution patterns between sexes.",
        },
        {
          question: "Does age affect my waist-to-height ratio risk?",
          answer: "The 0.5 cutoff is universal, but research suggests some age adjustment is reasonable. Under age 40, the strict 0.5 boundary applies. Between 40 and 50, values up to 0.55 may carry moderate rather than high risk. Over age 50, natural age-related changes mean values up to 0.58 may represent moderate risk. However, a WHtR above 0.6 at any age indicates significant health concern.",
        },
        {
          question: "What is the waist-to-hip ratio and how does it differ?",
          answer: "Waist-to-hip ratio (WHR) divides your waist circumference by your hip circumference. It measures fat distribution between your abdomen and hips. A WHR above 0.90 for men or 0.85 for women indicates abdominal obesity. While both WHtR and WHR assess central fat, WHtR is considered simpler and equally predictive since it only requires one measurement (waist) plus height, which most people already know.",
        },
        {
          question: "Can I improve my waist-to-height ratio?",
          answer: "Yes. Reducing waist circumference through a combination of caloric deficit, regular aerobic exercise (especially moderate-intensity like brisk walking), and strength training is effective. You cannot spot-reduce abdominal fat, but overall fat loss tends to reduce visceral fat preferentially. Even a 5% reduction in waist circumference can meaningfully improve cardiometabolic markers.",
        },
        {
          question: "How accurate is the years of life lost estimate?",
          answer: "The estimate is based on population-level data from the Health and Lifestyle Survey (HALS) and Health Survey for England, published in PLOS ONE. It represents statistical averages across large populations — individual results vary significantly based on genetics, lifestyle, diet, and other health factors. It should be viewed as a motivational indicator rather than a precise personal prediction.",
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
      "name": "Calculadora de Relación Cintura-Altura",
      "slug": "calculadora-relacion-cintura-altura",
      "subtitle": "Evalúa tu riesgo cardiometabólico con una métrica más precisa que el IMC — además obtén tu cintura objetivo, comparación de IMC y plan de acción personalizado",
      "breadcrumb": "Relación Cintura-Altura",
      "seo": {
        "title": "Calculadora de Relación Cintura-Altura — Riesgo RCA y Cintura Objetivo",
        "description": "Calcula tu relación cintura-altura con categorías de riesgo específicas por género y edad, comparación de IMC, meta de cintura objetivo y años estimados de vida perdidos. Basado en las directrices NICE 2025.",
        "shortDescription": "Evalúa el riesgo cardiometabólico con mayor precisión que el IMC solo",
        "keywords": [
          "calculadora relación cintura altura",
          "calculadora RCA",
          "relación cintura altura",
          "evaluación riesgo cardiometabólico",
          "calculadora obesidad abdominal",
          "detección obesidad central",
          "riesgo salud circunferencia cintura",
          "NICE cintura altura"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "gender": {
          "label": "Género",
          "helpText": "Los puntos de corte de riesgo RCA difieren entre hombres y mujeres",
          "options": {
            "male": "Masculino",
            "female": "Femenino"
          }
        },
        "age": {
          "label": "Edad",
          "helpText": "Los umbrales de riesgo cambian con la edad (menor de 40, 40-50, mayor de 50)"
        },
        "activityLevel": {
          "label": "Nivel de Actividad",
          "helpText": "Ayuda a generar recomendaciones de acción personalizadas",
          "options": {
            "sedentary": "Sedentario (poco o ningún ejercicio)",
            "light": "Ligero (1-3 días/semana)",
            "moderate": "Moderado (3-5 días/semana)",
            "active": "Activo (6-7 días/semana)",
            "veryActive": "Muy Activo (ejercicio intenso diario)"
          }
        }
      },
      "inputGroups": {},
      "results": {
        "whtr": {
          "label": "Relación Cintura-Altura"
        },
        "category": {
          "label": "Categoría de Forma Corporal"
        },
        "riskLevel": {
          "label": "Nivel de Riesgo para la Salud"
        },
        "targetWaist": {
          "label": "Cintura Objetivo (Máx. Saludable)"
        },
        "waistToLose": {
          "label": "Reducción de Cintura Necesaria"
        },
        "bmi": {
          "label": "Comparación IMC"
        },
        "whr": {
          "label": "Relación Cintura-Cadera"
        },
        "yearsOfLifeLost": {
          "label": "Est. Años de Vida Perdidos"
        }
      },
      "tooltips": {
        "whtr": "Circunferencia de cintura dividida por altura — valores por encima de 0.5 indican mayor riesgo para la salud",
        "category": "Clasificación específica por género basada en tu valor RCA",
        "riskLevel": "Ajustado para tu edad — los umbrales de riesgo cambian con el envejecimiento",
        "targetWaist": "Circunferencia de cintura saludable máxima basada en tu altura (altura × 0.5)",
        "waistToLose": "Cuánta circunferencia de cintura reducir para alcanzar la zona saludable",
        "bmi": "Índice de Masa Corporal calculado a partir de tu peso y altura para comparación",
        "whr": "Relación cintura-cadera — otro indicador de distribución de grasa y riesgo cardiovascular",
        "yearsOfLifeLost": "Reducción estimada en la esperanza de vida basada en RCA de estudios poblacionales"
      },
      "presets": {
        "athleticMale": {
          "label": "Hombre Atlético",
          "description": "Hombre en forma, 28 años, cintura 81 cm, 1.78m"
        },
        "averageFemale": {
          "label": "Mujer Promedio",
          "description": "Mujer saludable, 32 años, cintura 76 cm, 1.65m"
        },
        "overweightRisk": {
          "label": "Riesgo Sobrepeso",
          "description": "Hombre con grasa abdominal, 45 años, cintura 102 cm"
        },
        "seniorHealthy": {
          "label": "Adulto Mayor Saludable",
          "description": "Adulto mayor activo, 65 años, cintura 86 cm, 1.73m"
        }
      },
      "values": {
        "cm": "cm",
        "in": "in",
        "kg": "kg",
        "lbs": "lbs",
        "kg/m²": "kg/m²",
        "N/A": "N/A",
        "none": "ninguno",
        "years": "años",
        "year": "año",
        "Abnormally Slim": "Anormalmente Delgado",
        "Extremely Slim": "Extremadamente Delgado",
        "Slender & Healthy": "Delgado y Saludable",
        "Healthy": "Saludable",
        "Overweight": "Sobrepeso",
        "Extremely Overweight": "Sobrepeso Extremo",
        "Obese": "Obeso",
        "Underweight Risk": "Riesgo Bajo Peso",
        "Low Risk": "Riesgo Bajo",
        "Moderate Risk": "Riesgo Moderado",
        "Increased Risk": "Riesgo Aumentado",
        "High Risk": "Riesgo Alto",
        "Very High Risk": "Riesgo Muy Alto",
        "Underweight": "Bajo Peso",
        "Normal": "Normal",
        "Obese Class I": "Obesidad Clase I",
        "Obese Class II": "Obesidad Clase II",
        "Obese Class III": "Obesidad Clase III",
        "Low": "Bajo",
        "Moderate": "Moderado",
        "High": "Alto",
        "Very High": "Muy Alto",
        "Already at target": "Ya en el objetivo"
      },
      "formats": {
        "summary": "Tu relación cintura-altura es {whtr} ({category}). Nivel de riesgo: {riskLevel}. Tu cintura objetivo es {targetWaist}. {waistAction} IMC para comparación: {bmi}."
      },
      "infoCards": {
        "bodyMetrics": {
          "title": "📊 Tus Métricas Corporales"
        },
        "actionPlan": {
          "title": "🎯 Plan de Acción"
        },
        "tips": {
          "title": "💡 Consejos de Medición",
          "items": [
            "Mide la cintura a la mitad entre tu costilla más baja y el hueso de la cadera, usualmente justo sobre el ombligo",
            "Usa una cinta métrica no elástica plana contra la piel desnuda — no comprimas la piel",
            "Toma la lectura al final de una exhalación normal, de pie y relajado",
            "Mide a la misma hora del día para seguimiento consistente — la mañana antes de comer es ideal"
          ]
        },
        "healthActions": {
          "title": "🩺 Acciones de Salud por RCA",
          "items": [
            "RCA menor a 0.4 — Considera ganar peso saludable; consulta un nutricionista si tienes bajo peso",
            "RCA 0.4–0.5 — Estás en la zona saludable; mantén tu estilo de vida actual y revisa anualmente",
            "RCA 0.5–0.6 — Toma acción: aumenta la actividad diaria, reduce carbohidratos refinados y busca 5% de reducción de cintura",
            "RCA mayor a 0.6 — Busca consejo médico: alto riesgo cardiometabólico requiere orientación profesional y monitoreo"
          ]
        }
      },
      "referenceData": {},
      "education": {
        "whatIs": {
          "title": "¿Qué es la Relación Cintura-Altura?",
          "content": "La relación cintura-altura (RCA) es una herramienta de detección simple que divide tu circunferencia de cintura por tu altura para evaluar cómo se distribuye la grasa corporal alrededor de tu sección media. A diferencia del Índice de Masa Corporal (IMC), que solo considera el peso relativo a la altura, la RCA se enfoca específicamente en la grasa abdominal — el tipo más fuertemente vinculado a enfermedades cardíacas, diabetes tipo 2, accidente cerebrovascular y muerte prematura. La regla general respaldada por el Instituto Nacional para la Salud y Excelencia en Atención (NICE) del Reino Unido en sus directrices de 2025 es sencilla: mantén tu circunferencia de cintura menos de la mitad de tu altura. Una RCA por debajo de 0.5 se considera saludable para adultos de todas las edades, géneros y etnias. Valores entre 0.5 y 0.6 indican riesgo aumentado, mientras que valores por encima de 0.6 señalan la necesidad de acción inmediata. Múltiples revisiones sistemáticas y metaanálisis en 14 países han confirmado que la RCA supera al IMC como predictor de riesgo cardiovascular y metabólico, convirtiéndola en la herramienta de detección de primera línea preferida recomendada por las principales autoridades sanitarias mundiales."
        },
        "whyBetter": {
          "title": "Por Qué la RCA es Más Precisa que el IMC",
          "content": "El IMC nunca fue diseñado para diagnosticar obesidad en individuos — fue creado en la década de 1830 para estadísticas a nivel poblacional. Su mayor defecto es que no puede distinguir entre masa muscular y masa grasa, ni tampoco considera dónde se almacena la grasa en el cuerpo. Un atleta musculoso y una persona sedentaria con exceso de grasa abdominal pueden tener puntajes de IMC idénticos a pesar de perfiles de salud vastamente diferentes. La RCA resuelve esto enfocándose específicamente en la grasa abdominal (visceral), que rodea órganos vitales y libera sustancias inflamatorias que impulsan enfermedades metabólicas. Investigación publicada en Obesity Reviews (2012) analizó más de 300,000 adultos y encontró que la RCA era un predictor significativamente mejor de factores de riesgo cardiovascular que el IMC o la circunferencia de cintura sola. Un estudio histórico en PLOS ONE demostró que la RCA predijo años de vida perdidos más precisamente que el IMC, con el riesgo aumentando dramáticamente por encima de una relación de 0.52. La Comisión Lancet 2024 sobre obesidad y la Asociación Europea para el Estudio de la Obesidad ahora recomiendan que la obesidad ya no debería diagnosticarse solo con IMC, y debería confirmarse con medición de RCA."
        },
        "howToMeasure": {
          "title": "Cómo Medir Correctamente",
          "items": [
            {
              "text": "Párate derecho y relajado — no metas el estómago ni contengas la respiración durante la medición",
              "type": "info"
            },
            {
              "text": "Localiza el punto de medición a la mitad entre tu costilla palpable más baja y la parte superior de tu cresta ilíaca (hueso de cadera) — esto usualmente está justo sobre el ombligo",
              "type": "info"
            },
            {
              "text": "Envuelve una cinta métrica flexible, no elástica, horizontalmente alrededor de tu cintura en este punto, manteniéndola ajustada pero sin comprimir la piel",
              "type": "info"
            },
            {
              "text": "Lee la medición al final de una exhalación normal — no inhales profundamente antes de leer",
              "type": "info"
            },
            {
              "text": "Toma dos mediciones y usa el promedio — si difieren por más de 1 cm, toma una tercera medición",
              "type": "warning"
            },
            {
              "text": "Mide sobre piel desnuda o ropa ligera — ropa gruesa puede agregar 1-2 cm de error a tu lectura",
              "type": "warning"
            }
          ]
        },
        "riskFactors": {
          "title": "Riesgos para la Salud de RCA Alta",
          "items": [
            {
              "text": "Enfermedad cardiovascular — RCA por encima de 0.5 se asocia con riesgo significativamente aumentado de infarto y accidente cerebrovascular, independiente del IMC",
              "type": "warning"
            },
            {
              "text": "Diabetes tipo 2 — la grasa abdominal afecta directamente la sensibilidad a la insulina, y la RCA es un predictor más fuerte de riesgo de diabetes que el IMC en la mayoría de poblaciones",
              "type": "warning"
            },
            {
              "text": "Hipertensión — la obesidad central eleva la presión arterial a través de mayor rigidez arterial y disrupción hormonal",
              "type": "warning"
            },
            {
              "text": "Síndrome metabólico — un conjunto de condiciones (azúcar alta en sangre, colesterol anormal, triglicéridos elevados) que multiplican el riesgo cardiovascular",
              "type": "info"
            },
            {
              "text": "Esperanza de vida reducida — la investigación muestra que los años de vida perdidos aumentan dramáticamente por encima de RCA 0.52, con hombres y mujeres en RCA 0.6+ perdiendo unos 7+ años estimados",
              "type": "warning"
            },
            {
              "text": "Enfermedad de hígado graso y ciertos cánceres (colon, mama) también se asocian con relación cintura-altura elevada independiente del peso corporal general",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo",
          "description": "Cálculos paso a paso de RCA para diferentes escenarios",
          "examples": [
            {
              "title": "Hombre Adulto Saludable",
              "steps": [
                "Altura: 1.78 m = 178 cm",
                "Circunferencia de cintura: 84 cm",
                "RCA = 84 ÷ 178 = 0.472",
                "Categoría: Saludable (hombre 0.46–0.53)",
                "Cintura objetivo: 178 × 0.5 = 89 cm máx.",
                "Estado: ✅ Por debajo del objetivo — riesgo bajo"
              ],
              "result": "RCA: 0.47 — Riesgo Bajo, No Se Necesita Acción"
            },
            {
              "title": "Mujer en Riesgo, Edad 50",
              "steps": [
                "Altura: 1.63 m = 163 cm",
                "Circunferencia de cintura: 91 cm",
                "RCA = 91 ÷ 163 = 0.558",
                "Categoría: Sobrepeso (mujer 0.49–0.54 → excede)",
                "Cintura objetivo: 163 × 0.5 = 81.5 cm máx.",
                "Cintura a perder: 91 - 81.5 = 9.5 cm"
              ],
              "result": "RCA: 0.56 — Riesgo Aumentado, Reducir 9.5 cm"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Qué es una relación cintura-altura saludable?",
          "answer": "Una RCA por debajo de 0.5 se considera saludable para adultos de todas las edades y géneros. Esto significa que tu circunferencia de cintura debe ser menos de la mitad de tu altura. Por ejemplo, si mides 170 cm de altura, tu cintura debe estar por debajo de 85 cm. Las directrices NICE 2025 clasifican RCA 0.4–0.5 como saludable, 0.5–0.6 como riesgo aumentado que requiere acción, y por encima de 0.6 como riesgo alto."
        },
        {
          "question": "¿Es la relación cintura-altura mejor que el IMC?",
          "answer": "Sí, múltiples metaanálisis han mostrado que la RCA es un predictor superior de enfermedad cardiovascular, diabetes y riesgo de mortalidad comparado con el IMC. La ventaja clave es que la RCA mide específicamente la distribución de grasa abdominal, mientras que el IMC no puede distinguir entre músculo y grasa. La Comisión Lancet 2024 y las directrices europeas de obesidad ahora recomiendan RCA junto con IMC en lugar de depender solo del IMC."
        },
        {
          "question": "¿Exactamente dónde debo medir mi cintura?",
          "answer": "Según el protocolo de la OMS, mide en el punto medio entre tu costilla palpable más baja y la parte superior de tu cresta ilíaca (hueso de cadera). En la práctica, esto usualmente está justo sobre el ombligo. Usa una cinta métrica no elástica, manténla horizontal, mide sobre piel desnuda, y lee al final de una exhalación normal. Toma dos mediciones y promédialas."
        },
        {
          "question": "¿Las categorías de riesgo difieren por género?",
          "answer": "Sí. Aunque el punto de corte universal 0.5 aplica a todos, las categorías detalladas difieren. Para hombres, una RCA de 0.46–0.53 se considera saludable, mientras que para mujeres el rango saludable es 0.46–0.49. Las mujeres entran en la categoría de sobrepeso a una RCA más baja (0.49) comparado con los hombres (0.53), reflejando diferencias en patrones de distribución de grasa entre sexos."
        },
        {
          "question": "¿La edad afecta mi riesgo de relación cintura-altura?",
          "answer": "El punto de corte 0.5 es universal, pero la investigación sugiere que algún ajuste por edad es razonable. Menor de 40 años, aplica el límite estricto de 0.5. Entre 40 y 50, valores hasta 0.55 pueden conllevar riesgo moderado en lugar de alto. Mayor de 50 años, cambios naturales relacionados con la edad significan que valores hasta 0.58 pueden representar riesgo moderado. Sin embargo, una RCA por encima de 0.6 a cualquier edad indica preocupación significativa para la salud."
        },
        {
          "question": "¿Qué es la relación cintura-cadera y cómo difiere?",
          "answer": "La relación cintura-cadera (RCC) divide tu circunferencia de cintura por tu circunferencia de cadera. Mide la distribución de grasa entre tu abdomen y caderas. Una RCC por encima de 0.90 para hombres o 0.85 para mujeres indica obesidad abdominal. Aunque tanto RCA como RCC evalúan grasa central, la RCA se considera más simple e igualmente predictiva ya que solo requiere una medición (cintura) más la altura, que la mayoría de las personas ya conocen."
        },
        {
          "question": "¿Puedo mejorar mi relación cintura-altura?",
          "answer": "Sí. Reducir la circunferencia de cintura a través de una combinación de déficit calórico, ejercicio aeróbico regular (especialmente intensidad moderada como caminar enérgicamente), y entrenamiento de fuerza es efectivo. No puedes reducir grasa abdominal específicamente, pero la pérdida de grasa general tiende a reducir grasa visceral preferencialmente. Incluso una reducción del 5% en circunferencia de cintura puede mejorar significativamente los marcadores cardiometabólicos."
        },
        {
          "question": "¿Qué tan precisa es la estimación de años de vida perdidos?",
          "answer": "La estimación se basa en datos a nivel poblacional del Health and Lifestyle Survey (HALS) y Health Survey for England, publicado en PLOS ONE. Representa promedios estadísticos a través de grandes poblaciones — los resultados individuales varían significativamente basados en genética, estilo de vida, dieta y otros factores de salud. Debe verse como un indicador motivacional más que una predicción personal precisa."
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
      "name": "Calculadora Relação Cintura-Altura",
      "slug": "calculadora-relacao-cintura-altura",
      "subtitle": "Avalie seu risco cardiometabólico com uma métrica mais precisa que o IMC — além de obter sua cintura ideal, comparação com IMC e plano de ação personalizado",
      "breadcrumb": "Relação Cintura-Altura",
      "seo": {
        "title": "Calculadora Relação Cintura-Altura — Risco RCA e Cintura Ideal",
        "description": "Calcule sua relação cintura-altura com categorias de risco específicas por gênero e idade, comparação com IMC, meta de cintura ideal e estimativa de anos de vida perdidos. Baseado nas diretrizes NICE 2025.",
        "shortDescription": "Avalie o risco cardiometabólico com mais precisão que apenas o IMC",
        "keywords": [
          "calculadora relação cintura altura",
          "calculadora RCA",
          "relação cintura altura",
          "avaliação risco cardiometabólico",
          "calculadora obesidade abdominal",
          "triagem obesidade central",
          "risco saúde circunferência cintura",
          "NICE relação cintura altura"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "gender": {
          "label": "Sexo",
          "helpText": "Os pontos de corte de risco da RCA diferem entre homens e mulheres",
          "options": {
            "male": "Masculino",
            "female": "Feminino"
          }
        },
        "age": {
          "label": "Idade",
          "helpText": "Os limites de risco mudam com a idade (abaixo de 40, 40–50, acima de 50)"
        },
        "activityLevel": {
          "label": "Nível de Atividade",
          "helpText": "Ajuda a gerar recomendações de ação personalizadas",
          "options": {
            "sedentary": "Sedentário (pouco ou nenhum exercício)",
            "light": "Leve (1–3 dias/semana)",
            "moderate": "Moderado (3–5 dias/semana)",
            "active": "Ativo (6–7 dias/semana)",
            "veryActive": "Muito Ativo (exercício intenso diário)"
          }
        }
      },
      "inputGroups": {},
      "results": {
        "whtr": {
          "label": "Relação Cintura-Altura"
        },
        "category": {
          "label": "Categoria de Formato Corporal"
        },
        "riskLevel": {
          "label": "Nível de Risco à Saúde"
        },
        "targetWaist": {
          "label": "Cintura Ideal (Máx. Saudável)"
        },
        "waistToLose": {
          "label": "Redução Necessária na Cintura"
        },
        "bmi": {
          "label": "Comparação com IMC"
        },
        "whr": {
          "label": "Relação Cintura-Quadril"
        },
        "yearsOfLifeLost": {
          "label": "Est. Anos de Vida Perdidos"
        }
      },
      "tooltips": {
        "whtr": "Circunferência da cintura dividida pela altura — valores acima de 0,5 indicam risco aumentado à saúde",
        "category": "Classificação específica por gênero baseada no seu valor de RCA",
        "riskLevel": "Ajustado para sua idade — os limites de risco mudam com o envelhecimento",
        "targetWaist": "Circunferência máxima saudável da cintura baseada na sua altura (altura × 0,5)",
        "waistToLose": "Quanto de circunferência da cintura reduzir para alcançar a zona saudável",
        "bmi": "Índice de Massa Corporal calculado a partir do seu peso e altura para comparação",
        "whr": "Relação cintura-quadril — outro indicador de distribuição de gordura e risco cardiovascular",
        "yearsOfLifeLost": "Redução estimada na expectativa de vida baseada na RCA de estudos populacionais"
      },
      "presets": {
        "athleticMale": {
          "label": "Homem Atlético",
          "description": "Homem em forma, 28 anos, cintura 81 cm, 1,78m"
        },
        "averageFemale": {
          "label": "Mulher Média",
          "description": "Mulher saudável, 32 anos, cintura 76 cm, 1,65m"
        },
        "overweightRisk": {
          "label": "Risco Sobrepeso",
          "description": "Homem com gordura abdominal, 45 anos, cintura 102 cm"
        },
        "seniorHealthy": {
          "label": "Idoso Saudável",
          "description": "Idoso ativo, 65 anos, cintura 86 cm, 1,73m"
        }
      },
      "values": {
        "cm": "cm",
        "in": "pol",
        "kg": "kg",
        "lbs": "lbs",
        "kg/m²": "kg/m²",
        "N/A": "N/A",
        "none": "nenhum",
        "years": "anos",
        "year": "ano",
        "Abnormally Slim": "Anormalmente Magro",
        "Extremely Slim": "Extremamente Magro",
        "Slender & Healthy": "Esbelto e Saudável",
        "Healthy": "Saudável",
        "Overweight": "Sobrepeso",
        "Extremely Overweight": "Sobrepeso Extremo",
        "Obese": "Obeso",
        "Underweight Risk": "Risco Baixo Peso",
        "Low Risk": "Risco Baixo",
        "Moderate Risk": "Risco Moderado",
        "Increased Risk": "Risco Aumentado",
        "High Risk": "Risco Alto",
        "Very High Risk": "Risco Muito Alto",
        "Underweight": "Baixo Peso",
        "Normal": "Normal",
        "Obese Class I": "Obesidade Grau I",
        "Obese Class II": "Obesidade Grau II",
        "Obese Class III": "Obesidade Grau III",
        "Low": "Baixo",
        "Moderate": "Moderado",
        "High": "Alto",
        "Very High": "Muito Alto",
        "Already at target": "Já na meta"
      },
      "formats": {
        "summary": "Sua relação cintura-altura é {whtr} ({category}). Nível de risco: {riskLevel}. Sua cintura ideal é {targetWaist}. {waistAction} IMC para comparação: {bmi}."
      },
      "infoCards": {
        "bodyMetrics": {
          "title": "📊 Suas Métricas Corporais"
        },
        "actionPlan": {
          "title": "🎯 Plano de Ação"
        },
        "tips": {
          "title": "💡 Dicas de Medição",
          "items": [
            "Meça a cintura no ponto médio entre a costela mais baixa e o osso do quadril, geralmente logo acima do umbigo",
            "Use uma fita métrica não elástica plana contra a pele nua — não comprima a pele",
            "Faça a leitura no final de uma expiração normal, em pé e relaxado",
            "Meça no mesmo horário do dia para acompanhamento consistente — manhã antes de comer é ideal"
          ]
        },
        "healthActions": {
          "title": "🩺 Ações de Saúde por RCA",
          "items": [
            "RCA abaixo de 0,4 — Considere ganhar peso saudável; consulte um nutricionista se estiver abaixo do peso",
            "RCA 0,4–0,5 — Você está na zona saudável; mantenha seu estilo de vida atual e reavalie anualmente",
            "RCA 0,5–0,6 — Tome ação: aumente atividade diária, reduza carboidratos refinados e busque reduzir 5% da cintura",
            "RCA acima de 0,6 — Busque orientação médica: risco cardiometabólico alto requer orientação e monitoramento profissional"
          ]
        }
      },
      "referenceData": {},
      "education": {
        "whatIs": {
          "title": "O que é a Relação Cintura-Altura?",
          "content": "A relação cintura-altura (RCA) é uma ferramenta simples de triagem que divide sua circunferência da cintura pela altura para avaliar como a gordura corporal está distribuída ao redor da sua cintura. Diferente do Índice de Massa Corporal (IMC), que apenas considera peso em relação à altura, a RCA foca especificamente na gordura abdominal — o tipo mais fortemente ligado a doenças cardíacas, diabetes tipo 2, derrame e morte prematura. A regra geral endossada pelo Instituto Nacional de Saúde e Excelência em Cuidados (NICE) do Reino Unido em suas diretrizes de 2025 é direta: mantenha sua circunferência da cintura menor que metade da sua altura. Uma RCA abaixo de 0,5 é considerada saudável para adultos de todas as idades, gêneros e etnias. Valores entre 0,5 e 0,6 indicam risco aumentado, enquanto valores acima de 0,6 sinalizam necessidade de ação imediata. Múltiplas revisões sistemáticas e meta-análises em 14 países confirmaram que a RCA supera o IMC como preditor de risco cardiovascular e metabólico, tornando-se a ferramenta de triagem de primeira linha preferida recomendada por autoridades de saúde líderes mundiais."
        },
        "whyBetter": {
          "title": "Por que a RCA é Mais Precisa que o IMC",
          "content": "O IMC nunca foi projetado para diagnosticar obesidade em indivíduos — foi criado na década de 1830 para estatísticas populacionais. Sua maior falha é não conseguir distinguir entre massa muscular e massa gorda, nem considera onde a gordura está armazenada no corpo. Um atleta musculoso e uma pessoa sedentária com excesso de gordura abdominal podem ter pontuações de IMC idênticas apesar de perfis de saúde vastamente diferentes. A RCA resolve isso focando especificamente na gordura abdominal (visceral), que circunda órgãos vitais e libera substâncias inflamatórias que causam doenças metabólicas. Pesquisa publicada em Obesity Reviews (2012) analisou mais de 300.000 adultos e descobriu que a RCA era um preditor significativamente melhor de fatores de risco cardiovascular que IMC ou circunferência da cintura isoladamente. Um estudo marcante em PLOS ONE demonstrou que a RCA previu anos de vida perdidos com mais precisão que o IMC, com risco aumentando dramaticamente acima da proporção de 0,52. A Comissão Lancet 2024 sobre obesidade e a Associação Europeia para o Estudo da Obesidade agora recomendam que obesidade não deve mais ser diagnosticada apenas com IMC, e deve ser confirmada com medição da RCA."
        },
        "howToMeasure": {
          "title": "Como Medir Corretamente",
          "items": [
            {
              "text": "Fique em pé e relaxado — não encolha a barriga ou prenda a respiração durante a medição",
              "type": "info"
            },
            {
              "text": "Localize o ponto de medição no meio entre sua costela mais baixa palpável e o topo da crista ilíaca (osso do quadril) — geralmente logo acima do umbigo",
              "type": "info"
            },
            {
              "text": "Envolva uma fita métrica flexível e não elástica horizontalmente ao redor da cintura neste ponto, mantendo-a justa mas sem comprimir a pele",
              "type": "info"
            },
            {
              "text": "Leia a medição no final de uma expiração normal — não inspire profundamente antes de ler",
              "type": "info"
            },
            {
              "text": "Faça duas medições e use a média — se diferirem por mais de 1 cm, faça uma terceira medição",
              "type": "warning"
            },
            {
              "text": "Meça na pele nua ou roupa leve — roupas grossas podem adicionar 1–2 cm de erro à sua leitura",
              "type": "warning"
            }
          ]
        },
        "riskFactors": {
          "title": "Riscos à Saúde de RCA Elevada",
          "items": [
            {
              "text": "Doença cardiovascular — RCA acima de 0,5 está associada a risco significativamente aumentado de infarto e derrame, independente do IMC",
              "type": "warning"
            },
            {
              "text": "Diabetes tipo 2 — gordura abdominal prejudica diretamente a sensibilidade à insulina, e RCA é um preditor mais forte de risco de diabetes que IMC na maioria das populações",
              "type": "warning"
            },
            {
              "text": "Hipertensão — obesidade central aumenta pressão arterial através de maior rigidez arterial e disrupção hormonal",
              "type": "warning"
            },
            {
              "text": "Síndrome metabólica — um conjunto de condições (glicose alta, colesterol anormal, triglicerídeos elevados) que multiplicam o risco cardiovascular",
              "type": "info"
            },
            {
              "text": "Redução da expectativa de vida — pesquisas mostram que anos de vida perdidos aumentam dramaticamente acima de RCA 0,52, com homens e mulheres em RCA 0,6+ perdendo estimados 7+ anos",
              "type": "warning"
            },
            {
              "text": "Doença hepática gordurosa e certos cânceres (cólon, mama) também estão associados à relação cintura-altura elevada independente do peso corporal total",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo",
          "description": "Cálculos de RCA passo a passo para diferentes cenários",
          "examples": [
            {
              "title": "Homem Adulto Saudável",
              "steps": [
                "Altura: 1,78 m = 178 cm",
                "Circunferência da cintura: 84 cm",
                "RCA = 84 ÷ 178 = 0,471",
                "Categoria: Saudável (masculino 0,46–0,53)",
                "Cintura ideal: 178 × 0,5 = 89 cm máx",
                "Status: ✅ Abaixo da meta — risco baixo"
              ],
              "result": "RCA: 0,47 — Risco Baixo, Nenhuma Ação Necessária"
            },
            {
              "title": "Mulher em Risco, 50 anos",
              "steps": [
                "Altura: 1,63 m = 163 cm",
                "Circunferência da cintura: 91 cm",
                "RCA = 91 ÷ 163 = 0,563",
                "Categoria: Sobrepeso (feminino 0,49–0,54 → excede)",
                "Cintura ideal: 163 × 0,5 = 81,5 cm máx",
                "Cintura a perder: 91 - 81,5 = 9,5 cm"
              ],
              "result": "RCA: 0,56 — Risco Aumentado, Reduzir 9,5 cm"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "O que é uma relação cintura-altura saudável?",
          "answer": "Uma RCA abaixo de 0,5 é considerada saudável para adultos de todas as idades e gêneros. Isso significa que sua circunferência da cintura deve ser menor que metade da sua altura. Por exemplo, se você tem 170 cm de altura, sua cintura deve estar abaixo de 85 cm. As diretrizes NICE 2025 classificam RCA 0,4–0,5 como saudável, 0,5–0,6 como risco aumentado requerendo ação, e acima de 0,6 como risco alto."
        },
        {
          "question": "A relação cintura-altura é melhor que o IMC?",
          "answer": "Sim, múltiplas meta-análises mostraram que a RCA é um preditor superior de doença cardiovascular, diabetes e risco de mortalidade comparado ao IMC. A vantagem chave é que a RCA mede especificamente a distribuição de gordura abdominal, enquanto o IMC não consegue distinguir entre músculo e gordura. A Comissão Lancet 2024 e diretrizes europeias de obesidade agora recomendam RCA junto com IMC ao invés de depender apenas do IMC."
        },
        {
          "question": "Onde exatamente devo medir minha cintura?",
          "answer": "Segundo o protocolo da OMS, meça no ponto médio entre sua costela mais baixa palpável e o topo da crista ilíaca (osso do quadril). Na prática, isso geralmente fica logo acima do umbigo. Use uma fita métrica não elástica, mantenha-a horizontal, meça na pele nua e leia no final de uma expiração normal. Faça duas medições e calcule a média."
        },
        {
          "question": "As categorias de risco diferem por gênero?",
          "answer": "Sim. Embora o ponto de corte universal 0,5 se aplique a todos, categorias detalhadas diferem. Para homens, uma RCA de 0,46–0,53 é considerada saudável, enquanto para mulheres a faixa saudável é 0,46–0,49. Mulheres entram na categoria sobrepeso em RCA mais baixa (0,49) comparado aos homens (0,53), refletindo diferenças nos padrões de distribuição de gordura entre os sexos."
        },
        {
          "question": "A idade afeta meu risco da relação cintura-altura?",
          "answer": "O ponto de corte 0,5 é universal, mas pesquisas sugerem que algum ajuste por idade é razoável. Abaixo de 40 anos, o limite rigoroso de 0,5 se aplica. Entre 40 e 50 anos, valores até 0,55 podem carregar risco moderado ao invés de alto. Acima de 50 anos, mudanças naturais relacionadas à idade significam que valores até 0,58 podem representar risco moderado. Entretanto, uma RCA acima de 0,6 em qualquer idade indica preocupação significativa à saúde."
        },
        {
          "question": "O que é a relação cintura-quadril e como difere?",
          "answer": "A relação cintura-quadril (RCQ) divide sua circunferência da cintura pela circunferência do quadril. Mede a distribuição de gordura entre abdômen e quadris. Uma RCQ acima de 0,90 para homens ou 0,85 para mulheres indica obesidade abdominal. Embora tanto RCA quanto RCQ avaliem gordura central, a RCA é considerada mais simples e igualmente preditiva já que requer apenas uma medição (cintura) mais altura, que a maioria das pessoas já conhece."
        },
        {
          "question": "Posso melhorar minha relação cintura-altura?",
          "answer": "Sim. Reduzir a circunferência da cintura através de uma combinação de déficit calórico, exercício aeróbico regular (especialmente intensidade moderada como caminhada rápida) e treinamento de força é eficaz. Você não pode reduzir gordura abdominal especificamente, mas perda geral de gordura tende a reduzir gordura visceral preferencialmente. Mesmo uma redução de 5% na circunferência da cintura pode melhorar significativamente marcadores cardiometabólicos."
        },
        {
          "question": "Quão precisa é a estimativa de anos de vida perdidos?",
          "answer": "A estimativa é baseada em dados populacionais do Health and Lifestyle Survey (HALS) e Health Survey for England, publicados em PLOS ONE. Representa médias estatísticas em grandes populações — resultados individuais variam significativamente baseados em genética, estilo de vida, dieta e outros fatores de saúde. Deve ser vista como um indicador motivacional ao invés de uma previsão pessoal precisa."
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
      "name": "Calculateur Ratio Taille-Taille",
      "slug": "calculateur-ratio-taille-taille",
      "subtitle": "Évaluez votre risque cardiométabolique avec une métrique plus précise que l'IMC — obtenez votre tour de taille cible, une comparaison IMC, et un plan d'action personnalisé",
      "breadcrumb": "Ratio Taille-Taille",
      "seo": {
        "title": "Calculateur Ratio Taille-Taille — Risque RTT et Tour de Taille Cible",
        "description": "Calculez votre ratio taille-taille avec des catégories de risque spécifiques par sexe et âge, comparaison IMC, objectif tour de taille cible, et estimation d'années de vie perdues. Basé sur les directives NICE 2025.",
        "shortDescription": "Évaluez le risque cardiométabolique plus précisément que l'IMC seul",
        "keywords": [
          "calculateur ratio taille taille",
          "calculateur RTT",
          "ratio taille hauteur",
          "évaluation risque cardiométabolique",
          "calculateur obésité abdominale",
          "dépistage obésité centrale",
          "risque santé tour de taille",
          "NICE ratio taille hauteur"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "gender": {
          "label": "Sexe",
          "helpText": "Les seuils de risque RTT diffèrent entre hommes et femmes",
          "options": {
            "male": "Homme",
            "female": "Femme"
          }
        },
        "age": {
          "label": "Âge",
          "helpText": "Les seuils de risque changent avec l'âge (moins de 40, 40–50, plus de 50)"
        },
        "activityLevel": {
          "label": "Niveau d'Activité",
          "helpText": "Aide à générer des recommandations d'action personnalisées",
          "options": {
            "sedentary": "Sédentaire (peu ou pas d'exercice)",
            "light": "Léger (1–3 jours/semaine)",
            "moderate": "Modéré (3–5 jours/semaine)",
            "active": "Actif (6–7 jours/semaine)",
            "veryActive": "Très Actif (exercice intense quotidien)"
          }
        }
      },
      "inputGroups": {},
      "results": {
        "whtr": {
          "label": "Ratio Taille-Taille"
        },
        "category": {
          "label": "Catégorie de Silhouette"
        },
        "riskLevel": {
          "label": "Niveau de Risque Santé"
        },
        "targetWaist": {
          "label": "Tour de Taille Cible (Max Sain)"
        },
        "waistToLose": {
          "label": "Réduction de Taille Nécessaire"
        },
        "bmi": {
          "label": "Comparaison IMC"
        },
        "whr": {
          "label": "Ratio Taille-Hanches"
        },
        "yearsOfLifeLost": {
          "label": "Est. Années de Vie Perdues"
        }
      },
      "tooltips": {
        "whtr": "Tour de taille divisé par la taille — les valeurs supérieures à 0,5 indiquent un risque accru pour la santé",
        "category": "Classification spécifique au sexe basée sur votre valeur RTT",
        "riskLevel": "Ajusté selon votre âge — les seuils de risque évoluent avec le vieillissement",
        "targetWaist": "Tour de taille maximum sain basé sur votre taille (taille × 0,5)",
        "waistToLose": "Combien de tour de taille réduire pour atteindre la zone saine",
        "bmi": "Indice de masse corporelle calculé à partir de votre poids et taille pour comparaison",
        "whr": "Ratio taille-hanches — autre indicateur de distribution des graisses et de risque cardiovasculaire",
        "yearsOfLifeLost": "Réduction estimée de l'espérance de vie basée sur le RTT d'après les études de population"
      },
      "presets": {
        "athleticMale": {
          "label": "Homme Athlétique",
          "description": "Homme en forme, 28 ans, taille 81 cm, 1m78"
        },
        "averageFemale": {
          "label": "Femme Moyenne",
          "description": "Femme saine, 32 ans, taille 76 cm, 1m65"
        },
        "overweightRisk": {
          "label": "Risque Surpoids",
          "description": "Homme avec graisse abdominale, 45 ans, taille 102 cm"
        },
        "seniorHealthy": {
          "label": "Senior Sain",
          "description": "Senior actif, 65 ans, taille 86 cm, 1m73"
        }
      },
      "values": {
        "cm": "cm",
        "in": "po",
        "kg": "kg",
        "lbs": "lbs",
        "kg/m²": "kg/m²",
        "N/A": "N/D",
        "none": "aucune",
        "years": "années",
        "year": "année",
        "Abnormally Slim": "Anormalement Mince",
        "Extremely Slim": "Extrêmement Mince",
        "Slender & Healthy": "Svelte et Sain",
        "Healthy": "Sain",
        "Overweight": "Surpoids",
        "Extremely Overweight": "Surpoids Extrême",
        "Obese": "Obèse",
        "Underweight Risk": "Risque Poids Insuffisant",
        "Low Risk": "Risque Faible",
        "Moderate Risk": "Risque Modéré",
        "Increased Risk": "Risque Accru",
        "High Risk": "Risque Élevé",
        "Very High Risk": "Risque Très Élevé",
        "Underweight": "Poids Insuffisant",
        "Normal": "Normal",
        "Obese Class I": "Obésité Classe I",
        "Obese Class II": "Obésité Classe II",
        "Obese Class III": "Obésité Classe III",
        "Low": "Faible",
        "Moderate": "Modéré",
        "High": "Élevé",
        "Very High": "Très Élevé",
        "Already at target": "Déjà à l'objectif"
      },
      "formats": {
        "summary": "Votre ratio taille-taille est {whtr} ({category}). Niveau de risque : {riskLevel}. Votre tour de taille cible est {targetWaist}. {waistAction} IMC pour comparaison : {bmi}."
      },
      "infoCards": {
        "bodyMetrics": {
          "title": "📊 Vos Métriques Corporelles"
        },
        "actionPlan": {
          "title": "🎯 Plan d'Action"
        },
        "tips": {
          "title": "💡 Conseils de Mesure",
          "items": [
            "Mesurez la taille à mi-chemin entre votre côte la plus basse et l'os de la hanche, généralement juste au-dessus du nombril",
            "Utilisez un mètre-ruban non élastique à plat contre la peau nue — ne comprimez pas la peau",
            "Prenez la mesure à la fin d'une expiration normale, debout et détendu",
            "Mesurez au même moment de la journée pour un suivi cohérent — le matin avant de manger est idéal"
          ]
        },
        "healthActions": {
          "title": "🩺 Actions Santé par RTT",
          "items": [
            "RTT inférieur à 0,4 — Envisagez de prendre du poids sainement ; consultez un diététicien si vous êtes en sous-poids",
            "RTT 0,4–0,5 — Vous êtes dans la zone saine ; maintenez votre mode de vie actuel et revérifiez annuellement",
            "RTT 0,5–0,6 — Agissez : augmentez l'activité quotidienne, réduisez les glucides raffinés, et visez une réduction de 5% du tour de taille",
            "RTT supérieur à 0,6 — Consultez un médecin : risque cardiométabolique élevé nécessitant des conseils professionnels et un suivi"
          ]
        }
      },
      "referenceData": {},
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que le Ratio Taille-Taille ?",
          "content": "Le ratio taille-taille (RTT) est un outil de dépistage simple qui divise votre tour de taille par votre taille pour évaluer comment la graisse corporelle est distribuée autour de votre milieu. Contrairement à l'Indice de Masse Corporelle (IMC), qui ne considère que le poids par rapport à la taille, le RTT cible spécifiquement la graisse abdominale — le type le plus fortement lié aux maladies cardiaques, au diabète de type 2, aux AVC et à la mort prématurée. La règle générale approuvée par l'Institut National pour l'Excellence en Santé et Soins (NICE) du Royaume-Uni dans ses directives 2025 est simple : gardez votre tour de taille à moins de la moitié de votre taille. Un RTT inférieur à 0,5 est considéré comme sain pour les adultes de tous âges, sexes et ethnies. Les valeurs entre 0,5 et 0,6 indiquent un risque accru, tandis que les valeurs supérieures à 0,6 signalent le besoin d'une action immédiate. Plusieurs revues systématiques et méta-analyses dans 14 pays ont confirmé que le RTT surpasse l'IMC comme prédicteur du risque cardiovasculaire et métabolique, en faisant l'outil de dépistage de première ligne préféré recommandé par les autorités sanitaires mondiales."
        },
        "whyBetter": {
          "title": "Pourquoi le RTT est Plus Précis que l'IMC",
          "content": "L'IMC n'a jamais été conçu pour diagnostiquer l'obésité chez les individus — il a été créé dans les années 1830 pour les statistiques au niveau de la population. Son plus grand défaut est qu'il ne peut pas distinguer entre la masse musculaire et la masse graisseuse, ni tenir compte de l'endroit où la graisse est stockée dans le corps. Un athlète musclé et une personne sédentaire avec un excès de graisse abdominale peuvent avoir des scores IMC identiques malgré des profils de santé très différents. Le RTT résout cela en se concentrant spécifiquement sur la graisse abdominale (viscérale), qui entoure les organes vitaux et libère des substances inflammatoires qui alimentent les maladies métaboliques. Une recherche publiée dans Obesity Reviews (2012) a analysé plus de 300 000 adultes et a trouvé que le RTT était un prédicteur significativement meilleur des facteurs de risque cardiovasculaire que l'IMC ou le tour de taille seuls. Une étude marquante dans PLOS ONE a démontré que le RTT prédisait les années de vie perdues plus précisément que l'IMC, avec un risque augmentant dramatiquement au-dessus d'un ratio de 0,52. La Commission Lancet 2024 sur l'obésité et l'Association Européenne pour l'Étude de l'Obésité recommandent maintenant que l'obésité ne soit plus diagnostiquée avec l'IMC seul, et soit confirmée avec une mesure RTT."
        },
        "howToMeasure": {
          "title": "Comment Mesurer Correctement",
          "items": [
            {
              "text": "Tenez-vous debout et détendu — ne rentrez pas le ventre et ne retenez pas votre souffle pendant la mesure",
              "type": "info"
            },
            {
              "text": "Localisez le point de mesure à mi-chemin entre votre côte palpable la plus basse et le haut de votre crête iliaque (os de la hanche) — c'est généralement juste au-dessus du nombril",
              "type": "info"
            },
            {
              "text": "Enroulez un mètre-ruban flexible et non élastique horizontalement autour de votre taille à ce point, en le gardant serré mais sans comprimer la peau",
              "type": "info"
            },
            {
              "text": "Lisez la mesure à la fin d'une expiration normale — n'inspirez pas profondément avant de lire",
              "type": "info"
            },
            {
              "text": "Prenez deux mesures et utilisez la moyenne — si elles diffèrent de plus de 1 cm, prenez une troisième mesure",
              "type": "warning"
            },
            {
              "text": "Mesurez sur peau nue ou vêtements légers — les vêtements épais peuvent ajouter 1–2 cm d'erreur à votre lecture",
              "type": "warning"
            }
          ]
        },
        "riskFactors": {
          "title": "Risques Santé d'un RTT Élevé",
          "items": [
            {
              "text": "Maladie cardiovasculaire — RTT supérieur à 0,5 est associé à un risque significativement accru de crise cardiaque et AVC, indépendamment de l'IMC",
              "type": "warning"
            },
            {
              "text": "Diabète de type 2 — la graisse abdominale altère directement la sensibilité à l'insuline, et le RTT est un prédicteur plus fort du risque de diabète que l'IMC dans la plupart des populations",
              "type": "warning"
            },
            {
              "text": "Hypertension — l'obésité centrale augmente la pression artérielle par une rigidité artérielle accrue et une perturbation hormonale",
              "type": "warning"
            },
            {
              "text": "Syndrome métabolique — un groupe de conditions (glycémie élevée, cholestérol anormal, triglycérides élevés) qui multiplient le risque cardiovasculaire",
              "type": "info"
            },
            {
              "text": "Espérance de vie réduite — la recherche montre que les années de vie perdues augmentent dramatiquement au-dessus de RTT 0,52, avec hommes et femmes à RTT 0,6+ perdant environ 7+ années",
              "type": "warning"
            },
            {
              "text": "Stéatose hépatique et certains cancers (côlon, sein) sont aussi associés à un ratio taille-taille élevé indépendamment du poids corporel total",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul",
          "description": "Calculs RTT étape par étape pour différents scénarios",
          "examples": [
            {
              "title": "Homme Adulte Sain",
              "steps": [
                "Taille : 1m78 (178 cm)",
                "Tour de taille : 84 cm",
                "RTT = 84 ÷ 178 = 0,471",
                "Catégorie : Sain (homme 0,46–0,53)",
                "Taille cible : 178 × 0,5 = 89 cm max",
                "Statut : ✅ Sous la cible — risque faible"
              ],
              "result": "RTT : 0,47 — Risque Faible, Aucune Action Nécessaire"
            },
            {
              "title": "Femme à Risque, Âge 50",
              "steps": [
                "Taille : 1m63 (163 cm)",
                "Tour de taille : 91 cm",
                "RTT = 91 ÷ 163 = 0,563",
                "Catégorie : Surpoids (femme 0,49–0,54 → dépasse)",
                "Taille cible : 163 × 0,5 = 81,5 cm max",
                "Taille à perdre : 91 - 81,5 = 9,5 cm"
              ],
              "result": "RTT : 0,56 — Risque Accru, Réduire 9,5 cm"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qu'est-ce qu'un ratio taille-taille sain ?",
          "answer": "Un RTT inférieur à 0,5 est considéré comme sain pour les adultes de tous âges et sexes. Cela signifie que votre tour de taille devrait être inférieur à la moitié de votre taille. Par exemple, si vous mesurez 170 cm, votre taille devrait être sous 85 cm. Les directives NICE 2025 classifient RTT 0,4–0,5 comme sain, 0,5–0,6 comme risque accru nécessitant une action, et au-dessus de 0,6 comme risque élevé."
        },
        {
          "question": "Le ratio taille-taille est-il meilleur que l'IMC ?",
          "answer": "Oui, plusieurs méta-analyses ont montré que le RTT est un prédicteur supérieur du risque de maladie cardiovasculaire, de diabète et de mortalité comparé à l'IMC. L'avantage clé est que le RTT mesure spécifiquement la distribution de graisse abdominale, tandis que l'IMC ne peut pas distinguer entre muscle et graisse. La Commission Lancet 2024 et les directives européennes sur l'obésité recommandent maintenant le RTT aux côtés de l'IMC plutôt que de se fier à l'IMC seul."
        },
        {
          "question": "Où exactement dois-je mesurer ma taille ?",
          "answer": "Selon le protocole OMS, mesurez au point médian entre votre côte palpable la plus basse et le haut de votre crête iliaque (os de la hanche). En pratique, c'est généralement juste au-dessus du nombril. Utilisez un mètre-ruban non élastique, gardez-le horizontal, mesurez sur peau nue, et lisez à la fin d'une expiration normale. Prenez deux mesures et faites la moyenne."
        },
        {
          "question": "Les catégories de risque diffèrent-elles selon le sexe ?",
          "answer": "Oui. Bien que le seuil universel de 0,5 s'applique à tous, les catégories détaillées diffèrent. Pour les hommes, un RTT de 0,46–0,53 est considéré comme sain, tandis que pour les femmes la plage saine est 0,46–0,49. Les femmes entrent dans la catégorie surpoids à un RTT plus bas (0,49) comparé aux hommes (0,53), reflétant les différences dans les modèles de distribution des graisses entre les sexes."
        },
        {
          "question": "L'âge affecte-t-il mon risque de ratio taille-taille ?",
          "answer": "Le seuil de 0,5 est universel, mais la recherche suggère qu'un ajustement selon l'âge est raisonnable. Sous 40 ans, la limite stricte de 0,5 s'applique. Entre 40 et 50 ans, les valeurs jusqu'à 0,55 peuvent porter un risque modéré plutôt qu'élevé. Au-dessus de 50 ans, les changements naturels liés à l'âge signifient que les valeurs jusqu'à 0,58 peuvent représenter un risque modéré. Cependant, un RTT supérieur à 0,6 à tout âge indique une préoccupation sanitaire significative."
        },
        {
          "question": "Qu'est-ce que le ratio taille-hanches et en quoi diffère-t-il ?",
          "answer": "Le ratio taille-hanches (RTH) divise votre tour de taille par votre tour de hanches. Il mesure la distribution des graisses entre votre abdomen et vos hanches. Un RTH supérieur à 0,90 pour les hommes ou 0,85 pour les femmes indique une obésité abdominale. Bien que RTT et RTH évaluent tous deux la graisse centrale, le RTT est considéré comme plus simple et également prédictif car il ne nécessite qu'une mesure (taille) plus la hauteur, que la plupart des gens connaissent déjà."
        },
        {
          "question": "Puis-je améliorer mon ratio taille-taille ?",
          "answer": "Oui. Réduire le tour de taille par une combinaison de déficit calorique, d'exercice aérobique régulier (surtout d'intensité modérée comme la marche rapide), et d'entraînement en force est efficace. Vous ne pouvez pas réduire localement la graisse abdominale, mais la perte de graisse globale tend à réduire la graisse viscérale de manière préférentielle. Même une réduction de 5% du tour de taille peut améliorer significativement les marqueurs cardiométaboliques."
        },
        {
          "question": "Quelle est la précision de l'estimation des années de vie perdues ?",
          "answer": "L'estimation est basée sur des données au niveau de la population de l'Enquête Santé et Mode de Vie (HALS) et l'Enquête Santé pour l'Angleterre, publiées dans PLOS ONE. Elle représente des moyennes statistiques à travers de grandes populations — les résultats individuels varient significativement selon la génétique, le mode de vie, l'alimentation et d'autres facteurs de santé. Elle devrait être vue comme un indicateur motivationnel plutôt qu'une prédiction personnelle précise."
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
      "name": "Taille-zu-Größe-Verhältnis Rechner",
      "slug": "taille-zu-groesse-verhaeltnis-rechner",
      "subtitle": "Bewerten Sie Ihr kardiometabolisches Risiko mit einer genaueren Metrik als BMI — plus erhalten Sie Ihre Ziel-Taille, BMI-Vergleich und personalisierten Aktionsplan",
      "breadcrumb": "Taille-zu-Größe-Verhältnis",
      "seo": {
        "title": "Taille-zu-Größe-Verhältnis Rechner — WHtR Risiko & Ziel-Taille",
        "description": "Berechnen Sie Ihr Taille-zu-Größe-Verhältnis mit geschlechts- und altersspezifischen Risikokategorien, BMI-Vergleich, Ziel-Taille und geschätzten verlorenen Lebensjahren. Basiert auf NICE 2025 Richtlinien.",
        "shortDescription": "Bewerten Sie das kardiometabolische Risiko genauer als nur mit BMI",
        "keywords": [
          "taille zu größe verhältnis rechner",
          "WHtR rechner",
          "taille größe verhältnis",
          "kardiometabolische risikobewertung",
          "abdominale adipositas rechner",
          "zentrale adipositas screening",
          "taillenumfang gesundheitsrisiko",
          "NICE taille zu größe"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "gender": {
          "label": "Geschlecht",
          "helpText": "WHtR-Risikogrenzen unterscheiden sich zwischen Männern und Frauen",
          "options": {
            "male": "Männlich",
            "female": "Weiblich"
          }
        },
        "age": {
          "label": "Alter",
          "helpText": "Risikoschwellen verschieben sich mit dem Alter (unter 40, 40–50, über 50)"
        },
        "activityLevel": {
          "label": "Aktivitätsniveau",
          "helpText": "Hilft bei der Erstellung personalisierter Handlungsempfehlungen",
          "options": {
            "sedentary": "Sitzend (wenig bis keine Bewegung)",
            "light": "Leicht (1–3 Tage/Woche)",
            "moderate": "Mäßig (3–5 Tage/Woche)",
            "active": "Aktiv (6–7 Tage/Woche)",
            "veryActive": "Sehr aktiv (intensive tägliche Bewegung)"
          }
        }
      },
      "inputGroups": {},
      "results": {
        "whtr": {
          "label": "Taille-zu-Größe-Verhältnis"
        },
        "category": {
          "label": "Körperform-Kategorie"
        },
        "riskLevel": {
          "label": "Gesundheitsrisiko-Stufe"
        },
        "targetWaist": {
          "label": "Ziel-Taille (Gesunder Maximalwert)"
        },
        "waistToLose": {
          "label": "Erforderliche Taillenreduktion"
        },
        "bmi": {
          "label": "BMI-Vergleich"
        },
        "whr": {
          "label": "Taille-zu-Hüfte-Verhältnis"
        },
        "yearsOfLifeLost": {
          "label": "Geschätzte verlorene Lebensjahre"
        }
      },
      "tooltips": {
        "whtr": "Taillenumfang geteilt durch Körpergröße — Werte über 0,5 deuten auf erhöhtes Gesundheitsrisiko hin",
        "category": "Geschlechtsspezifische Klassifizierung basierend auf Ihrem WHtR-Wert",
        "riskLevel": "Angepasst an Ihr Alter — Risikoschwellen verschieben sich mit dem Altern",
        "targetWaist": "Maximaler gesunder Taillenumfang basierend auf Ihrer Größe (Größe × 0,5)",
        "waistToLose": "Um wie viel der Taillenumfang reduziert werden muss, um die gesunde Zone zu erreichen",
        "bmi": "Body Mass Index berechnet aus Ihrem Gewicht und Ihrer Größe zum Vergleich",
        "whr": "Taille-zu-Hüfte-Verhältnis — ein weiterer Indikator für Fettverteilung und Herz-Kreislauf-Risiko",
        "yearsOfLifeLost": "Geschätzte Reduktion der Lebenserwartung basierend auf WHtR aus Bevölkerungsstudien"
      },
      "presets": {
        "athleticMale": {
          "label": "Athletischer Mann",
          "description": "Fitter Mann, 28 Jahre, 81 cm Taille, 1,78 m"
        },
        "averageFemale": {
          "label": "Durchschnittliche Frau",
          "description": "Gesunde Frau, 32 Jahre, 76 cm Taille, 1,65 m"
        },
        "overweightRisk": {
          "label": "Übergewichtsrisiko",
          "description": "Mann mit Bauchfett, 45 Jahre, 102 cm Taille"
        },
        "seniorHealthy": {
          "label": "Gesunder Senior",
          "description": "Aktiver Senior, 65 Jahre, 86 cm Taille, 1,73 m"
        }
      },
      "values": {
        "cm": "cm",
        "in": "Zoll",
        "kg": "kg",
        "lbs": "Pfund",
        "kg/m²": "kg/m²",
        "N/A": "N/V",
        "none": "keine",
        "years": "Jahre",
        "year": "Jahr",
        "Abnormally Slim": "Abnorm schlank",
        "Extremely Slim": "Extrem schlank",
        "Slender & Healthy": "Schlank & gesund",
        "Healthy": "Gesund",
        "Overweight": "Übergewichtig",
        "Extremely Overweight": "Stark übergewichtig",
        "Obese": "Adipös",
        "Underweight Risk": "Untergewichtsrisiko",
        "Low Risk": "Niedriges Risiko",
        "Moderate Risk": "Mäßiges Risiko",
        "Increased Risk": "Erhöhtes Risiko",
        "High Risk": "Hohes Risiko",
        "Very High Risk": "Sehr hohes Risiko",
        "Underweight": "Untergewicht",
        "Normal": "Normal",
        "Obese Class I": "Adipositas Grad I",
        "Obese Class II": "Adipositas Grad II",
        "Obese Class III": "Adipositas Grad III",
        "Low": "Niedrig",
        "Moderate": "Mäßig",
        "High": "Hoch",
        "Very High": "Sehr hoch",
        "Already at target": "Bereits am Ziel"
      },
      "formats": {
        "summary": "Ihr Taille-zu-Größe-Verhältnis beträgt {whtr} ({category}). Risikostufe: {riskLevel}. Ihre Ziel-Taille ist {targetWaist}. {waistAction} BMI zum Vergleich: {bmi}."
      },
      "infoCards": {
        "bodyMetrics": {
          "title": "📊 Ihre Körpermaße"
        },
        "actionPlan": {
          "title": "🎯 Aktionsplan"
        },
        "tips": {
          "title": "💡 Messtipps",
          "items": [
            "Messen Sie die Taille auf halbem Weg zwischen Ihrer untersten Rippe und dem Hüftknochen, normalerweise knapp über dem Bauchnabel",
            "Verwenden Sie ein nicht dehnbares Maßband flach auf der nackten Haut — drücken Sie die Haut nicht zusammen",
            "Nehmen Sie die Messung am Ende einer normalen Ausatmung vor, stehen Sie aufrecht und entspannt",
            "Messen Sie zur gleichen Tageszeit für konsistente Verfolgung — morgens vor dem Essen ist ideal"
          ]
        },
        "healthActions": {
          "title": "🩺 Gesundheitsmaßnahmen nach WHtR",
          "items": [
            "WHtR unter 0,4 — Erwägen Sie eine gesunde Gewichtszunahme; konsultieren Sie einen Ernährungsberater bei Untergewicht",
            "WHtR 0,4–0,5 — Sie sind in der gesunden Zone; behalten Sie Ihren aktuellen Lebensstil bei und überprüfen Sie jährlich",
            "WHtR 0,5–0,6 — Handeln Sie: erhöhen Sie die tägliche Aktivität, reduzieren Sie raffinierte Kohlenhydrate und streben Sie 5% Taillenreduktion an",
            "WHtR über 0,6 — Suchen Sie medizinischen Rat: hohes kardiometabolisches Risiko erfordert professionelle Beratung und Überwachung"
          ]
        }
      },
      "referenceData": {},
      "education": {
        "whatIs": {
          "title": "Was ist das Taille-zu-Größe-Verhältnis?",
          "content": "Das Taille-zu-Größe-Verhältnis (WHtR) ist ein einfaches Screening-Tool, das Ihren Taillenumfang durch Ihre Körpergröße teilt, um zu bewerten, wie Körperfett um Ihre Körpermitte verteilt ist. Anders als der Body Mass Index (BMI), der nur das Gewicht im Verhältnis zur Größe berücksichtigt, zielt WHtR speziell auf Bauchfett ab — die Art, die am stärksten mit Herzerkrankungen, Typ-2-Diabetes, Schlaganfall und vorzeitigem Tod verbunden ist. Die allgemeine Regel, die vom britischen National Institute for Health and Care Excellence (NICE) in ihren 2025 Richtlinien befürwortet wird, ist einfach: halten Sie Ihren Taillenumfang unter der Hälfte Ihrer Körpergröße. Ein WHtR unter 0,5 gilt als gesund für Erwachsene aller Altersgruppen, Geschlechter und Ethnien. Werte zwischen 0,5 und 0,6 zeigen erhöhtes Risiko an, während Werte über 0,6 sofortiges Handeln erfordern. Mehrere systematische Übersichtsarbeiten und Meta-Analysen in 14 Ländern haben bestätigt, dass WHtR den BMI als Prädiktor für kardiovaskuläres und metabolisches Risiko übertrifft und es zum bevorzugten Erstlinien-Screening-Tool macht, das von führenden Gesundheitsbehörden weltweit empfohlen wird."
        },
        "whyBetter": {
          "title": "Warum WHtR genauer ist als BMI",
          "content": "BMI wurde nie dafür entwickelt, Adipositas bei Individuen zu diagnostizieren — es wurde in den 1830er Jahren für Statistiken auf Bevölkerungsebene erstellt. Sein größter Fehler ist, dass es nicht zwischen Muskelmasse und Fettmasse unterscheiden kann, noch berücksichtigt es, wo Fett im Körper gespeichert wird. Ein muskulöser Athlet und eine sitzende Person mit überschüssigem Bauchfett können identische BMI-Werte haben, trotz völlig unterschiedlicher Gesundheitsprofile. WHtR löst dies, indem es sich speziell auf abdominales (viszerales) Fett konzentriert, das lebenswichtige Organe umgibt und entzündliche Substanzen freisetzt, die Stoffwechselerkrankungen antreiben. Forschung, die in Obesity Reviews (2012) veröffentlicht wurde, analysierte über 300.000 Erwachsene und fand heraus, dass WHtR ein signifikant besserer Prädiktor für kardiovaskuläre Risikofaktoren war als entweder BMI oder Taillenumfang allein. Eine wegweisende Studie in PLOS ONE zeigte, dass WHtR verlorene Lebensjahre genauer vorhersagte als BMI, wobei das Risiko dramatisch über einem Verhältnis von 0,52 anstieg. Die 2024 Lancet-Kommission für Adipositas und die Europäische Vereinigung für das Studium der Adipositas empfehlen nun, dass Adipositas nicht länger allein mit BMI diagnostiziert werden sollte und mit WHtR-Messung bestätigt werden sollte."
        },
        "howToMeasure": {
          "title": "Wie man korrekt misst",
          "items": [
            {
              "text": "Stehen Sie aufrecht und entspannt — ziehen Sie Ihren Bauch nicht ein und halten Sie nicht den Atem während der Messung an",
              "type": "info"
            },
            {
              "text": "Lokalisieren Sie den Messpunkt auf halbem Weg zwischen Ihrer untersten tastbaren Rippe und der Oberseite Ihres Beckenkamms (Hüftknochen) — das ist normalerweise knapp über dem Nabel",
              "type": "info"
            },
            {
              "text": "Legen Sie ein flexibles, nicht dehnbares Maßband horizontal um Ihre Taille an diesem Punkt, halten Sie es eng, aber drücken Sie die Haut nicht zusammen",
              "type": "info"
            },
            {
              "text": "Lesen Sie die Messung am Ende einer normalen Ausatmung ab — atmen Sie nicht tief ein vor dem Ablesen",
              "type": "info"
            },
            {
              "text": "Nehmen Sie zwei Messungen vor und verwenden Sie den Durchschnitt — wenn sie sich um mehr als 1 cm unterscheiden, nehmen Sie eine dritte Messung vor",
              "type": "warning"
            },
            {
              "text": "Messen Sie auf nackter Haut oder leichter Kleidung — dicke Kleidung kann 1–2 cm Fehler zu Ihrer Messung hinzufügen",
              "type": "warning"
            }
          ]
        },
        "riskFactors": {
          "title": "Gesundheitsrisiken bei hohem WHtR",
          "items": [
            {
              "text": "Herz-Kreislauf-Erkrankungen — WHtR über 0,5 ist mit signifikant erhöhtem Risiko für Herzinfarkt und Schlaganfall verbunden, unabhängig vom BMI",
              "type": "warning"
            },
            {
              "text": "Typ-2-Diabetes — Bauchfett beeinträchtigt direkt die Insulinsensitivität, und WHtR ist ein stärkerer Prädiktor für Diabetesrisiko als BMI in den meisten Populationen",
              "type": "warning"
            },
            {
              "text": "Bluthochdruck — zentrale Adipositas erhöht den Blutdruck durch erhöhte arterielle Steifigkeit und hormonelle Störung",
              "type": "warning"
            },
            {
              "text": "Metabolisches Syndrom — ein Cluster von Zuständen (hoher Blutzucker, abnorme Cholesterinwerte, erhöhte Triglyceride), die das kardiovaskuläre Risiko multiplizieren",
              "type": "info"
            },
            {
              "text": "Reduzierte Lebenserwartung — Forschung zeigt, dass verlorene Lebensjahre über WHtR 0,52 dramatisch ansteigen, wobei Männer und Frauen bei WHtR 0,6+ geschätzte 7+ Jahre verlieren",
              "type": "warning"
            },
            {
              "text": "Fettlebererkrankung und bestimmte Krebsarten (Dickdarm, Brust) sind ebenfalls mit erhöhtem Taille-zu-Größe-Verhältnis unabhängig vom Gesamtkörpergewicht verbunden",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Berechnungsbeispiele",
          "description": "Schritt-für-Schritt WHtR-Berechnungen für verschiedene Szenarien",
          "examples": [
            {
              "title": "Gesunder erwachsener Mann",
              "steps": [
                "Größe: 1,78 m = 178 cm",
                "Taillenumfang: 84 cm",
                "WHtR = 84 ÷ 178 = 0,471",
                "Kategorie: Gesund (männlich 0,46–0,53)",
                "Ziel-Taille: 178 × 0,5 = 89 cm max",
                "Status: ✅ Unter dem Ziel — niedriges Risiko"
              ],
              "result": "WHtR: 0,47 — Niedriges Risiko, keine Maßnahmen erforderlich"
            },
            {
              "title": "Gefährdete Frau, 50 Jahre",
              "steps": [
                "Größe: 1,63 m = 163 cm",
                "Taillenumfang: 91 cm",
                "WHtR = 91 ÷ 163 = 0,563",
                "Kategorie: Übergewichtig (weiblich 0,49–0,54 → überschreitet)",
                "Ziel-Taille: 163 × 0,5 = 81,5 cm max",
                "Zu verlierender Taillenumfang: 91 - 81,5 = 9,5 cm"
              ],
              "result": "WHtR: 0,56 — Erhöhtes Risiko, 9,5 cm reduzieren"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Was ist ein gesundes Taille-zu-Größe-Verhältnis?",
          "answer": "Ein WHtR unter 0,5 gilt als gesund für Erwachsene aller Altersgruppen und Geschlechter. Das bedeutet, Ihr Taillenumfang sollte weniger als die Hälfte Ihrer Körpergröße betragen. Zum Beispiel, wenn Sie 170 cm groß sind, sollte Ihre Taille unter 85 cm liegen. Die NICE 2025 Richtlinien klassifizieren WHtR 0,4–0,5 als gesund, 0,5–0,6 als erhöhtes Risiko, das Handeln erfordert, und über 0,6 als hohes Risiko."
        },
        {
          "question": "Ist das Taille-zu-Größe-Verhältnis besser als BMI?",
          "answer": "Ja, mehrere Meta-Analysen haben gezeigt, dass WHtR ein überlegener Prädiktor für Herz-Kreislauf-Erkrankungen, Diabetes und Sterblichkeitsrisiko im Vergleich zu BMI ist. Der Hauptvorteil ist, dass WHtR speziell die abdominale Fettverteilung misst, während BMI nicht zwischen Muskel und Fett unterscheiden kann. Die 2024 Lancet-Kommission und europäische Adipositas-Richtlinien empfehlen nun WHtR neben BMI anstatt sich nur auf BMI zu verlassen."
        },
        {
          "question": "Wo genau sollte ich meine Taille messen?",
          "answer": "Gemäß WHO-Protokoll messen Sie am Mittelpunkt zwischen Ihrer untersten tastbaren Rippe und der Oberseite Ihres Beckenkamms (Hüftknochen). In der Praxis ist das normalerweise knapp über dem Nabel oder Bauchnabel. Verwenden Sie ein nicht dehnbares Maßband, halten Sie es horizontal, messen Sie auf nackter Haut und lesen Sie am Ende einer normalen Ausatmung ab. Nehmen Sie zwei Messungen vor und bilden Sie den Durchschnitt."
        },
        {
          "question": "Unterscheiden sich die Risikokategorien nach Geschlecht?",
          "answer": "Ja. Während der universelle 0,5-Grenzwert für alle gilt, unterscheiden sich detaillierte Kategorien. Für Männer gilt ein WHtR von 0,46–0,53 als gesund, während für Frauen der gesunde Bereich 0,46–0,49 ist. Frauen treten bei einem niedrigeren WHtR (0,49) in die Übergewichtskategorie ein im Vergleich zu Männern (0,53), was Unterschiede in Fettverteilungsmustern zwischen den Geschlechtern widerspiegelt."
        },
        {
          "question": "Beeinflusst das Alter mein Taille-zu-Größe-Verhältnis-Risiko?",
          "answer": "Der 0,5-Grenzwert ist universal, aber Forschung legt nahe, dass einige Altersanpassungen vernünftig sind. Unter 40 Jahren gilt die strenge 0,5-Grenze. Zwischen 40 und 50 können Werte bis zu 0,55 mäßiges statt hohes Risiko darstellen. Über 50 bedeuten natürliche altersbedingte Veränderungen, dass Werte bis zu 0,58 mäßiges Risiko darstellen können. Ein WHtR über 0,6 zeigt jedoch in jedem Alter erhebliche Gesundheitsbedenken an."
        },
        {
          "question": "Was ist das Taille-zu-Hüfte-Verhältnis und wie unterscheidet es sich?",
          "answer": "Das Taille-zu-Hüfte-Verhältnis (WHR) teilt Ihren Taillenumfang durch Ihren Hüftumfang. Es misst die Fettverteilung zwischen Ihrem Bauch und Ihren Hüften. Ein WHR über 0,90 für Männer oder 0,85 für Frauen zeigt abdominale Adipositas an. Während sowohl WHtR als auch WHR zentrales Fett bewerten, gilt WHtR als einfacher und gleich vorhersagend, da es nur eine Messung (Taille) plus Größe erfordert, die die meisten Menschen bereits kennen."
        },
        {
          "question": "Kann ich mein Taille-zu-Größe-Verhältnis verbessern?",
          "answer": "Ja. Die Reduzierung des Taillenumfangs durch eine Kombination aus Kaloriendefizit, regelmäßiger aerober Bewegung (besonders mäßig intensiv wie zügiges Gehen) und Krafttraining ist wirksam. Sie können Bauchfett nicht gezielt reduzieren, aber Gesamtfettverlust neigt dazu, viszerales Fett bevorzugt zu reduzieren. Sogar eine 5%ige Reduzierung des Taillenumfangs kann kardiometabolische Marker bedeutsam verbessern."
        },
        {
          "question": "Wie genau ist die Schätzung der verlorenen Lebensjahre?",
          "answer": "Die Schätzung basiert auf Daten auf Bevölkerungsebene aus der Health and Lifestyle Survey (HALS) und Health Survey for England, veröffentlicht in PLOS ONE. Sie repräsentiert statistische Durchschnitte über große Populationen — individuelle Ergebnisse variieren erheblich basierend auf Genetik, Lebensstil, Ernährung und anderen Gesundheitsfaktoren. Sie sollte als motivierender Indikator und nicht als präzise persönliche Vorhersage betrachtet werden."
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
      min: 5,
      max: 100,
      step: 1,
    },

    // ── WAIST ─────────────────────────────────────────────────────
        {
      id: "waist",
      type: "number",
      defaultValue: null,
      placeholder: "34",
      step: 0.5,
      unitType: "body_length",
      syncGroup: false,
      defaultUnit: "in",
      allowedUnits: ["cm", "in"],
    },    
    // ── HEIGHT ────────────────────────────────────────────────────
            
    // ── WEIGHT (for BMI comparison) ───────────────────────────────
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
    },
    {
      id: "height",
      type: "number",
      defaultValue: null,
      placeholder: "178",
      step: 1,
      unitType: "height",
      syncGroup: false,
      defaultUnit: "ft_in",
      allowedUnits: ["cm", "m", "in", "ft_in"],
    },    
    // ── HIP (optional, for WHR) ───────────────────────────────────
        {
      id: "hip",
      type: "number",
      defaultValue: null,
      placeholder: "38",
      step: 0.5,
      unitType: "body_length",
      syncGroup: false,
      defaultUnit: "in",
      allowedUnits: ["cm", "in"],
    },    
    // ── ACTIVITY LEVEL ────────────────────────────────────────────
    {
      id: "activityLevel",
      type: "select",
      defaultValue: "moderate",
      options: [
        { value: "sedentary" },
        { value: "light" },
        { value: "moderate" },
        { value: "active" },
        { value: "veryActive" },
      ],
    },
  ],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════════
  results: [
    { id: "whtr", type: "primary", format: "number" },
    { id: "category", type: "secondary", format: "text" },
    { id: "riskLevel", type: "secondary", format: "text" },
    { id: "targetWaist", type: "secondary", format: "number" },
    { id: "waistToLose", type: "secondary", format: "number" },
    { id: "bmi", type: "secondary", format: "number" },
    { id: "whr", type: "secondary", format: "number" },
    { id: "yearsOfLifeLost", type: "secondary", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // INFO CARDS (2 list + 1 horizontal)
  // ═══════════════════════════════════════════════════════════════════
  infoCards: [
    {
      id: "bodyMetrics",
      type: "list",
      icon: "📊",
      items: [
        { label: "WHtR Ratio", valueKey: "whtr" },
        { label: "Category", valueKey: "category" },
        { label: "Risk Level", valueKey: "riskLevel" },
        { label: "BMI", valueKey: "bmi" },
      ],
    },
    {
      id: "actionPlan",
      type: "list",
      icon: "🎯",
      items: [
        { label: "Target Waist", valueKey: "targetWaist" },
        { label: "Waist Reduction", valueKey: "waistToLose" },
        { label: "Est. Years of Life Lost", valueKey: "yearsOfLifeLost" },
        { label: "Waist-to-Hip Ratio", valueKey: "whr" },
      ],
    },
    {
      id: "tips",
      type: "horizontal",
      icon: "💡",
      itemCount: 4,
    },
    {
      id: "healthActions",
      type: "horizontal",
      icon: "🩺",
      itemCount: 4,
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // REFERENCE DATA (empty per V4 rules)
  // ═══════════════════════════════════════════════════════════════════
  referenceData: [],

  // ═══════════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS (2 prose + 2 list + 1 code-example)
  // ═══════════════════════════════════════════════════════════════════
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "whyBetter", type: "prose", icon: "⚖️" },
    { id: "howToMeasure", type: "list", icon: "📐", itemCount: 6 },
    { id: "riskFactors", type: "list", icon: "⚠️", itemCount: 6 },
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
      authors: "Ashwell M, Gunn P, Gibson S",
      year: "2012",
      title: "Waist-to-height ratio is a better screening tool than waist circumference and BMI for adult cardiometabolic risk factors: systematic review and meta-analysis",
      source: "Obesity Reviews, 13(3), 275-286",
      url: "https://onlinelibrary.wiley.com/doi/10.1111/j.1467-789X.2011.00952.x",
    },
    {
      authors: "Ashwell M, Mayhew L, Richardson J, Rickayzen B",
      year: "2014",
      title: "Waist-to-height ratio is more predictive of years of life lost than body mass index",
      source: "PLOS ONE, 9(9), e103483",
      url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0103483",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // ADDITIONAL CONFIG
  // ═══════════════════════════════════════════════════════════════════
  hero: {
    badge: "Health",
    rating: { average: 4.9, count: 2800 },
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
    "bmi-calculator",
    "body-fat-calculator",
    "calorie-calculator",
    "ideal-weight-calculator",
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
export function calculateWaistToHeightRatio(data: {
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
  const activityLevel = values.activityLevel as string;

  // ── Validate required fields ──────────────────────────────────────
  if (!gender || !age) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Read unitType fields ──────────────────────────────────────────
  const waistRaw = values.waist as number | null;
  const heightRaw = values.height as number | null;
  const weightRaw = values.weight as number | null;
  const hipRaw = values.hip as number | null;

  const waistUnit = fieldUnits.waist || "in";
  const heightUnit = fieldUnits.height || "ft_in";
  const weightUnit = fieldUnits.weight || "lbs";
  const hipUnit = fieldUnits.hip || "in";

  if (!waistRaw || !heightRaw) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Convert to base units using Unit Engine (cm, kg) ──────────────
  const waistCm = convertToBase(waistRaw, waistUnit, "body_length");
  const heightCm = heightUnit === "ft_in"
    ? heightRaw  // Already in cm (base unit from DualNumberInput)
    : convertToBase(heightRaw, heightUnit, "height");
  const weightKg = weightRaw
    ? convertToBase(weightRaw, weightUnit, "weight")
    : null;
  const hipCm = hipRaw
    ? convertToBase(hipRaw, hipUnit, "body_length")
    : null;

  if (!waistCm || !heightCm || waistCm <= 0 || heightCm <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Calculate WHtR ────────────────────────────────────────────────
  const whtr = waistCm / heightCm;
  const whtrRounded = Math.round(whtr * 1000) / 1000;

  // ── Gender-specific body shape category ───────────────────────────
  function getCategory(ratio: number, sex: string): string {
    if (sex === "male") {
      if (ratio < 0.35) return "Abnormally Slim";
      if (ratio < 0.43) return "Extremely Slim";
      if (ratio < 0.46) return "Slender & Healthy";
      if (ratio < 0.53) return "Healthy";
      if (ratio < 0.58) return "Overweight";
      if (ratio < 0.63) return "Extremely Overweight";
      return "Obese";
    } else {
      if (ratio < 0.35) return "Abnormally Slim";
      if (ratio < 0.42) return "Extremely Slim";
      if (ratio < 0.46) return "Slender & Healthy";
      if (ratio < 0.49) return "Healthy";
      if (ratio < 0.54) return "Overweight";
      if (ratio < 0.58) return "Extremely Overweight";
      return "Obese";
    }
  }

  const categoryRaw = getCategory(whtr, gender);
  const category = v[categoryRaw] || categoryRaw;

  // ── Age-adjusted risk level ───────────────────────────────────────
  function getRiskLevel(ratio: number, userAge: number): string {
    if (ratio < 0.4) return "Underweight Risk";

    if (userAge < 40) {
      if (ratio < 0.5) return "Low Risk";
      if (ratio < 0.55) return "Increased Risk";
      if (ratio < 0.6) return "High Risk";
      return "Very High Risk";
    } else if (userAge <= 50) {
      if (ratio < 0.5) return "Low Risk";
      if (ratio < 0.55) return "Moderate Risk";
      if (ratio < 0.6) return "Increased Risk";
      if (ratio < 0.65) return "High Risk";
      return "Very High Risk";
    } else {
      // Over 50 — slightly relaxed thresholds
      if (ratio < 0.5) return "Low Risk";
      if (ratio < 0.55) return "Low Risk";
      if (ratio < 0.6) return "Moderate Risk";
      if (ratio < 0.65) return "Increased Risk";
      return "High Risk";
    }
  }

  const riskRaw = getRiskLevel(whtr, age);
  const riskLevel = v[riskRaw] || riskRaw;

  // ── Target waist (height × 0.5) ──────────────────────────────────
  const targetWaistCm = heightCm * 0.5;
  const waistToLoseCm = Math.max(0, waistCm - targetWaistCm);

  // Convert to display units using fieldUnits
  let targetWaistDisplay: string;
  let waistToLoseDisplay: string;
  const waistDisplayUnit = waistUnit === "cm" ? (v["cm"] || "cm") : (v["in"] || "in");

  if (waistUnit === "cm") {
    targetWaistDisplay = `${Math.round(targetWaistCm * 10) / 10} ${waistDisplayUnit}`;
    waistToLoseDisplay = waistToLoseCm > 0
      ? `${Math.round(waistToLoseCm * 10) / 10} ${waistDisplayUnit}`
      : (v["Already at target"] || "Already at target");
  } else {
    const targetIn = convertFromBase(targetWaistCm, "in", "body_length");
    const toLoseIn = convertFromBase(waistToLoseCm, "in", "body_length");
    targetWaistDisplay = `${Math.round(targetIn * 10) / 10} ${waistDisplayUnit}`;
    waistToLoseDisplay = toLoseIn > 0
      ? `${Math.round(toLoseIn * 10) / 10} ${waistDisplayUnit}`
      : (v["Already at target"] || "Already at target");
  }

  // ── BMI comparison ────────────────────────────────────────────────
  let bmiValue: number | null = null;
  let bmiCategoryRaw = "";
  let bmiDisplay = v["N/A"] || "N/A";

  if (weightKg && weightKg > 0) {
    const heightM = heightCm / 100;
    bmiValue = weightKg / (heightM * heightM);
    bmiValue = Math.round(bmiValue * 10) / 10;

    if (bmiValue < 18.5) bmiCategoryRaw = "Underweight";
    else if (bmiValue < 25) bmiCategoryRaw = "Normal";
    else if (bmiValue < 30) bmiCategoryRaw = "Overweight";
    else if (bmiValue < 35) bmiCategoryRaw = "Obese Class I";
    else if (bmiValue < 40) bmiCategoryRaw = "Obese Class II";
    else bmiCategoryRaw = "Obese Class III";

    const bmiCat = v[bmiCategoryRaw] || bmiCategoryRaw;
    const bmiUnit = v["kg/m²"] || "kg/m²";
    bmiDisplay = `${bmiValue} ${bmiUnit} (${bmiCat})`;
  }

  // ── Waist-to-Hip Ratio (optional) ─────────────────────────────────
  let whrValue: number | null = null;
  let whrRiskRaw = "";
  let whrDisplay = v["N/A"] || "N/A";

  if (hipCm && hipCm > 0) {
    whrValue = Math.round((waistCm / hipCm) * 100) / 100;

    if (gender === "male") {
      if (whrValue < 0.90) whrRiskRaw = "Low";
      else if (whrValue < 0.95) whrRiskRaw = "Moderate";
      else if (whrValue < 1.0) whrRiskRaw = "High";
      else whrRiskRaw = "Very High";
    } else {
      if (whrValue < 0.80) whrRiskRaw = "Low";
      else if (whrValue < 0.85) whrRiskRaw = "Moderate";
      else if (whrValue < 0.90) whrRiskRaw = "High";
      else whrRiskRaw = "Very High";
    }

    const whrRisk = v[whrRiskRaw] || whrRiskRaw;
    whrDisplay = `${whrValue} (${whrRisk})`;
  }

  // ── Years of Life Lost estimate ───────────────────────────────────
  // Based on Ashwell et al. 2014, PLOS ONE — population averages
  function estimateYLL(ratio: number): { low: number; high: number } {
    if (ratio < 0.5) return { low: 0, high: 0 };
    if (ratio < 0.52) return { low: 0, high: 1 };
    if (ratio < 0.56) return { low: 1, high: 3 };
    if (ratio < 0.60) return { low: 3, high: 7 };
    if (ratio < 0.65) return { low: 7, high: 12 };
    return { low: 12, high: 20 };
  }

  const yll = estimateYLL(whtr);
  const yearsLabel = v["years"] || "years";
  let yllDisplay: string;
  if (yll.low === 0 && yll.high === 0) {
    yllDisplay = `0 ${yearsLabel}`;
  } else if (yll.low === 0) {
    yllDisplay = `0–${yll.high} ${yearsLabel}`;
  } else {
    yllDisplay = `${yll.low}–${yll.high} ${yearsLabel}`;
  }

  // ── Build summary ─────────────────────────────────────────────────
  const waistActionText = waistToLoseCm > 0
    ? `You need to reduce your waist by ${waistToLoseDisplay}.`
    : "Your waist is already within the healthy range.";

  const summaryTemplate = f.summary || "Your waist-to-height ratio is {whtr} ({category}). Risk level: {riskLevel}. Your target waist is {targetWaist}. {waistAction} BMI for comparison: {bmi}.";
  const summary = summaryTemplate
    .replace("{whtr}", whtrRounded.toFixed(3))
    .replace("{category}", category)
    .replace("{riskLevel}", riskLevel)
    .replace("{targetWaist}", targetWaistDisplay)
    .replace("{waistAction}", waistActionText)
    .replace("{bmi}", bmiDisplay);

  return {
    values: {
      whtr: whtrRounded,
      category: categoryRaw,
      riskLevel: riskRaw,
      targetWaist: waistUnit === "cm" ? Math.round(targetWaistCm * 10) / 10 : Math.round(convertFromBase(targetWaistCm, "in", "body_length") * 10) / 10,
      waistToLose: waistUnit === "cm" ? Math.round(waistToLoseCm * 10) / 10 : Math.round(convertFromBase(waistToLoseCm, "in", "body_length") * 10) / 10,
      bmi: bmiValue || 0,
      whr: whrValue || 0,
      yearsOfLifeLost: (yll.low + yll.high) / 2,
    },
    formatted: {
      whtr: whtrRounded.toFixed(3),
      category,
      riskLevel,
      targetWaist: targetWaistDisplay,
      waistToLose: waistToLoseDisplay,
      bmi: bmiDisplay,
      whr: whrDisplay,
      yearsOfLifeLost: yllDisplay,
    },
    summary,
    isValid: true,
  };
}

export default waistToHeightRatioCalculatorConfig;
