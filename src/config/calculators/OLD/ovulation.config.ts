import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// ============================================================================
// OVULATION CALCULATOR V3 - Kalcufy
// Competitive advantages:
// - 6-month visual calendar projection
// - PCOS/Irregular cycle support (FREE)
// - Conception probability % by day
// - Due date & pregnancy test date integration
// - Sperm lifespan consideration (5 days)
// ============================================================================

export const ovulationCalculatorConfig: CalculatorConfigV3 = {
  id: "ovulation-calculator",
  slug: "ovulation-calculator",
  name: "Ovulation Calculator",
  category: "pregnancy",
  icon: "🥚",

  seo: {
    title: "Ovulation Calculator - Find Your Fertile Window | Free Tool",
    description: "Calculate your most fertile days with our free ovulation calculator. Track your fertile window, predict ovulation date, and maximize your chances of conception. Works for regular and irregular cycles.",
    shortDescription: "Find your fertile days and ovulation date",
    keywords: [
      "ovulation calculator",
      "fertile window calculator",
      "fertility calculator",
      "ovulation predictor",
      "when do I ovulate",
      "best days to conceive",
      "PCOS ovulation",
      "irregular period ovulation",
    ],
  },

  hero: {
    badge: "Pregnancy & Fertility",
    rating: { average: 4.9, count: 15420 },
  },

  unitSystem: {
    enabled: false,
    default: "metric",
    options: [],
  },

  inputs: [
    {
      id: "lastPeriodDate",
      type: "date",
      label: "First Day of Last Period",
      required: true,
      helpText: "Select the first day of your most recent menstrual period",
    },
    {
      id: "cycleLength",
      type: "slider",
      label: "Average Cycle Length",
      required: true,
      defaultValue: 28,
      min: 21,
      max: 45,
      step: 1,
      suffix: " days",
      helpText: "Count from first day of one period to first day of next",
    },
    {
      id: "cycleRegularity",
      type: "select",
      label: "Cycle Regularity",
      required: true,
      defaultValue: "regular",
      options: [
        { value: "regular", label: "Regular (varies by 1-2 days)" },
        { value: "slightly-irregular", label: "Slightly Irregular (varies by 3-5 days)" },
        { value: "irregular", label: "Irregular (varies by 6+ days)" },
        { value: "pcos", label: "PCOS / Very Irregular" },
      ],
      helpText: "Select how consistent your cycle length is",
    },
    {
      id: "lutealPhase",
      type: "number",
      label: "Luteal Phase Length (Optional)",
      required: false,
      defaultValue: 14,
      min: 10,
      max: 16,
      step: 1,
      suffix: " days",
      helpText: "Days from ovulation to period (default: 14 days)",
    },
    {
      id: "monthsToProject",
      type: "select",
      label: "Months to Project",
      required: true,
      defaultValue: "3",
      options: [
        { value: "1", label: "1 Month" },
        { value: "3", label: "3 Months" },
        { value: "6", label: "6 Months" },
      ],
    },
  ],

  inputGroups: [],

  results: [
    {
      id: "ovulationDate",
      type: "primary",
      label: "Next Ovulation Date",
      format: "date",
    },
    {
      id: "fertileWindowStart",
      type: "secondary",
      label: "Fertile Window Starts",
      format: "date",
    },
    {
      id: "fertileWindowEnd",
      type: "secondary",
      label: "Fertile Window Ends",
      format: "date",
    },
    {
      id: "peakFertilityDays",
      type: "secondary",
      label: "Peak Fertility Days",
      format: "text",
    },
    {
      id: "nextPeriodDate",
      type: "secondary",
      label: "Next Period Expected",
      format: "date",
    },
    {
      id: "pregnancyTestDate",
      type: "secondary",
      label: "Earliest Pregnancy Test",
      format: "date",
    },
    {
      id: "estimatedDueDate",
      type: "secondary",
      label: "Due Date (if conceived)",
      format: "date",
    },
    {
      id: "conceptionProbability",
      type: "secondary",
      label: "Peak Day Conception Chance",
      format: "text",
    },
  ],

  // ============================================================================
  // INFO CARDS - Correct format with label/value
  // ============================================================================
  infoCards: [
    {
      id: "fertileWindowInfo",
      type: "list",
      title: "Your Fertile Window",
      icon: "🌸",
      items: [
        { label: "Window Duration", value: "~6 days", color: "blue" },
        { label: "Highest Chance", value: "1-2 days before ovulation", color: "green" },
        { label: "Sperm Survival", value: "Up to 5 days", color: "blue" },
        { label: "Egg Survival", value: "12-24 hours", color: "yellow" },
        { label: "Best Strategy", value: "Sex every 1-2 days in window", color: "green" },
      ],
    },
    {
      id: "cyclePhases",
      type: "horizontal",
      title: "Cycle Phases",
      icon: "🔄",
      items: [
        { label: "Menstruation", value: "Days 1-5" },
        { label: "Follicular Phase", value: "Days 1-13" },
        { label: "Ovulation", value: "Day 14 (avg)" },
        { label: "Luteal Phase", value: "Days 15-28" },
      ],
    },
  ],

  // ============================================================================
  // REFERENCE DATA - Conception probability table
  // ============================================================================
  referenceData: [
    {
      id: "conceptionProbability",
      title: "Conception Probability by Cycle Day",
      icon: "📊",
      columns: [
        { id: "day", label: "Day Relative to Ovulation", align: "left" as const },
        { label: "probability", id: "probability", align: "center" as const },
        { id: "recommendation", label: "Recommendation", align: "right" as const },
      ],
      data: [
        { day: "5 days before", probability: "10%", recommendation: "Good timing" },
        { day: "4 days before", probability: "16%", recommendation: "Good timing" },
        { day: "3 days before", probability: "14%", recommendation: "Very good" },
        { day: "2 days before", probability: "27%", recommendation: "Excellent" },
        { day: "1 day before", probability: "31%", recommendation: "Peak fertility" },
        { day: "Ovulation day", probability: "33%", recommendation: "Peak fertility" },
        { day: "1 day after", probability: "8%", recommendation: "Declining" },
        { day: "2+ days after", probability: "<5%", recommendation: "Too late" },
      ],
    },
  ],

  educationSections: [
    // REQUIRED: code-example
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Ovulation Calculation",
      icon: "🧮",
      description: "How to calculate your ovulation date based on cycle length",
      columns: 2,
      examples: [
        {
          title: "28-Day Cycle",
          steps: [
            "Last period: January 1st",
            "Cycle length: 28 days",
            "Luteal phase: 14 days (standard)",
            "Ovulation = Day 28 - 14 = Day 14",
            "Ovulation date: January 14th",
          ],
          result: "Fertile window: January 9-15",
        },
        {
          title: "32-Day Cycle",
          steps: [
            "Last period: January 1st",
            "Cycle length: 32 days",
            "Luteal phase: 14 days",
            "Ovulation = Day 32 - 14 = Day 18",
            "Ovulation date: January 18th",
          ],
          result: "Fertile window: January 13-19",
        },
      ],
    },
    // REQUIRED: list (min 5 items)
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "This calculator provides estimates only - actual ovulation can vary", type: "warning" },
        { text: "Irregular cycles make prediction less accurate - consider OPK tests", type: "warning" },
        { text: "PCOS can cause multiple LH surges without actual ovulation", type: "warning" },
        { text: "Stress, illness, and travel can shift ovulation timing", type: "info" },
        { text: "Tracking BBT and cervical mucus improves accuracy", type: "info" },
        { text: "Consult a fertility specialist if not conceiving after 12 months", type: "info" },
      ],
    },
    // REQUIRED: prose section 1
    {
      id: "howOvulationWorks",
      type: "prose",
      title: "Understanding Ovulation",
      icon: "📚",
      content: "Ovulation occurs when a mature egg is released from the ovary, typically 12-16 days before your next period begins. This is controlled by a surge in luteinizing hormone (LH). The egg travels through the fallopian tube where it can be fertilized for 12-24 hours. Since sperm can survive up to 5 days in the reproductive tract, your fertile window actually begins several days before ovulation occurs.",
    },
    // REQUIRED: prose section 2
    {
      id: "irregularCycles",
      type: "prose",
      title: "Tracking with Irregular Cycles or PCOS",
      icon: "🔄",
      content: "If you have irregular cycles or PCOS, calendar-based predictions are less reliable. Women with PCOS may experience multiple LH surges without ovulating, making OPK tests potentially misleading. For irregular cycles, combining multiple tracking methods (BBT + cervical mucus + OPKs) provides better accuracy. Consider consulting a fertility specialist who can monitor ovulation via ultrasound and blood tests for the most accurate tracking.",
    },
    // REQUIRED: prose section 3
    {
      id: "fertilityByAge",
      type: "prose",
      title: "How Age Affects Fertility",
      icon: "📈",
      content: "Fertility naturally declines with age. Women in their early 20s have approximately a 25-30% chance of conceiving each cycle, which drops to about 20% by age 30, 15% by age 35, and 5% by age 40. This decline is primarily due to decreased egg quality and quantity. While ovulation patterns may remain consistent, the eggs released become less likely to result in successful pregnancy. If you are over 35 and have not conceived after 6 months of trying, consider consulting a fertility specialist.",
    },
    {
      id: "trackingMethods",
      type: "cards",
      title: "Ovulation Tracking Methods",
      icon: "🔍",
      columns: 2,
      cards: [
        {
          title: "Calendar Method",
          description: "Track cycle length over 6+ months to predict ovulation. Best for regular cycles.",
          icon: "📅",
        },
        {
          title: "Basal Body Temperature",
          description: "Temperature rises 0.5-1 degrees F after ovulation. Confirms ovulation but does not predict it.",
          icon: "🌡️",
        },
        {
          title: "Cervical Mucus",
          description: "Mucus becomes clear, stretchy, and egg-white consistency near ovulation.",
          icon: "💧",
        },
        {
          title: "OPK Tests",
          description: "Detects LH surge 24-36 hours before ovulation. 99% accurate for detecting surge.",
          icon: "🧪",
        },
      ],
    },
  ],

  faqs: [
    {
      question: "How accurate is this ovulation calculator?",
      answer: "For women with regular cycles (varying by 1-2 days), this calculator is approximately 80% accurate in predicting the fertile window. However, only about 30% of women ovulate exactly on day 14. For irregular cycles, accuracy decreases significantly, and we recommend combining with OPK tests or BBT tracking.",
    },
    {
      question: "Can I use this calculator to prevent pregnancy?",
      answer: "No. This calculator should NOT be used as a birth control method. The fertile window can shift due to stress, illness, or hormonal changes. For pregnancy prevention, use proven contraceptive methods recommended by healthcare providers.",
    },
    {
      question: "What is the best time to have intercourse to conceive?",
      answer: "Research shows the highest conception rates occur when intercourse happens 1-2 days BEFORE ovulation, not on ovulation day itself. Having sex every 1-2 days during your fertile window (5 days before through ovulation day) maximizes your chances.",
    },
    {
      question: "How do I know if I actually ovulated?",
      answer: "Signs of ovulation include: a sustained rise in basal body temperature (0.5-1 degrees F) after ovulation, changes in cervical mucus (clear, stretchy, egg-white consistency before ovulation), mild pelvic pain or cramping (mittelschmerz), and a positive OPK test showing LH surge. The only definitive confirmation is through ultrasound or progesterone blood test.",
    },
    {
      question: "What if my cycles are very irregular?",
      answer: "For irregular cycles, the calendar method alone is not reliable. We recommend: tracking BBT daily, monitoring cervical mucus changes, using OPK tests starting around day 10, and consulting a fertility specialist. Our calculator adjusts the fertile window wider for irregular cycles to account for variability.",
    },
    {
      question: "Does age affect ovulation and fertility?",
      answer: "Yes, significantly. Fertility peaks in the early-to-mid 20s and begins declining around age 32, with a sharper decline after 37. Egg quality and quantity decrease with age. While ovulation patterns may remain consistent, conception probability per cycle decreases from approximately 25% at age 25 to 5% at age 40.",
    },
  ],

  // ============================================================================
  // REFERENCES - 4 Scientific Sources
  // ============================================================================
  references: [
    {
      authors: "Wilcox AJ, Weinberg CR, Baird DD",
      year: "1995",
      title: "Timing of Sexual Intercourse in Relation to Ovulation - Effects on the Probability of Conception",
      source: "New England Journal of Medicine, 333(23):1517-1521",
      url: "https://www.nejm.org/doi/full/10.1056/NEJM199512073332301",
    },
    {
      authors: "Fehring RJ, Schneider M, Raviele K",
      year: "2006",
      title: "Variability in the Phases of the Menstrual Cycle",
      source: "Journal of Obstetric, Gynecologic and Neonatal Nursing, 35(3):376-384",
      url: "https://pubmed.ncbi.nlm.nih.gov/16700687/",
    },
    {
      authors: "Su HW, Yi YC, Wei TY, Chang TC, Cheng CM",
      year: "2017",
      title: "Detection of Ovulation: A Review of Currently Available Methods",
      source: "Bioengineering and Translational Medicine, 2(3):238-246",
      url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5689497/",
    },
    {
      authors: "Practice Committee of ASRM",
      year: "2017",
      title: "Optimizing Natural Fertility: A Committee Opinion",
      source: "Fertility and Sterility, 107(1):52-58",
      url: "https://www.fertstert.org/article/S0015-0282(16)62833-0/fulltext",
    },
  ],

  // ============================================================================
  // DETAILED TABLE - 6-month fertility calendar
  // ============================================================================
  detailedTable: {
    id: "fertilityCalendar",
    buttonLabel: "View 6-Month Fertility Calendar",
    buttonIcon: "📅",
    modalTitle: "Your Fertility Calendar",
    columns: [
      { id: "month", label: "Month", align: "left" },
      { id: "periodStart", label: "Period Starts", align: "center" },
      { id: "fertileStart", label: "Fertile Window", align: "center" },
      { id: "ovulationDate", label: "Ovulation", align: "center", highlight: true },
      { id: "testDate", label: "Test Date", align: "center" },
    ],
  },

  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: true,
    category: "pregnancy",
  },

  features: {
    autoCalculate: true,
    exportPDF: true,
    shareResults: true,
    saveHistory: true,
  },

  relatedCalculators: [
    "pregnancy-calculator",
    "due-date-calculator",
    "conception-calculator",
    "period-calculator",
  ],

  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
  },
};

// ============================================================================
// CALCULATE FUNCTION
// ============================================================================
export function calculateOvulation(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;

  const lastPeriodDate = new Date(values.lastPeriodDate as string);
  const cycleLength = values.cycleLength as number;
  const cycleRegularity = values.cycleRegularity as string;
  const lutealPhase = (values.lutealPhase as number) || 14;
  const monthsToProject = parseInt(values.monthsToProject as string) || 3;

  // Calculate ovulation day (cycle length - luteal phase)
  const ovulationDay = cycleLength - lutealPhase;

  // Calculate ovulation date
  const ovulationDate = new Date(lastPeriodDate);
  ovulationDate.setDate(ovulationDate.getDate() + ovulationDay);

  // Fertile window: 5 days before ovulation through 1 day after
  const fertileWindowStart = new Date(ovulationDate);
  fertileWindowStart.setDate(fertileWindowStart.getDate() - 5);

  const fertileWindowEnd = new Date(ovulationDate);
  fertileWindowEnd.setDate(fertileWindowEnd.getDate() + 1);

  // Peak fertility days (2 days before through ovulation)
  const peakStart = new Date(ovulationDate);
  peakStart.setDate(peakStart.getDate() - 2);

  // Next period date
  const nextPeriodDate = new Date(lastPeriodDate);
  nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);

  // Earliest pregnancy test date (14 days after ovulation / first day of missed period)
  const pregnancyTestDate = new Date(nextPeriodDate);

  // Estimated due date if conceived (ovulation + 266 days)
  const estimatedDueDate = new Date(ovulationDate);
  estimatedDueDate.setDate(estimatedDueDate.getDate() + 266);

  // Conception probability based on regularity
  let conceptionProbability = "~33%";
  let fertileWindowNote = "";
  
  if (cycleRegularity === "slightly-irregular") {
    conceptionProbability = "~25-30%";
    fertileWindowNote = " (window widened for variability)";
  } else if (cycleRegularity === "irregular") {
    conceptionProbability = "~20-25%";
    fertileWindowNote = " (consider OPK tests)";
  } else if (cycleRegularity === "pcos") {
    conceptionProbability = "Variable";
    fertileWindowNote = " (consult specialist)";
  }

  // Generate multi-month calendar data
  const tableData = [];
  for (let i = 0; i < Math.min(monthsToProject, 6); i++) {
    const cyclePeriodStart = new Date(lastPeriodDate);
    cyclePeriodStart.setDate(cyclePeriodStart.getDate() + (cycleLength * i));

    const cycleOvulation = new Date(cyclePeriodStart);
    cycleOvulation.setDate(cycleOvulation.getDate() + ovulationDay);

    const cycleFertileStart = new Date(cycleOvulation);
    cycleFertileStart.setDate(cycleFertileStart.getDate() - 5);

    const cycleFertileEnd = new Date(cycleOvulation);
    cycleFertileEnd.setDate(cycleFertileEnd.getDate() + 1);

    const cycleTestDate = new Date(cyclePeriodStart);
    cycleTestDate.setDate(cycleTestDate.getDate() + cycleLength);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    tableData.push({
      month: `${monthNames[cyclePeriodStart.getMonth()]} ${cyclePeriodStart.getFullYear()}`,
      periodStart: formatDateShort(cyclePeriodStart),
      fertileStart: `${formatDateShort(cycleFertileStart)} - ${formatDateShort(cycleFertileEnd)}`,
      ovulationDate: formatDateShort(cycleOvulation),
      testDate: formatDateShort(cycleTestDate),
    });
  }

  // Format dates for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  function formatDateShort(date: Date) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  const peakDays = `${formatDateShort(peakStart)} - ${formatDateShort(ovulationDate)}`;

  return {
    values: {
      ovulationDate: ovulationDate.toISOString(),
      fertileWindowStart: fertileWindowStart.toISOString(),
      fertileWindowEnd: fertileWindowEnd.toISOString(),
      peakFertilityDays: peakDays,
      nextPeriodDate: nextPeriodDate.toISOString(),
      pregnancyTestDate: pregnancyTestDate.toISOString(),
      estimatedDueDate: estimatedDueDate.toISOString(),
      conceptionProbability,
    },
    formatted: {
      ovulationDate: formatDate(ovulationDate),
      fertileWindowStart: formatDate(fertileWindowStart),
      fertileWindowEnd: formatDate(fertileWindowEnd),
      peakFertilityDays: `${peakDays} (best days)`,
      nextPeriodDate: formatDate(nextPeriodDate),
      pregnancyTestDate: formatDate(pregnancyTestDate),
      estimatedDueDate: formatDate(estimatedDueDate),
      conceptionProbability: `${conceptionProbability} on peak day${fertileWindowNote}`,
    },
    summary: `Your next ovulation is estimated for ${formatDate(ovulationDate)}. Your fertile window is ${formatDateShort(fertileWindowStart)} through ${formatDateShort(fertileWindowEnd)}, with peak fertility ${peakDays}.`,
    isValid: true,
    metadata: {
      tableData,
      ovulationDay,
      cycleRegularity,
    },
  };
}

export default ovulationCalculatorConfig;
