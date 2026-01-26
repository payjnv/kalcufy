import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// BABY SIZE DATA
// =============================================================================
const BABY_SIZE: Record<number, { fruit: string; length: string; weight: string }> = {
  4: { fruit: "Poppy seed", length: "0.04 in", weight: "<1g" },
  5: { fruit: "Sesame seed", length: "0.05 in", weight: "<1g" },
  6: { fruit: "Lentil", length: "0.08 in", weight: "<1g" },
  7: { fruit: "Blueberry", length: "0.3 in", weight: "<1g" },
  8: { fruit: "Raspberry", length: "0.6 in", weight: "1g" },
  9: { fruit: "Cherry", length: "0.9 in", weight: "2g" },
  10: { fruit: "Kumquat", length: "1.2 in", weight: "4g" },
  11: { fruit: "Fig", length: "1.6 in", weight: "7g" },
  12: { fruit: "Lime", length: "2.1 in", weight: "14g" },
  13: { fruit: "Lemon", length: "2.9 in", weight: "23g" },
  14: { fruit: "Peach", length: "3.4 in", weight: "43g" },
  15: { fruit: "Apple", length: "4.0 in", weight: "70g" },
  16: { fruit: "Avocado", length: "4.6 in", weight: "100g" },
  17: { fruit: "Pear", length: "5.1 in", weight: "140g" },
  18: { fruit: "Bell Pepper", length: "5.6 in", weight: "190g" },
  19: { fruit: "Mango", length: "6.0 in", weight: "240g" },
  20: { fruit: "Banana", length: "6.5 in", weight: "300g" },
  21: { fruit: "Carrot", length: "10.5 in", weight: "360g" },
  22: { fruit: "Papaya", length: "10.9 in", weight: "430g" },
  23: { fruit: "Grapefruit", length: "11.4 in", weight: "500g" },
  24: { fruit: "Ear of corn", length: "11.8 in", weight: "600g" },
  25: { fruit: "Cauliflower", length: "13.6 in", weight: "660g" },
  26: { fruit: "Lettuce", length: "14.0 in", weight: "760g" },
  27: { fruit: "Cabbage", length: "14.4 in", weight: "875g" },
  28: { fruit: "Eggplant", length: "14.8 in", weight: "1kg" },
  29: { fruit: "Butternut squash", length: "15.2 in", weight: "1.15kg" },
  30: { fruit: "Coconut", length: "15.7 in", weight: "1.3kg" },
  31: { fruit: "Pineapple", length: "16.2 in", weight: "1.5kg" },
  32: { fruit: "Squash", length: "16.7 in", weight: "1.7kg" },
  33: { fruit: "Celery", length: "17.2 in", weight: "1.9kg" },
  34: { fruit: "Cantaloupe", length: "17.7 in", weight: "2.1kg" },
  35: { fruit: "Honeydew", length: "18.2 in", weight: "2.4kg" },
  36: { fruit: "Romaine lettuce", length: "18.7 in", weight: "2.6kg" },
  37: { fruit: "Swiss chard", length: "19.1 in", weight: "2.9kg" },
  38: { fruit: "Leek", length: "19.6 in", weight: "3.0kg" },
  39: { fruit: "Watermelon", length: "20.0 in", weight: "3.2kg" },
  40: { fruit: "Pumpkin", length: "20.2 in", weight: "3.4kg" },
};

// =============================================================================
// CONFIG
// =============================================================================
export const pregnancyConfig: CalculatorConfigV3 = {
  id: "pregnancy",
  slug: "pregnancy-calculator",
  name: "Pregnancy Calculator",
  category: "health",
  icon: "🤰",

  // ═══════════════════════════════════════════════════════════════════════════
  // SEO
  // ═══════════════════════════════════════════════════════════════════════════
  seo: {
    title: "Pregnancy Calculator - Due Date, Week by Week & Baby Size",
    description: "Calculate your due date, track pregnancy week by week, see baby size comparisons. Free pregnancy calculator with multiple methods: LMP, conception, IVF, ultrasound.",
    shortDescription: "Calculate your due date and track your pregnancy week by week",
    keywords: ["pregnancy calculator", "due date calculator", "pregnancy week by week", "baby size chart", "conception date", "IVF due date", "ultrasound dating", "gestational age"],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HERO
  // ═══════════════════════════════════════════════════════════════════════════
  hero: {
    badge: "Pregnancy",
    rating: { average: 4.9, count: 28500 },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UNIT SYSTEM
  // ═══════════════════════════════════════════════════════════════════════════
  unitSystem: {
    enabled: false,
    default: "imperial",
    options: [],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════════════════
  inputs: [
    {
      id: "calculationMethod",
      type: "select",
      label: "Calculate Based On",
      required: true,
      defaultValue: "lmp",
      options: [
        { value: "dueDate", label: "Due Date" },
        { value: "lmp", label: "Last Period" },
        { value: "ultrasound", label: "Ultrasound" },
        { value: "conception", label: "Conception Date" },
        { value: "ivf", label: "IVF Transfer Date" },
      ],
      width: "full",
    },
    // Due Date method
    {
      id: "knownDueDate",
      showWhen: { field: "calculationMethod", value: "dueDate" },
      type: "date",
      label: "Your Due Date",
      required: false,
      width: "full",
    },
    // LMP method
    {
      id: "lmpDate",
      showWhen: { field: "calculationMethod", value: "lmp" },
      type: "date",
      label: "First Day of Last Menstrual Period",
      required: false,
      width: "full",
    },
    {
      id: "cycleLength",
      showWhen: { field: "calculationMethod", value: "lmp" },
      type: "slider",
      label: "Average Cycle Length",
      required: false,
      defaultValue: 28,
      min: 20,
      max: 45,
      suffix: "days",
      width: "full",
      helpText: "Default is 28 days. Adjust if your cycle is different.",
    },
    // Ultrasound method
    {
      id: "ultrasoundDate",
      showWhen: { field: "calculationMethod", value: "ultrasound" },
      type: "date",
      label: "Date of Ultrasound",
      required: false,
      width: "full",
    },
    {
      id: "ultrasoundWeeks",
      showWhen: { field: "calculationMethod", value: "ultrasound" },
      type: "number",
      label: "Weeks",
      required: false,
      defaultValue: 8,
      min: 1,
      max: 42,
      suffix: "weeks",
      width: "half",
    },
    {
      id: "ultrasoundDays",
      showWhen: { field: "calculationMethod", value: "ultrasound" },
      type: "number",
      label: "Days",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 6,
      suffix: "days",
      width: "half",
    },
    // Conception method
    {
      id: "conceptionDate",
      showWhen: { field: "calculationMethod", value: "conception" },
      type: "date",
      label: "Conception Date",
      required: false,
      width: "full",
    },
    // IVF method
    {
      id: "ivfDate",
      showWhen: { field: "calculationMethod", value: "ivf" },
      type: "date",
      label: "IVF Transfer Date",
      required: false,
      width: "full",
    },
    {
      id: "ivfEmbryoAge",
      showWhen: { field: "calculationMethod", value: "ivf" },
      type: "radio",
      label: "Embryo Age at Transfer",
      required: false,
      defaultValue: "day5",
      options: [
        { value: "day3", label: "Day 3 Embryo" },
        { value: "day5", label: "Day 5 Blastocyst" },
      ],
      width: "full",
    },
  ],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════════════════
  results: [
    { id: "dueDate", type: "primary", label: "Estimated Due Date", format: "text", icon: "📅" },
    { id: "currentWeek", type: "secondary", label: "Current Week", format: "text" },
    { id: "trimester", type: "badge", label: "Trimester", format: "text" },
    { id: "daysRemaining", type: "secondary", label: "Days Remaining", format: "number", suffix: " days" },
    { id: "babySize", type: "secondary", label: "Baby Size", format: "text", icon: "👶" },
    { id: "conceptionDateResult", type: "secondary", label: "Est. Conception", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // VISUALIZATIONS
  // ═══════════════════════════════════════════════════════════════════════════
  visualizations: [
    {
      id: "trimesterProgress",
      type: "distribution-bars",
      title: "Pregnancy Progress",
      icon: "📊",
      distributionBars: {
        dataKey: "progressData",
        labelField: "label",
        valueField: "value",
        maxValue: 100,
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // INFO CARDS
  // ═══════════════════════════════════════════════════════════════════════════
  infoCards: [
    {
      id: "trimesterMilestones",
      title: "Trimester Milestones",
      icon: "🎯",
      type: "list",
      items: [
        { label: "1st Trimester", value: "Weeks 1-12 • Baby's organs form", color: "blue" },
        { label: "2nd Trimester", value: "Weeks 13-26 • Feel movement", color: "green" },
        { label: "3rd Trimester", value: "Weeks 27-40 • Rapid growth", color: "amber" },
        { label: "Full Term", value: "Week 39+ • Ready for birth", color: "green" },
      ],
    },
    {
      id: "keyAppointments",
      title: "Key Appointments",
      icon: "🏥",
      type: "list",
      items: [
        { label: "First Visit", value: "8-12 weeks" },
        { label: "NT Scan", value: "11-14 weeks" },
        { label: "Anatomy Scan", value: "18-22 weeks" },
        { label: "Glucose Test", value: "24-28 weeks" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCE DATA
  // ═══════════════════════════════════════════════════════════════════════════
  referenceData: [
    {
      id: "babySizeQuick",
      title: "Baby Size by Week",
      icon: "👶",
      columns: 4,
      items: [
        { label: "Week 8", value: "Raspberry" },
        { label: "Week 12", value: "Lime" },
        { label: "Week 16", value: "Avocado" },
        { label: "Week 20", value: "Banana" },
        { label: "Week 24", value: "Corn" },
        { label: "Week 28", value: "Eggplant" },
        { label: "Week 32", value: "Squash" },
        { label: "Week 36", value: "Lettuce" },
        { label: "Week 40", value: "Pumpkin" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  educationSections: [
    {
      id: "aboutMethods",
      type: "cards",
      title: "About Calculation Methods",
      icon: "📊",
      columns: 2,
      cards: [
        { title: "Last Menstrual Period (LMP)", description: "Counts 280 days from the first day of your last period. Most common method used by doctors.", icon: "📅" },
        { title: "Conception Date", description: "Adds 266 days to the date of conception. More accurate if you know when you conceived.", icon: "🎯" },
        { title: "Ultrasound Dating", description: "Uses fetal measurements from early ultrasound. Most accurate before 12 weeks.", icon: "🔬" },
        { title: "IVF Transfer Date", description: "Most accurate method. Adds 261 days (Day 5) or 263 days (Day 3) to transfer date.", icon: "🧬" },
      ],
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "Only about 5% of babies are born on their exact due date", type: "warning" },
        { text: "Full term is 39-40 weeks; delivery between 37-42 weeks is normal", type: "info" },
        { text: "Early ultrasounds (before 12 weeks) are most accurate for dating", type: "info" },
        { text: "Your due date may be adjusted based on ultrasound measurements", type: "info" },
        { text: "First-time mothers often deliver 3-5 days after their due date", type: "info" },
        { text: "Always consult your healthcare provider for personalized guidance", type: "warning" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "📊",
      description: "How due dates are calculated using different methods",
      columns: 2,
      examples: [
        {
          title: "Naegele's Rule (LMP Method)",
          steps: [
            "Last Menstrual Period: January 1, 2026",
            "Add 280 days (40 weeks)",
            "Or: Add 1 year, subtract 3 months, add 7 days",
          ],
          result: "Due Date: October 8, 2026",
        },
        {
          title: "IVF Calculation (Day 5)",
          steps: [
            "Transfer Date: February 1, 2026",
            "Day 5 Blastocyst transfer",
            "Add 261 days to transfer date",
          ],
          result: "Due Date: October 20, 2026",
        },
      ],
    },
    {
      id: "whatIsDueDate",
      type: "prose",
      title: "What is a Due Date?",
      content: "A due date, also called the estimated date of delivery (EDD), is the approximate date when your baby is expected to be born. It's calculated as 40 weeks (280 days) from the first day of your last menstrual period. However, only about 5% of babies are born on their exact due date - most arrive within two weeks before or after.",
    },
    {
      id: "howCalculated",
      type: "prose",
      title: "How is the Due Date Calculated?",
      content: "The most common method is Naegele's Rule, which adds 280 days to the first day of your last menstrual period (LMP). This assumes a 28-day cycle with ovulation on day 14. If your cycle is longer or shorter, the calculation is adjusted. Ultrasound measurements, especially in the first trimester, can provide more accurate dating by measuring the fetus's crown-rump length.",
    },
    {
      id: "weekByWeekDevelopment",
      type: "prose",
      title: "Week-by-Week Development",
      content: "Your baby grows rapidly throughout pregnancy. In the first trimester (weeks 1-12), all major organs begin to form. The second trimester (weeks 13-26) brings rapid growth - you'll feel movement around week 16-22. The third trimester (weeks 27-40) focuses on weight gain and lung maturation. By week 37, your baby is considered 'early term' and development is nearly complete.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // FAQs
  // ═══════════════════════════════════════════════════════════════════════════
  faqs: [
    { question: "How accurate is my due date?", answer: "Due dates are estimates. Only about 5% of babies are born on their exact due date. Most births occur between 37-42 weeks. First-trimester ultrasounds can predict the due date within 5-7 days." },
    { question: "Can my due date change?", answer: "Yes, especially after an early ultrasound. If measurements differ significantly from LMP dating, your provider may adjust your due date. First-trimester ultrasounds (before 14 weeks) are most accurate for dating." },
    { question: "What if I have irregular periods?", answer: "If your cycles are irregular, the LMP method may be less accurate. Consider using the conception date method if you tracked ovulation, or rely on early ultrasound dating for the most accurate estimate." },
    { question: "What does 'weeks pregnant' mean?", answer: "Pregnancy weeks count from the first day of your last period, not conception. At '4 weeks pregnant,' conception was about 2 weeks ago. This is called gestational age and is the standard used by healthcare providers." },
    { question: "When should I see a doctor?", answer: "Schedule your first prenatal visit around 8 weeks pregnant. Contact your doctor immediately if you experience heavy bleeding, severe pain, fever, or other concerning symptoms during pregnancy." },
    { question: "How is baby size measured?", answer: "In early pregnancy, crown-rump length (CRL) measures from head to bottom. After 14 weeks, head circumference, abdominal circumference, and femur length are used to estimate size and growth patterns." },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════════════════
  references: [
    { authors: "American College of Obstetricians and Gynecologists", year: "2017", title: "Methods for Estimating the Due Date", source: "Committee Opinion No. 700", url: "https://www.acog.org" },
    { authors: "Naegele FC", year: "1812", title: "Lehrbuch der Geburtshilfe", source: "Classic obstetrics textbook" },
    { authors: "World Health Organization", year: "2016", title: "WHO recommendations on antenatal care", source: "WHO Guidelines", url: "https://www.who.int" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // DETAILED TABLE
  // ═══════════════════════════════════════════════════════════════════════════
  detailedTable: {
    id: "weekByWeek",
    buttonLabel: "View Week-by-Week Development",
    buttonIcon: "📅",
    modalTitle: "Week-by-Week Pregnancy Development",
    columns: [
      { id: "week", label: "Week", align: "left" },
      { id: "size", label: "Baby Size", align: "center" },
      { id: "length", label: "Length", align: "center" },
      { id: "weight", label: "Weight", align: "right", highlight: true },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SIDEBAR & FEATURES
  // ═══════════════════════════════════════════════════════════════════════════
  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: true,
    category: "health",
    cta: {
      title: "BMI Calculator",
      description: "Track your health metrics during pregnancy",
      linkText: "Calculate BMI →",
      link: "/bmi-calculator",
    },
  },

  features: {
    autoCalculate: true,
    exportPDF: true,
    shareResults: true,
    saveHistory: true,
  },

  relatedCalculators: ["bmi-calculator", "calorie-calculator"],

  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
    afterResults: true,
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
function generateWeekByWeekData(): Record<string, string | number>[] {
  return Object.entries(BABY_SIZE).map(([week, data]) => ({
    week: `Week ${week}`,
    size: data.fruit,
    length: data.length,
    weight: data.weight,
  }));
}

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculatePregnancy(data: { 
  values: Record<string, unknown>; 
  units: Record<string, string>; 
  unitSystem: "metric" | "imperial";
  mode?: string;
}): CalculatorResults {
  const { values } = data;
  const method = (values.calculationMethod as string) || "lmp";
  const today = new Date();
  let dueDate: Date | null = null;

  // Calculate due date based on selected method
  switch (method) {
    case "dueDate": {
      const date = values.knownDueDate as string;
      if (date) dueDate = new Date(date);
      break;
    }
    case "lmp": {
      const date = values.lmpDate as string;
      const cycle = (values.cycleLength as number) || 28;
      if (date) {
        const lmp = new Date(date);
        const cycleDiff = cycle - 28;
        dueDate = new Date(lmp.getTime() + (280 + cycleDiff) * 24 * 60 * 60 * 1000);
      }
      break;
    }
    case "ultrasound": {
      const date = values.ultrasoundDate as string;
      const weeks = (values.ultrasoundWeeks as number) || 0;
      const days = (values.ultrasoundDays as number) || 0;
      if (date) {
        const usDate = new Date(date);
        const totalDaysAtUS = weeks * 7 + days;
        const daysRemaining = 280 - totalDaysAtUS;
        dueDate = new Date(usDate.getTime() + daysRemaining * 24 * 60 * 60 * 1000);
      }
      break;
    }
    case "conception": {
      const date = values.conceptionDate as string;
      if (date) {
        const conception = new Date(date);
        dueDate = new Date(conception.getTime() + 266 * 24 * 60 * 60 * 1000);
      }
      break;
    }
    case "ivf": {
      const date = values.ivfDate as string;
      const embryoAge = (values.ivfEmbryoAge as string) || "day5";
      if (date) {
        const transfer = new Date(date);
        const daysToAdd = embryoAge === "day5" ? 261 : 263;
        dueDate = new Date(transfer.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
      }
      break;
    }
  }

  // If no valid date, return empty
  if (!dueDate || isNaN(dueDate.getTime())) {
    return {
      values: {},
      formatted: { 
        dueDate: "—", 
        currentWeek: "—", 
        trimester: "—", 
        daysRemaining: "—", 
        babySize: "—", 
        conceptionDateResult: "—" 
      },
      summary: "Enter a date to calculate your due date.",
      isValid: false,
    };
  }

  // Calculate gestational info
  const gestStart = new Date(dueDate.getTime() - 280 * 24 * 60 * 60 * 1000);
  const daysSinceStart = Math.floor((today.getTime() - gestStart.getTime()) / (24 * 60 * 60 * 1000));
  const currentWeek = Math.max(0, Math.floor(daysSinceStart / 7));
  const currentDay = Math.max(0, daysSinceStart % 7);
  const daysRemaining = Math.max(0, Math.floor((dueDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000)));
  const totalDays = 280;
  const daysCompleted = totalDays - daysRemaining;
  const progressPercent = Math.min(100, Math.max(0, (daysCompleted / totalDays) * 100));

  // Trimester
  let trimester = "—";
  let trimesterNum = 0;
  if (currentWeek >= 1 && currentWeek < 13) {
    trimester = "1st Trimester";
    trimesterNum = 1;
  } else if (currentWeek >= 13 && currentWeek < 27) {
    trimester = "2nd Trimester";
    trimesterNum = 2;
  } else if (currentWeek >= 27) {
    trimester = "3rd Trimester";
    trimesterNum = 3;
  }

  // Baby size
  const weekForSize = Math.min(40, Math.max(4, currentWeek));
  const baby = BABY_SIZE[weekForSize] || { fruit: "—", length: "—", weight: "—" };

  // Conception date (2 weeks after gestational start)
  const conceptionDate = new Date(gestStart.getTime() + 14 * 24 * 60 * 60 * 1000);

  // Format
  const fmt = (d: Date) => d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const fmtShort = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  // Progress data for visualization
  const progressData = [
    { 
      id: "overall", 
      label: "Overall Progress", 
      value: Math.round(progressPercent),
      displayValue: `${Math.round(progressPercent)}%`
    },
    { 
      id: "trimester1", 
      label: "1st Trimester", 
      value: trimesterNum >= 1 ? (trimesterNum === 1 ? Math.min(100, ((currentWeek - 1) / 12) * 100) : 100) : 0,
      displayValue: trimesterNum >= 1 ? (trimesterNum === 1 ? `Week ${currentWeek}/12` : "Complete") : "Not started"
    },
    { 
      id: "trimester2", 
      label: "2nd Trimester", 
      value: trimesterNum >= 2 ? (trimesterNum === 2 ? Math.min(100, ((currentWeek - 13) / 14) * 100) : 100) : 0,
      displayValue: trimesterNum >= 2 ? (trimesterNum === 2 ? `Week ${currentWeek - 12}/14` : "Complete") : "Not started"
    },
    { 
      id: "trimester3", 
      label: "3rd Trimester", 
      value: trimesterNum === 3 ? Math.min(100, ((currentWeek - 27) / 13) * 100) : 0,
      displayValue: trimesterNum === 3 ? `Week ${currentWeek - 26}/13` : "Not started"
    },
  ];

  return {
    values: { 
      dueDate: dueDate.toISOString(), 
      currentWeek, 
      currentDay, 
      daysRemaining, 
      trimester,
      progressPercent,
    },
    formatted: {
      dueDate: fmt(dueDate),
      currentWeek: currentWeek >= 1 ? `Week ${currentWeek}, Day ${currentDay}` : "—",
      trimester,
      daysRemaining: daysRemaining.toString(),
      babySize: currentWeek >= 4 ? `${baby.fruit} (${baby.length}, ${baby.weight})` : "Too early",
      conceptionDateResult: fmtShort(conceptionDate),
    },
    summary: `Your estimated due date is ${fmt(dueDate)}. You are currently ${currentWeek} weeks and ${currentDay} days pregnant (${trimester}).`,
    isValid: true,
    metadata: { 
      babyLength: baby.length, 
      babyWeight: baby.weight, 
      tableData: generateWeekByWeekData(),
      progressData,
      trimesterNum,
      currentWeek,
    },
  };
}

export default pregnancyConfig;
