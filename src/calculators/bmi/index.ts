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
