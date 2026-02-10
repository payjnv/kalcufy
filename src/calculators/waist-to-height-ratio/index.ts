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
