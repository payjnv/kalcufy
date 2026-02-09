import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

const TIME_ZONES = [
  { value: "UTC", label: "UTC (Coordinated Universal Time)", offset: 0, city: "London (Winter)" },
  { value: "America/New_York", label: "Eastern Time (ET)", offset: -5, city: "New York" },
  { value: "America/Chicago", label: "Central Time (CT)", offset: -6, city: "Chicago" },
  { value: "America/Denver", label: "Mountain Time (MT)", offset: -7, city: "Denver" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)", offset: -8, city: "Los Angeles" },
  { value: "America/Anchorage", label: "Alaska Time (AKT)", offset: -9, city: "Anchorage" },
  { value: "Pacific/Honolulu", label: "Hawaii Time (HT)", offset: -10, city: "Honolulu" },
  { value: "America/Sao_Paulo", label: "Brasilia Time (BRT)", offset: -3, city: "São Paulo" },
  { value: "Europe/London", label: "GMT / British Time", offset: 0, city: "London" },
  { value: "Europe/Paris", label: "Central European (CET)", offset: 1, city: "Paris" },
  { value: "Europe/Berlin", label: "Central European (CET)", offset: 1, city: "Berlin" },
  { value: "Europe/Moscow", label: "Moscow Time (MSK)", offset: 3, city: "Moscow" },
  { value: "Asia/Dubai", label: "Gulf Standard (GST)", offset: 4, city: "Dubai" },
  { value: "Asia/Kolkata", label: "India Standard (IST)", offset: 5.5, city: "Mumbai" },
  { value: "Asia/Bangkok", label: "Indochina Time (ICT)", offset: 7, city: "Bangkok" },
  { value: "Asia/Singapore", label: "Singapore Time (SGT)", offset: 8, city: "Singapore" },
  { value: "Asia/Shanghai", label: "China Standard (CST)", offset: 8, city: "Shanghai" },
  { value: "Asia/Tokyo", label: "Japan Standard (JST)", offset: 9, city: "Tokyo" },
  { value: "Australia/Sydney", label: "Australian Eastern (AET)", offset: 11, city: "Sydney" },
  { value: "Pacific/Auckland", label: "New Zealand (NZT)", offset: 13, city: "Auckland" },
];

export const timeZoneCalculatorConfig: CalculatorConfigV3 = {
  id: "time-zone-calculator",
  slug: "time-zone-calculator",
  name: "Time Zone Calculator",
  category: "everyday",
  icon: "🌍",

  seo: {
    title: "Time Zone Calculator - Convert Time Between Zones",
    description: "Free time zone converter to convert times between any world time zones. Includes world clock, meeting planner, and DST information for international scheduling.",
    shortDescription: "Convert time between world time zones",
    keywords: ["time zone calculator", "time converter", "world clock", "timezone converter", "international time", "meeting planner", "UTC converter"],
  },

  hero: { badge: "Everyday", rating: { average: 4.9, count: 124000 } },
  unitSystem: { enabled: false, default: "metric", options: [] },

  inputs: [
    {
      id: "fromZone",
      type: "select",
      label: "From Time Zone",
      required: true,
      defaultValue: "America/New_York",
      options: TIME_ZONES.map((tz) => ({ value: tz.value, label: `${tz.city} - ${tz.label}` })),
    },
    {
      id: "toZone",
      type: "select",
      label: "To Time Zone",
      required: true,
      defaultValue: "Europe/London",
      options: TIME_ZONES.map((tz) => ({ value: tz.value, label: `${tz.city} - ${tz.label}` })),
    },
    {
      id: "inputTime",
      type: "text",
      label: "Time (HH:MM)",
      required: true,
      defaultValue: "09:00",
      placeholder: "09:00",
      helpText: "Enter time in 24-hour format",
    },
    {
      id: "inputDate",
      type: "date",
      label: "Date",
      required: false,
      helpText: "For DST-aware conversion",
    },
  ],

  inputGroups: [],

  results: [
    { id: "convertedTime", type: "primary", label: "Converted Time", format: "text" },
    { id: "fromTime", type: "secondary", label: "Original Time", format: "text" },
    { id: "timeDifference", type: "secondary", label: "Time Difference", format: "text" },
    { id: "utcTime", type: "secondary", label: "UTC Time", format: "text" },
    { id: "dateChange", type: "secondary", label: "Date Change", format: "text" },
  ],

  infoCards: [
    {
      id: "majorZones",
      title: "Major Time Zones",
      icon: "🌍",
      type: "list",
      items: [
        { label: "Pacific (PT)", value: "UTC-8", color: "blue" },
        { label: "Eastern (ET)", value: "UTC-5", color: "green" },
        { label: "London (GMT)", value: "UTC+0", color: "purple" },
        { label: "Tokyo (JST)", value: "UTC+9", color: "amber" },
      ],
    },
    {
      id: "quickDiffs",
      title: "Quick Differences",
      icon: "⚡",
      type: "horizontal",
      items: [
        { label: "NY to London: +5 hours" },
        { label: "NY to Tokyo: +14 hours" },
        { label: "LA to London: +8 hours" },
        { label: "LA to Sydney: +19 hours" },
      ],
    },
  ],

  referenceData: [
    {
      id: "utcOffsets",
      title: "Common UTC Offsets",
      icon: "🕐",
      columns: 2,
      items: [
        { label: "Los Angeles", value: "UTC-8 / UTC-7" },
        { label: "New York", value: "UTC-5 / UTC-4" },
        { label: "London", value: "UTC+0 / UTC+1" },
        { label: "Paris/Berlin", value: "UTC+1 / UTC+2" },
        { label: "Dubai", value: "UTC+4" },
        { label: "Tokyo", value: "UTC+9" },
      ],
    },
  ],

  educationSections: [
    {
      id: "timezoneBasics",
      type: "cards",
      title: "Understanding Time Zones",
      icon: "🌐",
      columns: 2,
      cards: [
        { title: "24 Time Zones", description: "Earth is divided into 24 zones, each roughly 15° longitude apart (360° ÷ 24 = 15°). Each zone is 1 hour different from neighbors.", icon: "🌍" },
        { title: "UTC - The Standard", description: "Coordinated Universal Time (UTC) is the global time standard. All zones are defined as UTC± hours. UTC replaced GMT as the standard.", icon: "⏰" },
        { title: "Daylight Saving", description: "DST shifts clocks forward 1 hour in spring, back in fall. Not all regions observe it. This can change time differences seasonally.", icon: "☀️" },
        { title: "Political Boundaries", description: "Time zones don't follow longitude exactly. China uses 1 zone despite spanning 5 geographical zones. India uses UTC+5:30.", icon: "🗺️" },
      ],
    },
    {
      id: "dstInfo",
      type: "cards",
      title: "Daylight Saving Time",
      icon: "☀️",
      columns: 3,
      cards: [
        { title: "Northern Hemisphere", description: "March/April to October/November. US: 2nd Sunday March - 1st Sunday November.", icon: "🌸" },
        { title: "Southern Hemisphere", description: "October to March (opposite seasons). Australia: 1st Sunday October - 1st Sunday April.", icon: "🍂" },
        { title: "No DST", description: "Most of Africa, Asia (except some), Hawaii, Arizona, and equatorial regions don't observe DST.", icon: "🚫" },
      ],
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "DST can change the time difference between locations by 1-2 hours depending on the season.", type: "warning" },
        { text: "Some zones use half-hour (India UTC+5:30) or quarter-hour (Nepal UTC+5:45) offsets.", type: "info" },
        { text: "Always confirm current time with reliable sources for critical scheduling — DST rules change.", type: "warning" },
        { text: "International Date Line (roughly 180° longitude) is where calendar date changes.", type: "info" },
        { text: "When scheduling international meetings, specify the time zone explicitly (e.g., '3 PM EST').", type: "info" },
        { text: "Military/NATO uses letter codes: Z = UTC, A-M = east, N-Y = west (no J).", type: "info" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Conversion",
      icon: "🧮",
      description: "Convert 9:00 AM New York time to London and Tokyo",
      columns: 2,
      examples: [
        { title: "New York → London", steps: ["New York (ET): 9:00 AM", "ET is UTC-5", "London (GMT) is UTC+0", "Difference: +5 hours", "9:00 + 5 = 14:00"], result: "London: 2:00 PM (same day)" },
        { title: "New York → Tokyo", steps: ["New York (ET): 9:00 AM", "ET is UTC-5", "Tokyo (JST) is UTC+9", "Difference: +14 hours", "9:00 + 14 = 23:00"], result: "Tokyo: 11:00 PM (same day)" },
      ],
    },
    {
      id: "history",
      type: "prose",
      title: "History of Time Zones",
      content: "Before time zones, each city set its own local time by the sun. Railroads created chaos with hundreds of local times. In 1884, the International Meridian Conference established the Greenwich meridian as the prime meridian and created the 24 time zone system. Sir Sandford Fleming, a Canadian railway engineer, is credited with proposing standard time zones.",
    },
    {
      id: "specialCases",
      type: "prose",
      title: "Unusual Time Zones",
      content: "China spans 5 geographical time zones but uses only Beijing Time (UTC+8) nationwide. India uses a single zone at UTC+5:30. Nepal is UTC+5:45. The Line Islands (Kiribati) are UTC+14, the furthest ahead. Some remote islands have uninhabited UTC-12 zones, making the global span 26 hours, not 24.",
    },
    {
      id: "scheduling",
      type: "prose",
      title: "Tips for International Scheduling",
      content: "When scheduling across time zones, always specify the time zone (e.g., '3 PM EST' not just '3 PM'). Use tools like World Time Buddy to find overlapping business hours. Consider rotating meeting times to share the burden of inconvenient hours. For global teams, record important meetings so those in difficult time zones can catch up asynchronously.",
    },
  ],

  faqs: [
    { question: "What is UTC?", answer: "Coordinated Universal Time (UTC) is the primary time standard by which the world regulates clocks. It's essentially the same as GMT (Greenwich Mean Time) but more precise. All time zones are defined as offsets from UTC." },
    { question: "What's the difference between GMT and UTC?", answer: "GMT is a time zone (the one used in London during winter), while UTC is a time standard. In practice, they're the same time, but UTC is the scientific standard used for international coordination." },
    { question: "How does Daylight Saving Time affect conversions?", answer: "DST can shift the time difference by 1-2 hours. For example, NY-London is normally 5 hours, but can be 4 or 6 hours during DST transitions when one location has changed clocks but the other hasn't." },
    { question: "Why doesn't everyone use DST?", answer: "DST was designed to save energy by extending evening daylight in summer. Equatorial regions don't benefit (daylight hours don't change much). Some regions (Arizona, Hawaii, most of Asia/Africa) opted out due to minimal benefits or disruption." },
    { question: "What's the International Date Line?", answer: "The IDL is an imaginary line roughly following 180° longitude where the calendar date changes. Crossing westward adds a day; crossing eastward subtracts a day. It zigzags to keep island nations in the same day." },
    { question: "How do I schedule meetings across time zones?", answer: "Use a world clock tool or converter. Always specify the time zone (e.g., '3 PM EST, 8 PM GMT'). Consider using UTC for clarity. Tools like World Time Buddy can find overlapping business hours." },
    { question: "Why does China have only one time zone?", answer: "China adopted a single time zone (Beijing Time, UTC+8) in 1949 for national unity. This means western China experiences sunrise as late as 10 AM in winter. Some regions unofficially use local time." },
    { question: "What are the most common time zone abbreviations?", answer: "EST/EDT (Eastern US), PST/PDT (Pacific US), GMT/BST (UK), CET/CEST (Central Europe), JST (Japan), IST (India), AEST/AEDT (Australia East). The second letter often indicates Daylight/Summer time." },
  ],

  references: [
    { authors: "IANA", year: "2024", title: "Time Zone Database", source: "Internet Assigned Numbers Authority", url: "https://www.iana.org/time-zones" },
    { authors: "timeanddate.com", year: "2025", title: "Time Zone Map and Converter", source: "timeanddate.com", url: "https://www.timeanddate.com/time/map/" },
  ],

  detailedTable: {
    id: "worldClock",
    buttonLabel: "View World Clock",
    buttonIcon: "🌍",
    modalTitle: "Current Time Around the World",
    columns: [
      { id: "city", label: "City", align: "left" },
      { id: "timezone", label: "Zone", align: "center" },
      { id: "offset", label: "UTC Offset", align: "center", highlight: true },
      { id: "time", label: "Time", align: "right" },
    ],
  },

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "everyday" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["date-calculator", "age-calculator", "countdown-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
function getOffset(zone: string): number {
  const tz = TIME_ZONES.find((t) => t.value === zone);
  return tz?.offset ?? 0;
}

function getCity(zone: string): string {
  const tz = TIME_ZONES.find((t) => t.value === zone);
  return tz?.city ?? zone;
}

export function calculateTimeZone(data: { values: Record<string, unknown>; units: Record<string, string>; unitSystem: "metric" | "imperial" }): CalculatorResults {
  const { values } = data;

  const fromZone = (values.fromZone as string) || "America/New_York";
  const toZone = (values.toZone as string) || "Europe/London";
  const inputTime = (values.inputTime as string) || "09:00";

  const [hours, minutes] = inputTime.split(":").map(Number);
  const fromOffset = getOffset(fromZone);
  const toOffset = getOffset(toZone);
  const diff = toOffset - fromOffset;

  let newHours = hours + diff;
  let dateChange = "Same day";

  if (newHours >= 24) {
    newHours -= 24;
    dateChange = "Next day (+1)";
  } else if (newHours < 0) {
    newHours += 24;
    dateChange = "Previous day (-1)";
  }

  const convertedTimeStr = `${String(Math.floor(newHours)).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  const utcHours = hours - fromOffset;
  const utcTimeStr = `${String(((utcHours % 24) + 24) % 24).padStart(2, "0")}:${String(minutes).padStart(2, "0")} UTC`;

  const diffStr = diff >= 0 ? `+${diff} hours` : `${diff} hours`;

  const now = new Date();
  const tableData = TIME_ZONES.slice(0, 10).map((tz) => {
    const localHours = (now.getUTCHours() + tz.offset + 24) % 24;
    return {
      city: tz.city,
      timezone: tz.label.split("(")[1]?.replace(")", "") || tz.value,
      offset: `UTC${tz.offset >= 0 ? "+" : ""}${tz.offset}`,
      time: `${String(Math.floor(localHours)).padStart(2, "0")}:${String(now.getUTCMinutes()).padStart(2, "0")}`,
    };
  });

  return {
    values: { convertedTime: convertedTimeStr, fromTime: inputTime, timeDifference: diff, utcTime: utcTimeStr, dateChange },
    formatted: {
      convertedTime: `${convertedTimeStr} in ${getCity(toZone)}`,
      fromTime: `${inputTime} in ${getCity(fromZone)}`,
      timeDifference: diffStr,
      utcTime: utcTimeStr,
      dateChange,
    },
    summary: `${inputTime} ${getCity(fromZone)} = ${convertedTimeStr} ${getCity(toZone)} (${diffStr})`,
    isValid: !isNaN(hours) && !isNaN(minutes),
    metadata: { tableData, fromCity: getCity(fromZone), toCity: getCity(toZone) },
  };
}

export default timeZoneCalculatorConfig;
