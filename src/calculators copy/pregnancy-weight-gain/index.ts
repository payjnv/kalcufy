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
    },],

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
