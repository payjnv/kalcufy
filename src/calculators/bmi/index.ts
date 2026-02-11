import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// BMI CALCULATOR V4.3 — UPGRADED WITH TOGGLE + HIP MEASUREMENT
// ============================================================================
// V4.3 Upgrades:
// 1. 🔘 Toggle: "Include Waist & Hip Analysis" (showWhen hides waist/hip fields)
// 2. 🔘 Toggle: "Show Advanced Metrics" (controls extra results visibility)
// 3. ➕ NEW: Hip Circumference input → Waist-to-Hip Ratio (WHR)
// 4. ➕ NEW: Waist-to-Hip Ratio (WHR) result + risk assessment
// 5. ➕ NEW: Body Shape indicator (Apple/Pear/Avocado)
//
// Existing features preserved:
// - BMI + BMI Prime + Ponderal Index
// - Body Fat % estimate (Deurenberg formula)
// - Waist-to-Height Ratio (WHtR) + Abdominal Risk
// - Ethnic-Adjusted thresholds (Asian, Black, Middle Eastern)
// - Healthy Weight Range + Ideal Weight
// - BMI Gauge chart (composed stacked bars)
// - BMI-for-Age (teens 2-19, CDC percentiles)
// - DetailedTable: Weight Categories with ranges
// ============================================================================

export const bmiCalculatorConfig: CalculatorConfigV4 = {
  id: "bmi",
  version: "4.3",
  category: "health",
  icon: "⚖️",

  presets: [
    {
      id: "athleteMale",
      icon: "🏃",
      values: {
        gender: "male",
        age: 25,
        weight: 79.4,
        height: 177.8,
        ethnicity: "general",
        showWaistAnalysis: false,
        showAdvanced: false,
      },
    },
    {
      id: "averageFemale",
      icon: "👩",
      values: {
        gender: "female",
        age: 35,
        weight: 68.0,
        height: 165.1,
        ethnicity: "general",
        showWaistAnalysis: false,
        showAdvanced: false,
      },
    },
    {
      id: "fullAnalysis",
      icon: "📊",
      values: {
        gender: "male",
        age: 40,
        weight: 88.5,
        height: 177.8,
        ethnicity: "general",
        showWaistAnalysis: true,
        showAdvanced: true,
        waist: 96.5,
        hip: 101.6,
      },
    },
    {
      id: "asianFemale",
      icon: "👩‍⚕️",
      values: {
        gender: "female",
        age: 30,
        weight: 56.7,
        height: 160.0,
        ethnicity: "asian",
        showWaistAnalysis: true,
        showAdvanced: false,
        waist: 71.1,
        hip: 88.9,
      },
    },
  ],

  t: {
    en: {
      name: "BMI Calculator",
      slug: "bmi-calculator",
      subtitle:
        "Calculate your Body Mass Index, waist-to-height ratio, body fat percentage, and healthy weight range with ethnic-specific thresholds and personalized insights",
      breadcrumb: "BMI",

      seo: {
        title: "BMI Calculator - Body Mass Index, Body Fat & WHR | Free Tool",
        description:
          "Calculate your BMI, body fat percentage, waist-to-height ratio, waist-to-hip ratio, and healthy weight range. Includes ethnic-specific thresholds for Asian, Black, and Middle Eastern populations. Free instant results.",
        shortDescription:
          "Calculate BMI with body fat estimate, waist-to-hip ratio, and ethnic-specific thresholds",
        keywords: [
          "bmi calculator",
          "body mass index calculator",
          "bmi calculator for teens",
          "bmi chart",
          "healthy weight calculator",
          "free bmi calculator",
          "bmi for age calculator",
          "body fat percentage calculator",
          "waist to hip ratio calculator",
          "waist to height ratio",
        ],
      },

      calculator: { yourInformation: "Your Measurements" },
      ui: {
        yourInformation: "Your Measurements",
        calculate: "Calculate BMI",
        reset: "Reset",
        results: "Your Results",
      },

      inputs: {
        gender: {
          label: "Gender",
          helpText: "Used for body fat estimation and BMI-for-age percentiles",
          options: { male: "Male", female: "Female" },
        },
        age: {
          label: "Age",
          helpText: "Ages 2-19 use CDC BMI-for-age percentiles; adults use standard BMI",
        },
        weight: {
          label: "Weight",
          helpText: "Your current body weight",
        },
        height: {
          label: "Height",
          helpText: "Your height",
        },
        ethnicity: {
          label: "Ethnic Background",
          helpText:
            "BMI thresholds vary by ethnicity — Asian populations have lower overweight/obesity cutoffs",
          options: {
            general: "General (White/European/African)",
            asian: "Asian (East/South/Southeast Asian)",
            black: "Black (African/Caribbean)",
            middleEastern: "Middle Eastern",
          },
        },
        showWaistAnalysis: {
          label: "Include Waist & Hip Analysis",
          helpText: "Add waist and hip measurements for more accurate health risk assessment",
        },
        waist: {
          label: "Waist Circumference",
          helpText:
            "Measure at narrowest point above belly button",
        },
        hip: {
          label: "Hip Circumference",
          helpText:
            "Measure at widest point of buttocks",
        },
        showAdvanced: {
          label: "Show Advanced Metrics",
          helpText: "Display BMI Prime, Ponderal Index, and body fat percentage",
        },
      },

      results: {
        bmi: { label: "BMI" },
        category: { label: "Category" },
        ethnicCategory: { label: "Ethnic-Adjusted Category" },
        healthyRange: { label: "Healthy Weight Range" },
        idealWeight: { label: "Ideal Weight" },
        weightChange: { label: "Weight Change Needed" },
        bmiPrime: { label: "BMI Prime" },
        ponderalIndex: { label: "Ponderal Index" },
        bodyFatPercent: { label: "Body Fat %" },
        waistToHeight: { label: "Waist-to-Height Ratio" },
        waistRisk: { label: "WHtR Risk Level" },
        waistToHip: { label: "Waist-to-Hip Ratio" },
        waistToHipRisk: { label: "WHR Risk Level" },
        bodyShape: { label: "Body Shape" },
        percentile: { label: "BMI Percentile (Age)" },
        ageCategory: { label: "Age Category" },
      },

      presets: {
        athleteMale: {
          label: "Athlete Male",
          description: "25y male, 175 lbs, 5'10\"",
        },
        averageFemale: {
          label: "Average Female",
          description: "35y female, 150 lbs, 5'5\"",
        },
        fullAnalysis: {
          label: "Full Analysis",
          description: "40y male with waist & hip data",
        },
        asianFemale: {
          label: "Asian Female",
          description: "30y, ethnic-adjusted thresholds",
        },
      },

      values: {
        "kg/m²": "kg/m²",
        "kg/m³": "kg/m³",
        lbs: "lbs",
        kg: "kg",
        in: "in",
        cm: "cm",
        years: "years",
      },

      formats: {
        summary:
          "Your BMI is {bmi} kg/m², classified as {category}. Healthy weight range: {healthyRange}.",
      },

      infoCards: {
        metrics: {
          title: "🎯 Weight Goals",
          items: [
            { label: "Healthy Range", valueKey: "healthyRange" },
            { label: "Weight Change", valueKey: "weightChange" },
            { label: "Ideal Weight", valueKey: "idealWeight" },
          ],
        },
        waist: {
          title: "📏 Body Shape Analysis",
          items: [
            { label: "Waist-to-Height Ratio", valueKey: "waistToHeight" },
            { label: "Waist-to-Hip Ratio", valueKey: "waistToHip" },
            { label: "Body Shape", valueKey: "bodyShape" },
          ],
        },
        tips: {
          title: "Quick Tips",
          items: [
            "Weigh yourself in the morning before eating for consistent results",
            "BMI doesn't distinguish muscle from fat — athletes may score higher",
            "Waist-to-height ratio should be less than 0.5 (waist < half your height)",
            "Asian populations have higher health risks at lower BMI — use ethnic setting",
          ],
        },
      },

      detailedTable: {
        weightCategories: {
          button: "View Weight Categories Table",
          title: "BMI Weight Categories",
          columns: {
            category: "Category",
            bmiRange: "BMI Range",
            riskLevel: "Health Risk",
            yourWeight: "Your Weight Range",
          },
        },
      },

      chart: {
        title: "BMI Scale",
        xLabel: "",
        yLabel: "BMI (kg/m²)",
        series: {
          underweight: "Underweight",
          normal: "Normal",
          overweight: "Overweight",
          obese1: "Obese I",
          obese2: "Obese II",
          obese3: "Obese III",
          marker: "Your BMI",
        },
      },

      education: {
        whatIs: {
          title: "What is BMI?",
          content:
            "Body Mass Index (BMI) is a simple calculation using your height and weight to estimate whether you're at a healthy weight. The formula divides weight in kilograms by height in meters squared (kg/m²). Developed by Belgian mathematician Adolphe Quetelet in the 1830s, BMI has become the most widely used screening tool for weight classification worldwide. While it doesn't directly measure body fat, it correlates with more direct measures of body fat and serves as an inexpensive, easy-to-perform method of screening for weight categories that may lead to health problems. The World Health Organization (WHO) and most national health agencies use BMI as the primary classification system for underweight, normal weight, overweight, and obesity in adults.",
        },
        howItWorks: {
          title: "How BMI is Calculated",
          content:
            "The BMI formula is straightforward: BMI = weight (kg) ÷ height² (m²). For example, a person weighing 70 kg who is 1.75 m tall has a BMI of 70 ÷ (1.75 × 1.75) = 22.9 kg/m². For children and teens aged 2-19, BMI is calculated the same way but interpreted differently using age- and sex-specific percentile charts from the CDC. A child's BMI percentile shows how their BMI compares to other children of the same age and sex. This calculator also computes several additional metrics: BMI Prime (ratio of your BMI to 25, where values under 1.0 are normal weight), Ponderal Index (a height-independent measure of leanness), estimated body fat percentage using the Deurenberg formula, and waist-to-height ratio for abdominal fat assessment.",
        },
        considerations: {
          title: "BMI Limitations & Considerations",
          items: [
            {
              text: "BMI doesn't distinguish between muscle mass, bone density, and fat — muscular athletes may be classified as overweight despite low body fat",
              type: "warning",
            },
            {
              text: "Ethnic variations matter: Asian populations face higher health risks at lower BMI values (overweight starts at 23 vs 25 for general population)",
              type: "info",
            },
            {
              text: "Older adults may benefit from a slightly higher BMI (25-27) as mild overweight is associated with lower mortality after age 65",
              type: "info",
            },
            {
              text: "BMI underestimates body fat in people who have lost muscle mass and overestimates it in athletes and highly active individuals",
              type: "warning",
            },
            {
              text: "Waist-to-height ratio is a better predictor of cardiovascular risk than BMI alone — aim for waist less than half your height",
              type: "info",
            },
            {
              text: "Waist-to-hip ratio (WHR) helps identify 'apple' vs 'pear' body shapes — apple shapes carry higher cardiovascular risk",
              type: "info",
            },
          ],
        },
        categories: {
          title: "WHO BMI Categories",
          items: [
            {
              text: "Underweight (< 18.5): Associated with malnutrition, osteoporosis, weakened immune system, and fertility issues",
              type: "warning",
            },
            {
              text: "Normal weight (18.5 - 24.9): Lowest overall health risk; associated with best long-term health outcomes",
              type: "info",
            },
            {
              text: "Overweight (25 - 29.9): Increased risk of type 2 diabetes, hypertension, and cardiovascular disease",
              type: "warning",
            },
            {
              text: "Obese Class I (30 - 34.9): Significantly elevated risk of heart disease, diabetes, sleep apnea, and certain cancers",
              type: "warning",
            },
            {
              text: "Obese Class II (35 - 39.9): High risk of serious health complications; medical intervention often recommended",
              type: "warning",
            },
            {
              text: "Obese Class III (40+): Highest risk category; associated with severely reduced life expectancy and quality of life",
              type: "warning",
            },
          ],
        },
        examples: {
          title: "BMI Calculation Examples",
          description: "Step-by-step calculations for different body types",
          examples: [
            {
              title: "Adult Male — 180 lbs, 5'10\"",
              steps: [
                "Convert: 180 lbs ÷ 2.205 = 81.6 kg",
                "Convert: 5'10\" = 70 in × 0.0254 = 1.778 m",
                "BMI = 81.6 ÷ (1.778²) = 81.6 ÷ 3.161 = 25.8",
                "Category: Overweight (25.0 - 29.9)",
                "BMI Prime: 25.8 ÷ 25 = 1.03 (3% above normal)",
                "Healthy range: 128.9 - 174.2 lbs",
              ],
              result: "BMI 25.8 — Overweight. Lose ~6 lbs to reach normal range.",
            },
            {
              title: "Teen Girl — 14 years, 120 lbs, 5'4\"",
              steps: [
                "Convert: 120 lbs = 54.4 kg, 5'4\" = 1.63 m",
                "BMI = 54.4 ÷ (1.63²) = 54.4 ÷ 2.657 = 20.5",
                "Look up CDC percentile for 14y female, BMI 20.5",
                "Percentile: ~62nd (between 50th and 85th)",
                "Age Category: Normal weight",
              ],
              result:
                "BMI 20.5 — 62nd percentile — Normal weight for a 14-year-old girl.",
            },
          ],
        },
      },

      faqs: [
        {
          question: "What is a healthy BMI range?",
          answer:
            "For adults, a healthy BMI is between 18.5 and 24.9 kg/m². However, this range may vary by ethnicity. For Asian populations, the healthy range is 18.5 to 22.9, as health risks increase at lower BMI values. For people over 65, a BMI of 25-27 may actually be associated with better health outcomes. Children and teens use age-specific percentile charts rather than fixed ranges.",
        },
        {
          question: "How accurate is BMI as a health indicator?",
          answer:
            "BMI is a useful screening tool but has limitations. It doesn't distinguish between muscle and fat, so athletes with high muscle mass may be classified as overweight despite being very fit. Similarly, older adults who have lost muscle mass may have a 'normal' BMI but carry excess fat. For a more complete picture, combine BMI with waist circumference, body fat percentage, and blood markers. This calculator provides several of these additional metrics.",
        },
        {
          question: "Why does this calculator ask for ethnic background?",
          answer:
            "Research shows that BMI-related health risks vary significantly across ethnic groups. Asian populations (East, South, and Southeast Asian) face higher risks of type 2 diabetes and cardiovascular disease at lower BMI values. The WHO recommends using a lower overweight threshold of BMI 23 (instead of 25) for Asian populations. The NHS in the UK also adjusts thresholds for Black and Middle Eastern populations.",
        },
        {
          question: "What is waist-to-hip ratio and why does it matter?",
          answer:
            "Waist-to-hip ratio (WHR) divides your waist circumference by your hip circumference. The WHO defines abdominal obesity as WHR above 0.90 for males and above 0.85 for females. WHR is a better predictor of cardiovascular disease than BMI alone because it specifically measures abdominal fat distribution. People with 'apple-shaped' bodies (high WHR) face greater health risks than those with 'pear-shaped' bodies (low WHR).",
        },
        {
          question: "What is waist-to-height ratio and how is it different?",
          answer:
            "Waist-to-height ratio (WHtR) divides your waist circumference by your height. A ratio above 0.5 indicates elevated risk of cardiovascular disease, type 2 diabetes, and metabolic syndrome. Research suggests WHtR is a better predictor of health risks than BMI alone because it specifically measures abdominal fat, which is more metabolically dangerous than fat stored in other areas.",
        },
        {
          question:
            "What is BMI Prime and how is it different from regular BMI?",
          answer:
            "BMI Prime is simply your BMI divided by 25 (the upper limit of the normal range). A BMI Prime of 1.0 means you're exactly at the threshold between normal and overweight. Values below 1.0 are normal weight, and above 1.0 are overweight. It's useful because it gives you a quick sense of how far above or below the normal threshold you are — for example, a BMI Prime of 1.10 means you're 10% above the normal limit.",
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
        calculate: "Calculate BMI",
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
        mobileResults: "Results",
        closeModal: "Close",
        openMenu: "Menu",
      },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Calculadora de IMC",
      "slug": "calculadora-indice-masa-corporal",
      "subtitle": "Calcula tu Índice de Masa Corporal, relación cintura-altura, porcentaje de grasa corporal y rango de peso saludable con umbrales específicos por etnia e información personalizada",
      "breadcrumb": "IMC",
      "seo": {
        "title": "Calculadora de IMC - Índice de Masa Corporal, Grasa Corporal y RCA | Herramienta Gratuita",
        "description": "Calcula tu IMC, porcentaje de grasa corporal, relación cintura-altura, relación cintura-cadera y rango de peso saludable. Incluye umbrales específicos por etnia para poblaciones asiáticas, negras y de Oriente Medio. Resultados instantáneos gratuitos.",
        "shortDescription": "Calcula el IMC con estimación de grasa corporal, relación cintura-cadera y umbrales específicos por etnia",
        "keywords": [
          "calculadora imc",
          "calculadora índice masa corporal",
          "calculadora imc adolescentes",
          "tabla imc",
          "calculadora peso saludable",
          "calculadora imc gratis",
          "calculadora imc por edad",
          "calculadora porcentaje grasa corporal",
          "calculadora relación cintura cadera",
          "relación cintura altura"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "gender": {
          "label": "Sexo",
          "helpText": "Utilizado para la estimación de grasa corporal y percentiles de IMC por edad",
          "options": {
            "male": "Hombre",
            "female": "Mujer"
          }
        },
        "age": {
          "label": "Edad",
          "helpText": "Las edades de 2-19 usan percentiles de IMC por edad de los CDC; los adultos usan IMC estándar"
        },
        "weight": {
          "label": "Peso",
          "helpText": "Tu peso corporal actual"
        },
        "height": {
          "label": "Altura",
          "helpText": "Tu estatura"
        },
        "ethnicity": {
          "label": "Origen Étnico",
          "helpText": "Los umbrales de IMC varían según la etnia — las poblaciones asiáticas tienen puntos de corte más bajos para sobrepeso/obesidad",
          "options": {
            "general": "General (Caucásico/Europeo/Africano)",
            "asian": "Asiático (Este/Sur/Sudeste Asiático)",
            "black": "Negro (Africano/Caribeño)",
            "middleEastern": "Oriente Medio"
          }
        },
        "showWaistAnalysis": {
          "label": "Incluir Análisis de Cintura y Cadera",
          "helpText": "Agregar medidas de cintura y cadera para una evaluación más precisa del riesgo de salud"
        },
        "waist": {
          "label": "Circunferencia de Cintura",
          "helpText": "Mide en el punto más estrecho por encima del ombligo"
        },
        "hip": {
          "label": "Circunferencia de Cadera",
          "helpText": "Mide en el punto más ancho de los glúteos"
        },
        "showAdvanced": {
          "label": "Mostrar Métricas Avanzadas",
          "helpText": "Mostrar IMC Prime, Índice Ponderal y porcentaje de grasa corporal"
        }
      },
      "results": {
        "bmi": {
          "label": "IMC"
        },
        "category": {
          "label": "Categoría"
        },
        "ethnicCategory": {
          "label": "Categoría Ajustada por Etnia"
        },
        "healthyRange": {
          "label": "Rango de Peso Saludable"
        },
        "idealWeight": {
          "label": "Peso Ideal"
        },
        "weightChange": {
          "label": "Cambio de Peso Necesario"
        },
        "bmiPrime": {
          "label": "IMC Prime"
        },
        "ponderalIndex": {
          "label": "Índice Ponderal"
        },
        "bodyFatPercent": {
          "label": "% Grasa Corporal"
        },
        "waistToHeight": {
          "label": "Relación Cintura-Altura"
        },
        "waistRisk": {
          "label": "Nivel de Riesgo RCA"
        },
        "waistToHip": {
          "label": "Relación Cintura-Cadera"
        },
        "waistToHipRisk": {
          "label": "Nivel de Riesgo RCC"
        },
        "bodyShape": {
          "label": "Forma Corporal"
        },
        "percentile": {
          "label": "Percentil IMC (Edad)"
        },
        "ageCategory": {
          "label": "Categoría por Edad"
        }
      },
      "presets": {
        "athleteMale": {
          "label": "Atleta Masculino",
          "description": "Hombre 25a, 79 kg, 1.78m"
        },
        "averageFemale": {
          "label": "Mujer Promedio",
          "description": "Mujer 35a, 68 kg, 1.65m"
        },
        "fullAnalysis": {
          "label": "Análisis Completo",
          "description": "Hombre 40a con datos de cintura y cadera"
        },
        "asianFemale": {
          "label": "Mujer Asiática",
          "description": "30a, umbrales ajustados por etnia"
        }
      },
      "values": {
        "kg/m²": "kg/m²",
        "kg/m³": "kg/m³",
        "lbs": "lbs",
        "kg": "kg",
        "in": "in",
        "cm": "cm",
        "years": "años"
      },
      "formats": {
        "summary": "Tu IMC es {bmi} kg/m², clasificado como {category}. Rango de peso saludable: {healthyRange}."
      },
      "infoCards": {
        "metrics": {
          "title": "🎯 Objetivos de Peso",
          "items": [
            {
              "label": "Rango Saludable",
              "valueKey": "healthyRange"
            },
            {
              "label": "Cambio de Peso",
              "valueKey": "weightChange"
            },
            {
              "label": "Peso Ideal",
              "valueKey": "idealWeight"
            }
          ]
        },
        "waist": {
          "title": "📏 Análisis de Forma Corporal",
          "items": [
            {
              "label": "Relación Cintura-Altura",
              "valueKey": "waistToHeight"
            },
            {
              "label": "Relación Cintura-Cadera",
              "valueKey": "waistToHip"
            },
            {
              "label": "Forma Corporal",
              "valueKey": "bodyShape"
            }
          ]
        },
        "tips": {
          "title": "Consejos Rápidos",
          "items": [
            "Pésate por la mañana antes de comer para obtener resultados consistentes",
            "El IMC no distingue entre músculo y grasa — los atletas pueden obtener puntuaciones más altas",
            "La relación cintura-altura debe ser menor a 0.5 (cintura < mitad de tu altura)",
            "Las poblaciones asiáticas tienen mayores riesgos de salud con IMC más bajo — usa la configuración étnica"
          ]
        }
      },
      "detailedTable": {
        "weightCategories": {
          "button": "Ver Tabla de Categorías de Peso",
          "title": "Categorías de Peso por IMC",
          "columns": {
            "category": "Categoría",
            "bmiRange": "Rango de IMC",
            "riskLevel": "Riesgo de Salud",
            "yourWeight": "Tu Rango de Peso"
          }
        }
      },
      "chart": {
        "title": "Escala de IMC",
        "xLabel": "",
        "yLabel": "IMC (kg/m²)",
        "series": {
          "underweight": "Bajo peso",
          "normal": "Normal",
          "overweight": "Sobrepeso",
          "obese1": "Obesidad I",
          "obese2": "Obesidad II",
          "obese3": "Obesidad III",
          "marker": "Tu IMC"
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es el IMC?",
          "content": "El Índice de Masa Corporal (IMC) es un cálculo simple que usa tu altura y peso para estimar si tienes un peso saludable. La fórmula divide el peso en kilogramos por la altura en metros al cuadrado (kg/m²). Desarrollado por el matemático belga Adolphe Quetelet en la década de 1830, el IMC se ha convertido en la herramienta de detección más utilizada para la clasificación del peso en todo el mundo. Aunque no mide directamente la grasa corporal, se correlaciona con medidas más directas de grasa corporal y sirve como un método económico y fácil de realizar para detectar categorías de peso que pueden conducir a problemas de salud. La Organización Mundial de la Salud (OMS) y la mayoría de las agencias nacionales de salud usan el IMC como el sistema de clasificación principal para bajo peso, peso normal, sobrepeso y obesidad en adultos."
        },
        "howItWorks": {
          "title": "Cómo se Calcula el IMC",
          "content": "La fórmula del IMC es sencilla: IMC = peso (kg) ÷ altura² (m²). Por ejemplo, una persona que pesa 70 kg y mide 1.75 m tiene un IMC de 70 ÷ (1.75 × 1.75) = 22.9 kg/m². Para niños y adolescentes de 2-19 años, el IMC se calcula de la misma manera pero se interpreta de forma diferente usando tablas de percentiles específicas por edad y sexo de los CDC. El percentil de IMC de un niño muestra cómo su IMC se compara con otros niños de la misma edad y sexo. Esta calculadora también calcula varias métricas adicionales: IMC Prime (relación de tu IMC a 25, donde valores bajo 1.0 son peso normal), Índice Ponderal (una medida de delgadez independiente de la altura), porcentaje estimado de grasa corporal usando la fórmula de Deurenberg, y relación cintura-altura para evaluación de grasa abdominal."
        },
        "considerations": {
          "title": "Limitaciones y Consideraciones del IMC",
          "items": [
            {
              "text": "El IMC no distingue entre masa muscular, densidad ósea y grasa — atletas musculosos pueden ser clasificados como sobrepeso a pesar de tener poca grasa corporal",
              "type": "warning"
            },
            {
              "text": "Las variaciones étnicas importan: las poblaciones asiáticas enfrentan mayores riesgos de salud con valores de IMC más bajos (sobrepeso comienza en 23 vs 25 para la población general)",
              "type": "info"
            },
            {
              "text": "Los adultos mayores pueden beneficiarse de un IMC ligeramente más alto (25-27) ya que el sobrepeso leve se asocia con menor mortalidad después de los 65 años",
              "type": "info"
            },
            {
              "text": "El IMC subestima la grasa corporal en personas que han perdido masa muscular y la sobreestima en atletas e individuos muy activos",
              "type": "warning"
            },
            {
              "text": "La relación cintura-altura es un mejor predictor del riesgo cardiovascular que solo el IMC — busca que la cintura sea menos de la mitad de tu altura",
              "type": "info"
            },
            {
              "text": "La relación cintura-cadera (RCC) ayuda a identificar formas corporales 'manzana' vs 'pera' — las formas de manzana conllevan mayor riesgo cardiovascular",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Categorías de IMC de la OMS",
          "items": [
            {
              "text": "Bajo peso (< 18.5): Asociado con desnutrición, osteoporosis, sistema inmune debilitado y problemas de fertilidad",
              "type": "warning"
            },
            {
              "text": "Peso normal (18.5 - 24.9): Menor riesgo general de salud; asociado con los mejores resultados de salud a largo plazo",
              "type": "info"
            },
            {
              "text": "Sobrepeso (25 - 29.9): Riesgo aumentado de diabetes tipo 2, hipertensión y enfermedad cardiovascular",
              "type": "warning"
            },
            {
              "text": "Obesidad Clase I (30 - 34.9): Riesgo significativamente elevado de enfermedad cardíaca, diabetes, apnea del sueño y ciertos cánceres",
              "type": "warning"
            },
            {
              "text": "Obesidad Clase II (35 - 39.9): Alto riesgo de complicaciones graves de salud; a menudo se recomienda intervención médica",
              "type": "warning"
            },
            {
              "text": "Obesidad Clase III (40+): Categoría de mayor riesgo; asociada con esperanza de vida y calidad de vida severamente reducidas",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo de IMC",
          "description": "Cálculos paso a paso para diferentes tipos de cuerpo",
          "examples": [
            {
              "title": "Hombre Adulto — 82 kg, 1.78 m",
              "steps": [
                "Peso: 82 kg",
                "Altura: 1.78 m",
                "IMC = 82 ÷ (1.78²) = 82 ÷ 3.168 = 25.9",
                "Categoría: Sobrepeso (25.0 - 29.9)",
                "IMC Prime: 25.9 ÷ 25 = 1.04 (4% por encima de normal)",
                "Rango saludable: 58.4 - 79.0 kg"
              ],
              "result": "IMC 25.9 — Sobrepeso. Perder ~3 kg para alcanzar rango normal."
            },
            {
              "title": "Adolescente — 14 años, 54 kg, 1.63 m",
              "steps": [
                "Peso: 54 kg, Altura: 1.63 m",
                "IMC = 54 ÷ (1.63²) = 54 ÷ 2.657 = 20.3",
                "Buscar percentil CDC para mujer 14a, IMC 20.3",
                "Percentil: ~60º (entre 50º y 85º)",
                "Categoría por Edad: Peso normal"
              ],
              "result": "IMC 20.3 — Percentil 60 — Peso normal para una niña de 14 años."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuál es el rango de IMC saludable?",
          "answer": "Para adultos, un IMC saludable está entre 18.5 y 24.9 kg/m². Sin embargo, este rango puede variar según la etnia. Para poblaciones asiáticas, el rango saludable es 18.5 a 22.9, ya que los riesgos de salud aumentan con valores de IMC más bajos. Para personas mayores de 65, un IMC de 25-27 puede estar asociado con mejores resultados de salud. Los niños y adolescentes usan tablas de percentiles específicas por edad en lugar de rangos fijos."
        },
        {
          "question": "¿Qué tan preciso es el IMC como indicador de salud?",
          "answer": "El IMC es una herramienta de detección útil pero tiene limitaciones. No distingue entre músculo y grasa, por lo que atletas con alta masa muscular pueden ser clasificados como sobrepeso a pesar de estar muy en forma. Similarmente, adultos mayores que han perdido masa muscular pueden tener un IMC 'normal' pero tener exceso de grasa. Para una imagen más completa, combina el IMC con circunferencia de cintura, porcentaje de grasa corporal y marcadores sanguíneos. Esta calculadora proporciona varias de estas métricas adicionales."
        },
        {
          "question": "¿Por qué esta calculadora pregunta por el origen étnico?",
          "answer": "La investigación muestra que los riesgos de salud relacionados con el IMC varían significativamente entre grupos étnicos. Las poblaciones asiáticas (Este, Sur y Sudeste Asiático) enfrentan mayores riesgos de diabetes tipo 2 y enfermedad cardiovascular con valores de IMC más bajos. La OMS recomienda usar un umbral de sobrepeso más bajo de IMC 23 (en lugar de 25) para poblaciones asiáticas. El NHS en el Reino Unido también ajusta los umbrales para poblaciones negras y de Oriente Medio."
        },
        {
          "question": "¿Qué es la relación cintura-cadera y por qué importa?",
          "answer": "La relación cintura-cadera (RCC) divide tu circunferencia de cintura por tu circunferencia de cadera. La OMS define obesidad abdominal como RCC por encima de 0.90 para hombres y por encima de 0.85 para mujeres. La RCC es un mejor predictor de enfermedad cardiovascular que solo el IMC porque mide específicamente la distribución de grasa abdominal. Las personas con cuerpos en forma de 'manzana' (RCC alta) enfrentan mayores riesgos de salud que aquellas con cuerpos en forma de 'pera' (RCC baja)."
        },
        {
          "question": "¿Qué es la relación cintura-altura y en qué se diferencia?",
          "answer": "La relación cintura-altura (RCA) divide tu circunferencia de cintura por tu altura. Una relación por encima de 0.5 indica riesgo elevado de enfermedad cardiovascular, diabetes tipo 2 y síndrome metabólico. La investigación sugiere que la RCA es un mejor predictor de riesgos de salud que solo el IMC porque mide específicamente la grasa abdominal, que es más peligrosa metabólicamente que la grasa almacenada en otras áreas."
        },
        {
          "question": "¿Qué es el IMC Prime y en qué se diferencia del IMC regular?",
          "answer": "El IMC Prime es simplemente tu IMC dividido por 25 (el límite superior del rango normal). Un IMC Prime de 1.0 significa que estás exactamente en el umbral entre normal y sobrepeso. Valores bajo 1.0 son peso normal, y por encima de 1.0 son sobrepeso. Es útil porque te da una idea rápida de qué tan por encima o por debajo del umbral normal estás — por ejemplo, un IMC Prime de 1.10 significa que estás 10% por encima del límite normal."
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
      "name": "Calculadora de IMC",
      "slug": "calculadora-indice-massa-corporal",
      "subtitle": "Calcule seu Índice de Massa Corporal, relação cintura-altura, percentual de gordura corporal e faixa de peso saudável com limites específicos por etnia e insights personalizados",
      "breadcrumb": "IMC",
      "seo": {
        "title": "Calculadora de IMC - Índice de Massa Corporal, Gordura Corporal e RCQ | Ferramenta Gratuita",
        "description": "Calcule seu IMC, percentual de gordura corporal, relação cintura-altura, relação cintura-quadril e faixa de peso saudável. Inclui limites específicos por etnia para populações asiáticas, negras e do Oriente Médio. Resultados instantâneos gratuitos.",
        "shortDescription": "Calcule IMC com estimativa de gordura corporal, relação cintura-quadril e limites específicos por etnia",
        "keywords": [
          "calculadora imc",
          "calculadora indice massa corporal",
          "calculadora imc adolescentes",
          "tabela imc",
          "calculadora peso saudável",
          "calculadora imc gratuita",
          "calculadora imc por idade",
          "calculadora percentual gordura corporal",
          "calculadora relação cintura quadril",
          "relação cintura altura"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "gender": {
          "label": "Sexo",
          "helpText": "Usado para estimativa de gordura corporal e percentis de IMC por idade",
          "options": {
            "male": "Masculino",
            "female": "Feminino"
          }
        },
        "age": {
          "label": "Idade",
          "helpText": "Idades 2-19 usam percentis IMC-por-idade do CDC; adultos usam IMC padrão"
        },
        "weight": {
          "label": "Peso",
          "helpText": "Seu peso corporal atual"
        },
        "height": {
          "label": "Altura",
          "helpText": "Sua altura"
        },
        "ethnicity": {
          "label": "Origem Étnica",
          "helpText": "Os limites de IMC variam por etnia — populações asiáticas têm pontos de corte menores para sobrepeso/obesidade",
          "options": {
            "general": "Geral (Branco/Europeu/Africano)",
            "asian": "Asiático (Leste/Sul/Sudeste Asiático)",
            "black": "Negro (Africano/Caribenho)",
            "middleEastern": "Oriente Médio"
          }
        },
        "showWaistAnalysis": {
          "label": "Incluir Análise de Cintura e Quadril",
          "helpText": "Adicione medidas de cintura e quadril para avaliação mais precisa do risco à saúde"
        },
        "waist": {
          "label": "Circunferência da Cintura",
          "helpText": "Meça no ponto mais estreito acima do umbigo"
        },
        "hip": {
          "label": "Circunferência do Quadril",
          "helpText": "Meça no ponto mais largo dos glúteos"
        },
        "showAdvanced": {
          "label": "Mostrar Métricas Avançadas",
          "helpText": "Exibir IMC Prime, Índice Ponderal e percentual de gordura corporal"
        }
      },
      "results": {
        "bmi": {
          "label": "IMC"
        },
        "category": {
          "label": "Categoria"
        },
        "ethnicCategory": {
          "label": "Categoria Ajustada por Etnia"
        },
        "healthyRange": {
          "label": "Faixa de Peso Saudável"
        },
        "idealWeight": {
          "label": "Peso Ideal"
        },
        "weightChange": {
          "label": "Mudança de Peso Necessária"
        },
        "bmiPrime": {
          "label": "IMC Prime"
        },
        "ponderalIndex": {
          "label": "Índice Ponderal"
        },
        "bodyFatPercent": {
          "label": "% Gordura Corporal"
        },
        "waistToHeight": {
          "label": "Relação Cintura-Altura"
        },
        "waistRisk": {
          "label": "Nível de Risco RCA"
        },
        "waistToHip": {
          "label": "Relação Cintura-Quadril"
        },
        "waistToHipRisk": {
          "label": "Nível de Risco RCQ"
        },
        "bodyShape": {
          "label": "Formato Corporal"
        },
        "percentile": {
          "label": "Percentil IMC (Idade)"
        },
        "ageCategory": {
          "label": "Categoria por Idade"
        }
      },
      "presets": {
        "athleteMale": {
          "label": "Atleta Masculino",
          "description": "25a masculino, 79 kg, 1,78m"
        },
        "averageFemale": {
          "label": "Mulher Média",
          "description": "35a feminino, 68 kg, 1,65m"
        },
        "fullAnalysis": {
          "label": "Análise Completa",
          "description": "40a masculino com dados de cintura e quadril"
        },
        "asianFemale": {
          "label": "Mulher Asiática",
          "description": "30a, limites ajustados por etnia"
        }
      },
      "values": {
        "kg/m²": "kg/m²",
        "kg/m³": "kg/m³",
        "lbs": "lbs",
        "kg": "kg",
        "in": "pol",
        "cm": "cm",
        "years": "anos"
      },
      "formats": {
        "summary": "Seu IMC é {bmi} kg/m², classificado como {category}. Faixa de peso saudável: {healthyRange}."
      },
      "infoCards": {
        "metrics": {
          "title": "🎯 Metas de Peso",
          "items": [
            {
              "label": "Faixa Saudável",
              "valueKey": "healthyRange"
            },
            {
              "label": "Mudança de Peso",
              "valueKey": "weightChange"
            },
            {
              "label": "Peso Ideal",
              "valueKey": "idealWeight"
            }
          ]
        },
        "waist": {
          "title": "📏 Análise do Formato Corporal",
          "items": [
            {
              "label": "Relação Cintura-Altura",
              "valueKey": "waistToHeight"
            },
            {
              "label": "Relação Cintura-Quadril",
              "valueKey": "waistToHip"
            },
            {
              "label": "Formato Corporal",
              "valueKey": "bodyShape"
            }
          ]
        },
        "tips": {
          "title": "Dicas Rápidas",
          "items": [
            "Pese-se pela manhã antes de comer para resultados consistentes",
            "IMC não distingue músculo de gordura — atletas podem ter pontuação mais alta",
            "Relação cintura-altura deve ser menor que 0,5 (cintura < metade da altura)",
            "Populações asiáticas têm maiores riscos à saúde com IMC mais baixo — use configuração étnica"
          ]
        }
      },
      "detailedTable": {
        "weightCategories": {
          "button": "Ver Tabela de Categorias de Peso",
          "title": "Categorias de Peso por IMC",
          "columns": {
            "category": "Categoria",
            "bmiRange": "Faixa de IMC",
            "riskLevel": "Risco à Saúde",
            "yourWeight": "Sua Faixa de Peso"
          }
        }
      },
      "chart": {
        "title": "Escala IMC",
        "xLabel": "",
        "yLabel": "IMC (kg/m²)",
        "series": {
          "underweight": "Abaixo do Peso",
          "normal": "Normal",
          "overweight": "Sobrepeso",
          "obese1": "Obesidade I",
          "obese2": "Obesidade II",
          "obese3": "Obesidade III",
          "marker": "Seu IMC"
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é IMC?",
          "content": "O Índice de Massa Corporal (IMC) é um cálculo simples usando sua altura e peso para estimar se você está com peso saudável. A fórmula divide o peso em quilogramas pela altura em metros ao quadrado (kg/m²). Desenvolvido pelo matemático belga Adolphe Quetelet na década de 1830, o IMC tornou-se a ferramenta de triagem mais amplamente utilizada para classificação de peso em todo o mundo. Embora não meça diretamente a gordura corporal, ele se correlaciona com medidas mais diretas de gordura corporal e serve como um método barato e fácil de realizar para triagem de categorias de peso que podem levar a problemas de saúde. A Organização Mundial da Saúde (OMS) e a maioria das agências nacionais de saúde usam o IMC como sistema principal de classificação para baixo peso, peso normal, sobrepeso e obesidade em adultos."
        },
        "howItWorks": {
          "title": "Como o IMC é Calculado",
          "content": "A fórmula do IMC é direta: IMC = peso (kg) ÷ altura² (m²). Por exemplo, uma pessoa pesando 70 kg com 1,75 m de altura tem IMC de 70 ÷ (1,75 × 1,75) = 22,9 kg/m². Para crianças e adolescentes de 2-19 anos, o IMC é calculado da mesma forma, mas interpretado diferentemente usando gráficos de percentis específicos por idade e sexo do CDC. O percentil de IMC de uma criança mostra como seu IMC se compara a outras crianças da mesma idade e sexo. Esta calculadora também calcula várias métricas adicionais: IMC Prime (relação do seu IMC para 25, onde valores abaixo de 1,0 são peso normal), Índice Ponderal (uma medida de magreza independente da altura), percentual estimado de gordura corporal usando a fórmula de Deurenberg, e relação cintura-altura para avaliação da gordura abdominal."
        },
        "considerations": {
          "title": "Limitações e Considerações do IMC",
          "items": [
            {
              "text": "IMC não distingue entre massa muscular, densidade óssea e gordura — atletas musculosos podem ser classificados como sobrepeso apesar da baixa gordura corporal",
              "type": "warning"
            },
            {
              "text": "Variações étnicas importam: populações asiáticas enfrentam maiores riscos à saúde com valores menores de IMC (sobrepeso começa em 23 vs 25 para população geral)",
              "type": "info"
            },
            {
              "text": "Adultos mais velhos podem se beneficiar de IMC ligeiramente mais alto (25-27), pois sobrepeso leve está associado à menor mortalidade após os 65 anos",
              "type": "info"
            },
            {
              "text": "IMC subestima gordura corporal em pessoas que perderam massa muscular e superestima em atletas e indivíduos altamente ativos",
              "type": "warning"
            },
            {
              "text": "Relação cintura-altura é melhor preditor de risco cardiovascular que IMC sozinho — procure ter cintura menor que metade da altura",
              "type": "info"
            },
            {
              "text": "Relação cintura-quadril (RCQ) ajuda identificar formatos corporais 'maçã' vs 'pêra' — formato maçã carrega maior risco cardiovascular",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Categorias IMC da OMS",
          "items": [
            {
              "text": "Abaixo do peso (< 18,5): Associado à desnutrição, osteoporose, sistema imunológico enfraquecido e problemas de fertilidade",
              "type": "warning"
            },
            {
              "text": "Peso normal (18,5 - 24,9): Menor risco geral à saúde; associado aos melhores resultados de saúde a longo prazo",
              "type": "info"
            },
            {
              "text": "Sobrepeso (25 - 29,9): Risco aumentado de diabetes tipo 2, hipertensão e doença cardiovascular",
              "type": "warning"
            },
            {
              "text": "Obesidade Classe I (30 - 34,9): Risco significativamente elevado de doença cardíaca, diabetes, apneia do sono e certos cânceres",
              "type": "warning"
            },
            {
              "text": "Obesidade Classe II (35 - 39,9): Alto risco de complicações graves de saúde; intervenção médica frequentemente recomendada",
              "type": "warning"
            },
            {
              "text": "Obesidade Classe III (40+): Categoria de maior risco; associada à expectativa e qualidade de vida severamente reduzidas",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo de IMC",
          "description": "Cálculos passo a passo para diferentes tipos corporais",
          "examples": [
            {
              "title": "Homem Adulto — 82 kg, 1,78m",
              "steps": [
                "Peso: 82 kg",
                "Altura: 1,78 m",
                "IMC = 82 ÷ (1,78²) = 82 ÷ 3,168 = 25,9",
                "Categoria: Sobrepeso (25,0 - 29,9)",
                "IMC Prime: 25,9 ÷ 25 = 1,04 (4% acima do normal)",
                "Faixa saudável: 58,5 - 79,0 kg"
              ],
              "result": "IMC 25,9 — Sobrepeso. Perca ~3 kg para alcançar faixa normal."
            },
            {
              "title": "Adolescente Menina — 14 anos, 54 kg, 1,63m",
              "steps": [
                "Peso: 54 kg, Altura: 1,63 m",
                "IMC = 54 ÷ (1,63²) = 54 ÷ 2,657 = 20,3",
                "Consultar percentil CDC para menina 14a, IMC 20,3",
                "Percentil: ~60º (entre 50º e 85º)",
                "Categoria por idade: Peso normal"
              ],
              "result": "IMC 20,3 — 60º percentil — Peso normal para menina de 14 anos."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qual é a faixa saudável de IMC?",
          "answer": "Para adultos, um IMC saudável está entre 18,5 e 24,9 kg/m². No entanto, essa faixa pode variar por etnia. Para populações asiáticas, a faixa saudável é 18,5 a 22,9, pois os riscos à saúde aumentam com valores menores de IMC. Para pessoas acima de 65 anos, um IMC de 25-27 pode estar associado a melhores resultados de saúde. Crianças e adolescentes usam gráficos de percentis específicos por idade em vez de faixas fixas."
        },
        {
          "question": "Quão preciso é o IMC como indicador de saúde?",
          "answer": "O IMC é uma ferramenta útil de triagem, mas tem limitações. Não distingue entre músculo e gordura, então atletas com alta massa muscular podem ser classificados como sobrepeso apesar de estarem muito em forma. Similarmente, adultos mais velhos que perderam massa muscular podem ter IMC 'normal' mas carregar excesso de gordura. Para uma visão mais completa, combine IMC com circunferência da cintura, percentual de gordura corporal e marcadores sanguíneos. Esta calculadora fornece várias dessas métricas adicionais."
        },
        {
          "question": "Por que esta calculadora pergunta sobre origem étnica?",
          "answer": "Pesquisas mostram que os riscos à saúde relacionados ao IMC variam significativamente entre grupos étnicos. Populações asiáticas (Leste, Sul e Sudeste Asiático) enfrentam maiores riscos de diabetes tipo 2 e doença cardiovascular com valores menores de IMC. A OMS recomenda usar um limiar menor de sobrepeso de IMC 23 (em vez de 25) para populações asiáticas. O NHS no Reino Unido também ajusta limiares para populações negras e do Oriente Médio."
        },
        {
          "question": "O que é relação cintura-quadril e por que é importante?",
          "answer": "A relação cintura-quadril (RCQ) divide sua circunferência da cintura pela circunferência do quadril. A OMS define obesidade abdominal como RCQ acima de 0,90 para homens e acima de 0,85 para mulheres. RCQ é melhor preditor de doença cardiovascular que IMC sozinho porque mede especificamente a distribuição de gordura abdominal. Pessoas com corpos em formato 'maçã' (RCQ alta) enfrentam maiores riscos à saúde que aquelas com corpos em formato 'pêra' (RCQ baixa)."
        },
        {
          "question": "O que é relação cintura-altura e como é diferente?",
          "answer": "A relação cintura-altura (RCA) divide sua circunferência da cintura pela sua altura. Uma relação acima de 0,5 indica risco elevado de doença cardiovascular, diabetes tipo 2 e síndrome metabólica. Pesquisas sugerem que RCA é melhor preditor de riscos à saúde que IMC sozinho porque mede especificamente gordura abdominal, que é mais perigosa metabolicamente que gordura armazenada em outras áreas."
        },
        {
          "question": "O que é IMC Prime e como é diferente do IMC regular?",
          "answer": "IMC Prime é simplesmente seu IMC dividido por 25 (o limite superior da faixa normal). Um IMC Prime de 1,0 significa que você está exatamente no limiar entre normal e sobrepeso. Valores abaixo de 1,0 são peso normal, e acima de 1,0 são sobrepeso. É útil porque dá uma noção rápida de quão longe acima ou abaixo do limiar normal você está — por exemplo, um IMC Prime de 1,10 significa que você está 10% acima do limite normal."
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
      "name": "Calculateur IMC",
      "slug": "calculateur-indice-masse-corporelle",
      "subtitle": "Calculez votre Indice de Masse Corporelle, ratio taille-hanches, pourcentage de graisse corporelle et fourchette de poids santé avec seuils spécifiques à l'origine ethnique et conseils personnalisés",
      "breadcrumb": "IMC",
      "seo": {
        "title": "Calculateur IMC - Indice de Masse Corporelle, Graisse Corporelle & RTH | Outil Gratuit",
        "description": "Calculez votre IMC, pourcentage de graisse corporelle, ratio taille-hanches, ratio tour de taille-hanches et fourchette de poids santé. Inclut des seuils spécifiques pour les populations asiatiques, noires et moyen-orientales. Résultats instantanés gratuits.",
        "shortDescription": "Calculez l'IMC avec estimation de graisse corporelle, ratio taille-hanches et seuils spécifiques à l'origine ethnique",
        "keywords": [
          "calculateur imc",
          "calculateur indice masse corporelle",
          "calculateur imc adolescents",
          "tableau imc",
          "calculateur poids santé",
          "calculateur imc gratuit",
          "calculateur imc par âge",
          "calculateur pourcentage graisse corporelle",
          "calculateur ratio taille hanches",
          "ratio taille hauteur"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "gender": {
          "label": "Sexe",
          "helpText": "Utilisé pour l'estimation de la graisse corporelle et les percentiles IMC-pour-âge",
          "options": {
            "male": "Homme",
            "female": "Femme"
          }
        },
        "age": {
          "label": "Âge",
          "helpText": "Les âges 2-19 utilisent les percentiles IMC-pour-âge CDC ; les adultes utilisent l'IMC standard"
        },
        "weight": {
          "label": "Poids",
          "helpText": "Votre poids corporel actuel"
        },
        "height": {
          "label": "Taille",
          "helpText": "Votre taille"
        },
        "ethnicity": {
          "label": "Origine Ethnique",
          "helpText": "Les seuils d'IMC varient selon l'origine ethnique — les populations asiatiques ont des seuils de surpoids/obésité plus bas",
          "options": {
            "general": "Général (Blanc/Européen/Africain)",
            "asian": "Asiatique (Asie de l'Est/Sud/Sud-Est)",
            "black": "Noir (Africain/Caribéen)",
            "middleEastern": "Moyen-Oriental"
          }
        },
        "showWaistAnalysis": {
          "label": "Inclure l'Analyse Taille & Hanches",
          "helpText": "Ajouter les mesures de taille et hanches pour une évaluation plus précise des risques santé"
        },
        "waist": {
          "label": "Tour de Taille",
          "helpText": "Mesurez au point le plus étroit au-dessus du nombril"
        },
        "hip": {
          "label": "Tour de Hanches",
          "helpText": "Mesurez au point le plus large des fesses"
        },
        "showAdvanced": {
          "label": "Afficher les Métriques Avancées",
          "helpText": "Afficher l'IMC Prime, l'Indice Pondéral et le pourcentage de graisse corporelle"
        }
      },
      "results": {
        "bmi": {
          "label": "IMC"
        },
        "category": {
          "label": "Catégorie"
        },
        "ethnicCategory": {
          "label": "Catégorie Ajustée Ethniquement"
        },
        "healthyRange": {
          "label": "Fourchette de Poids Santé"
        },
        "idealWeight": {
          "label": "Poids Idéal"
        },
        "weightChange": {
          "label": "Changement de Poids Nécessaire"
        },
        "bmiPrime": {
          "label": "IMC Prime"
        },
        "ponderalIndex": {
          "label": "Indice Pondéral"
        },
        "bodyFatPercent": {
          "label": "% Graisse Corporelle"
        },
        "waistToHeight": {
          "label": "Ratio Taille-Hauteur"
        },
        "waistRisk": {
          "label": "Niveau de Risque RTH"
        },
        "waistToHip": {
          "label": "Ratio Taille-Hanches"
        },
        "waistToHipRisk": {
          "label": "Niveau de Risque RTH"
        },
        "bodyShape": {
          "label": "Forme Corporelle"
        },
        "percentile": {
          "label": "Percentile IMC (Âge)"
        },
        "ageCategory": {
          "label": "Catégorie d'Âge"
        }
      },
      "presets": {
        "athleteMale": {
          "label": "Athlète Homme",
          "description": "Homme 25a, 79 kg, 1m78"
        },
        "averageFemale": {
          "label": "Femme Moyenne",
          "description": "Femme 35a, 68 kg, 1m65"
        },
        "fullAnalysis": {
          "label": "Analyse Complète",
          "description": "Homme 40a avec données taille & hanches"
        },
        "asianFemale": {
          "label": "Femme Asiatique",
          "description": "30a, seuils ajustés ethniquement"
        }
      },
      "values": {
        "kg/m²": "kg/m²",
        "kg/m³": "kg/m³",
        "lbs": "lbs",
        "kg": "kg",
        "in": "po",
        "cm": "cm",
        "years": "ans"
      },
      "formats": {
        "summary": "Votre IMC est de {bmi} kg/m², classifié comme {category}. Fourchette de poids santé : {healthyRange}."
      },
      "infoCards": {
        "metrics": {
          "title": "🎯 Objectifs de Poids",
          "items": [
            {
              "label": "Fourchette Santé",
              "valueKey": "healthyRange"
            },
            {
              "label": "Changement de Poids",
              "valueKey": "weightChange"
            },
            {
              "label": "Poids Idéal",
              "valueKey": "idealWeight"
            }
          ]
        },
        "waist": {
          "title": "📏 Analyse Forme Corporelle",
          "items": [
            {
              "label": "Ratio Taille-Hauteur",
              "valueKey": "waistToHeight"
            },
            {
              "label": "Ratio Taille-Hanches",
              "valueKey": "waistToHip"
            },
            {
              "label": "Forme Corporelle",
              "valueKey": "bodyShape"
            }
          ]
        },
        "tips": {
          "title": "Conseils Rapides",
          "items": [
            "Pesez-vous le matin avant de manger pour des résultats cohérents",
            "L'IMC ne distingue pas le muscle de la graisse — les athlètes peuvent avoir un score plus élevé",
            "Le ratio taille-hauteur devrait être inférieur à 0,5 (taille < moitié de votre hauteur)",
            "Les populations asiatiques ont des risques santé plus élevés à IMC plus bas — utilisez le réglage ethnique"
          ]
        }
      },
      "detailedTable": {
        "weightCategories": {
          "button": "Voir le Tableau des Catégories de Poids",
          "title": "Catégories de Poids IMC",
          "columns": {
            "category": "Catégorie",
            "bmiRange": "Fourchette IMC",
            "riskLevel": "Risque Santé",
            "yourWeight": "Votre Fourchette de Poids"
          }
        }
      },
      "chart": {
        "title": "Échelle IMC",
        "xLabel": "",
        "yLabel": "IMC (kg/m²)",
        "series": {
          "underweight": "Insuffisance pondérale",
          "normal": "Normal",
          "overweight": "Surpoids",
          "obese1": "Obésité I",
          "obese2": "Obésité II",
          "obese3": "Obésité III",
          "marker": "Votre IMC"
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que l'IMC ?",
          "content": "L'Indice de Masse Corporelle (IMC) est un calcul simple utilisant votre taille et votre poids pour estimer si vous êtes à un poids santé. La formule divise le poids en kilogrammes par la taille en mètres au carré (kg/m²). Développé par le mathématicien belge Adolphe Quetelet dans les années 1830, l'IMC est devenu l'outil de dépistage le plus largement utilisé pour la classification du poids dans le monde. Bien qu'il ne mesure pas directement la graisse corporelle, il est corrélé avec des mesures plus directes de la graisse corporelle et sert de méthode peu coûteuse et facile à effectuer pour dépister les catégories de poids qui peuvent conduire à des problèmes de santé. L'Organisation mondiale de la santé (OMS) et la plupart des agences de santé nationales utilisent l'IMC comme système de classification principal pour l'insuffisance pondérale, le poids normal, le surpoids et l'obésité chez les adultes."
        },
        "howItWorks": {
          "title": "Comment l'IMC est Calculé",
          "content": "La formule de l'IMC est simple : IMC = poids (kg) ÷ taille² (m²). Par exemple, une personne pesant 70 kg et mesurant 1,75 m a un IMC de 70 ÷ (1,75 × 1,75) = 22,9 kg/m². Pour les enfants et adolescents âgés de 2 à 19 ans, l'IMC est calculé de la même façon mais interprété différemment en utilisant des courbes de percentiles spécifiques à l'âge et au sexe du CDC. Le percentile IMC d'un enfant montre comment son IMC se compare à d'autres enfants du même âge et sexe. Ce calculateur calcule aussi plusieurs métriques supplémentaires : l'IMC Prime (ratio de votre IMC sur 25, où les valeurs sous 1,0 sont poids normal), l'Indice Pondéral (une mesure de maigreur indépendante de la taille), le pourcentage estimé de graisse corporelle utilisant la formule de Deurenberg, et le ratio taille-hauteur pour l'évaluation de la graisse abdominale."
        },
        "considerations": {
          "title": "Limitations et Considérations de l'IMC",
          "items": [
            {
              "text": "L'IMC ne distingue pas entre masse musculaire, densité osseuse et graisse — les athlètes musclés peuvent être classifiés en surpoids malgré une faible graisse corporelle",
              "type": "warning"
            },
            {
              "text": "Les variations ethniques comptent : les populations asiatiques font face à des risques santé plus élevés à des valeurs d'IMC plus basses (surpoids commence à 23 vs 25 pour la population générale)",
              "type": "info"
            },
            {
              "text": "Les adultes âgés peuvent bénéficier d'un IMC légèrement plus élevé (25-27) car un léger surpoids est associé à une mortalité plus faible après 65 ans",
              "type": "info"
            },
            {
              "text": "L'IMC sous-estime la graisse corporelle chez les personnes qui ont perdu de la masse musculaire et la surestime chez les athlètes et individus très actifs",
              "type": "warning"
            },
            {
              "text": "Le ratio taille-hauteur est un meilleur prédicteur du risque cardiovasculaire que l'IMC seul — visez une taille inférieure à la moitié de votre hauteur",
              "type": "info"
            },
            {
              "text": "Le ratio taille-hanches (RTH) aide à identifier les formes corporelles 'pomme' vs 'poire' — les formes pomme portent un risque cardiovasculaire plus élevé",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Catégories IMC de l'OMS",
          "items": [
            {
              "text": "Insuffisance pondérale (< 18,5) : Associée à malnutrition, ostéoporose, système immunitaire affaibli et problèmes de fertilité",
              "type": "warning"
            },
            {
              "text": "Poids normal (18,5 - 24,9) : Risque santé global le plus bas ; associé aux meilleurs résultats santé à long terme",
              "type": "info"
            },
            {
              "text": "Surpoids (25 - 29,9) : Risque accru de diabète type 2, hypertension et maladie cardiovasculaire",
              "type": "warning"
            },
            {
              "text": "Obésité Classe I (30 - 34,9) : Risque significativement élevé de maladie cardiaque, diabète, apnée du sommeil et certains cancers",
              "type": "warning"
            },
            {
              "text": "Obésité Classe II (35 - 39,9) : Risque élevé de complications santé graves ; intervention médicale souvent recommandée",
              "type": "warning"
            },
            {
              "text": "Obésité Classe III (40+) : Catégorie de risque la plus élevée ; associée à espérance de vie et qualité de vie sévèrement réduites",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul d'IMC",
          "description": "Calculs étape par étape pour différents types corporels",
          "examples": [
            {
              "title": "Homme Adulte — 82 kg, 1m78",
              "steps": [
                "Poids : 82 kg",
                "Taille : 1,78 m",
                "IMC = 82 ÷ (1,78²) = 82 ÷ 3,168 = 25,9",
                "Catégorie : Surpoids (25,0 - 29,9)",
                "IMC Prime : 25,9 ÷ 25 = 1,04 (4% au-dessus du normal)",
                "Fourchette santé : 58,4 - 78,9 kg"
              ],
              "result": "IMC 25,9 — Surpoids. Perdez ~4 kg pour atteindre la fourchette normale."
            },
            {
              "title": "Adolescente — 14 ans, 54 kg, 1m63",
              "steps": [
                "Poids : 54 kg, taille : 1,63 m",
                "IMC = 54 ÷ (1,63²) = 54 ÷ 2,657 = 20,3",
                "Consulter percentile CDC pour fille 14a, IMC 20,3",
                "Percentile : ~60e (entre 50e et 85e)",
                "Catégorie d'âge : Poids normal"
              ],
              "result": "IMC 20,3 — 60e percentile — Poids normal pour une fille de 14 ans."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle est une fourchette d'IMC saine ?",
          "answer": "Pour les adultes, un IMC sain se situe entre 18,5 et 24,9 kg/m². Cependant, cette fourchette peut varier selon l'origine ethnique. Pour les populations asiatiques, la fourchette saine est de 18,5 à 22,9, car les risques santé augmentent à des valeurs d'IMC plus basses. Pour les personnes de plus de 65 ans, un IMC de 25-27 peut en fait être associé à de meilleurs résultats santé. Les enfants et adolescents utilisent des courbes de percentiles spécifiques à l'âge plutôt que des fourchettes fixes."
        },
        {
          "question": "Quelle est la précision de l'IMC comme indicateur de santé ?",
          "answer": "L'IMC est un outil de dépistage utile mais a des limitations. Il ne distingue pas entre muscle et graisse, donc les athlètes avec une masse musculaire élevée peuvent être classifiés en surpoids malgré une excellente forme physique. De même, les adultes âgés qui ont perdu de la masse musculaire peuvent avoir un IMC 'normal' mais porter un excès de graisse. Pour une image plus complète, combinez l'IMC avec le tour de taille, le pourcentage de graisse corporelle et les marqueurs sanguins. Ce calculateur fournit plusieurs de ces métriques supplémentaires."
        },
        {
          "question": "Pourquoi ce calculateur demande-t-il l'origine ethnique ?",
          "answer": "La recherche montre que les risques santé liés à l'IMC varient significativement entre groupes ethniques. Les populations asiatiques (Asie de l'Est, Sud et Sud-Est) font face à des risques plus élevés de diabète type 2 et maladie cardiovasculaire à des valeurs d'IMC plus basses. L'OMS recommande d'utiliser un seuil de surpoids plus bas d'IMC 23 (au lieu de 25) pour les populations asiatiques. Le NHS au Royaume-Uni ajuste aussi les seuils pour les populations noires et moyen-orientales."
        },
        {
          "question": "Qu'est-ce que le ratio taille-hanches et pourquoi est-ce important ?",
          "answer": "Le ratio taille-hanches (RTH) divise votre tour de taille par votre tour de hanches. L'OMS définit l'obésité abdominale comme un RTH supérieur à 0,90 pour les hommes et supérieur à 0,85 pour les femmes. Le RTH est un meilleur prédicteur de maladie cardiovasculaire que l'IMC seul car il mesure spécifiquement la distribution de graisse abdominale. Les personnes avec des corps en forme de 'pomme' (RTH élevé) font face à des risques santé plus grands que celles avec des corps en forme de 'poire' (RTH bas)."
        },
        {
          "question": "Qu'est-ce que le ratio taille-hauteur et en quoi diffère-t-il ?",
          "answer": "Le ratio taille-hauteur (RTH) divise votre tour de taille par votre taille. Un ratio supérieur à 0,5 indique un risque élevé de maladie cardiovasculaire, diabète type 2 et syndrome métabolique. La recherche suggère que le RTH est un meilleur prédicteur des risques santé que l'IMC seul car il mesure spécifiquement la graisse abdominale, qui est plus métaboliquement dangereuse que la graisse stockée dans d'autres zones."
        },
        {
          "question": "Qu'est-ce que l'IMC Prime et en quoi diffère-t-il de l'IMC régulier ?",
          "answer": "L'IMC Prime est simplement votre IMC divisé par 25 (la limite supérieure de la fourchette normale). Un IMC Prime de 1,0 signifie que vous êtes exactement au seuil entre normal et surpoids. Les valeurs inférieures à 1,0 sont poids normal, et supérieures à 1,0 sont surpoids. C'est utile car cela vous donne un sens rapide de à quel point vous êtes au-dessus ou en-dessous du seuil normal — par exemple, un IMC Prime de 1,10 signifie que vous êtes 10% au-dessus de la limite normale."
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
      "name": "BMI Rechner",
      "slug": "koerpermassenindex-rechner",
      "subtitle": "Berechnen Sie Ihren Body-Mass-Index, Taille-zu-Größe-Verhältnis, Körperfettanteil und gesunden Gewichtsbereich mit ethnisch-spezifischen Grenzwerten und personalisierten Erkenntnissen",
      "breadcrumb": "BMI",
      "seo": {
        "title": "BMI Rechner - Body-Mass-Index, Körperfett & THV | Kostenloses Tool",
        "description": "Berechnen Sie Ihren BMI, Körperfettanteil, Taille-zu-Größe-Verhältnis, Taille-zu-Hüfte-Verhältnis und gesunden Gewichtsbereich. Enthält ethnisch-spezifische Grenzwerte für asiatische, schwarze und nahöstliche Bevölkerungsgruppen. Kostenlose Sofortergebnisse.",
        "shortDescription": "BMI berechnen mit Körperfettschätzung, Taille-zu-Hüfte-Verhältnis und ethnisch-spezifischen Grenzwerten",
        "keywords": [
          "bmi rechner",
          "body mass index rechner",
          "bmi rechner jugendliche",
          "bmi tabelle",
          "gesunder gewicht rechner",
          "kostenloser bmi rechner",
          "bmi für alter rechner",
          "körperfettanteil rechner",
          "taille zu hüfte verhältnis rechner",
          "taille zu größe verhältnis"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "gender": {
          "label": "Geschlecht",
          "helpText": "Verwendet für Körperfettschätzung und BMI-für-Alter-Perzentile",
          "options": {
            "male": "Männlich",
            "female": "Weiblich"
          }
        },
        "age": {
          "label": "Alter",
          "helpText": "Alter 2-19 verwenden CDC BMI-für-Alter-Perzentile; Erwachsene verwenden Standard-BMI"
        },
        "weight": {
          "label": "Gewicht",
          "helpText": "Ihr aktuelles Körpergewicht"
        },
        "height": {
          "label": "Größe",
          "helpText": "Ihre Körpergröße"
        },
        "ethnicity": {
          "label": "Ethnische Herkunft",
          "helpText": "BMI-Grenzwerte variieren nach Ethnizität — Asiatische Bevölkerungsgruppen haben niedrigere Übergewichts-/Adipositas-Grenzwerte",
          "options": {
            "general": "Allgemein (Weiß/Europäisch/Afrikanisch)",
            "asian": "Asiatisch (Ost-/Süd-/Südostasiatisch)",
            "black": "Schwarz (Afrikanisch/Karibisch)",
            "middleEastern": "Nahöstlich"
          }
        },
        "showWaistAnalysis": {
          "label": "Taille & Hüfte Analyse einbeziehen",
          "helpText": "Taille- und Hüftmessungen für genauere Gesundheitsrisikobewertung hinzufügen"
        },
        "waist": {
          "label": "Taillenumfang",
          "helpText": "An der schmalsten Stelle über dem Bauchnabel messen"
        },
        "hip": {
          "label": "Hüftumfang",
          "helpText": "An der breitesten Stelle des Gesäßes messen"
        },
        "showAdvanced": {
          "label": "Erweiterte Metriken anzeigen",
          "helpText": "BMI Prime, Ponderal Index und Körperfettanteil anzeigen"
        }
      },
      "results": {
        "bmi": {
          "label": "BMI"
        },
        "category": {
          "label": "Kategorie"
        },
        "ethnicCategory": {
          "label": "Ethnisch-angepasste Kategorie"
        },
        "healthyRange": {
          "label": "Gesunder Gewichtsbereich"
        },
        "idealWeight": {
          "label": "Idealgewicht"
        },
        "weightChange": {
          "label": "Benötigte Gewichtsänderung"
        },
        "bmiPrime": {
          "label": "BMI Prime"
        },
        "ponderalIndex": {
          "label": "Ponderal Index"
        },
        "bodyFatPercent": {
          "label": "Körperfett %"
        },
        "waistToHeight": {
          "label": "Taille-zu-Größe-Verhältnis"
        },
        "waistRisk": {
          "label": "TGV Risikostufe"
        },
        "waistToHip": {
          "label": "Taille-zu-Hüfte-Verhältnis"
        },
        "waistToHipRisk": {
          "label": "THV Risikostufe"
        },
        "bodyShape": {
          "label": "Körperform"
        },
        "percentile": {
          "label": "BMI Perzentile (Alter)"
        },
        "ageCategory": {
          "label": "Alterskategorie"
        }
      },
      "presets": {
        "athleteMale": {
          "label": "Sportler Männlich",
          "description": "25J Mann, 79 kg, 178 cm"
        },
        "averageFemale": {
          "label": "Durchschnittliche Frau",
          "description": "35J Frau, 68 kg, 165 cm"
        },
        "fullAnalysis": {
          "label": "Vollständige Analyse",
          "description": "40J Mann mit Taille & Hüfte Daten"
        },
        "asianFemale": {
          "label": "Asiatische Frau",
          "description": "30J, ethnisch-angepasste Grenzwerte"
        }
      },
      "values": {
        "kg/m²": "kg/m²",
        "kg/m³": "kg/m³",
        "lbs": "Pfund",
        "kg": "kg",
        "in": "Zoll",
        "cm": "cm",
        "years": "Jahre"
      },
      "formats": {
        "summary": "Ihr BMI ist {bmi} kg/m², klassifiziert als {category}. Gesunder Gewichtsbereich: {healthyRange}."
      },
      "infoCards": {
        "metrics": {
          "title": "🎯 Gewichtsziele",
          "items": [
            {
              "label": "Gesunder Bereich",
              "valueKey": "healthyRange"
            },
            {
              "label": "Gewichtsänderung",
              "valueKey": "weightChange"
            },
            {
              "label": "Idealgewicht",
              "valueKey": "idealWeight"
            }
          ]
        },
        "waist": {
          "title": "📏 Körperform-Analyse",
          "items": [
            {
              "label": "Taille-zu-Größe-Verhältnis",
              "valueKey": "waistToHeight"
            },
            {
              "label": "Taille-zu-Hüfte-Verhältnis",
              "valueKey": "waistToHip"
            },
            {
              "label": "Körperform",
              "valueKey": "bodyShape"
            }
          ]
        },
        "tips": {
          "title": "Schnelle Tipps",
          "items": [
            "Wiegen Sie sich morgens vor dem Essen für konsistente Ergebnisse",
            "BMI unterscheidet nicht zwischen Muskel und Fett — Sportler können höher bewerten",
            "Taille-zu-Größe-Verhältnis sollte unter 0,5 liegen (Taille < halbe Körpergröße)",
            "Asiatische Bevölkerungsgruppen haben höhere Gesundheitsrisiken bei niedrigerem BMI — ethnische Einstellung verwenden"
          ]
        }
      },
      "detailedTable": {
        "weightCategories": {
          "button": "Gewichtskategorien-Tabelle anzeigen",
          "title": "BMI Gewichtskategorien",
          "columns": {
            "category": "Kategorie",
            "bmiRange": "BMI Bereich",
            "riskLevel": "Gesundheitsrisiko",
            "yourWeight": "Ihr Gewichtsbereich"
          }
        }
      },
      "chart": {
        "title": "BMI Skala",
        "xLabel": "",
        "yLabel": "BMI (kg/m²)",
        "series": {
          "underweight": "Untergewicht",
          "normal": "Normal",
          "overweight": "Übergewicht",
          "obese1": "Adipositas I",
          "obese2": "Adipositas II",
          "obese3": "Adipositas III",
          "marker": "Ihr BMI"
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist BMI?",
          "content": "Der Body-Mass-Index (BMI) ist eine einfache Berechnung anhand Ihrer Größe und Ihres Gewichts, um zu schätzen, ob Sie ein gesundes Gewicht haben. Die Formel teilt das Gewicht in Kilogramm durch die Größe in Metern zum Quadrat (kg/m²). Entwickelt vom belgischen Mathematiker Adolphe Quetelet in den 1830er Jahren, ist der BMI zum weltweit am häufigsten verwendeten Screening-Tool für Gewichtsklassifikation geworden. Obwohl er nicht direkt Körperfett misst, korreliert er mit direkteren Messungen von Körperfett und dient als kostengünstige, einfach durchzuführende Methode zur Überprüfung von Gewichtskategorien, die zu Gesundheitsproblemen führen können. Die Weltgesundheitsorganisation (WHO) und die meisten nationalen Gesundheitsbehörden verwenden den BMI als primäres Klassifikationssystem für Untergewicht, Normalgewicht, Übergewicht und Adipositas bei Erwachsenen."
        },
        "howItWorks": {
          "title": "Wie BMI berechnet wird",
          "content": "Die BMI-Formel ist einfach: BMI = Gewicht (kg) ÷ Größe² (m²). Zum Beispiel hat eine Person mit 70 kg Gewicht und 1,75 m Größe einen BMI von 70 ÷ (1,75 × 1,75) = 22,9 kg/m². Bei Kindern und Jugendlichen im Alter von 2-19 Jahren wird der BMI gleich berechnet, aber anders interpretiert unter Verwendung von alters- und geschlechtsspezifischen Perzentiltabellen der CDC. Die BMI-Perzentile eines Kindes zeigt, wie sich sein BMI im Vergleich zu anderen Kindern gleichen Alters und Geschlechts verhält. Dieser Rechner berechnet auch mehrere zusätzliche Metriken: BMI Prime (Verhältnis Ihres BMI zu 25, wobei Werte unter 1,0 Normalgewicht bedeuten), Ponderal Index (ein größenunabhängiges Maß für Schlankheit), geschätzter Körperfettanteil mit der Deurenberg-Formel und Taille-zu-Größe-Verhältnis zur Bewertung von Bauchfett."
        },
        "considerations": {
          "title": "BMI Einschränkungen & Überlegungen",
          "items": [
            {
              "text": "BMI unterscheidet nicht zwischen Muskelmasse, Knochendichte und Fett — muskulöse Sportler können als übergewichtig klassifiziert werden trotz niedrigem Körperfettanteil",
              "type": "warning"
            },
            {
              "text": "Ethnische Unterschiede sind wichtig: Asiatische Bevölkerungsgruppen haben höhere Gesundheitsrisiken bei niedrigeren BMI-Werten (Übergewicht beginnt bei 23 vs 25 für die allgemeine Bevölkerung)",
              "type": "info"
            },
            {
              "text": "Ältere Erwachsene können von einem etwas höheren BMI (25-27) profitieren, da mildes Übergewicht nach dem 65. Lebensjahr mit geringerer Sterblichkeit verbunden ist",
              "type": "info"
            },
            {
              "text": "BMI unterschätzt Körperfett bei Menschen, die Muskelmasse verloren haben, und überschätzt es bei Sportlern und hochaktiven Personen",
              "type": "warning"
            },
            {
              "text": "Taille-zu-Größe-Verhältnis ist ein besserer Prädiktor für kardiovaskuläres Risiko als BMI allein — streben Sie eine Taille an, die weniger als die Hälfte Ihrer Größe beträgt",
              "type": "info"
            },
            {
              "text": "Taille-zu-Hüfte-Verhältnis (THV) hilft bei der Identifikation von 'Apfel'- vs 'Birnen'-Körperformen — Apfelformen tragen höheres kardiovaskuläres Risiko",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "WHO BMI Kategorien",
          "items": [
            {
              "text": "Untergewicht (< 18,5): Verbunden mit Mangelernährung, Osteoporose, geschwächtem Immunsystem und Fruchtbarkeitsproblemen",
              "type": "warning"
            },
            {
              "text": "Normalgewicht (18,5 - 24,9): Niedrigstes Gesamtgesundheitsrisiko; verbunden mit besten langfristigen Gesundheitsergebnissen",
              "type": "info"
            },
            {
              "text": "Übergewicht (25 - 29,9): Erhöhtes Risiko für Typ-2-Diabetes, Bluthochdruck und Herz-Kreislauf-Erkrankungen",
              "type": "warning"
            },
            {
              "text": "Adipositas Klasse I (30 - 34,9): Deutlich erhöhtes Risiko für Herzerkrankungen, Diabetes, Schlafapnoe und bestimmte Krebsarten",
              "type": "warning"
            },
            {
              "text": "Adipositas Klasse II (35 - 39,9): Hohes Risiko für schwerwiegende Gesundheitskomplikationen; medizinische Intervention oft empfohlen",
              "type": "warning"
            },
            {
              "text": "Adipositas Klasse III (40+): Höchste Risikokategorie; verbunden mit stark reduzierter Lebenserwartung und Lebensqualität",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "BMI Berechnungsbeispiele",
          "description": "Schritt-für-Schritt-Berechnungen für verschiedene Körpertypen",
          "examples": [
            {
              "title": "Erwachsener Mann — 82 kg, 178 cm",
              "steps": [
                "Umrechnen: 178 cm = 1,78 m",
                "BMI = 82 ÷ (1,78²) = 82 ÷ 3,168 = 25,9",
                "Kategorie: Übergewicht (25,0 - 29,9)",
                "BMI Prime: 25,9 ÷ 25 = 1,04 (4% über normal)",
                "Gesunder Bereich: 58,4 - 79,0 kg"
              ],
              "result": "BMI 25,9 — Übergewicht. Etwa 3 kg abnehmen, um den normalen Bereich zu erreichen."
            },
            {
              "title": "Teenager Mädchen — 14 Jahre, 54 kg, 163 cm",
              "steps": [
                "Umrechnen: 163 cm = 1,63 m",
                "BMI = 54 ÷ (1,63²) = 54 ÷ 2,657 = 20,3",
                "CDC Perzentile für 14J Mädchen, BMI 20,3 nachschlagen",
                "Perzentile: ~60. (zwischen 50. und 85.)",
                "Alterskategorie: Normalgewicht"
              ],
              "result": "BMI 20,3 — 60. Perzentile — Normalgewicht für ein 14-jähriges Mädchen."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Was ist ein gesunder BMI-Bereich?",
          "answer": "Für Erwachsene liegt ein gesunder BMI zwischen 18,5 und 24,9 kg/m². Dieser Bereich kann jedoch je nach Ethnizität variieren. Für asiatische Bevölkerungsgruppen liegt der gesunde Bereich zwischen 18,5 und 22,9, da Gesundheitsrisiken bei niedrigeren BMI-Werten zunehmen. Für Menschen über 65 kann ein BMI von 25-27 tatsächlich mit besseren Gesundheitsergebnissen verbunden sein. Kinder und Jugendliche verwenden altersspezifische Perzentiltabellen anstelle fester Bereiche."
        },
        {
          "question": "Wie genau ist BMI als Gesundheitsindikator?",
          "answer": "BMI ist ein nützliches Screening-Tool, hat aber Einschränkungen. Er unterscheidet nicht zwischen Muskel und Fett, sodass Sportler mit hoher Muskelmasse als übergewichtig klassifiziert werden können, obwohl sie sehr fit sind. Ebenso können ältere Erwachsene, die Muskelmasse verloren haben, einen 'normalen' BMI haben, aber überschüssiges Fett tragen. Für ein vollständigeres Bild kombinieren Sie BMI mit Taillenumfang, Körperfettanteil und Blutmarkern. Dieser Rechner bietet mehrere dieser zusätzlichen Metriken."
        },
        {
          "question": "Warum fragt dieser Rechner nach ethnischer Herkunft?",
          "answer": "Forschungen zeigen, dass BMI-bezogene Gesundheitsrisiken zwischen ethnischen Gruppen erheblich variieren. Asiatische Bevölkerungsgruppen (Ost-, Süd- und Südostasiatisch) haben höhere Risiken für Typ-2-Diabetes und Herz-Kreislauf-Erkrankungen bei niedrigeren BMI-Werten. Die WHO empfiehlt die Verwendung eines niedrigeren Übergewichts-Grenzwerts von BMI 23 (anstatt 25) für asiatische Bevölkerungsgruppen. Der NHS in Großbritannien passt auch Grenzwerte für schwarze und nahöstliche Bevölkerungsgruppen an."
        },
        {
          "question": "Was ist das Taille-zu-Hüfte-Verhältnis und warum ist es wichtig?",
          "answer": "Das Taille-zu-Hüfte-Verhältnis (THV) teilt Ihren Taillenumfang durch Ihren Hüftumfang. Die WHO definiert abdominale Adipositas als THV über 0,90 für Männer und über 0,85 für Frauen. THV ist ein besserer Prädiktor für Herz-Kreislauf-Erkrankungen als BMI allein, weil es speziell die abdominale Fettverteilung misst. Menschen mit 'apfelförmigen' Körpern (hohes THV) haben größere Gesundheitsrisiken als die mit 'birnenförmigen' Körpern (niedriges THV)."
        },
        {
          "question": "Was ist das Taille-zu-Größe-Verhältnis und wie unterscheidet es sich?",
          "answer": "Das Taille-zu-Größe-Verhältnis (TGV) teilt Ihren Taillenumfang durch Ihre Größe. Ein Verhältnis über 0,5 zeigt erhöhtes Risiko für Herz-Kreislauf-Erkrankungen, Typ-2-Diabetes und metabolisches Syndrom an. Forschungen deuten darauf hin, dass TGV ein besserer Prädiktor für Gesundheitsrisiken ist als BMI allein, weil es speziell Bauchfett misst, das metabolisch gefährlicher ist als in anderen Bereichen gespeichertes Fett."
        },
        {
          "question": "Was ist BMI Prime und wie unterscheidet es sich vom regulären BMI?",
          "answer": "BMI Prime ist einfach Ihr BMI geteilt durch 25 (die Obergrenze des normalen Bereichs). Ein BMI Prime von 1,0 bedeutet, dass Sie genau an der Schwelle zwischen normal und übergewichtig sind. Werte unter 1,0 sind normalgewichtig, und über 1,0 sind übergewichtig. Es ist nützlich, weil es Ihnen schnell zeigt, wie weit über oder unter der normalen Schwelle Sie sind — zum Beispiel bedeutet ein BMI Prime von 1,10, dass Sie 10% über dem normalen Limit sind."
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

  // ============================================================================
  // INPUTS — V4.3 with Toggle components
  // ============================================================================
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
      defaultValue: 25,
      min: 2,
      max: 100,
      suffix: "years",
    },
    {
      id: "weight",
      type: "number",
      defaultValue: null,
      placeholder: "175",
      unitType: "weight",
      syncGroup: false,
      defaultUnit: "lbs",
      allowedUnits: ["kg", "lbs", "st"],
    },
    {
      id: "height",
      type: "number",
      defaultValue: null,
      placeholder: "70",
      unitType: "height",
      syncGroup: false,
      defaultUnit: "ft_in",
      allowedUnits: ["cm", "m", "in", "ft_in"],
    },
    {
      id: "ethnicity",
      type: "select",
      defaultValue: "general",
      options: [
        { value: "general" },
        { value: "asian" },
        { value: "black" },
        { value: "middleEastern" },
      ],
    },
    // 🔘 V4.3 TOGGLE — Waist & Hip Analysis
    {
      id: "showWaistAnalysis",
      type: "toggle",
      defaultValue: false,
    },
    // Waist — only visible when toggle is ON
    {
      id: "waist",
      type: "number",
      defaultValue: null,
      placeholder: "34",
      unitType: "body_length",
      syncGroup: false,
      defaultUnit: "in",
      allowedUnits: ["cm", "in"],
      showWhen: { field: "showWaistAnalysis", value: true },
    },
    // Hip — NEW field, only visible when toggle is ON
    {
      id: "hip",
      type: "number",
      defaultValue: null,
      placeholder: "40",
      unitType: "body_length",
      syncGroup: false,
      defaultUnit: "in",
      allowedUnits: ["cm", "in"],
      showWhen: { field: "showWaistAnalysis", value: true },
    },
    // 🔘 V4.3 TOGGLE — Advanced Metrics
    {
      id: "showAdvanced",
      type: "toggle",
      defaultValue: false,
    },
  ],

  inputGroups: [],

  // ============================================================================
  // RESULTS
  // ============================================================================
  results: [
    { id: "bmi", type: "primary", format: "number" },
    { id: "category", type: "secondary", format: "text" },
    { id: "ethnicCategory", type: "secondary", format: "text" },
    { id: "healthyRange", type: "secondary", format: "text" },
    { id: "idealWeight", type: "secondary", format: "text" },
    { id: "weightChange", type: "secondary", format: "text" },
    // Advanced metrics — visibility controlled by calculate() returning ""
    { id: "bmiPrime", type: "secondary", format: "number" },
    { id: "ponderalIndex", type: "secondary", format: "number" },
    { id: "bodyFatPercent", type: "secondary", format: "number" },
    // Waist analysis — visibility controlled by calculate() returning ""
    { id: "waistToHeight", type: "secondary", format: "text" },
    { id: "waistRisk", type: "secondary", format: "text" },
    { id: "waistToHip", type: "secondary", format: "text" },
    { id: "waistToHipRisk", type: "secondary", format: "text" },
    { id: "bodyShape", type: "secondary", format: "text" },
    // Age-specific (always shown for teens)
    { id: "percentile", type: "secondary", format: "text" },
    { id: "ageCategory", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "🎯", itemCount: 3 },
    { id: "waist", type: "list", icon: "📏", itemCount: 3 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // BMI Gauge Color Bar
  chart: {
    id: "bmiGauge",
    type: "composed",
    xKey: "label",
    stacked: true,
    height: 160,
    showGrid: false,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "number",
    series: [
      { key: "underweight", type: "bar", stackId: "bmi", color: "#60a5fa" },
      { key: "normal", type: "bar", stackId: "bmi", color: "#34d399" },
      { key: "overweight", type: "bar", stackId: "bmi", color: "#fbbf24" },
      { key: "obese1", type: "bar", stackId: "bmi", color: "#f97316" },
      { key: "obese2", type: "bar", stackId: "bmi", color: "#ef4444" },
      { key: "obese3", type: "bar", stackId: "bmi", color: "#991b1b" },
      { key: "marker", type: "line", color: "#1e1e1e", dashed: false },
    ],
  },

  detailedTable: {
    id: "weightCategories",
    buttonLabel: "View Weight Categories Table",
    buttonIcon: "📊",
    modalTitle: "BMI Weight Categories",
    columns: [
      { id: "category", label: "Category", align: "left" },
      { id: "bmiRange", label: "BMI Range", align: "center" },
      { id: "riskLevel", label: "Health Risk", align: "center" },
      { id: "yourWeight", label: "Your Weight Range", align: "right", highlight: true },
    ],
  },

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [
    { id: "0" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
  ],

  references: [
    {
      authors: "World Health Organization",
      year: "2024",
      title: "Body Mass Index — BMI",
      source: "WHO",
      url: "https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations",
    },
    {
      authors: "Centers for Disease Control and Prevention",
      year: "2024",
      title: "About Child & Teen BMI",
      source: "CDC",
      url: "https://www.cdc.gov/bmi/child-teen-calculator/",
    },
    {
      authors: "Deurenberg P, Weststrate JA, Seidell JC",
      year: "1991",
      title: "Body mass index as a measure of body fatness: age- and sex-specific prediction formulas",
      source: "British Journal of Nutrition",
      url: "https://pubmed.ncbi.nlm.nih.gov/2043597/",
    },
    {
      authors: "World Health Organization",
      year: "2008",
      title: "Waist Circumference and Waist–Hip Ratio: Report of a WHO Expert Consultation",
      source: "WHO",
      url: "https://www.who.int/publications/i/item/9789241501491",
    },
  ],

  hero: { badge: "Health", rating: { average: 4.9, count: 15420 } },
  sidebar: {},
  features: {},
  relatedCalculators: [
    "caloric-deficit-calculator",
    "body-fat-calculator",
    "ideal-weight-calculator",
  ],
  ads: {},
};

// ============================================================================
// CDC BMI-FOR-AGE PERCENTILE DATA (SIMPLIFIED LMS)
// ============================================================================

const CDC_PERCENTILES_MALE: Record<number, number[]> = {
  2: [14.7, 15.1, 15.8, 16.5, 17.3, 17.8, 18.4],
  3: [14.3, 14.7, 15.3, 15.9, 16.7, 17.1, 17.7],
  4: [14.0, 14.4, 14.9, 15.5, 16.3, 16.7, 17.5],
  5: [13.8, 14.1, 14.7, 15.3, 16.1, 16.6, 17.5],
  6: [13.7, 14.0, 14.6, 15.3, 16.2, 16.8, 17.9],
  7: [13.7, 14.1, 14.7, 15.5, 16.5, 17.2, 18.6],
  8: [13.8, 14.2, 15.0, 15.8, 17.0, 17.8, 19.4],
  9: [14.0, 14.4, 15.2, 16.2, 17.5, 18.4, 20.4],
  10: [14.2, 14.7, 15.6, 16.6, 18.1, 19.1, 21.4],
  11: [14.5, 15.0, 15.9, 17.1, 18.7, 19.8, 22.5],
  12: [14.9, 15.4, 16.4, 17.6, 19.4, 20.5, 23.6],
  13: [15.4, 15.9, 16.9, 18.2, 20.1, 21.3, 24.5],
  14: [15.9, 16.4, 17.5, 18.9, 20.8, 22.0, 25.5],
  15: [16.5, 17.0, 18.1, 19.5, 21.4, 22.7, 26.0],
  16: [17.0, 17.5, 18.7, 20.1, 22.0, 23.3, 26.5],
  17: [17.5, 18.0, 19.2, 20.7, 22.6, 23.8, 27.0],
  18: [17.9, 18.5, 19.7, 21.3, 23.1, 24.4, 27.6],
  19: [18.3, 18.9, 20.2, 21.8, 23.7, 25.0, 28.2],
};

const CDC_PERCENTILES_FEMALE: Record<number, number[]> = {
  2: [14.4, 14.8, 15.4, 16.1, 16.9, 17.4, 18.0],
  3: [14.0, 14.4, 14.9, 15.6, 16.4, 16.8, 17.6],
  4: [13.7, 14.1, 14.7, 15.3, 16.2, 16.7, 17.5],
  5: [13.5, 13.9, 14.5, 15.2, 16.1, 16.7, 17.7],
  6: [13.4, 13.8, 14.5, 15.3, 16.3, 16.9, 18.1],
  7: [13.4, 13.9, 14.6, 15.5, 16.6, 17.3, 18.8],
  8: [13.6, 14.1, 14.9, 15.8, 17.1, 17.9, 19.6],
  9: [13.8, 14.3, 15.2, 16.2, 17.7, 18.6, 20.5],
  10: [14.1, 14.7, 15.6, 16.7, 18.3, 19.3, 21.5],
  11: [14.5, 15.1, 16.1, 17.2, 19.0, 20.1, 22.5],
  12: [15.0, 15.6, 16.6, 17.8, 19.7, 20.8, 23.5],
  13: [15.5, 16.1, 17.1, 18.4, 20.3, 21.5, 24.4],
  14: [16.0, 16.6, 17.6, 18.9, 20.9, 22.1, 25.1],
  15: [16.4, 17.0, 18.0, 19.4, 21.3, 22.5, 25.7],
  16: [16.8, 17.4, 18.4, 19.8, 21.7, 23.0, 26.1],
  17: [17.1, 17.7, 18.7, 20.1, 22.0, 23.3, 26.4],
  18: [17.4, 18.0, 19.0, 20.4, 22.3, 23.6, 26.7],
  19: [17.6, 18.2, 19.3, 20.7, 22.6, 23.9, 27.0],
};

function getBmiPercentile(
  bmi: number,
  age: number,
  gender: string
): { percentile: number; category: string } {
  const table = gender === "female" ? CDC_PERCENTILES_FEMALE : CDC_PERCENTILES_MALE;
  const ageKey = Math.min(19, Math.max(2, Math.round(age)));
  const row = table[ageKey];
  if (!row) return { percentile: 50, category: "Normal Weight" };

  const pctThresholds = [5, 10, 25, 50, 75, 85, 95];

  let percentile = 50;
  if (bmi <= row[0]) {
    percentile = Math.max(1, Math.round((bmi / row[0]) * 5));
  } else if (bmi >= row[6]) {
    percentile = Math.min(99, 95 + Math.round(((bmi - row[6]) / row[6]) * 20));
  } else {
    for (let i = 0; i < row.length - 1; i++) {
      if (bmi >= row[i] && bmi < row[i + 1]) {
        const fraction = (bmi - row[i]) / (row[i + 1] - row[i]);
        percentile = Math.round(
          pctThresholds[i] + fraction * (pctThresholds[i + 1] - pctThresholds[i])
        );
        break;
      }
    }
  }

  let category: string;
  if (percentile < 5) category = "Underweight";
  else if (percentile < 85) category = "Normal Weight";
  else if (percentile < 95) category = "Overweight";
  else category = "Obese";

  return { percentile, category };
}

// ============================================================================
// CALCULATE FUNCTION — V4.3
// ============================================================================

export function calculateBmi(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── READ INPUTS ──
  const gender = (values.gender as string) || "male";
  const age = (values.age as number) || 25;
  const ethnicity = (values.ethnicity as string) || "general";
  const showWaistAnalysis = values.showWaistAnalysis === true;
  const showAdvanced = values.showAdvanced === true;

  const weightRaw = values.weight as number | null;
  const heightRaw = values.height as number | null;
  const waistRaw = values.waist as number | null;
  const hipRaw = values.hip as number | null;

  if (!weightRaw || !heightRaw) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── CONVERT TO BASE UNITS (kg, cm) ──
  const weightUnit = fieldUnits.weight || "lbs";
  const heightUnit = fieldUnits.height || "in";
  const waistUnit = fieldUnits.waist || "in";
  const hipUnit = fieldUnits.hip || "in";

  const heightIsDual = heightUnit === "ft_in";

  const weightKg = convertToBase(weightRaw, weightUnit, "weight");
  const heightCm = heightIsDual ? heightRaw : convertToBase(heightRaw, heightUnit, "height");
  const waistCm =
    waistRaw && waistRaw > 0
      ? convertToBase(waistRaw, waistUnit, "body_length")
      : null;
  const hipCm =
    hipRaw && hipRaw > 0
      ? convertToBase(hipRaw, hipUnit, "body_length")
      : null;

  if (weightKg <= 0 || heightCm <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const heightM = heightCm / 100;

  // ── BMI CALCULATION ──
  const bmi = weightKg / (heightM * heightM);
  const bmiPrime = bmi / 25;
  const ponderalIndex = weightKg / (heightM * heightM * heightM);

  // ── BODY FAT % (Deurenberg formula) ──
  const genderFactor = gender === "female" ? 0 : 1;
  const bodyFatPercent = 1.2 * bmi + 0.23 * age - 10.8 * genderFactor - 5.4;
  const bodyFatClamped = Math.max(3, Math.min(60, bodyFatPercent));

  // ── STANDARD BMI CATEGORY ──
  let category: string;
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal Weight";
  else if (bmi < 30) category = "Overweight";
  else if (bmi < 35) category = "Obese Class I";
  else if (bmi < 40) category = "Obese Class II";
  else category = "Obese Class III";

  // ── ETHNIC-ADJUSTED CATEGORY ──
  let ethnicCategory: string;
  switch (ethnicity) {
    case "asian":
      if (bmi < 18.5) ethnicCategory = "Underweight";
      else if (bmi < 23) ethnicCategory = "Normal Weight";
      else if (bmi < 27.5) ethnicCategory = "Overweight";
      else ethnicCategory = "Obese";
      break;
    case "black":
      if (bmi < 18.5) ethnicCategory = "Underweight";
      else if (bmi < 25) ethnicCategory = "Normal Weight";
      else if (bmi < 30) ethnicCategory = "Overweight";
      else ethnicCategory = "Obese";
      break;
    case "middleEastern":
      if (bmi < 18.5) ethnicCategory = "Underweight";
      else if (bmi < 25) ethnicCategory = "Normal Weight";
      else if (bmi < 27.5) ethnicCategory = "Overweight";
      else ethnicCategory = "Obese";
      break;
    default:
      ethnicCategory = category;
  }

  // ── HEALTHY WEIGHT RANGE ──
  const minHealthyKg = 18.5 * heightM * heightM;
  const maxHealthyKg = 24.9 * heightM * heightM;

  const weightLbs = weightKg * 2.20462;
  const minHealthyLbs = minHealthyKg * 2.20462;
  const maxHealthyLbs = maxHealthyKg * 2.20462;

  const isLbs = weightUnit === "lbs" || weightUnit === "lb";
  const wUnit = isLbs ? (v["lbs"] || "lbs") : (v["kg"] || "kg");

  const healthyRange = isLbs
    ? `${Math.round(minHealthyLbs)} - ${Math.round(maxHealthyLbs)} ${wUnit}`
    : `${Math.round(minHealthyKg)} - ${Math.round(maxHealthyKg)} ${wUnit}`;

  // ── IDEAL WEIGHT (Devine formula) ──
  const heightIn = heightCm / 2.54;
  let idealWeightKg: number;
  if (gender === "male") {
    idealWeightKg = 50 + 2.3 * (heightIn - 60);
  } else {
    idealWeightKg = 45.5 + 2.3 * (heightIn - 60);
  }
  idealWeightKg = Math.max(idealWeightKg, minHealthyKg);

  const idealWeight = isLbs
    ? `${Math.round(idealWeightKg * 2.20462)} ${wUnit}`
    : `${Math.round(idealWeightKg)} ${wUnit}`;

  // ── WEIGHT CHANGE NEEDED ──
  let weightChange: string;
  if (bmi < 18.5) {
    const gain = isLbs
      ? Math.round(minHealthyLbs - weightLbs)
      : Math.round(minHealthyKg - weightKg);
    weightChange = `Gain ${Math.abs(gain)} ${wUnit}`;
  } else if (bmi > 24.9) {
    const lose = isLbs
      ? Math.round(weightLbs - maxHealthyLbs)
      : Math.round(weightKg - maxHealthyKg);
    weightChange = `Lose ${Math.abs(lose)} ${wUnit}`;
  } else {
    weightChange = "You're in the healthy range! 🎉";
  }

  // ── WAIST-TO-HEIGHT RATIO (WHtR) ──
  let waistToHeight = "--";
  let waistRisk = "--";
  if (waistCm && waistCm > 0) {
    const whtr = waistCm / heightCm;
    waistToHeight = whtr.toFixed(2);

    if (whtr < 0.4) waistRisk = "Low (underweight risk)";
    else if (whtr < 0.5) waistRisk = "✅ Low (healthy)";
    else if (whtr < 0.6) waistRisk = "⚠️ Elevated";
    else waistRisk = "🔴 High";
  } else {
    waistToHeight = "No waist data";
    waistRisk = "No waist data";
  }

  // ── WAIST-TO-HIP RATIO (WHR) — NEW V4.3 ──
  let waistToHip = "--";
  let waistToHipRisk = "--";
  let bodyShape = "--";

  if (waistCm && waistCm > 0 && hipCm && hipCm > 0) {
    const whr = waistCm / hipCm;
    waistToHip = whr.toFixed(2);

    // WHO thresholds
    if (gender === "male") {
      if (whr < 0.90) waistToHipRisk = "✅ Low Risk";
      else if (whr < 1.0) waistToHipRisk = "⚠️ Moderate Risk";
      else waistToHipRisk = "🔴 High Risk";
    } else {
      if (whr < 0.80) waistToHipRisk = "✅ Low Risk";
      else if (whr < 0.85) waistToHipRisk = "⚠️ Moderate Risk";
      else waistToHipRisk = "🔴 High Risk";
    }

    // Body shape classification
    if (gender === "male") {
      if (whr < 0.90) bodyShape = "🍐 Pear (lower body fat)";
      else if (whr < 1.0) bodyShape = "🥑 Avocado (moderate)";
      else bodyShape = "🍎 Apple (abdominal fat)";
    } else {
      if (whr < 0.80) bodyShape = "🍐 Pear (lower body fat)";
      else if (whr < 0.85) bodyShape = "🥑 Avocado (moderate)";
      else bodyShape = "🍎 Apple (abdominal fat)";
    }
  } else if (showWaistAnalysis) {
    waistToHip = "Enter hip measurement";
    waistToHipRisk = "Enter hip measurement";
    bodyShape = "Enter waist & hip";
  }

  // ── BMI-FOR-AGE (TEENS 2-19) ──
  let percentileStr = "--";
  let ageCategory = "--";
  if (age >= 2 && age <= 19) {
    const { percentile, category: ageCat } = getBmiPercentile(bmi, age, gender);
    percentileStr = `${percentile}th percentile`;
    ageCategory = ageCat;
  }

  // ── BMI GAUGE CHART DATA ──
  const chartData = [
    {
      label: "BMI Scale",
      underweight: 18.5,
      normal: 6.5,
      overweight: 5,
      obese1: 5,
      obese2: 5,
      obese3: 5,
      marker: Math.min(45, Math.max(0, bmi)),
    },
  ];

  // ── DETAILED TABLE: WEIGHT CATEGORIES ──
  const tableData = [
    {
      category: "Underweight",
      bmiRange: "< 18.5",
      riskLevel: "⚠️ Moderate",
      yourWeight: isLbs
        ? `< ${Math.round(minHealthyLbs)} ${wUnit}`
        : `< ${Math.round(minHealthyKg)} ${wUnit}`,
    },
    {
      category: "Normal Weight",
      bmiRange: "18.5 - 24.9",
      riskLevel: "✅ Low",
      yourWeight: healthyRange,
    },
    {
      category: "Overweight",
      bmiRange: "25 - 29.9",
      riskLevel: "⚠️ Increased",
      yourWeight: isLbs
        ? `${Math.round(maxHealthyLbs + 1)} - ${Math.round(29.9 * heightM * heightM * 2.20462)} ${wUnit}`
        : `${Math.round(maxHealthyKg + 1)} - ${Math.round(29.9 * heightM * heightM)} ${wUnit}`,
    },
    {
      category: "Obese Class I",
      bmiRange: "30 - 34.9",
      riskLevel: "🔴 High",
      yourWeight: isLbs
        ? `${Math.round(30 * heightM * heightM * 2.20462)} - ${Math.round(34.9 * heightM * heightM * 2.20462)} ${wUnit}`
        : `${Math.round(30 * heightM * heightM)} - ${Math.round(34.9 * heightM * heightM)} ${wUnit}`,
    },
    {
      category: "Obese Class II",
      bmiRange: "35 - 39.9",
      riskLevel: "🔴 Very High",
      yourWeight: isLbs
        ? `${Math.round(35 * heightM * heightM * 2.20462)} - ${Math.round(39.9 * heightM * heightM * 2.20462)} ${wUnit}`
        : `${Math.round(35 * heightM * heightM)} - ${Math.round(39.9 * heightM * heightM)} ${wUnit}`,
    },
    {
      category: "Obese Class III",
      bmiRange: "≥ 40",
      riskLevel: "🔴 Extremely High",
      yourWeight: isLbs
        ? `≥ ${Math.round(40 * heightM * heightM * 2.20462)} ${wUnit}`
        : `≥ ${Math.round(40 * heightM * heightM)} ${wUnit}`,
    },
  ];

  // ── FORMAT RESULTS ──
  const bmiUnit = v["kg/m²"] || "kg/m²";

  const summary =
    f.summary
      ?.replace("{bmi}", bmi.toFixed(1))
      .replace("{category}", category)
      .replace("{healthyRange}", healthyRange) ||
    `Your BMI is ${bmi.toFixed(1)} ${bmiUnit}, classified as ${category}. Healthy weight range: ${healthyRange}.`;

  return {
    values: {
      bmi,
      category,
      ethnicCategory,
      healthyRange,
      bmiPrime,
      ponderalIndex,
      bodyFatPercent: bodyFatClamped,
      idealWeight,
      weightChange,
      waistToHeight,
      waistRisk,
      waistToHip,
      waistToHipRisk,
      bodyShape,
      percentile: percentileStr,
      ageCategory,
    },
    formatted: {
      bmi: `${bmi.toFixed(1)} ${bmiUnit}`,
      category,
      ethnicCategory,
      healthyRange,
      // Advanced — hidden when toggle OFF
      bmiPrime: showAdvanced ? bmiPrime.toFixed(2) : "",
      ponderalIndex: showAdvanced ? `${ponderalIndex.toFixed(1)} ${v["kg/m³"] || "kg/m³"}` : "",
      bodyFatPercent: showAdvanced ? `${bodyFatClamped.toFixed(1)}%` : "",
      idealWeight,
      weightChange,
      // Waist — hidden when toggle OFF
      waistToHeight: showWaistAnalysis ? waistToHeight : "",
      waistRisk: showWaistAnalysis ? waistRisk : "",
      waistToHip: showWaistAnalysis ? waistToHip : "",
      waistToHipRisk: showWaistAnalysis ? waistToHipRisk : "",
      bodyShape: showWaistAnalysis ? bodyShape : "",
      percentile: percentileStr,
      ageCategory,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default bmiCalculatorConfig;
