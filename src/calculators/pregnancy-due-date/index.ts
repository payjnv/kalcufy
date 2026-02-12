import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

// ══════════════════════════════════════════════════════════════════════════════
// PREGNANCY DUE DATE CALCULATOR — V4.3 Engine
// ══════════════════════════════════════════════════════════════════════════════
// Methods: LMP (Naegele), Conception, Ultrasound Dating, IVF Transfer, Known Date
// V4.3 Components: select, date, toggle (boolean), stepper (+/−)
// Features: Trimester timeline chart, milestone DetailedTable, zodiac/birthstone
// ══════════════════════════════════════════════════════════════════════════════

export const pregnancyDueDateCalculatorConfig: CalculatorConfigV4 = {
  id: "pregnancy-due-date",
  version: "4.3",
  slug: "pregnancy-due-date-calculator",
  category: "health",
  icon: "🤰",

  // ═══════════════════════════════════════════════════════════════════════════
  // INPUTS — V4.3 Components (select, date, toggle, stepper)
  // ═══════════════════════════════════════════════════════════════════════════
  inputs: [
    {
      id: "method",
      type: "select",
      defaultValue: "lmp",
      options: [
        { value: "lmp" },
        { value: "conception" },
        { value: "ultrasound" },
        { value: "ivf" },
        { value: "knownDueDate" },
      ],
    },
    // ── LMP Method ──
    {
      id: "lmpDate",
      type: "date",
      defaultValue: null,
      showWhen: { field: "method", value: "lmp" },
    },
    {
      id: "adjustCycle",
      type: "toggle",
      defaultValue: false,
      showWhen: { field: "method", value: "lmp" },
    },
    {
      id: "cycleLength",
      type: "stepper",
      defaultValue: 28,
      min: 20,
      max: 45,
      step: 1,
      suffix: "days",
      showWhen: { field: "adjustCycle", value: true },
    },
    // ── Conception Method ──
    {
      id: "conceptionDate",
      type: "date",
      defaultValue: null,
      showWhen: { field: "method", value: "conception" },
    },
    // ── Ultrasound Method ──
    {
      id: "ultrasoundDate",
      type: "date",
      defaultValue: null,
      showWhen: { field: "method", value: "ultrasound" },
    },
    {
      id: "ultrasoundWeeks",
      type: "stepper",
      defaultValue: 8,
      min: 4,
      max: 42,
      step: 1,
      suffix: "wk",
      showWhen: { field: "method", value: "ultrasound" },
    },
    {
      id: "ultrasoundDays",
      type: "stepper",
      defaultValue: 0,
      min: 0,
      max: 6,
      step: 1,
      suffix: "d",
      showWhen: { field: "method", value: "ultrasound" },
    },
    // ── IVF Method ──
    {
      id: "ivfDate",
      type: "date",
      defaultValue: null,
      showWhen: { field: "method", value: "ivf" },
    },
    {
      id: "embryoDay",
      type: "select",
      defaultValue: "day5",
      options: [
        { value: "day3" },
        { value: "day5" },
        { value: "day6" },
      ],
      showWhen: { field: "method", value: "ivf" },
    },
    // ── Known Due Date Method ──
    {
      id: "knownDueDate",
      type: "date",
      defaultValue: null,
      showWhen: { field: "method", value: "knownDueDate" },
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  inputGroups: [],
  unitSystem: { enabled: false, default: "metric" },

  // ═══════════════════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════════════════
  results: [
    { id: "dueDate", type: "primary", format: "text" },
    { id: "gestationalAge", type: "secondary", format: "text" },
    { id: "daysRemaining", type: "secondary", format: "number" },
    { id: "trimester", type: "secondary", format: "text" },
    { id: "conceptionEstimate", type: "secondary", format: "text" },
    { id: "safeWindowStart", type: "secondary", format: "text" },
    { id: "safeWindowEnd", type: "secondary", format: "text" },
    { id: "progressPercent", type: "secondary", format: "number" },
    { id: "zodiacSign", type: "secondary", format: "text" },
    { id: "birthstone", type: "secondary", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // CHART — Trimester Progress (bar)
  // ═══════════════════════════════════════════════════════════════════════════
  chart: {
    id: "trimesterProgress",
    type: "bar",
    xKey: "trimester",
    height: 280,
    stacked: true,
    showGrid: false,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "number",
    series: [
      { key: "completed", color: "#10b981", stackId: "progress" },
      { key: "remaining", color: "#e5e7eb", stackId: "progress" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DETAILED TABLE — Milestone Schedule
  // ═══════════════════════════════════════════════════════════════════════════
  detailedTable: {
    id: "milestoneSchedule",
    buttonLabel: "View Full Milestone Schedule",
    buttonIcon: "📅",
    modalTitle: "Pregnancy Milestones & Key Dates",
    columns: [
      { id: "week", label: "Week", align: "center" },
      { id: "date", label: "Date", align: "center" },
      { id: "milestone", label: "Milestone", align: "left", highlight: true },
      { id: "notes", label: "Notes", align: "left" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INFOCARDS (2 list + 1 horizontal tips)
  // ═══════════════════════════════════════════════════════════════════════════
  infoCards: [
    { id: "keyDates", type: "list", icon: "📅", itemCount: 4 },
    { id: "funFacts", type: "list", icon: "✨", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION (2 prose, 2 list, 1 code-example)
  // ═══════════════════════════════════════════════════════════════════════════
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "methods", type: "list", icon: "📋", itemCount: 5 },
    { id: "factors", type: "list", icon: "📌", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // FAQs (8 items)
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
      authors: "American College of Obstetricians and Gynecologists (ACOG)",
      year: "2017",
      title: "Committee Opinion No. 700: Methods for Estimating the Due Date",
      source: "Obstetrics & Gynecology, 129(5), e150-e154",
      url: "https://pubmed.ncbi.nlm.nih.gov/28426621/",
    },
    {
      authors: "Naegele FC",
      year: "1812",
      title: "Lehrbuch der Geburtshülfe für Hebammen",
      source: "Historical reference — basis for modern EDD calculation",
      url: "https://en.wikipedia.org/wiki/Naegele%27s_rule",
    },
    {
      authors: "Mongelli M, Wilcox M, Gardosi J",
      year: "1996",
      title: "Estimating the date of confinement: ultrasonographic biometry versus certain menstrual dates",
      source: "American Journal of Obstetrics and Gynecology, 174(1), 278-281",
      url: "https://pubmed.ncbi.nlm.nih.gov/8572021/",
    },
    {
      authors: "Jukic AM, Baird DD, Weinberg CR, McConnaughey DR, Wilcox AJ",
      year: "2013",
      title: "Length of human pregnancy and contributors to its natural variation",
      source: "Human Reproduction, 28(10), 2848-2855",
      url: "https://pubmed.ncbi.nlm.nih.gov/23922246/",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // PRESETS (4 with icons)
  // ═══════════════════════════════════════════════════════════════════════════
  presets: [
    {
      id: "recentLmp",
      icon: "📅",
      values: {
        method: "lmp",
        lmpDate: new Date(Date.now() - 56 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        adjustCycle: false,
        cycleLength: 28,
      },
    },
    {
      id: "ivfDay5",
      icon: "🔬",
      values: {
        method: "ivf",
        ivfDate: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        embryoDay: "day5",
      },
    },
    {
      id: "ultrasoundDating",
      icon: "🩺",
      values: {
        method: "ultrasound",
        ultrasoundDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        ultrasoundWeeks: 10,
        ultrasoundDays: 3,
      },
    },
    {
      id: "longCycle",
      icon: "🔄",
      values: {
        method: "lmp",
        lmpDate: new Date(Date.now() - 63 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        adjustCycle: true,
        cycleLength: 35,
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // TRANSLATIONS (English only — install script translates)
  // ═══════════════════════════════════════════════════════════════════════════
  t: {
    en: {
      name: "Pregnancy Due Date Calculator",
      slug: "pregnancy-due-date-calculator",
      subtitle: "Calculate your estimated due date using 5 methods — LMP, conception, ultrasound, IVF transfer, or known date with trimester timeline",
      breadcrumb: "Due Date",

      seo: {
        title: "Pregnancy Due Date Calculator — Estimate Baby's Arrival | Free",
        description: "Calculate your pregnancy due date with 5 methods: LMP, conception date, ultrasound, IVF transfer. Get trimester timeline, milestone schedule, and week-by-week progress.",
        shortDescription: "Estimate your baby's due date with 5 calculation methods and a complete milestone timeline",
        keywords: [
          "pregnancy due date calculator",
          "due date calculator",
          "estimated due date",
          "pregnancy calculator",
          "when is my baby due",
          "edd calculator",
          "ivf due date calculator",
          "pregnancy week calculator",
        ],
      },

      calculator: { yourInformation: "Pregnancy Information" },
      ui: { yourInformation: "Pregnancy Information", calculate: "Calculate", reset: "Reset", results: "Results" },

      inputs: {
        method: {
          label: "Calculation Method",
          helpText: "Choose the method that best matches your available information",
          options: {
            lmp: "Last Menstrual Period (LMP)",
            conception: "Conception / Ovulation Date",
            ultrasound: "Ultrasound Dating",
            ivf: "IVF Embryo Transfer",
            knownDueDate: "Known Due Date (reverse)",
          },
        },
        lmpDate: {
          label: "First Day of Last Period",
          helpText: "The first day of your most recent menstrual period — this is the standard method used by most doctors",
        },
        adjustCycle: {
          label: "Adjust for Cycle Length",
          helpText: "Enable if your cycle is not the standard 28 days — adjusts the due date accordingly",
        },
        cycleLength: {
          label: "Average Cycle Length",
          helpText: "Normal range is 21-35 days. Standard calculation assumes 28 days",
        },
        conceptionDate: {
          label: "Conception / Ovulation Date",
          helpText: "The date you believe conception occurred (ovulation day)",
        },
        ultrasoundDate: {
          label: "Ultrasound Date",
          helpText: "The date your dating ultrasound was performed",
        },
        ultrasoundWeeks: {
          label: "Gestational Age (Weeks)",
          helpText: "Weeks of pregnancy as measured on the ultrasound",
        },
        ultrasoundDays: {
          label: "Gestational Age (Days)",
          helpText: "Additional days beyond complete weeks (0-6)",
        },
        ivfDate: {
          label: "Embryo Transfer Date",
          helpText: "The date the embryo was transferred to the uterus",
        },
        embryoDay: {
          label: "Embryo Stage",
          helpText: "Day 5 (blastocyst) transfers are most common in modern IVF",
          options: {
            day3: "Day 3 Embryo (Cleavage)",
            day5: "Day 5 Embryo (Blastocyst)",
            day6: "Day 6 Embryo (Expanded Blastocyst)",
          },
        },
        knownDueDate: {
          label: "Known Due Date",
          helpText: "Enter your due date to see the full milestone timeline and reverse-calculate key dates",
        },
      },

      results: {
        dueDate: { label: "Estimated Due Date" },
        gestationalAge: { label: "Current Gestational Age" },
        daysRemaining: { label: "Days Remaining" },
        trimester: { label: "Current Trimester" },
        conceptionEstimate: { label: "Estimated Conception" },
        safeWindowStart: { label: "Early Term (37 weeks)" },
        safeWindowEnd: { label: "Late Term (42 weeks)" },
        progressPercent: { label: "Pregnancy Progress" },
        zodiacSign: { label: "Baby's Zodiac Sign" },
        birthstone: { label: "Baby's Birthstone" },
      },

      presets: {
        recentLmp: { label: "LMP (8 weeks ago)", description: "Standard LMP method, 28-day cycle" },
        ivfDay5: { label: "IVF Day 5", description: "Blastocyst transfer, 6 weeks ago" },
        ultrasoundDating: { label: "Ultrasound Dating", description: "10 weeks 3 days, 2 weeks ago" },
        longCycle: { label: "Long Cycle (35 days)", description: "LMP with 35-day cycle adjustment" },
      },

      values: {
        weeks: "weeks",
        days: "days",
        trimester1: "1st Trimester",
        trimester2: "2nd Trimester",
        trimester3: "3rd Trimester",
      },

      formats: {
        summary: "Your estimated due date is {dueDate}. You are currently {gestationalAge} pregnant with {daysRemaining} days to go ({progressPercent}% complete).",
      },

      infoCards: {
        keyDates: {
          title: "Key Dates",
          items: [
            { label: "Estimated Due Date", valueKey: "dueDate" },
            { label: "Current Gestational Age", valueKey: "gestationalAge" },
            { label: "Early Term (37 wk)", valueKey: "safeWindowStart" },
            { label: "Late Term (42 wk)", valueKey: "safeWindowEnd" },
          ],
        },
        funFacts: {
          title: "Fun Facts About Your Baby",
          items: [
            { label: "Zodiac Sign", valueKey: "zodiacSign" },
            { label: "Birthstone", valueKey: "birthstone" },
            { label: "Days Remaining", valueKey: "daysRemaining" },
            { label: "Progress", valueKey: "progressPercent" },
          ],
        },
        tips: {
          title: "First Trimester Tips",
          items: [
            "Schedule your first prenatal visit between weeks 8-10 — earlier if you have risk factors or are over 35",
            "Take 400-800 mcg of folic acid daily to reduce the risk of neural tube defects by up to 70%",
            "Only about 5% of babies arrive on their due date — most come within a 37-42 week window",
            "First trimester fatigue is normal — your body is building the placenta, which requires enormous energy",
          ],
        },
      },

      chart: {
        title: "Trimester Progress",
        xLabel: "Trimester",
        yLabel: "Weeks",
        series: {
          completed: "Completed",
          remaining: "Remaining",
        },
      },

      education: {
        whatIs: {
          title: "How Is a Pregnancy Due Date Calculated?",
          content: "A pregnancy due date (also called Estimated Date of Delivery or EDD) is calculated as 280 days (40 weeks) from the first day of your last menstrual period (LMP). This method, known as Naegele's rule, has been the standard since the early 1800s. While it assumes a 28-day cycle with ovulation on day 14, modern calculators can adjust for different cycle lengths. It's important to understand that your due date is an estimate — only about 5% of babies are born on their exact due date. Most births occur within a five-week window between 37 and 42 weeks of gestation. Your healthcare provider may adjust your due date based on early ultrasound measurements, which are most accurate in the first trimester.",
        },
        howItWorks: {
          title: "Understanding the 5 Calculation Methods",
          content: "The LMP method adds 280 days to your last period start date, adjusting if your cycle isn't 28 days. The Conception method adds 266 days from the known or estimated ovulation date. Ultrasound dating uses measurements from an early scan to estimate gestational age, then calculates backward to determine your EDD — this is considered the most accurate method when done before 14 weeks. IVF calculations are the most precise because the exact embryo age is known: add 263 days for a Day 3 transfer, 261 for Day 5, or 260 for Day 6. The Known Due Date method works in reverse, showing you all milestones and key dates based on an EDD you've already received from your doctor.",
        },
        methods: {
          title: "Calculation Methods Explained",
          items: [
            { text: "LMP (Naegele's Rule): EDD = LMP + 280 days. For non-28-day cycles, adjust by adding (cycle length − 28) days. This is the most commonly used method worldwide.", type: "info" },
            { text: "Conception Date: EDD = Conception + 266 days. Most accurate when you know your exact ovulation date through tracking or OPK testing.", type: "info" },
            { text: "Ultrasound Dating: When done before 14 weeks, accuracy is ±5-7 days. After 20 weeks, accuracy drops to ±2-3 weeks. ACOG recommends using ultrasound dates if they differ from LMP by more than 7 days.", type: "info" },
            { text: "IVF Transfer: The most precise method — embryo age is known exactly. Day 3 embryo: EDD = Transfer + 263 days. Day 5 blastocyst: EDD = Transfer + 261 days.", type: "info" },
            { text: "Known Due Date: Reverse calculation from an existing EDD. Useful for determining conception date, LMP equivalent, and all milestone dates.", type: "info" },
          ],
        },
        factors: {
          title: "Factors That Affect Your Due Date",
          items: [
            { text: "Cycle length: Women with 35-day cycles ovulate about a week later than those with 28-day cycles, shifting the due date by 7 days. Always adjust if your cycle is not 28 days.", type: "warning" },
            { text: "First pregnancy: First-time mothers tend to deliver slightly later — an average of 1-2 days past their EDD compared to subsequent pregnancies.", type: "info" },
            { text: "Ultrasound accuracy: First trimester ultrasounds (before 14 weeks) are accurate to ±5 days. Second trimester drops to ±10 days, and third trimester to ±21 days.", type: "info" },
            { text: "Maternal age: Women over 35 have a slightly higher risk of going past their due date, while teenage mothers tend to deliver slightly earlier.", type: "info" },
            { text: "Multiple pregnancies: Twins average 36 weeks, triplets average 32 weeks. Standard due date calculations assume a singleton pregnancy.", type: "warning" },
            { text: "Natural variation: A 2013 study found that the natural length of pregnancy varies by up to 37 days (5+ weeks) between women, even after accounting for all measurable factors.", type: "info" },
          ],
        },
        examples: {
          title: "Due Date Calculation Examples",
          description: "Step-by-step examples using different methods",
          examples: [
            {
              title: "LMP Method — 28-day Cycle",
              steps: [
                "Last Menstrual Period: January 1, 2026",
                "Formula: LMP + 280 days",
                "January 1 + 280 days = October 8, 2026",
                "Estimated Conception: ~January 15 (day 14)",
                "Current: If today is Feb 10 → 5 weeks 5 days pregnant",
              ],
              result: "Due Date: October 8, 2026",
            },
            {
              title: "IVF Day 5 Blastocyst Transfer",
              steps: [
                "Transfer Date: January 5, 2026",
                "Embryo Stage: Day 5 Blastocyst",
                "Formula: Transfer + 261 days",
                "January 5 + 261 days = September 23, 2026",
                "Equivalent LMP: December 17, 2025 (EDD − 280)",
              ],
              result: "Due Date: September 23, 2026",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How accurate is a due date calculator?",
          answer: "Due date calculators provide an estimate — only about 5% of babies are born on their exact due date. However, about 80% of babies arrive within the 37-42 week window. First trimester ultrasound dating is the most accurate method (±5 days), while LMP calculations can be off by 1-2 weeks depending on cycle regularity. IVF due dates are the most precise because the embryo age is known exactly.",
        },
        {
          question: "What if my cycle is longer or shorter than 28 days?",
          answer: "If your cycle is not 28 days, your ovulation likely doesn't occur on day 14. For a 35-day cycle, ovulation occurs around day 21, making your due date about 7 days later than the standard calculation. Our calculator automatically adjusts when you enable the cycle length toggle. This adjustment is crucial for accuracy — a 35-day cycle would shift your due date by a full week.",
        },
        {
          question: "Should I use LMP or ultrasound dating?",
          answer: "ACOG recommends using ultrasound dating if the ultrasound EDD differs from LMP by more than 7 days in the first trimester, more than 10 days in the second trimester, or more than 21 days in the third trimester. Early ultrasound (8-13 weeks) is generally more accurate than LMP, especially for women with irregular cycles.",
        },
        {
          question: "How is IVF due date different from natural conception?",
          answer: "IVF due dates are calculated from the embryo transfer date rather than LMP. Since the exact embryo age is known, IVF calculations are the most precise. A Day 5 blastocyst transfer adds 261 days (266 − 5 days of embryo development). A Day 3 cleavage transfer adds 263 days. Your fertility clinic typically provides this calculation.",
        },
        {
          question: "Can my due date change during pregnancy?",
          answer: "Yes, your healthcare provider may adjust your due date based on ultrasound measurements, especially if there's a significant discrepancy with LMP dating. This is most common after a first trimester ultrasound. Once established by early ultrasound, the due date typically shouldn't be changed based on later scans, as measurement accuracy decreases as pregnancy progresses.",
        },
        {
          question: "What are the three trimesters?",
          answer: "The first trimester spans weeks 1-12 (organ formation and highest miscarriage risk), the second trimester covers weeks 13-27 (most comfortable period, baby movement begins), and the third trimester runs from week 28 to delivery (rapid growth, preparation for birth). Each trimester involves different prenatal tests and developmental milestones.",
        },
        {
          question: "What does 'gestational age' mean vs. 'fetal age'?",
          answer: "Gestational age is counted from the first day of your last menstrual period (LMP), which is about 2 weeks before conception. Fetal age (also called embryonic age) is counted from actual conception. So at '8 weeks pregnant' (gestational), the embryo is actually about 6 weeks old. Medical professionals use gestational age as the standard.",
        },
        {
          question: "When should I tell my doctor my due date?",
          answer: "Share your LMP date and any fertility tracking data at your first prenatal appointment (typically 8-10 weeks). Your doctor will likely confirm or adjust your due date with an early ultrasound. If you conceived through IVF, bring your transfer date and embryo day information. Having accurate dating from early pregnancy is important for monitoring fetal growth.",
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
      "name": "Calculadora de Fecha de Parto del Embarazo",
      "slug": "calculadora-fecha-parto-embarazo",
      "subtitle": "Calcula tu fecha estimada de parto usando 5 métodos — FUM, concepción, ultrasonido, transferencia FIV, o fecha conocida con cronología de trimestres",
      "breadcrumb": "Fecha de Parto",
      "seo": {
        "title": "Calculadora de Fecha de Parto del Embarazo — Estima la Llegada del Bebé | Gratis",
        "description": "Calcula tu fecha de parto del embarazo con 5 métodos: FUM, fecha de concepción, ultrasonido, transferencia FIV. Obtén cronología de trimestres, calendario de hitos y progreso semana a semana.",
        "shortDescription": "Estima la fecha de parto de tu bebé con 5 métodos de cálculo y una cronología completa de hitos",
        "keywords": [
          "calculadora fecha de parto embarazo",
          "calculadora fecha de parto",
          "fecha estimada de parto",
          "calculadora de embarazo",
          "cuándo nace mi bebé",
          "calculadora fep",
          "calculadora fecha parto fiv",
          "calculadora semanas embarazo"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "method": {
          "label": "Método de Cálculo",
          "helpText": "Elige el método que mejor coincida con tu información disponible",
          "options": {
            "lmp": "Fecha de Última Menstruación (FUM)",
            "conception": "Fecha de Concepción / Ovulación",
            "ultrasound": "Datación por Ultrasonido",
            "ivf": "Transferencia de Embrión FIV",
            "knownDueDate": "Fecha de Parto Conocida (reverso)"
          }
        },
        "lmpDate": {
          "label": "Primer Día de Última Menstruación",
          "helpText": "El primer día de tu período menstrual más reciente — este es el método estándar usado por la mayoría de doctores"
        },
        "adjustCycle": {
          "label": "Ajustar por Duración del Ciclo",
          "helpText": "Habilita si tu ciclo no es de los 28 días estándar — ajusta la fecha de parto en consecuencia"
        },
        "cycleLength": {
          "label": "Duración Promedio del Ciclo",
          "helpText": "El rango normal es 21-35 días. El cálculo estándar asume 28 días"
        },
        "conceptionDate": {
          "label": "Fecha de Concepción / Ovulación",
          "helpText": "La fecha en que crees que ocurrió la concepción (día de ovulación)"
        },
        "ultrasoundDate": {
          "label": "Fecha del Ultrasonido",
          "helpText": "La fecha en que se realizó tu ultrasonido de datación"
        },
        "ultrasoundWeeks": {
          "label": "Edad Gestacional (Semanas)",
          "helpText": "Semanas de embarazo según se midió en el ultrasonido"
        },
        "ultrasoundDays": {
          "label": "Edad Gestacional (Días)",
          "helpText": "Días adicionales más allá de semanas completas (0-6)"
        },
        "ivfDate": {
          "label": "Fecha de Transferencia de Embrión",
          "helpText": "La fecha en que el embrión fue transferido al útero"
        },
        "embryoDay": {
          "label": "Etapa del Embrión",
          "helpText": "Las transferencias de día 5 (blastocisto) son más comunes en FIV moderna",
          "options": {
            "day3": "Embrión Día 3 (Clivaje)",
            "day5": "Embrión Día 5 (Blastocisto)",
            "day6": "Embrión Día 6 (Blastocisto Expandido)"
          }
        },
        "knownDueDate": {
          "label": "Fecha de Parto Conocida",
          "helpText": "Ingresa tu fecha de parto para ver la cronología completa de hitos y calcular fechas clave en reverso"
        }
      },
      "results": {
        "dueDate": {
          "label": "Fecha Estimada de Parto"
        },
        "gestationalAge": {
          "label": "Edad Gestacional Actual"
        },
        "daysRemaining": {
          "label": "Días Restantes"
        },
        "trimester": {
          "label": "Trimestre Actual"
        },
        "conceptionEstimate": {
          "label": "Concepción Estimada"
        },
        "safeWindowStart": {
          "label": "Término Temprano (37 semanas)"
        },
        "safeWindowEnd": {
          "label": "Término Tardío (42 semanas)"
        },
        "progressPercent": {
          "label": "Progreso del Embarazo"
        },
        "zodiacSign": {
          "label": "Signo Zodiacal del Bebé"
        },
        "birthstone": {
          "label": "Piedra de Nacimiento del Bebé"
        }
      },
      "presets": {
        "recentLmp": {
          "label": "FUM (hace 8 semanas)",
          "description": "Método FUM estándar, ciclo de 28 días"
        },
        "ivfDay5": {
          "label": "FIV Día 5",
          "description": "Transferencia de blastocisto, hace 6 semanas"
        },
        "ultrasoundDating": {
          "label": "Datación por Ultrasonido",
          "description": "10 semanas 3 días, hace 2 semanas"
        },
        "longCycle": {
          "label": "Ciclo Largo (35 días)",
          "description": "FUM con ajuste de ciclo de 35 días"
        }
      },
      "values": {
        "weeks": "semanas",
        "days": "días",
        "trimester1": "1er Trimestre",
        "trimester2": "2do Trimestre",
        "trimester3": "3er Trimestre"
      },
      "formats": {
        "summary": "Tu fecha estimada de parto es {dueDate}. Actualmente tienes {gestationalAge} de embarazo con {daysRemaining} días por delante ({progressPercent}% completo)."
      },
      "infoCards": {
        "keyDates": {
          "title": "Fechas Clave",
          "items": [
            {
              "label": "Fecha Estimada de Parto",
              "valueKey": "dueDate"
            },
            {
              "label": "Edad Gestacional Actual",
              "valueKey": "gestationalAge"
            },
            {
              "label": "Término Temprano (37 sem)",
              "valueKey": "safeWindowStart"
            },
            {
              "label": "Término Tardío (42 sem)",
              "valueKey": "safeWindowEnd"
            }
          ]
        },
        "funFacts": {
          "title": "Datos Curiosos sobre tu Bebé",
          "items": [
            {
              "label": "Signo Zodiacal",
              "valueKey": "zodiacSign"
            },
            {
              "label": "Piedra de Nacimiento",
              "valueKey": "birthstone"
            },
            {
              "label": "Días Restantes",
              "valueKey": "daysRemaining"
            },
            {
              "label": "Progreso",
              "valueKey": "progressPercent"
            }
          ]
        },
        "tips": {
          "title": "Consejos del Primer Trimestre",
          "items": [
            "Programa tu primera visita prenatal entre las semanas 8-10 — antes si tienes factores de riesgo o más de 35 años",
            "Toma 400-800 mcg de ácido fólico diariamente para reducir el riesgo de defectos del tubo neural hasta en un 70%",
            "Solo alrededor del 5% de los bebés llegan en su fecha de parto — la mayoría viene dentro de una ventana de 37-42 semanas",
            "La fatiga del primer trimestre es normal — tu cuerpo está construyendo la placenta, lo que requiere energía enorme"
          ]
        }
      },
      "chart": {
        "title": "Progreso por Trimestre",
        "xLabel": "Trimestre",
        "yLabel": "Semanas",
        "series": {
          "completed": "Completado",
          "remaining": "Restante"
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Cómo se Calcula una Fecha de Parto del Embarazo?",
          "content": "Una fecha de parto del embarazo (también llamada Fecha Estimada de Parto o FEP) se calcula como 280 días (40 semanas) desde el primer día de tu última menstruación (FUM). Este método, conocido como regla de Naegele, ha sido el estándar desde principios del siglo XIX. Aunque asume un ciclo de 28 días con ovulación en el día 14, las calculadoras modernas pueden ajustarse para diferentes duraciones de ciclo. Es importante entender que tu fecha de parto es una estimación — solo alrededor del 5% de los bebés nacen en su fecha exacta de parto. La mayoría de los nacimientos ocurren dentro de una ventana de cinco semanas entre las 37 y 42 semanas de gestación. Tu proveedor de salud puede ajustar tu fecha de parto basándose en mediciones de ultrasonido temprano, que son más precisas en el primer trimestre."
        },
        "howItWorks": {
          "title": "Entendiendo los 5 Métodos de Cálculo",
          "content": "El método FUM añade 280 días a la fecha de inicio de tu último período, ajustando si tu ciclo no es de 28 días. El método de Concepción añade 266 días desde la fecha de ovulación conocida o estimada. La datación por ultrasonido usa mediciones de una ecografía temprana para estimar la edad gestacional, luego calcula hacia atrás para determinar tu FEP — esto se considera el método más preciso cuando se hace antes de las 14 semanas. Los cálculos FIV son los más precisos porque la edad exacta del embrión es conocida: añadir 263 días para transferencia de Día 3, 261 para Día 5, o 260 para Día 6. El método de Fecha de Parto Conocida funciona en reverso, mostrándote todos los hitos y fechas clave basados en una FEP que ya has recibido de tu doctor."
        },
        "methods": {
          "title": "Métodos de Cálculo Explicados",
          "items": [
            {
              "text": "FUM (Regla de Naegele): FEP = FUM + 280 días. Para ciclos no-28-días, ajustar añadiendo (duración del ciclo − 28) días. Este es el método más comúnmente usado mundialmente.",
              "type": "info"
            },
            {
              "text": "Fecha de Concepción: FEP = Concepción + 266 días. Más preciso cuando conoces tu fecha exacta de ovulación a través de seguimiento o pruebas de ovulación.",
              "type": "info"
            },
            {
              "text": "Datación por Ultrasonido: Cuando se hace antes de las 14 semanas, la precisión es ±5-7 días. Después de las 20 semanas, la precisión baja a ±2-3 semanas. ACOG recomienda usar fechas de ultrasonido si difieren de FUM por más de 7 días.",
              "type": "info"
            },
            {
              "text": "Transferencia FIV: El método más preciso — la edad del embrión es conocida exactamente. Embrión día 3: FEP = Transferencia + 263 días. Blastocisto día 5: FEP = Transferencia + 261 días.",
              "type": "info"
            },
            {
              "text": "Fecha de Parto Conocida: Cálculo reverso desde una FEP existente. Útil para determinar fecha de concepción, equivalente FUM, y todas las fechas de hitos.",
              "type": "info"
            }
          ]
        },
        "factors": {
          "title": "Factores que Afectan tu Fecha de Parto",
          "items": [
            {
              "text": "Duración del ciclo: Mujeres con ciclos de 35 días ovulan aproximadamente una semana más tarde que aquellas con ciclos de 28 días, cambiando la fecha de parto por 7 días. Siempre ajusta si tu ciclo no es de 28 días.",
              "type": "warning"
            },
            {
              "text": "Primer embarazo: Madres primerizas tienden a dar a luz ligeramente más tarde — un promedio de 1-2 días después de su FEP comparado con embarazos subsecuentes.",
              "type": "info"
            },
            {
              "text": "Precisión del ultrasonido: Ultrasonidos del primer trimestre (antes de 14 semanas) son precisos a ±5 días. Segundo trimestre baja a ±10 días, y tercer trimestre a ±21 días.",
              "type": "info"
            },
            {
              "text": "Edad materna: Mujeres mayores de 35 tienen un riesgo ligeramente mayor de pasar su fecha de parto, mientras que madres adolescentes tienden a dar a luz ligeramente antes.",
              "type": "info"
            },
            {
              "text": "Embarazos múltiples: Gemelos promedian 36 semanas, trillizos promedian 32 semanas. Los cálculos estándar de fecha de parto asumen un embarazo único.",
              "type": "warning"
            },
            {
              "text": "Variación natural: Un estudio de 2013 encontró que la duración natural del embarazo varía hasta 37 días (5+ semanas) entre mujeres, incluso después de considerar todos los factores medibles.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo de Fecha de Parto",
          "description": "Ejemplos paso a paso usando diferentes métodos",
          "examples": [
            {
              "title": "Método FUM — Ciclo de 28 días",
              "steps": [
                "Última Menstruación: 1 de enero, 2026",
                "Fórmula: FUM + 280 días",
                "1 de enero + 280 días = 8 de octubre, 2026",
                "Concepción Estimada: ~15 de enero (día 14)",
                "Actual: Si hoy es 10 de feb → 5 semanas 5 días de embarazo"
              ],
              "result": "Fecha de Parto: 8 de octubre, 2026"
            },
            {
              "title": "Transferencia FIV Blastocisto Día 5",
              "steps": [
                "Fecha de Transferencia: 5 de enero, 2026",
                "Etapa del Embrión: Blastocisto Día 5",
                "Fórmula: Transferencia + 261 días",
                "5 de enero + 261 días = 23 de septiembre, 2026",
                "FUM Equivalente: 17 de diciembre, 2025 (FEP − 280)"
              ],
              "result": "Fecha de Parto: 23 de septiembre, 2026"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Qué tan precisa es una calculadora de fecha de parto?",
          "answer": "Las calculadoras de fecha de parto proporcionan una estimación — solo alrededor del 5% de los bebés nacen en su fecha exacta de parto. Sin embargo, cerca del 80% de los bebés llegan dentro de la ventana de 37-42 semanas. La datación por ultrasonido del primer trimestre es el método más preciso (±5 días), mientras que los cálculos FUM pueden estar desfasados por 1-2 semanas dependiendo de la regularidad del ciclo. Las fechas de parto FIV son las más precisas porque la edad del embrión es conocida exactamente."
        },
        {
          "question": "¿Qué pasa si mi ciclo es más largo o más corto que 28 días?",
          "answer": "Si tu ciclo no es de 28 días, tu ovulación probablemente no ocurre en el día 14. Para un ciclo de 35 días, la ovulación ocurre alrededor del día 21, haciendo tu fecha de parto aproximadamente 7 días más tarde que el cálculo estándar. Nuestra calculadora se ajusta automáticamente cuando habilitas el interruptor de duración del ciclo. Este ajuste es crucial para la precisión — un ciclo de 35 días cambiaría tu fecha de parto por una semana completa."
        },
        {
          "question": "¿Debo usar datación FUM o por ultrasonido?",
          "answer": "ACOG recomienda usar datación por ultrasonido si la FEP del ultrasonido difiere de FUM por más de 7 días en el primer trimestre, más de 10 días en el segundo trimestre, o más de 21 días en el tercer trimestre. El ultrasonido temprano (8-13 semanas) es generalmente más preciso que FUM, especialmente para mujeres con ciclos irregulares."
        },
        {
          "question": "¿Cómo es diferente la fecha de parto FIV de la concepción natural?",
          "answer": "Las fechas de parto FIV se calculan desde la fecha de transferencia del embrión en lugar de FUM. Dado que la edad exacta del embrión es conocida, los cálculos FIV son los más precisos. Una transferencia de blastocisto Día 5 añade 261 días (266 − 5 días de desarrollo embrionario). Una transferencia de clivaje Día 3 añade 263 días. Tu clínica de fertilidad típicamente proporciona este cálculo."
        },
        {
          "question": "¿Puede cambiar mi fecha de parto durante el embarazo?",
          "answer": "Sí, tu proveedor de salud puede ajustar tu fecha de parto basándose en mediciones de ultrasonido, especialmente si hay una discrepancia significativa con la datación FUM. Esto es más común después de un ultrasonido del primer trimestre. Una vez establecida por ultrasonido temprano, la fecha de parto típicamente no debería cambiar basándose en ecografías posteriores, ya que la precisión de medición disminuye conforme progresa el embarazo."
        },
        {
          "question": "¿Cuáles son los tres trimestres?",
          "answer": "El primer trimestre abarca las semanas 1-12 (formación de órganos y mayor riesgo de aborto), el segundo trimestre cubre las semanas 13-27 (período más cómodo, comienza movimiento del bebé), y el tercer trimestre va desde la semana 28 hasta el parto (crecimiento rápido, preparación para el nacimiento). Cada trimestre involucra diferentes pruebas prenatales e hitos de desarrollo."
        },
        {
          "question": "¿Qué significa 'edad gestacional' vs. 'edad fetal'?",
          "answer": "La edad gestacional se cuenta desde el primer día de tu última menstruación (FUM), que es aproximadamente 2 semanas antes de la concepción. La edad fetal (también llamada edad embrionaria) se cuenta desde la concepción real. Así que a las '8 semanas de embarazo' (gestacional), el embrión tiene realmente aproximadamente 6 semanas de edad. Los profesionales médicos usan la edad gestacional como estándar."
        },
        {
          "question": "¿Cuándo debo decirle a mi doctor mi fecha de parto?",
          "answer": "Comparte tu fecha FUM y cualquier dato de seguimiento de fertilidad en tu primera cita prenatal (típicamente 8-10 semanas). Tu doctor probablemente confirmará o ajustará tu fecha de parto con un ultrasonido temprano. Si concebiste a través de FIV, trae tu fecha de transferencia e información del día del embrión. Tener datación precisa desde el embarazo temprano es importante para monitorear el crecimiento fetal."
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
      "name": "Calculadora de Data Provável do Parto",
      "slug": "calculadora-data-provavel-parto",
      "subtitle": "Calcule sua data provável do parto usando 5 métodos — DUM, concepção, ultrassom, transferência de FIV, ou data conhecida com cronograma de trimestres",
      "breadcrumb": "Data do Parto",
      "seo": {
        "title": "Calculadora de Data Provável do Parto — Estime a Chegada do Bebê | Gratuito",
        "description": "Calcule sua data provável do parto com 5 métodos: DUM, data da concepção, ultrassom, transferência de FIV. Obtenha cronograma de trimestres, marcos importantes e progresso semana a semana.",
        "shortDescription": "Estime a data provável do seu bebê com 5 métodos de cálculo e cronograma completo de marcos",
        "keywords": [
          "calculadora data provável parto",
          "calculadora data parto",
          "data estimada parto",
          "calculadora gravidez",
          "quando meu bebê nasce",
          "calculadora dpp",
          "calculadora data parto fiv",
          "calculadora semanas gravidez"
        ]
      },
      "inputs": {
        "method": {
          "label": "Método de Cálculo",
          "helpText": "Escolha o método que melhor se adequa às suas informações disponíveis",
          "options": {
            "lmp": "Data da Última Menstruação (DUM)",
            "conception": "Data da Concepção / Ovulação",
            "ultrasound": "Datação por Ultrassom",
            "ivf": "Transferência de Embrião FIV",
            "knownDueDate": "Data Conhecida do Parto (reverso)"
          }
        },
        "lmpDate": {
          "label": "Primeiro Dia da Última Menstruação",
          "helpText": "O primeiro dia da sua menstruação mais recente — este é o método padrão usado pela maioria dos médicos"
        },
        "adjustCycle": {
          "label": "Ajustar para Duração do Ciclo",
          "helpText": "Ative se seu ciclo não for o padrão de 28 dias — ajusta a data do parto adequadamente"
        },
        "cycleLength": {
          "label": "Duração Média do Ciclo",
          "helpText": "Faixa normal é de 21-35 dias. Cálculo padrão assume 28 dias"
        },
        "conceptionDate": {
          "label": "Data da Concepção / Ovulação",
          "helpText": "A data em que você acredita que a concepção ocorreu (dia da ovulação)"
        },
        "ultrasoundDate": {
          "label": "Data do Ultrassom",
          "helpText": "A data em que seu ultrassom de datação foi realizado"
        },
        "ultrasoundWeeks": {
          "label": "Idade Gestacional (Semanas)",
          "helpText": "Semanas de gravidez conforme medido no ultrassom"
        },
        "ultrasoundDays": {
          "label": "Idade Gestacional (Dias)",
          "helpText": "Dias adicionais além das semanas completas (0-6)"
        },
        "ivfDate": {
          "label": "Data da Transferência do Embrião",
          "helpText": "A data em que o embrião foi transferido para o útero"
        },
        "embryoDay": {
          "label": "Estágio do Embrião",
          "helpText": "Transferências do dia 5 (blastocisto) são mais comuns na FIV moderna",
          "options": {
            "day3": "Embrião Dia 3 (Clivagem)",
            "day5": "Embrião Dia 5 (Blastocisto)",
            "day6": "Embrião Dia 6 (Blastocisto Expandido)"
          }
        },
        "knownDueDate": {
          "label": "Data Conhecida do Parto",
          "helpText": "Digite sua data do parto para ver o cronograma completo de marcos e calcular reversamente as datas importantes"
        }
      },
      "results": {
        "dueDate": {
          "label": "Data Provável do Parto"
        },
        "gestationalAge": {
          "label": "Idade Gestacional Atual"
        },
        "daysRemaining": {
          "label": "Dias Restantes"
        },
        "trimester": {
          "label": "Trimestre Atual"
        },
        "conceptionEstimate": {
          "label": "Concepção Estimada"
        },
        "safeWindowStart": {
          "label": "Termo Precoce (37 semanas)"
        },
        "safeWindowEnd": {
          "label": "Termo Tardio (42 semanas)"
        },
        "progressPercent": {
          "label": "Progresso da Gravidez"
        },
        "zodiacSign": {
          "label": "Signo do Bebê"
        },
        "birthstone": {
          "label": "Pedra de Nascimento do Bebê"
        }
      },
      "presets": {
        "recentLmp": {
          "label": "DUM (8 semanas atrás)",
          "description": "Método DUM padrão, ciclo de 28 dias"
        },
        "ivfDay5": {
          "label": "FIV Dia 5",
          "description": "Transferência de blastocisto, 6 semanas atrás"
        },
        "ultrasoundDating": {
          "label": "Datação por Ultrassom",
          "description": "10 semanas 3 dias, 2 semanas atrás"
        },
        "longCycle": {
          "label": "Ciclo Longo (35 dias)",
          "description": "DUM com ajuste de ciclo de 35 dias"
        }
      },
      "values": {
        "weeks": "semanas",
        "days": "dias",
        "trimester1": "1º Trimestre",
        "trimester2": "2º Trimestre",
        "trimester3": "3º Trimestre"
      },
      "formats": {
        "summary": "Sua data provável do parto é {dueDate}. Você está atualmente com {gestationalAge} de gravidez com {daysRemaining} dias restantes ({progressPercent}% completo)."
      },
      "infoCards": {
        "keyDates": {
          "title": "Datas Importantes",
          "items": [
            {
              "label": "Data Provável do Parto",
              "valueKey": "dueDate"
            },
            {
              "label": "Idade Gestacional Atual",
              "valueKey": "gestationalAge"
            },
            {
              "label": "Termo Precoce (37 sem)",
              "valueKey": "safeWindowStart"
            },
            {
              "label": "Termo Tardio (42 sem)",
              "valueKey": "safeWindowEnd"
            }
          ]
        },
        "funFacts": {
          "title": "Curiosidades Sobre Seu Bebê",
          "items": [
            {
              "label": "Signo do Zodíaco",
              "valueKey": "zodiacSign"
            },
            {
              "label": "Pedra de Nascimento",
              "valueKey": "birthstone"
            },
            {
              "label": "Dias Restantes",
              "valueKey": "daysRemaining"
            },
            {
              "label": "Progresso",
              "valueKey": "progressPercent"
            }
          ]
        },
        "tips": {
          "title": "Dicas do Primeiro Trimestre",
          "items": [
            "Agende sua primeira consulta pré-natal entre as semanas 8-10 — mais cedo se tiver fatores de risco ou mais de 35 anos",
            "Tome 400-800 mcg de ácido fólico diariamente para reduzir o risco de defeitos do tubo neural em até 70%",
            "Apenas cerca de 5% dos bebês chegam na data prevista — a maioria vem dentro da janela de 37-42 semanas",
            "A fadiga do primeiro trimestre é normal — seu corpo está construindo a placenta, que requer energia enorme"
          ]
        }
      },
      "chart": {
        "title": "Progresso dos Trimestres",
        "xLabel": "Trimestre",
        "yLabel": "Semanas",
        "series": {
          "completed": "Completo",
          "remaining": "Restante"
        }
      },
      "education": {
        "whatIs": {
          "title": "Como é Calculada a Data Provável do Parto?",
          "content": "A data provável do parto (também chamada de Data Provável do Parto ou DPP) é calculada como 280 dias (40 semanas) a partir do primeiro dia da sua última menstruação (DUM). Este método, conhecido como regra de Naegele, tem sido o padrão desde o início dos anos 1800. Embora assuma um ciclo de 28 dias com ovulação no dia 14, calculadoras modernas podem ajustar para diferentes durações de ciclo. É importante entender que sua data do parto é uma estimativa — apenas cerca de 5% dos bebês nascem na data exata prevista. A maioria dos nascimentos ocorre dentro de uma janela de cinco semanas entre 37 e 42 semanas de gestação. Seu profissional de saúde pode ajustar sua data do parto com base em medições de ultrassom precoce, que são mais precisas no primeiro trimestre."
        },
        "howItWorks": {
          "title": "Entendendo os 5 Métodos de Cálculo",
          "content": "O método DUM adiciona 280 dias à data de início da sua última menstruação, ajustando se seu ciclo não for de 28 dias. O método de Concepção adiciona 266 dias da data conhecida ou estimada da ovulação. A datação por ultrassom usa medições de um exame precoce para estimar a idade gestacional, depois calcula para trás para determinar sua DPP — este é considerado o método mais preciso quando feito antes de 14 semanas. Cálculos de FIV são os mais precisos porque a idade exata do embrião é conhecida: adicione 263 dias para transferência do Dia 3, 261 para Dia 5, ou 260 para Dia 6. O método de Data Conhecida funciona ao contrário, mostrando todos os marcos e datas importantes baseado em uma DPP que você já recebeu do seu médico."
        },
        "methods": {
          "title": "Métodos de Cálculo Explicados",
          "items": [
            {
              "text": "DUM (Regra de Naegele): DPP = DUM + 280 dias. Para ciclos não-28-dias, ajuste adicionando (duração do ciclo − 28) dias. Este é o método mais usado mundialmente.",
              "type": "info"
            },
            {
              "text": "Data da Concepção: DPP = Concepção + 266 dias. Mais preciso quando você conhece sua data exata de ovulação através de acompanhamento ou teste de LH.",
              "type": "info"
            },
            {
              "text": "Datação por Ultrassom: Quando feito antes de 14 semanas, precisão é ±5-7 dias. Após 20 semanas, precisão cai para ±2-3 semanas. ACOG recomenda usar datas de ultrassom se diferirem da DUM por mais de 7 dias.",
              "type": "info"
            },
            {
              "text": "Transferência FIV: O método mais preciso — idade do embrião é conhecida exatamente. Embrião Dia 3: DPP = Transferência + 263 dias. Blastocisto Dia 5: DPP = Transferência + 261 dias.",
              "type": "info"
            },
            {
              "text": "Data Conhecida do Parto: Cálculo reverso de uma DPP existente. Útil para determinar data de concepção, equivalente DUM, e todas as datas marcos.",
              "type": "info"
            }
          ]
        },
        "factors": {
          "title": "Fatores que Afetam sua Data do Parto",
          "items": [
            {
              "text": "Duração do ciclo: Mulheres com ciclos de 35 dias ovulam cerca de uma semana mais tarde que aquelas com ciclos de 28 dias, mudando a data do parto em 7 dias. Sempre ajuste se seu ciclo não for de 28 dias.",
              "type": "warning"
            },
            {
              "text": "Primeira gravidez: Mães de primeira viagem tendem a dar à luz ligeiramente mais tarde — uma média de 1-2 dias após sua DPP comparado a gestações subsequentes.",
              "type": "info"
            },
            {
              "text": "Precisão do ultrassom: Ultrassons do primeiro trimestre (antes de 14 semanas) são precisos em ±5 dias. Segundo trimestre cai para ±10 dias, e terceiro trimestre para ±21 dias.",
              "type": "info"
            },
            {
              "text": "Idade materna: Mulheres acima de 35 anos têm risco ligeiramente maior de passar da data prevista, enquanto mães adolescentes tendem a dar à luz ligeiramente mais cedo.",
              "type": "info"
            },
            {
              "text": "Gestações múltiplas: Gêmeos em média 36 semanas, trigêmeos em média 32 semanas. Cálculos padrão de data do parto assumem gravidez única.",
              "type": "warning"
            },
            {
              "text": "Variação natural: Um estudo de 2013 encontrou que a duração natural da gravidez varia até 37 dias (5+ semanas) entre mulheres, mesmo após considerar todos os fatores mensuráveis.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo de Data do Parto",
          "description": "Exemplos passo a passo usando diferentes métodos",
          "examples": [
            {
              "title": "Método DUM — Ciclo de 28 dias",
              "steps": [
                "Última Menstruação: 1º de janeiro de 2026",
                "Fórmula: DUM + 280 dias",
                "1º de janeiro + 280 dias = 8 de outubro de 2026",
                "Concepção Estimada: ~15 de janeiro (dia 14)",
                "Atual: Se hoje é 10 de fev → 5 semanas 5 dias de gravidez"
              ],
              "result": "Data do Parto: 8 de outubro de 2026"
            },
            {
              "title": "FIV Blastocisto Dia 5",
              "steps": [
                "Data da Transferência: 5 de janeiro de 2026",
                "Estágio do Embrião: Blastocisto Dia 5",
                "Fórmula: Transferência + 261 dias",
                "5 de janeiro + 261 dias = 23 de setembro de 2026",
                "DUM Equivalente: 17 de dezembro de 2025 (DPP − 280)"
              ],
              "result": "Data do Parto: 23 de setembro de 2026"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quão precisa é uma calculadora de data do parto?",
          "answer": "Calculadoras de data do parto fornecem uma estimativa — apenas cerca de 5% dos bebês nascem na data exata prevista. No entanto, cerca de 80% dos bebês chegam dentro da janela de 37-42 semanas. Datação por ultrassom do primeiro trimestre é o método mais preciso (±5 dias), enquanto cálculos de DUM podem estar errados por 1-2 semanas dependendo da regularidade do ciclo. Datas de FIV são as mais precisas porque a idade do embrião é conhecida exatamente."
        },
        {
          "question": "E se meu ciclo for mais longo ou mais curto que 28 dias?",
          "answer": "Se seu ciclo não for de 28 dias, sua ovulação provavelmente não ocorre no dia 14. Para um ciclo de 35 dias, a ovulação ocorre por volta do dia 21, fazendo sua data do parto cerca de 7 dias mais tarde que o cálculo padrão. Nossa calculadora ajusta automaticamente quando você ativa o ajuste de duração do ciclo. Este ajuste é crucial para precisão — um ciclo de 35 dias mudaria sua data do parto em uma semana inteira."
        },
        {
          "question": "Devo usar datação por DUM ou ultrassom?",
          "answer": "ACOG recomenda usar datação por ultrassom se a DPP do ultrassom diferir da DUM por mais de 7 dias no primeiro trimestre, mais de 10 dias no segundo trimestre, ou mais de 21 dias no terceiro trimestre. Ultrassom precoce (8-13 semanas) é geralmente mais preciso que DUM, especialmente para mulheres com ciclos irregulares."
        },
        {
          "question": "Como a data do parto por FIV é diferente da concepção natural?",
          "answer": "Datas do parto por FIV são calculadas a partir da data de transferência do embrião ao invés da DUM. Como a idade exata do embrião é conhecida, cálculos de FIV são os mais precisos. Uma transferência de blastocisto Dia 5 adiciona 261 dias (266 − 5 dias de desenvolvimento do embrião). Uma transferência de clivagem Dia 3 adiciona 263 dias. Sua clínica de fertilidade tipicamente fornece este cálculo."
        },
        {
          "question": "Minha data do parto pode mudar durante a gravidez?",
          "answer": "Sim, seu profissional de saúde pode ajustar sua data do parto baseado em medições de ultrassom, especialmente se houver discrepância significativa com a datação por DUM. Isso é mais comum após um ultrassom do primeiro trimestre. Uma vez estabelecida por ultrassom precoce, a data do parto tipicamente não deveria ser mudada baseada em exames posteriores, pois a precisão da medição diminui conforme a gravidez progride."
        },
        {
          "question": "Quais são os três trimestres?",
          "answer": "O primeiro trimestre abrange as semanas 1-12 (formação de órgãos e maior risco de aborto), o segundo trimestre cobre as semanas 13-27 (período mais confortável, movimento do bebê começa), e o terceiro trimestre vai da semana 28 até o parto (crescimento rápido, preparação para nascimento). Cada trimestre envolve diferentes exames pré-natais e marcos de desenvolvimento."
        },
        {
          "question": "O que significa 'idade gestacional' vs. 'idade fetal'?",
          "answer": "Idade gestacional é contada a partir do primeiro dia da sua última menstruação (DUM), que é cerca de 2 semanas antes da concepção. Idade fetal (também chamada idade embrionária) é contada a partir da concepção real. Então em '8 semanas de gravidez' (gestacional), o embrião tem na verdade cerca de 6 semanas. Profissionais médicos usam idade gestacional como padrão."
        },
        {
          "question": "Quando devo informar ao médico minha data do parto?",
          "answer": "Compartilhe sua data de DUM e quaisquer dados de acompanhamento de fertilidade na sua primeira consulta pré-natal (tipicamente 8-10 semanas). Seu médico provavelmente confirmará ou ajustará sua data do parto com um ultrassom precoce. Se você concebeu através de FIV, traga sua data de transferência e informação do dia do embrião. Ter datação precisa desde o início da gravidez é importante para monitorar o crescimento fetal."
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
      "name": "Calculateur de Date d'Accouchement",
      "slug": "calculateur-date-accouchement-grossesse",
      "subtitle": "Calculez votre date d'accouchement estimée avec 5 méthodes — DDR, conception, échographie, transfert FIV, ou date connue avec chronologie des trimestres",
      "breadcrumb": "Date d'Accouchement",
      "seo": {
        "title": "Calculateur Date d'Accouchement — Estimez l'Arrivée de Bébé | Gratuit",
        "description": "Calculez votre date d'accouchement avec 5 méthodes : DDR, date de conception, échographie, transfert FIV. Obtenez la chronologie des trimestres, le calendrier des étapes et le suivi semaine par semaine.",
        "shortDescription": "Estimez la date d'accouchement de votre bébé avec 5 méthodes de calcul et une chronologie complète des étapes",
        "keywords": [
          "calculateur date accouchement grossesse",
          "calculateur date accouchement",
          "date accouchement estimée",
          "calculateur grossesse",
          "quand bébé va naître",
          "calculateur dpa",
          "calculateur date accouchement fiv",
          "calculateur semaine grossesse"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "method": {
          "label": "Méthode de Calcul",
          "helpText": "Choisissez la méthode qui correspond le mieux aux informations dont vous disposez",
          "options": {
            "lmp": "Dernières Règles (DDR)",
            "conception": "Date de Conception / Ovulation",
            "ultrasound": "Datation par Échographie",
            "ivf": "Transfert d'Embryon FIV",
            "knownDueDate": "Date d'Accouchement Connue (inverse)"
          }
        },
        "lmpDate": {
          "label": "Premier Jour des Dernières Règles",
          "helpText": "Le premier jour de vos règles les plus récentes — c'est la méthode standard utilisée par la plupart des médecins"
        },
        "adjustCycle": {
          "label": "Ajuster pour la Durée du Cycle",
          "helpText": "Activez si votre cycle n'est pas de 28 jours standard — ajuste la date d'accouchement en conséquence"
        },
        "cycleLength": {
          "label": "Durée Moyenne du Cycle",
          "helpText": "La plage normale est de 21-35 jours. Le calcul standard suppose 28 jours"
        },
        "conceptionDate": {
          "label": "Date de Conception / Ovulation",
          "helpText": "La date à laquelle vous pensez que la conception a eu lieu (jour d'ovulation)"
        },
        "ultrasoundDate": {
          "label": "Date de l'Échographie",
          "helpText": "La date à laquelle votre échographie de datation a été effectuée"
        },
        "ultrasoundWeeks": {
          "label": "Âge Gestationnel (Semaines)",
          "helpText": "Semaines de grossesse mesurées à l'échographie"
        },
        "ultrasoundDays": {
          "label": "Âge Gestationnel (Jours)",
          "helpText": "Jours supplémentaires au-delà des semaines complètes (0-6)"
        },
        "ivfDate": {
          "label": "Date de Transfert d'Embryon",
          "helpText": "La date à laquelle l'embryon a été transféré dans l'utérus"
        },
        "embryoDay": {
          "label": "Stade de l'Embryon",
          "helpText": "Les transferts de jour 5 (blastocyste) sont les plus courants en FIV moderne",
          "options": {
            "day3": "Embryon Jour 3 (Clivage)",
            "day5": "Embryon Jour 5 (Blastocyste)",
            "day6": "Embryon Jour 6 (Blastocyste Expansé)"
          }
        },
        "knownDueDate": {
          "label": "Date d'Accouchement Connue",
          "helpText": "Entrez votre date d'accouchement pour voir la chronologie complète des étapes et calculer les dates clés en sens inverse"
        }
      },
      "results": {
        "dueDate": {
          "label": "Date d'Accouchement Estimée"
        },
        "gestationalAge": {
          "label": "Âge Gestationnel Actuel"
        },
        "daysRemaining": {
          "label": "Jours Restants"
        },
        "trimester": {
          "label": "Trimestre Actuel"
        },
        "conceptionEstimate": {
          "label": "Conception Estimée"
        },
        "safeWindowStart": {
          "label": "Terme Précoce (37 semaines)"
        },
        "safeWindowEnd": {
          "label": "Terme Tardif (42 semaines)"
        },
        "progressPercent": {
          "label": "Progression de la Grossesse"
        },
        "zodiacSign": {
          "label": "Signe Astrologique du Bébé"
        },
        "birthstone": {
          "label": "Pierre de Naissance du Bébé"
        }
      },
      "presets": {
        "recentLmp": {
          "label": "DDR (il y a 8 semaines)",
          "description": "Méthode DDR standard, cycle de 28 jours"
        },
        "ivfDay5": {
          "label": "FIV Jour 5",
          "description": "Transfert de blastocyste, il y a 6 semaines"
        },
        "ultrasoundDating": {
          "label": "Datation par Échographie",
          "description": "10 semaines 3 jours, il y a 2 semaines"
        },
        "longCycle": {
          "label": "Cycle Long (35 jours)",
          "description": "DDR avec ajustement de cycle de 35 jours"
        }
      },
      "values": {
        "weeks": "semaines",
        "days": "jours",
        "trimester1": "1er Trimestre",
        "trimester2": "2e Trimestre",
        "trimester3": "3e Trimestre"
      },
      "formats": {
        "summary": "Votre date d'accouchement estimée est le {dueDate}. Vous êtes actuellement enceinte de {gestationalAge} avec {daysRemaining} jours restants ({progressPercent}% terminé)."
      },
      "infoCards": {
        "keyDates": {
          "title": "Dates Clés",
          "items": [
            {
              "label": "Date d'Accouchement Estimée",
              "valueKey": "dueDate"
            },
            {
              "label": "Âge Gestationnel Actuel",
              "valueKey": "gestationalAge"
            },
            {
              "label": "Terme Précoce (37 sem)",
              "valueKey": "safeWindowStart"
            },
            {
              "label": "Terme Tardif (42 sem)",
              "valueKey": "safeWindowEnd"
            }
          ]
        },
        "funFacts": {
          "title": "Anecdotes Amusantes sur Votre Bébé",
          "items": [
            {
              "label": "Signe Astrologique",
              "valueKey": "zodiacSign"
            },
            {
              "label": "Pierre de Naissance",
              "valueKey": "birthstone"
            },
            {
              "label": "Jours Restants",
              "valueKey": "daysRemaining"
            },
            {
              "label": "Progression",
              "valueKey": "progressPercent"
            }
          ]
        },
        "tips": {
          "title": "Conseils Premier Trimestre",
          "items": [
            "Programmez votre première visite prénatale entre les semaines 8-10 — plus tôt si vous avez des facteurs de risque ou plus de 35 ans",
            "Prenez 400-800 mcg d'acide folique par jour pour réduire le risque d'anomalies du tube neural de jusqu'à 70%",
            "Seulement environ 5% des bébés arrivent à leur date d'accouchement prévue — la plupart naissent dans une fenêtre de 37-42 semaines",
            "La fatigue du premier trimestre est normale — votre corps construit le placenta, ce qui nécessite une énergie énorme"
          ]
        }
      },
      "chart": {
        "title": "Progression des Trimestres",
        "xLabel": "Trimestre",
        "yLabel": "Semaines",
        "series": {
          "completed": "Terminé",
          "remaining": "Restant"
        }
      },
      "education": {
        "whatIs": {
          "title": "Comment Calcule-t-on une Date d'Accouchement ?",
          "content": "Une date d'accouchement (aussi appelée Date Prévue d'Accouchement ou DPA) est calculée à 280 jours (40 semaines) à partir du premier jour de vos dernières règles (DDR). Cette méthode, connue sous le nom de règle de Naegele, est la norme depuis le début des années 1800. Bien qu'elle suppose un cycle de 28 jours avec ovulation au jour 14, les calculateurs modernes peuvent s'ajuster à différentes durées de cycle. Il est important de comprendre que votre date d'accouchement est une estimation — seulement environ 5% des bébés naissent à leur date exacte. La plupart des naissances se produisent dans une fenêtre de cinq semaines entre 37 et 42 semaines de gestation. Votre professionnel de santé peut ajuster votre date d'accouchement basé sur les mesures d'échographie précoce, qui sont les plus précises au premier trimestre."
        },
        "howItWorks": {
          "title": "Comprendre les 5 Méthodes de Calcul",
          "content": "La méthode DDR ajoute 280 jours à la date de début de vos dernières règles, en ajustant si votre cycle n'est pas de 28 jours. La méthode Conception ajoute 266 jours à partir de la date d'ovulation connue ou estimée. La datation par échographie utilise les mesures d'un scan précoce pour estimer l'âge gestationnel, puis calcule en arrière pour déterminer votre DPA — c'est considéré comme la méthode la plus précise quand fait avant 14 semaines. Les calculs FIV sont les plus précis car l'âge exact de l'embryon est connu : ajoutez 263 jours pour un transfert Jour 3, 261 pour Jour 5, ou 260 pour Jour 6. La méthode Date d'Accouchement Connue fonctionne en sens inverse, vous montrant toutes les étapes et dates clés basées sur une DPA que vous avez déjà reçue de votre médecin."
        },
        "methods": {
          "title": "Méthodes de Calcul Expliquées",
          "items": [
            {
              "text": "DDR (Règle de Naegele) : DPA = DDR + 280 jours. Pour les cycles non-28-jours, ajustez en ajoutant (durée du cycle − 28) jours. C'est la méthode la plus utilisée mondialement.",
              "type": "info"
            },
            {
              "text": "Date de Conception : DPA = Conception + 266 jours. Plus précise quand vous connaissez votre date d'ovulation exacte par suivi ou test d'ovulation.",
              "type": "info"
            },
            {
              "text": "Datation par Échographie : Quand fait avant 14 semaines, précision de ±5-7 jours. Après 20 semaines, la précision baisse à ±2-3 semaines. L'ACOG recommande d'utiliser les dates d'échographie si elles diffèrent des DDR de plus de 7 jours.",
              "type": "info"
            },
            {
              "text": "Transfert FIV : La méthode la plus précise — l'âge de l'embryon est connu exactement. Embryon Jour 3 : DPA = Transfert + 263 jours. Blastocyste Jour 5 : DPA = Transfert + 261 jours.",
              "type": "info"
            },
            {
              "text": "Date d'Accouchement Connue : Calcul inverse à partir d'une DPA existante. Utile pour déterminer la date de conception, équivalent DDR, et toutes les dates d'étapes.",
              "type": "info"
            }
          ]
        },
        "factors": {
          "title": "Facteurs qui Affectent Votre Date d'Accouchement",
          "items": [
            {
              "text": "Durée du cycle : Les femmes avec des cycles de 35 jours ovulent environ une semaine plus tard que celles avec des cycles de 28 jours, décalant la date d'accouchement de 7 jours. Toujours ajuster si votre cycle n'est pas de 28 jours.",
              "type": "warning"
            },
            {
              "text": "Première grossesse : Les primipares tendent à accoucher légèrement plus tard — une moyenne de 1-2 jours après leur DPA comparé aux grossesses suivantes.",
              "type": "info"
            },
            {
              "text": "Précision de l'échographie : Les échographies du premier trimestre (avant 14 semaines) sont précises à ±5 jours. Le deuxième trimestre baisse à ±10 jours, et le troisième trimestre à ±21 jours.",
              "type": "info"
            },
            {
              "text": "Âge maternel : Les femmes de plus de 35 ans ont un risque légèrement plus élevé de dépasser leur date d'accouchement, tandis que les mères adolescentes tendent à accoucher légèrement plus tôt.",
              "type": "info"
            },
            {
              "text": "Grossesses multiples : Les jumeaux font en moyenne 36 semaines, les triplés en moyenne 32 semaines. Les calculs de date d'accouchement standard supposent une grossesse unique.",
              "type": "warning"
            },
            {
              "text": "Variation naturelle : Une étude de 2013 a trouvé que la durée naturelle de grossesse varie de jusqu'à 37 jours (5+ semaines) entre les femmes, même après prise en compte de tous les facteurs mesurables.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul de Date d'Accouchement",
          "description": "Exemples étape par étape utilisant différentes méthodes",
          "examples": [
            {
              "title": "Méthode DDR — Cycle de 28 jours",
              "steps": [
                "Dernières Règles : 1er janvier 2026",
                "Formule : DDR + 280 jours",
                "1er janvier + 280 jours = 8 octobre 2026",
                "Conception Estimée : ~15 janvier (jour 14)",
                "Actuel : Si aujourd'hui est le 10 février → 5 semaines 5 jours de grossesse"
              ],
              "result": "Date d'Accouchement : 8 octobre 2026"
            },
            {
              "title": "Transfert FIV Blastocyste Jour 5",
              "steps": [
                "Date de Transfert : 5 janvier 2026",
                "Stade d'Embryon : Blastocyste Jour 5",
                "Formule : Transfert + 261 jours",
                "5 janvier + 261 jours = 23 septembre 2026",
                "DDR Équivalent : 17 décembre 2025 (DPA − 280)"
              ],
              "result": "Date d'Accouchement : 23 septembre 2026"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle est la précision d'un calculateur de date d'accouchement ?",
          "answer": "Les calculateurs de date d'accouchement fournissent une estimation — seulement environ 5% des bébés naissent à leur date exacte. Cependant, environ 80% des bébés arrivent dans la fenêtre de 37-42 semaines. La datation par échographie du premier trimestre est la méthode la plus précise (±5 jours), tandis que les calculs DDR peuvent être décalés de 1-2 semaines selon la régularité du cycle. Les dates d'accouchement FIV sont les plus précises car l'âge de l'embryon est connu exactement."
        },
        {
          "question": "Que faire si mon cycle est plus long ou plus court que 28 jours ?",
          "answer": "Si votre cycle n'est pas de 28 jours, votre ovulation ne se produit probablement pas au jour 14. Pour un cycle de 35 jours, l'ovulation se produit vers le jour 21, rendant votre date d'accouchement environ 7 jours plus tard que le calcul standard. Notre calculateur s'ajuste automatiquement quand vous activez l'option de durée de cycle. Cet ajustement est crucial pour la précision — un cycle de 35 jours décalerait votre date d'accouchement d'une semaine complète."
        },
        {
          "question": "Dois-je utiliser la datation DDR ou échographique ?",
          "answer": "L'ACOG recommande d'utiliser la datation échographique si la DPA d'échographie diffère des DDR de plus de 7 jours au premier trimestre, plus de 10 jours au deuxième trimestre, ou plus de 21 jours au troisième trimestre. L'échographie précoce (8-13 semaines) est généralement plus précise que les DDR, surtout pour les femmes avec des cycles irréguliers."
        },
        {
          "question": "En quoi la date d'accouchement FIV diffère-t-elle de la conception naturelle ?",
          "answer": "Les dates d'accouchement FIV sont calculées à partir de la date de transfert d'embryon plutôt que des DDR. Puisque l'âge exact de l'embryon est connu, les calculs FIV sont les plus précis. Un transfert de blastocyste Jour 5 ajoute 261 jours (266 − 5 jours de développement embryonnaire). Un transfert de clivage Jour 3 ajoute 263 jours. Votre clinique de fertilité fournit typiquement ce calcul."
        },
        {
          "question": "Ma date d'accouchement peut-elle changer pendant la grossesse ?",
          "answer": "Oui, votre professionnel de santé peut ajuster votre date d'accouchement basé sur les mesures d'échographie, surtout s'il y a une discordance significative avec la datation DDR. C'est le plus courant après une échographie du premier trimestre. Une fois établie par échographie précoce, la date d'accouchement ne devrait typiquement pas être changée basée sur des scans ultérieurs, car la précision de mesure diminue au cours de la grossesse."
        },
        {
          "question": "Quels sont les trois trimestres ?",
          "answer": "Le premier trimestre s'étend des semaines 1-12 (formation des organes et plus haut risque de fausse couche), le deuxième trimestre couvre les semaines 13-27 (période la plus confortable, début des mouvements du bébé), et le troisième trimestre va de la semaine 28 à l'accouchement (croissance rapide, préparation à la naissance). Chaque trimestre implique différents tests prénataux et étapes de développement."
        },
        {
          "question": "Que signifie 'âge gestationnel' vs 'âge fœtal' ?",
          "answer": "L'âge gestationnel est compté à partir du premier jour de vos dernières règles (DDR), qui est environ 2 semaines avant la conception. L'âge fœtal (aussi appelé âge embryonnaire) est compté à partir de la conception réelle. Donc à '8 semaines de grossesse' (gestationnel), l'embryon a réellement environ 6 semaines. Les professionnels médicaux utilisent l'âge gestationnel comme standard."
        },
        {
          "question": "Quand dois-je dire à mon médecin ma date d'accouchement ?",
          "answer": "Partagez votre date DDR et toutes données de suivi de fertilité à votre premier rendez-vous prénatal (typiquement 8-10 semaines). Votre médecin confirmera probablement ou ajustera votre date d'accouchement avec une échographie précoce. Si vous avez conçu par FIV, apportez votre date de transfert et informations de jour d'embryon. Avoir une datation précise dès le début de grossesse est important pour surveiller la croissance fœtale."
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
      "name": "Schwangerschafts Geburtstermin Rechner",
      "slug": "schwangerschafts-geburtstermin-rechner",
      "subtitle": "Berechnen Sie Ihren voraussichtlichen Geburtstermin mit 5 Methoden — LMP, Empfängnis, Ultraschall, IVF-Transfer oder bekanntes Datum mit Trimester-Zeitplan",
      "breadcrumb": "Geburtstermin",
      "seo": {
        "title": "Schwangerschafts Geburtstermin Rechner — Baby-Ankunft schätzen | Kostenlos",
        "description": "Berechnen Sie Ihren Schwangerschafts-Geburtstermin mit 5 Methoden: LMP, Empfängnisdatum, Ultraschall, IVF-Transfer. Erhalten Sie Trimester-Zeitplan, Meilenstein-Übersicht und wochenweise Fortschritte.",
        "shortDescription": "Schätzen Sie den Geburtstermin Ihres Babys mit 5 Berechnungsmethoden und einem vollständigen Meilenstein-Zeitplan",
        "keywords": [
          "schwangerschafts geburtstermin rechner",
          "geburtstermin rechner",
          "voraussichtlicher geburtstermin",
          "schwangerschafts rechner",
          "wann kommt mein baby",
          "edd rechner",
          "ivf geburtstermin rechner",
          "schwangerschaftswoche rechner"
        ]
      },
      "inputs": {
        "method": {
          "label": "Berechnungsmethode",
          "helpText": "Wählen Sie die Methode, die am besten zu Ihren verfügbaren Informationen passt",
          "options": {
            "lmp": "Letzte Menstruation (LMP)",
            "conception": "Empfängnis- / Eisprung-Datum",
            "ultrasound": "Ultraschall-Datierung",
            "ivf": "IVF-Embryotransfer",
            "knownDueDate": "Bekannter Geburtstermin (umgekehrt)"
          }
        },
        "lmpDate": {
          "label": "Erster Tag der letzten Periode",
          "helpText": "Der erste Tag Ihrer letzten Menstruation — dies ist die Standardmethode der meisten Ärzte"
        },
        "adjustCycle": {
          "label": "Für Zykluslänge anpassen",
          "helpText": "Aktivieren, wenn Ihr Zyklus nicht die Standard-28 Tage hat — passt den Geburtstermin entsprechend an"
        },
        "cycleLength": {
          "label": "Durchschnittliche Zykluslänge",
          "helpText": "Normaler Bereich ist 21-35 Tage. Standardberechnung nimmt 28 Tage an"
        },
        "conceptionDate": {
          "label": "Empfängnis- / Eisprung-Datum",
          "helpText": "Das Datum, an dem Sie glauben, dass die Empfängnis stattgefunden hat (Eisprung-Tag)"
        },
        "ultrasoundDate": {
          "label": "Ultraschall-Datum",
          "helpText": "Das Datum, an dem Ihr Datierungs-Ultraschall durchgeführt wurde"
        },
        "ultrasoundWeeks": {
          "label": "Schwangerschaftsalter (Wochen)",
          "helpText": "Schwangerschaftswochen wie im Ultraschall gemessen"
        },
        "ultrasoundDays": {
          "label": "Schwangerschaftsalter (Tage)",
          "helpText": "Zusätzliche Tage über die vollständigen Wochen hinaus (0-6)"
        },
        "ivfDate": {
          "label": "Embryotransfer-Datum",
          "helpText": "Das Datum, an dem der Embryo in die Gebärmutter übertragen wurde"
        },
        "embryoDay": {
          "label": "Embryo-Stadium",
          "helpText": "Tag 5 (Blastozyste) Transfers sind bei moderner IVF am häufigsten",
          "options": {
            "day3": "Tag 3 Embryo (Teilung)",
            "day5": "Tag 5 Embryo (Blastozyste)",
            "day6": "Tag 6 Embryo (Erweiterte Blastozyste)"
          }
        },
        "knownDueDate": {
          "label": "Bekannter Geburtstermin",
          "helpText": "Geben Sie Ihren Geburtstermin ein, um den vollständigen Meilenstein-Zeitplan zu sehen und Schlüsseldaten rückzurechnen"
        }
      },
      "results": {
        "dueDate": {
          "label": "Voraussichtlicher Geburtstermin"
        },
        "gestationalAge": {
          "label": "Aktuelles Schwangerschaftsalter"
        },
        "daysRemaining": {
          "label": "Verbleibende Tage"
        },
        "trimester": {
          "label": "Aktuelles Trimester"
        },
        "conceptionEstimate": {
          "label": "Geschätzte Empfängnis"
        },
        "safeWindowStart": {
          "label": "Frühe Reife (37 Wochen)"
        },
        "safeWindowEnd": {
          "label": "Späte Reife (42 Wochen)"
        },
        "progressPercent": {
          "label": "Schwangerschaftsfortschritt"
        },
        "zodiacSign": {
          "label": "Sternzeichen des Babys"
        },
        "birthstone": {
          "label": "Geburtsstein des Babys"
        }
      },
      "presets": {
        "recentLmp": {
          "label": "LMP (vor 8 Wochen)",
          "description": "Standard-LMP-Methode, 28-Tage-Zyklus"
        },
        "ivfDay5": {
          "label": "IVF Tag 5",
          "description": "Blastozysten-Transfer, vor 6 Wochen"
        },
        "ultrasoundDating": {
          "label": "Ultraschall-Datierung",
          "description": "10 Wochen 3 Tage, vor 2 Wochen"
        },
        "longCycle": {
          "label": "Langer Zyklus (35 Tage)",
          "description": "LMP mit 35-Tage-Zyklus-Anpassung"
        }
      },
      "values": {
        "weeks": "Wochen",
        "days": "Tage",
        "trimester1": "1. Trimester",
        "trimester2": "2. Trimester",
        "trimester3": "3. Trimester"
      },
      "formats": {
        "summary": "Ihr voraussichtlicher Geburtstermin ist {dueDate}. Sie sind derzeit {gestationalAge} schwanger mit {daysRemaining} verbleibenden Tagen ({progressPercent}% abgeschlossen)."
      },
      "infoCards": {
        "keyDates": {
          "title": "Wichtige Daten",
          "items": [
            {
              "label": "Voraussichtlicher Geburtstermin",
              "valueKey": "dueDate"
            },
            {
              "label": "Aktuelles Schwangerschaftsalter",
              "valueKey": "gestationalAge"
            },
            {
              "label": "Frühe Reife (37 Wo)",
              "valueKey": "safeWindowStart"
            },
            {
              "label": "Späte Reife (42 Wo)",
              "valueKey": "safeWindowEnd"
            }
          ]
        },
        "funFacts": {
          "title": "Interessante Fakten über Ihr Baby",
          "items": [
            {
              "label": "Sternzeichen",
              "valueKey": "zodiacSign"
            },
            {
              "label": "Geburtsstein",
              "valueKey": "birthstone"
            },
            {
              "label": "Verbleibende Tage",
              "valueKey": "daysRemaining"
            },
            {
              "label": "Fortschritt",
              "valueKey": "progressPercent"
            }
          ]
        },
        "tips": {
          "title": "Tipps für das erste Trimester",
          "items": [
            "Planen Sie Ihren ersten Vorsorge-Termin zwischen Woche 8-10 — früher wenn Sie Risikofaktoren haben oder über 35 sind",
            "Nehmen Sie täglich 400-800 mcg Folsäure ein, um das Risiko von Neuralrohrdefekten um bis zu 70% zu reduzieren",
            "Nur etwa 5% der Babys kommen am errechneten Termin — die meisten kommen im 37-42 Wochen-Fenster",
            "Müdigkeit im ersten Trimester ist normal — Ihr Körper baut die Plazenta auf, was enorme Energie erfordert"
          ]
        }
      },
      "chart": {
        "title": "Trimester-Fortschritt",
        "xLabel": "Trimester",
        "yLabel": "Wochen",
        "series": {
          "completed": "Abgeschlossen",
          "remaining": "Verbleibend"
        }
      },
      "education": {
        "whatIs": {
          "title": "Wie wird ein Schwangerschafts-Geburtstermin berechnet?",
          "content": "Ein Schwangerschafts-Geburtstermin (auch voraussichtlicher Geburtstermin oder EDD genannt) wird als 280 Tage (40 Wochen) vom ersten Tag Ihrer letzten Menstruation (LMP) berechnet. Diese Methode, bekannt als Naegele-Regel, ist seit den frühen 1800er Jahren der Standard. Obwohl sie einen 28-Tage-Zyklus mit Eisprung am Tag 14 annimmt, können moderne Rechner für verschiedene Zykluslängen anpassen. Es ist wichtig zu verstehen, dass Ihr Geburtstermin eine Schätzung ist — nur etwa 5% der Babys werden an ihrem exakten Geburtstermin geboren. Die meisten Geburten treten in einem fünfwöchigen Fenster zwischen 37 und 42 Schwangerschaftswochen auf. Ihr Gesundheitsdienstleister kann Ihren Geburtstermin basierend auf frühen Ultraschallmessungen anpassen, die im ersten Trimester am genauesten sind."
        },
        "howItWorks": {
          "title": "Die 5 Berechnungsmethoden verstehen",
          "content": "Die LMP-Methode addiert 280 Tage zu Ihrem letzten Periodenstart, mit Anpassung wenn Ihr Zyklus nicht 28 Tage hat. Die Empfängnismethode addiert 266 Tage vom bekannten oder geschätzten Eisprungdatum. Ultraschall-Datierung nutzt Messungen aus einer frühen Untersuchung zur Schätzung des Schwangerschaftsalters, dann rückwärts zur EDD-Bestimmung — dies gilt als genaueste Methode vor 14 Wochen. IVF-Berechnungen sind am präzisesten, da das exakte Embryoalter bekannt ist: addieren Sie 263 Tage für Tag 3-Transfer, 261 für Tag 5, oder 260 für Tag 6. Die Bekannter-Geburtstermin-Methode arbeitet umgekehrt und zeigt alle Meilensteine und Schlüsseldaten basierend auf einem EDD, den Sie bereits von Ihrem Arzt erhalten haben."
        },
        "methods": {
          "title": "Berechnungsmethoden erklärt",
          "items": [
            {
              "text": "LMP (Naegele-Regel): EDD = LMP + 280 Tage. Bei Nicht-28-Tage-Zyklen anpassen durch Addieren von (Zykluslänge − 28) Tagen. Dies ist die weltweit am häufigsten verwendete Methode.",
              "type": "info"
            },
            {
              "text": "Empfängnisdatum: EDD = Empfängnis + 266 Tage. Am genauesten, wenn Sie Ihr exaktes Eisprungdatum durch Tracking oder OPK-Tests kennen.",
              "type": "info"
            },
            {
              "text": "Ultraschall-Datierung: Bei Durchführung vor 14 Wochen ist die Genauigkeit ±5-7 Tage. Nach 20 Wochen sinkt die Genauigkeit auf ±2-3 Wochen. ACOG empfiehlt Ultraschalldaten wenn sie von LMP um mehr als 7 Tage abweichen.",
              "type": "info"
            },
            {
              "text": "IVF-Transfer: Die präziseste Methode — Embryoalter ist exakt bekannt. Tag 3 Embryo: EDD = Transfer + 263 Tage. Tag 5 Blastozyste: EDD = Transfer + 261 Tage.",
              "type": "info"
            },
            {
              "text": "Bekannter Geburtstermin: Rückberechnung von vorhandenem EDD. Nützlich zur Bestimmung von Empfängnisdatum, LMP-Äquivalent und allen Meilensteindaten.",
              "type": "info"
            }
          ]
        },
        "factors": {
          "title": "Faktoren, die Ihren Geburtstermin beeinflussen",
          "items": [
            {
              "text": "Zykluslänge: Frauen mit 35-Tage-Zyklen haben etwa eine Woche später Eisprung als solche mit 28-Tage-Zyklen, was den Geburtstermin um 7 Tage verschiebt. Immer anpassen wenn Ihr Zyklus nicht 28 Tage hat.",
              "type": "warning"
            },
            {
              "text": "Erste Schwangerschaft: Erstgebärende tendieren dazu, etwas später zu entbinden — durchschnittlich 1-2 Tage nach ihrem EDD verglichen mit Folgeschwangerschaften.",
              "type": "info"
            },
            {
              "text": "Ultraschall-Genauigkeit: Ultraschall im ersten Trimester (vor 14 Wochen) ist genau auf ±5 Tage. Zweites Trimester sinkt auf ±10 Tage, drittes Trimester auf ±21 Tage.",
              "type": "info"
            },
            {
              "text": "Mütterliches Alter: Frauen über 35 haben ein etwas höheres Risiko, über den Geburtstermin zu gehen, während Teenager-Mütter tendenziell etwas früher entbinden.",
              "type": "info"
            },
            {
              "text": "Mehrlingsschwangerschaften: Zwillinge durchschnittlich 36 Wochen, Drillinge durchschnittlich 32 Wochen. Standard-Geburtstermin-Berechnungen nehmen eine Einlingsschwangerschaft an.",
              "type": "warning"
            },
            {
              "text": "Natürliche Variation: Eine 2013-Studie fand, dass die natürliche Schwangerschaftslänge zwischen Frauen um bis zu 37 Tage (5+ Wochen) variiert, selbst nach Berücksichtigung aller messbaren Faktoren.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Geburtstermin-Berechnungsbeispiele",
          "description": "Schritt-für-Schritt-Beispiele mit verschiedenen Methoden",
          "examples": [
            {
              "title": "LMP-Methode — 28-Tage-Zyklus",
              "steps": [
                "Letzte Menstruation: 1. Januar 2026",
                "Formel: LMP + 280 Tage",
                "1. Januar + 280 Tage = 8. Oktober 2026",
                "Geschätzte Empfängnis: ~15. Januar (Tag 14)",
                "Aktuell: Wenn heute der 10. Februar ist → 5 Wochen 5 Tage schwanger"
              ],
              "result": "Geburtstermin: 8. Oktober 2026"
            },
            {
              "title": "IVF Tag 5 Blastozysten-Transfer",
              "steps": [
                "Transfer-Datum: 5. Januar 2026",
                "Embryo-Stadium: Tag 5 Blastozyste",
                "Formel: Transfer + 261 Tage",
                "5. Januar + 261 Tage = 23. September 2026",
                "Äquivalente LMP: 17. Dezember 2025 (EDD − 280)"
              ],
              "result": "Geburtstermin: 23. September 2026"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie genau ist ein Geburtstermin-Rechner?",
          "answer": "Geburtstermin-Rechner geben eine Schätzung ab — nur etwa 5% der Babys werden an ihrem exakten Geburtstermin geboren. Jedoch kommen etwa 80% der Babys im 37-42 Wochen-Fenster an. Ultraschall-Datierung im ersten Trimester ist die genaueste Methode (±5 Tage), während LMP-Berechnungen je nach Zyklusregelmäßigkeit 1-2 Wochen abweichen können. IVF-Geburtstermine sind am präzisesten, da das Embryoalter exakt bekannt ist."
        },
        {
          "question": "Was wenn mein Zyklus länger oder kürzer als 28 Tage ist?",
          "answer": "Wenn Ihr Zyklus nicht 28 Tage hat, findet Ihr Eisprung wahrscheinlich nicht am Tag 14 statt. Bei einem 35-Tage-Zyklus tritt der Eisprung um Tag 21 auf, was Ihren Geburtstermin etwa 7 Tage später macht als die Standardberechnung. Unser Rechner passt automatisch an, wenn Sie die Zykluslängen-Option aktivieren. Diese Anpassung ist entscheidend für die Genauigkeit — ein 35-Tage-Zyklus würde Ihren Geburtstermin um eine ganze Woche verschieben."
        },
        {
          "question": "Sollte ich LMP oder Ultraschall-Datierung verwenden?",
          "answer": "ACOG empfiehlt Ultraschall-Datierung wenn der Ultraschall-EDD von LMP um mehr als 7 Tage im ersten Trimester, mehr als 10 Tage im zweiten Trimester oder mehr als 21 Tage im dritten Trimester abweicht. Früher Ultraschall (8-13 Wochen) ist generell genauer als LMP, besonders bei Frauen mit unregelmäßigen Zyklen."
        },
        {
          "question": "Wie unterscheidet sich der IVF-Geburtstermin von natürlicher Empfängnis?",
          "answer": "IVF-Geburtstermine werden vom Embryotransfer-Datum berechnet statt von LMP. Da das exakte Embryoalter bekannt ist, sind IVF-Berechnungen am präzisesten. Ein Tag 5 Blastozysten-Transfer addiert 261 Tage (266 − 5 Tage Embryoentwicklung). Ein Tag 3 Teilungs-Transfer addiert 263 Tage. Ihre Kinderwunschklinik stellt typischerweise diese Berechnung bereit."
        },
        {
          "question": "Kann sich mein Geburtstermin während der Schwangerschaft ändern?",
          "answer": "Ja, Ihr Gesundheitsdienstleister kann Ihren Geburtstermin basierend auf Ultraschallmessungen anpassen, besonders wenn es eine signifikante Diskrepanz mit LMP-Datierung gibt. Dies ist am häufigsten nach einem Ultraschall im ersten Trimester. Einmal durch frühen Ultraschall festgelegt, sollte der Geburtstermin typischerweise nicht basierend auf späteren Scans geändert werden, da die Messgenauigkeit mit Schwangerschaftsfortschritt abnimmt."
        },
        {
          "question": "Was sind die drei Trimester?",
          "answer": "Das erste Trimester umfasst Wochen 1-12 (Organbildung und höchstes Fehlgeburtsrisiko), das zweite Trimester deckt Wochen 13-27 ab (angenehmste Zeit, Babybewegungen beginnen), und das dritte Trimester läuft von Woche 28 bis zur Geburt (schnelles Wachstum, Vorbereitung auf Geburt). Jedes Trimester beinhaltet verschiedene Vorsorgeuntersuchungen und Entwicklungsmeilensteine."
        },
        {
          "question": "Was bedeutet 'Schwangerschaftsalter' vs. 'Fötalenalter'?",
          "answer": "Schwangerschaftsalter wird vom ersten Tag Ihrer letzten Menstruation (LMP) gezählt, was etwa 2 Wochen vor der Empfängnis ist. Fötalenalter (auch embryonales Alter) wird von der tatsächlichen Empfängnis gezählt. Also bei '8 Wochen schwanger' (Schwangerschaftsalter) ist der Embryo tatsächlich etwa 6 Wochen alt. Medizinische Fachkräfte verwenden Schwangerschaftsalter als Standard."
        },
        {
          "question": "Wann sollte ich meinem Arzt meinen Geburtstermin mitteilen?",
          "answer": "Teilen Sie Ihr LMP-Datum und alle Fruchtbarkeits-Tracking-Daten bei Ihrem ersten Vorsorge-Termin mit (typischerweise 8-10 Wochen). Ihr Arzt wird wahrscheinlich Ihren Geburtstermin mit einem frühen Ultraschall bestätigen oder anpassen. Wenn Sie durch IVF empfangen haben, bringen Sie Ihr Transfer-Datum und Embryo-Tag-Informationen mit. Genaue Datierung aus der frühen Schwangerschaft ist wichtig für die Überwachung des fetalen Wachstums."
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

// ── Zodiac signs by date range ──
const ZODIAC_SIGNS: Array<{ sign: string; emoji: string; start: [number, number]; end: [number, number] }> = [
  { sign: "Capricorn", emoji: "♑", start: [12, 22], end: [1, 19] },
  { sign: "Aquarius", emoji: "♒", start: [1, 20], end: [2, 18] },
  { sign: "Pisces", emoji: "♓", start: [2, 19], end: [3, 20] },
  { sign: "Aries", emoji: "♈", start: [3, 21], end: [4, 19] },
  { sign: "Taurus", emoji: "♉", start: [4, 20], end: [5, 20] },
  { sign: "Gemini", emoji: "♊", start: [5, 21], end: [6, 20] },
  { sign: "Cancer", emoji: "♋", start: [6, 21], end: [7, 22] },
  { sign: "Leo", emoji: "♌", start: [7, 23], end: [8, 22] },
  { sign: "Virgo", emoji: "♍", start: [8, 23], end: [9, 22] },
  { sign: "Libra", emoji: "♎", start: [9, 23], end: [10, 22] },
  { sign: "Scorpio", emoji: "♏", start: [10, 23], end: [11, 21] },
  { sign: "Sagittarius", emoji: "♐", start: [11, 22], end: [12, 21] },
];

const BIRTHSTONES: Record<number, string> = {
  1: "Garnet 💎", 2: "Amethyst 💜", 3: "Aquamarine 🩵",
  4: "Diamond 💎", 5: "Emerald 💚", 6: "Pearl 🤍",
  7: "Ruby ❤️", 8: "Peridot 💚", 9: "Sapphire 💙",
  10: "Opal 🌈", 11: "Topaz 💛", 12: "Tanzanite 💜",
};

function getZodiac(date: Date): string {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  for (const z of ZODIAC_SIGNS) {
    const [sm, sd] = z.start;
    const [em, ed] = z.end;
    if (sm > em) {
      // Wraps around year (Capricorn)
      if ((m === sm && d >= sd) || (m === em && d <= ed)) return `${z.emoji} ${z.sign}`;
    } else {
      if ((m === sm && d >= sd) || (m === em && d <= ed) || (m > sm && m < em)) return `${z.emoji} ${z.sign}`;
    }
  }
  return "♑ Capricorn";
}

function fmtDate(date: Date, loc: string = "en"): string {
  const locMap: Record<string,string> = {en:"en-US",es:"es-ES",pt:"pt-BR",fr:"fr-FR",de:"de-DE"}; return date.toLocaleDateString(locMap[loc] || "en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function diffDays(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

export function calculatePregnancyDueDate(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t, locale: dataLocale } = data;
  const loc = (dataLocale as string) || "en";
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const method = values.method as string;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let dueDate: Date | null = null;
  let lmpEquivalent: Date | null = null;

  // ─── Calculate due date based on method ─────────────────────────────────
  switch (method) {
    case "lmp": {
      const lmpStr = values.lmpDate as string | null;
      if (!lmpStr) return { values: {}, formatted: {}, summary: "", isValid: false };
      const lmp = new Date(lmpStr + "T00:00:00");
      const adjustCycle = values.adjustCycle as boolean;
      const cycleLength = (values.cycleLength as number) || 28;
      const cycleAdjust = adjustCycle ? (cycleLength - 28) : 0;
      dueDate = addDays(lmp, 280 + cycleAdjust);
      lmpEquivalent = lmp;
      break;
    }
    case "conception": {
      const concStr = values.conceptionDate as string | null;
      if (!concStr) return { values: {}, formatted: {}, summary: "", isValid: false };
      const conc = new Date(concStr + "T00:00:00");
      dueDate = addDays(conc, 266);
      lmpEquivalent = addDays(conc, -14);
      break;
    }
    case "ultrasound": {
      const usDateStr = values.ultrasoundDate as string | null;
      if (!usDateStr) return { values: {}, formatted: {}, summary: "", isValid: false };
      const usDate = new Date(usDateStr + "T00:00:00");
      const usWeeks = (values.ultrasoundWeeks as number) || 0;
      const usDays = (values.ultrasoundDays as number) || 0;
      const totalGestDays = usWeeks * 7 + usDays;
      lmpEquivalent = addDays(usDate, -totalGestDays);
      dueDate = addDays(lmpEquivalent, 280);
      break;
    }
    case "ivf": {
      const ivfStr = values.ivfDate as string | null;
      if (!ivfStr) return { values: {}, formatted: {}, summary: "", isValid: false };
      const ivfDate = new Date(ivfStr + "T00:00:00");
      const embryoDay = values.embryoDay as string;
      const embryoDays: Record<string, number> = { day3: 263, day5: 261, day6: 260 };
      const daysToAdd = embryoDays[embryoDay] || 261;
      dueDate = addDays(ivfDate, daysToAdd);
      lmpEquivalent = addDays(dueDate, -280);
      break;
    }
    case "knownDueDate": {
      const knownStr = values.knownDueDate as string | null;
      if (!knownStr) return { values: {}, formatted: {}, summary: "", isValid: false };
      dueDate = new Date(knownStr + "T00:00:00");
      lmpEquivalent = addDays(dueDate, -280);
      break;
    }
    default:
      return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  if (!dueDate || !lmpEquivalent) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ─── Derived calculations ───────────────────────────────────────────────
  const conceptionEstimate = addDays(lmpEquivalent, 14);
  const totalDaysPreg = 280;
  const daysSinceLmp = diffDays(lmpEquivalent, today);
  const daysRemaining = Math.max(0, diffDays(today, dueDate));
  const gestWeeks = Math.floor(Math.max(0, daysSinceLmp) / 7);
  const gestDays = Math.max(0, daysSinceLmp) % 7;
  const progressPercent = Math.min(100, Math.max(0, Math.round((daysSinceLmp / totalDaysPreg) * 100)));

  // Trimester
  let trimester = v.trimester1 || "1st Trimester";
  if (gestWeeks >= 28) trimester = v.trimester3 || "3rd Trimester";
  else if (gestWeeks >= 13) trimester = v.trimester2 || "2nd Trimester";

  // Safe delivery window
  const safeStart = addDays(lmpEquivalent, 259); // 37 weeks
  const safeEnd = addDays(lmpEquivalent, 294);   // 42 weeks

  // Zodiac & Birthstone
  const zodiac = getZodiac(dueDate);
  const birthstone = BIRTHSTONES[dueDate.getMonth() + 1] || "Unknown";

  // ─── Chart Data — Trimester Progress ────────────────────────────────────
  const t1Total = 12; // weeks
  const t2Total = 14; // weeks 13-26
  const t3Total = 14; // weeks 27-40

  const t1Completed = Math.min(t1Total, Math.max(0, gestWeeks));
  const t2Completed = Math.min(t2Total, Math.max(0, gestWeeks - 12));
  const t3Completed = Math.min(t3Total, Math.max(0, gestWeeks - 26));

  const chartData = [
    { trimester: v.trimester1 || "1st Trimester", completed: t1Completed, remaining: t1Total - t1Completed },
    { trimester: v.trimester2 || "2nd Trimester", completed: t2Completed, remaining: t2Total - t2Completed },
    { trimester: v.trimester3 || "3rd Trimester", completed: t3Completed, remaining: t3Total - t3Completed },
  ];

  // ─── Table Data — Milestone Schedule ────────────────────────────────────
  const milestones = [
    { weekNum: 5, name: "First Missed Period", note: "Pregnancy test usually positive" },
    { weekNum: 6, name: "Heartbeat Detectable", note: "Visible on transvaginal ultrasound" },
    { weekNum: 8, name: "First Prenatal Visit", note: "Blood work, medical history, dating" },
    { weekNum: 10, name: "NIPT Available", note: "Non-invasive prenatal testing (optional)" },
    { weekNum: 12, name: "End of 1st Trimester", note: "Miscarriage risk drops significantly" },
    { weekNum: 13, name: "2nd Trimester Begins", note: "Energy often returns, nausea decreases" },
    { weekNum: 16, name: "Baby Movement (Quickening)", note: "First-time moms may feel it at 18-20 wk" },
    { weekNum: 20, name: "Anatomy Scan", note: "Detailed ultrasound, gender reveal possible" },
    { weekNum: 24, name: "Viability Milestone", note: "Baby can survive outside the womb with NICU" },
    { weekNum: 28, name: "3rd Trimester Begins", note: "Glucose test, increased prenatal visits" },
    { weekNum: 32, name: "Baby Positioning", note: "Most babies turn head-down by now" },
    { weekNum: 36, name: "Group B Strep Test", note: "Weekly appointments begin" },
    { weekNum: 37, name: "Early Term", note: "Baby is considered early term" },
    { weekNum: 39, name: "Full Term", note: "Ideal delivery window begins" },
    { weekNum: 40, name: "Due Date!", note: "Only 5% of babies arrive on this date" },
    { weekNum: 42, name: "Post-Term", note: "Induction usually recommended" },
  ];

  const tableData = milestones.map((m) => {
    const milestoneDate = addDays(lmpEquivalent, m.weekNum * 7);
    const isPast = milestoneDate <= today;
    return {
      week: `Week ${m.weekNum}`,
      date: milestoneDate.toLocaleDateString({en:"en-US",es:"es-ES",pt:"pt-BR",fr:"fr-FR",de:"de-DE"}[loc] || "en-US", { month: "short", day: "numeric", year: "numeric" }),
      milestone: `${isPast ? "✅" : "⬜"} ${m.name}`,
      notes: m.note,
    };
  });

  // ─── Build summary ──────────────────────────────────────────────────────
  const gestAgeStr = `${gestWeeks} ${v.weeks || "weeks"}, ${gestDays} ${v.days || "days"}`;
  const summary = (f.summary || "Your estimated due date is {dueDate}. You are currently {gestationalAge} pregnant with {daysRemaining} days to go ({progressPercent}% complete).")
    .replace("{dueDate}", fmtDate(dueDate, loc))
    .replace("{gestationalAge}", gestAgeStr)
    .replace("{daysRemaining}", String(daysRemaining))
    .replace("{progressPercent}", String(progressPercent));

  // ─── Return ─────────────────────────────────────────────────────────────
  return {
    values: {
      dueDate: dueDate.toISOString(),
      gestationalAge: gestAgeStr,
      daysRemaining,
      trimester,
      conceptionEstimate: conceptionEstimate.toISOString(),
      safeWindowStart: safeStart.toISOString(),
      safeWindowEnd: safeEnd.toISOString(),
      progressPercent,
      zodiacSign: zodiac,
      birthstone,
    },
    formatted: {
      dueDate: fmtDate(dueDate, loc),
      gestationalAge: gestAgeStr,
      daysRemaining: `${daysRemaining} ${v.days || "days"}`,
      trimester,
      conceptionEstimate: fmtDate(conceptionEstimate, loc),
      safeWindowStart: fmtDate(safeStart, loc),
      safeWindowEnd: fmtDate(safeEnd, loc),
      progressPercent: `${progressPercent}%`,
      zodiacSign: zodiac,
      birthstone: birthstone,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}
