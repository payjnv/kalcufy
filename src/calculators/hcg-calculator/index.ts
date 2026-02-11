import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

// ══════════════════════════════════════════════════════════════════════════════
// hCG CALCULATOR — V4.3 Engine
// ══════════════════════════════════════════════════════════════════════════════
// Features: Repeater (2-6 blood draws), doubling time, growth rate,
//           status badge (Normal/Slow/Fast/Declining), twins indicator,
//           hCG progression chart, reference range DetailedTable, IVF toggle
// V4.3 Components: repeater, toggle, select, date
// ══════════════════════════════════════════════════════════════════════════════

export const hcgCalculatorConfig: CalculatorConfigV4 = {
  id: "hcg-calculator",
  version: "4.3",
  slug: "hcg-calculator",
  category: "health",
  icon: "🩸",

  // ═══════════════════════════════════════════════════════════════════════════
  // INPUTS — V4.3 Components (repeater, toggle, date, select)
  // ═══════════════════════════════════════════════════════════════════════════
  inputs: [
    {
      id: "ivfMode",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "transferDate",
      type: "date",
      defaultValue: null,
      showWhen: { field: "ivfMode", value: true },
    },
    {
      id: "embryoDay",
      type: "select",
      defaultValue: "day5",
      options: [
        { value: "day3" },
        { value: "day5" },
      ],
      showWhen: { field: "ivfMode", value: true },
    },
    {
      id: "bloodDraws",
      type: "repeater",
      defaultValue: [
        { drawDate: "", hcgLevel: null },
        { drawDate: "", hcgLevel: null },
      ],
      minRows: 2,
      maxRows: 6,
      addButtonLabel: "+ Add Blood Draw",
      repeaterFields: [
        {
          id: "drawDate",
          type: "date",
          label: "Date",
          width: "half",
        },
        {
          id: "hcgLevel",
          type: "number",
          label: "hCG (mIU/mL)",
          placeholder: "100",
          min: 0,
          max: 300000,
          width: "half",
        },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  inputGroups: [],
  unitSystem: { enabled: false, default: "metric" },

  // ═══════════════════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════════════════
  results: [
    { id: "doublingTime", type: "primary", format: "text" },
    { id: "growthRate", type: "secondary", format: "text" },
    { id: "status", type: "secondary", format: "text" },
    { id: "latestHcg", type: "secondary", format: "number" },
    { id: "estimatedWeek", type: "secondary", format: "text" },
    { id: "twinsIndicator", type: "secondary", format: "text" },
    { id: "daysBetween", type: "secondary", format: "text" },
    { id: "firstDraw", type: "secondary", format: "text" },
    { id: "lastDraw", type: "secondary", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // CHART — hCG Progression (line)
  // ═══════════════════════════════════════════════════════════════════════════
  chart: {
    id: "hcgProgression",
    type: "composed",
    xKey: "label",
    height: 320,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "number",
    series: [
      { key: "hcg", type: "line", color: "#e11d48" },
      { key: "normalLow", type: "area", color: "#dcfce7" },
      { key: "normalHigh", type: "area", color: "#dcfce7" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DETAILED TABLE — hCG Reference Ranges
  // ═══════════════════════════════════════════════════════════════════════════
  detailedTable: {
    id: "hcgReferenceRanges",
    buttonLabel: "View hCG Reference Ranges",
    buttonIcon: "📊",
    modalTitle: "Normal hCG Levels by Gestational Week",
    columns: [
      { id: "week", label: "Gestational Week", align: "center" },
      { id: "low", label: "Low Range (mIU/mL)", align: "right" },
      { id: "high", label: "High Range (mIU/mL)", align: "right", highlight: true },
      { id: "doubling", label: "Typical Doubling", align: "center" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INFOCARDS (2 list + 1 horizontal tips)
  // ═══════════════════════════════════════════════════════════════════════════
  infoCards: [
    { id: "analysis", type: "list", icon: "🔬", itemCount: 4 },
    { id: "details", type: "list", icon: "📋", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION (2 prose, 2 list, 1 code-example)
  // ═══════════════════════════════════════════════════════════════════════════
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "levels", type: "list", icon: "📊", itemCount: 6 },
    { id: "concerns", type: "list", icon: "⚠️", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // FAQs (8)
  // ═══════════════════════════════════════════════════════════════════════════
  faqs: [
    { id: "0" }, { id: "1" }, { id: "2" }, { id: "3" },
    { id: "4" }, { id: "5" }, { id: "6" }, { id: "7" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════════════════
  references: [
    {
      authors: "Barnhart KT, Sammel MD, Rinaudo PF, Zhou L, Hummel AC, Guo W",
      year: "2004",
      title: "Symptomatic patients with an early viable intrauterine pregnancy: HCG curves redefined",
      source: "Obstetrics & Gynecology, 104(1), 50-55",
      url: "https://pubmed.ncbi.nlm.nih.gov/15229000/",
    },
    {
      authors: "Morse CB, Sammel MD, Shaunik A, Allen-Taylor L, Oberfoell NL, Takacs P, Chung K, Barnhart KT",
      year: "2012",
      title: "Performance of human chorionic gonadotropin curves in women at risk for ectopic pregnancy",
      source: "Fertility and Sterility, 97(1), 101-106",
      url: "https://pubmed.ncbi.nlm.nih.gov/22192138/",
    },
    {
      authors: "Cole LA",
      year: "2009",
      title: "New discoveries on the biology and detection of human chorionic gonadotropin",
      source: "Reproductive Biology and Endocrinology, 7, 8",
      url: "https://pubmed.ncbi.nlm.nih.gov/19171054/",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // PRESETS (4)
  // ═══════════════════════════════════════════════════════════════════════════
  presets: [
    {
      id: "normalEarly",
      icon: "✅",
      values: {
        ivfMode: false,
        bloodDraws: [
          { drawDate: "2026-02-01", hcgLevel: 120 },
          { drawDate: "2026-02-03", hcgLevel: 280 },
        ],
      },
    },
    {
      id: "rapidGrowth",
      icon: "📈",
      values: {
        ivfMode: false,
        bloodDraws: [
          { drawDate: "2026-01-28", hcgLevel: 85 },
          { drawDate: "2026-01-30", hcgLevel: 220 },
          { drawDate: "2026-02-01", hcgLevel: 580 },
        ],
      },
    },
    {
      id: "ivfMonitoring",
      icon: "🔬",
      values: {
        ivfMode: true,
        transferDate: "2026-01-15",
        embryoDay: "day5",
        bloodDraws: [
          { drawDate: "2026-01-24", hcgLevel: 48 },
          { drawDate: "2026-01-26", hcgLevel: 125 },
          { drawDate: "2026-01-28", hcgLevel: 310 },
        ],
      },
    },
    {
      id: "slowDoubling",
      icon: "⚠️",
      values: {
        ivfMode: false,
        bloodDraws: [
          { drawDate: "2026-02-01", hcgLevel: 200 },
          { drawDate: "2026-02-04", hcgLevel: 340 },
        ],
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // TRANSLATIONS
  // ═══════════════════════════════════════════════════════════════════════════
  t: {
    en: {
      name: "hCG Calculator",
      slug: "hcg-calculator",
      subtitle: "Track your hCG blood draw levels, calculate doubling time, and compare against normal pregnancy ranges with visual charts",
      breadcrumb: "hCG",

      seo: {
        title: "hCG Calculator — Doubling Time & Level Tracker | Free",
        description: "Calculate hCG doubling time from 2-6 blood draws. Track levels against normal ranges, detect slow/fast growth, and get twins probability indicator. IVF mode included.",
        shortDescription: "Track hCG levels and calculate doubling time with visual charts and normal range comparison",
        keywords: [
          "hcg calculator",
          "hcg doubling time calculator",
          "hcg levels chart",
          "beta hcg calculator",
          "hcg blood test calculator",
          "hcg level tracker",
          "pregnancy hcg levels",
          "ivf hcg calculator",
        ],
      },

      calculator: { yourInformation: "Blood Draw Information" },
      ui: { yourInformation: "Blood Draw Information", calculate: "Calculate", reset: "Reset", results: "Results" },

      inputs: {
        ivfMode: {
          label: "IVF / Fertility Treatment",
          helpText: "Enable to calculate days post-transfer (DPT) and use IVF-specific reference ranges",
        },
        transferDate: {
          label: "Embryo Transfer Date",
          helpText: "The date your embryo was transferred to the uterus",
        },
        embryoDay: {
          label: "Embryo Stage",
          helpText: "Day 3 (cleavage) or Day 5 (blastocyst) — affects DPT calculation",
          options: {
            day3: "Day 3 (Cleavage Stage)",
            day5: "Day 5 (Blastocyst)",
          },
        },
        bloodDraws: {
          label: "Blood Draw Results",
          helpText: "Enter at least 2 blood draws with dates and hCG levels in mIU/mL",
          addButton: "+ Add Blood Draw",
          fields: {
            drawDate: { label: "Draw Date" },
            hcgLevel: { label: "hCG Level (mIU/mL)" },
          },
        },
      },

      results: {
        doublingTime: { label: "hCG Doubling Time" },
        growthRate: { label: "Daily Growth Rate" },
        status: { label: "Growth Status" },
        latestHcg: { label: "Latest hCG Level" },
        estimatedWeek: { label: "Estimated Gestational Week" },
        twinsIndicator: { label: "Multiples Indicator" },
        daysBetween: { label: "Days Between Draws" },
        firstDraw: { label: "First Draw" },
        lastDraw: { label: "Last Draw" },
      },

      presets: {
        normalEarly: { label: "Normal Early (5 wk)", description: "2 draws, normal doubling ~36h" },
        rapidGrowth: { label: "Rapid Growth", description: "3 draws, fast doubling — possible twins" },
        ivfMonitoring: { label: "IVF Monitoring", description: "Day 5 blastocyst, 3 post-transfer draws" },
        slowDoubling: { label: "Slow Doubling", description: "2 draws, 72h+ doubling time" },
      },

      values: {
        hours: "hours",
        normal: "✅ Normal",
        slow: "⚠️ Slow Doubling",
        fast: "📈 Faster Than Expected",
        declining: "🔴 Declining",
        possibleTwins: "👶👶 Possible Twins/Multiples",
        singletonLikely: "👶 Singleton Likely",
        tooEarly: "Too Early to Determine",
      },

      formats: {
        summary: "Your hCG doubling time is {doublingTime}. Latest level: {latestHcg} mIU/mL. Status: {status}.",
      },

      infoCards: {
        analysis: {
          title: "hCG Analysis",
          items: [
            { label: "Doubling Time", valueKey: "doublingTime" },
            { label: "Growth Status", valueKey: "status" },
            { label: "Daily Growth Rate", valueKey: "growthRate" },
            { label: "Multiples Indicator", valueKey: "twinsIndicator" },
          ],
        },
        details: {
          title: "Draw Details",
          items: [
            { label: "Latest hCG", valueKey: "latestHcg" },
            { label: "Estimated Week", valueKey: "estimatedWeek" },
            { label: "First Draw", valueKey: "firstDraw" },
            { label: "Last Draw", valueKey: "lastDraw" },
          ],
        },
        tips: {
          title: "Understanding Your hCG Results",
          items: [
            "hCG doubling time varies widely in normal pregnancies — anywhere from 31 to 72 hours in early pregnancy is considered normal",
            "A single hCG value tells very little. The TREND over multiple draws is far more important than any individual number",
            "Above 6,000 mIU/mL, hCG rises more slowly — doubling time of 96+ hours is normal at higher levels",
            "Only your healthcare provider can interpret your results in context. This calculator is for information, not diagnosis",
          ],
        },
      },

      chart: {
        title: "hCG Progression",
        xLabel: "Draw",
        yLabel: "hCG (mIU/mL)",
        series: {
          hcg: "Your hCG Level",
          normalLow: "Normal Low",
          normalHigh: "Normal High",
        },
      },

      education: {
        whatIs: {
          title: "What Is hCG and Why Is It Measured?",
          content: "Human Chorionic Gonadotropin (hCG) is a hormone produced by the placenta after a fertilized egg implants in the uterus. It's the hormone detected by pregnancy tests and is one of the earliest measurable indicators of pregnancy. Blood tests (quantitative beta-hCG) measure the exact amount of hCG in your bloodstream, expressed in milli-international units per milliliter (mIU/mL). In early pregnancy, hCG levels approximately double every 48-72 hours. Healthcare providers use serial hCG measurements — two or more draws taken days apart — to assess whether a pregnancy is progressing normally. The rate of hCG increase is more clinically meaningful than any single value.",
        },
        howItWorks: {
          title: "How hCG Doubling Time Is Calculated",
          content: "Doubling time is calculated using the exponential growth formula: DT = (t × ln(2)) / ln(hCG₂/hCG₁), where t is the time between draws in hours, and hCG₁ and hCG₂ are the two hCG values. This formula assumes exponential growth, which is accurate for early pregnancy when hCG is below approximately 6,000 mIU/mL. After hCG exceeds 6,000, the growth rate naturally slows, and doubling time increases — this is completely normal. Peak hCG levels (typically 25,000-288,000 mIU/mL) occur around weeks 9-12, after which levels gradually decline and plateau for the remainder of pregnancy.",
        },
        levels: {
          title: "Normal hCG Levels by Week",
          items: [
            { text: "Week 3 (1 week after ovulation): 5-50 mIU/mL. hCG is just becoming detectable. Some home tests may not show positive yet.", type: "info" },
            { text: "Week 4 (missed period): 5-426 mIU/mL. Wide range is normal — implantation timing varies significantly between pregnancies.", type: "info" },
            { text: "Week 5: 18-7,340 mIU/mL. Doubling time should be 48-72 hours. Gestational sac may be visible on ultrasound above 1,500-2,000.", type: "info" },
            { text: "Week 6: 1,080-56,500 mIU/mL. Heartbeat may be detectable on transvaginal ultrasound. Doubling rate begins to slow.", type: "info" },
            { text: "Weeks 7-8: 7,650-229,000 mIU/mL. Morning sickness often peaks. Doubling time extends to 72-96 hours.", type: "info" },
            { text: "Weeks 9-12 (peak): 25,700-288,000 mIU/mL. hCG peaks and begins to decline. This is completely normal and expected.", type: "warning" },
          ],
        },
        concerns: {
          title: "When to Be Concerned",
          items: [
            { text: "Slow doubling (>72h when hCG <1,200): May indicate ectopic pregnancy or non-viable pregnancy, but can also occur in normal pregnancies. Always discuss with your provider.", type: "warning" },
            { text: "Declining hCG: A drop in hCG levels before week 9-10 may indicate miscarriage. However, a single low draw doesn't confirm this — always get a repeat draw.", type: "warning" },
            { text: "Very high hCG: Levels significantly above the normal range may indicate twins/multiples, molar pregnancy, or simply normal variation. Ultrasound is needed for diagnosis.", type: "info" },
            { text: "Plateau before peak: hCG that stops rising before reaching expected peak levels may need investigation. Your doctor will consider the full clinical picture.", type: "warning" },
            { text: "IVF pregnancies: hCG patterns may differ slightly in IVF pregnancies. Day 5 blastocyst transfers typically show first positive beta at 9-11 days post-transfer.", type: "info" },
            { text: "No single hCG value is diagnostic: The trend matters more than any individual number. Two draws 48-72 hours apart give much more information than one.", type: "info" },
          ],
        },
        examples: {
          title: "hCG Doubling Time Examples",
          description: "How to interpret real-world hCG draw results",
          examples: [
            {
              title: "Normal Doubling — Week 5",
              steps: [
                "Draw 1: Feb 1, hCG = 120 mIU/mL",
                "Draw 2: Feb 3, hCG = 280 mIU/mL",
                "Time between: 48 hours",
                "DT = (48 × ln(2)) / ln(280/120)",
                "DT = (48 × 0.693) / 0.847 = 39.3 hours",
                "Status: ✅ Normal (31-72h expected below 1,200)",
              ],
              result: "Doubling Time: 39.3 hours — Normal healthy progression",
            },
            {
              title: "IVF Day 5 — 3 Draws",
              steps: [
                "Transfer: Jan 15, Day 5 blastocyst",
                "Draw 1 (9 DPT): Jan 24, hCG = 48",
                "Draw 2 (11 DPT): Jan 26, hCG = 125",
                "Draw 3 (13 DPT): Jan 28, hCG = 310",
                "DT (draws 2→3): (48 × 0.693) / ln(310/125) = 36.6h",
                "hCG >100 at 11 DPT suggests strong implantation",
              ],
              result: "Doubling Time: 36.6h — Excellent progression for IVF",
            },
          ],
        },
      },

      faqs: [
        {
          question: "What is a normal hCG doubling time?",
          answer: "In early pregnancy (hCG below 1,200 mIU/mL), normal doubling time is approximately 48-72 hours, though studies show healthy pregnancies can have doubling times as fast as 31 hours or as slow as 72 hours. When hCG is between 1,200-6,000, doubling time extends to 72-96 hours. Above 6,000 mIU/mL, doubling time can be 96 hours or more and still be completely normal.",
        },
        {
          question: "Does slow hCG doubling mean miscarriage?",
          answer: "Not necessarily. While abnormally slow hCG rise can be associated with ectopic pregnancy or miscarriage, approximately 15-20% of normal pregnancies have slower-than-expected hCG doubling. A single set of draws cannot definitively diagnose any condition. Your healthcare provider will consider the complete clinical picture including ultrasound findings.",
        },
        {
          question: "Can hCG levels indicate twins?",
          answer: "Higher-than-expected hCG levels may suggest twins or multiples, but this is not reliable for diagnosis. Some singleton pregnancies have very high hCG, and some twin pregnancies have normal-range hCG. Ultrasound is the only reliable way to confirm multiple pregnancy, typically visible by weeks 6-7.",
        },
        {
          question: "When does hCG peak during pregnancy?",
          answer: "hCG typically peaks between weeks 9-12 of pregnancy, reaching levels of 25,700-288,000 mIU/mL. After this peak, levels gradually decline throughout the second and third trimesters, stabilizing at lower levels. This decline is completely normal and does not indicate a problem with the pregnancy.",
        },
        {
          question: "How long after IVF transfer should hCG be tested?",
          answer: "Most IVF clinics schedule the first beta-hCG blood test at 9-14 days post-transfer (DPT), depending on whether it was a Day 3 or Day 5 embryo. For Day 5 blastocyst transfers, 9-11 DPT is common. A second draw 48-72 hours later confirms the trend. An hCG above 50-100 at first beta is generally considered a positive sign.",
        },
        {
          question: "What does declining hCG mean?",
          answer: "Declining hCG in early pregnancy (before weeks 9-10) may indicate miscarriage, ectopic pregnancy, or a chemical pregnancy. However, after the first trimester peak (weeks 9-12), declining hCG is completely normal. If your hCG is declining before the expected peak, your doctor will likely order additional tests and an ultrasound.",
        },
        {
          question: "Should I track hCG levels at home?",
          answer: "Home pregnancy tests are qualitative (positive/negative) and cannot measure exact hCG levels. Quantitative beta-hCG testing requires a blood draw at a lab or medical facility. While tracking your numbers can be informative, avoid obsessing over individual values. The overall trend is what matters, and only your healthcare provider can properly interpret the results.",
        },
        {
          question: "Why is there such a wide range of 'normal' hCG levels?",
          answer: "The wide range exists because implantation timing, individual physiology, and genetic factors all affect hCG production. Two healthy pregnancies at the same gestational age can have wildly different hCG levels — one might be 500 and another 5,000, and both be perfectly normal. This is why the rate of change (doubling time) is more clinically useful than the absolute number.",
        },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Calculate", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Calculadora de hCG",
      "slug": "calculadora-hcg",
      "subtitle": "Rastrea los niveles de hCG en análisis de sangre, calcula el tiempo de duplicación y compara con rangos normales de embarazo usando gráficos visuales",
      "breadcrumb": "hCG",
      "seo": {
        "title": "Calculadora de hCG — Tiempo de Duplicación y Seguimiento | Gratis",
        "description": "Calcula el tiempo de duplicación de hCG con 2-6 análisis de sangre. Rastrea niveles contra rangos normales, detecta crecimiento lento/rápido e indicador de probabilidad de gemelos. Modo FIV incluido.",
        "shortDescription": "Rastrea niveles de hCG y calcula tiempo de duplicación con gráficos visuales y comparación de rango normal",
        "keywords": [
          "calculadora hcg",
          "calculadora tiempo duplicacion hcg",
          "tabla niveles hcg",
          "calculadora beta hcg",
          "calculadora analisis sangre hcg",
          "seguimiento nivel hcg",
          "niveles hcg embarazo",
          "calculadora hcg fiv"
        ]
      },
      "inputs": {
        "ivfMode": {
          "label": "FIV / Tratamiento de Fertilidad",
          "helpText": "Habilitar para calcular días post-transferencia (DPT) y usar rangos de referencia específicos de FIV"
        },
        "transferDate": {
          "label": "Fecha de Transferencia Embrionaria",
          "helpText": "La fecha en que tu embrión fue transferido al útero"
        },
        "embryoDay": {
          "label": "Etapa del Embrión",
          "helpText": "Día 3 (segmentación) o Día 5 (blastocisto) — afecta el cálculo DPT",
          "options": {
            "day3": "Día 3 (Etapa de Segmentación)",
            "day5": "Día 5 (Blastocisto)"
          }
        },
        "bloodDraws": {
          "label": "Resultados de Análisis de Sangre",
          "helpText": "Ingresa al menos 2 análisis de sangre con fechas y niveles de hCG en mIU/mL",
          "addButton": "+ Agregar Análisis de Sangre",
          "fields": {
            "drawDate": {
              "label": "Fecha del Análisis"
            },
            "hcgLevel": {
              "label": "Nivel de hCG (mIU/mL)"
            }
          }
        }
      },
      "results": {
        "doublingTime": {
          "label": "Tiempo de Duplicación de hCG"
        },
        "growthRate": {
          "label": "Tasa de Crecimiento Diario"
        },
        "status": {
          "label": "Estado de Crecimiento"
        },
        "latestHcg": {
          "label": "Último Nivel de hCG"
        },
        "estimatedWeek": {
          "label": "Semana Gestacional Estimada"
        },
        "twinsIndicator": {
          "label": "Indicador de Múltiples"
        },
        "daysBetween": {
          "label": "Días Entre Análisis"
        },
        "firstDraw": {
          "label": "Primer Análisis"
        },
        "lastDraw": {
          "label": "Último Análisis"
        }
      },
      "presets": {
        "normalEarly": {
          "label": "Normal Temprano (5 sem)",
          "description": "2 análisis, duplicación normal ~36h"
        },
        "rapidGrowth": {
          "label": "Crecimiento Rápido",
          "description": "3 análisis, duplicación rápida — posibles gemelos"
        },
        "ivfMonitoring": {
          "label": "Monitoreo FIV",
          "description": "Blastocisto día 5, 3 análisis post-transferencia"
        },
        "slowDoubling": {
          "label": "Duplicación Lenta",
          "description": "2 análisis, tiempo de duplicación 72h+"
        }
      },
      "values": {
        "hours": "horas",
        "normal": "✅ Normal",
        "slow": "⚠️ Duplicación Lenta",
        "fast": "📈 Más Rápido de lo Esperado",
        "declining": "🔴 En Declive",
        "possibleTwins": "👶👶 Posibles Gemelos/Múltiples",
        "singletonLikely": "👶 Probable Único",
        "tooEarly": "Muy Temprano para Determinar"
      },
      "formats": {
        "summary": "Tu tiempo de duplicación de hCG es {doublingTime}. Último nivel: {latestHcg} mIU/mL. Estado: {status}."
      },
      "infoCards": {
        "analysis": {
          "title": "Análisis de hCG",
          "items": [
            {
              "label": "Tiempo de Duplicación",
              "valueKey": "doublingTime"
            },
            {
              "label": "Estado de Crecimiento",
              "valueKey": "status"
            },
            {
              "label": "Tasa de Crecimiento Diario",
              "valueKey": "growthRate"
            },
            {
              "label": "Indicador de Múltiples",
              "valueKey": "twinsIndicator"
            }
          ]
        },
        "details": {
          "title": "Detalles del Análisis",
          "items": [
            {
              "label": "Último hCG",
              "valueKey": "latestHcg"
            },
            {
              "label": "Semana Estimada",
              "valueKey": "estimatedWeek"
            },
            {
              "label": "Primer Análisis",
              "valueKey": "firstDraw"
            },
            {
              "label": "Último Análisis",
              "valueKey": "lastDraw"
            }
          ]
        },
        "tips": {
          "title": "Entendiendo tus Resultados de hCG",
          "items": [
            "El tiempo de duplicación de hCG varía ampliamente en embarazos normales — cualquier valor entre 31 a 72 horas en el embarazo temprano se considera normal",
            "Un solo valor de hCG dice muy poco. La TENDENCIA sobre múltiples análisis es mucho más importante que cualquier número individual",
            "Por encima de 6,000 mIU/mL, el hCG aumenta más lentamente — tiempo de duplicación de 96+ horas es normal en niveles altos",
            "Solo tu proveedor de atención médica puede interpretar tus resultados en contexto. Esta calculadora es para información, no diagnóstico"
          ]
        }
      },
      "chart": {
        "title": "Progresión de hCG",
        "xLabel": "Análisis",
        "yLabel": "hCG (mIU/mL)",
        "series": {
          "hcg": "Tu Nivel de hCG",
          "normalLow": "Normal Bajo",
          "normalHigh": "Normal Alto"
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es el hCG y por qué se mide?",
          "content": "La Gonadotropina Coriónica Humana (hCG) es una hormona producida por la placenta después de que un óvulo fertilizado se implante en el útero. Es la hormona detectada por las pruebas de embarazo y es uno de los primeros indicadores medibles de embarazo. Los análisis de sangre (beta-hCG cuantitativo) miden la cantidad exacta de hCG en tu torrente sanguíneo, expresada en mili-unidades internacionales por mililitro (mIU/mL). En el embarazo temprano, los niveles de hCG aproximadamente se duplican cada 48-72 horas. Los proveedores de atención médica usan mediciones seriadas de hCG — dos o más análisis tomados con días de diferencia — para evaluar si un embarazo está progresando normalmente. La tasa de aumento de hCG es más significativa clínicamente que cualquier valor único."
        },
        "howItWorks": {
          "title": "Cómo se Calcula el Tiempo de Duplicación de hCG",
          "content": "El tiempo de duplicación se calcula usando la fórmula de crecimiento exponencial: DT = (t × ln(2)) / ln(hCG₂/hCG₁), donde t es el tiempo entre análisis en horas, y hCG₁ y hCG₂ son los dos valores de hCG. Esta fórmula asume crecimiento exponencial, que es preciso para el embarazo temprano cuando el hCG está por debajo de aproximadamente 6,000 mIU/mL. Después de que el hCG excede 6,000, la tasa de crecimiento naturalmente se ralentiza, y el tiempo de duplicación aumenta — esto es completamente normal. Los niveles pico de hCG (típicamente 25,000-288,000 mIU/mL) ocurren alrededor de las semanas 9-12, después de lo cual los niveles gradualmente declinan y se estabilizan por el resto del embarazo."
        },
        "levels": {
          "title": "Niveles Normales de hCG por Semana",
          "items": [
            {
              "text": "Semana 3 (1 semana después de la ovulación): 5-50 mIU/mL. El hCG apenas se vuelve detectable. Algunas pruebas caseras pueden no mostrar positivo aún.",
              "type": "info"
            },
            {
              "text": "Semana 4 (período perdido): 5-426 mIU/mL. El rango amplio es normal — el tiempo de implantación varía significativamente entre embarazos.",
              "type": "info"
            },
            {
              "text": "Semana 5: 18-7,340 mIU/mL. El tiempo de duplicación debería ser 48-72 horas. El saco gestacional puede ser visible en ultrasonido por encima de 1,500-2,000.",
              "type": "info"
            },
            {
              "text": "Semana 6: 1,080-56,500 mIU/mL. Los latidos pueden ser detectables en ultrasonido transvaginal. La tasa de duplicación comienza a ralentizarse.",
              "type": "info"
            },
            {
              "text": "Semanas 7-8: 7,650-229,000 mIU/mL. Las náuseas matutinas a menudo alcanzan su pico. El tiempo de duplicación se extiende a 72-96 horas.",
              "type": "info"
            },
            {
              "text": "Semanas 9-12 (pico): 25,700-288,000 mIU/mL. El hCG alcanza su pico y comienza a declinar. Esto es completamente normal y esperado.",
              "type": "warning"
            }
          ]
        },
        "concerns": {
          "title": "Cuándo Preocuparse",
          "items": [
            {
              "text": "Duplicación lenta (>72h cuando hCG <1,200): Puede indicar embarazo ectópico o embarazo no viable, pero también puede ocurrir en embarazos normales. Siempre discute con tu proveedor.",
              "type": "warning"
            },
            {
              "text": "hCG en declive: Una caída en los niveles de hCG antes de la semana 9-10 puede indicar aborto espontáneo. Sin embargo, un solo análisis bajo no confirma esto — siempre obtén un análisis de repetición.",
              "type": "warning"
            },
            {
              "text": "hCG muy alto: Niveles significativamente por encima del rango normal pueden indicar gemelos/múltiples, embarazo molar, o simplemente variación normal. Se necesita ultrasonido para diagnóstico.",
              "type": "info"
            },
            {
              "text": "Meseta antes del pico: hCG que deja de aumentar antes de alcanzar los niveles pico esperados puede necesitar investigación. Tu doctor considerará el cuadro clínico completo.",
              "type": "warning"
            },
            {
              "text": "Embarazos FIV: Los patrones de hCG pueden diferir ligeramente en embarazos FIV. Las transferencias de blastocisto día 5 típicamente muestran primera beta positiva a los 9-11 días post-transferencia.",
              "type": "info"
            },
            {
              "text": "Ningún valor único de hCG es diagnóstico: La tendencia importa más que cualquier número individual. Dos análisis con 48-72 horas de diferencia dan mucha más información que uno.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Tiempo de Duplicación de hCG",
          "description": "Cómo interpretar resultados reales de análisis de hCG",
          "examples": [
            {
              "title": "Duplicación Normal — Semana 5",
              "steps": [
                "Análisis 1: 1 Feb, hCG = 120 mIU/mL",
                "Análisis 2: 3 Feb, hCG = 280 mIU/mL",
                "Tiempo entre: 48 horas",
                "DT = (48 × ln(2)) / ln(280/120)",
                "DT = (48 × 0.693) / 0.847 = 39.3 horas",
                "Estado: ✅ Normal (31-72h esperado por debajo de 1,200)"
              ],
              "result": "Tiempo de Duplicación: 39.3 horas — Progresión saludable normal"
            },
            {
              "title": "FIV Día 5 — 3 Análisis",
              "steps": [
                "Transferencia: 15 Ene, blastocisto día 5",
                "Análisis 1 (9 DPT): 24 Ene, hCG = 48",
                "Análisis 2 (11 DPT): 26 Ene, hCG = 125",
                "Análisis 3 (13 DPT): 28 Ene, hCG = 310",
                "DT (análisis 2→3): (48 × 0.693) / ln(310/125) = 36.6h",
                "hCG >100 a los 11 DPT sugiere implantación fuerte"
              ],
              "result": "Tiempo de Duplicación: 36.6h — Excelente progresión para FIV"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Qué es un tiempo normal de duplicación de hCG?",
          "answer": "En el embarazo temprano (hCG por debajo de 1,200 mIU/mL), el tiempo normal de duplicación es aproximadamente 48-72 horas, aunque estudios muestran que embarazos saludables pueden tener tiempos de duplicación tan rápidos como 31 horas o tan lentos como 72 horas. Cuando el hCG está entre 1,200-6,000, el tiempo de duplicación se extiende a 72-96 horas. Por encima de 6,000 mIU/mL, el tiempo de duplicación puede ser 96 horas o más y aún ser completamente normal."
        },
        {
          "question": "¿La duplicación lenta de hCG significa aborto espontáneo?",
          "answer": "No necesariamente. Mientras que el aumento anormalmente lento de hCG puede estar asociado con embarazo ectópico o aborto espontáneo, aproximadamente 15-20% de los embarazos normales tienen duplicación de hCG más lenta de lo esperado. Un solo conjunto de análisis no puede diagnosticar definitivamente ninguna condición. Tu proveedor de atención médica considerará el cuadro clínico completo incluyendo hallazgos de ultrasonido."
        },
        {
          "question": "¿Pueden los niveles de hCG indicar gemelos?",
          "answer": "Niveles de hCG más altos de lo esperado pueden sugerir gemelos o múltiples, pero esto no es confiable para diagnóstico. Algunos embarazos únicos tienen hCG muy alto, y algunos embarazos de gemelos tienen hCG en rango normal. El ultrasonido es la única forma confiable de confirmar embarazo múltiple, típicamente visible en las semanas 6-7."
        },
        {
          "question": "¿Cuándo alcanza su pico el hCG durante el embarazo?",
          "answer": "El hCG típicamente alcanza su pico entre las semanas 9-12 del embarazo, alcanzando niveles de 25,700-288,000 mIU/mL. Después de este pico, los niveles gradualmente declinan durante el segundo y tercer trimestre, estabilizándose en niveles más bajos. Este declive es completamente normal y no indica un problema con el embarazo."
        },
        {
          "question": "¿Cuánto tiempo después de la transferencia FIV se debe probar el hCG?",
          "answer": "La mayoría de clínicas FIV programan la primera prueba de beta-hCG en sangre a los 9-14 días post-transferencia (DPT), dependiendo de si fue un embrión día 3 o día 5. Para transferencias de blastocisto día 5, 9-11 DPT es común. Un segundo análisis 48-72 horas después confirma la tendencia. Un hCG por encima de 50-100 en la primera beta generalmente se considera una señal positiva."
        },
        {
          "question": "¿Qué significa hCG en declive?",
          "answer": "hCG en declive en embarazo temprano (antes de las semanas 9-10) puede indicar aborto espontáneo, embarazo ectópico, o embarazo químico. Sin embargo, después del pico del primer trimestre (semanas 9-12), hCG en declive es completamente normal. Si tu hCG está declinando antes del pico esperado, tu doctor probablemente ordenará pruebas adicionales y un ultrasonido."
        },
        {
          "question": "¿Debería rastrear los niveles de hCG en casa?",
          "answer": "Las pruebas de embarazo caseras son cualitativas (positivo/negativo) y no pueden medir niveles exactos de hCG. Las pruebas cuantitativas de beta-hCG requieren un análisis de sangre en un laboratorio o facilidad médica. Mientras que rastrear tus números puede ser informativo, evita obsesionarte con valores individuales. La tendencia general es lo que importa, y solo tu proveedor de atención médica puede interpretar apropiadamente los resultados."
        },
        {
          "question": "¿Por qué hay un rango tan amplio de niveles 'normales' de hCG?",
          "answer": "El rango amplio existe porque el tiempo de implantación, la fisiología individual, y los factores genéticos todos afectan la producción de hCG. Dos embarazos saludables en la misma edad gestacional pueden tener niveles de hCG wildmente diferentes — uno podría ser 500 y otro 5,000, y ambos ser perfectamente normales. Es por esto que la tasa de cambio (tiempo de duplicación) es más útil clínicamente que el número absoluto."
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
      },
      "calculator": {
        "yourInformation": "Tu Información"
      }
    },
    pt: {
      "name": "Calculadora de hCG",
      "slug": "calculadora-hcg",
      "subtitle": "Acompanhe seus níveis de hCG no sangue, calcule o tempo de duplicação e compare com faixas normais de gravidez com gráficos visuais",
      "breadcrumb": "hCG",
      "seo": {
        "title": "Calculadora de hCG — Tempo de Duplicação e Rastreador de Níveis | Grátis",
        "description": "Calcule o tempo de duplicação do hCG a partir de 2-6 coletas de sangue. Acompanhe níveis contra faixas normais, detecte crescimento lento/rápido e obtenha indicador de probabilidade de gêmeos. Modo FIV incluído.",
        "shortDescription": "Acompanhe níveis de hCG e calcule tempo de duplicação com gráficos visuais e comparação de faixa normal",
        "keywords": [
          "calculadora hcg",
          "calculadora tempo duplicação hcg",
          "gráfico níveis hcg",
          "calculadora beta hcg",
          "calculadora exame sangue hcg",
          "rastreador nível hcg",
          "níveis hcg gravidez",
          "calculadora hcg fiv"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "ivfMode": {
          "label": "FIV / Tratamento de Fertilidade",
          "helpText": "Ative para calcular dias pós-transferência (DPT) e usar faixas de referência específicas de FIV"
        },
        "transferDate": {
          "label": "Data da Transferência do Embrião",
          "helpText": "A data em que seu embrião foi transferido para o útero"
        },
        "embryoDay": {
          "label": "Estágio do Embrião",
          "helpText": "Dia 3 (clivagem) ou Dia 5 (blastocisto) — afeta o cálculo DPT",
          "options": {
            "day3": "Dia 3 (Estágio de Clivagem)",
            "day5": "Dia 5 (Blastocisto)"
          }
        },
        "bloodDraws": {
          "label": "Resultados das Coletas de Sangue",
          "helpText": "Digite pelo menos 2 coletas de sangue com datas e níveis de hCG em mUI/mL",
          "addButton": "+ Adicionar Coleta de Sangue",
          "fields": {
            "drawDate": {
              "label": "Data da Coleta"
            },
            "hcgLevel": {
              "label": "Nível de hCG (mUI/mL)"
            }
          }
        }
      },
      "results": {
        "doublingTime": {
          "label": "Tempo de Duplicação do hCG"
        },
        "growthRate": {
          "label": "Taxa de Crescimento Diário"
        },
        "status": {
          "label": "Status do Crescimento"
        },
        "latestHcg": {
          "label": "Último Nível de hCG"
        },
        "estimatedWeek": {
          "label": "Semana Gestacional Estimada"
        },
        "twinsIndicator": {
          "label": "Indicador de Múltiplos"
        },
        "daysBetween": {
          "label": "Dias Entre Coletas"
        },
        "firstDraw": {
          "label": "Primeira Coleta"
        },
        "lastDraw": {
          "label": "Última Coleta"
        }
      },
      "presets": {
        "normalEarly": {
          "label": "Normal Precoce (5 sem)",
          "description": "2 coletas, duplicação normal ~36h"
        },
        "rapidGrowth": {
          "label": "Crescimento Rápido",
          "description": "3 coletas, duplicação rápida — possíveis gêmeos"
        },
        "ivfMonitoring": {
          "label": "Monitoramento FIV",
          "description": "Blastocisto dia 5, 3 coletas pós-transferência"
        },
        "slowDoubling": {
          "label": "Duplicação Lenta",
          "description": "2 coletas, tempo de duplicação 72h+"
        }
      },
      "values": {
        "hours": "horas",
        "normal": "✅ Normal",
        "slow": "⚠️ Duplicação Lenta",
        "fast": "📈 Mais Rápido que o Esperado",
        "declining": "🔴 Em Declínio",
        "possibleTwins": "👶👶 Possíveis Gêmeos/Múltiplos",
        "singletonLikely": "👶 Provavelmente Único",
        "tooEarly": "Muito Cedo para Determinar"
      },
      "formats": {
        "summary": "Seu tempo de duplicação do hCG é {doublingTime}. Último nível: {latestHcg} mUI/mL. Status: {status}."
      },
      "infoCards": {
        "analysis": {
          "title": "Análise do hCG",
          "items": [
            {
              "label": "Tempo de Duplicação",
              "valueKey": "doublingTime"
            },
            {
              "label": "Status do Crescimento",
              "valueKey": "status"
            },
            {
              "label": "Taxa de Crescimento Diário",
              "valueKey": "growthRate"
            },
            {
              "label": "Indicador de Múltiplos",
              "valueKey": "twinsIndicator"
            }
          ]
        },
        "details": {
          "title": "Detalhes das Coletas",
          "items": [
            {
              "label": "Último hCG",
              "valueKey": "latestHcg"
            },
            {
              "label": "Semana Estimada",
              "valueKey": "estimatedWeek"
            },
            {
              "label": "Primeira Coleta",
              "valueKey": "firstDraw"
            },
            {
              "label": "Última Coleta",
              "valueKey": "lastDraw"
            }
          ]
        },
        "tips": {
          "title": "Entendendo Seus Resultados de hCG",
          "items": [
            "O tempo de duplicação do hCG varia amplamente em gravidezes normais — qualquer coisa entre 31 a 72 horas no início da gravidez é considerada normal",
            "Um único valor de hCG diz muito pouco. A TENDÊNCIA ao longo de múltiplas coletas é muito mais importante que qualquer número individual",
            "Acima de 6.000 mUI/mL, o hCG aumenta mais lentamente — tempo de duplicação de 96+ horas é normal em níveis mais altos",
            "Apenas seu profissional de saúde pode interpretar seus resultados em contexto. Esta calculadora é para informação, não diagnóstico"
          ]
        }
      },
      "chart": {
        "title": "Progressão do hCG",
        "xLabel": "Coleta",
        "yLabel": "hCG (mUI/mL)",
        "series": {
          "hcg": "Seu Nível de hCG",
          "normalLow": "Normal Baixo",
          "normalHigh": "Normal Alto"
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é hCG e Por que é Medido?",
          "content": "A Gonadotrofina Coriônica Humana (hCG) é um hormônio produzido pela placenta após um óvulo fertilizado se implantar no útero. É o hormônio detectado pelos testes de gravidez e é um dos primeiros indicadores mensuráveis de gravidez. Testes sanguíneos (beta-hCG quantitativo) medem a quantidade exata de hCG em sua corrente sanguínea, expressa em mili-unidades internacionais por mililitro (mUI/mL). No início da gravidez, os níveis de hCG aproximadamente dobram a cada 48-72 horas. Profissionais de saúde usam medições seriadas de hCG — duas ou mais coletas feitas com dias de intervalo — para avaliar se uma gravidez está progredindo normalmente. A taxa de aumento do hCG é mais clinicamente significativa que qualquer valor único."
        },
        "howItWorks": {
          "title": "Como o Tempo de Duplicação do hCG é Calculado",
          "content": "O tempo de duplicação é calculado usando a fórmula de crescimento exponencial: TD = (t × ln(2)) / ln(hCG₂/hCG₁), onde t é o tempo entre coletas em horas, e hCG₁ e hCG₂ são os dois valores de hCG. Esta fórmula assume crescimento exponencial, que é preciso para o início da gravidez quando o hCG está abaixo de aproximadamente 6.000 mUI/mL. Após o hCG exceder 6.000, a taxa de crescimento naturalmente desacelera, e o tempo de duplicação aumenta — isso é completamente normal. Níveis de pico de hCG (tipicamente 25.000-288.000 mUI/mL) ocorrem por volta das semanas 9-12, após as quais os níveis gradualmente diminuem e se estabilizam pelo restante da gravidez."
        },
        "levels": {
          "title": "Níveis Normais de hCG por Semana",
          "items": [
            {
              "text": "Semana 3 (1 semana após ovulação): 5-50 mUI/mL. hCG está apenas se tornando detectável. Alguns testes caseiros podem ainda não mostrar positivo.",
              "type": "info"
            },
            {
              "text": "Semana 4 (menstruação atrasada): 5-426 mUI/mL. Faixa ampla é normal — o tempo de implantação varia significativamente entre gravidezes.",
              "type": "info"
            },
            {
              "text": "Semana 5: 18-7.340 mUI/mL. Tempo de duplicação deve ser 48-72 horas. Saco gestacional pode ser visível no ultrassom acima de 1.500-2.000.",
              "type": "info"
            },
            {
              "text": "Semana 6: 1.080-56.500 mUI/mL. Batimentos cardíacos podem ser detectáveis no ultrassom transvaginal. Taxa de duplicação começa a desacelerar.",
              "type": "info"
            },
            {
              "text": "Semanas 7-8: 7.650-229.000 mUI/mL. Enjoo matinal frequentemente atinge o pico. Tempo de duplicação se estende para 72-96 horas.",
              "type": "info"
            },
            {
              "text": "Semanas 9-12 (pico): 25.700-288.000 mUI/mL. hCG atinge o pico e começa a diminuir. Isso é completamente normal e esperado.",
              "type": "warning"
            }
          ]
        },
        "concerns": {
          "title": "Quando se Preocupar",
          "items": [
            {
              "text": "Duplicação lenta (>72h quando hCG <1.200): Pode indicar gravidez ectópica ou não viável, mas também pode ocorrer em gravidezes normais. Sempre discuta com seu médico.",
              "type": "warning"
            },
            {
              "text": "hCG em declínio: Uma queda nos níveis de hCG antes da semana 9-10 pode indicar aborto. No entanto, uma única coleta baixa não confirma isso — sempre faça uma nova coleta.",
              "type": "warning"
            },
            {
              "text": "hCG muito alto: Níveis significativamente acima da faixa normal podem indicar gêmeos/múltiplos, gravidez molar, ou simplesmente variação normal. Ultrassom é necessário para diagnóstico.",
              "type": "info"
            },
            {
              "text": "Platô antes do pico: hCG que para de subir antes de atingir níveis de pico esperados pode necessitar investigação. Seu médico considerará o quadro clínico completo.",
              "type": "warning"
            },
            {
              "text": "Gravidezes FIV: Padrões de hCG podem diferir ligeiramente em gravidezes FIV. Transferências de blastocisto dia 5 tipicamente mostram primeiro beta positivo em 9-11 dias pós-transferência.",
              "type": "info"
            },
            {
              "text": "Nenhum valor único de hCG é diagnóstico: A tendência importa mais que qualquer número individual. Duas coletas com 48-72 horas de intervalo dão muito mais informação que uma.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Tempo de Duplicação do hCG",
          "description": "Como interpretar resultados reais de coletas de hCG",
          "examples": [
            {
              "title": "Duplicação Normal — Semana 5",
              "steps": [
                "Coleta 1: 1º fev, hCG = 120 mUI/mL",
                "Coleta 2: 3º fev, hCG = 280 mUI/mL",
                "Tempo entre: 48 horas",
                "TD = (48 × ln(2)) / ln(280/120)",
                "TD = (48 × 0,693) / 0,847 = 39,3 horas",
                "Status: ✅ Normal (31-72h esperado abaixo de 1.200)"
              ],
              "result": "Tempo de Duplicação: 39,3 horas — Progressão saudável normal"
            },
            {
              "title": "FIV Dia 5 — 3 Coletas",
              "steps": [
                "Transferência: 15 jan, Blastocisto dia 5",
                "Coleta 1 (9 DPT): 24 jan, hCG = 48",
                "Coleta 2 (11 DPT): 26 jan, hCG = 125",
                "Coleta 3 (13 DPT): 28 jan, hCG = 310",
                "TD (coletas 2→3): (48 × 0,693) / ln(310/125) = 36,6h",
                "hCG >100 em 11 DPT sugere implantação forte"
              ],
              "result": "Tempo de Duplicação: 36,6h — Excelente progressão para FIV"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "O que é um tempo normal de duplicação do hCG?",
          "answer": "No início da gravidez (hCG abaixo de 1.200 mUI/mL), o tempo normal de duplicação é aproximadamente 48-72 horas, embora estudos mostrem que gravidezes saudáveis podem ter tempos de duplicação tão rápidos quanto 31 horas ou tão lentos quanto 72 horas. Quando o hCG está entre 1.200-6.000, o tempo de duplicação se estende para 72-96 horas. Acima de 6.000 mUI/mL, o tempo de duplicação pode ser de 96 horas ou mais e ainda ser completamente normal."
        },
        {
          "question": "Duplicação lenta do hCG significa aborto?",
          "answer": "Não necessariamente. Embora aumento anormalmente lento do hCG possa estar associado com gravidez ectópica ou aborto, aproximadamente 15-20% das gravidezes normais têm duplicação de hCG mais lenta que o esperado. Um único conjunto de coletas não pode definitivamente diagnosticar qualquer condição. Seu profissional de saúde considerará o quadro clínico completo incluindo achados do ultrassom."
        },
        {
          "question": "Níveis de hCG podem indicar gêmeos?",
          "answer": "Níveis de hCG mais altos que o esperado podem sugerir gêmeos ou múltiplos, mas isso não é confiável para diagnóstico. Algumas gravidezes únicas têm hCG muito alto, e algumas gravidezes gemelares têm hCG na faixa normal. Ultrassom é a única forma confiável de confirmar gravidez múltipla, tipicamente visível entre as semanas 6-7."
        },
        {
          "question": "Quando o hCG atinge o pico durante a gravidez?",
          "answer": "O hCG tipicamente atinge o pico entre as semanas 9-12 da gravidez, alcançando níveis de 25.700-288.000 mUI/mL. Após este pico, os níveis gradualmente diminuem durante o segundo e terceiro trimestres, estabilizando em níveis mais baixos. Esta diminuição é completamente normal e não indica problema com a gravidez."
        },
        {
          "question": "Quanto tempo após transferência FIV o hCG deve ser testado?",
          "answer": "A maioria das clínicas de FIV agenda o primeiro teste sanguíneo beta-hCG em 9-14 dias pós-transferência (DPT), dependendo se foi um embrião Dia 3 ou Dia 5. Para transferências de blastocisto Dia 5, 9-11 DPT é comum. Uma segunda coleta 48-72 horas depois confirma a tendência. Um hCG acima de 50-100 no primeiro beta é geralmente considerado sinal positivo."
        },
        {
          "question": "O que significa hCG em declínio?",
          "answer": "hCG em declínio no início da gravidez (antes das semanas 9-10) pode indicar aborto, gravidez ectópica, ou gravidez química. No entanto, após o pico do primeiro trimestre (semanas 9-12), hCG em declínio é completamente normal. Se seu hCG está diminuindo antes do pico esperado, seu médico provavelmente pedirá testes adicionais e ultrassom."
        },
        {
          "question": "Devo acompanhar níveis de hCG em casa?",
          "answer": "Testes de gravidez caseiros são qualitativos (positivo/negativo) e não podem medir níveis exatos de hCG. Teste beta-hCG quantitativo requer coleta de sangue em laboratório ou facility médica. Embora acompanhar seus números possa ser informativo, evite obsessão por valores individuais. A tendência geral é o que importa, e apenas seu profissional de saúde pode interpretar adequadamente os resultados."
        },
        {
          "question": "Por que há uma faixa tão ampla de níveis 'normais' de hCG?",
          "answer": "A faixa ampla existe porque tempo de implantação, fisiologia individual e fatores genéticos todos afetam a produção de hCG. Duas gravidezes saudáveis na mesma idade gestacional podem ter níveis de hCG vastamente diferentes — uma pode ser 500 e outra 5.000, e ambas serem perfeitamente normais. É por isso que a taxa de mudança (tempo de duplicação) é mais clinicamente útil que o número absoluto."
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
      "name": "Calculateur d'hCG",
      "slug": "calculateur-hcg",
      "subtitle": "Suivez vos niveaux d'hCG par prise de sang, calculez le temps de doublement et comparez avec les plages normales de grossesse avec graphiques visuels",
      "breadcrumb": "hCG",
      "seo": {
        "title": "Calculateur d'hCG — Temps de Doublement et Suivi des Niveaux | Gratuit",
        "description": "Calculez le temps de doublement d'hCG à partir de 2-6 prises de sang. Suivez les niveaux par rapport aux plages normales, détectez la croissance lente/rapide et obtenez un indicateur de probabilité de jumeaux. Mode FIV inclus.",
        "shortDescription": "Suivez les niveaux d'hCG et calculez le temps de doublement avec graphiques visuels et comparaison des plages normales",
        "keywords": [
          "calculateur hcg",
          "calculateur temps doublement hcg",
          "graphique niveaux hcg",
          "calculateur beta hcg",
          "calculateur test sanguin hcg",
          "suivi niveau hcg",
          "niveaux hcg grossesse",
          "calculateur hcg fiv"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "ivfMode": {
          "label": "FIV / Traitement de Fertilité",
          "helpText": "Activez pour calculer les jours post-transfert (JPT) et utiliser les plages de référence spécifiques à la FIV"
        },
        "transferDate": {
          "label": "Date de Transfert d'Embryon",
          "helpText": "La date à laquelle votre embryon a été transféré dans l'utérus"
        },
        "embryoDay": {
          "label": "Stade de l'Embryon",
          "helpText": "Jour 3 (clivage) ou Jour 5 (blastocyste) — affecte le calcul JPT",
          "options": {
            "day3": "Jour 3 (Stade de Clivage)",
            "day5": "Jour 5 (Blastocyste)"
          }
        },
        "bloodDraws": {
          "label": "Résultats des Prises de Sang",
          "helpText": "Entrez au moins 2 prises de sang avec les dates et niveaux d'hCG en mUI/mL",
          "addButton": "+ Ajouter Prise de Sang",
          "fields": {
            "drawDate": {
              "label": "Date de Prélèvement"
            },
            "hcgLevel": {
              "label": "Niveau d'hCG (mUI/mL)"
            }
          }
        }
      },
      "results": {
        "doublingTime": {
          "label": "Temps de Doublement d'hCG"
        },
        "growthRate": {
          "label": "Taux de Croissance Quotidien"
        },
        "status": {
          "label": "Statut de Croissance"
        },
        "latestHcg": {
          "label": "Dernier Niveau d'hCG"
        },
        "estimatedWeek": {
          "label": "Semaine de Gestation Estimée"
        },
        "twinsIndicator": {
          "label": "Indicateur de Grossesse Multiple"
        },
        "daysBetween": {
          "label": "Jours Entre les Prélèvements"
        },
        "firstDraw": {
          "label": "Premier Prélèvement"
        },
        "lastDraw": {
          "label": "Dernier Prélèvement"
        }
      },
      "presets": {
        "normalEarly": {
          "label": "Normal Précoce (5 sem)",
          "description": "2 prélèvements, doublement normal ~36h"
        },
        "rapidGrowth": {
          "label": "Croissance Rapide",
          "description": "3 prélèvements, doublement rapide — jumeaux possibles"
        },
        "ivfMonitoring": {
          "label": "Suivi FIV",
          "description": "Blastocyste jour 5, 3 prélèvements post-transfert"
        },
        "slowDoubling": {
          "label": "Doublement Lent",
          "description": "2 prélèvements, temps de doublement 72h+"
        }
      },
      "values": {
        "hours": "heures",
        "normal": "✅ Normal",
        "slow": "⚠️ Doublement Lent",
        "fast": "📈 Plus Rapide que Prévu",
        "declining": "🔴 En Déclin",
        "possibleTwins": "👶👶 Jumeaux/Grossesse Multiple Possible",
        "singletonLikely": "👶 Grossesse Simple Probable",
        "tooEarly": "Trop Tôt pour Déterminer"
      },
      "formats": {
        "summary": "Votre temps de doublement d'hCG est {doublingTime}. Dernier niveau : {latestHcg} mUI/mL. Statut : {status}."
      },
      "infoCards": {
        "analysis": {
          "title": "Analyse d'hCG",
          "items": [
            {
              "label": "Temps de Doublement",
              "valueKey": "doublingTime"
            },
            {
              "label": "Statut de Croissance",
              "valueKey": "status"
            },
            {
              "label": "Taux de Croissance Quotidien",
              "valueKey": "growthRate"
            },
            {
              "label": "Indicateur de Grossesse Multiple",
              "valueKey": "twinsIndicator"
            }
          ]
        },
        "details": {
          "title": "Détails des Prélèvements",
          "items": [
            {
              "label": "Dernier hCG",
              "valueKey": "latestHcg"
            },
            {
              "label": "Semaine Estimée",
              "valueKey": "estimatedWeek"
            },
            {
              "label": "Premier Prélèvement",
              "valueKey": "firstDraw"
            },
            {
              "label": "Dernier Prélèvement",
              "valueKey": "lastDraw"
            }
          ]
        },
        "tips": {
          "title": "Comprendre Vos Résultats d'hCG",
          "items": [
            "Le temps de doublement d'hCG varie largement dans les grossesses normales — entre 31 et 72 heures en début de grossesse est considéré comme normal",
            "Une seule valeur d'hCG révèle très peu. La TENDANCE sur plusieurs prélèvements est bien plus importante que n'importe quel chiffre individuel",
            "Au-dessus de 6 000 mUI/mL, l'hCG augmente plus lentement — un temps de doublement de 96h+ est normal aux niveaux élevés",
            "Seul votre professionnel de santé peut interpréter vos résultats en contexte. Ce calculateur est informatif, pas diagnostique"
          ]
        }
      },
      "chart": {
        "title": "Progression d'hCG",
        "xLabel": "Prélèvement",
        "yLabel": "hCG (mUI/mL)",
        "series": {
          "hcg": "Votre Niveau d'hCG",
          "normalLow": "Normal Bas",
          "normalHigh": "Normal Haut"
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que l'hCG et Pourquoi est-elle Mesurée ?",
          "content": "La Gonadotrophine Chorionique Humaine (hCG) est une hormone produite par le placenta après qu'un ovule fécondé s'implante dans l'utérus. C'est l'hormone détectée par les tests de grossesse et l'un des premiers indicateurs mesurables de grossesse. Les tests sanguins (bêta-hCG quantitatif) mesurent la quantité exacte d'hCG dans votre circulation sanguine, exprimée en milli-unités internationales par millilitre (mUI/mL). En début de grossesse, les niveaux d'hCG doublent approximativement toutes les 48-72 heures. Les professionnels de santé utilisent des mesures d'hCG en série — deux prélèvements ou plus pris à quelques jours d'intervalle — pour évaluer si une grossesse progresse normalement. Le taux d'augmentation d'hCG est plus significatif cliniquement que n'importe quelle valeur unique."
        },
        "howItWorks": {
          "title": "Comment le Temps de Doublement d'hCG est Calculé",
          "content": "Le temps de doublement est calculé en utilisant la formule de croissance exponentielle : TD = (t × ln(2)) / ln(hCG₂/hCG₁), où t est le temps entre les prélèvements en heures, et hCG₁ et hCG₂ sont les deux valeurs d'hCG. Cette formule suppose une croissance exponentielle, qui est précise pour le début de grossesse quand l'hCG est en dessous d'approximativement 6 000 mUI/mL. Après que l'hCG dépasse 6 000, le taux de croissance ralentit naturellement, et le temps de doublement augmente — c'est complètement normal. Les niveaux pic d'hCG (typiquement 25 000-288 000 mUI/mL) se produisent vers les semaines 9-12, après quoi les niveaux déclinent graduellement et se stabilisent pour le reste de la grossesse."
        },
        "levels": {
          "title": "Niveaux d'hCG Normaux par Semaine",
          "items": [
            {
              "text": "Semaine 3 (1 semaine après ovulation) : 5-50 mUI/mL. L'hCG devient juste détectable. Certains tests maison peuvent ne pas encore être positifs.",
              "type": "info"
            },
            {
              "text": "Semaine 4 (règles manquées) : 5-426 mUI/mL. Une large plage est normale — le timing d'implantation varie significativement entre grossesses.",
              "type": "info"
            },
            {
              "text": "Semaine 5 : 18-7 340 mUI/mL. Le temps de doublement devrait être 48-72 heures. Le sac gestationnel peut être visible à l'échographie au-dessus de 1 500-2 000.",
              "type": "info"
            },
            {
              "text": "Semaine 6 : 1 080-56 500 mUI/mL. Le rythme cardiaque peut être détectable à l'échographie transvaginale. Le taux de doublement commence à ralentir.",
              "type": "info"
            },
            {
              "text": "Semaines 7-8 : 7 650-229 000 mUI/mL. Les nausées matinales atteignent souvent leur pic. Le temps de doublement s'étend à 72-96 heures.",
              "type": "info"
            },
            {
              "text": "Semaines 9-12 (pic) : 25 700-288 000 mUI/mL. L'hCG atteint son pic et commence à décliner. C'est complètement normal et attendu.",
              "type": "warning"
            }
          ]
        },
        "concerns": {
          "title": "Quand s'Inquiéter",
          "items": [
            {
              "text": "Doublement lent (>72h quand hCG <1 200) : Peut indiquer grossesse ectopique ou grossesse non viable, mais peut aussi se produire dans des grossesses normales. Toujours discuter avec votre praticien.",
              "type": "warning"
            },
            {
              "text": "hCG en déclin : Une chute des niveaux d'hCG avant la semaine 9-10 peut indiquer une fausse couche. Cependant, un seul prélèvement bas ne confirme pas ceci — toujours faire un prélèvement de contrôle.",
              "type": "warning"
            },
            {
              "text": "hCG très élevée : Des niveaux significativement au-dessus de la plage normale peuvent indiquer jumeaux/multiples, grossesse molaire, ou simplement variation normale. Une échographie est nécessaire pour le diagnostic.",
              "type": "info"
            },
            {
              "text": "Plateau avant le pic : L'hCG qui arrête d'augmenter avant d'atteindre les niveaux pic attendus peut nécessiter investigation. Votre médecin considérera le tableau clinique complet.",
              "type": "warning"
            },
            {
              "text": "Grossesses FIV : Les patterns d'hCG peuvent différer légèrement dans les grossesses FIV. Les transferts de blastocystes jour 5 montrent typiquement une première bêta positive à 9-11 jours post-transfert.",
              "type": "info"
            },
            {
              "text": "Aucune valeur unique d'hCG n'est diagnostique : La tendance compte plus que n'importe quel chiffre individuel. Deux prélèvements à 48-72 heures d'intervalle donnent beaucoup plus d'informations qu'un seul.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Temps de Doublement d'hCG",
          "description": "Comment interpréter les résultats réels de prélèvements d'hCG",
          "examples": [
            {
              "title": "Doublement Normal — Semaine 5",
              "steps": [
                "Prélèvement 1 : 1er fév, hCG = 120 mUI/mL",
                "Prélèvement 2 : 3 fév, hCG = 280 mUI/mL",
                "Temps entre : 48 heures",
                "TD = (48 × ln(2)) / ln(280/120)",
                "TD = (48 × 0,693) / 0,847 = 39,3 heures",
                "Statut : ✅ Normal (31-72h attendu en dessous de 1 200)"
              ],
              "result": "Temps de Doublement : 39,3 heures — Progression saine normale"
            },
            {
              "title": "FIV Jour 5 — 3 Prélèvements",
              "steps": [
                "Transfert : 15 jan, blastocyste jour 5",
                "Prélèvement 1 (9 JPT) : 24 jan, hCG = 48",
                "Prélèvement 2 (11 JPT) : 26 jan, hCG = 125",
                "Prélèvement 3 (13 JPT) : 28 jan, hCG = 310",
                "TD (prélèvements 2→3) : (48 × 0,693) / ln(310/125) = 36,6h",
                "hCG >100 à 11 JPT suggère forte implantation"
              ],
              "result": "Temps de Doublement : 36,6h — Excellente progression pour FIV"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qu'est-ce qu'un temps de doublement d'hCG normal ?",
          "answer": "En début de grossesse (hCG en dessous de 1 200 mUI/mL), le temps de doublement normal est approximativement 48-72 heures, bien que les études montrent que les grossesses saines peuvent avoir des temps de doublement aussi rapides que 31 heures ou aussi lents que 72 heures. Quand l'hCG est entre 1 200-6 000, le temps de doublement s'étend à 72-96 heures. Au-dessus de 6 000 mUI/mL, le temps de doublement peut être de 96 heures ou plus et être encore complètement normal."
        },
        {
          "question": "Le doublement lent d'hCG signifie-t-il fausse couche ?",
          "answer": "Pas nécessairement. Bien qu'une augmentation anormalement lente d'hCG puisse être associée à une grossesse ectopique ou fausse couche, environ 15-20% des grossesses normales ont un doublement d'hCG plus lent que prévu. Un seul ensemble de prélèvements ne peut pas diagnostiquer définitivement une condition. Votre professionnel de santé considérera le tableau clinique complet incluant les résultats d'échographie."
        },
        {
          "question": "Les niveaux d'hCG peuvent-ils indiquer des jumeaux ?",
          "answer": "Des niveaux d'hCG plus élevés que prévu peuvent suggérer des jumeaux ou multiples, mais ce n'est pas fiable pour le diagnostic. Certaines grossesses simples ont de l'hCG très élevée, et certaines grossesses gémellaires ont de l'hCG dans la plage normale. L'échographie est le seul moyen fiable de confirmer une grossesse multiple, typiquement visible vers les semaines 6-7."
        },
        {
          "question": "Quand l'hCG atteint-elle son pic pendant la grossesse ?",
          "answer": "L'hCG atteint typiquement son pic entre les semaines 9-12 de grossesse, atteignant des niveaux de 25 700-288 000 mUI/mL. Après ce pic, les niveaux déclinent graduellement pendant les deuxième et troisième trimestres, se stabilisant à des niveaux plus bas. Ce déclin est complètement normal et n'indique pas de problème avec la grossesse."
        },
        {
          "question": "Combien de temps après le transfert FIV l'hCG devrait-elle être testée ?",
          "answer": "La plupart des cliniques FIV programment le premier test sanguin bêta-hCG à 9-14 jours post-transfert (JPT), selon qu'il s'agissait d'un embryon jour 3 ou jour 5. Pour les transferts de blastocystes jour 5, 9-11 JPT est commun. Un second prélèvement 48-72 heures plus tard confirme la tendance. Une hCG au-dessus de 50-100 à la première bêta est généralement considérée comme un signe positif."
        },
        {
          "question": "Que signifie une hCG en déclin ?",
          "answer": "Une hCG en déclin en début de grossesse (avant les semaines 9-10) peut indiquer fausse couche, grossesse ectopique, ou grossesse chimique. Cependant, après le pic du premier trimestre (semaines 9-12), une hCG en déclin est complètement normale. Si votre hCG décline avant le pic attendu, votre médecin ordonnera probablement des tests supplémentaires et une échographie."
        },
        {
          "question": "Devrais-je suivre les niveaux d'hCG à la maison ?",
          "answer": "Les tests de grossesse maison sont qualitatifs (positif/négatif) et ne peuvent pas mesurer les niveaux exacts d'hCG. Le test bêta-hCG quantitatif nécessite une prise de sang dans un laboratoire ou établissement médical. Bien que suivre vos chiffres puisse être informatif, évitez d'être obsédée par les valeurs individuelles. La tendance générale est ce qui compte, et seul votre professionnel de santé peut interpréter correctement les résultats."
        },
        {
          "question": "Pourquoi y a-t-il une si large plage de niveaux d'hCG 'normaux' ?",
          "answer": "La large plage existe parce que le timing d'implantation, la physiologie individuelle, et les facteurs génétiques affectent tous la production d'hCG. Deux grossesses saines au même âge gestationnel peuvent avoir des niveaux d'hCG complètement différents — l'une pourrait être à 500 et l'autre à 5 000, et les deux être parfaitement normales. C'est pourquoi le taux de changement (temps de doublement) est plus utile cliniquement que le nombre absolu."
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
      "name": "hCG Rechner",
      "slug": "hcg-rechner",
      "subtitle": "Verfolgen Sie Ihre hCG-Blutwerte, berechnen Sie die Verdopplungszeit und vergleichen Sie mit normalen Schwangerschaftsbereichen mit visuellen Diagrammen",
      "breadcrumb": "hCG",
      "seo": {
        "title": "hCG Rechner — Verdopplungszeit & Level Tracker | Kostenlos",
        "description": "Berechnen Sie die hCG-Verdopplungszeit aus 2-6 Blutabnahmen. Verfolgen Sie Werte gegen normale Bereiche, erkennen Sie langsames/schnelles Wachstum und erhalten Sie Zwillingswahrscheinlichkeits-Indikator. IVF-Modus enthalten.",
        "shortDescription": "Verfolgen Sie hCG-Werte und berechnen Sie die Verdopplungszeit mit visuellen Diagrammen und Normalbereichsvergleich",
        "keywords": [
          "hcg rechner",
          "hcg verdopplungszeit rechner",
          "hcg werte tabelle",
          "beta hcg rechner",
          "hcg bluttest rechner",
          "hcg werte tracker",
          "schwangerschaft hcg werte",
          "ivf hcg rechner"
        ]
      },
      "inputs": {
        "ivfMode": {
          "label": "IVF / Fruchtbarkeitsbehandlung",
          "helpText": "Aktivieren um Tage nach Transfer (DPT) zu berechnen und IVF-spezifische Referenzbereiche zu verwenden"
        },
        "transferDate": {
          "label": "Embryo-Transfer-Datum",
          "helpText": "Das Datum, an dem Ihr Embryo in die Gebärmutter übertragen wurde"
        },
        "embryoDay": {
          "label": "Embryo-Stadium",
          "helpText": "Tag 3 (Teilung) oder Tag 5 (Blastozyste) — beeinflusst DPT-Berechnung",
          "options": {
            "day3": "Tag 3 (Teilungsstadium)",
            "day5": "Tag 5 (Blastozyste)"
          }
        },
        "bloodDraws": {
          "label": "Blutabnahme-Ergebnisse",
          "helpText": "Geben Sie mindestens 2 Blutabnahmen mit Daten und hCG-Werten in mIU/mL ein",
          "addButton": "+ Blutabnahme hinzufügen",
          "fields": {
            "drawDate": {
              "label": "Abnahmedatum"
            },
            "hcgLevel": {
              "label": "hCG-Wert (mIU/mL)"
            }
          }
        }
      },
      "results": {
        "doublingTime": {
          "label": "hCG-Verdopplungszeit"
        },
        "growthRate": {
          "label": "Tägliche Wachstumsrate"
        },
        "status": {
          "label": "Wachstumsstatus"
        },
        "latestHcg": {
          "label": "Neuester hCG-Wert"
        },
        "estimatedWeek": {
          "label": "Geschätzte Schwangerschaftswoche"
        },
        "twinsIndicator": {
          "label": "Mehrlingsindikator"
        },
        "daysBetween": {
          "label": "Tage zwischen Abnahmen"
        },
        "firstDraw": {
          "label": "Erste Abnahme"
        },
        "lastDraw": {
          "label": "Letzte Abnahme"
        }
      },
      "presets": {
        "normalEarly": {
          "label": "Normal früh (5. Woche)",
          "description": "2 Abnahmen, normale Verdopplung ~36h"
        },
        "rapidGrowth": {
          "label": "Schnelles Wachstum",
          "description": "3 Abnahmen, schnelle Verdopplung — mögliche Zwillinge"
        },
        "ivfMonitoring": {
          "label": "IVF-Überwachung",
          "description": "Tag 5 Blastozyste, 3 Abnahmen nach Transfer"
        },
        "slowDoubling": {
          "label": "Langsame Verdopplung",
          "description": "2 Abnahmen, 72h+ Verdopplungszeit"
        }
      },
      "values": {
        "hours": "Stunden",
        "normal": "✅ Normal",
        "slow": "⚠️ Langsame Verdopplung",
        "fast": "📈 Schneller als erwartet",
        "declining": "🔴 Abnehmend",
        "possibleTwins": "👶👶 Mögliche Zwillinge/Mehrlinge",
        "singletonLikely": "👶 Einling wahrscheinlich",
        "tooEarly": "Zu früh zu bestimmen"
      },
      "formats": {
        "summary": "Ihre hCG-Verdopplungszeit beträgt {doublingTime}. Neuester Wert: {latestHcg} mIU/mL. Status: {status}."
      },
      "infoCards": {
        "analysis": {
          "title": "hCG-Analyse",
          "items": [
            {
              "label": "Verdopplungszeit",
              "valueKey": "doublingTime"
            },
            {
              "label": "Wachstumsstatus",
              "valueKey": "status"
            },
            {
              "label": "Tägliche Wachstumsrate",
              "valueKey": "growthRate"
            },
            {
              "label": "Mehrlingsindikator",
              "valueKey": "twinsIndicator"
            }
          ]
        },
        "details": {
          "title": "Abnahme-Details",
          "items": [
            {
              "label": "Neuester hCG-Wert",
              "valueKey": "latestHcg"
            },
            {
              "label": "Geschätzte Woche",
              "valueKey": "estimatedWeek"
            },
            {
              "label": "Erste Abnahme",
              "valueKey": "firstDraw"
            },
            {
              "label": "Letzte Abnahme",
              "valueKey": "lastDraw"
            }
          ]
        },
        "tips": {
          "title": "Ihre hCG-Ergebnisse verstehen",
          "items": [
            "Die hCG-Verdopplungszeit variiert stark bei normalen Schwangerschaften — zwischen 31 und 72 Stunden in der Frühschwangerschaft gilt als normal",
            "Ein einzelner hCG-Wert sagt sehr wenig aus. Der TREND über mehrere Abnahmen ist viel wichtiger als jede einzelne Zahl",
            "Über 6.000 mIU/mL steigt hCG langsamer — Verdopplungszeit von 96+ Stunden ist bei höheren Werten normal",
            "Nur Ihr Gesundheitsdienstleister kann Ihre Ergebnisse im Kontext interpretieren. Dieser Rechner dient der Information, nicht der Diagnose"
          ]
        }
      },
      "chart": {
        "title": "hCG-Verlauf",
        "xLabel": "Abnahme",
        "yLabel": "hCG (mIU/mL)",
        "series": {
          "hcg": "Ihr hCG-Wert",
          "normalLow": "Normal niedrig",
          "normalHigh": "Normal hoch"
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist hCG und warum wird es gemessen?",
          "content": "Humanes Choriongonadotropin (hCG) ist ein Hormon, das von der Plazenta produziert wird, nachdem sich eine befruchtete Eizelle in der Gebärmutter eingenistet hat. Es ist das Hormon, das von Schwangerschaftstests erkannt wird und einer der frühesten messbaren Indikatoren für eine Schwangerschaft. Bluttests (quantitatives Beta-hCG) messen die genaue Menge an hCG in Ihrem Blutkreislauf, ausgedrückt in Milli-internationalen Einheiten pro Milliliter (mIU/mL). In der Frühschwangerschaft verdoppeln sich die hCG-Werte etwa alle 48-72 Stunden. Gesundheitsdienstleister verwenden serielle hCG-Messungen — zwei oder mehr Abnahmen im Abstand von Tagen — um zu beurteilen, ob eine Schwangerschaft normal verläuft. Die Rate des hCG-Anstiegs ist klinisch bedeutsamer als jeder einzelne Wert."
        },
        "howItWorks": {
          "title": "Wie die hCG-Verdopplungszeit berechnet wird",
          "content": "Die Verdopplungszeit wird mit der exponentiellen Wachstumsformel berechnet: DT = (t × ln(2)) / ln(hCG₂/hCG₁), wobei t die Zeit zwischen den Abnahmen in Stunden und hCG₁ und hCG₂ die beiden hCG-Werte sind. Diese Formel geht von exponentiellem Wachstum aus, was für die Frühschwangerschaft genau ist, wenn hCG unter etwa 6.000 mIU/mL liegt. Nachdem hCG 6.000 überschreitet, verlangsamt sich die Wachstumsrate natürlich und die Verdopplungszeit verlängert sich — das ist völlig normal. Die maximalen hCG-Werte (typisch 25.000-288.000 mIU/mL) treten um die Wochen 9-12 auf, danach sinken die Werte allmählich und stabilisieren sich für den Rest der Schwangerschaft."
        },
        "levels": {
          "title": "Normale hCG-Werte nach Woche",
          "items": [
            {
              "text": "Woche 3 (1 Woche nach Eisprung): 5-50 mIU/mL. hCG wird gerade erkennbar. Manche Heimtests zeigen möglicherweise noch nicht positiv an.",
              "type": "info"
            },
            {
              "text": "Woche 4 (ausgebliebene Periode): 5-426 mIU/mL. Große Spanne ist normal — Einnistungszeit variiert zwischen Schwangerschaften erheblich.",
              "type": "info"
            },
            {
              "text": "Woche 5: 18-7.340 mIU/mL. Verdopplungszeit sollte 48-72 Stunden betragen. Fruchthöhle kann im Ultraschall über 1.500-2.000 sichtbar sein.",
              "type": "info"
            },
            {
              "text": "Woche 6: 1.080-56.500 mIU/mL. Herzschlag kann im transvaginalen Ultraschall erkennbar sein. Verdopplungsrate beginnt sich zu verlangsamen.",
              "type": "info"
            },
            {
              "text": "Wochen 7-8: 7.650-229.000 mIU/mL. Morgenübelkeit erreicht oft ihren Höhepunkt. Verdopplungszeit verlängert sich auf 72-96 Stunden.",
              "type": "info"
            },
            {
              "text": "Wochen 9-12 (Höhepunkt): 25.700-288.000 mIU/mL. hCG erreicht Höhepunkt und beginnt zu sinken. Das ist völlig normal und erwartet.",
              "type": "warning"
            }
          ]
        },
        "concerns": {
          "title": "Wann man sich Sorgen machen sollte",
          "items": [
            {
              "text": "Langsame Verdopplung (>72h wenn hCG <1.200): Kann auf Eileiterschwangerschaft oder nicht lebensfähige Schwangerschaft hinweisen, kann aber auch bei normalen Schwangerschaften auftreten. Immer mit Ihrem Arzt besprechen.",
              "type": "warning"
            },
            {
              "text": "Sinkende hCG-Werte: Ein Rückgang der hCG-Werte vor Woche 9-10 kann auf Fehlgeburt hinweisen. Eine einzige niedrige Abnahme bestätigt dies jedoch nicht — immer eine Wiederholung machen lassen.",
              "type": "warning"
            },
            {
              "text": "Sehr hohe hCG-Werte: Werte deutlich über dem normalen Bereich können auf Zwillinge/Mehrlinge, Blasenmole oder einfach normale Variation hinweisen. Ultraschall ist für Diagnose erforderlich.",
              "type": "info"
            },
            {
              "text": "Plateau vor Höhepunkt: hCG, das vor Erreichen erwarteter Höchstwerte aufhört zu steigen, bedarf möglicherweise Untersuchung. Ihr Arzt wird das vollständige klinische Bild betrachten.",
              "type": "warning"
            },
            {
              "text": "IVF-Schwangerschaften: hCG-Muster können sich bei IVF-Schwangerschaften leicht unterscheiden. Tag 5 Blastozysten-Transfers zeigen typisch ersten positiven Beta bei 9-11 Tagen nach Transfer.",
              "type": "info"
            },
            {
              "text": "Kein einzelner hCG-Wert ist diagnostisch: Der Trend ist wichtiger als jede einzelne Zahl. Zwei Abnahmen 48-72 Stunden auseinander geben viel mehr Information als eine.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "hCG-Verdopplungszeit Beispiele",
          "description": "Wie man reale hCG-Abnahme-Ergebnisse interpretiert",
          "examples": [
            {
              "title": "Normale Verdopplung — Woche 5",
              "steps": [
                "Abnahme 1: 1. Feb, hCG = 120 mIU/mL",
                "Abnahme 2: 3. Feb, hCG = 280 mIU/mL",
                "Zeit dazwischen: 48 Stunden",
                "DT = (48 × ln(2)) / ln(280/120)",
                "DT = (48 × 0,693) / 0,847 = 39,3 Stunden",
                "Status: ✅ Normal (31-72h erwartet unter 1.200)"
              ],
              "result": "Verdopplungszeit: 39,3 Stunden — Normale gesunde Entwicklung"
            },
            {
              "title": "IVF Tag 5 — 3 Abnahmen",
              "steps": [
                "Transfer: 15. Jan, Tag 5 Blastozyste",
                "Abnahme 1 (9 DPT): 24. Jan, hCG = 48",
                "Abnahme 2 (11 DPT): 26. Jan, hCG = 125",
                "Abnahme 3 (13 DPT): 28. Jan, hCG = 310",
                "DT (Abnahmen 2→3): (48 × 0,693) / ln(310/125) = 36,6h",
                "hCG >100 bei 11 DPT deutet auf starke Einnistung hin"
              ],
              "result": "Verdopplungszeit: 36,6h — Ausgezeichnete Entwicklung für IVF"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Was ist eine normale hCG-Verdopplungszeit?",
          "answer": "In der Frühschwangerschaft (hCG unter 1.200 mIU/mL) beträgt die normale Verdopplungszeit etwa 48-72 Stunden, obwohl Studien zeigen, dass gesunde Schwangerschaften Verdopplungszeiten so schnell wie 31 Stunden oder so langsam wie 72 Stunden haben können. Wenn hCG zwischen 1.200-6.000 liegt, verlängert sich die Verdopplungszeit auf 72-96 Stunden. Über 6.000 mIU/mL kann die Verdopplungszeit 96 Stunden oder mehr betragen und trotzdem völlig normal sein."
        },
        {
          "question": "Bedeutet langsame hCG-Verdopplung Fehlgeburt?",
          "answer": "Nicht unbedingt. Obwohl abnormal langsamer hCG-Anstieg mit Eileiterschwangerschaft oder Fehlgeburt verbunden sein kann, haben etwa 15-20% der normalen Schwangerschaften langsamere als erwartete hCG-Verdopplung. Eine einzelne Abnahme kann keine Erkrankung definitiv diagnostizieren. Ihr Gesundheitsdienstleister wird das vollständige klinische Bild einschließlich Ultraschallbefunden betrachten."
        },
        {
          "question": "Können hCG-Werte auf Zwillinge hinweisen?",
          "answer": "Höher als erwartete hCG-Werte können auf Zwillinge oder Mehrlinge hinweisen, aber das ist für die Diagnose nicht zuverlässig. Manche Einlingsschwangerschaften haben sehr hohes hCG, und manche Zwillingsschwangerschaften haben normales hCG. Ultraschall ist der einzige zuverlässige Weg, Mehrlingsschwangerschaft zu bestätigen, typisch sichtbar bei Wochen 6-7."
        },
        {
          "question": "Wann erreicht hCG seinen Höhepunkt während der Schwangerschaft?",
          "answer": "hCG erreicht typisch seinen Höhepunkt zwischen den Wochen 9-12 der Schwangerschaft und erreicht Werte von 25.700-288.000 mIU/mL. Nach diesem Höhepunkt sinken die Werte allmählich während des zweiten und dritten Trimesters und stabilisieren sich auf niedrigeren Werten. Dieser Rückgang ist völlig normal und zeigt kein Problem mit der Schwangerschaft an."
        },
        {
          "question": "Wie lange nach IVF-Transfer sollte hCG getestet werden?",
          "answer": "Die meisten IVF-Kliniken planen den ersten Beta-hCG-Bluttest bei 9-14 Tagen nach Transfer (DPT), abhängig davon, ob es ein Tag 3 oder Tag 5 Embryo war. Für Tag 5 Blastozysten-Transfers ist 9-11 DPT üblich. Eine zweite Abnahme 48-72 Stunden später bestätigt den Trend. Ein hCG über 50-100 beim ersten Beta wird allgemein als positives Zeichen betrachtet."
        },
        {
          "question": "Was bedeutet sinkendes hCG?",
          "answer": "Sinkendes hCG in der Frühschwangerschaft (vor Wochen 9-10) kann auf Fehlgeburt, Eileiterschwangerschaft oder biochemische Schwangerschaft hinweisen. Nach dem ersten Trimester-Höhepunkt (Wochen 9-12) ist sinkendes hCG jedoch völlig normal. Wenn Ihr hCG vor dem erwarteten Höhepunkt sinkt, wird Ihr Arzt wahrscheinlich zusätzliche Tests und einen Ultraschall anordnen."
        },
        {
          "question": "Sollte ich hCG-Werte zu Hause verfolgen?",
          "answer": "Heimschwangerschaftstests sind qualitativ (positiv/negativ) und können keine genauen hCG-Werte messen. Quantitative Beta-hCG-Tests erfordern eine Blutabnahme in einem Labor oder einer medizinischen Einrichtung. Während die Verfolgung Ihrer Zahlen informativ sein kann, vermeiden Sie es, über einzelne Werte zu grübeln. Der Gesamttrend ist wichtig, und nur Ihr Gesundheitsdienstleister kann die Ergebnisse richtig interpretieren."
        },
        {
          "question": "Warum gibt es eine so große Spanne 'normaler' hCG-Werte?",
          "answer": "Die große Spanne existiert, weil Einnistungszeit, individuelle Physiologie und genetische Faktoren alle die hCG-Produktion beeinflussen. Zwei gesunde Schwangerschaften im gleichen Gestationsalter können wildly unterschiedliche hCG-Werte haben — eine könnte 500 und eine andere 5.000 sein, und beide völlig normal. Deshalb ist die Änderungsrate (Verdopplungszeit) klinisch nützlicher als die absolute Zahl."
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
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      }
    },
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ══════════════════════════════════════════════════════════════════════════════

// hCG reference ranges by gestational week
const HCG_RANGES: Array<{ week: string; low: number; high: number; doubling: string }> = [
  { week: "3", low: 5, high: 50, doubling: "48-72 h" },
  { week: "4", low: 5, high: 426, doubling: "48-72 h" },
  { week: "5", low: 18, high: 7340, doubling: "48-72 h" },
  { week: "6", low: 1080, high: 56500, doubling: "48-72 h" },
  { week: "7-8", low: 7650, high: 229000, doubling: "72-96 h" },
  { week: "9-12", low: 25700, high: 288000, doubling: "96+ h (peak)" },
  { week: "13-16", low: 13300, high: 254000, doubling: "Declining" },
  { week: "17-24", low: 4060, high: 165400, doubling: "Plateau" },
  { week: "25-40", low: 3640, high: 117000, doubling: "Stable" },
];

function estimateGestWeek(hcg: number): string {
  if (hcg < 5) return "< 3 weeks";
  if (hcg <= 50) return "~3 weeks";
  if (hcg <= 426) return "~4 weeks";
  if (hcg <= 7340) return "~5 weeks";
  if (hcg <= 56500) return "~6 weeks";
  if (hcg <= 229000) return "~7-8 weeks";
  if (hcg <= 288000) return "~9-12 weeks (peak)";
  return "9+ weeks (near peak)";
}

function fmtNum(val: number): string {
  return Math.round(val).toLocaleString("en-US");
}

export function calculateHcg(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ─── Parse blood draws from repeater ────────────────────────────────────
  const rawDraws = values.bloodDraws as Array<Record<string, unknown>> | null;
  if (!rawDraws || rawDraws.length < 2) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Filter valid draws (both date and level present)
  const validDraws = rawDraws
    .filter((d) => d.drawDate && d.hcgLevel !== null && d.hcgLevel !== undefined && (d.hcgLevel as number) > 0)
    .map((d) => ({
      date: new Date((d.drawDate as string) + "T00:00:00"),
      hcg: d.hcgLevel as number,
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  if (validDraws.length < 2) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ─── Calculate doubling time between consecutive draws ──────────────────
  const firstDraw = validDraws[0];
  const lastDraw = validDraws[validDraws.length - 1];

  // Use last two draws for primary doubling time
  const penultimate = validDraws[validDraws.length - 2];
  const hoursBetween = (lastDraw.date.getTime() - penultimate.date.getTime()) / (1000 * 60 * 60);
  const totalDaysBetween = Math.round((lastDraw.date.getTime() - firstDraw.date.getTime()) / (1000 * 60 * 60 * 24));

  let doublingTimeHours = 0;
  let dailyGrowthRate = 0;
  let isDecreasing = false;

  if (lastDraw.hcg > penultimate.hcg && hoursBetween > 0) {
    doublingTimeHours = (hoursBetween * Math.log(2)) / Math.log(lastDraw.hcg / penultimate.hcg);
    dailyGrowthRate = ((lastDraw.hcg / penultimate.hcg) ** (24 / hoursBetween) - 1) * 100;
  } else if (lastDraw.hcg < penultimate.hcg) {
    isDecreasing = true;
    dailyGrowthRate = ((lastDraw.hcg / penultimate.hcg) ** (24 / hoursBetween) - 1) * 100;
  }

  // ─── Determine status ───────────────────────────────────────────────────
  let status = v.normal || "✅ Normal";
  if (isDecreasing) {
    status = v.declining || "🔴 Declining";
  } else if (doublingTimeHours > 0) {
    if (penultimate.hcg < 1200) {
      if (doublingTimeHours > 72) status = v.slow || "⚠️ Slow Doubling";
      else if (doublingTimeHours < 31) status = v.fast || "📈 Faster Than Expected";
    } else if (penultimate.hcg < 6000) {
      if (doublingTimeHours > 96) status = v.slow || "⚠️ Slow Doubling";
      else if (doublingTimeHours < 48) status = v.fast || "📈 Faster Than Expected";
    }
    // Above 6000, slower doubling is expected
  }

  // ─── Twins indicator ────────────────────────────────────────────────────
  let twinsIndicator = v.singletonLikely || "👶 Singleton Likely";
  const estWeek = estimateGestWeek(lastDraw.hcg);
  // Very rough heuristic: if hCG is >2x the median for estimated week
  if (lastDraw.hcg > 1000 && doublingTimeHours > 0 && doublingTimeHours < 31) {
    twinsIndicator = v.possibleTwins || "👶👶 Possible Twins/Multiples";
  } else if (lastDraw.hcg <= 50) {
    twinsIndicator = v.tooEarly || "Too Early to Determine";
  }

  // ─── IVF DPT calculation ────────────────────────────────────────────────
  const ivfMode = values.ivfMode as boolean;
  let ivfInfo = "";
  if (ivfMode && values.transferDate) {
    const transferDate = new Date((values.transferDate as string) + "T00:00:00");
    const dpt = Math.round((lastDraw.date.getTime() - transferDate.getTime()) / (1000 * 60 * 60 * 24));
    ivfInfo = ` (${dpt} DPT)`;
  }

  // ─── Chart Data ─────────────────────────────────────────────────────────
  const chartData = validDraws.map((d, i) => ({
    label: `Draw ${i + 1}`,
    hcg: d.hcg,
    normalLow: null as number | null,
    normalHigh: null as number | null,
  }));

  // ─── Table Data — Reference Ranges ──────────────────────────────────────
  const tableData = HCG_RANGES.map((r) => ({
    week: `Week ${r.week}`,
    low: fmtNum(r.low),
    high: fmtNum(r.high),
    doubling: r.doubling,
  }));

  // ─── Format results ─────────────────────────────────────────────────────
  const dtFormatted = isDecreasing
    ? "N/A (Declining)"
    : doublingTimeHours > 0
    ? `${doublingTimeHours.toFixed(1)} ${v.hours || "hours"}`
    : "N/A";

  const growthFormatted = `${dailyGrowthRate >= 0 ? "+" : ""}${dailyGrowthRate.toFixed(1)}% / day`;

  const summary = (f.summary || "Your hCG doubling time is {doublingTime}. Latest level: {latestHcg} mIU/mL. Status: {status}.")
    .replace("{doublingTime}", dtFormatted)
    .replace("{latestHcg}", fmtNum(lastDraw.hcg))
    .replace("{status}", status);

  const fmtDateShort = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  // ─── Return ─────────────────────────────────────────────────────────────
  return {
    values: {
      doublingTime: doublingTimeHours,
      growthRate: dailyGrowthRate,
      status,
      latestHcg: lastDraw.hcg,
      estimatedWeek: estWeek,
      twinsIndicator,
      daysBetween: totalDaysBetween,
      firstDraw: firstDraw.hcg,
      lastDraw: lastDraw.hcg,
    },
    formatted: {
      doublingTime: dtFormatted,
      growthRate: growthFormatted,
      status,
      latestHcg: `${fmtNum(lastDraw.hcg)} mIU/mL${ivfInfo}`,
      estimatedWeek: estWeek,
      twinsIndicator,
      daysBetween: `${totalDaysBetween} days (${validDraws.length} draws)`,
      firstDraw: `${fmtNum(firstDraw.hcg)} — ${fmtDateShort(firstDraw.date)}`,
      lastDraw: `${fmtNum(lastDraw.hcg)} — ${fmtDateShort(lastDraw.date)}`,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}
