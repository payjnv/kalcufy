import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ─── CONFIG ─────────────────────────────────────────────────────────────────
export const intermittentFastingConfig: CalculatorConfigV4 = {
  id: "intermittent-fasting",
  version: "4.0",
  category: "health",
  icon: "⏰",

  // ─── PRESETS ────────────────────────────────────────────────────────────────
  presets: [
    {
      id: "beginner",
      icon: "🌱",
      values: {
        gender: "female",
        age: 30,
        weight: 150,
        height: 165.1,
        activityLevel: "light",
        fastingMethod: "16_8",
        goal: "lose",
        mealsPerDay: "3",
        firstMealTime: "12",
      },
    },
    {
      id: "weightLoss",
      icon: "🔥",
      values: {
        gender: "male",
        age: 35,
        weight: 200,
        height: 177.8,
        activityLevel: "moderate",
        fastingMethod: "18_6",
        goal: "lose",
        mealsPerDay: "3",
        firstMealTime: "12",
      },
    },
    {
      id: "advanced",
      icon: "⚡",
      values: {
        gender: "male",
        age: 28,
        weight: 185,
        height: 180.3,
        activityLevel: "active",
        fastingMethod: "20_4",
        goal: "recomp",
        mealsPerDay: "2",
        firstMealTime: "14",
      },
    },
  ],

  // ─── TRANSLATIONS (EN ONLY) ─────────────────────────────────────────────────
  t: {
    en: {
      name: "Intermittent Fasting Calculator",
      slug: "intermittent-fasting",
      subtitle: "Plan your fasting schedule, calculate daily calories and macros, and see your estimated results.",
      breadcrumb: "IF Calculator",

      seo: {
        title: "Intermittent Fasting Calculator - Free Meal Plan Tool",
        description: "Plan your intermittent fasting schedule with calorie and macro calculations. Compare 7 methods including 16:8, 18:6, OMAD, and 5:2 with per-meal breakdowns.",
        shortDescription: "Calculate your fasting schedule, calories, and macros.",
        keywords: [
          "intermittent fasting calculator",
          "IF calculator",
          "16:8 fasting calculator",
          "fasting schedule calculator",
          "intermittent fasting meal plan",
          "free fasting calculator",
          "OMAD calculator",
          "fasting calories calculator",
        ],
      },

      calculator: { yourInformation: "Your Information" },
      ui: {
        yourInformation: "Your Information",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        gender: {
          label: "Gender",
          helpText: "Affects basal metabolic rate calculation",
          options: { male: "Male", female: "Female" },
        },
        age: {
          label: "Age",
          helpText: "Your current age in years",
        },
        weight: {
          label: "Weight",
          helpText: "Your current body weight",
        },
        height: {
          label: "Height",
          helpText: "Your current height",
        },
        activityLevel: {
          label: "Activity Level",
          helpText: "Your typical weekly physical activity",
          options: {
            sedentary: "Sedentary (office job, little exercise)",
            light: "Lightly Active (1-3 days/week)",
            moderate: "Moderately Active (3-5 days/week)",
            active: "Very Active (6-7 days/week)",
            veryActive: "Extremely Active (athlete, physical job)",
          },
        },
        fastingMethod: {
          label: "Fasting Method",
          helpText: "Choose your intermittent fasting protocol",
          options: {
            "12_12": "12:12 — 12h fast, 12h eat (Beginner)",
            "14_10": "14:10 — 14h fast, 10h eat (Easy)",
            "16_8": "16:8 — 16h fast, 8h eat (Popular)",
            "18_6": "18:6 — 18h fast, 6h eat (Intermediate)",
            "20_4": "20:4 — 20h fast, 4h eat (Warrior)",
            "23_1": "23:1 — OMAD, One Meal a Day (Advanced)",
            "5_2": "5:2 — 5 days normal, 2 days ~500 cal",
          },
        },
        goal: {
          label: "Goal",
          helpText: "What you want to achieve with fasting",
          options: {
            lose: "Lose Weight",
            maintain: "Maintain Weight",
            recomp: "Body Recomposition",
          },
        },
        mealsPerDay: {
          label: "Meals Per Day",
          helpText: "Number of meals within your eating window",
          options: {
            "2": "2 Meals",
            "3": "3 Meals",
            "4": "4 Meals",
          },
        },
        firstMealTime: {
          label: "First Meal Time",
          helpText: "When you want to break your fast",
          options: {
            "7": "7:00 AM",
            "8": "8:00 AM",
            "9": "9:00 AM",
            "10": "10:00 AM",
            "11": "11:00 AM",
            "12": "12:00 PM",
            "13": "1:00 PM",
            "14": "2:00 PM",
          },
        },
      },

      results: {
        dailyCalories: { label: "Daily Calories" },
        bmr: { label: "Basal Metabolic Rate" },
        tdee: { label: "Total Daily Energy" },
        eatingWindow: { label: "Eating Window" },
        fastingHours: { label: "Fasting Hours" },
        protein: { label: "Protein" },
        carbs: { label: "Carbohydrates" },
        fat: { label: "Fat" },
        caloriesPerMeal: { label: "Calories Per Meal" },
        estimatedWeeklyLoss: { label: "Est. Weekly Change" },
      },

      presets: {
        beginner: {
          label: "Beginner",
          description: "16:8 method with light activity — great starting point",
        },
        weightLoss: {
          label: "Weight Loss",
          description: "18:6 method with moderate activity for faster results",
        },
        advanced: {
          label: "Advanced",
          description: "20:4 warrior method for experienced fasters",
        },
      },

      values: {
        cal: "cal",
        kcal: "kcal",
        g: "g",
        lbs: "lbs",
        kg: "kg",
        "lbs/week": "lbs/week",
        "kg/week": "kg/week",
        hours: "hours",
        hour: "hour",
        to: "to",
        am: "AM",
        pm: "PM",
        meals: "meals",
        meal: "meal",
        normalDays: "normal days",
        restrictedDays: "restricted days",
      },

      formats: {
        summary: "Eat {calories} cal/day in a {eatingHours}h window ({method}). Target: {protein}g protein, {carbs}g carbs, {fat}g fat per day.",
      },

      infoCards: {
        nutrition: {
          title: "Your Daily Nutrition",
          items: [
            { label: "Daily Calories", valueKey: "dailyCalories" },
            { label: "Protein", valueKey: "protein" },
            { label: "Carbohydrates", valueKey: "carbs" },
            { label: "Fat", valueKey: "fat" },
          ],
        },
        schedule: {
          title: "Your Fasting Schedule",
          items: [
            { label: "Eating Window", valueKey: "eatingWindow" },
            { label: "Fasting Hours", valueKey: "fastingHours" },
            { label: "Calories Per Meal", valueKey: "caloriesPerMeal" },
            { label: "Est. Weekly Change", valueKey: "estimatedWeeklyLoss" },
          ],
        },
        tips: {
          title: "Fasting Tips",
          items: [
            "Stay hydrated — drink water, black coffee, and plain tea during your fast. Zero-calorie beverages don't break your fast.",
            "Start with a shorter fast like 12:12 or 14:10 and gradually increase. Your body needs 1-2 weeks to adapt.",
            "Break your fast with protein and healthy fats first, then add carbs. This prevents blood sugar spikes.",
            "Schedule workouts near the end of your fast or right after eating for best performance and recovery.",
          ],
        },
      },

      detailedTable: {
        methodComparison: {
          button: "View All Fasting Methods",
          title: "Fasting Method Comparison",
          columns: {
            method: "Method",
            fastHours: "Fast",
            eatHours: "Eat",
            difficulty: "Difficulty",
            bestFor: "Best For",
            schedule: "Example Schedule",
          },
        },
      },

      education: {
        whatIs: {
          title: "What Is Intermittent Fasting?",
          content: "Intermittent fasting (IF) is an eating pattern that cycles between periods of fasting and eating. Unlike traditional diets that focus on what you eat, IF focuses on when you eat. The most popular method is 16:8, where you fast for 16 hours and eat within an 8-hour window. Research published in the New England Journal of Medicine (2019) shows that intermittent fasting can improve metabolic health, reduce inflammation, and promote cellular repair through a process called autophagy. During fasting, your body shifts from using glucose as its primary fuel to burning stored fat, typically entering a state of ketosis after 12-16 hours without food.",
        },
        howItWorks: {
          title: "How This Calculator Works",
          content: "This calculator uses the Mifflin-St Jeor equation to estimate your Basal Metabolic Rate (BMR) based on your gender, age, weight, and height. It then multiplies your BMR by an activity factor to determine your Total Daily Energy Expenditure (TDEE). Based on your goal — lose weight, maintain, or body recomposition — it adjusts your daily calorie target. For weight loss, it applies a 20% caloric deficit; for recomposition, a 10% deficit with higher protein. Finally, it distributes your daily macronutrients (protein, carbs, fat) across your chosen number of meals within your eating window, giving you a complete per-meal breakdown.",
        },
        benefits: {
          title: "Science-Backed Benefits of IF",
          items: [
            { text: "Fat burning increases significantly after 12+ hours of fasting as the body depletes glycogen stores and switches to fat oxidation (ketosis)", type: "info" },
            { text: "Autophagy — cellular cleanup and repair — activates during extended fasting periods, removing damaged proteins and organelles", type: "info" },
            { text: "Insulin sensitivity improves, reducing the risk of type 2 diabetes. Studies show fasting can lower fasting insulin by 20-31%", type: "info" },
            { text: "Human Growth Hormone (HGH) levels can increase up to 5x during fasting, supporting muscle preservation and fat loss", type: "info" },
            { text: "Inflammation markers (CRP, IL-6) decrease with regular fasting, potentially reducing risk of chronic diseases", type: "info" },
            { text: "Warning: IF is not recommended for pregnant or breastfeeding women, people with eating disorders, type 1 diabetes, or children under 18", type: "warning" },
          ],
        },
        methods: {
          title: "Fasting Methods Explained",
          items: [
            { text: "12:12 — Equal split between fasting and eating. Ideal for beginners since overnight sleep covers most of the fast", type: "info" },
            { text: "14:10 — Slightly longer fast. Skip late-night snacking and delay breakfast by 1-2 hours for easy compliance", type: "info" },
            { text: "16:8 — The most researched and popular method. Skip breakfast, eat from noon to 8 PM. Sustainable long-term", type: "info" },
            { text: "18:6 — Intermediate protocol. Two larger meals with better autophagy activation and deeper ketosis", type: "info" },
            { text: "20:4 (Warrior) — Advanced method with a 4-hour eating window. Usually one main meal plus a small snack", type: "warning" },
            { text: "5:2 — Eat normally 5 days per week, restrict to 500-600 calories on 2 non-consecutive days. More flexible schedule", type: "info" },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step examples of how fasting calories are calculated",
          examples: [
            {
              title: "Male, 30, 180 lbs, 5'10\", Moderate Activity, 16:8, Lose Weight",
              steps: [
                "BMR = 10 × 81.6kg + 6.25 × 177.8cm − 5 × 30 + 5 = 1,778 cal",
                "TDEE = 1,778 × 1.55 (moderate) = 2,756 cal",
                "Weight loss target = 2,756 × 0.80 = 2,205 cal/day",
                "Protein = 180g (1g per lb), Fat = 61g (25%), Carbs = 208g (remaining)",
                "3 meals → 735 cal/meal (60g protein, 20g fat, 69g carbs each)",
              ],
              result: "Eat 2,205 cal/day from 12 PM to 8 PM — lose ~1.1 lbs/week",
            },
            {
              title: "Female, 28, 140 lbs, 5'5\", Light Activity, 14:10, Maintain",
              steps: [
                "BMR = 10 × 63.5kg + 6.25 × 165.1cm − 5 × 28 − 161 = 1,368 cal",
                "TDEE = 1,368 × 1.375 (light) = 1,881 cal",
                "Maintenance target = 1,881 cal/day (no deficit)",
                "Protein = 112g (0.8g per lb), Fat = 63g (30%), Carbs = 218g",
                "3 meals → 627 cal/meal in a 10-hour eating window",
              ],
              result: "Eat 1,881 cal/day from 9 AM to 7 PM — maintain current weight",
            },
          ],
        },
      },

      faqs: [
        {
          question: "Does coffee break my fast?",
          answer: "Black coffee, plain tea, and water do not break your fast. They contain virtually zero calories and may even enhance fasting benefits by boosting metabolism. However, adding cream, sugar, milk, or artificial sweeteners can trigger an insulin response and technically break your fast. If you need flavor, a small squeeze of lemon in water is generally acceptable.",
        },
        {
          question: "Which fasting method is best for beginners?",
          answer: "The 16:8 method is the most popular starting point because it's simple and sustainable — you essentially skip breakfast and stop eating after dinner. If 16 hours feels too long, start with 12:12 or 14:10 for the first 1-2 weeks, then gradually extend your fasting window. The key is consistency, not intensity.",
        },
        {
          question: "Will I lose muscle while fasting?",
          answer: "Not if you eat enough protein and do resistance training. Intermittent fasting actually increases Human Growth Hormone (HGH) levels, which helps preserve muscle. Aim for 0.8-1.2g of protein per pound of body weight, prioritize protein-rich foods when breaking your fast, and maintain your strength training routine. Most research shows IF preserves lean mass better than continuous calorie restriction.",
        },
        {
          question: "Can women do intermittent fasting safely?",
          answer: "Yes, but women may need a gentler approach. Some research suggests that extended fasting (18+ hours) can affect female hormones, particularly if you're already lean or under stress. Women are often advised to start with 14:10 or 16:8 and avoid fasting on consecutive days initially. Pregnant or breastfeeding women should not practice IF. If you notice menstrual irregularities, reduce your fasting window.",
        },
        {
          question: "How long does it take to see results from intermittent fasting?",
          answer: "Most people notice initial changes within 2-4 weeks, including reduced bloating and improved energy. Significant fat loss typically becomes visible at 4-8 weeks with consistent fasting and appropriate calorie intake. Weight loss averages 0.5-2 lbs per week depending on your caloric deficit. The metabolic benefits like improved insulin sensitivity can be measured within 2-3 weeks.",
        },
        {
          question: "Should I exercise while fasting?",
          answer: "Yes, moderate exercise during fasting is safe and can enhance fat burning. Light cardio, yoga, and moderate strength training work well in a fasted state. For intense workouts, consider scheduling them near the end of your fast or within your eating window for better performance. Always listen to your body — if you feel dizzy or weak, eat something and adjust your schedule.",
        },
        {
          question: "What should I eat to break my fast?",
          answer: "Break your fast with easily digestible, nutrient-dense foods. Start with protein (eggs, chicken, fish, Greek yogurt) and healthy fats (avocado, nuts, olive oil), then add complex carbohydrates. Avoid breaking your fast with sugary foods, processed carbs, or large portions — this can cause digestive discomfort and blood sugar spikes. A balanced meal with 30-40g of protein is ideal.",
        },
        {
          question: "Is the 5:2 method effective for weight loss?",
          answer: "Yes, the 5:2 method is effective and may be easier for people who prefer not to fast daily. On restricted days, you eat 500-600 calories (typically as one or two small meals). Research from the University of Illinois shows similar weight loss results between 5:2 and daily calorie restriction. The advantage is psychological — knowing you can eat normally most days improves adherence.",
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

      chart: {
        title: "Per-Meal Macro Distribution",
        xLabel: "Meal",
        yLabel: "Grams",
        series: {
          protein: "Protein",
          carbs: "Carbs",
          fat: "Fat",
        },
      },
    },
    es: {
      "name": "Calculadora de Ayuno Intermitente",
      "slug": "calculadora-ayuno-intermitente",
      "subtitle": "Planifica tu horario de ayuno, calcula calorías diarias y macros, y ve tus resultados estimados.",
      "breadcrumb": "Calculadora AI",
      "seo": {
        "title": "Calculadora de Ayuno Intermitente - Herramienta Gratuita de Plan de Comidas",
        "description": "Planifica tu horario de ayuno intermitente con cálculos de calorías y macros. Compara 7 métodos incluyendo 16:8, 18:6, OMAD y 5:2 con desglose por comida.",
        "shortDescription": "Calcula tu horario de ayuno, calorías y macros.",
        "keywords": [
          "calculadora ayuno intermitente",
          "calculadora AI",
          "calculadora ayuno 16:8",
          "calculadora horario ayuno",
          "plan comidas ayuno intermitente",
          "calculadora ayuno gratis",
          "calculadora OMAD",
          "calculadora calorías ayuno"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "gender": {
          "label": "Género",
          "helpText": "Afecta el cálculo de la tasa metabólica basal",
          "options": {
            "male": "Masculino",
            "female": "Femenino"
          }
        },
        "age": {
          "label": "Edad",
          "helpText": "Tu edad actual en años"
        },
        "weight": {
          "label": "Peso",
          "helpText": "Tu peso corporal actual"
        },
        "height": {
          "label": "Altura",
          "helpText": "Tu altura actual"
        },
        "activityLevel": {
          "label": "Nivel de Actividad",
          "helpText": "Tu actividad física típica semanal",
          "options": {
            "sedentary": "Sedentario (trabajo de oficina, poco ejercicio)",
            "light": "Ligeramente Activo (1-3 días/semana)",
            "moderate": "Moderadamente Activo (3-5 días/semana)",
            "active": "Muy Activo (6-7 días/semana)",
            "veryActive": "Extremadamente Activo (atleta, trabajo físico)"
          }
        },
        "fastingMethod": {
          "label": "Método de Ayuno",
          "helpText": "Elige tu protocolo de ayuno intermitente",
          "options": {
            "12_12": "12:12 — 12h ayuno, 12h comer (Principiante)",
            "14_10": "14:10 — 14h ayuno, 10h comer (Fácil)",
            "16_8": "16:8 — 16h ayuno, 8h comer (Popular)",
            "18_6": "18:6 — 18h ayuno, 6h comer (Intermedio)",
            "20_4": "20:4 — 20h ayuno, 4h comer (Guerrero)",
            "23_1": "23:1 — OMAD, Una Comida al Día (Avanzado)",
            "5_2": "5:2 — 5 días normal, 2 días ~500 cal"
          }
        },
        "goal": {
          "label": "Objetivo",
          "helpText": "Lo que quieres lograr con el ayuno",
          "options": {
            "lose": "Perder Peso",
            "maintain": "Mantener Peso",
            "recomp": "Recomposición Corporal"
          }
        },
        "mealsPerDay": {
          "label": "Comidas por Día",
          "helpText": "Número de comidas dentro de tu ventana de alimentación",
          "options": {
            "2": "2 Comidas",
            "3": "3 Comidas",
            "4": "4 Comidas"
          }
        },
        "firstMealTime": {
          "label": "Hora Primera Comida",
          "helpText": "Cuándo quieres romper tu ayuno",
          "options": {
            "7": "7:00 AM",
            "8": "8:00 AM",
            "9": "9:00 AM",
            "10": "10:00 AM",
            "11": "11:00 AM",
            "12": "12:00 PM",
            "13": "1:00 PM",
            "14": "2:00 PM"
          }
        }
      },
      "results": {
        "dailyCalories": {
          "label": "Calorías Diarias"
        },
        "bmr": {
          "label": "Tasa Metabólica Basal"
        },
        "tdee": {
          "label": "Energía Diaria Total"
        },
        "eatingWindow": {
          "label": "Ventana de Alimentación"
        },
        "fastingHours": {
          "label": "Horas de Ayuno"
        },
        "protein": {
          "label": "Proteína"
        },
        "carbs": {
          "label": "Carbohidratos"
        },
        "fat": {
          "label": "Grasa"
        },
        "caloriesPerMeal": {
          "label": "Calorías por Comida"
        },
        "estimatedWeeklyLoss": {
          "label": "Cambio Semanal Est."
        }
      },
      "presets": {
        "beginner": {
          "label": "Principiante",
          "description": "Método 16:8 con actividad ligera — excelente punto de partida"
        },
        "weightLoss": {
          "label": "Pérdida de Peso",
          "description": "Método 18:6 con actividad moderada para resultados más rápidos"
        },
        "advanced": {
          "label": "Avanzado",
          "description": "Método guerrero 20:4 para ayunadores experimentados"
        }
      },
      "values": {
        "cal": "cal",
        "kcal": "kcal",
        "g": "g",
        "lbs": "lbs",
        "kg": "kg",
        "lbs/week": "lbs/semana",
        "kg/week": "kg/semana",
        "hours": "horas",
        "hour": "hora",
        "to": "a",
        "am": "AM",
        "pm": "PM",
        "meals": "comidas",
        "meal": "comida",
        "normalDays": "días normales",
        "restrictedDays": "días restringidos"
      },
      "formats": {
        "summary": "Come {calories} cal/día en una ventana de {eatingHours}h ({method}). Objetivo: {protein}g proteína, {carbs}g carbohidratos, {fat}g grasa por día."
      },
      "infoCards": {
        "nutrition": {
          "title": "Tu Nutrición Diaria",
          "items": [
            {
              "label": "Calorías Diarias",
              "valueKey": "dailyCalories"
            },
            {
              "label": "Proteína",
              "valueKey": "protein"
            },
            {
              "label": "Carbohidratos",
              "valueKey": "carbs"
            },
            {
              "label": "Grasa",
              "valueKey": "fat"
            }
          ]
        },
        "schedule": {
          "title": "Tu Horario de Ayuno",
          "items": [
            {
              "label": "Ventana de Alimentación",
              "valueKey": "eatingWindow"
            },
            {
              "label": "Horas de Ayuno",
              "valueKey": "fastingHours"
            },
            {
              "label": "Calorías por Comida",
              "valueKey": "caloriesPerMeal"
            },
            {
              "label": "Cambio Semanal Est.",
              "valueKey": "estimatedWeeklyLoss"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Ayuno",
          "items": [
            "Mantente hidratado — bebe agua, café negro y té natural durante tu ayuno. Las bebidas sin calorías no rompen tu ayuno.",
            "Comienza con un ayuno más corto como 12:12 o 14:10 y aumenta gradualmente. Tu cuerpo necesita 1-2 semanas para adaptarse.",
            "Rompe tu ayuno con proteína y grasas saludables primero, luego agrega carbohidratos. Esto previene picos de azúcar en sangre.",
            "Programa los entrenamientos cerca del final de tu ayuno o justo después de comer para mejor rendimiento y recuperación."
          ]
        }
      },
      "detailedTable": {
        "methodComparison": {
          "button": "Ver Todos los Métodos de Ayuno",
          "title": "Comparación de Métodos de Ayuno",
          "columns": {
            "method": "Método",
            "fastHours": "Ayuno",
            "eatHours": "Comer",
            "difficulty": "Dificultad",
            "bestFor": "Mejor Para",
            "schedule": "Horario Ejemplo"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es el Ayuno Intermitente?",
          "content": "El ayuno intermitente (AI) es un patrón de alimentación que alterna entre períodos de ayuno y alimentación. A diferencia de las dietas tradicionales que se enfocan en qué comes, el AI se enfoca en cuándo comes. El método más popular es 16:8, donde ayunas 16 horas y comes dentro de una ventana de 8 horas. La investigación publicada en el New England Journal of Medicine (2019) muestra que el ayuno intermitente puede mejorar la salud metabólica, reducir la inflamación y promover la reparación celular a través de un proceso llamado autofagia. Durante el ayuno, tu cuerpo cambia de usar glucosa como combustible principal a quemar grasa almacenada, típicamente entrando en un estado de cetosis después de 12-16 horas sin comida."
        },
        "howItWorks": {
          "title": "Cómo Funciona Esta Calculadora",
          "content": "Esta calculadora usa la ecuación Mifflin-St Jeor para estimar tu Tasa Metabólica Basal (TMB) basada en tu género, edad, peso y altura. Luego multiplica tu TMB por un factor de actividad para determinar tu Gasto Energético Diario Total (GEDT). Basado en tu objetivo — perder peso, mantener o recomposición corporal — ajusta tu objetivo calórico diario. Para pérdida de peso, aplica un déficit calórico del 20%; para recomposición, un déficit del 10% con mayor proteína. Finalmente, distribuye tus macronutrientes diarios (proteína, carbohidratos, grasa) entre tu número elegido de comidas dentro de tu ventana de alimentación, dándote un desglose completo por comida."
        },
        "benefits": {
          "title": "Beneficios del AI Respaldados por la Ciencia",
          "items": [
            {
              "text": "La quema de grasa aumenta significativamente después de 12+ horas de ayuno cuando el cuerpo agota las reservas de glucógeno y cambia a oxidación de grasa (cetosis)",
              "type": "info"
            },
            {
              "text": "La autofagia — limpieza y reparación celular — se activa durante períodos de ayuno extendidos, removiendo proteínas dañadas y organelas",
              "type": "info"
            },
            {
              "text": "La sensibilidad a la insulina mejora, reduciendo el riesgo de diabetes tipo 2. Los estudios muestran que el ayuno puede reducir la insulina en ayunas en 20-31%",
              "type": "info"
            },
            {
              "text": "Los niveles de Hormona del Crecimiento Humano (HCH) pueden aumentar hasta 5 veces durante el ayuno, apoyando la preservación muscular y pérdida de grasa",
              "type": "info"
            },
            {
              "text": "Los marcadores de inflamación (PCR, IL-6) disminuyen con el ayuno regular, potencialmente reduciendo el riesgo de enfermedades crónicas",
              "type": "info"
            },
            {
              "text": "Advertencia: El AI no se recomienda para mujeres embarazadas o lactantes, personas con trastornos alimentarios, diabetes tipo 1, o niños menores de 18 años",
              "type": "warning"
            }
          ]
        },
        "methods": {
          "title": "Métodos de Ayuno Explicados",
          "items": [
            {
              "text": "12:12 — División igual entre ayuno y alimentación. Ideal para principiantes ya que el sueño nocturno cubre la mayor parte del ayuno",
              "type": "info"
            },
            {
              "text": "14:10 — Ayuno ligeramente más largo. Omite snacks nocturnos y retrasa el desayuno 1-2 horas para fácil cumplimiento",
              "type": "info"
            },
            {
              "text": "16:8 — El método más investigado y popular. Omite el desayuno, come de mediodía a 8 PM. Sostenible a largo plazo",
              "type": "info"
            },
            {
              "text": "18:6 — Protocolo intermedio. Dos comidas más grandes con mejor activación de autofagia y cetosis más profunda",
              "type": "info"
            },
            {
              "text": "20:4 (Guerrero) — Método avanzado con ventana de alimentación de 4 horas. Usualmente una comida principal más un snack pequeño",
              "type": "warning"
            },
            {
              "text": "5:2 — Come normalmente 5 días por semana, restringe a 500-600 calorías en 2 días no consecutivos. Horario más flexible",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo",
          "description": "Ejemplos paso a paso de cómo se calculan las calorías del ayuno",
          "examples": [
            {
              "title": "Hombre, 30, 180 lbs, 5'10\", Actividad Moderada, 16:8, Perder Peso",
              "steps": [
                "TMB = 10 × 81.6kg + 6.25 × 177.8cm − 5 × 30 + 5 = 1,778 cal",
                "GEDT = 1,778 × 1.55 (moderado) = 2,756 cal",
                "Objetivo pérdida peso = 2,756 × 0.80 = 2,205 cal/día",
                "Proteína = 180g (1g por lb), Grasa = 61g (25%), Carbohidratos = 208g (restante)",
                "3 comidas → 735 cal/comida (60g proteína, 20g grasa, 69g carbohidratos cada una)"
              ],
              "result": "Come 2,205 cal/día de 12 PM a 8 PM — pierde ~1.1 lbs/semana"
            },
            {
              "title": "Mujer, 28, 140 lbs, 5'5\", Actividad Ligera, 14:10, Mantener",
              "steps": [
                "TMB = 10 × 63.5kg + 6.25 × 165.1cm − 5 × 28 − 161 = 1,368 cal",
                "GEDT = 1,368 × 1.375 (ligera) = 1,881 cal",
                "Objetivo mantenimiento = 1,881 cal/día (sin déficit)",
                "Proteína = 112g (0.8g por lb), Grasa = 63g (30%), Carbohidratos = 218g",
                "3 comidas → 627 cal/comida en una ventana de alimentación de 10 horas"
              ],
              "result": "Come 1,881 cal/día de 9 AM a 7 PM — mantén peso actual"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿El café rompe mi ayuno?",
          "answer": "El café negro, té natural y agua no rompen tu ayuno. Contienen virtualmente cero calorías y pueden incluso mejorar los beneficios del ayuno al acelerar el metabolismo. Sin embargo, agregar crema, azúcar, leche o edulcorantes artificiales puede provocar una respuesta de insulina y técnicamente romper tu ayuno. Si necesitas sabor, un pequeño chorro de limón en agua es generalmente aceptable."
        },
        {
          "question": "¿Cuál método de ayuno es mejor para principiantes?",
          "answer": "El método 16:8 es el punto de partida más popular porque es simple y sostenible — esencialmente omites el desayuno y dejas de comer después de la cena. Si 16 horas se siente muy largo, comienza con 12:12 o 14:10 las primeras 1-2 semanas, luego extiende gradualmente tu ventana de ayuno. La clave es la consistencia, no la intensidad."
        },
        {
          "question": "¿Perderé músculo mientras ayuno?",
          "answer": "No si comes suficiente proteína y haces entrenamiento de resistencia. El ayuno intermitente en realidad aumenta los niveles de Hormona del Crecimiento Humano (HCH), lo que ayuda a preservar el músculo. Apunta a 0.8-1.2g de proteína por libra de peso corporal, prioriza alimentos ricos en proteína al romper tu ayuno, y mantén tu rutina de entrenamiento de fuerza. La mayoría de la investigación muestra que el AI preserva la masa magra mejor que la restricción calórica continua."
        },
        {
          "question": "¿Pueden las mujeres hacer ayuno intermitente de forma segura?",
          "answer": "Sí, pero las mujeres pueden necesitar un enfoque más suave. Algunas investigaciones sugieren que el ayuno extendido (18+ horas) puede afectar las hormonas femeninas, particularmente si ya eres delgada o estás bajo estrés. A menudo se aconseja a las mujeres comenzar con 14:10 o 16:8 y evitar ayunar en días consecutivos inicialmente. Las mujeres embarazadas o lactantes no deben practicar AI. Si notas irregularidades menstruales, reduce tu ventana de ayuno."
        },
        {
          "question": "¿Cuánto tiempo toma ver resultados del ayuno intermitente?",
          "answer": "La mayoría de las personas notan cambios iniciales dentro de 2-4 semanas, incluyendo reducción de hinchazón y mejor energía. La pérdida significativa de grasa típicamente se vuelve visible a las 4-8 semanas con ayuno consistente e ingesta calórica apropiada. La pérdida de peso promedia 0.5-2 lbs por semana dependiendo de tu déficit calórico. Los beneficios metabólicos como mejor sensibilidad a la insulina pueden medirse dentro de 2-3 semanas."
        },
        {
          "question": "¿Debo ejercitarme mientras ayuno?",
          "answer": "Sí, el ejercicio moderado durante el ayuno es seguro y puede mejorar la quema de grasa. Cardio ligero, yoga y entrenamiento de fuerza moderado funcionan bien en estado de ayuno. Para entrenamientos intensos, considera programarlos cerca del final de tu ayuno o dentro de tu ventana de alimentación para mejor rendimiento. Siempre escucha a tu cuerpo — si te sientes mareado o débil, come algo y ajusta tu horario."
        },
        {
          "question": "¿Qué debo comer para romper mi ayuno?",
          "answer": "Rompe tu ayuno con alimentos fáciles de digerir y ricos en nutrientes. Comienza con proteína (huevos, pollo, pescado, yogur griego) y grasas saludables (aguacate, nueces, aceite de oliva), luego agrega carbohidratos complejos. Evita romper tu ayuno con alimentos azucarados, carbohidratos procesados o porciones grandes — esto puede causar malestar digestivo y picos de azúcar en sangre. Una comida balanceada con 30-40g de proteína es ideal."
        },
        {
          "question": "¿Es efectivo el método 5:2 para pérdida de peso?",
          "answer": "Sí, el método 5:2 es efectivo y puede ser más fácil para personas que prefieren no ayunar diariamente. En días restringidos, comes 500-600 calorías (típicamente como una o dos comidas pequeñas). La investigación de la Universidad de Illinois muestra resultados similares de pérdida de peso entre 5:2 y restricción calórica diaria. La ventaja es psicológica — saber que puedes comer normalmente la mayoría de los días mejora la adherencia."
        }
      ],
      "chart": {
        "title": "Distribución de Macros por Comida",
        "xLabel": "Comida",
        "yLabel": "Gramos",
        "series": {
          "protein": "Proteína",
          "carbs": "Carbohidratos",
          "fat": "Grasa"
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
      "name": "Calculadora de Jejum Intermitente",
      "slug": "calculadora-jejum-intermitente",
      "subtitle": "Planeje seu cronograma de jejum, calcule calorias diárias e macros, e veja seus resultados estimados.",
      "breadcrumb": "Calculadora JI",
      "seo": {
        "title": "Calculadora de Jejum Intermitente - Ferramenta Gratuita de Planejamento",
        "description": "Planeje seu cronograma de jejum intermitente com cálculos de calorias e macros. Compare 7 métodos incluindo 16:8, 18:6, OMAD e 5:2 com distribuição por refeição.",
        "shortDescription": "Calcule seu cronograma de jejum, calorias e macros.",
        "keywords": [
          "calculadora jejum intermitente",
          "calculadora JI",
          "calculadora jejum 16:8",
          "calculadora cronograma jejum",
          "plano refeições jejum intermitente",
          "calculadora jejum gratuita",
          "calculadora OMAD",
          "calculadora calorias jejum"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "gender": {
          "label": "Gênero",
          "helpText": "Afeta o cálculo da taxa metabólica basal",
          "options": {
            "male": "Masculino",
            "female": "Feminino"
          }
        },
        "age": {
          "label": "Idade",
          "helpText": "Sua idade atual em anos"
        },
        "weight": {
          "label": "Peso",
          "helpText": "Seu peso corporal atual"
        },
        "height": {
          "label": "Altura",
          "helpText": "Sua altura atual"
        },
        "activityLevel": {
          "label": "Nível de Atividade",
          "helpText": "Sua atividade física semanal típica",
          "options": {
            "sedentary": "Sedentário (trabalho de escritório, pouco exercício)",
            "light": "Levemente Ativo (1-3 dias/semana)",
            "moderate": "Moderadamente Ativo (3-5 dias/semana)",
            "active": "Muito Ativo (6-7 dias/semana)",
            "veryActive": "Extremamente Ativo (atleta, trabalho físico)"
          }
        },
        "fastingMethod": {
          "label": "Método de Jejum",
          "helpText": "Escolha seu protocolo de jejum intermitente",
          "options": {
            "12_12": "12:12 — 12h jejum, 12h alimentação (Iniciante)",
            "14_10": "14:10 — 14h jejum, 10h alimentação (Fácil)",
            "16_8": "16:8 — 16h jejum, 8h alimentação (Popular)",
            "18_6": "18:6 — 18h jejum, 6h alimentação (Intermediário)",
            "20_4": "20:4 — 20h jejum, 4h alimentação (Guerreiro)",
            "23_1": "23:1 — OMAD, Uma Refeição por Dia (Avançado)",
            "5_2": "5:2 — 5 dias normal, 2 dias ~500 cal"
          }
        },
        "goal": {
          "label": "Objetivo",
          "helpText": "O que você quer alcançar com o jejum",
          "options": {
            "lose": "Perder Peso",
            "maintain": "Manter Peso",
            "recomp": "Recomposição Corporal"
          }
        },
        "mealsPerDay": {
          "label": "Refeições por Dia",
          "helpText": "Número de refeições na sua janela de alimentação",
          "options": {
            "2": "2 Refeições",
            "3": "3 Refeições",
            "4": "4 Refeições"
          }
        },
        "firstMealTime": {
          "label": "Horário da Primeira Refeição",
          "helpText": "Quando você quer quebrar seu jejum",
          "options": {
            "7": "7:00",
            "8": "8:00",
            "9": "9:00",
            "10": "10:00",
            "11": "11:00",
            "12": "12:00",
            "13": "13:00",
            "14": "14:00"
          }
        }
      },
      "results": {
        "dailyCalories": {
          "label": "Calorias Diárias"
        },
        "bmr": {
          "label": "Taxa Metabólica Basal"
        },
        "tdee": {
          "label": "Energia Diária Total"
        },
        "eatingWindow": {
          "label": "Janela de Alimentação"
        },
        "fastingHours": {
          "label": "Horas de Jejum"
        },
        "protein": {
          "label": "Proteína"
        },
        "carbs": {
          "label": "Carboidratos"
        },
        "fat": {
          "label": "Gordura"
        },
        "caloriesPerMeal": {
          "label": "Calorias por Refeição"
        },
        "estimatedWeeklyLoss": {
          "label": "Mudança Semanal Est."
        }
      },
      "presets": {
        "beginner": {
          "label": "Iniciante",
          "description": "Método 16:8 com atividade leve — ótimo ponto de partida"
        },
        "weightLoss": {
          "label": "Perda de Peso",
          "description": "Método 18:6 com atividade moderada para resultados mais rápidos"
        },
        "advanced": {
          "label": "Avançado",
          "description": "Método guerreiro 20:4 para praticantes experientes"
        }
      },
      "values": {
        "cal": "cal",
        "kcal": "kcal",
        "g": "g",
        "lbs": "lbs",
        "kg": "kg",
        "lbs/week": "lbs/semana",
        "kg/week": "kg/semana",
        "hours": "horas",
        "hour": "hora",
        "to": "às",
        "am": "",
        "pm": "",
        "meals": "refeições",
        "meal": "refeição",
        "normalDays": "dias normais",
        "restrictedDays": "dias restritos"
      },
      "formats": {
        "summary": "Coma {calories} cal/dia em uma janela de {eatingHours}h ({method}). Meta: {protein}g proteína, {carbs}g carboidratos, {fat}g gordura por dia."
      },
      "infoCards": {
        "nutrition": {
          "title": "Sua Nutrição Diária",
          "items": [
            {
              "label": "Calorias Diárias",
              "valueKey": "dailyCalories"
            },
            {
              "label": "Proteína",
              "valueKey": "protein"
            },
            {
              "label": "Carboidratos",
              "valueKey": "carbs"
            },
            {
              "label": "Gordura",
              "valueKey": "fat"
            }
          ]
        },
        "schedule": {
          "title": "Seu Cronograma de Jejum",
          "items": [
            {
              "label": "Janela de Alimentação",
              "valueKey": "eatingWindow"
            },
            {
              "label": "Horas de Jejum",
              "valueKey": "fastingHours"
            },
            {
              "label": "Calorias por Refeição",
              "valueKey": "caloriesPerMeal"
            },
            {
              "label": "Mudança Semanal Est.",
              "valueKey": "estimatedWeeklyLoss"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Jejum",
          "items": [
            "Mantenha-se hidratado — beba água, café preto e chá puro durante o jejum. Bebidas zero calorias não quebram o jejum.",
            "Comece com jejuns mais curtos como 12:12 ou 14:10 e aumente gradualmente. Seu corpo precisa de 1-2 semanas para se adaptar.",
            "Quebre o jejum com proteína e gorduras saudáveis primeiro, depois adicione carboidratos. Isso previne picos de açúcar no sangue.",
            "Programe treinos próximo ao final do jejum ou logo após comer para melhor performance e recuperação."
          ]
        }
      },
      "detailedTable": {
        "methodComparison": {
          "button": "Ver Todos os Métodos de Jejum",
          "title": "Comparação de Métodos de Jejum",
          "columns": {
            "method": "Método",
            "fastHours": "Jejum",
            "eatHours": "Alimentação",
            "difficulty": "Dificuldade",
            "bestFor": "Melhor Para",
            "schedule": "Cronograma Exemplo"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é Jejum Intermitente?",
          "content": "O jejum intermitente (JI) é um padrão alimentar que alterna entre períodos de jejum e alimentação. Ao contrário das dietas tradicionais que focam no que você come, o JI foca em quando você come. O método mais popular é o 16:8, onde você jejua por 16 horas e come em uma janela de 8 horas. Pesquisas publicadas no New England Journal of Medicine (2019) mostram que o jejum intermitente pode melhorar a saúde metabólica, reduzir inflamação e promover reparo celular através de um processo chamado autofagia. Durante o jejum, seu corpo muda de usar glicose como combustível primário para queimar gordura armazenada, tipicamente entrando em estado de cetose após 12-16 horas sem comida."
        },
        "howItWorks": {
          "title": "Como Esta Calculadora Funciona",
          "content": "Esta calculadora usa a equação Mifflin-St Jeor para estimar sua Taxa Metabólica Basal (TMB) baseada no seu gênero, idade, peso e altura. Então multiplica sua TMB por um fator de atividade para determinar seu Gasto Energético Diário Total (GEDT). Baseado no seu objetivo — perder peso, manter ou recomposição corporal — ajusta sua meta calórica diária. Para perda de peso, aplica déficit calórico de 20%; para recomposição, déficit de 10% com mais proteína. Finalmente, distribui seus macronutrientes diários (proteína, carboidratos, gordura) ao longo do número escolhido de refeições na sua janela de alimentação, dando uma divisão completa por refeição."
        },
        "benefits": {
          "title": "Benefícios do JI Comprovados pela Ciência",
          "items": [
            {
              "text": "A queima de gordura aumenta significativamente após 12+ horas de jejum conforme o corpo esgota estoques de glicogênio e muda para oxidação de gordura (cetose)",
              "type": "info"
            },
            {
              "text": "Autofagia — limpeza e reparo celular — ativa durante períodos estendidos de jejum, removendo proteínas e organelas danificadas",
              "type": "info"
            },
            {
              "text": "Sensibilidade à insulina melhora, reduzindo risco de diabetes tipo 2. Estudos mostram que jejum pode baixar insulina em jejum em 20-31%",
              "type": "info"
            },
            {
              "text": "Níveis de Hormônio do Crescimento Humano (HGH) podem aumentar até 5x durante jejum, apoiando preservação muscular e perda de gordura",
              "type": "info"
            },
            {
              "text": "Marcadores inflamatórios (PCR, IL-6) diminuem com jejum regular, potencialmente reduzindo risco de doenças crônicas",
              "type": "info"
            },
            {
              "text": "Aviso: JI não é recomendado para mulheres grávidas ou amamentando, pessoas com transtornos alimentares, diabetes tipo 1 ou crianças menores de 18 anos",
              "type": "warning"
            }
          ]
        },
        "methods": {
          "title": "Métodos de Jejum Explicados",
          "items": [
            {
              "text": "12:12 — Divisão igual entre jejum e alimentação. Ideal para iniciantes já que o sono noturno cobre a maior parte do jejum",
              "type": "info"
            },
            {
              "text": "14:10 — Jejum ligeiramente mais longo. Evite lanches noturnos e atrase café da manhã em 1-2 horas para fácil adesão",
              "type": "info"
            },
            {
              "text": "16:8 — O método mais pesquisado e popular. Pule café da manhã, coma do meio-dia às 20h. Sustentável a longo prazo",
              "type": "info"
            },
            {
              "text": "18:6 — Protocolo intermediário. Duas refeições maiores com melhor ativação da autofagia e cetose mais profunda",
              "type": "info"
            },
            {
              "text": "20:4 (Guerreiro) — Método avançado com janela de alimentação de 4 horas. Geralmente uma refeição principal mais um lanche pequeno",
              "type": "warning"
            },
            {
              "text": "5:2 — Coma normalmente 5 dias por semana, restrinja a 500-600 calorias em 2 dias não consecutivos. Cronograma mais flexível",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo",
          "description": "Exemplos passo a passo de como as calorias do jejum são calculadas",
          "examples": [
            {
              "title": "Homem, 30, 82kg, 1,78m, Atividade Moderada, 16:8, Perder Peso",
              "steps": [
                "TMB = 10 × 82kg + 6,25 × 178cm − 5 × 30 + 5 = 1.778 cal",
                "GEDT = 1.778 × 1,55 (moderado) = 2.756 cal",
                "Meta perda de peso = 2.756 × 0,80 = 2.205 cal/dia",
                "Proteína = 82g (1g por kg), Gordura = 61g (25%), Carboidratos = 208g (restante)",
                "3 refeições → 735 cal/refeição (27g proteína, 20g gordura, 52g carboidratos cada)"
              ],
              "result": "Coma 2.205 cal/dia das 12h às 20h — perca ~0,5 kg/semana"
            },
            {
              "title": "Mulher, 28, 64kg, 1,65m, Atividade Leve, 14:10, Manter",
              "steps": [
                "TMB = 10 × 64kg + 6,25 × 165cm − 5 × 28 − 161 = 1.368 cal",
                "GEDT = 1.368 × 1,375 (leve) = 1.881 cal",
                "Meta manutenção = 1.881 cal/dia (sem déficit)",
                "Proteína = 51g (0,8g por kg), Gordura = 63g (30%), Carboidratos = 218g",
                "3 refeições → 627 cal/refeição em janela de 10 horas"
              ],
              "result": "Coma 1.881 cal/dia das 9h às 19h — mantenha peso atual"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Café quebra meu jejum?",
          "answer": "Café preto, chá puro e água não quebram seu jejum. Eles contêm virtualmente zero calorias e podem até aumentar os benefícios do jejum ao acelerar o metabolismo. Porém, adicionar creme, açúcar, leite ou adoçantes artificiais pode desencadear resposta insulínica e tecnicamente quebrar seu jejum. Se precisar de sabor, um pequeno espremido de limão na água é geralmente aceitável."
        },
        {
          "question": "Qual método de jejum é melhor para iniciantes?",
          "answer": "O método 16:8 é o ponto de partida mais popular porque é simples e sustentável — você essencialmente pula o café da manhã e para de comer após o jantar. Se 16 horas parecer muito, comece com 12:12 ou 14:10 nas primeiras 1-2 semanas, depois estenda gradualmente sua janela de jejum. A chave é consistência, não intensidade."
        },
        {
          "question": "Vou perder músculo durante o jejum?",
          "answer": "Não se você comer proteína suficiente e fizer treino de resistência. Jejum intermitente na verdade aumenta níveis de Hormônio do Crescimento (HGH), que ajuda preservar músculo. Mire em 0,8-1,2g de proteína por kg de peso corporal, priorize alimentos ricos em proteína ao quebrar jejum e mantenha rotina de treino de força. A maioria das pesquisas mostra que JI preserva massa magra melhor que restrição calórica contínua."
        },
        {
          "question": "Mulheres podem fazer jejum intermitente com segurança?",
          "answer": "Sim, mas mulheres podem precisar de abordagem mais suave. Algumas pesquisas sugerem que jejuns estendidos (18+ horas) podem afetar hormônios femininos, particularmente se você já for magra ou estiver sob estresse. Mulheres são frequentemente aconselhadas a começar com 14:10 ou 16:8 e evitar jejuar em dias consecutivos inicialmente. Grávidas ou amamentando não devem praticar JI. Se notar irregularidades menstruais, reduza sua janela de jejum."
        },
        {
          "question": "Quanto tempo leva para ver resultados do jejum intermitente?",
          "answer": "A maioria das pessoas nota mudanças iniciais em 2-4 semanas, incluindo redução de inchaço e melhora da energia. Perda significativa de gordura tipicamente se torna visível em 4-8 semanas com jejum consistente e ingestão calórica apropriada. Perda de peso média 0,25-1 kg por semana dependendo do seu déficit calórico. Os benefícios metabólicos como melhora da sensibilidade à insulina podem ser medidos em 2-3 semanas."
        },
        {
          "question": "Devo exercitar durante o jejum?",
          "answer": "Sim, exercício moderado durante jejum é seguro e pode aumentar queima de gordura. Cardio leve, yoga e treino de força moderado funcionam bem em estado de jejum. Para treinos intensos, considere programá-los próximo ao final do jejum ou na sua janela de alimentação para melhor performance. Sempre escute seu corpo — se sentir tontura ou fraqueza, coma algo e ajuste seu cronograma."
        },
        {
          "question": "O que devo comer para quebrar meu jejum?",
          "answer": "Quebre seu jejum com alimentos facilmente digeríveis e ricos em nutrientes. Comece com proteína (ovos, frango, peixe, iogurte grego) e gorduras saudáveis (abacate, nozes, azeite), depois adicione carboidratos complexos. Evite quebrar jejum com alimentos açucarados, carboidratos processados ou porções grandes — isso pode causar desconforto digestivo e picos de açúcar no sangue. Uma refeição equilibrada com 30-40g de proteína é ideal."
        },
        {
          "question": "O método 5:2 é efetivo para perda de peso?",
          "answer": "Sim, o método 5:2 é efetivo e pode ser mais fácil para pessoas que preferem não jejuar diariamente. Em dias restritos, você come 500-600 calorias (tipicamente como uma ou duas refeições pequenas). Pesquisa da Universidade de Illinois mostra resultados similares de perda de peso entre 5:2 e restrição calórica diária. A vantagem é psicológica — saber que pode comer normalmente na maioria dos dias melhora a adesão."
        }
      ],
      "chart": {
        "title": "Distribuição de Macros por Refeição",
        "xLabel": "Refeição",
        "yLabel": "Gramas",
        "series": {
          "protein": "Proteína",
          "carbs": "Carboidratos",
          "fat": "Gordura"
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
      }
    },
    fr: {
      "name": "Calculateur de Jeûne Intermittent",
      "slug": "calculateur-jeune-intermittent",
      "subtitle": "Planifiez votre programme de jeûne, calculez vos calories et macros quotidiennes, et visualisez vos résultats estimés.",
      "breadcrumb": "Calculateur JI",
      "seo": {
        "title": "Calculateur de Jeûne Intermittent - Outil de Plan de Repas Gratuit",
        "description": "Planifiez votre programme de jeûne intermittent avec calculs de calories et macros. Comparez 7 méthodes incluant 16:8, 18:6, OMAD, et 5:2 avec répartition par repas.",
        "shortDescription": "Calculez votre programme de jeûne, calories et macros.",
        "keywords": [
          "calculateur jeûne intermittent",
          "calculateur JI",
          "calculateur jeûne 16:8",
          "calculateur programme jeûne",
          "plan repas jeûne intermittent",
          "calculateur jeûne gratuit",
          "calculateur OMAD",
          "calculateur calories jeûne"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "gender": {
          "label": "Sexe",
          "helpText": "Affecte le calcul du métabolisme de base",
          "options": {
            "male": "Homme",
            "female": "Femme"
          }
        },
        "age": {
          "label": "Âge",
          "helpText": "Votre âge actuel en années"
        },
        "weight": {
          "label": "Poids",
          "helpText": "Votre poids corporel actuel"
        },
        "height": {
          "label": "Taille",
          "helpText": "Votre taille actuelle"
        },
        "activityLevel": {
          "label": "Niveau d'Activité",
          "helpText": "Votre activité physique hebdomadaire typique",
          "options": {
            "sedentary": "Sédentaire (travail de bureau, peu d'exercice)",
            "light": "Légèrement Actif (1-3 jours/semaine)",
            "moderate": "Modérément Actif (3-5 jours/semaine)",
            "active": "Très Actif (6-7 jours/semaine)",
            "veryActive": "Extrêmement Actif (athlète, travail physique)"
          }
        },
        "fastingMethod": {
          "label": "Méthode de Jeûne",
          "helpText": "Choisissez votre protocole de jeûne intermittent",
          "options": {
            "12_12": "12:12 — 12h jeûne, 12h alimentation (Débutant)",
            "14_10": "14:10 — 14h jeûne, 10h alimentation (Facile)",
            "16_8": "16:8 — 16h jeûne, 8h alimentation (Populaire)",
            "18_6": "18:6 — 18h jeûne, 6h alimentation (Intermédiaire)",
            "20_4": "20:4 — 20h jeûne, 4h alimentation (Guerrier)",
            "23_1": "23:1 — OMAD, Un Repas Par Jour (Avancé)",
            "5_2": "5:2 — 5 jours normal, 2 jours ~500 cal"
          }
        },
        "goal": {
          "label": "Objectif",
          "helpText": "Ce que vous voulez atteindre avec le jeûne",
          "options": {
            "lose": "Perdre du Poids",
            "maintain": "Maintenir le Poids",
            "recomp": "Recomposition Corporelle"
          }
        },
        "mealsPerDay": {
          "label": "Repas Par Jour",
          "helpText": "Nombre de repas dans votre fenêtre alimentaire",
          "options": {
            "2": "2 Repas",
            "3": "3 Repas",
            "4": "4 Repas"
          }
        },
        "firstMealTime": {
          "label": "Heure du Premier Repas",
          "helpText": "Quand vous voulez rompre votre jeûne",
          "options": {
            "7": "7:00",
            "8": "8:00",
            "9": "9:00",
            "10": "10:00",
            "11": "11:00",
            "12": "12:00",
            "13": "13:00",
            "14": "14:00"
          }
        }
      },
      "results": {
        "dailyCalories": {
          "label": "Calories Quotidiennes"
        },
        "bmr": {
          "label": "Métabolisme de Base"
        },
        "tdee": {
          "label": "Énergie Totale Quotidienne"
        },
        "eatingWindow": {
          "label": "Fenêtre Alimentaire"
        },
        "fastingHours": {
          "label": "Heures de Jeûne"
        },
        "protein": {
          "label": "Protéines"
        },
        "carbs": {
          "label": "Glucides"
        },
        "fat": {
          "label": "Lipides"
        },
        "caloriesPerMeal": {
          "label": "Calories Par Repas"
        },
        "estimatedWeeklyLoss": {
          "label": "Changement Hebdomadaire Est."
        }
      },
      "presets": {
        "beginner": {
          "label": "Débutant",
          "description": "Méthode 16:8 avec activité légère — excellent point de départ"
        },
        "weightLoss": {
          "label": "Perte de Poids",
          "description": "Méthode 18:6 avec activité modérée pour des résultats plus rapides"
        },
        "advanced": {
          "label": "Avancé",
          "description": "Méthode guerrier 20:4 pour les jeûneurs expérimentés"
        }
      },
      "values": {
        "cal": "cal",
        "kcal": "kcal",
        "g": "g",
        "lbs": "lbs",
        "kg": "kg",
        "lbs/week": "lbs/semaine",
        "kg/week": "kg/semaine",
        "hours": "heures",
        "hour": "heure",
        "to": "à",
        "am": "",
        "pm": "",
        "meals": "repas",
        "meal": "repas",
        "normalDays": "jours normaux",
        "restrictedDays": "jours restreints"
      },
      "formats": {
        "summary": "Mangez {calories} cal/jour dans une fenêtre de {eatingHours}h ({method}). Objectif : {protein}g protéines, {carbs}g glucides, {fat}g lipides par jour."
      },
      "infoCards": {
        "nutrition": {
          "title": "Votre Nutrition Quotidienne",
          "items": [
            {
              "label": "Calories Quotidiennes",
              "valueKey": "dailyCalories"
            },
            {
              "label": "Protéines",
              "valueKey": "protein"
            },
            {
              "label": "Glucides",
              "valueKey": "carbs"
            },
            {
              "label": "Lipides",
              "valueKey": "fat"
            }
          ]
        },
        "schedule": {
          "title": "Votre Programme de Jeûne",
          "items": [
            {
              "label": "Fenêtre Alimentaire",
              "valueKey": "eatingWindow"
            },
            {
              "label": "Heures de Jeûne",
              "valueKey": "fastingHours"
            },
            {
              "label": "Calories Par Repas",
              "valueKey": "caloriesPerMeal"
            },
            {
              "label": "Changement Hebdomadaire Est.",
              "valueKey": "estimatedWeeklyLoss"
            }
          ]
        },
        "tips": {
          "title": "Conseils de Jeûne",
          "items": [
            "Restez hydraté — buvez de l'eau, du café noir et du thé nature pendant votre jeûne. Les boissons zéro calorie ne rompent pas le jeûne.",
            "Commencez par un jeûne plus court comme 12:12 ou 14:10 et augmentez progressivement. Votre corps a besoin de 1-2 semaines pour s'adapter.",
            "Rompez votre jeûne avec des protéines et des graisses saines d'abord, puis ajoutez les glucides. Cela évite les pics de glycémie.",
            "Programmez vos entraînements près de la fin de votre jeûne ou juste après avoir mangé pour de meilleures performances et récupération."
          ]
        }
      },
      "detailedTable": {
        "methodComparison": {
          "button": "Voir Toutes les Méthodes de Jeûne",
          "title": "Comparaison des Méthodes de Jeûne",
          "columns": {
            "method": "Méthode",
            "fastHours": "Jeûne",
            "eatHours": "Alimentation",
            "difficulty": "Difficulté",
            "bestFor": "Idéal Pour",
            "schedule": "Exemple d'Horaire"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que le Jeûne Intermittent ?",
          "content": "Le jeûne intermittent (JI) est un modèle alimentaire qui alterne entre des périodes de jeûne et d'alimentation. Contrairement aux régimes traditionnels qui se concentrent sur ce que vous mangez, le JI se concentre sur quand vous mangez. La méthode la plus populaire est le 16:8, où vous jeûnez pendant 16 heures et mangez dans une fenêtre de 8 heures. La recherche publiée dans le New England Journal of Medicine (2019) montre que le jeûne intermittent peut améliorer la santé métabolique, réduire l'inflammation et favoriser la réparation cellulaire par un processus appelé autophagie. Pendant le jeûne, votre corps passe de l'utilisation du glucose comme carburant principal à la combustion des graisses stockées, entrant généralement dans un état de cétose après 12-16 heures sans nourriture."
        },
        "howItWorks": {
          "title": "Comment Fonctionne Ce Calculateur",
          "content": "Ce calculateur utilise l'équation de Mifflin-St Jeor pour estimer votre Métabolisme de Base (MB) basé sur votre sexe, âge, poids et taille. Il multiplie ensuite votre MB par un facteur d'activité pour déterminer votre Dépense Énergétique Totale Quotidienne (DETQ). Selon votre objectif — perdre du poids, maintenir ou recomposition corporelle — il ajuste votre cible calorique quotidienne. Pour la perte de poids, il applique un déficit calorique de 20% ; pour la recomposition, un déficit de 10% avec plus de protéines. Enfin, il distribue vos macronutriments quotidiens (protéines, glucides, lipides) sur votre nombre de repas choisi dans votre fenêtre alimentaire, vous donnant une répartition complète par repas."
        },
        "benefits": {
          "title": "Bienfaits du JI Scientifiquement Prouvés",
          "items": [
            {
              "text": "La combustion des graisses augmente significativement après 12+ heures de jeûne car le corps épuise les réserves de glycogène et passe à l'oxydation des graisses (cétose)",
              "type": "info"
            },
            {
              "text": "L'autophagie — nettoyage et réparation cellulaires — s'active pendant les périodes de jeûne prolongées, éliminant les protéines et organelles endommagées",
              "type": "info"
            },
            {
              "text": "La sensibilité à l'insuline s'améliore, réduisant le risque de diabète de type 2. Les études montrent que le jeûne peut réduire l'insuline à jeun de 20-31%",
              "type": "info"
            },
            {
              "text": "Les niveaux d'Hormone de Croissance Humaine (HCH) peuvent augmenter jusqu'à 5 fois pendant le jeûne, soutenant la préservation musculaire et la perte de graisse",
              "type": "info"
            },
            {
              "text": "Les marqueurs d'inflammation (CRP, IL-6) diminuent avec le jeûne régulier, réduisant potentiellement le risque de maladies chroniques",
              "type": "info"
            },
            {
              "text": "Attention : Le JI n'est pas recommandé pour les femmes enceintes ou allaitantes, les personnes avec troubles alimentaires, diabète type 1, ou enfants de moins de 18 ans",
              "type": "warning"
            }
          ]
        },
        "methods": {
          "title": "Méthodes de Jeûne Expliquées",
          "items": [
            {
              "text": "12:12 — Répartition égale entre jeûne et alimentation. Idéal pour débutants car le sommeil nocturne couvre la plupart du jeûne",
              "type": "info"
            },
            {
              "text": "14:10 — Jeûne légèrement plus long. Évitez les collations tardives et retardez le petit-déjeuner de 1-2 heures pour une observance facile",
              "type": "info"
            },
            {
              "text": "16:8 — La méthode la plus recherchée et populaire. Sautez le petit-déjeuner, mangez de midi à 20h. Durable à long terme",
              "type": "info"
            },
            {
              "text": "18:6 — Protocole intermédiaire. Deux repas plus copieux avec meilleure activation de l'autophagie et cétose plus profonde",
              "type": "info"
            },
            {
              "text": "20:4 (Guerrier) — Méthode avancée avec fenêtre alimentaire de 4 heures. Habituellement un repas principal plus une petite collation",
              "type": "warning"
            },
            {
              "text": "5:2 — Mangez normalement 5 jours par semaine, limitez à 500-600 calories sur 2 jours non consécutifs. Horaire plus flexible",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul",
          "description": "Exemples étape par étape de calcul des calories de jeûne",
          "examples": [
            {
              "title": "Homme, 30 ans, 80kg, 1m78, Activité Modérée, 16:8, Perdre du Poids",
              "steps": [
                "MB = 10 × 80kg + 6,25 × 178cm − 5 × 30 + 5 = 1 778 cal",
                "DETQ = 1 778 × 1,55 (modéré) = 2 756 cal",
                "Objectif perte = 2 756 × 0,80 = 2 205 cal/jour",
                "Protéines = 128g (1,6g/kg), Lipides = 61g (25%), Glucides = 208g (restant)",
                "3 repas → 735 cal/repas (43g protéines, 20g lipides, 69g glucides chacun)"
              ],
              "result": "Mangez 2 205 cal/jour de 12h à 20h — perdez ~0,5 kg/semaine"
            },
            {
              "title": "Femme, 28 ans, 63kg, 1m65, Activité Légère, 14:10, Maintenir",
              "steps": [
                "MB = 10 × 63kg + 6,25 × 165cm − 5 × 28 − 161 = 1 368 cal",
                "DETQ = 1 368 × 1,375 (léger) = 1 881 cal",
                "Objectif maintien = 1 881 cal/jour (pas de déficit)",
                "Protéines = 101g (1,6g/kg), Lipides = 63g (30%), Glucides = 218g",
                "3 repas → 627 cal/repas dans une fenêtre de 10 heures"
              ],
              "result": "Mangez 1 881 cal/jour de 9h à 19h — maintenez le poids actuel"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Le café rompt-il mon jeûne ?",
          "answer": "Le café noir, le thé nature et l'eau ne rompent pas votre jeûne. Ils contiennent virtuellement zéro calorie et peuvent même améliorer les bienfaits du jeûne en stimulant le métabolisme. Cependant, ajouter de la crème, du sucre, du lait ou des édulcorants artificiels peut déclencher une réponse insulinique et techniquement rompre votre jeûne. Si vous avez besoin de saveur, un petit filet de citron dans l'eau est généralement acceptable."
        },
        {
          "question": "Quelle méthode de jeûne est la meilleure pour les débutants ?",
          "answer": "La méthode 16:8 est le point de départ le plus populaire car elle est simple et durable — vous sautez essentiellement le petit-déjeuner et arrêtez de manger après le dîner. Si 16 heures semblent trop longues, commencez par 12:12 ou 14:10 les premières 1-2 semaines, puis étendez progressivement votre fenêtre de jeûne. La clé est la constance, pas l'intensité."
        },
        {
          "question": "Vais-je perdre du muscle en jeûnant ?",
          "answer": "Pas si vous mangez assez de protéines et faites de la musculation. Le jeûne intermittent augmente en fait les niveaux d'Hormone de Croissance Humaine (HCH), ce qui aide à préserver le muscle. Visez 1,6-1,9g de protéines par kilo de poids corporel, priorisez les aliments riches en protéines quand vous rompez votre jeûne, et maintenez votre routine de musculation. La plupart des recherches montrent que le JI préserve mieux la masse maigre que la restriction calorique continue."
        },
        {
          "question": "Les femmes peuvent-elles pratiquer le jeûne intermittent en sécurité ?",
          "answer": "Oui, mais les femmes peuvent avoir besoin d'une approche plus douce. Certaines recherches suggèrent que le jeûne prolongé (18+ heures) peut affecter les hormones féminines, particulièrement si vous êtes déjà mince ou sous stress. Il est souvent conseillé aux femmes de commencer par 14:10 ou 16:8 et d'éviter de jeûner sur des jours consécutifs initialement. Les femmes enceintes ou allaitantes ne doivent pas pratiquer le JI. Si vous remarquez des irrégularités menstruelles, réduisez votre fenêtre de jeûne."
        },
        {
          "question": "Combien de temps faut-il pour voir des résultats avec le jeûne intermittent ?",
          "answer": "La plupart des gens remarquent des changements initiaux dans les 2-4 semaines, incluant une réduction des ballonnements et une amélioration de l'énergie. Une perte de graisse significative devient généralement visible à 4-8 semaines avec un jeûne cohérent et un apport calorique approprié. La perte de poids moyenne est de 0,25-1 kg par semaine selon votre déficit calorique. Les bienfaits métaboliques comme l'amélioration de la sensibilité à l'insuline peuvent être mesurés dans les 2-3 semaines."
        },
        {
          "question": "Dois-je faire de l'exercice pendant le jeûne ?",
          "answer": "Oui, l'exercice modéré pendant le jeûne est sûr et peut améliorer la combustion des graisses. Le cardio léger, le yoga et la musculation modérée fonctionnent bien à jeun. Pour les entraînements intenses, considérez les programmer près de la fin de votre jeûne ou dans votre fenêtre alimentaire pour de meilleures performances. Écoutez toujours votre corps — si vous vous sentez étourdi ou faible, mangez quelque chose et ajustez votre horaire."
        },
        {
          "question": "Que dois-je manger pour rompre mon jeûne ?",
          "answer": "Rompez votre jeûne avec des aliments facilement digestibles et riches en nutriments. Commencez par des protéines (œufs, poulet, poisson, yaourt grec) et des graisses saines (avocat, noix, huile d'olive), puis ajoutez des glucides complexes. Évitez de rompre votre jeûne avec des aliments sucrés, des glucides transformés ou de grandes portions — cela peut causer un inconfort digestif et des pics de glycémie. Un repas équilibré avec 30-40g de protéines est idéal."
        },
        {
          "question": "La méthode 5:2 est-elle efficace pour la perte de poids ?",
          "answer": "Oui, la méthode 5:2 est efficace et peut être plus facile pour les personnes qui préfèrent ne pas jeûner quotidiennement. Les jours restreints, vous mangez 500-600 calories (typiquement un ou deux petits repas). La recherche de l'Université de l'Illinois montre des résultats de perte de poids similaires entre 5:2 et la restriction calorique quotidienne. L'avantage est psychologique — savoir que vous pouvez manger normalement la plupart des jours améliore l'observance."
        }
      ],
      "chart": {
        "title": "Distribution des Macros par Repas",
        "xLabel": "Repas",
        "yLabel": "Grammes",
        "series": {
          "protein": "Protéines",
          "carbs": "Glucides",
          "fat": "Lipides"
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
      }
    },
    de: {
      "name": "Intermittierendes Fasten Rechner",
      "slug": "intermittierendes-fasten-rechner",
      "subtitle": "Planen Sie Ihren Fastenplan, berechnen Sie täglich Kalorien und Makros und sehen Sie Ihre geschätzten Ergebnisse.",
      "breadcrumb": "IF Rechner",
      "seo": {
        "title": "Intermittierendes Fasten Rechner - Kostenloses Ernährungsplan Tool",
        "description": "Planen Sie Ihren intermittierenden Fastenplan mit Kalorien- und Makroberechnungen. Vergleichen Sie 7 Methoden einschließlich 16:8, 18:6, OMAD und 5:2 mit Aufschlüsselung pro Mahlzeit.",
        "shortDescription": "Berechnen Sie Ihren Fastenplan, Kalorien und Makros.",
        "keywords": [
          "intermittierendes fasten rechner",
          "IF rechner",
          "16:8 fasten rechner",
          "fastenplan rechner",
          "intermittierender fasten ernährungsplan",
          "kostenloser fasten rechner",
          "OMAD rechner",
          "fasten kalorien rechner"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "gender": {
          "label": "Geschlecht",
          "helpText": "Beeinflusst die Berechnung des Grundumsatzes",
          "options": {
            "male": "Männlich",
            "female": "Weiblich"
          }
        },
        "age": {
          "label": "Alter",
          "helpText": "Ihr aktuelles Alter in Jahren"
        },
        "weight": {
          "label": "Gewicht",
          "helpText": "Ihr aktuelles Körpergewicht"
        },
        "height": {
          "label": "Größe",
          "helpText": "Ihre aktuelle Körpergröße"
        },
        "activityLevel": {
          "label": "Aktivitätslevel",
          "helpText": "Ihre typische wöchentliche körperliche Aktivität",
          "options": {
            "sedentary": "Sitzend (Bürojob, wenig Sport)",
            "light": "Leicht Aktiv (1-3 Tage/Woche)",
            "moderate": "Mäßig Aktiv (3-5 Tage/Woche)",
            "active": "Sehr Aktiv (6-7 Tage/Woche)",
            "veryActive": "Extrem Aktiv (Athlet, körperlicher Job)"
          }
        },
        "fastingMethod": {
          "label": "Fastenmethode",
          "helpText": "Wählen Sie Ihr intermittierendes Fastenprotokoll",
          "options": {
            "12_12": "12:12 — 12h fasten, 12h essen (Anfänger)",
            "14_10": "14:10 — 14h fasten, 10h essen (Einfach)",
            "16_8": "16:8 — 16h fasten, 8h essen (Beliebt)",
            "18_6": "18:6 — 18h fasten, 6h essen (Fortgeschritten)",
            "20_4": "20:4 — 20h fasten, 4h essen (Krieger)",
            "23_1": "23:1 — OMAD, Eine Mahlzeit am Tag (Experte)",
            "5_2": "5:2 — 5 Tage normal, 2 Tage ~500 kcal"
          }
        },
        "goal": {
          "label": "Ziel",
          "helpText": "Was Sie mit dem Fasten erreichen möchten",
          "options": {
            "lose": "Gewicht verlieren",
            "maintain": "Gewicht halten",
            "recomp": "Körperzusammensetzung"
          }
        },
        "mealsPerDay": {
          "label": "Mahlzeiten pro Tag",
          "helpText": "Anzahl der Mahlzeiten in Ihrem Essfenster",
          "options": {
            "2": "2 Mahlzeiten",
            "3": "3 Mahlzeiten",
            "4": "4 Mahlzeiten"
          }
        },
        "firstMealTime": {
          "label": "Zeit der ersten Mahlzeit",
          "helpText": "Wann Sie Ihr Fasten brechen möchten",
          "options": {
            "7": "7:00",
            "8": "8:00",
            "9": "9:00",
            "10": "10:00",
            "11": "11:00",
            "12": "12:00",
            "13": "13:00",
            "14": "14:00"
          }
        }
      },
      "results": {
        "dailyCalories": {
          "label": "Tägliche Kalorien"
        },
        "bmr": {
          "label": "Grundumsatz"
        },
        "tdee": {
          "label": "Gesamter Tagesenergieverbrauch"
        },
        "eatingWindow": {
          "label": "Essfenster"
        },
        "fastingHours": {
          "label": "Fastenstunden"
        },
        "protein": {
          "label": "Protein"
        },
        "carbs": {
          "label": "Kohlenhydrate"
        },
        "fat": {
          "label": "Fett"
        },
        "caloriesPerMeal": {
          "label": "Kalorien pro Mahlzeit"
        },
        "estimatedWeeklyLoss": {
          "label": "Geschätzte wöchentliche Veränderung"
        }
      },
      "presets": {
        "beginner": {
          "label": "Anfänger",
          "description": "16:8 Methode mit leichter Aktivität — großartiger Startpunkt"
        },
        "weightLoss": {
          "label": "Gewichtsverlust",
          "description": "18:6 Methode mit mäßiger Aktivität für schnellere Ergebnisse"
        },
        "advanced": {
          "label": "Fortgeschritten",
          "description": "20:4 Krieger-Methode für erfahrene Faster"
        }
      },
      "values": {
        "cal": "kcal",
        "kcal": "kcal",
        "g": "g",
        "lbs": "Pfund",
        "kg": "kg",
        "lbs/week": "Pfund/Woche",
        "kg/week": "kg/Woche",
        "hours": "Stunden",
        "hour": "Stunde",
        "to": "bis",
        "am": "",
        "pm": "",
        "meals": "Mahlzeiten",
        "meal": "Mahlzeit",
        "normalDays": "normale Tage",
        "restrictedDays": "eingeschränkte Tage"
      },
      "formats": {
        "summary": "Essen Sie {calories} kcal/Tag in einem {eatingHours}h Fenster ({method}). Ziel: {protein}g Protein, {carbs}g Kohlenhydrate, {fat}g Fett pro Tag."
      },
      "infoCards": {
        "nutrition": {
          "title": "Ihre tägliche Ernährung",
          "items": [
            {
              "label": "Tägliche Kalorien",
              "valueKey": "dailyCalories"
            },
            {
              "label": "Protein",
              "valueKey": "protein"
            },
            {
              "label": "Kohlenhydrate",
              "valueKey": "carbs"
            },
            {
              "label": "Fett",
              "valueKey": "fat"
            }
          ]
        },
        "schedule": {
          "title": "Ihr Fastenplan",
          "items": [
            {
              "label": "Essfenster",
              "valueKey": "eatingWindow"
            },
            {
              "label": "Fastenstunden",
              "valueKey": "fastingHours"
            },
            {
              "label": "Kalorien pro Mahlzeit",
              "valueKey": "caloriesPerMeal"
            },
            {
              "label": "Geschätzte wöchentliche Veränderung",
              "valueKey": "estimatedWeeklyLoss"
            }
          ]
        },
        "tips": {
          "title": "Fasten-Tipps",
          "items": [
            "Bleiben Sie hydriert — trinken Sie Wasser, schwarzen Kaffee und puren Tee während Ihres Fastens. Kalorienfreie Getränke brechen Ihr Fasten nicht.",
            "Beginnen Sie mit einem kürzeren Fasten wie 12:12 oder 14:10 und steigern Sie sich allmählich. Ihr Körper braucht 1-2 Wochen zur Anpassung.",
            "Brechen Sie Ihr Fasten zuerst mit Protein und gesunden Fetten, dann fügen Sie Kohlenhydrate hinzu. Das verhindert Blutzuckerspitzen.",
            "Planen Sie Workouts gegen Ende Ihres Fastens oder direkt nach dem Essen für beste Leistung und Erholung."
          ]
        }
      },
      "detailedTable": {
        "methodComparison": {
          "button": "Alle Fastenmethoden anzeigen",
          "title": "Fastenmethoden-Vergleich",
          "columns": {
            "method": "Methode",
            "fastHours": "Fasten",
            "eatHours": "Essen",
            "difficulty": "Schwierigkeit",
            "bestFor": "Optimal für",
            "schedule": "Beispielplan"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist intermittierendes Fasten?",
          "content": "Intermittierendes Fasten (IF) ist ein Essverhalten, das zwischen Fasten- und Essperioden wechselt. Im Gegensatz zu traditionellen Diäten, die sich darauf konzentrieren, was Sie essen, konzentriert sich IF darauf, wann Sie essen. Die beliebteste Methode ist 16:8, bei der Sie 16 Stunden fasten und innerhalb eines 8-Stunden-Fensters essen. Forschung im New England Journal of Medicine (2019) zeigt, dass intermittierendes Fasten die Stoffwechselgesundheit verbessern, Entzündungen reduzieren und die Zellreparatur durch einen Prozess namens Autophagie fördern kann. Während des Fastens wechselt Ihr Körper von der Verwendung von Glukose als Hauptbrennstoff zum Verbrennen von gespeichertem Fett und tritt typischerweise nach 12-16 Stunden ohne Nahrung in einen Zustand der Ketose ein."
        },
        "howItWorks": {
          "title": "So funktioniert dieser Rechner",
          "content": "Dieser Rechner verwendet die Mifflin-St Jeor Gleichung, um Ihren Grundumsatz (BMR) basierend auf Ihrem Geschlecht, Alter, Gewicht und Größe zu schätzen. Er multipliziert dann Ihren BMR mit einem Aktivitätsfaktor, um Ihren Gesamten Tagesenergieverbrauch (TDEE) zu bestimmen. Basierend auf Ihrem Ziel — Gewicht verlieren, halten oder Körperzusammensetzung — passt er Ihr tägliches Kalorienziel an. Für Gewichtsverlust wendet er ein 20% Kaloriendefizit an; für Körperzusammensetzung ein 10% Defizit mit höherem Protein. Schließlich verteilt er Ihre täglichen Makronährstoffe (Protein, Kohlenhydrate, Fett) auf Ihre gewählte Anzahl von Mahlzeiten innerhalb Ihres Essfensters und gibt Ihnen eine vollständige Aufschlüsselung pro Mahlzeit."
        },
        "benefits": {
          "title": "Wissenschaftlich belegte Vorteile von IF",
          "items": [
            {
              "text": "Fettverbrennung steigt signifikant nach 12+ Stunden Fasten, da der Körper Glykogenspeicher entleert und zur Fettoxidation (Ketose) wechselt",
              "type": "info"
            },
            {
              "text": "Autophagie — zelluläre Reinigung und Reparatur — aktiviert sich während längerer Fastenperioden und entfernt beschädigte Proteine und Organellen",
              "type": "info"
            },
            {
              "text": "Insulinresistenz verbessert sich, wodurch das Risiko für Typ-2-Diabetes reduziert wird. Studien zeigen, dass Fasten das Nüchterninsulin um 20-31% senken kann",
              "type": "info"
            },
            {
              "text": "Wachstumshormon (HGH) Spiegel können während des Fastens um das 5-fache steigen und unterstützen Muskelerhalt und Fettabbau",
              "type": "info"
            },
            {
              "text": "Entzündungsmarker (CRP, IL-6) sinken bei regelmäßigem Fasten, was das Risiko chronischer Krankheiten reduzieren kann",
              "type": "info"
            },
            {
              "text": "Warnung: IF wird nicht für schwangere oder stillende Frauen, Personen mit Essstörungen, Typ-1-Diabetes oder Kinder unter 18 Jahren empfohlen",
              "type": "warning"
            }
          ]
        },
        "methods": {
          "title": "Fastenmethoden erklärt",
          "items": [
            {
              "text": "12:12 — Gleichmäßige Aufteilung zwischen Fasten und Essen. Ideal für Anfänger, da der Nachtschlaf den größten Teil des Fastens abdeckt",
              "type": "info"
            },
            {
              "text": "14:10 — Etwas längeres Fasten. Verzichten Sie auf späte Snacks und verschieben Sie das Frühstück um 1-2 Stunden für einfache Einhaltung",
              "type": "info"
            },
            {
              "text": "16:8 — Die am meisten erforschte und beliebte Methode. Überspringen Sie das Frühstück, essen Sie von 12 bis 20 Uhr. Langfristig nachhaltig",
              "type": "info"
            },
            {
              "text": "18:6 — Fortgeschrittenes Protokoll. Zwei größere Mahlzeiten mit besserer Autophagie-Aktivierung und tieferer Ketose",
              "type": "info"
            },
            {
              "text": "20:4 (Krieger) — Fortgeschrittene Methode mit 4-Stunden-Essfenster. Meist eine Hauptmahlzeit plus kleiner Snack",
              "type": "warning"
            },
            {
              "text": "5:2 — Essen Sie normal 5 Tage pro Woche, beschränken Sie sich auf 500-600 Kalorien an 2 nicht aufeinanderfolgenden Tagen. Flexiblerer Zeitplan",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Berechnungsbeispiele",
          "description": "Schritt-für-Schritt Beispiele, wie Fastenkalorien berechnet werden",
          "examples": [
            {
              "title": "Mann, 30, 82 kg, 178 cm, Mäßige Aktivität, 16:8, Gewicht verlieren",
              "steps": [
                "BMR = 10 × 82kg + 6,25 × 178cm − 5 × 30 + 5 = 1.778 kcal",
                "TDEE = 1.778 × 1,55 (mäßig) = 2.756 kcal",
                "Gewichtsverlust-Ziel = 2.756 × 0,80 = 2.205 kcal/Tag",
                "Protein = 164g (2g pro kg), Fett = 61g (25%), Kohlenhydrate = 208g (Rest)",
                "3 Mahlzeiten → 735 kcal/Mahlzeit (55g Protein, 20g Fett, 69g Kohlenhydrate jeweils)"
              ],
              "result": "Essen Sie 2.205 kcal/Tag von 12 bis 20 Uhr — verlieren Sie ~0,5 kg/Woche"
            },
            {
              "title": "Frau, 28, 64 kg, 165 cm, Leichte Aktivität, 14:10, Halten",
              "steps": [
                "BMR = 10 × 64kg + 6,25 × 165cm − 5 × 28 − 161 = 1.368 kcal",
                "TDEE = 1.368 × 1,375 (leicht) = 1.881 kcal",
                "Erhaltungs-Ziel = 1.881 kcal/Tag (kein Defizit)",
                "Protein = 128g (2g pro kg), Fett = 63g (30%), Kohlenhydrate = 218g",
                "3 Mahlzeiten → 627 kcal/Mahlzeit in einem 10-Stunden-Essfenster"
              ],
              "result": "Essen Sie 1.881 kcal/Tag von 9 bis 19 Uhr — aktuelles Gewicht halten"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Bricht Kaffee mein Fasten?",
          "answer": "Schwarzer Kaffee, purer Tee und Wasser brechen Ihr Fasten nicht. Sie enthalten praktisch null Kalorien und können sogar die Fastenvorteile durch Ankurbelung des Stoffwechsels verstärken. Das Hinzufügen von Sahne, Zucker, Milch oder Süßstoffen kann jedoch eine Insulinreaktion auslösen und technisch gesehen Ihr Fasten brechen. Wenn Sie Geschmack brauchen, ist ein kleiner Spritzer Zitrone im Wasser generell akzeptabel."
        },
        {
          "question": "Welche Fastenmethode ist am besten für Anfänger?",
          "answer": "Die 16:8 Methode ist der beliebteste Startpunkt, weil sie einfach und nachhaltig ist — Sie lassen im Wesentlichen das Frühstück aus und hören nach dem Abendessen auf zu essen. Wenn sich 16 Stunden zu lang anfühlen, beginnen Sie mit 12:12 oder 14:10 für die ersten 1-2 Wochen und verlängern dann allmählich Ihr Fastenfenster. Der Schlüssel ist Beständigkeit, nicht Intensität."
        },
        {
          "question": "Werde ich beim Fasten Muskeln verlieren?",
          "answer": "Nicht, wenn Sie genug Protein essen und Krafttraining machen. Intermittierendes Fasten erhöht tatsächlich die Wachstumshormon (HGH) Spiegel, was beim Muskelerhalt hilft. Streben Sie 1,6-2g Protein pro kg Körpergewicht an, priorisieren Sie proteinreiche Lebensmittel beim Fastenbrechen und behalten Sie Ihr Krafttraining bei. Die meisten Forschungen zeigen, dass IF magere Masse besser erhält als kontinuierliche Kalorienbeschränkung."
        },
        {
          "question": "Können Frauen intermittierendes Fasten sicher praktizieren?",
          "answer": "Ja, aber Frauen benötigen möglicherweise einen sanfteren Ansatz. Einige Forschungen legen nahe, dass längeres Fasten (18+ Stunden) weibliche Hormone beeinflussen kann, besonders wenn Sie bereits schlank sind oder unter Stress stehen. Frauen wird oft geraten, mit 14:10 oder 16:8 zu beginnen und anfangs nicht an aufeinanderfolgenden Tagen zu fasten. Schwangere oder stillende Frauen sollten IF nicht praktizieren. Bei Menstruationsunregelmäßigkeiten reduzieren Sie Ihr Fastenfenster."
        },
        {
          "question": "Wie lange dauert es, bis Ergebnisse vom intermittierenden Fasten sichtbar werden?",
          "answer": "Die meisten Menschen bemerken erste Veränderungen innerhalb von 2-4 Wochen, einschließlich reduzierter Blähungen und verbesserter Energie. Signifikanter Fettabbau wird typischerweise nach 4-8 Wochen bei konsistentem Fasten und angemessener Kalorienaufnahme sichtbar. Der Gewichtsverlust beträgt durchschnittlich 0,25-1 kg pro Woche je nach Ihrem Kaloriendefizit. Die Stoffwechselvorteile wie verbesserte Insulinresistenz können innerhalb von 2-3 Wochen gemessen werden."
        },
        {
          "question": "Sollte ich während des Fastens trainieren?",
          "answer": "Ja, mäßiges Training während des Fastens ist sicher und kann die Fettverbrennung verstärken. Leichtes Cardio, Yoga und mäßiges Krafttraining funktionieren gut im nüchternen Zustand. Für intensive Workouts erwägen Sie, sie gegen Ende Ihres Fastens oder innerhalb Ihres Essfensters zu planen für bessere Leistung. Hören Sie immer auf Ihren Körper — wenn Sie sich schwindelig oder schwach fühlen, essen Sie etwas und passen Sie Ihren Zeitplan an."
        },
        {
          "question": "Was sollte ich essen, um mein Fasten zu brechen?",
          "answer": "Brechen Sie Ihr Fasten mit leicht verdaulichen, nährstoffreichen Lebensmitteln. Beginnen Sie mit Protein (Eier, Hähnchen, Fisch, griechischer Joghurt) und gesunden Fetten (Avocado, Nüsse, Olivenöl), dann fügen Sie komplexe Kohlenhydrate hinzu. Vermeiden Sie es, Ihr Fasten mit zuckrigen Lebensmitteln, verarbeiteten Kohlenhydraten oder großen Portionen zu brechen — das kann Verdauungsbeschwerden und Blutzuckerspitzen verursachen. Eine ausgewogene Mahlzeit mit 30-40g Protein ist ideal."
        },
        {
          "question": "Ist die 5:2 Methode effektiv für Gewichtsverlust?",
          "answer": "Ja, die 5:2 Methode ist effektiv und kann für Menschen einfacher sein, die lieber nicht täglich fasten. An eingeschränkten Tagen essen Sie 500-600 Kalorien (typischerweise als eine oder zwei kleine Mahlzeiten). Forschung der University of Illinois zeigt ähnliche Gewichtsverlustergebnisse zwischen 5:2 und täglicher Kalorienbeschränkung. Der Vorteil ist psychologisch — zu wissen, dass Sie an den meisten Tagen normal essen können, verbessert die Einhaltung."
        }
      ],
      "chart": {
        "title": "Makro-Verteilung pro Mahlzeit",
        "xLabel": "Mahlzeit",
        "yLabel": "Gramm",
        "series": {
          "protein": "Protein",
          "carbs": "Kohlenhydrate",
          "fat": "Fett"
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
      }
    },
  },

  // ─── INPUTS ─────────────────────────────────────────────────────────────────
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
      max: 80,
      suffix: "years",
    },
    {
      id: "weight",
      type: "number",
      defaultValue: null,
      placeholder: "180",
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
      id: "fastingMethod",
      type: "select",
      defaultValue: "16_8",
      options: [
        { value: "12_12" },
        { value: "14_10" },
        { value: "16_8" },
        { value: "18_6" },
        { value: "20_4" },
        { value: "23_1" },
        { value: "5_2" },
      ],
    },
    {
      id: "goal",
      type: "radio",
      defaultValue: "lose",
      options: [{ value: "lose" }, { value: "maintain" }, { value: "recomp" }],
    },
    {
      id: "mealsPerDay",
      type: "select",
      defaultValue: "3",
      options: [{ value: "2" }, { value: "3" }, { value: "4" }],
    },
    {
      id: "firstMealTime",
      type: "select",
      defaultValue: "12",
      options: [
        { value: "7" },
        { value: "8" },
        { value: "9" },
        { value: "10" },
        { value: "11" },
        { value: "12" },
        { value: "13" },
        { value: "14" },
      ],
    },
  ],

  inputGroups: [],

  // ─── RESULTS ────────────────────────────────────────────────────────────────
  results: [
    { id: "dailyCalories", type: "primary", format: "number" },
    { id: "bmr", type: "secondary", format: "number" },
    { id: "tdee", type: "secondary", format: "number" },
    { id: "eatingWindow", type: "secondary", format: "text" },
    { id: "fastingHours", type: "secondary", format: "text" },
    { id: "protein", type: "secondary", format: "text" },
    { id: "carbs", type: "secondary", format: "text" },
    { id: "fat", type: "secondary", format: "text" },
    { id: "caloriesPerMeal", type: "secondary", format: "number" },
    { id: "estimatedWeeklyLoss", type: "secondary", format: "text" },
  ],

  // ─── INFOCARDS ──────────────────────────────────────────────────────────────
  infoCards: [
    { id: "nutrition", type: "list", icon: "🍽️", itemCount: 4 },
    { id: "schedule", type: "list", icon: "⏰", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ─── CHART ──────────────────────────────────────────────────────────────────
  chart: {
    id: "mealMacros",
    type: "bar",
    xKey: "meal",
    stacked: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "number",
    series: [
      { key: "protein", color: "#3b82f6", stackId: "macros" },
      { key: "carbs", color: "#22c55e", stackId: "macros" },
      { key: "fat", color: "#f97316", stackId: "macros" },
    ],
  },

  // ─── DETAILED TABLE ─────────────────────────────────────────────────────────
  detailedTable: {
    id: "methodComparison",
    buttonLabel: "View All Fasting Methods",
    buttonIcon: "📊",
    modalTitle: "Fasting Method Comparison",
    columns: [
      { id: "method", label: "Method", align: "left" },
      { id: "fastHours", label: "Fast", align: "center" },
      { id: "eatHours", label: "Eat", align: "center" },
      { id: "difficulty", label: "Difficulty", align: "center" },
      { id: "bestFor", label: "Best For", align: "left" },
      { id: "schedule", label: "Example Schedule", align: "left", highlight: true },
    ],
  },

  referenceData: [],

  // ─── EDUCATION ──────────────────────────────────────────────────────────────
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "benefits", type: "list", icon: "✅", itemCount: 6 },
    { id: "methods", type: "list", icon: "📋", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  // ─── FAQS ───────────────────────────────────────────────────────────────────
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

  // ─── REFERENCES ─────────────────────────────────────────────────────────────
  references: [
    {
      authors: "de Cabo R, Mattson MP",
      year: "2019",
      title: "Effects of Intermittent Fasting on Health, Aging, and Disease",
      source: "New England Journal of Medicine",
      url: "https://www.nejm.org/doi/full/10.1056/NEJMra1905136",
    },
    {
      authors: "Varady KA, Cienfuegos S, Ezpeleta M, Gabel K",
      year: "2022",
      title: "Clinical application of intermittent fasting for weight loss",
      source: "Annual Review of Nutrition",
      url: "https://pubmed.ncbi.nlm.nih.gov/35584800/",
    },
  ],

  hero: { badge: "Popular" },
  sidebar: {},
  features: {},
  relatedCalculators: [
    "calorie",
    "macro",
    "protein",
    "bmi",
    "caloric-deficit",
    "ideal-weight",
  ],
  ads: {},
};

// ─── CALCULATE ────────────────────────────────────────────────────────────────
export function calculateIntermittentFasting(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read inputs ──
  const gender = (values.gender as string) || "male";
  const age = (values.age as number) || 30;
  const activityLevel = (values.activityLevel as string) || "moderate";
  const fastingMethod = (values.fastingMethod as string) || "16_8";
  const goal = (values.goal as string) || "lose";
  const mealsPerDay = parseInt((values.mealsPerDay as string) || "3", 10);
  const firstMealHour = parseInt((values.firstMealTime as string) || "12", 10);

  // ── Convert units to base (weight → kg, height → cm) ──
  const rawWeight = values.weight as number | null;
  const rawHeight = values.height as number | null;

  if (rawWeight === null || rawWeight === undefined || rawHeight === null || rawHeight === undefined) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const weightKg = convertToBase(rawWeight, fieldUnits.weight || "lbs", "weight");
  const heightCm = convertToBase(rawHeight, fieldUnits.height || "ft_in", "height");

  if (weightKg <= 0 || heightCm <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Calculate BMR (Mifflin-St Jeor) ──
  let bmr: number;
  if (gender === "male") {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }
  bmr = Math.round(bmr);

  // ── Calculate TDEE ──
  const ACTIVITY_MULTIPLIERS: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };
  const activityMultiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.55;
  const tdee = Math.round(bmr * activityMultiplier);

  // ── Apply goal adjustment ──
  let dailyCalories: number;
  let goalMultiplier: number;
  switch (goal) {
    case "lose":
      goalMultiplier = 0.80; // 20% deficit
      break;
    case "recomp":
      goalMultiplier = 0.90; // 10% deficit
      break;
    default: // maintain
      goalMultiplier = 1.0;
  }
  dailyCalories = Math.round(tdee * goalMultiplier);

  // ── Fasting method config ──
  const METHODS: Record<string, { fastH: number; eatH: number }> = {
    "12_12": { fastH: 12, eatH: 12 },
    "14_10": { fastH: 14, eatH: 10 },
    "16_8": { fastH: 16, eatH: 8 },
    "18_6": { fastH: 18, eatH: 6 },
    "20_4": { fastH: 20, eatH: 4 },
    "23_1": { fastH: 23, eatH: 1 },
    "5_2": { fastH: 0, eatH: 24 },
  };
  const method = METHODS[fastingMethod] || METHODS["16_8"];

  // ── For 5:2, calculate restricted day calories ──
  let restrictedDayCal = 0;
  let effectiveDailyCal = dailyCalories;
  if (fastingMethod === "5_2") {
    restrictedDayCal = gender === "male" ? 600 : 500;
    // Weekly average: (5 × dailyCal + 2 × restrictedCal) / 7
    effectiveDailyCal = Math.round((5 * dailyCalories + 2 * restrictedDayCal) / 7);
  }

  // ── Calculate eating/fasting window times ──
  const eatStart = firstMealHour;
  const eatEnd = fastingMethod === "5_2" ? 24 : (firstMealHour + method.eatH) % 24;

  // ── Macros ──
  const weightLbs = weightKg * 2.20462;

  // Protein: based on goal
  let proteinPerLb: number;
  switch (goal) {
    case "lose":
      proteinPerLb = 1.0;
      break;
    case "recomp":
      proteinPerLb = 1.2;
      break;
    default:
      proteinPerLb = 0.8;
  }
  const proteinG = Math.round(weightLbs * proteinPerLb);
  const proteinCal = proteinG * 4;

  // Fat: 25% for deficit, 30% for maintain/recomp
  const fatPercent = goal === "lose" ? 0.25 : 0.30;
  const fatCal = Math.round(dailyCalories * fatPercent);
  const fatG = Math.round(fatCal / 9);

  // Carbs: remaining
  const carbsCal = Math.max(0, dailyCalories - proteinCal - fatCal);
  const carbsG = Math.round(carbsCal / 4);

  // ── Per-meal breakdown ──
  const effectiveMeals = fastingMethod === "23_1" ? 1 : mealsPerDay;
  const calPerMeal = Math.round(dailyCalories / effectiveMeals);
  const proteinPerMeal = Math.round(proteinG / effectiveMeals);
  const carbsPerMeal = Math.round(carbsG / effectiveMeals);
  const fatPerMeal = Math.round(fatG / effectiveMeals);

  // ── Estimated weekly weight change ──
  const dailyDeficit = tdee - dailyCalories;
  const weeklyDeficit = fastingMethod === "5_2"
    ? (5 * (tdee - dailyCalories) + 2 * (tdee - restrictedDayCal))
    : dailyDeficit * 7;
  const weeklyLossLbs = Math.abs(weeklyDeficit / 3500);
  const weeklyLossKg = weeklyLossLbs * 0.453592;

  // ── Format time helper ──
  function fmtTime(hour24: number): string {
    const amPm = v["am"] || "AM";
    const pmPm = v["pm"] || "PM";
    if (hour24 === 0 || hour24 === 24) return `12:00 ${amPm}`;
    if (hour24 === 12) return `12:00 ${pmPm}`;
    if (hour24 < 12) return `${hour24}:00 ${amPm}`;
    return `${hour24 - 12}:00 ${pmPm}`;
  }

  // ── Format results ──
  const calUnit = v["kcal"] || "kcal";
  const gUnit = v["g"] || "g";
  const toWord = v["to"] || "to";

  const eatingWindowStr = fastingMethod === "5_2"
    ? `5 ${v["normalDays"] || "normal days"} + 2 ${v["restrictedDays"] || "restricted days"}`
    : `${fmtTime(eatStart)} ${toWord} ${fmtTime(eatEnd)}`;

  const fastingHoursStr = fastingMethod === "5_2"
    ? `${restrictedDayCal} ${calUnit} ${v["restrictedDays"] || "restricted days"}`
    : `${method.fastH} ${v["hours"] || "hours"}`;

  let weeklyChangeStr: string;
  if (dailyDeficit > 0) {
    weeklyChangeStr = `-${weeklyLossLbs.toFixed(1)} ${v["lbs/week"] || "lbs/week"}`;
  } else if (dailyDeficit < 0) {
    weeklyChangeStr = `+${weeklyLossLbs.toFixed(1)} ${v["lbs/week"] || "lbs/week"}`;
  } else {
    weeklyChangeStr = "0";
  }

  // ── Chart data: per-meal macro distribution ──
  const chartData: Array<Record<string, unknown>> = [];
  for (let i = 1; i <= effectiveMeals; i++) {
    chartData.push({
      meal: `${v["meal"] || "Meal"} ${i}`,
      protein: proteinPerMeal,
      carbs: carbsPerMeal,
      fat: fatPerMeal,
    });
  }

  // ── DetailedTable: method comparison ──
  const tableData = [
    { method: "12:12", fastHours: "12h", eatHours: "12h", difficulty: "⭐", bestFor: "Beginners, first-timers", schedule: "7 AM – 7 PM eating" },
    { method: "14:10", fastHours: "14h", eatHours: "10h", difficulty: "⭐⭐", bestFor: "Easy transition, women", schedule: "9 AM – 7 PM eating" },
    { method: "16:8", fastHours: "16h", eatHours: "8h", difficulty: "⭐⭐", bestFor: "Most people, weight loss", schedule: "12 PM – 8 PM eating" },
    { method: "18:6", fastHours: "18h", eatHours: "6h", difficulty: "⭐⭐⭐", bestFor: "Faster results, experienced", schedule: "12 PM – 6 PM eating" },
    { method: "20:4", fastHours: "20h", eatHours: "4h", difficulty: "⭐⭐⭐⭐", bestFor: "Advanced, deep ketosis", schedule: "2 PM – 6 PM eating" },
    { method: "OMAD (23:1)", fastHours: "23h", eatHours: "1h", difficulty: "⭐⭐⭐⭐⭐", bestFor: "Maximum autophagy, experts", schedule: "One meal at 6 PM" },
    { method: "5:2", fastHours: "2 days", eatHours: "5 days", difficulty: "⭐⭐⭐", bestFor: "Flexible schedule, variety", schedule: "Normal M-F, restrict Tu/Th" },
  ];

  // ── Build method label for summary ──
  const methodLabel = fastingMethod === "5_2" ? "5:2" : fastingMethod.replace("_", ":");

  const summary = f.summary
    ? f.summary
        .replace("{calories}", dailyCalories.toLocaleString())
        .replace("{eatingHours}", String(method.eatH))
        .replace("{method}", methodLabel)
        .replace("{protein}", String(proteinG))
        .replace("{carbs}", String(carbsG))
        .replace("{fat}", String(fatG))
    : `Eat ${dailyCalories.toLocaleString()} cal/day (${methodLabel}). ${proteinG}g protein, ${carbsG}g carbs, ${fatG}g fat.`;

  return {
    values: {
      dailyCalories,
      bmr,
      tdee,
      eatingWindow: eatingWindowStr,
      fastingHours: fastingHoursStr,
      protein: proteinG,
      carbs: carbsG,
      fat: fatG,
      caloriesPerMeal: calPerMeal,
      estimatedWeeklyLoss: weeklyChangeStr,
    },
    formatted: {
      dailyCalories: `${dailyCalories.toLocaleString()} ${calUnit}`,
      bmr: `${bmr.toLocaleString()} ${calUnit}`,
      tdee: `${tdee.toLocaleString()} ${calUnit}`,
      eatingWindow: eatingWindowStr,
      fastingHours: fastingHoursStr,
      protein: `${proteinG} ${gUnit}`,
      carbs: `${carbsG} ${gUnit}`,
      fat: `${fatG} ${gUnit}`,
      caloriesPerMeal: `${calPerMeal.toLocaleString()} ${calUnit}`,
      estimatedWeeklyLoss: weeklyChangeStr,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default intermittentFastingConfig;
