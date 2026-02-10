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
