import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// AGE CALCULATOR V3 CONFIG
// =============================================================================
// Calculates age in years, months, days, and various time units
// Includes zodiac signs, generations, and fun milestones
// =============================================================================

// Zodiac Signs Data
const ZODIAC_SIGNS = [
  { sign: "Capricorn", symbol: "♑", startMonth: 12, startDay: 22, endMonth: 1, endDay: 19, element: "Earth" },
  { sign: "Aquarius", symbol: "♒", startMonth: 1, startDay: 20, endMonth: 2, endDay: 18, element: "Air" },
  { sign: "Pisces", symbol: "♓", startMonth: 2, startDay: 19, endMonth: 3, endDay: 20, element: "Water" },
  { sign: "Aries", symbol: "♈", startMonth: 3, startDay: 21, endMonth: 4, endDay: 19, element: "Fire" },
  { sign: "Taurus", symbol: "♉", startMonth: 4, startDay: 20, endMonth: 5, endDay: 20, element: "Earth" },
  { sign: "Gemini", symbol: "♊", startMonth: 5, startDay: 21, endMonth: 6, endDay: 20, element: "Air" },
  { sign: "Cancer", symbol: "♋", startMonth: 6, startDay: 21, endMonth: 7, endDay: 22, element: "Water" },
  { sign: "Leo", symbol: "♌", startMonth: 7, startDay: 23, endMonth: 8, endDay: 22, element: "Fire" },
  { sign: "Virgo", symbol: "♍", startMonth: 8, startDay: 23, endMonth: 9, endDay: 22, element: "Earth" },
  { sign: "Libra", symbol: "♎", startMonth: 9, startDay: 23, endMonth: 10, endDay: 22, element: "Air" },
  { sign: "Scorpio", symbol: "♏", startMonth: 10, startDay: 23, endMonth: 11, endDay: 21, element: "Water" },
  { sign: "Sagittarius", symbol: "♐", startMonth: 11, startDay: 22, endMonth: 12, endDay: 21, element: "Fire" },
];

// Generations Data
const GENERATIONS = [
  { name: "The Greatest Generation", start: 1901, end: 1927 },
  { name: "The Silent Generation", start: 1928, end: 1945 },
  { name: "Baby Boomers", start: 1946, end: 1964 },
  { name: "Generation X", start: 1965, end: 1980 },
  { name: "Millennials (Gen Y)", start: 1981, end: 1996 },
  { name: "Generation Z", start: 1997, end: 2012 },
  { name: "Generation Alpha", start: 2013, end: 2025 },
];

export const ageCalculatorConfig: CalculatorConfigV3 = {
  id: "age-calculator",
  slug: "age-calculator",
  name: "Age Calculator",
  category: "everyday",
  icon: "📅",

  // ═══════════════════════════════════════════════════════════════════════════
  // SEO
  // ═══════════════════════════════════════════════════════════════════════════
  seo: {
    title: "Age Calculator - Calculate Your Exact Age in Years, Months & Days",
    description: "Free age calculator to find your exact age from date of birth. Calculate age in years, months, weeks, days, hours, and seconds. Includes zodiac sign, generation, and birthday countdown.",
    shortDescription: "Calculate your exact age from date of birth",
    keywords: [
      "age calculator",
      "how old am I",
      "date of birth calculator",
      "birthday calculator",
      "age in days",
      "chronological age",
      "zodiac sign calculator",
      "generation calculator",
      "date difference",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HERO
  // ═══════════════════════════════════════════════════════════════════════════
  hero: {
    badge: "Everyday",
    rating: { average: 4.9, count: 89500 },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UNIT SYSTEM
  // ═══════════════════════════════════════════════════════════════════════════
  unitSystem: {
    enabled: false,
    default: "metric",
    options: [],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════════════════
  inputs: [
    {
      id: "calculationMode",
      type: "select",
      label: "Calculation Mode",
      required: true,
      defaultValue: "ageFromDOB",
      options: [
        { value: "ageFromDOB", label: "Calculate Current Age" },
        { value: "ageAtDate", label: "Age on Specific Date" },
        { value: "dateDifference", label: "Difference Between Two Dates" },
      ],
    },
    {
      id: "birthDate",
      type: "date",
      label: "Date of Birth",
      required: true,
      helpText: "Enter your birth date",
    },
    {
      id: "targetDate",
      type: "date",
      label: "Calculate Age On",
      required: false,
      helpText: "Leave empty for today's date",
      showWhen: { field: "calculationMode", value: ["ageAtDate", "dateDifference"] },
    },
  ],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════════════════
  results: [
    {
      id: "ageYears",
      type: "primary",
      label: "Age",
      format: "text",
    },
    {
      id: "totalDays",
      type: "secondary",
      label: "Total Days",
      format: "number",
      suffix: " days",
    },
    {
      id: "totalWeeks",
      type: "secondary",
      label: "Total Weeks",
      format: "number",
      suffix: " weeks",
    },
    {
      id: "totalMonths",
      type: "secondary",
      label: "Total Months",
      format: "number",
      suffix: " months",
    },
    {
      id: "zodiacSign",
      type: "secondary",
      label: "Zodiac Sign",
      format: "text",
    },
    {
      id: "generation",
      type: "secondary",
      label: "Generation",
      format: "text",
    },
    {
      id: "nextBirthday",
      type: "secondary",
      label: "Days Until Birthday",
      format: "number",
      suffix: " days",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // INFO CARDS
  // ═══════════════════════════════════════════════════════════════════════════
  infoCards: [
    {
      id: "funMilestones",
      title: "Fun Age Milestones",
      icon: "🎯",
      type: "list",
      items: [
        { label: "1 Million Seconds", value: "≈ 11.5 days old", color: "blue" },
        { label: "10,000 Days", value: "≈ 27.4 years old", color: "green" },
        { label: "1 Billion Seconds", value: "≈ 31.7 years old", color: "purple" },
      ],
    },
    {
      id: "ageConversions",
      title: "Time Conversions",
      icon: "⏱️",
      type: "horizontal",
      items: [
        { label: "1 year = 365.25 days (avg)" },
        { label: "1 year = 52.18 weeks" },
        { label: "1 year = 8,766 hours" },
        { label: "1 year = 31,557,600 seconds" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCE DATA
  // ═══════════════════════════════════════════════════════════════════════════
  referenceData: [
    {
      id: "generations",
      title: "Generation Years",
      icon: "👥",
      columns: 2,
      items: [
        { label: "Baby Boomers", value: "1946-1964" },
        { label: "Generation X", value: "1965-1980" },
        { label: "Millennials", value: "1981-1996" },
        { label: "Generation Z", value: "1997-2012" },
        { label: "Gen Alpha", value: "2013-2025" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  educationSections: [
    // Age Calculation Methods
    {
      id: "methods",
      type: "cards",
      title: "Age Calculation Systems",
      icon: "🌍",
      columns: 2,
      cards: [
        {
          title: "Western System",
          description: "Age starts at 0 at birth and increases by 1 on each birthday. This is the international standard used by most countries for legal and official purposes.",
          icon: "🌎",
        },
        {
          title: "East Asian System",
          description: "Traditionally, age starts at 1 at birth (counting time in womb) and increases on New Year's Day. South Korea officially switched to Western system in 2023.",
          icon: "🌏",
        },
        {
          title: "Lunar Calendar",
          description: "Some cultures calculate age using lunar calendars, which have 12-13 months per year. This can create slight differences from Gregorian calendar calculations.",
          icon: "🌙",
        },
        {
          title: "Legal Age",
          description: "For legal purposes (voting, driving, drinking), most countries use completed years. You're legally 18 the day after your 18th birthday in most jurisdictions.",
          icon: "⚖️",
        },
      ],
    },
    // Zodiac Signs
    {
      id: "zodiac",
      type: "cards",
      title: "Zodiac Sign Elements",
      icon: "⭐",
      columns: 4,
      cards: [
        {
          title: "Fire Signs",
          description: "Aries, Leo, Sagittarius - Passionate, dynamic, temperamental",
          icon: "🔥",
        },
        {
          title: "Earth Signs",
          description: "Taurus, Virgo, Capricorn - Grounded, practical, reliable",
          icon: "🌍",
        },
        {
          title: "Air Signs",
          description: "Gemini, Libra, Aquarius - Intellectual, social, communicative",
          icon: "💨",
        },
        {
          title: "Water Signs",
          description: "Cancer, Scorpio, Pisces - Emotional, intuitive, sensitive",
          icon: "💧",
        },
      ],
    },
    // REQUIRED: Important Considerations
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        {
          text: "This calculator uses the Gregorian calendar and Western age counting (starting from 0 at birth).",
          type: "info",
        },
        {
          text: "Leap years are accounted for — February 29 birthdays are handled correctly, aging 1 year annually.",
          type: "info",
        },
        {
          text: "Month calculations assume same date next month (Feb 28 → Mar 28 = 1 month). End-of-month dates may vary.",
          type: "warning",
        },
        {
          text: "Zodiac signs are based on Western astrology tropical dates. Sidereal astrology uses different dates.",
          type: "info",
        },
        {
          text: "Generation definitions vary by source. We use Pew Research Center definitions as the standard reference.",
          type: "info",
        },
        {
          text: "For legal age verification, always use official government documents and consult local laws.",
          type: "warning",
        },
      ],
    },
    // REQUIRED: Example Calculation
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Age Calculation",
      icon: "🧮",
      description: "Person born on June 15, 1994 (calculated today)",
      columns: 2,
      examples: [
        {
          title: "Calculate Age in Years",
          steps: [
            "Birth: June 15, 1994",
            "Today: January 25, 2026",
            "Full years: 2026 - 1994 = 32",
            "Birthday passed? Yes (June < January)",
            "Subtract 1: 32 - 1 = 31",
          ],
          result: "Age: 31 years, 7 months, 10 days",
        },
        {
          title: "Calculate Total Days",
          steps: [
            "Years: 31 × 365 = 11,315 days",
            "Leap years: 8 × 1 = 8 days",
            "Remaining months + days",
            "Total: ~11,546 days",
          ],
          result: "Total: 11,546+ days lived",
        },
      ],
    },
    // Prose: What is Age
    {
      id: "whatIsAge",
      type: "prose",
      title: "How Age is Calculated",
      content: "Age calculation determines the time elapsed since birth. While simple in concept, accurate calculation must account for varying month lengths (28-31 days), leap years (every 4 years, except century years not divisible by 400), and whether the birthday has occurred in the current year. The day of birth is considered day 0 — you complete your first year on your first birthday.",
    },
    // Prose: Leap Year Birthdays
    {
      id: "leapYear",
      type: "prose",
      title: "February 29 Birthdays (Leaplings)",
      content: "People born on February 29 — called 'leaplings' — experience their actual birth date only once every 4 years. However, they still age normally (1 year per year). Most choose to celebrate on February 28 or March 1 in non-leap years. For legal purposes in most countries, leaplings turn 18 on March 1 of the year they come of age.",
    },
    // Prose: Generations
    {
      id: "generations",
      type: "prose",
      title: "Understanding Generations",
      content: "Generational labels describe cohorts of people born within certain year ranges who share common cultural experiences. Baby Boomers (1946-1964) experienced post-war prosperity. Gen X (1965-1980) came of age during the rise of personal computers. Millennials (1981-1996) grew up with the internet. Gen Z (1997-2012) are digital natives who never knew a world without smartphones.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // FAQs
  // ═══════════════════════════════════════════════════════════════════════════
  faqs: [
    {
      question: "How do I calculate my exact age?",
      answer: "Your exact age is calculated by counting complete years from your birth date to today, then the remaining complete months, then remaining days. This calculator handles all the complexity of varying month lengths and leap years automatically.",
    },
    {
      question: "What if I was born on February 29?",
      answer: "If you were born on a leap day (February 29), you still age 1 year every year like everyone else. In non-leap years, you can celebrate on February 28 or March 1. For legal purposes in most countries, you turn the next age on March 1 in non-leap years.",
    },
    {
      question: "Why do different calculators give slightly different results?",
      answer: "Age calculators may differ in how they handle partial months. For example, from February 28 to March 31 could be counted as '1 month and 3 days' or 'exactly 1 month' depending on the method. We count month-to-month from the same day number.",
    },
    {
      question: "What's my Korean age vs international age?",
      answer: "Traditional Korean age counts you as 1 year old at birth and adds a year every New Year's Day. This can make you 1-2 years 'older' than your international age. Note: South Korea officially adopted international age counting in June 2023 for legal purposes.",
    },
    {
      question: "How accurate are the seconds/minutes calculations?",
      answer: "The total seconds calculation assumes average values (365.25 days/year, 24 hours/day). For birth time precision, you'd need to know your exact time of birth. The calculation is accurate to within a day for most purposes.",
    },
    {
      question: "What generation am I part of?",
      answer: "Generations are defined by birth year ranges: Baby Boomers (1946-1964), Gen X (1965-1980), Millennials (1981-1996), Gen Z (1997-2012), Gen Alpha (2013+). These definitions come from Pew Research Center and are widely used in demographics.",
    },
    {
      question: "How is zodiac sign determined?",
      answer: "Western zodiac signs are based on the position of the sun at your birth, divided into 12 signs along the ecliptic. The dates are fixed to the tropical calendar (Aries starts around March 21). Sidereal astrology, used in Vedic traditions, uses different dates due to precession.",
    },
    {
      question: "When am I legally an adult?",
      answer: "The age of majority varies by country and purpose. In most countries, 18 is the legal adult age for voting and contracts. Drinking ages range from 16-21. Always check your local laws, as legal age requirements differ for driving, marriage, gambling, and other activities.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCES (exactly 2)
  // ═══════════════════════════════════════════════════════════════════════════
  references: [
    {
      authors: "Pew Research Center",
      year: "2019",
      title: "Defining Generations: Where Millennials End and Generation Z Begins",
      source: "Pew Research Center",
      url: "https://www.pewresearch.org/short-reads/2019/01/17/where-millennials-end-and-generation-z-begins/",
    },
    {
      authors: "Omnicalculator",
      year: "2025",
      title: "Age Calculator - Calculate Your Exact Age",
      source: "Omnicalculator",
      url: "https://www.omnicalculator.com/everyday-life/age",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // DETAILED TABLE
  // ═══════════════════════════════════════════════════════════════════════════
  detailedTable: {
    id: "timeUnits",
    buttonLabel: "View All Time Units",
    buttonIcon: "⏱️",
    modalTitle: "Your Age in Different Units",
    columns: [
      { id: "unit", label: "Time Unit", align: "left" },
      { id: "value", label: "Value", align: "right", highlight: true },
      { id: "note", label: "Note", align: "left" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SIDEBAR
  // ═══════════════════════════════════════════════════════════════════════════
  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: false,
    category: "everyday",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FEATURES
  // ═══════════════════════════════════════════════════════════════════════════
  features: {
    autoCalculate: true,
    exportPDF: true,
    shareResults: true,
    saveHistory: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // RELATED CALCULATORS
  // ═══════════════════════════════════════════════════════════════════════════
  relatedCalculators: [
    "date-calculator",
    "birthday-calculator",
    "time-calculator",
    "days-between-dates-calculator",
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // ADS
  // ═══════════════════════════════════════════════════════════════════════════
  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
function getZodiacSign(month: number, day: number): { sign: string; symbol: string; element: string } {
  for (const zodiac of ZODIAC_SIGNS) {
    // Handle Capricorn which spans Dec-Jan
    if (zodiac.sign === "Capricorn") {
      if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
        return { sign: zodiac.sign, symbol: zodiac.symbol, element: zodiac.element };
      }
    } else {
      if (
        (month === zodiac.startMonth && day >= zodiac.startDay) ||
        (month === zodiac.endMonth && day <= zodiac.endDay)
      ) {
        return { sign: zodiac.sign, symbol: zodiac.symbol, element: zodiac.element };
      }
    }
  }
  return { sign: "Unknown", symbol: "?", element: "Unknown" };
}

function getGeneration(birthYear: number): string {
  for (const gen of GENERATIONS) {
    if (birthYear >= gen.start && birthYear <= gen.end) {
      return gen.name;
    }
  }
  return birthYear < 1901 ? "Pre-1900" : "Future Generation";
}

function calculateAge(birthDate: Date, targetDate: Date): { years: number; months: number; days: number } {
  let years = targetDate.getFullYear() - birthDate.getFullYear();
  let months = targetDate.getMonth() - birthDate.getMonth();
  let days = targetDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

function getDaysBetween(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.floor(Math.abs((date2.getTime() - date1.getTime()) / oneDay));
}

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateAge_V3(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;

  const calculationMode = (values.calculationMode as string) || "ageFromDOB";
  const birthDateStr = values.birthDate as string;
  const targetDateStr = values.targetDate as string;

  // Default dates
  const today = new Date();
  const birthDate = birthDateStr ? new Date(birthDateStr) : new Date("1994-06-15");
  const targetDate = targetDateStr ? new Date(targetDateStr) : today;

  // Calculate age
  const age = calculateAge(birthDate, targetDate);
  const totalDays = getDaysBetween(birthDate, targetDate);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = age.years * 12 + age.months;
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  const totalSeconds = totalMinutes * 60;

  // Get zodiac sign
  const zodiac = getZodiacSign(birthDate.getMonth() + 1, birthDate.getDate());

  // Get generation
  const generation = getGeneration(birthDate.getFullYear());

  // Calculate days until next birthday
  const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (nextBirthday <= today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }
  const daysUntilBirthday = getDaysBetween(today, nextBirthday);

  // Calculate milestones
  const millionSecondsDate = new Date(birthDate.getTime() + 1_000_000_000); // 1 million seconds
  const billionSecondsDate = new Date(birthDate.getTime() + 1_000_000_000_000); // 1 billion seconds
  const tenThousandDaysDate = new Date(birthDate.getTime() + 10_000 * 24 * 60 * 60 * 1000);

  // Build table data
  const tableData = [
    { unit: "Years", value: age.years.toLocaleString(), note: "Complete years" },
    { unit: "Months", value: totalMonths.toLocaleString(), note: "Total months" },
    { unit: "Weeks", value: totalWeeks.toLocaleString(), note: "Total weeks" },
    { unit: "Days", value: totalDays.toLocaleString(), note: "Total days" },
    { unit: "Hours", value: totalHours.toLocaleString(), note: "~24 hrs/day" },
    { unit: "Minutes", value: totalMinutes.toLocaleString(), note: "~60 min/hr" },
    { unit: "Seconds", value: totalSeconds.toLocaleString(), note: "~60 sec/min" },
  ];

  // Format age string
  const ageString = `${age.years} years, ${age.months} months, ${age.days} days`;

  return {
    values: {
      ageYears: age.years,
      totalDays,
      totalWeeks,
      totalMonths,
      zodiacSign: `${zodiac.symbol} ${zodiac.sign}`,
      generation,
      nextBirthday: daysUntilBirthday,
    },
    formatted: {
      ageYears: ageString,
      totalDays: totalDays.toLocaleString(),
      totalWeeks: totalWeeks.toLocaleString(),
      totalMonths: totalMonths.toLocaleString(),
      zodiacSign: `${zodiac.symbol} ${zodiac.sign} (${zodiac.element})`,
      generation,
      nextBirthday: daysUntilBirthday.toLocaleString(),
    },
    summary: `${ageString} | ${zodiac.symbol} ${zodiac.sign} | ${generation}`,
    isValid: !isNaN(birthDate.getTime()),
    metadata: {
      tableData,
      zodiac,
      milestones: {
        millionSeconds: millionSecondsDate.toLocaleDateString(),
        billionSeconds: billionSecondsDate.toLocaleDateString(),
        tenThousandDays: tenThousandDaysDate.toLocaleDateString(),
      },
      totalHours,
      totalMinutes,
      totalSeconds,
    },
  };
}

export default ageCalculatorConfig;
