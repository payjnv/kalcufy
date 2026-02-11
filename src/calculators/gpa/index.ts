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
    es: {
      "name": "Calculadora de GPA",
      "slug": "calculadora-promedio-puntos-calificacion",
      "subtitle": "Calcula tu GPA semestral y acumulativo en la escala de 4.0. Ingresa nombres de cursos, calificaciones con letras y horas de crédito. Compatible con A+ (4.3), Aprobado/No Aprobado y GPA previo.",
      "breadcrumb": "GPA",
      "seo": {
        "title": "Calculadora de GPA - GPA Semestral y Acumulativo (4.0)",
        "description": "Calcula tu GPA universitario en la escala de 4.0 con nombres de cursos, horas de crédito y calificaciones con letras. Compatible con GPA acumulativo, Aprobado/No Aprobado y A+ = 4.3.",
        "shortDescription": "Calcula GPA semestral y acumulativo fácilmente.",
        "keywords": [
          "calculadora gpa",
          "calculadora gpa universidad",
          "calculadora gpa acumulativo",
          "calcular gpa",
          "promedio de puntos de calificación",
          "gpa semestral",
          "gpa escala 4.0",
          "calculadora gpa online gratis"
        ]
      },
      "inputs": {
        "course1Name": {
          "label": "Curso 1",
          "helpText": "Nombre del curso (opcional)"
        },
        "grade1": {
          "label": "Calificación",
          "helpText": "Calificación con letra",
          "options": {
            "": "—",
            "A+": "A+ (4.3)",
            "A": "A (4.0)",
            "A-": "A- (3.7)",
            "B+": "B+ (3.3)",
            "B": "B (3.0)",
            "B-": "B- (2.7)",
            "C+": "C+ (2.3)",
            "C": "C (2.0)",
            "C-": "C- (1.7)",
            "D+": "D+ (1.3)",
            "D": "D (1.0)",
            "D-": "D- (0.7)",
            "F": "F (0.0)",
            "P": "Aprobado",
            "NP": "No Aprobado"
          }
        },
        "credits1": {
          "label": "Créditos",
          "helpText": "Horas de crédito"
        },
        "course2Name": {
          "label": "Curso 2",
          "helpText": "Nombre del curso (opcional)"
        },
        "grade2": {
          "label": "Calificación",
          "helpText": "Calificación con letra",
          "options": {
            "": "—",
            "A+": "A+ (4.3)",
            "A": "A (4.0)",
            "A-": "A- (3.7)",
            "B+": "B+ (3.3)",
            "B": "B (3.0)",
            "B-": "B- (2.7)",
            "C+": "C+ (2.3)",
            "C": "C (2.0)",
            "C-": "C- (1.7)",
            "D+": "D+ (1.3)",
            "D": "D (1.0)",
            "D-": "D- (0.7)",
            "F": "F (0.0)",
            "P": "Aprobado",
            "NP": "No Aprobado"
          }
        },
        "credits2": {
          "label": "Créditos",
          "helpText": "Horas de crédito"
        },
        "course3Name": {
          "label": "Curso 3",
          "helpText": "Nombre del curso (opcional)"
        },
        "grade3": {
          "label": "Calificación",
          "helpText": "Calificación con letra",
          "options": {
            "": "—",
            "A+": "A+ (4.3)",
            "A": "A (4.0)",
            "A-": "A- (3.7)",
            "B+": "B+ (3.3)",
            "B": "B (3.0)",
            "B-": "B- (2.7)",
            "C+": "C+ (2.3)",
            "C": "C (2.0)",
            "C-": "C- (1.7)",
            "D+": "D+ (1.3)",
            "D": "D (1.0)",
            "D-": "D- (0.7)",
            "F": "F (0.0)",
            "P": "Aprobado",
            "NP": "No Aprobado"
          }
        },
        "credits3": {
          "label": "Créditos",
          "helpText": "Horas de crédito"
        },
        "showMoreCourses": {
          "label": "¿Más cursos?",
          "helpText": "Mostrar campos adicionales de cursos",
          "options": {
            "no": "3 cursos",
            "yes": "Hasta 8 cursos"
          }
        },
        "course4Name": {
          "label": "Curso 4",
          "helpText": "Nombre del curso (opcional)"
        },
        "grade4": {
          "label": "Calificación",
          "helpText": "Calificación con letra",
          "options": {
            "": "—",
            "A+": "A+ (4.3)",
            "A": "A (4.0)",
            "A-": "A- (3.7)",
            "B+": "B+ (3.3)",
            "B": "B (3.0)",
            "B-": "B- (2.7)",
            "C+": "C+ (2.3)",
            "C": "C (2.0)",
            "C-": "C- (1.7)",
            "D+": "D+ (1.3)",
            "D": "D (1.0)",
            "D-": "D- (0.7)",
            "F": "F (0.0)",
            "P": "Aprobado",
            "NP": "No Aprobado"
          }
        },
        "credits4": {
          "label": "Créditos",
          "helpText": "Horas de crédito"
        },
        "course5Name": {
          "label": "Curso 5",
          "helpText": "Nombre del curso (opcional)"
        },
        "grade5": {
          "label": "Calificación",
          "helpText": "Calificación con letra",
          "options": {
            "": "—",
            "A+": "A+ (4.3)",
            "A": "A (4.0)",
            "A-": "A- (3.7)",
            "B+": "B+ (3.3)",
            "B": "B (3.0)",
            "B-": "B- (2.7)",
            "C+": "C+ (2.3)",
            "C": "C (2.0)",
            "C-": "C- (1.7)",
            "D+": "D+ (1.3)",
            "D": "D (1.0)",
            "D-": "D- (0.7)",
            "F": "F (0.0)",
            "P": "Aprobado",
            "NP": "No Aprobado"
          }
        },
        "credits5": {
          "label": "Créditos",
          "helpText": "Horas de crédito"
        },
        "course6Name": {
          "label": "Curso 6",
          "helpText": "Nombre del curso (opcional)"
        },
        "grade6": {
          "label": "Calificación",
          "helpText": "Calificación con letra",
          "options": {
            "": "—",
            "A+": "A+ (4.3)",
            "A": "A (4.0)",
            "A-": "A- (3.7)",
            "B+": "B+ (3.3)",
            "B": "B (3.0)",
            "B-": "B- (2.7)",
            "C+": "C+ (2.3)",
            "C": "C (2.0)",
            "C-": "C- (1.7)",
            "D+": "D+ (1.3)",
            "D": "D (1.0)",
            "D-": "D- (0.7)",
            "F": "F (0.0)",
            "P": "Aprobado",
            "NP": "No Aprobado"
          }
        },
        "credits6": {
          "label": "Créditos",
          "helpText": "Horas de crédito"
        },
        "course7Name": {
          "label": "Curso 7",
          "helpText": "Nombre del curso (opcional)"
        },
        "grade7": {
          "label": "Calificación",
          "helpText": "Calificación con letra",
          "options": {
            "": "—",
            "A+": "A+ (4.3)",
            "A": "A (4.0)",
            "A-": "A- (3.7)",
            "B+": "B+ (3.3)",
            "B": "B (3.0)",
            "B-": "B- (2.7)",
            "C+": "C+ (2.3)",
            "C": "C (2.0)",
            "C-": "C- (1.7)",
            "D+": "D+ (1.3)",
            "D": "D (1.0)",
            "D-": "D- (0.7)",
            "F": "F (0.0)",
            "P": "Aprobado",
            "NP": "No Aprobado"
          }
        },
        "credits7": {
          "label": "Créditos",
          "helpText": "Horas de crédito"
        },
        "course8Name": {
          "label": "Curso 8",
          "helpText": "Nombre del curso (opcional)"
        },
        "grade8": {
          "label": "Calificación",
          "helpText": "Calificación con letra",
          "options": {
            "": "—",
            "A+": "A+ (4.3)",
            "A": "A (4.0)",
            "A-": "A- (3.7)",
            "B+": "B+ (3.3)",
            "B": "B (3.0)",
            "B-": "B- (2.7)",
            "C+": "C+ (2.3)",
            "C": "C (2.0)",
            "C-": "C- (1.7)",
            "D+": "D+ (1.3)",
            "D": "D (1.0)",
            "D-": "D- (0.7)",
            "F": "F (0.0)",
            "P": "Aprobado",
            "NP": "No Aprobado"
          }
        },
        "credits8": {
          "label": "Créditos",
          "helpText": "Horas de crédito"
        },
        "includePriorGpa": {
          "label": "¿Incluir semestres anteriores?",
          "helpText": "Agregar GPA previo para calcular acumulativo",
          "options": {
            "no": "No — solo semestre",
            "yes": "Sí — GPA acumulativo"
          }
        },
        "priorGpa": {
          "label": "GPA Anterior",
          "helpText": "Tu GPA de semestres anteriores"
        },
        "priorCredits": {
          "label": "Créditos Anteriores",
          "helpText": "Total de créditos de semestres anteriores"
        }
      },
      "results": {
        "semesterGpa": {
          "label": "GPA Semestral"
        },
        "cumulativeGpa": {
          "label": "GPA Acumulativo"
        },
        "totalCredits": {
          "label": "Total de Créditos"
        },
        "totalPoints": {
          "label": "Puntos de Calidad"
        }
      },
      "presets": {
        "honorStudent": {
          "label": "Estudiante de Honor (5 cursos)",
          "description": "Principalmente A — GPA 3.86"
        },
        "cumulativeGpa": {
          "label": "GPA Acumulativo",
          "description": "3 cursos + GPA previo 3.45"
        },
        "mixedSemester": {
          "label": "Calificaciones Mixtas + Aprobado",
          "description": "A hasta C+ con un curso Aprobado"
        }
      },
      "values": {
        "gpa": "GPA",
        "credits": "créditos",
        "points": "puntos",
        "of": "de",
        "on": "en",
        "scale": "escala"
      },
      "formats": {
        "summary": "Tu GPA semestral es {semesterGpa} en una escala de 4.0"
      },
      "infoCards": {
        "metrics": {
          "title": "Resultados del GPA",
          "items": [
            {
              "label": "GPA Semestral",
              "valueKey": "semesterGpa"
            },
            {
              "label": "GPA Acumulativo",
              "valueKey": "cumulativeGpa"
            },
            {
              "label": "Créditos Semestrales",
              "valueKey": "semesterCredits"
            },
            {
              "label": "Cursos Contados",
              "valueKey": "courseCount"
            }
          ]
        },
        "details": {
          "title": "Posición Académica",
          "items": [
            {
              "label": "Lista del Decano (≥3.5)",
              "valueKey": "deansListNote"
            },
            {
              "label": "Posición Académica",
              "valueKey": "standingNote"
            },
            {
              "label": "Calificación Más Alta",
              "valueKey": "highestGrade"
            },
            {
              "label": "Calificación Más Baja",
              "valueKey": "lowestGrade"
            }
          ]
        },
        "tips": {
          "title": "Consejos para el GPA",
          "items": [
            "Los cursos con más créditos impactan más tu GPA — prioriza hacer bien las clases de 4 créditos",
            "Una A en una clase de 4 créditos suma 16 puntos de calidad vs. 12 en una clase de 3 créditos",
            "Los cursos A/NA no afectan el GPA — usa Aprobado/No Aprobado estratégicamente para electivas",
            "Repetir un curso reprobado a menudo reemplaza la F — revisa la política de reemplazo de calificaciones de tu escuela"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es el GPA?",
          "content": "GPA (Promedio de Puntos de Calificación) es una medida estandarizada del rendimiento académico utilizada en universidades de EE.UU. La escala más común va de 0.0 a 4.0, aunque algunas escuelas se extienden a 4.3 asignando a A+ un valor más alto. Tu GPA se calcula multiplicando los puntos de calificación de cada curso por sus horas de crédito para obtener puntos de calidad, sumando todos los puntos de calidad y dividiendo entre el total de horas de crédito. Por ejemplo, una A (4.0) en un curso de 4 créditos produce 16 puntos de calidad, mientras que una B (3.0) en un curso de 3 créditos produce 9. Sumados: 25 puntos de calidad divididos entre 7 créditos iguala un GPA de 3.57. El GPA importa para la elegibilidad a la Lista del Decano, becas, admisiones a posgrado y muchas solicitudes de trabajo."
        },
        "howItWorks": {
          "title": "Cómo Funciona Esta Calculadora",
          "content": "Ingresa una calificación con letra y horas de crédito para cada curso. La calculadora multiplica los puntos de calificación por créditos para encontrar puntos de calidad por curso, luego divide los puntos de calidad totales entre los créditos calificados totales. Los cursos Aprobado/No Aprobado (A/NA) obtienen crédito pero se excluyen del cálculo del GPA, exactamente como lo manejan la mayoría de las universidades. Para calcular el GPA acumulativo, activa 'Incluir semestres anteriores' e ingresa tu GPA existente y total de créditos. La calculadora combina tus puntos de calidad anteriores (GPA Anterior × Créditos Anteriores) con los puntos de calidad de este semestre para producir tu GPA acumulativo actualizado. Esta es la misma fórmula utilizada por los registradores universitarios."
        },
        "considerations": {
          "title": "Consideraciones Importantes",
          "items": [
            {
              "text": "A+ = 4.3 en esta calculadora. Algunas escuelas limitan A+ a 4.0 — verifica la escala de tu institución",
              "type": "warning"
            },
            {
              "text": "Los cursos A/NA y R (Retiro) se excluyen de los cálculos del GPA",
              "type": "info"
            },
            {
              "text": "Honores cum laude: típicamente 3.5+ (cum laude), 3.7+ (magna), 3.9+ (summa)",
              "type": "info"
            },
            {
              "text": "La probatoria académica generalmente comienza debajo de 2.0 GPA — los umbrales exactos varían por escuela",
              "type": "warning"
            },
            {
              "text": "Los créditos de transferencia pueden o no incluirse en tu GPA — la mayoría de las escuelas los excluyen",
              "type": "info"
            },
            {
              "text": "El GPA ponderado (escala 5.0) se usa en preparatorias para AP/Honores — esta calculadora usa la escala universitaria 4.0",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Referencia de Escala de GPA",
          "items": [
            {
              "text": "A+ (4.3): Excepcional — supera las expectativas más altas en el curso",
              "type": "info"
            },
            {
              "text": "A / A- (4.0 / 3.7): Excelente — demuestra dominio completo del material",
              "type": "info"
            },
            {
              "text": "B+ / B / B- (3.3 / 3.0 / 2.7): Bueno — comprensión sólida con espacio para mejorar",
              "type": "info"
            },
            {
              "text": "C+ / C / C- (2.3 / 2.0 / 1.7): Promedio — cumple requisitos básicos, mínimo para muchas carreras",
              "type": "info"
            },
            {
              "text": "D+ / D / D- (1.3 / 1.0 / 0.7): Bajo promedio — mínimo aprobatorio en la mayoría de las instituciones",
              "type": "info"
            },
            {
              "text": "F (0.0): Reprobatorio — sin crédito obtenido, baja significativamente el GPA",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo de GPA",
          "description": "Cálculos paso a paso de puntos de calificación",
          "examples": [
            {
              "title": "GPA Semestral (4 cursos)",
              "steps": [
                "Cálculo (A, 4cr): 4.0 × 4 = 16.0",
                "Química (B+, 4cr): 3.3 × 4 = 13.2",
                "Inglés (A-, 3cr): 3.7 × 3 = 11.1",
                "Laboratorio (A, 1cr): excluido del GPA",
                "Total: 40.3 pts ÷ 11 cr calificados"
              ],
              "result": "GPA Semestral = 3.66"
            },
            {
              "title": "GPA Acumulativo",
              "steps": [
                "Anterior: 3.45 GPA × 48 créditos = 165.6 pts",
                "Este semestre: 40.3 pts, 11 créditos",
                "Combinado: 205.9 pts ÷ 59 créditos"
              ],
              "result": "GPA Acumulativo = 3.49"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cómo se calcula el GPA?",
          "answer": "Multiplica los puntos de calificación de cada curso (A=4.0, B=3.0, etc.) por sus horas de crédito para obtener puntos de calidad. Suma todos los puntos de calidad y divide entre los créditos calificados totales. Fórmula: GPA = Σ(Puntos de Calificación × Créditos) ÷ Σ(Créditos)."
        },
        {
          "question": "¿Vale A+ 4.0 o 4.3?",
          "answer": "Depende de tu escuela. Muchas universidades de EE.UU. asignan A+ = 4.3, mientras otras limitan a 4.0. Esta calculadora usa 4.3 (la escala más común). Verifica la política de calificación de tu institución."
        },
        {
          "question": "¿Los cursos Aprobado/No Aprobado afectan mi GPA?",
          "answer": "No. Las calificaciones A y NA otorgan o niegan crédito pero no llevan puntos de calificación, por lo que se excluyen de los cálculos del GPA. Esto es estándar en la mayoría de las universidades de EE.UU."
        },
        {
          "question": "¿Cómo calculo el GPA acumulativo?",
          "answer": "Cambia 'Incluir semestres anteriores' a Sí. Ingresa tu GPA anterior y créditos totales. La calculadora combina los puntos de calidad anteriores con los de este semestre para producir tu GPA acumulativo."
        },
        {
          "question": "¿Qué es un buen GPA universitario?",
          "answer": "3.0 (promedio B) generalmente se considera bueno. 3.5+ es muy bueno y a menudo califica para la Lista del Decano. 3.7+ es excelente para solicitudes de posgrado."
        },
        {
          "question": "¿Puede un mal semestre arruinar mi GPA?",
          "answer": "Mientras más créditos hayas completado, más difícil es mover tu GPA significativamente. Un mal semestre duele más al principio de la universidad. Usa la función de GPA acumulativo para modelar el impacto."
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
      "name": "Calculadora de GPA",
      "slug": "calculadora-media-pontos-gpa",
      "subtitle": "Calcule seu GPA semestral e cumulativo na escala 4.0. Insira nomes dos cursos, notas em letras e horas de crédito. Suporta A+ (4.3), Aprovado/Reprovado e GPA anterior.",
      "breadcrumb": "GPA",
      "seo": {
        "title": "Calculadora de GPA - GPA Semestral e Cumulativo (4.0)",
        "description": "Calcule seu GPA universitário na escala 4.0 com nomes de cursos, horas de crédito e notas em letras. Suporta GPA cumulativo, Aprovado/Reprovado e A+ = 4.3.",
        "shortDescription": "Calcule GPA semestral e cumulativo facilmente.",
        "keywords": [
          "calculadora gpa",
          "calculadora gpa faculdade",
          "calculadora gpa cumulativo",
          "calcular gpa",
          "média de pontos",
          "gpa semestral",
          "gpa escala 4.0",
          "calculadora gpa online gratis"
        ]
      },
      "inputs": {
        "course1Name": {
          "label": "Curso 1",
          "helpText": "Nome do curso (opcional)"
        },
        "grade1": {
          "label": "Nota",
          "helpText": "Nota em letra",
          "options": {
            "": "—",
            "A+": "A+ (4.3)",
            "A": "A (4.0)",
            "A-": "A- (3.7)",
            "B+": "B+ (3.3)",
            "B": "B (3.0)",
            "B-": "B- (2.7)",
            "C+": "C+ (2.3)",
            "C": "C (2.0)",
            "C-": "C- (1.7)",
            "D+": "D+ (1.3)",
            "D": "D (1.0)",
            "D-": "D- (0.7)",
            "F": "F (0.0)",
            "P": "Aprovado",
            "NP": "Reprovado"
          }
        },
        "credits1": {
          "label": "Créditos",
          "helpText": "Horas de crédito"
        },
        "course2Name": {
          "label": "Curso 2",
          "helpText": "Nome do curso (opcional)"
        },
        "grade2": {
          "label": "Nota",
          "helpText": "Nota em letra",
          "options": {
            "": "—",
            "A+": "A+ (4.3)",
            "A": "A (4.0)",
            "A-": "A- (3.7)",
            "B+": "B+ (3.3)",
            "B": "B (3.0)",
            "B-": "B- (2.7)",
            "C+": "C+ (2.3)",
            "C": "C (2.0)",
            "C-": "C- (1.7)",
            "D+": "D+ (1.3)",
            "D": "D (1.0)",
            "D-": "D- (0.7)",
            "F": "F (0.0)",
            "P": "Aprovado",
            "NP": "Reprovado"
          }
        },
        "credits2": {
          "label": "Créditos",
          "helpText": "Horas de crédito"
        },
        "course3Name": {
          "label": "Curso 3",
          "helpText": "Nome do curso (opcional)"
        },
        "grade3": {
          "label": "Nota",
          "helpText": "Nota em letra",
          "options": {
            "": "—",
            "A+": "A+ (4.3)",
            "A": "A (4.0)",
            "A-": "A- (3.7)",
            "B+": "B+ (3.3)",
            "B": "B (3.0)",
            "B-": "B- (2.7)",
            "C+": "C+ (2.3)",
            "C": "C (2.0)",
            "C-": "C- (1.7)",
            "D+": "D+ (1.3)",
            "D": "D (1.0)",
            "D-": "D- (0.7)",
            "F": "F (0.0)",
            "P": "Aprovado",
            "NP": "Reprovado"
          }
        },
        "credits3": {
          "label": "Créditos",
          "helpText": "Horas de crédito"
        },
        "showMoreCourses": {
          "label": "Mais cursos?",
          "helpText": "Mostrar campos de cursos adicionais",
          "options": {
            "no": "3 cursos",
            "yes": "Até 8 cursos"
          }
        },
        "course4Name": {
          "label": "Curso 4",
          "helpText": "Nome do curso (opcional)"
        },
        "grade4": {
          "label": "Nota",
          "helpText": "Nota em letra",
          "options": {
            "": "—",
            "A+": "A+ (4.3)",
            "A": "A (4.0)",
            "A-": "A- (3.7)",
            "B+": "B+ (3.3)",
            "B": "B (3.0)",
            "B-": "B- (2.7)",
            "C+": "C+ (2.3)",
            "C": "C (2.0)",
            "C-": "C- (1.7)",
            "D+": "D+ (1.3)",
            "D": "D (1.0)",
            "D-": "D- (0.7)",
            "F": "F (0.0)",
            "P": "Aprovado",
            "NP": "Reprovado"
          }
        },
        "credits4": {
          "label": "Créditos",
          "helpText": "Horas de crédito"
        },
        "course5Name": {
          "label": "Curso 5",
          "helpText": "Nome do curso (opcional)"
        },
        "grade5": {
          "label": "Nota",
          "helpText": "Nota em letra",
          "options": {
            "": "—",
            "A+": "A+ (4.3)",
            "A": "A (4.0)",
            "A-": "A- (3.7)",
            "B+": "B+ (3.3)",
            "B": "B (3.0)",
            "B-": "B- (2.7)",
            "C+": "C+ (2.3)",
            "C": "C (2.0)",
            "C-": "C- (1.7)",
            "D+": "D+ (1.3)",
            "D": "D (1.0)",
            "D-": "D- (0.7)",
            "F": "F (0.0)",
            "P": "Aprovado",
            "NP": "Reprovado"
          }
        },
        "credits5": {
          "label": "Créditos",
          "helpText": "Horas de crédito"
        },
        "course6Name": {
          "label": "Curso 6",
          "helpText": "Nome do curso (opcional)"
        },
        "grade6": {
          "label": "Nota",
          "helpText": "Nota em letra",
          "options": {
            "": "—",
            "A+": "A+ (4.3)",
            "A": "A (4.0)",
            "A-": "A- (3.7)",
            "B+": "B+ (3.3)",
            "B": "B (3.0)",
            "B-": "B- (2.7)",
            "C+": "C+ (2.3)",
            "C": "C (2.0)",
            "C-": "C- (1.7)",
            "D+": "D+ (1.3)",
            "D": "D (1.0)",
            "D-": "D- (0.7)",
            "F": "F (0.0)",
            "P": "Aprovado",
            "NP": "Reprovado"
          }
        },
        "credits6": {
          "label": "Créditos",
          "helpText": "Horas de crédito"
        },
        "course7Name": {
          "label": "Curso 7",
          "helpText": "Nome do curso (opcional)"
        },
        "grade7": {
          "label": "Nota",
          "helpText": "Nota em letra",
          "options": {
            "": "—",
            "A+": "A+ (4.3)",
            "A": "A (4.0)",
            "A-": "A- (3.7)",
            "B+": "B+ (3.3)",
            "B": "B (3.0)",
            "B-": "B- (2.7)",
            "C+": "C+ (2.3)",
            "C": "C (2.0)",
            "C-": "C- (1.7)",
            "D+": "D+ (1.3)",
            "D": "D (1.0)",
            "D-": "D- (0.7)",
            "F": "F (0.0)",
            "P": "Aprovado",
            "NP": "Reprovado"
          }
        },
        "credits7": {
          "label": "Créditos",
          "helpText": "Horas de crédito"
        },
        "course8Name": {
          "label": "Curso 8",
          "helpText": "Nome do curso (opcional)"
        },
        "grade8": {
          "label": "Nota",
          "helpText": "Nota em letra",
          "options": {
            "": "—",
            "A+": "A+ (4.3)",
            "A": "A (4.0)",
            "A-": "A- (3.7)",
            "B+": "B+ (3.3)",
            "B": "B (3.0)",
            "B-": "B- (2.7)",
            "C+": "C+ (2.3)",
            "C": "C (2.0)",
            "C-": "C- (1.7)",
            "D+": "D+ (1.3)",
            "D": "D (1.0)",
            "D-": "D- (0.7)",
            "F": "F (0.0)",
            "P": "Aprovado",
            "NP": "Reprovado"
          }
        },
        "credits8": {
          "label": "Créditos",
          "helpText": "Horas de crédito"
        },
        "includePriorGpa": {
          "label": "Incluir semestres anteriores?",
          "helpText": "Adicionar GPA anterior para calcular cumulativo",
          "options": {
            "no": "Não — apenas semestre",
            "yes": "Sim — GPA cumulativo"
          }
        },
        "priorGpa": {
          "label": "GPA Anterior",
          "helpText": "Seu GPA de semestres anteriores"
        },
        "priorCredits": {
          "label": "Créditos Anteriores",
          "helpText": "Total de créditos de semestres anteriores"
        }
      },
      "results": {
        "semesterGpa": {
          "label": "GPA do Semestre"
        },
        "cumulativeGpa": {
          "label": "GPA Cumulativo"
        },
        "totalCredits": {
          "label": "Total de Créditos"
        },
        "totalPoints": {
          "label": "Pontos de Qualidade"
        }
      },
      "presets": {
        "honorStudent": {
          "label": "Estudante de Honra (5 cursos)",
          "description": "Principalmente A's — GPA 3.86"
        },
        "cumulativeGpa": {
          "label": "GPA Cumulativo",
          "description": "3 cursos + GPA anterior de 3.45"
        },
        "mixedSemester": {
          "label": "Notas Mistas + Aprovado",
          "description": "A até C+ com um curso Aprovado"
        }
      },
      "values": {
        "gpa": "GPA",
        "credits": "créditos",
        "points": "pontos",
        "of": "de",
        "on": "na",
        "scale": "escala"
      },
      "formats": {
        "summary": "Seu GPA do semestre é {semesterGpa} na escala 4.0"
      },
      "infoCards": {
        "metrics": {
          "title": "Resultados do GPA",
          "items": [
            {
              "label": "GPA do Semestre",
              "valueKey": "semesterGpa"
            },
            {
              "label": "GPA Cumulativo",
              "valueKey": "cumulativeGpa"
            },
            {
              "label": "Créditos do Semestre",
              "valueKey": "semesterCredits"
            },
            {
              "label": "Cursos Contabilizados",
              "valueKey": "courseCount"
            }
          ]
        },
        "details": {
          "title": "Situação Acadêmica",
          "items": [
            {
              "label": "Lista do Reitor (≥3.5)",
              "valueKey": "deansListNote"
            },
            {
              "label": "Situação Acadêmica",
              "valueKey": "standingNote"
            },
            {
              "label": "Nota Mais Alta",
              "valueKey": "highestGrade"
            },
            {
              "label": "Nota Mais Baixa",
              "valueKey": "lowestGrade"
            }
          ]
        },
        "tips": {
          "title": "Dicas de GPA",
          "items": [
            "Cursos com muitos créditos impactam mais seu GPA — priorize se sair bem em disciplinas de 4 créditos",
            "Um A em uma disciplina de 4 créditos adiciona 16 pontos de qualidade vs. 12 em uma de 3 créditos",
            "Cursos A/R não afetam o GPA — use Aprovado/Reprovado estrategicamente para eletivas",
            "Repetir um curso reprovado geralmente substitui o F — verifique a política de substituição de notas da sua escola"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é GPA?",
          "content": "GPA (Grade Point Average ou Média de Pontos) é uma medida padronizada de desempenho acadêmico usada em faculdades e universidades dos EUA. A escala mais comum vai de 0.0 a 4.0, embora algumas escolas estendam até 4.3 atribuindo ao A+ um valor maior. Seu GPA é calculado multiplicando os pontos de nota de cada curso por suas horas de crédito para obter pontos de qualidade, somando todos os pontos de qualidade e dividindo pelo total de horas de crédito. Por exemplo, um A (4.0) em um curso de 4 créditos produz 16 pontos de qualidade, enquanto um B (3.0) em um curso de 3 créditos produz 9. Somados: 25 pontos de qualidade divididos por 7 créditos é igual a um GPA de 3.57. O GPA é importante para elegibilidade à Lista do Reitor, bolsas de estudo, admissões em pós-graduação e muitas candidaturas a emprego."
        },
        "howItWorks": {
          "title": "Como Esta Calculadora Funciona",
          "content": "Insira uma nota em letra e horas de crédito para cada curso. A calculadora multiplica os pontos de nota pelos créditos para encontrar os pontos de qualidade por curso, então divide os pontos de qualidade totais pelos créditos avaliados totais. Cursos Aprovado/Reprovado (A/R) ganham crédito mas são excluídos do cálculo do GPA, exatamente como a maioria das faculdades os trata. Para calcular o GPA cumulativo, ative 'Incluir semestres anteriores' e insira seu GPA existente e total de créditos. A calculadora combina seus pontos de qualidade anteriores (GPA Anterior × Créditos Anteriores) com os pontos de qualidade deste semestre para produzir seu GPA cumulativo atualizado. Esta é a mesma fórmula usada pelos registros acadêmicos das faculdades."
        },
        "considerations": {
          "title": "Considerações Importantes",
          "items": [
            {
              "text": "A+ = 4.3 nesta calculadora. Algumas escolas limitam A+ em 4.0 — verifique a escala da sua instituição",
              "type": "warning"
            },
            {
              "text": "Cursos A/R e W (Retirada) são excluídos dos cálculos de GPA",
              "type": "info"
            },
            {
              "text": "Honras cum laude: tipicamente 3.5+ (cum laude), 3.7+ (magna), 3.9+ (summa)",
              "type": "info"
            },
            {
              "text": "Liberdade acadêmica geralmente começa abaixo de GPA 2.0 — limites exatos variam por escola",
              "type": "warning"
            },
            {
              "text": "Créditos de transferência podem ou não ser incluídos no seu GPA — a maioria das escolas os exclui",
              "type": "info"
            },
            {
              "text": "GPA ponderado (escala 5.0) é usado no ensino médio para AP/Honras — esta calculadora usa a escala universitária 4.0",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Referência da Escala GPA",
          "items": [
            {
              "text": "A+ (4.3): Excepcional — excede as mais altas expectativas no curso",
              "type": "info"
            },
            {
              "text": "A / A- (4.0 / 3.7): Excelente — demonstra domínio completo do material",
              "type": "info"
            },
            {
              "text": "B+ / B / B- (3.3 / 3.0 / 2.7): Bom — compreensão sólida com espaço para melhorar",
              "type": "info"
            },
            {
              "text": "C+ / C / C- (2.3 / 2.0 / 1.7): Mediano — atende requisitos básicos, mínimo para muitas especializações",
              "type": "info"
            },
            {
              "text": "D+ / D / D- (1.3 / 1.0 / 0.7): Abaixo da média — aprovação mínima na maioria das instituições",
              "type": "info"
            },
            {
              "text": "F (0.0): Reprovado — nenhum crédito obtido, reduz significativamente o GPA",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo de GPA",
          "description": "Cálculos de pontos de nota passo a passo",
          "examples": [
            {
              "title": "GPA do Semestre (4 cursos)",
              "steps": [
                "Cálculo (A, 4cr): 4.0 × 4 = 16.0",
                "Química (B+, 4cr): 3.3 × 4 = 13.2",
                "Inglês (A-, 3cr): 3.7 × 3 = 11.1",
                "Laboratório (A, 1cr): excluído do GPA",
                "Total: 40.3 pts ÷ 11 cr avaliados"
              ],
              "result": "GPA do Semestre = 3.66"
            },
            {
              "title": "GPA Cumulativo",
              "steps": [
                "Anterior: 3.45 GPA × 48 créditos = 165.6 pts",
                "Este semestre: 40.3 pts, 11 créditos",
                "Combinado: 205.9 pts ÷ 59 créditos"
              ],
              "result": "GPA Cumulativo = 3.49"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Como o GPA é calculado?",
          "answer": "Multiplique os pontos de nota de cada curso (A=4.0, B=3.0, etc.) por suas horas de crédito para obter pontos de qualidade. Some todos os pontos de qualidade e divida pelos créditos avaliados totais. Fórmula: GPA = Σ(Pontos de Nota × Créditos) ÷ Σ(Créditos)."
        },
        {
          "question": "A+ vale 4.0 ou 4.3?",
          "answer": "Depende da sua escola. Muitas faculdades dos EUA atribuem A+ = 4.3, enquanto outras limitam em 4.0. Esta calculadora usa 4.3 (a escala mais comum). Verifique a política de notas da sua instituição."
        },
        {
          "question": "Cursos Aprovado/Reprovado afetam meu GPA?",
          "answer": "Não. Notas A e R concedem ou negam crédito mas não carregam pontos de nota, então são excluídas dos cálculos de GPA. Isso é padrão na maioria das faculdades dos EUA."
        },
        {
          "question": "Como calcular o GPA cumulativo?",
          "answer": "Ative 'Incluir semestres anteriores' para Sim. Insira seu GPA anterior e créditos totais. A calculadora combina pontos de qualidade anteriores com os deste semestre para produzir seu GPA cumulativo."
        },
        {
          "question": "O que é um bom GPA universitário?",
          "answer": "3.0 (média B) é geralmente considerado bom. 3.5+ é muito bom e frequentemente qualifica para a Lista do Reitor. 3.7+ é excelente para candidaturas à pós-graduação."
        },
        {
          "question": "Um semestre ruim pode arruinar meu GPA?",
          "answer": "Quanto mais créditos você completou, mais difícil é mover seu GPA significativamente. Um semestre ruim machuca mais no início da faculdade. Use o recurso de GPA cumulativo para modelar o impacto."
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
      "name": "Calculateur de MPC",
      "slug": "calculateur-moyenne-points-cumules",
      "subtitle": "Calculez votre MPC semestrielle et cumulative sur l'échelle 4.0. Entrez les noms des cours, les notes alphabétiques et les heures de crédit. Supporte A+ (4.3), Réussite/Échec et MPC antérieure.",
      "breadcrumb": "MPC",
      "seo": {
        "title": "Calculateur MPC - Moyenne Points Cumulés Semestrielle & Cumulative (4.0)",
        "description": "Calculez votre MPC universitaire sur l'échelle 4.0 avec noms de cours, heures de crédit et notes alphabétiques. Supporte MPC cumulative, Réussite/Échec et A+ = 4.3.",
        "shortDescription": "Calculez facilement votre MPC semestrielle et cumulative.",
        "keywords": [
          "calculateur mpc",
          "calculateur mpc université",
          "calculateur mpc cumulative",
          "calculer mpc",
          "moyenne points cumulés",
          "mpc semestrielle",
          "mpc échelle 4.0",
          "calculateur mpc en ligne gratuit"
        ]
      },
      "inputs": {
        "course1Name": {
          "label": "Cours 1",
          "helpText": "Nom du cours (optionnel)"
        },
        "grade1": {
          "label": "Note",
          "helpText": "Note alphabétique",
          "options": {
            "": "—",
            "A+": "A+ (4.3)",
            "A": "A (4.0)",
            "A-": "A- (3.7)",
            "B+": "B+ (3.3)",
            "B": "B (3.0)",
            "B-": "B- (2.7)",
            "C+": "C+ (2.3)",
            "C": "C (2.0)",
            "C-": "C- (1.7)",
            "D+": "D+ (1.3)",
            "D": "D (1.0)",
            "D-": "D- (0.7)",
            "F": "F (0.0)",
            "P": "Réussite",
            "NP": "Échec"
          }
        },
        "credits1": {
          "label": "Crédits",
          "helpText": "Heures de crédit"
        },
        "course2Name": {
          "label": "Cours 2",
          "helpText": "Nom du cours (optionnel)"
        },
        "grade2": {
          "label": "Note",
          "helpText": "Note alphabétique",
          "options": {
            "": "—",
            "A+": "A+ (4.3)",
            "A": "A (4.0)",
            "A-": "A- (3.7)",
            "B+": "B+ (3.3)",
            "B": "B (3.0)",
            "B-": "B- (2.7)",
            "C+": "C+ (2.3)",
            "C": "C (2.0)",
            "C-": "C- (1.7)",
            "D+": "D+ (1.3)",
            "D": "D (1.0)",
            "D-": "D- (0.7)",
            "F": "F (0.0)",
            "P": "Réussite",
            "NP": "Échec"
          }
        },
        "credits2": {
          "label": "Crédits",
          "helpText": "Heures de crédit"
        },
        "course3Name": {
          "label": "Cours 3",
          "helpText": "Nom du cours (optionnel)"
        },
        "grade3": {
          "label": "Note",
          "helpText": "Note alphabétique",
          "options": {
            "": "—",
            "A+": "A+ (4.3)",
            "A": "A (4.0)",
            "A-": "A- (3.7)",
            "B+": "B+ (3.3)",
            "B": "B (3.0)",
            "B-": "B- (2.7)",
            "C+": "C+ (2.3)",
            "C": "C (2.0)",
            "C-": "C- (1.7)",
            "D+": "D+ (1.3)",
            "D": "D (1.0)",
            "D-": "D- (0.7)",
            "F": "F (0.0)",
            "P": "Réussite",
            "NP": "Échec"
          }
        },
        "credits3": {
          "label": "Crédits",
          "helpText": "Heures de crédit"
        },
        "showMoreCourses": {
          "label": "Plus de cours ?",
          "helpText": "Afficher des champs de cours supplémentaires",
          "options": {
            "no": "3 cours",
            "yes": "Jusqu'à 8 cours"
          }
        },
        "course4Name": {
          "label": "Cours 4",
          "helpText": "Nom du cours (optionnel)"
        },
        "grade4": {
          "label": "Note",
          "helpText": "Note alphabétique",
          "options": {
            "": "—",
            "A+": "A+ (4.3)",
            "A": "A (4.0)",
            "A-": "A- (3.7)",
            "B+": "B+ (3.3)",
            "B": "B (3.0)",
            "B-": "B- (2.7)",
            "C+": "C+ (2.3)",
            "C": "C (2.0)",
            "C-": "C- (1.7)",
            "D+": "D+ (1.3)",
            "D": "D (1.0)",
            "D-": "D- (0.7)",
            "F": "F (0.0)",
            "P": "Réussite",
            "NP": "Échec"
          }
        },
        "credits4": {
          "label": "Crédits",
          "helpText": "Heures de crédit"
        },
        "course5Name": {
          "label": "Cours 5",
          "helpText": "Nom du cours (optionnel)"
        },
        "grade5": {
          "label": "Note",
          "helpText": "Note alphabétique",
          "options": {
            "": "—",
            "A+": "A+ (4.3)",
            "A": "A (4.0)",
            "A-": "A- (3.7)",
            "B+": "B+ (3.3)",
            "B": "B (3.0)",
            "B-": "B- (2.7)",
            "C+": "C+ (2.3)",
            "C": "C (2.0)",
            "C-": "C- (1.7)",
            "D+": "D+ (1.3)",
            "D": "D (1.0)",
            "D-": "D- (0.7)",
            "F": "F (0.0)",
            "P": "Réussite",
            "NP": "Échec"
          }
        },
        "credits5": {
          "label": "Crédits",
          "helpText": "Heures de crédit"
        },
        "course6Name": {
          "label": "Cours 6",
          "helpText": "Nom du cours (optionnel)"
        },
        "grade6": {
          "label": "Note",
          "helpText": "Note alphabétique",
          "options": {
            "": "—",
            "A+": "A+ (4.3)",
            "A": "A (4.0)",
            "A-": "A- (3.7)",
            "B+": "B+ (3.3)",
            "B": "B (3.0)",
            "B-": "B- (2.7)",
            "C+": "C+ (2.3)",
            "C": "C (2.0)",
            "C-": "C- (1.7)",
            "D+": "D+ (1.3)",
            "D": "D (1.0)",
            "D-": "D- (0.7)",
            "F": "F (0.0)",
            "P": "Réussite",
            "NP": "Échec"
          }
        },
        "credits6": {
          "label": "Crédits",
          "helpText": "Heures de crédit"
        },
        "course7Name": {
          "label": "Cours 7",
          "helpText": "Nom du cours (optionnel)"
        },
        "grade7": {
          "label": "Note",
          "helpText": "Note alphabétique",
          "options": {
            "": "—",
            "A+": "A+ (4.3)",
            "A": "A (4.0)",
            "A-": "A- (3.7)",
            "B+": "B+ (3.3)",
            "B": "B (3.0)",
            "B-": "B- (2.7)",
            "C+": "C+ (2.3)",
            "C": "C (2.0)",
            "C-": "C- (1.7)",
            "D+": "D+ (1.3)",
            "D": "D (1.0)",
            "D-": "D- (0.7)",
            "F": "F (0.0)",
            "P": "Réussite",
            "NP": "Échec"
          }
        },
        "credits7": {
          "label": "Crédits",
          "helpText": "Heures de crédit"
        },
        "course8Name": {
          "label": "Cours 8",
          "helpText": "Nom du cours (optionnel)"
        },
        "grade8": {
          "label": "Note",
          "helpText": "Note alphabétique",
          "options": {
            "": "—",
            "A+": "A+ (4.3)",
            "A": "A (4.0)",
            "A-": "A- (3.7)",
            "B+": "B+ (3.3)",
            "B": "B (3.0)",
            "B-": "B- (2.7)",
            "C+": "C+ (2.3)",
            "C": "C (2.0)",
            "C-": "C- (1.7)",
            "D+": "D+ (1.3)",
            "D": "D (1.0)",
            "D-": "D- (0.7)",
            "F": "F (0.0)",
            "P": "Réussite",
            "NP": "Échec"
          }
        },
        "credits8": {
          "label": "Crédits",
          "helpText": "Heures de crédit"
        },
        "includePriorGpa": {
          "label": "Inclure les semestres précédents ?",
          "helpText": "Ajouter la MPC précédente pour calculer la cumulative",
          "options": {
            "no": "Non — semestre seulement",
            "yes": "Oui — MPC cumulative"
          }
        },
        "priorGpa": {
          "label": "MPC Précédente",
          "helpText": "Votre MPC des semestres précédents"
        },
        "priorCredits": {
          "label": "Crédits Précédents",
          "helpText": "Total des crédits des semestres précédents"
        }
      },
      "results": {
        "semesterGpa": {
          "label": "MPC Semestrielle"
        },
        "cumulativeGpa": {
          "label": "MPC Cumulative"
        },
        "totalCredits": {
          "label": "Total Crédits"
        },
        "totalPoints": {
          "label": "Points de Qualité"
        }
      },
      "presets": {
        "honorStudent": {
          "label": "Étudiant d'honneur (5 cours)",
          "description": "Principalement des A — MPC 3.86"
        },
        "cumulativeGpa": {
          "label": "MPC Cumulative",
          "description": "3 cours + MPC précédente 3.45"
        },
        "mixedSemester": {
          "label": "Notes mixtes + Réussite",
          "description": "A à C+ avec un cours en réussite"
        }
      },
      "values": {
        "gpa": "MPC",
        "credits": "crédits",
        "points": "points",
        "of": "de",
        "on": "sur",
        "scale": "échelle"
      },
      "formats": {
        "summary": "Votre MPC semestrielle est {semesterGpa} sur une échelle de 4.0"
      },
      "infoCards": {
        "metrics": {
          "title": "Résultats MPC",
          "items": [
            {
              "label": "MPC Semestrielle",
              "valueKey": "semesterGpa"
            },
            {
              "label": "MPC Cumulative",
              "valueKey": "cumulativeGpa"
            },
            {
              "label": "Crédits Semestre",
              "valueKey": "semesterCredits"
            },
            {
              "label": "Cours Comptés",
              "valueKey": "courseCount"
            }
          ]
        },
        "details": {
          "title": "Situation Académique",
          "items": [
            {
              "label": "Liste du Doyen (≥3.5)",
              "valueKey": "deansListNote"
            },
            {
              "label": "Situation Académique",
              "valueKey": "standingNote"
            },
            {
              "label": "Note la Plus Haute",
              "valueKey": "highestGrade"
            },
            {
              "label": "Note la Plus Basse",
              "valueKey": "lowestGrade"
            }
          ]
        },
        "tips": {
          "title": "Conseils MPC",
          "items": [
            "Les cours à crédit élevé impactent le plus votre MPC — priorisez la réussite dans les cours à 4 crédits",
            "Un A dans un cours à 4 crédits ajoute 16 points de qualité vs 12 dans un cours à 3 crédits",
            "Les cours R/É n'affectent pas la MPC — utilisez Réussite/Échec stratégiquement pour les cours à option",
            "Reprendre un cours échoué remplace souvent le F — vérifiez la politique de remplacement de note de votre école"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que la MPC ?",
          "content": "La MPC (Moyenne de Points Cumulés) est une mesure standardisée de la performance académique utilisée dans les collèges et universités américains. L'échelle la plus courante va de 0.0 à 4.0, bien que certaines écoles étendent à 4.3 en attribuant une valeur plus élevée au A+. Votre MPC est calculée en multipliant les points de note de chaque cours par ses heures de crédit pour obtenir les points de qualité, en additionnant tous les points de qualité, et en divisant par le total d'heures de crédit. Par exemple, un A (4.0) dans un cours de 4 crédits produit 16 points de qualité, tandis qu'un B (3.0) dans un cours de 3 crédits produit 9. Additionnés ensemble : 25 points de qualité divisés par 7 crédits égalent une MPC de 3.57. La MPC compte pour l'éligibilité à la liste du doyen, les bourses, les admissions aux études supérieures et de nombreuses candidatures d'emploi."
        },
        "howItWorks": {
          "title": "Comment Fonctionne ce Calculateur",
          "content": "Entrez une note alphabétique et les heures de crédit pour chaque cours. Le calculateur multiplie les points de note par les crédits pour trouver les points de qualité par cours, puis divise les points de qualité totaux par les crédits notés totaux. Les cours Réussite/Échec (R/É) donnent des crédits mais sont exclus du calcul de la MPC, exactement comme la plupart des collèges les gèrent. Pour calculer la MPC cumulative, basculez 'Inclure les semestres précédents' et entrez votre MPC et total de crédits existants. Le calculateur combine vos points de qualité précédents (MPC Précédente × Crédits Précédents) avec les points de qualité de ce semestre pour produire votre MPC cumulative mise à jour. C'est la même formule utilisée par les registraires de collège."
        },
        "considerations": {
          "title": "Considérations Importantes",
          "items": [
            {
              "text": "A+ = 4.3 sur ce calculateur. Certaines écoles plafonnent A+ à 4.0 — vérifiez l'échelle de votre institution",
              "type": "warning"
            },
            {
              "text": "Les cours R/É et A (Abandon) sont exclus des calculs de MPC",
              "type": "info"
            },
            {
              "text": "Honneurs cum laude : typiquement 3.5+ (cum laude), 3.7+ (magna), 3.9+ (summa)",
              "type": "info"
            },
            {
              "text": "La probation académique commence généralement en dessous de 2.0 MPC — les seuils exacts varient par école",
              "type": "warning"
            },
            {
              "text": "Les crédits de transfert peuvent ou non être inclus dans votre MPC — la plupart des écoles les excluent",
              "type": "info"
            },
            {
              "text": "La MPC pondérée (échelle 5.0) est utilisée au lycée pour AP/Honours — ce calculateur utilise l'échelle universitaire 4.0",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Référence Échelle MPC",
          "items": [
            {
              "text": "A+ (4.3) : Exceptionnel — dépasse les attentes les plus élevées du cours",
              "type": "info"
            },
            {
              "text": "A / A- (4.0 / 3.7) : Excellent — démontre une maîtrise complète de la matière",
              "type": "info"
            },
            {
              "text": "B+ / B / B- (3.3 / 3.0 / 2.7) : Bon — compréhension solide avec place à l'amélioration",
              "type": "info"
            },
            {
              "text": "C+ / C / C- (2.3 / 2.0 / 1.7) : Moyen — répond aux exigences de base, minimum pour beaucoup de spécialisations",
              "type": "info"
            },
            {
              "text": "D+ / D / D- (1.3 / 1.0 / 0.7) : Sous la moyenne — minimum de passage dans la plupart des institutions",
              "type": "info"
            },
            {
              "text": "F (0.0) : Échec — aucun crédit gagné, diminue significativement la MPC",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul MPC",
          "description": "Calculs de points de note étape par étape",
          "examples": [
            {
              "title": "MPC Semestrielle (4 cours)",
              "steps": [
                "Calcul (A, 4cr) : 4.0 × 4 = 16.0",
                "Chimie (B+, 4cr) : 3.3 × 4 = 13.2",
                "Anglais (A-, 3cr) : 3.7 × 3 = 11.1",
                "Labo (R, 1cr) : exclu de la MPC",
                "Total : 40.3 pts ÷ 11 cr notés"
              ],
              "result": "MPC Semestrielle = 3.66"
            },
            {
              "title": "MPC Cumulative",
              "steps": [
                "Précédent : 3.45 MPC × 48 crédits = 165.6 pts",
                "Ce semestre : 40.3 pts, 11 crédits",
                "Combiné : 205.9 pts ÷ 59 crédits"
              ],
              "result": "MPC Cumulative = 3.49"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Comment la MPC est-elle calculée ?",
          "answer": "Multipliez les points de note de chaque cours (A=4.0, B=3.0, etc.) par ses heures de crédit pour obtenir les points de qualité. Additionnez tous les points de qualité et divisez par le total des crédits notés. Formule : MPC = Σ(Points de Note × Crédits) ÷ Σ(Crédits)."
        },
        {
          "question": "A+ vaut-il 4.0 ou 4.3 ?",
          "answer": "Cela dépend de votre école. Beaucoup de collèges américains attribuent A+ = 4.3, tandis que d'autres plafonnent à 4.0. Ce calculateur utilise 4.3 (l'échelle la plus courante). Vérifiez la politique de notation de votre institution."
        },
        {
          "question": "Les cours Réussite/Échec affectent-ils ma MPC ?",
          "answer": "Non. Les notes R et É donnent ou refusent des crédits mais ne portent aucun point de note, donc elles sont exclues des calculs de MPC. C'est standard dans la plupart des collèges américains."
        },
        {
          "question": "Comment calculer la MPC cumulative ?",
          "answer": "Basculez 'Inclure les semestres précédents' à Oui. Entrez votre MPC et total de crédits précédents. Le calculateur combine les points de qualité précédents avec ceux de ce semestre pour produire votre MPC cumulative."
        },
        {
          "question": "Qu'est-ce qu'une bonne MPC universitaire ?",
          "answer": "3.0 (moyenne B) est généralement considéré bon. 3.5+ est très bon et qualifie souvent pour la Liste du Doyen. 3.7+ est excellent pour les candidatures aux études supérieures."
        },
        {
          "question": "Un mauvais semestre peut-il ruiner ma MPC ?",
          "answer": "Plus vous avez complété de crédits, plus il est difficile de bouger votre MPC significativement. Un mauvais semestre fait plus mal tôt dans les études. Utilisez la fonction MPC cumulative pour modéliser l'impact."
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
      "name": "GPA Rechner",
      "slug": "notendurchschnitt-rechner",
      "subtitle": "Berechnen Sie Ihren Semester- und kumulativen GPA auf der 4,0-Skala. Geben Sie Kursnamen, Noten und Kreditpunkte ein. Unterstützt A+ (4,3), Bestanden/Nicht bestanden und vorherigen GPA.",
      "breadcrumb": "GPA",
      "seo": {
        "title": "GPA Rechner - Semester & Kumulativer GPA (4,0)",
        "description": "Berechnen Sie Ihren Hochschul-GPA auf der 4,0-Skala mit Kursnamen, Kreditpunkten und Noten. Unterstützt kumulativen GPA, Bestanden/Nicht bestanden und A+ = 4,3.",
        "shortDescription": "Berechnen Sie Semester- und kumulativen GPA einfach.",
        "keywords": [
          "gpa rechner",
          "hochschule gpa rechner",
          "kumulativer gpa rechner",
          "gpa berechnen",
          "notendurchschnitt",
          "semester gpa",
          "4,0 skala gpa",
          "gpa rechner online kostenlos"
        ]
      },
      "inputs": {
        "course1Name": {
          "label": "Kurs 1",
          "helpText": "Kursname (optional)"
        },
        "grade1": {
          "label": "Note",
          "helpText": "Buchstabennote",
          "options": {
            "": "—",
            "A+": "A+ (4,3)",
            "A": "A (4,0)",
            "A-": "A- (3,7)",
            "B+": "B+ (3,3)",
            "B": "B (3,0)",
            "B-": "B- (2,7)",
            "C+": "C+ (2,3)",
            "C": "C (2,0)",
            "C-": "C- (1,7)",
            "D+": "D+ (1,3)",
            "D": "D (1,0)",
            "D-": "D- (0,7)",
            "F": "F (0,0)",
            "P": "Bestanden",
            "NP": "Nicht bestanden"
          }
        },
        "credits1": {
          "label": "Credits",
          "helpText": "Kreditpunkte"
        },
        "course2Name": {
          "label": "Kurs 2",
          "helpText": "Kursname (optional)"
        },
        "grade2": {
          "label": "Note",
          "helpText": "Buchstabennote",
          "options": {
            "": "—",
            "A+": "A+ (4,3)",
            "A": "A (4,0)",
            "A-": "A- (3,7)",
            "B+": "B+ (3,3)",
            "B": "B (3,0)",
            "B-": "B- (2,7)",
            "C+": "C+ (2,3)",
            "C": "C (2,0)",
            "C-": "C- (1,7)",
            "D+": "D+ (1,3)",
            "D": "D (1,0)",
            "D-": "D- (0,7)",
            "F": "F (0,0)",
            "P": "Bestanden",
            "NP": "Nicht bestanden"
          }
        },
        "credits2": {
          "label": "Credits",
          "helpText": "Kreditpunkte"
        },
        "course3Name": {
          "label": "Kurs 3",
          "helpText": "Kursname (optional)"
        },
        "grade3": {
          "label": "Note",
          "helpText": "Buchstabennote",
          "options": {
            "": "—",
            "A+": "A+ (4,3)",
            "A": "A (4,0)",
            "A-": "A- (3,7)",
            "B+": "B+ (3,3)",
            "B": "B (3,0)",
            "B-": "B- (2,7)",
            "C+": "C+ (2,3)",
            "C": "C (2,0)",
            "C-": "C- (1,7)",
            "D+": "D+ (1,3)",
            "D": "D (1,0)",
            "D-": "D- (0,7)",
            "F": "F (0,0)",
            "P": "Bestanden",
            "NP": "Nicht bestanden"
          }
        },
        "credits3": {
          "label": "Credits",
          "helpText": "Kreditpunkte"
        },
        "showMoreCourses": {
          "label": "Mehr Kurse?",
          "helpText": "Zusätzliche Kursfelder anzeigen",
          "options": {
            "no": "3 Kurse",
            "yes": "Bis zu 8 Kurse"
          }
        },
        "course4Name": {
          "label": "Kurs 4",
          "helpText": "Kursname (optional)"
        },
        "grade4": {
          "label": "Note",
          "helpText": "Buchstabennote",
          "options": {
            "": "—",
            "A+": "A+ (4,3)",
            "A": "A (4,0)",
            "A-": "A- (3,7)",
            "B+": "B+ (3,3)",
            "B": "B (3,0)",
            "B-": "B- (2,7)",
            "C+": "C+ (2,3)",
            "C": "C (2,0)",
            "C-": "C- (1,7)",
            "D+": "D+ (1,3)",
            "D": "D (1,0)",
            "D-": "D- (0,7)",
            "F": "F (0,0)",
            "P": "Bestanden",
            "NP": "Nicht bestanden"
          }
        },
        "credits4": {
          "label": "Credits",
          "helpText": "Kreditpunkte"
        },
        "course5Name": {
          "label": "Kurs 5",
          "helpText": "Kursname (optional)"
        },
        "grade5": {
          "label": "Note",
          "helpText": "Buchstabennote",
          "options": {
            "": "—",
            "A+": "A+ (4,3)",
            "A": "A (4,0)",
            "A-": "A- (3,7)",
            "B+": "B+ (3,3)",
            "B": "B (3,0)",
            "B-": "B- (2,7)",
            "C+": "C+ (2,3)",
            "C": "C (2,0)",
            "C-": "C- (1,7)",
            "D+": "D+ (1,3)",
            "D": "D (1,0)",
            "D-": "D- (0,7)",
            "F": "F (0,0)",
            "P": "Bestanden",
            "NP": "Nicht bestanden"
          }
        },
        "credits5": {
          "label": "Credits",
          "helpText": "Kreditpunkte"
        },
        "course6Name": {
          "label": "Kurs 6",
          "helpText": "Kursname (optional)"
        },
        "grade6": {
          "label": "Note",
          "helpText": "Buchstabennote",
          "options": {
            "": "—",
            "A+": "A+ (4,3)",
            "A": "A (4,0)",
            "A-": "A- (3,7)",
            "B+": "B+ (3,3)",
            "B": "B (3,0)",
            "B-": "B- (2,7)",
            "C+": "C+ (2,3)",
            "C": "C (2,0)",
            "C-": "C- (1,7)",
            "D+": "D+ (1,3)",
            "D": "D (1,0)",
            "D-": "D- (0,7)",
            "F": "F (0,0)",
            "P": "Bestanden",
            "NP": "Nicht bestanden"
          }
        },
        "credits6": {
          "label": "Credits",
          "helpText": "Kreditpunkte"
        },
        "course7Name": {
          "label": "Kurs 7",
          "helpText": "Kursname (optional)"
        },
        "grade7": {
          "label": "Note",
          "helpText": "Buchstabennote",
          "options": {
            "": "—",
            "A+": "A+ (4,3)",
            "A": "A (4,0)",
            "A-": "A- (3,7)",
            "B+": "B+ (3,3)",
            "B": "B (3,0)",
            "B-": "B- (2,7)",
            "C+": "C+ (2,3)",
            "C": "C (2,0)",
            "C-": "C- (1,7)",
            "D+": "D+ (1,3)",
            "D": "D (1,0)",
            "D-": "D- (0,7)",
            "F": "F (0,0)",
            "P": "Bestanden",
            "NP": "Nicht bestanden"
          }
        },
        "credits7": {
          "label": "Credits",
          "helpText": "Kreditpunkte"
        },
        "course8Name": {
          "label": "Kurs 8",
          "helpText": "Kursname (optional)"
        },
        "grade8": {
          "label": "Note",
          "helpText": "Buchstabennote",
          "options": {
            "": "—",
            "A+": "A+ (4,3)",
            "A": "A (4,0)",
            "A-": "A- (3,7)",
            "B+": "B+ (3,3)",
            "B": "B (3,0)",
            "B-": "B- (2,7)",
            "C+": "C+ (2,3)",
            "C": "C (2,0)",
            "C-": "C- (1,7)",
            "D+": "D+ (1,3)",
            "D": "D (1,0)",
            "D-": "D- (0,7)",
            "F": "F (0,0)",
            "P": "Bestanden",
            "NP": "Nicht bestanden"
          }
        },
        "credits8": {
          "label": "Credits",
          "helpText": "Kreditpunkte"
        },
        "includePriorGpa": {
          "label": "Vorherige Semester einbeziehen?",
          "helpText": "Vorherigen GPA hinzufügen für kumulativen Durchschnitt",
          "options": {
            "no": "Nein — nur Semester",
            "yes": "Ja — kumulativer GPA"
          }
        },
        "priorGpa": {
          "label": "Vorheriger GPA",
          "helpText": "Ihr GPA aus vorherigen Semestern"
        },
        "priorCredits": {
          "label": "Vorherige Credits",
          "helpText": "Gesamte Credits aus vorherigen Semestern"
        }
      },
      "results": {
        "semesterGpa": {
          "label": "Semester GPA"
        },
        "cumulativeGpa": {
          "label": "Kumulativer GPA"
        },
        "totalCredits": {
          "label": "Gesamte Credits"
        },
        "totalPoints": {
          "label": "Qualitätspunkte"
        }
      },
      "presets": {
        "honorStudent": {
          "label": "Ehrenstudent (5 Kurse)",
          "description": "Überwiegend A's — 3,86 GPA"
        },
        "cumulativeGpa": {
          "label": "Kumulativer GPA",
          "description": "3 Kurse + vorheriger 3,45 GPA"
        },
        "mixedSemester": {
          "label": "Gemischte Noten + Bestanden",
          "description": "A bis C+ mit einem Bestanden-Kurs"
        }
      },
      "values": {
        "gpa": "GPA",
        "credits": "Credits",
        "points": "Punkte",
        "of": "von",
        "on": "auf",
        "scale": "Skala"
      },
      "formats": {
        "summary": "Ihr Semester-GPA ist {semesterGpa} auf einer 4,0-Skala"
      },
      "infoCards": {
        "metrics": {
          "title": "GPA Ergebnisse",
          "items": [
            {
              "label": "Semester GPA",
              "valueKey": "semesterGpa"
            },
            {
              "label": "Kumulativer GPA",
              "valueKey": "cumulativeGpa"
            },
            {
              "label": "Semester Credits",
              "valueKey": "semesterCredits"
            },
            {
              "label": "Gezählte Kurse",
              "valueKey": "courseCount"
            }
          ]
        },
        "details": {
          "title": "Akademischer Status",
          "items": [
            {
              "label": "Dekansliste (≥3,5)",
              "valueKey": "deansListNote"
            },
            {
              "label": "Akademischer Status",
              "valueKey": "standingNote"
            },
            {
              "label": "Beste Note",
              "valueKey": "highestGrade"
            },
            {
              "label": "Schlechteste Note",
              "valueKey": "lowestGrade"
            }
          ]
        },
        "tips": {
          "title": "GPA Tipps",
          "items": [
            "Kurse mit hohen Credits beeinflussen Ihren GPA am meisten — priorisieren Sie gute Leistungen in 4-Credit-Kursen",
            "Ein A in einem 4-Credit-Kurs bringt 16 Qualitätspunkte vs. 12 in einem 3-Credit-Kurs",
            "Bestanden/Nicht bestanden-Kurse beeinflussen den GPA nicht — nutzen Sie diese strategisch für Wahlfächer",
            "Die Wiederholung eines nicht bestandenen Kurses ersetzt oft das F — prüfen Sie die Notenersatzrichtlinie Ihrer Hochschule"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist GPA?",
          "content": "GPA (Grade Point Average) ist ein standardisiertes Maß für akademische Leistung, das an US-Colleges und Universitäten verwendet wird. Die gängigste Skala reicht von 0,0 bis 4,0, obwohl einige Schulen bis 4,3 erweitern, indem sie A+ einen höheren Wert zuweisen. Ihr GPA wird berechnet, indem Sie die Notenpunkte jedes Kurses mit seinen Kreditstunden multiplizieren, um Qualitätspunkte zu erhalten, alle Qualitätspunkte summieren und durch die gesamten Kreditstunden teilen. Zum Beispiel produziert ein A (4,0) in einem 4-Credit-Kurs 16 Qualitätspunkte, während ein B (3,0) in einem 3-Credit-Kurs 9 produziert. Zusammengezählt: 25 Qualitätspunkte geteilt durch 7 Credits ergibt einen 3,57 GPA. GPA ist wichtig für die Berechtigung zur Dekansliste, Stipendien, Zulassungen zu Graduiertenschulen und viele Stellenbewerbungen."
        },
        "howItWorks": {
          "title": "Wie dieser Rechner funktioniert",
          "content": "Geben Sie eine Buchstabennote und Kreditstunden für jeden Kurs ein. Der Rechner multipliziert Notenpunkte mit Credits, um Qualitätspunkte pro Kurs zu finden, und teilt dann die gesamten Qualitätspunkte durch die gesamten bewerteten Credits. Bestanden/Nicht bestanden (B/NB) Kurse verdienen Credits, werden aber von der GPA-Berechnung ausgeschlossen, genau wie es die meisten Colleges handhaben. Um den kumulativen GPA zu berechnen, schalten Sie 'Vorherige Semester einbeziehen' ein und geben Ihren bestehenden GPA und die Gesamtzahl der Credits ein. Der Rechner kombiniert Ihre vorherigen Qualitätspunkte (Vorheriger GPA × Vorherige Credits) mit den Qualitätspunkten dieses Semesters, um Ihren aktualisierten kumulativen GPA zu erstellen. Dies ist dieselbe Formel, die von College-Registraren verwendet wird."
        },
        "considerations": {
          "title": "Wichtige Überlegungen",
          "items": [
            {
              "text": "A+ = 4,3 in diesem Rechner. Einige Schulen begrenzen A+ auf 4,0 — überprüfen Sie die Skala Ihrer Institution",
              "type": "warning"
            },
            {
              "text": "B/NB und W (Rückzug) Kurse werden von GPA-Berechnungen ausgeschlossen",
              "type": "info"
            },
            {
              "text": "Cum laude Auszeichnungen: typischerweise 3,5+ (cum laude), 3,7+ (magna), 3,9+ (summa)",
              "type": "info"
            },
            {
              "text": "Akademische Bewährung beginnt normalerweise unter 2,0 GPA — genaue Schwellenwerte variieren nach Schule",
              "type": "warning"
            },
            {
              "text": "Transfer-Credits können in Ihren GPA einbezogen werden oder nicht — die meisten Schulen schließen sie aus",
              "type": "info"
            },
            {
              "text": "Gewichteter GPA (5,0-Skala) wird in Gymnasien für AP/Honors verwendet — dieser Rechner verwendet die College-4,0-Skala",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "GPA-Skala Referenz",
          "items": [
            {
              "text": "A+ (4,3): Außergewöhnlich — übertrifft höchste Erwartungen im Kurs",
              "type": "info"
            },
            {
              "text": "A / A- (4,0 / 3,7): Ausgezeichnet — zeigt gründliche Beherrschung des Materials",
              "type": "info"
            },
            {
              "text": "B+ / B / B- (3,3 / 3,0 / 2,7): Gut — solides Verständnis mit Verbesserungsmöglichkeiten",
              "type": "info"
            },
            {
              "text": "C+ / C / C- (2,3 / 2,0 / 1,7): Durchschnitt — erfüllt Kernanforderungen, Minimum für viele Hauptfächer",
              "type": "info"
            },
            {
              "text": "D+ / D / D- (1,3 / 1,0 / 0,7): Unterdurchschnittlich — Minimum zum Bestehen an den meisten Institutionen",
              "type": "info"
            },
            {
              "text": "F (0,0): Durchgefallen — keine Credits verdient, senkt den GPA erheblich",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "GPA-Berechnungsbeispiele",
          "description": "Schritt-für-Schritt Notenpunkt-Berechnungen",
          "examples": [
            {
              "title": "Semester GPA (4 Kurse)",
              "steps": [
                "Analysis (A, 4cr): 4,0 × 4 = 16,0",
                "Chemie (B+, 4cr): 3,3 × 4 = 13,2",
                "Englisch (A-, 3cr): 3,7 × 3 = 11,1",
                "Labor (B, 1cr): von GPA ausgeschlossen",
                "Gesamt: 40,3 Pkt ÷ 11 bewertete cr"
              ],
              "result": "Semester GPA = 3,66"
            },
            {
              "title": "Kumulativer GPA",
              "steps": [
                "Vorher: 3,45 GPA × 48 Credits = 165,6 Pkt",
                "Dieses Semester: 40,3 Pkt, 11 Credits",
                "Kombiniert: 205,9 Pkt ÷ 59 Credits"
              ],
              "result": "Kumulativer GPA = 3,49"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie wird GPA berechnet?",
          "answer": "Multiplizieren Sie die Notenpunkte jedes Kurses (A=4,0, B=3,0, usw.) mit seinen Kreditstunden, um Qualitätspunkte zu erhalten. Summieren Sie alle Qualitätspunkte und teilen Sie durch die gesamten bewerteten Credits. Formel: GPA = Σ(Notenpunkte × Credits) ÷ Σ(Credits)."
        },
        {
          "question": "Ist A+ 4,0 oder 4,3 wert?",
          "answer": "Es hängt von Ihrer Schule ab. Viele US-Colleges weisen A+ = 4,3 zu, während andere bei 4,0 begrenzen. Dieser Rechner verwendet 4,3 (die gängigste Skala). Überprüfen Sie die Bewertungsrichtlinie Ihrer Institution."
        },
        {
          "question": "Beeinflussen Bestanden/Nicht bestanden-Kurse meinen GPA?",
          "answer": "Nein. B- und NB-Noten verdienen oder verweigern Credits, tragen aber keine Notenpunkte, daher werden sie von GPA-Berechnungen ausgeschlossen. Dies ist Standard an den meisten US-Colleges."
        },
        {
          "question": "Wie berechne ich den kumulativen GPA?",
          "answer": "Schalten Sie 'Vorherige Semester einbeziehen' auf Ja. Geben Sie Ihren vorherigen GPA und die Gesamtzahl der Credits ein. Der Rechner kombiniert vorherige Qualitätspunkte mit denen dieses Semesters, um Ihren kumulativen GPA zu erstellen."
        },
        {
          "question": "Was ist ein guter College-GPA?",
          "answer": "3,0 (B-Durchschnitt) gilt allgemein als gut. 3,5+ ist sehr gut und qualifiziert oft für die Dekansliste. 3,7+ ist ausgezeichnet für Bewerbungen an Graduiertenschulen."
        },
        {
          "question": "Kann ein schlechtes Semester meinen GPA ruinieren?",
          "answer": "Je mehr Credits Sie abgeschlossen haben, desto schwieriger ist es, Ihren GPA erheblich zu bewegen. Ein schlechtes Semester schadet früh im College mehr. Verwenden Sie die kumulative GPA-Funktion, um die Auswirkungen zu modellieren."
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
