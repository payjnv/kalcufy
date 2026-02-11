import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ═══════════════════════════════════════════════════════════════════════════════
// BABY SIZE & DEVELOPMENT DATA BY GESTATIONAL WEEK
// ═══════════════════════════════════════════════════════════════════════════════
const BABY_DATA: Record<number, { fruit: string; fruitEmoji: string; length: string; weight: string; highlight: string }> = {
  4:  { fruit: "Poppy Seed",      fruitEmoji: "🌰", length: "0.04 in",  weight: "< 0.04 oz", highlight: "Implantation complete; placenta begins forming" },
  5:  { fruit: "Sesame Seed",     fruitEmoji: "🫘", length: "0.05 in",  weight: "< 0.04 oz", highlight: "Neural tube developing; heart starts forming" },
  6:  { fruit: "Lentil",          fruitEmoji: "🟤", length: "0.08 in",  weight: "< 0.04 oz", highlight: "Heart begins beating; arm & leg buds appear" },
  7:  { fruit: "Blueberry",       fruitEmoji: "🫐", length: "0.3 in",   weight: "< 0.04 oz", highlight: "Brain growing rapidly; facial features forming" },
  8:  { fruit: "Raspberry",       fruitEmoji: "🫐", length: "0.6 in",   weight: "0.04 oz",   highlight: "Fingers & toes forming; baby starts moving" },
  9:  { fruit: "Cherry",          fruitEmoji: "🍒", length: "0.9 in",   weight: "0.07 oz",   highlight: "All essential organs present; embryo → fetus" },
  10: { fruit: "Strawberry",      fruitEmoji: "🍓", length: "1.2 in",   weight: "0.14 oz",   highlight: "Bones beginning to harden; vital organs functioning" },
  11: { fruit: "Fig",             fruitEmoji: "🫒", length: "1.6 in",   weight: "0.25 oz",   highlight: "Tooth buds appearing; baby can open & close fists" },
  12: { fruit: "Lime",            fruitEmoji: "🍋", length: "2.1 in",   weight: "0.49 oz",   highlight: "Reflexes developing; fingernails forming" },
  13: { fruit: "Lemon",           fruitEmoji: "🍋", length: "2.9 in",   weight: "0.81 oz",   highlight: "End of first trimester; vocal cords forming" },
  14: { fruit: "Peach",           fruitEmoji: "🍑", length: "3.4 in",   weight: "1.5 oz",    highlight: "Baby can squint, frown, and make facial expressions" },
  15: { fruit: "Apple",           fruitEmoji: "🍎", length: "4.0 in",   weight: "2.5 oz",    highlight: "Legs are now longer than arms; can sense light" },
  16: { fruit: "Avocado",         fruitEmoji: "🥑", length: "4.6 in",   weight: "3.5 oz",    highlight: "Skeletal system visible on ultrasound; toenails growing" },
  17: { fruit: "Pear",            fruitEmoji: "🍐", length: "5.1 in",   weight: "5.9 oz",    highlight: "Fat stores beginning; sweat glands developing" },
  18: { fruit: "Bell Pepper",     fruitEmoji: "🫑", length: "5.6 in",   weight: "6.7 oz",    highlight: "Ears in final position; may hear sounds" },
  19: { fruit: "Mango",           fruitEmoji: "🥭", length: "6.0 in",   weight: "8.5 oz",    highlight: "Vernix (waxy coating) protecting skin; sensory development" },
  20: { fruit: "Banana",          fruitEmoji: "🍌", length: "6.5 in",   weight: "10.6 oz",   highlight: "Halfway point! Anatomy scan week; can determine sex" },
  21: { fruit: "Carrot",          fruitEmoji: "🥕", length: "10.5 in",  weight: "12.7 oz",   highlight: "Eyebrows & eyelids fully formed; movements stronger" },
  22: { fruit: "Corn on the Cob", fruitEmoji: "🌽", length: "10.9 in",  weight: "15.2 oz",   highlight: "Grip strength increasing; lips more distinct" },
  23: { fruit: "Large Mango",     fruitEmoji: "🥭", length: "11.4 in",  weight: "1.1 lb",    highlight: "Hearing more developed; responds to sounds" },
  24: { fruit: "Ear of Corn",     fruitEmoji: "🌽", length: "11.8 in",  weight: "1.3 lb",    highlight: "Viability milestone — could survive with NICU care" },
  25: { fruit: "Rutabaga",        fruitEmoji: "🥔", length: "13.6 in",  weight: "1.5 lb",    highlight: "Startle reflex; beginning to gain baby fat" },
  26: { fruit: "Lettuce Head",    fruitEmoji: "🥬", length: "14.0 in",  weight: "1.7 lb",    highlight: "Eyes opening for first time; lungs developing surfactant" },
  27: { fruit: "Cauliflower",     fruitEmoji: "🥦", length: "14.4 in",  weight: "1.9 lb",    highlight: "Regular sleep/wake cycles established; brain very active" },
  28: { fruit: "Eggplant",        fruitEmoji: "🍆", length: "14.8 in",  weight: "2.2 lb",    highlight: "Third trimester begins; can dream (REM sleep detected)" },
  29: { fruit: "Acorn Squash",    fruitEmoji: "🎃", length: "15.2 in",  weight: "2.5 lb",    highlight: "Bones fully developed but still soft & pliable" },
  30: { fruit: "Cabbage",         fruitEmoji: "🥬", length: "15.7 in",  weight: "2.9 lb",    highlight: "Red blood cells forming in bone marrow; brain grows rapidly" },
  31: { fruit: "Coconut",         fruitEmoji: "🥥", length: "16.2 in",  weight: "3.3 lb",    highlight: "Brain processing information; all five senses active" },
  32: { fruit: "Jicama",          fruitEmoji: "🥔", length: "16.7 in",  weight: "3.7 lb",    highlight: "Practice breathing movements; toenails fully grown" },
  33: { fruit: "Pineapple",       fruitEmoji: "🍍", length: "17.2 in",  weight: "4.2 lb",    highlight: "Skull bones not yet fused (for birth); immune system developing" },
  34: { fruit: "Cantaloupe",      fruitEmoji: "🍈", length: "17.7 in",  weight: "4.7 lb",    highlight: "Lungs maturing; central nervous system developing" },
  35: { fruit: "Honeydew Melon",  fruitEmoji: "🍈", length: "18.2 in",  weight: "5.3 lb",    highlight: "Most internal development complete; gaining weight rapidly" },
  36: { fruit: "Romaine Lettuce", fruitEmoji: "🥬", length: "18.7 in",  weight: "5.8 lb",    highlight: "Lanugo (fine hair) falling off; baby dropping lower" },
  37: { fruit: "Swiss Chard",     fruitEmoji: "🥒", length: "19.1 in",  weight: "6.3 lb",    highlight: "Early term! Baby practicing breathing; lungs nearly mature" },
  38: { fruit: "Mini Watermelon", fruitEmoji: "🍈", length: "19.6 in",  weight: "6.8 lb",    highlight: "Firm grasp; organ systems fully functional" },
  39: { fruit: "Pumpkin",         fruitEmoji: "🎃", length: "20.0 in",  weight: "7.3 lb",    highlight: "Full term! Brain & lungs continue to mature" },
  40: { fruit: "Watermelon",      fruitEmoji: "🍉", length: "20.2 in",  weight: "7.6 lb",    highlight: "Due date week — baby is ready for birth!" },
  41: { fruit: "Large Watermelon",fruitEmoji: "🍉", length: "20.4 in",  weight: "7.9 lb",    highlight: "Late term; doctor may discuss induction options" },
  42: { fruit: "Jackfruit",       fruitEmoji: "🍉", length: "20.5 in",  weight: "8.1 lb",    highlight: "Post-term; medical team will closely monitor" },
};

// ═══════════════════════════════════════════════════════════════════════════════
// ZODIAC SIGN HELPER
// ═══════════════════════════════════════════════════════════════════════════════
function getZodiacSign(month: number, day: number): { sign: string; emoji: string } {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19))  return { sign: "Aries", emoji: "♈" };
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20))  return { sign: "Taurus", emoji: "♉" };
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20))  return { sign: "Gemini", emoji: "♊" };
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22))  return { sign: "Cancer", emoji: "♋" };
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22))  return { sign: "Leo", emoji: "♌" };
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22))  return { sign: "Virgo", emoji: "♍" };
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { sign: "Libra", emoji: "♎" };
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))return { sign: "Scorpio", emoji: "♏" };
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))return { sign: "Sagittarius", emoji: "♐" };
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { sign: "Capricorn", emoji: "♑" };
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))  return { sign: "Aquarius", emoji: "♒" };
  return { sign: "Pisces", emoji: "♓" };
}

function getSeason(month: number): { season: string; emoji: string } {
  if (month >= 3 && month <= 5)  return { season: "Spring", emoji: "🌸" };
  if (month >= 6 && month <= 8)  return { season: "Summer", emoji: "☀️" };
  if (month >= 9 && month <= 11) return { season: "Fall", emoji: "🍂" };
  return { season: "Winter", emoji: "❄️" };
}

// ═══════════════════════════════════════════════════════════════════════════════
// BIRTHSTONE DATA
// ═══════════════════════════════════════════════════════════════════════════════
const BIRTHSTONES: Record<number, { stone: string; emoji: string; meaning: string }> = {
  1:  { stone: "Garnet",     emoji: "🔴", meaning: "protection & strength" },
  2:  { stone: "Amethyst",   emoji: "🟣", meaning: "wisdom & peace" },
  3:  { stone: "Aquamarine", emoji: "🔵", meaning: "courage & serenity" },
  4:  { stone: "Diamond",    emoji: "💎", meaning: "eternal love & clarity" },
  5:  { stone: "Emerald",    emoji: "🟢", meaning: "rebirth & fertility" },
  6:  { stone: "Alexandrite", emoji: "💜", meaning: "luck & good fortune" },
  7:  { stone: "Ruby",       emoji: "❤️", meaning: "passion & vitality" },
  8:  { stone: "Peridot",    emoji: "💚", meaning: "strength & healing" },
  9:  { stone: "Sapphire",   emoji: "💙", meaning: "truth & loyalty" },
  10: { stone: "Opal",       emoji: "🤍", meaning: "hope & creativity" },
  11: { stone: "Topaz",      emoji: "🧡", meaning: "joy & abundance" },
  12: { stone: "Tanzanite",  emoji: "💠", meaning: "transformation & new beginnings" },
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHINESE GENDER PREDICTOR (Lunar Calendar Approximation)
// Based on traditional Chinese birth chart — for entertainment only
// ═══════════════════════════════════════════════════════════════════════════════
const CHINESE_GENDER_CHART: Record<number, number[]> = {
  18: [1,0,1,1,1,1,1,1,1,1,1,1],
  19: [1,1,1,0,1,1,1,0,1,1,0,0],
  20: [0,1,0,1,1,1,1,1,1,0,1,1],
  21: [1,0,0,1,1,0,0,1,0,0,1,1],
  22: [0,1,1,0,1,0,1,0,0,1,0,0],
  23: [1,1,0,1,0,1,0,0,1,1,1,1],
  24: [1,0,0,1,1,0,1,1,0,0,0,0],
  25: [0,1,0,0,1,1,0,1,1,1,1,1],
  26: [1,0,1,0,0,1,1,0,1,0,0,0],
  27: [0,1,0,1,0,0,1,1,0,1,1,0],
  28: [1,0,1,0,0,1,0,1,1,0,1,0],
  29: [0,1,0,0,1,0,1,0,0,1,1,1],
  30: [1,0,0,0,0,1,1,0,1,0,1,1],
  31: [1,0,0,0,1,0,1,1,0,1,0,0],
  32: [1,0,0,1,0,1,0,0,1,0,1,1],
  33: [0,1,0,0,1,0,1,0,0,1,0,1],
  34: [1,0,0,1,0,0,1,0,0,1,1,0],
  35: [1,0,1,0,1,0,0,1,0,0,1,1],
  36: [0,1,1,0,1,0,0,1,0,1,0,1],
  37: [1,0,1,1,0,1,0,1,0,1,0,0],
  38: [0,1,0,1,1,0,1,0,1,0,1,0],
  39: [1,0,1,1,0,1,0,0,1,0,0,1],
  40: [0,1,0,1,0,0,1,1,0,1,0,1],
  41: [1,0,1,0,1,0,0,1,0,0,1,0],
  42: [0,1,0,1,0,1,0,0,1,0,0,1],
  43: [1,0,1,0,0,0,1,0,0,1,1,1],
  44: [1,1,0,1,0,1,0,0,1,0,1,0],
  45: [0,1,0,0,1,0,0,1,0,1,0,1],
};

function getChineseGenderPrediction(motherBirthYear: number, conceptionMonth: number, conceptionYear: number): { prediction: string; emoji: string } {
  const ageAtConception = conceptionYear - motherBirthYear;
  const lunarAge = Math.max(18, Math.min(45, ageAtConception + 1));
  const lunarMonth = Math.max(1, Math.min(12, conceptionMonth));
  const row = CHINESE_GENDER_CHART[lunarAge];
  if (!row) return { prediction: "Boy", emoji: "👦" };
  const result = row[lunarMonth - 1];
  return result === 1 ? { prediction: "Boy", emoji: "👦" } : { prediction: "Girl", emoji: "👧" };
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════════════════════
export const pregnancyDueDateConfig: CalculatorConfigV4 = {
  id: "pregnancy-due-date",
  version: "4.0",
  category: "health",
  icon: "🤰",

  presets: [
    {
      id: "firstPregnancyLmp",
      icon: "🤱",
      values: {
        method: "lmp",
        inputDate: "2025-11-01",
        cycleLength: 28,
        lutealPhase: 14,
        motherBirthYear: 1994,
      },
    },
    {
      id: "ivfBlastocyst",
      icon: "🔬",
      values: {
        method: "ivf",
        inputDate: "2026-01-15",
        ivfEmbryo: "day5",
        motherBirthYear: 1992,
      },
    },
    {
      id: "earlyUltrasound",
      icon: "📡",
      values: {
        method: "ultrasound",
        inputDate: "2026-01-20",
        gestWeeks: 8,
        gestDays: 3,
        motherBirthYear: 1990,
      },
    },
    {
      id: "irregularCycle",
      icon: "📊",
      values: {
        method: "lmp",
        inputDate: "2025-10-15",
        cycleLength: 35,
        lutealPhase: 14,
        motherBirthYear: 1996,
      },
    },
  ],

  t: {
    en: {
      name: "Pregnancy Due Date Calculator",
      slug: "pregnancy-due-date-calculator",
      subtitle: "Estimate your due date, track baby's weekly growth, and view your complete prenatal milestone timeline with personalized dates",
      breadcrumb: "Due Date",

      seo: {
        title: "Due Date Calculator - Pregnancy & Delivery Estimator",
        description: "Calculate your due date using LMP, ultrasound, IVF, or conception date. Track baby size by week, view prenatal milestones, and get your delivery window.",
        shortDescription: "Estimate your due date and track pregnancy milestones",
        keywords: [
          "due date calculator",
          "pregnancy calculator",
          "pregnancy due date",
          "estimated delivery date",
          "gestational age calculator",
          "IVF due date calculator",
          "when is my baby due",
          "baby size by week",
        ],
      },

      calculator: { yourInformation: "Pregnancy Information" },
      ui: {
        yourInformation: "Pregnancy Information",
        calculate: "Calculate Due Date",
        reset: "Reset",
        results: "Your Pregnancy Dashboard",
      },

      inputs: {
        method: {
          label: "Calculation Method",
          helpText: "Choose how you want to estimate your due date",
          options: {
            lmp: "Last Menstrual Period (LMP)",
            conception: "Conception Date",
            ivf: "IVF Transfer Date",
            ultrasound: "Ultrasound Date",
            knownDueDate: "I Already Know My Due Date",
          },
        },
        inputDate: {
          label: "Date",
          helpText: "Select the date for your chosen calculation method",
        },
        cycleLength: {
          label: "Average Cycle Length",
          helpText: "Average days in your menstrual cycle (21–45, default 28)",
        },
        lutealPhase: {
          label: "Luteal Phase Length",
          helpText: "Days between ovulation and next period (10–16, default 14)",
        },
        ivfEmbryo: {
          label: "Embryo Age at Transfer",
          helpText: "Day 5 (blastocyst) transfers are most common",
          options: { day3: "Day 3 Embryo", day5: "Day 5 Blastocyst", day6: "Day 6 Blastocyst" },
        },
        gestWeeks: {
          label: "Weeks at Ultrasound",
          helpText: "Gestational age in weeks at the time of ultrasound",
        },
        gestDays: {
          label: "Days",
          helpText: "Additional days (0–6)",
        },
        motherBirthYear: {
          label: "Mother's Birth Year (optional)",
          helpText: "For Chinese Gender Prediction — just for fun! Not medical advice",
        },
      },

      inputGroups: {},

      results: {
        dueDate:           { label: "Estimated Due Date" },
        gestationalAge:    { label: "Gestational Age" },
        trimester:         { label: "Current Trimester" },
        daysRemaining:     { label: "Days Remaining" },
        conceptionDate:    { label: "Estimated Conception" },
        deliveryWindow:    { label: "Delivery Window" },
        currentWeek:       { label: "Current Week" },
        babySizeFruit:     { label: "Baby Size" },
        babyMeasurements:  { label: "Length & Weight" },
        babyDevelopment:   { label: "Development Highlight" },
        zodiacSign:        { label: "Baby's Zodiac Sign" },
        birthstone:        { label: "Birthstone" },
        birthSeason:       { label: "Birth Season" },
        trimesterProgress: { label: "Pregnancy Progress" },
        genderPrediction:  { label: "Chinese Gender Prediction" },
      },

      tooltips: {
        dueDate: "Based on a 40-week (280-day) gestation from your last menstrual period, adjusted for your cycle length and luteal phase",
        gestationalAge: "How far along you are, counted from the first day of your last menstrual period",
        deliveryWindow: "Most babies are born between 37 and 42 weeks — only about 5% arrive on the exact due date",
        daysRemaining: "Calendar days until your estimated due date",
        conceptionDate: "Estimated date of fertilization, roughly 2 weeks after LMP for a 28-day cycle",
        babySizeFruit: "A fun comparison of your baby's approximate size to familiar fruits and vegetables",
        babyDevelopment: "Key development milestone happening this week",
        zodiacSign: "The astrological sign based on your estimated due date",
        birthstone: "The traditional birthstone associated with your baby's expected birth month",
        trimesterProgress: "Percentage of pregnancy completed based on 40 weeks",
        genderPrediction: "Ancient Chinese birth chart prediction — for entertainment only, not medical advice (50/50 accuracy)",
      },

      values: {
        "January": "January", "February": "February", "March": "March",
        "April": "April", "May": "May", "June": "June",
        "July": "July", "August": "August", "September": "September",
        "October": "October", "November": "November", "December": "December",
        "First Trimester": "First Trimester", "Second Trimester": "Second Trimester",
        "Third Trimester": "Third Trimester", "Post-Term": "Post-Term",
        "Not Yet Pregnant": "Not Yet Pregnant",
        "day": "day", "days": "days", "week": "week", "weeks": "weeks", "Week": "Week",
        "Aries": "Aries", "Taurus": "Taurus", "Gemini": "Gemini", "Cancer": "Cancer",
        "Leo": "Leo", "Virgo": "Virgo", "Libra": "Libra", "Scorpio": "Scorpio",
        "Sagittarius": "Sagittarius", "Capricorn": "Capricorn", "Aquarius": "Aquarius", "Pisces": "Pisces",
        "Spring": "Spring", "Summer": "Summer", "Fall": "Fall", "Winter": "Winter",
        "Poppy Seed": "Poppy Seed", "Sesame Seed": "Sesame Seed", "Lentil": "Lentil",
        "Blueberry": "Blueberry", "Raspberry": "Raspberry", "Cherry": "Cherry",
        "Strawberry": "Strawberry", "Fig": "Fig", "Lime": "Lime", "Lemon": "Lemon",
        "Peach": "Peach", "Apple": "Apple", "Avocado": "Avocado", "Pear": "Pear",
        "Bell Pepper": "Bell Pepper", "Mango": "Mango", "Banana": "Banana",
        "Carrot": "Carrot", "Corn on the Cob": "Corn on the Cob",
        "Large Mango": "Large Mango", "Ear of Corn": "Ear of Corn",
        "Rutabaga": "Rutabaga", "Lettuce Head": "Lettuce Head",
        "Cauliflower": "Cauliflower", "Eggplant": "Eggplant",
        "Acorn Squash": "Acorn Squash", "Cabbage": "Cabbage",
        "Coconut": "Coconut", "Jicama": "Jicama", "Pineapple": "Pineapple",
        "Cantaloupe": "Cantaloupe", "Honeydew Melon": "Honeydew Melon",
        "Romaine Lettuce": "Romaine Lettuce", "Swiss Chard": "Swiss Chard",
        "Mini Watermelon": "Mini Watermelon", "Pumpkin": "Pumpkin",
        "Watermelon": "Watermelon", "Large Watermelon": "Large Watermelon",
        "Jackfruit": "Jackfruit",
        "complete": "complete", "today": "today",
        "Early Term": "Early Term", "Full Term": "Full Term", "Late Term": "Late Term",
        "Garnet": "Garnet", "Amethyst": "Amethyst", "Aquamarine": "Aquamarine",
        "Diamond": "Diamond", "Emerald": "Emerald", "Alexandrite": "Alexandrite",
        "Ruby": "Ruby", "Peridot": "Peridot", "Sapphire": "Sapphire",
        "Opal": "Opal", "Topaz": "Topaz", "Tanzanite": "Tanzanite",
        "Boy": "Boy", "Girl": "Girl", "Just for fun!": "Just for fun!",
        "protection & strength": "protection & strength", "wisdom & peace": "wisdom & peace",
        "courage & serenity": "courage & serenity", "eternal love & clarity": "eternal love & clarity",
        "rebirth & fertility": "rebirth & fertility", "luck & good fortune": "luck & good fortune",
        "passion & vitality": "passion & vitality", "strength & healing": "strength & healing",
        "truth & loyalty": "truth & loyalty", "hope & creativity": "hope & creativity",
        "joy & abundance": "joy & abundance", "transformation & new beginnings": "transformation & new beginnings",
        "First Heartbeat Detectable": "First Heartbeat Detectable",
        "First Prenatal Visit": "First Prenatal Visit",
        "NIPT / Nuchal Translucency Screen": "NIPT / Nuchal Translucency Screen",
        "End of First Trimester": "End of First Trimester",
        "Quad Screen Window": "Quad Screen Window",
        "Anatomy Scan (Level 2 Ultrasound)": "Anatomy Scan (Level 2 Ultrasound)",
        "Viability Milestone": "Viability Milestone",
        "Glucose Screening Test": "Glucose Screening Test",
        "Tdap Vaccine Window": "Tdap Vaccine Window",
        "Third Trimester Begins": "Third Trimester Begins",
        "Fetal Position Check": "Fetal Position Check",
        "Group B Strep (GBS) Test": "Group B Strep (GBS) Test",
        "Early Term Begins": "Early Term Begins",
        "Full Term Begins": "Full Term Begins",
        "Estimated Due Date": "Estimated Due Date",
        "Post-Term Consideration": "Post-Term Consideration",
        "Detectable via transvaginal ultrasound": "Detectable via transvaginal ultrasound",
        "Initial bloodwork, medical history, physical exam": "Initial bloodwork, medical history, physical exam",
        "Non-invasive chromosomal screening window": "Non-invasive chromosomal screening window",
        "Major organ systems formed; miscarriage risk drops": "Major organ systems formed; miscarriage risk drops",
        "Screens for neural tube defects and chromosomal conditions": "Screens for neural tube defects and chromosomal conditions",
        "Detailed structural ultrasound; sex may be visible": "Detailed structural ultrasound; sex may be visible",
        "Baby could potentially survive outside the womb with NICU care": "Baby could potentially survive outside the womb with NICU care",
        "Screens for gestational diabetes mellitus (GDM)": "Screens for gestational diabetes mellitus (GDM)",
        "Recommended between 27–36 weeks to protect newborn from whooping cough": "Recommended between 27–36 weeks to protect newborn from whooping cough",
        "Final growth and development phase begins": "Final growth and development phase begins",
        "Doctor checks if baby is head-down (cephalic) or breech": "Doctor checks if baby is head-down (cephalic) or breech",
        "Vaginal swab screens for Group B Streptococcus": "Vaginal swab screens for Group B Streptococcus",
        "Baby is considered early term (37–38 weeks)": "Baby is considered early term (37–38 weeks)",
        "Baby is considered full term (39–40 weeks)": "Baby is considered full term (39–40 weeks)",
        "Average 40-week gestation target": "Average 40-week gestation target",
        "Doctor may discuss induction if labor hasn't begun": "Doctor may discuss induction if labor hasn't begun",
      },

      formats: {
        summary: "Your estimated due date is {dueDate}. You are currently {gestationalAge} ({trimester}). Baby is about the size of a {babySizeFruit}. {daysRemaining} days remaining.",
      },

      presets: {
        firstPregnancyLmp: { label: "First Pregnancy (LMP)", description: "28-day cycle, Nov 2025 LMP" },
        ivfBlastocyst: { label: "IVF Day 5 Transfer", description: "Blastocyst transfer Jan 2026" },
        earlyUltrasound: { label: "Early Ultrasound", description: "8-week dating scan Jan 2026" },
        irregularCycle: { label: "Irregular Cycle (35-day)", description: "Longer cycle, Oct 2025 LMP" },
      },

      infoCards: {
        keyDates: {
          title: "📅 Key Dates",
          items: [
            { label: "Due Date",        valueKey: "dueDate" },
            { label: "Delivery Window", valueKey: "deliveryWindow" },
            { label: "Conception Date", valueKey: "conceptionDate" },
            { label: "Days Remaining",  valueKey: "daysRemaining" },
          ],
        },
        babyNow: {
          title: "👶 Baby This Week",
          items: [
            { label: "Current Week",   valueKey: "currentWeek" },
            { label: "Baby Size",      valueKey: "babySizeFruit" },
            { label: "Length & Weight", valueKey: "babyMeasurements" },
            { label: "Development",    valueKey: "babyDevelopment" },
          ],
        },
        tips: {
          title: "💡 Pregnancy Tips",
          items: [
            "Only about 5% of babies arrive on their exact due date — 80% are born within 10 days of the EDD",
            "First-trimester ultrasound (before 13 weeks) is the most accurate dating method, within ±5–7 days",
            "Adjusting cycle length and luteal phase gives a more personalized due date than the standard 28-day assumption",
            "Your prenatal milestone timeline below shows estimated dates for every key test and checkup",
          ],
        },
      },

      detailedTable: {
        prenatalTimeline: {
          button: "View Prenatal Timeline",
          title: "Prenatal Testing & Milestones Timeline",
          columns: {
            milestone: "Milestone",
            estimatedDate: "Estimated Date",
            gestAge: "Gestational Age",
            notes: "Notes",
          },
        },
      },

      education: {
        whatIs: {
          title: "What Is an Estimated Due Date?",
          content: "An estimated due date (EDD), also called the estimated date of confinement (EDC), is the projected date when a pregnant person is expected to deliver their baby. It is typically calculated as 280 days (40 weeks) from the first day of the last menstrual period, assuming a standard 28-day cycle. However, because cycle lengths vary widely (21–45 days) and ovulation doesn't always happen on day 14, more personalized methods — including cycle-length adjustment, luteal-phase correction, IVF transfer dates, and early ultrasound measurements — significantly improve accuracy. Research shows that only about 4–5% of babies are born on their exact due date. About 80% arrive within 10 days of the EDD, and any birth between 37 and 42 weeks is considered within the normal range. Your due date is best understood as the center point of a delivery window, not a precise deadline.",
        },
        howItWorks: {
          title: "How Due Dates Are Calculated",
          content: "This calculator supports five estimation methods. The Last Menstrual Period (LMP) method uses Naegele's rule with adjustments for your personal cycle length and luteal phase: it calculates the likely ovulation date (cycle length minus luteal phase length), then adds 266 days to reach the due date. The Conception Date method adds 266 days to the known date of fertilization. For IVF transfers, the calculator accounts for the embryo's age at transfer (3, 5, or 6 days) and adds the appropriate number of days to reach 40 weeks gestational age — IVF dates tend to be the most precise since the exact fertilization timing is known. The Ultrasound method works backward from the gestational age determined during an early scan, and first-trimester ultrasounds (before 13 weeks) are considered the gold standard for dating accuracy. Finally, the Known Due Date (reverse) method back-calculates your conception date and LMP, useful for understanding your complete pregnancy timeline.",
        },
        considerations: {
          title: "Important Considerations",
          items: [
            { text: "First-trimester ultrasounds (before 13 weeks) are the gold standard for pregnancy dating accuracy, with a margin of error of only ±5–7 days according to ACOG guidelines", type: "info" },
            { text: "Irregular menstrual cycles can make LMP-based dating less reliable — if your cycles vary by more than 7 days, consider the ultrasound or conception method instead", type: "warning" },
            { text: "Only about 4–5% of babies are born on their exact due date; 80% arrive within 10 days, and the 37–42 week window is completely normal", type: "info" },
            { text: "IVF due dates tend to be the most precise of all methods because the exact fertilization and transfer dates are known", type: "info" },
            { text: "Your healthcare provider may adjust your due date after an early ultrasound if it differs by more than 7 days from LMP-based estimates", type: "warning" },
            { text: "Pregnancies lasting beyond 42 weeks (post-term) carry higher risks — ACOG recommends discussing induction between 41 and 42 weeks", type: "warning" },
          ],
        },
        milestones: {
          title: "Term Definitions & Key Milestones",
          items: [
            { text: "First Trimester (Weeks 1–13): Baby's heart begins beating around week 6; by week 12, all major organs have formed and miscarriage risk drops significantly to about 2%", type: "info" },
            { text: "Second Trimester (Weeks 14–27): The anatomy scan at 18–22 weeks checks structural development and may reveal the sex; fetal movements (quickening) typically felt between weeks 18–22", type: "info" },
            { text: "Third Trimester (Weeks 28–40): Rapid weight gain and brain development; baby reaches viability around 24 weeks; lungs continue maturing through 36 weeks", type: "info" },
            { text: "Preterm: Before 37 weeks | Early Term: 37–38 weeks | Full Term: 39–40 weeks | Late Term: 41 weeks | Post-Term: 42+ weeks", type: "warning" },
            { text: "Key Screenings: NIPT/Nuchal translucency (10–13 weeks), Quad screen (15–20 weeks), Anatomy scan (18–22 weeks), Glucose test (24–28 weeks), GBS test (35–37 weeks)", type: "info" },
            { text: "The Chinese Gender Prediction chart is a fun traditional tool with ~50% accuracy (no better than chance) — based on mother's lunar age and conception month, for entertainment only", type: "info" },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step examples for different estimation methods",
          examples: [
            {
              title: "LMP Method (28-day cycle)",
              steps: [
                "Last period started: January 1, 2026",
                "Cycle length: 28 days, Luteal phase: 14 days",
                "Ovulation day: 28 − 14 = day 14 → January 15",
                "Due date: January 15 + 266 days = October 8, 2026",
                "Naegele's shortcut: Jan 1 + 1 year − 3 months + 7 days = Oct 8",
              ],
              result: "Due Date: October 8, 2026",
            },
            {
              title: "IVF Day 5 Blastocyst Transfer",
              steps: [
                "Transfer date: February 10, 2026",
                "Embryo age: 5 days (blastocyst)",
                "Gestation at transfer: 2 weeks + 5 days = 19 days",
                "Days remaining: 280 − 19 = 261 days",
                "Due date: February 10 + 261 = October 29, 2026",
              ],
              result: "Due Date: October 29, 2026",
            },
          ],
        },
      },

      faqs: [
        { question: "How accurate is a due date calculator?", answer: "Due date calculators provide an estimate based on average gestational length (280 days from LMP). Accuracy depends on the method: first-trimester ultrasound is most accurate (±5–7 days), IVF dates are nearly as precise, and LMP-based calculation can be off by 1–2 weeks for irregular cycles. Only about 4–5% of babies arrive on the exact due date — most are born within a 10-day window around the EDD." },
        { question: "What's the difference between gestational age and fetal age?", answer: "Gestational age is counted from the first day of your last menstrual period (LMP), which is about 2 weeks before conception actually occurs. Fetal age (embryonic age) is counted from the actual date of conception. So at '8 weeks pregnant' (gestational age), the embryo is actually about 6 weeks old. Medical professionals almost always use gestational age." },
        { question: "Can my due date change during pregnancy?", answer: "Yes. If an early ultrasound (before 13 weeks) shows a gestational age that differs from your LMP-based estimate by more than 7 days, your healthcare provider may adjust your due date. According to ACOG guidelines, first-trimester ultrasound measurements are the most reliable dating method." },
        { question: "How is an IVF due date calculated?", answer: "IVF due dates are calculated from the embryo transfer date. For a Day 5 blastocyst, 261 days are added to the transfer date. Day 3 embryos add 263 days, and Day 6 blastocysts add 260 days. IVF calculations are among the most accurate because the exact fertilization date is known." },
        { question: "What does 'full term' vs 'early term' mean?", answer: "ACOG defines: Preterm (before 37 weeks), Early Term (37–38 weeks), Full Term (39–40 weeks), Late Term (41 weeks), Post-Term (42+ weeks). Full term is the ideal window with the best health outcomes." },
        { question: "Does cycle length really affect the due date?", answer: "Yes, significantly. The standard 280-day calculation assumes a 28-day cycle with ovulation on day 14. A 35-day cycle means ovulation around day 21 — shifting your due date by 7 days. This calculator adjusts for both cycle length and luteal phase for better accuracy." },
        { question: "What is the Chinese Gender Prediction chart?", answer: "A traditional tool reportedly over 700 years old that claims to predict baby's sex based on the mother's lunar age and conception month. Scientific studies show it's about 50% accurate — the same as a coin flip. It's included here as a fun tradition, not a medical tool." },
        { question: "What is a 'dating ultrasound' and when should I get one?", answer: "A dating ultrasound (typically 7–12 weeks) measures the embryo's crown-rump length to determine gestational age. It's the most accurate dating method with ±5–7 days margin of error. ACOG and NHS both recommend it in the first trimester, especially for irregular cycles." },
        { question: "What happens if I go past my due date?", answer: "About 50% of first-time mothers deliver after 40 weeks. At 41 weeks, your provider increases monitoring. By 42 weeks, most guidelines (ACOG, NICE) recommend discussing induction as risks increase from declining placenta function and reduced amniotic fluid." },
        { question: "Can twins have a different due date?", answer: "Twin pregnancies use the same initial calculation, but expected delivery is earlier — around 36–37 weeks on average. Your provider may recommend delivery between 36–38 weeks depending on whether twins are identical (monochorionic) or fraternal (dichorionic)." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Calculate Due Date", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },

      chart: {
        title: "Baby Growth by Week",
        xLabel: "Week",
        yLabel: "Weight (oz / lb)",
        series: { weightOz: "Baby Weight" },
      },
    },
    es: {
      "name": "Calculadora de Fecha de Parto",
      "slug": "calculadora-fecha-parto-embarazo",
      "subtitle": "Estima tu fecha de parto, rastrea el crecimiento semanal del bebé y visualiza tu cronograma completo de hitos prenatales con fechas personalizadas",
      "breadcrumb": "Fecha de Parto",
      "seo": {
        "title": "Calculadora de Fecha de Parto - Estimador de Embarazo y Parto",
        "description": "Calcula tu fecha de parto usando FUM, ecografía, FIV o fecha de concepción. Rastrea el tamaño del bebé por semana, ve hitos prenatales y obtén tu ventana de parto.",
        "shortDescription": "Estima tu fecha de parto y rastrea hitos del embarazo",
        "keywords": [
          "calculadora fecha parto",
          "calculadora embarazo",
          "fecha parto embarazo",
          "fecha estimada parto",
          "calculadora edad gestacional",
          "calculadora fecha parto FIV",
          "cuándo nace mi bebé",
          "tamaño bebé por semana"
        ]
      },
      "inputs": {
        "method": {
          "label": "Método de Cálculo",
          "helpText": "Elige cómo quieres estimar tu fecha de parto",
          "options": {
            "lmp": "Fecha de Última Menstruación (FUM)",
            "conception": "Fecha de Concepción",
            "ivf": "Fecha de Transferencia FIV",
            "ultrasound": "Fecha de Ecografía",
            "knownDueDate": "Ya Conozco mi Fecha de Parto"
          }
        },
        "inputDate": {
          "label": "Fecha",
          "helpText": "Selecciona la fecha para el método de cálculo elegido"
        },
        "cycleLength": {
          "label": "Duración Promedio del Ciclo",
          "helpText": "Días promedio en tu ciclo menstrual (21–45, por defecto 28)"
        },
        "lutealPhase": {
          "label": "Duración de la Fase Lútea",
          "helpText": "Días entre ovulación y próximo período (10–16, por defecto 14)"
        },
        "ivfEmbryo": {
          "label": "Edad del Embrión en Transferencia",
          "helpText": "Las transferencias de día 5 (blastocisto) son más comunes",
          "options": {
            "day3": "Embrión Día 3",
            "day5": "Blastocisto Día 5",
            "day6": "Blastocisto Día 6"
          }
        },
        "gestWeeks": {
          "label": "Semanas en Ecografía",
          "helpText": "Edad gestacional en semanas al momento de la ecografía"
        },
        "gestDays": {
          "label": "Días",
          "helpText": "Días adicionales (0–6)"
        },
        "motherBirthYear": {
          "label": "Año de Nacimiento de la Madre (opcional)",
          "helpText": "Para Predicción China de Género — ¡solo por diversión! No es consejo médico"
        }
      },
      "inputGroups": {},
      "results": {
        "dueDate": {
          "label": "Fecha Estimada de Parto"
        },
        "gestationalAge": {
          "label": "Edad Gestacional"
        },
        "trimester": {
          "label": "Trimestre Actual"
        },
        "daysRemaining": {
          "label": "Días Restantes"
        },
        "conceptionDate": {
          "label": "Concepción Estimada"
        },
        "deliveryWindow": {
          "label": "Ventana de Parto"
        },
        "currentWeek": {
          "label": "Semana Actual"
        },
        "babySizeFruit": {
          "label": "Tamaño del Bebé"
        },
        "babyMeasurements": {
          "label": "Longitud y Peso"
        },
        "babyDevelopment": {
          "label": "Desarrollo Destacado"
        },
        "zodiacSign": {
          "label": "Signo Zodiacal del Bebé"
        },
        "birthstone": {
          "label": "Piedra de Nacimiento"
        },
        "birthSeason": {
          "label": "Estación de Nacimiento"
        },
        "trimesterProgress": {
          "label": "Progreso del Embarazo"
        },
        "genderPrediction": {
          "label": "Predicción China de Género"
        }
      },
      "tooltips": {
        "dueDate": "Basado en una gestación de 40 semanas (280 días) desde tu última menstruación, ajustado por la duración de tu ciclo y fase lútea",
        "gestationalAge": "Qué tan avanzado está tu embarazo, contado desde el primer día de tu última menstruación",
        "deliveryWindow": "La mayoría de bebés nacen entre 37 y 42 semanas — solo cerca del 5% llegan en la fecha exacta",
        "daysRemaining": "Días calendario hasta tu fecha estimada de parto",
        "conceptionDate": "Fecha estimada de fertilización, aproximadamente 2 semanas después de FUM para un ciclo de 28 días",
        "babySizeFruit": "Una comparación divertida del tamaño aproximado de tu bebé con frutas y vegetales familiares",
        "babyDevelopment": "Hito clave de desarrollo que ocurre esta semana",
        "zodiacSign": "El signo astrológico basado en tu fecha estimada de parto",
        "birthstone": "La piedra preciosa tradicional asociada con el mes esperado de nacimiento de tu bebé",
        "trimesterProgress": "Porcentaje de embarazo completado basado en 40 semanas",
        "genderPrediction": "Predicción del calendario chino antiguo — solo para entretenimiento, no consejo médico (50/50 de precisión)"
      },
      "values": {
        "January": "Enero",
        "February": "Febrero",
        "March": "Marzo",
        "April": "Abril",
        "May": "Mayo",
        "June": "Junio",
        "July": "Julio",
        "August": "Agosto",
        "September": "Septiembre",
        "October": "Octubre",
        "November": "Noviembre",
        "December": "Diciembre",
        "First Trimester": "Primer Trimestre",
        "Second Trimester": "Segundo Trimestre",
        "Third Trimester": "Tercer Trimestre",
        "Post-Term": "Post-Término",
        "Not Yet Pregnant": "Aún No Embarazada",
        "day": "día",
        "days": "días",
        "week": "semana",
        "weeks": "semanas",
        "Week": "Semana",
        "Aries": "Aries",
        "Taurus": "Tauro",
        "Gemini": "Géminis",
        "Cancer": "Cáncer",
        "Leo": "Leo",
        "Virgo": "Virgo",
        "Libra": "Libra",
        "Scorpio": "Escorpio",
        "Sagittarius": "Sagitario",
        "Capricorn": "Capricornio",
        "Aquarius": "Acuario",
        "Pisces": "Piscis",
        "Spring": "Primavera",
        "Summer": "Verano",
        "Fall": "Otoño",
        "Winter": "Invierno",
        "Poppy Seed": "Semilla de Amapola",
        "Sesame Seed": "Semilla de Sésamo",
        "Lentil": "Lenteja",
        "Blueberry": "Arándano",
        "Raspberry": "Frambuesa",
        "Cherry": "Cereza",
        "Strawberry": "Fresa",
        "Fig": "Higo",
        "Lime": "Lima",
        "Lemon": "Limón",
        "Peach": "Durazno",
        "Apple": "Manzana",
        "Avocado": "Aguacate",
        "Pear": "Pera",
        "Bell Pepper": "Pimiento",
        "Mango": "Mango",
        "Banana": "Plátano",
        "Carrot": "Zanahoria",
        "Corn on the Cob": "Mazorca de Maíz",
        "Large Mango": "Mango Grande",
        "Ear of Corn": "Mazorca de Maíz",
        "Rutabaga": "Nabo Sueco",
        "Lettuce Head": "Lechuga",
        "Cauliflower": "Coliflor",
        "Eggplant": "Berenjena",
        "Acorn Squash": "Calabaza Bellota",
        "Cabbage": "Repollo",
        "Coconut": "Coco",
        "Jicama": "Jícama",
        "Pineapple": "Piña",
        "Cantaloupe": "Melón",
        "Honeydew Melon": "Melón Verde",
        "Romaine Lettuce": "Lechuga Romana",
        "Swiss Chard": "Acelga",
        "Mini Watermelon": "Sandía Mini",
        "Pumpkin": "Calabaza",
        "Watermelon": "Sandía",
        "Large Watermelon": "Sandía Grande",
        "Jackfruit": "Jaca",
        "complete": "completo",
        "today": "hoy",
        "Early Term": "Término Temprano",
        "Full Term": "Término Completo",
        "Late Term": "Término Tardío",
        "Garnet": "Granate",
        "Amethyst": "Amatista",
        "Aquamarine": "Aguamarina",
        "Diamond": "Diamante",
        "Emerald": "Esmeralda",
        "Alexandrite": "Alejandrita",
        "Ruby": "Rubí",
        "Peridot": "Peridoto",
        "Sapphire": "Zafiro",
        "Opal": "Ópalo",
        "Topaz": "Topacio",
        "Tanzanite": "Tanzanita",
        "Boy": "Niño",
        "Girl": "Niña",
        "Just for fun!": "¡Solo por diversión!",
        "protection & strength": "protección y fuerza",
        "wisdom & peace": "sabiduría y paz",
        "courage & serenity": "valor y serenidad",
        "eternal love & clarity": "amor eterno y claridad",
        "rebirth & fertility": "renacimiento y fertilidad",
        "luck & good fortune": "suerte y buena fortuna",
        "passion & vitality": "pasión y vitalidad",
        "strength & healing": "fuerza y sanación",
        "truth & loyalty": "verdad y lealtad",
        "hope & creativity": "esperanza y creatividad",
        "joy & abundance": "alegría y abundancia",
        "transformation & new beginnings": "transformación y nuevos comienzos",
        "First Heartbeat Detectable": "Primer Latido Detectable",
        "First Prenatal Visit": "Primera Visita Prenatal",
        "NIPT / Nuchal Translucency Screen": "Prueba NIPT / Translucencia Nucal",
        "End of First Trimester": "Fin del Primer Trimestre",
        "Quad Screen Window": "Ventana de Cuádruple Marcador",
        "Anatomy Scan (Level 2 Ultrasound)": "Ecografía Anatómica (Nivel 2)",
        "Viability Milestone": "Hito de Viabilidad",
        "Glucose Screening Test": "Prueba de Glucosa",
        "Tdap Vaccine Window": "Ventana Vacuna Tdap",
        "Third Trimester Begins": "Comienza Tercer Trimestre",
        "Fetal Position Check": "Control Posición Fetal",
        "Group B Strep (GBS) Test": "Prueba Estreptococo B",
        "Early Term Begins": "Comienza Término Temprano",
        "Full Term Begins": "Comienza Término Completo",
        "Estimated Due Date": "Fecha Estimada de Parto",
        "Post-Term Consideration": "Consideración Post-Término",
        "Detectable via transvaginal ultrasound": "Detectable vía ecografía transvaginal",
        "Initial bloodwork, medical history, physical exam": "Análisis inicial, historial médico, examen físico",
        "Non-invasive chromosomal screening window": "Ventana de tamizaje cromosómico no invasivo",
        "Major organ systems formed; miscarriage risk drops": "Sistemas de órganos principales formados; riesgo de aborto disminuye",
        "Screens for neural tube defects and chromosomal conditions": "Detecta defectos del tubo neural y condiciones cromosómicas",
        "Detailed structural ultrasound; sex may be visible": "Ecografía estructural detallada; sexo puede ser visible",
        "Baby could potentially survive outside the womb with NICU care": "Bebé podría sobrevivir fuera del útero con cuidados de UCIN",
        "Screens for gestational diabetes mellitus (GDM)": "Detecta diabetes mellitus gestacional",
        "Recommended between 27–36 weeks to protect newborn from whooping cough": "Recomendada entre semanas 27–36 para proteger al recién nacido de tos ferina",
        "Final growth and development phase begins": "Comienza fase final de crecimiento y desarrollo",
        "Doctor checks if baby is head-down (cephalic) or breech": "Médico verifica si bebé está cabeza abajo (cefálico) o podálico",
        "Vaginal swab screens for Group B Streptococcus": "Hisopado vaginal detecta Estreptococo Grupo B",
        "Baby is considered early term (37–38 weeks)": "Bebé se considera término temprano (37–38 semanas)",
        "Baby is considered full term (39–40 weeks)": "Bebé se considera término completo (39–40 semanas)",
        "Average 40-week gestation target": "Objetivo promedio de gestación de 40 semanas",
        "Doctor may discuss induction if labor hasn't begun": "Médico puede discutir inducción si no ha comenzado trabajo de parto"
      },
      "formats": {
        "summary": "Tu fecha estimada de parto es {dueDate}. Actualmente estás en {gestationalAge} ({trimester}). El bebé es del tamaño de {babySizeFruit}. {daysRemaining} días restantes."
      },
      "presets": {
        "firstPregnancyLmp": {
          "label": "Primer Embarazo (FUM)",
          "description": "Ciclo 28 días, FUM nov 2025"
        },
        "ivfBlastocyst": {
          "label": "Transferencia FIV Día 5",
          "description": "Transferencia blastocisto ene 2026"
        },
        "earlyUltrasound": {
          "label": "Ecografía Temprana",
          "description": "Ecografía 8 semanas ene 2026"
        },
        "irregularCycle": {
          "label": "Ciclo Irregular (35 días)",
          "description": "Ciclo largo, FUM oct 2025"
        }
      },
      "infoCards": {
        "keyDates": {
          "title": "📅 Fechas Clave",
          "items": [
            {
              "label": "Fecha de Parto",
              "valueKey": "dueDate"
            },
            {
              "label": "Ventana de Parto",
              "valueKey": "deliveryWindow"
            },
            {
              "label": "Fecha de Concepción",
              "valueKey": "conceptionDate"
            },
            {
              "label": "Días Restantes",
              "valueKey": "daysRemaining"
            }
          ]
        },
        "babyNow": {
          "title": "👶 Bebé Esta Semana",
          "items": [
            {
              "label": "Semana Actual",
              "valueKey": "currentWeek"
            },
            {
              "label": "Tamaño del Bebé",
              "valueKey": "babySizeFruit"
            },
            {
              "label": "Longitud y Peso",
              "valueKey": "babyMeasurements"
            },
            {
              "label": "Desarrollo",
              "valueKey": "babyDevelopment"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos del Embarazo",
          "items": [
            "Solo cerca del 5% de bebés llegan en su fecha exacta — 80% nacen dentro de 10 días de la fecha estimada",
            "La ecografía del primer trimestre (antes de 13 semanas) es el método más preciso, dentro de ±5–7 días",
            "Ajustar la duración del ciclo y fase lútea da una fecha de parto más personalizada que asumir 28 días estándar",
            "Tu cronograma de hitos prenatales abajo muestra fechas estimadas para cada prueba y control clave"
          ]
        }
      },
      "detailedTable": {
        "prenatalTimeline": {
          "button": "Ver Cronograma Prenatal",
          "title": "Cronograma de Pruebas e Hitos Prenatales",
          "columns": {
            "milestone": "Hito",
            "estimatedDate": "Fecha Estimada",
            "gestAge": "Edad Gestacional",
            "notes": "Notas"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es una Fecha Estimada de Parto?",
          "content": "Una fecha estimada de parto (FEP) es la fecha proyectada cuando se espera que una persona embarazada dé a luz a su bebé. Típicamente se calcula como 280 días (40 semanas) desde el primer día de la última menstruación, asumiendo un ciclo estándar de 28 días. Sin embargo, porque las duraciones de ciclos varían ampliamente (21–45 días) y la ovulación no siempre ocurre en el día 14, métodos más personalizados — incluyendo ajuste de duración del ciclo, corrección de fase lútea, fechas de transferencia FIV, y mediciones tempranas de ecografía — mejoran significativamente la precisión. La investigación muestra que solo cerca del 4–5% de bebés nacen en su fecha exacta. Cerca del 80% llegan dentro de 10 días de la FEP, y cualquier nacimiento entre 37 y 42 semanas se considera dentro del rango normal. Tu fecha de parto se entiende mejor como el punto central de una ventana de parto, no una fecha límite precisa."
        },
        "howItWorks": {
          "title": "Cómo se Calculan las Fechas de Parto",
          "content": "Esta calculadora soporta cinco métodos de estimación. El método de Fecha de Última Menstruación (FUM) usa la regla de Naegele con ajustes para tu duración personal de ciclo y fase lútea: calcula la fecha probable de ovulación (duración del ciclo menos duración de fase lútea), luego añade 266 días para llegar a la fecha de parto. El método de Fecha de Concepción añade 266 días a la fecha conocida de fertilización. Para transferencias FIV, la calculadora cuenta la edad del embrión en la transferencia (3, 5, o 6 días) y añade el número apropiado de días para llegar a 40 semanas de edad gestacional — las fechas FIV tienden a ser las más precisas ya que el momento exacto de fertilización es conocido. El método de Ecografía trabaja hacia atrás desde la edad gestacional determinada durante un escaneo temprano, y las ecografías del primer trimestre (antes de 13 semanas) se consideran el estándar dorado para precisión de datación. Finalmente, el método de Fecha de Parto Conocida (reverso) retro-calcula tu fecha de concepción y FUM, útil para entender tu cronograma completo de embarazo."
        },
        "considerations": {
          "title": "Consideraciones Importantes",
          "items": [
            {
              "text": "Las ecografías del primer trimestre (antes de 13 semanas) son el estándar dorado para precisión de datación del embarazo, con un margen de error de solo ±5–7 días según las guías ACOG",
              "type": "info"
            },
            {
              "text": "Los ciclos menstruales irregulares pueden hacer menos confiable la datación basada en FUM — si tus ciclos varían más de 7 días, considera el método de ecografía o concepción",
              "type": "warning"
            },
            {
              "text": "Solo cerca del 4–5% de bebés nacen en su fecha exacta; 80% llegan dentro de 10 días, y la ventana de 37–42 semanas es completamente normal",
              "type": "info"
            },
            {
              "text": "Las fechas de parto FIV tienden a ser las más precisas de todos los métodos porque las fechas exactas de fertilización y transferencia son conocidas",
              "type": "info"
            },
            {
              "text": "Tu proveedor de salud puede ajustar tu fecha de parto después de una ecografía temprana si difiere por más de 7 días de las estimaciones basadas en FUM",
              "type": "warning"
            },
            {
              "text": "Los embarazos que duran más de 42 semanas (post-término) conllevan riesgos mayores — ACOG recomienda discutir inducción entre 41 y 42 semanas",
              "type": "warning"
            }
          ]
        },
        "milestones": {
          "title": "Definiciones de Términos e Hitos Clave",
          "items": [
            {
              "text": "Primer Trimestre (Semanas 1–13): El corazón del bebé comienza a latir alrededor de la semana 6; para la semana 12, todos los órganos principales se han formado y el riesgo de aborto baja significativamente a cerca del 2%",
              "type": "info"
            },
            {
              "text": "Segundo Trimestre (Semanas 14–27): La ecografía anatómica en 18–22 semanas verifica desarrollo estructural y puede revelar el sexo; movimientos fetales (aceleración) típicamente se sienten entre semanas 18–22",
              "type": "info"
            },
            {
              "text": "Tercer Trimestre (Semanas 28–40): Aumento rápido de peso y desarrollo cerebral; bebé alcanza viabilidad alrededor de 24 semanas; pulmones continúan madurando hasta 36 semanas",
              "type": "info"
            },
            {
              "text": "Pretérmino: Antes de 37 semanas | Término Temprano: 37–38 semanas | Término Completo: 39–40 semanas | Término Tardío: 41 semanas | Post-Término: 42+ semanas",
              "type": "warning"
            },
            {
              "text": "Tamizajes Clave: NIPT/translucencia nucal (10–13 semanas), Cuádruple marcador (15–20 semanas), Ecografía anatómica (18–22 semanas), Prueba glucosa (24–28 semanas), Prueba EGB (35–37 semanas)",
              "type": "info"
            },
            {
              "text": "El calendario chino de predicción de género es una herramienta tradicional divertida con ~50% precisión (no mejor que el azar) — basada en edad lunar de la madre y mes de concepción, solo para entretenimiento",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculos",
          "description": "Ejemplos paso a paso para diferentes métodos de estimación",
          "examples": [
            {
              "title": "Método FUM (ciclo 28 días)",
              "steps": [
                "Última menstruación comenzó: 1 de enero, 2026",
                "Duración del ciclo: 28 días, Fase lútea: 14 días",
                "Día de ovulación: 28 − 14 = día 14 → 15 de enero",
                "Fecha de parto: 15 de enero + 266 días = 8 de octubre, 2026",
                "Atajo de Naegele: 1 ene + 1 año − 3 meses + 7 días = 8 oct"
              ],
              "result": "Fecha de Parto: 8 de octubre, 2026"
            },
            {
              "title": "Transferencia FIV Blastocisto Día 5",
              "steps": [
                "Fecha de transferencia: 10 de febrero, 2026",
                "Edad del embrión: 5 días (blastocisto)",
                "Gestación en transferencia: 2 semanas + 5 días = 19 días",
                "Días restantes: 280 − 19 = 261 días",
                "Fecha de parto: 10 de febrero + 261 = 29 de octubre, 2026"
              ],
              "result": "Fecha de Parto: 29 de octubre, 2026"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Qué tan precisa es una calculadora de fecha de parto?",
          "answer": "Las calculadoras de fecha de parto proporcionan una estimación basada en la duración promedio gestacional (280 días desde FUM). La precisión depende del método: la ecografía del primer trimestre es más precisa (±5–7 días), las fechas FIV son casi tan precisas, y el cálculo basado en FUM puede estar errado por 1–2 semanas para ciclos irregulares. Solo cerca del 4–5% de bebés llegan en la fecha exacta — la mayoría nacen dentro de una ventana de 10 días alrededor de la FEP."
        },
        {
          "question": "¿Cuál es la diferencia entre edad gestacional y edad fetal?",
          "answer": "La edad gestacional se cuenta desde el primer día de tu última menstruación (FUM), que es cerca de 2 semanas antes de que la concepción realmente ocurra. La edad fetal (edad embrionaria) se cuenta desde la fecha real de concepción. Entonces a las '8 semanas de embarazo' (edad gestacional), el embrión tiene realmente cerca de 6 semanas. Los profesionales médicos casi siempre usan edad gestacional."
        },
        {
          "question": "¿Puede cambiar mi fecha de parto durante el embarazo?",
          "answer": "Sí. Si una ecografía temprana (antes de 13 semanas) muestra una edad gestacional que difiere de tu estimación basada en FUM por más de 7 días, tu proveedor de salud puede ajustar tu fecha de parto. Según las guías ACOG, las mediciones de ecografía del primer trimestre son el método de datación más confiable."
        },
        {
          "question": "¿Cómo se calcula una fecha de parto FIV?",
          "answer": "Las fechas de parto FIV se calculan desde la fecha de transferencia del embrión. Para un blastocisto Día 5, se añaden 261 días a la fecha de transferencia. Los embriones Día 3 añaden 263 días, y los blastocistos Día 6 añaden 260 días. Los cálculos FIV están entre los más precisos porque la fecha exacta de fertilización es conocida."
        },
        {
          "question": "¿Qué significa 'término completo' vs 'término temprano'?",
          "answer": "ACOG define: Pretérmino (antes de 37 semanas), Término Temprano (37–38 semanas), Término Completo (39–40 semanas), Término Tardío (41 semanas), Post-Término (42+ semanas). Término completo es la ventana ideal con los mejores resultados de salud."
        },
        {
          "question": "¿Realmente afecta la duración del ciclo la fecha de parto?",
          "answer": "Sí, significativamente. El cálculo estándar de 280 días asume un ciclo de 28 días con ovulación en el día 14. Un ciclo de 35 días significa ovulación alrededor del día 21 — desplazando tu fecha de parto por 7 días. Esta calculadora se ajusta tanto para duración del ciclo como fase lútea para mejor precisión."
        },
        {
          "question": "¿Qué es el calendario chino de predicción de género?",
          "answer": "Una herramienta tradicional supuestamente de más de 700 años que afirma predecir el sexo del bebé basado en la edad lunar de la madre y mes de concepción. Los estudios científicos muestran que es cerca del 50% preciso — lo mismo que lanzar una moneda. Se incluye aquí como una tradición divertida, no una herramienta médica."
        },
        {
          "question": "¿Qué es una 'ecografía de datación' y cuándo debería hacerme una?",
          "answer": "Una ecografía de datación (típicamente 7–12 semanas) mide la longitud corona-rabadilla del embrión para determinar edad gestacional. Es el método de datación más preciso con ±5–7 días de margen de error. Tanto ACOG como NHS la recomiendan en el primer trimestre, especialmente para ciclos irregulares."
        },
        {
          "question": "¿Qué pasa si paso mi fecha de parto?",
          "answer": "Cerca del 50% de madres primerizas dan a luz después de 40 semanas. A las 41 semanas, tu proveedor aumenta el monitoreo. Para las 42 semanas, la mayoría de guías (ACOG, NICE) recomiendan discutir inducción ya que los riesgos aumentan por declive de función placentaria y reducción de líquido amniótico."
        },
        {
          "question": "¿Pueden los gemelos tener una fecha de parto diferente?",
          "answer": "Los embarazos gemelares usan el mismo cálculo inicial, pero el parto esperado es más temprano — alrededor de 36–37 semanas en promedio. Tu proveedor puede recomendar parto entre 36–38 semanas dependiendo de si los gemelos son idénticos (monocoriónicos) o fraternales (dicoriónicos)."
        }
      ],
      "chart": {
        "title": "Crecimiento del Bebé por Semana",
        "xLabel": "Semana",
        "yLabel": "Peso (oz / lb)",
        "series": {
          "weightOz": "Peso del Bebé"
        }
      },
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
      "name": "Calculadora de Data Prevista de Parto",
      "slug": "calculadora-data-prevista-parto",
      "subtitle": "Estime sua data prevista de parto, acompanhe o crescimento semanal do bebê e visualize sua linha do tempo completa de marcos pré-natais com datas personalizadas",
      "breadcrumb": "Data de Parto",
      "seo": {
        "title": "Calculadora Data de Parto - Estimador de Gravidez e Entrega",
        "description": "Calcule sua data prevista de parto usando DUM, ultrassom, FIV ou data de concepção. Acompanhe o tamanho do bebê por semana, visualize marcos pré-natais e obtenha sua janela de parto.",
        "shortDescription": "Estime sua data prevista de parto e acompanhe marcos da gravidez",
        "keywords": [
          "calculadora data de parto",
          "calculadora gravidez",
          "data prevista parto",
          "data estimada nascimento",
          "calculadora idade gestacional",
          "calculadora FIV data parto",
          "quando meu bebê vai nascer",
          "tamanho bebê por semana"
        ]
      },
      "inputs": {
        "method": {
          "label": "Método de Cálculo",
          "helpText": "Escolha como você quer estimar sua data prevista de parto",
          "options": {
            "lmp": "Data da Última Menstruação (DUM)",
            "conception": "Data da Concepção",
            "ivf": "Data da Transferência de FIV",
            "ultrasound": "Data do Ultrassom",
            "knownDueDate": "Já Sei Minha Data Prevista"
          }
        },
        "inputDate": {
          "label": "Data",
          "helpText": "Selecione a data para o método de cálculo escolhido"
        },
        "cycleLength": {
          "label": "Duração Média do Ciclo",
          "helpText": "Dias médios do seu ciclo menstrual (21–45, padrão 28)"
        },
        "lutealPhase": {
          "label": "Duração da Fase Lútea",
          "helpText": "Dias entre ovulação e próxima menstruação (10–16, padrão 14)"
        },
        "ivfEmbryo": {
          "label": "Idade do Embrião na Transferência",
          "helpText": "Transferências do 5º dia (blastocisto) são mais comuns",
          "options": {
            "day3": "Embrião 3º Dia",
            "day5": "Blastocisto 5º Dia",
            "day6": "Blastocisto 6º Dia"
          }
        },
        "gestWeeks": {
          "label": "Semanas no Ultrassom",
          "helpText": "Idade gestacional em semanas no momento do ultrassom"
        },
        "gestDays": {
          "label": "Dias",
          "helpText": "Dias adicionais (0–6)"
        },
        "motherBirthYear": {
          "label": "Ano de Nascimento da Mãe (opcional)",
          "helpText": "Para Previsão de Gênero Chinesa — apenas por diversão! Não é conselho médico"
        }
      },
      "inputGroups": {},
      "results": {
        "dueDate": {
          "label": "Data Prevista de Parto"
        },
        "gestationalAge": {
          "label": "Idade Gestacional"
        },
        "trimester": {
          "label": "Trimestre Atual"
        },
        "daysRemaining": {
          "label": "Dias Restantes"
        },
        "conceptionDate": {
          "label": "Concepção Estimada"
        },
        "deliveryWindow": {
          "label": "Janela de Parto"
        },
        "currentWeek": {
          "label": "Semana Atual"
        },
        "babySizeFruit": {
          "label": "Tamanho do Bebê"
        },
        "babyMeasurements": {
          "label": "Comprimento e Peso"
        },
        "babyDevelopment": {
          "label": "Destaque do Desenvolvimento"
        },
        "zodiacSign": {
          "label": "Signo do Bebê"
        },
        "birthstone": {
          "label": "Pedra de Nascimento"
        },
        "birthSeason": {
          "label": "Estação do Nascimento"
        },
        "trimesterProgress": {
          "label": "Progresso da Gravidez"
        },
        "genderPrediction": {
          "label": "Previsão de Gênero Chinesa"
        }
      },
      "tooltips": {
        "dueDate": "Baseado em gestação de 40 semanas (280 dias) da sua última menstruação, ajustado para duração do ciclo e fase lútea",
        "gestationalAge": "Quão avançada está sua gravidez, contado do primeiro dia da última menstruação",
        "deliveryWindow": "A maioria dos bebês nasce entre 37 e 42 semanas — apenas cerca de 5% chegam na data prevista exata",
        "daysRemaining": "Dias de calendário até sua data prevista de parto",
        "conceptionDate": "Data estimada de fertilização, cerca de 2 semanas após DUM para ciclo de 28 dias",
        "babySizeFruit": "Comparação divertida do tamanho aproximado do bebê com frutas e vegetais familiares",
        "babyDevelopment": "Marco-chave do desenvolvimento acontecendo nesta semana",
        "zodiacSign": "O signo astrológico baseado na sua data prevista de parto",
        "birthstone": "A pedra de nascimento tradicional associada ao mês esperado de nascimento do bebê",
        "trimesterProgress": "Percentual de gravidez completado baseado em 40 semanas",
        "genderPrediction": "Previsão do mapa chinês antigo — apenas para entretenimento, não conselho médico (50% de precisão)"
      },
      "values": {
        "Janeiro": "Janeiro",
        "Fevereiro": "Fevereiro",
        "Março": "Março",
        "Abril": "Abril",
        "Maio": "Maio",
        "Junho": "Junho",
        "Julho": "Julho",
        "Agosto": "Agosto",
        "Setembro": "Setembro",
        "Outubro": "Outubro",
        "Novembro": "Novembro",
        "Dezembro": "Dezembro",
        "Primeiro Trimestre": "Primeiro Trimestre",
        "Segundo Trimestre": "Segundo Trimestre",
        "Terceiro Trimestre": "Terceiro Trimestre",
        "Pós-Termo": "Pós-Termo",
        "Ainda Não Grávida": "Ainda Não Grávida",
        "dia": "dia",
        "dias": "dias",
        "semana": "semana",
        "semanas": "semanas",
        "Semana": "Semana",
        "Áries": "Áries",
        "Touro": "Touro",
        "Gêmeos": "Gêmeos",
        "Câncer": "Câncer",
        "Leão": "Leão",
        "Virgem": "Virgem",
        "Libra": "Libra",
        "Escorpião": "Escorpião",
        "Sagitário": "Sagitário",
        "Capricórnio": "Capricórnio",
        "Aquário": "Aquário",
        "Peixes": "Peixes",
        "Primavera": "Primavera",
        "Verão": "Verão",
        "Outono": "Outono",
        "Inverno": "Inverno",
        "Semente de Papoula": "Semente de Papoula",
        "Semente de Gergelim": "Semente de Gergelim",
        "Lentilha": "Lentilha",
        "Mirtilo": "Mirtilo",
        "Framboesa": "Framboesa",
        "Cereja": "Cereja",
        "Morango": "Morango",
        "Figo": "Figo",
        "Lima": "Lima",
        "Limão": "Limão",
        "Pêssego": "Pêssego",
        "Maçã": "Maçã",
        "Abacate": "Abacate",
        "Pêra": "Pêra",
        "Pimentão": "Pimentão",
        "Manga": "Manga",
        "Banana": "Banana",
        "Cenoura": "Cenoura",
        "Milho na Espiga": "Milho na Espiga",
        "Manga Grande": "Manga Grande",
        "Espiga de Milho": "Espiga de Milho",
        "Nabo Sueco": "Nabo Sueco",
        "Alface": "Alface",
        "Couve-flor": "Couve-flor",
        "Berinjela": "Berinjela",
        "Abóbora Bolota": "Abóbora Bolota",
        "Repolho": "Repolho",
        "Coco": "Coco",
        "Jicama": "Jicama",
        "Abacaxi": "Abacaxi",
        "Melão Cantaloupe": "Melão Cantaloupe",
        "Melão": "Melão",
        "Alface Romana": "Alface Romana",
        "Acelga": "Acelga",
        "Mini Melancia": "Mini Melancia",
        "Abóbora": "Abóbora",
        "Melancia": "Melancia",
        "Melancia Grande": "Melancia Grande",
        "Jaca": "Jaca",
        "completo": "completo",
        "hoje": "hoje",
        "Termo Precoce": "Termo Precoce",
        "Termo Completo": "Termo Completo",
        "Termo Tardio": "Termo Tardio",
        "Granada": "Granada",
        "Ametista": "Ametista",
        "Água-marinha": "Água-marinha",
        "Diamante": "Diamante",
        "Esmeralda": "Esmeralda",
        "Alexandrita": "Alexandrita",
        "Rubi": "Rubi",
        "Peridoto": "Peridoto",
        "Safira": "Safira",
        "Opala": "Opala",
        "Topázio": "Topázio",
        "Tanzanita": "Tanzanita",
        "Menino": "Menino",
        "Menina": "Menina",
        "Apenas por diversão!": "Apenas por diversão!",
        "proteção e força": "proteção e força",
        "sabedoria e paz": "sabedoria e paz",
        "coragem e serenidade": "coragem e serenidade",
        "amor eterno e clareza": "amor eterno e clareza",
        "renascimento e fertilidade": "renascimento e fertilidade",
        "sorte e boa fortuna": "sorte e boa fortuna",
        "paixão e vitalidade": "paixão e vitalidade",
        "força e cura": "força e cura",
        "verdade e lealdade": "verdade e lealdade",
        "esperança e criatividade": "esperança e criatividade",
        "alegria e abundância": "alegria e abundância",
        "transformação e novos começos": "transformação e novos começos",
        "Primeiro Batimento Cardíaco Detectável": "Primeiro Batimento Cardíaco Detectável",
        "Primeira Consulta Pré-natal": "Primeira Consulta Pré-natal",
        "NIPT / Triagem Translucência Nucal": "NIPT / Triagem Translucência Nucal",
        "Final do Primeiro Trimestre": "Final do Primeiro Trimestre",
        "Janela Triagem Quádrupla": "Janela Triagem Quádrupla",
        "Ultrassom Anatômico (Nível 2)": "Ultrassom Anatômico (Nível 2)",
        "Marco de Viabilidade": "Marco de Viabilidade",
        "Teste de Triagem de Glicose": "Teste de Triagem de Glicose",
        "Janela Vacina Tdap": "Janela Vacina Tdap",
        "Terceiro Trimestre Inicia": "Terceiro Trimestre Inicia",
        "Verificação Posição Fetal": "Verificação Posição Fetal",
        "Teste Estreptococo Grupo B (EGB)": "Teste Estreptococo Grupo B (EGB)",
        "Termo Precoce Inicia": "Termo Precoce Inicia",
        "Termo Completo Inicia": "Termo Completo Inicia",
        "Data Prevista de Parto": "Data Prevista de Parto",
        "Consideração Pós-Termo": "Consideração Pós-Termo",
        "Detectável via ultrassom transvaginal": "Detectável via ultrassom transvaginal",
        "Exames de sangue iniciais, histórico médico, exame físico": "Exames de sangue iniciais, histórico médico, exame físico",
        "Janela de triagem cromossômica não invasiva": "Janela de triagem cromossômica não invasiva",
        "Principais sistemas orgânicos formados; risco de aborto diminui": "Principais sistemas orgânicos formados; risco de aborto diminui",
        "Triagem para defeitos do tubo neural e condições cromossômicas": "Triagem para defeitos do tubo neural e condições cromossômicas",
        "Ultrassom estrutural detalhado; sexo pode ser visível": "Ultrassom estrutural detalhado; sexo pode ser visível",
        "Bebê poderia potencialmente sobreviver fora do útero com cuidados de UTI neonatal": "Bebê poderia potencialmente sobreviver fora do útero com cuidados de UTI neonatal",
        "Triagem para diabetes mellitus gestacional (DMG)": "Triagem para diabetes mellitus gestacional (DMG)",
        "Recomendada entre 27–36 semanas para proteger recém-nascido da coqueluche": "Recomendada entre 27–36 semanas para proteger recém-nascido da coqueluche",
        "Fase final de crescimento e desenvolvimento inicia": "Fase final de crescimento e desenvolvimento inicia",
        "Médico verifica se bebê está de cabeça para baixo (cefálico) ou pélvico": "Médico verifica se bebê está de cabeça para baixo (cefálico) ou pélvico",
        "Coleta vaginal triagem para Estreptococo Grupo B": "Coleta vaginal triagem para Estreptococo Grupo B",
        "Bebê é considerado termo precoce (37–38 semanas)": "Bebê é considerado termo precoce (37–38 semanas)",
        "Bebê é considerado termo completo (39–40 semanas)": "Bebê é considerado termo completo (39–40 semanas)",
        "Meta média de gestação de 40 semanas": "Meta média de gestação de 40 semanas",
        "Médico pode discutir indução se trabalho de parto não começou": "Médico pode discutir indução se trabalho de parto não começou"
      },
      "formats": {
        "summary": "Sua data prevista de parto é {dueDate}. Você está atualmente com {gestationalAge} ({trimester}). O bebê tem aproximadamente o tamanho de {babySizeFruit}. {daysRemaining} dias restantes."
      },
      "presets": {
        "firstPregnancyLmp": {
          "label": "Primeira Gravidez (DUM)",
          "description": "Ciclo 28 dias, DUM Nov 2025"
        },
        "ivfBlastocyst": {
          "label": "Transferência FIV 5º Dia",
          "description": "Transferência blastocisto Jan 2026"
        },
        "earlyUltrasound": {
          "label": "Ultrassom Precoce",
          "description": "Ultrassom datação 8 semanas Jan 2026"
        },
        "irregularCycle": {
          "label": "Ciclo Irregular (35 dias)",
          "description": "Ciclo longo, DUM Out 2025"
        }
      },
      "infoCards": {
        "keyDates": {
          "title": "📅 Datas Importantes",
          "items": [
            {
              "label": "Data de Parto",
              "valueKey": "dueDate"
            },
            {
              "label": "Janela de Parto",
              "valueKey": "deliveryWindow"
            },
            {
              "label": "Data de Concepção",
              "valueKey": "conceptionDate"
            },
            {
              "label": "Dias Restantes",
              "valueKey": "daysRemaining"
            }
          ]
        },
        "babyNow": {
          "title": "👶 Bebê Esta Semana",
          "items": [
            {
              "label": "Semana Atual",
              "valueKey": "currentWeek"
            },
            {
              "label": "Tamanho do Bebê",
              "valueKey": "babySizeFruit"
            },
            {
              "label": "Comprimento e Peso",
              "valueKey": "babyMeasurements"
            },
            {
              "label": "Desenvolvimento",
              "valueKey": "babyDevelopment"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas de Gravidez",
          "items": [
            "Apenas cerca de 5% dos bebês chegam na data prevista exata — 80% nascem dentro de 10 dias da data estimada",
            "Ultrassom do primeiro trimestre (antes de 13 semanas) é o método de datação mais preciso, com margem de ±5–7 dias",
            "Ajustar duração do ciclo e fase lútea fornece uma data de parto mais personalizada que a suposição padrão de 28 dias",
            "Sua linha do tempo de marcos pré-natais abaixo mostra datas estimadas para cada teste e consulta importante"
          ]
        }
      },
      "detailedTable": {
        "prenatalTimeline": {
          "button": "Ver Linha do Tempo Pré-natal",
          "title": "Linha do Tempo de Testes e Marcos Pré-natais",
          "columns": {
            "milestone": "Marco",
            "estimatedDate": "Data Estimada",
            "gestAge": "Idade Gestacional",
            "notes": "Observações"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "O Que É Uma Data Prevista de Parto?",
          "content": "Uma data prevista de parto (DPP), também chamada de data estimada de confinamento (DEC), é a data projetada quando uma pessoa grávida espera dar à luz seu bebê. É tipicamente calculada como 280 dias (40 semanas) do primeiro dia da última menstruação, assumindo um ciclo padrão de 28 dias. Contudo, como as durações dos ciclos variam amplamente (21–45 dias) e a ovulação nem sempre acontece no 14º dia, métodos mais personalizados — incluindo ajuste da duração do ciclo, correção da fase lútea, datas de transferência de FIV e medições de ultrassom precoce — melhoram significativamente a precisão. Pesquisas mostram que apenas cerca de 4–5% dos bebês nascem na data prevista exata. Cerca de 80% chegam dentro de 10 dias da DPP, e qualquer nascimento entre 37 e 42 semanas é considerado dentro da faixa normal. Sua data de parto é melhor entendida como o ponto central de uma janela de parto, não um prazo preciso."
        },
        "howItWorks": {
          "title": "Como as Datas de Parto São Calculadas",
          "content": "Esta calculadora suporta cinco métodos de estimativa. O método da Data da Última Menstruação (DUM) usa a regra de Naegele com ajustes para sua duração pessoal do ciclo e fase lútea: calcula a data provável de ovulação (duração do ciclo menos duração da fase lútea), então adiciona 266 dias para chegar à data de parto. O método da Data de Concepção adiciona 266 dias à data conhecida de fertilização. Para transferências de FIV, a calculadora considera a idade do embrião na transferência (3, 5 ou 6 dias) e adiciona o número apropriado de dias para atingir 40 semanas de idade gestacional — datas de FIV tendem a ser as mais precisas já que o tempo exato de fertilização é conhecido. O método do Ultrassom trabalha retroativamente a partir da idade gestacional determinada durante um exame precoce, e ultrassons do primeiro trimestre (antes de 13 semanas) são considerados o padrão ouro para precisão de datação. Finalmente, o método de Data Prevista Conhecida (reverso) calcula retroativamente sua data de concepção e DUM, útil para entender sua linha do tempo completa de gravidez."
        },
        "considerations": {
          "title": "Considerações Importantes",
          "items": [
            {
              "text": "Ultrassons do primeiro trimestre (antes de 13 semanas) são o padrão ouro para precisão de datação de gravidez, com margem de erro de apenas ±5–7 dias segundo diretrizes do ACOG",
              "type": "info"
            },
            {
              "text": "Ciclos menstruais irregulares podem tornar a datação baseada em DUM menos confiável — se seus ciclos variam mais de 7 dias, considere o método de ultrassom ou concepção",
              "type": "warning"
            },
            {
              "text": "Apenas cerca de 4–5% dos bebês nascem na data prevista exata; 80% chegam dentro de 10 dias, e a janela de 37–42 semanas é completamente normal",
              "type": "info"
            },
            {
              "text": "Datas de parto de FIV tendem a ser as mais precisas de todos os métodos porque as datas exatas de fertilização e transferência são conhecidas",
              "type": "info"
            },
            {
              "text": "Seu profissional de saúde pode ajustar sua data de parto após um ultrassom precoce se diferir mais de 7 dias das estimativas baseadas em DUM",
              "type": "warning"
            },
            {
              "text": "Gravidezes que se estendem além de 42 semanas (pós-termo) carregam riscos maiores — ACOG recomenda discutir indução entre 41 e 42 semanas",
              "type": "warning"
            }
          ]
        },
        "milestones": {
          "title": "Definições de Termos e Marcos Importantes",
          "items": [
            {
              "text": "Primeiro Trimestre (Semanas 1–13): Coração do bebê começa a bater por volta da semana 6; na semana 12, todos os órgãos principais se formaram e o risco de aborto cai significativamente para cerca de 2%",
              "type": "info"
            },
            {
              "text": "Segundo Trimestre (Semanas 14–27): O ultrassom anatômico nas semanas 18–22 verifica desenvolvimento estrutural e pode revelar o sexo; movimentos fetais (aceleração) tipicamente sentidos entre semanas 18–22",
              "type": "info"
            },
            {
              "text": "Terceiro Trimestre (Semanas 28–40): Ganho rápido de peso e desenvolvimento cerebral; bebê atinge viabilidade por volta de 24 semanas; pulmões continuam amadurecendo até 36 semanas",
              "type": "info"
            },
            {
              "text": "Pré-termo: Antes de 37 semanas | Termo Precoce: 37–38 semanas | Termo Completo: 39–40 semanas | Termo Tardio: 41 semanas | Pós-Termo: 42+ semanas",
              "type": "warning"
            },
            {
              "text": "Triagens Importantes: NIPT/Translucência nucal (10–13 semanas), Triagem quádrupla (15–20 semanas), Ultrassom anatômico (18–22 semanas), Teste de glicose (24–28 semanas), Teste EGB (35–37 semanas)",
              "type": "info"
            },
            {
              "text": "O mapa de Previsão de Gênero Chinês é uma ferramenta tradicional divertida com ~50% de precisão (não melhor que chance) — baseado na idade lunar da mãe e mês de concepção, apenas para entretenimento",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo",
          "description": "Exemplos passo a passo para diferentes métodos de estimativa",
          "examples": [
            {
              "title": "Método DUM (ciclo 28 dias)",
              "steps": [
                "Última menstruação começou: 1º de janeiro de 2026",
                "Duração do ciclo: 28 dias, Fase lútea: 14 dias",
                "Dia da ovulação: 28 − 14 = dia 14 → 15 de janeiro",
                "Data de parto: 15 de janeiro + 266 dias = 8 de outubro de 2026",
                "Atalho de Naegele: 1º jan + 1 ano − 3 meses + 7 dias = 8 out"
              ],
              "result": "Data de Parto: 8 de outubro de 2026"
            },
            {
              "title": "Transferência FIV Blastocisto 5º Dia",
              "steps": [
                "Data da transferência: 10 de fevereiro de 2026",
                "Idade do embrião: 5 dias (blastocisto)",
                "Gestação na transferência: 2 semanas + 5 dias = 19 dias",
                "Dias restantes: 280 − 19 = 261 dias",
                "Data de parto: 10 de fevereiro + 261 = 29 de outubro de 2026"
              ],
              "result": "Data de Parto: 29 de outubro de 2026"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quão precisa é uma calculadora de data de parto?",
          "answer": "Calculadoras de data de parto fornecem uma estimativa baseada na duração gestacional média (280 dias da DUM). A precisão depende do método: ultrassom do primeiro trimestre é mais preciso (±5–7 dias), datas de FIV são quase tão precisas, e cálculo baseado em DUM pode estar 1–2 semanas fora para ciclos irregulares. Apenas cerca de 4–5% dos bebês chegam na data prevista exata — a maioria nasce dentro de uma janela de 10 dias em torno da DPP."
        },
        {
          "question": "Qual a diferença entre idade gestacional e idade fetal?",
          "answer": "Idade gestacional é contada do primeiro dia da sua última menstruação (DUM), que é cerca de 2 semanas antes da concepção realmente ocorrer. Idade fetal (idade embrionária) é contada da data real de concepção. Então com '8 semanas de gravidez' (idade gestacional), o embrião tem na verdade cerca de 6 semanas. Profissionais médicos quase sempre usam idade gestacional."
        },
        {
          "question": "Minha data de parto pode mudar durante a gravidez?",
          "answer": "Sim. Se um ultrassom precoce (antes de 13 semanas) mostra uma idade gestacional que difere da sua estimativa baseada em DUM por mais de 7 dias, seu profissional de saúde pode ajustar sua data de parto. Segundo diretrizes do ACOG, medições de ultrassom do primeiro trimestre são o método de datação mais confiável."
        },
        {
          "question": "Como uma data de parto de FIV é calculada?",
          "answer": "Datas de parto de FIV são calculadas da data de transferência do embrião. Para um blastocisto do 5º dia, 261 dias são adicionados à data de transferência. Embriões do 3º dia adicionam 263 dias, e blastocistos do 6º dia adicionam 260 dias. Cálculos de FIV estão entre os mais precisos porque a data exata de fertilização é conhecida."
        },
        {
          "question": "O que significa 'termo completo' vs 'termo precoce'?",
          "answer": "ACOG define: Pré-termo (antes de 37 semanas), Termo Precoce (37–38 semanas), Termo Completo (39–40 semanas), Termo Tardio (41 semanas), Pós-Termo (42+ semanas). Termo completo é a janela ideal com os melhores resultados de saúde."
        },
        {
          "question": "A duração do ciclo realmente afeta a data de parto?",
          "answer": "Sim, significativamente. O cálculo padrão de 280 dias assume um ciclo de 28 dias com ovulação no 14º dia. Um ciclo de 35 dias significa ovulação por volta do 21º dia — mudando sua data de parto em 7 dias. Esta calculadora ajusta tanto para duração do ciclo quanto fase lútea para melhor precisão."
        },
        {
          "question": "O que é o mapa de Previsão de Gênero Chinês?",
          "answer": "Uma ferramenta tradicional supostamente com mais de 700 anos que afirma prever o sexo do bebê baseado na idade lunar da mãe e mês de concepção. Estudos científicos mostram que tem cerca de 50% de precisão — o mesmo que cara ou coroa. É incluído aqui como tradição divertida, não ferramenta médica."
        },
        {
          "question": "O que é um 'ultrassom de datação' e quando devo fazer um?",
          "answer": "Um ultrassom de datação (tipicamente 7–12 semanas) mede o comprimento crânio-nádega do embrião para determinar idade gestacional. É o método de datação mais preciso com margem de erro de ±5–7 dias. ACOG e NHS recomendam no primeiro trimestre, especialmente para ciclos irregulares."
        },
        {
          "question": "O que acontece se eu passar da data prevista?",
          "answer": "Cerca de 50% das mães de primeira viagem dão à luz após 40 semanas. Às 41 semanas, seu provedor aumenta o monitoramento. Às 42 semanas, a maioria das diretrizes (ACOG, NICE) recomendam discutir indução conforme os riscos aumentam por declínio da função placentária e redução do líquido amniótico."
        },
        {
          "question": "Gêmeos podem ter uma data de parto diferente?",
          "answer": "Gravidezes de gêmeos usam o mesmo cálculo inicial, mas o parto esperado é mais cedo — por volta de 36–37 semanas em média. Seu provedor pode recomendar parto entre 36–38 semanas dependendo se os gêmeos são idênticos (monocoriônicos) ou fraternos (dicoriônicos)."
        }
      ],
      "chart": {
        "title": "Crescimento do Bebê por Semana",
        "xLabel": "Semana",
        "yLabel": "Peso (g / kg)",
        "series": {
          "weightOz": "Peso do Bebê"
        }
      },
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
      "slug": "calculateur-date-accouchement",
      "subtitle": "Estimez votre date d'accouchement, suivez la croissance hebdomadaire de bébé et consultez votre calendrier complet des étapes prénatales avec dates personnalisées",
      "breadcrumb": "Date d'Accouchement",
      "seo": {
        "title": "Calculateur de Date d'Accouchement - Estimateur de Grossesse et Livraison",
        "description": "Calculez votre date d'accouchement en utilisant DDR, échographie, FIV ou date de conception. Suivez la taille de bébé par semaine, consultez les étapes prénatales et obtenez votre fenêtre de livraison.",
        "shortDescription": "Estimez votre date d'accouchement et suivez les étapes de grossesse",
        "keywords": [
          "calculateur date accouchement",
          "calculateur grossesse",
          "date accouchement grossesse",
          "date estimée livraison",
          "calculateur âge gestationnel",
          "calculateur date accouchement FIV",
          "quand naît mon bébé",
          "taille bébé par semaine"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "method": {
          "label": "Méthode de Calcul",
          "helpText": "Choisissez comment vous voulez estimer votre date d'accouchement",
          "options": {
            "lmp": "Dernières Règles (DDR)",
            "conception": "Date de Conception",
            "ivf": "Date de Transfert FIV",
            "ultrasound": "Date d'Échographie",
            "knownDueDate": "Je Connais Déjà Ma Date d'Accouchement"
          }
        },
        "inputDate": {
          "label": "Date",
          "helpText": "Sélectionnez la date pour votre méthode de calcul choisie"
        },
        "cycleLength": {
          "label": "Durée Moyenne du Cycle",
          "helpText": "Jours moyens dans votre cycle menstruel (21–45, défaut 28)"
        },
        "lutealPhase": {
          "label": "Durée de la Phase Lutéale",
          "helpText": "Jours entre ovulation et prochaines règles (10–16, défaut 14)"
        },
        "ivfEmbryo": {
          "label": "Âge de l'Embryon au Transfert",
          "helpText": "Les transferts jour 5 (blastocyste) sont les plus courants",
          "options": {
            "day3": "Embryon Jour 3",
            "day5": "Blastocyste Jour 5",
            "day6": "Blastocyste Jour 6"
          }
        },
        "gestWeeks": {
          "label": "Semaines à l'Échographie",
          "helpText": "Âge gestationnel en semaines au moment de l'échographie"
        },
        "gestDays": {
          "label": "Jours",
          "helpText": "Jours supplémentaires (0–6)"
        },
        "motherBirthYear": {
          "label": "Année de Naissance de la Mère (optionnel)",
          "helpText": "Pour la Prédiction du Sexe Chinoise — juste pour s'amuser ! Pas un conseil médical"
        }
      },
      "inputGroups": {},
      "results": {
        "dueDate": {
          "label": "Date d'Accouchement Estimée"
        },
        "gestationalAge": {
          "label": "Âge Gestationnel"
        },
        "trimester": {
          "label": "Trimestre Actuel"
        },
        "daysRemaining": {
          "label": "Jours Restants"
        },
        "conceptionDate": {
          "label": "Conception Estimée"
        },
        "deliveryWindow": {
          "label": "Fenêtre d'Accouchement"
        },
        "currentWeek": {
          "label": "Semaine Actuelle"
        },
        "babySizeFruit": {
          "label": "Taille de Bébé"
        },
        "babyMeasurements": {
          "label": "Longueur et Poids"
        },
        "babyDevelopment": {
          "label": "Point Fort du Développement"
        },
        "zodiacSign": {
          "label": "Signe Zodiacal de Bébé"
        },
        "birthstone": {
          "label": "Pierre de Naissance"
        },
        "birthSeason": {
          "label": "Saison de Naissance"
        },
        "trimesterProgress": {
          "label": "Progrès de Grossesse"
        },
        "genderPrediction": {
          "label": "Prédiction du Sexe Chinoise"
        }
      },
      "tooltips": {
        "dueDate": "Basé sur une gestation de 40 semaines (280 jours) depuis vos dernières règles, ajusté selon la durée de votre cycle et phase lutéale",
        "gestationalAge": "À quel point vous êtes avancée, compté depuis le premier jour de vos dernières règles",
        "deliveryWindow": "La plupart des bébés naissent entre 37 et 42 semaines — seulement environ 5% arrivent à la date exacte prévue",
        "daysRemaining": "Jours calendaires jusqu'à votre date d'accouchement estimée",
        "conceptionDate": "Date estimée de fécondation, environ 2 semaines après DDR pour un cycle de 28 jours",
        "babySizeFruit": "Une comparaison amusante de la taille approximative de votre bébé avec des fruits et légumes familiers",
        "babyDevelopment": "Étape clé du développement qui se passe cette semaine",
        "zodiacSign": "Le signe astrologique basé sur votre date d'accouchement estimée",
        "birthstone": "La pierre de naissance traditionnelle associée au mois de naissance prévu de votre bébé",
        "trimesterProgress": "Pourcentage de grossesse terminé basé sur 40 semaines",
        "genderPrediction": "Prédiction du tableau de naissance chinois ancien — pour divertissement seulement, pas conseil médical (précision 50/50)"
      },
      "values": {
        "January": "Janvier",
        "February": "Février",
        "March": "Mars",
        "April": "Avril",
        "May": "Mai",
        "June": "Juin",
        "July": "Juillet",
        "August": "Août",
        "September": "Septembre",
        "October": "Octobre",
        "November": "Novembre",
        "December": "Décembre",
        "First Trimester": "Premier Trimestre",
        "Second Trimester": "Deuxième Trimestre",
        "Third Trimester": "Troisième Trimestre",
        "Post-Term": "Post-Terme",
        "Not Yet Pregnant": "Pas Encore Enceinte",
        "day": "jour",
        "days": "jours",
        "week": "semaine",
        "weeks": "semaines",
        "Week": "Semaine",
        "Aries": "Bélier",
        "Taurus": "Taureau",
        "Gemini": "Gémeaux",
        "Cancer": "Cancer",
        "Leo": "Lion",
        "Virgo": "Vierge",
        "Libra": "Balance",
        "Scorpio": "Scorpion",
        "Sagittarius": "Sagittaire",
        "Capricorn": "Capricorne",
        "Aquarius": "Verseau",
        "Pisces": "Poissons",
        "Spring": "Printemps",
        "Summer": "Été",
        "Fall": "Automne",
        "Winter": "Hiver",
        "Poppy Seed": "Graine de Pavot",
        "Sesame Seed": "Graine de Sésame",
        "Lentil": "Lentille",
        "Blueberry": "Myrtille",
        "Raspberry": "Framboise",
        "Cherry": "Cerise",
        "Strawberry": "Fraise",
        "Fig": "Figue",
        "Lime": "Citron Vert",
        "Lemon": "Citron",
        "Peach": "Pêche",
        "Apple": "Pomme",
        "Avocado": "Avocat",
        "Pear": "Poire",
        "Bell Pepper": "Poivron",
        "Mango": "Mangue",
        "Banana": "Banane",
        "Carrot": "Carotte",
        "Corn on the Cob": "Épi de Maïs",
        "Large Mango": "Grande Mangue",
        "Ear of Corn": "Épi de Maïs",
        "Rutabaga": "Rutabaga",
        "Lettuce Head": "Tête de Laitue",
        "Cauliflower": "Chou-fleur",
        "Eggplant": "Aubergine",
        "Acorn Squash": "Courge Gland",
        "Cabbage": "Chou",
        "Coconut": "Noix de Coco",
        "Jicama": "Jicama",
        "Pineapple": "Ananas",
        "Cantaloupe": "Cantaloup",
        "Honeydew Melon": "Melon Miel",
        "Romaine Lettuce": "Laitue Romaine",
        "Swiss Chard": "Bette à Carde",
        "Mini Watermelon": "Mini Pastèque",
        "Pumpkin": "Citrouille",
        "Watermelon": "Pastèque",
        "Large Watermelon": "Grande Pastèque",
        "Jackfruit": "Jacquier",
        "complete": "terminé",
        "today": "aujourd'hui",
        "Early Term": "Terme Précoce",
        "Full Term": "Terme Complet",
        "Late Term": "Terme Tardif",
        "Garnet": "Grenat",
        "Amethyst": "Améthyste",
        "Aquamarine": "Aigue-marine",
        "Diamond": "Diamant",
        "Emerald": "Émeraude",
        "Alexandrite": "Alexandrite",
        "Ruby": "Rubis",
        "Peridot": "Péridot",
        "Sapphire": "Saphir",
        "Opal": "Opale",
        "Topaz": "Topaze",
        "Tanzanite": "Tanzanite",
        "Boy": "Garçon",
        "Girl": "Fille",
        "Just for fun!": "Juste pour s'amuser !",
        "protection & strength": "protection et force",
        "wisdom & peace": "sagesse et paix",
        "courage & serenity": "courage et sérénité",
        "eternal love & clarity": "amour éternel et clarté",
        "rebirth & fertility": "renaissance et fertilité",
        "luck & good fortune": "chance et bonne fortune",
        "passion & vitality": "passion et vitalité",
        "strength & healing": "force et guérison",
        "truth & loyalty": "vérité et loyauté",
        "hope & creativity": "espoir et créativité",
        "joy & abundance": "joie et abondance",
        "transformation & new beginnings": "transformation et nouveaux débuts",
        "First Heartbeat Detectable": "Premier Battement de Cœur Détectable",
        "First Prenatal Visit": "Première Visite Prénatale",
        "NIPT / Nuchal Translucency Screen": "DPNI / Dépistage Clarté Nucale",
        "End of First Trimester": "Fin du Premier Trimestre",
        "Quad Screen Window": "Fenêtre Dépistage Quadruple",
        "Anatomy Scan (Level 2 Ultrasound)": "Échographie Anatomique (Échographie Niveau 2)",
        "Viability Milestone": "Étape de Viabilité",
        "Glucose Screening Test": "Test de Dépistage du Glucose",
        "Tdap Vaccine Window": "Fenêtre Vaccin Tdap",
        "Third Trimester Begins": "Début du Troisième Trimestre",
        "Fetal Position Check": "Vérification Position Fœtale",
        "Group B Strep (GBS) Test": "Test Streptocoque Groupe B (SGB)",
        "Early Term Begins": "Début du Terme Précoce",
        "Full Term Begins": "Début du Terme Complet",
        "Estimated Due Date": "Date d'Accouchement Estimée",
        "Post-Term Consideration": "Considération Post-Terme",
        "Detectable via transvaginal ultrasound": "Détectable par échographie transvaginale",
        "Initial bloodwork, medical history, physical exam": "Analyses sanguines initiales, antécédents médicaux, examen physique",
        "Non-invasive chromosomal screening window": "Fenêtre de dépistage chromosomique non-invasif",
        "Major organ systems formed; miscarriage risk drops": "Principaux systèmes organiques formés ; risque de fausse couche diminue",
        "Screens for neural tube defects and chromosomal conditions": "Dépiste les défauts du tube neural et conditions chromosomiques",
        "Detailed structural ultrasound; sex may be visible": "Échographie structurelle détaillée ; le sexe peut être visible",
        "Baby could potentially survive outside the womb with NICU care": "Bébé pourrait potentiellement survivre hors de l'utérus avec soins USIN",
        "Screens for gestational diabetes mellitus (GDM)": "Dépiste le diabète gestationnel (DG)",
        "Recommended between 27–36 weeks to protect newborn from whooping cough": "Recommandé entre 27–36 semaines pour protéger le nouveau-né de la coqueluche",
        "Final growth and development phase begins": "Phase finale de croissance et développement commence",
        "Doctor checks if baby is head-down (cephalic) or breech": "Le médecin vérifie si bébé est tête en bas (céphalique) ou siège",
        "Vaginal swab screens for Group B Streptococcus": "Prélèvement vaginal dépiste le Streptocoque du Groupe B",
        "Baby is considered early term (37–38 weeks)": "Bébé est considéré terme précoce (37–38 semaines)",
        "Baby is considered full term (39–40 weeks)": "Bébé est considéré terme complet (39–40 semaines)",
        "Average 40-week gestation target": "Objectif de gestation moyenne de 40 semaines",
        "Doctor may discuss induction if labor hasn't begun": "Le médecin peut discuter déclenchement si travail pas commencé"
      },
      "formats": {
        "summary": "Votre date d'accouchement estimée est le {dueDate}. Vous êtes actuellement à {gestationalAge} ({trimester}). Bébé fait environ la taille d'une {babySizeFruit}. {daysRemaining} jours restants."
      },
      "presets": {
        "firstPregnancyLmp": {
          "label": "Première Grossesse (DDR)",
          "description": "Cycle de 28 jours, DDR nov 2025"
        },
        "ivfBlastocyst": {
          "label": "Transfert FIV Jour 5",
          "description": "Transfert blastocyste jan 2026"
        },
        "earlyUltrasound": {
          "label": "Échographie Précoce",
          "description": "Échographie datation 8 semaines jan 2026"
        },
        "irregularCycle": {
          "label": "Cycle Irrégulier (35 jours)",
          "description": "Cycle plus long, DDR oct 2025"
        }
      },
      "infoCards": {
        "keyDates": {
          "title": "📅 Dates Clés",
          "items": [
            {
              "label": "Date d'Accouchement",
              "valueKey": "dueDate"
            },
            {
              "label": "Fenêtre d'Accouchement",
              "valueKey": "deliveryWindow"
            },
            {
              "label": "Date de Conception",
              "valueKey": "conceptionDate"
            },
            {
              "label": "Jours Restants",
              "valueKey": "daysRemaining"
            }
          ]
        },
        "babyNow": {
          "title": "👶 Bébé Cette Semaine",
          "items": [
            {
              "label": "Semaine Actuelle",
              "valueKey": "currentWeek"
            },
            {
              "label": "Taille de Bébé",
              "valueKey": "babySizeFruit"
            },
            {
              "label": "Longueur et Poids",
              "valueKey": "babyMeasurements"
            },
            {
              "label": "Développement",
              "valueKey": "babyDevelopment"
            }
          ]
        },
        "tips": {
          "title": "💡 Conseils de Grossesse",
          "items": [
            "Seulement environ 5% des bébés arrivent à leur date exacte d'accouchement — 80% naissent dans les 10 jours de la DPA",
            "L'échographie du premier trimestre (avant 13 semaines) est la méthode de datation la plus précise, à ±5–7 jours près",
            "Ajuster la durée du cycle et la phase lutéale donne une date d'accouchement plus personnalisée que l'hypothèse standard de 28 jours",
            "Votre calendrier des étapes prénatales ci-dessous montre les dates estimées pour chaque test et contrôle clé"
          ]
        }
      },
      "detailedTable": {
        "prenatalTimeline": {
          "button": "Voir Calendrier Prénatal",
          "title": "Calendrier des Tests et Étapes Prénatales",
          "columns": {
            "milestone": "Étape",
            "estimatedDate": "Date Estimée",
            "gestAge": "Âge Gestationnel",
            "notes": "Notes"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'une Date d'Accouchement Estimée ?",
          "content": "Une date d'accouchement estimée (DPA), aussi appelée date prévue d'accouchement (DPA), est la date projetée quand une personne enceinte devrait accoucher de son bébé. Elle est typiquement calculée comme 280 jours (40 semaines) depuis le premier jour des dernières règles, en supposant un cycle standard de 28 jours. Cependant, comme les durées de cycle varient largement (21–45 jours) et l'ovulation n'arrive pas toujours le jour 14, des méthodes plus personnalisées — incluant l'ajustement de la durée du cycle, la correction de la phase lutéale, les dates de transfert FIV, et les mesures d'échographie précoce — améliorent significativement la précision. La recherche montre que seulement environ 4–5% des bébés naissent à leur date exacte d'accouchement. Environ 80% arrivent dans les 10 jours de la DPA, et toute naissance entre 37 et 42 semaines est considérée dans la plage normale. Votre date d'accouchement est mieux comprise comme le point central d'une fenêtre d'accouchement, pas une échéance précise."
        },
        "howItWorks": {
          "title": "Comment les Dates d'Accouchement sont Calculées",
          "content": "Ce calculateur supporte cinq méthodes d'estimation. La méthode des Dernières Règles (DDR) utilise la règle de Naegele avec ajustements pour votre durée de cycle personnelle et phase lutéale : elle calcule la date d'ovulation probable (durée du cycle moins durée de la phase lutéale), puis ajoute 266 jours pour atteindre la date d'accouchement. La méthode Date de Conception ajoute 266 jours à la date connue de fécondation. Pour les transferts FIV, le calculateur tient compte de l'âge de l'embryon au transfert (3, 5, ou 6 jours) et ajoute le nombre approprié de jours pour atteindre 40 semaines d'âge gestationnel — les dates FIV tendent à être les plus précises puisque le timing exact de fécondation est connu. La méthode Échographie travaille à rebours depuis l'âge gestationnel déterminé lors d'un scan précoce, et les échographies du premier trimestre (avant 13 semaines) sont considérées l'étalon-or pour la précision de datation. Finalement, la méthode Date d'Accouchement Connue (inverse) recalcule votre date de conception et DDR, utile pour comprendre votre calendrier complet de grossesse."
        },
        "considerations": {
          "title": "Considérations Importantes",
          "items": [
            {
              "text": "Les échographies du premier trimestre (avant 13 semaines) sont l'étalon-or pour la précision de datation de grossesse, avec une marge d'erreur de seulement ±5–7 jours selon les directives ACOG",
              "type": "info"
            },
            {
              "text": "Les cycles menstruels irréguliers peuvent rendre la datation basée sur DDR moins fiable — si vos cycles varient de plus de 7 jours, considérez la méthode échographie ou conception à la place",
              "type": "warning"
            },
            {
              "text": "Seulement environ 4–5% des bébés naissent à leur date exacte d'accouchement ; 80% arrivent dans les 10 jours, et la fenêtre 37–42 semaines est complètement normale",
              "type": "info"
            },
            {
              "text": "Les dates d'accouchement FIV tendent à être les plus précises de toutes les méthodes car les dates exactes de fécondation et transfert sont connues",
              "type": "info"
            },
            {
              "text": "Votre fournisseur de soins peut ajuster votre date d'accouchement après une échographie précoce si elle diffère de plus de 7 jours des estimations basées sur DDR",
              "type": "warning"
            },
            {
              "text": "Les grossesses durant au-delà de 42 semaines (post-terme) portent des risques plus élevés — ACOG recommande de discuter déclenchement entre 41 et 42 semaines",
              "type": "warning"
            }
          ]
        },
        "milestones": {
          "title": "Définitions des Termes et Étapes Clés",
          "items": [
            {
              "text": "Premier Trimestre (Semaines 1–13) : Le cœur de bébé commence à battre vers la semaine 6 ; vers la semaine 12, tous les organes majeurs sont formés et le risque de fausse couche chute significativement à environ 2%",
              "type": "info"
            },
            {
              "text": "Deuxième Trimestre (Semaines 14–27) : L'échographie anatomique à 18–22 semaines vérifie le développement structurel et peut révéler le sexe ; les mouvements fœtaux (premiers mouvements) typiquement ressentis entre les semaines 18–22",
              "type": "info"
            },
            {
              "text": "Troisième Trimestre (Semaines 28–40) : Prise de poids rapide et développement cérébral ; bébé atteint la viabilité vers 24 semaines ; les poumons continuent à maturer jusqu'à 36 semaines",
              "type": "info"
            },
            {
              "text": "Prématuré : Avant 37 semaines | Terme Précoce : 37–38 semaines | Terme Complet : 39–40 semaines | Terme Tardif : 41 semaines | Post-Terme : 42+ semaines",
              "type": "warning"
            },
            {
              "text": "Dépistages Clés : DPNI/Clarté nucale (10–13 semaines), Dépistage quadruple (15–20 semaines), Échographie anatomique (18–22 semaines), Test glucose (24–28 semaines), Test SGB (35–37 semaines)",
              "type": "info"
            },
            {
              "text": "Le tableau de prédiction du sexe chinois est un outil traditionnel amusant avec ~50% de précision (pas mieux que le hasard) — basé sur l'âge lunaire de la mère et le mois de conception, pour divertissement seulement",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul",
          "description": "Exemples étape par étape pour différentes méthodes d'estimation",
          "examples": [
            {
              "title": "Méthode DDR (cycle de 28 jours)",
              "steps": [
                "Dernières règles commencées : 1er janvier 2026",
                "Durée du cycle : 28 jours, Phase lutéale : 14 jours",
                "Jour d'ovulation : 28 − 14 = jour 14 → 15 janvier",
                "Date d'accouchement : 15 janvier + 266 jours = 8 octobre 2026",
                "Raccourci Naegele : 1er jan + 1 an − 3 mois + 7 jours = 8 oct"
              ],
              "result": "Date d'Accouchement : 8 octobre 2026"
            },
            {
              "title": "Transfert Blastocyste FIV Jour 5",
              "steps": [
                "Date de transfert : 10 février 2026",
                "Âge de l'embryon : 5 jours (blastocyste)",
                "Gestation au transfert : 2 semaines + 5 jours = 19 jours",
                "Jours restants : 280 − 19 = 261 jours",
                "Date d'accouchement : 10 février + 261 = 29 octobre 2026"
              ],
              "result": "Date d'Accouchement : 29 octobre 2026"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle est la précision d'un calculateur de date d'accouchement ?",
          "answer": "Les calculateurs de date d'accouchement fournissent une estimation basée sur la durée gestationnelle moyenne (280 jours depuis DDR). La précision dépend de la méthode : l'échographie du premier trimestre est la plus précise (±5–7 jours), les dates FIV sont presque aussi précises, et le calcul basé sur DDR peut être décalé de 1–2 semaines pour les cycles irréguliers. Seulement environ 4–5% des bébés arrivent à la date exacte d'accouchement — la plupart naissent dans une fenêtre de 10 jours autour de la DPA."
        },
        {
          "question": "Quelle est la différence entre âge gestationnel et âge fœtal ?",
          "answer": "L'âge gestationnel est compté depuis le premier jour de vos dernières règles (DDR), qui est environ 2 semaines avant que la conception se produise réellement. L'âge fœtal (âge embryonnaire) est compté depuis la date réelle de conception. Donc à '8 semaines de grossesse' (âge gestationnel), l'embryon a réellement environ 6 semaines. Les professionnels médicaux utilisent presque toujours l'âge gestationnel."
        },
        {
          "question": "Ma date d'accouchement peut-elle changer pendant la grossesse ?",
          "answer": "Oui. Si une échographie précoce (avant 13 semaines) montre un âge gestationnel qui diffère de votre estimation basée sur DDR de plus de 7 jours, votre fournisseur de soins peut ajuster votre date d'accouchement. Selon les directives ACOG, les mesures d'échographie du premier trimestre sont la méthode de datation la plus fiable."
        },
        {
          "question": "Comment une date d'accouchement FIV est-elle calculée ?",
          "answer": "Les dates d'accouchement FIV sont calculées depuis la date de transfert d'embryon. Pour un blastocyste Jour 5, 261 jours sont ajoutés à la date de transfert. Les embryons Jour 3 ajoutent 263 jours, et les blastocystes Jour 6 ajoutent 260 jours. Les calculs FIV sont parmi les plus précis car la date exacte de fécondation est connue."
        },
        {
          "question": "Que signifie 'terme complet' vs 'terme précoce' ?",
          "answer": "ACOG définit : Prématuré (avant 37 semaines), Terme Précoce (37–38 semaines), Terme Complet (39–40 semaines), Terme Tardif (41 semaines), Post-Terme (42+ semaines). Le terme complet est la fenêtre idéale avec les meilleurs résultats de santé."
        },
        {
          "question": "La durée du cycle affecte-t-elle vraiment la date d'accouchement ?",
          "answer": "Oui, significativement. Le calcul standard de 280 jours suppose un cycle de 28 jours avec ovulation le jour 14. Un cycle de 35 jours signifie ovulation vers le jour 21 — décalant votre date d'accouchement de 7 jours. Ce calculateur ajuste pour la durée du cycle et la phase lutéale pour une meilleure précision."
        },
        {
          "question": "Qu'est-ce que le tableau de prédiction du sexe chinois ?",
          "answer": "Un outil traditionnel supposément vieux de plus de 700 ans qui prétend prédire le sexe du bébé basé sur l'âge lunaire de la mère et le mois de conception. Les études scientifiques montrent qu'il est précis à environ 50% — pareil qu'un tirage à pile ou face. Il est inclus ici comme une tradition amusante, pas un outil médical."
        },
        {
          "question": "Qu'est-ce qu'une 'échographie de datation' et quand devrais-je en avoir une ?",
          "answer": "Une échographie de datation (typiquement 7–12 semaines) mesure la longueur vertex-coccyx de l'embryon pour déterminer l'âge gestationnel. C'est la méthode de datation la plus précise avec ±5–7 jours de marge d'erreur. ACOG et NHS recommandent tous deux cela au premier trimestre, surtout pour les cycles irréguliers."
        },
        {
          "question": "Que se passe-t-il si je dépasse ma date d'accouchement ?",
          "answer": "Environ 50% des mères pour la première fois accouchent après 40 semaines. À 41 semaines, votre fournisseur augmente la surveillance. À 42 semaines, la plupart des directives (ACOG, NICE) recommandent de discuter déclenchement car les risques augmentent du déclin de fonction placentaire et réduction du liquide amniotique."
        },
        {
          "question": "Les jumeaux peuvent-ils avoir une date d'accouchement différente ?",
          "answer": "Les grossesses gémellaires utilisent le même calcul initial, mais l'accouchement prévu est plus tôt — vers 36–37 semaines en moyenne. Votre fournisseur peut recommander l'accouchement entre 36–38 semaines selon que les jumeaux sont identiques (monochorioniques) ou fraternels (bichorioniques)."
        }
      ],
      "chart": {
        "title": "Croissance de Bébé par Semaine",
        "xLabel": "Semaine",
        "yLabel": "Poids (oz / lb)",
        "series": {
          "weightOz": "Poids de Bébé"
        }
      },
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
      "name": "Schwangerschafts-Geburtstermin-Rechner",
      "slug": "schwangerschafts-geburtstermin-rechner",
      "subtitle": "Schätzen Sie Ihren Geburtstermin, verfolgen Sie das wöchentliche Wachstum Ihres Babys und sehen Sie Ihre vollständige pränatale Meilenstein-Zeitleiste mit personalisierten Terminen",
      "breadcrumb": "Geburtstermin",
      "seo": {
        "title": "Geburtstermin-Rechner - Schwangerschafts- & Entbindungsschätzer",
        "description": "Berechnen Sie Ihren Geburtstermin mit letzter Regel, Ultraschall, IVF oder Empfängnisdatum. Verfolgen Sie die Babygröße pro Woche, sehen Sie pränatale Meilensteine und erhalten Sie Ihr Entbindungsfenster.",
        "shortDescription": "Schätzen Sie Ihren Geburtstermin und verfolgen Sie Schwangerschaftsmeilensteine",
        "keywords": [
          "geburtstermin rechner",
          "schwangerschaftsrechner",
          "schwangerschafts geburtstermin",
          "errechneter geburtstermin",
          "schwangerschaftsalter rechner",
          "ivf geburtstermin rechner",
          "wann kommt mein baby",
          "babygröße pro woche"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "method": {
          "label": "Berechnungsmethode",
          "helpText": "Wählen Sie, wie Sie Ihren Geburtstermin schätzen möchten",
          "options": {
            "lmp": "Letzte Regelblutung (LMP)",
            "conception": "Empfängnisdatum",
            "ivf": "IVF-Transferdatum",
            "ultrasound": "Ultraschalldatum",
            "knownDueDate": "Ich kenne bereits meinen Geburtstermin"
          }
        },
        "inputDate": {
          "label": "Datum",
          "helpText": "Wählen Sie das Datum für Ihre gewählte Berechnungsmethode"
        },
        "cycleLength": {
          "label": "Durchschnittliche Zykluslänge",
          "helpText": "Durchschnittliche Tage in Ihrem Menstruationszyklus (21–45, Standard 28)"
        },
        "lutealPhase": {
          "label": "Gelbkörperphasenlänge",
          "helpText": "Tage zwischen Eisprung und nächster Periode (10–16, Standard 14)"
        },
        "ivfEmbryo": {
          "label": "Embryoalter beim Transfer",
          "helpText": "Tag 5 (Blastozyste) Transfers sind am häufigsten",
          "options": {
            "day3": "Tag 3 Embryo",
            "day5": "Tag 5 Blastozyste",
            "day6": "Tag 6 Blastozyste"
          }
        },
        "gestWeeks": {
          "label": "Wochen beim Ultraschall",
          "helpText": "Schwangerschaftsalter in Wochen zum Zeitpunkt des Ultraschalls"
        },
        "gestDays": {
          "label": "Tage",
          "helpText": "Zusätzliche Tage (0–6)"
        },
        "motherBirthYear": {
          "label": "Geburtsjahr der Mutter (optional)",
          "helpText": "Für chinesische Geschlechtsvorhersage — nur zum Spaß! Keine medizinische Beratung"
        }
      },
      "inputGroups": {},
      "results": {
        "dueDate": {
          "label": "Errechneter Geburtstermin"
        },
        "gestationalAge": {
          "label": "Schwangerschaftsalter"
        },
        "trimester": {
          "label": "Aktuelles Trimester"
        },
        "daysRemaining": {
          "label": "Verbleibende Tage"
        },
        "conceptionDate": {
          "label": "Geschätztes Empfängnisdatum"
        },
        "deliveryWindow": {
          "label": "Entbindungsfenster"
        },
        "currentWeek": {
          "label": "Aktuelle Woche"
        },
        "babySizeFruit": {
          "label": "Babygröße"
        },
        "babyMeasurements": {
          "label": "Länge & Gewicht"
        },
        "babyDevelopment": {
          "label": "Entwicklungshighlight"
        },
        "zodiacSign": {
          "label": "Sternzeichen des Babys"
        },
        "birthstone": {
          "label": "Geburtsstein"
        },
        "birthSeason": {
          "label": "Geburtssaison"
        },
        "trimesterProgress": {
          "label": "Schwangerschaftsfortschritt"
        },
        "genderPrediction": {
          "label": "Chinesische Geschlechtsvorhersage"
        }
      },
      "tooltips": {
        "dueDate": "Basiert auf einer 40-wöchigen (280-Tage) Schwangerschaft ab Ihrer letzten Regelblutung, angepasst für Ihre Zykluslänge und Gelbkörperphase",
        "gestationalAge": "Wie weit Sie sind, gezählt vom ersten Tag Ihrer letzten Regelblutung",
        "deliveryWindow": "Die meisten Babys werden zwischen 37 und 42 Wochen geboren — nur etwa 5% kommen am exakten Geburtstermin",
        "daysRemaining": "Kalendertage bis zu Ihrem errechneten Geburtstermin",
        "conceptionDate": "Geschätztes Befruchtungsdatum, etwa 2 Wochen nach LMP bei einem 28-Tage-Zyklus",
        "babySizeFruit": "Ein lustiger Vergleich der ungefähren Größe Ihres Babys mit bekannten Früchten und Gemüse",
        "babyDevelopment": "Wichtiger Entwicklungsmeilenstein dieser Woche",
        "zodiacSign": "Das astrologische Zeichen basierend auf Ihrem errechneten Geburtstermin",
        "birthstone": "Der traditionelle Geburtsstein für den erwarteten Geburtsmonat Ihres Babys",
        "trimesterProgress": "Prozentsatz der abgeschlossenen Schwangerschaft basierend auf 40 Wochen",
        "genderPrediction": "Alte chinesische Geburtstafel-Vorhersage — nur zur Unterhaltung, keine medizinische Beratung (50/50 Genauigkeit)"
      },
      "values": {
        "Januar": "Januar",
        "Februar": "Februar",
        "März": "März",
        "April": "April",
        "Mai": "Mai",
        "Juni": "Juni",
        "Juli": "Juli",
        "August": "August",
        "September": "September",
        "Oktober": "Oktober",
        "November": "November",
        "Dezember": "Dezember",
        "Erstes Trimester": "Erstes Trimester",
        "Zweites Trimester": "Zweites Trimester",
        "Drittes Trimester": "Drittes Trimester",
        "Übertragen": "Übertragen",
        "Noch nicht schwanger": "Noch nicht schwanger",
        "Tag": "Tag",
        "Tage": "Tage",
        "Woche": "Woche",
        "Wochen": "Wochen",
        "Widder": "Widder",
        "Stier": "Stier",
        "Zwillinge": "Zwillinge",
        "Krebs": "Krebs",
        "Löwe": "Löwe",
        "Jungfrau": "Jungfrau",
        "Waage": "Waage",
        "Skorpion": "Skorpion",
        "Schütze": "Schütze",
        "Steinbock": "Steinbock",
        "Wassermann": "Wassermann",
        "Fische": "Fische",
        "Frühling": "Frühling",
        "Sommer": "Sommer",
        "Herbst": "Herbst",
        "Winter": "Winter",
        "Mohnsamen": "Mohnsamen",
        "Sesamsamen": "Sesamsamen",
        "Linse": "Linse",
        "Blaubeere": "Blaubeere",
        "Himbeere": "Himbeere",
        "Kirsche": "Kirsche",
        "Erdbeere": "Erdbeere",
        "Feige": "Feige",
        "Limette": "Limette",
        "Zitrone": "Zitrone",
        "Pfirsich": "Pfirsich",
        "Apfel": "Apfel",
        "Avocado": "Avocado",
        "Birne": "Birne",
        "Paprika": "Paprika",
        "Mango": "Mango",
        "Banane": "Banane",
        "Karotte": "Karotte",
        "Maiskolben": "Maiskolben",
        "Große Mango": "Große Mango",
        "Steckrübe": "Steckrübe",
        "Salatkopf": "Salatkopf",
        "Blumenkohl": "Blumenkohl",
        "Aubergine": "Aubergine",
        "Eichelkürbis": "Eichelkürbis",
        "Kohl": "Kohl",
        "Kokosnuss": "Kokosnuss",
        "Jicama": "Jicama",
        "Ananas": "Ananas",
        "Cantaloupe-Melone": "Cantaloupe-Melone",
        "Honigmelone": "Honigmelone",
        "Römersalat": "Römersalat",
        "Mangold": "Mangold",
        "Mini-Wassermelone": "Mini-Wassermelone",
        "Kürbis": "Kürbis",
        "Wassermelone": "Wassermelone",
        "Große Wassermelone": "Große Wassermelone",
        "Jackfrucht": "Jackfrucht",
        "vollständig": "vollständig",
        "heute": "heute",
        "Früh termingerecht": "Früh termingerecht",
        "Voll termingerecht": "Voll termingerecht",
        "Spät termingerecht": "Spät termingerecht",
        "Granat": "Granat",
        "Amethyst": "Amethyst",
        "Aquamarin": "Aquamarin",
        "Diamant": "Diamant",
        "Smaragd": "Smaragd",
        "Alexandrit": "Alexandrit",
        "Rubin": "Rubin",
        "Peridot": "Peridot",
        "Saphir": "Saphir",
        "Opal": "Opal",
        "Topas": "Topas",
        "Tansanit": "Tansanit",
        "Junge": "Junge",
        "Mädchen": "Mädchen",
        "Nur zum Spaß!": "Nur zum Spaß!",
        "Schutz & Stärke": "Schutz & Stärke",
        "Weisheit & Frieden": "Weisheit & Frieden",
        "Mut & Gelassenheit": "Mut & Gelassenheit",
        "Ewige Liebe & Klarheit": "Ewige Liebe & Klarheit",
        "Wiedergeburt & Fruchtbarkeit": "Wiedergeburt & Fruchtbarkeit",
        "Glück & Wohlstand": "Glück & Wohlstand",
        "Leidenschaft & Vitalität": "Leidenschaft & Vitalität",
        "Stärke & Heilung": "Stärke & Heilung",
        "Wahrheit & Treue": "Wahrheit & Treue",
        "Hoffnung & Kreativität": "Hoffnung & Kreativität",
        "Freude & Überfluss": "Freude & Überfluss",
        "Transformation & Neuanfang": "Transformation & Neuanfang",
        "Erster Herzschlag erkennbar": "Erster Herzschlag erkennbar",
        "Erster Vorsorgetermin": "Erster Vorsorgetermin",
        "NIPT / Nackentransparenz-Screening": "NIPT / Nackentransparenz-Screening",
        "Ende des ersten Trimesters": "Ende des ersten Trimesters",
        "Quad-Screen-Fenster": "Quad-Screen-Fenster",
        "Organ-Ultraschall (Level 2 Ultraschall)": "Organ-Ultraschall (Level 2 Ultraschall)",
        "Lebensfähigkeits-Meilenstein": "Lebensfähigkeits-Meilenstein",
        "Glukose-Screening-Test": "Glukose-Screening-Test",
        "Tdap-Impfung-Fenster": "Tdap-Impfung-Fenster",
        "Drittes Trimester beginnt": "Drittes Trimester beginnt",
        "Kontrolle der Kindslage": "Kontrolle der Kindslage",
        "Gruppe B Streptokokken (GBS) Test": "Gruppe B Streptokokken (GBS) Test",
        "Früh termingerecht beginnt": "Früh termingerecht beginnt",
        "Voll termingerecht beginnt": "Voll termingerecht beginnt",
        "Errechneter Geburtstermin": "Errechneter Geburtstermin",
        "Übertragung erwägen": "Übertragung erwägen",
        "Erkennbar via transvaginaler Ultraschall": "Erkennbar via transvaginaler Ultraschall",
        "Anfängliche Blutuntersuchung, Krankengeschichte, körperliche Untersuchung": "Anfängliche Blutuntersuchung, Krankengeschichte, körperliche Untersuchung",
        "Nicht-invasives chromosomales Screening-Fenster": "Nicht-invasives chromosomales Screening-Fenster",
        "Hauptorgansysteme gebildet; Fehlgeburtsrisiko sinkt": "Hauptorgansysteme gebildet; Fehlgeburtsrisiko sinkt",
        "Screent auf Neuralrohrdefekte und Chromosomenstörungen": "Screent auf Neuralrohrdefekte und Chromosomenstörungen",
        "Detaillierter struktureller Ultraschall; Geschlecht möglicherweise sichtbar": "Detaillierter struktureller Ultraschall; Geschlecht möglicherweise sichtbar",
        "Baby könnte potenziell außerhalb der Gebärmutter mit NICU-Betreuung überleben": "Baby könnte potenziell außerhalb der Gebärmutter mit NICU-Betreuung überleben",
        "Screent auf Schwangerschaftsdiabetes mellitus (GDM)": "Screent auf Schwangerschaftsdiabetes mellitus (GDM)",
        "Empfohlen zwischen 27–36 Wochen zum Schutz des Neugeborenen vor Keuchhusten": "Empfohlen zwischen 27–36 Wochen zum Schutz des Neugeborenen vor Keuchhusten",
        "Finale Wachstums- und Entwicklungsphase beginnt": "Finale Wachstums- und Entwicklungsphase beginnt",
        "Arzt überprüft, ob Baby mit dem Kopf nach unten (Schädellage) oder Steißlage liegt": "Arzt überprüft, ob Baby mit dem Kopf nach unten (Schädellage) oder Steißlage liegt",
        "Vaginaler Abstrich screent auf Gruppe B Streptokokken": "Vaginaler Abstrich screent auf Gruppe B Streptokokken",
        "Baby gilt als früh termingerecht (37–38 Wochen)": "Baby gilt als früh termingerecht (37–38 Wochen)",
        "Baby gilt als voll termingerecht (39–40 Wochen)": "Baby gilt als voll termingerecht (39–40 Wochen)",
        "Durchschnittliche 40-Wochen-Schwangerschafts-Zielzeit": "Durchschnittliche 40-Wochen-Schwangerschafts-Zielzeit",
        "Arzt bespricht möglicherweise Einleitung, falls Wehen nicht begonnen haben": "Arzt bespricht möglicherweise Einleitung, falls Wehen nicht begonnen haben"
      },
      "formats": {
        "summary": "Ihr errechneter Geburtstermin ist {dueDate}. Sie sind derzeit {gestationalAge} ({trimester}). Baby ist etwa so groß wie eine {babySizeFruit}. {daysRemaining} Tage verbleibend."
      },
      "presets": {
        "firstPregnancyLmp": {
          "label": "Erste Schwangerschaft (LMP)",
          "description": "28-Tage-Zyklus, Nov 2025 LMP"
        },
        "ivfBlastocyst": {
          "label": "IVF Tag 5 Transfer",
          "description": "Blastozysten-Transfer Jan 2026"
        },
        "earlyUltrasound": {
          "label": "Früher Ultraschall",
          "description": "8-Wochen-Dating-Scan Jan 2026"
        },
        "irregularCycle": {
          "label": "Unregelmäßiger Zyklus (35-Tage)",
          "description": "Längerer Zyklus, Okt 2025 LMP"
        }
      },
      "infoCards": {
        "keyDates": {
          "title": "📅 Wichtige Termine",
          "items": [
            {
              "label": "Geburtstermin",
              "valueKey": "dueDate"
            },
            {
              "label": "Entbindungsfenster",
              "valueKey": "deliveryWindow"
            },
            {
              "label": "Empfängnisdatum",
              "valueKey": "conceptionDate"
            },
            {
              "label": "Verbleibende Tage",
              "valueKey": "daysRemaining"
            }
          ]
        },
        "babyNow": {
          "title": "👶 Baby diese Woche",
          "items": [
            {
              "label": "Aktuelle Woche",
              "valueKey": "currentWeek"
            },
            {
              "label": "Babygröße",
              "valueKey": "babySizeFruit"
            },
            {
              "label": "Länge & Gewicht",
              "valueKey": "babyMeasurements"
            },
            {
              "label": "Entwicklung",
              "valueKey": "babyDevelopment"
            }
          ]
        },
        "tips": {
          "title": "💡 Schwangerschaftstipps",
          "items": [
            "Nur etwa 5% der Babys kommen an ihrem exakten Geburtstermin — 80% werden innerhalb von 10 Tagen um den ET geboren",
            "Ultraschall im ersten Trimester (vor 13 Wochen) ist die genaueste Dating-Methode, innerhalb von ±5–7 Tagen",
            "Die Anpassung von Zykluslänge und Gelbkörperphase ergibt einen personalisierten Geburtstermin im Vergleich zur Standard-28-Tage-Annahme",
            "Ihre pränatale Meilenstein-Zeitleiste unten zeigt geschätzte Termine für jeden wichtigen Test und Termin"
          ]
        }
      },
      "detailedTable": {
        "prenatalTimeline": {
          "button": "Pränatale Zeitleiste anzeigen",
          "title": "Pränatale Test- & Meilenstein-Zeitleiste",
          "columns": {
            "milestone": "Meilenstein",
            "estimatedDate": "Geschätztes Datum",
            "gestAge": "Schwangerschaftsalter",
            "notes": "Notizen"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist ein errechneter Geburtstermin?",
          "content": "Ein errechneter Geburtstermin (ET), auch geschätztes Entbindungsdatum genannt, ist das projizierte Datum, an dem eine schwangere Person voraussichtlich ihr Baby zur Welt bringen wird. Er wird typischerweise als 280 Tage (40 Wochen) ab dem ersten Tag der letzten Regelblutung berechnet, unter Annahme eines Standard-28-Tage-Zyklus. Da jedoch Zykluslängen stark variieren (21–45 Tage) und der Eisprung nicht immer an Tag 14 stattfindet, verbessern personalisiertere Methoden — einschließlich Zykluslängen-Anpassung, Gelbkörperphase-Korrektur, IVF-Transferdaten und frühe Ultraschallmessungen — die Genauigkeit erheblich. Forschung zeigt, dass nur etwa 4–5% der Babys an ihrem exakten Geburtstermin geboren werden. Etwa 80% kommen innerhalb von 10 Tagen um den ET, und jede Geburt zwischen 37 und 42 Wochen gilt als im normalen Bereich. Ihr Geburtstermin wird am besten als Mittelpunkt eines Entbindungsfensters verstanden, nicht als präzise Deadline."
        },
        "howItWorks": {
          "title": "Wie Geburtstermine berechnet werden",
          "content": "Dieser Rechner unterstützt fünf Schätzmethoden. Die Letzte Regelblutung (LMP) Methode verwendet Naegeles Regel mit Anpassungen für Ihre persönliche Zykluslänge und Gelbkörperphase: sie berechnet das wahrscheinliche Eisprungdatum (Zykluslänge minus Gelbkörperphasenlänge), dann fügt 266 Tage hinzu, um den Geburtstermin zu erreichen. Die Empfängnisdatum-Methode fügt 266 Tage zum bekannten Befruchtungsdatum hinzu. Bei IVF-Transfers berücksichtigt der Rechner das Alter des Embryos beim Transfer (3, 5 oder 6 Tage) und fügt die entsprechende Anzahl von Tagen hinzu, um 40 Wochen Schwangerschaftsalter zu erreichen — IVF-Daten sind meist präzise, da der exakte Befruchtungszeitpunkt bekannt ist. Die Ultraschall-Methode arbeitet rückwärts vom Schwangerschaftsalter, das während einer frühen Untersuchung bestimmt wurde, und Ultraschall im ersten Trimester (vor 13 Wochen) gilt als Goldstandard für Dating-Genauigkeit. Schließlich berechnet die Bekannter Geburtstermin (umgekehrt) Methode Ihr Empfängnisdatum und LMP zurück, nützlich zum Verständnis Ihrer vollständigen Schwangerschafts-Zeitleiste."
        },
        "considerations": {
          "title": "Wichtige Überlegungen",
          "items": [
            {
              "text": "Ultraschall im ersten Trimester (vor 13 Wochen) ist der Goldstandard für Schwangerschafts-Dating-Genauigkeit, mit einer Fehlertoleranz von nur ±5–7 Tagen laut ACOG-Richtlinien",
              "type": "info"
            },
            {
              "text": "Unregelmäßige Menstruationszyklen können LMP-basierte Datierung weniger zuverlässig machen — wenn Ihre Zyklen um mehr als 7 Tage variieren, erwägen Sie stattdessen die Ultraschall- oder Empfängnismethode",
              "type": "warning"
            },
            {
              "text": "Nur etwa 4–5% der Babys werden an ihrem exakten Geburtstermin geboren; 80% kommen innerhalb von 10 Tagen, und das 37–42 Wochen-Fenster ist völlig normal",
              "type": "info"
            },
            {
              "text": "IVF-Geburtstermine sind meist die präzisesten aller Methoden, weil die exakten Befruchtungs- und Transferdaten bekannt sind",
              "type": "info"
            },
            {
              "text": "Ihr Gesundheitsversorger kann Ihren Geburtstermin nach einem frühen Ultraschall anpassen, wenn er um mehr als 7 Tage von LMP-basierten Schätzungen abweicht",
              "type": "warning"
            },
            {
              "text": "Schwangerschaften, die über 42 Wochen dauern (übertragen), tragen höhere Risiken — ACOG empfiehlt, Einleitung zwischen 41 und 42 Wochen zu besprechen",
              "type": "warning"
            }
          ]
        },
        "milestones": {
          "title": "Begriffsdefinitionen & wichtige Meilensteine",
          "items": [
            {
              "text": "Erstes Trimester (Wochen 1–13): Babys Herz beginnt um Woche 6 zu schlagen; bis Woche 12 haben sich alle Hauptorgane gebildet und das Fehlgeburtsrisiko sinkt erheblich auf etwa 2%",
              "type": "info"
            },
            {
              "text": "Zweites Trimester (Wochen 14–27): Der Organ-Ultraschall in Wochen 18–22 überprüft strukturelle Entwicklung und kann das Geschlecht zeigen; fötale Bewegungen (Kindsbewegungen) typischerweise zwischen Wochen 18–22 gespürt",
              "type": "info"
            },
            {
              "text": "Drittes Trimester (Wochen 28–40): Schnelle Gewichtszunahme und Gehirnentwicklung; Baby erreicht Lebensfähigkeit um Woche 24; Lungen reifen weiter bis Woche 36",
              "type": "info"
            },
            {
              "text": "Frühgeburt: Vor 37 Wochen | Früh termingerecht: 37–38 Wochen | Voll termingerecht: 39–40 Wochen | Spät termingerecht: 41 Wochen | Übertragen: 42+ Wochen",
              "type": "warning"
            },
            {
              "text": "Wichtige Screenings: NIPT/Nackentransparenz (10–13 Wochen), Quad-Screen (15–20 Wochen), Organ-Ultraschall (18–22 Wochen), Glukose-Test (24–28 Wochen), GBS-Test (35–37 Wochen)",
              "type": "info"
            },
            {
              "text": "Die chinesische Geschlechtsvorhersage-Tabelle ist ein lustiges traditionelles Werkzeug mit ~50% Genauigkeit (nicht besser als Zufall) — basiert auf Mondmonat der Mutter und Empfängnismonat, nur zur Unterhaltung",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Berechnungsbeispiele",
          "description": "Schritt-für-Schritt-Beispiele für verschiedene Schätzmethoden",
          "examples": [
            {
              "title": "LMP-Methode (28-Tage-Zyklus)",
              "steps": [
                "Letzte Periode begann: 1. Januar 2026",
                "Zykluslänge: 28 Tage, Gelbkörperphase: 14 Tage",
                "Eisprung-Tag: 28 − 14 = Tag 14 → 15. Januar",
                "Geburtstermin: 15. Januar + 266 Tage = 8. Oktober 2026",
                "Naegeles Abkürzung: 1. Jan + 1 Jahr − 3 Monate + 7 Tage = 8. Okt"
              ],
              "result": "Geburtstermin: 8. Oktober 2026"
            },
            {
              "title": "IVF Tag 5 Blastozysten-Transfer",
              "steps": [
                "Transferdatum: 10. Februar 2026",
                "Embryoalter: 5 Tage (Blastozyste)",
                "Schwangerschaft beim Transfer: 2 Wochen + 5 Tage = 19 Tage",
                "Verbleibende Tage: 280 − 19 = 261 Tage",
                "Geburtstermin: 10. Februar + 261 = 29. Oktober 2026"
              ],
              "result": "Geburtstermin: 29. Oktober 2026"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie genau ist ein Geburtstermin-Rechner?",
          "answer": "Geburtstermin-Rechner liefern eine Schätzung basierend auf durchschnittlicher Schwangerschaftslänge (280 Tage ab LMP). Genauigkeit hängt von der Methode ab: Ultraschall im ersten Trimester ist genaueste (±5–7 Tage), IVF-Daten sind fast so präzise, und LMP-basierte Berechnung kann bei unregelmäßigen Zyklen um 1–2 Wochen abweichen. Nur etwa 4–5% der Babys kommen am exakten Geburtstermin — die meisten werden innerhalb eines 10-Tage-Fensters um den ET geboren."
        },
        {
          "question": "Was ist der Unterschied zwischen Schwangerschaftsalter und fötalem Alter?",
          "answer": "Schwangerschaftsalter wird ab dem ersten Tag Ihrer letzten Regelblutung (LMP) gezählt, was etwa 2 Wochen vor der tatsächlichen Empfängnis liegt. Fötales Alter (embryonales Alter) wird ab dem tatsächlichen Empfängnisdatum gezählt. Also bei '8 Wochen schwanger' (Schwangerschaftsalter) ist der Embryo tatsächlich etwa 6 Wochen alt. Medizinische Fachkräfte verwenden fast immer das Schwangerschaftsalter."
        },
        {
          "question": "Kann sich mein Geburtstermin während der Schwangerschaft ändern?",
          "answer": "Ja. Wenn ein früher Ultraschall (vor 13 Wochen) ein Schwangerschaftsalter zeigt, das um mehr als 7 Tage von Ihrer LMP-basierten Schätzung abweicht, kann Ihr Gesundheitsversorger Ihren Geburtstermin anpassen. Laut ACOG-Richtlinien sind Ultraschallmessungen im ersten Trimester die zuverlässigste Dating-Methode."
        },
        {
          "question": "Wie wird ein IVF-Geburtstermin berechnet?",
          "answer": "IVF-Geburtstermine werden vom Embryo-Transferdatum berechnet. Für eine Tag 5 Blastozyste werden 261 Tage zum Transferdatum hinzugefügt. Tag 3 Embryonen fügen 263 Tage hinzu, und Tag 6 Blastozysten fügen 260 Tage hinzu. IVF-Berechnungen gehören zu den genauesten, weil das exakte Befruchtungsdatum bekannt ist."
        },
        {
          "question": "Was bedeutet 'voll termingerecht' vs. 'früh termingerecht'?",
          "answer": "ACOG definiert: Frühgeburt (vor 37 Wochen), Früh termingerecht (37–38 Wochen), Voll termingerecht (39–40 Wochen), Spät termingerecht (41 Wochen), Übertragen (42+ Wochen). Voll termingerecht ist das ideale Fenster mit den besten Gesundheitsergebnissen."
        },
        {
          "question": "Beeinflusst die Zykluslänge wirklich den Geburtstermin?",
          "answer": "Ja, erheblich. Die Standard-280-Tage-Berechnung nimmt einen 28-Tage-Zyklus mit Eisprung an Tag 14 an. Ein 35-Tage-Zyklus bedeutet Eisprung um Tag 21 — das verschiebt Ihren Geburtstermin um 7 Tage. Dieser Rechner passt sowohl Zykluslänge als auch Gelbkörperphase für bessere Genauigkeit an."
        },
        {
          "question": "Was ist die chinesische Geschlechtsvorhersage-Tabelle?",
          "answer": "Ein traditionelles Werkzeug, das angeblich über 700 Jahre alt ist und behauptet, das Geschlecht des Babys basierend auf dem Mondalter der Mutter und dem Empfängnismonat vorherzusagen. Wissenschaftliche Studien zeigen etwa 50% Genauigkeit — dasselbe wie ein Münzwurf. Es ist hier als lustige Tradition enthalten, nicht als medizinisches Werkzeug."
        },
        {
          "question": "Was ist ein 'Dating-Ultraschall' und wann sollte ich einen bekommen?",
          "answer": "Ein Dating-Ultraschall (typischerweise 7–12 Wochen) misst die Scheitel-Steiß-Länge des Embryos, um das Schwangerschaftsalter zu bestimmen. Es ist die genaueste Dating-Methode mit ±5–7 Tage Fehlertoleranz. Sowohl ACOG als auch NHS empfehlen ihn im ersten Trimester, besonders bei unregelmäßigen Zyklen."
        },
        {
          "question": "Was passiert, wenn ich über meinen Geburtstermin hinausgehe?",
          "answer": "Etwa 50% der Erstgebärenden entbinden nach 40 Wochen. Bei 41 Wochen verstärkt Ihr Versorger die Überwachung. Bei 42 Wochen empfehlen die meisten Richtlinien (ACOG, NICE), Einleitung zu besprechen, da Risiken durch abnehmende Plazentafunktion und reduziertes Fruchtwasser steigen."
        },
        {
          "question": "Können Zwillinge einen anderen Geburtstermin haben?",
          "answer": "Zwillingsschwangerschaften verwenden dieselbe anfängliche Berechnung, aber erwartete Entbindung ist früher — durchschnittlich um 36–37 Wochen. Ihr Versorger kann Entbindung zwischen 36–38 Wochen empfehlen, abhängig davon, ob Zwillinge eineiig (monochorial) oder zweieiig (dichorial) sind."
        }
      ],
      "chart": {
        "title": "Babywachstum pro Woche",
        "xLabel": "Woche",
        "yLabel": "Gewicht (oz / lb)",
        "series": {
          "weightOz": "Babygewicht"
        }
      },
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
      }
    },
  },

  inputs: [
    {
      id: "method",
      type: "select",
      defaultValue: "lmp",
      options: [
        { value: "lmp" }, { value: "conception" }, { value: "ivf" },
        { value: "ultrasound" }, { value: "knownDueDate" },
      ],
    },
    { id: "inputDate", type: "date", defaultValue: null },
    { id: "cycleLength", type: "number", defaultValue: 28, min: 21, max: 45, suffix: "days", showWhen: { field: "method", value: "lmp" } },
    { id: "lutealPhase", type: "number", defaultValue: 14, min: 10, max: 16, suffix: "days", showWhen: { field: "method", value: "lmp" } },
    {
      id: "ivfEmbryo",
      type: "select",
      defaultValue: "day5",
      options: [{ value: "day3" }, { value: "day5" }, { value: "day6" }],
      showWhen: { field: "method", value: "ivf" },
    },
    { id: "gestWeeks", type: "number", defaultValue: null, placeholder: "8", min: 5, max: 42, suffix: "weeks", showWhen: { field: "method", value: "ultrasound" } },
    { id: "gestDays", type: "number", defaultValue: 0, min: 0, max: 6, suffix: "days", showWhen: { field: "method", value: "ultrasound" } },
    { id: "motherBirthYear", type: "number", defaultValue: null, placeholder: "1994", min: 1960, max: 2010 },
  ],

  inputGroups: [],

  results: [
    { id: "dueDate",           type: "primary",   format: "text" },
    { id: "gestationalAge",    type: "secondary",  format: "text" },
    { id: "trimester",         type: "secondary",  format: "text" },
    { id: "daysRemaining",     type: "secondary",  format: "text" },
    { id: "conceptionDate",    type: "secondary",  format: "text" },
    { id: "deliveryWindow",    type: "secondary",  format: "text" },
    { id: "currentWeek",       type: "secondary",  format: "text" },
    { id: "babySizeFruit",     type: "secondary",  format: "text" },
    { id: "babyMeasurements",  type: "secondary",  format: "text" },
    { id: "babyDevelopment",   type: "secondary",  format: "text" },
    { id: "zodiacSign",        type: "secondary",  format: "text" },
    { id: "birthstone",        type: "secondary",  format: "text" },
    { id: "birthSeason",       type: "secondary",  format: "text" },
    { id: "trimesterProgress", type: "secondary",  format: "text" },
    { id: "genderPrediction",  type: "secondary",  format: "text" },
  ],

  infoCards: [
    { id: "keyDates",  type: "list",       icon: "📅", itemCount: 4 },
    { id: "babyNow",   type: "list",       icon: "👶", itemCount: 4 },
    { id: "tips",      type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  detailedTable: {
    id: "prenatalTimeline",
    buttonLabel: "View Prenatal Timeline",
    buttonIcon: "📅",
    modalTitle: "Prenatal Testing & Milestones Timeline",
    columns: [
      { id: "milestone",     label: "Milestone",       align: "left" },
      { id: "estimatedDate", label: "Estimated Date",  align: "center" },
      { id: "gestAge",       label: "Gestational Age", align: "center" },
      { id: "notes",         label: "Notes",           align: "left" },
    ],
  },

  sensitivity: { inputId: "cycleLength", resultId: "daysRemaining", steps: 10, rangePercent: 30 },

  chart: {
    id: "babyGrowth",
    type: "area",
    xKey: "week",
    height: 300,
    showGrid: true,
    showLegend: false,
    showTooltip: true,
    yAxisFormat: "number",
    series: [{ key: "weightOz", type: "area", color: "#ec4899" }],
  },

  educationSections: [
    { id: "whatIs",          type: "prose",        icon: "📖" },
    { id: "howItWorks",      type: "prose",        icon: "⚙️" },
    { id: "considerations",  type: "list",         icon: "⚠️", itemCount: 6 },
    { id: "milestones",      type: "list",         icon: "📅", itemCount: 6 },
    { id: "examples",        type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [
    { id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" },
    { id: "5" }, { id: "6" }, { id: "7" }, { id: "8" }, { id: "9" },
  ],

  references: [
    {
      authors: "American College of Obstetricians and Gynecologists (ACOG)",
      year: "2017",
      title: "Committee Opinion No. 700: Methods for Estimating the Due Date",
      source: "Obstetrics & Gynecology, 129(5), e150–e154",
      url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/05/methods-for-estimating-the-due-date",
    },
    {
      authors: "National Institute for Health and Care Excellence (NICE)",
      year: "2021",
      title: "Antenatal Care Guideline NG201",
      source: "NICE Guidelines",
      url: "https://www.nice.org.uk/guidance/ng201",
    },
    {
      authors: "Mittendorf R, Williams MA, Berkey CS, Cotter PF",
      year: "1990",
      title: "The length of uncomplicated human gestation",
      source: "Obstetrics & Gynecology, 75(6), 929–932",
      url: "https://pubmed.ncbi.nlm.nih.gov/2342739/",
    },
  ],

  hero: { badge: "Health", rating: { average: 4.9, count: 3200 } },
  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "health" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true, sensitivityEnabled: true },
  relatedCalculators: ["bmi-calculator", "calorie-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// ═══════════════════════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════════════════════
export function calculatePregnancyDueDate(data: {
  values: Record<string, unknown>;
  units?: Record<string, string>;
  unitSystem?: "metric" | "imperial";
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const method = values.method as string;
  const inputDateStr = values.inputDate as string | null;
  const motherBirthYear = values.motherBirthYear as number | null;

  if (!inputDateStr) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Parse ISO date string from datepicker (YYYY-MM-DD)
  const parts = inputDateStr.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  const inputDate = new Date(year, month - 1, day);
  if (isNaN(inputDate.getTime()) || inputDate.getDate() !== day) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (method === "ultrasound" && values.gestWeeks == null) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── CORE CALCULATIONS ──────────────────────────────────────────────────
  let dueDate: Date;
  let conceptionDate: Date;
  let lmpDate: Date;

  switch (method) {
    case "lmp": {
      const cycleLength = (values.cycleLength as number) || 28;
      const lutealPhase = (values.lutealPhase as number) || 14;
      lmpDate = new Date(inputDate);
      const ovulationDay = cycleLength - lutealPhase;
      conceptionDate = new Date(lmpDate);
      conceptionDate.setDate(conceptionDate.getDate() + ovulationDay);
      dueDate = new Date(conceptionDate);
      dueDate.setDate(dueDate.getDate() + 266);
      break;
    }
    case "conception": {
      conceptionDate = new Date(inputDate);
      dueDate = new Date(conceptionDate);
      dueDate.setDate(dueDate.getDate() + 266);
      lmpDate = new Date(conceptionDate);
      lmpDate.setDate(lmpDate.getDate() - 14);
      break;
    }
    case "ivf": {
      const embryoType = (values.ivfEmbryo as string) || "day5";
      let embryoAge = 5;
      if (embryoType === "day3") embryoAge = 3;
      if (embryoType === "day6") embryoAge = 6;
      const transferDate = new Date(inputDate);
      const daysToAdd = 280 - 14 - embryoAge;
      dueDate = new Date(transferDate);
      dueDate.setDate(dueDate.getDate() + daysToAdd);
      conceptionDate = new Date(transferDate);
      conceptionDate.setDate(conceptionDate.getDate() - embryoAge);
      lmpDate = new Date(dueDate);
      lmpDate.setDate(lmpDate.getDate() - 280);
      break;
    }
    case "ultrasound": {
      const gestWeeks = (values.gestWeeks as number) || 8;
      const gestDays = (values.gestDays as number) || 0;
      const gestAgeDays = gestWeeks * 7 + gestDays;
      const ultrasoundDate = new Date(inputDate);
      dueDate = new Date(ultrasoundDate);
      dueDate.setDate(dueDate.getDate() + (280 - gestAgeDays));
      lmpDate = new Date(dueDate);
      lmpDate.setDate(lmpDate.getDate() - 280);
      conceptionDate = new Date(lmpDate);
      conceptionDate.setDate(conceptionDate.getDate() + 14);
      break;
    }
    case "knownDueDate": {
      dueDate = new Date(inputDate);
      lmpDate = new Date(dueDate);
      lmpDate.setDate(lmpDate.getDate() - 280);
      conceptionDate = new Date(lmpDate);
      conceptionDate.setDate(conceptionDate.getDate() + 14);
      break;
    }
    default:
      return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── DERIVED VALUES ─────────────────────────────────────────────────────
  const gestAgeTotalDays = Math.floor((today.getTime() - lmpDate.getTime()) / (1000 * 60 * 60 * 24));
  const gestWeeksCalc = Math.floor(gestAgeTotalDays / 7);
  const gestDaysCalc = gestAgeTotalDays % 7;
  const daysRemainingNum = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  let trimesterRaw: string;
  if (gestAgeTotalDays < 0) trimesterRaw = "Not Yet Pregnant";
  else if (gestWeeksCalc < 13) trimesterRaw = "First Trimester";
  else if (gestWeeksCalc < 27) trimesterRaw = "Second Trimester";
  else if (gestWeeksCalc <= 42) trimesterRaw = "Third Trimester";
  else trimesterRaw = "Post-Term";

  const progressPercent = Math.max(0, Math.min(100, Math.round((gestAgeTotalDays / 280) * 100)));
  const currentWeekNum = Math.max(1, Math.min(42, gestWeeksCalc + 1));
  const weekForBaby = Math.max(4, Math.min(42, currentWeekNum));
  const babyData = BABY_DATA[weekForBaby] || BABY_DATA[40];
  const zodiac = getZodiacSign(dueDate.getMonth() + 1, dueDate.getDate());
  const seasonData = getSeason(dueDate.getMonth() + 1);
  const birthstoneData = BIRTHSTONES[dueDate.getMonth() + 1] || BIRTHSTONES[1];

  let genderPrediction = { prediction: "", emoji: "" };
  if (motherBirthYear && motherBirthYear >= 1960 && motherBirthYear <= 2010) {
    genderPrediction = getChineseGenderPrediction(motherBirthYear, conceptionDate.getMonth() + 1, conceptionDate.getFullYear());
  }

  const windowStart = new Date(lmpDate);
  windowStart.setDate(windowStart.getDate() + 37 * 7);
  const windowEnd = new Date(lmpDate);
  windowEnd.setDate(windowEnd.getDate() + 42 * 7);

  // ── FORMAT HELPERS ─────────────────────────────────────────────────────
  function fmtDate(d: Date): string {
    const mName = v[MONTH_NAMES[d.getMonth()]] || MONTH_NAMES[d.getMonth()];
    return `${mName} ${d.getDate()}, ${d.getFullYear()}`;
  }
  function fmtDateShort(d: Date): string {
    const mName = (v[MONTH_NAMES[d.getMonth()]] || MONTH_NAMES[d.getMonth()]).slice(0, 3);
    return `${mName} ${d.getDate()}, ${d.getFullYear()}`;
  }

  const trimester = v[trimesterRaw] || trimesterRaw;
  const weekLabel = v["Week"] || "Week";
  const weeksLabel = gestWeeksCalc === 1 ? (v["week"] || "week") : (v["weeks"] || "weeks");
  const daysLabel = gestDaysCalc === 1 ? (v["day"] || "day") : (v["days"] || "days");
  const daysRemLabel = daysRemainingNum === 1 ? (v["day"] || "day") : (v["days"] || "days");
  const fruitName = v[babyData.fruit] || babyData.fruit;
  const zodiacName = v[zodiac.sign] || zodiac.sign;
  const seasonName = v[seasonData.season] || seasonData.season;
  const completeLabel = v["complete"] || "complete";
  const birthstoneName = v[birthstoneData.stone] || birthstoneData.stone;
  const birthstoneMeaning = v[birthstoneData.meaning] || birthstoneData.meaning;

  // ── DETAILED TABLE (16 milestones) ─────────────────────────────────────
  function milestoneRow(nameKey: string, weekStart: number, weekEnd: number | null, noteKey: string) {
    const d = new Date(lmpDate);
    d.setDate(d.getDate() + weekStart * 7);
    const ageStr = weekEnd
      ? `${weekStart}–${weekEnd} ${v["weeks"] || "weeks"}`
      : `${weekStart} ${weekStart === 1 ? (v["week"] || "week") : (v["weeks"] || "weeks")}`;
    return { milestone: v[nameKey] || nameKey, estimatedDate: fmtDateShort(d), gestAge: ageStr, notes: v[noteKey] || noteKey };
  }

  const tableData = [
    milestoneRow("First Heartbeat Detectable", 6, 7, "Detectable via transvaginal ultrasound"),
    milestoneRow("First Prenatal Visit", 8, null, "Initial bloodwork, medical history, physical exam"),
    milestoneRow("NIPT / Nuchal Translucency Screen", 10, 13, "Non-invasive chromosomal screening window"),
    milestoneRow("End of First Trimester", 13, null, "Major organ systems formed; miscarriage risk drops"),
    milestoneRow("Quad Screen Window", 15, 20, "Screens for neural tube defects and chromosomal conditions"),
    milestoneRow("Anatomy Scan (Level 2 Ultrasound)", 18, 22, "Detailed structural ultrasound; sex may be visible"),
    milestoneRow("Viability Milestone", 24, null, "Baby could potentially survive outside the womb with NICU care"),
    milestoneRow("Glucose Screening Test", 24, 28, "Screens for gestational diabetes mellitus (GDM)"),
    milestoneRow("Tdap Vaccine Window", 27, 36, "Recommended between 27–36 weeks to protect newborn from whooping cough"),
    milestoneRow("Third Trimester Begins", 28, null, "Final growth and development phase begins"),
    milestoneRow("Fetal Position Check", 32, 36, "Doctor checks if baby is head-down (cephalic) or breech"),
    milestoneRow("Group B Strep (GBS) Test", 35, 37, "Vaginal swab screens for Group B Streptococcus"),
    milestoneRow("Early Term Begins", 37, null, "Baby is considered early term (37–38 weeks)"),
    milestoneRow("Full Term Begins", 39, null, "Baby is considered full term (39–40 weeks)"),
    milestoneRow("Estimated Due Date", 40, null, "Average 40-week gestation target"),
    milestoneRow("Post-Term Consideration", 42, null, "Doctor may discuss induction if labor hasn't begun"),
  ];

  // ── CHART DATA — Baby growth curve ─────────────────────────────────────
  const chartData: Array<Record<string, unknown>> = [];
  function parseWeight(w: string): number {
    if (w.includes("lb")) return parseFloat(w.replace(/[^0-9.]/g, "")) * 16;
    return parseFloat(w.replace(/[^0-9.]/g, "")) || 0;
  }
  for (let w = 4; w <= 42; w++) {
    const bd = BABY_DATA[w];
    if (bd) chartData.push({ week: `W${w}`, weightOz: Math.round(parseWeight(bd.weight) * 10) / 10 });
  }

  // ── FORMAT RESULTS ─────────────────────────────────────────────────────
  const gestAgeFormatted = gestAgeTotalDays >= 0 ? `${gestWeeksCalc} ${weeksLabel}, ${gestDaysCalc} ${daysLabel}` : "—";
  const daysRemainingFormatted = daysRemainingNum >= 0 ? `${daysRemainingNum} ${daysRemLabel}` : v["today"] || "today";
  const genderFormatted = genderPrediction.prediction
    ? `${genderPrediction.emoji} ${v[genderPrediction.prediction] || genderPrediction.prediction} (${v["Just for fun!"] || "Just for fun!"})`
    : "—";

  const summaryTemplate = f.summary || "Your estimated due date is {dueDate}. You are currently {gestationalAge} ({trimester}). Baby is about the size of a {babySizeFruit}. {daysRemaining} days remaining.";
  const summary = summaryTemplate
    .replace("{dueDate}", fmtDate(dueDate))
    .replace("{gestationalAge}", gestAgeFormatted)
    .replace("{trimester}", trimester)
    .replace("{babySizeFruit}", fruitName)
    .replace("{daysRemaining}", String(Math.max(0, daysRemainingNum)));

  return {
    values: {
      dueDate: dueDate.toISOString(),
      gestationalAge: gestAgeTotalDays,
      trimester: trimesterRaw,
      daysRemaining: Math.max(0, daysRemainingNum),
      conceptionDate: conceptionDate.toISOString(),
      deliveryWindow: `${windowStart.toISOString()}|${windowEnd.toISOString()}`,
      currentWeek: currentWeekNum,
      babySizeFruit: babyData.fruit,
      babyMeasurements: `${babyData.length}|${babyData.weight}`,
      babyDevelopment: babyData.highlight,
      zodiacSign: zodiac.sign,
      birthstone: birthstoneData.stone,
      birthSeason: seasonData.season,
      trimesterProgress: progressPercent,
      genderPrediction: genderPrediction.prediction || "",
    },
    formatted: {
      dueDate: fmtDate(dueDate),
      gestationalAge: gestAgeFormatted,
      trimester: trimester,
      daysRemaining: daysRemainingFormatted,
      conceptionDate: fmtDate(conceptionDate),
      deliveryWindow: `${fmtDateShort(windowStart)} – ${fmtDateShort(windowEnd)}`,
      currentWeek: `${weekLabel} ${currentWeekNum}`,
      babySizeFruit: `${babyData.fruitEmoji} ${fruitName}`,
      babyMeasurements: `${babyData.length} / ${babyData.weight}`,
      babyDevelopment: babyData.highlight,
      zodiacSign: `${zodiac.emoji} ${zodiacName}`,
      birthstone: `${birthstoneData.emoji} ${birthstoneName} — ${birthstoneMeaning}`,
      birthSeason: `${seasonData.emoji} ${seasonName}`,
      trimesterProgress: `${progressPercent}% ${completeLabel}`,
      genderPrediction: genderFormatted,
    },
    summary,
    isValid: true,
    metadata: { tableData, chartData },
  };
}

export default pregnancyDueDateConfig;
