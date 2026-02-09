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
