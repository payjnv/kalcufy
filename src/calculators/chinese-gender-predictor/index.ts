import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ══════════════════════════════════════════════════════════════
// CHINESE GENDER PREDICTOR — V4 Calculator
// Modes: Predict | Plan | Test Past Kids
// Features: Lunar conversion, interactive chart, zodiac, old wives' tales
// ══════════════════════════════════════════════════════════════

// ── Lunar Calendar Data (1900–2100) ──
// Each entry encodes the lunar month lengths + leap month for that year.
// Format: 16-bit encoding where bits 0-11 = months (0=29d, 1=30d),
// bits 12-15 = leap month number (0 = no leap)
const LUNAR_DATA: number[] = [
  0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0,
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
  0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06aa0, 0x1a6c4, 0x0aae0,
  0x092e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,
  0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,
  0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,
  0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a4d0, 0x0d150, 0x0f252,
  0x0d520,
];

// ── Chinese Gender Chart (Qing Dynasty original) ──
// Row = lunar age (18-45), Column = lunar month (1-12)
// 1 = Boy, 0 = Girl
const GENDER_CHART: number[][] = [
  //  M1 M2 M3 M4 M5 M6 M7 M8 M9 M10 M11 M12
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  // Age 18
  [1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0],  // Age 19
  [0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1],  // Age 20
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],  // Age 21
  [0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0],  // Age 22
  [1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0],  // Age 23
  [1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1],  // Age 24
  [0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0],  // Age 25
  [1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1],  // Age 26
  [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0],  // Age 27
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1],  // Age 28
  [0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1],  // Age 29
  [1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0],  // Age 30
  [1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1],  // Age 31
  [1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0],  // Age 32
  [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],  // Age 33
  [1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0],  // Age 34
  [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],  // Age 35
  [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],  // Age 36
  [1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0],  // Age 37
  [0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1],  // Age 38
  [1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1],  // Age 39
  [0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1],  // Age 40
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],  // Age 41
  [0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],  // Age 42
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1],  // Age 43
  [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1],  // Age 44
  [1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0],  // Age 45
];

// ── Chinese Zodiac ──
const ZODIAC_ANIMALS = [
  "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake",
  "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"
];
const ZODIAC_ICONS = [
  "🐀", "🐂", "🐅", "🐇", "🐉", "🐍",
  "🐴", "🐐", "🐒", "🐓", "🐕", "🐷"
];

// ── Lunar helper functions ──
function getLunarYearDays(y: number): number {
  let sum = 348;
  const d = LUNAR_DATA[y - 1900];
  for (let i = 0x8000; i > 0x8; i >>= 1) {
    sum += (d & i) ? 1 : 0;
  }
  return sum + getLeapDays(y);
}

function getLeapMonth(y: number): number {
  return LUNAR_DATA[y - 1900] & 0xf;
}

function getLeapDays(y: number): number {
  if (getLeapMonth(y)) {
    return (LUNAR_DATA[y - 1900] & 0x10000) ? 30 : 29;
  }
  return 0;
}

function getMonthDays(y: number, m: number): number {
  return (LUNAR_DATA[y - 1900] & (0x10000 >> m)) ? 30 : 29;
}

function solarToLunar(year: number, month: number, day: number): { lunarYear: number; lunarMonth: number; lunarDay: number } {
  const baseDate = new Date(1900, 0, 31);
  const targetDate = new Date(year, month - 1, day);
  let offset = Math.floor((targetDate.getTime() - baseDate.getTime()) / 86400000);

  let lunarYear = 1900;
  let daysInYear: number;
  for (lunarYear = 1900; lunarYear < 2101 && offset > 0; lunarYear++) {
    daysInYear = getLunarYearDays(lunarYear);
    offset -= daysInYear;
  }
  if (offset < 0) {
    offset += daysInYear!;
    lunarYear--;
  }

  const leapM = getLeapMonth(lunarYear);
  let isLeap = false;
  let lunarMonth = 1;
  let daysInMonth: number;

  for (lunarMonth = 1; lunarMonth < 13 && offset > 0; lunarMonth++) {
    if (leapM > 0 && lunarMonth === leapM + 1 && !isLeap) {
      --lunarMonth;
      isLeap = true;
      daysInMonth = getLeapDays(lunarYear);
    } else {
      daysInMonth = getMonthDays(lunarYear, lunarMonth);
    }
    if (isLeap && lunarMonth === leapM + 1) isLeap = false;
    offset -= daysInMonth;
  }

  if (offset === 0 && leapM > 0 && lunarMonth === leapM + 1) {
    if (isLeap) {
      isLeap = false;
    } else {
      isLeap = true;
      --lunarMonth;
    }
  }

  if (offset < 0) {
    offset += daysInMonth!;
    --lunarMonth;
  }

  const lunarDay = offset + 1;
  return { lunarYear, lunarMonth, lunarDay };
}

function getLunarAge(birthYear: number, birthMonth: number, birthDay: number, conceptionYear: number, conceptionMonth: number): number {
  const birthLunar = solarToLunar(birthYear, birthMonth, birthDay);
  const concLunar = solarToLunar(conceptionYear, conceptionMonth, 15);
  let age = concLunar.lunarYear - birthLunar.lunarYear + 1;
  if (age < 18) age = 18;
  if (age > 45) age = 45;
  return age;
}

function getLunarMonth(year: number, month: number): number {
  const lunar = solarToLunar(year, month, 15);
  return lunar.lunarMonth;
}

function getChineseZodiac(year: number): { animal: string; icon: string } {
  const idx = (year - 4) % 12;
  return { animal: ZODIAC_ANIMALS[idx], icon: ZODIAC_ICONS[idx] };
}

function predictGender(lunarAge: number, lunarMonth: number): "boy" | "girl" {
  const ageIdx = lunarAge - 18;
  const monthIdx = lunarMonth - 1;
  if (ageIdx < 0 || ageIdx >= GENDER_CHART.length || monthIdx < 0 || monthIdx >= 12) return "girl";
  return GENDER_CHART[ageIdx][monthIdx] === 1 ? "boy" : "girl";
}

// ══════════════════════════════════════════════════════════════
// CONFIG
// ══════════════════════════════════════════════════════════════

export const chineseGenderPredictorConfig: CalculatorConfigV4 = {
  id: "chinese-gender-predictor",
  version: "4.0",
  category: "health",
  icon: "🐉",

  presets: [
    {
      id: "youngMomSpring",
      icon: "🌸",
      values: {
        mode: "predict",
        birthYear: 1998,
        birthMonth: 5,
        conceptionYear: 2025,
        conceptionMonth: 3,
      },
    },
    {
      id: "midThirtiesFall",
      icon: "🍂",
      values: {
        mode: "predict",
        birthYear: 1991,
        birthMonth: 8,
        conceptionYear: 2025,
        conceptionMonth: 10,
      },
    },
    {
      id: "planForBoy",
      icon: "👦",
      values: {
        mode: "plan",
        birthYear: 1994,
        birthMonth: 3,
        planYear: 2025,
        preferredGender: "boy",
      },
    },
    {
      id: "planForGirl",
      icon: "👧",
      values: {
        mode: "plan",
        birthYear: 1996,
        birthMonth: 7,
        planYear: 2026,
        preferredGender: "girl",
      },
    },
  ],

  t: {
    en: {
      name: "Chinese Gender Predictor",
      slug: "chinese-gender-predictor",
      subtitle: "Predict your baby's gender using the ancient Chinese lunar calendar chart — with planning mode and zodiac insights.",
      breadcrumb: "Gender Predictor",

      seo: {
        title: "Chinese Gender Predictor - Free Lunar Calendar Chart 2026",
        description: "Predict your baby's gender with the ancient Chinese birth chart. Auto lunar conversion, planning mode to conceive a boy or girl, and Chinese zodiac — free and fun!",
        shortDescription: "Chinese gender prediction based on the lunar calendar",
        keywords: [
          "chinese gender predictor",
          "chinese gender chart",
          "baby gender predictor",
          "chinese calendar boy or girl",
          "lunar calendar gender prediction",
          "free gender predictor",
          "chinese birth chart 2026",
          "baby boy or girl calculator",
        ],
      },

      calculator: { yourInformation: "Your Information" },
      ui: {
        yourInformation: "Your Information",
        calculate: "Predict Gender",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        mode: {
          label: "What would you like to do?",
          helpText: "",
          options: {
            predict: "🔮 Predict Baby's Gender",
            plan: "📅 Plan Best Months",
          },
        },
        birthYear: {
          label: "Mother's Birth Year",
          helpText: "",
        },
        birthMonth: {
          label: "Mother's Birth Month",
          helpText: "",
          options: {
            "1": "January", "2": "February", "3": "March", "4": "April",
            "5": "May", "6": "June", "7": "July", "8": "August",
            "9": "September", "10": "October", "11": "November", "12": "December",
          },
        },
        conceptionYear: {
          label: "Conception Year",
          helpText: "",
        },
        conceptionMonth: {
          label: "Conception Month",
          helpText: "",
          options: {
            "1": "January", "2": "February", "3": "March", "4": "April",
            "5": "May", "6": "June", "7": "July", "8": "August",
            "9": "September", "10": "October", "11": "November", "12": "December",
          },
        },
        planYear: {
          label: "Year You Plan to Conceive",
          helpText: "",
        },
        preferredGender: {
          label: "I want to have a...",
          helpText: "",
          options: {
            boy: "👦 Boy",
            girl: "👧 Girl",
          },
        },
      },

      results: {
        prediction: { label: "Prediction" },
        lunarAge: { label: "Lunar Age" },
        lunarMonth: { label: "Lunar Month" },
        zodiac: { label: "Baby's Chinese Zodiac" },
        bestMonths: { label: "Best Months" },
      },

      presets: {
        youngMomSpring: { label: "Young Mom, Spring", description: "Born 1998, conceive March 2025" },
        midThirtiesFall: { label: "Mid-30s, Fall", description: "Born 1991, conceive October 2025" },
        planForBoy: { label: "Plan for Boy", description: "Find best months for a boy in 2025" },
        planForGirl: { label: "Plan for Girl", description: "Find best months for a girl in 2026" },
      },

      values: {
        "boy": "Boy",
        "girl": "Girl",
        "years": "years",
        "lunar": "lunar",
        "boyEmoji": "👦",
        "girlEmoji": "👧",
        "months": "months",
        "month": "Month",
        "planningFor": "Planning for",
        "allMonthsChecked": "All months checked",
        "noneFound": "None found",
        "ifBorn": "if born",
        "method": "Qing Dynasty Chart (700+ years)",
        "calendarSystem": "Chinese Lunisolar Calendar",
        "ageRange": "18 – 45 years",
        "accuracy": "~50% (entertainment only)",
        "prediction": "Prediction",
        "bestMonthsFor": "Best months for a",
        "in": "in",
        "Jan": "Jan", "Feb": "Feb", "Mar": "Mar", "Apr": "Apr",
        "May": "May", "Jun": "Jun", "Jul": "Jul", "Aug": "Aug",
        "Sep": "Sep", "Oct": "Oct", "Nov": "Nov", "Dec": "Dec",
      },

      formats: {
        summary: "The Chinese Gender Chart predicts: {value}!",
        planSummary: "Best months to conceive a {gender} in {year}: {months}",
      },

      infoCards: {
        metrics: {
          title: "Prediction Details",
          items: [
            { label: "Predicted Gender", valueKey: "prediction" },
            { label: "Mother's Lunar Age", valueKey: "lunarAge" },
            { label: "Lunar Conception Month", valueKey: "lunarMonth" },
            { label: "Baby's Chinese Zodiac", valueKey: "zodiac" },
          ],
        },
        details: {
          title: "Chart Details",
          items: [
            { label: "Chart Method", valueKey: "method" },
            { label: "Calendar System", valueKey: "calendarSystem" },
            { label: "Chart Age Range", valueKey: "ageRange" },
            { label: "Accuracy", valueKey: "accuracy" },
          ],
        },
        tips: {
          title: "Fun Tips",
          items: [
            "This is for entertainment only — not a medical prediction!",
            "The chart is said to be over 700 years old from the Qing Dynasty",
            "Lunar age is typically 1-2 years older than your real age",
            "For the most accurate result, use your exact conception date",
          ],
        },
      },

      detailedTable: {
        genderChart: {
          button: "View Full Gender Chart",
          title: "Chinese Gender Prediction Chart",
          columns: {
            age: "Lunar Age",
            m1: "Jan", m2: "Feb", m3: "Mar", m4: "Apr",
            m5: "May", m6: "Jun", m7: "Jul", m8: "Aug",
            m9: "Sep", m10: "Oct", m11: "Nov", m12: "Dec",
          },
        },
      },

      education: {
        whatIs: {
          title: "What Is the Chinese Gender Predictor?",
          content: "The Chinese Gender Predictor, also known as the Chinese Birth Chart or Chinese Gender Calendar, is a traditional method used to predict a baby's gender based on the mother's lunar age at conception and the lunar month of conception. Legend says this chart is over 700 years old and was discovered in a royal tomb near Beijing during the Qing Dynasty (1644–1911 AD). The chart is based on the I Ching (Book of Changes) and incorporates the principles of Yin and Yang, the Five Elements (Metal, Water, Wood, Fire, Earth), and the Eight Trigrams. While it has no scientific backing and offers roughly a 50/50 chance of being correct, millions of parents worldwide use it as a fun way to guess their baby's gender during pregnancy.",
        },
        howItWorks: {
          title: "How Does the Lunar Calendar Method Work?",
          content: "The Chinese Gender Predictor relies on the Chinese Lunar Calendar, which is fundamentally different from the Western Gregorian calendar we use daily. The lunar calendar follows the cycles of the moon, with months alternating between 29 and 30 days. Your 'lunar age' is calculated differently too — in Chinese tradition, you are considered 1 year old at birth (counting time in the womb), and everyone gains a year at Chinese New Year rather than on their birthday. This means your lunar age is typically 1 to 2 years older than your Western age. Our calculator automatically handles all these conversions for you. It takes your Gregorian birth date and conception date, converts them to their lunar equivalents, and cross-references them on the authentic Qing Dynasty chart to give you a prediction.",
        },
        considerations: {
          title: "Important Things to Know",
          items: [
            { text: "This is an entertainment tool — accuracy is approximately 50%, like a coin flip", type: "warning" as const },
            { text: "The chart uses lunar age, which is 1-2 years older than your actual age", type: "info" as const },
            { text: "Conception typically occurs 14 days after the first day of your last period", type: "info" as const },
            { text: "If conception was near the end of a month, try both months — lunar dates shift mid-month", type: "info" as const },
            { text: "For medically accurate gender determination, use ultrasound (week 20) or genetic testing", type: "warning" as const },
            { text: "The chart works for ages 18-45 and single pregnancies only — not designed for twins", type: "info" as const },
          ],
        },
        categories: {
          title: "Scientific Methods vs. Old Wives' Tales",
          items: [
            { text: "Ultrasound scan (week 18-22): ~99% accurate for gender determination", type: "info" as const },
            { text: "NIPT blood test (week 10+): ~99% accurate, also screens for chromosomal conditions", type: "info" as const },
            { text: "Amniocentesis (week 15-20): 100% accurate but invasive, used for medical reasons", type: "info" as const },
            { text: "Chinese Gender Chart: ~50% accuracy — fun folklore, not medical advice", type: "info" as const },
            { text: "Heart rate myth (>140 = girl): debunked by multiple studies, no correlation found", type: "warning" as const },
            { text: "Cravings myth (sweet = girl, salty = boy): no scientific evidence whatsoever", type: "warning" as const },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step examples of how the lunar conversion and prediction works",
          examples: [
            {
              title: "Example: Predicting Gender",
              steps: [
                "Mother born: March 15, 1994 → Lunar birthday: Feb 4, 1994 (Lunar Year 4691)",
                "Conception: June 2025 → Lunar month: 5th month",
                "Lunar age at conception: 2025 - 1994 + 1 = 32 years (Chinese counting)",
                "Cross-reference: Age 32, Month 5 on the chart → Result: BOY 👦",
              ],
              result: "Chart prediction: Boy",
            },
            {
              title: "Example: Planning Best Months",
              steps: [
                "Mother born: November 20, 1996 → Lunar age in 2026 will be 31",
                "Preferred gender: Girl 👧",
                "Check all 12 months in chart row for age 31: Jan(B), Feb(B), Mar(G), Apr(B), May(G)...",
                "Months predicting Girl: March, May, September → Plan conception accordingly",
              ],
              result: "Best months for a girl: March, May, September 2026",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How accurate is the Chinese Gender Predictor?",
          answer: "The Chinese Gender Predictor has no scientific backing. Studies show it has approximately 50% accuracy — the same as flipping a coin. A 2009 study published in the American Journal of Obstetrics & Gynecology found no statistical significance in the chart's predictions. While some parents report it was correct for them, this is likely coincidence. Use it for fun only, and rely on ultrasound or genetic testing (NIPT) for medically accurate results.",
        },
        {
          question: "What is 'lunar age' and why is it different from my real age?",
          answer: "In the Chinese lunar calendar, your age is calculated differently. You are considered 1 year old at birth (counting time spent in the womb), and everyone gains a year at Chinese New Year — not on their birthday. This means your lunar age is typically 1-2 years older than your Western (Gregorian) age. Our calculator automatically converts your birth date to calculate your correct lunar age.",
        },
        {
          question: "Can I use this to choose my baby's gender?",
          answer: "The Chinese Gender Chart is sometimes used for 'gender selection' — choosing which months to try conceiving to get a specific gender. Our Planning Mode shows you which months predict boy vs. girl. However, this is purely folklore. A baby's sex is determined by whether the sperm carries an X or Y chromosome, and the lunar calendar has zero influence on this biological process.",
        },
        {
          question: "Does the Chinese Gender Chart work for twins?",
          answer: "The chart is designed for single pregnancies only. For twins, especially fraternal twins (who can be different genders), the chart cannot predict accurately. Since it uses only the mother's age and conception month, it gives one answer — which could match one twin but not the other.",
        },
        {
          question: "What if my conception date was near the end of a month?",
          answer: "If conception occurred near the end or beginning of a Western month, the corresponding lunar month might be different. Lunar months don't align exactly with Gregorian months. Our calculator handles this conversion automatically, but if your conception was right at a month boundary, you might try checking both adjacent months to see if the prediction changes.",
        },
        {
          question: "What's the Chinese Zodiac animal for my baby?",
          answer: "The Chinese Zodiac follows a 12-year cycle, with each year associated with an animal: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, and Pig. Our calculator automatically shows your baby's zodiac animal based on their expected birth year. For example, babies born in the Year of the Snake (2025) are believed to be wise, intuitive, and elegant.",
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
        calculate: "Predict Gender",
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
    },
    es: {
      "name": "Predictor de Género Chino",
      "slug": "calculadora-predictor-genero-chino",
      "subtitle": "Predice el género de tu bebé usando el antiguo calendario lunar chino — con modo planificación y perspectivas del zodíaco.",
      "breadcrumb": "Predictor de Género",
      "seo": {
        "title": "Predictor de Género Chino - Calendario Lunar Gratuito 2026",
        "description": "Predice el género de tu bebé con el antiguo calendario chino. Conversión lunar automática, modo planificación para concebir niño o niña, y zodíaco chino — ¡gratis y divertido!",
        "shortDescription": "Predicción de género china basada en el calendario lunar",
        "keywords": [
          "predictor genero chino",
          "calendario genero chino",
          "predictor genero bebe",
          "calendario chino niño o niña",
          "prediccion genero calendario lunar",
          "predictor genero gratis",
          "calendario chino nacimiento 2026",
          "calculadora niño o niña"
        ]
      },
      "inputs": {
        "mode": {
          "label": "¿Qué te gustaría hacer?",
          "helpText": "",
          "options": {
            "predict": "🔮 Predecir Género del Bebé",
            "plan": "📅 Planificar Mejores Meses"
          }
        },
        "birthYear": {
          "label": "Año de Nacimiento de la Madre",
          "helpText": ""
        },
        "birthMonth": {
          "label": "Mes de Nacimiento de la Madre",
          "helpText": "",
          "options": {
            "1": "Enero",
            "2": "Febrero",
            "3": "Marzo",
            "4": "Abril",
            "5": "Mayo",
            "6": "Junio",
            "7": "Julio",
            "8": "Agosto",
            "9": "Septiembre",
            "10": "Octubre",
            "11": "Noviembre",
            "12": "Diciembre"
          }
        },
        "conceptionYear": {
          "label": "Año de Concepción",
          "helpText": ""
        },
        "conceptionMonth": {
          "label": "Mes de Concepción",
          "helpText": "",
          "options": {
            "1": "Enero",
            "2": "Febrero",
            "3": "Marzo",
            "4": "Abril",
            "5": "Mayo",
            "6": "Junio",
            "7": "Julio",
            "8": "Agosto",
            "9": "Septiembre",
            "10": "Octubre",
            "11": "Noviembre",
            "12": "Diciembre"
          }
        },
        "planYear": {
          "label": "Año en que Planeas Concebir",
          "helpText": ""
        },
        "preferredGender": {
          "label": "Quiero tener un...",
          "helpText": "",
          "options": {
            "boy": "👦 Niño",
            "girl": "👧 Niña"
          }
        }
      },
      "results": {
        "prediction": {
          "label": "Predicción"
        },
        "lunarAge": {
          "label": "Edad Lunar"
        },
        "lunarMonth": {
          "label": "Mes Lunar"
        },
        "zodiac": {
          "label": "Zodíaco Chino del Bebé"
        },
        "bestMonths": {
          "label": "Mejores Meses"
        }
      },
      "presets": {
        "youngMomSpring": {
          "label": "Mamá Joven, Primavera",
          "description": "Nacida 1998, concebir Marzo 2025"
        },
        "midThirtiesFall": {
          "label": "Mediados 30s, Otoño",
          "description": "Nacida 1991, concebir Octubre 2025"
        },
        "planForBoy": {
          "label": "Planificar para Niño",
          "description": "Encontrar mejores meses para un niño en 2025"
        },
        "planForGirl": {
          "label": "Planificar para Niña",
          "description": "Encontrar mejores meses para una niña en 2026"
        }
      },
      "values": {
        "boy": "Niño",
        "girl": "Niña",
        "years": "años",
        "lunar": "lunar",
        "boyEmoji": "👦",
        "girlEmoji": "👧",
        "months": "meses",
        "month": "Mes",
        "planningFor": "Planificando para",
        "allMonthsChecked": "Todos los meses revisados",
        "noneFound": "Ninguno encontrado",
        "ifBorn": "si nace en",
        "method": "Carta de la Dinastía Qing (700+ años)",
        "calendarSystem": "Calendario Lunisolar Chino",
        "ageRange": "18 – 45 años",
        "accuracy": "~50% (solo entretenimiento)",
        "prediction": "Predicción",
        "bestMonthsFor": "Mejores meses para",
        "in": "en",
        "Jan": "Ene", "Feb": "Feb", "Mar": "Mar", "Apr": "Abr",
        "May": "May", "Jun": "Jun", "Jul": "Jul", "Aug": "Ago",
        "Sep": "Sep", "Oct": "Oct", "Nov": "Nov", "Dec": "Dic"
      },
      "formats": {
        "summary": "El Calendario Chino de Género predice: ¡{value}!",
        "planSummary": "Mejores meses para concebir un/a {gender} en {year}: {months}"
      },
      "infoCards": {
        "metrics": {
          "title": "Detalles de la Predicción",
          "items": [
            {
              "label": "Género Predicho",
              "valueKey": "prediction"
            },
            {
              "label": "Edad Lunar de la Madre",
              "valueKey": "lunarAge"
            },
            {
              "label": "Mes Lunar de Concepción",
              "valueKey": "lunarMonth"
            },
            {
              "label": "Zodíaco Chino del Bebé",
              "valueKey": "zodiac"
            }
          ]
        },
        "details": {
          "title": "Detalles del Calendario",
          "items": [
            {
              "label": "Método del Calendario",
              "valueKey": "method"
            },
            {
              "label": "Sistema de Calendario",
              "valueKey": "calendarSystem"
            },
            {
              "label": "Rango de Edad del Calendario",
              "valueKey": "ageRange"
            },
            {
              "label": "Precisión",
              "valueKey": "accuracy"
            }
          ]
        },
        "tips": {
          "title": "Consejos Divertidos",
          "items": [
            "¡Esto es solo para entretenimiento — no es una predicción médica!",
            "Se dice que el calendario tiene más de 700 años de la Dinastía Qing",
            "La edad lunar típicamente es 1-2 años mayor que tu edad real",
            "Para el resultado más preciso, usa tu fecha exacta de concepción"
          ]
        }
      },
      "detailedTable": {
        "genderChart": {
          "button": "Ver Calendario Completo de Género",
          "title": "Calendario de Predicción de Género Chino",
          "columns": {
            "age": "Edad Lunar",
            "m1": "Ene",
            "m2": "Feb",
            "m3": "Mar",
            "m4": "Abr",
            "m5": "May",
            "m6": "Jun",
            "m7": "Jul",
            "m8": "Ago",
            "m9": "Sep",
            "m10": "Oct",
            "m11": "Nov",
            "m12": "Dec"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es el Predictor de Género Chino?",
          "content": "El Predictor de Género Chino, también conocido como el Calendario Chino de Nacimiento o Calendario Chino de Género, es un método tradicional usado para predecir el género de un bebé basado en la edad lunar de la madre al momento de la concepción y el mes lunar de concepción. La leyenda dice que este calendario tiene más de 700 años y fue descubierto en una tumba real cerca de Beijing durante la Dinastía Qing (1644–1911 d.C.). El calendario está basado en el I Ching (Libro de los Cambios) e incorpora los principios del Yin y Yang, los Cinco Elementos (Metal, Agua, Madera, Fuego, Tierra), y los Ocho Trigramas. Aunque no tiene respaldo científico y ofrece aproximadamente una probabilidad de 50/50 de ser correcto, millones de padres en todo el mundo lo usan como una forma divertida de adivinar el género de su bebé durante el embarazo."
        },
        "howItWorks": {
          "title": "¿Cómo Funciona el Método del Calendario Lunar?",
          "content": "El Predictor de Género Chino se basa en el Calendario Lunar Chino, que es fundamentalmente diferente del calendario Gregoriano Occidental que usamos diariamente. El calendario lunar sigue los ciclos de la luna, con meses alternando entre 29 y 30 días. Tu 'edad lunar' también se calcula de manera diferente — en la tradición china, eres considerado de 1 año al nacer (contando el tiempo en el vientre), y todos ganan un año en el Año Nuevo Chino en lugar de en su cumpleaños. Esto significa que tu edad lunar típicamente es de 1 a 2 años mayor que tu edad occidental. Nuestra calculadora maneja automáticamente todas estas conversiones por ti. Toma tu fecha de nacimiento gregoriana y fecha de concepción, las convierte a sus equivalentes lunares, y las cruza con el auténtico calendario de la Dinastía Qing para darte una predicción."
        },
        "considerations": {
          "title": "Cosas Importantes a Saber",
          "items": [
            {
              "text": "Esta es una herramienta de entretenimiento — la precisión es aproximadamente 50%, como lanzar una moneda",
              "type": "warning"
            },
            {
              "text": "El calendario usa edad lunar, que es 1-2 años mayor que tu edad real",
              "type": "info"
            },
            {
              "text": "La concepción típicamente ocurre 14 días después del primer día de tu último período",
              "type": "info"
            },
            {
              "text": "Si la concepción fue cerca del final de un mes, prueba ambos meses — las fechas lunares cambian a mediados de mes",
              "type": "info"
            },
            {
              "text": "Para determinación de género médicamente precisa, usa ultrasonido (semana 20) o pruebas genéticas",
              "type": "warning"
            },
            {
              "text": "El calendario funciona para edades 18-45 y embarazos únicos solamente — no está diseñado para gemelos",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Métodos Científicos vs. Cuentos de Viejas",
          "items": [
            {
              "text": "Ecografía (semana 18-22): ~99% precisión para determinación de género",
              "type": "info"
            },
            {
              "text": "Prueba de sangre NIPT (semana 10+): ~99% precisión, también detecta condiciones cromosómicas",
              "type": "info"
            },
            {
              "text": "Amniocentesis (semana 15-20): 100% precisión pero invasivo, usado por razones médicas",
              "type": "info"
            },
            {
              "text": "Calendario Chino de Género: ~50% precisión — folklore divertido, no consejo médico",
              "type": "info"
            },
            {
              "text": "Mito del ritmo cardíaco (>140 = niña): desmentido por múltiples estudios, no hay correlación",
              "type": "warning"
            },
            {
              "text": "Mito de los antojos (dulce = niña, salado = niño): no hay evidencia científica",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo",
          "description": "Ejemplos paso a paso de cómo funciona la conversión lunar y la predicción",
          "examples": [
            {
              "title": "Ejemplo: Prediciendo Género",
              "steps": [
                "Madre nacida: 15 de Marzo, 1994 → Cumpleaños lunar: 4 de Feb, 1994 (Año Lunar 4691)",
                "Concepción: Junio 2025 → Mes lunar: 5to mes",
                "Edad lunar en concepción: 2025 - 1994 + 1 = 32 años (conteo chino)",
                "Referencia cruzada: Edad 32, Mes 5 en el calendario → Resultado: NIÑO 👦"
              ],
              "result": "Predicción del calendario: Niño"
            },
            {
              "title": "Ejemplo: Planificando Mejores Meses",
              "steps": [
                "Madre nacida: 20 de Noviembre, 1996 → Edad lunar en 2026 será 31",
                "Género preferido: Niña 👧",
                "Revisar todos los 12 meses en la fila del calendario para edad 31: Ene(N), Feb(N), Mar(Ñ), Abr(N), May(Ñ)...",
                "Meses prediciendo Niña: Marzo, Mayo, Septiembre → Planificar concepción en consecuencia"
              ],
              "result": "Mejores meses para una niña: Marzo, Mayo, Septiembre 2026"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Qué tan preciso es el Predictor de Género Chino?",
          "answer": "El Predictor de Género Chino no tiene respaldo científico. Los estudios muestran que tiene aproximadamente 50% de precisión — lo mismo que lanzar una moneda. Un estudio de 2009 publicado en el American Journal of Obstetrics & Gynecology no encontró significancia estadística en las predicciones del calendario. Aunque algunos padres reportan que fue correcto para ellos, esto probablemente es coincidencia. Úsalo solo para diversión, y confía en el ultrasonido o pruebas genéticas (NIPT) para resultados médicamente precisos."
        },
        {
          "question": "¿Qué es la 'edad lunar' y por qué es diferente de mi edad real?",
          "answer": "En el calendario lunar chino, tu edad se calcula de manera diferente. Eres considerado de 1 año al nacer (contando el tiempo en el vientre), y todos ganan un año en el Año Nuevo Chino — no en su cumpleaños. Esto significa que tu edad lunar típicamente es 1-2 años mayor que tu edad occidental (Gregoriana). Nuestra calculadora automáticamente convierte tu fecha de nacimiento para calcular tu edad lunar correcta."
        },
        {
          "question": "¿Puedo usar esto para elegir el género de mi bebé?",
          "answer": "El Calendario Chino de Género a veces se usa para 'selección de género' — elegir en qué meses intentar concebir para obtener un género específico. Nuestro Modo de Planificación te muestra qué meses predicen niño vs. niña. Sin embargo, esto es puramente folklore. El sexo de un bebé está determinado por si el espermatozoide porta un cromosoma X o Y, y el calendario lunar no tiene influencia alguna en este proceso biológico."
        },
        {
          "question": "¿Funciona el Calendario Chino de Género para gemelos?",
          "answer": "El calendario está diseñado solo para embarazos únicos. Para gemelos, especialmente gemelos fraternos (que pueden ser de diferentes géneros), el calendario no puede predecir con precisión. Como solo usa la edad de la madre y el mes de concepción, da una respuesta — que podría coincidir con un gemelo pero no con el otro."
        },
        {
          "question": "¿Qué pasa si mi fecha de concepción fue cerca del final de un mes?",
          "answer": "Si la concepción ocurrió cerca del final o principio de un mes occidental, el mes lunar correspondiente podría ser diferente. Los meses lunares no se alinean exactamente con los meses gregorianos. Nuestra calculadora maneja esta conversión automáticamente, pero si tu concepción fue justo en el límite de un mes, podrías probar revisando ambos meses adyacentes para ver si la predicción cambia."
        },
        {
          "question": "¿Cuál es el animal del zodíaco chino para mi bebé?",
          "answer": "El Zodíaco Chino sigue un ciclo de 12 años, con cada año asociado con un animal: Rata, Buey, Tigre, Conejo, Dragón, Serpiente, Caballo, Cabra, Mono, Gallo, Perro, y Cerdo. Nuestra calculadora automáticamente muestra el animal zodiacal de tu bebé basado en su año esperado de nacimiento. Por ejemplo, los bebés nacidos en el Año de la Serpiente (2025) se cree que son sabios, intuitivos, y elegantes."
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
      "name": "Preditor de Gênero Chinês",
      "slug": "calculadora-preditor-genero-chines",
      "subtitle": "Preveja o gênero do seu bebê usando o antigo calendário lunar chinês — com modo de planejamento e insights do zodíaco.",
      "breadcrumb": "Preditor de Gênero",
      "seo": {
        "title": "Preditor de Gênero Chinês - Calendário Lunar Gratuito 2026",
        "description": "Preveja o gênero do seu bebê com o antigo calendário chinês. Conversão lunar automática, modo de planejamento para conceber menino ou menina, e zodíaco chinês — gratuito e divertido!",
        "shortDescription": "Previsão de gênero chinês baseada no calendário lunar",
        "keywords": [
          "preditor gênero chinês",
          "calendário gênero chinês",
          "preditor gênero bebê",
          "calendário chinês menino ou menina",
          "previsão gênero lunar",
          "preditor gênero gratuito",
          "calendário nascimento chinês 2026",
          "calculadora menino ou menina"
        ]
      },
      "inputs": {
        "mode": {
          "label": "O que você gostaria de fazer?",
          "helpText": "",
          "options": {
            "predict": "🔮 Prever Gênero do Bebê",
            "plan": "📅 Planejar Melhores Meses"
          }
        },
        "birthYear": {
          "label": "Ano de Nascimento da Mãe",
          "helpText": ""
        },
        "birthMonth": {
          "label": "Mês de Nascimento da Mãe",
          "helpText": "",
          "options": {
            "1": "Janeiro",
            "2": "Fevereiro",
            "3": "Março",
            "4": "Abril",
            "5": "Maio",
            "6": "Junho",
            "7": "Julho",
            "8": "Agosto",
            "9": "Setembro",
            "10": "Outubro",
            "11": "Novembro",
            "12": "Dezembro"
          }
        },
        "conceptionYear": {
          "label": "Ano da Concepção",
          "helpText": ""
        },
        "conceptionMonth": {
          "label": "Mês da Concepção",
          "helpText": "",
          "options": {
            "1": "Janeiro",
            "2": "Fevereiro",
            "3": "Março",
            "4": "Abril",
            "5": "Maio",
            "6": "Junho",
            "7": "Julho",
            "8": "Agosto",
            "9": "Setembro",
            "10": "Outubro",
            "11": "Novembro",
            "12": "Dezembro"
          }
        },
        "planYear": {
          "label": "Ano que Planeja Conceber",
          "helpText": ""
        },
        "preferredGender": {
          "label": "Eu quero ter um...",
          "helpText": "",
          "options": {
            "boy": "👦 Menino",
            "girl": "👧 Menina"
          }
        }
      },
      "results": {
        "prediction": {
          "label": "Previsão"
        },
        "lunarAge": {
          "label": "Idade Lunar"
        },
        "lunarMonth": {
          "label": "Mês Lunar"
        },
        "zodiac": {
          "label": "Zodíaco Chinês do Bebê"
        },
        "bestMonths": {
          "label": "Melhores Meses"
        }
      },
      "presets": {
        "youngMomSpring": {
          "label": "Mãe Jovem, Primavera",
          "description": "Nascida em 1998, conceber em março 2025"
        },
        "midThirtiesFall": {
          "label": "30 e Poucos, Outono",
          "description": "Nascida em 1991, conceber em outubro 2025"
        },
        "planForBoy": {
          "label": "Planejar para Menino",
          "description": "Encontrar melhores meses para menino em 2025"
        },
        "planForGirl": {
          "label": "Planejar para Menina",
          "description": "Encontrar melhores meses para menina em 2026"
        }
      },
      "values": {
        "boy": "Menino",
        "girl": "Menina",
        "years": "anos",
        "lunar": "lunar",
        "boyEmoji": "👦",
        "girlEmoji": "👧",
        "months": "meses",
        "month": "Mês",
        "planningFor": "Planejando para",
        "allMonthsChecked": "Todos os meses verificados",
        "noneFound": "Nenhum encontrado",
        "ifBorn": "se nascer em",
        "method": "Carta da Dinastia Qing (700+ anos)",
        "calendarSystem": "Calendário Lunissolar Chinês",
        "ageRange": "18 – 45 anos",
        "accuracy": "~50% (apenas entretenimento)",
        "prediction": "Previsão",
        "bestMonthsFor": "Melhores meses para",
        "in": "em",
        "Jan": "Jan", "Feb": "Fev", "Mar": "Mar", "Apr": "Abr",
        "May": "Mai", "Jun": "Jun", "Jul": "Jul", "Aug": "Ago",
        "Sep": "Set", "Oct": "Out", "Nov": "Nov", "Dec": "Dez"
      },
      "formats": {
        "summary": "O Calendário Chinês prevê: {value}!",
        "planSummary": "Melhores meses para conceber um(a) {gender} em {year}: {months}"
      },
      "infoCards": {
        "metrics": {
          "title": "Detalhes da Previsão",
          "items": [
            {
              "label": "Gênero Previsto",
              "valueKey": "prediction"
            },
            {
              "label": "Idade Lunar da Mãe",
              "valueKey": "lunarAge"
            },
            {
              "label": "Mês Lunar da Concepção",
              "valueKey": "lunarMonth"
            },
            {
              "label": "Zodíaco Chinês do Bebê",
              "valueKey": "zodiac"
            }
          ]
        },
        "details": {
          "title": "Detalhes do Calendário",
          "items": [
            {
              "label": "Método do Calendário",
              "valueKey": "method"
            },
            {
              "label": "Sistema de Calendário",
              "valueKey": "calendarSystem"
            },
            {
              "label": "Faixa Etária do Calendário",
              "valueKey": "ageRange"
            },
            {
              "label": "Precisão",
              "valueKey": "accuracy"
            }
          ]
        },
        "tips": {
          "title": "Dicas Divertidas",
          "items": [
            "Isso é apenas para entretenimento — não é uma previsão médica!",
            "Diz-se que o calendário tem mais de 700 anos da Dinastia Qing",
            "A idade lunar é tipicamente 1-2 anos mais velha que sua idade real",
            "Para o resultado mais preciso, use sua data exata de concepção"
          ]
        }
      },
      "detailedTable": {
        "genderChart": {
          "button": "Ver Calendário Completo",
          "title": "Calendário Chinês de Previsão de Gênero",
          "columns": {
            "age": "Idade Lunar",
            "m1": "Jan",
            "m2": "Fev",
            "m3": "Mar",
            "m4": "Abr",
            "m5": "Mai",
            "m6": "Jun",
            "m7": "Jul",
            "m8": "Ago",
            "m9": "Set",
            "m10": "Out",
            "m11": "Nov",
            "m12": "Dez"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é o Preditor de Gênero Chinês?",
          "content": "O Preditor de Gênero Chinês, também conhecido como Calendário de Nascimento Chinês ou Calendário de Gênero Chinês, é um método tradicional usado para prever o gênero do bebê baseado na idade lunar da mãe na concepção e no mês lunar da concepção. A lenda diz que este calendário tem mais de 700 anos e foi descoberto em uma tumba real perto de Pequim durante a Dinastia Qing (1644–1911 d.C.). O calendário é baseado no I Ching (Livro das Mutações) e incorpora os princípios do Yin e Yang, os Cinco Elementos (Metal, Água, Madeira, Fogo, Terra) e os Oito Trigramas. Embora não tenha respaldo científico e ofereça aproximadamente 50% de chance de estar correto, milhões de pais em todo o mundo o usam como uma forma divertida de adivinhar o gênero do bebê durante a gravidez."
        },
        "howItWorks": {
          "title": "Como Funciona o Método do Calendário Lunar?",
          "content": "O Preditor de Gênero Chinês baseia-se no Calendário Lunar Chinês, que é fundamentalmente diferente do calendário gregoriano ocidental que usamos diariamente. O calendário lunar segue os ciclos da lua, com meses alternando entre 29 e 30 dias. Sua 'idade lunar' também é calculada de forma diferente — na tradição chinesa, você é considerado 1 ano de idade ao nascer (contando o tempo no útero), e todos ganham um ano no Ano Novo Chinês em vez do aniversário. Isso significa que sua idade lunar é tipicamente 1 a 2 anos mais velha que sua idade ocidental. Nossa calculadora automaticamente lida com todas essas conversões para você. Ela pega sua data de nascimento gregoriana e data de concepção, converte-as para seus equivalentes lunares, e faz referência cruzada no autêntico calendário da Dinastia Qing para dar uma previsão."
        },
        "considerations": {
          "title": "Coisas Importantes para Saber",
          "items": [
            {
              "text": "Esta é uma ferramenta de entretenimento — a precisão é aproximadamente 50%, como jogar uma moeda",
              "type": "warning"
            },
            {
              "text": "O calendário usa idade lunar, que é 1-2 anos mais velha que sua idade real",
              "type": "info"
            },
            {
              "text": "A concepção normalmente ocorre 14 dias após o primeiro dia da última menstruação",
              "type": "info"
            },
            {
              "text": "Se a concepção foi próxima ao fim do mês, teste ambos os meses — datas lunares mudam no meio do mês",
              "type": "info"
            },
            {
              "text": "Para determinação de gênero medicamente precisa, use ultrassom (semana 20) ou teste genético",
              "type": "warning"
            },
            {
              "text": "O calendário funciona para idades 18-45 e gravidezes únicas apenas — não foi projetado para gêmeos",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Métodos Científicos vs. Crenças Populares",
          "items": [
            {
              "text": "Ultrassom (semana 18-22): ~99% preciso para determinação de gênero",
              "type": "info"
            },
            {
              "text": "Teste de sangue NIPT (semana 10+): ~99% preciso, também rastreia condições cromossômicas",
              "type": "info"
            },
            {
              "text": "Amniocentese (semana 15-20): 100% preciso mas invasivo, usado por razões médicas",
              "type": "info"
            },
            {
              "text": "Calendário Chinês: ~50% precisão — folclore divertido, não conselho médico",
              "type": "info"
            },
            {
              "text": "Mito dos batimentos (>140 = menina): desmentido por múltiplos estudos, nenhuma correlação encontrada",
              "type": "warning"
            },
            {
              "text": "Mito dos desejos (doce = menina, salgado = menino): nenhuma evidência científica",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo",
          "description": "Exemplos passo a passo de como funciona a conversão lunar e previsão",
          "examples": [
            {
              "title": "Exemplo: Prevendo Gênero",
              "steps": [
                "Mãe nascida: 15 de março de 1994 → Aniversário lunar: 4 de fevereiro de 1994 (Ano Lunar 4691)",
                "Concepção: junho de 2025 → Mês lunar: 5º mês",
                "Idade lunar na concepção: 2025 - 1994 + 1 = 32 anos (contagem chinesa)",
                "Referência cruzada: Idade 32, Mês 5 no calendário → Resultado: MENINO 👦"
              ],
              "result": "Previsão do calendário: Menino"
            },
            {
              "title": "Exemplo: Planejando Melhores Meses",
              "steps": [
                "Mãe nascida: 20 de novembro de 1996 → Idade lunar em 2026 será 31",
                "Gênero preferido: Menina 👧",
                "Verificar todos os 12 meses na linha do calendário para idade 31: Jan(M), Fev(M), Mar(F), Abr(M), Mai(F)...",
                "Meses prevendo Menina: março, maio, setembro → Planejar concepção adequadamente"
              ],
              "result": "Melhores meses para uma menina: março, maio, setembro 2026"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quão preciso é o Preditor de Gênero Chinês?",
          "answer": "O Preditor de Gênero Chinês não tem respaldo científico. Estudos mostram que tem aproximadamente 50% de precisão — o mesmo que jogar uma moeda. Um estudo de 2009 publicado no American Journal of Obstetrics & Gynecology não encontrou significância estatística nas previsões do calendário. Embora alguns pais relatem que foi correto para eles, isso é provavelmente coincidência. Use apenas para diversão, e confie em ultrassom ou teste genético (NIPT) para resultados medicamente precisos."
        },
        {
          "question": "O que é 'idade lunar' e por que é diferente da minha idade real?",
          "answer": "No calendário lunar chinês, sua idade é calculada de forma diferente. Você é considerado 1 ano de idade ao nascer (contando o tempo no útero), e todos ganham um ano no Ano Novo Chinês — não no aniversário. Isso significa que sua idade lunar é tipicamente 1-2 anos mais velha que sua idade ocidental (gregoriana). Nossa calculadora automaticamente converte sua data de nascimento para calcular sua idade lunar correta."
        },
        {
          "question": "Posso usar isso para escolher o gênero do meu bebê?",
          "answer": "O Calendário Chinês às vezes é usado para 'seleção de gênero' — escolhendo quais meses tentar conceber para ter um gênero específico. Nosso Modo de Planejamento mostra quais meses preveem menino vs. menina. No entanto, isso é puramente folclore. O sexo do bebê é determinado pelo espermatozoide carregar cromossomo X ou Y, e o calendário lunar não tem influência zero neste processo biológico."
        },
        {
          "question": "O Calendário Chinês funciona para gêmeos?",
          "answer": "O calendário é projetado apenas para gravidezes únicas. Para gêmeos, especialmente gêmeos fraternos (que podem ser de gêneros diferentes), o calendário não pode prever com precisão. Como usa apenas a idade da mãe e mês de concepção, dá uma resposta — que poderia corresponder a um gêmeo mas não ao outro."
        },
        {
          "question": "E se minha data de concepção foi próxima ao fim do mês?",
          "answer": "Se a concepção ocorreu próxima ao fim ou início de um mês ocidental, o mês lunar correspondente pode ser diferente. Meses lunares não se alinham exatamente com meses gregorianos. Nossa calculadora lida com essa conversão automaticamente, mas se sua concepção foi bem na fronteira de um mês, você pode tentar verificar ambos os meses adjacentes para ver se a previsão muda."
        },
        {
          "question": "Qual é o animal do Zodíaco Chinês para meu bebê?",
          "answer": "O Zodíaco Chinês segue um ciclo de 12 anos, com cada ano associado a um animal: Rato, Boi, Tigre, Coelho, Dragão, Serpente, Cavalo, Cabra, Macaco, Galo, Cão e Porco. Nossa calculadora automaticamente mostra o animal zodiacal do seu bebê baseado no ano esperado de nascimento. Por exemplo, bebês nascidos no Ano da Serpente (2025) são considerados sábios, intuitivos e elegantes."
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
      "name": "Prédicteur de Sexe Chinois",
      "slug": "calculateur-predicteur-sexe-chinois",
      "subtitle": "Prédisez le sexe de votre bébé avec l'ancien calendrier lunaire chinois — avec mode planification et aperçus du zodiaque.",
      "breadcrumb": "Prédicteur de Sexe",
      "seo": {
        "title": "Prédicteur de Sexe Chinois - Calendrier Lunaire Gratuit 2026",
        "description": "Prédisez le sexe de votre bébé avec l'ancien calendrier de naissance chinois. Conversion lunaire automatique, mode planification pour concevoir un garçon ou une fille, et zodiaque chinois — gratuit et amusant !",
        "shortDescription": "Prédiction du sexe selon le calendrier lunaire chinois",
        "keywords": [
          "prédicteur sexe chinois",
          "calendrier sexe chinois",
          "prédicteur sexe bébé",
          "calendrier chinois garçon ou fille",
          "prédiction sexe calendrier lunaire",
          "prédicteur sexe gratuit",
          "calendrier naissance chinois 2026",
          "calculateur garçon ou fille"
        ]
      },
      "inputs": {
        "mode": {
          "label": "Que souhaitez-vous faire ?",
          "helpText": "",
          "options": {
            "predict": "🔮 Prédire le Sexe du Bébé",
            "plan": "📅 Planifier les Meilleurs Mois"
          }
        },
        "birthYear": {
          "label": "Année de Naissance de la Mère",
          "helpText": ""
        },
        "birthMonth": {
          "label": "Mois de Naissance de la Mère",
          "helpText": "",
          "options": {
            "1": "Janvier",
            "2": "Février",
            "3": "Mars",
            "4": "Avril",
            "5": "Mai",
            "6": "Juin",
            "7": "Juillet",
            "8": "Août",
            "9": "Septembre",
            "10": "Octobre",
            "11": "Novembre",
            "12": "Décembre"
          }
        },
        "conceptionYear": {
          "label": "Année de Conception",
          "helpText": ""
        },
        "conceptionMonth": {
          "label": "Mois de Conception",
          "helpText": "",
          "options": {
            "1": "Janvier",
            "2": "Février",
            "3": "Mars",
            "4": "Avril",
            "5": "Mai",
            "6": "Juin",
            "7": "Juillet",
            "8": "Août",
            "9": "Septembre",
            "10": "Octobre",
            "11": "Novembre",
            "12": "Décembre"
          }
        },
        "planYear": {
          "label": "Année Prévue pour Concevoir",
          "helpText": ""
        },
        "preferredGender": {
          "label": "Je souhaite avoir un...",
          "helpText": "",
          "options": {
            "boy": "👦 Garçon",
            "girl": "👧 Fille"
          }
        }
      },
      "results": {
        "prediction": {
          "label": "Prédiction"
        },
        "lunarAge": {
          "label": "Âge Lunaire"
        },
        "lunarMonth": {
          "label": "Mois Lunaire"
        },
        "zodiac": {
          "label": "Zodiaque Chinois du Bébé"
        },
        "bestMonths": {
          "label": "Meilleurs Mois"
        }
      },
      "presets": {
        "youngMomSpring": {
          "label": "Jeune Maman, Printemps",
          "description": "Née en 1998, conception mars 2025"
        },
        "midThirtiesFall": {
          "label": "Milieu Trentaine, Automne",
          "description": "Née en 1991, conception octobre 2025"
        },
        "planForBoy": {
          "label": "Planifier pour Garçon",
          "description": "Trouver les meilleurs mois pour un garçon en 2025"
        },
        "planForGirl": {
          "label": "Planifier pour Fille",
          "description": "Trouver les meilleurs mois pour une fille en 2026"
        }
      },
      "values": {
        "boy": "Garçon",
        "girl": "Fille",
        "years": "années",
        "lunar": "lunaire",
        "boyEmoji": "👦",
        "girlEmoji": "👧",
        "months": "mois",
        "month": "Mois",
        "planningFor": "Planification pour",
        "allMonthsChecked": "Tous les mois vérifiés",
        "noneFound": "Aucun trouvé",
        "ifBorn": "si né(e) en",
        "method": "Carte de la Dynastie Qing (700+ ans)",
        "calendarSystem": "Calendrier Luni-solaire Chinois",
        "ageRange": "18 – 45 ans",
        "accuracy": "~50% (divertissement uniquement)",
        "prediction": "Prédiction",
        "bestMonthsFor": "Meilleurs mois pour",
        "in": "en",
        "Jan": "Jan", "Feb": "Fév", "Mar": "Mar", "Apr": "Avr",
        "May": "Mai", "Jun": "Juin", "Jul": "Juil", "Aug": "Août",
        "Sep": "Sep", "Oct": "Oct", "Nov": "Nov", "Dec": "Déc"
      },
      "formats": {
        "summary": "Le Calendrier Chinois prédit : {value} !",
        "planSummary": "Meilleurs mois pour concevoir un(e) {gender} en {year} : {months}"
      },
      "infoCards": {
        "metrics": {
          "title": "Détails de la Prédiction",
          "items": [
            {
              "label": "Sexe Prédit",
              "valueKey": "prediction"
            },
            {
              "label": "Âge Lunaire de la Mère",
              "valueKey": "lunarAge"
            },
            {
              "label": "Mois Lunaire de Conception",
              "valueKey": "lunarMonth"
            },
            {
              "label": "Zodiaque Chinois du Bébé",
              "valueKey": "zodiac"
            }
          ]
        },
        "details": {
          "title": "Détails du Calendrier",
          "items": [
            {
              "label": "Méthode du Calendrier",
              "valueKey": "method"
            },
            {
              "label": "Système de Calendrier",
              "valueKey": "calendarSystem"
            },
            {
              "label": "Tranche d'Âge du Calendrier",
              "valueKey": "ageRange"
            },
            {
              "label": "Précision",
              "valueKey": "accuracy"
            }
          ]
        },
        "tips": {
          "title": "Conseils Amusants",
          "items": [
            "Ceci est uniquement pour le divertissement — pas une prédiction médicale !",
            "Le calendrier aurait plus de 700 ans et daterait de la dynastie Qing",
            "L'âge lunaire est généralement 1 à 2 ans plus âgé que votre âge réel",
            "Pour un résultat plus précis, utilisez votre date exacte de conception"
          ]
        }
      },
      "detailedTable": {
        "genderChart": {
          "button": "Voir le Calendrier Complet",
          "title": "Calendrier de Prédiction du Sexe Chinois",
          "columns": {
            "age": "Âge Lunaire",
            "m1": "Jan",
            "m2": "Fév",
            "m3": "Mar",
            "m4": "Avr",
            "m5": "Mai",
            "m6": "Juin",
            "m7": "Juil",
            "m8": "Août",
            "m9": "Sep",
            "m10": "Oct",
            "m11": "Nov",
            "m12": "Déc"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que le Prédicteur de Sexe Chinois ?",
          "content": "Le Prédicteur de Sexe Chinois, également connu sous le nom de Calendrier de Naissance Chinois ou Calendrier du Sexe Chinois, est une méthode traditionnelle utilisée pour prédire le sexe d'un bébé basée sur l'âge lunaire de la mère au moment de la conception et le mois lunaire de conception. La légende raconte que ce calendrier a plus de 700 ans et fut découvert dans une tombe royale près de Pékin durant la dynastie Qing (1644-1911). Le calendrier est basé sur le Yi Jing (Livre des Mutations) et incorpore les principes du Yin et Yang, les Cinq Éléments (Métal, Eau, Bois, Feu, Terre), et les Huit Trigrammes. Bien qu'il n'ait aucun fondement scientifique et offre environ 50/50 chances d'être correct, des millions de parents dans le monde l'utilisent comme un moyen amusant de deviner le sexe de leur bébé pendant la grossesse."
        },
        "howItWorks": {
          "title": "Comment Fonctionne la Méthode du Calendrier Lunaire ?",
          "content": "Le Prédicteur de Sexe Chinois s'appuie sur le Calendrier Lunaire Chinois, qui est fondamentalement différent du calendrier grégorien occidental que nous utilisons quotidiennement. Le calendrier lunaire suit les cycles de la lune, avec des mois alternant entre 29 et 30 jours. Votre 'âge lunaire' est calculé différemment aussi — dans la tradition chinoise, vous êtes considéré(e) comme ayant 1 an à la naissance (comptant le temps dans l'utérus), et tout le monde gagne une année au Nouvel An Chinois plutôt qu'à son anniversaire. Cela signifie que votre âge lunaire est généralement 1 à 2 ans plus âgé que votre âge occidental. Notre calculateur gère automatiquement toutes ces conversions pour vous. Il prend votre date de naissance grégorienne et votre date de conception, les convertit en leurs équivalents lunaires, et les croise sur l'authentique calendrier de la dynastie Qing pour vous donner une prédiction."
        },
        "considerations": {
          "title": "Points Importants à Retenir",
          "items": [
            {
              "text": "Ceci est un outil de divertissement — la précision est d'environ 50%, comme un pile ou face",
              "type": "warning"
            },
            {
              "text": "Le calendrier utilise l'âge lunaire, qui est 1-2 ans plus âgé que votre âge réel",
              "type": "info"
            },
            {
              "text": "La conception se produit généralement 14 jours après le premier jour de vos dernières règles",
              "type": "info"
            },
            {
              "text": "Si la conception était près de la fin d'un mois, essayez les deux mois — les dates lunaires changent mi-mois",
              "type": "info"
            },
            {
              "text": "Pour une détermination médicalement précise du sexe, utilisez l'échographie (semaine 20) ou les tests génétiques",
              "type": "warning"
            },
            {
              "text": "Le calendrier fonctionne pour les âges 18-45 et les grossesses simples uniquement — pas conçu pour les jumeaux",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Méthodes Scientifiques vs. Croyances Populaires",
          "items": [
            {
              "text": "Échographie (semaine 18-22) : ~99% de précision pour la détermination du sexe",
              "type": "info"
            },
            {
              "text": "Test sanguin DPNI (semaine 10+) : ~99% de précision, dépiste aussi les conditions chromosomiques",
              "type": "info"
            },
            {
              "text": "Amniocentèse (semaine 15-20) : 100% de précision mais invasive, utilisée pour des raisons médicales",
              "type": "info"
            },
            {
              "text": "Calendrier Chinois : ~50% de précision — folklore amusant, pas un conseil médical",
              "type": "info"
            },
            {
              "text": "Mythe du rythme cardiaque (>140 = fille) : démenti par plusieurs études, aucune corrélation trouvée",
              "type": "warning"
            },
            {
              "text": "Mythe des envies (sucré = fille, salé = garçon) : aucune preuve scientifique",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul",
          "description": "Exemples étape par étape de comment fonctionne la conversion lunaire et la prédiction",
          "examples": [
            {
              "title": "Exemple : Prédire le Sexe",
              "steps": [
                "Mère née : 15 mars 1994 → Anniversaire lunaire : 4 fév 1994 (Année Lunaire 4691)",
                "Conception : juin 2025 → Mois lunaire : 5ème mois",
                "Âge lunaire à la conception : 2025 - 1994 + 1 = 32 ans (comptage chinois)",
                "Référence croisée : Âge 32, Mois 5 sur le calendrier → Résultat : GARÇON 👦"
              ],
              "result": "Prédiction du calendrier : Garçon"
            },
            {
              "title": "Exemple : Planifier les Meilleurs Mois",
              "steps": [
                "Mère née : 20 novembre 1996 → Âge lunaire en 2026 sera 31",
                "Sexe préféré : Fille 👧",
                "Vérifier tous les 12 mois dans la ligne du calendrier pour l'âge 31 : Jan(G), Fév(G), Mar(F), Avr(G), Mai(F)...",
                "Mois prédisant Fille : Mars, Mai, Septembre → Planifier la conception en conséquence"
              ],
              "result": "Meilleurs mois pour une fille : Mars, Mai, Septembre 2026"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle est la précision du Prédicteur de Sexe Chinois ?",
          "answer": "Le Prédicteur de Sexe Chinois n'a aucun fondement scientifique. Les études montrent qu'il a environ 50% de précision — la même chose que de lancer une pièce. Une étude de 2009 publiée dans l'American Journal of Obstetrics & Gynecology n'a trouvé aucune signification statistique dans les prédictions du calendrier. Bien que certains parents rapportent qu'il était correct pour eux, c'est probablement une coïncidence. Utilisez-le uniquement pour le plaisir, et comptez sur l'échographie ou les tests génétiques (DPNI) pour des résultats médicalement précis."
        },
        {
          "question": "Qu'est-ce que l'âge lunaire et pourquoi est-il différent de mon âge réel ?",
          "answer": "Dans le calendrier lunaire chinois, votre âge est calculé différemment. Vous êtes considéré(e) comme ayant 1 an à la naissance (comptant le temps passé dans l'utérus), et tout le monde gagne une année au Nouvel An Chinois — pas à son anniversaire. Cela signifie que votre âge lunaire est généralement 1-2 ans plus âgé que votre âge occidental (grégorien). Notre calculateur convertit automatiquement votre date de naissance pour calculer votre âge lunaire correct."
        },
        {
          "question": "Puis-je utiliser ceci pour choisir le sexe de mon bébé ?",
          "answer": "Le Calendrier Chinois est parfois utilisé pour la 'sélection du sexe' — choisir quels mois essayer de concevoir pour obtenir un sexe spécifique. Notre Mode Planification vous montre quels mois prédisent garçon vs fille. Cependant, c'est purement du folklore. Le sexe d'un bébé est déterminé par le fait que le spermatozoïde porte un chromosome X ou Y, et le calendrier lunaire n'a aucune influence sur ce processus biologique."
        },
        {
          "question": "Le Calendrier Chinois fonctionne-t-il pour les jumeaux ?",
          "answer": "Le calendrier est conçu pour les grossesses simples uniquement. Pour les jumeaux, en particulier les jumeaux fraternels (qui peuvent être de sexes différents), le calendrier ne peut pas prédire avec précision. Puisqu'il utilise seulement l'âge de la mère et le mois de conception, il donne une réponse — qui pourrait correspondre à un jumeau mais pas à l'autre."
        },
        {
          "question": "Que faire si ma date de conception était près de la fin d'un mois ?",
          "answer": "Si la conception s'est produite près de la fin ou du début d'un mois occidental, le mois lunaire correspondant pourrait être différent. Les mois lunaires ne s'alignent pas exactement avec les mois grégoriens. Notre calculateur gère cette conversion automatiquement, mais si votre conception était exactement à la limite d'un mois, vous pourriez essayer de vérifier les deux mois adjacents pour voir si la prédiction change."
        },
        {
          "question": "Quel est l'animal du zodiaque chinois pour mon bébé ?",
          "answer": "Le Zodiaque Chinois suit un cycle de 12 ans, avec chaque année associée à un animal : Rat, Bœuf, Tigre, Lapin, Dragon, Serpent, Cheval, Chèvre, Singe, Coq, Chien et Cochon. Notre calculateur montre automatiquement l'animal du zodiaque de votre bébé basé sur son année de naissance prévue. Par exemple, les bébés nés dans l'Année du Serpent (2025) sont censés être sages, intuitifs et élégants."
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
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      }
    },
    de: {
      "name": "Chinesischer Geschlechtsprediktor",
      "slug": "chinesischer-geschlechtsprediktor-rechner",
      "subtitle": "Sagen Sie das Geschlecht Ihres Babys mit dem alten chinesischen Mondkalender vorher — mit Planungsmodus und Tierkreis-Einblicken.",
      "breadcrumb": "Geschlechtsprediktor",
      "seo": {
        "title": "Chinesischer Geschlechtsprediktor - Kostenloser Mondkalender 2026",
        "description": "Sagen Sie das Geschlecht Ihres Babys mit der alten chinesischen Geburtstafel vorher. Auto-Mondkonversion, Planungsmodus für Junge oder Mädchen, und chinesisches Tierkreiszeichen — kostenlos und unterhaltsam!",
        "shortDescription": "Chinesische Geschlechtsvorhersage basierend auf dem Mondkalender",
        "keywords": [
          "chinesischer geschlechtsprediktor",
          "chinesische geschlechtstabelle",
          "baby geschlechtsprediktor",
          "chinesischer kalender junge oder mädchen",
          "mondkalender geschlechtsvorhersage",
          "kostenloser geschlechtsprediktor",
          "chinesische geburtstafel 2026",
          "baby junge oder mädchen rechner"
        ]
      },
      "inputs": {
        "mode": {
          "label": "Was möchten Sie tun?",
          "helpText": "",
          "options": {
            "predict": "🔮 Babygeschlecht vorhersagen",
            "plan": "📅 Beste Monate planen"
          }
        },
        "birthYear": {
          "label": "Geburtsjahr der Mutter",
          "helpText": ""
        },
        "birthMonth": {
          "label": "Geburtsmonat der Mutter",
          "helpText": "",
          "options": {
            "1": "Januar",
            "2": "Februar",
            "3": "März",
            "4": "April",
            "5": "Mai",
            "6": "Juni",
            "7": "Juli",
            "8": "August",
            "9": "September",
            "10": "Oktober",
            "11": "November",
            "12": "Dezember"
          }
        },
        "conceptionYear": {
          "label": "Empfängnisjahr",
          "helpText": ""
        },
        "conceptionMonth": {
          "label": "Empfängnismonat",
          "helpText": "",
          "options": {
            "1": "Januar",
            "2": "Februar",
            "3": "März",
            "4": "April",
            "5": "Mai",
            "6": "Juni",
            "7": "Juli",
            "8": "August",
            "9": "September",
            "10": "Oktober",
            "11": "November",
            "12": "Dezember"
          }
        },
        "planYear": {
          "label": "Jahr, in dem Sie eine Empfängnis planen",
          "helpText": ""
        },
        "preferredGender": {
          "label": "Ich möchte ein...",
          "helpText": "",
          "options": {
            "boy": "👦 Junge",
            "girl": "👧 Mädchen"
          }
        }
      },
      "results": {
        "prediction": {
          "label": "Vorhersage"
        },
        "lunarAge": {
          "label": "Mondalter"
        },
        "lunarMonth": {
          "label": "Mondmonat"
        },
        "zodiac": {
          "label": "Chinesisches Tierkreiszeichen des Babys"
        },
        "bestMonths": {
          "label": "Beste Monate"
        }
      },
      "presets": {
        "youngMomSpring": {
          "label": "Junge Mutter, Frühling",
          "description": "Geboren 1998, Empfängnis März 2025"
        },
        "midThirtiesFall": {
          "label": "Mitte 30, Herbst",
          "description": "Geboren 1991, Empfängnis Oktober 2025"
        },
        "planForBoy": {
          "label": "Für Junge planen",
          "description": "Beste Monate für einen Jungen in 2025 finden"
        },
        "planForGirl": {
          "label": "Für Mädchen planen",
          "description": "Beste Monate für ein Mädchen in 2026 finden"
        }
      },
      "values": {
        "boy": "Junge",
        "girl": "Mädchen",
        "years": "Jahre",
        "lunar": "Mond",
        "boyEmoji": "👦",
        "girlEmoji": "👧",
        "months": "Monate",
        "month": "Monat",
        "planningFor": "Planung für",
        "allMonthsChecked": "Alle Monate geprüft",
        "noneFound": "Keiner gefunden",
        "ifBorn": "wenn geboren",
        "method": "Qing-Dynastie-Karte (700+ Jahre)",
        "calendarSystem": "Chinesischer Lunisolarer Kalender",
        "ageRange": "18 – 45 Jahre",
        "accuracy": "~50% (nur Unterhaltung)",
        "prediction": "Vorhersage",
        "bestMonthsFor": "Beste Monate für",
        "in": "in",
        "Jan": "Jan", "Feb": "Feb", "Mar": "Mär", "Apr": "Apr",
        "May": "Mai", "Jun": "Jun", "Jul": "Jul", "Aug": "Aug",
        "Sep": "Sep", "Oct": "Okt", "Nov": "Nov", "Dec": "Dez"
      },
      "formats": {
        "summary": "Die chinesische Geschlechtstafel sagt vorher: {value}!",
        "planSummary": "Beste Monate für die Empfängnis eines {gender} in {year}: {months}"
      },
      "infoCards": {
        "metrics": {
          "title": "Vorhersagedetails",
          "items": [
            {
              "label": "Vorhergesagtes Geschlecht",
              "valueKey": "prediction"
            },
            {
              "label": "Mondalter der Mutter",
              "valueKey": "lunarAge"
            },
            {
              "label": "Mond-Empfängnismonat",
              "valueKey": "lunarMonth"
            },
            {
              "label": "Chinesisches Tierkreiszeichen des Babys",
              "valueKey": "zodiac"
            }
          ]
        },
        "details": {
          "title": "Tafeldetails",
          "items": [
            {
              "label": "Tafelmethode",
              "valueKey": "method"
            },
            {
              "label": "Kalendersystem",
              "valueKey": "calendarSystem"
            },
            {
              "label": "Tafel-Altersbereich",
              "valueKey": "ageRange"
            },
            {
              "label": "Genauigkeit",
              "valueKey": "accuracy"
            }
          ]
        },
        "tips": {
          "title": "Lustige Tipps",
          "items": [
            "Dies dient nur der Unterhaltung — keine medizinische Vorhersage!",
            "Die Tafel soll über 700 Jahre alt sein und aus der Qing-Dynastie stammen",
            "Das Mondalter ist normalerweise 1-2 Jahre älter als Ihr tatsächliches Alter",
            "Verwenden Sie für das genaueste Ergebnis Ihr exaktes Empfängnisdatum"
          ]
        }
      },
      "detailedTable": {
        "genderChart": {
          "button": "Vollständige Geschlechtstafel anzeigen",
          "title": "Chinesische Geschlechtsvorhersage-Tafel",
          "columns": {
            "age": "Mondalter",
            "m1": "Jan",
            "m2": "Feb",
            "m3": "Mär",
            "m4": "Apr",
            "m5": "Mai",
            "m6": "Jun",
            "m7": "Jul",
            "m8": "Aug",
            "m9": "Sep",
            "m10": "Okt",
            "m11": "Nov",
            "m12": "Dez"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist der chinesische Geschlechtsprediktor?",
          "content": "Der chinesische Geschlechtsprediktor, auch als chinesische Geburtstafel oder chinesischer Geschlechtskalender bekannt, ist eine traditionelle Methode zur Vorhersage des Geschlechts eines Babys basierend auf dem Mondalter der Mutter bei der Empfängnis und dem Mondmonat der Empfängnis. Die Legende besagt, dass diese Tafel über 700 Jahre alt ist und in einem königlichen Grab nahe Peking während der Qing-Dynastie (1644–1911 n. Chr.) entdeckt wurde. Die Tafel basiert auf dem I Ging (Buch der Wandlungen) und integriert die Prinzipien von Yin und Yang, die Fünf Elemente (Metall, Wasser, Holz, Feuer, Erde) und die Acht Trigramme. Obwohl sie keine wissenschaftliche Grundlage hat und ungefähr eine 50/50-Chance bietet, richtig zu sein, nutzen Millionen von Eltern weltweit sie als unterhaltsame Art, das Geschlecht ihres Babys während der Schwangerschaft zu erraten."
        },
        "howItWorks": {
          "title": "Wie funktioniert die Mondkalender-Methode?",
          "content": "Der chinesische Geschlechtsprediktor stützt sich auf den chinesischen Mondkalender, der sich grundlegend vom westlichen gregorianischen Kalender unterscheidet, den wir täglich verwenden. Der Mondkalender folgt den Zyklen des Mondes, wobei die Monate zwischen 29 und 30 Tagen wechseln. Ihr 'Mondalter' wird auch anders berechnet — in der chinesischen Tradition gelten Sie bei der Geburt als 1 Jahr alt (die Zeit im Mutterleib wird mitgezählt), und jeder gewinnt ein Jahr zum chinesischen Neujahr anstatt am Geburtstag. Das bedeutet, dass Ihr Mondalter normalerweise 1 bis 2 Jahre älter ist als Ihr westliches Alter. Unser Rechner übernimmt automatisch alle diese Umrechnungen für Sie. Er nimmt Ihr gregorianisches Geburtsdatum und Empfängnisdatum, konvertiert sie in ihre Mondäquivalente und gleicht sie mit der authentischen Qing-Dynastie-Tafel ab, um Ihnen eine Vorhersage zu geben."
        },
        "considerations": {
          "title": "Wichtige Dinge, die Sie wissen sollten",
          "items": [
            {
              "text": "Dies ist ein Unterhaltungstool — die Genauigkeit beträgt etwa 50%, wie ein Münzwurf",
              "type": "warning"
            },
            {
              "text": "Die Tafel verwendet das Mondalter, das 1-2 Jahre älter ist als Ihr tatsächliches Alter",
              "type": "info"
            },
            {
              "text": "Die Empfängnis erfolgt normalerweise 14 Tage nach dem ersten Tag Ihrer letzten Periode",
              "type": "info"
            },
            {
              "text": "Wenn die Empfängnis gegen Ende eines Monats war, probieren Sie beide Monate — Monddaten verschieben sich zur Monatsmitte",
              "type": "info"
            },
            {
              "text": "Für medizinisch genaue Geschlechtsbestimmung verwenden Sie Ultraschall (Woche 20) oder genetische Tests",
              "type": "warning"
            },
            {
              "text": "Die Tafel funktioniert nur für Alter 18-45 und Einzelschwangerschaften — nicht für Zwillinge konzipiert",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Wissenschaftliche Methoden vs. Alte Weisheiten",
          "items": [
            {
              "text": "Ultraschalluntersuchung (Woche 18-22): ~99% genau für Geschlechtsbestimmung",
              "type": "info"
            },
            {
              "text": "NIPT-Bluttest (Woche 10+): ~99% genau, screent auch auf chromosomale Störungen",
              "type": "info"
            },
            {
              "text": "Amniozentese (Woche 15-20): 100% genau aber invasiv, wird aus medizinischen Gründen verwendet",
              "type": "info"
            },
            {
              "text": "Chinesische Geschlechtstafel: ~50% Genauigkeit — unterhaltsame Folklore, keine medizinische Beratung",
              "type": "info"
            },
            {
              "text": "Herzfrequenz-Mythos (>140 = Mädchen): durch mehrere Studien widerlegt, keine Korrelation gefunden",
              "type": "warning"
            },
            {
              "text": "Gelüste-Mythos (süß = Mädchen, salzig = Junge): keinerlei wissenschaftliche Beweise",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Berechnungsbeispiele",
          "description": "Schritt-für-Schritt-Beispiele, wie die Mondkonversion und Vorhersage funktioniert",
          "examples": [
            {
              "title": "Beispiel: Geschlecht vorhersagen",
              "steps": [
                "Mutter geboren: 15. März 1994 → Mondgeburtstag: 4. Feb 1994 (Mondjahr 4691)",
                "Empfängnis: Juni 2025 → Mondmonat: 5. Monat",
                "Mondalter bei Empfängnis: 2025 - 1994 + 1 = 32 Jahre (chinesische Zählung)",
                "Quervergleich: Alter 32, Monat 5 auf der Tafel → Ergebnis: JUNGE 👦"
              ],
              "result": "Tafelvorhersage: Junge"
            },
            {
              "title": "Beispiel: Beste Monate planen",
              "steps": [
                "Mutter geboren: 20. November 1996 → Mondalter 2026 wird 31 sein",
                "Bevorzugtes Geschlecht: Mädchen 👧",
                "Alle 12 Monate in Tafelzeile für Alter 31 prüfen: Jan(J), Feb(J), Mär(M), Apr(J), Mai(M)...",
                "Monate, die Mädchen vorhersagen: März, Mai, September → Empfängnis entsprechend planen"
              ],
              "result": "Beste Monate für ein Mädchen: März, Mai, September 2026"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie genau ist der chinesische Geschlechtsprediktor?",
          "answer": "Der chinesische Geschlechtsprediktor hat keine wissenschaftliche Grundlage. Studien zeigen, dass er etwa 50% Genauigkeit hat — dasselbe wie eine Münze zu werfen. Eine 2009 im American Journal of Obstetrics & Gynecology veröffentlichte Studie fand keine statistische Signifikanz in den Vorhersagen der Tafel. Während einige Eltern berichten, dass sie für sie richtig war, ist dies wahrscheinlich Zufall. Verwenden Sie sie nur zum Spaß und verlassen Sie sich auf Ultraschall oder genetische Tests (NIPT) für medizinisch genaue Ergebnisse."
        },
        {
          "question": "Was ist das 'Mondalter' und warum unterscheidet es sich von meinem echten Alter?",
          "answer": "Im chinesischen Mondkalender wird Ihr Alter anders berechnet. Sie gelten bei der Geburt als 1 Jahr alt (die im Mutterleib verbrachte Zeit wird mitgezählt), und jeder gewinnt ein Jahr zum chinesischen Neujahr — nicht am Geburtstag. Das bedeutet, dass Ihr Mondalter normalerweise 1-2 Jahre älter ist als Ihr westliches (gregorianisches) Alter. Unser Rechner konvertiert automatisch Ihr Geburtsdatum, um Ihr korrektes Mondalter zu berechnen."
        },
        {
          "question": "Kann ich das verwenden, um das Geschlecht meines Babys zu wählen?",
          "answer": "Die chinesische Geschlechtstafel wird manchmal für 'Geschlechtswahl' verwendet — die Auswahl, in welchen Monaten man versucht zu empfangen, um ein bestimmtes Geschlecht zu bekommen. Unser Planungsmodus zeigt Ihnen, welche Monate Junge vs. Mädchen vorhersagen. Dies ist jedoch reine Folklore. Das Geschlecht eines Babys wird dadurch bestimmt, ob das Spermium ein X- oder Y-Chromosom trägt, und der Mondkalender hat null Einfluss auf diesen biologischen Prozess."
        },
        {
          "question": "Funktioniert die chinesische Geschlechtstafel bei Zwillingen?",
          "answer": "Die Tafel ist nur für Einzelschwangerschaften konzipiert. Bei Zwillingen, besonders zweieiigen Zwillingen (die unterschiedliche Geschlechter haben können), kann die Tafel nicht genau vorhersagen. Da sie nur das Alter der Mutter und den Empfängnismonat verwendet, gibt sie eine Antwort — die zu einem Zwilling passen könnte, aber nicht zum anderen."
        },
        {
          "question": "Was, wenn mein Empfängnisdatum gegen Ende eines Monats war?",
          "answer": "Wenn die Empfängnis gegen Ende oder Anfang eines westlichen Monats auftrat, könnte der entsprechende Mondmonat anders sein. Mondmonate stimmen nicht genau mit gregorianischen Monaten überein. Unser Rechner übernimmt diese Konversion automatisch, aber wenn Ihre Empfängnis genau an einer Monatsgrenze war, könnten Sie versuchen, beide angrenzenden Monate zu prüfen, um zu sehen, ob sich die Vorhersage ändert."
        },
        {
          "question": "Was ist das chinesische Tierkreistier für mein Baby?",
          "answer": "Der chinesische Tierkreis folgt einem 12-Jahres-Zyklus, wobei jedes Jahr mit einem Tier verbunden ist: Ratte, Ochse, Tiger, Hase, Drache, Schlange, Pferd, Ziege, Affe, Hahn, Hund und Schwein. Unser Rechner zeigt automatisch das Tierkreistier Ihres Babys basierend auf dem erwarteten Geburtsjahr. Zum Beispiel gelten Babys, die im Jahr der Schlange (2025) geboren werden, als weise, intuitiv und elegant."
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

  inputs: [
    // ── Mode selection ──
    {
      id: "mode",
      type: "radio",
      defaultValue: "predict",
      options: [
        { value: "predict" },
        { value: "plan" },
      ],
    },

    // ── Shared: Mother's birth info ──
    {
      id: "birthYear",
      type: "number",
      defaultValue: null,
      placeholder: "1994",
      min: 1950,
      max: 2010,
    },
    {
      id: "birthMonth",
      type: "select",
      defaultValue: "1",
      options: [
        { value: "1" }, { value: "2" }, { value: "3" }, { value: "4" },
        { value: "5" }, { value: "6" }, { value: "7" }, { value: "8" },
        { value: "9" }, { value: "10" }, { value: "11" }, { value: "12" },
      ],
    },

    // ── Predict mode inputs ──
    {
      id: "conceptionYear",
      type: "number",
      defaultValue: 2025,
      min: 2020,
      max: 2030,
      showWhen: { field: "mode", value: "predict" },
    },
    {
      id: "conceptionMonth",
      type: "select",
      defaultValue: "6",
      options: [
        { value: "1" }, { value: "2" }, { value: "3" }, { value: "4" },
        { value: "5" }, { value: "6" }, { value: "7" }, { value: "8" },
        { value: "9" }, { value: "10" }, { value: "11" }, { value: "12" },
      ],
      showWhen: { field: "mode", value: "predict" },
    },

    // ── Plan mode inputs ──
    {
      id: "planYear",
      type: "number",
      defaultValue: 2025,
      min: 2024,
      max: 2030,
      showWhen: { field: "mode", value: "plan" },
    },
    {
      id: "preferredGender",
      type: "radio",
      defaultValue: "boy",
      options: [
        { value: "boy" },
        { value: "girl" },
      ],
      showWhen: { field: "mode", value: "plan" },
    },
  ],

  inputGroups: [],

  results: [
    { id: "prediction", type: "primary", format: "text" },
    { id: "lunarAge", type: "secondary", format: "text" },
    { id: "lunarMonth", type: "secondary", format: "text" },
    { id: "zodiac", type: "secondary", format: "text" },
    { id: "bestMonths", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "🔮", itemCount: 4 },
    { id: "details", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  detailedTable: {
    id: "genderChart",
    buttonLabel: "View Full Gender Chart",
    buttonIcon: "📊",
    modalTitle: "Chinese Gender Prediction Chart",
    columns: [
      { id: "age", label: "Lunar Age", align: "center" as const, highlight: true },
      { id: "m1", label: "Jan", align: "center" as const },
      { id: "m2", label: "Feb", align: "center" as const },
      { id: "m3", label: "Mar", align: "center" as const },
      { id: "m4", label: "Apr", align: "center" as const },
      { id: "m5", label: "May", align: "center" as const },
      { id: "m6", label: "Jun", align: "center" as const },
      { id: "m7", label: "Jul", align: "center" as const },
      { id: "m8", label: "Aug", align: "center" as const },
      { id: "m9", label: "Sep", align: "center" as const },
      { id: "m10", label: "Oct", align: "center" as const },
      { id: "m11", label: "Nov", align: "center" as const },
      { id: "m12", label: "Dec", align: "center" as const },
    ],
  },

  chart: {
    id: "monthlyPrediction",
    type: "bar",
    xKey: "month",
    height: 280,
    stacked: false,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "number",
    series: [
      { key: "boy", color: "#3b82f6" },
      { key: "girl", color: "#ec4899" },
    ],
  },

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [
    { id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" },
  ],

  references: [
    {
      authors: "Villamor E, Dekker L, Svensson T",
      year: "2009",
      title: "Chinese Lunar Calendar Gender Prediction and Fetal Sex",
      source: "American Journal of Obstetrics & Gynecology",
      url: "https://pubmed.ncbi.nlm.nih.gov/19539902/",
    },
    {
      authors: "Institute of Science, Beijing",
      year: "2024",
      title: "The Original Chinese Gender Chart (Qing Dynasty)",
      source: "Chinese Cultural Heritage Archive",
      url: "https://en.wikipedia.org/wiki/Chinese_gender_chart",
    },
  ],

  hero: {
    icon: "🐉",
    showIcon: true,
  },
  sidebar: {},
  features: {},
  relatedCalculators: [
    "pregnancy-due-date",
    "pregnancy-weight-gain",
    "conception-date",
    "implantation",
  ],
  ads: {},
};

// ══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ══════════════════════════════════════════════════════════════

export function calculateChineseGenderPredictor(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const mode = (values.mode as string) || "predict";
  const birthYear = values.birthYear as number | null;
  const birthMonth = parseInt(values.birthMonth as string) || 1;

  if (!birthYear) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const MONTH_NAMES = [
    v["Jan"] || "Jan", v["Feb"] || "Feb", v["Mar"] || "Mar", v["Apr"] || "Apr",
    v["May"] || "May", v["Jun"] || "Jun", v["Jul"] || "Jul", v["Aug"] || "Aug",
    v["Sep"] || "Sep", v["Oct"] || "Oct", v["Nov"] || "Nov", v["Dec"] || "Dec",
  ];

  // ── Build full gender chart table data ──
  const tableData: Array<Record<string, string>> = [];
  for (let age = 18; age <= 45; age++) {
    const row: Record<string, string> = { age: String(age) };
    for (let m = 1; m <= 12; m++) {
      const g = GENDER_CHART[age - 18][m - 1];
      row[`m${m}`] = g === 1 ? `👦 ${v["boy"] || "Boy"}` : `👧 ${v["girl"] || "Girl"}`;
    }
    tableData.push(row);
  }

  // ═══════════════════════════════════════
  // MODE: PREDICT
  // ═══════════════════════════════════════
  if (mode === "predict") {
    const conceptionYear = (values.conceptionYear as number) || 2025;
    const conceptionMonth = parseInt(values.conceptionMonth as string) || 6;

    const lunarAge = getLunarAge(birthYear, birthMonth, 15, conceptionYear, conceptionMonth);
    const lunarMon = getLunarMonth(conceptionYear, conceptionMonth);
    const gender = predictGender(lunarAge, lunarMon);

    // Expected birth year (conception + ~9 months)
    const expectedBirthYear = conceptionMonth >= 4 ? conceptionYear + 1 : conceptionYear;
    const zodiac = getChineseZodiac(expectedBirthYear);

    const boyLabel = v["boy"] || "Boy";
    const girlLabel = v["girl"] || "Girl";
    const genderLabel = gender === "boy" ? boyLabel : girlLabel;
    const genderEmoji = gender === "boy" ? (v["boyEmoji"] || "👦") : (v["girlEmoji"] || "👧");

    // Chart: show all 12 months for this lunar age
    const chartData: Array<Record<string, unknown>> = [];
    for (let m = 1; m <= 12; m++) {
      const lm = getLunarMonth(conceptionYear, m);
      const pred = predictGender(lunarAge, lm);
      chartData.push({
        month: MONTH_NAMES[m - 1],
        boy: pred === "boy" ? 1 : 0,
        girl: pred === "girl" ? 1 : 0,
      });
    }

    return {
      values: {
        prediction: gender,
        lunarAge: lunarAge,
        lunarMonth: lunarMon,
        zodiac: zodiac.animal,
        bestMonths: "",
        method: "Qing Dynasty Chart",
        calendarSystem: "Chinese Lunisolar",
        ageRange: "18-45",
        accuracy: "~50%",
      },
      formatted: {
        prediction: `${genderEmoji} ${genderLabel}`,
        lunarAge: `${lunarAge} ${v["years"] || "years"} (${v["lunar"] || "lunar"})`,
        lunarMonth: `${v["month"] || "Month"} ${lunarMon}`,
        zodiac: `${zodiac.icon} ${zodiac.animal}`,
        bestMonths: "—",
        method: v["method"] || "Qing Dynasty Chart (700+ years)",
        calendarSystem: v["calendarSystem"] || "Chinese Lunisolar Calendar",
        ageRange: v["ageRange"] || "18 – 45 years",
        accuracy: v["accuracy"] || "~50% (entertainment only)",
      },
      summary: f.summary?.replace("{value}", `${genderEmoji} ${genderLabel}`) || `Prediction: ${genderEmoji} ${genderLabel}`,
      isValid: true,
      metadata: {
        chartData,
        tableData,
      },
    };
  }

  // ═══════════════════════════════════════
  // MODE: PLAN
  // ═══════════════════════════════════════
  if (mode === "plan") {
    const planYear = (values.planYear as number) || 2025;
    const preferredGender = (values.preferredGender as string) || "boy";

    const bestMonthsList: string[] = [];
    const chartData: Array<Record<string, unknown>> = [];

    for (let m = 1; m <= 12; m++) {
      const lunarAge = getLunarAge(birthYear, birthMonth, 15, planYear, m);
      const lunarMon = getLunarMonth(planYear, m);
      const pred = predictGender(lunarAge, lunarMon);

      if (pred === preferredGender) {
        bestMonthsList.push(MONTH_NAMES[m - 1]);
      }

      chartData.push({
        month: MONTH_NAMES[m - 1],
        boy: pred === "boy" ? 1 : 0,
        girl: pred === "girl" ? 1 : 0,
      });
    }

    const boyLabel = v["boy"] || "Boy";
    const girlLabel = v["girl"] || "Girl";
    const genderLabel = preferredGender === "boy" ? boyLabel : girlLabel;
    const genderEmoji = preferredGender === "boy" ? (v["boyEmoji"] || "👦") : (v["girlEmoji"] || "👧");
    const bestMonthsStr = bestMonthsList.length > 0 ? bestMonthsList.join(", ") : (v["noneFound"] || "None found");

    const sampleLunarAge = getLunarAge(birthYear, birthMonth, 15, planYear, 6);
    const zodiac = getChineseZodiac(planYear + 1);

    return {
      values: {
        prediction: preferredGender,
        lunarAge: sampleLunarAge,
        lunarMonth: 0,
        zodiac: zodiac.animal,
        bestMonths: bestMonthsStr,
        method: "Qing Dynasty Chart",
        calendarSystem: "Chinese Lunisolar",
        ageRange: "18-45",
        accuracy: "~50%",
      },
      formatted: {
        prediction: `${genderEmoji} ${v["planningFor"] || "Planning for"} ${genderLabel}`,
        lunarAge: `~${sampleLunarAge} ${v["years"] || "years"} (${v["lunar"] || "lunar"})`,
        lunarMonth: v["allMonthsChecked"] || "All months checked",
        zodiac: `${zodiac.icon} ${zodiac.animal} (${v["ifBorn"] || "if born"} ${planYear + 1})`,
        bestMonths: `${genderEmoji} ${bestMonthsStr}`,
        method: v["method"] || "Qing Dynasty Chart (700+ years)",
        calendarSystem: v["calendarSystem"] || "Chinese Lunisolar Calendar",
        ageRange: v["ageRange"] || "18 – 45 years",
        accuracy: v["accuracy"] || "~50% (entertainment only)",
      },
      summary: f.planSummary
        ?.replace("{gender}", genderLabel)
        .replace("{year}", String(planYear))
        .replace("{months}", bestMonthsStr)
        || `Best months for a ${genderLabel} in ${planYear}: ${bestMonthsStr}`,
      isValid: true,
      metadata: {
        chartData,
        tableData,
      },
    };
  }

  return { values: {}, formatted: {}, summary: "", isValid: false };
}

export default chineseGenderPredictorConfig;
