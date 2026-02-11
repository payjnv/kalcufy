import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ═══════════════════════════════════════════════════════════════════
// IDEAL WEIGHT CALCULATOR V4
// ═══════════════════════════════════════════════════════════════════
// 9 inputs: gender, age, height, current weight, body frame, wrist,
//           activity level, target BMI, ethnicity
// 7 formulas: Peterson, Devine, Robinson, Miller, Hamwi, Broca, Lorentz
// Frame ±10%, activity adjustment, ethnic BMI thresholds
// ═══════════════════════════════════════════════════════════════════

export const idealWeightConfig: CalculatorConfigV4 = {
  id: "ideal-weight",
  version: "4.0",
  category: "health",
  icon: "⚖️",

  presets: [
    {
      id: "averageMale",
      icon: "👨",
      values: {
        gender: "male",
        age: 30,
        height: null,
        currentWeight: null,
        bodyFrame: "medium",
        activityLevel: "moderate",
        targetBmi: 22,
        ethnicity: "standard",
      },
    },
    {
      id: "averageFemale",
      icon: "👩",
      values: {
        gender: "female",
        age: 30,
        height: null,
        currentWeight: null,
        bodyFrame: "medium",
        activityLevel: "moderate",
        targetBmi: 22,
        ethnicity: "standard",
      },
    },
    {
      id: "athleteMale",
      icon: "🏋️",
      values: {
        gender: "male",
        age: 28,
        height: null,
        currentWeight: null,
        bodyFrame: "large",
        activityLevel: "veryActive",
        targetBmi: 23,
        ethnicity: "standard",
      },
    },
    {
      id: "petiteFemale",
      icon: "🧘",
      values: {
        gender: "female",
        age: 35,
        height: null,
        currentWeight: null,
        bodyFrame: "small",
        activityLevel: "moderate",
        targetBmi: 21,
        ethnicity: "standard",
      },
    },
  ],

  t: {
    en: {
      name: "Ideal Weight Calculator",
      slug: "ideal-weight-calculator",
      subtitle: "Find your ideal body weight using 7 science-backed formulas — with frame size, activity level, and ethnic adjustments",
      breadcrumb: "Ideal Weight",

      seo: {
        title: "Ideal Weight Calculator — 7 Formulas, Frame Size & BMI Range",
        description: "Calculate your ideal body weight using Peterson, Devine, Robinson, Miller, Hamwi, Broca, and Lorentz formulas. Includes body frame adjustment, activity level, ethnic BMI thresholds, and a weight loss timeline.",
        shortDescription: "Find your ideal weight using 7 scientific formulas",
        keywords: [
          "ideal weight calculator",
          "ideal body weight",
          "how much should I weigh",
          "ideal weight for height",
          "ideal weight for my height and age",
          "healthy weight calculator",
          "IBW calculator",
          "ideal weight by frame size",
        ],
      },

      calculator: { yourInformation: "Your Information" },
      ui: {
        yourInformation: "Your Information",
        calculate: "Calculate Ideal Weight",
        reset: "Reset",
        results: "Your Ideal Weight",
      },

      inputs: {
        gender: {
          label: "Gender",
          options: { male: "Male", female: "Female" },
        },
        age: {
          label: "Age",
        },
        height: {
          label: "Height",
        },
        currentWeight: {
          label: "Current Weight",
          helpText: "Optional — used to show how far you are from your ideal weight",
        },
        bodyFrame: {
          label: "Body Frame Size",
          helpText: "Based on wrist circumference. Adjusts ideal weight by ±10%.",
          options: {
            small: "Small",
            medium: "Medium",
            large: "Large",
          },
          descriptions: {
            small: "Narrow bones",
            medium: "Average build",
            large: "Broad bones",
          },
        },
        wristCircumference: {
          label: "Wrist Circumference",
          helpText: "Measure around the smallest part of your wrist, just above the bone",
        },
        activityLevel: {
          label: "Activity Level",
          helpText: "Higher activity supports more muscle mass, increasing ideal weight slightly",
          options: {
            sedentary: "Sedentary",
            light: "Lightly Active",
            moderate: "Moderately Active",
            active: "Active",
            veryActive: "Very Active / Athlete",
          },
        },
        targetBmi: {
          label: "Target BMI",
          helpText: "Default is 22 (mid-range healthy). Athletes may target 23–25.",
        },
        ethnicity: {
          label: "Ethnicity",
          helpText: "WHO uses different BMI thresholds for Asian and Pacific Islander populations",
          options: {
            standard: "Standard (WHO)",
            asian: "Asian / South Asian",
            pacific: "Pacific Islander",
          },
        },
      },

      results: {
        idealWeight: { label: "Ideal Weight" },
        idealRange: { label: "Healthy Weight Range" },
        currentBmi: { label: "Your Current BMI" },
        bmiCategory: { label: "BMI Category" },
        weightGap: { label: "Weight to Goal" },
        timeline: { label: "Estimated Timeline" },
        frameAdjusted: { label: "Frame-Adjusted Ideal" },
        petersonResult: { label: "Peterson (2016)" },
        devineResult: { label: "Devine (1974)" },
        robinsonResult: { label: "Robinson (1983)" },
        millerResult: { label: "Miller (1983)" },
        hamwiResult: { label: "Hamwi (1964)" },
        brocaResult: { label: "Broca (1871)" },
        lorentzResult: { label: "Lorentz (1929)" },
      },

      presets: {
        averageMale: {
          label: "Average Male",
          description: "Medium frame, moderate activity",
        },
        averageFemale: {
          label: "Average Female",
          description: "Medium frame, moderate activity",
        },
        athleteMale: {
          label: "Athlete Male",
          description: "Large frame, very active, BMI 23",
        },
        petiteFemale: {
          label: "Petite Female",
          description: "Small frame, moderate activity, BMI 21",
        },
      },

      tooltips: {
        idealWeight: "Average of all 7 validated formulas, adjusted for frame size and activity.",
        idealRange: "Weight range for a healthy BMI between 18.5 and 24.9.",
        currentBmi: "Body Mass Index based on your current weight and height.",
        weightGap: "How much weight you need to lose or gain to reach your ideal weight.",
        timeline: "Estimated weeks at a safe rate of 0.5–1 kg (1–2 lbs) per week.",
        frameAdjusted: "Ideal weight adjusted ±10% for small or large body frames.",
      },

      values: {
        "Underweight": "Underweight",
        "Normal weight": "Normal weight",
        "Overweight": "Overweight",
        "Obese": "Obese",
        "Obese II": "Obese II",
        "Obese III": "Obese III",
        "lose": "lose",
        "gain": "gain",
        "weeks": "weeks",
        "You're within your ideal range!": "You're within your ideal range!",
        "Already at a healthy weight": "Already at a healthy weight",
      },

      formats: {
        summary: "Your ideal weight is approximately {idealWeight}. Healthy range: {idealRange}. Current BMI: {currentBmi} ({bmiCategory}).",
      },

      infoCards: {
        formulaComparison: {
          title: "📊 Formula Results",
          items: {
            "0": "Peterson (2016) — Most accurate, BMI-based",
            "1": "Devine (1974) — Most widely used in medicine",
            "2": "Robinson (1983) — Insurance standard",
            "3": "Miller (1983) — Higher baseline",
            "4": "Hamwi (1964) — Clinical standard",
            "5": "Broca (1871) — Oldest method",
            "6": "Lorentz (1929) — European standard",
          },
        },
        tips: {
          title: "Tips",
          items: [
            "Ideal weight is a guideline, not a strict target — focus on body composition over scale weight",
            "Athletes with high muscle mass may exceed IBW formulas while being perfectly healthy",
            "Aim for 0.5–1 kg (1–2 lbs) per week for safe, sustainable weight change",
            "Body frame size can shift ideal weight by 10% — a large-framed person naturally weighs more",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is Ideal Body Weight?",
          content: "Ideal Body Weight (IBW) is a reference weight based on height, gender, and age that was originally developed to calculate proper medication dosages. Over time, these formulas have been adopted as general health benchmarks. IBW is not a single perfect number — it represents a range that correlates with the lowest health risks. The most validated formula is Peterson (2016), which uses BMI-based calculations. Older formulas like Devine (1974) and Robinson (1983) are still widely used in clinical settings. It is important to understand that IBW does not account for muscle mass, bone density, or individual body composition. A highly muscular person can be above their IBW and still be very healthy. IBW should be used as one data point among several when assessing health, not as a definitive goal.",
        },
        howItWorks: {
          title: "How This Calculator Works",
          content: "This calculator computes your ideal weight using 7 validated formulas and shows the average as your recommended target. It adjusts results for body frame size (±10%), factors in activity level, lets you set a custom target BMI, and applies WHO ethnic-specific BMI thresholds for Asian and Pacific Islander populations. If you enter your current weight, it shows exactly how much you need to lose or gain, with a realistic timeline based on safe weight change rates of 0.5–1 kg per week. The bar chart and detailed table let you compare all 7 formulas side by side.",
        },
        formulas: {
          title: "The 7 Formulas Explained",
          items: [
            { text: "Peterson (2016): The most modern and accurate formula. Uses BMI target: Weight = 2.2 × BMI + 3.5 × BMI × (Height − 1.5m). Gender-neutral and validated against large datasets.", type: "info" },
            { text: "Devine (1974): The most widely used in medicine. Men: 50 + 2.3 kg per inch over 5 ft. Women: 45.5 + 2.3 kg per inch. Originally for drug dosage calculations.", type: "info" },
            { text: "Robinson (1983): Refinement of Devine. Men: 52 + 1.9 kg per inch over 5 ft. Women: 49 + 1.7 kg per inch. Based on 1959 insurance height-weight tables.", type: "info" },
            { text: "Miller (1983): Uses 1983 insurance data. Men: 56.2 + 1.41 kg per inch over 5 ft. Women: 53.1 + 1.36 kg. Produces higher estimates at shorter heights.", type: "info" },
            { text: "Hamwi (1964): Clinical standard. Men: 48 + 2.7 kg per inch over 5 ft. Women: 45.5 + 2.2 kg. Can be adjusted ±10% for body frame size.", type: "info" },
            { text: "Broca (1871): The oldest formula, created by a French army surgeon. IBW = (Height cm − 100) × factor (0.9 for men, 0.85 for women). Simple but less accurate for extremes.", type: "warning" },
            { text: "Lorentz (1929): European formula. Men: (H − 100) − (H − 150)/4. Women: (H − 100) − (H − 150)/2. Tends to produce lower estimates for taller individuals.", type: "info" },
          ],
        },
        ethnicBmi: {
          title: "Ethnic BMI Adjustments",
          items: [
            { text: "Standard WHO thresholds: Underweight < 18.5, Normal 18.5–24.9, Overweight 25–29.9, Obese ≥ 30", type: "info" },
            { text: "Asian / South Asian: Higher health risks at lower BMIs. Overweight starts at BMI 23, Obese at 27.5", type: "warning" },
            { text: "Pacific Islander: Some guidelines use BMI 26 as the overweight threshold", type: "info" },
            { text: "These adjustments reflect differences in body fat distribution and metabolic risk. Always consult a healthcare provider for personalized advice", type: "info" },
          ],
        },
        examples: {
          title: "Example Calculations",
          description: "See how the calculator works with real numbers",
          examples: [
            {
              title: "5'10\" Male, Medium Frame",
              steps: [
                "Height: 5'10\" (178 cm)",
                "Peterson: 74.2 kg (163.5 lbs)",
                "Devine: 73.0 kg (160.9 lbs)",
                "Robinson: 71.0 kg (156.5 lbs)",
                "Miller: 70.3 kg (155.0 lbs)",
                "Hamwi: 75.0 kg (165.3 lbs)",
                "Broca: 70.2 kg (154.8 lbs)",
                "Lorentz: 71.0 kg (156.5 lbs)",
                "Average: 72.1 kg (158.9 lbs)",
              ],
              result: "Ideal weight: ~72 kg (159 lbs)",
            },
            {
              title: "5'4\" Female, Small Frame",
              steps: [
                "Height: 5'4\" (163 cm)",
                "Average of 7 formulas: 55.8 kg",
                "Frame adjustment: −10% (small)",
                "Adjusted: 50.2 kg (110.7 lbs)",
                "Activity: moderate (+0%)",
              ],
              result: "Ideal weight: ~50 kg (111 lbs)",
            },
          ],
        },
      },

      faqs: [
        {
          question: "Which formula is the most accurate?",
          answer: "The Peterson formula (2016) is considered the most accurate for modern populations because it is based on BMI data from large-scale studies and works for all heights without the biases of older formulas. The Devine formula (1974) is the most widely used in clinical settings for drug dosing but tends to underestimate ideal weight for shorter women and overestimate for taller men. This calculator shows all 7 formulas so you can compare results.",
        },
        {
          question: "How does body frame size affect ideal weight?",
          answer: "A person with a large frame has more bone mass and naturally weighs more than someone with a small frame at the same height. The standard adjustment is ±10% from the calculated ideal weight. You can estimate frame size by measuring your wrist circumference. For women under 5'2\", a wrist under 5.5\" indicates a small frame, while over 5.75\" suggests a large frame. For men over 5'5\", a wrist under 6.5\" is small and over 7.5\" is large.",
        },
        {
          question: "Why are the formula results different from each other?",
          answer: "Each formula was developed by different researchers using different datasets. Hamwi (1964) for clinical nutrition, Devine (1974) for drug dosing, Robinson and Miller (1983) from insurance tables, Peterson (2016) from modern BMI research. They agree most for average heights and diverge for very short or tall people. Using the average of all 7 gives a more reliable estimate.",
        },
        {
          question: "Should I aim for exactly my ideal weight?",
          answer: "No. Ideal weight is a guideline, not a precise target. Your healthy weight range — based on a BMI between 18.5 and 24.9 — is more useful than a single number. Factors like muscle mass, bone density, body fat distribution, and fitness level matter more. An athlete with significant muscle mass may weigh above their IBW while being in excellent health.",
        },
        {
          question: "How fast can I safely reach my ideal weight?",
          answer: "Medical guidelines recommend losing 0.5–1 kg (1–2 lbs) per week for sustainable weight loss. Faster loss often involves muscle loss and metabolic slowdown. For weight gain, 0.25–0.5 kg per week is realistic for lean mass. The calculator provides a timeline based on these safe rates.",
        },
        {
          question: "Why do Asian populations have different BMI thresholds?",
          answer: "Asian and South Asian populations tend to have higher body fat percentages at the same BMI compared to European populations, and develop metabolic diseases at lower BMIs. The WHO recommends an overweight threshold of BMI 23 (instead of 25) and obesity at 27.5 (instead of 30) for these populations.",
        },
      ],

      detailedTable: {
        formulaComparison: {
          button: "View All Formula Results",
          title: "Ideal Weight by Formula",
          columns: {
            formula: "Formula",
            year: "Year",
            weight: "Ideal Weight",
            range: "±5% Range",
          },
        },
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
        calculate: "Calculate Ideal Weight",
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
        mobileResults: "Ideal weight results",
        closeModal: "Close",
        openMenu: "Menu",
      },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Calculadora de Peso Ideal",
      "slug": "calculadora-peso-ideal",
      "subtitle": "Encuentra tu peso corporal ideal usando 7 fórmulas respaldadas por la ciencia — con ajustes de tamaño corporal, nivel de actividad y étnico",
      "breadcrumb": "Peso Ideal",
      "seo": {
        "title": "Calculadora de Peso Ideal — 7 Fórmulas, Tamaño Corporal y Rango IMC",
        "description": "Calcula tu peso corporal ideal usando las fórmulas de Peterson, Devine, Robinson, Miller, Hamwi, Broca y Lorentz. Incluye ajuste por complexión corporal, nivel de actividad, umbrales de IMC étnicos y cronograma de pérdida de peso.",
        "shortDescription": "Encuentra tu peso ideal usando 7 fórmulas científicas",
        "keywords": [
          "calculadora peso ideal",
          "peso corporal ideal",
          "cuánto debería pesar",
          "peso ideal para la altura",
          "peso ideal para mi altura y edad",
          "calculadora peso saludable",
          "calculadora PCI",
          "peso ideal por complexión corporal"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "gender": {
          "label": "Sexo",
          "options": {
            "male": "Hombre",
            "female": "Mujer"
          }
        },
        "age": {
          "label": "Edad"
        },
        "height": {
          "label": "Altura"
        },
        "currentWeight": {
          "label": "Peso Actual",
          "helpText": "Opcional — se usa para mostrar qué tan lejos estás de tu peso ideal"
        },
        "bodyFrame": {
          "label": "Tamaño de Complexión Corporal",
          "helpText": "Basado en la circunferencia de la muñeca. Ajusta el peso ideal en ±10%.",
          "options": {
            "small": "Pequeña",
            "medium": "Mediana",
            "large": "Grande"
          },
          "descriptions": {
            "small": "Huesos delgados",
            "medium": "Constitución promedio",
            "large": "Huesos anchos"
          }
        },
        "wristCircumference": {
          "label": "Circunferencia de la Muñeca",
          "helpText": "Mide alrededor de la parte más pequeña de tu muñeca, justo encima del hueso"
        },
        "activityLevel": {
          "label": "Nivel de Actividad",
          "helpText": "Mayor actividad soporta más masa muscular, aumentando ligeramente el peso ideal",
          "options": {
            "sedentary": "Sedentario",
            "light": "Ligeramente Activo",
            "moderate": "Moderadamente Activo",
            "active": "Activo",
            "veryActive": "Muy Activo / Atleta"
          }
        },
        "targetBmi": {
          "label": "IMC Objetivo",
          "helpText": "Por defecto es 22 (rango medio saludable). Los atletas pueden apuntar a 23–25."
        },
        "ethnicity": {
          "label": "Etnia",
          "helpText": "La OMS usa diferentes umbrales de IMC para poblaciones asiáticas e isleñas del Pacífico",
          "options": {
            "standard": "Estándar (OMS)",
            "asian": "Asiático / Sur Asiático",
            "pacific": "Isleño del Pacífico"
          }
        }
      },
      "results": {
        "idealWeight": {
          "label": "Peso Ideal"
        },
        "idealRange": {
          "label": "Rango de Peso Saludable"
        },
        "currentBmi": {
          "label": "Tu IMC Actual"
        },
        "bmiCategory": {
          "label": "Categoría IMC"
        },
        "weightGap": {
          "label": "Peso hasta el Objetivo"
        },
        "timeline": {
          "label": "Cronograma Estimado"
        },
        "frameAdjusted": {
          "label": "Ideal Ajustado por Complexión"
        },
        "petersonResult": {
          "label": "Peterson (2016)"
        },
        "devineResult": {
          "label": "Devine (1974)"
        },
        "robinsonResult": {
          "label": "Robinson (1983)"
        },
        "millerResult": {
          "label": "Miller (1983)"
        },
        "hamwiResult": {
          "label": "Hamwi (1964)"
        },
        "brocaResult": {
          "label": "Broca (1871)"
        },
        "lorentzResult": {
          "label": "Lorentz (1929)"
        }
      },
      "presets": {
        "averageMale": {
          "label": "Hombre Promedio",
          "description": "Complexión mediana, actividad moderada"
        },
        "averageFemale": {
          "label": "Mujer Promedio",
          "description": "Complexión mediana, actividad moderada"
        },
        "athleteMale": {
          "label": "Hombre Atleta",
          "description": "Complexión grande, muy activo, IMC 23"
        },
        "petiteFemale": {
          "label": "Mujer Pequeña",
          "description": "Complexión pequeña, actividad moderada, IMC 21"
        }
      },
      "tooltips": {
        "idealWeight": "Promedio de las 7 fórmulas validadas, ajustado por complexión corporal y actividad.",
        "idealRange": "Rango de peso para un IMC saludable entre 18.5 y 24.9.",
        "currentBmi": "Índice de Masa Corporal basado en tu peso y altura actuales.",
        "weightGap": "Cuánto peso necesitas perder o ganar para alcanzar tu peso ideal.",
        "timeline": "Semanas estimadas a una tasa segura de 0.5–1 kg (1–2 libras) por semana.",
        "frameAdjusted": "Peso ideal ajustado ±10% para complexiones corporales pequeñas o grandes."
      },
      "values": {
        "Underweight": "Bajo peso",
        "Normal weight": "Peso normal",
        "Overweight": "Sobrepeso",
        "Obese": "Obeso",
        "Obese II": "Obeso II",
        "Obese III": "Obeso III",
        "lose": "perder",
        "gain": "ganar",
        "weeks": "semanas",
        "You're within your ideal range!": "¡Estás dentro de tu rango ideal!",
        "Already at a healthy weight": "Ya tienes un peso saludable"
      },
      "formats": {
        "summary": "Tu peso ideal es aproximadamente {idealWeight}. Rango saludable: {idealRange}. IMC actual: {currentBmi} ({bmiCategory})."
      },
      "infoCards": {
        "formulaComparison": {
          "title": "📊 Resultados de Fórmulas",
          "items": {
            "0": "Peterson (2016) — Más precisa, basada en IMC",
            "1": "Devine (1974) — Más usada en medicina",
            "2": "Robinson (1983) — Estándar de seguros",
            "3": "Miller (1983) — Línea base más alta",
            "4": "Hamwi (1964) — Estándar clínico",
            "5": "Broca (1871) — Método más antiguo",
            "6": "Lorentz (1929) — Estándar europeo"
          }
        },
        "tips": {
          "title": "Consejos",
          "items": [
            "El peso ideal es una guía, no un objetivo estricto — enfócate en la composición corporal más que en el peso de la báscula",
            "Los atletas con alta masa muscular pueden exceder las fórmulas de PCI mientras están perfectamente saludables",
            "Apunta a 0.5–1 kg (1–2 libras) por semana para un cambio de peso seguro y sostenible",
            "El tamaño de la complexión corporal puede cambiar el peso ideal en un 10% — una persona de complexión grande naturalmente pesa más"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es el Peso Corporal Ideal?",
          "content": "El Peso Corporal Ideal (PCI) es un peso de referencia basado en altura, sexo y edad que se desarrolló originalmente para calcular dosis apropiadas de medicamentos. Con el tiempo, estas fórmulas se han adoptado como referencias generales de salud. El PCI no es un número único perfecto — representa un rango que se correlaciona con los menores riesgos de salud. La fórmula más validada es la de Peterson (2016), que usa cálculos basados en IMC. Las fórmulas más antiguas como Devine (1974) y Robinson (1983) aún se usan ampliamente en entornos clínicos. Es importante entender que el PCI no considera la masa muscular, densidad ósea o composición corporal individual. Una persona muy musculosa puede estar por encima de su PCI y aún ser muy saludable. El PCI debe usarse como un punto de datos entre varios al evaluar la salud, no como un objetivo definitivo."
        },
        "howItWorks": {
          "title": "Cómo Funciona Esta Calculadora",
          "content": "Esta calculadora computa tu peso ideal usando 7 fórmulas validadas y muestra el promedio como tu objetivo recomendado. Ajusta resultados por tamaño de complexión corporal (±10%), considera el nivel de actividad, te permite establecer un IMC objetivo personalizado y aplica umbrales de IMC específicos étnicos de la OMS para poblaciones asiáticas e isleñas del Pacífico. Si ingresas tu peso actual, muestra exactamente cuánto necesitas perder o ganar, con un cronograma realista basado en tasas seguras de cambio de peso de 0.5–1 kg por semana. El gráfico de barras y la tabla detallada te permiten comparar las 7 fórmulas lado a lado."
        },
        "formulas": {
          "title": "Las 7 Fórmulas Explicadas",
          "items": [
            {
              "text": "Peterson (2016): La fórmula más moderna y precisa. Usa objetivo de IMC: Peso = 2.2 × IMC + 3.5 × IMC × (Altura − 1.5m). Neutral al género y validada contra grandes conjuntos de datos.",
              "type": "info"
            },
            {
              "text": "Devine (1974): La más usada en medicina. Hombres: 50 + 2.3 kg por pulgada sobre 5 pies. Mujeres: 45.5 + 2.3 kg por pulgada. Originalmente para cálculos de dosis de medicamentos.",
              "type": "info"
            },
            {
              "text": "Robinson (1983): Refinamiento de Devine. Hombres: 52 + 1.9 kg por pulgada sobre 5 pies. Mujeres: 49 + 1.7 kg por pulgada. Basada en tablas de altura-peso de seguros de 1959.",
              "type": "info"
            },
            {
              "text": "Miller (1983): Usa datos de seguros de 1983. Hombres: 56.2 + 1.41 kg por pulgada sobre 5 pies. Mujeres: 53.1 + 1.36 kg. Produce estimaciones más altas en alturas más bajas.",
              "type": "info"
            },
            {
              "text": "Hamwi (1964): Estándar clínico. Hombres: 48 + 2.7 kg por pulgada sobre 5 pies. Mujeres: 45.5 + 2.2 kg. Se puede ajustar ±10% por tamaño de complexión corporal.",
              "type": "info"
            },
            {
              "text": "Broca (1871): La fórmula más antigua, creada por un cirujano del ejército francés. PCI = (Altura cm − 100) × factor (0.9 para hombres, 0.85 para mujeres). Simple pero menos precisa para extremos.",
              "type": "warning"
            },
            {
              "text": "Lorentz (1929): Fórmula europea. Hombres: (H − 100) − (H − 150)/4. Mujeres: (H − 100) − (H − 150)/2. Tiende a producir estimaciones más bajas para individuos más altos.",
              "type": "info"
            }
          ]
        },
        "ethnicBmi": {
          "title": "Ajustes Étnicos de IMC",
          "items": [
            {
              "text": "Umbrales estándar OMS: Bajo peso < 18.5, Normal 18.5–24.9, Sobrepeso 25–29.9, Obeso ≥ 30",
              "type": "info"
            },
            {
              "text": "Asiático / Sur Asiático: Mayores riesgos de salud con IMCs más bajos. El sobrepeso comienza en IMC 23, Obeso en 27.5",
              "type": "warning"
            },
            {
              "text": "Isleño del Pacífico: Algunas guías usan IMC 26 como umbral de sobrepeso",
              "type": "info"
            },
            {
              "text": "Estos ajustes reflejan diferencias en la distribución de grasa corporal y riesgo metabólico. Siempre consulta a un proveedor de salud para consejos personalizados",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Cálculos de Ejemplo",
          "description": "Ve cómo funciona la calculadora con números reales",
          "examples": [
            {
              "title": "Hombre de 5'10\", Complexión Mediana",
              "steps": [
                "Altura: 5'10\" (178 cm)",
                "Peterson: 74.2 kg (163.5 lbs)",
                "Devine: 73.0 kg (160.9 lbs)",
                "Robinson: 71.0 kg (156.5 lbs)",
                "Miller: 70.3 kg (155.0 lbs)",
                "Hamwi: 75.0 kg (165.3 lbs)",
                "Broca: 70.2 kg (154.8 lbs)",
                "Lorentz: 71.0 kg (156.5 lbs)",
                "Promedio: 72.1 kg (158.9 lbs)"
              ],
              "result": "Peso ideal: ~72 kg (159 lbs)"
            },
            {
              "title": "Mujer de 5'4\", Complexión Pequeña",
              "steps": [
                "Altura: 5'4\" (163 cm)",
                "Promedio de 7 fórmulas: 55.8 kg",
                "Ajuste de complexión: −10% (pequeña)",
                "Ajustado: 50.2 kg (110.7 lbs)",
                "Actividad: moderada (+0%)"
              ],
              "result": "Peso ideal: ~50 kg (111 lbs)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuál fórmula es la más precisa?",
          "answer": "La fórmula de Peterson (2016) se considera la más precisa para poblaciones modernas porque está basada en datos de IMC de estudios a gran escala y funciona para todas las alturas sin los sesgos de fórmulas más antiguas. La fórmula de Devine (1974) es la más usada en entornos clínicos para dosis de medicamentos pero tiende a subestimar el peso ideal para mujeres más bajas y sobreestimar para hombres más altos. Esta calculadora muestra las 7 fórmulas para que puedas comparar resultados."
        },
        {
          "question": "¿Cómo afecta el tamaño de complexión corporal al peso ideal?",
          "answer": "Una persona con complexión grande tiene más masa ósea y naturalmente pesa más que alguien con complexión pequeña a la misma altura. El ajuste estándar es ±10% del peso ideal calculado. Puedes estimar el tamaño de complexión midiendo la circunferencia de tu muñeca. Para mujeres menores de 5'2\", una muñeca menor de 5.5\" indica complexión pequeña, mientras que más de 5.75\" sugiere complexión grande. Para hombres mayores de 5'5\", una muñeca menor de 6.5\" es pequeña y más de 7.5\" es grande."
        },
        {
          "question": "¿Por qué los resultados de las fórmulas son diferentes entre sí?",
          "answer": "Cada fórmula fue desarrollada por diferentes investigadores usando diferentes conjuntos de datos. Hamwi (1964) para nutrición clínica, Devine (1974) para dosis de medicamentos, Robinson y Miller (1983) de tablas de seguros, Peterson (2016) de investigación moderna de IMC. Concuerdan más para alturas promedio y divergen para personas muy bajas o altas. Usar el promedio de las 7 da una estimación más confiable."
        },
        {
          "question": "¿Debo apuntar exactamente a mi peso ideal?",
          "answer": "No. El peso ideal es una guía, no un objetivo preciso. Tu rango de peso saludable — basado en un IMC entre 18.5 y 24.9 — es más útil que un solo número. Factores como masa muscular, densidad ósea, distribución de grasa corporal y nivel de condición física importan más. Un atleta con masa muscular significativa puede pesar por encima de su PCI mientras está en excelente salud."
        },
        {
          "question": "¿Qué tan rápido puedo alcanzar mi peso ideal de forma segura?",
          "answer": "Las guías médicas recomiendan perder 0.5–1 kg (1–2 libras) por semana para pérdida de peso sostenible. Una pérdida más rápida a menudo implica pérdida muscular y ralentización metabólica. Para ganar peso, 0.25–0.5 kg por semana es realista para masa magra. La calculadora proporciona un cronograma basado en estas tasas seguras."
        },
        {
          "question": "¿Por qué las poblaciones asiáticas tienen diferentes umbrales de IMC?",
          "answer": "Las poblaciones asiáticas y sur asiáticas tienden a tener porcentajes de grasa corporal más altos al mismo IMC comparado con poblaciones europeas, y desarrollan enfermedades metabólicas con IMCs más bajos. La OMS recomienda un umbral de sobrepeso de IMC 23 (en lugar de 25) y obesidad en 27.5 (en lugar de 30) para estas poblaciones."
        }
      ],
      "detailedTable": {
        "formulaComparison": {
          "button": "Ver Todos los Resultados de Fórmulas",
          "title": "Peso Ideal por Fórmula",
          "columns": {
            "formula": "Fórmula",
            "year": "Año",
            "weight": "Peso Ideal",
            "range": "Rango ±5%"
          }
        }
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
      "name": "Calculadora de Peso Ideal",
      "slug": "calculadora-peso-ideal",
      "subtitle": "Encontre seu peso corporal ideal usando 7 fórmulas cientificamente comprovadas — com ajustes para estrutura corporal, nível de atividade e etnia",
      "breadcrumb": "Peso Ideal",
      "seo": {
        "title": "Calculadora de Peso Ideal — 7 Fórmulas, Estrutura Corporal e Faixa de IMC",
        "description": "Calcule seu peso corporal ideal usando as fórmulas de Peterson, Devine, Robinson, Miller, Hamwi, Broca e Lorentz. Inclui ajuste para estrutura corporal, nível de atividade, limites étnicos de IMC e cronograma de perda de peso.",
        "shortDescription": "Encontre seu peso ideal usando 7 fórmulas científicas",
        "keywords": [
          "calculadora peso ideal",
          "peso corporal ideal",
          "quanto devo pesar",
          "peso ideal para altura",
          "peso ideal para minha altura e idade",
          "calculadora peso saudável",
          "calculadora PCI",
          "peso ideal por estrutura corporal"
        ]
      },
      "inputs": {
        "gender": {
          "label": "Sexo",
          "options": {
            "male": "Masculino",
            "female": "Feminino"
          }
        },
        "age": {
          "label": "Idade"
        },
        "height": {
          "label": "Altura"
        },
        "currentWeight": {
          "label": "Peso Atual",
          "helpText": "Opcional — usado para mostrar o quão longe você está do seu peso ideal"
        },
        "bodyFrame": {
          "label": "Estrutura Corporal",
          "helpText": "Baseado na circunferência do punho. Ajusta o peso ideal em ±10%.",
          "options": {
            "small": "Pequena",
            "medium": "Média",
            "large": "Grande"
          },
          "descriptions": {
            "small": "Ossos estreitos",
            "medium": "Estrutura média",
            "large": "Ossos largos"
          }
        },
        "wristCircumference": {
          "label": "Circunferência do Punho",
          "helpText": "Meça ao redor da parte mais estreita do seu punho, logo acima do osso"
        },
        "activityLevel": {
          "label": "Nível de Atividade",
          "helpText": "Maior atividade suporta mais massa muscular, aumentando ligeiramente o peso ideal",
          "options": {
            "sedentary": "Sedentário",
            "light": "Levemente Ativo",
            "moderate": "Moderadamente Ativo",
            "active": "Ativo",
            "veryActive": "Muito Ativo / Atleta"
          }
        },
        "targetBmi": {
          "label": "IMC Alvo",
          "helpText": "Padrão é 22 (meio da faixa saudável). Atletas podem almejar 23–25."
        },
        "ethnicity": {
          "label": "Etnia",
          "helpText": "A OMS usa diferentes limites de IMC para populações asiáticas e das ilhas do Pacífico",
          "options": {
            "standard": "Padrão (OMS)",
            "asian": "Asiático / Sul-Asiático",
            "pacific": "Ilhas do Pacífico"
          }
        }
      },
      "results": {
        "idealWeight": {
          "label": "Peso Ideal"
        },
        "idealRange": {
          "label": "Faixa de Peso Saudável"
        },
        "currentBmi": {
          "label": "Seu IMC Atual"
        },
        "bmiCategory": {
          "label": "Categoria do IMC"
        },
        "weightGap": {
          "label": "Peso até o Objetivo"
        },
        "timeline": {
          "label": "Cronograma Estimado"
        },
        "frameAdjusted": {
          "label": "Ideal Ajustado por Estrutura"
        },
        "petersonResult": {
          "label": "Peterson (2016)"
        },
        "devineResult": {
          "label": "Devine (1974)"
        },
        "robinsonResult": {
          "label": "Robinson (1983)"
        },
        "millerResult": {
          "label": "Miller (1983)"
        },
        "hamwiResult": {
          "label": "Hamwi (1964)"
        },
        "brocaResult": {
          "label": "Broca (1871)"
        },
        "lorentzResult": {
          "label": "Lorentz (1929)"
        }
      },
      "presets": {
        "averageMale": {
          "label": "Homem Médio",
          "description": "Estrutura média, atividade moderada"
        },
        "averageFemale": {
          "label": "Mulher Média",
          "description": "Estrutura média, atividade moderada"
        },
        "athleteMale": {
          "label": "Homem Atleta",
          "description": "Estrutura grande, muito ativo, IMC 23"
        },
        "petiteFemale": {
          "label": "Mulher Pequena",
          "description": "Estrutura pequena, atividade moderada, IMC 21"
        }
      },
      "tooltips": {
        "idealWeight": "Média de todas as 7 fórmulas validadas, ajustada para estrutura corporal e atividade.",
        "idealRange": "Faixa de peso para um IMC saudável entre 18,5 e 24,9.",
        "currentBmi": "Índice de Massa Corporal baseado no seu peso e altura atuais.",
        "weightGap": "Quanto peso você precisa perder ou ganhar para alcançar seu peso ideal.",
        "timeline": "Semanas estimadas a uma taxa segura de 0,5–1 kg por semana.",
        "frameAdjusted": "Peso ideal ajustado ±10% para estruturas corporais pequenas ou grandes."
      },
      "values": {
        "Underweight": "Abaixo do peso",
        "Normal weight": "Peso normal",
        "Overweight": "Sobrepeso",
        "Obese": "Obeso",
        "Obese II": "Obeso II",
        "Obese III": "Obeso III",
        "lose": "perder",
        "gain": "ganhar",
        "weeks": "semanas",
        "You're within your ideal range!": "Você está dentro da sua faixa ideal!",
        "Already at a healthy weight": "Já está em um peso saudável"
      },
      "formats": {
        "summary": "Seu peso ideal é aproximadamente {idealWeight}. Faixa saudável: {idealRange}. IMC atual: {currentBmi} ({bmiCategory})."
      },
      "infoCards": {
        "formulaComparison": {
          "title": "📊 Resultados das Fórmulas",
          "items": {
            "0": "Peterson (2016) — Mais precisa, baseada em IMC",
            "1": "Devine (1974) — Mais usada na medicina",
            "2": "Robinson (1983) — Padrão de seguros",
            "3": "Miller (1983) — Base mais alta",
            "4": "Hamwi (1964) — Padrão clínico",
            "5": "Broca (1871) — Método mais antigo",
            "6": "Lorentz (1929) — Padrão europeu"
          }
        },
        "tips": {
          "title": "Dicas",
          "items": [
            "O peso ideal é uma orientação, não um alvo rígido — foque na composição corporal em vez do peso na balança",
            "Atletas com alta massa muscular podem exceder as fórmulas de PCI sendo perfeitamente saudáveis",
            "Almeje 0,5–1 kg por semana para mudanças de peso seguras e sustentáveis",
            "O tamanho da estrutura corporal pode alterar o peso ideal em 10% — uma pessoa de estrutura grande naturalmente pesa mais"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é Peso Corporal Ideal?",
          "content": "O Peso Corporal Ideal (PCI) é um peso de referência baseado em altura, sexo e idade que foi originalmente desenvolvido para calcular dosagens adequadas de medicamentos. Com o tempo, essas fórmulas foram adotadas como referências gerais de saúde. O PCI não é um número único perfeito — representa uma faixa que se correlaciona com os menores riscos de saúde. A fórmula mais validada é a de Peterson (2016), que usa cálculos baseados no IMC. Fórmulas mais antigas como Devine (1974) e Robinson (1983) ainda são amplamente usadas em ambientes clínicos. É importante entender que o PCI não considera massa muscular, densidade óssea ou composição corporal individual. Uma pessoa muito musculosa pode estar acima do seu PCI e ainda assim ser muito saudável. O PCI deve ser usado como um ponto de dados entre vários ao avaliar a saúde, não como um objetivo definitivo."
        },
        "howItWorks": {
          "title": "Como Esta Calculadora Funciona",
          "content": "Esta calculadora calcula seu peso ideal usando 7 fórmulas validadas e mostra a média como seu alvo recomendado. Ela ajusta os resultados para o tamanho da estrutura corporal (±10%), considera o nível de atividade, permite definir um IMC alvo personalizado e aplica limites étnicos específicos de IMC da OMS para populações asiáticas e das ilhas do Pacífico. Se você inserir seu peso atual, ela mostra exatamente quanto você precisa perder ou ganhar, com um cronograma realista baseado em taxas seguras de mudança de peso de 0,5–1 kg por semana. O gráfico de barras e a tabela detalhada permitem comparar todas as 7 fórmulas lado a lado."
        },
        "formulas": {
          "title": "As 7 Fórmulas Explicadas",
          "items": [
            {
              "text": "Peterson (2016): A fórmula mais moderna e precisa. Usa alvo de IMC: Peso = 2,2 × IMC + 3,5 × IMC × (Altura − 1,5m). Neutra em gênero e validada contra grandes conjuntos de dados.",
              "type": "info"
            },
            {
              "text": "Devine (1974): A mais amplamente usada na medicina. Homens: 50 + 2,3 kg por polegada acima de 5 pés. Mulheres: 45,5 + 2,3 kg por polegada. Originalmente para cálculos de dosagem de medicamentos.",
              "type": "info"
            },
            {
              "text": "Robinson (1983): Refinamento de Devine. Homens: 52 + 1,9 kg por polegada acima de 5 pés. Mulheres: 49 + 1,7 kg por polegada. Baseada nas tabelas de altura-peso de seguros de 1959.",
              "type": "info"
            },
            {
              "text": "Miller (1983): Usa dados de seguros de 1983. Homens: 56,2 + 1,41 kg por polegada acima de 5 pés. Mulheres: 53,1 + 1,36 kg. Produz estimativas mais altas em alturas menores.",
              "type": "info"
            },
            {
              "text": "Hamwi (1964): Padrão clínico. Homens: 48 + 2,7 kg por polegada acima de 5 pés. Mulheres: 45,5 + 2,2 kg. Pode ser ajustada ±10% para tamanho da estrutura corporal.",
              "type": "info"
            },
            {
              "text": "Broca (1871): A fórmula mais antiga, criada por um cirurgião do exército francês. PCI = (Altura cm − 100) × fator (0,9 para homens, 0,85 para mulheres). Simples mas menos precisa para extremos.",
              "type": "warning"
            },
            {
              "text": "Lorentz (1929): Fórmula europeia. Homens: (A − 100) − (A − 150)/4. Mulheres: (A − 100) − (A − 150)/2. Tende a produzir estimativas menores para indivíduos mais altos.",
              "type": "info"
            }
          ]
        },
        "ethnicBmi": {
          "title": "Ajustes Étnicos do IMC",
          "items": [
            {
              "text": "Limites padrão da OMS: Abaixo do peso < 18,5, Normal 18,5–24,9, Sobrepeso 25–29,9, Obeso ≥ 30",
              "type": "info"
            },
            {
              "text": "Asiático / Sul-Asiático: Maiores riscos de saúde em IMCs menores. Sobrepeso inicia no IMC 23, Obeso em 27,5",
              "type": "warning"
            },
            {
              "text": "Ilhas do Pacífico: Algumas diretrizes usam IMC 26 como limite de sobrepeso",
              "type": "info"
            },
            {
              "text": "Esses ajustes refletem diferenças na distribuição de gordura corporal e risco metabólico. Sempre consulte um profissional de saúde para orientação personalizada",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculos",
          "description": "Veja como a calculadora funciona com números reais",
          "examples": [
            {
              "title": "Homem 1,78m, Estrutura Média",
              "steps": [
                "Altura: 1,78m",
                "Peterson: 74,2 kg",
                "Devine: 73,0 kg",
                "Robinson: 71,0 kg",
                "Miller: 70,3 kg",
                "Hamwi: 75,0 kg",
                "Broca: 70,2 kg",
                "Lorentz: 71,0 kg",
                "Média: 72,1 kg"
              ],
              "result": "Peso ideal: ~72 kg"
            },
            {
              "title": "Mulher 1,63m, Estrutura Pequena",
              "steps": [
                "Altura: 1,63m",
                "Média das 7 fórmulas: 55,8 kg",
                "Ajuste estrutura: −10% (pequena)",
                "Ajustado: 50,2 kg",
                "Atividade: moderada (+0%)"
              ],
              "result": "Peso ideal: ~50 kg"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qual fórmula é a mais precisa?",
          "answer": "A fórmula de Peterson (2016) é considerada a mais precisa para populações modernas porque é baseada em dados de IMC de estudos em larga escala e funciona para todas as alturas sem os vieses de fórmulas mais antigas. A fórmula de Devine (1974) é a mais amplamente usada em ambientes clínicos para dosagem de medicamentos, mas tende a subestimar o peso ideal para mulheres mais baixas e superestimar para homens mais altos. Esta calculadora mostra todas as 7 fórmulas para que você possa comparar os resultados."
        },
        {
          "question": "Como o tamanho da estrutura corporal afeta o peso ideal?",
          "answer": "Uma pessoa com estrutura grande tem mais massa óssea e naturalmente pesa mais que alguém com estrutura pequena na mesma altura. O ajuste padrão é ±10% do peso ideal calculado. Você pode estimar o tamanho da estrutura medindo a circunferência do punho. Para mulheres abaixo de 1,57m, um punho abaixo de 14cm indica estrutura pequena, enquanto acima de 14,6cm sugere estrutura grande. Para homens acima de 1,65m, um punho abaixo de 16,5cm é pequeno e acima de 19cm é grande."
        },
        {
          "question": "Por que os resultados das fórmulas são diferentes entre si?",
          "answer": "Cada fórmula foi desenvolvida por diferentes pesquisadores usando diferentes conjuntos de dados. Hamwi (1964) para nutrição clínica, Devine (1974) para dosagem de medicamentos, Robinson e Miller (1983) de tabelas de seguros, Peterson (2016) de pesquisas modernas de IMC. Elas concordam mais para alturas médias e divergem para pessoas muito baixas ou muito altas. Usar a média de todas as 7 dá uma estimativa mais confiável."
        },
        {
          "question": "Devo almejar exatamente meu peso ideal?",
          "answer": "Não. O peso ideal é uma orientação, não um alvo preciso. Sua faixa de peso saudável — baseada em um IMC entre 18,5 e 24,9 — é mais útil que um número único. Fatores como massa muscular, densidade óssea, distribuição de gordura corporal e nível de condicionamento físico importam mais. Um atleta com massa muscular significativa pode pesar acima do seu PCI enquanto está em excelente saúde."
        },
        {
          "question": "Quão rápido posso alcançar meu peso ideal com segurança?",
          "answer": "As diretrizes médicas recomendam perder 0,5–1 kg por semana para perda de peso sustentável. Perda mais rápida frequentemente envolve perda muscular e desaceleração metabólica. Para ganho de peso, 0,25–0,5 kg por semana é realista para massa magra. A calculadora fornece um cronograma baseado nessas taxas seguras."
        },
        {
          "question": "Por que populações asiáticas têm diferentes limites de IMC?",
          "answer": "Populações asiáticas e sul-asiáticas tendem a ter percentuais de gordura corporal mais altos no mesmo IMC comparado às populações europeias, e desenvolvem doenças metabólicas em IMCs menores. A OMS recomenda um limite de sobrepeso de IMC 23 (em vez de 25) e obesidade em 27,5 (em vez de 30) para essas populações."
        }
      ],
      "detailedTable": {
        "formulaComparison": {
          "button": "Ver Todos os Resultados das Fórmulas",
          "title": "Peso Ideal por Fórmula",
          "columns": {
            "formula": "Fórmula",
            "year": "Ano",
            "weight": "Peso Ideal",
            "range": "Faixa ±5%"
          }
        }
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
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      }
    },
    fr: {
      "name": "Calculateur de Poids Idéal",
      "slug": "calculateur-poids-ideal",
      "subtitle": "Trouvez votre poids corporel idéal en utilisant 7 formules scientifiques — avec ajustements pour la morphologie, le niveau d'activité et l'origine ethnique",
      "breadcrumb": "Poids Idéal",
      "seo": {
        "title": "Calculateur de Poids Idéal — 7 Formules, Morphologie et Plage IMC",
        "description": "Calculez votre poids corporel idéal avec les formules Peterson, Devine, Robinson, Miller, Hamwi, Broca et Lorentz. Inclut l'ajustement morphologique, le niveau d'activité, les seuils IMC ethniques et un calendrier de perte de poids.",
        "shortDescription": "Trouvez votre poids idéal avec 7 formules scientifiques",
        "keywords": [
          "calculateur poids idéal",
          "poids corporel idéal",
          "combien dois-je peser",
          "poids idéal pour la taille",
          "poids idéal pour ma taille et âge",
          "calculateur poids santé",
          "calculateur PCI",
          "poids idéal par morphologie"
        ]
      },
      "inputs": {
        "gender": {
          "label": "Sexe",
          "options": {
            "male": "Homme",
            "female": "Femme"
          }
        },
        "age": {
          "label": "Âge"
        },
        "height": {
          "label": "Taille"
        },
        "currentWeight": {
          "label": "Poids Actuel",
          "helpText": "Optionnel — utilisé pour montrer votre écart par rapport au poids idéal"
        },
        "bodyFrame": {
          "label": "Morphologie",
          "helpText": "Basé sur la circonférence du poignet. Ajuste le poids idéal de ±10%.",
          "options": {
            "small": "Petite",
            "medium": "Moyenne",
            "large": "Grande"
          },
          "descriptions": {
            "small": "Ossature fine",
            "medium": "Corpulence moyenne",
            "large": "Ossature large"
          }
        },
        "wristCircumference": {
          "label": "Circonférence du Poignet",
          "helpText": "Mesurez autour de la partie la plus fine de votre poignet, juste au-dessus de l'os"
        },
        "activityLevel": {
          "label": "Niveau d'Activité",
          "helpText": "Une activité plus élevée favorise plus de masse musculaire, augmentant légèrement le poids idéal",
          "options": {
            "sedentary": "Sédentaire",
            "light": "Légèrement Actif",
            "moderate": "Modérément Actif",
            "active": "Actif",
            "veryActive": "Très Actif / Athlète"
          }
        },
        "targetBmi": {
          "label": "IMC Cible",
          "helpText": "Par défaut 22 (milieu de la plage saine). Les athlètes peuvent viser 23–25."
        },
        "ethnicity": {
          "label": "Origine Ethnique",
          "helpText": "L'OMS utilise différents seuils d'IMC pour les populations asiatiques et insulaires du Pacifique",
          "options": {
            "standard": "Standard (OMS)",
            "asian": "Asiatique / Sud-Asiatique",
            "pacific": "Insulaire du Pacifique"
          }
        }
      },
      "results": {
        "idealWeight": {
          "label": "Poids Idéal"
        },
        "idealRange": {
          "label": "Plage de Poids Santé"
        },
        "currentBmi": {
          "label": "Votre IMC Actuel"
        },
        "bmiCategory": {
          "label": "Catégorie IMC"
        },
        "weightGap": {
          "label": "Poids à Atteindre"
        },
        "timeline": {
          "label": "Calendrier Estimé"
        },
        "frameAdjusted": {
          "label": "Idéal Ajusté Morphologie"
        },
        "petersonResult": {
          "label": "Peterson (2016)"
        },
        "devineResult": {
          "label": "Devine (1974)"
        },
        "robinsonResult": {
          "label": "Robinson (1983)"
        },
        "millerResult": {
          "label": "Miller (1983)"
        },
        "hamwiResult": {
          "label": "Hamwi (1964)"
        },
        "brocaResult": {
          "label": "Broca (1871)"
        },
        "lorentzResult": {
          "label": "Lorentz (1929)"
        }
      },
      "presets": {
        "averageMale": {
          "label": "Homme Moyen",
          "description": "Morphologie moyenne, activité modérée"
        },
        "averageFemale": {
          "label": "Femme Moyenne",
          "description": "Morphologie moyenne, activité modérée"
        },
        "athleteMale": {
          "label": "Homme Athlète",
          "description": "Grande morphologie, très actif, IMC 23"
        },
        "petiteFemale": {
          "label": "Femme Menue",
          "description": "Petite morphologie, activité modérée, IMC 21"
        }
      },
      "tooltips": {
        "idealWeight": "Moyenne des 7 formules validées, ajustée pour la morphologie et l'activité.",
        "idealRange": "Plage de poids pour un IMC sain entre 18,5 et 24,9.",
        "currentBmi": "Indice de Masse Corporelle basé sur votre poids et taille actuels.",
        "weightGap": "Combien de poids vous devez perdre ou prendre pour atteindre votre poids idéal.",
        "timeline": "Semaines estimées à un rythme sûr de 0,5–1 kg par semaine.",
        "frameAdjusted": "Poids idéal ajusté ±10% pour les morphologies petites ou grandes."
      },
      "values": {
        "Underweight": "Insuffisance pondérale",
        "Normal weight": "Poids normal",
        "Overweight": "Surpoids",
        "Obese": "Obésité",
        "Obese II": "Obésité II",
        "Obese III": "Obésité III",
        "lose": "perdre",
        "gain": "prendre",
        "weeks": "semaines",
        "You're within your ideal range!": "Vous êtes dans votre plage idéale !",
        "Already at a healthy weight": "Déjà à un poids santé"
      },
      "formats": {
        "summary": "Votre poids idéal est d'environ {idealWeight}. Plage santé : {idealRange}. IMC actuel : {currentBmi} ({bmiCategory})."
      },
      "infoCards": {
        "formulaComparison": {
          "title": "📊 Résultats des Formules",
          "items": {
            "0": "Peterson (2016) — Plus précise, basée sur l'IMC",
            "1": "Devine (1974) — Plus utilisée en médecine",
            "2": "Robinson (1983) — Standard des assurances",
            "3": "Miller (1983) — Base plus élevée",
            "4": "Hamwi (1964) — Standard clinique",
            "5": "Broca (1871) — Méthode la plus ancienne",
            "6": "Lorentz (1929) — Standard européen"
          }
        },
        "tips": {
          "title": "Conseils",
          "items": [
            "Le poids idéal est un guide, pas un objectif strict — concentrez-vous sur la composition corporelle plutôt que sur le poids",
            "Les athlètes avec une masse musculaire élevée peuvent dépasser les formules PCI tout en étant parfaitement en santé",
            "Visez 0,5–1 kg par semaine pour un changement de poids sûr et durable",
            "La morphologie peut décaler le poids idéal de 10% — une personne à grande ossature pèse naturellement plus"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que le Poids Corporel Idéal ?",
          "content": "Le Poids Corporel Idéal (PCI) est un poids de référence basé sur la taille, le sexe et l'âge qui a été développé à l'origine pour calculer les dosages de médicaments appropriés. Au fil du temps, ces formules ont été adoptées comme repères de santé générale. Le PCI n'est pas un nombre parfait unique — il représente une plage qui correspond aux risques de santé les plus faibles. La formule la plus validée est Peterson (2016), qui utilise des calculs basés sur l'IMC. Les formules plus anciennes comme Devine (1974) et Robinson (1983) sont encore largement utilisées en milieu clinique. Il est important de comprendre que le PCI ne tient pas compte de la masse musculaire, de la densité osseuse ou de la composition corporelle individuelle. Une personne très musclée peut être au-dessus de son PCI et rester très en santé. Le PCI doit être utilisé comme un point de données parmi plusieurs lors de l'évaluation de la santé, non comme un objectif définitif."
        },
        "howItWorks": {
          "title": "Comment Fonctionne ce Calculateur",
          "content": "Ce calculateur calcule votre poids idéal en utilisant 7 formules validées et montre la moyenne comme votre cible recommandée. Il ajuste les résultats pour la morphologie (±10%), tient compte du niveau d'activité, vous permet de définir un IMC cible personnalisé, et applique les seuils d'IMC ethniques spécifiques de l'OMS pour les populations asiatiques et insulaires du Pacifique. Si vous entrez votre poids actuel, il montre exactement combien vous devez perdre ou prendre, avec un calendrier réaliste basé sur des taux de changement de poids sûrs de 0,5–1 kg par semaine. Le graphique en barres et le tableau détaillé vous permettent de comparer les 7 formules côte à côte."
        },
        "formulas": {
          "title": "Les 7 Formules Expliquées",
          "items": [
            {
              "text": "Peterson (2016) : La formule la plus moderne et précise. Utilise l'IMC cible : Poids = 2,2 × IMC + 3,5 × IMC × (Taille − 1,5m). Neutre en genre et validée contre de grandes bases de données.",
              "type": "info"
            },
            {
              "text": "Devine (1974) : La plus utilisée en médecine. Hommes : 50 + 2,3 kg par pouce au-dessus de 5 pi. Femmes : 45,5 + 2,3 kg par pouce. Originalement pour les calculs de dosage de médicaments.",
              "type": "info"
            },
            {
              "text": "Robinson (1983) : Raffinement de Devine. Hommes : 52 + 1,9 kg par pouce au-dessus de 5 pi. Femmes : 49 + 1,7 kg par pouce. Basée sur les tables taille-poids d'assurance de 1959.",
              "type": "info"
            },
            {
              "text": "Miller (1983) : Utilise les données d'assurance de 1983. Hommes : 56,2 + 1,41 kg par pouce au-dessus de 5 pi. Femmes : 53,1 + 1,36 kg. Produit des estimations plus élevées pour les tailles courtes.",
              "type": "info"
            },
            {
              "text": "Hamwi (1964) : Standard clinique. Hommes : 48 + 2,7 kg par pouce au-dessus de 5 pi. Femmes : 45,5 + 2,2 kg. Peut être ajustée ±10% pour la morphologie.",
              "type": "info"
            },
            {
              "text": "Broca (1871) : La formule la plus ancienne, créée par un chirurgien de l'armée française. PCI = (Taille cm − 100) × facteur (0,9 pour hommes, 0,85 pour femmes). Simple mais moins précise pour les extrêmes.",
              "type": "warning"
            },
            {
              "text": "Lorentz (1929) : Formule européenne. Hommes : (T − 100) − (T − 150)/4. Femmes : (T − 100) − (T − 150)/2. Tend à produire des estimations plus faibles pour les personnes grandes.",
              "type": "info"
            }
          ]
        },
        "ethnicBmi": {
          "title": "Ajustements IMC Ethniques",
          "items": [
            {
              "text": "Seuils OMS standard : Insuffisance pondérale < 18,5, Normal 18,5–24,9, Surpoids 25–29,9, Obésité ≥ 30",
              "type": "info"
            },
            {
              "text": "Asiatique / Sud-Asiatique : Risques de santé plus élevés à IMC plus bas. Surpoids commence à IMC 23, Obésité à 27,5",
              "type": "warning"
            },
            {
              "text": "Insulaire du Pacifique : Certaines directives utilisent IMC 26 comme seuil de surpoids",
              "type": "info"
            },
            {
              "text": "Ces ajustements reflètent les différences de répartition de graisse corporelle et de risque métabolique. Consultez toujours un professionnel de la santé pour des conseils personnalisés",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calculs",
          "description": "Voyez comment le calculateur fonctionne avec des chiffres réels",
          "examples": [
            {
              "title": "Homme 1,78m, Morphologie Moyenne",
              "steps": [
                "Taille : 1,78m (5'10\")",
                "Peterson : 74,2 kg",
                "Devine : 73,0 kg",
                "Robinson : 71,0 kg",
                "Miller : 70,3 kg",
                "Hamwi : 75,0 kg",
                "Broca : 70,2 kg",
                "Lorentz : 71,0 kg",
                "Moyenne : 72,1 kg"
              ],
              "result": "Poids idéal : ~72 kg"
            },
            {
              "title": "Femme 1,63m, Petite Morphologie",
              "steps": [
                "Taille : 1,63m (5'4\")",
                "Moyenne des 7 formules : 55,8 kg",
                "Ajustement morphologie : −10% (petite)",
                "Ajusté : 50,2 kg",
                "Activité : modérée (+0%)"
              ],
              "result": "Poids idéal : ~50 kg"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle formule est la plus précise ?",
          "answer": "La formule Peterson (2016) est considérée comme la plus précise pour les populations modernes car elle est basée sur des données d'IMC d'études à grande échelle et fonctionne pour toutes les tailles sans les biais des formules plus anciennes. La formule Devine (1974) est la plus utilisée en milieu clinique pour le dosage de médicaments mais tend à sous-estimer le poids idéal pour les femmes courtes et surestimer pour les hommes grands. Ce calculateur montre les 7 formules pour que vous puissiez comparer les résultats."
        },
        {
          "question": "Comment la morphologie affecte-t-elle le poids idéal ?",
          "answer": "Une personne avec une grande ossature a plus de masse osseuse et pèse naturellement plus que quelqu'un avec une petite ossature à la même taille. L'ajustement standard est ±10% du poids idéal calculé. Vous pouvez estimer la morphologie en mesurant la circonférence de votre poignet. Pour les femmes sous 1,57m, un poignet sous 14cm indique une petite morphologie, tandis qu'au-dessus de 14,6cm suggère une grande morphologie. Pour les hommes au-dessus de 1,65m, un poignet sous 16,5cm est petit et au-dessus de 19cm est grand."
        },
        {
          "question": "Pourquoi les résultats des formules diffèrent-ils ?",
          "answer": "Chaque formule a été développée par différents chercheurs utilisant différents ensembles de données. Hamwi (1964) pour la nutrition clinique, Devine (1974) pour le dosage de médicaments, Robinson et Miller (1983) à partir de tables d'assurance, Peterson (2016) à partir de recherches d'IMC modernes. Elles s'accordent le mieux pour les tailles moyennes et divergent pour les personnes très courtes ou grandes. Utiliser la moyenne des 7 donne une estimation plus fiable."
        },
        {
          "question": "Dois-je viser exactement mon poids idéal ?",
          "answer": "Non. Le poids idéal est un guide, pas une cible précise. Votre plage de poids santé — basée sur un IMC entre 18,5 et 24,9 — est plus utile qu'un seul nombre. Des facteurs comme la masse musculaire, la densité osseuse, la répartition de graisse corporelle et le niveau de forme physique comptent plus. Un athlète avec une masse musculaire significative peut peser au-dessus de son PCI tout en étant en excellente santé."
        },
        {
          "question": "À quelle vitesse puis-je atteindre mon poids idéal en sécurité ?",
          "answer": "Les directives médicales recommandent de perdre 0,5–1 kg par semaine pour une perte de poids durable. Une perte plus rapide implique souvent une perte de muscle et un ralentissement métabolique. Pour la prise de poids, 0,25–0,5 kg par semaine est réaliste pour la masse maigre. Le calculateur fournit un calendrier basé sur ces taux sûrs."
        },
        {
          "question": "Pourquoi les populations asiatiques ont-elles des seuils d'IMC différents ?",
          "answer": "Les populations asiatiques et sud-asiatiques tendent à avoir des pourcentages de graisse corporelle plus élevés au même IMC comparé aux populations européennes, et développent des maladies métaboliques à des IMC plus bas. L'OMS recommande un seuil de surpoids d'IMC 23 (au lieu de 25) et d'obésité à 27,5 (au lieu de 30) pour ces populations."
        }
      ],
      "detailedTable": {
        "formulaComparison": {
          "button": "Voir Tous les Résultats des Formules",
          "title": "Poids Idéal par Formule",
          "columns": {
            "formula": "Formule",
            "year": "Année",
            "weight": "Poids Idéal",
            "range": "Plage ±5%"
          }
        }
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
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      }
    },
    de: {
      "name": "Idealgewicht Rechner",
      "slug": "idealgewicht-rechner",
      "subtitle": "Finden Sie Ihr ideales Körpergewicht mit 7 wissenschaftlich fundierten Formeln — mit Körperbau, Aktivitätslevel und ethnischen Anpassungen",
      "breadcrumb": "Idealgewicht",
      "seo": {
        "title": "Idealgewicht Rechner — 7 Formeln, Körperbau & BMI-Bereich",
        "description": "Berechnen Sie Ihr ideales Körpergewicht mit Peterson, Devine, Robinson, Miller, Hamwi, Broca und Lorentz Formeln. Inklusive Körperbau-Anpassung, Aktivitätslevel, ethnische BMI-Schwellenwerte und Gewichtsverlust-Zeitplan.",
        "shortDescription": "Finden Sie Ihr Idealgewicht mit 7 wissenschaftlichen Formeln",
        "keywords": [
          "idealgewicht rechner",
          "ideales körpergewicht",
          "wie viel sollte ich wiegen",
          "idealgewicht für körpergröße",
          "idealgewicht für meine größe und alter",
          "gesundes gewicht rechner",
          "IBW rechner",
          "idealgewicht nach körperbau"
        ]
      },
      "inputs": {
        "gender": {
          "label": "Geschlecht",
          "options": {
            "male": "Männlich",
            "female": "Weiblich"
          }
        },
        "age": {
          "label": "Alter"
        },
        "height": {
          "label": "Körpergröße"
        },
        "currentWeight": {
          "label": "Aktuelles Gewicht",
          "helpText": "Optional — zeigt an, wie weit Sie von Ihrem Idealgewicht entfernt sind"
        },
        "bodyFrame": {
          "label": "Körperbau",
          "helpText": "Basiert auf Handgelenkumfang. Passt Idealgewicht um ±10% an.",
          "options": {
            "small": "Klein",
            "medium": "Mittel",
            "large": "Groß"
          },
          "descriptions": {
            "small": "Schmale Knochen",
            "medium": "Durchschnittlicher Körperbau",
            "large": "Breite Knochen"
          }
        },
        "wristCircumference": {
          "label": "Handgelenkumfang",
          "helpText": "Messen Sie um die schmalste Stelle Ihres Handgelenks, direkt über dem Knochen"
        },
        "activityLevel": {
          "label": "Aktivitätslevel",
          "helpText": "Höhere Aktivität unterstützt mehr Muskelmasse und erhöht das Idealgewicht leicht",
          "options": {
            "sedentary": "Sitzend",
            "light": "Leicht aktiv",
            "moderate": "Mäßig aktiv",
            "active": "Aktiv",
            "veryActive": "Sehr aktiv / Sportler"
          }
        },
        "targetBmi": {
          "label": "Ziel-BMI",
          "helpText": "Standard ist 22 (mittlerer gesunder Bereich). Sportler können 23–25 anstreben."
        },
        "ethnicity": {
          "label": "Ethnizität",
          "helpText": "Die WHO verwendet unterschiedliche BMI-Schwellenwerte für asiatische und pazifische Bevölkerungsgruppen",
          "options": {
            "standard": "Standard (WHO)",
            "asian": "Asiatisch / Südasiatisch",
            "pacific": "Pazifische Inseln"
          }
        }
      },
      "results": {
        "idealWeight": {
          "label": "Idealgewicht"
        },
        "idealRange": {
          "label": "Gesunder Gewichtsbereich"
        },
        "currentBmi": {
          "label": "Ihr aktueller BMI"
        },
        "bmiCategory": {
          "label": "BMI-Kategorie"
        },
        "weightGap": {
          "label": "Gewicht bis zum Ziel"
        },
        "timeline": {
          "label": "Geschätzter Zeitplan"
        },
        "frameAdjusted": {
          "label": "Körperbau-angepasstes Ideal"
        },
        "petersonResult": {
          "label": "Peterson (2016)"
        },
        "devineResult": {
          "label": "Devine (1974)"
        },
        "robinsonResult": {
          "label": "Robinson (1983)"
        },
        "millerResult": {
          "label": "Miller (1983)"
        },
        "hamwiResult": {
          "label": "Hamwi (1964)"
        },
        "brocaResult": {
          "label": "Broca (1871)"
        },
        "lorentzResult": {
          "label": "Lorentz (1929)"
        }
      },
      "presets": {
        "averageMale": {
          "label": "Durchschnittsmann",
          "description": "Mittlerer Körperbau, mäßige Aktivität"
        },
        "averageFemale": {
          "label": "Durchschnittsfrau",
          "description": "Mittlerer Körperbau, mäßige Aktivität"
        },
        "athleteMale": {
          "label": "Sportler Mann",
          "description": "Großer Körperbau, sehr aktiv, BMI 23"
        },
        "petiteFemale": {
          "label": "Zierliche Frau",
          "description": "Kleiner Körperbau, mäßige Aktivität, BMI 21"
        }
      },
      "tooltips": {
        "idealWeight": "Durchschnitt aller 7 validierten Formeln, angepasst für Körperbau und Aktivität.",
        "idealRange": "Gewichtsbereich für einen gesunden BMI zwischen 18,5 und 24,9.",
        "currentBmi": "Body-Mass-Index basierend auf Ihrem aktuellen Gewicht und Ihrer Größe.",
        "weightGap": "Wie viel Gewicht Sie verlieren oder zunehmen müssen, um Ihr Idealgewicht zu erreichen.",
        "timeline": "Geschätzte Wochen bei einer sicheren Rate von 0,5–1 kg pro Woche.",
        "frameAdjusted": "Idealgewicht angepasst um ±10% für kleinen oder großen Körperbau."
      },
      "values": {
        "Underweight": "Untergewicht",
        "Normal weight": "Normalgewicht",
        "Overweight": "Übergewicht",
        "Obese": "Adipös",
        "Obese II": "Adipös II",
        "Obese III": "Adipös III",
        "lose": "verlieren",
        "gain": "zunehmen",
        "weeks": "Wochen",
        "You're within your ideal range!": "Sie befinden sich in Ihrem idealen Bereich!",
        "Already at a healthy weight": "Bereits bei einem gesunden Gewicht"
      },
      "formats": {
        "summary": "Ihr Idealgewicht beträgt ungefähr {idealWeight}. Gesunder Bereich: {idealRange}. Aktueller BMI: {currentBmi} ({bmiCategory})."
      },
      "infoCards": {
        "formulaComparison": {
          "title": "📊 Formel-Ergebnisse",
          "items": {
            "0": "Peterson (2016) — Genaueste, BMI-basiert",
            "1": "Devine (1974) — In der Medizin am häufigsten verwendet",
            "2": "Robinson (1983) — Versicherungsstandard",
            "3": "Miller (1983) — Höherer Grundwert",
            "4": "Hamwi (1964) — Klinischer Standard",
            "5": "Broca (1871) — Älteste Methode",
            "6": "Lorentz (1929) — Europäischer Standard"
          }
        },
        "tips": {
          "title": "Tipps",
          "items": [
            "Idealgewicht ist ein Richtwert, kein striktes Ziel — konzentrieren Sie sich auf Körperzusammensetzung statt auf das Waagenergebnis",
            "Sportler mit hoher Muskelmasse können IBW-Formeln überschreiten und trotzdem völlig gesund sein",
            "Streben Sie 0,5–1 kg pro Woche für sichere, nachhaltige Gewichtsveränderung an",
            "Körperbau kann das Idealgewicht um 10% verschieben — eine Person mit großem Körperbau wiegt natürlich mehr"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist das ideale Körpergewicht?",
          "content": "Das ideale Körpergewicht (IBW) ist ein Referenzgewicht basierend auf Größe, Geschlecht und Alter, das ursprünglich zur Berechnung angemessener Medikamentendosierungen entwickelt wurde. Im Laufe der Zeit wurden diese Formeln als allgemeine Gesundheitsrichtwerte übernommen. IBW ist keine einzige perfekte Zahl — es repräsentiert einen Bereich, der mit den niedrigsten Gesundheitsrisiken korreliert. Die am besten validierte Formel ist Peterson (2016), die BMI-basierte Berechnungen verwendet. Ältere Formeln wie Devine (1974) und Robinson (1983) werden noch weit verbreitet in klinischen Einrichtungen verwendet. Es ist wichtig zu verstehen, dass IBW keine Muskelmasse, Knochendichte oder individuelle Körperzusammensetzung berücksichtigt. Eine sehr muskulöse Person kann über ihrem IBW liegen und trotzdem sehr gesund sein. IBW sollte als ein Datenpunkt unter mehreren bei der Gesundheitsbewertung verwendet werden, nicht als definitives Ziel."
        },
        "howItWorks": {
          "title": "Wie dieser Rechner funktioniert",
          "content": "Dieser Rechner berechnet Ihr Idealgewicht mit 7 validierten Formeln und zeigt den Durchschnitt als empfohlenes Ziel. Er passt Ergebnisse für Körperbau (±10%) an, berücksichtigt Aktivitätslevel, ermöglicht das Festlegen eines benutzerdefinierten Ziel-BMI und wendet WHO-ethnienspezifische BMI-Schwellenwerte für asiatische und pazifische Bevölkerungsgruppen an. Wenn Sie Ihr aktuelles Gewicht eingeben, zeigt er genau, wie viel Sie verlieren oder zunehmen müssen, mit einem realistischen Zeitplan basierend auf sicheren Gewichtsveränderungsraten von 0,5–1 kg pro Woche. Das Balkendiagramm und die detaillierte Tabelle lassen Sie alle 7 Formeln nebeneinander vergleichen."
        },
        "formulas": {
          "title": "Die 7 Formeln erklärt",
          "items": [
            {
              "text": "Peterson (2016): Die modernste und genaueste Formel. Verwendet BMI-Ziel: Gewicht = 2,2 × BMI + 3,5 × BMI × (Größe − 1,5m). Geschlechtsneutral und validiert an großen Datensätzen.",
              "type": "info"
            },
            {
              "text": "Devine (1974): Die in der Medizin am häufigsten verwendete. Männer: 50 + 2,3 kg pro Zoll über 5 ft. Frauen: 45,5 + 2,3 kg pro Zoll. Ursprünglich für Arzneimitteldosierung.",
              "type": "info"
            },
            {
              "text": "Robinson (1983): Verfeinerung von Devine. Männer: 52 + 1,9 kg pro Zoll über 5 ft. Frauen: 49 + 1,7 kg pro Zoll. Basiert auf 1959er Versicherungs-Größe-Gewicht-Tabellen.",
              "type": "info"
            },
            {
              "text": "Miller (1983): Verwendet 1983er Versicherungsdaten. Männer: 56,2 + 1,41 kg pro Zoll über 5 ft. Frauen: 53,1 + 1,36 kg. Erzeugt höhere Schätzungen bei kleineren Größen.",
              "type": "info"
            },
            {
              "text": "Hamwi (1964): Klinischer Standard. Männer: 48 + 2,7 kg pro Zoll über 5 ft. Frauen: 45,5 + 2,2 kg. Kann um ±10% für Körperbau angepasst werden.",
              "type": "info"
            },
            {
              "text": "Broca (1871): Die älteste Formel, erstellt von einem französischen Armeechirurgen. IBW = (Größe cm − 100) × Faktor (0,9 für Männer, 0,85 für Frauen). Einfach aber weniger genau für Extreme.",
              "type": "warning"
            },
            {
              "text": "Lorentz (1929): Europäische Formel. Männer: (H − 100) − (H − 150)/4. Frauen: (H − 100) − (H − 150)/2. Neigt zu niedrigeren Schätzungen für größere Personen.",
              "type": "info"
            }
          ]
        },
        "ethnicBmi": {
          "title": "Ethnische BMI-Anpassungen",
          "items": [
            {
              "text": "Standard WHO-Schwellenwerte: Untergewicht < 18,5, Normal 18,5–24,9, Übergewicht 25–29,9, Adipös ≥ 30",
              "type": "info"
            },
            {
              "text": "Asiatisch / Südasiatisch: Höhere Gesundheitsrisiken bei niedrigeren BMIs. Übergewicht beginnt bei BMI 23, Adipös bei 27,5",
              "type": "warning"
            },
            {
              "text": "Pazifische Inseln: Einige Richtlinien verwenden BMI 26 als Übergewichtsschwelle",
              "type": "info"
            },
            {
              "text": "Diese Anpassungen spiegeln Unterschiede in Körperfettverteilung und Stoffwechselrisiko wider. Konsultieren Sie immer einen Arzt für persönliche Beratung",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Beispielberechnungen",
          "description": "Sehen Sie, wie der Rechner mit echten Zahlen funktioniert",
          "examples": [
            {
              "title": "1,78m Mann, mittlerer Körperbau",
              "steps": [
                "Größe: 1,78m",
                "Peterson: 74,2 kg",
                "Devine: 73,0 kg",
                "Robinson: 71,0 kg",
                "Miller: 70,3 kg",
                "Hamwi: 75,0 kg",
                "Broca: 70,2 kg",
                "Lorentz: 71,0 kg",
                "Durchschnitt: 72,1 kg"
              ],
              "result": "Idealgewicht: ~72 kg"
            },
            {
              "title": "1,63m Frau, kleiner Körperbau",
              "steps": [
                "Größe: 1,63m",
                "Durchschnitt aller 7 Formeln: 55,8 kg",
                "Körperbau-Anpassung: −10% (klein)",
                "Angepasst: 50,2 kg",
                "Aktivität: mäßig (+0%)"
              ],
              "result": "Idealgewicht: ~50 kg"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Welche Formel ist die genaueste?",
          "answer": "Die Peterson-Formel (2016) gilt als die genaueste für moderne Bevölkerungsgruppen, da sie auf BMI-Daten aus groß angelegten Studien basiert und für alle Größen ohne die Verzerrungen älterer Formeln funktioniert. Die Devine-Formel (1974) wird in klinischen Einrichtungen am häufigsten für die Arzneimitteldosierung verwendet, neigt aber dazu, das Idealgewicht für kleinere Frauen zu unterschätzen und für größere Männer zu überschätzen. Dieser Rechner zeigt alle 7 Formeln, damit Sie Ergebnisse vergleichen können."
        },
        {
          "question": "Wie beeinflusst der Körperbau das Idealgewicht?",
          "answer": "Eine Person mit großem Körperbau hat mehr Knochenmasse und wiegt natürlich mehr als jemand mit kleinem Körperbau bei derselben Größe. Die Standardanpassung beträgt ±10% vom berechneten Idealgewicht. Sie können den Körperbau durch Messen Ihres Handgelenkumfangs schätzen. Bei Frauen unter 1,58m deutet ein Handgelenk unter 14cm auf einen kleinen Körperbau hin, während über 14,6cm einen großen Körperbau nahelegt. Bei Männern über 1,65m ist ein Handgelenk unter 16,5cm klein und über 19cm groß."
        },
        {
          "question": "Warum sind die Formelergebnisse voneinander verschieden?",
          "answer": "Jede Formel wurde von verschiedenen Forschern mit verschiedenen Datensätzen entwickelt. Hamwi (1964) für klinische Ernährung, Devine (1974) für Arzneimitteldosierung, Robinson und Miller (1983) aus Versicherungstabellen, Peterson (2016) aus moderner BMI-Forschung. Sie stimmen am meisten bei Durchschnittsgrößen überein und weichen bei sehr kleinen oder großen Personen ab. Die Verwendung des Durchschnitts aller 7 ergibt eine zuverlässigere Schätzung."
        },
        {
          "question": "Sollte ich genau mein Idealgewicht anstreben?",
          "answer": "Nein. Idealgewicht ist ein Richtwert, kein präzises Ziel. Ihr gesunder Gewichtsbereich — basierend auf einem BMI zwischen 18,5 und 24,9 — ist nützlicher als eine einzige Zahl. Faktoren wie Muskelmasse, Knochendichte, Körperfettverteilung und Fitnesslevel sind wichtiger. Ein Sportler mit beträchtlicher Muskelmasse kann über seinem IBW wiegen und dabei in ausgezeichneter Gesundheit sein."
        },
        {
          "question": "Wie schnell kann ich sicher mein Idealgewicht erreichen?",
          "answer": "Medizinische Richtlinien empfehlen 0,5–1 kg pro Woche Gewichtsverlust für nachhaltigen Erfolg. Schnellerer Verlust führt oft zu Muskelverlust und Stoffwechselverlangsamung. Für Gewichtszunahme sind 0,25–0,5 kg pro Woche für magere Masse realistisch. Der Rechner bietet einen Zeitplan basierend auf diesen sicheren Raten."
        },
        {
          "question": "Warum haben asiatische Bevölkerungsgruppen andere BMI-Schwellenwerte?",
          "answer": "Asiatische und südasiatische Bevölkerungsgruppen neigen dazu, höhere Körperfettanteile beim gleichen BMI im Vergleich zu europäischen Bevölkerungsgruppen zu haben und entwickeln Stoffwechselkrankheiten bei niedrigeren BMIs. Die WHO empfiehlt einen Übergewichtsschwellenwert von BMI 23 (statt 25) und Adipositas bei 27,5 (statt 30) für diese Bevölkerungsgruppen."
        }
      ],
      "detailedTable": {
        "formulaComparison": {
          "button": "Alle Formelergebnisse anzeigen",
          "title": "Idealgewicht nach Formel",
          "columns": {
            "formula": "Formel",
            "year": "Jahr",
            "weight": "Idealgewicht",
            "range": "±5% Bereich"
          }
        }
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
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      }
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // INPUTS (9 fields, all visible)
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
      min: 18,
      max: 100,
      suffix: "years",
    },
    {
      id: "height",
      type: "number",
      defaultValue: null,
      placeholder: "170",
      unitType: "height",
      syncGroup: false,
      defaultUnit: "cm",
      allowedUnits: ["cm", "m", "in", "ft_in"],
    },
    {
      id: "currentWeight",
      type: "number",
      defaultValue: null,
      placeholder: "180",
      unitType: "weight",
      syncGroup: false,
      defaultUnit: "lbs",
      allowedUnits: ["kg", "lbs", "st"],
    },
    {
      id: "bodyFrame",
      type: "radio",
      defaultValue: "medium",
      options: [{ value: "small" }, { value: "medium" }, { value: "large" }],
    },
    {
      id: "wristCircumference",
      type: "number",
      defaultValue: null,
      placeholder: "7",
      unitType: "body_length",
      syncGroup: false,
      defaultUnit: "in",
      allowedUnits: ["cm", "in"],
    },
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
    {
      id: "targetBmi",
      type: "number",
      defaultValue: 22,
      min: 18.5,
      max: 30,
      step: 0.5,
    },
    {
      id: "ethnicity",
      type: "select",
      defaultValue: "standard",
      options: [
        { value: "standard" },
        { value: "asian" },
        { value: "pacific" },
      ],
    },
  ],

  inputGroups: [],

  results: [
    { id: "idealWeight", type: "primary", format: "text" },
    { id: "idealRange", type: "secondary", format: "text" },
    { id: "currentBmi", type: "secondary", format: "text" },
    { id: "bmiCategory", type: "secondary", format: "text" },
    { id: "weightGap", type: "secondary", format: "text" },
    { id: "timeline", type: "secondary", format: "text" },
    { id: "frameAdjusted", type: "secondary", format: "text" },
    { id: "petersonResult", type: "secondary", format: "text" },
    { id: "devineResult", type: "secondary", format: "text" },
    { id: "robinsonResult", type: "secondary", format: "text" },
    { id: "millerResult", type: "secondary", format: "text" },
    { id: "hamwiResult", type: "secondary", format: "text" },
    { id: "brocaResult", type: "secondary", format: "text" },
    { id: "lorentzResult", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "formulaComparison", type: "list", icon: "📊", itemCount: 7 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "formulas", type: "list", icon: "🧬", itemCount: 7 },
    { id: "ethnicBmi", type: "list", icon: "🌍", itemCount: 4 },
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
      authors: "Peterson CM, Thomas DM, Blackburn GL, Heymsfield SB",
      year: "2016",
      title: "Universal equation for estimating ideal body weight and body weight at any BMI",
      source: "The American Journal of Clinical Nutrition, 103(5):1197-1203",
      url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4841935/",
    },
    {
      authors: "Devine BJ",
      year: "1974",
      title: "Gentamicin therapy",
      source: "Drug Intelligence & Clinical Pharmacy, 8:650-655",
      url: "https://pubmed.ncbi.nlm.nih.gov/10981254/",
    },
    {
      authors: "WHO Expert Consultation",
      year: "2004",
      title: "Appropriate body-mass index for Asian populations and its implications for policy",
      source: "The Lancet, 363(9403):157-163",
      url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(03)15268-3/fulltext",
    },
  ],

  detailedTable: {
    id: "formulaComparison",
    buttonLabel: "View All Formula Results",
    buttonIcon: "📊",
    modalTitle: "Ideal Weight — All 7 Formulas",
    columns: [
      { id: "formula", label: "Formula", align: "left" },
      { id: "year", label: "Year", align: "center" },
      { id: "weight", label: "Ideal Weight", align: "right", highlight: true },
      { id: "range", label: "±5% Range", align: "right" },
    ],
  },

  chart: {
    id: "formulaComparison",
    type: "bar",
    xKey: "label",
    height: 220,
    showGrid: true,
    showLegend: false,
    series: [
      { key: "weight", type: "bar", color: "#3b82f6" },
    ],
  },

  relatedCalculators: ["bmi", "body-fat", "calorie", "macro"],
};

// ═══════════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════════

export function calculateIdealWeight(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const gender = values.gender as string;
  const isMale = gender === "male";

  // Height → cm
  const heightUnit = fieldUnits?.height || "cm";
  const heightRaw = values.height as number;
  const heightCm = convertToBase(heightRaw, heightUnit, "height");
  const heightM = heightCm / 100;
  const heightInches = heightCm / 2.54;
  const inchesOverFiveFeet = Math.max(0, heightInches - 60);

  // Current weight → kg (optional)
  const hasCurrentWeight = values.currentWeight != null && (values.currentWeight as number) > 0;
  let currentWeightKg = 0;
  if (hasCurrentWeight) {
    const weightUnit = fieldUnits?.currentWeight || "lbs";
    currentWeightKg = convertToBase(values.currentWeight as number, weightUnit, "weight");
  }

  // Weight display helpers
  const weightDisplayUnit = fieldUnits?.currentWeight || "lbs";
  const toDisplay = (kg: number): number => {
    if (weightDisplayUnit === "lbs") return kg * 2.20462;
    if (weightDisplayUnit === "st") return kg * 0.157473;
    return kg;
  };
  const wSuffix = weightDisplayUnit === "lbs" ? "lbs" : weightDisplayUnit === "st" ? "st" : "kg";
  const fmtW = (kg: number): string => `${Math.round(toDisplay(kg) * 10) / 10} ${wSuffix}`;

  const bodyFrame = (values.bodyFrame as string) || "medium";
  const activityLevel = (values.activityLevel as string) || "moderate";
  const targetBmi = (values.targetBmi as number) || 22;
  const ethnicity = (values.ethnicity as string) || "standard";

  // ═══════════════════════════════════════════════════════════════════
  // 7 FORMULAS (kg)
  // ═══════════════════════════════════════════════════════════════════
  const petersonKg = 2.2 * targetBmi + 3.5 * targetBmi * (heightM - 1.5);
  const devineKg = isMale ? 50.0 + 2.3 * inchesOverFiveFeet : 45.5 + 2.3 * inchesOverFiveFeet;
  const robinsonKg = isMale ? 52 + 1.9 * inchesOverFiveFeet : 49 + 1.7 * inchesOverFiveFeet;
  const millerKg = isMale ? 56.2 + 1.41 * inchesOverFiveFeet : 53.1 + 1.36 * inchesOverFiveFeet;
  const hamwiKg = isMale ? 48.0 + 2.7 * inchesOverFiveFeet : 45.5 + 2.2 * inchesOverFiveFeet;
  const brocaKg = isMale ? (heightCm - 100) * 0.9 : (heightCm - 100) * 0.85;
  const lorentzKg = isMale
    ? (heightCm - 100) - (heightCm - 150) / 4
    : (heightCm - 100) - (heightCm - 150) / 2;

  // Average
  const all = [petersonKg, devineKg, robinsonKg, millerKg, hamwiKg, brocaKg, lorentzKg];
  const avgKg = all.reduce((a, b) => a + b, 0) / all.length;

  // Frame ±10%
  const frameMult = bodyFrame === "small" ? 0.90 : bodyFrame === "large" ? 1.10 : 1.0;
  const frameAdjKg = avgKg * frameMult;

  // Activity adjustment
  const actMap: Record<string, number> = {
    sedentary: 0.97, light: 0.99, moderate: 1.0, active: 1.02, veryActive: 1.05,
  };
  const finalIdealKg = frameAdjKg * (actMap[activityLevel] || 1.0);

  // BMI thresholds (ethnic-adjusted)
  let bmiLow = 18.5;
  let bmiHigh = 24.9;
  let owThreshold = 25;
  let obThreshold = 30;
  if (ethnicity === "asian") { bmiHigh = 22.9; owThreshold = 23; obThreshold = 27.5; }
  else if (ethnicity === "pacific") { owThreshold = 26; obThreshold = 32; }

  const healthyMinKg = bmiLow * heightM * heightM;
  const healthyMaxKg = bmiHigh * heightM * heightM;

  // Current BMI & gap
  let currentBmi = 0;
  let bmiCatRaw = "";
  let gapKg = 0;
  let weeks = 0;

  if (hasCurrentWeight) {
    currentBmi = currentWeightKg / (heightM * heightM);
    if (currentBmi < bmiLow) bmiCatRaw = "Underweight";
    else if (currentBmi < owThreshold) bmiCatRaw = "Normal weight";
    else if (currentBmi < obThreshold) bmiCatRaw = "Overweight";
    else if (currentBmi < 35) bmiCatRaw = "Obese";
    else if (currentBmi < 40) bmiCatRaw = "Obese II";
    else bmiCatRaw = "Obese III";

    gapKg = currentWeightKg - finalIdealKg;
    if (Math.abs(gapKg) > 1) weeks = Math.ceil(Math.abs(gapKg) / 0.75);
  }

  const bmiCat = v[bmiCatRaw] || bmiCatRaw;
  const loseGain = gapKg > 0 ? (v["lose"] || "lose") : (v["gain"] || "gain");
  const wksLabel = v["weeks"] || "weeks";
  const withinMsg = v["You're within your ideal range!"] || "You're within your ideal range!";
  const healthyMsg = v["Already at a healthy weight"] || "Already at a healthy weight";

  const gapFmt = hasCurrentWeight
    ? (Math.abs(gapKg) <= 2 ? withinMsg : `${loseGain} ${fmtW(Math.abs(gapKg))}`)
    : "—";
  const timeFmt = hasCurrentWeight && weeks > 0
    ? `~${weeks} ${wksLabel}`
    : hasCurrentWeight ? healthyMsg : "—";

  const tpl = f.summary || "Your ideal weight is approximately {idealWeight}. Healthy range: {idealRange}. Current BMI: {currentBmi} ({bmiCategory}).";
  const summary = tpl
    .replace("{idealWeight}", fmtW(finalIdealKg))
    .replace("{idealRange}", `${fmtW(healthyMinKg)} – ${fmtW(healthyMaxKg)}`)
    .replace("{currentBmi}", hasCurrentWeight ? currentBmi.toFixed(1) : "—")
    .replace("{bmiCategory}", hasCurrentWeight ? bmiCat : "—");

  // Chart & table data
  const chartData = [
    { label: "Peterson", weight: Math.round(toDisplay(petersonKg) * 10) / 10 },
    { label: "Devine", weight: Math.round(toDisplay(devineKg) * 10) / 10 },
    { label: "Robinson", weight: Math.round(toDisplay(robinsonKg) * 10) / 10 },
    { label: "Miller", weight: Math.round(toDisplay(millerKg) * 10) / 10 },
    { label: "Hamwi", weight: Math.round(toDisplay(hamwiKg) * 10) / 10 },
    { label: "Broca", weight: Math.round(toDisplay(brocaKg) * 10) / 10 },
    { label: "Lorentz", weight: Math.round(toDisplay(lorentzKg) * 10) / 10 },
  ];

  const tableRows = [
    { formula: "Peterson", year: "2016", kg: petersonKg },
    { formula: "Devine", year: "1974", kg: devineKg },
    { formula: "Robinson", year: "1983", kg: robinsonKg },
    { formula: "Miller", year: "1983", kg: millerKg },
    { formula: "Hamwi", year: "1964", kg: hamwiKg },
    { formula: "Broca", year: "1871", kg: brocaKg },
    { formula: "Lorentz", year: "1929", kg: lorentzKg },
  ];
  const tableData = tableRows.map((r) => ({
    formula: r.formula,
    year: r.year,
    weight: fmtW(r.kg),
    range: `${fmtW(r.kg * 0.95)} – ${fmtW(r.kg * 1.05)}`,
  }));

  const rd = (kg: number) => Math.round(toDisplay(kg) * 10) / 10;

  return {
    values: {
      idealWeight: rd(finalIdealKg),
      idealRange: `${Math.round(toDisplay(healthyMinKg))} – ${Math.round(toDisplay(healthyMaxKg))}`,
      currentBmi: hasCurrentWeight ? Math.round(currentBmi * 10) / 10 : null,
      bmiCategory: hasCurrentWeight ? bmiCatRaw : null,
      weightGap: hasCurrentWeight ? rd(Math.abs(gapKg)) : null,
      timeline: weeks,
      frameAdjusted: rd(frameAdjKg),
      petersonResult: rd(petersonKg),
      devineResult: rd(devineKg),
      robinsonResult: rd(robinsonKg),
      millerResult: rd(millerKg),
      hamwiResult: rd(hamwiKg),
      brocaResult: rd(brocaKg),
      lorentzResult: rd(lorentzKg),
    },
    formatted: {
      idealWeight: fmtW(finalIdealKg),
      idealRange: `${fmtW(healthyMinKg)} – ${fmtW(healthyMaxKg)}`,
      currentBmi: hasCurrentWeight ? currentBmi.toFixed(1) : "—",
      bmiCategory: hasCurrentWeight ? bmiCat : "—",
      weightGap: gapFmt,
      timeline: timeFmt,
      frameAdjusted: fmtW(frameAdjKg),
      petersonResult: fmtW(petersonKg),
      devineResult: fmtW(devineKg),
      robinsonResult: fmtW(robinsonKg),
      millerResult: fmtW(millerKg),
      hamwiResult: fmtW(hamwiKg),
      brocaResult: fmtW(brocaKg),
      lorentzResult: fmtW(lorentzKg),
    },
    summary,
    isValid: true,
    metadata: { chartData, tableData },
  };
}

export default idealWeightConfig;
