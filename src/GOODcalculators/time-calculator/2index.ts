import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

export const timeCalculatorConfig: CalculatorConfigV4 = {
  id: "time-calculator",
  version: "4.0",
  category: "everyday",
  icon: "⏱️",

  presets: [
    {
      id: "workday",
      icon: "💼",
      values: { mode: "add", time1: { h: 8, m: 30, s: 0 }, time2: { h: 1, m: 45, s: 0 } },
    },
    {
      id: "marathon",
      icon: "🏃",
      values: { mode: "subtract", time1: { h: 4, m: 30, s: 0 }, time2: { h: 3, m: 15, s: 45 } },
    },
    {
      id: "cooking",
      icon: "🍳",
      values: { mode: "add", time1: { h: 0, m: 45, s: 0 }, time2: { h: 0, m: 20, s: 30 } },
    },
  ],

  t: {
    en: {
      name: "Time Calculator",
      slug: "time-calculator",
      subtitle: "Add or subtract hours, minutes, and seconds. Calculate the total time or difference between two durations.",
      breadcrumb: "Time",

      seo: {
        title: "Time Calculator - Add & Subtract Hours, Minutes, Seconds",
        description: "Add or subtract time values easily. Calculate total hours, minutes, and seconds between two time durations. Free online time calculator with instant results.",
        shortDescription: "Add and subtract hours, minutes, and seconds.",
        keywords: [
          "time calculator",
          "hours minutes calculator",
          "add time",
          "subtract time",
          "time duration calculator",
          "free time calculator",
          "online time tool",
          "hours calculator",
        ],
      },

      calculator: { yourInformation: "Time Values" },
      ui: {
        yourInformation: "Time Values",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        mode: {
          label: "Operation",
          helpText: "Add or subtract time values",
          options: {
            add: "Add (+)",
            subtract: "Subtract (−)",
          },
        },
        time1: { label: "Time 1", helpText: "First time value" },
        time2: { label: "Time 2", helpText: "Second time value" },
      },

      results: {
        totalTime: { label: "Result" },
        totalSeconds: { label: "Total in Seconds" },
        totalMinutes: { label: "Total in Minutes" },
      },

      presets: {
        workday: { label: "8h 30m + 1h 45m", description: "Work shift + overtime" },
        marathon: { label: "4h 30m − 3h 15m 45s", description: "Time difference" },
        cooking: { label: "45m + 20m 30s", description: "Cooking duration" },
      },

      values: {
        "h": "h",
        "m": "m",
        "s": "s",
        "hours": "hours",
        "minutes": "minutes",
        "seconds": "seconds",
        "totalSeconds": "total seconds",
        "totalMinutes": "total minutes",
        "totalHours": "total hours",
      },

      formats: {
        summary: "Result: {result}",
      },

      infoCards: {
        metrics: {
          title: "Time Result",
          items: [
            { label: "Total Time", valueKey: "totalTime" },
            { label: "In Hours", valueKey: "decimalHours" },
            { label: "In Minutes", valueKey: "totalMinutes" },
            { label: "In Seconds", valueKey: "totalSeconds" },
          ],
        },
        details: {
          title: "Conversions",
          items: [
            { label: "Days", valueKey: "days" },
            { label: "Work Days (8h)", valueKey: "workDays" },
            { label: "Half Hours", valueKey: "halfHours" },
            { label: "Quarter Hours", valueKey: "quarterHours" },
          ],
        },
        tips: {
          title: "Time Tips",
          items: [
            "To convert minutes to hours, divide by 60: 90 minutes = 1.5 hours",
            "Military time: add 12 to PM hours — 3:30 PM = 15:30",
            "Decimal hours are useful for timesheets: 1h 45m = 1.75 hours",
            "Remember there are 3,600 seconds in one hour",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is a Time Calculator?",
          content: "A time calculator lets you add or subtract hours, minutes, and seconds to find the total duration or difference between two time values. Unlike regular math, time uses a base-60 system — 60 seconds make a minute, and 60 minutes make an hour. This can make manual calculations tricky, especially when carrying over values. For example, adding 45 minutes to 30 minutes gives 75 minutes, which should be expressed as 1 hour and 15 minutes. Time calculators handle these conversions automatically, making them essential for scheduling, payroll, cooking, sports timing, and project management.",
        },
        howItWorks: {
          title: "How Time Addition and Subtraction Work",
          content: "The simplest approach to time math is to convert everything to the smallest unit (seconds), perform the arithmetic, then convert back. To add 2 hours 45 minutes and 1 hour 30 minutes: convert both to seconds (2×3600 + 45×60 = 9,900 seconds and 1×3600 + 30×60 = 5,400 seconds), add them (15,300 seconds), then convert back: 15,300 ÷ 3600 = 4 hours remainder 300 seconds, 300 ÷ 60 = 5 minutes. Result: 4 hours 15 minutes. Subtraction works the same way but may produce negative results if the second time is larger. Decimal hours are calculated by dividing total minutes by 60 — useful for billing and timesheets.",
        },
        considerations: {
          title: "Important Notes",
          items: [
            { text: "Base-60 system: Time doesn't work like decimal numbers — 1.5 hours is 1h 30m, not 1h 50m", type: "warning" },
            { text: "Payroll rounding: Many companies round to the nearest 15 minutes for payroll purposes", type: "info" },
            { text: "Negative results: Subtracting a larger time from a smaller one gives a negative duration", type: "info" },
            { text: "Day overflow: Results exceeding 24 hours will show total hours (e.g., 26h 30m, not 1 day 2h 30m)", type: "info" },
            { text: "Time zones: This calculator works with durations, not clock times — it doesn't account for time zone differences", type: "info" },
            { text: "Leap seconds: For everyday calculations, leap seconds are negligible and safely ignored", type: "info" },
          ],
        },
        categories: {
          title: "Common Time Calculations",
          items: [
            { text: "Work hours: Add up shift times to calculate total hours worked per day or week for payroll", type: "info" },
            { text: "Cooking: Add prep time plus cook time to know when your meal will be ready", type: "info" },
            { text: "Sports: Calculate split times, pace differences, or total competition duration", type: "info" },
            { text: "Travel: Add flight duration plus layover time to determine total travel time", type: "info" },
            { text: "Project management: Sum task durations to estimate total project timeline", type: "info" },
            { text: "Music/Media: Calculate total playlist or video duration by adding individual lengths", type: "info" },
          ],
        },
        examples: {
          title: "Step-by-Step Examples",
          description: "Common time calculations solved",
          examples: [
            {
              title: "Add: 2h 45m + 1h 30m",
              steps: [
                "Convert: 2h 45m = 9,900s; 1h 30m = 5,400s",
                "Add: 9,900 + 5,400 = 15,300 seconds",
                "Convert: 15,300s = 4h 15m 0s",
              ],
              result: "4 hours 15 minutes",
            },
            {
              title: "Subtract: 5h 10m − 2h 45m",
              steps: [
                "Convert: 5h 10m = 18,600s; 2h 45m = 9,900s",
                "Subtract: 18,600 - 9,900 = 8,700 seconds",
                "Convert: 8,700s = 2h 25m 0s",
              ],
              result: "2 hours 25 minutes",
            },
          ],
        },
      },

      faqs: [
        { question: "How do I add hours and minutes together?", answer: "Add the hours and minutes separately. If the minutes exceed 60, carry over to hours. For example: 2h 45m + 1h 30m = 3h 75m = 4h 15m." },
        { question: "How do I convert minutes to decimal hours?", answer: "Divide the minutes by 60. For example, 45 minutes = 45/60 = 0.75 hours. So 2 hours 45 minutes = 2.75 decimal hours." },
        { question: "What if my subtraction gives a negative result?", answer: "A negative result means the second time is larger than the first. The calculator shows the absolute difference and notes it as negative." },
        { question: "How many seconds are in an hour?", answer: "There are 3,600 seconds in one hour (60 seconds × 60 minutes = 3,600)." },
        { question: "How do I calculate time for payroll?", answer: "Add all shift start-to-end durations. Convert the total to decimal hours for easy multiplication with hourly rate. Example: 7h 45m = 7.75 hours × $20/hr = $155." },
        { question: "Can I use this for clock time calculations?", answer: "This calculator works with durations (elapsed time). For clock time (e.g., 'what time is it 3h 30m from 2:15 PM?'), add the duration to your start time manually or use a clock time calculator." },
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
      buttons: { calculate: "Calculate", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
  },

  inputs: [
    {
      id: "mode",
      type: "radio",
      defaultValue: "add",
      options: [{ value: "add" }, { value: "subtract" }],
    },
    { id: "time1", type: "time", defaultValue: { h: null, m: null, s: null } },
    { id: "time2", type: "time", defaultValue: { h: null, m: null, s: null } },
  ],

  inputGroups: [],

  results: [
    { id: "totalTime", type: "primary", format: "text" },
    { id: "totalSeconds", type: "secondary", format: "text" },
    { id: "totalMinutes", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "⏱️", itemCount: 4 },
    { id: "details", type: "list", icon: "🔄", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    {
      authors: "National Institute of Standards and Technology",
      year: "2024",
      title: "Time and Frequency Division",
      source: "NIST",
      url: "https://www.nist.gov/pml/time-and-frequency-division",
    },
    {
      authors: "International Bureau of Weights and Measures",
      year: "2024",
      title: "SI Unit of Time (second)",
      source: "BIPM",
      url: "https://www.bipm.org/en/measurement-units/si-base-units",
    },
  ],

  hero: { icon: "⏱️" },
  sidebar: {},
  features: {},
  relatedCalculators: ["age-calculator", "date-calculator", "percentage-calculator"],
  ads: {},
};

export function calculateTimeCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const mode = values.mode as string;
  const t1 = (values.time1 as { h: number | null; m: number | null; s: number | null }) || { h: null, m: null, s: null };
  const t2 = (values.time2 as { h: number | null; m: number | null; s: number | null }) || { h: null, m: null, s: null };
  const h1 = t1.h || 0;
  const m1 = t1.m || 0;
  const s1 = t1.s || 0;
  const h2 = t2.h || 0;
  const m2 = t2.m || 0;
  const s2 = t2.s || 0;

  // Need at least one non-zero value
  if (h1 === 0 && m1 === 0 && s1 === 0 && h2 === 0 && m2 === 0 && s2 === 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const totalSec1 = h1 * 3600 + m1 * 60 + s1;
  const totalSec2 = h2 * 3600 + m2 * 60 + s2;

  let resultSec: number;
  let isNegative = false;

  if (mode === "add") {
    resultSec = totalSec1 + totalSec2;
  } else {
    resultSec = totalSec1 - totalSec2;
    if (resultSec < 0) {
      isNegative = true;
      resultSec = Math.abs(resultSec);
    }
  }

  const rh = Math.floor(resultSec / 3600);
  const rm = Math.floor((resultSec % 3600) / 60);
  const rs = resultSec % 60;

  const hLabel = v["h"] || "h";
  const mLabel = v["m"] || "m";
  const sLabel = v["s"] || "s";
  const sign = isNegative ? "-" : "";

  const timeStr = `${sign}${rh}${hLabel} ${rm}${mLabel} ${rs}${sLabel}`;
  const decimalHours = resultSec / 3600;
  const totalMin = resultSec / 60;
  const days = resultSec / 86400;
  const workDays = resultSec / 28800; // 8-hour days
  const halfHours = resultSec / 1800;
  const quarterHours = resultSec / 900;

  return {
    values: {
      totalTime: resultSec,
      totalSeconds: resultSec,
      totalMinutes: totalMin,
      decimalHours,
      days,
      workDays,
      halfHours,
      quarterHours,
    },
    formatted: {
      totalTime: timeStr,
      totalSeconds: `${sign}${resultSec.toLocaleString("en-US")} ${v["seconds"] || "seconds"}`,
      totalMinutes: `${sign}${totalMin.toLocaleString("en-US", { maximumFractionDigits: 2 })} ${v["minutes"] || "minutes"}`,
      decimalHours: `${sign}${decimalHours.toFixed(2)} ${v["hours"] || "hours"}`,
      days: `${sign}${days.toFixed(2)}`,
      workDays: `${sign}${workDays.toFixed(2)}`,
      halfHours: `${sign}${halfHours.toFixed(1)}`,
      quarterHours: `${sign}${quarterHours.toFixed(1)}`,
    },
    summary: f.summary?.replace("{result}", timeStr) || `Result: ${timeStr}`,
    isValid: true,
  };
}

export default timeCalculatorConfig;
