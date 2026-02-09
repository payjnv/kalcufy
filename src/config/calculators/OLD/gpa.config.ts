import type { CalculatorConfigV3, CalculatorResults, DynamicListItem } from "@/engine/v3/types/engine.types";

// =============================================================================
// GRADE SCALES
// =============================================================================
const GRADE_POINTS_4_0: Record<string, number> = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "D-": 0.7,
  "F": 0.0,
};

const GRADE_POINTS_4_3: Record<string, number> = {
  "A+": 4.3, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "D-": 0.7,
  "F": 0.0,
};

const GRADE_OPTIONS = [
  { value: "A+", label: "A+" },
  { value: "A", label: "A" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B", label: "B" },
  { value: "B-", label: "B-" },
  { value: "C+", label: "C+" },
  { value: "C", label: "C" },
  { value: "C-", label: "C-" },
  { value: "D+", label: "D+" },
  { value: "D", label: "D" },
  { value: "D-", label: "D-" },
  { value: "F", label: "F" },
];

// =============================================================================
// CONFIG
// =============================================================================
export const gpaCalculatorConfig: CalculatorConfigV3 = {
  id: "gpa-calculator",
  slug: "gpa-calculator",
  name: "GPA Calculator",
  category: "everyday",
  icon: "🎓",

  // ═══════════════════════════════════════════════════════════════════════════
  // SEO
  // ═══════════════════════════════════════════════════════════════════════════
  seo: {
    title: "GPA Calculator - Free Online Grade Point Average Calculator",
    description: "Calculate your semester GPA, cumulative GPA, or find out what grades you need to reach your target GPA. Free online calculator with 4.0 and 4.3 grade scales.",
    shortDescription: "Calculate semester, cumulative, and target GPA",
    keywords: ["gpa calculator", "grade point average", "college gpa", "cumulative gpa", "semester gpa", "target gpa", "4.0 scale", "4.3 scale"],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HERO
  // ═══════════════════════════════════════════════════════════════════════════
  hero: {
    badge: "Education",
    rating: { average: 4.9, count: 2847 },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CALCULATION MODES
  // ═══════════════════════════════════════════════════════════════════════════
  calculationModes: {
    enabled: true,
    default: "semester",
    style: "buttons",
    modes: [
      {
        id: "semester",
        label: "Semester",
        icon: "📚",
        description: "Calculate GPA for current semester",
        inputs: ["gradeScale", "courses"],
        results: ["semesterGPA", "totalCredits", "classification"],
      },
      {
        id: "cumulative",
        label: "Cumulative",
        icon: "📊",
        description: "Calculate overall GPA including previous semesters",
        inputs: ["gradeScale", "courses", "currentGPA", "currentCredits"],
        results: ["cumulativeGPA", "semesterGPA", "totalCredits", "classification"],
      },
      {
        id: "target",
        label: "Target GPA",
        icon: "🎯",
        description: "Find out what grades you need",
        inputs: ["gradeScale", "currentGPA", "currentCredits", "targetGPA", "remainingCredits"],
        results: ["requiredGPA", "isAchievable", "classification"],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════════════════
  inputs: [
    // Grade Scale (all modes)
    {
      id: "gradeScale",
      type: "radio",
      label: "Grade Scale",
      required: true,
      defaultValue: "4.0",
      options: [
        { value: "4.0", label: "4.0 Scale (A+ = 4.0)" },
        { value: "4.3", label: "4.3 Scale (A+ = 4.3)" },
      ],
    },

    // Courses - Dynamic List (semester & cumulative modes)
    {
      id: "courses",
      type: "dynamic-list",
      label: "Current Semester Courses",
      required: true,
      modes: ["semester", "cumulative"],
      dynamicList: {
        minItems: 1,
        maxItems: 12,
        itemLabel: "Course",
        addButtonLabel: "Add Course",
        showIndex: true,
        fields: [
          {
            id: "name",
            type: "text",
            label: "Course Name",
            placeholder: "Course name",
            defaultValue: "",
            width: "lg",
          },
          {
            id: "grade",
            type: "select",
            label: "Grade",
            defaultValue: "A",
            width: "sm",
            options: GRADE_OPTIONS,
          },
          {
            id: "credits",
            type: "number",
            label: "Credits",
            defaultValue: 3,
            min: 1,
            max: 6,
            width: "xs",
            suffix: "cr",
          },
        ],
        defaultItems: [
          { id: "1", name: "Course 1", grade: "A", credits: 3 },
          { id: "2", name: "Course 2", grade: "B+", credits: 3 },
          { id: "3", name: "Course 3", grade: "A-", credits: 4 },
          { id: "4", name: "Course 4", grade: "B", credits: 3 },
        ],
      },
    },

    // Current GPA (cumulative & target modes ONLY)
    {
      id: "currentGPA",
      type: "number",
      label: "Current GPA",
      required: true,
      defaultValue: 3.5,
      min: 0,
      max: 4.3,
      step: 0.01,
      modes: ["cumulative", "target"],
      width: "half",
    },

    // Current Credits (cumulative & target modes ONLY)
    {
      id: "currentCredits",
      type: "number",
      label: "Credits Completed",
      required: true,
      defaultValue: 60,
      min: 0,
      max: 200,
      step: 1,
      modes: ["cumulative", "target"],
      width: "half",
    },

    // Target GPA (target mode ONLY)
    {
      id: "targetGPA",
      type: "number",
      label: "Target GPA",
      required: true,
      defaultValue: 3.7,
      min: 0,
      max: 4.3,
      step: 0.01,
      modes: ["target"],
      width: "half",
    },

    // Remaining Credits (target mode ONLY)
    {
      id: "remainingCredits",
      type: "number",
      label: "Remaining Credits",
      required: true,
      defaultValue: 30,
      min: 1,
      max: 120,
      step: 1,
      modes: ["target"],
      width: "half",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════════════════
  results: [
    {
      id: "semesterGPA",
      type: "primary",
      label: "Semester GPA",
      format: "number",
      decimals: 2,
    },
    {
      id: "cumulativeGPA",
      type: "primary",
      label: "Cumulative GPA",
      format: "number",
      decimals: 2,
    },
    {
      id: "requiredGPA",
      type: "primary",
      label: "Required GPA",
      format: "number",
      decimals: 2,
    },
    {
      id: "totalCredits",
      type: "secondary",
      label: "Total Credits",
      format: "number",
      suffix: " credits",
    },
    {
      id: "classification",
      type: "badge",
      label: "Standing",
      format: "text",
    },
    {
      id: "isAchievable",
      type: "badge",
      label: "Target Status",
      format: "text",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // VISUALIZATIONS - Grade Distribution
  // ═══════════════════════════════════════════════════════════════════════════
  visualizations: [
    {
      id: "gradeDistribution",
      type: "distribution-bars",
      title: "Grade Distribution",
      icon: "📊",
      distributionBars: {
        dataKey: "gradeDistribution",
        labelField: "name",
        valueField: "points",
        maxValue: 4.0,
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // INFO CARDS - Latin Honors & Tips
  // ═══════════════════════════════════════════════════════════════════════════
  infoCards: [
    {
      id: "latinHonors",
      title: "Latin Honors",
      icon: "🎓",
      type: "list",
      items: [
        { label: "Summa Cum Laude", value: "3.9+ GPA", color: "green" },
        { label: "Magna Cum Laude", value: "3.7 - 3.89 GPA", color: "green" },
        { label: "Cum Laude", value: "3.5 - 3.69 GPA", color: "blue" },
        { label: "Dean's List", value: "3.5+ (varies)", color: "blue" },
      ],
    },
    {
      id: "gpaTips",
      title: "GPA Tips",
      icon: "💡",
      type: "horizontal",
      items: [
        { label: "Higher credit courses impact GPA more" },
        { label: "Retaking failed courses can replace grades" },
        { label: "Early semesters have more GPA impact" },
        { label: "Pass/Fail courses don't affect GPA" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCE DATA - Grade Points Table
  // ═══════════════════════════════════════════════════════════════════════════
  referenceData: [
    {
      id: "gradePointsReference",
      title: "Grade Points Reference",
      icon: "📋",
      columns: 4,
      items: [
        { label: "A+", value: "4.0" },
        { label: "A", value: "4.0" },
        { label: "A-", value: "3.7" },
        { label: "B+", value: "3.3" },
        { label: "B", value: "3.0" },
        { label: "B-", value: "2.7" },
        { label: "C+", value: "2.3" },
        { label: "C", value: "2.0" },
        { label: "C-", value: "1.7" },
        { label: "D+", value: "1.3" },
        { label: "D", value: "1.0" },
        { label: "F", value: "0.0" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  educationSections: [
    {
      id: "aboutGPA",
      type: "cards",
      title: "Understanding GPA Scales",
      icon: "📊",
      cards: [
        {
          title: "4.0 Scale",
          description: "The most common scale where A+ and A both equal 4.0. Used by most US universities.",
        },
        {
          title: "4.3 Scale",
          description: "Allows A+ to earn 4.3 points, rewarding exceptional performance above a standard A.",
        },
        {
          title: "Weighted vs Unweighted",
          description: "Some schools weight honors/AP classes higher. This calculator uses unweighted GPA.",
        },
      ],
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "Different schools may use different grade scales - verify with your registrar", type: "warning" },
        { text: "Some courses may be weighted differently (honors, AP, etc.)", type: "info" },
        { text: "Pass/Fail or Credit/No Credit courses typically don't affect GPA", type: "info" },
        { text: "Repeated courses may have different policies at different institutions", type: "warning" },
        { text: "Graduate school admissions often look at major GPA separately", type: "info" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "🧮",
      description: "How to calculate semester GPA manually",
      columns: 1,
      examples: [
        {
          title: "Semester GPA Calculation",
          steps: [
            "Course 1: A (4.0) × 3 credits = 12.0 quality points",
            "Course 2: B+ (3.3) × 3 credits = 9.9 quality points",
            "Course 3: A- (3.7) × 4 credits = 14.8 quality points",
            "Course 4: B (3.0) × 3 credits = 9.0 quality points",
            "Total: 45.7 quality points ÷ 13 credits = 3.52 GPA",
          ],
          result: "Semester GPA: 3.52",
        },
      ],
    },
    {
      id: "whatIsGPA",
      type: "prose",
      title: "What is GPA?",
      content: "Grade Point Average (GPA) is a standardized way of measuring academic achievement in the United States. It's calculated by converting letter grades to numbers, weighting them by credit hours, and averaging the result. Your GPA matters for scholarships, graduate school admissions, and some employers.",
    },
    {
      id: "howCalculated",
      type: "prose",
      title: "How is GPA Calculated?",
      content: "GPA is calculated by multiplying each course's grade points by its credit hours to get 'quality points', then dividing the total quality points by total credit hours. For example, an A (4.0) in a 3-credit course gives you 12 quality points. Add all quality points and divide by total credits for your GPA.",
    },
    {
      id: "improvingGPA",
      type: "prose",
      title: "Tips for Improving Your GPA",
      content: "Focus on high-credit courses first since they have the biggest impact. Consider retaking courses where you received low grades if your school allows grade replacement. Start strong in your first year when you have fewer credits - early performance has lasting effects. Finally, use academic resources like tutoring and office hours proactively.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // FAQs
  // ═══════════════════════════════════════════════════════════════════════════
  faqs: [
    {
      question: "How is GPA calculated?",
      answer: "GPA = Total Quality Points ÷ Total Credit Hours. Quality points are calculated by multiplying each course's grade points (A=4.0, B=3.0, etc.) by its credit hours, then summing them all up.",
    },
    {
      question: "What's the difference between 4.0 and 4.3 scale?",
      answer: "On a 4.0 scale, both A+ and A equal 4.0. On a 4.3 scale, A+ equals 4.3, giving high achievers a slight edge. Check with your school to know which scale they use.",
    },
    {
      question: "What GPA do I need for Dean's List?",
      answer: "Dean's List requirements vary by school, but typically require a 3.5+ GPA (sometimes 3.0 or 3.7). Most schools also require a minimum number of credits (usually 12+) and no failing grades.",
    },
    {
      question: "How do I calculate my cumulative GPA?",
      answer: "Cumulative GPA includes all courses across all semesters. Multiply your current GPA by total credits earned, add quality points from new courses, then divide by total credits including new ones.",
    },
    {
      question: "Can I raise my GPA significantly in one semester?",
      answer: "It depends on your current credits. Early in college, GPA can change significantly. With many credits, it's harder to move. For example, with 90 credits at 3.0, a perfect 4.0 semester of 15 credits only raises it to about 3.14.",
    },
    {
      question: "What honors correspond to which GPA?",
      answer: "Typically: Summa Cum Laude (highest) requires 3.9+, Magna Cum Laude 3.7-3.89, Cum Laude 3.5-3.69. However, these thresholds vary by institution, so check your school's specific requirements.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════════════════
  references: [
    {
      authors: "College Board",
      title: "How to Calculate Your GPA",
      source: "BigFuture - College Board",
      year: "2024",
      url: "https://bigfuture.collegeboard.org/plan-for-college/college-prep/how-to-calculate-gpa",
    },
    {
      authors: "U.S. Department of Education",
      title: "Grade Point Average Calculation",
      source: "Federal Student Aid",
      year: "2024",
      url: "https://studentaid.gov/",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // SIDEBAR & FEATURES
  // ═══════════════════════════════════════════════════════════════════════════
  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: true,
    category: "everyday",
    cta: {
      title: "Percentage Calculator",
      description: "Calculate percentages, increases, and changes.",
      linkText: "Try Percentage Calculator →",
      link: "/percentage-calculator",
    },
  },

  features: {
    autoCalculate: true,
    saveHistory: true,
    exportPDF: true,
    exportExcel: true,
    shareResults: true,
  },

  relatedCalculators: ["percentage-calculator", "age-calculator", "date-calculator"],

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
export function calculateGPA(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
  mode?: string;
}): CalculatorResults {
  const { values, mode = "semester" } = data;

  const gradeScale = (values.gradeScale as string) || "4.0";
  const gradePoints = gradeScale === "4.3" ? GRADE_POINTS_4_3 : GRADE_POINTS_4_0;
  const maxGPA = gradeScale === "4.3" ? 4.3 : 4.0;

  const courses = (values.courses as DynamicListItem[]) || [];
  const currentGPA = (values.currentGPA as number) || 0;
  const currentCredits = (values.currentCredits as number) || 0;
  const targetGPA = (values.targetGPA as number) || 0;
  const remainingCredits = (values.remainingCredits as number) || 0;

  // Calculate semester GPA from courses
  let totalQualityPoints = 0;
  let totalCredits = 0;

  // Build grade distribution for visualization
  const gradeDistribution: Array<{ id: string; name: string; grade: string; points: number; credits: number }> = [];

  courses.forEach((course, index) => {
    const grade = (course.grade as string) || "A";
    const credits = (course.credits as number) || 3;
    const courseName = (course.name as string) || `Course ${index + 1}`;
    const points = gradePoints[grade] || 0;

    totalQualityPoints += points * credits;
    totalCredits += credits;

    gradeDistribution.push({
      id: String(index),
      name: courseName,
      grade,
      points,
      credits,
    });
  });

  const semesterGPA = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;

  // Calculate cumulative GPA
  const previousQualityPoints = currentGPA * currentCredits;
  const newTotalQualityPoints = previousQualityPoints + totalQualityPoints;
  const newTotalCredits = currentCredits + totalCredits;
  const cumulativeGPA = newTotalCredits > 0 ? newTotalQualityPoints / newTotalCredits : semesterGPA;

  // Calculate required GPA for target
  const totalCreditsNeeded = currentCredits + remainingCredits;
  const targetQualityPoints = targetGPA * totalCreditsNeeded;
  const currentQualityPoints = currentGPA * currentCredits;
  const neededQualityPoints = targetQualityPoints - currentQualityPoints;
  const requiredGPA = remainingCredits > 0 ? neededQualityPoints / remainingCredits : 0;
  const isAchievable = requiredGPA <= maxGPA && requiredGPA >= 0;

  // Get classification based on mode
  const getClassification = (gpa: number): string => {
    if (gpa >= 3.9) return "Summa Cum Laude";
    if (gpa >= 3.7) return "Magna Cum Laude";
    if (gpa >= 3.5) return "Cum Laude";
    if (gpa >= 3.0) return "Dean's List Eligible";
    if (gpa >= 2.0) return "Good Standing";
    return "Academic Probation Risk";
  };

  const displayGPA = mode === "cumulative" ? cumulativeGPA : mode === "target" ? targetGPA : semesterGPA;
  const classification = getClassification(displayGPA);

  // Build summary
  let summary = "";
  if (mode === "semester") {
    summary = `Semester GPA: ${semesterGPA.toFixed(2)} (${classification})`;
  } else if (mode === "cumulative") {
    summary = `Cumulative GPA: ${cumulativeGPA.toFixed(2)} (${classification})`;
  } else if (mode === "target") {
    summary = isAchievable
      ? `You need a ${requiredGPA.toFixed(2)} GPA to reach your target of ${targetGPA.toFixed(2)}`
      : `Target GPA of ${targetGPA.toFixed(2)} is not achievable with current credits`;
  }

  return {
    values: {
      semesterGPA,
      cumulativeGPA,
      requiredGPA,
      totalCredits: mode === "cumulative" ? newTotalCredits : totalCredits,
      classification,
      isAchievable: isAchievable ? "Achievable" : "Not Achievable",
    },
    formatted: {
      semesterGPA: semesterGPA.toFixed(2),
      cumulativeGPA: cumulativeGPA.toFixed(2),
      requiredGPA: requiredGPA.toFixed(2),
      totalCredits: String(mode === "cumulative" ? newTotalCredits : totalCredits),
      classification,
      isAchievable: isAchievable ? "Achievable" : "Not Achievable",
    },
    summary,
    isValid: true,
    metadata: {
      gradeDistribution,
      maxGPA,
      gradeScale,
    },
  };
}

export default gpaCalculatorConfig;
