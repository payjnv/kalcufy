import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

export const idealWeightConfig: CalculatorConfigV4 = {
  id: "ideal-weight",
  version: "4.0",
  category: "health",
  icon: "⚖️",

  presets: [
    {
      id: "averageMale",
      icon: "👨",
      values: { unitSystem: "imperial", gender: "male", age: 30, heightFt: 5, heightIn: 10, currentWeight: 180, includeFrame: "no" },
    },
    {
      id: "averageFemale",
      icon: "👩",
      values: { unitSystem: "imperial", gender: "female", age: 28, heightFt: 5, heightIn: 5, currentWeight: 145, includeFrame: "no" },
    },
    {
      id: "withFrame",
      icon: "📏",
      values: { unitSystem: "imperial", gender: "male", age: 35, heightFt: 6, heightIn: 0, currentWeight: 200, includeFrame: "yes", wristIn: 7.0 },
    },
  ],

  t: {
    en: {
      name: "Ideal Weight Calculator",
      slug: "ideal-weight-calculator",
      subtitle: "Calculate your ideal body weight using 5 scientific formulas: Devine, Robinson, Miller, Hamwi, and Broca. Includes body frame adjustment and personalized recommendations.",
      breadcrumb: "Ideal Weight",

      seo: {
        title: "Ideal Weight Calculator - 5 Scientific Formulas | Free Tool",
        description: "Calculate your ideal body weight using Devine, Robinson, Miller, Hamwi, and Broca formulas. Includes body frame size adjustment, BMI range, and weight goals. Free comprehensive calculator.",
        shortDescription: "Find your ideal weight with 5 scientific formulas",
        keywords: ["ideal weight calculator", "ideal body weight", "IBW calculator", "Devine formula", "healthy weight range", "body frame size"],
      },

      calculator: { yourInformation: "Your Information" },
      ui: {
        yourInformation: "Your Information",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        unitSystem: {
          label: "Unit System",
          options: { metric: "Metric (kg, cm)", imperial: "Imperial (lbs, ft/in)" },
        },
        gender: {
          label: "Gender",
          helpText: "IBW formulas differ by gender due to body composition differences",
          options: { male: "Male", female: "Female" },
        },
        age: {
          label: "Age",
          helpText: "Used for body fat estimation and age-adjusted recommendations",
        },
        heightCm: { label: "Height", helpText: "Your height in centimeters" },
        heightFt: { label: "Height (ft)", helpText: "Feet portion of height" },
        heightIn: { label: "Height (in)", helpText: "Inches portion of height" },
        currentWeight: { label: "Current Weight", helpText: "Your actual weight to calculate difference from ideal" },
        currentWeightKg: { label: "Current Weight", helpText: "Your actual weight in kilograms" },
        includeFrame: {
          label: "Include Body Frame Adjustment?",
          helpText: "Adjusts ideal weight based on your bone structure",
          options: { no: "No", yes: "Yes" },
        },
        wristIn: { label: "Wrist Circumference", helpText: "Measure around the narrowest part of your wrist" },
        wristCm: { label: "Wrist Circumference", helpText: "Measure around the narrowest part of your wrist" },
      },

      results: {
        idealDevine: { label: "Ideal Weight (Devine)" },
        idealRobinson: { label: "Robinson Formula" },
        idealMiller: { label: "Miller Formula" },
        idealHamwi: { label: "Hamwi Formula" },
        idealBroca: { label: "Broca Index" },
        formulaRange: { label: "Formula Range" },
        bmiRange: { label: "Healthy BMI Range" },
        bodyFrame: { label: "Body Frame Size" },
        bodyFatEstimate: { label: "Body Fat % Estimate" },
        weightDifference: { label: "Weight to Goal" },
        timeToGoal: { label: "Estimated Time" },
      },

      presets: {
        averageMale: { label: "Average Male", description: "5'10\", 180 lbs, age 30" },
        averageFemale: { label: "Average Female", description: "5'5\", 145 lbs, age 28" },
        withFrame: { label: "With Frame Size", description: "6'0\" male with wrist measurement" },
      },

      tooltips: {
        idealDevine: "The Devine formula (1974) is the most widely used in clinical settings",
        idealRobinson: "Robinson (1983) modification, often gives slightly lower estimates",
        idealMiller: "Miller (1983) formula, tends to give higher estimates for taller individuals",
        idealHamwi: "Hamwi (1964) original formula developed for medication dosing",
        idealBroca: "Simple European formula: height(cm) - 100 for men, -105 for women",
        bodyFrame: "Based on wrist circumference relative to height",
        bodyFatEstimate: "Estimated using Deurenberg formula based on BMI, age, and gender",
      },

      values: {
        "lbs": "lbs",
        "kg": "kg",
        "in": "in",
        "cm": "cm",
        "weeks": "weeks",
        "week": "week",
        "Small": "Small",
        "Medium": "Medium",
        "Large": "Large",
        "to": "to",
        "lose": "lose",
        "gain": "gain",
        "At goal": "At goal",
        "Already at ideal": "Already at ideal weight",
      },

      formats: {
        summary: "Your ideal weight is {idealDevine} (Devine formula). Based on all formulas, your healthy range is {formulaRange}. You need to {action} {weightDifference} to reach your ideal weight.",
      },

      infoCards: {
        formulas: {
          title: "📊 Weight by Formula",
          items: [
            { label: "Devine (1974)", valueKey: "idealDevine" },
            { label: "Robinson (1983)", valueKey: "idealRobinson" },
            { label: "Miller (1983)", valueKey: "idealMiller" },
            { label: "Hamwi (1964)", valueKey: "idealHamwi" },
          ],
        },
        metrics: {
          title: "🎯 Your Metrics",
          items: [
            { label: "Formula Range", valueKey: "formulaRange" },
            { label: "Healthy BMI Range", valueKey: "bmiRange" },
            { label: "Body Fat Estimate", valueKey: "bodyFatEstimate" },
            { label: "Body Frame", valueKey: "bodyFrame" },
          ],
        },
        tips: {
          title: "💡 Understanding Ideal Weight",
          items: [
            "IBW formulas are estimates, not strict targets",
            "Muscular individuals may exceed IBW and be healthy",
            "Body frame size affects your optimal weight",
            "Focus on health markers, not just the scale",
          ],
        },
      },

      referenceData: {},

      education: {
        whatIs: {
          title: "What is Ideal Body Weight?",
          content: "Ideal Body Weight (IBW) is an estimated weight range associated with optimal health outcomes for a given height and gender. Originally developed in the 1970s to calculate medication dosages, IBW formulas are now used as general health guidelines. However, it's important to understand that IBW is not a single 'perfect' number but rather a range that varies based on individual factors like body frame, muscle mass, and overall health. The most commonly used formula is the Devine formula (1974), though we calculate five different formulas to give you a comprehensive view of your healthy weight range.",
        },
        formulas: {
          title: "The 5 IBW Formulas Explained",
          content: "Each formula was developed by different researchers with slightly different approaches. The Devine formula (1974) is most widely used in clinical settings for drug dosing. Robinson (1983) and Miller (1983) are modifications that tend to give slightly different results. Hamwi (1964) was the original formula developed for nutritional assessment. The Broca Index is a simple European calculation. By comparing all five, you get a realistic range rather than a single potentially misleading number. All formulas use the same base concept: a starting weight for 5 feet of height, plus an increment for each additional inch.",
        },
        considerations: {
          title: "Important Considerations",
          items: [
            { text: "IBW formulas don't account for muscle mass - athletes may exceed IBW healthily", type: "warning" },
            { text: "Body frame size significantly affects optimal weight - use wrist measurement for accuracy", type: "info" },
            { text: "Age affects body composition but not traditional IBW formulas", type: "info" },
            { text: "These formulas were developed primarily on Caucasian populations", type: "warning" },
            { text: "Health markers like blood pressure and cholesterol matter more than weight alone", type: "info" },
            { text: "Sustainable weight loss is 0.5-1 kg (1-2 lbs) per week maximum", type: "warning" },
          ],
        },
        frameSize: {
          title: "Body Frame Size Guide",
          items: [
            { text: "Small Frame: Wrist < 6.5\" (men) or < 6\" (women) - subtract 10% from IBW", type: "info" },
            { text: "Medium Frame: Wrist 6.5-7.5\" (men) or 6-6.25\" (women) - use standard IBW", type: "info" },
            { text: "Large Frame: Wrist > 7.5\" (men) or > 6.25\" (women) - add 10% to IBW", type: "info" },
            { text: "Measure your wrist just below the wrist bone at the narrowest point", type: "info" },
            { text: "Frame size reflects bone structure, not fat or muscle", type: "info" },
            { text: "Those with larger frames naturally weigh more at the same height", type: "info" },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step IBW calculations using different formulas",
          examples: [
            {
              title: "Male 5'10\" (70 inches)",
              steps: [
                "Devine: 50 + 2.3 × (70 - 60) = 50 + 23 = 73 kg (161 lbs)",
                "Robinson: 52 + 1.9 × (70 - 60) = 52 + 19 = 71 kg (157 lbs)",
                "Miller: 56.2 + 1.41 × (70 - 60) = 56.2 + 14.1 = 70.3 kg (155 lbs)",
                "Hamwi: 48 + 2.7 × (70 - 60) = 48 + 27 = 75 kg (165 lbs)",
              ],
              result: "Range: 155-165 lbs (70-75 kg)",
            },
            {
              title: "Female 5'5\" (65 inches)",
              steps: [
                "Devine: 45.5 + 2.3 × (65 - 60) = 45.5 + 11.5 = 57 kg (126 lbs)",
                "Robinson: 49 + 1.7 × (65 - 60) = 49 + 8.5 = 57.5 kg (127 lbs)",
                "Miller: 53.1 + 1.36 × (65 - 60) = 53.1 + 6.8 = 59.9 kg (132 lbs)",
                "Hamwi: 45.5 + 2.2 × (65 - 60) = 45.5 + 11 = 56.5 kg (125 lbs)",
              ],
              result: "Range: 125-132 lbs (56.5-60 kg)",
            },
          ],
        },
      },

      faqs: [
        { question: "Which ideal weight formula is most accurate?", answer: "No single formula is universally accurate. The Devine formula (1974) is most widely used in clinical settings and is our primary recommendation. However, by comparing all five formulas, you get a realistic range. Individual factors like muscle mass, bone density, and fat distribution mean your optimal weight may fall anywhere within this range - or even slightly outside it while still being healthy." },
        { question: "How does body frame size affect ideal weight?", answer: "Body frame size, determined by bone structure, significantly impacts your optimal weight. People with larger frames naturally have heavier bones and can carry more weight healthily. A large-framed person's ideal weight may be 10% higher than standard formulas suggest, while small-framed individuals may have an ideal weight 10% lower. Measure your wrist circumference to determine your frame size." },
        { question: "Why do I weigh more than my 'ideal' weight but look fit?", answer: "IBW formulas don't distinguish between muscle and fat. Muscle is denser than fat, so muscular individuals often exceed their calculated IBW while having healthy body composition. This is especially common in athletes and regular exercisers. Body fat percentage and health markers like blood pressure are better indicators of health than weight alone." },
        { question: "How is body fat percentage estimated from BMI?", answer: "We use the Deurenberg formula: Body Fat % = (1.20 × BMI) + (0.23 × Age) - (10.8 × gender) - 5.4, where gender is 1 for males and 0 for females. This provides an estimate based on population averages but doesn't account for individual variation in muscle mass. For accurate body fat measurement, consider DEXA scans or hydrostatic weighing." },
        { question: "How fast should I try to reach my ideal weight?", answer: "Safe, sustainable weight loss is 0.5-1 kg (1-2 lbs) per week. Faster loss often results in muscle loss and metabolic adaptation, making weight regain more likely. If you need to lose 10 kg, expect it to take 10-20 weeks. Focus on gradual lifestyle changes rather than extreme diets. Gaining weight (for those underweight) should also be gradual at about 0.25-0.5 kg per week." },
        { question: "Do ideal weight recommendations change with age?", answer: "Traditional IBW formulas don't adjust for age, but research suggests slightly higher BMI (up to 27) may be acceptable for adults over 65, as some extra weight can be protective against illness. Our body fat estimation does account for age, since body composition naturally shifts toward higher fat percentage as we age, even at the same weight." },
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
      accessibility: { mobileResults: "Results summary", closeModal: "Close", openMenu: "Open menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Calculadora de Peso Ideal",
      "slug": "calculadora-peso-ideal",
      "subtitle": "Calcula tu peso corporal ideal usando 5 fórmulas científicas: Devine, Robinson, Miller, Hamwi y Broca. Incluye ajuste por complexión corporal y recomendaciones personalizadas.",
      "breadcrumb": "Peso Ideal",
      "seo": {
        "title": "Calculadora de Peso Ideal - 5 Fórmulas Científicas | Herramienta Gratuita",
        "description": "Calcula tu peso corporal ideal usando las fórmulas de Devine, Robinson, Miller, Hamwi y Broca. Incluye ajuste por complexión corporal, rango de IMC y objetivos de peso. Calculadora integral gratuita.",
        "shortDescription": "Encuentra tu peso ideal con 5 fórmulas científicas",
        "keywords": [
          "calculadora peso ideal",
          "peso corporal ideal",
          "calculadora PCI",
          "fórmula Devine",
          "rango peso saludable",
          "complexión corporal"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "unitSystem": {
          "label": "Sistema de Unidades",
          "options": {
            "metric": "Métrico (kg, cm)",
            "imperial": "Imperial (lbs, pies/pulgadas)"
          }
        },
        "gender": {
          "label": "Sexo",
          "helpText": "Las fórmulas de PCI difieren por sexo debido a diferencias en composición corporal",
          "options": {
            "male": "Masculino",
            "female": "Femenino"
          }
        },
        "age": {
          "label": "Edad",
          "helpText": "Usada para estimación de grasa corporal y recomendaciones ajustadas por edad"
        },
        "heightCm": {
          "label": "Altura",
          "helpText": "Tu altura en centímetros"
        },
        "heightFt": {
          "label": "Altura (pies)",
          "helpText": "Porción en pies de la altura"
        },
        "heightIn": {
          "label": "Altura (pulgadas)",
          "helpText": "Porción en pulgadas de la altura"
        },
        "currentWeight": {
          "label": "Peso Actual",
          "helpText": "Tu peso real para calcular diferencia con el peso ideal"
        },
        "currentWeightKg": {
          "label": "Peso Actual",
          "helpText": "Tu peso real en kilogramos"
        },
        "includeFrame": {
          "label": "¿Incluir Ajuste por Complexión Corporal?",
          "helpText": "Ajusta el peso ideal basado en tu estructura ósea",
          "options": {
            "no": "No",
            "yes": "Sí"
          }
        },
        "wristIn": {
          "label": "Circunferencia de Muñeca",
          "helpText": "Mide alrededor de la parte más estrecha de tu muñeca"
        },
        "wristCm": {
          "label": "Circunferencia de Muñeca",
          "helpText": "Mide alrededor de la parte más estrecha de tu muñeca"
        }
      },
      "results": {
        "idealDevine": {
          "label": "Peso Ideal (Devine)"
        },
        "idealRobinson": {
          "label": "Fórmula Robinson"
        },
        "idealMiller": {
          "label": "Fórmula Miller"
        },
        "idealHamwi": {
          "label": "Fórmula Hamwi"
        },
        "idealBroca": {
          "label": "Índice Broca"
        },
        "formulaRange": {
          "label": "Rango de Fórmulas"
        },
        "bmiRange": {
          "label": "Rango IMC Saludable"
        },
        "bodyFrame": {
          "label": "Complexión Corporal"
        },
        "bodyFatEstimate": {
          "label": "Estimación % Grasa Corporal"
        },
        "weightDifference": {
          "label": "Peso hacia Objetivo"
        },
        "timeToGoal": {
          "label": "Tiempo Estimado"
        }
      },
      "presets": {
        "averageMale": {
          "label": "Hombre Promedio",
          "description": "1,78m, 82 kg, edad 30"
        },
        "averageFemale": {
          "label": "Mujer Promedio",
          "description": "1,65m, 66 kg, edad 28"
        },
        "withFrame": {
          "label": "Con Complexión",
          "description": "Hombre 1,83m con medida de muñeca"
        }
      },
      "tooltips": {
        "idealDevine": "La fórmula Devine (1974) es la más utilizada en entornos clínicos",
        "idealRobinson": "Modificación Robinson (1983), suele dar estimaciones ligeramente menores",
        "idealMiller": "Fórmula Miller (1983), tiende a dar estimaciones más altas para personas altas",
        "idealHamwi": "Fórmula original Hamwi (1964) desarrollada para dosificación de medicamentos",
        "idealBroca": "Fórmula europea simple: altura(cm) - 100 para hombres, -105 para mujeres",
        "bodyFrame": "Basado en circunferencia de muñeca relativa a la altura",
        "bodyFatEstimate": "Estimado usando fórmula Deurenberg basada en IMC, edad y sexo"
      },
      "values": {
        "lbs": "lbs",
        "kg": "kg",
        "in": "pulg",
        "cm": "cm",
        "weeks": "semanas",
        "week": "semana",
        "Small": "Pequeña",
        "Medium": "Mediana",
        "Large": "Grande",
        "to": "a",
        "lose": "perder",
        "gain": "ganar",
        "At goal": "En objetivo",
        "Already at ideal": "Ya en peso ideal"
      },
      "formats": {
        "summary": "Tu peso ideal es {idealDevine} (fórmula Devine). Basado en todas las fórmulas, tu rango saludable es {formulaRange}. Necesitas {action} {weightDifference} para alcanzar tu peso ideal."
      },
      "infoCards": {
        "formulas": {
          "title": "📊 Peso por Fórmula",
          "items": [
            {
              "label": "Devine (1974)",
              "valueKey": "idealDevine"
            },
            {
              "label": "Robinson (1983)",
              "valueKey": "idealRobinson"
            },
            {
              "label": "Miller (1983)",
              "valueKey": "idealMiller"
            },
            {
              "label": "Hamwi (1964)",
              "valueKey": "idealHamwi"
            }
          ]
        },
        "metrics": {
          "title": "🎯 Tus Métricas",
          "items": [
            {
              "label": "Rango de Fórmulas",
              "valueKey": "formulaRange"
            },
            {
              "label": "Rango IMC Saludable",
              "valueKey": "bmiRange"
            },
            {
              "label": "Estimación Grasa Corporal",
              "valueKey": "bodyFatEstimate"
            },
            {
              "label": "Complexión Corporal",
              "valueKey": "bodyFrame"
            }
          ]
        },
        "tips": {
          "title": "💡 Entendiendo el Peso Ideal",
          "items": [
            "Las fórmulas PCI son estimaciones, no objetivos estrictos",
            "Personas musculosas pueden exceder el PCI y estar sanas",
            "La complexión corporal afecta tu peso óptimo",
            "Enfócate en marcadores de salud, no solo la báscula"
          ]
        }
      },
      "referenceData": {},
      "education": {
        "whatIs": {
          "title": "¿Qué es el Peso Corporal Ideal?",
          "content": "El Peso Corporal Ideal (PCI) es un rango de peso estimado asociado con resultados óptimos de salud para una altura y sexo dados. Originalmente desarrollado en los años 70 para calcular dosis de medicamentos, las fórmulas PCI ahora se usan como guías generales de salud. Sin embargo, es importante entender que el PCI no es un número 'perfecto' único, sino un rango que varía según factores individuales como complexión corporal, masa muscular y salud general. La fórmula más utilizada es la de Devine (1974), aunque calculamos cinco fórmulas diferentes para darte una visión integral de tu rango de peso saludable."
        },
        "formulas": {
          "title": "Las 5 Fórmulas PCI Explicadas",
          "content": "Cada fórmula fue desarrollada por diferentes investigadores con enfoques ligeramente distintos. La fórmula Devine (1974) es la más utilizada en entornos clínicos para dosificación de medicamentos. Robinson (1983) y Miller (1983) son modificaciones que tienden a dar resultados ligeramente diferentes. Hamwi (1964) fue la fórmula original desarrollada para evaluación nutricional. El Índice Broca es un cálculo europeo simple. Al comparar las cinco, obtienes un rango realista en lugar de un número único potencialmente engañoso. Todas las fórmulas usan el mismo concepto base: un peso inicial para 5 pies de altura, más un incremento por cada pulgada adicional."
        },
        "considerations": {
          "title": "Consideraciones Importantes",
          "items": [
            {
              "text": "Las fórmulas PCI no consideran masa muscular - atletas pueden exceder el PCI saludablemente",
              "type": "warning"
            },
            {
              "text": "La complexión corporal afecta significativamente el peso óptimo - usa medida de muñeca para precisión",
              "type": "info"
            },
            {
              "text": "La edad afecta composición corporal pero no las fórmulas PCI tradicionales",
              "type": "info"
            },
            {
              "text": "Estas fórmulas se desarrollaron principalmente en poblaciones caucásicas",
              "type": "warning"
            },
            {
              "text": "Marcadores de salud como presión arterial y colesterol importan más que solo el peso",
              "type": "info"
            },
            {
              "text": "Pérdida de peso sostenible es máximo 0.5-1 kg (1-2 lbs) por semana",
              "type": "warning"
            }
          ]
        },
        "frameSize": {
          "title": "Guía de Complexión Corporal",
          "items": [
            {
              "text": "Complexión Pequeña: Muñeca < 16.5cm (hombres) o < 15cm (mujeres) - restar 10% del PCI",
              "type": "info"
            },
            {
              "text": "Complexión Mediana: Muñeca 16.5-19cm (hombres) o 15-16cm (mujeres) - usar PCI estándar",
              "type": "info"
            },
            {
              "text": "Complexión Grande: Muñeca > 19cm (hombres) o > 16cm (mujeres) - agregar 10% al PCI",
              "type": "info"
            },
            {
              "text": "Mide tu muñeca justo debajo del hueso de la muñeca en el punto más estrecho",
              "type": "info"
            },
            {
              "text": "La complexión refleja estructura ósea, no grasa o músculo",
              "type": "info"
            },
            {
              "text": "Personas con complexiones grandes naturalmente pesan más a la misma altura",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo",
          "description": "Cálculos PCI paso a paso usando diferentes fórmulas",
          "examples": [
            {
              "title": "Hombre 1.78m (70 pulgadas)",
              "steps": [
                "Devine: 50 + 2.3 × (70 - 60) = 50 + 23 = 73 kg",
                "Robinson: 52 + 1.9 × (70 - 60) = 52 + 19 = 71 kg",
                "Miller: 56.2 + 1.41 × (70 - 60) = 56.2 + 14.1 = 70.3 kg",
                "Hamwi: 48 + 2.7 × (70 - 60) = 48 + 27 = 75 kg"
              ],
              "result": "Rango: 70-75 kg"
            },
            {
              "title": "Mujer 1.65m (65 pulgadas)",
              "steps": [
                "Devine: 45.5 + 2.3 × (65 - 60) = 45.5 + 11.5 = 57 kg",
                "Robinson: 49 + 1.7 × (65 - 60) = 49 + 8.5 = 57.5 kg",
                "Miller: 53.1 + 1.36 × (65 - 60) = 53.1 + 6.8 = 59.9 kg",
                "Hamwi: 45.5 + 2.2 × (65 - 60) = 45.5 + 11 = 56.5 kg"
              ],
              "result": "Rango: 56.5-60 kg"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuál fórmula de peso ideal es más precisa?",
          "answer": "Ninguna fórmula única es universalmente precisa. La fórmula Devine (1974) es la más utilizada en entornos clínicos y es nuestra recomendación principal. Sin embargo, al comparar las cinco fórmulas, obtienes un rango realista. Factores individuales como masa muscular, densidad ósea y distribución de grasa significan que tu peso óptimo puede estar en cualquier lugar dentro de este rango - o incluso ligeramente fuera mientras sigues siendo saludable."
        },
        {
          "question": "¿Cómo afecta la complexión corporal al peso ideal?",
          "answer": "La complexión corporal, determinada por la estructura ósea, impacta significativamente tu peso óptimo. Personas con complexiones grandes naturalmente tienen huesos más pesados y pueden llevar más peso saludablemente. El peso ideal de una persona de complexión grande puede ser 10% mayor que lo que sugieren las fórmulas estándar, mientras que individuos de complexión pequeña pueden tener un peso ideal 10% menor. Mide la circunferencia de tu muñeca para determinar tu complexión."
        },
        {
          "question": "¿Por qué peso más que mi peso 'ideal' pero me veo en forma?",
          "answer": "Las fórmulas PCI no distinguen entre músculo y grasa. El músculo es más denso que la grasa, así que individuos musculosos a menudo exceden su PCI calculado mientras tienen una composición corporal saludable. Esto es especialmente común en atletas y quienes ejercitan regularmente. El porcentaje de grasa corporal y marcadores de salud como presión arterial son mejores indicadores de salud que solo el peso."
        },
        {
          "question": "¿Cómo se estima el porcentaje de grasa corporal del IMC?",
          "answer": "Usamos la fórmula Deurenberg: % Grasa Corporal = (1.20 × IMC) + (0.23 × Edad) - (10.8 × sexo) - 5.4, donde sexo es 1 para hombres y 0 para mujeres. Esto proporciona una estimación basada en promedios poblacionales pero no considera variación individual en masa muscular. Para medición precisa de grasa corporal, considera escaneos DEXA o pesaje hidrostático."
        },
        {
          "question": "¿Qué tan rápido debería intentar alcanzar mi peso ideal?",
          "answer": "Pérdida de peso segura y sostenible es 0.5-1 kg por semana. Pérdida más rápida a menudo resulta en pérdida muscular y adaptación metabólica, haciendo más probable la recuperación de peso. Si necesitas perder 10 kg, espera que tome 10-20 semanas. Enfócate en cambios graduales de estilo de vida en lugar de dietas extremas. Ganar peso (para quienes tienen bajo peso) también debería ser gradual a unos 0.25-0.5 kg por semana."
        },
        {
          "question": "¿Cambian las recomendaciones de peso ideal con la edad?",
          "answer": "Las fórmulas PCI tradicionales no se ajustan por edad, pero la investigación sugiere que un IMC ligeramente mayor (hasta 27) puede ser aceptable para adultos mayores de 65, ya que algo de peso extra puede ser protector contra enfermedades. Nuestra estimación de grasa corporal sí considera la edad, ya que la composición corporal naturalmente cambia hacia mayor porcentaje de grasa al envejecer, incluso al mismo peso."
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
      "name": "Calculadora de Peso Ideal",
      "slug": "calculadora-peso-ideal",
      "subtitle": "Calcule seu peso corporal ideal usando 5 fórmulas científicas: Devine, Robinson, Miller, Hamwi e Broca. Inclui ajuste de estrutura corporal e recomendações personalizadas.",
      "breadcrumb": "Peso Ideal",
      "seo": {
        "title": "Calculadora de Peso Ideal - 5 Fórmulas Científicas | Ferramenta Gratuita",
        "description": "Calcule seu peso corporal ideal usando as fórmulas Devine, Robinson, Miller, Hamwi e Broca. Inclui ajuste do tamanho da estrutura corporal, faixa de IMC e metas de peso. Calculadora gratuita abrangente.",
        "shortDescription": "Encontre seu peso ideal com 5 fórmulas científicas",
        "keywords": [
          "calculadora peso ideal",
          "peso corporal ideal",
          "calculadora PCI",
          "fórmula Devine",
          "faixa peso saudável",
          "tamanho estrutura corporal"
        ]
      },
      "inputs": {
        "unitSystem": {
          "label": "Sistema de Unidades",
          "options": {
            "metric": "Métrico (kg, cm)",
            "imperial": "Imperial (lbs, pés/pol)"
          }
        },
        "gender": {
          "label": "Sexo",
          "helpText": "As fórmulas de PCI diferem por sexo devido às diferenças na composição corporal",
          "options": {
            "male": "Masculino",
            "female": "Feminino"
          }
        },
        "age": {
          "label": "Idade",
          "helpText": "Usado para estimativa de gordura corporal e recomendações ajustadas por idade"
        },
        "heightCm": {
          "label": "Altura",
          "helpText": "Sua altura em centímetros"
        },
        "heightFt": {
          "label": "Altura (pés)",
          "helpText": "Parte em pés da altura"
        },
        "heightIn": {
          "label": "Altura (pol)",
          "helpText": "Parte em polegadas da altura"
        },
        "currentWeight": {
          "label": "Peso Atual",
          "helpText": "Seu peso real para calcular a diferença do peso ideal"
        },
        "currentWeightKg": {
          "label": "Peso Atual",
          "helpText": "Seu peso real em quilogramas"
        },
        "includeFrame": {
          "label": "Incluir Ajuste de Estrutura Corporal?",
          "helpText": "Ajusta o peso ideal baseado na sua estrutura óssea",
          "options": {
            "no": "Não",
            "yes": "Sim"
          }
        },
        "wristIn": {
          "label": "Circunferência do Punho",
          "helpText": "Meça ao redor da parte mais estreita do seu punho"
        },
        "wristCm": {
          "label": "Circunferência do Punho",
          "helpText": "Meça ao redor da parte mais estreita do seu punho"
        }
      },
      "results": {
        "idealDevine": {
          "label": "Peso Ideal (Devine)"
        },
        "idealRobinson": {
          "label": "Fórmula Robinson"
        },
        "idealMiller": {
          "label": "Fórmula Miller"
        },
        "idealHamwi": {
          "label": "Fórmula Hamwi"
        },
        "idealBroca": {
          "label": "Índice Broca"
        },
        "formulaRange": {
          "label": "Faixa das Fórmulas"
        },
        "bmiRange": {
          "label": "Faixa de IMC Saudável"
        },
        "bodyFrame": {
          "label": "Tamanho da Estrutura Corporal"
        },
        "bodyFatEstimate": {
          "label": "Estimativa de % de Gordura"
        },
        "weightDifference": {
          "label": "Peso até a Meta"
        },
        "timeToGoal": {
          "label": "Tempo Estimado"
        }
      },
      "presets": {
        "averageMale": {
          "label": "Homem Médio",
          "description": "1,78m, 82 kg, 30 anos"
        },
        "averageFemale": {
          "label": "Mulher Média",
          "description": "1,65m, 66 kg, 28 anos"
        },
        "withFrame": {
          "label": "Com Tamanho da Estrutura",
          "description": "Homem 1,83m com medida do punho"
        }
      },
      "tooltips": {
        "idealDevine": "A fórmula Devine (1974) é a mais amplamente usada em ambientes clínicos",
        "idealRobinson": "Modificação de Robinson (1983), frequentemente dá estimativas ligeiramente menores",
        "idealMiller": "Fórmula Miller (1983), tende a dar estimativas maiores para indivíduos mais altos",
        "idealHamwi": "Fórmula original Hamwi (1964) desenvolvida para dosagem de medicamentos",
        "idealBroca": "Fórmula europeia simples: altura(cm) - 100 para homens, -105 para mulheres",
        "bodyFrame": "Baseado na circunferência do punho relativa à altura",
        "bodyFatEstimate": "Estimado usando a fórmula Deurenberg baseada em IMC, idade e sexo"
      },
      "values": {
        "lbs": "lbs",
        "kg": "kg",
        "in": "pol",
        "cm": "cm",
        "weeks": "semanas",
        "week": "semana",
        "Small": "Pequena",
        "Medium": "Média",
        "Large": "Grande",
        "to": "a",
        "lose": "perder",
        "gain": "ganhar",
        "At goal": "Na meta",
        "Already at ideal": "Já no peso ideal"
      },
      "formats": {
        "summary": "Seu peso ideal é {idealDevine} (fórmula Devine). Baseado em todas as fórmulas, sua faixa saudável é {formulaRange}. Você precisa {action} {weightDifference} para alcançar seu peso ideal."
      },
      "infoCards": {
        "formulas": {
          "title": "📊 Peso por Fórmula",
          "items": [
            {
              "label": "Devine (1974)",
              "valueKey": "idealDevine"
            },
            {
              "label": "Robinson (1983)",
              "valueKey": "idealRobinson"
            },
            {
              "label": "Miller (1983)",
              "valueKey": "idealMiller"
            },
            {
              "label": "Hamwi (1964)",
              "valueKey": "idealHamwi"
            }
          ]
        },
        "metrics": {
          "title": "🎯 Suas Métricas",
          "items": [
            {
              "label": "Faixa das Fórmulas",
              "valueKey": "formulaRange"
            },
            {
              "label": "Faixa de IMC Saudável",
              "valueKey": "bmiRange"
            },
            {
              "label": "Estimativa de Gordura",
              "valueKey": "bodyFatEstimate"
            },
            {
              "label": "Estrutura Corporal",
              "valueKey": "bodyFrame"
            }
          ]
        },
        "tips": {
          "title": "💡 Entendendo o Peso Ideal",
          "items": [
            "Fórmulas de PCI são estimativas, não metas rígidas",
            "Indivíduos musculosos podem exceder o PCI e serem saudáveis",
            "O tamanho da estrutura corporal afeta seu peso ótimo",
            "Foque em indicadores de saúde, não apenas na balança"
          ]
        }
      },
      "referenceData": {},
      "education": {
        "whatIs": {
          "title": "O que é Peso Corporal Ideal?",
          "content": "O Peso Corporal Ideal (PCI) é uma faixa de peso estimada associada a resultados de saúde ótimos para uma determinada altura e sexo. Originalmente desenvolvidas na década de 1970 para calcular dosagens de medicamentos, as fórmulas de PCI agora são usadas como diretrizes gerais de saúde. No entanto, é importante entender que o PCI não é um número único 'perfeito', mas sim uma faixa que varia baseada em fatores individuais como estrutura corporal, massa muscular e saúde geral. A fórmula mais comumente usada é a Devine (1974), embora calculemos cinco fórmulas diferentes para dar uma visão abrangente da sua faixa de peso saudável."
        },
        "formulas": {
          "title": "As 5 Fórmulas de PCI Explicadas",
          "content": "Cada fórmula foi desenvolvida por pesquisadores diferentes com abordagens ligeiramente diferentes. A fórmula Devine (1974) é mais amplamente usada em ambientes clínicos para dosagem de medicamentos. Robinson (1983) e Miller (1983) são modificações que tendem a dar resultados ligeiramente diferentes. Hamwi (1964) foi a fórmula original desenvolvida para avaliação nutricional. O Índice Broca é um cálculo europeu simples. Comparando todas as cinco, você obtém uma faixa realista em vez de um único número potencialmente enganoso. Todas as fórmulas usam o mesmo conceito base: um peso inicial para 1,52m de altura, mais um incremento para cada polegada adicional."
        },
        "considerations": {
          "title": "Considerações Importantes",
          "items": [
            {
              "text": "Fórmulas de PCI não consideram massa muscular - atletas podem exceder o PCI de forma saudável",
              "type": "warning"
            },
            {
              "text": "O tamanho da estrutura corporal afeta significativamente o peso ótimo - use medida do punho para precisão",
              "type": "info"
            },
            {
              "text": "A idade afeta a composição corporal mas não as fórmulas tradicionais de PCI",
              "type": "info"
            },
            {
              "text": "Essas fórmulas foram desenvolvidas principalmente em populações caucasianas",
              "type": "warning"
            },
            {
              "text": "Marcadores de saúde como pressão arterial e colesterol importam mais que apenas o peso",
              "type": "info"
            },
            {
              "text": "Perda de peso sustentável é no máximo 0,5-1 kg por semana",
              "type": "warning"
            }
          ]
        },
        "frameSize": {
          "title": "Guia do Tamanho da Estrutura Corporal",
          "items": [
            {
              "text": "Estrutura Pequena: Punho < 16,5cm (homens) ou < 15cm (mulheres) - subtrair 10% do PCI",
              "type": "info"
            },
            {
              "text": "Estrutura Média: Punho 16,5-19cm (homens) ou 15-16cm (mulheres) - usar PCI padrão",
              "type": "info"
            },
            {
              "text": "Estrutura Grande: Punho > 19cm (homens) ou > 16cm (mulheres) - adicionar 10% ao PCI",
              "type": "info"
            },
            {
              "text": "Meça seu punho logo abaixo do osso do punho no ponto mais estreito",
              "type": "info"
            },
            {
              "text": "O tamanho da estrutura reflete a estrutura óssea, não gordura ou músculo",
              "type": "info"
            },
            {
              "text": "Pessoas com estruturas maiores naturalmente pesam mais na mesma altura",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo",
          "description": "Cálculos passo a passo de PCI usando diferentes fórmulas",
          "examples": [
            {
              "title": "Homem 1,78m (70 polegadas)",
              "steps": [
                "Devine: 50 + 2,3 × (70 - 60) = 50 + 23 = 73 kg",
                "Robinson: 52 + 1,9 × (70 - 60) = 52 + 19 = 71 kg",
                "Miller: 56,2 + 1,41 × (70 - 60) = 56,2 + 14,1 = 70,3 kg",
                "Hamwi: 48 + 2,7 × (70 - 60) = 48 + 27 = 75 kg"
              ],
              "result": "Faixa: 70-75 kg"
            },
            {
              "title": "Mulher 1,65m (65 polegadas)",
              "steps": [
                "Devine: 45,5 + 2,3 × (65 - 60) = 45,5 + 11,5 = 57 kg",
                "Robinson: 49 + 1,7 × (65 - 60) = 49 + 8,5 = 57,5 kg",
                "Miller: 53,1 + 1,36 × (65 - 60) = 53,1 + 6,8 = 59,9 kg",
                "Hamwi: 45,5 + 2,2 × (65 - 60) = 45,5 + 11 = 56,5 kg"
              ],
              "result": "Faixa: 56,5-60 kg"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qual fórmula de peso ideal é mais precisa?",
          "answer": "Nenhuma fórmula única é universalmente precisa. A fórmula Devine (1974) é mais amplamente usada em ambientes clínicos e é nossa recomendação principal. No entanto, comparando todas as cinco fórmulas, você obtém uma faixa realista. Fatores individuais como massa muscular, densidade óssea e distribuição de gordura significam que seu peso ótimo pode estar em qualquer lugar dentro desta faixa - ou até ligeiramente fora dela enquanto ainda for saudável."
        },
        {
          "question": "Como o tamanho da estrutura corporal afeta o peso ideal?",
          "answer": "O tamanho da estrutura corporal, determinado pela estrutura óssea, impacta significativamente seu peso ótimo. Pessoas com estruturas maiores naturalmente têm ossos mais pesados e podem carregar mais peso de forma saudável. O peso ideal de uma pessoa de estrutura grande pode ser 10% maior que as fórmulas padrão sugerem, enquanto indivíduos de estrutura pequena podem ter um peso ideal 10% menor. Meça a circunferência do seu punho para determinar o tamanho da sua estrutura."
        },
        {
          "question": "Por que peso mais que meu peso 'ideal' mas pareço em forma?",
          "answer": "As fórmulas de PCI não distinguem entre músculo e gordura. O músculo é mais denso que a gordura, então indivíduos musculosos frequentemente excedem seu PCI calculado enquanto têm composição corporal saudável. Isso é especialmente comum em atletas e praticantes regulares de exercício. O percentual de gordura corporal e marcadores de saúde como pressão arterial são melhores indicadores de saúde que apenas o peso."
        },
        {
          "question": "Como o percentual de gordura corporal é estimado pelo IMC?",
          "answer": "Usamos a fórmula Deurenberg: % Gordura = (1,20 × IMC) + (0,23 × Idade) - (10,8 × sexo) - 5,4, onde sexo é 1 para homens e 0 para mulheres. Isso fornece uma estimativa baseada em médias populacionais mas não considera variação individual na massa muscular. Para medição precisa de gordura corporal, considere exames DEXA ou pesagem hidrostática."
        },
        {
          "question": "Quão rápido devo tentar alcançar meu peso ideal?",
          "answer": "Perda de peso segura e sustentável é de 0,5-1 kg por semana. Perda mais rápida frequentemente resulta em perda muscular e adaptação metabólica, tornando o reganho de peso mais provável. Se você precisa perder 10 kg, espere que leve 10-20 semanas. Foque em mudanças graduais no estilo de vida em vez de dietas extremas. Ganhar peso (para quem está abaixo do peso) também deve ser gradual, cerca de 0,25-0,5 kg por semana."
        },
        {
          "question": "As recomendações de peso ideal mudam com a idade?",
          "answer": "As fórmulas tradicionais de PCI não se ajustam para idade, mas pesquisas sugerem que IMC ligeiramente mais alto (até 27) pode ser aceitável para adultos acima de 65 anos, já que algum peso extra pode ser protetor contra doenças. Nossa estimativa de gordura corporal considera a idade, já que a composição corporal naturalmente muda para maior percentual de gordura conforme envelhecemos, mesmo no mesmo peso."
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
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      }
    },
    fr: {
      "name": "Calculateur de Poids Idéal",
      "slug": "calculateur-poids-ideal",
      "subtitle": "Calculez votre poids corporel idéal en utilisant 5 formules scientifiques : Devine, Robinson, Miller, Hamwi et Broca. Inclut l'ajustement de la corpulence et des recommandations personnalisées.",
      "breadcrumb": "Poids Idéal",
      "seo": {
        "title": "Calculateur de Poids Idéal - 5 Formules Scientifiques | Outil Gratuit",
        "description": "Calculez votre poids corporel idéal avec les formules Devine, Robinson, Miller, Hamwi et Broca. Inclut l'ajustement de la corpulence, la plage IMC et les objectifs de poids. Calculateur complet gratuit.",
        "shortDescription": "Trouvez votre poids idéal avec 5 formules scientifiques",
        "keywords": [
          "calculateur poids idéal",
          "poids corporel idéal",
          "calculateur PCI",
          "formule Devine",
          "plage poids santé",
          "corpulence"
        ]
      },
      "inputs": {
        "unitSystem": {
          "label": "Système d'Unités",
          "options": {
            "metric": "Métrique (kg, cm)",
            "imperial": "Impérial (lbs, ft/in)"
          }
        },
        "gender": {
          "label": "Sexe",
          "helpText": "Les formules PCI diffèrent selon le sexe en raison des différences de composition corporelle",
          "options": {
            "male": "Homme",
            "female": "Femme"
          }
        },
        "age": {
          "label": "Âge",
          "helpText": "Utilisé pour l'estimation de la graisse corporelle et les recommandations ajustées selon l'âge"
        },
        "heightCm": {
          "label": "Taille",
          "helpText": "Votre taille en centimètres"
        },
        "heightFt": {
          "label": "Taille (pi)",
          "helpText": "Partie en pieds de la taille"
        },
        "heightIn": {
          "label": "Taille (po)",
          "helpText": "Partie en pouces de la taille"
        },
        "currentWeight": {
          "label": "Poids Actuel",
          "helpText": "Votre poids réel pour calculer la différence avec l'idéal"
        },
        "currentWeightKg": {
          "label": "Poids Actuel",
          "helpText": "Votre poids réel en kilogrammes"
        },
        "includeFrame": {
          "label": "Inclure l'Ajustement de Corpulence ?",
          "helpText": "Ajuste le poids idéal selon votre structure osseuse",
          "options": {
            "no": "Non",
            "yes": "Oui"
          }
        },
        "wristIn": {
          "label": "Circonférence du Poignet",
          "helpText": "Mesurez autour de la partie la plus étroite de votre poignet"
        },
        "wristCm": {
          "label": "Circonférence du Poignet",
          "helpText": "Mesurez autour de la partie la plus étroite de votre poignet"
        }
      },
      "results": {
        "idealDevine": {
          "label": "Poids Idéal (Devine)"
        },
        "idealRobinson": {
          "label": "Formule Robinson"
        },
        "idealMiller": {
          "label": "Formule Miller"
        },
        "idealHamwi": {
          "label": "Formule Hamwi"
        },
        "idealBroca": {
          "label": "Indice de Broca"
        },
        "formulaRange": {
          "label": "Plage des Formules"
        },
        "bmiRange": {
          "label": "Plage IMC Santé"
        },
        "bodyFrame": {
          "label": "Corpulence"
        },
        "bodyFatEstimate": {
          "label": "Estimation % Graisse"
        },
        "weightDifference": {
          "label": "Poids à l'Objectif"
        },
        "timeToGoal": {
          "label": "Temps Estimé"
        }
      },
      "presets": {
        "averageMale": {
          "label": "Homme Moyen",
          "description": "5'10\", 180 lbs, âge 30"
        },
        "averageFemale": {
          "label": "Femme Moyenne",
          "description": "5'5\", 145 lbs, âge 28"
        },
        "withFrame": {
          "label": "Avec Corpulence",
          "description": "Homme 6'0\" avec mesure de poignet"
        }
      },
      "tooltips": {
        "idealDevine": "La formule de Devine (1974) est la plus utilisée en milieu clinique",
        "idealRobinson": "Modification de Robinson (1983), donne souvent des estimations légèrement plus basses",
        "idealMiller": "Formule de Miller (1983), tend à donner des estimations plus élevées pour les individus plus grands",
        "idealHamwi": "Formule originale de Hamwi (1964) développée pour le dosage des médicaments",
        "idealBroca": "Formule européenne simple : taille(cm) - 100 pour les hommes, -105 pour les femmes",
        "bodyFrame": "Basé sur la circonférence du poignet relative à la taille",
        "bodyFatEstimate": "Estimé avec la formule de Deurenberg basée sur l'IMC, l'âge et le sexe"
      },
      "values": {
        "lbs": "lbs",
        "kg": "kg",
        "in": "po",
        "cm": "cm",
        "weeks": "semaines",
        "week": "semaine",
        "Small": "Petite",
        "Medium": "Moyenne",
        "Large": "Grande",
        "to": "à",
        "lose": "perdre",
        "gain": "prendre",
        "At goal": "À l'objectif",
        "Already at ideal": "Déjà au poids idéal"
      },
      "formats": {
        "summary": "Votre poids idéal est {idealDevine} (formule Devine). Selon toutes les formules, votre plage santé est {formulaRange}. Vous devez {action} {weightDifference} pour atteindre votre poids idéal."
      },
      "infoCards": {
        "formulas": {
          "title": "📊 Poids par Formule",
          "items": [
            {
              "label": "Devine (1974)",
              "valueKey": "idealDevine"
            },
            {
              "label": "Robinson (1983)",
              "valueKey": "idealRobinson"
            },
            {
              "label": "Miller (1983)",
              "valueKey": "idealMiller"
            },
            {
              "label": "Hamwi (1964)",
              "valueKey": "idealHamwi"
            }
          ]
        },
        "metrics": {
          "title": "🎯 Vos Métriques",
          "items": [
            {
              "label": "Plage des Formules",
              "valueKey": "formulaRange"
            },
            {
              "label": "Plage IMC Santé",
              "valueKey": "bmiRange"
            },
            {
              "label": "Estimation Graisse",
              "valueKey": "bodyFatEstimate"
            },
            {
              "label": "Corpulence",
              "valueKey": "bodyFrame"
            }
          ]
        },
        "tips": {
          "title": "💡 Comprendre le Poids Idéal",
          "items": [
            "Les formules PCI sont des estimations, pas des cibles strictes",
            "Les individus musclés peuvent dépasser le PCI et être en bonne santé",
            "La corpulence affecte votre poids optimal",
            "Concentrez-vous sur les marqueurs de santé, pas seulement la balance"
          ]
        }
      },
      "referenceData": {},
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que le Poids Corporel Idéal ?",
          "content": "Le Poids Corporel Idéal (PCI) est une plage de poids estimée associée à des résultats de santé optimaux pour une taille et un sexe donnés. Développées à l'origine dans les années 1970 pour calculer les dosages de médicaments, les formules PCI sont maintenant utilisées comme lignes directrices générales de santé. Cependant, il est important de comprendre que le PCI n'est pas un nombre 'parfait' unique mais plutôt une plage qui varie selon des facteurs individuels comme la corpulence, la masse musculaire et la santé globale. La formule la plus couramment utilisée est celle de Devine (1974), bien que nous calculions cinq formules différentes pour vous donner une vue d'ensemble de votre plage de poids santé."
        },
        "formulas": {
          "title": "Les 5 Formules PCI Expliquées",
          "content": "Chaque formule a été développée par différents chercheurs avec des approches légèrement différentes. La formule de Devine (1974) est la plus utilisée en milieu clinique pour le dosage des médicaments. Robinson (1983) et Miller (1983) sont des modifications qui tendent à donner des résultats légèrement différents. Hamwi (1964) était la formule originale développée pour l'évaluation nutritionnelle. L'Indice de Broca est un calcul européen simple. En comparant les cinq, vous obtenez une plage réaliste plutôt qu'un nombre unique potentiellement trompeur. Toutes les formules utilisent le même concept de base : un poids de départ pour 5 pieds de taille, plus un incrément pour chaque pouce supplémentaire."
        },
        "considerations": {
          "title": "Considérations Importantes",
          "items": [
            {
              "text": "Les formules PCI ne tiennent pas compte de la masse musculaire - les athlètes peuvent dépasser le PCI sainement",
              "type": "warning"
            },
            {
              "text": "La corpulence affecte significativement le poids optimal - utilisez la mesure du poignet pour plus de précision",
              "type": "info"
            },
            {
              "text": "L'âge affecte la composition corporelle mais pas les formules PCI traditionnelles",
              "type": "info"
            },
            {
              "text": "Ces formules ont été développées principalement sur des populations caucasiennes",
              "type": "warning"
            },
            {
              "text": "Les marqueurs de santé comme la tension artérielle et le cholestérol importent plus que le poids seul",
              "type": "info"
            },
            {
              "text": "Une perte de poids durable est de 0,5-1 kg (1-2 lbs) par semaine maximum",
              "type": "warning"
            }
          ]
        },
        "frameSize": {
          "title": "Guide de la Corpulence",
          "items": [
            {
              "text": "Petite Corpulence : Poignet < 16,5 cm (hommes) ou < 15 cm (femmes) - soustraire 10% du PCI",
              "type": "info"
            },
            {
              "text": "Corpulence Moyenne : Poignet 16,5-19 cm (hommes) ou 15-16 cm (femmes) - utiliser le PCI standard",
              "type": "info"
            },
            {
              "text": "Grande Corpulence : Poignet > 19 cm (hommes) ou > 16 cm (femmes) - ajouter 10% au PCI",
              "type": "info"
            },
            {
              "text": "Mesurez votre poignet juste sous l'os du poignet au point le plus étroit",
              "type": "info"
            },
            {
              "text": "La corpulence reflète la structure osseuse, pas la graisse ou le muscle",
              "type": "info"
            },
            {
              "text": "Ceux avec de plus grandes corpulences pèsent naturellement plus à la même taille",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul",
          "description": "Calculs PCI étape par étape utilisant différentes formules",
          "examples": [
            {
              "title": "Homme 1,78 m (70 pouces)",
              "steps": [
                "Devine : 50 + 2,3 × (70 - 60) = 50 + 23 = 73 kg (161 lbs)",
                "Robinson : 52 + 1,9 × (70 - 60) = 52 + 19 = 71 kg (157 lbs)",
                "Miller : 56,2 + 1,41 × (70 - 60) = 56,2 + 14,1 = 70,3 kg (155 lbs)",
                "Hamwi : 48 + 2,7 × (70 - 60) = 48 + 27 = 75 kg (165 lbs)"
              ],
              "result": "Plage : 155-165 lbs (70-75 kg)"
            },
            {
              "title": "Femme 1,65 m (65 pouces)",
              "steps": [
                "Devine : 45,5 + 2,3 × (65 - 60) = 45,5 + 11,5 = 57 kg (126 lbs)",
                "Robinson : 49 + 1,7 × (65 - 60) = 49 + 8,5 = 57,5 kg (127 lbs)",
                "Miller : 53,1 + 1,36 × (65 - 60) = 53,1 + 6,8 = 59,9 kg (132 lbs)",
                "Hamwi : 45,5 + 2,2 × (65 - 60) = 45,5 + 11 = 56,5 kg (125 lbs)"
              ],
              "result": "Plage : 125-132 lbs (56,5-60 kg)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle formule de poids idéal est la plus précise ?",
          "answer": "Aucune formule unique n'est universellement précise. La formule de Devine (1974) est la plus utilisée en milieu clinique et est notre recommandation principale. Cependant, en comparant les cinq formules, vous obtenez une plage réaliste. Les facteurs individuels comme la masse musculaire, la densité osseuse et la répartition des graisses signifient que votre poids optimal peut se situer n'importe où dans cette plage - ou même légèrement à l'extérieur tout en restant sain."
        },
        {
          "question": "Comment la corpulence affecte-t-elle le poids idéal ?",
          "answer": "La corpulence, déterminée par la structure osseuse, impacte significativement votre poids optimal. Les personnes avec de plus grandes corpulences ont naturellement des os plus lourds et peuvent porter plus de poids sainement. Le poids idéal d'une personne à grande corpulence peut être 10% plus élevé que ce que suggèrent les formules standard, tandis que les individus à petite corpulence peuvent avoir un poids idéal 10% plus bas. Mesurez la circonférence de votre poignet pour déterminer votre corpulence."
        },
        {
          "question": "Pourquoi je pèse plus que mon poids 'idéal' mais paraît en forme ?",
          "answer": "Les formules PCI ne distinguent pas entre muscle et graisse. Le muscle est plus dense que la graisse, donc les individus musclés dépassent souvent leur PCI calculé tout en ayant une composition corporelle saine. C'est particulièrement courant chez les athlètes et les pratiquants réguliers d'exercice. Le pourcentage de graisse corporelle et les marqueurs de santé comme la tension artérielle sont de meilleurs indicateurs de santé que le poids seul."
        },
        {
          "question": "Comment le pourcentage de graisse corporelle est-il estimé à partir de l'IMC ?",
          "answer": "Nous utilisons la formule de Deurenberg : % Graisse Corporelle = (1,20 × IMC) + (0,23 × Âge) - (10,8 × sexe) - 5,4, où sexe est 1 pour les hommes et 0 pour les femmes. Cela fournit une estimation basée sur les moyennes de population mais ne tient pas compte de la variation individuelle de masse musculaire. Pour une mesure précise de graisse corporelle, considérez les scans DEXA ou la pesée hydrostatique."
        },
        {
          "question": "À quelle vitesse devrais-je essayer d'atteindre mon poids idéal ?",
          "answer": "Une perte de poids sûre et durable est de 0,5-1 kg (1-2 lbs) par semaine. Une perte plus rapide entraîne souvent une perte musculaire et une adaptation métabolique, rendant la reprise de poids plus probable. Si vous devez perdre 10 kg, attendez-vous à ce que cela prenne 10-20 semaines. Concentrez-vous sur des changements de style de vie graduels plutôt que des régimes extrêmes. Prendre du poids (pour ceux en sous-poids) devrait aussi être graduel à environ 0,25-0,5 kg par semaine."
        },
        {
          "question": "Les recommandations de poids idéal changent-elles avec l'âge ?",
          "answer": "Les formules PCI traditionnelles ne s'ajustent pas selon l'âge, mais la recherche suggère qu'un IMC légèrement plus élevé (jusqu'à 27) peut être acceptable pour les adultes de plus de 65 ans, car un poids supplémentaire peut être protecteur contre la maladie. Notre estimation de graisse corporelle tient compte de l'âge, car la composition corporelle évolue naturellement vers un pourcentage de graisse plus élevé en vieillissant, même au même poids."
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
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      }
    },
    de: {
      "name": "Idealgewicht Rechner",
      "slug": "idealgewicht-rechner",
      "subtitle": "Berechnen Sie Ihr ideales Körpergewicht mit 5 wissenschaftlichen Formeln: Devine, Robinson, Miller, Hamwi und Broca. Inklusive Körperrahmen-Anpassung und personalisierte Empfehlungen.",
      "breadcrumb": "Idealgewicht",
      "seo": {
        "title": "Idealgewicht Rechner - 5 Wissenschaftliche Formeln | Kostenloses Tool",
        "description": "Berechnen Sie Ihr ideales Körpergewicht mit Devine, Robinson, Miller, Hamwi und Broca Formeln. Inklusive Körperrahmen-Anpassung, BMI-Bereich und Gewichtsziele. Kostenloser umfassender Rechner.",
        "shortDescription": "Finden Sie Ihr Idealgewicht mit 5 wissenschaftlichen Formeln",
        "keywords": [
          "idealgewicht rechner",
          "ideales körpergewicht",
          "IBW rechner",
          "Devine formel",
          "gesunder gewichtsbereich",
          "körperrahmengröße"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "unitSystem": {
          "label": "Maßsystem",
          "options": {
            "metric": "Metrisch (kg, cm)",
            "imperial": "Imperial (lbs, ft/in)"
          }
        },
        "gender": {
          "label": "Geschlecht",
          "helpText": "IBW-Formeln unterscheiden sich nach Geschlecht aufgrund von Unterschieden in der Körperzusammensetzung",
          "options": {
            "male": "Männlich",
            "female": "Weiblich"
          }
        },
        "age": {
          "label": "Alter",
          "helpText": "Verwendet für Körperfettschätzung und altersangepasste Empfehlungen"
        },
        "heightCm": {
          "label": "Größe",
          "helpText": "Ihre Größe in Zentimetern"
        },
        "heightFt": {
          "label": "Größe (ft)",
          "helpText": "Fuß-Anteil der Größe"
        },
        "heightIn": {
          "label": "Größe (in)",
          "helpText": "Zoll-Anteil der Größe"
        },
        "currentWeight": {
          "label": "Aktuelles Gewicht",
          "helpText": "Ihr tatsächliches Gewicht zur Berechnung der Differenz zum Idealgewicht"
        },
        "currentWeightKg": {
          "label": "Aktuelles Gewicht",
          "helpText": "Ihr tatsächliches Gewicht in Kilogramm"
        },
        "includeFrame": {
          "label": "Körperrahmen-Anpassung einbeziehen?",
          "helpText": "Passt das Idealgewicht basierend auf Ihrer Knochenstruktur an",
          "options": {
            "no": "Nein",
            "yes": "Ja"
          }
        },
        "wristIn": {
          "label": "Handgelenkumfang",
          "helpText": "Messen Sie um die schmalste Stelle Ihres Handgelenks"
        },
        "wristCm": {
          "label": "Handgelenkumfang",
          "helpText": "Messen Sie um die schmalste Stelle Ihres Handgelenks"
        }
      },
      "results": {
        "idealDevine": {
          "label": "Idealgewicht (Devine)"
        },
        "idealRobinson": {
          "label": "Robinson Formel"
        },
        "idealMiller": {
          "label": "Miller Formel"
        },
        "idealHamwi": {
          "label": "Hamwi Formel"
        },
        "idealBroca": {
          "label": "Broca Index"
        },
        "formulaRange": {
          "label": "Formel-Bereich"
        },
        "bmiRange": {
          "label": "Gesunder BMI-Bereich"
        },
        "bodyFrame": {
          "label": "Körperrahmengröße"
        },
        "bodyFatEstimate": {
          "label": "Körperfett % Schätzung"
        },
        "weightDifference": {
          "label": "Gewicht bis zum Ziel"
        },
        "timeToGoal": {
          "label": "Geschätzte Zeit"
        }
      },
      "presets": {
        "averageMale": {
          "label": "Durchschnittsmann",
          "description": "1,78m, 82 kg, 30 Jahre alt"
        },
        "averageFemale": {
          "label": "Durchschnittsfrau",
          "description": "1,65m, 66 kg, 28 Jahre alt"
        },
        "withFrame": {
          "label": "Mit Körperrahmen",
          "description": "1,83m Mann mit Handgelenkmessung"
        }
      },
      "tooltips": {
        "idealDevine": "Die Devine-Formel (1974) ist die am häufigsten verwendete in klinischen Umgebungen",
        "idealRobinson": "Robinson (1983) Modifikation, gibt oft etwas niedrigere Schätzungen",
        "idealMiller": "Miller (1983) Formel, tendiert zu höheren Schätzungen für größere Personen",
        "idealHamwi": "Hamwi (1964) ursprüngliche Formel entwickelt für Medikamentendosierung",
        "idealBroca": "Einfache europäische Formel: Größe(cm) - 100 für Männer, -105 für Frauen",
        "bodyFrame": "Basierend auf Handgelenkumfang relativ zur Größe",
        "bodyFatEstimate": "Geschätzt mit Deurenberg-Formel basierend auf BMI, Alter und Geschlecht"
      },
      "values": {
        "lbs": "lbs",
        "kg": "kg",
        "in": "in",
        "cm": "cm",
        "weeks": "Wochen",
        "week": "Woche",
        "Small": "Klein",
        "Medium": "Mittel",
        "Large": "Groß",
        "to": "bis",
        "lose": "abnehmen",
        "gain": "zunehmen",
        "At goal": "Am Ziel",
        "Already at ideal": "Bereits am Idealgewicht"
      },
      "formats": {
        "summary": "Ihr Idealgewicht ist {idealDevine} (Devine-Formel). Basierend auf allen Formeln liegt Ihr gesunder Bereich bei {formulaRange}. Sie müssen {weightDifference} {action}, um Ihr Idealgewicht zu erreichen."
      },
      "infoCards": {
        "formulas": {
          "title": "📊 Gewicht nach Formel",
          "items": [
            {
              "label": "Devine (1974)",
              "valueKey": "idealDevine"
            },
            {
              "label": "Robinson (1983)",
              "valueKey": "idealRobinson"
            },
            {
              "label": "Miller (1983)",
              "valueKey": "idealMiller"
            },
            {
              "label": "Hamwi (1964)",
              "valueKey": "idealHamwi"
            }
          ]
        },
        "metrics": {
          "title": "🎯 Ihre Werte",
          "items": [
            {
              "label": "Formel-Bereich",
              "valueKey": "formulaRange"
            },
            {
              "label": "Gesunder BMI-Bereich",
              "valueKey": "bmiRange"
            },
            {
              "label": "Körperfett-Schätzung",
              "valueKey": "bodyFatEstimate"
            },
            {
              "label": "Körperrahmen",
              "valueKey": "bodyFrame"
            }
          ]
        },
        "tips": {
          "title": "💡 Idealgewicht verstehen",
          "items": [
            "IBW-Formeln sind Schätzungen, keine strikten Ziele",
            "Muskulöse Personen können IBW überschreiten und gesund sein",
            "Körperrahmengröße beeinflusst Ihr optimales Gewicht",
            "Fokussieren Sie auf Gesundheitswerte, nicht nur die Waage"
          ]
        }
      },
      "referenceData": {},
      "education": {
        "whatIs": {
          "title": "Was ist Idealgewicht?",
          "content": "Das Ideale Körpergewicht (IBW) ist ein geschätzter Gewichtsbereich, der mit optimalen Gesundheitsergebnissen für eine bestimmte Größe und Geschlecht verbunden ist. Ursprünglich in den 1970er Jahren zur Berechnung von Medikamentendosierungen entwickelt, werden IBW-Formeln heute als allgemeine Gesundheitsrichtlinien verwendet. Es ist wichtig zu verstehen, dass IBW keine einzelne 'perfekte' Zahl ist, sondern vielmehr ein Bereich, der basierend auf individuellen Faktoren wie Körperrahmen, Muskelmasse und Gesamtgesundheit variiert. Die am häufigsten verwendete Formel ist die Devine-Formel (1974), obwohl wir fünf verschiedene Formeln berechnen, um Ihnen eine umfassende Sicht auf Ihren gesunden Gewichtsbereich zu geben."
        },
        "formulas": {
          "title": "Die 5 IBW-Formeln erklärt",
          "content": "Jede Formel wurde von verschiedenen Forschern mit leicht unterschiedlichen Ansätzen entwickelt. Die Devine-Formel (1974) wird am häufigsten in klinischen Umgebungen für Medikamentendosierung verwendet. Robinson (1983) und Miller (1983) sind Modifikationen, die tendenziell etwas unterschiedliche Ergebnisse liefern. Hamwi (1964) war die ursprüngliche Formel für die Ernährungsbewertung. Der Broca-Index ist eine einfache europäische Berechnung. Durch den Vergleich aller fünf erhalten Sie einen realistischen Bereich anstatt einer einzelnen potenziell irreführenden Zahl. Alle Formeln verwenden das gleiche Grundkonzept: ein Startgewicht für 1,50m Größe, plus ein Zuwachs für jeden zusätzlichen Zentimeter."
        },
        "considerations": {
          "title": "Wichtige Überlegungen",
          "items": [
            {
              "text": "IBW-Formeln berücksichtigen keine Muskelmasse - Athleten können IBW gesund überschreiten",
              "type": "warning"
            },
            {
              "text": "Körperrahmengröße beeinflusst das optimale Gewicht erheblich - verwenden Sie Handgelenkmessung für Genauigkeit",
              "type": "info"
            },
            {
              "text": "Das Alter beeinflusst die Körperzusammensetzung, aber nicht die traditionellen IBW-Formeln",
              "type": "info"
            },
            {
              "text": "Diese Formeln wurden hauptsächlich an kaukasischen Populationen entwickelt",
              "type": "warning"
            },
            {
              "text": "Gesundheitswerte wie Blutdruck und Cholesterin sind wichtiger als das Gewicht allein",
              "type": "info"
            },
            {
              "text": "Nachhaltiger Gewichtsverlust beträgt maximal 0,5-1 kg pro Woche",
              "type": "warning"
            }
          ]
        },
        "frameSize": {
          "title": "Körperrahmen-Größenleitfaden",
          "items": [
            {
              "text": "Kleiner Rahmen: Handgelenk < 16,5 cm (Männer) oder < 15,2 cm (Frauen) - 10% vom IBW abziehen",
              "type": "info"
            },
            {
              "text": "Mittlerer Rahmen: Handgelenk 16,5-19 cm (Männer) oder 15,2-15,9 cm (Frauen) - Standard-IBW verwenden",
              "type": "info"
            },
            {
              "text": "Großer Rahmen: Handgelenk > 19 cm (Männer) oder > 15,9 cm (Frauen) - 10% zum IBW addieren",
              "type": "info"
            },
            {
              "text": "Messen Sie Ihr Handgelenk direkt unterhalb des Handgelenkknochens an der schmalsten Stelle",
              "type": "info"
            },
            {
              "text": "Rahmengröße spiegelt die Knochenstruktur wider, nicht Fett oder Muskeln",
              "type": "info"
            },
            {
              "text": "Personen mit größerem Rahmen wiegen natürlich mehr bei gleicher Größe",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Berechnungsbeispiele",
          "description": "Schritt-für-Schritt IBW-Berechnungen mit verschiedenen Formeln",
          "examples": [
            {
              "title": "Mann 1,78m (178 cm)",
              "steps": [
                "Devine: 50 + 2,3 × (178 - 152,4)/2,54 = 50 + 23 = 73 kg",
                "Robinson: 52 + 1,9 × (178 - 152,4)/2,54 = 52 + 19 = 71 kg",
                "Miller: 56,2 + 1,41 × (178 - 152,4)/2,54 = 56,2 + 14,1 = 70,3 kg",
                "Hamwi: 48 + 2,7 × (178 - 152,4)/2,54 = 48 + 27 = 75 kg"
              ],
              "result": "Bereich: 70-75 kg"
            },
            {
              "title": "Frau 1,65m (165 cm)",
              "steps": [
                "Devine: 45,5 + 2,3 × (165 - 152,4)/2,54 = 45,5 + 11,5 = 57 kg",
                "Robinson: 49 + 1,7 × (165 - 152,4)/2,54 = 49 + 8,5 = 57,5 kg",
                "Miller: 53,1 + 1,36 × (165 - 152,4)/2,54 = 53,1 + 6,8 = 59,9 kg",
                "Hamwi: 45,5 + 2,2 × (165 - 152,4)/2,54 = 45,5 + 11 = 56,5 kg"
              ],
              "result": "Bereich: 56,5-60 kg"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Welche Idealgewicht-Formel ist am genauesten?",
          "answer": "Keine einzelne Formel ist universell genau. Die Devine-Formel (1974) wird am häufigsten in klinischen Umgebungen verwendet und ist unsere Hauptempfehlung. Durch den Vergleich aller fünf Formeln erhalten Sie jedoch einen realistischen Bereich. Individuelle Faktoren wie Muskelmasse, Knochendichte und Fettverteilung bedeuten, dass Ihr optimales Gewicht überall in diesem Bereich liegen kann - oder sogar leicht außerhalb, während Sie trotzdem gesund sind."
        },
        {
          "question": "Wie beeinflusst die Körperrahmengröße das Idealgewicht?",
          "answer": "Die Körperrahmengröße, bestimmt durch die Knochenstruktur, beeinflusst Ihr optimales Gewicht erheblich. Personen mit größeren Rahmen haben natürlich schwerere Knochen und können gesund mehr Gewicht tragen. Das Idealgewicht einer Person mit großem Rahmen kann 10% höher sein als Standardformeln vorschlagen, während kleinrahmige Personen ein Idealgewicht haben können, das 10% niedriger ist. Messen Sie Ihren Handgelenkumfang, um Ihre Rahmengröße zu bestimmen."
        },
        {
          "question": "Warum wiege ich mehr als mein 'ideales' Gewicht, sehe aber fit aus?",
          "answer": "IBW-Formeln unterscheiden nicht zwischen Muskel und Fett. Muskeln sind dichter als Fett, daher überschreiten muskulöse Personen oft ihr berechnetes IBW, während sie eine gesunde Körperzusammensetzung haben. Dies ist besonders häufig bei Athleten und regelmäßigen Trainierenden. Körperfettanteil und Gesundheitswerte wie Blutdruck sind bessere Gesundheitsindikatoren als das Gewicht allein."
        },
        {
          "question": "Wie wird der Körperfettanteil aus dem BMI geschätzt?",
          "answer": "Wir verwenden die Deurenberg-Formel: Körperfett % = (1,20 × BMI) + (0,23 × Alter) - (10,8 × Geschlecht) - 5,4, wobei Geschlecht 1 für Männer und 0 für Frauen ist. Dies bietet eine Schätzung basierend auf Bevölkerungsdurchschnitten, berücksichtigt aber keine individuelle Variation in der Muskelmasse. Für genaue Körperfettmessungen erwägen Sie DEXA-Scans oder hydrostatisches Wiegen."
        },
        {
          "question": "Wie schnell sollte ich versuchen, mein Idealgewicht zu erreichen?",
          "answer": "Sicherer, nachhaltiger Gewichtsverlust beträgt 0,5-1 kg pro Woche. Schnellerer Verlust führt oft zu Muskelverlust und metabolischer Anpassung, wodurch Gewichtszunahme wahrscheinlicher wird. Wenn Sie 10 kg verlieren müssen, erwarten Sie 10-20 Wochen. Konzentrieren Sie sich auf allmähliche Lebensstiländerungen anstatt extreme Diäten. Gewichtszunahme (für Untergewichtige) sollte ebenfalls allmählich erfolgen, etwa 0,25-0,5 kg pro Woche."
        },
        {
          "question": "Ändern sich Idealgewicht-Empfehlungen mit dem Alter?",
          "answer": "Traditionelle IBW-Formeln passen sich nicht an das Alter an, aber Forschung deutet darauf hin, dass ein leicht höherer BMI (bis zu 27) für Erwachsene über 65 akzeptabel sein kann, da etwas zusätzliches Gewicht schützend gegen Krankheiten sein kann. Unsere Körperfettschätzung berücksichtigt das Alter, da sich die Körperzusammensetzung natürlich zu einem höheren Fettanteil verschiebt, wenn wir altern, selbst bei gleichem Gewicht."
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

  inputs: [
    // Unit system
    { id: "unitSystem", type: "radio", defaultValue: "imperial", options: [{ value: "metric" }, { value: "imperial" }] },
    
    // Gender
    { id: "gender", type: "radio", defaultValue: "male", options: [{ value: "male" }, { value: "female" }] },
    
    // Age
    { id: "age", type: "number", defaultValue: 30, min: 18, max: 100, step: 1, suffix: "years" },
    
    // Height - Metric
    { id: "heightCm", type: "number", defaultValue: 175, min: 120, max: 230, step: 1, suffix: "cm", showWhen: { field: "unitSystem", value: "metric" } },
    
    // Height - Imperial (side by side)
    { id: "heightFt", type: "number", width: "half", defaultValue: 5, min: 4, max: 7, step: 1, suffix: "ft", showWhen: { field: "unitSystem", value: "imperial" } },
    { id: "heightIn", type: "number", width: "half", defaultValue: 10, min: 0, max: 11, step: 1, suffix: "in", showWhen: { field: "unitSystem", value: "imperial" } },
    
    // Current Weight
    { id: "currentWeightKg", type: "number", defaultValue: 80, min: 30, max: 250, step: 0.5, suffix: "kg", showWhen: { field: "unitSystem", value: "metric" } },
    { id: "currentWeight", type: "number", defaultValue: 180, min: 70, max: 550, step: 1, suffix: "lbs", showWhen: { field: "unitSystem", value: "imperial" } },
    
    // Body Frame option
    { id: "includeFrame", type: "radio", defaultValue: "no", options: [{ value: "no" }, { value: "yes" }] },
    
    // Wrist measurement (conditional)
    { id: "wristCm", type: "number", defaultValue: 17, min: 12, max: 25, step: 0.5, suffix: "cm", showWhen: { field: "includeFrame", value: "yes" } },
    { id: "wristIn", type: "number", defaultValue: 7, min: 5, max: 10, step: 0.25, suffix: "in", showWhen: { field: "includeFrame", value: "yes" } },
  ],

  inputGroups: [],

  results: [
    { id: "idealDevine", type: "primary", format: "number" },
    { id: "formulaRange", type: "secondary", format: "text" },
    { id: "idealRobinson", type: "secondary", format: "number" },
    { id: "idealMiller", type: "secondary", format: "number" },
    { id: "idealHamwi", type: "secondary", format: "number" },
    { id: "bmiRange", type: "secondary", format: "text" },
    { id: "bodyFrame", type: "secondary", format: "text" },
    { id: "bodyFatEstimate", type: "secondary", format: "percent" },
    { id: "weightDifference", type: "secondary", format: "text" },
    { id: "timeToGoal", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "formulas", type: "list", icon: "📊", itemCount: 4 },
    { id: "metrics", type: "list", icon: "🎯", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "formulas", type: "prose", icon: "⚖️" },
    { id: "considerations", type: "list", icon: "⚠️", itemCount: 6 },
    { id: "frameSize", type: "list", icon: "📏", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "Devine BJ", year: "1974", title: "Gentamicin therapy", source: "Drug Intelligence & Clinical Pharmacy", url: "https://pubmed.ncbi.nlm.nih.gov/4853855/" },
    { authors: "Robinson JD, Lupkiewicz SM, Palenik L, Lopez LM, Ariet M", year: "1983", title: "Determination of ideal body weight for drug dosage calculations", source: "American Journal of Hospital Pharmacy", url: "https://pubmed.ncbi.nlm.nih.gov/6869387/" },
  ],

  hero: { badge: "Health", rating: { average: 4.8, count: 12500 } },
  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "health" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["bmi-calculator", "body-fat-calculator", "calorie-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// ============================================================================
// CALCULATE FUNCTION
// ============================================================================

export function calculateIdealWeight(data: {
  values: Record<string, unknown>;
  units?: Record<string, string>;
  unitSystem?: "metric" | "imperial";
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;

  // Get translations
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // Read inputs
  const unitSystem = values.unitSystem as string;
  const gender = values.gender as string;
  const age = values.age as number;
  const includeFrame = values.includeFrame as string;

  // Convert to standard units
  let heightCm: number;
  let heightIn: number;
  let currentWeightKg: number;
  let wristCm: number | null = null;

  if (unitSystem === "metric") {
    heightCm = values.heightCm as number;
    heightIn = heightCm / 2.54;
    currentWeightKg = values.currentWeightKg as number;
    if (includeFrame === "yes") {
      wristCm = values.wristCm as number;
    }
  } else {
    const heightFt = values.heightFt as number;
    const heightInPart = values.heightIn as number;
    heightIn = heightFt * 12 + heightInPart;
    heightCm = heightIn * 2.54;
    currentWeightKg = (values.currentWeight as number) * 0.453592;
    if (includeFrame === "yes") {
      wristCm = (values.wristIn as number) * 2.54;
    }
  }

  // Calculate inches over 5 feet (60 inches)
  const inchesOver60 = Math.max(0, heightIn - 60);

  // ============================================================================
  // IBW FORMULAS (all in kg)
  // ============================================================================
  
  let idealDevine: number;
  let idealRobinson: number;
  let idealMiller: number;
  let idealHamwi: number;
  let idealBroca: number;

  if (gender === "male") {
    idealDevine = 50 + 2.3 * inchesOver60;
    idealRobinson = 52 + 1.9 * inchesOver60;
    idealMiller = 56.2 + 1.41 * inchesOver60;
    idealHamwi = 48 + 2.7 * inchesOver60;
    idealBroca = heightCm - 100;
  } else {
    idealDevine = 45.5 + 2.3 * inchesOver60;
    idealRobinson = 49 + 1.7 * inchesOver60;
    idealMiller = 53.1 + 1.36 * inchesOver60;
    idealHamwi = 45.5 + 2.2 * inchesOver60;
    idealBroca = heightCm - 105;
  }

  // ============================================================================
  // BODY FRAME SIZE
  // ============================================================================
  
  let frameSize = "Medium";
  let frameAdjustment = 1.0;
  const wristIn = wristCm ? wristCm / 2.54 : null;

  if (wristCm !== null && wristIn !== null) {
    if (gender === "male") {
      if (wristIn < 6.5) {
        frameSize = "Small";
        frameAdjustment = 0.9;
      } else if (wristIn > 7.5) {
        frameSize = "Large";
        frameAdjustment = 1.1;
      }
    } else {
      if (wristIn < 6.0) {
        frameSize = "Small";
        frameAdjustment = 0.9;
      } else if (wristIn > 6.25) {
        frameSize = "Large";
        frameAdjustment = 1.1;
      }
    }

    // Apply frame adjustment
    idealDevine *= frameAdjustment;
    idealRobinson *= frameAdjustment;
    idealMiller *= frameAdjustment;
    idealHamwi *= frameAdjustment;
    idealBroca *= frameAdjustment;
  }

  // ============================================================================
  // FORMULA RANGE
  // ============================================================================
  
  const allFormulas = [idealDevine, idealRobinson, idealMiller, idealHamwi];
  const minIdeal = Math.min(...allFormulas);
  const maxIdeal = Math.max(...allFormulas);

  // ============================================================================
  // BMI RANGE (18.5 - 24.9)
  // ============================================================================
  
  const heightM = heightCm / 100;
  const bmiMinWeight = 18.5 * heightM * heightM;
  const bmiMaxWeight = 24.9 * heightM * heightM;

  // ============================================================================
  // BODY FAT ESTIMATE (Deurenberg)
  // ============================================================================
  
  const currentBMI = currentWeightKg / (heightM * heightM);
  const genderFactor = gender === "male" ? 1 : 0;
  let bodyFatPercent = (1.20 * currentBMI) + (0.23 * age) - (10.8 * genderFactor) - 5.4;
  bodyFatPercent = Math.max(3, Math.min(60, bodyFatPercent));

  // ============================================================================
  // WEIGHT DIFFERENCE & TIME TO GOAL
  // ============================================================================
  
  const weightDiffKg = currentWeightKg - idealDevine;
  const weightDiffAbs = Math.abs(weightDiffKg);
  const weeksToGoal = Math.ceil(weightDiffAbs / 0.5); // 0.5 kg per week

  // ============================================================================
  // FORMAT OUTPUT
  // ============================================================================
  
  const weightUnit = v["kg"] || "kg";
  const lbsUnit = v["lbs"] || "lbs";
  const weeksLabel = weeksToGoal === 1 ? (v["week"] || "week") : (v["weeks"] || "weeks");
  const toText = v["to"] || "to";
  const loseText = v["lose"] || "lose";
  const gainText = v["gain"] || "gain";
  const atGoalText = v["At goal"] || "At goal";
  const alreadyIdealText = v["Already at ideal"] || "Already at ideal weight";

  // Translate frame size
  const frameSizeTranslated = v[frameSize] || frameSize;

  // Format based on unit system
  let formattedDevine: string;
  let formattedRobinson: string;
  let formattedMiller: string;
  let formattedHamwi: string;
  let formattedRange: string;
  let formattedBmiRange: string;
  let formattedDiff: string;
  let action: string;

  if (unitSystem === "imperial") {
    const devineLbs = idealDevine * 2.20462;
    const robinsonLbs = idealRobinson * 2.20462;
    const millerLbs = idealMiller * 2.20462;
    const hamwiLbs = idealHamwi * 2.20462;
    const minLbs = minIdeal * 2.20462;
    const maxLbs = maxIdeal * 2.20462;
    const bmiMinLbs = bmiMinWeight * 2.20462;
    const bmiMaxLbs = bmiMaxWeight * 2.20462;
    const diffLbs = Math.abs(weightDiffKg * 2.20462);

    formattedDevine = `${Math.round(devineLbs)} ${lbsUnit}`;
    formattedRobinson = `${Math.round(robinsonLbs)} ${lbsUnit}`;
    formattedMiller = `${Math.round(millerLbs)} ${lbsUnit}`;
    formattedHamwi = `${Math.round(hamwiLbs)} ${lbsUnit}`;
    formattedRange = `${Math.round(minLbs)} ${toText} ${Math.round(maxLbs)} ${lbsUnit}`;
    formattedBmiRange = `${Math.round(bmiMinLbs)} ${toText} ${Math.round(bmiMaxLbs)} ${lbsUnit}`;
    
    if (diffLbs < 2) {
      formattedDiff = atGoalText;
      action = "";
    } else if (weightDiffKg > 0) {
      formattedDiff = `${loseText} ${Math.round(diffLbs)} ${lbsUnit}`;
      action = loseText;
    } else {
      formattedDiff = `${gainText} ${Math.round(diffLbs)} ${lbsUnit}`;
      action = gainText;
    }
  } else {
    formattedDevine = `${idealDevine.toFixed(1)} ${weightUnit}`;
    formattedRobinson = `${idealRobinson.toFixed(1)} ${weightUnit}`;
    formattedMiller = `${idealMiller.toFixed(1)} ${weightUnit}`;
    formattedHamwi = `${idealHamwi.toFixed(1)} ${weightUnit}`;
    formattedRange = `${minIdeal.toFixed(1)} ${toText} ${maxIdeal.toFixed(1)} ${weightUnit}`;
    formattedBmiRange = `${bmiMinWeight.toFixed(1)} ${toText} ${bmiMaxWeight.toFixed(1)} ${weightUnit}`;
    
    if (weightDiffAbs < 1) {
      formattedDiff = atGoalText;
      action = "";
    } else if (weightDiffKg > 0) {
      formattedDiff = `${loseText} ${weightDiffAbs.toFixed(1)} ${weightUnit}`;
      action = loseText;
    } else {
      formattedDiff = `${gainText} ${weightDiffAbs.toFixed(1)} ${weightUnit}`;
      action = gainText;
    }
  }

  // Time to goal
  const formattedTime = weightDiffAbs < 1 ? alreadyIdealText : `~${weeksToGoal} ${weeksLabel}`;

  // Summary
  const summaryTemplate = f.summary || "Your ideal weight is {idealDevine} (Devine formula). Range: {formulaRange}. {action} {weightDifference}.";
  const summary = summaryTemplate
    .replace("{idealDevine}", formattedDevine)
    .replace("{formulaRange}", formattedRange)
    .replace("{action}", action)
    .replace("{weightDifference}", formattedDiff);

  return {
    values: {
      idealDevine: idealDevine,
      idealRobinson: idealRobinson,
      idealMiller: idealMiller,
      idealHamwi: idealHamwi,
      idealBroca: idealBroca,
      formulaRange: `${minIdeal.toFixed(1)}-${maxIdeal.toFixed(1)}`,
      bmiRange: `${bmiMinWeight.toFixed(1)}-${bmiMaxWeight.toFixed(1)}`,
      bodyFrame: frameSize,
      bodyFatEstimate: bodyFatPercent,
      weightDifference: weightDiffKg,
      timeToGoal: weeksToGoal,
    },
    formatted: {
      idealDevine: formattedDevine,
      idealRobinson: formattedRobinson,
      idealMiller: formattedMiller,
      idealHamwi: formattedHamwi,
      idealBroca: unitSystem === "imperial" 
        ? `${Math.round(idealBroca * 2.20462)} ${lbsUnit}`
        : `${idealBroca.toFixed(1)} ${weightUnit}`,
      formulaRange: formattedRange,
      bmiRange: formattedBmiRange,
      bodyFrame: frameSizeTranslated,
      bodyFatEstimate: `${bodyFatPercent.toFixed(1)}%`,
      weightDifference: formattedDiff,
      timeToGoal: formattedTime,
    },
    summary,
    isValid: true,
  };
}

export default idealWeightConfig;
