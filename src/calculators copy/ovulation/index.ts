import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ─── CONFIG ─────────────────────────────────────────────────────────────────
export const ovulationConfig: CalculatorConfigV4 = {
  id: "ovulation",
  version: "4.0",
  category: "health",
  icon: "🌸",

  // ─── PRESETS ────────────────────────────────────────────────────────────────
  presets: [
    {
      id: "regularCycle",
      icon: "📅",
      values: {
        lmpMonth: "2",
        lmpDay: 1,
        cycleLength: 28,
        lutealPhase: 14,
        goal: "conceive",
      },
    },
    {
      id: "shortCycle",
      icon: "⚡",
      values: {
        lmpMonth: "2",
        lmpDay: 1,
        cycleLength: 24,
        lutealPhase: 13,
        goal: "conceive",
      },
    },
    {
      id: "longCycle",
      icon: "🕐",
      values: {
        lmpMonth: "2",
        lmpDay: 1,
        cycleLength: 35,
        lutealPhase: 14,
        goal: "track",
      },
    },
  ],

  // ─── TRANSLATIONS (EN ONLY) ─────────────────────────────────────────────────
  t: {
    en: {
      name: "Ovulation Calculator",
      slug: "ovulation",
      subtitle: "Track your fertile window, predict ovulation day, and plan ahead with a 6-month fertility calendar.",
      breadcrumb: "Ovulation",

      seo: {
        title: "Ovulation Calculator - Free Fertility Window Tracker",
        description: "Track your ovulation date and fertile window based on your cycle. Get a 6-month fertility calendar with peak days, implantation window, and due date estimates.",
        shortDescription: "Find your fertile days and ovulation date.",
        keywords: [
          "ovulation calculator",
          "fertility calculator",
          "ovulation calendar",
          "when am i most fertile",
          "fertile window calculator",
          "free ovulation tracker",
          "conception calculator",
          "ovulation predictor",
        ],
      },

      calculator: { yourInformation: "Your Information" },
      ui: {
        yourInformation: "Cycle Information",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        },
      },

      results: {
        ovulationDate: { label: "Estimated Ovulation Date" },
        fertileWindowStart: { label: "Fertile Window Opens" },
        fertileWindowEnd: { label: "Fertile Window Closes" },
        peakFertility: { label: "Peak Fertility Days" },
        nextPeriod: { label: "Next Period Expected" },
        implantationWindow: { label: "Implantation Window" },
        pregnancyTestDate: { label: "Earliest Pregnancy Test" },
        dueDateIfConceived: { label: "Est. Due Date if Conceived" },
      },

      presets: {
        regularCycle: {
          label: "Regular 28-Day",
          description: "Standard 28-day cycle with 14-day luteal phase",
        },
        shortCycle: {
          label: "Short Cycle (24)",
          description: "Shorter 24-day cycle — ovulation occurs earlier",
        },
        longCycle: {
          label: "Long Cycle (35)",
          description: "Longer 35-day cycle — ovulation occurs later",
        },
      },

      values: {
        days: "days",
        day: "day",
        to: "to",
        and: "and",
        cycle: "cycle",
        "day-of-cycle": "day of cycle",
      },

      formats: {
        summary: "Ovulation estimated on {ovulationDate}. Fertile window: {fertileStart} to {fertileEnd}. Next period expected {nextPeriod}.",
      },

      infoCards: {
        fertility: {
          title: "Your Fertility Window",
          items: [
            { label: "Ovulation Date", valueKey: "ovulationDate" },
            { label: "Fertile Window", valueKey: "fertileWindowFull" },
            { label: "Peak Fertility", valueKey: "peakFertility" },
            { label: "Next Period", valueKey: "nextPeriod" },
          ],
        },
        planning: {
          title: "Conception Planning",
          items: [
            { label: "Implantation Window", valueKey: "implantationWindow" },
            { label: "Pregnancy Test Date", valueKey: "pregnancyTestDate" },
            { label: "Due Date if Conceived", valueKey: "dueDateIfConceived" },
            { label: "Cycle Day of Ovulation", valueKey: "ovulationCycleDay" },
          ],
        },
        tips: {
          title: "Fertility Tips",
          items: [
            "Your most fertile days are the 2 days before ovulation and ovulation day itself. Sperm can survive up to 5 days inside the body, so having intercourse before ovulation is ideal.",
            "Track basal body temperature (BBT) each morning before getting up. A sustained rise of 0.2°C (0.4°F) confirms ovulation has occurred.",
            "Monitor cervical mucus changes — fertile mucus resembles raw egg whites (clear, stretchy, slippery). This indicates you're approaching ovulation.",
            "Ovulation predictor kits (OPKs) detect the LH surge that happens 24-36 hours before ovulation. Test in the afternoon for best accuracy.",
          ],
        },
      },

      detailedTable: {
        fertilityCalendar: {
          button: "View 6-Month Fertility Calendar",
          title: "6-Month Fertility Calendar",
          columns: {
            month: "Month",
            periodStart: "Period Start",
            fertileStart: "Fertile Opens",
            peakDays: "Peak Days",
            ovulation: "Ovulation",
            nextPeriod: "Next Period",
            dueDate: "Due Date if Conceived",
          },
        },
      },

      education: {
        whatIs: {
          title: "What Is Ovulation?",
          content: "Ovulation is the release of a mature egg from one of the ovaries, occurring once per menstrual cycle. The egg travels down the fallopian tube where it can be fertilized by sperm for approximately 12 to 24 hours. This calculator estimates your ovulation date using the calendar method: it subtracts your luteal phase length (typically 14 days) from your total cycle length. For example, in a 28-day cycle with a 14-day luteal phase, ovulation occurs around day 14. In a 32-day cycle, ovulation would be around day 18. Understanding your ovulation timing is key for both conception planning and natural family planning.",
        },
        howItWorks: {
          title: "How This Calculator Works",
          content: "This calculator uses the calendar-based method to predict your fertile days. It takes your last menstrual period (LMP) date and cycle length, then subtracts the luteal phase (the post-ovulation phase, typically 14 days) to estimate ovulation day. Your fertile window spans 5 days before ovulation through ovulation day itself — a total of 6 days — because sperm can survive up to 5 days in the reproductive tract. The calculator also projects your next 6 cycles, estimates implantation timing (6-12 days after ovulation), and calculates a potential due date using Naegele's rule (LMP + 280 days). For maximum accuracy, track 3+ cycles to determine your average cycle length.",
        },
        signs: {
          title: "Signs and Symptoms of Ovulation",
          items: [
            { text: "Cervical mucus becomes clear, stretchy, and slippery — resembling raw egg whites. This 'fertile-quality' mucus helps sperm travel to the egg.", type: "info" },
            { text: "Basal body temperature (BBT) rises 0.2-0.5°C (0.4-1.0°F) after ovulation due to increased progesterone. Track daily to confirm ovulation patterns.", type: "info" },
            { text: "Mild pelvic pain or cramping on one side (mittelschmerz) — about 20% of women feel this during egg release from the ovary.", type: "info" },
            { text: "Increased libido is nature's way of promoting conception — many women notice heightened desire around ovulation.", type: "info" },
            { text: "Light spotting may occur at ovulation in some women. This is normal and caused by the brief hormone shift when the egg releases.", type: "info" },
            { text: "Important: These signs vary widely between women. Ovulation predictor kits (OPKs) provide more reliable confirmation than symptoms alone.", type: "warning" },
          ],
        },
        factors: {
          title: "Factors That Affect Ovulation",
          items: [
            { text: "Stress — high cortisol levels can delay or suppress ovulation entirely. Chronic stress may cause irregular cycles.", type: "warning" },
            { text: "Body weight — BMI below 18.5 or above 30 can disrupt ovulation. Maintaining a healthy weight supports regular cycles.", type: "info" },
            { text: "Age — fertility peaks in your 20s and gradually declines after 35. Egg quality and ovulation regularity decrease with age.", type: "info" },
            { text: "Exercise — moderate exercise supports fertility, but excessive training (marathon, triathlon) can suppress ovulation.", type: "info" },
            { text: "Medical conditions — PCOS, thyroid disorders, and endometriosis commonly affect ovulation timing and regularity.", type: "warning" },
            { text: "Medications — hormonal contraceptives, some antidepressants, and anti-inflammatories can affect ovulation.", type: "info" },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step ovulation date calculation",
          examples: [
            {
              title: "28-Day Cycle — Last Period Feb 1",
              steps: [
                "Last Menstrual Period (LMP) = February 1",
                "Cycle length = 28 days, Luteal phase = 14 days",
                "Ovulation day = 28 − 14 = day 14 of cycle",
                "Ovulation date = Feb 1 + 13 days = February 14",
                "Fertile window = Feb 9 (day 9) through Feb 14 (day 14)",
                "Peak fertility = Feb 12–13 (days 12-13)",
                "Next period = Feb 1 + 28 = March 1",
                "Due date if conceived = Feb 1 + 280 = November 8",
              ],
              result: "Ovulation ~Feb 14 · Fertile Feb 9–14 · Peak Feb 12–13",
            },
            {
              title: "32-Day Cycle — Last Period Jan 15",
              steps: [
                "Last Menstrual Period (LMP) = January 15",
                "Cycle length = 32 days, Luteal phase = 14 days",
                "Ovulation day = 32 − 14 = day 18 of cycle",
                "Ovulation date = Jan 15 + 17 days = February 1",
                "Fertile window = Jan 27 (day 13) through Feb 1 (day 18)",
                "Peak fertility = Jan 30–31 (days 16-17)",
                "Next period = Jan 15 + 32 = February 16",
              ],
              result: "Ovulation ~Feb 1 · Fertile Jan 27–Feb 1 · Peak Jan 30–31",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How accurate is an ovulation calculator?",
          answer: "Calendar-based ovulation calculators are a helpful estimate but not 100% precise. They work best for women with regular cycles (variation of 3 days or less). Studies show that only about 30% of women ovulate exactly on day 14 — ovulation can occur anywhere from day 11 to day 21 in a typical cycle. For greater accuracy, combine this calculator with ovulation predictor kits (OPKs), basal body temperature tracking, and cervical mucus observation.",
        },
        {
          question: "When am I most fertile during my cycle?",
          answer: "You are most fertile in the 2 days before ovulation and on ovulation day itself. This is because the egg only survives 12-24 hours after release, while sperm can survive up to 5 days in the reproductive tract. Your total fertile window is about 6 days: 5 days before ovulation plus ovulation day. Having intercourse every 1-2 days during this window maximizes your chances of conception.",
        },
        {
          question: "Can I use this calculator to avoid pregnancy?",
          answer: "While this calculator shows your estimated fertile days, it should NOT be relied upon as your sole method of contraception. The calendar method alone has a typical failure rate of about 12-24% per year because ovulation timing can vary unexpectedly due to stress, illness, travel, or hormonal changes. If you want to use fertility awareness for birth control, consider combining multiple tracking methods (BBT, cervical mucus, OPKs) and consult a healthcare provider for proper training.",
        },
        {
          question: "What is the luteal phase and why does it matter?",
          answer: "The luteal phase is the time between ovulation and the start of your next period, typically lasting 12-16 days (average 14). Unlike the follicular phase (before ovulation), which can vary significantly, the luteal phase is relatively consistent for each woman. This is why the calculator subtracts your luteal phase from your cycle length to estimate ovulation. A luteal phase shorter than 10 days may indicate a luteal phase defect, which can affect implantation — consult your doctor if you suspect this.",
        },
        {
          question: "What if my cycles are irregular?",
          answer: "If your cycles vary by more than 7 days from month to month, calendar-based predictions become less reliable. Track your cycles for at least 3-6 months to find your average length, and use the shortest cycle for a conservative estimate. Irregular cycles can be caused by PCOS, thyroid issues, stress, or significant weight changes. Consider using OPKs alongside this calculator for better accuracy, and see your doctor if cycles consistently fall outside the 21-45 day range.",
        },
        {
          question: "How soon after ovulation can I take a pregnancy test?",
          answer: "The earliest you can get a reliable pregnancy test result is about 12-14 days after ovulation, which is roughly the day your period is expected. Home pregnancy tests detect hCG, a hormone produced after the embryo implants in the uterine lining. Implantation typically occurs 6-12 days after ovulation. Testing too early can give a false negative because hCG levels haven't risen enough. For the most accurate results, wait until the first day of your missed period.",
        },
        {
          question: "Does age affect my ovulation and fertility?",
          answer: "Yes, age significantly impacts fertility. Women are most fertile in their 20s, with fertility gradually declining after age 30 and more rapidly after 35. By age 40, the chance of natural conception per cycle drops to about 5%. This decline is due to fewer remaining eggs, lower egg quality, and less regular ovulation. If you're 35+ and have been trying to conceive for 6 months without success (or 12 months if under 35), consult a fertility specialist.",
        },
        {
          question: "Can I ovulate more than once per cycle?",
          answer: "While rare, it is possible to release two eggs within the same 24-hour window — this is how fraternal twins are conceived. However, you cannot have two separate ovulation events days apart within the same cycle. Once ovulation occurs and progesterone rises, further ovulation is suppressed. What some women experience as 'double ovulation' is actually two eggs released nearly simultaneously from the same LH surge.",
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
        title: "Fertility Window — Current Cycle",
        xLabel: "Cycle Day",
        yLabel: "Fertility Level",
        series: {
          fertility: "Fertility",
        },
      },
    },
  },

  // ─── INPUTS ─────────────────────────────────────────────────────────────────
  inputs: [],

  inputGroups: [],

  // ─── RESULTS ────────────────────────────────────────────────────────────────
  results: [
    { id: "ovulationDate", type: "primary", format: "text" },
    { id: "fertileWindowStart", type: "secondary", format: "text" },
    { id: "fertileWindowEnd", type: "secondary", format: "text" },
    { id: "peakFertility", type: "secondary", format: "text" },
    { id: "nextPeriod", type: "secondary", format: "text" },
    { id: "implantationWindow", type: "secondary", format: "text" },
    { id: "pregnancyTestDate", type: "secondary", format: "text" },
    { id: "dueDateIfConceived", type: "secondary", format: "text" },
  ],

  // ─── INFOCARDS ──────────────────────────────────────────────────────────────
  infoCards: [
    { id: "fertility", type: "list", icon: "🌸", itemCount: 4 },
    { id: "planning", type: "list", icon: "📋", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ─── CHART ──────────────────────────────────────────────────────────────────
  chart: {
    id: "fertilityWindow",
    type: "area",
    xKey: "day",
    height: 320,
    showGrid: true,
    showLegend: false,
    showTooltip: true,
    yAxisFormat: "percentage",
    series: [
      { key: "fertility", type: "area", color: "#ec4899" },
    ],
  },

  // ─── DETAILED TABLE ─────────────────────────────────────────────────────────
  detailedTable: {
    id: "fertilityCalendar",
    buttonLabel: "View 6-Month Fertility Calendar",
    buttonIcon: "📅",
    modalTitle: "6-Month Fertility Calendar",
    columns: [
      { id: "month", label: "Month", align: "left" },
      { id: "periodStart", label: "Period Start", align: "center" },
      { id: "fertileStart", label: "Fertile Opens", align: "center" },
      { id: "peakDays", label: "Peak Days", align: "center", highlight: true },
      { id: "ovulation", label: "Ovulation", align: "center", highlight: true },
      { id: "nextPeriod", label: "Next Period", align: "center" },
      { id: "dueDate", label: "Due Date", align: "center" },
    ],
  },

  referenceData: [],

  // ─── EDUCATION ──────────────────────────────────────────────────────────────
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "signs", type: "list", icon: "🔍", itemCount: 6 },
    { id: "factors", type: "list", icon: "📋", itemCount: 6 },
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
      authors: "Wilcox AJ, Dunson D, Baird DD",
      year: "2000",
      title: "The timing of the 'fertile window' in the menstrual cycle: day specific estimates from a prospective study",
      source: "BMJ (British Medical Journal)",
      url: "https://pubmed.ncbi.nlm.nih.gov/11099288/",
    },
    {
      authors: "American College of Obstetricians and Gynecologists",
      year: "2024",
      title: "Evaluating Infertility - FAQ",
      source: "ACOG",
      url: "https://www.acog.org/womens-health/faqs/evaluating-infertility",
    },
  ],

  hero: { badge: "Popular" },
  sidebar: {},
  features: {},
  relatedCalculators: [
    "pregnancy-due-date",
    "bmi",
    "calorie",
    "age",
  ],
  ads: {},
};

// ─── HELPER: Date formatting ─────────────────────────────────────────────────
function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date: Date): string {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[date.getMonth()]} ${date.getDate()}`;
}

function formatDateFull(date: Date): string {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// ─── CALCULATE ────────────────────────────────────────────────────────────────
export function calculateOvulation(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read inputs ──
  const lmpMonth = parseInt((values.lmpMonth as string) || "2", 10);
  const lmpDay = values.lmpDay as number | null;
  const cycleLength = (values.cycleLength as number) || 28;
  const lutealPhase = (values.lutealPhase as number) || 14;

  // ── Validate required fields ──
  if (lmpDay === null || lmpDay === undefined) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  if (lmpDay < 1 || lmpDay > 31 || cycleLength < 21 || cycleLength > 45 || lutealPhase < 10 || lutealPhase > 16) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Construct LMP date (use current/recent year) ──
  const now = new Date();
  let lmpYear = now.getFullYear();
  // If the LMP month is in the future, use previous year
  const testDate = new Date(lmpYear, lmpMonth - 1, lmpDay);
  if (testDate > now) {
    lmpYear -= 1;
  }
  const lmp = new Date(lmpYear, lmpMonth - 1, lmpDay);

  // Validate date is real (e.g., Feb 30 → invalid)
  if (lmp.getMonth() !== lmpMonth - 1 || lmp.getDate() !== lmpDay) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Core calculations ──
  const ovulationDayOfCycle = cycleLength - lutealPhase;
  const ovulationDate = addDays(lmp, ovulationDayOfCycle - 1); // day 1 = LMP

  // Fertile window: 5 days before ovulation + ovulation day = 6 days total
  const fertileStart = addDays(ovulationDate, -5);
  const fertileEnd = new Date(ovulationDate);

  // Peak fertility: 2 days before ovulation + ovulation day
  const peakStart = addDays(ovulationDate, -2);
  const peakEnd = new Date(ovulationDate);

  // Next period
  const nextPeriod = addDays(lmp, cycleLength);

  // Implantation window: 6-12 days after ovulation
  const implantStart = addDays(ovulationDate, 6);
  const implantEnd = addDays(ovulationDate, 12);

  // Pregnancy test date: 14 days after ovulation (day period is expected or 1 day after)
  const testDateResult = addDays(ovulationDate, 14);

  // Due date if conceived (Naegele's rule: LMP + 280 days)
  const dueDate = addDays(lmp, 280);

  // ── Format results ──
  const toWord = v["to"] || "to";
  const andWord = v["and"] || "and";

  const fertileWindowFullStr = `${formatDate(fertileStart)} ${toWord} ${formatDate(fertileEnd)}`;

  // ── Chart data: Fertility level by cycle day ──
  const chartData: Array<Record<string, unknown>> = [];
  for (let d = 1; d <= cycleLength; d++) {
    let fertility = 0;

    // Menstruation phase (days 1-5): 0%
    if (d <= 5) {
      fertility = 0;
    }
    // Pre-fertile phase: gradually increase as we approach fertile window
    else if (d < ovulationDayOfCycle - 5) {
      fertility = 0;
    }
    // Fertile window days (5 days before ovulation)
    else if (d === ovulationDayOfCycle - 5) {
      fertility = 10;
    } else if (d === ovulationDayOfCycle - 4) {
      fertility = 16;
    } else if (d === ovulationDayOfCycle - 3) {
      fertility = 25;
    } else if (d === ovulationDayOfCycle - 2) {
      fertility = 55; // Peak -2
    } else if (d === ovulationDayOfCycle - 1) {
      fertility = 80; // Peak -1 (highest chance: day before ovulation)
    } else if (d === ovulationDayOfCycle) {
      fertility = 65; // Ovulation day
    }
    // Post-ovulation: rapid decline
    else if (d === ovulationDayOfCycle + 1) {
      fertility = 15;
    } else if (d === ovulationDayOfCycle + 2) {
      fertility = 5;
    }
    // Luteal phase: 0%
    else {
      fertility = 0;
    }

    chartData.push({
      day: `${v["day"] || "Day"} ${d}`,
      fertility,
    });
  }

  // ── DetailedTable: 6-month fertility calendar ──
  const tableData: Array<Record<string, string>> = [];
  let currentLmp = new Date(lmp);

  for (let cycle = 0; cycle < 6; cycle++) {
    const cycleOvulation = addDays(currentLmp, ovulationDayOfCycle - 1);
    const cycleFertileStart = addDays(cycleOvulation, -5);
    const cyclePeakStart = addDays(cycleOvulation, -2);
    const cyclePeakEnd = new Date(cycleOvulation);
    const cycleNextPeriod = addDays(currentLmp, cycleLength);
    const cycleDueDate = addDays(currentLmp, 280);

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];

    tableData.push({
      month: `${monthNames[currentLmp.getMonth()]} ${currentLmp.getFullYear()}`,
      periodStart: formatDate(currentLmp),
      fertileStart: formatDate(cycleFertileStart),
      peakDays: `${formatDate(cyclePeakStart)} – ${formatDate(cyclePeakEnd)}`,
      ovulation: formatDate(cycleOvulation),
      nextPeriod: formatDate(cycleNextPeriod),
      dueDate: formatDateFull(cycleDueDate),
    });

    // Move to next cycle
    currentLmp = new Date(cycleNextPeriod);
  }

  // ── Build summary ──
  const summary = f.summary
    ? f.summary
        .replace("{ovulationDate}", formatDateFull(ovulationDate))
        .replace("{fertileStart}", formatDate(fertileStart))
        .replace("{fertileEnd}", formatDate(fertileEnd))
        .replace("{nextPeriod}", formatDateFull(nextPeriod))
    : `Ovulation ~${formatDateFull(ovulationDate)}. Fertile window: ${formatDate(fertileStart)}–${formatDate(fertileEnd)}. Next period: ${formatDateFull(nextPeriod)}.`;

  return {
    values: {
      ovulationDate: formatDateFull(ovulationDate),
      fertileWindowStart: formatDateFull(fertileStart),
      fertileWindowEnd: formatDateFull(fertileEnd),
      peakFertility: `${formatDate(peakStart)} ${andWord} ${formatDate(peakEnd)}`,
      nextPeriod: formatDateFull(nextPeriod),
      implantationWindow: `${formatDate(implantStart)} ${toWord} ${formatDate(implantEnd)}`,
      pregnancyTestDate: formatDateFull(testDateResult),
      dueDateIfConceived: formatDateFull(dueDate),
      // Extra values for infoCards
      fertileWindowFull: fertileWindowFullStr,
      ovulationCycleDay: `${v["day"] || "Day"} ${ovulationDayOfCycle} ${v["of-cycle"] || "of cycle"}`,
    },
    formatted: {
      ovulationDate: formatDateFull(ovulationDate),
      fertileWindowStart: formatDateFull(fertileStart),
      fertileWindowEnd: formatDateFull(fertileEnd),
      peakFertility: `${formatDate(peakStart)} ${andWord} ${formatDate(peakEnd)}`,
      nextPeriod: formatDateFull(nextPeriod),
      implantationWindow: `${formatDate(implantStart)} ${toWord} ${formatDate(implantEnd)}`,
      pregnancyTestDate: formatDateFull(testDateResult),
      dueDateIfConceived: formatDateFull(dueDate),
      fertileWindowFull: fertileWindowFullStr,
      ovulationCycleDay: `${v["day"] || "Day"} ${ovulationDayOfCycle}`,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default ovulationConfig;
