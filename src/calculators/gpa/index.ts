import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// Standard US 4.0 scale (A+ = 4.3)
const GRADE_OPTS = [
  { value: "" }, { value: "A+" }, { value: "A" }, { value: "A-" },
  { value: "B+" }, { value: "B" }, { value: "B-" },
  { value: "C+" }, { value: "C" }, { value: "C-" },
  { value: "D+" }, { value: "D" }, { value: "D-" },
  { value: "F" }, { value: "P" }, { value: "NP" },
];

const GRADE_MAP: Record<string, number | null> = {
  "A+": 4.3, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "D-": 0.7,
  "F": 0.0,
  "P": null, "NP": null,
};

export const gpaCalculatorConfig: CalculatorConfigV4 = {
  id: "gpa",
  version: "4.0",
  category: "everyday",
  icon: "🎓",

  presets: [
    {
      id: "honorStudent",
      icon: "⭐",
      values: {
        course1Name: "Calculus II", grade1: "A", credits1: 4,
        course2Name: "Organic Chemistry", grade2: "A-", credits2: 4,
        course3Name: "English Lit", grade3: "A", credits3: 3,
        showMoreCourses: "yes",
        course4Name: "Physics I", grade4: "A+", credits4: 4,
        course5Name: "History", grade5: "B+", credits5: 3,
        course6Name: "", grade6: "", credits6: 0,
        course7Name: "", grade7: "", credits7: 0,
        course8Name: "", grade8: "", credits8: 0,
        includePriorGpa: "no", priorGpa: 0, priorCredits: 0,
      },
    },
    {
      id: "cumulativeGpa",
      icon: "📊",
      values: {
        course1Name: "Statistics", grade1: "B+", credits1: 3,
        course2Name: "Marketing", grade2: "A-", credits2: 3,
        course3Name: "Accounting", grade3: "B", credits3: 4,
        showMoreCourses: "no",
        course4Name: "", grade4: "", credits4: 0,
        course5Name: "", grade5: "", credits5: 0,
        course6Name: "", grade6: "", credits6: 0,
        course7Name: "", grade7: "", credits7: 0,
        course8Name: "", grade8: "", credits8: 0,
        includePriorGpa: "yes", priorGpa: 3.45, priorCredits: 48,
      },
    },
    {
      id: "mixedSemester",
      icon: "📝",
      values: {
        course1Name: "Biology", grade1: "A", credits1: 4,
        course2Name: "Philosophy", grade2: "C+", credits2: 3,
        course3Name: "Computer Science", grade3: "B-", credits3: 3,
        showMoreCourses: "yes",
        course4Name: "Art History", grade4: "A-", credits4: 3,
        course5Name: "Lab", grade5: "P", credits5: 1,
        course6Name: "", grade6: "", credits6: 0,
        course7Name: "", grade7: "", credits7: 0,
        course8Name: "", grade8: "", credits8: 0,
        includePriorGpa: "no", priorGpa: 0, priorCredits: 0,
      },
    },
  ],

  t: {
    en: {
      name: "GPA Calculator",
      slug: "gpa-calculator",
      subtitle: "Calculate your semester and cumulative GPA on the 4.0 scale. Enter course names, letter grades, and credit hours. Supports A+ (4.3), Pass/No Pass, and prior GPA.",
      breadcrumb: "GPA",

      seo: {
        title: "GPA Calculator - Semester & Cumulative GPA (4.0)",
        description: "Calculate your college GPA on the 4.0 scale with course names, credit hours, and letter grades. Supports cumulative GPA, Pass/No Pass, and A+ = 4.3.",
        shortDescription: "Calculate semester and cumulative GPA easily.",
        keywords: ["gpa calculator", "college gpa calculator", "cumulative gpa calculator", "calculate gpa", "grade point average", "semester gpa", "4.0 scale gpa", "gpa calculator online free"],
      },

      calculator: { yourInformation: "Your Courses" },
      ui: { yourInformation: "Your Courses", calculate: "Calculate", reset: "Reset", results: "Results" },

      inputs: {
        course1Name: { label: "Course 1", helpText: "Course name (optional)" },
        grade1: { label: "Grade", helpText: "Letter grade", options: { "": "—", "A+": "A+ (4.3)", "A": "A (4.0)", "A-": "A- (3.7)", "B+": "B+ (3.3)", "B": "B (3.0)", "B-": "B- (2.7)", "C+": "C+ (2.3)", "C": "C (2.0)", "C-": "C- (1.7)", "D+": "D+ (1.3)", "D": "D (1.0)", "D-": "D- (0.7)", "F": "F (0.0)", "P": "Pass", "NP": "No Pass" } },
        credits1: { label: "Credits", helpText: "Credit hours" },
        course2Name: { label: "Course 2", helpText: "Course name (optional)" },
        grade2: { label: "Grade", helpText: "Letter grade", options: { "": "—", "A+": "A+ (4.3)", "A": "A (4.0)", "A-": "A- (3.7)", "B+": "B+ (3.3)", "B": "B (3.0)", "B-": "B- (2.7)", "C+": "C+ (2.3)", "C": "C (2.0)", "C-": "C- (1.7)", "D+": "D+ (1.3)", "D": "D (1.0)", "D-": "D- (0.7)", "F": "F (0.0)", "P": "Pass", "NP": "No Pass" } },
        credits2: { label: "Credits", helpText: "Credit hours" },
        course3Name: { label: "Course 3", helpText: "Course name (optional)" },
        grade3: { label: "Grade", helpText: "Letter grade", options: { "": "—", "A+": "A+ (4.3)", "A": "A (4.0)", "A-": "A- (3.7)", "B+": "B+ (3.3)", "B": "B (3.0)", "B-": "B- (2.7)", "C+": "C+ (2.3)", "C": "C (2.0)", "C-": "C- (1.7)", "D+": "D+ (1.3)", "D": "D (1.0)", "D-": "D- (0.7)", "F": "F (0.0)", "P": "Pass", "NP": "No Pass" } },
        credits3: { label: "Credits", helpText: "Credit hours" },
        showMoreCourses: { label: "More courses?", helpText: "Show additional course fields", options: { no: "3 courses", yes: "Up to 8 courses" } },
        course4Name: { label: "Course 4", helpText: "Course name (optional)" },
        grade4: { label: "Grade", helpText: "Letter grade", options: { "": "—", "A+": "A+ (4.3)", "A": "A (4.0)", "A-": "A- (3.7)", "B+": "B+ (3.3)", "B": "B (3.0)", "B-": "B- (2.7)", "C+": "C+ (2.3)", "C": "C (2.0)", "C-": "C- (1.7)", "D+": "D+ (1.3)", "D": "D (1.0)", "D-": "D- (0.7)", "F": "F (0.0)", "P": "Pass", "NP": "No Pass" } },
        credits4: { label: "Credits", helpText: "Credit hours" },
        course5Name: { label: "Course 5", helpText: "Course name (optional)" },
        grade5: { label: "Grade", helpText: "Letter grade", options: { "": "—", "A+": "A+ (4.3)", "A": "A (4.0)", "A-": "A- (3.7)", "B+": "B+ (3.3)", "B": "B (3.0)", "B-": "B- (2.7)", "C+": "C+ (2.3)", "C": "C (2.0)", "C-": "C- (1.7)", "D+": "D+ (1.3)", "D": "D (1.0)", "D-": "D- (0.7)", "F": "F (0.0)", "P": "Pass", "NP": "No Pass" } },
        credits5: { label: "Credits", helpText: "Credit hours" },
        course6Name: { label: "Course 6", helpText: "Course name (optional)" },
        grade6: { label: "Grade", helpText: "Letter grade", options: { "": "—", "A+": "A+ (4.3)", "A": "A (4.0)", "A-": "A- (3.7)", "B+": "B+ (3.3)", "B": "B (3.0)", "B-": "B- (2.7)", "C+": "C+ (2.3)", "C": "C (2.0)", "C-": "C- (1.7)", "D+": "D+ (1.3)", "D": "D (1.0)", "D-": "D- (0.7)", "F": "F (0.0)", "P": "Pass", "NP": "No Pass" } },
        credits6: { label: "Credits", helpText: "Credit hours" },
        course7Name: { label: "Course 7", helpText: "Course name (optional)" },
        grade7: { label: "Grade", helpText: "Letter grade", options: { "": "—", "A+": "A+ (4.3)", "A": "A (4.0)", "A-": "A- (3.7)", "B+": "B+ (3.3)", "B": "B (3.0)", "B-": "B- (2.7)", "C+": "C+ (2.3)", "C": "C (2.0)", "C-": "C- (1.7)", "D+": "D+ (1.3)", "D": "D (1.0)", "D-": "D- (0.7)", "F": "F (0.0)", "P": "Pass", "NP": "No Pass" } },
        credits7: { label: "Credits", helpText: "Credit hours" },
        course8Name: { label: "Course 8", helpText: "Course name (optional)" },
        grade8: { label: "Grade", helpText: "Letter grade", options: { "": "—", "A+": "A+ (4.3)", "A": "A (4.0)", "A-": "A- (3.7)", "B+": "B+ (3.3)", "B": "B (3.0)", "B-": "B- (2.7)", "C+": "C+ (2.3)", "C": "C (2.0)", "C-": "C- (1.7)", "D+": "D+ (1.3)", "D": "D (1.0)", "D-": "D- (0.7)", "F": "F (0.0)", "P": "Pass", "NP": "No Pass" } },
        credits8: { label: "Credits", helpText: "Credit hours" },
        includePriorGpa: { label: "Include prior semesters?", helpText: "Add previous GPA to calculate cumulative", options: { no: "No — semester only", yes: "Yes — cumulative GPA" } },
        priorGpa: { label: "Prior GPA", helpText: "Your GPA from previous semesters" },
        priorCredits: { label: "Prior Credits", helpText: "Total credits from previous semesters" },
      },

      results: {
        semesterGpa: { label: "Semester GPA" },
        cumulativeGpa: { label: "Cumulative GPA" },
        totalCredits: { label: "Total Credits" },
        totalPoints: { label: "Quality Points" },
      },

      presets: {
        honorStudent: { label: "Honor Student (5 courses)", description: "Mostly A's — 3.86 GPA" },
        cumulativeGpa: { label: "Cumulative GPA", description: "3 courses + prior 3.45 GPA" },
        mixedSemester: { label: "Mixed Grades + Pass", description: "A to C+ with a Pass course" },
      },

      values: { "gpa": "GPA", "credits": "credits", "points": "points", "of": "of", "on": "on", "scale": "scale" },
      formats: { summary: "Your semester GPA is {semesterGpa} on a 4.0 scale" },

      infoCards: {
        metrics: {
          title: "GPA Results",
          items: [
            { label: "Semester GPA", valueKey: "semesterGpa" },
            { label: "Cumulative GPA", valueKey: "cumulativeGpa" },
            { label: "Semester Credits", valueKey: "semesterCredits" },
            { label: "Courses Counted", valueKey: "courseCount" },
          ],
        },
        details: {
          title: "Academic Standing",
          items: [
            { label: "Dean's List (≥3.5)", valueKey: "deansListNote" },
            { label: "Academic Standing", valueKey: "standingNote" },
            { label: "Highest Grade", valueKey: "highestGrade" },
            { label: "Lowest Grade", valueKey: "lowestGrade" },
          ],
        },
        tips: {
          title: "GPA Tips",
          items: [
            "High-credit courses impact your GPA the most — prioritize doing well in 4-credit classes",
            "An A in a 4-credit class adds 16 quality points vs. 12 in a 3-credit class",
            "P/NP courses don't affect GPA — use Pass/No Pass strategically for electives",
            "Retaking a failed course often replaces the F — check your school's grade replacement policy",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is GPA?",
          content: "GPA (Grade Point Average) is a standardized measure of academic performance used across US colleges and universities. The most common scale runs from 0.0 to 4.0, though some schools extend to 4.3 by assigning A+ a higher value. Your GPA is calculated by multiplying each course's grade points by its credit hours to get quality points, summing all quality points, and dividing by total credit hours. For example, an A (4.0) in a 4-credit course produces 16 quality points, while a B (3.0) in a 3-credit course produces 9. Added together: 25 quality points divided by 7 credits equals a 3.57 GPA. GPA matters for Dean's List eligibility, scholarships, graduate school admissions, and many job applications.",
        },
        howItWorks: {
          title: "How This Calculator Works",
          content: "Enter a letter grade and credit hours for each course. The calculator multiplies grade points by credits to find quality points per course, then divides total quality points by total graded credits. Pass/No Pass (P/NP) courses earn credit but are excluded from the GPA calculation, exactly as most colleges handle them. To calculate cumulative GPA, toggle 'Include prior semesters' and enter your existing GPA and credit total. The calculator combines your prior quality points (Prior GPA × Prior Credits) with this semester's quality points to produce your updated cumulative GPA. This is the same formula used by college registrars.",
        },
        considerations: {
          title: "Important Considerations",
          items: [
            { text: "A+ = 4.3 on this calculator. Some schools cap A+ at 4.0 — check your institution's scale", type: "warning" },
            { text: "P/NP and W (Withdrawal) courses are excluded from GPA calculations", type: "info" },
            { text: "Cum laude honors: typically 3.5+ (cum laude), 3.7+ (magna), 3.9+ (summa)", type: "info" },
            { text: "Academic probation usually begins below 2.0 GPA — exact thresholds vary by school", type: "warning" },
            { text: "Transfer credits may or may not be included in your GPA — most schools exclude them", type: "info" },
            { text: "Weighted GPA (5.0 scale) is used in high schools for AP/Honors — this calculator uses the college 4.0 scale", type: "info" },
          ],
        },
        categories: {
          title: "GPA Scale Reference",
          items: [
            { text: "A+ (4.3): Exceptional — exceeds highest expectations in the course", type: "info" },
            { text: "A / A- (4.0 / 3.7): Excellent — demonstrates thorough mastery of material", type: "info" },
            { text: "B+ / B / B- (3.3 / 3.0 / 2.7): Good — solid understanding with room to improve", type: "info" },
            { text: "C+ / C / C- (2.3 / 2.0 / 1.7): Average — meets core requirements, minimum for many majors", type: "info" },
            { text: "D+ / D / D- (1.3 / 1.0 / 0.7): Below average — minimum passing at most institutions", type: "info" },
            { text: "F (0.0): Failing — no credit earned, significantly lowers GPA", type: "info" },
          ],
        },
        examples: {
          title: "GPA Calculation Examples",
          description: "Step-by-step grade point calculations",
          examples: [
            {
              title: "Semester GPA (4 courses)",
              steps: [
                "Calculus (A, 4cr): 4.0 × 4 = 16.0",
                "Chemistry (B+, 4cr): 3.3 × 4 = 13.2",
                "English (A-, 3cr): 3.7 × 3 = 11.1",
                "Lab (P, 1cr): excluded from GPA",
                "Total: 40.3 pts ÷ 11 graded cr",
              ],
              result: "Semester GPA = 3.66",
            },
            {
              title: "Cumulative GPA",
              steps: [
                "Prior: 3.45 GPA × 48 credits = 165.6 pts",
                "This semester: 40.3 pts, 11 credits",
                "Combined: 205.9 pts ÷ 59 credits",
              ],
              result: "Cumulative GPA = 3.49",
            },
          ],
        },
      },

      faqs: [
        { question: "How is GPA calculated?", answer: "Multiply each course's grade points (A=4.0, B=3.0, etc.) by its credit hours to get quality points. Sum all quality points and divide by total graded credits. Formula: GPA = Σ(Grade Points × Credits) ÷ Σ(Credits)." },
        { question: "Is A+ worth 4.0 or 4.3?", answer: "It depends on your school. Many US colleges assign A+ = 4.3, while others cap at 4.0. This calculator uses 4.3 (the most common scale). Check your institution's grading policy." },
        { question: "Do Pass/No Pass courses affect my GPA?", answer: "No. P and NP grades earn or deny credit but carry no grade points, so they are excluded from GPA calculations. This is standard at most US colleges." },
        { question: "How do I calculate cumulative GPA?", answer: "Toggle 'Include prior semesters' to Yes. Enter your previous GPA and total credits. The calculator combines prior quality points with this semester's to produce your cumulative GPA." },
        { question: "What is a good college GPA?", answer: "3.0 (B average) is generally considered good. 3.5+ is very good and often qualifies for Dean's List. 3.7+ is excellent for graduate school applications." },
        { question: "Can one bad semester ruin my GPA?", answer: "The more credits you've completed, the harder it is to move your GPA significantly. A bad semester hurts more early in college. Use the cumulative GPA feature to model the impact." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Calculate", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
  },

  inputs: [
    // === COURSES 1-3 (always visible) ===
    { id: "course1Name", type: "text", defaultValue: "", placeholder: "e.g. Calculus II" },
    { id: "grade1", type: "select", defaultValue: "", options: GRADE_OPTS },
    { id: "credits1", type: "number", defaultValue: 3, min: 0, max: 12, step: 1 },

    { id: "course2Name", type: "text", defaultValue: "", placeholder: "e.g. English Lit" },
    { id: "grade2", type: "select", defaultValue: "", options: GRADE_OPTS },
    { id: "credits2", type: "number", defaultValue: 3, min: 0, max: 12, step: 1 },

    { id: "course3Name", type: "text", defaultValue: "", placeholder: "e.g. Chemistry" },
    { id: "grade3", type: "select", defaultValue: "", options: GRADE_OPTS },
    { id: "credits3", type: "number", defaultValue: 3, min: 0, max: 12, step: 1 },

    // === TOGGLE ===
    { id: "showMoreCourses", type: "radio", defaultValue: "no", options: [{ value: "no" }, { value: "yes" }] },

    // === COURSES 4-8 (conditional) ===
    { id: "course4Name", type: "text", defaultValue: "", placeholder: "e.g. Physics I", showWhen: { field: "showMoreCourses", value: "yes" } },
    { id: "grade4", type: "select", defaultValue: "", options: GRADE_OPTS, showWhen: { field: "showMoreCourses", value: "yes" } },
    { id: "credits4", type: "number", defaultValue: 3, min: 0, max: 12, step: 1, showWhen: { field: "showMoreCourses", value: "yes" } },

    { id: "course5Name", type: "text", defaultValue: "", placeholder: "e.g. History", showWhen: { field: "showMoreCourses", value: "yes" } },
    { id: "grade5", type: "select", defaultValue: "", options: GRADE_OPTS, showWhen: { field: "showMoreCourses", value: "yes" } },
    { id: "credits5", type: "number", defaultValue: 0, min: 0, max: 12, step: 1, showWhen: { field: "showMoreCourses", value: "yes" } },

    { id: "course6Name", type: "text", defaultValue: "", placeholder: "e.g. Art History", showWhen: { field: "showMoreCourses", value: "yes" } },
    { id: "grade6", type: "select", defaultValue: "", options: GRADE_OPTS, showWhen: { field: "showMoreCourses", value: "yes" } },
    { id: "credits6", type: "number", defaultValue: 0, min: 0, max: 12, step: 1, showWhen: { field: "showMoreCourses", value: "yes" } },

    { id: "course7Name", type: "text", defaultValue: "", placeholder: "e.g. Elective", showWhen: { field: "showMoreCourses", value: "yes" } },
    { id: "grade7", type: "select", defaultValue: "", options: GRADE_OPTS, showWhen: { field: "showMoreCourses", value: "yes" } },
    { id: "credits7", type: "number", defaultValue: 0, min: 0, max: 12, step: 1, showWhen: { field: "showMoreCourses", value: "yes" } },

    { id: "course8Name", type: "text", defaultValue: "", placeholder: "e.g. Lab", showWhen: { field: "showMoreCourses", value: "yes" } },
    { id: "grade8", type: "select", defaultValue: "", options: GRADE_OPTS, showWhen: { field: "showMoreCourses", value: "yes" } },
    { id: "credits8", type: "number", defaultValue: 0, min: 0, max: 12, step: 1, showWhen: { field: "showMoreCourses", value: "yes" } },

    // === CUMULATIVE GPA ===
    { id: "includePriorGpa", type: "radio", defaultValue: "no", options: [{ value: "no" }, { value: "yes" }] },
    { id: "priorGpa", type: "number", defaultValue: null, placeholder: "3.45", min: 0, max: 4.3, step: 0.01, showWhen: { field: "includePriorGpa", value: "yes" } },
    { id: "priorCredits", type: "number", defaultValue: null, placeholder: "48", min: 0, max: 300, step: 1, showWhen: { field: "includePriorGpa", value: "yes" } },
  ],

  inputGroups: [],

  results: [
    { id: "semesterGpa", type: "primary", format: "number" },
    { id: "cumulativeGpa", type: "secondary", format: "number" },
    { id: "totalCredits", type: "secondary", format: "number" },
    { id: "totalPoints", type: "secondary", format: "number" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "🎓", itemCount: 4 },
    { id: "details", type: "list", icon: "📊", itemCount: 4 },
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
    { authors: "College Board", year: "2024", title: "How to Convert Your GPA to a 4.0 Scale", source: "College Board", url: "https://pages.collegeboard.org/how-to-convert-gpa-4.0-scale" },
    { authors: "National Center for Education Statistics", year: "2024", title: "Undergraduate Retention and Graduation Rates", source: "NCES", url: "https://nces.ed.gov/" },
  ],

  hero: { icon: "🎓" },
  sidebar: {},
  features: {},
  relatedCalculators: ["grade-calculator", "percentage-calculator"],
  ads: {},
};

// ─── CALCULATE ──────────────────────────────────────────────────────
export function calculateGpaCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const f = (t?.formats as Record<string, string>) || {};

  const maxCourses = (values.showMoreCourses === "yes") ? 8 : 3;
  const courses: { name: string; grade: string; gradeVal: number; credits: number; points: number; isPassFail: boolean }[] = [];

  for (let i = 1; i <= maxCourses; i++) {
    const grade = (values[`grade${i}`] as string) || "";
    const credits = (values[`credits${i}`] as number) || 0;
    const name = (values[`course${i}Name`] as string) || `Course ${i}`;
    if (!grade || credits <= 0) continue;
    const gradeVal = GRADE_MAP[grade];
    const isPassFail = gradeVal === null;
    courses.push({ name, grade, gradeVal: isPassFail ? 0 : gradeVal, credits, points: isPassFail ? 0 : gradeVal * credits, isPassFail });
  }

  if (courses.length === 0) return { values: {}, formatted: {}, summary: "", isValid: false };

  // Semester GPA (exclude P/NP)
  const graded = courses.filter(c => !c.isPassFail);
  const semCredits = graded.reduce((s, c) => s + c.credits, 0);
  const semPoints = graded.reduce((s, c) => s + c.points, 0);
  const semGpa = semCredits > 0 ? semPoints / semCredits : 0;
  const allCredits = courses.reduce((s, c) => s + c.credits, 0);

  // Cumulative
  let cumGpa = semGpa;
  const includePrior = values.includePriorGpa === "yes";
  if (includePrior) {
    const pGpa = (values.priorGpa as number) || 0;
    const pCr = (values.priorCredits as number) || 0;
    if (pCr > 0) {
      cumGpa = (semPoints + pGpa * pCr) / (semCredits + pCr);
    }
  }

  // Best / worst
  let highestGrade = "—";
  let lowestGrade = "—";
  if (graded.length > 0) {
    const best = graded.reduce((m, c) => c.gradeVal > m.gradeVal ? c : m, graded[0]);
    const worst = graded.reduce((m, c) => c.gradeVal < m.gradeVal ? c : m, graded[0]);
    highestGrade = `${best.grade} (${best.gradeVal.toFixed(1)}) — ${best.name}`;
    lowestGrade = `${worst.grade} (${worst.gradeVal.toFixed(1)}) — ${worst.name}`;
  }

  const ref = includePrior ? cumGpa : semGpa;
  const deansListNote = ref >= 3.5 ? "✅ Eligible" : `Need ${(3.5 - ref).toFixed(2)} more`;
  let standingNote = "⚠️ Academic probation risk";
  if (ref >= 3.9) standingNote = "🏆 Summa Cum Laude range";
  else if (ref >= 3.7) standingNote = "🥇 Magna Cum Laude range";
  else if (ref >= 3.5) standingNote = "🎖️ Cum Laude range";
  else if (ref >= 2.0) standingNote = "✅ Good standing";

  return {
    values: { semesterGpa: semGpa, cumulativeGpa: cumGpa, totalCredits: allCredits, totalPoints: semPoints },
    formatted: {
      semesterGpa: semGpa.toFixed(2),
      cumulativeGpa: includePrior ? cumGpa.toFixed(2) : "—",
      totalCredits: String(allCredits),
      totalPoints: semPoints.toFixed(1),
      semesterCredits: String(semCredits),
      courseCount: String(graded.length) + (courses.length > graded.length ? ` (+${courses.length - graded.length} P/NP)` : ""),
      deansListNote,
      standingNote,
      highestGrade,
      lowestGrade,
    },
    summary: f.summary?.replace("{semesterGpa}", semGpa.toFixed(2)) || `Your semester GPA is ${semGpa.toFixed(2)} on a 4.0 scale`,
    isValid: true,
  };
}

export default gpaCalculatorConfig;
