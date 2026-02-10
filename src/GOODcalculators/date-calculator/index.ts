import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

// =============================================================================
// DATE CALCULATOR - V4 Engine
// Add/subtract days, weeks, months, years + days between dates
// Following ALL rules from: ENGINE_V4_COMPLETE_GUIDE.md, RULE_WIDTH_HALF_UPDATE.md,
// KALCUFY_BUG_FIXES_REFERENCE.md
// =============================================================================

export const dateCalculatorConfig: CalculatorConfigV4 = {
  id: "date",
  version: "4.0",
  category: "everyday",
  icon: "📅",

  // ===========================================================================
  // PRESETS - ALWAYS include icon (RULE from ENGINE_V4)
  // ===========================================================================
  presets: [
    {
      id: "thirtyDays",
      icon: "📆",
      values: {
        calculationType: "addSubtract",
        operation: "add",
        daysToAdd: 30,
        weeksToAdd: 0,
        monthsToAdd: 0,
        yearsToAdd: 0,
      },
    },
    {
      id: "ninetyDays",
      icon: "📋",
      values: {
        calculationType: "addSubtract",
        operation: "add",
        daysToAdd: 90,
        weeksToAdd: 0,
        monthsToAdd: 0,
        yearsToAdd: 0,
      },
    },
    {
      id: "sixMonths",
      icon: "🗓️",
      values: {
        calculationType: "addSubtract",
        operation: "add",
        daysToAdd: 0,
        weeksToAdd: 0,
        monthsToAdd: 6,
        yearsToAdd: 0,
      },
    },
    {
      id: "oneYear",
      icon: "🎂",
      values: {
        calculationType: "addSubtract",
        operation: "add",
        daysToAdd: 0,
        weeksToAdd: 0,
        monthsToAdd: 0,
        yearsToAdd: 1,
      },
    },
  ],

  // ===========================================================================
  // TRANSLATIONS - English only (script translates later)
  // ===========================================================================
  t: {
    en: {
      name: "Date Calculator",
      slug: "date",
      subtitle:
        "Add or subtract days, weeks, months, years from any date. Calculate the difference between two dates instantly.",
      breadcrumb: "Date",

      // SEO: title 50-60 chars, description 120-155 chars, keywords 5-8
      seo: {
        title: "Date Calculator - Add & Subtract Days, Months, Years",
        description:
          "Calculate dates easily. Add or subtract days, weeks, months, years from any date. Find days between two dates with business day options.",
        shortDescription: "Add or subtract time from any date",
        keywords: [
          "date calculator",
          "add days to date",
          "subtract days from date",
          "days between dates",
          "date difference calculator",
          "business days calculator",
          "date calculator online",
          "free date calculator",
        ],
      },

      calculator: { yourInformation: "Date Settings" },
      ui: {
        yourInformation: "Date Settings",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        calculationType: {
          label: "Calculation Type",
          helpText: "Choose what you want to calculate",
          options: {
            addSubtract: "Add/Subtract from Date",
            difference: "Days Between Two Dates",
          },
        },
        startDate: {
          label: "Start Date",
          helpText: "Select the starting date",
        },
        endDate: {
          label: "End Date",
          helpText: "Select the ending date",
        },
        operation: {
          label: "Operation",
          helpText: "Add or subtract time",
          options: {
            add: "Add",
            subtract: "Subtract",
          },
        },
        daysToAdd: {
          label: "Days",
          helpText: "Number of days to add or subtract",
        },
        weeksToAdd: {
          label: "Weeks",
          helpText: "Number of weeks to add or subtract",
        },
        monthsToAdd: {
          label: "Months",
          helpText: "Number of months to add or subtract",
        },
        yearsToAdd: {
          label: "Years",
          helpText: "Number of years to add or subtract",
        },
        includeEndDate: {
          label: "Include End Date",
          helpText: "Count the end date in the total",
          options: {
            yes: "Yes",
            no: "No",
          },
        },
      },

      results: {
        resultDate: { label: "Result Date" },
        totalDays: { label: "Total Days" },
        totalWeeks: { label: "Total Weeks" },
        totalMonths: { label: "Total Months" },
        businessDays: { label: "Business Days" },
        weekendDays: { label: "Weekend Days" },
      },

      presets: {
        thirtyDays: {
          label: "+30 Days",
          description: "Add 30 days to today",
        },
        ninetyDays: {
          label: "+90 Days",
          description: "Add 90 days (quarter)",
        },
        sixMonths: {
          label: "+6 Months",
          description: "Add 6 months to date",
        },
        oneYear: {
          label: "+1 Year",
          description: "Add 1 year to date",
        },
      },

      // CRITICAL: All units/labels for calculate() - NO HARDCODING
      values: {
        "locale": "en-US",
        "days": "days",
        "day": "day",
        "weeks": "weeks",
        "week": "week",
        "months": "months",
        "month": "month",
        "years": "years",
        "year": "year",
        "businessDays": "business days",
        "weekendDays": "weekend days",
        "weekLabel": "Week",
        "and": "and",
      },

      formats: {
        summary: "{date}",
        difference: "{days} days between dates",
        dateResult: "Result: {date}",
      },

      // INFO CARDS: 2 list + 1 horizontal tips (tips ALWAYS last)
      infoCards: {
        dateResult: {
          title: "Date Result",
          items: [
            { label: "Result Date", valueKey: "resultDate" },
            { label: "Day of Week", valueKey: "dayOfWeek" },
            { label: "Week Number", valueKey: "weekNumber" },
            { label: "Quarter", valueKey: "quarter" },
          ],
        },
        breakdown: {
          title: "Time Breakdown",
          items: [
            { label: "Total Days", valueKey: "totalDays" },
            { label: "Business Days", valueKey: "businessDays" },
            { label: "Weekend Days", valueKey: "weekendDays" },
            { label: "Total Weeks", valueKey: "totalWeeks" },
          ],
        },
        tips: {
          title: "Quick Tips",
          items: [
            "Business days exclude Saturdays and Sundays",
            "Leap years have 366 days (Feb 29)",
            "Adding months keeps the same day when possible",
            "Use negative values to subtract time",
          ],
        },
      },

      // EDUCATION: 2 prose + 2 list + 1 code-example
      education: {
        whatIs: {
          title: "What is a Date Calculator?",
          content:
            "A date calculator is a tool that performs arithmetic operations on calendar dates. It can add or subtract days, weeks, months, and years to find future or past dates, or calculate the difference between two dates. Unlike simple counting, date calculators handle the complexities of our calendar system — varying month lengths (28-31 days), leap years every four years, and the transition between months and years. Whether you're planning project deadlines, calculating contract terms, or simply wondering what date it will be in 90 days, a date calculator provides instant, accurate answers.",
        },
        howItWorks: {
          title: "How Date Calculations Work",
          content:
            "Date calculations follow the rules of the Gregorian calendar, which we use today. When adding months, the calculator moves forward by that many months while keeping the same day number (if possible). For example, January 31 + 1 month = February 28 (or 29 in leap years), since February doesn't have 31 days. When adding days, it simply counts forward through the calendar, accounting for different month lengths. Leap years occur every 4 years (except century years not divisible by 400), adding February 29. Business day calculations exclude weekends and can optionally exclude holidays.",
        },
        useCases: {
          title: "Common Use Cases",
          items: [
            { text: "Project deadlines: Add business days to a start date", type: "info" },
            { text: "Contract terms: Calculate 30, 60, or 90 days from signing", type: "info" },
            { text: "Warranty expiration: Add 1-2 years to purchase date", type: "info" },
            { text: "Age calculation: Days between birth date and today", type: "info" },
            { text: "Event planning: Count days until a specific date", type: "warning" },
            { text: "Medical tracking: Calculate days since last appointment", type: "warning" },
          ],
        },
        calendarFacts: {
          title: "Calendar Facts",
          items: [
            { text: "A year has 365 days (366 in leap years)", type: "info" },
            { text: "Months have 28, 29, 30, or 31 days", type: "info" },
            { text: "A week always has 7 days", type: "info" },
            { text: "Leap years: divisible by 4, except century years unless divisible by 400", type: "info" },
            { text: "Business days typically exclude Saturday and Sunday", type: "info" },
            { text: "ISO week 1 contains January 4th", type: "info" },
          ],
        },
        examples: {
          title: "Step-by-Step Examples",
          description: "Common date calculations explained",
          examples: [
            {
              title: "Add 90 days to March 15, 2024",
              steps: [
                "March has 31 days, so 31-15 = 16 days left",
                "April has 30 days: 16+30 = 46 days",
                "May has 31 days: 46+31 = 77 days",
                "June needs 90-77 = 13 more days",
              ],
              result: "June 13, 2024",
            },
            {
              title: "Days between Jan 1 and Mar 15, 2024",
              steps: [
                "January: 31 days (minus Jan 1 = 30)",
                "February 2024 (leap year): 29 days",
                "March 1-15: 15 days",
                "Total: 30 + 29 + 15 = 74 days",
              ],
              result: "74 days",
            },
          ],
        },
      },

      // FAQs: 6+ required
      faqs: [
        {
          question: "How do I calculate a date 30 days from now?",
          answer:
            "Select 'Add/Subtract from Date', choose today as your start date, select 'Add', enter 30 in the Days field, and click Calculate. The result will show the date exactly 30 days in the future.",
        },
        {
          question: "How do I find the number of days between two dates?",
          answer:
            "Select 'Days Between Two Dates' as the calculation type, enter your start date and end date, then click Calculate. You'll see the total days, weeks, and business days between the dates.",
        },
        {
          question: "What are business days?",
          answer:
            "Business days (also called working days or weekdays) are Monday through Friday, excluding Saturday and Sunday. Some calculations also exclude public holidays. Business day counts are commonly used for shipping estimates, contract terms, and project planning.",
        },
        {
          question: "How does adding months work when the day doesn't exist?",
          answer:
            "When adding months would result in an invalid date (like January 31 + 1 month), the calculator uses the last valid day of that month. So January 31 + 1 month = February 28 (or 29 in leap years).",
        },
        {
          question: "What is a leap year and how does it affect calculations?",
          answer:
            "A leap year has 366 days instead of 365, with February having 29 days instead of 28. Leap years occur every 4 years, except for century years (1900, 2100) unless divisible by 400 (2000, 2400). The calculator automatically handles leap years.",
        },
        {
          question: "How do I subtract time from a date?",
          answer:
            "Select 'Add/Subtract from Date', choose your start date, select 'Subtract' as the operation, enter the days/weeks/months/years you want to subtract, and click Calculate. The result shows the past date.",
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
      accessibility: {
        mobileResults: "Results",
        closeModal: "Close",
        openMenu: "Menu",
      },
      sources: { title: "Sources & References" },
    },
  },

  // ===========================================================================
  // INPUTS - Smart Defaults: defaultValue for non-sensitive fields
  // ===========================================================================
  inputs: [
    {
      id: "calculationType",
      type: "select",
      defaultValue: "addSubtract",
      options: [
        { value: "addSubtract" },
        { value: "difference" },
      ],
    },
    // Start date - for both modes
    {
      id: "startDate",
      type: "date",
      defaultValue: null, // Will be set to today by engine
    },
    // End date - only for difference mode
    {
      id: "endDate",
      type: "date",
      defaultValue: null,
      showWhen: { field: "calculationType", value: "difference" },
    },
    // Include end date option
    {
      id: "includeEndDate",
      type: "radio",
      defaultValue: "no",
      options: [
        { value: "yes" },
        { value: "no" },
      ],
      showWhen: { field: "calculationType", value: "difference" },
    },
    // Operation - only for add/subtract mode
    {
      id: "operation",
      type: "radio",
      defaultValue: "add",
      options: [
        { value: "add" },
        { value: "subtract" },
      ],
      showWhen: { field: "calculationType", value: "addSubtract" },
    },
    // Time periods to add/subtract
    {
      id: "daysToAdd",
      type: "number",
      defaultValue: 0,
      placeholder: "0",
      min: 0,
      max: 36500,
      showWhen: { field: "calculationType", value: "addSubtract" },
    },
    {
      id: "weeksToAdd",
      type: "number",
      defaultValue: 0,
      placeholder: "0",
      min: 0,
      max: 5200,
      showWhen: { field: "calculationType", value: "addSubtract" },
    },
    {
      id: "monthsToAdd",
      type: "number",
      defaultValue: 0,
      placeholder: "0",
      min: 0,
      max: 1200,
      showWhen: { field: "calculationType", value: "addSubtract" },
    },
    {
      id: "yearsToAdd",
      type: "number",
      defaultValue: 0,
      placeholder: "0",
      min: 0,
      max: 100,
      showWhen: { field: "calculationType", value: "addSubtract" },
    },
  ],

  // EMPTY - no accordions (RULE from ENGINE_V4)
  inputGroups: [],

  // ===========================================================================
  // RESULTS
  // ===========================================================================
  results: [
    { id: "resultDate", type: "primary", format: "text" },
    { id: "totalDays", type: "secondary", format: "number" },
    { id: "businessDays", type: "secondary", format: "number" },
  ],

  // ===========================================================================
  // INFO CARDS - 2 list + 1 horizontal tips (tips ALWAYS last)
  // ===========================================================================
  infoCards: [
    { id: "dateResult", type: "list", icon: "📅", itemCount: 4 },
    { id: "breakdown", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // EMPTY - use Dual List instead (RULE from ENGINE_V4)
  referenceData: [],

  // ===========================================================================
  // EDUCATION - 2 prose + 2 list + 1 code-example (RULE from ENGINE_V4)
  // ===========================================================================
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "useCases", type: "list", icon: "📋", itemCount: 6 },
    { id: "calendarFacts", type: "list", icon: "📆", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  // ===========================================================================
  // FAQs - 6+ required (RULE from ENGINE_V4)
  // ===========================================================================
  faqs: [
    { id: "0" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
  ],

  // ===========================================================================
  // REFERENCES - 2+ required (RULE from ENGINE_V4)
  // ===========================================================================
  references: [
    {
      authors: "timeanddate.com",
      year: "2024",
      title: "Date Calculator",
      source: "Time and Date AS",
      url: "https://www.timeanddate.com/date/dateadd.html",
    },
    {
      authors: "U.S. Naval Observatory",
      year: "2024",
      title: "The Gregorian Calendar",
      source: "USNO",
      url: "https://aa.usno.navy.mil/faq/calendars",
    },
  ],

  // ===========================================================================
  // LAYOUT SECTIONS
  // ===========================================================================
  hero: {
    showBadge: true,
    showRating: true,
  },
  sidebar: {
    showTips: true,
    showRelated: true,
  },
  features: {
    showPdfExport: true,
    showSaveResults: true,
  },
  relatedCalculators: ["age", "time", "workday"],
  ads: {
    showSidebarAd: true,
    showFooterAd: true,
  },
};

// =============================================================================
// CALCULATE FUNCTION
// - Use v["key"] for ALL units - NO hardcoding
// - Handle null values from Smart Defaults
// - Return isValid: false if missing required fields
// =============================================================================

// Helper: Get day of week key for translation
const DAY_KEYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

function getDayOfWeekKey(date: Date): string {
  return DAY_KEYS[date.getDay()];
}

// Helper: Get month key for translation
const MONTH_KEYS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december"
];

function getMonthKey(date: Date): string {
  return MONTH_KEYS[date.getMonth()];
}

// Helper: Get ISO week number
function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

// Helper: Get quarter
function getQuarter(date: Date): number {
  return Math.floor(date.getMonth() / 3) + 1;
}

// Helper: Count business days between two dates
function countBusinessDays(start: Date, end: Date): number {
  let count = 0;
  const current = new Date(start);
  
  while (current <= end) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }
  
  return count;
}

// Helper: Count weekend days between two dates
function countWeekendDays(start: Date, end: Date): number {
  let count = 0;
  const current = new Date(start);
  
  while (current <= end) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }
  
  return count;
}

// Helper: Format date using locale from translations
function formatDateLocalized(date: Date, v: Record<string, string>): string {
  const locale = v["locale"] || "en-US";
  return date.toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Helper: Get day of week localized
function getDayOfWeekLocalized(date: Date, v: Record<string, string>): string {
  const locale = v["locale"] || "en-US";
  return date.toLocaleDateString(locale, { weekday: "long" });
}

// Helper: Add months (handling edge cases)
function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  const targetMonth = result.getMonth() + months;
  result.setMonth(targetMonth);
  
  // Handle month overflow (e.g., Jan 31 + 1 month should be Feb 28/29)
  if (result.getMonth() !== ((targetMonth % 12) + 12) % 12) {
    result.setDate(0); // Go to last day of previous month
  }
  
  return result;
}

export function calculateDate(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;

  // Get translations - NEVER hardcode
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const calcType = values.calculationType as string;

  // Use today if no start date
  const startDateStr = values.startDate as string | null;
  const startDate = startDateStr ? new Date(startDateStr) : new Date();
  
  // Reset time to midnight for consistent calculations
  startDate.setHours(0, 0, 0, 0);

  if (calcType === "difference") {
    // Days between two dates
    const endDateStr = values.endDate as string | null;
    
    if (!endDateStr) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }

    const endDate = new Date(endDateStr);
    endDate.setHours(0, 0, 0, 0);

    const includeEnd = values.includeEndDate === "yes";
    
    // Calculate difference
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    let totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (includeEnd) totalDays += 1;

    const totalWeeks = totalDays / 7;
    const totalMonths = totalDays / 30.44; // Average days per month

    // Determine which date is earlier for business day calculation
    const earlierDate = startDate < endDate ? startDate : endDate;
    const laterDate = startDate < endDate ? endDate : startDate;
    
    const businessDays = countBusinessDays(earlierDate, laterDate);
    const weekendDays = countWeekendDays(earlierDate, laterDate);

    // Get translated units
    const daysLabel = totalDays === 1 ? (v["day"] || "day") : (v["days"] || "days");
    const weeksLabel = v["weeks"] || "weeks";
    const businessLabel = v["businessDays"] || "business days";
    const weekendLabel = v["weekendDays"] || "weekend days";

    const summary = f.difference?.replace("{days}", totalDays.toString()) || 
      `${totalDays} ${daysLabel} between dates`;

    return {
      values: {
        totalDays,
        totalWeeks,
        totalMonths,
        businessDays,
        weekendDays,
      },
      formatted: {
        resultDate: formatDateLocalized(endDate, v),
        totalDays: `${totalDays} ${daysLabel}`,
        totalWeeks: `${totalWeeks.toFixed(1)} ${weeksLabel}`,
        businessDays: `${businessDays} ${businessLabel}`,
        weekendDays: `${weekendDays} ${weekendLabel}`,
        dayOfWeek: getDayOfWeekLocalized(endDate, v),
        weekNumber: `${v["weekLabel"] || "Week"} ${getWeekNumber(endDate)}`,
        quarter: `Q${getQuarter(endDate)}`,
      },
      summary,
      isValid: true,
    };
  } else {
    // Add/Subtract from date
    const operation = values.operation as string;
    const days = (values.daysToAdd as number) || 0;
    const weeks = (values.weeksToAdd as number) || 0;
    const months = (values.monthsToAdd as number) || 0;
    const years = (values.yearsToAdd as number) || 0;

    // Check if any time period is specified
    if (days === 0 && weeks === 0 && months === 0 && years === 0) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }

    const multiplier = operation === "subtract" ? -1 : 1;

    // Start with original date
    let resultDate = new Date(startDate);

    // Add years first
    if (years !== 0) {
      resultDate.setFullYear(resultDate.getFullYear() + (years * multiplier));
    }

    // Add months (using helper for edge cases)
    if (months !== 0) {
      resultDate = addMonths(resultDate, months * multiplier);
    }

    // Add weeks and days
    const totalDaysToAdd = (days + (weeks * 7)) * multiplier;
    if (totalDaysToAdd !== 0) {
      resultDate.setDate(resultDate.getDate() + totalDaysToAdd);
    }

    // Calculate total days difference
    const diffTime = resultDate.getTime() - startDate.getTime();
    const totalDays = Math.abs(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    // Calculate business and weekend days
    const earlierDate = startDate < resultDate ? startDate : resultDate;
    const laterDate = startDate < resultDate ? resultDate : startDate;
    const businessDays = countBusinessDays(earlierDate, laterDate);
    const weekendDays = countWeekendDays(earlierDate, laterDate);

    // Get translated units
    const daysLabel = totalDays === 1 ? (v["day"] || "day") : (v["days"] || "days");
    const weeksLabel = v["weeks"] || "weeks";
    const businessLabel = v["businessDays"] || "business days";
    const weekendLabel = v["weekendDays"] || "weekend days";

    const summary = f.dateResult?.replace("{date}", formatDateLocalized(resultDate, v)) || 
      formatDateLocalized(resultDate, v);

    return {
      values: {
        resultDate: resultDate.toISOString(),
        totalDays,
        businessDays,
        weekendDays,
      },
      formatted: {
        resultDate: formatDateLocalized(resultDate, v),
        totalDays: `${totalDays} ${daysLabel}`,
        totalWeeks: `${(totalDays / 7).toFixed(1)} ${weeksLabel}`,
        businessDays: `${businessDays} ${businessLabel}`,
        weekendDays: `${weekendDays} ${weekendLabel}`,
        dayOfWeek: getDayOfWeekLocalized(resultDate, v),
        weekNumber: `${v["weekLabel"] || "Week"} ${getWeekNumber(resultDate)}`,
        quarter: `Q${getQuarter(resultDate)}`,
      },
      summary,
      isValid: true,
    };
  }
}

export default dateCalculatorConfig;
