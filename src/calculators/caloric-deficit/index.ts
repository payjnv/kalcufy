import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

/* ─────────────────────────── helpers ─────────────────────────── */
function fmtNum(v: number): string {
  if (v === 0) return "0";
  if (v < 0.001) return v.toExponential(2);
  if (v < 1000)
    return v
      .toFixed(1)
      .replace(/\.0$/, "");
  return v.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

/* ═══════════════════════════ CONFIG ═══════════════════════════ */
export const caloricDeficitCalculatorConfig: CalculatorConfigV4 = {
  id: "caloric-deficit-calculator",
  version: "4.0",
  category: "health",
  icon: "🔥",

  /* ── presets ── */
  presets: [
    {
      id: "mildLoss",
      icon: "🟢",
      values: {
        gender: "male",
        age: 30,
        weight: 90.7, // 200 lbs in kg (base)
        height: 178,  // 5'10" in cm (base)
        activityLevel: "moderate",
        formula: "mifflin",
        bodyFatPercent: null,
        goalWeight: 81.6, // 180 lbs in kg (base)
        deficitLevel: "mild",
      },
    },
    {
      id: "moderateLoss",
      icon: "🔶",
      values: {
        gender: "female",
        age: 35,
        weight: 74.8, // 165 lbs in kg
        height: 165,  // 5'5" in cm
        activityLevel: "light",
        formula: "mifflin",
        bodyFatPercent: null,
        goalWeight: 63.5, // 140 lbs in kg
        deficitLevel: "moderate",
      },
    },
    {
      id: "aggressiveCut",
      icon: "🔴",
      values: {
        gender: "male",
        age: 28,
        weight: 99.8, // 220 lbs in kg
        height: 183,  // 6'0" in cm
        activityLevel: "active",
        formula: "mifflin",
        bodyFatPercent: 22,
        goalWeight: 83.9, // 185 lbs in kg
        deficitLevel: "aggressive",
      },
    },
  ],

  /* ── translations (EN only) ── */
  t: {
    en: {
      name: "Caloric Deficit Calculator",
      slug: "caloric-deficit-calculator",
      subtitle:
        "Calculate your ideal calorie deficit and see how long it takes to reach your goal weight with a personalized plan.",
      breadcrumb: "Caloric Deficit",

      seo: {
        title: "Caloric Deficit Calculator - Free Weight Loss Planner",
        description:
          "Calculate your daily calorie deficit for safe weight loss. See your BMR, TDEE, macros, and a week-by-week projection to reach your goal weight.",
        shortDescription:
          "Find your ideal calorie deficit and weight loss timeline.",
        keywords: [
          "calorie deficit calculator",
          "caloric deficit calculator",
          "weight loss calculator",
          "how many calories to lose weight",
          "TDEE calculator",
          "calorie deficit to lose weight",
          "free calorie deficit calculator",
          "BMR calculator weight loss",
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
          helpText: "Biological sex affects metabolic rate",
          options: { male: "Male", female: "Female" },
        },
        age: {
          label: "Age",
          helpText: "Metabolism slows with age",
        },
        weight: {
          label: "Current Weight",
          helpText: "Your current body weight",
        },
        height: {
          label: "Height",
          helpText: "Your height",
        },
        activityLevel: {
          label: "Activity Level",
          helpText: "Typical weekly exercise routine",
          options: {
            sedentary: "Sedentary (little or no exercise)",
            light: "Light (1–3 days/week)",
            moderate: "Moderate (3–5 days/week)",
            active: "Active (6–7 days/week)",
            veryActive: "Very Active (intense daily + physical job)",
          },
        },
        formula: {
          label: "BMR Formula",
          helpText: "Mifflin-St Jeor is most accurate for most people",
          options: {
            mifflin: "Mifflin-St Jeor (recommended)",
            harris: "Revised Harris-Benedict",
            katch: "Katch-McArdle (needs body fat %)",
          },
        },
        bodyFatPercent: {
          label: "Body Fat %",
          helpText: "Required for Katch-McArdle formula — estimate if unsure",
        },
        goalWeight: {
          label: "Goal Weight",
          helpText: "Your target weight",
        },
        deficitLevel: {
          label: "Deficit Level",
          helpText:
            "Higher deficits = faster loss but harder to sustain and higher muscle-loss risk",
          options: {
            mild: "Mild — 10% (safest, slow)",
            moderate: "Moderate — 20% (recommended)",
            aggressive: "Aggressive — 25% (challenging)",
            extreme: "Extreme — 30% (not recommended long-term)",
          },
        },
      },

      results: {
        bmr: { label: "Basal Metabolic Rate (BMR)" },
        tdee: { label: "Maintenance Calories (TDEE)" },
        targetCalories: { label: "Daily Calorie Target" },
        dailyDeficit: { label: "Daily Deficit" },
        weeklyLoss: { label: "Est. Weekly Weight Loss" },
        weeksToGoal: { label: "Est. Time to Goal" },
      },

      presets: {
        mildLoss: {
          label: "Mild Weight Loss",
          description: "10% deficit — slow and sustainable",
        },
        moderateLoss: {
          label: "Moderate Loss",
          description: "20% deficit — balanced approach",
        },
        aggressiveCut: {
          label: "Aggressive Cut",
          description: "25% deficit — faster but challenging",
        },
      },

      values: {
        cal: "cal",
        "cal/day": "cal/day",
        "lbs/week": "lbs/week",
        "kg/week": "kg/week",
        weeks: "weeks",
        week: "week",
        g: "g",
        protein: "Protein",
        carbs: "Carbs",
        fat: "Fat",
        deficit: "deficit",
      },

      formats: {
        summary:
          "Eat {targetCalories} cal/day ({dailyDeficit} cal deficit) to reach your goal in ~{weeksToGoal} weeks.",
      },

      infoCards: {
        macros: {
          title: "📊 Macro Breakdown",
          items: [
            { label: "Protein", valueKey: "proteinG" },
            { label: "Carbohydrates", valueKey: "carbsG" },
            { label: "Fat", valueKey: "fatG" },
            { label: "Protein Calories", valueKey: "proteinCal" },
          ],
        },
        plan: {
          title: "🎯 Your Plan",
          items: [
            { label: "Maintenance (TDEE)", valueKey: "tdee" },
            { label: "Daily Target", valueKey: "targetCalories" },
            { label: "Daily Deficit", valueKey: "dailyDeficit" },
            { label: "Goal Weight", valueKey: "goalWeightFormatted" },
          ],
        },
        tips: {
          title: "💡 Tips",
          items: [
            "Never eat below 1,200 cal/day (women) or 1,500 cal/day (men) without medical supervision.",
            "High-protein diets (1 g per lb of goal weight) help preserve muscle while losing fat.",
            "Weigh yourself at the same time daily and track the weekly average — daily weight fluctuates.",
            "Re-calculate every 10 lbs lost — your TDEE drops as you get lighter.",
          ],
        },
      },

      detailedTable: {
        deficitOptions: {
          button: "View All Deficit Options",
          title: "Calorie Deficit Comparison",
          columns: {
            deficitPct: "Deficit %",
            dailyCal: "Daily Calories",
            dailyDeficit: "Daily Deficit",
            weeklyLoss: "Weekly Loss",
            weeksToGoal: "Weeks to Goal",
            rating: "Sustainability",
          },
        },
      },

      education: {
        whatIs: {
          title: "What Is a Caloric Deficit?",
          content:
            "A caloric deficit occurs when you consume fewer calories than your body burns. Your body needs energy (measured in calories) for basic functions like breathing, circulation, and digestion — this is your Basal Metabolic Rate (BMR). When you add daily activity and exercise, you get your Total Daily Energy Expenditure (TDEE). Eating below your TDEE forces your body to tap into stored energy (primarily body fat), resulting in weight loss over time. A deficit of about 500 calories per day typically produces ~1 lb of fat loss per week, though individual results vary based on metabolism, body composition, and hormonal factors.",
        },
        howItWorks: {
          title: "How This Calculator Works",
          content:
            "This calculator first estimates your BMR using one of three scientifically validated formulas: the Mifflin-St Jeor equation (most accurate for the general population), the Revised Harris-Benedict equation, or the Katch-McArdle formula (best if you know your body fat percentage). It then multiplies your BMR by an activity factor to determine your TDEE — the total calories you burn daily. From there, it applies your chosen deficit percentage to calculate a daily calorie target. The tool also projects your week-by-week weight loss trajectory, estimates your macronutrient needs (protein, carbs, fat), and shows how different deficit levels compare so you can pick the plan that fits your lifestyle.",
        },
        considerations: {
          title: "Important Considerations",
          items: [
            {
              text: "The 3,500-calorie rule (1 lb = 3,500 cal) is a rough estimate. Real weight loss is non-linear because your metabolism adapts as you lose weight.",
              type: "warning",
            },
            {
              text: "Protein intake of 0.7–1 g per pound of goal weight helps preserve lean muscle mass during a deficit.",
              type: "info",
            },
            {
              text: "Very aggressive deficits (>25%) can slow metabolism, cause muscle loss, and lead to binge eating. A moderate 20% deficit is the sweet spot for most people.",
              type: "warning",
            },
            {
              text: "Strength training 2–4× per week during a cut is critical for maintaining muscle mass and keeping metabolic rate high.",
              type: "info",
            },
            {
              text: "Weight loss plateaus are normal. Your body adapts after 8–12 weeks — consider a diet break or refeed week.",
              type: "info",
            },
            {
              text: "Consult a healthcare provider before starting any calorie-restricted diet, especially if you have medical conditions.",
              type: "warning",
            },
          ],
        },
        categories: {
          title: "Deficit Levels Explained",
          items: [
            {
              text: "Mild (10%): Lose ~0.5 lb/week. Best for those close to goal weight or with low body fat. Very sustainable long-term.",
              type: "info",
            },
            {
              text: "Moderate (20%): Lose ~1 lb/week. The gold standard recommended by most nutritionists. Balances speed with sustainability.",
              type: "info",
            },
            {
              text: "Aggressive (25%): Lose ~1.5 lb/week. Suitable for those with significant weight to lose and high discipline. May cause fatigue.",
              type: "warning",
            },
            {
              text: "Extreme (30%): Lose ~2 lb/week. Not recommended for more than 4–6 weeks. High risk of muscle loss and metabolic adaptation.",
              type: "warning",
            },
            {
              text: "Never go below 1,200 cal/day (women) or 1,500 cal/day (men) regardless of deficit percentage.",
              type: "warning",
            },
            {
              text: "Active individuals burn more calories and can often sustain higher deficits without losing muscle.",
              type: "info",
            },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step examples using the Mifflin-St Jeor equation",
          examples: [
            {
              title: "30-year-old Male, 200 lbs, 5'10\", Moderate Activity",
              steps: [
                "BMR = (10 × 90.7 kg) + (6.25 × 178 cm) − (5 × 30) + 5 = 907 + 1,112.5 − 150 + 5 = 1,875 cal",
                "TDEE = 1,875 × 1.55 (moderate) = 2,906 cal/day",
                "20% deficit = 2,906 × 0.80 = 2,325 cal/day",
                "Daily deficit = 2,906 − 2,325 = 581 cal",
                "Weekly loss ≈ 581 × 7 / 3,500 = ~1.2 lbs/week",
              ],
              result:
                "Eat 2,325 cal/day to lose ~1.2 lbs/week. At 20 lbs to lose → ~17 weeks to goal.",
            },
            {
              title: "35-year-old Female, 165 lbs, 5'5\", Light Activity",
              steps: [
                "BMR = (10 × 74.8 kg) + (6.25 × 165 cm) − (5 × 35) − 161 = 748 + 1,031.3 − 175 − 161 = 1,443 cal",
                "TDEE = 1,443 × 1.375 (light) = 1,984 cal/day",
                "20% deficit = 1,984 × 0.80 = 1,587 cal/day",
                "Daily deficit = 1,984 − 1,587 = 397 cal",
                "Weekly loss ≈ 397 × 7 / 3,500 = ~0.8 lbs/week",
              ],
              result:
                "Eat 1,587 cal/day to lose ~0.8 lbs/week. At 25 lbs to lose → ~31 weeks to goal.",
            },
          ],
        },
      },

      faqs: [
        {
          question: "What is a safe calorie deficit for weight loss?",
          answer:
            "Most experts recommend a deficit of 300–500 calories per day, which translates to roughly 0.5–1 lb of fat loss per week. A 20% deficit from your TDEE is the most commonly recommended approach because it balances speed with sustainability. Never go below 1,200 calories/day for women or 1,500 calories/day for men without medical supervision.",
        },
        {
          question: "Which BMR formula should I use?",
          answer:
            "The Mifflin-St Jeor equation is the most accurate for the general population and is recommended by the Academy of Nutrition and Dietetics. If you know your body fat percentage, the Katch-McArdle formula can be more precise because it accounts for lean body mass. The Revised Harris-Benedict equation is a well-established alternative.",
        },
        {
          question: "Why is my weight loss slower than the calculator predicts?",
          answer:
            "Weight loss is non-linear. Your metabolism adapts to lower calorie intake (adaptive thermogenesis), water retention fluctuates, and muscle gain from exercise can mask fat loss on the scale. The 3,500-calorie rule is an approximation. Track weekly averages rather than daily weigh-ins, and re-calculate your TDEE every 10 lbs lost.",
        },
        {
          question: "How much protein should I eat while in a deficit?",
          answer:
            "Research suggests 0.7–1 gram of protein per pound of goal body weight to preserve muscle mass during a deficit. For a 180 lb goal weight, that's 126–180 g of protein per day. Higher protein intake also increases satiety, helping you feel fuller on fewer calories.",
        },
        {
          question: "Can I lose weight without exercise?",
          answer:
            "Yes — weight loss is primarily driven by a calorie deficit, which can be achieved through diet alone. However, exercise (especially strength training) helps preserve muscle mass, boosts metabolic rate, improves mood, and leads to better body composition. A combination of diet and exercise produces the best long-term results.",
        },
        {
          question: "What happens if I eat too few calories?",
          answer:
            "Eating too few calories can cause fatigue, nutrient deficiencies, muscle loss, hormonal disruption, and metabolic slowdown. Very low calorie diets (<1,200 cal for women, <1,500 for men) can trigger binge eating cycles and actually make long-term weight loss harder. A moderate deficit with nutrient-dense foods is far more effective and sustainable.",
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
      accessibility: {
        mobileResults: "Results",
        closeModal: "Close",
        openMenu: "Menu",
      },
      sources: { title: "Sources & References" },

      chart: {
        title: "Weight Loss Projection",
        xLabel: "Week",
        yLabel: "Weight",
        series: {
          weight: "Projected Weight",
          goalWeight: "Goal Weight",
        },
      },
    },
    es: {
      "name": "Calculadora de Déficit Calórico",
      "slug": "calculadora-deficit-calorico",
      "subtitle": "Calcula tu déficit calórico ideal y ve cuánto tiempo toma alcanzar tu peso objetivo con un plan personalizado.",
      "breadcrumb": "Déficit Calórico",
      "seo": {
        "title": "Calculadora de Déficit Calórico - Planificador de Pérdida de Peso Gratis",
        "description": "Calcula tu déficit calórico diario para una pérdida de peso segura. Ve tu TMB, GET, macros y una proyección semana a semana para alcanzar tu peso objetivo.",
        "shortDescription": "Encuentra tu déficit calórico ideal y cronograma de pérdida de peso.",
        "keywords": [
          "calculadora déficit calórico",
          "calculadora déficit de calorías",
          "calculadora pérdida de peso",
          "cuántas calorías para perder peso",
          "calculadora GET",
          "déficit calórico para perder peso",
          "calculadora déficit calórico gratis",
          "calculadora TMB pérdida de peso"
        ]
      },
      "inputs": {
        "gender": {
          "label": "Género",
          "helpText": "El sexo biológico afecta la tasa metabólica",
          "options": {
            "male": "Masculino",
            "female": "Femenino"
          }
        },
        "age": {
          "label": "Edad",
          "helpText": "El metabolismo disminuye con la edad"
        },
        "weight": {
          "label": "Peso Actual",
          "helpText": "Tu peso corporal actual"
        },
        "height": {
          "label": "Estatura",
          "helpText": "Tu estatura"
        },
        "activityLevel": {
          "label": "Nivel de Actividad",
          "helpText": "Rutina de ejercicio semanal típica",
          "options": {
            "sedentary": "Sedentario (poco o ningún ejercicio)",
            "light": "Ligero (1–3 días/semana)",
            "moderate": "Moderado (3–5 días/semana)",
            "active": "Activo (6–7 días/semana)",
            "veryActive": "Muy Activo (intenso diario + trabajo físico)"
          }
        },
        "formula": {
          "label": "Fórmula TMB",
          "helpText": "Mifflin-St Jeor es la más precisa para la mayoría de las personas",
          "options": {
            "mifflin": "Mifflin-St Jeor (recomendada)",
            "harris": "Harris-Benedict Revisada",
            "katch": "Katch-McArdle (requiere % de grasa corporal)"
          }
        },
        "bodyFatPercent": {
          "label": "% Grasa Corporal",
          "helpText": "Requerido para la fórmula Katch-McArdle — estima si no estás seguro"
        },
        "goalWeight": {
          "label": "Peso Objetivo",
          "helpText": "Tu peso meta"
        },
        "deficitLevel": {
          "label": "Nivel de Déficit",
          "helpText": "Déficits mayores = pérdida más rápida pero más difícil de mantener y mayor riesgo de pérdida muscular",
          "options": {
            "mild": "Suave — 10% (más seguro, lento)",
            "moderate": "Moderado — 20% (recomendado)",
            "aggressive": "Agresivo — 25% (desafiante)",
            "extreme": "Extremo — 30% (no recomendado a largo plazo)"
          }
        }
      },
      "results": {
        "bmr": {
          "label": "Tasa Metabólica Basal (TMB)"
        },
        "tdee": {
          "label": "Calorías de Mantenimiento (GET)"
        },
        "targetCalories": {
          "label": "Objetivo Calórico Diario"
        },
        "dailyDeficit": {
          "label": "Déficit Diario"
        },
        "weeklyLoss": {
          "label": "Pérdida Semanal Estimada"
        },
        "weeksToGoal": {
          "label": "Tiempo Estimado al Objetivo"
        }
      },
      "presets": {
        "mildLoss": {
          "label": "Pérdida de Peso Suave",
          "description": "10% déficit — lento y sostenible"
        },
        "moderateLoss": {
          "label": "Pérdida Moderada",
          "description": "20% déficit — enfoque equilibrado"
        },
        "aggressiveCut": {
          "label": "Corte Agresivo",
          "description": "25% déficit — más rápido pero desafiante"
        }
      },
      "values": {
        "cal": "cal",
        "cal/day": "cal/día",
        "lbs/week": "lbs/semana",
        "kg/week": "kg/semana",
        "weeks": "semanas",
        "week": "semana",
        "g": "g",
        "protein": "Proteína",
        "carbs": "Carbohidratos",
        "fat": "Grasa",
        "deficit": "déficit"
      },
      "formats": {
        "summary": "Come {targetCalories} cal/día ({dailyDeficit} cal de déficit) para alcanzar tu objetivo en ~{weeksToGoal} semanas."
      },
      "infoCards": {
        "macros": {
          "title": "📊 Desglose de Macros",
          "items": [
            {
              "label": "Proteína",
              "valueKey": "proteinG"
            },
            {
              "label": "Carbohidratos",
              "valueKey": "carbsG"
            },
            {
              "label": "Grasa",
              "valueKey": "fatG"
            },
            {
              "label": "Calorías de Proteína",
              "valueKey": "proteinCal"
            }
          ]
        },
        "plan": {
          "title": "🎯 Tu Plan",
          "items": [
            {
              "label": "Mantenimiento (GET)",
              "valueKey": "tdee"
            },
            {
              "label": "Objetivo Diario",
              "valueKey": "targetCalories"
            },
            {
              "label": "Déficit Diario",
              "valueKey": "dailyDeficit"
            },
            {
              "label": "Peso Objetivo",
              "valueKey": "goalWeightFormatted"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos",
          "items": [
            "Nunca comas menos de 1,200 cal/día (mujeres) o 1,500 cal/día (hombres) sin supervisión médica.",
            "Las dietas altas en proteína (1 g por libra de peso objetivo) ayudan a preservar músculo mientras pierdes grasa.",
            "Pésate a la misma hora diariamente y rastrea el promedio semanal — el peso diario fluctúa.",
            "Recalcula cada 10 libras perdidas — tu GET baja cuando pesas menos."
          ]
        }
      },
      "detailedTable": {
        "deficitOptions": {
          "button": "Ver Todas las Opciones de Déficit",
          "title": "Comparación de Déficit Calórico",
          "columns": {
            "deficitPct": "% Déficit",
            "dailyCal": "Calorías Diarias",
            "dailyDeficit": "Déficit Diario",
            "weeklyLoss": "Pérdida Semanal",
            "weeksToGoal": "Semanas al Objetivo",
            "rating": "Sostenibilidad"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es un Déficit Calórico?",
          "content": "Un déficit calórico ocurre cuando consumes menos calorías de las que tu cuerpo quema. Tu cuerpo necesita energía (medida en calorías) para funciones básicas como respirar, circulación y digestión — esto es tu Tasa Metabólica Basal (TMB). Cuando añades actividad diaria y ejercicio, obtienes tu Gasto Energético Total Diario (GET). Comer por debajo de tu GET obliga a tu cuerpo a utilizar energía almacenada (principalmente grasa corporal), resultando en pérdida de peso con el tiempo. Un déficit de aproximadamente 500 calorías por día típicamente produce ~1 lb de pérdida de grasa por semana, aunque los resultados individuales varían basados en metabolismo, composición corporal y factores hormonales."
        },
        "howItWorks": {
          "title": "Cómo Funciona Esta Calculadora",
          "content": "Esta calculadora primero estima tu TMB usando una de tres fórmulas científicamente validadas: la ecuación Mifflin-St Jeor (más precisa para la población general), la ecuación Harris-Benedict Revisada, o la fórmula Katch-McArdle (mejor si conoces tu porcentaje de grasa corporal). Luego multiplica tu TMB por un factor de actividad para determinar tu GET — las calorías totales que quemas diariamente. Desde ahí, aplica tu porcentaje de déficit elegido para calcular un objetivo calórico diario. La herramienta también proyecta tu trayectoria de pérdida de peso semana a semana, estima tus necesidades de macronutrientes (proteína, carbohidratos, grasa), y muestra cómo se comparan diferentes niveles de déficit para que puedas elegir el plan que se ajuste a tu estilo de vida."
        },
        "considerations": {
          "title": "Consideraciones Importantes",
          "items": [
            {
              "text": "La regla de 3,500 calorías (1 lb = 3,500 cal) es una estimación aproximada. La pérdida de peso real es no lineal porque tu metabolismo se adapta mientras pierdes peso.",
              "type": "warning"
            },
            {
              "text": "Una ingesta de proteína de 0.7–1 g por libra de peso objetivo ayuda a preservar la masa muscular magra durante un déficit.",
              "type": "info"
            },
            {
              "text": "Déficits muy agresivos (>25%) pueden ralentizar el metabolismo, causar pérdida muscular y llevar a atracones. Un déficit moderado del 20% es el punto ideal para la mayoría de las personas.",
              "type": "warning"
            },
            {
              "text": "El entrenamiento de fuerza 2–4× por semana durante un corte es crítico para mantener la masa muscular y mantener alta la tasa metabólica.",
              "type": "info"
            },
            {
              "text": "Las mesetas de pérdida de peso son normales. Tu cuerpo se adapta después de 8–12 semanas — considera un descanso de dieta o semana de recarga.",
              "type": "info"
            },
            {
              "text": "Consulta un proveedor de salud antes de comenzar cualquier dieta restringida en calorías, especialmente si tienes condiciones médicas.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Niveles de Déficit Explicados",
          "items": [
            {
              "text": "Suave (10%): Pierde ~0.5 lb/semana. Mejor para aquellos cerca del peso objetivo o con poca grasa corporal. Muy sostenible a largo plazo.",
              "type": "info"
            },
            {
              "text": "Moderado (20%): Pierde ~1 lb/semana. El estándar de oro recomendado por la mayoría de nutricionistas. Equilibra velocidad con sostenibilidad.",
              "type": "info"
            },
            {
              "text": "Agresivo (25%): Pierde ~1.5 lb/semana. Adecuado para aquellos con peso significativo que perder y alta disciplina. Puede causar fatiga.",
              "type": "warning"
            },
            {
              "text": "Extremo (30%): Pierde ~2 lb/semana. No recomendado por más de 4–6 semanas. Alto riesgo de pérdida muscular y adaptación metabólica.",
              "type": "warning"
            },
            {
              "text": "Nunca bajes de 1,200 cal/día (mujeres) o 1,500 cal/día (hombres) independientemente del porcentaje de déficit.",
              "type": "warning"
            },
            {
              "text": "Los individuos activos queman más calorías y a menudo pueden sostener déficits mayores sin perder músculo.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo",
          "description": "Ejemplos paso a paso usando la ecuación Mifflin-St Jeor",
          "examples": [
            {
              "title": "Hombre de 30 años, 200 lbs, 5'10\", Actividad Moderada",
              "steps": [
                "TMB = (10 × 90.7 kg) + (6.25 × 178 cm) − (5 × 30) + 5 = 907 + 1,112.5 − 150 + 5 = 1,875 cal",
                "GET = 1,875 × 1.55 (moderado) = 2,906 cal/día",
                "20% déficit = 2,906 × 0.80 = 2,325 cal/día",
                "Déficit diario = 2,906 − 2,325 = 581 cal",
                "Pérdida semanal ≈ 581 × 7 / 3,500 = ~1.2 lbs/semana"
              ],
              "result": "Come 2,325 cal/día para perder ~1.2 lbs/semana. Con 20 lbs que perder → ~17 semanas al objetivo."
            },
            {
              "title": "Mujer de 35 años, 165 lbs, 5'5\", Actividad Ligera",
              "steps": [
                "TMB = (10 × 74.8 kg) + (6.25 × 165 cm) − (5 × 35) − 161 = 748 + 1,031.3 − 175 − 161 = 1,443 cal",
                "GET = 1,443 × 1.375 (ligero) = 1,984 cal/día",
                "20% déficit = 1,984 × 0.80 = 1,587 cal/día",
                "Déficit diario = 1,984 − 1,587 = 397 cal",
                "Pérdida semanal ≈ 397 × 7 / 3,500 = ~0.8 lbs/semana"
              ],
              "result": "Come 1,587 cal/día para perder ~0.8 lbs/semana. Con 25 lbs que perder → ~31 semanas al objetivo."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Qué es un déficit calórico seguro para la pérdida de peso?",
          "answer": "La mayoría de expertos recomiendan un déficit de 300–500 calorías por día, lo que se traduce a aproximadamente 0.5–1 lb de pérdida de grasa por semana. Un déficit del 20% de tu GET es el enfoque más comúnmente recomendado porque equilibra velocidad con sostenibilidad. Nunca bajes de 1,200 calorías/día para mujeres o 1,500 calorías/día para hombres sin supervisión médica."
        },
        {
          "question": "¿Qué fórmula TMB debería usar?",
          "answer": "La ecuación Mifflin-St Jeor es la más precisa para la población general y es recomendada por la Academia de Nutrición y Dietética. Si conoces tu porcentaje de grasa corporal, la fórmula Katch-McArdle puede ser más precisa porque cuenta la masa corporal magra. La ecuación Harris-Benedict Revisada es una alternativa bien establecida."
        },
        {
          "question": "¿Por qué mi pérdida de peso es más lenta de lo que predice la calculadora?",
          "answer": "La pérdida de peso es no lineal. Tu metabolismo se adapta a la menor ingesta calórica (termogénesis adaptativa), la retención de agua fluctúa, y la ganancia muscular del ejercicio puede enmascarar la pérdida de grasa en la báscula. La regla de 3,500 calorías es una aproximación. Rastrea promedios semanales en lugar de pesadas diarias, y recalcula tu GET cada 10 libras perdidas."
        },
        {
          "question": "¿Cuánta proteína debería comer mientras estoy en déficit?",
          "answer": "La investigación sugiere 0.7–1 gramo de proteína por libra de peso corporal objetivo para preservar la masa muscular durante un déficit. Para un peso objetivo de 180 lb, eso son 126–180 g de proteína por día. Una ingesta mayor de proteína también aumenta la saciedad, ayudándote a sentirte más lleno con menos calorías."
        },
        {
          "question": "¿Puedo perder peso sin ejercicio?",
          "answer": "Sí — la pérdida de peso es impulsada principalmente por un déficit calórico, que puede lograrse solo con dieta. Sin embargo, el ejercicio (especialmente entrenamiento de fuerza) ayuda a preservar la masa muscular, impulsa la tasa metabólica, mejora el estado de ánimo y lleva a una mejor composición corporal. Una combinación de dieta y ejercicio produce los mejores resultados a largo plazo."
        },
        {
          "question": "¿Qué pasa si como muy pocas calorías?",
          "answer": "Comer muy pocas calorías puede causar fatiga, deficiencias de nutrientes, pérdida muscular, alteración hormonal y ralentización metabólica. Las dietas muy bajas en calorías (<1,200 cal para mujeres, <1,500 para hombres) pueden desencadenar ciclos de atracones y en realidad hacer más difícil la pérdida de peso a largo plazo. Un déficit moderado con alimentos densos en nutrientes es mucho más efectivo y sostenible."
        }
      ],
      "chart": {
        "title": "Proyección de Pérdida de Peso",
        "xLabel": "Semana",
        "yLabel": "Peso",
        "series": {
          "weight": "Peso Proyectado",
          "goalWeight": "Peso Objetivo"
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
      },
      "calculator": {
        "yourInformation": "Tu Información"
      }
    },
    pt: {
      "name": "Calculadora de Déficit Calórico",
      "slug": "calculadora-deficit-calorico",
      "subtitle": "Calcule o seu déficit calórico ideal e veja quanto tempo demora para atingir o seu peso objetivo com um plano personalizado.",
      "breadcrumb": "Déficit Calórico",
      "seo": {
        "title": "Calculadora de Déficit Calórico - Planejador Gratuito de Perda de Peso",
        "description": "Calcule o seu déficit calórico diário para perda de peso segura. Veja a sua TMB, GDET, macros e uma projeção semanal para atingir o seu peso objetivo.",
        "shortDescription": "Encontre o seu déficit calórico ideal e cronograma de perda de peso.",
        "keywords": [
          "calculadora déficit calórico",
          "calculadora défice calórico",
          "calculadora perda peso",
          "quantas calorias para perder peso",
          "calculadora GDET",
          "déficit calórico para perder peso",
          "calculadora déficit calórico grátis",
          "calculadora TMB perda peso"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "gender": {
          "label": "Sexo",
          "helpText": "O sexo biológico afeta a taxa metabólica",
          "options": {
            "male": "Masculino",
            "female": "Feminino"
          }
        },
        "age": {
          "label": "Idade",
          "helpText": "O metabolismo abranda com a idade"
        },
        "weight": {
          "label": "Peso Atual",
          "helpText": "O seu peso corporal atual"
        },
        "height": {
          "label": "Altura",
          "helpText": "A sua altura"
        },
        "activityLevel": {
          "label": "Nível de Atividade",
          "helpText": "Rotina típica semanal de exercício",
          "options": {
            "sedentary": "Sedentário (pouco ou nenhum exercício)",
            "light": "Ligeiro (1-3 dias/semana)",
            "moderate": "Moderado (3-5 dias/semana)",
            "active": "Ativo (6-7 dias/semana)",
            "veryActive": "Muito Ativo (intenso diário + trabalho físico)"
          }
        },
        "formula": {
          "label": "Fórmula TMB",
          "helpText": "Mifflin-St Jeor é a mais precisa para a maioria das pessoas",
          "options": {
            "mifflin": "Mifflin-St Jeor (recomendada)",
            "harris": "Harris-Benedict Revisada",
            "katch": "Katch-McArdle (precisa % gordura corporal)"
          }
        },
        "bodyFatPercent": {
          "label": "% Gordura Corporal",
          "helpText": "Necessária para fórmula Katch-McArdle — estime se não souber"
        },
        "goalWeight": {
          "label": "Peso Objetivo",
          "helpText": "O seu peso alvo"
        },
        "deficitLevel": {
          "label": "Nível de Déficit",
          "helpText": "Déficits maiores = perda mais rápida mas mais difícil de manter e maior risco de perda muscular",
          "options": {
            "mild": "Leve — 10% (mais seguro, lento)",
            "moderate": "Moderado — 20% (recomendado)",
            "aggressive": "Agressivo — 25% (desafiante)",
            "extreme": "Extremo — 30% (não recomendado a longo prazo)"
          }
        }
      },
      "results": {
        "bmr": {
          "label": "Taxa Metabólica Basal (TMB)"
        },
        "tdee": {
          "label": "Calorias de Manutenção (GDET)"
        },
        "targetCalories": {
          "label": "Objetivo Calórico Diário"
        },
        "dailyDeficit": {
          "label": "Déficit Diário"
        },
        "weeklyLoss": {
          "label": "Perda de Peso Semanal Estimada"
        },
        "weeksToGoal": {
          "label": "Tempo Estimado até ao Objetivo"
        }
      },
      "presets": {
        "mildLoss": {
          "label": "Perda de Peso Leve",
          "description": "Déficit 10% — lento e sustentável"
        },
        "moderateLoss": {
          "label": "Perda Moderada",
          "description": "Déficit 20% — abordagem equilibrada"
        },
        "aggressiveCut": {
          "label": "Corte Agressivo",
          "description": "Déficit 25% — mais rápido mas desafiante"
        }
      },
      "values": {
        "cal": "cal",
        "cal/day": "cal/dia",
        "lbs/week": "lbs/semana",
        "kg/week": "kg/semana",
        "weeks": "semanas",
        "week": "semana",
        "g": "g",
        "protein": "Proteína",
        "carbs": "Hidratos",
        "fat": "Gordura",
        "deficit": "déficit"
      },
      "formats": {
        "summary": "Coma {targetCalories} cal/dia (déficit de {dailyDeficit} cal) para atingir o seu objetivo em ~{weeksToGoal} semanas."
      },
      "infoCards": {
        "macros": {
          "title": "📊 Distribuição de Macros",
          "items": [
            {
              "label": "Proteína",
              "valueKey": "proteinG"
            },
            {
              "label": "Hidratos de Carbono",
              "valueKey": "carbsG"
            },
            {
              "label": "Gordura",
              "valueKey": "fatG"
            },
            {
              "label": "Calorias da Proteína",
              "valueKey": "proteinCal"
            }
          ]
        },
        "plan": {
          "title": "🎯 O Seu Plano",
          "items": [
            {
              "label": "Manutenção (GDET)",
              "valueKey": "tdee"
            },
            {
              "label": "Objetivo Diário",
              "valueKey": "targetCalories"
            },
            {
              "label": "Déficit Diário",
              "valueKey": "dailyDeficit"
            },
            {
              "label": "Peso Objetivo",
              "valueKey": "goalWeightFormatted"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas",
          "items": [
            "Nunca coma abaixo de 1.200 cal/dia (mulheres) ou 1.500 cal/dia (homens) sem supervisão médica.",
            "Dietas ricas em proteína (1 g por lb de peso objetivo) ajudam a preservar músculo enquanto perde gordura.",
            "Pese-se à mesma hora diariamente e acompanhe a média semanal — o peso diário flutua.",
            "Recalcule a cada 4,5 kg perdidos — o seu GDET diminui conforme fica mais leve."
          ]
        }
      },
      "detailedTable": {
        "deficitOptions": {
          "button": "Ver Todas as Opções de Déficit",
          "title": "Comparação de Déficit Calórico",
          "columns": {
            "deficitPct": "% Déficit",
            "dailyCal": "Calorias Diárias",
            "dailyDeficit": "Déficit Diário",
            "weeklyLoss": "Perda Semanal",
            "weeksToGoal": "Semanas até Objetivo",
            "rating": "Sustentabilidade"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é um Déficit Calórico?",
          "content": "Um déficit calórico ocorre quando consome menos calorias do que o seu corpo queima. O seu corpo precisa de energia (medida em calorias) para funções básicas como respirar, circulação e digestão — esta é a sua Taxa Metabólica Basal (TMB). Quando adiciona atividade diária e exercício, obtém o seu Gasto Energético Diário Total (GDET). Comer abaixo do seu GDET força o corpo a usar energia armazenada (principalmente gordura corporal), resultando em perda de peso ao longo do tempo. Um déficit de cerca de 500 calorias por dia tipicamente produz ~0,45 kg de perda de gordura por semana, embora os resultados individuais variem baseados no metabolismo, composição corporal e fatores hormonais."
        },
        "howItWorks": {
          "title": "Como Funciona Esta Calculadora",
          "content": "Esta calculadora primeiro estima a sua TMB usando uma de três fórmulas cientificamente validadas: a equação Mifflin-St Jeor (mais precisa para a população geral), a equação Harris-Benedict Revisada, ou a fórmula Katch-McArdle (melhor se souber a sua percentagem de gordura corporal). Depois multiplica a sua TMB por um fator de atividade para determinar o seu GDET — o total de calorias que queima diariamente. A partir daí, aplica a sua percentagem de déficit escolhida para calcular um objetivo calórico diário. A ferramenta também projeta a sua trajetória de perda de peso semana a semana, estima as suas necessidades de macronutrientes (proteína, hidratos, gordura), e mostra como diferentes níveis de déficit se comparam para poder escolher o plano que se adequa ao seu estilo de vida."
        },
        "considerations": {
          "title": "Considerações Importantes",
          "items": [
            {
              "text": "A regra das 3.500 calorias (0,45 kg = 3.500 cal) é uma estimativa aproximada. A perda de peso real não é linear porque o seu metabolismo adapta-se conforme perde peso.",
              "type": "warning"
            },
            {
              "text": "Ingestão de proteína de 0,7-1 g por libra de peso objetivo ajuda a preservar massa muscular magra durante um déficit.",
              "type": "info"
            },
            {
              "text": "Déficits muito agressivos (>25%) podem abrandar o metabolismo, causar perda muscular e levar a episódios de compulsão alimentar. Um déficit moderado de 20% é o ponto ideal para a maioria das pessoas.",
              "type": "warning"
            },
            {
              "text": "Treino de força 2-4× por semana durante um corte é crítico para manter massa muscular e manter a taxa metabólica alta.",
              "type": "info"
            },
            {
              "text": "Plateaus de perda de peso são normais. O seu corpo adapta-se após 8-12 semanas — considere uma pausa na dieta ou semana de recarga.",
              "type": "info"
            },
            {
              "text": "Consulte um profissional de saúde antes de iniciar qualquer dieta com restrição calórica, especialmente se tiver condições médicas.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Níveis de Déficit Explicados",
          "items": [
            {
              "text": "Leve (10%): Perca ~0,23 kg/semana. Melhor para quem está perto do peso objetivo ou com baixa gordura corporal. Muito sustentável a longo prazo.",
              "type": "info"
            },
            {
              "text": "Moderado (20%): Perca ~0,45 kg/semana. O padrão-ouro recomendado pela maioria dos nutricionistas. Equilibra velocidade com sustentabilidade.",
              "type": "info"
            },
            {
              "text": "Agressivo (25%): Perca ~0,68 kg/semana. Adequado para quem tem peso significativo a perder e alta disciplina. Pode causar fadiga.",
              "type": "warning"
            },
            {
              "text": "Extremo (30%): Perca ~0,9 kg/semana. Não recomendado por mais de 4-6 semanas. Alto risco de perda muscular e adaptação metabólica.",
              "type": "warning"
            },
            {
              "text": "Nunca vá abaixo de 1.200 cal/dia (mulheres) ou 1.500 cal/dia (homens) independentemente da percentagem de déficit.",
              "type": "warning"
            },
            {
              "text": "Indivíduos ativos queimam mais calorias e podem frequentemente sustentar déficits maiores sem perder músculo.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo",
          "description": "Exemplos passo a passo usando a equação Mifflin-St Jeor",
          "examples": [
            {
              "title": "Homem de 30 anos, 90,7 kg, 1,78m, Atividade Moderada",
              "steps": [
                "TMB = (10 × 90,7 kg) + (6,25 × 178 cm) − (5 × 30) + 5 = 907 + 1.112,5 − 150 + 5 = 1.875 cal",
                "GDET = 1.875 × 1,55 (moderado) = 2.906 cal/dia",
                "Déficit 20% = 2.906 × 0,80 = 2.325 cal/dia",
                "Déficit diário = 2.906 − 2.325 = 581 cal",
                "Perda semanal ≈ 581 × 7 / 3.500 = ~0,54 kg/semana"
              ],
              "result": "Coma 2.325 cal/dia para perder ~0,54 kg/semana. Com 9 kg a perder → ~17 semanas até ao objetivo."
            },
            {
              "title": "Mulher de 35 anos, 74,8 kg, 1,65m, Atividade Ligeira",
              "steps": [
                "TMB = (10 × 74,8 kg) + (6,25 × 165 cm) − (5 × 35) − 161 = 748 + 1.031,3 − 175 − 161 = 1.443 cal",
                "GDET = 1.443 × 1,375 (ligeiro) = 1.984 cal/dia",
                "Déficit 20% = 1.984 × 0,80 = 1.587 cal/dia",
                "Déficit diário = 1.984 − 1.587 = 397 cal",
                "Perda semanal ≈ 397 × 7 / 3.500 = ~0,36 kg/semana"
              ],
              "result": "Coma 1.587 cal/dia para perder ~0,36 kg/semana. Com 11,3 kg a perder → ~31 semanas até ao objetivo."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qual é um déficit calórico seguro para perda de peso?",
          "answer": "A maioria dos especialistas recomenda um déficit de 300-500 calorias por dia, o que se traduz em cerca de 0,23-0,45 kg de perda de gordura por semana. Um déficit de 20% do seu GDET é a abordagem mais comumente recomendada porque equilibra velocidade com sustentabilidade. Nunca vá abaixo de 1.200 calorias/dia para mulheres ou 1.500 calorias/dia para homens sem supervisão médica."
        },
        {
          "question": "Qual fórmula TMB devo usar?",
          "answer": "A equação Mifflin-St Jeor é a mais precisa para a população geral e é recomendada pela Academia de Nutrição e Dietética. Se souber a sua percentagem de gordura corporal, a fórmula Katch-McArdle pode ser mais precisa porque tem em conta a massa corporal magra. A equação Harris-Benedict Revisada é uma alternativa bem estabelecida."
        },
        {
          "question": "Por que a minha perda de peso é mais lenta que a calculadora prevê?",
          "answer": "A perda de peso não é linear. O seu metabolismo adapta-se à menor ingestão calórica (termogénese adaptativa), a retenção de água flutua, e o ganho muscular do exercício pode mascarar a perda de gordura na balança. A regra das 3.500 calorias é uma aproximação. Acompanhe médias semanais em vez de pesagens diárias, e recalcule o seu GDET a cada 4,5 kg perdidos."
        },
        {
          "question": "Quanta proteína devo comer durante um déficit?",
          "answer": "A pesquisa sugere 0,7-1 grama de proteína por libra de peso corporal objetivo para preservar massa muscular durante um déficit. Para um peso objetivo de 81,6 kg, isso são 126-180 g de proteína por dia. Maior ingestão de proteína também aumenta a saciedade, ajudando-o a sentir-se mais saciado com menos calorias."
        },
        {
          "question": "Posso perder peso sem exercício?",
          "answer": "Sim — a perda de peso é principalmente impulsionada por um déficit calórico, que pode ser alcançado apenas através da dieta. No entanto, o exercício (especialmente treino de força) ajuda a preservar massa muscular, aumenta a taxa metabólica, melhora o humor e leva a melhor composição corporal. Uma combinação de dieta e exercício produz os melhores resultados a longo prazo."
        },
        {
          "question": "O que acontece se comer muito poucas calorias?",
          "answer": "Comer muito poucas calorias pode causar fadiga, deficiências nutricionais, perda muscular, perturbação hormonal e abrandamento metabólico. Dietas muito baixas em calorias (<1.200 cal para mulheres, <1.500 para homens) podem desencadear ciclos de compulsão alimentar e na verdade tornar a perda de peso a longo prazo mais difícil. Um déficit moderado com alimentos ricos em nutrientes é muito mais eficaz e sustentável."
        }
      ],
      "chart": {
        "title": "Projeção de Perda de Peso",
        "xLabel": "Semana",
        "yLabel": "Peso",
        "series": {
          "weight": "Peso Projetado",
          "goalWeight": "Peso Objetivo"
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
      "name": "Calculateur de Déficit Calorique",
      "slug": "calculateur-deficit-calorique",
      "subtitle": "Calculez votre déficit calorique idéal et voyez combien de temps il faut pour atteindre votre poids objectif avec un plan personnalisé.",
      "breadcrumb": "Déficit Calorique",
      "seo": {
        "title": "Calculateur de Déficit Calorique - Planificateur de Perte de Poids Gratuit",
        "description": "Calculez votre déficit calorique quotidien pour une perte de poids sûre. Consultez votre MB, DEJ, macros et une projection semaine par semaine pour atteindre votre poids objectif.",
        "shortDescription": "Trouvez votre déficit calorique idéal et votre calendrier de perte de poids.",
        "keywords": [
          "calculateur déficit calorique",
          "calculatrice déficit calorique",
          "calculateur perte de poids",
          "combien de calories pour perdre du poids",
          "calculateur DEJ",
          "déficit calorique pour perdre du poids",
          "calculateur déficit calorique gratuit",
          "calculateur MB perte de poids"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "gender": {
          "label": "Sexe",
          "helpText": "Le sexe biologique affecte le taux métabolique",
          "options": {
            "male": "Homme",
            "female": "Femme"
          }
        },
        "age": {
          "label": "Âge",
          "helpText": "Le métabolisme ralentit avec l'âge"
        },
        "weight": {
          "label": "Poids Actuel",
          "helpText": "Votre poids corporel actuel"
        },
        "height": {
          "label": "Taille",
          "helpText": "Votre taille"
        },
        "activityLevel": {
          "label": "Niveau d'Activité",
          "helpText": "Routine d'exercice hebdomadaire typique",
          "options": {
            "sedentary": "Sédentaire (peu ou pas d'exercice)",
            "light": "Léger (1-3 jours/semaine)",
            "moderate": "Modéré (3-5 jours/semaine)",
            "active": "Actif (6-7 jours/semaine)",
            "veryActive": "Très Actif (intense quotidien + travail physique)"
          }
        },
        "formula": {
          "label": "Formule MB",
          "helpText": "Mifflin-St Jeor est la plus précise pour la plupart des gens",
          "options": {
            "mifflin": "Mifflin-St Jeor (recommandée)",
            "harris": "Harris-Benedict Révisée",
            "katch": "Katch-McArdle (nécessite % graisse corporelle)"
          }
        },
        "bodyFatPercent": {
          "label": "% Graisse Corporelle",
          "helpText": "Requis pour la formule Katch-McArdle — estimez si incertain"
        },
        "goalWeight": {
          "label": "Poids Objectif",
          "helpText": "Votre poids cible"
        },
        "deficitLevel": {
          "label": "Niveau de Déficit",
          "helpText": "Déficits plus élevés = perte plus rapide mais plus difficile à maintenir et risque plus élevé de perte musculaire",
          "options": {
            "mild": "Léger — 10% (plus sûr, lent)",
            "moderate": "Modéré — 20% (recommandé)",
            "aggressive": "Agressif — 25% (difficile)",
            "extreme": "Extrême — 30% (non recommandé à long terme)"
          }
        }
      },
      "results": {
        "bmr": {
          "label": "Métabolisme de Base (MB)"
        },
        "tdee": {
          "label": "Calories de Maintenance (DEJ)"
        },
        "targetCalories": {
          "label": "Objectif Calorique Quotidien"
        },
        "dailyDeficit": {
          "label": "Déficit Quotidien"
        },
        "weeklyLoss": {
          "label": "Perte de Poids Hebdomadaire Est."
        },
        "weeksToGoal": {
          "label": "Temps Est. pour Atteindre l'Objectif"
        }
      },
      "presets": {
        "mildLoss": {
          "label": "Perte de Poids Légère",
          "description": "Déficit de 10% — lent et durable"
        },
        "moderateLoss": {
          "label": "Perte Modérée",
          "description": "Déficit de 20% — approche équilibrée"
        },
        "aggressiveCut": {
          "label": "Coupe Agressive",
          "description": "Déficit de 25% — plus rapide mais difficile"
        }
      },
      "values": {
        "cal": "cal",
        "cal/day": "cal/jour",
        "lbs/week": "lbs/semaine",
        "kg/week": "kg/semaine",
        "weeks": "semaines",
        "week": "semaine",
        "g": "g",
        "protein": "Protéines",
        "carbs": "Glucides",
        "fat": "Lipides",
        "deficit": "déficit"
      },
      "formats": {
        "summary": "Mangez {targetCalories} cal/jour (déficit de {dailyDeficit} cal) pour atteindre votre objectif en ~{weeksToGoal} semaines."
      },
      "infoCards": {
        "macros": {
          "title": "📊 Répartition des Macros",
          "items": [
            {
              "label": "Protéines",
              "valueKey": "proteinG"
            },
            {
              "label": "Glucides",
              "valueKey": "carbsG"
            },
            {
              "label": "Lipides",
              "valueKey": "fatG"
            },
            {
              "label": "Calories Protéines",
              "valueKey": "proteinCal"
            }
          ]
        },
        "plan": {
          "title": "🎯 Votre Plan",
          "items": [
            {
              "label": "Maintenance (DEJ)",
              "valueKey": "tdee"
            },
            {
              "label": "Objectif Quotidien",
              "valueKey": "targetCalories"
            },
            {
              "label": "Déficit Quotidien",
              "valueKey": "dailyDeficit"
            },
            {
              "label": "Poids Objectif",
              "valueKey": "goalWeightFormatted"
            }
          ]
        },
        "tips": {
          "title": "💡 Conseils",
          "items": [
            "Ne jamais manger moins de 1 200 cal/jour (femmes) ou 1 500 cal/jour (hommes) sans supervision médicale.",
            "Les régimes riches en protéines (1 g par lb de poids objectif) aident à préserver le muscle lors de la perte de graisse.",
            "Pesez-vous à la même heure chaque jour et suivez la moyenne hebdomadaire — le poids quotidien fluctue.",
            "Recalculez tous les 4,5 kg perdus — votre DEJ diminue quand vous perdez du poids."
          ]
        }
      },
      "detailedTable": {
        "deficitOptions": {
          "button": "Voir Toutes les Options de Déficit",
          "title": "Comparaison des Déficits Caloriques",
          "columns": {
            "deficitPct": "% Déficit",
            "dailyCal": "Calories Quotidiennes",
            "dailyDeficit": "Déficit Quotidien",
            "weeklyLoss": "Perte Hebdomadaire",
            "weeksToGoal": "Semaines pour Objectif",
            "rating": "Durabilité"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'un Déficit Calorique ?",
          "content": "Un déficit calorique se produit lorsque vous consommez moins de calories que votre corps n'en brûle. Votre corps a besoin d'énergie (mesurée en calories) pour les fonctions de base comme la respiration, la circulation et la digestion — c'est votre Métabolisme de Base (MB). Quand vous ajoutez l'activité quotidienne et l'exercice, vous obtenez votre Dépense Énergétique Journalière (DEJ). Manger en dessous de votre DEJ force votre corps à puiser dans les réserves d'énergie (principalement la graisse corporelle), résultant en une perte de poids au fil du temps. Un déficit d'environ 500 calories par jour produit généralement ~0,5 kg de perte de graisse par semaine, bien que les résultats individuels varient selon le métabolisme, la composition corporelle et les facteurs hormonaux."
        },
        "howItWorks": {
          "title": "Comment Fonctionne ce Calculateur",
          "content": "Ce calculateur estime d'abord votre MB en utilisant l'une des trois formules scientifiquement validées : l'équation de Mifflin-St Jeor (la plus précise pour la population générale), l'équation de Harris-Benedict Révisée, ou la formule de Katch-McArdle (meilleure si vous connaissez votre pourcentage de graisse corporelle). Il multiplie ensuite votre MB par un facteur d'activité pour déterminer votre DEJ — le total des calories que vous brûlez quotidiennement. À partir de là, il applique votre pourcentage de déficit choisi pour calculer un objectif calorique quotidien. L'outil projette également votre trajectoire de perte de poids semaine par semaine, estime vos besoins en macronutriments (protéines, glucides, lipides), et montre comment différents niveaux de déficit se comparent pour que vous puissiez choisir le plan qui correspond à votre style de vie."
        },
        "considerations": {
          "title": "Considérations Importantes",
          "items": [
            {
              "text": "La règle des 3 500 calories (0,5 kg = 3 500 cal) est une estimation approximative. La vraie perte de poids n'est pas linéaire car votre métabolisme s'adapte quand vous perdez du poids.",
              "type": "warning"
            },
            {
              "text": "Un apport en protéines de 0,7-1 g par livre de poids objectif aide à préserver la masse musculaire maigre pendant un déficit.",
              "type": "info"
            },
            {
              "text": "Les déficits très agressifs (>25%) peuvent ralentir le métabolisme, causer une perte musculaire et mener à des crises alimentaires. Un déficit modéré de 20% est le point idéal pour la plupart des gens.",
              "type": "warning"
            },
            {
              "text": "L'entraînement en force 2-4 fois par semaine pendant une coupe est critique pour maintenir la masse musculaire et garder le taux métabolique élevé.",
              "type": "info"
            },
            {
              "text": "Les plateaux de perte de poids sont normaux. Votre corps s'adapte après 8-12 semaines — considérez une pause diététique ou une semaine de recharge.",
              "type": "info"
            },
            {
              "text": "Consultez un professionnel de santé avant de commencer tout régime hypocalorique, surtout si vous avez des conditions médicales.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Niveaux de Déficit Expliqués",
          "items": [
            {
              "text": "Léger (10%) : Perdre ~0,25 kg/semaine. Meilleur pour ceux proches du poids objectif ou avec peu de graisse corporelle. Très durable à long terme.",
              "type": "info"
            },
            {
              "text": "Modéré (20%) : Perdre ~0,5 kg/semaine. L'étalon-or recommandé par la plupart des nutritionnistes. Équilibre vitesse et durabilité.",
              "type": "info"
            },
            {
              "text": "Agressif (25%) : Perdre ~0,75 kg/semaine. Convient à ceux avec un poids significatif à perdre et une haute discipline. Peut causer de la fatigue.",
              "type": "warning"
            },
            {
              "text": "Extrême (30%) : Perdre ~1 kg/semaine. Non recommandé pour plus de 4-6 semaines. Risque élevé de perte musculaire et d'adaptation métabolique.",
              "type": "warning"
            },
            {
              "text": "Ne jamais descendre en dessous de 1 200 cal/jour (femmes) ou 1 500 cal/jour (hommes) quel que soit le pourcentage de déficit.",
              "type": "warning"
            },
            {
              "text": "Les individus actifs brûlent plus de calories et peuvent souvent maintenir des déficits plus élevés sans perdre de muscle.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calculs",
          "description": "Exemples étape par étape utilisant l'équation de Mifflin-St Jeor",
          "examples": [
            {
              "title": "Homme de 30 ans, 90 kg, 1m78, Activité Modérée",
              "steps": [
                "MB = (10 × 90,7 kg) + (6,25 × 178 cm) − (5 × 30) + 5 = 907 + 1 112,5 − 150 + 5 = 1 875 cal",
                "DEJ = 1 875 × 1,55 (modéré) = 2 906 cal/jour",
                "Déficit 20% = 2 906 × 0,80 = 2 325 cal/jour",
                "Déficit quotidien = 2 906 − 2 325 = 581 cal",
                "Perte hebdomadaire ≈ 581 × 7 / 3 500 = ~1,2 lbs/semaine"
              ],
              "result": "Mangez 2 325 cal/jour pour perdre ~1,2 lbs/semaine. À 20 lbs à perdre → ~17 semaines pour l'objectif."
            },
            {
              "title": "Femme de 35 ans, 75 kg, 1m65, Activité Légère",
              "steps": [
                "MB = (10 × 74,8 kg) + (6,25 × 165 cm) − (5 × 35) − 161 = 748 + 1 031,3 − 175 − 161 = 1 443 cal",
                "DEJ = 1 443 × 1,375 (léger) = 1 984 cal/jour",
                "Déficit 20% = 1 984 × 0,80 = 1 587 cal/jour",
                "Déficit quotidien = 1 984 − 1 587 = 397 cal",
                "Perte hebdomadaire ≈ 397 × 7 / 3 500 = ~0,8 lbs/semaine"
              ],
              "result": "Mangez 1 587 cal/jour pour perdre ~0,8 lbs/semaine. À 25 lbs à perdre → ~31 semaines pour l'objectif."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quel est un déficit calorique sûr pour la perte de poids ?",
          "answer": "La plupart des experts recommandent un déficit de 300-500 calories par jour, ce qui se traduit par environ 0,25-0,5 kg de perte de graisse par semaine. Un déficit de 20% de votre DEJ est l'approche la plus couramment recommandée car elle équilibre vitesse et durabilité. Ne jamais descendre en dessous de 1 200 calories/jour pour les femmes ou 1 500 calories/jour pour les hommes sans supervision médicale."
        },
        {
          "question": "Quelle formule de MB devrais-je utiliser ?",
          "answer": "L'équation de Mifflin-St Jeor est la plus précise pour la population générale et est recommandée par l'Académie de Nutrition et de Diététique. Si vous connaissez votre pourcentage de graisse corporelle, la formule de Katch-McArdle peut être plus précise car elle tient compte de la masse corporelle maigre. L'équation de Harris-Benedict Révisée est une alternative bien établie."
        },
        {
          "question": "Pourquoi ma perte de poids est-elle plus lente que ce que prédit le calculateur ?",
          "answer": "La perte de poids n'est pas linéaire. Votre métabolisme s'adapte à un apport calorique plus faible (thermogenèse adaptative), la rétention d'eau fluctue, et le gain musculaire de l'exercice peut masquer la perte de graisse sur la balance. La règle des 3 500 calories est une approximation. Suivez les moyennes hebdomadaires plutôt que les pesées quotidiennes, et recalculez votre DEJ tous les 4,5 kg perdus."
        },
        {
          "question": "Combien de protéines devrais-je manger en déficit ?",
          "answer": "La recherche suggère 0,7-1 gramme de protéines par livre de poids objectif pour préserver la masse musculaire pendant un déficit. Pour un poids objectif de 80 kg, c'est 57-80 g de protéines par jour. Un apport en protéines plus élevé augmente aussi la satiété, vous aidant à vous sentir plus rassasié avec moins de calories."
        },
        {
          "question": "Puis-je perdre du poids sans exercice ?",
          "answer": "Oui — la perte de poids est principalement due à un déficit calorique, qui peut être atteint par l'alimentation seule. Cependant, l'exercice (surtout la musculation) aide à préserver la masse musculaire, booste le taux métabolique, améliore l'humeur et mène à une meilleure composition corporelle. Une combinaison d'alimentation et d'exercice produit les meilleurs résultats à long terme."
        },
        {
          "question": "Que se passe-t-il si je mange trop peu de calories ?",
          "answer": "Manger trop peu de calories peut causer fatigue, carences nutritionnelles, perte musculaire, perturbation hormonale et ralentissement métabolique. Les régimes très hypocaloriques (<1 200 cal pour les femmes, <1 500 pour les hommes) peuvent déclencher des cycles de crises alimentaires et rendre la perte de poids à long terme plus difficile. Un déficit modéré avec des aliments riches en nutriments est bien plus efficace et durable."
        }
      ],
      "chart": {
        "title": "Projection de Perte de Poids",
        "xLabel": "Semaine",
        "yLabel": "Poids",
        "series": {
          "weight": "Poids Projeté",
          "goalWeight": "Poids Objectif"
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
      "name": "Kaloriendefizit Rechner",
      "slug": "kaloriendefizit-rechner",
      "subtitle": "Berechnen Sie Ihr ideales Kaloriendefizit und sehen Sie, wie lange es dauert, Ihr Zielgewicht mit einem personalisierten Plan zu erreichen.",
      "breadcrumb": "Kaloriendefizit",
      "seo": {
        "title": "Kaloriendefizit Rechner - Kostenloser Abnehm-Planer",
        "description": "Berechnen Sie Ihr tägliches Kaloriendefizit für sicheres Abnehmen. Sehen Sie Ihren Grundumsatz, Gesamtumsatz, Makros und eine wöchentliche Prognose bis zu Ihrem Zielgewicht.",
        "shortDescription": "Finden Sie Ihr ideales Kaloriendefizit und Ihren Abnehmzeitplan.",
        "keywords": [
          "kaloriendefizit rechner",
          "kalorisches defizit rechner",
          "abnehm rechner",
          "wie viele kalorien zum abnehmen",
          "gesamtumsatz rechner",
          "kaloriendefizit zum abnehmen",
          "kostenloser kaloriendefizit rechner",
          "grundumsatz rechner abnehmen"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "gender": {
          "label": "Geschlecht",
          "helpText": "Das biologische Geschlecht beeinflusst die Stoffwechselrate",
          "options": {
            "male": "Männlich",
            "female": "Weiblich"
          }
        },
        "age": {
          "label": "Alter",
          "helpText": "Der Stoffwechsel verlangsamt sich mit dem Alter"
        },
        "weight": {
          "label": "Aktuelles Gewicht",
          "helpText": "Ihr aktuelles Körpergewicht"
        },
        "height": {
          "label": "Größe",
          "helpText": "Ihre Körpergröße"
        },
        "activityLevel": {
          "label": "Aktivitätslevel",
          "helpText": "Typische wöchentliche Trainingsroutine",
          "options": {
            "sedentary": "Sitzend (wenig oder keine Bewegung)",
            "light": "Leicht (1–3 Tage/Woche)",
            "moderate": "Moderat (3–5 Tage/Woche)",
            "active": "Aktiv (6–7 Tage/Woche)",
            "veryActive": "Sehr aktiv (intensiv täglich + körperliche Arbeit)"
          }
        },
        "formula": {
          "label": "Grundumsatz-Formel",
          "helpText": "Mifflin-St Jeor ist für die meisten Menschen am genauesten",
          "options": {
            "mifflin": "Mifflin-St Jeor (empfohlen)",
            "harris": "Überarbeitete Harris-Benedict",
            "katch": "Katch-McArdle (benötigt Körperfett %)"
          }
        },
        "bodyFatPercent": {
          "label": "Körperfett %",
          "helpText": "Erforderlich für Katch-McArdle Formel — schätzen Sie, falls unsicher"
        },
        "goalWeight": {
          "label": "Zielgewicht",
          "helpText": "Ihr angestrebtes Gewicht"
        },
        "deficitLevel": {
          "label": "Defizit-Level",
          "helpText": "Höhere Defizite = schnellerer Verlust, aber schwerer aufrechtzuerhalten und höheres Muskelverlustverlust-Risiko",
          "options": {
            "mild": "Mild — 10% (am sichersten, langsam)",
            "moderate": "Moderat — 20% (empfohlen)",
            "aggressive": "Aggressiv — 25% (herausfordernd)",
            "extreme": "Extrem — 30% (langfristig nicht empfohlen)"
          }
        }
      },
      "results": {
        "bmr": {
          "label": "Grundumsatz (BMR)"
        },
        "tdee": {
          "label": "Erhaltungskalorien (TDEE)"
        },
        "targetCalories": {
          "label": "Tägliches Kalorienziel"
        },
        "dailyDeficit": {
          "label": "Tägliches Defizit"
        },
        "weeklyLoss": {
          "label": "Geschätzter wöchentlicher Gewichtsverlust"
        },
        "weeksToGoal": {
          "label": "Geschätzte Zeit bis zum Ziel"
        }
      },
      "presets": {
        "mildLoss": {
          "label": "Milder Gewichtsverlust",
          "description": "10% Defizit — langsam und nachhaltig"
        },
        "moderateLoss": {
          "label": "Moderater Verlust",
          "description": "20% Defizit — ausgewogener Ansatz"
        },
        "aggressiveCut": {
          "label": "Aggressiver Cut",
          "description": "25% Defizit — schneller aber herausfordernd"
        }
      },
      "values": {
        "cal": "kcal",
        "cal/day": "kcal/Tag",
        "lbs/week": "lbs/Woche",
        "kg/week": "kg/Woche",
        "weeks": "Wochen",
        "week": "Woche",
        "g": "g",
        "protein": "Protein",
        "carbs": "Kohlenhydrate",
        "fat": "Fett",
        "deficit": "Defizit"
      },
      "formats": {
        "summary": "Essen Sie {targetCalories} kcal/Tag ({dailyDeficit} kcal Defizit), um Ihr Ziel in ~{weeksToGoal} Wochen zu erreichen."
      },
      "infoCards": {
        "macros": {
          "title": "📊 Makro-Aufteilung",
          "items": [
            {
              "label": "Protein",
              "valueKey": "proteinG"
            },
            {
              "label": "Kohlenhydrate",
              "valueKey": "carbsG"
            },
            {
              "label": "Fett",
              "valueKey": "fatG"
            },
            {
              "label": "Protein-Kalorien",
              "valueKey": "proteinCal"
            }
          ]
        },
        "plan": {
          "title": "🎯 Ihr Plan",
          "items": [
            {
              "label": "Erhaltung (TDEE)",
              "valueKey": "tdee"
            },
            {
              "label": "Tägliches Ziel",
              "valueKey": "targetCalories"
            },
            {
              "label": "Tägliches Defizit",
              "valueKey": "dailyDeficit"
            },
            {
              "label": "Zielgewicht",
              "valueKey": "goalWeightFormatted"
            }
          ]
        },
        "tips": {
          "title": "💡 Tipps",
          "items": [
            "Essen Sie niemals unter 1.200 kcal/Tag (Frauen) oder 1.500 kcal/Tag (Männer) ohne ärztliche Aufsicht.",
            "Proteinreiche Diäten (1 g pro lb Zielgewicht) helfen dabei, Muskeln zu erhalten während Sie Fett verlieren.",
            "Wiegen Sie sich zur gleichen Zeit täglich und verfolgen Sie den wöchentlichen Durchschnitt — das tägliche Gewicht schwankt.",
            "Berechnen Sie alle 10 verlorenen Pfund neu — Ihr TDEE sinkt, wenn Sie leichter werden."
          ]
        }
      },
      "detailedTable": {
        "deficitOptions": {
          "button": "Alle Defizit-Optionen anzeigen",
          "title": "Kaloriendefizit-Vergleich",
          "columns": {
            "deficitPct": "Defizit %",
            "dailyCal": "Tägliche Kalorien",
            "dailyDeficit": "Tägliches Defizit",
            "weeklyLoss": "Wöchentlicher Verlust",
            "weeksToGoal": "Wochen bis Ziel",
            "rating": "Nachhaltigkeit"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist ein Kaloriendefizit?",
          "content": "Ein Kaloriendefizit entsteht, wenn Sie weniger Kalorien zu sich nehmen, als Ihr Körper verbrennt. Ihr Körper benötigt Energie (gemessen in Kalorien) für grundlegende Funktionen wie Atmung, Kreislauf und Verdauung — das ist Ihr Grundumsatz (BMR). Wenn Sie tägliche Aktivität und Sport hinzufügen, erhalten Sie Ihren Gesamtenergieumsatz (TDEE). Das Essen unter Ihrem TDEE zwingt Ihren Körper dazu, auf gespeicherte Energie (hauptsächlich Körperfett) zurückzugreifen, was im Laufe der Zeit zu Gewichtsverlust führt. Ein Defizit von etwa 500 Kalorien pro Tag führt typischerweise zu ~1 Pfund Fettverlust pro Woche, wobei individuelle Ergebnisse je nach Stoffwechsel, Körperzusammensetzung und hormonellen Faktoren variieren."
        },
        "howItWorks": {
          "title": "Wie dieser Rechner funktioniert",
          "content": "Dieser Rechner schätzt zunächst Ihren Grundumsatz mit einer von drei wissenschaftlich validierten Formeln: der Mifflin-St Jeor-Gleichung (am genauesten für die Allgemeinbevölkerung), der überarbeiteten Harris-Benedict-Gleichung oder der Katch-McArdle-Formel (am besten, wenn Sie Ihren Körperfettanteil kennen). Er multipliziert dann Ihren Grundumsatz mit einem Aktivitätsfaktor, um Ihren TDEE zu bestimmen — die Gesamtkalorien, die Sie täglich verbrennen. Von dort wendet er Ihren gewählten Defizitprozentsatz an, um ein tägliches Kalorienziel zu berechnen. Das Tool projiziert auch Ihre wöchentliche Gewichtsverlustbahn, schätzt Ihre Makronährstoffbedürfnisse (Protein, Kohlenhydrate, Fett) und zeigt, wie verschiedene Defizitlevel verglichen werden, damit Sie den Plan wählen können, der zu Ihrem Lebensstil passt."
        },
        "considerations": {
          "title": "Wichtige Überlegungen",
          "items": [
            {
              "text": "Die 3.500-Kalorien-Regel (1 Pfund = 3.500 kcal) ist eine grobe Schätzung. Echter Gewichtsverlust ist nicht linear, da sich Ihr Stoffwechsel anpasst, wenn Sie Gewicht verlieren.",
              "type": "warning"
            },
            {
              "text": "Eine Proteinzufuhr von 0,7–1 g pro Pfund Zielgewicht hilft dabei, magere Muskelmasse während eines Defizits zu erhalten.",
              "type": "info"
            },
            {
              "text": "Sehr aggressive Defizite (>25%) können den Stoffwechsel verlangsamen, Muskelverlust verursachen und zu Essanfällen führen. Ein moderates 20%-Defizit ist der Sweet Spot für die meisten Menschen.",
              "type": "warning"
            },
            {
              "text": "Krafttraining 2–4× pro Woche während eines Cuts ist entscheidend für die Erhaltung der Muskelmasse und die Aufrechterhaltung einer hohen Stoffwechselrate.",
              "type": "info"
            },
            {
              "text": "Gewichtsverlust-Plateaus sind normal. Ihr Körper passt sich nach 8–12 Wochen an — erwägen Sie eine Diätpause oder Refeed-Woche.",
              "type": "info"
            },
            {
              "text": "Konsultieren Sie einen Arzt, bevor Sie eine kalorienreduzierte Diät beginnen, besonders wenn Sie medizinische Beschwerden haben.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Defizit-Level erklärt",
          "items": [
            {
              "text": "Mild (10%): Verlieren Sie ~0,5 Pfund/Woche. Am besten für die, die nah am Zielgewicht oder niedrigem Körperfett sind. Sehr nachhaltig langfristig.",
              "type": "info"
            },
            {
              "text": "Moderat (20%): Verlieren Sie ~1 Pfund/Woche. Der Goldstandard, empfohlen von den meisten Ernährungsberatern. Balanciert Geschwindigkeit mit Nachhaltigkeit.",
              "type": "info"
            },
            {
              "text": "Aggressiv (25%): Verlieren Sie ~1,5 Pfund/Woche. Geeignet für die mit signifikantem Gewichtsverlust und hoher Disziplin. Kann Müdigkeit verursachen.",
              "type": "warning"
            },
            {
              "text": "Extrem (30%): Verlieren Sie ~2 Pfund/Woche. Nicht empfohlen für mehr als 4–6 Wochen. Hohes Risiko für Muskelverlust und Stoffwechselanpassung.",
              "type": "warning"
            },
            {
              "text": "Gehen Sie niemals unter 1.200 kcal/Tag (Frauen) oder 1.500 kcal/Tag (Männer), unabhängig vom Defizitprozentsatz.",
              "type": "warning"
            },
            {
              "text": "Aktive Personen verbrennen mehr Kalorien und können oft höhere Defizite ohne Muskelverlust aufrechterhalten.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Berechnungsbeispiele",
          "description": "Schritt-für-Schritt-Beispiele mit der Mifflin-St Jeor-Gleichung",
          "examples": [
            {
              "title": "30-jähriger Mann, 91 kg, 178 cm, moderate Aktivität",
              "steps": [
                "BMR = (10 × 90,7 kg) + (6,25 × 178 cm) − (5 × 30) + 5 = 907 + 1.112,5 − 150 + 5 = 1.875 kcal",
                "TDEE = 1.875 × 1,55 (moderat) = 2.906 kcal/Tag",
                "20% Defizit = 2.906 × 0,80 = 2.325 kcal/Tag",
                "Tägliches Defizit = 2.906 − 2.325 = 581 kcal",
                "Wöchentlicher Verlust ≈ 581 × 7 / 3.500 = ~1,2 Pfund/Woche"
              ],
              "result": "Essen Sie 2.325 kcal/Tag, um ~1,2 Pfund/Woche zu verlieren. Bei 20 Pfund zu verlieren → ~17 Wochen bis zum Ziel."
            },
            {
              "title": "35-jährige Frau, 75 kg, 165 cm, leichte Aktivität",
              "steps": [
                "BMR = (10 × 74,8 kg) + (6,25 × 165 cm) − (5 × 35) − 161 = 748 + 1.031,3 − 175 − 161 = 1.443 kcal",
                "TDEE = 1.443 × 1,375 (leicht) = 1.984 kcal/Tag",
                "20% Defizit = 1.984 × 0,80 = 1.587 kcal/Tag",
                "Tägliches Defizit = 1.984 − 1.587 = 397 kcal",
                "Wöchentlicher Verlust ≈ 397 × 7 / 3.500 = ~0,8 Pfund/Woche"
              ],
              "result": "Essen Sie 1.587 kcal/Tag, um ~0,8 Pfund/Woche zu verlieren. Bei 25 Pfund zu verlieren → ~31 Wochen bis zum Ziel."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Was ist ein sicheres Kaloriendefizit für Gewichtsverlust?",
          "answer": "Die meisten Experten empfehlen ein Defizit von 300–500 Kalorien pro Tag, was etwa 0,5–1 Pfund Fettverlust pro Woche entspricht. Ein 20%-Defizit von Ihrem TDEE ist der am häufigsten empfohlene Ansatz, da er Geschwindigkeit mit Nachhaltigkeit balanciert. Gehen Sie niemals unter 1.200 Kalorien/Tag für Frauen oder 1.500 Kalorien/Tag für Männer ohne ärztliche Aufsicht."
        },
        {
          "question": "Welche BMR-Formel sollte ich verwenden?",
          "answer": "Die Mifflin-St Jeor-Gleichung ist für die Allgemeinbevölkerung am genauesten und wird von der Academy of Nutrition and Dietetics empfohlen. Wenn Sie Ihren Körperfettanteil kennen, kann die Katch-McArdle-Formel präziser sein, da sie die magere Körpermasse berücksichtigt. Die überarbeitete Harris-Benedict-Gleichung ist eine bewährte Alternative."
        },
        {
          "question": "Warum ist mein Gewichtsverlust langsamer als der Rechner vorhersagt?",
          "answer": "Gewichtsverlust ist nicht linear. Ihr Stoffwechsel passt sich an niedrigere Kalorienzufuhr an (adaptive Thermogenese), Wassereinlagerungen schwanken und Muskelzuwachs durch Sport kann Fettverlust auf der Waage maskieren. Die 3.500-Kalorien-Regel ist eine Näherung. Verfolgen Sie wöchentliche Durchschnitte statt tägliche Wiegungen und berechnen Sie Ihren TDEE alle 10 verlorenen Pfund neu."
        },
        {
          "question": "Wie viel Protein sollte ich während eines Defizits essen?",
          "answer": "Forschung legt 0,7–1 Gramm Protein pro Pfund Zielkörpergewicht nahe, um Muskelmasse während eines Defizits zu erhalten. Für ein 180-Pfund-Zielgewicht sind das 126–180 g Protein pro Tag. Höhere Proteinzufuhr erhöht auch die Sättigung und hilft Ihnen, sich mit weniger Kalorien voller zu fühlen."
        },
        {
          "question": "Kann ich ohne Sport abnehmen?",
          "answer": "Ja — Gewichtsverlust wird hauptsächlich durch ein Kaloriendefizit angetrieben, das allein durch Ernährung erreicht werden kann. Jedoch hilft Sport (besonders Krafttraining) dabei, Muskelmasse zu erhalten, die Stoffwechselrate zu steigern, die Stimmung zu verbessern und führt zu besserer Körperzusammensetzung. Eine Kombination aus Ernährung und Sport erzeugt die besten langfristigen Ergebnisse."
        },
        {
          "question": "Was passiert, wenn ich zu wenig Kalorien esse?",
          "answer": "Zu wenig Kalorien zu essen kann Müdigkeit, Nährstoffmängel, Muskelverlust, hormonelle Störungen und Stoffwechselverlangsamung verursachen. Sehr kalorienarme Diäten (<1.200 kcal für Frauen, <1.500 für Männer) können Essanfall-Zyklen auslösen und langfristigen Gewichtsverlust tatsächlich erschweren. Ein moderates Defizit mit nährstoffreichen Lebensmitteln ist weitaus effektiver und nachhaltiger."
        }
      ],
      "chart": {
        "title": "Gewichtsverlust-Prognose",
        "xLabel": "Woche",
        "yLabel": "Gewicht",
        "series": {
          "weight": "Prognostiziertes Gewicht",
          "goalWeight": "Zielgewicht"
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

  /* ── inputs ── */
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
      id: "formula",
      type: "select",
      defaultValue: "mifflin",
      options: [
        { value: "mifflin" },
        { value: "harris" },
        { value: "katch" },
      ],
    },
    {
      id: "bodyFatPercent",
      type: "number",
      defaultValue: null,
      placeholder: "20",
      min: 3,
      max: 60,
      suffix: "%",
      showWhen: { field: "formula", value: "katch" },
    },
    {
      id: "goalWeight",
      type: "number",
      defaultValue: null,
      placeholder: "160",
      unitType: "weight",
      syncGroup: false,
      defaultUnit: "lbs",
      allowedUnits: ["kg", "lbs", "st"],
    },
    {
      id: "deficitLevel",
      type: "select",
      defaultValue: "moderate",
      options: [
        { value: "mild" },
        { value: "moderate" },
        { value: "aggressive" },
        { value: "extreme" },
      ],
    },
  ],

  inputGroups: [],

  /* ── results ── */
  results: [
    { id: "tdee", type: "primary", format: "number" },
    { id: "targetCalories", type: "primary", format: "number" },
    { id: "bmr", type: "secondary", format: "number" },
    { id: "dailyDeficit", type: "secondary", format: "number" },
    { id: "weeklyLoss", type: "secondary", format: "text" },
    { id: "weeksToGoal", type: "secondary", format: "text" },
  ],

  /* ── infoCards ── */
  infoCards: [
    { id: "macros", type: "list", icon: "📊", itemCount: 4 },
    { id: "plan", type: "list", icon: "🎯", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  /* ── chart ── */
  chart: {
    id: "weightProjection",
    type: "composed",
    xKey: "week",
    height: 320,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "number",
    series: [
      { key: "weight", type: "area", color: "#3b82f6" },
      { key: "goalWeight", type: "line", color: "#10b981", dashed: true },
    ],
  },

  /* ── detailedTable ── */
  detailedTable: {
    id: "deficitOptions",
    buttonLabel: "View All Deficit Options",
    buttonIcon: "📋",
    modalTitle: "Calorie Deficit Comparison",
    columns: [
      { id: "deficitPct", label: "Deficit %", align: "center" },
      { id: "dailyCal", label: "Daily Calories", align: "right", highlight: true },
      { id: "dailyDeficit", label: "Daily Deficit", align: "right" },
      { id: "weeklyLoss", label: "Weekly Loss", align: "right" },
      { id: "weeksToGoal", label: "Weeks to Goal", align: "center" },
      { id: "rating", label: "Sustainability", align: "center" },
    ],
  },

  referenceData: [],

  /* ── education ── */
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
      authors: "Mifflin MD, St Jeor ST, Hill LA, Scott BJ, Daugherty SA, Koh YO",
      year: "1990",
      title:
        "A new predictive equation for resting energy expenditure in healthy individuals",
      source: "American Journal of Clinical Nutrition",
      url: "https://pubmed.ncbi.nlm.nih.gov/2305711/",
    },
    {
      authors: "Academy of Nutrition and Dietetics",
      year: "2024",
      title: "Adult Weight Management: Determination of Resting Metabolic Rate",
      source: "Evidence Analysis Library",
      url: "https://www.andeal.org/template.cfm?template=guide_summary&key=621",
    },
  ],

  hero: {
    icon: "🔥",
    gradient: "from-orange-500 to-red-500",
  },
  sidebar: { show: true },
  features: { save: true, pdf: true, csv: true, excel: true, share: true },
  relatedCalculators: [
    "bmi-calculator",
    "body-fat-calculator",
    "macro-calculator",
    "ideal-weight-calculator",
    "maintenance-calories-calculator",
  ],
  ads: { sidebar: true, footer: true },
};

/* ═══════════════════════════ CALCULATE ═══════════════════════════ */

export function calculateCaloricDeficit(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  /* ── read inputs ── */
  const gender = (values.gender as string) || "male";
  const age = (values.age as number) || 30;
  const formula = (values.formula as string) || "mifflin";
  const bodyFatPercent = values.bodyFatPercent as number | null;
  const activityLevel = (values.activityLevel as string) || "moderate";
  const deficitLevel = (values.deficitLevel as string) || "moderate";

  /* ── convert units to base (kg, cm) ── */
  const weightKg = values.weight
    ? convertToBase(values.weight as number, fieldUnits.weight || "lbs", "weight")
    : null;

  const heightCm = values.height
    ? convertToBase(
        values.height as number,
        fieldUnits.height || "in",
        "height"
      )
    : null;

  const goalWeightKg = values.goalWeight
    ? convertToBase(
        values.goalWeight as number,
        fieldUnits.goalWeight || "lbs",
        "weight"
      )
    : null;

  /* ── validate ── */
  if (!weightKg || !heightCm || heightCm <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  if (formula === "katch" && (!bodyFatPercent || bodyFatPercent <= 0)) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  /* ── BMR calculation ── */
  let bmr: number;

  if (formula === "katch" && bodyFatPercent) {
    // Katch-McArdle: BMR = 370 + 21.6 × LBM(kg)
    const lbm = weightKg * (1 - bodyFatPercent / 100);
    bmr = 370 + 21.6 * lbm;
  } else if (formula === "harris") {
    // Revised Harris-Benedict
    if (gender === "male") {
      bmr = 13.397 * weightKg + 4.799 * heightCm - 5.677 * age + 88.362;
    } else {
      bmr = 9.247 * weightKg + 3.098 * heightCm - 4.33 * age + 447.593;
    }
  } else {
    // Mifflin-St Jeor (default)
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }
  }

  /* ── activity multiplier → TDEE ── */
  const ACTIVITY: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };
  const multiplier = ACTIVITY[activityLevel] || 1.55;
  const tdee = bmr * multiplier;

  /* ── deficit ── */
  const DEFICIT_PCT: Record<string, number> = {
    mild: 0.1,
    moderate: 0.2,
    aggressive: 0.25,
    extreme: 0.3,
  };
  const deficitPct = DEFICIT_PCT[deficitLevel] || 0.2;
  const targetCalories = Math.round(tdee * (1 - deficitPct));
  const dailyDeficit = Math.round(tdee - targetCalories);

  /* ── safety floor ── */
  const minCal = gender === "female" ? 1200 : 1500;
  const safeCal = Math.max(targetCalories, minCal);
  const safeDeficit = Math.round(tdee - safeCal);

  /* ── weekly loss (lbs & kg) ── */
  const weeklyLossKg = (safeDeficit * 7) / 7700; // 7700 kcal ≈ 1 kg fat
  const weeklyLossLbs = weeklyLossKg * 2.20462;

  /* ── time to goal ── */
  let weeksToGoal = 0;
  if (goalWeightKg && goalWeightKg < weightKg && weeklyLossKg > 0) {
    const totalToLoseKg = weightKg - goalWeightKg;
    weeksToGoal = Math.ceil(totalToLoseKg / weeklyLossKg);
  }

  /* ── macros (based on safe calories) ── */
  // Protein: 1g per lb of goal weight (or current if no goal)
  const proteinTargetKg = goalWeightKg || weightKg;
  const proteinLbs = proteinTargetKg * 2.20462;
  const proteinG = Math.round(proteinLbs); // 1g per lb
  const proteinCal = proteinG * 4;

  // Fat: 25% of target calories
  const fatCal = Math.round(safeCal * 0.25);
  const fatG = Math.round(fatCal / 9);

  // Carbs: remainder
  const carbsCal = Math.max(0, safeCal - proteinCal - fatCal);
  const carbsG = Math.round(carbsCal / 4);

  /* ── determine weight unit for display ── */
  const wUnit = fieldUnits.weight || "lbs";
  const isLbs = wUnit === "lbs";
  const wLabel = isLbs ? (v["lbs/week"] || "lbs/week") : (v["kg/week"] || "kg/week");
  const weeklyDisplay = isLbs ? weeklyLossLbs : weeklyLossKg;
  const goalDisplay = goalWeightKg
    ? isLbs
      ? `${fmtNum(Math.round(goalWeightKg * 2.20462))} lbs`
      : `${fmtNum(Math.round(goalWeightKg))} kg`
    : "—";

  const calUnit = v["cal/day"] || "cal/day";
  const deficitWord = v["deficit"] || "deficit";
  const weekLabel =
    weeksToGoal === 1 ? (v["week"] || "week") : (v["weeks"] || "weeks");

  /* ── chart data — weight projection ── */
  const chartData: Array<Record<string, unknown>> = [];
  if (goalWeightKg && weeksToGoal > 0) {
    const maxWeeks = Math.min(weeksToGoal + 4, 104); // cap at 2 years
    let currentW = isLbs ? weightKg * 2.20462 : weightKg;
    const goalW = isLbs ? goalWeightKg * 2.20462 : goalWeightKg;
    const weeklyDrop = isLbs ? weeklyLossLbs : weeklyLossKg;

    for (let w = 0; w <= maxWeeks; w++) {
      chartData.push({
        week: `W${w}`,
        weight: Math.round(Math.max(currentW, goalW) * 10) / 10,
        goalWeight: Math.round(goalW * 10) / 10,
      });
      currentW -= weeklyDrop;
    }
  }

  /* ── detailed table — deficit comparison ── */
  const tableData: Array<Record<string, string>> = [];
  const pctOptions = [
    { pct: 0.1, label: "10%", rating: "🟢 Very Easy" },
    { pct: 0.15, label: "15%", rating: "🟢 Easy" },
    { pct: 0.2, label: "20%", rating: "🟡 Moderate" },
    { pct: 0.25, label: "25%", rating: "🟠 Challenging" },
    { pct: 0.3, label: "30%", rating: "🔴 Hard" },
    { pct: 0.35, label: "35%", rating: "🔴 Very Hard" },
  ];

  for (const opt of pctOptions) {
    const cal = Math.max(Math.round(tdee * (1 - opt.pct)), minCal);
    const def = Math.round(tdee - cal);
    const wlKg = (def * 7) / 7700;
    const wl = isLbs ? wlKg * 2.20462 : wlKg;
    const wks =
      goalWeightKg && goalWeightKg < weightKg && wlKg > 0
        ? Math.ceil((weightKg - goalWeightKg) / wlKg)
        : 0;

    tableData.push({
      deficitPct: opt.label,
      dailyCal: `${fmtNum(cal)} cal`,
      dailyDeficit: `−${fmtNum(def)} cal`,
      weeklyLoss: `~${wl.toFixed(1)} ${isLbs ? "lbs" : "kg"}`,
      weeksToGoal: wks > 0 ? `${wks} wks` : "—",
      rating: opt.rating,
    });
  }

  /* ── format results ── */
  const bmrRound = Math.round(bmr);
  const tdeeRound = Math.round(tdee);

  return {
    values: {
      bmr: bmrRound,
      tdee: tdeeRound,
      targetCalories: safeCal,
      dailyDeficit: safeDeficit,
      weeklyLoss: weeklyDisplay,
      weeksToGoal,
      proteinG,
      proteinCal,
      carbsG,
      fatG,
      goalWeightFormatted: goalDisplay,
    },
    formatted: {
      bmr: `${fmtNum(bmrRound)} ${calUnit}`,
      tdee: `${fmtNum(tdeeRound)} ${calUnit}`,
      targetCalories: `${fmtNum(safeCal)} ${calUnit}`,
      dailyDeficit: `${fmtNum(safeDeficit)} ${v["cal"] || "cal"} ${deficitWord}`,
      weeklyLoss: `~${weeklyDisplay.toFixed(1)} ${wLabel}`,
      weeksToGoal:
        weeksToGoal > 0 ? `~${weeksToGoal} ${weekLabel}` : "Set a goal weight",
      proteinG: `${proteinG}${v["g"] || "g"} (${v["protein"] || "Protein"})`,
      carbsG: `${carbsG}${v["g"] || "g"} (${v["carbs"] || "Carbs"})`,
      fatG: `${fatG}${v["g"] || "g"} (${v["fat"] || "Fat"})`,
      proteinCal: `${fmtNum(proteinCal)} ${v["cal"] || "cal"}`,
      goalWeightFormatted: goalDisplay,
    },
    summary:
      f.summary
        ?.replace("{targetCalories}", fmtNum(safeCal))
        .replace("{dailyDeficit}", fmtNum(safeDeficit))
        .replace("{weeksToGoal}", String(weeksToGoal || "—")) || "",
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default caloricDeficitCalculatorConfig;
