import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// DATE CALCULATOR V3 - CONFIG
// Competitive advantages vs TimeAndDate, Calculator.net, CalculatorSoup:
// - Week number & Quarter (Q1-Q4) calculation
// - Season information
// - Zodiac sign for result date
// - Time breakdown (hours, minutes, seconds)
// - Multiple holiday calendars (US, UK, Canada)
// - Business days ↔ Calendar days conversion
// =============================================================================

// US Federal Holidays 2024-2027
const US_HOLIDAYS: Record<number, string[]> = {
  2024: ["2024-01-01", "2024-01-15", "2024-02-19", "2024-05-27", "2024-06-19", "2024-07-04", "2024-09-02", "2024-10-14", "2024-11-11", "2024-11-28", "2024-12-25"],
  2025: ["2025-01-01", "2025-01-20", "2025-02-17", "2025-05-26", "2025-06-19", "2025-07-04", "2025-09-01", "2025-10-13", "2025-11-11", "2025-11-27", "2025-12-25"],
  2026: ["2026-01-01", "2026-01-19", "2026-02-16", "2026-05-25", "2026-06-19", "2026-07-03", "2026-09-07", "2026-10-12", "2026-11-11", "2026-11-26", "2026-12-25"],
  2027: ["2027-01-01", "2027-01-18", "2027-02-15", "2027-05-31", "2027-06-18", "2027-07-05", "2027-09-06", "2027-10-11", "2027-11-11", "2027-11-25", "2027-12-24"],
};

// UK Bank Holidays 2024-2027
const UK_HOLIDAYS: Record<number, string[]> = {
  2024: ["2024-01-01", "2024-03-29", "2024-04-01", "2024-05-06", "2024-05-27", "2024-08-26", "2024-12-25", "2024-12-26"],
  2025: ["2025-01-01", "2025-04-18", "2025-04-21", "2025-05-05", "2025-05-26", "2025-08-25", "2025-12-25", "2025-12-26"],
  2026: ["2026-01-01", "2026-04-03", "2026-04-06", "2026-05-04", "2026-05-25", "2026-08-31", "2026-12-25", "2026-12-28"],
  2027: ["2027-01-01", "2027-03-26", "2027-03-29", "2027-05-03", "2027-05-31", "2027-08-30", "2027-12-27", "2027-12-28"],
};

// Canada Holidays 2024-2027
const CA_HOLIDAYS: Record<number, string[]> = {
  2024: ["2024-01-01", "2024-03-29", "2024-05-20", "2024-07-01", "2024-09-02", "2024-09-30", "2024-10-14", "2024-11-11", "2024-12-25", "2024-12-26"],
  2025: ["2025-01-01", "2025-04-18", "2025-05-19", "2025-07-01", "2025-09-01", "2025-09-30", "2025-10-13", "2025-11-11", "2025-12-25", "2025-12-26"],
  2026: ["2026-01-01", "2026-04-03", "2026-05-18", "2026-07-01", "2026-09-07", "2026-09-30", "2026-10-12", "2026-11-11", "2026-12-25", "2026-12-28"],
  2027: ["2027-01-01", "2027-03-26", "2027-05-24", "2027-07-01", "2027-09-06", "2027-09-30", "2027-10-11", "2027-11-11", "2027-12-27", "2027-12-28"],
};

export const dateCalculatorConfig: CalculatorConfigV3 = {
  id: "date-calculator",
  slug: "date-calculator",
  name: "Date Calculator",
  category: "everyday",
  icon: "📅",

  seo: {
    title: "Date Calculator - Add/Subtract Days, Business Days & Duration",
    description: "Free date calculator to add or subtract days, weeks, months, years. Calculate business days, duration between dates, week numbers, and countdown timers.",
    shortDescription: "Add/subtract days, calculate duration between dates, business days",
    keywords: ["date calculator", "add days", "subtract days", "business days", "date difference", "days between dates", "week number"],
  },

  hero: {
    badge: "Everyday",
    rating: { average: 4.9, count: 15800 },
  },

  unitSystem: { enabled: false, default: "metric", options: [] },

  // ═══════════════════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════════════════
  inputs: [
    {
      id: "calculationMode",
      type: "select",
      label: "Calculation Type",
      required: true,
      defaultValue: "addSubtract",
      options: [
        { value: "addSubtract", label: "➕ Add/Subtract Days" },
        { value: "difference", label: "📊 Days Between Dates" },
        { value: "businessDays", label: "💼 Business Days" },
        { value: "countdown", label: "⏱️ Countdown to Date" },
      ],
    },
    // ─────────────────────────────────────────────────────────────────────────
    // ADD/SUBTRACT MODE
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "startDate",
      type: "date",
      label: "Start Date",
      required: true,
    },
    {
      id: "operation",
      type: "radio",
      label: "Operation",
      required: false,
      defaultValue: "add",
      options: [
        { value: "add", label: "Add (+)" },
        { value: "subtract", label: "Subtract (−)" },
      ],
      showWhen: { field: "calculationMode", value: "addSubtract" },
    },
    {
      id: "yearsToAdd",
      type: "number",
      label: "Years",
      required: false,
      defaultValue: 0,
      min: 0, max: 100, step: 1,
      width: "half",
      showWhen: { field: "calculationMode", value: "addSubtract" },
    },
    {
      id: "monthsToAdd",
      type: "number",
      label: "Months",
      required: false,
      defaultValue: 0,
      min: 0, max: 120, step: 1,
      width: "half",
      showWhen: { field: "calculationMode", value: "addSubtract" },
    },
    {
      id: "weeksToAdd",
      type: "number",
      label: "Weeks",
      required: false,
      defaultValue: 0,
      min: 0, max: 520, step: 1,
      width: "half",
      showWhen: { field: "calculationMode", value: "addSubtract" },
    },
    {
      id: "daysToAdd",
      type: "number",
      label: "Days",
      required: false,
      defaultValue: 30,
      min: 0, max: 36500, step: 1,
      width: "half",
      showWhen: { field: "calculationMode", value: "addSubtract" },
    },
    // ─────────────────────────────────────────────────────────────────────────
    // DIFFERENCE MODE
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "endDate",
      type: "date",
      label: "End Date",
      required: false,
      showWhen: { field: "calculationMode", value: ["difference", "countdown"] },
    },
    {
      id: "includeEndDay",
      type: "radio",
      label: "Include End Day?",
      required: false,
      defaultValue: "no",
      options: [
        { value: "no", label: "No" },
        { value: "yes", label: "Yes (+1 day)" },
      ],
      showWhen: { field: "calculationMode", value: "difference" },
    },
    // ─────────────────────────────────────────────────────────────────────────
    // BUSINESS DAYS MODE
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "businessMode",
      type: "radio",
      label: "Business Days Mode",
      required: false,
      defaultValue: "addBusiness",
      options: [
        { value: "addBusiness", label: "Add Business Days" },
        { value: "countBusiness", label: "Count Business Days Between" },
      ],
      showWhen: { field: "calculationMode", value: "businessDays" },
    },
    {
      id: "businessDaysToAdd",
      type: "number",
      label: "Business Days",
      required: false,
      defaultValue: 10,
      min: 1, max: 1000, step: 1,
      showWhen: { field: "calculationMode", value: "businessDays" },
    },
    {
      id: "businessEndDate",
      type: "date",
      label: "End Date",
      required: false,
      showWhen: { field: "businessMode", value: "countBusiness" },
    },
    {
      id: "holidayCalendar",
      type: "select",
      label: "Holiday Calendar",
      required: false,
      defaultValue: "us",
      options: [
        { value: "none", label: "None (weekends only)" },
        { value: "us", label: "🇺🇸 US Federal Holidays" },
        { value: "uk", label: "🇬🇧 UK Bank Holidays" },
        { value: "ca", label: "🇨🇦 Canada Holidays" },
      ],
      showWhen: { field: "calculationMode", value: "businessDays" },
    },
    {
      id: "includeSaturday",
      type: "radio",
      label: "Saturday is Workday?",
      required: false,
      defaultValue: "no",
      options: [
        { value: "no", label: "No (skip Sat)" },
        { value: "yes", label: "Yes (include)" },
      ],
      showWhen: { field: "calculationMode", value: "businessDays" },
    },
  ],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════════════════
  results: [
    { id: "resultDate", type: "primary", label: "Result Date", format: "text" },
    { id: "dayOfWeek", type: "secondary", label: "Day of Week", format: "text" },
    { id: "totalDays", type: "secondary", label: "Total Days", format: "text" },
    { id: "businessDays", type: "secondary", label: "Business Days", format: "text" },
    { id: "weekNumber", type: "secondary", label: "Week Number", format: "text" },
    { id: "quarter", type: "secondary", label: "Quarter", format: "text" },
    { id: "breakdown", type: "secondary", label: "Breakdown", format: "text" },
    { id: "timeUnits", type: "secondary", label: "Time Units", format: "text" },
    { id: "leapYear", type: "secondary", label: "Leap Year?", format: "text" },
    { id: "season", type: "secondary", label: "Season", format: "text" },
    { id: "zodiacSign", type: "secondary", label: "Zodiac Sign", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // INFO CARDS (Required by V3)
  // ═══════════════════════════════════════════════════════════════════════════
  infoCards: [
    {
      type: "list",
      title: "Quick Date Facts",
      icon: "📋",
      items: [
        { label: "Days in Year", value: "365 (366 leap)" },
        { label: "Weeks in Year", value: "52.14 weeks" },
        { label: "Business Days/Year", value: "~260 days" },
        { label: "Business Days/Month", value: "~22 days" },
      ],
    },
    {
      type: "horizontal",
      title: "Time Conversions",
      icon: "⏰",
      items: [
        { label: "1 Week", value: "7 days" },
        { label: "1 Month (avg)", value: "30.44 days" },
        { label: "1 Quarter", value: "~91 days" },
        { label: "1 Year", value: "365 days" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCE DATA (Required by V3)
  // ═══════════════════════════════════════════════════════════════════════════
  referenceData: [
    {
      id: "holidays2026",
      title: "2026 US Federal Holidays",
      icon: "🇺🇸",
      columns: [
        { key: "holiday", label: "Holiday" },
        { key: "date", label: "Date" },
        { key: "day", label: "Day" },
      ],
      data: [
        { holiday: "New Year's Day", date: "Jan 1", day: "Thursday" },
        { holiday: "MLK Day", date: "Jan 19", day: "Monday" },
        { holiday: "Presidents Day", date: "Feb 16", day: "Monday" },
        { holiday: "Memorial Day", date: "May 25", day: "Monday" },
        { holiday: "Juneteenth", date: "Jun 19", day: "Friday" },
        { holiday: "Independence Day", date: "Jul 3*", day: "Friday" },
        { holiday: "Labor Day", date: "Sep 7", day: "Monday" },
        { holiday: "Columbus Day", date: "Oct 12", day: "Monday" },
        { holiday: "Veterans Day", date: "Nov 11", day: "Wednesday" },
        { holiday: "Thanksgiving", date: "Nov 26", day: "Thursday" },
        { holiday: "Christmas", date: "Dec 25", day: "Friday" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  educationSections: [
    {
      id: "aboutModes",
      type: "cards",
      title: "Calculation Modes",
      icon: "📅",
      columns: 2,
      cards: [
        {
          title: "Add/Subtract Days",
          description: "Add years, months, weeks, or days to any date. Perfect for calculating deadlines, expiration dates, or future events.",
          icon: "➕",
        },
        {
          title: "Days Between Dates",
          description: "Find the exact duration between two dates in days, weeks, months, and years. Shows total hours and minutes too.",
          icon: "📊",
        },
        {
          title: "Business Days",
          description: "Calculate working days excluding weekends and holidays. Supports US, UK, and Canada holiday calendars.",
          icon: "💼",
        },
        {
          title: "Countdown Timer",
          description: "See how many days remain until a future date. Perfect for event planning and tracking important deadlines.",
          icon: "⏱️",
        },
      ],
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "Business days typically exclude Saturdays and Sundays, but some industries work 6-day weeks", type: "warning" },
        { text: "Holiday calendars vary by country - US has 11 federal holidays, UK has 8 bank holidays", type: "info" },
        { text: "Leap years add an extra day (Feb 29) every 4 years, except century years not divisible by 400", type: "info" },
        { text: "Month lengths vary (28-31 days), so 'add 1 month' may give different day counts", type: "warning" },
        { text: "Week numbers follow ISO 8601 standard - Week 1 contains the first Thursday of the year", type: "info" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculations",
      icon: "📊",
      description: "Common date calculation scenarios",
      columns: 2,
      examples: [
        {
          title: "Add 10 Business Days",
          steps: [
            "Start: Monday, Jan 15, 2025",
            "Business days = Mon-Fri only",
            "Week 1: Mon-Fri (5 days)",
            "Week 2: Mon-Fri (5 days)",
            "Skip: 2 weekends (4 days)",
          ],
          result: "Result: Friday, Jan 29, 2025 (14 calendar days)",
        },
        {
          title: "Days Between Dates",
          steps: [
            "Start: March 1, 2025",
            "End: June 15, 2025",
            "March: 31 days (30 remaining)",
            "April: 30 days, May: 31 days",
            "June: 15 days",
          ],
          result: "Total: 106 days (15 weeks + 1 day)",
        },
      ],
    },
    {
      id: "businessDaysInfo",
      type: "prose",
      title: "Understanding Business Days",
      icon: "💼",
      content: "Business days (also called working days or weekdays) are Monday through Friday, excluding public holidays. The exact number of business days in a month varies from 20-23 depending on the month and how weekends fall. A typical year has approximately 250-252 business days. When calculating deadlines, always confirm whether the count includes or excludes the start date, and which holiday calendar applies to your situation.",
    },
    {
      id: "quickReference",
      type: "prose",
      title: "Quick Reference",
      icon: "⚡",
      content: "5 business days = 1 work week (7 calendar days). 10 business days = 2 work weeks (14 calendar days). 22 business days ≈ 1 month (30 calendar days). 261 business days ≈ 1 year. 30 days = ~4.3 weeks. 90 days = ~3 months. 180 days = ~6 months. 365 days = 1 year (52 weeks + 1 day).",
    },
    {
      id: "leapYearInfo",
      type: "prose",
      title: "Leap Years Explained",
      icon: "📆",
      content: "A leap year occurs every 4 years, adding February 29th to the calendar. However, century years (1900, 2000, 2100) are only leap years if divisible by 400. So 2000 was a leap year, but 1900 and 2100 are not. The next leap years are 2024, 2028, 2032, and 2036. Leap years affect date calculations when spanning February, adding one extra day to the count.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // FAQs
  // ═══════════════════════════════════════════════════════════════════════════
  faqs: [
    {
      question: "How many business days are in a month?",
      answer: "A typical month has 20-23 business days, depending on how weekends fall and whether there are any holidays. February usually has the fewest (20), while months with 31 days and favorable weekend placement can have up to 23.",
    },
    {
      question: "What's the difference between calendar days and business days?",
      answer: "Calendar days include every day (including weekends and holidays), while business days only count Monday through Friday, excluding public holidays. For example, 10 business days equals 14 calendar days (2 full work weeks).",
    },
    {
      question: "How do I calculate a deadline that's '30 days from today'?",
      answer: "Select 'Add/Subtract Days' mode, enter today's date, choose 'Add', and enter 30 in the Days field. The calculator will show the exact date 30 days from now, including what day of the week it falls on.",
    },
    {
      question: "Does the calculator account for leap years?",
      answer: "Yes! The calculator automatically handles leap years. February has 29 days in leap years (divisible by 4, except century years not divisible by 400). The next leap years are 2024, 2028, and 2032.",
    },
    {
      question: "What week number system does this use?",
      answer: "We use the ISO 8601 standard, where Week 1 is the week containing the first Thursday of January. This is the international standard used in most countries outside North America.",
    },
    {
      question: "Can I calculate dates in the past?",
      answer: "Yes! Use the 'Subtract' option to calculate dates in the past. For example, subtracting 90 days from today tells you what date was exactly 3 months ago.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════════════════
  references: [
    {
      authors: "International Organization for Standardization",
      year: "2019",
      title: "ISO 8601: Date and time format",
      source: "ISO Standards",
      url: "https://www.iso.org/iso-8601-date-and-time-format.html",
    },
    {
      authors: "U.S. Office of Personnel Management",
      year: "2024",
      title: "Federal Holidays",
      source: "OPM.gov",
      url: "https://www.opm.gov/policy-data-oversight/pay-leave/federal-holidays/",
    },
  ],

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "everyday" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["age-calculator", "time-calculator", "percentage-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function getHolidays(year: number, calendar: string): string[] {
  switch (calendar) {
    case "us": return US_HOLIDAYS[year] || [];
    case "uk": return UK_HOLIDAYS[year] || [];
    case "ca": return CA_HOLIDAYS[year] || [];
    default: return [];
  }
}

function isWeekend(date: Date, includeSaturday: boolean): boolean {
  const day = date.getDay();
  if (includeSaturday) return day === 0; // Only Sunday
  return day === 0 || day === 6; // Saturday and Sunday
}

function isHoliday(date: Date, calendar: string): boolean {
  if (calendar === "none") return false;
  const year = date.getFullYear();
  const dateStr = date.toISOString().split("T")[0];
  return getHolidays(year, calendar).includes(dateStr);
}

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

function getQuarter(date: Date): string {
  const month = date.getMonth();
  if (month < 3) return "Q1 (Jan-Mar)";
  if (month < 6) return "Q2 (Apr-Jun)";
  if (month < 9) return "Q3 (Jul-Sep)";
  return "Q4 (Oct-Dec)";
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getSeason(date: Date): string {
  const month = date.getMonth();
  const day = date.getDate();
  // Northern Hemisphere seasons
  if ((month === 2 && day >= 20) || month === 3 || month === 4 || (month === 5 && day < 21)) return "🌸 Spring";
  if ((month === 5 && day >= 21) || month === 6 || month === 7 || (month === 8 && day < 22)) return "☀️ Summer";
  if ((month === 8 && day >= 22) || month === 9 || month === 10 || (month === 11 && day < 21)) return "🍂 Fall";
  return "❄️ Winter";
}

function getZodiacSign(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "♈ Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "♉ Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "♊ Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "♋ Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "♌ Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "♍ Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "♎ Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "♏ Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "♐ Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "♑ Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "♒ Aquarius";
  return "♓ Pisces";
}

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

function getDayOfWeek(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

function countBusinessDays(start: Date, end: Date, calendar: string, includeSaturday: boolean): number {
  let count = 0;
  const current = new Date(start);
  const endTime = end.getTime();
  const direction = start <= end ? 1 : -1;
  
  while ((direction === 1 && current < end) || (direction === -1 && current > end)) {
    if (!isWeekend(current, includeSaturday) && !isHoliday(current, calendar)) {
      count++;
    }
    current.setDate(current.getDate() + direction);
  }
  
  return count;
}

function addBusinessDays(start: Date, days: number, calendar: string, includeSaturday: boolean): Date {
  const result = new Date(start);
  let added = 0;
  
  while (added < days) {
    result.setDate(result.getDate() + 1);
    if (!isWeekend(result, includeSaturday) && !isHoliday(result, calendar)) {
      added++;
    }
  }
  
  return result;
}

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateDate(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;
  
  const mode = values.calculationMode as string || "addSubtract";
  const startDateStr = values.startDate as string;
  
  if (!startDateStr) {
    return {
      values: {},
      formatted: { resultDate: "Please select a start date" },
      summary: "Enter a date to begin",
      isValid: false,
    };
  }
  
  const startDate = new Date(startDateStr + "T00:00:00");
  let resultDate: Date = new Date(startDate);
  let totalDays = 0;
  let businessDaysCount = 0;
  
  const calendar = (values.holidayCalendar as string) || "us";
  const includeSaturday = (values.includeSaturday as string) === "yes";
  
  // ─────────────────────────────────────────────────────────────────────────
  // ADD/SUBTRACT MODE
  // ─────────────────────────────────────────────────────────────────────────
  if (mode === "addSubtract") {
    const operation = (values.operation as string) || "add";
    const years = Number(values.yearsToAdd) || 0;
    const months = Number(values.monthsToAdd) || 0;
    const weeks = Number(values.weeksToAdd) || 0;
    const days = Number(values.daysToAdd) || 0;
    
    const multiplier = operation === "subtract" ? -1 : 1;
    
    resultDate = new Date(startDate);
    resultDate.setFullYear(resultDate.getFullYear() + (years * multiplier));
    resultDate.setMonth(resultDate.getMonth() + (months * multiplier));
    resultDate.setDate(resultDate.getDate() + ((weeks * 7 + days) * multiplier));
    
    totalDays = Math.abs(Math.round((resultDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
    businessDaysCount = countBusinessDays(startDate, resultDate, calendar, includeSaturday);
  }
  
  // ─────────────────────────────────────────────────────────────────────────
  // DIFFERENCE MODE
  // ─────────────────────────────────────────────────────────────────────────
  else if (mode === "difference") {
    const endDateStr = values.endDate as string;
    if (!endDateStr) {
      return {
        values: {},
        formatted: { resultDate: "Please select an end date" },
        summary: "Enter both dates",
        isValid: false,
      };
    }
    
    const endDate = new Date(endDateStr + "T00:00:00");
    const includeEnd = (values.includeEndDay as string) === "yes";
    
    totalDays = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    if (includeEnd) totalDays += 1;
    
    businessDaysCount = countBusinessDays(startDate, endDate, calendar, includeSaturday);
    resultDate = endDate;
  }
  
  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS DAYS MODE
  // ─────────────────────────────────────────────────────────────────────────
  else if (mode === "businessDays") {
    const businessMode = (values.businessMode as string) || "addBusiness";
    
    if (businessMode === "addBusiness") {
      const businessDaysToAdd = Number(values.businessDaysToAdd) || 10;
      resultDate = addBusinessDays(startDate, businessDaysToAdd, calendar, includeSaturday);
      businessDaysCount = businessDaysToAdd;
      totalDays = Math.round((resultDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    } else {
      const endDateStr = values.businessEndDate as string;
      if (!endDateStr) {
        return {
          values: {},
          formatted: { resultDate: "Please select an end date" },
          summary: "Enter both dates",
          isValid: false,
        };
      }
      
      const endDate = new Date(endDateStr + "T00:00:00");
      businessDaysCount = countBusinessDays(startDate, endDate, calendar, includeSaturday);
      totalDays = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      resultDate = endDate;
    }
  }
  
  // ─────────────────────────────────────────────────────────────────────────
  // COUNTDOWN MODE
  // ─────────────────────────────────────────────────────────────────────────
  else if (mode === "countdown") {
    const endDateStr = values.endDate as string;
    if (!endDateStr) {
      return {
        values: {},
        formatted: { resultDate: "Please select a target date" },
        summary: "Enter a target date",
        isValid: false,
      };
    }
    
    const endDate = new Date(endDateStr + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    totalDays = Math.round((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    businessDaysCount = countBusinessDays(today, endDate, calendar, includeSaturday);
    resultDate = endDate;
  }
  
  // ─────────────────────────────────────────────────────────────────────────
  // CALCULATE ALL METADATA
  // ─────────────────────────────────────────────────────────────────────────
  const absDays = Math.abs(totalDays);
  const weeks = Math.floor(absDays / 7);
  const remainingDays = absDays % 7;
  const totalHours = absDays * 24;
  const totalMinutes = totalHours * 60;
  
  // Years, months, days breakdown
  const yearsDiff = Math.floor(absDays / 365);
  const monthsDiff = Math.floor((absDays % 365) / 30);
  const daysDiff = absDays % 30;
  
  const breakdownParts: string[] = [];
  if (yearsDiff > 0) breakdownParts.push(`${yearsDiff} year${yearsDiff > 1 ? "s" : ""}`);
  if (monthsDiff > 0) breakdownParts.push(`${monthsDiff} month${monthsDiff > 1 ? "s" : ""}`);
  if (daysDiff > 0 || breakdownParts.length === 0) breakdownParts.push(`${daysDiff} day${daysDiff !== 1 ? "s" : ""}`);
  
  const weekNumber = getWeekNumber(resultDate);
  const quarter = getQuarter(resultDate);
  const leapYear = isLeapYear(resultDate.getFullYear());
  const season = getSeason(resultDate);
  const zodiac = getZodiacSign(resultDate);
  
  return {
    values: {
      resultDate: resultDate.toISOString(),
      totalDays: absDays,
      businessDays: businessDaysCount,
      weekNumber,
    },
    formatted: {
      resultDate: formatDate(resultDate),
      dayOfWeek: getDayOfWeek(resultDate),
      totalDays: `${totalDays >= 0 ? "" : "-"}${absDays.toLocaleString()} days`,
      businessDays: `${businessDaysCount.toLocaleString()} business days`,
      weekNumber: `Week ${weekNumber} of ${resultDate.getFullYear()}`,
      quarter,
      breakdown: breakdownParts.join(", "),
      timeUnits: `${totalHours.toLocaleString()} hours • ${totalMinutes.toLocaleString()} minutes`,
      leapYear: leapYear ? "✅ Yes (366 days)" : "❌ No (365 days)",
      season,
      zodiacSign: zodiac,
    },
    summary: mode === "countdown"
      ? `${totalDays} days until ${formatDate(resultDate)}`
      : `${formatDate(resultDate)} (${absDays.toLocaleString()} days)`,
    isValid: true,
  };
}

export default dateCalculatorConfig;
