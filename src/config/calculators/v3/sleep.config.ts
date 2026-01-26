import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// SLEEP RECOMMENDATIONS BY AGE (CDC/AASM)
// =============================================================================
const AGE_GROUPS = [
  { value: "infant", label: "Infant (4-12 months)", min: 12, max: 16 },
  { value: "toddler", label: "Toddler (1-2 years)", min: 11, max: 14 },
  { value: "preschool", label: "Preschool (3-5 years)", min: 10, max: 13 },
  { value: "school", label: "School Age (6-12 years)", min: 9, max: 12 },
  { value: "teen", label: "Teen (13-17 years)", min: 8, max: 10 },
  { value: "adult", label: "Adult (18-64 years)", min: 7, max: 9 },
  { value: "senior", label: "Senior (65+ years)", min: 7, max: 8 },
];

// =============================================================================
// SLEEP STAGES INFO (for reference data)
// =============================================================================
const SLEEP_STAGES = [
  { stage: "N1 (Light Sleep)", duration: "5-10 min", purpose: "Transition from wakefulness, easily awakened" },
  { stage: "N2 (Light Sleep)", duration: "10-25 min", purpose: "Heart rate slows, temperature drops, 50% of sleep" },
  { stage: "N3 (Deep Sleep)", duration: "20-40 min", purpose: "Physical restoration, growth hormone, immune boost" },
  { stage: "REM Sleep", duration: "10-60 min", purpose: "Dreams, memory consolidation, emotional processing" },
];

// =============================================================================
// FALL ASLEEP TIME OPTIONS
// =============================================================================
const FALL_ASLEEP_OPTIONS = [
  { value: "5", label: "5 minutes (fast sleeper)" },
  { value: "10", label: "10 minutes" },
  { value: "15", label: "15 minutes (average)" },
  { value: "20", label: "20 minutes" },
  { value: "30", label: "30 minutes (slow sleeper)" },
];

// =============================================================================
// CONFIG
// =============================================================================
export const sleepCalculatorConfig: CalculatorConfigV3 = {
  id: "sleep-calculator",
  slug: "sleep-calculator",
  name: "Sleep Calculator",
  category: "health",
  icon: "😴",

  // ═══════════════════════════════════════════════════════════════════════════
  // SEO
  // ═══════════════════════════════════════════════════════════════════════════
  seo: {
    title: "Sleep Calculator - Optimal Bedtime & Wake Time Based on Sleep Cycles",
    description: "Calculate the best time to go to bed or wake up based on 90-minute sleep cycles. Avoid grogginess by waking between cycles. Free sleep cycle calculator with age-based recommendations.",
    shortDescription: "Calculate optimal bedtime and wake time based on sleep cycles",
    keywords: ["sleep calculator", "sleep cycle calculator", "bedtime calculator", "wake up time", "REM sleep", "sleep stages", "how much sleep do I need"],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HERO
  // ═══════════════════════════════════════════════════════════════════════════
  hero: {
    badge: "Health",
    rating: { average: 4.8, count: 28500 },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UNIT SYSTEM
  // ═══════════════════════════════════════════════════════════════════════════
  unitSystem: {
    enabled: false,
    default: "imperial",
    options: [],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CALCULATION MODES
  // ═══════════════════════════════════════════════════════════════════════════
  calculationModes: {
    enabled: true,
    default: "wakeAt",
    style: "buttons",
    modes: [
      { id: "wakeAt", label: "When to sleep", icon: "🛏️", description: "I know when I need to wake up" },
      { id: "sleepAt", label: "When to wake", icon: "⏰", description: "I know when I'm going to bed" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════════════════
  inputs: [
    // Mode: Wake At
    {
      id: "wakeUpTime",
      type: "time",
      label: "Wake-up Time",
      required: true,
      defaultValue: "07:00",
      helpText: "What time do you need to wake up?",
      width: "full",
      modes: ["wakeAt"],
    },
    // Mode: Sleep At
    {
      id: "bedTime",
      type: "time",
      label: "Bedtime",
      required: true,
      defaultValue: "23:00",
      helpText: "What time are you going to bed?",
      width: "full",
      modes: ["sleepAt"],
    },
    // All modes
    {
      id: "ageGroup",
      type: "select",
      label: "Age Group",
      required: true,
      defaultValue: "adult",
      options: AGE_GROUPS,
      helpText: "Sleep needs vary by age",
      width: "full",
    },
    {
      id: "fallAsleepTime",
      type: "select",
      label: "Time to Fall Asleep",
      required: true,
      defaultValue: "15",
      options: FALL_ASLEEP_OPTIONS,
      helpText: "Average is 10-20 minutes",
      width: "full",
    },
    // Advanced
    {
      id: "sleepCycleLength",
      type: "slider",
      label: "Sleep Cycle Length",
      required: false,
      defaultValue: 90,
      min: 70,
      max: 120,
      step: 5,
      suffix: "min",
      helpText: "Average is 90 min, ranges 70-120",
      width: "full",
    },
  ],

  inputGroups: [
    {
      id: "advanced",
      title: "Advanced Settings",
      inputs: ["sleepCycleLength"],
      defaultExpanded: false,
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════════════════
  results: [
    { id: "optimalTime", type: "primary", label: "Optimal Time", format: "text", icon: "⭐" },
    { id: "sleepDuration", type: "secondary", label: "Sleep Duration", format: "text" },
    { id: "cycles", type: "secondary", label: "Sleep Cycles", format: "text" },
    { id: "recommendation", type: "secondary", label: "Recommendation", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // INFO CARDS
  // ═══════════════════════════════════════════════════════════════════════════
  infoCards: [
    {
      id: "sleepStages",
      title: "Sleep Stages in Each Cycle",
      icon: "🧠",
      type: "table",
      columns: ["Stage", "Duration", "Purpose"],
      rows: SLEEP_STAGES.map(s => [s.stage, s.duration, s.purpose]),
    },
    {
      id: "ageRecommendations",
      title: "Sleep Recommendations by Age (CDC/AASM)",
      icon: "📊",
      type: "table",
      columns: ["Age Group", "Hours Needed", "Cycles"],
      rows: AGE_GROUPS.map(a => [
        a.label,
        `${a.min}-${a.max} hours`,
        `${Math.ceil(a.min * 60 / 90)}-${Math.floor(a.max * 60 / 90)}`
      ]),
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCE DATA
  // ═══════════════════════════════════════════════════════════════════════════
  referenceData: [
    {
      id: "cycleGuide",
      title: "Sleep Cycle Guide",
      icon: "🔄",
      columns: 2,
      items: [
        { label: "Cycle Length", value: "90 min (avg)" },
        { label: "Light Sleep (N1+N2)", value: "~55% of cycle" },
        { label: "Deep Sleep (N3)", value: "~20% of cycle" },
        { label: "REM Sleep", value: "~25% of cycle" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  educationSections: [
    {
      id: "sleepCycleScience",
      type: "cards",
      title: "The Science of Sleep Cycles",
      icon: "🧬",
      columns: 2,
      cards: [
        { title: "90-Minute Cycles", description: "Sleep occurs in 90-minute cycles (range: 70-120 min). Each cycle progresses through N1 → N2 → N3 → N2 → REM. Adults need 4-6 cycles per night.", icon: "🔄" },
        { title: "Why Timing Matters", description: "Waking mid-cycle (especially during deep sleep) causes sleep inertia—grogginess lasting 15-60 minutes. Waking between cycles, during light sleep, feels more refreshing.", icon: "⏰" },
        { title: "Deep Sleep (N3)", description: "Occurs more in early cycles. Physical restoration, growth hormone release, immune system strengthening. Very hard to wake from—causes disorientation if interrupted.", icon: "💪" },
        { title: "REM Sleep", description: "Increases in later cycles. Dreams, memory consolidation, emotional processing. Brain highly active. Muscles paralyzed. First REM ~10 min, last can be 60 min.", icon: "🧠" },
      ],
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "Individual sleep cycles vary from 70-120 minutes—90 min is just an average", type: "info" },
        { text: "Sleep quality matters as much as quantity—7 hours of good sleep beats 9 hours of poor sleep", type: "info" },
        { text: "Consistency is crucial—irregular schedules disrupt your circadian rhythm", type: "warning" },
        { text: "Blue light from screens suppresses melatonin—stop devices 1 hour before bed", type: "warning" },
        { text: "Caffeine has a half-life of 5-6 hours—avoid after 2 PM", type: "info" },
        { text: "Consult a doctor if you consistently struggle to fall/stay asleep or feel tired despite adequate sleep", type: "warning" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "📊",
      description: "Adult wanting to wake at 7:00 AM, 15 minutes to fall asleep",
      columns: 2,
      examples: [
        {
          title: "6 Cycles (9 hours) - Optimal",
          steps: [
            "Wake time: 7:00 AM",
            "6 cycles × 90 min = 540 min",
            "Add 15 min to fall asleep",
            "Total: 555 min (9h 15m before wake)",
          ],
          result: "Bedtime: 9:45 PM",
        },
        {
          title: "5 Cycles (7.5 hours) - Good",
          steps: [
            "Wake time: 7:00 AM",
            "5 cycles × 90 min = 450 min",
            "Add 15 min to fall asleep",
            "Total: 465 min (7h 45m before wake)",
          ],
          result: "Bedtime: 11:15 PM",
        },
      ],
    },
    {
      id: "whatAreSleepCycles",
      type: "prose",
      title: "What Are Sleep Cycles?",
      content: "A sleep cycle is a repeating pattern of brain activity that occurs throughout the night. Each cycle lasts approximately 90 minutes (though this varies from 70-120 minutes) and consists of four stages: N1 (light sleep transition), N2 (light sleep with slower brain waves), N3 (deep sleep for physical restoration), and REM (rapid eye movement, when dreaming occurs). Adults typically complete 4-6 cycles per night. The composition of cycles changes throughout the night—early cycles have more deep sleep, while later cycles have longer REM periods.",
    },
    {
      id: "sleepInertia",
      type: "prose",
      title: "Why You Wake Up Groggy (Sleep Inertia)",
      content: "Sleep inertia is that disoriented, groggy feeling when you wake up at the 'wrong' time. It occurs when you're awakened during deep sleep (N3) or mid-REM, and can impair cognitive function for 15-60 minutes. Your brain needs time to transition from sleep mode to full alertness. By timing your wake-up to coincide with the end of a sleep cycle (during light N1/N2 sleep), you can minimize sleep inertia and wake up feeling more refreshed. This is why you might feel better after 6 hours of sleep than after 7—if 6 hours aligns with complete cycles.",
    },
    {
      id: "sleepHygiene",
      type: "prose",
      title: "Sleep Hygiene Tips",
      content: "Good sleep hygiene dramatically improves sleep quality: (1) Maintain a consistent schedule—go to bed and wake at the same time daily, even weekends. (2) Create a sleep-friendly environment—cool (60-67°F), dark, and quiet. (3) Avoid screens for 1+ hour before bed—blue light suppresses melatonin. (4) Limit caffeine after 2 PM and alcohol before bed. (5) Exercise regularly, but not within 3 hours of bedtime. (6) Establish a wind-down routine—reading, warm bath, or meditation. (7) Reserve your bed for sleep only to strengthen the bed-sleep association.",
    },
    {
      id: "chronotypes",
      type: "prose",
      title: "Understanding Chronotypes",
      content: "Your chronotype is your natural sleep-wake preference—whether you're a 'morning lark' or 'night owl.' This is largely genetic and influences when you naturally feel sleepy and alert. Forcing yourself to sleep against your chronotype can reduce sleep quality. While you can shift your schedule somewhat through consistent timing and light exposure, dramatic changes are difficult to maintain. If possible, align your sleep schedule with your natural chronotype. Morning types should aim for earlier bedtimes; evening types may function better with later schedules.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // FAQs
  // ═══════════════════════════════════════════════════════════════════════════
  faqs: [
    { question: "How accurate is the 90-minute sleep cycle?", answer: "90 minutes is the average—individual cycles range from 70-120 minutes and vary throughout the night. Early cycles tend to be shorter (70-100 min) while later cycles are longer (90-120 min). Use 90 minutes as a starting point, then adjust based on how you feel waking at calculated times." },
    { question: "Why do I still feel tired after 8 hours of sleep?", answer: "Several reasons: (1) You may have woken mid-cycle, causing sleep inertia. (2) Sleep quality was poor due to interruptions, sleep disorders, or environmental factors. (3) Sleep debt accumulated over days can't be fixed in one night. (4) You might need more or less than 8 hours—try adjusting. (5) Underlying health conditions can affect sleep quality." },
    { question: "Is it better to sleep 6 hours or 7 hours?", answer: "Generally, 7 hours is better as most adults need 7-9 hours. However, if 6 hours (4 complete cycles) vs 7 hours (interrupted 5th cycle) means the difference between waking during light vs deep sleep, you might feel better with 6. The key is completing full cycles. Try both and see how you feel." },
    { question: "What time should I stop using my phone before bed?", answer: "At least 1 hour before bed, ideally 2 hours. Blue light from screens suppresses melatonin production, making it harder to fall asleep. If you must use devices, enable night mode/blue light filters. The content matters too—stimulating content (news, social media) activates your brain even without blue light." },
    { question: "Does the calculator work for naps?", answer: "For naps, you have two good options: (1) 20 minutes or less—you won't enter deep sleep, so you'll wake easily without grogginess. (2) 90 minutes—one complete cycle. Avoid 30-60 minute naps as you'll likely wake from deep sleep feeling worse. Don't nap after 3 PM or it may interfere with nighttime sleep." },
    { question: "Why do teenagers need more sleep than adults?", answer: "Teenagers (13-17) need 8-10 hours because their brains are still developing—particularly areas responsible for decision-making, emotion regulation, and memory. Sleep deprivation in teens is linked to poor academic performance, mood disorders, obesity, and increased accident risk. Their circadian rhythms also naturally shift later, making early school start times challenging." },
    { question: "Can I 'catch up' on sleep during weekends?", answer: "Partially, but it's not ideal. 'Social jet lag'—significantly different weekend vs weekday schedules—disrupts your circadian rhythm. You can recover some sleep debt, but it takes more than one night and doesn't fully reverse the effects of chronic sleep deprivation. A consistent schedule is much healthier than dramatic weekend catch-up." },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════════════════
  references: [
    { authors: "Paruthi S, Brooks LJ, D'Ambrosio C, et al.", year: "2016", title: "Recommended Amount of Sleep for Pediatric Populations", source: "Journal of Clinical Sleep Medicine", url: "https://jcsm.aasm.org/doi/10.5664/jcsm.5866" },
    { authors: "Watson NF, Badr MS, Belenky G, et al.", year: "2015", title: "Recommended Amount of Sleep for a Healthy Adult", source: "Sleep (AASM)", url: "https://academic.oup.com/sleep/article/38/6/843/2416952" },
    { authors: "Centers for Disease Control and Prevention", year: "2024", title: "Sleep and Sleep Disorders", source: "CDC.gov", url: "https://www.cdc.gov/sleep/" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SIDEBAR & FEATURES
  // ═══════════════════════════════════════════════════════════════════════════
  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: true,
    category: "health",
    cta: {
      title: "Optimize Your Nutrition",
      description: "Good sleep requires proper nutrition.",
      linkText: "Try Calorie Calculator →",
      link: "/calorie-calculator",
    },
  },

  features: {
    autoCalculate: true,
    saveHistory: true,
    exportPDF: false,
    shareResults: true,
  },

  relatedCalculators: ["calorie-calculator", "bmi-calculator", "ideal-weight-calculator", "body-fat-calculator"],

  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
    afterResults: true,
  },
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateSleep(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
  mode?: string;
}): CalculatorResults {
  const { values, mode = "wakeAt" } = data;

  const ageGroup = (values.ageGroup as string) || "adult";
  const fallAsleepTime = parseInt((values.fallAsleepTime as string) || "15");
  const sleepCycleLength = (values.sleepCycleLength as number) || 90;

  // Get age-specific recommendations
  const ageData = AGE_GROUPS.find(a => a.value === ageGroup) || AGE_GROUPS[5]; // default adult
  const minHours = ageData.min;
  const maxHours = ageData.max;

  // Helper functions
  const parseTime = (timeStr: string): Date => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  };

  const addMinutes = (date: Date, minutes: number): Date => {
    return new Date(date.getTime() + minutes * 60000);
  };

  const subtractMinutes = (date: Date, minutes: number): Date => {
    return new Date(date.getTime() - minutes * 60000);
  };

  // Calculate based on mode
  let results: Array<{ time: string; cycles: number; hours: number; quality: string; isOptimal: boolean }> = [];

  if (mode === "wakeAt") {
    // Calculate bedtimes for a given wake-up time
    const wakeTime = parseTime((values.wakeUpTime as string) || "07:00");
    
    for (let cycles = 6; cycles >= 3; cycles--) {
      const sleepMinutes = cycles * sleepCycleLength;
      const totalMinutes = sleepMinutes + fallAsleepTime;
      const bedTime = subtractMinutes(wakeTime, totalMinutes);
      const hours = sleepMinutes / 60;
      
      let quality = "Not recommended";
      let isOptimal = false;
      
      if (hours >= minHours && hours <= maxHours) {
        quality = hours >= (minHours + maxHours) / 2 ? "Optimal" : "Good";
        isOptimal = quality === "Optimal";
      } else if (hours >= minHours - 1) {
        quality = "Acceptable";
      }
      
      results.push({
        time: formatTime(bedTime),
        cycles,
        hours,
        quality,
        isOptimal,
      });
    }
  } else if (mode === "sleepAt") {
    // Calculate wake times for a given bedtime
    const bedTime = parseTime((values.bedTime as string) || "23:00");
    const fallAsleepAt = addMinutes(bedTime, fallAsleepTime);
    
    for (let cycles = 3; cycles <= 6; cycles++) {
      const sleepMinutes = cycles * sleepCycleLength;
      const wakeTime = addMinutes(fallAsleepAt, sleepMinutes);
      const hours = sleepMinutes / 60;
      
      let quality = "Not recommended";
      let isOptimal = false;
      
      if (hours >= minHours && hours <= maxHours) {
        quality = hours >= (minHours + maxHours) / 2 ? "Optimal" : "Good";
        isOptimal = quality === "Optimal";
      } else if (hours >= minHours - 1) {
        quality = "Acceptable";
      }
      
      results.push({
        time: formatTime(wakeTime),
        cycles,
        hours,
        quality,
        isOptimal,
      });
    }
  }

  // Find optimal result
  const optimalResult = results.find(r => r.isOptimal) || results.find(r => r.quality === "Good") || results[0];

  // Format hours
  const formatHours = (h: number) => {
    const hrs = Math.floor(h);
    const mins = Math.round((h - hrs) * 60);
    return mins > 0 ? `${hrs}h ${mins}m` : `${hrs} hours`;
  };

  // Build all times list for display
  const allTimes = results.map(r => ({
    time: r.time,
    label: `${r.cycles} cycles (${formatHours(r.hours)})`,
    quality: r.quality,
    isOptimal: r.isOptimal,
  }));

  const modeLabel = mode === "wakeAt" ? "Bedtime" : "Wake-up Time";

  return {
    values: {
      optimalTime: optimalResult.time,
      cycles: optimalResult.cycles,
      hours: optimalResult.hours,
      allTimes,
    },
    formatted: {
      optimalTime: optimalResult.time,
      sleepDuration: formatHours(optimalResult.hours),
      cycles: `${optimalResult.cycles} complete cycles`,
      recommendation: `${ageData.label}: ${minHours}-${maxHours} hours recommended`,
    },
    summary: mode === "wakeAt" 
      ? `For optimal rest, go to bed at ${optimalResult.time} to get ${formatHours(optimalResult.hours)} of sleep (${optimalResult.cycles} complete cycles).`
      : `For optimal rest, wake up at ${optimalResult.time} to get ${formatHours(optimalResult.hours)} of sleep (${optimalResult.cycles} complete cycles).`,
    isValid: true,
    metadata: {
      mode,
      modeLabel,
      allTimes,
      ageRecommendation: `${minHours}-${maxHours} hours`,
    },
  };
}

export default sleepCalculatorConfig;
